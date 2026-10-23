/*
  Exercices du collège, classe de 3e (programme du cycle 4 de 2020, en vigueur en 3e en 2026-2027, brevet 2027).
  Ce fichier se charge après assets/exercices-college.js et reprend ses outils (window.PM_EXO.college).
  Mêmes règles : chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse
  attendue, trois indices progressifs et la solution rédigée.
  Préfixes : cn3-.
*/
(function () {
  "use strict";
  const { GEN, shuffle } = window.PM_EXO;
  const { rand, pick, melange, nb, fr, pgcd, CONSIGNE_FR, FRAC_APPROX, geo } = window.PM_EXO.college;
  const approx = (v) => (Number.isInteger(v * 1000) ? [] : FRAC_APPROX(v));
  const arr = (x, k) => Math.round(x * 10 ** k) / 10 ** k;
  const rel = (x) => (x < 0 ? `-${nb(-x)}` : nb(x));
  const relP = (x) => (x < 0 ? `(${rel(x)})` : rel(x));
  const frS = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = pgcd(Math.abs(n), d); n /= g; d /= g; return d === 1 ? rel(n) : `${n < 0 ? "-" : ""}${fr(Math.abs(n), d)}`; };
  const frP = (n, d) => (n < 0 ? `\\left(${frS(n, d)}\\right)` : frS(n, d));
  const frBrut = (n, d) => `${n < 0 ? "-" : ""}${fr(Math.abs(n), d)}`;
  const tireFr = (neg) => { for (;;) { const d = rand(2, 9), n = rand(1, 2 * d) * (neg && Math.random() < 0.5 ? -1 : 1); if (pgcd(Math.abs(n), d) === 1 && Math.abs(n) !== d) return [n, d]; } };
  const red = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = pgcd(Math.abs(n), d) || 1; return [n / g, d / g]; };
  const sci = (m, e) => `${nb(m)} \\times 10^{${e}}`;

  /* =====================================================================
     Chapitre 1 : calcul numérique (cn3-) — fractions, puissances, écriture scientifique
     ===================================================================== */
  GEN["cn3-fractions"] = function () {
    for (;;) {
      const [a, b] = tireFr(true), [c, d] = tireFr(false), [e, f] = tireFr(false), t = rand(0, 2);
      let N, D, tex, faux, etapes;
      if (t === 0) { // a/b + c/d × e/f
        const [pn, pd] = red(c * e, d * f); [N, D] = red(a * pd + pn * b, b * pd);
        tex = `${frBrut(a, b)} + ${fr(c, d)} \\times ${fr(e, f)}`; faux = ((a * d + c * b) / (b * d)) * (e / f);
        etapes = [`Priorité à la multiplication : $${fr(c, d)} \\times ${fr(e, f)} = ${frS(c * e, d * f)}$.`, `Puis $${frBrut(a, b)} + ${frS(pn, pd)}$ : réduis au même dénominateur.`];
      } else if (t === 1) { // (a/b − c/d) ÷ e/f
        const [sn, sd] = red(a * d - c * b, b * d); [N, D] = red(sn * f, sd * e);
        tex = `\\left(${frBrut(a, b)} - ${fr(c, d)}\\right) \\div ${fr(e, f)}`; faux = ((a * d - c * b) / (b * d)) * (e / f);
        etapes = [`D'abord la parenthèse : $${frBrut(a, b)} - ${fr(c, d)} = ${frS(sn, sd)}$.`, `Diviser par $${fr(e, f)}$, c'est multiplier par $${fr(f, e)}$.`];
      } else { // a/b − c/d ÷ e/f
        const [qn, qd] = red(c * f, d * e); [N, D] = red(a * qd - qn * b, b * qd);
        tex = `${frBrut(a, b)} - ${fr(c, d)} \\div ${fr(e, f)}`; faux = ((a * d - c * b) / (b * d)) / (e / f);
        etapes = [`Priorité à la division : $${fr(c, d)} \\div ${fr(e, f)} = ${fr(c, d)} \\times ${fr(f, e)} = ${frS(c * f, d * e)}$.`, `Puis $${frBrut(a, b)} - ${frP(qn, qd)}$ : réduis au même dénominateur.`];
      }
      if (D > 60 || Math.abs(N) > 150) continue;
      const v = N / D;
      return { enonce: `Calcule $A = ${tex}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "$A =$", attendu: v,
        erreurs: [{ valeur: faux, message: "Respecte les priorités : multiplications et divisions avant additions et soustractions, sauf parenthèses." }, ...approx(v)],
        aides: ["Repère d'abord l'opération prioritaire.", ...etapes],
        solution: `${etapes.join(" ")} On obtient $A = ${frS(N, D)}$.` };
    }
  };

  GEN["cn3-puissances"] = function () {
    const a = pick([2, 3, 5, 7, 10, 6]), t = rand(0, 3);
    let m = rand(-5, 8), n = rand(-5, 8), p = rand(-4, 6), e, tex, faux, regle;
    if (t === 0) { e = m + n; tex = `${a}^{${m}} \\times ${a}^{${n}}`; faux = m * n; regle = `$${a}^{m} \\times ${a}^{n} = ${a}^{m + n}$ : on additionne les exposants.`; }
    else if (t === 1) { e = m - n; tex = `\\dfrac{${a}^{${m}}}{${a}^{${n}}}`; faux = m + n; regle = `$\\dfrac{${a}^{m}}{${a}^{n}} = ${a}^{m - n}$ : on soustrait les exposants.`; }
    else if (t === 2) { m = rand(-4, 5); n = rand(2, 4) * pick([1, -1]); e = m * n; tex = `\\left(${a}^{${m}}\\right)^{${n}}`; faux = m + n; regle = `$\\left(${a}^{m}\\right)^{n} = ${a}^{m \\times n}$ : on multiplie les exposants.`; }
    else { e = m + n - p; tex = `\\dfrac{${a}^{${m}} \\times ${a}^{${n}}}{${a}^{${p}}}`; faux = m + n + p; regle = "Additionne les exposants du numérateur, puis soustrais celui du dénominateur."; }
    if (e === faux || (m === 0 || n === 0)) return GEN["cn3-puissances"]();
    return { enonce: `Écris $B = ${tex}$ sous la forme d'une seule puissance de $${a}$. Quel est l'exposant ?`, mode: "nombre", prefixe: `$B = ${a}^{\\ldots}$ avec l'exposant :`, attendu: e,
      erreurs: [{ valeur: faux, message: "Revois la règle : produit → on additionne, quotient → on soustrait, puissance de puissance → on multiplie." }],
      aides: ["Les règles ne s'appliquent qu'avec la même base.", regle, "Attention aux exposants négatifs : $a - (-b) = a + b$."],
      solution: `${regle} $B = ${a}^{${e}}$.` };
  };

  GEN["cn3-scientifique"] = function () {
    const t = rand(0, 2);
    let m1 = rand(11, 99) / 10, e1 = rand(-8, 9), m2 = rand(11, 99) / 10, e2 = rand(-8, 9), M, E, enonce, sol;
    if (t === 0) { // nombre décimal → écriture scientifique
      const k = pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7]), mant = rand(101, 999) / 100, v = mant * 10 ** k;
      const ecr = k >= 0 ? nb(arr(v, 2)) : nb(+v.toFixed(2 - k));
      M = mant; E = k; enonce = `Quelle est l'écriture scientifique de $${ecr}$ ?`; sol = `On place la virgule après le premier chiffre non nul : $${ecr} = ${sci(M, E)}$.`;
    } else if (t === 1) { // produit
      const P = m1 * m2; E = e1 + e2; M = P; if (P >= 10) { M = P / 10; E += 1; } M = arr(M, 4);
      enonce = `Donne l'écriture scientifique de $C = ${sci(m1, e1)} \\times ${sci(m2, e2)}$.`;
      sol = `$C = (${nb(m1)} \\times ${nb(m2)}) \\times 10^{${e1} + ${e2 < 0 ? `(${e2})` : e2}} = ${nb(arr(P, 4))} \\times 10^{${e1 + e2}}$${P >= 10 ? ` $= ${sci(M, E)}$` : ""}.`;
    } else { // quotient avec résultat décimal exact
      m2 = pick([2, 4, 5, 2.5, 1.6, 1.25]); M = rand(11, 99) / 10; const P = arr(M * m2, 4), dec = P >= 10 ? 1 : 0; m1 = dec ? arr(P / 10, 4) : P; E = e1 - e2 - dec; const Q = arr(m1 / m2, 4);
      enonce = `Donne l'écriture scientifique de $D = \\dfrac{${sci(m1, e1)}}{${sci(m2, e2)}}$.`;
      sol = `$D = \\dfrac{${nb(m1)}}{${nb(m2)}} \\times 10^{${e1} - ${e2 < 0 ? `(${e2})` : e2}} = ${nb(arr(Q, 4))} \\times 10^{${e1 - e2}}$${dec ? ` $= ${sci(M, E)}$` : ""}.`;
    }
    if (M < 1 || M >= 10 || !Number.isInteger(arr(M * 10000, 0))) return GEN["cn3-scientifique"]();
    const bonne = `$${sci(M, E)}$`, faux = [`$${sci(M, E + 1)}$`, `$${sci(M, E - 1)}$`, `$${nb(arr(M * 10, 4))} \\times 10^{${E - 1}}$`, `$${sci(M, -E)}$`].filter((z, i, A) => z !== bonne && A.indexOf(z) === i).slice(0, 3);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce, mode: "choix", choix, attendu,
      aides: ["Écriture scientifique : $a \\times 10^{n}$ avec $1 \\leqslant a < 10$ (un seul chiffre non nul avant la virgule).", "$10^{m} \\times 10^{n} = 10^{m + n}$ et $\\dfrac{10^{m}}{10^{n}} = 10^{m - n}$.", "Si le nombre devant la puissance de $10$ n'est pas entre $1$ et $10$, ajuste l'exposant."],
      solution: sol };
  };

  GEN["cn3-problemes"] = function () {
    const t = rand(0, 3);
    if (t === 0) { // combien de fois plus grand
      const e1 = rand(3, 12), e2 = e1 - rand(1, 5), m = pick([2, 3, 4, 5, 6, 8]);
      const A = pick([["La masse de la Terre", "celle d'un astéroïde", "kg"], ["La population d'un pays", "celle d'une ville", "habitants"], ["Le nombre de grains de sable d'une plage", "celui d'un seau", "grains"]]);
      return { enonce: `${A[0]} est d'environ $${sci(m, e1)}$ ${A[2]} et ${A[1]} d'environ $${sci(m, e2)}$ ${A[2]}. Combien de fois plus grand est le premier nombre ?`, mode: "nombre", prefixe: "Environ", suffixe: "fois", attendu: 10 ** (e1 - e2),
        erreurs: [{ valeur: e1 - e2, message: `On cherche le quotient : $10^{${e1 - e2}}$, pas l'exposant seul.` }],
        aides: ["« Combien de fois plus » : on divise.", `$\\dfrac{${sci(m, e1)}}{${sci(m, e2)}} = 10^{${e1} - ${e2}}$.`, `Écris $10^{${e1 - e2}}$ en écriture décimale.`],
        solution: `$\\dfrac{${sci(m, e1)}}{${sci(m, e2)}} = 10^{${e1 - e2}} = ${nb(10 ** (e1 - e2))}$.` };
    }
    if (t === 1) { // distance parcourue par la lumière
      const s = pick([60, 100, 500, 1000, 3600]), d = 3e5 * s;
      return { enonce: `La lumière parcourt environ $3 \\times 10^{5}$ km par seconde. Quelle distance parcourt-elle en $${nb(s)}$ secondes ? Donne la réponse en km, en écriture décimale.`, mode: "nombre", prefixe: "Distance :", suffixe: "km", attendu: d,
        erreurs: [{ valeur: 3e5 + s, message: "Il faut multiplier la vitesse par la durée." }],
        aides: ["distance $=$ vitesse $\\times$ durée.", `$3 \\times 10^{5} \\times ${nb(s)}$.`, "$3 \\times 10^{5} = 300\\,000$."],
        solution: `$3 \\times 10^{5} \\times ${nb(s)} = ${nb(d)}$ km, soit $${sci(arr(d / 10 ** Math.floor(Math.log10(d)), 4), Math.floor(Math.log10(d)))}$ km.` };
    }
    if (t === 2) { // stockage numérique
      const go = rand(2, 64), mo = rand(2, 9);
      return { enonce: `Une clé USB a une capacité de $${go}$ Go ($1$ Go $= 10^{9}$ octets). Une photo occupe $${mo}$ Mo ($1$ Mo $= 10^{6}$ octets). Combien de photos entières peut-on stocker au maximum ?`, mode: "nombre", prefixe: "Photos :", attendu: Math.floor((go * 1000) / mo),
        erreurs: [{ valeur: arr((go * 1000) / mo, 2), message: "Le nombre de photos doit être entier : on garde la partie entière." }, { valeur: Math.floor(go / mo), message: "Convertis d'abord dans la même unité : $1$ Go $= 1\\,000$ Mo." }],
        aides: [`$\\dfrac{10^{9}}{10^{6}} = 10^{3}$ : $1$ Go $= 1\\,000$ Mo.`, `La clé contient $${go} \\times 1\\,000 = ${nb(go * 1000)}$ Mo.`, `Divise par $${mo}$ et garde la partie entière.`],
        solution: `$${nb(go * 1000)} \\div ${mo} ${(go * 1000) % mo ? `\\approx ${nb(arr((go * 1000) / mo, 2))}` : `= ${nb((go * 1000) / mo)}`}$ : on peut stocker $${nb(Math.floor((go * 1000) / mo))}$ photos.` };
    }
    const e = rand(-9, -3), m = rand(2, 9), N = rand(2, 9);
    const objet = pick([["Un globule rouge mesure environ", "m de diamètre", "globules rouges mis bout à bout"], ["Une bactérie mesure environ", "m de long", "bactéries mises bout à bout"], ["Un grain de pollen mesure environ", "m", "grains de pollen alignés"]]);
    const L = N * 10 ** (-e - 2); // nombre d'objets pour m × N cm
    return { enonce: `${objet[0]} $${m} \\times 10^{${e}}$ ${objet[1]}. Combien faut-il de ${objet[2]} pour obtenir une longueur de $${nb(m * N)}$ cm ?`, mode: "nombre", prefixe: "Il en faut :", attendu: L,
      erreurs: [{ valeur: N * 10 ** (-e), message: "Convertis d'abord les centimètres en mètres : $1$ cm $= 10^{-2}$ m." }],
      aides: [`$${nb(m * N)}$ cm $= ${nb(m * N)} \\times 10^{-2}$ m.`, `On divise la longueur totale par $${m} \\times 10^{${e}}$.`, `$\\dfrac{${m * N} \\times 10^{-2}}{${m} \\times 10^{${e}}} = ${N} \\times 10^{-2 - (${e})}$.`],
      solution: `$\\dfrac{${m * N} \\times 10^{-2}}{${m} \\times 10^{${e}}} = ${N} \\times 10^{${-2 - e}} = ${nb(L)}$.` };
  };

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse */
  Object.keys(GEN).filter((k) => /^(cn3)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9));
      return q;
    };
  });
})();
