/*
  PDF de la SNT, pour travailler sans connexion : node outils/pdf-snt.js [identifiant de chapitre…]
  Pour chaque chapitre de data/snt/ : assets/pdf/<id>-cours.pdf (cours, séances, méthode, erreurs fréquentes, vidéos)
  et assets/pdf/<id>-exercices.pdf (deux questions tirées de chaque série, avec un corrigé à la fin, toujours les mêmes
  grâce à un tirage à graine fixe). Pour les réseaux sociaux, en plus : <id>-activites.pdf (les activités sur papier).
  Le texte des chapitres est rendu ici (KaTeX côté serveur), puis Chrome imprime chaque page en PDF.
  À relancer après une retouche d'un chapitre ou d'assets/exercices-snt.js.
*/
const fs = require("fs"), path = require("path"), vm = require("vm"), os = require("os"), { execFileSync } = require("child_process");
const racine = path.join(__dirname, "..");
const CHROME = process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const katex = require(path.join(racine, "assets/katex/katex.min.js"));
const KATEX_CSS = "file:///" + path.join(racine, "assets/katex/katex.min.css").replace(/\\/g, "/");
const SORTIE = path.join(racine, "assets/pdf");

// Tirage à graine fixe : les PDF ne changent pas d'une fabrication à l'autre
function mulberry32(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const M = Object.create(Math); M.random = mulberry32(976);
const ctx = { console, Math: M, String, Number, Array, Object, Set, Map, JSON, isFinite, isNaN, parseFloat, parseInt, Date, RegExp, Error };
ctx.window = ctx; vm.createContext(ctx);
const lancer = (f) => vm.runInContext(fs.readFileSync(path.join(racine, f), "utf8"), ctx, { filename: f });
lancer("assets/exercices-base.js"); lancer("assets/exercices-snt.js");
const fichiers = fs.readdirSync(path.join(racine, "data/snt")).filter((f) => f.endsWith(".js"));
fichiers.forEach((f) => lancer("data/snt/" + f));
const { CHAPITRES } = ctx, { GEN, FIGURES } = ctx.PM_EXO;
const CATALOGUE = (() => { const c = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(racine, "data/catalogue.js"), "utf8"), c); return c.window.CATALOGUE; })();
const ordre = CATALOGUE.niveaux.find((n) => n.id === "snt").chapitres.map((c) => c.id).filter((id) => CHAPITRES[id]);

