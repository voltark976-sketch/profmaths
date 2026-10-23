/*
  Exercices du collège, classe de 5e (programme du cycle 4, BO n° 10 du 5 mars 2026).
  Ce fichier se charge après assets/exercices-college.js et reprend ses outils (window.PM_EXO.college).
  Mêmes règles : chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse
  attendue, trois indices progressifs et la solution rédigée.
  Préfixes : rc5- (règles de calcul), tr5-, fr5-, pp5-, an5-, dv5-, sc5-, nr5-, cr5-, gf5-, cl5-, pg5-, st5-, eq5-, ai5-, pb5-, sv5-, pr5-.
*/
(function () {
  "use strict";
  const { GEN, FIGURES, shuffle } = window.PM_EXO;
  const { rand, pick, melange, nb, Dc, tD, mulD, addD } = window.PM_EXO.college;

  /* =====================================================================
     Chapitre 1 : règles de calcul (rc5-)
     ===================================================================== */
  const X = "\\times", DIV = "\\div";
  // Expressions sans parenthèses : [écriture, valeur, étapes, valeur « de gauche à droite » ou null]
  function sansParentheses() {
    for (let e = 0; e < 200; e++) {
      const a = rand(2, 20), b = rand(2, 12), c = rand(2, 12), d = rand(2, 9), t = rand(0, 8);
      let r = null;
      if (t === 0) r = [`${a} + ${b} ${X} ${c}`, a + b * c, [`${a} + ${b * c}`], (a + b) * c];
      if (t === 1) r = [`${b} ${X} ${c} + ${a}`, b * c + a, [`${b * c} + ${a}`], null];
      if (t === 2 && a + 30 > b * c) { const A = b * c + rand(1, 30); r = [`${A} - ${b} ${X} ${c}`, A - b * c, [`${A} - ${b * c}`], (A - b) * c]; }
      if (t === 3) { const p = a * b, q = c * d; if (p > q) r = [`${a} ${X} ${b} - ${c} ${X} ${d}`, p - q, [`${p} - ${q}`], (p - c) * d]; }
      if (t === 4) { const B = b * c; r = [`${a} + ${B} ${DIV} ${c}`, a + b, [`${a} + ${b}`], (a + B) % c === 0 ? (a + B) / c : null]; }
      if (t === 5 && a > b) r = [`${a} - ${b} + ${c}`, a - b + c, [`${a - b} + ${c}`], a - (b + c) >= 0 ? a - (b + c) : null];
      if (t === 6) { const A = b * c * d; r = [`${A} ${DIV} ${b} ${X} ${d}`, c * d * d, [`${c * d} ${X} ${d}`], A % (b * d) === 0 ? A / (b * d) : null]; }
      if (t === 7) r = [`${a} + ${b} ${X} ${c} - ${d}`, a + b * c - d, [`${a} + ${b * c} - ${d}`, `${a + b * c} - ${d}`], (a + b) * c - d];
      if (t === 8) r = [`${a} ${X} ${b} + ${c} ${X} ${d}`, a * b + c * d, [`${a * b} + ${c * d}`], (a * b + c) * d];
      if (r) return { tex: r[0], val: r[1], etapes: r[2], faux: r[3], t };
    }
  }
  function avecParentheses() {
    for (let e = 0; e < 200; e++) {
      const a = rand(2, 12), b = rand(2, 15), c = rand(2, 12), d = rand(1, 9), t = rand(0, 7);
      let r = null;
      if (t === 0) r = [`${a} ${X} (${b} + ${c})`, a * (b + c), [`${a} ${X} ${b + c}`], a * b + c];
      if (t === 1 && c > d) r = [`(${a} + ${b}) ${X} (${c} - ${d})`, (a + b) * (c - d), [`${a + b} ${X} ${c - d}`], a + b * c - d];
      if (t === 2 && b > c) { const A = b - c + rand(1, 20); r = [`${A} - (${b} - ${c})`, A - (b - c), [`${A} - ${b - c}`], A - b - c >= 0 ? A - b - c : null]; }
      if (t === 3 && c > d) r = [`${a} + ${b} ${X} (${c} - ${d})`, a + b * (c - d), [`${a} + ${b} ${X} ${c - d}`, `${a} + ${b * (c - d)}`], (a + b) * (c - d)];
      if (t === 4) { const q = rand(2, 6), s = q * rand(2, 9), u = rand(1, s - 1), w = rand(1, 9); r = [`\\dfrac{${u} + ${s - u}}{${q + w} - ${w}}`, s / q, [`\\dfrac{${s}}{${q}}`], null]; }
      if (t === 5) { const k = rand(2, 6), m = rand(2, 9), A = k * m - b; if (A > 0) r = [`(${A} + ${b}) ${DIV} ${k} ${X} ${c}`, m * c, [`${A + b} ${DIV} ${k} ${X} ${c}`, `${m} ${X} ${c}`], A + b / k * c === Math.round(A + b / k * c) ? A + (b / k) * c : null]; }
      if (t === 6 && b > c + d) r = [`${a} ${X} [${b} - (${c} + ${d})]`, a * (b - c - d), [`${a} ${X} [${b} - ${c + d}]`, `${a} ${X} ${b - c - d}`], null];
      if (t === 7) { const q = rand(2, 9), p = q * rand(2, 9); r = [`\\dfrac{${a} ${X} ${p}}{${q}}`, (p * a) / q, [`\\dfrac{${a * p}}{${q}}`], null]; }
      if (r) return { tex: r[0], val: r[1], etapes: r[2], faux: r[3], t };
    }
  }
  const chaine = (q) => `$${[q.tex, ...q.etapes, nb(q.val)].join(" = ")}$`;

  GEN["rc5-priorites"] = function () {
    const q = sansParentheses();
    const erreurs = q.faux != null && q.faux >= 0 && q.faux !== q.val ? [{ valeur: q.faux, message: "Tu as calculé de gauche à droite sans respecter les priorités : les multiplications et les divisions passent **avant** les additions et les soustractions." }] : [];
    if (q.t === 5 && q.faux != null) erreurs[0] = { valeur: q.faux, message: "Avec seulement des additions et des soustractions, on calcule **de gauche à droite** : on commence par la soustraction." };
    if (q.t === 6 && q.faux != null) erreurs[0] = { valeur: q.faux, message: "Avec seulement des multiplications et des divisions, on calcule **de gauche à droite** : on commence par la division." };
    return { enonce: `Calcule : $${q.tex}$`, mode: "nombre", prefixe: "Résultat :", attendu: q.val, erreurs,
      aides: ["Sans parenthèses, on effectue d'abord les multiplications et les divisions, puis les additions et les soustractions.", "S'il n'y a que des additions et des soustractions (ou que des multiplications et des divisions), on calcule de gauche à droite.", `Première étape : $${q.tex} = ${q.etapes[0]}$.`],
      solution: chaine(q) };
  };

  GEN["rc5-parentheses"] = function () {
    const q = avecParentheses();
    const erreurs = q.faux != null && q.faux >= 0 && q.faux !== q.val ? [{ valeur: q.faux, message: "Les calculs entre parenthèses se font **en premier** : tu les as oubliées." }] : [];
    return { enonce: `Calcule : $${q.tex}$`, mode: "nombre", prefixe: "Résultat :", attendu: q.val, erreurs,
      aides: ["On commence par les calculs entre parenthèses. S'il y a des crochets, on commence par les parenthèses à l'intérieur.", "Un trait de fraction joue le rôle de parenthèses : on calcule le numérateur et le dénominateur avant de diviser.", `Première étape : $${q.tex} = ${q.etapes[0]}$.`],
      solution: chaine(q) };
  };

  const NATURES = ["une somme", "une différence", "un produit", "un quotient"];
  GEN["rc5-vocabulaire"] = function () {
    const a = rand(2, 15), b = rand(2, 12), c = rand(2, 12), t = rand(0, 2);
    if (t < 2) {
      const L = [
        [`${a} + ${b} ${X} ${c}`, 0, `la dernière opération est l'addition : c'est la somme de $${a}$ et de $${b} ${X} ${c}$`],
        [`(${a} + ${b}) ${X} ${c}`, 2, `on calcule d'abord la parenthèse, puis on multiplie : c'est le produit de $(${a} + ${b})$ par $${c}$`],
        [`${a} ${X} ${b} - ${c}`, 1, `la dernière opération est la soustraction : c'est la différence entre $${a} ${X} ${b}$ et $${c}$`],
        [`${a + b * c} - ${b} ${X} ${c}`, 1, `la multiplication est prioritaire, la dernière opération est la soustraction`],
        [`\\dfrac{${a} + ${b}}{${c}}`, 3, `on calcule le numérateur, puis on divise : c'est le quotient de $${a} + ${b}$ par $${c}$`],
        [`${a} ${X} (${b} + ${c})`, 2, `on calcule d'abord la parenthèse, puis on multiplie : c'est un produit de deux facteurs, $${a}$ et $(${b} + ${c})$`],
        [`(${a} + ${b}) - ${c}`, 1, `la parenthèse est calculée d'abord, puis on soustrait`],
        [`${a} + (${b + c} - ${c})`, 0, `la parenthèse est calculée d'abord, puis on additionne`],
        [`(${a * c} - ${b}) ${DIV} ${c}`, 3, `la parenthèse est calculée d'abord, puis on divise`],
        [`${a} ${X} ${b} + ${c} ${X} ${a}`, 0, `les deux produits sont prioritaires, la dernière opération est l'addition`]
      ];
      const [tex, k, expl] = pick(L);
      return { enonce: `L'expression $${tex}$ est :`, mode: "choix", choix: NATURES.slice(), attendu: k,
        aides: ["La nature d'une expression est donnée par la **dernière** opération effectuée.", "Repère l'ordre des calculs : parenthèses, puis multiplications et divisions, puis additions et soustractions.", "Somme : $+$ ; différence : $-$ ; produit : $\\times$ ; quotient : $\\div$ ou trait de fraction."],
        solution: `$${tex}$ est ${NATURES[k]} : ${expl}.` };
    }
    const s = rand(0, 1);
    if (s === 0) {
      const bonne = `$${a}$ et $(${b} + ${c})$`;
      const { choix, attendu } = melange(bonne, [`$${a}$ et $${b}$`, `$${b}$ et $${c}$`, `$${a}$, $${b}$ et $${c}$`]);
      return { enonce: `Quels sont les **facteurs** du produit $${a} ${X} (${b} + ${c})$ ?`, mode: "choix", choix, attendu,
        aides: ["Les facteurs sont les nombres (ou les expressions) que l'on multiplie.", "Ici, la multiplication porte sur toute la parenthèse.", `On multiplie $${a}$ par le résultat de $${b} + ${c}$.`],
        solution: `On multiplie $${a}$ par $(${b} + ${c})$ : les facteurs sont $${a}$ et $(${b} + ${c})$.` };
    }
    const bonne = `$${a}$ et $${b} ${X} ${c}$`;
    const { choix, attendu } = melange(bonne, [`$${a} + ${b}$ et $${c}$`, `$${a}$ et $${b}$`, `$${b}$ et $${c}$`]);
    return { enonce: `Quels sont les **termes** de la somme $${a} + ${b} ${X} ${c}$ ?`, mode: "choix", choix, attendu,
      aides: ["Les termes sont les nombres (ou les expressions) que l'on additionne.", "La multiplication est prioritaire : $" + `${b} ${X} ${c}` + "$ forme un seul bloc.", `On additionne $${a}$ et le produit $${b} ${X} ${c}$.`],
      solution: `On additionne $${a}$ et $${b} ${X} ${c}$ : ce sont les deux termes de la somme.` };
  };

  GEN["rc5-traduire"] = function () {
    const a = rand(2, 15), b = rand(2, 12), c = rand(2, 12), d = rand(2, 9), t = rand(0, 9);
    const P = [
      [`la somme de $${a}$ et du produit de $${b}$ par $${c}$`, `${a} + ${b} ${X} ${c}`, [`(${a} + ${b}) ${X} ${c}`, `${a} ${X} ${b} + ${c}`, `${a} ${X} (${b} + ${c})`]],
      [`le produit de $${a}$ par la somme de $${b}$ et de $${c}$`, `${a} ${X} (${b} + ${c})`, [`${a} ${X} ${b} + ${c}`, `(${a} + ${b}) ${X} ${c}`, `${a} + ${b} ${X} ${c}`]],
      [`la différence entre $${a + b * c}$ et le produit de $${b}$ par $${c}$`, `${a + b * c} - ${b} ${X} ${c}`, [`(${a + b * c} - ${b}) ${X} ${c}`, `${b} ${X} ${c} - ${a + b * c}`, `${a + b * c} ${X} ${b} - ${c}`]],
      [`le quotient de la somme de $${a}$ et de $${b}$ par $${c}$`, `\\dfrac{${a} + ${b}}{${c}}`, [`${a} + \\dfrac{${b}}{${c}}`, `\\dfrac{${a}}{${b} + ${c}}`, `\\dfrac{${c}}{${a} + ${b}}`]],
      [`le produit de la somme de $${a}$ et de $${b}$ par leur différence`, "", null],
      [`la somme du produit de $${a}$ par $${b}$ et du produit de $${c}$ par $${d}$`, `${a} ${X} ${b} + ${c} ${X} ${d}`, [`${a} ${X} (${b} + ${c}) ${X} ${d}`, `(${a} ${X} ${b} + ${c}) ${X} ${d}`, `${a} + ${b} ${X} ${c} + ${d}`]],
      [`le double de la somme de $${a}$ et de $${b}$`, `2 ${X} (${a} + ${b})`, [`2 ${X} ${a} + ${b}`, `${a} + 2 ${X} ${b}`, `2 + ${a} + ${b}`]],
      [`la différence entre le triple de $${a}$ et $${b}$`, `3 ${X} ${a} - ${b}`, [`3 ${X} (${a} - ${b})`, `${b} - 3 ${X} ${a}`, `3 + ${a} - ${b}`]]
    ];
    if (t <= 7) {
      let [phrase, bonne, faux] = P[t];
      if (t === 4) { const A = a + b; phrase = `le produit de la somme de $${A}$ et de $${b}$ par leur différence`; bonne = `(${A} + ${b}) ${X} (${A} - ${b})`; faux = [`${A} + ${b} ${X} ${A} - ${b}`, `(${A} + ${b}) ${X} ${A} - ${b}`, `(${A} - ${b}) ${X} (${A} - ${b})`]; }
      const { choix, attendu } = melange(`$${bonne}$`, faux.map((f) => `$${f}$`));
      return { enonce: `Quelle expression correspond à la phrase : « ${phrase} » ?`, mode: "choix", choix, attendu,
        aides: ["Le premier mot (somme, différence, produit, quotient) indique la **dernière** opération de l'expression.", "Les parenthèses sont nécessaires quand une addition ou une soustraction doit être calculée avant une multiplication.", "Relis chaque proposition avec les priorités : quelle opération est faite en dernier ?"],
        solution: `« ${phrase[0].toUpperCase() + phrase.slice(1)} » s'écrit $${bonne}$.` };
    }
    if (t === 8) {
      const n = rand(2, 9), p = rand(2, 6), m = rand(2, 6), s = rand(1, 4);
      const nom = pick(["Awa", "Moussa", "Nasma", "Ibrahim", "Faïza", "Tom"]);
      const bonne = `${n} ${X} ${p} + ${m} ${X} ${s}`;
      const { choix, attendu } = melange(`$${bonne}$`, [`$(${n} + ${m}) ${X} (${p} + ${s})$`, `$${n} + ${p} ${X} ${m} + ${s}$`, `$${n} ${X} (${p} + ${m}) ${X} ${s}$`]);
      return { enonce: `${nom} achète $${n}$ cahiers à $${p}$ € l'un et $${m}$ stylos à $${s}$ € l'un. Quelle expression donne le prix total, en euros ?`, mode: "choix", choix, attendu,
        aides: ["Calcule d'abord le prix des cahiers, puis celui des stylos.", `Prix des cahiers : $${n} ${X} ${p}$.`, "On ajoute les deux prix ; les multiplications étant prioritaires, pas besoin de parenthèses."],
        solution: `Cahiers : $${n} ${X} ${p}$ ; stylos : $${m} ${X} ${s}$. Prix total : $${bonne} = ${n * p + m * s}$ €.` };
    }
    const n = rand(2, 8), p = rand(2, 9), A = n * p + rand(1, 30), nom = pick(["Awa", "Moussa", "Nasma", "Ibrahim", "Faïza", "Tom"]);
    const bonne = `${A} - ${n} ${X} ${p}`;
    const { choix, attendu } = melange(`$${bonne}$`, [`$(${A} - ${n}) ${X} ${p}$`, `$${A} - ${n} - ${p}$`, `$${n} ${X} ${p} - ${A}$`]);
    return { enonce: `${nom} a $${A}$ €. Il achète $${n}$ places de cinéma à $${p}$ € l'une. Quelle expression donne la somme qui lui reste, en euros ?`.replace(" Il achète", ["Awa", "Nasma", "Faïza"].includes(nom) ? " Elle achète" : " Il achète"), mode: "choix", choix, attendu,
      aides: ["Calcule d'abord le prix des places.", `Prix des places : $${n} ${X} ${p}$.`, `On retire ce prix aux $${A}$ € ; la multiplication est prioritaire.`],
      solution: `Prix des places : $${n} ${X} ${p}$. Il reste $${bonne} = ${A - n * p}$ €.` };
  };

  GEN["rc5-distributivite"] = function () {
    const t = rand(0, 4);
    if (t === 0) {
      const k = rand(3, 49), [m, op] = pick([[101, "+"], [102, "+"], [99, "-"], [98, "-"], [1001, "+"], [999, "-"]]), e = Math.abs(m - (m > 500 ? 1000 : 100)), base = m > 500 ? 1000 : 100;
      const r = k * m;
      return { enonce: `Calcule astucieusement : $${k} ${X} ${m}$`, mode: "nombre", prefixe: "Résultat :", attendu: r,
        erreurs: [{ valeur: k * base + (op === "+" ? e : -e), message: `Attention : on ajoute (ou on retire) $${k}$ fois $${e}$, pas $${e}$ seulement.` }],
        aides: [`Écris $${m}$ sous la forme $${base} ${op} ${e}$.`, `$${k} ${X} (${base} ${op} ${e}) = ${k} ${X} ${base} ${op} ${k} ${X} ${e}$ : c'est la distributivité.`, `$${k} ${X} ${base} = ${k * base}$.`],
        solution: `$${k} ${X} ${m} = ${k} ${X} (${base} ${op} ${e}) = ${k} ${X} ${base} ${op} ${k} ${X} ${e} = ${k * base} ${op} ${k * e} = ${r}$.` };
    }
    if (t === 1) {
      const k = rand(3, 30), base = pick([10, 100, 100, 1000]), a = rand(1, base - 1), b = base - a;
      return { enonce: `Calcule astucieusement : $${k} ${X} ${a} + ${k} ${X} ${b}$`, mode: "nombre", prefixe: "Résultat :", attendu: k * base,
        aides: ["Les deux produits ont un facteur commun.", `$${k} ${X} ${a} + ${k} ${X} ${b} = ${k} ${X} (${a} + ${b})$ : c'est la distributivité, dans l'autre sens.`, `$${a} + ${b} = ${base}$.`],
        solution: `$${k} ${X} ${a} + ${k} ${X} ${b} = ${k} ${X} (${a} + ${b}) = ${k} ${X} ${base} = ${k * base}$.` };
    }
    if (t === 2) {
      const k = rand(2, 12), a = pick([10, 20, 30, 100]), b = rand(1, 9), op = pick(["+", "-"]);
      const v = op === "+" ? k * (a + b) : k * (a - b);
      return { enonce: `Complète pour que l'égalité soit vraie : $${k} ${X} (${a} ${op} ${b}) = ${k} ${X} ${a} ${op} ${k} ${X} \\ldots$`, mode: "nombre", prefixe: "Nombre manquant :", attendu: b,
        erreurs: [{ valeur: k * b, message: `On demande le nombre qui multiplie $${k}$, pas le produit.` }],
        aides: ["Le facteur $" + k + "$ multiplie **chaque** terme de la parenthèse.", `$${k} ${X} (${a} ${op} ${b}) = ${k} ${X} ${a} ${op} ${k} ${X} ${b}$.`, `Vérifie : les deux membres valent $${v}$.`],
        solution: `$${k} ${X} (${a} ${op} ${b}) = ${k} ${X} ${a} ${op} ${k} ${X} ${b}$ : le nombre manquant est $${b}$. Les deux membres valent $${v}$.` };
    }
    if (t === 3) {
      const k = rand(3, 25), c = rand(2, 9);
      return { enonce: `Calcule astucieusement : $${k} ${X} 1${String(c).padStart(2, "0")}$ en écrivant $1${String(c).padStart(2, "0")} = 100 + ${c}$.`, mode: "nombre", prefixe: "Résultat :", attendu: k * (100 + c),
        erreurs: [{ valeur: k * 100 + c, message: `Il faut multiplier les deux termes par $${k}$ : $${k} ${X} 100 + ${k} ${X} ${c}$.` }],
        aides: ["Distributivité : $k \\times (a + b) = k \\times a + k \\times b$.", `$${k} ${X} (100 + ${c}) = ${k} ${X} 100 + ${k} ${X} ${c}$.`, `$${k} ${X} 100 = ${k * 100}$ et $${k} ${X} ${c} = ${k * c}$.`],
        solution: `$${k} ${X} 1${String(c).padStart(2, "0")} = ${k} ${X} 100 + ${k} ${X} ${c} = ${k * 100} + ${k * c} = ${k * (100 + c)}$.` };
    }
    // facteur commun décimal
    const f = Dc(rand(11, 99), 1), base = pick([10, 10, 100]), a = rand(1, base - 1), b = base - a, r = mulD(f, Dc(base));
    return { enonce: `Calcule astucieusement : $${a} ${X} ${tD(f)} + ${b} ${X} ${tD(f)}$`, mode: "nombre", prefixe: "Résultat :", attendu: +(r.m / 10 ** r.d).toFixed(6),
      aides: [`Le facteur $${tD(f)}$ est commun aux deux produits.`, `$${a} ${X} ${tD(f)} + ${b} ${X} ${tD(f)} = (${a} + ${b}) ${X} ${tD(f)}$.`, `$${a} + ${b} = ${base}$.`],
      solution: `$${a} ${X} ${tD(f)} + ${b} ${X} ${tD(f)} = (${a} + ${b}) ${X} ${tD(f)} = ${base} ${X} ${tD(f)} = ${tD(r)}$.` };
  };

  /* =====================================================================
     Chapitre 2 : triangles (tr5-) — constructions, médiatrices, hauteurs, médianes
     ===================================================================== */
  const { geo } = window.PM_EXO.college;
  const NOMS3 = [["A", "B", "C"], ["D", "E", "F"], ["M", "N", "P"], ["R", "S", "T"], ["I", "J", "K"], ["E", "F", "G"], ["U", "V", "W"]];
  const nomsTri = () => { const n = pick(NOMS3), d = rand(0, 2); return [n[d], n[(d + 1) % 3], n[(d + 2) % 3]]; };
  const vec = (p, q) => [q[0] - p[0], q[1] - p[1]];
  const angleEn = (P, i) => { const a = P[i], u = vec(a, P[(i + 1) % 3]), v = vec(a, P[(i + 2) % 3]); return (Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))) * 180) / Math.PI; };
  function triangleHasard() {
    for (let e = 0; e < 800; e++) {
      const P0 = [[rand(40, 80), rand(150, 170)], [rand(230, 280), rand(150, 172)], [rand(90, 230), rand(28, 55)]];
      const th = (rand(-30, 30) * Math.PI) / 180, cx = 160, cy = 105;
      const P = P0.map(([x, y]) => [+(cx + (x - cx) * Math.cos(th) - (y - cy) * Math.sin(th)).toFixed(1), +(cy + (x - cx) * Math.sin(th) + (y - cy) * Math.cos(th)).toFixed(1)]);
      const ang = [0, 1, 2].map((i) => angleEn(P, i)), L = [0, 1, 2].map((i) => Math.hypot(...vec(P[i], P[(i + 1) % 3])));
      if (ang.some((a) => a < 38 || a > 82)) continue;
      if (Math.abs(L[0] - L[1]) < 18 || Math.abs(L[1] - L[2]) < 18 || Math.abs(L[0] - L[2]) < 18) continue;
      if (P.some(([x, y]) => x < 22 || x > 298 || y < 20 || y > 180)) continue;
      return P;
    }
  }
  const NOM_DROITE = { mediatrice: (A, B, C) => `la médiatrice de $[${B}${C}]$`, hauteur: (A) => `la hauteur issue de $${A}$`, mediane: (A) => `la médiane issue de $${A}$` };
  // Triangle P (sommets noms) avec une droite remarquable relative au sommet d'indice v (côté opposé : les deux autres)
  function figureDroite(P, noms, type, v) {
    const A = noms[v], B = noms[(v + 1) % 3], C = noms[(v + 2) % 3], pA = P[v], pB = P[(v + 1) % 3], pC = P[(v + 2) % 3];
    const K = noms.includes("K") ? "L" : "K", pts = { [noms[0]]: P[0], [noms[1]]: P[1], [noms[2]]: P[2] }, r1 = (p) => p.map((x) => +x.toFixed(1));
    const M = [(pB[0] + pC[0]) / 2, (pB[1] + pC[1]) / 2], d = vec(pB, pC), Ld = Math.hypot(...d), u = [d[0] / Ld, d[1] / Ld], n = [-u[1], u[0]];
    const o = { segs: [[A, B], [B, C], [C, A]], codes: [], droitAngle: [], droites: [], caches: [] };
    if (type === "mediatrice") { pts[K] = r1(M); pts.Q = r1([M[0] + n[0] * 70, M[1] + n[1] * 70]); o.droites.push([K, "Q"]); o.codes.push([B, K, 2], [K, C, 2]); o.droitAngle.push([C, K, "Q"]); o.caches.push("Q"); }
    if (type === "hauteur") { const t = (pA[0] - pB[0]) * u[0] + (pA[1] - pB[1]) * u[1]; pts[K] = r1([pB[0] + u[0] * t, pB[1] + u[1] * t]); o.droites.push([A, K]); o.droitAngle.push([C, K, A]); }
    if (type === "mediane") { pts[K] = r1(M); o.droites.push([A, K]); o.codes.push([B, K, 2], [K, C, 2]); }
    const g = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3], decal = {};
    Object.keys(pts).forEach((k) => { const [x, y] = pts[k], dx = x - g[0], dy = y - g[1], L = Math.hypot(dx, dy) || 1; decal[k] = [Math.round((dx / L) * 13) - 3, Math.round((dy / L) * 13) + 4]; });
    return geo(Object.assign({ W: 320, H: 200, pts, decal, aria: `Triangle ${noms.join("")} et une droite tracée en passant par le point ${K}` }, o));
  }
  FIGURES["tr5-hauteur"] = () => figureDroite([[50, 165], [270, 160], [120, 35]], ["B", "C", "A"], "hauteur", 2);
  FIGURES["tr5-mediane"] = () => figureDroite([[50, 165], [270, 160], [120, 35]], ["B", "C", "A"], "mediane", 2);
  FIGURES["tr5-mediatrice"] = () => figureDroite([[50, 165], [270, 160], [120, 35]], ["B", "C", "A"], "mediatrice", 2);
  FIGURES["tr5-circonscrit"] = () => {
    const P = { A: [125, 40], B: [55, 160], C: [265, 150] }, [ax, ay] = P.A, [bx, by] = P.B, [qx, qy] = P.C, D = 2 * (ax * (by - qy) + bx * (qy - ay) + qx * (ay - by));
    const cx = +(((ax * ax + ay * ay) * (by - qy) + (bx * bx + by * by) * (qy - ay) + (qx * qx + qy * qy) * (ay - by)) / D).toFixed(1), cy = +(((ax * ax + ay * ay) * (qx - bx) + (bx * bx + by * by) * (ax - qx) + (qx * qx + qy * qy) * (bx - ax)) / D).toFixed(1), r = +Math.hypot(ax - cx, ay - cy).toFixed(1);
    return geo({ W: 320, H: 260, pts: Object.assign({ O: [cx, cy] }, P), segs: [["A", "B"], ["B", "C"], ["C", "A"]], cercles: [["O", r]], decal: { A: [-4, -8], B: [-14, 6], C: [6, 8], O: [6, 14] }, aria: "Triangle ABC et son cercle circonscrit de centre O" }).replace('viewBox="0 0 320 260"', 'viewBox="0 14 320 242"');
  };

  GEN["tr5-droites"] = function () {
    for (let e = 0; e < 20; e++) {
      const P = triangleHasard(); if (!P) continue;
      const noms = nomsTri(), v = rand(0, 2), type = pick(["mediatrice", "hauteur", "mediane"]);
      const A = noms[v], B = noms[(v + 1) % 3], C = noms[(v + 2) % 3];
      const bonne = NOM_DROITE[type](A, B, C);
      const autres = ["mediatrice", "hauteur", "mediane"].filter((t) => t !== type).map((t) => NOM_DROITE[t](A, B, C));
      const voisin = pick([NOM_DROITE[type](B, C, A), NOM_DROITE[type](C, A, B)]);
      const { choix, attendu } = melange(bonne, [...autres, voisin]);
      const K = noms.includes("K") ? "L" : "K";
      const indices = { mediatrice: `${K} est le milieu de $[${B}${C}]$ (codage) et la droite est perpendiculaire à $[${B}${C}]$ (angle droit) : c'est la médiatrice de $[${B}${C}]$. Elle ne passe pas forcément par $${A}$.`, hauteur: `la droite passe par le sommet $${A}$ et elle est perpendiculaire au côté opposé $(${B}${C})$ (angle droit en ${K}) : c'est la hauteur issue de $${A}$. ${K} n'est pas le milieu de $[${B}${C}]$.`, mediane: `la droite passe par le sommet $${A}$ et par ${K}, milieu du côté opposé $[${B}${C}]$ (codage) : c'est la médiane issue de $${A}$. Il n'y a pas d'angle droit.` };
      return { enonce: `Quelle droite est tracée sur la figure ?`, figure: figureDroite(P, noms, type, v), mode: "choix", choix, attendu,
        aides: ["Regarde les codages : des petits traits identiques indiquent un milieu, le petit carré indique un angle droit.", "Une **médiatrice** passe par le milieu d'un côté et lui est perpendiculaire. Une **hauteur** passe par un sommet et est perpendiculaire au côté opposé. Une **médiane** passe par un sommet et le milieu du côté opposé.", "La droite passe-t-elle par un sommet ? Par un milieu ? Fait-elle un angle droit ?"],
        solution: indices[type][0].toUpperCase() + indices[type].slice(1) };
    }
  };

  const OPTS_C = ["Oui, on peut le construire", "Non : une longueur est plus grande que la somme des deux autres", "Non : les trois points seraient alignés", "Non : la somme des deux angles atteint ou dépasse $180^\\circ$"];
  const cm = (x) => `${nb(x)}`;
  GEN["tr5-constructible"] = function () {
    const [A, B, C] = nomsTri(), t = rand(0, 5), dec = Math.random() < 0.35;
    const L = () => (dec ? rand(15, 99) / 10 : rand(2, 12));
    if (t <= 2) {
      let a, b, c;
      for (;;) { a = L(); b = L(); if (t === 0) { const s = a + b, m = Math.abs(a - b); c = dec ? rand(Math.round(m * 10) + 3, Math.round(s * 10) - 3) / 10 : rand(Math.ceil(m) + 1, Math.ceil(s) - 1); if (c > m && c < s && c > 0) break; }
        else if (t === 1) { c = +(a + b + (dec ? rand(1, 30) / 10 : rand(1, 5))).toFixed(1); break; } else { c = +(a + b).toFixed(1); break; } }
      const cotes = shuffle([[`${A}${B}`, a], [`${B}${C}`, b], [`${A}${C}`, c]]).map(([n, x]) => `$${n} = ${cm(x)}$ cm`);
      const [grand, p1, p2] = [a, b, c].sort((u, w) => w - u);
      const s = +(p1 + p2).toFixed(1);
      const sol = t === 0 ? `La plus grande longueur, $${cm(grand)}$ cm, est plus petite que la somme des deux autres : $${cm(p1)} + ${cm(p2)} = ${cm(s)}$. On peut construire le triangle.`
        : t === 1 ? `La plus grande longueur, $${cm(grand)}$ cm, est plus grande que la somme des deux autres, $${cm(p1)} + ${cm(p2)} = ${cm(s)}$ : les deux arcs de cercle ne se coupent pas. Impossible.`
        : `La plus grande longueur est égale à la somme des deux autres : $${cm(p1)} + ${cm(p2)} = ${cm(s)}$. Les trois points sont alignés : on obtient un triangle « aplati », pas un vrai triangle.`;
      return { enonce: `Peut-on construire un triangle $${A}${B}${C}$ tel que ${cotes.join(", ")} ?`, mode: "choix", choix: OPTS_C.slice(), attendu: t === 0 ? 0 : t === 1 ? 1 : 2,
        aides: ["Avec trois longueurs, compare la **plus grande** à la somme des deux autres.", "Plus petite : constructible. Plus grande : impossible. Égale : les points sont alignés.", `La plus grande longueur est $${cm(grand)}$ cm.`], solution: sol };
    }
    if (t === 3) {
      const a = L(), b = L(), ang = rand(2, 34) * 5;
      return { enonce: `Peut-on construire un triangle $${A}${B}${C}$ tel que $${A}${B} = ${cm(a)}$ cm, $${A}${C} = ${cm(b)}$ cm et $\\widehat{${B}${A}${C}} = ${ang}^\\circ$ ?`, mode: "choix", choix: OPTS_C.slice(), attendu: 0,
        aides: ["On connaît deux côtés et l'angle compris entre eux.", `On trace $[${A}${B}]$, puis l'angle de $${ang}^\\circ$ en $${A}$, puis on place $${C}$ sur la demi-droite.`, "Toute mesure d'angle strictement comprise entre $0^\\circ$ et $180^\\circ$ convient."],
        solution: `Oui : on trace $[${A}${B}]$ de $${cm(a)}$ cm, l'angle de $${ang}^\\circ$ de sommet $${A}$, puis on reporte $${A}${C} = ${cm(b)}$ cm sur le côté de l'angle. Le triangle existe (et il est unique).` };
    }
    const a1 = rand(4, 30) * 5, ok = t === 4;
    const a2 = ok ? rand(1, Math.floor((175 - a1) / 5)) * 5 : rand(Math.ceil((180 - a1) / 5), 34) * 5;
    if (!ok && a1 + a2 < 180) return GEN["tr5-constructible"]();
    const c = L();
    return { enonce: `Peut-on construire un triangle $${A}${B}${C}$ tel que $${A}${B} = ${cm(c)}$ cm, $\\widehat{${C}${A}${B}} = ${a1}^\\circ$ et $\\widehat{${A}${B}${C}} = ${a2}^\\circ$ ?`, mode: "choix", choix: OPTS_C.slice(), attendu: ok ? 0 : 3,
      aides: ["On connaît un côté et les deux angles qui l'encadrent.", "On trace $[" + A + B + "]$ puis un angle à chaque extrémité : les deux côtés doivent se couper.", `Calcule la somme des deux angles : $${a1} + ${a2}$.`],
      solution: ok ? `$${a1}^\\circ + ${a2}^\\circ = ${a1 + a2}^\\circ$, moins de $180^\\circ$ : les deux côtés tracés se coupent en $${C}$. On peut construire le triangle.` : `$${a1}^\\circ + ${a2}^\\circ = ${a1 + a2}^\\circ$ : comme la somme des angles d'un triangle vaut $180^\\circ$, c'est impossible. Les deux côtés tracés ne se coupent pas${a1 + a2 === 180 ? " (ils sont parallèles)" : ""}.` };
  };

  GEN["tr5-proprietes"] = function () {
    const [A, B, C] = nomsTri(), t = rand(0, 8);
    const Q = [
      [`On cherche les points situés à égale distance de $${A}$ et de $${B}$. Ils sont tous sur :`, `la médiatrice de $[${A}${B}]$`, [`la médiane issue de $${C}$`, `la hauteur issue de $${C}$`, `la médiatrice de $[${B}${C}]$`], `Tout point de la médiatrice de $[${A}${B}]$ est à égale distance de $${A}$ et de $${B}$ (et seulement ceux-là).`],
      [`Le centre du cercle circonscrit au triangle $${A}${B}${C}$ est le point de concours :`, "des trois médiatrices", ["des trois hauteurs", "des trois médianes", "des trois côtés prolongés"], "Le centre est à égale distance des trois sommets : il est sur les trois médiatrices, qui sont concourantes."],
      [`Pour partager le triangle $${A}${B}${C}$ en deux triangles de même aire, avec une droite passant par $${A}$, on trace :`, `la médiane issue de $${A}$`, [`la hauteur issue de $${A}$`, `la médiatrice de $[${B}${C}]$`, `la parallèle à $(${B}${C})$ passant par $${A}$`], `Une médiane partage un triangle en deux triangles d'aires égales : même hauteur issue de $${A}$, et deux bases égales.`],
      [`La distance du point $${A}$ à la droite $(${B}${C})$ se mesure le long de :`, `la hauteur issue de $${A}$`, [`la médiane issue de $${A}$`, `la médiatrice de $[${B}${C}]$`, `le côté $[${A}${B}]$`], `La distance d'un point à une droite se mesure perpendiculairement : c'est la hauteur issue de $${A}$.`],
      [`$${A}${B}${C}$ est rectangle en $${A}$. Le centre de son cercle circonscrit est :`, `le milieu de $[${B}${C}]$`, [`le point $${A}$`, `le milieu de $[${A}${B}]$`, `à l'extérieur du triangle`], `Dans un triangle rectangle, le centre du cercle circonscrit est le milieu de l'hypoténuse $[${B}${C}]$.`],
      [`$${A}${B}${C}$ est rectangle en $${A}$. Ses trois hauteurs se coupent :`, `en $${A}$`, [`au milieu de $[${B}${C}]$`, `en $${B}$`, `à l'extérieur du triangle`], `Les côtés $[${A}${B}]$ et $[${A}${C}]$ sont perpendiculaires : chacun est la hauteur relative à l'autre. Les hauteurs se coupent donc en $${A}$.`],
      [`$${A}${B}${C}$ est isocèle en $${A}$ et $I$ est le milieu de $[${B}${C}]$. La droite $(${A}I)$ est :`, `à la fois médiane, hauteur et médiatrice de $[${B}${C}]$`, [`seulement la médiane issue de $${A}$`, `seulement la hauteur issue de $${A}$`, `la médiatrice de $[${A}${B}]$`], `$${A}$ est à égale distance de $${B}$ et $${C}$, donc il est sur la médiatrice de $[${B}${C}]$, qui passe aussi par $I$ : $(${A}I)$ est cette médiatrice, donc aussi la hauteur et la médiane issues de $${A}$.`],
      [`Trois villages $${A}$, $${B}$ et $${C}$ veulent construire un château d'eau à la même distance des trois. Où faut-il le placer ?`, "au point de concours des médiatrices du triangle", ["au point de concours des hauteurs du triangle", "au point de concours des médianes du triangle", `au milieu de $[${A}${B}]$`], "Être à la même distance des trois villages, c'est être sur les trois médiatrices : c'est le centre du cercle circonscrit."],
      [`Dans un triangle $${A}${B}${C}$, combien de hauteurs peut-on tracer ?`, "$3$, et elles sont concourantes", ["$1$ seule", "$3$, et elles sont toujours parallèles", "$6$"], "Une hauteur par sommet : $3$ hauteurs, qui se coupent en un même point."]
    ];
    const [q, bonne, faux, expl] = Q[t];
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: q, mode: "choix", choix, attendu,
      aides: ["**Médiatrice** : perpendiculaire à un côté en son milieu. **Hauteur** : issue d'un sommet, perpendiculaire au côté opposé. **Médiane** : issue d'un sommet, passe par le milieu du côté opposé.", "Les médiatrices se coupent au centre du cercle circonscrit ; les hauteurs sont concourantes ; une médiane partage le triangle en deux triangles de même aire.", "Fais un schéma à main levée pour vérifier."],
      solution: `Réponse : ${bonne}. ${expl}` };
  };

  GEN["tr5-mediatrice"] = function () {
    const [A, B, C] = nomsTri(), t = rand(0, 5), x = Dc(rand(15, 95), 1), y = Dc(rand(15, 95), 1), X = tD(x);
    if (t === 0) return { enonce: `Le point $M$ est sur la médiatrice du segment $[${A}${B}]$ et $M${A} = ${X}$ cm. Combien mesure $M${B}$ ?`, mode: "nombre", prefixe: `$M${B} =$`, suffixe: "cm", attendu: x.m / 10,
      aides: ["Quelle propriété ont les points de la médiatrice d'un segment ?", `Tout point de la médiatrice de $[${A}${B}]$ est à égale distance de $${A}$ et de $${B}$.`, `Donc $M${A} = M${B}$.`], solution: `$M$ est sur la médiatrice de $[${A}${B}]$, donc $M${B} = M${A} = ${X}$ cm.` };
    if (t === 1) { const p = addD(addD(x, x), y);
      return { enonce: `Le point $M$ est sur la médiatrice de $[${A}${B}]$, avec $M${A} = ${X}$ cm et $${A}${B} = ${tD(y)}$ cm. Quel est le périmètre du triangle $M${A}${B}$ ?`, mode: "nombre", prefixe: "Périmètre :", suffixe: "cm", attendu: p.m / 10 ** p.d,
        erreurs: [{ valeur: (x.m + y.m) / 10, message: `Il manque le côté $[M${B}]$ : il mesure aussi $${X}$ cm.` }],
        aides: [`$M$ est à égale distance de $${A}$ et de $${B}$.`, `Donc $M${B} = ${X}$ cm : le triangle est isocèle en $M$.`, "Additionne les trois côtés."], solution: `$M${B} = M${A} = ${X}$ cm, donc le périmètre vaut $${X} + ${X} + ${tD(y)} = ${tD(p)}$ cm.` }; }
    if (t === 2) { const d = mulD(x, Dc(2));
      return { enonce: `Le cercle circonscrit au triangle $${A}${B}${C}$ a pour centre $O$, et $O${A} = ${X}$ cm. Combien mesure son diamètre ?`, mode: "nombre", prefixe: "Diamètre :", suffixe: "cm", attendu: d.m / 10 ** d.d,
        erreurs: [{ valeur: x.m / 10, message: "Ça, c'est le rayon. Le diamètre est deux fois plus long." }],
        aides: [`Le cercle passe par $${A}$, $${B}$ et $${C}$ : $O${A}$ est un rayon.`, "Le diamètre vaut deux rayons.", `$2 \\times ${X}$.`], solution: `$O${A}$ est un rayon : le diamètre mesure $2 \\times ${X} = ${tD(d)}$ cm.` }; }
    if (t === 3) { const h = Dc(rand(20, 160), 1), r = h.m % 2 === 0 ? Dc(h.m / 2, 1) : Dc(h.m * 5, 2);
      return { enonce: `Le triangle $${A}${B}${C}$ est rectangle en $${A}$ et $${B}${C} = ${tD(h)}$ cm. Quel est le rayon de son cercle circonscrit ?`, mode: "nombre", prefixe: "Rayon :", suffixe: "cm", attendu: h.m / 20,
        erreurs: [{ valeur: h.m / 10, message: "L'hypoténuse est un **diamètre** du cercle circonscrit : le rayon en est la moitié." }],
        aides: ["Dans un triangle rectangle, où est le centre du cercle circonscrit ?", `C'est le milieu de l'hypoténuse $[${B}${C}]$.`, `$[${B}${C}]$ est donc un diamètre : le rayon vaut $${tD(h)} \\div 2$.`], solution: `Le centre est le milieu de l'hypoténuse $[${B}${C}]$, qui est un diamètre. Rayon : $${tD(h)} \\div 2 = ${tD(r)}$ cm.` }; }
    if (t === 4) { const d = mulD(x, Dc(2));
      return { enonce: `Le triangle $${A}${B}${C}$ est rectangle en $${A}$. Son cercle circonscrit a un rayon de $${X}$ cm. Combien mesure l'hypoténuse $[${B}${C}]$ ?`, mode: "nombre", prefixe: `$${B}${C} =$`, suffixe: "cm", attendu: d.m / 10 ** d.d,
        erreurs: [{ valeur: x.m / 10, message: "L'hypoténuse est un diamètre, pas un rayon." }],
        aides: ["Le centre du cercle circonscrit d'un triangle rectangle est le milieu de l'hypoténuse.", "L'hypoténuse est donc un diamètre.", "Diamètre $= 2 \\times$ rayon."], solution: `L'hypoténuse est un diamètre : $${B}${C} = 2 \\times ${X} = ${tD(d)}$ cm.` }; }
    const p = addD(addD(x, x), y);
    return { enonce: `$O$ est le centre du cercle circonscrit au triangle $${A}${B}${C}$, avec $O${A} = ${X}$ cm et $${B}${C} = ${tD(y)}$ cm. Quel est le périmètre du triangle $O${B}${C}$ ?`, mode: "nombre", prefixe: "Périmètre :", suffixe: "cm", attendu: p.m / 10 ** p.d,
      erreurs: [{ valeur: (x.m + y.m) / 10, message: "Il manque un côté : $OB$ et $OC$ mesurent tous les deux un rayon." }],
      aides: [`$O$ est à égale distance des trois sommets : $O${A} = O${B} = O${C}$.`, `Donc $O${B} = O${C} = ${X}$ cm.`, "Additionne les trois côtés du triangle."],
      solution: `$O${B} = O${C} = O${A} = ${X}$ cm (rayons du cercle). Périmètre : $${X} + ${X} + ${tD(y)} = ${tD(p)}$ cm.` };
  };

  GEN["tr5-mediane"] = function () {
    const [A, B, C] = nomsTri(), t = rand(0, 4), S = Dc(rand(10, 200) * 2, 1), s = Dc(S.m / 2, 1), v = (D) => D.m / 10 ** D.d;
    if (t === 0) return { enonce: `Le triangle $${A}${B}${C}$ a une aire de $${tD(S)}$ cm². $M$ est le milieu de $[${B}${C}]$. Quelle est l'aire du triangle $${A}${B}M$ ?`, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: v(s),
      erreurs: [{ valeur: v(S), message: "Le triangle $" + A + B + "M$ n'est qu'une partie du triangle $" + A + B + C + "$." }],
      aides: [`$[${A}M]$ est la médiane issue de $${A}$.`, "Une médiane partage un triangle en deux triangles de même aire.", `Aire de $${A}${B}M$ $=$ aire de $${A}${B}${C}$ $\\div 2$.`], solution: `$[${A}M]$ est une médiane : elle partage le triangle en deux triangles de même aire. Aire de $${A}${B}M$ : $${tD(S)} \\div 2 = ${tD(s)}$ cm².` };
    if (t === 1) return { enonce: `$M$ est le milieu de $[${B}${C}]$ et le triangle $${A}${B}M$ a une aire de $${tD(s)}$ cm². Quelle est l'aire du triangle $${A}${B}${C}$ ?`, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: v(S),
      erreurs: [{ valeur: v(s), message: `Le triangle $${A}${B}${C}$ est formé de $${A}${B}M$ et de $${A}M${C}$.` }],
      aides: [`$[${A}M]$ est une médiane du triangle $${A}${B}${C}$.`, `Les triangles $${A}${B}M$ et $${A}M${C}$ ont la même aire.`, "L'aire totale est le double."], solution: `Les triangles $${A}${B}M$ et $${A}M${C}$ ont la même aire, donc l'aire de $${A}${B}${C}$ vaut $2 \\times ${tD(s)} = ${tD(S)}$ cm².` };
    if (t === 2) return { enonce: `$M$ est le milieu de $[${B}${C}]$ et le triangle $${A}M${C}$ a une aire de $${tD(s)}$ cm². Quelle est l'aire du triangle $${A}${B}M$ ?`, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: v(s),
      erreurs: [{ valeur: v(S), message: "Ça, c'est l'aire du grand triangle." }],
      aides: [`$[${A}M]$ est la médiane issue de $${A}$.`, "Elle partage le triangle en deux triangles de même aire.", "Les deux petits triangles ont donc la même aire."], solution: `$[${A}M]$ est une médiane, donc $${A}${B}M$ et $${A}M${C}$ ont la même aire : $${tD(s)}$ cm².` };
    if (t === 3) { const Q = Dc(rand(10, 200) * 4, 1), q = Dc(Q.m / 4, 1);
      return { enonce: `Le triangle $${A}${B}${C}$ a une aire de $${tD(Q)}$ cm². $I$ est le milieu de $[${B}${C}]$ et $J$ le milieu de $[${B}I]$. Quelle est l'aire du triangle $${A}${B}J$ ?`, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: v(q),
        erreurs: [{ valeur: v(Q) / 2, message: `Ça, c'est l'aire de $${A}${B}I$. Il faut encore partager avec la médiane $[${A}J]$.` }],
        aides: [`$[${A}I]$ est une médiane de $${A}${B}${C}$ : aire de $${A}${B}I$ $= ${tD(Q)} \\div 2$.`, `$[${A}J]$ est une médiane du triangle $${A}${B}I$.`, "Elle partage encore cette aire en deux."], solution: `Aire de $${A}${B}I$ : $${tD(Q)} \\div 2 = ${tD(Dc(Q.m / 2, 1))}$ cm². Puis $[${A}J]$ est une médiane de $${A}${B}I$ : aire de $${A}${B}J$ $= ${tD(Dc(Q.m / 2, 1))} \\div 2 = ${tD(q)}$ cm².` }; }
    const Lg = Dc(rand(20, 180) * 2, 1), h = Dc(Lg.m / 2, 1);
    return { enonce: `Dans le triangle $${A}${B}${C}$, $[${A}M]$ est la médiane issue de $${A}$ et $${B}${C} = ${tD(Lg)}$ cm. Combien mesure $${B}M$ ?`, mode: "nombre", prefixe: `$${B}M =$`, suffixe: "cm", attendu: v(h),
      aides: ["Une médiane passe par un sommet et par le milieu du côté opposé.", `$M$ est donc le milieu de $[${B}${C}]$.`, `$${B}M = ${B}${C} \\div 2$.`], solution: `$M$ est le milieu de $[${B}${C}]$ : $${B}M = ${tD(Lg)} \\div 2 = ${tD(h)}$ cm.` };
  };

  /* =====================================================================
     Chapitre 3 : fractions (fr5-) — fractions égales, comparer, additionner et soustraire
     ===================================================================== */
  const { fr, frNet, pgcd, CONSIGNE_FR, FRAC_APPROX } = window.PM_EXO.college;
  const ppcm = (a, b) => (a * b) / pgcd(a, b);
  const frT = (a, b) => (b === 1 ? `${a}` : fr(a, b));
  const approx = (v) => (Number.isInteger(v * 1000) ? [] : FRAC_APPROX(v));
  // Deux fractions a/b et c/d au même dénominateur L : texte de l'étape
  const memeDen = (a, b, c, d) => { const L = ppcm(b, d); return { L, na: a * (L / b), nc: c * (L / d), txt: `${b === L ? fr(a, b) : `${fr(a, b)} = ${fr(a * (L / b), L)}`} \\text{ et } ${d === L ? fr(c, d) : `${fr(c, d)} = ${fr(c * (L / d), L)}`}` }; };
  function deuxFractions(propre) {
    for (;;) {
      const b = rand(2, 12), d = rand(2, 12); if (b === d) continue;
      const a = rand(1, propre ? b - 1 : 2 * b), c = rand(1, propre ? d - 1 : 2 * d);
      if (pgcd(a, b) > 1 && Math.random() < 0.6) continue;
      if (pgcd(c, d) > 1 && Math.random() < 0.6) continue;
      if (ppcm(b, d) > 72) continue;
      return [a, b, c, d];
    }
  }

  GEN["fr5-egales"] = function () {
    const t = rand(0, 3);
    if (t === 0) {
      const b = rand(2, 12), a = rand(1, 2 * b), k = rand(2, 9), haut = Math.random() < 0.5;
      if (pgcd(a, b) > 1) return GEN["fr5-egales"]();
      return { enonce: haut ? `Complète : $${fr(a, b)} = \\dfrac{\\ldots}{${b * k}}$` : `Complète : $${fr(a, b)} = \\dfrac{${a * k}}{\\ldots}$`, mode: "nombre", prefixe: "Nombre manquant :", attendu: haut ? a * k : b * k,
        erreurs: haut ? [{ valeur: a + (b * k - b), message: "On ne peut pas ajouter le même nombre en haut et en bas : il faut **multiplier** par le même nombre." }] : [{ valeur: b + (a * k - a), message: "On ne peut pas ajouter le même nombre en haut et en bas : il faut **multiplier** par le même nombre." }],
        aides: ["Une fraction ne change pas si on multiplie son numérateur et son dénominateur par un même nombre.", haut ? `Par combien a-t-on multiplié le dénominateur $${b}$ pour obtenir $${b * k}$ ?` : `Par combien a-t-on multiplié le numérateur $${a}$ pour obtenir $${a * k}$ ?`, `On a multiplié par $${k}$.`],
        solution: `$${fr(a, b)} = \\dfrac{${a} \\times ${k}}{${b} \\times ${k}} = ${fr(a * k, b * k)}$ : le nombre manquant est $${haut ? a * k : b * k}$.` };
    }
    if (t === 1) {
      const b = rand(2, 9), a = rand(1, 2 * b), k = rand(2, 8);
      if (pgcd(a, b) > 1 || a === b) return GEN["fr5-egales"]();
      const haut = Math.random() < 0.5;
      return { enonce: haut ? `Complète : $${fr(a * k, b * k)} = \\dfrac{\\ldots}{${b}}$` : `Complète : $${fr(a * k, b * k)} = \\dfrac{${a}}{\\ldots}$`, mode: "nombre", prefixe: "Nombre manquant :", attendu: haut ? a : b,
        aides: ["On peut aussi **diviser** le numérateur et le dénominateur par un même nombre.", haut ? `$${b * k}$ divisé par combien donne $${b}$ ?` : `$${a * k}$ divisé par combien donne $${a}$ ?`, `On divise par $${k}$.`],
        solution: `$${fr(a * k, b * k)} = \\dfrac{${a * k} \\div ${k}}{${b * k} \\div ${k}} = ${fr(a, b)}$ : le nombre manquant est $${haut ? a : b}$.` };
    }
    if (t === 2) {
      const b = rand(2, 9), e = rand(1, 6), r = rand(1, b - 1), a = e * b + r;
      return { enonce: `Complète : $${fr(a, b)} = ${e} + \\dfrac{\\ldots}{${b}}$`, mode: "nombre", prefixe: "Nombre manquant :", attendu: r,
        erreurs: [{ valeur: a - e, message: `On enlève $${e}$ unités, c'est-à-dire $${fr(e * b, b)}$, pas $${e}$ au numérateur.` }],
        aides: [`$${e} = ${fr(e * b, b)}$.`, `$${fr(a, b)} = ${fr(e * b, b)} + \\dfrac{\\ldots}{${b}}$.`, `$${a} - ${e * b} = ?$`],
        solution: `$${fr(a, b)} = ${fr(e * b, b)} + ${fr(r, b)} = ${e} + ${fr(r, b)}$ : le nombre manquant est $${r}$ (c'est le reste de la division de $${a}$ par $${b}$).` };
    }
    const b = rand(2, 9), a = rand(2, 20);
    if (a % b === 0) return GEN["fr5-egales"]();
    return { enonce: `Quel nombre faut-il multiplier par $${b}$ pour obtenir $${a}$ ? $${b} \\times \\ldots = ${a}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Nombre :", attendu: a / b,
      erreurs: [{ valeur: b / a, message: "C'est l'inverse : le nombre cherché est le quotient de $" + a + "$ par $" + b + "$." }, ...approx(a / b)],
      aides: ["Le nombre qui, multiplié par $b$, donne $a$ est le quotient $\\dfrac{a}{b}$.", `Ici, c'est le quotient de $${a}$ par $${b}$.`, `On l'écrit $\\dfrac{${a}}{${b}}$.`],
      solution: `$${b} \\times ${fr(a, b)} = ${a}$ : le nombre cherché est $${fr(a, b)}$${pgcd(a, b) > 1 ? ` $= ${frNet(a, b)}$` : ""}.` };
  };

  const SIGNES = ["$<$", "$>$", "$=$"];
  GEN["fr5-comparer"] = function () {
    const t = rand(0, 4);
    if (t <= 2) {
      let a, b, c, d;
      if (t === 0) { [a, b, c, d] = deuxFractions(Math.random() < 0.6); }
      else if (t === 1) { const n = rand(1, 9); b = rand(2, 12); d = rand(2, 12); if (b === d) return GEN["fr5-comparer"](); a = n; c = n; }
      else { const L = rand(2, 6), k = rand(2, 4); b = rand(2, 9); a = rand(1, 2 * b); c = a * k; d = b * k; if (Math.random() < 0.5) { c += pick([-1, 1]); if (c <= 0) c = 2; } }
      if (Math.random() < 0.5) [a, b, c, d] = [c, d, a, b];
      const v = a / b - c / d, rep = Math.abs(v) < 1e-12 ? 2 : v < 0 ? 0 : 1;
      const M = memeDen(a, b, c, d);
      const sol = t === 1 ? `Les deux fractions ont le même numérateur $${a}$ : la plus grande est celle qui a le plus petit dénominateur (on partage en moins de parts, elles sont plus grandes). Donc $${fr(a, b)} ${["<", ">", "="][rep]} ${fr(c, d)}$.`
        : `On les écrit avec le même dénominateur $${M.L}$ : $${M.txt}$. On compare les numérateurs $${M.na}$ et $${M.nc}$ : $${fr(a, b)} ${["<", ">", "="][rep]} ${fr(c, d)}$.`;
      return { enonce: `Compare : $${fr(a, b)} \\; \\ldots \\; ${fr(c, d)}$`, mode: "choix", choix: SIGNES.slice(), attendu: rep,
        aides: ["Pour comparer deux fractions, on les écrit avec le **même dénominateur**.", `Cherche un multiple commun à $${b}$ et à $${d}$ : $${M.L}$ convient.`, `$${M.txt}$.`], solution: sol };
    }
    if (t === 3) {
      const b = rand(2, 12), a = rand(1, 3 * b); if (a === b) return GEN["fr5-comparer"]();
      const rep = a < b ? 0 : 1;
      return { enonce: `Compare : $${fr(a, b)} \\; \\ldots \\; 1$`, mode: "choix", choix: SIGNES.slice(), attendu: rep,
        aides: [`$1 = ${fr(b, b)}$.`, "Une fraction est plus petite que $1$ quand son numérateur est plus petit que son dénominateur.", `Compare $${a}$ et $${b}$.`],
        solution: `$1 = ${fr(b, b)}$ et $${a} ${a < b ? "<" : ">"} ${b}$, donc $${fr(a, b)} ${a < b ? "<" : ">"} 1$.` };
    }
    // ranger trois fractions
    for (;;) {
      const L = pick([6, 8, 10, 12, 15, 18, 20, 24]), ds = [2, 3, 4, 5, 6, 8, 10, 12].filter((x) => L % x === 0);
      if (ds.length < 3) continue;
      const F = shuffle(ds.slice()).slice(0, 3).map((d) => [rand(1, 2 * d), d]);
      const vals = F.map(([n, d]) => n / d); if (new Set(vals.map((x) => x.toFixed(6))).size < 3) continue;
      const tri = F.slice().sort((p, q) => p[0] / p[1] - q[0] / q[1]), txt = (G) => "$" + G.map(([n, d]) => fr(n, d)).join(" < ") + "$";
      const bonne = txt(tri), autres = [txt([tri[1], tri[0], tri[2]]), txt([tri[0], tri[2], tri[1]]), txt([tri[2], tri[1], tri[0]]), txt(F.slice().sort((p, q) => p[1] - q[1]))].filter((x) => x !== bonne);
      const { choix, attendu } = melange(bonne, autres);
      return { enonce: `Range dans l'ordre croissant : $${F.map(([n, d]) => fr(n, d)).join(" \\; ; \\; ")}$`, mode: "choix", choix, attendu,
        aides: ["Écris les trois fractions avec le même dénominateur.", `$${L}$ est un multiple commun des trois dénominateurs.`, "Range ensuite les numérateurs."],
        solution: `Avec le dénominateur $${L}$ : $${F.map(([n, d]) => `${fr(n, d)} = ${fr(n * (L / d), L)}`).join(" \\; ; \\; ")}$. Donc ${bonne}.` };
    }
  };

  GEN["fr5-addsous"] = function () {
    const plus = Math.random() < 0.55;
    let [a, b, c, d] = deuxFractions(Math.random() < 0.5);
    if (!plus && a / b < c / d) [a, b, c, d] = [c, d, a, b];
    if (!plus && a / b === c / d) return GEN["fr5-addsous"]();
    const M = memeDen(a, b, c, d), N = plus ? M.na + M.nc : M.na - M.nc, v = N / M.L, s = plus ? "+" : "-";
    const naif = plus ? (a + c) / (b + d) : (a - c) / (b - d || 1);
    return { enonce: `Calcule $${fr(a, b)} ${s} ${fr(c, d)}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Résultat :", attendu: v,
      erreurs: [...(isFinite(naif) && Math.abs(naif - v) > 1e-9 ? [{ valeur: naif, message: "On n'additionne (ou ne soustrait) jamais les dénominateurs : on met d'abord les fractions au même dénominateur." }] : []),
        ...(Math.abs((plus ? a + c : a - c) / (b * d) - v) > 1e-9 ? [{ valeur: (plus ? a + c : a - c) / (b * d), message: "Quand on change le dénominateur, il faut aussi multiplier le numérateur par le même nombre." }] : []), ...approx(v)],
      aides: ["On ne peut additionner ou soustraire que des fractions de **même dénominateur**.", `Cherche un multiple commun à $${b}$ et à $${d}$ : $${M.L}$ convient.`, `$${M.txt}$.`],
      solution: `$${fr(a, b)} ${s} ${fr(c, d)} = ${fr(M.na, M.L)} ${s} ${fr(M.nc, M.L)} = ${fr(N, M.L)}$${pgcd(N, M.L) > 1 ? ` $= ${frNet(N, M.L)}$` : ""}.` };
  };

  GEN["fr5-calculs"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const d = rand(2, 9), n = rand(1, d - 1), q = rand(2, 15), N = d * q;
      return { enonce: `Calcule $${fr(n, d)}$ de $${N}$.`, mode: "nombre", prefixe: "Résultat :", attendu: n * q,
        erreurs: [{ valeur: q, message: `Ça, c'est $${fr(1, d)}$ de $${N}$. Il en faut $${n}$ fois plus.` }],
        aides: [`Prendre $${fr(n, d)}$ d'un nombre, c'est le partager en $${d}$ parts égales et en prendre $${n}$.`, `$${N} \\div ${d} = ${q}$.`, `$${n} \\times ${q}$.`],
        solution: `$${N} \\div ${d} = ${q}$ puis $${n} \\times ${q} = ${n * q}$ : $${fr(n, d)}$ de $${N}$ vaut $${n * q}$.` };
    }
    if (t === 1) {
      const e = rand(1, 5), [a, b] = [rand(1, 9), rand(2, 9)], [c, d] = [rand(1, 9), rand(2, 9)];
      if (b === d || ppcm(b, d) > 60 || pgcd(a, b) > 1 || pgcd(c, d) > 1) return GEN["fr5-calculs"]();
      const L = ppcm(b, d), N = e * L + a * (L / b) - c * (L / d); if (N <= 0) return GEN["fr5-calculs"]();
      const v = N / L;
      return { enonce: `Calcule $${e} + ${fr(a, b)} - ${fr(c, d)}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Résultat :", attendu: v, erreurs: approx(v),
        aides: [`Écris $${e}$ sous forme de fraction : $${e} = ${fr(e * L, L)}$.`, `Mets tout au dénominateur $${L}$.`, "Calcule de gauche à droite avec les numérateurs."],
        solution: `$${e} + ${fr(a, b)} - ${fr(c, d)} = ${fr(e * L, L)} + ${fr(a * (L / b), L)} - ${fr(c * (L / d), L)} = ${fr(N, L)}$${pgcd(N, L) > 1 ? ` $= ${frNet(N, L)}$` : ""}.` };
    }
    const ds = shuffle([2, 3, 4, 5, 6].slice()).slice(0, 2), L = ppcm(ds[0], ds[1]), a = rand(1, ds[0] - 1), c = rand(1, ds[1] - 1);
    if (a / ds[0] + c / ds[1] >= 1) return GEN["fr5-calculs"]();
    const N = L - a * (L / ds[0]) - c * (L / ds[1]), v = N / L;
    return { enonce: `Calcule $1 - ${fr(a, ds[0])} - ${fr(c, ds[1])}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Résultat :", attendu: v, erreurs: approx(v),
      aides: [`$1 = ${fr(L, L)}$.`, `Mets les fractions au dénominateur $${L}$.`, "Soustrais les numérateurs, de gauche à droite."],
      solution: `$1 - ${fr(a, ds[0])} - ${fr(c, ds[1])} = ${fr(L, L)} - ${fr(a * (L / ds[0]), L)} - ${fr(c * (L / ds[1]), L)} = ${fr(N, L)}$${pgcd(N, L) > 1 ? ` $= ${frNet(N, L)}$` : ""}.` };
  };

  GEN["fr5-problemes"] = function () {
    const t = rand(0, 3), ds = shuffle([2, 3, 4, 5, 6, 8, 10].slice()).slice(0, 2), L = ppcm(ds[0], ds[1]);
    const a = rand(1, ds[0] - 1), c = rand(1, ds[1] - 1);
    if (a / ds[0] + c / ds[1] >= 1 || pgcd(a, ds[0]) > 1 || pgcd(c, ds[1]) > 1) return GEN["fr5-problemes"]();
    const N = L - a * (L / ds[0]) - c * (L / ds[1]), v = N / L, f1 = fr(a, ds[0]), f2 = fr(c, ds[1]);
    const CTX = [
      [`Dans un collège de Mamoudzou, $${f1}$ des élèves viennent en bus et $${f2}$ viennent à pied. Les autres viennent en taxi ou en scooter.`, "Quelle fraction des élèves vient en taxi ou en scooter ?", "élèves"],
      [`Un agriculteur de Combani plante des bananiers sur $${f1}$ de son terrain et du manioc sur $${f2}$. Le reste est en jachère.`, "Quelle fraction du terrain est en jachère ?", "terrain"],
      [`Nasma dépense $${f1}$ de son argent de poche pour un livre et $${f2}$ pour une place de cinéma.`, "Quelle fraction de son argent de poche lui reste-t-il ?", "argent"],
      [`Lors d'une sortie à la plage de N'Gouja, $${f1}$ du temps est consacré au snorkeling et $${f2}$ au pique-nique. Le reste du temps est libre.`, "Quelle fraction du temps est libre ?", "temps"]
    ];
    const [ctx, q] = CTX[t];
    if (Math.random() < 0.6) {
      return { enonce: `${ctx} ${q}${CONSIGNE_FR}`, mode: "nombre", prefixe: "Fraction :", attendu: v,
        erreurs: [{ valeur: a / ds[0] + c / ds[1], message: "Ça, c'est la fraction des deux parts réunies. On demande ce qui **reste**." }, ...approx(v)],
        aides: ["Le tout correspond à $1$.", `Additionne d'abord les deux parts : $${f1} + ${f2}$.`, `Retire le résultat de $1 = ${fr(L, L)}$.`],
        solution: `$${f1} + ${f2} = ${fr(a * (L / ds[0]), L)} + ${fr(c * (L / ds[1]), L)} = ${fr(L - N, L)}$. Il reste $1 - ${fr(L - N, L)} = ${fr(N, L)}$${pgcd(N, L) > 1 ? ` $= ${frNet(N, L)}$` : ""}.` };
    }
    const k = rand(1, 4) * (t === 0 ? 2 : 1), total = L * k * (t === 0 ? rand(1, 3) : rand(1, 4)), reste = (total * N) / L;
    const unite = [["élèves", `Le collège compte $${total * 10}$ élèves.`, 10], ["m²", `Le terrain mesure $${total * 100}$ m².`, 100], ["€", `Elle a $${total}$ € d'argent de poche.`, 1], ["minutes", `La sortie dure $${total * 5}$ minutes.`, 5]][t];
    const R = reste * unite[2], T = total * unite[2];
    return { enonce: `${ctx} ${unite[1]} ${["Combien d'élèves viennent en taxi ou en scooter ?", "Quelle surface est en jachère, en m² ?", "Combien d'euros lui reste-t-il ?", "Combien de minutes sont libres ?"][t]}`, mode: "nombre", prefixe: "Réponse :", suffixe: unite[0], attendu: R,
      erreurs: [{ valeur: T - R, message: "Ça, c'est la quantité des deux parts réunies. On demande ce qui **reste**." }],
      aides: [`Calcule d'abord la fraction qui reste : $1 - ${f1} - ${f2}$.`, `Il reste $${frNet(N, L)}$ du total.`, `Calcule $${frNet(N, L)}$ de $${T}$.`],
      solution: `Il reste $1 - ${f1} - ${f2} = ${fr(N, L)}$ du total. $${fr(N, L)}$ de $${T}$ : $${T} \\div ${L} \\times ${N} = ${R}$ ${unite[0]}.` };
  };

  /* =====================================================================
     Chapitre 4 : proportionnalité et pourcentages (pp5-)
     ===================================================================== */
  const { tabP } = window.PM_EXO.college;
  const r2 = (x) => Math.round(x * 1e6) / 1e6;
  const SIT_P = [
    { n1: "Masse (kg)", n2: "Prix (€)", k: () => pick([1.5, 2, 2.5, 3, 3.2, 4, 4.5, 6]), x: () => [1, 2, 3, 4, 5, 6, 8, 10] },
    { n1: "Durée (h)", n2: "Distance (km)", k: () => pick([12, 15, 40, 50, 60, 80, 90]), x: () => [1, 2, 3, 4, 5, 6] },
    { n1: "Nombre de cahiers", n2: "Prix (€)", k: () => pick([1.2, 1.5, 2, 2.4, 3.5]), x: () => [2, 3, 4, 5, 6, 10, 12] },
    { n1: "Essence (L)", n2: "Prix (€)", k: () => pick([1.8, 1.9, 2]), x: () => [5, 10, 15, 20, 30, 40] },
    { n1: "Farine (g)", n2: "Nombre de mkatra", k: () => pick([0.01, 0.02]), x: () => [100, 200, 300, 400, 500, 600] }
  ];
  const dec = (x) => nb(r2(x));

  GEN["pp5-reconnaitre"] = function () {
    const S = pick(SIT_P), k = S.k(), xs = shuffle(S.x().slice()).slice(0, 3).sort((a, b) => a - b), propor = Math.random() < 0.5;
    let ys = xs.map((x) => r2(x * k));
    if (!propor) { const i = rand(1, 2); ys[i] = r2(ys[i] + pick([-1, 1]) * (k >= 1 ? pick([1, 2, 0.5]) : 1)); if (ys[i] <= 0) return GEN["pp5-reconnaitre"](); }
    const q = ys.map((y, i) => r2(y / xs[i])), K = `Oui, le coefficient est $${dec(k)}$`;
    const bonne = propor ? K : "Non, ce n'est pas un tableau de proportionnalité";
    const fausses = propor ? ["Non, ce n'est pas un tableau de proportionnalité", `Oui, le coefficient est $${dec(r2(k * 2))}$`, `Oui, le coefficient est $${dec(r2(k + 1))}$`] : [`Oui, le coefficient est $${dec(q[0])}$`, `Oui, le coefficient est $${dec(q[2])}$`, `Oui, le coefficient est $${dec(q[1])}$`];
    const { choix, attendu } = melange(bonne, fausses.filter((f) => f !== bonne));
    return { enonce: "Ce tableau est-il un tableau de proportionnalité ?", tableau: tabP(S.n1, S.n2, xs.map(dec), ys.map(dec)), mode: "choix", choix, attendu,
      aides: ["Dans un tableau de proportionnalité, on passe de la première ligne à la deuxième en multipliant toujours par le même nombre.", "Calcule chaque quotient : nombre du bas $\\div$ nombre du haut.", `Premier quotient : $${dec(ys[0])} \\div ${dec(xs[0])} = ${dec(q[0])}$.`],
      solution: `Quotients : ${q.map((v, i) => `$${dec(ys[i])} \\div ${dec(xs[i])} = ${dec(v)}$`).join(" ; ")}. ${propor ? `Ils sont tous égaux : c'est un tableau de proportionnalité de coefficient $${dec(k)}$.` : "Ils ne sont pas tous égaux : ce n'est pas un tableau de proportionnalité."}` };
  };

  GEN["pp5-completer"] = function () {
    const S = pick(SIT_P), k = S.k(), t = rand(0, 2);
    let xs = shuffle(S.x().slice()).slice(0, 3);
    if (t === 1) { const a = pick(S.x().filter((x) => x <= 5)), b = pick([2, 3, 4, 5].filter((m) => S.x().includes(a * m))); if (!b) return GEN["pp5-completer"](); xs = [a, a * b, rand(0, 1) ? a + a * b : xs[2]]; }
    if (new Set(xs).size < 3) return GEN["pp5-completer"]();
    const ys = xs.map((x) => r2(x * k)), cache = t === 1 ? 1 : rand(1, 2), haut = Math.random() < 0.25;
    const Lx = xs.map((x, i) => (haut && i === cache ? "\\ldots" : dec(x))), Ly = ys.map((y, i) => (!haut && i === cache ? "\\ldots" : dec(y)));
    const rep = haut ? xs[cache] : ys[cache];
    const m = r2(xs[cache] / xs[0]);
    const meth = haut ? `On divise par le coefficient $${dec(k)}$ : $${dec(ys[cache])} \\div ${dec(k)} = ${dec(xs[cache])}$.`
      : Number.isInteger(m) && m > 1 ? `$${dec(xs[cache])} = ${m} \\times ${dec(xs[0])}$, donc on multiplie $${dec(ys[0])}$ par $${m}$ : $${dec(rep)}$. (On peut aussi multiplier par le coefficient $${dec(k)}$.)`
      : xs.length === 3 && xs[2] === xs[0] + xs[1] && cache === 2 ? `$${dec(xs[2])} = ${dec(xs[0])} + ${dec(xs[1])}$, donc $${dec(ys[0])} + ${dec(ys[1])} = ${dec(rep)}$.`
      : `Le coefficient est $${dec(ys[0])} \\div ${dec(xs[0])} = ${dec(k)}$, donc $${dec(xs[cache])} \\times ${dec(k)} = ${dec(rep)}$.`;
    return { enonce: `Ce tableau est un tableau de proportionnalité. Complète la case manquante.`, tableau: tabP(S.n1, S.n2, Lx, Ly), mode: "nombre", prefixe: "Nombre manquant :", attendu: rep,
      aides: ["Plusieurs méthodes : le coefficient de proportionnalité, la multiplication d'une colonne, l'addition de deux colonnes, ou le retour à l'unité.", `Coefficient : $${dec(ys[0])} \\div ${dec(xs[0])} = ${dec(k)}$.`, haut ? "Pour remonter de la deuxième ligne à la première, on divise par le coefficient." : "Pour descendre de la première ligne à la deuxième, on multiplie par le coefficient."],
      solution: meth };
  };

  GEN["pp5-coefficient"] = function () {
    const t = rand(0, 3), nom = pick(["Awa", "Moussa", "Nasma", "Ibrahim", "Faïza", "Tom", "Zaïd", "Inès"]);
    if (t === 0) {
      const p = Dc(rand(15, 60) * 10, 2), q = rand(2, 6), tot = mulD(p, Dc(q)), n = rand(2, 9);
      return { enonce: `${nom} paie $${tD(tot)}$ € pour $${q}$ kg de tomates. Combien paierait-on pour $${n}$ kg ?`, mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: (p.m / 100) * n,
        aides: ["Le prix est proportionnel à la masse.", `Retour à l'unité : prix d'un kilogramme $= ${tD(tot)} \\div ${q}$.`, `Un kilogramme coûte $${tD(p)}$ €.`],
        solution: `Prix d'un kilogramme : $${tD(tot)} \\div ${q} = ${tD(p)}$ €. Pour $${n}$ kg : $${n} \\times ${tD(p)} = ${tD(mulD(p, Dc(n)))}$ €.` };
    }
    if (t === 1) {
      const v = pick([30, 40, 45, 50, 60, 70, 80, 90, 100]), h = pick([[2, "2 h"], [3, "3 h"], [0.5, "30 min"], [1.5, "1 h 30 min"], [2.5, "2 h 30 min"], [4, "4 h"]]), d = v * h[0];
      return { enonce: `Un véhicule roule à vitesse constante et parcourt $${dec(d)}$ km en ${h[1].replace(/(\d+)/g, "$$$1$$")}. Quelle est sa vitesse moyenne, en km/h ?`, mode: "nombre", prefixe: "Vitesse :", suffixe: "km/h", attendu: v,
        erreurs: h[0] % 1 && h[0] > 1 ? [{ valeur: d / Math.floor(h[0]), message: "Attention : $30$ min, c'est $0{,}5$ h." }] : [],
        aides: ["La vitesse moyenne en km/h est la distance parcourue en $1$ heure.", h[0] % 1 ? "$30$ min $= 0{,}5$ h." : "La distance est proportionnelle à la durée.", `Vitesse $=$ distance $\\div$ durée $= ${dec(d)} \\div ${dec(h[0])}$.`],
        solution: `En $1$ h, le véhicule parcourt $${dec(d)} \\div ${dec(h[0])} = ${v}$ km : sa vitesse moyenne est $${v}$ km/h.` };
    }
    if (t === 2) {
      const p = pick([4, 6, 8]), f = rand(2, 6) * 50, q = pick([2, 3, 6, 10, 12].filter((x) => x !== p)), rep = (f / p) * q;
      if (!Number.isInteger(rep)) return GEN["pp5-coefficient"]();
      return { enonce: `Une recette de bouchées à la noix de coco pour $${p}$ personnes demande $${f}$ g de coco râpée. Quelle masse faut-il pour $${q}$ personnes ?`, mode: "nombre", prefixe: "Masse :", suffixe: "g", attendu: rep,
        erreurs: [{ valeur: f + (q - p), message: "Les quantités sont proportionnelles au nombre de personnes : on ne fait pas une addition." }],
        aides: ["La masse de coco est proportionnelle au nombre de personnes.", `Pour une personne : $${f} \\div ${p} = ${dec(f / p)}$ g.`, `Pour $${q}$ personnes : $${q} \\times ${dec(f / p)}$.`],
        solution: `Pour une personne : $${f} \\div ${p} = ${dec(f / p)}$ g. Pour $${q}$ personnes : $${q} \\times ${dec(f / p)} = ${dec(rep)}$ g.` };
    }
    const v = pick([4, 5, 6, 12, 15, 20]), d = v * rand(2, 9) / 2;
    if (!Number.isInteger(d * 2)) return GEN["pp5-coefficient"]();
    const tps = d / v;
    return { enonce: `${nom} marche à la vitesse constante de $${v}$ km/h. Combien de temps lui faut-il pour parcourir $${dec(d)}$ km ? (Réponse en heures, par exemple $1{,}5$ pour $1$ h $30$ min.)`, mode: "nombre", prefixe: "Durée :", suffixe: "h", attendu: tps,
      aides: [`En $1$ h, ${nom} parcourt $${v}$ km.`, "La distance est proportionnelle à la durée.", `Durée $= ${dec(d)} \\div ${v}$.`],
      solution: `Durée $= ${dec(d)} \\div ${v} = ${dec(tps)}$ h${tps % 1 ? `, soit $${Math.floor(tps)}$ h $${Math.round((tps % 1) * 60)}$ min` : ""}.` };
  };

  GEN["pp5-pourcentages"] = function () {
    const t = rand(0, 3);
    if (t === 0) {
      const p = pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 75]), N = pick([20, 40, 60, 80, 120, 150, 200, 240, 300, 500, 1200]), v = (p * N) / 100;
      if (!Number.isInteger(v * 10)) return GEN["pp5-pourcentages"]();
      return { enonce: `Calcule $${p}\\,\\%$ de $${N}$.`, mode: "nombre", prefixe: "Résultat :", attendu: v,
        erreurs: [{ valeur: N - v, message: `Ça, c'est ce qui reste quand on retire $${p}\\,\\%$.` }],
        aides: [`$${p}\\,\\%$ de $${N}$, c'est $\\dfrac{${p}}{100} \\times ${N}$.`, `$1\\,\\%$ de $${N}$ vaut $${dec(N / 100)}$.`, `Multiplie par $${p}$.`],
        solution: `$${p}\\,\\%$ de $${N}$ : $${N} \\times ${p} \\div 100 = ${dec(v)}$.` };
    }
    if (t === 1) {
      const T = pick([20, 25, 40, 50, 200, 400, 500]), part = rand(1, T - 1), p = (part / T) * 100;
      if (!Number.isInteger(p)) return GEN["pp5-pourcentages"]();
      const ctx = pick([[`Dans un collège de $${T}$ élèves, $${part}$ sont demi-pensionnaires.`, "Quel pourcentage des élèves est demi-pensionnaire ?"], [`Sur $${T}$ tortues observées à Moya, $${part}$ sont des tortues vertes.`, "Quel pourcentage des tortues sont des tortues vertes ?"], [`Un club de $${T}$ adhérents compte $${part}$ filles.`, "Quel est le pourcentage de filles ?"]]);
      return { enonce: `${ctx[0]} ${ctx[1]}`, mode: "nombre", prefixe: "Pourcentage :", suffixe: "%", attendu: p,
        erreurs: [{ valeur: part, message: "Un pourcentage se calcule sur $100$ : il faut ramener l'effectif total à $100$." }],
        aides: ["Le pourcentage est la proportion ramenée à $100$.", `Proportion : $\\dfrac{${part}}{${T}}$.`, `$\\dfrac{${part}}{${T}} = \\dfrac{\\ldots}{100}$.`],
        solution: `$\\dfrac{${part}}{${T}} = ${dec(part / T)} = \\dfrac{${dec(p)}}{100}$ : cela représente $${dec(p)}\\,\\%$.` };
    }
    if (t === 2) {
      const noms = shuffle(["Alexis", "Chloé", "Salma", "Djibril", "Anli", "Mariama"].slice()).slice(0, 4), T = pick([20, 25, 40, 50]);
      let v; for (;;) { v = [rand(1, T / 2), rand(1, T / 2), rand(1, T / 2)]; const r = T - v[0] - v[1] - v[2]; if (r >= 1) { v.push(r); break; } }
      const i = rand(0, 3), p = (v[i] / T) * 100;
      return { enonce: `À l'élection des délégués, chaque élève a voté pour un seul candidat. Quel pourcentage des voix a obtenu ${noms[i]} ?`, tableau: { lignes: [["\\text{Candidat}", "\\text{Voix}"], ...noms.map((n, j) => [`\\text{${n}}`, v[j]]), ["\\text{Total}", T]] }, mode: "nombre", prefixe: "Pourcentage :", suffixe: "%", attendu: p,
        erreurs: [{ valeur: v[i], message: "Ça, c'est le nombre de voix, pas le pourcentage." }],
        aides: [`${noms[i]} a $${v[i]}$ voix sur $${T}$.`, `Pourcentage $= \\dfrac{${v[i]}}{${T}} \\times 100$.`, `$100 \\div ${T} = ${100 / T}$.`],
        solution: `$\\dfrac{${v[i]}}{${T}} \\times 100 = ${v[i]} \\times ${100 / T} = ${dec(p)}$ : ${noms[i]} a obtenu $${dec(p)}\\,\\%$ des voix.` };
    }
    const p = pick([10, 20, 25, 30, 40, 50]), P = rand(2, 40) * 10, r = (P * p) / 100;
    const hausse = Math.random() < 0.4, fin = hausse ? P + r : P - r;
    return { enonce: `Un article coûte $${P}$ €. Son prix ${hausse ? "augmente" : "baisse"} de $${p}\\,\\%$. Quel est son nouveau prix ?`, mode: "nombre", prefixe: "Nouveau prix :", suffixe: "€", attendu: fin,
      erreurs: [{ valeur: r, message: `Ça, c'est le montant de ${hausse ? "l'augmentation" : "la réduction"}. Il faut encore ${hausse ? "l'ajouter au" : "le retirer du"} prix de départ.` }, { valeur: hausse ? P + p : P - p, message: `$${p}\\,\\%$, ce n'est pas $${p}$ € : c'est $${p}$ € pour $100$ €.` }],
      aides: [`Calcule d'abord $${p}\\,\\%$ de $${P}$ €.`, `$${p}\\,\\%$ de $${P}$ $= ${dec(r)}$ €.`, `${hausse ? "Ajoute-le au" : "Retire-le du"} prix de départ.`],
      solution: `$${p}\\,\\%$ de $${P}$ € : $${P} \\times ${p} \\div 100 = ${dec(r)}$ €. Nouveau prix : $${P} ${hausse ? "+" : "-"} ${dec(r)} = ${dec(fin)}$ €.` };
  };

  GEN["pp5-echelles"] = function () {
    const t = rand(0, 2), E = pick([100, 200, 250, 500, 1000, 2000, 5000, 10000, 25000, 50000, 100000]);
    const unite = (cm) => (cm >= 100000 ? [cm / 100000, "km"] : cm >= 100 ? [cm / 100, "m"] : [cm, "cm"]);
    if (t === 0) {
      const c = rand(2, 30) / 2, reel = c * E, [v, u] = unite(reel);
      return { enonce: `Sur un plan à l'échelle $\\dfrac{1}{${nb(E)}}$, deux points sont distants de $${dec(c)}$ cm. Quelle est la distance réelle, en ${u} ?`, mode: "nombre", prefixe: "Distance réelle :", suffixe: u, attendu: r2(v),
        erreurs: u !== "cm" ? [{ valeur: reel, message: `Ça, c'est la distance en centimètres. Convertis en ${u}.` }] : [],
        aides: [`L'échelle $\\dfrac{1}{${nb(E)}}$ signifie que $1$ cm sur le plan représente $${nb(E)}$ cm en réalité.`, `Distance réelle $= ${dec(c)} \\times ${nb(E)}$ cm.`, `Convertis en ${u}.`],
        solution: `$${dec(c)} \\times ${nb(E)} = ${dec(reel)}$ cm, soit $${dec(v)}$ ${u}.` };
    }
    if (t === 1) {
      const c = rand(2, 24) / 2, reel = c * E, [v, u] = unite(reel);
      return { enonce: `Sur un plan à l'échelle $\\dfrac{1}{${nb(E)}}$, quelle longueur représente une distance réelle de $${dec(v)}$ ${u} ? (Réponse en cm.)`, mode: "nombre", prefixe: "Sur le plan :", suffixe: "cm", attendu: c,
        aides: [`Convertis d'abord la distance réelle en cm : $${dec(reel)}$ cm.`, `Sur le plan, les longueurs sont divisées par $${nb(E)}$.`, `$${dec(reel)} \\div ${nb(E)}$.`],
        solution: `$${dec(v)}$ ${u} $= ${dec(reel)}$ cm et $${dec(reel)} \\div ${nb(E)} = ${dec(c)}$ cm.` };
    }
    const c = rand(2, 12), reel = c * E, [v, u] = unite(reel);
    return { enonce: `Sur une carte, $${c}$ cm représentent $${dec(v)}$ ${u} en réalité. Quelle est l'échelle de la carte ? Donne le nombre $n$ tel que l'échelle soit $\\dfrac{1}{n}$.`, mode: "nombre", prefixe: "$n =$", attendu: E,
      erreurs: u !== "cm" ? [{ valeur: v / c, message: "Il faut exprimer les deux distances dans la même unité (en cm) avant de diviser." }] : [],
      aides: ["Exprime les deux longueurs dans la même unité.", `$${dec(v)}$ ${u} $= ${dec(reel)}$ cm.`, `$1$ cm sur la carte représente $${dec(reel)} \\div ${c}$ cm.`],
      solution: `$${dec(v)}$ ${u} $= ${dec(reel)}$ cm. $${dec(reel)} \\div ${c} = ${nb(E)}$ : $1$ cm représente $${nb(E)}$ cm, l'échelle est $\\dfrac{1}{${nb(E)}}$.` };
  };

  /* =====================================================================
     Chapitre 5 : angles et parallélisme (an5-)
     Figure : deux droites (d) et (d') coupées par une sécante ; angles numérotés 1 à 4 au point du haut,
     5 à 8 au point du bas (1 et 5 : en haut à droite, puis dans le sens inverse des aiguilles d'une montre).
     ===================================================================== */
  const DEG = Math.PI / 180;
  function figParalleles(o) {
    const th = o.theta, ph = o.phi || 0, W = 320, H = o.une ? 170 : 236;
    const L = [Math.cos(ph * DEG), -Math.sin(ph * DEG)], T = [Math.cos((ph + th) * DEG), -Math.sin((ph + th) * DEG)];
    const k = 110 / -T[1], P = o.une ? [[160, 85]] : [[160 + (T[0] * k) / 2, 63]];
    if (!o.une) P.push([P[0][0] - T[0] * k, P[0][1] - T[1] * k]);
    const ligne = (p, u, k1, k2) => `<line class="g-droite" x1="${(p[0] - u[0] * k1).toFixed(1)}" y1="${(p[1] - u[1] * k1).toFixed(1)}" x2="${(p[0] + u[0] * k2).toFixed(1)}" y2="${(p[1] + u[1] * k2).toFixed(1)}"/>`;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria}">`;
    P.forEach((p) => { s += ligne(p, L, 280, 280); });
    s += o.une ? ligne(P[0], T, 80, 80) : ligne(P[0], T, k + 55, 55);
    // demi-droites de chaque angle : 1 (T+, L+), 2 (L-, T+), 3 (T-, L-), 4 (L+, T-)
    const rayons = [[L, T], [T, [-L[0], -L[1]]], [[-L[0], -L[1]], [-T[0], -T[1]]], [[-T[0], -T[1]], L]];
    (o.marques || []).forEach(([k, txt, plein]) => {
      const p = P[k > 4 ? 1 : 0], [u, v] = rayons[(k - 1) % 4], r = 15;
      const a1 = Math.atan2(-u[1], u[0]), a2 = Math.atan2(-v[1], v[0]);
      const x1 = p[0] + r * Math.cos(a1), y1 = p[1] - r * Math.sin(a1), x2 = p[0] + r * Math.cos(a2), y2 = p[1] - r * Math.sin(a2);
      s += `<path class="${plein ? "g-arc g-arc-fort" : "g-arc"}" d="M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 0 0 ${x2.toFixed(1)} ${y2.toFixed(1)}"/>`;
      let b = [u[0] + v[0], u[1] + v[1]]; const nb2 = Math.hypot(...b); b = [b[0] / nb2, b[1] / nb2];
      const dist = txt.length > 2 ? 34 : 27;
      s += `<text class="g-num-angle" x="${(p[0] + b[0] * dist).toFixed(1)}" y="${(p[1] + b[1] * dist + 4).toFixed(1)}" text-anchor="middle">${txt}</text>`;
    });
    const yEn = (p, x) => p[1] + ((x - p[0]) * L[1]) / L[0];
    if (o.noms !== false) P.forEach((p, n) => { s += `<text class="g-plabel" x="${W - 6}" y="${(yEn(p, W - 20) - 7).toFixed(1)}" text-anchor="end">${n ? "(d')" : "(d)"}</text>`; });
    return s + `</svg>`;
  }
  // Mesure de l'angle numéro k quand (d) // (d') : th pour 1, 3, 5, 7 ; 180 - th pour 2, 4, 6, 8
  const mesure = (k, th) => (k % 2 ? th : 180 - th);
  const PAIRES = { correspondants: [[1, 5], [2, 6], [3, 7], [4, 8]], "alternes-internes": [[3, 5], [4, 6]], "opposés par le sommet": [[1, 3], [2, 4], [5, 7], [6, 8]], "adjacents supplémentaires": [[1, 2], [2, 3], [3, 4], [1, 4], [5, 6], [6, 7], [7, 8], [5, 8]] };
  const natureDe = (a, b) => { const [x, y] = [Math.min(a, b), Math.max(a, b)]; return Object.keys(PAIRES).find((n) => PAIRES[n].some(([p, q]) => p === x && q === y)); };
  const thetaHasard = () => pick([rand(40, 75), rand(105, 140)]);
  FIGURES["an5-paralleles"] = () => figParalleles({ theta: 60, phi: 0, marques: [[1, "1"], [2, "2"], [3, "3"], [4, "4"], [5, "5"], [6, "6"], [7, "7"], [8, "8"]], aria: "Deux droites (d) et (d') coupées par une sécante ; huit angles numérotés de 1 à 8" });
  FIGURES["an5-secantes"] = () => figParalleles({ une: true, theta: 55, marques: [[1, "55°"], [2, "?"], [3, "?"]], noms: false, aria: "Deux droites sécantes : un angle de 55 degrés et deux angles inconnus" });

  GEN["an5-vocabulaire"] = function () {
    const t = rand(0, 3), th = thetaHasard(), ph = rand(-12, 12);
    if (t <= 1) {
      let a, b, nat;
      for (;;) { a = rand(1, 8); b = rand(1, 8); if (a === b) continue; nat = natureDe(a, b); if (nat) break; }
      const fig = figParalleles({ theta: th, phi: ph, marques: [[a, String(a)], [b, String(b)]], aria: `Deux droites (d) et (d') coupées par une sécante ; les angles ${a} et ${b} sont marqués` });
      const noms = ["correspondants", "alternes-internes", "opposés par le sommet", "adjacents supplémentaires"];
      const { choix, attendu } = melange(nat, noms.filter((n) => n !== nat));
      const expl = { correspondants: "ils sont du même côté de la sécante et occupent la même position aux deux points d'intersection (l'un au-dessus de $(d)$, l'autre au-dessus de $(d')$, ou les deux en dessous)", "alternes-internes": "ils sont de part et d'autre de la sécante, et tous les deux entre les droites $(d)$ et $(d')$", "opposés par le sommet": "ils ont le même sommet et leurs côtés sont dans le prolongement l'un de l'autre", "adjacents supplémentaires": "ils ont le même sommet et un côté commun, et ensemble ils forment un angle plat" }[nat];
      return { enonce: `Sur la figure, les angles ${a} et ${b} sont :`, figure: fig, mode: "choix", choix, attendu,
        aides: ["Regarde d'abord si les deux angles ont le même sommet.", "Même sommet : opposés par le sommet (côtés prolongés) ou adjacents (un côté commun). Sommets différents : correspondants ou alternes-internes.", "**Alternes-internes** : de part et d'autre de la sécante, entre les deux droites. **Correspondants** : du même côté de la sécante, à la même place."],
        solution: `Les angles ${a} et ${b} sont ${nat} : ${expl}.` };
    }
    if (t === 2) {
      const a = rand(25, 155), q = rand(0, 1);
      const fig = figParalleles({ une: true, theta: a, phi: ph, noms: false, marques: [[1, `${a}°`], [q ? 3 : 2, "?"]], aria: `Deux droites sécantes ; un angle de ${a} degrés et un angle inconnu` });
      const rep = q ? a : 180 - a;
      return { enonce: `Deux droites sont sécantes. Quelle est la mesure de l'angle marqué « ? » ?`, figure: fig, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: rep,
        erreurs: [{ valeur: q ? 180 - a : a, message: q ? "Ces angles sont opposés par le sommet : ils ont la même mesure." : "Ces angles sont adjacents et forment un angle plat : ils sont supplémentaires." }],
        aides: ["Deux angles opposés par le sommet ont la même mesure.", "Deux angles adjacents qui forment un angle plat sont supplémentaires : leur somme vaut $180^\\circ$.", q ? "Les deux angles ont le même sommet et leurs côtés sont prolongés." : "Les deux angles ont un côté commun."],
        solution: q ? `Les deux angles sont opposés par le sommet : ils mesurent tous les deux $${a}^\\circ$.` : `Les deux angles sont supplémentaires : $180^\\circ - ${a}^\\circ = ${180 - a}^\\circ$.` };
    }
    const a = rand(10, 85) * 2, s2 = rand(0, 2);
    if (s2 === 0) return { enonce: `La bissectrice d'un angle de $${a}^\\circ$ le partage en deux angles. Combien mesure chacun d'eux ?`, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: a / 2,
      aides: ["La bissectrice d'un angle le partage en deux angles de même mesure.", "Il faut donc diviser par $2$.", `$${a} \\div 2$.`], solution: `$${a}^\\circ \\div 2 = ${a / 2}^\\circ$.` };
    const b = rand(5, 85);
    if (s2 === 1) return { enonce: `Deux angles adjacents forment un angle droit. L'un mesure $${b}^\\circ$. Combien mesure l'autre ?`, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: 90 - b,
      erreurs: [{ valeur: 180 - b, message: "Un angle droit mesure $90^\\circ$, pas $180^\\circ$." }],
      aides: ["Un angle droit mesure $90^\\circ$.", "Les deux angles se partagent cet angle droit.", `$90 - ${b}$.`], solution: `$90^\\circ - ${b}^\\circ = ${90 - b}^\\circ$ (les deux angles sont complémentaires).` };
    const c = rand(100, 175);
    const nat = pick([[c, "obtus"], [b, "aigu"], [90, "droit"], [180, "plat"]]);
    const { choix, attendu } = melange(`un angle ${nat[1]}`, ["un angle aigu", "un angle obtus", "un angle droit", "un angle plat"].filter((x) => x !== `un angle ${nat[1]}`));
    return { enonce: `Un angle de $${nat[0]}^\\circ$ est :`, mode: "choix", choix, attendu,
      aides: ["Aigu : moins de $90^\\circ$. Droit : $90^\\circ$.", "Obtus : entre $90^\\circ$ et $180^\\circ$.", "Plat : $180^\\circ$."], solution: `$${nat[0]}^\\circ$ : c'est un angle ${nat[1]}.` };
  };

  GEN["an5-calculer"] = function () {
    const th = thetaHasard(), ph = rand(-12, 12);
    for (;;) {
      const a = rand(1, 8), b = rand(1, 8); if (a === b) continue;
      const nat = natureDe(a, b); if (!nat || nat === "adjacents supplémentaires" && Math.random() < 0.5) continue;
      const ma = mesure(a, th), mb = mesure(b, th);
      const fig = figParalleles({ theta: th, phi: ph, marques: [[a, `${ma}°`], [b, "?"]], aria: `Deux droites parallèles (d) et (d') coupées par une sécante ; un angle de ${ma} degrés et un angle inconnu` });
      const egal = ma === mb;
      const just = nat === "correspondants" || nat === "alternes-internes" ? `Les deux angles sont ${nat} et les droites $(d)$ et $(d')$ sont parallèles : ils ont la même mesure.`
        : nat === "opposés par le sommet" ? "Les deux angles sont opposés par le sommet : ils ont la même mesure."
        : "Les deux angles sont adjacents et forment un angle plat : ils sont supplémentaires.";
      const sol = egal ? `${just} L'angle mesure $${mb}^\\circ$.` : nat === "adjacents supplémentaires" ? `${just} $180^\\circ - ${ma}^\\circ = ${mb}^\\circ$.` : `Les deux angles ne sont ni correspondants, ni alternes-internes : on passe par un angle intermédiaire. L'angle adjacent à l'angle connu mesure $180^\\circ - ${ma}^\\circ = ${mb}^\\circ$, et on retrouve cette mesure en ${b} par angles correspondants ou opposés par le sommet. L'angle mesure $${mb}^\\circ$.`;
      return { enonce: `Les droites $(d)$ et $(d')$ sont parallèles. Quelle est la mesure de l'angle marqué « ? » ?`, figure: fig, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: mb,
        erreurs: egal ? [{ valeur: 180 - ma, message: "Ces deux angles ont la même mesure : vérifie leur position." }] : [{ valeur: ma, message: "Ces deux angles ne sont pas égaux : l'un est aigu, l'autre obtus. Ils sont supplémentaires." }],
        aides: ["Avec deux droites parallèles, les angles correspondants et les angles alternes-internes ont la même mesure.", "Les angles opposés par le sommet sont égaux ; deux angles adjacents qui forment un angle plat sont supplémentaires.", `Sur cette figure, il n'y a que deux mesures : $${th}^\\circ$ et $${180 - th}^\\circ$. L'angle cherché est-il ${mb < 90 ? "aigu" : "obtus"} ?`],
        solution: sol };
    }
  };

  GEN["an5-paralleles"] = function () {
    const th = thetaHasard(), ph = rand(-12, 12), nat = pick(["correspondants", "alternes-internes"]), [a, b] = pick(PAIRES[nat]);
    const ma = mesure(a, th), par = Math.random() < 0.5, mb = par ? ma : ma + pick([-1, 1]) * rand(2, 6);
    const fig = figParalleles({ theta: th, phi: ph, marques: [[a, `${ma}°`], [b, `${mb}°`]], aria: `Deux droites (d) et (d') coupées par une sécante ; deux angles ${nat} de ${ma} et ${mb} degrés` });
    const bonne = par ? `Oui, car les angles ${nat} sont égaux` : `Non, car les angles ${nat} ne sont pas égaux`;
    const fausses = par ? [`Non, car les angles ${nat} sont égaux`, "On ne peut pas savoir sans mesurer les droites", `Oui, car les angles ${nat} sont supplémentaires`] : [`Oui, car les angles ${nat} sont presque égaux`, "On ne peut pas savoir sans mesurer les droites", `Oui, car les droites semblent parallèles sur le dessin`];
    const { choix, attendu } = melange(bonne, fausses);
    return { enonce: `Le dessin n'est pas forcément exact : on ne se fie qu'aux mesures indiquées. Les droites $(d)$ et $(d')$ sont-elles parallèles ?`, figure: fig, mode: "choix", choix, attendu,
      aides: [`Les deux angles marqués sont ${nat}.`, `Propriété : si deux droites coupées par une sécante forment des angles ${nat} **égaux**, alors elles sont parallèles.`, "Et si ces angles ne sont pas égaux, les droites ne sont pas parallèles."],
      solution: par ? `Les angles ${nat} mesurent tous les deux $${ma}^\\circ$ : ils sont égaux, donc $(d)$ et $(d')$ sont parallèles.` : `Les angles ${nat} mesurent $${ma}^\\circ$ et $${mb}^\\circ$ : ils ne sont pas égaux, donc $(d)$ et $(d')$ ne sont pas parallèles (même si le dessin donne l'impression contraire).` };
  };

  GEN["an5-triangles"] = function () {
    const t = rand(0, 4), N = nomsTri(), [A, B, C] = N;
    if (t === 0) {
      const a = rand(20, 110), b = rand(15, 160 - a);
      return { enonce: `Dans le triangle $${A}${B}${C}$, $\\widehat{${A}} = ${a}^\\circ$ et $\\widehat{${B}} = ${b}^\\circ$. Combien mesure $\\widehat{${C}}$ ?`, mode: "nombre", prefixe: `$\\widehat{${C}} =$`, suffixe: "°", attendu: 180 - a - b,
        erreurs: [{ valeur: a + b, message: "Ça, c'est la somme des deux angles connus. Il faut la retirer de $180^\\circ$." }, { valeur: 360 - a - b, message: "La somme des angles d'un triangle vaut $180^\\circ$, pas $360^\\circ$." }],
        aides: ["La somme des angles d'un triangle vaut $180^\\circ$.", `$${a} + ${b} = ${a + b}$.`, `$180 - ${a + b}$.`], solution: `$\\widehat{${C}} = 180^\\circ - (${a}^\\circ + ${b}^\\circ) = 180^\\circ - ${a + b}^\\circ = ${180 - a - b}^\\circ$.` };
    }
    if (t === 1) {
      const s = rand(10, 140) * (Math.random() < 0.5 ? 1 : 1); if (s % 2) return GEN["an5-triangles"]();
      return { enonce: `Le triangle $${A}${B}${C}$ est isocèle en $${A}$ et $\\widehat{${A}} = ${s}^\\circ$. Combien mesure $\\widehat{${B}}$ ?`, mode: "nombre", prefixe: `$\\widehat{${B}} =$`, suffixe: "°", attendu: (180 - s) / 2,
        erreurs: [{ valeur: 180 - s, message: `Les angles $\\widehat{${B}}$ et $\\widehat{${C}}$ se partagent ces $${180 - s}^\\circ$ : divise par $2$.` }, { valeur: s, message: `Dans un triangle isocèle en $${A}$, ce sont les angles à la base, $\\widehat{${B}}$ et $\\widehat{${C}}$, qui sont égaux.` }],
        aides: [`Dans un triangle isocèle en $${A}$, les angles à la base $\\widehat{${B}}$ et $\\widehat{${C}}$ sont égaux.`, `Ensemble, ils mesurent $180^\\circ - ${s}^\\circ = ${180 - s}^\\circ$.`, `$${180 - s} \\div 2$.`],
        solution: `$\\widehat{${B}} + \\widehat{${C}} = 180^\\circ - ${s}^\\circ = ${180 - s}^\\circ$ et ces deux angles sont égaux : $\\widehat{${B}} = ${180 - s}^\\circ \\div 2 = ${(180 - s) / 2}^\\circ$.` };
    }
    if (t === 2) {
      const b = rand(15, 80);
      return { enonce: `Le triangle $${A}${B}${C}$ est isocèle en $${A}$ et $\\widehat{${B}} = ${b}^\\circ$. Combien mesure $\\widehat{${A}}$ ?`, mode: "nombre", prefixe: `$\\widehat{${A}} =$`, suffixe: "°", attendu: 180 - 2 * b,
        erreurs: [{ valeur: 180 - b, message: `$\\widehat{${C}}$ mesure aussi $${b}^\\circ$ : il faut retirer les deux angles à la base.` }],
        aides: [`$\\widehat{${C}} = \\widehat{${B}} = ${b}^\\circ$ (angles à la base).`, `$${b} + ${b} = ${2 * b}$.`, `$180 - ${2 * b}$.`], solution: `$\\widehat{${C}} = \\widehat{${B}} = ${b}^\\circ$, donc $\\widehat{${A}} = 180^\\circ - 2 \\times ${b}^\\circ = ${180 - 2 * b}^\\circ$.` };
    }
    if (t === 3) {
      const b = rand(12, 78);
      return { enonce: `Le triangle $${A}${B}${C}$ est rectangle en $${A}$ et $\\widehat{${B}} = ${b}^\\circ$. Combien mesure $\\widehat{${C}}$ ?`, mode: "nombre", prefixe: `$\\widehat{${C}} =$`, suffixe: "°", attendu: 90 - b,
        erreurs: [{ valeur: 180 - b, message: `N'oublie pas l'angle droit en $${A}$ : il mesure $90^\\circ$.` }],
        aides: [`L'angle droit $\\widehat{${A}}$ mesure $90^\\circ$.`, "Dans un triangle rectangle, les deux angles aigus ont une somme de $90^\\circ$.", `$90 - ${b}$.`], solution: `$\\widehat{${C}} = 180^\\circ - 90^\\circ - ${b}^\\circ = ${90 - b}^\\circ$.` };
    }
    const q = rand(0, 1);
    return q ? { enonce: `Le triangle $${A}${B}${C}$ est équilatéral. Combien mesure $\\widehat{${A}}$ ?`, mode: "nombre", prefixe: `$\\widehat{${A}} =$`, suffixe: "°", attendu: 60,
      aides: ["Dans un triangle équilatéral, les trois angles sont égaux.", "Leur somme vaut $180^\\circ$.", "$180 \\div 3$."], solution: "Les trois angles sont égaux et leur somme vaut $180^\\circ$ : chacun mesure $180^\\circ \\div 3 = 60^\\circ$." }
      : (() => { const a = rand(30, 120), b = rand(20, 150 - a), c = 180 - a - b, ext = 180 - c; return { enonce: `Dans le triangle $${A}${B}${C}$, $\\widehat{${A}} = ${a}^\\circ$ et $\\widehat{${B}} = ${b}^\\circ$. On prolonge le côté $[${A}${C}]$ au-delà de $${C}$. Combien mesure l'angle formé à l'extérieur du triangle, en $${C}$, entre ce prolongement et $[${C}${B}]$ ?`, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: ext,
        erreurs: [{ valeur: c, message: "Ça, c'est l'angle intérieur en $" + C + "$. L'angle extérieur est son supplémentaire." }],
        aides: [`Calcule d'abord $\\widehat{${C}} = 180^\\circ - ${a}^\\circ - ${b}^\\circ$.`, "L'angle extérieur et l'angle intérieur en $" + C + "$ forment un angle plat.", `Angle extérieur $= 180^\\circ - \\widehat{${C}}$.`],
        solution: `$\\widehat{${C}} = 180^\\circ - ${a}^\\circ - ${b}^\\circ = ${c}^\\circ$, puis l'angle extérieur vaut $180^\\circ - ${c}^\\circ = ${ext}^\\circ$ (c'est aussi $${a}^\\circ + ${b}^\\circ$).` }; })();
  };

  /* =====================================================================
     Chapitre 6 : divisibilité (dv5-)
     ===================================================================== */
  const { diviseurs } = window.PM_EXO.college;
  const sommeChiffres = (n) => String(n).split("").reduce((s, c) => s + +c, 0);

  GEN["dv5-euclide"] = function () {
    const t = rand(0, 3);
    if (t <= 1) {
      const b = rand(3, 25), q = rand(4, 60), r = rand(1, b - 1), a = b * q + r, ask = t === 0 ? "quotient" : "reste";
      return { enonce: `Dans la division euclidienne de $${nb(a)}$ par $${b}$, quel est le ${ask} ?`, mode: "nombre", prefixe: `${ask[0].toUpperCase() + ask.slice(1)} :`, attendu: t === 0 ? q : r,
        erreurs: t === 0 ? [{ valeur: r, message: "Ça, c'est le reste." }] : [{ valeur: q, message: "Ça, c'est le quotient." }],
        aides: [`Cherche le plus grand multiple de $${b}$ qui ne dépasse pas $${nb(a)}$.`, `$${b} \\times ${q} = ${nb(b * q)}$ et $${b} \\times ${q + 1} = ${nb(b * (q + 1))}$.`, `Le reste est ce qu'il manque pour aller jusqu'à $${nb(a)}$ ; il est plus petit que $${b}$.`],
        solution: `$${nb(a)} = ${b} \\times ${q} + ${r}$ avec $${r} < ${b}$ : le quotient est $${q}$ et le reste $${r}$.` };
    }
    const b = pick([6, 8, 10, 12, 15, 20, 24, 30, 45, 50]), q = rand(5, 40), r = rand(1, b - 1), a = b * q + r;
    const ctx = pick([
      [`On range $${nb(a)}$ œufs dans des boîtes de $${b}$.`, "Combien de boîtes pleines obtient-on ?", q, "boîtes", `On obtient $${q}$ boîtes pleines (et il reste $${r}$ œufs).`],
      [`$${nb(a)}$ élèves partent en sortie dans des bus de $${b}$ places.`, "Combien de bus faut-il au minimum ?", q + 1, "bus", `$${q}$ bus pleins ne suffisent pas : il reste $${r}$ élèves, il faut un bus de plus, soit $${q + 1}$ bus.`],
      [`Un pêcheur de Mtsapéré partage $${nb(a)}$ poissons en lots de $${b}$.`, "Combien de poissons restent hors des lots ?", r, "poissons", `Il fait $${q}$ lots et il reste $${r}$ poissons.`]
    ]);
    return { enonce: `${ctx[0]} ${ctx[1]}`, mode: "nombre", prefixe: "Réponse :", suffixe: ctx[3], attendu: ctx[2],
      erreurs: [ctx[2] === q + 1 ? { valeur: q, message: "Avec ce nombre de bus, il reste des élèves à transporter." } : ctx[2] === q ? { valeur: q + 1, message: "La dernière boîte n'est pas pleine." } : { valeur: q, message: "Ça, c'est le nombre de lots. On demande ce qui reste." }],
      aides: [`Effectue la division euclidienne de $${nb(a)}$ par $${b}$.`, `$${nb(a)} = ${b} \\times ${q} + ${r}$.`, "Réfléchis : la réponse est-elle le quotient, le reste, ou le quotient plus un ?"],
      solution: `$${nb(a)} = ${b} \\times ${q} + ${r}$. ${ctx[4]}` };
  };

  GEN["dv5-decimal"] = function () {
    const d = pick([Dc(rand(2, 9), 1), Dc(rand(11, 99), 1), Dc(rand(2, 9), 2), Dc(rand(12, 48), 2)]), q = Dc(rand(2, 60) * (Math.random() < 0.3 ? 1 : 1), Math.random() < 0.3 ? 1 : 0);
    const a = mulD(d, q), p = 10 ** d.d, aE = Dc(a.m * (a.d >= d.d ? 1 : 10 ** (d.d - a.d)), Math.max(0, a.d - d.d));
    return { enonce: `Calcule $${tD(a)} \\div ${tD(d)}$.`, mode: "nombre", prefixe: "Résultat :", attendu: q.m / 10 ** q.d,
      aides: [`On ne divise pas par un nombre décimal : on multiplie les deux nombres par $${p}$ pour que le diviseur devienne entier.`, `$${tD(a)} \\div ${tD(d)} = ${tD(aE)} \\div ${d.m}$.`, `Pose la division de $${tD(aE)}$ par $${d.m}$.`],
      solution: `$${tD(a)} \\div ${tD(d)} = (${tD(a)} \\times ${p}) \\div (${tD(d)} \\times ${p}) = ${tD(aE)} \\div ${d.m} = ${tD(q)}$.` };
  };

  GEN["dv5-criteres"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const k = pick([2, 3, 5, 9, 10]);
      const crit = { 2: "son chiffre des unités est $0$, $2$, $4$, $6$ ou $8$", 3: "la somme de ses chiffres est divisible par $3$", 5: "son chiffre des unités est $0$ ou $5$", 9: "la somme de ses chiffres est divisible par $9$", 10: "son chiffre des unités est $0$" }[k];
      const ok = (n) => n % k === 0;
      let bon; do bon = rand(100, 9999); while (!ok(bon) || (k === 3 && bon % 9 === 0 && Math.random() < 0.5));
      const faux = []; while (faux.length < 3) { const n = rand(100, 9999); if (!ok(n) && !faux.includes(n)) { if ((k === 9 && n % 3 === 0) || (k === 10 && n % 5 === 0) || (k === 5 && n % 10 !== 5 && n % 2 === 0) || Math.random() < 0.6) faux.push(n); } }
      const { choix, attendu } = melange(`$${nb(bon)}$`, faux.map((n) => `$${nb(n)}$`));
      return { enonce: `Lequel de ces nombres est divisible par $${k}$ ?`, mode: "choix", choix, attendu,
        aides: [`Un nombre est divisible par $${k}$ si ${crit}.`, k === 3 || k === 9 ? "Calcule la somme des chiffres de chaque nombre." : "Regarde le chiffre des unités de chaque nombre.", k === 9 ? "Attention : divisible par $3$ ne suffit pas pour être divisible par $9$." : "Un seul nombre convient."],
        solution: `$${nb(bon)}$ est divisible par $${k}$ car ${k === 3 || k === 9 ? `$${String(bon).split("").join(" + ")} = ${sommeChiffres(bon)}$, qui est divisible par $${k}$` : crit.replace("son chiffre", "son chiffre")}. Les autres ne le sont pas.` };
    }
    if (t === 1) {
      for (;;) {
        const n = rand(100, 9999) * 9, s = String(n), i = rand(0, s.length - 1); if (s[0] === "0" || (i === 0 && s[0] === "9")) continue;
        const trou = s.slice(0, i) + "\\ldots" + s.slice(i + 1), c = +s[i];
        const autres = sommeChiffres(n) - c; if (c === 0 && (9 - autres % 9) % 9 === 0 && i === 0) continue;
        if (c === 0 || c === 9) continue;
        return { enonce: `On remplace les pointillés par un chiffre pour que le nombre $${trou}$ soit divisible par $9$. Quel chiffre ?`, mode: "nombre", prefixe: "Chiffre :", attendu: c,
          aides: ["Un nombre est divisible par $9$ si la somme de ses chiffres est divisible par $9$.", `La somme des chiffres connus vaut $${autres}$.`, `Quel chiffre ajouter à $${autres}$ pour obtenir un multiple de $9$ ?`],
          solution: `$${autres} + ${c} = ${autres + c}$, qui est un multiple de $9$ : le chiffre est $${c}$ (c'est le seul de $1$ à $8$ qui convient).` };
      }
    }
    const n = rand(100, 99999), k = pick([3, 9]), s = sommeChiffres(n), oui = n % k === 0;
    const OPTS = [`Oui, car la somme de ses chiffres est divisible par $${k}$`, `Non, car la somme de ses chiffres n'est pas divisible par $${k}$`, `Oui, car il se termine par un chiffre impair`, `Non, car il ne se termine pas par $${k}$`];
    const { choix, attendu } = melange(oui ? OPTS[0] : OPTS[1], [oui ? OPTS[1] : OPTS[0], OPTS[2], OPTS[3]]);
    return { enonce: `Le nombre $${nb(n)}$ est-il divisible par $${k}$ ?`, mode: "choix", choix, attendu,
      aides: [`Critère : un nombre est divisible par $${k}$ si la somme de ses chiffres est divisible par $${k}$.`, "Le chiffre des unités ne sert à rien pour $3$ et $9$.", `Somme des chiffres : $${String(n).split("").join(" + ")}$.`],
      solution: `$${String(n).split("").join(" + ")} = ${s}$, ${oui ? "divisible" : "pas divisible"} par $${k}$ : $${nb(n)}$ ${oui ? "est" : "n'est pas"} divisible par $${k}$.` };
  };

  GEN["dv5-diviseurs"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const n = pick([12, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 50, 54, 56, 60, 63, 64, 72, 75, 80, 84, 90, 96, 100]), D = diviseurs(n);
      return { enonce: `Combien le nombre $${n}$ a-t-il de diviseurs (en comptant $1$ et $${n}$) ?`, mode: "nombre", prefixe: "Nombre de diviseurs :", attendu: D.length,
        erreurs: [{ valeur: D.length - 2, message: `On compte aussi $1$ et $${n}$, qui sont des diviseurs de $${n}$.` }],
        aides: [`Cherche les produits égaux à $${n}$ : $1 \\times ${n}$, $2 \\times \\ldots$`, "Les diviseurs vont par paires : quand on en trouve un, on en trouve un autre.", "Arrête-toi quand les deux facteurs se croisent."],
        solution: `Les diviseurs de $${n}$ sont : $${D.join(" \\; ; \\; ")}$. Il y en a $${D.length}$.` };
    }
    if (t === 1) {
      const [p, q] = pick([[3, 7], [7, 13], [3, 17], [7, 11], [11, 13], [3, 19], [7, 17], [13, 17], [3, 23], [7, 19], [11, 17], [3, 29], [13, 19], [17, 19], [7, 23]]), n = p * q;
      return { enonce: `Le nombre $${n}$ s'écrit comme le produit de deux nombres entiers différents de $1$. Complète : $${n} = ${p} \\times \\ldots$`, mode: "nombre", prefixe: "Nombre manquant :", attendu: q,
        aides: [`Cherche le quotient de $${n}$ par $${p}$.`, "Tu peux poser la division.", `$${p} \\times 10 = ${p * 10}$.`], solution: `$${n} \\div ${p} = ${q}$, donc $${n} = ${p} \\times ${q}$.` };
    }
    const n = pick([24, 30, 36, 40, 42, 48, 54, 60, 72, 84, 90]), D = diviseurs(n), nonD = []; for (let k = 2; k < n && nonD.length < 6; k++) if (n % k && k > 3) nonD.push(k);
    const bon = pick(nonD), vrais = shuffle(D.filter((d) => d > 1 && d < n).slice()).slice(0, 3);
    const { choix, attendu } = melange(`$${bon}$`, vrais.map((d) => `$${d}$`));
    return { enonce: `Lequel de ces nombres n'est **pas** un diviseur de $${n}$ ?`, mode: "choix", choix, attendu,
      aides: ["$a$ est un diviseur de $n$ si la division de $n$ par $a$ tombe juste (reste $0$).", "Teste chaque nombre avec une division ou un critère.", `Les diviseurs de $${n}$ vont par paires : $1 \\times ${n}$, $2 \\times ${n / 2}$…`],
      solution: `$${n} \\div ${bon}$ ne tombe pas juste (reste $${n % bon}$) : $${bon}$ n'est pas un diviseur de $${n}$. Les autres le sont : ${vrais.map((d) => `$${n} = ${d} \\times ${n / d}$`).join(", ")}.` };
  };

  GEN["dv5-problemes"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const [a, b] = pick([[4, 6], [6, 8], [6, 9], [8, 12], [10, 15], [12, 18], [9, 12], [6, 10], [15, 20], [12, 20], [10, 25], [14, 21]]), m = (a * b) / pgcd(a, b);
      return { enonce: `À la gare maritime, une barge part toutes les $${a}$ minutes et un amphidrome toutes les $${b}$ minutes. Ils partent ensemble à $7$ h. Au bout de combien de minutes repartiront-ils ensemble pour la première fois ?`, mode: "nombre", prefixe: "Durée :", suffixe: "min", attendu: m,
        erreurs: m !== a * b ? [{ valeur: a * b, message: `C'est bien un multiple commun, mais pas le plus petit.` }] : [],
        aides: [`Écris les multiples de $${a}$ : $${a}$ ; $${2 * a}$ ; $${3 * a}$ ; …`, `Écris les multiples de $${b}$ : $${b}$ ; $${2 * b}$ ; …`, "Cherche le plus petit nombre présent dans les deux listes."],
        solution: `Multiples de $${a}$ : $${Array.from({ length: m / a }, (_, i) => a * (i + 1)).join(" ; ")}$. Multiples de $${b}$ : $${Array.from({ length: m / b }, (_, i) => b * (i + 1)).join(" ; ")}$. Le premier multiple commun est $${m}$ : ils repartiront ensemble au bout de $${m}$ minutes.` };
    }
    if (t === 1) {
      const n = pick([12, 18, 20, 24, 28, 30, 36, 40, 42, 48]), D = diviseurs(n).filter((d) => d > 1 && d < n);
      return { enonce: `Le professeur veut placer les $${n}$ élèves de la classe en rangées qui ont toutes le même nombre d'élèves, avec au moins $2$ rangées et au moins $2$ élèves par rangée. Combien de dispositions différentes sont possibles ?`, mode: "nombre", prefixe: "Dispositions :", attendu: D.length,
        erreurs: [{ valeur: D.length + 2, message: "Une seule rangée, ou un élève par rangée : c'est interdit par l'énoncé." }],
        aides: [`Le nombre d'élèves par rangée doit être un diviseur de $${n}$.`, `Liste les diviseurs de $${n}$.`, `Retire $1$ et $${n}$.`],
        solution: `Il faut un diviseur de $${n}$ autre que $1$ et $${n}$ : $${D.join(" \\; ; \\; ")}$. Il y a $${D.length}$ dispositions (par exemple $${D[0]}$ rangées de $${n / D[0]}$ élèves).` };
    }
    const k = pick([3, 4, 6, 7, 9, 12, 15]), lim = rand(50, 150), nbm = Math.floor(lim / k);
    return { enonce: `Combien y a-t-il de multiples de $${k}$ compris entre $1$ et $${lim}$ ?`, mode: "nombre", prefixe: "Nombre :", attendu: nbm,
      aides: [`Les multiples de $${k}$ sont $${k} \\times 1$, $${k} \\times 2$, $${k} \\times 3$, …`, `Cherche le plus grand multiple de $${k}$ qui ne dépasse pas $${lim}$.`, `$${k} \\times ${nbm} = ${k * nbm}$.`],
      solution: `$${k} \\times ${nbm} = ${k * nbm} \\leq ${lim}$ et $${k} \\times ${nbm + 1} = ${k * (nbm + 1)} > ${lim}$ : il y a $${nbm}$ multiples de $${k}$.` };
  };

  /* =====================================================================
     Chapitre 7 : symétries (sc5-) — symétrie centrale, centre de symétrie
     ===================================================================== */
  // Quadrillage 12 × 8 ; points [nom, [x, y], classe], polygones { pts, classe, num }
  function grilleC(o) {
    const u = 24, W = 12 * u + 16, H = 8 * u + 16, X = (x) => 8 + x * u, Y = (y) => 8 + (8 - y) * u;
    let s = `<svg class="graph grille-sym" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria}"><g class="g-grid">`;
    for (let i = 0; i <= 12; i++) s += `<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(8)}"/>`;
    for (let j = 0; j <= 8; j++) s += `<line x1="${X(0)}" y1="${Y(j)}" x2="${X(12)}" y2="${Y(j)}"/>`;
    s += `</g>`;
    (o.polys || []).forEach((p) => {
      s += `<polygon class="${p.classe || "g-poly"}" points="${p.pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")}"/>`;
      if (p.num) { const g = p.pts.reduce((a, [x, y]) => [a[0] + x / p.pts.length, a[1] + y / p.pts.length], [0, 0]); s += `<text class="g-num-angle" x="${X(g[0])}" y="${Y(g[1]) + 5}" text-anchor="middle">${p.num}</text>`; }
    });
    if (o.axe) { const [[x1, y1], [x2, y2]] = o.axe; s += `<line class="g-axe" x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}"/>`; }
    (o.points || []).forEach(([n, [x, y], cl]) => { s += `<circle class="${cl || "g-point"}" cx="${X(x)}" cy="${Y(y)}" r="3.5"/><text class="g-plabel" x="${X(x) + 6}" y="${Y(y) - 6}">${n}</text>`; });
    if (o.centre) { const [x, y] = o.centre; s += `<path class="g-code" d="M${X(x) - 5} ${Y(y) - 5}L${X(x) + 5} ${Y(y) + 5}M${X(x) - 5} ${Y(y) + 5}L${X(x) + 5} ${Y(y) - 5}"/><text class="g-plabel" x="${X(x) + 6}" y="${Y(y) + 15}">O</text>`; }
    return s + `</svg>`;
  }
  const dansG8 = ([x, y]) => x >= 0 && x <= 12 && y >= 0 && y <= 8;
  const sym = (O) => ([x, y]) => [2 * O[0] - x, 2 * O[1] - y];
  FIGURES["sc5-point"] = () => grilleC({ centre: [6, 4], points: [["A", [3, 6]], ["A'", [9, 2]]], aria: "Quadrillage : A et son symétrique A' par rapport au point O, milieu de [AA']" });
  FIGURES["sc5-figure"] = () => grilleC({ centre: [6, 4], polys: [{ pts: [[2, 5], [5, 5], [5, 7]] }, { pts: [[10, 3], [7, 3], [7, 1]], classe: "g-poly g-poly-image" }], aria: "Quadrillage : un triangle et son image par la symétrie de centre O, retournée d'un demi-tour" });

  GEN["sc5-point"] = function () {
    for (let e = 0; e < 2000; e++) {
      const O = [rand(4, 8), rand(3, 5)], A = [rand(1, 11), rand(1, 7)];
      if (A[0] === O[0] || A[1] === O[1] || Math.abs(A[0] - O[0]) + Math.abs(A[1] - O[1]) < 4) continue;
      const img = sym(O)(A), cand = [img, [2 * O[0] - A[0], A[1]], [A[0], 2 * O[1] - A[1]], [img[0] + pick([-2, 2]), img[1] + pick([-1, 1])], [O[0] + (O[0] - A[0]) * 2, O[1] + (O[1] - A[1]) * 2]].filter(([x, y]) => x >= 0 && x <= 11 && y >= 0 && y <= 7);
      const uniq = []; cand.forEach((p) => { if (!uniq.some((q) => q[0] === p[0] && q[1] === p[1]) && !(p[0] === A[0] && p[1] === A[1])) uniq.push(p); });
      if (uniq.length < 4 || uniq[0] !== cand[0]) continue;
      const loin = uniq.slice(0, 4); if (loin.some((p, i) => Math.abs(p[0] - O[0]) + Math.abs(p[1] - O[1]) < 2 || loin.some((q, j) => j !== i && Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) < 2))) continue;
      const pts = shuffle(uniq.slice(0, 4).map((p, i) => ({ p, ok: i === 0 }))), noms = ["B", "C", "D", "E"];
      const bonne = noms[pts.findIndex((x) => x.ok)];
      return { enonce: "Quel point est le symétrique de $A$ par rapport au point $O$ ?", figure: grilleC({ centre: O, points: [["A", A], ...pts.map((x, i) => [noms[i], x.p])], aria: `Quadrillage avec le point O, le point A et quatre points B, C, D, E` }), mode: "choix", choix: noms.map((n) => `$${n}$`), attendu: noms.indexOf(bonne),
        aides: ["Le symétrique de $A$ par rapport à $O$ est le point $A'$ tel que $O$ soit le **milieu** de $[AA']$.", "Compte les carreaux pour aller de $A$ à $O$ (horizontalement et verticalement).", "Recommence le même déplacement à partir de $O$."],
        solution: `De $A$ à $O$ : $${O[0] - A[0] > 0 ? "+" : ""}${O[0] - A[0]}$ carreaux horizontalement et $${O[1] - A[1] > 0 ? "+" : ""}${O[1] - A[1]}$ verticalement. On refait le même déplacement depuis $O$ : on arrive en $${bonne}$, et $O$ est bien le milieu de $[A${bonne}]$.` };
    }
  };

  const FORMES5 = [
    [[0, 0], [3, 0], [3, 2]], [[0, 0], [2, 0], [2, 1], [1, 3]], [[0, 0], [3, 0], [1, 2]], [[0, 0], [1, 0], [1, 2], [3, 2], [3, 3], [0, 3]], [[0, 0], [2, 0], [3, 2], [0, 1]]
  ];
  GEN["sc5-figure"] = function () {
    for (let e = 0; e < 3000; e++) {
      const F = pick(FORMES5), O = [rand(5, 7), 4], d = [rand(0, 3), rand(0, 5)], A = F.map(([x, y]) => [x + d[0], y + d[1]]);
      const v = [rand(5, 8), rand(-3, 3)], c = sym(O);
      const imgs = [A.map(c), A.map(([x, y]) => [2 * O[0] - x, y]), A.map(([x, y]) => [x, 2 * O[1] - y]), A.map(([x, y]) => [x + v[0], y + v[1]])];
      if (![A, ...imgs].every((P) => P.every(dansG8))) continue;
      const bb = (P) => [Math.min(...P.map((p) => p[0])), Math.max(...P.map((p) => p[0])), Math.min(...P.map((p) => p[1])), Math.max(...P.map((p) => p[1]))], B = [A, ...imgs].map(bb);
      if (B.some((b, i) => B.some((c, j) => j > i && b[0] <= c[1] && c[0] <= b[1] && b[2] <= c[3] && c[2] <= b[3]))) continue;
      if (B.some((b) => b[0] <= O[0] && O[0] <= b[1] && b[2] <= O[1] && O[1] <= b[3])) continue;
      const ordre = shuffle([0, 1, 2, 3]), polys = ordre.map((k, i) => ({ pts: imgs[k], classe: "g-poly g-poly-image", num: String(i + 1) }));
      const bonne = ordre.indexOf(0) + 1;
      return { enonce: "La figure de départ est celle sans numéro. Quelle figure numérotée est son image par la symétrie de centre $O$ ?", figure: grilleC({ centre: O, polys: [{ pts: A }, ...polys], aria: "Quadrillage : une figure, le centre O et quatre figures numérotées de 1 à 4" }), mode: "choix", choix: ["$1$", "$2$", "$3$", "$4$"], attendu: bonne - 1,
        aides: ["La symétrie centrale fait faire un **demi-tour** à la figure autour de $O$.", "Prends un sommet de la figure et construis son symétrique : $O$ doit être le milieu du segment.", "Vérifie avec un deuxième sommet. Attention : une figure seulement retournée « en miroir » est une symétrie axiale."],
        solution: `La figure $${bonne}$ est obtenue par un demi-tour autour de $O$ : chaque sommet a son image de l'autre côté de $O$, à la même distance. Les autres figures sont obtenues par des symétries axiales ou par un glissement.` };
    }
  };

  GEN["sc5-proprietes"] = function () {
    const t = rand(0, 4), x = Dc(rand(15, 95), 1), X1 = tD(x);
    if (t === 0) return { enonce: `$A'$ est le symétrique de $A$ par rapport au point $O$, et $OA = ${X1}$ cm. Combien mesure $AA'$ ?`, mode: "nombre", prefixe: "$AA' =$", suffixe: "cm", attendu: (x.m * 2) / 10,
      erreurs: [{ valeur: x.m / 10, message: "$O$ est le milieu de $[AA']$ : $AA'$ est deux fois plus long que $OA$." }],
      aides: ["Par la symétrie de centre $O$, $O$ est le milieu de $[AA']$.", "Donc $OA' = OA$.", "$AA' = OA + OA'$."], solution: `$O$ est le milieu de $[AA']$ : $AA' = 2 \\times ${X1} = ${tD(mulD(x, Dc(2)))}$ cm.` };
    if (t === 1) return { enonce: `Par la symétrie de centre $O$, le segment $[MN]$ a pour image $[M'N']$. On sait que $MN = ${X1}$ cm. Combien mesure $M'N'$ ?`, mode: "nombre", prefixe: "$M'N' =$", suffixe: "cm", attendu: x.m / 10,
      aides: ["La symétrie centrale conserve les longueurs.", "Le segment image a la même longueur que le segment de départ.", "Aucun calcul n'est nécessaire."], solution: `La symétrie centrale conserve les longueurs : $M'N' = MN = ${X1}$ cm.` };
    if (t === 2) { const a = rand(15, 165); return { enonce: `Par la symétrie de centre $O$, le triangle $ABC$ a pour image $A'B'C'$, et $\\widehat{ABC} = ${a}^\\circ$. Combien mesure $\\widehat{A'B'C'}$ ?`, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: a,
      erreurs: [{ valeur: 180 - a, message: "Le demi-tour ne change pas les angles : la mesure est conservée." }],
      aides: ["La symétrie centrale conserve les angles.", "L'image d'un angle est un angle de même mesure.", "Aucun calcul n'est nécessaire."], solution: `La symétrie centrale conserve les angles : $\\widehat{A'B'C'} = \\widehat{ABC} = ${a}^\\circ$.` }; }
    if (t === 3) { const a = rand(6, 60), b = rand(4, 30), aire = a * b; return { enonce: `Un rectangle de $${a}$ cm sur $${b}$ cm a pour image, par une symétrie centrale, un autre rectangle. Quelle est l'aire de ce rectangle image ?`, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: aire,
      aides: ["La symétrie centrale conserve les longueurs, donc aussi les aires.", "Le rectangle image a les mêmes dimensions.", `Aire $= ${a} \\times ${b}$.`], solution: `Les dimensions sont conservées : l'aire de l'image est $${a} \\times ${b} = ${aire}$ cm², comme celle du rectangle de départ.` }; }
    const q = pick([
      ["Par une symétrie centrale, l'image d'une droite $(d)$ est une droite :", "parallèle à $(d)$", ["perpendiculaire à $(d)$", "qui coupe $(d)$ en $O$", "toujours confondue avec $(d)$"], "L'image d'une droite par une symétrie centrale est une droite parallèle (confondue avec elle si elle passe par $O$)."],
      ["Par une symétrie centrale, trois points alignés ont pour images trois points :", "alignés", ["qui forment un triangle", "confondus", "sur un cercle de centre $O$"], "La symétrie centrale conserve l'alignement."],
      ["Le symétrique du point $O$ par la symétrie de centre $O$ est :", "le point $O$ lui-même", ["un point à $1$ cm de $O$", "il n'existe pas", "le milieu d'un segment"], "Le centre est le seul point qui ne bouge pas : il est son propre symétrique."],
      ["$A'$ est le symétrique de $A$ par rapport à $O$. Alors :", "$O$ est le milieu de $[AA']$", ["$O$ est sur la médiatrice de $[AA']$ seulement", "$(AA')$ est perpendiculaire à une droite passant par $O$", "$OA' = 2 \\times OA$"], "C'est la définition : $O$ est le milieu du segment qui joint un point et son image."],
      ["Une symétrie centrale correspond à :", "un demi-tour autour du centre", ["un pliage le long d'une droite", "un quart de tour autour du centre", "un glissement"], "La symétrie centrale fait tourner la figure de $180^\\circ$ autour de $O$."]
    ]);
    const { choix, attendu } = melange(q[1], q[2]);
    return { enonce: q[0], mode: "choix", choix, attendu, aides: ["La symétrie centrale est un demi-tour autour du centre $O$.", "Elle conserve les longueurs, les angles, les aires et l'alignement.", "L'image d'une droite est une droite parallèle."], solution: `Réponse : ${q[1]}. ${q[3]}` };
  };

  GEN["sc5-centre"] = function () {
    const t = rand(0, 2);
    const AVEC = ["un carré", "un rectangle", "un losange", "un parallélogramme", "un cercle", "un segment", "un hexagone régulier"], SANS = ["un triangle équilatéral", "un triangle isocèle", "un trapèze isocèle", "un demi-cercle", "un triangle rectangle", "un pentagone régulier", "un cerf-volant"];
    const LAVEC = ["N", "S", "Z", "H", "O", "X", "I"], LSANS = ["A", "M", "T", "E", "V", "W", "Y", "U", "C", "K", "L", "F"];
    if (t === 0) {
      const ok = pick(AVEC), { choix, attendu } = melange(ok, shuffle(SANS.slice()).slice(0, 3));
      return { enonce: "Laquelle de ces figures possède un centre de symétrie ?", mode: "choix", choix, attendu,
        aides: ["Un point $O$ est un centre de symétrie d'une figure si, après un demi-tour autour de $O$, la figure se superpose à elle-même.", "Imagine la figure tournée « la tête en bas ».", "Les triangles n'ont jamais de centre de symétrie."], solution: `${ok[0].toUpperCase() + ok.slice(1)} possède un centre de symétrie : un demi-tour autour de ce point la laisse inchangée. Les autres figures, retournées, ne se superposent pas à elles-mêmes.` };
    }
    if (t === 1) {
      const ok = pick(LAVEC), { choix, attendu } = melange(`la lettre ${ok}`, shuffle(LSANS.slice()).slice(0, 3).map((l) => `la lettre ${l}`));
      return { enonce: "Écrites en majuscules d'imprimerie simples, laquelle de ces lettres possède un centre de symétrie ?", mode: "choix", choix, attendu,
        aides: ["Fais tourner la lettre d'un demi-tour (la tête en bas) : est-elle inchangée ?", "Attention : avoir un axe de symétrie ne suffit pas.", "Le A, le M, le T ont un axe mais pas de centre."], solution: `La lettre ${ok} retournée d'un demi-tour reste la même : elle a un centre de symétrie.` };
    }
    const q = pick([["un parallélogramme quelconque", "un centre de symétrie mais aucun axe"], ["un rectangle (non carré)", "un centre de symétrie et deux axes"], ["un losange (non carré)", "un centre de symétrie et deux axes"], ["un carré", "un centre de symétrie et quatre axes"], ["un triangle isocèle (non équilatéral)", "un axe de symétrie et aucun centre"], ["un triangle équilatéral", "trois axes de symétrie et aucun centre"], ["la lettre N", "un centre de symétrie mais aucun axe"], ["la lettre H", "un centre de symétrie et deux axes"]]);
    const autres = ["un centre de symétrie mais aucun axe", "un centre de symétrie et deux axes", "un axe de symétrie et aucun centre", "un centre de symétrie et quatre axes", "trois axes de symétrie et aucun centre"].filter((x) => x !== q[1]);
    const { choix, attendu } = melange(q[1], shuffle(autres).slice(0, 3));
    return { enonce: `Que possède ${q[0]} ?`, mode: "choix", choix, attendu,
      aides: ["Axe de symétrie : on plie la figure, les deux moitiés se superposent.", "Centre de symétrie : on fait un demi-tour, la figure se superpose à elle-même.", "Une figure peut avoir l'un, l'autre, les deux ou aucun."], solution: `${q[0][0].toUpperCase() + q[0].slice(1)} possède ${q[1]}.` };
  };

  /* =====================================================================
     Chapitre 8 : nombres relatifs et repérage (nr5-)
     ===================================================================== */
  const rel = (x) => (x < 0 ? `-${nb(-x)}` : nb(x)); // écriture KaTeX d'un relatif
  const relP = (x) => (x < 0 ? `(${rel(x)})` : rel(x));
  // Droite graduée : de a à a + n*pas, points [nom, valeur]
  function droiteRel(a, pas, n, points, aria) {
    const W = 320, x0 = 18, L = W - 36, X = (v) => x0 + ((v - a) / (pas * n)) * L, y = 52;
    let s = `<svg class="graph" viewBox="0 0 ${W} 86" role="img" aria-label="${aria}"><line class="g-segment" x1="${x0 - 8}" y1="${y}" x2="${W - 8}" y2="${y}"/><path class="g-end" d="M${W - 4} ${y}l-9 -4.5v9z"/>`;
    for (let i = 0; i <= n; i++) { const v = +(a + i * pas).toFixed(6), lab = Math.abs(v) < 1e-9 || i === 0 || i === n || (Number.isInteger(v) && n <= 12) || (Number.isInteger(v) && v % 5 === 0) || (pas < 1 && Math.abs(v / (pas * 5) - Math.round(v / (pas * 5))) < 1e-9);
      s += `<line class="g-graduation" x1="${X(v)}" y1="${y - (lab ? 7 : 4)}" x2="${X(v)}" y2="${y + (lab ? 7 : 4)}"/>`;
      if (lab) s += `<text class="g-tick" x="${X(v)}" y="${y + 22}" text-anchor="middle">${String(v).replace(".", ",").replace("-", "−")}</text>`; }
    points.forEach(([nm, v]) => { s += `<circle class="g-point" cx="${X(v)}" cy="${y}" r="4"/><text class="g-plabel" x="${X(v)}" y="${y - 14}" text-anchor="middle">${nm}</text>`; });
    return s + `</svg>`;
  }
  // Repère orthogonal de -5 à 5 en abscisse, de -3 à 3 en ordonnée
  function repere(points, aria) {
    const u = 28, W = 320, H = 6 * u + 40, ox = 160, oy = H / 2, X = (x) => ox + x * u, Y = (y) => oy - y * u;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${aria}"><g class="g-grid">`;
    for (let i = -5; i <= 5; i++) s += `<line x1="${X(i)}" y1="${Y(-3.4)}" x2="${X(i)}" y2="${Y(3.4)}"/>`;
    for (let j = -3; j <= 3; j++) s += `<line x1="${X(-5.4)}" y1="${Y(j)}" x2="${X(5.4)}" y2="${Y(j)}"/>`;
    s += `</g><g class="g-axis"><line x1="${X(-5.5)}" y1="${oy}" x2="${X(5.5)}" y2="${oy}"/><line x1="${ox}" y1="${Y(-3.5)}" x2="${ox}" y2="${Y(3.5)}"/></g>`;
    s += `<text class="g-tick" x="${ox - 9}" y="${oy + 13}">0</text><text class="g-tick" x="${X(1) - 3}" y="${oy + 13}">1</text><text class="g-tick" x="${ox - 10}" y="${Y(1) + 4}">1</text>`;
    points.forEach(([n, [x, y]]) => { s += `<circle class="g-point" cx="${X(x)}" cy="${Y(y)}" r="4"/><text class="g-plabel" x="${X(x) + 6}" y="${Y(y) - 6}">${n}</text>`; });
    return s + `</svg>`;
  }
  const coord = ([x, y]) => `$(${rel(x)} \\, ; \\, ${rel(y)})$`;
  FIGURES["nr5-droite"] = () => droiteRel(-5, 1, 10, [["A", -3], ["B", 2], ["C", -1]], "Droite graduée de −5 à 5 : A d'abscisse −3, B d'abscisse 2, C d'abscisse −1");
  FIGURES["nr5-repere"] = () => repere([["A", [3, 2]], ["B", [-4, 1]], ["C", [-2, -3]], ["D", [2, -1]]], "Repère : A(3 ; 2), B(−4 ; 1), C(−2 ; −3), D(2 ; −1)");

  GEN["nr5-vocab"] = function () {
    const t = rand(0, 3), x = pick([rand(1, 99), rand(11, 99) / 10]) * (Math.random() < 0.5 ? -1 : 1);
    if (t === 0) return { enonce: `Quel est l'opposé de $${rel(x)}$ ?`, mode: "nombre", prefixe: "Opposé :", attendu: -x,
      erreurs: [{ valeur: x, message: "L'opposé a le même nombre sans signe, mais le signe contraire." }],
      aides: ["Deux nombres opposés sont à la même distance de zéro, de part et d'autre.", "On change seulement le signe.", x < 0 ? "L'opposé d'un nombre négatif est positif." : "L'opposé d'un nombre positif est négatif."], solution: `L'opposé de $${rel(x)}$ est $${rel(-x)}$ : ils sont à la même distance de $0$.` };
    if (t === 1) return { enonce: `Quelle est la distance à zéro (la valeur absolue) de $${rel(x)}$ ?`, mode: "nombre", prefixe: "Distance à zéro :", attendu: Math.abs(x),
      erreurs: x < 0 ? [{ valeur: x, message: "Une distance est toujours positive." }] : [],
      aides: ["La distance à zéro d'un nombre, c'est le nombre sans son signe.", "Sur une droite graduée, c'est l'écart entre le point et l'origine.", "Une distance n'est jamais négative."], solution: `La distance à zéro de $${rel(x)}$ est $${nb(Math.abs(x))}$.` };
    if (t === 2) {
      const sorte = pick([["strictement négatif", (v) => v < 0], ["strictement positif", (v) => v > 0], ["positif", (v) => v >= 0], ["négatif", (v) => v <= 0]]);
      let bons, faux; for (;;) { const L = shuffle([0, rand(1, 9), -rand(1, 9), rand(11, 99) / 10, -rand(11, 99) / 10, rand(10, 50), -rand(10, 50)]); bons = L.filter(sorte[1]); faux = L.filter((v) => !sorte[1](v)); if (bons.length >= 1 && faux.length >= 3) break; }
      const bon = bons.includes(0) && (sorte[0] === "positif" || sorte[0] === "négatif") && Math.random() < 0.6 ? 0 : bons[0];
      const { choix, attendu } = melange(`$${rel(bon)}$`, faux.slice(0, 3).map((v) => `$${rel(v)}$`));
      return { enonce: `Lequel de ces nombres est ${sorte[0]} ?`, mode: "choix", choix, attendu,
        aides: ["Un nombre négatif s'écrit avec le signe $-$ ; un nombre positif, sans signe (ou avec $+$).", "$0$ est à la fois positif et négatif ; il n'est ni strictement positif ni strictement négatif.", "« Strictement » exclut $0$."], solution: `$${rel(bon)}$ est ${sorte[0]}.${bon === 0 ? " En effet, $0$ est à la fois positif et négatif." : ""}` };
    }
    const c = pick([
      [`Le Mont Bénara culmine à $660$ m d'altitude et une plongeuse descend à $25$ m sous le niveau de la mer. Quel nombre relatif donne l'altitude de la plongeuse, en mètres ?`, -25, "Sous le niveau de la mer, l'altitude est négative."],
      [`À Mamoudzou il fait $28$ °C. Dans un congélateur, il fait $18$ °C en dessous de zéro. Quel nombre relatif donne la température du congélateur, en °C ?`, -18, "En dessous de zéro, la température est négative."],
      [`Un compte bancaire a un solde de $40$ €. On paie $65$ € par carte. Quel nombre relatif donne le nouveau solde, en euros ?`, -25, "Quand on dépense plus que ce qu'on a, le solde devient négatif."],
      [`Un ascenseur part du rez-de-chaussée (étage $0$) et descend de $3$ étages au parking. À quel étage relatif arrive-t-il ?`, -3, "En dessous du rez-de-chaussée, les étages sont négatifs."]
    ]);
    return { enonce: c[0], mode: "nombre", prefixe: "Nombre :", attendu: c[1], erreurs: [{ valeur: -c[1], message: c[2] }],
      aides: ["Choisis une origine (le zéro) : niveau de la mer, $0$ °C, début de notre ère, rez-de-chaussée.", "Au-dessus de l'origine : positif. En dessous : négatif.", c[2]], solution: `${c[2]} La réponse est $${rel(c[1])}$.` };
  };

  GEN["nr5-abscisse"] = function () {
    const conf = pick([[1, 1, 10], [1, 1, 12], [0.5, 2, 10], [0.1, 10, 10], [2, 1, 10], [5, 1, 10], [0.2, 5, 10], [0.25, 4, 8]]), [pas, , n] = conf;
    const a = +(-pas * rand(2, n - 2)).toFixed(6);
    const k = rand(0, n), v = +(a + k * pas).toFixed(6);
    if (Math.abs(v) < 1e-9 || k === 0 || k === n) return GEN["nr5-abscisse"]();
    const lire = Math.random() < 0.6;
    if (lire) return { enonce: "Quelle est l'abscisse du point $M$ ?", figure: droiteRel(a, pas, n, [["M", v]], `Droite graduée de ${a} avec un pas de ${pas} ; le point M`), mode: "nombre", prefixe: "Abscisse :", attendu: v,
      erreurs: [{ valeur: -v, message: "Attention au signe : à gauche de zéro, les abscisses sont négatives." }],
      aides: ["Repère l'origine (le $0$) et le sens : les nombres augmentent vers la droite.", `Chaque graduation vaut $${nb(pas)}$.`, `Compte les graduations entre $0$ et $M$.`], solution: `$M$ est à $${Math.round(Math.abs(v) / pas)}$ graduations ${v < 0 ? "à gauche" : "à droite"} de $0$, chacune valant $${nb(pas)}$ : son abscisse est $${rel(v)}$.` };
    const noms = ["A", "B", "C", "D"], vals = new Set([v]); while (vals.size < 4) { const kk = rand(1, n - 1), w = +(a + kk * pas).toFixed(6); vals.add(w); }
    const V = shuffle([...vals]), bon = noms[V.indexOf(v)];
    return { enonce: `Quel point a pour abscisse $${rel(v)}$ ?`, figure: droiteRel(a, pas, n, V.map((w, i) => [noms[i], w]), "Droite graduée avec quatre points A, B, C, D"), mode: "choix", choix: noms.map((m) => `$${m}$`), attendu: noms.indexOf(bon),
      aides: ["Repère le $0$ sur la droite.", `Chaque graduation vaut $${nb(pas)}$.`, v < 0 ? "Un nombre négatif est à gauche de $0$." : "Un nombre positif est à droite de $0$."], solution: `$${rel(v)}$ est à $${Math.round(Math.abs(v) / pas)}$ graduations ${v < 0 ? "à gauche" : "à droite"} de $0$ : c'est le point $${bon}$.` };
  };

  GEN["nr5-comparer"] = function () {
    const t = rand(0, 3);
    if (t <= 2) {
      const g = () => (Math.random() < 0.5 ? rand(1, 30) : rand(1, 99) / 10) * (Math.random() < 0.65 ? -1 : 1);
      let a = g(), b = g(); if (t === 1) b = -a; if (t === 2) b = +(a + pick([-1, 1]) * pick([0.1, 1, 0.5])).toFixed(1);
      if (a === b) return GEN["nr5-comparer"]();
      const rep = a < b ? 0 : 1;
      return { enonce: `Compare : $${rel(a)} \\; \\ldots \\; ${rel(b)}$`, mode: "choix", choix: ["$<$", "$>$", "$=$"], attendu: rep,
        aides: ["Un nombre négatif est toujours plus petit qu'un nombre positif.", "Deux nombres négatifs : le plus petit est celui qui a la plus grande distance à zéro.", "Imagine les deux nombres sur une droite graduée : le plus petit est à gauche."],
        solution: a < 0 && b < 0 ? `Les deux nombres sont négatifs ; $${rel(a < b ? a : b)}$ est plus loin de zéro, donc plus petit : $${rel(a)} ${rep ? ">" : "<"} ${rel(b)}$.` : `$${rel(a)} ${rep ? ">" : "<"} ${rel(b)}$ : ${(a < 0) !== (b < 0) ? "un nombre négatif est plus petit qu'un nombre positif" : "sur une droite graduée, le plus petit est à gauche"}.` };
    }
    const L = []; while (L.length < 4) { const v = (Math.random() < 0.5 ? rand(1, 20) : rand(1, 99) / 10) * (Math.random() < 0.6 ? -1 : 1); if (!L.includes(v)) L.push(v); }
    const tri = L.slice().sort((p, q) => p - q), txt = (A) => "$" + A.map(rel).join(" < ") + "$";
    const fausses = [txt(L.slice().sort((p, q) => Math.abs(p) - Math.abs(q))), txt(tri.slice().reverse()), txt([tri[1], tri[0], tri[2], tri[3]]), txt([tri[0], tri[1], tri[3], tri[2]])].filter((x) => x !== txt(tri));
    const { choix, attendu } = melange(txt(tri), fausses);
    return { enonce: `Range dans l'ordre croissant : $${L.map(rel).join(" \\; ; \\; ")}$`, mode: "choix", choix, attendu,
      aides: ["Ordre croissant : du plus petit au plus grand.", "Commence par les négatifs : le plus éloigné de zéro est le plus petit.", "Puis les positifs, du plus petit au plus grand."], solution: `Dans l'ordre croissant : ${txt(tri)}.` };
  };

  GEN["nr5-repere"] = function () {
    const t = rand(0, 1), P = []; while (P.length < 4) { const p = [rand(-5, 5), rand(-3, 3)]; if (p[0] !== 0 && p[1] !== 0 && !P.some((q) => q[0] === p[0] && q[1] === p[1]) && !P.some((q) => q[0] === p[1] && q[1] === p[0])) P.push(p); }
    const noms = ["A", "B", "C", "D"], i = rand(0, 3), p = P[i];
    if (t === 0) {
      const { choix, attendu } = melange(coord(p), [coord([p[1], p[0]]), coord([-p[0], p[1]]), coord([p[0], -p[1]]), coord([-p[0], -p[1]])].filter((c) => c !== coord(p)));
      return { enonce: `Quelles sont les coordonnées du point $${noms[i]}$ ?`, figure: repere(P.map((q, k) => [noms[k], q]), "Repère avec quatre points A, B, C, D"), mode: "choix", choix, attendu,
        aides: ["Les coordonnées s'écrivent (abscisse ; ordonnée).", "L'abscisse se lit sur l'axe horizontal, l'ordonnée sur l'axe vertical.", "À gauche de l'axe vertical, l'abscisse est négative ; en dessous de l'axe horizontal, l'ordonnée est négative."],
        solution: `$${noms[i]}$ est à $${Math.abs(p[0])}$ ${p[0] < 0 ? "à gauche" : "à droite"} de l'origine et $${Math.abs(p[1])}$ ${p[1] < 0 ? "en dessous" : "au-dessus"} : ses coordonnées sont ${coord(p)}.` };
    }
    return { enonce: `Quel point a pour coordonnées ${coord(p)} ?`, figure: repere(P.map((q, k) => [noms[k], q]), "Repère avec quatre points A, B, C, D"), mode: "choix", choix: noms.map((m) => `$${m}$`), attendu: i,
      aides: ["Le premier nombre est l'abscisse (horizontal), le second l'ordonnée (vertical).", `Pars de l'origine et déplace-toi de $${Math.abs(p[0])}$ ${p[0] < 0 ? "vers la gauche" : "vers la droite"}.`, `Puis de $${Math.abs(p[1])}$ ${p[1] < 0 ? "vers le bas" : "vers le haut"}.`],
      solution: `Abscisse $${rel(p[0])}$, ordonnée $${rel(p[1])}$ : c'est le point $${noms[i]}$.` };
  };

  /* =====================================================================
     Chapitre 9 : additionner et soustraire des relatifs (cr5-)
     ===================================================================== */
  const r1 = (x) => Math.round(x * 100) / 100;
  const sgn = (x) => (x < 0 ? `(${rel(x)})` : Math.random() < 0.5 ? `(+${nb(x)})` : nb(x));
  const tireRel = (dec) => (dec ? rand(1, 99) / 10 : rand(1, 20)) * (Math.random() < 0.55 ? -1 : 1);

  GEN["cr5-addition"] = function () {
    const dec = Math.random() < 0.3, a = tireRel(dec), b = tireRel(dec), s = r1(a + b);
    const memeSigne = (a < 0) === (b < 0);
    return { enonce: `Calcule : $${sgn(a)} + ${sgn(b)}$`, mode: "nombre", prefixe: "Résultat :", attendu: s,
      erreurs: [{ valeur: r1(-s), message: "Le résultat a le signe du nombre qui a la plus grande distance à zéro." }, ...(memeSigne ? [] : [{ valeur: r1(Math.abs(a) + Math.abs(b)) * (Math.abs(a) > Math.abs(b) ? Math.sign(a) : Math.sign(b)), message: "Les deux nombres sont de signes contraires : on soustrait les distances à zéro." }])],
      aides: ["Même signe : on additionne les distances à zéro et on garde le signe.", "Signes contraires : on soustrait les distances à zéro et on prend le signe de celui qui a la plus grande distance à zéro.", memeSigne ? `$${nb(Math.abs(a))} + ${nb(Math.abs(b))} = ${nb(r1(Math.abs(a) + Math.abs(b)))}$.` : `$${nb(Math.max(Math.abs(a), Math.abs(b)))} - ${nb(Math.min(Math.abs(a), Math.abs(b)))} = ${nb(r1(Math.abs(Math.abs(a) - Math.abs(b))))}$.`],
      solution: memeSigne ? `Même signe : $${nb(Math.abs(a))} + ${nb(Math.abs(b))} = ${nb(Math.abs(s))}$, avec le signe ${a < 0 ? "$-$" : "$+$"}. Résultat : $${rel(s)}$.` : `Signes contraires : $${nb(Math.max(Math.abs(a), Math.abs(b)))} - ${nb(Math.min(Math.abs(a), Math.abs(b)))} = ${nb(Math.abs(s))}$, avec le signe du nombre le plus éloigné de zéro. Résultat : $${rel(s)}$.` };
  };

  GEN["cr5-soustraction"] = function () {
    const dec = Math.random() < 0.3, a = tireRel(dec), b = tireRel(dec), d = r1(a - b);
    return { enonce: `Calcule : $${sgn(a)} - ${sgn(b)}$`, mode: "nombre", prefixe: "Résultat :", attendu: d,
      erreurs: [{ valeur: r1(a + b), message: "Soustraire un nombre, c'est **ajouter son opposé** : il faut changer le signe du deuxième nombre." }, { valeur: r1(-d), message: "Attention au signe du résultat." }],
      aides: ["Soustraire un nombre revient à ajouter son opposé.", `$${sgn(a)} - ${sgn(b)} = ${sgn(a)} + ${relP(-b)}$.`, "Puis applique la règle de l'addition."],
      solution: `$${sgn(a)} - ${sgn(b)} = ${sgn(a)} + ${relP(-b)} = ${rel(d)}$.` };
  };

  GEN["cr5-simplifier"] = function () {
    const n = rand(3, 4), T = Array.from({ length: n }, () => tireRel(false)), ops = Array.from({ length: n - 1 }, () => pick(["+", "-"]));
    const expr = rel(T[0]) + ops.map((o, i) => ` ${o} ${T[i + 1] < 0 ? `(${rel(T[i + 1])})` : `(+${T[i + 1]})`}`).join("");
    const termes = [T[0], ...ops.map((o, i) => (o === "+" ? T[i + 1] : -T[i + 1]))];
    const simple = (L) => L.map((v, i) => (i === 0 ? rel(v) : v < 0 ? `- ${nb(-v)}` : `+ ${nb(v)}`)).join(" ");
    const bonne = `$${simple(termes)}$`;
    const f1 = `$${simple([T[0], ...ops.map((o, i) => (o === "+" ? -T[i + 1] : T[i + 1]))])}$`;
    const f2 = `$${simple([T[0], ...T.slice(1).map((v, i) => (ops[i] === "-" ? -Math.abs(v) : Math.abs(v)))])}$`;
    const f3 = `$${simple([T[0], ...T.slice(1)])}$`;
    if (Math.random() < 0.5) {
      const { choix, attendu } = melange(bonne, [f1, f2, f3].filter((x) => x !== bonne));
      if (choix.length < 3) return GEN["cr5-simplifier"]();
      return { enonce: `Quelle est l'écriture simplifiée (sans parenthèses) de $${expr}$ ?`, mode: "choix", choix, attendu,
        aides: ["Deux signes qui se suivent : $+(+a) = +a$, $+(-a) = -a$, $-(+a) = -a$, $-(-a) = +a$.", "Des signes identiques donnent $+$ ; des signes contraires donnent $-$.", "Traite chaque parenthèse une par une."],
        solution: `On applique la règle des signes à chaque parenthèse : $${expr} = ${simple(termes)}$.` };
    }
    const v = termes.reduce((s, x) => s + x, 0);
    return { enonce: `Calcule : $${expr}$`, mode: "nombre", prefixe: "Résultat :", attendu: v,
      aides: ["Commence par supprimer les parenthèses avec la règle des signes.", `On obtient $${simple(termes)}$.`, "Regroupe les nombres positifs d'un côté, les négatifs de l'autre."],
      solution: `$${expr} = ${simple(termes)}$. Positifs : $${nb(termes.filter((x) => x > 0).reduce((s, x) => s + x, 0))}$ ; négatifs : $${rel(termes.filter((x) => x < 0).reduce((s, x) => s + x, 0))}$. Résultat : $${rel(v)}$.` };
  };

  GEN["cr5-enchainer"] = function () {
    const n = rand(4, 6), termes = Array.from({ length: n }, (_, i) => (rand(1, 25)) * (i === 0 ? (Math.random() < 0.5 ? -1 : 1) : Math.random() < 0.5 ? -1 : 1));
    const txt = termes.map((v, i) => (i === 0 ? rel(v) : v < 0 ? `- ${nb(-v)}` : `+ ${nb(v)}`)).join(" "), v = termes.reduce((s, x) => s + x, 0);
    const P = termes.filter((x) => x > 0).reduce((s, x) => s + x, 0), N = termes.filter((x) => x < 0).reduce((s, x) => s + x, 0);
    return { enonce: `Calcule : $${txt}$`, mode: "nombre", prefixe: "Résultat :", attendu: v,
      erreurs: [{ valeur: P - N, message: "Les nombres précédés de $-$ se retirent : regroupe les positifs et les négatifs séparément." }],
      aides: ["Chaque nombre est précédé de son signe : c'est une somme de relatifs.", "Additionne tous les nombres précédés de $+$ (ou sans signe), puis tous ceux précédés de $-$.", `Positifs : $${P}$ ; négatifs : $${rel(N)}$.`],
      solution: `Positifs : $${termes.filter((x) => x > 0).map(nb).join(" + ") || 0} = ${P}$. Négatifs : $${termes.filter((x) => x < 0).map(rel).join(" ")} = ${rel(N)}$. Résultat : $${P} + ${relP(N)} = ${rel(v)}$.` };
  };

  GEN["cr5-problemes"] = function () {
    const t = rand(0, 3);
    if (t === 0) {
      const a = rand(-15, 5), b = rand(-5, 25); if (a === b) return GEN["cr5-problemes"]();
      return { enonce: `Le matin, un thermomètre indique $${rel(a)}$ °C ; l'après-midi, il indique $${rel(b)}$ °C. De combien de degrés la température a-t-elle ${b > a ? "augmenté" : "baissé"} ?`, mode: "nombre", prefixe: "Écart :", suffixe: "°C", attendu: Math.abs(b - a),
        erreurs: [{ valeur: Math.abs(Math.abs(b) - Math.abs(a)), message: "Attention : quand on passe sous zéro, il faut compter les degrés de chaque côté de zéro." }],
        aides: ["L'écart entre deux températures, c'est la différence : la plus haute moins la plus basse.", `$${rel(Math.max(a, b))} - ${relP(Math.min(a, b))}$.`, "Soustraire un nombre négatif revient à ajouter son opposé."],
        solution: `$${rel(Math.max(a, b))} - ${relP(Math.min(a, b))} = ${Math.abs(b - a)}$ : la température a ${b > a ? "augmenté" : "baissé"} de $${Math.abs(b - a)}$ °C.` };
    }
    if (t === 1) {
      const h = rand(50, 660), p = rand(5, 40);
      return { enonce: `Un randonneur est au sommet d'une colline, à $${h}$ m d'altitude, pendant qu'une plongeuse explore le récif à $${p}$ m sous le niveau de la mer ($${rel(-p)}$ m). Quelle est la différence d'altitude entre eux ?`, mode: "nombre", prefixe: "Différence :", suffixe: "m", attendu: h + p,
        erreurs: [{ valeur: h - p, message: `Il faut calculer $${h} - (${rel(-p)})$, et soustraire un négatif revient à ajouter.` }],
        aides: ["Différence d'altitude : la plus haute moins la plus basse.", `$${h} - (${rel(-p)})$.`, "Soustraire un nombre, c'est ajouter son opposé."], solution: `$${h} - (${rel(-p)}) = ${h} + ${p} = ${h + p}$ m.` };
    }
    if (t === 2) {
      const e = rand(1, 5), m = rand(1, 8), d = rand(1, 6);
      return { enonce: `Un ascenseur part de l'étage $${e}$. Il descend de $${e + m}$ étages, puis remonte de $${d}$ étages. À quel étage arrive-t-il ? (Les étages du parking sont négatifs.)`, mode: "nombre", prefixe: "Étage :", attendu: e - (e + m) + d,
        aides: ["Une descente se traduit par un nombre négatif, une montée par un nombre positif.", `Calcule $${e} - ${e + m} + ${d}$.`, `$${e} - ${e + m} = ${rel(-m)}$.`], solution: `$${e} - ${e + m} + ${d} = ${rel(-m)} + ${d} = ${rel(d - m)}$ : l'ascenseur arrive à l'étage $${rel(d - m)}$.` };
    }
    const s0 = rand(10, 80), dep = rand(20, 120), rec = rand(5, 60), fin = s0 - dep + rec;
    return { enonce: `Le solde du compte de Saïd est de $${s0}$ €. Il paie $${dep}$ € par carte, puis reçoit $${rec}$ €. Quel est son nouveau solde, en euros ?`, mode: "nombre", prefixe: "Solde :", suffixe: "€", attendu: fin,
      erreurs: [{ valeur: s0 + dep + rec, message: "Un paiement fait baisser le solde." }],
      aides: ["Un paiement se traduit par un nombre négatif, un versement par un positif.", `Calcule $${s0} - ${dep} + ${rec}$.`, `$${s0} - ${dep} = ${rel(s0 - dep)}$.`], solution: `$${s0} - ${dep} + ${rec} = ${rel(s0 - dep)} + ${rec} = ${rel(fin)}$ €.${fin < 0 ? " Le compte est à découvert." : ""}` };
  };

  /* =====================================================================
     Chapitre 10 : graphiques et grandeurs en fonction d'une autre (gf5-)
     ===================================================================== */
  // Graphique dans un repère d'origine 0 : points [x, y], reliés ou non
  function grapheXY(o) {
    const W = 320, H = 210, x0 = 40, y0 = 176, haut = 18, droite = W - 14;
    const X = (x) => +(x0 + ((droite - x0) * x) / o.xmax).toFixed(1), Y = (y) => +(y0 - ((y0 - haut) * y) / o.ymax).toFixed(1);
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H + 16}" role="img" aria-label="${o.aria}"><g class="g-grid">`;
    for (let x = 0; x <= o.xmax + 1e-9; x += o.pasX) s += `<line x1="${X(x)}" y1="${haut}" x2="${X(x)}" y2="${y0}"/>`;
    for (let y = 0; y <= o.ymax + 1e-9; y += o.pasY) s += `<line x1="${x0}" y1="${Y(y)}" x2="${droite}" y2="${Y(y)}"/>`;
    s += `</g><g class="g-tick">`;
    for (let x = 0; x <= o.xmax + 1e-9; x += o.pasX * (o.etiqX || 1)) s += `<text x="${X(x)}" y="${y0 + 14}" text-anchor="middle">${nbTexteC(x)}</text>`;
    for (let y = o.pasY * (o.etiqY || 1); y <= o.ymax + 1e-9; y += o.pasY * (o.etiqY || 1)) s += `<text x="${x0 - 5}" y="${Y(y) + 3.5}" text-anchor="end">${nbTexteC(y)}</text>`;
    s += `</g><g class="g-axis"><line x1="${x0}" y1="${y0}" x2="${droite + 4}" y2="${y0}"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${haut - 8}"/></g>`;
    if (o.relier) s += `<polyline class="g-curve" points="${o.pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")}"/>`;
    o.pts.forEach(([x, y]) => { s += `<circle class="g-point" cx="${X(x)}" cy="${Y(y)}" r="3.5"/>`; });
    s += `<text class="g-plabel" x="${x0 + 4}" y="${haut - 6}">${o.ylab}</text><text class="g-plabel" x="${droite}" y="${y0 + 32}" text-anchor="end">${o.xlab}</text>`;
    return s + `</svg>`;
  }
  const nbTexteC = (x) => String(+x.toFixed(6)).replace(".", ",");
  FIGURES["gf5-rando"] = () => grapheXY({ pts: [[0, 0], [1, 4], [2, 8], [3, 8], [4, 11], [5, 14]], xmax: 5, ymax: 16, pasX: 1, pasY: 2, relier: true, xlab: "durée (h)", ylab: "distance (km)", aria: "Distance parcourue en fonction de la durée : 4 km par heure, une pause entre 2 h et 3 h, 14 km en 5 h" });
  FIGURES["gf5-prop"] = () => grapheXY({ pts: [[1, 3], [2, 6], [3, 9], [4, 12], [5, 15]], xmax: 6, ymax: 18, pasX: 1, pasY: 3, relier: false, xlab: "masse (kg)", ylab: "prix (€)", aria: "Prix en fonction de la masse : points alignés avec l'origine, 3 € par kilogramme" });

  GEN["gf5-lire"] = function () {
    // randonnée : vitesse v, pause éventuelle, lecture directe ou inverse
    for (let e = 0; e < 50; e++) {
      const v = pick([2, 3, 4, 5]), n = rand(5, 7), pause = rand(1, n - 2), pts = [[0, 0]]; let d = 0;
      for (let h = 1; h <= n; h++) { if (h !== pause + 1) d += v * (h > pause + 1 && Math.random() < 0.4 ? 0.5 : 1); pts.push([h, d]); }
      if (pts.some(([, y]) => !Number.isInteger(y))) continue;
      const ymax = Math.ceil(d / 4) * 4 + 4, fig = grapheXY({ pts, xmax: n, ymax, pasX: 1, pasY: 2, etiqY: 2, relier: true, xlab: "durée (h)", ylab: "distance (km)", aria: "Distance parcourue par un randonneur en fonction de la durée de marche" });
      const t = rand(0, 3), h = rand(1, n);
      if (t === 0) return { enonce: `Le graphique donne la distance parcourue par un randonneur en fonction de la durée de marche. Quelle distance a-t-il parcourue au bout de $${h}$ h ?`, figure: fig, mode: "nombre", prefixe: "Distance :", suffixe: "km", attendu: pts[h][1],
        aides: ["La durée se lit sur l'axe horizontal, la distance sur l'axe vertical.", `Pars de $${h}$ sur l'axe horizontal et monte jusqu'à la courbe.`, "Puis lis la valeur correspondante sur l'axe vertical."], solution: `Au bout de $${h}$ h, le point de la courbe est à la hauteur $${pts[h][1]}$ : il a parcouru $${pts[h][1]}$ km.` };
      if (t === 1) return { enonce: "Le graphique donne la distance parcourue par un randonneur en fonction de la durée de marche. Pendant combien d'heures a-t-il fait une pause ?", figure: fig, mode: "nombre", prefixe: "Pause :", suffixe: "h", attendu: 1,
        aides: ["Pendant une pause, la distance ne change pas.", "Cherche le morceau de courbe horizontal.", "Lis sur l'axe horizontal le début et la fin de ce morceau."], solution: `La courbe est horizontale entre $${pause}$ h et $${pause + 1}$ h : la distance reste $${pts[pause][1]}$ km. La pause a duré $1$ h.` };
      if (t === 2) return { enonce: "Le graphique donne la distance parcourue par un randonneur en fonction de la durée de marche. Quelle distance a-t-il parcourue en tout ?", figure: fig, mode: "nombre", prefixe: "Distance totale :", suffixe: "km", attendu: d,
        aides: ["La distance totale est la distance à la fin de la randonnée.", "Regarde le dernier point de la courbe.", "Lis sa hauteur sur l'axe vertical."], solution: `Le dernier point est à la hauteur $${d}$ : il a parcouru $${d}$ km.` };
      const cible = pts.find(([x, y], i) => i > 0 && y > 0 && pts.filter((q) => q[1] === y).length === 1); if (!cible) continue;
      return { enonce: `Le graphique donne la distance parcourue par un randonneur en fonction de la durée de marche. Au bout de combien d'heures avait-il parcouru $${cible[1]}$ km ?`, figure: fig, mode: "nombre", prefixe: "Durée :", suffixe: "h", attendu: cible[0],
        aides: ["Cette fois, on part de l'axe vertical (la distance).", `Pars de $${cible[1]}$ sur l'axe vertical et va horizontalement jusqu'à la courbe.`, "Descends ensuite sur l'axe horizontal."], solution: `La courbe atteint $${cible[1]}$ km au point d'abscisse $${cible[0]}$ : au bout de $${cible[0]}$ h.` };
    }
  };

  GEN["gf5-formule"] = function () {
    const t = rand(0, 3);
    const C = [
      () => { const a = pick([6, 7, 8, 9, 12]), b = pick([2, 3, 4, 5]), n = rand(2, 9); return { e: `Au cinéma, le prix $P$ (en €) à payer pour $n$ places et un pot de pop-corn est $P = ${a} \\times n + ${b}$. Calcule le prix pour $${n}$ places.`, r: a * n + b, s: `$P = ${a} \\times ${n} + ${b} = ${a * n} + ${b} = ${a * n + b}$ €.`, err: a * (n + b), u: "€" }; },
      () => { const c = Dc(rand(12, 25), 1), p = rand(3, 5), d = rand(2, 30), r = addD(Dc(p), mulD(c, Dc(d))); return { e: `Un taxi facture une prise en charge de $${p}$ € puis $${tD(c)}$ € par kilomètre. Le prix est $P = ${p} + ${tD(c)} \\times d$ où $d$ est la distance en km. Calcule $P$ pour $d = ${d}$.`, r: r.m / 10 ** r.d, s: `$P = ${p} + ${tD(c)} \\times ${d} = ${p} + ${tD(mulD(c, Dc(d)))} = ${tD(r)}$ €.`, err: (p + c.m / 10) * d, u: "€" }; },
      () => { const c = rand(2, 12); return { e: `Le périmètre $P$ d'un carré de côté $c$ est donné par la formule $P = 4 \\times c$. Calcule $P$ pour $c = ${c}$ cm.`, r: 4 * c, s: `$P = 4 \\times ${c} = ${4 * c}$ cm.`, err: c * c, u: "cm" }; },
      () => { const L = rand(3, 12), l = rand(2, L - 1); return { e: `Le périmètre $P$ d'un rectangle de longueur $L$ et de largeur $\\ell$ est $P = 2 \\times (L + \\ell)$. Calcule $P$ pour $L = ${L}$ cm et $\\ell = ${l}$ cm.`, r: 2 * (L + l), s: `$P = 2 \\times (${L} + ${l}) = 2 \\times ${L + l} = ${2 * (L + l)}$ cm.`, err: 2 * L + l, u: "cm" }; }
    ];
    if (t <= 1 || Math.random() < 0.5) { const q = C[rand(0, 3)](); return { enonce: q.e, mode: "nombre", prefixe: "Résultat :", suffixe: q.u, attendu: q.r, erreurs: [{ valeur: q.err, message: "Respecte les priorités : multiplications d'abord, sauf s'il y a des parenthèses." }],
      aides: ["On remplace la lettre par sa valeur : c'est une substitution.", "On écrit le signe $\\times$ entre le nombre et la valeur remplacée.", "On applique les priorités opératoires."], solution: q.s }; }
    const a = rand(2, 9), b = rand(1, 15), xs = [0, 1, 2, 5, 10].slice(0, 5), i = rand(1, 4);
    return { enonce: `La masse $M$ (en kg) d'un carton contenant $n$ bouteilles est $M = ${a} \\times n + ${b}$. Complète le tableau : que vaut $M$ pour $n = ${xs[i]}$ ?`, tableau: { lignes: [["n", ...xs.map(String)], ["M", ...xs.map((x, k) => (k === i ? "\\ldots" : String(a * x + b)))]] }, mode: "nombre", prefixe: "$M =$", suffixe: "kg", attendu: a * xs[i] + b,
      erreurs: [{ valeur: a * xs[i], message: `N'oublie pas d'ajouter $${b}$ (la masse du carton vide).` }],
      aides: [`Remplace $n$ par $${xs[i]}$ dans la formule.`, `$M = ${a} \\times ${xs[i]} + ${b}$.`, "Multiplication d'abord, puis addition."], solution: `$M = ${a} \\times ${xs[i]} + ${b} = ${a * xs[i] + b}$ kg.` };
  };

  GEN["gf5-produire"] = function () {
    const t = rand(0, 5);
    const Q = [
      () => { const a = rand(2, 15); return [`Un cahier coûte $${a}$ €. Quelle formule donne le prix $P$ (en €) de $n$ cahiers en fonction de $n$ ?`, `$P = ${a} \\times n$`, [`$P = ${a} + n$`, `$P = n \\div ${a}$`, `$P = ${a} \\times n + ${a}$`], `Chaque cahier coûte $${a}$ € : pour $n$ cahiers, $P = ${a} \\times n$ (on écrit aussi $P = ${a}n$).`]; },
      () => { const p = rand(2, 8), c = pick([1.5, 2, 2.5, 1.2, 1.8, 3]); const C = nb(c); return [`Un taxi facture $${p}$ € de prise en charge, puis $${C}$ € par kilomètre. Quelle formule donne le prix $P$ (en €) en fonction de la distance $d$ (en km) ?`, `$P = ${p} + ${C} \\times d$`, [`$P = (${p} + ${C}) \\times d$`, `$P = ${p} \\times d + ${C}$`, `$P = ${C} \\times d$`], `On paie $${p}$ € une seule fois, puis $${C}$ € pour chaque kilomètre : $P = ${p} + ${C} \\times d$.`]; },
      () => [`Quelle formule donne l'aire $\\mathcal{A}$ d'un carré en fonction de la longueur $c$ de son côté ?`, "$\\mathcal{A} = c \\times c$", ["$\\mathcal{A} = 4 \\times c$", "$\\mathcal{A} = 2 \\times c$", "$\\mathcal{A} = c + c$"], "L'aire d'un carré est côté fois côté : $\\mathcal{A} = c \\times c = c^2$."],
      () => { const a = rand(2, 12), m = rand(5, 20); return [`Un abonnement de streaming coûte $${m}$ € par mois, plus $${a}$ € par film loué. Quelle formule donne le prix $P$ (en €) payé dans un mois en fonction du nombre $f$ de films loués ?`, `$P = ${m} + ${a} \\times f$`, [`$P = (${m} + ${a}) \\times f$`, `$P = ${m} \\times f + ${a}$`, `$P = ${a} \\times f$`], `On paie $${m}$ € une fois, plus $${a}$ € pour chaque film : $P = ${m} + ${a} \\times f$.`]; },
      () => { const l = rand(2, 9); return [`Un rectangle a une largeur de $${l}$ cm. Quelle formule donne son périmètre $P$ (en cm) en fonction de sa longueur $L$ ?`, `$P = 2 \\times (L + ${l})$`, [`$P = 2 \\times L + ${l}$`, `$P = L \\times ${l}$`, `$P = L + ${l}$`], `Le périmètre est le double de la somme de la longueur et de la largeur : $P = 2 \\times (L + ${l})$.`]; },
      () => { const a = rand(2, 9); return [`On choisit un nombre $x$, on le multiplie par $${a}$, puis on retire $1$. Quelle formule donne le résultat $R$ en fonction de $x$ ?`, `$R = ${a} \\times x - 1$`, [`$R = ${a} \\times (x - 1)$`, `$R = x - ${a} \\times 1$`, `$R = ${a} + x - 1$`], `On multiplie d'abord $x$ par $${a}$, puis on retire $1$ : $R = ${a} \\times x - 1$, sans parenthèses.`]; }
    ];
    const [q, bonne, faux, expl] = Q[t]();
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: q, mode: "choix", choix, attendu, aides: ["Teste chaque formule avec une valeur simple (par exemple $1$ ou $2$).", "Vérifie que le résultat obtenu correspond bien à la situation.", "Attention aux parenthèses : elles changent l'ordre des calculs."], solution: `Réponse : ${bonne}. ${expl}` };
  };

  GEN["gf5-proportionnalite"] = function () {
    const t = rand(0, 2), k = pick([1.5, 2, 2.5, 3, 4, 5]), n = 5, xs = [1, 2, 3, 4, 5];
    let pts, nature;
    if (t === 0) { pts = xs.map((x) => [x, x * k]); nature = 0; }
    else if (t === 1) { const b = pick([2, 3, 4]); pts = xs.map((x) => [x, x * k + b]); nature = 1; }
    else { pts = xs.map((x) => [x, Math.max(1, Math.round(x * k + pick([-2, -1, 1, 2]) * (x % 2)))]); nature = 2; if (pts.every(([x, y]) => y === x * k)) return GEN["gf5-proportionnalite"](); }
    const ymax = Math.ceil(Math.max(...pts.map((p) => p[1])) / 2) * 2 + 2;
    const fig = grapheXY({ pts, xmax: 6, ymax, pasX: 1, pasY: ymax > 20 ? 4 : 2, relier: false, xlab: "quantité", ylab: "prix (€)", aria: "Nuage de points représentant un prix en fonction d'une quantité" });
    const choix = ["Oui : les points sont alignés avec l'origine du repère", "Non : les points sont alignés, mais pas avec l'origine", "Non : les points ne sont pas alignés"];
    return { enonce: "Ce graphique représente-t-il une situation de proportionnalité ?", figure: fig, mode: "choix", choix, attendu: nature,
      aides: ["Une situation de proportionnalité est représentée par des points **alignés avec l'origine** du repère.", "Vérifie d'abord si les points sont alignés (sur une même droite).", "Puis prolonge mentalement la droite : passe-t-elle par l'origine $(0 \\, ; \\, 0)$ ?"],
      solution: [`Les points sont alignés sur une droite qui passe par l'origine : c'est une situation de proportionnalité (coefficient $${nb(k)}$).`, "Les points sont alignés, mais la droite ne passe pas par l'origine : ce n'est pas une situation de proportionnalité.", "Les points ne sont pas alignés : ce n'est pas une situation de proportionnalité."][nature] };
  };

  /* =====================================================================
     Chapitre 11 : calcul littéral, carrés et cubes (cl5-)
     ===================================================================== */
  const LET = ["x", "a", "n", "y", "t"];
  // ax + b écrit proprement (a, b entiers, a non nul)
  const affine = (a, b, x) => `${a === 1 ? "" : a === -1 ? "-" : a}${x}${b === 0 ? "" : b > 0 ? ` + ${b}` : ` - ${-b}`}`;

  GEN["cl5-puissances"] = function () {
    const t = rand(0, 4);
    if (t === 0) { const a = rand(2, 12), q = Math.random() < 0.75 ? 2 : 3, b = q === 3 ? rand(2, 5) : a, v = b ** q;
      return { enonce: `Calcule $${b}^${q}$.`, mode: "nombre", prefixe: "Résultat :", attendu: v, erreurs: [{ valeur: b * q, message: `$${b}^${q}$ n'est pas $${b} \\times ${q}$ : c'est $${Array(q).fill(b).join(" \\times ")}$.` }],
        aides: [`$${b}^${q}$ se lit « ${b} ${q === 2 ? "au carré" : "au cube"} ».`, `$${b}^${q} = ${Array(q).fill(b).join(" \\times ")}$.`, "Calcule ce produit."], solution: `$${b}^${q} = ${Array(q).fill(b).join(" \\times ")} = ${v}$.` }; }
    if (t === 1) { const a = rand(2, 12), v = a * a;
      return { enonce: `De quel nombre entier positif $${v}$ est-il le carré ?`, mode: "nombre", prefixe: "Nombre :", attendu: a, erreurs: [{ valeur: v / 2, message: "Le carré n'est pas le double : cherche le nombre qui, multiplié par lui-même, donne $" + v + "$." }],
        aides: ["Connais tes carrés de $1$ à $12$.", "Cherche $\\ldots \\times \\ldots = " + v + "$ avec deux fois le même nombre.", `$${a - 1}^2 = ${(a - 1) ** 2}$.`], solution: `$${a} \\times ${a} = ${v}$, donc $${v} = ${a}^2$.` }; }
    if (t === 2) { const a = rand(1, 9), b = rand(2, 6), c = rand(2, 5), v = a + b ** 2 * c;
      return { enonce: `Calcule $${a} + ${b}^2 \\times ${c}$.`, mode: "nombre", prefixe: "Résultat :", attendu: v, erreurs: [{ valeur: (a + b) ** 2 * c, message: "Le carré ne porte que sur le nombre juste avant." }, { valeur: a + (b * c) ** 2, message: "On calcule d'abord la puissance, puis la multiplication." }],
        aides: ["Priorités : d'abord les puissances, puis les multiplications, puis les additions.", `$${b}^2 = ${b * b}$.`, `$${a} + ${b * b} \\times ${c}$.`], solution: `$${a} + ${b}^2 \\times ${c} = ${a} + ${b * b} \\times ${c} = ${a} + ${b * b * c} = ${v}$.` }; }
    if (t === 3) { const a = rand(2, 9), b = rand(1, 5), v = (a - b) ** 2; if (a <= b) return GEN["cl5-puissances"]();
      return { enonce: `Calcule $(${a} - ${b})^2$.`, mode: "nombre", prefixe: "Résultat :", attendu: v, erreurs: [{ valeur: a * a - b * b, message: "On calcule d'abord la parenthèse, puis le carré." }, { valeur: 2 * (a - b), message: "Le carré n'est pas le double." }],
        aides: ["Les parenthèses sont prioritaires.", `$${a} - ${b} = ${a - b}$.`, `$${a - b}^2 = ${a - b} \\times ${a - b}$.`], solution: `$(${a} - ${b})^2 = ${a - b}^2 = ${v}$.` }; }
    const s = rand(2, 9), q = rand(0, 1);
    return q ? { enonce: `Un carré a un côté de $${s}$ cm. Quelle est son aire, en cm² ?`, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: s * s, erreurs: [{ valeur: 4 * s, message: "Ça, c'est le périmètre." }],
      aides: ["Aire d'un carré : côté $\\times$ côté.", `C'est $${s}^2$.`, `$${s} \\times ${s}$.`], solution: `$\\mathcal{A} = ${s}^2 = ${s * s}$ cm².` }
      : { enonce: `Un cube a une arête de $${s}$ cm. Quel est son volume, en cm³ ?`, mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: s ** 3, erreurs: [{ valeur: s * s, message: "Un volume se calcule avec trois longueurs : $a \\times a \\times a$." }],
        aides: ["Volume d'un cube : arête $\\times$ arête $\\times$ arête.", `C'est $${s}^3$.`, `$${s} \\times ${s} \\times ${s}$.`], solution: `$V = ${s}^3 = ${s * s * s}$ cm³.` };
  };

  GEN["cl5-ecriture"] = function () {
    const x = pick(LET), y = pick(LET.filter((l) => l !== x)), a = rand(2, 9), b = rand(2, 9), t = rand(0, 4);
    const Q = [
      [`${a} \\times ${x}`, `${a}${x}`, [`${a} + ${x}`, `${x}^{${a}}`, `${a}${x}^2`]],
      [`${x} \\times ${x}`, `${x}^2`, [`2${x}`, `${x}${x}`, `${x} + ${x}`]],
      [`${x} \\times ${x} \\times ${x}`, `${x}^3`, [`3${x}`, `${x}^2`, `3${x}^3`]],
      [`${a} \\times ${x} \\times ${b}`, `${a * b}${x}`, [`${a}${x}${b}`, `${a + b}${x}`, `${a}${b}${x}`]],
      [`${x} \\times ${a} \\times ${y}`, `${a}${x}${y}`, [`${x}${a}${y}`, `${a} + ${x}${y}`, `${a}${x} + ${y}`]]
    ];
    const [e, bonne, faux] = Q[t];
    const { choix, attendu } = melange(`$${bonne}$`, faux.filter((f) => f !== bonne).map((f) => `$${f}$`));
    return { enonce: `Écris plus simplement : $${e}$`, mode: "choix", choix, attendu,
      aides: ["On peut supprimer le signe $\\times$ devant une lettre ou une parenthèse : $3 \\times x = 3x$.", `$${x} \\times ${x} = ${x}^2$ et $${x} \\times ${x} \\times ${x} = ${x}^3$.`, "Le nombre s'écrit en premier ; on multiplie les nombres entre eux."],
      solution: `$${e} = ${bonne}$.` };
  };

  GEN["cl5-substitution"] = function () {
    const x = pick(LET), v = rand(1, 9) * (Math.random() < 0.2 ? 1 : 1), t = rand(0, 4), a = rand(2, 9), b = rand(1, 12);
    const E = [
      [`${a}${x} + ${b}`, a * v + b, `${a} \\times ${v} + ${b} = ${a * v} + ${b}`, a * 10 + v + b],
      [`${a}(${x} + ${b})`, a * (v + b), `${a} \\times (${v} + ${b}) = ${a} \\times ${v + b}`, a * v + b],
      [`${x}^2 + ${b}`, v * v + b, `${v}^2 + ${b} = ${v * v} + ${b}`, 2 * v + b],
      [`${a}${x}^2`, a * v * v, `${a} \\times ${v}^2 = ${a} \\times ${v * v}`, (a * v) ** 2],
      [`${x}^2 - ${x}`, v * v - v, `${v}^2 - ${v} = ${v * v} - ${v}`, 0]
    ];
    const [e, r, etape, faux] = E[t];
    return { enonce: `Calcule $${e}$ pour $${x} = ${v}$.`, mode: "nombre", prefixe: "Résultat :", attendu: r,
      erreurs: faux !== r ? [{ valeur: faux, message: t === 0 ? `$${a}${x}$ signifie $${a} \\times ${x}$ : on n'écrit pas $${a}$ à côté de $${v}$.` : t === 1 ? "La parenthèse se calcule en premier." : t === 3 ? "Le carré ne porte que sur la lettre." : "Le carré n'est pas le double." }] : [],
      aides: [`Remplace $${x}$ par $${v}$ en rétablissant le signe $\\times$.`, "Respecte les priorités : parenthèses, puissances, multiplications, additions.", `$${etape}$.`], solution: `$${etape} = ${r}$.` };
  };

  GEN["cl5-developper"] = function () {
    const x = pick(LET), t = rand(0, 3), k = rand(2, 9), a = rand(1, 9), b = rand(1, 12), m = pick(["+", "-"]);
    if (t === 0) {
      const bonne = `${k}${x} ${m} ${k * b}`;
      const { choix, attendu } = melange(`$${bonne}$`, [`$${k}${x} ${m} ${b}$`, `$${k + b}${x}$`, `$${x} ${m} ${k * b}$`, `$${k}${x} ${m === "+" ? "-" : "+"} ${k * b}$`]);
      return { enonce: `Développe $${k}(${x} ${m} ${b})$.`, mode: "choix", choix, attendu,
        aides: ["Distributivité : $k(a + b) = ka + kb$ et $k(a - b) = ka - kb$.", `Le facteur $${k}$ multiplie **chaque** terme de la parenthèse.`, `$${k} \\times ${x} = ${k}${x}$ et $${k} \\times ${b} = ${k * b}$.`], solution: `$${k}(${x} ${m} ${b}) = ${k} \\times ${x} ${m} ${k} \\times ${b} = ${bonne}$.` };
    }
    if (t === 1) {
      const bonne = `${k}(${x} ${m} ${b})`;
      const { choix, attendu } = melange(`$${bonne}$`, [`$${k}(${x} ${m} ${k * b})$`, `$${b}(${k}${x} ${m} 1)$`.replace(`${b}(`, `${k * b}(`), `$${x}(${k} ${m} ${k * b})$`, `$${k}${x}(${m === "+" ? "" : "-"}${b})$`]);
      return { enonce: `Factorise $${k}${x} ${m} ${k * b}$.`, mode: "choix", choix, attendu,
        aides: ["Factoriser, c'est transformer une somme en produit : $ka + kb = k(a + b)$.", `Cherche un facteur commun aux deux termes : $${k}${x} = ${k} \\times ${x}$ et $${k * b} = ${k} \\times ${b}$.`, `Le facteur commun est $${k}$.`], solution: `$${k}${x} ${m} ${k * b} = ${k} \\times ${x} ${m} ${k} \\times ${b} = ${bonne}$.` };
    }
    const c = rand(2, 9), d = rand(2, 9), e = rand(1, 15), f2 = rand(1, 9);
    if (t === 2) {
      const A = c + d, bonne = affine(A, e, x);
      const { choix, attendu } = melange(`$${bonne}$`, [`$${A + e}${x}$`, `$${c * d}${x} + ${e}$`, `$${affine(A, 0, x)}$`, `$${A}${x}^2 + ${e}$`]);
      return { enonce: `Réduis $${c}${x} + ${d}${x} + ${e}$.`, mode: "choix", choix, attendu,
        aides: [`On ne peut additionner que les termes « en $${x}$ » entre eux, et les nombres entre eux.`, `$${c}${x} + ${d}${x} = (${c} + ${d})${x} = ${A}${x}$.`, `Le nombre $${e}$ reste seul.`], solution: `$${c}${x} + ${d}${x} + ${e} = ${A}${x} + ${e}$. On ne peut pas aller plus loin : $${A}${x}$ et $${e}$ ne sont pas « du même type ».` };
    }
    const A = c + d, B = e - f2, bonne = affine(A, B, x);
    const { choix, attendu } = melange(`$${bonne}$`, [`$${affine(A, e + f2, x)}$`, `$${affine(c - d || 1, B, x)}$`, `$${A + B}${x}$`, `$${affine(A, -B, x)}$`].filter((z) => z !== `$${bonne}$`));
    return { enonce: `Réduis $${c}${x} + ${e} + ${d}${x} - ${f2}$.`, mode: "choix", choix, attendu,
      aides: [`Regroupe les termes en $${x}$ : $${c}${x} + ${d}${x}$.`, `Regroupe les nombres : $${e} - ${f2}$.`, `$${c}${x} + ${d}${x} = ${A}${x}$ et $${e} - ${f2} = ${B}$.`], solution: `$${c}${x} + ${e} + ${d}${x} - ${f2} = ${c}${x} + ${d}${x} + ${e} - ${f2} = ${bonne}$.` };
  };

  GEN["cl5-raisonner"] = function () {
    const t = rand(0, 4), x = pick(["n", "x", "a"]);
    if (t === 0) {
      const E = pick([[`3${x} + 5`, "une somme"], [`3(${x} + 5)`, "un produit"], [`${x}^2 + 1`, "une somme"], [`2${x} - 7`, "une différence"], [`(${x} + 1)(${x} - 1)`, "un produit"], [`4 + 2${x}`, "une somme"], [`5(2${x} - 3)`, "un produit"], [`${x}^2 - 9`, "une différence"]]);
      const { choix, attendu } = melange(E[1], ["une somme", "un produit", "une différence", "un quotient"].filter((z) => z !== E[1]));
      return { enonce: `L'expression $${E[0]}$ est :`, mode: "choix", choix, attendu,
        aides: ["Comme pour les nombres, la nature est donnée par la **dernière** opération effectuée.", "Imagine que tu remplaces la lettre par un nombre : quelle opération ferais-tu en dernier ?", "$3(x + 5)$ : on calcule la parenthèse puis on multiplie."], solution: `$${E[0]}$ est ${E[1]} : c'est la dernière opération effectuée.` };
    }
    if (t === 1) {
      const P = pick([["le double de $n$", "2n", ["n^2", "n + 2", "n \\div 2"]], ["le carré de $n$", "n^2", ["2n", "n + 2", "2 \\times n^2"]], ["le successeur de $n$ (le nombre entier qui suit)", "n + 1", ["n - 1", "2n", "1n"]], ["le prédécesseur de $n$", "n - 1", ["n + 1", "1 - n", "n \\div 1"]], ["le triple de $n$ augmenté de $4$", "3n + 4", ["3(n + 4)", "3 + 4n", "4n + 3"]], ["un nombre pair (on note $n$ un nombre entier)", "2n", ["n + 2", "2n + 1", "n^2"]], ["un nombre impair (on note $n$ un nombre entier)", "2n + 1", ["2n", "n + 1", "n + 2"]], ["la moitié de $n$", "\\dfrac{n}{2}", ["2n", "n - 2", "n^2"]], ["le cube de $n$", "n^3", ["3n", "n \\times 3", "n^2"]]]);
      const { choix, attendu } = melange(`$${P[1]}$`, P[2].map((z) => `$${z}$`));
      return { enonce: `Quelle expression représente ${P[0]} ?`, mode: "choix", choix, attendu,
        aides: ["Teste avec un nombre, par exemple $n = 5$.", "Double : $\\times 2$ ; carré : $n \\times n$ ; triple : $\\times 3$.", "Successeur : $+1$ ; prédécesseur : $-1$."], solution: `${P[0][0].toUpperCase() + P[0].slice(1)} s'écrit $${P[1]}$.` };
    }
    if (t === 2) {
      const C = pick([["« Pour tout nombre $x$, $x^2$ est plus grand que $x$. »", 0.5, [2, 3, 10], "$0{,}5^2 = 0{,}25$, plus petit que $0{,}5$"], ["« Pour tout nombre $x$, $2x$ est plus grand que $x + 1$. »", 1, [2, 5, 10], "$2 \\times 1 = 2$ et $1 + 1 = 2$ : ce n'est pas « plus grand »"], ["« Pour tout nombre $x$, $x^2 + 1$ est plus grand que $2x$. »", 1, [0, 2, 3], "$1^2 + 1 = 2$ et $2 \\times 1 = 2$ : ce n'est pas « plus grand »"], ["« Pour tout nombre entier $n$, $n^2 + 1$ est un nombre pair. »", 2, [1, 3, 5], "$2^2 + 1 = 5$ est impair"], ["« Pour tout nombre $x$, $x^2 = 2x$. »", 3, [0, 2], "$3^2 = 9$ et $2 \\times 3 = 6$"]]);
      const faux = C[2], bonne = C[1], autres = faux.filter((v) => v !== bonne).slice(0, 3);
      const { choix, attendu } = melange(`$${nb(bonne)}$`, autres.map((v) => `$${nb(v)}$`));
      return { enonce: `Kassim affirme : ${C[0]} Quel nombre est un contre-exemple qui prouve qu'il a tort ?`, mode: "choix", choix, attendu,
        aides: ["Un contre-exemple est **un seul** cas où l'affirmation est fausse.", "Teste l'affirmation avec chacun des nombres proposés.", "Un seul nombre suffit à prouver que l'affirmation est fausse."], solution: `Avec $${nb(bonne)}$ : ${C[3]}. Ce contre-exemple suffit : l'affirmation est fausse.` };
    }
    if (t === 3) {
      const a = rand(2, 9), b = rand(1, 9), v = rand(1, 9), ok = Math.random() < 0.5, c = ok ? a * v + b : a * v + b + pick([-2, -1, 1, 2]);
      const choix = [`Oui, car $${a} \\times ${v} + ${b} = ${c}$`, `Non, car $${a} \\times ${v} + ${b} = ${a * v + b}$`, `Oui, car $${a}${v} + ${b} = ${a * 10 + v + b}$`];
      if (!ok) choix[0] = `Oui, car $${c}$ est proche de $${a * v + b}$`; else choix[1] = "Non, car on ne peut pas calculer avec une lettre";
      return { enonce: `L'égalité $${a}${x} + ${b} = ${c}$ est-elle vraie pour $${x} = ${v}$ ?`, mode: "choix", choix, attendu: ok ? 0 : 1,
        aides: [`Remplace $${x}$ par $${v}$ dans le membre de gauche.`, `$${a} \\times ${v} + ${b}$.`, `Compare le résultat avec $${c}$.`], solution: `Pour $${x} = ${v}$ : $${a} \\times ${v} + ${b} = ${a * v + b}$. ${ok ? "L'égalité est vraie." : `$${a * v + b} \\neq ${c}$ : l'égalité est fausse.`}` };
    }
    const k = rand(2, 5);
    const P = pick([[`la somme de deux nombres entiers consécutifs $n$ et $n + 1$`, "2n + 1", "un nombre impair", ["2n", "n + 1", "2(n + 1)"]], [`la somme de trois nombres entiers consécutifs $n$, $n + 1$ et $n + 2$`, "3n + 3", "un multiple de $3$, car $3n + 3 = 3(n + 1)$", ["3n", "n + 3", "3n + 2"]], [`la somme d'un nombre $n$ et de son double`, "3n", "un multiple de $3$", ["2n", "n^2 + n", "n + 2"]], [`le double de $n$ plus $${k * 2}$`, `2n + ${2 * k}`, `un nombre pair, car $2n + ${2 * k} = 2(n + ${k})$`, [`2(n + ${2 * k})`, `n + ${2 * k}`, `2n + ${k}`]]]);
    const { choix, attendu } = melange(`$${P[1]}$`, P[3].map((z) => `$${z}$`));
    return { enonce: `Quelle expression réduite est égale à ${P[0]} ?`, mode: "choix", choix, attendu,
      aides: ["Écris la somme avec les lettres, puis réduis-la.", "Regroupe les termes en $n$ et les nombres.", "Vérifie avec $n = 1$."], solution: `On obtient $${P[1]}$ : c'est toujours ${P[2]}. Le calcul littéral permet de le **démontrer** pour tous les nombres $n$.` };
  };

  /* =====================================================================
     Chapitre 12 : parallélogrammes (pg5-)
     ===================================================================== */
  const NOMS4 = [["A", "B", "C", "D"], ["E", "F", "G", "H"], ["M", "N", "P", "Q"], ["R", "S", "T", "U"], ["I", "J", "K", "L"]];
  // Quadrilatère codé : type parmi parallelogramme, rectangle, losange, carre ; codes selon ce qu'on montre
  function figureQuad(type, noms, montrer) {
    const [A, B, C, D] = noms, o = rand(-15, 15) * DEG;
    let P;
    if (type === "parallelogramme") P = [[50, 150], [210, 150], [270, 60], [110, 60]];
    if (type === "rectangle") P = [[60, 150], [260, 150], [260, 60], [60, 60]];
    if (type === "losange") P = [[160, 175], [235, 105], [160, 35], [85, 105]];
    if (type === "carre") P = [[95, 165], [225, 165], [225, 35], [95, 35]];
    const g = [160, 105], rot = ([x, y]) => [+(g[0] + (x - g[0]) * Math.cos(o) - (y - g[1]) * Math.sin(o)).toFixed(1), +(g[1] + (x - g[0]) * Math.sin(o) + (y - g[1]) * Math.cos(o)).toFixed(1)];
    P = P.map(rot);
    const pts = { [A]: P[0], [B]: P[1], [C]: P[2], [D]: P[3] }, Oc = [(P[0][0] + P[2][0]) / 2, (P[0][1] + P[2][1]) / 2].map((v) => +v.toFixed(1));
    const opt = { W: 320, H: 205, pts, segs: [[A, B], [B, C], [C, D], [D, A]], codes: [], droitAngle: [], caches: [], decal: {} };
    noms.forEach((n, i) => { const dx = P[i][0] - g[0], dy = P[i][1] - g[1], L = Math.hypot(dx, dy); opt.decal[n] = [Math.round((dx / L) * 13) - 3, Math.round((dy / L) * 13) + 4]; });
    if (montrer === "diagonales") { pts.O = Oc; opt.decal.O = [7, 14]; opt.segs.push([A, C], [B, D]); opt.codes.push([A, "O", 1], ["O", C, 1], [B, "O", 2], ["O", D, 2]);
      if (type === "rectangle" || type === "carre") { opt.codes = [[A, "O", 1], ["O", C, 1], [B, "O", 1], ["O", D, 1]]; }
      if (type === "losange" || type === "carre") opt.droitAngle.push([A, "O", B]); }
    else { // côtés
      if (type === "losange" || type === "carre") opt.codes.push([A, B, 1], [B, C, 1], [C, D, 1], [D, A, 1]); else opt.codes.push([A, B, 1], [C, D, 1], [B, C, 2], [D, A, 2]);
      if (type === "rectangle" || type === "carre") opt.droitAngle.push([B, A, D]); }
    return geo(Object.assign(opt, { aria: `Quadrilatère ${noms.join("")} codé` }));
  }
  const NOMS_Q = { parallelogramme: "un parallélogramme", rectangle: "un rectangle", losange: "un losange", carre: "un carré" };
  FIGURES["pg5-diagonales"] = () => figureQuad("parallelogramme", ["A", "B", "C", "D"], "diagonales").replace(/<svg[^>]*>/, (m) => m);
  FIGURES["pg5-losange"] = () => figureQuad("losange", ["A", "B", "C", "D"], "diagonales");

  GEN["pg5-proprietes"] = function () {
    const [A, B, C, D] = pick(NOMS4), t = rand(0, 4), x = Dc(rand(15, 95), 1), X1 = tD(x);
    if (t === 0) return { enonce: `$${A}${B}${C}${D}$ est un parallélogramme et $${A}${B} = ${X1}$ cm. Combien mesure $${C}${D}$ ?`, mode: "nombre", prefixe: `$${C}${D} =$`, suffixe: "cm", attendu: x.m / 10,
      aides: ["Dans un parallélogramme, les côtés opposés ont la même longueur.", `$[${A}${B}]$ et $[${C}${D}]$ sont des côtés opposés.`, "Aucun calcul n'est nécessaire."], solution: `Les côtés opposés d'un parallélogramme ont la même longueur : $${C}${D} = ${A}${B} = ${X1}$ cm.` };
    if (t === 1) { const d = Dc(x.m * 2, 1);
      return { enonce: `$${A}${B}${C}${D}$ est un parallélogramme de centre $O$ et $${A}${C} = ${tD(d)}$ cm. Combien mesure $${A}O$ ?`, mode: "nombre", prefixe: `$${A}O =$`, suffixe: "cm", attendu: x.m / 10, erreurs: [{ valeur: d.m / 10, message: "$O$ est le milieu de la diagonale : $AO$ en est la moitié." }],
        aides: ["Les diagonales d'un parallélogramme se coupent en leur milieu.", `$O$ est donc le milieu de $[${A}${C}]$.`, `$${A}O = ${A}${C} \\div 2$.`], solution: `$O$ est le milieu de $[${A}${C}]$ : $${A}O = ${tD(d)} \\div 2 = ${X1}$ cm.` }; }
    if (t === 2) { const a = rand(30, 150); if (a === 90) return GEN["pg5-proprietes"]();
      const q = rand(0, 1);
      return { enonce: `$${A}${B}${C}${D}$ est un parallélogramme et $\\widehat{${D}${A}${B}} = ${a}^\\circ$. Combien mesure $\\widehat{${q ? `${B}${C}${D}` : `${A}${B}${C}`}}$ ?`, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: q ? a : 180 - a,
        erreurs: [{ valeur: q ? 180 - a : a, message: q ? "Les angles opposés d'un parallélogramme sont égaux." : "Deux angles consécutifs d'un parallélogramme sont supplémentaires." }],
        aides: ["Dans un parallélogramme, deux angles opposés ont la même mesure.", "Deux angles consécutifs sont supplémentaires (leur somme vaut $180^\\circ$), car les côtés opposés sont parallèles.", q ? `$\\widehat{${A}}$ et $\\widehat{${C}}$ sont opposés.` : `$\\widehat{${A}}$ et $\\widehat{${B}}$ sont consécutifs.`],
        solution: q ? `$\\widehat{${A}}$ et $\\widehat{${C}}$ sont opposés : $\\widehat{${B}${C}${D}} = ${a}^\\circ$.` : `$\\widehat{${A}}$ et $\\widehat{${B}}$ sont consécutifs : $\\widehat{${A}${B}${C}} = 180^\\circ - ${a}^\\circ = ${180 - a}^\\circ$.` }; }
    if (t === 3) { const a = rand(3, 15), b = rand(2, a);
      return { enonce: `$${A}${B}${C}${D}$ est un parallélogramme avec $${A}${B} = ${a}$ cm et $${B}${C} = ${b}$ cm. Quel est son périmètre ?`, mode: "nombre", prefixe: "Périmètre :", suffixe: "cm", attendu: 2 * (a + b), erreurs: [{ valeur: a + b, message: "Il y a quatre côtés : chaque longueur apparaît deux fois." }],
        aides: ["Les côtés opposés ont la même longueur.", `$${C}${D} = ${a}$ cm et $${D}${A} = ${b}$ cm.`, "Additionne les quatre côtés."], solution: `$2 \\times (${a} + ${b}) = ${2 * (a + b)}$ cm.` }; }
    const c = rand(2, 15), type = pick(["losange", "carre"]);
    return { enonce: `$${A}${B}${C}${D}$ est ${NOMS_Q[type]} de côté $${c}$ cm. Quel est son périmètre ?`, mode: "nombre", prefixe: "Périmètre :", suffixe: "cm", attendu: 4 * c, erreurs: [{ valeur: c * c, message: "Ça, ce serait l'aire d'un carré. Le périmètre est la longueur du tour." }],
      aides: [`Un ${type === "carre" ? "carré" : "losange"} a quatre côtés de même longueur.`, "Le périmètre est la somme des quatre côtés.", `$4 \\times ${c}$.`], solution: `$4 \\times ${c} = ${4 * c}$ cm.` };
  };

  GEN["pg5-nature"] = function () {
    const [A, B, C, D] = pick(NOMS4), t = rand(0, 1);
    if (t === 0) {
      const type = pick(["parallelogramme", "rectangle", "losange", "carre"]), montrer = pick(["diagonales", "cotes"]);
      const choix = ["un parallélogramme quelconque", "un rectangle", "un losange", "un carré"], k = ["parallelogramme", "rectangle", "losange", "carre"].indexOf(type);
      const expl = montrer === "diagonales" ? ["Les diagonales ont le même milieu : c'est un parallélogramme. Rien de plus n'est codé.", "Les diagonales ont le même milieu et la même longueur : c'est un rectangle.", "Les diagonales ont le même milieu et sont perpendiculaires : c'est un losange.", "Les diagonales ont le même milieu, la même longueur et sont perpendiculaires : c'est un carré."][k]
        : ["Les côtés opposés ont la même longueur (deux à deux) : c'est un parallélogramme.", "Les côtés opposés ont la même longueur et il y a un angle droit : c'est un rectangle.", "Les quatre côtés ont la même longueur : c'est un losange.", "Les quatre côtés ont la même longueur et il y a un angle droit : c'est un carré."][k];
      return { enonce: `D'après les codages, quelle est la nature du quadrilatère $${A}${B}${C}${D}$ ?`, figure: figureQuad(type, [A, B, C, D], montrer), mode: "choix", choix, attendu: k,
        aides: ["Ne te fie qu'aux codages, pas à l'allure du dessin.", "Diagonales de même milieu : parallélogramme. De même longueur en plus : rectangle. Perpendiculaires en plus : losange. Les deux : carré.", "Côtés opposés égaux : parallélogramme. Quatre côtés égaux : losange. Un angle droit en plus : rectangle ou carré."], solution: expl };
    }
    const F = pick([
      ["Ses diagonales ont le même milieu.", 0], ["Ses côtés opposés sont parallèles deux à deux.", 0], ["Ses côtés opposés ont la même longueur deux à deux.", 0],
      ["Ses diagonales ont le même milieu et la même longueur.", 1], ["C'est un parallélogramme qui a un angle droit.", 1],
      ["Ses diagonales ont le même milieu et sont perpendiculaires.", 2], ["Ses quatre côtés ont la même longueur.", 2], ["C'est un parallélogramme qui a deux côtés consécutifs de même longueur.", 2],
      ["Ses diagonales ont le même milieu, la même longueur et sont perpendiculaires.", 3], ["C'est un losange qui a un angle droit.", 3], ["C'est un rectangle dont les diagonales sont perpendiculaires.", 3]
    ]);
    const choix = ["un parallélogramme (on ne peut pas en dire plus)", "un rectangle", "un losange", "un carré"];
    return { enonce: `On sait seulement ceci sur le quadrilatère $${A}${B}${C}${D}$ : « ${F[0]} » Que peut-on affirmer ?`, mode: "choix", choix, attendu: F[1],
      aides: ["Parallélogramme : diagonales de même milieu, ou côtés opposés parallèles, ou côtés opposés de même longueur.", "Rectangle : parallélogramme avec un angle droit, ou diagonales de même longueur. Losange : parallélogramme avec deux côtés consécutifs égaux, ou diagonales perpendiculaires.", "Carré : à la fois rectangle et losange."], solution: `« ${F[0]} » : on peut affirmer que c'est ${choix[F[1]].replace(" (on ne peut pas en dire plus)", "")}${F[1] === 0 ? ", sans pouvoir en dire plus" : ""}.` };
  };

  GEN["pg5-construire"] = function () {
    for (let e = 0; e < 500; e++) {
      const A = [rand(1, 6), rand(1, 4)], B = [A[0] + rand(3, 5), A[1] + rand(-1, 1)], C = [B[0] + rand(-2, 2), B[1] + rand(2, 3)];
      const D = [A[0] + C[0] - B[0], A[1] + C[1] - B[1]];
      const F = [[B[0] + C[0] - A[0], B[1] + C[1] - A[1]], [A[0] + B[0] - C[0], A[1] + B[1] - C[1]], [D[0] + pick([-2, 2]), D[1] + pick([-1, 1])], [D[0] + pick([-1, 1]), D[1] + pick([-2, 2])]];
      const cand = [D, ...F].filter(([x, y]) => x >= 0 && x <= 11 && y >= 0 && y <= 7);
      if (cand[0] !== D) continue;
      const uniq = []; cand.forEach((p) => { if (!uniq.some((q) => Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]) < 2) && ![A, B, C].some((q) => q[0] === p[0] && q[1] === p[1])) uniq.push(p); });
      if (uniq.length < 4 || uniq[0] !== D) continue;
      const L = shuffle(uniq.slice(0, 4).map((p, i) => ({ p, ok: i === 0 }))), noms = ["E", "F", "G", "H"], bon = L.findIndex((z) => z.ok);
      return { enonce: "Quel point faut-il prendre comme point $D$ pour que $ABCD$ soit un parallélogramme ?", figure: grilleC({ polys: [], points: [["A", A], ["B", B], ["C", C], ...L.map((z, i) => [noms[i], z.p, "g-point"])], aria: "Quadrillage avec les points A, B, C et quatre points E, F, G, H" }).replace("</svg>", `<polyline class="g-segment" points="${[A, B, C].map(([x, y]) => `${8 + x * 24},${8 + (8 - y) * 24}`).join(" ")}" fill="none"/></svg>`), mode: "choix", choix: noms.map((n) => `$${n}$`), attendu: bon,
        aides: ["Dans le parallélogramme $ABCD$, les côtés $[AB]$ et $[DC]$ sont parallèles et de même longueur : on va de $D$ à $C$ comme de $A$ à $B$.", "Compte les carreaux pour aller de $B$ à $A$.", "Fais le même déplacement à partir de $C$ : tu arrives en $D$."],
        solution: `On va de $B$ à $A$ par $${A[0] - B[0]}$ carreau(x) horizontalement et $${A[1] - B[1]}$ verticalement ; le même déplacement à partir de $C$ mène au point $${noms[bon]}$. Attention à l'ordre des lettres : $ABCD$ se lit en tournant.` };
    }
  };

  GEN["pg5-demontrer"] = function () {
    const [A, B, C, D] = pick(NOMS4), t = rand(0, 7);
    const Q = [
      [`On sait que $${A}${B} = ${C}${D}$ et $${A}${D} = ${B}${C}$ (le quadrilatère n'est pas croisé). Que peut-on en déduire ?`, `$${A}${B}${C}${D}$ est un parallélogramme`, [`$${A}${B}${C}${D}$ est un rectangle`, `$${A}${B}${C}${D}$ est un losange`, "on ne peut rien en déduire"]],
      [`On sait que $(${A}${B}) \\parallel (${C}${D})$ et $(${A}${D}) \\parallel (${B}${C})$. Que peut-on en déduire ?`, `$${A}${B}${C}${D}$ est un parallélogramme`, [`$${A}${B}${C}${D}$ est un carré`, `$${A}${B}${C}${D}$ est un rectangle`, "on ne peut rien en déduire"]],
      [`$${A}${B}${C}${D}$ est un losange dont les diagonales ont la même longueur. C'est donc :`, "un carré", ["un rectangle seulement", "un parallélogramme seulement", "un trapèze"]],
      [`$${A}${B}${C}${D}$ est un parallélogramme et $\\widehat{${A}${B}${C}} = 90^\\circ$. C'est donc :`, "un rectangle", ["un losange", "un carré", "un parallélogramme seulement"]],
      [`On veut démontrer que $${A}${B}${C}${D}$ est un parallélogramme. On sait que $[${A}${C}]$ et $[${B}${D}]$ ont le même milieu. Quelle propriété utilise-t-on ?`, "Si les diagonales d'un quadrilatère ont le même milieu, alors c'est un parallélogramme.", ["Si un quadrilatère a quatre côtés, alors c'est un parallélogramme.", "Si les diagonales d'un quadrilatère sont perpendiculaires, alors c'est un parallélogramme.", "Si un quadrilatère est un parallélogramme, alors ses diagonales ont le même milieu."]],
      [`$${A}${B}${C}${D}$ est un parallélogramme. On veut démontrer que c'est un rectangle. Quelle information suffit ?`, `$${A}${C} = ${B}${D}$`, [`$${A}${B} = ${C}${D}$`, `$(${A}${B}) \\parallel (${C}${D})$`, `$[${A}${C}]$ et $[${B}${D}]$ ont le même milieu`]],
      [`$${A}${B}${C}${D}$ est un parallélogramme. On veut démontrer que c'est un losange. Quelle information suffit ?`, `$(${A}${C}) \\perp (${B}${D})$`, [`$${A}${C} = ${B}${D}$`, `$${A}${B} = ${C}${D}$`, `$\\widehat{${A}${B}${C}} = 90^\\circ$`]],
      [`$${A}${B}${C}${D}$ est un rectangle. On veut démontrer que c'est un carré. Quelle information suffit ?`, `$${A}${B} = ${B}${C}$`, [`$${A}${C} = ${B}${D}$`, `$\\widehat{${A}${B}${C}} = 90^\\circ$`, `$(${A}${B}) \\parallel (${C}${D})$`]]
    ].slice(t, t + 1)[0] || null;
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu,
      aides: ["Une propriété de démonstration commence par « Si » (ce qu'on sait) et se termine par « alors » (ce qu'on veut prouver).", "Rectangle : un parallélogramme dont les diagonales ont la même longueur (ou qui a un angle droit). Losange : un parallélogramme dont les diagonales sont perpendiculaires (ou qui a deux côtés consécutifs égaux).", "Carré : un rectangle qui est aussi un losange."], solution: `Réponse : ${Q[1]}` };
  };

  /* =====================================================================
     Chapitre 13 : statistiques (st5-)
     ===================================================================== */
  const { diagrammeBarres, diagrammeCirculaire } = window.PM_EXO.college;
  const SERIES_ST = [
    ["Notes sur 10 à un contrôle", () => rand(2, 10), "élèves"],
    ["Nombre de frères et sœurs des élèves d'une classe", () => rand(0, 5), "élèves"],
    ["Pointures des élèves d'une classe", () => rand(36, 42), "élèves"],
    ["Nombre de buts marqués à chaque match par le club de football", () => rand(0, 4), "matchs"]
  ];
  const listeTex = (L) => L.join(" \\; ; \\; ");

  GEN["st5-effectifs"] = function () {
    const [titre, g, unite] = pick(SERIES_ST), n = rand(12, 20), L = Array.from({ length: n }, g), t = rand(0, 2);
    if (t === 0) {
      const v = pick(L), eff = L.filter((x) => x === v).length;
      return { enonce: `${titre} : $${listeTex(L)}$. Quel est l'effectif de la valeur $${v}$ ?`, mode: "nombre", prefixe: "Effectif :", attendu: eff,
        aides: ["L'effectif d'une valeur est le nombre de fois où elle apparaît.", "Barre chaque valeur au fur et à mesure pour ne pas l'oublier.", `Compte les $${v}$.`], solution: `La valeur $${v}$ apparaît $${eff}$ fois : son effectif est $${eff}$.` };
    }
    if (t === 1) return { enonce: `${titre} : $${listeTex(L)}$. Quel est l'effectif total ?`, mode: "nombre", prefixe: "Effectif total :", attendu: n,
      aides: ["L'effectif total est le nombre de données de la série.", "Compte toutes les valeurs, même celles qui se répètent.", "Tu peux les compter par paquets de $5$."], solution: `La série contient $${n}$ valeurs : l'effectif total est $${n}$ ${unite}.` };
    const s = rand(0, 1), seuil = pick([...new Set(L)].sort((a, b) => a - b).slice(1, -1).concat([L[0]])), eff = L.filter((x) => (s ? x >= seuil : x < seuil)).length;
    return { enonce: `${titre} : $${listeTex(L)}$. Combien de valeurs sont ${s ? "supérieures ou égales à" : "strictement inférieures à"} $${seuil}$ ?`, mode: "nombre", prefixe: "Nombre :", attendu: eff,
      aides: [s ? `Compte les valeurs égales à $${seuil}$ ou plus grandes.` : `Compte les valeurs plus petites que $${seuil}$, sans compter $${seuil}$.`, "Barre-les au fur et à mesure.", "Vérifie ton comptage une deuxième fois."], solution: `Il y a $${eff}$ valeurs ${s ? `supérieures ou égales à $${seuil}$` : `strictement inférieures à $${seuil}$`}.` };
  };

  GEN["st5-frequences"] = function () {
    const T = pick([20, 25, 40, 50, 200]), cats = shuffle(["Bus", "À pied", "Voiture", "Scooter", "Taxi", "Vélo"].slice()).slice(0, 4);
    let v; for (;;) { v = [rand(1, T / 2), rand(1, T / 2), rand(1, T / 3)]; const r = T - v.reduce((a, b) => a + b, 0); if (r >= 1) { v.push(r); break; } }
    const i = rand(0, 3), f = v[i] / T, t = rand(0, 1), tab = { lignes: [["\\text{Transport}", "\\text{Effectif}"], ...cats.map((c, k) => [`\\text{${c}}`, v[k]]), ["\\text{Total}", T]] };
    if (t === 0) return { enonce: `Ce tableau donne le moyen de transport des élèves interrogés. Quelle est la fréquence de la catégorie « ${cats[i]} », en pourcentage ?`, tableau: tab, mode: "nombre", prefixe: "Fréquence :", suffixe: "%", attendu: f * 100,
      erreurs: [{ valeur: v[i], message: "Ça, c'est l'effectif. La fréquence est l'effectif divisé par l'effectif total." }],
      aides: ["Fréquence $=$ effectif de la catégorie $\\div$ effectif total.", `$\\dfrac{${v[i]}}{${T}}$.`, "Multiplie par $100$ pour l'écrire en pourcentage."], solution: `$\\dfrac{${v[i]}}{${T}} = ${nb(f)}$, soit $${nb(f * 100)}\\,\\%$.` };
    return { enonce: `Ce tableau donne le moyen de transport des élèves interrogés. Quelle est la fréquence de la catégorie « ${cats[i]} », en écriture décimale ?`, tableau: tab, mode: "nombre", prefixe: "Fréquence :", attendu: f,
      erreurs: [{ valeur: f * 100, message: "Ça, c'est la fréquence en pourcentage. On la demande en écriture décimale (entre $0$ et $1$)." }, { valeur: v[i], message: "Ça, c'est l'effectif." }],
      aides: ["Fréquence $=$ effectif de la catégorie $\\div$ effectif total.", `$${v[i]} \\div ${T}$.`, "Une fréquence est toujours comprise entre $0$ et $1$."], solution: `$${v[i]} \\div ${T} = ${nb(f)}$.` };
  };

  GEN["st5-moyenne"] = function () {
    const t = rand(0, 2);
    if (t <= 1) {
      for (;;) {
        const n = rand(4, 8), L = Array.from({ length: n }, () => (t === 0 ? rand(5, 20) : rand(20, 35))), s = L.reduce((a, b) => a + b, 0), m = s / n;
        if (!Number.isInteger(m * 10)) continue;
        const ctx = t === 0 ? ["Voici les notes sur $20$ de Faïza ce trimestre", "Quelle est sa moyenne ?", ""] : ["Voici les températures maximales (en °C) relevées à Mamoudzou pendant plusieurs jours", "Quelle est la température moyenne ?", "°C"];
        return { enonce: `${ctx[0]} : $${listeTex(L)}$. ${ctx[1]}`, mode: "nombre", prefixe: "Moyenne :", suffixe: ctx[2], attendu: m,
          erreurs: [{ valeur: s, message: "Il faut encore diviser la somme par le nombre de valeurs." }],
          aides: ["Moyenne $=$ somme des valeurs $\\div$ nombre de valeurs.", `Somme : $${L.join(" + ")}$.`, `Il y a $${n}$ valeurs.`], solution: `Somme : $${s}$. Moyenne : $${s} \\div ${n} = ${nb(m)}$${ctx[2] ? " °C" : ""}.` };
      }
    }
    const n = rand(3, 5), L = Array.from({ length: n }, () => rand(8, 16)), m = rand(11, 14), x = m * (n + 1) - L.reduce((a, b) => a + b, 0);
    if (x < 0 || x > 20) return GEN["st5-moyenne"]();
    return { enonce: `Tom a eu les notes $${listeTex(L)}$. Quelle note doit-il obtenir au prochain contrôle pour avoir exactement $${m}$ de moyenne sur l'ensemble des $${n + 1}$ notes ?`, mode: "nombre", prefixe: "Note :", attendu: x,
      aides: [`Avec $${n + 1}$ notes et une moyenne de $${m}$, la somme des notes doit être $${n + 1} \\times ${m} = ${(n + 1) * m}$.`, `Somme des notes déjà obtenues : $${L.reduce((a, b) => a + b, 0)}$.`, "La note manquante est la différence."], solution: `Somme nécessaire : $${(n + 1) * m}$. Somme actuelle : $${L.reduce((a, b) => a + b, 0)}$. Note à obtenir : $${(n + 1) * m} - ${L.reduce((a, b) => a + b, 0)} = ${x}$.` };
  };

  GEN["st5-diagrammes"] = function () {
    const t = rand(0, 3);
    if (t === 0) {
      const cats = shuffle(["Foot", "Basket", "Hand", "Natation", "Danse", "Judo"].slice()).slice(0, 4).map((c) => [c, rand(1, 12)]), i = rand(0, 3);
      return { enonce: `Le diagramme donne le sport préféré des élèves d'une classe. Combien d'élèves ont choisi « ${cats[i][0]} » ?`, figure: diagrammeBarres(cats, 2, "élèves"), mode: "nombre", prefixe: "Effectif :", suffixe: "élèves", attendu: cats[i][1],
        aides: ["Repère la barre de la catégorie.", "Lis sa hauteur sur l'axe vertical.", "Chaque graduation vaut $2$ élèves : attention aux valeurs impaires, entre deux graduations."], solution: `La barre « ${cats[i][0]} » monte jusqu'à $${cats[i][1]}$ : $${cats[i][1]}$ élèves.` };
    }
    if (t === 1) {
      const p = pick([10, 20, 25, 30, 40, 50, 60, 75, 15, 5, 35, 45]);
      return { enonce: `Dans un diagramme circulaire, quel angle doit avoir le secteur d'une catégorie dont la fréquence est $${p}\\,\\%$ ?`, mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: 3.6 * p,
        erreurs: [{ valeur: p, message: "Le disque entier fait $360^\\circ$, pas $100^\\circ$." }],
        aides: ["Le disque entier ($100\\,\\%$) correspond à $360^\\circ$.", "Les angles sont proportionnels aux fréquences.", `$1\\,\\%$ correspond à $3{,}6^\\circ$.`], solution: `$360^\\circ \\times ${p} \\div 100 = ${nb(3.6 * p)}^\\circ$.` };
    }
    if (t === 2) {
      const T = pick([20, 24, 30, 36, 40, 60]), e = rand(1, T - 1), a = (e / T) * 360;
      if (!Number.isInteger(a)) return GEN["st5-diagrammes"]();
      return { enonce: `Sur $${T}$ élèves, $${e}$ viennent au collège en bus. Quel angle doit avoir le secteur « bus » dans un diagramme circulaire ?`, mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: a,
        aides: [`$${T}$ élèves correspondent à $360^\\circ$.`, `Un élève correspond à $360 \\div ${T} = ${360 / T}^\\circ$.`, `Multiplie par $${e}$.`], solution: `$360 \\div ${T} \\times ${e} = ${a}^\\circ$.` };
    }
    const C = pick([
      ["la répartition des élèves du collège selon leur moyen de transport, pour voir la part de chacun dans le total", 1],
      ["l'évolution de la température à Mamoudzou heure par heure au cours d'une journée", 2],
      ["le nombre d'élèves de chaque classe du collège, pour les comparer", 0],
      ["la part de chaque dépense dans le budget d'une famille", 1],
      ["l'évolution du nombre d'habitants de Mayotte année après année", 2],
      ["le nombre de buts marqués par chaque joueur d'une équipe", 0],
      ["la répartition des votes entre les candidats, pour voir qui a la plus grosse part", 1],
      ["l'évolution de la hauteur d'une plante semaine après semaine", 2],
      ["le nombre de tortues observées sur chaque plage de l'île", 0],
      ["la part des différentes espèces de poissons dans une pêche", 1],
      ["l'évolution du niveau de la mer pendant une marée", 2],
      ["le nombre de livres empruntés au CDI chaque jour de la semaine, pour comparer les jours", 0]
    ]);
    const choix = ["un diagramme en barres", "un diagramme circulaire", "un graphique cartésien (une courbe)"];
    return { enonce: `Quelle représentation est la plus adaptée pour montrer ${C[0]} ?`, mode: "choix", choix, attendu: C[1],
      aides: ["Diagramme en barres : comparer des effectifs de catégories.", "Diagramme circulaire : montrer la part de chaque catégorie dans un tout.", "Graphique cartésien : montrer une évolution (en fonction du temps)."], solution: `Il s'agit de ${["comparer des effectifs de catégories", "montrer les parts d'un tout", "montrer une évolution dans le temps"][C[1]]} : on choisit ${choix[C[1]]}.` };
  };

  /* =====================================================================
     Chapitre 14 : équations (eq5-) — tester une égalité, x + b = c, ax = c
     ===================================================================== */
  GEN["eq5-tester"] = function () {
    for (let e = 0; e < 200; e++) {
      const x = pick(LET), a = rand(2, 6), b = rand(1, 12), c = rand(1, a - 1), s = rand(0, 9);
      // a x - b = c x + d avec solution s
      const d = a * s - b - c * s; if (d <= 0 || d > 30) continue;
      const cand = shuffle([s, s + 1, s + 2, Math.max(0, s - 1), s + 3, b].filter((v, i, T) => T.indexOf(v) === i)).slice(0, 4);
      if (!cand.includes(s)) cand[0] = s;
      const C = shuffle(cand.slice());
      const cx = c === 1 ? x : `${c}${x}`;
      return { enonce: `Lequel de ces nombres est solution de l'équation $${a}${x} - ${b} = ${cx} + ${d}$ ?`, mode: "choix", choix: C.map((v) => `$${v}$`), attendu: C.indexOf(s),
        aides: [`Un nombre est solution si, en remplaçant $${x}$ par ce nombre, les deux membres sont égaux.`, "Teste chaque nombre : calcule le membre de gauche, puis celui de droite.", `Pour $${x} = ${C[0]}$ : à gauche $${a} \\times ${C[0]} - ${b} = ${a * C[0] - b}$, à droite $${c} \\times ${C[0]} + ${d} = ${c * C[0] + d}$.`],
        solution: `Pour $${x} = ${s}$ : $${a} \\times ${s} - ${b} = ${a * s - b}$ et $${c} \\times ${s} + ${d} = ${c * s + d}$. Les deux membres sont égaux : $${s}$ est solution. ${C.filter((v) => v !== s).map((v) => `Pour $${v}$ : $${a * v - b} \\neq ${c * v + d}$`).join(" ; ")}.` };
    }
  };

  GEN["eq5-plus"] = function () {
    const x = pick(LET), dec = Math.random() < 0.3, b = dec ? rand(11, 99) / 10 : rand(2, 40), s = dec ? rand(11, 99) / 10 : rand(1, 60), moins = Math.random() < 0.35;
    const c = +(moins ? s - b : s + b).toFixed(2); if (c < 0) return GEN["eq5-plus"]();
    const op = moins ? "-" : "+";
    return { enonce: `Résous l'équation $${x} ${op} ${nb(b)} = ${nb(c)}$.`, mode: "nombre", prefixe: `$${x} =$`, attendu: s,
      erreurs: [{ valeur: +(moins ? c - b : c + b).toFixed(2), message: `Il faut faire l'opération **contraire** : pour enlever « $${op} ${nb(b)}$ », on ${moins ? "ajoute" : "soustrait"} $${nb(b)}$.` }],
      aides: [`On cherche le nombre $${x}$ qui, ${moins ? "diminué" : "augmenté"} de $${nb(b)}$, donne $${nb(c)}$.`, `L'opération contraire de « $${op} ${nb(b)}$ » est « $${moins ? "+" : "-"} ${nb(b)}$ ».`, `$${x} = ${nb(c)} ${moins ? "+" : "-"} ${nb(b)}$.`],
      solution: `$${x} = ${nb(c)} ${moins ? "+" : "-"} ${nb(b)} = ${nb(s)}$. Vérification : $${nb(s)} ${op} ${nb(b)} = ${nb(c)}$.` };
  };

  GEN["eq5-fois"] = function () {
    const x = pick(LET), a = rand(2, 12), dec = Math.random() < 0.3, s = dec ? rand(11, 99) / 10 : rand(2, 30), c = +(a * s).toFixed(2), t = rand(0, 3);
    if (t === 0) {
      const q = rand(2, 9), r = rand(2, 15);
      return { enonce: `Résous l'équation $\\dfrac{${x}}{${q}} = ${r}$.`, mode: "nombre", prefixe: `$${x} =$`, attendu: q * r,
        erreurs: [{ valeur: r / q, message: "L'opération contraire de « diviser par » est « multiplier par »." }],
        aides: [`On cherche le nombre qui, divisé par $${q}$, donne $${r}$.`, "L'opération contraire de la division est la multiplication.", `$${x} = ${r} \\times ${q}$.`], solution: `$${x} = ${r} \\times ${q} = ${q * r}$. Vérification : $${q * r} \\div ${q} = ${r}$.` };
    }
    return { enonce: `Résous l'équation $${a}${x} = ${nb(c)}$.`, mode: "nombre", prefixe: `$${x} =$`, attendu: s,
      erreurs: [{ valeur: +(c - a).toFixed(2), message: `$${a}${x}$ signifie $${a} \\times ${x}$ : on divise par $${a}$, on ne soustrait pas.` }, { valeur: c * a, message: `On divise par $${a}$, on ne multiplie pas.` }],
      aides: [`$${a}${x}$ signifie $${a} \\times ${x}$.`, `On cherche le nombre qui, multiplié par $${a}$, donne $${nb(c)}$.`, `$${x} = ${nb(c)} \\div ${a}$.`],
      solution: `$${x} = ${nb(c)} \\div ${a} = ${nb(s)}$. Vérification : $${a} \\times ${nb(s)} = ${nb(c)}$.` };
  };

  GEN["eq5-modeliser"] = function () {
    const t = rand(0, 5), a = rand(2, 9), b = rand(3, 40), n = pick(["Awa", "Moussa", "Nasma", "Ibrahim", "Faïza", "Zaïd"]);
    const P = [
      [`Le triple d'un nombre $x$ est égal à $${3 * b}$.`, `3x = ${3 * b}`, [`x + 3 = ${3 * b}`, `x = 3 \\times ${3 * b}`, `\\dfrac{3}{x} = ${3 * b}`]],
      [`Dans $${a}$ ans, ${n} aura $${b + a}$ ans. On note $x$ son âge actuel.`, `x + ${a} = ${b + a}`, [`${a}x = ${b + a}`, `x - ${a} = ${b + a}`, `x = ${b + a} + ${a}`]],
      [`${n} achète $${a}$ cahiers identiques et paie $${a * b}$ €. On note $x$ le prix d'un cahier.`, `${a}x = ${a * b}`, [`x + ${a} = ${a * b}`, `x = ${a} \\times ${a * b}`, `\\dfrac{x}{${a}} = ${a * b}`]],
      [`Un bus transporte des élèves. Après le départ de $${a}$ élèves, il en reste $${b}$. On note $x$ le nombre d'élèves au départ.`, `x - ${a} = ${b}`, [`x + ${a} = ${b}`, `${a}x = ${b}`, `${a} - x = ${b}`]],
      [`On partage équitablement une somme $x$ entre $${a}$ personnes : chacune reçoit $${b}$ €.`, `\\dfrac{x}{${a}} = ${b}`, [`${a}x = ${b}`, `x - ${a} = ${b}`, `\\dfrac{${a}}{x} = ${b}`]],
      [`Le périmètre d'un carré de côté $x$ (en cm) est égal à $${4 * b}$ cm.`, `4x = ${4 * b}`, [`x^2 = ${4 * b}`, `x + 4 = ${4 * b}`, `2x = ${4 * b}`]]
    ][t];
    const { choix, attendu } = melange(`$${P[1]}$`, P[2].map((z) => `$${z}$`));
    return { enonce: `${P[0]} Quelle équation traduit la situation ?`, mode: "choix", choix, attendu,
      aides: ["La lettre $x$ représente le nombre inconnu.", "Traduis la phrase mot à mot : « triple » $\\to 3x$, « dans $5$ ans » $\\to x + 5$, « partager » $\\to$ diviser.", "Vérifie avec la réponse attendue : l'égalité doit être vraie."], solution: `La situation se traduit par $${P[1]}$.` };
  };

  GEN["eq5-problemes"] = function () {
    const t = rand(0, 3), n = pick(["Awa", "Moussa", "Nasma", "Ibrahim", "Faïza", "Zaïd"]), a = rand(3, 9), b = rand(4, 30);
    if (t === 0) return { enonce: `${n} pense à un nombre. En le multipliant par $${a}$, on obtient $${a * b}$. Quel est ce nombre ?`, mode: "nombre", prefixe: "Nombre :", attendu: b,
      aides: ["Appelle $x$ le nombre cherché.", `L'équation est $${a}x = ${a * b}$.`, `$x = ${a * b} \\div ${a}$.`], solution: `$${a}x = ${a * b}$ donc $x = ${a * b} \\div ${a} = ${b}$.` };
    if (t === 1) { const p = rand(2, 9) * 50, pt = rand(2, 9);
      return { enonce: `Un colis pèse $${p * pt}$ g. Il contient $${pt}$ boîtes de même masse. Quelle est la masse d'une boîte ? (On néglige l'emballage.)`, mode: "nombre", prefixe: "Masse :", suffixe: "g", attendu: p,
        aides: ["Appelle $x$ la masse d'une boîte.", `L'équation est $${pt}x = ${p * pt}$.`, `$x = ${p * pt} \\div ${pt}$.`], solution: `$${pt}x = ${p * pt}$ donc $x = ${p * pt} \\div ${pt} = ${p}$ g.` }; }
    if (t === 2) return { enonce: `Après avoir reçu $${a}$ €, ${n} a $${b + a}$ € dans sa tirelire. Combien avait-${["Awa", "Nasma", "Faïza"].includes(n) ? "elle" : "il"} avant ?`, mode: "nombre", prefixe: "Somme :", suffixe: "€", attendu: b,
      erreurs: [{ valeur: b + 2 * a, message: "Il faut retirer ce qu'on a reçu, pas l'ajouter." }],
      aides: ["Appelle $x$ la somme de départ.", `L'équation est $x + ${a} = ${b + a}$.`, `$x = ${b + a} - ${a}$.`], solution: `$x + ${a} = ${b + a}$ donc $x = ${b + a} - ${a} = ${b}$ €.` };
    const k = rand(2, 5), tot = (k + 1) * b;
    return { enonce: `${n} et son frère ont ensemble $${tot}$ billes. Le frère en a $${k}$ fois plus que ${n}. Combien de billes a ${n} ?`, mode: "nombre", prefixe: "Billes :", attendu: b,
      erreurs: [{ valeur: tot / k, message: `${n} a $x$ billes et son frère $${k}x$ : ensemble, ils en ont $${k + 1}x$.` }],
      aides: [`Appelle $x$ le nombre de billes de ${n}. Son frère en a $${k}x$.`, `Ensemble : $x + ${k}x = ${k + 1}x$.`, `L'équation est $${k + 1}x = ${tot}$.`], solution: `$x + ${k}x = ${tot}$, soit $${k + 1}x = ${tot}$, donc $x = ${tot} \\div ${k + 1} = ${b}$ billes.` };
  };

  /* =====================================================================
     Chapitre 15 : aires (ai5-)
     ===================================================================== */
  const arr = (x, k) => Math.round(x * 10 ** k) / 10 ** k;
  const UNA = [["mm²", -2], ["cm²", -1], ["dm²", 0], ["m²", 1], ["dam²", 2], ["hm²", 3], ["km²", 4]];
  // Triangle avec une hauteur tracée (base horizontale), longueurs écrites
  function figureAireTri(b, h, obtus) {
    const W = 320, H = 190, x0 = 50, y0 = 160, L = 210, hp = 120, hx = obtus ? x0 + L + 40 : x0 + rand(50, 160);
    const A = [x0, y0], B = [x0 + L, y0], C = [hx, y0 - hp], K = [hx, y0];
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="Triangle ABC, base [AB] de ${b} cm, hauteur CK de ${h} cm">`;
    if (obtus) s += `<line class="g-droite" x1="${B[0]}" y1="${y0}" x2="${K[0] + 12}" y2="${y0}" stroke-dasharray="4 4"/>`;
    s += `<polygon class="g-poly" points="${[A, B, C].map((p) => p.join(",")).join(" ")}"/><line class="g-cache" x1="${C[0]}" y1="${C[1]}" x2="${K[0]}" y2="${K[1]}"/>`;
    s += `<path class="g-code" d="M${K[0] - 9} ${y0}v-9h9"/>`;
    s += `<text class="g-mesure" x="${(A[0] + B[0]) / 2}" y="${y0 + 18}" text-anchor="middle">${String(b).replace(".", ",")} cm</text><text class="g-mesure" x="${K[0] + 6}" y="${y0 - hp / 2}">${String(h).replace(".", ",")} cm</text>`;
    [["A", A, [-14, 4]], ["B", B, [6, 4]], ["C", C, [-4, -8]], ["K", K, [4, 16]]].forEach(([n, p, d]) => { s += `<text class="g-plabel" x="${p[0] + d[0]}" y="${p[1] + d[1]}">${n}</text>`; });
    return s + `</svg>`;
  }
  FIGURES["ai5-triangle"] = () => figureAireTri(8, 5, false);

  GEN["ai5-conversions"] = function () {
    const i = rand(0, 5), d = pick([1, -1]) * rand(1, 2), j = i + d; if (j < 0 || j > 6) return GEN["ai5-conversions"]();
    const v = pick([rand(1, 99), rand(11, 999) / 10, rand(1, 9) / 100 * 100, rand(101, 9999) / 100]), r = arr(v * 100 ** (UNA[i][1] - UNA[j][1]), 8);
    if (r < 0.0001 || r > 1e7) return GEN["ai5-conversions"]();
    return { enonce: `Convertis : $${nb(v)}$ ${UNA[i][0]} $= \\ldots$ ${UNA[j][0]}`, mode: "nombre", prefixe: "Résultat :", suffixe: UNA[j][0], attendu: r,
      erreurs: [{ valeur: arr(v * 10 ** (UNA[i][1] - UNA[j][1]), 8), message: "Pour les aires, on passe d'une unité à la suivante en multipliant ou en divisant par $100$, pas par $10$." }],
      aides: ["$1$ m² $= 100$ dm² : entre deux unités d'aire voisines, il y a un facteur $100$.", `De ${UNA[i][0]} à ${UNA[j][0]}, on ${UNA[i][1] > UNA[j][1] ? "multiplie" : "divise"} par $${nb(100 ** Math.abs(d))}$.`, "Dans un tableau de conversion, chaque unité d'aire occupe deux colonnes."],
      solution: `$${nb(v)}$ ${UNA[i][0]} $= ${nb(r)}$ ${UNA[j][0]} (on ${UNA[i][1] > UNA[j][1] ? "multiplie" : "divise"} par $${nb(100 ** Math.abs(d))}$).` };
  };

  GEN["ai5-triangle"] = function () {
    const t = rand(0, 2), b = rand(3, 15), h = rand(2, 12);
    if (t === 0) { const obtus = Math.random() < 0.3;
      return { enonce: `Calcule l'aire du triangle $ABC$ (la hauteur $[CK]$ est perpendiculaire à $(AB)$).`, figure: figureAireTri(b, h, obtus), mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: (b * h) / 2,
        erreurs: [{ valeur: b * h, message: "N'oublie pas de diviser par $2$ : un triangle est la moitié d'un rectangle." }],
        aides: ["Aire d'un triangle $= \\dfrac{\\text{base} \\times \\text{hauteur}}{2}$.", `Ici la base est $[AB]$ ($${b}$ cm) et la hauteur relative est $CK$ ($${h}$ cm).`, `$\\dfrac{${b} \\times ${h}}{2}$.`], solution: `$\\mathcal{A} = \\dfrac{${b} \\times ${h}}{2} = \\dfrac{${b * h}}{2} = ${nb((b * h) / 2)}$ cm².` }; }
    if (t === 1) { const a = rand(3, 12), c = rand(3, 12);
      return { enonce: `Un triangle est rectangle ; les deux côtés de l'angle droit mesurent $${a}$ cm et $${c}$ cm. Quelle est son aire ?`, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: (a * c) / 2,
        erreurs: [{ valeur: a * c, message: "Divise par $2$ : le triangle est la moitié d'un rectangle." }],
        aides: ["Dans un triangle rectangle, un côté de l'angle droit est la hauteur relative à l'autre.", "Aire $= \\dfrac{\\text{base} \\times \\text{hauteur}}{2}$.", `$\\dfrac{${a} \\times ${c}}{2}$.`], solution: `$\\mathcal{A} = \\dfrac{${a} \\times ${c}}{2} = ${nb((a * c) / 2)}$ cm².` }; }
    const A = (b * h) / 2;
    return { enonce: `Un triangle a une aire de $${nb(A)}$ cm² et une base de $${b}$ cm. Quelle est la hauteur relative à cette base ?`, mode: "nombre", prefixe: "Hauteur :", suffixe: "cm", attendu: h,
      erreurs: [{ valeur: A / b, message: "Attention : $\\dfrac{b \\times h}{2} = \\mathcal{A}$, donc $b \\times h = 2 \\times \\mathcal{A}$." }],
      aides: ["$\\dfrac{\\text{base} \\times \\text{hauteur}}{2} = \\text{aire}$.", `Donc $${b} \\times h = 2 \\times ${nb(A)} = ${nb(2 * A)}$.`, `$h = ${nb(2 * A)} \\div ${b}$.`], solution: `$${b} \\times h = ${nb(2 * A)}$ donc $h = ${nb(2 * A)} \\div ${b} = ${h}$ cm.` };
  };

  GEN["ai5-parallelogramme"] = function () {
    const b = rand(3, 15), h = rand(2, 12), c = h + rand(1, 5), t = rand(0, 1);
    if (t === 0) return { enonce: `Un parallélogramme a un côté de $${b}$ cm. La hauteur relative à ce côté mesure $${h}$ cm, et l'autre côté mesure $${c}$ cm. Quelle est son aire ?`, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: b * h,
      erreurs: [{ valeur: b * c, message: "On utilise la hauteur (perpendiculaire à la base), pas le côté penché." }, { valeur: (b * h) / 2, message: "C'est l'aire d'un triangle : pour un parallélogramme, on ne divise pas par $2$." }],
      aides: ["Aire d'un parallélogramme $=$ base $\\times$ hauteur.", "La hauteur est perpendiculaire à la base ; le côté penché ne sert pas.", `$${b} \\times ${h}$.`], solution: `$\\mathcal{A} = ${b} \\times ${h} = ${b * h}$ cm² (le côté de $${c}$ cm ne sert pas).` };
    const d1 = rand(2, 12) * 2, d2 = rand(2, 12);
    return { enonce: `Un losange a des diagonales de $${d1}$ cm et $${d2}$ cm. Il est formé de deux triangles de base $${d1}$ cm et de hauteur $${nb(d2 / 2)}$ cm. Quelle est son aire ?`, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: (d1 * d2) / 2,
      erreurs: [{ valeur: d1 * d2, message: "Chaque triangle a pour aire $\\dfrac{\\text{base} \\times \\text{hauteur}}{2}$." }],
      aides: ["La diagonale de $" + d1 + "$ cm partage le losange en deux triangles identiques.", `Aire d'un triangle : $\\dfrac{${d1} \\times ${nb(d2 / 2)}}{2}$.`, "Multiplie par $2$."], solution: `Un triangle : $\\dfrac{${d1} \\times ${nb(d2 / 2)}}{2} = ${nb((d1 * d2) / 4)}$ cm². Le losange : $2 \\times ${nb((d1 * d2) / 4)} = ${nb((d1 * d2) / 2)}$ cm².` };
  };

  GEN["ai5-disque"] = function () {
    const t = rand(0, 2), r = Math.random() < 0.4 ? rand(11, 99) / 10 : rand(2, 20), dia = Math.random() < 0.4;
    if (t <= 1) { const v = arr(Math.PI * r * r, 1), v314 = arr(3.14 * r * r, 1);
      return { enonce: `Calcule l'aire d'un disque de ${dia ? `diamètre $${nb(2 * r)}$ cm` : `rayon $${nb(r)}$ cm`}. Donne la valeur arrondie au dixième de cm², avec la touche $\\pi$ de la calculatrice.`, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: v,
        erreurs: [{ valeur: arr(2 * Math.PI * r, 1), message: "Ça, c'est le périmètre du cercle. L'aire du disque est $\\pi \\times r \\times r$." }, ...(dia ? [{ valeur: arr(Math.PI * 4 * r * r, 1), message: "Le diamètre n'est pas le rayon : le rayon est la moitié du diamètre." }] : []), ...(v314 !== v ? [{ valeur: v314, message: "Utilise la touche $\\pi$ de la calculatrice, pas $3{,}14$." }] : [])],
        aides: ["Aire d'un disque $= \\pi \\times r \\times r$, où $r$ est le rayon.", dia ? `Le rayon est la moitié du diamètre : $r = ${nb(r)}$ cm.` : `Ici, $r = ${nb(r)}$ cm.`, `$\\pi \\times ${nb(r)} \\times ${nb(r)} \\approx ${nb(arr(Math.PI * r * r, 3))}$.`],
        solution: `$\\mathcal{A} = \\pi \\times ${nb(r)} \\times ${nb(r)} = ${nb(arr(r * r, 4))}\\pi \\approx ${nb(v)}$ cm².` }; }
    const a = rand(4, 12) * 2, v = arr(a * a - Math.PI * (a / 2) ** 2, 1);
    return { enonce: `On découpe le plus grand disque possible dans un carré de côté $${a}$ cm. Quelle est l'aire des chutes ? Donne la valeur arrondie au dixième de cm².`, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: v,
      aides: [`Le disque a pour diamètre $${a}$ cm, donc pour rayon $${a / 2}$ cm.`, `Aire du carré : $${a * a}$ cm². Aire du disque : $\\pi \\times ${a / 2} \\times ${a / 2}$.`, "Chutes $=$ carré $-$ disque."],
      solution: `$${a * a} - \\pi \\times ${a / 2}^2 \\approx ${a * a} - ${nb(arr(Math.PI * (a / 2) ** 2, 2))} \\approx ${nb(v)}$ cm².` };
  };

  GEN["ai5-composees"] = function () {
    const t = rand(0, 2), L = rand(6, 15), l = rand(4, 10);
    if (t === 0) { const a = rand(2, L - 2), b = rand(2, l - 2);
      return { enonce: `Une pièce a la forme d'un rectangle de $${L}$ m sur $${l}$ m auquel on a retiré, dans un coin, un rectangle de $${a}$ m sur $${b}$ m. Quelle est son aire ?`, mode: "nombre", prefixe: "Aire :", suffixe: "m²", attendu: L * l - a * b,
        erreurs: [{ valeur: L * l + a * b, message: "Le petit rectangle est retiré : on soustrait son aire." }],
        aides: ["Calcule l'aire du grand rectangle.", "Calcule l'aire du rectangle retiré.", "Soustrais."], solution: `$${L} \\times ${l} - ${a} \\times ${b} = ${L * l} - ${a * b} = ${L * l - a * b}$ m².` }; }
    if (t === 1) { const h = rand(2, 8);
      return { enonce: `Un panneau est formé d'un rectangle de $${L}$ dm sur $${l}$ dm, surmonté d'un triangle de base $${L}$ dm et de hauteur $${h}$ dm. Quelle est son aire ?`, mode: "nombre", prefixe: "Aire :", suffixe: "dm²", attendu: L * l + (L * h) / 2,
        erreurs: [{ valeur: L * l + L * h, message: "L'aire du triangle est divisée par $2$." }],
        aides: [`Aire du rectangle : $${L} \\times ${l}$.`, `Aire du triangle : $\\dfrac{${L} \\times ${h}}{2}$.`, "Additionne les deux aires."], solution: `$${L} \\times ${l} + \\dfrac{${L} \\times ${h}}{2} = ${L * l} + ${nb((L * h) / 2)} = ${nb(L * l + (L * h) / 2)}$ dm².` }; }
    const d = rand(2, 6) * 2, v = arr(L * d + (Math.PI * (d / 2) ** 2) / 2, 1);
    return { enonce: `Une table a la forme d'un rectangle de $${L}$ dm sur $${d}$ dm, avec un demi-disque de diamètre $${d}$ dm accolé à une extrémité. Quelle est son aire ? Donne la valeur arrondie au dixième de dm².`, mode: "nombre", prefixe: "Aire :", suffixe: "dm²", attendu: v,
      aides: [`Aire du rectangle : $${L} \\times ${d}$.`, `Le demi-disque a pour rayon $${d / 2}$ dm : son aire est $\\dfrac{\\pi \\times ${d / 2} \\times ${d / 2}}{2}$.`, "Additionne les deux aires, puis arrondis."], solution: `$${L * d} + \\dfrac{\\pi \\times ${d / 2}^2}{2} \\approx ${L * d} + ${nb(arr((Math.PI * (d / 2) ** 2) / 2, 2))} \\approx ${nb(v)}$ dm².` };
  };

  /* =====================================================================
     Chapitre 16 : probabilités (pb5-)
     ===================================================================== */
  const EXPERIENCES = [
    () => { const ev = pick([["obtenir un nombre pair", [2, 4, 6]], ["obtenir un multiple de 3", [3, 6]], ["obtenir un nombre supérieur ou égal à 5", [5, 6]], ["obtenir un nombre premier", [2, 3, 5]], ["obtenir un nombre inférieur à 3", [1, 2]], ["obtenir 6", [6]], ["obtenir un nombre impair", [1, 3, 5]], ["obtenir un diviseur de 6", [1, 2, 3, 6]]]);
      return { ctx: "On lance un dé équilibré à six faces numérotées de 1 à 6.", n: 6, ev: ev[0], fav: ev[1].length, detail: `issues favorables : $${ev[1].join(" \\; ; \\; ")}$` }; },
    () => { const r = rand(1, 8), v = rand(1, 8), j = rand(0, 6), c = pick([["rouge", r], ["verte", v], ["jaune", j]]); if (c[1] === 0) return null;
      return { ctx: `Une urne contient $${r}$ boules rouges, $${v}$ boules vertes${j ? ` et $${j}$ boules jaunes` : ""}, indiscernables au toucher. On tire une boule au hasard.`, n: r + v + j, ev: `tirer une boule ${c[0]}`, fav: c[1], detail: `$${c[1]}$ boules ${c[0]}s sur $${r + v + j}$` }; },
    () => { const mot = pick(["MAYOTTE", "MAMOUDZOU", "LAGON", "MATHEMATIQUES", "COMORES", "BANANIER", "MANGROVE"]), l = pick([...new Set(mot.split(""))]), f = mot.split("").filter((c) => c === l).length;
      return { ctx: `On écrit chaque lettre du mot ${mot} sur un carton, puis on tire un carton au hasard.`, n: mot.length, ev: `tirer la lettre ${l}`, fav: f, detail: `$${f}$ carton${f > 1 ? "s" : ""} « ${l} » sur $${mot.length}$` }; },
    () => { const n = pick([4, 5, 8, 10, 12]), k = rand(1, n - 1);
      return { ctx: `Une roue de loterie est partagée en $${n}$ secteurs identiques ; $${k}$ d'entre eux sont gagnants.`, n, ev: "tomber sur un secteur gagnant", fav: k, detail: `$${k}$ secteurs gagnants sur $${n}$` }; }
  ];
  const experience = () => { for (;;) { const e = pick(EXPERIENCES)(); if (e) return e; } };

  GEN["pb5-calcul"] = function () {
    const e = experience(), p = e.fav / e.n;
    return { enonce: `${e.ctx} Quelle est la probabilité de l'évènement « ${e.ev} » ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Probabilité :", attendu: p,
      erreurs: [{ valeur: e.fav, message: "Ça, c'est le nombre d'issues favorables : il faut le diviser par le nombre total d'issues." }, ...(e.n - e.fav ? [{ valeur: e.fav / (e.n - e.fav), message: "On divise par le nombre **total** d'issues, pas par le nombre d'issues défavorables." }] : []), ...approx(p)],
      aides: ["Dans une situation d'équiprobabilité, probabilité $= \\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre total d'issues}}$.", `Nombre total d'issues : $${e.n}$.`, `Compte les issues qui réalisent l'évènement (${e.detail.replace(/\$/g, "")}).`],
      solution: `Il y a $${e.n}$ issues équiprobables et ${e.detail} : la probabilité est $${fr(e.fav, e.n)}$${pgcd(e.fav, e.n) > 1 ? ` $= ${frNet(e.fav, e.n)}$` : ""}.` };
  };

  GEN["pb5-vocab"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const E = pick([["obtenir 7 en lançant un dé à six faces", 0], ["obtenir un nombre entre 1 et 6 en lançant un dé à six faces", 4], ["obtenir pile en lançant une pièce équilibrée", 2], ["obtenir 6 en lançant un dé équilibré", 1], ["ne pas obtenir 6 en lançant un dé équilibré", 3], ["obtenir 10 fois de suite le chiffre 1 en lançant un dé", 1], ["tirer une boule rouge dans une urne qui ne contient que des boules rouges", 4], ["tirer une boule bleue dans une urne qui ne contient que des boules rouges", 0], ["ne pas gagner le gros lot au loto", 3], ["obtenir un nombre pair avec un dé équilibré", 2], ["tirer une carte rouge dans un jeu de 32 cartes (16 rouges, 16 noires)", 2], ["tirer une boule verte dans une urne de 9 boules vertes et 1 rouge", 3]]);
      const choix = ["impossible", "peu probable", "une chance sur deux", "très probable", "certain"];
      return { enonce: `Où placer l'évènement « ${E[0]} » sur l'échelle des probabilités ?`, mode: "choix", choix, attendu: E[1],
        aides: ["Une probabilité est comprise entre $0$ (impossible) et $1$ (certain).", "« Une chance sur deux » correspond à $\\dfrac{1}{2}$.", "Compte les issues favorables et toutes les issues possibles."], solution: `L'évènement « ${E[0]} » est ${choix[E[1]]}.` };
    }
    if (t === 1) {
      const e = experience();
      return { enonce: `${e.ctx} Combien y a-t-il d'issues possibles (en distinguant chaque objet) ?`, mode: "nombre", prefixe: "Issues :", attendu: e.n,
        aides: ["Une issue est un résultat possible de l'expérience.", "Chaque face, chaque boule, chaque carton ou chaque secteur est une issue.", "Compte-les tous."], solution: `Il y a $${e.n}$ issues possibles.` };
    }
    const p = pick([[1, 2], [1, 4], [3, 4], [1, 5], [1, 10], [2, 5], [3, 10], [1, 3]]), pct = (100 * p[0]) / p[1];
    if (!Number.isInteger(pct)) return { enonce: `« ${p[0] === 1 ? "Une" : p[0]} chance${p[0] > 1 ? "s" : ""} sur ${p[1]} » : quelle est cette probabilité ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Probabilité :", attendu: p[0] / p[1], erreurs: approx(p[0] / p[1]),
      aides: ["« $a$ chances sur $b$ » correspond à la fraction $\\dfrac{a}{b}$.", "Le numérateur est le nombre de chances.", "Le dénominateur est le nombre total de cas."], solution: `« ${p[0] === 1 ? "Une chance" : p[0] + " chances"} sur ${p[1]} » correspond à $${fr(p[0], p[1])}$.` };
    return { enonce: `Une probabilité vaut $${fr(...p)}$. Écris-la en pourcentage.`, mode: "nombre", prefixe: "Probabilité :", suffixe: "%", attendu: pct,
      erreurs: [{ valeur: p[0] / p[1], message: "Ça, c'est l'écriture décimale. Multiplie par $100$ pour obtenir le pourcentage." }],
      aides: [`$${fr(...p)} = ${nb(p[0] / p[1])}$.`, "Un pourcentage est une fraction de dénominateur $100$.", `$${nb(p[0] / p[1])} = \\dfrac{\\ldots}{100}$.`], solution: `$${fr(...p)} = ${nb(p[0] / p[1])} = \\dfrac{${pct}}{100} = ${pct}\\,\\%$.` };
  };

  GEN["pb5-frequences"] = function () {
    const t = rand(0, 2), N = pick([20, 25, 40, 50, 100, 200]);
    if (t <= 1) {
      const faces = [1, 2, 3, 4, 5, 6]; let eff; for (;;) { eff = faces.map(() => rand(Math.floor(N / 10), Math.ceil(N / 4))); const s = eff.reduce((a, b) => a + b, 0); const d = N - s; if (eff[5] + d > 0) { eff[5] += d; break; } }
      const k = rand(0, 5), f = eff[k] / N;
      return { enonce: `On a lancé un dé $${N}$ fois et noté les résultats. Quelle est la fréquence d'apparition du $${k + 1}$ (en écriture décimale) ?`, tableau: { lignes: [["\\text{Face}", "\\text{Effectif}"], ...faces.map((x, i) => [String(x), eff[i]]), ["\\text{Total}", N]] }, mode: "nombre", prefixe: "Fréquence :", attendu: f,
        erreurs: [{ valeur: eff[k], message: "Ça, c'est l'effectif. La fréquence est l'effectif divisé par le nombre de lancers." }, { valeur: arr(1 / 6, 2), message: "Ça, c'est (environ) la probabilité théorique. On demande la fréquence observée." }],
        aides: ["Fréquence $=$ effectif $\\div$ effectif total.", `Le $${k + 1}$ est sorti $${eff[k]}$ fois sur $${N}$.`, `$${eff[k]} \\div ${N}$.`], solution: `$${eff[k]} \\div ${N} = ${nb(f)}$.` };
    }
    const Q = pick([
      ["On lance une pièce équilibrée $10$ fois et on obtient $7$ fois pile. Que peut-on dire ?", "C'est possible : sur peu de lancers, la fréquence peut s'éloigner de la probabilité $0{,}5$.", ["La pièce est forcément truquée.", "La probabilité d'obtenir pile est $0{,}7$.", "Au prochain lancer, on obtiendra forcément face."]],
      ["On lance un dé équilibré $6\\,000$ fois. Combien de fois environ obtiendra-t-on le $4$ ?", "environ $1\\,000$ fois", ["exactement $1\\,000$ fois", "environ $4\\,000$ fois", "environ $600$ fois"]],
      ["Quand on répète un très grand nombre de fois une expérience aléatoire, la fréquence d'un évènement :", "se rapproche de sa probabilité", ["devient égale à $1$", "reste toujours très différente de sa probabilité", "devient égale à $0$"]],
      ["Un dé équilibré vient de donner $6$ trois fois de suite. La probabilité d'obtenir $6$ au lancer suivant est :", "$\\dfrac{1}{6}$", ["$0$", "plus petite que $\\dfrac{1}{6}$", "plus grande que $\\dfrac{1}{6}$"]]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["La probabilité est une valeur théorique ; la fréquence est observée lors d'expériences.", "Sur un petit nombre d'essais, la fréquence peut être loin de la probabilité.", "Sur un très grand nombre d'essais, elle s'en rapproche. Le dé n'a pas de mémoire."], solution: `Réponse : ${Q[1]}` };
  };

  /* =====================================================================
     Chapitre 17 : solides et volumes (sv5-)
     ===================================================================== */
  const UNV = [["mm³", -2], ["cm³", -1], ["dm³", 0], ["m³", 1]];
  const UNC = [["mL", -3], ["cL", -2], ["dL", -1], ["L", 0], ["hL", 2]];

  GEN["sv5-volumes"] = function () {
    const t = rand(0, 4);
    if (t === 0) { const a = rand(2, 12); return { enonce: `Calcule le volume d'un cube d'arête $${a}$ cm.`, mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: a ** 3,
      erreurs: [{ valeur: a * a, message: "Ça, c'est l'aire d'une face. Le volume est $a \\times a \\times a$." }, { valeur: 3 * a, message: "$a^3$ n'est pas $3 \\times a$." }],
      aides: ["Volume d'un cube $= a \\times a \\times a = a^3$.", `$${a} \\times ${a} = ${a * a}$.`, `$${a * a} \\times ${a}$.`], solution: `$V = ${a}^3 = ${a ** 3}$ cm³.` }; }
    if (t === 1) { const L = rand(3, 15), l = rand(2, 10), h = Math.random() < 0.3 ? rand(11, 99) / 10 : rand(2, 12), v = arr(L * l * h, 4);
      return { enonce: `Calcule le volume d'un pavé droit de longueur $${L}$ cm, de largeur $${l}$ cm et de hauteur $${nb(h)}$ cm.`, mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: v,
        erreurs: [{ valeur: arr(L + l + h, 4), message: "On multiplie les trois dimensions." }],
        aides: ["Volume d'un pavé droit $=$ longueur $\\times$ largeur $\\times$ hauteur.", `Aire de la base : $${L} \\times ${l} = ${L * l}$ cm².`, `Multiplie par la hauteur $${nb(h)}$.`], solution: `$V = ${L} \\times ${l} \\times ${nb(h)} = ${nb(v)}$ cm³.` }; }
    if (t === 2) { const a = rand(2, 10), b = rand(2, 10), h = rand(3, 20), v = (a * b * h) / 2;
      return { enonce: `Un prisme droit a pour base un triangle rectangle dont les côtés de l'angle droit mesurent $${a}$ cm et $${b}$ cm. Sa hauteur mesure $${h}$ cm. Quel est son volume ?`, mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: v,
        erreurs: [{ valeur: a * b * h, message: "L'aire de la base triangulaire est $\\dfrac{" + a + " \\times " + b + "}{2}$." }],
        aides: ["Volume d'un prisme droit $=$ aire de la base $\\times$ hauteur.", `Aire de la base : $\\dfrac{${a} \\times ${b}}{2} = ${nb((a * b) / 2)}$ cm².`, `Multiplie par $${h}$.`], solution: `$V = \\dfrac{${a} \\times ${b}}{2} \\times ${h} = ${nb((a * b) / 2)} \\times ${h} = ${nb(v)}$ cm³.` }; }
    if (t === 3) { const B = rand(5, 60), h = rand(2, 15);
      return { enonce: `Un prisme droit a une base d'aire $${B}$ cm² et une hauteur de $${h}$ cm. Quel est son volume ?`, mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: B * h,
        aides: ["Volume d'un prisme droit $=$ aire de la base $\\times$ hauteur.", "Ici l'aire de la base est donnée.", `$${B} \\times ${h}$.`], solution: `$V = ${B} \\times ${h} = ${B * h}$ cm³.` }; }
    const r = rand(2, 10), h = rand(3, 20), v = arr(Math.PI * r * r * h, 1);
    return { enonce: `Calcule le volume d'un cylindre de rayon $${r}$ cm et de hauteur $${h}$ cm. Donne la valeur arrondie au dixième de cm³.`, mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: v,
      erreurs: [{ valeur: arr(2 * Math.PI * r * h, 1), message: "Ça, c'est l'aire latérale. Le volume est l'aire du disque de base multipliée par la hauteur." }, ...(arr(3.14 * r * r * h, 1) !== v ? [{ valeur: arr(3.14 * r * r * h, 1), message: "Utilise la touche $\\pi$ de la calculatrice." }] : [])],
      aides: ["Volume d'un cylindre $=$ aire du disque de base $\\times$ hauteur $= \\pi r^2 \\times h$.", `Aire de la base : $\\pi \\times ${r}^2 = ${r * r}\\pi$ cm².`, `$${r * r}\\pi \\times ${h} = ${r * r * h}\\pi$.`], solution: `$V = \\pi \\times ${r}^2 \\times ${h} = ${r * r * h}\\pi \\approx ${nb(v)}$ cm³.` };
  };

  GEN["sv5-conversions"] = function () {
    if (Math.random() < 0.5) {
      const i = rand(0, 3), j = rand(0, 3); if (i === j) return GEN["sv5-conversions"]();
      const v = pick([rand(1, 99), rand(11, 999) / 10, rand(1, 999) / 100]), r = arr(v * 1000 ** (UNV[i][1] - UNV[j][1]), 9);
      if (r < 0.0001 || r > 1e8) return GEN["sv5-conversions"]();
      return { enonce: `Convertis : $${nb(v)}$ ${UNV[i][0]} $= \\ldots$ ${UNV[j][0]}`, mode: "nombre", prefixe: "Résultat :", suffixe: UNV[j][0], attendu: r,
        erreurs: [{ valeur: arr(v * 100 ** (UNV[i][1] - UNV[j][1]), 9), message: "Pour les volumes, le facteur entre deux unités voisines est $1\\,000$, pas $100$." }],
        aides: ["$1$ dm³ $= 1\\,000$ cm³ : un cube de $1$ dm d'arête contient $10 \\times 10 \\times 10$ cubes de $1$ cm.", `De ${UNV[i][0]} à ${UNV[j][0]}, on ${UNV[i][1] > UNV[j][1] ? "multiplie" : "divise"} par $${nb(1000 ** Math.abs(UNV[i][1] - UNV[j][1]))}$.`, "Chaque unité de volume occupe trois colonnes dans le tableau de conversion."],
        solution: `$${nb(v)}$ ${UNV[i][0]} $= ${nb(r)}$ ${UNV[j][0]}.` };
    }
    const t = rand(0, 2);
    if (t === 0) { const v = pick([rand(1, 50), rand(11, 99) / 10]), q = Math.random() < 0.5;
      return q ? { enonce: `Convertis : $${nb(v)}$ dm³ $= \\ldots$ L`, mode: "nombre", prefixe: "Résultat :", suffixe: "L", attendu: v, aides: ["$1$ dm³ $= 1$ L.", "Un litre est le volume d'un cube de $1$ dm d'arête.", "Le nombre ne change pas."], solution: `$1$ dm³ $= 1$ L, donc $${nb(v)}$ dm³ $= ${nb(v)}$ L.` }
        : { enonce: `Convertis : $${nb(v)}$ m³ $= \\ldots$ L`, mode: "nombre", prefixe: "Résultat :", suffixe: "L", attendu: arr(v * 1000, 6), erreurs: [{ valeur: arr(v * 100, 6), message: "$1$ m³ $= 1\\,000$ dm³ $= 1\\,000$ L." }], aides: ["$1$ m³ $= 1\\,000$ dm³.", "$1$ dm³ $= 1$ L.", `$${nb(v)} \\times 1\\,000$.`], solution: `$${nb(v)}$ m³ $= ${nb(arr(v * 1000, 6))}$ dm³ $= ${nb(arr(v * 1000, 6))}$ L.` }; }
    if (t === 1) { const v = rand(50, 2000), q = Math.random() < 0.5;
      return q ? { enonce: `Convertis : $${nb(v)}$ cm³ $= \\ldots$ mL`, mode: "nombre", prefixe: "Résultat :", suffixe: "mL", attendu: v, aides: ["$1$ cm³ $= 1$ mL.", "$1$ L $= 1$ dm³ $= 1\\,000$ cm³ $= 1\\,000$ mL.", "Le nombre ne change pas."], solution: `$1$ cm³ $= 1$ mL : $${nb(v)}$ cm³ $= ${nb(v)}$ mL.` }
        : { enonce: `Convertis : $${nb(v)}$ cm³ $= \\ldots$ L`, mode: "nombre", prefixe: "Résultat :", suffixe: "L", attendu: v / 1000, erreurs: [{ valeur: v / 100, message: "$1$ L $= 1\\,000$ cm³." }], aides: ["$1$ L $= 1$ dm³ $= 1\\,000$ cm³.", "On divise par $1\\,000$.", `$${nb(v)} \\div 1\\,000$.`], solution: `$${nb(v)}$ cm³ $= ${nb(v / 1000)}$ L.` }; }
    const i = rand(0, 4), j = rand(0, 4); if (i === j) return GEN["sv5-conversions"]();
    const v = pick([rand(1, 99), rand(11, 999) / 10]), r = arr(v * 10 ** (UNC[i][1] - UNC[j][1]), 8);
    return { enonce: `Convertis : $${nb(v)}$ ${UNC[i][0]} $= \\ldots$ ${UNC[j][0]}`, mode: "nombre", prefixe: "Résultat :", suffixe: UNC[j][0], attendu: r,
      aides: ["Pour les capacités, on passe d'une unité à la suivante en multipliant ou en divisant par $10$.", "Ordre : hL, (daL), L, dL, cL, mL.", `De ${UNC[i][0]} à ${UNC[j][0]}, on ${UNC[i][1] > UNC[j][1] ? "multiplie" : "divise"} par $${nb(10 ** Math.abs(UNC[i][1] - UNC[j][1]))}$.`], solution: `$${nb(v)}$ ${UNC[i][0]} $= ${nb(r)}$ ${UNC[j][0]}.` };
  };

  GEN["sv5-patrons"] = function () {
    const t = rand(0, 3);
    if (t === 0) { const n = rand(3, 8), P = { 3: "triangle", 4: "quadrilatère", 5: "pentagone", 6: "hexagone", 7: "heptagone", 8: "octogone" }, q = rand(0, 1);
      return { enonce: `Le patron d'un prisme droit dont les bases sont des ${P[n]}s comporte combien de ${q ? "faces en tout" : "rectangles (faces latérales)"} ?`, mode: "nombre", prefixe: "Nombre :", attendu: q ? n + 2 : n,
        aides: ["Un prisme droit a deux bases superposables et des faces latérales rectangulaires.", `Il y a une face latérale par côté de la base : $${n}$.`, q ? "N'oublie pas les deux bases." : "Ne compte pas les bases."], solution: q ? `$${n}$ faces latérales et $2$ bases : $${n + 2}$ faces.` : `Un rectangle par côté de la base : $${n}$ rectangles.` }; }
    if (t === 1) { const r = rand(2, 10), h = rand(3, 15), v = arr(2 * Math.PI * r, 1);
      return { enonce: `Le patron d'un cylindre de rayon $${r}$ cm et de hauteur $${h}$ cm est formé de deux disques et d'un rectangle. Quelle est la longueur du côté du rectangle qui s'enroule autour des disques ? (Arrondie au dixième de cm.)`, mode: "nombre", prefixe: "Longueur :", suffixe: "cm", attendu: v,
        erreurs: [{ valeur: arr(Math.PI * r * r, 1), message: "Ça, c'est l'aire d'un disque. On cherche le périmètre du cercle." }, { valeur: h, message: "Ça, c'est l'autre côté du rectangle (la hauteur)." }],
        aides: ["Le rectangle s'enroule exactement autour du disque de base.", "Sa longueur est donc le périmètre du cercle : $2 \\times \\pi \\times r$.", `$2 \\times \\pi \\times ${r}$.`], solution: `$2 \\times \\pi \\times ${r} = ${2 * r}\\pi \\approx ${nb(v)}$ cm.` }; }
    if (t === 2) { const L = rand(4, 12), l = rand(2, L - 1), h = rand(2, 9), q = rand(0, 1), A = 2 * (L * l + L * h + l * h);
      return q ? { enonce: `Combien de faces rectangulaires comporte le patron d'un pavé droit de dimensions $${L}$ cm, $${l}$ cm et $${h}$ cm ?`, mode: "nombre", prefixe: "Faces :", attendu: 6, aides: ["Un pavé droit a $6$ faces.", "Elles sont toutes rectangulaires.", "Elles sont identiques deux à deux."], solution: "Le patron d'un pavé droit comporte $6$ rectangles, identiques deux à deux." }
        : { enonce: `Quelle est l'aire totale du patron d'un pavé droit de dimensions $${L}$ cm, $${l}$ cm et $${h}$ cm ?`, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: A, erreurs: [{ valeur: L * l * h, message: "Ça, c'est le volume. On demande l'aire des $6$ faces." }, { valeur: A / 2, message: "Les faces sont identiques deux à deux : il y en a $6$, pas $3$." }],
          aides: ["Le patron est formé de $6$ rectangles identiques deux à deux.", `Aires : $${L} \\times ${l}$, $${L} \\times ${h}$ et $${l} \\times ${h}$, chacune deux fois.`, "Additionne les six aires."], solution: `$2 \\times (${L * l} + ${L * h} + ${l * h}) = ${A}$ cm².` }; }
    const Q = pick([
      ["Le patron d'un cylindre est formé de :", "deux disques et un rectangle", ["un disque et un triangle", "deux rectangles et un disque", "trois disques"]],
      ["Le patron d'un prisme droit à base triangulaire est formé de :", "deux triangles et trois rectangles", ["trois triangles et deux rectangles", "un triangle et trois rectangles", "deux triangles et quatre rectangles"]],
      ["Le patron d'un cube est formé de :", "six carrés", ["quatre carrés", "six rectangles quelconques", "huit carrés"]],
      ["En perspective cavalière, les arêtes cachées sont dessinées :", "en pointillés", ["en gras", "en couleur", "elles ne sont pas dessinées"]],
      ["En perspective cavalière, les faces avant et arrière d'un pavé sont dessinées :", "en vraie grandeur", ["plus petites que dans la réalité", "en pointillés", "en losanges"]],
      ["En perspective cavalière, des arêtes parallèles dans la réalité sont dessinées :", "parallèles", ["perpendiculaires", "de même longueur toujours", "en pointillés"]]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["Imagine le solide déplié, ou dessiné sur une feuille.", "Compte les bases et les faces latérales.", "En perspective cavalière, la face de devant est en vraie grandeur et le parallélisme est conservé."], solution: `Réponse : ${Q[1]}.` };
  };

  GEN["sv5-problemes"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const L = rand(4, 10) * 10, l = rand(2, 5) * 10, h = rand(3, 6) * 10, v = (L * l * h) / 1000;
      return { enonce: `Un aquarium en forme de pavé droit mesure $${L}$ cm de long, $${l}$ cm de large et $${h}$ cm de haut. Combien de litres d'eau contient-il quand il est plein ?`, mode: "nombre", prefixe: "Contenance :", suffixe: "L", attendu: v,
        erreurs: [{ valeur: L * l * h, message: "Ça, c'est le volume en cm³. Convertis en litres ($1$ L $= 1\\,000$ cm³)." }],
        aides: [`Volume : $${L} \\times ${l} \\times ${h}$ cm³.`, `$= ${nb(L * l * h)}$ cm³.`, "$1$ L $= 1\\,000$ cm³ : divise par $1\\,000$."], solution: `$V = ${L} \\times ${l} \\times ${h} = ${nb(L * l * h)}$ cm³ $= ${nb(v)}$ L.` }; }
    if (t === 1) { const L = rand(5, 12), l = rand(3, 6), p = rand(10, 20) / 10, v = arr(L * l * p, 3);
      return { enonce: `Une piscine en forme de pavé droit mesure $${L}$ m sur $${l}$ m et a une profondeur de $${nb(p)}$ m. Combien de m³ d'eau faut-il pour la remplir ?`, mode: "nombre", prefixe: "Volume :", suffixe: "m³", attendu: v,
        aides: ["Volume d'un pavé : longueur $\\times$ largeur $\\times$ hauteur.", "Toutes les longueurs sont en mètres : le volume est en m³.", `$${L} \\times ${l} \\times ${nb(p)}$.`], solution: `$V = ${L} \\times ${l} \\times ${nb(p)} = ${nb(v)}$ m³ (soit $${nb(v * 1000)}$ L).` }; }
    const r = rand(3, 5), h = rand(8, 15), V = Math.PI * r * r * h, n = Math.floor(V / 200);
    return { enonce: `Une bouteille cylindrique a un rayon intérieur de $${r}$ cm et une hauteur de $${h}$ cm. Combien de verres de $20$ cL peut-on remplir entièrement avec son contenu ?`, mode: "nombre", prefixe: "Verres :", attendu: n,
      aides: [`Volume : $\\pi \\times ${r}^2 \\times ${h} \\approx ${nb(arr(V, 1))}$ cm³.`, "$20$ cL $= 200$ mL $= 200$ cm³.", `$${nb(arr(V, 1))} \\div 200 \\approx ${nb(arr(V / 200, 2))}$ : seuls les verres pleins comptent.`], solution: `$V \\approx ${nb(arr(V, 1))}$ cm³ et $${nb(arr(V, 1))} \\div 200 \\approx ${nb(arr(V / 200, 2))}$ : on remplit $${n}$ verres entièrement.` };
  };

  /* =====================================================================
     Chapitre 18 : programmation par blocs (pr5-)
     ===================================================================== */
  const { blocs } = window.PM_EXO.college;
  const DRAPEAU = { c: "evt", t: "quand le drapeau est cliqué" };
  const POLYG = { 3: "un triangle équilatéral", 4: "un carré", 5: "un pentagone régulier", 6: "un hexagone régulier", 8: "un octogone régulier", 9: "un ennéagone régulier", 10: "un décagone régulier", 12: "un dodécagone régulier" };
  // Expressions « Scratch » : [écriture dans le bloc, calcul en KaTeX avec n, fonction]
  const EXPR = [
    (a, b) => [`réponse * ${a} + ${b}`, `${"n"} \\times ${a} + ${b}`, (n) => n * a + b, (n) => n * (a + b)],
    (a, b) => [`(réponse + ${b}) * ${a}`, `(n + ${b}) \\times ${a}`, (n) => (n + b) * a, (n) => n + b * a],
    (a, b) => [`réponse * réponse + ${b}`, `n \\times n + ${b}`, (n) => n * n + b, (n) => 2 * n + b],
    (a, b) => [`${a} * réponse - ${b}`, `${a} \\times n - ${b}`, (n) => a * n - b, (n) => a * (n - b)],
    (a, b) => [`(réponse - ${b}) * (réponse + ${b})`, `(n - ${b}) \\times (n + ${b})`, (n) => (n - b) * (n + b), (n) => n - b * n + b]
  ];

  GEN["pr5-executer"] = function () {
    const a = rand(2, 9), b = rand(1, 12), k = rand(0, 4), [blk, tex, f, faux] = EXPR[k](a, b), n = rand(k === 4 ? b + 1 : 1, 15);
    const prog = blocs([DRAPEAU, { c: "ent", t: "demander [Choisis un nombre] et attendre" }, { c: "dire", t: `dire [${blk}]` }]);
    const r = f(n), fx = faux(n);
    return { enonce: `On lance ce programme et on répond $${n}$. Quel nombre le lutin dit-il ? (Dans Scratch, $*$ est le signe de la multiplication.)`, figure: prog, mode: "nombre", prefixe: "Le lutin dit :", attendu: r,
      erreurs: fx !== r ? [{ valeur: fx, message: "Respecte les priorités opératoires et les parenthèses, comme en mathématiques." }] : [],
      aides: ["La variable « réponse » contient le nombre saisi (l'entrée).", `Remplace « réponse » par $${n}$ : on calcule $${tex.split("n").join(String(n))}$.`, "Multiplications d'abord, sauf s'il y a des parenthèses."],
      solution: `Avec $n = ${n}$ : $${tex.split("n").join(String(n))} = ${r}$. Le lutin dit $${r}$.` };
  };

  GEN["pr5-expression"] = function () {
    const t = rand(0, 4), a = rand(2, 9), b = rand(2, 12);
    const Q = [
      [`le périmètre $P = 2 \\times (L + \\ell)$ d'un rectangle de longueur $L$ et de largeur $\\ell$`, "(L + l) * 2", ["L + l * 2", "L * l * 2", "L + l + 2"]],
      [`l'aire $\\mathcal{A} = c \\times c$ d'un carré de côté $c$`, "c * c", ["c + c", "c * 2", "4 * c"]],
      [`le prix $P = ${a} \\times n + ${b}$ ($${b}$ € de frais et $${a}$ € par article)`, `n * ${a} + ${b}`, [`(n + ${b}) * ${a}`, `n + ${a} * ${b}`, `${a} + ${b} * n`]],
      [`le résultat $R = (x + ${b}) \\times ${a}$ du programme « ajouter $${b}$ puis multiplier par $${a}$ »`, `(x + ${b}) * ${a}`, [`x + ${b} * ${a}`, `x * ${a} + ${b}`, `(x * ${a}) + ${b}`]],
      [`la moyenne $M$ de deux notes $a$ et $b$`, "(a + b) / 2", ["a + b / 2", "a / 2 + b", "(a * b) / 2"]]
    ][t];
    const { choix, attendu } = melange(`« ${Q[1]} »`, Q[2].map((z) => `« ${z} »`));
    return { enonce: `Dans un programme Scratch, quelle expression permet de calculer ${Q[0]} ? ($*$ : multiplier ; $/$ : diviser.)`, mode: "choix", choix, attendu,
      aides: ["L'ordinateur respecte les priorités opératoires, comme en mathématiques.", "Quand une addition doit être faite avant une multiplication ou une division, il faut des parenthèses.", "Teste chaque expression avec des valeurs simples."], solution: `C'est « ${Q[1]} ». Les parenthèses imposent de faire l'addition en premier quand c'est nécessaire.` };
  };

  GEN["pr5-boucle"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const x = rand(1, 20), n = rand(2, 6), op = pick([["ajouter", (v, k) => v + k, rand(2, 9)], ["multiplier par", (v, k) => v * k, 2]]);
      let v = x; const vals = []; for (let i = 0; i < n; i++) { v = op[1](v, op[2]); vals.push(v); }
      const prog = blocs([DRAPEAU, { c: "ent", t: "demander [Nombre ?] et attendre" }, { c: "var", t: "mettre [N] à [réponse]" }, { rep: n, corps: [{ c: "var", t: op[0] === "ajouter" ? `ajouter [${op[2]}] à [N]` : "mettre [N] à [N * 2]" }] }, { c: "dire", t: "dire [N]" }]);
      return { enonce: `On lance ce programme et on répond $${x}$. Que dit le lutin à la fin ?`, figure: prog, mode: "nombre", prefixe: "Le lutin dit :", attendu: v,
        erreurs: [{ valeur: op[1](x, op[2]), message: `La boucle est répétée $${n}$ fois, pas une seule.` }],
        aides: ["La variable $N$ prend d'abord la valeur saisie.", `Chaque passage dans la boucle ${op[0] === "ajouter" ? `ajoute $${op[2]}$ à $N$` : "double $N$"}.`, `Note la valeur de $N$ après chaque passage : $${vals[0]}$, …`], solution: `$N$ vaut successivement $${[x, ...vals].join(" ; ")}$. Le lutin dit $${v}$.` };
    }
    if (t === 1) {
      const n = pick([3, 4, 5, 6, 8, 9, 10, 12]), L = rand(3, 10) * 10;
      return { enonce: `On veut que le lutin trace ${POLYG[n]} de côté $${L}$ pas avec : stylo en position d'écriture ; répéter $${n}$ fois (avancer de $${L}$ pas ; tourner de $\\ldots$ degrés). Quel angle faut-il mettre ?`, mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: 360 / n,
        erreurs: [{ valeur: 180 - 360 / n, message: "Le lutin tourne de l'angle **extérieur** : après les $" + n + "$ virages, il a fait un tour complet ($360^\\circ$)." }],
        aides: ["Après avoir tracé tous les côtés, le lutin a fait un tour complet sur lui-même.", `Il tourne $${n}$ fois du même angle.`, `$360 \\div ${n}$.`], solution: `$360^\\circ \\div ${n} = ${nb(360 / n)}^\\circ$.` };
    }
    const n = pick([3, 4, 5, 6, 8]), L = rand(3, 10) * 10, A = 360 / n;
    const prog = blocs([DRAPEAU, { c: "stylo", t: "stylo en position d'écriture" }, { rep: n, corps: [{ c: "mvt", t: `avancer de [${L}] pas` }, { c: "mvt", t: `tourner ↻ de [${nb(A).replace("{,}", ",")}] degrés` }] }]);
    const q = rand(0, 1);
    return q ? { enonce: "Quel est le périmètre de la figure tracée par ce programme, en pas ?", figure: prog, mode: "nombre", prefixe: "Périmètre :", suffixe: "pas", attendu: n * L, erreurs: [{ valeur: L, message: "C'est un seul côté." }],
      aides: ["Chaque passage dans la boucle trace un côté.", `Il y a $${n}$ passages.`, `$${n} \\times ${L}$.`], solution: `$${n} \\times ${L} = ${n * L}$ pas.` }
      : { enonce: "Combien de côtés a la figure tracée par ce programme ?", figure: prog, mode: "nombre", prefixe: "Côtés :", attendu: n, erreurs: [{ valeur: A, message: "Ça, c'est l'angle dont tourne le lutin." }],
        aides: ["Chaque passage dans la boucle trace un côté.", "Compte le nombre de répétitions.", "Vérifie : nombre de côtés $\\times$ angle $= 360^\\circ$."], solution: `La boucle est répétée $${n}$ fois : $${n}$ côtés (c'est ${POLYG[n]}).` };
  };

  GEN["pr5-parametres"] = function () {
    const t = rand(0, 3), L = rand(3, 10) * 10, n = pick([3, 4, 5, 6]), L2 = L + rand(1, 5) * 10;
    const Q = [
      [`Un programme trace ${POLYG[n]} de côté $${L}$ pas avec « répéter $${n}$ fois (avancer de $${L}$ ; tourner de $${nb(360 / n)}$ degrés) ». Pour obtenir ${POLYG[n]} de côté $${L2}$ pas, que faut-il modifier ?`, `remplacer $${L}$ par $${L2}$ dans « avancer »`, [`remplacer $${n}$ par $${L2}$ dans « répéter »`, `remplacer $${nb(360 / n)}$ par $${L2}$ dans « tourner »`, "ajouter un bloc « avancer » après la boucle"]],
      [`Un programme trace un carré avec « répéter $4$ fois (avancer de $${L}$ ; tourner de $90$ degrés) ». Pour tracer un hexagone régulier, que faut-il écrire ?`, "répéter $6$ fois (avancer ; tourner de $60$ degrés)", ["répéter $6$ fois (avancer ; tourner de $90$ degrés)", "répéter $4$ fois (avancer ; tourner de $60$ degrés)", "répéter $6$ fois (avancer ; tourner de $120$ degrés)"]],
      ["Dans un programme, l'instruction « demander [Quel est ton âge ?] et attendre » correspond :", "à une entrée", ["à une sortie", "à une boucle", "à un déplacement"]],
      ["Dans un programme, l'instruction « dire [réponse * 2] » correspond :", "à une sortie", ["à une entrée", "à une boucle", "à une variable qu'on modifie"]]
    ][t];
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["Repère le rôle de chaque nombre : le nombre de répétitions, la longueur, l'angle.", "Une entrée donne une information au programme ; une sortie affiche un résultat.", "Pour un polygone régulier à $n$ côtés : répéter $n$ fois, tourner de $360 \\div n$ degrés."], solution: `Réponse : ${Q[1]}.` };
  };

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse */
  Object.keys(GEN).filter((k) => /^(rc5|tr5|fr5|pp5|an5|dv5|sc5|nr5|cr5|gf5|cl5|pg5|st5|eq5|ai5|pb5|sv5|pr5)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9));
      return q;
    };
  });
})();
