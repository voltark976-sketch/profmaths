/*
  SNT (sciences numériques et technologie, Seconde) : générateurs d'exercices et figures des cours.
  Préfixes : si (chapitre 1, Internet), sw (chapitre 2, Le Web).
  Chaque générateur fabrique une question tirée au hasard, la réponse attendue, trois indices progressifs
  et la solution rédigée. Les réponses sont des nombres (mode « nombre ») ou un choix parmi QUATRE
  propositions (mode « choix ») : jamais de question à deux choix.
  Ce fichier n'a besoin que d'assets/exercices-base.js (outils communs), chargé avant lui.
  Code en ligne dans les textes : entre deux accents graves, `<p>` ou `https://…` (voir inline() dans app.js).
  Les noms de domaine et adresses IP des exercices sont fictifs, sauf les sites officiels des exercices d'hameçonnage.
*/
(function () {
  "use strict";
  const { rand, pick, shuffle } = window.PM_EXO.outils;
  const FIGURES = window.PM_EXO.FIGURES, GEN = window.PM_EXO.GEN;

  /* ---------- Écriture ---------- */
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const cd = (s) => "`" + s + "`"; // code en ligne
  // Nombre écrit à la française dans une formule : 52\,300 ; 0{,}25
  const nb = (x) => {
    const s = String(+(+x).toPrecision(12));
    const neg = s[0] === "-", [e, d] = (neg ? s.slice(1) : s).split(".");
    return (neg ? "-" : "") + e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") + (d ? "{,}" + d : "");
  };
  const nbT = (x) => String(+(+x).toFixed(6)).replace(".", ",").replace(/^(\d{4,})/, (m) => m.replace(/\B(?=(\d{3})+(?!\d))/g, " ")); // dans un SVG
  const m$ = (x) => `$${nb(x)}$`;
  const minus = (x) => x.replace(/^([A-ZÀÉÈ])(?=[a-zàâçéèêëîïôûù' ])/, (c) => c.toLowerCase());
  const pluriel = (n, mot, mots) => `${m$(n)} ${n > 1 ? mots || mot + "s" : mot}`;

  /* ---------- Questions : erreurs prévues, choix, vrai ou faux ---------- */
  const errs = (att, L) => { const vus = []; return (L || []).filter((e) => { if (!e || typeof e.valeur !== "number" || !isFinite(e.valeur)) return false; if (Math.abs(e.valeur - att) < 1e-9 || vus.some((w) => Math.abs(w - e.valeur) < 1e-9)) return false; vus.push(e.valeur); return true; }); };
  // Quatre choix : la bonne réponse et trois pièges distincts ; « autre » fabrique des pièges de réserve
  function choix4(bonne, fausses, autre) {
    const f = [];
    const prendre = (x) => { if (x !== undefined && x !== null && x !== "" && x !== bonne && !f.includes(x)) f.push(x); };
    (fausses || []).forEach(prendre);
    for (let k = 0; f.length < 3 && autre && k < 80; k++) prendre(autre(k));
    if (f.length < 3) throw new Error("choix4 : pas assez de pièges pour " + bonne);
    const c = shuffle([bonne, ...f.slice(0, 3)]);
    return { choix: c, attendu: c.indexOf(bonne) };
  }
  // Parmi 4 affirmations du tableau T ([énoncé, vrai ?, explication]), une seule est vraie (ou une seule fausse)
  function vraiFaux4(T, aides) {
    const V = T.filter((t) => t[1]), F = T.filter((t) => !t[1]), modes = [];
    if (V.length >= 1 && F.length >= 3) modes.push("vraie");
    if (F.length >= 1 && V.length >= 3) modes.push("fausse");
    const m = pick(modes), bon = pick(m === "vraie" ? V : F), autres = shuffle((m === "vraie" ? F : V).slice()).slice(0, 3);
    const c = choix4(bon[0], autres.map((a) => a[0]));
    return { enonce: `Une seule de ces affirmations est **${m}**. Laquelle ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides,
      solution: `« ${bon[0]} » est ${m} : ${minus(bon[2])}\n\n` + autres.map((a) => `- « ${a[0]} » est ${m === "vraie" ? "fausse" : "vraie"} : ${minus(a[2])}`).join("\n") };
  }
  // Question d'une banque : [énoncé, bonne réponse, [pièges…], indice, explication]
  function banque(B, intro, aidesCommunes) {
    const q = pick(B), c = choix4(q[1], shuffle(q[2].slice()));
    return { enonce: (intro ? intro + "\n\n" : "") + q[0], mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [aidesCommunes[0], q[3], aidesCommunes[1]], solution: `Réponse : **${q[1].replace(/\*\*/g, "")}**. ${q[4]}` };
  }
  // Enregistre un générateur ; f peut renvoyer null quand un tirage ne convient pas : on retire alors
  const def = (nom, f) => { GEN[nom] = function (i) { let q = null; for (let k = 0; !q && k < 60; k++) q = f(i); if (!q) throw new Error(nom); if (q.mode === "nombre") q.erreurs = errs(q.attendu, q.erreurs); return q; }; };

  /* ---------- Figures : tableaux, boîtes, flèches, réseaux ---------- */
  // Tableau HTML (première ligne = en-têtes) ; code: true écrit les cellules en police machine
  const tableHTML = (lignes, o = {}) => `<div class="scroll-x"><table class="valeurs croise">${lignes.map((l, i) => `<tr>${l.map((v) => (i === 0 ? `<th>${esc(v)}</th>` : `<td${o.code ? ' class="tt-cell"' : ""}>${esc(v)}</td>`)).join("")}</tr>`).join("")}</table></div>`;
  const svg = (w, h, inner, aria) => `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(aria)}" style="max-width:${w}px;display:block;margin:auto"><defs><marker id="snt-fl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--doux)"/></marker><marker id="snt-fl2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--lagon)"/></marker></defs>${inner}</svg>`;
  const txt = (x, y, t, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.ancre || "middle"}" class="g-label" style="font-size:${o.taille || 11}px;${o.gras === false ? "font-weight:400;" : ""}${o.couleur ? `fill:${o.couleur};` : ""}${o.mono ? "font-family:ui-monospace,Menlo,Consolas,monospace;" : ""}">${esc(t)}</text>`;
  const boite = (x, y, w, h, lignes, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx === undefined ? 8 : o.rx}" style="fill:${o.fond || "var(--lagon-pale)"};stroke:${o.trait || "var(--lagon)"};stroke-width:1.5"/>` +
    [].concat(lignes).map((l, k, L) => txt(x + w / 2, y + h / 2 + 4 + (k - (L.length - 1) / 2) * (o.inter || 13), l, { taille: o.taille, mono: o.mono, gras: o.gras })).join("");
  const fleche = (x1, y1, x2, y2, o = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:${o.couleur || "var(--doux)"};stroke-width:${o.e || 1.6}${o.tirets ? ";stroke-dasharray:5 3" : ""}" marker-end="url(#${o.couleur ? "snt-fl2" : "snt-fl"})"${o.double ? ` marker-start="url(#${o.couleur ? "snt-fl2" : "snt-fl"})"` : ""}/>`;
  // Réseau : nœuds {id, x, y, type: "routeur" | "machine" | "serveur", panne}, liaisons [a, b] ; orient : flèches (graphe du Web)
  function reseauSVG(noeuds, liaisons, o = {}) {
    const P = {}; noeuds.forEach((n) => (P[n.id] = n));
    const r = o.r || 15;
    let s = "";
    liaisons.forEach(([a, b]) => {
      const A = P[a], B = P[b], dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy) || 1;
      const larg = (n) => Math.max(36, String(n.label || n.id).length * 7.5 + 10), ra = A.type === "machine" || A.type === "serveur" ? Math.min(larg(A) / 2, 24) : r, rb = B.type === "machine" || B.type === "serveur" ? Math.min(larg(B) / 2, 24) : r;
      const x1 = A.x + (dx / d) * ra, y1 = A.y + (dy / d) * ra, x2 = B.x - (dx / d) * (rb + (o.orient ? 2 : 0)), y2 = B.y - (dy / d) * (rb + (o.orient ? 2 : 0));
      s += o.orient ? fleche(x1.toFixed(1), y1.toFixed(1), x2.toFixed(1), y2.toFixed(1), { e: 1.5 }) : `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" style="stroke:var(--doux);stroke-width:2"/>`;
    });
    s += o.extra || "";
    noeuds.forEach((n) => {
      const larg = (m) => Math.max(36, String(m.label || m.id).length * 7.5 + 10), coul = n.panne ? "var(--faux)" : n.marque ? "var(--ylang)" : "var(--lagon)";
      if (n.type === "machine" || n.type === "serveur") s += `<rect x="${n.x - larg(n) / 2}" y="${n.y - 13}" width="${larg(n)}" height="26" rx="${n.type === "serveur" ? 2 : 6}" style="fill:var(--surface);stroke:${coul};stroke-width:1.8"/>` + txt(n.x, n.y + 4, n.label || n.id, { taille: 11 });
      else if (n.type === "page") s += `<rect x="${n.x - r}" y="${n.y - r}" width="${2 * r}" height="${2 * r}" rx="4" style="fill:var(--lagon-pale);stroke:${coul};stroke-width:1.8"/>` + txt(n.x, n.y + 4, n.label || n.id, { taille: 12 });
      else s += `<circle cx="${n.x}" cy="${n.y}" r="${r}" style="fill:${n.panne ? "var(--faux-pale, var(--surface))" : "var(--lagon-pale)"};stroke:${coul};stroke-width:${n.marque ? 2.6 : 1.8}"/>` + txt(n.x, n.y + 4, n.label || n.id, { taille: 11 });
      if (n.panne) s += `<circle cx="${n.x + 13}" cy="${n.y - 13}" r="7" style="fill:var(--faux)"/><path d="M${n.x + 10} ${n.y - 16}l6 6M${n.x + 16} ${n.y - 16}l-6 6" style="stroke:var(--surface);stroke-width:1.8"/>`;
    });
    return svg(o.w || 320, o.h || 200, s, o.aria || "Schéma d'un réseau");
  }
  // Plus courts chemins (parcours en largeur) : distances depuis s, en évitant les nœuds « exclus »
  function distances(ids, liaisons, s, exclus = []) {
    const V = {}; ids.forEach((i) => (V[i] = []));
    liaisons.forEach(([a, b]) => { if (!exclus.includes(a) && !exclus.includes(b)) { V[a].push(b); V[b].push(a); } });
    const D = { [s]: 0 }, file = [s];
    while (file.length) { const u = file.shift(); V[u].forEach((v) => { if (!(v in D)) { D[v] = D[u] + 1; file.push(v); } }); }
    return { D, V };
  }
  function unChemin(V, D, s, t) { // un plus court chemin de s à t
    const ch = [t]; let u = t;
    while (u !== s) { u = V[u].filter((v) => D[v] === D[u] - 1).sort()[0]; ch.unshift(u); }
    return ch;
  }

  /* =====================================================================
     CHAPITRE 1 : INTERNET (si-)
     ===================================================================== */

  /* ---------- Ordres de grandeur : octets, ko, Mo, Go… ---------- */
  const UNITES = ["octet", "ko", "Mo", "Go", "To", "Po", "Eo"];
  const NOMS_U = { ko: "kilooctet", Mo: "mégaoctet", Go: "gigaoctet", To: "téraoctet", Po: "pétaoctet", Eo: "exaoctet" };
  const uTxt = (k, v) => (k === 0 ? (v > 1 || v === 0 ? "octets" : "octet") : UNITES[k]);
  const AIDES_U = ["Préfixes du système international : $1$ ko $= 1\\,000$ octets, $1$ Mo $= 1\\,000$ ko, $1$ Go $= 1\\,000$ Mo, $1$ To $= 1\\,000$ Go.", "Vers une unité plus petite, on multiplie par $1\\,000$ à chaque cran ; vers une unité plus grande, on divise."];
  def("si-unites", () => {
    const t = pick(["vers-petit", "vers-petit", "vers-grand", "bits", "combien", "combien"]);
    if (t === "bits") {
      const sens = pick(["o-b", "b-o"]);
      if (sens === "o-b") {
        const v = pick([rand(2, 40), rand(2, 9) + 0.5]), u = pick(["ko", "Mo", "Go"]);
        return { enonce: `Un fichier pèse ${m$(v)} ${u}. Combien de **${u[0]}bits** cela représente-t-il ? (Rappel : $1$ octet $= 8$ bits.)`, mode: "nombre", prefixe: "Taille :", suffixe: `${u[0]}bits`, attendu: v * 8,
          erreurs: [{ valeur: v / 8, message: "Un octet contient $8$ bits : il y a **plus** de bits que d'octets." }, { valeur: v * 1000, message: "On ne change pas de préfixe ici : on passe seulement des octets aux bits." }],
          aides: ["Un bit est un $0$ ou un $1$ ; un octet est un groupe de $8$ bits.", "Pour passer des octets aux bits, on multiplie par $8$.", `Calcule $${nb(v)} \\times 8$.`],
          solution: `$1$ octet $= 8$ bits, donc ${m$(v)} ${u} $= ${nb(v)} \\times 8 = ${nb(v * 8)}$ ${u[0]}bits.` };
      }
      const v = 8 * pick([rand(2, 30), rand(5, 25) * 10]), u = pick(["k", "M", "G"]);
      return { enonce: `Une connexion transmet ${m$(v)} ${u}bits par seconde. Combien d'**${u}o** (${u === "k" ? "kilo" : u === "M" ? "méga" : "giga"}octets) cela fait-il par seconde ?`, mode: "nombre", prefixe: "Par seconde :", suffixe: `${u}o`, attendu: v / 8,
        erreurs: [{ valeur: v * 8, message: "Il faut $8$ bits pour faire un octet : il y a **moins** d'octets que de bits." }],
        aides: ["Les débits s'annoncent en bits par seconde (bit/s), les fichiers en octets.", "$8$ bits font $1$ octet : on divise par $8$.", `Calcule $${nb(v)} \\div 8$.`],
        solution: `$${nb(v)} \\div 8 = ${nb(v / 8)}$ : la connexion transmet ${m$(v / 8)} ${u}o par seconde.` };
    }
    if (t === "combien") {
      const k = rand(1, 3), a = pick([2, 4, 5, 10, 20, 25, 50, 100, 200, 250, 500]), b = pick([1, 2, 4, 5, 10, 16, 32, 64, 128]);
      const n = (b * 1000) / a;
      if (!Number.isInteger(n)) return null;
      const quoi = pick([["photos", "photo"], ["chansons", "chanson"], ["vidéos", "vidéo"], ["documents", "document"]]);
      return { enonce: `Une ${quoi[1]} pèse en moyenne ${m$(a)} ${UNITES[k]}. Combien de ${quoi[0]} de cette taille peut-on ranger dans une mémoire de ${m$(b)} ${UNITES[k + 1]} ?`, mode: "nombre", prefixe: `Nombre de ${quoi[0]} :`, attendu: n,
        erreurs: [{ valeur: b / a, message: `Convertis d'abord ${m$(b)} ${UNITES[k + 1]} en ${UNITES[k]}.` }, { valeur: b * 1000 * a, message: "On cherche combien de fois la taille d'un fichier « entre » dans la mémoire : c'est une division." }],
        aides: [AIDES_U[0], `Convertis la mémoire : ${m$(b)} ${UNITES[k + 1]} $= ${nb(b * 1000)}$ ${UNITES[k]}.`, `Divise ensuite par la taille d'une ${quoi[1]} : $${nb(b * 1000)} \\div ${nb(a)}$.`],
        solution: `${m$(b)} ${UNITES[k + 1]} $= ${nb(b * 1000)}$ ${UNITES[k]} et $${nb(b * 1000)} \\div ${nb(a)} = ${nb(n)}$ : on peut ranger ${m$(n)} ${quoi[0]}.` };
    }
    const i = rand(1, 6), d = rand(1, Math.min(2, i)), j = i - d; // j : unité plus petite que i
    if (t === "vers-petit") {
      const v = pick([rand(2, 9), rand(12, 95), rand(2, 9) + pick([0.5, 0.25, 0.2]), rand(1, 9) / 10 + rand(1, 3)]);
      const att = +(v * 1000 ** d).toFixed(6);
      return { enonce: `Convertis : ${m$(v)} ${UNITES[i]} $=$ ? ${uTxt(j, 2)}`, mode: "nombre", prefixe: `${m$(v)} ${UNITES[i]} $=$`, suffixe: uTxt(j, att), attendu: att,
        erreurs: [{ valeur: +(v / 1000 ** d).toFixed(9), message: "On passe à une unité **plus petite** : il en faut plus, on multiplie." }, { valeur: +(v * 1000 ** (d === 1 ? 2 : 1)).toFixed(6), message: `Compte les crans entre ${UNITES[i]} et ${uTxt(j, 2)} : il y en a ${d}.` }, { valeur: +(v * 1024 ** d).toFixed(6), message: "Ici on utilise les préfixes du système international : $1\\,000$, pas $1\\,024$." }],
        aides: [AIDES_U[0], `De ${UNITES[i]} à ${uTxt(j, 2)}, il y a ${d === 1 ? "un cran" : "deux crans"} : on multiplie par ${d === 1 ? "$1\\,000$" : "$1\\,000 \\times 1\\,000 = 1\\,000\\,000$"}.`, `Calcule $${nb(v)} \\times ${nb(1000 ** d)}$.`],
        solution: `${m$(v)} ${UNITES[i]} $= ${nb(v)} \\times ${nb(1000 ** d)} = ${nb(att)}$ ${uTxt(j, att)}.` };
    }
    const att = pick([rand(2, 9), rand(2, 9) + 0.5, rand(11, 60), rand(1, 9) / 10]), v = +(att * 1000 ** d).toFixed(6);
    return { enonce: `Convertis : ${m$(v)} ${uTxt(j, v)} $=$ ? ${UNITES[i]}`, mode: "nombre", prefixe: `${m$(v)} ${uTxt(j, v)} $=$`, suffixe: UNITES[i], attendu: att,
      erreurs: [{ valeur: +(v * 1000 ** d).toFixed(6), message: "On passe à une unité **plus grande** : il en faut moins, on divise." }, { valeur: +(v / 1000 ** (d === 1 ? 2 : 1)).toFixed(9), message: `Compte les crans entre ${uTxt(j, 2)} et ${UNITES[i]} : il y en a ${d}.` }],
      aides: [AIDES_U[1], `De ${uTxt(j, 2)} à ${UNITES[i]}, il y a ${d === 1 ? "un cran" : "deux crans"} : on divise par ${d === 1 ? "$1\\,000$" : "$1\\,000\\,000$"}.`, `Calcule $${nb(v)} \\div ${nb(1000 ** d)}$.`],
      solution: `${m$(v)} ${uTxt(j, v)} $= ${nb(v)} \\div ${nb(1000 ** d)} = ${nb(att)}$ ${UNITES[i]}.` };
  });

  /* ---------- Binaire ---------- */
  const bin8 = (n) => n.toString(2).padStart(8, "0");
  const POIDS = [128, 64, 32, 16, 8, 4, 2, 1];
  const tablePoids = (bits) => tableHTML([POIDS.map(String), bits.split("")]);
  def("si-binaire", () => {
    const t = pick(["b2d", "b2d", "d2b", "d2b", "nval", "nbits"]);
    if (t === "nval") {
      const n = rand(2, 16);
      return { enonce: `Combien de valeurs différentes peut-on écrire avec ${m$(n)} bits ?`, mode: "nombre", prefixe: "Nombre de valeurs :", attendu: 2 ** n,
        erreurs: [{ valeur: 2 * n, message: "Chaque bit ajouté **double** le nombre de possibilités : ce n'est pas $2 \\times n$." }, { valeur: 2 ** n - 1, message: `$${nb(2 ** n - 1)}$ est la plus grande valeur, mais on compte aussi la valeur $0$.` }, { valeur: n * n, message: "C'est $2$ multiplié par lui-même $n$ fois." }],
        aides: ["Avec $1$ bit : $2$ valeurs ($0$ ou $1$). Avec $2$ bits : $00$, $01$, $10$, $11$, soit $4$ valeurs.", "Chaque bit de plus double le nombre de valeurs : avec $n$ bits, il y en a $2^n$.", `Calcule $2^{${n}}$.`],
        solution: `Avec $n$ bits, on écrit $2^n$ valeurs différentes : $2^{${n}} = ${nb(2 ** n)}$ (de $0$ à $${nb(2 ** n - 1)}$).` };
    }
    if (t === "nbits") {
      const N = pick([rand(3, 60), rand(61, 1000), rand(1001, 70000)]), k = Math.ceil(Math.log2(N));
      return { enonce: `On veut donner un numéro binaire différent à chacun des ${m$(N)} appareils d'un réseau. Combien de bits faut-il **au minimum** ?`, mode: "nombre", prefixe: "Nombre de bits :", attendu: k,
        erreurs: [{ valeur: k - 1, message: `Avec $${k - 1}$ bits, on n'a que $2^{${k - 1}} = ${nb(2 ** (k - 1))}$ numéros : pas assez.` }, { valeur: k + 1, message: "C'est assez, mais on cherche le **minimum**." }],
        aides: ["Avec $n$ bits, on écrit $2^n$ numéros différents.", `Cherche la plus petite puissance de $2$ supérieure ou égale à $${nb(N)}$.`, `$2^{${k - 1}} = ${nb(2 ** (k - 1))}$ et $2^{${k}} = ${nb(2 ** k)}$.`],
        solution: `$2^{${k - 1}} = ${nb(2 ** (k - 1))} < ${nb(N)}$ mais $2^{${k}} = ${nb(2 ** k)} \\geqslant ${nb(N)}$ : il faut au minimum ${m$(k)} bits.` };
    }
    const n = rand(1, 255), b = bin8(n), somme = POIDS.filter((p, k) => b[k] === "1");
    if (t === "b2d") {
      const inv = parseInt(b.split("").reverse().join(""), 2);
      return { enonce: `L'octet ${cd(b)} est écrit en binaire. Quel nombre (en base $10$) représente-t-il ?`, figure: tablePoids(b), mode: "nombre", prefixe: "En base $10$ :", attendu: n,
        erreurs: [{ valeur: inv, message: "Le bit de gauche a le plus grand poids ($128$), celui de droite vaut $1$." }, { valeur: b.split("").filter((x) => x === "1").length, message: "Chaque $1$ ne vaut pas $1$ : il vaut le poids de sa position." }],
        aides: ["Chaque position a un poids : $128$, $64$, $32$, $16$, $8$, $4$, $2$, $1$ (de gauche à droite).", "On additionne les poids des positions où il y a un $1$.", `Les $1$ sont sous les poids $${somme.join("$, $")}$.`],
        solution: `$${somme.join(" + ")} = ${n}$ : l'octet ${cd(b)} représente le nombre ${m$(n)}.` };
    }
    const r = b.replace(/^0+/, "");
    return { enonce: `Écris le nombre ${m$(n)} en binaire (avec des $0$ et des $1$ ; les $0$ à gauche ne sont pas obligatoires).`, mode: "nombre", prefixe: "En binaire :", attendu: +r,
      erreurs: [{ valeur: +r.split("").reverse().join("").replace(/^0+/, "") || -1, message: "Tu as écrit les bits à l'envers : le plus grand poids est à gauche." }],
      aides: ["Poids des positions : $128$, $64$, $32$, $16$, $8$, $4$, $2$, $1$.", `Cherche le plus grand poids inférieur ou égal à $${n}$, retire-le, et recommence avec ce qui reste.`, `$${n} = ${somme.join(" + ")}$ : mets un $1$ sous ces poids et un $0$ ailleurs.`],
      solution: `$${n} = ${somme.join(" + ")}$, donc en binaire ${m$(n)} s'écrit ${cd(b)} (soit ${cd(r)} sans les $0$ de gauche).`, figureSolution: tablePoids(b) };
  });

  /* ---------- Adresses IP ---------- */
  const ipAlea = () => [pick([rand(1, 126), rand(128, 223), 192, 172, 10, 82, 90]), rand(0, 255), rand(0, 255), rand(1, 254)];
  const ipTxt = (a) => a.join(".");
  // Adresse publique (pas 10.…, 172.16-31.…, 192.168.… réservées aux réseaux locaux) : pour l'annuaire DNS
  const ipPublique = () => [pick([rand(11, 99), rand(100, 171), rand(173, 191), rand(193, 223)]), rand(0, 255), rand(0, 255), rand(1, 254)];
  const AIDES_IP = ["Une adresse IPv4 est formée de **4 nombres** séparés par des points.", "Chaque nombre tient sur un octet ($8$ bits) : il est compris entre $0$ et $255$."];
  def("si-ip-valide", () => {
    const fausse = (k) => {
      const a = ipAlea(), m = (k + rand(0, 3)) % 4;
      if (m === 0) { a[rand(0, 3)] = rand(256, 420); return ipTxt(a); }
      if (m === 1) return ipTxt(a.slice(0, 3));
      if (m === 2) return ipTxt(a.concat([rand(1, 254)]));
      return a.slice(0, 3).join(".") + "." + pick(["-" + rand(1, 9), rand(1000, 1200), "x"]);
    };
    const mode = pick(["valide", "valide", "invalide"]);
    if (mode === "valide") {
      const bonne = ipTxt(ipAlea()), c = choix4(cd(bonne), [], () => cd(fausse(rand(0, 3))));
      return { enonce: "Une seule de ces adresses IPv4 est **correcte**. Laquelle ?", mode: "choix", choix: c.choix, attendu: c.attendu, aides: [AIDES_IP[0], AIDES_IP[1], "Élimine les adresses qui n'ont pas 4 nombres, ou qui ont un nombre supérieur à $255$ ou négatif."],
        solution: `${cd(bonne)} a bien 4 nombres compris entre $0$ et $255$. Les autres ont trop ou pas assez de nombres, ou un nombre impossible pour un octet.` };
    }
    const f = fausse(rand(0, 3)), c = choix4(cd(f), [], () => cd(ipTxt(ipAlea())));
    return { enonce: "Une seule de ces adresses IPv4 est **impossible**. Laquelle ?", mode: "choix", choix: c.choix, attendu: c.attendu, aides: [AIDES_IP[0], AIDES_IP[1], "Vérifie le nombre de parties, puis la valeur de chacune."],
      solution: `${cd(f)} est impossible : une adresse IPv4 a exactement 4 nombres, chacun entre $0$ et $255$. Les trois autres respectent cette règle.` };
  });
  def("si-ip-reseau", () => {
    const a = ipAlea(), m24 = Math.random() < 0.65, masque = m24 ? "255.255.255.0" : "255.255.0.0", np = m24 ? 3 : 2;
    const res = a.map((x, k) => (k < np ? x : 0)), t = pick(["reseau", "meme", "meme", "machine", "nombre"]);
    const intro = `Un ordinateur a l'adresse ${cd(ipTxt(a))} et le masque de sous-réseau ${cd(masque)}${m24 ? " (les 3 premiers nombres désignent le réseau, le dernier la machine)" : " (les 2 premiers nombres désignent le réseau, les 2 derniers la machine)"}.`;
    const aides0 = [`Le masque ${cd(masque)} : les « $255$ » repèrent la partie **réseau**, les « $0$ » la partie **machine**.`, "Deux machines sont sur le même réseau quand leurs parties réseau sont identiques."];
    if (t === "reseau") {
      const c = choix4(cd(ipTxt(res)), [cd(ipTxt(a.map((x, k) => (k < np - 1 ? x : 0)))), cd(ipTxt(a.map((x, k) => (k < np ? x : 255)))), cd(ipTxt(a.map((x, k) => (k < np ? 0 : x)))), cd(ipTxt(a.map((x, k) => (k < np + 1 ? x : 0))))]);
      return { enonce: `${intro}\n\nQuelle est l'adresse de son **réseau** ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: [aides0[0], "L'adresse du réseau garde la partie réseau et met des $0$ dans la partie machine.", `La partie réseau est ${cd(a.slice(0, np).join("."))}.`],
        solution: `On garde les ${np} premiers nombres et on remplace le reste par $0$ : le réseau est ${cd(ipTxt(res))}.` };
    }
    if (t === "meme") {
      const voisin = a.slice(); do { voisin[3] = rand(1, 254); if (!m24) voisin[2] = rand(0, 255); } while (ipTxt(voisin) === ipTxt(a));
      const autre = (k) => { const b = a.slice(); const pos = rand(0, np - 1); b[pos] = (b[pos] + rand(1, 30) + k) % 256 || 1; b[3] = rand(1, 254); return cd(ipTxt(b)); };
      const c = choix4(cd(ipTxt(voisin)), [], autre);
      return { enonce: `${intro}\n\nLaquelle de ces machines est sur le **même réseau** que lui ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: [aides0[0], aides0[1], `Cherche l'adresse qui commence par ${cd(a.slice(0, np).join(".") + ".")}`],
        solution: `${cd(ipTxt(voisin))} a la même partie réseau ${cd(a.slice(0, np).join("."))} : elle est sur le même réseau. Les autres ont une partie réseau différente.` };
    }
    if (t === "machine") {
      if (!m24) return null;
      return { enonce: `${intro}\n\nQuel est le numéro de la **machine** dans son réseau ?`, mode: "nombre", prefixe: "Numéro de machine :", attendu: a[3],
        erreurs: [{ valeur: a[0], message: "Le premier nombre fait partie de l'adresse du réseau." }, { valeur: a[2], message: "Avec ce masque, la partie machine est le **dernier** nombre." }],
        aides: [aides0[0], "Ici, seul le dernier nombre est « machine ».", `Lis le dernier nombre de ${cd(ipTxt(a))}.`], solution: `La partie machine est le dernier nombre : ${m$(a[3])}.` };
    }
    const n = m24 ? 254 : 65534;
    return { enonce: `${intro}\n\nCombien de machines au maximum peut-on brancher sur ce réseau ? (On retire deux adresses réservées : celle du réseau, qui finit par des $0$, et celle de diffusion, qui finit par des $255$.)`, mode: "nombre", prefixe: "Nombre de machines :", attendu: n,
      erreurs: [{ valeur: n + 2, message: "N'oublie pas de retirer les deux adresses réservées." }, { valeur: m24 ? 255 : 65535, message: "Il y a deux adresses réservées, pas une seule." }],
      aides: [aides0[0], m24 ? "La partie machine est un octet : $2^8 = 256$ valeurs possibles." : "La partie machine fait deux octets : $256 \\times 256 = 65\\,536$ valeurs possibles.", "On retire les deux adresses réservées."],
      solution: m24 ? "Un octet donne $256$ numéros ; sans l'adresse du réseau et celle de diffusion : $256 - 2 = 254$ machines." : "Deux octets donnent $256 \\times 256 = 65\\,536$ numéros ; sans les deux adresses réservées : $65\\,536 - 2 = 65\\,534$ machines." };
  });

  /* ---------- DNS ---------- */
  const DOMAINES = ["www.lagon-bleu.yt", "meteo-ylang.yt", "www.ile-aux-parfums.yt", "www.tortues-du-lagon.org", "www.musee-imaginaire.fr", "www.cours-en-ligne.fr", "www.recettes-du-monde.org", "www.club-de-volley.fr", "www.journal-du-lycee.fr", "www.boutique-exemple.com", "www.bibliotheque-ouverte.org", "www.planetes-et-etoiles.fr", "video.exemple.com", "www.marche-aux-epices.yt", "www.baobab-info.yt", "www.ecole-de-musique.fr", "www.jeux-de-logique.com", "www.photos-de-voyage.net"];
  const tld = (d) => d.slice(d.lastIndexOf("."));
  def("si-dns", () => {
    const D = shuffle(DOMAINES.slice()).slice(0, 4), IP = D.map(() => ipTxt(ipPublique()));
    const fig = tableHTML([["Nom de domaine", "Adresse IP"]].concat(D.map((d, k) => [d, IP[k]])), { code: true });
    const k = rand(0, 3), t = pick(["nom-ip", "nom-ip", "ip-nom", "tld", "role"]);
    const intro = "Voici un extrait (fictif) de l'annuaire d'un serveur DNS.";
    const A = ["Le DNS est l'annuaire d'Internet : à chaque nom de domaine, il associe une adresse IP.", "Cherche la bonne ligne du tableau."];
    if (t === "nom-ip") {
      const c = choix4(cd(IP[k]), IP.filter((x, j) => j !== k).map(cd));
      return { enonce: `${intro} Quelle adresse IP l'ordinateur doit-il contacter pour ouvrir ${cd(D[k])} ?`, figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu, aides: [A[0], A[1], `La ligne de ${cd(D[k])} est la ${["1re", "2e", "3e", "4e"][k]}.`],
        solution: `Le serveur DNS répond ${cd(IP[k])} pour ${cd(D[k])} : c'est cette adresse numérique que l'ordinateur contacte.` };
    }
    if (t === "ip-nom") {
      const c = choix4(cd(D[k]), D.filter((x, j) => j !== k).map(cd));
      return { enonce: `${intro} À quel nom de domaine correspond l'adresse ${cd(IP[k])} ?`, figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu, aides: [A[0], "Ici on fait le chemin inverse : de l'adresse IP vers le nom (recherche inverse).", `L'adresse ${cd(IP[k])} est à la ligne ${k + 1}.`],
        solution: `La ligne de ${cd(IP[k])} donne le nom ${cd(D[k])}.` };
    }
    if (t === "tld") {
      const c = choix4(cd(tld(D[k])), [".fr", ".yt", ".org", ".com", ".net"].filter((x) => x !== tld(D[k])).map(cd));
      return { enonce: `Quel est le **domaine de premier niveau** du nom ${cd(D[k])} ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Un nom de domaine se lit de droite à gauche, du plus général au plus précis.", "Le domaine de premier niveau est la dernière partie, après le dernier point.", `Regarde la fin de ${cd(D[k])}.`],
        solution: `Le domaine de premier niveau est la partie la plus à droite : ${cd(tld(D[k]))}${tld(D[k]) === ".yt" ? " (celui de Mayotte)" : tld(D[k]) === ".fr" ? " (celui de la France)" : ""}.` };
    }
    const B = [
      ["Pour trouver l'adresse de " + cd(D[k]) + ", quel serveur DNS est interrogé **en premier** quand personne ne connaît la réponse ?", "un serveur racine", ["le serveur du site " + cd(D[k]), "le routeur de la box", "le serveur de messagerie"], "Les serveurs DNS forment un arbre : on part du sommet.", "Le serveur racine indique quel serveur gère " + cd(tld(D[k])) + ", qui indique à son tour celui qui connaît le nom complet."],
      ["Après le serveur racine, quel serveur DNS connaît la suite du chemin vers " + cd(D[k]) + " ?", "le serveur du domaine " + cd(tld(D[k])), ["le serveur de la box internet", "un serveur racine de secours", "le navigateur"], "On descend l'arbre en lisant le nom de droite à gauche.", "Le serveur racine renvoie vers le serveur qui gère " + cd(tld(D[k])) + "."],
      ["Pourquoi la box ou l'opérateur garde-t-il en mémoire (cache) les réponses DNS récentes ?", "pour répondre plus vite sans tout redemander", ["pour espionner les sites visités", "parce que les adresses IP ne changent jamais", "pour éviter d'utiliser TCP"], "Pense au nombre de fois où l'on ouvre les mêmes sites.", "Une réponse déjà connue évite de refaire tout le chemin dans l'arbre DNS : c'est plus rapide."],
      ["Que se passe-t-il si aucun serveur DNS ne répond, alors que la connexion fonctionne ?", "on peut encore joindre un site par son adresse IP, mais pas par son nom", ["plus rien ne marche, même avec l'adresse IP", "les pages s'affichent normalement", "le navigateur devine l'adresse IP"], "Le DNS ne transporte pas les paquets : il traduit seulement des noms.", "Sans DNS, le réseau marche encore, mais il faut connaître l'adresse numérique du site."]
    ];
    return banque(B, intro, [A[0], "Le système DNS est réparti sur un très grand nombre de serveurs, organisés en arbre."]);
  });

  /* ---------- Paquets ---------- */
  def("si-paquets", () => {
    const t = pick(["nombre", "nombre", "ko", "total", "renvoi"]);
    const P = pick([500, 1000, 1200, 1460, 1500]);
    if (t === "ko") {
      const F = pick([rand(3, 95) + 0.5, rand(12, 480)]), Pk = 1000, n = Math.ceil((F * 1000) / Pk);
      return { enonce: `Une photo de ${m$(F)} ko est envoyée sur Internet. Chaque paquet transporte au plus ${m$(Pk)} octets de données. Combien de paquets faut-il au minimum ?`, mode: "nombre", prefixe: "Nombre de paquets :", attendu: n,
        erreurs: [{ valeur: Math.ceil(F), message: "Convertis d'abord la taille en octets : $1$ ko $= 1\\,000$ octets." }, { valeur: Math.floor((F * 1000) / Pk), message: "Le dernier paquet, même incomplet, compte aussi." }],
        aides: ["$1$ ko $= 1\\,000$ octets.", `La photo fait $${nb(F)} \\times 1\\,000 = ${nb(F * 1000)}$ octets.`, `Divise par $${nb(Pk)}$ et arrondis au nombre entier **supérieur**.`],
        solution: `$${nb(F * 1000)} \\div ${nb(Pk)} = ${nb((F * 1000) / Pk)}$${Number.isInteger((F * 1000) / Pk) ? "" : ", donc il faut un paquet de plus pour le reste"} : ${pluriel(n, "paquet")}.` };
    }
    const F = rand(3, 90) * 100 + pick([0, rand(1, 99)]), n = Math.ceil(F / P);
    if (t === "nombre") return { enonce: `Un message de ${m$(F)} octets est découpé en paquets. Chaque paquet transporte au plus ${m$(P)} octets de données. Combien de paquets faut-il au minimum ?`, mode: "nombre", prefixe: "Nombre de paquets :", attendu: n,
      erreurs: [{ valeur: Math.floor(F / P), message: "Le dernier paquet, même incomplet, compte aussi : arrondis au nombre entier supérieur." }, { valeur: +(F / P).toFixed(2), message: "On ne peut pas envoyer une partie de paquet : la réponse est un nombre entier." }],
      aides: ["Le message est coupé en morceaux d'au plus " + m$(P) + " octets.", `Calcule $${nb(F)} \\div ${nb(P)}$.`, "Si le résultat n'est pas entier, il faut un paquet de plus pour le reste."],
      solution: `$${nb(F)} \\div ${nb(P)} \\approx ${nb(+(F / P).toFixed(2))}$${Number.isInteger(F / P) ? "" : ` : ${pluriel(Math.floor(F / P), "paquet")} plein${Math.floor(F / P) > 1 ? "s" : ""} et un dernier paquet pour le reste`}. Il faut ${pluriel(n, "paquet")}.` };
    if (t === "total") {
      const H = 40;
      return { enonce: `Un message de ${m$(F)} octets voyage en ${pluriel(n, "paquet")}. Chaque paquet ajoute aux données un en-tête de ${m$(H)} octets ($20$ pour IP, $20$ pour TCP : adresses, numéro du paquet…). Combien d'octets circulent en tout sur le réseau ?`, mode: "nombre", prefixe: "Total :", suffixe: "octets", attendu: F + n * H,
        erreurs: [{ valeur: F + H, message: "Chaque paquet a **son** en-tête : il y en a autant que de paquets." }, { valeur: n * H, message: "Il faut ajouter les données elles-mêmes." }],
        aides: ["Chaque paquet = un en-tête + un morceau des données.", `Les en-têtes pèsent $${n} \\times ${H} = ${nb(n * H)}$ octets.`, `Ajoute les ${m$(F)} octets de données.`],
        solution: `$${nb(F)} + ${n} \\times ${H} = ${nb(F)} + ${nb(n * H)} = ${nb(F + n * H)}$ octets circulent sur le réseau.` };
    }
    const k = rand(1, Math.min(9, n - 1));
    return { enonce: `Un fichier est envoyé en ${pluriel(n, "paquet")}. En route, ${pluriel(k, "paquet")} ${k > 1 ? "sont détruits" : "est détruit"}. Grâce à TCP, chaque paquet manquant est redemandé et renvoyé une fois (et arrive). Combien de paquets l'émetteur a-t-il envoyés en tout ?`, mode: "nombre", prefixe: "Paquets envoyés :", attendu: n + k,
      erreurs: [{ valeur: n, message: "Les paquets perdus ont été envoyés **deux fois**." }, { valeur: n - k, message: "On compte les paquets envoyés, pas ceux arrivés du premier coup." }],
      aides: ["TCP garantit que tout arrive : il redemande les paquets qui manquent.", `Les ${pluriel(k, "paquet")} perdu${k > 1 ? "s" : ""} ${k > 1 ? "sont envoyés" : "est envoyé"} deux fois.`, `Calcule $${n} + ${k}$.`],
      solution: `Premier envoi : ${pluriel(n, "paquet")} ; renvois : ${m$(k)}. Total : $${n} + ${k} = ${n + k}$ paquets envoyés.` };
  });

  /* ---------- Rôles des protocoles ---------- */
  const PROTOS = ["IP", "TCP", "DNS", "HTTP", "HTTPS", "NTP"];
  const ROLES = [
    ["donne à chaque appareil connecté une adresse numérique, comme `192.168.1.20`", "IP"],
    ["inscrit dans chaque paquet l'adresse de l'émetteur et celle du destinataire", "IP"],
    ["fait avancer les paquets de routeur en routeur jusqu'au destinataire", "IP"],
    ["permet à des réseaux physiques très différents (4G, Wi-Fi, fibre…) de former un seul réseau", "IP"],
    ["achemine les paquets sans garantir qu'ils arrivent, ni dans quel ordre", "IP"],
    ["contient la durée de vie (TTL) qui fait détruire un paquet après trop de routeurs", "IP"],
    ["existe en version 4 (adresses de 4 octets) et en version 6 (adresses de 16 octets)", "IP"],
    ["sert aux routeurs pour choisir vers quel voisin envoyer chaque paquet", "IP"],
    ["découpe le message en paquets numérotés au départ", "TCP"],
    ["remet les paquets dans le bon ordre à l'arrivée", "TCP"],
    ["envoie un accusé de réception quand un paquet est bien arrivé", "TCP"],
    ["redemande les paquets perdus", "TCP"],
    ["établit une connexion entre deux ordinateurs avant d'échanger les données", "TCP"],
    ["ralentit les envois quand le réseau est encombré", "TCP"],
    ["garantit que le message arrive complet, sauf panne matérielle", "TCP"],
    ["numérote les données envoyées pour que le destinataire sache ce qui manque", "TCP"],
    ["traduit un nom comme `www.wikipedia.org` en adresse IP", "DNS"],
    ["joue le rôle d'annuaire d'Internet", "DNS"],
    ["est réparti sur des milliers de serveurs organisés en arbre (racine, `.fr`, …)", "DNS"],
    ["retrouve le nom de domaine associé à une adresse IP", "DNS"],
    ["est interrogé avant de contacter un site dont on ne connaît que le nom", "DNS"],
    ["évite aux internautes de retenir des adresses numériques", "DNS"],
    ["permet au navigateur de demander une page Web au serveur, **sans chiffrement**", "HTTP", ["HTTPS"]],
    ["est utilisé quand on clique sur un lien qui commence par `http://`", "HTTP", ["HTTPS"]],
    ["chiffre les échanges entre le navigateur et le serveur Web", "HTTPS"],
    ["est signalé par un cadenas dans la barre d'adresse du navigateur", "HTTPS"],
    ["est indispensable pour envoyer un mot de passe sans qu'il soit lisible en route", "HTTPS"],
    ["vérifie, grâce à un certificat, que le site est bien celui qu'il prétend être", "HTTPS"],
    ["synchronise l'heure des ordinateurs et des objets connectés", "NTP"],
    ["permet à un téléphone de se mettre à l'heure tout seul", "NTP"],
    ["donne à des serveurs du monde entier la même heure, à quelques millisecondes près", "NTP"]
  ];
  def("si-protocoles", () => {
    const [r, p, sauf] = pick(ROLES);
    const c = choix4(p, shuffle(PROTOS.filter((x) => x !== p && !(sauf || []).includes(x))));
    const AID = { IP: "Il s'agit d'**adresses** ou d'**acheminement** des paquets.", TCP: "Il s'agit de **fiabilité** : ordre, pertes, accusés de réception.", DNS: "Il s'agit de **noms** de domaine.", HTTP: "Il s'agit de pages **Web**, sans sécurité particulière.", HTTPS: "Il s'agit de **sécurité** sur le Web.", NTP: "Il s'agit de l'**heure**." };
    return { enonce: `Quel protocole ${r} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["IP : adresses et acheminement ; TCP : fiabilité ; DNS : noms ↔ adresses ; HTTP et HTTPS : pages Web ; NTP : heure.", AID[p], "Élimine d'abord les protocoles qui n'ont rien à voir."],
      solution: `C'est **${p}** : il ${r}. ${{ IP: "IP (Internet Protocol) s'occupe des adresses et de l'acheminement des paquets.", TCP: "TCP (Transmission Control Protocol) fiabilise la communication : numéros, accusés de réception, renvois, remise en ordre.", DNS: "Le DNS (Domain Name System) fait correspondre noms de domaine et adresses IP.", HTTP: "HTTP (Hypertext Transfer Protocol) transporte les pages Web, en clair.", HTTPS: "HTTPS est la version sécurisée de HTTP : les échanges sont chiffrés et le site est authentifié.", NTP: "NTP (Network Time Protocol) synchronise les horloges des appareils connectés." }[p]}` };
  });

  /* ---------- Remettre les paquets dans l'ordre ---------- */
  const PHRASES = ["Le lagon de Mayotte est un des plus grands du monde", "Les tortues viennent pondre sur la plage de Moya", "Rendez-vous devant le CDI à dix heures", "Le cours de SNT commence par Internet", "Les routeurs se passent les paquets de proche en proche", "Le baobab est un arbre qui peut vivre très longtemps", "N'oublie pas ton cahier pour la séance de demain", "Les dauphins nagent souvent près de la barrière de corail", "Le Web est une application qui utilise Internet", "Chaque paquet porte l'adresse de son destinataire", "La marée basse découvre les platiers du lagon", "Le serveur DNS traduit les noms en adresses", "Le match de handball est reporté à samedi", "Une adresse IPv4 est formée de quatre octets"];
  function decoupe(ph) {
    const m = ph.split(" "), n = Math.min(m.length, rand(4, 6)), P = [];
    let k = 0;
    for (let i = 0; i < n; i++) { const r = Math.round(((i + 1) * m.length) / n); P.push(m.slice(k, r).join(" ")); k = r; }
    return P;
  }
  def("si-reordonner", () => {
    const ph = pick(PHRASES), P = decoupe(ph), n = P.length, ordre = shuffle(P.map((_, k) => k));
    if (ordre.every((v, k) => v === k)) ordre.reverse();
    if (pick([true, true, false])) {
      const fig = tableHTML([["Ordre d'arrivée", "N° TCP", "Données"]].concat(ordre.map((k, j) => [String(j + 1), String(k + 1), P[k]])));
      const arrivee = ordre.map((k) => P[k]).join(" "), envers = P.slice().reverse().join(" ");
      const ech = P.slice(); const e = rand(0, n - 2); [ech[e], ech[e + 1]] = [ech[e + 1], ech[e]];
      const c = choix4(`« ${ph} »`, [`« ${arrivee} »`, `« ${envers} »`, `« ${ech.join(" ")} »`], () => { const s = shuffle(P.slice()).join(" "); return `« ${s} »`; });
      return { enonce: "Un message est arrivé en paquets, dans le désordre. Quel message TCP reconstitue-t-il ?", figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Les paquets ne prennent pas tous le même chemin : ils peuvent arriver dans n'importe quel ordre.", "TCP ne tient pas compte de l'ordre d'arrivée : il range les paquets selon leur **numéro**.", `Commence par le paquet n° $1$ : « ${P[0]} ».`],
        solution: `En rangeant les paquets par numéro (${P.map((p, k) => `$${k + 1}$ : « ${p} »`).join(", ")}), on obtient « ${ph} ».` };
    }
    const manque = rand(0, n - 1), recus = ordre.filter((k) => k !== manque);
    const fig = tableHTML([["N° TCP", "Données"]].concat(recus.map((k) => [String(k + 1), P[k]])));
    return { enonce: `Un message découpé en ${pluriel(n, "paquet")} numérotés de $1$ à $${n}$ arrive ainsi (dans l'ordre d'arrivée). Quel numéro de paquet TCP doit-il redemander ?`, figure: fig, mode: "nombre", prefixe: "Paquet n°", attendu: manque + 1,
      erreurs: [{ valeur: n + 1, message: "Il n'y a que " + n + " paquets : cherche le numéro qui manque entre $1$ et $" + n + "$." }],
      aides: ["Chaque paquet porte un numéro : TCP voit tout de suite s'il en manque un.", `Fais la liste des numéros reçus et compare avec $1$, $2$, …, $${n}$.`, `Les numéros reçus sont $${recus.map((k) => k + 1).sort((a, b) => a - b).join("$, $")}$.`],
      solution: `Il manque le paquet n° ${m$(manque + 1)} (« ${P[manque]} ») : TCP le redemande, puis remet le message dans l'ordre.` };
  });

  /* ---------- Routage ---------- */
  const PLANS = [
    { pos: [[35, 100], [115, 38], [115, 162], [205, 38], [205, 162], [285, 100]], liens: [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 5], [1, 4], [2, 3]], croise: [[8, 9]] },
    { pos: [[30, 60], [30, 150], [110, 28], [110, 105], [110, 180], [205, 60], [205, 150], [290, 105]], liens: [[0, 1], [0, 2], [0, 3], [1, 3], [1, 4], [2, 3], [3, 4], [2, 5], [3, 5], [3, 6], [4, 6], [5, 6], [5, 7], [6, 7]], croise: [] },
    { pos: [[35, 50], [35, 150], [130, 50], [130, 150], [225, 50], [225, 150], [295, 100]], liens: [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5], [4, 6], [5, 6], [0, 3], [2, 5]], croise: [[9, 10]] }
  ];
  function reseauAlea() {
    for (let essai = 0; essai < 200; essai++) {
      const P = pick(PLANS), n = P.pos.length;
      let idx = shuffle(P.liens.map((_, k) => k)).slice(0, rand(n + 1, Math.min(P.liens.length, n + 3)));
      if (P.croise.some(([a, b]) => idx.includes(a) && idx.includes(b))) continue;
      const noms = shuffle(P.pos.map((_, k) => "R" + (k + 1)));
      const L = idx.map((k) => [noms[P.liens[k][0]], noms[P.liens[k][1]]]);
      const { D } = distances(noms, L, noms[0]);
      if (Object.keys(D).length < n) continue;
      return { noms, L, noeuds: P.pos.map((p, k) => ({ id: noms[k], x: p[0], y: p[1] })) };
    }
    throw new Error("réseau introuvable");
  }
  def("si-routage", () => {
    for (let essai = 0; essai < 200; essai++) {
      const R = reseauAlea(), t = pick(["sauts", "panne", "panne", "voisin"]);
      const [s, d] = shuffle(R.noms.slice());
      const { D, V } = distances(R.noms, R.L, s);
      if (D[d] < 2) continue;
      const ch = unChemin(V, D, s, d);
      const aides0 = ["Une liaison est un trait entre deux routeurs : le paquet saute de routeur en routeur.", `Pars de ${s} : ses voisins sont à $1$ liaison, les voisins de ses voisins à $2$ liaisons, etc.`];
      if (t === "sauts") {
        const fig = reseauSVG(R.noeuds.map((x) => Object.assign({}, x, { marque: x.id === s || x.id === d })), R.L, { aria: `Réseau de routeurs ; il faut aller de ${s} à ${d}` });
        return { enonce: `Un paquet doit aller du routeur ${s} au routeur ${d}. Combien de liaisons emprunte-t-il **au minimum** ?`, figure: fig, mode: "nombre", prefixe: "Nombre de liaisons :", attendu: D[d],
          erreurs: [{ valeur: D[d] - 1, message: "Tu as compté les routeurs intermédiaires ; on demande le nombre de liaisons (de traits)." }, { valeur: D[d] + 1, message: "Il existe un chemin plus court." }],
          aides: [aides0[0], aides0[1], `Voisins de ${s} : ${V[s].slice().sort().join(", ")}.`],
          solution: `Un plus court chemin est ${ch.join(" → ")} : ${pluriel(D[d], "liaison")}. Aucun chemin n'est plus court.` };
      }
      if (t === "panne") {
        const cand = ch.slice(1, -1).filter((z) => { const r = distances(R.noms, R.L, s, [z]).D; return d in r; });
        if (!cand.length) continue;
        const z = pick(cand), r = distances(R.noms, R.L, s, [z]), ch2 = unChemin(r.V, r.D, s, d);
        const fig = reseauSVG(R.noeuds.map((x) => Object.assign({}, x, { marque: x.id === s || x.id === d, panne: x.id === z })), R.L, { aria: `Réseau de routeurs ; ${z} est en panne ; il faut aller de ${s} à ${d}` });
        return { enonce: `Le routeur ${z} tombe en panne (croix rouge). Les routeurs voisins s'en aperçoivent et mettent à jour leurs tables. Combien de liaisons faut-il **au minimum** maintenant pour aller de ${s} à ${d} ?`, figure: fig, mode: "nombre", prefixe: "Nombre de liaisons :", attendu: r.D[d],
          erreurs: r.D[d] !== D[d] ? [{ valeur: D[d], message: `C'était le chemin le plus court avant la panne, mais il passait par ${z}.` }, { valeur: r.D[d] - 1, message: "On compte les liaisons, pas les routeurs intermédiaires." }] : [{ valeur: r.D[d] - 1, message: "On compte les liaisons, pas les routeurs intermédiaires." }],
          aides: [`Fais comme si ${z} et toutes ses liaisons avaient disparu.`, aides0[1], "Il n'y a pas de carte globale : les routeurs s'adaptent de proche en proche quand un voisin disparaît."],
          solution: `Sans ${z}, un plus court chemin est ${ch2.join(" → ")} : ${pluriel(r.D[d], "liaison")}${r.D[d] > D[d] ? ` (au lieu de ${m$(D[d])} avant la panne)` : ""}. Le réseau continue de fonctionner : c'est l'intérêt d'avoir plusieurs chemins.` };
      }
      const prochains = V[s].filter((v) => distances(R.noms, R.L, v).D[d] === D[d] - 1);
      if (prochains.length !== 1) continue;
      const c = choix4(prochains[0], shuffle(V[s].filter((v) => v !== prochains[0])).concat(shuffle(R.noms.filter((v) => v !== s && v !== prochains[0] && !V[s].includes(v)))));
      const fig = reseauSVG(R.noeuds.map((x) => Object.assign({}, x, { marque: x.id === s || x.id === d })), R.L, { aria: `Réseau de routeurs ; ${s} doit envoyer un paquet vers ${d}` });
      return { enonce: `Le routeur ${s} reçoit un paquet destiné à ${d}. Il l'envoie par un plus court chemin. À quel routeur le transmet-il ?`, figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Un routeur ne peut transmettre un paquet qu'à un routeur **voisin** (relié par un trait).", `Voisins de ${s} : ${V[s].slice().sort().join(", ")}.`, `Pour chaque voisin, compte les liaisons qui le séparent de ${d}.`],
        solution: `Le plus court chemin est ${ch.join(" → ")} : ${s} transmet le paquet à ${prochains[0]}. C'est ce qu'indique sa table de routage pour la destination ${d}.` };
    }
    throw new Error("si-routage");
  });

  /* ---------- Durée de vie (TTL) ---------- */
  def("si-ttl", () => {
    const t = pick(["reste", "detruit", "minimum"]);
    const regle = "Dans chaque paquet, IP écrit une durée de vie, le TTL (Time To Live). Chaque routeur retire $1$ au TTL ; si le TTL atteint $0$, le routeur détruit le paquet.";
    const A = ["Le TTL évite qu'un paquet perdu tourne en rond indéfiniment et encombre le réseau.", "Chaque routeur traversé fait baisser le TTL de $1$."];
    if (t === "reste") {
      const T = pick([64, 128, rand(10, 40)]), n = rand(3, Math.min(30, T - 2));
      return { enonce: `${regle}\n\nUn paquet part avec un TTL de ${m$(T)}. Il traverse ${m$(n)} routeurs avant d'arriver. Quel est son TTL à l'arrivée ?`, mode: "nombre", prefixe: "TTL :", attendu: T - n,
        erreurs: [{ valeur: T + n, message: "Le TTL diminue à chaque routeur." }, { valeur: T, message: "Chaque routeur retire $1$ au TTL." }],
        aides: [A[0], A[1], `Calcule $${T} - ${n}$.`], solution: `$${T} - ${n} = ${T - n}$ : le paquet arrive avec un TTL de ${m$(T - n)}.` };
    }
    if (t === "detruit") {
      const T = rand(4, 15), n = T + rand(2, 8);
      return { enonce: `${regle}\n\nUn paquet part avec un TTL de ${m$(T)}. Le chemin jusqu'au destinataire passe par ${m$(n)} routeurs, numérotés dans l'ordre. Quel routeur détruit le paquet ?`, mode: "nombre", prefixe: "Routeur n°", attendu: T,
        erreurs: [{ valeur: T + 1, message: "Le routeur qui fait passer le TTL à $0$ détruit le paquet : il ne le transmet pas." }, { valeur: T - 1, message: "Après le routeur n° $" + (T - 1) + "$, le TTL vaut encore $1$ : le paquet continue." }, { valeur: n, message: "Le paquet est détruit avant la fin du chemin." }],
        aides: [A[1], `Après le routeur n° $1$, le TTL vaut $${T - 1}$ ; après le n° $2$, il vaut $${T - 2}$…`, "Cherche le routeur après lequel le TTL vaut $0$."],
        solution: `Après le routeur n° $k$, le TTL vaut $${T} - k$. Il atteint $0$ au routeur n° ${m$(T)}, qui détruit le paquet : il n'arrivera jamais, et TCP devra le redemander.` };
    }
    const n = rand(3, 40);
    return { enonce: `${regle}\n\nLe chemin le plus court vers un serveur passe par ${m$(n)} routeurs. Quel TTL de départ faut-il **au minimum** pour que le paquet arrive ?`, mode: "nombre", prefixe: "TTL :", attendu: n + 1,
      erreurs: [{ valeur: n, message: `Avec un TTL de $${n}$, le dernier routeur ferait passer le TTL à $0$ et détruirait le paquet.` }, { valeur: n - 1, message: "Le TTL doit rester au moins égal à $1$ après le dernier routeur." }],
      aides: [A[1], `Après les ${m$(n)} routeurs, le TTL vaut « TTL de départ $- ${n}$ ».`, "Ce TTL restant doit valoir au moins $1$."],
      solution: `Il faut TTL $- ${n} \\geqslant 1$, donc un TTL de départ d'au moins ${m$(n + 1)}.` };
  });

  /* ---------- Débits et temps de téléchargement ---------- */
  def("si-debit", () => {
    const t = pick(["temps", "temps", "minutes", "debit"]);
    const A = ["Les débits sont en **bits** par seconde, les fichiers en **octets** : $1$ octet $= 8$ bits.", "Temps $=$ quantité de données $\\div$ débit (les deux dans la même unité)."];
    if (t === "debit") {
      const T = pick([2, 4, 5, 8, 10, 16, 20, 25, 40]), D = pick([2, 4, 5, 10, 20, 25, 40, 50, 100]), F = (D * T) / 8;
      if (!Number.isInteger(F * 10)) return null;
      return { enonce: `On veut télécharger un fichier de ${m$(F)} Mo en ${m$(T)} secondes. Quel débit faut-il, en Mbit/s ?`, mode: "nombre", prefixe: "Débit :", suffixe: "Mbit/s", attendu: D,
        erreurs: [{ valeur: F / T, message: "Convertis d'abord les mégaoctets en mégabits (× 8)." }, { valeur: F * 8 * T, message: "Débit $=$ quantité $\\div$ temps." }],
        aides: [A[0], `Le fichier fait $${nb(F)} \\times 8 = ${nb(F * 8)}$ Mbit.`, `Débit $=$ quantité $\\div$ temps $= ${nb(F * 8)} \\div ${T}$.`],
        solution: `$${nb(F)}$ Mo $= ${nb(F * 8)}$ Mbit et $${nb(F * 8)} \\div ${T} = ${nb(D)}$ : il faut un débit de ${m$(D)} Mbit/s.` };
    }
    const R = pick([["l'ADSL", 8], ["la 4G", 40], ["la fibre optique", 500], ["le Wi-Fi de la maison", 100], ["la 3G", 4], ["la 5G", 200], ["une connexion par satellite", 50]]);
    if (t === "minutes") {
      const Go = pick([1, 2, 3, 4, 5, 8, 10]), s = (Go * 8000) / R[1], mn = Math.round(s / 60);
      if (mn < 1) return null;
      return { enonce: `Un jeu vidéo de ${m$(Go)} Go est téléchargé avec ${R[0]}, dont le débit réel est de ${m$(R[1])} Mbit/s. Combien de **minutes** cela dure-t-il ? Arrondis à la minute.`, mode: "nombre", prefixe: "Durée :", suffixe: "min", attendu: mn,
        erreurs: [{ valeur: Math.round(s), message: "Tu as trouvé des secondes : divise par $60$." }, { valeur: Math.round(s / 8 / 60), message: "N'oublie pas le facteur $8$ entre octets et bits." }],
        aides: [A[0], `$${Go}$ Go $= ${nb(Go * 1000)}$ Mo $= ${nb(Go * 8000)}$ Mbit. Divise par le débit.`, "Tu obtiens des secondes : divise par $60$ et arrondis."],
        solution: `$${nb(Go * 8000)} \\div ${R[1]} = ${nb(+s.toFixed(1))}$ s, soit environ $${nb(+s.toFixed(1))} \\div 60 \\approx ${nb(+(s / 60).toFixed(2))}$ min : arrondi à la minute, ${m$(mn)} min.` };
    }
    const F = pick([rand(2, 9) * 5, rand(10, 300), rand(3, 20) * 50]), s = (F * 8) / R[1], att = Math.round(s);
    if (att < 1) return null;
    return { enonce: `Avec ${R[0]}, dont le débit réel est de ${m$(R[1])} Mbit/s, combien de secondes faut-il pour télécharger un fichier de ${m$(F)} Mo ? Arrondis à la seconde.`, mode: "nombre", prefixe: "Durée :", suffixe: "s", attendu: att,
      erreurs: [{ valeur: Math.round(F / R[1]), message: "Convertis d'abord les mégaoctets en mégabits (× 8)." }, { valeur: Math.round((F * R[1]) / 8), message: "Temps $=$ quantité $\\div$ débit." }].filter((e) => e.valeur !== att),
      aides: [A[0], `Le fichier fait $${nb(F)} \\times 8 = ${nb(F * 8)}$ Mbit.`, `Calcule $${nb(F * 8)} \\div ${R[1]}$ puis arrondis à l'unité.`],
      solution: `$${nb(F)}$ Mo $= ${nb(F * 8)}$ Mbit, et $${nb(F * 8)} \\div ${R[1]} ${Number.isInteger(s) ? "=" : "\\approx"} ${nb(+s.toFixed(2))}$ : il faut environ ${m$(att)} s.` };
  });

  /* ---------- Réseaux physiques ---------- */
  // [nom, filaire, débit typique en Mbit/s, texte du débit, ancien]
  const RESEAUX = [
    ["le modem sur ligne téléphonique (RTC)", true, 0.056, "56 kbit/s", true],
    ["le Minitel", true, 0.0012, "1,2 kbit/s", true],
    ["l'ADSL", true, 10, "≈ 10 Mbit/s", false],
    ["la fibre optique jusqu'à la maison", true, 1000, "≈ 1 Gbit/s", false],
    ["le câble Ethernet", true, 1000, "≈ 1 Gbit/s", false],
    ["un câble sous-marin en fibre optique", true, 1e7, "dizaines de Tbit/s", false],
    ["la 3G", false, 5, "≈ 5 Mbit/s", false],
    ["la 4G", false, 50, "≈ 50 Mbit/s", false],
    ["la 5G", false, 400, "≈ 400 Mbit/s", false],
    ["le Wi-Fi", false, 300, "≈ 300 Mbit/s", false],
    ["le Bluetooth", false, 2, "≈ 2 Mbit/s", false],
    ["Internet par satellite", false, 100, "≈ 100 Mbit/s", false]
  ];
  def("si-reseaux", () => {
    const t = pick(["sans-fil", "filaire", "rapide", "lent", "ancien"]);
    const nom = (r) => r[0][0].toUpperCase() + r[0].slice(1);
    let bon, faux;
    if (t === "sans-fil" || t === "filaire") {
      const veut = t === "filaire";
      bon = pick(RESEAUX.filter((r) => r[1] === veut)); faux = shuffle(RESEAUX.filter((r) => r[1] !== veut)).slice(0, 3);
    } else if (t === "ancien") {
      bon = pick(RESEAUX.filter((r) => r[4])); faux = shuffle(RESEAUX.filter((r) => !r[4] && r[2] >= 10)).slice(0, 3);
    } else {
      let L;
      do { L = shuffle(RESEAUX.slice()).slice(0, 4).sort((a, b) => b[2] - a[2]); } while ((t === "rapide" ? L[0][2] / L[1][2] : L[2][2] / L[3][2]) < 3);
      bon = t === "rapide" ? L[0] : L[3]; faux = L.filter((r) => r !== bon);
    }
    const c = choix4(nom(bon), faux.map(nom));
    const Q = { "sans-fil": "Lequel de ces réseaux est **sans fil** ?", filaire: "Lequel de ces réseaux est **filaire** ?", rapide: "Lequel de ces réseaux a le **plus grand débit** ?", lent: "Lequel de ces réseaux a le **plus petit débit** ?", ancien: "Lequel de ces réseaux est **obsolète** (presque plus utilisé) ?" }[t];
    return { enonce: Q, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Internet n'est pas un câble : c'est un ensemble de protocoles qui fonctionne sur toutes sortes de réseaux physiques.", t === "sans-fil" || t === "filaire" ? "Filaire : les données passent dans un câble (cuivre ou fibre). Sans fil : par ondes radio." : t === "ancien" ? "Pense aux réseaux d'avant les années 2000." : "Ordres de grandeur : kbit/s (très lent), Mbit/s, Gbit/s (fibre), Tbit/s (câbles sous-marins).", "Élimine ceux que tu reconnais avec certitude."],
      solution: `**${nom(bon)}** (${bon[1] ? "filaire" : "sans fil"}, ${bon[3]}${bon[4] ? ", obsolète" : ""}). Les autres : ${faux.map((r) => `${r[0]} (${r[1] ? "filaire" : "sans fil"}, ${r[3]})`).join(" ; ")}.` };
  });

  /* ---------- Repères historiques ---------- */
  const HISTOIRE_I = [["ArpaNet relie ses premiers ordinateurs aux États-Unis", 1969], ["le réseau français Cyclades est lancé", 1971], ["le Minitel se répand en France", 1982], ["ArpaNet adopte TCP/IP : c'est la naissance d'Internet", 1983], ["le domaine `.fr` est créé", 1986], ["Tim Berners-Lee invente le Web au CERN", 1989], ["la première norme Wi-Fi est publiée", 1997], ["le premier iPhone met Internet dans la poche", 2007], ["la 4G arrive en France", 2012], ["la 5G arrive en France", 2020]];
  def("si-histoire", () => {
    const t = pick(["ancien", "recent", "annee", "annee"]);
    const E = shuffle(HISTOIRE_I.slice()).slice(0, 4), maj = (s) => s[0].toUpperCase() + s.slice(1);
    if (t === "annee") {
      const e = E[0], c = choix4(String(e[1]), E.slice(1).map((x) => String(x[1])), (k) => String(e[1] + pick([-12, -6, 6, 12, -3, 3])));
      return { enonce: `En quelle année ${e[0]} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Ordre des grandes étapes : ArpaNet, Cyclades, TCP/IP (naissance d'Internet), Web, Wi-Fi, smartphones, 4G, 5G.", e[1] < 1990 ? "C'est avant la naissance du Web (1989)… ou juste à ce moment-là." : "C'est après la naissance du Web (1989).", "Élimine les années qui correspondent à d'autres événements que tu connais."],
        solution: `${maj(e[0])} en **${e[1]}**.` };
    }
    const tri = E.slice().sort((a, b) => a[1] - b[1]), bon = t === "ancien" ? tri[0] : tri[3];
    const c = choix4(maj(bon[0]), E.filter((x) => x !== bon).map((x) => maj(x[0])));
    return { enonce: `Lequel de ces événements est le plus ${t === "ancien" ? "**ancien**" : "**récent**"} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Internet est né en 1983 ; le Web en 1989.", "Les réseaux mobiles (4G, 5G) et les smartphones sont les plus récents.", "Essaie de placer chaque événement avant ou après 1983."],
      solution: `Dans l'ordre : ${tri.map((x) => `${x[0]} (${x[1]})`).join(" ; ")}. Le plus ${t === "ancien" ? "ancien" : "récent"} : ${bon[0]}.` };
  });

  /* ---------- Vrai ou faux : Internet ---------- */
  const VF_INTERNET = [
    ["Internet est un réseau de réseaux.", true, "Internet relie entre eux des millions de réseaux (domestiques, d'entreprises, d'opérateurs) grâce au protocole IP."],
    ["Les protocoles d'Internet sont des logiciels : ils fonctionnent sur n'importe quel réseau physique.", true, "IP et TCP sont installés dans les machines connectées, et marchent aussi bien sur la 4G que sur le Wi-Fi ou la fibre."],
    ["Un serveur DNS est lui-même un ordinateur connecté à Internet.", true, "Le DNS est réalisé par un très grand nombre d'ordinateurs répartis sur le réseau."],
    ["Dans un réseau pair-à-pair, chaque ordinateur est à la fois émetteur et récepteur.", true, "Chaque « pair » envoie et reçoit des morceaux de fichiers."],
    ["La neutralité du Net veut que les routeurs transmettent tous les paquets de la même façon, quel que soit leur contenu.", true, "C'est un principe présent dès l'origine d'Internet."],
    ["Deux paquets d'un même message peuvent prendre des chemins différents.", true, "Chaque routeur choisit selon sa table au moment où le paquet arrive."],
    ["Une attaque par déni de service envoie énormément de messages à un site pour le saturer.", true, "Le site ne peut plus répondre aux vrais visiteurs."],
    ["Le téléphone fixe passe de plus en plus par Internet (voix sur IP).", true, "C'est la VoIP : la voix est découpée en paquets."],
    ["Il n'existe pas de carte complète d'Internet : chaque routeur ne connaît que son voisinage.", true, "Les routeurs échangent avec leurs voisins et construisent une carte locale."],
    ["Le pair-à-pair n'est pas interdit : c'est le partage d'œuvres sans autorisation qui est illégal.", true, "Le pair-à-pair sert aussi à distribuer légalement des logiciels libres ou des mises à jour."],
    ["Ni IP ni TCP ne garantissent le délai d'arrivée des paquets.", true, "C'est pourquoi une vidéo en direct ou un appel en visio peut saccader."],
    ["Une adresse IPv4 est formée de 4 octets.", true, "Quatre nombres de $0$ à $255$, comme `192.168.1.20`."],
    ["Internet et le Web sont deux noms pour la même chose.", false, "Internet est le réseau ; le Web est une application qui l'utilise, comme le courriel ou les jeux en ligne."],
    ["Un routeur connaît le chemin complet de chaque paquet jusqu'à sa destination.", false, "Il ne connaît que le prochain routeur vers lequel envoyer le paquet."],
    ["Les paquets d'un message arrivent toujours dans l'ordre où ils sont partis.", false, "Ils peuvent arriver dans le désordre : TCP les remet dans l'ordre grâce à leurs numéros."],
    ["Grâce à TCP, une vidéo en direct ne peut jamais saccader.", false, "TCP garantit que les paquets arrivent, mais pas quand ils arrivent."],
    ["Le pair-à-pair est interdit en France.", false, "La technique est légale ; ce sont certains usages (partage d'œuvres protégées sans autorisation) qui sont illicites."],
    ["Une adresse IP s'écrit avec des lettres, comme `www.exemple.fr`.", false, "`www.exemple.fr` est une adresse symbolique (un nom de domaine) ; l'adresse IP est numérique."],
    ["Un seul grand ordinateur, aux États-Unis, assure tout le service DNS.", false, "Le DNS est réparti sur un très grand nombre de serveurs, dans le monde entier."],
    ["Internet est né en 1989 au CERN.", false, "C'est le Web qui est né au CERN en 1989 ; Internet date de 1983 (adoption de TCP/IP)."],
    ["Le Wi-Fi est un réseau filaire.", false, "Le Wi-Fi transmet les données par ondes radio : c'est un réseau sans fil."],
    ["Un paquet qui a traversé trop de routeurs continue sa route indéfiniment.", false, "Chaque paquet a une durée de vie (TTL) : il est détruit quand elle tombe à $0$."],
    ["Internet ne fonctionne qu'avec la fibre optique.", false, "Il fonctionne sur toutes sortes de réseaux : 4G, Wi-Fi, ADSL, Ethernet, satellite…"],
    ["Les paquets d'une vidéo n'ont pas le même format que ceux d'un texte.", false, "Les paquets sont les mêmes quel que soit le type de données transportées."]
  ];
  def("si-vrai-faux", () => vraiFaux4(VF_INTERNET, ["Relis chaque affirmation lentement : un seul mot (« toujours », « jamais », « seul ») peut la rendre fausse.", "Internet = le réseau (IP, TCP, routeurs, DNS) ; le Web = les pages et les liens, une application d'Internet.", "Élimine les affirmations dont tu es sûr, puis compare les deux dernières."]));

  /* =====================================================================
     CHAPITRE 2 : LE WEB (sw-)
     ===================================================================== */

  /* ---------- Adresses de pages (URL) fictives ---------- */
  const SITES = ["lagon-bleu", "cours-en-ligne", "journal-du-lycee", "recettes-du-monde", "planetes-et-etoiles", "musee-imaginaire", "club-de-volley", "baobab-info", "jeux-de-logique", "bibliotheque-ouverte", "tortues-du-lagon", "marche-aux-epices"];
  const DOSSIERS = ["articles", "sport", "2026", "eleves", "cours", "snt", "images", "recettes", "actualites", "seconde", "videos", "agenda"];
  const FICHIERS = ["index.html", "page.html", "accueil.html", "contact.php", "resultats.php", "article.html", "fiche.html", "recherche.php", "galerie.html"];
  const PARAMS = [["q", "tortue"], ["page", "3"], ["id", "42"], ["lang", "fr"], ["tri", "date"], ["classe", "2nde4"], ["ville", "Sada"], ["n", "12"], ["theme", "sombre"]];
  function urlAlea(o = {}) {
    const u = { proto: o.proto || pick(["https", "https", "https", "http"]), sous: pick(["www.", "www.", "", "fr.", "blog.", "m."]), site: pick(SITES), tld: pick([".fr", ".yt", ".org", ".com"]) };
    u.hote = u.sous + u.site + u.tld;
    u.dossiers = shuffle(DOSSIERS.slice()).slice(0, o.dossiers !== undefined ? o.dossiers : rand(0, 2));
    u.fichier = o.fichier === false ? "" : pick(FICHIERS);
    u.params = shuffle(PARAMS.slice()).slice(0, o.params !== undefined ? o.params : rand(0, 2));
    u.ancre = o.ancre === false ? "" : pick(["", "", "", "#partie2", "#contact", "#haut"]);
    u.chemin = "/" + u.dossiers.map((d) => d + "/").join("") + u.fichier;
    u.requete = u.params.length ? "?" + u.params.map((p) => p.join("=")).join("&") : "";
    u.texte = `${u.proto}://${u.hote}${u.chemin}${u.requete}${u.ancre}`;
    return u;
  }
  const AIDES_URL = ["Une URL se lit ainsi : `protocole://nom-du-serveur/chemin/fichier?paramètres#ancre`.", "Après `://` vient le nom de domaine du serveur, jusqu'au premier `/`."];
  def("sw-url", () => {
    const u = urlAlea(), t = pick(["proto", "hote", "hote", "chemin", "fichier", "param", "nparams", "tld"]);
    const intro = `On considère l'adresse :\n\n${cd(u.texte)}`;
    const autres = [u.proto, u.hote, u.chemin, u.fichier, u.tld, u.requete, ...u.dossiers, ...u.params.map((p) => p[1])].filter(Boolean).map(cd);
    const q = (bonne, question, aide, sol) => { const c = choix4(cd(bonne), autres.filter((x) => x !== cd(bonne)), (k) => cd(pick([pick(SITES) + pick([".fr", ".org"]), "/" + pick(DOSSIERS) + "/", pick(FICHIERS), pick(["ftp", "www", "html"])]))); return { enonce: `${intro}\n\n${question}`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: [AIDES_URL[0], aide, "Repère les séparateurs : `://`, puis `/`, puis `?` et `&`, puis `#`."], solution: sol }; };
    if (t === "proto") return q(u.proto, "Quel est le **protocole** utilisé ?", "Le protocole est écrit au tout début, avant `://`.", `Le protocole est ${cd(u.proto)}${u.proto === "https" ? " : la version sécurisée (chiffrée) de HTTP" : " : HTTP sans chiffrement, la page n'est pas sécurisée"}.`);
    if (t === "hote") return q(u.hote, "Quel est le **nom de domaine** du serveur ?", AIDES_URL[1], `Le serveur s'appelle ${cd(u.hote)} : c'est ce nom que le DNS traduit en adresse IP.`);
    if (t === "tld") return q(u.tld, "Quel est le **domaine de premier niveau** ?", "C'est la fin du nom du serveur, après le dernier point (avant le premier `/`).", `Le domaine de premier niveau est ${cd(u.tld)}${u.tld === ".yt" ? " (Mayotte)" : u.tld === ".fr" ? " (France)" : ""}.`);
    if (t === "chemin") {
      if (u.chemin === "/" ) return null;
      return q(u.chemin, "Quel est le **chemin** de la ressource sur le serveur ?", "Le chemin commence au premier `/` après le nom du serveur et s'arrête avant `?` ou `#`.", `Le chemin est ${cd(u.chemin)} : ${u.dossiers.length ? `le fichier ${cd(u.fichier)} est rangé dans ${u.dossiers.length > 1 ? "les dossiers" : "le dossier"} ${u.dossiers.map(cd).join(" puis ")}` : `le fichier ${cd(u.fichier)} est à la racine du site`}.`);
    }
    if (t === "fichier") return q(u.fichier, "Quel est le **nom du fichier** demandé ?", "Le fichier est le dernier morceau du chemin, avant `?` ou `#`.", `Le fichier demandé est ${cd(u.fichier)}${/\.php$/.test(u.fichier) ? " : l'extension `.php` indique une page fabriquée par un programme sur le serveur" : ""}.`);
    if (t === "param") {
      if (!u.params.length) return null;
      const p = pick(u.params);
      return q(p[1], `Quelle est la **valeur** du paramètre ${cd(p[0])} ?`, "Les paramètres sont après `?`, sous la forme `nom=valeur`, séparés par `&`.", `On lit ${cd(p.join("="))} : le paramètre ${cd(p[0])} vaut ${cd(p[1])}.`);
    }
    return { enonce: `${intro}\n\nCombien de **paramètres** cette adresse transmet-elle au serveur ?`, mode: "nombre", prefixe: "Nombre de paramètres :", attendu: u.params.length,
      erreurs: [{ valeur: u.params.length + 1, message: "Compte les paires `nom=valeur`, pas les signes `&`." }, { valeur: u.dossiers.length, message: "Les dossiers du chemin ne sont pas des paramètres." }],
      aides: [AIDES_URL[0], "Les paramètres suivent le `?` : chacun s'écrit `nom=valeur`, et ils sont séparés par `&`.", u.params.length ? `Après le \`?\` on lit ${cd(u.requete.slice(1))}.` : "Y a-t-il un `?` dans l'adresse ?"],
      solution: u.params.length ? `Après le \`?\` : ${u.params.map((p) => cd(p.join("="))).join(" et ")}, soit ${pluriel(u.params.length, "paramètre")}.` : "Il n'y a pas de `?` : l'adresse ne transmet **aucun** paramètre ($0$)." };
  });

  /* ---------- Pages sécurisées et hameçonnage ---------- */
  const OFFICIELS = [["l'Assurance maladie", "ameli.fr"], ["les impôts", "impots.gouv.fr"], ["La Poste", "laposte.fr"], ["la Caisse d'allocations familiales", "caf.fr"], ["le ministère de l'Éducation nationale", "education.gouv.fr"], ["l'académie de Mayotte", "ac-mayotte.fr"]];
  const sosie = (d, k) => {
    const [nom, ...fin] = d.split("."), ext = "." + fin.join(".");
    const L = [`www.${d}.verification-compte.com`, `www.${nom}-securite.info`, `${nom}-${fin.join("-")}.net`, `www.${nom.includes("m") ? nom.replace("m", "rn") : nom + "s"}${ext}`, `www.${nom.replace("o", "0").replace("a", "4")}${ext}`, `www.mon-${nom}${ext}.co`, `secure-${nom}.com`, `www.${nom}${ext}-connexion.xyz`];
    return L[k % L.length];
  };
  def("sw-securise", () => {
    const t = pick(["https", "vrai", "vrai", "faux", "lien"]);
    if (t === "https") {
      const b = urlAlea({ proto: "https" }).texte, c = choix4(cd(b), [], () => cd(urlAlea({ proto: "http" }).texte));
      return { enonce: "Laquelle de ces pages est transmise de façon **sécurisée** (échanges chiffrés) ?", mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Une page sécurisée utilise le protocole HTTPS.", "Le protocole est écrit au début de l'adresse, avant `://`.", "Cherche l'adresse qui commence par `https://`."],
        solution: `${cd(b)} commence par \`https://\` : les échanges sont chiffrés (le navigateur affiche un cadenas). Les autres utilisent \`http://\`, en clair.` };
    }
    const [org, d] = pick(OFFICIELS), chemin = pick(["/", "/connexion", "/mon-compte", "/espace-personnel", "/accueil"]);
    const vraie = `https://www.${d}${chemin}`, ks = shuffle([0, 1, 2, 3, 4, 5, 6, 7]);
    if (t === "vrai") {
      const c = choix4(cd(vraie), ks.map((k) => cd(`https://${sosie(d, k)}${chemin}`)));
      return { enonce: `Tu reçois un SMS : « Votre compte ${org} est bloqué, connectez-vous vite ». Avant de cliquer, tu vérifies l'adresse. Laquelle appartient vraiment à ${org} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Le vrai nom de domaine est juste avant le premier `/` : on le lit de droite à gauche.", `Le site officiel est ${cd(d)}.`, "Attention aux sosies : lettres remplacées (`rn` au lieu de `m`, `0` au lieu de `o`), mots ajoutés, autre fin (`.com`, `.net`…)."],
        solution: `Seule ${cd(vraie)} a pour nom de domaine ${cd(d)}. Les autres sont des sosies : c'est de l'**hameçonnage**. De toute façon, un organisme sérieux ne demande pas de se connecter en urgence par SMS : mieux vaut taper soi-même l'adresse.` };
    }
    if (t === "faux") {
      const f = cd(`https://${sosie(d, ks[0])}${chemin}`), c = choix4(f, shuffle(["/", "/connexion", "/aide", "/contact", "/mon-compte"].filter((x) => x !== chemin)).map((x) => cd(`https://www.${d}${x}`)));
      return { enonce: `Trois de ces adresses mènent au site de ${org} (${cd(d)}). Laquelle est un **piège** ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Le vrai nom de domaine est juste avant le premier `/`.", `Le site officiel est ${cd(d)} : son nom doit se terminer exactement ainsi.`, "Compare lettre par lettre."],
        solution: `${f} n'a pas ${cd(d)} pour nom de domaine : c'est un site d'hameçonnage. Les trois autres adresses sont des pages du vrai site.` };
    }
    const faux = `https://${sosie(d, ks[0])}${chemin}`, c = choix4(cd(faux), [cd(vraie), cd(`www.${d}`), cd(d)]);
    return { enonce: `Dans un courriel, on voit le lien suivant :\n\n\`\`\`html\n<a href="${faux}">www.${d}</a>\n\`\`\`\n\nVers quelle adresse ce lien mène-t-il vraiment ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Dans la balise `<a>`, l'adresse de destination est dans l'attribut `href`.", "Le texte entre `<a …>` et `</a>` est seulement ce qui s'affiche : il peut mentir.", "Sur téléphone, un appui long sur un lien montre sa vraie adresse."],
      solution: `Le lien mène à ${cd(faux)} (attribut \`href\`), et non au site affiché ${cd("www." + d)} : c'est un piège d'hameçonnage. Il faut toujours examiner l'adresse avant de cliquer.` };
  });

  /* ---------- Requêtes HTTP ---------- */
  const CODES = [["200", "la page a été trouvée et est envoyée"], ["301", "la page a déménagé définitivement à une autre adresse"], ["401", "il faut s'identifier pour voir la page"], ["403", "l'accès à la page est interdit"], ["404", "la page demandée n'existe pas sur le serveur"], ["500", "le serveur a rencontré une erreur interne"], ["503", "le serveur est momentanément indisponible (surchargé ou en maintenance)"]];
  const AGENTS = [["Mozilla/5.0 (Linux; Android 14) Chrome/126", "un téléphone Android"], ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5) Safari/604", "un iPhone"], ["Mozilla/5.0 (Windows NT 10.0) Firefox/128", "un ordinateur sous Windows"], ["Mozilla/5.0 (Macintosh; Mac OS X 14_5) Safari/605", "un ordinateur Mac"]];
  def("sw-http", () => {
    const t = pick(["methode", "hote", "ressource", "param", "nparams", "agent", "code", "code", "sens"]);
    if (t === "code" || t === "sens") {
      const [k, s] = pick(CODES), autres = CODES.filter((x) => x[0] !== k);
      const c = t === "code" ? choix4(s, shuffle(autres).map((x) => x[1])) : choix4(k, shuffle(autres).map((x) => x[0]));
      return { enonce: t === "code" ? `Le serveur répond à une requête par le code ${cd(k)}. Que signifie-t-il ?` : `Que répond le serveur (code de statut) quand ${s} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Chaque réponse HTTP commence par un code à trois chiffres.", "Codes en $2$ : tout va bien ; en $3$ : redirection ; en $4$ : erreur de la demande (côté client) ; en $5$ : erreur du serveur.", k === "404" ? "C'est le plus connu des codes d'erreur." : `Le code commence par $${k[0]}$.`],
        solution: `Le code ${cd(k)} signifie que ${s}.` };
    }
    const u = urlAlea({ params: t === "param" ? rand(1, 3) : rand(0, 3), ancre: false, fichier: true }), ag = pick(AGENTS), post = t === "methode" && Math.random() < 0.4;
    const ligne1 = post ? `POST ${u.chemin} HTTP/1.1` : `GET ${u.chemin}${u.requete} HTTP/1.1`;
    const req = `\`\`\`http\n${ligne1}\nHost: ${u.hote}\nUser-Agent: ${ag[0]}\nAccept-Language: fr${post ? `\nContent-Type: application/x-www-form-urlencoded\n\n${u.params.map((p) => p.join("=")).join("&") || "nom=Anli&classe=2nde4"}` : ""}\n\`\`\``;
    const intro = `Voici le début d'une requête HTTP envoyée par un navigateur :\n\n${req}`;
    const A = ["La première ligne donne la **méthode** (`GET` ou `POST`), la **ressource** demandée et la version de HTTP.", "Les lignes suivantes sont des en-têtes : `Host` (le serveur), `User-Agent` (le navigateur et l'appareil), `Accept-Language` (la langue)…"];
    const q = (bonne, fausses, question, aide, sol) => { const c = choix4(cd(bonne), fausses.map(cd), (k) => cd(pick([pick(SITES) + ".fr", "/" + pick(FICHIERS), "HTTP/2", "PUT"]))); return { enonce: `${intro}\n\n${question}`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: [A[0], aide, A[1]], solution: sol }; };
    if (t === "methode") return q(post ? "POST" : "GET", ["GET", "POST", "Host", "HTTP/1.1", "200"].filter((x) => x !== (post ? "POST" : "GET")), "Quelle est la **méthode** de cette requête ?", "La méthode est le premier mot de la requête.", post ? "La méthode est `POST` : les paramètres (par exemple ceux d'un formulaire) sont envoyés **après** les en-têtes, et non dans l'adresse." : "La méthode est `GET` : le navigateur demande une ressource, avec ses paramètres éventuels dans l'adresse.");
    if (t === "hote") return q(u.hote, [u.chemin, ag[0].split(" ")[0], "fr", u.fichier], "Quel **serveur** est contacté ?", "Le nom du serveur est dans l'en-tête `Host`.", `L'en-tête \`Host\` indique le serveur : ${cd(u.hote)}.`);
    if (t === "ressource") return q(u.chemin, [u.hote, u.chemin + u.requete === u.chemin ? "/" : u.chemin + u.requete, "HTTP/1.1", u.fichier === "index.html" ? "/" : "/index.html"].filter((x) => x !== u.chemin), "Quelle **ressource** (fichier) est demandée, sans les paramètres ?", "La ressource est juste après la méthode, avant `?` s'il y a des paramètres.", `La ressource demandée est ${cd(u.chemin)}${u.requete ? `, avec les paramètres ${cd(u.requete.slice(1))}` : ""}.`);
    if (t === "param") {
      const p = pick(u.params);
      return q(p[1], u.params.filter((x) => x !== p).map((x) => x[1]).concat([p[0], u.fichier]), `Quelle valeur le paramètre ${cd(p[0])} transmet-il au serveur ?`, "Les paramètres d'une requête `GET` sont après `?` : `nom=valeur`, séparés par `&`.", `On lit ${cd(p.join("="))} : le paramètre ${cd(p[0])} vaut ${cd(p[1])}.`);
    }
    if (t === "agent") {
      const c = choix4(ag[1], AGENTS.filter((x) => x !== ag).map((x) => x[1]));
      return { enonce: `${intro}\n\nSur quel appareil se trouve le navigateur qui envoie cette requête ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: [A[1], "Regarde l'en-tête `User-Agent`.", "On y lit le système : Android, iPhone, Windows ou Mac."],
        solution: `L'en-tête \`User-Agent\` contient ${cd("(" + ag[0].match(/\(([^)]+)\)/)[1] + ")")} : la requête vient d'${ag[1].replace(/^un /, "un ")}. Le serveur reçoit donc des informations sur l'appareil, sans qu'on le lui dise explicitement.` };
    }
    return { enonce: `${intro}\n\nCombien de **paramètres** cette requête transmet-elle dans l'adresse ?`, mode: "nombre", prefixe: "Nombre de paramètres :", attendu: u.params.length,
      erreurs: [{ valeur: u.params.length + 1, message: "Compte les paires `nom=valeur`." }, { valeur: 3, message: "Les en-têtes (`Host`, `User-Agent`…) ne sont pas des paramètres de l'adresse." }].filter((e) => e.valeur !== u.params.length),
      aides: [A[0], "Les paramètres sont après `?` dans la première ligne.", u.params.length ? "Ils sont séparés par `&`." : "Y a-t-il un `?` dans la première ligne ?"],
      solution: u.params.length ? `La première ligne contient ${cd(u.requete)} : ${pluriel(u.params.length, "paramètre")} (${u.params.map((p) => cd(p[0])).join(", ")}).` : "Pas de `?` dans la première ligne : **aucun** paramètre ($0$)." };
  });

  /* ---------- Balises HTML ---------- */
  const BALISES = [["<title>", "le titre affiché dans l'onglet du navigateur"], ["<h1>", "le titre principal de la page"], ["<h2>", "un titre de deuxième niveau (sous-titre)"], ["<p>", "un paragraphe"], ["<a>", "un lien hypertexte"], ["<img>", "une image"], ["<ul>", "une liste à puces"], ["<ol>", "une liste numérotée"], ["<li>", "un élément d'une liste"], ["<strong>", "un texte important (en gras par défaut)"], ["<em>", "un texte mis en valeur (en italique par défaut)"], ["<br>", "un retour à la ligne"], ["<table>", "un tableau"], ["<td>", "une case d'un tableau"], ["<head>", "l'en-tête du document : des informations qui ne s'affichent pas dans la page"], ["<body>", "le corps du document : tout ce qui s'affiche dans la page"], ["<link>", "le lien vers la feuille de style CSS"], ["<script>", "un programme JavaScript"], ["<div>", "un bloc qui regroupe d'autres éléments"], ["<video>", "une vidéo"], ["<form>", "un formulaire"], ["<input>", "une zone de saisie dans un formulaire"]];
  def("sw-balises", () => {
    const [b, r] = pick(BALISES), autres = shuffle(BALISES.filter((x) => x[0] !== b));
    const sens = Math.random() < 0.5;
    const c = sens ? choix4(cd(b), autres.map((x) => cd(x[0]))) : choix4(r, autres.map((x) => x[1]));
    return { enonce: sens ? `Quelle balise HTML sert à écrire ${r} ?` : `À quoi sert la balise ${cd(b)} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Une balise s'ouvre avec `<nom>` et, le plus souvent, se ferme avec `</nom>`.", "Beaucoup de noms de balises viennent de l'anglais : `p` (paragraph), `a` (anchor), `img` (image), `li` (list item)…", "Élimine les balises que tu connais bien."],
      solution: `La balise ${cd(b)} sert à écrire ${r}.` };
  });

  /* ---------- Lire une page HTML ---------- */
  const SUJETS = [["Les tortues marines", "Tortues du lagon", ["tortue verte", "tortue imbriquée", "tortue luth", "tortue caouanne", "tortue olivâtre"], "tortue.jpg"], ["Fruits de Mayotte", "Le marché aux fruits", ["mangue", "fruit à pain", "jacque", "corossol", "litchi", "papaye"], "fruits.jpg"], ["Club de volley du lycée", "Volley : entraînements", ["lundi", "mercredi", "jeudi", "samedi"], "volley.png"], ["Exposé de SNT", "Comment marche Internet ?", ["les paquets", "le routage", "le DNS", "TCP et IP", "les câbles sous-marins"], "reseau.svg"], ["Recette du mataba", "Mataba au coco", ["feuilles de manioc", "lait de coco", "oignon", "ail", "sel"], "mataba.jpg"], ["Les planètes", "Le système solaire", ["Mercure", "Vénus", "la Terre", "Mars", "Jupiter", "Saturne"], "planetes.png"]];
  function pageHTML() {
    const [titre, h1, items, img] = pick(SUJETS), L = shuffle(items.slice()).slice(0, rand(3, items.length));
    const u = urlAlea({ ancre: false, params: rand(0, 1) }), lien = pick(["en savoir plus", "la page suivante", "voir le site", "nos photos", "le programme"]);
    const code = `<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <title>${titre}</title>\n  </head>\n  <body>\n    <h1>${h1}</h1>\n    <p>Pour ${lien === "le programme" ? "lire" : "voir"} <a href="${u.texte}">${lien}</a>, clique.</p>\n    <ul>\n${L.map((x) => `      <li>${x}</li>`).join("\n")}\n    </ul>\n    <img src="${img}" alt="${h1}">\n  </body>\n</html>`;
    return { titre, h1, L, img, u, lien, code };
  }
  def("sw-html-lire", () => {
    const P = pageHTML(), t = pick(["onglet", "titre", "lien", "cliquable", "nombre", "image"]);
    const intro = `Voici le code d'une page Web :\n\n\`\`\`html\n${P.code}\n\`\`\``;
    const textes = [P.titre, P.h1, P.lien, P.L[0], P.img];
    const q = (bonne, question, aide, sol, fausses) => { const c = choix4(bonne, (fausses || textes.filter((x) => x !== bonne)).map((x) => (x === bonne ? null : x))); return { enonce: `${intro}\n\n${question}`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Ce qui est dans `<head>` ne s'affiche pas dans la page ; ce qui est dans `<body>` s'affiche.", aide, "Cherche la balise qui correspond, puis lis ce qu'il y a entre la balise ouvrante et la balise fermante."], solution: sol }; };
    if (t === "onglet") return q(`« ${P.titre} »`, "Quel texte s'affiche dans l'**onglet** du navigateur ?", "Le texte de l'onglet est dans la balise `<title>`.", `L'onglet affiche le contenu de \`<title>\` : « ${P.titre} ». Le titre \`<h1>\` (« ${P.h1} ») s'affiche, lui, dans la page.`, [`« ${P.h1} »`, `« ${P.lien} »`, `« ${P.L[0]} »`]);
    if (t === "titre") return q(`« ${P.h1} »`, "Quel texte s'affiche en **gros titre** en haut de la page ?", "Le titre principal d'une page est dans la balise `<h1>`.", `Le gros titre est le contenu de \`<h1>\` : « ${P.h1} ».`, [`« ${P.titre} »`, `« ${P.lien} »`, `« ${P.L[0]} »`]);
    if (t === "cliquable") return q(`« ${P.lien} »`, "Quel texte est **cliquable** ?", "Un lien s'écrit avec la balise `<a>`.", `Le texte cliquable est entre \`<a …>\` et \`</a>\` : « ${P.lien} ».`, [`« ${P.h1} »`, `« ${P.titre} »`, `« ${P.L[0]} »`]);
    if (t === "image") return q(cd(P.img), "Quel fichier image est affiché ?", "L'image est donnée par l'attribut `src` de la balise `<img>`.", `L'attribut \`src\` de \`<img>\` vaut ${cd(P.img)} ; l'attribut \`alt\` donne le texte affiché si l'image ne se charge pas (et lu par les lecteurs d'écran).`, [cd(P.u.texte), cd("utf-8"), cd(P.h1)]);
    if (t === "lien") {
      const v = urlAlea({ ancre: false }).texte;
      return q(cd(P.u.texte), "Vers quelle adresse mène le lien ?", "L'adresse d'un lien est dans l'attribut `href` de la balise `<a>`.", `L'attribut \`href\` du lien vaut ${cd(P.u.texte)}.`, [cd(P.img), cd(v), cd(P.u.hote)]);
    }
    return { enonce: `${intro}\n\nCombien de lignes compte la liste à puces affichée ?`, mode: "nombre", prefixe: "Nombre d'éléments :", attendu: P.L.length,
      erreurs: [{ valeur: P.L.length + 2, message: "Compte seulement les balises `<li>`, pas `<ul>` et `</ul>`." }, { valeur: 1, message: "Chaque `<li>` est un élément de la liste." }],
      aides: ["Une liste à puces s'écrit avec `<ul>`, et chacun de ses éléments avec `<li>`.", "Compte les balises `<li>` ouvrantes.", "Une balise `<li>` par ligne."], solution: `Il y a ${pluriel(P.L.length, "balise")} \`<li>\` : la liste a ${pluriel(P.L.length, "élément")}.` };
  });

  /* ---------- Repérer une erreur de HTML ---------- */
  const MOTS = ["lagon", "baobab", "volcan", "mangrove", "corail", "dauphin", "ylang", "récif", "îlot", "boutre"];
  def("sw-html-erreur", () => {
    const m = shuffle(MOTS.slice()), u = `https://www.${pick(SITES)}${pick([".fr", ".yt", ".org"])}`, im = pick(["photo.jpg", "plage.png", "carte.svg"]);
    const T = pick([
      [`<p>Le <strong>${m[0]}</strong> est beau.</p>`, [`<p>Le <strong>${m[0]}</p> est beau.</strong>`, `<p>Le <strong>${m[0]} est beau.</p>`, `<p>Le <strong>${m[0]}</strong> est beau.<p>`, `<p Le <strong>${m[0]}</strong> est beau.</p>`, `<p>Le <strong>${m[0]}<strong> est beau.</p>`]],
      [`<a href="${u}">${m[1]}</a>`, [`<a href=${u}">${m[1]}</a>`, `<a href="${u}">${m[1]}<a>`, `<a "${u}">${m[1]}</a>`, `<a href="${u}">${m[1]}</p>`, `<a href="${u}"${m[1]}</a>`]],
      [`<ul><li>${m[2]}</li><li>${m[3]}</li></ul>`, [`<ul><li>${m[2]}<li>${m[3]}</ul></li>`, `<ul><li>${m[2]}</li><li>${m[3]}</li><ul>`, `<li><ul>${m[2]}</ul><ul>${m[3]}</ul></li>`, `<ul><li>${m[2]}</li>${m[3]}</li></ul>`]],
      [`<img src="${im}" alt="${m[4]}">`, [`<img src="${im} alt="${m[4]}">`, `<img src="${im}" alt="${m[4]}"`, `<img "${im}" alt="${m[4]}">`, `<img src=="${im}" alt="${m[4]}">`]],
      [`<h1>Le <em>${m[5]}</em></h1>`, [`<h1>Le <em>${m[5]}</h1></em>`, `<h1>Le <em>${m[5]}</em><h1>`, `<h1>Le <em>${m[5]}<em></h1>`, `<h1>Le <em>${m[5]}</em></h2>`]]
    ]);
    const c = choix4(cd(T[0]), shuffle(T[1]).map(cd));
    return { enonce: "Un seul de ces morceaux de code HTML est **correct**. Lequel ?", mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Chaque balise ouverte doit être fermée par la balise de même nom avec `/` : `<p>` … `</p>`.", "Les balises s'emboîtent comme des boîtes : la dernière ouverte est la première fermée.", "Les valeurs des attributs s'écrivent entre guillemets : `href=\"…\"`, `src=\"…\"`."],
      solution: `${cd(T[0])} est correct : chaque balise est bien fermée, dans le bon ordre, et les attributs sont entre guillemets. Dans les autres, une balise est mal fermée ou mal emboîtée, ou un guillemet ou un chevron manque. Le navigateur essaie souvent d'afficher quand même, mais le résultat est imprévisible.` };
  });

  /* ---------- CSS ---------- */
  const COULEURS = ["red", "blue", "green", "orange", "purple", "navy", "white", "black", "gray", "teal"];
  const PROPS = [["color", "la couleur du texte"], ["background-color", "la couleur de fond"], ["font-size", "la taille du texte"], ["text-align", "l'alignement du texte (à gauche, centré…)"], ["font-family", "la police de caractères"], ["border", "la bordure autour d'un élément"], ["width", "la largeur d'un élément"], ["margin", "la marge autour d'un élément"]];
  def("sw-css", () => {
    const t = pick(["couleur", "couleur", "propriete", "propriete", "style", "regle"]);
    if (t === "propriete") {
      const [p, r] = pick(PROPS), sens = Math.random() < 0.5, autres = shuffle(PROPS.filter((x) => x[0] !== p));
      const c = sens ? choix4(cd(p), autres.map((x) => cd(x[0]))) : choix4(r, autres.map((x) => x[1]));
      return { enonce: sens ? `Quelle propriété CSS modifie ${r} ?` : `Que modifie la propriété CSS ${cd(p)} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Une règle CSS s'écrit `sélecteur { propriété: valeur; }`.", "Les noms des propriétés sont en anglais : color (couleur), size (taille), align (aligner), border (bordure)…", "Élimine celles que tu connais."], solution: `La propriété ${cd(p)} modifie ${r}.` };
    }
    const sel = shuffle(["h1", "p", "a", "li", "h2"]).slice(0, 3), col = shuffle(COULEURS.slice());
    const regles = sel.map((s, k) => ({ s, color: col[k], fond: col[k + 3], taille: pick(["14px", "18px", "24px", "2em"]), align: pick(["center", "left", "right"]) }));
    const css = regles.map((r, k) => `${r.s} {\n  color: ${r.color};${k === 1 ? `\n  background-color: ${r.fond};` : ""}${k === 0 ? `\n  text-align: ${r.align};` : ""}${k === 2 ? `\n  font-size: ${r.taille};` : ""}\n}`).join("\n");
    const NOM = { h1: "les titres `<h1>`", h2: "les sous-titres `<h2>`", p: "les paragraphes `<p>`", a: "les liens `<a>`", li: "les éléments de liste `<li>`" };
    const DES = (s) => NOM[s].replace(/^les /, "des ");
    if (t === "couleur") {
      const r = pick(regles), c = choix4(cd(r.color), regles.filter((x) => x !== r).map((x) => cd(x.color)).concat([cd(regles[1].fond), cd(col[7])]));
      return { enonce: `Voici la feuille de style d'un site :\n\n\`\`\`css\n${css}\n\`\`\`\n\nDe quelle couleur est le **texte** dans ${NOM[r.s]} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Chaque règle commence par un sélecteur (la balise visée), puis les déclarations entre accolades.", `Cherche la règle dont le sélecteur est ${cd(r.s)}.`, "La couleur du texte est donnée par `color` (`background-color` est la couleur du fond)."],
        solution: `La règle ${cd(r.s + " { … }")} contient ${cd("color: " + r.color + ";")} : le texte ${DES(r.s)} est en ${cd(r.color)}.` };
    }
    if (t === "regle") {
      const s = pick(["h1", "p", "a", "li"]), v = pick(COULEURS);
      const c = choix4(cd(`${s} { color: ${v}; }`), [cd(`${s} { background-color: ${v}; }`), cd(`${v} { color: ${s}; }`), cd(`${pick(["h1", "p", "a", "li"].filter((x) => x !== s))} { color: ${v}; }`), cd(`${s} ( color = ${v} )`)]);
      return { enonce: `Quelle règle CSS écrit en ${cd(v)} le texte ${DES(s)} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Forme d'une règle : `sélecteur { propriété: valeur; }`.", "Le sélecteur est le nom de la balise, sans chevrons.", "Pour la couleur du texte, la propriété est `color`."], solution: `${cd(`${s} { color: ${v}; }`)} : le sélecteur ${cd(s)} vise ${NOM[s]}, la propriété \`color\` règle la couleur du texte.` };
    }
    const lignesHTML = [`<p>Le lagon est bleu.</p>`, `<h1>Mon exposé</h1>`, `<a href="page2.html">Suite</a>`, `<li>${pick(MOTS)}</li>`, `<img src="lagon.jpg" alt="Le lagon">`, `<title>Mon site</title>`];
    const lignesCSS = [`p { color: ${pick(COULEURS)}; }`, `h1 { text-align: center; }`, `body { background-color: ${pick(COULEURS)}; }`, `a { font-size: 18px; }`, `li { font-family: Arial; }`];
    const versCSS = Math.random() < 0.6, b = pick(versCSS ? lignesCSS : lignesHTML), c = choix4(cd(b), shuffle(versCSS ? lignesHTML : lignesCSS).map(cd));
    return { enonce: `Une seule de ces lignes relève ${versCSS ? "du **style** de la page (CSS)" : "du **contenu** de la page (HTML)"}. Laquelle ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Le HTML décrit le contenu et sa structure (titres, paragraphes, liens…), avec des balises `<…>`.", "Le CSS décrit la présentation (couleurs, tailles, alignements), avec des règles `sélecteur { propriété: valeur; }`.", versCSS ? "Cherche la ligne avec des accolades." : "Cherche la ligne avec des chevrons."],
      solution: `${cd(b)} est ${versCSS ? "une règle CSS (style)" : "du HTML (contenu)"} ; les trois autres sont ${versCSS ? "du HTML : elles décrivent le contenu" : "des règles CSS : elles décrivent la présentation"}. On sépare les deux pour pouvoir changer l'apparence d'un site sans toucher à son contenu.` };
  });

  /* ---------- Client ou serveur ? ---------- */
  const ACTEURS = ["le navigateur (client)", "le serveur Web", "le serveur DNS", "un routeur"];
  const ACTIONS = [
    ["affiche la page à partir du code HTML et CSS reçu", 0], ["envoie une requête HTTP quand on clique sur un lien", 0], ["exécute le code JavaScript contenu dans la page", 0], ["garde l'historique des pages visitées", 0], ["enregistre les cookies sur l'appareil", 0], ["peut être réglé pour bloquer les programmes JavaScript", 0], ["garde en cache les images pour ne pas les retélécharger", 0], ["propose la navigation privée", 0], ["affiche un cadenas quand la connexion est en HTTPS", 0], ["montre le code source de la page reçue", 0], ["vérifie qu'un champ de formulaire est rempli avant même l'envoi", 0], ["transforme le code reçu en arbre (le DOM) pour l'afficher", 0],
    ["stocke les fichiers du site : pages, images, vidéos", 1], ["reçoit la requête HTTP et renvoie la page demandée", 1], ["exécute un programme PHP pour fabriquer une page sur mesure", 1], ["consulte la base de données des commandes d'un site marchand", 1], ["répond par le code 404 quand la page n'existe pas", 1], ["vérifie le mot de passe envoyé par un formulaire de connexion", 1], ["fabrique la page des résultats d'une recherche sur le site", 1], ["demande au navigateur d'enregistrer un cookie", 1], ["note dans un journal les adresses IP qui l'ont contacté", 1], ["répond par le code 301 quand une page a déménagé", 1],
    ["donne l'adresse IP correspondant au nom `www.exemple.fr`", 2], ["est interrogé avant même l'envoi de la requête HTTP", 2], ["indique quel serveur gère le domaine `.yt`", 2], ["garde en mémoire les correspondances nom ↔ adresse récemment demandées", 2], ["permet de taper un nom plutôt qu'une adresse numérique", 2], ["répond à la commande `nslookup`", 2],
    ["transmet les paquets de la requête vers le réseau suivant", 3], ["lit seulement l'adresse de destination des paquets, pas la page", 3], ["retire 1 au TTL de chaque paquet qui le traverse", 3], ["choisit vers quel voisin envoyer chaque paquet grâce à sa table", 3], ["détruit un paquet dont la durée de vie est épuisée", 3], ["relie le réseau du lycée au réseau de l'opérateur", 3]
  ];
  def("sw-client-serveur", () => {
    const [a, k] = pick(ACTIONS), c = choix4(ACTEURS[k], ACTEURS.filter((_, j) => j !== k));
    return { enonce: `Quand on consulte une page Web, qui ${a} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Le **client** (le navigateur) demande et affiche ; le **serveur Web** stocke et fabrique les pages.", "Le serveur DNS traduit les noms en adresses ; les routeurs font seulement circuler les paquets.", "Demande-toi si l'action a lieu sur ton téléphone, sur la machine du site, dans l'annuaire, ou en chemin."],
      solution: `C'est **${ACTEURS[k]}** qui ${a}. ${["Le navigateur est le client : il envoie les requêtes, reçoit le code et l'exécute (HTML, CSS, JavaScript) sur ton appareil.", "Le serveur Web répond aux requêtes ; ce qu'il exécute (PHP, base de données) reste chez lui, l'utilisateur n'en voit que le résultat.", "Le serveur DNS est l'annuaire d'Internet : il intervient avant la requête HTTP.", "Le routeur ne s'occupe que d'acheminer les paquets, quel que soit leur contenu."][k]}` };
  });

  /* ---------- Moteurs de recherche : index inversé ---------- */
  const MOTS_CLES = ["tortue", "lagon", "plage", "corail", "dauphin", "baleine", "mangrove", "volcan", "plongée", "pêche", "récif", "îlot"];
  def("sw-index", () => {
    for (let essai = 0; essai < 80; essai++) {
      const V = shuffle(MOTS_CLES.slice()).slice(0, 6), pages = ["P1", "P2", "P3", "P4"];
      const contenu = pages.map(() => shuffle(V.slice()).slice(0, rand(2, 4)));
      const avec = (m) => pages.filter((p, k) => contenu[k].includes(m));
      const fig = tableHTML([["Page", "Mots importants"]].concat(pages.map((p, k) => [p, contenu[k].join(", ")])));
      const ens = (L) => (L.length ? L.join(" et ").replace(/ et (?=.* et )/g, ", ") : "aucune page");
      const t = pick(["un", "et", "et", "nombre"]);
      const intro = "Un robot a parcouru quatre pages et noté leurs mots importants :";
      const A = ["Un moteur de recherche fabrique un **index inversé** : pour chaque mot, la liste des pages qui le contiennent.", "Pour une requête de plusieurs mots, on garde les pages qui contiennent **tous** les mots."];
      const tous = () => { const s = shuffle(pages.slice()).slice(0, rand(1, 3)).sort(); return ens(s); };
      if (t === "nombre") {
        const m = pick(V), n = avec(m).length;
        return { enonce: `${intro} Dans l'index inversé, combien de pages sont associées au mot « ${m} » ?`, figure: fig, mode: "nombre", prefixe: "Nombre de pages :", attendu: n, erreurs: [{ valeur: 4, message: "Toutes les pages ne contiennent pas ce mot." }],
          aides: [A[0], `Parcours les quatre lignes et repère « ${m} ».`, "Compte les pages trouvées."], solution: `« ${m} » → ${ens(avec(m))} : ${pluriel(n, "page")}.` };
      }
      if (t === "un") {
        const m = pick(V), R = avec(m);
        if (!R.length) continue;
        const c = choix4(ens(R), [], () => tous());
        return { enonce: `${intro} Quelle est la ligne de l'index inversé pour le mot « ${m} » ?`, figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu, aides: [A[0], `Cherche « ${m} » dans chaque ligne.`, "Note toutes les pages où il apparaît."],
          solution: `Le mot « ${m} » apparaît dans ${ens(R)} : la ligne de l'index est « ${m} → ${ens(R)} ».` };
      }
      const [m1, m2] = shuffle(V.slice()), R = avec(m1).filter((p) => avec(m2).includes(p));
      if (!R.length || R.length === avec(m1).length && R.length === avec(m2).length) continue;
      const c = choix4(ens(R), [ens(avec(m1)), ens(avec(m2)), ens([...new Set(avec(m1).concat(avec(m2)))].sort())], () => tous());
      return { enonce: `${intro} Quelles pages répondent à la requête « ${m1} ${m2} » (les deux mots doivent être présents) ?`, figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: [A[0], `Ligne de « ${m1} » : ${ens(avec(m1))}. Ligne de « ${m2} » : ${ens(avec(m2))}.`, A[1]],
        solution: `« ${m1} » → ${ens(avec(m1))} ; « ${m2} » → ${ens(avec(m2))}. Les pages communes aux deux listes : ${ens(R)}. Le moteur classe ensuite ces pages, par exemple selon leur popularité.` };
    }
    throw new Error("sw-index");
  });

  /* ---------- Popularité d'une page : liens entrants ---------- */
  function grapheWeb(n, liens, o = {}) {
    const ids = "ABCDEF".slice(0, n).split(""), cx = 160, cy = 102, R = 78;
    const pos = {}; ids.forEach((id, k) => { const a = -Math.PI / 2 + (2 * Math.PI * k) / n; pos[id] = { x: Math.round(cx + R * 1.45 * Math.cos(a)), y: Math.round(cy + R * Math.sin(a)) }; });
    const vus = new Set(); let s = "";
    liens.forEach(([a, b]) => {
      const cle = [a, b].sort().join(""); if (vus.has(cle)) return; vus.add(cle);
      const double = liens.some(([x, y]) => x === b && y === a), A = pos[a], B = pos[b], dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy), r = 17;
      s += fleche((A.x + (dx / d) * r).toFixed(1), (A.y + (dy / d) * r).toFixed(1), (B.x - (dx / d) * (r + 2)).toFixed(1), (B.y - (dy / d) * (r + 2)).toFixed(1), { double });
    });
    ids.forEach((id) => { const p = pos[id]; s += `<rect x="${p.x - 16}" y="${p.y - 15}" width="32" height="30" rx="4" style="fill:var(--lagon-pale);stroke:${o.marque === id ? "var(--ylang)" : "var(--lagon)"};stroke-width:${o.marque === id ? 2.6 : 1.8}"/>` + txt(p.x, p.y + 5, id, { taille: 13 }); });
    return svg(320, 205, s, o.aria || "Graphe de pages Web reliées par des liens");
  }
  def("sw-popularite", () => {
    for (let essai = 0; essai < 100; essai++) {
      const n = rand(4, 6), ids = "ABCDEF".slice(0, n).split(""), liens = [];
      ids.forEach((a) => shuffle(ids.filter((b) => b !== a)).slice(0, rand(1, Math.min(3, n - 1))).forEach((b) => liens.push([a, b])));
      const entrants = (x) => liens.filter((l) => l[1] === x).length, sc = ids.map(entrants), max = Math.max(...sc), min = Math.min(...sc);
      const t = pick(["compter", "compter", "max", "min"]);
      const A = ["Une flèche de X vers Y représente un lien hypertexte de la page X vers la page Y.", "Principe des liens : une page est d'autant plus populaire que beaucoup de pages pointent vers elle."];
      if (t === "compter") {
        const x = pick(ids);
        return { enonce: "Le graphe représente des pages Web et les liens entre elles (une flèche à deux pointes : liens dans les deux sens). Combien de liens **pointent vers** la page " + x + " ?", figure: grapheWeb(n, liens, { marque: x }), mode: "nombre", prefixe: "Liens entrants :", attendu: entrants(x),
          erreurs: [{ valeur: liens.filter((l) => l[0] === x).length, message: `Tu as compté les liens qui **partent** de ${x}.` }, { valeur: liens.filter((l) => l[0] === x || l[1] === x).length, message: "On ne compte que les flèches qui arrivent sur la page." }],
          aides: [A[0], `Compte les pointes de flèches qui touchent ${x}.`, "Une flèche à deux pointes compte pour un lien entrant (et un lien sortant)."],
          solution: `Pages qui ont un lien vers ${x} : ${liens.filter((l) => l[1] === x).map((l) => l[0]).sort().join(", ") || "aucune"}. Donc ${pluriel(entrants(x), "lien entrant", "liens entrants")}.` };
      }
      const cible = t === "max" ? max : min, gagnants = ids.filter((x) => entrants(x) === cible);
      if (gagnants.length !== 1 || max === min) continue;
      const c = choix4(gagnants[0], ids.filter((x) => x !== gagnants[0]));
      return { enonce: `Le graphe représente des pages Web et les liens entre elles. Selon le principe des liens (nombre de liens entrants), quelle page est la ${t === "max" ? "**plus**" : "**moins**"} populaire ?`, figure: grapheWeb(n, liens), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: [A[0], A[1], "Compte les liens entrants de chaque page."],
        solution: `Liens entrants : ${ids.map((x) => `${x} : $${entrants(x)}$`).join(", ")}. La page la ${t === "max" ? "plus" : "moins"} populaire est **${gagnants[0]}**. Les vrais moteurs tiennent aussi compte de la popularité des pages qui font les liens (algorithme PageRank).` };
    }
    throw new Error("sw-popularite");
  });

  /* ---------- Licences et droit d'auteur ---------- */
  // Licences : [nom, attribution exigée, commercial permis, modification permise, ce que dit la licence]
  const LICENCES = [["CC BY", true, true, true, "réutilisation libre en citant l'auteur"], ["CC BY-SA", true, true, true, "en citant l'auteur, et en partageant les modifications sous la même licence"], ["CC BY-NC", true, false, true, "en citant l'auteur, sans usage commercial"], ["CC BY-ND", true, true, false, "en citant l'auteur, sans modification"], ["CC BY-NC-SA", true, false, true, "en citant l'auteur, sans usage commercial, modifications sous la même licence"], ["CC BY-NC-ND", true, false, false, "en citant l'auteur, sans usage commercial ni modification"], ["CC0 (domaine public)", false, true, true, "aucune condition"], ["© tous droits réservés", null, false, false, "toute réutilisation demande l'accord de l'auteur"]];
  const USAGES = [["mettre sur ton site un lien vers la page où elle est publiée", () => true],["la publier sur le site du lycée, sans la modifier, en citant l'auteur", (L) => L[1] !== null], ["la publier sur le site du lycée sans citer l'auteur", (L) => L[1] === false], ["la retoucher et publier ta version, en citant l'auteur, sous la même licence", (L) => L[1] !== null && L[3]], ["l'utiliser telle quelle dans une publicité payante, en citant l'auteur", (L) => L[1] !== null && L[2]], ["la retoucher et vendre des affiches de ta version, en citant l'auteur", (L) => L[1] !== null && L[2] && L[3]], ["l'imprimer sur des tee-shirts que tu vends, en citant l'auteur", (L) => L[1] !== null && L[2]]];
  const SIGLES = [["BY", "il faut citer l'auteur"], ["NC", "pas d'utilisation commerciale"], ["ND", "pas de modification"], ["SA", "partager les modifications sous la même licence"]];
  def("sw-licences", () => {
    if (Math.random() < 0.25) {
      const [s, r] = pick(SIGLES), sens = Math.random() < 0.5, aut = SIGLES.filter((x) => x[0] !== s);
      const c = sens ? choix4(r, aut.map((x) => x[1])) : choix4(cd(s), aut.map((x) => cd(x[0])));
      return { enonce: sens ? `Dans une licence Creative Commons, que signifie ${cd(s)} ?` : `Quel élément d'une licence Creative Commons signifie : ${r} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Les licences Creative Commons (CC) disent ce qu'on a le droit de faire d'une œuvre publiée.", "Les sigles viennent de l'anglais : BY (par), NC (non commercial), ND (no derivatives, pas de modification), SA (share alike, partager pareil).", "Élimine ceux que tu connais."],
        solution: `${cd(s)} : ${r}. Exemple : CC BY-NC-SA = citer l'auteur, pas d'usage commercial, modifications partagées sous la même licence.` };
    }
    for (let essai = 0; essai < 50; essai++) {
      const L = pick(LICENCES), ok = USAGES.filter((u) => u[1](L)), non = USAGES.filter((u) => !u[1](L)), mode = pick(["autorise", "interdit"]);
      const [bons, mauvais] = mode === "autorise" ? [ok, non] : [non, ok];
      if (!bons.length || mauvais.length < 3) continue;
      const b = pick(bons), c = choix4(b[0], shuffle(mauvais).map((u) => u[0]));
      return { enonce: `Une photo est publiée sur le Web sous la licence **${L[0]}** (${L[4]}). Laquelle de ces utilisations est ${mode === "autorise" ? "**autorisée**" : "**interdite**"} sans demander l'accord de l'auteur ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["BY : citer l'auteur ; NC : pas d'usage commercial ; ND : pas de modification ; SA : même licence pour les modifications.", L[0].startsWith("©") ? "« Tous droits réservés » : le droit d'auteur s'applique pleinement." : L[0].startsWith("CC0") ? "CC0 : l'auteur a renoncé à ses droits, l'œuvre est comme dans le domaine public." : `Décompose ${cd(L[0])} en sigles.`, "Pour chaque utilisation, demande-toi : est-ce commercial ? y a-t-il modification ? cite-t-on l'auteur ?"],
        solution: `Avec **${L[0]}** (${L[4]}), « ${b[0]} » est ${mode === "autorise" ? "autorisé" : "interdit"}. ${mode === "autorise" ? "Les trois autres utilisations ne respectent pas une condition de la licence." : "Les trois autres utilisations respectent les conditions de la licence."}` };
    }
    throw new Error("sw-licences");
  });

  /* ---------- Repères historiques du Web ---------- */
  const HISTOIRE_W = [["Ted Nelson invente le concept d'hypertexte", 1965], ["ArpaNet adopte TCP/IP : Internet naît", 1983], ["Tim Berners-Lee invente le Web au CERN", 1989], ["le premier site Web est mis en ligne", 1991], ["le Web entre dans le domaine public et le navigateur Mosaic paraît", 1993], ["le W3C est créé pour normaliser le Web", 1994], ["JavaScript et PHP permettent des sites interactifs et dynamiques", 1995], ["Google lance son moteur de recherche", 1998], ["le DOM standardise la structure des pages", 2001], ["les technologies des applications mobiles se répandent", 2010]];
  def("sw-histoire", () => {
    const t = pick(["ancien", "recent", "annee", "annee"]);
    const E = shuffle(HISTOIRE_W.slice()).slice(0, 4), maj = (s) => s[0].toUpperCase() + s.slice(1);
    if (t === "annee") {
      const e = E[0], c = choix4(String(e[1]), E.slice(1).map((x) => String(x[1])), () => String(e[1] + pick([-6, -4, 4, 6, -10, 10])));
      return { enonce: `En quelle année ${e[0]} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Le Web naît au CERN en 1989, six ans après Internet (1983).", e[1] < 1989 ? "C'est avant l'invention du Web." : e[1] <= 1995 ? "C'est dans les premières années du Web (1989-1995)." : "C'est après 1995.", "Élimine les années d'autres événements que tu connais."],
        solution: `${maj(e[0])} en **${e[1]}**.` };
    }
    const tri = E.slice().sort((a, b) => a[1] - b[1]), bon = t === "ancien" ? tri[0] : tri[3];
    const c = choix4(maj(bon[0]), E.filter((x) => x !== bon).map((x) => maj(x[0])));
    return { enonce: `Lequel de ces événements est le plus ${t === "ancien" ? "**ancien**" : "**récent**"} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["L'hypertexte (1965) est l'idée de départ du Web ; Internet (1983) est le réseau qui le transporte.", "Le Web naît en 1989, devient public en 1993, puis interactif (1995).", "Place chaque événement avant ou après 1989."],
      solution: `Dans l'ordre : ${tri.map((x) => `${x[0]} (${x[1]})`).join(" ; ")}. Le plus ${t === "ancien" ? "ancien" : "récent"} : ${bon[0]}.` };
  });

  /* ---------- Vrai ou faux : le Web, sécurité et confidentialité ---------- */
  const VF_WEB = [
    ["Le Web est une application qui utilise Internet.", true, "Internet est le réseau ; le Web, ce sont les pages reliées par des liens et transportées par HTTP."],
    ["Une page en HTTPS chiffre les échanges entre le navigateur et le serveur.", true, "C'est le « S » de sécurisé, signalé par un cadenas."],
    ["Un cookie est un petit fichier qu'un site fait enregistrer par le navigateur.", true, "Il sert à garder une préférence, un panier, une connexion… ou à suivre l'internaute."],
    ["On peut régler son navigateur pour refuser les cookies des sites tiers.", true, "Les cookies tiers servent surtout au pistage publicitaire."],
    ["La navigation privée n'enregistre pas l'historique sur l'appareil.", true, "Mais les sites visités, l'opérateur ou le réseau du lycée voient quand même les connexions."],
    ["Un lien peut afficher un texte et mener à une tout autre adresse.", true, "Le texte affiché ne dit rien : seule l'adresse de l'attribut `href` compte."],
    ["Le droit d'auteur protège une œuvre dès sa création, sans démarche particulière.", true, "Une photo ou un texte trouvé sur le Web n'est pas libre de droits par défaut."],
    ["Les premiers résultats d'un moteur de recherche peuvent être des liens payés par des annonceurs.", true, "Ce sont les liens sponsorisés (publicités)."],
    ["Une information publiée sur le Web peut rester accessible très longtemps.", true, "C'est pourquoi le droit à l'oubli permet de demander le déréférencement de certaines informations."],
    ["Le code JavaScript d'une page s'exécute sur l'appareil de l'internaute.", true, "Il est exécuté par le navigateur, côté client."],
    ["Les recommandations personnalisées peuvent enfermer dans une bulle d'informations.", true, "On ne voit plus que des contenus proches de ce qu'on a déjà aimé."],
    ["Le W3C publie les normes du Web, comme HTML et CSS.", true, "C'est ce qui permet à tous les navigateurs d'afficher les mêmes pages."],
    ["Internet et le Web ont été inventés en même temps.", false, "Internet date de 1983, le Web de 1989."],
    ["Un site en HTTPS est forcément un site honnête.", false, "HTTPS chiffre les échanges, mais un site d'hameçonnage peut aussi utiliser HTTPS."],
    ["En navigation privée, on est totalement anonyme sur Internet.", false, "Le site visité, le fournisseur d'accès ou l'administrateur du réseau voient toujours l'adresse IP et les connexions."],
    ["Une image trouvée avec un moteur de recherche est libre de droits.", false, "Elle est protégée par le droit d'auteur, sauf licence ou domaine public."],
    ["Le premier résultat d'un moteur de recherche est toujours le plus fiable.", false, "Le classement dépend de la popularité, des mots-clés… et parfois de la publicité."],
    ["Le code PHP d'un site est exécuté par le navigateur de l'internaute.", false, "PHP est exécuté par le serveur ; le navigateur ne reçoit que le résultat (du HTML)."],
    ["Supprimer un message sur un réseau ou un site l'efface de tout le Web.", false, "Il a pu être copié, partagé, archivé ou gardé en cache."],
    ["Le CSS décrit le contenu d'une page, le HTML sa présentation.", false, "C'est l'inverse : HTML pour le contenu, CSS pour la présentation."],
    ["Un moteur de recherche parcourt le Web au moment où l'on tape sa requête.", false, "Ses robots ont parcouru et indexé les pages **avant** : la requête interroge son index."],
    ["Tout ce qui est écrit sur le Web a été vérifié avant publication.", false, "Chacun peut publier : la qualité et la véracité ne sont pas garanties, il faut vérifier les sources."],
    ["Accepter tous les cookies est obligatoire pour visiter un site.", false, "En Europe, on peut refuser les cookies non essentiels, aussi facilement que les accepter."],
    ["Une URL commençant par `http://` est chiffrée.", false, "Seul `https://` chiffre les échanges."]
  ];
  def("sw-vrai-faux", () => vraiFaux4(VF_WEB, ["Un seul mot (« toujours », « forcément », « totalement ») suffit souvent à rendre une affirmation fausse.", "Pense aux réglages du navigateur (cookies, historique, navigation privée) et à ce que voit le serveur.", "Élimine les affirmations dont tu es sûr, puis compare les dernières."]));

  /* =====================================================================
     FIGURES DES COURS ET DES FICHES MÉTHODE
     ===================================================================== */
  // Frise verticale : [année, texte court]
  const frise = (E, aria) => {
    const h = 16 + E.length * 24; let s = `<line x1="52" y1="10" x2="52" y2="${h - 8}" style="stroke:var(--lagon);stroke-width:2.5"/>`;
    E.forEach(([a, t], k) => { const y = 22 + k * 24; s += `<circle cx="52" cy="${y - 4}" r="5" style="fill:var(--surface);stroke:var(--lagon);stroke-width:2"/>` + txt(40, y, String(a), { ancre: "end", taille: 11 }) + txt(64, y, t, { ancre: "start", taille: 11, gras: false }); });
    return svg(320, h, s, aria);
  };

  /* ---------- Chapitre 1 : Internet ---------- */
  FIGURES["si-cours-frise"] = () => frise([[1969, "ArpaNet (États-Unis)"], [1971, "Cyclades (France), premier courriel"], [1983, "TCP/IP : naissance d'Internet"], [1984, "Système de noms de domaine (DNS)"], [1989, "Invention du Web au CERN"], [1997, "Première norme Wi-Fi"], [2007, "Smartphones : Internet dans la poche"], [2012, "4G en France"], [2020, "5G en France"]], "Frise : ArpaNet 1969, Cyclades 1971, TCP/IP 1983, DNS 1984, Web 1989, Wi-Fi 1997, smartphones 2007, 4G 2012, 5G 2020");
  FIGURES["si-cours-reseau"] = () => reseauSVG([
    { id: "tel", label: "Tél.", type: "machine", x: 30, y: 55 }, { id: "pc", label: "PC", type: "machine", x: 30, y: 150 }, { id: "box", label: "Box", x: 98, y: 102, marque: true },
    { id: "r1", label: "R1", x: 165, y: 52 }, { id: "r2", label: "R2", x: 165, y: 152 }, { id: "r3", label: "R3", x: 232, y: 102 }, { id: "srv", label: "Site", type: "serveur", x: 293, y: 102 }
  ], [["tel", "box"], ["pc", "box"], ["box", "r1"], ["box", "r2"], ["r1", "r2"], ["r1", "r3"], ["r2", "r3"], ["r3", "srv"]], { h: 205,
    extra: `<rect x="6" y="22" width="118" height="160" rx="12" style="fill:none;stroke:var(--ylang);stroke-width:1.4;stroke-dasharray:5 4"/>` + txt(65, 197, "réseau local (maison, lycée)", { taille: 10, gras: false }) + txt(222, 197, "Internet : réseaux d'opérateurs", { taille: 10, gras: false }) + txt(200, 14, "routeurs", { taille: 10, gras: false }),
    aria: "Un téléphone et un ordinateur reliés à une box (réseau local), elle-même reliée à des routeurs R1, R2, R3 qui mènent au serveur d'un site" });
  FIGURES["si-cours-paquet"] = () => svg(320, 196,
    boite(10, 8, 300, 56, ["En-tête IP", "adresse IP source · adresse IP destination · TTL"], { fond: "var(--ylang-pale)", trait: "var(--ylang)" }) +
    boite(10, 72, 300, 56, ["En-tête TCP", "n° du paquet · accusé de réception · contrôle"], {}) +
    boite(10, 136, 300, 50, ["Données", "un morceau du fichier (texte, image, son…)"], { fond: "var(--surface)", trait: "var(--doux)" }),
    "Un paquet : un en-tête IP (adresses source et destination, TTL), un en-tête TCP (numéro du paquet, accusé de réception), puis les données");
  FIGURES["si-cours-ip"] = () => {
    const a = [192, 168, 1, 20]; let s = "";
    a.forEach((v, k) => { const x = 8 + k * 78; s += boite(x, 10, 70, 30, String(v), { taille: 15, fond: k < 3 ? "var(--lagon-pale)" : "var(--ylang-pale)", trait: k < 3 ? "var(--lagon)" : "var(--ylang)" }) + txt(x + 35, 58, bin8(v), { taille: 11, mono: true, gras: false }); if (k < 3) s += txt(x + 74, 31, ".", { taille: 16 }); });
    s += `<path d="M10 72 v6 h226 v-6" style="fill:none;stroke:var(--lagon);stroke-width:1.6"/>` + txt(123, 94, "partie réseau (masque 255.255.255.0)", { taille: 11 });
    s += `<path d="M242 72 v6 h68 v-6" style="fill:none;stroke:var(--ylang);stroke-width:1.6"/>` + txt(276, 94, "machine", { taille: 11 });
    return svg(320, 104, s, "L'adresse IPv4 192.168.1.20 : quatre octets, en binaire 11000000.10101000.00000001.00010100 ; les trois premiers forment la partie réseau, le dernier la partie machine");
  };
  FIGURES["si-cours-binaire"] = () => tablePoids("01011010");
  FIGURES["si-cours-unites"] = () => tableHTML([["Unité", "Vaut", "Exemple"], ["1 octet (o)", "8 bits", "une lettre"], ["1 ko", "1 000 octets", "un SMS : moins de 1 ko"], ["1 Mo", "1 000 ko", "une photo : 2 à 5 Mo"], ["1 Go", "1 000 Mo", "un film : 1 à 5 Go"], ["1 To", "1 000 Go", "un disque dur"], ["1 Po", "1 000 To", "un centre de données"], ["1 Eo", "1 000 Po", "trafic mondial : quelques heures"], ["1 Zo", "1 000 Eo", "trafic mondial : quelques mois"]]);
  FIGURES["si-cours-dns"] = () => {
    let s = boite(4, 88, 58, 32, ["Ton", "appareil"], { taille: 10, inter: 11 }) + boite(102, 88, 88, 32, ["Résolveur", "(box, opérateur)"], { taille: 10, inter: 11, fond: "var(--ylang-pale)", trait: "var(--ylang)" });
    s += boite(226, 10, 90, 30, ["Serveur racine"], { taille: 10 }) + boite(226, 89, 90, 30, ["Serveur du .yt"], { taille: 10 }) + boite(226, 168, 90, 30, ["Serveur de", "lagon-bleu.yt"], { taille: 10, inter: 11 });
    s += fleche(64, 104, 100, 104, { double: true }) + txt(82, 98, "1 · 8", { taille: 10 });
    s += fleche(192, 96, 224, 32, { double: true }) + txt(196, 58, "2 · 3", { taille: 10, ancre: "start" });
    s += fleche(192, 104, 224, 104, { double: true }) + txt(208, 98, "4 · 5", { taille: 10 });
    s += fleche(192, 112, 224, 178, { double: true }) + txt(196, 158, "6 · 7", { taille: 10, ancre: "start" });
    s += txt(160, 220, "1 : « www.lagon-bleu.yt ? »   8 : « 82.64.3.17 »", { taille: 10, gras: false }) + txt(160, 236, "2 à 7 : le résolveur descend l'arbre du DNS", { taille: 10, gras: false });
    return svg(320, 244, s, "Résolution DNS : l'appareil demande au résolveur l'adresse de www.lagon-bleu.yt ; le résolveur interroge le serveur racine, puis celui du .yt, puis celui de lagon-bleu.yt, et renvoie l'adresse IP");
  };
  FIGURES["si-cours-tcp"] = () => {
    const xa = 60, xb = 260; let s = `<line x1="${xa}" y1="28" x2="${xa}" y2="236" style="stroke:var(--doux);stroke-width:2"/><line x1="${xb}" y1="28" x2="${xb}" y2="236" style="stroke:var(--doux);stroke-width:2"/>` + txt(xa, 18, "Émetteur", { taille: 11 }) + txt(xb, 18, "Destinataire", { taille: 11 });
    const env = (y1, y2, t, o = {}) => fleche(o.retour ? xb : xa, y1, o.retour ? xa : xb, y2, { couleur: o.retour ? undefined : "var(--lagon)", tirets: o.retour }) + txt(160, (y1 + y2) / 2 - 5, t, { taille: 10, gras: !o.retour });
    s += env(38, 58, "paquet 1") + env(64, 84, "accusé de réception 1", { retour: true });
    s += `<line x1="${xa}" y1="96" x2="150" y2="106" style="stroke:var(--faux);stroke-width:1.8"/><path d="M144 98l12 12M156 98l-12 12" style="stroke:var(--faux);stroke-width:2.4"/>` + txt(100, 92, "paquet 2 perdu", { taille: 10, couleur: "var(--faux)" });
    s += env(118, 138, "paquet 3") + env(144, 164, "accusé : « il manque le 2 »", { retour: true });
    s += env(176, 196, "paquet 2 renvoyé") + env(202, 222, "accusé de réception 2", { retour: true });
    s += txt(160, 250, "À l'arrivée, TCP remet les paquets dans l'ordre : 1, 2, 3.", { taille: 10, gras: false });
    return svg(320, 258, s, "Échange TCP : le paquet 1 arrive et est acquitté ; le paquet 2 est perdu ; le paquet 3 arrive et le destinataire signale qu'il manque le 2 ; le paquet 2 est renvoyé puis acquitté");
  };
  const ROUTAGE_COURS = { noeuds: [["A", 35, 100], ["B", 115, 38], ["C", 115, 162], ["D", 205, 38], ["E", 205, 162], ["F", 285, 100]].map(([id, x, y]) => ({ id, x, y })), liens: [["A", "B"], ["A", "C"], ["B", "C"], ["B", "D"], ["C", "E"], ["D", "E"], ["D", "F"], ["E", "F"]] };
  FIGURES["si-cours-routage"] = () => reseauSVG(ROUTAGE_COURS.noeuds.map((n) => Object.assign({}, n, { marque: n.id === "A" || n.id === "F" })), ROUTAGE_COURS.liens, { aria: "Six routeurs A à F : A est relié à B et C, B à C et D, C à E, D à E et F, E à F" });
  FIGURES["si-cours-routage-panne"] = () => reseauSVG(ROUTAGE_COURS.noeuds.map((n) => Object.assign({}, n, { marque: n.id === "A" || n.id === "F", panne: n.id === "D" })), ROUTAGE_COURS.liens, { aria: "Le même réseau avec le routeur D en panne : le chemin passe par A, C, E, F" });
  FIGURES["si-cours-table"] = () => tableHTML([["Pour aller vers", "A envoie à", "Liaisons"], ["B", "B", "1"], ["C", "C", "1"], ["D", "B", "2"], ["E", "C", "2"], ["F", "B ou C", "3"]]);
  FIGURES["si-cours-debits"] = () => tableHTML([["Réseau", "Type", "Débit typique"]].concat(RESEAUX.filter((r) => !/Minitel/.test(r[0])).map((r) => [r[0][0].toUpperCase() + r[0].slice(1), r[1] ? "filaire" : "sans fil", r[3]])));
  FIGURES["si-cours-p2p"] = () => {
    const P = [[160, 30], [270, 85], [230, 185], [90, 185], [50, 85]].map(([x, y], k) => ({ id: "p" + k, label: "Pair", type: "machine", x, y }));
    const L = []; P.forEach((a, i) => P.forEach((b, j) => { if (i < j) L.push([a.id, b.id]); }));
    return reseauSVG(P, L, { h: 210, aria: "Réseau pair-à-pair : cinq ordinateurs tous reliés entre eux, chacun envoie et reçoit" });
  };
  FIGURES["si-cours-client-serveur"] = () => {
    const P = [[40, 40], [40, 110], [40, 180]].map(([x, y], k) => ({ id: "c" + k, label: "Client", type: "machine", x, y }));
    return reseauSVG(P.concat([{ id: "s", label: "Serv.", type: "serveur", x: 260, y: 110 }]), P.map((p) => [p.id, "s"]), { h: 210, aria: "Modèle client-serveur : trois clients reliés à un même serveur central" });
  };

  /* ---------- Chapitre 2 : le Web ---------- */
  FIGURES["sw-cours-frise"] = () => frise([[1965, "Ted Nelson : l'hypertexte"], [1983, "Internet (TCP/IP)"], [1989, "Tim Berners-Lee invente le Web"], [1993, "Domaine public, navigateur Mosaic"], [1994, "Création du W3C"], [1995, "JavaScript et PHP"], [1998, "Google"], [2001, "Le DOM standardise les pages"], [2010, "Applications mobiles"]], "Frise du Web : hypertexte 1965, Internet 1983, Web 1989, Mosaic 1993, W3C 1994, JavaScript et PHP 1995, Google 1998, DOM 2001, applications mobiles 2010");
  FIGURES["sw-cours-hypertexte"] = () => grapheWeb(5, [["A", "B"], ["A", "C"], ["B", "C"], ["C", "A"], ["D", "C"], ["E", "C"], ["C", "E"], ["B", "D"]], { aria: "Cinq pages A à E reliées par des liens : la page C reçoit des liens de A, B, D et E" });
  FIGURES["sw-cours-url"] = () => `<p style="margin:4px 0 8px;text-align:center"><code class="tt">https://www.lagon-bleu.yt/articles/tortues.html?page=2#haut</code></p>` + tableHTML([["Partie", "Rôle"], ["https", "protocole (ici sécurisé)"], ["www.lagon-bleu.yt", "nom de domaine du serveur"], [".yt", "domaine de premier niveau (Mayotte)"], ["/articles/tortues.html", "chemin du fichier sur le serveur"], ["?page=2", "paramètre : nom=valeur"], ["#haut", "ancre : endroit de la page"]]);
  FIGURES["sw-cours-http"] = () => {
    const xa = 50, xb = 270; let s = `<line x1="${xa}" y1="30" x2="${xa}" y2="214" style="stroke:var(--doux);stroke-width:2"/><line x1="${xb}" y1="30" x2="${xb}" y2="214" style="stroke:var(--doux);stroke-width:2"/>` + txt(xa, 20, "Navigateur", { taille: 11 }) + txt(xb, 20, "Serveur Web", { taille: 11 });
    const env = (y, t, retour) => fleche(retour ? xb : xa, y, retour ? xa : xb, y + 14, { couleur: retour ? undefined : "var(--lagon)", tirets: retour }) + txt(160, y + 2, t, { taille: 10, gras: !retour, mono: !retour });
    s += env(42, "GET /tortues.html") + env(70, "200 OK + code HTML", true) + env(100, "GET /style.css") + env(128, "200 OK + feuille CSS", true) + env(158, "GET /tortue.jpg") + env(186, "200 OK + image", true);
    s += txt(160, 230, "Puis le navigateur assemble et affiche la page.", { taille: 10, gras: false });
    return svg(320, 238, s, "Dialogue HTTP : le navigateur demande la page tortues.html, le serveur répond 200 avec le HTML ; puis le navigateur demande la feuille de style et l'image, que le serveur envoie");
  };
  const fenetre = (x, w, onglet, o = {}) => {
    let s = `<rect x="${x}" y="6" width="${w}" height="178" rx="6" style="fill:${o.fond || "var(--surface)"};stroke:var(--doux);stroke-width:1.4"/><rect x="${x}" y="6" width="${w}" height="20" rx="6" style="fill:var(--fond);stroke:var(--doux);stroke-width:1.4"/>` + txt(x + 8, 20, onglet, { ancre: "start", taille: 9, gras: false });
    s += txt(o.centre ? x + w / 2 : x + 10, 50, "Tortues du lagon", { ancre: o.centre ? "middle" : "start", taille: 13, couleur: o.titre });
    s += `<text x="${x + 10}" y="76" class="g-label" style="font-size:10px;font-weight:400;${o.texte ? `fill:${o.texte}` : ""}">Pour voir <tspan style="fill:${o.lien || "var(--lagon)"};text-decoration:underline">nos photos</tspan>.</text>`;
    ["tortue verte", "tortue luth", "tortue imbriquée"].forEach((t, k) => { s += `<circle cx="${x + 16}" cy="${98 + k * 18}" r="2.5" style="fill:${o.texte || "var(--encre)"}"/>` + txt(x + 24, 102 + k * 18, t, { ancre: "start", taille: 10, gras: false, couleur: o.texte }); });
    s += `<rect x="${x + 10}" y="152" width="44" height="24" rx="3" style="fill:var(--lagon-pale);stroke:var(--lagon)"/>` + txt(x + 32, 168, "image", { taille: 8, gras: false });
    return s;
  };
  FIGURES["sw-cours-rendu"] = () => svg(320, 190, fenetre(20, 280, "Les tortues marines"), "Page affichée : l'onglet « Les tortues marines », le titre « Tortues du lagon », un paragraphe avec le lien « nos photos », une liste à puces de trois tortues et une image");
  FIGURES["sw-cours-css"] = () => svg(320, 190, fenetre(4, 152, "Sans CSS") + fenetre(164, 152, "Avec CSS", { fond: "var(--ylang-pale)", titre: "var(--lagon)", centre: true, lien: "var(--faux)" }), "Même page sans feuille de style (noir sur blanc, titre à gauche) et avec feuille de style (fond coloré, titre centré et en bleu, lien en rouge)");
  FIGURES["sw-cours-dom"] = () => {
    const N = { html: [160, 18], head: [70, 64], body: [215, 64], title: [70, 110], h1: [150, 110], p: [210, 110], ul: [272, 110], a: [210, 156], li1: [250, 156], li2: [295, 156] };
    const L = [["html", "head"], ["html", "body"], ["head", "title"], ["body", "h1"], ["body", "p"], ["body", "ul"], ["p", "a"], ["ul", "li1"], ["ul", "li2"]];
    let s = L.map(([a, b]) => `<line x1="${N[a][0]}" y1="${N[a][1] + 10}" x2="${N[b][0]}" y2="${N[b][1] - 10}" style="stroke:var(--doux);stroke-width:1.5"/>`).join("");
    Object.entries(N).forEach(([k, [x, y]]) => { const t = k.replace(/^(li)\d$/, "$1"), w = t.length * 8 + 14; s += `<rect x="${x - w / 2}" y="${y - 10}" width="${w}" height="20" rx="4" style="fill:${["head", "title"].includes(t) ? "var(--ylang-pale)" : "var(--lagon-pale)"};stroke:${["head", "title"].includes(t) ? "var(--ylang)" : "var(--lagon)"};stroke-width:1.4"/>` + txt(x, y + 4, t, { taille: 10, mono: true }); });
    s += txt(70, 190, "pas affiché", { taille: 10, gras: false }) + txt(240, 190, "affiché dans la page", { taille: 10, gras: false });
    return svg(320, 198, s, "Arbre du document : html contient head (avec title) et body ; body contient h1, p (avec un lien a) et ul (avec deux li)");
  };
  FIGURES["sw-cours-client-serveur"] = () => svg(320, 196,
    boite(4, 8, 132, 180, [], { fond: "var(--lagon-pale)" }) + txt(70, 28, "Côté client", { taille: 12 }) + txt(70, 44, "(le navigateur)", { taille: 10, gras: false }) +
    ["affiche HTML et CSS", "exécute JavaScript", "garde cookies", "et historique"].map((t, k) => txt(70, 76 + k * 22, t, { taille: 10, gras: false })).join("") +
    boite(184, 8, 132, 180, [], { fond: "var(--ylang-pale)", trait: "var(--ylang)" }) + txt(250, 28, "Côté serveur", { taille: 12 }) + txt(250, 44, "(le site)", { taille: 10, gras: false }) +
    ["stocke les fichiers", "exécute PHP, Python…", "lit la base de données", "fabrique la page"].map((t, k) => txt(250, 76 + k * 22, t, { taille: 10, gras: false })).join("") +
    fleche(138, 150, 182, 150, { couleur: "var(--lagon)" }) + txt(160, 143, "requête", { taille: 9, gras: false }) + fleche(182, 174, 138, 174) + txt(160, 167, "page", { taille: 9, gras: false }),
    "Côté client, le navigateur affiche HTML et CSS, exécute JavaScript, garde cookies et historique ; côté serveur, le site stocke les fichiers, exécute PHP, lit la base de données et fabrique la page");
  FIGURES["sw-cours-index"] = () => tableHTML([["Mot", "Pages qui le contiennent"], ["tortue", "P1, P3"], ["lagon", "P1, P2, P3"], ["plongée", "P2"], ["corail", "P2, P3"], ["mangrove", "P4"]]);
  FIGURES["sw-cours-licences"] = () => tableHTML([["Sigle", "Signification"], ["BY", "citer l'auteur"], ["NC", "pas d'usage commercial"], ["ND", "pas de modification"], ["SA", "modifications sous la même licence"], ["CC0", "aucune condition (domaine public)"], ["©", "tous droits réservés : demander l'accord"]]);
  FIGURES["sw-cours-moteur"] = () => svg(320, 140,
    boite(4, 40, 92, 56, ["1. Explorer", "des robots", "visitent le Web"], { taille: 10, inter: 13 }) + fleche(98, 68, 112, 68) +
    boite(114, 40, 92, 56, ["2. Indexer", "mot → liste", "des pages"], { taille: 10, inter: 13, fond: "var(--ylang-pale)", trait: "var(--ylang)" }) + fleche(208, 68, 222, 68) +
    boite(224, 40, 92, 56, ["3. Classer", "à chaque", "requête"], { taille: 10, inter: 13 }) +
    txt(160, 20, "Avant les requêtes : étapes 1 et 2", { taille: 10, gras: false }) + txt(160, 124, "Classement : popularité, pertinence, ordre des mots", { taille: 10, gras: false }),
    "Un moteur de recherche : 1 explorer le Web avec des robots, 2 indexer les mots des pages, 3 classer les pages à chaque requête selon popularité, pertinence et ordre des mots");


  /* =====================================================================
     CHAPITRE : LES RÉSEAUX SOCIAUX (sr-)
     ===================================================================== */

  /* ---------- Graphes d'amitié fictifs ---------- */
  const PRENOMS = ["Anli", "Inès", "Lina", "Saïd", "Mia", "Léa", "Tom", "Naël", "Ali", "Zoé", "Hugo", "Yaya", "Rose", "Nour", "Eva", "Ilan", "Sami", "Maya", "Issa", "Kaïs"];
  function grapheAmis() {
    for (let essai = 0; essai < 200; essai++) {
      const P = pick(PLANS), n = P.pos.length;
      const idx = shuffle(P.liens.map((_, k) => k)).slice(0, rand(n, Math.min(P.liens.length, n + 3)));
      if (P.croise.some(([a, b]) => idx.includes(a) && idx.includes(b))) continue;
      const noms = shuffle(PRENOMS.slice()).slice(0, n);
      const L = idx.map((k) => [noms[P.liens[k][0]], noms[P.liens[k][1]]]);
      if (Object.keys(distances(noms, L, noms[0]).D).length < n) continue;
      const ecc = {}; noms.forEach((x) => (ecc[x] = Math.max(...Object.values(distances(noms, L, x).D))));
      return { noms, L, ecc, noeuds: P.pos.map((p, k) => ({ id: noms[k], x: p[0], y: p[1] })), V: distances(noms, L, noms[0]).V };
    }
    throw new Error("graphe introuvable");
  }
  const dessinAmis = (G, o = {}) => reseauSVG(G.noeuds.map((x) => Object.assign({}, x, { marque: (o.marque || []).includes(x.id) })), G.L, { r: 19, aria: o.aria || `Graphe d'amitié entre ${G.noms.join(", ")} ; un trait relie deux amis` });
  const AIDES_G = ["Un trait relie deux personnes amies. La **distance** entre deux personnes est le plus petit nombre de traits pour aller de l'une à l'autre.", "L'**excentricité** d'une personne est sa plus grande distance aux autres. Le **rayon** est la plus petite excentricité, le **diamètre** la plus grande, et le **centre** est formé des personnes d'excentricité minimale."];
  const tabEcc = (G) => G.noms.slice().sort().map((x) => `${x} : $${G.ecc[x]}$`).join(", ");

  def("sr-degre", () => {
    const G = grapheAmis(), t = pick(["amis", "amis", "communs", "communs", "max"]);
    const [x, y] = shuffle(G.noms.slice()), Vx = G.V[x];
    if (t === "amis") return { enonce: `Sur ce réseau social, combien d'amis a ${x} ?`, figure: dessinAmis(G, { marque: [x] }), mode: "nombre", prefixe: "Nombre d'amis :", attendu: Vx.length,
      erreurs: [{ valeur: Vx.length + 1, message: `On ne compte pas ${x} lui-même ou elle-même.` }],
      aides: [AIDES_G[0], `Compte les traits qui partent de ${x}.`, `Ses amis sont : ${Vx.slice().sort().join(", ")}.`], solution: `${x} est relié à ${Vx.slice().sort().join(", ")} : ${pluriel(Vx.length, "ami")}. En théorie des graphes, c'est le **degré** du sommet.` };
    if (t === "communs") {
      const C = Vx.filter((v) => G.V[y].includes(v));
      return { enonce: `Combien d'amis en commun ont ${x} et ${y} ?`, figure: dessinAmis(G, { marque: [x, y] }), mode: "nombre", prefixe: "Amis en commun :", attendu: C.length,
        erreurs: [{ valeur: Vx.length + G.V[y].length, message: "On cherche les personnes amies **des deux à la fois**." }],
        aides: ["Un ami en commun est relié à la fois à " + x + " et à " + y + ".", `Amis de ${x} : ${Vx.slice().sort().join(", ")}.`, `Amis de ${y} : ${G.V[y].slice().sort().join(", ")}.`],
        solution: C.length ? `Amis communs : ${C.sort().join(", ")}, soit ${pluriel(C.length, "personne")}. Les réseaux s'en servent pour proposer « des personnes que tu pourrais connaître ».` : `Aucune personne n'est amie des deux : $0$ ami en commun.` };
    }
    const deg = G.noms.map((v) => G.V[v].length), mx = Math.max(...deg), gagnants = G.noms.filter((v) => G.V[v].length === mx);
    if (gagnants.length !== 1) return null;
    const c = choix4(gagnants[0], shuffle(G.noms.filter((v) => v !== gagnants[0])));
    return { enonce: "Qui a le plus d'amis sur ce réseau ?", figure: dessinAmis(G), mode: "choix", choix: c.choix, attendu: c.attendu, aides: [AIDES_G[0], "Compte les traits qui partent de chaque personne.", "Commence par les personnes au milieu du dessin."],
      solution: `Nombre d'amis : ${G.noms.slice().sort().map((v) => `${v} : $${G.V[v].length}$`).join(", ")}. C'est **${gagnants[0]}** qui en a le plus.` };
  });
  def("sr-distance", () => {
    const G = grapheAmis(), [x, y] = shuffle(G.noms.slice()), { D, V } = distances(G.noms, G.L, x);
    if (D[y] < 2 && Math.random() < 0.7) return null;
    const ch = unChemin(V, D, x, y);
    return { enonce: `Quelle est la distance entre ${x} et ${y} ?`, figure: dessinAmis(G, { marque: [x, y] }), mode: "nombre", prefixe: "Distance :", attendu: D[y],
      erreurs: [{ valeur: D[y] - 1, message: "Tu as compté les intermédiaires ; la distance compte les traits (les liens)." }, { valeur: D[y] + 1, message: "Il existe un chemin plus court." }],
      aides: [AIDES_G[0], `Pars de ${x} : ses amis sont à distance $1$, les amis de ses amis à distance $2$…`, `Amis de ${x} : ${V[x].slice().sort().join(", ")}.`],
      solution: `Un plus court chemin : ${ch.join(" → ")}. La distance est ${m$(D[y])}${D[y] > 1 ? ` (${pluriel(D[y] - 1, "intermédiaire")})` : ""}.` };
  });
  def("sr-excentricite", () => {
    const G = grapheAmis(), x = pick(G.noms), { D } = distances(G.noms, G.L, x), loin = G.noms.filter((v) => D[v] === G.ecc[x]);
    return { enonce: `Quelle est l'**excentricité** de ${x}, c'est-à-dire sa plus grande distance à une autre personne du réseau ?`, figure: dessinAmis(G, { marque: [x] }), mode: "nombre", prefixe: "Excentricité :", attendu: G.ecc[x],
      erreurs: [{ valeur: G.V[x].length, message: "C'est le nombre d'amis ; on cherche la plus grande distance." }, { valeur: G.ecc[x] - 1, message: "Vérifie la personne la plus éloignée : il faut un trait de plus." }].filter((e) => e.valeur !== G.ecc[x]),
      aides: [AIDES_G[0], `Écris la distance de ${x} à chaque personne.`, "L'excentricité est la plus grande de ces distances."],
      solution: `Distances depuis ${x} : ${G.noms.filter((v) => v !== x).sort().map((v) => `${v} $${D[v]}$`).join(", ")}. La plus grande vaut ${m$(G.ecc[x])} (${loin.sort().join(", ")}) : c'est l'excentricité de ${x}.` };
  });
  def("sr-rayon-diametre", () => {
    const G = grapheAmis(), E = Object.values(G.ecc), r = Math.min(...E), d = Math.max(...E), centre = G.noms.filter((v) => G.ecc[v] === r).sort();
    const t = pick(["rayon", "diametre", "centre", "centre"]);
    const fig = dessinAmis(G), sol = `Excentricités : ${tabEcc(G)}. Rayon $= ${r}$ (la plus petite), diamètre $= ${d}$ (la plus grande), centre : ${centre.join(", ")}.`;
    if (t === "centre") {
      if (centre.length === 1) {
        const c = choix4(centre[0], shuffle(G.noms.filter((v) => v !== centre[0])).sort((a, b) => G.ecc[a] - G.ecc[b]));
        return { enonce: "Qui est au **centre** de ce réseau (la personne dont l'excentricité est la plus petite) ?", figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu, aides: [AIDES_G[1], "Calcule l'excentricité des personnes qui semblent au milieu du réseau.", "Le centre peut toucher tout le monde en un minimum d'étapes."], solution: sol };
      }
      return { enonce: "Combien de personnes forment le **centre** de ce réseau (personnes d'excentricité minimale) ?", figure: fig, mode: "nombre", prefixe: "Nombre de personnes :", attendu: centre.length, erreurs: [{ valeur: 1, message: "Plusieurs personnes peuvent avoir la même excentricité minimale." }],
        aides: [AIDES_G[1], "Calcule l'excentricité de chaque personne.", "Compte celles qui ont la plus petite."], solution: sol };
    }
    const att = t === "rayon" ? r : d;
    return { enonce: `Quel est le **${t === "rayon" ? "rayon" : "diamètre"}** de ce réseau ?`, figure: fig, mode: "nombre", prefixe: `${t === "rayon" ? "Rayon" : "Diamètre"} :`, attendu: att,
      erreurs: [{ valeur: t === "rayon" ? d : r, message: t === "rayon" ? "C'est le diamètre (la plus grande excentricité) ; le rayon est la plus petite." : "C'est le rayon ; le diamètre est la plus grande excentricité (la plus grande distance entre deux personnes)." }],
      aides: [AIDES_G[1], "Calcule l'excentricité de chaque personne.", t === "rayon" ? "Garde la plus petite." : "Garde la plus grande : c'est aussi la plus grande distance entre deux personnes."], solution: sol };
  });

  /* ---------- Confidentialité : qui voit ma publication ? ---------- */
  const CONF = [
    ["Ton compte est **public**. Qui peut voir tes publications ?", "n'importe qui, même sans compte", ["seulement tes amis", "seulement tes abonnés", "personne"], "Public veut dire public.", "Un compte public est visible par tout le monde, et ses publications peuvent être copiées ou retrouvées par un moteur de recherche."],
    ["Une application de quiz demande l'accès à ta liste d'amis et à tes photos. Que fais-tu ?", "je refuse : un quiz n'a pas besoin de ces données", ["j'accepte, c'est gratuit", "j'accepte, de toute façon c'est un jeu", "j'accepte puis je donne mon mot de passe"], "Demande-toi si l'application a vraiment besoin de ces données.", "Les applications tierces récupèrent souvent bien plus de données que nécessaire ; on vérifie leurs autorisations dans les paramètres."],
    ["Quel réglage limite le plus ce qu'un inconnu voit de toi ?", "passer son compte en privé", ["ajouter une photo de profil", "publier plus souvent", "activer la localisation"], "Un compte privé filtre les abonnés.", "Avec un compte privé, tu choisis qui peut te suivre et voir tes publications."],
    ["Pourquoi désactiver le partage de position en direct sur un réseau social ?", "pour qu'on ne sache pas où tu es à tout moment", ["pour avoir plus d'abonnés", "pour que les photos soient plus belles", "parce que c'est obligatoire"], "Pense à ta sécurité physique.", "Ta position en direct dit où tu habites, où tu vas au lycée, quand tu n'es pas chez toi."],
    ["Une photo de toi a été publiée par un ami sans ton accord. Que peux-tu faire ?", "lui demander de la retirer et la signaler à la plateforme si besoin", ["rien, c'est son compte", "publier une photo de lui en retour", "supprimer ton compte"], "Le droit à l'image existe aussi en ligne.", "On ne publie pas l'image de quelqu'un sans son accord ; la plateforme doit retirer un contenu signalé qui viole ce droit."],
    ["Dans les paramètres, « Qui peut m'envoyer des messages : mes amis seulement » sert à :", "éviter les messages d'inconnus", ["recevoir plus de publicités", "cacher sa photo de profil", "supprimer ses anciens messages"], "Lis bien le réglage.", "Limiter les messages aux amis protège des arnaques et du harcèlement par des inconnus."],
    ["Tu veux savoir ce qu'un réseau social sait de toi. Que fais-tu ?", "je télécharge mes données depuis les paramètres", ["je demande à un ami", "je supprime l'application", "je change mon mot de passe"], "Le RGPD te donne un droit d'accès.", "En Europe, chacun peut obtenir une copie de ses données (droit d'accès) et demander leur effacement."],
    ["Les identifications (« tags ») sur les photos :", "peuvent être soumises à ta validation dans les paramètres", ["ne se règlent pas", "sont toujours anonymes", "n'existent que sur LinkedIn"], "Cherche le réglage « Identifications ».", "On peut demander à valider chaque identification avant qu'elle apparaisse sur son profil."]
  ];
  def("sr-confidentialite", () => {
    if (Math.random() < 0.3) return banque(CONF, "", ["Les paramètres de confidentialité décident qui voit quoi : public, amis, amis d'amis, moi seul.", "Protéger ses données, c'est d'abord en montrer le moins possible aux inconnus."]);
    const G = grapheAmis(), x = pick(G.noms), { D } = distances(G.noms, G.L, x), amisAmis = Math.random() < 0.6;
    const vu = G.noms.filter((v) => v !== x && D[v] <= (amisAmis ? 2 : 1));
    return { enonce: `${x} publie une photo avec la confidentialité « **${amisAmis ? "amis de mes amis" : "amis"}** ». Combien de personnes de ce réseau, à part ${x}, peuvent la voir ?`, figure: dessinAmis(G, { marque: [x] }), mode: "nombre", prefixe: "Nombre de personnes :", attendu: vu.length,
      erreurs: [{ valeur: G.V[x].length, message: "« Amis de mes amis » ajoute les amis des amis : distance $2$." }, { valeur: G.noms.length - 1, message: "Les personnes trop éloignées (distance $3$ ou plus) ne la voient pas." }].filter((e) => e.valeur !== vu.length),
      aides: [amisAmis ? "« Amis de mes amis » : les personnes à distance $1$ ou $2$." : "« Amis » : les personnes à distance $1$.", `Amis de ${x} : ${G.V[x].slice().sort().join(", ")}.`, amisAmis ? "Ajoute les amis de ces amis, sans compter deux fois la même personne." : "Compte-les."],
      solution: `Peuvent la voir : ${vu.sort().join(", ")}, soit ${pluriel(vu.length, "personne")}.${amisAmis ? " « Amis d'amis » touche vite beaucoup de monde : sur un vrai réseau, avec $200$ amis qui en ont $200$ chacun, cela peut faire des dizaines de milliers de personnes." : ""}` };
  });

  /* ---------- Petit monde et expérience de Milgram ---------- */
  const MILGRAM = [
    ["En quelle année Stanley Milgram a-t-il réalisé son expérience du « petit monde » ?", "1967", ["1987", "2004", "1937"], "C'est bien avant Internet.", "Milgram publie son expérience en 1967 : des lettres devaient atteindre un inconnu de Boston en passant de connaissance en connaissance."],
    ["Dans l'expérience de Milgram, combien d'intermédiaires en moyenne les lettres arrivées ont-elles traversés ?", "environ $5$ (d'où « six degrés de séparation »)", ["environ $50$", "environ $500$", "aucun"], "Pense à l'expression « six degrés de séparation ».", "Les lettres arrivées étaient passées par environ $5$ intermédiaires, soit environ $6$ liens : c'est l'origine de l'expression « six degrés de séparation »."],
    ["Que devaient faire les participants de l'expérience de Milgram ?", "envoyer la lettre à une connaissance plus proche du destinataire", ["envoyer la lettre directement au destinataire", "publier la lettre dans un journal", "téléphoner au destinataire"], "Ils ne connaissaient pas le destinataire.", "Chacun envoyait la lettre à une personne qu'il connaissait personnellement et qui lui semblait plus proche du destinataire."],
    ["En 2016, Facebook a calculé la distance moyenne entre deux de ses utilisateurs. Elle valait environ :", "$3{,}5$", ["$35$", "$350$", "$0{,}5$"], "C'est encore moins que six.", "Avec plus d'un milliard d'utilisateurs, la distance moyenne mesurée était d'environ $3{,}57$ : le monde est encore plus « petit » en ligne."],
    ["Un réseau est un « petit monde » quand :", "deux personnes quelconques sont reliées par un chemin court", ["il a peu de membres", "tout le monde est ami avec tout le monde", "il est réservé à une seule ville"], "Pense au diamètre.", "Même avec des milliards de personnes, quelques intermédiaires suffisent : le diamètre (ou la distance moyenne) est petit."]
  ];
  def("sr-milgram", () => {
    const t = pick(["puissance", "puissance", "seuil", "chaine", "chaine", "banque"]);
    if (t === "banque") return banque(MILGRAM, "", ["Expérience de Milgram (1967) : des lettres passent de connaissance en connaissance jusqu'à un destinataire inconnu.", "Idée du petit monde : quelques intermédiaires suffisent à relier deux personnes."]);
    if (t === "puissance") {
      const n = pick([20, 50, 100, 150, 200, 300]), k = pick([2, 3, 3, 4]), att = n ** k;
      if (att > 1e10) return null;
      return { enonce: `On suppose que chaque personne connaît ${m$(n)} personnes, toutes différentes (pas de connaissances communes, pour simplifier). Combien de personnes peut-on atteindre en exactement ${m$(k)} étapes (amis d'amis…) ?`, mode: "nombre", prefixe: "Nombre de personnes :", attendu: att,
        erreurs: [{ valeur: n * k, message: "À chaque étape, chaque personne en touche " + n + " nouvelles : on **multiplie** par " + n + " à chaque étape." }, { valeur: k ** n > 1e15 ? -1 : k ** n, message: "C'est $" + n + "$ multiplié par lui-même $" + k + "$ fois." }],
        aides: [`Étape $1$ : $${n}$ personnes. Étape $2$ : chacune en connaît $${n}$, soit $${n} \\times ${n} = ${nb(n * n)}$.`, `En $${k}$ étapes : $${n}^{${k}}$.`, `Calcule $${n}^{${k}}$.`],
        solution: `$${n}^{${k}} = ${nb(att)}$ personnes. Le nombre grandit extrêmement vite : c'est l'idée du petit monde.` };
    }
    if (t === "seuil") {
      const n = pick([30, 50, 100, 150, 200, 500, 1000]); let k = 1; while (n ** k < 8e9) k++;
      return { enonce: `Chaque personne connaît ${m$(n)} personnes, toutes différentes. Combien d'étapes faut-il au minimum pour que le nombre de personnes atteintes dépasse la population mondiale (environ $8$ milliards) ?`, mode: "nombre", prefixe: "Nombre d'étapes :", attendu: k,
        erreurs: [{ valeur: k - 1, message: `$${n}^{${k - 1}} = ${nb(n ** (k - 1))}$ : pas encore $8$ milliards.` }],
        aides: [`En $k$ étapes on atteint $${n}^k$ personnes.`, "$8$ milliards $= 8\\,000\\,000\\,000$.", `Calcule $${n}^{${k - 1}}$ et $${n}^{${k}}$.`],
        solution: `$${n}^{${k - 1}} = ${nb(n ** (k - 1))} < 8\\,000\\,000\\,000$ mais $${n}^{${k}} = ${nb(n ** k)}$ dépasse $8$ milliards : il faut ${m$(k)} étapes. En réalité, les amis de nos amis sont souvent nos amis, donc il en faut un peu plus : environ six.` };
    }
    const noms = shuffle(PRENOMS.slice()), k = rand(2, 6), ch = noms.slice(0, k + 2), liens = pick([true, false]);
    return { enonce: `Une lettre suit la chaîne de connaissances : ${ch.join(" → ")}. Combien ${liens ? "de **liens** (passages de main en main)" : "d'**intermédiaires** (personnes entre l'expéditeur et le destinataire)"} y a-t-il ?`, mode: "nombre", prefixe: liens ? "Liens :" : "Intermédiaires :", attendu: liens ? k + 1 : k,
      erreurs: [{ valeur: liens ? k : k + 1, message: liens ? "On compte les flèches, pas les personnes du milieu." : "On ne compte pas l'expéditeur et le destinataire, seulement les personnes entre les deux." }, { valeur: k + 2, message: "On ne compte pas toutes les personnes de la chaîne." }],
      aides: ["Expéditeur : le premier ; destinataire : le dernier.", liens ? "Compte les flèches →." : "Compte les personnes entre le premier et le dernier.", `Il y a ${m$(k + 2)} personnes dans la chaîne.`],
      solution: `${m$(k + 2)} personnes, donc ${pluriel(k + 1, "lien")} et ${pluriel(k, "intermédiaire")}. Milgram mesurait environ $5$ intermédiaires, soit $6$ liens.` };
  });

  /* ---------- Modèle économique ---------- */
  const ECO = [
    ["Quelle est la principale source de revenus de la plupart des réseaux sociaux gratuits ?", "la publicité ciblée", ["les dons des utilisateurs", "les impôts", "la vente de téléphones"], "Pense à ce que tu vois entre deux publications.", "Les annonceurs paient pour montrer leurs publicités aux personnes qui les intéressent ; c'est l'essentiel des revenus."],
    ["Que signifie le slogan « Quand c'est gratuit, c'est toi le produit » ?", "tu paies avec tes données et ton attention", ["les réseaux sociaux te paient", "tu dois acheter un produit", "le service est vraiment gratuit pour tout le monde"], "Que vend le réseau aux annonceurs ?", "Le réseau vend aux annonceurs l'accès à ton attention, ciblée grâce à tes données."],
    ["Pourquoi un réseau social veut-il que tu restes le plus longtemps possible ?", "plus tu restes, plus tu vois de publicités", ["pour économiser ta batterie", "pour que tu sois plus intelligent", "parce que la loi l'oblige"], "Temps passé = publicités vues.", "Défilement infini, vidéos qui s'enchaînent, notifications : tout est fait pour capter l'attention."],
    ["Laquelle de ces données aide le plus à cibler une publicité ?", "les publications que tu aimes et le temps passé sur chacune", ["la couleur de ton téléphone", "le nombre de lettres de ton prénom", "l'heure de ton réveil"], "Qu'est-ce qui révèle tes goûts ?", "Tes « j'aime », ce que tu regardes longtemps, tes recherches et ta position permettent de deviner tes centres d'intérêt."],
    ["Quelle autre source de revenus existe sur certains réseaux sociaux ?", "les abonnements payants et les achats dans l'application", ["les amendes", "la vente d'électricité", "les cotisations obligatoires"], "Certains proposent une version « premium ».", "Abonnements (badge, fonctions en plus), cadeaux virtuels en direct, commissions sur les ventes complètent la publicité."],
    ["Un « influenceur » qui fait la promotion d'un produit contre de l'argent doit :", "l'indiquer clairement (publicité, collaboration commerciale)", ["le cacher", "ne rien dire si le produit est bon", "le dire seulement en privé"], "C'est une loi de 2023.", "En France, la loi du 9 juin 2023 oblige à signaler clairement les contenus sponsorisés."],
    ["Pourquoi un réseau social veut-il connaître ta position ?", "pour te montrer des publicités de commerces proches", ["pour t'envoyer du courrier", "pour régler l'heure", "pour mesurer ta vitesse de connexion"], "Pense aux publicités « près de chez toi ».", "La position est une donnée très précieuse pour la publicité locale."],
    ["Un réseau social vaut des centaines de milliards d'euros alors qu'il est gratuit, parce que :", "il possède l'attention et les données de milliards d'utilisateurs", ["il vend des ordinateurs", "l'État le finance", "ses utilisateurs paient chaque message"], "Que vend-il ?", "Sa valeur vient du nombre d'utilisateurs et de ce qu'il sait d'eux, qui permet une publicité très ciblée."],
    ["Les séries de jours consécutifs (« flammes ») servent surtout à :", "te faire revenir chaque jour sur l'application", ["mesurer ton niveau scolaire", "économiser des données", "protéger ton compte"], "Que se passe-t-il si tu rates un jour ?", "La peur de perdre sa série pousse à ouvrir l'application tous les jours : plus de temps, plus de publicités."],
    ["Qui paie vraiment un réseau social gratuit ?", "les annonceurs", ["les utilisateurs, en euros", "l'État", "les opérateurs téléphoniques"], "Qui achète les espaces de publicité ?", "Ce sont les annonceurs qui paient ; les utilisateurs « paient » en attention et en données."]
  ];
  def("sr-economie", () => {
    const t = pick(["banque", "banque", "arpu", "cpm", "pubs"]);
    if (t === "banque") return banque(ECO, "", ["Modèle économique : le service est gratuit, les annonceurs paient pour atteindre les utilisateurs.", "Plus le réseau connaît ses utilisateurs, plus la publicité est ciblée… et chère."]);
    if (t === "arpu") {
      const U = pick([0.5, 1, 2, 2.5, 3, 4]), a = pick([10, 12, 15, 20, 25, 30, 40, 45, 50]), R = U * a;
      return { enonce: `Un réseau social (fictif) a ${m$(U)} milliard${U >= 2 ? "s" : ""} d'utilisateurs et gagne ${m$(R)} milliards d'euros par an grâce à la publicité. Combien gagne-t-il en moyenne par utilisateur et par an ?`, mode: "nombre", prefixe: "Par utilisateur :", suffixe: "€", attendu: a,
        erreurs: [{ valeur: R * U, message: "On partage les revenus entre les utilisateurs : c'est une division." }, { valeur: +(U / R).toFixed(6), message: "Revenus $\\div$ nombre d'utilisateurs, pas l'inverse." }],
        aides: ["Revenu moyen par utilisateur $=$ revenus $\\div$ nombre d'utilisateurs.", "Les deux sont en milliards : les milliards se simplifient.", `Calcule $${nb(R)} \\div ${nb(U)}$.`],
        solution: `$${nb(R)}$ milliards $\\div ${nb(U)}$ milliard${U >= 2 ? "s" : ""} $= ${nb(a)}$ € par utilisateur et par an. Chaque utilisateur « rapporte » donc environ ${m$(a)} € de publicité.` };
    }
    if (t === "cpm") {
      const c = pick([2, 3, 4, 5, 6, 8, 10]), N = pick([10, 20, 50, 100, 200, 500]) * 1000;
      return { enonce: `Une marque paie ${m$(c)} € pour $1\\,000$ affichages de sa publicité. Combien paie-t-elle pour ${m$(N)} affichages ?`, mode: "nombre", prefixe: "Coût :", suffixe: "€", attendu: (c * N) / 1000,
        erreurs: [{ valeur: c * N, message: `Le prix ${m$(c)} € est pour $1\\,000$ affichages, pas pour un seul.` }],
        aides: ["C'est une situation de proportionnalité.", `$${nb(N)}$ affichages, c'est $${nb(N / 1000)}$ fois $1\\,000$ affichages.`, `Calcule $${nb(N / 1000)} \\times ${c}$.`],
        solution: `$${nb(N)} \\div 1\\,000 = ${nb(N / 1000)}$, et $${nb(N / 1000)} \\times ${c} = ${nb((c * N) / 1000)}$ €.` };
    }
    const h = pick([1, 2, 3]), mi = pick([0, 30]), k = pick([2, 3, 5, 6]), T = h * 60 + mi;
    if (T % k) return null;
    return { enonce: `Ibrahim passe ${m$(h)} h${mi ? ` ${m$(mi)}` : ""} par jour sur un réseau social. Une publicité apparaît en moyenne toutes les ${m$(k)} minutes. Combien de publicités voit-il par jour ?`, mode: "nombre", prefixe: "Publicités :", attendu: T / k,
      erreurs: [{ valeur: T * k, message: "On cherche combien de fois " + k + " minutes « entrent » dans le temps passé : division." }, { valeur: (h * 100 + mi) / k, message: "Une heure fait $60$ minutes, pas $100$." }],
      aides: ["Convertis le temps en minutes.", `${m$(h)} h${mi ? ` ${m$(mi)}` : ""} $= ${T}$ minutes.`, `Calcule $${T} \\div ${k}$.`],
      solution: `$${T} \\div ${k} = ${T / k}$ publicités par jour, soit environ ${m$((T / k) * 365)} par an. C'est ce temps d'attention que le réseau vend aux annonceurs.` };
  });

  /* ---------- Identité numérique, traces, authentification ---------- */
  const TRACES = [
    ["tu publies une photo de ton anniversaire", 0], ["tu écris un commentaire sous une vidéo", 0], ["tu mets un « j'aime » sous une publication", 0], ["tu remplis ta biographie sur ton profil", 0], ["tu partages une vidéo dans ta story", 0], ["tu changes ta photo de profil", 0], ["tu réponds à un sondage dans une story", 0], ["tu rejoins un groupe public", 0],
    ["l'application enregistre ta position quand tu te déplaces", 1], ["le réseau note combien de temps tu regardes chaque vidéo", 1], ["un site enregistre ton adresse IP et ton navigateur", 1], ["un moteur de recherche garde l'historique de tes recherches", 1], ["un cookie te suit de site en site", 1], ["ton téléphone envoie la liste de tes applications installées", 1], ["une enceinte connectée enregistre tes demandes vocales", 1], ["la carte de fidélité d'un magasin enregistre tes achats", 1],
    ["un ami t'identifie sur une photo de soirée", 2], ["une camarade publie une vidéo de la classe où tu apparais", 2], ["le club de foot met ton nom dans les résultats en ligne", 2], ["un article du journal local cite ton nom", 2], ["un camarade te mentionne dans un commentaire", 2], ["le lycée publie la photo de classe sur son site", 2],
    ["tu discutes avec un ami dans la cour, sans téléphone", 3], ["tu écris dans ton journal intime en papier", 3], ["tu lis un livre papier à la maison", 3]
  ];
  const TYPES_T = ["une trace volontaire (que tu laisses toi-même)", "une trace involontaire (enregistrée sans que tu t'en rendes compte)", "une trace laissée par quelqu'un d'autre", "aucune trace numérique"];
  const IDENTITE = [
    ["L'identité numérique, c'est :", "l'ensemble des traces qu'on laisse en ligne", ["seulement son pseudo", "seulement son mot de passe", "sa carte d'identité scannée"], "Pense à tout ce qu'on trouve sur toi en ligne.", "Profils, publications, commentaires, photos où l'on apparaît, données enregistrées : tout cela forme l'identité numérique."],
    ["L'e-réputation, c'est :", "l'image qu'une personne ou une entreprise a sur Internet", ["la vitesse de sa connexion", "le nombre de ses appareils", "le prix de son abonnement"], "« e » comme électronique.", "C'est ce que les autres pensent de toi en voyant ce qu'on trouve en ligne : un futur employeur peut chercher ton nom."],
    ["S'identifier, c'est :", "dire qui on est (donner son identifiant)", ["prouver qui on est", "créer un compte", "changer de mot de passe"], "Identifier, c'est nommer.", "L'identification annonce l'identité (identifiant, adresse électronique) ; l'authentification la prouve."],
    ["S'authentifier, c'est :", "prouver qu'on est bien la personne annoncée (mot de passe, code reçu…)", ["dire son nom", "publier une photo", "accepter les cookies"], "Authentique veut dire vrai.", "Mot de passe, code reçu par SMS, empreinte digitale : ce sont des moyens d'authentification."],
    ["La double authentification consiste à :", "demander en plus du mot de passe un code reçu sur un autre appareil", ["écrire deux fois son mot de passe", "avoir deux comptes", "utiliser deux navigateurs"], "Deux preuves valent mieux qu'une.", "Même si le mot de passe est volé, le pirate n'a pas le code envoyé sur ton téléphone : le compte reste protégé."],
    ["Pour qu'un mot de passe soit robuste, il vaut mieux :", "qu'il soit long, sans mot du dictionnaire ni information personnelle", ["qu'il contienne ton prénom et ta date de naissance", "qu'il soit le même partout", "qu'il soit court pour s'en souvenir"], "La longueur compte beaucoup.", "Une phrase de passe longue (plusieurs mots au hasard) est difficile à deviner et facile à retenir ; un mot de passe différent par site."],
    ["Un faux compte qui utilise le nom et les photos de quelqu'un d'autre, c'est :", "une usurpation d'identité, punie par la loi", ["un pseudonyme autorisé", "une blague sans conséquence", "un compte certifié"], "Se faire passer pour quelqu'un…", "L'usurpation d'identité en ligne est un délit (article 226-4-1 du code pénal) : 1 an de prison et 15 000 € d'amende."],
    ["Tu veux faire supprimer de vieilles publications gênantes. Quel droit t'aide ?", "le droit à l'effacement (droit à l'oubli)", ["le droit de vote", "le droit d'auteur", "le droit du travail"], "Ce droit vient du RGPD.", "Le RGPD permet de demander l'effacement de ses données, renforcé pour ce qui a été publié quand on était mineur. La CNIL peut aider."],
    ["Une photo publiée « pour rire » à 14 ans peut-elle gêner plus tard ?", "oui : elle peut être copiée et retrouvée des années après", ["non, tout s'efface au bout d'un an", "non, les photos ne sont pas des données", "seulement si elle est en couleur"], "Pense aux captures d'écran et aux moteurs de recherche.", "Ce qui est publié peut être copié, partagé, archivé : l'e-réputation se construit dès maintenant."],
    ["Pourquoi utiliser un pseudonyme plutôt que son vrai nom sur un réseau de jeux ?", "pour limiter ce qu'un inconnu peut apprendre sur soi", ["parce que c'est obligatoire", "pour gagner plus de points", "pour que le réseau ne collecte aucune donnée"], "Que voit un inconnu ?", "Un pseudonyme protège l'identité civile ; le réseau, lui, collecte quand même des données."],
    ["Un message te demande ton mot de passe « pour vérifier ton compte ». C'est :", "une tentative d'hameçonnage : aucun service ne demande ton mot de passe ainsi", ["une procédure normale", "un message de la CNIL", "une obligation légale"], "Un service sérieux ne demande jamais ton mot de passe.", "On ne donne jamais son mot de passe, même à un ami ou à un faux « support technique »."],
    ["Que trouve un employeur en tapant ton nom dans un moteur de recherche ?", "ton identité numérique publique : profils, photos, commentaires publics", ["rien, c'est interdit", "seulement ton CV", "seulement tes notes du lycée"], "Ce qui est public est visible par tous.", "D'où l'intérêt de vérifier régulièrement ce qu'on trouve sur soi et de régler sa confidentialité."],
    ["Quel organisme français protège les données personnelles ?", "la CNIL", ["la SNCF", "le CNES", "l'INSEE"], "Commission nationale de l'informatique et des libertés.", "La CNIL conseille, contrôle les entreprises et reçoit les plaintes des citoyens."]
  ];
  def("sr-identite", () => {
    if (Math.random() < 0.5) return banque(IDENTITE, "", ["Identité numérique : tout ce qu'on peut savoir de toi en ligne. Identification : dire qui on est ; authentification : le prouver.", "Le RGPD et la CNIL protègent tes données personnelles."]);
    const [a, k] = pick(TRACES), c = choix4(TYPES_T[k], TYPES_T.filter((_, j) => j !== k));
    return { enonce: `Quand ${a}, cela laisse :`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Trace volontaire : ce que tu publies toi-même. Trace involontaire : ce que les services enregistrent sur toi. Trace héritée : ce que les autres publient sur toi.", "Demande-toi qui agit : toi, une machine, ou une autre personne ?", "Sans appareil connecté, rien n'est enregistré en ligne."],
      solution: `C'est ${TYPES_T[k]}. ${["Tu choisis de la laisser, mais elle peut être copiée et rester très longtemps.", "Les services numériques enregistrent beaucoup de choses sans le dire clairement : c'est pour cela qu'il faut régler ses paramètres.", "Ton identité numérique dépend aussi des autres : on peut leur demander de retirer un contenu.", "Rien n'est enregistré par un service numérique."][k]}` };
  });

  /* ---------- Mots de passe : combien de possibilités ? ---------- */
  const MOTS_PHRASE = ["Mangue", "Lagon", "Baobab", "Tortue", "Volcan", "Ylang", "Pirogue", "Corail", "Mangrove", "Dauphin", "Vanille", "Coco"];
  def("sr-motdepasse", () => {
    const t = pick(["code", "code", "temps", "robuste", "robuste", "lettres"]);
    if (t === "code") {
      const L = pick([3, 4, 5, 6, 7, 8]);
      return { enonce: `Un code n'utilise que des chiffres de $0$ à $9$ et compte ${m$(L)} chiffres. Combien de codes différents existe-t-il ?`, mode: "nombre", prefixe: "Nombre de codes :", attendu: 10 ** L,
        erreurs: [{ valeur: 10 * L, message: "Chaque chiffre a $10$ possibilités et elles se **multiplient**." }, { valeur: 10 ** L - 1, message: "On compte aussi le code avec que des $0$." }],
        aides: ["Pour le premier chiffre : $10$ possibilités ; pour chacune, $10$ pour le deuxième…", `Il y a donc $10^{${L}}$ codes.`, `$10^{${L}} = 1$ suivi de $${L}$ zéros.`],
        solution: `$10 \\times 10 \\times \\dots$ ($${L}$ fois) $= 10^{${L}} = ${nb(10 ** L)}$ codes.` };
    }
    if (t === "temps") {
      const L = pick([4, 6]), v = pick([1, 10, 100, 1000]), att = 10 ** L / v;
      return { enonce: `Un pirate essaie tous les codes de ${m$(L)} chiffres, au rythme de ${m$(v)} essai${v > 1 ? "s" : ""} par seconde. Combien de secondes lui faut-il **au maximum** ?`, mode: "nombre", prefixe: "Temps :", suffixe: "s", attendu: att,
        erreurs: [{ valeur: 10 ** L * v, message: "Temps $=$ nombre d'essais $\\div$ vitesse." }],
        aides: [`Il y a $10^{${L}} = ${nb(10 ** L)}$ codes possibles.`, `Il en teste $${nb(v)}$ par seconde.`, `Calcule $${nb(10 ** L)} \\div ${nb(v)}$.`],
        solution: `$${nb(10 ** L)} \\div ${nb(v)} = ${nb(att)}$ s${att >= 3600 ? `, soit environ ${m$(Math.round(att / 3600))} h` : att >= 120 ? `, soit environ ${m$(Math.round(att / 60))} min` : ""}. C'est pour cela que les téléphones bloquent après quelques erreurs.` };
    }
    if (t === "lettres") {
      const [c, nom] = pick([[26, "lettres minuscules"], [52, "lettres minuscules et majuscules"], [62, "lettres minuscules, majuscules et chiffres"]]), L = pick([6, 8, 10, 12]);
      const cf = choix4(`$${c}^{${L}}$`, [`$${L}^{${c}}$`, `$${c} \\times ${L}$`, `$${c} + ${L}$`, `$${L}^{2}$`]);
      return { enonce: `Un mot de passe de ${m$(L)} caractères utilise des ${nom} (${m$(c)} caractères possibles). Combien y a-t-il de mots de passe possibles ?`, mode: "choix", choix: cf.choix, attendu: cf.attendu,
        aides: [`Chaque caractère a $${c}$ possibilités.`, "Les possibilités des différents caractères se multiplient.", `$${c}$ multiplié par lui-même $${L}$ fois.`],
        solution: `$${c} \\times ${c} \\times \\dots$ ($${L}$ fois) $= ${c}^{${L}}$, soit environ $${(c ** L).toExponential(1).replace(".", "{,}").replace(/e\+(\d+)/, " \\times 10^{$1}")}$. Ajouter des caractères possibles et surtout allonger le mot de passe fait exploser ce nombre.` };
    }
    const m = shuffle(MOTS_PHRASE.slice()), p = shuffle(PRENOMS.slice())[0];
    const fort = `${m[0]}-${m[1]}-${rand(10, 99)}-${m[2]}!`;
    const c = choix4(cd(fort), shuffle([cd("azerty"), cd("123456789"), cd(p + "2010"), cd("motdepasse"), cd(p.toLowerCase() + rand(1, 31)), cd(m[3].toLowerCase()), cd("Mayotte976")]));
    return { enonce: "Lequel de ces mots de passe est le plus **robuste** ?", mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Les pirates essaient d'abord les mots de passe courants, les mots du dictionnaire et les prénoms avec des dates.", "Plus un mot de passe est long et varié, plus il y a de possibilités.", "Une suite de plusieurs mots au hasard, avec chiffres et symboles, est à la fois longue et facile à retenir."],
      solution: `${cd(fort)} : ${m$(fort.length)} caractères, plusieurs mots sans lien, des chiffres et des symboles. Les autres sont courts, courants (\`azerty\`, \`123456789\`) ou faciles à deviner (prénom, date, mot du dictionnaire).` };
  });

  /* ---------- Bulle de filtre ---------- */
  const THEMES_F = ["foot", "musique", "jeux vidéo", "cuisine", "sciences", "humour", "mode", "actualité"];
  const BULLE = [
    ["Pourquoi ton fil d'actualité ne ressemble-t-il pas à celui de ton voisin ?", "il dépend de tes amis, de tes abonnements et de tes « j'aime »", ["c'est le hasard total", "tout le monde voit le même fil", "il dépend de la marque du téléphone"], "Qui choisit ce que tu vois ?", "L'algorithme du réseau choisit les publications selon tes relations et tes réactions passées."],
    ["Une bulle de filtre, c'est :", "le fait de ne plus voir que des contenus proches de ce qu'on aime déjà", ["un filtre photo", "une application anti-virus", "un groupe de discussion privé"], "On s'enferme sans s'en rendre compte.", "En montrant surtout ce qui nous plaît, l'algorithme réduit la diversité des points de vue."],
    ["Comment sortir un peu de sa bulle de filtre ?", "suivre des sources variées et chercher activement d'autres points de vue", ["liker encore plus les mêmes contenus", "ne suivre que ses amis proches", "désactiver son écran"], "Varier ses abonnements.", "Diversifier ses sources, comparer plusieurs médias, utiliser le fil « chronologique » quand il existe."],
    ["Pourquoi une fausse information circule-t-elle souvent plus vite qu'une vraie ?", "elle provoque plus d'émotion, donc plus de partages", ["elle est vérifiée par l'algorithme", "elle est plus courte à télécharger", "les réseaux la mettent en avant volontairement par erreur"], "Qu'est-ce que l'algorithme favorise ?", "Les contenus qui choquent ou font réagir sont plus partagés, et l'algorithme met en avant ce qui fait réagir."],
    ["Avant de partager une information choquante, il faut :", "vérifier sa source et la chercher sur d'autres sites fiables", ["la partager vite pour prévenir tout le monde", "regarder seulement le nombre de « j'aime »", "faire confiance à l'ami qui l'a envoyée"], "Qui l'a publiée en premier ?", "Une information vérifiée vient d'une source identifiable et est reprise par des médias sérieux."]
  ];
  def("sr-bulle", () => {
    if (Math.random() < 0.25) return banque(BULLE, "", ["Ton fil est choisi par un algorithme à partir de tes amis, de tes abonnements et de tes réactions.", "Plus tu réagis à un type de contenu, plus tu en vois : c'est la bulle de filtre."]);
    const T = shuffle(THEMES_F.slice()).slice(0, 3), l = [rand(2, 9), rand(1, 6), rand(1, 5)], tot = l[0] + l[1] + l[2], N = tot * pick([2, 3, 4, 5, 6]);
    const k = rand(0, 2);
    const fig = tableHTML([["Thème", "Tes « j'aime » cette semaine"]].concat(T.map((x, j) => [x, String(l[j])])));
    return { enonce: `L'algorithme d'un réseau (fictif) remplit ton fil proportionnellement à tes « j'aime » de la semaine. Sur tes ${m$(N)} prochaines publications, combien parleront de **${T[k]}** ?`, figure: fig, mode: "nombre", prefixe: "Publications :", attendu: (N * l[k]) / tot,
      erreurs: [{ valeur: l[k], message: "On applique la proportion des « j'aime » au nombre de publications." }, { valeur: N / 3, message: "Les thèmes ne sont pas à égalité : ils dépendent de tes « j'aime »." }].filter((e) => Math.abs(e.valeur - (N * l[k]) / tot) > 1e-9),
      aides: [`En tout : $${l.join(" + ")} = ${tot}$ « j'aime ».`, `Proportion de ${T[k]} : $\\dfrac{${l[k]}}{${tot}}$.`, `Calcule $${N} \\times ${l[k]} \\div ${tot}$.`],
      solution: `$${N} \\times \\dfrac{${l[k]}}{${tot}} = ${nb((N * l[k]) / tot)}$ publications. Plus tu aimes un thème, plus il prend de place : ton fil se resserre sur lui.` };
  });

  /* ---------- Cyberviolence : formes, loi, ressources ---------- */
  const CYBER = [
    ["Des messages moqueurs répétés sont envoyés chaque jour à un élève sur une messagerie.", "le cyberharcèlement"], ["Des dizaines de comptes inconnus inondent de commentaires insultants la publication d'une personne, chacun une seule fois.", "le harcèlement en meute (raid numérique)"], ["Quelqu'un crée un faux profil avec le nom et les photos d'une camarade pour publier à sa place.", "l'usurpation d'identité"], ["Une photo intime envoyée en privé est partagée à toute la classe sans l'accord de la personne.", "la diffusion d'images intimes sans consentement"],
    ["Un inconnu menace de publier une photo intime si on ne lui envoie pas d'argent ou d'autres photos.", "la sextorsion (chantage)"], ["Des commentaires visent une personne à cause de sa couleur de peau, de sa religion ou de son origine.", "les propos discriminatoires (haineux)"], ["Une bagarre est filmée et la vidéo est publiée pour humilier la victime.", "le happy slapping (vidéo d'agression)"], ["Quelqu'un publie l'adresse et le numéro de téléphone d'une personne pour qu'on vienne l'embêter.", "la divulgation de données personnelles (doxing)"],
    ["Un groupe de discussion est créé exprès pour se moquer d'un élève qui n'en fait pas partie.", "le cyberharcèlement"], ["On envoie des messages ou photos à caractère sexuel à quelqu'un qui n'a rien demandé.", "l'envoi de contenus sexuels non sollicités"]
  ];
  const FORMES = [...new Set(CYBER.map((c) => c[1]))];
  const PEINES = ["1 an de prison et 15 000 € d'amende", "2 ans de prison et 30 000 € d'amende", "3 ans de prison et 45 000 € d'amende", "10 ans de prison et 150 000 € d'amende"];
  const CAS_LOI = [
    ["Un adulte harcèle un collègue par des messages répétés, sans passer par Internet, sans incapacité de travail.", 0, "C'est le cas de base de l'article 222-33-2-2."],
    ["Un adulte harcèle un autre adulte par des messages répétés sur un réseau social.", 1, "L'utilisation d'un service en ligne est une circonstance aggravante."],
    ["Un adulte harcèle un adolescent de 14 ans, en face à face.", 1, "Une victime mineure est une circonstance aggravante."],
    ["Un adulte harcèle un adolescent de 15 ans sur un réseau social.", 2, "Deux circonstances aggravantes : victime mineure et service en ligne."],
    ["Un adulte harcèle en ligne une personne âgée dont la fragilité est connue.", 2, "Deux circonstances : personne vulnérable et service en ligne."],
    ["Un élève est harcelé par des élèves de son lycée et fait une tentative de suicide.", 3, "Harcèlement scolaire (article 222-33-2-3) ayant conduit à une tentative de suicide."]
  ];
  const RESSOURCES = [
    ["Quel numéro gratuit et anonyme appeler en cas de harcèlement ou de cyberharcèlement ?", "le 3018", ["le 18", "le 112", "le 3615"], "Numéro national contre le harcèlement.", "Le 3018 (gratuit, anonyme, 7 jours sur 7, aussi par tchat et application) aide les victimes et les témoins, et peut faire supprimer des contenus."],
    ["Sur quelle plateforme de l'État signaler un contenu illicite en ligne (menaces, haine, pédocriminalité) ?", "Pharos", ["Pronote", "Parcoursup", "Ameli"], "Plateforme de la police et de la gendarmerie.", "internet-signalement.gouv.fr (Pharos) transmet les signalements à des enquêteurs."],
    ["Tu es victime de messages humiliants. Quelle est la **première** chose utile à faire ?", "garder des preuves (captures d'écran) et en parler à un adulte de confiance", ["répondre par des insultes", "tout supprimer immédiatement", "ne rien dire à personne"], "Il faudra pouvoir prouver.", "Captures d'écran avec la date et le nom du compte, puis en parler : parents, CPE, professeur, infirmière, 3018. Ensuite bloquer et signaler."],
    ["Tu es témoin d'un cyberharcèlement dans un groupe de ta classe. Que fais-tu ?", "je ne partage pas, je soutiens la victime et je préviens un adulte", ["je like pour rester dans le groupe", "je partage pour que tout le monde soit au courant", "je ne fais rien, ce n'est pas mon problème"], "Le témoin a un vrai pouvoir.", "Liker ou partager, c'est participer. Soutenir la victime et alerter un adulte peut tout arrêter."],
    ["Que permet le bouton « Signaler » d'un réseau social ?", "demander à la plateforme de retirer un contenu ou un compte qui enfreint ses règles", ["envoyer le contenu à tous ses amis", "rendre le contenu plus visible", "porter plainte automatiquement"], "La plateforme a des obligations.", "Les plateformes doivent traiter les signalements ; en Europe, le règlement sur les services numériques (DSA) renforce ces obligations."],
    ["Qui peut porter plainte pour cyberharcèlement ?", "la victime (avec ses parents si elle est mineure), au commissariat ou à la gendarmerie", ["seulement un avocat", "seulement le lycée", "personne si le harceleur est mineur"], "Un mineur peut être poursuivi.", "On peut porter plainte même contre un harceleur mineur ; les preuves (captures) sont précieuses."]
  ];
  def("sr-cyber", () => {
    const t = pick(["forme", "forme", "loi", "ressource", "ressource"]);
    if (t === "ressource") return banque(RESSOURCES, "", ["Contre la cyberviolence : garder des preuves, en parler, bloquer, signaler, appeler le 3018.", "Victime ou témoin, on n'est jamais seul : adultes du lycée, parents, 3018, Pharos."]);
    if (t === "loi") {
      const [cas, k, ex] = pick(CAS_LOI), c = choix4(PEINES[k], PEINES.filter((_, j) => j !== k));
      return { enonce: `${cas} Quelle peine maximale l'auteur, majeur, encourt-il ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Article 222-33-2-2 du code pénal : 1 an et 15 000 € ; 2 ans et 30 000 € avec une circonstance aggravante (victime mineure, personne vulnérable, service en ligne…) ; 3 ans et 45 000 € avec deux circonstances.", "Le harcèlement scolaire (article 222-33-2-3) va jusqu'à 10 ans et 150 000 € s'il conduit la victime au suicide ou à une tentative.", "Compte les circonstances aggravantes."],
        solution: `**${PEINES[k]}**. ${ex} (Un auteur mineur encourt en principe la moitié de ces peines, mais il peut être jugé.)` };
    }
    const [s, f] = pick(CYBER), c = choix4(f, shuffle(FORMES.filter((x) => x !== f)));
    return { enonce: `${s} De quelle forme de cyberviolence s'agit-il ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Harcèlement : des actes répétés (ou commis par plusieurs personnes) qui dégradent la vie de la victime.", "Repère ce qui est fait : répéter, se faire passer pour quelqu'un, diffuser une image, menacer, discriminer…", "Toutes ces formes sont punies par la loi."],
      solution: `C'est **${f}**. Toutes les formes de cyberviolence sont des délits ; la victime peut porter plainte, et le 3018 aide victimes et témoins.` };
  });

  /* ---------- Les réseaux sociaux existants ---------- */
  // [nom, caractéristique, année de création, palier d'utilisateurs (0 : plusieurs milliards, 1 : plus d'un milliard, 2 : quelques centaines de millions, 3 : une à deux centaines de millions)]
  const RS = [["Facebook", "des profils, des amis et des groupes, créé dans une université américaine", 2004, 0], ["YouTube", "des vidéos longues publiées sur des chaînes", 2005, 0], ["WhatsApp", "une messagerie chiffrée de bout en bout, avec des groupes", 2009, 0], ["Instagram", "des photos, des stories et des vidéos courtes (Reels)", 2010, 0], ["TikTok", "des vidéos courtes verticales choisies par un algorithme très puissant", 2016, 1], ["Snapchat", "des messages et des photos éphémères qui disparaissent après lecture", 2011, 2], ["LinkedIn", "un réseau professionnel : CV, recrutement, contacts de travail", 2003, 2], ["X (ex-Twitter)", "des messages courts publics, racheté par Elon Musk en 2022", 2006, 2], ["Pinterest", "des tableaux d'images épinglées pour trouver des idées", 2010, 2], ["Discord", "des serveurs de discussion écrite et vocale pour des communautés", 2015, 3], ["Twitch", "la diffusion de jeux vidéo et d'émissions en direct", 2011, 3]];
  const PALIERS = ["plusieurs milliards d'utilisateurs", "plus d'un milliard d'utilisateurs", "quelques centaines de millions d'utilisateurs", "une à deux centaines de millions d'utilisateurs"];
  def("sr-reseaux", () => {
    const t = pick(["carac", "nom", "ancien", "plus", "ordre"]);
    if (t === "carac" || t === "nom") {
      const r = pick(RS), aut = shuffle(RS.filter((x) => x !== r));
      const c = t === "carac" ? choix4(r[0], aut.map((x) => x[0])) : choix4(r[1], aut.map((x) => x[1]));
      return { enonce: t === "carac" ? `Quel réseau social est connu pour ${r[1]} ?` : `Qu'est-ce qui caractérise ${r[0]} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Chaque réseau social a sa spécialité : messages, photos, vidéos courtes ou longues, travail, direct…", "Pense à ce qu'on y publie le plus souvent.", "Élimine ceux que tu connais bien."], solution: `**${r[0]}** (créé en ${r[2]}) : ${r[1]}.` };
    }
    if (t === "ancien") {
      let E; do { E = shuffle(RS.slice()).slice(0, 4); } while (new Set(E.map((x) => x[2])).size < 4);
      const tri = E.slice().sort((a, b) => a[2] - b[2]), c = choix4(tri[0][0], tri.slice(1).map((x) => x[0]));
      return { enonce: "Lequel de ces réseaux sociaux est le plus **ancien** ?", mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Les premiers grands réseaux datent du début des années 2000.", "TikTok et Discord sont parmi les plus récents.", "Facebook date de 2004."], solution: `Dans l'ordre : ${tri.map((x) => `${x[0]} (${x[2]})`).join(", ")}.` };
    }
    if (t === "plus") {
      for (let k = 0; k < 50; k++) {
        const E = shuffle(RS.slice()).slice(0, 4), tri = E.slice().sort((a, b) => a[3] - b[3]);
        if (tri[1][3] - tri[0][3] < 2) continue;
        const c = choix4(tri[0][0], tri.slice(1).map((x) => x[0]));
        return { enonce: "Lequel de ces réseaux sociaux a le **plus d'utilisateurs** dans le monde ?", mode: "choix", choix: c.choix, attendu: c.attendu,
          aides: ["Les plus grands réseaux comptent plusieurs milliards d'utilisateurs chaque mois, pour environ $8$ milliards d'humains.", "Les réseaux de Meta (Facebook, Instagram, WhatsApp) et YouTube sont les plus utilisés.", "Les réseaux spécialisés (travail, direct, communautés) sont plus petits."],
          solution: `${tri[0][0]} a ${PALIERS[tri[0][3]]}. Les autres : ${tri.slice(1).map((x) => `${x[0]} (${PALIERS[x[3]]})`).join(" ; ")}. Ordres de grandeur annoncés par les entreprises en 2025.` };
      }
      return null;
    }
    const r = pick(RS.filter((x) => x[3] === 0 || x[3] === 3)), V = r[3] === 0 ? ["environ $3$ milliards", "environ $3$ millions", "environ $30\\,000$", "environ $300$ milliards"] : ["environ $200$ millions", "environ $2\\,000$", "environ $20$ milliards", "environ $200\\,000$"];
    const c = choix4(V[0], V.slice(1));
    return { enonce: `Quel est l'ordre de grandeur du nombre d'utilisateurs de ${r[0]} chaque mois dans le monde ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["La Terre compte environ $8$ milliards d'habitants : aucun réseau ne peut avoir plus d'utilisateurs.", r[3] === 0 ? "C'est l'un des plus grands réseaux du monde." : "C'est un réseau plus spécialisé.", "Élimine les nombres beaucoup trop petits pour un réseau mondial."],
      solution: `${r[0]} : ${V[0].replace(/\$/g, "")} d'utilisateurs par mois (ordre de grandeur annoncé en 2025).`.replace(/(\d) (\d{3})/g, "$1 $2") };
  });

  /* ---------- Vrai ou faux : réseaux sociaux ---------- */
  const VF_RS = [
    ["Une publication supprimée peut avoir été copiée par d'autres avant.", true, "Captures d'écran, partages, archives : ce qui est publié peut circuler sans nous."],
    ["La plupart des réseaux sociaux gratuits vivent de la publicité ciblée.", true, "Les annonceurs paient pour atteindre les utilisateurs grâce à leurs données."],
    ["Le fil d'actualité dépend des amis et des « j'aime » de chacun.", true, "L'algorithme personnalise ce qu'il montre."],
    ["Dans un « petit monde », deux personnes sont reliées par peu d'intermédiaires.", true, "Environ six liens dans l'expérience de Milgram, moins de quatre sur Facebook."],
    ["La double authentification protège un compte même si le mot de passe est volé.", true, "Il faut aussi le code reçu sur un autre appareil."],
    ["Le cyberharcèlement est puni par la loi, même s'il est commis par plusieurs personnes qui n'agissent qu'une fois chacune.", true, "L'article 222-33-2-2 vise aussi le harcèlement en meute."],
    ["Le 3018 est un numéro gratuit et anonyme contre le harcèlement.", true, "Il aide les victimes et les témoins, 7 jours sur 7."],
    ["En Europe, on peut demander à un réseau social une copie de ses données.", true, "C'est le droit d'accès du RGPD."],
    ["Le rayon d'un graphe est inférieur ou égal à son diamètre.", true, "Le rayon est la plus petite excentricité, le diamètre la plus grande."],
    ["Liker ou partager un message humiliant, c'est participer au harcèlement.", true, "Le témoin qui relaie amplifie la violence."],
    ["Un compte privé rend ses publications invisibles même pour ses abonnés acceptés.", false, "Les abonnés acceptés voient les publications ; ce sont les inconnus qui ne les voient pas."],
    ["Ce qui est publié en story disparaît définitivement de partout après 24 h.", false, "Une capture d'écran suffit à la garder ; la plateforme peut aussi la conserver."],
    ["Un réseau social gratuit ne gagne pas d'argent.", false, "Il gagne beaucoup d'argent avec la publicité et les données."],
    ["Tout le monde voit le même fil d'actualité.", false, "Chaque fil est personnalisé par l'algorithme."],
    ["Le centre d'un graphe est toujours formé d'une seule personne.", false, "Plusieurs personnes peuvent avoir la même excentricité minimale."],
    ["Un mot de passe court mais avec un symbole est toujours plus sûr qu'une longue phrase de passe.", false, "La longueur augmente beaucoup plus le nombre de possibilités."],
    ["Un harceleur mineur ne risque rien.", false, "Un mineur peut être poursuivi ; la peine maximale est en principe divisée par deux."],
    ["On peut publier la photo d'un camarade sans lui demander.", false, "Le droit à l'image impose son accord."],
    ["L'expérience de Milgram a été réalisée sur Facebook.", false, "Elle date de 1967, avec des lettres papier."],
    ["Bloquer un harceleur efface les preuves de ses messages.", false, "Il faut d'abord faire des captures d'écran, puis bloquer et signaler."],
    ["En France, avant 15 ans, l'inscription à un réseau social demande aussi l'accord d'un parent.", true, "La loi Informatique et libertés fixe à 15 ans l'âge où l'on peut consentir seul à l'utilisation de ses données ; la loi du 7 juillet 2023 sur la « majorité numérique » veut renforcer ce contrôle."],
    ["Les réseaux sociaux sont autorisés à tout savoir de ses utilisateurs sans leur accord.", false, "Le RGPD impose d'informer les utilisateurs et, souvent, de demander leur consentement."]
  ];
  def("sr-vrai-faux", () => vraiFaux4(VF_RS, ["Un seul mot (« toujours », « définitivement », « tout le monde ») peut rendre une affirmation fausse.", "Pense à la loi (harcèlement, droit à l'image, RGPD), aux graphes (rayon, diamètre, centre) et au modèle économique.", "Élimine les affirmations dont tu es sûr."]));

  /* =====================================================================
     FIGURES DU COURS ET ACTIVITÉS INTERACTIVES (réseaux sociaux)
     ===================================================================== */
  FIGURES["sr-cours-frise"] = () => frise([[1997, "SixDegrees, le premier réseau social"], [2003, "LinkedIn"], [2004, "Facebook"], [2005, "YouTube"], [2006, "Twitter (X depuis 2023)"], [2009, "WhatsApp"], [2010, "Instagram"], [2011, "Snapchat"], [2016, "TikTok (Douyin en Chine)"]], "Frise des réseaux sociaux : SixDegrees 1997, LinkedIn 2003, Facebook 2004, YouTube 2005, Twitter 2006, WhatsApp 2009, Instagram 2010, Snapchat 2011, TikTok 2016");
  FIGURES["sr-cours-panorama"] = () => tableHTML([["Réseau", "Ce qu'on y fait", "Utilisateurs par mois"], ["Facebook", "profils, amis, groupes", "≈ 3 milliards"], ["YouTube", "vidéos sur des chaînes", "≈ 2,5 milliards"], ["WhatsApp", "messagerie, groupes", "≈ 3 milliards"], ["Instagram", "photos, stories, Reels", "≈ 2 à 3 milliards"], ["TikTok", "vidéos courtes", "plus d'1 milliard"], ["Snapchat", "messages éphémères", "≈ 900 millions"], ["LinkedIn", "réseau professionnel", "≈ 1 milliard d'inscrits"], ["X", "messages courts publics", "quelques centaines de millions"], ["Discord", "communautés, vocal", "≈ 200 millions"]]);
  const GRAPHE_CLASSE = { noeuds: [["Anli", 34, 52], ["Zoé", 34, 160], ["Lina", 100, 106], ["Tom", 108, 26], ["Naël", 160, 168], ["Rose", 218, 106], ["Maya", 236, 30], ["Hugo", 292, 84], ["Sami", 284, 176]], liens: [["Anli", "Lina"], ["Anli", "Tom"], ["Zoé", "Lina"], ["Tom", "Lina"], ["Anli", "Zoé"], ["Lina", "Naël"], ["Naël", "Rose"], ["Rose", "Maya"], ["Rose", "Hugo"], ["Maya", "Hugo"], ["Hugo", "Sami"], ["Rose", "Sami"]] };
  const GC_IDS = GRAPHE_CLASSE.noeuds.map((n) => n[0]);
  const dessinClasse = (depuis) => {
    const D = depuis ? distances(GC_IDS, GRAPHE_CLASSE.liens, depuis).D : null, P = {};
    GRAPHE_CLASSE.noeuds.forEach(([id, x, y]) => (P[id] = { x, y }));
    let s = GRAPHE_CLASSE.liens.map(([a, b]) => `<line x1="${P[a].x}" y1="${P[a].y}" x2="${P[b].x}" y2="${P[b].y}" style="stroke:var(--doux);stroke-width:2"/>`).join("");
    const FOND = ["var(--ylang)", "color-mix(in srgb, var(--lagon) 85%, var(--surface))", "color-mix(in srgb, var(--lagon) 55%, var(--surface))", "color-mix(in srgb, var(--lagon) 30%, var(--surface))", "color-mix(in srgb, var(--lagon) 12%, var(--surface))"];
    GRAPHE_CLASSE.noeuds.forEach(([id, x, y]) => {
      const d = D ? D[id] : null;
      s += `<g class="act-noeud" data-id="${id}" role="button" tabindex="0" aria-label="${id}${d !== null ? `, distance ${d}` : ""}" style="cursor:pointer"><circle cx="${x}" cy="${y}" r="20" style="fill:${d === null ? "var(--lagon-pale)" : FOND[Math.min(d, 4)]};stroke:${d === 0 ? "var(--ylang)" : "var(--lagon)"};stroke-width:2"/>` + txt(x, y + 4, id, { taille: 11, couleur: d !== null && d <= 1 ? "var(--surface)" : undefined }) + (d ? `<circle cx="${x + 16}" cy="${y - 16}" r="8" style="fill:var(--surface);stroke:var(--lagon)"/>` + txt(x + 16, y - 12.5, String(d), { taille: 10 }) : "") + `</g>`;
    });
    return svg(320, 200, s, depuis ? `Graphe de la classe : distances depuis ${depuis}` : "Graphe d'amitié de neuf élèves : Anli, Zoé, Lina et Tom d'un côté, Rose, Maya, Hugo et Sami de l'autre, reliés par Naël");
  };
  FIGURES["sr-cours-graphe"] = () => dessinClasse(null);
  FIGURES["sr-cours-distances"] = () => dessinClasse("Lina");
  FIGURES["sr-act-graphe"] = () => `<div class="act" data-activite="graphe"><p class="act-t">🔎 Touche un élève : chacun prend la couleur de sa distance à lui. Trouve qui est au centre de la classe !</p><div class="act-zone">${dessinClasse(null)}</div><p class="act-info" aria-live="polite">Aucun élève exploré pour l'instant.</p><p class="act-bilan"></p></div>`;
  FIGURES["sr-cours-milgram"] = () => {
    const E = [["Omaha", 40, 40], ["voisin", 120, 40], ["collègue", 200, 40], ["cousin", 280, 40], ["médecin", 280, 120], ["ami", 200, 120], ["Boston", 120, 120]];
    let s = "";
    E.forEach(([t, x, y], k) => { if (k) { const [, x0, y0] = E[k - 1]; s += fleche(x0 + (x > x0 ? 32 : x < x0 ? -32 : 0), y0 + (y > y0 ? 16 : 0), x + (x > x0 ? -34 : x < x0 ? 34 : 0), y - (y > y0 ? 16 : 0), { couleur: "var(--lagon)" }); } s += boite(x - 32, y - 15, 64, 30, t, { taille: 10, fond: k === 0 || k === E.length - 1 ? "var(--ylang-pale)" : "var(--lagon-pale)", trait: k === 0 || k === E.length - 1 ? "var(--ylang)" : "var(--lagon)" }); });
    s += txt(160, 172, "5 intermédiaires, 6 liens : « six degrés de séparation »", { taille: 10, gras: false });
    return svg(320, 182, s, "Chaîne de Milgram : d'Omaha à Boston, la lettre passe par un voisin, un collègue, un cousin, un médecin et un ami : cinq intermédiaires, six liens");
  };
  FIGURES["sr-cours-economie"] = () => svg(320, 190,
    boite(110, 8, 100, 40, ["Réseau social", "(gratuit)"], { taille: 10, inter: 12, fond: "var(--ylang-pale)", trait: "var(--ylang)" }) + boite(6, 132, 110, 46, ["Utilisateurs"], { taille: 11 }) + boite(204, 132, 110, 46, ["Annonceurs"], { taille: 11 }) +
    fleche(70, 128, 120, 52, { couleur: "var(--lagon)" }) + txt(56, 84, "temps, données,", { taille: 9, gras: false }) + txt(56, 96, "« j'aime »", { taille: 9, gras: false }) +
    fleche(200, 52, 250, 128, { couleur: "var(--lagon)" }) + txt(264, 84, "profils ciblés", { taille: 9, gras: false }) +
    fleche(242, 128, 192, 54) + txt(186, 100, "€", { taille: 13 }) + fleche(202, 162, 118, 162) + txt(160, 154, "publicités ciblées", { taille: 9, gras: false }),
    "Modèle économique : les utilisateurs donnent leur temps et leurs données au réseau gratuit ; le réseau vend des profils ciblés aux annonceurs, qui paient et diffusent des publicités ciblées vers les utilisateurs");
  FIGURES["sr-cours-traces"] = () => tableHTML([["Volontaires", "Involontaires", "Laissées par d'autres"], ["publications, commentaires, « j'aime », profil", "position, temps passé, adresse IP, cookies, recherches", "photos où l'on t'identifie, vidéos, articles"]]);
  FIGURES["sr-cours-auth"] = () => svg(320, 150,
    boite(8, 10, 140, 54, ["1. Identification", "« Je suis anli.m »"], { taille: 10, inter: 14 }) + boite(172, 10, 140, 54, ["2. Authentification", "« Voici mon mot de passe »"], { taille: 10, inter: 14, fond: "var(--ylang-pale)", trait: "var(--ylang)" }) + fleche(150, 37, 170, 37) +
    boite(90, 90, 140, 50, ["3. Double authentification", "code reçu sur le téléphone"], { taille: 10, inter: 14, fond: "var(--surface)", trait: "var(--bon)" }) + fleche(242, 66, 200, 88, { tirets: true }),
    "Identification (dire qui on est), authentification (le prouver par un mot de passe), double authentification (un code reçu sur le téléphone en plus)");
  FIGURES["sr-cours-bulle"] = () => svg(320, 170,
    boite(10, 60, 80, 44, ["Tu aimes", "du foot"], { taille: 10, inter: 13 }) + boite(120, 10, 80, 44, ["L'algorithme", "le note"], { taille: 10, inter: 13, fond: "var(--ylang-pale)", trait: "var(--ylang)" }) + boite(230, 60, 80, 44, ["Il te montre", "plus de foot"], { taille: 10, inter: 13 }) + boite(120, 112, 80, 44, ["Tu vois moins", "le reste"], { taille: 10, inter: 13, fond: "var(--surface)", trait: "var(--faux)" }) +
    fleche(80, 58, 118, 36, { couleur: "var(--lagon)" }) + fleche(202, 36, 240, 58, { couleur: "var(--lagon)" }) + fleche(240, 106, 202, 128, { couleur: "var(--lagon)" }) + fleche(118, 128, 80, 106, { couleur: "var(--lagon)" }),
    "Bulle de filtre : tu aimes du foot, l'algorithme le note, il te montre plus de foot, tu vois moins le reste, et tu aimes encore plus de foot");
  FIGURES["sr-cours-ressources"] = () => tableHTML([["Ressource", "Pour quoi faire"], ["Un adulte du lycée (CPE, professeur, infirmière), tes parents", "en parler, être protégé"], ["3018 (gratuit, anonyme, 7 j/7)", "conseils, aide pour faire retirer des contenus"], ["Bouton « Signaler » du réseau", "faire retirer un contenu ou un compte"], ["internet-signalement.gouv.fr (Pharos)", "signaler un contenu illicite à la police"], ["Commissariat, gendarmerie", "porter plainte (avec des captures d'écran)"]]);

  // Fil d'actualité : comptes suivis et « j'aime » → publications montrées
  const FIL = [["⚽", "Foot", ["Le résumé du match de samedi", "Top 10 des plus beaux buts", "La rumeur de transfert du jour", "Le geste technique à apprendre", "Le classement après la journée", "Interview du capitaine"]], ["🎮", "Jeux vidéo", ["Astuce pour finir le niveau 12", "Test du nouveau jeu de course", "Tournoi en ligne ce soir", "Les 5 jeux les plus attendus", "Record battu en direct", "Mise à jour : ce qui change"]], ["🎵", "Musique", ["Nouveau clip de ton artiste préféré", "Playlist pour réviser", "Concert à Mamoudzou samedi", "Apprends ce refrain en 1 minute", "Les sons du moment", "Coulisses d'un enregistrement"]], ["🔬", "Sciences", ["Pourquoi le lagon est-il turquoise ?", "Une éclipse visible le mois prochain", "Comment naît un volcan ?", "Les baleines à bosse sont de retour", "Une fusée décolle ce soir", "Le cerveau en 3 chiffres"]], ["🍲", "Cuisine", ["Le mataba en 5 étapes", "Jus de corossol maison", "Gâteau au coco facile", "Brochettes du soir", "Le secret d'un bon riz", "Dessert à la mangue"]], ["😂", "Humour", ["Quand le prof annonce une interro surprise", "Le chat qui a peur d'un concombre", "Les élèves le lundi matin", "Quand le Wi-Fi coupe en plein jeu", "Le chien qui fait ses devoirs", "Imitation du réveil à 6 h"]], ["🌍", "Actualité", ["Météo : fortes pluies annoncées", "Reportage : la mangrove en danger", "Le point sur l'actualité du jour", "Ce qui change à la rentrée", "Débat : les écrans au lycée", "Un récif protégé de plus"]], ["💄", "Beauté", ["Tuto coiffure en 2 minutes", "Protéger sa peau au soleil", "Test de 5 vernis", "Routine du matin en 3 gestes", "Les tresses de la semaine", "Maquillage pour une fête"]]];
  FIGURES["sr-act-fil"] = () => `<div class="act" data-activite="fil"><p class="act-t">📱 Choisis les comptes que tu suis, puis « aime » des publications : regarde ton fil changer.</p><div class="act-chips" role="group" aria-label="Comptes suivis"></div><div class="act-jauge" aria-live="polite"></div><ol class="act-fil"></ol><button type="button" class="btn-sec act-raz">Recommencer</button></div>`;
  // Confidentialité : réglages d'un profil fictif et ce que voit un ami ou un inconnu
  const PROFIL = [["📷", "Photo de profil", "une photo de Nadjma au bord du lagon"], ["🎂", "Date de naissance", "12 mars 2011"], ["🏫", "Lycée et classe", "Lycée de Mamoudzou, 2nde 4"], ["📍", "Position en direct", "en ce moment : plage de Moya"], ["📞", "Numéro de téléphone", "06 39 xx xx xx"], ["🏖️", "Photos de vacances", "12 photos, maison visible"]];
  FIGURES["sr-act-confidentialite"] = () => `<div class="act" data-activite="confidentialite"><p class="act-t">🔒 Règle le profil (fictif) de Nadjma, puis regarde ce qu'un inconnu voit.</p><div class="act-reglages"></div><div class="act-vue" role="group" aria-label="Point de vue"><button type="button" class="filtre" data-vue="ami" aria-pressed="false">Vu par un ami</button><button type="button" class="filtre" data-vue="inconnu" aria-pressed="true">Vu par un inconnu</button></div><div class="act-profil" aria-live="polite"></div></div>`;
  // Mot de passe : temps pour tout essayer, au rythme de 10 milliards d'essais par seconde
  const COURANTS = ["azerty", "123456", "123456789", "motdepasse", "password", "qwerty", "soleil", "doudou", "mayotte", "football", "bonjour", "iloveyou", "000000", "111111", "loulou", "chouchou"];
  FIGURES["sr-act-motdepasse"] = () => `<div class="act" data-activite="motdepasse"><p class="act-t">🔑 Tape un mot de passe <strong>inventé</strong> (jamais ton vrai !) : combien de temps un ordinateur mettrait-il à le trouver ?</p><input class="act-mdp" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="ex. Mangue-Lagon-42!" aria-label="Mot de passe à tester"><div class="act-force"><span></span></div><p class="act-info" aria-live="polite">Rien n'est envoyé : le calcul se fait sur ton appareil.</p></div>`;

  const ACTIVITES = {
    graphe(el) {
      const vus = {};
      const zone = el.querySelector(".act-zone"), info = el.querySelector(".act-info"), bilan = el.querySelector(".act-bilan");
      const choisir = (id) => {
        const D = distances(GC_IDS, GRAPHE_CLASSE.liens, id).D, e = Math.max(...Object.values(D)); vus[id] = e;
        zone.innerHTML = dessinClasse(id); brancher();
        const n = Object.keys(vus).length;
        info.innerHTML = `Depuis <strong>${id}</strong> : la personne la plus éloignée est à distance <strong>${e}</strong>, c'est son <strong>excentricité</strong>.<br>Exploré${n > 1 ? "s" : ""} : ${Object.entries(vus).map(([k, v]) => `${k} ${v}`).join(" · ")} (${n}/9)`;
        if (n === 9) { const E = Object.values(vus), r = Math.min(...E), d = Math.max(...E); bilan.innerHTML = `🎉 Rayon $= ${r}$ (plus petite excentricité), diamètre $= ${d}$ (plus grande), centre : <strong>${GC_IDS.filter((k) => vus[k] === r).join(", ")}</strong>. Il relie les deux groupes d'amis !`.replace(/\$([^$]+)\$/g, (m, t) => (window.katex ? window.katex.renderToString(t) : t)); }
        else bilan.textContent = n >= 3 ? "Continue : le centre est l'élève dont l'excentricité est la plus petite." : "";
      };
      const brancher = () => zone.querySelectorAll(".act-noeud").forEach((g) => { g.addEventListener("click", () => choisir(g.dataset.id)); g.addEventListener("keydown", (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); choisir(g.dataset.id); } }); });
      brancher();
    },
    fil(el) {
      let suivis, aime;
      const chips = el.querySelector(".act-chips"), jauge = el.querySelector(".act-jauge"), liste = el.querySelector(".act-fil");
      const raz = () => { suivis = new Set([0, 2, 5]); aime = FIL.map(() => 0); rendre(); };
      const rendre = () => {
        chips.innerHTML = FIL.map((f, k) => `<button type="button" class="filtre" data-k="${k}" aria-pressed="${suivis.has(k)}">${f[0]} ${esc(f[1])}</button>`).join("");
        chips.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { const k = +b.dataset.k; if (suivis.has(k)) suivis.delete(k); else suivis.add(k); rendre(); }));
        const poids = FIL.map((_, k) => (suivis.has(k) ? 1 + 2 * aime[k] : 0)), tot = poids.reduce((a, b) => a + b, 0);
        if (!tot) { jauge.innerHTML = "Tu ne suis personne : ton fil est vide. Les réseaux te proposeraient alors… ce qui est populaire."; liste.innerHTML = ""; return; }
        // 8 publications réparties selon les poids (plus forts restes)
        const N = 8, part = poids.map((p) => (p * N) / tot), nb2 = part.map(Math.floor);
        let reste = N - nb2.reduce((a, b) => a + b, 0);
        part.map((p, k) => [p - Math.floor(p), k]).sort((a, b) => b[0] - a[0]).forEach(([, k]) => { if (reste > 0 && poids[k]) { nb2[k]++; reste--; } });
        // publications de chaque thème, puis mélange équilibré : à chaque tour, le thème qui a le plus de publications restantes
        const files = nb2.map((n, k) => Array.from({ length: n }, (_, j) => [k, FIL[k][2][(j + 2 * aime[k]) % 6], j > 0 && aime[k] > 0]));
        const posts = []; let dernier = -1;
        while (posts.length < N) { const k = files.map((f, j) => [f.length - (j === dernier ? 0.5 : 0), j]).sort((a, b) => b[0] - a[0])[0][1]; posts.push(files[k].shift()); dernier = k; }
        const themes = nb2.filter((n) => n > 0).length, maxi = Math.max(...nb2), kmax = nb2.indexOf(maxi);
        jauge.innerHTML = `<div class="act-barre">${nb2.map((n, k) => (n ? `<span style="flex:${n}" title="${esc(FIL[k][1])}">${FIL[k][0]}</span>` : "")).join("")}</div><p>${themes} thème${themes > 1 ? "s" : ""} sur 8 dans ton fil.${maxi / N >= 0.6 ? ` <strong>${FIL[kmax][0]} ${esc(FIL[kmax][1])} occupe ${Math.round((100 * maxi) / N)} % de ton fil : tu entres dans une bulle de filtre.</strong>` : ""}</p>`;
        liste.innerHTML = posts.map(([k, t, sugg]) => `<li class="act-post"><span class="act-post-ico" aria-hidden="true">${FIL[k][0]}</span><span class="act-post-t">${sugg ? '<span class="act-sugg">Suggéré pour toi</span>' : ""}${esc(t)}</span><button type="button" class="act-like" data-k="${k}" aria-label="J'aime (${esc(FIL[k][1])})">♥ ${aime[k] || ""}</button></li>`).join("");
        liste.querySelectorAll(".act-like").forEach((b) => b.addEventListener("click", () => { aime[+b.dataset.k]++; rendre(); }));
      };
      el.querySelector(".act-raz").addEventListener("click", raz);
      raz();
    },
    confidentialite(el) {
      const reg = PROFIL.map(() => 0); let vue = "inconnu"; // 0 public, 1 amis, 2 moi seul
      const R = el.querySelector(".act-reglages"), P = el.querySelector(".act-profil"), NIV = ["Public", "Amis", "Moi seul"];
      R.innerHTML = PROFIL.map((f, k) => `<label class="act-reglage"><span>${f[0]} ${esc(f[1])}</span><select data-k="${k}">${NIV.map((n, j) => `<option value="${j}">${n}</option>`).join("")}</select></label>`).join("");
      const rendre = () => {
        const voit = (k) => reg[k] === 0 || (reg[k] === 1 && vue === "ami");
        const vis = PROFIL.filter((_, k) => voit(k)), nbInconnu = reg.filter((r) => r === 0).length;
        P.innerHTML = `<div class="act-carte"><p class="act-carte-t">Nadjma, 15 ans</p>${vis.length ? `<ul>${vis.map((f) => `<li>${f[0]} <strong>${esc(f[1])}</strong> : ${esc(f[2])}</li>`).join("")}</ul>` : "<p>Ce profil est privé.</p>"}</div>` +
          `<p class="act-info">Un inconnu voit ${nbInconnu} information${nbInconnu > 1 ? "s" : ""} sur 6. ${nbInconnu >= 4 ? "⚠️ <strong>Profil très exposé</strong> : un inconnu sait qui elle est, où elle étudie… et où elle se trouve." : nbInconnu >= 2 ? "Attention : " + (reg[3] === 0 ? "la <strong>position en direct</strong> ne devrait jamais être publique." : "réduis encore ce qui est public.") : "✅ Bien réglé : les inconnus ne voient presque rien."}</p>`;
      };
      R.querySelectorAll("select").forEach((s) => s.addEventListener("change", () => { reg[+s.dataset.k] = +s.value; rendre(); }));
      el.querySelectorAll(".act-vue button").forEach((b) => b.addEventListener("click", () => { vue = b.dataset.vue; el.querySelectorAll(".act-vue button").forEach((x) => x.setAttribute("aria-pressed", x === b)); rendre(); }));
      rendre();
    },
    motdepasse(el) {
      const inp = el.querySelector(".act-mdp"), barre = el.querySelector(".act-force span"), info = el.querySelector(".act-info");
      const duree = (s) => { const U = [[3.15e7 * 1e9, "milliards d'années"], [3.15e7 * 1e6, "millions d'années"], [3.15e7, "ans"], [86400, "jours"], [3600, "heures"], [60, "minutes"], [1, "secondes"]]; if (s < 1) return "moins d'une seconde"; for (const [v, n] of U) if (s >= v) { const q = s / v; return `environ ${q >= 1000 ? q.toExponential(0).replace(/e+(d+)/, " × 10<sup>$1</sup>") : Math.round(q)} ${n}`; } return ""; };
      inp.addEventListener("input", () => {
        const m = inp.value; if (!m) { barre.style.width = "0"; info.textContent = "Rien n'est envoyé : le calcul se fait sur ton appareil."; return; }
        let c = 0; if (/[a-z]/.test(m)) c += 26; if (/[A-Z]/.test(m)) c += 26; if (/\d/.test(m)) c += 10; if (/[^a-zA-Z0-9]/.test(m)) c += 33;
        const courant = COURANTS.includes(m.toLowerCase()) || /^(.)\1+$/.test(m), s = courant ? 0 : Math.pow(c, m.length) / 2 / 1e10;
        const bits = courant ? 0 : m.length * Math.log2(c);
        barre.style.width = Math.min(100, (bits / 90) * 100) + "%"; barre.style.background = bits < 40 ? "var(--faux)" : bits < 65 ? "var(--ylang)" : "var(--bon)";
        info.innerHTML = courant ? "⚠️ Ce mot de passe fait partie des plus courants : il est trouvé <strong>immédiatement</strong>." : `${m.length} caractères, ${c} caractères possibles : ${c}<sup>${m.length}</sup> combinaisons. À 10 milliards d'essais par seconde : <strong>${duree(s)}</strong> en moyenne.${m.length < 12 ? " Allonge-le !" : ""}`;
      });
    }
  };
  window.PM_EXO.activer = (racine) => (racine || document).querySelectorAll("[data-activite]:not([data-actif])").forEach((el) => { el.dataset.actif = "1"; if (ACTIVITES[el.dataset.activite]) ACTIVITES[el.dataset.activite](el); });

})();
