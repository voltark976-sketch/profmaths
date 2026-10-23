/*
  Exercices du collège, classe de 3e (programme du cycle 4 de 2020, en vigueur en 3e en 2026-2027, brevet 2027).
  Ce fichier se charge après assets/exercices-college.js et reprend ses outils (window.PM_EXO.college).
  Mêmes règles : chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse
  attendue, trois indices progressifs et la solution rédigée.
  Préfixes : cn3-, dv3-, fc3-, eq3-, ar3-, fn3-, fa3-, pp3-, pr3-, st3-, th3-, ts3-, tg3-.
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

  /* =====================================================================
     Chapitre 5 : arithmétique (ar3-) — critères, décomposition, diviseurs communs, preuves
     ===================================================================== */
  const premier3 = (n) => { if (n < 2) return false; for (let k = 2; k * k <= n; k++) if (n % k === 0) return false; return true; };
  const decompo3 = (n) => { const f = []; let m = n, p = 2; while (m > 1) { while (m % p === 0) { f.push(p); m /= p; } p++; } return f; };
  const decTex3 = (n) => { const c = {}; decompo3(n).forEach((p) => { c[p] = (c[p] || 0) + 1; }); return Object.keys(c).map((p) => (c[p] > 1 ? `${p}^{${c[p]}}` : p)).join(" \\times "); };
  const nbDiv3 = (n) => { const c = {}; decompo3(n).forEach((p) => { c[p] = (c[p] || 0) + 1; }); return Object.values(c).reduce((a, k) => a * (k + 1), 1); };

  GEN["ar3-criteres"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // chiffre manquant pour être divisible par 9
      for (;;) {
        const L = Array.from({ length: rand(3, 4) }, () => rand(0, 9)); L[0] = rand(1, 9); const pos = rand(1, L.length);
        const s = L.reduce((a, b) => a + b, 0), c = (9 - (s % 9)) % 9; if (c === 0) continue;
        const ecr = [...L.slice(0, pos), "\\square", ...L.slice(pos)].join("");
        return { enonce: `Quel chiffre faut-il écrire à la place de $\\square$ pour que le nombre $${ecr}$ soit divisible par $9$ ?`, mode: "nombre", prefixe: "Chiffre :", attendu: c,
          erreurs: [{ valeur: (3 - (s % 3)) % 3, message: "Ce chiffre rend le nombre divisible par $3$, mais pas forcément par $9$." }],
          aides: ["Un nombre est divisible par $9$ si la somme de ses chiffres est un multiple de $9$.", `Somme des chiffres connus : $${L.join(" + ")} = ${s}$.`, `Quel chiffre ajouter à $${s}$ pour obtenir un multiple de $9$ ?`],
          solution: `$${s} + ${c} = ${s + c}$, qui est un multiple de $9$ : le chiffre est $${c}$.` };
      }
    }
    if (t === 1) { // reste de la division euclidienne
      const b = rand(6, 25), q = rand(4, 60), r = rand(1, b - 1), a = b * q + r;
      return { enonce: `Quel est le reste de la division euclidienne de $${nb(a)}$ par $${b}$ ?`, mode: "nombre", prefixe: "Reste :", attendu: r,
        erreurs: [{ valeur: q, message: "Ça, c'est le quotient." }],
        aides: [`Cherche le plus grand multiple de $${b}$ inférieur ou égal à $${nb(a)}$.`, `$${b} \\times ${q} = ${nb(b * q)}$.`, `Le reste est $${nb(a)} - ${nb(b * q)}$ ; il doit être inférieur à $${b}$.`],
        solution: `$${nb(a)} = ${b} \\times ${q} + ${r}$ avec $${r} < ${b}$ : le reste est $${r}$.` };
    }
    // par quels nombres est-il divisible ?
    const n = rand(10, 999) * pick([1, 2, 3, 5, 6, 9, 10, 15]);
    const d = [2, 3, 5, 9].filter((k) => n % k === 0), non = [2, 3, 5, 9].filter((k) => n % k);
    const txt = (D) => (D.length ? `par $${D.join("$, $")}$` : "par aucun de ces nombres");
    const bonne = `divisible ${txt(d)}${non.length && d.length ? `, mais pas par $${non.join("$, $")}$` : ""}`;
    const variantes = [[2, 3], [3, 5], [2, 5], [3, 9], [2, 3, 5], [5], [3], [2], [9], [2, 9]].map((D) => `divisible ${txt(D)}${[2, 3, 5, 9].filter((k) => !D.includes(k)).length ? `, mais pas par $${[2, 3, 5, 9].filter((k) => !D.includes(k)).join("$, $")}$` : ""}`);
    const faux = uniq3(bonne, shuffle(variantes));
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `Parmi $2$, $3$, $5$ et $9$, le nombre $${nb(n)}$ est :`, mode: "choix", choix, attendu,
      aides: ["Par $2$ : chiffre des unités pair ; par $5$ : chiffre des unités $0$ ou $5$.", "Par $3$ (ou $9$) : somme des chiffres multiple de $3$ (ou de $9$).", `Somme des chiffres de $${nb(n)}$ : $${String(n).split("").join(" + ")} = ${String(n).split("").reduce((a, b) => a + +b, 0)}$.`],
      solution: `$${nb(n)}$ est ${bonne}.` };
  };

  GEN["ar3-decomposer"] = function () {
    let n; do { const f = Array.from({ length: rand(3, 6) }, () => pick([2, 2, 2, 3, 3, 5, 5, 7, 11, 13])); n = f.reduce((a, b) => a * b, 1); } while (n < 60 || n > 9000);
    const t = rand(0, 1);
    if (t === 0) {
      const f = decompo3(n), bonne = `$${decTex3(n)}$`;
      const faux = uniq3(bonne, [`$${decTex3(n / f[0])} \\times ${f[0] * f[0]}$`.replace(/\$ \\times/, "$ \\times"), `$${decTex3(n * 2)}$`, `$${decTex3((n / f[f.length - 1]) * 3)}$`, `$${f[0]} \\times ${n / f[0]}$`]);
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `Quelle est la décomposition de $${nb(n)}$ en produit de facteurs premiers ?`, mode: "choix", choix, attendu,
        aides: ["Tous les facteurs doivent être premiers, et leur produit doit redonner le nombre.", `Divise par $2$ autant que possible, puis par $3$, $5$, $7$…`, `Commence : $${nb(n)} = ${f[0]} \\times ${nb(n / f[0])}$.`], solution: `$${nb(n)} = ${decTex3(n)}$.` };
    }
    const k = nbDiv3(n);
    return { enonce: `On sait que $${nb(n)} = ${decTex3(n)}$. Combien $${nb(n)}$ a-t-il de diviseurs ?`, mode: "nombre", prefixe: "Diviseurs :", attendu: k,
      erreurs: [{ valeur: decompo3(n).length, message: "Ça, c'est le nombre de facteurs premiers ; les diviseurs sont tous les produits possibles de ces facteurs." }],
      aides: ["Un diviseur s'obtient en choisissant, pour chaque nombre premier, un exposant entre $0$ et celui de la décomposition.", "Si $n = p^a \\times q^b$, il y a $(a + 1)(b + 1)$ diviseurs.", `Ici : ${Object.entries(decompo3(n).reduce((c, p) => ((c[p] = (c[p] || 0) + 1), c), {})).map(([p, e]) => `$${e} + 1$`).join(", ")}.`],
      solution: `Le nombre de diviseurs est ${Object.entries(decompo3(n).reduce((c, p) => ((c[p] = (c[p] || 0) + 1), c), {})).map(([p, e]) => `$(${e} + 1)$`).join(" $\\times$ ")} $= ${k}$.` };
  };

  GEN["ar3-problemes"] = function () {
    const t = rand(0, 2);
    let a, b, g;
    do { g = rand(2, 15); a = rand(2, 12); b = rand(2, 12); } while (pgcd(a, b) !== 1 || a === b);
    const A = g * a, B = g * b;
    if (t === 0) return { enonce: `Un fleuriste a $${A}$ roses et $${B}$ tulipes. Il veut faire le plus grand nombre de bouquets identiques en utilisant toutes les fleurs. Combien de bouquets peut-il faire ?`, mode: "nombre", prefixe: "Bouquets :", attendu: g,
      erreurs: [{ valeur: a + b, message: "Ça, c'est le nombre de fleurs par bouquet." }],
      aides: [`Le nombre de bouquets doit diviser $${A}$ et $${B}$.`, `$${A} = ${decTex3(A)}$ et $${B} = ${decTex3(B)}$.`, "Prends le plus grand diviseur commun."],
      solution: `Le plus grand diviseur commun de $${A}$ et $${B}$ est $${g}$ : $${g}$ bouquets de $${a}$ roses et $${b}$ tulipes.` };
    if (t === 1) return { enonce: `On veut carreler une pièce rectangulaire de $${A * 10}$ cm sur $${B * 10}$ cm avec des carreaux carrés identiques, les plus grands possible, sans découpe. Quel est le côté d'un carreau ?`, mode: "nombre", prefixe: "Côté :", suffixe: "cm", attendu: g * 10,
      erreurs: [{ valeur: a * b, message: "Ça, c'est le nombre de carreaux." }],
      aides: [`Le côté doit diviser $${A * 10}$ et $${B * 10}$.`, `$${A * 10} = ${decTex3(A * 10)}$ et $${B * 10} = ${decTex3(B * 10)}$.`, "Prends le plus grand diviseur commun."],
      solution: `Le plus grand diviseur commun de $${A * 10}$ et $${B * 10}$ est $${g * 10}$ : carreaux de $${g * 10}$ cm de côté ($${a} \\times ${b} = ${a * b}$ carreaux).` };
    return { enonce: `Une classe prépare des sachets identiques avec $${A}$ bonbons et $${B}$ chocolats, en utilisant tout. On fait le plus grand nombre de sachets possible. Combien de chocolats contient chaque sachet ?`, mode: "nombre", prefixe: "Chocolats :", attendu: b,
      erreurs: [{ valeur: g, message: "Ça, c'est le nombre de sachets." }, { valeur: a, message: "Ça, c'est le nombre de bonbons par sachet." }],
      aides: [`Le nombre de sachets est le plus grand diviseur commun de $${A}$ et $${B}$.`, `C'est $${g}$.`, `Divise le nombre de chocolats par $${g}$.`],
      solution: `$${g}$ sachets, chacun avec $${B} \\div ${g} = ${b}$ chocolats (et $${a}$ bonbons).` };
  };

  GEN["ar3-preuves"] = function () {
    if (Math.random() < 0.45) { // nombres premiers dans un intervalle
      const a = rand(2, 15) * 10, b = a + pick([10, 20, 30]), L = []; for (let k = a; k <= b; k++) if (premier3(k)) L.push(k);
      return { enonce: `Combien y a-t-il de nombres premiers entre $${a}$ et $${b}$ ?`, mode: "nombre", prefixe: "Nombres premiers :", attendu: L.length,
        aides: ["Élimine les nombres pairs et ceux qui se terminent par $5$.", "Teste ensuite la divisibilité par $3$ et par $7$.", `Il suffit de tester jusqu'à $${Math.floor(Math.sqrt(b))}$.`],
        solution: `Les nombres premiers entre $${a}$ et $${b}$ sont $${L.join(" \\; ; \\; ")}$ : il y en a $${L.length}$.` };
    }
    const Q = pick([
      ["Un multiple de $5$ s'écrit, avec $k$ entier :", "$5k$", ["$k + 5$", "$\\dfrac{k}{5}$", "$k^5$"], "Un multiple de $5$ est $5$ fois un entier."],
      ["Un nombre impair s'écrit, avec $k$ entier :", "$2k + 1$", ["$2k$", "$k + 1$", "$k^2$"], "Il suit un nombre pair $2k$."],
      ["La somme de deux nombres pairs $2k + 2m$ est :", "toujours paire", ["toujours impaire", "parfois paire", "un multiple de $4$"], "$2k + 2m = 2(k + m)$."],
      ["La somme de deux nombres impairs $(2k + 1) + (2m + 1)$ est :", "toujours paire", ["toujours impaire", "un multiple de $4$", "un nombre premier"], "$2k + 2m + 2 = 2(k + m + 1)$."],
      ["La somme de trois entiers consécutifs est toujours :", "un multiple de $3$", ["un multiple de $6$", "impaire", "paire"], "$n + n + 1 + n + 2 = 3(n + 1)$."],
      ["Le produit de deux nombres impairs est :", "toujours impair", ["toujours pair", "un multiple de $4$", "parfois pair"], "$(2k + 1)(2m + 1) = 2(2km + k + m) + 1$."],
      ["$2$ est :", "le seul nombre premier pair", ["un nombre composé", "un nombre qui n'est pas premier", "divisible par $4$"], "Ses seuls diviseurs sont $1$ et $2$."],
      ["Le nombre $1$ est :", "ni premier ni composé", ["premier", "pair", "un multiple de tous les nombres"], "Il n'a qu'un seul diviseur."],
      ["Si un nombre est divisible par $6$, alors il est divisible :", "par $2$ et par $3$", ["par $12$", "par $4$", "par $9$"], "$6 = 2 \\times 3$."],
      ["Le carré d'un nombre pair $(2k)^2$ est :", "un multiple de $4$", ["impair", "un nombre premier", "un multiple de $3$"], "$(2k)^2 = 4k^2$."]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["Écris les nombres avec des lettres : pair $= 2k$, impair $= 2k + 1$, multiple de $3$ $= 3k$.", "Développe et factorise pour faire apparaître la forme voulue.", "Un nombre premier a exactement deux diviseurs."], solution: Q[3] };
  };

  /* =====================================================================
     Chapitre 6 : notion de fonction (fn3-) — image, antécédent, tableau, courbe
     ===================================================================== */
  // Repère quadrillé (unité = 1) avec la courbe de f sur [xmin ; xmax] ; o.lignes : droites horizontales y = k en pointillés
  function repere3(o) {
    const { f, xmin, xmax, ymin, ymax } = o, u = Math.min(28, Math.floor(300 / (xmax - xmin))), v = Math.min(24, Math.floor(260 / (ymax - ymin)));
    const mx = 18, my = 12, W = mx * 2 + u * (xmax - xmin), H = my * 2 + v * (ymax - ymin);
    const X = (x) => +(mx + (x - xmin) * u).toFixed(1), Y = (y) => +(my + (ymax - y) * v).toFixed(1);
    let s = `<svg class="graph repere3" viewBox="0 0 ${W} ${H}" style="max-width:${W}px" role="img" aria-label="${o.aria}"><g class="g-grid">`;
    for (let x = xmin; x <= xmax; x++) s += `<line x1="${X(x)}" y1="${Y(ymax)}" x2="${X(x)}" y2="${Y(ymin)}"/>`;
    for (let y = ymin; y <= ymax; y++) s += `<line x1="${X(xmin)}" y1="${Y(y)}" x2="${X(xmax)}" y2="${Y(y)}"/>`;
    s += `</g><g class="g-axis"><line x1="${X(xmin)}" y1="${Y(0)}" x2="${X(xmax)}" y2="${Y(0)}"/><line x1="${X(0)}" y1="${Y(ymin)}" x2="${X(0)}" y2="${Y(ymax)}"/></g><g class="g-tick">`;
    for (let x = xmin; x <= xmax; x++) if (x !== 0 && (xmax - xmin <= 12 || x % 2 === 0)) s += `<text x="${X(x)}" y="${Y(0) + 12}" text-anchor="middle">${x}</text>`;
    for (let y = ymin; y <= ymax; y++) if (y !== 0 && (ymax - ymin <= 12 || y % 2 === 0)) s += `<text x="${X(0) - 4}" y="${Y(y) + 4}" text-anchor="end">${y}</text>`;
    s += `<text x="${X(0) - 4}" y="${Y(0) + 12}" text-anchor="end">0</text></g>`;
    (o.lignes || []).forEach((k) => { s += `<line class="g-hline" x1="${X(xmin)}" y1="${Y(k)}" x2="${X(xmax)}" y2="${Y(k)}"/>`; });
    const P = []; for (let i = 0; i <= 120; i++) { const x = xmin + ((xmax - xmin) * i) / 120, y = f(x); if (y >= ymin - 0.01 && y <= ymax + 0.01) P.push(`${X(x)},${Y(y)}`); else if (P.length && P[P.length - 1] !== "|") P.push("|"); }
    P.join(" ").split("|").filter((z) => z.trim()).forEach((seg) => { s += `<polyline class="g-curve" points="${seg.trim()}"/>`; });
    return s + `<text class="g-plabel" x="${X(xmax) - 4}" y="${Y(ymax) + 14}" text-anchor="end">${o.nom || "𝒞"}</text></svg>`;
  }
  // parabole y = p(x − h)² + m tenant dans la fenêtre, valeurs entières aux points utiles
  const parabole3 = () => {
    for (;;) {
      const p = pick([1, -1, 0.5, -0.5]), h = rand(-2, 2), m = rand(-4, 4), f = (x) => p * (x - h) ** 2 + m;
      const xmin = h - 4, xmax = h + 4, ys = [xmin, xmax].map(f); const ymin = Math.floor(Math.min(m, ...ys)), ymax = Math.ceil(Math.max(m, ...ys));
      if (ymax - ymin > 14 || ymin > 0 || ymax < 0 || xmin > 0 || xmax < 0) continue;
      return { p, h, m, f, xmin, xmax, ymin: Math.min(ymin, -1), ymax: Math.max(ymax, 1) };
    }
  };

  GEN["fn3-image"] = function () {
    const x = "x", a = nz(1, 4, true), b = rand(-6, 6), c = rand(-9, 9), v = nz(1, 6, true), t = rand(0, 1);
    if (t === 0) {
      const r = a * v * v + b * v + c;
      return { enonce: `On considère la fonction $f : x \\mapsto ${poly(a, b, c, x)}$. Calcule l'image de $${rel(v)}$ par $f$.`, mode: "nombre", prefixe: `$f(${rel(v)}) =$`, attendu: r,
        erreurs: [{ valeur: -a * v * v + b * v + c, message: `$${relP(v)}^2 = ${v * v}$ est positif.` }, { valeur: a * 2 * v + b * v + c, message: "$x^2$ n'est pas $2x$." }],
        aides: [`Remplace $x$ par $${relP(v)}$ dans l'expression.`, `$f(${rel(v)}) = ${a === 1 ? "" : a === -1 ? "-" : `${a} \\times `}${relP(v)}^2 ${b < 0 ? "-" : "+"} ${Math.abs(b)} \\times ${relP(v)} ${c < 0 ? "-" : "+"} ${Math.abs(c)}$.`, `$${relP(v)}^2 = ${v * v}$ ; respecte les priorités.`],
        solution: `$f(${rel(v)}) = ${rel(a * v * v)} ${b * v < 0 ? "-" : "+"} ${Math.abs(b * v)} ${c < 0 ? "-" : "+"} ${Math.abs(c)} = ${rel(r)}$.` };
    }
    // antécédent par une fonction affine : résoudre f(x) = k
    const s = rand(-8, 9), k = a * s + b;
    return { enonce: `On considère la fonction $g : x \\mapsto ${poly(0, a, b, x)}$. Quel est l'antécédent de $${rel(k)}$ par $g$ ?`, mode: "nombre", prefixe: "Antécédent :", attendu: s,
      erreurs: [{ valeur: a * k + b, message: `Ça, c'est l'image de $${rel(k)}$. On cherche $x$ tel que $g(x) = ${rel(k)}$.` }],
      aides: [`On cherche $x$ tel que $g(x) = ${rel(k)}$.`, `Résous $${poly(0, a, b, x)} = ${rel(k)}$.`, `$${poly(0, a, 0, x)} = ${rel(k - b)}$.`],
      solution: `$${poly(0, a, b, x)} = ${rel(k)}$ donne $${poly(0, a, 0, x)} = ${rel(k - b)}$, donc $x = ${rel(s)}$. L'antécédent de $${rel(k)}$ est $${rel(s)}$.` };
  };

  GEN["fn3-tableau"] = function () {
    const xs = shuffle([-3, -2, -1, 0, 1, 2, 3, 4, 5]).slice(0, 5).sort((p, q) => p - q), a = nz(1, 3, true), b = rand(-4, 4), c = rand(-6, 6);
    const f = (x) => a * x * x + b * x + c, ys = xs.map(f), tab = { lignes: [["x", ...xs.map(rel)], ["f(x)", ...ys.map(rel)]] };
    const t = rand(0, 2), i = rand(0, xs.length - 1);
    if (t === 0) return { enonce: "Voici un tableau de valeurs d'une fonction $f$. Quelle est l'image de " + `$${rel(xs[i])}$ par $f$ ?`, tableau: tab, mode: "nombre", prefixe: `$f(${rel(xs[i])}) =$`, attendu: ys[i],
      aides: ["L'image de $x$ se lit sur la deuxième ligne, sous $x$.", `Repère la colonne où $x = ${rel(xs[i])}$.`, "Lis la valeur de $f(x)$ dans cette colonne."], solution: `Sous $x = ${rel(xs[i])}$, on lit $f(${rel(xs[i])}) = ${rel(ys[i])}$.` };
    const cnt = ys.filter((y) => y === ys[i]).length;
    if (t === 1 && cnt === 1 && !xs.includes(ys[i])) return { enonce: `Voici un tableau de valeurs d'une fonction $f$. D'après ce tableau, quel est un antécédent de $${rel(ys[i])}$ par $f$ ?`, tableau: tab, mode: "nombre", prefixe: "Antécédent :", attendu: xs[i],
      aides: ["Un antécédent de $k$ est une valeur de $x$ dont l'image est $k$.", `Cherche $${rel(ys[i])}$ sur la deuxième ligne.`, "Lis la valeur de $x$ au-dessus."], solution: `On lit $f(${rel(xs[i])}) = ${rel(ys[i])}$ : $${rel(xs[i])}$ est un antécédent de $${rel(ys[i])}$.` };
    const k = rand(0, xs.length - 1);
    return { enonce: `Voici un tableau de valeurs d'une fonction $f$. Calcule $f(${rel(xs[k])}) + f(${rel(xs[i])})$.`, tableau: tab, mode: "nombre", prefixe: "Résultat :", attendu: ys[k] + ys[i],
      aides: ["Lis chaque image dans le tableau.", `$f(${rel(xs[k])}) = ${rel(ys[k])}$.`, `$f(${rel(xs[i])}) = ${rel(ys[i])}$.`], solution: `$${rel(ys[k])} + ${relP(ys[i])} = ${rel(ys[k] + ys[i])}$.` };
  };

  GEN["fn3-graphe"] = function () {
    const P = parabole3(), t = rand(0, 1), fig = (lignes) => repere3({ f: P.f, xmin: P.xmin, xmax: P.xmax, ymin: P.ymin, ymax: P.ymax, lignes, nom: "𝒞f", aria: `Courbe d'une parabole de sommet (${P.h} ; ${P.m})` });
    if (t === 0) {
      let x0; do x0 = rand(P.xmin, P.xmax); while (!Number.isInteger(P.f(x0)) || P.f(x0) < P.ymin || P.f(x0) > P.ymax || x0 === 0);
      const y0 = P.f(x0);
      return { enonce: `La courbe représente une fonction $f$. Lis l'image de $${rel(x0)}$ par $f$.`, figure: fig(), mode: "nombre", prefixe: `$f(${rel(x0)}) =$`, attendu: y0,
        erreurs: [{ valeur: x0, message: "Pars de $" + rel(x0) + "$ sur l'axe des abscisses (horizontal) et lis l'ordonnée du point de la courbe." }],
        aides: [`Place-toi à $x = ${rel(x0)}$ sur l'axe horizontal.`, "Monte ou descends jusqu'à la courbe.", "Lis l'ordonnée de ce point sur l'axe vertical."],
        solution: `Le point de la courbe d'abscisse $${rel(x0)}$ a pour ordonnée $${rel(y0)}$ : $f(${rel(x0)}) = ${rel(y0)}$.` };
    }
    // antécédents de k (deux, entiers)
    for (let e = 0; e < 50; e++) {
      const d = pick(Math.abs(P.p) === 0.5 ? [2] : [1, 2, 3]), k = P.m + P.p * d * d, s1 = P.h - d, s2 = P.h + d;
      if (!Number.isInteger(k) || k < P.ymin || k > P.ymax || s1 < P.xmin || s2 > P.xmax) continue;
      const bonne = `$${rel(s1)}$ et $${rel(s2)}$`;
      const faux = uniq3(bonne, [`$${rel(P.f(k))}$`, `$${rel(s1)}$ seulement`, `$${rel(-s1)}$ et $${rel(-s2)}$`, `$${rel(k)}$`, `$${rel(s2)}$ seulement`]);
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `La courbe représente une fonction $f$. Quels sont les antécédents de $${rel(k)}$ par $f$ ?`, figure: fig([k]), mode: "choix", choix, attendu,
        aides: [`Trace la droite horizontale d'ordonnée $${rel(k)}$ (en pointillés).`, "Repère les points où elle coupe la courbe.", "Lis les abscisses de ces points."],
        solution: `La droite d'ordonnée $${rel(k)}$ coupe la courbe en deux points, d'abscisses $${rel(s1)}$ et $${rel(s2)}$ : ce sont les antécédents de $${rel(k)}$.` };
    }
    return GEN["fn3-graphe"]();
  };

  GEN["fn3-vocab"] = function () {
    const a = rand(-9, 9), b = rand(-9, 12), t = rand(0, 3);
    if (t === 0) {
      const bonne = `l'image de $${rel(a)}$ par $f$ est $${rel(b)}$`, faux = [`l'image de $${rel(b)}$ par $f$ est $${rel(a)}$`, `$${rel(b)}$ a pour antécédent $${rel(b)}$`, `$f$ multiplié par $${relP(a)}$ vaut $${rel(b)}$`];
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `L'égalité $f(${rel(a)}) = ${rel(b)}$ signifie :`, mode: "choix", choix, attendu, aides: ["$f(x)$ se lit « $f$ de $x$ » : c'est l'image de $x$.", "La valeur entre parenthèses est le nombre de départ.", "Le résultat est son image."], solution: `$f(${rel(a)}) = ${rel(b)}$ : l'image de $${rel(a)}$ est $${rel(b)}$, et $${rel(a)}$ est un antécédent de $${rel(b)}$.` };
    }
    if (t === 1) {
      const bonne = `$${rel(a)}$ est un antécédent de $${rel(b)}$`, faux = [`$${rel(b)}$ est un antécédent de $${rel(a)}$`, `$${rel(a)}$ est l'image de $${rel(b)}$`, `$f(${rel(b)}) = ${rel(a)}$`];
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `On sait que $f(${rel(a)}) = ${rel(b)}$. On peut dire que :`, mode: "choix", choix, attendu, aides: ["L'antécédent est le nombre de départ.", "L'image est le nombre d'arrivée.", `Ici le nombre de départ est $${rel(a)}$.`], solution: `$${rel(a)}$ est un antécédent de $${rel(b)}$ (et $${rel(b)}$ est l'image de $${rel(a)}$).` };
    }
    // programme de calcul → expression
    const k = rand(2, 9), m = rand(2, 9), u = rand(0, 1);
    const bonne = u ? `$f(x) = ${k}(x + ${m})$` : `$f(x) = ${k}x + ${m}$`, faux = u ? [`$f(x) = ${k}x + ${m}$`, `$f(x) = x + ${k * m}$`, `$f(x) = ${k + m}x$`] : [`$f(x) = ${k}(x + ${m})$`, `$f(x) = ${k + m}x$`, `$f(x) = (x + ${m})^{${k}}$`];
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `Une fonction $f$ correspond au programme : ${u ? `« ajouter $${m}$, puis multiplier par $${k}$ »` : `« multiplier par $${k}$, puis ajouter $${m}$ »`}. Son expression est :`, mode: "choix", choix, attendu,
      aides: ["Applique le programme à $x$, étape par étape.", u ? `D'abord $x + ${m}$, puis on multiplie le tout par $${k}$.` : `D'abord $${k}x$, puis on ajoute $${m}$.`, "Les parenthèses sont nécessaires quand l'addition est faite en premier."], solution: `Réponse : ${bonne}.` };
  };

  /* =====================================================================
     Chapitre 7 : fonctions linéaires et affines (fa3-)
     ===================================================================== */
  const affTex = (a, b) => poly(0, a, b, "x");
  const fenetre = (f) => { const ys = [-4, 4].map(f), lo = Math.floor(Math.min(...ys, 0)), hi = Math.ceil(Math.max(...ys, 0)); return { xmin: -4, xmax: 4, ymin: Math.max(lo, -8), ymax: Math.min(hi, 8) }; };

  GEN["fa3-reconnaitre"] = function () {
    const a = nz(2, 9, true), b = nz(1, 9, true), t = rand(0, 2);
    if (t === 0) {
      const L = [[`$f(x) = ${affTex(a, b)}$`, "affine (non linéaire)"], [`$f(x) = ${affTex(a, 0)}$`, "linéaire (donc affine)"], [`$f(x) = ${poly(a, 0, b, "x")}$`, "ni linéaire ni affine"], [`$f(x) = \\dfrac{${a}}{x}$`, "ni linéaire ni affine"], [`$f(x) = ${a}(x ${b < 0 ? "-" : "+"} ${Math.abs(b)})$`, "affine (non linéaire)"]];
      const [ex, nature] = pick(L), opts = ["affine (non linéaire)", "linéaire (donc affine)", "ni linéaire ni affine", "on ne peut pas savoir"];
      const { choix, attendu } = melange(nature, opts.filter((o) => o !== nature));
      return { enonce: `La fonction ${ex} est :`, mode: "choix", choix, attendu,
        aides: ["Une fonction affine s'écrit $f(x) = ax + b$ ; linéaire si en plus $b = 0$.", "Développe si nécessaire pour voir la forme $ax + b$.", "Un $x^2$ ou un $x$ au dénominateur : ce n'est pas affine."], solution: `${ex} est ${nature}.` };
    }
    if (t === 1) { const v = nz(1, 8, true), r = a * v + b;
      return { enonce: `$f$ est la fonction affine $f(x) = ${affTex(a, b)}$. Calcule $f(${rel(v)})$.`, mode: "nombre", prefixe: `$f(${rel(v)}) =$`, attendu: r,
        erreurs: [{ valeur: a * v - b, message: "Garde le signe de $b$." }], aides: [`Remplace $x$ par $${relP(v)}$.`, `$${a} \\times ${relP(v)} = ${rel(a * v)}$.`, `Puis ajoute $${relP(b)}$.`], solution: `$f(${rel(v)}) = ${a} \\times ${relP(v)} ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${rel(r)}$.` }; }
    const c = rand(0, 1);
    return { enonce: `On considère la fonction affine $f(x) = ${affTex(a, b)}$. Quel est ${c ? "son coefficient directeur $a$" : "son ordonnée à l'origine $b$"} ?`, mode: "nombre", prefixe: c ? "$a =$" : "$b =$", attendu: c ? a : b,
      erreurs: [{ valeur: c ? b : a, message: c ? "Le coefficient directeur multiplie $x$." : "L'ordonnée à l'origine est le nombre seul, $f(0)$." }],
      aides: ["Écris $f(x)$ sous la forme $ax + b$.", "$a$ est le nombre qui multiplie $x$.", "$b$ est le nombre seul : $b = f(0)$."], solution: `$f(x) = ${affTex(a, b)}$ : $a = ${rel(a)}$ et $b = ${rel(b)}$.` };
  };

  GEN["fa3-deux-points"] = function () {
    const a = nz(1, 6, true), b = rand(-10, 10), x1 = rand(-5, 4), x2 = x1 + rand(1, 6), y1 = a * x1 + b, y2 = a * x2 + b, q = rand(0, 1);
    return { enonce: `$f$ est une fonction affine telle que $f(${rel(x1)}) = ${rel(y1)}$ et $f(${rel(x2)}) = ${rel(y2)}$. Détermine ${q ? "son coefficient directeur $a$" : "son ordonnée à l'origine $b$"}.`, mode: "nombre", prefixe: q ? "$a =$" : "$b =$", attendu: q ? a : b,
      erreurs: q ? [{ valeur: arr((x2 - x1) / (y2 - y1), 4), message: "C'est $\\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$ : les images en haut." }] : [{ valeur: a, message: "Ça, c'est $a$ ; il faut ensuite calculer $b$." }],
      aides: ["$a = \\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$ : l'accroissement des images divisé par celui des nombres.", `$a = \\dfrac{${rel(y2)} - ${relP(y1)}}{${rel(x2)} - ${relP(x1)}} = \\dfrac{${y2 - y1}}{${x2 - x1}} = ${rel(a)}$.`, `Puis $b = f(${rel(x1)}) - a \\times ${relP(x1)}$.`],
      solution: `$a = \\dfrac{${y2 - y1}}{${x2 - x1}} = ${rel(a)}$ ; $b = ${rel(y1)} - ${relP(a)} \\times ${relP(x1)} = ${rel(b)}$. Donc $f(x) = ${affTex(a, b)}$.` };
  };

  GEN["fa3-graphe"] = function () {
    const a = pick([-3, -2, -1, 1, 2, 3, 0.5, -0.5]), b = rand(-3, 3), f = (x) => a * x + b, W = fenetre(f), q = rand(0, 2);
    if (W.ymax - W.ymin < 4) return GEN["fa3-graphe"]();
    const fig = repere3({ f, ...W, nom: "𝒟", aria: `Droite représentant une fonction affine, passant par (0 ; ${b}) avec une pente de ${a}` });
    if (q === 0) return { enonce: "La droite représente une fonction affine $f(x) = ax + b$. Lis l'ordonnée à l'origine $b$.", figure: fig, mode: "nombre", prefixe: "$b =$", attendu: b,
      aides: ["$b = f(0)$ : c'est l'ordonnée du point de la droite situé sur l'axe vertical.", "Repère où la droite coupe l'axe des ordonnées.", "Lis la graduation."], solution: `La droite coupe l'axe des ordonnées en $${rel(b)}$ : $b = ${rel(b)}$.` };
    if (q === 1) return { enonce: "La droite représente une fonction affine $f(x) = ax + b$. Lis son coefficient directeur $a$.", figure: fig, mode: "nombre", prefixe: "$a =$", attendu: a,
      erreurs: [{ valeur: -a, message: "Si la droite monte de gauche à droite, $a$ est positif ; si elle descend, $a$ est négatif." }, { valeur: b, message: "Ça, c'est l'ordonnée à l'origine." }],
      aides: ["Quand $x$ augmente de $1$, $f(x)$ augmente de $a$.", `Pars du point $(0 ; ${rel(b)})$ et avance de ${Math.abs(a) === 0.5 ? "$2$ unités vers la droite" : "$1$ unité vers la droite"}.`, Math.abs(a) === 0.5 ? "De combien monte-t-on (ou descend-on) ? Divise par $2$." : "De combien faut-il monter (ou descendre) pour retrouver la droite ?"],
      solution: `Quand $x$ augmente de $${Math.abs(a) === 0.5 ? 2 : 1}$, $f(x)$ ${a > 0 ? "augmente" : "diminue"} de $${nb(Math.abs(a) === 0.5 ? 1 : Math.abs(a))}$ : $a = ${rel(a)}$.` };
    let x0; do x0 = rand(-3, 3); while (!Number.isInteger(f(x0)) || f(x0) < W.ymin || f(x0) > W.ymax || x0 === 0);
    return { enonce: `La droite représente une fonction affine $f$. Lis $f(${rel(x0)})$.`, figure: fig, mode: "nombre", prefixe: `$f(${rel(x0)}) =$`, attendu: f(x0),
      erreurs: [{ valeur: x0, message: "On lit l'ordonnée du point de la droite, pas son abscisse." }],
      aides: [`Pars de $${rel(x0)}$ sur l'axe horizontal.`, "Rejoins la droite verticalement.", "Lis l'ordonnée."], solution: `Le point de la droite d'abscisse $${rel(x0)}$ a pour ordonnée $${rel(f(x0))}$.` };
  };

  GEN["fa3-problemes"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // pourcentage : fonction linéaire
      const p = pick([5, 10, 15, 20, 25, 30, 40, 50]), up = Math.random() < 0.5, k = arr(up ? 1 + p / 100 : 1 - p / 100, 2), x = rand(2, 40) * 10, q = rand(0, 1);
      if (q === 0) return { enonce: `${up ? "Augmenter" : "Diminuer"} un prix de $${p}\\,\\%$ revient à appliquer une fonction linéaire $f(x) = kx$. Quel est le coefficient $k$ ?`, mode: "nombre", prefixe: "$k =$", attendu: k,
        erreurs: [{ valeur: p / 100, message: `Il faut garder le prix de départ : $k = 1 ${up ? "+" : "-"} \\dfrac{${p}}{100}$.` }, { valeur: arr(up ? 1 - p / 100 : 1 + p / 100, 2), message: up ? "Pour une augmentation, $k > 1$." : "Pour une diminution, $k < 1$." }],
        aides: [`${up ? "Augmenter" : "Diminuer"} de $${p}\\,\\%$, c'est ${up ? "ajouter" : "retirer"} $\\dfrac{${p}}{100}$ du prix.`, `$x ${up ? "+" : "-"} \\dfrac{${p}}{100}x = \\left(1 ${up ? "+" : "-"} \\dfrac{${p}}{100}\\right)x$.`, `$1 ${up ? "+" : "-"} ${nb(p / 100)}$.`], solution: `$k = 1 ${up ? "+" : "-"} ${nb(p / 100)} = ${nb(k)}$.` };
      return { enonce: `Un article coûte $${x}$ €. Son prix ${up ? "augmente" : "baisse"} de $${p}\\,\\%$. Quel est le nouveau prix ?`, mode: "nombre", prefixe: "Nouveau prix :", suffixe: "€", attendu: arr(x * k, 2),
        erreurs: [{ valeur: arr((x * p) / 100, 2), message: "Ça, c'est le montant de la variation ; ajoute-le ou retire-le au prix." }],
        aides: [`On applique $f(x) = ${nb(k)}x$.`, `$${x} \\times ${nb(k)}$.`, "Vérifie que le prix augmente ou baisse dans le bon sens."], solution: `$${x} \\times ${nb(k)} = ${nb(arr(x * k, 2))}$ €.` };
    }
    if (t === 1) { // deux tarifs : comparaison
      const a1 = rand(3, 9), b2 = rand(2, 8) * 5, a2 = rand(1, a1 - 1), n = rand(2, 30), q = rand(0, 1);
      if (q === 0) { const c1 = a1 * n, c2 = b2 + a2 * n, best = c1 < c2 ? "A" : c1 > c2 ? "B" : "les deux";
        const bonne = best === "les deux" ? "les deux tarifs coûtent pareil" : `le tarif ${best}`, faux = ["le tarif A", "le tarif B", "les deux tarifs coûtent pareil"].filter((z) => z !== bonne).concat(["on ne peut pas savoir"]);
        const { choix, attendu } = melange(bonne, faux);
        return { enonce: `Tarif A : $f(x) = ${a1}x$ ; tarif B : $g(x) = ${a2}x + ${b2}$, où $x$ est le nombre de séances. Pour $${n}$ séances, quel est le tarif le moins cher ?`, mode: "choix", choix, attendu,
          aides: [`Calcule $f(${n})$ et $g(${n})$.`, `$f(${n}) = ${c1}$ €.`, `$g(${n}) = ${c2}$ €.`], solution: `$f(${n}) = ${c1}$ € et $g(${n}) = ${c2}$ € : ${bonne}.` }; }
      if (b2 % (a1 - a2)) return GEN["fa3-problemes"]();
      const s = b2 / (a1 - a2);
      return { enonce: `Tarif A : $f(x) = ${a1}x$ ; tarif B : $g(x) = ${a2}x + ${b2}$, où $x$ est le nombre de séances. Pour combien de séances les deux tarifs sont-ils égaux ?`, mode: "nombre", prefixe: "Séances :", attendu: s,
        aides: ["Résous $f(x) = g(x)$.", `$${a1}x = ${a2}x + ${b2}$.`, `$${poly(0, a1 - a2, 0, "x")} = ${b2}$.`], solution: `$${poly(0, a1 - a2, 0, "x")} = ${b2}$, donc $x = ${s}$ séances.` };
    }
    // taxi : prise en charge + prix au km
    const pc = rand(2, 6), pk = pick([1.2, 1.5, 1.8, 2, 2.5]), d = rand(3, 25), C = arr(pc + pk * d, 2), q = rand(0, 1);
    if (q === 0) return { enonce: `Un taxi facture $${pc}$ € de prise en charge et $${nb(pk)}$ € par kilomètre. Le prix est une fonction affine de la distance $x$. Combien coûte une course de $${d}$ km ?`, mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: C,
      erreurs: [{ valeur: arr(pk * d, 2), message: "N'oublie pas la prise en charge." }],
      aides: [`$f(x) = ${nb(pk)}x + ${pc}$.`, `Calcule $f(${d})$.`, `$${nb(pk)} \\times ${d} = ${nb(arr(pk * d, 2))}$.`], solution: `$f(${d}) = ${nb(pk)} \\times ${d} + ${pc} = ${nb(C)}$ €.` };
    return { enonce: `Un taxi facture $${pc}$ € de prise en charge et $${nb(pk)}$ € par kilomètre. Une course a coûté $${nb(C)}$ €. Quelle distance a été parcourue ?`, mode: "nombre", prefixe: "Distance :", suffixe: "km", attendu: d,
      erreurs: [{ valeur: arr(C / pk, 2), message: "Retire d'abord la prise en charge." }],
      aides: [`Résous $${nb(pk)}x + ${pc} = ${nb(C)}$.`, `$${nb(pk)}x = ${nb(arr(C - pc, 2))}$.`, `Divise par $${nb(pk)}$.`], solution: `$x = \\dfrac{${nb(arr(C - pc, 2))}}{${nb(pk)}} = ${d}$ km.` };
  };

  /* =====================================================================
     Chapitre 8 : proportionnalité et pourcentages (pp3-) — évolutions, grandeurs composées
     ===================================================================== */
  const pct = (p) => `${nb(p)}\\,\\%`;

  GEN["pp3-pourcentage"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // appliquer un pourcentage
      const p = pick([5, 12, 15, 20, 25, 30, 35, 40, 45, 60, 75, 80]), N = rand(2, 60) * 20, r = arr((p * N) / 100, 2);
      if (!Number.isInteger(r)) return GEN["pp3-pourcentage"]();
      const ctx = pick([["élèves d'un collège", "font du sport"], ["habitants d'une commune", "ont moins de 20 ans"], ["spectateurs d'un concert", "sont venus en bus"]]);
      return { enonce: `Parmi les $${nb(N)}$ ${ctx[0]}, $${pct(p)}$ ${ctx[1]}. Combien cela représente-t-il de personnes ?`, mode: "nombre", prefixe: "Nombre :", attendu: r,
        erreurs: [{ valeur: arr(N / p, 2), message: `$${pct(p)}$ de $N$ se calcule $\\dfrac{${p}}{100} \\times N$.` }],
        aides: [`Prendre $${pct(p)}$ d'un nombre, c'est le multiplier par $\\dfrac{${p}}{100}$.`, `$\\dfrac{${p}}{100} \\times ${nb(N)}$.`, `$${nb(N)} \\div 100 = ${nb(N / 100)}$.`], solution: `$\\dfrac{${p}}{100} \\times ${nb(N)} = ${nb(r)}$.` };
    }
    if (t === 1) { // trouver un taux d'évolution
      const p = pick([4, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50]) * (Math.random() < 0.5 ? -1 : 1), V0 = rand(2, 30) * 20, V1 = arr(V0 * (1 + p / 100), 2);
      return { enonce: `Un prix passe de $${nb(V0)}$ € à $${nb(V1)}$ €. Quel est le pourcentage d'évolution ? (Réponds par un nombre négatif s'il s'agit d'une baisse.)`, mode: "nombre", prefixe: "Évolution :", suffixe: "%", attendu: p,
        erreurs: [{ valeur: arr(V1 - V0, 2), message: "Ça, c'est la variation en euros ; divise-la par le prix de départ." }, { valeur: arr(((V1 - V0) / V1) * 100, 2), message: "On divise par la valeur de **départ**." }],
        aides: ["Taux d'évolution $= \\dfrac{\\text{valeur finale} - \\text{valeur initiale}}{\\text{valeur initiale}} \\times 100$.", `Variation : $${nb(V1)} - ${nb(V0)} = ${rel(arr(V1 - V0, 2))}$.`, `$\\dfrac{${rel(arr(V1 - V0, 2))}}{${nb(V0)}} \\times 100$.`],
        solution: `$\\dfrac{${rel(arr(V1 - V0, 2))}}{${nb(V0)}} \\times 100 = ${rel(p)}$ : ${p > 0 ? "hausse" : "baisse"} de $${pct(Math.abs(p))}$.` };
    }
    // retrouver la valeur initiale
    const p = pick([10, 20, 25, 50, 5, 30, 40]), up = Math.random() < 0.5, k = up ? 1 + p / 100 : 1 - p / 100, V0 = rand(2, 40) * 10, V1 = arr(V0 * k, 2);
    return { enonce: `Après une ${up ? "hausse" : "baisse"} de $${pct(p)}$, un article coûte $${nb(V1)}$ €. Quel était son prix avant ${up ? "la hausse" : "la baisse"} ?`, mode: "nombre", prefixe: "Prix initial :", suffixe: "€", attendu: V0,
      erreurs: [{ valeur: arr(up ? V1 * (1 - p / 100) : V1 * (1 + p / 100), 2), message: `On ne ${up ? "retire" : "rajoute"} pas $${pct(p)}$ du nouveau prix : on divise par le coefficient $${nb(k)}$.` }],
      aides: [`Le nouveau prix est l'ancien multiplié par $${nb(k)}$.`, `Donc ancien prix $\\times ${nb(k)} = ${nb(V1)}$.`, `Divise $${nb(V1)}$ par $${nb(k)}$.`], solution: `$${nb(V1)} \\div ${nb(k)} = ${nb(V0)}$ €.` };
  };

  GEN["pp3-evolutions"] = function () {
    const a = pick([10, 20, 25, 30, 40, 50]), b = pick([10, 20, 25, 30, 40, 50]), s1 = Math.random() < 0.6 ? 1 : -1, s2 = Math.random() < 0.6 ? -1 : 1;
    const k1 = 1 + (s1 * a) / 100, k2 = 1 + (s2 * b) / 100, K = arr(k1 * k2, 4), T = arr((K - 1) * 100, 2);
    const mot = (s, p) => `${s > 0 ? "une hausse" : "une baisse"} de $${pct(p)}$`;
    return { enonce: `Un prix subit ${mot(s1, a)}, puis ${mot(s2, b)}. Quel est le pourcentage d'évolution global ? (Négatif pour une baisse.)`, mode: "nombre", prefixe: "Évolution globale :", suffixe: "%", attendu: T,
      erreurs: [{ valeur: s1 * a + s2 * b, message: "Les pourcentages ne s'additionnent pas : on multiplie les coefficients." }],
      aides: [`Coefficients : $${nb(k1)}$ puis $${nb(k2)}$.`, `Coefficient global : $${nb(k1)} \\times ${nb(k2)} = ${nb(K)}$.`, `Taux : $(${nb(K)} - 1) \\times 100$.`],
      solution: `$${nb(k1)} \\times ${nb(k2)} = ${nb(K)}$ : évolution globale de $${rel(T)}\\,\\%$.` };
  };

  GEN["pp3-conversions"] = function () {
    const t = rand(0, 3);
    if (t === 0) { const v = pick([18, 36, 54, 72, 90, 108, 126, 144, 9, 27, 45, 63, 81, 99, 117, 135]), r = v / 3.6;
      return { enonce: `Convertis $${v}$ km/h en m/s.`, mode: "nombre", prefixe: "Vitesse :", suffixe: "m/s", attendu: r,
        erreurs: [{ valeur: arr(v * 3.6, 2), message: "Il faut diviser par $3{,}6$ (et non multiplier)." }],
        aides: ["$1$ km $= 1\\,000$ m et $1$ h $= 3\\,600$ s.", `$${v}$ km/h $= \\dfrac{${v} \\times 1\\,000 \\text{ m}}{3\\,600 \\text{ s}}$.`, "Diviser par $3{,}6$ revient au même."], solution: `$\\dfrac{${nb(v * 1000)}}{3\\,600} = ${nb(r)}$ m/s.` }; }
    if (t === 1) { const v = rand(2, 40), r = arr(v * 3.6, 2);
      return { enonce: `Convertis $${v}$ m/s en km/h.`, mode: "nombre", prefixe: "Vitesse :", suffixe: "km/h", attendu: r,
        erreurs: [{ valeur: arr(v / 3.6, 4), message: "Pour passer des m/s aux km/h, on multiplie par $3{,}6$." }],
        aides: ["En $1$ h $= 3\\,600$ s, on parcourt $3\\,600$ fois plus.", `$${v} \\times 3\\,600 = ${nb(v * 3600)}$ m par heure.`, "Convertis les mètres en kilomètres."], solution: `$${v} \\times 3{,}6 = ${nb(r)}$ km/h.` }; }
    if (t === 2) { const d = rand(2, 30), r = d * 60;
      return { enonce: `Un robinet a un débit de $${d}$ L/min. Quel est son débit en L/h ?`, mode: "nombre", prefixe: "Débit :", suffixe: "L/h", attendu: r,
        erreurs: [{ valeur: arr(d / 60, 4), message: "En une heure, il coule $60$ fois plus d'eau qu'en une minute." }],
        aides: ["$1$ h $= 60$ min.", `En $60$ minutes : $${d} \\times 60$.`, "Calcule."], solution: `$${d} \\times 60 = ${nb(r)}$ L/h.` }; }
    const rho = pick([0.8, 1.2, 2.7, 7.8, 0.9, 1.5, 2.5, 11.3]), r = rho * 1000;
    return { enonce: `La masse volumique d'un matériau est $${nb(rho)}$ g/cm³. Exprime-la en kg/m³.`, mode: "nombre", prefixe: "Masse volumique :", suffixe: "kg/m³", attendu: r,
      erreurs: [{ valeur: rho / 1000, message: "$1$ m³ $= 1\\,000\\,000$ cm³ et $1$ kg $= 1\\,000$ g : on multiplie par $1\\,000$." }],
      aides: ["$1$ m³ $= 1\\,000\\,000$ cm³.", `$${nb(rho)}$ g/cm³ $= ${nb(rho)} \\times 1\\,000\\,000$ g/m³.`, "Puis divise par $1\\,000$ pour avoir des kg."], solution: `$${nb(rho)} \\times 1\\,000\\,000 \\div 1\\,000 = ${nb(r)}$ kg/m³.` };
  };

  GEN["pp3-grandeurs"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // vitesse moyenne avec durée en h et min
      const h = rand(0, 3), m = pick([15, 30, 45, 20, 40]), D = h * 60 + m, v = pick([40, 50, 60, 72, 80, 90, 120]), d = arr((v * D) / 60, 2);
      if (!Number.isInteger(d * 10)) return GEN["pp3-grandeurs"]();
      const q = rand(0, 1);
      if (q === 0) return { enonce: `Une voiture roule à la vitesse moyenne de $${v}$ km/h pendant ${h ? `$${h}$ h ` : ""}$${m}$ min. Quelle distance parcourt-elle ?`, mode: "nombre", prefixe: "Distance :", suffixe: "km", attendu: d,
        erreurs: [{ valeur: arr(v * (h + m / 100), 2), message: `$${m}$ min ne font pas $0{,}${m}$ h : $${m}$ min $= \\dfrac{${m}}{60}$ h.` }],
        aides: ["distance $=$ vitesse $\\times$ durée, avec la durée en heures.", `$${h ? `${h}$ h ` : ""}$${m}$ min $= ${nb(arr(D / 60, 4))}$ h.`.replace("$$", "$"), `$${v} \\times ${nb(arr(D / 60, 4))}$.`],
        solution: `$${v} \\times \\dfrac{${D}}{60} = ${nb(d)}$ km.` };
      return { enonce: `Un véhicule parcourt $${nb(d)}$ km en ${h ? `$${h}$ h ` : ""}$${m}$ min. Quelle est sa vitesse moyenne en km/h ?`, mode: "nombre", prefixe: "Vitesse :", suffixe: "km/h", attendu: v,
        erreurs: [{ valeur: arr(d / (h + m / 100), 2), message: `$${m}$ min $= \\dfrac{${m}}{60}$ h, pas $0{,}${m}$ h.` }],
        aides: ["vitesse $= \\dfrac{\\text{distance}}{\\text{durée}}$, avec la durée en heures.", `Durée : $\\dfrac{${D}}{60}$ h.`, `$${nb(d)} \\div \\dfrac{${D}}{60} = ${nb(d)} \\times \\dfrac{60}{${D}}$.`],
        solution: `$${nb(d)} \\times \\dfrac{60}{${D}} = ${v}$ km/h.` };
    }
    if (t === 1) { // masse volumique
      const rho = pick([0.8, 1, 2.7, 7.8, 0.9, 1.2]), V = rand(2, 50) * 10, q = rand(0, 1), M = arr(rho * V, 2);
      return q === 0 ? { enonce: `Un objet a une masse volumique de $${nb(rho)}$ g/cm³ et un volume de $${V}$ cm³. Quelle est sa masse ?`, mode: "nombre", prefixe: "Masse :", suffixe: "g", attendu: M,
        erreurs: [{ valeur: arr(V / rho, 2), message: "masse $=$ masse volumique $\\times$ volume." }], aides: ["La masse volumique est la masse d'un cm³.", `Pour $${V}$ cm³ : $${nb(rho)} \\times ${V}$.`, "Calcule."], solution: `$${nb(rho)} \\times ${V} = ${nb(M)}$ g.` }
        : { enonce: `Un objet de $${V}$ cm³ a une masse de $${nb(M)}$ g. Quelle est sa masse volumique en g/cm³ ?`, mode: "nombre", prefixe: "Masse volumique :", suffixe: "g/cm³", attendu: rho,
        erreurs: [{ valeur: arr(V / M, 4), message: "masse volumique $= \\dfrac{\\text{masse}}{\\text{volume}}$." }], aides: ["masse volumique $= \\dfrac{\\text{masse}}{\\text{volume}}$.", `$\\dfrac{${nb(M)}}{${V}}$.`, "Calcule."], solution: `$${nb(M)} \\div ${V} = ${nb(rho)}$ g/cm³.` };
    }
    // proportionnalité : quatrième proportionnelle
    const a = rand(2, 12), pu = pick([0.5, 1.2, 1.5, 2.4, 3, 4.5, 2.5, 0.8]), b = rand(2, 20), pa = arr(a * pu, 2), pb = arr(b * pu, 2);
    const obj = pick([["kg de mangues", "€"], ["litres de jus", "€"], ["mètres de tissu", "€"]]);
    return { enonce: `$${a}$ ${obj[0]} coûtent $${nb(pa)}$ ${obj[1]}. Combien coûtent $${b}$ ${obj[0]} (le prix est proportionnel à la quantité) ?`, mode: "nombre", prefixe: "Prix :", suffixe: obj[1], attendu: pb,
      erreurs: [{ valeur: arr(pa + b - a, 2), message: "Ce n'est pas un écart constant : c'est une situation de proportionnalité." }],
      aides: [`Calcule d'abord le prix d'une unité : $${nb(pa)} \\div ${a}$.`, `Prix unitaire : $${nb(pu)}$ ${obj[1]}.`, `Multiplie par $${b}$.`], solution: `$${nb(pa)} \\div ${a} \\times ${b} = ${nb(pu)} \\times ${b} = ${nb(pb)}$ ${obj[1]}.` };
  };

  /* =====================================================================
     Chapitre 9 : probabilités (pr3-) — contraire, deux épreuves, arbres, fréquences
     ===================================================================== */
  const urne3 = () => { const r = rand(1, 8), v = rand(1, 8), j = rand(0, 6); return { r, v, j, n: r + v + j, txt: `Une urne contient $${r}$ boule${r > 1 ? "s" : ""} rouge${r > 1 ? "s" : ""}, $${v}$ verte${v > 1 ? "s" : ""}${j ? ` et $${j}$ jaune${j > 1 ? "s" : ""}` : ""}, indiscernables au toucher.` }; };

  GEN["pr3-simple"] = function () {
    const U = urne3(), t = rand(0, 2);
    if (t === 0) { const v = U.r / U.n;
      return { enonce: `${U.txt} On tire une boule au hasard. Quelle est la probabilité qu'elle soit rouge ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "$P(R) =$", attendu: v,
        erreurs: [{ valeur: U.r / (U.n - U.r), message: "On divise par le nombre **total** de boules." }, ...approx(v)],
        aides: ["Les tirages sont équiprobables.", `Il y a $${U.n}$ boules en tout, dont $${U.r}$ rouges.`, `$P(R) = \\dfrac{${U.r}}{${U.n}}$.`], solution: `$P(R) = ${fr(U.r, U.n)}${pgcd(U.r, U.n) > 1 ? ` = ${frS(U.r, U.n)}` : ""}$.` }; }
    if (t === 1) { const v = 1 - U.v / U.n;
      return { enonce: `${U.txt} On tire une boule au hasard. Quelle est la probabilité qu'elle ne soit pas verte ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Probabilité :", attendu: v,
        erreurs: [{ valeur: U.v / U.n, message: "Ça, c'est la probabilité qu'elle soit verte." }, ...approx(v)],
        aides: ["« Ne pas être verte » est l'événement contraire de « être verte ».", `$P(V) = ${fr(U.v, U.n)}$.`, "$P(\\overline{V}) = 1 - P(V)$."], solution: `$1 - ${fr(U.v, U.n)} = ${frS(U.n - U.v, U.n)}$.` }; }
    // non équiprobable : roue
    const a = pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.35]), b = pick([0.1, 0.2, 0.25, 0.3, 0.4]), c = arr(1 - a - b, 2);
    if (c <= 0) return GEN["pr3-simple"]();
    return { enonce: `Une roue a trois secteurs : bleu (probabilité $${nb(a)}$), rouge (probabilité $${nb(b)}$) et vert. Quelle est la probabilité d'obtenir le vert ?`, mode: "nombre", prefixe: "$P(\\text{vert}) =$", attendu: c,
      erreurs: [{ valeur: arr(1 / 3, 4), message: "Les secteurs n'ont pas la même probabilité : on utilise que la somme vaut $1$." }],
      aides: ["La somme des probabilités de toutes les issues vaut $1$.", `$P(\\text{vert}) = 1 - ${nb(a)} - ${nb(b)}$.`, "Calcule."], solution: `$1 - ${nb(a)} - ${nb(b)} = ${nb(c)}$.` };
  };

  GEN["pr3-deux-epreuves"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // deux dés : somme
      const k = rand(2, 12), n = 6 - Math.abs(7 - k), v = n / 36;
      return { enonce: `On lance deux dés équilibrés à six faces et on additionne les résultats. Quelle est la probabilité d'obtenir une somme égale à $${k}$ ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Probabilité :", attendu: v,
        erreurs: [{ valeur: 1 / 11, message: "Les $11$ sommes possibles ne sont pas équiprobables : utilise un tableau à double entrée ($36$ cases)." }, ...approx(v)],
        aides: ["Fais un tableau à double entrée : $6 \\times 6 = 36$ issues équiprobables.", `Compte les cases où la somme vaut $${k}$.`, `Il y en a $${n}$.`], solution: `$${n}$ cases sur $36$ : $P = ${fr(n, 36)}${pgcd(n, 36) > 1 ? ` = ${frS(n, 36)}` : ""}$.` };
    }
    if (t === 1) { // deux tirages avec remise
      const U = urne3(), v = (U.r / U.n) ** 2;
      return { enonce: `${U.txt} On tire une boule, on note sa couleur, on la remet, puis on en tire une seconde. Quelle est la probabilité d'obtenir deux boules rouges ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Probabilité :", attendu: v,
        erreurs: [{ valeur: (2 * U.r) / U.n, message: "On multiplie les probabilités le long d'une branche de l'arbre (on n'additionne pas)." }, ...approx(v)],
        aides: ["Dessine un arbre à deux niveaux.", `À chaque tirage, $P(R) = ${fr(U.r, U.n)}$ (on remet la boule).`, "On multiplie les probabilités sur le chemin R-R."], solution: `$${fr(U.r, U.n)} \\times ${fr(U.r, U.n)} = ${frS(U.r * U.r, U.n * U.n)}$.` };
    }
    // pièce + dé : tableau
    const face = pick(["pile", "face"]), cond = pick([["un nombre pair", 3], ["un multiple de $3$", 2], ["un $6$", 1], ["un nombre supérieur à $4$", 2], ["un nombre premier", 3]]), v = (1 / 2) * (cond[1] / 6);
    return { enonce: `On lance une pièce équilibrée puis un dé équilibré à six faces. Quelle est la probabilité d'obtenir « ${face} » et ${cond[0]} ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Probabilité :", attendu: v,
      erreurs: [{ valeur: 1 / 2 + cond[1] / 6, message: "« Et » sur deux épreuves successives : on multiplie." }, ...approx(v)],
      aides: ["Il y a $2 \\times 6 = 12$ issues équiprobables.", `$P(\\text{${face}}) = ${fr(1, 2)}$ et $P(\\text{dé}) = ${fr(cond[1], 6)}$.`, "Multiplie."], solution: `$${fr(1, 2)} \\times ${fr(cond[1], 6)} = ${frS(cond[1], 12)}$.` };
  };

  GEN["pr3-arbre"] = function () {
    const r = rand(2, 7), v = rand(1, 6), n = r + v, t = rand(0, 2);
    const txt = `Un sac contient $${r}$ jetons rouges et $${v}$ jeton${v > 1 ? "s" : ""} vert${v > 1 ? "s" : ""}. On tire un jeton, on le garde, puis on en tire un second (sans remise).`;
    if (t === 0) { const P = (r / n) * ((r - 1) / (n - 1));
      return { enonce: `${txt} Quelle est la probabilité de tirer deux jetons rouges ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Probabilité :", attendu: P,
        erreurs: [{ valeur: (r / n) ** 2, message: "Sans remise, il reste un jeton de moins au second tirage." }, ...approx(P)],
        aides: ["Dessine un arbre à deux niveaux.", `Premier tirage : $P(R) = ${fr(r, n)}$. Il reste alors $${r - 1}$ rouges sur $${n - 1}$ jetons.`, "Multiplie les probabilités le long du chemin."], solution: `$${fr(r, n)} \\times ${fr(r - 1, n - 1)} = ${frS(r * (r - 1), n * (n - 1))}$.` }; }
    if (t === 1) { const P = 2 * (r / n) * (v / (n - 1));
      return { enonce: `${txt} Quelle est la probabilité d'obtenir deux jetons de couleurs différentes ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Probabilité :", attendu: P,
        erreurs: [{ valeur: (r / n) * (v / (n - 1)), message: "Il y a deux chemins : rouge puis vert, et vert puis rouge." }, ...approx(P)],
        aides: ["Deux chemins conviennent : R puis V, et V puis R.", `$P(R \\text{ puis } V) = ${fr(r, n)} \\times ${fr(v, n - 1)}$.`, `$P(V \\text{ puis } R) = ${fr(v, n)} \\times ${fr(r, n - 1)}$ ; additionne.`], solution: `$2 \\times ${fr(r * v, n * (n - 1))} = ${frS(2 * r * v, n * (n - 1))}$.` }; }
    const P = 1 - (v / n) * ((v - 1) / (n - 1));
    if (v < 2) return GEN["pr3-arbre"]();
    return { enonce: `${txt} Quelle est la probabilité d'obtenir au moins un jeton rouge ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Probabilité :", attendu: P,
      erreurs: [{ valeur: (v / n) * ((v - 1) / (n - 1)), message: "Ça, c'est la probabilité de l'événement contraire « deux verts »." }, ...approx(P)],
      aides: ["« Au moins un rouge » est le contraire de « deux verts ».", `$P(\\text{deux verts}) = ${fr(v, n)} \\times ${fr(v - 1, n - 1)}$.`, "$P = 1 - P(\\text{deux verts})$."], solution: `$1 - ${frS(v * (v - 1), n * (n - 1))} = ${frS(n * (n - 1) - v * (v - 1), n * (n - 1))}$.` };
  };

  GEN["pr3-frequences"] = function () {
    if (Math.random() < 0.55) {
      const N = pick([50, 100, 200, 250, 500, 1000]), p = pick([1 / 6, 1 / 2, 1 / 4, 1 / 3]), k = Math.round(N * p) + rand(-Math.round(N / 25), Math.round(N / 25)), f = arr(k / N, 3);
      return { enonce: `On lance $${N}$ fois ${p === 1 / 2 ? "une pièce" : p === 1 / 4 ? "un dé à quatre faces" : p === 1 / 3 ? "une roue à trois secteurs égaux" : "un dé à six faces"} et on obtient $${k}$ fois ${p === 1 / 2 ? "pile" : "le résultat « 1 »"}. Quelle est la fréquence d'apparition (en écriture décimale) ?`, mode: "nombre", prefixe: "Fréquence :", attendu: f,
        erreurs: [{ valeur: arr(p, 3), message: "Ça, c'est la probabilité théorique ; on demande la fréquence observée." }],
        aides: ["Fréquence $= \\dfrac{\\text{nombre de fois où l'issue apparaît}}{\\text{nombre total d'essais}}$.", `$\\dfrac{${k}}{${N}}$.`, "Fais la division."], solution: `$\\dfrac{${k}}{${N}} = ${nb(f)}$, proche de la probabilité $${nb(arr(p, 3))}$.` };
    }
    const Q = pick([
      ["Quand on répète une expérience un très grand nombre de fois, la fréquence d'une issue :", "se rapproche de sa probabilité", ["devient égale à $0{,}5$", "s'éloigne de sa probabilité", "vaut toujours $1$"]],
      ["On a obtenu $5$ fois « pile » de suite avec une pièce équilibrée. Au lancer suivant :", "la probabilité de « pile » vaut toujours $\\dfrac{1}{2}$", ["« face » est plus probable", "« pile » est plus probable", "la probabilité de « pile » est $\\dfrac{1}{6}$"]],
      ["Une probabilité est toujours :", "comprise entre $0$ et $1$", ["supérieure à $1$", "un nombre entier", "égale à $\\dfrac{1}{2}$"]],
      ["Un événement impossible a pour probabilité :", "$0$", ["$1$", "$\\dfrac{1}{2}$", "$-1$"]],
      ["Si $P(A) = 0{,}35$, alors $P(\\overline{A})$ vaut :", "$0{,}65$", ["$0{,}35$", "$-0{,}35$", "$1{,}35$"]],
      ["Pour estimer une probabilité inconnue (une punaise qui tombe sur la pointe), on peut :", "faire un grand nombre d'essais et calculer la fréquence", ["faire un seul essai", "diviser $1$ par $2$", "compter les faces de la punaise"]]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["Une probabilité est entre $0$ et $1$.", "La fréquence observée se rapproche de la probabilité quand le nombre d'essais augmente.", "Les lancers successifs d'une pièce sont indépendants."], solution: `Réponse : ${Q[1]}.` };
  };

  /* =====================================================================
     Chapitre 10 : statistiques (st3-) — fréquences, indicateurs, classes, comparaison
     ===================================================================== */
  const med3 = (T) => { const n = T.length; return n % 2 ? T[(n - 1) / 2] : (T[n / 2 - 1] + T[n / 2]) / 2; };

  GEN["st3-frequences"] = function () {
    const N = pick([20, 25, 40, 50, 200, 100]), cats = pick([["Bus", "Voiture", "À pied", "Taxi"], ["Football", "Handball", "Basket", "Natation"], ["Mangue", "Banane", "Ananas", "Papaye"]]);
    for (;;) {
      const e = cats.map(() => rand(1, N)); const s = e.slice(0, 3).reduce((a, b) => a + b, 0); if (s >= N) continue; e[3] = N - s;
      const i = rand(0, 3), f = arr((e[i] / N) * 100, 2);
      if (!Number.isInteger(f * 10)) continue;
      const tab = { lignes: [["\\text{Choix}", "\\text{Effectif}"], ...cats.map((c, j) => [`\\text{${c}}`, String(e[j])])] };
      return { enonce: `Le tableau donne les réponses de $${N}$ personnes. Quelle est la fréquence de la réponse « ${cats[i]} », en pourcentage ?`, tableau: tab, mode: "nombre", prefixe: "Fréquence :", suffixe: "%", attendu: f,
        erreurs: [{ valeur: arr(e[i] / N, 4), message: "Ça, c'est la fréquence en écriture décimale : multiplie par $100$ pour l'avoir en pourcentage." }, { valeur: e[i], message: "Ça, c'est l'effectif ; divise-le par l'effectif total." }],
        aides: ["Fréquence $= \\dfrac{\\text{effectif}}{\\text{effectif total}}$.", `$\\dfrac{${e[i]}}{${N}} = ${nb(arr(e[i] / N, 4))}$.`, "Multiplie par $100$ pour obtenir un pourcentage."], solution: `$\\dfrac{${e[i]}}{${N}} \\times 100 = ${nb(f)}\\,\\%$.` };
    }
  };

  GEN["st3-indicateurs"] = function () {
    for (;;) {
      const v0 = rand(5, 14), vals = [0, 1, 2, 3, 4, 5].slice(0, rand(5, 6)).map((k) => v0 + k), eff = vals.map(() => rand(1, 9)), N = eff.reduce((a, b) => a + b, 0);
      const T = []; vals.forEach((v, i) => { for (let k = 0; k < eff[i]; k++) T.push(v); });
      const S = vals.reduce((s, v, i) => s + v * eff[i], 0), m = S / N, q = rand(0, 2);
      if (q === 0 && !Number.isInteger(m * 100)) continue;
      const tab = { lignes: [["\\text{Note}", ...vals.map(String)], ["\\text{Effectif}", ...eff.map(String)]] };
      if (q === 0) return { enonce: "Le tableau donne les notes d'un contrôle. Calcule la moyenne de la classe.", tableau: tab, mode: "nombre", prefixe: "Moyenne :", attendu: m,
        erreurs: [{ valeur: arr(vals.reduce((a, b) => a + b, 0) / vals.length, 4), message: "Il faut pondérer chaque note par son effectif." }],
        aides: ["Moyenne $= \\dfrac{\\text{somme des (note} \\times \\text{effectif)}}{\\text{effectif total}}$.", `Somme : $${S}$.`, `Effectif total : $${N}$.`], solution: `$\\dfrac{${S}}{${N}} = ${nb(m)}$.` };
      if (q === 1) { const M = med3(T);
        return { enonce: "Le tableau donne les notes d'un contrôle. Détermine la médiane des notes.", tableau: tab, mode: "nombre", prefixe: "Médiane :", attendu: M,
          erreurs: [{ valeur: vals[Math.floor(vals.length / 2)], message: "La médiane dépend des effectifs : utilise les effectifs cumulés." }],
          aides: [`Effectif total : $${N}$.`, N % 2 ? `La médiane est la $${(N + 1) / 2}$e note.` : `La médiane est la moyenne des $${N / 2}$e et $${N / 2 + 1}$e notes.`, "Cumule les effectifs de gauche à droite pour trouver la colonne."],
          solution: `Avec $${N}$ notes, ${N % 2 ? `la $${(N + 1) / 2}$e` : `les $${N / 2}$e et $${N / 2 + 1}$e`} ${N % 2 ? "est" : "donnent"} $${nb(M)}$ : la médiane est $${nb(M)}$.` }; }
      const e = vals[vals.length - 1] - vals[0];
      return { enonce: "Le tableau donne les notes d'un contrôle. Quelle est l'étendue de la série ?", tableau: tab, mode: "nombre", prefixe: "Étendue :", attendu: e,
        erreurs: [{ valeur: Math.max(...eff) - Math.min(...eff), message: "L'étendue se calcule sur les notes, pas sur les effectifs." }],
        aides: ["Étendue $=$ plus grande valeur $-$ plus petite valeur.", `Plus grande note : $${vals[vals.length - 1]}$.`, `Plus petite note : $${vals[0]}$.`], solution: `$${vals[vals.length - 1]} - ${vals[0]} = ${e}$.` };
    }
  };

  GEN["st3-classes"] = function () {
    for (;;) {
      const a = pick([0, 10, 20, 140, 150]), w = pick([10, 20]), k = rand(4, 5), eff = Array.from({ length: k }, () => rand(2, 12)), N = eff.reduce((x, y) => x + y, 0);
      const cl = eff.map((_, i) => [a + i * w, a + (i + 1) * w]), centres = cl.map(([u, v]) => (u + v) / 2), S = centres.reduce((s, c, i) => s + c * eff[i], 0), m = S / N;
      const unite = a >= 140 ? "Taille (cm)" : "Temps (min)";
      const tab = { lignes: [[`\\text{${unite}}`, "\\text{Effectif}"], ...cl.map(([u, v], j) => [`[${u} ; ${v}[`, String(eff[j])])] };
      if (Math.random() < 0.5) {
        if (!Number.isInteger(m * 100)) continue;
        return { enonce: "Les données sont regroupées en classes. Calcule une estimation de la moyenne en utilisant le centre de chaque classe.", tableau: tab, mode: "nombre", prefixe: "Moyenne :", attendu: m,
          erreurs: [{ valeur: arr(cl.reduce((s, [u], i) => s + u * eff[i], 0) / N, 4), message: "On prend le centre de chaque classe, pas sa borne inférieure." }],
          aides: [`Centres des classes : $${centres.join(" \\; ; \\; ")}$.`, `Somme des (centre $\\times$ effectif) : $${S}$.`, `Effectif total : $${N}$.`], solution: `$\\dfrac{${S}}{${N}} = ${nb(m)}$.` };
      }
      let c = 0, j = 0; const rang = Math.ceil(N / 2); while (c + eff[j] < rang) { c += eff[j]; j++; }
      const bonne = `$[${cl[j][0]} ; ${cl[j][1]}[$`, faux = cl.filter((_, i) => i !== j).map(([u, v]) => `$[${u} ; ${v}[$`);
      const { choix, attendu } = melange(bonne, shuffle(faux).slice(0, 3));
      return { enonce: "Les données sont regroupées en classes. Dans quelle classe se trouve la médiane ?", tableau: tab, mode: "choix", choix, attendu,
        aides: [`Effectif total : $${N}$ ; la médiane est vers la $${rang}$e valeur.`, "Cumule les effectifs de gauche à droite.", `Effectifs cumulés : $${eff.map((_, i) => eff.slice(0, i + 1).reduce((x, y) => x + y, 0)).join(" \\; ; \\; ")}$.`],
        solution: `Les effectifs cumulés atteignent $${rang}$ dans la classe ${bonne} : la médiane s'y trouve.` };
    }
  };

  GEN["st3-comparer"] = function () {
    if (Math.random() < 0.5) { // note nécessaire
      const n = rand(3, 6), notes = Array.from({ length: n }, () => rand(6, 18)), M = rand(10, 15), x = M * (n + 1) - notes.reduce((a, b) => a + b, 0);
      if (x < 0 || x > 20) return GEN["st3-comparer"]();
      return { enonce: `Lina a obtenu les notes $${notes.join(" \\; ; \\; ")}$. Quelle note doit-elle avoir au prochain contrôle pour obtenir une moyenne de $${M}$ ?`, mode: "nombre", prefixe: "Note :", attendu: x,
        erreurs: [{ valeur: M, message: "Ce n'est pas la moyenne voulue elle-même : les autres notes comptent aussi." }],
        aides: [`Avec $${n + 1}$ notes de moyenne $${M}$, la somme doit être $${n + 1} \\times ${M} = ${M * (n + 1)}$.`, `Somme actuelle : $${notes.reduce((a, b) => a + b, 0)}$.`, "Fais la différence."],
        solution: `$${M * (n + 1)} - ${notes.reduce((a, b) => a + b, 0)} = ${x}$ : il lui faut $${x}$.` };
    }
    const m = rand(10, 14), e1 = rand(3, 6), e2 = rand(10, 16), A = pick(["A", "B"]);
    const Q = pick([
      [`Deux classes ont la même moyenne, $${m}$. L'étendue des notes est $${e1}$ en 3e ${A === "A" ? "A" : "B"} et $${e2}$ en 3e ${A === "A" ? "B" : "A"}. On peut dire que :`, `les notes de la 3e ${A === "A" ? "B" : "A"} sont plus dispersées`, [`les notes de la 3e ${A === "A" ? "A" : "B"} sont plus dispersées`, "les deux classes ont les mêmes notes", `la 3e ${A === "A" ? "B" : "A"} a la meilleure médiane`]],
      [`Dans une série, la médiane est $${m}$ et la moyenne $${m + rand(2, 4)}$. Cela peut s'expliquer par :`, "quelques valeurs très grandes", ["quelques valeurs très petites", "une étendue égale à zéro", "une erreur de calcul obligatoire"]],
      [`La médiane des salaires d'une entreprise est $${nb(m * 150)}$ €. Cela signifie :`, `qu'au moins la moitié des salariés gagne $${nb(m * 150)}$ € ou moins`, [`que tous les salariés gagnent $${nb(m * 150)}$ €`, `que le salaire moyen est $${nb(m * 150)}$ €`, `que la moitié gagne exactement $${nb(m * 150)}$ €`]],
      [`On ajoute la valeur $${m * 10}$ à une série dont toutes les valeurs sont entre $${m - 3}$ et $${m + 3}$. Quel indicateur change le plus ?`, "la moyenne et l'étendue", ["la médiane seulement", "aucun indicateur", "l'effectif total seulement"]]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["La moyenne est sensible aux valeurs extrêmes ; la médiane l'est peu.", "L'étendue mesure la dispersion.", "La médiane partage la série en deux groupes de même effectif."], solution: `Réponse : ${Q[1]}.` };
  };

  /* =====================================================================
     Chapitre 11 : théorème de Thalès (th3-) — deux configurations, réciproque, problèmes
     ===================================================================== */
  const NOMS3 = [["A", "M", "N", "B", "C"], ["O", "E", "F", "G", "H"], ["S", "R", "T", "U", "V"], ["K", "I", "J", "L", "P"]];
  // k > 0 : triangle emboîté (M sur [AB]) ; k < 0 : papillon (M sur la demi-droite opposée)
  function figureThales3(noms, k) {
    const [A, M, N, B, C] = noms;
    const pA = k > 0 ? [150, 20] : [150, 92], pB = k > 0 ? [36, 182] : [52, 184], pC = k > 0 ? [292, 176] : [272, 178];
    const P = (u, v, t) => [+(u[0] + t * (v[0] - u[0])).toFixed(1), +(u[1] + t * (v[1] - u[1])).toFixed(1)];
    const pM = P(pA, pB, k), pN = P(pA, pC, k);
    const segs = k > 0 ? [[A, B], [A, C], [B, C], [M, N]] : [[M, B], [N, C], [B, C], [M, N]];
    const decal = k > 0 ? { [A]: [-4, -6], [B]: [-12, 6], [C]: [6, 6], [M]: [-14, 0], [N]: [6, 0] } : { [A]: [12, 4], [B]: [-12, 6], [C]: [6, 6], [M]: [8, -4], [N]: [-14, -4] };
    return geo({ W: 320, H: 200, pts: { [A]: pA, [B]: pB, [C]: pC, [M]: pM, [N]: pN }, segs, decal, aria: k > 0 ? `Triangle ${A}${B}${C}, ${M} sur [${A}${B}], ${N} sur [${A}${C}], (${M}${N}) parallèle à (${B}${C})` : `Configuration papillon : droites (${B}${M}) et (${C}${N}) sécantes en ${A}, (${M}${N}) parallèle à (${B}${C})` });
  }
  const tireThales3 = () => {
    for (;;) {
      const num = rand(1, 4), den = rand(num + 1, 7), k = num / den, AB = rand(2, 9) * den / pgcd(num, den), AC = rand(2, 9) * den / pgcd(num, den), BC = rand(2, 9) * den / pgcd(num, den);
      const AM = AB * k, AN = AC * k, MN = BC * k;
      if (AB + AC <= BC || AB + BC <= AC || AC + BC <= AB) continue;
      if ([AM, AN, MN].every((x) => Number.isInteger(x * 10))) return { k, AB, AC, BC, AM, AN, MN };
    }
  };

  GEN["th3-longueur"] = function () {
    const N = pick(NOMS3), [A, M, Np, B, C] = N, pap = Math.random() < 0.6, T = tireThales3(), t = rand(0, 2);
    const nomsL = { AM: A + M, AB: A + B, AN: A + Np, AC: A + C, MN: M + Np, BC: B + C };
    const [cherche, donnes] = [["AN", ["AM", "AB", "AC"]], ["MN", ["AM", "AB", "BC"]], ["AB", ["AM", "AN", "AC"]]][t];
    const vals = { AM: T.AM, AB: T.AB, AN: T.AN, AC: T.AC, MN: T.MN, BC: T.BC };
    const hyp = pap ? `Les droites $(${B}${M})$ et $(${C}${Np})$ se coupent en $${A}$, et $(${M}${Np}) \\parallel (${B}${C})$` : `$${M} \\in [${A}${B}]$, $${Np} \\in [${A}${C}]$ et $(${M}${Np}) \\parallel (${B}${C})$`;
    const r1 = `\\dfrac{${nomsL.AM}}{${nomsL.AB}}`, r2 = `\\dfrac{${nomsL.AN}}{${nomsL.AC}}`, r3 = `\\dfrac{${nomsL.MN}}{${nomsL.BC}}`;
    const rep = vals[cherche], egal = { AN: [r1, r2, `${nomsL.AN} = \\dfrac{${nb(T.AC)} \\times ${nb(T.AM)}}{${nb(T.AB)}}`], MN: [r1, r3, `${nomsL.MN} = \\dfrac{${nb(T.BC)} \\times ${nb(T.AM)}}{${nb(T.AB)}}`], AB: [r1, r2, `${nomsL.AB} = \\dfrac{${nb(T.AM)} \\times ${nb(T.AC)}}{${nb(T.AN)}}`] }[cherche];
    return { enonce: `${hyp}. On sait que ${donnes.map((d) => `$${nomsL[d]} = ${nb(vals[d])}$ cm`).join(", ")}. Calcule $${nomsL[cherche]}$.`, figure: figureThales3(N, pap ? -T.k : T.k), mode: "nombre", prefixe: `$${nomsL[cherche]} =$`, suffixe: "cm", attendu: rep,
      erreurs: [{ valeur: arr({ AN: (T.AC * T.AB) / T.AM, MN: (T.BC * T.AB) / T.AM, AB: (T.AN * T.AC) / T.AM }[cherche], 4), message: "Vérifie le rapport : petit triangle en haut, grand triangle en bas, côtés correspondants." }],
      aides: [pap ? "Configuration « papillon » : les deux triangles sont opposés par le sommet, le théorème de Thalès s'applique de la même façon." : "Le petit triangle est une réduction du grand.", `$${r1} = ${r2} = ${r3}$.`, `Choisis l'égalité $${egal[0]} = ${egal[1]}$ puis fais un produit en croix.`],
      solution: `D'après le théorème de Thalès, $${r1} = ${r2} = ${r3}$. Donc $${egal[2]} = ${nb(rep)}$ cm.` };
  };

  GEN["th3-reciproque"] = function () {
    const N = pick(NOMS3), [A, M, Np, B, C] = N, pap = Math.random() < 0.5;
    const AB = rand(4, 15), AM = rand(1, AB - 1), AC = rand(4, 15), AN0 = (AM * AC) / AB, par = Math.random() < 0.5;
    if (!Number.isInteger(AN0 * 10)) return GEN["th3-reciproque"]();
    const AN = par ? AN0 : arr(AN0 + pick([-0.5, 0.5, 1, -1]), 2); if (AN <= 0) return GEN["th3-reciproque"]();
    const pos = pap ? `Les points $${M}$, $${A}$, $${B}$ d'une part et $${Np}$, $${A}$, $${C}$ d'autre part sont alignés dans cet ordre` : `$${M} \\in [${A}${B}]$ et $${Np} \\in [${A}${C}]$`;
    const choix = [`Oui, car $\\dfrac{${A}${M}}{${A}${B}} = \\dfrac{${A}${Np}}{${A}${C}}$ et les points sont dans le même ordre`, `Non, car $\\dfrac{${A}${M}}{${A}${B}} \\neq \\dfrac{${A}${Np}}{${A}${C}}$`, `Oui, car $${A}${M} + ${A}${B} = ${A}${Np} + ${A}${C}$`, "On ne peut pas savoir sans mesurer les angles"];
    return { enonce: `${pos}, avec $${A}${M} = ${AM}$ cm, $${A}${B} = ${AB}$ cm, $${A}${Np} = ${nb(AN)}$ cm et $${A}${C} = ${AC}$ cm. Les droites $(${M}${Np})$ et $(${B}${C})$ sont-elles parallèles ?`, mode: "choix", choix, attendu: par ? 0 : 1,
      aides: ["Compare les rapports $\\dfrac{" + A + M + "}{" + A + B + "}$ et $\\dfrac{" + A + Np + "}{" + A + C + "}$ (ou les produits en croix).", `$${AM} \\times ${AC} = ${AM * AC}$ et $${AB} \\times ${nb(AN)} = ${nb(arr(AB * AN, 4))}$.`, "Égaux : réciproque de Thalès (droites parallèles). Différents : contraposée (pas parallèles)."],
      solution: par ? `$${AM} \\times ${AC} = ${AB} \\times ${nb(AN)}$ : les rapports sont égaux et les points sont dans le même ordre. D'après la réciproque du théorème de Thalès, les droites sont parallèles.` : `$${AM} \\times ${AC} = ${AM * AC}$ et $${AB} \\times ${nb(AN)} = ${nb(arr(AB * AN, 4))}$ : les rapports sont différents. D'après la contraposée du théorème de Thalès, les droites ne sont pas parallèles.` };
  };

  GEN["th3-rapport"] = function () {
    const N = pick(NOMS3), [A, M, Np, B, C] = N, AB = rand(4, 15), AM = rand(1, AB - 1), t = rand(0, 1);
    if (pgcd(AM, AB) === 1 && Math.random() < 0.3) return GEN["th3-rapport"]();
    const k = AM / AB;
    if (t === 0) { const S = rand(2, 12) * AB * AB, s = arr(S * k * k, 4);
      return { enonce: `Le triangle $${A}${M}${Np}$ est une réduction du triangle $${A}${B}${C}$ ($(${M}${Np}) \\parallel (${B}${C})$) avec $${A}${M} = ${AM}$ cm et $${A}${B} = ${AB}$ cm. L'aire de $${A}${B}${C}$ est $${nb(S)}$ cm². Quelle est l'aire de $${A}${M}${Np}$ ?`, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: s,
        erreurs: [{ valeur: arr(S * k, 4), message: "Dans une réduction de rapport $k$, les aires sont multipliées par $k^2$." }],
        aides: [`Rapport de réduction : $k = \\dfrac{${AM}}{${AB}}$.`, "Les aires sont multipliées par $k^2$.", `Aire $= ${nb(S)} \\times \\left(${fr(AM, AB)}\\right)^2$.`], solution: `$${nb(S)} \\times \\left(${fr(AM, AB)}\\right)^2 = ${nb(S)} \\times ${fr(AM * AM, AB * AB)} = ${nb(s)}$ cm².` }; }
    const bonne = `$${frS(AM, AB)}$`, faux = uniq3(bonne, [`$${frS(AB, AM)}$`, `$${frS(AM, AB - AM)}$`, `$${frS(AM * AM, AB * AB)}$`, `$${frS(AB - AM, AB)}$`]);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `$(${M}${Np}) \\parallel (${B}${C})$ avec $${M} \\in [${A}${B}]$, $${A}${M} = ${AM}$ cm et $${A}${B} = ${AB}$ cm. Quel est le coefficient de réduction qui transforme $${A}${B}${C}$ en $${A}${M}${Np}$ ?`, mode: "choix", choix, attendu,
      aides: ["Coefficient de réduction $=$ longueur du petit triangle $\\div$ longueur correspondante du grand.", `$k = \\dfrac{${A}${M}}{${A}${B}}$.`, "Il est inférieur à $1$."], solution: `$k = \\dfrac{${AM}}{${AB}} = ${frS(AM, AB)}$.` };
  };

  GEN["th3-problemes"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // largeur d'une rivière (papillon)
      const a = rand(2, 9), b = rand(3, 12), c = rand(4, 15), L = arr((b * c) / a, 2);
      if (!Number.isInteger(L * 10)) return GEN["th3-problemes"]();
      return { enonce: `Pour mesurer la largeur $L$ d'une rivière, on forme deux triangles opposés par un sommet, avec deux côtés parallèles. Du côté accessible, les côtés mesurent $${a}$ m et $${b}$ m ; le côté de l'autre triangle correspondant à $${a}$ m mesure $${c}$ m. Calcule la largeur $L$ (côté correspondant à $${b}$ m).`, mode: "nombre", prefixe: "$L =$", suffixe: "m", attendu: L,
        erreurs: [{ valeur: arr((a * c) / b, 2), message: "Les rapports se forment entre côtés correspondants : $\\dfrac{L}{" + b + "} = \\dfrac{" + c + "}{" + a + "}$." }],
        aides: ["Configuration papillon : le théorème de Thalès s'applique.", `$\\dfrac{L}{${b}} = \\dfrac{${c}}{${a}}$.`, `$L = \\dfrac{${b} \\times ${c}}{${a}}$.`], solution: `$L = \\dfrac{${b} \\times ${c}}{${a}} = ${nb(L)}$ m.` }; }
    if (t === 1) { // hauteur avec ombre
      const b = rand(10, 20) / 10, o = rand(15, 40) / 10, O = rand(8, 30), H = arr((b * O) / o, 2);
      if (!Number.isInteger(H * 100)) return GEN["th3-problemes"]();
      return { enonce: `Au même moment, un piquet vertical de $${nb(b)}$ m a une ombre de $${nb(o)}$ m et un immeuble a une ombre de $${O}$ m. Quelle est la hauteur de l'immeuble ?`, mode: "nombre", prefixe: "Hauteur :", suffixe: "m", attendu: H,
        erreurs: [{ valeur: arr((o * O) / b, 2), message: "Hauteur et ombre de l'immeuble sont proportionnelles à celles du piquet, dans le même sens." }],
        aides: ["Les rayons du soleil sont parallèles : configuration de Thalès.", `$\\dfrac{h}{${nb(b)}} = \\dfrac{${O}}{${nb(o)}}$.`, `$h = \\dfrac{${nb(b)} \\times ${O}}{${nb(o)}}$.`], solution: `$h = \\dfrac{${nb(b)} \\times ${O}}{${nb(o)}} = ${nb(H)}$ m.` }; }
    // agrandissement d'un volume / longueur sur une maquette
    const e = pick([10, 20, 25, 50, 100]), l = rand(3, 30), r = l * e;
    return { enonce: `Une maquette est une réduction à l'échelle $${fr(1, e)}$ d'un bateau. Sur la maquette, le mât mesure $${l}$ cm. Quelle est la hauteur réelle du mât, en mètres ?`, mode: "nombre", prefixe: "Hauteur :", suffixe: "m", attendu: r / 100,
      erreurs: [{ valeur: r, message: "C'est la hauteur en centimètres : convertis en mètres." }, { valeur: l / e, message: "La taille réelle est plus grande : on multiplie par $" + e + "$." }],
      aides: [`Échelle $${fr(1, e)}$ : $1$ cm sur la maquette représente $${e}$ cm en réalité.`, `$${l} \\times ${e} = ${r}$ cm.`, "$100$ cm $= 1$ m."], solution: `$${l} \\times ${e} = ${r}$ cm $= ${nb(r / 100)}$ m.` };
  };

  /* =====================================================================
     Chapitre 12 : triangles semblables (ts3-) — angles, côtés proportionnels, calculs, triangles égaux
     ===================================================================== */
  const TRI3 = [["ABC", "DEF"], ["IJK", "LMN"], ["RST", "UVW"], ["EFG", "PQR"]];

  GEN["ts3-angles"] = function () {
    const [T1, T2] = pick(TRI3), a = rand(25, 85), b = rand(25, 95 - Math.floor(a / 3)), c = 180 - a - b;
    if (c < 15 || a === b || b === c || a === c) return GEN["ts3-angles"]();
    const t = rand(0, 1);
    if (t === 0) {
      const sem = Math.random() < 0.5, d = sem ? b : b + pick([-6, -4, 4, 6, 8]), e = 180 - a - d;
      if (e < 10) return GEN["ts3-angles"]();
      const choix = [`Oui : leurs angles sont deux à deux de même mesure`, `Non : leurs angles ne sont pas deux à deux égaux`, `Oui : ils ont un angle de $${a}^\\circ$ en commun, cela suffit`, `On ne peut pas savoir sans les longueurs`];
      return { enonce: `Le triangle $${T1}$ a des angles de $${a}^\\circ$ et $${b}^\\circ$. Le triangle $${T2}$ a des angles de $${a}^\\circ$ et $${e}^\\circ$. Sont-ils semblables ?`, mode: "choix", choix, attendu: sem ? 0 : 1,
        aides: ["Deux triangles sont semblables si leurs angles sont deux à deux de même mesure.", "Calcule le troisième angle de chaque triangle : la somme des angles vaut $180^\\circ$.", `Troisième angle de $${T1}$ : $180 - ${a} - ${b} = ${c}^\\circ$ ; de $${T2}$ : $180 - ${a} - ${e} = ${180 - a - e}^\\circ$.`],
        solution: `Angles de $${T1}$ : $${a}^\\circ$, $${b}^\\circ$, $${c}^\\circ$ ; angles de $${T2}$ : $${a}^\\circ$, $${e}^\\circ$, $${180 - a - e}^\\circ$. ${sem ? "Ce sont les mêmes : les triangles sont semblables." : "Ils ne sont pas les mêmes : les triangles ne sont pas semblables."}` };
    }
    return { enonce: `Les triangles $${T1}$ et $${T2}$ sont semblables. $${T1}$ a des angles de $${a}^\\circ$ et $${b}^\\circ$. $${T2}$ a un angle de $${a}^\\circ$. Quelle est la mesure du plus petit des deux autres angles de $${T2}$ ?`, mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: Math.min(b, c),
      erreurs: [{ valeur: Math.max(b, c), message: "On demande le plus petit des deux autres angles." }],
      aides: ["Des triangles semblables ont les mêmes angles.", `Le troisième angle de $${T1}$ vaut $180 - ${a} - ${b} = ${c}^\\circ$.`, `Les angles de $${T2}$ sont donc $${a}^\\circ$, $${b}^\\circ$ et $${c}^\\circ$.`],
      solution: `Les angles de $${T2}$ sont $${a}^\\circ$, $${b}^\\circ$ et $${c}^\\circ$ : le plus petit des deux autres est $${Math.min(b, c)}^\\circ$.` };
  };

  GEN["ts3-cotes"] = function () {
    const [T1, T2] = pick(TRI3), base = shuffle([[3, 4, 5], [4, 5, 6], [5, 6, 8], [2, 3, 4], [5, 7, 9], [6, 7, 10], [4, 6, 7], [3, 5, 7]])[0], k = pick([1.5, 2, 2.5, 3, 0.5, 4]);
    const sem = Math.random() < 0.5, c2 = base.map((x) => arr(x * k, 2)); if (!sem) c2[rand(0, 2)] = arr(c2[0] + pick([-1, 1, 0.5]), 2);
    const tri = c2.slice().sort((p, q) => p - q);
    if (new Set(c2).size < 3 || tri[0] + tri[1] <= tri[2]) return GEN["ts3-cotes"]();
    const t = rand(0, 1);
    if (t === 0) {
      const choix = ["Oui : les longueurs des côtés sont proportionnelles", "Non : les longueurs des côtés ne sont pas proportionnelles", "Oui : ils ont tous les deux trois côtés", "On ne peut pas savoir sans les angles"];
      const melange2 = shuffle(c2.slice());
      return { enonce: `Les côtés de $${T1}$ mesurent $${base.join("$ cm, $")}$ cm ; ceux de $${T2}$ mesurent $${melange2.map(nb).join("$ cm, $")}$ cm. Ces triangles sont-ils semblables ?`, mode: "choix", choix, attendu: sem ? 0 : 1,
        aides: ["Range les côtés de chaque triangle dans l'ordre croissant.", "Calcule les quotients « grand triangle / petit triangle » des côtés correspondants.", "S'ils sont tous égaux, les côtés sont proportionnels et les triangles sont semblables."],
        solution: `Rangés : $${base.join(" ; ")}$ et $${c2.slice().sort((p, q) => p - q).map(nb).join(" ; ")}$. Quotients : ${base.map((x, i) => `$${nb(arr(c2.slice().sort((p, q) => p - q)[i] / x, 4))}$`).join(", ")}. ${sem ? "Ils sont égaux : les triangles sont semblables." : "Ils ne sont pas tous égaux : les triangles ne sont pas semblables."}` };
    }
    if (!sem) return GEN["ts3-cotes"]();
    return { enonce: `Le triangle $${T2}$ est un agrandissement ou une réduction de $${T1}$. Les côtés de $${T1}$ mesurent $${base.join("$ cm, $")}$ cm et le plus grand côté de $${T2}$ mesure $${nb(c2[2])}$ cm. Quel est le coefficient $k$ ?`, mode: "nombre", prefixe: "$k =$", attendu: k,
      erreurs: [{ valeur: arr(1 / k, 4), message: "$k = \\dfrac{\\text{côté de " + T2 + "}}{\\text{côté correspondant de " + T1 + "}}$." }],
      aides: ["Le plus grand côté de l'un correspond au plus grand côté de l'autre.", `$k = \\dfrac{${nb(c2[2])}}{${base[2]}}$.`, "Calcule le quotient."], solution: `$k = \\dfrac{${nb(c2[2])}}{${base[2]}} = ${nb(k)}$.` };
  };

  GEN["ts3-longueur"] = function () {
    const [T1, T2] = pick(TRI3), base = pick([[3, 4, 5], [4, 5, 6], [5, 6, 8], [6, 8, 9], [5, 7, 9], [6, 7, 10], [4, 6, 7]]), k = pick([1.5, 2, 2.5, 3, 4, 0.5]);
    const c2 = base.map((x) => arr(x * k, 2)), i = rand(0, 2), j = (i + 1 + rand(0, 1)) % 3;
    const n1 = [T1[0] + T1[1], T1[1] + T1[2], T1[0] + T1[2]], n2 = [T2[0] + T2[1], T2[1] + T2[2], T2[0] + T2[2]];
    return { enonce: `Les triangles $${T1}$ et $${T2}$ sont semblables, les sommets $${T1[0]}$, $${T1[1]}$, $${T1[2]}$ correspondant à $${T2[0]}$, $${T2[1]}$, $${T2[2]}$. On a $${n1[i]} = ${base[i]}$ cm, $${n1[j]} = ${base[j]}$ cm et $${n2[i]} = ${nb(c2[i])}$ cm. Calcule $${n2[j]}$.`, mode: "nombre", prefixe: `$${n2[j]} =$`, suffixe: "cm", attendu: c2[j],
      erreurs: [{ valeur: arr((base[j] * base[i]) / c2[i], 4), message: "Le coefficient est $\\dfrac{" + n2[i] + "}{" + n1[i] + "}$ (du premier triangle vers le second)." }],
      aides: ["Dans des triangles semblables, les longueurs des côtés correspondants sont proportionnelles.", `Coefficient : $k = \\dfrac{${n2[i]}}{${n1[i]}} = \\dfrac{${nb(c2[i])}}{${base[i]}} = ${nb(k)}$.`, `$${n2[j]} = ${nb(k)} \\times ${n1[j]}$.`],
      solution: `$k = \\dfrac{${nb(c2[i])}}{${base[i]}} = ${nb(k)}$, donc $${n2[j]} = ${nb(k)} \\times ${base[j]} = ${nb(c2[j])}$ cm.` };
  };

  GEN["ts3-egaux"] = function () {
    const Q = pick([
      ["Deux triangles qui ont leurs trois côtés deux à deux de même longueur sont :", "égaux (superposables)", ["seulement semblables, sans être égaux", "rectangles", "isocèles"]],
      ["Deux triangles égaux sont toujours :", "semblables", ["rectangles", "isocèles", "équilatéraux"]],
      ["Deux triangles semblables avec un coefficient $k = 1$ sont :", "égaux", ["différents", "isocèles", "rectangles"]],
      ["Deux triangles ont un angle de même mesure compris entre deux côtés deux à deux de même longueur. Ils sont :", "égaux", ["seulement semblables", "rectangles", "on ne peut pas savoir"]],
      ["Deux triangles ont un côté de même longueur compris entre deux angles deux à deux de même mesure. Ils sont :", "égaux", ["seulement semblables", "isocèles", "on ne peut pas savoir"]],
      ["Deux triangles qui ont seulement leurs trois angles deux à deux égaux sont :", "semblables, mais pas forcément égaux", ["toujours égaux", "jamais semblables", "forcément rectangles"]],
      ["Si un triangle est un agrandissement de rapport $3$ d'un autre, ses angles sont :", "les mêmes", ["multipliés par $3$", "multipliés par $9$", "divisés par $3$"]],
      ["Si un triangle est un agrandissement de rapport $2$ d'un autre, son aire est multipliée par :", "$4$", ["$2$", "$8$", "$1$"]],
      ["Deux triangles équilatéraux sont toujours :", "semblables", ["égaux", "rectangles", "de même aire"]],
      ["Deux triangles rectangles isocèles sont toujours :", "semblables", ["égaux", "de même périmètre", "équilatéraux"]]
    ]);
    if (Math.random() < 0.4) { // aire d'un agrandissement
      const k = pick([2, 3, 1.5, 0.5, 4]), A = rand(2, 30) * 4, r = arr(A * k * k, 2);
      return { enonce: `Un triangle a une aire de $${A}$ cm². On l'agrandit (ou le réduit) en multipliant ses longueurs par $${nb(k)}$. Quelle est l'aire du nouveau triangle ?`, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: r,
        erreurs: [{ valeur: arr(A * k, 2), message: "Les aires sont multipliées par $k^2$, pas par $k$." }],
        aides: ["Quand les longueurs sont multipliées par $k$, les aires sont multipliées par $k^2$.", `$k^2 = ${nb(arr(k * k, 4))}$.`, `$${A} \\times ${nb(arr(k * k, 4))}$.`], solution: `$${A} \\times ${nb(k)}^2 = ${A} \\times ${nb(arr(k * k, 4))} = ${nb(r)}$ cm².` };
    }
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["Semblables : mêmes angles (et côtés proportionnels).", "Égaux : superposables, mêmes côtés et mêmes angles.", "Des triangles égaux sont semblables avec $k = 1$."], solution: `Réponse : ${Q[1]}.` };
  };

  /* =====================================================================
     Chapitre 13 : trigonométrie (tg3-) — cosinus, sinus, tangente
     ===================================================================== */
  const NOMS_TG = [["A", "B", "C"], ["E", "F", "G"], ["R", "S", "T"], ["K", "L", "M"], ["H", "I", "J"]];
  // Triangle rectangle en R ; angle marqué en P1 ; labs = [R P1 (adjacent), R P2 (opposé), P1 P2 (hypoténuse), angle]
  function figTrig3(N, labs) {
    const [R, P1, P2] = N, pR = [62, 168], p1 = [282, 168], p2 = [62, 34];
    let s = geo({ W: 320, H: 196, pts: { [R]: pR, [P1]: p1, [P2]: p2 }, segs: [[R, P1], [R, P2], [P1, P2]], droitAngle: [[P1, R, P2]], decal: { [R]: [-12, 12], [P1]: [6, 12], [P2]: [-12, -2] }, aria: `Triangle ${R}${P1}${P2} rectangle en ${R}, angle marqué en ${P1}` });
    const t = (x, y, txt, a) => (txt ? `<text class="g-mesure" x="${x}" y="${y}" text-anchor="${a || "middle"}">${txt}</text>` : "");
    s = s.replace("</svg>", `<path class="g-arc" d="M252 168 A30 30 0 0 0 256.8 152.4"/>` + t(172, 186, labs[0]) + t(54, 104, labs[1], "end") + t(182, 92, labs[2], "start") + t(238, 160, labs[3], "end") + "</svg>");
    return s;
  }
  const decS = (x) => String(x).replace(".", ","), RAD = Math.PI / 180, TRIG = { cos: Math.cos, sin: Math.sin, tan: Math.tan };
  const degTex = (a) => `${a}^\\circ`;

  GEN["tg3-formule"] = function () {
    const N = pick(NOMS_TG), [R, P1, P2] = N, f = pick(["cos", "sin", "tan"]);
    const adj = `${R}${P1}`, opp = `${R}${P2}`, hyp = `${P1}${P2}`;
    const exprs = { cos: `\\dfrac{${adj}}{${hyp}}`, sin: `\\dfrac{${opp}}{${hyp}}`, tan: `\\dfrac{${opp}}{${adj}}` };
    const u = Math.random();
    if (u < 0.35) { // valeur d'un rapport à partir des longueurs (triangle pythagoricien)
      const [p, q, h] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29]]), sw = Math.random() < 0.5, A = sw ? q : p, O = sw ? p : q;
      const v = { cos: A / h, sin: O / h, tan: O / A }[f], [n, d] = { cos: [A, h], sin: [O, h], tan: [O, A] }[f];
      return { enonce: `$${R}${P1}${P2}$ est rectangle en $${R}$ avec $${adj} = ${A}$ cm, $${opp} = ${O}$ cm et $${hyp} = ${h}$ cm. Calcule $\\${f} \\widehat{${R}${P1}${P2}}$.${CONSIGNE_FR}`, figure: figTrig3(N, [`${A} cm`, `${O} cm`, `${h} cm`, ""]), mode: "nombre", prefixe: `$\\${f} \\widehat{${R}${P1}${P2}} =$`, attendu: v,
        erreurs: [{ valeur: d / n, message: "C'est l'inverse : vérifie quel côté va au numérateur." }, ...approx(v)],
        aides: ["SOH CAH TOA.", `$\\${f} \\widehat{${R}${P1}${P2}} = ${exprs[f]}$.`, `$= \\dfrac{${n}}{${d}}$ ; simplifie.`],
        solution: `$\\${f} \\widehat{${R}${P1}${P2}} = ${exprs[f]} = \\dfrac{${n}}{${d}} = ${frS(n, d)}$.` };
    }
    if (u < 0.7) {
      const bonne = `$${exprs[f]}$`, faux = uniq3(bonne, [`$${exprs.cos}$`, `$${exprs.sin}$`, `$${exprs.tan}$`, `$\\dfrac{${hyp}}{${adj}}$`, `$\\dfrac{${adj}}{${opp}}$`]);
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `Le triangle $${R}${P1}${P2}$ est rectangle en $${R}$. Quelle est l'expression de $\\${f} \\widehat{${R}${P1}${P2}}$ ?`, figure: figTrig3(N, ["", "", "", ""]), mode: "choix", choix, attendu,
        aides: ["« SOH CAH TOA » : Sinus = Opposé / Hypoténuse, Cosinus = Adjacent / Hypoténuse, Tangente = Opposé / Adjacent.", `L'hypoténuse est $[${hyp}]$, en face de l'angle droit.`, `Pour l'angle en $${P1}$ : côté adjacent $[${adj}]$, côté opposé $[${opp}]$.`],
        solution: `$\\${f} \\widehat{${R}${P1}${P2}} = ${exprs[f]}$.` };
    }
    const q = pick([["opposé", opp], ["adjacent", adj]]);
    const bonne = `$[${q[1]}]$`, faux = [`$[${opp}]$`, `$[${adj}]$`, `$[${hyp}]$`].filter((z) => z !== bonne);
    const { choix, attendu } = melange(bonne, [...faux, "aucun : il n'y en a pas pour un angle aigu"]);
    return { enonce: `Dans le triangle $${R}${P1}${P2}$ rectangle en $${R}$, quel est le côté ${q[0]} à l'angle $\\widehat{${R}${P1}${P2}}$ ?`, figure: figTrig3(N, ["", "", "", ""]), mode: "choix", choix, attendu,
      aides: ["L'hypoténuse est le côté en face de l'angle droit.", `Le côté adjacent touche l'angle en $${P1}$ (sans être l'hypoténuse).`, `Le côté opposé est en face de l'angle en $${P1}$.`],
      solution: `Pour l'angle en $${P1}$, le côté ${q[0]} est $[${q[1]}]$.` };
  };

  GEN["tg3-longueur"] = function () {
    const N = pick(NOMS_TG), [R, P1, P2] = N, a = rand(15, 75), cas = rand(0, 5), L = rand(20, 150) / 10;
    const adj = `${R}${P1}`, opp = `${R}${P2}`, hyp = `${P1}${P2}`;
    // [fonction, côté connu, côté cherché, valeur]
    const C = [["cos", hyp, adj, L * Math.cos(a * RAD)], ["cos", adj, hyp, L / Math.cos(a * RAD)], ["sin", hyp, opp, L * Math.sin(a * RAD)], ["sin", opp, hyp, L / Math.sin(a * RAD)], ["tan", adj, opp, L * Math.tan(a * RAD)], ["tan", opp, adj, L / Math.tan(a * RAD)]][cas];
    const [f, connu, cherche, v] = C, r = arr(v, 1);
    const formule = { cos: `\\dfrac{${adj}}{${hyp}}`, sin: `\\dfrac{${opp}}{${hyp}}`, tan: `\\dfrac{${opp}}{${adj}}` }[f];
    const multiplie = (f === "cos" && cherche === adj) || (f === "sin" && cherche === opp) || (f === "tan" && cherche === opp);
    const labs = [connu === adj ? `${decS(L)} cm` : cherche === adj ? "?" : "", connu === opp ? `${decS(L)} cm` : cherche === opp ? "?" : "", connu === hyp ? `${decS(L)} cm` : cherche === hyp ? "?" : "", `${a}°`];
    const faux = multiplie ? L / TRIG[f](a * RAD) : L * TRIG[f](a * RAD);
    return { enonce: `$${R}${P1}${P2}$ est rectangle en $${R}$, $\\widehat{${R}${P1}${P2}} = ${degTex(a)}$ et $${connu} = ${nb(L)}$ cm. Calcule $${cherche}$, arrondi au dixième.`, figure: figTrig3(N, labs), mode: "nombre", prefixe: `$${cherche} \\approx$`, suffixe: "cm", attendu: r,
      erreurs: [{ valeur: arr(faux, 1), message: "Vérifie le produit en croix : multiplier ou diviser par le " + f + " ?" }, ...(arr(v, 1) !== Math.trunc(v * 10) / 10 ? [{ valeur: Math.trunc(v * 10) / 10, message: "Arrondis au dixième le plus proche (ne tronque pas)." }] : [])],
      aides: [`On connaît l'angle, $[${connu}]$ et on cherche $[${cherche}]$ : on utilise le ${f === "cos" ? "cosinus" : f === "sin" ? "sinus" : "tangente"}.`, `$\\${f} \\widehat{${R}${P1}${P2}} = ${formule}$, soit $\\${f}(${degTex(a)}) = ${formule.replace(connu, nb(L))}$.`, multiplie ? `$${cherche} = ${nb(L)} \\times \\${f}(${degTex(a)})$.` : `$${cherche} = \\dfrac{${nb(L)}}{\\${f}(${degTex(a)})}$.`],
      solution: `$${cherche} = ${multiplie ? `${nb(L)} \\times \\${f}(${degTex(a)})` : `\\dfrac{${nb(L)}}{\\${f}(${degTex(a)})}`} \\approx ${nb(r)}$ cm.` };
  };

  GEN["tg3-angle"] = function () {
    const N = pick(NOMS_TG), [R, P1, P2] = N, f = pick(["cos", "sin", "tan"]);
    const adj = `${R}${P1}`, opp = `${R}${P2}`, hyp = `${P1}${P2}`;
    let x, y; do { x = rand(20, 120) / 10; y = rand(20, 150) / 10; } while (f !== "tan" && y <= x + 0.5);
    const [num, den, nn, nd] = { cos: [x, y, adj, hyp], sin: [x, y, opp, hyp], tan: [x, y, opp, adj] }[f];
    const ang = { cos: Math.acos, sin: Math.asin, tan: Math.atan }[f](num / den) / RAD, r = Math.round(ang);
    const labs = [nn === adj ? `${decS(num)} cm` : nd === adj ? `${decS(den)} cm` : "", nn === opp ? `${decS(num)} cm` : "", nd === hyp ? `${decS(den)} cm` : "", "?"];
    const autre = Math.round(90 - ang);
    return { enonce: `$${R}${P1}${P2}$ est rectangle en $${R}$ avec $${nn} = ${nb(num)}$ cm et $${nd} = ${nb(den)}$ cm. Calcule $\\widehat{${R}${P1}${P2}}$, arrondi au degré.`, figure: figTrig3(N, labs), mode: "nombre", prefixe: `$\\widehat{${R}${P1}${P2}} \\approx$`, suffixe: "°", attendu: r,
      erreurs: [{ valeur: autre, message: `Ça, c'est l'autre angle aigu, en $${P2}$.` }],
      aides: [`$[${nn}]$ et $[${nd}]$ sont ${f === "cos" ? "l'adjacent et l'hypoténuse : cosinus" : f === "sin" ? "l'opposé et l'hypoténuse : sinus" : "l'opposé et l'adjacent : tangente"}.`, `$\\${f} \\widehat{${R}${P1}${P2}} = \\dfrac{${nb(num)}}{${nb(den)}}$.`, `À la calculatrice : $\\text{${f === "cos" ? "arccos" : f === "sin" ? "arcsin" : "arctan"}}\\left(\\dfrac{${nb(num)}}{${nb(den)}}\\right)$ (touche ${f}⁻¹).`],
      solution: `$\\${f} \\widehat{${R}${P1}${P2}} = \\dfrac{${nb(num)}}{${nb(den)}}$, donc $\\widehat{${R}${P1}${P2}} \\approx ${nb(arr(ang, 2))}^\\circ$, soit $${r}^\\circ$ arrondi au degré.` };
  };

  GEN["tg3-problemes"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const L = rand(30, 80) / 10, a = rand(60, 80), h = arr(L * Math.sin(a * RAD), 2), r = arr(h, 1);
      return { enonce: `Une échelle de $${nb(L)}$ m est appuyée contre un mur vertical. Elle fait un angle de $${degTex(a)}$ avec le sol horizontal. À quelle hauteur touche-t-elle le mur ? (Arrondi au dixième.)`, mode: "nombre", prefixe: "Hauteur :", suffixe: "m", attendu: r,
        erreurs: [{ valeur: arr(L * Math.cos(a * RAD), 1), message: "La hauteur est le côté opposé à l'angle au sol : c'est le sinus." }],
        aides: ["L'échelle est l'hypoténuse ; la hauteur sur le mur est opposée à l'angle avec le sol.", `$\\sin(${degTex(a)}) = \\dfrac{h}{${nb(L)}}$.`, `$h = ${nb(L)} \\times \\sin(${degTex(a)})$.`], solution: `$h = ${nb(L)} \\times \\sin(${degTex(a)}) \\approx ${nb(r)}$ m.` }; }
    if (t === 1) { const d = rand(10, 50), a = rand(20, 60), H = arr(d * Math.tan(a * RAD), 1);
      return { enonce: `À $${d}$ m du pied d'un arbre, on voit son sommet sous un angle de $${degTex(a)}$ par rapport à l'horizontale (on néglige la taille de l'observateur). Quelle est la hauteur de l'arbre ? (Arrondi au dixième.)`, mode: "nombre", prefixe: "Hauteur :", suffixe: "m", attendu: H,
        erreurs: [{ valeur: arr(d * Math.sin(a * RAD), 1), message: "On connaît le côté adjacent ($" + d + "$ m) : c'est la tangente." }],
        aides: ["Le triangle est rectangle au pied de l'arbre.", `Côté adjacent : $${d}$ m ; côté opposé : la hauteur. $\\tan(${degTex(a)}) = \\dfrac{h}{${d}}$.`, `$h = ${d} \\times \\tan(${degTex(a)})$.`], solution: `$h = ${d} \\times \\tan(${degTex(a)}) \\approx ${nb(H)}$ m.` }; }
    const l = rand(20, 120) / 10, h = rand(3, 15) / 10, a = Math.round(Math.atan(h / l) / RAD);
    if (a < 2) return GEN["tg3-problemes"]();
    return { enonce: `Une rampe monte de $${nb(h)}$ m sur une distance horizontale de $${nb(l)}$ m. Quel angle fait-elle avec l'horizontale, arrondi au degré ?`, mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: a,
      erreurs: [{ valeur: Math.round(Math.asin(Math.min(1, h / l)) / RAD), message: "La distance horizontale est le côté adjacent, pas l'hypoténuse : c'est la tangente." }],
      aides: ["Hauteur : côté opposé ; distance horizontale : côté adjacent.", `$\\tan \\alpha = \\dfrac{${nb(h)}}{${nb(l)}}$.`, "Utilise la touche tan⁻¹ de la calculatrice."], solution: `$\\tan \\alpha = \\dfrac{${nb(h)}}{${nb(l)}}$, donc $\\alpha \\approx ${a}^\\circ$.` };
  };

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse */
  Object.keys(GEN).filter((k) => /^(cn3|dv3|fc3|eq3|ar3|fn3|fa3|pp3|pr3|st3|th3|ts3|tg3)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9));
      return q;
    };
  });
})();
