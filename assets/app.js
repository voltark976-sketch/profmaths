/*
  Moteur du site : navigation, affichage des chapitres, exercices, QCM et progression.
  Le contenu se trouve dans data/ ; ce fichier n'a normalement pas besoin d'être modifié.
*/
(function () {
  "use strict";
  const $app = document.getElementById("app");
  const $xp = document.getElementById("xp");
  // Générateurs et figures : remplis par assets/exercices*.js, chargés à la demande (voir « Chargement à la demande »)
  let GEN = {}, FIGURES = {};
  const shuffle = (a) => { const t = a.slice(); for (let i = t.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [t[i], t[j]] = [t[j], t[i]]; } return t; };
  const MAN = window.MANIFESTE || {}, MOTEURS = window.MOTEURS || {};
  // Un chapitre est « en ligne » s'il figure au manifeste (data/manifeste.js, fabriqué par outils/manifeste.js)
  const dispo = (id) => !!(MAN[id] || (window.CHAPITRES && CHAPITRES[id]));
  const charge = (id) => !!(window.CHAPITRES && CHAPITRES[id]);
  const nbSeries = (id) => (charge(id) ? CHAPITRES[id].exercices.length : MAN[id] ? MAN[id].series : 0);
  const nbQcmBanque = (id) => (charge(id) ? CHAPITRES[id].qcm.length : MAN[id] ? MAN[id].qcm : 0);
  // Série, QCM ou défi en cours : la page n'est pas redessinée quand le compte se connecte (l'élève garderait sa question)
  let activiteEnCours = false;

  /* ---------- Progression (gardée dans le navigateur de l'élève) ---------- */
  const CLE = "profmaths:v1";
  let prog = { xp: 0, exo: {}, qcm: {}, jeux: {}, quand: {} };
  try { prog = Object.assign(prog, JSON.parse(localStorage.getItem(CLE) || "{}")); } catch (e) {}
  const Compte = window.PM_COMPTE;
  // Compte auquel appartient la progression gardée dans ce navigateur (vide = sans compte)
  const CLE_PROPRIO = "profmaths:proprio";
  let proprio = null;
  try { proprio = localStorage.getItem(CLE_PROPRIO); } catch (e) {}
  const save = () => { try { localStorage.setItem(CLE, JSON.stringify(prog)); } catch (e) {} majXP(); Compte.sauver(prog); };

  /* ---------- Niveau, rang et avatar ---------- */
  const AV = window.PM_AVATAR, XP = window.NIVEAUX.xp;
  const $xpAv = document.getElementById("xp-avatar"), $xpLien = document.getElementById("xp-lien");
  const monAvatar = (niv) => AV.normaliser(prog.avatar, niv === undefined ? AV.niveau(prog.xp).niveau : niv);
  function majXP() {
    const n = AV.niveau(prog.xp);
    $xp.textContent = n.niveau;
    $xpAv.innerHTML = AV.dessin(monAvatar(n.niveau), 26);
    $xpLien.title = `Niveau ${n.niveau} · ${n.rang} · ${prog.xp} XP`;
  }
  majXP();
  window.addEventListener("storage", (ev) => {
    if (ev.key !== CLE || !ev.newValue) return;
    try { prog = Object.assign({ xp: 0, exo: {}, qcm: {}, jeux: {}, quand: {} }, Compte.fusion(prog, JSON.parse(ev.newValue))); majXP(); } catch (e) {}
  });
  // Ajoute des XP (nombre entier) et annonce un passage de niveau ; chap : chapitre où ils sont gagnés (notation du professeur)
  function gagnerXP(pts, chap) {
    pts = Math.max(0, Math.round(pts));
    if (!pts) return 0;
    const avant = AV.niveau(prog.xp).niveau;
    prog.xp += pts; save();
    if (chap) Compte.xpChapitre(chap, pts);
    const apres = AV.niveau(prog.xp).niveau;
    if (apres > avant) annoncerNiveau(avant, apres);
    return pts;
  }
  const $annonce = document.createElement("div");
  $annonce.className = "sr-only"; $annonce.setAttribute("role", "status"); $annonce.setAttribute("aria-live", "polite");
  document.body.appendChild($annonce);
  function annoncerNiveau(avant, apres) {
    const nouveautes = [];
    for (let n = avant + 1; n <= apres; n++) nouveautes.push(...AV.recompenses(n));
    const rangChange = AV.rang(apres) !== AV.rang(avant);
    document.querySelectorAll(".toast-niv").forEach((t) => t.remove());
    const t = document.createElement("div");
    t.className = "toast-niv";
    t.innerHTML = `<span class="toast-av">${AV.dessin(monAvatar(apres), 48)}</span><span class="toast-t"><strong>Niveau ${apres} !</strong>${rangChange ? `<span>Nouveau rang : <b>${esc(AV.rang(apres))}</b></span>` : ""}${nouveautes.length ? `<span>Débloqué : ${nouveautes.map((r) => esc(r.nom)).join(", ")}</span>` : ""}<a href="#avatar">Voir mon avatar →</a></span><button type="button" class="toast-x" aria-label="Fermer">×</button>`;
    document.body.appendChild(t);
    $annonce.textContent = `Niveau ${apres} !${rangChange ? ` Nouveau rang : ${AV.rang(apres)}.` : ""}${nouveautes.length ? ` Débloqué : ${nouveautes.map((r) => r.nom).join(", ")}.` : ""}`;
    const fermer = () => { t.classList.add("sort"); setTimeout(() => t.remove(), 300); };
    t.querySelector(".toast-x").addEventListener("click", fermer);
    t.querySelector("a").addEventListener("click", fermer);
    setTimeout(fermer, 8000);
  }
  // Coefficient d'XP quand on rejoue : record battu = XP complets, sinon beaucoup moins
  const coefRejeu = (premiere, progres, parfait) => (premiere || progres ? 1 : parfait ? XP.dejaParfait : XP.rejeuSansProgres);
  const divise = (c) => `XP divisés par ${String(Math.round((1 / c) * 10) / 10).replace(".", ",")}`;
  const texteCoef = (c, fem) => (c === XP.dejaParfait ? `déjà réussi${fem ? "e" : ""} parfaitement : ` : `rejoué${fem ? "e" : ""} sans battre ton record : `) + divise(c);
  // Défis : au-delà de quelques parties dans la journée (tous chapitres confondus), les XP diminuent
  function partieDuJour() {
    const e = Compte.eleve(), cle = "profmaths:defis-jour:" + (e ? e.uid : "anonyme");
    const auj = new Date().toLocaleDateString("fr-CA");
    let j = { d: auj, n: 0 };
    try { const l = JSON.parse(localStorage.getItem(cle) || "null"); if (l && l.d === auj && Number.isFinite(l.n)) j = l; } catch (e2) {}
    const deja = j.n;
    j.n = deja + 1;
    try { localStorage.setItem(cle, JSON.stringify(j)); } catch (e2) {}
    return deja;
  }

  /* ---------- Compte élève ---------- */
  const $compteBtn = document.getElementById("compte-btn");
  let etaitConnecte = false;
  function majBoutonCompte() {
    const e = Compte.eleve();
    $compteBtn.textContent = e ? (e.prenom || e.identifiant) : "Connexion";
    $compteBtn.classList.toggle("connecte", !!e);
  }
  const progVide = () => ({ xp: 0, exo: {}, qcm: {}, jeux: {}, quand: {} });
  // Le service de comptes (Firebase, environ 230 ko) démarre juste après le premier affichage de la page,
  // pour que le contenu demandé arrive d'abord ; tout de suite pour les pages du compte.
  let compteLance = false;
  function lancerCompte() {
    if (compteLance) return;
    compteLance = true;
    Compte.init(quandCompte);
  }
  function quandCompte(eleve, distant, indisponible) {
    if (eleve) {
      // La progression appartient au compte : celle d'un autre compte ou faite sans compte sur cet appareil
      // est écartée ; seule la copie locale du même compte (essais faits hors ligne) est fusionnée.
      if (proprio !== eleve.uid) prog = progVide();
      prog = Compte.fusion(prog, distant);
      proprio = eleve.uid;
      try { localStorage.setItem(CLE_PROPRIO, proprio); } catch (e) {}
      etaitConnecte = true;
      save();
    } else if ((etaitConnecte || proprio) && !indisponible) {
      // Déconnexion (ou session terminée) : on efface la progression de l'appareil (téléphone partagé)
      prog = progVide();
      proprio = null;
      try { localStorage.removeItem(CLE); localStorage.removeItem(CLE_PROPRIO); } catch (e) {}
      etaitConnecte = false;
      majXP();
    }
    majBoutonCompte();
    if (!activiteEnCours) route();
  }
  majBoutonCompte();
  setTimeout(lancerCompte, 5000); // au plus tard 5 s après le départ
  if (/^#(compte|suivi|demandes|comptes|frequentation|avatar)\b/.test(location.hash)) lancerCompte();

  /* ---------- Apparence : le choix des thèmes ---------- */
  // Sans choix enregistré, le site prend le thème Mayotte, dont index.html charge la feuille pour tout
  // le monde ; « Auto » suit le réglage clair/sombre de l'appareil.
  // Le bouton rond de la barre du haut ouvre un menu de pastilles. Les autres thèmes (sauf Clair et
  // Sombre) ont leur feuille assets/theme-<id>.css, téléchargée seulement quand on les choisit
  // (index.html la charge au démarrage si c'est le thème enregistré). Pour ajouter un thème :
  // une entrée ci-dessous et une feuille theme-<id>.css (voir LISEZMOI.md).
  // Nouvelle clé le 3 novembre 2026 (« profmaths:theme » avant) : tout le monde est repassé une fois sur Mayotte.
  const CLE_THEME = "profmaths:apparence", THEME_DEFAUT = "mayotte";
  try { localStorage.removeItem("profmaths:theme"); } catch (e) {}
  // nom : affiché dans le menu ; apercu : pastille (fond, bandeau, accent) ; sombre : fond foncé
  const THEMES = {
    light: { nom: "Clair", apercu: "#f2f6f6,#0a7c76,#c98a08" },
    dark: { nom: "Sombre", apercu: "#0c1a1c,#0b5e5a,#3cc2b6", sombre: true },
    mer: { nom: "Mer", apercu: "#eaf4f8,#2f8fb5,#f2b544" },
    montagne: { nom: "Montagne", apercu: "#eef2ee,#5b7f98,#2f6b4f" },
    mayotte: { nom: "Mayotte", apercu: "#fbf3e4,#ff9a5c,#0e9a99" },
    foret: { nom: "Forêt", apercu: "#eef3e6,#2f6e3a,#d98f1f" },
    crepuscule: { nom: "Crépuscule", apercu: "#fbeff0,#ff8f6b,#7b4bb3" },
    ruines: { nom: "Ruines", apercu: "#f4e3bd,#1a64a0,#e3a008" },
    ocean: { nom: "Océan", apercu: "#061a2b,#0a4d6e,#39d1e0", sombre: true },
    nuit: { nom: "Nuit étoilée", apercu: "#0b1026,#2b2f6e,#ffd27a", sombre: true },
    tableau: { nom: "Tableau noir", apercu: "#203b2f,#17302a,#f3d36b", sombre: true }
  };
  const sombreSysteme = matchMedia("(prefers-color-scheme: dark)");
  const pastille = (id) => {
    const c = id === "auto" ? ["#f2f6f6", "#0c1a1c", "#0a7c76"] : THEMES[id].apercu.split(",");
    return `linear-gradient(135deg, ${c[0]} 0 44%, ${c[1]} 44% 74%, ${c[2]} 74%)`;
  };
  const themeChoisi = () => { try { const t = localStorage.getItem(CLE_THEME); return t === "auto" || THEMES[t] ? t : THEME_DEFAUT; } catch (e) { return THEME_DEFAUT; } };
  const themeActuel = () => document.documentElement.dataset.theme || (sombreSysteme.matches ? "dark" : "light");
  const boutonTheme = document.getElementById("theme-btn");
  const menuTheme = document.getElementById("theme-menu");
  if (menuTheme) {
    menuTheme.innerHTML = `<p class="theme-menu-t" id="theme-menu-t">Apparence du site</p><div class="theme-grille">` +
      ["auto", ...Object.keys(THEMES)].map((id) => `<button type="button" data-theme-choix="${id}" aria-pressed="false"><span class="pastille" style="background:${pastille(id)}"></span><span>${id === "auto" ? "Auto" : THEMES[id].nom}</span></button>`).join("") +
      `</div><p class="theme-menu-aide">Auto : suit le réglage clair ou sombre de l'appareil.</p>`;
  }
  const boutonsTheme = document.querySelectorAll("[data-theme-choix]");
  function majTheme() {
    const t = themeActuel(), choix = themeChoisi();
    boutonsTheme.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.themeChoix === choix)));
    if (boutonTheme) {
      boutonTheme.querySelector(".pastille").style.background = pastille(choix);
      const nom = choix === "auto" ? `Auto (${THEMES[t].nom.toLowerCase()})` : THEMES[choix].nom;
      boutonTheme.setAttribute("aria-label", `Apparence : ${nom}. Ouvrir le choix des thèmes.`);
      boutonTheme.title = `Apparence : ${nom}`;
    }
    // Couleur de la barre du navigateur sur téléphone, accordée à la barre du haut (--barre de chaque thème)
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = getComputedStyle(document.documentElement).getPropertyValue("--barre").trim() || "#f2f6f6";
  }
  if (sombreSysteme.addEventListener) sombreSysteme.addEventListener("change", majTheme);
  // La feuille d'un thème n'est téléchargée que si on le choisit : on attend qu'elle soit arrivée
  // avant de changer d'apparence, pour ne pas montrer une page à moitié habillée.
  function chargerTheme(t, suite) {
    if (t === "light" || t === "dark" || document.getElementById("css-theme-" + t)) return suite();
    const base = document.querySelector('link[href*="style.css"]');
    const l = document.createElement("link");
    l.rel = "stylesheet"; l.id = "css-theme-" + t;
    l.href = base ? base.getAttribute("href").replace("style.css", `theme-${t}.css`) : `assets/theme-${t}.css`;
    l.onload = l.onerror = suite;
    document.head.appendChild(l);
  }
  function choisirTheme(t) {
    if (t === "auto" || !THEMES[t]) {
      delete document.documentElement.dataset.theme;
      try { localStorage.setItem(CLE_THEME, "auto"); } catch (e) {}
      return majTheme();
    }
    chargerTheme(t, () => {
      document.documentElement.dataset.theme = t;
      try { localStorage.setItem(CLE_THEME, t); } catch (e) {}
      majTheme();
    });
  }
  function ouvrirMenuTheme(ouvrir) {
    if (!menuTheme || !boutonTheme) return;
    menuTheme.hidden = !ouvrir;
    boutonTheme.setAttribute("aria-expanded", String(ouvrir));
    if (ouvrir) (menuTheme.querySelector('[aria-pressed="true"]') || menuTheme.querySelector("button")).focus();
  }
  boutonsTheme.forEach((b) => b.addEventListener("click", () => { choisirTheme(b.dataset.themeChoix); ouvrirMenuTheme(false); if (boutonTheme) boutonTheme.focus(); }));
  if (boutonTheme && menuTheme) {
    boutonTheme.addEventListener("click", () => ouvrirMenuTheme(menuTheme.hidden));
    document.addEventListener("click", (e) => { if (!menuTheme.hidden && !menuTheme.contains(e.target) && !boutonTheme.contains(e.target)) ouvrirMenuTheme(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menuTheme.hidden) { ouvrirMenuTheme(false); boutonTheme.focus(); } });
  }
  majTheme();

  /* ---------- Mise en forme du texte : $maths$, **gras**, puces ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // Une liste écrite dans une seule formule ($3 ; 11 ; 19 ; …$) ne peut pas passer à la ligne sur un téléphone :
  // on la découpe aux « ; » de premier niveau, chaque nombre devient une petite formule.
  function decoupeListe(src) {
    const parts = []; let d = 0, cur = "";
    for (let i = 0; i < src.length; i++) {
      const c = src[i];
      if (c === "\\") { cur += c + (src[i + 1] || ""); i++; continue; }
      if (c === "{") d++; else if (c === "}") d--;
      if (d === 0 && src.startsWith(" ; ", i)) { parts.push(cur); cur = ""; i += 2; continue; }
      cur += c;
    }
    parts.push(cur);
    return parts;
  }
  function tex(src, display) {
    const tt = !display && String(src).match(/^\s*\\texttt\{((?:[^{}\\]|\\.)*)\}\s*$/); // code Python en ligne : du texte qui peut passer à la ligne
    if (tt) return `<code class="tt">${esc(tt[1].replace(/\\([_{}#%&$ ])/g, "$1"))}</code>`;
    if (!display && src.includes(" ; ") && !/\\left|\\right|\\begin/.test(src)) {
      const parts = decoupeListe(src);
      if (parts.length > 1) return parts.map((p, k) => (k < parts.length - 1 ? colle(tex(p), "", "\u00a0;") : tex(p))).join(" "); // « ; » dans le nombre qui précède
    }
    if (window.katex) {
      // Intervalles : ]a ; b[ s'écrit comme d'habitude, l'espacement des crochets est corrigé ici
      // (sauf après \left : \left[ … \right] s'ajuste déjà tout seul)
      src = src.replace(/([\[\]])([^\[\];$]*?)\\,;([^\[\];$]*?)([\[\]])/g, (m, o, a, b, f, i, t) => (/\\left$/.test(t.slice(0, i)) ? m : `\\mathopen{${o}}${a}\\,;${b}\\mathclose{${f}}`));
      try { return katex.renderToString(src, { throwOnError: false, displayMode: !!display }); } catch (e) {}
    }
    return `<code>${esc(src)}</code>`;
  }
  // Ponctuation collée à une formule KaTeX (« ( » avant, « . » ou « ), » après) : placée DANS son premier ou son dernier
  // bloc (.base), sinon Chrome peut couper la ligne entre les deux sur un téléphone (« . » seul en début de ligne ;
  // le caractère « word joiner » n'y suffit pas)
  function colle(html, avant, apres) {
    const debut = '<span class="katex-html" aria-hidden="true"><span class="base">', fin = "</span></span></span>";
    const i = html.indexOf(debut);
    // Code Python en ligne (\texttt) : Chrome peut couper entre le code et la ponctuation qui suit (« annee(10) » puis « , » à la ligne).
    // Un code court et sa ponctuation sont mis dans un bloc insécable ; un long code garde le droit de passer à la ligne.
    const tt = /^<code class="tt">([\s\S]*)<\/code>$/.exec(html);
    if (tt && (avant || apres) && tt[1].length <= 24) return `<span class="colle-tt">${esc(avant || "")}${html}${esc(apres || "")}</span>`;
    if (!html.startsWith('<span class="katex">') || i < 0 || !html.endsWith(fin)) return esc(avant || "") + html + esc(apres || "");
    if (apres) html = html.slice(0, -fin.length) + `<span class="ponct">${esc(apres)}</span>` + fin;
    if (avant) html = html.slice(0, i + debut.length) + `<span class="ponct">${esc(avant)}</span>` + html.slice(i + debut.length);
    return html;
  }
  function inline(s) {
    const maths = [], avant = [], apres = [];
    // Typographie sur petit écran : espace insécable devant « ? ! : ; » et à l'intérieur des guillemets,
    // et aucune coupure de ligne entre une formule et la ponctuation qui la suit (pas de « . » seul en début de ligne)
    // Code en ligne entre deux accents graves (SNT : `<p>`, `https://…`) : mis de côté, affiché tel quel en police machine
    const codes = [];
    const t = String(s).replace(/(?<!`)`([^`\n]+)`(?!`)/g, (_, c) => "\u0001" + (codes.push(c) - 1) + "\u0001")
      .replace(/\$([^$]+)\$/g, (_, m) => "\u0000" + (maths.push(m) - 1) + "\u0000")
      .replace(/ ([?!:;»])/g, " $1").replace(/« /g, "« ")
      .replace(/\u0000(\d+)\u0000((?:\u00a0?[.,;:!?)%»])+)/g, (_, i, p) => { apres[i] = p; return "\u0000" + i + "\u0000"; })
      .replace(/\((?=\u0000(\d+)\u0000)/g, (_, i) => { avant[i] = "("; return ""; })
      // ni coupure entre un nombre (ou une formule) et son unité : « 45 °C », « 12 km/h », « 30 élèves »
      .replace(/(\d|\u0000) (?=(?:°C|°|%|€|[kcmd]?m[²³]?|[kmc]?g|[mcd]?L|h|min|s|ha|m\/s|km\/h|mg\/L|ans?|jours?|mois|heures?|minutes?|secondes?)(?![A-Za-zÀ-ÿ0-9]))/g, "$1\u00a0")
      // après une formule, l'espace insécable ne suffit pas (Chrome coupe quand même : « $500$ » puis « € » à la ligne) :
      // l'unité, et la ponctuation qui la suit, entrent dans la formule comme la ponctuation ci-dessus
      .replace(/\u0000(\d+)\u0000\u00a0((?:°C|°|%|€|[kcmd]?m[²³]?|[kmc]?g|[mcd]?L|h|min|s|ha|m\/s|km\/h|mg\/L|ans?|jours?|mois|heures?|minutes?|secondes?)(?:\u00a0?[.,;:!?)%»])*)(?=\s|$)/g, (m, i, u) => { if (apres[i]) return m; apres[i] = "\u00a0" + u; return "\u0000" + i + "\u0000"; });
    return esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\u0000(\d+)\u0000/g, (_, i) => colle(tex(maths[+i]), avant[i], apres[i]))
      .replace(/\u0001(\d+)\u0001/g, (_, i) => `<code class="tt">${esc(codes[+i])}</code>`);
  }
  // Étiquette devant la case réponse : « x_I = », « P(Ā ∩ B) ≈ », « Q₃ − Q₁ = » sont écrits en maths (KaTeX),
  // « Moyenne : » ou « Médiane ≈ » restent du texte. Aucune notation ne doit s'afficher brute.
  const VERS_TEX = { "Ā": "\\overline{A}", "B̄": "\\overline{B}", "∩": "\\cap ", "∪": "\\cup ", "−": "-", "σ": "\\sigma ", "α": "\\alpha ", "β": "\\beta ", "Δ": "\\Delta ", "′": "'", "≤": "\\leqslant ", "≥": "\\geqslant ", "∞": "\\infty " };
  function etiquette(p) {
    p = String(p == null ? "" : p);
    if (p.includes("$")) return inline(p);
    const m = p.match(/^(.*?)\s*(=|≈|≠)$/);
    if (!m || !m[1] || /[a-zà-ÿ]{3,}/i.test(m[1].replace(/det/g, ""))) return esc(p);
    let t = m[1].replace(/‖(\w)‖/g, "\\|\\vec{$1}\\|").replace(/det/g, "\\det ");
    t = t.replace(/B̄/g, VERS_TEX["B̄"]).replace(/[Ā∩∪−σαβΔ′≤≥∞]/g, (c) => VERS_TEX[c]);
    t = t.replace(/[₀-₉]+/g, (d) => `_{${[...d].map((c) => c.charCodeAt(0) - 0x2080).join("")}}`);
    t = t.replace(/(\d),(\d)/g, "$1{,}$2").replace(/\s;\s/g, "\\,;\\,");
    return tex(`${t} ${{ "=": "=", "≈": "\\approx", "≠": "\\neq" }[m[2]]}`);
  }
  function md(s) {
    // Blocs de code (programmes Python) entre deux lignes ``` : mis de côté d'abord, pour garder leurs lignes vides
    const codes = [];
    s = String(s).replace(/```[a-z]*\n?([\s\S]*?)\n?```/g, (_, c) => `\n\n\u0000${codes.push(c) - 1}\u0000\n\n`);
    return s.split(/\n\n+/).filter((bloc) => bloc.trim()).map((bloc) => {
      const code = bloc.trim().match(/^\u0000(\d+)\u0000$/);
      if (code) return `<pre class="code"><code>${esc(codes[+code[1]])}</code></pre>`;
      const lignes = bloc.split("\n");
      let out = "", liste = [];
      const flush = () => { if (liste.length) { out += `<ul>${liste.map((l) => `<li>${inline(l)}</li>`).join("")}</ul>`; liste = []; } };
      lignes.forEach((l) => {
        if (l.startsWith("- ")) liste.push(l.slice(2));
        else { flush(); out += `<p>${inline(l)}</p>`; }
      });
      flush();
      return out;
    }).join("");
  }
  const tableau = (t) => t.lignes
    ? `<div class="scroll-x"><table class="valeurs croise">${t.lignes.map((l, i) => `<tr>${l.map((v, j) => (i === 0 || j === 0 ? `<th>${v === "" ? "" : tex(String(v))}</th>` : `<td>${tex(String(v))}</td>`)).join("")}</tr>`).join("")}</table></div>`
    : `<div class="scroll-x"><table class="valeurs"><tr><th>${tex(t.var || "x")}</th>${t.x.map((v) => `<td>${tex(String(v))}</td>`).join("")}</tr><tr><th>${tex(t.nom)}</th>${t.y.map((v) => `<td>${tex(String(v))}</td>`).join("")}</tr></table></div>`;
  // Une figure nommée (FIGURES de assets/exercices*.js), ou une liste de noms
  // (générateurs pas encore chargés : place réservée, remplie ensuite par remplirFigures)
  const figure = (nom) => [].concat(nom || []).map((n) => (FIGURES[n] ? `<figure class="fig">${FIGURES[n]()}</figure>` : `<figure class="fig fig-attente" data-figure="${esc(n)}" aria-busy="true"></figure>`)).join("");

  /* ---------- Vidéos YouTube : vignette légère, la vidéo ne se charge qu'au clic ---------- */
  function ytId(url) {
    const m = String(url || "").match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : null;
  }
  function video(v) {
    const id = ytId(v.youtube);
    if (!id) {
      return `<div class="video video-vide"><span class="video-play" aria-hidden="true"></span><div><strong>Vidéo à venir</strong></div></div>`;
    }
    return `<button class="video" data-yt="${id}" aria-label="Lire la vidéo : ${esc(v.titre)}"><img loading="lazy" src="https://i.ytimg.com/vi/${id}/mqdefault.jpg" alt=""><span class="video-play" aria-hidden="true"></span></button>`;
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-yt]");
    if (!b) return;
    const f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0`;
    f.allow = "autoplay; encrypted-media; picture-in-picture";
    f.allowFullscreen = true;
    f.className = "video-frame";
    b.replaceWith(f);
  });

  /* ---------- Navigation par #ancre ---------- */
  const ONGLETS = [
    { id: "cours", nom: "Cours" },
    { id: "exercices", nom: "Exercices" },
    { id: "qcm", nom: "QCM" },
    { id: "defi", nom: "Défi" },
    { id: "methode", nom: "Méthode" }
  ];
  // Lycée : un chapitre qui a son fichier d'entraînement (data/<niveau>/evaluation/…, champ « eval » du manifeste)
  // remplace le Défi par « Révisions express » (le défi chrono y reste) et ajoute « Entraînement évaluation »
  const ONGLETS_EVAL = [
    { id: "cours", nom: "Cours" },
    { id: "exercices", nom: "Exercices" },
    { id: "qcm", nom: "QCM" },
    { id: "revisions", nom: "Révisions" },
    { id: "evaluation", nom: "Évaluation" },
    { id: "methode", nom: "Méthode" }
  ];
  const fichierEval = (id) => (MAN[id] && MAN[id].eval) || "";
  const ongletsDe = (id) => (fichierEval(id) || (window.EVALUATIONS && window.EVALUATIONS[id]) ? ONGLETS_EVAL : ONGLETS);
  let minuterieJeu = null; // chrono du jeu en cours, arrêté quand on change de page

  /* ---------- Chargement à la demande (rapide en 3G) ----------
     Au démarrage, index.html ne charge que le catalogue, data/manifeste.js et le moteur du site.
     À l'ouverture d'un chapitre : son fichier (data/…), KaTeX et les outils communs (assets/exercices-base.js, 7 ko).
     Les générateurs de son niveau (MOTEURS du manifeste ; au lycée, assets/lycee/<niveau>.js tiré d'assets/exercices.js)
     arrivent pour les onglets Exercices, QCM et Défi,
     ou pour une figure du cours qui en a besoin. Les fichiers déjà téléchargés restent en cache (sw.js). */
  const VERSION = (/[?&]v=([^&]+)/.exec((document.currentScript || {}).src || "") || [])[1] || "";
  const BASE = "assets/exercices-base.js", KATEX = "assets/katex/katex.min.js";
  const scriptsCharges = {}, scriptsFaits = new Set();
  const chargerScript = (src) => scriptsCharges[src] || (scriptsCharges[src] = new Promise((ok, ko) => {
    const s = document.createElement("script");
    s.src = src + (VERSION ? "?v=" + VERSION : "");
    s.onload = () => { scriptsFaits.add(src); ok(); };
    s.onerror = () => { delete scriptsCharges[src]; s.remove(); ko(new Error(src)); };
    document.body.appendChild(s);
  }));
  // Les fichiers d'exercices remplissent window.PM_EXO : on reprend ses GEN et FIGURES
  const majMoteur = () => { if (window.PM_EXO) { GEN = window.PM_EXO.GEN || GEN; FIGURES = window.PM_EXO.FIGURES || FIGURES; } };
  const chargerListe = (l) => l.reduce((p, f) => p.then(() => chargerScript(f)), Promise.resolve()).then(majMoteur);
  const moteurDe = (id) => (MAN[id] && MOTEURS[MAN[id].niveau]) || [BASE, "assets/exercices.js"];
  const moteurPret = (id) => moteurDe(id).every((f) => scriptsFaits.has(f));
  const assurerMoteur = (id) => chargerListe(moteurDe(id));
  const chapitrePret = (id) => charge(id) && scriptsFaits.has(KATEX) && scriptsFaits.has(BASE);
  // Précharge les générateurs du chapitre pendant que l'élève lit le cours, seulement si le réseau est bon
  function prechargerMoteur(id) {
    const c = navigator.connection || {};
    if (c.saveData || /(^|-)(2g|3g)$/.test(c.effectiveType || "")) return;
    const go = () => assurerMoteur(id).catch(() => {});
    if (window.requestIdleCallback) requestIdleCallback(go, { timeout: 5000 }); else setTimeout(go, 3000);
  }
  const msgAttente = (t) => `<p class="patiente" role="status">${esc(t)}</p>`;
  const msgReseau = (t) => `<p class="retour-rep info"><strong>${esc(t)}</strong> Vérifie ta connexion, puis <a href="javascript:location.reload()">recharge la page</a>. Les chapitres déjà ouverts restent lisibles hors connexion.</p>`;
  const memePage = (h) => location.hash === h;

  function route() {
    const h = location.hash.replace(/^#/, "");
    const [chap, onglet] = h.split(".");
    if (minuterieJeu) { clearInterval(minuterieJeu); minuterieJeu = null; }
    activiteEnCours = false;
    if (chap && MAN[chap] && !chapitrePret(chap)) {
      // Le titre du chapitre s'affiche tout de suite, le contenu arrive juste après
      const n = CATALOGUE.niveaux.find((x) => x.id === MAN[chap].niveau), e = n && n.chapitres.find((x) => x.id === chap);
      const retour = `<a class="retour" href="#${n ? "niveau-" + esc(n.id) : ""}">← ${n ? esc(n.nom) : "Accueil"} : tous les chapitres</a>`;
      $app.dataset.niv = MAN[chap].niveau;
      $app.innerHTML = `${retour}<header class="chap-head"><p class="eyebrow">${n ? esc(n.nom) : ""}${e && e.numero ? ` · Chapitre&nbsp;${e.numero}` : ""}</p><h1>${esc(e ? e.titre : "")}</h1></header>${msgAttente("Chargement du chapitre…")}`;
      const h0 = location.hash;
      Promise.all([chargerScript(MAN[chap].fichier), chargerScript(KATEX), chargerScript(BASE)]).then(majMoteur)
        .then(() => { if (memePage(h0)) route(); })
        .catch(() => { if (memePage(h0)) $app.innerHTML = retour + msgReseau("Le chapitre n'a pas pu se charger."); });
      setTimeout(lancerCompte, 300);
      return;
    }
    // Onglet « SNT » du bandeau (il a remplacé « Jeu ») : allumé sur la page SNT et ses chapitres
    const nivSnt = CATALOGUE.niveaux.find((n) => n.groupe === "snt");
    document.getElementById("snt-btn").toggleAttribute("aria-current", !!nivSnt && (chap === "snt" || chap === "niveau-" + nivSnt.id || nivSnt.chapitres.some((ch) => ch.id === chap)));
    $xpLien.toggleAttribute("aria-current", chap === "avatar");
    if (chap === "compte") pageCompte();
    else if (chap === "suivi") pageSuivi();
    else if (chap === "demandes") pageDemandes();
    else if (chap === "comptes") pageComptes();
    else if (chap === "frequentation") pageFrequentation();
    else if (chap === "avatar") pageAvatar();
    else if (chap === "jeu") pageJeu(onglet);
    else if (Object.prototype.hasOwnProperty.call(CYCLES, chap)) pageCycle(chap);
    else if (chap && charge(chap)) pageChapitre(chap, onglet || "cours");
    else if (chap && CATALOGUE.niveaux.some((n) => "niveau-" + n.id === chap)) pageNiveau(CATALOGUE.niveaux.find((n) => "niveau-" + n.id === chap));
    else if (chap && CATALOGUE.niveaux.some((n) => "sujets-" + n.id === chap && sujetsDe(n).length)) pageSujets(CATALOGUE.niveaux.find((n) => "sujets-" + n.id === chap));
    else if (chap && chap.startsWith("sujet-") && trouverSujet(chap.slice(6))) { const t = trouverSujet(chap.slice(6)); pageSujet(t.n, t.s, onglet); }
    else pageAccueil();
    // Fréquentation anonyme (une fois par appareil et par jour)
    if (chap === "jeu") Compte.visite("jeu");
    else if (chap && dispo(chap)) Compte.visite(chap, ongletsDe(chap).some((o) => o.id === onglet) ? onglet : onglet === "defi" && fichierEval(chap) ? "revisions" : "cours");
    else Compte.visite();
    // Couleur du niveau (Seconde, Première...) pour habiller la page niveau et la page chapitre
    const niv = CATALOGUE.niveaux.find((n) => "niveau-" + n.id === chap || "sujets-" + n.id === chap || sujetsDe(n).some((s) => "sujet-" + s.id === chap) || n.chapitres.some((ch) => ch.id === chap));
    if (niv) $app.dataset.niv = niv.id; else if (Object.prototype.hasOwnProperty.call(CYCLES, chap)) $app.dataset.niv = chap; else delete $app.dataset.niv;
    // La page est affichée : le service de comptes peut démarrer
    setTimeout(lancerCompte, 300);
  }
  window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); });
  // Lien d'évitement (clavier, lecteur d'écran) : va droit au contenu
  const $evite = document.getElementById("evite");
  if ($evite) $evite.addEventListener("click", (e) => { e.preventDefault(); $app.focus(); });

  const etoiles = (n, max) => `<span class="etoiles" aria-label="${n} étoile${n > 1 ? "s" : ""} sur ${max}">${"★".repeat(n)}<span class="off">${"★".repeat(max - n)}</span></span>`;
  // Numéro de chapitre en chiffres romains, gravé en filigrane dans le thème « Ruines »
  function romain(n) {
    n = parseInt(n, 10);
    if (!(n > 0 && n < 4000)) return "";
    let r = "";
    [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]].forEach(([v, s]) => { while (n >= v) { r += s; n -= v; } });
    return r;
  }

  function bilanChapitre(id) {
    const total = nbSeries(id) * 3;
    // Chapitre chargé : étoiles série par série ; sinon toutes les étoiles enregistrées pour ce chapitre
    const got = charge(id)
      ? CHAPITRES[id].exercices.reduce((s, e) => s + (prog.exo[id + ":" + e.type] || 0), 0)
      : Object.keys(prog.exo).filter((k) => k.startsWith(id + ":")).reduce((s, k) => s + (+prog.exo[k] || 0), 0);
    return { got: Math.min(got, total), total, qcm: prog.qcm[id] };
  }

  /* ---------- Accueil ---------- */
  // Décor du bandeau d'accueil : courbes et symboles dessinés en SVG (aucune image à télécharger)
  const DECOR_HERO = `<svg class="hero-decor" viewBox="0 0 320 240" aria-hidden="true" focusable="false">
    <g class="d-grille">${[40, 80, 120, 160, 200].map((y) => `<line x1="0" y1="${y}" x2="320" y2="${y}"/>`).join("")}${[40, 80, 120, 160, 200, 240, 280].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="240"/>`).join("")}</g>
    <path class="d-courbe" d="M40 30 Q160 330 280 30"/>
    <path class="d-courbe d2" d="M0 150 C40 100 80 100 120 150 S200 200 240 150 S300 100 320 130"/>
    <circle class="d-point" cx="160" cy="180" r="6"/>
    <text x="34" y="214">π</text><text x="236" y="72" class="t2">x²</text><text x="252" y="214" class="t3">√2</text><text x="96" y="64" class="t3">Δ</text>
  </svg>`;
  const YT_PROF = "https://www.youtube.com/@Profmaths-q1p";
  const YT_MONKA = "https://www.youtube.com/@YMONKA";
  // Les réseaux de ProfMaths (même nom partout : profmathsq1p). Icônes SVG en ligne, couleur = currentColor.
  const RESEAUX = [
    { id: "yt", nom: "YouTube", url: YT_PROF + "?sub_confirmation=1", ico: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15.1V8.9l5.4 3.1z"/></svg>` },
    { id: "ig", nom: "Instagram", url: "https://www.instagram.com/profmathsq1p/", ico: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="12" r="4.3" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="17.6" cy="6.4" r="1.4"/></svg>` },
    { id: "tt", nom: "TikTok", url: "https://www.tiktok.com/@profmathsq1p", ico: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 2h-3.4v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.1a6.3 6.3 0 1 0 5.4 6.3V8.6a8 8 0 0 0 4.7 1.5V6.7a4.7 4.7 0 0 1-4.7-4.7z"/></svg>` }
  ];
  const liensReseaux = (cls) => `<span class="${cls}">${RESEAUX.map((r) => `<a class="rs rs-${r.id}" href="${r.url}" target="_blank" rel="noopener">${r.ico}<span>${r.nom}</span></a>`).join("")}</span>`;
  // Invitation à s'abonner à la chaîne : rare et jamais en pleine série. Elle n'apparaît que sur un bilan
  // (série d'exercices ou QCM) bien réussi, après 6 séries ou 3 QCM terminés et 7 jours depuis la dernière.
  // Plus jamais après « S'abonner », « Déjà abonné » ou 2 fermetures. Jamais pour les professeurs.
  const CLE_ABO = "profmaths:abonnement", ABO_SEUIL = { s: 6, q: 3 }, ABO_DELAI = 7 * 864e5, ABO_REFUS = 2;
  const lireAbo = () => { try { return JSON.parse(localStorage.getItem(CLE_ABO) || "{}") || {}; } catch (er) { return null; } };
  const ecrireAbo = (a) => { try { localStorage.setItem(CLE_ABO, JSON.stringify(a)); return true; } catch (er) { return false; } };
  function inviteAbo(sorte, reussi) { // sorte : "s" (série d'exercices) ou "q" (QCM)
    const e = Compte.eleve(), a = lireAbo();
    if ((e && e.prof) || !a || a.fini) return "";
    a[sorte] = (a[sorte] || 0) + 1;
    const montrer = reussi && a[sorte] >= ABO_SEUIL[sorte] && Date.now() - (a.vu || 0) >= ABO_DELAI;
    if (montrer) { a.s = 0; a.q = 0; a.vu = Date.now(); }
    if (!ecrireAbo(a) || !montrer) return "";
    return `<div class="abo"><p><strong>Ça t'aide ?</strong> Retrouve toutes les vidéos de cours sur ma chaîne YouTube.</p>
      <p class="abo-btns"><a class="abo-oui" href="${YT_PROF}?sub_confirmation=1" target="_blank" rel="noopener" data-abo="oui"><span aria-hidden="true">▶</span> S'abonner</a><button type="button" data-abo="deja">Déjà abonné</button></p>
      <button type="button" class="abo-x" data-abo="non" aria-label="Fermer">×</button></div>`;
  }
  document.addEventListener("click", (ev) => {
    const b = ev.target.closest("[data-abo]");
    if (!b) return;
    const a = lireAbo() || {};
    if (b.dataset.abo === "non") a.refus = (a.refus || 0) + 1;
    if (b.dataset.abo !== "non" || a.refus >= ABO_REFUS) a.fini = 1;
    ecrireAbo(a);
    const boite = b.closest(".abo");
    // après le clic (le lien vers YouTube doit d'abord s'ouvrir)
    setTimeout(() => { if (b.dataset.abo === "non") boite.remove(); else boite.innerHTML = `<p>Merci, c'est noté ! Bon entraînement.</p>`; });
  });
  const ACCROCHES = {
    cp: "Compter et calculer jusqu'à 100",
    ce1: "Jusqu'à 1 000 et les tables",
    ce2: "Quatre opérations et mesures",
    cm1: "Fractions et nombres décimaux",
    cm2: "Bien préparé pour entrer en 6e",
    sixieme: "Les bases du collège, pas à pas",
    cinquieme: "Relatifs, fractions et calcul littéral",
    quatrieme: "Pythagore, puissances et équations",
    troisieme: "Tout pour réussir le brevet",
    seconde: "Les bases solides du lycée",
    automatismes: "Réflexes pour l'épreuve anticipée",
    premiere: "Suites, dérivation et probabilités",
    tronc: "Les maths utiles, sans la spécialité",
    techno: "Les maths des séries techno",
    "terminale-spe": "Limites, intégrales : cap sur le bac",
    expertes: "Complexes, arithmétique, graphes",
    terminale: "Garder les maths pour tes études",
    snt: "Réseaux sociaux, Internet, le Web"
  };

  const chapitresEnLigne = (n) => n.chapitres.filter((ch) => ch.statut === "disponible" && dispo(ch.id)).length;
  // L'accueil a trois grandes cartes : Primaire (groupe « ecole »), Collège (groupe « college ») et Lycée (tous les autres)
  const CYCLES = {
    ecole: { nom: "Primaire", sous: "Du CP au CM2", glyphe: "+", lead: "Choisis ta classe. Chaque chapitre suit le programme officiel du primaire en vigueur cette année.", niveaux: () => CATALOGUE.niveaux.filter((n) => n.groupe === "ecole") },
    college: { nom: "Collège", sous: "De la 6e à la 3e", glyphe: "÷", lead: "Choisis ta classe. Chaque chapitre suit le programme officiel en vigueur cette année.", niveaux: () => CATALOGUE.niveaux.filter((n) => n.groupe === "college") },
    lycee: { nom: "Lycée", sous: "De la Seconde à la Terminale", glyphe: "∫", lead: "Choisis ta classe. Les chapitres sont rangés dans l'ordre des playlists de la chaîne.", niveaux: () => CATALOGUE.niveaux.filter((n) => !n.groupe) },
    // SNT (sciences numériques et technologie, Seconde) : une seule classe, la carte ouvre directement ses chapitres
    snt: { nom: "SNT", sous: "Sciences numériques · Seconde", glyphe: "</>", lead: "Sciences numériques et technologie, en Seconde.", niveaux: () => CATALOGUE.niveaux.filter((n) => n.groupe === "snt") }
  };
  // Adresse d'un cycle : sa page de classes, ou directement la classe quand il n'en a qu'une
  const lienCycle = (k) => { const nivs = CYCLES[k].niveaux(); return nivs.length === 1 ? `#niveau-${nivs[0].id}` : `#${k}`; };
  const COURT = { "Première spécialité": "Première spé", "Première tronc commun": "Première tronc commun", "Première technologique": "Première techno", "Terminale spécialité": "Terminale spé", "Terminale maths complémentaires": "Terminale compl.", "SNT Seconde": "Réseaux sociaux · Internet · Web" };
  const carteNiveau = (href, id, nom, nb) => `<a class="carte-niv" href="${href}" data-niv="${esc(id)}"><span class="pastille-niv" aria-hidden="true"></span><span class="carte-niv-t"><strong>${esc(nom)}</strong>${ACCROCHES[id] ? `<span class="accroche">${esc(ACCROCHES[id])}</span>` : ""}<span class="meta">${nb ? `${nb} chapitre${nb > 1 ? "s" : ""} en ligne` : "En préparation"}</span></span><span class="go" aria-hidden="true">→</span></a>`;

  function pageAccueil() {
    document.title = "ProfMaths";
    const dispos = CATALOGUE.niveaux.flatMap((n) => n.chapitres.filter((ch) => ch.statut === "disponible").map((ch) => ch.id)).filter(dispo);
    const totSeries = dispos.reduce((s, k) => s + nbSeries(k), 0);
    const nbQcm = dispos.reduce((s, k) => s + nbQcmBanque(k), 0);
    let h = `<section class="hero"><div class="hero-in"><p class="eyebrow">Maths de l'école au lycée · Mayotte</p><h1>Une vidéo, un cours, des exercices. À ton rythme.</h1><p class="lead">Choisis ton niveau : tous ses chapitres s'affichent, dans l'ordre du programme.</p>
      <ul class="chiffres"><li><b>${dispos.length}</b> chapitres</li><li><b>${totSeries}</b> séries d'exercices</li><li><b>${nbQcm}</b> questions de QCM</li></ul></div>${DECOR_HERO}</section>`;
    // Grandes cartes Primaire, Collège et Lycée : chacune ouvre la page qui regroupe ses classes (la SNT passe par l'onglet du bandeau)
    h += `<h2 class="titre-bloc">Choisis ton niveau</h2><nav class="cartes-cycle" aria-label="Primaire, collège ou lycée">`;
    Object.keys(CYCLES).filter((k) => k !== "snt").forEach((k) => {
      const C = CYCLES[k], nivs = C.niveaux();
      if (!nivs.length) return;
      const nb = nivs.reduce((s, n) => s + chapitresEnLigne(n), 0);
      h += `<a class="carte-cycle" href="${lienCycle(k)}" data-niv="${k}"><span class="cycle-glyphe" aria-hidden="true">${C.glyphe}</span>
        <span class="eyebrow">${esc(C.sous)}</span><strong>${esc(C.nom)}</strong>
        <span class="cycle-classes">${nivs.map((n) => `<span>${esc(COURT[n.nom] || n.nom)}</span>`).join("")}</span>
        <span class="cycle-pied"><span class="meta">${nb ? `${nb} chapitre${nb > 1 ? "s" : ""} en ligne` : "En préparation"}</span><span class="go" aria-hidden="true">→</span></span></a>`;
    });
    h += `</nav>`;
    // Les réseaux de ProfMaths d'abord ; le jeu et la chaîne d'Yvan Monka en plus petit
    h += `<h2 class="titre-bloc">Retrouve ProfMaths</h2><section class="reseaux" aria-label="ProfMaths sur YouTube, Instagram et TikTok">
      <p class="reseaux-t"><strong>Les cours en vidéo sur YouTube, un défi d'une minute chaque jour sur Instagram et TikTok.</strong> Abonne-toi pour ne rien rater !</p>
      ${liensReseaux("rs-grand")}</section>
      <div class="decouvrir decouvrir-mini">
      <a class="promo promo-jeu" href="#jeu"><span class="promo-ico" aria-hidden="true">🏛️</span><span class="promo-t"><strong>Les Salles</strong><span>Le jeu : résous les exercices gravés sur les stèles pour ouvrir les portes.</span></span><span class="go" aria-hidden="true">→</span></a>
      <a class="promo promo-monka" href="${YT_MONKA}" target="_blank" rel="noopener"><span class="promo-ico" aria-hidden="true">▶</span><span class="promo-t"><strong>Yvan Monka</strong><span>Une autre explication de chaque notion, pour revoir une méthode autrement.</span></span><span class="go" aria-hidden="true">→</span></a>
    </div>`;
    if (!Compte.eleve()) h += `<a class="invite" href="#compte"><strong>Crée ton compte</strong><span>pour retrouver ton niveau, ton avatar et tes étoiles sur n'importe quel téléphone ou ordinateur.</span></a>`;
    h += piedDePage(false); // sur l'accueil, les réseaux sont déjà dans le bloc « Retrouve ProfMaths »
    $app.innerHTML = h;
  }
  const piedDePage = (reseaux = true) => `<footer class="pied">${reseaux ? liensReseaux("rs-liste rs-pied") : ""}<a class="rs rs-drive" href="https://drive.google.com/drive/folders/1mTeWgDGTv4hNYrD_ozxN9-cSDDGH_Oqn" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#00ac47" d="M8 3l3.9 6.6-7.4 11.9L1 15.5z"/><path fill="#ffba00" d="M8 3h8l7 12.5h-7.6z"/><path fill="#2684fc" d="M4.5 21.5l3.5-6h15l-3.5 6z"/></svg><span>Cours et corrigés</span></a><p class="pied-note">Site gratuit et sans publicité, fait par un professeur de mathématiques de Mayotte. Les chapitres déjà ouverts restent lisibles sans connexion.</p></footer>`;

  /* ---------- Pages Collège et Lycée : les classes de chaque cycle ---------- */
  function pageCycle(k) {
    const C = CYCLES[k];
    document.title = `${C.nom} · ProfMaths`;
    let h = `<a class="retour" href="#">← Accueil</a>
      <header class="niv-head"><p class="eyebrow">${esc(C.sous)}</p><h1><span class="pastille-niv" aria-hidden="true"></span>${esc(C.nom)}</h1><p class="lead">${esc(C.lead)}</p></header>
      <nav class="cartes-niv" aria-label="Classes ${{ ecole: "de l'école", college: "du collège", lycee: "du lycée" }[k]}">`;
    C.niveaux().forEach((n) => { h += carteNiveau(`#niveau-${esc(n.id)}`, n.id, n.nom, chapitresEnLigne(n)); });
    h += `</nav>` + piedDePage();
    $app.innerHTML = h;
  }

  /* ---------- Page d'un niveau : tous ses chapitres ---------- */
  function pageNiveau(n) {
    document.title = `${n.nom} · ProfMaths`;
    const cycle = n.groupe || "lycee", seul = CYCLES[cycle].niveaux().length === 1;
    let h = `<a class="retour" href="#${seul ? "" : cycle}">← ${seul ? "Accueil" : CYCLES[cycle].nom}</a>
      <header class="niv-head"><p class="eyebrow">${CYCLES[cycle].nom}</p><h1><span class="pastille-niv" aria-hidden="true"></span>${esc(n.nom)}</h1>${n.intro ? `<p class="lead">${esc(n.intro)}</p>` : `<p class="lead">Choisis ton chapitre. Ils sont rangés dans l'ordre de la playlist.</p>`}</header>
      <ol class="chapitres chapitres-niv">`;
    // Rubrique des sujets complets (devoir commun, type bac) : en tête de liste, dans une autre couleur
    if (sujetsDe(n).length) {
      const k = sujetsDe(n).length;
      h += `<li><a class="chap chap-sujets" href="#sujets-${esc(n.id)}">${pastilleSujets(n.sujets.code)}<span class="chap-t"><strong>${esc(n.sujets.rubrique)}</strong><span class="meta">${k} sujet${k > 1 ? "s" : ""} complet${k > 1 ? "s" : ""} · corrigé en ligne et en PDF</span></span><span class="go" aria-hidden="true">→</span></a></li>`;
    }
    if (!n.chapitres.length) h +=`<li><div class="chap chap-off"><span class="num num-a">…</span><span class="chap-t"><strong>Les chapitres arrivent bientôt</strong><span class="meta">En attendant, révise avec les vidéos d'<a href="${YT_MONKA}" target="_blank" rel="noopener">Yvan Monka</a>.</span></span></div></li>`;
    n.chapitres.forEach((ch) => {
      const enLigne = ch.statut === "disponible" && dispo(ch.id);
      const num = ch.code ? `<span class="num num-a">${esc(ch.code)}</span>` : ch.numero ? `<span class="num">${ch.numero}</span>` : `<span class="num num-a">A</span>`;
      if (enLigne) {
        const b = bilanChapitre(ch.id);
        const pct = b.total ? Math.round((b.got / b.total) * 100) : 0;
        // Étoiles déjà gagnées dans le chapitre, coche verte quand tout est réussi
        const gagnees = b.got ? `<span class="chap-prog${b.got >= b.total ? " fini" : ""}" aria-label="${b.got} étoiles sur ${b.total}">${b.got}/${b.total}</span>` : "";
        h += `<li><a class="chap" href="#${ch.id}">${num}<span class="chap-t"><strong>${esc(ch.titre)}</strong><span class="meta">Cours · ${nbSeries(ch.id)} séries · QCM${b.qcm !== undefined ? ` ${Math.min(b.qcm, tailleQcmId(ch.id))}/${tailleQcmId(ch.id)}` : ""}${gagnees}</span><span class="barre" role="progressbar" aria-label="Étoiles d'exercices" aria-valuemin="0" aria-valuemax="${b.total}" aria-valuenow="${b.got}"><span style="width:${pct}%"></span></span></span><span class="go" aria-hidden="true">→</span></a></li>`;
      } else {
        h += `<li><div class="chap chap-off">${num}<span class="chap-t"><strong>${esc(ch.titre)}</strong><span class="meta">En préparation${ch.drive ? ` · <a href="${ch.drive}" target="_blank" rel="noopener">documents sur le Drive</a>` : ""}</span></span></div></li>`;
      }
    });
    h += `</ol>` + piedDePage();
    $app.innerHTML = h;
  }

  /* ---------- Sujets complets d'un niveau (champ sujets du catalogue) ---------- */
  // #sujets-<niveau> : la liste ; #sujet-<id> : le sujet en ligne ; #sujet-<id>.corrige : tous les corrigés ouverts (PDF du corrigé)
  const sujetsDe = (n) => (n && n.sujets && n.sujets.liste) || [];
  // pastille de la rubrique (DC, BAC, ÉVAL…) : un code de 4 lettres est écrit plus petit pour tenir dans la pastille
  const pastilleSujets = (code) => { const c = code || "S"; return `<span class="num num-a${c.length > 3 ? " num-long" : ""}">${esc(c)}</span>`; };
  const trouverSujet = (id) => { for (const n of CATALOGUE.niveaux) { const s = sujetsDe(n).find((x) => x.id === id); if (s) return { n, s }; } return null; };
  // Sujet officiel (champ officiel) : son énoncé reste sur le site d'origine, le lien passe avant notre corrigé
  const liensPdf = (s) => {
    const liens = (s.officiel ? [`<a class="pdf" href="${esc(s.officiel.url)}" target="_blank" rel="noopener"><span class="pdf-ico" aria-hidden="true">PDF</span><span>Énoncé officiel (${esc(s.officiel.source)})${s.officiel.ko ? ` · ${s.officiel.ko} ko` : ""}</span></a>`] : [])
      .concat(["enonce", "corrige"].filter((k) => s.pdf && s.pdf[k]).map((k) =>
        `<a class="pdf" href="${esc(s.pdf[k])}${VERSION ? "?v=" + VERSION : ""}" target="_blank" rel="noopener"><span class="pdf-ico" aria-hidden="true">PDF</span><span>${k === "enonce" ? "Énoncé à imprimer" : "Corrigé détaillé"}${s.ko && s.ko[k] ? ` · ${s.ko[k]} ko` : ""}</span></a>`));
    return liens.length ? `<div class="ressources">${liens.join("")}</div>` : "";
  };
  function pageSujets(n) {
    const r = n.sujets;
    document.title = `${r.rubrique} · ${n.nom} · ProfMaths`;
    let h = `<a class="retour" href="#niveau-${esc(n.id)}">← ${esc(n.nom)} : tous les chapitres</a>
      <header class="niv-head"><p class="eyebrow">${esc(n.nom)}</p><h1><span class="pastille-niv" aria-hidden="true"></span>${esc(r.rubrique)}</h1>${r.intro ? `<p class="lead">${esc(r.intro)}</p>` : ""}</header>
      <ol class="sujets">`;
    sujetsDe(n).forEach((s) => {
      h += `<li class="sujet-carte"><a class="chap chap-sujets" href="#sujet-${esc(s.id)}">${pastilleSujets(r.code)}<span class="chap-t"><strong>${esc(s.titre)}</strong><span class="meta">${esc(s.periode || "")}${s.duree ? ` · ${esc(s.duree)}` : ""}</span></span><span class="go" aria-hidden="true">→</span></a>${liensPdf(s)}</li>`;
    });
    h += `</ol>` + piedDePage();
    $app.innerHTML = h;
  }
  function pageSujet(n, s, mode) {
    const corrige = mode === "corrige";
    document.title = `${s.titre}${corrige ? " (corrigé)" : ""} · ${n.nom} · ProfMaths`;
    const tete = `<a class="retour" href="#sujets-${esc(n.id)}">← ${esc(n.sujets.rubrique)}</a>
      <header class="chap-head"><p class="eyebrow">${esc(n.nom)} · ${esc(n.sujets.rubrique)}</p><h1>${esc(s.titre)}${corrige ? " : corrigé" : ""}</h1>${s.periode ? `<p class="lead">${esc(s.periode)}${s.duree ? ` · ${esc(s.duree)}` : ""}</p>` : ""}</header>`;
    const h0 = location.hash;
    const afficher = () => {
      const d = window.SUJETS && window.SUJETS[s.id];
      if (!d) { $app.innerHTML = tete + msgReseau("Le sujet n'a pas pu se charger."); return; }
      // sujet officiel : l'adresse complète de l'énoncé n'apparaît qu'à l'impression (PDF du corrigé), les boutons PDF étant masqués
      const source = s.officiel ? `<p class="sujet-source">Énoncé officiel (${esc(s.officiel.source)}) : <a href="${esc(s.officiel.url)}">${esc(s.officiel.url.replace(/^https?:\/\//, ""))}</a></p>` : "";
      const conseil = s.officiel ? "Ouvre l'énoncé officiel avec le bouton ci-dessus, cherche sur une feuille en temps limité, puis ouvre l'indice ou le corrigé de chaque question."
        : "En ligne : cherche d'abord sur une feuille, en temps limité, puis ouvre l'indice ou le corrigé de chaque question.";
      let h = tete + liensPdf(s) + `<div class="sujet-corps"><section class="sujet-consignes">${d.entete ? `<p class="sujet-entete">${inline(d.entete)}</p>` : ""}${d.consignes ? mdEval(d.consignes) : ""}${source}${corrige ? "" : `<p class="muted sujet-conseil">${conseil}</p>`}</section>`;
      (d.exercices || []).forEach((x, k) => { h += htmlExoEval(x, k, corrige); });
      h += `</div><a class="suite" href="#sujets-${esc(n.id)}">Tous les sujets →</a>`;
      $app.innerHTML = h;
      const corps = $app.querySelector(".sujet-corps");
      brancherEval(corps);
      corps.dataset.pret = "1"; // repère pour outils/sujets-pdf.js : le sujet est affiché
    };
    if (window.SUJETS && window.SUJETS[s.id] && scriptsFaits.has(KATEX) && scriptsFaits.has(BASE)) return afficher();
    $app.innerHTML = tete + msgAttente("Chargement du sujet…");
    Promise.all([chargerScript(s.source), chargerScript(KATEX), chargerScript(BASE)]).then(majMoteur)
      .then(() => { if (memePage(h0)) afficher(); })
      .catch(() => { if (memePage(h0)) $app.innerHTML = tete + msgReseau("Le sujet n'a pas pu se charger."); });
  }

  /* ---------- Niveau et avatar ---------- */
  // Carte résumé : avatar, niveau, rang et barre d'XP (page compte et page avatar)
  function carteProfil(grand) {
    const n = AV.niveau(prog.xp), suiv = AV.prochaine(n.niveau);
    return `<${grand ? "div" : "a href=\"#avatar\""} class="profil${grand ? " profil-grand" : ""}"><span class="profil-av">${AV.dessin(monAvatar(n.niveau), grand ? 132 : 72, "Ton avatar")}</span>
      <span class="profil-t"><span class="eyebrow">Rang ${esc(n.rang)}</span><strong>Niveau ${n.niveau}</strong>
      <span class="barre-xp" role="progressbar" aria-valuemin="0" aria-valuemax="${n.besoin}" aria-valuenow="${n.dans}" aria-label="XP vers le niveau suivant"><span style="width:${Math.round((n.dans / n.besoin) * 100)}%"></span></span>
      <span class="meta">${n.dans} / ${n.besoin} XP · encore ${n.reste} XP pour le niveau ${n.niveau + 1}</span>
      ${suiv ? `<span class="meta prochaine">Prochaine récompense au niveau ${suiv.niveau} : ${suiv.recompenses.map((r) => esc(r.nom)).join(", ")}</span>` : ""}</span></${grand ? "div" : "a"}>`;
  }

  let catAvatar = "cheveux";
  function pageAvatar() {
    document.title = "Mon avatar · ProfMaths";
    const n = AV.niveau(prog.xp);
    const rangs = window.NIVEAUX.rangs;
    $app.innerHTML = `<section class="page-avatar"><p class="eyebrow">Mon profil</p><h1>Mon avatar</h1>
      <p class="lead">Gagne des XP avec les exercices, les QCM et les défis. À chaque niveau, de nouveaux éléments se débloquent pour ton avatar.</p>
      <div id="profil">${carteProfil(true)}</div>
      <ol class="rangs" aria-label="Rangs">${rangs.map((r, k) => { const fin = rangs[k + 1] ? rangs[k + 1].des - 1 : null; const ici = n.niveau >= r.des && (fin === null || n.niveau <= fin); return `<li class="${ici ? "ici" : n.niveau > (fin || Infinity) ? "fait" : ""}"><strong>${esc(r.nom)}</strong><span>niv. ${r.des}${fin ? `–${fin}` : " et +"}</span></li>`; }).join("")}</ol>
      <h2>Personnaliser</h2>
      <div class="cats" role="tablist" aria-label="Parties de l'avatar">${AV.CATEGORIES.map((c) => `<button type="button" role="tab" data-cat="${c.id}" aria-selected="${c.id === catAvatar}">${esc(c.nom)}</button>`).join("")}</div>
      <div id="options" class="options" role="tabpanel"></div>
      <details class="regles-xp"><summary>Comment gagner des XP ?</summary>
        <ul><li><strong>Exercices :</strong> jusqu'à ${XP.question} XP par question réussie (moins avec des indices ou des erreurs), comptés au bilan à la fin de la série.</li>
        <li><strong>QCM :</strong> ${XP.bonneReponseQcm} XP par bonne réponse.</li>
        <li><strong>Défis chrono :</strong> ${XP.bonneReponseDefi} XP par bonne réponse.</li>
        <li><strong>Bats tes records :</strong> la première fois, ou quand tu fais mieux qu'avant (plus d'étoiles, meilleur score au QCM, record au défi), tu gagnes tous les XP. Rejouer sans faire mieux : ${divise(XP.rejeuSansProgres)}, et ${divise(XP.dejaParfait)} si tu avais déjà 3 étoiles ou 100 % au QCM.</li>
        <li><strong>Défis :</strong> après ${XP.defisPleinTarif} défis dans la journée, ceux sans nouveau record ont leurs ${divise(XP.defiApres)} jusqu'au lendemain.</li>
        <li>Chaque niveau demande un peu plus d'XP que le précédent : ${AV.xpPour(2)} XP pour le niveau 2, ${AV.xpPour(3) - AV.xpPour(2)} de plus pour le niveau 3, et ainsi de suite.</li></ul>
      </details></section>`;
    $app.querySelectorAll(".cats button").forEach((b) => b.addEventListener("click", () => {
      catAvatar = b.dataset.cat;
      $app.querySelectorAll(".cats button").forEach((x) => x.setAttribute("aria-selected", x === b));
      afficherOptions();
    }));
    afficherOptions();
  }
  function afficherOptions() {
    const n = AV.niveau(prog.xp).niveau, av = monAvatar(n);
    const $o = document.getElementById("options");
    $o.innerHTML = window.NIVEAUX.avatar[catAvatar].map((e) => {
      const ok = AV.debloque(e, n), choisi = av[catAvatar] === e.id;
      const apercu = AV.dessin(Object.assign({}, av, { [catAvatar]: e.id }), 64);
      return `<button type="button" class="opt-av${ok ? "" : " verrou"}" data-id="${e.id}" aria-pressed="${choisi}"${ok ? "" : " disabled"}>${apercu}<span class="opt-nom">${esc(e.nom)}</span>${ok ? "" : `<span class="opt-niv">🔒 Niveau ${e.niveau}</span>`}</button>`;
    }).join("");
    $o.querySelectorAll(".opt-av:not([disabled])").forEach((b) => b.addEventListener("click", () => {
      prog.avatar = Object.assign(monAvatar(), { [catAvatar]: b.dataset.id, t: Date.now() });
      save();
      document.getElementById("profil").innerHTML = carteProfil(true);
      const choisi = b.dataset.id;
      afficherOptions();
      const nb = document.querySelector(`#options [data-id="${choisi}"]`);
      if (nb) nb.focus();
    }));
  }

  /* ---------- Page jeu : « Les Salles », deux versions ----------
     #jeu : choix du niveau ; #jeu.facile : dossier les-salles-ecole/ (primaire et collège) ;
     #jeu.moyen : dossier les-salles/ (lycée). Chaque version a sa propre sauvegarde. */
  const VERSIONS_JEU = {
    facile: { nom: "Facile", public: "primaire et collège", dossier: "les-salles-ecole" },
    moyen: { nom: "Moyen", public: "lycée", dossier: "les-salles" }
  };
  function pageJeu(version) {
    document.title = "Les Salles · ProfMaths";
    const v = VERSIONS_JEU[version];
    const intro = `<p class="eyebrow">Jeu</p><h1>Les Salles</h1>
      <p class="lead">Un jeu de plateforme dans un temple grec : résous les exercices gravés sur les stèles pour ouvrir les portes.</p>`;
    if (!v) {
      $app.innerHTML = `<section class="page-jeu">${intro}
        <h2 class="titre-bloc">Choisis ton niveau</h2>
        <div class="choix-jeu">${Object.keys(VERSIONS_JEU).map((k) =>
          `<a class="btn" href="#jeu.${k}">${VERSIONS_JEU[k].nom} (${VERSIONS_JEU[k].public})</a>`).join("")}</div>
        <p class="muted">Chaque niveau garde sa propre progression dans ce navigateur.</p></section>`;
      return;
    }
    const src = `${v.dossier}/index.html`;
    $app.innerHTML = `<section class="page-jeu">${intro}
      <p><strong>Niveau ${v.nom} (${v.public})</strong> · <a href="#jeu">changer de niveau</a></p>
      <p class="muted">Sur ordinateur, se joue au clavier : clique une fois dans le jeu (le bouton « Commencer » suffit) pour que les touches répondent. Sur téléphone, des boutons apparaissent sous la salle : ouvre plutôt le jeu en plein écran et tiens ton téléphone à l'horizontale. Ta progression reste dans ce navigateur.</p>
      <iframe class="cadre-jeu" src="${src}" title="Jeu Les Salles, niveau ${v.nom}" width="100%" height="720" style="border:0"></iframe>
      <p class="muted"><a href="${src}" target="_blank" rel="noopener">Ouvrir le jeu en plein écran</a></p></section>`;
  }

  /* ---------- Page compte ---------- */
  function pageCompte() {
    document.title = "Mon compte · ProfMaths";
    const e = Compte.eleve();
    const demo = Compte.demo ? `<p class="demo">Mode démonstration : le compte n'est gardé que sur cet appareil. Les vrais comptes, accessibles partout, seront activés à la mise en ligne.</p>` : "";
    const deco = () => document.getElementById("deco").addEventListener("click", () => Compte.deconnecter().then(() => { location.hash = ""; }));
    if (e && e.prof && e.externe) {
      // Professeur extérieur approuvé : sa progression est gardée, il ne voit aucun élève
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Compte professeur</p><h1>Bonjour ${esc(e.prenom || "")} !</h1>
        <p class="lead">Identifiant : <strong>${esc(e.identifiant)}</strong></p>
        <p>Votre compte professeur est validé : vous pouvez utiliser tout le site, votre progression est enregistrée et vous n'apparaissez pas dans les classements des élèves.</p>
        <p class="muted">Pour que vos élèves aient des comptes rattachés à vos classes, écrivez à <a href="mailto:${MAIL_PROF}">${MAIL_PROF}</a>.</p>
        <button class="btn-sec" id="deco">Se déconnecter</button></section>`;
      return deco();
    }
    if (e && e.prof) {
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Compte professeur</p><h1>Bonjour !</h1>
        <p class="lead">Identifiant : <strong>${esc(e.identifiant)}</strong></p>
        <p class="btns-prof"><a class="btn" href="#suivi">Suivi des élèves</a> <a class="btn" href="#frequentation">Fréquentation du site</a>${Compte.chef() ? ` <a class="btn" href="#demandes">Demandes de comptes</a> <a class="btn" href="#comptes">Tous les comptes</a>` : ""}</p>
        <button class="btn-sec" id="deco">Se déconnecter</button></section>`;
      return deco();
    }
    if (e && e.attente) {
      const d = e.demande || {};
      const refus = e.attente === "refuse";
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Compte professeur</p><h1>${refus ? "Demande non retenue" : "Demande envoyée"}</h1>
        <p class="lead">Identifiant : <strong>${esc(e.identifiant)}</strong></p>
        <p>${refus ? `Votre demande de compte professeur n'a pas été acceptée. Pour en parler, écrivez à <a href="mailto:${MAIL_PROF}">${MAIL_PROF}</a>.`
          : "Votre demande est enregistrée. M. Cadena doit l'approuver : vous aurez vos droits de professeur à la prochaine connexion après son accord."}</p>
        ${refus ? "" : `<p class="demo">Pour qu'il la voie plus vite, prévenez-le par un mail déjà rédigé : il ne reste qu'à l'envoyer.</p>
        <p><a class="btn" href="${mailDemande(Object.assign({ identifiant: e.identifiant }, d))}">Prévenir M. Cadena par mail</a></p>`}
        <button class="btn-sec" id="deco">Se déconnecter</button></section>`;
      return deco();
    }
    if (e) {
      let lignes = "";
      CATALOGUE.niveaux.forEach((n) => n.chapitres.forEach((ch) => {
        if (!dispo(ch.id)) return;
        const b = bilanChapitre(ch.id);
        // Seulement les chapitres commencés : la liste complète (plus de 200 chapitres) serait illisible
        if (!b.got && b.qcm === undefined) return;
        lignes += `<li><a class="chap" href="#${ch.id}"><span class="chap-t"><strong>${esc(ch.titre)}</strong><span class="meta">${esc(n.nom)} · ${b.got}/${b.total} étoiles${b.qcm !== undefined ? ` · QCM ${Math.min(b.qcm, tailleQcmId(ch.id))}/${tailleQcmId(ch.id)}` : ""}</span><span class="barre"><span style="width:${b.total ? Math.round((b.got / b.total) * 100) : 0}%"></span></span></span></a></li>`;
      }));
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Mon compte</p><h1>Bonjour ${esc(e.prenom || e.identifiant)} !</h1>
        <p class="lead">Identifiant : <strong>${esc(e.identifiant)}</strong>${e.classe ? ` · ${esc(e.classe)}${e.groupe ? " " + esc(e.groupe) : ""}${e.niveau ? " (" + esc(e.niveau) + ")" : ""}` : ""}</p>${demo}
        ${e.inscrit ? `<p class="demo">Tu es dans une classe de M. Cadena ? Déconnecte-toi et utilise plutôt les identifiants transmis sur Pronote : c'est avec eux que ton professeur voit ton travail.</p>` : ""}
        ${carteProfil()}
        <h2>Ma progression</h2>${lignes ? `<ol class="chapitres">${lignes}</ol>` : `<p class="muted">Aucun chapitre commencé pour l'instant. Choisis ton niveau sur l'<a href="#">accueil</a> et lance une première série !</p>`}
        <p class="muted">Ta progression est enregistrée automatiquement après chaque exercice et chaque QCM.</p>
        <button class="btn-sec" id="deco">Se déconnecter</button>
        <p class="muted">Sur un téléphone partagé, pense à te déconnecter : tes points restent sauvegardés dans ton compte.</p></section>`;
      return deco();
    }
    // Connexion, ou création d'un compte : élève (hors des classes de M. Cadena) ou demande de compte professeur
    const niveaux = CATALOGUE.niveaux.filter((n) => n.id !== "automatismes" && n.nom !== "Automatismes").map((n) => n.nom);
    const options = niveaux.concat("Autre").map((n) => `<option>${esc(n)}</option>`).join("");
    const cases = niveaux.map((n) => `<label class="case"><input type="checkbox" name="pr-niv" value="${esc(n)}"> ${esc(n)}</label>`).join("");
    const champsCompte = (p) => `<label for="${p}-id">Identifiant choisi <span class="aide-champ">ex. : prenom.nom</span></label><input id="${p}-id" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" required>
        <label for="${p}-mdp">Mot de passe <span class="aide-champ">6 caractères minimum</span></label><input id="${p}-mdp" name="password" type="password" autocomplete="new-password" minlength="6" required>`;
    $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Mon compte</p><h1>Garde ta progression partout</h1>
      <p class="lead">Avec un compte, ton niveau, ton avatar et tes étoiles te suivent sur tous tes appareils.</p>${demo}
      <div class="bascule" role="tablist"><button type="button" role="tab" id="t-co" aria-selected="true">Me connecter</button><button type="button" role="tab" id="t-cr" aria-selected="false">Créer un compte</button></div>
      <form id="f-co" class="formulaire" autocomplete="on">
        <label for="co-id">Identifiant <span class="aide-champ">ex. : prenom.nom</span></label><input id="co-id" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" required>
        <label for="co-mdp">Mot de passe</label><input id="co-mdp" name="password" type="password" autocomplete="current-password" required>
        <p class="erreur" role="alert">${esc(Compte.erreurCompte())}</p><button class="btn" type="submit">Me connecter</button>
        <p class="muted">Élève de M. Cadena : tes identifiants t'ont été transmis sur Pronote. Mot de passe oublié ? Demande-le à ton professeur.</p>
      </form>
      <div id="p-cr" hidden>
        <p class="note-cadena"><strong>Tu es dans une classe de M. Cadena ?</strong> Ne crée pas de compte : tu as déjà un identifiant et un mot de passe, transmis sur Pronote. Utilise « Me connecter ».</p>
        <p class="qui">Je suis :</p>
        <div class="bascule" role="tablist"><button type="button" role="tab" id="t-el" aria-selected="true">Élève</button><button type="button" role="tab" id="t-pr" aria-selected="false">Professeur</button></div>
        <form id="f-el" class="formulaire" autocomplete="on">
          <label for="el-prenom">Prénom</label><input id="el-prenom" autocomplete="given-name" maxlength="40" required>
          <label for="el-nom">Nom <span class="aide-champ">facultatif</span></label><input id="el-nom" autocomplete="family-name" maxlength="40">
          <label for="el-niv">Niveau</label><select id="el-niv">${options}</select>
          ${champsCompte("el")}
          <p class="erreur" role="alert"></p><button class="btn" type="submit">Créer mon compte</button>
          <p class="muted">Ton compte est rangé dans « Autres élèves » : tu gardes ta progression, mais tu n'apparais pas dans les classes ni dans le classement des élèves de M. Cadena.</p>
        </form>
        <form id="f-pr" class="formulaire" autocomplete="on" hidden>
          <p class="note">Un compte professeur est validé par M. Cadena. Deux possibilités : lui écrire directement à <a href="${mailDemande({})}">${MAIL_PROF}</a>, ou remplir ce formulaire : la demande lui arrive sur son compte, et un mail tout prêt vous est proposé pour le prévenir.</p>
          <label for="pr-prenom">Prénom</label><input id="pr-prenom" autocomplete="given-name" maxlength="40" required>
          <label for="pr-nom">Nom</label><input id="pr-nom" autocomplete="family-name" maxlength="40" required>
          <label for="pr-etab">Établissement <span class="aide-champ">facultatif</span></label><input id="pr-etab" autocomplete="organization" maxlength="80">
          <fieldset class="cases"><legend>Niveaux de vos classes</legend>${cases}</fieldset>
          <label for="pr-contact">E-mail ou téléphone <span class="aide-champ">pour vous répondre</span></label><input id="pr-contact" autocomplete="email" maxlength="80" required>
          <label for="pr-msg">Message <span class="aide-champ">facultatif</span></label><textarea id="pr-msg" rows="3" maxlength="500"></textarea>
          ${champsCompte("pr")}
          <p class="erreur" role="alert"></p><button class="btn" type="submit">Envoyer ma demande</button>
        </form>
      </div></section>`;
    const envoyer = (form, action) => form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const err = form.querySelector(".erreur"), b = form.querySelector("button[type=submit]");
      err.textContent = ""; b.disabled = true;
      try { await action(); } catch (x) { err.textContent = x.message; b.disabled = false; }
    });
    const val = (id) => document.getElementById(id).value;
    const onglets = (a, b, pa, pb) => {
      const montrer = (deux) => { pa.hidden = deux; pb.hidden = !deux; a.setAttribute("aria-selected", !deux); b.setAttribute("aria-selected", deux); };
      a.addEventListener("click", () => montrer(false));
      b.addEventListener("click", () => montrer(true));
    };
    const fco = document.getElementById("f-co"), fel = document.getElementById("f-el"), fpr = document.getElementById("f-pr");
    onglets(document.getElementById("t-co"), document.getElementById("t-cr"), fco, document.getElementById("p-cr"));
    onglets(document.getElementById("t-el"), document.getElementById("t-pr"), fel, fpr);
    envoyer(fco, () => Compte.connecter(val("co-id"), val("co-mdp")));
    envoyer(fel, () => Compte.creer({ type: "eleve", prenom: val("el-prenom"), nom: val("el-nom"), niveau: val("el-niv"), classe: val("el-niv"), identifiant: val("el-id"), mdp: val("el-mdp") }));
    envoyer(fpr, () => Compte.creer({
      type: "prof", prenom: val("pr-prenom"), nom: val("pr-nom"), etablissement: val("pr-etab"), contact: val("pr-contact"), message: val("pr-msg"),
      niveaux: [...fpr.querySelectorAll("[name=pr-niv]:checked")].map((c) => c.value), identifiant: val("pr-id"), mdp: val("pr-mdp")
    }));
  }

  // Mail tout prêt pour une demande de compte professeur (le professeur n'a qu'à l'envoyer)
  const MAIL_PROF = "voltark976@gmail.com";
  function mailDemande(d) {
    const l = [
      "Bonjour,", "", "Je souhaite un compte professeur sur le site ProfMaths.", "",
      "Prénom et nom : " + [d.prenom, d.nom].filter(Boolean).join(" "),
      "Établissement : " + (d.etablissement || ""),
      "Niveaux de mes classes : " + (d.niveaux || []).join(", "),
      "Contact : " + (d.contact || "")
    ];
    if (d.identifiant) l.push("Identifiant choisi sur le site : " + d.identifiant, "", "Ma demande est enregistrée sur le site : il reste à l'approuver depuis le compte prof.maths (Mon compte > Demandes de comptes).");
    if (d.message) l.push("", d.message);
    l.push("", "Merci !");
    return `mailto:${MAIL_PROF}?subject=${encodeURIComponent("Demande de compte professeur ProfMaths")}&body=${encodeURIComponent(l.join("\n"))}`;
  }

  /* ---------- Page prof.maths : demandes de comptes professeurs et élèves inscrits sur le site ---------- */
  async function pageDemandes() {
    document.title = "Demandes de comptes · ProfMaths";
    if (!Compte.chef()) {
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Demandes de comptes</p><h1>Page réservée au compte prof.maths</h1><p><a class="btn" href="#compte">Mon compte</a></p></section>`;
      return;
    }
    $app.innerHTML = `<section class="page-compte page-demandes"><p class="eyebrow">Compte professeur</p><h1>Demandes de comptes</h1><p class="muted" id="dem-etat">Chargement…</p></section>`;
    let r;
    try { r = await Compte.demandes(); }
    catch (x) { document.getElementById("dem-etat").textContent = "Lecture impossible. Vérifie la connexion internet puis recharge la page."; return; }
    if (location.hash !== "#demandes") return;
    const date = (t) => (t && t.toDate ? t.toDate().toLocaleDateString("fr-FR") : "");
    const tri = (a, b) => ((b.creeLe && b.creeLe.seconds) || 0) - ((a.creeLe && a.creeLe.seconds) || 0);
    const ETAT = { attente: "En attente", approuve: "Approuvée", refuse: "Refusée" };
    const contact = (c) => (/@/.test(c) ? `<a href="mailto:${esc(c)}">${esc(c)}</a>` : esc(c));
    const carte = (d) => `<li class="demande ${esc(d.statut)}">
      <p><strong>${esc(d.prenom)} ${esc(d.nom)}</strong> <span class="etat">${ETAT[d.statut] || esc(d.statut)}</span></p>
      <p class="meta">Identifiant ${esc(d.identifiant)} · demandé le ${date(d.creeLe)}</p>
      ${d.etablissement ? `<p>${esc(d.etablissement)}</p>` : ""}
      <p>Niveaux : ${esc((d.niveaux || []).join(", "))}</p>
      <p>Contact : ${contact(d.contact || "")}</p>
      ${d.message ? `<p class="msg">${esc(d.message)}</p>` : ""}
      <p class="btns-prof">${d.statut !== "approuve" ? `<button class="btn" data-dem="${esc(d.uid)}" data-statut="approuve">Approuver</button>` : ""}${d.statut !== "refuse" ? ` <button class="btn-sec" data-dem="${esc(d.uid)}" data-statut="refuse">${d.statut === "approuve" ? "Retirer l'accès" : "Refuser"}</button>` : ""}${d.statut === "refuse" ? ` <button class="btn-sec" data-dem="${esc(d.uid)}" data-statut="attente">Remettre en attente</button>` : ""}</p></li>`;
    const enAttente = r.profs.filter((d) => d.statut === "attente").sort(tri), traitees = r.profs.filter((d) => d.statut !== "attente").sort(tri);
    const eleves = r.eleves.sort(tri);
    document.querySelector(".page-demandes").innerHTML = `<p class="eyebrow">Compte professeur</p><h1>Demandes de comptes</h1>
      <h2>Professeurs en attente (${enAttente.length})</h2>
      ${enAttente.length ? `<ul class="demandes">${enAttente.map(carte).join("")}</ul>` : `<p class="muted">Aucune demande en attente.</p>`}
      <p class="muted">Un professeur approuvé reçoit ses droits à sa prochaine connexion : sa progression est gardée, il n'apparaît pas dans le classement et ne voit aucun élève. Pour qu'il suive des classes, crée-lui un compte avec outils/comptes (option --prof).</p>
      ${traitees.length ? `<details><summary>Demandes déjà traitées (${traitees.length})</summary><ul class="demandes">${traitees.map(carte).join("")}</ul></details>` : ""}
      <h2>Autres élèves (${eleves.length})</h2>
      <p class="muted">Élèves qui ont créé leur compte sur le site. Ils n'apparaissent ni dans tes classes ni dans le classement.</p>
      ${eleves.length ? `<div class="table-defile"><table class="table-autres"><tr><th>Élève</th><th>Niveau</th><th>Identifiant</th><th>Créé le</th><th>XP</th></tr>${eleves.map((x) => `<tr><td>${esc(x.prenom)} ${esc(x.nom || "")}</td><td>${esc(x.niveau || "")}</td><td>${esc(x.identifiant)}</td><td>${date(x.creeLe)}</td><td>${+x.xp || 0}</td></tr>`).join("")}</table></div>` : `<p class="muted">Aucun pour l'instant.</p>`}`;
    document.querySelectorAll("[data-dem]").forEach((b) => b.addEventListener("click", async () => {
      b.disabled = true;
      try { await Compte.decider(b.dataset.dem, b.dataset.statut); pageDemandes(); }
      catch (x) { b.disabled = false; alert("Modification impossible : " + x.message); }
    }));
  }

  /* ---------- Page professeur : qui a fait quoi (devoirs) ---------- */
  let suiviCache = null; // { eleves (fiches des élèves déjà connectés), classes (listes écrites par outils/comptes) }
  const suiviChoix = { groupe: "", chap: "*", depuis: "", au: "", tri: { col: "nom", sens: 1 }, filtres: {} };
  let suiviCols = []; // colonnes du tableau affiché (pour le tri)
  async function pageSuivi() {
    document.title = "Suivi des élèves · ProfMaths";
    const e = Compte.eleve();
    if (!e || !e.prof || e.externe) {
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Suivi des élèves</p><h1>Page réservée au professeur</h1><p><a class="btn" href="#compte">Se connecter</a></p></section>`;
      return;
    }
    $app.innerHTML = `<section class="page-suivi"><p class="eyebrow">Compte professeur</p><h1>Suivi des élèves</h1><p class="muted" id="suivi-etat">Chargement…</p></section>`;
    try { suiviCache = await Compte.suivi(); }
    catch (x) { document.getElementById("suivi-etat").textContent = "Lecture impossible. Vérifie la connexion internet puis recharge la page."; return; }
    if (location.hash !== "#suivi") return;
    afficherSuivi();
  }
  const sansAccent = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  // Filtres proposés pour une date (t en ms, 0 = jamais), une durée (secondes) ou un nombre
  function choixDate(val, jamais) {
    const j = (n) => Date.now() - n * 864e5, auj = jourISO(new Date());
    return [["auj", "Aujourd'hui", (l) => val(l) > 0 && jourISO(new Date(val(l))) === auj], ["7", "7 derniers jours", (l) => val(l) >= j(7)], ["30", "30 derniers jours", (l) => val(l) >= j(30)],
      ["vieux", "Plus de 30 jours", (l) => val(l) > 0 && val(l) < j(30)], ["jamais", jamais, (l) => !val(l)]];
  }
  const choixDuree = (val) => [["0", "Aucun", (l) => !val(l)], ["5", "5 min ou plus", (l) => val(l) >= 300], ["15", "15 min ou plus", (l) => val(l) >= 900], ["30", "30 min ou plus", (l) => val(l) >= 1800], ["60", "1 h ou plus", (l) => val(l) >= 3600]];
  const choixNombre = (val, seuils) => [["0", "0", (l) => !val(l)]].concat(seuils.map((n) => [String(n), `${n} ou plus`, (l) => val(l) >= n]));
  // Colonnes masquées par le professeur, par tableau (gardées sur son appareil) ; la première colonne (nom) reste toujours
  const CLE_COLONNES = "profmaths:colonnes:";
  let colonnesOuvert = false; // la liste des colonnes reste ouverte après un changement
  function colonnesCachees(cle) {
    try { const v = JSON.parse(localStorage.getItem(CLE_COLONNES + cle) || "[]"); return Array.isArray(v) ? v : []; } catch (e) { return []; }
  }
  // Tableau triable (touche un titre), filtrable (ligne sous les titres) et dont on choisit les colonnes affichées.
  // cols : [{ id, titre, val(l) = valeur de tri, html(l, i), classe(l), choix = "texte" | [[valeur, libellé, test(l)]], desc = premier tri décroissant }]
  // opts.cle : nom sous lequel sont gardées les colonnes masquées (par défaut classeTable)
  function tableauSuivi(toutes, lignes, classeTable, detail, opts) {
    suiviCols = toutes;
    const cle = (opts && opts.cle) || classeTable, cachees = colonnesCachees(cle);
    const cols = toutes.filter((c, j) => j === 0 || !cachees.includes(c.id));
    const choixCols = `<details class="suivi-colonnes"${colonnesOuvert ? " open" : ""}><summary>Colonnes affichées (${cols.length - 1} sur ${toutes.length - 1})</summary><div>${toutes.slice(1).map((c) => `<label${c.aide ? ` title="${esc(c.aide)}"` : ""}><input type="checkbox" data-colonne="${c.id}" data-cle="${esc(cle)}"${cachees.includes(c.id) ? "" : " checked"}> ${c.titre}</label>`).join("")}</div></details>`;
    colonnesOuvert = false;
    const choix = (opts && opts.choix) || suiviChoix, mots = Object.assign({ pl: "élèves", vide: "Aucun élève pour l'instant.", filtre: "Aucun élève ne correspond aux filtres." }, opts && opts.mots);
    const f = choix.filtres, t = choix.tri;
    const visibles = lignes.filter((l) => cols.every((c) => {
      const v = f[c.id]; if (!v) return true;
      if (c.choix === "texte") return sansAccent(c.val(l)).includes(sansAccent(v));
      const o = c.choix.find((o) => o[0] === v); return !o || o[2](l);
    }));
    const col = cols.find((c) => c.id === t.col) || cols[0], sens = t.sens || 1;
    const cmp = (c, a, b) => { const x = c.val(a), y = c.val(b); return typeof x === "string" || typeof y === "string" ? String(x).localeCompare(String(y), "fr") : x - y; };
    visibles.sort((a, b) => cmp(col, a, b) * sens || cmp(cols[0], a, b));
    const nbFiltres = cols.filter((c) => f[c.id]).length;
    const entete = cols.map((c) => `<th scope="col" aria-sort="${c.id === col.id ? (sens > 0 ? "ascending" : "descending") : "none"}"${c.aide ? ` title="${esc(c.aide)}"` : ""}><button type="button" class="tri" data-tri="${c.id}">${c.titre}<span class="fleche" aria-hidden="true">${c.id === col.id ? (sens > 0 ? "▲" : "▼") : "⇅"}</span></button></th>`).join("");
    const filtres = cols.map((c) => `<th>${c.choix === "texte"
      ? `<input type="search" data-filtre="${c.id}" value="${esc(f[c.id] || "")}" placeholder="Filtrer" aria-label="Filtrer : ${esc(c.aide || c.titre)}" autocomplete="off">`
      : `<select data-filtre="${c.id}" aria-label="Filtrer : ${esc(c.aide || c.titre)}"${f[c.id] ? ` class="actif"` : ""}><option value="">Tous</option>${c.choix.map((o) => `<option value="${o[0]}"${f[c.id] === o[0] ? " selected" : ""}>${o[1]}</option>`).join("")}</select>`}</th>`).join("");
    const corps = visibles.map((l, i) => `<tr${l.cls ? ` class="${l.cls}"` : ""}>${cols.map((c, j) => j === 0 ? `<th scope="row">${c.html(l, i)}</th>` : `<td${c.classe && c.classe(l) ? ` class="${c.classe(l)}"` : ""}>${c.html(l, i)}</td>`).join("")}</tr>${detail ? detail(l, i) : ""}`).join("");
    const vide = lignes.length ? mots.filtre : mots.vide;
    return `${choixCols}<p class="suivi-compte muted">${nbFiltres ? `<strong>${visibles.length}</strong> ${mots.pl} affichés sur ${lignes.length} · <button type="button" class="lien" id="s-effacer">Effacer les filtres</button>` : `${lignes.length} ${mots.pl} · touche un titre de colonne pour trier, la ligne du dessous pour filtrer.`}</p>
      <div class="scroll-x"><table class="suivi ${classeTable}"><thead><tr>${entete}</tr><tr class="suivi-filtres">${filtres}</tr></thead><tbody>${corps || `<tr><td colspan="${cols.length}">${vide}</td></tr>`}</tbody></table></div>`;
  }
  function afficherSuivi() {
    // Le détail d'un chapitre a besoin de son fichier (titres des séries) et de KaTeX : on les charge d'abord
    if (suiviChoix.chap && suiviChoix.chap !== "*" && MAN[suiviChoix.chap] && !chapitrePret(suiviChoix.chap)) {
      const etat = document.getElementById("suivi-etat") || $app.querySelector(".suivi-compte");
      if (etat) etat.textContent = "Chargement du chapitre…";
      Promise.all([chargerScript(MAN[suiviChoix.chap].fichier), chargerScript(KATEX), chargerScript(BASE)]).then(majMoteur)
        .catch(() => { suiviChoix.chap = "*"; })
        .then(() => { if (location.hash === "#suivi") afficherSuivi(); });
      return;
    }
    const classes = (suiviCache || {}).classes || {};
    // Classes du professeur (même sans élève encore connecté), classes des listes et classes présentes dans les fiches
    const groupes = groupesProf();
    if (!groupes.includes(suiviChoix.groupe)) suiviChoix.groupe = groupes[0] || "";
    const chaps = [];
    CATALOGUE.niveaux.forEach((n) => n.chapitres.forEach((ch) => { if (dispo(ch.id)) chaps.push({ id: ch.id, titre: ch.titre, niveau: n.nom }); }));
    if (suiviChoix.chap !== "*" && suiviChoix.chap !== "note" && !chaps.some((c) => c.id === suiviChoix.chap)) suiviChoix.chap = "*";
    const liste = elevesGroupe(suiviChoix.groupe);
    const infos = { avecListe: !!classes[suiviChoix.groupe], jamais: liste.filter((x) => x.jamais).length };
    const choix = (extra) => `<div class="suivi-choix">
        <label>Classe <select id="s-groupe">${groupes.map((g) => `<option${g === suiviChoix.groupe ? " selected" : ""}>${esc(g)}</option>`).join("")}</select></label>
        <label>Chapitre <select id="s-chap"><option value="*"${suiviChoix.chap === "*" ? " selected" : ""}>Tout le site</option><option value="note"${suiviChoix.chap === "note" ? " selected" : ""}>Notation (chapitres du niveau)</option>${chaps.map((ch) => `<option value="${esc(ch.id)}"${ch.id === suiviChoix.chap ? " selected" : ""}>${esc(ch.niveau)} · ${esc(ch.titre)}</option>`).join("")}</select></label>
        <label>${suiviChoix.chap === "*" ? "Depuis le" : suiviChoix.chap === "note" ? "Du" : "Fait depuis le"} <input type="date" id="s-depuis" value="${esc(suiviChoix.depuis)}"></label>${extra || ""}
        <button class="btn-sec" id="s-maj" type="button">Actualiser</button>
      </div>`;
    const brancher = () => {
      const maj = (cle, el) => el && el.addEventListener("change", () => { suiviChoix[cle] = el.value; afficherSuivi(); });
      maj("groupe", document.getElementById("s-groupe"));
      maj("chap", document.getElementById("s-chap"));
      maj("depuis", document.getElementById("s-depuis"));
      document.getElementById("s-maj").addEventListener("click", pageSuivi);
      brancherTableau(suiviChoix, afficherSuivi);
    };
    if (suiviChoix.chap === "*") { suiviSite(liste, choix, infos); brancher(); return; }
    if (suiviChoix.chap === "note") { suiviNotation(choix, infos); brancher(); return; }
    const c = CHAPITRES[suiviChoix.chap];
    const depuis = suiviChoix.depuis ? new Date(suiviChoix.depuis + "T00:00").getTime() : 0;
    const date = (t) => new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
    const taille = tailleQcm(c);
    let faits = 0;
    const lignes = liste.map((x) => {
      const q = x.quand || {};
      // Fait = essayé (depuis la date choisie, si elle est indiquée)
      const fait = (k, existe) => (depuis ? (q[k] || 0) >= depuis : existe);
      let dernier = 0;
      const series = c.exercices.map((ex) => {
        const k = suiviChoix.chap + ":" + ex.type, st = (x.exo || {})[k];
        if (q[k]) dernier = Math.max(dernier, q[k]);
        return { ok: fait(k, st !== undefined), st: st || 0, le: q[k] };
      });
      const kq = "qcm:" + suiviChoix.chap, sq = (x.qcm || {})[suiviChoix.chap];
      if (q[kq]) dernier = Math.max(dernier, q[kq]);
      const qcm = { ok: fait(kq, sq !== undefined), score: Math.min(sq || 0, taille) };
      if (series.some((s) => s.ok) || qcm.ok) faits++;
      return { x, series, qcm, dernier, tps: +((x.temps || {}).ch || {})[suiviChoix.chap] || 0, xp: +x.xp || 0, cls: x.jamais ? "jamais" : "" };
    });
    const nom = (x) => `${esc(x.nom || "")} ${esc(x.prenom || x.identifiant || "")}`;
    const cols = [{ id: "nom", titre: "Élève", aide: "Nom de l'élève", val: (l) => `${l.x.nom || ""} ${l.x.prenom || l.x.identifiant || ""}`.toLowerCase(), html: (l) => nom(l.x), choix: "texte" }]
      .concat(c.exercices.map((ex, i) => ({
        id: "s" + i, titre: `S${i + 1}`, aide: ex.titre.replace(/\$/g, ""), desc: true,
        val: (l) => (l.series[i].ok ? l.series[i].st : -1),
        html: (l) => { const s = l.series[i]; return s.ok ? `${"★".repeat(s.st)}${s.st ? "" : "0"}` : "·"; },
        classe: (l) => (l.series[i].ok ? "fait" : "vide"),
        choix: [["fait", "Fait", (l) => l.series[i].ok], ["pas", "Pas fait", (l) => !l.series[i].ok], ["3", "3 étoiles", (l) => l.series[i].ok && l.series[i].st >= 3], ["<3", "Fait, moins de 3 étoiles", (l) => l.series[i].ok && l.series[i].st < 3]]
      })))
      .concat([
        { id: "qcm", titre: "QCM", aide: `QCM sur ${taille}`, desc: true, val: (l) => (l.qcm.ok ? l.qcm.score : -1), html: (l) => (l.qcm.ok ? `${l.qcm.score}/${taille}` : "·"), classe: (l) => (l.qcm.ok ? "fait qcm" : "vide"),
          choix: [["fait", "Fait", (l) => l.qcm.ok], ["pas", "Pas fait", (l) => !l.qcm.ok], ["tout", "Tout juste", (l) => l.qcm.ok && l.qcm.score >= taille], ["moitie", "Moins de la moitié", (l) => l.qcm.ok && l.qcm.score * 2 < taille]] },
        { id: "dernier", titre: "Dernier essai", aide: "Date du dernier essai dans ce chapitre", desc: true, val: (l) => l.dernier, html: (l) => (l.dernier ? date(l.dernier) : "–"), choix: choixDate((l) => l.dernier, "Pas encore") },
        { id: "temps", titre: "Temps", aide: "Temps actif passé dans ce chapitre", desc: true, val: (l) => l.tps, html: (l) => (l.tps ? duree(l.tps) : "–"), choix: choixDuree((l) => l.tps) },
        { id: "xp", titre: "XP", aide: "Points d'expérience", desc: true, val: (l) => l.xp, html: (l) => l.xp, choix: choixNombre((l) => l.xp, [50, 100, 200, 500]) }
      ]);
    $app.innerHTML = `<section class="page-suivi"><p class="eyebrow">Compte professeur · <a href="#frequentation">Fréquentation du site</a></p><h1>Suivi des élèves</h1>
      ${choix()}
      <p class="lead"><strong>${faits}/${liste.length}</strong> élèves ont fait au moins une série ou le QCM${depuis ? ` depuis le ${new Date(depuis).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}` : ""}.</p>
      <p class="muted">${c.exercices.map((ex, i) => `S${i + 1} : ${inline(ex.titre)}`).join(" · ")}. Étoiles = meilleur résultat (0 à 3), « · » = pas fait. Temps = temps actif passé dans ce chapitre (au total). ${infos.avecListe ? `Les élèves jamais connectés au site sont en grisé${infos.jamais ? ` (${infos.jamais})` : ""}.` : "Un élève n'apparaît qu'après sa première connexion (lance « creer-comptes.js --classes » pour voir aussi les autres)."}</p>
      ${tableauSuivi(cols, lignes, "suivi-chap")}</section>`;
    brancher();
  }
  // Élèves d'une classe : fiches des élèves déjà connectés, complétées par la liste de classe (élèves jamais connectés, marqués « jamais »)
  function elevesGroupe(g) {
    const donnees = suiviCache || {}, fiches = donnees.eleves || [], classes = donnees.classes || {};
    const parUid = new Map(fiches.filter((x) => (x.groupe || x.classe || "?") === g).map((x) => [x.uid, x]));
    const liste0 = (classes[g] || {}).eleves || {};
    Object.keys(liste0).forEach((uid) => { if (!parUid.has(uid)) parUid.set(uid, Object.assign({ uid, groupe: g, jamais: true }, liste0[uid])); });
    return [...parUid.values()];
  }
  // Classes visibles par le professeur (les seules dont les fiches ont été lues)
  function groupesProf() {
    const d = suiviCache || {}, fiches = d.eleves || [], classes = d.classes || {};
    return [...new Set(((Compte.eleve() || {}).groupes || []).concat(Object.keys(classes), fiches.map((x) => x.groupe || x.classe || "?")))].sort();
  }

  /* ---------- Notation : XP et temps dans les chapitres du niveau de la classe, note sur 20 ----------
    Note = 20 × (p × min(1, XP ÷ XP de référence) + (1 − p) × min(1, temps ÷ temps de référence)), arrondie au demi-point.
    p = poids des XP (50 % par défaut). Référence par défaut : ce qu'a fait le 3e élève le plus actif de la classe ;
    le professeur peut la fixer (réglages gardés sur son appareil, par classe). XP et temps viennent de temps.xj et temps.jc
    (par jour et par chapitre, enregistrés depuis novembre 2026, voir compte.js). */
  const CLE_NOTATION = "profmaths:notation:";
  const RANG_REF = 3;
  function reglagesNotation(g) {
    let r = {};
    try { r = JSON.parse(localStorage.getItem(CLE_NOTATION + g) || "{}") || {}; } catch (e) { r = {}; }
    return { poids: r.poids !== "" && Number.isFinite(+r.poids) && r.poids != null ? Math.min(100, Math.max(0, +r.poids)) : 50, refXp: +r.refXp > 0 ? +r.refXp : 0, refT: +r.refT > 0 ? +r.refT : 0, autos: r.autos !== false, estim: r.estim !== false };
  }
  function garderNotation(g, r) { try { localStorage.setItem(CLE_NOTATION + g, JSON.stringify(r)); } catch (e) { /* rien */ } }
  // Niveau de la classe : celui inscrit dans les comptes (« Seconde », « Première spécialité »…), qui est aussi le nom du niveau du catalogue
  function niveauGroupe(g, liste) {
    const cg = ((suiviCache || {}).classes || {})[g];
    const cl = (cg && cg.classe) || (liste.find((x) => x.classe) || {}).classe || "";
    return CATALOGUE.niveaux.find((n) => n.nom === cl) || null;
  }
  const minutes = (sec) => Math.round((+sec || 0) / 6) / 10; // minutes à une décimale (les mêmes dans le tableau Excel)
  const arrondiDemi = (x) => Math.round(x * 2) / 2;
  /* Avant la mise à jour du 3 novembre 2026, le site ne gardait que le total des XP et le temps par jour (le temps par chapitre
    s'effaçait souvent). On estime la part du niveau de la classe dans ce passé :
    - XP : (XP totaux − XP enregistrés par chapitre depuis) × part du niveau dans les meilleurs résultats de l'élève
      (étoiles des séries, meilleur QCM, record au défi, pondérés comme les XP qu'ils rapportent) ;
    - temps : (temps total par jour − temps enregistré par chapitre depuis) × part du niveau dans le temps par chapitre qui reste
      (à défaut, la part des XP). */
  const DEBUT_NOTATION = "2026-11-03";
  const XP_ETOILES = [10, 28, 40, 47]; // XP probables d'une série de 5 questions selon ses étoiles (0 à 3)
  function estimationAvant(x, ids) {
    const poids = {}, ajout = (c, v) => { if (v > 0) poids[c] = (poids[c] || 0) + v; };
    for (const k in x.exo || {}) ajout(k.split(":")[0], XP_ETOILES[Math.max(0, Math.min(3, +x.exo[k] || 0))]);
    for (const c in x.qcm || {}) ajout(c, (+x.qcm[c] || 0) * XP.bonneReponseQcm);
    for (const k in x.jeux || {}) if (k.startsWith("chrono:")) ajout(k.slice(7), (+x.jeux[k] || 0) * 0.2);
    const part = (o) => { let tout = 0, niv = 0; for (const c in o) { const v = +o[c] || 0; tout += v; if (ids.has(c)) niv += v; } return tout > 0 ? niv / tout : null; };
    const somme = (o) => Object.values(o || {}).reduce((a, v) => a + (+v || 0), 0);
    const t = x.temps || {}, pXp = part(poids), pT = part(t.ch || {});
    const xpAvant = Math.max(0, (+x.xp || 0) - somme(t.xp));
    const secAvant = Math.max(0, somme(t.j) - Object.values(t.jc || {}).reduce((a, o) => a + somme(o), 0));
    return { xp: xpAvant * (pXp || 0), sec: secAvant * (pT != null ? pT : pXp || 0) };
  }
  function notationGroupe(g) {
    const liste = elevesGroupe(g), niv = niveauGroupe(g, liste), r = reglagesNotation(g);
    const avecAutos = !!niv && (niv.id === "seconde" || niv.id === "premiere");
    const ids = new Set(niv ? niv.chapitres.map((c) => c.id) : []);
    if (avecAutos && r.autos) (CATALOGUE.niveaux.find((n) => n.id === "automatismes") || { chapitres: [] }).chapitres.forEach((c) => ids.add(c.id));
    const du = suiviChoix.depuis || "", au = suiviChoix.au || "";
    const dans = (j) => (!du || j >= du) && (!au || j <= au);
    const lignes = liste.map((x) => {
      const t = x.temps || {}, xj = t.xj || {}, jc = t.jc || {}, chs = new Set();
      let xp = 0, sec = 0;
      for (const j in xj) if (dans(j)) for (const c in xj[j]) if (ids.has(c)) { xp += +xj[j][c] || 0; chs.add(c); }
      for (const j in jc) if (dans(j)) for (const c in jc[j]) if (ids.has(c)) { sec += +jc[j][c] || 0; chs.add(c); }
      // Estimation d'avant la mise à jour, si la période la contient
      let est = null;
      if (r.estim && (!du || du < DEBUT_NOTATION) && !x.jamais) {
        est = estimationAvant(x, ids); xp += est.xp; sec += est.sec;
        for (const k in x.exo || {}) { const c = k.split(":")[0]; if (ids.has(c)) chs.add(c); }
        for (const c in x.qcm || {}) if (ids.has(c)) chs.add(c);
      }
      return { x, xp: Math.round(xp), tps: minutes(sec), nb: chs.size, estXp: est ? Math.round(est.xp) : 0, estTps: est ? minutes(est.sec) : 0, cls: x.jamais ? "jamais" : "" };
    });
    // Référence automatique : valeur du 3e meilleur élève (ou du dernier s'il y en a moins de 3 qui ont travaillé)
    const auto = (val) => { const v = lignes.map(val).filter((y) => y > 0).sort((a, b) => b - a); return v.length ? v[Math.min(RANG_REF, v.length) - 1] : 0; };
    const refXp = r.refXp || auto((l) => l.xp), refT = r.refT || auto((l) => l.tps), p = r.poids / 100;
    lignes.forEach((l) => {
      const a = refXp > 0 ? Math.min(1, l.xp / refXp) : 0, b = refT > 0 ? Math.min(1, l.tps / refT) : 0;
      l.note = arrondiDemi(20 * (p * a + (1 - p) * b));
    });
    return { g, niv, ids, r, avecAutos, du, au, lignes, refXp, refT, autoXp: !r.refXp, autoT: !r.refT, p, estim: r.estim && (!du || du < DEBUT_NOTATION) };
  }
  const virgule = (x, d) => String(d == null ? x : (+x).toFixed(d)).replace(".", ",");
  function statsNotes(v) {
    if (!v.length) return null;
    const s = [...v].sort((a, b) => a - b), n = s.length, moy = s.reduce((a, b) => a + b, 0) / n;
    return { moy, med: n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2, min: s[0], max: s[n - 1], et: Math.sqrt(s.reduce((a, b) => a + (b - moy) ** 2, 0) / n) };
  }
  const dateLongue = (j) => new Date(j + "T00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
  const SANS_DONNEES = "Aucune donnée de niveau pour l'instant : les XP et le temps par chapitre sont comptés depuis la mise à jour du 3 novembre 2026 au soir. Les chiffres apparaîtront dès qu'un élève connecté fera une série, un QCM ou un défi.";
  const notationVide = (N) => !N.lignes.some((l) => l.xp > 0 || l.tps > 0);
  function suiviNotation(choix, infos) {
    const N = notationGroupe(suiviChoix.groupe), r = N.r;
    const periode = N.du || N.au ? `${N.du ? `du ${dateLongue(N.du)}` : "depuis le début"}${N.au ? ` au ${dateLongue(N.au)}` : " à aujourd'hui"}` : "depuis le début du comptage";
    const nom = (x) => `${esc(x.nom || "")} ${esc(x.prenom || x.identifiant || "")}`;
    const cols = [
      { id: "nom", titre: "Élève", aide: "Nom de l'élève", val: (l) => `${l.x.nom || ""} ${l.x.prenom || l.x.identifiant || ""}`.toLowerCase(), html: (l) => nom(l.x), choix: "texte" },
      { id: "nxp", titre: "XP niveau", aide: "XP gagnés dans les chapitres du niveau", desc: true, val: (l) => l.xp, html: (l) => l.xp || "–", choix: choixNombre((l) => l.xp, [50, 100, 200, 500]) },
      { id: "ntps", titre: "Temps niveau", aide: "Temps actif dans les chapitres du niveau", desc: true, val: (l) => l.tps, html: (l) => (l.tps ? duree(l.tps * 60) : "–"), choix: choixDuree((l) => l.tps * 60) },
      { id: "nnb", titre: "Chapitres", aide: "Chapitres du niveau travaillés", desc: true, val: (l) => l.nb, html: (l) => l.nb || "–", choix: choixNombre((l) => l.nb, [1, 2, 3, 5]) },
      { id: "nnote", titre: "Note /20", aide: "Note au prorata des XP et du temps", desc: true, val: (l) => l.note, html: (l) => `<strong>${virgule(l.note)}</strong>`,
        choix: [["<8", "Moins de 8", (l) => l.note < 8], ["8-12", "De 8 à moins de 12", (l) => l.note >= 8 && l.note < 12], ["12-16", "De 12 à moins de 16", (l) => l.note >= 12 && l.note < 16], ["16+", "16 ou plus", (l) => l.note >= 16]] }
    ];
    const st = statsNotes(N.lignes.map((l) => l.note));
    const tuile = (b, t) => `<div class="freq-tuile"><b>${b}</b><span>${t}</span></div>`;
    const champ = (id, lib, val, attrs) => `<label>${lib} <input id="${id}" ${attrs} value="${esc(val)}"></label>`;
    const reglages = `<div class="suivi-choix notation-reglages">
        ${champ("n-poids", "Poids des XP (%)", r.poids, 'type="number" min="0" max="100" step="5" inputmode="numeric"')}
        ${champ("n-refxp", "XP pour 20/20", r.refXp || "", `type="number" min="1" step="10" inputmode="numeric" placeholder="auto : ${N.refXp || "–"}"`)}
        ${champ("n-reft", "Minutes pour 20/20", r.refT || "", `type="number" min="1" step="5" inputmode="numeric" placeholder="auto : ${N.refT ? Math.round(N.refT) : "–"}"`)}
        <label class="case-notation"><input type="checkbox" id="n-estim"${r.estim ? " checked" : ""}> Estimer avant le 3 novembre</label>
        ${N.avecAutos ? `<label class="case-notation"><input type="checkbox" id="n-autos"${r.autos ? " checked" : ""}> Compter les Automatismes</label>` : ""}
      </div>`;
    $app.innerHTML = `<section class="page-suivi"><p class="eyebrow">Compte professeur · <a href="#frequentation">Fréquentation du site</a></p><h1>Suivi des élèves</h1>
      ${choix(`<label>Au <input type="date" id="s-au" value="${esc(N.au)}"></label>`)}
      <p class="lead">Notation de la classe <strong>${esc(N.g)}</strong> : chapitres de <strong>${esc(N.niv ? N.niv.nom : "niveau inconnu")}</strong>${N.avecAutos && r.autos ? " et Automatismes" : ""}, ${periode}.</p>
      ${notationVide(N) ? `<p class="alerte-notation">${SANS_DONNEES}</p>` : ""}
      ${reglages}
      <p class="muted">Note = 20 × (${virgule(r.poids)} % × XP ÷ ${N.refXp || "?"} + ${virgule(100 - r.poids)} % × temps ÷ ${N.refT ? duree(N.refT * 60) : "?"}), chaque rapport plafonné à 1, arrondie au demi-point.
        ${N.autoXp || N.autoT ? `Une case vide prend ce qu'a fait le ${RANG_REF}e élève le plus actif de la classe.` : ""} Les réglages sont gardés sur cet appareil, pour cette classe.
        ${N.estim ? "Avant le 3 novembre 2026, le site ne gardait que le total des XP et du temps : leur part dans le niveau est estimée d'après les meilleurs résultats de l'élève (étoiles, QCM, défi) et le temps par chapitre restant ; depuis, ils sont comptés exactement." : "XP et temps par chapitre ne sont comptés que depuis la mise à jour du 3 novembre 2026."}${N.niv ? "" : " Le niveau de cette classe est inconnu : aucun chapitre n'est compté."}${infos.avecListe ? " Les élèves jamais connectés sont en grisé." : ""}</p>
      <div class="freq-tuiles">${st ? tuile(virgule(st.moy, 1), "moyenne de la classe") + tuile(virgule(st.med), "note médiane") + tuile(`${virgule(st.min)} à ${virgule(st.max)}`, "note la plus basse et la plus haute") : ""}${infos.avecListe ? tuile(infos.jamais, `jamais connecté${infos.jamais > 1 ? "s" : ""}`) : ""}</div>
      <p class="btns-prof"><button class="btn" type="button" id="n-excel">Télécharger en Excel</button>${groupesProf().length > 1 ? ` <button class="btn-sec" type="button" id="n-excel-tout">Excel de toutes mes classes</button>` : ""}</p>
      ${tableauSuivi(cols, N.lignes, "suivi-note")}</section>`;
    const garder = (modif) => { garderNotation(N.g, Object.assign({}, r, modif)); afficherSuivi(); };
    const nombre = (id, cle) => { const el = document.getElementById(id); if (el) el.addEventListener("change", () => garder({ [cle]: el.value === "" ? "" : +el.value })); };
    nombre("n-poids", "poids"); nombre("n-refxp", "refXp"); nombre("n-reft", "refT");
    const autos = document.getElementById("n-autos");
    if (autos) autos.addEventListener("change", () => garder({ autos: autos.checked }));
    const estim = document.getElementById("n-estim");
    estim.addEventListener("change", () => garder({ estim: estim.checked }));
    const au = document.getElementById("s-au");
    au.addEventListener("change", () => { suiviChoix.au = au.value; afficherSuivi(); });
    document.getElementById("n-excel").addEventListener("click", (ev) => exporterNotation([N.g], ev.currentTarget));
    const tout = document.getElementById("n-excel-tout");
    if (tout) tout.addEventListener("click", (ev) => exporterNotation(groupesProf(), ev.currentTarget));
  }
  // Fichier Excel : une feuille par classe (réglages, élèves, note en formule, statistiques)
  async function exporterNotation(groupes, bouton) {
    const texte = bouton.textContent;
    bouton.disabled = true; bouton.textContent = "Préparation…";
    try {
      await chargerScript("assets/xlsx.js");
      const auj = jourISO(new Date()), fr = (j) => j.split("-").reverse().join("/");
      const feuilles = groupes.map((g) => {
        const N = notationGroupe(g);
        const L = N.lignes.slice().sort((a, b) => `${a.x.nom || ""} ${a.x.prenom || ""}`.localeCompare(`${b.x.nom || ""} ${b.x.prenom || ""}`, "fr"));
        const d0 = 10, d1 = d0 + Math.max(L.length, 1) - 1; // lignes des élèves (numéros Excel)
        const lignes = [
          [{ v: `Notation · classe ${g}${N.niv ? ` (${N.niv.nom})` : ""}`, s: 1 }],
          [`Période : ${N.du ? "du " + fr(N.du) : "depuis le début du comptage"} au ${fr(N.au || auj)}`],
          [`Chapitres comptés : ${N.niv ? N.niv.nom : "niveau inconnu"}${N.avecAutos && N.r.autos ? " et Automatismes" : ""} (${N.ids.size} chapitres)`],
          [N.estim ? "Avant le 3 novembre 2026 : XP et temps du niveau estimés (le site ne gardait que les totaux) ; depuis : comptés exactement." : "XP et temps comptés depuis le 3 novembre 2026."],
          [{ v: "Poids des XP", s: 1 }, N.p, "Le poids du temps est 1 moins ce nombre."],
          [{ v: "XP pour 20/20", s: 1 }, N.refXp, N.autoXp ? `Valeur du ${RANG_REF}e élève le plus actif. Tu peux la changer : les notes se recalculent.` : "Valeur choisie sur le site. Tu peux la changer : les notes se recalculent."],
          [{ v: "Minutes pour 20/20", s: 1 }, N.refT, N.autoT ? `Valeur du ${RANG_REF}e élève le plus actif. Tu peux la changer : les notes se recalculent.` : "Valeur choisie sur le site. Tu peux la changer : les notes se recalculent."],
          [],
          ["Nom", "Prénom", "XP du niveau", "Temps du niveau (min)", "Chapitres travaillés", "Note /20", "Déjà connecté"].map((v) => ({ v, s: 2 }))
        ];
        L.forEach((l, i) => {
          const k = d0 + i;
          lignes.push([l.x.nom || "", l.x.prenom || l.x.identifiant || "", l.xp, { v: l.tps, s: 3 }, l.nb,
            { v: l.note, s: 4, f: `ROUND(2*20*($B$5*IF($B$6>0,MIN(1,C${k}/$B$6),0)+(1-$B$5)*IF($B$7>0,MIN(1,D${k}/$B$7),0)),0)/2` }, l.x.jamais ? "non" : "oui"]);
        });
        if (!L.length) lignes.push(["Aucun élève"]);
        const st = (col, val) => { const s = statsNotes(L.map(val)); return s ? [["moy", "AVERAGE"], ["med", "MEDIAN"], ["min", "MIN"], ["max", "MAX"], ["et", "STDEVP"]].map(([c, f]) => ({ v: Math.round(s[c] * 100) / 100, f: `${f}(${col}${d0}:${col}${d1})`, s: 3 })) : []; };
        const sx = st("C", (l) => l.xp), stt = st("D", (l) => l.tps), sn = st("F", (l) => l.note);
        lignes.push([]);
        ["Moyenne", "Médiane", "Minimum", "Maximum", "Écart-type"].forEach((t, i) => lignes.push([{ v: t, s: 1 }, null, sx[i] || null, stt[i] || null, null, sn[i] || null]));
        lignes.push([{ v: "Jamais connectés", s: 1 }, null, null, null, null, null, { v: L.filter((l) => l.x.jamais).length, f: `COUNTIF(G${d0}:G${d1},"non")` }]);
        return { nom: g, largeurs: [22, 18, 13, 21, 19, 10, 14], lignes };
      });
      const blob = window.PM_XLSX(feuilles), a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `notation-${groupes.length === 1 ? groupes[0].replace(/[^A-Za-z0-9-]+/g, "-") : "classes"}-${auj}.xlsx`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 60e3);
    } catch (e) {
      alert("Le fichier Excel n'a pas pu être préparé. Vérifie la connexion internet puis réessaie.");
    } finally { bouton.disabled = false; bouton.textContent = texte; }
  }

  // Tri (un titre de colonne ; même colonne = sens inverse) et filtres (la ligne sous les titres) d'un tableauSuivi ;
  // choix = { tri, filtres } modifié sur place, redessiner() réaffiche la page
  function brancherTableau(choix, redessiner) {
    $app.querySelectorAll("[data-tri]").forEach((b) => b.addEventListener("click", () => {
      const id = b.dataset.tri, t = choix.tri, c = suiviCols.find((x) => x.id === id) || {};
      if (t.col === id) t.sens = -t.sens; else { t.col = id; t.sens = c.desc ? -1 : 1; }
      redessiner();
    }));
    // Le champ texte garde le curseur après le réaffichage
    $app.querySelectorAll("[data-filtre]").forEach((el) => el.addEventListener(el.tagName === "SELECT" ? "change" : "input", () => {
      const id = el.dataset.filtre, pos = el.selectionStart;
      choix.filtres[id] = el.value;
      redessiner();
      const n = $app.querySelector(`[data-filtre="${id}"]`);
      if (n && n.tagName === "INPUT") { n.focus(); try { n.setSelectionRange(pos, pos); } catch (x) { /* rien */ } }
    }));
    const eff = document.getElementById("s-effacer");
    if (eff) eff.addEventListener("click", () => { choix.filtres = {}; redessiner(); });
    // Colonnes affichées : une colonne masquée ne filtre plus
    $app.querySelectorAll("[data-colonne]").forEach((el) => el.addEventListener("change", () => {
      const cle = el.dataset.cle, id = el.dataset.colonne, cachees = colonnesCachees(cle).filter((x) => x !== id);
      if (!el.checked) { cachees.push(id); delete choix.filtres[id]; }
      try { localStorage.setItem(CLE_COLONNES + cle, JSON.stringify(cachees)); } catch (e) { /* rien */ }
      colonnesOuvert = true;
      redessiner();
    }));
  }
  // Durée en secondes -> « 8 min », « 1 h 05 »
  function duree(s) {
    const m = Math.round((+s || 0) / 60);
    if (m < 1) return "< 1 min";
    return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")}`;
  }
  // Vue « Tout le site » : pour chaque élève de la classe, dernière activité, temps passé et chapitres travaillés
  function suiviSite(liste, choix, infos) {
    const auj = jourISO(new Date());
    // Période : depuis la date choisie, sinon les 7 derniers jours
    const d7 = new Date(); d7.setDate(d7.getDate() - 6);
    const debutJ = suiviChoix.depuis || jourISO(d7), debut = new Date(debutJ + "T00:00").getTime();
    const periode = suiviChoix.depuis ? `depuis le ${new Date(debut).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}` : "ces 7 derniers jours";
    const titres = { jeu: "Jeu Les Salles" };
    CATALOGUE.niveaux.forEach((n) => n.chapitres.forEach((ch) => { titres[ch.id] = `${n.nom} · ${ch.titre}`; }));
    const ms = (t) => (t && typeof t.toMillis === "function" ? t.toMillis() : +t || 0);
    const quand = (t) => {
      const j = jourISO(new Date(t)), hier = new Date(); hier.setDate(hier.getDate() - 1);
      return j === auj ? "aujourd'hui" : j === jourISO(hier) ? "hier" : new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
    };
    const lignes = liste.map((x) => {
      const q = x.quand || {}, tj = (x.temps || {}).j || {}, tch = (x.temps || {}).ch || {}, tder = (x.temps || {}).der || {};
      const tPeriode = Object.keys(tj).filter((j) => j >= debutJ).reduce((s, j) => s + (+tj[j] || 0), 0);
      const tTotal = Object.values(tj).reduce((s, v) => s + (+v || 0), 0);
      // Chapitres : date du dernier essai (série ou QCM), et ceux où l'élève a seulement passé du temps
      const ch = {};
      for (const k in q) { const id = k.replace(/^qcm:/, "").split(":")[0]; ch[id] = Math.max(ch[id] || 0, +q[k] || 0); }
      // Dernière fois dans chaque chapitre : essai, ou jour où l'élève y a passé du temps
      const der = (id) => Math.max(ch[id] || 0, tder[id] ? new Date(tder[id] + "T12:00").getTime() : 0);
      for (const id in tch) if (!(id in ch)) ch[id] = 0;
      const vus = Object.keys(ch).filter((id) => ch[id] >= debut || (tder[id] || "") >= debutJ);
      const dernier = x.jamais ? 0 : Math.max(ms(x.vuLe), ms(x.majLe), ...Object.values(q).map((t) => +t || 0));
      const detail = Object.keys(ch).sort((a, b) => der(b) - der(a) || (tch[b] || 0) - (tch[a] || 0)).map((id) => `<li><span>${esc(titres[id] || id)}</span><span>${tch[id] ? duree(tch[id]) : "–"}${der(id) ? ` · ${ch[id] ? "dernier essai" : "vu"} ${quand(ch[id] || der(id))}` : ""}</span></li>`).join("");
      const actif = tPeriode > 0 || vus.length > 0 || dernier >= debut;
      return { x, tPeriode, tTotal, dernier, nb: vus.filter((id) => id !== "jeu").length, xp: +x.xp || 0, actif, detail, cls: x.jamais ? "jamais" : actif ? "" : "inactif" };
    });
    // XP et temps dans les chapitres du niveau de la classe, et note (même calcul que la vue « Notation », même période)
    const N = notationGroupe(suiviChoix.groupe), parUidNote = new Map(N.lignes.map((l) => [l.x.uid, l]));
    lignes.forEach((l) => { const n = parUidNote.get(l.x.uid) || { xp: 0, tps: 0, note: 0 }; l.nxp = n.xp; l.ntps = n.tps; l.note = n.note; });
    const actifs = lignes.filter((l) => l.actif).length, tempsClasse = lignes.reduce((s, l) => s + l.tPeriode, 0);
    const nom = (x) => `${esc(x.nom || "")} ${esc(x.prenom || x.identifiant || "")}`;
    const court = suiviChoix.depuis ? "période" : "7 j";
    const cols = [
      { id: "nom", titre: "Élève", aide: "Nom de l'élève", val: (l) => `${l.x.nom || ""} ${l.x.prenom || l.x.identifiant || ""}`.toLowerCase(), choix: "texte",
        html: (l, i) => (l.detail ? `<button type="button" class="lien-eleve" aria-expanded="false" data-detail="${i}">${nom(l.x)}</button>` : nom(l.x)) },
      { id: "dernier", titre: "Dernière activité", aide: "Dernière fois que l'élève est venu connecté", desc: true, val: (l) => l.dernier,
        html: (l) => (l.x.jamais ? `<span class="jamais-co">jamais connecté</span>` : l.dernier ? quand(l.dernier) : "–"), choix: choixDate((l) => l.dernier, "Jamais connecté") },
      { id: "tper", titre: `Temps ${court}`, aide: `Temps actif ${periode}`, desc: true, val: (l) => l.tPeriode, html: (l) => (l.tPeriode ? duree(l.tPeriode) : "–"), choix: choixDuree((l) => l.tPeriode) },
      { id: "ttot", titre: "Temps total", aide: "Temps actif depuis le début", desc: true, val: (l) => l.tTotal, html: (l) => (l.tTotal ? duree(l.tTotal) : "–"), choix: choixDuree((l) => l.tTotal) },
      { id: "nb", titre: "Chapitres", aide: `Chapitres ouverts ou travaillés ${periode}`, desc: true, val: (l) => l.nb, html: (l) => l.nb || "–", choix: choixNombre((l) => l.nb, [1, 2, 3, 5]) },
      { id: "xp", titre: "XP", aide: "Points d'expérience", desc: true, val: (l) => l.xp, html: (l) => l.xp, choix: choixNombre((l) => l.xp, [50, 100, 200, 500]) },
      { id: "nxp", titre: "XP niveau", aide: `XP gagnés dans les chapitres de ${N.niv ? N.niv.nom : "son niveau"}`, desc: true, val: (l) => l.nxp, html: (l) => l.nxp || "–", choix: choixNombre((l) => l.nxp, [50, 100, 200, 500]) },
      { id: "ntps", titre: "Temps niveau", aide: `Temps actif dans les chapitres de ${N.niv ? N.niv.nom : "son niveau"}`, desc: true, val: (l) => l.ntps, html: (l) => (l.ntps ? duree(l.ntps * 60) : "–"), choix: choixDuree((l) => l.ntps * 60) },
      { id: "nnote", titre: "Note /20", aide: "Note au prorata des XP et du temps du niveau (réglages dans la vue Notation)", desc: true, val: (l) => l.note, html: (l) => virgule(l.note),
        choix: [["<8", "Moins de 8", (l) => l.note < 8], ["8-12", "De 8 à moins de 12", (l) => l.note >= 8 && l.note < 12], ["12-16", "De 12 à moins de 16", (l) => l.note >= 12 && l.note < 16], ["16+", "16 ou plus", (l) => l.note >= 16]] }
    ];
    const detail = (l, i) => (l.detail ? `<tr class="suivi-detail" id="sd-${i}" hidden><td colspan="${cols.length}"><ul>${l.detail}</ul></td></tr>` : "");
    $app.innerHTML = `<section class="page-suivi"><p class="eyebrow">Compte professeur · <a href="#frequentation">Fréquentation du site</a></p><h1>Suivi des élèves</h1>
      ${choix()}
      <div class="freq-tuiles"><div class="freq-tuile"><b>${actifs}/${liste.length}</b><span>élèves actifs ${periode}</span></div>${infos.avecListe ? `<div class="freq-tuile"><b>${infos.jamais}</b><span>jamais connecté${infos.jamais > 1 ? "s" : ""} au site</span></div>` : ""}<div class="freq-tuile"><b>${tempsClasse ? duree(tempsClasse) : "0 min"}</b><span>temps passé par la classe</span></div><div class="freq-tuile"><b>${actifs && tempsClasse ? duree(tempsClasse / actifs) : "–"}</b><span>par élève actif</span></div></div>
      <p class="btns-prof"><button class="btn" type="button" id="n-excel">Télécharger en Excel</button>${groupesProf().length > 1 ? ` <button class="btn-sec" type="button" id="n-excel-tout">Excel de toutes mes classes</button>` : ""} <button class="btn-sec" type="button" id="n-reglages">Réglages de la note</button></p>
      <p class="muted">Actif = venu sur le site connecté, ou a fait une série ou un QCM, ${periode}. Temps = temps actif sur le site (page ouverte et utilisée, vidéos comprises). Chapitres = chapitres ouverts ou travaillés (série, QCM) sur la période. Touche un nom pour voir le détail par chapitre. XP niveau, Temps niveau et Note ne comptent que les chapitres de ${esc(N.niv ? N.niv.nom : "niveau de la classe")}${N.avecAutos && N.r.autos ? " et les Automatismes" : ""} (formule et réglages dans « Notation » de la liste des chapitres, Excel aussi).${infos.avecListe ? " Les élèves jamais connectés sont en grisé." : " Un élève n'apparaît qu'après sa première connexion (lance « creer-comptes.js --classes » pour voir aussi les autres)."}</p>
      ${notationVide(N) ? `<p class="alerte-notation">${SANS_DONNEES}</p>` : ""}
      ${tableauSuivi(cols, lignes, "suivi-site", detail)}
      <p class="muted">Le temps passé n'est mesuré que pour un élève connecté à son compte, depuis la mise à jour du site d'octobre 2026. Les élèves ne voient pas ces durées.</p></section>`;
    // Export Excel et réglages de la note (vue « Notation ») aussi depuis cette page
    document.getElementById("n-excel").addEventListener("click", (ev) => exporterNotation([suiviChoix.groupe], ev.currentTarget));
    const tout = document.getElementById("n-excel-tout");
    if (tout) tout.addEventListener("click", (ev) => exporterNotation(groupesProf(), ev.currentTarget));
    document.getElementById("n-reglages").addEventListener("click", () => { suiviChoix.chap = "note"; afficherSuivi(); });
    $app.querySelector(".suivi-site tbody").addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-detail]");
      if (!b) return;
      const tr = document.getElementById("sd-" + b.dataset.detail), ouvrir = tr.hidden;
      tr.hidden = !ouvrir; b.setAttribute("aria-expanded", ouvrir);
    });
  }

  /* ---------- Page prof.maths : tous les comptes du site et leur temps actif ---------- */
  let comptesCache = null; // { eleves, classes, inscrits, demandes, profs } (voir Compte.tous)
  const comptesChoix = { tri: { col: "ttot", sens: -1 }, filtres: {} };
  async function pageComptes() {
    document.title = "Tous les comptes · ProfMaths";
    if (!Compte.chef()) {
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Tous les comptes</p><h1>Page réservée au compte prof.maths</h1><p><a class="btn" href="#compte">Mon compte</a></p></section>`;
      return;
    }
    $app.innerHTML = `<section class="page-suivi"><p class="eyebrow">Compte professeur</p><h1>Tous les comptes</h1><p class="muted" id="comptes-etat">Chargement…</p></section>`;
    try { comptesCache = await Compte.tous(); }
    catch (x) { document.getElementById("comptes-etat").textContent = "Lecture impossible. Vérifie la connexion internet puis recharge la page."; return; }
    if (location.hash !== "#comptes") return;
    afficherComptes();
  }
  function afficherComptes() {
    const d = comptesCache || {}, auj = jourISO(new Date());
    const d7 = new Date(); d7.setDate(d7.getDate() - 6);
    const debutJ = jourISO(d7), debut = new Date(debutJ + "T00:00").getTime();
    const ms = (t) => (t && typeof t.toMillis === "function" ? t.toMillis() : +t || 0);
    const dateCourte = (t) => new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "2-digit" });
    const quand = (t) => {
      const j = jourISO(new Date(t)), hier = new Date(); hier.setDate(hier.getDate() - 1);
      return j === auj ? "aujourd'hui" : j === jourISO(hier) ? "hier" : dateCourte(t);
    };
    const TYPES = { eleve: "Élève", autre: "Autre élève", prof: "Professeur", demande: "Demande prof" }, PLURIELS = { eleve: "Élèves des classes", autre: "Autres élèves", prof: "Professeurs", demande: "Demandes prof" };
    const ETAT = { attente: "en attente", refuse: "refusée", approuve: "approuvée" };
    // Une ligne par compte : type, classe, niveau, dernière activité, temps (7 jours et total), XP, date de création
    const ligne = (x, type, extra) => {
      const q = x.quand || {}, tj = (x.temps || {}).j || {};
      const tPeriode = Object.keys(tj).filter((j) => j >= debutJ).reduce((s, j) => s + (+tj[j] || 0), 0);
      const tTotal = Object.values(tj).reduce((s, v) => s + (+v || 0), 0);
      const dernier = x.jamais ? 0 : Math.max(ms(x.vuLe), ms(x.majLe), ms(x.decideLe), ms(x.creeLe), ...Object.values(q).map((t) => +t || 0));
      return Object.assign({ x, type, classe: "", niveau: "", etat: "", tPeriode, tTotal, dernier, xp: +x.xp || 0, cree: ms(x.creeLe), cls: x.jamais ? "jamais" : "" }, extra);
    };
    const lignes = [];
    // Élèves des classes : fiches des élèves déjà connectés, complétées par les listes de classes (jamais connectés)
    const vus = new Set();
    (d.eleves || []).forEach((x) => { vus.add(x.uid); lignes.push(ligne(x, "eleve", { classe: x.groupe || x.classe || "?", niveau: x.classe || "" })); });
    Object.entries(d.classes || {}).forEach(([groupe, c]) => Object.entries(c.eleves || {}).forEach(([uid, e]) => {
      if (!vus.has(uid)) lignes.push(ligne(Object.assign({ uid, jamais: true }, e), "eleve", { classe: groupe, niveau: c.classe || "" }));
    }));
    (d.inscrits || []).forEach((x) => lignes.push(ligne(x, "autre", { classe: "Autres élèves", niveau: x.niveau || "" })));
    // Professeurs : fiche « profs » (progression, temps) complétée par la demande de compte (professeur extérieur approuvé)
    const demandes = new Map((d.demandes || []).map((x) => [x.uid, x]));
    (d.profs || []).forEach((p) => {
      const dem = demandes.get(p.uid);
      if (dem) demandes.delete(p.uid);
      const x = Object.assign({}, dem || {}, p, { creeLe: p.creeLe || (dem && dem.creeLe) });
      if (!x.identifiant && !x.prenom) x.prenom = "Professeur (avant la mise à jour)";
      lignes.push(ligne(x, "prof", { classe: dem ? dem.etablissement || "Extérieur" : "", niveau: dem ? (dem.niveaux || []).join(", ") : "", etat: dem ? ETAT[dem.statut] || dem.statut : "" }));
    });
    // Demandes sans fiche « profs » : en attente, refusées, ou approuvées mais jamais reconnectées
    demandes.forEach((dem) => lignes.push(ligne(dem, "demande", { classe: dem.etablissement || "Extérieur", niveau: (dem.niveaux || []).join(", "), etat: ETAT[dem.statut] || dem.statut, cls: dem.statut === "refuse" ? "inactif" : "" })));
    const nom = (x) => `${esc(x.nom || "")} ${esc(x.prenom || x.identifiant || "")}`.trim() || "?";
    const cols = [
      { id: "nom", titre: "Compte", aide: "Nom, prénom et identifiant", val: (l) => `${l.x.nom || ""} ${l.x.prenom || l.x.identifiant || ""} ${l.x.identifiant || ""}`.toLowerCase(), choix: "texte",
        html: (l) => `${nom(l.x)}${l.x.identifiant ? ` <span class="ident">${esc(l.x.identifiant)}</span>` : ""}` },
      { id: "type", titre: "Type", aide: "Élève d'une classe, élève inscrit sur le site, professeur ou demande de compte professeur", val: (l) => TYPES[l.type] + (l.etat ? " " + l.etat : ""),
        html: (l) => `${TYPES[l.type]}${l.etat ? ` <span class="muted">(${esc(l.etat)})</span>` : ""}`,
        choix: Object.keys(TYPES).map((t) => [t, PLURIELS[t], (l) => l.type === t]).concat([["attente", "Demandes en attente", (l) => l.etat === "en attente"]]) },
      { id: "classe", titre: "Classe", aide: "Classe de l'élève, « Autres élèves » pour un compte créé sur le site, établissement d'un professeur extérieur", val: (l) => l.classe.toLowerCase(), html: (l) => esc(l.classe) || "–", choix: "texte" },
      { id: "niveau", titre: "Niveau", aide: "Niveau indiqué dans le compte", val: (l) => l.niveau.toLowerCase(), html: (l) => esc(l.niveau) || "–", choix: "texte" },
      { id: "dernier", titre: "Dernière activité", aide: "Dernière fois que le compte est venu connecté", desc: true, val: (l) => l.dernier,
        html: (l) => (l.x.jamais ? `<span class="jamais-co">jamais connecté</span>` : l.dernier ? quand(l.dernier) : "–"), choix: choixDate((l) => l.dernier, "Jamais connecté") },
      { id: "tper", titre: "Temps 7 j", aide: "Temps actif ces 7 derniers jours", desc: true, val: (l) => l.tPeriode, html: (l) => (l.tPeriode ? duree(l.tPeriode) : "–"), choix: choixDuree((l) => l.tPeriode) },
      { id: "ttot", titre: "Temps total", aide: "Temps actif depuis le début", desc: true, val: (l) => l.tTotal, html: (l) => (l.tTotal ? duree(l.tTotal) : "–"), choix: choixDuree((l) => l.tTotal) },
      { id: "xp", titre: "XP", aide: "Points d'expérience", desc: true, val: (l) => l.xp, html: (l) => l.xp || "–", choix: choixNombre((l) => l.xp, [50, 100, 200, 500]) },
      { id: "cree", titre: "Créé le", aide: "Date de création de la fiche (première connexion)", desc: true, val: (l) => l.cree, html: (l) => (l.cree ? dateCourte(l.cree) : "–"), choix: choixDate((l) => l.cree, "Inconnue") }
    ];
    const nb = (t) => lignes.filter((l) => l.type === t).length, attente = lignes.filter((l) => l.etat === "en attente").length;
    const tempsTotal = lignes.reduce((s, l) => s + l.tTotal, 0), temps7 = lignes.reduce((s, l) => s + l.tPeriode, 0);
    const actifs7 = lignes.filter((l) => l.tPeriode > 0 || l.dernier >= debut).length;
    $app.innerHTML = `<section class="page-suivi page-comptes"><p class="eyebrow">Compte professeur · <a href="#suivi">Suivi des élèves</a> · <a href="#demandes">Demandes de comptes</a></p><h1>Tous les comptes</h1>
      <div class="freq-tuiles"><div class="freq-tuile"><b>${lignes.length}</b><span>comptes au total</span></div><div class="freq-tuile"><b>${nb("eleve")}</b><span>élèves de tes classes</span></div><div class="freq-tuile"><b>${nb("autre")}</b><span>autres élèves</span></div><div class="freq-tuile"><b>${nb("prof")}${attente ? ` <small>+${attente}</small>` : ""}</b><span>professeurs${attente ? ` (${attente} demande${attente > 1 ? "s" : ""} en attente)` : ""}</span></div><div class="freq-tuile"><b>${actifs7}</b><span>actifs ces 7 jours</span></div><div class="freq-tuile"><b>${tempsTotal ? duree(tempsTotal) : "0 min"}</b><span>temps passé au total${temps7 ? `, dont ${duree(temps7)} ces 7 jours` : ""}</span></div></div>
      ${(d.manquants || []).length ? `<p class="alerte">Certaines listes n'ont pas pu être lues (${d.manquants.map((c) => ({ eleves: "élèves des classes", classes: "listes de classes", inscrits: "autres élèves", demandesProf: "demandes de comptes professeurs", profs: "professeurs" }[c] || c)).join(", ")}) : les règles Firebase du site ne sont sans doute pas à jour (voir LISEZMOI, firebase deploy --only firestore:rules). Le reste du tableau est affiché.</p>` : ""}
      <p class="muted">Tous les comptes connus du site : les élèves de tes classes (y compris jamais connectés, en grisé), les élèves inscrits eux-mêmes, les professeurs et les demandes de compte professeur. Temps = temps actif sur le site connecté (page ouverte et utilisée, vidéos comprises).</p>
      ${tableauSuivi(cols, lignes, "suivi-site", null, { cle: "comptes", choix: comptesChoix, mots: { pl: "comptes", vide: "Aucun compte pour l'instant.", filtre: "Aucun compte ne correspond aux filtres." } })}
      <p class="btns-prof"><button class="btn-sec" id="c-maj" type="button">Actualiser</button></p>
      <p class="muted">Le temps est mesuré depuis la mise à jour du site d'octobre 2026 pour les élèves des classes, et depuis celle de fin octobre 2026 pour les autres élèves et les professeurs. Un professeur créé avec outils/comptes n'apparaît qu'après sa première connexion suivant cette mise à jour. Les élèves ne voient pas ces durées.</p></section>`;
    document.getElementById("c-maj").addEventListener("click", pageComptes);
    brancherTableau(comptesChoix, afficherComptes);
  }

  /* ---------- Page professeur : fréquentation du site (compteurs anonymes, voir compte.js) ---------- */
  const freqChoix = { jours: 30, niveau: "" };
  let freqCache = null; // { depuis, data } : les données déjà lues servent aussi pour une période plus courte
  const jourISO = (d) => d.toLocaleDateString("fr-CA");
  async function pageFrequentation(recharger) {
    document.title = "Fréquentation · ProfMaths";
    const e = Compte.eleve();
    if (!e || !e.prof || e.externe) {
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Fréquentation du site</p><h1>Page réservée au professeur</h1><p><a class="btn" href="#compte">Se connecter</a></p></section>`;
      return;
    }
    const debut = new Date(); debut.setDate(debut.getDate() - freqChoix.jours + 1);
    const depuis = jourISO(debut);
    if (recharger === true || !freqCache || freqCache.depuis > depuis) {
      $app.innerHTML = `<section class="page-suivi"><p class="eyebrow">Compte professeur</p><h1>Fréquentation du site</h1><p class="muted" id="freq-etat">Chargement…</p></section>`;
      try { freqCache = { depuis, data: await Compte.frequentation(depuis) }; }
      catch (x) { document.getElementById("freq-etat").textContent = "Lecture impossible. Vérifie la connexion internet puis recharge la page."; return; }
      if (location.hash !== "#frequentation") return;
    }
    afficherFrequentation(depuis);
  }
  function afficherFrequentation(depuis) {
    const d = (freqCache && freqCache.data) || { jours: [], chapitres: [] };
    const jours = d.jours.filter((x) => x.j >= depuis), lus = d.chapitres.filter((x) => x.j >= depuis);
    const somme = (l, f) => l.reduce((s, x) => s + (+x[f] || 0), 0);
    const nb = (n) => n.toLocaleString("fr-FR");
    const dateCourte = (j) => new Date(j + "T12:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
    const dateLongue = (j) => new Date(j + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    // Visites jour par jour (un jour sans visite compte 0)
    const parJour = {};
    jours.forEach((x) => { parJour[x.j] = x; });
    const serie = [], auj = jourISO(new Date());
    for (const t = new Date(depuis + "T12:00"); jourISO(t) <= auj; t.setDate(t.getDate() + 1)) serie.push({ j: jourISO(t), n: +(parJour[jourISO(t)] || {}).visites || 0 });
    const total = somme(jours, "visites"), tel = somme(jours, "tel"), pc = somme(jours, "pc"), jeu = somme(jours, "jeu");
    const max = Math.max(1, ...serie.map((s) => s.n)), record = serie.reduce((a, b) => (b.n > a.n ? b : a), serie[0]);
    const classes = {};
    jours.forEach((x) => Object.entries(x.classes || {}).forEach(([g, n]) => { classes[g] = (classes[g] || 0) + (+n || 0); }));
    const eleves = Object.values(classes).reduce((s, n) => s + n, 0);
    // Onglets ouverts, par chapitre puis par niveau
    const OC = ["cours", "exercices", "qcm", "defi", "revisions", "evaluation", "methode"];
    const parChap = {};
    lus.forEach((x) => { const c = parChap[x.ch] || (parChap[x.ch] = { total: 0 }); OC.forEach((o) => { c[o] = (c[o] || 0) + (+x[o] || 0); c.total += +x[o] || 0; }); });
    const niveaux = CATALOGUE.niveaux.map((n) => ({ id: n.id, nom: n.nom, chaps: n.chapitres.filter((ch) => parChap[ch.id]).map((ch) => Object.assign({ id: ch.id, titre: ch.titre }, parChap[ch.id])) }))
      .map((n) => Object.assign(n, { total: n.chaps.reduce((s, c) => s + c.total, 0) }));
    const maxNiv = Math.max(1, ...niveaux.map((n) => n.total));
    if (!niveaux.some((n) => n.id === freqChoix.niveau)) freqChoix.niveau = "";
    const chapsVus = niveaux.filter((n) => !freqChoix.niveau || n.id === freqChoix.niveau).flatMap((n) => n.chaps).sort((a, b) => b.total - a.total);
    const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
    const tuile = (v, t) => `<div class="freq-tuile"><b>${v}</b><span>${t}</span></div>`;
    const vide = `<p class="muted">Aucune visite enregistrée sur cette période.</p>`;
    $app.innerHTML = `<section class="page-suivi page-freq"><p class="eyebrow">Compte professeur · <a href="#suivi">Suivi des élèves</a></p><h1>Fréquentation du site</h1>
      <div class="suivi-choix">
        <label>Période <select id="f-jours">${[[7, "7 derniers jours"], [30, "30 derniers jours"], [90, "90 derniers jours"], [365, "12 derniers mois"]].map(([v, t]) => `<option value="${v}"${v === freqChoix.jours ? " selected" : ""}>${t}</option>`).join("")}</select></label>
        <button class="btn-sec" id="f-maj" type="button">Actualiser</button>
      </div>
      <div class="freq-tuiles">${tuile(nb(total), "visites")}${tuile(nb(Math.round((total / serie.length) * 10) / 10), "par jour en moyenne")}${tuile(pct(tel, tel + pc) + " %", "sur téléphone ou tablette")}${tuile(nb(eleves), "connexions d'élèves")}</div>
      <h2>Visites par jour</h2>
      ${total ? `<div class="freq-barres" id="freq-barres" role="img" aria-label="Visites par jour : record ${record.n} le ${dateLongue(record.j)}">${serie.map((s) => `<span data-j="${s.j}" data-n="${s.n}" title="${dateCourte(s.j)} : ${s.n}"><i style="height:${(s.n / max) * 100}%"></i></span>`).join("")}</div>
      <div class="freq-axe"><span>${dateCourte(serie[0].j)}</span><span>${dateCourte(auj)}</span></div>
      <p class="muted" id="freq-info" aria-live="polite">Record : <strong>${record.n}</strong> visite${record.n > 1 ? "s" : ""} le ${dateLongue(record.j)}. Touche une barre pour voir son jour.</p>` : vide}
      <h2>Par niveau</h2>
      <p class="muted">Onglets de chapitre ouverts (cours, exercices, QCM, défi, révisions express, entraînement évaluation, méthode).${jeu ? ` Jeu Les Salles : ${nb(jeu)} visite${jeu > 1 ? "s" : ""}.` : ""}</p>
      ${niveaux.some((n) => n.total) ? `<ul class="freq-niv">${niveaux.map((n) => `<li data-niv="${esc(n.id)}"><span>${esc(n.nom)}</span><span class="piste"><i style="width:${(n.total / maxNiv) * 100}%"></i></span><b>${nb(n.total)}</b></li>`).join("")}</ul>` : vide}
      <h2>Par chapitre</h2>
      <div class="suivi-choix"><label>Niveau <select id="f-niv"><option value="">Tous les niveaux</option>${niveaux.map((n) => `<option value="${esc(n.id)}"${n.id === freqChoix.niveau ? " selected" : ""}>${esc(n.nom)}</option>`).join("")}</select></label></div>
      ${chapsVus.length ? `<div class="scroll-x"><table class="suivi freq-chap"><thead><tr><th>Chapitre</th><th>Cours</th><th>Exos</th><th>QCM</th><th>Défi</th><th>Révisions</th><th>Éval.</th><th>Méthode</th><th>Total</th></tr></thead><tbody>${chapsVus.map((c) => `<tr><th scope="row"><a href="#${esc(c.id)}">${esc(c.titre)}</a></th>${OC.map((o) => `<td>${c[o] ? nb(c[o]) : "·"}</td>`).join("")}<td><strong>${nb(c.total)}</strong></td></tr>`).join("")}</tbody></table></div>` : vide}
      <h2>Élèves connectés, par classe</h2>
      ${eleves ? `<ul class="freq-classes">${Object.entries(classes).sort((a, b) => b[1] - a[1]).map(([g, n]) => `<li><span>${esc(g)}</span><b>${nb(n)}</b></li>`).join("")}</ul>` : `<p class="muted">Aucun élève connecté sur cette période.</p>`}
      <p class="muted">Ces chiffres sont anonymes : aucun nom n'est enregistré, seulement des compteurs. Un appareil compte une fois par jour pour le site et une fois par jour pour chaque onglet de chapitre ; un élève connecté compte une fois par jour pour sa classe. Ordinateurs : ${nb(pc)} · téléphones et tablettes : ${nb(tel)}. Tes propres visites (compte professeur) ne sont pas comptées.</p></section>`;
    document.getElementById("f-jours").addEventListener("change", (ev) => { freqChoix.jours = +ev.target.value; pageFrequentation(); });
    document.getElementById("f-niv").addEventListener("change", (ev) => { freqChoix.niveau = ev.target.value; afficherFrequentation(depuis); });
    document.getElementById("f-maj").addEventListener("click", () => pageFrequentation(true));
    const barres = document.getElementById("freq-barres"), info = document.getElementById("freq-info");
    if (barres) ["click", "pointerover"].forEach((t) => barres.addEventListener(t, (ev) => {
      const b = ev.target.closest("[data-j]");
      if (!b) return;
      barres.querySelectorAll(".on").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      info.innerHTML = `${dateLongue(b.dataset.j).replace(/^./, (c) => c.toUpperCase())} : <strong>${b.dataset.n}</strong> visite${b.dataset.n > 1 ? "s" : ""}.`;
    }));
  }

  /* ---------- Page chapitre ---------- */
  function pageChapitre(id, onglet) {
    const c = CHAPITRES[id];
    document.title = `${c.titre} · ProfMaths`;
    const ongl = ongletsDe(id);
    if (onglet === "defi" && ongl === ONGLETS_EVAL) onglet = "revisions"; // anciens liens vers le Défi d'un chapitre du lycée
    if (!ongl.some((o) => o.id === onglet)) onglet = "cours";
    const b = bilanChapitre(id);
    const nivChap = CATALOGUE.niveaux.find((n) => n.chapitres.some((ch) => ch.id === id));
    let h = `<a class="retour" href="#${nivChap ? "niveau-" + esc(nivChap.id) : ""}">← ${nivChap ? esc(nivChap.nom) : "Accueil"} : tous les chapitres</a>
      <header class="chap-head">${c.numero ? `<span class="chap-filigrane" aria-hidden="true" data-romain="${romain(c.numero)}">${c.numero}</span>` : ""}<p class="eyebrow">${esc(c.niveau)} · ${c.numero ? `Chapitre&nbsp;${c.numero}` : esc(c.periode || "Toute l'année")}</p><h1>${esc(c.titre)}</h1><p class="lead">${inline(c.accroche)}</p>
      <p class="score-chap">${etoiles(Math.round((b.got / b.total) * 5), 5)} <span>${b.got}/${b.total} étoiles d'exercices</span></p></header>
      <nav class="onglets${ongl.length > 5 ? " onglets-6" : ""}" aria-label="Parties du chapitre">${ongl.map((o) => `<a href="#${id}.${o.id}" ${o.id === onglet ? 'aria-current="page"' : ""}>${o.nom}</a>`).join("")}</nav>
      <div class="panneau" id="panneau"></div>` + piedDePage();
    $app.innerHTML = h;
    const p = document.getElementById("panneau");
    const h0 = location.hash;
    if (onglet === "revisions" || onglet === "evaluation") return vueEntrainement(p, c, id, onglet);
    if (onglet === "cours" || onglet === "methode") {
      // Le cours s'affiche sans attendre les générateurs ; une figure qui en a besoin arrive dès qu'ils sont là
      ({ cours: vueCours, methode: vueMethode })[onglet](p, c, id);
      activerFigures(p);
      if (p.querySelector("[data-figure]")) assurerMoteur(id).then(() => { if (memePage(h0)) remplirFigures(p); }).catch(() => {});
      else prechargerMoteur(id);
      return;
    }
    const vue = () => ({ exercices: vueExercices, qcm: vueQCM, defi: vueDefi })[onglet](p, c, id);
    const vueEtFigures = () => { vue(); remplirFigures(p); };
    if (moteurPret(id)) return vueEtFigures();
    p.innerHTML = msgAttente("Chargement des exercices…");
    assurerMoteur(id).then(() => { if (memePage(h0)) vueEtFigures(); })
      .catch(() => { if (memePage(h0)) p.innerHTML = msgReseau("Les exercices n'ont pas pu se charger."); });
  }
  // Figures du cours réservées (data-figure) : dessinées quand les générateurs du niveau sont chargés
  function remplirFigures(p) {
    p.querySelectorAll("[data-figure]").forEach((f) => {
      const d = FIGURES[f.dataset.figure];
      if (d) { f.innerHTML = d(); f.classList.remove("fig-attente"); f.removeAttribute("data-figure"); } else f.remove();
    });
    activerFigures(p);
  }
  // Figures interactives (activités de SNT : graphe à explorer, fil d'actualité…) : leur moteur les branche après l'affichage
  const activerFigures = (p) => { if (window.PM_EXO && typeof window.PM_EXO.activer === "function") window.PM_EXO.activer(p); };

  function vueCours(p, c, id) {
    let h = `<div class="ressources">`;
    c.pdfs.forEach((f) => { h += `<a class="pdf" href="${f.url}" target="_blank" rel="noopener"><span class="pdf-ico" aria-hidden="true">PDF</span><span>${esc(f.titre)}</span></a>`; });
    (c.liens || []).forEach((l) => { h += `<a class="pdf" href="${l.url}" target="_blank" rel="noopener"><span class="pdf-ico lien" aria-hidden="true">${l.type === "video" ? "▶" : "JEU"}</span><span>${esc(l.titre)}</span></a>`; });
    if (c.playlist) h += `<a class="pdf" href="${c.playlist}" target="_blank" rel="noopener"><span class="pdf-ico yt" aria-hidden="true">▶</span><span>Playlist du chapitre sur YouTube</span></a>`;
    h += `</div>`;
    // Déroulé en séances (SNT : séances de 1 h et de 2 h en alternance), replié pour ne pas allonger la page
    if (c.seances && c.seances.length) {
      h += `<section class="seances"><h2>Le chapitre en ${c.seances.length} séances</h2>${c.seancesNote ? `<p class="muted">${inline(c.seancesNote)}</p>` : ""}`;
      c.seances.forEach((se, k) => {
        h += `<details class="seance"><summary><span class="tag">Séance ${k + 1} · ${esc(se.duree)}</span> ${inline(se.titre)}</summary>
          ${se.objectifs ? `<p class="seance-t">Objectifs</p><ul>${se.objectifs.map((o) => `<li>${inline(o)}</li>`).join("")}</ul>` : ""}
          ${se.deroule ? `<p class="seance-t">Déroulé</p><ol>${se.deroule.map((o) => `<li>${inline(o)}</li>`).join("")}</ol>` : ""}
          ${se.maison ? `<p class="seance-t">À la maison</p>${md(se.maison)}` : ""}</details>`;
      });
      h += `</section>`;
    }
    c.cours.forEach((s, i) => {
      h += `<article class="notion"><h2><span class="n">${i + 1}</span><span class="t">${inline(s.titre)}${s.seance ? ` <span class="tag-seance">séance ${s.seance}</span>` : ""}</span></h2><div class="notion-texte">${md(s.texte)}${s.video ? `<div class="video-aide">${video(s.video)}<p class="muted">${esc(s.video.titre)}</p></div>` : ""}</div><aside class="notion-cote">${s.figure ? figure(s.figure) : ""}`;
      if (s.exemple) {
        h += `<div class="exemple"><p class="tag">Exemple</p>${md(s.exemple.enonce)}
          <details><summary>Voir la réponse</summary>${md(s.exemple.solution)}${s.exemple.tableau ? tableau(s.exemple.tableau) : ""}</details></div>`;
      }
      h += `</aside></article>`;
    });
    if (c.videos && c.videos.length) {
      h += `<section class="videos"><h2>Les ${c.videos.length} exercices corrigés en vidéo</h2><p class="muted">${esc(c.videosNote || "Énoncés et corrigés dans les PDF ci-dessus.")}</p><div class="video-grille">`;
      c.videos.forEach((v) => { h += `<div class="video-carte">${video(v)}<p><span class="tag">${esc(v.type)}</span> ${esc(v.titre)}</p></div>`; });
      h += `</div></section>`;
    }
    h += `<a class="suite" href="#${id}.exercices">Je m'entraîne avec les exercices →</a>`;
    p.innerHTML = h;
  }

  /* ---------- Exercices ---------- */
  function vueExercices(p, c, id) {
    let h = `<p class="intro">Chaque série tire de nouveaux nombres à chaque fois. Réponds sans indice pour gagner un maximum de points : <strong>10 points</strong> du premier coup, moins avec des indices.</p><ol class="series">`;
    let etape = "";
    c.exercices.forEach((e, i) => {
      const st = prog.exo[id + ":" + e.type] || 0;
      if (e.etape !== etape) { etape = e.etape; h += `<li class="etape">${inline(etape)}</li>`; }
      h += `<li><button class="serie${st >= 3 ? " serie-faite" : ""}" data-i="${i}"><span class="chap-t"><strong>${inline(e.titre)}</strong><span class="meta">${e.nb} questions</span></span>${etoiles(st, 3)}</button></li>`;
    });
    h += `</ol>`;
    p.innerHTML = h;
    p.querySelectorAll(".serie").forEach((b) => b.addEventListener("click", () => lancerSerie(p, c, id, c.exercices[+b.dataset.i])));
  }

  function normaliser(s) {
    return String(s).trim().toLowerCase().replace(/[−–—]/g, "-").replace(/,/g, ".").replace(/\s+/g, "").replace(/[%€°]$/, "").replace(/^\+/, "").replace(/^[{(\[]|[})\]]$/g, "");
  }
  function lireNombre(s) {
    s = normaliser(s);
    if (/^-?\d+(\.\d+)?$/.test(s)) return parseFloat(s);
    const m = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
    if (m && +m[2] !== 0) return +m[1] / +m[2];
    return NaN;
  }
  function lireEnsemble(s) {
    const n = normaliser(s);
    if (["aucun", "aucune", "rien", "∅", "", "vide"].includes(n)) return n === "" ? null : [];
    const parts = n.split(/;|et/).filter(Boolean).map(lireNombre);
    return parts.some(isNaN) ? null : parts.sort((a, b) => a - b);
  }

  /* Zone de réponse : boutons de choix, ou champ avec touches de symboles */
  function champReponse(q) {
    return q.mode === "choix"
      ? `<div class="choix">${q.choix.map((ch, k) => `<button class="opt" data-k="${k}"><span>${inline(ch)}</span></button>`).join("")}</div>`
      : `<form class="saisie" autocomplete="off"><label for="rep">${etiquette(q.prefixe)}</label><span class="champ"><input id="rep" inputmode="text" enterkeyhint="done" placeholder="${q.mode === "ensemble" ? "ex. −1 ; 3  ou  aucun" : "ta réponse"}">${q.suffixe ? `<span class="suffixe">${inline(q.suffixe)}</span>` : ""}</span>
         <div class="touches" aria-label="Symboles">${["−", ";", "/", ","].map((t) => `<button type="button" class="touche" data-t="${t}">${t}</button>`).join("")}</div>
         <button class="btn" type="submit">Vérifier</button></form>`;
  }
  function brancherTouches(p, inp) {
    p.querySelectorAll(".touche").forEach((t) => t.addEventListener("click", () => {
      const s = inp.selectionStart ?? inp.value.length;
      const ins = t.dataset.t === ";" ? " ; " : t.dataset.t;
      inp.value = inp.value.slice(0, s) + ins + inp.value.slice(inp.selectionEnd ?? s);
      inp.focus(); inp.setSelectionRange(s + ins.length, s + ins.length);
    }));
  }

  /* Pas deux fois la même question dans une série : on retire jusqu'à trouver une question nouvelle.
     On évite aussi, autant que possible, les questions de la série précédente du même type. */
  const RECENTS = {};
  const cleQuestion = (q) => [q.enonce, JSON.stringify(q.tableau || ""), q.figure || "", (q.choix || []).slice().sort().join("¦"), q.mode === "choix" ? q.choix[q.attendu] : JSON.stringify(q.attendu)].join("§");
  function tirerSansDoublon(tirer, vus, recents) {
    let q, k;
    for (let t = 0; t < 60; t++) {
      q = tirer(); k = cleQuestion(q);
      if (!vus.has(k) && (t >= 30 || !recents || !recents.has(k))) break;
    }
    vus.add(k);
    return q;
  }

  function lancerSerie(p, c, id, ex) {
    const gen = GEN[ex.type];
    activiteEnCours = true;
    let i = 0, score = 0;
    const max = ex.nb * 10;
    const vus = new Set(), recents = new Set(RECENTS[ex.type] || []);

    function question() {
      const q = tirerSansDoublon(() => gen(i), vus, recents);
      if (i + 1 === ex.nb) RECENTS[ex.type] = [...vus];
      let aides = 0, erreurs = 0, fini = false;
      const champ = champReponse(q);
      p.innerHTML = `<div class="exo">
        <div class="exo-top"><button class="lien" id="quitter">← Séries</button><span class="progression">Question ${i + 1}/${ex.nb}</span><span class="pts">${score} pts</span></div>
        <div class="pastilles">${Array.from({ length: ex.nb }, (_, k) => `<span class="${k < i ? "ok" : k === i ? "cur" : ""}"></span>`).join("")}</div>
        <h2>${inline(ex.titre)}</h2>
        <div class="enonce">${md(q.enonce)}</div>
        ${q.tableau ? tableau(q.tableau) : ""}
        ${q.figure ? `<figure class="fig" id="fig">${q.figure}</figure>` : ""}
        ${champ}
        <div class="aides" id="aides"></div>
        <div class="retour-rep" id="fb" role="status" aria-live="polite"></div>
        <div class="exo-actions"><button class="btn-sec" id="aide">Un indice (${q.aides.length} dispo)</button><button class="btn-sec" id="voir" hidden>Voir la solution</button><button class="btn" id="suivant" hidden>${i + 1 < ex.nb ? "Question suivante →" : "Voir mon bilan →"}</button></div>
      </div>`;
      const fb = p.querySelector("#fb"), $aides = p.querySelector("#aides");
      const bAide = p.querySelector("#aide"), bVoir = p.querySelector("#voir"), bSuiv = p.querySelector("#suivant");
      p.querySelector("#quitter").addEventListener("click", () => { activiteEnCours = false; vueExercices(p, c, id); });

      function terminer(gagne, montrer) {
        fini = true;
        const pts = gagne ? Math.max(2, 10 - 3 * aides - 2 * erreurs) : 0;
        score += pts;
        p.querySelector(".pts").textContent = `${score} pts`;
        fb.className = "retour-rep " + (gagne ? "bon" : "info");
        fb.innerHTML = gagne
          ? `<strong>Bravo !</strong> +${pts} points.${aides === 0 && erreurs === 0 ? " Du premier coup !" : ""}`
          : `<strong>Voici la solution.</strong> Lis-la bien, la prochaine sera pour toi.`;
        if (montrer || !gagne) {
          fb.innerHTML += `<div class="solution">${md(q.solution)}</div>`;
          // Figure de la solution : à la place de celle de l'énoncé, ou sous la solution quand l'énoncé n'en a pas
          if (q.figureSolution) { const f = p.querySelector("#fig"); if (f) f.innerHTML = q.figureSolution; else fb.insertAdjacentHTML("beforeend", `<figure class="fig">${q.figureSolution}</figure>`); }
        } else {
          fb.innerHTML += `<details><summary>Voir la rédaction</summary><div class="solution">${md(q.solution)}</div></details>`;
        }
        p.querySelectorAll("input, .opt, .touche, .saisie .btn").forEach((el) => (el.disabled = true));
        bAide.hidden = true; bVoir.hidden = true; bSuiv.hidden = false; bSuiv.focus();
      }
      function rate(msg) {
        erreurs++;
        fb.className = "retour-rep faux";
        fb.innerHTML = msg || `<strong>Pas encore.</strong> ${aides < q.aides.length ? "Essaie avec un indice." : "Relis les indices ou regarde la solution."}`;
        if (erreurs >= 2) bVoir.hidden = false;
      }
      function verifier(val) {
        if (fini) return;
        if (q.mode === "choix") {
          if (val === q.attendu) terminer(true);
          else if (q.choix.length === 2) {
            // deux choix (vrai/faux, oui/non) : pas de seconde chance, sinon le hasard rapporterait des points
            erreurs++; p.querySelector(`.opt[data-k="${val}"]`).classList.add("barre-opt");
            terminer(false, true);
            fb.innerHTML = `<strong>Ce n'est pas ça.</strong> Avec deux réponses possibles, il n'y a pas de deuxième essai : lis bien la solution.` + fb.innerHTML.replace(/^<strong>Voici la solution\.<\/strong>[^<]*/, "");
          }
          else { rate(); p.querySelector(`.opt[data-k="${val}"]`).classList.add("barre-opt"); p.querySelector(`.opt[data-k="${val}"]`).disabled = true; }
        } else if (q.mode === "nombre") {
          const v = lireNombre(val);
          if (isNaN(v)) { fb.className = "retour-rep info"; fb.textContent = "Écris un nombre, par exemple −3 ou 2,5."; return; }
          const tol = q.tolerance || 1e-9;
          const connue = (q.erreurs || []).find((e) => Math.abs(v - e.valeur) < Math.max(tol, 1e-9) && Math.abs(v - q.attendu) >= tol);
          if (Math.abs(v - q.attendu) < tol) terminer(true);
          else rate(connue ? `<strong>Pas encore.</strong> ${inline(connue.message)}` : undefined);
        } else {
          const v = lireEnsemble(val);
          if (v === null) { fb.className = "retour-rep info"; fb.textContent = "Écris les nombres séparés par « ; », ou « aucun »."; return; }
          const a = q.attendu.slice().sort((x, y) => x - y);
          if (v.length === a.length && v.every((x, k) => Math.abs(x - a[k]) < 1e-9)) terminer(true);
          else if (v.length < a.length && v.every((x) => a.includes(x))) rate(`<strong>C'est juste, mais il en manque.</strong> Il en manque au moins une.`);
          else rate();
        }
      }
      if (q.mode === "choix") p.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => verifier(+b.dataset.k)));
      else {
        const inp = p.querySelector("#rep");
        p.querySelector(".saisie").addEventListener("submit", (e) => { e.preventDefault(); verifier(inp.value); });
        brancherTouches(p, inp);
      }
      bAide.addEventListener("click", () => {
        if (aides >= q.aides.length) return;
        $aides.insertAdjacentHTML("beforeend", `<div class="aide"><span class="tag">Indice ${aides + 1}</span>${md(q.aides[aides])}</div>`);
        aides++;
        bAide.textContent = aides < q.aides.length ? `Un autre indice (${q.aides.length - aides})` : "Plus d'indice";
        bAide.disabled = aides >= q.aides.length;
        if (aides >= q.aides.length) bVoir.hidden = false;
      });
      bVoir.addEventListener("click", () => terminer(false, true));
      bSuiv.addEventListener("click", () => { i++; if (i < ex.nb) question(); else bilan(); });
    }

    function bilan() {
      activiteEnCours = false;
      const r = score / max;
      const st = r >= 0.9 ? 3 : r >= 0.7 ? 2 : r >= 0.4 ? 1 : 0;
      const k = id + ":" + ex.type;
      const premiere = !(k in prog.exo), avant = prog.exo[k] || 0;
      const record = st > avant;
      // Les XP de la série sont comptés ici, à la fin : rejouer sans progresser rapporte beaucoup moins
      const coef = coefRejeu(premiere, record, avant >= 3);
      prog.exo[k] = Math.max(avant, st);
      prog.quand = Object.assign({}, prog.quand, { [k]: Date.now() }); // suivi des devoirs par le professeur
      const xpSerie = gagnerXP(score * (XP.question / 10) * coef, id);
      save();
      const noteCoef = coef < 1 ? `Série ${texteCoef(coef, true)}.` : "";
      const msg = st === 3 ? "Série maîtrisée. Tu peux passer à la suivante." : st === 2 ? "Très bien ! Encore un essai pour la troisième étoile ?" : st === 1 ? "C'est un bon début. Relis la fiche méthode puis recommence." : "Pas de panique : regarde la vidéo et le cours, puis réessaie.";
      p.innerHTML = `<div class="bilan"><p class="eyebrow">Bilan · ${inline(ex.titre)}</p><p class="gros">${score}<span>/${max} pts</span></p>${etoiles(st, 3)}${record ? `<p class="record">Nouveau record !</p>` : ""}<p>${msg}</p><p class="gain-xp">+${xpSerie} XP${noteCoef ? ` · <span>${noteCoef}</span>` : ""}</p>
        <div class="exo-actions"><button class="btn" id="encore">Recommencer</button><button class="btn-sec" id="retour">Autres séries</button></div></div>`;
      p.querySelector("#encore").addEventListener("click", () => lancerSerie(p, c, id, ex));
      p.querySelector("#retour").addEventListener("click", () => vueExercices(p, c, id));
      p.querySelector(".bilan").insertAdjacentHTML("beforeend", inviteAbo("s", st >= 2));
    }
    question();
  }

  /* ---------- QCM ---------- */
  /* Un QCM = 12 questions : la plupart tirées de la banque du chapitre (en évitant celles de l'essai précédent),
     plus 3 questions à choix fabriquées par les générateurs d'exercices du chapitre. */
  const QCM_N = 12, QCM_GEN = 3, QCM_RECENTS = {};
  const tailleQcm = (c) => Math.min(QCM_N, c.qcm.length + (c.exercices.length ? QCM_GEN : 0));
  const tailleQcmId = (id) => Math.min(QCM_N, nbQcmBanque(id) + (nbSeries(id) ? QCM_GEN : 0));
  // Écriture KaTeX d'un nombre à la française (espaces fines, virgule), ou fraction si ce n'est pas un décimal court
  function nombreTex(x, enFraction) {
    if (!isFinite(x)) return null;
    const a = Math.abs(x);
    let s;
    if (Number.isInteger(+a.toFixed(9)) || (!enFraction && Math.abs(a * 1e6 - Math.round(a * 1e6)) < 1e-6 * Math.max(1, a))) {
      const p = String(+a.toFixed(6)).split(".");
      s = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") + (p[1] ? "{,}" + p[1] : "");
    } else {
      let f = null;
      for (let d = 2; d <= 1000 && !f; d++) { const m = Math.round(a * d); if (Math.abs(m / d - a) < 1e-9) f = [m, d]; }
      if (!f) return null;
      s = `\\dfrac{${f[0]}}{${f[1]}}`;
    }
    return (x < 0 ? "-" : "") + s;
  }
  // Une question à saisie devient une question à choix si le générateur prévoit au moins deux erreurs typiques
  // (réponses exactes seulement : pas de conversion quand la réponse est un arrondi accepté avec une tolérance)
  function versChoix(q) {
    if (q.mode !== "nombre" || !isFinite(q.attendu) || (q.tolerance || 0) >= 1e-6) return null;
    const vals = [];
    // les « valeurs approchées » d'une fraction (message valeur exacte) ne sont pas des leurres honnêtes
    (q.erreurs || []).forEach((e) => { const v = +e.valeur; if (isFinite(v) && Math.abs(v - q.attendu) > 1e-9 && !/valeur approchée|valeur exacte/i.test(e.message || "") && !vals.some((w) => Math.abs(w - v) < 1e-9)) vals.push(v); });
    if (vals.length < 2) return null;
    const suf = q.suffixe ? " " + q.suffixe : "";
    const enFraction = Math.abs(q.attendu * 1e6 - Math.round(q.attendu * 1e6)) >= 1e-6 * Math.max(1, Math.abs(q.attendu)); // réponse non décimale : tous les choix en fractions
    const choix = [q.attendu, ...vals.slice(0, 3)].map((v) => { const t = nombreTex(v, enFraction); return t === null ? null : `$${t}$${suf}`; });
    if (choix.includes(null) || new Set(choix).size !== choix.length) return null;
    return { choix, attendu: 0 };
  }
  function questionsGenerees(c, n) {
    const types = shuffle(c.exercices.map((e) => e.type).filter((t) => GEN[t])), out = [], vus = new Set();
    const ajouter = (t, q, choix, bonne) => { vus.add(cleQuestion(q)); out.push({ type: t, gen: true, question: q.enonce, choix, bonne, explication: q.solution, svg: q.figure, tableau: q.tableau }); };
    // 1) une question à choix par série ; 2) puis, pour les séries pas encore utilisées, une question à saisie
    //    transformée en choix ; 3) seulement s'il en manque encore, une deuxième question d'une même série
    for (const passe of [1, 2, 3]) {
      for (let essai = 0; out.length < n && essai < 40 && types.length; essai++) {
        const t = types[essai % types.length];
        if (out.filter((x) => x.type === t).length >= (passe === 3 ? 2 : 1)) continue;
        let q;
        try { q = GEN[t](Math.floor(Math.random() * 5)); } catch (e) { continue; }
        if (vus.has(cleQuestion(q))) continue;
        if (q.mode === "choix") { if (passe !== 2) ajouter(t, q, q.choix, q.attendu); }
        else if (passe > 1) { const v = versChoix(q); if (v) ajouter(t, q, v.choix, v.attendu); }
      }
    }
    return out;
  }
  function vueQCM(p, c, id) {
    activiteEnCours = true; // un QCM en cours n'est pas effacé quand le compte se connecte
    const gen = questionsGenerees(c, QCM_GEN);
    const deja = new Set(QCM_RECENTS[id] || []);
    const banque = shuffle(c.qcm).sort((a, b) => deja.has(a.question) - deja.has(b.question)).slice(0, Math.max(0, QCM_N - gen.length));
    QCM_RECENTS[id] = banque.map((q) => q.question);
    const qs = shuffle(banque.concat(gen)).map((q) => {
      const ordre = shuffle(q.choix.map((_, k) => k));
      return Object.assign({}, q, { ordre });
    });
    let h = `<p class="intro">${qs.length} questions, une seule bonne réponse à chaque fois. Les questions changent à chaque essai.${prog.qcm[id] !== undefined ? ` Ton meilleur score : <strong>${Math.min(prog.qcm[id], qs.length)}/${qs.length}</strong>.` : ""}</p><form id="qcm">`;
    qs.forEach((q, n) => {
      h += `<fieldset class="q" data-n="${n}"><legend><span class="n">${n + 1}</span>${q.gen ? "" : inline(q.question)}</legend>${q.gen ? `<div class="q-enonce">${md(q.question)}</div>` : ""}${q.figure ? figure(q.figure) : ""}${q.svg ? `<figure class="fig">${q.svg}</figure>` : ""}${q.tableau ? tableau(q.tableau) : ""}
        <div class="choix">${q.ordre.map((k) => `<label class="opt"><input type="radio" name="q${n}" value="${k}" id="q${n}c${k}"><span>${inline(q.choix[k])}</span></label>`).join("")}</div>
        <div class="expl" hidden></div></fieldset>`;
    });
    h += `<div class="qcm-fin"><button class="btn" type="submit">Corriger mon QCM</button><p class="muted" id="reste"></p></div></form>`;
    p.innerHTML = h;
    const form = p.querySelector("#qcm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (form.dataset.corrige) { vueQCM(p, c, id); window.scrollTo(0, p.offsetTop - 60); return; }
      const vides = qs.filter((_, n) => !form.querySelector(`input[name="q${n}"]:checked`)).length;
      if (vides && !form.dataset.averti) {
        form.dataset.averti = "1";
        p.querySelector("#reste").textContent = `Il reste ${vides} question${vides > 1 ? "s" : ""} sans réponse. Appuie encore pour corriger quand même.`;
        return;
      }
      let bon = 0;
      qs.forEach((q, n) => {
        const fs = form.querySelector(`[data-n="${n}"]`);
        const choisi = form.querySelector(`input[name="q${n}"]:checked`);
        const ok = choisi && +choisi.value === q.bonne;
        if (ok) bon++;
        fs.classList.add(ok ? "q-bon" : "q-faux");
        fs.querySelectorAll("input").forEach((inp) => { inp.disabled = true; if (+inp.value === q.bonne) inp.closest(".opt").classList.add("opt-bonne"); });
        const ex = fs.querySelector(".expl");
        ex.hidden = false;
        ex.innerHTML = `<strong>${ok ? "Juste." : choisi ? "Faux." : "Sans réponse."}</strong> ${md(q.explication)}`;
      });
      // QCM déjà bien réussi : il rapporte beaucoup moins d'XP
      const avant = prog.qcm[id] === undefined ? undefined : Math.min(prog.qcm[id], qs.length), tot = qs.length;
      const record = avant === undefined || bon > avant;
      const coef = coefRejeu(avant === undefined, bon > avant, avant >= tot);
      prog.qcm[id] = Math.max(avant || 0, bon);
      prog.quand = Object.assign({}, prog.quand, { ["qcm:" + id]: Date.now() });
      const gain = gagnerXP(bon * XP.bonneReponseQcm * coef, id);
      save();
      form.dataset.corrige = "1";
      const fin = p.querySelector(".qcm-fin");
      fin.innerHTML = `<div class="bilan"><p class="eyebrow">Ton score</p><p class="gros">${bon}<span>/${qs.length}</span></p>${record && bon ? `<p class="record">Nouveau record !</p>` : ""}<p>+${gain} XP${coef < 1 ? ` (QCM ${texteCoef(coef)})` : ""}. ${bon >= 8 ? "Excellent, le chapitre est bien compris." : bon >= 5 ? "Bien. Relis les explications des questions ratées." : "Revois le cours et la fiche méthode, puis retente ta chance."}</p><button class="btn" type="submit">Nouveau QCM</button></div>`;
      fin.insertAdjacentHTML("beforeend", inviteAbo("q", bon >= 0.6 * tot));
      fin.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------- Fiche méthode ---------- */
  function vueMethode(p, c) {
    let h = `<div class="methodes">`;
    c.methode.forEach((m) => {
      h += `<article class="methode"><h2>${inline(m.titre)}</h2><ol>${m.etapes.map((e) => `<li>${inline(e)}</li>`).join("")}</ol>${m.figure ? figure(m.figure) : ""}${m.exemple ? `<p class="ex">${inline(m.exemple)}</p>` : ""}</article>`;
    });
    h += `</div><section class="erreurs"><h2>Les erreurs fréquentes</h2><ul>${c.erreurs.map((e) => `<li>${inline(e)}</li>`).join("")}</ul></section>`;
    p.innerHTML = h;
  }

  /* ---------- Défi chrono ---------- */
  const nombreFr = (x) => String(+(+x).toFixed(6)).replace("-", "−").replace(".", ",");
  function bonneReponse(q) {
    if (q.mode === "choix") return inline(q.choix[q.attendu]);
    // valeur exacte : une fraction s'écrit en fraction (1/30 et non 0,033333) ; un arrondi accepté reste en décimal
    const ecrire = (x) => { const t = (q.tolerance || 0) < 1e-6 && nombreTex(x); return t ? tex(t) : nombreFr(x); };
    const v = q.mode === "ensemble" ? (q.attendu.length ? q.attendu.map(ecrire).join(" ; ") : "aucun") : ecrire(q.attendu);
    return `<strong>${v}</strong>${q.suffixe ? " " + inline(q.suffixe) : ""}`;
  }
  // Renvoie true (juste), false (faux) ou null (réponse illisible : pas de pénalité)
  function juger(q, val) {
    if (q.mode === "choix") return val === q.attendu;
    if (q.mode === "nombre") {
      const v = lireNombre(val);
      return isNaN(v) ? null : Math.abs(v - q.attendu) < (q.tolerance || 1e-9);
    }
    const v = lireEnsemble(val);
    if (v === null) return null;
    const a = q.attendu.slice().sort((x, y) => x - y);
    return v.length === a.length && v.every((x, k) => Math.abs(x - a[k]) < 1e-9);
  }

  const themeChapitre = (J, id, titre) => ({ id, titre, series: CHAPITRES[id].exercices.map((e) => e.type).filter((t) => GEN[t] && !(J.exclure || []).includes(t)) });

  /* Onglet « Défi chrono » d'un chapitre */
  function vueDefi(p, c, id) {
    const J = JEUX.chrono, t = themeChapitre(J, id, c.titre), rec = prog.jeux["chrono:" + id];
    p.innerHTML = `<div class="defi-chap"><p class="intro">${inline(J.accroche)}</p>
      <ul class="regles"><li><b>⏱</b> ${J.duree} secondes</li><li><b class="coeur">♥</b> ${J.vies} vies</li><li><b>×3</b> bonus de série</li></ul>
      <p class="defi-rec">${rec ? `Ton record sur ce chapitre : <strong>${rec} pts</strong>` : "Tu n'as pas encore joué sur ce chapitre."}</p>
      <button class="btn" id="go">Lancer le défi</button></div>` + htmlClassement();
    brancherClassement(p);
    p.querySelector("#go").addEventListener("click", () => lancerChrono(J, t, { cible: p, retour: () => vueDefi(p, c, id), retourTexte: "Défi", libelle: c.titre }));
  }

  // Classement du défi chrono (top 10, filtre par classe) : sous le Défi, ou replié en bas des Révisions express
  const htmlClassement = () => `<section class="classement"><h2 class="jeu-choix-t">Classement général</h2>
        <div class="filtres" role="group" aria-label="Classement">${[""].concat(Compte.classes).map((cl) => `<button class="filtre" data-c="${esc(cl)}" aria-pressed="${cl === filtreClassement}">${cl ? esc(classeCourte(cl)) : "Tous"}</button>`).join("")}</div>
        <ol class="top" id="top"></ol>
        <p class="muted">Les points de classement sont la somme des records sur les défis de tous les chapitres${Compte.eleve() ? ` (toi : <strong>${Compte.pointsJeux(prog.jeux)} pts</strong>)` : ""}. Seul le top 10 s'affiche.</p></section>`;
  function brancherClassement(p) {
    p.querySelectorAll(".filtre").forEach((b) => b.addEventListener("click", () => {
      filtreClassement = b.dataset.c;
      p.querySelectorAll(".filtre").forEach((x) => x.setAttribute("aria-pressed", x === b));
      afficherClassement();
    }));
    afficherClassement();
  }

  let filtreClassement = "";
  // Nom court d'une classe dans le classement : les deux Terminales doivent rester distinctes
  const COURTES = { "Première tronc commun": "1re TC", "Première technologique": "1re techno", "Terminale spécialité": "Tle spé", "Terminale maths complémentaires": "Tle compl.", "Terminale maths expertes": "Tle exp." };
  const classeCourte = (cl) => COURTES[cl] || cl.split(" ")[0];
  function afficherClassement() {
    const $top = document.getElementById("top");
    if (!$top) return;
    const demande = filtreClassement;
    $top.innerHTML = `<li class="top-vide">Chargement…</li>`;
    Compte.classement(demande).then((l) => {
      if (demande !== filtreClassement || !$top.isConnected) return;
      if (l === null) { $top.innerHTML = `<li class="top-vide"><a href="#compte">Connecte-toi</a> pour voir le classement et y apparaître.</li>`; return; }
      if (l.reserve) { $top.innerHTML = `<li class="top-vide">Le classement est réservé aux classes de M. Cadena. Tes records restent dans ton compte.</li>`; return; }
      if (!l.length) { $top.innerHTML = `<li class="top-vide">Personne pour l'instant. Lance un défi pour être le premier !</li>`; return; }
      $top.innerHTML = l.map((x, k) => `<li class="${x.moi ? "moi" : ""}"><span class="rang">${["🥇", "🥈", "🥉"][k] || k + 1}</span><span class="top-nom"><strong>${esc(x.prenom)}</strong>${!demande && x.classe ? `<span class="meta">${esc(classeCourte(x.classe))}</span>` : ""}</span><span class="top-pts">${x.points} pts</span></li>`).join("");
    }).catch(() => {
      if ($top.isConnected) $top.innerHTML = `<li class="top-vide">Classement indisponible pour le moment.</li>`;
    });
  }

  // o = { cible: élément où jouer, retour: fonction du bouton retour, libelle: texte du bilan }
  function lancerChrono(J, theme, o) {
    const $c = o.cible;
    // Défi : pas de question déjà posée parmi les 20 dernières
    const derniers = [], vusDefi = new Set();
    const gen = () => {
      const q = tirerSansDoublon(() => GEN[theme.series[Math.floor(Math.random() * theme.series.length)]](Math.floor(Math.random() * 5)), vusDefi);
      derniers.push(cleQuestion(q));
      if (derniers.length > 20) vusDefi.delete(derniers.shift());
      return q;
    };
    let vies = J.vies, score = 0, serie = 0, bonnes = 0, n = 0;
    activiteEnCours = true;
    let reste = J.duree * 1000, depart = 0, enPause = true, fini = false;
    $c.innerHTML = `<div class="jeu">
      <div class="jeu-haut"><button class="lien" id="quitter">← ${esc(o.retourTexte || "Thèmes")}</button><span class="vies" aria-label="Vies"></span><span class="jeu-score"><b id="score">0</b> pts</span></div>
      <div class="chrono" aria-hidden="true"><span id="barre"></span></div>
      <div class="jeu-info"><span id="temps"></span><span id="multi"></span></div>
      <div id="zone"></div></div>`;
    if ($c !== $app) defilerVers($c);
    const $zone = $c.querySelector("#zone"), $barre = $c.querySelector("#barre"), $temps = $c.querySelector("#temps");
    $c.querySelector("#quitter").addEventListener("click", () => { clearInterval(minuterieJeu); minuterieJeu = null; activiteEnCours = false; o.retour(); });
    const multi = () => (serie >= 6 ? 3 : serie >= 3 ? 2 : 1);
    function majHaut() {
      $c.querySelector(".vies").innerHTML = "♥".repeat(vies) + `<span class="off">${"♥".repeat(J.vies - vies)}</span>`;
      $c.querySelector("#score").textContent = score;
      $c.querySelector("#multi").innerHTML = multi() > 1 ? `<b class="combo">Série ×${multi()}</b>` : serie ? `Série : ${serie}` : "";
    }
    function temps() { return Math.max(0, enPause ? reste : reste - (performance.now() - depart)); }
    function tic() {
      const t = temps();
      $barre.style.width = (t / (J.duree * 1000)) * 100 + "%";
      $barre.classList.toggle("urgent", t < 10000);
      $temps.textContent = `${Math.ceil(t / 1000)} s`;
      if (t <= 0 && !fini) fin("Temps écoulé !");
    }
    const pause = () => { if (!enPause) { reste = temps(); enPause = true; } };
    const reprendre = () => { if (enPause) { depart = performance.now(); enPause = false; } };

    function question() {
      const q = gen(); n++;
      let repondu = false;
      $zone.innerHTML = `<div class="enonce">${md(q.enonce)}</div>${q.tableau ? tableau(q.tableau) : ""}${q.figure ? `<figure class="fig">${q.figure}</figure>` : ""}${champReponse(q)}<div class="retour-rep" id="fb" role="status" aria-live="polite"></div>`;
      const fb = $zone.querySelector("#fb");
      function repondre(val) {
        if (repondu || fini) return;
        const ok = juger(q, val);
        if (ok === null) { fb.className = "retour-rep info"; fb.textContent = q.mode === "ensemble" ? "Écris les nombres séparés par « ; », ou « aucun »." : "Écris un nombre, par exemple −3 ou 2,5."; return; }
        repondu = true;
        $zone.querySelectorAll("input, .opt, .touche, .saisie .btn").forEach((el) => (el.disabled = true));
        if (ok) {
          serie++; bonnes++;
          const gain = 10 * multi();
          score += gain; majHaut();
          fb.className = "retour-rep bon"; fb.innerHTML = `<strong>Juste !</strong> +${gain}`;
          if (q.mode === "choix") $zone.querySelector(`.opt[data-k="${val}"]`).classList.add("opt-bonne");
          setTimeout(() => { if (!fini) question(); }, 450);
        } else {
          serie = 0; vies--; majHaut();
          pause();
          if (q.mode === "choix") { $zone.querySelector(`.opt[data-k="${val}"]`).classList.add("barre-opt"); $zone.querySelector(`.opt[data-k="${q.attendu}"]`).classList.add("opt-bonne"); }
          fb.className = "retour-rep faux";
          fb.innerHTML = `<strong>Raté${vies ? `, il te reste ${vies} vie${vies > 1 ? "s" : ""}` : ""}.</strong> Bonne réponse : ${bonneReponse(q)}<details><summary>Voir la solution</summary><div class="solution">${md(q.solution)}</div></details><p class="muted">Le chrono est en pause.</p><button class="btn" id="continuer">${vies ? "Continuer →" : "Voir mon score →"}</button>`;
          const b = fb.querySelector("#continuer");
          b.focus();
          b.addEventListener("click", () => { if (!vies) fin("Plus de vies !"); else { reprendre(); question(); } });
        }
      }
      if (q.mode === "choix") $zone.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => repondre(+b.dataset.k)));
      else {
        const inp = $zone.querySelector("#rep");
        $zone.querySelector(".saisie").addEventListener("submit", (e) => { e.preventDefault(); repondre(inp.value); });
        brancherTouches($zone, inp);
        inp.focus({ preventScroll: true });
      }
    }

    function fin(raison) {
      fini = true; pause();
      clearInterval(minuterieJeu); minuterieJeu = null; activiteEnCours = false;
      const k = "chrono:" + theme.id;
      const ancien = prog.jeux[k] || 0;
      const record = score > ancien;
      const deja = partieDuJour();
      const coef = record || deja < XP.defisPleinTarif ? 1 : XP.defiApres;
      prog.jeux[k] = Math.max(ancien, score);
      const gain = gagnerXP(bonnes * XP.bonneReponseDefi * coef, theme.id);
      save();
      $c.innerHTML = `<div class="bilan"><p class="eyebrow">${esc(J.titre)} · ${esc(o.libelle)}</p><p>${esc(raison)}</p><p class="gros">${score}<span> pts</span></p>${record && score ? `<p class="record">Nouveau record !</p>` : ancien ? `<p class="muted">Ton record : ${ancien} pts</p>` : ""}
        <p>${bonnes} bonne${bonnes > 1 ? "s" : ""} réponse${bonnes > 1 ? "s" : ""} sur ${n}. +${gain} XP${coef < 1 ? ` (déjà ${XP.defisPleinTarif} défis aujourd'hui sans nouveau record : ${divise(coef)} jusqu'à demain)` : ""}.</p>
        <div class="exo-actions"><button class="btn" id="rejouer">Rejouer</button><button class="btn-sec" id="themes">${esc(o.retourTexte || "Changer de thème")}</button></div></div>`;
      $c.querySelector("#rejouer").addEventListener("click", () => lancerChrono(J, theme, o));
      $c.querySelector("#themes").addEventListener("click", o.retour);
    }

    majHaut();
    // Compte à rebours avant le départ
    let compte = 3;
    $zone.innerHTML = `<p class="decompte">${compte}</p>`;
    const $dec = $zone.firstChild;
    const dec = setInterval(() => {
      if (!$dec.isConnected) return clearInterval(dec);
      compte--;
      if (compte > 0) { $dec.textContent = compte; return; }
      clearInterval(dec);
      reprendre(); question(); tic();
      minuterieJeu = setInterval(tic, 250);
    }, 700);
    tic();
  }

  /* ---------- Révisions express et entraînement évaluation (chapitres du lycée) ----------
     Contenu dans window.EVALUATIONS[id] (data/<niveau>/evaluation/<chapitre>.js, champ « eval » du manifeste),
     téléchargé seulement à l'ouverture de l'un des deux onglets. Les questions flash et le défi chrono
     ont besoin des générateurs du niveau, chargés au moment où l'élève les lance. */
  const FLASH_N = 10;
  const ptsTexte = (n) => `${String(n).replace(".", ",")} point${n >= 2 ? "s" : ""}`;
  // Figure d'un fichier d'entraînement : une fonction qui reçoit les outils communs (PM_EXO.graph…), ou un nom de FIGURES
  const figureEval = (f) => (typeof f === "function" ? `<figure class="fig">${f(window.PM_EXO || {})}</figure>` : figure(f));
  const evalDe = (id) => window.EVALUATIONS && window.EVALUATIONS[id];
  // Une longue formule est coupée en morceaux aux signes =, ⟺, <, ⩽… de premier niveau : chaque morceau reste entier
  // sur téléphone (style.css), la ligne ne se coupe qu'entre deux morceaux, jamais au milieu d'une parenthèse
  const RELATIONS = ["\\iff", "\\Leftrightarrow", "\\Rightarrow", "\\leqslant", "\\geqslant", "\\approx", "\\neq"];
  function coupeRelations(s) {
    return String(s == null ? "" : s).replace(/```[\s\S]*?```|\$([^$]+)\$/g, (m, f) => {
      if (f === undefined || f.length < 24) return m;
      const morceaux = []; let d = 0, par = 0, cur = "";
      for (let i = 0; i < f.length; i++) {
        if (f[i] === "\\") {
          const mot = (f.slice(i).match(/^\\[a-zA-Z]+/) || [f.slice(i, i + 2)])[0];
          if (mot === "\\left" || mot === "\\begin") d++; else if (mot === "\\right" || mot === "\\end") d--; // jamais de coupure dans un système \begin{cases}
          if (d === 0 && par === 0 && RELATIONS.includes(mot) && cur.trim()) { morceaux.push(cur); cur = ""; }
          cur += mot; i += mot.length - 1; continue;
        }
        if (f[i] === "{") d++; else if (f[i] === "}") d--; else if (f[i] === "(") par++; else if (f[i] === ")") par--;
        if (d === 0 && par === 0 && "=<>".includes(f[i]) && cur.trim()) { morceaux.push(cur); cur = ""; }
        cur += f[i];
      }
      morceaux.push(cur);
      return morceaux.length > 1 ? morceaux.map((x) => `$${x.trim()}$`).join(" ") : m;
    });
  }
  const mdEval = (s) => md(coupeRelations(s));
  // Remonte au début du panneau, juste sous la barre du haut et les onglets collants (deux rangées sur téléphone)
  function defilerVers(el) {
    const nav = document.querySelector(".onglets"), haut = nav ? (parseFloat(getComputedStyle(nav).top) || 0) + nav.offsetHeight : 110;
    window.scrollTo(0, Math.max(0, el.getBoundingClientRect().top + window.scrollY - haut - 8));
  }

  function vueEntrainement(p, c, id, onglet) {
    const h0 = location.hash;
    const afficher = () => {
      const e = evalDe(id);
      if (!e) { p.innerHTML = msgReseau("Cette partie du chapitre n'a pas pu se charger."); return; }
      (onglet === "revisions" ? vueRevisions : vueEvaluation)(p, c, id, e);
      // une figure nommée qui vient des générateurs du niveau est dessinée dès qu'ils sont là
      if (p.querySelector("[data-figure]")) assurerMoteur(id).then(() => { if (memePage(h0)) remplirFigures(p); }).catch(() => {});
      else if (onglet === "revisions") prechargerMoteur(id);
    };
    if (evalDe(id) || !fichierEval(id)) return afficher();
    p.innerHTML = msgAttente("Chargement…");
    chargerScript(fichierEval(id)).then(() => { if (memePage(h0)) afficher(); })
      .catch(() => { if (memePage(h0)) p.innerHTML = msgReseau("Cette partie du chapitre n'a pas pu se charger."); });
  }

  // Lance f quand les générateurs du chapitre sont chargés (questions flash, défi chrono)
  function avecMoteur(p, id, bouton, f) {
    if (moteurPret(id)) return f();
    const h0 = location.hash, texte = bouton.textContent;
    bouton.disabled = true; bouton.textContent = "Chargement…";
    assurerMoteur(id).then(() => { if (memePage(h0)) f(); })
      .catch(() => { bouton.disabled = false; bouton.textContent = texte; if (memePage(h0)) bouton.insertAdjacentHTML("afterend", msgReseau("Les questions n'ont pas pu se charger.")); });
  }

  /* Onglet « Révisions express » : l'essentiel, les pièges, puis questions flash ou défi chrono */
  function vueRevisions(p, c, id, e) {
    const r = e.revisions || {}, J = JEUX.chrono, rec = prog.jeux["chrono:" + id];
    const faites = c.exercices.filter((x) => (prog.exo[id + ":" + x.type] || 0) >= 3).length;
    let h = `<p class="intro">${inline(r.intro || "L'essentiel du chapitre en quelques minutes : relis, repère les pièges, puis teste-toi.")}</p>`;
    if (r.essentiel && r.essentiel.length) h += `<section class="rev-bloc"><h2>L'essentiel</h2><div class="rev-cartes">${r.essentiel.map((x) => `<article class="rev-carte"><h3>${inline(x.titre)}</h3>${mdEval(x.texte)}${x.figure ? figureEval(x.figure) : ""}</article>`).join("")}</div></section>`;
    if (r.pieges && r.pieges.length) h += `<section class="rev-bloc erreurs"><h2>Les pièges à éviter</h2><ul>${r.pieges.map((x) => `<li>${inline(coupeRelations(x))}</li>`).join("")}</ul></section>`;
    h += `<section class="rev-bloc rev-test"><h2>Je me teste</h2><div class="rev-modes">
        <div class="rev-mode"><p class="rev-mode-t">${FLASH_N} questions flash</p><p class="muted">Tirées des exercices du chapitre, corrigées tout de suite, sans chrono.</p><button class="btn" id="flash">C'est parti</button></div>
        <div class="rev-mode"><p class="rev-mode-t">Défi chrono</p><p class="muted">${J.duree} secondes, ${J.vies} vies, bonus de série : ton record compte pour le classement.${rec ? ` Ton record : <strong>${rec} pts</strong>.` : ""}</p><button class="btn-sec" id="chrono">Lancer le défi</button></div>
      </div>${c.exercices.length ? `<p class="muted rev-series">Séries d'exercices maîtrisées (3 étoiles) : <strong>${faites}/${c.exercices.length}</strong>. <a href="#${id}.exercices">Voir les séries</a></p>` : ""}</section>
      <details class="rev-classement"><summary>Classement du défi chrono</summary><div id="rev-top"></div></details>
      <a class="suite" href="#${id}.evaluation">Je m'entraîne pour l'évaluation →</a>`;
    p.innerHTML = h;
    const retour = () => { vueRevisions(p, c, id, e); defilerVers(p.querySelector(".rev-test") || p); };
    p.querySelector("#flash").addEventListener("click", (ev) => avecMoteur(p, id, ev.currentTarget, () => lancerFlash(p, c, id, retour)));
    p.querySelector("#chrono").addEventListener("click", (ev) => avecMoteur(p, id, ev.currentTarget, () => lancerChrono(J, themeChapitre(J, id, c.titre), { cible: p, retour, retourTexte: "Révisions", libelle: c.titre })));
    const cl = p.querySelector(".rev-classement");
    cl.addEventListener("toggle", () => { if (cl.open && !cl.dataset.pret) { cl.dataset.pret = "1"; p.querySelector("#rev-top").innerHTML = htmlClassement(); brancherClassement(p); } });
  }

  /* Questions flash : tirées tour à tour de chaque série du chapitre, sans chrono ni points
     (les points se gagnent dans les séries, le QCM et le défi chrono) */
  function lancerFlash(p, c, id, retour) {
    const series = themeChapitre(JEUX.chrono, id, c.titre).series, vus = new Set(), ordre = [];
    if (!series.length) return retour();
    while (ordre.length < FLASH_N) ordre.push(...shuffle(series));
    activiteEnCours = true;
    let i = 0, bonnes = 0;
    function question() {
      const q = tirerSansDoublon(() => GEN[ordre[i]](Math.floor(Math.random() * 5)), vus);
      let repondu = false;
      p.innerHTML = `<div class="exo">
        <div class="exo-top"><button class="lien" id="quitter">← Révisions</button><span class="progression">Question ${i + 1}/${FLASH_N}</span><span class="pts">${bonnes} juste${bonnes > 1 ? "s" : ""}</span></div>
        <div class="pastilles">${Array.from({ length: FLASH_N }, (_, k) => `<span class="${k < i ? "ok" : k === i ? "cur" : ""}"></span>`).join("")}</div>
        <div class="enonce">${md(q.enonce)}</div>
        ${q.tableau ? tableau(q.tableau) : ""}
        ${q.figure ? `<figure class="fig" id="fig">${q.figure}</figure>` : ""}
        ${champReponse(q)}
        <div class="retour-rep" id="fb" role="status" aria-live="polite"></div>
        <div class="exo-actions"><button class="btn-sec" id="passer">Je ne sais pas</button><button class="btn" id="suivant" hidden>${i + 1 < FLASH_N ? "Question suivante →" : "Voir mon bilan →"}</button></div>
      </div>`;
      const fb = p.querySelector("#fb"), bPasser = p.querySelector("#passer"), bSuiv = p.querySelector("#suivant");
      defilerVers(p);
      p.querySelector("#quitter").addEventListener("click", () => { activiteEnCours = false; retour(); });
      function repondre(val, passe) {
        if (repondu) return;
        const ok = passe ? false : juger(q, val);
        if (ok === null) { fb.className = "retour-rep info"; fb.textContent = q.mode === "ensemble" ? "Écris les nombres séparés par « ; », ou « aucun »." : "Écris un nombre, par exemple −3 ou 2,5."; return; }
        repondu = true;
        if (ok) bonnes++;
        p.querySelectorAll("input, .opt, .touche, .saisie .btn").forEach((el) => (el.disabled = true));
        if (q.mode === "choix") {
          if (!passe && !ok) p.querySelector(`.opt[data-k="${val}"]`).classList.add("barre-opt");
          p.querySelector(`.opt[data-k="${q.attendu}"]`).classList.add("opt-bonne");
        }
        fb.className = "retour-rep " + (ok ? "bon" : passe ? "info" : "faux");
        fb.innerHTML = (ok ? "<strong>Juste !</strong>" : `<strong>${passe ? "La réponse" : "Pas tout à fait"}.</strong> Bonne réponse : ${bonneReponse(q)}`)
          + `<details${ok ? "" : " open"}><summary>${ok ? "Voir la rédaction" : "La solution"}</summary><div class="solution">${md(q.solution)}</div></details>`;
        if (q.figureSolution) { const f = p.querySelector("#fig"); if (f) f.innerHTML = q.figureSolution; else fb.insertAdjacentHTML("beforeend", `<figure class="fig">${q.figureSolution}</figure>`); }
        p.querySelector(".pts").textContent = `${bonnes} juste${bonnes > 1 ? "s" : ""}`;
        bPasser.hidden = true; bSuiv.hidden = false; bSuiv.focus();
      }
      if (q.mode === "choix") p.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => repondre(+b.dataset.k)));
      else {
        const inp = p.querySelector("#rep");
        p.querySelector(".saisie").addEventListener("submit", (ev) => { ev.preventDefault(); repondre(inp.value); });
        brancherTouches(p, inp);
      }
      bPasser.addEventListener("click", () => repondre(null, true));
      bSuiv.addEventListener("click", () => { i++; if (i < FLASH_N) question(); else bilan(); });
    }
    function bilan() {
      activiteEnCours = false;
      const msg = bonnes >= 9 ? "Excellent : le chapitre est bien en place." : bonnes >= 7 ? "Bien ! Relis les solutions des questions ratées." : bonnes >= 4 ? "C'est un début : relis l'essentiel, puis retravaille les séries qui coincent." : "Reprends le cours et la fiche méthode, puis réessaie.";
      p.innerHTML = `<div class="bilan"><p class="eyebrow">Questions flash · ${esc(c.titre)}</p><p class="gros">${bonnes}<span>/${FLASH_N}</span></p><p>${msg}</p>
        <div class="exo-actions"><button class="btn" id="encore">Encore ${FLASH_N} questions</button><button class="btn-sec" id="retour">Révisions</button></div></div>`;
      p.querySelector("#encore").addEventListener("click", () => lancerFlash(p, c, id, retour));
      p.querySelector("#retour").addEventListener("click", retour);
    }
    question();
  }

  /* Onglet « Entraînement évaluation » : deux ou trois exercices type contrôle ou bac, avec indice et corrigé par question */
  // Un exercice (onglet Évaluation ou sujet complet). x.numero remplace « Exercice k » ; ouvert : corrigés déjà affichés (PDF du corrigé)
  function htmlExoEval(x, k, ouvert) {
    const qs = (x.questions || []).map((q) => {
      if (q.partie) return `<li class="eval-partie"><h3>${inline(q.partie)}</h3>${q.texte ? mdEval(q.texte) : ""}${q.figure ? figureEval(q.figure) : ""}${q.tableau ? tableau(q.tableau) : ""}</li>`;
      return `<li class="eval-q"><div class="eval-q-txt">${q.n ? `<span class="eval-n">${esc(q.n)}</span>` : ""}<div class="eval-q-corps">${mdEval(q.texte)}${q.figure ? figureEval(q.figure) : ""}${q.tableau ? tableau(q.tableau) : ""}</div></div>
        <div class="eval-q-btn">${q.indice ? `<button type="button" class="btn-mini" data-ouvre="indice" aria-expanded="false">Indice</button>` : ""}<button type="button" class="btn-mini" data-ouvre="corrige" aria-expanded="${ouvert ? "true" : "false"}">Corrigé</button>${q.points !== undefined ? `<span class="eval-pts">${ptsTexte(q.points)}</span>` : ""}</div>
        ${q.indice ? `<div class="aide eval-indice" hidden><span class="tag">Indice</span>${mdEval(q.indice)}</div>` : ""}
        <div class="eval-corrige"${ouvert ? "" : " hidden"}><span class="tag">Corrigé</span>${mdEval(q.corrige)}${q.tableauCorrige ? tableau(q.tableauCorrige) : ""}${q.figureCorrige ? figureEval(q.figureCorrige) : ""}${q.corrigeFin ? mdEval(q.corrigeFin) : ""}</div></li>`;
    }).join("");
    return `<article class="eval-exo"><header class="eval-tete"><p class="eyebrow">${x.numero ? esc(x.numero) : `Exercice ${k + 1}`}${x.duree ? ` · ${x.duree} min` : ""}${x.points ? ` · ${ptsTexte(x.points)}` : ""}</p><h2>${inline(x.titre)}</h2>
        <p class="eval-calc">${x.calculatrice ? "Calculatrice autorisée" : "Sans calculatrice"}</p></header>
      ${x.contexte ? `<div class="eval-contexte">${mdEval(x.contexte)}</div>` : ""}${x.figure ? figureEval(x.figure) : ""}${x.tableau ? tableau(x.tableau) : ""}
      <ol class="eval-qs">${qs}</ol>
      <div class="eval-fin"><button type="button" class="btn-sec" data-tout="${ouvert ? "0" : "1"}">${ouvert ? "Masquer le corrigé" : "Afficher tout le corrigé"}</button></div></article>`;
  }
  function vueEvaluation(p, c, id, e) {
    const ev = e.evaluation || {}, exos = ev.exercices || [];
    const duree = exos.reduce((s, x) => s + (x.duree || 0), 0);
    let h = `<p class="intro">${inline(ev.intro || `${exos.length} exercice${exos.length > 1 ? "s" : ""} comme en contrôle${duree ? ` (${duree} min en tout)` : ""}. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.`)}</p>`;
    exos.forEach((x, k) => { h += htmlExoEval(x, k); });
    h += `<a class="suite" href="#${id}.revisions">Revoir l'essentiel du chapitre →</a>`;
    p.innerHTML = h;
    brancherEval(p);
  }
  // Boutons Indice, Corrigé et « Afficher tout le corrigé » des exercices affichés dans p
  function brancherEval(p) {
    p.addEventListener("click", (evt) => {
      const b = evt.target.closest("[data-ouvre]");
      if (b) {
        const bloc = b.closest(".eval-q").querySelector(".eval-" + b.dataset.ouvre), ouvrir = bloc.hidden;
        bloc.hidden = !ouvrir; b.setAttribute("aria-expanded", String(ouvrir));
        return;
      }
      const t = evt.target.closest("[data-tout]");
      if (!t) return;
      const art = t.closest(".eval-exo"), ouvrir = t.dataset.tout === "1";
      art.querySelectorAll(".eval-corrige").forEach((d) => { d.hidden = !ouvrir; });
      art.querySelectorAll('[data-ouvre="corrige"]').forEach((x) => x.setAttribute("aria-expanded", String(ouvrir)));
      t.dataset.tout = ouvrir ? "0" : "1";
      t.textContent = ouvrir ? "Masquer le corrigé" : "Afficher tout le corrigé";
    });
  }

  route();

  /* ---------- Hors ligne et cache (sw.js) : les fichiers déjà téléchargés sont servis sans réseau ---------- */
  // Seulement sur le site en ligne (https) : en local, le cache cacherait les fichiers qu'on est en train de modifier
  if ("serviceWorker" in navigator && (location.protocol === "https:" || /[?&]sw=1/.test(location.search))) { // ?sw=1 : test en local
    window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js" + (VERSION ? "?v=" + VERSION : "")).catch(() => {}); });
  }
})();
