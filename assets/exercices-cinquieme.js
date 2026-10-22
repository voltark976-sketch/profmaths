/*
  Exercices du collège, classe de 5e (programme du cycle 4, BO n° 10 du 5 mars 2026).
  Ce fichier se charge après assets/exercices-college.js et reprend ses outils (window.PM_EXO.college).
  Mêmes règles : chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse
  attendue, trois indices progressifs et la solution rédigée.
  Préfixes : rc5- (règles de calcul), tr5-, fr5-, pp5-, an5-, dv5-.
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

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse */
  Object.keys(GEN).filter((k) => /^(rc5|tr5|fr5|pp5|an5|dv5)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9));
      return q;
    };
  });
})();
