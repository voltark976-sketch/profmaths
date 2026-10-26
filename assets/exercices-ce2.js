/*
  Exercices du CE2 (programme du cycle 2, BO n° 41 du 31 octobre 2024, en vigueur depuis la rentrée 2025).
  Chargé à l'ouverture d'un chapitre du CE2, après assets/exercices-ecole.js dont il reprend les outils.
  Nombres jusqu'à 10 000 ; fractions de dénominateur au plus 12, inférieures ou égales à 1 (mesures de longueurs en fractions
  d'unité) ; division (sens) ; multiplication posée ; pas de calculatrice.
  Préfixes : e2n- (nombres), e2c- (comparer), e2f- (fractions), e2a- (addition et soustraction), e2m- (multiplication),
  e2v- (division), e2k- (calcul mental), e2r- (problèmes), e2l- (longueurs et périmètre), e2p- (masses et contenances),
  e2e- (monnaie), e2h- (heure et durées), e2s- (solides), e2g- (figures et symétrie), e2d- (données).
*/
(function () {
  "use strict";
  const { GEN, FIGURES } = window.PM_EXO;
  const E = window.PM_EXO.ecole;
  const { rand, pick, melange, nb, nbT, enLettres, prenom, paquets, droite, schema, bandesFr, monnaie, horloges, solide, solides, formes, quadrillage, barres, svg, r1, elisions } = E;
  const X = "\\times", DIV = "\\div";
  const Maj = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const fr = (a, b) => `\\dfrac{${a}}{${b}}`;
  const FRAC = " Écris ta réponse sous forme de fraction, par exemple $3/8$.";
  const NOMS_FR = { 2: ["demi", "demis"], 3: ["tiers", "tiers"], 4: ["quart", "quarts"], 5: ["cinquième", "cinquièmes"], 6: ["sixième", "sixièmes"], 7: ["septième", "septièmes"], 8: ["huitième", "huitièmes"], 9: ["neuvième", "neuvièmes"], 10: ["dixième", "dixièmes"], 11: ["onzième", "onzièmes"], 12: ["douzième", "douzièmes"] };
  const posee = (L, op, res) => `$\\begin{array}{r} ${L.map((v, k) => (k ? `${op}\\;${v}` : `${v}`)).join(" \\\\ ")} \\\\ \\hline ${res} \\end{array}$\n\n`;
  const TX = (t) => "\\text{" + t + "}";

  /* =====================================================================
     Chapitre 1 : les nombres jusqu'à 10 000 (e2n-)
     ===================================================================== */
  // Matériel : m gros cubes de mille, puis plaques, barres, cubes
  function milliers(m, c, d, u) {
    let s = "", x = 6;
    for (let i = 0; i < m; i++) { const k = 34; s += `<rect class="g-cube-d" x="${x + 12}" y="8" width="${k}" height="${k}" style="fill-opacity:0.35"/><polygon class="g-cube-haut" points="${x},20 ${x + 12},8 ${x + 12 + k},8 ${x + k},20"/><rect class="g-cube-g" x="${x}" y="20" width="${k}" height="${k}"/><text class="g-label" x="${x + 17}" y="42" text-anchor="middle">1000</text>`; x += 52; }
    const reste = paquets(c, d, u).replace(/^<svg[^>]*>|<\/svg>$/g, "");
    return svg("milliers", 320, 170, `${m} cubes de mille, ${c} plaques, ${d} barres, ${u} cubes`, `${s}<g transform="translate(0 58) scale(0.95)">${reste}</g>`);
  }
  FIGURES["e2n-cours-milliers"] = () => milliers(2, 3, 1, 5);
  GEN["e2n-unites"] = function () {
    const t = rand(0, 3);
    let n; do n = rand(1001, 9999); while (new Set(String(n)).size < 4);
    const m = Math.floor(n / 1000), c = Math.floor(n / 100) % 10, d = Math.floor(n / 10) % 10, u = n % 10;
    if (t === 0) { const k = rand(0, 3), nom = ["milliers", "centaines", "dizaines", "unités"][k], v = [m, c, d, u][k]; return { enonce: `Dans $${nb(n)}$, quel est le chiffre des **${nom}** ?`, mode: "nombre", prefixe: "", attendu: v, erreurs: [m, c, d, u].filter((x) => x !== v).map((x) => ({ valeur: x, message: "Mauvais rang : de droite à gauche, unités, dizaines, centaines, milliers." })), aides: ["Le chiffre de droite est celui des unités.", "Puis dizaines, centaines, et à gauche les milliers.", `$${nb(n)}$ : ${m} milliers, ${c} centaines, ${d} dizaines, ${u} unités.`], solution: `Le chiffre des ${nom} de $${nb(n)}$ est $${v}$.` }; }
    if (t === 1) { const k = rand(0, 1), nom = ["centaines", "dizaines"][k], v = [Math.floor(n / 100), Math.floor(n / 10)][k]; return { enonce: `Combien y a-t-il de **${nom}** en tout dans $${nb(n)}$ ?`, mode: "nombre", prefixe: "", suffixe: nom, attendu: v, erreurs: [{ valeur: k ? d : c, message: `Ça, c'est seulement le chiffre des ${nom}. Les milliers${k ? " et les centaines" : ""} contiennent aussi des ${nom}.` }], aides: [k ? "$1$ millier $= 100$ dizaines ; $1$ centaine $= 10$ dizaines." : "$1$ millier $= 10$ centaines.", `Cache ${k ? "le chiffre des unités" : "les deux derniers chiffres"} : ce qui reste est le nombre de ${nom}.`, `$${nb(n)}$ → $${nb(v)}$.`], solution: `$${nb(n)} = ${nb(v)}$ ${nom} et $${k ? u : 10 * d + u}$ unités.` }; }
    if (t === 2) { const trou = rand(0, 3), parts = [`(${m} ${X} 1\\,000)`, `(${c} ${X} 100)`, `(${d} ${X} 10)`, `${u}`]; const rep = [m, c, d, u][trou]; parts[trou] = trou < 3 ? parts[trou].replace(/^\((\d)/, "(\\ldots") : "\\ldots"; return { enonce: `Complète : $${nb(n)} = ${parts.join(" + ")}$`, mode: "nombre", prefixe: "", attendu: rep, erreurs: [{ valeur: [1000 * m, 100 * c, 10 * d, u][trou] === rep ? rep + 1 : [1000 * m, 100 * c, 10 * d, u][trou], message: "On demande un seul chiffre : combien de fois $1\\,000$, $100$ ou $10$." }], aides: [`$${nb(n)}$ : $${m}$ milliers, $${c}$ centaines, $${d}$ dizaines, $${u}$ unités.`, "Chaque parenthèse dit combien de milliers, de centaines ou de dizaines.", "Regarde le bon chiffre."], solution: `$${nb(n)} = (${m} ${X} 1\\,000) + (${c} ${X} 100) + (${d} ${X} 10) + ${u}$.` }; }
    // lots de cent : combien de lots pour avoir au moins n ?
    const P = pick(["Une entreprise de Kawéni", "Le collège de Dembéni", "Une boulangerie de Mamoudzou", "Le club de foot de Sada"]), obj = pick(["filtres", "cahiers", "sachets", "maillots"]);
    const lots = Math.ceil(n / 100);
    return { enonce: `${P} a besoin de $${nb(n)}$ ${obj}. Elle ne peut acheter que des lots de $100$. Combien de lots doit-elle acheter au minimum ?`, mode: "nombre", prefixe: "", suffixe: "lots", attendu: lots, erreurs: [{ valeur: Math.floor(n / 100), message: `Avec $${Math.floor(n / 100)}$ lots, il en manque : il faut un lot de plus.` }, { valeur: c, message: "Les milliers contiennent aussi des centaines." }].filter((e) => e.valeur !== lots), aides: [`$${nb(n)}$ contient $${Math.floor(n / 100)}$ centaines.`, `$${Math.floor(n / 100)}$ lots donnent $${nb(100 * Math.floor(n / 100))}$ ${obj} : est-ce assez ?`, "S'il en manque, il faut un lot de plus."], solution: `$${Math.floor(n / 100)}$ lots ne suffisent pas ($${nb(100 * Math.floor(n / 100))}$ ${obj}) : il faut $${lots}$ lots.`.replace(" ne suffisent pas", n % 100 ? " ne suffisent pas" : " suffisent") };
  };
  GEN["e2n-lettres"] = function () {
    const n = pick([rand(1001, 9999), 1000 * rand(1, 9) + rand(1, 99), 1000 * rand(1, 9) + 100 * rand(1, 9), rand(1001, 9999)]), t = rand(0, 1);
    if (t === 0) { const m = Math.floor(n / 1000), r = n % 1000; return { enonce: `On te dicte : « **${enLettres(n)}** ». Écris ce nombre en chiffres.`, mode: "nombre", prefixe: "", attendu: n, erreurs: [{ valeur: +(`${m}000${r}`), message: "« mille » n'ajoute pas trois zéros devant la suite : le nombre a $4$ chiffres." }, { valeur: +(`${m}${r}`) === n ? n + 10 : +(`${m}${r}`), message: "Attention aux zéros : le nombre a $4$ chiffres." }].filter((e) => e.valeur !== n && e.valeur < 1e7), aides: ["Écoute d'abord les milliers.", "Puis la fin, de $0$ à $999$ : elle occupe toujours $3$ chiffres.", "Mets des $0$ s'il manque des centaines ou des dizaines."], solution: `« ${enLettres(n)} » s'écrit $${nb(n)}$.` }; }
    const c = melange(enLettres(n), [n + 1, n + 10, n + 100, n - 1000, n + 1000].filter((x) => x > 999 && x < 10000).map(enLettres));
    return { enonce: `Comment s'écrit $${nb(n)}$ en lettres ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Commence par les milliers : « …-mille ».", "Puis les centaines, puis la fin.", "Mille ne prend jamais de s."], solution: `$${nb(n)}$ s'écrit « ${enLettres(n)} ».` };
  };
  GEN["e2n-denombrer"] = function () {
    const m = rand(1, 3), c = rand(0, 9), d = rand(0, 9), u = rand(0, 9), n = 1000 * m + 100 * c + 10 * d + u, t = rand(0, 1);
    if (t === 0) return { enonce: "Un gros cube vaut $1\\,000$, une plaque $100$, une barre $10$, un petit cube $1$. Quel nombre est représenté ?", figure: milliers(m, Math.min(c, 2), d, u), mode: "nombre", prefixe: "", attendu: 1000 * m + 100 * Math.min(c, 2) + 10 * d + u, erreurs: [{ valeur: m + Math.min(c, 2) + d + u, message: "Chaque pièce n'a pas la même valeur." }], aides: ["Compte les gros cubes : des milliers.", "Puis les plaques (centaines), les barres (dizaines), les petits cubes.", "Additionne."], solution: `$${nb(1000 * m)} + ${100 * Math.min(c, 2)} + ${10 * d} + ${u} = ${nb(1000 * m + 100 * Math.min(c, 2) + 10 * d + u)}$.` };
    const C = rand(10, 46), U = rand(0, 15), D = rand(0, 15), v = 100 * C + 10 * D + U;
    return { enonce: `Quel nombre fait $${D}$ dizaines, $${C}$ centaines et $${U}$ unités ?`, mode: "nombre", prefixe: "", attendu: v, erreurs: [{ valeur: C + D + U, message: "Une centaine vaut $100$, une dizaine $10$." }, { valeur: +(`${C}${D}${U}`) === v ? v + 1 : +(`${C}${D}${U}`), message: "On ne colle pas les nombres : on additionne." }], aides: [`$${C}$ centaines $= ${nb(100 * C)}$.`, `$${D}$ dizaines $= ${10 * D}$.`, `$${nb(100 * C)} + ${10 * D} + ${U}$.`], solution: `$${nb(100 * C)} + ${10 * D} + ${U} = ${nb(v)}$.` };
  };

  /* =====================================================================
     Chapitre 2 : comparer, ranger, encadrer (e2c-)
     ===================================================================== */
  const SIGNES = ["$<$", "$>$", "$=$"];
  FIGURES["e2c-cours-droite"] = () => droite({ a: 3000, pas: 1000, n: 7, lab: [0, 1, 2], points: [{ i: 5, label: "A" }], aria: "Droite graduée de 1 000 en 1 000" });
  GEN["e2c-signes"] = function () {
    let a = rand(1000, 9999), b = pick([rand(1000, 9999), a + pick([-1000, -100, -10, -1, 0, 1, 10, 100, 1000]), +String(a).split("").reverse().join("")]);
    if (b < 1000 || b > 9999) return GEN["e2c-signes"]();
    const sg = a < b ? "<" : a > b ? ">" : "=", c = melange(`$${sg}$`, SIGNES);
    return { enonce: `Choisis le bon signe : $${nb(a)} \\;\\ldots\\; ${nb(b)}$`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Compare d'abord les milliers.", "S'ils sont égaux : centaines, puis dizaines, puis unités.", "La pointe du signe montre le plus petit."], solution: `$${nb(a)} ${sg} ${nb(b)}$.` };
  };
  GEN["e2c-ranger"] = function () {
    const base = 1000 * rand(1, 8) + 100 * rand(0, 8), L = new Set();
    while (L.size < 5) L.add(base + pick([0, 0, 0, 100, -100, 1000]) + rand(0, 4) * 10 + rand(0, 9));
    const A = [...L].filter((x) => x > 999 && x < 10000);
    if (A.length < 5) return GEN["e2c-ranger"]();
    const tri = A.slice().sort((x, y) => x - y), dec = rand(0, 1);
    const bon = (dec ? tri.slice().reverse() : tri).map((v) => `$${nb(v)}$`).join(" ; ");
    const f = [A.map((v) => `$${nb(v)}$`).join(" ; "), (dec ? tri : tri.slice().reverse()).map((v) => `$${nb(v)}$`).join(" ; "), [tri[1], tri[0], tri[2], tri[3], tri[4]].map((v) => `$${nb(v)}$`).join(" ; "), [tri[0], tri[1], tri[3], tri[2], tri[4]].map((v) => `$${nb(v)}$`).join(" ; ")];
    const c = melange(bon, f);
    return { enonce: `Quelle liste est rangée dans l'ordre **${dec ? "décroissant" : "croissant"}** ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: [dec ? "Du plus grand au plus petit." : "Du plus petit au plus grand.", "Compare chiffre par chiffre, en partant des milliers.", `Le premier nombre doit être $${nb(dec ? tri[4] : tri[0])}$.`], solution: bon };
  };
  GEN["e2c-encadrer"] = function () {
    const t = rand(0, 2);
    let n; do n = rand(1001, 9999); while (n % 100 === 0);
    if (t < 2) { const pas = t ? 1000 : 100, bas = rand(0, 1), b0 = Math.floor(n / pas) * pas; return { enonce: `Encadre $${nb(n)}$ entre deux ${pas === 1000 ? "milliers" : "centaines"} qui se suivent : ${bas ? `$\\ldots < ${nb(n)} < ${nb(b0 + pas)}$` : `$${nb(b0)} < ${nb(n)} < \\ldots$`}`, mode: "nombre", prefixe: "", attendu: bas ? b0 : b0 + pas, erreurs: [{ valeur: bas ? Math.floor(n / (pas / 10)) * (pas / 10) : Math.floor(n / (pas / 10)) * (pas / 10) + pas / 10, message: `On demande des ${pas === 1000 ? "milliers" : "centaines"} entiers.` }, { valeur: bas ? n - 1 : n + 1, message: `Il faut un nombre rond : des ${pas === 1000 ? "milliers" : "centaines"}.` }], aides: [`Garde le chiffre des milliers${pas === 100 ? " et des centaines" : ""}.`, "Remplace les autres chiffres par des $0$.", bas ? "C'est la borne d'en bas." : "Ajoute ensuite une unité de ce rang."], solution: `$${nb(b0)} < ${nb(n)} < ${nb(b0 + pas)}$.` }; }
    const pas = pick([10, 100, 1000]), a = pas === 1000 ? 0 : pas * rand(10, 80), i = rand(2, 8);
    if (a + 10 * pas > 10000) return GEN["e2c-encadrer"]();
    return { enonce: "Quel nombre est au point A ?", figure: droite({ a, pas, n: 10, lab: [0, 1], points: [{ i, label: "A" }], origine: a === 0, aria: `Droite graduée de ${pas} en ${pas}` }), mode: "nombre", prefixe: "A :", attendu: a + i * pas, erreurs: [{ valeur: a + i, message: `Un bond vaut $${nb(pas)}$, pas $1$.` }, { valeur: a + (i + 1) * pas, message: "Compte les bonds, pas les traits." }], aides: [`Les deux premiers nombres : $${nb(a)}$ et $${nb(a + pas)}$.`, `Un bond vaut $${nb(pas)}$.`, `$${nb(a)} + ${i} ${X} ${nb(pas)}$.`], solution: `A est à $${i}$ bonds de $${nb(pas)}$ après $${nb(a)}$ : $${nb(a + i * pas)}$.` };
  };

  /* =====================================================================
     Chapitre 3 : les fractions (e2f-)
     ===================================================================== */
  // Règle graduée en fractions d'unité : n unités, b parts par unité, point en k/b
  const regleFr = (n, b, k, lettre) => droite({ a: 0, pas: 1 / b, n: n * b, lab: Array.from({ length: n + 1 }, (_, j) => j * b), texte: (i) => String(i / b), grands: (i) => i % b === 0, points: k === undefined ? [] : [{ i: k, label: lettre || "M" }], origine: true, aria: `Règle graduée en ${NOMS_FR[b][1]} d'unité` });
  FIGURES["e2f-cours-egales"] = () => bandesFr([{ n: 4, col: 3, lab: "3/4" }, { n: 8, col: 6, lab: "6/8" }]);
  FIGURES["e2f-cours-regle"] = () => regleFr(2, 4, 9, "M");
  FIGURES["e2f-qcm-regle"] = () => regleFr(2, 10, 13, "P");
  GEN["e2f-egales"] = function () {
    const b = pick([2, 3, 4, 5, 6]), k = b * 2 <= 12 ? pick([2, 2, 3, 4].filter((x) => b * x <= 12)) : 2, a = rand(1, b - 1), t = rand(0, 1);
    if (t === 0) return { enonce: `Complète l'égalité : $${fr(a, b)} = ${fr("\\ldots", b * k)}$`, figure: bandesFr([{ n: b, col: a }, { n: b * k, col: a * k }]), mode: "nombre", prefixe: "Numérateur :", attendu: a * k, erreurs: [{ valeur: a, message: `Les parts sont $${k}$ fois plus petites : il en faut $${k}$ fois plus.` }, { valeur: a + b * k - b, message: "On ne fait pas une addition : on multiplie le numérateur comme le dénominateur." }].filter((e) => e.valeur !== a * k), aides: [`De $${b}$ à $${b * k}$ parts, chaque part est coupée en $${k}$.`, `Il faut donc $${k}$ fois plus de parts.`, `$${a} ${X} ${k}$.`], solution: `$${fr(a, b)} = ${fr(a * k, b * k)}$ : des parts $${k}$ fois plus petites, $${k}$ fois plus nombreuses.` };
    const cible = [a, b], bonne = `$${fr(a * k, b * k)}$`, fausses = [`$${fr(a + 1, b + 1)}$`, `$${fr(a * k, b)}$`, `$${fr(a, b * k)}$`, `$${fr(a + k, b + k)}$`];
    const c = melange(bonne, fausses.filter((x) => x !== bonne));
    return { enonce: `Quelle fraction est égale à $${fr(...cible)}$ ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Deux fractions sont égales si elles représentent la même part du tout.", "Si on coupe chaque part en $2$, il y a $2$ fois plus de parts.", "On multiplie le numérateur et le dénominateur par le même nombre."], solution: `$${fr(a, b)} = ${fr(a * k, b * k)}$ (on a multiplié en haut et en bas par $${k}$).` };
  };
  GEN["e2f-mesurer"] = function () {
    const b = pick([2, 3, 4, 5, 10]), n = b === 10 ? 2 : 3, k = rand(1, n * b - 1), u = Math.floor(k / b), r = k % b;
    if (r === 0) return GEN["e2f-mesurer"]();
    const bon = u ? `$${u}$ unité${u > 1 ? "s" : ""} $+ ${fr(r, b)}$ d'unité` : `$${fr(r, b)}$ d'unité`;
    const f = [u ? `$${u}$ unité${u > 1 ? "s" : ""} $+ ${fr(b - r, b)}$ d'unité` : `$${fr(b - r, b)}$ d'unité`, `$${k}$ unités`, u ? `$${u + 1}$ unités $+ ${fr(r, b)}$ d'unité` : `$${fr(r, b + 1)}$ d'unité`, u ? `$${fr(r, b)}$ d'unité` : `$${r}$ unité${r > 1 ? "s" : ""}`];
    const c = melange(bon, f);
    return { enonce: `La règle est graduée en ${NOMS_FR[b][1]} d'unité. Quelle est la longueur du segment qui va de $0$ au point M ?`, figure: regleFr(n, b, k), mode: "choix", choix: c.choix, attendu: c.attendu, aides: [`Chaque unité est partagée en $${b}$ parts égales.`, `Compte les petits bonds : M est à $${k}$ ${NOMS_FR[b][k > 1 ? 1 : 0]}.`, u ? `$${k}$ ${NOMS_FR[b][1]}, c'est $${u}$ unité${u > 1 ? "s" : ""} et encore $${r}$.` : "C'est moins qu'une unité."],
      solution: `M est à $${k}$ ${NOMS_FR[b][k > 1 ? 1 : 0]} de $0$ : ${bon}.` };
  };
  GEN["e2f-comparer"] = function () {
    const t = rand(0, 2);
    let A, B;
    if (t === 0) { const b = rand(3, 12); A = [rand(1, b), b]; B = [rand(1, b), b]; }
    else if (t === 1) { const a = rand(1, 5), [b1, b2] = E.tirage([2, 3, 4, 5, 6, 8, 10, 12].filter((x) => x >= a), 2); A = [a, b1]; B = [a, b2]; }
    else { const b = pick([2, 3, 4, 6]), k = pick([2, 3, 4].filter((x) => b * x <= 12)); A = [rand(1, b), b]; B = [rand(1, b * k), b * k]; }
    if (rand(0, 1)) [A, B] = [B, A];
    const va = A[0] / A[1], vb = B[0] / B[1], sg = Math.abs(va - vb) < 1e-9 ? "=" : va < vb ? "<" : ">", c = melange(`$${sg}$`, SIGNES);
    return { enonce: `Choisis le bon signe : $${fr(...A)} \\;\\ldots\\; ${fr(...B)}$`, figure: bandesFr([{ n: A[1], col: A[0] }, { n: B[1], col: B[0] }]), mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [t === 0 ? "Même dénominateur : compare les numérateurs." : t === 1 ? "Même numérateur : la part la plus grande vient du plus petit dénominateur." : "Un dénominateur est un multiple de l'autre : transforme une fraction pour avoir le même dénominateur.", "Regarde les bandes : quelle partie coloriée est la plus longue ?", "La pointe du signe montre la plus petite fraction."],
      solution: `$${fr(...A)} ${sg} ${fr(...B)}$${t === 2 ? ` (on peut écrire les deux en ${NOMS_FR[Math.max(A[1], B[1])][1]})` : ""}.` };
  };
  GEN["e2f-calculer"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const b = rand(3, 12), a1 = rand(1, b - 1), a2 = rand(1, b - a1), plus = rand(0, 1); const [x, y] = plus ? [a1, a2] : [a1 + a2, a2]; const r = plus ? a1 + a2 : a1; return { enonce: `Calcule : $${fr(x, b)} ${plus ? "+" : "-"} ${fr(y, b)}$.${FRAC}`, mode: "nombre", prefixe: "", attendu: r / b, erreurs: [{ valeur: r / (2 * b), message: "Le dénominateur ne change pas." }, { valeur: plus ? Math.abs(x - y) / b : (x + y) / b, message: plus ? "C'est une addition." : "C'est une soustraction." }].filter((e) => e.valeur !== r / b), aides: [`On compte des ${NOMS_FR[b][1]}.`, `$${x}$ ${plus ? "+" : "−"} $${y}$ ${NOMS_FR[b][1]}.`, "Garde le dénominateur."], solution: `$${fr(x, b)} ${plus ? "+" : "-"} ${fr(y, b)} = ${fr(r, b)}$.` }; }
    if (t === 1) { const b = pick([2, 3, 4, 5, 6]), k = pick([2, 3].filter((x) => b * x <= 12)), a1 = rand(1, b - 1), a2 = rand(1, b * k - a1 * k); const r = a1 * k + a2; if (r > b * k) return GEN["e2f-calculer"](); return { enonce: `Calcule : $${fr(a1, b)} + ${fr(a2, b * k)}$.${FRAC}`, mode: "nombre", prefixe: "", attendu: r / (b * k), erreurs: [{ valeur: (a1 + a2) / (b + b * k), message: "On n'additionne pas les dénominateurs." }, { valeur: (a1 + a2) / (b * k), message: `D'abord, écris $${fr(a1, b)}$ en ${NOMS_FR[b * k][1]} : $${fr(a1 * k, b * k)}$.` }], aides: [`Écris $${fr(a1, b)}$ avec le dénominateur $${b * k}$.`, `$${fr(a1, b)} = ${fr(a1 * k, b * k)}$.`, `$${fr(a1 * k, b * k)} + ${fr(a2, b * k)}$.`], solution: `$${fr(a1, b)} + ${fr(a2, b * k)} = ${fr(a1 * k, b * k)} + ${fr(a2, b * k)} = ${fr(r, b * k)}$.` }; }
    const b = pick([6, 8, 10, 12]), parts = [rand(1, 3), rand(1, 3), rand(1, 3)]; if (parts[0] + parts[1] + parts[2] >= b) return GEN["e2f-calculer"]();
    const [A, B2, C] = E.tirage(E.PRENOMS.map((p) => p[0]), 3), reste = b - parts[0] - parts[1] - parts[2];
    return { enonce: `Un gâteau est partagé en $${b}$ parts égales. ${A} en mange $${fr(parts[0], b)}$, ${B2} $${fr(parts[1], b)}$ et ${C} $${fr(parts[2], b)}$. Quelle fraction du gâteau reste-t-il ?${FRAC}`, mode: "nombre", prefixe: "Il reste", attendu: reste / b, erreurs: [{ valeur: (b - reste) / b, message: "Ça, c'est ce qui a été mangé." }, { valeur: reste / (b * 3), message: "Le dénominateur ne change pas." }], aides: [`Mangé : $${fr(parts[0], b)} + ${fr(parts[1], b)} + ${fr(parts[2], b)}$.`, `Cela fait $${fr(b - reste, b)}$.`, `Le gâteau entier, c'est $${fr(b, b)}$.`], solution: `Mangé : $${fr(b - reste, b)}$. Reste : $${fr(b, b)} - ${fr(b - reste, b)} = ${fr(reste, b)}$.` };
  };

  /* =====================================================================
     Chapitre 4 : addition et soustraction (e2a-)
     ===================================================================== */
  GEN["e2a-posee"] = function () {
    const plus = rand(0, 1);
    let a, b; do { a = rand(1000, 9000); b = rand(100, 4000); } while (plus ? a + b > 10000 : b >= a);
    const r = plus ? a + b : a - b;
    return { enonce: `Pose et calcule : $${nb(a)} ${plus ? "+" : "-"} ${nb(b)}$`, mode: "nombre", prefixe: "", attendu: r, erreurs: [{ valeur: plus ? a - b : a + b, message: plus ? "C'est une addition." : "C'est une soustraction." }, { valeur: r + (plus ? -10 : 10), message: "Vérifie les retenues." }, { valeur: r + (plus ? -100 : 100), message: "Vérifie les retenues des centaines." }], aides: ["Aligne unités, dizaines, centaines, milliers.", "Commence par les unités.", plus ? "N'oublie pas les retenues." : "Si un chiffre du haut est trop petit, casse une unité du rang suivant."], solution: `${posee([nb(a), nb(b)], plus ? "+" : "-", nb(r))}${plus ? "" : `Vérification : $${nb(r)} + ${nb(b)} = ${nb(a)}$.`}` };
  };
  GEN["e2a-vocabulaire"] = function () {
    const a = rand(100, 5000), b = rand(50, 3000), t = rand(0, 2);
    if (t === 0) return { enonce: `Calcule la **somme** de $${nb(a)}$ et de $${nb(b)}$.`, mode: "nombre", prefixe: "", attendu: a + b, erreurs: [{ valeur: Math.abs(a - b), message: "La somme, c'est le résultat d'une addition." }, { valeur: a * b > 1e7 ? a + b + 10 : a * b, message: "La somme, c'est une addition." }], aides: ["La somme est le résultat d'une addition.", `$${nb(a)} + ${nb(b)}$.`, "Pose l'opération si besoin."], solution: `$${nb(a)} + ${nb(b)} = ${nb(a + b)}$.` };
    if (t === 1) { const [g, p] = a > b ? [a, b] : [b, a]; return { enonce: `Calcule la **différence** entre $${nb(g)}$ et $${nb(p)}$.`, mode: "nombre", prefixe: "", attendu: g - p, erreurs: [{ valeur: g + p, message: "La différence, c'est le résultat d'une soustraction." }, { valeur: g - p + 100, message: "Vérifie ta soustraction." }], aides: ["La différence est le résultat d'une soustraction.", `$${nb(g)} - ${nb(p)}$.`, "Vérifie avec une addition."], solution: `$${nb(g)} - ${nb(p)} = ${nb(g - p)}$.` }; }
    const c = melange("les termes", ["la somme", "les facteurs", "la différence", "les produits"]);
    return { enonce: `Dans l'addition $${nb(a)} + ${nb(b)} = ${nb(a + b)}$, comment appelle-t-on $${nb(a)}$ et $${nb(b)}$ ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Le résultat d'une addition s'appelle la somme.", "Les nombres qu'on additionne ont un autre nom.", "Ce mot sert aussi pour la soustraction."], solution: `$${nb(a)}$ et $${nb(b)}$ sont les **termes** ; $${nb(a + b)}$ est la **somme**.` };
  };

  GEN["e2a-completer"] = function () {
    const t = rand(0, 2), P = prenom();
    if (t === 0) { const a = 100 * rand(5, 80), c = a + 100 * rand(1, 20) + 10 * rand(0, 9); return { enonce: `Complète : $${nb(a)} + \\ldots = ${nb(c)}$`, mode: "nombre", prefixe: "", attendu: c - a, erreurs: [{ valeur: a + c, message: "On cherche l'écart : soustraction." }, { valeur: c - a + 100, message: "Vérifie en ajoutant." }], aides: ["Cherche ce qu'il faut ajouter.", `$${nb(c)} - ${nb(a)}$.`, "Vérifie avec une addition."], solution: `$${nb(c)} - ${nb(a)} = ${nb(c - a)}$.` }; }
    if (t === 1) { const a = rand(1200, 6000), b = rand(300, 2500); return { enonce: `${P.nom} a $${nb(a)}$ points au jeu. ${P.Il} en gagne encore $${nb(b)}$. Combien de points a-t-${P.il} maintenant ?`, mode: "nombre", prefixe: "", suffixe: "points", attendu: a + b, erreurs: [{ valeur: a - b, message: "Il en gagne : addition." }, { valeur: a + b - 1000, message: "Vérifie la retenue des milliers." }], aides: ["Il gagne des points : on ajoute.", `$${nb(a)} + ${nb(b)}$.`, "Pose l'addition."], solution: `$${nb(a)} + ${nb(b)} = ${nb(a + b)}$ points.` }; }
    const tot = rand(3000, 9500), a = rand(800, tot - 500);
    return { enonce: `Un stade de ${pick(E.LIEUX)} a $${nb(tot)}$ places. $${nb(a)}$ spectateurs sont déjà assis. Combien de places sont encore libres ?`, mode: "nombre", prefixe: "", suffixe: "places", attendu: tot - a, erreurs: [{ valeur: tot + a, message: "On cherche ce qui reste : soustraction." }, { valeur: tot - a + 100, message: "Vérifie ta soustraction." }], aides: ["Places libres = places en tout − places occupées.", `$${nb(tot)} - ${nb(a)}$.`, "Vérifie par une addition."], solution: `$${nb(tot)} - ${nb(a)} = ${nb(tot - a)}$ places libres.` };
  };

  /* =====================================================================
     Chapitre 5 : la multiplication posée (e2m-)
     ===================================================================== */
  GEN["e2m-posee"] = function () {
    const deux = rand(0, 2) === 0, a = deux ? rand(12, 99) : rand(23, 999), b = deux ? rand(11, 49) : rand(2, 9);
    if (a * b > 10000) return GEN["e2m-posee"]();
    const r = a * b;
    return { enonce: `Pose et calcule : $${a} ${X} ${b}$`, mode: "nombre", prefixe: "", attendu: r, erreurs: [{ valeur: a + b, message: "C'est une multiplication." }, ...(deux ? [{ valeur: a * (b % 10) + a * Math.floor(b / 10), message: `Le chiffre $${Math.floor(b / 10)}$ vaut $${10 * Math.floor(b / 10)}$ : décale d'un rang (mets un $0$) pour la deuxième ligne.` }] : [{ valeur: r - 10, message: "Vérifie les retenues." }])], aides: ["Mets le nombre qui a le moins de chiffres en bas.", deux ? `Multiplie d'abord par $${b % 10}$, puis par $${10 * Math.floor(b / 10)}$ (n'oublie pas le $0$).` : `Multiplie chaque chiffre de $${a}$ par $${b}$, en commençant par les unités.`, "N'oublie pas les retenues."], solution: deux ? `$${a} ${X} ${b % 10} = ${a * (b % 10)}$ et $${a} ${X} ${10 * Math.floor(b / 10)} = ${nb(a * 10 * Math.floor(b / 10))}$, puis $${a * (b % 10)} + ${nb(a * 10 * Math.floor(b / 10))} = ${nb(r)}$.` : `$${a} ${X} ${b} = ${nb(r)}$.` };
  };
  GEN["e2m-vocabulaire"] = function () {
    const t = rand(0, 2), a = rand(2, 10), b = rand(2, 10);
    if (t === 0) return { enonce: `Calcule le **produit** de $${a}$ et de $${b}$.`, mode: "nombre", prefixe: "", attendu: a * b, erreurs: [{ valeur: a + b, message: "Le produit, c'est le résultat d'une multiplication." }, { valeur: a * b + a, message: "Vérifie dans la table." }], aides: ["Le produit est le résultat d'une multiplication.", `$${a} ${X} ${b}$.`, "Utilise tes tables."], solution: `$${a} ${X} ${b} = ${a * b}$.` };
    if (t === 1) { const k = rand(2, 9), m = pick([2, 3, 4, 5, 6, 10, 25]), v = k * m; const autres = [v + 1, v + 2, v - 1].filter((x) => x % m !== 0); const c = melange(`$${v}$`, autres.map((x) => `$${x}$`)); return { enonce: `Lequel de ces nombres est un **multiple** de $${m}$ ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: [`Un multiple de $${m}$ est dans la table de $${m}$.`, `Récite : $${m}$, $${2 * m}$, $${3 * m}$…`, `$${k} ${X} ${m} = ${v}$.`], solution: `$${v} = ${k} ${X} ${m}$ : c'est un multiple de $${m}$.` }; }
    const c = melange("les facteurs", ["les termes", "le produit", "les multiples de $10$", "la somme"]);
    return { enonce: `Dans $${a} ${X} ${b} = ${a * b}$, comment appelle-t-on $${a}$ et $${b}$ ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Le résultat est le produit.", "Les nombres qu'on multiplie ont un autre nom.", "Pour l'addition on dit « termes », pour la multiplication…"], solution: `$${a}$ et $${b}$ sont les **facteurs**, $${a * b}$ est le **produit**.` };
  };

  /* =====================================================================
     Chapitre 6 : découvrir la division (e2v-)
     ===================================================================== */
  GEN["e2v-sens"] = function () {
    const t = rand(0, 2), k = rand(2, 9), v = rand(2, 12), N = k * v;
    if (t === 0) return { enonce: `On partage équitablement $${N}$ mangues entre $${k}$ enfants. Combien chacun en reçoit-il ? Écris aussi la division $${N} ${DIV} ${k}$.`, mode: "nombre", prefixe: `$${N} ${DIV} ${k} =$`, attendu: v, erreurs: [{ valeur: N - k, message: "On partage : c'est une division." }, { valeur: k, message: "Ça, c'est le nombre d'enfants." }].filter((e) => e.valeur !== v), aides: ["Chacun reçoit le même nombre.", `Cherche $${k} ${X} \\ldots = ${N}$.`, `Table de $${k}$.`], solution: `$${k} ${X} ${v} = ${N}$, donc $${N} ${DIV} ${k} = ${v}$.` };
    if (t === 1) return { enonce: `Avec $${N}$ élèves, on fait des équipes de $${v}$. Combien d'équipes ?`, mode: "nombre", prefixe: `$${N} ${DIV} ${v} =$`, attendu: k, erreurs: [{ valeur: N - v, message: "On cherche combien de fois " + v + " dans " + N + "." }, { valeur: v, message: "Ça, c'est le nombre d'élèves par équipe." }].filter((e) => e.valeur !== k), aides: [`Combien de fois $${v}$ dans $${N}$ ?`, `$\\ldots ${X} ${v} = ${N}$.`, "Utilise tes tables."], solution: `$${k} ${X} ${v} = ${N}$, donc $${N} ${DIV} ${v} = ${k}$ équipes.` };
    const q = rand(0, 1); return { enonce: `On sait que $${k} ${X} ${v} = ${N}$. Combien fait $${N} ${DIV} ${q ? k : v}$ ?`, mode: "nombre", prefixe: "", attendu: q ? v : k, erreurs: [{ valeur: q ? k : v, message: "Tu as donné le nombre par lequel on divise." }, { valeur: N * (q ? k : v) > 9999 ? N + 1 : N * (q ? k : v), message: "Diviser, c'est défaire la multiplication." }], aides: ["La division est l'inverse de la multiplication.", `Dans $${k} ${X} ${v} = ${N}$, si on divise $${N}$ par l'un, on trouve l'autre.`, `$${N} ${DIV} ${q ? k : v}$.`], solution: `$${k} ${X} ${v} = ${N}$, donc $${N} ${DIV} ${q ? k : v} = ${q ? v : k}$.` };
  };
  GEN["e2v-tables"] = function () {
    const a = rand(2, 10), b = rand(2, 10), N = a * b;
    return { enonce: `Calcule : $${N} ${DIV} ${a}$`, mode: "nombre", prefixe: "", attendu: b, erreurs: [{ valeur: N - a, message: "Diviser n'est pas soustraire." }, { valeur: b + 1, message: `Vérifie : $${a} ${X} ${b + 1} = ${a * (b + 1)}$.` }], aides: [`Quel nombre multiplié par $${a}$ donne $${N}$ ?`, `Récite la table de $${a}$.`, `$${a} ${X} \\ldots = ${N}$.`], solution: `$${a} ${X} ${b} = ${N}$, donc $${N} ${DIV} ${a} = ${b}$.` };
  };

  /* =====================================================================
     Chapitre 7 : calcul mental (e2k-)
     ===================================================================== */
  GEN["e2k-faits"] = function () {
    const t = rand(0, 4);
    if (t === 0) { const a = rand(2, 10), b = rand(2, 10), pos = rand(0, 2); const [txt, rep] = [[`$${a} ${X} ${b} = \\ldots$`, a * b], [`$${a} ${X} \\ldots = ${a * b}$`, b], [`$${a * b} = \\ldots ${X} ${b}$`, a]][pos]; return { enonce: `Complète : ${txt}`, mode: "nombre", prefixe: "", attendu: rep, erreurs: [{ valeur: pos ? a * b - (pos === 1 ? a : b) : a + b, message: "C'est une multiplication." }, { valeur: rep + 1, message: "Récite la table." }], aides: ["Récite la table.", "Échange les facteurs si c'est plus facile.", "Pars d'un résultat connu."], solution: `$${a} ${X} ${b} = ${a * b}$.` }; }
    if (t === 1) { const n = pick([...Array.from({ length: 20 }, (_, k) => k + 1), 25, 35, 45, 60, 75, 150, 250, 400, 600]); return { enonce: `Quel est le double de $${n}$ ?`, mode: "nombre", prefixe: "", attendu: 2 * n, erreurs: [{ valeur: n / 2, message: "Ça, c'est la moitié." }, { valeur: n + 2, message: "Le double : le nombre ajouté à lui-même." }].filter((e) => Number.isInteger(e.valeur)), aides: ["Double : $\\ldots + \\ldots$", `$${n} + ${n}$.`, "Double les dizaines et les unités."], solution: `$${n} + ${n} = ${nb(2 * n)}$.` }; }
    if (t === 2) { const n = pick([...Array.from({ length: 20 }, (_, k) => 2 * (k + 1)), 50, 70, 90, 120, 150, 300, 500, 700, 1000]); return { enonce: `Quelle est la moitié de $${nb(n)}$ ?`, mode: "nombre", prefixe: "", attendu: n / 2, erreurs: [{ valeur: 2 * n, message: "Ça, c'est le double." }, { valeur: n / 2 + 1, message: "Vérifie : la moitié + la moitié = le nombre." }], aides: ["Moitié : deux parts égales.", "Pense aux doubles.", "Décompose si besoin."], solution: `$${n / 2} + ${n / 2} = ${nb(n)}$.` }; }
    if (t === 3) { const [a, b] = pick([[1, 60], [2, 30], [3, 20], [4, 15], [5, 12], [6, 10]]), q = rand(0, 1); return { enonce: `Complète : $60 = ${q ? a : "\\ldots"} ${X} ${q ? "\\ldots" : b}$`, mode: "nombre", prefixe: "", attendu: q ? b : a, erreurs: [{ valeur: 60 - (q ? a : b), message: "C'est une multiplication." }, { valeur: (q ? b : a) + 1, message: "Vérifie en multipliant." }], aides: ["Cherche dans les décompositions de $60$.", "$60 = 6 \\times 10 = 5 \\times 12 = 4 \\times 15$…", "Vérifie ton résultat."], solution: `$60 = ${a} ${X} ${b}$.` }; }
    const k = rand(1, 4); return { enonce: `Calcule : $${k} ${X} 25$`, mode: "nombre", prefixe: "", attendu: 25 * k, erreurs: [{ valeur: 25 + k, message: "C'est une multiplication." }, { valeur: 20 * k, message: "$25$, pas $20$." }], aides: ["$2 \\times 25 = 50$.", "$4 \\times 25 = 100$.", "$3 \\times 25 = 75$."], solution: `$${k} ${X} 25 = ${25 * k}$.` };
  };
  GEN["e2k-strategies"] = function () {
    const t = rand(0, 4);
    if (t === 0) { const a = rand(12, 999), f = pick([10, 100]); if (a * f > 99999) return GEN["e2k-strategies"](); return { enonce: `Calcule : $${a} ${X} ${f}$`, mode: "nombre", prefixe: "", attendu: a * f, erreurs: [{ valeur: a + f, message: "C'est une multiplication." }, { valeur: a * (f === 10 ? 100 : 10), message: f === 10 ? "Un seul zéro pour $\\times 10$." : "Deux zéros pour $\\times 100$." }], aides: [f === 10 ? "Chaque chiffre prend une valeur $10$ fois plus grande." : "Chaque chiffre prend une valeur $100$ fois plus grande.", `On écrit ${f === 10 ? "un $0$" : "deux $0$"} à droite.`, `$${a}$ → $${nb(a * f)}$.`], solution: `$${a} ${X} ${f} = ${nb(a * f)}$.` }; }
    if (t === 1) { const a = rand(30, 900), op = pick(["+8", "+9", "+18", "+19", "+28", "+29", "+38", "-9", "-19", "-29", "-39"]), v = +op.slice(1), plus = op[0] === "+", rond = Math.ceil(v / 10) * 10, d = rond - v, r = plus ? a + v : a - v; if (r < 0) return GEN["e2k-strategies"](); return { enonce: `Calcule : $${a} ${plus ? "+" : "-"} ${v}$`, mode: "nombre", prefixe: "", attendu: r, erreurs: [{ valeur: plus ? a + rond : a - rond, message: `Tu as ${plus ? "ajouté" : "enlevé"} $${rond}$ : il faut encore ${plus ? "enlever" : "ajouter"} $${d}$.` }, { valeur: plus ? a + rond + d : a - rond - d, message: `Après avoir ${plus ? "ajouté" : "enlevé"} $${rond}$, il faut ${plus ? "enlever" : "ajouter"} $${d}$, pas l'inverse.` }], aides: [`$${v}$, c'est $${rond} - ${d}$.`, `${plus ? "Ajoute" : "Enlève"} $${rond}$ : $${a} ${plus ? "+" : "-"} ${rond} = ${plus ? a + rond : a - rond}$.`, `Puis ${plus ? "enlève" : "ajoute"} $${d}$.`], solution: `$${a} ${plus ? "+" : "-"} ${rond} = ${plus ? a + rond : a - rond}$, puis ${plus ? "$-" : "$+"} ${d}$ : $${r}$.` }; }
    if (t === 2) { const a = rand(3, 99), f = pick([4, 8]); return { enonce: `Calcule : $${a} ${X} ${f}$ (astuce : ${f === 4 ? "le double du double" : "le double du double du double"})`, mode: "nombre", prefixe: "", attendu: a * f, erreurs: [{ valeur: a * (f / 2), message: "Il faut encore doubler." }, { valeur: a * 2 * f, message: "Tu as doublé une fois de trop." }], aides: [`Double de $${a}$ : $${2 * a}$.`, `Double de $${2 * a}$ : $${4 * a}$.`, f === 8 ? `Double de $${4 * a}$ : $${8 * a}$.` : "C'est fini."], solution: `$${a} ${X} ${f} = ${nb(a * f)}$.` }; }
    if (t === 3) { const a = rand(2, 9), b = rand(2, 9), k = pick([10, 100]); return { enonce: `Calcule : $${a} ${X} ${b * k}$`, mode: "nombre", prefixe: "", attendu: a * b * k, erreurs: [{ valeur: a * b, message: `N'oublie pas : $${b * k}$, c'est $${b}$ ${k === 10 ? "dizaines" : "centaines"}.` }, { valeur: a * b * k * 10, message: "Un zéro de trop." }], aides: [`$${b * k} = ${b} ${X} ${k}$.`, `$${a} ${X} ${b} = ${a * b}$.`, `Puis $${X} ${k}$.`], solution: `$${a} ${X} ${b} = ${a * b}$ ${k === 10 ? "dizaines" : "centaines"}, donc $${a} ${X} ${b * k} = ${nb(a * b * k)}$.` }; }
    const a = rand(11, 99), b = rand(2, 9), d = Math.floor(a / 10), u = a % 10; if (u === 0) return GEN["e2k-strategies"]();
    return { enonce: `Calcule de tête : $${a} ${X} ${b}$`, mode: "nombre", prefixe: "", attendu: a * b, erreurs: [{ valeur: 10 * d * b + u, message: `Il faut aussi multiplier les unités : $${u} ${X} ${b}$.` }, { valeur: a * b + 10, message: "Vérifie l'addition finale." }], aides: [`$${a} = ${10 * d} + ${u}$.`, `$${10 * d} ${X} ${b} = ${10 * d * b}$ et $${u} ${X} ${b} = ${u * b}$.`, `$${10 * d * b} + ${u * b}$.`], solution: `$${a} ${X} ${b} = ${10 * d} ${X} ${b} + ${u} ${X} ${b} = ${10 * d * b} + ${u * b} = ${a * b}$.` };
  };

  GEN["e2k-numeration"] = function () {
    const a = rand(1000, 8999), k = rand(1, 9), rangs = [[10, "dizaine"], [100, "centaine"], [1000, "millier"]], [v, nom] = pick(rangs), plus = rand(0, 1), r = plus ? a + k * v : a - k * v;
    if (r < 0 || r > 9999) return GEN["e2k-numeration"]();
    return { enonce: `Calcule : $${nb(a)} ${plus ? "+" : "-"} ${nb(k * v)}$`, mode: "nombre", prefixe: "", attendu: r, erreurs: [{ valeur: plus ? a + k : a - k, message: `$${nb(k * v)}$, c'est $${k}$ ${nom}${k > 1 ? "s" : ""}, pas $${k}$ unités.` }, { valeur: plus ? a - k * v : a + k * v, message: plus ? "On ajoute." : "On enlève." }], aides: [`$${nb(k * v)}$, c'est $${k}$ ${nom}${k > 1 ? "s" : ""}.`, `Change le chiffre des ${nom}s.`, "Attention si ce chiffre dépasse $9$ ou passe sous $0$."], solution: `$${nb(a)} ${plus ? "+" : "-"} ${nb(k * v)} = ${nb(r)}$.` };
  };

  /* =====================================================================
     Chapitre 8 : résoudre des problèmes (e2r-)
     ===================================================================== */
  GEN["e2r-etapes"] = function () {
    const t = rand(0, 2), P = prenom();
    if (t === 0) { const nb1 = rand(3, 9), p1 = rand(2, 15), nb2 = rand(2, 6), p2 = rand(5, 30); return { enonce: `Au marché de Mamoudzou, ${P.nom} achète $${nb1}$ ananas à $${p1}$ € pièce et $${nb2}$ régimes de bananes à $${p2}$ € pièce. Combien paie-t-${P.il} ?`, mode: "nombre", prefixe: "", suffixe: "€", attendu: nb1 * p1 + nb2 * p2, erreurs: [{ valeur: nb1 * p1, message: "N'oublie pas les bananes." }, { valeur: p1 + p2, message: "Il y a plusieurs ananas et plusieurs régimes." }], aides: [`Ananas : $${nb1} ${X} ${p1}$.`, `Bananes : $${nb2} ${X} ${p2}$.`, "Additionne les deux."], solution: `$${nb1} ${X} ${p1} = ${nb1 * p1}$ ; $${nb2} ${X} ${p2} = ${nb2 * p2}$ ; total $${nb1 * p1 + nb2 * p2}$ €.` }; }
    if (t === 1) { const places = rand(30, 60), bus = rand(2, 6), eleves = places * bus - rand(1, places - 1); return { enonce: `Une école de ${pick(E.LIEUX)} emmène $${eleves}$ élèves au parc de Saziley. Chaque bus a $${places}$ places et on a réservé $${bus}$ bus. Combien de places restent libres ?`, mode: "nombre", prefixe: "", suffixe: "places", attendu: places * bus - eleves, erreurs: [{ valeur: places * bus, message: "Ça, c'est le nombre total de places." }, { valeur: Math.abs(eleves - places), message: "Il y a plusieurs bus." }], aides: [`Places en tout : $${places} ${X} ${bus}$.`, `$${places} ${X} ${bus} = ${places * bus}$.`, `$${places * bus} - ${eleves}$.`], solution: `$${places} ${X} ${bus} = ${places * bus}$ places ; $${places * bus} - ${eleves} = ${places * bus - eleves}$ places libres.` }; }
    const a = rand(200, 900), b = rand(50, 300), c = rand(100, 400); return { enonce: `Un camion transporte $${nb(a + b + c)}$ kg de sable. Il en livre $${a}$ kg à Combani, puis $${b}$ kg à Tsingoni. Combien de kilogrammes reste-t-il dans le camion ?`, mode: "nombre", prefixe: "", suffixe: "kg", attendu: c, erreurs: [{ valeur: a + b + c - a, message: "Il y a deux livraisons." }, { valeur: a + b, message: "Ça, c'est ce qui a été livré." }], aides: ["Calcule d'abord tout ce qui a été livré.", `$${a} + ${b} = ${a + b}$.`, `$${nb(a + b + c)} - ${a + b}$.`], solution: `Livré : $${a} + ${b} = ${a + b}$ kg. Reste : $${nb(a + b + c)} - ${a + b} = ${c}$ kg.` };
  };
  GEN["e2r-fois"] = function () {
    const t = rand(0, 2), [P1, P2] = E.deux(), k = rand(2, 6), v = rand(3, 25);
    if (t === 0) return { enonce: `Un casque coûte $${v}$ €. Une trottinette coûte $${k}$ fois plus cher. Combien coûte la trottinette ?`, mode: "nombre", prefixe: "", suffixe: "€", attendu: k * v, erreurs: [{ valeur: k + v, message: `« $${k}$ fois plus » : on multiplie, on n'ajoute pas.` }, { valeur: v, message: "Ça, c'est le prix du casque." }], aides: [`« $${k}$ fois plus cher » : on multiplie par $${k}$.`, `$${k} ${X} ${v}$.`, "Calcule."], solution: `$${k} ${X} ${v} = ${k * v}$ €.` };
    if (t === 1) return { enonce: `${P1.nom} a $${k * v}$ billes. ${P2.nom} en a $${k}$ fois moins. Combien ${P2.nom} a-t-${P2.il} de billes ?`, mode: "nombre", prefixe: "", suffixe: "billes", attendu: v, erreurs: [{ valeur: k * v - k, message: `« $${k}$ fois moins » : on divise par $${k}$, on n'enlève pas $${k}$.` }, { valeur: k * k * v, message: "« fois moins » : c'est plus petit." }], aides: [`« $${k}$ fois moins » : on divise par $${k}$.`, `$${k} ${X} \\ldots = ${k * v}$.`, `$${k * v} ${DIV} ${k}$.`], solution: `$${k * v} ${DIV} ${k} = ${v}$ billes (car $${k} ${X} ${v} = ${k * v}$).` };
    const a = rand(2, 7), b = rand(2, 8), [x, y] = pick([["pantalons", "tee-shirts"], ["entrées", "desserts"], ["casquettes", "paires de lunettes"], ["salouvas", "foulards"]]);
    return { enonce: `${P1.nom} a $${a}$ ${x} et $${b}$ ${y}. De combien de façons peut-${P1.il} s'habiller (ou composer son menu) en prenant un de chaque ?`.replace(" (ou composer son menu)", x === "entrées" ? "" : "").replace("peut-il s'habiller", x === "entrées" ? "peut-il composer son menu" : "peut-il s'habiller").replace("peut-elle s'habiller", x === "entrées" ? "peut-elle composer son menu" : "peut-elle s'habiller"), mode: "nombre", prefixe: "", suffixe: "façons", attendu: a * b, erreurs: [{ valeur: a + b, message: "Chaque " + x.replace(/s$/, "") + " va avec chaque " + y.replace(/s$/, "").replace("paires de lunette", "paire de lunettes") + " : on multiplie." }, { valeur: a * b + 1, message: "Fais un tableau pour compter." }], aides: ["Fais un tableau : une ligne par " + x.replace(/s$/, "") + ", une colonne par " + y.replace(/s$/, "") + ".", `Chaque ligne a $${b}$ cases.`, `$${a} ${X} ${b}$.`], solution: `Chacun des $${a}$ ${x} se combine avec les $${b}$ ${y} : $${a} ${X} ${b} = ${a * b}$ façons.` };
  };
  GEN["e2r-partage"] = function () {
    const k = rand(2, 9), v = rand(3, 30), N = k * v, t = rand(0, 1);
    const [o, g] = pick([["élèves", "équipes"], ["mangues", "cagettes"], ["œufs", "boîtes"], ["passagers", "barges"], ["livres", "étagères"]]);
    return t ? { enonce: `On range $${N}$ ${o} dans $${k}$ ${g} avec le même nombre dans chacune. Combien de ${o} par ${g.replace(/s$/, "")} ?`, mode: "nombre", prefixe: "", suffixe: o, attendu: v, erreurs: [{ valeur: N - k, message: "C'est un partage : division." }, { valeur: k, message: `Ça, c'est le nombre de ${g}.` }].filter((e) => e.valeur !== v), aides: ["On partage en parts égales.", `$${k} ${X} \\ldots = ${N}$.`, `$${N} ${DIV} ${k}$.`], solution: `$${N} ${DIV} ${k} = ${v}$ ${o} par ${g.replace(/s$/, "")}.` }
      : { enonce: `On range $${N}$ ${o} par $${v}$. Combien de ${g} faut-il ?`, mode: "nombre", prefixe: "", suffixe: g, attendu: k, erreurs: [{ valeur: N - v, message: "C'est une division : combien de fois " + v + " ?" }, { valeur: v, message: "Ça, c'est le nombre par " + g.replace(/s$/, "") + "." }].filter((e) => e.valeur !== k), aides: [`Combien de fois $${v}$ dans $${N}$ ?`, `$\\ldots ${X} ${v} = ${N}$.`, `$${N} ${DIV} ${v}$.`], solution: `$${N} ${DIV} ${v} = ${k}$ ${g}.` };
  };

  /* =====================================================================
     Chapitre 9 : longueurs et périmètre (e2l-)
     ===================================================================== */
  // Polygone dessiné avec la longueur de chaque côté écrite (cm)
  function polygoneCotes(type, L) {
    let pts;
    if (type === "rectangle") pts = [[40, 30], [280, 30], [280, 150], [40, 150]];
    else if (type === "carre") pts = [[100, 20], [220, 20], [220, 140], [100, 140]];
    else if (type === "triangle") pts = [[40, 150], [280, 150], [130, 25]];
    else pts = [[60, 150], [260, 150], [290, 70], [160, 15], [30, 70]];
    const n = pts.length, cx = pts.reduce((s, p) => s + p[0], 0) / n, cy = pts.reduce((s, p) => s + p[1], 0) / n;
    let s = `<polygon class="g-poly" points="${pts.map((p) => p.join(",")).join(" ")}"/>`;
    pts.forEach((p, i) => { const q = pts[(i + 1) % n], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, dx = mx - cx, dy = my - cy, d = Math.hypot(dx, dy) || 1; s += `<text class="g-mesure" x="${r1(mx + (dx / d) * 16)}" y="${r1(my + (dy / d) * 16 + 4)}" text-anchor="middle">${L[i]} cm</text>`; });
    return svg("polygone", 320, 175, "Polygone et longueurs de ses côtés", s);
  }
  FIGURES["e2l-cours-perimetre"] = () => polygoneCotes("rectangle", [8, 5, 8, 5]);
  FIGURES["e2l-qcm-triangle"] = () => polygoneCotes("triangle", [9, 7, 6]);
  GEN["e2l-perimetre"] = function () {
    const ty = pick(["rectangle", "carre", "triangle", "pentagone"]);
    let L;
    if (ty === "rectangle") { const a = rand(4, 15), b = rand(2, a - 1); L = [a, b, a, b]; }
    else if (ty === "carre") { const a = rand(2, 15); L = [a, a, a, a]; }
    else if (ty === "triangle") L = [rand(5, 15), rand(4, 12), rand(4, 12)];
    else L = Array.from({ length: 5 }, () => rand(3, 12));
    const p = L.reduce((s, v) => s + v, 0);
    return { enonce: `Quel est le périmètre de cette figure ?`, figure: polygoneCotes(ty, L), mode: "nombre", prefixe: "", suffixe: "cm", attendu: p, erreurs: [{ valeur: p - L[L.length - 1], message: "Tu as oublié un côté." }, ...(ty === "rectangle" ? [{ valeur: L[0] + L[1], message: "Il y a $4$ côtés, pas seulement deux." }] : [])], aides: ["Le périmètre est la longueur du tour de la figure.", "Ajoute les longueurs de tous les côtés.", `$${L.join(" + ")}$.`], solution: `$${L.join(" + ")} = ${p}$ cm.` };
  };
  GEN["e2l-unites"] = function () {
    const t = rand(0, 3);
    if (t === 0) { const [k, u1, u2, f] = pick([[rand(2, 9), "m", "cm", 100], [rand(2, 9), "dm", "cm", 10], [rand(2, 9), "cm", "mm", 10], [rand(2, 9), "m", "dm", 10], [rand(2, 9), "km", "m", 1000], [rand(2, 9), "m", "mm", 1000]]); return { enonce: `Complète : $${k}$ ${u1} $=$ … ${u2}`, mode: "nombre", prefixe: "", suffixe: u2, attendu: k * f, erreurs: [{ valeur: k * (f === 10 ? 100 : 10), message: `$1$ ${u1} $= ${nb(f)}$ ${u2}.` }, { valeur: k, message: "Le nombre change quand l'unité change." }], aides: [`$1$ ${u1} $= ${nb(f)}$ ${u2}.`, `$${k}$ fois plus.`, `$${k} ${X} ${nb(f)}$.`], solution: `$${k}$ ${u1} $= ${nb(k * f)}$ ${u2}.` }; }
    if (t === 1) { const m = rand(1, 5), c = rand(1, 99); return { enonce: `Complète : $${m}$ m $${c}$ cm $=$ … cm`, mode: "nombre", prefixe: "", suffixe: "cm", attendu: 100 * m + c, erreurs: [{ valeur: m + c, message: "$1$ m $= 100$ cm." }, { valeur: 10 * m + c, message: "$1$ m $= 100$ cm, pas $10$." }], aides: ["$1$ m $= 100$ cm.", `$${m}$ m $= ${100 * m}$ cm.`, `$${100 * m} + ${c}$.`], solution: `$${100 * m} + ${c} = ${100 * m + c}$ cm.` }; }
    if (t === 2) { const [o, u, f] = pick([["l'épaisseur d'un cahier", "mm", ["km", "m", "dm"]], ["la longueur d'une fourmi", "mm", ["km", "m", "dm"]], ["la longueur d'un crayon", "cm", ["km", "m", "mm"]], ["la largeur d'une table", "dm", ["km", "mm", "m"]], ["la distance de Mamoudzou à Bandrélé", "km", ["cm", "mm", "dm"]], ["la longueur de la cour", "m", ["mm", "km", "cm"]], ["la hauteur d'un manguier", "m", ["mm", "km", "cm"]]]); const c = melange(u, f); return { enonce: `Quelle unité choisir pour exprimer ${o} ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["mm : tout petit ; cm : petit ; dm : une dizaine de cm ; m : grand ; km : très grand.", "Imagine l'objet.", "Choisis l'unité qui donne un nombre pas trop grand ni trop petit."], solution: `Pour ${o}, on choisit le ${{ mm: "millimètre", cm: "centimètre", dm: "décimètre", m: "mètre", km: "kilomètre" }[u]}.` }; }
    const L = E.tirage([[1000, "1 m"], [80, "80 cm"], [120, "12 dm"], [1500, "1 m 50 cm"], [600, "600 mm"], [2000, "2 m"], [45, "45 mm"]], 4), grand = rand(0, 1);
    const toMM = (x) => x[0]; const M = { "1 m": 1000, "80 cm": 800, "12 dm": 1200, "1 m 50 cm": 1500, "600 mm": 600, "2 m": 2000, "45 mm": 45 };
    const vals = L.map((x) => M[x[1]]), v = grand ? Math.max(...vals) : Math.min(...vals), rep = L[vals.indexOf(v)][1], c = melange(rep, L.map((x) => x[1]));
    return { enonce: `Quelle longueur est la plus **${grand ? "grande" : "petite"}** : ${L.map((x) => x[1]).join(" ; ")} ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Convertis tout dans la même unité (en mm par exemple).", "$1$ m $= 1\\,000$ mm ; $1$ dm $= 100$ mm ; $1$ cm $= 10$ mm.", "Compare ensuite."], solution: `En mm : ${L.map((x) => `${x[1]} = $${nb(M[x[1]])}$ mm`).join(" ; ")}. La plus ${grand ? "grande" : "petite"} est ${rep}.` };
  };

  /* =====================================================================
     Chapitre 10 : masses et contenances (e2p-)
     ===================================================================== */
  GEN["e2p-conversions"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const [k, u1, u2, f] = pick([[rand(2, 9), "kg", "g", 1000], [rand(2, 9), "t", "kg", 1000], [rand(2, 9), "L", "dL", 10], [rand(2, 9), "L", "cL", 100], [rand(2, 9), "dL", "cL", 10]]); return { enonce: `Complète : $${k}$ ${u1} $=$ … ${u2}`, mode: "nombre", prefixe: "", suffixe: u2, attendu: k * f, erreurs: [{ valeur: k * (f === 1000 ? 100 : f === 100 ? 10 : 100), message: `$1$ ${u1} $= ${nb(f)}$ ${u2}.` }, { valeur: k, message: "Le nombre change quand l'unité change." }], aides: [`$1$ ${u1} $= ${nb(f)}$ ${u2}.`, `$${k}$ fois plus.`, `$${k} ${X} ${nb(f)}$.`], solution: `$${k}$ ${u1} $= ${nb(k * f)}$ ${u2}.` }; }
    if (t === 1) { const [o, u, f] = pick([["la masse d'un camion", "t", ["g", "kg"]], ["la masse d'une pomme", "g", ["t", "kg"]], ["la masse d'un enfant", "kg", ["t", "g"]], ["la contenance d'une bouteille d'eau", "L", ["cL", "kg"]], ["la contenance d'une cuillère", "cL", ["L", "kg"]], ["la contenance d'un verre", "cL", ["L", "t"]], ["la masse d'un éléphant", "t", ["g", "cL"]], ["la contenance d'une baignoire", "L", ["cL", "g"]]]); const c = melange(u, f.concat(["mm"])); return { enonce: `Quelle unité choisir pour exprimer ${o} ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["g, kg, t : des masses. L, dL, cL : des contenances.", "Pense à la taille de la chose.", "Un nombre ni trop grand, ni trop petit."], solution: `${Maj(o)} s'exprime en ${u}.` }; }
    const P = prenom(), a = rand(2, 9), b = rand(10, 90);
    return { enonce: `${P.nom} verse $${a}$ bouteilles de $${b}$ cL de jus dans un grand pichet. Combien de centilitres de jus y a-t-il dans le pichet ?`, mode: "nombre", prefixe: "", suffixe: "cL", attendu: a * b, erreurs: [{ valeur: a + b, message: "Il y a plusieurs bouteilles : on multiplie." }, { valeur: a * b / 100, message: "La réponse est demandée en cL." }].filter((e) => Number.isInteger(e.valeur)), aides: [`$${a}$ bouteilles de $${b}$ cL.`, `$${a} ${X} ${b}$.`, "Calcule."], solution: `$${a} ${X} ${b} = ${a * b}$ cL${a * b >= 100 ? ` (plus de $${Math.floor(a * b / 100)}$ L)` : ""}.` };
  };
  GEN["e2p-comparer"] = function () {
    const t = rand(0, 1);
    const L = t ? E.tirage([["1 kg", 1000], ["800 g", 800], ["2 kg", 2000], ["1 500 g", 1500], ["950 g", 950], ["1 t", 1000000], ["300 kg", 300000]], 4) : E.tirage([["1 L", 100], ["50 cL", 50], ["8 dL", 80], ["2 L", 200], ["150 cL", 150], ["3 dL", 30]], 4);
    const grand = rand(0, 1), v = grand ? Math.max(...L.map((x) => x[1])) : Math.min(...L.map((x) => x[1])), rep = L.find((x) => x[1] === v)[0], c = melange(rep, L.map((x) => x[0]));
    return { enonce: `Quelle ${t ? "masse" : "contenance"} est la plus **${grand ? "grande" : "petite"}** : ${L.map((x) => x[0]).join(" ; ")} ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: [t ? "$1$ t $= 1\\,000$ kg ; $1$ kg $= 1\\,000$ g." : "$1$ L $= 10$ dL $= 100$ cL.", `Écris tout en ${t ? "grammes" : "centilitres"}.`, "Compare les nombres."], solution: `En ${t ? "grammes" : "centilitres"} : ${L.map((x) => `${x[0]} = $${nb(x[1])}$`).join(" ; ")}. Réponse : ${rep}.` };
  };

  /* =====================================================================
     Chapitre 11 : la monnaie (e2e-)
     ===================================================================== */
  const prixTex = (c) => `$${nb(c / 100)}${c % 100 && c % 10 === 0 ? "0" : ""}$ €`;
  GEN["e2e-additionner"] = function () {
    const n = rand(2, 3), L = Array.from({ length: n }, () => 10 * rand(5, 250)), tot = L.reduce((s, v) => s + v, 0), P = prenom();
    const objs = E.tirage(["un cahier", "une trousse", "un livre", "des crayons", "une gourde", "un compas", "une règle"], n);
    return { enonce: `${P.nom} achète ${objs.map((o, i) => `${o} à ${prixTex(L[i])}`).join(", ").replace(/, ([^,]*)$/, " et $1")}. Combien paie-t-${P.il} en tout ? (écris avec une virgule)`, mode: "nombre", prefixe: "", suffixe: "€", attendu: tot / 100, erreurs: [{ valeur: tot, message: "Réponds en euros, avec une virgule." }, { valeur: (tot - 100) / 100, message: "Vérifie la retenue des centimes vers les euros." }], aides: ["Pose l'addition en alignant les virgules.", "Additionne les centimes, puis les euros.", "$100$ centimes font $1$ euro de plus."], solution: `${prixTex(L[0])}${L.slice(1).map((v) => " + " + prixTex(v)).join("")} = ${prixTex(tot)}.` };
  };
  GEN["e2e-rendre"] = function () {
    const billet = pick([10, 20, 50]), prix = 10 * rand(30, billet * 10 - 5), P = prenom();
    return { enonce: `${P.nom} paie ${pick(["un repas", "des fruits", "un ballon", "un livre"])} à ${prixTex(prix)} avec un billet de $${billet}$ €. Combien lui rend-on ? (écris avec une virgule)`, mode: "nombre", prefixe: "", suffixe: "€", attendu: (100 * billet - prix) / 100, erreurs: [{ valeur: prix / 100, message: "Ça, c'est le prix." }, { valeur: (100 * billet - prix) / 100 + 1, message: "Vérifie : prix + monnaie = billet." }], aides: ["Complète jusqu'à l'euro suivant.", `Puis jusqu'à $${billet}$ €.`, "Additionne ce que tu as ajouté."], solution: `$${nb(100 * billet)} - ${prix} = ${nb(100 * billet - prix)}$ centimes : on rend ${prixTex(100 * billet - prix)}.` };
  };

  /* =====================================================================
     Chapitre 12 : l'heure et les durées (e2h-)
     ===================================================================== */
  const hm = (h, m) => `${h} h ${String(m).padStart(2, "0")}`;
  FIGURES["e2h-cours-horloge"] = () => horloges([[10, 37, "10 h 37"]]);
  GEN["e2h-lire"] = function () {
    const h = rand(1, 12), m = rand(1, 59), apm = rand(0, 1) && h < 12, H = apm ? h + 12 : h;
    const c = melange(hm(H, m), [hm(H, (m + 5) % 60), hm(apm ? H : H + 1 > 23 ? H - 1 : H + 1, m), hm(Math.max(1, Math.round(m / 5)) % 12 || 12, (h * 5) % 60), hm(apm ? h : h + 12 > 23 ? h : h + 12, m)].filter((x) => x !== hm(H, m)));
    return { enonce: `${apm ? "C'est l'après-midi." : "C'est le matin."} Quelle heure indique l'horloge ?`, figure: horloges([[h, m, ""]]), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Petite aiguille : les heures. Grande aiguille : les minutes.", "Chaque petit trait vaut $1$ minute ; chaque nombre, $5$ minutes de plus.", apm ? "L'après-midi, on ajoute $12$ aux heures." : "Le matin, on garde l'heure."], solution: `Il est ${hm(H, m)}.` };
  };
  GEN["e2h-durees"] = function () {
    const t = rand(0, 1);
    if (t === 0) { const h1 = rand(7, 16), m1 = rand(0, 11) * 5, d = rand(2, 30) * 5, T = 60 * h1 + m1 + d, h2 = Math.floor(T / 60), m2 = T % 60; return { enonce: `Le film commence à ${hm(h1, m1)} et finit à ${hm(h2, m2)}. Combien de minutes dure-t-il ?`, mode: "nombre", prefixe: "", suffixe: "minutes", attendu: d, erreurs: [{ valeur: (h2 - h1) * 100 + m2 - m1, message: "Une heure fait $60$ minutes, pas $100$." }, { valeur: d - 60, message: "Compte bien l'heure entière." }].filter((e) => e.valeur > 0 && e.valeur !== d), aides: ["Va de l'heure de début à l'heure juste suivante.", "Puis ajoute les heures entières et les minutes restantes.", "$1$ h $= 60$ min."], solution: `De ${hm(h1, m1)} à ${hm(h2, m2)} : $${d}$ minutes${d >= 60 ? ` ($${Math.floor(d / 60)}$ h $${d % 60}$ min)` : ""}.` }; }
    const h1 = rand(7, 15), m1 = rand(0, 11) * 5, d = rand(2, 20) * 5 + 60 * rand(0, 2), T = 60 * h1 + m1 + d, P = prenom();
    return { enonce: `${P.nom} part de chez ${P.f ? "elle" : "lui"} à ${hm(h1, m1)} pour aller à la plage de Sakouli. Le trajet dure $${d >= 60 ? `${Math.floor(d / 60)}$ h $${d % 60}` : d}$ min. À quelle heure arrive-t-${P.il} ? Donne les **minutes** de l'heure d'arrivée.`, mode: "nombre", prefixe: `${Math.floor(T / 60)} h`, suffixe: "min", attendu: T % 60, erreurs: [{ valeur: m1 + (d % 60), message: "Si les minutes dépassent $59$, on passe à l'heure suivante." }].filter((e) => e.valeur !== T % 60), aides: ["Ajoute d'abord les heures, puis les minutes.", "Si on dépasse $60$ minutes, on ajoute $1$ heure.", `L'heure d'arrivée est ${Math.floor(T / 60)} h et quelques minutes.`], solution: `${hm(h1, m1)} $+$ $${d}$ min $=$ ${hm(Math.floor(T / 60), T % 60)}, c'est-à-dire $${Math.floor(T / 60)}$ h et $${T % 60}$ min.` };
  };

  /* =====================================================================
     Chapitre 13 : les solides (e2s-)
     ===================================================================== */
  const NOM_S = { cube: "un cube", pave: "un pavé", boule: "une boule", cylindre: "un cylindre", cone: "un cône", pyramide: "une pyramide" };
  // Patron : cases [c, l] de 6 carrés
  const PATRONS_OK = [[[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]], [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [3, 2]], [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [2, 2]], [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [3, 2]], [[2, 0], [0, 1], [1, 1], [2, 1], [3, 1], [0, 2]]];
  const PATRONS_KO = [[[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]], [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1]], [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1], [3, 1]], [[0, 0], [1, 0], [2, 0], [3, 0], [1, 1], [2, 1]]];
  const patron = (cells, lettre) => { const u = 20, maxC = Math.max(...cells.map((c) => c[0])) + 1; return `<g>${cells.map(([c, l]) => `<rect class="g-rect" x="${c * u}" y="${l * u}" width="${u}" height="${u}"/>`).join("")}${lettre ? `<text class="g-clabel" x="${(maxC * u) / 2}" y="${4 * u + 14}" text-anchor="middle">${lettre}</text>` : ""}</g>`; };
  FIGURES["e2s-cours-patron"] = () => svg("patrons", 320, 100, "Patron de cube", `<g transform="translate(110 4)">${patron(PATRONS_OK[0])}</g>`);
  GEN["e2s-patron"] = function () {
    const bon = pick(PATRONS_OK), mauvais = E.tirage(PATRONS_KO, 2), k = rand(0, 2), L = [...mauvais]; L.splice(k, 0, bon);
    const noms = ["A", "B", "C"], c = melange(noms[k], [...noms, "Aucun"]);
    const fig = svg("patrons", 320, 110, "Trois assemblages de six carrés", L.map((cells, i) => `<g transform="translate(${8 + i * 106} 4) scale(0.8)">${patron(cells, noms[i])}</g>`).join(""));
    return { enonce: "Lequel de ces assemblages de $6$ carrés est un **patron de cube** (on peut le plier pour fermer un cube) ?", figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Imagine que tu plies sur les traits.", "Deux carrés ne doivent pas se retrouver sur la même face.", "Une ligne de $4$ carrés avec un carré de chaque côté marche souvent."], solution: `L'assemblage ${noms[k]} se plie en cube : chaque carré devient une face différente.` };
  };
  GEN["e2s-decrire"] = function () {
    const t = rand(0, 3);
    if (t === 3) { const L = E.tirage(Object.keys(NOM_S), 3), k = rand(0, 2), noms = ["A", "B", "C"], c = melange(noms[k], [...noms, "Aucun"]); return { enonce: `Lequel de ces solides est ${NOM_S[L[k]]} ?`, figure: solides(L), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Regarde chaque solide.", "Roule-t-il ? A-t-il une pointe ? Des faces plates ?", "Élimine ceux qui ne vont pas."], solution: `Le solide ${noms[k]} est ${NOM_S[L[k]]}.` }; }
    if (t === 0) { const ty = pick(Object.keys(NOM_S)), c = melange(Maj(NOM_S[ty]), Object.values(NOM_S).map(Maj)); return { enonce: "Comment s'appelle ce solide ?", figure: solide(ty), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Roule-t-il ?", "A-t-il une pointe ?", "Regarde ses faces."], solution: `C'est ${NOM_S[ty]}.` }; }
    if (t === 1) { const [ty, F, S, A] = pick([["cube", 6, 8, 12], ["pave", 6, 8, 12], ["pyramide", 5, 5, 8]]), q = rand(0, 2), mot = ["faces", "sommets", "arêtes"][q], v = [F, S, A][q]; return { enonce: `Combien ${NOM_S[ty].split(" ")[0]} ${NOM_S[ty].split(" ")[1]} a-t-${ty === "pyramide" ? "elle" : "il"} de ${mot} ?`, figure: solide(ty), mode: "nombre", prefixe: "", suffixe: mot, attendu: v, erreurs: [{ valeur: v - 1, message: "Compte aussi ce qui est caché." }, { valeur: v + 1, message: "Tu as compté un élément deux fois." }], aides: ["Les pointillés montrent ce qui est caché.", "Compte en haut, en bas, sur les côtés.", "Vérifie en recomptant."], solution: `${Maj(NOM_S[ty])} a $${F}$ faces, $${S}$ sommets, $${A}$ arêtes.` }; }
    const [ty, bon] = pick([["pyramide", "des triangles et un carré"], ["cube", "six carrés"], ["pave", "des rectangles"], ["cylindre", "deux disques (et une partie arrondie)"]]);
    const c = melange(bon, ["des triangles et un carré", "six carrés", "des rectangles", "deux disques (et une partie arrondie)", "seulement des triangles"]);
    return { enonce: `Quelles sont les faces plates d'${NOM_S[ty]} ?`, figure: solide(ty), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Une face plate est une surface sur laquelle le solide peut être posé.", "Regarde aussi les faces cachées.", "Combien de côtés a chaque face ?"], solution: `Les faces plates d'${NOM_S[ty]} : ${bon}.` };
  };

  /* =====================================================================
     Chapitre 14 : figures et symétrie (e2g-)
     ===================================================================== */
  FIGURES["e2g-cours-formes"] = () => formes([{ type: "carre", nom: "carré" }, { type: "rectangle", nom: "rectangle" }, { type: "losange", nom: "losange" }, { type: "rectangle-tri", nom: "triangle rect." }]);
  FIGURES["e2g-cours-symetrie"] = () => quadrillage(8, 5, { axe: 4, colorie: [[1, 1], [2, 1], [2, 2], [3, 2], [3, 3], [4, 3], [4, 2], [5, 2], [5, 1], [6, 1], [3, 1], [4, 1]] });
  GEN["e2g-figures"] = function () {
    const N = { carre: "un carré", rectangle: "un rectangle", losange: "un losange", triangle: "un triangle", "rectangle-tri": "un triangle rectangle", cercle: "un cercle" };
    const t = rand(0, 2);
    if (t === 2) { const L = E.tirage(Object.keys(N), 3), k = rand(0, 2), noms = ["A", "B", "C"], c = melange(noms[k], [...noms, "Aucune"]); return { enonce: `Quelle figure est ${N[L[k]]} ?`, figure: formes(L.map((ty, i) => ({ type: ty, nom: noms[i] }))), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Compte les côtés de chaque figure.", "Cherche les angles droits et les côtés égaux.", "Le losange a $4$ côtés égaux et la forme d'un cerf-volant penché."], solution: `La figure ${noms[k]} est ${N[L[k]]}.` }; }
    if (t === 0) { const ty = pick(Object.keys(N)), c = melange(Maj(N[ty]), Object.values(N).map(Maj)); return { enonce: "Comment s'appelle cette figure ?", figure: formes([{ type: ty }]), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Compte les côtés.", "Le losange a $4$ côtés égaux mais pas d'angle droit.", "Cherche les angles droits."], solution: `C'est ${N[ty]}.` }; }
    const [q, bon, f] = pick([["Un losange a :", "$4$ côtés de même longueur", ["$4$ angles droits obligatoirement", "$3$ côtés", "des côtés tous différents"]], ["Quelle figure a $4$ côtés égaux et $4$ angles droits ?", "le carré", ["le losange (toujours)", "le rectangle (toujours)", "le triangle"]], ["Un rectangle a :", "$4$ angles droits", ["$4$ côtés égaux toujours", "$3$ angles droits", "aucun angle droit"]], ["Sur une figure, deux petits traits identiques sur deux côtés veulent dire :", "ces côtés ont la même longueur", ["ces côtés sont parallèles", "il y a un angle droit", "les côtés sont courbes"]], ["Le petit carré dans un coin veut dire :", "angle droit", ["côtés égaux", "milieu", "centre"]]]);
    const c = melange(bon, f); return { enonce: q, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Pense aux propriétés du cours.", "Carré : $4$ côtés égaux, $4$ angles droits. Rectangle : $4$ angles droits. Losange : $4$ côtés égaux.", "Les codages : petit carré = angle droit ; traits = longueurs égales."], solution: `Réponse : ${bon}.` };
  };
  GEN["e2g-symetrie"] = function () {
    const t = rand(0, 1);
    if (t === 0) { const [ty, nbA] = pick([["carre", 4], ["rectangle", 2], ["losange", 2], ["triangle", 0], ["pentagone", 5], ["hexagone", 6]]); const c = melange(`$${nbA}$`, ["$0$", "$1$", "$2$", "$4$", "$6$", "$5$"].filter((x) => x !== `$${nbA}$`)); return { enonce: "Combien d'axes de symétrie a cette figure ?", figure: formes([{ type: ty }]), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Un axe de symétrie partage la figure en deux moitiés qui se superposent par pliage.", "Essaie les pliages horizontal, vertical, en diagonale.", "Compte tous les pliages qui marchent."], solution: `Cette figure a $${nbA}$ axe${nbA > 1 ? "s" : ""} de symétrie.` }; }
    const n = 8, m = 5, axe = 4, c0 = rand(0, 3), l0 = rand(0, m - 1), sym = [2 * axe - 1 - c0, l0];
    const autres = [[sym[0] + 1, l0], [c0, l0 === 0 ? 1 : l0 - 1], [sym[0], l0 === m - 1 ? l0 - 1 : l0 + 1]].filter(([c, l]) => c >= axe && c < n && l >= 0 && l < m);
    const noms = ["A", "B", "C"], k = rand(0, Math.min(2, autres.length)), places = autres.slice(0, 2); places.splice(k, 0, sym);
    const c = melange(noms[k], [...noms, "Aucune"]);
    return { enonce: "La droite rouge est un axe de symétrie. Quelle lettre est sur la case symétrique de la case coloriée ?", figure: quadrillage(n, m, { axe, colorie: [[c0, l0]], objets: places.map((p, i) => [p[0], p[1], noms[i]]) }), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["La case symétrique est à la même distance de l'axe, de l'autre côté.", `La case coloriée est à $${axe - c0}$ case${axe - c0 > 1 ? "s" : ""} de l'axe.`, "Elle reste sur la même ligne."], solution: `La case coloriée est à $${axe - c0}$ case${axe - c0 > 1 ? "s" : ""} à gauche de l'axe : sa symétrique est à $${axe - c0}$ case${axe - c0 > 1 ? "s" : ""} à droite, sur la même ligne : c'est ${noms[k]}.` };
  };

  /* =====================================================================
     Chapitre 15 : tableaux et diagrammes (e2d-)
     ===================================================================== */
  FIGURES["e2d-cours-barres"] = () => barres([["Alphaville", 78], ["Bêtaville", 32], ["Gammaville", 13], ["Deltaville", 52]], 20, "élèves");
  GEN["e2d-diagramme"] = function () {
    const [titre, cats] = pick([["Nombre de frères et sœurs", ["0", "1", "2", "3", "4 et +"]], ["Âge des enfants du club", ["7 ans", "8 ans", "9 ans", "10 ans"]], ["Sport préféré", ["foot", "basket", "natation", "judo", "handball"]], ["Moyen de transport", ["à pied", "bus", "voiture", "taxi"]]]), pas = pick([2, 5, 10]);
    const vals = cats.map(() => pas * rand(1, 9)), fig = barres(cats.map((c, k) => [c, vals[k]]), pas, "élèves"), t = rand(0, 2);
    if (t === 0) { const i = rand(0, cats.length - 1); return { enonce: `${titre} : combien d'élèves pour « ${cats[i]} » ?`, figure: fig, mode: "nombre", prefixe: "", suffixe: "élèves", attendu: vals[i], erreurs: [{ valeur: vals[i] / pas, message: `Une ligne vaut $${pas}$.` }, { valeur: vals[i] + pas, message: "Lis bien le haut de la barre." }].filter((e) => e.valeur !== vals[i]), aides: [`L'échelle va de $${pas}$ en $${pas}$.`, "Suis le haut de la barre.", "Lis la valeur sur l'axe."], solution: `$${vals[i]}$ élèves.` }; }
    if (t === 1) { const tot = vals.reduce((s, v) => s + v, 0); return { enonce: `${titre} : combien d'élèves en tout ?`, figure: fig, mode: "nombre", prefixe: "", suffixe: "élèves", attendu: tot, erreurs: [{ valeur: cats.length, message: "On additionne les hauteurs." }, { valeur: tot - vals[vals.length - 1], message: "N'oublie pas la dernière barre." }], aides: ["Lis chaque barre.", `$${vals.join(" + ")}$.`, "Additionne."], solution: `$${vals.join(" + ")} = ${tot}$ élèves.` }; }
    const [i, k] = E.tirage(cats.map((_, j) => j), 2), [a, b] = vals[i] >= vals[k] ? [i, k] : [k, i];
    return { enonce: `${titre} : combien d'élèves de plus pour « ${cats[a]} » que pour « ${cats[b]} » ?`, figure: fig, mode: "nombre", prefixe: "", suffixe: "élèves", attendu: vals[a] - vals[b], erreurs: [{ valeur: vals[a] + vals[b], message: "C'est un écart : soustraction." }, { valeur: (vals[a] - vals[b]) / pas, message: `Une ligne vaut $${pas}$.` }].filter((e) => e.valeur !== vals[a] - vals[b]), aides: [`« ${cats[a]} » : $${vals[a]}$.`, `« ${cats[b]} » : $${vals[b]}$.`, "Soustrais."], solution: `$${vals[a]} - ${vals[b]} = ${vals[a] - vals[b]}$ élèves de plus.` };
  };
  GEN["e2d-tableau"] = function () {
    const cats = E.tirage(["à pied", "en vélo", "en voiture", "en bus"], 3), V = [cats.map(() => rand(10, 90)), cats.map(() => rand(10, 90))], totL = V.map((l) => l.reduce((s, v) => s + v, 0)), totC = cats.map((_, j) => V[0][j] + V[1][j]), T = totL[0] + totL[1];
    const g = rand(0, 1), j = rand(0, 2), t = rand(0, 1);
    const tab = { lignes: [["", ...cats.map(TX), TX("Total")], [TX("Filles"), ...V[0].map((v, k) => (t === 1 && g === 0 && k === j ? "?" : String(v))), String(totL[0])], [TX("Garçons"), ...V[1].map((v, k) => (t === 1 && g === 1 && k === j ? "?" : String(v))), String(totL[1])], [TX("Total"), ...totC.map(String), String(T)]] };
    if (t === 0) { const q = rand(0, 1); return q ? { enonce: "Combien d'élèves ont répondu en tout ?", tableau: tab, mode: "nombre", prefixe: "", suffixe: "élèves", attendu: T, erreurs: [{ valeur: totL[0], message: "Ça, ce sont seulement les filles." }, { valeur: totL[1], message: "Ça, ce sont seulement les garçons." }], aides: ["Regarde la case en bas à droite.", "C'est le total des filles et des garçons.", `$${totL[0]} + ${totL[1]}$.`], solution: `$${totL[0]} + ${totL[1]} = ${T}$ élèves.` } : { enonce: `Combien de ${g ? "garçons" : "filles"} viennent ${cats[j]} ?`, tableau: tab, mode: "nombre", prefixe: "", attendu: V[g][j], erreurs: [{ valeur: V[1 - g][j], message: "Mauvaise ligne." }, { valeur: totC[j], message: "Ça, c'est le total de la colonne." }].filter((e) => e.valeur !== V[g][j]), aides: [`Ligne « ${g ? "Garçons" : "Filles"} ».`, `Colonne « ${cats[j]} ».`, "Lis la case."], solution: `$${V[g][j]}$.` }; }
    return { enonce: "Quel nombre manque à la place du « ? » ?", tableau: tab, mode: "nombre", prefixe: "", attendu: V[g][j], erreurs: [{ valeur: totC[j], message: "Ça, c'est le total de la colonne." }, { valeur: totL[g] + V[g][j], message: "Il faut soustraire, pas ajouter." }], aides: [`Le total de la colonne « ${cats[j]} » est $${totC[j]}$.`, `L'autre case de la colonne vaut $${V[1 - g][j]}$.`, `$${totC[j]} - ${V[1 - g][j]}$.`], solution: `$${totC[j]} - ${V[1 - g][j]} = ${V[g][j]}$.` };
  };

  elisions(/^e2[a-z]-/);
})();
