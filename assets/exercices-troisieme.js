/*
  Exercices du collège, classe de 3e (programme du cycle 4 de 2020, en vigueur en 3e en 2026-2027, brevet 2027).
  Ce fichier se charge après assets/exercices-college.js et reprend ses outils (window.PM_EXO.college).
  Mêmes règles : chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse
  attendue, trois indices progressifs et la solution rédigée.
  Préfixes : cn3-, dv3-, fc3-, eq3-.
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

  /* =====================================================================
     Chapitre 3 : factoriser (fc3-) — facteur commun, a² − b² = (a − b)(a + b)
     ===================================================================== */
  const uniq3 = (bonne, L) => L.filter((z, i, T) => z !== bonne && T.indexOf(z) === i).slice(0, 3);
  const coefX = (k, x) => (k === 1 ? x : k === -1 ? `-${x}` : `${k}${x}`);

  GEN["fc3-commun"] = function () {
    const x = pick(VAR3), t = rand(0, 2);
    if (t === 0) { // kx² + mx avec facteur commun monôme
      const k = rand(2, 6), p = rand(1, 5), q = nz(1, 9, true); if (pgcd(p, Math.abs(q)) > 1) return GEN["fc3-commun"]();
      const bonne = `$${coefX(k, x)}(${poly(0, p, q, x)})$`, faux = uniq3(bonne, [`$${coefX(k, x)}(${poly(p, q, 0, x)})$`, `$${coefX(k * p, x)}(${poly(0, 1, q, x)})$`, `$${coefX(k, x)}(${poly(0, p, -q, x)})$`, `$${coefX(k, x)}(${poly(0, k * p, k * q, x)})$`]);
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `Factorise le plus possible $${poly(k * p, k * q, 0, x)}$.`, mode: "choix", choix, attendu,
        aides: ["Cherche ce qui est commun aux deux termes : un nombre et une lettre.", `$${poly(k * p, 0, 0, x)} = ${coefX(k, x)} \\times ${coefX(p, x)}$ et $${poly(0, k * q, 0, x)} = ${coefX(k, x)} \\times ${relP(q)}$.`, `Le facteur commun est $${coefX(k, x)}$.`],
        solution: `$${poly(k * p, k * q, 0, x)} = ${coefX(k, x)} \\times ${coefX(p, x)} + ${coefX(k, x)} \\times ${relP(q)} = ${coefX(k, x)}(${poly(0, p, q, x)})$.` };
    }
    // (x + a)(bx + c) ± (x + a)(dx + e)
    const a = nz(1, 9, true), b = rand(1, 5), c = nz(1, 9, true), d = rand(1, 5), e = nz(1, 9, true), moins = t === 2;
    const B = moins ? b - d : b + d, C = moins ? c - e : c + e; if (B <= 0 || C === 0 || pgcd(B, Math.abs(C)) > 1) return GEN["fc3-commun"]();
    const F = facteur(1, a, x), ex = `${F}${facteur(b, c, x)} ${moins ? "-" : "+"} ${F}${facteur(d, e, x)}`;
    const bonne = `$${F}(${poly(0, B, C, x)})$`;
    const faux = uniq3(bonne, [moins ? `$${F}(${poly(0, b - d, c + e, x)})$` : `$${F}(${poly(0, b * d, c * e, x)})$`, `$${F}^2(${poly(0, B, C, x)})$`, `$${F}(${poly(0, B, -C, x)})$`, `$(${poly(0, B, C + a, x)})${F}$`]);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `Factorise $${ex}$.`, mode: "choix", choix, attendu,
      aides: [`Le facteur commun est la parenthèse $${F}$.`, `$ka ${moins ? "-" : "+"} kb = k(a ${moins ? "-" : "+"} b)$ avec $k = ${F}$.`, moins ? `Attention au signe : $${facteur(b, c, x)} - ${facteur(d, e, x)} = ${poly(0, b, c, x)} - ${d === 1 ? "" : d}${x} ${e < 0 ? "+" : "-"} ${Math.abs(e)}$.` : `Additionne $${facteur(b, c, x)}$ et $${facteur(d, e, x)}$.`],
      solution: `$${ex} = ${F}[${facteur(b, c, x)} ${moins ? "-" : "+"} ${facteur(d, e, x)}] = ${F}(${poly(0, B, C, x)})$.` };
  };

  GEN["fc3-carres"] = function () {
    const x = pick(VAR3), t = rand(0, 2), a = t === 0 ? 1 : rand(2, 7), b = rand(1, 9);
    if (t < 2) {
      if (a !== 1 && pgcd(a, b) > 1) return GEN["fc3-carres"]();
      const A = coefX(a, x), bonne = `$(${A} - ${b})(${A} + ${b})$`;
      const faux = uniq3(bonne, [`$(${A} - ${b})^2$`, `$(${A} - ${b * b})(${A} + ${b * b})$`, `$(${coefX(a * a, x)} - ${b})(${coefX(a * a, x)} + ${b})$`, `$(${A} + ${b})^2$`]);
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `Factorise $${poly(a * a, 0, -b * b, x)}$.`, mode: "choix", choix, attendu,
        aides: ["Reconnais une différence de deux carrés : $a^2 - b^2 = (a - b)(a + b)$.", `$${poly(a * a, 0, 0, x)} = (${A})^2$ et $${b * b} = ${b}^2$.`, `Donc $a = ${A}$ et $b = ${b}$.`],
        solution: `$${poly(a * a, 0, -b * b, x)} = (${A})^2 - ${b}^2 = (${A} - ${b})(${A} + ${b})$.` };
    }
    // (x + p)² − b² = (x + p − b)(x + p + b)
    const p = nz(1, 9, true), q = b; if (Math.abs(p) === q) return GEN["fc3-carres"](); const F = facteur(1, p, x);
    const bonne = `$(${poly(0, 1, p - q, x)})(${poly(0, 1, p + q, x)})$`;
    const faux = uniq3(bonne, [`$(${poly(0, 1, p - q * q, x)})(${poly(0, 1, p + q * q, x)})$`, `$(${poly(0, 1, -p - q, x)})(${poly(0, 1, p + q, x)})$`, `$${F}(${poly(0, 1, p - q * q, x)})$`, `$(${poly(0, 1, p - q, x)})^2$`]);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `Factorise $${F}^2 - ${q * q}$.`, mode: "choix", choix, attendu,
      aides: ["C'est une différence de deux carrés : $a^2 - b^2 = (a - b)(a + b)$.", `Ici $a = ${F}$ et $b = ${q}$.`, `$(a - b)(a + b) = [${F} - ${q}][${F} + ${q}]$ ; réduis chaque crochet.`],
      solution: `$${F}^2 - ${q}^2 = [${F} - ${q}][${F} + ${q}] = (${poly(0, 1, p - q, x)})(${poly(0, 1, p + q, x)})$.` };
  };

  GEN["fc3-calcul"] = function () {
    const t = rand(0, 1);
    if (t === 0) {
      const a = rand(21, 99), b = rand(11, a - 2), r = a * a - b * b;
      return { enonce: `Calcule astucieusement $${a}^2 - ${b}^2$ en factorisant.`, mode: "nombre", prefixe: "Résultat :", attendu: r,
        erreurs: [{ valeur: (a - b) * (a - b), message: "$a^2 - b^2 \\neq (a - b)^2$ : c'est $(a - b)(a + b)$." }],
        aides: ["$a^2 - b^2 = (a - b)(a + b)$.", `$${a}^2 - ${b}^2 = (${a} - ${b})(${a} + ${b})$.`, `$= ${a - b} \\times ${a + b}$.`],
        solution: `$${a}^2 - ${b}^2 = (${a} - ${b})(${a} + ${b}) = ${a - b} \\times ${a + b} = ${nb(r)}$.` };
    }
    const k = rand(11, 99), a = rand(2, 9), b = rand(2, 9), c = pick([10, 100]) - a; // k × a + k × c = k × (a + c)
    return { enonce: `Calcule mentalement $${k} \\times ${a} + ${k} \\times ${c}$ en factorisant.`, mode: "nombre", prefixe: "Résultat :", attendu: k * (a + c),
      erreurs: [{ valeur: k + a + c, message: `On met $${k}$ en facteur : $${k} \\times (${a} + ${c})$.` }],
      aides: [`$${k}$ est un facteur commun.`, `$${k} \\times ${a} + ${k} \\times ${c} = ${k} \\times (${a} + ${c})$.`, `$${a} + ${c} = ${a + c}$.`],
      solution: `$${k} \\times (${a} + ${c}) = ${k} \\times ${a + c} = ${nb(k * (a + c))}$.` };
  };

  GEN["fc3-reconnaitre"] = function () {
    const x = pick(VAR3), a = rand(1, 5), b = nz(1, 9, true), c = rand(1, 5), d = nz(1, 9, true), t = rand(0, 3);
    const formes = [
      [`${facteur(a, b, x)}${facteur(c, d, x)}`, "un produit (forme factorisée)"],
      [`${poly(a * c, a * d + b * c, b * d, x)}`, "une somme (forme développée)"],
      [`${facteur(a, b, x)}${facteur(c, d, x)} + ${Math.abs(b) + 1}`, "une somme (ni factorisée ni développée réduite)"],
      [`${rand(2, 9)}${facteur(a, b, x)}^2`, "un produit (forme factorisée)"]
    ];
    const [ex, nature] = formes[t];
    if (t === 2) {
      const bonne = "une somme : ce n'est pas une forme factorisée", faux = ["un produit : c'est une forme factorisée", "un quotient", "une différence de deux carrés"];
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `L'expression $${ex}$ est :`, mode: "choix", choix, attendu,
        aides: ["Cherche la **dernière** opération à effectuer si on calculait l'expression pour une valeur de $" + x + "$.", "Ici, on calcule le produit puis on ajoute un nombre.", "La dernière opération est une addition."], solution: "La dernière opération est une addition : c'est une somme, donc ce n'est pas une forme factorisée." };
    }
    const bonne = t === 1 ? "une somme : c'est une forme développée" : "un produit : c'est une forme factorisée";
    const faux = uniq3(bonne, ["une somme : c'est une forme développée", "un produit : c'est une forme factorisée", "un quotient", "une différence de deux carrés"]);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `L'expression $${ex}$ est :`, mode: "choix", choix, attendu,
      aides: ["Cherche la dernière opération à effectuer si on calculait l'expression pour une valeur de $" + x + "$.", "Si c'est une multiplication, l'expression est un produit (forme factorisée).", "Si c'est une addition ou une soustraction, c'est une somme."], solution: `L'expression est ${nature}.` };
  };

  /* =====================================================================
     Chapitre 4 : équations (eq3-) — premier degré, équation produit, x² = a, problèmes
     ===================================================================== */
  const solTex = (L) => { const T = [...new Set(L.map((v) => v.toFixed(6)))].map(Number).sort((a, b) => a - b); return T; };
  const racTex = (n, d) => frS(n, d);
  const ensemble = (S, x) => (S.length === 0 ? "aucune solution" : S.length === 1 ? `une seule solution : $${x} = ${S[0]}$` : `deux solutions : $${x} = ${S[0]}$ et $${x} = ${S[1]}$`);

  GEN["eq3-premier"] = function () {
    const x = pick(VAR3), t = rand(0, 2), s = rand(-9, 12);
    if (t === 0) { // a(x + b) = cx + d
      const a = nz(2, 6, true), b = nz(1, 7, true), c = nz(1, 6, true); if (a === c) return GEN["eq3-premier"]();
      const d = a * (s + b) - c * s;
      return { enonce: `Résous l'équation $${a}(${poly(0, 1, b, x)}) = ${poly(0, c, d, x)}$.`, mode: "nombre", prefixe: `$${x} =$`, attendu: s,
        erreurs: [{ valeur: (d - b) / (a - c), message: "Développe d'abord : le facteur multiplie aussi le nombre dans la parenthèse." }],
        aides: [`Développe : $${a}(${poly(0, 1, b, x)}) = ${poly(0, a, a * b, x)}$.`, `Regroupe les termes en $${x}$ d'un côté : $${poly(0, a - c, 0, x)} = ${rel(d - a * b)}$.`, `Divise par $${rel(a - c)}$.`],
        solution: `$${poly(0, a, a * b, x)} = ${poly(0, c, d, x)}$, donc $${poly(0, a - c, 0, x)} = ${rel(d - a * b)}$ et $${x} = ${rel(s)}$.` };
    }
    if (t === 1) { // x/a + b = c
      const a = rand(2, 9), q = rand(-6, 9), b = nz(1, 12, true), c = q + b, v = a * q;
      return { enonce: `Résous l'équation $\\dfrac{${x}}{${a}} ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${rel(c)}$.`, mode: "nombre", prefixe: `$${x} =$`, attendu: v,
        erreurs: [{ valeur: arr((c - b) / a, 4), message: `On multiplie par $${a}$ (on ne divise pas) pour se débarrasser du dénominateur.` }],
        aides: [`Isole d'abord $\\dfrac{${x}}{${a}}$ : $\\dfrac{${x}}{${a}} = ${rel(c)} ${b < 0 ? "+" : "-"} ${Math.abs(b)} = ${rel(q)}$.`, `Multiplie les deux membres par $${a}$.`, `$${x} = ${rel(q)} \\times ${a}$.`],
        solution: `$\\dfrac{${x}}{${a}} = ${rel(q)}$, donc $${x} = ${rel(q)} \\times ${a} = ${rel(v)}$.` };
    }
    // (ax + b)/c = (dx + e)/f par produit en croix
    const c = rand(2, 5), f = rand(2, 5), a = nz(1, 4, false), dd = nz(1, 4, false); if (a * f === dd * c || c === f) return GEN["eq3-premier"]();
    const b = nz(1, 9, true), e = ((a * s + b) * f) / c - dd * s; if (!Number.isInteger(e) || e === 0) return GEN["eq3-premier"]();
    return { enonce: `Résous l'équation $\\dfrac{${poly(0, a, b, x)}}{${c}} = \\dfrac{${poly(0, dd, e, x)}}{${f}}$.`, mode: "nombre", prefixe: `$${x} =$`, attendu: s,
      aides: ["Utilise les produits en croix : $\\dfrac{A}{c} = \\dfrac{B}{f}$ équivaut à $f \\times A = c \\times B$.", `$${f}(${poly(0, a, b, x)}) = ${c}(${poly(0, dd, e, x)})$, soit $${poly(0, f * a, f * b, x)} = ${poly(0, c * dd, c * e, x)}$.`, `Regroupe : $${poly(0, f * a - c * dd, 0, x)} = ${rel(c * e - f * b)}$.`],
      solution: `$${poly(0, f * a, f * b, x)} = ${poly(0, c * dd, c * e, x)}$, donc $${poly(0, f * a - c * dd, 0, x)} = ${rel(c * e - f * b)}$ et $${x} = ${rel(s)}$.` };
  };

  GEN["eq3-produit"] = function () {
    const x = pick(VAR3), a = nz(1, 5, false), b = nz(1, 9, true), c = nz(1, 5, false), d = nz(1, 9, true), t = rand(0, 1);
    if (t === 0) {
      const s1 = [-b, a], s2 = [-d, c]; if ((-b) * c === (-d) * a) return GEN["eq3-produit"]();
      const v1 = -b / a, v2 = -d / c, L = v1 < v2 ? [s1, s2] : [s2, s1];
      const bonne = `$${x} = ${racTex(...L[0])}$ ou $${x} = ${racTex(...L[1])}$`;
      const faux = uniq3(bonne, [`$${x} = ${racTex(b, a)}$ ou $${x} = ${racTex(d, c)}$`, `$${x} = ${racTex(-b * a, 1)}$ ou $${x} = ${racTex(-d * c, 1)}$`, `$${x} = ${racTex(a, -b)}$ ou $${x} = ${racTex(c, -d)}$`, `$${x} = ${racTex(...L[0])}$ seulement`]);
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `Résous l'équation produit $${facteur(a, b, x)}${facteur(c, d, x)} = 0$.`, mode: "choix", choix, attendu,
        aides: ["Un produit est nul si et seulement si l'un au moins de ses facteurs est nul.", `Donc $${poly(0, a, b, x)} = 0$ ou $${poly(0, c, d, x)} = 0$.`, `Résous chacune : $${poly(0, a, 0, x)} = ${rel(-b)}$ et $${poly(0, c, 0, x)} = ${rel(-d)}$.`],
        solution: `$${poly(0, a, b, x)} = 0$ donne $${x} = ${racTex(-b, a)}$ ; $${poly(0, c, d, x)} = 0$ donne $${x} = ${racTex(-d, c)}$. Les solutions sont $${racTex(...L[0])}$ et $${racTex(...L[1])}$.` };
    }
    // factoriser d'abord : x² + kx = 0 ou x² − m² = 0
    const u = rand(0, 1), k = nz(1, 9, true), m = rand(1, 9);
    const ex = u ? poly(1, k, 0, x) : poly(1, 0, -m * m, x), S = u ? solTex([0, -k]) : [-m, m];
    const bonne = `$${x} = ${rel(S[0])}$ ou $${x} = ${rel(S[1])}$`;
    const faux = uniq3(bonne, u ? [`$${x} = ${rel(-k)}$ seulement`, `$${x} = 0$ ou $${x} = ${rel(k)}$`, `$${x} = ${rel(k)}$ ou $${x} = ${rel(-k)}$`, `$${x} = 0$ seulement`] : [`$${x} = ${m}$ seulement`, `$${x} = ${rel(-m * m)}$ ou $${x} = ${m * m}$`, "aucune solution", `$${x} = ${m * m}$`]);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `Résous l'équation $${ex} = 0$ (factorise d'abord le membre de gauche).`, mode: "choix", choix, attendu,
      aides: [u ? `Mets $${x}$ en facteur : $${ex} = ${x}(${poly(0, 1, k, x)})$.` : `$${ex} = (${x} - ${m})(${x} + ${m})$.`, "Un produit est nul si l'un de ses facteurs est nul.", u ? `$${x} = 0$ ou $${poly(0, 1, k, x)} = 0$.` : `$${x} - ${m} = 0$ ou $${x} + ${m} = 0$.`],
      solution: u ? `$${x}(${poly(0, 1, k, x)}) = 0$ : $${x} = 0$ ou $${x} = ${rel(-k)}$.` : `$(${x} - ${m})(${x} + ${m}) = 0$ : $${x} = ${m}$ ou $${x} = -${m}$.` };
  };

  GEN["eq3-carre"] = function () {
    const x = pick(VAR3), t = rand(0, 3);
    if (t === 3) { // nombre positif solution, problème
      const c = rand(2, 30), A = c * c;
      return { enonce: `Un carré a une aire de $${A}$ cm². On note $c$ la longueur de son côté. Résous $c^2 = ${A}$ pour trouver $c$.`, mode: "nombre", prefixe: "$c =$", suffixe: "cm", attendu: c,
        erreurs: [{ valeur: A / 2, message: "Le carré n'est pas le double : on cherche le nombre qui, multiplié par lui-même, donne l'aire." }, { valeur: -c, message: "Une longueur est positive : on garde la solution positive." }],
        aides: [`$c^2 = ${A}$ a deux solutions, $\\sqrt{${A}}$ et $-\\sqrt{${A}}$.`, "Une longueur est positive.", `$\\sqrt{${A}} = ${c}$.`], solution: `$c = \\sqrt{${A}} = ${c}$ cm (on écarte $-${c}$, car une longueur est positive).` };
    }
    const a = t === 0 ? rand(1, 12) ** 2 : t === 1 ? -rand(1, 50) : pick([2, 3, 5, 6, 7, 10, 11, 13, 15, 17]);
    const S = a > 0 ? (Number.isInteger(Math.sqrt(a)) ? [`-${Math.sqrt(a)}`, `${Math.sqrt(a)}`] : [`-\\sqrt{${a}}`, `\\sqrt{${a}}`]) : [];
    const bonne = ensemble(S, x);
    const faux = uniq3(bonne, a > 0 ? [ensemble([S[1]], x), ensemble([`${a / 2}`.replace(".", "{,}")], x), "aucune solution", ensemble([`-${a}`, `${a}`], x)] : [ensemble([`-\\sqrt{${-a}}`, `\\sqrt{${-a}}`], x), ensemble([`-\\sqrt{${-a}}`], x), ensemble([`${a}`], x), ensemble(["0"], x)]);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `L'équation $${x}^2 = ${rel(a)}$ a :`, mode: "choix", choix, attendu,
      aides: ["Un carré est toujours positif ou nul.", "Si $a > 0$, $x^2 = a$ a deux solutions : $\\sqrt{a}$ et $-\\sqrt{a}$.", "Si $a < 0$, $x^2 = a$ n'a pas de solution ; si $a = 0$, une seule : $0$."],
      solution: a > 0 ? `$${rel(a)} > 0$ : deux solutions, $${S[0]}$ et $${S[1]}$.` : `$${rel(a)} < 0$ et un carré n'est jamais négatif : aucune solution.` };
  };

  GEN["eq3-problemes"] = function () {
    const t = rand(0, 3);
    if (t === 0) { // rectangle : longueur = largeur + k, périmètre P
      const l = rand(3, 25), k = rand(2, 12), P = 2 * (2 * l + k);
      return { enonce: `La longueur d'un rectangle dépasse sa largeur de $${k}$ cm. Son périmètre est $${P}$ cm. Quelle est sa largeur ?`, mode: "nombre", prefixe: "Largeur :", suffixe: "cm", attendu: l,
        erreurs: [{ valeur: l + k, message: "Ça, c'est la longueur." }, { valeur: (P - k) / 2, message: "Le périmètre compte deux largeurs et deux longueurs." }],
        aides: [`Soit $x$ la largeur ; la longueur est $x + ${k}$.`, `$2(x + x + ${k}) = ${P}$.`, `$4x + ${2 * k} = ${P}$.`], solution: `$4x + ${2 * k} = ${P}$, donc $4x = ${P - 2 * k}$ et $x = ${l}$ cm.` };
    }
    if (t === 1) { // âges
      const f = rand(5, 15), r = rand(3, 5), n = rand(2, 12), p = r * f;
      return { enonce: `Un père a $${r}$ fois l'âge de son fils. Dans $${n}$ ans, la somme de leurs âges sera $${p + f + 2 * n}$ ans. Quel est l'âge actuel du fils ?`, mode: "nombre", prefixe: "Âge du fils :", suffixe: "ans", attendu: f,
        erreurs: [{ valeur: p, message: "Ça, c'est l'âge du père." }, { valeur: (p + f + 2 * n - n) / (r + 1), message: `Dans $${n}$ ans, chacun aura vieilli de $${n}$ ans : on ajoute $${2 * n}$ en tout.` }],
        aides: [`Soit $x$ l'âge du fils ; le père a $${r}x$ ans.`, `Dans $${n}$ ans : $(x + ${n}) + (${r}x + ${n}) = ${p + f + 2 * n}$.`, `$${r + 1}x + ${2 * n} = ${p + f + 2 * n}$.`], solution: `$${r + 1}x = ${p + f}$, donc $x = ${f}$ : le fils a $${f}$ ans.` };
    }
    if (t === 2) { // deux tarifs
      const a = rand(4, 9), b = rand(1, a - 1), fixe = rand(2, 8) * 5, n = Math.ceil(fixe / (a - b));
      if (fixe % (a - b)) return GEN["eq3-problemes"]();
      const N = fixe / (a - b);
      return { enonce: `Une piscine propose deux tarifs : A, $${a}$ € l'entrée ; B, un abonnement de $${fixe}$ € puis $${b}$ € l'entrée. Pour combien d'entrées les deux tarifs coûtent-ils le même prix ?`, mode: "nombre", prefixe: "Nombre d'entrées :", attendu: N,
        erreurs: [{ valeur: arr(fixe / a, 2), message: `Le tarif B coûte aussi $${b}$ € par entrée.` }],
        aides: ["Soit $x$ le nombre d'entrées.", `Tarif A : $${a}x$ ; tarif B : $${fixe} + ${b}x$.`, `Résous $${a}x = ${fixe} + ${b}x$.`], solution: `$${a}x = ${fixe} + ${b}x$ donne $${coefX(a - b, "x")} = ${fixe}$, donc $x = ${N}$ entrées.` };
    }
    const c = rand(3, 12), k = rand(1, 6), s = c + k; // carré agrandi : (c + k)² − c² = d
    const d = s * s - c * c;
    return { enonce: `Si on augmente de $${k}$ cm le côté d'un carré, son aire augmente de $${d}$ cm². Quel est le côté du carré de départ ?`, mode: "nombre", prefixe: "Côté :", suffixe: "cm", attendu: c,
      erreurs: [{ valeur: s, message: "Ça, c'est le côté du carré agrandi." }],
      aides: [`Soit $x$ le côté : $(x + ${k})^2 - x^2 = ${d}$.`, `Développe : $x^2 + ${2 * k}x + ${k * k} - x^2 = ${d}$.`, `$${2 * k}x + ${k * k} = ${d}$.`], solution: `$${2 * k}x = ${d - k * k}$, donc $x = ${c}$ cm.` };
  };

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse */
  Object.keys(GEN).filter((k) => /^(cn3|dv3|fc3|eq3)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9));
      return q;
    };
  });
})();
