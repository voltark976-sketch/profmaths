/*
  Graphiques et générateurs d'exercices.
  Chaque générateur fabrique une question avec des nombres tirés au hasard,
  la réponse attendue, trois indices progressifs et la solution rédigée.
*/
(function () {
  "use strict";

  /* ---------- Outils ---------- */
  const rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randNZ = (a, b) => { let v; do { v = rand(a, b); } while (v === 0); return v; };
  const shuffle = (arr) => { const t = arr.slice(); for (let i = t.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [t[i], t[j]] = [t[j], t[i]]; } return t; };
  const par = (n) => (n < 0 ? `(${n})` : `${n}`); // met un négatif entre parenthèses
  const sg = (n) => (n < 0 ? `- ${-n}` : `+ ${n}`); // « + 3 » ou « - 3 »

  // Écrit a x^2 + b x + c proprement (coefficients 1, -1, 0)
  function poly(coefs, v) {
    v = v || "x";
    const deg = coefs.length - 1;
    let out = "";
    coefs.forEach((c, i) => {
      const p = deg - i;
      if (c === 0) return;
      const mono = p === 0 ? "" : p === 1 ? v : `${v}^{${p}}`;
      let abs = Math.abs(c);
      let coef = p > 0 && abs === 1 ? "" : `${abs}`;
      if (out === "") out += (c < 0 ? "-" : "") + coef + mono;
      else out += (c < 0 ? " - " : " + ") + coef + mono;
    });
    return out || "0";
  }

  const interv = (a, b, ga, gb) => `${ga ? "[" : "]"}${a}\\,;${b}${gb ? "]" : "["}`;

  /* ---------- Graphiques SVG ---------- */
  function graph(o) {
    const W = 320, pad = 14;
    const xstep = o.xstep || 1, ystep = o.ystep || 1;
    const spanX = o.xmax - o.xmin, spanY = o.ymax - o.ymin;
    const ux = (W - 2 * pad) / spanX;
    let H = o.h || Math.round(ux * spanY * (xstep / ystep) + 2 * pad);
    H = Math.max(200, Math.min(400, H));
    const uy = (H - 2 * pad) / spanY;
    const X = (x) => +(pad + (x - o.xmin) * ux).toFixed(1);
    const Y = (y) => +(pad + (o.ymax - y) * uy).toFixed(1);
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria || "Courbe dans un repère"}">`;
    // quadrillage
    s += `<g class="g-grid">`;
    for (let x = Math.ceil(o.xmin / xstep) * xstep; x <= o.xmax; x += xstep) s += `<line x1="${X(x)}" y1="${pad}" x2="${X(x)}" y2="${H - pad}"/>`;
    for (let y = Math.ceil(o.ymin / ystep) * ystep; y <= o.ymax; y += ystep) s += `<line x1="${pad}" y1="${Y(y)}" x2="${W - pad}" y2="${Y(y)}"/>`;
    s += `</g>`;
    // axes
    const x0 = Math.min(Math.max(0, o.xmin), o.xmax), y0 = Math.min(Math.max(0, o.ymin), o.ymax);
    s += `<g class="g-axis"><line x1="${pad}" y1="${Y(y0)}" x2="${W - pad}" y2="${Y(y0)}"/><line x1="${X(x0)}" y1="${pad}" x2="${X(x0)}" y2="${H - pad}"/>`;
    s += `<path d="M${W - pad} ${Y(y0)} l-6 -3.5 v7z"/><path d="M${X(x0)} ${pad} l-3.5 6 h7z"/></g>`;
    // graduations
    s += `<g class="g-tick">`;
    for (let x = Math.ceil(o.xmin / xstep) * xstep; x <= o.xmax - xstep / 2; x += xstep) {
      if (x === 0) continue;
      s += `<text x="${X(x)}" y="${Y(y0) + 13}" text-anchor="middle">${String(+x.toFixed(6)).replace("-", "−").replace(".", ",")}</text>`;
    }
    for (let y = Math.ceil(o.ymin / ystep) * ystep; y <= o.ymax - ystep / 2; y += ystep) {
      if (y === 0) continue;
      s += `<text x="${X(x0) - 4}" y="${Y(y) + 4}" text-anchor="end">${String(+y.toFixed(6)).replace("-", "−").replace(".", ",")}</text>`;
    }
    s += `<text x="${X(x0) - 4}" y="${Y(y0) + 13}" text-anchor="end">0</text></g>`;
    if (o.xlabel) s += `<text class="g-label" x="${W - pad}" y="${Y(y0) - 6}" text-anchor="end">${o.xlabel}</text>`;
    if (o.ylabel) s += `<text class="g-label" x="${X(x0) + 6}" y="${pad + 8}">${o.ylabel}</text>`;
    // droites horizontales
    (o.hlines || []).forEach((h) => {
      s += `<line class="g-hline" x1="${pad}" y1="${Y(h.y)}" x2="${W - pad}" y2="${Y(h.y)}"/>`;
      if (h.label) s += `<text class="g-hlabel" x="${W - pad - 2}" y="${Y(h.y) - 5}" text-anchor="end">${h.label}</text>`;
    });
    // diagramme en bâtons
    (o.bars || []).forEach((b) => { s += `<line class="g-bar" x1="${X(b.x)}" y1="${Y(0)}" x2="${X(b.x)}" y2="${Y(b.y)}"/>`; });
    // courbes
    (o.curves || []).forEach((c, i) => {
      const n = 160; let d = "";
      for (let k = 0; k <= n; k++) {
        const x = c.a + ((c.b - c.a) * k) / n;
        d += (k ? "L" : "M") + X(x) + " " + Y(c.f(x));
      }
      s += `<path class="g-curve g-curve-${i}" d="${d}"/>`;
      if (c.closed !== false) {
        s += `<circle class="g-end g-curve-${i}" cx="${X(c.a)}" cy="${Y(c.f(c.a))}" r="3"/><circle class="g-end g-curve-${i}" cx="${X(c.b)}" cy="${Y(c.f(c.b))}" r="3"/>`;
      }
      if (c.label) {
        const lx = c.lx !== undefined ? c.lx : c.b;
        s += `<text class="g-clabel g-curve-${i}" x="${X(lx) + (c.dx || -4)}" y="${Y(c.f(lx)) + (c.dy || -8)}" text-anchor="end">${c.label}</text>`;
      }
    });
    (o.points || []).forEach((p) => {
      s += `<circle class="g-point" cx="${X(p.x)}" cy="${Y(p.y)}" r="3.5"/>`;
      if (p.label) s += p.gauche
        ? `<text class="g-plabel" x="${X(p.x) - 8}" y="${Y(p.y) - 6}" text-anchor="end">${p.label}</text>`
        : `<text class="g-plabel" x="${X(p.x) + 6}" y="${Y(p.y) - 6}">${p.label}</text>`;
    });
    return s + `</svg>`;
  }

  /* Graphiques nommés utilisés dans les fichiers de contenu */
  const FIGURES = {
    "courbe-u": () => graph({
      xmin: -2.6, xmax: 4.6, ymin: -5.6, ymax: 5.6,
      curves: [{ f: (x) => -x * x + 2 * x + 3, a: -2, b: 4, label: "C<tspan class=\"sub\" dy=\"3\">u</tspan>", lx: 2.4, dx: 26, dy: -4 }],
      aria: "Courbe de u, parabole passant par (−2 ; −5), (−1 ; 0), (0 ; 3), (1 ; 4), (2 ; 3), (3 ; 0) et (4 ; −5)"
    }),
    "kayaks": () => graph({
      xmin: -0.5, xmax: 6.7, ymin: -3, ymax: 51, ystep: 4, h: 320,
      xlabel: "durée t (h)", ylabel: "prix (€)",
      curves: [
        { f: (t) => 8 * t, a: 0, b: 6, label: "A", lx: 5.6, dx: -6, dy: -6 },
        { f: (t) => 4 * t + 12, a: 0, b: 6, label: "B", lx: 6, dx: -4, dy: 16 }
      ],
      points: [{ x: 3, y: 24, label: "I(3 ; 24)", gauche: true }],
      aria: "Droites des loueurs A et B, sécantes au point I(3 ; 24)"
    }),
    "prix-evolution": () => graph({
      xmin: -1, xmax: 21, ymin: -1.5, ymax: 25, xstep: 2, ystep: 2, h: 300,
      xlabel: "prix initial x (€)", ylabel: "prix (€)",
      curves: [
        { f: (x) => 1.15 * x, a: 0, b: 20, label: "f", lx: 19, dx: -4, dy: -8 },
        { f: (x) => 0.8 * x, a: 0, b: 20, label: "g", lx: 20, dx: -4, dy: 16 }
      ],
      aria: "Droites de f(x) = 1,15x (hausse de 15 %) et g(x) = 0,8x (baisse de 20 %)"
    }),
    "suite-nuage": () => graph({
      xmin: -0.6, xmax: 7.6, ymin: -5, ymax: 13, ystep: 2, h: 300,
      xlabel: "n", ylabel: "uₙ",
      points: [0, 1, 2, 3, 4, 5, 6].map((n) => ({ x: n, y: n * n - 4 * n })),
      aria: "Nuage de points (n ; uₙ) de la suite uₙ = n² − 4n pour n de 0 à 6"
    }),
    "parabole-factorisee": () => graph({
      xmin: -2.6, xmax: 5.6, ymin: -3.6, ymax: 4.6, h: 300,
      curves: [{ f: (x) => 0.5 * (x + 1) * (x - 4), a: -2.3, b: 5.3, closed: false, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: 5, dx: -6, dy: 2 }],
      points: [{ x: -1, y: 0 }, { x: 4, y: 0 }],
      aria: "Parabole de f(x) = ½(x + 1)(x − 4), qui coupe l'axe des abscisses en −1 et 4"
    }),
    "parabole-canonique": () => graph({
      xmin: -2.6, xmax: 4.6, ymin: -4.8, ymax: 5.6, h: 300,
      curves: [{ f: (x) => (x - 1) * (x - 1) - 4, a: -2, b: 4, closed: false, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: 3.2, dx: 12, dy: 8 }],
      points: [{ x: 1, y: -4, label: "S(1 ; −4)" }, { x: -1, y: 0 }, { x: 3, y: 0 }],
      aria: "Parabole de f(x) = (x − 1)² − 4 sur [−2 ; 4], de sommet S(1 ; −4), qui coupe l'axe des abscisses en −1 et 3"
    }),
    "batons-binomiale": () => graph({
      xmin: -0.8, xmax: 10.8, ymin: -0.04, ymax: 0.36, ystep: 0.05, h: 260,
      xlabel: "k", ylabel: "P(X = k)",
      bars: Array.from({ length: 11 }, (_, k) => ({ x: k, y: C(10, k) * 0.2 ** k * 0.8 ** (10 - k) })),
      aria: "Diagramme en bâtons de la loi binomiale de paramètres 10 et 0,2 : le plus haut bâton est en k = 2"
    }),
    "batons-geometrique": () => graph({
      xmin: -0.8, xmax: 10.8, ymin: -0.03, ymax: 0.28, ystep: 0.05, h: 240,
      xlabel: "k", ylabel: "P(T = k)",
      bars: Array.from({ length: 10 }, (_, i) => ({ x: i + 1, y: 0.75 ** i * 0.25 })),
      aria: "Diagramme en bâtons de la loi géométrique de paramètre 0,25 : les bâtons diminuent à partir de k = 1"
    }),
    "enclos": () => graph({
      xmin: -0.6, xmax: 10.6, ymin: -2, ymax: 27, ystep: 2, h: 300,
      xlabel: "x (m)", ylabel: "A(x) (m²)",
      curves: [{ f: (x) => x * (10 - x), a: 0, b: 10, closed: false }],
      points: [{ x: 5, y: 25, label: "S(5 ; 25)" }],
      aria: "Courbe de l'aire de l'enclos, maximale au point S(5 ; 25)"
    })
  };

  /* Parabole aléatoire à sommet entier, pour les lectures graphiques */
  function parabole() {
    const a = pick([-1, 1]);
    const h = rand(-2, 2);
    const k = a < 0 ? rand(2, 5) : rand(-5, -2);
    const f = (x) => a * (x - h) * (x - h) + k;
    const lo = Math.min(k, k + 9 * a, 0), hi = Math.max(k, k + 9 * a, 0);
    const opts = (extra) => Object.assign({
      xmin: Math.min(h - 3.6, -0.6), xmax: Math.max(h + 3.6, 0.6),
      ymin: lo - 0.6, ymax: hi + 0.6,
      curves: [{ f, a: h - 3, b: h + 3, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: h + 2, dx: 30, dy: 4 }],
      aria: "Courbe d'une fonction f dans un repère quadrillé"
    }, extra || {});
    return { a, h, k, f, opts };
  }

  /* ---------- Générateurs ---------- */
  const GEN = {};

  GEN["image-calcul"] = function (i) {
    const x0 = randNZ(-4, 4);
    let coefs;
    if (i < 2) coefs = [randNZ(-6, 6), randNZ(-9, 9)];
    else if (i < 4) coefs = [randNZ(-3, 3), 0, randNZ(-9, 9)];
    else coefs = [randNZ(-3, 3), randNZ(-5, 5), randNZ(-9, 9)];
    const deg = coefs.length - 1;
    let val = 0; coefs.forEach((c) => { val = val * x0 + c; });
    let sub, etape, aide3;
    if (deg === 1) {
      const [a, b] = coefs;
      sub = `${a} \\times ${par(x0)} ${sg(b)}`;
      etape = `${a * x0} ${sg(b)}`;
      aide3 = `Commence par le produit : $${a} \\times ${par(x0)} = ${a * x0}$.`;
    } else {
      const [a, b, c] = coefs;
      sub = `${a} \\times ${par(x0)}^2` + (b ? ` ${b < 0 ? "-" : "+"} ${Math.abs(b)} \\times ${par(x0)}` : "") + ` ${sg(c)}`;
      etape = `${a} \\times ${x0 * x0}` + (b ? ` ${sg(b * x0)}` : "") + ` ${sg(c)}`;
      aide3 = `La puissance d'abord : $${par(x0)}^2 = ${x0 * x0}$` + (x0 < 0 ? " (un carré n'est jamais négatif)." : ".");
    }
    return {
      enonce: `Soit $f(x) = ${poly(coefs)}$. Calcule l'image de $${x0}$ par $f$.`,
      mode: "nombre", prefixe: `f(${x0}) =`, attendu: val,
      aides: [
        `L'image de $${x0}$, c'est $f(${x0})$ : remplace chaque $x$ par $${par(x0)}$.`,
        `Cela donne $f(${x0}) = ${sub}$.`,
        aide3
      ],
      solution: `$f(${x0}) = ${sub} = ${etape} = ${val}$`
    };
  };

  GEN["antecedent-affine"] = function () {
    const a = randNZ(-5, 5), b = randNZ(-9, 9), x0 = rand(-6, 6);
    const aa = Math.abs(a) === 1 ? (a > 0 ? 2 : -2) : a;
    const k = aa * x0 + b;
    return {
      enonce: `Soit $f(x) = ${poly([aa, b])}$. Trouve l'antécédent de $${k}$ par $f$.`,
      mode: "nombre", prefixe: "x =", attendu: x0,
      aides: [
        `Chercher l'antécédent de $${k}$, c'est résoudre l'équation $f(x) = ${k}$, soit $${poly([aa, b])} = ${k}$.`,
        `Passe le $${b > 0 ? b : "(" + b + ")"}$ de l'autre côté : $${aa}x = ${k} ${b > 0 ? "-" : "+"} ${Math.abs(b)} = ${k - b}$.`,
        `Divise par $${aa}$ : $x = \\dfrac{${k - b}}{${aa}}$.`
      ],
      solution: `$${poly([aa, b])} = ${k} \\iff ${aa}x = ${k - b} \\iff x = ${x0}$.\n\nVérification : $f(${x0}) = ${aa} \\times ${par(x0)} ${sg(b)} = ${k}$.`
    };
  };

  GEN["ensemble-definition"] = function () {
    const a = randNZ(-4, 4), b = randNZ(-6, 6), c = randNZ(-7, 7);
    const num = poly([a, b]), den = poly([1, c]);
    return {
      enonce: `Soit $f(x) = \\dfrac{${num}}{${den}}$. Quelle valeur de $x$ est interdite ?`,
      mode: "nombre", prefixe: "x ≠", attendu: -c,
      aides: [
        "Un quotient n'existe pas quand son dénominateur vaut $0$.",
        `Résous l'équation $${den} = 0$.`,
        `$${den} = 0 \\iff x = ${-c}$.`
      ],
      solution: `$${den} = 0 \\iff x = ${-c}$. La valeur $${-c}$ n'a pas d'image.\n\n$D = \\mathbb{R} \\setminus \\{${-c}\\}$`
    };
  };

  GEN["appartenance"] = function () {
    const quad = Math.random() < 0.5;
    const coefs = quad ? [randNZ(-2, 2), 0, randNZ(-6, 6)] : [randNZ(-5, 5), randNZ(-8, 8)];
    const p = randNZ(-4, 4);
    let fp = 0; coefs.forEach((c) => { fp = fp * p + c; });
    const dedans = Math.random() < 0.5;
    const q = dedans ? fp : fp + pick([-3, -2, -1, 1, 2, 3]);
    const sub = quad ? `${coefs[0]} \\times ${par(p)}^2 ${sg(coefs[2])}` : `${coefs[0]} \\times ${par(p)} ${sg(coefs[1])}`;
    return {
      enonce: `Soit $f(x) = ${poly(coefs)}$. Le point $M(${p}\\,;${q})$ appartient-il à la courbe de $f$ ?`,
      mode: "choix", choix: ["Oui", "Non"], attendu: dedans ? 0 : 1,
      aides: [
        `Calcule l'image de l'**abscisse** du point, c'est-à-dire $f(${p})$.`,
        `$f(${p}) = ${sub} = ${fp}$.`,
        `Compare $${fp}$ avec l'**ordonnée** du point, $${q}$.`
      ],
      solution: `$f(${p}) = ${sub} = ${fp}$.\n\n` + (dedans
        ? `C'est bien l'ordonnée du point : $M \\in \\mathcal{C}_f$.`
        : `$${fp} \\neq ${q}$ : $M \\notin \\mathcal{C}_f$.`)
    };
  };

  GEN["lecture-image"] = function () {
    const P = parabole();
    const x0 = rand(P.h - 3, P.h + 3);
    const y0 = P.f(x0);
    return {
      enonce: `Voici la courbe d'une fonction $f$ définie sur $[${P.h - 3}\\,;${P.h + 3}]$. Lis l'image de $${x0}$.`,
      figure: graph(P.opts()),
      mode: "nombre", prefixe: `f(${x0}) =`, attendu: y0,
      aides: [
        `Repère $${x0}$ sur l'axe horizontal (l'axe des abscisses).`,
        "Monte ou descends verticalement jusqu'à toucher la courbe.",
        "Depuis ce point, va horizontalement jusqu'à l'axe vertical et lis la valeur."
      ],
      solution: `La courbe passe par le point $(${x0}\\,;${y0})$, donc $f(${x0}) = ${y0}$.`,
      figureSolution: graph(P.opts({ points: [{ x: x0, y: y0, label: `(${x0} ; ${y0})`.replace(/-/g, "−") }] }))
    };
  };

  GEN["lecture-antecedents"] = function (i) {
    const P = parabole();
    const aucun = i === 4 && Math.random() < 0.6;
    const d = aucun ? 0 : pick([0, 1, 2, 2, 3]);
    const k = aucun ? P.k - P.a : P.k + P.a * d * d;
    const sol = aucun ? [] : d === 0 ? [P.h] : [P.h - d, P.h + d];
    const txt = sol.length === 0 ? "aucun antécédent" : sol.length === 1 ? `un seul antécédent : $${sol[0]}$` : `deux antécédents : $${sol[0]}$ et $${sol[1]}$`;
    return {
      enonce: `Voici la courbe d'une fonction $f$ définie sur $[${P.h - 3}\\,;${P.h + 3}]$. Lis le ou les antécédents de $${k}$.`,
      figure: graph(P.opts()),
      mode: "ensemble", prefixe: "Antécédent(s) :", attendu: sol,
      aides: [
        `Imagine la droite horizontale $y = ${k}$.`,
        sol.length === 0 ? "Regarde bien : cette droite touche-t-elle la courbe ?" : `Elle coupe la courbe en ${sol.length === 1 ? "un seul point" : "deux points"}.`,
        sol.length === 0 ? "Si la droite ne touche pas la courbe, écris « aucun »." : "Lis l'abscisse de chaque point d'intersection (sur l'axe horizontal). Sépare les valeurs par un point-virgule."
      ],
      solution: `La droite $y = ${k}$ ${sol.length ? "coupe" : "ne coupe pas"} la courbe : $${k}$ a ${txt}.`,
      figureSolution: graph(P.opts({ hlines: [{ y: k, label: `y = ${k}`.replace("-", "−") }], points: sol.map((x) => ({ x, y: k })) }))
    };
  };

  GEN["resolution-graphique"] = function () {
    const P = parabole();
    const d = pick([1, 2]);
    const k = P.k + P.a * d * d;
    const L = P.h - 3, R = P.h + 3, u = P.h - d, v = P.h + d;
    const ops = [">", "\\geqslant", "<", "\\leqslant"];
    const op = pick(ops);
    // ensembles possibles
    const dedansS = interv(u, v, false, false), dedansL = interv(u, v, true, true);
    const dehorsS = `${interv(L, u, true, false)} \\cup ${interv(v, R, false, true)}`;
    const dehorsL = `${interv(L, u, true, true)} \\cup ${interv(v, R, true, true)}`;
    // a < 0 : la courbe est au-dessus de y=k entre u et v
    const strict = op === ">" || op === "<";
    const audessus = op === ">" || op === "\\geqslant";
    const dedans = (P.a < 0) === audessus;
    const bonne = dedans ? (strict ? dedansS : dedansL) : (strict ? dehorsS : dehorsL);
    const choix = shuffle([dedansS, dedansL, dehorsS, dehorsL]);
    return {
      enonce: `Voici la courbe d'une fonction $f$ définie sur $[${L}\\,;${R}]$. Résous graphiquement $f(x) ${op} ${k}$.`,
      figure: graph(P.opts()),
      mode: "choix", choix: choix.map((c) => `$S = ${c}$`), attendu: choix.indexOf(bonne),
      aides: [
        `Trace mentalement la droite $y = ${k}$. Elle coupe la courbe aux abscisses $${u}$ et $${v}$.`,
        `Repère la partie de la courbe située ${audessus ? "au-dessus" : "en dessous"} de cette droite.`,
        strict ? "Inégalité stricte : les bornes $" + u + "$ et $" + v + "$ sont exclues (crochets tournés vers l'extérieur)." : "Inégalité large : les bornes $" + u + "$ et $" + v + "$ sont incluses."
      ],
      solution: `La courbe est ${audessus ? "au-dessus" : "en dessous"} de la droite $y = ${k}$ pour $x$ ${dedans ? `entre $${u}$ et $${v}$` : `aux deux extrémités, de $${L}$ à $${u}$ et de $${v}$ à $${R}$`}.\n\n$S = ${bonne}$`,
      figureSolution: graph(P.opts({ hlines: [{ y: k, label: `y = ${k}`.replace("-", "−") }], points: [{ x: u, y: k }, { x: v, y: k }] }))
    };
  };


  /* ---------- Chapitre « Information chiffrée » ---------- */
  // 0.35 -> "0{,}35" (virgule française dans les formules)
  const fr = (n) => String(+(+n).toFixed(6)).replace(".", "{,}");
  const pc = (n) => `${fr(n)}\\,\\%`;
  const sgnPc = (n) => (n > 0 ? "+" : "") + pc(n);

  GEN["proportion-pourcentage"] = function () {
    const ctx = pick([
      { tout: "élèves interrogés", partie: "viennent en bus" },
      { tout: "mangues de la commerçante", partie: "ont été vendues le matin" },
      { tout: "tortues observées à N'Gouja", partie: "sont des tortues vertes" },
      { tout: "adhérents de la coopérative", partie: "sont des femmes" }
    ]);
    const nE = pick([20, 25, 40, 50, 80, 120, 200, 250, 300, 400, 500]);
    const ks = []; for (let k = 5; k <= 95; k++) if ((nE * k) % 100 === 0) ks.push(k);
    const k = pick(ks), nA = (nE * k) / 100;
    return {
      enonce: `Sur les $${nE}$ ${ctx.tout}, $${nA}$ ${ctx.partie}. Quelle proportion cela représente-t-il ?`,
      mode: "nombre", prefixe: "p =", suffixe: "%", attendu: k,
      aides: [
        "La proportion, c'est la partie divisée par le tout : $p = \\dfrac{n_A}{n_E}$.",
        `$p = \\dfrac{${nA}}{${nE}} = ${fr(k / 100)}$.`,
        "Pour passer en pourcentage, on multiplie par $100$."
      ],
      solution: `$p = \\dfrac{${nA}}{${nE}} = ${fr(k / 100)} = ${pc(k)}$`
    };
  };

  GEN["partie-tout"] = function () {
    const ctx = pick([
      { tout: "élèves de Seconde", partie: "sont demi-pensionnaires" },
      { tout: "habitants du village", partie: "ont moins de 20 ans" },
      { tout: "adhérents du club", partie: "sont des filles" }
    ]);
    const nE = pick([40, 50, 60, 80, 120, 150, 200, 240, 300, 400, 500]);
    const ks = []; for (let k = 5; k <= 95; k += 5) if ((nE * k) % 100 === 0) ks.push(k);
    const k = pick(ks), nA = (nE * k) / 100;
    if (Math.random() < 0.5) {
      return {
        enonce: `Parmi les $${nE}$ ${ctx.tout}, $${pc(k)}$ ${ctx.partie}. Combien cela représente-t-il de personnes ?`,
        mode: "nombre", prefixe: "Nombre :", attendu: nA,
        aides: [
          "On cherche la partie : $n_A = p \\times n_E$.",
          `$${pc(k)} = ${fr(k / 100)}$.`,
          `$n_A = ${fr(k / 100)} \\times ${nE}$.`
        ],
        solution: `$n_A = ${fr(k / 100)} \\times ${nE} = ${nA}$`
      };
    }
    return {
      enonce: `$${nA}$ ${ctx.tout.split(" ")[0]} ${ctx.partie}, ce qui représente $${pc(k)}$ des ${ctx.tout}. Combien y a-t-il de ${ctx.tout} en tout ?`,
      mode: "nombre", prefixe: "Total :", attendu: nE,
      erreurs: [{ valeur: +(nA * k / 100).toFixed(6), message: "Tu as calculé un pourcentage de la partie. Ici on cherche le **tout** : il doit être plus grand que $" + nA + "$." }],
      aides: [
        "On connaît la partie et la proportion, on cherche le tout : $n_E = \\dfrac{n_A}{p}$.",
        `$${pc(k)} = ${fr(k / 100)}$.`,
        `$n_E = \\dfrac{${nA}}{${fr(k / 100)}}$. Vérifie que le tout est plus grand que la partie.`
      ],
      solution: `$n_E = \\dfrac{${nA}}{${fr(k / 100)}} = ${nE}$. Vérification : $${fr(k / 100)} \\times ${nE} = ${nA}$.`
    };
  };

  GEN["proportion-de-proportion"] = function () {
    const p1 = pick([20, 30, 40, 50, 60, 70, 80]), p2 = pick([10, 15, 20, 25, 30, 40, 45, 50, 60, 75]);
    const ctx = pick([
      ["des élèves du lycée sont en Seconde", "des élèves de Seconde sont des filles", "des élèves du lycée sont des filles de Seconde"],
      ["des tortues observées sont des tortues vertes", "des tortues vertes sont des femelles", "des tortues observées sont des tortues vertes femelles"],
      ["des adhérents sont des femmes", "de ces femmes cultivent de la vanille", "des adhérents sont des femmes qui cultivent de la vanille"]
    ]);
    const r = (p1 * p2) / 100;
    return {
      enonce: `$${pc(p1)}$ ${ctx[0]} et $${pc(p2)}$ ${ctx[1]}. Quel pourcentage ${ctx[2].replace(/^des /, "des ")} ?`.replace("Quel pourcentage des", "Quel pourcentage des"),
      mode: "nombre", prefixe: "p =", suffixe: "%", attendu: r,
      erreurs: [{ valeur: p1 + p2, message: "On n'additionne pas deux proportions emboîtées : on les **multiplie**." }],
      aides: [
        "Proportion de proportion : on **multiplie** les deux proportions, $p = p_1 \\times p_2$.",
        `$p = ${fr(p1 / 100)} \\times ${fr(p2 / 100)}$.`,
        `$${fr(p1 / 100)} \\times ${fr(p2 / 100)} = ${fr(r / 100)}$. Écris le résultat en pourcentage.`
      ],
      solution: `$p = ${fr(p1 / 100)} \\times ${fr(p2 / 100)} = ${fr(r / 100)} = ${pc(r)}$`
    };
  };

  GEN["taux-evolution"] = function () {
    let V1, t;
    do { V1 = pick([40, 50, 80, 120, 200, 250, 400, 500]); t = pick([-60, -50, -40, -25, -20, -15, -10, -5, 5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100]); } while ((V1 * t) % 100 !== 0);
    const V2 = V1 + (V1 * t) / 100;
    const ctx = pick([[`Le prix d'un article passe de $${V1}$ € à $${V2}$ €.`, "le prix"], [`Le nombre d'abonnés d'une page passe de $${V1}$ à $${V2}$.`, "le nombre d'abonnés"], [`Une production passe de $${V1}$ kg à $${V2}$ kg.`, "la production"]]);
    return {
      enonce: `${ctx[0]} Calcule le taux d'évolution (écris $-$ pour une baisse).`,
      mode: "nombre", prefixe: "t =", suffixe: "%", attendu: t,
      erreurs: [{ valeur: -t, message: `Attention au signe : c'est une ${t > 0 ? "hausse" : "baisse"}.` }, { valeur: V2 - V1, message: "Ça, c'est la variation absolue. Le taux est cette variation **divisée par la valeur initiale**." }],
      aides: [
        "Taux d'évolution : $t = \\dfrac{V_2 - V_1}{V_1}$, avec $V_1$ la valeur de départ.",
        `$t = \\dfrac{${V2} - ${V1}}{${V1}} = \\dfrac{${V2 - V1}}{${V1}}$.`,
        `$\\dfrac{${V2 - V1}}{${V1}} = ${fr(t / 100)}$. Écris-le en pourcentage.`
      ],
      solution: `$t = \\dfrac{${V2} - ${V1}}{${V1}} = ${fr(t / 100)} = ${sgnPc(t)}$ : ${ctx[1]} a ${t > 0 ? "augmenté" : "baissé"} de $${pc(Math.abs(t))}$.`
    };
  };

  GEN["coefficient"] = function () {
    const t = pick([-75, -40, -30, -20, -15, -7, -5, -0.5, 2.5, 5, 8, 12, 20, 35, 50, 150, 200]);
    const CM = +(1 + t / 100).toFixed(6);
    const mot = t > 0 ? "augmenter" : "diminuer";
    if (Math.random() < 0.5) {
      const err = t < 0 && Math.abs(t) < 10 ? [{ valeur: +(1 - Math.abs(t) / 10).toFixed(6), message: `Attention : $${pc(Math.abs(t))} = ${fr(Math.abs(t) / 100)}$, pas $${fr(Math.abs(t) / 10)}$.` }] : [];
      return {
        enonce: `Par quel nombre faut-il multiplier pour ${mot} une quantité de $${pc(Math.abs(t))}$ ?`,
        mode: "nombre", prefixe: "CM =", attendu: CM, erreurs: err,
        aides: [
          t > 0 ? "Augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$." : "Diminuer de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$.",
          `$\\dfrac{${fr(Math.abs(t))}}{100} = ${fr(Math.abs(t) / 100)}$.`,
          `$CM = 1 ${t > 0 ? "+" : "-"} ${fr(Math.abs(t) / 100)}$.`
        ],
        solution: `$CM = 1 ${t > 0 ? "+" : "-"} ${fr(Math.abs(t) / 100)} = ${fr(CM)}$`
      };
    }
    return {
      enonce: `Multiplier une quantité par $${fr(CM)}$ revient à l'augmenter ou à la diminuer de combien ? (écris $-$ pour une baisse)`,
      mode: "nombre", prefixe: "t =", suffixe: "%", attendu: t,
      erreurs: [{ valeur: -t, message: `Attention au signe : $${fr(CM)}$ est ${CM > 1 ? "plus grand" : "plus petit"} que $1$, c'est une ${CM > 1 ? "hausse" : "baisse"}.` }],
      aides: [
        "Le taux se retrouve avec $t = CM - 1$.",
        `$t = ${fr(CM)} - 1 = ${fr(t / 100)}$.`,
        "Multiplie par $100$ pour l'écrire en pourcentage."
      ],
      solution: `$t = ${fr(CM)} - 1 = ${fr(t / 100)} = ${sgnPc(t)}$`
    };
  };

  GEN["appliquer-evolution"] = function () {
    const t = pick([-40, -35, -30, -25, -20, -15, -10, 5, 8, 10, 12, 15, 20, 25, 30, 50]);
    const CM = (100 + t) / 100;
    const V1 = pick([20, 40, 60, 80, 120, 150, 200, 250, 300, 400, 500, 1200]);
    const V2 = +(V1 * CM).toFixed(2);
    const objet = pick(["un kayak", "un vélo", "un téléphone", "un sac", "une console"]);
    const evo = t > 0 ? `une hausse de $${pc(t)}$` : `une baisse de $${pc(-t)}$`;
    if (Math.random() < 0.5) {
      return {
        enonce: `${objet[0].toUpperCase() + objet.slice(1)} coûte $${V1}$ €. Calcule son prix après ${evo}.`,
        mode: "nombre", prefixe: "V₂ =", suffixe: "€", attendu: V2,
        aides: [
          `Traduis l'évolution par son coefficient multiplicateur : $CM = 1 ${t > 0 ? "+" : "-"} ${fr(Math.abs(t) / 100)} = ${fr(CM)}$.`,
          "Valeur finale : $V_2 = V_1 \\times CM$.",
          `$V_2 = ${V1} \\times ${fr(CM)}$.`
        ],
        solution: `$CM = ${fr(CM)}$ et $V_2 = ${V1} \\times ${fr(CM)} = ${fr(V2)}$ €.`
      };
    }
    const faux = +(V2 * (1 - t / 100)).toFixed(2);
    return {
      enonce: `Après ${evo}, ${objet} coûte $${fr(V2)}$ €. Quel était son prix avant ?`,
      mode: "nombre", prefixe: "V₁ =", suffixe: "€", attendu: V1,
      erreurs: faux !== V1 ? [{ valeur: faux, message: `Le pourcentage porte sur l'**ancien** prix : on ne peut pas appliquer l'évolution contraire. Il faut **diviser** par le coefficient.` }] : [],
      aides: [
        `Coefficient de l'évolution : $CM = ${fr(CM)}$.`,
        "On cherche la valeur initiale : $V_1 = \\dfrac{V_2}{CM}$.",
        `$V_1 = \\dfrac{${fr(V2)}}{${fr(CM)}}$.`
      ],
      solution: `$V_1 = \\dfrac{${fr(V2)}}{${fr(CM)}} = ${V1}$ €. Vérification : $${V1} \\times ${fr(CM)} = ${fr(V2)}$.`
    };
  };

  GEN["evolutions-successives"] = function () {
    const T = [-50, -40, -30, -25, -20, -10, 10, 20, 25, 30, 40, 50];
    const t1 = pick(T), t2 = pick(T);
    const c1 = (100 + t1) / 100, c2 = (100 + t2) / 100;
    const g = ((100 + t1) * (100 + t2) - 10000) / 100;
    const dire = (t) => (t > 0 ? `une hausse de $${pc(t)}$` : `une baisse de $${pc(-t)}$`);
    return {
      enonce: `Un prix subit ${dire(t1)}, puis ${dire(t2)}. Quel est le taux d'évolution global ? (écris $-$ pour une baisse)`,
      mode: "nombre", prefixe: "t =", suffixe: "%", attendu: g,
      erreurs: t1 + t2 !== g ? [{ valeur: t1 + t2, message: "Les taux ne s'additionnent pas : la deuxième évolution s'applique au prix **déjà modifié**. Multiplie les coefficients." }] : [],
      aides: [
        `Coefficients : $CM_1 = ${fr(c1)}$ et $CM_2 = ${fr(c2)}$.`,
        `Coefficient global : $CM = ${fr(c1)} \\times ${fr(c2)} = ${fr(c1 * c2)}$.`,
        "Taux global : $t = CM - 1$, puis en pourcentage."
      ],
      solution: `$CM = ${fr(c1)} \\times ${fr(c2)} = ${fr(c1 * c2)}$ et $t = ${fr(c1 * c2)} - 1 = ${fr(g / 100)}$, soit $${sgnPc(g)}$.`
    };
  };

  GEN["taux-reciproque"] = function () {
    const exacts = [[25, -20], [-20, 25], [100, -50], [-50, 100], [150, -60], [-60, 150], [300, -75], [-75, 300], [60, -37.5], [-37.5, 60], [400, -80], [-80, 400]];
    const arrondis = [8, 10, 15, 40, -10, -30, -40, 30];
    let t, r, tol = 1e-9, exact = Math.random() < 0.6;
    if (exact) [t, r] = pick(exacts);
    else { t = pick(arrondis); r = +((100 / (1 + t / 100)) - 100).toFixed(2); tol = 0.006; }
    const CM = 1 + t / 100;
    const dire = t > 0 ? `une hausse de $${pc(t)}$` : `une baisse de $${pc(-t)}$`;
    return {
      enonce: `Quel taux d'évolution permet d'annuler ${dire} et de revenir à la valeur initiale ?${exact ? "" : " (arrondi à $0{,}01\\,\\%$)"}`,
      mode: "nombre", prefixe: "t′ =", suffixe: "%", attendu: r, tolerance: tol,
      erreurs: [{ valeur: -t, message: "Ce n'est pas le taux changé de signe : l'évolution réciproque part de la valeur **déjà modifiée**." }],
      aides: [
        `Coefficient de l'évolution : $CM = ${fr(CM)}$.`,
        `Coefficient réciproque : $CM' = \\dfrac{1}{CM} = \\dfrac{1}{${fr(CM)}}${exact ? ` = ${fr(1 / CM)}` : ` \\approx ${fr(+(1 / CM).toFixed(4))}`}$.`,
        "Taux réciproque : $t' = CM' - 1$, puis en pourcentage."
      ],
      solution: `$CM' = \\dfrac{1}{${fr(CM)}} ${exact ? "=" : "\\approx"} ${fr(+(1 / CM).toFixed(4))}$ donc $t' ${exact ? "=" : "\\approx"} ${sgnPc(r)}$.`
    };
  };


  /* ---------- Automatismes de Seconde (fiches flash) ---------- */
  const pgcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  const frac = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = pgcd(n, d); n /= g; d /= g; return d === 1 ? `${n}` : `${n < 0 ? "-" : ""}\\dfrac{${Math.abs(n)}}{${d}}`; };
  const AIDE_FRAC = "Donne le résultat sous forme de fraction, par exemple $5/12$ (ou un entier).";

  GEN["auto-fractions"] = function (i) {
    if (i % 2 === 1) {
      const a = pick([2, 3, 5, 10]), m = randNZ(-4, 6), n = randNZ(-4, 6);
      const kind = pick(["prod", "quot", "pow"]);
      let expr, res, aide, aide2;
      if (kind === "prod") { expr = `${a}^{${m}} \\times ${a}^{${n}}`; res = m + n; aide = "$a^m \\times a^n = a^{m+n}$ : on **additionne** les exposants."; aide2 = `$${par(m)} + ${par(n)}$`; }
      else if (kind === "quot") { expr = `\\dfrac{${a}^{${m}}}{${a}^{${n}}}`; res = m - n; aide = "$\\dfrac{a^m}{a^n} = a^{m-n}$ : on **soustrait** les exposants."; aide2 = `$${par(m)} - ${par(n)}$`; }
      else { const k = rand(2, 4); expr = `\\left(${a}^{${m}}\\right)^{${k}}`; res = m * k; aide = "$(a^m)^n = a^{m \\times n}$ : on **multiplie** les exposants."; aide2 = `$${par(m)} \\times ${k}$`; }
      return {
        enonce: `Écris $${expr}$ sous la forme $${a}^{n}$. Quel est l'exposant $n$ ?`,
        mode: "nombre", prefixe: "n =", attendu: res,
        aides: [aide, `L'exposant vaut ${aide2}.`, "Attention aux signes : soustraire un négatif revient à ajouter."],
        solution: `$${expr} = ${a}^{${res}}$`
      };
    }
    const b = pick([2, 3, 4, 5, 6]), d = pick([2, 3, 4, 5, 6, 8].filter((x) => x !== b));
    const a = randNZ(1, b + 2), c = randNZ(1, d + 2);
    const op = pick(["+", "-", "\\times", "\\div"]);
    let n, den, aides;
    if (op === "+" || op === "-") {
      n = op === "+" ? a * d + c * b : a * d - c * b; den = b * d;
      aides = ["On réduit au même dénominateur avant d'additionner.", `$\\dfrac{${a}}{${b}} ${op} \\dfrac{${c}}{${d}} = \\dfrac{${a * d}}{${b * d}} ${op} \\dfrac{${c * b}}{${b * d}}$.`, AIDE_FRAC + " Pense à simplifier."];
    } else if (op === "\\times") {
      n = a * c; den = b * d;
      aides = ["On multiplie les numérateurs entre eux et les dénominateurs entre eux.", `$\\dfrac{${a} \\times ${c}}{${b} \\times ${d}}$.`, AIDE_FRAC + " Pense à simplifier."];
    } else {
      n = a * d; den = b * c;
      aides = ["Diviser par une fraction, c'est multiplier par son inverse.", `$\\dfrac{${a}}{${b}} \\times \\dfrac{${d}}{${c}}$.`, AIDE_FRAC + " Pense à simplifier."];
    }
    return {
      enonce: `Calcule $\\dfrac{${a}}{${b}} ${op} \\dfrac{${c}}{${d}}$.`,
      mode: "nombre", prefixe: "=", attendu: n / den,
      erreurs: op === "+" ? [{ valeur: (a + c) / (b + d), message: "On n'additionne pas les dénominateurs : il faut d'abord les rendre égaux." }] : [],
      aides,
      solution: `$\\dfrac{${a}}{${b}} ${op} \\dfrac{${c}}{${d}} = ${frac(n, den)}$`
    };
  };

  GEN["auto-conversions"] = function () {
    const T = [
      () => { const v = pick([1.2, 2.5, 3.5, 0.8, 4.25]); return [`$${fr(v)}$ km = ? m`, v * 1000, "m", "1 km = 1 000 m."]; },
      () => { const v = pick([45, 7, 120, 250]); return [`$${v}$ cm = ? m`, v / 100, "m", "1 m = 100 cm, donc on divise par 100."]; },
      () => { const v = pick([2.4, 1.5, 3, 0.5]); return [`$${fr(v)}$ m² = ? cm²`, v * 10000, "cm²", "1 m² = 100 dm² = 10 000 cm² (on multiplie par 100 à chaque unité)."]; },
      () => { const v = pick([3500, 12000, 500, 25000]); return [`$${v}$ m² = ? ha`, v / 10000, "ha", "1 ha = 10 000 m²."]; },
      () => { const v = pick([1.5, 0.75, 2, 0.33]); return [`$${fr(v)}$ L = ? mL`, Math.round(v * 1000), "mL", "1 L = 1 000 mL."]; },
      () => { const v = pick([0.2, 1.5, 2.4, 0.05]); return [`$${fr(v)}$ m³ = ? L`, Math.round(v * 1000), "L", "1 m³ = 1 000 dm³ = 1 000 L."]; },
      () => { const h = rand(1, 3), d = pick([0.25, 0.5, 0.75, 0.1, 0.2, 0.4]); return [`$${fr(h + d)}$ h = $${h}$ h et combien de minutes ?`, Math.round(d * 60), "min", `On convertit la partie décimale : $${fr(d)} \\times 60$ min.`]; },
      () => { const v = pick([18, 36, 54, 72, 90, 108]); return [`$${v}$ km/h = ? m/s`, v / 3.6, "m/s", "Pour passer de km/h à m/s, on divise par $3{,}6$."]; },
      () => { const v = pick([5, 10, 15, 20, 25]); return [`$${v}$ m/s = ? km/h`, v * 3.6, "km/h", "Pour passer de m/s à km/h, on multiplie par $3{,}6$."]; }
    ];
    const [enonce, rep, unite, regle] = pick(T)();
    return {
      enonce: `Convertis : ${enonce}`,
      mode: "nombre", prefixe: "Réponse :", suffixe: unite, attendu: +rep.toFixed(6),
      aides: [regle, "Fais le calcul de tête en déplaçant la virgule si c'est une puissance de 10.", `Le résultat est de l'ordre de $${fr(+rep.toPrecision(1))}$.`],
      solution: `${enonce.replace("?", "$" + fr(+rep.toFixed(6)) + "$")}. ${regle}`
    };
  };

  GEN["auto-litteral"] = function () {
    const a = rand(3, 7), k = rand(2, 4);
    const T = [
      () => [`Développe $(x + ${a})^2$.`, `x^2 + ${2 * a}x + ${a * a}`, [`x^2 + ${a * a}`, `x^2 + ${a}x + ${a * a}`, `x^2 + ${2 * a}x + ${2 * a}`], "$(a+b)^2 = a^2 + 2ab + b^2$ : n'oublie pas le double produit."],
      () => [`Développe $(x - ${a})^2$.`, `x^2 - ${2 * a}x + ${a * a}`, [`x^2 - ${a * a}`, `x^2 - ${2 * a}x - ${a * a}`, `x^2 + ${2 * a}x + ${a * a}`], "$(a-b)^2 = a^2 - 2ab + b^2$."],
      () => [`Développe $(${k}x + ${a})(${k}x - ${a})$.`, `${k * k}x^2 - ${a * a}`, [`${k}x^2 - ${a * a}`, `${k * k}x^2 + ${a * a}`, `${k * k}x^2 - ${2 * k * a}x - ${a * a}`], "$(a+b)(a-b) = a^2 - b^2$, avec ici $a = " + k + "x$ : $(" + k + "x)^2 = " + k * k + "x^2$."],
      () => [`Supprime les parenthèses : $-(${k}x - ${a})$.`, `-${k}x + ${a}`, [`-${k}x - ${a}`, `${k}x - ${a}`, `${k}x + ${a}`], "Un signe $-$ devant une parenthèse change le signe de **chaque** terme."],
      () => [`Factorise $x^2 - ${a * a}$.`, `(x - ${a})(x + ${a})`, [`(x - ${a})^2`, `(x + ${a})^2`, `(x - ${a * a})(x + ${a * a})`], "$a^2 - b^2 = (a-b)(a+b)$, avec $b^2 = " + a * a + "$."],
      () => [`Factorise $${k}x^2 + ${a}x$.`, `x(${k}x + ${a})`, [`${k}x(x + ${a})`, `x(${k}x + ${a}x)`, `${k + a}x^2`], "Cherche le facteur commun aux deux termes : ici $x$."]
    ];
    const [enonce, bonne, fausses, regle] = pick(T)();
    const choix = shuffle([bonne, ...fausses]);
    return {
      enonce, mode: "choix", choix: choix.map((c) => `$${c}$`), attendu: choix.indexOf(bonne),
      aides: [regle, "Vérifie en redéveloppant de tête la réponse que tu choisis.", "Méfie-toi des réponses qui oublient un terme ou un signe."],
      solution: `${enonce.replace(/\.$/, "")} : $${bonne}$.\n\n${regle}`
    };
  };

  GEN["auto-equations"] = function (i) {
    if (i === 3 || i === 4) {
      const r = pick([2, 3, 4, 5, 6, 7, 9, 10]);
      const neg = i === 4 && Math.random() < 0.4;
      const k = neg ? -r : r * r;
      return {
        enonce: `Résous l'équation $x^2 = ${k}$.`,
        mode: "ensemble", prefixe: "Solution(s) :", attendu: neg ? [] : [-r, r],
        aides: [
          "Si $a > 0$, l'équation $x^2 = a$ a deux solutions : $\\sqrt{a}$ et $-\\sqrt{a}$.",
          neg ? "Un carré peut-il être négatif ?" : `$\\sqrt{${k}} = ${r}$.`,
          neg ? "S'il n'y a pas de solution, écris « aucun »." : "N'oublie pas la solution négative. Sépare les valeurs par « ; »."
        ],
        solution: neg ? `Un carré est toujours positif : l'équation $x^2 = ${k}$ n'a **aucune solution**.` : `$x^2 = ${k} \\iff x = ${r}$ ou $x = -${r}$. $S = \\{-${r}\\,;${r}\\}$`
      };
    }
    let a, c; do { a = randNZ(-6, 7); c = randNZ(-6, 7); } while (a === c);
    const x0 = rand(-6, 8), b = rand(-9, 9), d = a * x0 + b - c * x0;
    return {
      enonce: `Résous l'équation $${poly([a, b])} = ${poly([c, d])}$.`,
      mode: "nombre", prefixe: "x =", attendu: x0,
      aides: [
        "Regroupe les termes en $x$ dans un membre et les nombres dans l'autre.",
        `$${a}x - ${par(c)}x = ${d} - ${par(b)}$, soit $${a - c}x = ${d - b}$.`,
        `Divise par $${a - c}$.`
      ],
      solution: `$${poly([a, b])} = ${poly([c, d])} \\iff ${a - c}x = ${d - b} \\iff x = ${x0}$`
    };
  };

  GEN["auto-pourcentages"] = (i) => GEN[pick(["coefficient", "appliquer-evolution", "partie-tout", "proportion-de-proportion", "evolutions-successives"])](i);
  GEN["auto-fonctions"] = (i) => GEN[pick(["appartenance", "image-calcul", "lecture-image", "lecture-antecedents"])](i);

  GEN["auto-grandeurs"] = function () {
    const T = [
      () => { const L = rand(3, 12), l = rand(2, 9); return [`l'aire d'un rectangle de $${L}$ cm sur $${l}$ cm`, L * l, "cm²", "Aire d'un rectangle : $\\mathcal{A} = L \\times \\ell$."]; },
      () => { const b = rand(2, 10) * 2, h = rand(3, 9); return [`l'aire d'un triangle de base $${b}$ cm et de hauteur $${h}$ cm`, (b * h) / 2, "cm²", "Aire d'un triangle : $\\dfrac{\\text{base} \\times \\text{hauteur}}{2}$."]; },
      () => { const L = rand(2, 6), l = rand(2, 5), h = rand(2, 5); return [`le volume d'un pavé droit de $${L}$ dm sur $${l}$ dm sur $${h}$ dm`, L * l * h, "dm³", "Volume d'un pavé droit : $L \\times \\ell \\times h$."]; },
      () => { const r = rand(2, 9); return [`l'aire d'un disque de rayon $${r}$ cm (valeur exacte)`, r * r, "π cm²", "Aire d'un disque : $\\pi r^2$. Donne le nombre devant $\\pi$."]; },
      () => { const r = rand(2, 6), h = rand(2, 10); return [`le volume d'un cylindre de rayon $${r}$ cm et de hauteur $${h}$ cm (valeur exacte)`, r * r * h, "π cm³", "Volume d'un cylindre : $\\pi r^2 h$. Donne le nombre devant $\\pi$."]; },
      () => { const r = pick([3, 6]), h = rand(2, 8); return [`le volume d'un cône de rayon $${r}$ cm et de hauteur $${h}$ cm (valeur exacte)`, (r * r * h) / 3, "π cm³", "Volume d'un cône : $\\dfrac{1}{3}\\pi r^2 h$. Donne le nombre devant $\\pi$."]; },
      () => { const r = pick([3, 6]); return [`le volume d'une boule de rayon $${r}$ cm (valeur exacte)`, (4 * r ** 3) / 3, "π cm³", "Volume d'une boule : $\\dfrac{4}{3}\\pi r^3$. Donne le nombre devant $\\pi$."]; }
    ];
    const [quoi, rep, unite, regle] = pick(T)();
    return {
      enonce: `Calcule ${quoi}.`,
      mode: "nombre", prefixe: "Réponse :", suffixe: unite, attendu: rep,
      aides: [regle, "Vérifie que toutes les longueurs sont dans la même unité.", "Calcule de tête ou à la main, étape par étape."],
      solution: `${regle} Ici : $${fr(rep)}$ ${unite}.`
    };
  };

  GEN["auto-pythagore"] = function () {
    const [p, q, r] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20]]);
    const mode = pick(["hyp", "hyp", "cote", "reci"]);
    if (mode === "reci") {
      const ok = Math.random() < 0.5, c = ok ? r : r + 1;
      return {
        enonce: `Un triangle a pour côtés $${p}$, $${q}$ et $${c}$. Est-il rectangle ?`,
        mode: "choix", choix: ["Oui", "Non"], attendu: ok ? 0 : 1,
        aides: ["Compare le carré du plus grand côté à la somme des carrés des deux autres.", `$${c}^2 = ${c * c}$ et $${p}^2 + ${q}^2 = ${p * p + q * q}$.`, "Égalité : rectangle (réciproque de Pythagore). Sinon : pas rectangle."],
        solution: `$${c}^2 = ${c * c}$ et $${p}^2 + ${q}^2 = ${p * p + q * q}$. ` + (ok ? "Égalité : le triangle est **rectangle**." : "Pas d'égalité : le triangle **n'est pas rectangle**.")
      };
    }
    if (mode === "hyp") {
      return {
        enonce: `$ABC$ est rectangle en $A$ avec $AB = ${p}$ et $AC = ${q}$. Calcule $BC$.`,
        mode: "nombre", prefixe: "BC =", attendu: r,
        erreurs: [{ valeur: p + q, message: "On n'additionne pas les longueurs : on additionne leurs **carrés**." }],
        aides: ["$[BC]$ est l'hypoténuse : $BC^2 = AB^2 + AC^2$.", `$BC^2 = ${p * p} + ${q * q} = ${r * r}$.`, `$BC = \\sqrt{${r * r}}$.`],
        solution: `$BC^2 = ${p}^2 + ${q}^2 = ${r * r}$, donc $BC = \\sqrt{${r * r}} = ${r}$.`
      };
    }
    return {
      enonce: `$DEF$ est rectangle en $E$ avec $DF = ${r}$ et $DE = ${p}$. Calcule $EF$.`,
      mode: "nombre", prefixe: "EF =", attendu: q,
      aides: ["$[DF]$ est l'hypoténuse : $DF^2 = DE^2 + EF^2$.", `$EF^2 = DF^2 - DE^2 = ${r * r} - ${p * p} = ${q * q}$.`, `$EF = \\sqrt{${q * q}}$.`],
      solution: `$EF^2 = ${r}^2 - ${p}^2 = ${q * q}$, donc $EF = ${q}$.`
    };
  };

  GEN["auto-statistiques"] = function () {
    const n = rand(5, 8);
    let s; do { s = Array.from({ length: n }, () => rand(1, 20)); } while (pick([true, false]) && s.reduce((x, y) => x + y) % n !== 0);
    const tri = s.slice().sort((x, y) => x - y), somme = s.reduce((x, y) => x + y);
    const med = n % 2 ? tri[(n - 1) / 2] : (tri[n / 2 - 1] + tri[n / 2]) / 2;
    const serie = s.join(" ; ");
    const moyOK = somme % n === 0;
    const quoi = moyOK ? pick(["moyenne", "mediane", "etendue"]) : pick(["mediane", "etendue"]);
    if (quoi === "moyenne") return {
      enonce: `Série : $${serie}$. Calcule la moyenne.`, mode: "nombre", prefixe: "Moyenne :", attendu: somme / n,
      aides: ["Moyenne = somme des valeurs ÷ nombre de valeurs.", `Somme : $${somme}$. Nombre de valeurs : $${n}$.`, `$${somme} \\div ${n}$.`],
      solution: `$\\bar{x} = \\dfrac{${somme}}{${n}} = ${somme / n}$`
    };
    if (quoi === "etendue") return {
      enonce: `Série : $${serie}$. Calcule l'étendue.`, mode: "nombre", prefixe: "Étendue :", attendu: tri[n - 1] - tri[0],
      aides: ["Étendue = plus grande valeur − plus petite valeur.", `Plus grande : $${tri[n - 1]}$ ; plus petite : $${tri[0]}$.`, "Fais la soustraction."],
      solution: `Étendue $= ${tri[n - 1]} - ${tri[0]} = ${tri[n - 1] - tri[0]}$`
    };
    return {
      enonce: `Série : $${serie}$. Détermine la médiane.`, mode: "nombre", prefixe: "Médiane :", attendu: med,
      erreurs: [{ valeur: n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2, message: "Il faut d'abord **ranger** les valeurs dans l'ordre croissant." }],
      aides: ["Range d'abord les valeurs dans l'ordre croissant.", `Valeurs rangées : $${tri.join(" ; ")}$.`, n % 2 ? `Il y a $${n}$ valeurs (impair) : la médiane est la valeur du milieu, au rang $${(n + 1) / 2}$.` : `Il y a $${n}$ valeurs (pair) : la médiane est la moyenne des valeurs de rangs $${n / 2}$ et $${n / 2 + 1}$.`],
      solution: `Valeurs rangées : $${tri.join(" ; ")}$. Médiane : $${fr(med)}$.`
    };
  };

  GEN["auto-probabilites"] = function () {
    const T = [
      () => { const ev = pick([["obtenir 6", 1], ["obtenir un nombre pair", 3], ["obtenir au moins 5", 2], ["ne pas obtenir 1", 5], ["obtenir un multiple de 3", 2]]); return [`On lance un dé équilibré à six faces. Quelle est la probabilité de l'événement « ${ev[0]} » ?`, ev[1] / 6, ["Il y a 6 issues équiprobables.", `Compte les issues favorables : il y en a $${ev[1]}$.`, AIDE_FRAC], `$p = \\dfrac{${ev[1]}}{6}${pgcd(ev[1], 6) > 1 ? " = " + frac(ev[1], 6) : ""}$`]; },
      () => { const r = rand(2, 6), b = rand(1, 5), v = rand(1, 4), t = r + b + v; const q = pick([["rouge", r], ["qui n'est pas bleue", r + v], ["rouge ou verte", r + v], ["verte", v]]); return [`Une urne contient $${r}$ boules rouges, $${b}$ bleues et $${v}$ vertes. On tire une boule au hasard. Probabilité de tirer une boule ${q[0]} ?`, q[1] / t, [`Il y a $${t}$ boules en tout, toutes équiprobables.`, `Issues favorables : $${q[1]}$.`, AIDE_FRAC], `$p = ${frac(q[1], t)}$`]; },
      () => { const p = pick([0.35, 0.2, 0.62, 0.05, 0.875]); return [`$P(A) = ${fr(p)}$. Calcule $P(\\overline{A})$.`, +(1 - p).toFixed(6), ["L'événement contraire : $P(\\overline{A}) = 1 - P(A)$.", `$1 - ${fr(p)}$.`, "Donne le résultat en écriture décimale."], `$P(\\overline{A}) = 1 - ${fr(p)} = ${fr(1 - p)}$`]; }
    ];
    const [enonce, rep, aides, sol] = pick(T)();
    return { enonce, mode: "nombre", prefixe: "p =", attendu: rep, tolerance: 1e-6, aides, solution: sol };
  };

  const FICHES = ["auto-fractions", "auto-conversions", "auto-litteral", "auto-equations", "auto-pourcentages", "auto-fonctions", "auto-grandeurs", "auto-pythagore", "auto-statistiques", "auto-probabilites"];
  GEN["auto-melange"] = (i) => GEN[FICHES[(i + rand(0, 9)) % FICHES.length]](rand(0, 4));


  /* ---------- Première : suites numériques ---------- */
  const nbr = (n) => fr(+(+n).toFixed(6)); // nombre décimal à la française dans une formule

  GEN["suite-explicite"] = function () {
    const quad = Math.random() < 0.6;
    const coefs = quad ? [randNZ(-3, 3), rand(-6, 6), rand(-9, 9)] : [randNZ(-7, 7), rand(-9, 9)];
    const n = pick([0, 1, 2, 3, 4, 5, 10]);
    let v = 0; coefs.forEach((c) => { v = v * n + c; });
    const sub = quad ? `${coefs[0]} \\times ${n}^2${coefs[1] ? ` ${sg(coefs[1])} \\times ${n}` : ""}${coefs[2] ? ` ${sg(coefs[2])}` : ""}` : `${coefs[0]} \\times ${n}${coefs[1] ? ` ${sg(coefs[1])}` : ""}`;
    return {
      enonce: `On définit $(u_n)$ par $u_n = ${poly(coefs, "n")}$. Calcule $u_{${n}}$.`,
      mode: "nombre", prefixe: `u${n} =`.replace(/(\d+)/, (d) => d.split("").map((c) => "₀₁₂₃₄₅₆₇₈₉"[c]).join("")), attendu: v,
      aides: ["Formule explicite : on remplace $n$ par la valeur voulue.", `$u_{${n}} = ${sub}$.`, "Respecte les priorités : puissance, produits, puis sommes."],
      solution: `$u_{${n}} = ${sub} = ${v}$`
    };
  };

  GEN["suite-recurrence"] = function () {
    const a = pick([2, 3, -1, 0.5, -2]), b = rand(-5, 6);
    let u0 = rand(-4, 8); if (a === 0.5 && u0 % 2) u0 += 1;
    const k = a === 0.5 ? 2 : pick([2, 3]);
    const t = [u0]; for (let i = 0; i < k; i++) t.push(+(a * t[i] + b).toFixed(6));
    if (t[1] === t[0]) return GEN["suite-recurrence"]();
    const rel = `${a === 1 ? "" : a === -1 ? "-" : nbr(a)}u_n ${b ? sg(b) : ""}`;
    return {
      enonce: `On définit $(u_n)$ par $u_0 = ${u0}$ et $u_{n+1} = ${rel}$. Calcule $u_{${k}}$.`,
      mode: "nombre", prefixe: `u${"₀₁₂₃"[k]} =`, attendu: t[k],
      aides: ["Par récurrence, on calcule les termes **de proche en proche** : $u_1$ à partir de $u_0$, puis $u_2$…", `$u_1 = ${nbr(a)} \\times ${par(u0)} ${b ? sg(b) : ""} = ${nbr(t[1])}$.`, `Continue : $u_2 = ${nbr(a)} \\times ${par(t[1])} ${b ? sg(b) : ""}$.`],
      solution: t.map((v, i) => `$u_{${i}} = ${nbr(v)}$`).join(", ") + "."
    };
  };

  GEN["suite-arithmetique"] = function () {
    if (Math.random() < 0.6) {
      const u0 = rand(-10, 20), r = randNZ(-6, 8), n = pick([10, 12, 20, 25, 50, 100]);
      const debut1 = Math.random() < 0.3;
      const v = debut1 ? u0 + (n - 1) * r : u0 + n * r;
      return {
        enonce: `$(u_n)$ est arithmétique de premier terme $u_${debut1 ? 1 : 0} = ${u0}$ et de raison $r = ${r}$. Calcule $u_{${n}}$.`,
        mode: "nombre", prefixe: "Terme :", attendu: v,
        erreurs: debut1 ? [{ valeur: u0 + n * r, message: `La suite commence à $u_1$ : de $u_1$ à $u_{${n}}$, on ajoute la raison $${n - 1}$ fois, pas $${n}$.` }] : [],
        aides: [debut1 ? "Si la suite commence à $u_1$ : $u_n = u_1 + (n - 1)r$." : "Terme général : $u_n = u_0 + nr$.", debut1 ? `$u_{${n}} = ${u0} + ${n - 1} \\times ${par(r)}$.` : `$u_{${n}} = ${u0} + ${n} \\times ${par(r)}$.`, "Calcule le produit, puis la somme."],
        solution: debut1 ? `$u_{${n}} = ${u0} + ${n - 1} \\times ${par(r)} = ${v}$` : `$u_{${n}} = ${u0} + ${n} \\times ${par(r)} = ${v}$`
      };
    }
    const r = randNZ(-5, 6), u0 = rand(-10, 10), p = rand(2, 6), q = p + rand(2, 6);
    return {
      enonce: `$(u_n)$ est arithmétique avec $u_{${p}} = ${u0 + p * r}$ et $u_{${q}} = ${u0 + q * r}$. Quelle est sa raison ?`,
      mode: "nombre", prefixe: "r =", attendu: r,
      aides: ["La raison se calcule comme un coefficient directeur : $r = \\dfrac{u_q - u_p}{q - p}$.", `$r = \\dfrac{${u0 + q * r} - ${par(u0 + p * r)}}{${q} - ${p}}$.`, `$= \\dfrac{${(q - p) * r}}{${q - p}}$.`],
      solution: `$r = \\dfrac{${u0 + q * r} - ${par(u0 + p * r)}}{${q - p}} = ${r}$, et $u_0 = ${u0 + p * r} - ${p} \\times ${par(r)} = ${u0}$.`
    };
  };

  GEN["suite-geometrique"] = function () {
    const mode = pick(["terme", "terme", "taux"]);
    if (mode === "taux") {
      const t = pick([-30, -20, -15, -10, -5, 2, 3, 5, 8, 10, 20]), u0 = pick([200, 500, 1000, 2400, 5000]);
      const q = 1 + t / 100;
      return {
        enonce: `Une quantité vaut $${u0}$ au départ et ${t > 0 ? "augmente" : "diminue"} de $${pc(Math.abs(t))}$ chaque année. On note $u_n$ sa valeur après $n$ années. Quelle est la raison de la suite géométrique $(u_n)$ ?`,
        mode: "nombre", prefixe: "q =", attendu: q,
        erreurs: [{ valeur: Math.abs(t) / 100, message: "La raison n'est pas le taux : c'est le **coefficient multiplicateur** $1 \\pm \\dfrac{t}{100}$." }],
        aides: [`${t > 0 ? "Augmenter" : "Diminuer"} de $t\\,\\%$, c'est multiplier par $1 ${t > 0 ? "+" : "-"} \\dfrac{t}{100}$.`, `$1 ${t > 0 ? "+" : "-"} ${fr(Math.abs(t) / 100)}$.`, `Alors $u_n = ${u0} \\times q^n$.`],
        solution: `$q = 1 ${t > 0 ? "+" : "-"} ${fr(Math.abs(t) / 100)} = ${nbr(q)}$ et $u_n = ${u0} \\times ${nbr(q)}^n$.`
      };
    }
    const q = pick([2, 3, -2, 0.5, 10]), u0 = pick(q === 0.5 ? [64, 128, 96, 160] : [1, 2, 3, 5, -1, 4]), n = q === 10 ? rand(2, 4) : rand(3, 6);
    const v = +(u0 * q ** n).toFixed(6);
    return {
      enonce: `$(u_n)$ est géométrique de premier terme $u_0 = ${u0}$ et de raison $q = ${nbr(q)}$. Calcule $u_{${n}}$.`,
      mode: "nombre", prefixe: "Terme :", attendu: v,
      erreurs: [{ valeur: +((u0 * q) ** n).toFixed(6), message: "Seule la raison est à la puissance $n$ : $u_0 \\times q^n$, pas $(u_0 \\times q)^n$." }, { valeur: u0 + n * q, message: "Ça, c'est la formule d'une suite **arithmétique**. Ici on multiplie : $u_n = u_0 \\times q^n$." }].filter((e) => Math.abs(e.valeur - v) > 1e-9),
      aides: ["Terme général : $u_n = u_0 \\times q^n$.", `$u_{${n}} = ${u0} \\times ${par(nbr(q))}^{${n}}$.`, `$${par(nbr(q))}^{${n}} = ${nbr(q ** n)}$.`],
      solution: `$u_{${n}} = ${u0} \\times ${par(nbr(q))}^{${n}} = ${u0} \\times ${par(nbr(q ** n))} = ${nbr(v)}$`
    };
  };

  GEN["suite-nature"] = function () {
    const type = pick(["a", "g", "n"]);
    let t;
    if (type === "a") { const u = rand(-10, 15), r = randNZ(-6, 7); t = [0, 1, 2, 3].map((i) => u + i * r); }
    else if (type === "g") { const u = pick([1, 2, 3, 5, 100, 64]), q = pick(u === 100 || u === 64 ? [0.5, 2] : [2, 3, -2]); t = [0, 1, 2, 3].map((i) => +(u * q ** i).toFixed(6)); }
    else { t = pick([[1, 4, 9, 16], [1, 2, 4, 7], [2, 3, 5, 8], [3, 6, 9, 15], [1, 3, 7, 15]]); }
    const choix = ["Arithmétique", "Géométrique", "Ni l'un ni l'autre"];
    return {
      enonce: `Les premiers termes d'une suite sont $${t.map(nbr).join(" ; ")}$. Cette suite peut-elle être arithmétique ou géométrique ?`,
      mode: "choix", choix, attendu: { a: 0, g: 1, n: 2 }[type],
      aides: ["Calcule les différences entre deux termes consécutifs : si elles sont toutes égales, c'est arithmétique.", "Sinon, calcule les quotients : s'ils sont tous égaux, c'est géométrique.", `Différences : $${t.slice(1).map((v, i) => nbr(v - t[i])).join(" ; ")}$.`],
      solution: type === "a" ? `Les différences valent toutes $${t[1] - t[0]}$ : suite arithmétique de raison $${t[1] - t[0]}$.` : type === "g" ? `Les quotients valent tous $${nbr(t[1] / t[0])}$ : suite géométrique de raison $${nbr(t[1] / t[0])}$.` : `Les différences ($${t.slice(1).map((v, i) => v - t[i]).join(" ; ")}$) et les quotients ne sont pas constants : ni arithmétique, ni géométrique.`
    };
  };

  GEN["suite-variation"] = function () {
    const choix = ["Strictement croissante", "Strictement décroissante", "Ni croissante ni décroissante"];
    const T = [
      () => { const u = rand(-5, 10), r = randNZ(-5, 5); return [`$u_n = ${poly([r, u], "n")}$`, r > 0 ? 0 : 1, `C'est une suite arithmétique de raison $${r}$ : elle est ${r > 0 ? "croissante car $r > 0$" : "décroissante car $r < 0$"}.`]; },
      () => { const u = pick([3, 5, 100, -2, -4]), q = pick([2, 1.5, 0.5, 0.9, 3]); const cr = (u > 0) === (q > 1); return [`$u_n = ${u} \\times ${nbr(q)}^n$`, cr ? 0 : 1, `Géométrique de raison $${nbr(q)}$ ${q > 1 ? "> 1" : "entre 0 et 1"} et de premier terme ${u > 0 ? "positif" : "**négatif**"} : elle est ${cr ? "croissante" : "décroissante"}.`]; },
      () => { const u = pick([2, 5, -3]), q = pick([-2, -0.5, -3]); return [`$u_n = ${u} \\times (${nbr(q)})^n$`, 2, "La raison est négative : les termes changent de signe à chaque rang, la suite n'est pas monotone."]; },
      () => { const a = rand(1, 3); return [`$u_n = ${poly([a, 0, rand(-5, 5)], "n")}$`, 0, `$u_{n+1} - u_n = ${a}(2n + 1) > 0$ pour tout $n$ : la suite est croissante.`]; }
    ];
    const [expr, rep, sol] = pick(T)();
    return {
      enonce: `Quel est le sens de variation de la suite définie pour tout $n \\in \\mathbb{N}$ par ${expr} ?`,
      mode: "choix", choix, attendu: rep,
      aides: ["Reconnais d'abord la nature de la suite : arithmétique ($u_0 + nr$), géométrique ($u_0 \\times q^n$) ou autre.", "Arithmétique : signe de $r$. Géométrique : regarde $q$ (et le signe de $u_0$).", "Sinon, étudie le signe de $u_{n+1} - u_n$."],
      solution: sol
    };
  };

  GEN["suite-somme"] = function () {
    const T = [
      () => { const n = pick([10, 20, 50, 100, 200]); return [`$1 + 2 + 3 + \\dots + ${n}$`, (n * (n + 1)) / 2, ["$1 + 2 + \\dots + n = \\dfrac{n(n+1)}{2}$.", `$\\dfrac{${n} \\times ${n + 1}}{2}$.`, "Calcule."], `$\\dfrac{${n} \\times ${n + 1}}{2} = ${(n * (n + 1)) / 2}$`]; },
      () => { const u = rand(1, 9), r = rand(2, 5), k = rand(8, 25), last = u + (k - 1) * r; return [`$${u} + ${u + r} + ${u + 2 * r} + \\dots + ${last}$ (termes d'une suite arithmétique)`, (k * (u + last)) / 2, [`Raison $${r}$. Nombre de termes : $\\dfrac{${last} - ${u}}{${r}} + 1 = ${k}$.`, "Somme = nombre de termes $\\times \\dfrac{\\text{premier} + \\text{dernier}}{2}$.", `$${k} \\times \\dfrac{${u} + ${last}}{2}$.`], `$${k}$ termes, $S = ${k} \\times \\dfrac{${u} + ${last}}{2} = ${(k * (u + last)) / 2}$`]; },
      () => { const q = pick([2, 3]), n = q === 2 ? rand(5, 10) : rand(3, 6); return [`$1 + ${q} + ${q}^2 + \\dots + ${q}^{${n}}$`, (q ** (n + 1) - 1) / (q - 1), ["$1 + q + \\dots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$.", `Attention : il y a $${n + 1}$ termes, donc l'exposant est $${n + 1}$.`, `$\\dfrac{1 - ${q}^{${n + 1}}}{1 - ${q}}$.`], `$\\dfrac{1 - ${q}^{${n + 1}}}{1 - ${q}} = ${(q ** (n + 1) - 1) / (q - 1)}$`]; }
    ];
    const [expr, rep, aides, sol] = pick(T)();
    return { enonce: `Calcule ${expr}.`, mode: "nombre", prefixe: "S =", attendu: rep, aides, solution: sol };
  };

  GEN["suite-seuil"] = function () {
    const up = Math.random() < 0.6;
    const u0 = pick([100, 200, 500, 1000]), q = up ? pick([1.1, 1.2, 1.5, 2]) : pick([0.5, 0.8, 0.9]);
    const A = up ? u0 * pick([3, 5, 10]) : u0 / pick([4, 10, 20]);
    let n = 0, u = u0; while (up ? u <= A : u >= A) { n++; u *= q; }
    return {
      enonce: `$u_n = ${u0} \\times ${nbr(q)}^n$. Quel est le plus petit entier $n$ tel que $u_n ${up ? ">" : "<"} ${nbr(A)}$ ?`,
      mode: "nombre", prefixe: "n =", attendu: n,
      aides: [`La suite est ${up ? "croissante" : "décroissante"} : on calcule les termes jusqu'à ${up ? "dépasser" : "passer sous"} $${nbr(A)}$.`, "Utilise le tableau de valeurs de ta calculatrice (mode Suite).", `$u_{${n - 1}} \\approx ${nbr(+(u0 * q ** (n - 1)).toFixed(2))}$ : ce n'est pas encore suffisant.`],
      solution: `$u_{${n - 1}} \\approx ${nbr(+(u0 * q ** (n - 1)).toFixed(2))}$ et $u_{${n}} \\approx ${nbr(+(u0 * q ** n).toFixed(2))}$ : le seuil est $n = ${n}$.`
    };
  };

  /* ---------- Première : second degré, forme factorisée ---------- */
  const facteur = (r) => (r === 0 ? "x" : `(x ${r > 0 ? "-" : "+"} ${Math.abs(r)})`);
  const formeFact = (a, r1, r2) => `${a === 1 ? "" : a === -1 ? "-" : a}${r1 === r2 ? `${facteur(r1)}^2` : r2 === 0 ? facteur(r2) + facteur(r1) : facteur(r1) + facteur(r2)}`;
  function racines2() { let r1 = rand(-6, 6), r2 = rand(-6, 6); while (r2 === r1) r2 = rand(-6, 6); return r1 < r2 ? [r1, r2] : [r2, r1]; }

  GEN["sd-racines"] = function () {
    const a = pick([1, 2, 3, -1, -2, 0.5]);
    const [r1, r2] = racines2();
    return {
      enonce: `Quelles sont les racines de $f(x) = ${formeFact(a === 0.5 ? "\\frac{1}{2}" : a, r1, r2)}$ ?`.replace("\\frac{1}{2}(", "\\frac{1}{2}("),
      mode: "ensemble", prefixe: "Racines :", attendu: [r1, r2],
      erreurs: [],
      aides: ["Équation produit nul : un produit est nul si l'un de ses facteurs est nul.", "Dans $(x - x_1)$, la racine est $x_1$ : attention, le signe change ! $(x + 3)$ donne la racine $-3$.", "Sépare les deux racines par « ; »."],
      solution: `$f(x) = 0 \\iff ${facteur(r1).replace(/[()]/g, "")} = 0$ ou $${facteur(r2).replace(/[()]/g, "")} = 0$. Les racines sont $${r1}$ et $${r2}$.`
    };
  };

  GEN["sd-developper"] = function () {
    const a = pick([1, 2, -1, 3, -2]);
    const [r1, r2] = racines2();
    const b = -a * (r1 + r2), c = a * r1 * r2;
    const bonne = poly([a, b, c]);
    const fausses = [poly([a, a * (r1 + r2), c]), poly([a, -(r1 + r2), r1 * r2]), poly([a, b, -c])].filter((f) => f !== bonne);
    const choix = shuffle([...new Set([bonne, ...fausses])]);
    return {
      enonce: `Quelle est la forme développée réduite de $f(x) = ${formeFact(a, r1, r2)}$ ?`,
      mode: "choix", choix: choix.map((x) => `$${x}$`), attendu: choix.indexOf(bonne),
      aides: ["Développe d'abord le produit des deux parenthèses, **puis** multiplie par $a$.", `$${facteur(r1)}${facteur(r2)} = ${poly([1, -(r1 + r2), r1 * r2])}$.`, `Contrôle : le coefficient de $x^2$ est $a = ${a}$ et $f(0) = ${c}$.`],
      solution: `$f(x) = ${a === 1 ? "" : (a === -1 ? "-" : a) + "("}${poly([1, -(r1 + r2), r1 * r2])}${a === 1 ? "" : ")"} = ${bonne}$`
    };
  };

  GEN["sd-inequation"] = function () {
    const a = pick([1, 2, -1, -3, 0.5]);
    const [r1, r2] = racines2();
    const op = pick([">", "<", "\\geqslant", "\\leqslant"]);
    const strict = op === ">" || op === "<";
    const positif = op === ">" || op === "\\geqslant";
    const dedansS = interv(r1, r2, false, false), dedansL = interv(r1, r2, true, true);
    const dehorsS = `]-\\infty\\,;${r1}[ \\cup ]${r2}\\,;+\\infty[`, dehorsL = `]-\\infty\\,;${r1}] \\cup [${r2}\\,;+\\infty[`;
    // signe de a à l'extérieur des racines
    const dehors = (a > 0) === positif;
    const bonne = dehors ? (strict ? dehorsS : dehorsL) : (strict ? dedansS : dedansL);
    const choix = shuffle([dedansS, dedansL, dehorsS, dehorsL]);
    const af = a === 0.5 ? "\\frac{1}{2}" : a;
    return {
      enonce: `Résous dans $\\mathbb{R}$ l'inéquation $${formeFact(af, r1, r2)} ${op} 0$.`,
      mode: "choix", choix: choix.map((c) => `$S = ${c}$`), attendu: choix.indexOf(bonne),
      aides: [`Les racines sont $${r1}$ et $${r2}$, et $a = ${a === 0.5 ? "\\frac{1}{2}" : a}$ est ${a > 0 ? "positif" : "négatif"}.`, "$f(x)$ est du signe de $a$ **à l'extérieur** des racines, du signe contraire **entre** les racines.", strict ? "Inégalité stricte : les racines sont exclues." : "Inégalité large : les racines sont incluses."],
      solution: `$a ${a > 0 ? ">" : "<"} 0$ : $f(x)$ est ${a > 0 ? "positif" : "négatif"} à l'extérieur de $[${r1}\\,;${r2}]$ et ${a > 0 ? "négatif" : "positif"} entre les racines.\n\n$S = ${bonne}$`
    };
  };

  GEN["sd-somme-produit"] = function () {
    const [r1, r2] = racines2();
    const S = r1 + r2, P = r1 * r2;
    return {
      enonce: `Trouve les racines de $f(x) = ${poly([1, -S, P])}$ par calcul mental.`,
      mode: "ensemble", prefixe: "Racines :", attendu: [r1, r2],
      aides: ["Pour $x^2 + bx + c$ : la somme des racines vaut $-b$ et leur produit vaut $c$.", `On cherche deux nombres de somme $${S}$ et de produit $${P}$.`, P < 0 ? "Le produit est négatif : les deux racines sont de signes contraires." : "Le produit est positif : les deux racines ont le même signe."],
      solution: `$${r1} + ${par(r2)} = ${S}$ et $${r1} \\times ${par(r2)} = ${P}$, donc $f(x) = ${formeFact(1, r1, r2)}$.`
    };
  };

  GEN["sd-trouver-a"] = function () {
    const [r1, r2] = racines2();
    let x0; do { x0 = rand(-6, 6); } while (x0 === r1 || x0 === r2);
    const a = randNZ(-3, 3);
    const k = (x0 - r1) * (x0 - r2), y0 = a * k;
    return {
      enonce: `La fonction $f$ du second degré a pour racines $${r1}$ et $${r2}$, et sa courbe passe par le point $A(${x0}\\,;${y0})$. Quelle est la valeur de $a$ ?`,
      mode: "nombre", prefixe: "a =", attendu: a,
      aides: [`On écrit $f(x) = a${facteur(r1)}${facteur(r2)}$ avec $a$ inconnu.`, `$f(${x0}) = ${y0}$ donne $a \\times ${par(x0 - r1)} \\times ${par(x0 - r2)} = ${y0}$.`, `Soit $${k}a = ${y0}$.`],
      solution: `$a \\times ${par(x0 - r1)} \\times ${par(x0 - r2)} = ${y0} \\iff ${k}a = ${y0} \\iff a = ${a}$. Donc $f(x) = ${formeFact(a, r1, r2)}$.`
    };
  };

  GEN["sd-sommet"] = function () {
    const a = pick([1, 2, -1, -2]);
    let r1, r2; do { [r1, r2] = racines2(); } while ((r1 + r2) % 2);
    const al = (r1 + r2) / 2, m = a * (al - r1) * (al - r2);
    const q = Math.random() < 0.5;
    return {
      enonce: q ? `Quelle est l'abscisse du sommet de la parabole de $f(x) = ${formeFact(a, r1, r2)}$ ?` : `Quel est ${a > 0 ? "le minimum" : "le maximum"} de $f(x) = ${formeFact(a, r1, r2)}$ ?`,
      mode: "nombre", prefixe: q ? "α =" : (a > 0 ? "Minimum :" : "Maximum :"), attendu: q ? al : m,
      aides: ["L'axe de symétrie passe par le milieu des racines : $\\alpha = \\dfrac{x_1 + x_2}{2}$.", `$\\alpha = \\dfrac{${r1} + ${par(r2)}}{2} = ${al}$.`, q ? "C'est l'abscisse du sommet." : `L'extremum est $f(\\alpha) = f(${al})$.`],
      solution: `$\\alpha = \\dfrac{${r1} + ${par(r2)}}{2} = ${al}$ et $f(${al}) = ${m}$ : ${a > 0 ? "minimum" : "maximum"} car $a ${a > 0 ? ">" : "<"} 0$.`
    };
  };


  /* ---------- Première : second degré, forme canonique et discriminant ---------- */
  const coefA = (a) => (a === 1 ? "" : a === -1 ? "-" : `${a}`);
  const carre = (al) => (al === 0 ? "x^2" : `(x ${al > 0 ? "-" : "+"} ${Math.abs(al)})^2`);
  const canon = (a, al, be) => `${coefA(a)}${carre(al)}${be ? ` ${sg(be)}` : ""}`;
  const racineTxt = (n, d) => frac(n, d); // racine rationnelle n/d affichée en fraction

  GEN["sd-canonique-lire"] = function () {
    const a = pick([1, 2, 3, -1, -2, -3]), al = rand(-5, 5);
    let be = rand(-9, 9); if (be === al) be += 1;
    const f = canon(a, al, be), q = pick(["alpha", "beta", "nature"]);
    const aides = ["Forme canonique : $f(x) = a(x - \\alpha)^2 + \\beta$, le sommet est $S(\\alpha\\,;\\beta)$.", `Attention au signe : $${carre(al)}$ donne $\\alpha = ${al}$.`, `$a = ${a}$ est ${a > 0 ? "positif : la parabole est tournée vers le haut, $\\beta$ est un minimum" : "négatif : la parabole est tournée vers le bas, $\\beta$ est un maximum"}.`];
    const sol = `Sommet $S(${al}\\,;${be})$. Comme $a ${a > 0 ? "> 0" : "< 0"}$, $f$ admet un **${a > 0 ? "minimum" : "maximum"}** égal à $${be}$, atteint en $x = ${al}$.`;
    if (q === "nature") {
      const choix = [`Minimum $${be}$ atteint en $${al}$`, `Maximum $${be}$ atteint en $${al}$`, `Minimum $${al}$ atteint en $${be}$`, `Maximum $${al}$ atteint en $${be}$`];
      return { enonce: `On donne $f(x) = ${f}$. Que peut-on dire de l'extremum de $f$ ?`, mode: "choix", choix, attendu: a > 0 ? 0 : 1, aides, solution: sol };
    }
    return {
      enonce: q === "alpha" ? `On donne $f(x) = ${f}$. Quelle est l'abscisse $\\alpha$ du sommet de la parabole ?` : `On donne $f(x) = ${f}$. Quelle est la valeur de l'extremum de $f$ ?`,
      mode: "nombre", prefixe: q === "alpha" ? "α =" : "β =", attendu: q === "alpha" ? al : be,
      erreurs: q === "alpha" && al !== 0 ? [{ valeur: -al, message: `Attention au signe : dans $${carre(al)}$, on lit $\\alpha = ${al}$ (on cherche ce qui annule la parenthèse).` }] : [],
      aides, solution: sol
    };
  };

  GEN["sd-canonique-construire"] = function () {
    const a = pick([1, 1, 2, -1, 3, -2]), al = randNZ(-4, 4), be = rand(-9, 9);
    const b = -2 * a * al, c = a * al * al + be;
    const bonne = canon(a, al, be);
    const cand = [canon(a, -al, be), canon(a, al, c), canon(a, -al, c), a === 1 ? canon(1, al, -be) : canon(1, al, be), canon(a, al, be + 1)];
    const autres = [...new Set(cand)].filter((x) => x !== bonne).slice(0, 3);
    const choix = shuffle([bonne, ...autres]);
    return {
      enonce: `Quelle est la forme canonique de $f(x) = ${poly([a, b, c])}$ ?`,
      mode: "choix", choix: choix.map((x) => `$${x}$`), attendu: choix.indexOf(bonne),
      aides: ["$\\alpha = -\\dfrac{b}{2a}$, puis $\\beta = f(\\alpha)$.", `$\\alpha = -\\dfrac{${b}}{2 \\times ${par(a)}} = ${al}$.`, `$\\beta = f(${al}) = ${be}$. Vérifie en développant ta réponse.`],
      solution: `$\\alpha = -\\dfrac{${b}}{${2 * a}} = ${al}$ et $\\beta = f(${al}) = ${be}$, donc $f(x) = ${bonne}$.`
    };
  };

  GEN["sd-variations"] = function () {
    const a = pick([1, 2, -1, -3, 3, -2]), al = randNZ(-5, 5), be = rand(-8, 8);
    const dev = Math.random() < 0.5;
    const f = dev ? poly([a, -2 * a * al, a * al * al + be]) : canon(a, al, be);
    const v = (m, x) => m ? `Décroissante sur $]-\\infty\\,;${x}]$, puis croissante sur $[${x}\\,;+\\infty[$` : `Croissante sur $]-\\infty\\,;${x}]$, puis décroissante sur $[${x}\\,;+\\infty[$`;
    const choix = [v(true, al), v(false, al), v(true, -al), v(false, -al)];
    return {
      enonce: `Quelles sont les variations de $f(x) = ${f}$ sur $\\mathbb{R}$ ?`,
      mode: "choix", choix, attendu: a > 0 ? 0 : 1,
      aides: [dev ? "Calcule l'abscisse du sommet : $\\alpha = -\\dfrac{b}{2a}$." : "Lis l'abscisse du sommet $\\alpha$ dans la forme canonique.", `Ici $\\alpha = ${al}$.`, `$a = ${a}$ : ${a > 0 ? "parabole tournée vers le haut, la fonction descend puis remonte" : "parabole tournée vers le bas, la fonction monte puis redescend"}.`],
      solution: `$\\alpha = ${al}$ et $a ${a > 0 ? "> 0" : "< 0"}$ : ${choix[a > 0 ? 0 : 1].toLowerCase()}, avec un ${a > 0 ? "minimum" : "maximum"} égal à $${be}$.`
    };
  };

  GEN["sd-discriminant"] = function () {
    const a = randNZ(-4, 4), b = randNZ(-9, 9), c = randNZ(-9, 9);
    const D = b * b - 4 * a * c;
    return {
      enonce: `Calcule le discriminant de $${poly([a, b, c])}$.`,
      mode: "nombre", prefixe: "Δ =", attendu: D,
      erreurs: [{ valeur: b * b + 4 * a * c, message: "Attention au signe : $\\Delta = b^2 - 4ac$, et $a$ ou $c$ est négatif ici. Mets les négatifs entre parenthèses." }, { valeur: -b * b - 4 * a * c, message: `Un carré est positif : $${par(b)}^2 = ${b * b}$.` }].filter((e) => e.valeur !== D),
      aides: ["$\\Delta = b^2 - 4ac$.", `$a = ${a}$, $b = ${b}$, $c = ${c}$.`, `$\\Delta = ${par(b)}^2 - 4 \\times ${par(a)} \\times ${par(c)}$.`],
      solution: `$\\Delta = ${par(b)}^2 - 4 \\times ${par(a)} \\times ${par(c)} = ${b * b} ${sg(-4 * a * c)} = ${D}$`
    };
  };

  /* Trinôme aléatoire : deux racines entières, une racine double ou aucune racine */
  function trinome(type) {
    const a = pick([1, 1, 2, -1, -2, 3]);
    if (type === 2) { const [r1, r2] = racines2(); return { a, b: -a * (r1 + r2), c: a * r1 * r2, R: [r1, r2] }; }
    if (type === 1) { const r = rand(-5, 5); return { a, b: -2 * a * r, c: a * r * r, R: [r] }; }
    const al = rand(-4, 4), be = (a > 0 ? 1 : -1) * rand(1, 6);
    return { a, b: -2 * a * al, c: a * al * al + be, R: [], al };
  }

  GEN["sd-nb-racines"] = function () {
    const type = pick([0, 1, 2]), t = trinome(type), D = t.b * t.b - 4 * t.a * t.c;
    const choix = ["Aucune racine réelle", "Une seule racine (racine double)", "Deux racines distinctes"];
    return {
      enonce: `Combien de racines réelles possède $${poly([t.a, t.b, t.c])}$ ?`,
      mode: "choix", choix, attendu: type,
      aides: ["Calcule le discriminant $\\Delta = b^2 - 4ac$.", "$\\Delta > 0$ : deux racines ; $\\Delta = 0$ : une racine double ; $\\Delta < 0$ : aucune racine réelle.", `$\\Delta = ${par(t.b)}^2 - 4 \\times ${par(t.a)} \\times ${par(t.c)}$.`],
      solution: `$\\Delta = ${par(t.b)}^2 - 4 \\times ${par(t.a)} \\times ${par(t.c)} = ${D}$, ${D > 0 ? "strictement positif : deux racines distinctes" : D === 0 ? "nul : une racine double" : "strictement négatif : aucune racine réelle"}.`
    };
  };

  GEN["sd-resoudre"] = function () {
    const type = pick([2, 2, 2, 1, 0, "q"]);
    let a, b, c, R, Rtxt;
    if (type === "q") { // une racine entière et une racine fractionnaire
      a = pick([2, 3]); const r1 = rand(-4, 4); let k; do { k = randNZ(-7, 7); } while (k % a === 0);
      b = -(k + a * r1); c = k * r1; R = [r1, k / a]; Rtxt = [`${r1}`, racineTxt(k, a)];
    } else { const t = trinome(type); a = t.a; b = t.b; c = t.c; R = t.R; Rtxt = R.map(String); }
    const D = b * b - 4 * a * c, s = Math.round(Math.sqrt(Math.max(D, 0)));
    let sol = `$\\Delta = ${par(b)}^2 - 4 \\times ${par(a)} \\times ${par(c)} = ${D}$. `;
    if (D > 0) sol += `$x_1 = \\dfrac{${-b} - ${s}}{${2 * a}}$ et $x_2 = \\dfrac{${-b} + ${s}}{${2 * a}}$ : $S = \\{${Rtxt.join("\\,;")}\\}$.`;
    else if (D === 0) sol += `Racine double $x_0 = -\\dfrac{b}{2a} = ${R[0]}$ : $S = \\{${R[0]}\\}$.`;
    else sol += "$\\Delta < 0$ : aucune solution réelle, $S = \\varnothing$.";
    return {
      enonce: `Résous dans $\\mathbb{R}$ l'équation $${poly([a, b, c])} = 0$. Écris « aucun » s'il n'y a pas de solution.`,
      mode: "ensemble", prefixe: "Solutions :", attendu: R,
      aides: ["Avant tout, cherche une factorisation évidente ; sinon calcule $\\Delta = b^2 - 4ac$.", `$\\Delta = ${D}$.`, D > 0 ? "$x_{1,2} = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$. Une fraction s'écrit avec « / »." : D === 0 ? "$\\Delta = 0$ : une seule solution $x_0 = -\\dfrac{b}{2a}$." : "$\\Delta < 0$ : pas de solution réelle."],
      solution: sol
    };
  };

  GEN["sd-inequation-delta"] = function () {
    const type = pick([2, 2, 1, 0]), t = trinome(type);
    const op = pick([">", "<", "\\geqslant", "\\leqslant"]), strict = op === ">" || op === "<", positif = op === ">" || op === "\\geqslant";
    const signeA = t.a > 0 === positif; // on cherche le signe de a ?
    let choix, bonne, expl;
    if (type === 2) {
      const [r1, r2] = t.R;
      const dS = interv(r1, r2, false, false), dL = interv(r1, r2, true, true);
      const eS = `]-\\infty\\,;${r1}[ \\cup ]${r2}\\,;+\\infty[`, eL = `]-\\infty\\,;${r1}] \\cup [${r2}\\,;+\\infty[`;
      choix = [dS, dL, eS, eL]; bonne = signeA ? (strict ? eS : eL) : (strict ? dS : dL);
      expl = `Racines $${r1}$ et $${r2}$ ; le trinôme est du signe de $a$ à l'extérieur des racines.`;
    } else if (type === 1) {
      const r = t.R[0];
      choix = ["\\mathbb{R}", "\\varnothing", `\\{${r}\\}`, `\\mathbb{R} \\setminus \\{${r}\\}`];
      bonne = signeA ? (strict ? choix[3] : choix[0]) : (strict ? choix[1] : choix[2]);
      expl = `$\\Delta = 0$ : racine double $${r}$. Le trinôme est du signe de $a$ partout, et nul seulement en $${r}$.`;
    } else {
      choix = ["\\mathbb{R}", "\\varnothing", `]-\\infty\\,;${t.al}]`, `[${t.al}\\,;+\\infty[`];
      bonne = signeA ? choix[0] : choix[1];
      expl = "$\\Delta < 0$ : le trinôme ne s'annule jamais, il est strictement du signe de $a$ sur $\\mathbb{R}$.";
    }
    const mel = shuffle(choix);
    return {
      enonce: `Résous dans $\\mathbb{R}$ l'inéquation $${poly([t.a, t.b, t.c])} ${op} 0$.`,
      mode: "choix", choix: mel.map((x) => `$S = ${x}$`), attendu: mel.indexOf(bonne),
      aides: ["Calcule $\\Delta$ pour connaître les racines.", `$\\Delta = ${t.b * t.b - 4 * t.a * t.c}$ et $a = ${t.a}$.`, "Signe de $a$ à l'extérieur des racines (ou partout s'il n'y en a pas deux), signe contraire entre les racines."],
      solution: `${expl}\n\n$S = ${bonne}$`
    };
  };

  GEN["sd-intersection"] = function () {
    let r1, r2; if (Math.random() < 0.8) [r1, r2] = racines2(); else r1 = r2 = rand(-4, 4);
    const b = rand(-5, 5), c = rand(-6, 6);
    const m = b + r1 + r2, n = c - r1 * r2;
    const R = r1 === r2 ? [r1] : [r1, r2];
    return {
      enonce: `Trouve les abscisses des points d'intersection des courbes de $f(x) = ${poly([1, b, c])}$ et de $g(x) = ${poly([m, n])}$.`,
      mode: "ensemble", prefixe: "Abscisses :", attendu: R,
      aides: ["On résout $f(x) = g(x)$, c'est-à-dire $f(x) - g(x) = 0$.", `$f(x) - g(x) = ${poly([1, b - m, c - n])}$.`, r1 === r2 ? "Le discriminant est nul : une seule solution." : "Factorise ou calcule le discriminant."],
      solution: `$f(x) - g(x) = ${poly([1, b - m, c - n])} = ${r1 === r2 ? carre(r1) : facteur(r1) + facteur(r2)}$. ${r1 === r2 ? `Un seul point commun, d'abscisse $${r1}$ : la droite est tangente à la parabole.` : `Deux points communs, d'abscisses $${r1}$ et $${r2}$.`}`
    };
  };


  /* ---------- Terminale maths complémentaires : lois discrètes ---------- */
  const C = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return Math.round(r); };
  const binP = (n, p, k) => C(n, k) * p ** k * (1 - p) ** (n - k);
  const binF = (n, p, k) => { let s = 0; for (let i = 0; i <= k; i++) s += binP(n, p, i); return s; };
  const arr = (x, d) => +x.toFixed(d);
  const AIDE_ARR = "Arrondis au millième : par exemple $0{,}384$.";

  GEN["ld-uniforme"] = function () {
    const n = pick([4, 6, 8, 10, 12, 15, 20]);
    const t = pick(["esp", "sup", "inf", "pair"]);
    if (t === "esp") return {
      enonce: `$X$ suit la loi uniforme sur les entiers de $1$ à $${n}$. Calcule $E(X)$.`,
      mode: "nombre", prefixe: "E(X) =", attendu: (n + 1) / 2,
      aides: ["Pour la loi uniforme sur $\\{1\\,;\\dots\\,;n\\}$ : $E(X) = \\dfrac{n + 1}{2}$.", `$E(X) = \\dfrac{${n} + 1}{2}$.`, "L'espérance n'est pas forcément une valeur possible de $X$."],
      solution: `$E(X) = \\dfrac{${n} + 1}{2} = ${fr((n + 1) / 2)}$ : c'est la moyenne à long terme des résultats.`
    };
    const k = rand(2, n - 1);
    const fav = t === "sup" ? n - k : t === "inf" ? k - 1 : Math.floor(n / 2);
    const ev = t === "sup" ? `X > ${k}` : t === "inf" ? `X < ${k}` : "X \\text{ est pair}";
    return {
      enonce: `On choisit au hasard un ticket parmi $${n}$ tickets numérotés de $1$ à $${n}$, et $X$ est le numéro obtenu. Calcule $P(${ev})$.`,
      mode: "nombre", prefixe: `P =`, attendu: fav / n, tolerance: 0.0006,
      erreurs: t === "sup" ? [{ valeur: (n - k + 1) / n, message: `$X > ${k}$ est strict : $${k}$ n'est pas compté.` }] : t === "inf" ? [{ valeur: k / n, message: `$X < ${k}$ est strict : $${k}$ n'est pas compté.` }] : [],
      aides: ["Loi uniforme : chaque numéro a la probabilité $\\dfrac{1}{n}$.", "Compte les numéros favorables, puis divise par le nombre total de numéros.", `Il y a $${fav}$ numéros favorables. Tu peux répondre par une fraction, comme $3/8$.`],
      solution: `$${fav}$ numéros favorables sur $${n}$ : $P(${ev}) = ${frac(fav, n)}$.`
    };
  };

  GEN["ld-loi-esperance"] = function () {
    const xs = shuffle([-5, -2, -1, 0, 1, 2, 3, 5, 10]).slice(0, 3).sort((a, b) => a - b);
    let ps; do { const a = rand(1, 6), b = rand(1, 9 - a); ps = [a / 10, b / 10, (10 - a - b) / 10]; } while (ps[2] <= 0);
    const miss = rand(0, 2);
    const E = arr(xs.reduce((s, x, i) => s + x * ps[i], 0), 6);
    const tab = { var: "x_i", nom: "P(X = x_i)", x: xs, y: ps.map((p, i) => (i === miss ? "p" : fr(p))) };
    if (Math.random() < 0.5) return {
      enonce: "Voici la loi de probabilité d'une variable aléatoire $X$. Détermine $p$.",
      tableau: tab, mode: "nombre", prefixe: "p =", attendu: ps[miss], tolerance: 1e-6,
      aides: ["La somme des probabilités d'une loi vaut toujours $1$.", `$p = 1 - ${ps.filter((_, i) => i !== miss).map(fr).join(" - ")}$.`, "Une probabilité est comprise entre $0$ et $1$."],
      solution: `$p = 1 - ${ps.filter((_, i) => i !== miss).map(fr).join(" - ")} = ${fr(ps[miss])}$`
    };
    tab.y = ps.map(fr);
    return {
      enonce: "$X$ est le gain algébrique (en euros) à un jeu, de loi donnée ci-dessous. Calcule l'espérance $E(X)$.",
      tableau: tab, mode: "nombre", prefixe: "E(X) =", attendu: E, tolerance: 1e-6,
      aides: ["$E(X) = x_1 p_1 + x_2 p_2 + x_3 p_3$ : on multiplie chaque valeur par sa probabilité, puis on additionne.", `$E(X) = ${xs.map((x, i) => `${par(x)} \\times ${fr(ps[i])}`).join(" + ")}$.`, "Attention aux valeurs négatives."],
      solution: `$E(X) = ${xs.map((x, i) => `${par(x)} \\times ${fr(ps[i])}`).join(" + ")} = ${fr(E)}$. En moyenne, sur un grand nombre de parties, on ${E > 0 ? "gagne" : E < 0 ? "perd" : "ne gagne ni ne perd"}${E ? ` $${fr(Math.abs(E))}$ €` : ""} par partie.`
    };
  };

  GEN["ld-bernoulli"] = function () {
    const p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9]);
    const q = pick(["E", "V"]);
    return {
      enonce: `$X$ suit la loi de Bernoulli de paramètre $p = ${fr(p)}$. Calcule ${q === "E" ? "$E(X)$" : "la variance $V(X)$"}.`,
      mode: "nombre", prefixe: q === "E" ? "E(X) =" : "V(X) =", attendu: q === "E" ? p : arr(p * (1 - p), 6), tolerance: 1e-6,
      erreurs: q === "V" ? [{ valeur: p, message: "Ça, c'est l'espérance. La variance vaut $p(1 - p)$." }, { valeur: arr(Math.sqrt(p * (1 - p)), 6), message: "Ça, c'est l'écart type. La variance, c'est $p(1 - p)$, sans racine." }] : [{ valeur: arr(1 - p, 6), message: "$1 - p$ est la probabilité de l'échec. L'espérance vaut $p$." }],
      aides: ["$X$ vaut $1$ (succès) avec la probabilité $p$, et $0$ (échec) avec la probabilité $1 - p$.", "$E(X) = p$ et $V(X) = p(1 - p)$.", q === "E" ? `$E(X) = 1 \\times ${fr(p)} + 0 \\times ${fr(1 - p)}$.` : `$V(X) = ${fr(p)} \\times ${fr(1 - p)}$.`],
      solution: q === "E" ? `$E(X) = p = ${fr(p)}$` : `$V(X) = p(1 - p) = ${fr(p)} \\times ${fr(1 - p)} = ${fr(arr(p * (1 - p), 6))}$`
    };
  };

  GEN["ld-coef-binomial"] = function () {
    const n = rand(3, 8), k = rand(0, n);
    return {
      enonce: `Calcule le coefficient binomial $\\dbinom{${n}}{${k}}$ (sans calculatrice, avec le triangle de Pascal).`,
      mode: "nombre", prefixe: `(${n} ; ${k}) =`, attendu: C(n, k),
      aides: ["$\\dbinom{n}{k}$ compte les chemins à $k$ succès parmi $n$ essais. $\\dbinom{n}{0} = \\dbinom{n}{n} = 1$ et $\\dbinom{n}{1} = n$.", "Dans le triangle de Pascal, chaque nombre intérieur est la somme des deux nombres situés au-dessus.", `Symétrie : $\\dbinom{${n}}{${k}} = \\dbinom{${n}}{${n - k}}$. Ligne $${n}$ : $${Array.from({ length: n + 1 }, (_, i) => (i === k ? "?" : C(n, i))).join(" ; ")}$.`],
      solution: `Ligne $${n}$ du triangle de Pascal : $${Array.from({ length: n + 1 }, (_, i) => C(n, i)).join(" ; ")}$. Donc $\\dbinom{${n}}{${k}} = ${C(n, k)}$.`
    };
  };

  GEN["ld-binomiale-egal"] = function () {
    const n = rand(3, 10), p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]), k = rand(1, n - 1);
    const v = binP(n, p, k), oubli = p ** k * (1 - p) ** (n - k);
    if (v < 0.02 || Math.abs(oubli - v) < 0.002) return GEN["ld-binomiale-egal"]();
    return {
      enonce: `$X$ suit la loi binomiale $\\mathcal{B}(${n}\\,;${fr(p)})$. Calcule $P(X = ${k})$. ${AIDE_ARR}`,
      mode: "nombre", prefixe: `P(X = ${k}) ≈`, attendu: arr(v, 3), tolerance: 0.0011,
      erreurs: [{ valeur: arr(oubli, 3), message: `Tu as oublié le coefficient $\\dbinom{${n}}{${k}}$ qui compte les chemins à $${k}$ succès.` }],
      aides: ["$P(X = k) = \\dbinom{n}{k} p^k (1 - p)^{n - k}$.", `$\\dbinom{${n}}{${k}} = ${C(n, k)}$.`, `$P(X = ${k}) = ${C(n, k)} \\times ${fr(p)}^{${k}} \\times ${fr(1 - p)}^{${n - k}}$.`],
      solution: `$P(X = ${k}) = ${C(n, k)} \\times ${fr(p)}^{${k}} \\times ${fr(1 - p)}^{${n - k}} \\approx ${fr(arr(v, 4))}$`
    };
  };

  GEN["ld-binomiale-esperance"] = function () {
    const n = pick([10, 20, 25, 40, 50, 100, 200, 250]), p = pick([0.1, 0.12, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.8]);
    const q = pick(["E", "E", "V", "s"]);
    const E = arr(n * p, 6), V = arr(n * p * (1 - p), 6), s = Math.sqrt(n * p * (1 - p));
    return {
      enonce: `$X$ suit la loi binomiale $\\mathcal{B}(${n}\\,;${fr(p)})$. Calcule ${q === "E" ? "$E(X)$" : q === "V" ? "$V(X)$" : "l'écart type $\\sigma(X)$, arrondi au centième"}.`,
      mode: "nombre", prefixe: q === "E" ? "E(X) =" : q === "V" ? "V(X) =" : "σ(X) ≈", attendu: q === "E" ? E : q === "V" ? V : arr(s, 2), tolerance: q === "s" ? 0.006 : 1e-6,
      erreurs: q === "s" ? [{ valeur: arr(V, 2), message: "Ça, c'est la variance : l'écart type est sa racine carrée." }] : q === "V" ? [{ valeur: arr(s, 2), message: "Ça, c'est l'écart type : la variance est $np(1 - p)$, sans racine." }] : [],
      aides: ["$E(X) = np$, $V(X) = np(1 - p)$ et $\\sigma(X) = \\sqrt{V(X)}$.", `$n = ${n}$ et $p = ${fr(p)}$.`, q === "E" ? `$E(X) = ${n} \\times ${fr(p)}$.` : `$V(X) = ${n} \\times ${fr(p)} \\times ${fr(1 - p)} = ${fr(V)}$.`],
      solution: q === "E" ? `$E(X) = ${n} \\times ${fr(p)} = ${fr(E)}$ : en moyenne, $${fr(E)}$ succès sur $${n}$ essais.` : `$V(X) = ${n} \\times ${fr(p)} \\times ${fr(1 - p)} = ${fr(V)}$${q === "s" ? ` et $\\sigma(X) = \\sqrt{${fr(V)}} \\approx ${fr(arr(s, 2))}$` : ""}.`
    };
  };

  GEN["ld-traduire"] = function () {
    const k = rand(2, 8);
    const T = [
      [`P(X \\geqslant ${k})`, `1 - P(X \\leqslant ${k - 1})`, [`1 - P(X \\leqslant ${k})`, `P(X \\leqslant ${k})`, `1 - P(X \\geqslant ${k - 1})`], `« Au moins $${k}$ » garde $${k}$, $${k + 1}$… Le contraire est $X \\leqslant ${k - 1}$.`],
      [`P(X > ${k})`, `1 - P(X \\leqslant ${k})`, [`1 - P(X \\leqslant ${k - 1})`, `P(X \\leqslant ${k})`, `P(X \\leqslant ${k + 1})`], `$X > ${k}$ garde $${k + 1}$, $${k + 2}$… Le contraire est $X \\leqslant ${k}$.`],
      [`P(X < ${k})`, `P(X \\leqslant ${k - 1})`, [`P(X \\leqslant ${k})`, `1 - P(X \\leqslant ${k})`, `1 - P(X \\leqslant ${k - 1})`], `Pour une variable entière, $X < ${k}$ équivaut à $X \\leqslant ${k - 1}$.`],
      [`P(${k} \\leqslant X \\leqslant ${k + 4})`, `P(X \\leqslant ${k + 4}) - P(X \\leqslant ${k - 1})`, [`P(X \\leqslant ${k + 4}) - P(X \\leqslant ${k})`, `P(X \\leqslant ${k + 3}) - P(X \\leqslant ${k})`, `P(X \\leqslant ${k + 4}) + P(X \\leqslant ${k - 1})`], `On garde $${k}$ à $${k + 4}$ : du cumul jusqu'à $${k + 4}$, on retire seulement les valeurs $0$ à $${k - 1}$.`],
      [`P(${k} < X < ${k + 5})`, `P(X \\leqslant ${k + 4}) - P(X \\leqslant ${k})`, [`P(X \\leqslant ${k + 5}) - P(X \\leqslant ${k})`, `P(X \\leqslant ${k + 4}) - P(X \\leqslant ${k - 1})`, `P(X \\leqslant ${k + 5}) - P(X \\leqslant ${k - 1})`], `On garde les entiers de $${k + 1}$ à $${k + 4}$.`]
    ];
    const [ev, bonne, fausses, expl] = pick(T);
    const choix = shuffle([bonne, ...fausses]);
    return {
      enonce: `$X$ suit une loi binomiale. Quelle écriture permet de calculer $${ev}$ avec la fonction de cumul $P(X \\leqslant k)$ de la calculatrice ?`,
      mode: "choix", choix: choix.map((x) => `$${x}$`), attendu: choix.indexOf(bonne),
      aides: ["Écris d'abord la liste des entiers que l'on **garde**.", "La calculatrice donne $P(X \\leqslant k)$ : toutes les valeurs de $0$ à $k$ incluses.", "Pour « au moins », passe par l'événement contraire."],
      solution: `${expl}\n\n$${ev} = ${bonne}$`
    };
  };

  GEN["ld-cumul"] = function () {
    const n = pick([10, 12, 15, 20]), p = pick([0.2, 0.25, 0.3, 0.4]);
    const a = Math.max(1, Math.round(n * p) - 2);
    const ks = [a - 1, a, a + 1, a + 2, a + 3, a + 4];
    const F = ks.map((k) => arr(binF(n, p, k), 4));
    const t = pick(["sup", "entre", "seuil"]);
    const tab = { var: "k", nom: "P(X \\leqslant k)", x: ks, y: F.map(fr) };
    if (t === "sup") { const k = rand(a, a + 3), i = ks.indexOf(k - 1); return {
      enonce: `$X$ suit la loi $\\mathcal{B}(${n}\\,;${fr(p)})$. À l'aide du tableau des cumuls, calcule $P(X \\geqslant ${k})$.`, tableau: tab,
      mode: "nombre", prefixe: "P ≈", attendu: arr(1 - F[i], 4), tolerance: 0.00011,
      erreurs: [{ valeur: arr(1 - F[i + 1], 4), message: `$X \\geqslant ${k}$ contient $${k}$ : le contraire est $X \\leqslant ${k - 1}$, pas $X \\leqslant ${k}$.` }],
      aides: [`« Au moins $${k}$ » : le contraire est $X \\leqslant ${k - 1}$.`, `$P(X \\geqslant ${k}) = 1 - P(X \\leqslant ${k - 1})$.`, `Lis $P(X \\leqslant ${k - 1}) = ${fr(F[i])}$ dans le tableau.`],
      solution: `$P(X \\geqslant ${k}) = 1 - P(X \\leqslant ${k - 1}) \\approx 1 - ${fr(F[i])} = ${fr(arr(1 - F[i], 4))}$` }; }
    if (t === "entre") { const lo = rand(a, a + 1), hi = lo + rand(2, 3), i = ks.indexOf(lo - 1), j = ks.indexOf(hi); return {
      enonce: `$X$ suit la loi $\\mathcal{B}(${n}\\,;${fr(p)})$. À l'aide du tableau des cumuls, calcule $P(${lo} \\leqslant X \\leqslant ${hi})$.`, tableau: tab,
      mode: "nombre", prefixe: "P ≈", attendu: arr(F[j] - F[i], 4), tolerance: 0.00011,
      erreurs: [{ valeur: arr(F[j] - F[i + 1], 4), message: `Tu as retiré $${lo}$, qui fait pourtant partie de l'intervalle : on retire seulement le cumul jusqu'à $${lo - 1}$.` }],
      aides: [`On garde les entiers de $${lo}$ à $${hi}$.`, `$P(${lo} \\leqslant X \\leqslant ${hi}) = P(X \\leqslant ${hi}) - P(X \\leqslant ${lo - 1})$.`, `$= ${fr(F[j])} - ${fr(F[i])}$.`],
      solution: `$P(X \\leqslant ${hi}) - P(X \\leqslant ${lo - 1}) \\approx ${fr(F[j])} - ${fr(F[i])} = ${fr(arr(F[j] - F[i], 4))}$` }; }
    const seuil = pick([0.9, 0.95, 0.99]);
    let kk = 0; while (binF(n, p, kk) < seuil) kk++;
    const ks2 = [kk - 3, kk - 2, kk - 1, kk, kk + 1, kk + 2].filter((k) => k >= 0);
    const tab2 = { var: "k", nom: "P(X \\leqslant k)", x: ks2, y: ks2.map((k) => fr(arr(binF(n, p, k), 4))) };
    return {
      enonce: `$X$ suit la loi $\\mathcal{B}(${n}\\,;${fr(p)})$. Quel est le plus petit entier $b$ tel que $P(X \\leqslant b) \\geqslant ${fr(seuil)}$ ?`, tableau: tab2,
      mode: "nombre", prefixe: "b =", attendu: kk,
      aides: ["Le cumul augmente avec $k$ : cherche la première valeur qui atteint le seuil.", `Compare chaque cumul à $${fr(seuil)}$.`, "Pour justifier, cite les deux cumuls qui encadrent le seuil."],
      solution: `$P(X \\leqslant ${kk - 1}) \\approx ${fr(arr(binF(n, p, kk - 1), 4))} < ${fr(seuil)}$ et $P(X \\leqslant ${kk}) \\approx ${fr(arr(binF(n, p, kk), 4))} \\geqslant ${fr(seuil)}$ : $b = ${kk}$, et $[0\\,;${kk}]$ est un intervalle de fluctuation au seuil de $${fr(seuil * 100)}\\,\\%$.`
    };
  };

  GEN["ld-geometrique"] = function () {
    const p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5]), k = rand(2, 6);
    const t = pick(["egal", "sup", "inf", "esp"]);
    if (t === "esp") return {
      enonce: `$T$ suit la loi géométrique de paramètre $p = ${fr(p)}$. Calcule $E(T)$.`,
      mode: "nombre", prefixe: "E(T) =", attendu: arr(1 / p, 6), tolerance: 1e-6,
      aides: ["Pour une loi géométrique, $E(T) = \\dfrac{1}{p}$.", `$E(T) = \\dfrac{1}{${fr(p)}}$.`, "C'est le rang moyen du premier succès."],
      solution: `$E(T) = \\dfrac{1}{${fr(p)}} = ${fr(arr(1 / p, 6))}$ : en moyenne, le premier succès arrive au rang $${fr(arr(1 / p, 6))}$.`
    };
    const v = t === "egal" ? (1 - p) ** (k - 1) * p : t === "sup" ? (1 - p) ** k : 1 - (1 - p) ** k;
    const ev = t === "egal" ? `T = ${k}` : t === "sup" ? `T > ${k}` : `T \\leqslant ${k}`;
    const form = t === "egal" ? `${fr(1 - p)}^{${k - 1}} \\times ${fr(p)}` : t === "sup" ? `${fr(1 - p)}^{${k}}` : `1 - ${fr(1 - p)}^{${k}}`;
    return {
      enonce: `À chaque essai, indépendamment, on réussit avec la probabilité $${fr(p)}$. $T$ est le rang du premier succès. Calcule $P(${ev})$. ${AIDE_ARR}`,
      mode: "nombre", prefixe: `P(${ev.replace("\\leqslant", "≤")}) ≈`, attendu: arr(v, 3), tolerance: 0.0011,
      erreurs: t === "egal" ? [{ valeur: arr((1 - p) ** k * p, 3), message: `Premier succès au rang $${k}$ : il y a $${k - 1}$ échecs avant, pas $${k}$.` }] : t === "sup" ? [{ valeur: arr((1 - p) ** (k - 1) * p, 3), message: `$T > ${k}$ signifie « pas de succès pendant les $${k}$ premiers essais » : $${k}$ échecs, sans succès imposé ensuite.` }] : [{ valeur: arr((1 - p) ** k, 3), message: "Ça, c'est $P(T > k)$. On veut l'événement contraire." }],
      aides: [t === "egal" ? `Premier succès au rang $${k}$ : $${k - 1}$ échecs, puis un succès.` : t === "sup" ? `$T > ${k}$ : les $${k}$ premiers essais sont des échecs.` : `Le contraire de $T \\leqslant ${k}$ est $T > ${k}$ : $${k}$ échecs de suite.`, "$P(T = k) = (1 - p)^{k - 1} p$ et $P(T > k) = (1 - p)^k$.", `$P(${ev}) = ${form}$.`],
      solution: `$P(${ev}) = ${form} \\approx ${fr(arr(v, 4))}$`
    };
  };

  GEN["ld-sans-memoire"] = function () {
    const p = pick([0.1, 0.2, 0.25, 0.3, 0.4]), s = rand(2, 10), t = rand(2, 5);
    const q = pick(["prochain", "encore"]);
    if (q === "prochain") return {
      enonce: `$T$ suit la loi géométrique de paramètre $${fr(p)}$. Les $${s}$ premiers essais ont échoué. Quelle est la probabilité que le prochain essai réussisse ?`,
      mode: "nombre", prefixe: "P =", attendu: p, tolerance: 1e-6,
      aides: ["Les essais sont indépendants : les échecs passés ne changent rien.", "La loi géométrique est **sans mémoire**.", "La probabilité de succès à chaque essai est toujours $p$."],
      solution: `Les essais sont indépendants : la probabilité reste $${fr(p)}$. Elle n'augmente pas pour « compenser » les échecs.`
    };
    const v = (1 - p) ** t;
    return {
      enonce: `$T$ suit la loi géométrique de paramètre $${fr(p)}$. Sachant que $T > ${s}$, calcule $P_{T > ${s}}(T > ${s + t})$. ${AIDE_ARR}`,
      mode: "nombre", prefixe: "P ≈", attendu: arr(v, 3), tolerance: 0.0011,
      erreurs: [{ valeur: arr((1 - p) ** (s + t), 3), message: `Il ne reste que $${t}$ essais à considérer : la loi est sans mémoire.` }],
      aides: ["Absence de mémoire : $P_{T > s}(T > s + t) = P(T > t)$.", `Ici, $P(T > ${t}) = (1 - p)^{${t}}$.`, `$= ${fr(1 - p)}^{${t}}$.`],
      solution: `$P_{T > ${s}}(T > ${s + t}) = P(T > ${t}) = ${fr(1 - p)}^{${t}} \\approx ${fr(arr(v, 4))}$`
    };
  };

  GEN["ld-choisir-loi"] = function () {
    const S = [
      ["On tire au hasard un numéro parmi $1$, $2$, …, $20$, tous équiprobables. $X$ est le numéro obtenu.", 0],
      ["On choisit au hasard un jour du mois d'avril (du $1$ au $30$). $X$ est le numéro du jour.", 0],
      ["On lance une fois une pièce. $X$ vaut $1$ si on obtient PILE, $0$ sinon.", 1],
      ["Un élève répond au hasard à une question à $4$ choix. $X$ vaut $1$ si sa réponse est juste, $0$ sinon.", 1],
      ["On lance $10$ fois un dé équilibré. $X$ est le nombre de six obtenus.", 2],
      ["$250$ personnes, indépendamment, demandent un repas végétarien avec la probabilité $0{,}12$. $X$ compte les demandes.", 2],
      ["Une joueuse tire $5$ fois au panier, indépendamment, avec $60\\,\\%$ de réussite. $X$ est son nombre de paniers.", 2],
      ["On lance un dé jusqu'à obtenir un six. $X$ est le nombre de lancers effectués.", 3],
      ["Léa tente des carreaux à la pétanque jusqu'au premier réussi ($20\\,\\%$ de réussite à chaque essai). $X$ est le rang du premier carreau réussi.", 3],
      ["Un pêcheur de N'Gouja lance sa ligne jusqu'à la première prise, avec la même chance à chaque lancer. $X$ est le numéro du lancer gagnant.", 3],
      ["On tire $3$ boules **sans remise** dans une urne de $2$ rouges et $3$ bleues. $X$ compte les rouges.", 4]
    ];
    const [txt, rep] = pick(S);
    const choix = ["Loi uniforme", "Loi de Bernoulli", "Loi binomiale", "Loi géométrique", "Aucune de ces lois"];
    return {
      enonce: `${txt} Quelle loi suit $X$ ?`,
      mode: "choix", choix, attendu: rep,
      aides: ["Demande-toi ce que **compte** la variable : une valeur, un codage $0$/$1$, un nombre de succès, ou un rang ?", "Binomiale : nombre d'essais **fixé**. Géométrique : on s'arrête au **premier succès**.", "Les essais doivent être indépendants, avec la même probabilité : un tirage sans remise ne convient pas."],
      solution: ["Les valeurs sont des entiers équiprobables : loi **uniforme**.", "Un seul essai codé $1$ (succès) ou $0$ (échec) : loi de **Bernoulli**.", "On compte les succès dans un nombre fixé d'essais indépendants de même probabilité : loi **binomiale**.", "On répète jusqu'au premier succès et $X$ est son rang : loi **géométrique**.", "Sans remise, la composition de l'urne change : les tirages ne sont pas indépendants, ce n'est pas une loi binomiale."][rep]
    };
  };

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse (à la tolérance près) */
  Object.keys(GEN).filter((k) => k.startsWith("ld-")).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => { const q = g(i); if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9)); return q; };
  });

  window.PM_EXO = { GEN, FIGURES, graph, shuffle };
})();