/* ---------- Texte : mêmes conventions que le site (**gras**, `code`, $maths$, listes « - », blocs ```) ---------- */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function inline(s) {
  const codes = [], maths = [];
  let t = String(s).replace(/(?<!`)`([^`\n]+)`(?!`)/g, (_, c) => "\u0001" + (codes.push(c) - 1) + "\u0001")
    .replace(/\$([^$]+)\$/g, (_, m) => "\u0000" + (maths.push(m) - 1) + "\u0000")
    .replace(/ ([?!:;»])/g, "\u202f$1").replace(/« /g, "«\u202f");
  return esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\u0000(\d+)\u0000/g, (_, i) => `<span class="m">${katex.renderToString(maths[+i], { throwOnError: false })}</span>`)
    .replace(/\u0001(\d+)\u0001/g, (_, i) => `<code>${esc(codes[+i])}</code>`);
}
function md(s) {
  const blocs = [];
  s = String(s).replace(/```[a-z]*\n?([\s\S]*?)\n?```/g, (_, c) => `\n\n\u0002${blocs.push(c) - 1}\u0002\n\n`);
  return s.split(/\n\n+/).filter((b) => b.trim()).map((b) => {
    const c = b.trim().match(/^\u0002(\d+)\u0002$/);
    if (c) return `<pre>${esc(blocs[+c[1]])}</pre>`;
    let out = "", liste = [];
    const vider = () => { if (liste.length) { out += `<ul>${liste.map((l) => `<li>${inline(l)}</li>`).join("")}</ul>`; liste = []; } };
    b.split("\n").forEach((l) => { if (l.startsWith("- ")) liste.push(l.slice(2)); else { vider(); out += `<p>${inline(l)}</p>`; } });
    vider();
    return out;
  }).join("");
}
// Figures : les activités interactives sont remplacées par une figure fixe, ou retirées (elles ont leur version papier)
const STATIQUE = { "sr-act-graphe": "sr-cours-graphe" };
const figure = (n) => [].concat(n || []).map((x) => STATIQUE[x] || x).filter((x) => !/^sr-act-/.test(x) && FIGURES[x]).map((x) => `<figure>${FIGURES[x]()}</figure>`).join("");

const CSS = `
@page { size: A4; margin: 12mm 13mm 13mm; @bottom-center { content: counter(page); } }
:root { --fond: #f2f6f6; --surface: #ffffff; --encre: #13282c; --doux: #557074; --trait: #c7d6d8; --lagon: #0a7c76; --lagon-pale: #dcefed; --ylang: #c98a08; --ylang-pale: #fbefd2; --bon: #1d7a3f; --faux: #b23a2c; --faux-pale: #fbe5e1; --ac: #8e2f86; --ac-pale: #f6e2f3; }
body { font-family: "Segoe UI", Arial, sans-serif; font-size: 10.3pt; line-height: 1.38; color: #13282c; margin: 0; }
h1 { font-size: 20pt; margin: 0; color: #8e2f86; }
.sur { font-size: 9pt; text-transform: uppercase; letter-spacing: .08em; color: #8e2f86; font-weight: 700; margin: 0 0 1mm; }
.accroche { font-size: 11pt; margin: 2mm 0 4mm; color: #33484b; }
h2 { font-size: 13pt; color: #8e2f86; border-bottom: 1.5px solid #8e2f86; padding-bottom: 1mm; margin: 6mm 0 2mm; break-after: avoid; }
h3 { font-size: 11pt; margin: 4mm 0 1.5mm; break-after: avoid; }
h3 .num { display: inline-block; min-width: 6mm; color: #fff; background: #8e2f86; border-radius: 1.5mm; text-align: center; margin-right: 2mm; }
.tag { font-size: 8pt; font-weight: 700; color: #8e2f86; background: #f6e2f3; border-radius: 3mm; padding: .3mm 2mm; margin-left: 2mm; vertical-align: middle; }
p { margin: 1mm 0; } ul, ol { margin: 1mm 0; padding-left: 5.5mm; } li { margin: .5mm 0; }
code { font-family: Consolas, "Courier New", monospace; font-size: 9.3pt; background: #eef3f3; border: 1px solid #d3e0e1; border-radius: 1mm; padding: 0 .8mm; }
pre { font-family: Consolas, "Courier New", monospace; font-size: 8.8pt; background: #eef3f3; border-left: 3px solid #0a7c76; padding: 2mm 3mm; white-space: pre-wrap; margin: 1.5mm 0; break-inside: avoid; }
figure { margin: 2mm auto; max-width: 80mm; break-inside: avoid; }
figure svg { width: 100%; height: auto; }
table.valeurs { border-collapse: collapse; margin: 1mm auto; font-size: 9pt; } .valeurs th, .valeurs td { border: 1px solid #b9c9cb; padding: 1mm 2mm; text-align: center; } .valeurs th { background: #eef3f3; }
.g-label { font: 700 11px "Segoe UI", Arial, sans-serif; fill: #13282c; }
.exemple { background: #dcefed; border-radius: 2mm; padding: 2mm 3mm; margin: 2mm 0; break-inside: avoid; }
.exemple .t { font-weight: 700; font-size: 8.5pt; text-transform: uppercase; color: #0a7c76; margin: 0; }
.seance { border: 1px solid #e3c6df; border-left: 3px solid #8e2f86; border-radius: 1.5mm; padding: 1.5mm 3mm; margin: 2mm 0; break-inside: avoid; }
.seance h3 { margin: .5mm 0 1mm; }
.petit { font-size: 9pt; color: #44595c; }
.methode { border: 1px solid #c7d6d8; border-radius: 2mm; padding: 2mm 3mm; margin: 2mm 0; break-inside: avoid; }
.q { margin: 2.5mm 0; break-inside: avoid; } .q .n { font-weight: 700; color: #8e2f86; }
.choix { list-style: upper-alpha; }
.corrige { break-before: page; }
.rep { border: 1px solid #888; border-radius: 1.5mm; margin: 1mm 0 2.5mm; min-height: 14mm; }
.pied { margin-top: 6mm; font-size: 8.5pt; color: #557074; border-top: 1px solid #c7d6d8; padding-top: 1.5mm; }
.katex { font-size: 1.05em; }
.m { white-space: nowrap; }
`;
const page = (titre, corps) => `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${esc(titre)}</title><link rel="stylesheet" href="${KATEX_CSS}"><style>${CSS}</style></head><body>${corps}</body></html>`;
const entete = (c, quoi) => `<p class="sur">ProfMaths · SNT Seconde · Chapitre ${c.numero} · ${quoi}</p><h1>${inline(c.titre)}</h1>`;
const PIED = `<p class="pied">Site : voltark976-sketch.github.io/profmaths (carte « SNT »). Ce document reprend le contenu du site, pour travailler sans connexion.</p>`;

function imprimer(html, nom) {
  const tmp = path.join(os.tmpdir(), "pdf-snt-" + nom.replace(/\.pdf$/, ".html"));
  fs.writeFileSync(tmp, html);
  fs.mkdirSync(SORTIE, { recursive: true });
  const out = path.join(SORTIE, nom);
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--print-to-pdf=" + out, "file:///" + tmp.replace(/\\/g, "/")], { stdio: "ignore" });
  console.log(`✓ assets/pdf/${nom} (${Math.round(fs.statSync(out).size / 1024)} ko)`);
}

/* ---------- Cours ---------- */
function cours(id) {
  const c = CHAPITRES[id];
  let h = entete(c, "Cours") + `<p class="accroche">${inline(c.accroche)}</p>`;
  if (c.seances) {
    h += `<h2>Le chapitre en ${c.seances.length} séances</h2><p class="petit">${inline(c.seancesNote || "")}</p>`;
    c.seances.forEach((s, k) => { h += `<div class="seance"><h3>Séance ${k + 1} · ${esc(s.duree)} — ${inline(s.titre)}</h3><p class="petit"><strong>Objectifs :</strong> ${s.objectifs.map(inline).join(" ")}</p><ul class="petit">${s.deroule.map((d) => `<li>${inline(d)}</li>`).join("")}</ul>${s.maison ? `<p class="petit"><strong>À la maison :</strong> ${inline(s.maison)}</p>` : ""}</div>`; });
  }
  h += `<h2>Le cours</h2>`;
  c.cours.forEach((s, k) => {
    h += `<h3><span class="num">${k + 1}</span>${inline(s.titre)}${s.seance ? `<span class="tag">séance ${s.seance}</span>` : ""}</h3>${md(s.texte.replace(/\*\*Activité\*\* :[^\n]*/g, "**Activité** : sur le site (ou dans le PDF des activités, s'il existe)."))}${figure(s.figure)}`;
    if (s.exemple) h += `<div class="exemple"><p class="t">Exemple</p>${md(s.exemple.enonce)}<p class="t">Réponse</p>${md(s.exemple.solution)}</div>`;
    if (s.video) h += `<p class="petit">▶ ${esc(s.video.titre)} : ${esc(s.video.youtube.replace("https://", ""))}</p>`;
  });
  h += `<h2>Fiche méthode</h2>`;
  c.methode.forEach((m) => { h += `<div class="methode"><h3>${inline(m.titre)}</h3><ol>${m.etapes.map((e) => `<li>${inline(e)}</li>`).join("")}</ol>${figure(m.figure)}${m.exemple ? `<p><em>Exemple :</em> ${inline(m.exemple)}</p>` : ""}</div>`; });
  h += `<h2>Les erreurs fréquentes</h2><ul>${c.erreurs.map((e) => `<li>${inline(e)}</li>`).join("")}</ul>`;
  if (c.videos && c.videos.length) h += `<h2>Autres vidéos</h2><ul class="petit">${c.videos.map((v) => `<li>${esc(v.titre)} : ${esc(v.youtube.replace("https://", ""))}</li>`).join("")}</ul>`;
  imprimer(page(`${c.titre} : cours`, h + PIED), `${id}-cours.pdf`);
}

/* ---------- Exercices corrigés ---------- */
function exercices(id) {
  const c = CHAPITRES[id];
  let h = entete(c, "Exercices corrigés") + `<p class="accroche">Deux questions de chaque série du site. Réponds sur ton cahier, puis vérifie avec le corrigé à la fin. Sur le site, chaque série donne de nouvelles questions à chaque fois, avec des indices.</p>`;
  let cor = `<div class="corrige"><h2>Corrigé</h2>`, n = 0, etape = "";
  c.exercices.forEach((e) => {
    if (e.etape !== etape) { etape = e.etape; h += `<h2>${inline(etape)}</h2>`; cor += `<h3>${inline(etape)}</h3>`; }
    h += `<h3>${inline(e.titre)}</h3>`;
    const vus = new Set();
    for (let k = 0, pris = 0; pris < 2 && k < 40; k++) {
      const q = GEN[e.type](k); if (vus.has(q.enonce + (q.figure || ""))) continue; vus.add(q.enonce + (q.figure || "")); pris++; n++;
      h += `<div class="q"><span class="n">${n}.</span> ${md(q.enonce)}${q.figure ? `<figure>${q.figure}</figure>` : ""}${q.mode === "choix" ? `<ol class="choix">${q.choix.map((x) => `<li>${inline(x)}</li>`).join("")}</ol>` : q.prefixe ? `<p class="petit">${inline(q.prefixe)} …${q.suffixe ? " " + inline(q.suffixe) : ""}</p>` : ""}</div>`;
      const rep = q.mode === "choix" ? `${"ABCD"[q.attendu]} : ${inline(q.choix[q.attendu])}` : `<span class="m">${katex.renderToString(String(+(+q.attendu).toFixed(6)).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,").replace(".", "{,}"))}</span>${q.suffixe ? " " + inline(q.suffixe) : ""}`;
      cor += `<div class="q"><span class="n">${n}.</span> <strong>Réponse : ${rep}</strong>${md(q.solution)}${q.figureSolution ? `<figure>${q.figureSolution}</figure>` : ""}</div>`;
    }
  });
  imprimer(page(`${c.titre} : exercices`, h + cor + "</div>" + PIED), `${id}-exercices.pdf`);
}

/* ---------- Activités sur papier (réseaux sociaux) ---------- */
function activitesReseaux() {
  const c = CHAPITRES["snt-reseaux-sociaux"], R = `<div class="rep"></div>`, G = (h) => `<div class="rep" style="min-height:${h}mm"></div>`;
  let h = entete(c, "Activités sans internet") + `<p class="accroche">Les activités du chapitre, à faire sur papier quand la connexion ne marche pas. Tous les prénoms et profils sont inventés.</p>`;
  h += `<h2>Activité 1 · Que dit Internet de Nadjma ? <span class="tag">séance 2</span></h2>
  <p>Voici ce qu'on trouve en tapant « Nadjma » sur un réseau social où son compte est public :</p>
  <ul><li>Photo de profil : Nadjma en tenue de handball, avec le logo du club de Tsingoni.</li><li>Story d'hier, 17 h 42 : « Trop hâte d'être en vacances 🏖️ » avec une photo devant l'entrée d'un lycée de Mamoudzou.</li><li>Publication : « Joyeux anniversaire à moi ! 15 ans 🎂 », le 12 mars.</li><li>Commentaire d'une amie : « On se voit au marché de Combani samedi comme d'hab ? »</li><li>« J'aime » sur la page d'une boutique de téléphones et sur trois vidéos de recettes.</li><li>Position partagée en direct pendant un match.</li></ul>
  <ol><li>Qu'apprend un inconnu sur Nadjma : âge, lycée, sport, lieux fréquentés, habitudes ?${G(18)}</li>
  <li>Classe chaque information : trace volontaire (publiée par elle), involontaire (enregistrée sans qu'elle y pense) ou laissée par quelqu'un d'autre.${G(16)}</li>
  <li>Quelles informations un annonceur pourrait-il utiliser pour lui montrer des publicités ciblées ?${R}</li>
  <li>Donne trois réglages qui protégeraient Nadjma.${R}</li></ol>`;
  h += `<h2>Activité 2 · Règle le profil <span class="tag">séance 2</span></h2>
  <p>Pour chaque information, coche le réglage que tu choisirais, puis indique si un inconnu la verrait.</p>
  <table class="valeurs" style="width:100%"><tr><th>Information</th><th>Public</th><th>Amis</th><th>Moi seul</th><th>Un inconnu la voit ?</th></tr>${["Photo de profil", "Date de naissance", "Lycée et classe", "Position en direct", "Numéro de téléphone", "Photos de vacances"].map((x) => `<tr><td style="text-align:left">${x}</td><td>☐</td><td>☐</td><td>☐</td><td></td></tr>`).join("")}</table>
  <p>Une publication est réglée sur « amis de mes amis ». Si tu as $150$ amis qui ont chacun $150$ amis (tous différents), combien de personnes peuvent la voir, au maximum ?</p>${R}`;
  h += `<h2>Activité 3 · Combien de mots de passe ? <span class="tag">séance 2</span></h2>
  <p>Un ordinateur pirate teste $10$ milliards ($10^{10}$) de mots de passe par seconde. Complète le tableau (ordres de grandeur).</p>
  <table class="valeurs" style="width:100%"><tr><th>Mot de passe</th><th>Caractères possibles</th><th>Longueur</th><th>Nombre de possibilités</th><th>Temps pour tout tester</th></tr><tr><td>code PIN</td><td>$10$</td><td>$4$</td><td>$10^4 = 10\\,000$</td><td>$1$ microseconde</td></tr><tr><td>minuscules</td><td>$26$</td><td>$8$</td><td></td><td></td></tr><tr><td>minuscules et majuscules</td><td>$52$</td><td>$8$</td><td></td><td></td></tr><tr><td>phrase de passe</td><td>$95$</td><td>$20$</td><td></td><td></td></tr></table>
  <p>Que retiens-tu ? Invente une phrase de passe robuste (que tu n'utiliseras pas vraiment).</p>${R}`;
  h += `<h2>Activité 4 · Gratuit ? L'histoire de Julie <span class="tag">séance 3</span></h2>
  <p>Julie, $16$ ans, a regardé hier soir trois vidéos sur les baskets et cherché « magasin chaussures Mamoudzou ». Ce matin, son réseau social lui montre une publicité pour des baskets en promotion… dans un magasin près de chez elle.</p>
  <ol><li>Quelles données ont permis de lui montrer cette publicité ?${R}</li><li>Qui a payé pour cette publicité, et pourquoi ?${R}</li><li>Le réseau a $2$ milliards d'utilisateurs et gagne $50$ milliards d'euros par an grâce à la publicité. Combien rapporte un utilisateur en moyenne ?${R}</li><li>Explique le slogan « Quand c'est gratuit, c'est toi le produit ». Es-tu d'accord ?${G(16)}</li></ol>`;
  h += `<h2>Activité 5 · La chaîne de Milgram, en classe <span class="tag">séance 4</span></h2>
  <p><strong>Règle :</strong> le professeur choisit une personne « cible » qu'aucun élève ne connaît directement (dans une autre classe, un autre lycée). Chaque élève écrit le nom de la personne qu'il connaît personnellement et qui lui semble la plus proche de la cible. On suit les chaînes au tableau.</p>
  <table class="valeurs" style="width:100%"><tr><th>Chaîne (prénoms inventés si besoin)</th><th>Intermédiaires</th><th>Liens</th></tr><tr><td style="height:9mm"></td><td></td><td></td></tr><tr><td style="height:9mm"></td><td></td><td></td></tr><tr><td style="height:9mm"></td><td></td><td></td></tr></table>
  <p>Combien d'intermédiaires en moyenne ? Compare avec l'expérience de Milgram (1967).</p>${R}`;
  h += `<h2>Activité 6 · Le graphe de la classe <span class="tag">séance 4</span></h2>
  <figure>${FIGURES["sr-cours-graphe"]()}</figure>
  <ol><li>Combien d'amis a Rose ? Quels sont les amis communs d'Anli et de Lina ?${R}</li>
  <li>Complète le tableau des distances (nombre minimal de liens entre deux élèves), puis l'excentricité de chacun.
  <table class="valeurs" style="width:100%"><tr><th></th>${["Anli", "Zoé", "Lina", "Tom", "Naël", "Rose", "Maya", "Hugo", "Sami"].map((x) => `<th>${x}</th>`).join("")}<th>Excentricité</th></tr>${["Anli", "Zoé", "Lina", "Tom", "Naël", "Rose", "Maya", "Hugo", "Sami"].map((x) => `<tr><th>${x}</th>${"<td style='height:6mm'></td>".repeat(10)}</tr>`).join("")}</table></li>
  <li>Donne le rayon, le diamètre et le centre de ce graphe. Pourquoi Naël a-t-il une place particulière ?${R}</li></ol>`;
  h += `<h2>Activité 7 · Deux fils d'actualité <span class="tag">séance 5</span></h2>
  <table class="valeurs" style="width:100%"><tr><th>Fil d'Amine</th><th>Fil de Léa</th></tr><tr><td style="text-align:left">⚽ Le résumé du match de samedi<br>⚽ Top 10 des plus beaux buts (suggéré)<br>🎮 Tournoi en ligne ce soir<br>⚽ La rumeur de transfert du jour (suggéré)<br>⚽ Le classement après la journée (suggéré)</td><td style="text-align:left">🔬 Pourquoi le lagon est-il turquoise ?<br>🎵 Playlist pour réviser<br>🌍 Reportage : la mangrove en danger<br>🍲 Le mataba en 5 étapes<br>😂 Les élèves le lundi matin</td></tr></table>
  <ol><li>Amine suit des comptes de foot et de jeux vidéo, et « aime » presque toutes les vidéos de foot. Léa suit des comptes variés et réagit peu. Explique la différence entre leurs fils.${R}</li><li>Qu'est-ce qu'une bulle de filtre ? Lequel des deux y entre ?${R}</li><li>Propose deux moyens pour Amine de diversifier son fil.${R}</li></ol>`;
  h += `<h2>Activité 8 · Que faire ? Trois situations <span class="tag">séance 6</span></h2>
  <ol><li>Dans le groupe de la classe, des élèves publient chaque jour des montages moqueurs sur Ylan.</li><li>Quelqu'un a créé un compte « kenza.officiel » avec les photos de Kenza et publie des messages méchants en son nom.</li><li>Un inconnu menace Inès de publier une photo d'elle si elle ne lui envoie pas d'argent.</li></ol>
  <table class="valeurs" style="width:100%"><tr><th>Situation</th><th>Forme de cyberviolence</th><th>Que dit la loi ?</th><th>Que faire (victime, témoin) ?</th></tr>${[1, 2, 3].map((k) => `<tr><td>${k}</td><td style="height:20mm"></td><td></td><td></td></tr>`).join("")}</table>
  <p class="petit">Ressources : un adulte du lycée, le 3018 (gratuit, anonyme, 7 j/7), le bouton « Signaler », internet-signalement.gouv.fr (Pharos), le commissariat ou la gendarmerie.</p>`;
  h = h.replace(/\$([^$]+)\$/g, (_, t) => `<span class="m">${katex.renderToString(t)}</span>`);
  imprimer(page("Réseaux sociaux : activités", h + PIED), "snt-reseaux-sociaux-activites.pdf");
}

const demandes = process.argv.slice(2), liste = demandes.length ? demandes : ordre;
for (const id of liste) {
  if (!CHAPITRES[id]) { console.error("✗ chapitre inconnu : " + id); process.exitCode = 1; continue; }
  M.random = mulberry32(976); cours(id);
  M.random = mulberry32(976); exercices(id);
  if (id === "snt-reseaux-sociaux") activitesReseaux();
}
