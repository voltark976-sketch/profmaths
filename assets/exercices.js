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
    const W = 320, pad = 14, padL = o.padL || pad, padB = o.padB || pad; // marges de gauche et du bas, pour les nombres des axes
    const xstep = o.xstep || 1, ystep = o.ystep || 1;
    const spanX = o.xmax - o.xmin, spanY = o.ymax - o.ymin;
    const ux = (W - padL - pad) / spanX;
    let H = o.h || Math.round(ux * spanY * (xstep / ystep) + pad + padB);
    H = Math.max(200, Math.min(400, H));
    const uy = (H - pad - padB) / spanY;
    const X = (x) => +(padL + (x - o.xmin) * ux).toFixed(1);
    const Y = (y) => +(pad + (o.ymax - y) * uy).toFixed(1);
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria || "Courbe dans un repère"}">`;
    // quadrillage
    s += `<g class="g-grid">`;
    for (let x = Math.ceil(o.xmin / xstep) * xstep; x <= o.xmax; x += xstep) s += `<line x1="${X(x)}" y1="${pad}" x2="${X(x)}" y2="${H - padB}"/>`;
    for (let y = Math.ceil(o.ymin / ystep) * ystep; y <= o.ymax; y += ystep) s += `<line x1="${padL}" y1="${Y(y)}" x2="${W - pad}" y2="${Y(y)}"/>`;
    s += `</g>`;
    // axes
    const x0 = Math.min(Math.max(0, o.xmin), o.xmax), y0 = Math.min(Math.max(0, o.ymin), o.ymax);
    // histogramme : rectangles de a à b, de hauteur h (sous les axes et les étiquettes)
    (o.rects || []).forEach((r) => { s += `<rect class="g-rect" x="${X(r.a)}" y="${Y(r.h)}" width="${+(X(r.b) - X(r.a)).toFixed(1)}" height="${+(Y(y0) - Y(r.h)).toFixed(1)}"/>`; });
    // si l'origine n'est pas 0 sur un axe, l'autre axe s'arrête à l'origine
    const axG = y0 !== 0 && x0 > o.xmin ? X(x0) : padL, axB = x0 !== 0 && y0 > o.ymin ? Y(y0) : H - padB;
    s += `<g class="g-axis"><line x1="${axG}" y1="${Y(y0)}" x2="${W - pad}" y2="${Y(y0)}"/><line x1="${X(x0)}" y1="${pad}" x2="${X(x0)}" y2="${axB}"/>`;
    s += `<path d="M${W - pad} ${Y(y0)} l-6 -3.5 v7z"/><path d="M${X(x0)} ${pad} l-3.5 6 h7z"/></g>`;
    // graduations (xetiq / yetiq : un nombre écrit toutes les k unités, par défaut à chaque graduation)
    const xetiq = o.xetiq || xstep, yetiq = o.yetiq || ystep;
    const gy = X(x0) - ((o.bars || []).some((b) => b.x === x0) ? 8 : 4); // nombres de l'axe vertical, décalés si un bâton est sur l'axe
    s += `<g class="g-tick">`;
    for (let x = Math.ceil(o.xmin / xetiq) * xetiq; x <= o.xmax - xstep / 2; x += xetiq) {
      if (x === 0) continue;
      s += `<text x="${X(x)}" y="${Y(y0) + 13}" text-anchor="middle">${String(+x.toFixed(6)).replace("-", "−").replace(".", ",")}</text>`;
    }
    for (let y = Math.ceil(o.ymin / yetiq) * yetiq; y <= o.ymax - ystep / 2; y += yetiq) {
      if (y === 0) continue;
      s += `<text x="${gy}" y="${Y(y) + 4}" text-anchor="end">${String(+y.toFixed(6)).replace("-", "−").replace(".", ",")}</text>`;
    }
    // le 0 : au coin si l'origine est (0 ; 0), sinon sur l'axe où il se trouve
    if (x0 === 0 && y0 === 0) s += `<text x="${X(x0) - 4}" y="${Y(y0) + 13}" text-anchor="end">0</text>`;
    else if (x0 === 0) s += `<text x="${X(0)}" y="${Y(y0) + 13}" text-anchor="middle">0</text>`;
    else if (y0 === 0) s += `<text x="${gy}" y="${Y(0) + 4}" text-anchor="end">0</text>`;
    s += `</g>`;
    if (o.xlabel) s += `<text class="g-label" x="${W - pad}" y="${Y(y0) - 6}" text-anchor="end">${o.xlabel}</text>`;
    if (o.ylabel) s += `<text class="g-label" x="${X(x0) + 6}" y="${pad + 8}">${o.ylabel}</text>`;
    // droites horizontales
    (o.hlines || []).forEach((h) => {
      s += `<line class="g-hline" x1="${padL}" y1="${Y(h.y)}" x2="${W - pad}" y2="${Y(h.y)}"/>`;
      if (h.label) s += `<text class="g-hlabel" x="${W - pad - 2}" y="${Y(h.y) - 5}" text-anchor="end">${h.label}</text>`;
    });
    // diagramme en bâtons
    (o.bars || []).forEach((b) => { s += `<line class="g-bar" x1="${X(b.x)}" y1="${Y(y0)}" x2="${X(b.x)}" y2="${Y(b.y)}"/>`; });
    (o.marques || []).forEach((m) => { s += `<text class="g-label" x="${X(m.x)}" y="${Y(m.y)}" text-anchor="middle">${m.texte}</text>`; });
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


  /* Deux courbes (deux droites, ou une parabole et une droite) qui se coupent en des points à coordonnées entières.
     interieur : les points d'intersection sont strictement à l'intérieur de [L ; R] (utile pour les inéquations). */
  function deuxCourbes(i, interieur) {
    let f, g, L, R, sol, essais = 0;
    const deuxDroites = Math.random() < (i < 2 ? 0.6 : 0.2);
    for (;;) {
      essais++;
      if (deuxDroites) {
        // Deux droites sécantes en un point à coordonnées entières
        const x0 = rand(-2, 2), y0 = rand(-2, 2), m1 = randNZ(-2, 2);
        let m2; do { m2 = rand(-2, 2); } while (m2 === m1);
        f = (x) => m1 * (x - x0) + y0; g = (x) => m2 * (x - x0) + y0;
        L = x0 - rand(2, 3); R = x0 + rand(2, 3); sol = [x0];
      } else {
        // Une parabole et une droite qui la coupe en deux points (parfois un seul sur l'intervalle)
        const P = parabole(); f = P.f; L = P.h - 3; R = P.h + 3;
        const unSeul = i === 4 && Math.random() < 0.5;
        const m0 = interieur ? 1 : 0;
        let u = rand(L + m0, R - m0), v;
        do { v = unSeul ? pick([L - 1, L - 2, R + 1, R + 2]) : rand(L + m0, R - m0); } while (v === u);
        const m = P.a * (u + v - 2 * P.h), fu = f(u);
        g = (x) => fu + m * (x - u);
        sol = unSeul ? [u] : [Math.min(u, v), Math.max(u, v)];
      }
      // La droite doit rester lisible dans le repère
      const ys = [L, R].map(g).concat([L, R, (L + R) / 2].map(f));
      if (Math.max(...ys) - Math.min(...ys) <= 13 || essais > 60) break;
    }
    const xs = Array.from({ length: (R - L) * 4 + 1 }, (_, k) => L + k / 4);
    const vals = xs.map(f).concat(xs.map(g), [0]);
    const opts = (extra) => Object.assign({
      xmin: Math.min(L - 0.6, -0.6), xmax: Math.max(R + 0.6, 0.6),
      ymin: Math.min(...vals) - 0.6, ymax: Math.max(...vals) + 0.6,
      curves: [
        { f, a: L, b: R, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: R, dx: -2, dy: g(R) > f(R) ? 18 : -8 },
        { f: g, a: L, b: R, label: "C<tspan class=\"sub\" dy=\"3\">g</tspan>", lx: R, dx: -2, dy: g(R) > f(R) ? -8 : 18 }
      ],
      aria: "Courbes de deux fonctions f et g dans un repère quadrillé"
    }, extra || {});
    return { f, g, L, R, sol, opts };
  }

  /* Résoudre graphiquement f(x) = g(x) : abscisses des points d'intersection de deux courbes */
  GEN["graph-f-egal-g"] = function (i) {
    const { f, L, R, sol, opts } = deuxCourbes(i, false);
    const pts = sol.map((x) => `$(${x}\\,;${f(x)})$`);
    return {
      enonce: `Voici les courbes de deux fonctions $f$ et $g$ définies sur $[${L}\\,;${R}]$. Résous graphiquement l'équation $f(x) = g(x)$.`,
      figure: graph(opts()),
      mode: "ensemble", prefixe: "Solution(s) :", attendu: sol,
      aides: [
        "Les solutions de $f(x) = g(x)$ sont les **abscisses** des points où les deux courbes se coupent.",
        `Sur $[${L}\\,;${R}]$, les courbes se coupent en ${sol.length === 1 ? "un seul point" : "deux points"}.`,
        "Lis l'abscisse de chaque point d'intersection sur l'axe horizontal (pas son ordonnée !). Sépare les valeurs par « ; »."
      ],
      solution: `Les courbes $\\mathcal{C}_f$ et $\\mathcal{C}_g$ se coupent ${sol.length === 1 ? `en un seul point : ${pts[0]}` : `en deux points : ${pts[0]} et ${pts[1]}`}.\n\nOn garde les abscisses : $S = \\{${sol.join("\\,;")}\\}$.`,
      figureSolution: graph(opts({ points: sol.map((x) => ({ x, y: f(x) })) }))
    };
  };

  /* Inéquations f(x) > g(x), f(x) ⩾ g(x), f(x) < g(x), f(x) ⩽ g(x) */
  const OPS = [">", "\\geqslant", "<", "\\leqslant"];
  const OPS_TXT = { ">": "strictement au-dessus de", "\\geqslant": "au-dessus de (ou sur)", "<": "strictement en dessous de", "\\leqslant": "en dessous de (ou sur)" };
  const OPS_INV = { ">": "<", "<": ">", "\\geqslant": "\\leqslant", "\\leqslant": "\\geqslant" };
  // Ensemble des x de [L ; R] tels que f(x) op g(x), quand les courbes se croisent aux abscisses sol (intérieures à [L ; R])
  function ensembleInegalite(f, g, L, R, sol, op) {
    const p = [L, ...sol, R], large = op === "\\geqslant" || op === "\\leqslant", dessus = op === ">" || op === "\\geqslant";
    const morceaux = [];
    for (let k = 0; k + 1 < p.length; k++) {
      const m = (p[k] + p[k + 1]) / 2;
      if ((f(m) > g(m)) === dessus) morceaux.push(interv(p[k], p[k + 1], k === 0 || large, k + 2 === p.length || large));
    }
    return morceaux.join(" \\cup ");
  }

  GEN["graph-f-inf-g"] = function (i) {
    const { f, g, L, R, sol, opts } = deuxCourbes(i, true);
    const op = pick(OPS), large = op === "\\geqslant" || op === "\\leqslant";
    const ens = OPS.map((o) => ensembleInegalite(f, g, L, R, sol, o));
    const bonne = ens[OPS.indexOf(op)], mel = shuffle(ens);
    const xs = sol.map((x) => `$${x}$`).join(" et ");
    return {
      enonce: `Voici les courbes de deux fonctions $f$ et $g$ définies sur $[${L}\\,;${R}]$. Résous graphiquement l'inéquation $f(x) ${op} g(x)$.`,
      figure: graph(opts()),
      mode: "choix", choix: mel.map((e) => `$S = ${e}$`), attendu: mel.indexOf(bonne),
      aides: [
        `$f(x) ${op} g(x)$ : on cherche les abscisses des points où $\\mathcal{C}_f$ est ${OPS_TXT[op]} $\\mathcal{C}_g$.`,
        `Les courbes se coupent ${sol.length === 1 ? "en $x = " + sol[0] + "$" : "en $x = " + sol[0] + "$ et $x = " + sol[1] + "$"}. De part et d'autre, regarde quelle courbe est au-dessus.`,
        large ? "Inégalité large : les abscisses des points d'intersection sont **incluses**." : "Inégalité stricte : les abscisses des points d'intersection sont **exclues**. Les bornes de l'intervalle de définition restent incluses si elles conviennent."
      ],
      solution: `Les courbes se coupent pour $x = ${sol.join("$ et $x = ")}$. On lit les abscisses des points où $\\mathcal{C}_f$ est ${OPS_TXT[op]} $\\mathcal{C}_g$, ${large ? "en incluant" : "en excluant"} ${sol.length === 1 ? "l'abscisse " + xs : "les abscisses " + xs} des points d'intersection.\n\n$S = ${bonne}$`,
      figureSolution: graph(opts({ points: sol.map((x) => ({ x, y: f(x) })) }))
    };
  };

  /* Résoudre f(x) = g(x) par le calcul (niveau Seconde : premier degré ou produit nul) */
  GEN["calcul-f-egal-g"] = function (i) {
    const type = i < 2 ? 0 : i < 4 ? pick([0, 1]) : pick([1, 2]);
    if (type === 0) {
      // ax + b = cx + d
      const a = randNZ(-5, 5); let c; do { c = randNZ(-5, 5); } while (c === a);
      const x0 = rand(-5, 5), b = randNZ(-9, 9), d = (a - c) * x0 + b, A = a - c, B = d - b;
      return {
        enonce: `Soit $f(x) = ${poly([a, b])}$ et $g(x) = ${poly([c, d])}$. Résous l'équation $f(x) = g(x)$.`,
        mode: "ensemble", prefixe: "Solution(s) :", attendu: [x0],
        aides: [
          `Écris l'équation : $${poly([a, b])} = ${poly([c, d])}$.`,
          `Regroupe les $x$ à gauche et les nombres à droite : $${poly([a, 0])} ${c > 0 ? "-" : "+"} ${poly([Math.abs(c), 0])} = ${d} ${b > 0 ? "-" : "+"} ${Math.abs(b)}$, soit $${poly([A, 0])} = ${B}$.`,
          `Divise les deux membres par $${A}$.`
        ],
        solution: `$${poly([a, b])} = ${poly([c, d])} \\iff ${poly([A, 0])} = ${B} \\iff x = ${x0}$.\n\n$S = \\{${x0}\\}$. Vérification : $f(${x0}) = g(${x0}) = ${a * x0 + b}$.`
      };
    }
    if (type === 1) {
      // (x + p)² = x² + q : les x² s'éliminent
      const p = randNZ(-4, 4), x0 = rand(-4, 4), q = p * p + 2 * p * x0;
      const fx = `(x ${sg(p)})^2`, gx = poly([1, 0, q]);
      return {
        enonce: `Soit $f(x) = ${fx}$ et $g(x) = ${gx}$. Résous l'équation $f(x) = g(x)$.`,
        mode: "ensemble", prefixe: "Solution(s) :", attendu: [x0],
        aides: [
          `Développe $f(x)$ avec une identité remarquable : $${fx} = ${poly([1, 2 * p, p * p])}$.`,
          `L'équation devient $${poly([1, 2 * p, p * p])} = ${gx}$ : les $x^2$ s'éliminent.`,
          `Il reste $${poly([2 * p, 0])} = ${q - p * p}$.`
        ],
        solution: `$${fx} = ${gx} \\iff ${poly([1, 2 * p, p * p])} = ${gx} \\iff ${poly([2 * p, 0])} = ${q - p * p} \\iff x = ${x0}$.\n\n$S = \\{${x0}\\}$`
      };
    }
    // x² + bx + c = mx + c : on se ramène à x(x - r) = 0
    const b = rand(-5, 5), c = randNZ(-6, 6), r = randNZ(-6, 6), m = b + r;
    const sol = [0, r].sort((u, v) => u - v);
    return {
      enonce: `Soit $f(x) = ${poly([1, b, c])}$ et $g(x) = ${poly([m, c])}$. Résous l'équation $f(x) = g(x)$.`,
      mode: "ensemble", prefixe: "Solution(s) :", attendu: sol,
      aides: [
        "Passe tout du même côté pour obtenir une équation de la forme $\\ldots = 0$.",
        `$f(x) - g(x) = ${poly([1, -r, 0])}$. Factorise par $x$.`,
        `$x(x ${sg(-r)}) = 0$ : un produit est nul si et seulement si l'un de ses facteurs est nul.`
      ],
      solution: `$f(x) = g(x) \\iff ${poly([1, -r, 0])} = 0 \\iff x(x ${sg(-r)}) = 0 \\iff x = 0$ ou $x = ${r}$.\n\n$S = \\{${sol.join("\\,;")}\\}$`
    };
  };

  /* Résoudre f(x) > g(x), f(x) ⩽ g(x)… par le calcul : inéquation du premier degré */
  GEN["calcul-f-inf-g"] = function () {
    const op = pick(OPS), A = pick([-4, -3, -2, -1, 2, 3, 4]);
    const a = randNZ(-5, 5), c = a - A, x0 = rand(-6, 6), b = randNZ(-9, 9), d = b + A * x0, B = d - b;
    const op2 = A < 0 ? OPS_INV[op] : op;
    const intervalle = (o) => (o === ">" || o === "\\geqslant" ? interv(x0, "+\\infty", o === "\\geqslant", false) : interv("-\\infty", x0, false, o === "\\leqslant"));
    const ens = OPS.map(intervalle), bonne = intervalle(op2), mel = shuffle(ens);
    return {
      enonce: `Soit $f(x) = ${poly([a, b])}$ et $g(x) = ${poly([c, d])}$. Résous l'inéquation $f(x) ${op} g(x)$.`,
      mode: "choix", choix: mel.map((e) => `$S = ${e}$`), attendu: mel.indexOf(bonne),
      aides: [
        `Écris l'inéquation $${poly([a, b])} ${op} ${poly([c, d])}$, puis regroupe les $x$ à gauche et les nombres à droite.`,
        `Tu obtiens $${poly([A, 0])} ${op} ${B}$.`,
        A < 0 ? `On divise par $${A}$, un nombre **négatif** : le sens de l'inégalité **change** !` : `On divise par $${A}$, un nombre positif : le sens de l'inégalité ne change pas.`
      ],
      solution: `$${poly([a, b])} ${op} ${poly([c, d])} \\iff ${poly([A, 0])} ${op} ${B} \\iff x ${op2} ${x0}$` +
        (A < 0 ? `. On a divisé par $${A}$, négatif : le sens de l'inégalité a changé.` : ".") + `\n\n$S = ${bonne}$`
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

  // Lire un programme Python : terme, somme, seuil, factorielle
  GEN["suite-python"] = function () {
    const t = rand(0, 3);
    const bloc = (lignes) => "```python\n" + lignes.join("\n") + "\n```";
    if (t === 0) {
      let u0, a, b; do { u0 = rand(1, 5); a = pick([2, 3]); b = pick([-2, -1, 1, 2, 3]); } while (a * u0 + b === u0); // pas de suite constante
      const n = rand(2, 4);
      const vals = [u0]; for (let i = 0; i < n; i++) vals.push(a * vals[i] + b);
      const maj = `u = ${a} * u ${b < 0 ? "-" : "+"} ${Math.abs(b)}`;
      return {
        enonce: `Voici une fonction Python.\n\n${bloc(["def terme(n):", `    u = ${u0}`, "    for i in range(n):", `        ${maj}`, "    return u"])}\n\nQue renvoie terme(${n}) ?`,
        mode: "nombre", prefixe: "Réponse :", attendu: vals[n],
        erreurs: [{ valeur: vals[n - 1], message: `La boucle tourne $${n}$ fois, pas $${n - 1}$.` }, { valeur: a * vals[n] + b, message: `« range(${n}) » fait exactement $${n}$ passages.` }],
        aides: [`Au départ, $u = ${u0}$. « for i in range(${n}) » répète la ligne « ${maj} » $${n}$ fois.`, `Premier passage : $u = ${a} \\times ${u0} ${sg(b)} = ${vals[1]}$.`, `Les valeurs successives de $u$ : $${vals.join(" ; ")}$.`],
        solution: `$u$ prend les valeurs $${vals.join(" ; ")}$. Après $${n}$ passages, la fonction renvoie $${vals[n]}$ : c'est $u_{${n}}$ pour la suite $u_0 = ${u0}$, $u_{n+1} = ${a}u_n ${sg(b)}$.`
      };
    }
    if (t === 1) {
      const u0 = rand(1, 6), r = rand(2, 5), n = rand(2, 4);
      const vals = [u0]; for (let i = 0; i < n; i++) vals.push(vals[i] + r);
      const S = vals.reduce((x, y) => x + y);
      return {
        enonce: `Voici une fonction Python.\n\n${bloc(["def somme(n):", `    u = ${u0}`, "    s = u", "    for i in range(n):", `        u = u + ${r}`, "        s = s + u", "    return s"])}\n\nQue renvoie somme(${n}) ?`,
        mode: "nombre", prefixe: "Réponse :", attendu: S,
        erreurs: [{ valeur: S - u0, message: `N'oublie pas le premier terme : « s = u » met $${u0}$ dans $s$ dès le départ.` }, { valeur: vals[n], message: "Ça, c'est la valeur finale de $u$. La fonction renvoie $s$." }],
        aides: [`Au départ, $u = ${u0}$ et $s = ${u0}$.`, `À chaque passage, $u$ augmente de $${r}$, puis on l'ajoute à $s$.`, `Les valeurs de $u$ : $${vals.join(" ; ")}$. Additionne-les.`],
        solution: `$s = ${vals.join(" + ")} = ${S}$ : c'est la somme $u_0 + \\dots + u_{${n}}$ de la suite arithmétique de premier terme $${u0}$ et de raison $${r}$.`
      };
    }
    if (t === 2) {
      const up = Math.random() < 0.6;
      const u0 = up ? rand(2, 6) : pick([800, 1000, 1200]), q = up ? pick([2, 3]) : 2, A = up ? pick([50, 100, 200]) : pick([20, 50, 100]);
      const vals = [u0]; let n = 0;
      while (up ? vals[n] < A : vals[n] > A) { vals.push(up ? vals[n] * q : vals[n] / q); n++; }
      const cond = up ? `u < ${A}` : `u > ${A}`, maj = up ? `u = ${q} * u` : "u = u / 2";
      return {
        enonce: `Voici une fonction Python.\n\n${bloc(["def seuil():", `    u = ${u0}`, "    n = 0", `    while ${cond}:`, `        ${maj}`, "        n = n + 1", "    return n"])}\n\nQue renvoie seuil() ?`,
        mode: "nombre", prefixe: "Réponse :", attendu: n,
        erreurs: [{ valeur: vals[n], message: "Ça, c'est la valeur finale de $u$. La fonction renvoie $n$, le nombre de passages." }, { valeur: n - 1, message: `La boucle continue tant que « ${cond} » : vérifie le dernier passage.` }],
        aides: [`« while ${cond} » : on répète tant que la condition est vraie.`, `Les valeurs de $u$ : $${vals.slice(0, 3).map(nbr).join(" ; ")}$…`, `Continue jusqu'à ce que $u ${up ? "\\geqslant" : "\\leqslant"} ${A}$, en comptant les passages.`],
        solution: `$u$ prend les valeurs $${vals.map(nbr).join(" ; ")}$. La condition devient fausse après $${n}$ passages : seuil() renvoie $${n}$.`
      };
    }
    const n = rand(3, 6), f = [1, 1, 2, 6, 24, 120, 720][n];
    return {
      enonce: `Voici une fonction Python.\n\n${bloc(["def f(n):", "    p = 1", "    for i in range(1, n + 1):", "        p = p * i", "    return p"])}\n\nQue renvoie f(${n}) ?`,
      mode: "nombre", prefixe: "Réponse :", attendu: f,
      erreurs: [{ valeur: f / n, message: `« range(1, ${n} + 1) » va de $1$ à $${n}$ inclus.` }],
      aides: ["« range(1, n + 1) » donne les entiers de $1$ à $n$.", "$p$ est multiplié successivement par $1$, $2$, $3$…", `$f(${n}) = ${Array.from({ length: n }, (_, k) => k + 1).join(" \\times ")}$.`],
      solution: `$p = ${Array.from({ length: n }, (_, k) => k + 1).join(" \\times ")} = ${f}$. Ce produit s'appelle « factorielle ${n} », noté $${n}!$.`
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

  // Compléter le carré : la méthode qui démontre la forme canonique
  GEN["sd-completer-carre"] = function () {
    const k = randNZ(-6, 6); let c; do { c = randNZ(-12, 12); } while (c === k * k);
    const be = c - k * k;
    const car = `\\left(x ${k > 0 ? "+" : "-"} ${Math.abs(k)}\\right)^2`;
    return {
      enonce: `On complète le carré : $x^2 ${sg(2 * k)}x = ${car} - ${k * k}$. Écris $f(x) = ${poly([1, 2 * k, c])}$ sous la forme $${car} + \\beta$. Que vaut $\\beta$ ?`,
      mode: "nombre", prefixe: "β =", attendu: be,
      erreurs: [{ valeur: c + k * k, message: `On **retire** $${k * k}$ : $${car}$ contient $${k * k}$ en trop.` }],
      aides: [`Développe $${car}$ : tu obtiens $x^2 ${sg(2 * k)}x + ${k * k}$.`, `Pour retrouver $x^2 ${sg(2 * k)}x$, il faut retirer $${k * k}$.`, `$f(x) = ${car} - ${k * k} ${sg(c)}$.`],
      solution: `$f(x) = ${car} - ${k * k} ${sg(c)} = ${car} ${sg(be)}$. Donc $\\beta = ${be}$, et le sommet de la parabole est $S(${-k}\\,;${be})$.`
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

  /* ---------- Automatismes (liste officielle de l'épreuve anticipée de Première) ---------- */
  // Nombre écrit à la française avec espaces des milliers : 52 300 ; 0,00052
  const nb = (x) => {
    const s = String(+(+x).toPrecision(10));
    const neg = s[0] === "-";
    const [ent, dec] = (neg ? s.slice(1) : s).split(".");
    const e = ent.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
    return (neg ? "-" : "") + e + (dec ? "{,}" + dec : "");
  };
  const cmpChoix = (A, B) => [`$${A} < ${B}$`, `$${A} > ${B}$`, `$${A} = ${B}$`];
  const cmpRep = (a, b) => (Math.abs(a - b) < 1e-12 ? 2 : a < b ? 0 : 1);
  const melangeChoix = (bonne, fausses) => { const c = shuffle([bonne, ...[...new Set(fausses)].filter((f) => f !== bonne).slice(0, 3)]); return { choix: c, attendu: c.indexOf(bonne) }; };

  // CN01 : comparer deux nombres
  GEN["am-comparer"] = function () {
    const T = [
      () => {
        let a, b, c, d; do { b = rand(3, 9); d = rand(3, 9); a = rand(1, b - 1); c = rand(1, d - 1); } while (b === d);
        return [`\\dfrac{${a}}{${b}}`, `\\dfrac{${c}}{${d}}`, a / b, c / d,
          ["Compare par la différence : réduis d'abord au même dénominateur.", `$\\dfrac{${a}}{${b}} = \\dfrac{${a * d}}{${b * d}}$ et $\\dfrac{${c}}{${d}} = \\dfrac{${c * b}}{${b * d}}$.`, "Avec le même dénominateur, la plus grande fraction est celle qui a le plus grand numérateur."],
          `$\\dfrac{${a}}{${b}} = \\dfrac{${a * d}}{${b * d}}$ et $\\dfrac{${c}}{${d}} = \\dfrac{${c * b}}{${b * d}}$.`];
      },
      () => {
        const x = rand(101, 999) / 100, y = Math.floor(x * 10) / 10 + pick([0, 0.1]), s = Math.random() < 0.4 ? -1 : 1;
        const A = s * x, B = +(s * y).toFixed(1);
        const B2 = (B < 0 ? "-" : "") + Math.abs(B).toFixed(2).replace(".", "{,}");
        return [nb(A), nb(B), A, B,
          ["Écris les deux nombres avec le même nombre de décimales.", `$${nb(B)} = ${B2}$.`, s < 0 ? "Pour deux nombres négatifs, le plus grand est le plus proche de $0$." : "Compare chiffre par chiffre, de la gauche vers la droite."],
          `$${nb(B)} = ${B2}$.` + (s < 0 ? " Pour des négatifs, le plus grand est le plus proche de $0$." : "")];
      },
      () => {
        const [n, d] = pick([[1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [3, 8], [5, 6], [1, 6], [2, 7], [4, 9]]);
        const v = n / d, D = +(Math.round(v * 100) / 100 + pick([-0.01, 0, 0.01])).toFixed(2);
        return [`\\dfrac{${n}}{${d}}`, nb(D), v, D,
          ["Calcule l'écriture décimale de la fraction : c'est une division.", `$${n} \\div ${d} ${Number.isInteger(v * 1000) ? "=" : "\\approx"} ${nb(+v.toFixed(4))}$.`, "Compare ensuite les deux écritures décimales."],
          `$\\dfrac{${n}}{${d}} ${Number.isInteger(v * 1000) ? "=" : "\\approx"} ${nb(+v.toFixed(4))}$.`];
      },
      () => {
        const [A, B, a, b, expl] = pick([
          ["2^{10}", "10^{3}", 1024, 1000, "$2^{10} = 1\\,024$ et $10^3 = 1\\,000$."],
          ["3^{2}", "2^{3}", 9, 8, "$3^2 = 9$ et $2^3 = 8$."],
          ["(-2)^{3}", "-2^{3}", -8, -8, "$(-2)^3 = -8$ et $-2^3 = -8$."],
          ["(-3)^{2}", "-3^{2}", 9, -9, "$(-3)^2 = 9$ mais $-3^2 = -9$ : le carré ne porte que sur $3$."],
          ["10^{-2}", "0{,}01", 0.01, 0.01, "$10^{-2} = \\dfrac{1}{100} = 0{,}01$."],
          ["2^{-1}", "0{,}2", 0.5, 0.2, "$2^{-1} = \\dfrac{1}{2} = 0{,}5$."],
          ["5^{0}", "0", 1, 0, "Tout nombre non nul à la puissance $0$ vaut $1$."],
          ["0{,}1^{2}", "0{,}1", 0.01, 0.1, "$0{,}1^2 = 0{,}01$ : élever au carré un nombre entre $0$ et $1$ le rend plus petit."],
          ["\\sqrt{50}", "7", Math.sqrt(50), 7, "$7^2 = 49 < 50$, donc $\\sqrt{50} > 7$."],
          ["\\sqrt{16} + \\sqrt{9}", "\\sqrt{25}", 7, 5, "$\\sqrt{16} + \\sqrt{9} = 4 + 3 = 7$ alors que $\\sqrt{25} = 5$."]
        ]);
        return [A, B, a, b, ["Calcule la valeur de chaque nombre.", "Attention aux priorités : la puissance passe avant le signe $-$.", expl], expl];
      }
    ];
    const [A, B, a, b, aides, sol] = pick(T)();
    const choix = cmpChoix(A, B), r = cmpRep(a, b);
    return {
      enonce: `Compare les nombres $${A}$ et $${B}$.`,
      mode: "choix", choix, attendu: r, aides,
      solution: `${sol}\n\nDonc ${choix[r]}.`
    };
  };

  GEN["am-fractions"] = () => GEN["auto-fractions"](0);

  // CN03 : puissances et écriture scientifique
  GEN["am-puissances"] = function () {
    if (Math.random() < 0.5) return GEN["auto-fractions"](1);
    const a = rand(11, 99) / 10, n = pick([-4, -3, -2, 3, 4, 5, 6]);
    const x = +(a * 10 ** n).toPrecision(2);
    return {
      enonce: `On écrit $${nb(x)}$ en écriture scientifique $${fr(a)} \\times 10^{n}$. Quelle est la valeur de $n$ ?`,
      mode: "nombre", prefixe: "n =", attendu: n,
      erreurs: [{ valeur: -n, message: "Attention au signe : un nombre plus grand que $10$ a un exposant positif, un nombre plus petit que $1$ un exposant négatif." }],
      aides: ["Écriture scientifique : $a \\times 10^n$ avec $1 \\leqslant a < 10$.", `Compte de combien de rangs la virgule se déplace pour passer de $${fr(a)}$ à $${nb(x)}$.`, n > 0 ? "Le nombre est plus grand que $10$ : l'exposant est positif." : "Le nombre est plus petit que $1$ : l'exposant est négatif."],
      solution: `$${nb(x)} = ${fr(a)} \\times 10^{${n}}$`
    };
  };

  // CN04 : passer d'une écriture à une autre
  GEN["am-ecritures"] = function () {
    const T = [
      () => { const [n, d] = pick([[3, 4], [1, 4], [1, 5], [2, 5], [3, 8], [7, 20], [1, 8], [3, 25], [9, 10], [7, 4]]); return [`Écris $\\dfrac{${n}}{${d}}$ sous forme décimale.`, n / d, "", ["Une fraction est une division : numérateur ÷ dénominateur.", `Calcule $${n} \\div ${d}$.`, "Tu peux aussi chercher une fraction égale de dénominateur $10$, $100$ ou $1\\,000$."], `$\\dfrac{${n}}{${d}} = ${nb(n / d)}$`]; },
      () => { const p = pick([12.5, 7, 45, 3, 150, 0.5, 80, 2.5]); return [`Écris $${pc(p)}$ sous forme décimale.`, p / 100, "", ["« Pour cent » veut dire « divisé par $100$ ».", `Calcule $${fr(p)} \\div 100$.`, "Diviser par $100$ : la virgule recule de deux rangs."], `$${pc(p)} = \\dfrac{${fr(p)}}{100} = ${nb(p / 100)}$`]; },
      () => { const v = pick([0.07, 0.35, 0.125, 1.2, 0.005, 0.6, 0.98]); return [`Écris $${fr(v)}$ sous forme de pourcentage.`, v * 100, "%", ["Pour obtenir un pourcentage, on multiplie par $100$.", `Calcule $${fr(v)} \\times 100$.`, "Multiplier par $100$ : la virgule avance de deux rangs."], `$${fr(v)} = \\dfrac{${nb(+(v * 100).toFixed(6))}}{100} = ${pc(+(v * 100).toFixed(6))}$`]; },
      () => { const [n, d] = pick([[3, 5], [1, 4], [7, 10], [1, 8], [9, 20], [3, 2], [1, 50]]); return [`Écris $\\dfrac{${n}}{${d}}$ sous forme de pourcentage.`, (n / d) * 100, "%", ["Commence par l'écriture décimale de la fraction.", `$\\dfrac{${n}}{${d}} = ${nb(n / d)}$.`, "Puis multiplie par $100$."], `$\\dfrac{${n}}{${d}} = ${nb(n / d)} = ${pc(+((n / d) * 100).toFixed(6))}$`]; }
    ];
    const [enonce, rep, suffixe, aides, solution] = pick(T)();
    return { enonce, mode: "nombre", prefixe: "Réponse :", suffixe, attendu: +rep.toFixed(6), aides, solution };
  };

  // CN05 : ordre de grandeur
  GEN["am-ordre-grandeur"] = function () {
    let b1, b2, est, op;
    if (Math.random() < 0.6) {
      b1 = pick([2, 3, 4, 5, 6, 8]) * 10 ** rand(1, 3); b2 = pick([2, 3, 5]) * 10 ** rand(-2, 1); est = b1 * b2; op = "\\times";
    } else {
      b2 = pick([2, 3, 4, 5]) * 10 ** rand(-2, 0); est = pick([1, 2, 3, 5]) * 10 ** rand(1, 3); b1 = est * b2; op = "\\div";
    }
    b1 = +b1.toPrecision(6); b2 = +b2.toPrecision(6); est = +est.toPrecision(6);
    let A, B; do { A = +(b1 * (1 + rand(-4, 4) / 100)).toPrecision(3); } while (A === b1);
    do { B = +(b2 * (1 + rand(-6, 6) / 100)).toPrecision(2); } while (B === b2 && Math.random() < 0.8);
    const start = -rand(0, 3);
    const vals = [0, 1, 2, 3].map((k) => +(est * 10 ** (start + k)).toPrecision(6));
    return {
      enonce: `Sans calculatrice, donne un ordre de grandeur de $${nb(A)} ${op} ${nb(B)}$.`,
      mode: "choix", choix: vals.map((v) => `$${nb(v)}$`), attendu: -start,
      aides: ["Arrondis chaque nombre à une valeur simple, avec un seul chiffre non nul.", `$${nb(A)} \\approx ${nb(b1)}$ et $${nb(B)} \\approx ${nb(b2)}$.`, `Calcule de tête $${nb(b1)} ${op} ${nb(b2)}$.`],
      solution: `$${nb(A)} ${op} ${nb(B)} \\approx ${nb(b1)} ${op} ${nb(b2)} = ${nb(est)}$`
    };
  };

  // CN06 : vraisemblance d'un résultat
  GEN["am-coherence"] = function () {
    const [q, bonne, fausses, expl] = pick([
      ["La hauteur d'une porte de maison est d'environ :", "$2$ m", ["$20$ m", "$2$ cm", "$0{,}2$ km"], "Une porte est un peu plus haute qu'une personne : environ $2$ m."],
      ["Un élève calcule la proportion de filles dans sa classe et trouve $1{,}25$. Que penser ?", "C'est impossible : une proportion est comprise entre $0$ et $1$", ["C'est possible s'il y a beaucoup de filles", "Cela veut dire qu'il y a $125$ filles", "Cela veut dire $1{,}25\\,\\%$ de filles"], "Une proportion (partie ÷ tout) est toujours entre $0$ et $1$, soit entre $0\\,\\%$ et $100\\,\\%$."],
      ["La masse d'un litre d'eau est d'environ :", "$1$ kg", ["$10$ kg", "$100$ g", "$1$ g"], "Un litre d'eau pèse environ $1$ kg (une grande bouteille de $1{,}5$ L pèse $1{,}5$ kg)."],
      ["La vitesse d'une voiture sur une route nationale est d'environ :", "$80$ km/h", ["$8$ km/h", "$800$ km/h", "$80$ m/s"], "$80$ m/s, c'est $288$ km/h : beaucoup trop. $8$ km/h, c'est la vitesse d'un piéton qui court doucement."],
      ["Un article à $40$ € baisse de $25\\,\\%$. Un élève trouve un nouveau prix de $50$ €. Que penser ?", "C'est faux : après une baisse, le prix doit être inférieur à $40$ €", ["C'est juste", "C'est juste si le magasin le décide", "C'est faux : il fallait trouver $65$ €"], "Après une baisse, le nouveau prix est plus petit. Ici : $40 \\times 0{,}75 = 30$ €."],
      ["La superficie de Mayotte est d'environ :", "$374$ km²", ["$374$ m²", "$37\\,400$ km²", "$3{,}74$ km²"], "Mayotte mesure environ $374$ km² ($374$ m², c'est la taille d'une grande maison)."],
      ["Un élève trouve une probabilité égale à $-0{,}2$. Que penser ?", "C'est faux : une probabilité est comprise entre $0$ et $1$", ["C'est un événement très rare", "C'est un événement impossible", "Il faut l'écrire $-20\\,\\%$"], "Une probabilité n'est jamais négative : il y a une erreur de calcul."],
      ["Un triangle rectangle a des côtés de l'angle droit de $3$ cm et $4$ cm. Un élève trouve une hypoténuse de $7$ cm. Que penser ?", "C'est faux : l'hypoténuse est plus courte que la somme des deux autres côtés", ["C'est juste : $3 + 4 = 7$", "C'est juste si le triangle est grand", "C'est faux : elle mesure $12$ cm"], "Dans un triangle, un côté est toujours plus court que la somme des deux autres. Ici $\\sqrt{9 + 16} = 5$ cm."],
      ["Le volume d'une bouteille d'eau est d'environ :", "$1{,}5$ L", ["$1{,}5$ m³", "$15$ mL", "$150$ L"], "$1$ m³ $= 1\\,000$ L : c'est le volume d'une grande cuve, pas d'une bouteille."],
      ["Un élève calcule la moyenne de ses notes sur $20$ et trouve $23{,}5$. Que penser ?", "C'est faux : une moyenne est entre la plus petite et la plus grande valeur", ["C'est possible avec des bonus", "C'est juste s'il a beaucoup de notes", "Cela fait $11{,}75$ sur $10$"], "La moyenne est toujours comprise entre la plus petite et la plus grande note, donc ici entre $0$ et $20$."]
    ]);
    const m = melangeChoix(bonne, fausses);
    return {
      enonce: q, mode: "choix", choix: m.choix, attendu: m.attendu,
      aides: ["Pense à une situation de la vie courante que tu connais.", "Vérifie l'ordre de grandeur et l'unité.", "Une proportion, une probabilité : entre $0$ et $1$. Une moyenne : entre la plus petite et la plus grande valeur."],
      solution: `**${bonne}**.\n\n${expl}`
    };
  };

  // CA01 : remplacer des lettres par des nombres
  GEN["am-substituer"] = function () {
    const a = randNZ(-5, 6), b = randNZ(-5, 6), k = rand(2, 5), m = rand(2, 4);
    const E = pick([
      [`${k}a - ${m}b`, k * a - m * b, `${k} \\times ${par(a)} - ${m} \\times ${par(b)}`],
      [`a^2 + b`, a * a + b, `${par(a)}^2 + ${par(b)}`],
      [`(a - b)^2`, (a - b) ** 2, `(${a} - ${par(b)})^2`],
      [`ab + ${k}`, a * b + k, `${par(a)} \\times ${par(b)} + ${k}`],
      [`-a^2 + ${k}b`, -a * a + k * b, `-${par(a)}^2 + ${k} \\times ${par(b)}`],
      [`${k}(a + b)`, k * (a + b), `${k} \\times (${a} + ${par(b)})`]
    ]);
    return {
      enonce: `Calcule $${E[0]}$ pour $a = ${a}$ et $b = ${b}$.`,
      mode: "nombre", prefixe: "Résultat :", attendu: E[1],
      erreurs: E[0].startsWith("-a^2") ? [{ valeur: a * a + k * b, message: "$-a^2$ : on calcule d'abord $a^2$, puis on prend l'opposé. Le résultat de $-a^2$ est toujours négatif ou nul." }] : [],
      aides: ["Remplace chaque lettre par sa valeur, entre parenthèses si elle est négative.", `On calcule $${E[2]}$.`, "Priorités : puissances, puis multiplications, puis additions et soustractions."],
      solution: `$${E[2]} = ${E[1]}$`
    };
  };

  // CA01 : réduire une expression
  GEN["am-reduire"] = function () {
    let a, b, c, d; do { a = randNZ(-7, 7); b = randNZ(-9, 9); c = randNZ(-7, 7); d = randNZ(-9, 9); } while (a + c === 0 || b + d === 0);
    const termes = shuffle([[a, "x"], [b, ""], [c, "x"], [d, ""]]);
    let expr = "";
    termes.forEach(([v, x], i) => {
      const abs = Math.abs(v), coef = x && abs === 1 ? "" : `${abs}`;
      expr += i === 0 ? `${v < 0 ? "-" : ""}${coef}${x}` : ` ${v < 0 ? "-" : "+"} ${coef}${x}`;
    });
    const bonne = poly([a + c, b + d]);
    const m = melangeChoix(bonne, [poly([a - c, b + d]), poly([a + c, b - d]), poly([a + c + b + d, 0]), poly([-(a + c), b + d]), poly([a + c, -(b + d)])]);
    return {
      enonce: `Réduis l'expression $${expr}$.`,
      mode: "choix", choix: m.choix.map((x) => `$${x}$`), attendu: m.attendu,
      aides: ["Regroupe les termes en $x$ entre eux, et les nombres entre eux.", `Termes en $x$ : $${par(a)} + ${par(c)} = ${a + c}$.`, `Nombres : $${par(b)} + ${par(d)} = ${b + d}$. On ne peut pas additionner un terme en $x$ et un nombre.`],
      solution: `$${expr} = ${bonne}$`
    };
  };

  // CA03 : équation ou inéquation du premier degré
  GEN["am-premier-degre"] = function (i) {
    if (Math.random() < 0.5) return GEN["auto-equations"](0);
    const a = randNZ(-6, 6), b = randNZ(-9, 9), r = randNZ(-6, 6), c = a * r + b;
    const s = pick(["<", "\\leqslant", ">", "\\geqslant"]);
    const flip = { "<": ">", ">": "<", "\\leqslant": "\\geqslant", "\\geqslant": "\\leqslant" };
    const bonne = `x ${a > 0 ? s : flip[s]} ${r}`;
    const choix = [`x ${s} ${r}`, `x ${flip[s]} ${r}`, `x ${s} ${-r}`, `x ${flip[s]} ${-r}`];
    return {
      enonce: `Résous l'inéquation $${poly([a, b])} ${s} ${c}$.`,
      mode: "choix", choix: choix.map((x) => `$${x}$`), attendu: choix.indexOf(bonne),
      aides: ["Isole d'abord le terme en $x$, puis divise par le coefficient de $x$.", `$${a}x ${s} ${c} - ${par(b)}$, soit $${a}x ${s} ${c - b}$.`, a < 0 ? `Tu divises par $${a}$, un nombre **négatif** : le sens de l'inégalité change.` : `Tu divises par $${a}$, un nombre positif : le sens ne change pas.`],
      solution: `$${poly([a, b])} ${s} ${c} \\iff ${a}x ${s} ${c - b} \\iff ${bonne}$` + (a < 0 ? "\n\nLe sens change car on divise par un nombre négatif." : "")
    };
  };

  // CA04 : isoler une variable
  GEN["am-isoler"] = function () {
    const [f, v, bonne, fausses, ex] = pick([
      ["d = v \\times t", "t", "t = \\dfrac{d}{v}", ["t = \\dfrac{v}{d}", "t = d - v", "t = d \\times v"], "On divise les deux membres par $v$."],
      ["P = U \\times I", "I", "I = \\dfrac{P}{U}", ["I = \\dfrac{U}{P}", "I = P - U", "I = P \\times U"], "On divise les deux membres par $U$."],
      ["\\mathcal{A} = \\dfrac{b \\times h}{2}", "h", "h = \\dfrac{2\\mathcal{A}}{b}", ["h = \\dfrac{\\mathcal{A}}{2b}", "h = 2\\mathcal{A} - b", "h = \\dfrac{\\mathcal{A} \\times b}{2}"], "On multiplie par $2$ : $2\\mathcal{A} = b \\times h$, puis on divise par $b$."],
      ["y = 3x + 5", "x", "x = \\dfrac{y - 5}{3}", ["x = \\dfrac{y}{3} - 5", "x = 3y - 5", "x = \\dfrac{y + 5}{3}"], "On soustrait $5$ : $y - 5 = 3x$, puis on divise par $3$."],
      ["F = 1{,}8C + 32", "C", "C = \\dfrac{F - 32}{1{,}8}", ["C = \\dfrac{F}{1{,}8} - 32", "C = 1{,}8F - 32", "C = \\dfrac{F + 32}{1{,}8}"], "On soustrait $32$ : $F - 32 = 1{,}8C$, puis on divise par $1{,}8$."],
      ["E = mc^2", "m", "m = \\dfrac{E}{c^2}", ["m = E - c^2", "m = Ec^2", "m = \\dfrac{c^2}{E}"], "On divise les deux membres par $c^2$."],
      ["V = \\pi r^2 h", "h", "h = \\dfrac{V}{\\pi r^2}", ["h = V - \\pi r^2", "h = \\dfrac{\\pi r^2}{V}", "h = V \\pi r^2"], "On divise les deux membres par $\\pi r^2$."],
      ["P = 2(L + \\ell)", "L", "L = \\dfrac{P}{2} - \\ell", ["L = \\dfrac{P - \\ell}{2}", "L = 2P - \\ell", "L = P - 2\\ell"], "On divise par $2$ : $\\dfrac{P}{2} = L + \\ell$, puis on soustrait $\\ell$."],
      ["v = \\dfrac{d}{t}", "d", "d = v \\times t", ["d = \\dfrac{v}{t}", "d = \\dfrac{t}{v}", "d = v + t"], "On multiplie les deux membres par $t$."],
      ["v = \\dfrac{d}{t}", "t", "t = \\dfrac{d}{v}", ["t = d \\times v", "t = \\dfrac{v}{d}", "t = d - v"], "On multiplie par $t$ : $vt = d$, puis on divise par $v$."]
    ]);
    const m = melangeChoix(bonne, fausses);
    return {
      enonce: `On donne la formule $${f}$. Exprime $${v}$ en fonction des autres lettres.`,
      mode: "choix", choix: m.choix.map((x) => `$${x}$`), attendu: m.attendu,
      aides: ["Fais les mêmes opérations des deux côtés de l'égalité, comme pour résoudre une équation.", "Enlève d'abord ce qui est ajouté ou soustrait, puis ce qui multiplie ou divise la lettre.", "Vérifie ta réponse avec des valeurs simples."],
      solution: `$${bonne}$. ${ex}`
    };
  };

  // CA05 : appliquer une formule
  GEN["am-formule"] = function () {
    const T = [
      () => { const m = pick([2, 4, 6, 10, 50]), v = rand(2, 9); return [`L'énergie cinétique d'un objet est $E_c = \\dfrac{1}{2} m v^2$. Calcule $E_c$ pour $m = ${m}$ kg et $v = ${v}$ m/s.`, 0.5 * m * v * v, "J", `$E_c = \\dfrac{1}{2} \\times ${m} \\times ${v}^2 = \\dfrac{1}{2} \\times ${m} \\times ${v * v}$`, "Calcule d'abord la puissance : $v^2$."]; },
      () => { const B = rand(6, 12), b = rand(2, 5), h = rand(2, 8); return [`L'aire d'un trapèze est $\\mathcal{A} = \\dfrac{(B + b) \\times h}{2}$. Calcule $\\mathcal{A}$ pour $B = ${B}$ cm, $b = ${b}$ cm et $h = ${h}$ cm.`, ((B + b) * h) / 2, "cm²", `$\\mathcal{A} = \\dfrac{(${B} + ${b}) \\times ${h}}{2} = \\dfrac{${B + b} \\times ${h}}{2}$`, "Les parenthèses d'abord : $B + b$."]; },
      () => { const v = pick([60, 80, 90, 110]), t = pick([0.5, 1.5, 2.5, 0.25]); return [`Une voiture roule à la vitesse constante $v = ${v}$ km/h pendant $t = ${fr(t)}$ h. Calcule la distance $d = v \\times t$.`, v * t, "km", `$d = ${v} \\times ${fr(t)}$`, `$${fr(t)}$ h, c'est ${t === 0.5 ? "une demi-heure" : t === 0.25 ? "un quart d'heure" : "une heure et demie ou deux heures et demie"}.`]; },
      () => { const R = pick([10, 20, 50, 100]), I = pick([0.2, 0.5, 1.5, 0.05]); return [`La loi d'Ohm s'écrit $U = R \\times I$. Calcule $U$ pour $R = ${R}$ Ω et $I = ${fr(I)}$ A.`, R * I, "V", `$U = ${R} \\times ${fr(I)}$`, "Multiplier par $10$ ou $100$ : la virgule avance."]; },
      () => { const C = pick([0, 10, 25, 30, 37, -10]); return [`Pour convertir des degrés Celsius en degrés Fahrenheit, on utilise $F = 1{,}8C + 32$. Calcule $F$ pour $C = ${C}$.`, 1.8 * C + 32, "°F", `$F = 1{,}8 \\times ${par(C)} + 32$`, "La multiplication d'abord, l'addition ensuite."]; },
      () => { const HT = pick([25, 40, 75, 120, 250]); return [`Le prix TTC se calcule avec la formule $\\text{TTC} = \\text{HT} \\times 1{,}2$. Calcule le prix TTC d'un article à $${HT}$ € HT.`, HT * 1.2, "€", `$\\text{TTC} = ${HT} \\times 1{,}2$`, `$${HT} \\times 1{,}2 = ${HT} + ${HT} \\times 0{,}2$.`]; }
    ];
    const [enonce, rep, suffixe, calc, astuce] = pick(T)();
    return {
      enonce, mode: "nombre", prefixe: "Résultat :", suffixe, attendu: +rep.toFixed(6),
      aides: ["Remplace chaque lettre de la formule par sa valeur.", `${calc}.`, astuce],
      solution: `${calc.slice(0, -1)} = ${nb(+rep.toFixed(6))}$ ${suffixe}.`
    };
  };

  // CA06 : équation produit nul
  const fx = (a, b) => (a === 1 && b === 0 ? "x" : `(${poly([a, b])})`);
  GEN["am-produit-nul"] = function () {
    const r1 = randNZ(-6, 6);
    let a2, b2, r2;
    if (Math.random() < 0.5) { do { r2 = rand(-6, 6); } while (r2 === r1); a2 = 1; b2 = -r2; }
    else { a2 = pick([2, -2, 3]); do { b2 = randNZ(-9, 9); } while (b2 % a2 === 0); r2 = -b2 / a2; }
    const f1 = fx(1, -r1), f2 = fx(a2, b2);
    const prod = Math.random() < 0.5 ? `${f1}${f2}` : `${f2}${f1}`;
    const rtex = (r) => (Number.isInteger(r) ? `${r}` : frac(-b2, a2));
    const S = [r1, r2].sort((x, y) => x - y);
    return {
      enonce: `Résous l'équation $${prod} = 0$.`,
      mode: "ensemble", prefixe: "Solutions :", attendu: [r1, r2],
      aides: ["Un produit est nul si et seulement si l'un au moins de ses facteurs est nul.", `$${poly([1, -r1])} = 0$ ou $${poly([a2, b2])} = 0$.`, "Résous les deux équations, puis donne les deux solutions séparées par « ; ». Une fraction s'écrit par exemple $3/2$."],
      solution: `$${prod} = 0 \\iff ${poly([1, -r1])} = 0$ ou $${poly([a2, b2])} = 0 \\iff x = ${r1}$ ou $x = ${rtex(r2)}$.\n\n$S = \\{${S.map(rtex).join("\\,;")}\\}$`
    };
  };

  // CA07 : signe d'une expression
  GEN["am-signe"] = function () {
    if (Math.random() < 0.5) {
      const a = randNZ(-4, 4), r = randNZ(-5, 5), b = -a * r;
      const bonne = a > 0 ? `x > ${r}` : `x < ${r}`;
      const choix = [`x > ${r}`, `x < ${r}`, `x > ${-r}`, `x < ${-r}`];
      return {
        enonce: `Pour quelles valeurs de $x$ l'expression $${poly([a, b])}$ est-elle strictement positive ?`,
        mode: "choix", choix: choix.map((x) => `$${x}$`), attendu: choix.indexOf(bonne),
        aides: [`Résous l'inéquation $${poly([a, b])} > 0$.`, `$${a}x > ${-b}$.`, a < 0 ? "On divise par un nombre négatif : le sens de l'inégalité change." : "On divise par un nombre positif : le sens ne change pas."],
        solution: `$${poly([a, b])} > 0 \\iff ${a}x > ${-b} \\iff ${bonne}$.\n\nRègle : $ax + b$ est du signe de $a$ à droite de sa racine $${r}$.`
      };
    }
    let r1, r2; do { r1 = rand(-5, 3); r2 = rand(r1 + 1, 6); } while (r1 === -r2);
    const neg = Math.random() < 0.5;
    const dedans = `[${r1}\\,;${r2}]`, dehors = `]-\\infty\\,;${r1}] \\cup [${r2}\\,;+\\infty[`;
    const choix = [dedans, dehors, `[${-r2}\\,;${-r1}]`, `]-\\infty\\,;${-r2}] \\cup [${-r1}\\,;+\\infty[`];
    const bonne = neg ? dedans : dehors;
    return {
      enonce: `Sur quel ensemble l'expression $${facteur(r1)}${facteur(r2)}$ est-elle ${neg ? "négative ou nulle" : "positive ou nulle"} ?`,
      mode: "choix", choix: choix.map((x) => `$${x}$`), attendu: choix.indexOf(bonne),
      aides: ["Cherche les valeurs qui annulent chaque facteur.", `Les racines sont $${r1}$ et $${r2}$. Développé, le coefficient de $x^2$ vaut $1 > 0$.`, "Un trinôme est du signe de $a$ à l'extérieur des racines, et du signe contraire entre les racines."],
      solution: `Racines $${r1}$ et $${r2}$, et $a = 1 > 0$ : l'expression est négative entre les racines et positive à l'extérieur.\n\nRéponse : $${bonne}$.`
    };
  };

  // FR03 : reconnaître une fonction linéaire ou affine
  GEN["am-reconnaitre"] = function () {
    const k = randNZ(-6, 6), a = randNZ(-5, 5), b = randNZ(-9, 9), d = rand(2, 5);
    const lin = shuffle([poly([k, 0]), `-\\dfrac{x}{${d}}`, `\\dfrac{x}{${d}}`]);
    const aff = shuffle([poly([a, b]), `${Math.abs(b)} - ${Math.abs(a) === 1 ? "" : Math.abs(a)}x`, `\\dfrac{x + ${Math.abs(b)}}{${d}}`, `${Math.abs(a) === 1 ? 2 : Math.abs(a)}(x ${sg(b)})`]);
    const non = shuffle([`x^2 ${sg(b)}`, `\\dfrac{${Math.abs(k)}}{x}`, `\\sqrt{x} ${sg(b)}`, poly([a, 0, 0]), `x(x ${sg(b)})`, `\\dfrac{1}{x ${sg(b)}}`]);
    const t = pick(["affine", "lineaire", "pas"]);
    let bonne, fausses, q, expl;
    if (t === "affine") { bonne = pick([lin[0], aff[0], aff[1]]); fausses = non.slice(0, 3); q = "Laquelle de ces fonctions est affine ?"; expl = "Une fonction affine s'écrit $f(x) = mx + p$ : $x$ n'apparaît qu'à la puissance $1$, jamais au carré, sous une racine ou au dénominateur."; }
    else if (t === "lineaire") { bonne = lin[0]; fausses = [aff[0], aff[1], non[0]]; q = "Laquelle de ces fonctions est linéaire ?"; expl = "Une fonction linéaire s'écrit $f(x) = mx$ (affine avec $p = 0$). Sa droite passe par l'origine."; }
    else { bonne = non[0]; fausses = [lin[0], aff[0], aff[2]]; q = "Laquelle de ces fonctions **n'est pas** affine ?"; expl = "Les autres peuvent s'écrire $mx + p$. Celle-ci contient $x$ au carré, sous une racine ou au dénominateur."; }
    const m = melangeChoix(bonne, fausses);
    return {
      enonce: q, mode: "choix", choix: m.choix.map((x) => `$f(x) = ${x}$`), attendu: m.attendu,
      aides: ["Affine : $f(x) = mx + p$. Linéaire : $f(x) = mx$.", "Développe ou simplifie l'expression si besoin : $\\dfrac{x + 3}{2} = \\dfrac{1}{2}x + \\dfrac{3}{2}$ est affine.", "$x^2$, $\\sqrt{x}$ ou $\\dfrac{1}{x}$ : ce n'est pas affine."],
      solution: `$f(x) = ${bonne}$.\n\n${expl}`
    };
  };

  // FR05 : variations et extremum lus sur une courbe
  GEN["am-signe-graph"] = function () {
    const P = parabole();
    const dom = `[${P.h - 3}\\,;${P.h + 3}]`;
    if (Math.random() < 0.5) {
      const cr = Math.random() < 0.5;
      const gauche = `[${P.h - 3}\\,;${P.h}]`, droite = `[${P.h}\\,;${P.h + 3}]`;
      const lo = Math.min(P.k, P.k + 9 * P.a), hi = Math.max(P.k, P.k + 9 * P.a);
      const bonne = (P.a < 0) === cr ? gauche : droite;
      const choix = [gauche, droite, dom, `[${lo}\\,;${hi}]`];
      return {
        enonce: `Voici la courbe d'une fonction $f$ définie sur $${dom}$. Sur quel intervalle $f$ est-elle ${cr ? "croissante" : "décroissante"} ?`,
        figure: graph(P.opts()), mode: "choix", choix: choix.map((x) => `$${x}$`), attendu: choix.indexOf(bonne),
        aides: ["Parcours la courbe de gauche à droite.", `${cr ? "Croissante" : "Décroissante"} : la courbe ${cr ? "monte" : "descend"}.`, "Les intervalles de variation se lisent sur l'axe des **abscisses** (horizontal)."],
        solution: `La courbe ${cr ? "monte" : "descend"} sur $${bonne}$ : $f$ y est ${cr ? "croissante" : "décroissante"}.`
      };
    }
    const mot = P.a < 0 ? "maximum" : "minimum";
    return {
      enonce: `Voici la courbe d'une fonction $f$ définie sur $${dom}$. Quel est le ${mot} de $f$ ?`,
      figure: graph(P.opts()), mode: "nombre", prefixe: `${mot} :`, attendu: P.k,
      erreurs: [{ valeur: P.h, message: `Ça, c'est la valeur de $x$ où le ${mot} est atteint. Le ${mot} est une valeur de $f(x)$, lue sur l'axe vertical.` }],
      aides: [`Cherche le point le plus ${P.a < 0 ? "haut" : "bas"} de la courbe.`, "Le " + mot + " est l'**ordonnée** de ce point.", `Ce point a pour abscisse $${P.h}$.`],
      solution: `Le point le plus ${P.a < 0 ? "haut" : "bas"} est $(${P.h}\\,;${P.k})$ : le ${mot} de $f$ est $${P.k}$, atteint en $x = ${P.h}$.`
    };
  };

  // FR06-FR08 : droites
  const mtex = (m) => (m === 1 ? "x" : m === -1 ? "-x" : Number.isInteger(m) ? `${m}x` : `${m < 0 ? "-" : ""}\\dfrac{1}{${Math.round(1 / Math.abs(m))}}x`);
  const eqD = (m, p) => `y = ${mtex(m)}${p ? ` ${p < 0 ? "-" : "+"} ${fr(Math.abs(p))}` : ""}`;

  GEN["am-droite-point"] = function () {
    const m = randNZ(-4, 4), p = rand(-6, 6), x0 = randNZ(-4, 4), y0 = m * x0 + p;
    const surD = (pt) => pt[1] === m * pt[0] + p;
    const cand = [[x0, y0 + pick([-2, -1, 1, 2])], [y0, x0], [x0, m * x0 - p], [-x0, y0], [x0 + 1, y0 - m]].filter((pt) => !surD(pt));
    const T = (pt) => `(${pt[0]}\\,;${pt[1]})`;
    const ms = melangeChoix(T([x0, y0]), cand.map(T));
    return {
      enonce: `Lequel de ces points appartient à la droite d'équation $${eqD(m, p)}$ ?`,
      mode: "choix", choix: ms.choix.map((x) => `$${x}$`), attendu: ms.attendu,
      aides: ["Un point $(x\\,;y)$ est sur la droite si ses coordonnées vérifient l'équation.", "Pour chaque point, calcule $" + mtex(m) + (p ? ` ${sg(p)}` : "") + "$ avec son abscisse et compare à son ordonnée.", `Pour $x = ${x0}$ : $${m} \\times ${par(x0)}${p ? ` ${sg(p)}` : ""} = ${y0}$.`],
      solution: `$${m} \\times ${par(x0)}${p ? ` ${sg(p)}` : ""} = ${y0}$ : le point $${T([x0, y0])}$ est sur la droite.`
    };
  };

  GEN["am-lire-droite"] = function () {
    const m = pick([-2, -1, -0.5, 0.5, 1, 2, 3]), p = rand(-3, 3);
    const Y = 5.5;
    let a = -4.5, b = 4.5;
    if (m > 0) { a = Math.max(a, (-Y - p) / m); b = Math.min(b, (Y - p) / m); } else { a = Math.max(a, (Y - p) / m); b = Math.min(b, (-Y - p) / m); }
    const o = { xmin: -4.8, xmax: 4.8, ymin: -5.8, ymax: 5.8, curves: [{ f: (x) => m * x + p, a, b, closed: false, label: "d", lx: b - 0.3, dx: -6, dy: m > 0 ? -6 : 14 }], aria: "Droite d dans un repère quadrillé" };
    const bonne = eqD(m, p);
    const inv = Math.abs(m) === 2 ? m / 4 : Math.abs(m) === 0.5 ? m * 4 : null;
    const fausses = [eqD(-m, p), eqD(m, p ? -p : 2), inv ? eqD(inv, p) : eqD(m, p + 1), eqD(m, p - 1)];
    const ms = melangeChoix(bonne, fausses);
    const pts = [{ x: 0, y: p, label: `(0 ; ${p})`.replace("-", "−") }];
    const x1 = Number.isInteger(m) ? 1 : 2;
    pts.push({ x: x1, y: m * x1 + p });
    return {
      enonce: "Quelle est l'équation réduite de la droite $d$ ?",
      figure: graph(o), mode: "choix", choix: ms.choix.map((x) => `$${x}$`), attendu: ms.attendu,
      aides: ["L'équation réduite s'écrit $y = mx + p$.", "$p$ (l'ordonnée à l'origine) se lit là où la droite coupe l'axe vertical.", `$m$ : quand $x$ augmente de $${x1}$, $y$ varie de $${m * x1}$. Donc $m = \\dfrac{${m * x1}}{${x1}}$.`],
      solution: `La droite coupe l'axe vertical en $${p}$, donc $p = ${p}$. Quand $x$ augmente de $${x1}$, $y$ varie de $${m * x1}$, donc $m = ${fr(m)}$.\n\n$d : ${bonne}$`,
      figureSolution: graph(Object.assign({}, o, { points: pts }))
    };
  };

  GEN["am-coef-dir"] = function () {
    let xa, xb, ya, yb, m; do { xa = rand(-4, 3); xb = rand(xa + 1, 6); m = pick([-3, -2, -1, 1, 2, 3, 0.5, -0.5, 4]); ya = rand(-5, 5); yb = ya + m * (xb - xa); } while (!Number.isInteger(yb) || Math.abs(yb) > 12);
    const dx = xb - xa, dy = yb - ya, p = ya - m * xa;
    if (Math.random() < 0.6) return {
      enonce: `On donne les points $A(${xa}\\,;${ya})$ et $B(${xb}\\,;${yb})$. Calcule le coefficient directeur $m$ de la droite $(AB)$.`,
      mode: "nombre", prefixe: "m =", attendu: m,
      erreurs: dy ? [{ valeur: dx / dy, message: "Tu as inversé : on divise la variation des **ordonnées** par la variation des **abscisses**." }, { valeur: -m, message: "Attention à l'ordre : il faut soustraire dans le même ordre en haut et en bas." }] : [],
      aides: ["$m = \\dfrac{y_B - y_A}{x_B - x_A}$.", `$m = \\dfrac{${yb} - ${par(ya)}}{${xb} - ${par(xa)}}$.`, `$m = \\dfrac{${dy}}{${dx}}$. Tu peux répondre par une fraction.`],
      solution: `$m = \\dfrac{${yb} - ${par(ya)}}{${xb} - ${par(xa)}} = \\dfrac{${dy}}{${dx}} = ${fr(m)}$`
    };
    return {
      enonce: `La droite $(AB)$ passe par $A(${xa}\\,;${ya})$ et a pour coefficient directeur $m = ${fr(m)}$. Calcule son ordonnée à l'origine $p$.`,
      mode: "nombre", prefixe: "p =", attendu: p,
      aides: ["L'équation s'écrit $y = mx + p$, et les coordonnées de $A$ la vérifient.", `$${ya} = ${fr(m)} \\times ${par(xa)} + p$.`, `$p = ${ya} - ${m < 0 ? `(${fr(m)})` : fr(m)} \\times ${par(xa)}$.`],
      solution: `$${ya} = ${fr(m)} \\times ${par(xa)} + p \\iff p = ${ya} - ${m * xa < 0 ? `(${fr(m * xa)})` : fr(m * xa)} = ${fr(p)}$.\n\n$(AB) : ${eqD(m, p)}$`
    };
  };

  // ST02 / ST06 : quartiles et moyenne pondérée
  GEN["am-quartiles"] = function () {
    const n = rand(8, 12), s = Array.from({ length: n }, () => rand(2, 20));
    const tri = s.slice().sort((x, y) => x - y);
    const q1 = Math.random() < 0.5;
    const rang = Math.ceil((q1 ? 1 : 3) * n / 4), val = tri[rang - 1];
    return {
      enonce: `Voici les notes de $${n}$ élèves : $${s.join(" ; ")}$. Détermine le ${q1 ? "premier quartile $Q_1$" : "troisième quartile $Q_3$"}.`,
      mode: "nombre", prefixe: q1 ? "Q₁ =" : "Q₃ =", attendu: val,
      erreurs: [{ valeur: s[rang - 1], message: "Il faut d'abord **ranger** les valeurs dans l'ordre croissant." }],
      aides: ["Range les valeurs dans l'ordre croissant.", `${q1 ? "$Q_1$" : "$Q_3$"} est la valeur de rang $${q1 ? `\\dfrac{n}{4}` : `\\dfrac{3n}{4}`}$, arrondi à l'entier supérieur : ici $${q1 ? n : 3 * n} \\div 4 = ${fr((q1 ? n : 3 * n) / 4)}$, donc le rang $${rang}$.`, `Valeurs rangées : $${tri.join(" ; ")}$.`],
      solution: `Valeurs rangées : $${tri.join(" ; ")}$. Rang $${rang}$ : ${q1 ? "$Q_1$" : "$Q_3$"} $= ${val}$.\n\nAu moins ${q1 ? "$25\\,\\%$" : "$75\\,\\%$"} des notes sont inférieures ou égales à $${val}$.`
    };
  };

  GEN["am-moyenne-ponderee"] = function () {
    const vals = shuffle([8, 9, 10, 11, 12, 13, 14, 15, 16]).slice(0, rand(3, 4)).sort((x, y) => x - y);
    const eff = vals.map(() => rand(1, 6));
    const N = eff.reduce((x, y) => x + y), S = vals.reduce((t, v, k) => t + v * eff[k], 0);
    const moy = +(S / N).toFixed(2);
    return {
      enonce: "Voici les notes obtenues par un groupe d'élèves. Calcule la note moyenne (arrondie au centième si besoin).",
      tableau: { var: "\\text{Note}", nom: "\\text{Effectif}", x: vals, y: eff },
      mode: "nombre", prefixe: "Moyenne :", attendu: moy, tolerance: 0.006,
      erreurs: [{ valeur: +(vals.reduce((x, y) => x + y) / vals.length).toFixed(2), message: "Chaque note doit compter autant de fois que son effectif." }],
      aides: ["Moyenne pondérée : $\\dfrac{\\text{somme des (note} \\times \\text{effectif)}}{\\text{effectif total}}$.", `Somme : $${vals.map((v, k) => `${v} \\times ${eff[k]}`).join(" + ")} = ${S}$.`, `Effectif total : $${eff.join(" + ")} = ${N}$.`],
      solution: `$\\bar{x} = \\dfrac{${S}}{${N}} ${S % N === 0 ? "=" : "\\approx"} ${fr(moy)}$`
    };
  };

  // ST01 / ST04 / ST05 : lire un diagramme
  GEN["am-diagramme"] = function () {
    if (Math.random() < 0.3) {
      const [ang, pct] = pick([[36, 10], [72, 20], [90, 25], [108, 30], [180, 50], [54, 15], [18, 5], [270, 75]]);
      return {
        enonce: `Dans un diagramme circulaire, un secteur a un angle de $${ang}°$. Quel pourcentage de l'effectif représente-t-il ?`,
        mode: "nombre", prefixe: "Réponse :", suffixe: "%", attendu: pct,
        aides: ["Le disque entier ($360°$) représente $100\\,\\%$.", "Les angles sont proportionnels aux effectifs.", `$\\dfrac{${ang}}{360} \\times 100$.`],
        solution: `$\\dfrac{${ang}}{360} \\times 100 = ${pct}$, soit $${pct}\\,\\%$.`
      };
    }
    let eff; do { eff = Array.from({ length: 6 }, () => rand(1, 9)); } while (eff.filter((e) => e === Math.max(...eff)).length > 1);
    const N = eff.reduce((x, y) => x + y);
    const o = { xmin: -0.8, xmax: 6.4, ymin: -0.8, ymax: 10, h: 240, xlabel: "nombre", ylabel: "effectif", bars: eff.map((e, k) => ({ x: k, y: e })), aria: "Diagramme en bâtons des effectifs selon le nombre de frères et sœurs, de 0 à 5" };
    const k = rand(2, 4);
    const Q = pick([
      [`Combien d'élèves ont au moins $${k}$ frères et sœurs ?`, eff.slice(k).reduce((x, y) => x + y), `Additionne les effectifs des valeurs $${k}$ à $5$ : « au moins $${k}$ » veut dire $${k}$ ou plus.`, `$${eff.slice(k).join(" + ")} = ${eff.slice(k).reduce((x, y) => x + y)}$`],
      ["Combien d'élèves ont été interrogés ?", N, "L'effectif total est la somme de tous les effectifs.", `$${eff.join(" + ")} = ${N}$`],
      ["Quel nombre de frères et sœurs est le plus fréquent ?", eff.indexOf(Math.max(...eff)), "Cherche le bâton le plus haut, puis lis sa valeur sur l'axe horizontal.", `Le bâton le plus haut est en $${eff.indexOf(Math.max(...eff))}$ (effectif $${Math.max(...eff)}$).`],
      [`Combien d'élèves ont moins de $${k}$ frères et sœurs ?`, eff.slice(0, k).reduce((x, y) => x + y), `« Moins de $${k}$ » : les valeurs $0$ à $${k - 1}$, sans $${k}$.`, `$${eff.slice(0, k).join(" + ")} = ${eff.slice(0, k).reduce((x, y) => x + y)}$`]
    ]);
    return {
      enonce: `On a demandé à des élèves combien ils ont de frères et sœurs. ${Q[0]}`,
      figure: graph(o), mode: "nombre", prefixe: "Réponse :", attendu: Q[1],
      aides: ["Lis la hauteur de chaque bâton sur l'axe vertical : c'est l'effectif.", Q[2], "Vérifie ta lecture sur le quadrillage."],
      solution: `Effectifs lus : $${eff.join(" ; ")}$ pour $0$ à $5$ frères et sœurs. ${Q[3]}.`
    };
  };

  // ST04 : lire un graphique en repérant l'origine, les unités et les graduations
  GEN["am-lire-graphique"] = function () {
    if (Math.random() < 0.5) {
      // Histogramme : l'axe horizontal ne commence pas à 0, un carreau vertical vaut 1 ou 2
      const w = pick([5, 10]), a0 = w === 5 ? pick([5, 10, 15]) : pick([10, 20]);
      const ystep = pick([1, 2]), yetiq = ystep === 1 ? 5 : 10;
      const eff = Array.from({ length: 5 }, () => ystep * rand(1, 13));
      const ymax = Math.max(...eff) + 1.5 * ystep;
      const N = eff.reduce((x, y) => x + y), k = rand(1, 3);
      const cl = (j) => `[${a0 + j * w}\\,;${a0 + (j + 1) * w}[`;
      const Q = pick([
        [`Combien d'élèves mettent entre $${a0 + k * w}$ et $${a0 + (k + 1) * w}$ minutes (classe $${cl(k)}$) ?`, eff[k], `Le rectangle de la classe $${cl(k)}$ a une hauteur de $${eff[k]}$.`],
        [`Combien d'élèves mettent moins de $${a0 + (k + 1) * w}$ minutes ?`, eff.slice(0, k + 1).reduce((x, y) => x + y), `Classes de $${a0}$ à $${a0 + (k + 1) * w}$ : $${eff.slice(0, k + 1).join(" + ")} = ${eff.slice(0, k + 1).reduce((x, y) => x + y)}$.`],
        ["Combien d'élèves ont été interrogés ?", N, `$${eff.join(" + ")} = ${N}$.`],
        ["Sur l'axe vertical, combien d'élèves représente un carreau ?", ystep, `Entre deux nombres écrits, il y a $${yetiq / ystep}$ carreaux pour $${yetiq}$ élèves : un carreau vaut $${ystep}$.`]
      ]);
      const o = {
        xmin: a0, xmax: a0 + 5.7 * w, ymin: 0, ymax, xstep: w, ystep, yetiq, h: 270, padL: 30, padB: 22,
        xlabel: "min", ylabel: "effectif",
        rects: eff.map((e, j) => ({ a: a0 + j * w, b: a0 + (j + 1) * w, h: e })),
        aria: `Histogramme des temps de trajet par classes de ${w} minutes à partir de ${a0} minutes`
      };
      return {
        enonce: `On a relevé le temps de trajet domicile-lycée d'élèves, en minutes. ${Q[0]}`,
        figure: graph(o), mode: "nombre", prefixe: "Réponse :", attendu: Q[1],
        aides: [
          `Repère les unités : l'axe horizontal commence à $${a0}$ (pas à $0$) et chaque rectangle couvre $${w}$ minutes.`,
          `Sur l'axe vertical, un nombre est écrit tous les $${yetiq}$ : un carreau vaut donc $${ystep}$ élève${ystep > 1 ? "s" : ""}.`,
          Q[2]
        ],
        solution: `Effectifs lus, classe par classe : $${eff.join(" ; ")}$. ${Q[2]}`
      };
    }
    // Courbe de température : l'axe vertical commence à 18 ou 20, un carreau horizontal vaut 2 h
    const tmin = rand(21, 24), d = rand(5, 8), tmax = tmin + d;
    const T = [tmin + 2, tmin + 1, tmin, tmin + 1, tmin + Math.round(0.4 * d), tmin + Math.round(0.7 * d), tmax - 1, tmax, tmax - 1, tmin + Math.round(0.6 * d), tmin + Math.round(0.45 * d), tmin + Math.round(0.35 * d), tmin + 2];
    const f = (x) => { const i = Math.min(11, Math.floor(x / 2)); return T[i] + ((T[i + 1] - T[i]) * (x - 2 * i)) / 2; };
    const ymin = 2 * Math.floor((tmin - 2) / 2);
    const h = pick([2, 6, 10, 18, 22]);
    const Q = pick([
      [`Quelle est la température à $${h}$ h ?`, T[h / 2], `Repère $${h}$ h : c'est la graduation entre $${h - 2}$ et $${h + 2}$. Monte jusqu'à la courbe, puis lis la température : $${T[h / 2]}\\,°C$.`, "°C"],
      ["À quelle heure la température est-elle la plus élevée ?", 14, `Le point le plus haut de la courbe est à $14$ h ($${tmax}\\,°C$).`, "h"],
      ["De combien de degrés la température monte-t-elle entre $4$ h et $14$ h ?", d, `À $4$ h : $${tmin}\\,°C$. À $14$ h : $${tmax}\\,°C$. Hausse : $${tmax} - ${tmin} = ${d}\\,°C$.`, "°C"]
    ]);
    const o = {
      xmin: 0, xmax: 25.6, ymin, ymax: tmax + 2.6, xstep: 2, xetiq: 4, ystep: 1, yetiq: 2, h: 290, padL: 30, padB: 22,
      xlabel: "heure (h)", ylabel: "°C",
      curves: [{ f, a: 0, b: 24, closed: false }],
      points: T.map((t, i) => ({ x: 2 * i, y: t })),
      aria: `Courbe de la température au cours d'une journée, de 0 h à 24 h, axe vertical commençant à ${ymin} °C`
    };
    return {
      enonce: `La courbe donne la température relevée à Mamoudzou au cours d'une journée. ${Q[0]}`,
      figure: graph(o), mode: "nombre", prefixe: "Réponse :", suffixe: Q[3], attendu: Q[1],
      aides: [
        `Attention à l'origine : l'axe vertical commence à $${ymin}\\,°C$, pas à $0$.`,
        "Repère les unités : sur l'axe horizontal un carreau vaut $2$ h, sur l'axe vertical un carreau vaut $1\\,°C$.",
        Q[2]
      ],
      solution: Q[2]
    };
  };

  // ST05 : passer du graphique aux données et vice-versa
  GEN["am-graphique-donnees"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      // Des données au diagramme circulaire
      const N = pick([36, 40, 60, 72, 90, 120]), noms = ["Bus", "À pied", "Taxi", "Voiture"];
      let eff; do { const c = [rand(1, N - 3), rand(1, N - 3), rand(1, N - 3)].sort((x, y) => x - y); eff = [c[0], c[1] - c[0], c[2] - c[1], N - c[2]]; } while (eff.some((e) => e < N / 12));
      const k = rand(0, 3), ang = (eff[k] * 360) / N;
      return {
        enonce: `On a demandé à $${N}$ élèves comment ils viennent au lycée. On veut représenter ces données par un diagramme circulaire. Quel angle faut-il donner au secteur « ${noms[k]} » ?`,
        tableau: { var: "\\text{Transport}", nom: "\\text{Effectif}", x: noms.map((n) => `\\text{${n}}`), y: eff },
        mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: ang,
        erreurs: [{ valeur: +((eff[k] * 100) / N).toFixed(2), message: "Ça, c'est le pourcentage : le disque entier fait $360°$, pas $100$." }],
        aides: ["Le disque entier ($360°$) représente tout l'effectif.", `Les angles sont proportionnels aux effectifs : $${N}$ élèves $\\to 360°$.`, `$\\dfrac{${eff[k]}}{${N}} \\times 360$.`],
        solution: `$\\dfrac{${eff[k]}}{${N}} \\times 360 = ${ang}°$.`
      };
    }
    if (t === 1) {
      // Du diagramme aux données : retrouver le bâton manquant
      const eff = Array.from({ length: 6 }, () => rand(1, 9));
      const k = rand(1, 4), N = eff.reduce((x, y) => x + y);
      const o = {
        xmin: -0.8, xmax: 6.4, ymin: -0.8, ymax: 10, h: 240, xlabel: "livres", ylabel: "effectif",
        bars: eff.map((e, j) => ({ x: j, y: e })).filter((b) => b.x !== k),
        marques: [{ x: k, y: 0.5, texte: "?" }],
        aria: `Diagramme en bâtons du nombre de livres lus, de 0 à 5, le bâton de ${k} est effacé`
      };
      const autres = eff.filter((_, j) => j !== k), S = autres.reduce((x, y) => x + y);
      return {
        enonce: `On a demandé à $${N}$ élèves combien de livres ils ont lus cet été. Le bâton de la valeur $${k}$ a été effacé. Combien d'élèves ont lu $${k}$ livre${k > 1 ? "s" : ""} ?`,
        figure: graph(o), mode: "nombre", prefixe: "Réponse :", attendu: eff[k],
        aides: ["Lis les effectifs de tous les bâtons visibles.", `Additionne-les : $${autres.join(" + ")} = ${S}$.`, `Il manque ce qu'il faut pour arriver à $${N}$ : $${N} - ${S}$.`],
        solution: `Bâtons visibles : $${autres.join(" + ")} = ${S}$. Donc $${N} - ${S} = ${eff[k]}$ élèves ont lu $${k}$ livre${k > 1 ? "s" : ""}.`
      };
    }
    // Du diagramme en fréquences aux effectifs
    const N = pick([200, 300, 400, 500]);
    let fq; do { fq = Array.from({ length: 5 }, () => 5 * rand(1, 7)); } while (fq.reduce((x, y) => x + y) >= 100 || fq.reduce((x, y) => x + y) < 65);
    fq.push(100 - fq.reduce((x, y) => x + y));
    fq = shuffle(fq);
    const k = rand(0, 5), n = (fq[k] * N) / 100;
    const o = {
      xmin: -0.8, xmax: 6.4, ymin: -2.5, ymax: Math.max(...fq) + 4, ystep: 5, yetiq: 10, h: 260,
      xlabel: "repas", ylabel: "fréquence (%)",
      bars: fq.map((f, j) => ({ x: j, y: f })),
      aria: "Diagramme en bâtons des fréquences en pourcentage du nombre de repas pris à la cantine par semaine, de 0 à 5"
    };
    return {
      enonce: `Le diagramme donne la répartition (en $\\%$) des $${N}$ élèves d'un lycée selon le nombre de repas pris à la cantine par semaine. Combien d'élèves prennent $${k}$ repas par semaine ?`,
      figure: graph(o), mode: "nombre", prefixe: "Réponse :", attendu: n,
      erreurs: [{ valeur: fq[k], message: "Ça, c'est la fréquence en %. On demande un nombre d'élèves." }],
      aides: ["Sur l'axe vertical, un carreau vaut $5\\,\\%$.", `Le bâton de la valeur $${k}$ monte à $${fq[k]}\\,\\%$.`, `$${fq[k]}\\,\\%$ de $${N}$ : $\\dfrac{${fq[k]}}{100} \\times ${N}$.`],
      solution: `Lecture : $${fq[k]}\\,\\%$. Effectif : $\\dfrac{${fq[k]}}{100} \\times ${N} = ${n}$ élèves.`
    };
  };

  // ST03 : comparer deux boîtes à moustaches
  function boites(B) {
    const W = 320, pad = 18, lo = 0, hi = 20, H = 40 + 46 * B.length;
    const X = (v) => +(pad + 20 + ((v - lo) * (W - 2 * pad - 20)) / (hi - lo)).toFixed(1);
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="Boîtes à moustaches de ${B.map((b) => b.nom).join(" et ")}"><g class="g-grid">`;
    for (let v = lo; v <= hi; v += 2) s += `<line x1="${X(v)}" y1="8" x2="${X(v)}" y2="${H - 26}"/>`;
    s += `</g>`;
    B.forEach((b, i) => {
      const y = 30 + 46 * i;
      s += `<g class="g-box g-box-${i}"><line x1="${X(b.v[0])}" y1="${y}" x2="${X(b.v[1])}" y2="${y}"/><line x1="${X(b.v[3])}" y1="${y}" x2="${X(b.v[4])}" y2="${y}"/>`;
      s += `<line x1="${X(b.v[0])}" y1="${y - 7}" x2="${X(b.v[0])}" y2="${y + 7}"/><line x1="${X(b.v[4])}" y1="${y - 7}" x2="${X(b.v[4])}" y2="${y + 7}"/>`;
      s += `<rect x="${X(b.v[1])}" y="${y - 13}" width="${X(b.v[3]) - X(b.v[1])}" height="26"/><line class="med" x1="${X(b.v[2])}" y1="${y - 13}" x2="${X(b.v[2])}" y2="${y + 13}"/></g>`;
      s += `<text class="g-label" x="${pad - 6}" y="${y + 4}">${b.nom}</text>`;
    });
    s += `<g class="g-axis"><line x1="${X(lo)}" y1="${H - 26}" x2="${X(hi)}" y2="${H - 26}"/></g><g class="g-tick">`;
    for (let v = lo; v <= hi; v += 2) s += `<text x="${X(v)}" y="${H - 12}" text-anchor="middle">${v}</text>`;
    return s + `</g></svg>`;
  }
  FIGURES["boites-exemple"] = () => boites([{ nom: "A", v: [5, 9, 11, 13, 17] }, { nom: "B", v: [2, 6, 10, 15, 19] }]);
  GEN["am-boites"] = function () {
    const serie = () => { const v = [rand(0, 5), 0, 0, 0, 0]; v[1] = v[0] + rand(1, 4); v[2] = v[1] + rand(1, 4); v[3] = v[2] + rand(1, 4); v[4] = Math.min(20, v[3] + rand(1, 5)); return v; };
    let A, B; do { A = serie(); B = serie(); } while (A[2] === B[2] || A.join() === B.join());
    const fig = boites([{ nom: "A", v: A }, { nom: "B", v: B }]);
    const ctx = "Les boîtes à moustaches résument les notes sur $20$ de deux classes $A$ et $B$.";
    const lire = `Classe $A$ : min $${A[0]}$, $Q_1 = ${A[1]}$, médiane $${A[2]}$, $Q_3 = ${A[3]}$, max $${A[4]}$. Classe $B$ : min $${B[0]}$, $Q_1 = ${B[1]}$, médiane $${B[2]}$, $Q_3 = ${B[3]}$, max $${B[4]}$.`;
    const t = rand(0, 2);
    if (t === 0) {
      const best = A[2] > B[2] ? 0 : 1;
      return {
        enonce: `${ctx} Dans quelle classe au moins la moitié des élèves ont-ils une note supérieure ou égale à $${Math.max(A[2], B[2])}$ ?`,
        figure: fig, mode: "choix", choix: ["Classe $A$", "Classe $B$"], attendu: best,
        aides: ["Le trait à l'intérieur de la boîte est la médiane.", "Au moins la moitié des notes sont supérieures ou égales à la médiane.", "Compare les deux médianes."],
        solution: `${lire}\n\nLa médiane de la classe ${best ? "$B$" : "$A$"} vaut $${Math.max(A[2], B[2])}$ : au moins la moitié de ses élèves ont au moins cette note.`
      };
    }
    if (t === 1) {
      const c = Math.random() < 0.5 ? ["A", A] : ["B", B];
      return {
        enonce: `${ctx} Quel est l'écart interquartile de la classe $${c[0]}$ ?`,
        figure: fig, mode: "nombre", prefixe: "Q₃ − Q₁ =", attendu: c[1][3] - c[1][1],
        erreurs: [{ valeur: c[1][4] - c[1][0], message: "Ça, c'est l'étendue (max − min). L'écart interquartile, c'est $Q_3 - Q_1$ : la largeur de la boîte." }],
        aides: ["Les bords de la boîte sont $Q_1$ (à gauche) et $Q_3$ (à droite).", "Écart interquartile $= Q_3 - Q_1$.", `Pour la classe $${c[0]}$ : $Q_1 = ${c[1][1]}$ et $Q_3 = ${c[1][3]}$.`],
        solution: `$Q_3 - Q_1 = ${c[1][3]} - ${c[1][1]} = ${c[1][3] - c[1][1]}$. Environ la moitié des notes de la classe $${c[0]}$ sont dans cet intervalle.`
      };
    }
    const c = Math.random() < 0.5 ? ["A", A] : ["B", B];
    const [qn, pctTxt] = pick([[1, "$75\\,\\%$"], [3, "$25\\,\\%$"]]);
    const seuil = c[1][qn] + (Math.random() < 0.5 ? 0 : pick([-1, 1]));
    const vrai = seuil === c[1][qn];
    return {
      enonce: `${ctx} Vrai ou faux : « Dans la classe $${c[0]}$, au moins ${pctTxt} des élèves ont une note supérieure ou égale à $${seuil}$. »`,
      figure: fig, mode: "choix", choix: ["Vrai", "Faux"], attendu: vrai ? 0 : 1,
      aides: ["Au moins $75\\,\\%$ des valeurs sont supérieures ou égales à $Q_1$ ; au moins $25\\,\\%$ sont supérieures ou égales à $Q_3$.", `Pour la classe $${c[0]}$ : $Q_1 = ${c[1][1]}$ et $Q_3 = ${c[1][3]}$.`, `Compare $${seuil}$ avec ${qn === 1 ? "$Q_1$" : "$Q_3$"}.`],
      solution: `${qn === 1 ? "$Q_1$" : "$Q_3$"} $= ${c[1][qn]}$ dans la classe $${c[0]}$. ` + (vrai ? "L'affirmation est **vraie**." : `Le graphique permet d'affirmer cela pour $${c[1][qn]}$, pas pour $${seuil}$ : on répond **faux**.`)
    };
  };

  // PR03 : loi de probabilité, somme des probabilités
  GEN["am-proba-loi"] = function () {
    let ps; do { const a = rand(5, 40), b = rand(5, 40), c = rand(5, 30); ps = [a, b, c, 100 - a - b - c].map((x) => x / 100); } while (ps[3] < 0.05);
    const noms = ["\\text{Rouge}", "\\text{Vert}", "\\text{Bleu}", "\\text{Jaune}"];
    const miss = rand(0, 3);
    if (Math.random() < 0.5) return {
      enonce: "Une roue de loterie s'arrête sur une couleur. Voici les probabilités de chaque couleur. Détermine $p$.",
      tableau: { var: "\\text{Couleur}", nom: "\\text{Probabilité}", x: noms, y: ps.map((p, i) => (i === miss ? "p" : fr(p))) },
      mode: "nombre", prefixe: "p =", attendu: ps[miss], tolerance: 1e-6,
      aides: ["La somme des probabilités de toutes les issues vaut $1$.", `$p = 1 - (${ps.filter((_, i) => i !== miss).map(fr).join(" + ")})$.`, "Une probabilité est toujours entre $0$ et $1$."],
      solution: `$p = 1 - (${ps.filter((_, i) => i !== miss).map(fr).join(" + ")}) = ${fr(ps[miss])}$`
    };
    const [i, j] = shuffle([0, 1, 2, 3]).slice(0, 2).sort();
    return {
      enonce: `Une roue de loterie s'arrête sur une couleur, avec les probabilités ci-dessous. Quelle est la probabilité d'obtenir $${noms[i]}$ ou $${noms[j]}$ ?`,
      tableau: { var: "\\text{Couleur}", nom: "\\text{Probabilité}", x: noms, y: ps.map(fr) },
      mode: "nombre", prefixe: "p =", attendu: +(ps[i] + ps[j]).toFixed(6), tolerance: 1e-6,
      aides: ["La probabilité d'un événement est la somme des probabilités des issues qui le réalisent.", `$p = ${fr(ps[i])} + ${fr(ps[j])}$.`, "Les deux issues ne peuvent pas se produire en même temps : on additionne."],
      solution: `$p = ${fr(ps[i])} + ${fr(ps[j])} = ${fr(+(ps[i] + ps[j]).toFixed(6))}$`
    };
  };

  // PR05 / PR06 : tableau croisé, probabilités conditionnelles
  GEN["am-proba-tableau"] = function () {
    const k = pick([2, 3, 4, 5]);
    const a = rand(4, 15) * k, b = rand(4, 15) * k, c = rand(4, 15) * k, d = rand(4, 15) * k;
    const F = a + b, G = c + d, D = a + c, E = b + d, N = F + G;
    const lignes = [["", "\\text{Demi-pens.}", "\\text{Externe}", "\\text{Total}"], ["\\text{Fille}", a, b, F], ["\\text{Garçon}", c, d, G], ["\\text{Total}", D, E, N]];
    const Q = pick([
      ["P(F)", F, N, "On divise le nombre de filles par l'effectif total.", []],
      ["P(F \\cap D)", a, N, "$F \\cap D$ : l'élève est une fille **et** demi-pensionnaire. On divise par l'effectif total.", [[a, F, "Ça, c'est $P_F(D)$. Pour $P(F \\cap D)$, on divise par l'effectif **total**."]]],
      ["P_F(D)", a, F, "$P_F(D)$ : **parmi les filles**, la proportion de demi-pensionnaires. On divise par le nombre de filles.", [[a, N, "Ça, c'est $P(F \\cap D)$. Pour $P_F(D)$, on se place **parmi les filles** : on divise par $" + F + "$."], [a, D, "Ça, c'est $P_D(F)$. Pour $P_F(D)$, on divise par le nombre de **filles**."]]],
      ["P_D(F)", a, D, "$P_D(F)$ : **parmi les demi-pensionnaires**, la proportion de filles. On divise par le nombre de demi-pensionnaires.", [[a, F, "Ça, c'est $P_F(D)$. Pour $P_D(F)$, on divise par le nombre de **demi-pensionnaires**."], [a, N, "Ça, c'est $P(F \\cap D)$. Ici on se place parmi les demi-pensionnaires."]]],
      ["P(\\overline{F})", G, N, "$\\overline{F}$ : l'élève n'est pas une fille, donc c'est un garçon.", []]
    ]);
    return {
      enonce: `Voici la répartition des élèves de Seconde d'un lycée. On choisit un élève au hasard. On note $F$ : « l'élève est une fille » et $D$ : « l'élève est demi-pensionnaire ». Calcule $${Q[0]}$.`,
      tableau: { lignes }, mode: "nombre", prefixe: "Probabilité :", attendu: Q[1] / Q[2], tolerance: 0.0006,
      erreurs: Q[4].map(([n, d, msg]) => ({ valeur: n / d, message: msg })),
      aides: [Q[3], `Effectifs utiles : $${Q[1]}$ et $${Q[2]}$.`, "Réponds par une fraction, par exemple $12/50$, ou par un décimal arrondi au millième."],
      solution: `$${Q[0]} = \\dfrac{${Q[1]}}{${Q[2]}}${pgcd(Q[1], Q[2]) > 1 ? ` = ${frac(Q[1], Q[2])}` : ""} ${Number.isInteger((Q[1] * 1000) / Q[2]) ? "=" : "\\approx"} ${fr(+(Q[1] / Q[2]).toFixed(3))}$`
    };
  };

  GEN["am-proba-arbre"] = function () {
    const a = pick([0.2, 0.3, 0.4, 0.6, 0.7]), b = pick([0.1, 0.2, 0.4, 0.5, 0.8, 0.9]), c = pick([0.1, 0.3, 0.6, 0.7]);
    const ctx = `Dans un arbre pondéré, on lit $P(A) = ${fr(a)}$, $P_A(B) = ${fr(b)}$ et $P_{\\overline{A}}(B) = ${fr(c)}$.`;
    const t = rand(0, 2);
    if (t === 0) return {
      enonce: `${ctx} Calcule $P(A \\cap B)$.`, mode: "nombre", prefixe: "P(A ∩ B) =", attendu: +(a * b).toFixed(6), tolerance: 1e-6,
      erreurs: [{ valeur: +(a + b).toFixed(6), message: "Le long d'un chemin, on **multiplie** les probabilités." }],
      aides: ["$A \\cap B$ correspond au chemin qui passe par $A$ puis par $B$.", "Le long d'un chemin, on multiplie : $P(A \\cap B) = P(A) \\times P_A(B)$.", `$${fr(a)} \\times ${fr(b)}$.`],
      solution: `$P(A \\cap B) = P(A) \\times P_A(B) = ${fr(a)} \\times ${fr(b)} = ${fr(+(a * b).toFixed(6))}$`
    };
    if (t === 1) return {
      enonce: `${ctx} Calcule $P(\\overline{A} \\cap B)$.`, mode: "nombre", prefixe: "P(Ā ∩ B) =", attendu: +((1 - a) * c).toFixed(6), tolerance: 1e-6,
      erreurs: [{ valeur: +(a * c).toFixed(6), message: "$P(\\overline{A}) = 1 - P(A)$, pas $P(A)$." }],
      aides: ["$P(\\overline{A}) = 1 - P(A)$.", `$P(\\overline{A}) = ${fr(1 - a)}$.`, "Le long du chemin $\\overline{A}$ puis $B$, on multiplie."],
      solution: `$P(\\overline{A} \\cap B) = ${fr(1 - a)} \\times ${fr(c)} = ${fr(+((1 - a) * c).toFixed(6))}$`
    };
    const pB = +(a * b + (1 - a) * c).toFixed(6);
    return {
      enonce: `${ctx} Calcule $P(B)$.`, mode: "nombre", prefixe: "P(B) =", attendu: pB, tolerance: 1e-6,
      erreurs: [{ valeur: +(a * b).toFixed(6), message: "C'est seulement $P(A \\cap B)$ : il faut aussi ajouter le chemin qui passe par $\\overline{A}$." }],
      aides: ["Deux chemins mènent à $B$ : par $A$ et par $\\overline{A}$.", "On additionne les probabilités des deux chemins (formule des probabilités totales).", `$P(B) = ${fr(a)} \\times ${fr(b)} + ${fr(1 - a)} \\times ${fr(c)}$.`],
      solution: `$P(B) = ${fr(a)} \\times ${fr(b)} + ${fr(1 - a)} \\times ${fr(c)} = ${fr(+(a * b).toFixed(6))} + ${fr(+((1 - a) * c).toFixed(6))} = ${fr(pB)}$`
    };
  };

  GEN["am-proba-notation"] = function () {
    const [ctx, A, B, ph] = pick([
      ["On choisit au hasard un élève du lycée.", "l'élève est une fille", "l'élève fait du sport", ["que l'élève soit une fille qui fait du sport", "sachant que l'élève est une fille, qu'elle fasse du sport", "parmi les élèves qui font du sport, de choisir une fille", "que l'élève soit une fille ou fasse du sport"]],
      ["On choisit au hasard une personne qui a fait un test de dépistage.", "la personne est malade", "le test est positif", ["que la personne soit malade et ait un test positif", "sachant que la personne est malade, que son test soit positif", "sachant que le test est positif, que la personne soit malade", "que la personne soit malade ou ait un test positif"]],
      ["On choisit au hasard un client d'un magasin.", "le client a une carte de fidélité", "le client achète un produit en promotion", ["que le client ait une carte et achète un produit en promotion", "parmi les clients qui ont une carte, qu'il achète un produit en promotion", "parmi les clients qui achètent un produit en promotion, qu'il ait une carte", "que le client ait une carte ou achète un produit en promotion"]]
    ]);
    const nots = ["P(A \\cap B)", "P_A(B)", "P_B(A)", "P(A \\cup B)"];
    const k = rand(0, 3);
    return {
      enonce: `${ctx} On note $A$ : « ${A} » et $B$ : « ${B} ». Comment note-t-on la probabilité ${ph[k]} ?`,
      mode: "choix", choix: nots.map((x) => `$${x}$`), attendu: k,
      aides: ["« Et » : intersection $\\cap$. « Ou » : réunion $\\cup$.", "« Sachant que… » ou « parmi… » : probabilité conditionnelle. La condition se met en indice.", "$P_A(B)$ : on se place parmi les issues de $A$ et on cherche la probabilité de $B$."],
      solution: `C'est $${nots[k]}$. ` + ["« Et » : les deux événements à la fois.", "On sait que $A$ est réalisé : $A$ est en indice.", "On sait que $B$ est réalisé : $B$ est en indice.", "« Ou » : au moins l'un des deux."][k]
    };
  };

  /* ---------- Seconde, chapitre 1 : ensembles de nombres, intervalles, valeur absolue ---------- */

  /* Droite graduée avec un ou deux intervalles. Un intervalle : { a, b, ga, gb, label } ;
     a = -Infinity ou b = Infinity pour une borne infinie ; ga / gb : borne incluse. */
  function droite(o) {
    const W = 320, pad = 18, ints = o.intervalles || [], plusieurs = ints.length > 1;
    const H = plusieurs ? 50 + 18 * ints.length : 46;
    const ux = (W - 2 * pad) / (o.max - o.min);
    const X = (x) => +(pad + (Math.min(Math.max(x, o.min - 0.7), o.max + 0.7) - o.min) * ux).toFixed(1);
    const y0 = H - 20;
    const pasTexte = o.max - o.min > 12 ? 2 : 1;
    let s = `<svg class="graph droite" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria || "Droite graduée"}">`;
    s += `<g class="g-axis"><line x1="4" y1="${y0}" x2="${W - 6}" y2="${y0}"/><path d="M${W - 2} ${y0} l-8 -4 v8z"/></g><g class="g-tick">`;
    for (let x = Math.ceil(o.min); x <= o.max; x++) {
      s += `<line class="g-graduation" x1="${X(x)}" y1="${y0 - 4}" x2="${X(x)}" y2="${y0 + 4}"/>`;
      if (x % pasTexte === 0 && (!o.etiquettes || o.etiquettes.includes(x))) s += `<text x="${X(x)}" y="${y0 + 16}" text-anchor="middle">${String(x).replace("-", "−")}</text>`;
    }
    s += `</g>`;
    const crochet = (x, y, dir, k) => `<path class="g-crochet g-crochet-${k}" d="M${x + 5 * dir} ${y - 8} H${x} V${y + 8} H${x + 5 * dir}"/>`;
    // Un seul intervalle : sur l'axe. Plusieurs : chacun sur sa ligne au-dessus de l'axe, avec des repères pointillés.
    ints.forEach((I, k) => {
      const y = plusieurs ? y0 - 16 - 18 * k : y0, xa = X(I.a), xb = X(I.b);
      if (plusieurs) [I.a, I.b].filter(isFinite).forEach((x) => { s += `<line class="g-guide" x1="${X(x)}" y1="${y}" x2="${X(x)}" y2="${y0}"/>`; });
      s += `<line class="g-int g-int-${k}" x1="${xa}" y1="${y}" x2="${xb}" y2="${y}"/>`;
      if (isFinite(I.a)) s += crochet(xa, y, I.ga ? 1 : -1, k);
      if (isFinite(I.b)) s += crochet(xb, y, I.gb ? -1 : 1, k);
      if (I.label) s += isFinite(I.a) && xa > 24
        ? `<text class="g-clabel g-curve-${k}" x="${xa - 9}" y="${y + 5}" text-anchor="end">${I.label}</text>`
        : `<text class="g-clabel g-curve-${k}" x="${xb + 9}" y="${y + 5}">${I.label}</text>`;
    });
    (o.points || []).forEach((p) => {
      s += `<circle class="g-point" cx="${X(p.x)}" cy="${y0}" r="4"/>`;
      if (p.label) s += `<text class="g-plabel" x="${X(p.x)}" y="${y0 - 10}" text-anchor="middle">${p.label}</text>`;
    });
    return s + `</svg>`;
  }

  FIGURES["intervalle-exemple"] = () => droite({ min: -4, max: 5, intervalles: [{ a: -2, b: 3, ga: true, gb: false }], aria: "Droite graduée : l'intervalle [−2 ; 3[, crochet fermé en −2 et ouvert en 3" });
  FIGURES["intervalle-infini"] = () => droite({ min: -4, max: 5, intervalles: [{ a: -Infinity, b: 1, ga: false, gb: true }], aria: "Droite graduée : l'intervalle ]−∞ ; 1], colorié jusqu'au bout à gauche, crochet fermé en 1" });
  FIGURES["inter-union"] = () => droite({ min: -4, max: 6, intervalles: [{ a: -3, b: 2, ga: true, gb: true, label: "I" }, { a: 0, b: 5, ga: false, gb: true, label: "J" }], aria: "Droite graduée : I = [−3 ; 2] et J = ]0 ; 5]" });
  FIGURES["valeur-absolue"] = () => droite({ min: -3, max: 5, intervalles: [{ a: -1, b: 3, ga: true, gb: true }], points: [{ x: 1, label: "1" }], aria: "Droite graduée : les nombres à une distance au plus 2 de 1 forment l'intervalle [−1 ; 3]" });

  const SETS = ["\\mathbb{N}", "\\mathbb{Z}", "\\mathbb{D}", "\\mathbb{Q}", "\\mathbb{R}"];
  const NOMS_SETS = ["les entiers naturels", "les entiers relatifs", "les décimaux", "les rationnels", "les réels"];

  /* Un nombre au hasard et le plus petit ensemble qui le contient (0 = N … 4 = R) */
  function nombreEnsemble() {
    const cat = pick([0, 0, 1, 1, 2, 2, 3, 3, 4]);
    const T = [
      [ // N
        () => { const n = rand(0, 25); return [`${n}`, `$${n}$ est un entier positif.`]; },
        () => { const k = rand(2, 9), d = rand(2, 6); return [`\\dfrac{${k * d}}{${d}}`, `$\\dfrac{${k * d}}{${d}} = ${k}$ : c'est un entier positif, même s'il est écrit en fraction.`]; },
        () => { const k = rand(2, 12); return [`\\sqrt{${k * k}}`, `$\\sqrt{${k * k}} = ${k}$ car $${k}^2 = ${k * k}$ : c'est un entier positif.`]; }
      ],
      [ // Z
        () => { const n = -rand(1, 30); return [`${n}`, `$${n}$ est un entier négatif : il est dans $\\mathbb{Z}$ mais pas dans $\\mathbb{N}$.`]; },
        () => { const k = rand(2, 9), d = rand(2, 6); return [`-\\dfrac{${k * d}}{${d}}`, `$-\\dfrac{${k * d}}{${d}} = -${k}$ : c'est un entier négatif.`]; },
        () => { const k = rand(2, 9); return [`-\\sqrt{${k * k}}`, `$-\\sqrt{${k * k}} = -${k}$ : c'est un entier négatif.`]; }
      ],
      [ // D
        () => { let x; do { x = rand(-999, 999) / pick([10, 100]); } while (Number.isInteger(x)); return [nb(x), `$${nb(x)}$ s'écrit avec un nombre fini de chiffres après la virgule, mais ce n'est pas un entier.`]; },
        () => { const [n, d] = pick([[3, 4], [1, 8], [7, 20], [2, 5], [9, 25], [3, 2], [1, 5], [7, 4], [5, 8], [11, 50]]); return [`\\dfrac{${n}}{${d}}`, `$\\dfrac{${n}}{${d}} = ${nb(n / d)}$ : un nombre fini de chiffres après la virgule (le dénominateur $${d}$ n'a que $2$ et $5$ comme facteurs premiers).`]; }
      ],
      [ // Q
        () => {
          const [n, d] = pick([[1, 3], [2, 3], [5, 6], [2, 7], [4, 9], [10, 3], [1, 6], [5, 7], [7, 12], [1, 11]]), s = Math.random() < 0.3 ? "-" : "";
          return [`${s}\\dfrac{${n}}{${d}}`, `$${s}\\dfrac{${n}}{${d}} \\approx ${s}${nb(+(n / d).toFixed(4))}\\ldots$ : l'écriture décimale ne s'arrête jamais (le dénominateur contient un facteur premier autre que $2$ et $5$). C'est un quotient d'entiers, donc un rationnel, mais pas un décimal.`];
        }
      ],
      [ // R
        () => pick([
          ["\\sqrt{2}", "$\\sqrt{2} \\approx 1{,}414\\ldots$ est **irrationnel** : il ne peut pas s'écrire comme un quotient de deux entiers."],
          ["\\sqrt{3}", "$\\sqrt{3}$ est **irrationnel** : $3$ n'est pas le carré d'un entier, et $\\sqrt{3}$ ne s'écrit pas comme un quotient d'entiers."],
          ["\\sqrt{5}", "$\\sqrt{5}$ est **irrationnel** : $5$ n'est pas le carré d'un entier."],
          ["\\pi", "$\\pi \\approx 3{,}14159\\ldots$ est **irrationnel** : ses décimales ne s'arrêtent jamais et ne se répètent pas."],
          ["1 + \\sqrt{2}", "$\\sqrt{2}$ est irrationnel, donc $1 + \\sqrt{2}$ aussi."],
          ["\\dfrac{\\pi}{2}", "$\\pi$ est irrationnel, donc $\\dfrac{\\pi}{2}$ aussi."]
        ])
      ]
    ];
    const [tex, expl] = pick(T[cat])();
    return { tex, cat, expl };
  }

  GEN["ens-plus-petit"] = function () {
    const N = nombreEnsemble();
    return {
      enonce: `Quel est le **plus petit** ensemble de nombres auquel appartient $${N.tex}$ ?`,
      mode: "choix", choix: SETS.map((e) => `$${e}$`), attendu: N.cat,
      aides: [
        "Commence par simplifier le nombre si c'est possible (fraction, racine carrée).",
        "Rappel : $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$. Teste les ensembles dans cet ordre.",
        "Décimal : un nombre **fini** de chiffres après la virgule. Rationnel : un quotient de deux entiers."
      ],
      solution: `${N.expl}\n\nLe plus petit ensemble qui contient $${N.tex}$ est $${SETS[N.cat]}$ (${NOMS_SETS[N.cat]}).`
    };
  };

  GEN["ens-vrai-faux"] = function () {
    if (Math.random() < 0.2) {
      let a = rand(0, 4), b; do { b = rand(0, 4); } while (b === a);
      const vrai = a < b;
      return {
        enonce: `Vrai ou faux : $${SETS[a]} \\subset ${SETS[b]}$ ?`,
        mode: "choix", choix: ["Vrai", "Faux"], attendu: vrai ? 0 : 1,
        aides: ["$A \\subset B$ se lit « $A$ est inclus dans $B$ » : tous les nombres de $A$ sont aussi dans $B$.", "Rappel : $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$.", `Cherche un nombre de $${SETS[Math.max(a, b)]}$ qui n'est pas dans $${SETS[Math.min(a, b)]}$.`],
        solution: `On a $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$. ` + (vrai
          ? `Donc $${SETS[a]} \\subset ${SETS[b]}$ : **vrai**.`
          : `**Faux** : par exemple $${["", "-1", "0{,}5", "\\dfrac{1}{3}", "\\sqrt{2}"][a]}$ est dans $${SETS[a]}$ mais pas dans $${SETS[b]}$.`)
      };
    }
    const N = nombreEnsemble(), t = rand(0, 4), vrai = N.cat <= t;
    return {
      enonce: `Vrai ou faux : $${N.tex} \\in ${SETS[t]}$ ?`,
      mode: "choix", choix: ["Vrai", "Faux"], attendu: vrai ? 0 : 1,
      aides: [
        `Le symbole $\\in$ se lit « appartient à ». $${SETS[t]}$, ce sont ${NOMS_SETS[t]}.`,
        "Simplifie d'abord le nombre si c'est possible.",
        "Cherche le plus petit ensemble qui contient ce nombre : il appartient aussi à tous les ensembles plus grands."
      ],
      solution: `${N.expl} Son plus petit ensemble est $${SETS[N.cat]}$.\n\n` + (vrai ? `Comme $${SETS[N.cat]} \\subset ${SETS[t]}$, l'affirmation est **vraie**.` : `Il n'est pas dans $${SETS[t]}$ : l'affirmation est **fausse**.`)
    };
  };

  // Encadrement décimal d'amplitude 10^-n et arrondi à 10^-n près
  GEN["ens-arrondi"] = function () {
    let tex, v;
    if (Math.random() < 0.5) {
      [tex, v] = pick([["\\sqrt{2}", Math.SQRT2], ["\\sqrt{3}", Math.sqrt(3)], ["\\sqrt{5}", Math.sqrt(5)], ["\\sqrt{7}", Math.sqrt(7)], ["\\sqrt{10}", Math.sqrt(10)], ["\\sqrt{11}", Math.sqrt(11)], ["\\pi", Math.PI], ["2\\pi", 2 * Math.PI]]);
    } else {
      const q = pick([3, 6, 7, 9, 11, 12, 13]); let p; do { p = rand(1, 5 * q); } while (pgcd(p, q) !== 1);
      tex = `\\dfrac{${p}}{${q}}`; v = p / q;
    }
    const n = rand(1, 3), P = 10 ** n, nom = ["", "dixième", "centième", "millième"][n];
    const tronc = Math.floor(v * P + 1e-9) / P, sup = (Math.floor(v * P + 1e-9) + 1) / P, arr = Math.round(v * P) / P;
    const suivant = Math.floor(v * P * 10 + 1e-9) % 10;
    const ecran = v.toFixed(9).replace(".", "{,}");
    const pt = (x) => x.toFixed(n).replace(".", "{,}");
    const t = rand(0, 2);
    const base = { mode: "nombre", prefixe: "Réponse :" };
    if (t === 0) return Object.assign(base, {
      enonce: `La calculatrice affiche $${tex} \\approx ${ecran}$. Donne l'arrondi de $${tex}$ au ${nom} ($10^{-${n}}$ près).`,
      attendu: arr,
      erreurs: arr !== tronc ? [{ valeur: tronc, message: "Tu as coupé sans arrondir : regarde le chiffre qui suit." }] : [{ valeur: sup, message: `Le chiffre qui suit est $${suivant}$ : on ne monte pas.` }],
      aides: [`Garde $${n}$ chiffre${n > 1 ? "s" : ""} après la virgule : $${pt(tronc)}$…`, `Regarde le chiffre suivant : c'est $${suivant}$.`, "De $0$ à $4$ on garde, de $5$ à $9$ on ajoute $1$ au dernier chiffre gardé."],
      solution: `$${tex} \\approx ${ecran}$ : le chiffre après le ${nom} est $${suivant}$, ${suivant >= 5 ? "on arrondit au-dessus" : "on garde"}. L'arrondi au ${nom} est $${pt(arr)}$.`
    });
    const bas = t === 1;
    return Object.assign(base, {
      enonce: `La calculatrice affiche $${tex} \\approx ${ecran}$. On cherche un encadrement d'amplitude $10^{-${n}}$ : $a \\leqslant ${tex} < b$, avec $a$ et $b$ écrits avec $${n}$ chiffre${n > 1 ? "s" : ""} après la virgule. Que vaut $${bas ? "a" : "b"}$ ?`,
      prefixe: `${bas ? "a" : "b"} =`, attendu: bas ? tronc : sup,
      erreurs: [{ valeur: bas ? sup : tronc, message: `Ça, c'est $${bas ? "b" : "a"}$ : on cherche la borne ${bas ? "inférieure" : "supérieure"}.` }],
      aides: [`$10^{-${n}} = ${fr(1 / P)}$ : les bornes ont $${n}$ chiffre${n > 1 ? "s" : ""} après la virgule et sont écartées de $${fr(1 / P)}$.`, `$a$ : on coupe l'écriture après le ${nom}, soit $${pt(tronc)}$.`, `$b = a + ${fr(1 / P)}$.`],
      solution: `$${pt(tronc)} \\leqslant ${tex} < ${pt(sup)}$ : encadrement d'amplitude $10^{-${n}}$. Donc $${bas ? "a" : "b"} = ${pt(bas ? tronc : sup)}$.`
    });
  };

  /* Outils pour les intervalles */
  const bTex = (x) => (x === -Infinity ? "-\\infty" : x === Infinity ? "+\\infty" : nb(x));
  const intTex = (I) => `${I.ga ? "[" : "]"}${bTex(I.a)}\\,;${bTex(I.b)}${I.gb ? "]" : "["}`;
  function ineqTex(I) {
    if (!isFinite(I.a)) return `x ${I.gb ? "\\leqslant" : "<"} ${bTex(I.b)}`;
    if (!isFinite(I.b)) return `x ${I.ga ? "\\geqslant" : ">"} ${bTex(I.a)}`;
    return `${bTex(I.a)} ${I.ga ? "\\leqslant" : "<"} x ${I.gb ? "\\leqslant" : "<"} ${bTex(I.b)}`;
  }
  function intervalle() {
    const k = rand(0, 3);
    const a = rand(-8, 5), b = a + rand(2, 7);
    if (k === 0) return { a: -Infinity, b, ga: false, gb: Math.random() < 0.5 };
    if (k === 1) return { a, b: Infinity, ga: Math.random() < 0.5, gb: false };
    return { a, b, ga: Math.random() < 0.5, gb: Math.random() < 0.5 };
  }
  // Intervalles voisins : crochets changés, ou mauvais côté pour une borne infinie
  function voisins(I) {
    const v = [];
    if (isFinite(I.a)) v.push(Object.assign({}, I, { ga: !I.ga }));
    if (isFinite(I.b)) v.push(Object.assign({}, I, { gb: !I.gb }));
    if (isFinite(I.a) && isFinite(I.b)) v.push(Object.assign({}, I, { ga: !I.ga, gb: !I.gb }));
    if (!isFinite(I.a)) v.push({ a: I.b, b: Infinity, ga: I.gb, gb: false }, { a: I.b, b: Infinity, ga: !I.gb, gb: false });
    if (!isFinite(I.b)) v.push({ a: -Infinity, b: I.a, ga: false, gb: I.ga }, { a: -Infinity, b: I.a, ga: false, gb: !I.ga });
    return v;
  }
  const choixIntervalles = (bonne, autres, fmt) => melangeChoix(fmt(bonne), autres.map(fmt));
  const regleCrochets = "Borne **incluse** ($\\leqslant$, $\\geqslant$) : crochet tourné vers l'intérieur. Borne **exclue** ($<$, $>$) : crochet tourné vers l'extérieur.";

  GEN["int-inegalite"] = function () {
    const I = intervalle(), versIntervalle = Math.random() < 0.6;
    const fmt = versIntervalle ? (J) => `$x \\in ${intTex(J)}$` : (J) => `$${ineqTex(J)}$`;
    const c = choixIntervalles(I, voisins(I), fmt);
    return {
      enonce: versIntervalle ? `Traduis par un intervalle : $${ineqTex(I)}$.` : `Traduis par une inégalité : $x \\in ${intTex(I)}$.`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [
        isFinite(I.a) && isFinite(I.b) ? `Les bornes sont $${bTex(I.a)}$ et $${bTex(I.b)}$ : regarde si chacune est incluse ou exclue.` : `Il n'y a qu'une borne, $${bTex(isFinite(I.a) ? I.a : I.b)}$ : $x$ peut être aussi ${isFinite(I.a) ? "grand" : "petit"} que l'on veut.`,
        regleCrochets,
        "Du côté de $+\\infty$ ou de $-\\infty$, le crochet est **toujours ouvert** (tourné vers l'extérieur)."
      ],
      solution: `$${ineqTex(I)} \\iff x \\in ${intTex(I)}$`
    };
  };

  GEN["int-droite"] = function () {
    const I = intervalle();
    const lo = isFinite(I.a) ? I.a : I.b - 5, hi = isFinite(I.b) ? I.b : I.a + 5;
    const c = choixIntervalles(I, voisins(I), (J) => `$${intTex(J)}$`);
    return {
      enonce: "Quel intervalle est représenté sur la droite graduée ?",
      figure: droite({ min: Math.min(lo - 2, -1), max: Math.max(hi + 2, 1), intervalles: [I], aria: "Droite graduée avec un intervalle colorié" }),
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [
        "Repère où commence et où s'arrête la partie coloriée. Si elle va jusqu'au bout de la droite, la borne est $-\\infty$ ou $+\\infty$.",
        "Regarde le sens de chaque crochet : tourné vers la partie coloriée, la borne est incluse ; tourné vers l'extérieur, elle est exclue.",
        "Du côté de l'infini, le crochet est toujours ouvert."
      ],
      solution: `La partie coloriée correspond à $${ineqTex(I)}$, soit $x \\in ${intTex(I)}$.`
    };
  };

  GEN["int-appartient"] = function () {
    const I = intervalle();
    const bornes = [I.a, I.b].filter(isFinite);
    const lo = isFinite(I.a) ? I.a : I.b - 6, hi = isFinite(I.b) ? I.b : I.a + 6;
    const t = Math.random();
    const x = t < 0.5 ? pick(bornes) : t < 0.75 ? rand(lo - 3, hi + 3) : +(pick(bornes) + pick([-0.1, 0.1, -0.5, 0.5])).toFixed(1);
    const dedans = (x > I.a || (x === I.a && I.ga)) && (x < I.b || (x === I.b && I.gb));
    const borne = bornes.includes(x);
    return {
      enonce: `Le nombre $${nb(x)}$ appartient-il à l'intervalle $${intTex(I)}$ ?`,
      mode: "choix", choix: ["Oui", "Non"], attendu: dedans ? 0 : 1,
      aides: [
        `$x \\in ${intTex(I)}$ signifie $${ineqTex(I)}$.`,
        `Remplace $x$ par $${nb(x)}$ et vérifie ${isFinite(I.a) && isFinite(I.b) ? "les deux inégalités" : "l'inégalité"}.`,
        borne ? "C'est une borne de l'intervalle : regarde le sens du crochet." : "Place le nombre sur une droite graduée si besoin."
      ],
      solution: borne
        ? `$${nb(x)}$ est une borne, et le crochet est ${(x === I.a ? I.ga : I.gb) ? "fermé (tourné vers l'intérieur) : elle est **incluse**" : "ouvert (tourné vers l'extérieur) : elle est **exclue**"}.\n\n$${nb(x)} ${dedans ? "\\in" : "\\notin"} ${intTex(I)}$`
        : `$x \\in ${intTex(I)}$ signifie $${ineqTex(I)}$. Avec $x = ${nb(x)}$, ${dedans ? "c'est vérifié" : "ce n'est pas vérifié"}.\n\n$${nb(x)} ${dedans ? "\\in" : "\\notin"} ${intTex(I)}$`
    };
  };

  GEN["int-inter-union"] = function () {
    // I = [a ; b] et J = [c ; d] avec a < c < b < d (ils se chevauchent)
    const a = rand(-8, 0), c = a + rand(1, 4), b = c + rand(1, 4), d = b + rand(1, 4);
    const inf = Math.random() < 0.3;
    const I = { a: inf ? -Infinity : a, b, ga: inf ? false : Math.random() < 0.5, gb: Math.random() < 0.5, label: "I" };
    const J = { a: c, b: d, ga: Math.random() < 0.5, gb: Math.random() < 0.5, label: "J" };
    const inter = Math.random() < 0.5;
    const R = inter ? { a: c, b, ga: J.ga, gb: I.gb } : { a: I.a, b: d, ga: I.ga, gb: J.gb };
    const autre = inter ? { a: I.a, b: d, ga: I.ga, gb: J.gb } : { a: c, b, ga: J.ga, gb: I.gb };
    const c4 = choixIntervalles(R, [autre, Object.assign({}, R, { ga: !R.ga && isFinite(R.a) }), Object.assign({}, R, { gb: !R.gb }), { a: R.a, b: R.b, ga: inter ? I.ga && isFinite(I.a) : J.ga, gb: inter ? J.gb : I.gb }], (K) => `$${intTex(K)}$`);
    const op = inter ? "\\cap" : "\\cup";
    return {
      enonce: `On donne $I = ${intTex(I)}$ et $J = ${intTex(J)}$. Détermine $I ${op} J$.`,
      figure: droite({ min: Math.min(isFinite(I.a) ? I.a : c - 4, c) - 1, max: d + 1, intervalles: [I, J], aria: "Droite graduée avec les intervalles I et J" }),
      mode: "choix", choix: c4.choix, attendu: c4.attendu,
      aides: [
        inter ? "$I \\cap J$ (« I **inter** J ») : les nombres qui sont **à la fois** dans $I$ et dans $J$. C'est la partie commune." : "$I \\cup J$ (« I **union** J ») : les nombres qui sont dans $I$ **ou** dans $J$ (au moins l'un des deux). C'est tout ce qui est colorié.",
        inter ? `La partie commune va de $${bTex(c)}$ à $${bTex(b)}$.` : `La réunion va de $${bTex(I.a)}$ à $${bTex(d)}$.`,
        "Pour chaque borne, regarde de quel intervalle elle vient et garde son crochet."
      ],
      solution: `${inter ? "Partie commune" : "Tout ce qui est colorié"} : de $${bTex(R.a)}$ à $${bTex(R.b)}$. ` +
        `La borne $${bTex(R.b)}$ vient de ${inter ? "$I$" : "$J$"}${isFinite(R.a) ? `, la borne $${bTex(R.a)}$ vient de ${inter ? "$J$" : "$I$"}` : ""} : on garde leurs crochets.\n\n$I ${op} J = ${intTex(R)}$`
    };
  };

  GEN["abs-distance"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const x = Math.random() < 0.5 ? -rand(1, 30) : -rand(11, 99) / 10;
      return {
        enonce: `Calcule $|${nb(x)}|$.`,
        mode: "nombre", prefixe: `|${String(x).replace(".", ",").replace("-", "−")}| =`, attendu: -x,
        erreurs: [{ valeur: x, message: "Une valeur absolue est une **distance** : elle n'est jamais négative." }],
        aides: ["$|x|$ est la distance entre $x$ et $0$ sur la droite graduée.", "Une distance n'est jamais négative.", "Pour un nombre négatif, $|x| = -x$ : on enlève le signe moins."],
        solution: `$${nb(x)}$ est négatif, donc $|${nb(x)}| = -(${nb(x)}) = ${nb(-x)}$.`
      };
    }
    let a = rand(-9, 9), b; do { b = rand(-9, 9); } while (b === a);
    const d = Math.abs(a - b);
    const erreurs = [{ valeur: a - b, message: "Une distance n'est jamais négative : pense à la valeur absolue." }];
    if (Math.abs(a + b) !== d) erreurs.push({ valeur: Math.abs(a + b), message: `Attention au signe : $${a} - ${par(b)}$, ce n'est pas $${a} + ${par(b)}$.` });
    return {
      enonce: t === 1 ? `Calcule $|${a} - ${par(b)}|$.` : `Quelle est la distance entre les nombres $${a}$ et $${b}$ sur la droite graduée ?`,
      mode: "nombre", prefixe: t === 1 ? "Résultat :" : "Distance :", attendu: d,
      erreurs: erreurs.filter((e) => e.valeur !== d),
      aides: [
        t === 1 ? "Calcule d'abord ce qu'il y a entre les barres." : `La distance entre $a$ et $b$ est $|a - b|$ : ici $|${a} - ${par(b)}|$.`,
        `$${a} - ${par(b)} = ${a - b}$.`,
        "Une valeur absolue est une distance : le résultat est toujours positif."
      ],
      solution: `$|${a} - ${par(b)}| = |${a - b}| = ${d}$.` + (t === 2 ? ` Les nombres $${a}$ et $${b}$ sont à une distance de $${d}$ l'un de l'autre.` : "")
    };
  };

  GEN["abs-intervalle"] = function () {
    const a = randNZ(-6, 6), r = rand(1, 5), large = Math.random() < 0.6;
    const abs = `|x ${sg(-a)}|`, op = large ? "\\leqslant" : "<";
    const R = { a: a - r, b: a + r, ga: large, gb: large };
    const c = choixIntervalles(R, [{ a: a - r, b: a + r, ga: !large, gb: !large }, { a: -a - r, b: -a + r, ga: large, gb: large }, { a, b: a + r, ga: large, gb: large }], (K) => `$${intTex(K)}$`);
    return {
      enonce: `Traduis par un intervalle : $${abs} ${op} ${r}$.`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [
        `$|x - a|$ est la distance entre $x$ et $a$. Écris $${abs}$ sous la forme $|x - a|$ : ici $a = ${a}$.`,
        `On cherche les nombres $x$ à une distance ${large ? "inférieure ou égale" : "strictement inférieure"} à $${r}$ de $${a}$.`,
        `On part de $${a}$ et on va de $${r}$ à gauche et de $${r}$ à droite : de $${a - r}$ à $${a + r}$.`
      ],
      solution: `$${abs} = |x - ${par(a)}|$ : c'est la distance entre $x$ et $${a}$.\n\n$${abs} ${op} ${r} \\iff ${a - r} ${op} x ${op} ${a + r} \\iff x \\in ${intTex(R)}$`
    };
  };


  /* ---------- Seconde · Fonctions paires et impaires ---------- */
  FIGURES["courbe-paire"] = () => graph({
    xmin: -3.6, xmax: 3.6, ymin: -2.6, ymax: 3.6, h: 260,
    curves: [{ f: (x) => 0.5 * x * x - 2, a: -3, b: 3, closed: false, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: 2.6, dx: 28, dy: 6 }],
    points: [{ x: -2, y: 0, label: "M′", gauche: true }, { x: 2, y: 0, label: "M" }],
    aria: "Courbe de f(x) = 0,5x² − 2, symétrique par rapport à l'axe des ordonnées : f(−2) = f(2) = 0"
  });
  FIGURES["courbe-impaire"] = () => graph({
    xmin: -3.6, xmax: 3.6, ymin: -4.2, ymax: 4.2, h: 280,
    curves: [{ f: (x) => 0.25 * x * x * x - x, a: -3, b: 3, closed: false, label: "C<tspan class=\"sub\" dy=\"3\">g</tspan>", lx: 2.9, dx: -8, dy: 4 }],
    points: [{ x: -1, y: 0.75, label: "N′", gauche: true }, { x: 1, y: -0.75, label: "N" }],
    aria: "Courbe de g(x) = 0,25x³ − x, symétrique par rapport à l'origine : g(−1) = 0,75 et g(1) = −0,75"
  });

  const evalPoly = (coefs, x) => coefs.reduce((s, c) => s * x + c, 0);
  // f(−x) : on change le signe des coefficients des puissances impaires
  const polyMoinsX = (coefs) => coefs.map((c, i) => ((coefs.length - 1 - i) % 2 ? -c : c));
  const NOMS_PARITE = ["Paire", "Impaire", "Ni paire ni impaire"];

  GEN["parite-graphique"] = function () {
    const genre = rand(0, 2), variante = rand(0, 2), a = pick([-1, 1]);
    let f, xa = -3, xb = 3, explication;
    if (genre === 0) {
      const c = rand(-2, 2);
      f = variante === 0 ? (x) => a * (0.5 * x * x) + c : variante === 1 ? (x) => a * 0.25 * (x * x - 1) * (x * x - 6) : (x) => a * (Math.abs(x) - 1.5);
      explication = "La courbe est **symétrique par rapport à l'axe des ordonnées** : $f$ est paire.";
    } else if (genre === 1) {
      f = variante === 0 ? (x) => a * 0.75 * x : variante === 1 ? (x) => a * (0.25 * x * x * x - x) : (x) => a * 4 * x / (x * x + 1);
      explication = "La courbe est **symétrique par rapport à l'origine** du repère : $f$ est impaire.";
    } else if (variante === 0) {
      const h = pick([-1, 1]), k = rand(-2, 1);
      f = (x) => a * 0.5 * (x - h) * (x - h) + k;
      explication = "La courbe n'est symétrique ni par rapport à l'axe des ordonnées, ni par rapport à l'origine : $f$ n'est ni paire ni impaire.";
    } else if (variante === 1) {
      const k = pick([-2, -1, 1, 2]);
      f = (x) => a * (0.25 * x * x * x - x) + k;
      explication = "La courbe ne passe pas par l'origine et n'est symétrique ni par rapport à l'axe des ordonnées, ni par rapport à l'origine : $f$ n'est ni paire ni impaire.";
    } else {
      xb = 2; xa = -3;
      f = (x) => 0.5 * x * x - 2;
      explication = "La courbe ressemble à une courbe paire, mais $f$ est définie sur $[-3\\,;2]$, un intervalle qui **n'est pas symétrique** par rapport à $0$ : $f$ n'est ni paire ni impaire.";
    }
    let lo = Infinity, hi = -Infinity;
    for (let k = 0; k <= 60; k++) { const y = f(xa + ((xb - xa) * k) / 60); lo = Math.min(lo, y); hi = Math.max(hi, y); }
    lo = Math.min(Math.floor(lo), -1); hi = Math.max(Math.ceil(hi), 1);
    return {
      enonce: "Voici la courbe d'une fonction $f$ sur son ensemble de définition. La fonction $f$ est-elle paire, impaire, ou ni l'un ni l'autre ?",
      figure: graph({ xmin: -3.6, xmax: 3.6, ymin: lo - 0.6, ymax: hi + 0.6, ystep: hi - lo > 10 ? 2 : 1, curves: [{ f, a: xa, b: xb, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: xb, dx: -6, dy: -8 }], aria: "Courbe d'une fonction f dans un repère quadrillé" }),
      mode: "choix", choix: NOMS_PARITE.slice(), attendu: genre === 2 ? 2 : genre,
      aides: [
        "Regarde d'abord l'ensemble de définition : il doit être **symétrique par rapport à $0$** (de $-3$ à $3$ par exemple).",
        "Paire : la courbe se replie sur elle-même en pliant le long de l'**axe des ordonnées**.",
        "Impaire : en faisant tourner la courbe d'un demi-tour autour de l'**origine**, elle retombe sur elle-même."
      ],
      solution: explication
    };
  };

  GEN["parite-calcul"] = function () {
    const genre = rand(0, 2);
    let coefs;
    if (genre === 0) coefs = pick([[randNZ(-4, 4), 0, randNZ(-9, 9)], [randNZ(-2, 2), 0, randNZ(-5, 5), 0, rand(-6, 6)], [randNZ(-5, 5), 0, 0]]);
    else if (genre === 1) coefs = pick([[randNZ(-4, 4), 0, randNZ(-7, 7), 0], [randNZ(-7, 7), 0], [randNZ(-3, 3), 0, 0, 0]]);
    else {
      // au moins une puissance paire et une impaire, et f(1), f(−1) qui ne se compensent pas
      do { coefs = pick([[randNZ(-3, 3), randNZ(-6, 6), randNZ(-9, 9)], [randNZ(-3, 3), 0, randNZ(-5, 5), randNZ(-9, 9)], [randNZ(-4, 4), randNZ(-9, 9)]]); }
      while (evalPoly(coefs, 1) === evalPoly(coefs, -1) || evalPoly(coefs, 1) === -evalPoly(coefs, -1));
    }
    const mx = polyMoinsX(coefs), oppose = coefs.map((c) => -c);
    // f(−x) écrit en remplaçant x par (−x)
    const deg = coefs.length - 1;
    const remplace = coefs.map((c, i) => {
      const p = deg - i; if (c === 0) return "";
      const m = p === 0 ? "" : p === 1 ? "(-x)" : `(-x)^{${p}}`;
      return { c, m };
    }).filter(Boolean).map((t, k) => (k === 0 ? (t.c === -1 && t.m ? "-" : t.c === 1 && t.m ? "" : t.c) : (t.c < 0 ? " - " : " + ") + (Math.abs(t.c) === 1 && t.m ? "" : Math.abs(t.c))) + (t.m && Math.abs(t.c) !== 1 ? " \\times " : "") + t.m).join("");
    let solution = `$f$ est définie sur $\\mathbb{R}$, qui est symétrique par rapport à $0$.\n\n$f(-x) = ${remplace} = ${poly(mx)}$.\n\n`;
    if (genre === 0) solution += `On retrouve $f(x)$ : $f(-x) = f(x)$ pour tout réel $x$, donc $f$ est **paire**.`;
    else if (genre === 1) solution += `On obtient l'opposé : $-f(x) = ${poly(oppose)} = f(-x)$ pour tout réel $x$, donc $f$ est **impaire**.`;
    else {
      const f1 = evalPoly(coefs, 1), fm1 = evalPoly(coefs, -1);
      solution += `Ce n'est ni $f(x)$, ni $-f(x) = ${poly(oppose)}$. Pour le prouver, un contre-exemple suffit : $f(1) = ${f1}$ et $f(-1) = ${fm1}$.\n\n$f(-1) \\neq f(1)$ donc $f$ n'est pas paire, et $f(-1) \\neq -f(1)$ donc $f$ n'est pas impaire.`;
    }
    return {
      enonce: `Soit $f$ la fonction définie sur $\\mathbb{R}$ par $f(x) = ${poly(coefs)}$. Étudie sa parité.`,
      mode: "choix", choix: NOMS_PARITE.slice(), attendu: genre,
      aides: [
        "Calcule $f(-x)$ en remplaçant chaque $x$ par $(-x)$.",
        "$(-x)^2 = x^2$ et $(-x)^4 = x^4$ ; mais $(-x)^3 = -x^3$ et $(-x)^1 = -x$.",
        "Compare $f(-x)$ avec $f(x)$ (paire) puis avec $-f(x)$ (impaire)."
      ],
      solution
    };
  };

  GEN["parite-symetrique"] = function () {
    const paire = Math.random() < 0.5;
    const a = rand(1, 6), b = randNZ(-9, 9), signe = pick([-1, 1]);
    return {
      enonce: `$f$ est une fonction **${paire ? "paire" : "impaire"}** définie sur $\\mathbb{R}$, et $f(${signe * a}) = ${b}$. Combien vaut $f(${-signe * a})$ ?`,
      mode: "nombre", prefixe: `f(${-signe * a}) =`, attendu: paire ? b : -b,
      erreurs: [{ valeur: paire ? -b : b, message: paire ? "Une fonction **paire** vérifie $f(-x) = f(x)$ : l'image ne change pas de signe." : "Une fonction **impaire** vérifie $f(-x) = -f(x)$ : il faut prendre l'opposé." }],
      aides: [
        paire ? "Paire : $f(-x) = f(x)$ pour tout réel $x$." : "Impaire : $f(-x) = -f(x)$ pour tout réel $x$.",
        `Applique la formule avec $x = ${signe * a}$.`,
        paire ? "Sur la courbe : les points d'abscisses opposées ont la même ordonnée." : "Sur la courbe : les points d'abscisses opposées ont des ordonnées opposées."
      ],
      solution: paire
        ? `$f$ est paire, donc $f(${-signe * a}) = f(${signe * a}) = ${b}$.`
        : `$f$ est impaire, donc $f(${-signe * a}) = -f(${signe * a}) = ${-b}$.`
    };
  };


  /* ---------- Automatismes de géométrie (GE01 à GE05, programme de Seconde 2026) ---------- */
  // Petit dessin de figure : segments, points nommés et longueurs écrites sur les côtés
  function dessin(o) {
    let s = `<svg class="graph" viewBox="0 0 320 ${o.h || 220}" role="img" aria-label="${o.aria}">`;
    (o.segments || []).forEach(([a, b, k]) => { s += `<line class="g-curve${k ? " g-curve-1" : ""}" x1="${o.P[a][0]}" y1="${o.P[a][1]}" x2="${o.P[b][0]}" y2="${o.P[b][1]}"/>`; });
    if (o.droit) { const [x, y, dx, dy] = o.droit; s += `<path class="g-crochet" d="M${x + dx} ${y} V${y + dy} H${x}" style="stroke-width:1.6"/>`; }
    if (o.angle) { const [x, y, r, a1, a2] = o.angle; const p = (a) => [x + r * Math.cos(a), y - r * Math.sin(a)].map((v) => v.toFixed(1)).join(" "); s += `<path class="g-crochet g-crochet-1" d="M${p(a1)} A${r} ${r} 0 0 0 ${p(a2)}" style="stroke-width:2"/>`; }
    Object.keys(o.P).forEach((k) => { const [x, y, dx, dy] = o.P[k]; s += `<circle class="g-point" cx="${x}" cy="${y}" r="3.5"/><text class="g-plabel" x="${x + (dx || 0)}" y="${y + (dy || 0)}" text-anchor="middle">${k}</text>`; });
    (o.textes || []).forEach(([x, y, t]) => { s += `<text class="g-label" x="${x}" y="${y}" text-anchor="middle">${t}</text>`; });
    return s + `</svg>`;
  }

  GEN["am-repere-droite"] = function () {
    const min = rand(-6, -3), max = min + 9;
    const demi = Math.random() < 0.35;
    let x; do { x = rand(min + 1, max - 1) + (demi ? 0.5 : 0); } while (x === 0 || x >= max);
    return {
      enonce: "Quelle est l'abscisse du point $A$ sur cette droite graduée ?",
      figure: droite({ min, max, etiquettes: [0, 1], points: [{ x, label: "A" }], aria: "Droite graduée de 1 en 1, seuls 0 et 1 sont écrits, avec un point A" }),
      mode: "nombre", prefixe: "A :", attendu: x,
      erreurs: [{ valeur: -x, message: "Attention au signe : à gauche de $0$, les abscisses sont négatives." }],
      aides: ["Repère d'abord où se trouve $0$.", "Les graduations vont de $1$ en $1$. Compte les graduations entre $0$ et $A$.", demi ? "$A$ est au milieu de deux graduations : son abscisse se termine par $,5$." : `${x < 0 ? "À gauche de $0$, l'abscisse est négative." : "À droite de $0$, l'abscisse est positive."}`],
      solution: `$A$ a pour abscisse $${fr(x)}$.`
    };
  };

  GEN["am-coordonnees"] = function () {
    let x, y; do { x = rand(-4, 4); y = rand(-4, 4); } while (x === 0 || y === 0 || Math.abs(x) === Math.abs(y));
    const c = (a, b) => `$(${a}\\,;${b})$`;
    const ms = melangeChoix(c(x, y), [c(y, x), c(-x, y), c(x, -y), c(-y, -x)]);
    return {
      enonce: "Quelles sont les coordonnées du point $A$ ?",
      figure: graph({ xmin: -5.2, xmax: 5.2, ymin: -5.2, ymax: 5.2, points: [{ x, y, label: "A", gauche: x < 0 }], aria: "Point A dans un repère quadrillé" }),
      mode: "choix", choix: ms.choix, attendu: ms.attendu,
      aides: ["Les coordonnées s'écrivent $(x\\,;y)$ : d'abord l'abscisse (axe horizontal), puis l'ordonnée (axe vertical).", `Descends ou monte de $A$ jusqu'à l'axe horizontal : tu lis $x = ${x}$.`, `Va de $A$ jusqu'à l'axe vertical : tu lis $y = ${y}$.`],
      solution: `$A$ a pour abscisse $${x}$ et pour ordonnée $${y}$ : $A${c(x, y).slice(1, -1)}$.`
    };
  };

  GEN["am-perimetre"] = function () {
    const T = [
      () => { const L = rand(4, 15), l = rand(2, L - 1); return [`le périmètre d'un rectangle de $${L}$ cm sur $${l}$ cm`, 2 * (L + l), "cm", "Périmètre d'un rectangle : $2 \\times (L + \\ell)$.", L * l]; },
      () => { const c = rand(3, 12); return [`le périmètre d'un carré de côté $${c}$ cm`, 4 * c, "cm", "Périmètre d'un carré : $4 \\times c$.", c * c]; },
      () => { const [a, b, d] = shuffle([rand(3, 9), rand(4, 10), rand(5, 11)]); return [`le périmètre d'un triangle de côtés $${a}$ cm, $${b}$ cm et $${d}$ cm`, a + b + d, "cm", "Périmètre d'un polygone : la somme des longueurs de ses côtés.", null]; },
      () => { const r = rand(2, 9); return [`la longueur d'un cercle de rayon $${r}$ cm (valeur exacte)`, 2 * r, "π cm", "Longueur d'un cercle : $2\\pi r$. Donne le nombre devant $\\pi$.", r * r]; },
      () => { const d = rand(2, 9) * 2; return [`la longueur d'un cercle de diamètre $${d}$ cm (valeur exacte)`, d, "π cm", "Longueur d'un cercle : $\\pi \\times d$ (ou $2\\pi r$). Donne le nombre devant $\\pi$.", d * d / 4]; }
    ];
    const [quoi, rep, unite, regle, aire] = pick(T)();
    return {
      enonce: `Calcule ${quoi}.`,
      mode: "nombre", prefixe: "Réponse :", suffixe: unite, attendu: rep,
      erreurs: aire && aire !== rep ? [{ valeur: aire, message: "Ça, c'est une **aire**. Le périmètre est la longueur du tour de la figure." }] : [],
      aides: [regle, "Le périmètre est la longueur du tour : on additionne des longueurs, on ne les multiplie pas entre elles.", "Calcule de tête, étape par étape."],
      solution: `${regle} Ici : $${fr(rep)}$ ${unite}.`
    };
  };

  GEN["am-thales"] = function () {
    const k = pick([2, 3, 4, 1.5]);
    let am; do { am = rand(2, 6); } while (!Number.isInteger(am * k));
    let mn; do { mn = rand(2, 6); } while (!Number.isInteger(mn * k));
    const ab = am * k, bc = mn * k;
    const chercheBC = Math.random() < 0.5;
    // A en haut, B et C en bas ; M et N au rapport 1/k sur [AB] et [AC], donc (MN) parallèle à (BC)
    const A = [150, 26], B = [40, 196], C = [290, 196];
    const sur = (Q, t) => [+(A[0] + (Q[0] - A[0]) * t).toFixed(1), +(A[1] + (Q[1] - A[1]) * t).toFixed(1)];
    const M = sur(B, 1 / k), N = sur(C, 1 / k);
    const P = { A: [...A, 0, -9], B: [...B, -4, 18], C: [...C, 4, 18], M: [...M, -12, 2], N: [...N, 12, 2] };
    const txt = (v) => fr(v).replace("{,}", ",");
    const fig = dessin({
      P, h: 222, segments: [["A", "B"], ["A", "C"], ["B", "C"], ["M", "N", 1]],
      textes: [[(A[0] + M[0]) / 2 - 16, (A[1] + M[1]) / 2, txt(am)], [B[0] + 4, B[1] - 40, `AB = ${txt(ab)}`], chercheBC ? [(M[0] + N[0]) / 2, M[1] - 6, txt(mn)] : [(B[0] + C[0]) / 2, B[1] - 6, txt(bc)]],
      aria: "Triangle ABC avec M sur [AB], N sur [AC] et (MN) parallèle à (BC)"
    });
    const rapport = `\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}`;
    if (chercheBC) return {
      enonce: `$(MN) \\parallel (BC)$, $AM = ${am}$, $AB = ${fr(ab)}$ et $MN = ${mn}$. Calcule $BC$.`,
      figure: fig, mode: "nombre", prefixe: "BC =", attendu: bc,
      erreurs: [{ valeur: mn * am / ab, message: "Le rapport est inversé : $BC$ est plus grand que $MN$." }],
      aides: [`Thalès : $${rapport}$.`, `$\\dfrac{${am}}{${fr(ab)}} = \\dfrac{${mn}}{BC}$.`, `$BC = \\dfrac{${mn} \\times ${fr(ab)}}{${am}}$.`],
      solution: `Comme $(MN) \\parallel (BC)$ : $\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$, donc $BC = \\dfrac{${mn} \\times ${fr(ab)}}{${am}} = ${fr(bc)}$.`
    };
    return {
      enonce: `$(MN) \\parallel (BC)$, $AM = ${am}$, $AB = ${fr(ab)}$ et $BC = ${fr(bc)}$. Calcule $MN$.`,
      figure: fig, mode: "nombre", prefixe: "MN =", attendu: mn,
      erreurs: [{ valeur: bc * ab / am, message: "Le rapport est inversé : $MN$ est plus petit que $BC$." }],
      aides: [`Thalès : $${rapport}$.`, `$\\dfrac{${am}}{${fr(ab)}} = \\dfrac{MN}{${fr(bc)}}$.`, `$MN = \\dfrac{${am} \\times ${fr(bc)}}{${fr(ab)}}$.`],
      solution: `Comme $(MN) \\parallel (BC)$ : $\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$, donc $MN = \\dfrac{${am} \\times ${fr(bc)}}{${fr(ab)}} = ${fr(mn)}$.`
    };
  };

  GEN["am-trigo"] = function () {
    const P = { A: [60, 190, -10, 14], B: [270, 190, 10, 14], C: [60, 50, -10, 0] };
    const fig = dessin({ P, segments: [["A", "B"], ["B", "C"], ["C", "A"]], droit: [60, 190, 14, -14], angle: [270, 190, 34, Math.PI, Math.PI - 0.59], aria: "Triangle ABC rectangle en A, angle en B marqué" });
    if (Math.random() < 0.5) {
      const f = pick([["\\cos", "AB", "BC", "adjacent", "l'hypoténuse"], ["\\sin", "AC", "BC", "opposé", "l'hypoténuse"], ["\\tan", "AC", "AB", "opposé", "adjacent"]]);
      const all = ["AB", "AC", "BC"]; const frs = [];
      all.forEach((n) => all.forEach((d) => { if (n !== d) frs.push(`$\\dfrac{${n}}{${d}}$`); }));
      const bonne = `$\\dfrac{${f[1]}}{${f[2]}}$`;
      const ms = melangeChoix(bonne, shuffle(frs));
      return {
        enonce: `$ABC$ est rectangle en $A$. Que vaut $${f[0]}\\widehat{ABC}$ ?`,
        figure: fig, mode: "choix", choix: ms.choix, attendu: ms.attendu,
        aides: ["Repère l'hypoténuse : c'est le côté en face de l'angle droit, ici $[BC]$.", "Depuis l'angle $\\widehat{ABC}$ : le côté adjacent est $[AB]$, le côté opposé est $[AC]$.", "CAH SOH TOA : $\\cos = \\dfrac{\\text{adj}}{\\text{hyp}}$, $\\sin = \\dfrac{\\text{opp}}{\\text{hyp}}$, $\\tan = \\dfrac{\\text{opp}}{\\text{adj}}$."],
        solution: `$${f[0]}\\widehat{ABC} = \\dfrac{\\text{côté ${f[3]}}}{\\text{${f[4] === "adjacent" ? "côté adjacent" : "hypoténuse"}}} = \\dfrac{${f[1]}}{${f[2]}}$.`
      };
    }
    const T = [
      () => { const bc = rand(2, 9) * 2; return [`$\\widehat{ABC} = 60^\\circ$ et $BC = ${bc}$. On rappelle $\\cos 60^\\circ = 0{,}5$. Calcule $AB$.`, "AB =", bc / 2, `$\\cos 60^\\circ = \\dfrac{AB}{BC}$, donc $AB = ${bc} \\times 0{,}5 = ${bc / 2}$.`, "$\\cos \\widehat{ABC} = \\dfrac{AB}{BC}$ (adjacent sur hypoténuse)."]; },
      () => { const bc = rand(2, 9) * 2; return [`$\\widehat{ABC} = 30^\\circ$ et $BC = ${bc}$. On rappelle $\\sin 30^\\circ = 0{,}5$. Calcule $AC$.`, "AC =", bc / 2, `$\\sin 30^\\circ = \\dfrac{AC}{BC}$, donc $AC = ${bc} \\times 0{,}5 = ${bc / 2}$.`, "$\\sin \\widehat{ABC} = \\dfrac{AC}{BC}$ (opposé sur hypoténuse)."]; },
      () => { const ab = rand(2, 12); return [`$\\widehat{ABC} = 45^\\circ$ et $AB = ${ab}$. On rappelle $\\tan 45^\\circ = 1$. Calcule $AC$.`, "AC =", ab, `$\\tan 45^\\circ = \\dfrac{AC}{AB} = 1$, donc $AC = AB = ${ab}$.`, "$\\tan \\widehat{ABC} = \\dfrac{AC}{AB}$ (opposé sur adjacent)."]; },
      () => { const bc = rand(2, 10) * 10, c = pick([0.6, 0.8]); return [`$BC = ${bc}$ et $\\cos \\widehat{ABC} = ${fr(c)}$. Calcule $AB$.`, "AB =", bc * c, `$AB = BC \\times \\cos \\widehat{ABC} = ${bc} \\times ${fr(c)} = ${fr(bc * c)}$.`, "$\\cos \\widehat{ABC} = \\dfrac{AB}{BC}$, donc $AB = BC \\times \\cos \\widehat{ABC}$."]; }
    ];
    const [enonce, prefixe, rep, sol, regle] = pick(T)();
    return {
      enonce: `$ABC$ est rectangle en $A$. ${enonce}`, figure: fig,
      mode: "nombre", prefixe, attendu: rep,
      aides: ["Repère l'hypoténuse $[BC]$, puis le côté adjacent $[AB]$ et le côté opposé $[AC]$ à l'angle $\\widehat{ABC}$.", regle, "Remplace par les valeurs et calcule de tête."],
      solution: sol
    };
  };


  /* Séries « flash » d'un thème : mélange de ses générateurs */
  const THEMES = {
    "am-flash-cn": ["am-comparer", "am-fractions", "am-puissances", "am-ecritures", "am-ordre-grandeur", "am-coherence", "auto-conversions"],
    "am-flash-ca": ["am-substituer", "am-reduire", "auto-litteral", "am-premier-degre", "am-isoler", "am-formule", "am-produit-nul", "am-signe"],
    "am-flash-pp": ["proportion-pourcentage", "partie-tout", "am-ecritures"],
    "am-flash-ev": ["coefficient", "appliquer-evolution", "taux-evolution", "evolutions-successives", "taux-reciproque"],
    "am-flash-fr": ["lecture-image", "lecture-antecedents", "appartenance", "am-reconnaitre", "resolution-graphique", "am-signe-graph", "am-droite-point", "am-lire-droite", "am-coef-dir"],
    "am-flash-st": ["auto-statistiques", "am-quartiles", "am-moyenne-ponderee", "am-diagramme", "am-boites", "am-lire-graphique", "am-graphique-donnees"],
    "am-flash-pr": ["auto-probabilites", "am-proba-loi", "am-proba-tableau", "am-proba-arbre", "am-proba-notation"],
    "am-flash-ge": ["am-repere-droite", "am-coordonnees", "am-perimetre", "auto-grandeurs", "auto-pythagore", "am-thales", "am-trigo"]
  };
  Object.keys(THEMES).forEach((k) => { GEN[k] = (i) => GEN[pick(THEMES[k])](rand(0, 4)); });
  GEN["am-flash-tout"] = (i) => { const t = Object.keys(THEMES); return GEN[t[(i + rand(0, 6)) % t.length]](i); };


  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse (à la tolérance près) */
  Object.keys(GEN).filter((k) => k.startsWith("ld-") || k.startsWith("am-")).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => { const q = g(i); if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9)); return q; };
  });

  window.PM_EXO = { GEN, FIGURES, graph, shuffle };
})();
