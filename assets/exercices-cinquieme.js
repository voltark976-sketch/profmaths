/*
  Exercices du collège, classe de 5e (programme du cycle 4, BO n° 10 du 5 mars 2026).
  Ce fichier se charge après assets/exercices-college.js et reprend ses outils (window.PM_EXO.college).
  Mêmes règles : chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse
  attendue, trois indices progressifs et la solution rédigée.
  Préfixes : rc5- (règles de calcul).
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

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse */
  Object.keys(GEN).filter((k) => /^(rc5)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9));
      return q;
    };
  });
})();
