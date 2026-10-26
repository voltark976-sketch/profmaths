/*
  Exercices du CE1 (programme du cycle 2, BO n° 41 du 31 octobre 2024, en vigueur depuis la rentrée 2025).
  Chargé à l'ouverture d'un chapitre du CE1, après assets/exercices-ecole.js dont il reprend les outils.
  Nombres jusqu'à 1 000 ; fractions de dénominateur 2, 3, 4, 5, 6, 8 ou 10 (inférieures ou égales à 1) ;
  tables de multiplication de 0 à 10 ; pas de calculatrice.
  Préfixes : e1n- (nombres), e1c- (comparer), e1p- (pair, impair), e1f- (fractions), e1a- (addition et soustraction),
  e1m- (multiplication), e1k- (calcul mental), e1r- (problèmes), e1l- (longueurs et masses), e1e- (monnaie), e1h- (heure),
  e1s- (solides), e1g- (figures), e1d- (repérage et données).
*/
(function () {
  "use strict";
  const { GEN, FIGURES } = window.PM_EXO;
  const E = window.PM_EXO.ecole;
  const { rand, pick, melange, nb, nbT, enLettres, prenom, paquets, collection, bande, droite, schema, bandesFr, disquesFr, elisions } = E;
  const X = "\\times";
  const Maj = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const pl = (k, s, p) => (k > 1 ? p || s + "s" : s);
  // Fraction en KaTeX
  const fr = (a, b) => `\\dfrac{${a}}{${b}}`;
  const FRAC = " Écris ta réponse sous forme de fraction, par exemple $3/8$ pour $\\dfrac{3}{8}$.";
  const NOMS_FR = { 2: ["demi", "demis"], 3: ["tiers", "tiers"], 4: ["quart", "quarts"], 5: ["cinquième", "cinquièmes"], 6: ["sixième", "sixièmes"], 8: ["huitième", "huitièmes"], 10: ["dixième", "dixièmes"] };
  const frLettres = (a, b) => `${enLettres(a).replace(/^un$/, "un")} ${NOMS_FR[b][a > 1 ? 1 : 0]}`;

  /* =====================================================================
     Chapitre 1 : les nombres jusqu'à 1 000 (e1n-)
     ===================================================================== */
  FIGURES["e1n-cours-paquets"] = () => paquets(2, 4, 7, { aria: "2 plaques de cent, 4 barres de dix et 7 cubes" });
  FIGURES["e1n-qcm-paquets"] = () => paquets(3, 0, 5, { aria: "3 plaques de cent et 5 cubes" });
  FIGURES["e1n-methode-paquets"] = () => paquets(1, 6, 3, { aria: "1 plaque de cent, 6 barres de dix et 3 cubes" });

  GEN["e1n-denombrer"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // plaques, barres et cubes
      const c = rand(1, 3), d = rand(0, 9), u = rand(0, 9), n = 100 * c + 10 * d + u;
      return { enonce: "Une plaque vaut $100$ cubes, une barre vaut $10$ cubes. Combien y a-t-il de cubes en tout ?", figure: paquets(c, d, u), mode: "nombre", prefixe: "Il y a", suffixe: "cubes", attendu: n,
        erreurs: [{ valeur: c + d + u, message: "Une plaque vaut $100$ et une barre vaut $10$ : on ne les compte pas comme un seul cube." }, ...(d === 0 ? [{ valeur: 10 * c + u, message: "Il n'y a pas de barre : le chiffre des dizaines est $0$." }] : [])],
        aides: ["Compte d'abord les plaques de cent.", `$${c}$ plaque${c > 1 ? "s" : ""} : $${100 * c}$. $${d}$ barre${d > 1 ? "s" : ""} : $${10 * d}$.`, `$${100 * c} + ${10 * d} + ${u}$.`],
        solution: `$${100 * c} + ${10 * d} + ${u} = ${n}$ cubes : $${c}$ centaine${c > 1 ? "s" : ""}, $${d}$ dizaine${d > 1 ? "s" : ""} et $${u}$ unité${u > 1 ? "s" : ""}.` };
    }
    // unités de numération dans le désordre, parfois plus de neuf d'une sorte
    const c = rand(1, 7), d = rand(0, 19), u = rand(0, 19), n = 100 * c + 10 * d + u;
    if (n > 999 || (d < 10 && u < 10 && t === 2)) return GEN["e1n-denombrer"]();
    const morceaux = [`$${c}$ centaine${c > 1 ? "s" : ""}`, `$${d}$ dizaine${d > 1 ? "s" : ""}`, `$${u}$ unité${u > 1 ? "s" : ""}`];
    const ordre = E.tirage([0, 1, 2], 3);
    return { enonce: `Quel nombre fait ${ordre.map((k) => morceaux[k]).join(", ").replace(/, ([^,]*)$/, " et $1")} ?`, mode: "nombre", prefixe: "C'est", attendu: n,
      erreurs: [{ valeur: c + d + u, message: "Une centaine vaut $100$ et une dizaine vaut $10$." }, ...(d >= 10 || u >= 10 ? [{ valeur: +(`${c}${d}${u}`), message: "On ne colle pas les nombres : plus de $9$ dizaines ou unités, il faut regrouper." }] : [{ valeur: 100 * u + 10 * d + c, message: "Attention à l'ordre : centaines, puis dizaines, puis unités." }])],
      aides: ["$1$ centaine $= 100$ ; $1$ dizaine $= 10$.", `$${c}$ centaine${c > 1 ? "s" : ""} $= ${100 * c}$ ; $${d}$ dizaine${d > 1 ? "s" : ""} $= ${10 * d}$.`, `$${100 * c} + ${10 * d} + ${u}$.`],
      solution: `$${100 * c} + ${10 * d} + ${u} = ${n}$.` };
  };

  GEN["e1n-chiffres"] = function () {
    const t = rand(0, 3);
    let n; do n = rand(101, 999); while (new Set(String(n)).size < 3);
    const c = Math.floor(n / 100), d = Math.floor(n / 10) % 10, u = n % 10;
    if (t === 0) { const k = rand(0, 2), nom = ["centaines", "dizaines", "unités"][k], v = [c, d, u][k];
      return { enonce: `Dans $${n}$, quel est le chiffre des **${nom}** ?`, mode: "nombre", prefixe: "C'est", attendu: v, erreurs: [c, d, u].filter((x) => x !== v).map((x) => ({ valeur: x, message: "Ce n'est pas le bon rang : de droite à gauche, unités, dizaines, centaines." })), aides: ["Le chiffre de droite est celui des unités.", "Celui du milieu, celui des dizaines.", "Celui de gauche, celui des centaines."], solution: `$${n}$ : $${c}$ centaine${c > 1 ? "s" : ""}, $${d}$ dizaine${d > 1 ? "s" : ""}, $${u}$ unité${u > 1 ? "s" : ""}. Le chiffre des ${nom} est $${v}$.` }; }
    if (t === 1) { // nombre de dizaines en tout
      return { enonce: `Combien y a-t-il de dizaines **en tout** dans $${n}$ ?`, mode: "nombre", prefixe: "Il y a", suffixe: "dizaines", attendu: Math.floor(n / 10),
        erreurs: [{ valeur: d, message: `$${d}$ est le chiffre des dizaines. Mais chaque centaine contient aussi $10$ dizaines.` }],
        aides: ["Une centaine, c'est $10$ dizaines.", `$${c}$ centaine${c > 1 ? "s" : ""}, c'est $${10 * c}$ dizaines.`, `$${10 * c} + ${d}$.`],
        solution: `$${n} = ${Math.floor(n / 10)}$ dizaines et $${u}$ unité${u > 1 ? "s" : ""}.` };
    }
    if (t === 2) { // décomposition (c × 100) + (d × 10) + u
      const trou = rand(0, 2), txt = [`(\\ldots ${X} 100) + (${d} ${X} 10) + ${u}`, `(${c} ${X} 100) + (\\ldots ${X} 10) + ${u}`, `(${c} ${X} 100) + (${d} ${X} 10) + \\ldots`][trou];
      return { enonce: `Complète : $${n} = ${txt}$`, mode: "nombre", prefixe: "Le nombre qui manque :", attendu: [c, d, u][trou],
        erreurs: [{ valeur: [100 * c, 10 * d, u * 10][trou], message: "On demande combien de fois on prend $100$ (ou $10$) : un seul chiffre." }],
        aides: [`$${n}$, c'est $${c}$ centaines, $${d}$ dizaines et $${u}$ unités.`, "$(c \\times 100)$ : le nombre de centaines.", "$(d \\times 10)$ : le nombre de dizaines."],
        solution: `$${n} = (${c} ${X} 100) + (${d} ${X} 10) + ${u}$.` };
    }
    // nombre d'unités → écriture additive
    const P = prenom();
    return { enonce: `${P.nom} a besoin de $${n}$ timbres. Ils sont vendus par plaques de $100$, par carnets de $10$ ou à l'unité. ${P.Il} prend $${c}$ plaque${c > 1 ? "s" : ""} et aucun timbre à l'unité en plus de $${u}$. Combien de carnets de $10$ doit-${P.il} prendre ?`, mode: "nombre", prefixe: P.Il + " prend", suffixe: "carnets", attendu: d,
      erreurs: [{ valeur: Math.floor(n / 10), message: `Les $${c}$ plaques donnent déjà $${100 * c}$ timbres.` }],
      aides: [`Les plaques : $${100 * c}$ timbres.`, `Il reste $${n} - ${100 * c} - ${u} = ${10 * d}$ timbres.`, `$${10 * d}$, c'est combien de carnets de $10$ ?`],
      solution: `$${n} = ${100 * c} + ${10 * d} + ${u}$ : $${c}$ plaque${c > 1 ? "s" : ""}, $${d}$ carnet${d > 1 ? "s" : ""} et $${u}$ timbre${u > 1 ? "s" : ""}.` };
  };

  GEN["e1n-lettres"] = function () {
    const t = rand(0, 2), n = pick([rand(101, 999), rand(101, 999), 100 * rand(2, 9), 100 * rand(1, 9) + rand(70, 99)]);
    if (t === 0) { // dictée
      const c = Math.floor(n / 100), r = n % 100;
      return { enonce: `On te dicte : « **${enLettres(n)}** ». Écris ce nombre en chiffres.`, mode: "nombre", prefixe: "En chiffres :", attendu: n,
        erreurs: [{ valeur: +(`${c}00${r}`), message: "On ne colle pas « cent » et la suite : la centaine prend une seule place." }, { valeur: +(`${c}${r}`) === n ? n + 1 : +(`${c}${r}`), message: "Vérifie le nombre de dizaines et d'unités." }].filter((e) => e.valeur !== n && r),
        aides: ["Écoute d'abord le nombre de centaines.", `« ${enLettres(100 * c)} », c'est $${100 * c}$.`, r ? `Puis « ${enLettres(r)} », c'est $${r}$.` : "Il n'y a ni dizaines ni unités."],
        solution: `« ${enLettres(n)} » $= ${100 * c} + ${r} = ${n}$.` };
    }
    // chiffres → lettres (choix)
    const fausses = [n + 1, n - 1, n + 10, n + 100, n - 100].filter((x) => x > 0 && x < 1000 && x !== n).map(enLettres);
    const c = melange(enLettres(n), fausses);
    return { enonce: `Comment s'écrit $${nb(n)}$ en lettres ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Commence par les centaines.", `$${Math.floor(n / 100) * 100}$ s'écrit « ${enLettres(Math.floor(n / 100) * 100)} ».`, "On met des traits d'union entre tous les mots."],
      solution: `$${nb(n)}$ s'écrit « ${enLettres(n)} ».` };
  };

  /* =====================================================================
     Chapitre 2 : comparer, ranger, encadrer ; rangs et suites (e1c-)
     ===================================================================== */
  const SIGNES = ["$<$", "$>$", "$=$"];
  FIGURES["e1c-cours-droite"] = () => droite({ a: 470, pas: 10, n: 10, lab: [0, 1], points: [{ i: 6, label: "?" }], aria: "Demi-droite graduée de 10 en 10 à partir de 470" });
  FIGURES["e1c-qcm-droite"] = () => droite({ a: 200, pas: 100, n: 8, lab: [0, 1], points: [{ i: 5, label: "A" }], origine: false, aria: "Droite graduée de 100 en 100 à partir de 200" });

  GEN["e1c-signes"] = function () {
    const t = rand(0, 2);
    let a, b;
    if (t === 0) { a = rand(100, 999); b = rand(100, 999); }
    else if (t === 1) { a = rand(100, 999); const s = String(a); b = +(s[0] + s[2] + s[1]); if (b < 100 || b === a) b = a + pick([1, 10, 100, -10]); }
    else { a = rand(100, 989); b = a + pick([-100, -10, -1, 0, 1, 10, 100]); }
    if (b > 999 || b < 100) return GEN["e1c-signes"]();
    const sg = a < b ? "<" : a > b ? ">" : "=", c = melange(`$${sg}$`, SIGNES);
    return { enonce: `Choisis le bon signe : $${nb(a)} \\;\\ldots\\; ${nb(b)}$`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Compare d'abord les centaines.", "Si elles sont égales, compare les dizaines, puis les unités.", "La pointe du signe montre le plus petit nombre."],
      solution: `$${nb(a)} ${sg} ${nb(b)}$.` };
  };
  GEN["e1c-ranger"] = function () {
    const base = 100 * rand(1, 8), L = new Set();
    while (L.size < 5) L.add(base + rand(0, 3) * pick([1, 10, 30]) + rand(0, 9));
    const A = [...L], tri = A.slice().sort((x, y) => x - y), dec = rand(0, 1), t = rand(0, 1);
    if (t === 0) { const v = dec ? tri[4] : tri[0]; return { enonce: `Quel est le plus **${dec ? "grand" : "petit"}** de ces nombres : $${A.map(nb).join(" \\;;\\; ")}$ ?`, mode: "nombre", prefixe: "C'est", attendu: v, erreurs: [{ valeur: dec ? tri[0] : tri[4], message: `Ça, c'est le plus ${dec ? "petit" : "grand"}.` }, { valeur: dec ? tri[3] : tri[1], message: "Compare bien les dizaines, puis les unités." }], aides: ["Compare d'abord les centaines.", "Puis les dizaines, puis les unités.", `Range-les : $${tri.map(nb).join(" < ")}$.`], solution: `$${tri.map(nb).join(" < ")}$ : le plus ${dec ? "grand" : "petit"} est $${nb(v)}$.` }; }
    const bon = (dec ? tri.slice().reverse() : tri).map((v) => `$${nb(v)}$`).join(" ; ");
    const f = [A.map((v) => `$${nb(v)}$`).join(" ; "), (dec ? tri : tri.slice().reverse()).map((v) => `$${nb(v)}$`).join(" ; "), (dec ? [tri[4], tri[2], tri[3], tri[1], tri[0]] : [tri[0], tri[2], tri[1], tri[3], tri[4]]).map((v) => `$${nb(v)}$`).join(" ; ")];
    const c = melange(bon, f.concat([[tri[1], tri[0], tri[2], tri[3], tri[4]].map((v) => `$${nb(v)}$`).join(" ; ")]));
    return { enonce: `Quels nombres sont rangés dans l'ordre **${dec ? "décroissant" : "croissant"}** ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [dec ? "Décroissant : du plus grand au plus petit." : "Croissant : du plus petit au plus grand.", "Compare centaines, dizaines, puis unités.", `Le premier nombre doit être $${nb(dec ? tri[4] : tri[0])}$.`],
      solution: bon };
  };
  GEN["e1c-encadrer"] = function () {
    const t = rand(0, 2);
    let n; do n = rand(101, 999); while (n % 10 === 0);
    if (t === 0) { const bas = rand(0, 1), d = Math.floor(n / 10); return { enonce: `Encadre entre deux dizaines qui se suivent : ${bas ? `$\\ldots < ${nb(n)} < ${nb(10 * d + 10)}$` : `$${nb(10 * d)} < ${nb(n)} < \\ldots$`}`, mode: "nombre", prefixe: "", attendu: bas ? 10 * d : 10 * d + 10, erreurs: [{ valeur: bas ? n - 1 : n + 1, message: "On demande une dizaine (un nombre terminé par $0$)." }, { valeur: bas ? 100 * Math.floor(n / 100) : 100 * Math.floor(n / 100) + 100, message: "Ça, c'est une centaine. On demande la dizaine la plus proche." }], aides: [`$${nb(n)}$ a $${d}$ dizaines en tout.`, `Les dizaines autour sont $${nb(10 * d)}$ et $${nb(10 * d + 10)}$.`, "Garde le chiffre des centaines et des dizaines, remplace les unités par $0$."], solution: `$${nb(10 * d)} < ${nb(n)} < ${nb(10 * d + 10)}$.` }; }
    if (t === 1) { const bas = rand(0, 1), c = Math.floor(n / 100); return { enonce: `Encadre entre deux centaines qui se suivent : ${bas ? `$\\ldots < ${nb(n)} < ${nb(100 * c + 100)}$` : `$${nb(100 * c)} < ${nb(n)} < \\ldots$`}`, mode: "nombre", prefixe: "", attendu: bas ? 100 * c : 100 * c + 100, erreurs: [{ valeur: bas ? 10 * Math.floor(n / 10) : 10 * Math.floor(n / 10) + 10, message: "Ça, c'est une dizaine. On demande une centaine (terminée par $00$)." }], aides: [`$${nb(n)}$ a $${c}$ centaine${c > 1 ? "s" : ""}.`, `Les centaines autour sont $${nb(100 * c)}$ et $${nb(100 * c + 100)}$.`, "Une centaine se termine par $00$."], solution: `$${nb(100 * c)} < ${nb(n)} < ${nb(100 * c + 100)}$.` }; }
    // droite graduée de 1, 10 ou 100
    const pas = pick([1, 10, 100]), a = pas === 100 ? 100 * rand(0, 2) : pas === 10 ? 10 * rand(10, 80) : rand(100, 980), i = rand(2, 8);
    if (a + 10 * pas > 1000) return GEN["e1c-encadrer"]();
    return { enonce: "Quel nombre est au point A ?", figure: droite({ a, pas, n: 10, lab: [0, 1], points: [{ i, label: "A" }], aria: `Droite graduée de ${pas} en ${pas}` }), mode: "nombre", prefixe: "A :", attendu: a + i * pas,
      erreurs: [{ valeur: a + i, message: `Un bond ne vaut pas $1$ ici : regarde les deux premiers nombres, chaque bond vaut $${pas}$.` }, { valeur: a + (i + 1) * pas, message: "Compte les bonds, pas les traits." }].filter((e) => e.valeur !== a + i * pas),
      aides: [`Regarde les deux nombres écrits : de $${nb(a)}$ à $${nb(a + pas)}$, il y a un bond.`, `Chaque bond vaut $${pas}$.`, `Compte $${i}$ bonds de $${pas}$ à partir de $${nb(a)}$.`],
      solution: `Chaque bond vaut $${pas}$. A est à $${i}$ bonds de $${nb(a)}$ : $${nb(a + i * pas)}$.` };
  };
  const ORD = (k) => (k === 1 ? "premier" : enLettres(k).replace(/(vingt|cent)s$/, "$1").replace(/cinq$/, "cinqu").replace(/neuf$/, "neuv").replace(/e$/, "") + "ième");
  GEN["e1c-rangs"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const k = rand(5, 99), tot = rand(k + 5, 180), quoi = pick(["coureurs du cross de l'école", "cyclistes du Tour de Mayotte", "nageurs de la course au lagon", "rameurs de la course de pirogues de Mamoudzou"]); return { enonce: `Une course réunit $${tot}$ ${quoi}. Combien sont arrivés **avant** le ${ORD(k)} ?`, mode: "nombre", prefixe: "Il y en a", attendu: k - 1, erreurs: [{ valeur: k, message: "On ne compte pas le " + ORD(k) + " lui-même." }, { valeur: tot - k, message: "Ça, ce sont ceux arrivés après." }], aides: ["Avant le $10$e, il y a le $1$er, le $2$e… jusqu'au $9$e.", "Il y en a un de moins que le rang.", `$${k} - 1$.`], solution: `Avant le ${ORD(k)} ($${k}$e), il y a $${k - 1}$ arrivants.` }; }
    if (t === 1) { // suite répétitive, rang éloigné
      const motif = E.tirage(["A", "B", "C", "D", "G", "F"], rand(2, 4)), p = motif.length, k = rand(15, 90), rep = motif[(k - 1) % p];
      const c = melange(rep, [...motif, "E", "H"]);
      return { enonce: `La suite de lettres « ${motif.join("")}${motif.join("")}${motif.join("")}… » se répète. Quelle est la ${ORD(k)} lettre ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: [`Le motif « ${motif.join("")} » a $${p}$ lettres.`, `Il recommence aux rangs $1$, $${p + 1}$, $${2 * p + 1}$… : les multiples de $${p}$ terminent un motif.`, `$${Math.floor((k - 1) / p) * p}$ lettres font $${Math.floor((k - 1) / p)}$ motifs complets ; il reste $${(k - 1) % p + 1}$ lettre${(k - 1) % p ? "s" : ""}.`],
        solution: `$${k} = ${Math.floor((k - 1) / p) * p} + ${(k - 1) % p + 1}$ : après $${Math.floor((k - 1) / p)}$ motifs complets, on prend la ${(k - 1) % p + 1 === 1 ? "première" : ORD((k - 1) % p + 1)} lettre du motif : ${rep}.` };
    }
    // suite évolutive : écarts qui augmentent de 1, ou doubles
    const typ = rand(0, 1);
    if (typ === 0) { const a = rand(1, 10), L = [a]; for (let i = 1; i < 12; i++) L.push(L[i - 1] + i); const k = rand(6, 10); return { enonce: `Dans la suite $${L.slice(0, 5).join(" \\;;\\; ")} \\ldots$, on ajoute $1$, puis $2$, puis $3$… Quel est le ${ORD(k)} nombre ?`, mode: "nombre", prefixe: "C'est", attendu: L[k - 1], erreurs: [{ valeur: L[k - 2], message: "Il manque un cran." }, { valeur: L[k], message: "Un cran de trop." }], aides: ["Écris la suite au brouillon.", `Après $${L[4]}$, on ajoute $5$, puis $6$…`, `$${L.slice(0, 7).join(", ")}$…`], solution: `$${L.slice(0, k).join(" \\;;\\; ")}$ : le ${ORD(k)} nombre est $${L[k - 1]}$.` }; }
    const a = pick([1, 2, 3, 5]), k = rand(5, 8), L = Array.from({ length: k + 1 }, (_, i) => a * 2 ** i);
    if (L[k - 1] > 1000) return GEN["e1c-rangs"]();
    return { enonce: `Dans la suite $${L.slice(0, 4).join(" \\;;\\; ")} \\ldots$, on double à chaque fois. Quel est le ${ORD(k)} nombre ?`, mode: "nombre", prefixe: "C'est", attendu: L[k - 1], erreurs: [{ valeur: L[k - 2], message: "Il manque un cran." }, { valeur: L[k], message: "Un cran de trop." }], aides: ["Doubler, c'est ajouter le nombre à lui-même.", `Après $${L[3]}$ vient $${L[4]}$.`, "Compte les rangs avec ton doigt."], solution: `$${L.slice(0, k).join(" \\;;\\; ")}$ : le ${ORD(k)} nombre est $${nb(L[k - 1])}$.` };
  };

  /* =====================================================================
     Chapitre 3 : pair ou impair (e1p-)
     ===================================================================== */
  GEN["e1p-trouver"] = function () {
    const pair = rand(0, 1), t = rand(0, 1);
    const tire = (p) => { let x; do x = rand(10, 999); while ((x % 2 === 0) !== p); return x; };
    if (t === 0) {
      const bon = tire(!!pair), f = [tire(!pair), tire(!pair), tire(!pair)], c = melange(`$${nb(bon)}$`, f.map((x) => `$${nb(x)}$`));
      return { enonce: `Lequel de ces nombres est **${pair ? "pair" : "impair"}** ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Regarde seulement le chiffre des unités.", "Un nombre est pair si son chiffre des unités est $0$, $2$, $4$, $6$ ou $8$.", "Sinon ($1$, $3$, $5$, $7$, $9$), il est impair."],
        solution: `$${nb(bon)}$ se termine par $${bon % 10}$ : il est ${pair ? "pair" : "impair"}.` };
    }
    const a = rand(10, 980), b = a + rand(6, 15), nbPairs = Array.from({ length: b - a - 1 }, (_, k) => a + 1 + k).filter((x) => x % 2 === (pair ? 0 : 1)).length;
    return { enonce: `Combien y a-t-il de nombres **${pair ? "pairs" : "impairs"}** strictement entre $${nb(a)}$ et $${nb(b)}$ ?`, mode: "nombre", prefixe: "Il y en a", attendu: nbPairs,
      erreurs: [{ valeur: b - a - 1, message: `On ne compte que les nombres ${pair ? "pairs" : "impairs"}.` }, { valeur: nbPairs + 1, message: "« Strictement entre » : on ne compte ni le premier ni le dernier." }],
      aides: ["Écris tous les nombres entre les deux (sans les deux bornes).", `Garde ceux qui se terminent par ${pair ? "$0$, $2$, $4$, $6$ ou $8$" : "$1$, $3$, $5$, $7$ ou $9$"}.`, "Compte-les."],
      solution: `Les nombres ${pair ? "pairs" : "impairs"} entre $${nb(a)}$ et $${nb(b)}$ : $${Array.from({ length: b - a - 1 }, (_, k) => a + 1 + k).filter((x) => x % 2 === (pair ? 0 : 1)).map(nb).join(" \\;;\\; ")}$. Il y en a $${nbPairs}$.` };
  };
  GEN["e1p-groupes"] = function () {
    const n = rand(5, 40), P = prenom(), ch = E.chose(), t = rand(0, 1);
    if (t === 0) return { enonce: `${P.nom} range ses $${n}$ ${ch.p} par paires (par deux). Combien en reste-t-il tout seul ?`, figure: n <= 30 ? collection(n, { groupes: 2 }) : undefined, mode: "nombre", prefixe: "Il en reste", attendu: n % 2,
      erreurs: [{ valeur: Math.floor(n / 2), message: "Ça, c'est le nombre de paires. On demande ce qui reste seul." }, { valeur: n % 2 ? 0 : 1, message: `$${n}$ est ${n % 2 ? "impair" : "pair"} : regarde son chiffre des unités.` }],
      aides: ["Un nombre pair se partage en paires sans reste.", "Un nombre impair laisse toujours $1$ objet seul.", `$${n}$ se termine par $${n % 10}$.`],
      solution: `$${n}$ est ${n % 2 ? "impair : il reste $1$" : "pair : il ne reste rien ($0$)"} ${n % 2 ? ch.s + " seul." : "."}`.replace(" .", ".") };
    const d = rand(1, 49), r = 2 * d;
    return { enonce: `Complète : le nombre pair qui vient juste après $${nb(r - 1)}$ est…`, mode: "nombre", prefixe: "C'est", attendu: r,
      erreurs: [{ valeur: r + 1, message: "Ce nombre est impair." }, { valeur: r - 2, message: "On cherche le nombre pair **après**." }],
      aides: [`$${nb(r - 1)}$ se termine par $${(r - 1) % 10}$ : il est impair.`, "Le nombre juste après un impair est pair.", `$${nb(r - 1)} + 1$.`],
      solution: `$${nb(r - 1)} + 1 = ${nb(r)}$, qui se termine par $${r % 10}$ : il est pair.` };
  };

  GEN["e1p-suite"] = function () {
    const pair = rand(0, 1), desc = rand(0, 2) === 0, a = 2 * rand(5, 480) + (pair ? 0 : 1), L = Array.from({ length: 5 }, (_, k) => a + (desc ? -2 : 2) * k).filter((x) => x > 0);
    if (L.length < 5 || L[4] > 999) return GEN["e1p-suite"]();
    const pos = rand(1, 4), rep = L[pos], aff = L.map((v, k) => (k === pos ? "\\ldots" : nb(v))).join(" \\;;\\; ");
    return { enonce: `Complète la suite des nombres **${pair ? "pairs" : "impairs"}** ${desc ? "en reculant" : ""} : $${aff}$`.replace("  :", " :"), mode: "nombre", prefixe: "Le nombre qui manque :", attendu: rep,
      erreurs: [{ valeur: rep + (desc ? -1 : 1), message: `Ce nombre est ${pair ? "impair" : "pair"} : on saute de $2$ en $2$.` }, { valeur: rep + (desc ? 1 : -1), message: `Ce nombre est ${pair ? "impair" : "pair"} : on saute de $2$ en $2$.` }],
      aides: [`Les nombres ${pair ? "pairs" : "impairs"} vont de $2$ en $2$.`, `Regarde le nombre juste avant le trou : $${nb(L[pos - 1])}$.`, `$${nb(L[pos - 1])} ${desc ? "-" : "+"} 2$.`],
      solution: `$${L.map(nb).join(" \\;;\\; ")}$ : le nombre qui manque est $${nb(rep)}$.` };
  };

  /* =====================================================================
     Chapitre 4 : les fractions (e1f-)
     ===================================================================== */
  const DEN = [2, 3, 4, 5, 6, 8, 10];
  FIGURES["e1f-cours-bande"] = () => bandesFr([{ n: 8, col: 3 }]);
  FIGURES["e1f-cours-comparer"] = () => bandesFr([{ n: 3, col: 1, lab: "1/3" }, { n: 5, col: 1, lab: "1/5" }]);
  FIGURES["e1f-cours-disque"] = () => disquesFr(4, [0]);
  FIGURES["e1f-qcm-bande"] = () => bandesFr([{ n: 5, col: 2 }]);
  FIGURES["e1f-qcm-disque"] = () => disquesFr(6, [0, 1, 2, 3, 4]);

  GEN["e1f-lire"] = function () {
    const b = pick(DEN), a = rand(1, b), t = rand(0, 2), cols = E.tirage(Array.from({ length: b }, (_, k) => k), a);
    const fig = t === 1 && b <= 10 ? disquesFr(b, cols) : bandesFr([{ n: b, col: rand(0, 1) ? a : cols }]);
    const c = melange(`$${fr(a, b)}$`, [`$${fr(b, a)}$`, `$${fr(a, b + 1)}$`, `$${fr(b - a || 1, b)}$`, `$${fr(a, 10 - b > 0 ? 10 : 8)}$`].filter((x) => x !== `$${fr(a, b)}$`));
    if (t === 2) {
      const m = melange(frLettres(a, b), [a !== b ? frLettres(b - a, b) : frLettres(1, b), `${enLettres(a)} ${NOMS_FR[pick(DEN.filter((x) => x !== b))][a > 1 ? 1 : 0]}`, ...(a > 1 && NOMS_FR[a] && a !== b ? [`${enLettres(b)} ${NOMS_FR[a][1]}`] : [`${enLettres(b)} part${b > 1 ? "s" : ""}`])]);
      return { enonce: "Comment se lit la fraction coloriée ?", figure: fig, mode: "choix", choix: m.choix, attendu: m.attendu,
      aides: ["Compte les parts égales : c'est le dénominateur.", "Compte les parts coloriées : c'est le numérateur.", `On lit d'abord le numérateur, puis « ${NOMS_FR[b][1]} ».`],
      solution: `$${fr(a, b)}$ se lit « ${frLettres(a, b)} ».` };
    }
    return { enonce: "Quelle fraction du tout est coloriée ?", figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Le tout est partagé en parts égales : compte-les (c'est le dénominateur, en bas).", "Compte les parts coloriées (c'est le numérateur, en haut).", `Il y a $${b}$ parts en tout.`],
      solution: `$${a}$ part${a > 1 ? "s" : ""} coloriée${a > 1 ? "s" : ""} sur $${b}$ parts égales : $${fr(a, b)}$${a === b ? ` $= 1$, tout est colorié` : ""}.` };
  };
  GEN["e1f-comparer"] = function () {
    const t = rand(0, 1);
    let A, B;
    if (t === 0) { const b = pick(DEN.filter((x) => x > 2)), a1 = rand(1, b), a2 = rand(1, b); A = [a1, b]; B = [a2, b]; }
    else { const [b1, b2] = E.tirage(DEN, 2); A = [1, b1]; B = [1, b2]; }
    const va = A[0] / A[1], vb = B[0] / B[1], sg = va < vb ? "<" : va > vb ? ">" : "=", c = melange(`$${sg}$`, SIGNES);
    return { enonce: `Choisis le bon signe : $${fr(...A)} \\;\\ldots\\; ${fr(...B)}$`, figure: bandesFr([{ n: A[1], col: A[0] }, { n: B[1], col: B[0] }]), mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [t === 0 ? "Même dénominateur : les parts ont la même taille." : "Numérateur $1$ : on compare la taille d'une seule part.", t === 0 ? "Celle qui a le plus de parts est la plus grande." : "Plus on partage en beaucoup de parts, plus chaque part est petite.", "Regarde les bandes coloriées."],
      solution: t === 0 ? `Mêmes parts ($${A[1]}$ parts), on compare $${A[0]}$ et $${B[0]}$ : $${fr(...A)} ${sg} ${fr(...B)}$.` : `Une part sur $${A[1]}$ et une part sur $${B[1]}$ : ${A[1] < B[1] ? "la première" : "la seconde"} est la plus grande, car on a moins partagé. $${fr(...A)} ${sg} ${fr(...B)}$.` };
  };
  GEN["e1f-calculer"] = function () {
    const b = pick(DEN.filter((x) => x > 2)), t = rand(0, 2);
    if (t === 2) { // complément à 1
      const a = rand(1, b - 1), P = prenom();
      return { enonce: `${P.nom} a colorié les $${fr(a, b)}$ d'une figure en bleu et le reste en jaune. Quelle fraction de la figure est en jaune ?${FRAC}`, figure: bandesFr([{ n: b, col: a }]), mode: "nombre", prefixe: "En jaune :", attendu: (b - a) / b,
        erreurs: [{ valeur: a / b, message: "Ça, c'est la partie en bleu." }, { valeur: 1 - a / (b + 1), message: "Le tout, c'est $" + fr(b, b) + " = 1$." }],
        aides: [`Le tout, c'est $${fr(b, b)}$.`, `Il manque $${b} - ${a}$ parts.`, `$${fr(b, b)} - ${fr(a, b)}$.`],
        solution: `$${fr(b, b)} - ${fr(a, b)} = ${fr(b - a, b)}$.` };
    }
    let a1, a2; do { a1 = rand(1, b - 1); a2 = rand(1, b - 1); } while (t === 0 ? a1 + a2 > b : a1 <= a2);
    const r = t === 0 ? a1 + a2 : a1 - a2;
    return { enonce: `Calcule : $${fr(a1, b)} ${t === 0 ? "+" : "-"} ${fr(a2, b)}$.${FRAC}`, mode: "nombre", prefixe: "Résultat :", attendu: r / b,
      erreurs: [{ valeur: r / (2 * b), message: "On n'additionne pas les dénominateurs : on compte des parts de même taille." }, { valeur: t === 0 ? Math.abs(a1 - a2) / b : (a1 + a2) / b, message: t === 0 ? "C'est une addition." : "C'est une soustraction." }].filter((e) => e.valeur !== r / b),
      aides: [`On compte des ${NOMS_FR[b][1]}.`, `$${a1}$ ${NOMS_FR[b][a1 > 1 ? 1 : 0]} ${t === 0 ? "plus" : "moins"} $${a2}$ ${NOMS_FR[b][a2 > 1 ? 1 : 0]}.`, "Le dénominateur ne change pas."],
      solution: `$${fr(a1, b)} ${t === 0 ? "+" : "-"} ${fr(a2, b)} = ${fr(r, b)}$${r === b ? " $= 1$" : ""}.` };
  };

  /* =====================================================================
     Chapitre 5 : addition et soustraction posées (e1a-)
     ===================================================================== */
  const posee = (L, op, res) => `$\\begin{array}{r} ${L.map((v, k) => (k ? `${op}\\;${v}` : `${v}`)).join(" \\\\ ")} \\\\ \\hline ${res} \\end{array}$\n\n`;
  GEN["e1a-addition"] = function () {
    const trois = rand(0, 3) === 0;
    let L; do L = trois ? [rand(100, 500), rand(10, 99), rand(1, 99)] : [rand(100, 700), rand(10, 299)]; while (L.reduce((s, v) => s + v, 0) > 999);
    const s = L.reduce((x, v) => x + v, 0), U = L.reduce((x, v) => x + (v % 10), 0), r1 = Math.floor(U / 10), D = L.reduce((x, v) => x + Math.floor(v / 10) % 10, 0) + r1, r2 = Math.floor(D / 10);
    return { enonce: `Pose et calcule : $${L.join(" + ")}$`, mode: "nombre", prefixe: "Résultat :", attendu: s,
      erreurs: [...(r1 ? [{ valeur: s - 10 * r1, message: "Tu as oublié la retenue des unités." }] : []), ...(r2 ? [{ valeur: s - 100 * r2, message: "Tu as oublié la retenue des dizaines." }] : []), { valeur: s + 100, message: "Vérifie les centaines." }],
      aides: ["Aligne les unités, les dizaines et les centaines.", `Unités : $${L.map((v) => v % 10).join(" + ")} = ${U}$${r1 ? ` : j'écris $${U % 10}$, je retiens $${r1}$` : ""}.`, `Dizaines : $${[...(r1 ? [r1] : []), ...L.map((v) => Math.floor(v / 10) % 10)].join(" + ")} = ${D}$${r2 ? ` : j'écris $${D % 10}$, je retiens $${r2}$` : ""}. Puis les centaines.`],
      solution: `${posee(L, "+", s)}Le résultat est $${s}$.` };
  };
  GEN["e1a-soustraction"] = function () {
    let a, b; do { a = rand(120, 999); b = rand(11, a - 10); } while (b < 10);
    const r = a - b, ret = (a % 10 < b % 10 ? 1 : 0) + (Math.floor(a / 10) % 10 - (a % 10 < b % 10 ? 1 : 0) < Math.floor(b / 10) % 10 ? 1 : 0);
    const inv = +String(r).split("").map((ch, k) => ch).join("");
    return { enonce: `Pose et calcule : $${a} - ${b}$`, mode: "nombre", prefixe: "Résultat :", attendu: r,
      erreurs: [{ valeur: a + b, message: "C'est une soustraction : on enlève." }, ...(a % 10 < b % 10 ? [{ valeur: r + 10, message: `Aux unités, $${a % 10}$ est plus petit que $${b % 10}$ : il faut casser une dizaine (ou utiliser la retenue).` }] : []), ...(ret ? [{ valeur: r - 10 * 0 + 100, message: "Attention à la retenue des centaines." }] : [])],
      aides: ["Aligne les chiffres : unités sous unités…", a % 10 < b % 10 ? `Aux unités, $${a % 10} - ${b % 10}$ n'est pas possible : on prend une dizaine, ce qui fait $${(a % 10) + 10} - ${b % 10}$.` : `Unités : $${a % 10} - ${b % 10} = ${(a % 10) - (b % 10)}$.`, `Vérifie avec une addition : résultat $+ ${b}$ doit donner $${a}$.`],
      solution: `${posee([a, b], "-", r)}Vérification : $${r} + ${b} = ${a}$.` };
  };
  GEN["e1a-sens"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const a = rand(100, 600), b = rand(50, 350), s = a + b, q = rand(0, 1); return { enonce: `On sait que $${a} + ${b} = ${s}$. Sans poser d'opération, calcule $${s} - ${q ? a : b}$.`, mode: "nombre", prefixe: "Résultat :", attendu: q ? b : a, erreurs: [{ valeur: q ? a : b, message: "Il reste l'autre nombre." }, { valeur: s + (q ? a : b), message: "On enlève : le résultat est plus petit." }], aides: [`$${s}$, c'est $${a}$ et $${b}$ réunis.`, "Si on enlève l'un, il reste l'autre.", "La soustraction est l'inverse de l'addition."], solution: `$${a} + ${b} = ${s}$, donc $${s} - ${q ? a : b} = ${q ? b : a}$.` }; }
    if (t === 1) { const a = rand(100, 800), c = a + rand(20, 199); return { enonce: `Complète : $${a} + \\ldots = ${c}$`, mode: "nombre", prefixe: "Le nombre qui manque :", attendu: c - a, erreurs: [{ valeur: a + c, message: "Le nombre qui manque est l'écart entre les deux." }, { valeur: c - a + 10, message: "Vérifie en ajoutant ta réponse à " + a + "." }], aides: ["Cherche ce qu'il faut ajouter.", `Calcule $${c} - ${a}$.`, "Vérifie par une addition."], solution: `$${c} - ${a} = ${c - a}$, donc $${a} + ${c - a} = ${c}$.` }; }
    const a = rand(200, 900), b = rand(20, 190), P = prenom(), ajout = rand(0, 1);
    return { enonce: `Au marché de ${pick(E.LIEUX)}, un marchand a $${a}$ ${pick(["mangues", "litchis", "noix de coco", "bananes"])}. ${ajout ? `Il en reçoit encore $${b}$` : `Il en vend $${b}$`}. Combien en a-t-il maintenant ?`, mode: "nombre", prefixe: "Il en a", attendu: ajout ? a + b : a - b, erreurs: [{ valeur: ajout ? a - b : a + b, message: ajout ? "Il en reçoit : on ajoute." : "Il en vend : on enlève." }, { valeur: (ajout ? a + b : a - b) + 10, message: "Vérifie la retenue." }], aides: [ajout ? "Il en a plus qu'avant : addition." : "Il en a moins qu'avant : soustraction.", `$${a} ${ajout ? "+" : "-"} ${b}$.`, "Pose l'opération si besoin."], solution: `$${a} ${ajout ? "+" : "-"} ${b} = ${ajout ? a + b : a - b}$.` };
  };

  /* =====================================================================
     Chapitre 6 : la multiplication (e1m-)
     ===================================================================== */
  // Rectangle d'objets : l lignes de c objets
  const rangees = (l, c) => { const r = 7, pas = 18, W = c * pas + 10, H = l * pas + 10; let s = ""; for (let i = 0; i < l; i++) for (let j = 0; j < c; j++) s += `<circle class="g-point" cx="${5 + pas / 2 + j * pas}" cy="${5 + pas / 2 + i * pas}" r="${r}"/>`; return E.svg("rangees", Math.max(320, W), H, `${l} rangées de ${c}`, `<g transform="translate(${Math.max(0, (320 - W) / 2)} 0)">${s}</g>`); };
  FIGURES["e1m-cours-rangees"] = () => rangees(4, 8);
  FIGURES["e1m-qcm-rangees"] = () => rangees(3, 6);
  GEN["e1m-sens"] = function () {
    const t = rand(0, 2), a = rand(2, 9), b = rand(2, 9);
    if (t === 0) { const v = pick([b, 10 * b, 20, 25, 5]); const c = melange(`$${a} ${X} ${v}$`, [`$${a} + ${v}$`, `$${a} ${X} ${a}$`, `$${v} - ${a}$`, `$${a + 1} ${X} ${v}$`]); const [o, g] = pick([["biscuits", "paquets"], ["élèves", "équipes"], ["œufs", "boîtes"], ["mangues", "sacs"]]); return { enonce: `Il y a $${a}$ ${g} de $${v}$ ${o}. Quelle écriture donne le nombre de ${o} ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: [`C'est $${a}$ fois $${v}$.`, "« fois » s'écrit avec le signe $\\times$.", `$${Array(a).fill(v).join(" + ")}$.`], solution: `$${a}$ fois $${v}$ s'écrit $${a} ${X} ${v} = ${a * v}$.` }; }
    if (t === 1) return { enonce: "Combien y a-t-il de ronds ? Écris d'abord une multiplication.", figure: rangees(a, b), mode: "nombre", prefixe: "Il y a", suffixe: "ronds", attendu: a * b, erreurs: [{ valeur: a + b, message: "On n'additionne pas les lignes et les colonnes : il y a " + a + " rangées de " + b + "." }, { valeur: a * b + b, message: "Recompte les rangées." }], aides: [`Compte les rangées : $${a}$.`, `Chaque rangée a $${b}$ ronds.`, `$${a} ${X} ${b}$.`], solution: `$${a}$ rangées de $${b}$ : $${a} ${X} ${b} = ${a * b}$ ronds. On peut aussi voir $${b}$ colonnes de $${a}$ : $${b} ${X} ${a} = ${a * b}$.` };
    return { enonce: `Complète : $${a} ${X} ${b} = ${b} ${X} \\ldots$`, mode: "nombre", prefixe: "Le nombre qui manque :", attendu: a, erreurs: [{ valeur: a * b, message: "On demande le facteur qui manque, pas le produit." }, { valeur: b, message: "Échange les deux nombres." }].filter((e) => e.valeur !== a), aides: ["Dans une multiplication, on peut échanger les nombres.", `$${a} ${X} ${b} = ${b} ${X} ${a}$.`, "C'est la commutativité."], solution: `$${a} ${X} ${b} = ${b} ${X} ${a} = ${a * b}$.` };
  };
  GEN["e1m-tables"] = function () {
    const a = rand(0, 10), b = rand(0, 10), c = a * b, pos = rand(0, 3);
    if ((pos === 1 && a === 0) || (pos === 2 && b === 0) || (pos === 3 && a === 0)) return GEN["e1m-tables"]();
    const [txt, rep] = [[`$${a} ${X} ${b} = \\ldots$`, c], [`$${a} ${X} \\ldots = ${c}$`, b], [`$\\ldots ${X} ${b} = ${c}$`, a], [`$${c} = ${a} ${X} \\ldots$`, b]][pos];
    return { enonce: `Complète : ${txt}`, mode: "nombre", prefixe: "Le nombre qui manque :", attendu: rep, erreurs: [{ valeur: pos ? c - (pos === 2 ? b : a) : a + b, message: pos ? "C'est une multiplication, pas une soustraction." : "C'est une multiplication, pas une addition." }, { valeur: rep + 1, message: "Presque : récite la table." }], aides: [`Récite la table de $${pos === 2 ? b : a}$.`, pos ? `Combien de fois $${pos === 2 ? b : a}$ pour faire $${c}$ ?` : `$${a} ${X} ${b}$, c'est $${b}$ ajouté $${a}$ fois.`, a === 10 || b === 10 ? "Multiplier par $10$ : un zéro à droite." : "Tu peux t'aider d'un résultat voisin."], solution: `$${a} ${X} ${b} = ${c}$.` };
  };

  GEN["e1m-astuces"] = function () {
    const f = pick([2, 4, 5, 10, 0, 1]), a = rand(1, 10), ech = rand(0, 1);
    const [p, q] = ech ? [f, a] : [a, f], r = a * f;
    const astuce = { 2: `$${X} 2$, c'est le double : $${a} + ${a} = ${r}$.`, 4: `$${X} 4$, c'est le double du double : $${a} ${X} 2 = ${2 * a}$, puis $${2 * a} ${X} 2 = ${r}$.`, 5: `$${X} 5$, c'est la moitié de $${X} 10$ : $${a} ${X} 10 = ${10 * a}$, la moitié est $${r}$.`, 10: `$${X} 10$ : on écrit un $0$ à droite : $${r}$.`, 0: "Zéro fois un nombre, ou un nombre fois zéro, c'est $0$.", 1: "Un fois un nombre, c'est ce nombre." }[f];
    return { enonce: `Calcule en utilisant une astuce : $${p} ${X} ${q}$`, mode: "nombre", prefixe: "Résultat :", attendu: r,
      erreurs: [{ valeur: a + f, message: "C'est une multiplication, pas une addition." }, { valeur: f === 0 ? a : r + a, message: f === 0 ? "Multiplier par $0$ donne toujours $0$." : "Tu as compté une fois de trop." }].filter((e) => e.valeur !== r),
      aides: ["On peut échanger les deux nombres.", `Utilise l'astuce de la table de $${f}$.`, astuce],
      solution: `$${p} ${X} ${q} = ${r}$. ${astuce}` };
  };

  /* =====================================================================
     Chapitre 7 : calcul mental (e1k-)
     ===================================================================== */
  GEN["e1k-faits"] = function () {
    const t = rand(0, 3);
    if (t === 0) { const a = rand(0, 10), b = rand(0, 10), pos = rand(0, 2); const [txt, rep] = [[`$${a} + ${b} = \\ldots$`, a + b], [`$${a} + \\ldots = ${a + b}$`, b], [`$${a + b} = \\ldots + ${b}$`, a]][pos]; return { enonce: `Complète : ${txt}`, mode: "nombre", prefixe: "", attendu: rep, erreurs: [{ valeur: rep + 1, message: "Presque." }, { valeur: rep - 1, message: "Presque." }].filter((e) => e.valeur >= 0), aides: ["Table d'addition.", "Passe par $10$ si besoin.", "Vérifie avec tes doigts."], solution: `${txt.replace("\\ldots", rep)}.` }; }
    if (t === 1) { const n = pick([...Array.from({ length: 15 }, (_, k) => k + 1), 20, 25, 30, 35, 40, 45, 50, 100, 150, 200, 250, 300, 500]); return { enonce: `Quel est le double de $${n}$ ?`, mode: "nombre", prefixe: "", attendu: 2 * n, erreurs: [{ valeur: n / 2, message: "Ça, c'est la moitié." }, { valeur: n + 2, message: "Le double, c'est $" + n + " + " + n + "$." }], aides: ["Double : le nombre ajouté à lui-même.", `$${n} + ${n}$.`, "Double les centaines, les dizaines, puis les unités."], solution: `$${n} + ${n} = ${2 * n}$.` }; }
    if (t === 2) { const n = pick([...Array.from({ length: 15 }, (_, k) => 2 * (k + 1)), 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 1000]); return { enonce: `Quelle est la moitié de $${nb(n)}$ ?`, mode: "nombre", prefixe: "", attendu: n / 2, erreurs: [{ valeur: 2 * n, message: "Ça, c'est le double." }, { valeur: n - 2, message: "La moitié, c'est partager en deux parts égales." }], aides: ["La moitié : deux parts égales.", `Quel nombre ajouté à lui-même donne $${nb(n)}$ ?`, n >= 100 ? "Pense à la moitié de $100$ : $50$." : "Pense aux doubles."], solution: `$${n / 2} + ${n / 2} = ${nb(n)}$ : la moitié est $${n / 2}$.` }; }
    const k = rand(1, 4); return { enonce: `Calcule : $${k} ${X} 25$`, mode: "nombre", prefixe: "", attendu: 25 * k, erreurs: [{ valeur: 25 + k, message: "C'est une multiplication." }, { valeur: 20 * k, message: "$25$, ce n'est pas $20$." }], aides: ["$25 + 25 = 50$.", "$50 + 25 = 75$.", "$4 \\times 25 = 100$."], solution: `$${k} ${X} 25 = ${25 * k}$.` };
  };
  GEN["e1k-numeration"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const a = rand(100, 899), k = rand(1, 9), q = rand(0, 1), dz = rand(0, 1), v = dz ? 10 * k : 100 * k; const r = q ? a + v : a - v; if (r < 0 || r > 999) return GEN["e1k-numeration"](); return { enonce: `Calcule : $${a} ${q ? "+" : "-"} ${v}$`, mode: "nombre", prefixe: "", attendu: r, erreurs: [{ valeur: q ? a + k : a - k, message: `$${v}$, c'est $${k}$ ${dz ? "dizaine" : "centaine"}${k > 1 ? "s" : ""}, pas $${k}$ unités.` }, { valeur: q ? a - v : a + v, message: q ? "On ajoute." : "On enlève." }], aides: [`$${v}$, c'est $${k}$ ${dz ? "dizaine" : "centaine"}${k > 1 ? "s" : ""}.`, `Change le chiffre des ${dz ? "dizaines" : "centaines"}.`, "Attention si les dizaines dépassent $9$."], solution: `$${a} ${q ? "+" : "-"} ${v} = ${r}$.` }; }
    if (t === 1) { const a = rand(1, 99); return { enonce: `Calcule : $${a} ${X} 10$`, mode: "nombre", prefixe: "", attendu: 10 * a, erreurs: [{ valeur: a + 10, message: "On multiplie par $10$, on n'ajoute pas $10$." }, { valeur: 100 * a, message: "Un seul zéro quand on multiplie par $10$." }], aides: ["Multiplier par $10$ : chaque unité devient une dizaine.", "On écrit un $0$ à droite du nombre.", `$${a}$ dizaines.`], solution: `$${a} ${X} 10 = ${10 * a}$ ($${a}$ dizaines).` }; }
    const a = rand(30, 950), op = pick(["+9", "+19", "+29", "-9"]), v = +op.slice(1), plus = op[0] === "+", r = plus ? a + v : a - v;
    if (r > 999) return GEN["e1k-numeration"]();
    return { enonce: `Calcule : $${a} ${plus ? "+" : "-"} ${v}$`, mode: "nombre", prefixe: "", attendu: r, erreurs: [{ valeur: plus ? a + v + 1 : a - v - 1 + 2, message: plus ? `On ajoute $${v + 1}$ puis on enlève $1$ (pas l'inverse).` : "On enlève $10$ puis on ajoute $1$." }, { valeur: plus ? a + v + 1 : a - 10, message: plus ? "Tu as oublié d'enlever $1$." : "Tu as oublié d'ajouter $1$." }].filter((e) => e.valeur !== r), aides: [plus ? `Ajouter $${v}$, c'est ajouter $${v + 1}$ puis enlever $1$.` : "Enlever $9$, c'est enlever $10$ puis ajouter $1$.", plus ? `$${a} + ${v + 1} = ${a + v + 1}$.` : `$${a} - 10 = ${a - 10}$.`, plus ? `$${a + v + 1} - 1$.` : `$${a - 10} + 1$.`], solution: plus ? `$${a} + ${v + 1} = ${a + v + 1}$, puis $${a + v + 1} - 1 = ${r}$.` : `$${a} - 10 = ${a - 10}$, puis $${a - 10} + 1 = ${r}$.` };
  };
  GEN["e1k-procedures"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const a = rand(11, 19), b = rand(2, 9); return { enonce: `Calcule de tête : $${a} ${X} ${b}$`, mode: "nombre", prefixe: "", attendu: a * b, erreurs: [{ valeur: 10 * b + (a - 10), message: `$${a} ${X} ${b}$, c'est $10 ${X} ${b}$ **plus** $${a - 10} ${X} ${b}$.` }, { valeur: a * b + b, message: "Recompte." }], aides: [`$${a} = 10 + ${a - 10}$.`, `$10 ${X} ${b} = ${10 * b}$ et $${a - 10} ${X} ${b} = ${(a - 10) * b}$.`, `$${10 * b} + ${(a - 10) * b}$.`], solution: `$${a} ${X} ${b} = 10 ${X} ${b} + ${a - 10} ${X} ${b} = ${10 * b} + ${(a - 10) * b} = ${a * b}$.` }; }
    if (t === 1) { const c = rand(0, 4) * 2, d = rand(0, 4) * 2, u = rand(1, 4) * 2, n = 100 * c + 10 * d + u; if (n < 20) return GEN["e1k-procedures"](); return { enonce: `Quelle est la moitié de $${n}$ ?`, mode: "nombre", prefixe: "", attendu: n / 2, erreurs: [{ valeur: 2 * n, message: "Ça, c'est le double." }, { valeur: n / 2 + 10, message: "Reprends la moitié des dizaines." }], aides: [`Décompose : $${n} = ${[100 * c, 10 * d, u].filter(Boolean).join(" + ")}$.`, "Prends la moitié de chaque morceau.", "Ajoute les moitiés."], solution: `$${n} = ${[100 * c, 10 * d, u].filter(Boolean).join(" + ")}$, moitiés : $${[50 * c, 5 * d, u / 2].filter(Boolean).join(" + ")} = ${n / 2}$.` }; }
    const a = rand(102, 990), b = rand(2, 8); if (a % 10 >= b) return { enonce: `Calcule : $${a} - ${b}$`, mode: "nombre", prefixe: "", attendu: a - b, erreurs: [{ valeur: a + b, message: "On enlève." }, { valeur: a - b - 10, message: "Pas besoin de changer de dizaine ici." }], aides: ["Regarde le chiffre des unités.", `$${a % 10} - ${b} = ${a % 10 - b}$.`, "Seules les unités changent."], solution: `$${a} - ${b} = ${a - b}$.` };
    const dz = a - (a % 10); return { enonce: `Calcule : $${a} - ${b}$`, mode: "nombre", prefixe: "", attendu: a - b, erreurs: [{ valeur: a - b + 10, message: "On passe sous la dizaine : le chiffre des dizaines diminue de $1$." }, { valeur: a + b, message: "On enlève." }], aides: [`Enlève d'abord $${a % 10}$ pour arriver à $${dz}$.`, `Il reste à enlever $${b - (a % 10)}$.`, `$${dz} - ${b - (a % 10)}$.`], solution: `$${a} - ${a % 10} = ${dz}$, puis $${dz} - ${b - (a % 10)} = ${a - b}$.` };
  };

  /* =====================================================================
     Chapitre 8 : résoudre des problèmes (e1r-)
     ===================================================================== */
  GEN["e1r-parties"] = function () {
    const t = rand(0, 2), P = prenom();
    if (t === 0) { const tot = rand(150, 900), a = rand(50, tot - 40); return { enonce: `Dans ses deux coffres, ${P.nom} a $${tot}$ billes. Il y en a $${a}$ dans le coffre vert. Combien y en a-t-il dans le coffre rouge ?`, figure: schema([[String(a), a], ["?", tot - a, 1]], null, { total: String(tot) }), mode: "nombre", prefixe: "", suffixe: "billes", attendu: tot - a, erreurs: [{ valeur: tot + a, message: "On connaît le tout : on cherche une partie, c'est une soustraction." }, { valeur: tot - a + 10, message: "Vérifie ta soustraction." }], aides: ["Le tout : les deux coffres ensemble.", `Une partie : $${a}$.`, `$${tot} - ${a}$.`], solution: `$${tot} - ${a} = ${tot - a}$ billes dans le coffre rouge.` }; }
    if (t === 1) { const reste = rand(20, 400), dist = rand(20, 300); return { enonce: `Dans sa boîte, ${P.nom} avait des images. ${P.Il} en a distribué $${dist}$. Il lui en reste $${reste}$. Combien en avait-${P.il} au début ?`, mode: "nombre", prefixe: "", suffixe: "images", attendu: reste + dist, erreurs: [{ valeur: Math.abs(reste - dist), message: "Au début, il y en avait plus : distribuées + restantes." }, { valeur: reste + dist + 10, message: "Vérifie ton addition." }], aides: ["Au début = distribuées + restantes.", `$${dist} + ${reste}$.`, "Pose l'addition si besoin."], solution: `$${dist} + ${reste} = ${reste + dist}$ images.` }; }
    const a = rand(100, 400), b = rand(100, 400), c = rand(50, 150); if (a + b + c > 999) return GEN["e1r-parties"]();
    return { enonce: `Une école de ${pick(E.LIEUX)} a $${a}$ élèves en maternelle, $${b}$ en CP-CE1 et $${c}$ en CE2. Combien d'élèves en tout ?`, mode: "nombre", prefixe: "", suffixe: "élèves", attendu: a + b + c, erreurs: [{ valeur: a + b, message: "N'oublie pas les CE2." }, { valeur: a + b + c - 100, message: "Vérifie la retenue des centaines." }], aides: ["On réunit trois parties.", `$${a} + ${b} = ${a + b}$.`, `$${a + b} + ${c}$.`], solution: `$${a} + ${b} + ${c} = ${a + b + c}$ élèves.` };
  };
  GEN["e1r-comparaison"] = function () {
    const t = rand(0, 2), [P1, P2] = E.deux(), a = rand(50, 500), e = rand(12, 300);
    if (t === 0) return { enonce: `${P1.nom} a $${a}$ billes. ${P2.nom} en a $${e}$ **de plus** que ${P1.nom}. Combien ${P2.nom} a-t-${P2.il} de billes ?`, figure: schema([[String(a), a]], [[String(a), a], [String(e), e]], { etiquettes: [P1.nom, P2.nom] }), mode: "nombre", prefixe: "", suffixe: "billes", attendu: a + e, erreurs: [{ valeur: a - e, message: "« de plus » : " + P2.nom + " en a plus, on ajoute." }, { valeur: e, message: "Ça, c'est l'écart." }].filter((x) => x.valeur > 0), aides: [`${P2.nom} a autant que ${P1.nom}, et encore $${e}$.`, "C'est une addition.", `$${a} + ${e}$.`], solution: `$${a} + ${e} = ${a + e}$ billes.` };
    if (t === 1) { const b = a + e; return { enonce: `${P1.nom} a $${b}$ €. ${P2.nom} a $${e}$ € **de moins** que ${P1.nom}. Combien ${P2.nom} a-t-${P2.il} ?`, mode: "nombre", prefixe: "", suffixe: "€", attendu: a, erreurs: [{ valeur: b + e, message: "« de moins » : on enlève l'écart." }, { valeur: e, message: "Ça, c'est l'écart." }], aides: [`${P2.nom} a moins que ${P1.nom}.`, "C'est une soustraction.", `$${b} - ${e}$.`], solution: `$${b} - ${e} = ${a}$ €.` }; }
    const b = a + e; return { enonce: `${P1.nom} a lu $${b}$ pages et ${P2.nom} $${a}$ pages. Combien de pages ${P1.nom} a-t-${P1.il} lues de plus que ${P2.nom} ?`, mode: "nombre", prefixe: "", suffixe: "pages de plus", attendu: e, erreurs: [{ valeur: a + b, message: "On cherche l'écart : soustraction." }, { valeur: e + 10, message: "Vérifie ta soustraction." }], aides: ["On cherche l'écart entre les deux nombres.", `$${a} + \\ldots = ${b}$.`, `$${b} - ${a}$.`], solution: `$${b} - ${a} = ${e}$ pages de plus.` };
  };
  GEN["e1r-multiplicatif"] = function () {
    const t = rand(0, 2), k = rand(2, 10), v = pick([rand(2, 10), 5, 10, 20, 25]), N = k * v;
    if (t === 0) { const [o, g] = pick([["biscuits", "paquets"], ["timbres", "carnets"], ["crayons", "boîtes"], ["passagers", "rangées de la barge"]]); return { enonce: `Il y a $${k}$ ${g} de $${v}$ ${o}. Combien de ${o} en tout ?`, mode: "nombre", prefixe: "", suffixe: o, attendu: N, erreurs: [{ valeur: k + v, message: "C'est " + k + " **fois** " + v + "." }, { valeur: N + v, message: "Recompte les groupes." }], aides: [`$${k}$ fois $${v}$.`, `$${k} ${X} ${v}$.`, "Utilise tes tables."], solution: `$${k} ${X} ${v} = ${N}$ ${o}.` }; }
    if (t === 1) return { enonce: `Il y a $${N}$ élèves de CE1 dans l'école. On fait des équipes de $${v}$ élèves. Combien d'équipes ?`, mode: "nombre", prefixe: "", suffixe: "équipes", attendu: k, erreurs: [{ valeur: N - v, message: "On fait plusieurs équipes : combien de fois " + v + " dans " + N + " ?" }, { valeur: v, message: "Ça, c'est le nombre d'élèves par équipe." }].filter((e) => e.valeur !== k), aides: [`Combien de fois $${v}$ dans $${N}$ ?`, `$\\ldots ${X} ${v} = ${N}$.`, "Compte de " + v + " en " + v + "."], solution: `$${k} ${X} ${v} = ${N}$ : $${k}$ équipes.` };
    return { enonce: `On partage équitablement $${N}$ bonbons entre $${k}$ enfants. Combien chacun en reçoit-il ?`, mode: "nombre", prefixe: "", suffixe: "bonbons", attendu: v, erreurs: [{ valeur: N - k, message: "On distribue un par un à chacun : combien chacun reçoit-il ?" }, { valeur: k, message: "Ça, c'est le nombre d'enfants." }].filter((e) => e.valeur !== v), aides: ["Distribue un bonbon à chacun, encore et encore.", `$${k} ${X} \\ldots = ${N}$.`, "Utilise la table de " + k + "."], solution: `$${k} ${X} ${v} = ${N}$ : chacun reçoit $${v}$ bonbons.` };
  };
  GEN["e1r-etapes"] = function () {
    const t = rand(0, 1);
    if (t === 0) { const l = rand(3, 9), p = rand(2, 5), billet = pick([20, 50]); if (l * p >= billet) return GEN["e1r-etapes"](); const P = prenom(); return { enonce: `${P.nom} achète $${l}$ litres d'huile à $${p}$ € le litre. ${P.Il} donne $${billet}$ € au vendeur. Combien le vendeur lui rend-il ?`, mode: "nombre", prefixe: "", suffixe: "€", attendu: billet - l * p, erreurs: [{ valeur: l * p, message: "Ça, c'est le prix à payer. On cherche la monnaie rendue." }, { valeur: billet - l - p, message: "Le prix : " + l + " **fois** " + p + " €." }], aides: [`Prix : $${l} ${X} ${p}$.`, `$${l} ${X} ${p} = ${l * p}$ €.`, `$${billet} - ${l * p}$.`], solution: `Prix : $${l} ${X} ${p} = ${l * p}$ €. Monnaie : $${billet} - ${l * p} = ${billet - l * p}$ €.` }; }
    const a = rand(2, 6), b = rand(3, 8), c = rand(2, 6), d = rand(3, 8); return { enonce: `Dans un restaurant de Mamoudzou, il y a $${a}$ tables de $${b}$ personnes et $${c}$ tables de $${d}$ personnes. Combien de clients peut-il recevoir ?`, mode: "nombre", prefixe: "", suffixe: "clients", attendu: a * b + c * d, erreurs: [{ valeur: a * b, message: "N'oublie pas les autres tables." }, { valeur: a + b + c + d, message: "Il faut multiplier : " + a + " tables **de** " + b + "." }], aides: [`$${a} ${X} ${b} = ${a * b}$.`, `$${c} ${X} ${d} = ${c * d}$.`, "Ajoute les deux."], solution: `$${a} ${X} ${b} + ${c} ${X} ${d} = ${a * b} + ${c * d} = ${a * b + c * d}$ clients.` };
  };

  /* =====================================================================
     Chapitre 9 : longueurs et masses (e1l-)
     ===================================================================== */
  const { regle, monnaie, horloges, solide, solides, formes, quadrillage, fleches, barres, svg, r1 } = E;
  FIGURES["e1l-cours-regle"] = () => regle(12, 0, 84, { nom: "entre 8 et 9 cm" });
  FIGURES["e1l-qcm-regle"] = () => regle(12, 0, 56);
  GEN["e1l-mesurer"] = function () {
    const t = rand(0, 1), a = 0;
    if (t === 0) { const l = rand(3, 11); return { enonce: "Combien mesure le segment ?", figure: regle(12, 0, 10 * l), mode: "nombre", prefixe: "", suffixe: "cm", attendu: l, erreurs: [{ valeur: l + 1, message: "Compte les centimètres (les espaces), pas les traits." }, { valeur: 10 * l, message: "La règle est graduée en centimètres : lis le nombre écrit." }], aides: ["Le segment commence au $0$.", "Lis le nombre au bout du segment.", "L'unité est le centimètre."], solution: `Le segment mesure $${l}$ cm.` }; }
    const mm = rand(21, 115); if (mm % 10 === 0) return GEN["e1l-mesurer"]();
    const b = Math.floor(mm / 10), c = melange(`entre $${b}$ cm et $${b + 1}$ cm`, [`entre $${b - 1}$ cm et $${b}$ cm`, `entre $${b + 1}$ cm et $${b + 2}$ cm`, `entre $${10 * b}$ cm et $${10 * b + 10}$ cm`].filter((x) => !x.includes("$0$ cm et $0$")));
    return { enonce: "Le bout du segment tombe entre deux graduations. Encadre sa longueur par deux nombres entiers de centimètres.", figure: regle(12, 0, mm), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Regarde les deux nombres écrits de chaque côté du bout du segment.", `Le bout est après $${b}$.`, `Il est avant $${b + 1}$.`], solution: `Le segment mesure entre $${b}$ cm et $${b + 1}$ cm.` };
  };
  GEN["e1l-unites"] = function () {
    const t = rand(0, 4);
    if (t === 0) { const [o, u, f] = pick([["la longueur d'un stylo", "cm", ["km", "m", "kg"]], ["la distance de Mamoudzou à Sada", "km", ["cm", "m", "g"]], ["la hauteur d'un cocotier", "m", ["cm", "km", "kg"]], ["la masse d'un sac de riz", "kg", ["g", "cm", "m"]], ["la masse d'une gomme", "g", ["kg", "cm", "km"]], ["la largeur d'un cahier", "cm", ["km", "kg", "m"]], ["la longueur d'un banga", "m", ["km", "g", "cm"]], ["la masse d'un zébu", "kg", ["g", "km", "m"]], ["la longueur du tour de l'île en voiture", "km", ["m", "cm", "kg"]], ["la masse d'un sachet de levure", "g", ["kg", "m", "km"]]]); const c = melange(u, f); return { enonce: `Quelle unité choisir pour mesurer ${o} ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["cm, m, km mesurent des longueurs ; g, kg des masses.", "Petite longueur : cm ; grande : m ; très grande : km.", "Masse légère : g ; lourde : kg."], solution: `Pour ${o}, on utilise le ${{ cm: "centimètre", m: "mètre", km: "kilomètre", g: "gramme", kg: "kilogramme" }[u]} (${u}).` }; }
    if (t === 1) { const k = rand(1, 9), [u1, u2, f] = pick([["m", "cm", 100], ["km", "m", 1000], ["kg", "g", 1000]]); return { enonce: `Complète : $${k}$ ${u1} $=$ … ${u2}`, mode: "nombre", prefixe: "", suffixe: u2, attendu: k * f, erreurs: [{ valeur: k * f / 10, message: `$1$ ${u1} $= ${nb(f)}$ ${u2}.` }, { valeur: k, message: "Le nombre change quand on change d'unité." }], aides: [`$1$ ${u1} $= ${nb(f)}$ ${u2}.`, `$${k}$ ${u1}, c'est $${k}$ fois $${nb(f)}$ ${u2}.`, `$${k} ${X} ${nb(f)}$.`], solution: `$${k}$ ${u1} $= ${nb(k * f)}$ ${u2}.` }; }
    if (t === 2) { const c = rand(1, 99); return { enonce: `Complète : $1$ m $+ ${c}$ cm $=$ … cm`, mode: "nombre", prefixe: "", suffixe: "cm", attendu: 100 + c, erreurs: [{ valeur: 1 + c, message: "$1$ m, c'est $100$ cm." }, { valeur: 10 + c, message: "$1$ m $= 100$ cm, pas $10$." }], aides: ["$1$ m $= 100$ cm.", `$100 + ${c}$.`, "Écris le résultat en cm."], solution: `$1$ m $+ ${c}$ cm $= 100 + ${c} = ${100 + c}$ cm.` }; }
    if (t === 3) { const a = rand(100, 900), b = rand(50, 1000 - a); return { enonce: `Un paquet pèse $${a}$ g et un autre $${b}$ g. Combien pèsent-ils ensemble ?`, mode: "nombre", prefixe: "", suffixe: "g", attendu: a + b, erreurs: [{ valeur: Math.abs(a - b), message: "Ensemble : on ajoute." }, { valeur: a + b + 100, message: "Vérifie la retenue." }], aides: ["On ajoute les deux masses.", `$${a} + ${b}$.`, "Pose l'addition si besoin."], solution: `$${a} + ${b} = ${a + b}$ g${a + b === 1000 ? ", c'est $1$ kg" : ""}.` }; }
    const L = E.tirage([[1000, "1 kg"], [800, "800 g"], [1200, "1 200 g"], [2000, "2 kg"], [500, "500 g"], [950, "950 g"], [3000, "3 kg"], [100, "100 g"]], 4), grand = rand(0, 1);
    const v = grand ? Math.max(...L.map((x) => x[0])) : Math.min(...L.map((x) => x[0])), rep = L.find((x) => x[0] === v)[1], c = melange(rep, L.map((x) => x[1]));
    return { enonce: `Quelle masse est la plus **${grand ? "lourde" : "légère"}** : ${L.map((x) => x[1]).join(" ; ")} ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Écris toutes les masses en grammes.", "$1$ kg $= 1\\,000$ g.", "Compare ensuite les nombres."], solution: `En grammes : ${L.map((x) => `${x[1]} = $${nb(x[0])}$ g`).join(" ; ")}. La plus ${grand ? "lourde" : "légère"} est ${rep}.` };
  };

  GEN["e1l-estimer"] = function () {
    const [o, v, u] = pick([["une trousse", 20, "cm"], ["un crayon", 15, "cm"], ["la porte de la classe", 2, "m"], ["un cahier", 30, "cm"], ["un banga", 3, "m"], ["une pirogue", 6, "m"], ["le trajet de Mamoudzou à Sada", 25, "km"], ["le tour de Petite-Terre en voiture", 15, "km"], ["un paquet de sucre", 1, "kg"], ["une gomme", 20, "g"], ["un sachet de levure", 10, "g"], ["un sac de riz", 5, "kg"], ["une mangue", 300, "g"], ["un enfant de CE1", 25, "kg"], ["une pastèque", 4, "kg"], ["un stylo", 10, "g"], ["une feuille de papier", 5, "g"], ["un vélo", 12, "kg"], ["un terrain de foot", 100, "m"]]);
    const autres = { cm: ["m", "km"], m: ["cm", "km"], km: ["m", "cm"], g: ["kg"], kg: ["g"] }[u];
    const fausses = [...autres.map((x) => `$${nb(v)}$ ${x}`), `$${nb(v * 100)}$ ${u}`, `$${nb(v * 10)}$ ${u}`];
    const c = melange(`$${nb(v)}$ ${u}`, fausses);
    const P = prenom();
    return { enonce: pick([`Quelle est la mesure la plus vraisemblable pour ${o} ?`, `${P.nom} se demande combien mesure (ou pèse) ${o}. Quelle réponse est la plus vraisemblable ?`, `Choisis la bonne mesure pour ${o}.`]), mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Pense à des objets que tu connais : une trousse fait environ $20$ cm, une porte $2$ m, un paquet de sucre $1$ kg.", "Vérifie l'unité : cm, m et km pour les longueurs ; g et kg pour les masses.", "Élimine les mesures beaucoup trop grandes ou trop petites."],
      solution: `${Maj(o)} : environ $${nb(v)}$ ${u}.` };
  };

  /* =====================================================================
     Chapitre 10 : la monnaie, euros et centimes (e1e-)
     ===================================================================== */
  const euros = (c) => (c % 100 ? `${nb(c / 100).replace(/\{,\}(\d)$/, "{,}$10")} €` : `${c / 100} €`);
  const eurosTex = (c) => `$${nb(c / 100)}${c % 100 && (c % 10 === 0) ? "0" : ""}$ €`;
  FIGURES["e1e-cours-monnaie"] = () => monnaie([200, 100, 50, 20, 5]);
  FIGURES["e1e-qcm-monnaie"] = () => monnaie([500, 200, 50, 10, 10]);
  GEN["e1e-valeur"] = function () {
    const L = []; let n = rand(3, 6);
    while (n--) L.push(pick([1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]));
    const tot = L.reduce((s, v) => s + v, 0), e = Math.floor(tot / 100), c = tot % 100;
    return { enonce: `Combien d'argent y a-t-il ? Écris ta réponse en euros avec une virgule (par exemple $3{,}45$).`, figure: monnaie(L), mode: "nombre", prefixe: "Il y a", suffixe: "€", attendu: tot / 100,
      erreurs: [{ valeur: tot, message: "Ça, c'est le total en centimes. En euros, mets une virgule : $100$ centimes $= 1$ €." }, { valeur: L.length, message: "On additionne les valeurs, pas le nombre de pièces." }, ...(c && c < 10 ? [{ valeur: e + c / 10, message: `$${c}$ centime${c > 1 ? "s" : ""} s'écrivent $0{,}0${c}$ € : il faut un $0$ après la virgule.` }] : [])],
      aides: ["Additionne d'abord les euros (billets et pièces de $1$ € et $2$ €).", "Additionne ensuite les centimes.", "$100$ centimes $= 1$ €. On écrit les euros, une virgule, puis les centimes sur deux chiffres."],
      solution: `En tout : $${e}$ € et $${c}$ centime${c > 1 ? "s" : ""}, c'est ${eurosTex(tot)}.` };
  };
  GEN["e1e-ecritures"] = function () {
    const t = rand(0, 2), e = rand(0, 9), c = pick([rand(1, 9), rand(10, 99), 10 * rand(1, 9)]);
    if (t === 0) { const bon = `$${e}{,}${String(c).padStart(2, "0")}$ €`, fausses = [`$${e}{,}${c}$ €`, `$${e}{,}${String(c).padStart(2, "0")}0$ €`, `$${e}${String(c).padStart(2, "0")}$ €`, `$${c}{,}${e}$ €`]; const cc = melange(bon, fausses.filter((x) => x !== bon && !/^\$0\d/.test(x.slice(1)))); return { enonce: `$${e}$ € et $${c}$ centime${c > 1 ? "s" : ""} s'écrit :`, mode: "choix", choix: cc.choix, attendu: cc.attendu, aides: ["Avant la virgule : les euros.", "Après la virgule : les centimes, toujours avec deux chiffres.", c < 10 ? `$${c}$ centimes s'écrivent « 0${c} ».` : `$${c}$ centimes s'écrivent « ${c} ».`], solution: `$${e}$ € et $${c}$ centimes s'écrit ${bon}.` }; }
    if (t === 1) { const tot = 100 * e + c; return { enonce: `$${tot}$ centimes, c'est combien d'euros ? (écris avec une virgule)`, mode: "nombre", prefixe: "", suffixe: "€", attendu: tot / 100, erreurs: [{ valeur: tot, message: "$100$ centimes $= 1$ € : il faut convertir." }, { valeur: tot / 10, message: "$100$ centimes font $1$ €, pas $10$ centimes." }], aides: ["$100$ centimes $= 1$ €.", `$${tot} = ${100 * e} + ${c}$ centimes.`, `$${e}$ € et $${c}$ centimes.`], solution: `$${tot}$ centimes $= ${e}$ € et $${c}$ centimes $=$ ${eurosTex(tot)}.` }; }
    const k = rand(1, 9), p = pick([10, 20, 50]);
    return { enonce: `Combien de pièces de $${p}$ centimes faut-il pour faire $${k}$ € ?`, mode: "nombre", prefixe: "Il faut", suffixe: "pièces", attendu: (k * 100) / p,
      erreurs: [{ valeur: k * p, message: "$1$ € $= 100$ centimes." }, { valeur: 100 / p, message: `Ça, c'est pour $1$ €. Il faut $${k}$ €.` }].filter((x) => x.valeur !== (k * 100) / p),
      aides: ["$1$ € $= 100$ centimes.", `Pour $1$ €, il faut $${100 / p}$ pièces de $${p}$ centimes.`, `Pour $${k}$ €, c'est $${k}$ fois plus.`],
      solution: `$1$ € $=$ $${100 / p}$ pièces de $${p}$ centimes, donc $${k}$ € $= ${(k * 100) / p}$ pièces.` };
  };
  GEN["e1e-rendre"] = function () {
    const billet = pick([5, 10, 10, 20]), prix = rand(1, 100 * billet - 10) , cPrix = Math.round(prix / 10) * 10;
    if (cPrix >= 100 * billet || cPrix < 50) return GEN["e1e-rendre"]();
    const P = prenom(), obj = pick(["un sachet de bonbons", "un cahier", "une glace", "un pain", "des samoussas", "une bouteille d'eau"]);
    return { enonce: `${P.nom} achète ${obj} à ${eurosTex(cPrix)} et paie avec un billet de $${billet}$ €. Combien lui rend-on ? (écris avec une virgule)`, figure: monnaie([100 * billet]), mode: "nombre", prefixe: "On rend", suffixe: "€", attendu: (100 * billet - cPrix) / 100,
      erreurs: [{ valeur: cPrix / 100, message: "Ça, c'est le prix." }, { valeur: billet + cPrix / 100, message: "On cherche la différence : soustraction." }, { valeur: (100 * billet - cPrix) / 100 + 1, message: "Vérifie : prix + monnaie rendue doit faire " + billet + " €." }],
      aides: ["Monnaie rendue = billet − prix.", `Complète jusqu'à l'euro suivant, puis jusqu'à $${billet}$ €.`, `$${billet}$ € $= ${100 * billet}$ centimes.`],
      solution: `$${nb(100 * billet)} - ${cPrix} = ${nb(100 * billet - cPrix)}$ centimes, donc on rend ${eurosTex(100 * billet - cPrix)}.` };
  };

  /* =====================================================================
     Chapitre 11 : l'heure et les durées (e1h-)
     ===================================================================== */
  const hm = (h, m) => `${h} h${m ? " " + String(m).padStart(2, "0") : ""}`;
  FIGURES["e1h-cours-quart"] = () => horloges([[2, 15, "2 h 15 (14 h 15)"], [9, 30, "9 h 30"]]);
  FIGURES["e1h-qcm-horloge"] = () => horloges([[4, 45, ""]]);
  GEN["e1h-lire"] = function () {
    const h = rand(1, 12), m = pick([0, 15, 30, 45]), apm = rand(0, 1) && h < 12;
    const H = apm ? h + 12 : h, bon = hm(H, m), fausses = [hm(apm ? (h % 12) + 13 : (h % 12) + 1, m), hm(H, (m + 30) % 60), hm(m === 0 ? 12 : m / 5 > 12 ? H : m / 5, h * 5 % 60), hm(apm ? h : h + 12 > 23 ? h : h + 12, m)];
    const c = melange(bon, fausses.filter((x) => x !== bon));
    return { enonce: `${apm ? "C'est l'après-midi. " : "C'est le matin. "}Quelle heure indique l'horloge ?`, figure: horloges([[h, m, ""]]), mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["La petite aiguille montre l'heure, la grande les minutes.", "Grande aiguille sur le $3$ : $15$ min ; sur le $6$ : $30$ min ; sur le $9$ : $45$ min.", apm ? "L'après-midi, on ajoute $12$ à l'heure : $2$ h devient $14$ h." : "Le matin, on garde l'heure de l'horloge."],
      solution: `La grande aiguille indique $${m}$ minutes${m === 15 ? " (et quart)" : m === 30 ? " (et demie)" : m === 45 ? " (moins le quart de l'heure suivante)" : ""}${m ? "" : " : heure juste"}. Il est ${bon}.` };
  };
  GEN["e1h-unites"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const [txt, v] = pick([["une heure", 60], ["une demi-heure", 30], ["un quart d'heure", 15], ["trois quarts d'heure", 45], ["deux heures", 120], ["une heure et quart", 75], ["une heure et demie", 90], ["deux quarts d'heure", 30]]); return { enonce: `Combien de minutes dans ${txt} ?`, mode: "nombre", prefixe: "", suffixe: "minutes", attendu: v, erreurs: [{ valeur: v === 60 ? 100 : v * 100 / 60, message: "Une heure, c'est $60$ minutes, pas $100$." }, { valeur: v / 2, message: "Recompte : $1$ h $= 60$ min, $\\frac{1}{2}$ h $= 30$ min, $\\frac{1}{4}$ h $= 15$ min." }].filter((e) => e.valeur !== v && Number.isInteger(e.valeur)), aides: ["$1$ heure $= 60$ minutes.", "Une demi-heure $= 30$ minutes ; un quart d'heure $= 15$ minutes.", "Ajoute les morceaux."], solution: `${Maj(txt)}, c'est $${v}$ minutes.` }; }
    if (t === 1) { const h = rand(1, 3), m = 60 * h + pick([-20, -10, 0, 10, 20]); const sg = 60 * h < m ? "<" : 60 * h > m ? ">" : "=", c = melange(`$${sg}$`, ["$<$", "$>$", "$=$"]); return { enonce: `Compare : $${h}$ h $\\;\\ldots\\;$ $${m}$ min`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Transforme les heures en minutes.", `$${h}$ h $= ${60 * h}$ min.`, `Compare $${60 * h}$ et $${m}$.`], solution: `$${h}$ h $= ${60 * h}$ min, donc $${h}$ h ${sg === "=" ? "$=$" : `$${sg}$`} $${m}$ min.` }; }
    const [a, va] = pick([["un quart d'heure", 15], ["une demi-heure", 30], ["$20$ minutes", 20], ["$10$ minutes", 10], ["trois quarts d'heure", 45]]), [b, vb] = pick([["une demi-heure", 30], ["un quart d'heure", 15], ["$25$ minutes", 25], ["une heure", 60]]), P = prenom();
    return { enonce: `${P.nom} lit pendant ${a}, puis joue pendant ${b}. Combien de minutes en tout ?`, mode: "nombre", prefixe: "", suffixe: "minutes", attendu: va + vb, erreurs: [{ valeur: Math.abs(va - vb), message: "En tout : on ajoute." }, { valeur: va + vb + 10, message: "Recompte : $\\frac{1}{4}$ h $= 15$ min, $\\frac{1}{2}$ h $= 30$ min." }], aides: [`${Maj(a.replace(/\$/g, ""))} $= ${va}$ min.`, `${Maj(b.replace(/\$/g, ""))} $= ${vb}$ min.`, `$${va} + ${vb}$.`], solution: `$${va} + ${vb} = ${va + vb}$ minutes${va + vb > 60 ? ` (soit $1$ h et $${va + vb - 60}$ min)` : va + vb === 60 ? " (soit $1$ h)" : ""}.` };
  };
  GEN["e1h-durees"] = function () {
    const h1 = rand(7, 17), m1 = pick([0, 15, 30, 45]), d = pick([15, 30, 45, 60, 90, 120, 180, 240, 30, 45]), t2 = 60 * h1 + m1 + d, h2 = Math.floor(t2 / 60), m2 = t2 % 60;
    if (h2 > 23) return GEN["e1h-durees"]();
    const enH = d % 60 === 0, act = pick(["le cours de natation", "la séance au stade", "le trajet en bus", "la visite au jardin botanique de Coconi", "le match de foot", "la pêche avec papi"]);
    return { enonce: `${Maj(act)} commence à ${hm(h1, m1)} et finit à ${hm(h2, m2)}. Combien de temps cela dure-t-il ? (réponds en ${enH ? "heures" : "minutes"})`, mode: "nombre", prefixe: "", suffixe: enH ? "heures" : "minutes", attendu: enH ? d / 60 : d,
      erreurs: enH ? [{ valeur: d, message: "On demande la durée en heures." }, { valeur: d / 60 + 1, message: "Compte les heures une par une." }] : [{ valeur: d / 100 * 100 === d ? d + 40 : Math.round((t2 - 60 * h1 - m1) / 60 * 100), message: "Une heure fait $60$ minutes, pas $100$." }, { valeur: Math.abs((h2 - h1) * 100 + m2 - m1), message: "On ne soustrait pas les heures comme des nombres ordinaires : $1$ h $= 60$ min." }].filter((e) => e.valeur !== d && e.valeur > 0),
      aides: ["Avance depuis l'heure de début jusqu'à l'heure de fin.", "Passe par l'heure juste, si besoin.", "$1$ heure $= 60$ minutes."],
      solution: `De ${hm(h1, m1)} à ${hm(h2, m2)}, il s'écoule ${enH ? `$${d / 60}$ heure${d > 60 ? "s" : ""}` : `$${d}$ minutes${d >= 60 ? ` ($1$ h et $${d - 60}$ min)` : ""}`}.` };
  };

  /* =====================================================================
     Chapitre 12 : les solides (e1s-)
     ===================================================================== */
  const NOM_S = { cube: "un cube", pave: "un pavé", boule: "une boule", cylindre: "un cylindre", cone: "un cône", pyramide: "une pyramide" };
  const POLY = { cube: [6, 8, 12, "$6$ carrés"], pave: [6, 8, 12, "des rectangles (parfois $2$ carrés)"], pyramide: [5, 5, 8, "$1$ carré et $4$ triangles"] };
  FIGURES["e1s-cours-solides"] = () => solides(["cube", "pave", "pyramide"], ["cube", "pavé", "pyramide"]);
  FIGURES["e1s-cours-ronds"] = () => solides(["boule", "cylindre", "cone"], ["boule", "cylindre", "cône"]);
  FIGURES["e1s-qcm-pyramide"] = () => solide("pyramide");
  GEN["e1s-nommer"] = function () {
    const t = rand(0, 1), types = Object.keys(NOM_S);
    if (t === 0) { const ty = pick(types), c = melange(Maj(NOM_S[ty]), types.map((x) => Maj(NOM_S[x]))); return { enonce: "Comment s'appelle ce solide ?", figure: solide(ty), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Roule-t-il ? A-t-il une pointe ?", "Regarde la forme des faces.", "Compare avec le cours."], solution: `C'est ${NOM_S[ty]}.` }; }
    const L = E.tirage(types, 3), k = rand(0, 2), noms = ["A", "B", "C"], c = melange(noms[k], [...noms, "Aucun"]);
    return { enonce: `Lequel est ${NOM_S[L[k]]} ?`, figure: solides(L), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Regarde chaque solide.", "La pyramide a une pointe et des faces triangulaires ; le cône a une pointe et roule.", "Élimine ceux qui ne vont pas."], solution: `Le solide ${noms[k]} est ${NOM_S[L[k]]}.` };
  };
  GEN["e1s-compter"] = function () {
    const ty = pick(Object.keys(POLY)), q = rand(0, 5), [F, S, A, nat] = POLY[ty];
    if (q === 4) { const P = prenom(), quoi = rand(0, 1); return { enonce: `${P.nom} fabrique ${NOM_S[ty]} avec des pailles (les arêtes) et des boules de pâte à modeler (les sommets). Combien lui faut-il de ${quoi ? "pailles" : "boules"} ?`, figure: solide(ty), mode: "nombre", prefixe: "", suffixe: quoi ? "pailles" : "boules", attendu: quoi ? A : S, erreurs: [{ valeur: F, message: "Ça, c'est le nombre de faces." }, { valeur: quoi ? S : A, message: quoi ? "Les pailles sont les arêtes, pas les sommets." : "Les boules sont les sommets, pas les arêtes." }].filter((e) => e.valeur !== (quoi ? A : S)), aides: ["Une paille = une arête ; une boule = un sommet.", `Compte les ${quoi ? "arêtes" : "sommets"} sur le dessin, cachés compris.`, quoi ? "En haut, en bas, puis celles qui relient." : "En haut, en bas (et la pointe)."], solution: `${Maj(NOM_S[ty])} a $${A}$ arêtes et $${S}$ sommets : il faut $${quoi ? A : S}$ ${quoi ? "pailles" : "boules"}.` }; }
    if (q === 5) { const [u, v] = E.tirage(Object.keys(POLY), 2), k = rand(0, 2), mot = ["faces", "sommets", "arêtes"][k], d = POLY[u][k] - POLY[v][k]; if (d === 0) return GEN["e1s-compter"](); const [g, p] = d > 0 ? [u, v] : [v, u]; return { enonce: `Combien ${NOM_S[g]} a-t-${NOM_S[g].startsWith("une") ? "elle" : "il"} de ${mot} de plus qu'${NOM_S[p]} ?`, figure: solides([g, p], [NOM_S[g].split(" ")[1], NOM_S[p].split(" ")[1]]), mode: "nombre", prefixe: "", suffixe: `${mot} de plus`, attendu: Math.abs(d), erreurs: [{ valeur: POLY[g][k], message: "Il faut comparer les deux solides : c'est un écart." }, { valeur: POLY[g][k] + POLY[p][k], message: "On cherche « de plus » : c'est une soustraction." }], aides: [`${Maj(NOM_S[g])} : $${POLY[g][k]}$ ${mot}.`, `${Maj(NOM_S[p])} : $${POLY[p][k]}$ ${mot}.`, `$${POLY[g][k]} - ${POLY[p][k]}$.`], solution: `$${POLY[g][k]} - ${POLY[p][k]} = ${Math.abs(d)}$ ${mot} de plus.` }; }
    if (q === 3) { const c = melange(nat, Object.values(POLY).map((x) => x[3]).concat(["des disques"])); return { enonce: `Quelles sont les faces d'${NOM_S[ty]} ?`, figure: solide(ty), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Une face est une surface plate.", "Regarde aussi les faces cachées.", ty === "pyramide" ? "La base est un carré, les autres faces montent vers la pointe." : "Toutes les faces sont des quadrilatères."], solution: `Les faces d'${NOM_S[ty]} : ${nat}.` }; }
    const [mot, v] = [["faces", F], ["sommets", S], ["arêtes", A]][q];
    return { enonce: `Combien ${NOM_S[ty].startsWith("une") ? "une" : "un"} ${NOM_S[ty].slice(NOM_S[ty].indexOf(" ") + 1)} a-t-${NOM_S[ty].startsWith("une") ? "elle" : "il"} de **${mot}** ?`, figure: solide(ty), mode: "nombre", prefixe: "", suffixe: mot, attendu: v,
      erreurs: [{ valeur: { faces: 3, sommets: 7, arêtes: 9 }[mot], message: "N'oublie pas ce qui est caché derrière (en pointillés)." }, { valeur: v + 1, message: "Tu as compté un élément deux fois." }].filter((e) => e.valeur !== v),
      aides: [{ faces: "Une face est une surface plate.", sommets: "Un sommet est un coin, là où des arêtes se rejoignent.", arêtes: "Une arête est un bord, là où deux faces se touchent." }[mot], "Les pointillés montrent ce qui est caché.", "Compte méthodiquement : en haut, en bas, sur les côtés."],
      solution: `${Maj(NOM_S[ty])} a $${F}$ faces, $${S}$ sommets et $${A}$ arêtes.` };
  };
  GEN["e1s-objets"] = function () {
    const [obj, ty] = pick([["un dé", "cube"], ["une boîte à chaussures", "pave"], ["une balle de tennis", "boule"], ["une boîte de conserve", "cylindre"], ["un cornet de glace", "cone"], ["la pyramide du Louvre", "pyramide"], ["une brique de lait", "pave"], ["un morceau de sucre", "cube"], ["une orange", "boule"], ["un rouleau de papier", "cylindre"], ["un chapeau pointu", "cone"], ["un toit de tente pointu à base carrée", "pyramide"], ["une valise", "pave"], ["un ballon de basket", "boule"], ["une bougie", "cylindre"]]);
    const c = melange(Maj(NOM_S[ty]), Object.values(NOM_S).map(Maj));
    const P = prenom();
    return { enonce: pick([`${Maj(obj)} a la forme de quel solide ?`, `${P.nom} montre ${obj}. Quel solide reconnais-tu ?`, `À quel solide ressemble ${obj} ?`]), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Imagine l'objet.", "Roule-t-il ? A-t-il une pointe ? Des faces plates ?", "Compare avec les solides du cours."], solution: `${Maj(obj)} a la forme d'${NOM_S[ty]}.` };
  };

  /* =====================================================================
     Chapitre 13 : figures et instruments (e1g-)
     ===================================================================== */
  // Angle de sommet O : demi-droites à 0° et à a degrés
  function angle(a, o) {
    o = o || {};
    const cx = 120, cy = 110, L = 100, rad = (a * Math.PI) / 180, x2 = r1(cx + L * Math.cos(rad)), y2 = r1(cy - L * Math.sin(rad));
    let s = `<line class="g-segment" x1="${cx}" y1="${cy}" x2="${cx + L}" y2="${cy}"/><line class="g-segment" x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}"/>`;
    if (a === 90 && o.code !== false) s += `<path class="g-code" d="M${cx + 14} ${cy} v-14 h-14"/>`;
    else s += `<path class="g-arc" d="M${cx + 24} ${cy} A24 24 0 0 0 ${r1(cx + 24 * Math.cos(rad))} ${r1(cy - 24 * Math.sin(rad))}"/>`;
    // Cadre ajusté aux trois points (sommet et bouts des côtés) après rotation
    const t = ((o.rot || 0) * Math.PI) / 180, rot = ([x, y]) => [cx + (x - cx) * Math.cos(t) - (y - cy) * Math.sin(t), cy + (x - cx) * Math.sin(t) + (y - cy) * Math.cos(t)];
    const P = [[cx, cy], [cx + L, cy], [x2, y2]].map(rot), xs = P.map((p) => p[0]), ys = P.map((p) => p[1]);
    const dx = r1(160 - (Math.min(...xs) + Math.max(...xs)) / 2), dy = r1(12 - Math.min(...ys)), H = r1(Math.max(...ys) - Math.min(...ys) + 24);
    return svg("angle", 320, H, "Angle", `<g transform="translate(${dx} ${dy}) rotate(${o.rot || 0} ${cx} ${cy})">${s}</g>`);
  }
  FIGURES["e1g-cours-figures"] = () => formes([{ type: "carre", nom: "carré" }, { type: "rectangle", nom: "rectangle" }, { type: "rectangle-tri", nom: "triangle rect." }, { type: "cercle", nom: "cercle" }]);
  FIGURES["e1g-cours-droit"] = () => angle(90);
  FIGURES["e1g-qcm-aigu"] = () => angle(50);
  FIGURES["e1g-qcm-formes"] = () => formes([{ type: "rectangle-tri", nom: "A" }, { type: "triangle", nom: "B" }, { type: "carre", nom: "C" }]);
  GEN["e1g-angles"] = function () {
    const t = pick(["droit", "aigu", "obtus"]), a = t === "droit" ? 90 : t === "aigu" ? rand(25, 70) : rand(110, 160);
    const c = melange(`un angle ${t}`, ["un angle droit", "un angle aigu", "un angle obtus", "ce n'est pas un angle"]);
    return { enonce: "Cet angle est :", figure: angle(a, { code: rand(0, 1) ? undefined : false, rot: pick([0, 0, -30, -60, -90, 30, 45, -120, 180, 150]) }), mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Pose l'équerre (ou un coin de feuille) sur le sommet.", "Droit : il épouse le coin de l'équerre. Aigu : plus petit. Obtus : plus grand.", "Un petit carré au sommet code un angle droit."],
      solution: `C'est un angle ${t} : ${t === "droit" ? "il est exactement comme le coin de l'équerre" : t === "aigu" ? "il est plus petit qu'un angle droit" : "il est plus grand qu'un angle droit"}.` };
  };
  GEN["e1g-figures"] = function () {
    const t = rand(0, 2);
    const N = { carre: "un carré", rectangle: "un rectangle", triangle: "un triangle", "rectangle-tri": "un triangle rectangle", cercle: "un cercle" };
    if (t === 0) { const ty = pick(Object.keys(N)), c = melange(Maj(N[ty]), Object.values(N).map(Maj)); return { enonce: "Comment s'appelle cette figure ?", figure: formes([{ type: ty }]), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Compte les côtés.", "Cherche les angles droits (petit carré).", "Compare les longueurs des côtés."], solution: `C'est ${N[ty]}.` }; }
    if (t === 1) { const L = E.tirage(Object.keys(N), 3), k = rand(0, 2), noms = ["A", "B", "C"], c = melange(noms[k], [...noms, "Aucune"]); return { enonce: `Quelle figure est ${N[L[k]]} ?`, figure: formes(L.map((ty, i) => ({ type: ty, nom: noms[i] }))), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Regarde chaque figure.", "Un triangle rectangle a un angle droit.", "Un cercle est une ligne ronde."], solution: `La figure ${noms[k]} est ${N[L[k]]}.` }; }
    const [q, bon, f] = pick([["Combien d'angles droits a un rectangle ?", "$4$", ["$2$", "$1$", "$0$"]], ["Combien d'angles droits a un triangle rectangle ?", "$1$", ["$3$", "$2$", "$0$"]], ["Dans un rectangle, les côtés opposés :", "ont la même longueur", ["sont tous différents", "se coupent", "sont courbes"]], ["Dans un carré, les quatre côtés :", "ont la même longueur", ["sont deux longs et deux courts", "sont courbes", "sont de longueurs au hasard"]], ["Pour vérifier un angle droit, on utilise :", "l'équerre", ["le compas", "la balance", "la règle seule"]], ["Pour tracer un cercle, on utilise :", "le compas", ["l'équerre", "la balance", "le rapporteur"]], ["Le point au milieu d'un cercle s'appelle :", "le centre", ["le sommet", "le côté", "l'angle"]], ["Combien de côtés a un triangle rectangle ?", "$3$", ["$4$", "$2$", "$1$"]], ["Un angle plus petit qu'un angle droit est :", "aigu", ["obtus", "plat", "rond"]], ["Un angle plus grand qu'un angle droit est :", "obtus", ["aigu", "carré", "nul"]]]);
    const c = melange(bon, f); return { enonce: q, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Pense aux figures du cours.", "Rectangle : $4$ angles droits, côtés opposés égaux. Carré : $4$ angles droits, $4$ côtés égaux.", "Triangle rectangle : $3$ côtés et $1$ angle droit."], solution: `Réponse : ${bon}.` };
  };

  GEN["e1g-mesures"] = function () {
    const t = rand(0, 2), P = prenom();
    if (t === 0) { const L = 2 * rand(2, 12); return { enonce: `Un segment mesure $${L}$ cm. ${P.nom} place son milieu. À combien de centimètres de chaque bout se trouve le milieu ?`, mode: "nombre", prefixe: "À", suffixe: "cm", attendu: L / 2, erreurs: [{ valeur: L, message: "Le milieu partage le segment en deux parties égales." }, { valeur: 2 * L, message: "C'est la moitié, pas le double." }], aides: ["Le milieu partage le segment en deux parties de même longueur.", "Il faut la moitié de la longueur.", `La moitié de $${L}$.`], solution: `La moitié de $${L}$ cm est $${L / 2}$ cm : le milieu est à $${L / 2}$ cm de chaque bout.` }; }
    if (t === 1) { const k = rand(2, 9); return { enonce: `${P.nom} écarte son compas de $${k}$ cm et trace un cercle. À quelle distance du centre se trouvent tous les points du cercle ?`, mode: "nombre", prefixe: "À", suffixe: "cm", attendu: k, erreurs: [{ valeur: 2 * k, message: "La distance du centre à un point du cercle est l'écartement du compas." }, { valeur: k / 2, message: "Ce n'est pas la moitié : c'est l'écartement lui-même." }], aides: ["La pointe du compas est sur le centre.", "La mine trace les points du cercle.", "L'écartement ne change pas pendant le tracé."], solution: `Tous les points du cercle sont à $${k}$ cm du centre : c'est l'écartement du compas.` }; }
    const [lo, la] = [rand(4, 12), rand(2, 8)], carre = rand(0, 1), c1 = carre ? lo : lo;
    return carre
      ? { enonce: `Un carré a un côté de $${lo}$ cm. Combien mesure chacun des autres côtés ?`, mode: "nombre", prefixe: "", suffixe: "cm", attendu: lo, erreurs: [{ valeur: 4 * lo, message: "On demande un seul côté." }, { valeur: lo / 2, message: "Les $4$ côtés d'un carré ont la même longueur." }], aides: ["Un carré a $4$ côtés.", "Ils ont tous la même longueur.", `Le premier mesure $${lo}$ cm.`], solution: `Dans un carré, les $4$ côtés mesurent $${lo}$ cm.` }
      : { enonce: `Un rectangle a une longueur de $${lo + la}$ cm et une largeur de $${la}$ cm. Combien mesure le côté opposé à la largeur ?`, mode: "nombre", prefixe: "", suffixe: "cm", attendu: la, erreurs: [{ valeur: lo + la, message: "Ça, c'est la longueur. Le côté opposé à la largeur est aussi une largeur." }, { valeur: lo + 2 * la, message: "On demande un seul côté." }], aides: ["Dans un rectangle, les côtés opposés ont la même longueur.", "En face de la largeur, il y a l'autre largeur.", `La largeur mesure $${la}$ cm.`], solution: `Les côtés opposés d'un rectangle sont égaux : $${la}$ cm.` };
  };

  /* =====================================================================
     Chapitre 14 : se repérer, tableaux et diagrammes (e1d-)
     ===================================================================== */
  function cheminHasard(n, m, k) {
    for (let e = 0; e < 60; e++) {
      let c = rand(0, n - 1), l = rand(0, m - 1); const dep = [c, l]; let ch = "", ok = true;
      for (let i = 0; i < k; i++) {
        const opts = ["h", "b", "g", "d"].filter((d) => { const nc = c + (d === "d") - (d === "g"), nl = l + (d === "b") - (d === "h"); return nc >= 0 && nc < n && nl >= 0 && nl < m && ch.slice(-1) !== { h: "b", b: "h", g: "d", d: "g" }[d]; });
        if (!opts.length) { ok = false; break; }
        const d = pick(opts); ch += d; c += (d === "d") - (d === "g"); l += (d === "b") - (d === "h");
      }
      if (ok && (c !== dep[0] || l !== dep[1])) return { dep, ch, fin: [c, l] };
    }
    return cheminHasard(n, m, k);
  }
  FIGURES["e1d-cours-chemin"] = () => quadrillage(7, 5, { depart: [0, 4], chemin: "dddhhdhh", objets: [[4, 0, "★"]] });
  FIGURES["e1d-cours-barres"] = () => barres([["à pied", 142], ["vélo", 47], ["voiture", 48], ["bus", 45]], 20, "élèves");
  FIGURES["e1d-qcm-barres"] = () => barres([["rouge", 25], ["bleu", 40], ["vert", 15], ["jaune", 30]], 5, "élèves");
  GEN["e1d-chemin"] = function () {
    const n = 7, m = 5, C = cheminHasard(n, m, rand(5, 8)), t = rand(0, 1);
    if (t === 0) { const noms = ["A", "B", "C", "D"], autres = []; while (autres.length < 3) { const p = [rand(0, n - 1), rand(0, m - 1)]; if ((p[0] !== C.fin[0] || p[1] !== C.fin[1]) && (p[0] !== C.dep[0] || p[1] !== C.dep[1]) && !autres.some((q) => q[0] === p[0] && q[1] === p[1])) autres.push(p); } const k = rand(0, 3), pl2 = [...autres]; pl2.splice(k, 0, C.fin); const c = melange(noms[k], noms); return { enonce: `Le robot part du point rond et suit le code ${fleches(C.ch)}. Où arrive-t-il ?`, figure: quadrillage(n, m, { depart: C.dep, objets: pl2.map((p, i) => [p[0], p[1], noms[i]]) }), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Une flèche = une case dans ce sens.", "Suis les flèches dans l'ordre avec ton doigt.", "Compte bien les flèches identiques qui se suivent."], solution: `En suivant le code, le robot arrive sur ${noms[k]}.`, figureSolution: quadrillage(n, m, { depart: C.dep, chemin: C.ch, objets: pl2.map((p, i) => [p[0], p[1], noms[i]]) }) }; }
    const inv = { h: "b", b: "h", g: "d", d: "g" }, f = [C.ch.split("").map((d) => inv[d]).join(""), C.ch.slice(0, -1), C.ch + C.ch.slice(-1), C.ch.split("").reverse().join("")];
    const c = melange(fleches(C.ch), f.filter((x) => x !== C.ch).map(fleches));
    return { enonce: "Quel code décrit le chemin tracé depuis le point rond ?", figure: quadrillage(n, m, { depart: C.dep, chemin: C.ch }), mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Pars du point rond.", "Pour chaque case, écris la flèche du sens.", `Le chemin fait $${C.ch.length}$ cases.`], solution: `Le code est ${fleches(C.ch)}.` };
  };
  const TX = (t) => "\\text{" + t + "}";
  GEN["e1d-double"] = function () {
    const cats = E.tirage(["à pied", "en vélo", "en voiture", "en bus", "en taxi"], 3), V = [cats.map(() => rand(5, 80)), cats.map(() => rand(5, 80))];
    const totC = cats.map((_, j) => V[0][j] + V[1][j]), totL = V.map((l) => l.reduce((s, v) => s + v, 0)), T = totL[0] + totL[1];
    const t = rand(0, 2), g = rand(0, 1), j = rand(0, 2);
    const trou = t === 2 ? [g, j] : null;
    const cell = (i, k) => (trou && trou[0] === i && trou[1] === k ? "?" : String(V[i][k]));
    const tab = { lignes: [["", ...cats.map(TX), TX("Total")], [TX("Filles"), cell(0, 0), cell(0, 1), cell(0, 2), String(totL[0])], [TX("Garçons"), cell(1, 0), cell(1, 1), cell(1, 2), String(totL[1])], [TX("Total"), ...totC.map(String), String(T)]] };
    const qui = g ? "garçons" : "filles";
    if (t === 0) return { enonce: `Combien de **${qui}** viennent à l'école ${cats[j]} ?`, tableau: tab, mode: "nombre", prefixe: "", suffixe: qui, attendu: V[g][j], erreurs: [{ valeur: V[1 - g][j], message: "Mauvaise ligne." }, { valeur: totC[j], message: "Ça, c'est le total filles et garçons." }].filter((e) => e.valeur !== V[g][j]), aides: [`Ligne « ${Maj(qui)} ».`, `Colonne « ${cats[j]} ».`, "Lis la case où elles se croisent."], solution: `$${V[g][j]}$ ${qui} viennent ${cats[j]}.` };
    if (t === 1) return { enonce: `Combien d'élèves viennent à l'école ${cats[j]} en tout ?`, tableau: tab, mode: "nombre", prefixe: "", suffixe: "élèves", attendu: totC[j], erreurs: [{ valeur: V[0][j], message: "N'oublie pas les garçons." }, { valeur: V[1][j], message: "N'oublie pas les filles." }].filter((e) => e.valeur !== totC[j]), aides: ["Regarde la ligne « Total ».", `Ou additionne filles et garçons : $${V[0][j]} + ${V[1][j]}$.`, "Vérifie avec le tableau."], solution: `$${V[0][j]} + ${V[1][j]} = ${totC[j]}$ élèves.` };
    return { enonce: `Une case du tableau est cachée. Quel nombre faut-il écrire à la place du « ? » ?`, tableau: tab, mode: "nombre", prefixe: "", attendu: V[g][j], erreurs: [{ valeur: totL[g], message: "Ça, c'est le total de la ligne." }, { valeur: totL[g] + V[g][j], message: "Il faut enlever les autres cases du total." }], aides: [`Le total de la ligne « ${Maj(qui)} » est $${totL[g]}$.`, `Les autres cases de la ligne font $${V[g].filter((_, k) => k !== j).join(" + ")} = ${totL[g] - V[g][j]}$.`, `$${totL[g]} - ${totL[g] - V[g][j]}$.`], solution: `$${totL[g]} - ${totL[g] - V[g][j]} = ${V[g][j]}$ (on peut vérifier avec le total de la colonne : $${totC[j]} - ${V[1 - g][j]} = ${V[g][j]}$).` };
  };
  GEN["e1d-diagramme"] = function () {
    const [titre, cats0] = pick([["Couleur préférée", ["rouge", "bleu", "vert", "jaune"]], ["Fruit préféré", ["mangue", "banane", "papaye", "litchi"]], ["Sport préféré", ["foot", "basket", "natation", "judo"]], ["Animal préféré", ["maki", "tortue", "dauphin", "zébu"]]]), pas = pick([5, 10]);
    const vals = []; while (vals.length < 4) { const v = pas * rand(1, 9); if (!vals.includes(v)) vals.push(v); }
    const t = rand(0, 2), fig = barres(cats0.map((c, k) => [c, vals[k]]), pas, "élèves");
    if (t === 0) { const i = rand(0, 3); return { enonce: `${titre} : combien d'élèves ont choisi « ${cats0[i]} » ?`, figure: fig, mode: "nombre", prefixe: "", suffixe: "élèves", attendu: vals[i], erreurs: [{ valeur: vals[i] / pas, message: `Chaque ligne vaut $${pas}$, pas $1$.` }, { valeur: vals[i] + pas, message: "Lis la ligne au bout de la barre." }], aides: [`Les lignes vont de $${pas}$ en $${pas}$.`, `Suis le haut de la barre « ${cats0[i]} ».`, "Lis le nombre à gauche."], solution: `La barre « ${cats0[i]} » vaut $${vals[i]}$.` }; }
    if (t === 1) { const plus = rand(0, 1), v = plus ? Math.max(...vals) : Math.min(...vals), rep = cats0[vals.indexOf(v)], c = melange(rep, cats0); return { enonce: `${titre} : quelle réponse est la ${plus ? "plus" : "moins"} fréquente ?`, figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu, aides: [`Cherche la barre la plus ${plus ? "haute" : "basse"}.`, "Compare les barres.", "Lis son nom."], solution: `« ${rep} » ($${v}$ élèves).` }; }
    const [i, k] = E.tirage([0, 1, 2, 3], 2), [a, b] = vals[i] > vals[k] ? [i, k] : [k, i];
    return { enonce: `${titre} : combien d'élèves de plus ont choisi « ${cats0[a]} » que « ${cats0[b]} » ?`, figure: fig, mode: "nombre", prefixe: "", suffixe: "élèves de plus", attendu: vals[a] - vals[b], erreurs: [{ valeur: vals[a] + vals[b], message: "On cherche l'écart : soustraction." }, { valeur: (vals[a] - vals[b]) / pas, message: `Chaque ligne vaut $${pas}$.` }], aides: [`« ${cats0[a]} » : $${vals[a]}$.`, `« ${cats0[b]} » : $${vals[b]}$.`, `$${vals[a]} - ${vals[b]}$.`], solution: `$${vals[a]} - ${vals[b]} = ${vals[a] - vals[b]}$ élèves de plus.` };
  };

  elisions(/^e1[a-z]-/);
})();
