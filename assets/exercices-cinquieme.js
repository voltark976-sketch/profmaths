/*
  Exercices du collège, classe de 5e (programme du cycle 4, BO n° 10 du 5 mars 2026).
  Ce fichier se charge après assets/exercices-college.js et reprend ses outils (window.PM_EXO.college).
  Mêmes règles : chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse
  attendue, trois indices progressifs et la solution rédigée.
  Préfixes : rc5- (règles de calcul), tr5-, fr5-.
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

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse */
  Object.keys(GEN).filter((k) => /^(rc5|tr5|fr5)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9));
      return q;
    };
  });
})();
