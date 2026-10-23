/*
  Exercices du collège, classe de 3e (programme du cycle 4 de 2020, en vigueur en 3e en 2026-2027, brevet 2027).
  Ce fichier se charge après assets/exercices-college.js et reprend ses outils (window.PM_EXO.college).
  Mêmes règles : chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse
  attendue, trois indices progressifs et la solution rédigée.
  Préfixes : cn3-, dv3-.
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

  /* =====================================================================
     Chapitre 2 : développer (dv3-) — double distributivité, (a − b)(a + b), preuves
     ===================================================================== */
  // ax² + bx + c en KaTeX (coefficients nuls omis)
  const poly = (a, b, c, x) => {
    const T = [[a, `${x}^2`], [b, x], [c, ""]].filter(([k]) => k !== 0);
    if (!T.length) return "0";
    return T.map(([k, v], i) => { const s = k < 0 ? "-" : "+", m = Math.abs(k), coef = v && m === 1 ? "" : String(m); return (i === 0 ? (k < 0 ? "-" : "") : ` ${s} `) + coef + v; }).join("");
  };
  const VAR3 = ["x", "a", "y", "t", "n"];
  const nz = (lo, hi, neg) => { const v = rand(lo, hi); return neg && Math.random() < 0.5 ? -v : v; };
  const facteur = (a, b, x) => `(${poly(0, a, b, x)})`;

  GEN["dv3-double"] = function () {
    const x = pick(VAR3), a = nz(1, 5, true), b = nz(1, 9, true), c = nz(1, 5, false), d = nz(1, 9, true);
    const A = a * c, B = a * d + b * c, C = b * d;
    if (B === 0) return GEN["dv3-double"]();
    const bonne = `$${poly(A, B, C, x)}$`;
    const faux = [`$${poly(A, 0, C, x)}$`, `$${poly(A, B, -C, x)}$`, `$${poly(A, a * d - b * c, C, x)}$`, `$${poly(0, a + c, b + d, x)}$`, `$${poly(A, -B, C, x)}$`].filter((z, i, T) => z !== bonne && T.indexOf(z) === i).slice(0, 3);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `Développe et réduis $${facteur(a, b, x)}${facteur(c, d, x)}$.`, mode: "choix", choix, attendu,
      aides: ["Double distributivité : $(a + b)(c + d) = ac + ad + bc + bd$.", `Il y a quatre produits : $${poly(0, a, 0, x)} \\times ${poly(0, c, 0, x)}$, $${poly(0, a, 0, x)} \\times ${relP(d)}$, $${relP(b)} \\times ${poly(0, c, 0, x)}$ et $${relP(b)} \\times ${relP(d)}$.`, `On obtient $${poly(A, 0, 0, x)} ${a * d < 0 ? "-" : "+"} ${Math.abs(a * d)}${x} ${b * c < 0 ? "-" : "+"} ${Math.abs(b * c)}${x} ${C < 0 ? "-" : "+"} ${Math.abs(C)}$ ; réduis.`],
      solution: `$${facteur(a, b, x)}${facteur(c, d, x)} = ${poly(A, 0, 0, x)} ${a * d < 0 ? "-" : "+"} ${Math.abs(a * d)}${x} ${b * c < 0 ? "-" : "+"} ${Math.abs(b * c)}${x} ${C < 0 ? "-" : "+"} ${Math.abs(C)} = ${poly(A, B, C, x)}$.` };
  };

  GEN["dv3-coef"] = function () {
    const x = pick(VAR3), a = nz(1, 4, true), b = nz(1, 8, true), c = nz(1, 4, false), d = nz(1, 8, true), k = nz(1, 5, true), e = nz(1, 6, true), q = rand(0, 2);
    // E = (ax + b)(cx + d) + k(x + e) ou − (cx + d)²… on reste sur une somme de deux produits
    const A = a * c, B = a * d + b * c + k, C = b * d + k * e;
    const ex = `${facteur(a, b, x)}${facteur(c, d, x)} ${k < 0 ? "-" : "+"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}(${poly(0, 1, e, x)})`;
    const lettre = ["a", "b", "c"][q], val = [A, B, C][q], s2 = poly(0, k, k * e, x);
    const lien = { a: `${x}^2`, b: x, c: "nombre seul" }[lettre];
    return { enonce: `On développe et on réduit $E = ${ex}$ sous la forme $E = a${x}^2 + b${x} + c$. Quelle est la valeur de $${lettre}$ ?`, mode: "nombre", prefixe: `$${lettre} =$`, attendu: val,
      erreurs: q === 1 ? [{ valeur: a * d + b * c, message: "N'oublie pas le terme en " + `$${x}$` + " qui vient du second produit." }] : q === 2 ? [{ valeur: b * d + Math.abs(k) * e, message: "Le signe devant le second produit s'applique aussi à son terme constant." }, { valeur: b * d, message: "N'oublie pas le nombre qui vient du second produit." }] : [],
      aides: ["Développe le premier produit avec la double distributivité, puis le second avec la simple distributivité.", `$${facteur(a, b, x)}${facteur(c, d, x)} = ${poly(A, a * d + b * c, b * d, x)}$ et $${k === 1 ? "" : k === -1 ? "-" : rel(k)}(${poly(0, 1, e, x)}) = ${poly(0, k, k * e, x)}$.`, `Additionne les termes de même nature (${lettre === "c" ? "les nombres seuls" : `les termes en $${lien}$`}).`],
      solution: `$E = ${poly(A, a * d + b * c, b * d, x)}${s2.startsWith("-") ? " - " + s2.slice(1) : " + " + s2} = ${poly(A, B, C, x)}$, donc $${lettre} = ${rel(val)}$.` };
  };

  GEN["dv3-identite"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const x = pick(VAR3), a = rand(1, 7), b = rand(1, 9), s = Math.random() < 0.5;
      const bonne = `$${poly(a * a, 0, -b * b, x)}$`, faux = [`$${poly(a * a, 0, b * b, x)}$`, `$${poly(a, 0, -b, x)}$`, `$${poly(a * a, -2 * a * b, -b * b, x)}$`, `$${poly(2 * a, 0, -2 * b, x)}$`].filter((z, i, T) => z !== bonne && T.indexOf(z) === i).slice(0, 3);
      const { choix, attendu } = melange(bonne, faux);
      const ex = s ? `${facteur(a, -b, x)}${facteur(a, b, x)}` : `${facteur(a, b, x)}${facteur(a, -b, x)}`;
      return { enonce: `Développe $${ex}$.`, mode: "choix", choix, attendu,
        aides: ["Reconnais l'égalité $(a - b)(a + b) = a^2 - b^2$.", `Ici, le premier terme est $${poly(0, a, 0, x)}$ et le second $${b}$.`, `$(${poly(0, a, 0, x)})^2 = ${poly(a * a, 0, 0, x)}$ et $${b}^2 = ${b * b}$.`],
        solution: `$${ex} = (${poly(0, a, 0, x)})^2 - ${b}^2 = ${poly(a * a, 0, -b * b, x)}$.` };
    }
    if (t === 1) {
      const c = pick([20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 1000]), d = rand(1, c >= 100 ? 9 : 4), r = c * c - d * d;
      return { enonce: `Sans poser la multiplication, calcule $${c - d} \\times ${c + d}$ en utilisant l'égalité $(a - b)(a + b) = a^2 - b^2$.`, mode: "nombre", prefixe: "Résultat :", attendu: r,
        erreurs: [{ valeur: c * c + d * d, message: "C'est $a^2 - b^2$, avec une soustraction." }],
        aides: [`$${c - d} = ${c} - ${d}$ et $${c + d} = ${c} + ${d}$.`, `Donc $${c - d} \\times ${c + d} = ${c}^2 - ${d}^2$.`, `$${c}^2 = ${nb(c * c)}$ et $${d}^2 = ${d * d}$.`],
        solution: `$${c - d} \\times ${c + d} = (${c} - ${d})(${c} + ${d}) = ${c}^2 - ${d}^2 = ${nb(c * c)} - ${d * d} = ${nb(r)}$.` };
    }
    const x = pick(VAR3), a = rand(2, 6), b = rand(1, 9), v = rand(1, 9) * (Math.random() < 0.5 ? -1 : 1);
    return { enonce: `On pose $F = ${facteur(1, -b, x)}${facteur(1, b, x)} - ${poly(1, 0, 0, x)}$. Calcule $F$ pour $${x} = ${nb(v * 1000)}$ (indice : développe d'abord).`, mode: "nombre", prefixe: "$F =$", attendu: -b * b,
      erreurs: [{ valeur: b * b, message: `$(${x} - ${b})(${x} + ${b}) = ${x}^2 - ${b * b}$ : le $${x}^2$ disparaît mais il reste $-${b * b}$.` }],
      aides: ["Développe $F$ avant de remplacer : le calcul devient très simple.", `$${facteur(1, -b, x)}${facteur(1, b, x)} = ${x}^2 - ${b * b}$.`, `$F = ${x}^2 - ${b * b} - ${x}^2$.`],
      solution: `$F = ${x}^2 - ${b * b} - ${x}^2 = -${b * b}$ quelle que soit la valeur de $${x}$ : pour $${x} = ${nb(v * 1000)}$, $F = -${b * b}$.` };
  };

  GEN["dv3-prouver"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // programme de calcul : (x + a)(x − a) + a² = x²
      const a = rand(2, 9), n = rand(-12, 15);
      if (n === 0) return GEN["dv3-prouver"]();
      const r = n * n;
      return { enonce: `Programme : « Choisis un nombre. Ajoute $${a}$. Multiplie le résultat par le nombre de départ diminué de $${a}$. Ajoute $${a * a}$. » Quel résultat obtient-on en partant de $${rel(n)}$ ?`, mode: "nombre", prefixe: "Résultat :", attendu: r,
        erreurs: [{ valeur: (n + a) * n - a + a * a, message: `On multiplie par « le nombre de départ diminué de $${a}$ », c'est-à-dire $(${rel(n)} - ${a})$.` }],
        aides: [`Avec $x$ : $(x + ${a})(x - ${a}) + ${a * a}$.`, `$(x + ${a})(x - ${a}) = x^2 - ${a * a}$.`, "Le programme donne donc toujours le carré du nombre de départ."],
        solution: `$(x + ${a})(x - ${a}) + ${a * a} = x^2 - ${a * a} + ${a * a} = x^2$. En partant de $${rel(n)}$, on obtient $${relP(n)}^2 = ${r}$.` };
    }
    if (t === 1) { // (n + 1)² − n² = 2n + 1
      const n = rand(15, 500), r = 2 * n + 1, k = rand(1, 3);
      if (k === 1) return { enonce: `En développant, on montre que $(n + 1)^2 - n^2 = 2n + 1$. Utilise ce résultat pour calculer $${n + 1}^2 - ${n}^2$.`, mode: "nombre", prefixe: "Résultat :", attendu: r,
        erreurs: [{ valeur: 1, message: "$(n + 1)^2 \\neq n^2 + 1$ : il y a aussi le terme $2n$." }],
        aides: ["$(n + 1)^2 = (n + 1)(n + 1) = n^2 + 2n + 1$.", "Donc $(n + 1)^2 - n^2 = 2n + 1$.", `Ici $n = ${n}$.`], solution: `$${n + 1}^2 - ${n}^2 = 2 \\times ${n} + 1 = ${r}$.` };
      const m = rand(2, 9), s = n + m; // (n + m)² − n² = 2mn + m²
      return { enonce: `Développe $(n + ${m})^2 - n^2$ pour calculer rapidement $${s}^2 - ${n}^2$.`, mode: "nombre", prefixe: "Résultat :", attendu: s * s - n * n,
        erreurs: [{ valeur: m * m, message: `$(n + ${m})^2 \\neq n^2 + ${m * m}$ : il y a aussi le terme $${2 * m}n$.` }],
        aides: [`$(n + ${m})^2 = (n + ${m})(n + ${m}) = n^2 + ${2 * m}n + ${m * m}$.`, `Donc $(n + ${m})^2 - n^2 = ${2 * m}n + ${m * m}$.`, `Ici $n = ${n}$.`], solution: `$${s}^2 - ${n}^2 = ${2 * m} \\times ${n} + ${m * m} = ${nb(s * s - n * n)}$.` };
    }
    const Q = pick([
      ["La somme de trois entiers consécutifs $n$, $n + 1$ et $n + 2$ est toujours :", "un multiple de $3$", ["un nombre pair", "un multiple de $6$", "un carré"], "$n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)$."],
      ["Pour un entier $n$, le nombre $2n + 1$ est toujours :", "impair", ["pair", "un multiple de $3$", "premier"], "$2n$ est pair, donc $2n + 1$ est impair."],
      ["Le produit de deux entiers consécutifs $n(n + 1)$ est toujours :", "pair", ["impair", "un multiple de $3$", "un carré"], "L'un des deux nombres consécutifs est pair."],
      ["La différence $(n + 1)^2 - n^2$ est toujours :", "impaire", ["paire", "égale à $1$", "un multiple de $3$"], "Elle vaut $2n + 1$."],
      ["Pour prouver qu'une égalité est vraie pour tous les nombres, il faut :", "faire un calcul littéral valable pour tout $x$", ["la vérifier sur trois exemples", "la vérifier pour $x = 0$", "la vérifier sur la calculatrice"], "Des exemples ne suffisent pas : il faut un calcul général."],
      ["Pour prouver qu'une égalité est fausse, il suffit de :", "trouver un contre-exemple", ["la développer", "la vérifier pour $x = 1$", "la factoriser"], "Un seul cas où elle est fausse suffit."]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["Écris le nombre avec la lettre $n$, puis développe et réduis.", "Un multiple de $k$ s'écrit $k \\times$ (un entier).", "Un nombre pair s'écrit $2 \\times$ (un entier)."], solution: Q[3] };
  };

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse */
  Object.keys(GEN).filter((k) => /^(cn3|dv3)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9));
      return q;
    };
  });
})();
