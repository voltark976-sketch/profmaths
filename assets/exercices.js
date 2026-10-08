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
    // vecteurs : flèches de (x1 ; y1) à (x2 ; y2), couleur c (0 ou 1), nom affiché au milieu
    (o.fleches || []).forEach((f) => {
      const c = f.c || 0, ax = X(f.x1), ay = Y(f.y1), bx = X(f.x2), by = Y(f.y2), t = Math.atan2(by - ay, bx - ax);
      const pt = (r, a) => `${+(bx - r * Math.cos(t + a)).toFixed(1)} ${+(by - r * Math.sin(t + a)).toFixed(1)}`;
      s += `<path class="g-curve g-curve-${c}" d="M${ax} ${ay}L${pt(6, 0)}"/><path class="g-end g-curve-${c}" d="M${bx} ${by}L${pt(11, 0.4)}L${pt(11, -0.4)}Z"/>`;
      if (f.label) s += `<text class="g-clabel g-curve-${c}" x="${+((ax + bx) / 2 + 9 * Math.sin(t)).toFixed(1)}" y="${+((ay + by) / 2 - 9 * Math.cos(t) + 4).toFixed(1)}" text-anchor="middle">${f.label}</text>`;
      // petite flèche au-dessus du nom du vecteur
      if (f.label && /^[A-Za-z]{1,2}$/.test(f.label)) s += `<text class="g-clabel g-curve-${c}" style="font-size:10px" x="${+((ax + bx) / 2 + 9 * Math.sin(t)).toFixed(1)}" y="${+((ay + by) / 2 - 9 * Math.cos(t) - 7).toFixed(1)}" text-anchor="middle">→</text>`;
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
      mode: "nombre", prefixe: `$\\dbinom{${n}}{${k}} =$`, attendu: C(n, k),
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


  /* ---------- Seconde : variations et fonctions de référence (var-) ---------- */
  const nbSvg = (x) => String(+(+x).toFixed(6)).replace("-", "−").replace(".", ","); // nombre écrit dans un SVG
  // Courbe lisse qui monte ou descend entre des nœuds (x entiers) : extremums exactement aux nœuds
  function courbeNoeuds() {
    const n = pick([3, 4]);
    let xs, ys;
    do {
      xs = [rand(-5, -3)]; for (let k = 1; k < n; k++) xs.push(xs[k - 1] + rand(2, 3));
      ys = [rand(-4, 4)]; for (let k = 1; k < n; k++) { let y; do { y = rand(-4, 4); } while (Math.abs(y - ys[k - 1]) < 2 || (k > 1 && Math.sign(y - ys[k - 1]) === Math.sign(ys[k - 1] - ys[k - 2]))); ys.push(y); }
    } while (xs[n - 1] > 5);
    const f = (x) => { let k = 0; while (k < n - 2 && x > xs[k + 1]) k++; const t = (x - xs[k]) / (xs[k + 1] - xs[k]); return ys[k] + (ys[k + 1] - ys[k]) * (1 - Math.cos(Math.PI * t)) / 2; };
    const opts = (extra) => Object.assign({ xmin: -5.6, xmax: 5.6, ymin: -5.6, ymax: 5.6, curves: [{ f, a: xs[0], b: xs[n - 1] }], aria: "Courbe d'une fonction f qui monte et descend" }, extra || {});
    return { xs, ys, n, f, opts };
  }
  // Tableau de variations dessiné en SVG
  function tabvar(xs, ys, nom) {
    const W = 320, H = 112, g = 52, L = (W - g - 26) / (xs.length - 1);
    const X = (k) => g + 12 + k * L;
    let s = `<svg class="graph tabvar" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tableau de variations de ${nom || "f"}">`;
    s += `<g class="g-axis"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="none" stroke-width="1.2" style="stroke:var(--doux)"/><line x1="1" y1="30" x2="${W - 1}" y2="30"/><line x1="${g}" y1="1" x2="${g}" y2="${H - 1}"/></g>`;
    s += `<text class="g-label" x="${g / 2}" y="20" text-anchor="middle">x</text><text class="g-label" x="${g / 2}" y="76" text-anchor="middle">${nom || "f"}</text>`;
    const haut = ys.map((y, k) => (k === 0 ? y > ys[1] : k === ys.length - 1 ? y > ys[k - 1] : y > ys[k - 1]));
    xs.forEach((x, k) => { s += `<text class="g-label" x="${X(k)}" y="20" text-anchor="middle">${nbSvg(x)}</text>`; s += `<text class="g-label" x="${X(k)}" y="${haut[k] ? 48 : 102}" text-anchor="middle">${nbSvg(ys[k])}</text>`; });
    for (let k = 0; k < xs.length - 1; k++) {
      const y1 = haut[k] ? 54 : 90, y2 = haut[k + 1] ? 54 : 90, x1 = X(k) + 12, x2 = X(k + 1) - 12;
      const a = Math.atan2(y2 - y1, x2 - x1), hx = x2 - 7 * Math.cos(a - 0.45), hy = y2 - 7 * Math.sin(a - 0.45), kx = x2 - 7 * Math.cos(a + 0.45), ky = y2 - 7 * Math.sin(a + 0.45);
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--lagon);stroke-width:1.8"/><path d="M${x2} ${y2} L${hx.toFixed(1)} ${hy.toFixed(1)} L${kx.toFixed(1)} ${ky.toFixed(1)}z" style="fill:var(--lagon)"/>`;
    }
    return s + `</svg>`;
  }
  FIGURES["tabvar-exemple"] = () => tabvar([-3, 1, 4], [2, -4, 3]);

  GEN["var-intervalle"] = function () {
    const C = courbeNoeuds();
    const seg = []; for (let k = 0; k < C.n - 1; k++) seg.push({ a: C.xs[k], b: C.xs[k + 1], monte: C.ys[k + 1] > C.ys[k], ya: C.ys[k], yb: C.ys[k + 1] });
    const s = pick(seg), mot = s.monte ? "croissante" : "décroissante";
    const I = (a, b) => `$[${fr(a)}\\,;${fr(b)}]$`;
    const autre = seg.find((t) => t.monte !== s.monte);
    const ms = melangeChoix(I(s.a, s.b), [I(autre.a, autre.b), I(Math.min(s.ya, s.yb), Math.max(s.ya, s.yb)), I(C.xs[0], C.xs[C.n - 1])]);
    return {
      enonce: `Voici la courbe de $f$ sur $[${fr(C.xs[0])}\\,;${fr(C.xs[C.n - 1])}]$. Sur quel intervalle $f$ est-elle ${mot} ?`,
      figure: graph(C.opts()), mode: "choix", choix: ms.choix, attendu: ms.attendu,
      aides: [s.monte ? "Croissante : la courbe **monte** quand on la parcourt de gauche à droite." : "Décroissante : la courbe **descend** quand on la parcourt de gauche à droite.", "Repère les points où la courbe change de sens : ce sont les bornes des intervalles.", "Un intervalle de variation se lit sur l'axe des **abscisses** (horizontal), pas sur l'axe des ordonnées."],
      solution: `De gauche à droite, la courbe ${s.monte ? "monte" : "descend"} entre $x = ${fr(s.a)}$ et $x = ${fr(s.b)}$ : $f$ est ${mot} sur ${I(s.a, s.b)}.`
    };
  };

  GEN["var-extremum"] = function () {
    const C = courbeNoeuds();
    const max = Math.random() < 0.5, val = max ? Math.max(...C.ys) : Math.min(...C.ys), xv = C.xs[C.ys.indexOf(val)];
    return {
      enonce: `Voici la courbe de $f$ sur $[${fr(C.xs[0])}\\,;${fr(C.xs[C.n - 1])}]$. Quel est le ${max ? "maximum" : "minimum"} de $f$ sur cet intervalle ?`,
      figure: graph(C.opts()), mode: "nombre", prefixe: max ? "Maximum :" : "Minimum :", attendu: val,
      erreurs: xv !== val ? [{ valeur: xv, message: `C'est l'abscisse où il est atteint. Le ${max ? "maximum" : "minimum"} est une valeur de $f(x)$ : lis-la sur l'axe **vertical**.` }] : [],
      aides: [max ? "Cherche le point **le plus haut** de toute la courbe." : "Cherche le point **le plus bas** de toute la courbe.", "N'oublie pas de regarder aussi les extrémités de la courbe.", "Le maximum ou le minimum est l'**ordonnée** de ce point."],
      solution: `Le point le plus ${max ? "haut" : "bas"} est $(${fr(xv)}\\,;${fr(val)})$ : le ${max ? "maximum" : "minimum"} de $f$ vaut $${fr(val)}$, atteint en $x = ${fr(xv)}$.`,
      figureSolution: graph(C.opts({ points: [{ x: xv, y: val }] }))
    };
  };

  GEN["var-tableau"] = function () {
    const C = courbeNoeuds();
    const fig = tabvar(C.xs, C.ys);
    if (Math.random() < 0.3) {
      const max = Math.random() < 0.5, val = max ? Math.max(...C.ys) : Math.min(...C.ys);
      return {
        enonce: `D'après ce tableau de variations, quel est le ${max ? "maximum" : "minimum"} de $f$ ?`,
        figure: fig, mode: "nombre", prefixe: max ? "Maximum :" : "Minimum :", attendu: val,
        aides: ["Les valeurs de $f(x)$ sont sur la deuxième ligne, au bout des flèches.", max ? "Prends la plus grande valeur de la deuxième ligne." : "Prends la plus petite valeur de la deuxième ligne.", "La première ligne donne seulement les valeurs de $x$."],
        solution: `Sur la ligne de $f$, la ${max ? "plus grande" : "plus petite"} valeur est $${fr(val)}$ : c'est le ${max ? "maximum" : "minimum"}.`
      };
    }
    const k = rand(0, C.n - 2), a = C.xs[k], b = C.xs[k + 1], monte = C.ys[k + 1] > C.ys[k];
    let u, v; do { u = a + rand(1, (b - a) * 2 - 1) / 2; v = a + rand(1, (b - a) * 2 - 1) / 2; } while (u >= v);
    const choix = [`$f(${fr(u)}) < f(${fr(v)})$`, `$f(${fr(u)}) > f(${fr(v)})$`, `$f(${fr(u)}) = f(${fr(v)})$`, "On ne peut pas savoir"];
    return {
      enonce: `D'après ce tableau de variations, compare $f(${fr(u)})$ et $f(${fr(v)})$.`,
      figure: fig, mode: "choix", choix, attendu: monte ? 0 : 1,
      aides: [`Les deux nombres $${fr(u)}$ et $${fr(v)}$ sont dans l'intervalle $[${fr(a)}\\,;${fr(b)}]$.`, `Sur cet intervalle, la flèche ${monte ? "monte : $f$ est croissante" : "descend : $f$ est décroissante"}.`, monte ? "Croissante : les images sont rangées **dans le même ordre** que les nombres." : "Décroissante : les images sont rangées **dans l'ordre contraire** des nombres."],
      solution: `$${fr(u)} < ${fr(v)}$ et $f$ est ${monte ? "croissante" : "décroissante"} sur $[${fr(a)}\\,;${fr(b)}]$, donc $f(${fr(u)}) ${monte ? "<" : ">"} f(${fr(v)})$.`
    };
  };

  GEN["var-affine"] = function () {
    let m, r; do { m = pick([-3, -2, -1, -0.5, 0.5, 1, 2, 3]); r = rand(-4, 4); } while (!Number.isInteger(-m * r));
    const p = -m * r, expr = eqD(m, p).replace("y = ", "");
    if (Math.random() < 0.4) return {
      enonce: `Soit $f(x) = ${expr}$. Quel est le sens de variation de $f$ ?`,
      mode: "choix", choix: ["croissante sur $\\mathbb{R}$", "décroissante sur $\\mathbb{R}$", "constante sur $\\mathbb{R}$"], attendu: m > 0 ? 0 : 1,
      aides: ["$f$ est une fonction affine $f(x) = mx + p$ : elle est soit croissante, soit décroissante sur $\\mathbb{R}$.", `Ici $m = ${fr(m)}$.`, "Si $m > 0$, $f$ est croissante ; si $m < 0$, $f$ est décroissante."],
      solution: `$m = ${fr(m)}$ est ${m > 0 ? "positif" : "négatif"}, donc $f$ est ${m > 0 ? "croissante" : "décroissante"} sur $\\mathbb{R}$.`
    };
    const pos = m > 0 ? `$]${fr(r)}\\,;+\\infty[$` : `$]-\\infty\\,;${fr(r)}[$`, neg = m > 0 ? `$]-\\infty\\,;${fr(r)}[$` : `$]${fr(r)}\\,;+\\infty[$`;
    const ms = melangeChoix(pos, [neg, `$]${fr(-r)}\\,;+\\infty[$`, `$]-\\infty\\,;${fr(-r)}[$`, `$]${fr(p)}\\,;+\\infty[$`]);
    return {
      enonce: `Soit $f(x) = ${expr}$. Pour quels réels $x$ a-t-on $f(x) > 0$ ?`,
      mode: "choix", choix: ms.choix, attendu: ms.attendu,
      aides: [`Cherche d'abord où $f$ s'annule : résous $${expr} = 0$.`, `$f(x) = 0$ pour $x = ${fr(r)}$.`, `$m = ${fr(m)}$ est ${m > 0 ? "positif : $f$ est négative avant $" + fr(r) + "$ puis positive après" : "négatif : $f$ est positive avant $" + fr(r) + "$ puis négative après"}.`],
      solution: `$f(x) = 0 \\iff x = ${fr(r)}$. Comme $m = ${fr(m)}$ est ${m > 0 ? "positif" : "négatif"}, $f(x) > 0$ pour $x \\in$ ${pos}.`
    };
  };

  const REF = {
    carre: { nom: "carré", f: (x) => x * x, tex: (a) => (a < 0 ? `(${fr(a)})^2` : `${fr(a)}^2`), sens: "décroissante sur $]-\\infty\\,;0]$ et croissante sur $[0\\,;+\\infty[$" },
    inverse: { nom: "inverse", f: (x) => 1 / x, tex: (a) => `\\dfrac{1}{${fr(a)}}`, sens: "décroissante sur $]-\\infty\\,;0[$ et décroissante sur $]0\\,;+\\infty[$" },
    absolue: { nom: "valeur absolue", f: (x) => Math.abs(x), tex: (a) => `|${fr(a)}|`, sens: "décroissante sur $]-\\infty\\,;0]$ et croissante sur $[0\\,;+\\infty[$" },
    cube: { nom: "cube", f: (x) => x ** 3, tex: (a) => (a < 0 ? `(${fr(a)})^3` : `${fr(a)}^3`), sens: "croissante sur $\\mathbb{R}$" },
    racine: { nom: "racine carrée", f: (x) => Math.sqrt(x), tex: (a) => `\\sqrt{${fr(a)}}`, sens: "croissante sur $[0\\,;+\\infty[$" }
  };

  const lab = (t) => `<tspan>${t}</tspan>`;
  FIGURES["courbe-carre"] = () => graph({ xmin: -3.4, xmax: 3.4, ymin: -0.8, ymax: 9.6, h: 300, curves: [{ f: (x) => x * x, a: -3, b: 3, closed: false, label: lab("y = x²"), lx: 2.6, dx: -10, dy: 4 }], points: [{ x: 0, y: 0 }, { x: 2, y: 4, label: "(2 ; 4)" }, { x: -2, y: 4, label: "(−2 ; 4)", gauche: true }], aria: "Parabole y = x², sommet à l'origine" });
  FIGURES["courbe-inverse"] = () => graph({ xmin: -4.6, xmax: 4.6, ymin: -4.6, ymax: 4.6, curves: [{ f: (x) => 1 / x, a: -4.4, b: -0.23, closed: false }, { f: (x) => 1 / x, a: 0.23, b: 4.4, closed: false, label: lab("y = 1/x"), lx: 3.6, dx: 0, dy: -10 }], points: [{ x: 1, y: 1, label: "(1 ; 1)" }, { x: -1, y: -1 }], aria: "Hyperbole y = 1/x, deux branches" }).replace(/g-curve-1/g, "g-curve-0");
  FIGURES["courbe-absolue"] = () => graph({ xmin: -4.6, xmax: 4.6, ymin: -0.8, ymax: 4.6, curves: [{ f: (x) => Math.abs(x), a: -4.4, b: 4.4, closed: false, label: lab("y = |x|"), lx: 3.6, dx: -10, dy: 4 }], points: [{ x: 0, y: 0 }], aria: "Courbe en V de y = |x|" });
  FIGURES["courbe-racine-cube"] = () => graph({ xmin: -2.4, xmax: 4.6, ymin: -3.6, ymax: 3.6, curves: [{ f: (x) => Math.sqrt(x), a: 0, b: 4.4, closed: false, label: lab("y = √x"), lx: 4.2, dx: -4, dy: -8 }, { f: (x) => x ** 3, a: -1.5, b: 1.5, closed: false, label: lab("y = x³"), lx: 1.45, dx: -8, dy: 4 }], aria: "Courbes de la racine carrée et de la fonction cube" });
  FIGURES["x-et-x2"] = () => graph({ xmin: -0.3, xmax: 2.2, ymin: -0.3, ymax: 2.6, xstep: 0.5, ystep: 0.5, h: 280, curves: [{ f: (x) => x, a: 0, b: 2.1, closed: false, label: lab("y = x"), lx: 2.1, dx: -4, dy: 16 }, { f: (x) => x * x, a: 0, b: 1.58, closed: false, label: lab("y = x²"), lx: 1.55, dx: -8, dy: 2 }], points: [{ x: 1, y: 1, label: "(1 ; 1)" }], aria: "Sur [0 ; 1] la droite y = x est au-dessus de la parabole, après 1 elle est en dessous" });

  // Restriction facultative des fonctions de référence (chapitres 9 et 13 de Seconde) : voir refRestreint
  let REF_CLES = null, REF_EQ = null;
  const refRestreint = (gen, cles, eq) => (i) => { REF_CLES = cles; REF_EQ = eq; try { return GEN[gen](i); } finally { REF_CLES = REF_EQ = null; } };

  GEN["var-ref-comparer"] = function () {
    const cle = pick(REF_CLES || ["carre", "carre", "inverse", "absolue", "cube", "racine"]), R = REF[cle];
    const dec = () => rand(1, 49) / 10;
    let a, b;
    if (cle === "racine") { a = dec(); b = dec(); }
    else if (cle === "inverse") { const s = pick([1, -1]); a = s * dec(); b = s * dec(); }
    else { const s = pick([1, -1, 0]); a = s ? s * dec() : -dec(); b = s ? s * dec() : dec(); }
    if (a === b) b = +(b + 0.3).toFixed(1);
    const fa = R.f(a), fb = R.f(b);
    const att = Math.abs(fa - fb) < 1e-12 ? 2 : fa < fb ? 0 : 1;
    const memeSigne = a * b > 0;
    return {
      enonce: `Sans calculatrice, compare $${R.tex(a)}$ et $${R.tex(b)}$.`,
      mode: "choix", choix: [`$${R.tex(a)} < ${R.tex(b)}$`, `$${R.tex(a)} > ${R.tex(b)}$`, `$${R.tex(a)} = ${R.tex(b)}$`], attendu: att,
      aides: [`On utilise la fonction ${R.nom} : elle est ${R.sens}.`, memeSigne || cle === "cube" || cle === "racine" ? `$${fr(a)}$ et $${fr(b)}$ sont dans un même intervalle où le sens de variation est connu : range-les, puis applique le sens de variation.` : "Les deux nombres n'ont pas le même signe : compare leurs distances à $0$ (pour le carré et la valeur absolue).", "Croissante : même ordre. Décroissante : ordre contraire."],
      solution: `$${fr(Math.min(a, b))} < ${fr(Math.max(a, b))}$${memeSigne || cle === "cube" || cle === "racine" ? `. La fonction ${R.nom} est ${R.sens}` : `. Ici on compare les distances à $0$ : $${fr(Math.abs(a))}$ et $${fr(Math.abs(b))}$`}. Donc $${att === 0 ? `${R.tex(a)} < ${R.tex(b)}` : att === 1 ? `${R.tex(a)} > ${R.tex(b)}` : `${R.tex(a)} = ${R.tex(b)}`}$.`
    };
  };

  GEN["var-ref-equation"] = function () {
    const T = [
      () => { const k = pick([-9, -4, 0, 1, 4, 9, 16, 25, 36, 49, 0.25]); const s = k < 0 ? [] : k === 0 ? [0] : [-Math.sqrt(k), Math.sqrt(k)]; return [`x^2 = ${fr(k)}`, s, "Un carré est toujours positif ou nul.", k > 0 ? `Deux nombres ont pour carré $${fr(k)}$ : $\\sqrt{${fr(k)}}$ et son opposé.` : k === 0 ? "Seul $0$ a pour carré $0$." : "Aucun nombre réel n'a un carré négatif."]; },
      () => { const k = pick([-3, 0, 2, 5, 7, 1.5]); const s = k < 0 ? [] : k === 0 ? [0] : [-k, k]; return [`|x| = ${fr(k)}`, s, "$|x|$ est la distance entre $x$ et $0$.", k > 0 ? `Deux nombres sont à la distance $${fr(k)}$ de $0$ : $${fr(k)}$ et $${fr(-k)}$.` : k === 0 ? "Seul $0$ est à la distance $0$ de $0$." : "Une distance n'est jamais négative."]; },
      () => { const c = pick([-3, -2, -1, 1, 2, 3, 4]); return [`x^3 = ${c ** 3}`, [c], "La fonction cube est croissante sur $\\mathbb{R}$ : l'équation a une seule solution.", `Cherche le nombre dont le cube vaut $${c ** 3}$ (attention au signe).`]; },
      () => { const k = pick([-2, 0, 1, 2, 3, 5, 0.5]); return [`\\sqrt{x} = ${fr(k)}`, k < 0 ? [] : [k * k], "Une racine carrée est toujours positive ou nulle.", k < 0 ? "Une racine carrée ne peut pas être négative." : `$\\sqrt{x} = ${fr(k)}$ donne $x = ${fr(k)}^2$.`]; },
      () => { const k = pick([2, -2, 4, -4, 0.5, -0.5, 0.25, 5, 0]); return [`\\dfrac{1}{x} = ${fr(k)}`, k === 0 ? [] : [1 / k], "La fonction inverse ne s'annule jamais.", k === 0 ? "$\\dfrac{1}{x}$ n'est jamais égal à $0$." : `$\\dfrac{1}{x} = ${fr(k)}$ donne $x = \\dfrac{1}{${fr(k)}}$.`]; }
    ];
    const [eq, sol, a1, a2] = (REF_EQ ? T[pick(REF_EQ)] : pick(T))();
    return {
      enonce: `Résous dans $\\mathbb{R}$ l'équation $${eq}$.`,
      mode: "ensemble", prefixe: "Solution(s) :", attendu: sol,
      aides: [a1, a2, "Écris les solutions séparées par « ; », ou « aucun » s'il n'y en a pas."],
      solution: sol.length ? `$${eq}$ a pour solution${sol.length > 1 ? "s" : ""} $${sol.map(nb).join("$ et $")}$.` : `$${eq}$ n'a **aucune** solution réelle.`
    };
  };

  GEN["var-ref-courbe"] = function () {
    const cle = pick(REF_CLES || Object.keys(REF)), R = REF[cle];
    const curves = cle === "inverse" ? [{ f: R.f, a: -4.5, b: -0.22, closed: false }, { f: R.f, a: 0.22, b: 4.5, closed: false }]
      : cle === "racine" ? [{ f: R.f, a: 0, b: 4.5, closed: false }]
      : cle === "cube" ? [{ f: R.f, a: -1.65, b: 1.65, closed: false }]
      : cle === "carre" ? [{ f: R.f, a: -2.15, b: 2.15, closed: false }] : [{ f: R.f, a: -4.5, b: 4.5, closed: false }];
    const exprs = { carre: "x^2", inverse: "\\dfrac{1}{x}", absolue: "|x|", cube: "x^3", racine: "\\sqrt{x}" };
    const ms = melangeChoix(`$f(x) = ${exprs[cle]}$`, shuffle(Object.keys(exprs).filter((k) => k !== cle)).map((k) => `$f(x) = ${exprs[k]}$`));
    const indices = { carre: "Parabole tournée vers le haut, sommet à l'origine.", inverse: "Deux branches (hyperbole), la courbe ne coupe jamais les axes.", absolue: "Un « V » de sommet l'origine, formé de deux demi-droites.", cube: "La courbe monte toujours et passe par l'origine, avec un replat en $0$.", racine: "La courbe n'existe que pour $x \\geqslant 0$ et monte de plus en plus lentement." };
    return {
      enonce: "Quelle fonction de référence a cette courbe ?",
      figure: graph({ xmin: -4.8, xmax: 4.8, ymin: -4.8, ymax: 4.8, curves, aria: "Courbe d'une fonction de référence" }).replace(/g-curve-1/g, "g-curve-0"),
      mode: "choix", choix: ms.choix, attendu: ms.attendu,
      aides: ["Regarde si la courbe existe pour les $x$ négatifs.", "Regarde si elle passe par l'origine et si elle a une ou deux branches.", "Teste un point : que vaut $f(1)$ ? et $f(2)$ ?"],
      solution: `${indices[cle]} C'est la fonction ${R.nom} : $f(x) = ${exprs[cle]}$.`
    };
  };


  /* ---------- Terminale spécialité : combinatoire et dénombrement ---------- */
  const fact = (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
  const arrang = (n, k) => { let r = 1; for (let i = 0; i < k; i++) r *= n - i; return r; };
  const ent = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,"); // 30000 -> 30\,000
  const prodDesc = (n, k) => Array.from({ length: k }, (_, i) => n - i).join(" \\times "); // 8 × 7 × 6

  GEN["cd-additif"] = function () {
    const t = pick(["deux", "deux", "multiples", "complement"]);
    if (t === "deux") {
      const [a, b, l1, l2, deux] = pick([["font du sport en club", "jouent d'un instrument", "S", "M", "font les deux"], ["parlent shimaoré", "parlent kibushi", "S", "K", "parlent les deux langues"], ["ont un vélo", "ont un scooter", "V", "T", "ont les deux"]]);
      const total = rand(28, 36), nA = rand(10, 18), nB = rand(6, 12), nAB = rand(2, Math.min(nA, nB) - 2);
      const union = nA + nB - nAB;
      return {
        enonce: `Dans une classe de $${total}$ élèves, $${nA}$ élèves ${a}, $${nB}$ ${b} et $${nAB}$ ${deux}. Combien d'élèves ne sont dans **aucun des deux cas** ?`,
        mode: "nombre", prefixe: "Nombre d'élèves :", attendu: total - union,
        erreurs: [{ valeur: total - nA - nB, message: `Les $${nAB}$ élèves qui sont dans les deux cas ont été retirés deux fois.` }, { valeur: union, message: "Ça, c'est le nombre d'élèves qui sont dans au moins un des deux cas." }],
        aides: ["Commence par compter les élèves qui sont dans **au moins** un des deux cas.", `Ceux qui sont dans les deux cas sont comptés deux fois dans $${nA} + ${nB}$ : $\\text{Card}(${l1} \\cup ${l2}) = ${nA} + ${nB} - ${nAB}$.`, "Les autres forment le complémentaire : soustrais au total."],
        solution: `$\\text{Card}(${l1} \\cup ${l2}) = ${nA} + ${nB} - ${nAB} = ${union}$, donc $${total} - ${union} = ${total - union}$ élèves ne sont dans aucun des deux cas.`
      };
    }
    if (t === "multiples") {
      const N = pick([60, 100, 120, 200, 300]), [a, b] = pick([[2, 5], [3, 5], [2, 3], [4, 5], [3, 10]]);
      const na = Math.floor(N / a), nb2 = Math.floor(N / b), nab = Math.floor(N / (a * b / pgcd(a, b))), ppcm = a * b / pgcd(a, b);
      return {
        enonce: `Combien d'entiers compris entre $1$ et $${N}$ sont multiples de $${a}$ **ou** de $${b}$ ?`,
        mode: "nombre", prefixe: "Nombre d'entiers :", attendu: na + nb2 - nab,
        erreurs: [{ valeur: na + nb2, message: `Les multiples de $${ppcm}$ sont à la fois multiples de $${a}$ et de $${b}$ : tu les as comptés deux fois.` }],
        aides: [`Entre $1$ et $${N}$, il y a $${na}$ multiples de $${a}$ et $${nb2}$ multiples de $${b}$.`, `Les nombres multiples des deux sont les multiples de $${ppcm}$ : il y en a $${nab}$.`, "$\\text{Card}(A \\cup B) = \\text{Card}(A) + \\text{Card}(B) - \\text{Card}(A \\cap B)$."],
        solution: `$${na} + ${nb2} - ${nab} = ${na + nb2 - nab}$ entiers.`
      };
    }
    const n = rand(4, 7);
    return {
      enonce: `Un code est formé de $${n}$ chiffres de $0$ à $9$. Combien de codes contiennent **au moins un** chiffre $0$ ?`,
      mode: "nombre", prefixe: "Nombre de codes :", attendu: 10 ** n - 9 ** n,
      erreurs: [{ valeur: 9 ** n, message: "Ça, c'est le nombre de codes **sans** aucun $0$ : il reste à le retirer du total." }],
      aides: ["« Au moins un $0$ » : le contraire, « aucun $0$ », est plus simple à compter.", `Il y a $10^{${n}}$ codes en tout, et $9^{${n}}$ codes sans $0$ ($9$ choix par chiffre).`, `Réponse : $10^{${n}} - 9^{${n}}$.`],
      solution: `$10^{${n}} - 9^{${n}} = ${ent(10 ** n)} - ${ent(9 ** n)} = ${ent(10 ** n - 9 ** n)}$ codes.`
    };
  };

  GEN["cd-multiplicatif"] = function () {
    const T = pick([
      () => { const a = rand(2, 5), b = rand(3, 6), c = rand(2, 5); return [`Un restaurant propose $${a}$ entrées, $${b}$ plats et $${c}$ desserts. Combien de menus « entrée, plat, dessert » différents peut-on composer ?`, [a, b, c], "menus"]; },
      () => { const a = rand(3, 7), b = rand(2, 5), c = rand(2, 4); return [`Pour s'habiller, Nassim choisit un t-shirt parmi $${a}$, un pantalon parmi $${b}$ et une paire de chaussures parmi $${c}$. Combien de tenues différentes ?`, [a, b, c], "tenues"]; },
      () => { const a = rand(3, 6), b = rand(4, 8); return [`$A$ a $${a}$ éléments et $B$ en a $${b}$. Combien d'éléments a le produit cartésien $A \\times B$ ?`, [a, b], "couples"]; },
      () => { const a = rand(2, 4), b = rand(3, 5), c = rand(2, 3); return [`Pour aller du lycée au marché, il y a $${a}$ routes jusqu'au rond-point, puis $${b}$ jusqu'à la mosquée, puis $${c}$ jusqu'au marché. Combien de trajets différents ?`, [a, b, c], "trajets"]; }
    ])();
    const [enonce, f, mot] = T, prod = f.reduce((s, x) => s * x, 1), somme = f.reduce((s, x) => s + x, 0);
    return {
      enonce, mode: "nombre", prefixe: `Nombre de ${mot} :`, attendu: prod,
      erreurs: [{ valeur: somme, message: "Les choix se font les uns **après** les autres : on multiplie, on n'additionne pas." }],
      aides: ["Les choix se font en plusieurs étapes successives.", "Imagine l'arbre : chaque branche se divise en autant de branches que de possibilités à l'étape suivante.", `Principe multiplicatif : $${f.join(" \\times ")}$.`],
      solution: `$${f.join(" \\times ")} = ${prod}$ ${mot}.`
    };
  };

  GEN["cd-k-uplets"] = function () {
    const T = pick([
      () => { const k = rand(3, 6); return [`Combien de codes de $${k}$ chiffres (de $0$ à $9$, répétitions permises) peut-on former ?`, 10, k, "chiffres"]; },
      () => { const q = rand(4, 8), c = rand(3, 4); return [`Un QCM compte $${q}$ questions ; chacune a $${c}$ réponses possibles et on en coche une seule. Combien de grilles de réponses différentes ?`, c, q, "réponses"]; },
      () => { const k = rand(5, 10); return [`Combien de mots binaires (formés de $0$ et de $1$) de longueur $${k}$ existe-t-il ?`, 2, k, "bits"]; },
      () => { const k = rand(2, 5); return [`On lance $${k}$ fois de suite un dé à $6$ faces et on note la suite des résultats. Combien de suites possibles ?`, 6, k, "lancers"]; },
      () => { const n = rand(5, 9), k = rand(2, 4); return [`Une urne contient $${n}$ boules numérotées. On tire successivement $${k}$ boules **avec remise** et on note les numéros dans l'ordre. Combien de tirages possibles ?`, n, k, "tirages"]; }
    ])();
    const [enonce, n, k] = T, v = n ** k;
    return {
      enonce, mode: "nombre", prefixe: "Nombre :", attendu: v,
      erreurs: [{ valeur: k ** n, message: `Tu as inversé : il y a $${n}$ choix pour chacune des $${k}$ positions, donc $${n}^{${k}}$.` }, { valeur: n * k, message: "On ne multiplie pas $n$ par $k$ : on multiplie $n$ par lui-même $k$ fois." }],
      aides: ["L'ordre compte et les répétitions sont permises : on compte des k-uplets.", `Combien de choix à chaque position ? Ici $${n}$.`, `Il y a $${k}$ positions : $${n}^{${k}}$.`],
      solution: `$${n}$ choix pour chacune des $${k}$ positions : $${n}^{${k}} = ${ent(v)}$.`
    };
  };

  GEN["cd-parties"] = function () {
    const n = rand(3, 10), t = pick(["toutes", "toutes", "nonvide", "contient"]);
    if (t === "toutes") return {
      enonce: pick([`Combien de parties possède un ensemble à $${n}$ éléments ?`, `Une pizzeria propose $${n}$ garnitures. On en choisit autant qu'on veut (éventuellement aucune). Combien de pizzas différentes ?`]),
      mode: "nombre", prefixe: "Nombre :", attendu: 2 ** n,
      erreurs: [{ valeur: 2 ** n - 1, message: "N'oublie pas l'ensemble vide (aucune garniture) : il compte aussi." }, { valeur: n * n, message: `Ce n'est pas $${n}^2$, mais $2^{${n}}$ : deux possibilités pour chaque élément.` }],
      aides: ["Pour chaque élément, deux possibilités : dedans ou pas dedans.", `Une partie correspond à un $${n}$-uplet de $\\{0\\,;1\\}$.`, `Il y en a $2^{${n}}$.`],
      solution: `Chaque élément est pris ou non : $2^{${n}} = ${2 ** n}$.`
    };
    if (t === "nonvide") return {
      enonce: `Combien de parties **non vides** possède un ensemble à $${n}$ éléments ?`,
      mode: "nombre", prefixe: "Nombre :", attendu: 2 ** n - 1,
      erreurs: [{ valeur: 2 ** n, message: "Il faut retirer la partie vide." }],
      aides: [`Un ensemble à $${n}$ éléments a $2^{${n}}$ parties.`, "Une seule d'entre elles est vide.", `$2^{${n}} - 1$.`],
      solution: `$2^{${n}} - 1 = ${2 ** n - 1}$ parties non vides.`
    };
    return {
      enonce: `$E$ est un ensemble à $${n}$ éléments et $a$ est un élément de $E$. Combien de parties de $E$ **contiennent** $a$ ?`,
      mode: "nombre", prefixe: "Nombre :", attendu: 2 ** (n - 1),
      erreurs: [{ valeur: 2 ** n, message: "Ça, c'est le nombre total de parties." }],
      aides: ["$a$ est forcément dedans : il ne reste à décider que pour les autres éléments.", `Il reste $${n - 1}$ éléments, chacun dedans ou pas.`, `$2^{${n - 1}}$.`],
      solution: `On choisit librement parmi les $${n - 1}$ autres éléments : $2^{${n - 1}} = ${2 ** (n - 1)}$ parties (la moitié du total).`
    };
  };

  GEN["cd-factorielle"] = function () {
    const t = pick(["simple", "quotient", "quotient", "suivant"]);
    if (t === "simple") { const n = rand(0, 8); return {
      enonce: `Calcule $${n}!$.`, mode: "nombre", prefixe: `${n}! =`, attendu: fact(n),
      erreurs: n === 0 ? [{ valeur: 0, message: "Par convention, $0! = 1$." }] : [],
      aides: ["$n! = 1 \\times 2 \\times \\dots \\times n$.", n === 0 ? "Attention : la convention pour $0!$ n'est pas $0$." : `$${n}! = ${n === 1 ? "1" : Array.from({ length: n }, (_, i) => i + 1).join(" \\times ")}$.`, "On peut aussi utiliser $n! = n \\times (n - 1)!$."],
      solution: n === 0 ? "Par convention, $0! = 1$." : `$${n}! = ${n === 1 ? "1" : Array.from({ length: n }, (_, i) => i + 1).join(" \\times ")} = ${ent(fact(n))}$`
    }; }
    if (t === "quotient") { const n = rand(6, 15), k = rand(2, 3); return {
      enonce: `Calcule $\\dfrac{${n}!}{${n - k}!}$ sans calculer les factorielles.`, mode: "nombre", prefixe: "Résultat :", attendu: arrang(n, k),
      aides: [`$${n}! = ${prodDesc(n, k)} \\times ${n - k}!$.`, `Le facteur $${n - k}!$ se simplifie.`, `Il reste $${prodDesc(n, k)}$.`],
      solution: `$\\dfrac{${n}!}{${n - k}!} = ${prodDesc(n, k)} = ${ent(arrang(n, k))}$`
    }; }
    const n = rand(10, 40); return {
      enonce: `Calcule $\\dfrac{${n + 1}!}{${n}!}$.`, mode: "nombre", prefixe: "Résultat :", attendu: n + 1,
      erreurs: [{ valeur: 1, message: `$${n + 1}!$ et $${n}!$ ne sont pas égaux : $${n + 1}! = ${n + 1} \\times ${n}!$.` }],
      aides: ["$(n + 1)! = (n + 1) \\times n!$.", `$${n + 1}! = ${n + 1} \\times ${n}!$.`, `Le facteur $${n}!$ se simplifie.`],
      solution: `$\\dfrac{${n + 1}!}{${n}!} = \\dfrac{${n + 1} \\times ${n}!}{${n}!} = ${n + 1}$`
    };
  };

  GEN["cd-permutations"] = function () {
    const T = pick([
      () => { const m = pick(["LAGON", "PLAGE", "CHIEN", "MANGUE", "DAUPHIN", "PIROGUE", "MAORE", "BANC"]); return [`Combien d'anagrammes (avec ou sans signification) peut-on former avec les lettres du mot ${m} ?`, m.length, "Les lettres sont toutes différentes : une anagramme est une façon de les ranger toutes."]; },
      () => { const n = rand(4, 9); return [`$${n}$ élèves passent un par un à l'oral. Combien d'ordres de passage possibles ?`, n, "On range tous les élèves : c'est une permutation."]; },
      () => { const n = rand(4, 8); return [`On range $${n}$ livres différents côte à côte sur une étagère. De combien de façons ?`, n, "On range tous les livres : c'est une permutation."]; }
    ])();
    const [enonce, n, a1] = T;
    return {
      enonce, mode: "nombre", prefixe: "Nombre :", attendu: fact(n),
      erreurs: [{ valeur: n ** n, message: "Un élément déjà placé ne peut plus être choisi : le nombre de choix diminue à chaque place." }],
      aides: [a1, `$${n}$ choix pour la première place, $${n - 1}$ pour la deuxième, etc.`, `$${n}! = ${Array.from({ length: n }, (_, i) => n - i).join(" \\times ")}$.`],
      solution: `$${n}! = ${Array.from({ length: n }, (_, i) => n - i).join(" \\times ")} = ${ent(fact(n))}$`
    };
  };

  GEN["cd-arrangements"] = function () {
    const T = pick([
      () => { const n = rand(6, 12); return [`$${n}$ coureurs participent à une course. Combien de podiums (or, argent, bronze) sont possibles ?`, n, 3]; },
      () => { const n = rand(8, 20); return [`Une association de $${n}$ membres élit un président, un secrétaire et un trésorier, trois personnes différentes. Combien de bureaux possibles ?`, n, 3]; },
      () => { const n = rand(5, 10), k = rand(2, 3); return [`Une urne contient $${n}$ boules numérotées. On tire successivement $${k}$ boules **sans remise** en notant l'ordre. Combien de tirages possibles ?`, n, k]; },
      () => { const k = rand(3, 4); return [`Combien de codes de $${k}$ chiffres (de $0$ à $9$) ont tous leurs chiffres **différents** ?`, 10, k]; }
    ])();
    const [enonce, n, k] = T, v = arrang(n, k);
    return {
      enonce, mode: "nombre", prefixe: "Nombre :", attendu: v,
      erreurs: [{ valeur: C(n, k), message: "Ici l'ordre compte (places ou postes différents) : on ne divise pas par $k!$." }, { valeur: n ** k, message: "Les répétitions sont interdites : le nombre de choix diminue de $1$ à chaque étape." }],
      aides: ["L'ordre compte, et un même élément ne peut pas être choisi deux fois.", `$${n}$ choix pour le premier, $${n - 1}$ pour le deuxième…`, `$${prodDesc(n, k)}$, soit $\\dfrac{${n}!}{${n - k}!}$.`],
      solution: `$${prodDesc(n, k)} = ${ent(v)}$`
    };
  };

  GEN["cd-combinaisons"] = function () {
    const T = pick([
      () => { const n = rand(20, 35), k = 2; return [`Une classe de $${n}$ élèves choisit $${k}$ délégués. Combien de choix possibles ?`, n, k]; },
      () => { const n = rand(8, 15), k = 3; return [`On choisit $${k}$ joueurs parmi $${n}$ pour former une équipe (sans rôle particulier). Combien d'équipes possibles ?`, n, k]; },
      () => { const n = 32, k = pick([2, 3, 4]); return [`Combien de mains de $${k}$ cartes peut-on former avec un jeu de $32$ cartes ?`, n, k]; },
      () => { const n = rand(6, 12), k = rand(2, 4); return [`On tire **simultanément** $${k}$ boules d'une urne qui en contient $${n}$. Combien de tirages possibles ?`, n, k]; },
      () => { const n = rand(5, 9); return [`$${n}$ amis se serrent la main une fois chacun avec chacun. Combien de poignées de main ?`, n, 2]; }
    ])();
    const [enonce, n, k] = T, v = C(n, k);
    return {
      enonce, mode: "nombre", prefixe: "Nombre :", attendu: v,
      erreurs: [{ valeur: arrang(n, k), message: `Tu as compté l'ordre : chaque groupe est compté $${k}! = ${fact(k)}$ fois. Divise par $${k}!$.` }, { valeur: n ** k, message: "Pas de répétition ni d'ordre ici : ce n'est pas $n^k$." }],
      aides: ["L'ordre ne compte pas et pas de répétition : on compte des combinaisons $\\dbinom{n}{k}$.", `Ici $n = ${n}$ et $k = ${k}$.`, `$\\dbinom{${n}}{${k}} = \\dfrac{${prodDesc(n, k)}}{${k}!}$.`],
      solution: `$\\dbinom{${n}}{${k}} = \\dfrac{${prodDesc(n, k)}}{${k === 2 ? "2" : prodDesc(k, k)}} = ${ent(v)}$`
    };
  };

  GEN["cd-pascal"] = function () {
    const t = pick(["pascal", "symetrie", "deux", "somme"]);
    if (t === "pascal") { const n = rand(6, 12), k = rand(2, n - 3), a = C(n, k), b = C(n, k + 1); return {
      enonce: `On sait que $\\dbinom{${n}}{${k}} = ${a}$ et $\\dbinom{${n}}{${k + 1}} = ${b}$. Calcule $\\dbinom{${n + 1}}{${k + 1}}$.`,
      mode: "nombre", prefixe: "Résultat :", attendu: a + b,
      aides: ["Utilise la relation de Pascal.", "$\\dbinom{n}{k} + \\dbinom{n}{k + 1} = \\dbinom{n + 1}{k + 1}$.", `$${a} + ${b}$.`],
      solution: `Relation de Pascal : $\\dbinom{${n + 1}}{${k + 1}} = \\dbinom{${n}}{${k}} + \\dbinom{${n}}{${k + 1}} = ${a} + ${b} = ${a + b}$.`
    }; }
    if (t === "symetrie") { const n = rand(10, 30), k = rand(2, 3); return {
      enonce: `Calcule $\\dbinom{${n}}{${n - k}}$ sans calculatrice.`,
      mode: "nombre", prefixe: "Résultat :", attendu: C(n, k),
      aides: ["Utilise la symétrie $\\dbinom{n}{k} = \\dbinom{n}{n - k}$.", `$\\dbinom{${n}}{${n - k}} = \\dbinom{${n}}{${k}}$.`, `$\\dbinom{${n}}{${k}} = \\dfrac{${prodDesc(n, k)}}{${k}!}$.`],
      solution: `$\\dbinom{${n}}{${n - k}} = \\dbinom{${n}}{${k}} = \\dfrac{${prodDesc(n, k)}}{${fact(k)}} = ${ent(C(n, k))}$`
    }; }
    if (t === "deux") { const n = rand(8, 60); return {
      enonce: `Calcule $\\dbinom{${n}}{2}$.`,
      mode: "nombre", prefixe: "Résultat :", attendu: C(n, 2),
      erreurs: [{ valeur: n * (n - 1), message: "N'oublie pas de diviser par $2! = 2$." }],
      aides: ["$\\dbinom{n}{2} = \\dfrac{n(n - 1)}{2}$.", `$\\dbinom{${n}}{2} = \\dfrac{${n} \\times ${n - 1}}{2}$.`, "Simplifie par $2$ avant de multiplier."],
      solution: `$\\dbinom{${n}}{2} = \\dfrac{${n} \\times ${n - 1}}{2} = ${ent(C(n, 2))}$`
    }; }
    const n = rand(4, 12); return {
      enonce: `Calcule $\\dbinom{${n}}{0} + \\dbinom{${n}}{1} + \\dots + \\dbinom{${n}}{${n}}$.`,
      mode: "nombre", prefixe: "Somme :", attendu: 2 ** n,
      aides: ["Cette somme compte les parties d'un ensemble à $n$ éléments, rangées selon leur nombre d'éléments.", "Un ensemble à $n$ éléments a $2^n$ parties.", `La somme vaut $2^{${n}}$.`],
      solution: `$\\displaystyle\\sum_{k = 0}^{${n}} \\dbinom{${n}}{k} = 2^{${n}} = ${ent(2 ** n)}$`
    };
  };

  GEN["cd-chemins"] = function () {
    const t = pick(["mot", "grille", "pile"]);
    if (t === "mot") { const n = rand(5, 10), k = rand(2, n - 2); return {
      enonce: `Combien de mots de $${n}$ lettres peut-on écrire avec exactement $${k}$ lettres A et $${n - k}$ lettres B ?`,
      mode: "nombre", prefixe: "Nombre de mots :", attendu: C(n, k),
      erreurs: [{ valeur: 2 ** n, message: "Ça, c'est le nombre de mots avec un nombre **quelconque** de A." }, { valeur: fact(n), message: "Les A sont identiques entre eux : échanger deux A donne le même mot." }],
      aides: ["Un mot est entièrement déterminé par les positions des lettres A.", `On choisit $${k}$ positions parmi $${n}$, sans ordre.`, `$\\dbinom{${n}}{${k}}$.`],
      solution: `On choisit les $${k}$ positions des A parmi $${n}$ : $\\dbinom{${n}}{${k}} = ${C(n, k)}$ mots.`
    }; }
    if (t === "grille") { const a = rand(2, 5), b = rand(2, 4); return {
      enonce: `Sur un quadrillage, on va du point $(0\\,;0)$ au point $(${a}\\,;${b})$ en ne faisant que des pas d'une case vers la **droite** (D) ou vers le **haut** (H). Combien de chemins différents ?`,
      mode: "nombre", prefixe: "Nombre de chemins :", attendu: C(a + b, a),
      erreurs: [{ valeur: 2 ** (a + b), message: `Le nombre de D est imposé : il en faut exactement $${a}$.` }],
      aides: [`Un chemin est un mot de $${a + b}$ lettres avec $${a}$ lettres D et $${b}$ lettres H.`, `On choisit les positions des $${a}$ lettres D parmi $${a + b}$.`, `$\\dbinom{${a + b}}{${a}}$.`],
      solution: `Un chemin est un mot de $${a + b}$ lettres contenant $${a}$ fois D : $\\dbinom{${a + b}}{${a}} = ${C(a + b, a)}$ chemins.`
    }; }
    const n = rand(5, 10), k = rand(1, n - 1); return {
      enonce: `On lance $${n}$ fois une pièce et on note la suite des résultats. Combien de suites contiennent exactement $${k}$ fois PILE ?`,
      mode: "nombre", prefixe: "Nombre de suites :", attendu: C(n, k),
      erreurs: [{ valeur: 2 ** n, message: "Ça, c'est le nombre total de suites." }],
      aides: ["Une suite est déterminée par les numéros des lancers qui donnent PILE.", `On choisit $${k}$ lancers parmi $${n}$.`, `$\\dbinom{${n}}{${k}}$, comme les chemins à $${k}$ succès dans l'arbre de la loi binomiale.`],
      solution: `$\\dbinom{${n}}{${k}} = ${C(n, k)}$ suites.`
    };
  };

  GEN["cd-modele"] = function () {
    const n = rand(6, 12), k = rand(2, 4);
    const S = [
      [`On forme un code de $${k}$ symboles choisis parmi $${n}$ (un symbole peut se répéter).`, 0, "L'ordre compte et les répétitions sont permises."],
      [`On tire successivement et avec remise $${k}$ boules dans une urne de $${n}$ boules numérotées.`, 0, "Successivement : l'ordre compte. Avec remise : répétitions possibles."],
      [`On attribue $${k}$ prix différents (${["1er", "2e", "3e", "4e"].slice(0, k).join(", ")}) à $${k}$ candidats distincts choisis parmi $${n}$.`, 1, "Les prix sont différents : l'ordre compte. Un candidat ne reçoit qu'un prix."],
      [`On tire successivement et sans remise $${k}$ boules dans une urne de $${n}$ boules numérotées.`, 1, "Successivement : l'ordre compte. Sans remise : pas de répétition."],
      [`On choisit $${k}$ élèves parmi $${n}$ pour former un groupe de travail.`, 2, "Un groupe n'a pas d'ordre et un élève n'y figure qu'une fois."],
      [`On tire simultanément $${k}$ boules dans une urne de $${n}$ boules.`, 2, "Simultanément : pas d'ordre, pas de répétition."],
      [`On range les $${n}$ élèves d'un groupe en file indienne.`, 3, "On range tous les éléments : c'est une permutation."]
    ];
    const [sit, j, expl] = pick(S);
    const formules = [`$${n}^{${k}}$`, `$\\dfrac{${n}!}{${n - k}!}$`, `$\\dbinom{${n}}{${k}}$`, `$${n}!$`];
    const ms = melangeChoix(formules[j], formules.filter((_, i) => i !== j));
    return {
      enonce: `${sit} Quel calcul donne le nombre de résultats possibles ?`,
      mode: "choix", choix: ms.choix, attendu: ms.attendu,
      aides: ["L'ordre compte-t-il ? Échanger deux éléments donne-t-il un autre résultat ?", "Les répétitions sont-elles possibles ?", "Ordre et répétitions : $n^k$. Ordre sans répétition : $\\dfrac{n!}{(n - k)!}$. Ni ordre ni répétition : $\\dbinom{n}{k}$. Tout ranger : $n!$."],
      solution: `${expl} Le nombre de résultats est ${formules[j]}.`
    };
  };

  GEN["cd-proba"] = function () {
    const t = pick(["urne2", "urne3", "mixte", "code"]);
    if (t === "code") { const k = rand(3, 4), v = arrang(10, k) / 10 ** k; return {
      enonce: `Un code de $${k}$ chiffres (de $0$ à $9$) est choisi au hasard. Quelle est la probabilité que ses chiffres soient tous **différents** ? Donne une fraction ou une valeur arrondie au millième.`,
      mode: "nombre", prefixe: "P =", attendu: v, tolerance: 0.0006,
      aides: [`Tous les codes sont équiprobables : $\\text{Card}(\\Omega) = 10^{${k}}$.`, `Codes à chiffres distincts : $${prodDesc(10, k)}$.`, "$P = \\dfrac{\\text{Card}(A)}{\\text{Card}(\\Omega)}$."],
      solution: `$P = \\dfrac{${prodDesc(10, k)}}{10^{${k}}} = \\dfrac{${ent(arrang(10, k))}}{${ent(10 ** k)}} = ${fr(v)}$`
    }; }
    const r = rand(3, 7), b = rand(3, 7), N = r + b;
    if (t === "mixte") { const v = (r * b) / C(N, 2); return {
      enonce: `Une urne contient $${r}$ boules rouges et $${b}$ boules vertes. On tire simultanément $2$ boules. Quelle est la probabilité d'obtenir **une rouge et une verte** ? Donne une fraction ou une valeur arrondie au millième.`,
      mode: "nombre", prefixe: "P =", attendu: v, tolerance: 0.0006,
      erreurs: [{ valeur: (2 * r * b) / C(N, 2), message: "Avec des tirages simultanés, on ne multiplie pas par $2$ : une paire n'a pas d'ordre." }],
      aides: [`Tirage simultané : $\\text{Card}(\\Omega) = \\dbinom{${N}}{2} = ${C(N, 2)}$.`, `Une rouge parmi $${r}$ et une verte parmi $${b}$ : principe multiplicatif.`, `$\\text{Card}(A) = ${r} \\times ${b} = ${r * b}$.`],
      solution: `$P = \\dfrac{${r} \\times ${b}}{\\binom{${N}}{2}} = \\dfrac{${r * b}}{${C(N, 2)}} = ${frac(r * b, C(N, 2))} \\approx ${fr(arr(v, 3))}$`
    }; }
    const k = t === "urne2" ? 2 : 3, v = C(r, k) / C(N, k);
    return {
      enonce: `Une urne contient $${r}$ boules rouges et $${b}$ boules vertes. On tire simultanément $${k}$ boules. Quelle est la probabilité qu'elles soient **toutes rouges** ? Donne une fraction ou une valeur arrondie au millième.`,
      mode: "nombre", prefixe: "P =", attendu: v, tolerance: 0.0006,
      erreurs: [{ valeur: (r / N) ** k, message: "Ce calcul correspond à des tirages avec remise. Ici, compte des combinaisons." }],
      aides: [`Tirage simultané : $\\text{Card}(\\Omega) = \\dbinom{${N}}{${k}} = ${C(N, k)}$.`, `Issues favorables : $${k}$ rouges parmi $${r}$, soit $\\dbinom{${r}}{${k}}= ${C(r, k)}$.`, "$P = \\dfrac{\\text{Card}(A)}{\\text{Card}(\\Omega)}$."],
      solution: `$P = \\dfrac{\\binom{${r}}{${k}}}{\\binom{${N}}{${k}}} = \\dfrac{${C(r, k)}}{${C(N, k)}} = ${frac(C(r, k), C(N, k))} \\approx ${fr(arr(v, 3))}$`
    };
  };

  // Arbre du principe multiplicatif : 2 t-shirts, puis 3 pantalons
  FIGURES["arbre-produit"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 220" role="img" aria-label="Arbre : 2 choix de t-shirt, puis 3 choix de pantalon pour chacun, soit 6 tenues"><g class="g-axis">`;
    const n1 = [[110, 58, "B"], [110, 162, "R"]];
    let t = "";
    n1.forEach(([x, y, l]) => {
      s += `<line x1="22" y1="110" x2="${x - 10}" y2="${y}"/>`;
      t += `<text class="g-clabel" x="${x}" y="${y + 4}" text-anchor="middle">${l}</text>`;
      [-30, 0, 30].forEach((d, i) => {
        s += `<line x1="${x + 10}" y1="${y}" x2="190" y2="${y + d}"/>`;
        t += `<text class="g-clabel" x="204" y="${y + d + 4}" text-anchor="middle">P${i + 1}</text><text class="g-label" x="234" y="${y + d + 4}">(${l} ; P${i + 1})</text>`;
      });
    });
    return s + `</g><circle class="g-rect" cx="16" cy="110" r="5"/>${t}<text class="g-label" x="110" y="214" text-anchor="middle">2 t-shirts × 3 pantalons = 6 tenues</text></svg>`;
  };

  // Triangle de Pascal, lignes 0 à 6, avec la relation 10 + 10 = 20 mise en évidence
  FIGURES["triangle-pascal"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 230" role="img" aria-label="Triangle de Pascal des lignes 0 à 6 ; 10 plus 10 donne 20">`;
    const pos = (n, k) => [172 + (k - n / 2) * 40, 22 + n * 30];
    [[5, 2], [5, 3], [6, 3]].forEach(([n, k]) => { const [x, y] = pos(n, k); s += `<circle class="g-rect" cx="${x}" cy="${y - 4}" r="13"/>`; });
    for (let n = 0; n <= 6; n++) {
      s += `<text class="g-tick" x="8" y="${22 + n * 30}" style="fill:var(--doux);font-size:10px">n = ${n}</text>`;
      for (let k = 0; k <= n; k++) { const [x, y] = pos(n, k); s += `<text class="g-clabel" x="${x}" y="${y}" text-anchor="middle">${C(n, k)}</text>`; }
    }
    return s + `<text class="g-label" x="172" y="226" text-anchor="middle">10 + 10 = 20</text></svg>`;
  };


  /* ---------- Seconde, chapitre 4 : arithmétique (préfixe ar-) ---------- */
  const diviseurs = (n) => { const d = []; for (let k = 1; k <= n; k++) if (n % k === 0) d.push(k); return d; };
  const facteursPremiers = (n) => { const f = []; let m = n; for (let p = 2; m > 1; p++) while (m % p === 0) { f.push(p); m /= p; } return f; };
  // [2, 2, 3, 5] → « 2^2 \times 3 \times 5 »
  const produitTex = (f) => { const c = {}; f.forEach((p) => { c[p] = (c[p] || 0) + 1; }); return Object.keys(c).map(Number).sort((a, b) => a - b).map((p) => (c[p] > 1 ? `${p}^${c[p]}` : `${p}`)).join(" \\times "); };

  GEN["ar-multiple"] = function () {
    const b = rand(3, 15), vrai = Math.random() < 0.5;
    let a;
    if (vrai) a = b * rand(4, 15);
    else do { a = rand(30, 200); } while (a % b === 0);
    const forme = rand(0, 2);
    const phrase = [`$${a}$ est un multiple de $${b}$`, `$${b}$ est un diviseur de $${a}$`, `$${a}$ est divisible par $${b}$`][forme];
    const q = Math.floor(a / b), r = a - q * b;
    return {
      enonce: `Vrai ou faux : ${phrase}.`,
      mode: "choix", choix: ["Vrai", "Faux"], attendu: vrai ? 0 : 1,
      aides: [
        `« $${a}$ est un multiple de $${b}$ », « $${b}$ est un diviseur de $${a}$ », « $${a}$ est divisible par $${b}$ » : ces trois phrases disent la même chose. Il existe un entier $k$ tel que $${a} = k \\times ${b}$.`,
        `Calcule $${a} \\div ${b}$.`,
        "Si le quotient est un entier, c'est vrai. Sinon, c'est faux."
      ],
      solution: vrai
        ? `$${a} = ${q} \\times ${b}$ avec $k = ${q}$ entier : **vrai**.`
        : `$${q} \\times ${b} = ${q * b}$ et $${q + 1} \\times ${b} = ${(q + 1) * b}$ : $${a}$ tombe entre les deux, avec un reste de $${r}$. Il n'existe pas d'entier $k$ tel que $${a} = k \\times ${b}$ : **faux**.`
    };
  };

  GEN["ar-k"] = function () {
    const b = rand(4, 19), k = rand(6, 40), a = b * k;
    const ctx = pick([
      [`$${a}$ est un multiple de $${b}$ : trouve l'entier $k$ tel que $${a} = k \\times ${b}$.`, "k ="],
      [`On range $${a}$ cartons en piles de $${b}$ cartons. Combien de piles complètes obtient-on, sans carton restant ?`, "Piles :"],
      [`La barge fait une rotation toutes les $${b}$ minutes. Combien de rotations fait-elle en $${a}$ minutes ?`, "Rotations :"]
    ]);
    return {
      enonce: ctx[0], mode: "nombre", prefixe: ctx[1], attendu: k,
      aides: [`Cherche combien de fois $${b}$ « rentre » dans $${a}$ : c'est l'entier $k$ tel que $${a} = k \\times ${b}$.`, `Calcule $${a} \\div ${b}$.`, `Vérifie : $k \\times ${b}$ doit redonner $${a}$.`],
      solution: `$${a} \\div ${b} = ${k}$, donc $${a} = ${k} \\times ${b}$ : la réponse est $${k}$.`
    };
  };

  GEN["ar-diviseurs"] = function () {
    const n = pick([12, 18, 20, 28, 30, 32, 36, 40, 42, 44, 45, 50, 52, 54, 56, 63, 66, 70, 75, 78, 98, 99, 100]);
    const d = diviseurs(n), paires = d.filter((k) => k * k <= n).map((k) => `${k} \\times ${n / k}`);
    return {
      enonce: `Donne **tous** les diviseurs positifs de $${n}$, séparés par « ; ».`,
      mode: "ensemble", prefixe: "Diviseurs :", attendu: d,
      aides: [
        `$1$ et $${n}$ sont toujours des diviseurs de $${n}$.`,
        `Cherche les produits qui donnent $${n}$ : $1 \\times ${n}$, puis teste $2$, $3$, $4$… Chaque produit donne **deux** diviseurs.`,
        `Tu peux t'arrêter quand le premier facteur dépasse le second : ici, après $${d.filter((k) => k * k <= n).pop()}$.`
      ],
      solution: `$${n} = ${paires.join(" = ")}$.\n\nLes diviseurs de $${n}$ sont : $${d.join("\\,;\\,")}$ (${d.length} diviseurs).`
    };
  };

  GEN["ar-premier"] = function () {
    const premiers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    const pieges = [1, 9, 15, 21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93, 95, 99];
    const n = Math.random() < 0.5 ? pick(premiers) : pick(pieges);
    const premier = premiers.includes(n);
    const p = n > 1 && !premier ? diviseurs(n)[1] : 0;
    let sol;
    if (n === 1) sol = "$1$ n'a qu'**un seul** diviseur positif (lui-même). Un nombre premier en a exactement deux : $1$ **n'est pas premier**.";
    else if (premier) sol = `On teste les nombres premiers $2$, $3$, $5$, $7$ : aucun ne divise $${n}$ (sauf $${n}$ lui-même). Inutile d'aller plus loin, car $11 \\times 11 = 121 > ${n}$. Ses seuls diviseurs sont $1$ et $${n}$ : $${n}$ **est premier**.`;
    else sol = `$${n} = ${p} \\times ${n / p}$ : $${p}$ est un diviseur de $${n}$, autre que $1$ et $${n}$. Donc $${n}$ **n'est pas premier**.`;
    return {
      enonce: `Le nombre $${n}$ est-il premier ?`,
      mode: "choix", choix: ["Oui, il est premier", "Non, il n'est pas premier"], attendu: premier ? 0 : 1,
      aides: [
        "Un nombre premier a **exactement deux** diviseurs positifs : $1$ et lui-même.",
        "Teste la division par $2$, $3$, $5$ et $7$ (critères : dernier chiffre pair, somme des chiffres multiple de $3$, dernier chiffre $0$ ou $5$…).",
        "Attention aux pièges : $91 = 7 \\times 13$, $51 = 3 \\times 17$, et $1$ n'est pas premier."
      ],
      solution: sol
    };
  };

  GEN["ar-decomposer"] = function () {
    const n = pick([12, 18, 20, 24, 28, 36, 40, 45, 48, 50, 54, 60, 63, 72, 75, 84, 90, 96, 98, 100, 108, 120, 126, 150, 180]);
    const f = facteursPremiers(n), bonne = produitTex(f);
    const faux = [];
    // un facteur qui n'est pas premier (on regroupe les deux premiers)
    faux.push([f[0] * f[1]].concat(f.slice(2)).join(" \\times "));
    // un facteur premier de trop : le produit ne redonne plus n
    faux.push(produitTex(f.concat([f[f.length - 1]])));
    // un facteur oublié
    faux.push(produitTex(f.slice(1)));
    // deux nombres non premiers
    const d = diviseurs(n).filter((k) => k > 3 && n / k > 3 && facteursPremiers(k).length > 1 && facteursPremiers(n / k).length > 1);
    if (d.length) { const k = pick(d); faux.push(`${k} \\times ${n / k}`); }
    const m = melangeChoix(`$${bonne}$`, shuffle(faux).map((t) => `$${t}$`));
    return {
      enonce: `Quelle est la décomposition de $${n}$ en produit de facteurs **premiers** ?`,
      mode: "choix", choix: m.choix, attendu: m.attendu,
      aides: [
        `Divise $${n}$ par $2$ autant de fois que possible, puis par $3$, puis par $5$…`,
        "Chaque facteur doit être un nombre premier : $4$, $6$, $9$, $10$… ne sont pas premiers.",
        `Vérifie que le produit redonne bien $${n}$.`
      ],
      solution: `${f.map((p, i) => `$${f.slice(i).reduce((a, b) => a * b, 1)} \\div ${p} = ${f.slice(i + 1).reduce((a, b) => a * b, 1)}$`).join(" ; ")}.\n\nDonc $${n} = ${bonne}$.`
    };
  };

  GEN["ar-irreductible"] = function () {
    let a, b;
    do { a = rand(1, 15); b = rand(2, 19); } while (pgcd(a, b) !== 1 || a === b);
    const g = pick([4, 6, 8, 9, 10, 12, 14, 15, 18]), p = a * g, q = b * g;
    const sp = facteursPremiers(g)[0], demande = Math.random() < 0.5 ? "num" : "den";
    const attendu = demande === "num" ? a : b;
    const partiel = demande === "num" ? p / sp : q / sp;
    return {
      enonce: `On écrit $\\dfrac{${p}}{${q}}$ sous forme **irréductible** $\\dfrac{a}{b}$. Que vaut ${demande === "num" ? "le numérateur $a$" : "le dénominateur $b$"} ?`,
      mode: "nombre", prefixe: demande === "num" ? "a =" : "b =", attendu,
      erreurs: [{ valeur: partiel, message: `Ta fraction $\\dfrac{${p / sp}}{${q / sp}}$ se simplifie encore : ${p / sp} et ${q / sp} ont un diviseur commun.` }],
      aides: [
        "Une fraction est irréductible quand le numérateur et le dénominateur n'ont plus de diviseur commun autre que $1$.",
        `Divise le numérateur et le dénominateur par un même nombre : ici, ils sont tous les deux divisibles par $${sp}$.`,
        `Recommence jusqu'à ne plus pouvoir simplifier. Tu peux aussi décomposer : $${p} = ${produitTex(facteursPremiers(p))}$ et $${q} = ${produitTex(facteursPremiers(q))}$.`
      ],
      solution: `$${p}$ et $${q}$ sont tous les deux divisibles par $${g}$ : $\\dfrac{${p}}{${q}} = \\dfrac{${p} \\div ${g}}{${q} \\div ${g}} = \\dfrac{${a}}{${b}}$.\n\n$${a}$ et $${b}$ n'ont pas de diviseur commun autre que $1$ : la fraction est irréductible. Donc $${demande === "num" ? "a" : "b"} = ${attendu}$.`
    };
  };

  GEN["ar-parite"] = function () {
    const P = 0, I = 1, D = 2;
    const big = rand(10000, 999999), bigTex = nb(big), bigPair = big % 2 === 0;
    const T = [
      () => { const k = rand(1, 9); return [`2n + ${2 * k}`, P, `$2n + ${2 * k} = 2(n + ${k})$ : c'est $2$ fois un entier, donc un nombre **pair**.`]; },
      () => { const k = rand(0, 9); return [`2n + ${2 * k + 1}`, I, `$2n + ${2 * k + 1} = 2(n + ${k}) + 1$ : de la forme $2k' + 1$, donc **impair**.`]; },
      () => { const m = pick([4, 6, 8, 10]); return [`${m}n`, P, `$${m}n = 2 \\times ${m / 2}n$ : c'est un multiple de $2$, donc **pair**.`]; },
      () => { const m = pick([4, 6, 8]); return [`${m}n + 1`, I, `$${m}n + 1 = 2 \\times ${m / 2}n + 1$ : de la forme $2k + 1$, donc **impair**.`]; },
      () => ["n(n + 1)", P, "Deux entiers consécutifs : l'un des deux est pair. On raisonne par **disjonction des cas** : si $n$ est pair, $n(n+1)$ est pair ; si $n$ est impair, $n + 1$ est pair, donc $n(n+1)$ est pair. Dans tous les cas, **pair**."],
      () => ["n^2 + n", P, "$n^2 + n = n(n + 1)$ : le produit de deux entiers consécutifs, l'un des deux est pair. Donc **pair**."],
      () => ["(2n + 1)^2", I, "$2n + 1$ est impair, et le carré d'un nombre impair est impair : $(2n+1)^2 = 4n^2 + 4n + 1 = 2(2n^2 + 2n) + 1$. Donc **impair**."],
      () => ["2n^2 + 1", I, "$2n^2 + 1 = 2 \\times n^2 + 1$ : de la forme $2k + 1$, donc **impair**."],
      () => ["n + (n + 1)", I, "$n + (n + 1) = 2n + 1$ : la somme de deux entiers consécutifs est toujours **impaire**."],
      () => { const k = rand(1, 9); return [`n + ${k}`, D, `Ça dépend de $n$ : avec $n = 0$, on obtient $${k}$ ; avec $n = 1$, on obtient $${k + 1}$. L'un est pair, l'autre impair.`]; },
      () => { const m = pick([3, 5, 7]); return [`${m}n`, D, `Ça dépend de $n$ : avec $n = 1$, on obtient $${m}$ (impair) ; avec $n = 2$, on obtient $${2 * m}$ (pair).`]; },
      () => [`${bigTex}^2 + 1`, bigPair ? I : P, bigPair
        ? `$${bigTex}$ est pair (dernier chiffre pair), donc son carré est pair : $${bigTex}^2 = 2k$. Alors $${bigTex}^2 + 1 = 2k + 1$ est **impair**.`
        : `$${bigTex}$ est impair, donc son carré est impair : $${bigTex}^2 = 2k + 1$. Alors $${bigTex}^2 + 1 = 2k + 2 = 2(k + 1)$ est **pair**.`]
    ];
    const [tex, rep, expl] = pick(T)();
    const numerique = tex.includes("^2 + 1") && !tex.includes("n");
    return {
      enonce: numerique ? `Le nombre $${tex}$ est-il pair ou impair ?` : `$n$ désigne un entier naturel. Le nombre $${tex}$ est-il pair ou impair ?`,
      mode: "choix", choix: numerique ? ["Pair", "Impair"] : ["Toujours pair", "Toujours impair", "Ça dépend de $n$"], attendu: rep,
      aides: [
        "Un nombre pair s'écrit $2k$, un nombre impair s'écrit $2k + 1$, avec $k$ entier.",
        numerique ? "Pair × pair donne pair ; impair × impair donne impair. Puis : pair + $1$ donne impair, impair + $1$ donne pair." : "Essaie d'écrire l'expression sous la forme $2 \\times (\\ldots)$ ou $2 \\times (\\ldots) + 1$.",
        numerique ? "Regarde d'abord le dernier chiffre du nombre." : "Teste avec $n = 0$, $n = 1$, $n = 2$ : si les résultats n'ont pas tous la même parité, ça dépend de $n$."
      ],
      solution: expl
    };
  };

  GEN["ar-python"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const b = rand(3, 9), a = rand(20, 99);
      return {
        enonce: `En Python, l'opérateur $\\texttt{\\%}$ donne le reste de la division euclidienne. Que vaut $\\texttt{${a} \\% ${b}}$ ?`,
        mode: "nombre", prefixe: "Résultat :", attendu: a % b,
        erreurs: [{ valeur: Math.floor(a / b), message: "Ça, c'est le quotient ($\\texttt{//}$ en Python). On demande le reste." }],
        aides: [`Cherche le plus grand multiple de $${b}$ inférieur ou égal à $${a}$.`, `$${Math.floor(a / b)} \\times ${b} = ${Math.floor(a / b) * b}$.`, `Le reste, c'est ce qu'il manque pour arriver à $${a}$ : $${a} - ${Math.floor(a / b) * b}$.`],
        solution: `$${a} = ${Math.floor(a / b)} \\times ${b} + ${a % b}$ avec $${a % b} < ${b}$. Donc $\\texttt{${a} \\% ${b}}$ vaut $${a % b}$.` + (a % b === 0 ? ` Le reste est nul : $${a}$ est un multiple de $${b}$.` : "")
      };
    }
    if (t === 1) {
      const b = rand(3, 13), vrai = Math.random() < 0.5;
      let a; if (vrai) a = b * rand(5, 15); else do { a = rand(40, 180); } while (a % b === 0);
      return {
        enonce: "On considère la fonction Python :\n\n```python\ndef est_multiple(a, b):\n    return a % b == 0\n```\n\n" + `Que renvoie $\\texttt{est\\_multiple(${a}, ${b})}$ ?`,
        mode: "choix", choix: ["True", "False"], attendu: vrai ? 0 : 1,
        aides: ["$\\texttt{a \\% b}$ est le reste de la division de $a$ par $b$.", "$\\texttt{a \\% b == 0}$ vaut $\\texttt{True}$ quand le reste est nul, c'est-à-dire quand $a$ est un multiple de $b$.", `Calcule le reste de la division de $${a}$ par $${b}$.`],
        solution: `$${a} = ${Math.floor(a / b)} \\times ${b} + ${a % b}$ : le reste vaut $${a % b}$. ` + (vrai ? "Il est nul, la fonction renvoie **True** : $" + a + "$ est un multiple de $" + b + "$." : "Il n'est pas nul, la fonction renvoie **False**.")
      };
    }
    const a = rand(4, 13), b = rand(40, 150), m = Math.floor(b / a) * a;
    return {
      enonce: "On considère la fonction Python :\n\n```python\ndef plus_grand_multiple(a, b):\n    m = 0\n    while m + a <= b:\n        m = m + a\n    return m\n```\n\n" + `Que renvoie $\\texttt{plus\\_grand\\_multiple(${a}, ${b})}$ ?`,
      mode: "nombre", prefixe: "Résultat :", attendu: m,
      erreurs: [{ valeur: m + a, message: `$${m + a}$ dépasse $${b}$ : la boucle s'arrête avant.` }],
      aides: [`$m$ prend les valeurs $0$, $${a}$, $${2 * a}$, $${3 * a}$… : les multiples de $${a}$.`, `La boucle continue tant que $m + ${a} \\leqslant ${b}$.`, `Cherche le plus grand multiple de $${a}$ inférieur ou égal à $${b}$.`],
      solution: `$${m} = ${m / a} \\times ${a} \\leqslant ${b}$, mais $${m + a} > ${b}$. La fonction renvoie le plus grand multiple de $${a}$ inférieur ou égal à $${b}$ : $${m}$.`
    };
  };

  GEN["ar-probleme"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      // Deux barges qui partent ensemble
      const [x, y] = pick([[15, 20], [20, 30], [12, 18], [10, 25], [15, 25], [20, 45], [30, 45], [18, 24]]);
      const ppcm = (x * y) / pgcd(x, y);
      const mx = []; for (let k = x; k <= ppcm; k += x) mx.push(k);
      const my = []; for (let k = y; k <= ppcm; k += y) my.push(k);
      return {
        enonce: `À Mamoudzou, une barge part toutes les $${x}$ minutes et une autre toutes les $${y}$ minutes. Elles partent ensemble à 6 h. Au bout de combien de minutes repartent-elles ensemble pour la première fois ?`,
        mode: "nombre", prefixe: "Réponse :", suffixe: "min", attendu: ppcm,
        erreurs: [{ valeur: x * y, message: `$${x * y}$ convient, mais ce n'est pas la **première** fois : cherche plus petit.` }],
        aides: [`Les départs de la première barge ont lieu après $${x}$, $${2 * x}$, $${3 * x}$… minutes : les multiples de $${x}$.`, `Écris aussi les multiples de $${y}$.`, "Cherche le plus petit nombre commun aux deux listes."],
        solution: `Multiples de $${x}$ : $${mx.join("\\,;\\,")}$.\n\nMultiples de $${y}$ : $${my.join("\\,;\\,")}$.\n\nLe premier nombre commun est $${ppcm}$ : elles repartent ensemble au bout de $${ppcm}$ minutes.`
      };
    }
    if (t === 1) {
      // Piles égales de cartons
      const n = pick([24, 30, 36, 40, 42, 48, 60, 72]), d = diviseurs(n).filter((k) => k > 1 && k < n);
      return {
        enonce: `On veut ranger $${n}$ cartons en piles **égales**, avec au moins $2$ piles et au moins $2$ cartons par pile. Combien de rangements différents sont possibles ?`,
        mode: "nombre", prefixe: "Rangements :", attendu: d.length,
        erreurs: [{ valeur: d.length + 2, message: "Tu as compté $1$ pile, ou $1$ carton par pile : c'est interdit ici." }],
        aides: [`Le nombre de piles doit être un **diviseur** de $${n}$.`, `Liste les diviseurs de $${n}$.`, `Enlève $1$ (une seule pile) et $${n}$ (un carton par pile).`],
        solution: `Diviseurs de $${n}$ : $${diviseurs(n).join("\\,;\\,")}$. On enlève $1$ et $${n}$ : il reste $${d.join("\\,;\\,")}$, soit $${d.length}$ rangements possibles.`
      };
    }
    // Somme d'entiers consécutifs
    const k = pick([3, 5]), n = rand(10, 60), S = k === 3 ? 3 * n + 3 : 5 * n + 10;
    return {
      enonce: `La somme de ${k === 3 ? "trois" : "cinq"} entiers consécutifs vaut $${S}$. Quel est le plus petit de ces entiers ?`,
      mode: "nombre", prefixe: "Le plus petit :", attendu: n,
      aides: [`Appelle $n$ le plus petit : les entiers sont $${k === 3 ? "n,\\ n+1,\\ n+2" : "n,\\ n+1,\\ n+2,\\ n+3,\\ n+4"}$.`, `Leur somme vaut $${k === 3 ? "3n + 3" : "5n + 10"}$.`, `Résous $${k === 3 ? "3n + 3" : "5n + 10"} = ${S}$.`],
      solution: `$${k === 3 ? "n + (n+1) + (n+2) = 3n + 3" : "n + (n+1) + \\ldots + (n+4) = 5n + 10"} = ${S}$, donc $${k}n = ${S - (k === 3 ? 3 : 10)}$ et $n = ${n}$.\n\nVérification : $${Array.from({ length: k }, (_, i) => n + i).join(" + ")} = ${S}$. Remarque : $${k === 3 ? "3n + 3 = 3(n + 1)" : "5n + 10 = 5(n + 2)"}$, cette somme est toujours un multiple de $${k}$.`
    };
  };


  /* ---------- Seconde, chapitre 5 : calcul littéral et équations (préfixe cl-) ---------- */
  const expTex = (n) => (n < 0 ? `{${n}}` : `${n}`);

  GEN["cl-puissances"] = function () {
    const a = pick([2, 3, 5, 7, 10, 11]), t = rand(0, 4);
    const n = randNZ(-6, 9), p = randNZ(-6, 9);
    if (t === 4) {
      // Attention aux signes : (−3)^n et −3^n
      const b = rand(2, 5), m = rand(2, 4), avec = Math.random() < 0.5;
      const v = avec ? (-b) ** m : -(b ** m);
      return {
        enonce: `Calcule $${avec ? `(-${b})^${m}` : `-${b}^${m}`}$.`,
        mode: "nombre", prefixe: "Résultat :", attendu: v,
        erreurs: [{ valeur: -v, message: "Attention au signe : la puissance porte-t-elle sur le signe moins ?" }],
        aides: [avec ? `Les parenthèses sont là : on multiplie $${m}$ fois le nombre $(-${b})$.` : `Sans parenthèses, la puissance ne porte que sur $${b}$ : $-${b}^${m} = -(${b}^${m})$.`, `$${b}^${m} = ${b ** m}$.`, "Règle des signes : un nombre pair de facteurs négatifs donne un résultat positif."],
        solution: avec ? `$(-${b})^${m} = ${Array(m).fill(`(-${b})`).join(" \\times ")} = ${v}$ (${m % 2 ? "nombre impair de signes moins : négatif" : "nombre pair de signes moins : positif"}).` : `$-${b}^${m} = -(${Array(m).fill(b).join(" \\times ")}) = ${v}$.`
      };
    }
    const F = [
      [`${a}^${expTex(n)} \\times ${a}^${expTex(p)}`, n + p, `$a^n \\times a^p = a^{n+p}$ : on **additionne** les exposants. $${n} + ${par(p)} = ${n + p}$.`],
      [`\\dfrac{${a}^${expTex(n)}}{${a}^${expTex(p)}}`, n - p, `$\\dfrac{a^n}{a^p} = a^{n-p}$ : on **soustrait** les exposants. $${n} - ${par(p)} = ${n - p}$.`],
      [`\\left(${a}^${expTex(n)}\\right)^${expTex(p)}`, n * p, `$(a^n)^p = a^{n \\times p}$ : on **multiplie** les exposants. $${n} \\times ${par(p)} = ${n * p}$.`],
      [`\\dfrac{1}{${a}^${expTex(n)}}`, -n, `$\\dfrac{1}{a^n} = a^{-n}$. Donc l'exposant est $${-n}$.`]
    ][t];
    return {
      enonce: `Écris $${F[0]}$ sous la forme $${a}^{n}$. Que vaut $n$ ?`,
      mode: "nombre", prefixe: "n =", attendu: F[1],
      erreurs: t === 0 ? [{ valeur: n * p, message: "Pour un produit de puissances, on additionne les exposants (on ne les multiplie pas)." }] : t === 2 ? [{ valeur: n + p, message: "Pour une puissance de puissance, on multiplie les exposants." }] : [],
      aides: ["Les règles : $a^n \\times a^p = a^{n+p}$ ; $\\dfrac{a^n}{a^p} = a^{n-p}$ ; $(a^n)^p = a^{np}$ ; $\\dfrac{1}{a^n} = a^{-n}$.", ["Produit : on additionne les exposants.", "Quotient : exposant du haut moins exposant du bas.", "Puissance d'une puissance : on multiplie les exposants.", "Inverse : on change le signe de l'exposant."][t], "Attention aux exposants négatifs : mets-les entre parenthèses dans ton calcul."],
      solution: `${F[2]}\n\nDonc $${F[0]} = ${a}^{${F[1]}}$.`
    };
  };

  GEN["cl-racines"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      // Extraire un carré parfait : √(k²m) = k√m
      const k = rand(2, 9), m = pick([2, 3, 5, 6, 7, 10]), n = k * k * m;
      return {
        enonce: `Écris $\\sqrt{${n}}$ sous la forme $a\\sqrt{${m}}$, avec $a$ entier. Que vaut $a$ ?`,
        mode: "nombre", prefixe: "a =", attendu: k,
        erreurs: [{ valeur: k * k, message: `$${k * k}$ est le carré parfait ; on garde sa racine carrée.` }],
        aides: [`Fais apparaître un carré parfait dans $${n}$ : $${n} = \\ldots \\times ${m}$.`, `$${n} = ${k * k} \\times ${m}$.`, `$\\sqrt{${k * k} \\times ${m}} = \\sqrt{${k * k}} \\times \\sqrt{${m}}$.`],
        solution: `$\\sqrt{${n}} = \\sqrt{${k * k} \\times ${m}} = \\sqrt{${k * k}} \\times \\sqrt{${m}} = ${k}\\sqrt{${m}}$. Donc $a = ${k}$.`
      };
    }
    if (t === 1) {
      // √a × √b = √(ab) avec un produit carré parfait
      const [x, y] = pick([[2, 8], [3, 12], [2, 18], [3, 27], [5, 20], [2, 32], [6, 24], [7, 28], [5, 45], [2, 50], [3, 48], [10, 40]]);
      const v = Math.sqrt(x * y);
      return {
        enonce: `Calcule $\\sqrt{${x}} \\times \\sqrt{${y}}$.`,
        mode: "nombre", prefixe: "Résultat :", attendu: v,
        aides: ["Pour $a$ et $b$ positifs : $\\sqrt{a} \\times \\sqrt{b} = \\sqrt{a \\times b}$.", `$${x} \\times ${y} = ${x * y}$.`, `$${x * y}$ est un carré parfait : $${v}^2 = ${x * y}$.`],
        solution: `$\\sqrt{${x}} \\times \\sqrt{${y}} = \\sqrt{${x} \\times ${y}} = \\sqrt{${x * y}} = ${v}$.`
      };
    }
    // √(a²) = |a|
    const a = randNZ(-12, 12);
    return {
      enonce: `Calcule $\\sqrt{${par(a)}^2}$.`,
      mode: "nombre", prefixe: "Résultat :", attendu: Math.abs(a),
      erreurs: a < 0 ? [{ valeur: a, message: "Une racine carrée n'est jamais négative." }] : [],
      aides: [`Calcule d'abord le carré : $${par(a)}^2 = ${a * a}$.`, `Quel nombre **positif** a pour carré $${a * a}$ ?`, "Retiens : $\\sqrt{a^2} = |a|$, la valeur absolue de $a$."],
      solution: `$\\sqrt{${par(a)}^2} = \\sqrt{${a * a}} = ${Math.abs(a)}$. C'est la règle $\\sqrt{a^2} = |a|$ : ${a < 0 ? `ici $|${a}| = ${-a}$` : "ici $a$ est positif, $|a| = a$"}.`
    };
  };

  // Polynôme de degré 2 en x écrit proprement : [a, b, c] → « ax^2 + bx + c »
  const p2 = (a, b, c) => poly([a, b, c]);

  GEN["cl-developper"] = function () {
    const t = rand(0, 3);
    let tex, A, B, C, aide2;
    if (t === 0) { const a = randNZ(-4, 4), b = randNZ(-7, 7), c = randNZ(-4, 4), d = randNZ(-7, 7); tex = `(${poly([a, b])})(${poly([c, d])})`; A = a * c; B = a * d + b * c; C = b * d; aide2 = `$(${poly([a, b])})(${poly([c, d])}) = ${a === 1 ? "" : a === -1 ? "-" : a}x \\times (${poly([c, d])}) ${sg(b)} \\times (${poly([c, d])})$.`; }
    else if (t === 1) { const a = rand(1, 5), b = rand(1, 9); tex = `(${poly([a, b])})^2`; A = a * a; B = 2 * a * b; C = b * b; aide2 = `$(a + b)^2 = a^2 + 2ab + b^2$ avec $a = ${a === 1 ? "" : a}x$ et $b = ${b}$.`; }
    else if (t === 2) { const a = rand(1, 5), b = rand(1, 9); tex = `(${poly([a, -b])})^2`; A = a * a; B = -2 * a * b; C = b * b; aide2 = `$(a - b)^2 = a^2 - 2ab + b^2$ avec $a = ${a === 1 ? "" : a}x$ et $b = ${b}$.`; }
    else { const a = rand(1, 5), b = rand(1, 9); tex = `(${poly([a, b])})(${poly([a, -b])})`; A = a * a; B = 0; C = -b * b; aide2 = `$(a + b)(a - b) = a^2 - b^2$ avec $a = ${a === 1 ? "" : a}x$ et $b = ${b}$.`; }
    const bonne = p2(A, B, C);
    const faux = [p2(A, 0, C), p2(A, -B, C), p2(A, B, -C), p2(A + (A > 0 ? 1 : -1), B, C), p2(A, B ? B / 2 : 2 * Math.abs(C), C)];
    const m = melangeChoix(`$${bonne}$`, shuffle(faux).map((f) => `$${f}$`));
    return {
      enonce: `Développe et réduis $${tex}$.`,
      mode: "choix", choix: m.choix, attendu: m.attendu,
      aides: [t === 0 ? "Double distributivité : chaque terme de la première parenthèse multiplie chaque terme de la seconde." : "Reconnais une identité remarquable.", aide2, t === 1 || t === 2 ? "N'oublie pas le double produit $2ab$ !" : "Fais attention aux signes, puis regroupe les termes en $x$."],
      solution: `$${tex} = ${bonne}$.` + (t === 1 || t === 2 ? " Le terme du milieu est le double produit $2ab$." : t === 3 ? " Les termes en $x$ s'annulent : c'est $a^2 - b^2$." : "")
    };
  };

  GEN["cl-factoriser"] = function () {
    const t = rand(0, 2);
    let tex, bonne, faux, aide2, sol;
    if (t === 0) {
      // facteur commun entre parenthèses : (x + a)(bx + c) + (x + a)(dx + e)
      const a = randNZ(-6, 6), b = rand(1, 4), c = randNZ(-6, 6), d = rand(1, 4), e = randNZ(-6, 6);
      const f = `(${poly([1, a])})`;
      tex = `${f}(${poly([b, c])}) + ${f}(${poly([d, e])})`;
      bonne = `${f}(${poly([b + d, c + e])})`;
      faux = [`${f}(${poly([b - d, c - e])})`, `${f}^2(${poly([b + d, c + e])})`, `(${poly([1, 2 * a])})(${poly([b + d, c + e])})`];
      aide2 = `Le facteur commun est $${f}$.`;
      sol = `$${tex} = ${f}\\big[(${poly([b, c])}) + (${poly([d, e])})\\big] = ${bonne}$.`;
    } else if (t === 1) {
      // a²x² − b² = (ax − b)(ax + b)
      const a = rand(1, 5), b = rand(1, 9);
      tex = p2(a * a, 0, -b * b);
      bonne = `(${poly([a, -b])})(${poly([a, b])})`;
      faux = [`(${poly([a, -b])})^2`, `(${poly([a, b])})^2`, `(${poly([a * a, -b])})(${poly([a * a, b])})`];
      aide2 = `$${tex} = (${a === 1 ? "" : a}x)^2 - ${b}^2$ : c'est $a^2 - b^2$.`;
      sol = `$${tex} = (${a === 1 ? "" : a}x)^2 - ${b}^2 = ${bonne}$, d'après $a^2 - b^2 = (a - b)(a + b)$.`;
    } else {
      // a²x² ± 2abx + b² = (ax ± b)²
      const a = rand(1, 4), b = rand(1, 8), s = pick([1, -1]);
      tex = p2(a * a, 2 * a * b * s, b * b);
      bonne = `(${poly([a, s * b])})^2`;
      faux = [`(${poly([a, -s * b])})^2`, `(${poly([a, s * b])})(${poly([a, -s * b])})`, `(${poly([a * a, s * b])})^2`];
      aide2 = `Le premier terme est $(${a === 1 ? "" : a}x)^2$, le dernier est $${b}^2$. Vérifie le double produit : $2 \\times ${a === 1 ? "" : a}x \\times ${b} = ${2 * a * b}x$.`;
      sol = `$${tex} = (${a === 1 ? "" : a}x)^2 ${s > 0 ? "+" : "-"} 2 \\times ${a === 1 ? "" : a}x \\times ${b} + ${b}^2 = ${bonne}$.`;
    }
    const m = melangeChoix(`$${bonne}$`, faux.map((f) => `$${f}$`));
    return {
      enonce: `Factorise $${tex}$.`,
      mode: "choix", choix: m.choix, attendu: m.attendu,
      aides: ["Factoriser, c'est écrire sous forme d'un **produit**. Cherche d'abord un facteur commun, sinon une identité remarquable.", aide2, "Pour vérifier, développe ta réponse : tu dois retrouver l'expression de départ."],
      solution: sol
    };
  };

  GEN["cl-equation"] = function () {
    let a, b, c, d;
    do { a = randNZ(-9, 9); c = randNZ(-9, 9); b = randNZ(-12, 12); d = randNZ(-12, 12); } while (a === c);
    const num = d - b, den = a - c, sol = num / den;
    const solTex = frac(num, den);
    return {
      enonce: `Résous l'équation $${poly([a, b])} = ${poly([c, d])}$.` + (Number.isInteger(sol) ? "" : " Donne la solution sous forme de fraction, par exemple $7/3$."),
      mode: "nombre", prefixe: "x =", attendu: sol,
      erreurs: [{ valeur: -sol, message: "Erreur de signe : quand un terme change de membre, il change de signe." }, { valeur: den / num, message: "Tu as divisé dans le mauvais sens : $x = \\dfrac{\\ldots}{\\text{coefficient de } x}$." }].filter((e) => isFinite(e.valeur)),
      aides: [`Regroupe les $x$ à gauche : retire $${c === 1 ? "" : c === -1 ? "-" : c}x$ des deux côtés.`, `On obtient $${den === 1 ? "" : den === -1 ? "-" : den}x ${sg(b)} = ${d}$, puis $${den === 1 ? "" : den === -1 ? "-" : den}x = ${num}$.`, `Divise par $${den}$.`],
      solution: `$${poly([a, b])} = ${poly([c, d])} \\iff ${poly([den, 0])} = ${d} ${b > 0 ? "-" : "+"} ${Math.abs(b)} \\iff ${poly([den, 0])} = ${num} \\iff x = ${solTex}$.\n\nChaque étape est une **équivalence** ($\\iff$) : l'équation a une seule solution, $${solTex}$.`
    };
  };

  GEN["cl-carre"] = function () {
    const t = rand(0, 5);
    let k, kTex, sol, expl;
    if (t === 0) { k = -rand(1, 30); kTex = `${k}`; sol = []; expl = `Un carré n'est jamais négatif : $x^2 = ${k}$ n'a **aucune** solution.`; }
    else if (t === 1) { k = 0; kTex = "0"; sol = [0]; expl = "$x^2 = 0$ a une seule solution : $0$."; }
    else if (t <= 3) { const r = rand(1, 15); k = r * r; kTex = `${k}`; sol = [-r, r]; expl = `$${k} > 0$ : deux solutions, $-\\sqrt{${k}} = -${r}$ et $\\sqrt{${k}} = ${r}$.`; }
    else { let p, q; do { p = rand(1, 9); q = rand(2, 9); } while (pgcd(p, q) !== 1); k = (p * p) / (q * q); kTex = `\\dfrac{${p * p}}{${q * q}}`; sol = [-p / q, p / q]; expl = `$${kTex} > 0$ : deux solutions, $-\\sqrt{${kTex}} = -\\dfrac{${p}}{${q}}$ et $\\dfrac{${p}}{${q}}$. Écris-les $-${p}/${q}$ et $${p}/${q}$.`; }
    return {
      enonce: `Résous dans $\\mathbb{R}$ l'équation $x^2 = ${kTex}$. Écris les solutions séparées par « ; », ou « aucune ».`,
      mode: "ensemble", prefixe: "Solution(s) :", attendu: sol,
      aides: ["Trois cas : si $k < 0$, aucune solution ; si $k = 0$, une seule solution ; si $k > 0$, deux solutions $-\\sqrt{k}$ et $\\sqrt{k}$.", `Ici $k = ${kTex}$.`, "N'oublie pas la solution **négative** : $(-3)^2 = 9$ aussi."],
      solution: expl
    };
  };

  GEN["cl-fraction"] = function () {
    // a/(x + c) + b  ou  a/x − b/(x + c), mis au même dénominateur
    const t = rand(0, 1);
    if (t === 0) {
      const a = randNZ(-7, 7), b = randNZ(-5, 5), c = randNZ(-6, 6);
      const den = poly([1, c]), num = poly([b, a + b * c]);
      const bonne = `\\dfrac{${num}}{${den}}`;
      const faux = [`\\dfrac{${a + b}}{${den}}`, `\\dfrac{${poly([b, a + c])}}{${den}}`, `\\dfrac{${poly([b, a - b * c])}}{${den}}`];
      const m = melangeChoix(`$${bonne}$`, faux.map((f) => `$${f}$`));
      return {
        enonce: `Pour $x \\neq ${-c}$, écris $\\dfrac{${a}}{${den}} ${sg(b)}$ sous la forme d'un seul quotient.`,
        mode: "choix", choix: m.choix, attendu: m.attendu,
        aides: [`Écris $${b}$ avec le dénominateur $${den}$ : $${b} = \\dfrac{${b}(${den})}{${den}}$.`, `Développe le numérateur : $${b}(${den}) = ${poly([b, b * c])}$.`, `Additionne les numérateurs : $${a} + ${par(b)}(${den})$.`],
        solution: `$\\dfrac{${a}}{${den}} ${sg(b)} = \\dfrac{${a}}{${den}} + \\dfrac{${b}(${den})}{${den}} = \\dfrac{${a} ${sg(b * c)} ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}x}{${den}} = ${bonne}$.`
      };
    }
    const a = rand(1, 6), b = rand(1, 6), c = randNZ(-5, 5);
    const den = `x(${poly([1, c])})`, numA = a - b, numB = a * c;
    const num = poly([numA, numB]) || "0";
    const bonne = `\\dfrac{${num}}{${den}}`;
    const faux = [`\\dfrac{${a - b}}{${den}}`, `\\dfrac{${a - b}}{${poly([2, c])}}`, `\\dfrac{${poly([a + b, numB])}}{${den}}`];
    const m = melangeChoix(`$${bonne}$`, faux.map((f) => `$${f}$`));
    return {
      enonce: `Pour $x \\neq 0$ et $x \\neq ${-c}$, écris $\\dfrac{${a}}{x} - \\dfrac{${b}}{${poly([1, c])}}$ sous la forme d'un seul quotient.`,
      mode: "choix", choix: m.choix, attendu: m.attendu,
      aides: [`Le dénominateur commun est $x(${poly([1, c])})$.`, `$\\dfrac{${a}}{x} = \\dfrac{${a}(${poly([1, c])})}{x(${poly([1, c])})}$ et $\\dfrac{${b}}{${poly([1, c])}} = \\dfrac{${b}x}{x(${poly([1, c])})}$.`, `Numérateur : $${a}(${poly([1, c])}) - ${b}x$. Développe et réduis.`],
      solution: `$\\dfrac{${a}}{x} - \\dfrac{${b}}{${poly([1, c])}} = \\dfrac{${a}(${poly([1, c])}) - ${b}x}{${den}} = \\dfrac{${poly([a, a * c])} - ${b}x}{${den}} = ${bonne}$.`
    };
  };

  GEN["cl-python"] = function () {
    const a = pick([2, 3, 5, 10]), s = pick([50, 100, 200, 500, 1000, 5000, 10000, 100000]);
    let n = 0, p = 1; while (p <= s) { p *= a; n++; }
    return {
      enonce: "On considère la fonction Python :\n\n```python\ndef premiere_puissance(a, s):\n    n = 0\n    p = 1\n    while p <= s:\n        p = p * a\n        n = n + 1\n    return n\n```\n\n" + `Que renvoie $\\texttt{premiere\\_puissance(${a}, ${s})}$ ?`,
      mode: "nombre", prefixe: "Résultat :", attendu: n,
      erreurs: [{ valeur: n - 1, message: `$${a}^{${n - 1}} = ${nb(a ** (n - 1))}$ ne dépasse pas $${nb(s)}$ : la boucle continue encore une fois.` }],
      aides: [`$p$ prend les valeurs $1$, $${a}$, $${a * a}$… : les puissances de $${a}$. $n$ compte les tours.`, "La boucle **while** s'arrête dès que $p$ dépasse strictement $s$.", `Cherche la première puissance de $${a}$ strictement supérieure à $${nb(s)}$.`],
      solution: `$${a}^{${n - 1}} = ${nb(a ** (n - 1))} \\leqslant ${nb(s)}$ mais $${a}^{${n}} = ${nb(a ** n)} > ${nb(s)}$. La fonction renvoie $${n}$ : c'est le plus petit entier $n$ tel que $${a}^n > ${nb(s)}$.`
    };
  };


  /* ---------- Seconde, chapitre 6 : fonctions affines, inégalités, inéquations (préfixe fa-) ---------- */
  const affTex = (m, p) => poly([m, p]);

  GEN["fa-taux"] = function () {
    const m = randNZ(-6, 6), p = randNZ(-9, 9);
    let a = rand(-5, 3), b; do { b = rand(-3, 8); } while (b === a);
    if (a > b) [a, b] = [b, a];
    const fa = m * a + p, fb = m * b + p;
    const ctx = Math.random() < 0.5;
    return {
      enonce: ctx
        ? `$f$ est une fonction affine telle que $f(${a}) = ${fa}$ et $f(${b}) = ${fb}$. Calcule son taux d'accroissement $m$.`
        : `La droite représentant la fonction affine $f$ passe par $A(${a}\\,;${fa})$ et $B(${b}\\,;${fb})$. Quel est le coefficient directeur $m$ ?`,
      mode: "nombre", prefixe: "m =", attendu: m,
      erreurs: [{ valeur: (b - a) / (fb - fa), message: "Tu as inversé : c'est la variation des **images** divisée par la variation des $x$." }, { valeur: -m, message: "Erreur de signe : fais bien $f(b) - f(a)$ et $b - a$ dans le même ordre." }].filter((e) => isFinite(e.valeur)),
      aides: ["$m = \\dfrac{f(b) - f(a)}{b - a}$ : la variation des images divisée par la variation des $x$.", `$f(${b}) - f(${a}) = ${fb} - ${par(fa)} = ${fb - fa}$.`, `$${b} - ${par(a)} = ${b - a}$.`],
      solution: `$m = \\dfrac{${fb} - ${par(fa)}}{${b} - ${par(a)}} = \\dfrac{${fb - fa}}{${b - a}} = ${m}$. Quand $x$ augmente de $1$, $f(x)$ ${m > 0 ? "augmente" : "diminue"} de $${Math.abs(m)}$.`
    };
  };

  GEN["fa-expression"] = function () {
    const m = randNZ(-5, 5), p = randNZ(-9, 9);
    let a = rand(-4, 2), b; do { b = rand(-2, 6); } while (b === a);
    const fa = m * a + p, fb = m * b + p;
    const bonne = affTex(m, p);
    const faux = [affTex(m, fa), affTex(-m, p), affTex(m, -p), affTex(m, p + m)];
    const ch = melangeChoix(`$f(x) = ${bonne}$`, faux.map((f) => `$f(x) = ${f}$`));
    return {
      enonce: `$f$ est une fonction affine telle que $f(${a}) = ${fa}$ et $f(${b}) = ${fb}$. Quelle est son expression ?`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`Calcule d'abord $m = \\dfrac{f(${b}) - f(${a})}{${b} - ${par(a)}}$.`, `$m = \\dfrac{${fb - fa}}{${b - a}} = ${m}$. Puis $f(x) = ${m}x + p$.`, `Trouve $p$ avec $f(${a}) = ${fa}$ : $${m} \\times ${par(a)} + p = ${fa}$.`],
      solution: `$m = \\dfrac{${fb} - ${par(fa)}}{${b} - ${par(a)}} = ${m}$.\n\n$f(${a}) = ${fa}$ donne $${m * a} + p = ${fa}$, donc $p = ${p}$.\n\n$f(x) = ${bonne}$. Vérification : $f(${b}) = ${m} \\times ${par(b)} ${sg(p)} = ${fb}$.`
    };
  };

  GEN["fa-variations"] = function () {
    const m = randNZ(-7, 7), p = randNZ(-9, 9), t = rand(0, 3);
    let tex, coef = m;
    if (t === 0) tex = affTex(m, p);
    else if (t === 1) tex = `${p} ${m < 0 ? "-" : "+"} ${Math.abs(m) === 1 ? "" : Math.abs(m)}x`; // p + mx
    else if (t === 2) { const d = rand(2, 5); coef = m / d; tex = `\\dfrac{${poly([m, p])}}{${d}}`; }
    else { tex = `${m === 1 ? "" : m === -1 ? "-" : m}(x ${sg(p)})`; }
    const rep = coef > 0 ? 0 : 1;
    return {
      enonce: `Quel est le sens de variation de la fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = ${tex}$ ?`,
      mode: "choix", choix: ["Croissante sur $\\mathbb{R}$", "Décroissante sur $\\mathbb{R}$", "Constante sur $\\mathbb{R}$"], attendu: rep,
      aides: ["Écris $f(x)$ sous la forme $mx + p$.", "Seul le signe de $m$, le coefficient de $x$, compte.", "$m > 0$ : croissante. $m < 0$ : décroissante. $m = 0$ : constante."],
      solution: `$f(x) = ${tex}$ s'écrit $mx + p$ avec $m = ${t === 2 ? `\\dfrac{${m}}{${Math.round(m / coef)}}` : m}$. ${coef > 0 ? "$m > 0$, donc $f$ est **croissante** sur $\\mathbb{R}$." : "$m < 0$, donc $f$ est **décroissante** sur $\\mathbb{R}$."}`
    };
  };

  GEN["fa-signe"] = function () {
    // Tableau de signes : à droite de x0, quel signe ?
    let m = randNZ(-6, 6), x0 = rand(-6, 6);
    const p = -m * x0;
    const cote = Math.random() < 0.5 ? "gauche" : "droite";
    const positif = (m > 0) === (cote === "droite");
    return {
      enonce: `Soit $f(x) = ${affTex(m, p)}$. Dans le tableau de signes de $f$, quel est le signe de $f(x)$ ${cote === "droite" ? `pour $x > ${x0}$` : `pour $x < ${x0}$`} ?`,
      mode: "choix", choix: ["$+$ (positif)", "$-$ (négatif)"], attendu: positif ? 0 : 1,
      aides: [`Cherche d'abord où $f$ s'annule : $${affTex(m, p)} = 0 \\iff x = ${x0}$.`, `$m = ${m}$ : ${m > 0 ? "$f$ est croissante, elle passe du négatif au positif" : "$f$ est décroissante, elle passe du positif au négatif"}.`, `Tu peux aussi tester une valeur : $f(${cote === "droite" ? x0 + 1 : x0 - 1}) = ${m * (cote === "droite" ? x0 + 1 : x0 - 1) + p}$.`],
      solution: `$f(x) = 0 \\iff x = ${x0}$. Comme $m = ${m} ${m > 0 ? "> 0" : "< 0"}$, $f(x)$ est ${m > 0 ? "négatif avant" : "positif avant"} $${x0}$ et ${m > 0 ? "positif après" : "négatif après"}.\n\nDonc pour $x ${cote === "droite" ? ">" : "<"} ${x0}$, $f(x)$ est **${positif ? "positif" : "négatif"}**.`
    };
  };

  GEN["fa-inegalite"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const k = randNZ(-6, 6), s = pick(["<", "\\leqslant"]);
      const inv = k < 0, s2 = inv ? (s === "<" ? ">" : "\\geqslant") : s;
      const ch = ["<", ">", "\\leqslant", "\\geqslant"];
      return {
        enonce: `On sait que $a ${s} b$. Quel symbole compléter : $${k}a \\;\\;?\\;\\; ${k}b$ ?`,
        mode: "choix", choix: ch.map((c) => `$${c}$`), attendu: ch.indexOf(s2),
        aides: ["On multiplie les deux membres d'une inégalité par un même nombre.", `Le nombre est $${k}$ : est-il positif ou négatif ?`, "Par un nombre **positif**, le sens est conservé. Par un nombre **négatif**, il change."],
        solution: `$${k}$ est ${inv ? "**négatif** : le sens de l'inégalité **change**" : "**positif** : le sens est **conservé**"}. Donc $${k}a ${s2} ${k}b$.` + (inv ? " Exemple : $1 < 2$ mais $-1 > -2$." : "")
      };
    }
    if (t === 1) {
      const a = rand(-5, 5), b = rand(-5, 5);
      return {
        enonce: `On sait que $x \\leqslant ${a}$ et $y \\leqslant ${b}$. Quel est le plus petit nombre $c$ dont on est sûr que $x + y \\leqslant c$ ?`,
        mode: "nombre", prefixe: "c =", attendu: a + b,
        aides: ["On peut additionner membre à membre deux inégalités **de même sens**.", `$x + y \\leqslant ${a} + ${par(b)}$.`, "Attention : on n'a pas le droit de soustraire des inégalités membre à membre."],
        solution: `On additionne membre à membre : $x + y \\leqslant ${a} + ${par(b)} = ${a + b}$. Donc $c = ${a + b}$.`
      };
    }
    const lo = rand(-4, 2), hi = lo + rand(2, 6), k = randNZ(-4, 4), q = randNZ(-6, 6);
    const v1 = k * lo + q, v2 = k * hi + q, mn = Math.min(v1, v2), mx = Math.max(v1, v2);
    const demandeMin = Math.random() < 0.5;
    return {
      enonce: `On sait que $${lo} \\leqslant x \\leqslant ${hi}$. On encadre $${affTex(k, q)}$ : $\\alpha \\leqslant ${affTex(k, q)} \\leqslant \\beta$. Que vaut $${demandeMin ? "\\alpha" : "\\beta"}$ ?`,
      mode: "nombre", prefixe: demandeMin ? "α =" : "β =", attendu: demandeMin ? mn : mx,
      erreurs: [{ valeur: demandeMin ? mx : mn, message: k < 0 ? "Tu as oublié de changer le sens en multipliant par un nombre négatif." : "Ça, c'est l'autre borne." }],
      aides: [`Multiplie chaque membre par $${k}$${k < 0 ? " : attention, le sens change !" : "."}`, `Tu obtiens ${k > 0 ? `$${k * lo} \\leqslant ${k}x \\leqslant ${k * hi}$` : `$${k * hi} \\leqslant ${k}x \\leqslant ${k * lo}$`}.`, `Ajoute $${q}$ à chaque membre.`],
      solution: `${k > 0 ? `$${k * lo} \\leqslant ${k}x \\leqslant ${k * hi}$` : `On multiplie par $${k} < 0$, le sens change : $${k * hi} \\leqslant ${k}x \\leqslant ${k * lo}$`}, puis on ajoute $${q}$ : $${mn} \\leqslant ${affTex(k, q)} \\leqslant ${mx}$.`
    };
  };

  GEN["fa-inequation"] = function () {
    let a, b, c, d;
    do { a = randNZ(-7, 7); c = randNZ(-7, 7); } while (a === c);
    const x0 = rand(-6, 6); b = randNZ(-9, 9); d = (a - c) * x0 + b;
    const op = pick(OPS), A = a - c;
    const opF = A < 0 ? OPS_INV[op] : op; // sens final x opF x0
    const large = op === "\\geqslant" || op === "\\leqslant";
    const I = (sens, lg) => (sens === ">" || sens === "\\geqslant") ? `${lg ? "[" : "]"}${x0}\\,;+\\infty[` : `]-\\infty\\,;${x0}${lg ? "]" : "["}`;
    const bonne = I(opF, large), oubli = I(A < 0 ? op : OPS_INV[op], large), crochet = I(opF, !large), autre = `]-\\infty\\,;${-x0}${large ? "]" : "["}`;
    const ch = melangeChoix(`$${bonne}$`, [oubli, crochet, autre].map((f) => `$${f}$`));
    return {
      enonce: `Résous l'inéquation $${affTex(a, b)} ${op} ${affTex(c, d)}$. Quel est l'ensemble des solutions ?`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Regroupe les $x$ d'un côté et les nombres de l'autre, comme pour une équation.", `On obtient $${affTex(A, 0)} ${op} ${d - b}$.`, A < 0 ? `On divise par $${A}$, un nombre **négatif** : le sens de l'inégalité change !` : `On divise par $${A}$, un nombre positif : le sens ne change pas.`],
      solution: `$${affTex(a, b)} ${op} ${affTex(c, d)} \\iff ${affTex(A, 0)} ${op} ${d - b} \\iff x ${opF} ${x0}$${A < 0 ? " (division par un négatif : le sens change)" : ""}.\n\nL'ensemble des solutions est $S = ${bonne}$.`
    };
  };

  GEN["fa-modele"] = function () {
    // Deux tarifs de taxi : prise en charge + prix au km
    let pA, mA, pB, mB, x0;
    do { mA = rand(2, 6); mB = mA + rand(1, 3); x0 = rand(3, 15); pA = rand(2, 9) + (mB - mA) * x0; pB = pA - (mB - mA) * x0; } while (pB < 1);
    return {
      enonce: `Deux taxis : le taxi A prend $${pA}$ € de prise en charge puis $${mA}$ € par km ; le taxi B prend $${pB}$ € puis $${mB}$ € par km. On note $x$ la distance en km. À partir de quelle distance $d$ le taxi A est-il **moins cher** que B ? (A est moins cher pour $x > d$.)`,
      mode: "nombre", prefixe: "d =", suffixe: "km", attendu: x0,
      aides: [`Prix du taxi A : $${affTex(mA, pA)}$. Prix du taxi B : $${affTex(mB, pB)}$.`, `Résous l'inéquation $${affTex(mA, pA)} < ${affTex(mB, pB)}$.`, `$${pA} - ${pB} < ${mB}x - ${mA}x$, soit $${pA - pB} < ${affTex(mB - mA, 0)}$.`],
      solution: `$${affTex(mA, pA)} < ${affTex(mB, pB)} \\iff ${pA - pB} < ${affTex(mB - mA, 0)} \\iff x > ${x0}$.\n\nLe taxi A est moins cher dès que la course dépasse $${x0}$ km (à $${x0}$ km, les deux coûtent $${mA * x0 + pA}$ €).`
    };
  };

  GEN["fa-negation"] = function () {
    const t = rand(0, 2), a = rand(-6, 6), b = a + rand(2, 6);
    let enonce, bonne, faux, sol;
    if (t === 0) {
      const op = pick(OPS);
      const neg = { "<": "\\geqslant", "\\leqslant": ">", ">": "\\leqslant", "\\geqslant": "<" }[op];
      enonce = `Quelle est la négation de la proposition « $x ${op} ${a}$ » ?`;
      bonne = `x ${neg} ${a}`; faux = [`x ${OPS_INV[op]} ${a}`, `x ${op} ${-a}`, `x ${neg} ${-a}`];
      sol = `Le contraire de « $x ${op} ${a}$ » est « $x ${neg} ${a}$ » : ${op === "<" || op === ">" ? `le nombre $${a}$ lui-même change de camp, il fait partie de la négation` : `le nombre $${a}$ n'est plus dans la négation`}.`;
    } else if (t === 1) {
      enonce = `Quelle est la négation de « $x > ${a}$ **et** $x < ${b}$ » ?`;
      bonne = `x \\leqslant ${a} \\text{ ou } x \\geqslant ${b}`; faux = [`x \\leqslant ${a} \\text{ et } x \\geqslant ${b}`, `x < ${a} \\text{ ou } x > ${b}`, `x > ${b} \\text{ et } x < ${a}`];
      sol = `La négation de « A **et** B » est « non A **ou** non B ». Non ($x > ${a}$) : $x \\leqslant ${a}$. Non ($x < ${b}$) : $x \\geqslant ${b}$.`;
    } else {
      enonce = `« $x > ${a}$ et $x \\leqslant ${b}$ » s'écrit avec un intervalle :`;
      bonne = `x \\in \\,]${a}\\,;${b}]`; faux = [`x \\in [${a}\\,;${b}[`, `x \\in \\,]${a}\\,;${b}[`, `x \\in \\,]-\\infty\\,;${a}[ \\cup \\,]${b}\\,;+\\infty[`];
      sol = `« et » : les deux conditions à la fois, c'est l'intersection. $${a}$ est exclu (inégalité stricte), $${b}$ est inclus : $x \\in \\,]${a}\\,;${b}]$.`;
    }
    const ch = melangeChoix(`$${bonne}$`, faux.map((f) => `$${f}$`));
    return {
      enonce, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["La négation d'une proposition est vraie exactement quand la proposition est fausse.", "Le contraire de « $<$ » est « $\\geqslant$ » (pas « $>$ ») : la borne change de camp.", "La négation de « et » est « ou », et inversement."],
      solution: sol
    };
  };

  GEN["fa-python"] = function () {
    const m = randNZ(-4, 5), p = randNZ(-6, 6), d = rand(-3, 0), f = d + rand(4, 7), k = rand(2, f - d);
    const vals = []; for (let x = d; x < f; x++) vals.push(m * x + p);
    const q = Math.random() < 0.5;
    return {
      enonce: "On considère le programme Python :\n\n```python\nfor x in range(" + d + ", " + f + "):\n    print(" + (m === 1 ? "" : m === -1 ? "-" : m + " * ") + "x" + (p ? (p > 0 ? " + " + p : " - " + -p) : "") + ")\n```\n\n" + (q ? "Combien de nombres ce programme affiche-t-il ?" : `Quel est le ${k === 1 ? "premier" : k + "e"} nombre affiché ?`),
      mode: "nombre", prefixe: "Réponse :", attendu: q ? vals.length : vals[k - 1],
      erreurs: q ? [{ valeur: vals.length + 1, message: `$\\texttt{range(${d}, ${f})}$ s'arrête **avant** $${f}$.` }] : [],
      aides: [`$\\texttt{range(${d}, ${f})}$ donne les entiers de $${d}$ à $${f - 1}$ (le $${f}$ est exclu).`, "La boucle **for** fait un tour pour chaque valeur de $x$ et affiche $f(x)$.", q ? `Compte les entiers de $${d}$ à $${f - 1}$.` : `Le ${k === 1 ? "premier" : k + "e"} tour correspond à $x = ${d + k - 1}$.`],
      solution: `$x$ prend les valeurs $${Array.from({ length: f - d }, (_, i) => d + i).join("\\,;\\,")}$. Le programme affiche le tableau de valeurs : $${vals.join("\\,;\\,")}$.\n\n` + (q ? `Il affiche $${vals.length}$ nombres.` : `Le ${k === 1 ? "premier" : k + "e"} nombre est $f(${d + k - 1}) = ${vals[k - 1]}$.`)
    };
  };


  /* ---------- Seconde, chapitre 7 : vecteurs, translation et coordonnées (préfixe ve-) ---------- */
  const vec = (n) => `\\overrightarrow{${n}}`;
  const pt = (x, y) => `(${nb(x)}\\,;${nb(y)})`;
  const deuxPoints = (lim) => { let A, B; do { A = [rand(-lim, lim), rand(-lim, lim)]; B = [rand(-lim, lim), rand(-lim, lim)]; } while (A[0] === B[0] && A[1] === B[1]); return [A, B]; };

  GEN["ve-lire"] = function () {
    let x1, y1, dx, dy;
    do { x1 = rand(-4, 2); y1 = rand(-3, 2); dx = randNZ(-4, 4); dy = rand(-3, 3); } while (x1 + dx < -5 || x1 + dx > 5 || y1 + dy < -4 || y1 + dy > 4);
    const q = Math.random() < 0.5 ? "x" : "y";
    return {
      enonce: `Le vecteur $\\vec{u}$ est représenté dans le repère orthonormé ci-dessous. Lis son ${q === "x" ? "abscisse $x$" : "ordonnée $y$"} : $\\vec{u}\\begin{pmatrix} x \\\\ y \\end{pmatrix}$.`,
      figure: graph({ xmin: -5, xmax: 5, ymin: -4, ymax: 4, fleches: [{ x1, y1, x2: x1 + dx, y2: y1 + dy, label: "u" }], aria: "Un vecteur u dans un repère quadrillé" }),
      mode: "nombre", prefixe: `${q} =`, attendu: q === "x" ? dx : dy,
      erreurs: [{ valeur: q === "x" ? x1 + dx : y1 + dy, message: "Ça, c'est la coordonnée du point d'arrivée. On compte le **déplacement** depuis l'origine de la flèche." }, { valeur: q === "x" ? -dx : -dy, message: "Attention au sens : vers la gauche ou vers le bas, c'est négatif." }],
      aides: ["Pars de l'**origine** de la flèche et va jusqu'à son **extrémité** (la pointe).", q === "x" ? "Compte les carreaux horizontalement : vers la droite c'est positif, vers la gauche négatif." : "Compte les carreaux verticalement : vers le haut c'est positif, vers le bas négatif.", `La flèche part du point $${pt(x1, y1)}$.`],
      solution: `La flèche va de $${pt(x1, y1)}$ à $${pt(x1 + dx, y1 + dy)}$ : déplacement de $${dx}$ en abscisse et de $${dy}$ en ordonnée.\n\n$\\vec{u}\\begin{pmatrix} ${dx} \\\\ ${dy} \\end{pmatrix}$, donc $${q} = ${q === "x" ? dx : dy}$.`
    };
  };

  // Repère ajusté à des points nommés (schéma d'aide des exercices) ; fl : flèches [i, j] entre points
  function repere(pts, fl, segments) {
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const xmin = Math.min(0, ...xs) - 1.5, xmax = Math.max(0, ...xs) + 1.5, ymin = Math.min(0, ...ys) - 1.5, ymax = Math.max(0, ...ys) + 1.5;
    const large = Math.max(xmax - xmin, ymax - ymin) > 12;
    return graph({
      xmin, xmax, ymin, ymax, xetiq: large ? 2 : 1, yetiq: large ? 2 : 1,
      fleches: (fl || []).map(([i, j]) => ({ x1: pts[i][0], y1: pts[i][1], x2: pts[j][0], y2: pts[j][1] })),
      curves: (segments || []).filter(([i, j]) => pts[i][0] !== pts[j][0]).map(([i, j]) => { const [P, Q] = pts[i][0] < pts[j][0] ? [pts[i], pts[j]] : [pts[j], pts[i]]; return { f: (x) => P[1] + ((x - P[0]) * (Q[1] - P[1])) / (Q[0] - P[0]), a: P[0], b: Q[0], closed: false }; }),
      points: pts.map((p) => ({ x: p[0], y: p[1], label: p[2] })), aria: "Points placés dans un repère"
    });
  }

  GEN["ve-coord"] = function () {
    const [A, B] = deuxPoints(9), q = Math.random() < 0.5 ? 0 : 1, l = q ? "y" : "x";
    const v = B[q] - A[q];
    return {
      figure: repere([[...A, "A"], [...B, "B"]], [[0, 1]]),
      enonce: `Dans un repère, $A${pt(...A)}$ et $B${pt(...B)}$. Calcule ${q ? "l'ordonnée" : "l'abscisse"} du vecteur $${vec("AB")}$.`,
      mode: "nombre", prefixe: `${l} =`, attendu: v,
      erreurs: [{ valeur: -v, message: "C'est « arrivée moins départ » : $x_B - x_A$, pas l'inverse." }, { valeur: A[q] + B[q], message: "On soustrait les coordonnées, on ne les additionne pas." }],
      aides: [`$${vec("AB")}\\begin{pmatrix} x_B - x_A \\\\ y_B - y_A \\end{pmatrix}$ : arrivée moins départ.`, `Ici : $${l}_B - ${l}_A = ${B[q]} - ${par(A[q])}$.`, "Attention aux doubles signes moins : $-(-3) = +3$."],
      solution: `$${l}_B - ${l}_A = ${B[q]} - ${par(A[q])} = ${v}$.\n\n$${vec("AB")}\\begin{pmatrix} ${B[0] - A[0]} \\\\ ${B[1] - A[1]} \\end{pmatrix}$.`
    };
  };

  GEN["ve-norme"] = function () {
    const [a, b, c] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [4, 3, 5], [12, 5, 13], [9, 12, 15], [8, 15, 17], [0, 7, 7], [6, 0, 6]]);
    const sx = pick([1, -1]), sy = pick([1, -1]);
    if (Math.random() < 0.5) {
      return {
        enonce: `Calcule la norme du vecteur $\\vec{u}\\begin{pmatrix} ${sx * a} \\\\ ${sy * b} \\end{pmatrix}$ dans un repère orthonormé.`,
        mode: "nombre", prefixe: "‖u‖ =", attendu: c,
        aides: ["Dans un repère orthonormé : $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$.", `$${par(sx * a)}^2 + ${par(sy * b)}^2 = ${a * a} + ${b * b}$.`, `$\\sqrt{${a * a + b * b}} = ?$`],
        solution: `$\\|\\vec{u}\\| = \\sqrt{${par(sx * a)}^2 + ${par(sy * b)}^2} = \\sqrt{${a * a} + ${b * b}} = \\sqrt{${a * a + b * b}} = ${c}$.`
      };
    }
    const A = [rand(-6, 6), rand(-6, 6)], B = [A[0] + sx * a, A[1] + sy * b];
    return {
      enonce: `Dans un repère orthonormé, $A${pt(...A)}$ et $B${pt(...B)}$. Calcule la distance $AB$.`,
      mode: "nombre", prefixe: "AB =", attendu: c,
      erreurs: [{ valeur: a + b, message: "On n'additionne pas les écarts : on utilise Pythagore, $\\sqrt{x^2 + y^2}$." }, { valeur: c * c, message: "N'oublie pas la racine carrée." }],
      aides: ["$AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$ : c'est le théorème de Pythagore.", `$x_B - x_A = ${sx * a}$ et $y_B - y_A = ${sy * b}$.`, `$${par(sx * a)}^2 + ${par(sy * b)}^2 = ${a * a + b * b}$.`],
      solution: `$AB = \\sqrt{(${B[0]} - ${par(A[0])})^2 + (${B[1]} - ${par(A[1])})^2} = \\sqrt{${par(sx * a)}^2 + ${par(sy * b)}^2} = \\sqrt{${a * a + b * b}} = ${c}$.`
    };
  };

  GEN["ve-milieu"] = function () {
    const [A, B] = deuxPoints(9), q = Math.random() < 0.5 ? 0 : 1, l = q ? "y" : "x";
    const v = (A[q] + B[q]) / 2;
    return {
      figure: repere([[...A, "A"], [...B, "B"]], [], [[0, 1]]),
      enonce: `Dans un repère, $A${pt(...A)}$ et $B${pt(...B)}$. Calcule ${q ? "l'ordonnée" : "l'abscisse"} du milieu $I$ de $[AB]$.`,
      mode: "nombre", prefixe: `$${l}_I =$`, attendu: v,
      erreurs: [{ valeur: (B[q] - A[q]) / 2, message: "Pour le milieu, on **additionne** les coordonnées, puis on divise par $2$." }, { valeur: A[q] + B[q], message: "N'oublie pas de diviser par $2$." }],
      aides: [`$${l}_I = \\dfrac{${l}_A + ${l}_B}{2}$ : la moyenne des deux coordonnées.`, `$${l}_A + ${l}_B = ${A[q]} + ${par(B[q])} = ${A[q] + B[q]}$.`, "Divise par $2$. Le résultat peut être un nombre décimal, comme $2{,}5$."],
      solution: `$${l}_I = \\dfrac{${A[q]} + ${par(B[q])}}{2} = \\dfrac{${A[q] + B[q]}}{2} = ${nb(v)}$.\n\n$I${pt((A[0] + B[0]) / 2, (A[1] + B[1]) / 2)}$.`
    };
  };

  GEN["ve-chasles"] = function () {
    const L = shuffle(["A", "B", "C", "D", "E", "M"]).slice(0, 4);
    const t = rand(0, 3);
    let gauche, bonne, faux, expl;
    if (t === 0) { gauche = `${vec(L[0] + L[1])} + ${vec(L[1] + L[2])}`; bonne = vec(L[0] + L[2]); faux = [vec(L[2] + L[0]), vec(L[0] + L[1]), vec(L[1] + L[2])]; expl = `Relation de Chasles : l'extrémité du premier vecteur est l'origine du second ($${L[1]}$). On « saute » $${L[1]}$ : $${bonne}$.`; }
    else if (t === 1) { gauche = `${vec(L[0] + L[1])} + ${vec(L[1] + L[2])} + ${vec(L[2] + L[3])}`; bonne = vec(L[0] + L[3]); faux = [vec(L[3] + L[0]), vec(L[0] + L[2]), vec(L[1] + L[3])]; expl = `Chasles deux fois : $${vec(L[0] + L[1])} + ${vec(L[1] + L[2])} = ${vec(L[0] + L[2])}$, puis $${vec(L[0] + L[2])} + ${vec(L[2] + L[3])} = ${bonne}$.`; }
    else if (t === 2) { gauche = `${vec(L[0] + L[1])} + ${vec(L[1] + L[0])}`; bonne = "\\vec{0}"; faux = [`2${vec(L[0] + L[1])}`, vec(L[0] + L[1]), vec(L[1] + L[0])]; expl = `$${vec(L[1] + L[0])}$ est l'**opposé** de $${vec(L[0] + L[1])}$ : aller de $${L[0]}$ à $${L[1]}$ puis revenir. $${gauche} = ${vec(L[0] + L[0])} = \\vec{0}$.`; }
    else { gauche = `${vec(L[2] + L[1])} + ${vec(L[0] + L[2])}`; bonne = vec(L[0] + L[1]); faux = [vec(L[1] + L[0]), vec(L[2] + L[2]), vec(L[0] + L[2])]; expl = `On change l'ordre de la somme pour enchaîner : $${vec(L[0] + L[2])} + ${vec(L[2] + L[1])} = ${bonne}$.`; }
    const ch = melangeChoix(`$${bonne}$`, faux.map((f) => `$${f}$`));
    return {
      enonce: `Simplifie $${gauche}$.`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Relation de Chasles : $\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$. La lettre du milieu doit être la même.", "On peut changer l'ordre d'une somme de vecteurs pour enchaîner les lettres.", "$\\overrightarrow{BA}$ est l'opposé de $\\overrightarrow{AB}$, et $\\overrightarrow{AA} = \\vec{0}$."],
      solution: expl
    };
  };

  GEN["ve-somme"] = function () {
    const u = [randNZ(-7, 7), randNZ(-7, 7)], v = [randNZ(-7, 7), randNZ(-7, 7)], q = Math.random() < 0.5 ? 0 : 1;
    const moins = Math.random() < 0.3, r = moins ? u[q] - v[q] : u[q] + v[q];
    return {
      enonce: `On donne $\\vec{u}\\begin{pmatrix} ${u[0]} \\\\ ${u[1]} \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} ${v[0]} \\\\ ${v[1]} \\end{pmatrix}$. Calcule ${q ? "l'ordonnée" : "l'abscisse"} du vecteur $\\vec{u} ${moins ? "-" : "+"} \\vec{v}$.`,
      mode: "nombre", prefixe: `${q ? "y" : "x"} =`, attendu: r,
      erreurs: [{ valeur: moins ? u[q] + v[q] : u[q] - v[q], message: moins ? "On soustrait les coordonnées, on ne les additionne pas." : "On additionne les coordonnées." }],
      aides: [`Les coordonnées de $\\vec{u} ${moins ? "-" : "+"} \\vec{v}$ s'obtiennent en ${moins ? "soustrayant" : "additionnant"} celles de $\\vec{u}$ et de $\\vec{v}$, coordonnée par coordonnée.`, `${q ? "Ordonnées" : "Abscisses"} : $${u[q]}$ et $${v[q]}$.`, `$${u[q]} ${moins ? "-" : "+"} ${par(v[q])}$.`],
      solution: `$\\vec{u} ${moins ? "-" : "+"} \\vec{v}\\begin{pmatrix} ${u[0]} ${moins ? "-" : "+"} ${par(v[0])} \\\\ ${u[1]} ${moins ? "-" : "+"} ${par(v[1])} \\end{pmatrix}$, soit $\\begin{pmatrix} ${moins ? u[0] - v[0] : u[0] + v[0]} \\\\ ${moins ? u[1] - v[1] : u[1] + v[1]} \\end{pmatrix}$.`
    };
  };

  GEN["ve-parallelogramme"] = function () {
    let A, B, C;
    do { A = [rand(-6, 4), rand(-6, 4)]; B = [A[0] + randNZ(-5, 6), A[1] + rand(-3, 5)]; C = [B[0] + rand(-4, 4), B[1] + randNZ(-5, 6)]; }
    while ((B[0] - A[0]) * (C[1] - B[1]) - (B[1] - A[1]) * (C[0] - B[0]) === 0);
    const D = [A[0] + C[0] - B[0], A[1] + C[1] - B[1]], q = Math.random() < 0.5 ? 0 : 1, l = q ? "y" : "x";
    return {
      figure: repere([[...A, "A"], [...B, "B"], [...C, "C"]], [[0, 1]], [[1, 2]]),
      enonce: `$A${pt(...A)}$, $B${pt(...B)}$ et $C${pt(...C)}$. On cherche $D$ tel que $ABCD$ soit un parallélogramme. Calcule ${q ? "l'ordonnée" : "l'abscisse"} de $D$.`,
      mode: "nombre", prefixe: `$${l}_D =$`, attendu: D[q],
      erreurs: [{ valeur: B[q] + C[q] - A[q], message: "Ça, c'est le point tel que $ABDC$ est un parallélogramme. Respecte l'ordre des lettres : $\\overrightarrow{AB} = \\overrightarrow{DC}$." }],
      aides: [`$ABCD$ est un parallélogramme si et seulement si $${vec("AB")} = ${vec("DC")}$.`, `$${vec("AB")}\\begin{pmatrix} ${B[0] - A[0]} \\\\ ${B[1] - A[1]} \\end{pmatrix}$ et $${vec("DC")}\\begin{pmatrix} ${C[0]} - x_D \\\\ ${C[1]} - y_D \\end{pmatrix}$.`, `Résous $${C[q]} - ${l}_D = ${B[q] - A[q]}$.`],
      solution: `$${vec("AB")} = ${vec("DC")}$ donne $${C[q]} - ${l}_D = ${B[q]} - ${par(A[q])} = ${B[q] - A[q]}$, donc $${l}_D = ${C[q]} - ${par(B[q] - A[q])} = ${D[q]}$.\n\n$D${pt(...D)}$.`
    };
  };

  GEN["ve-python"] = function () {
    const [A, B] = deuxPoints(6), t = Math.random() < 0.5;
    if (t) {
      return {
        enonce: "On considère la fonction Python :\n\n```python\ndef milieu(xA, yA, xB, yB):\n    return (xA + xB) / 2, (yA + yB) / 2\n```\n\n" + `Que renvoie $\\texttt{milieu(${A[0]}, ${A[1]}, ${B[0]}, ${B[1]})}$ ? Donne la **première** valeur.`,
        mode: "nombre", prefixe: "Réponse :", attendu: (A[0] + B[0]) / 2,
        aides: ["La fonction a **quatre** arguments : les coordonnées de $A$, puis celles de $B$.", "Elle renvoie deux nombres : l'abscisse puis l'ordonnée du milieu.", `Première valeur : $\\dfrac{${A[0]} + ${par(B[0])}}{2}$.`],
        solution: `$\\dfrac{${A[0]} + ${par(B[0])}}{2} = ${nb((A[0] + B[0]) / 2)}$ et $\\dfrac{${A[1]} + ${par(B[1])}}{2} = ${nb((A[1] + B[1]) / 2)}$. La fonction renvoie $(${nb((A[0] + B[0]) / 2)}\\,;${nb((A[1] + B[1]) / 2)})$ : la première valeur est $${nb((A[0] + B[0]) / 2)}$.`
      };
    }
    const [a, b, c] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [4, 3, 5], [8, 6, 10]]);
    const P = [rand(-5, 5), rand(-5, 5)], Q = [P[0] + pick([1, -1]) * a, P[1] + pick([1, -1]) * b];
    return {
      enonce: "On considère la fonction Python :\n\n```python\nfrom math import sqrt\n\ndef distance(xA, yA, xB, yB):\n    return sqrt((xB - xA)**2 + (yB - yA)**2)\n```\n\n" + `Que renvoie $\\texttt{distance(${P[0]}, ${P[1]}, ${Q[0]}, ${Q[1]})}$ ?`,
      mode: "nombre", prefixe: "Réponse :", attendu: c,
      aides: ["$\\texttt{**2}$ est le carré, $\\texttt{sqrt}$ la racine carrée.", `$x_B - x_A = ${Q[0] - P[0]}$ et $y_B - y_A = ${Q[1] - P[1]}$.`, `Calcule $\\sqrt{${par(Q[0] - P[0])}^2 + ${par(Q[1] - P[1])}^2}$.`],
      solution: `$\\sqrt{${par(Q[0] - P[0])}^2 + ${par(Q[1] - P[1])}^2} = \\sqrt{${a * a + b * b}} = ${c}$. La fonction renvoie $${c}$ (Python affiche $\\texttt{${c}.0}$).`
    };
  };


  /* ---------- Seconde, chapitre 8 : statistiques 1 (préfixe st-) ---------- */
  const serie = (n, a, b) => Array.from({ length: n }, () => rand(a, b));
  const moy = (L) => L.reduce((s, x) => s + x, 0) / L.length;
  const ecType = (L) => { const m = moy(L); return Math.sqrt(L.reduce((s, x) => s + (x - m) ** 2, 0) / L.length); };
  const listeTex = (L) => L.map((x) => nb(x)).join("\\,;\\,");
  const quartile = (L, k) => { const T = L.slice().sort((a, b) => a - b); return T[Math.ceil((k * T.length) / 4) - 1]; };

  GEN["st-moyenne"] = function () {
    const n = rand(5, 8), L = serie(n, 4, 20), s = L.reduce((a, b) => a + b, 0), m = Math.round((s / n) * 10) / 10;
    return {
      enonce: `Notes d'un élève de Sada : $${listeTex(L)}$. Calcule sa moyenne (arrondie au dixième si besoin).`,
      mode: "nombre", prefixe: "Moyenne :", attendu: m, tolerance: 0.051,
      aides: ["Moyenne $=$ somme des valeurs $\\div$ nombre de valeurs.", `Somme : $${L.join(" + ")} = ${s}$.`, `Il y a $${n}$ valeurs : calcule $${s} \\div ${n}$.`],
      solution: `$\\bar{x} = \\dfrac{${s}}{${n}} ${Number.isInteger(s / n) ? "=" : "\\approx"} ${nb(m)}$.`
    };
  };

  GEN["st-linearite"] = function () {
    const m = rand(8, 15) + pick([0, 0.5]), a = pick([1, 1, 2, 3, 0.5, 1.1, 1.2]), b = pick([0, 1, 2, -1, 5, -3]);
    const r = Math.round((a * m + b) * 1000) / 1000;
    const ctx = a === 1 ? `on ajoute $${b}$ point${Math.abs(b) > 1 ? "s" : ""} à chaque note` : b === 0 ? `on multiplie chaque valeur par $${nb(a)}$` : `chaque valeur $x$ est remplacée par $${nb(a)}x ${sg(b)}$`;
    if (a === 1 && b === 0) return GEN["st-linearite"]();
    return {
      enonce: `Une série statistique a pour moyenne $${nb(m)}$. Si ${ctx}, quelle est la nouvelle moyenne ?`,
      mode: "nombre", prefixe: "Moyenne :", attendu: r,
      aides: ["**Linéarité de la moyenne** : si chaque valeur $x$ devient $ax + b$, la moyenne $\\bar{x}$ devient $a\\bar{x} + b$.", `Ici $a = ${nb(a)}$ et $b = ${nb(b)}$.`, `Calcule $${nb(a)} \\times ${nb(m)} ${sg(b)}$.`],
      solution: `La nouvelle moyenne est $${nb(a)} \\times ${nb(m)} ${sg(b)} = ${nb(r)}$. Pas besoin de connaître les valeurs une par une.`
    };
  };

  GEN["st-ecart-type"] = function () {
    const n = rand(4, 6), L = serie(n, 2, 18), s = Math.round(ecType(L) * 100) / 100;
    return {
      enonce: `Série : $${listeTex(L)}$. À l'aide de la calculatrice, donne l'écart type $\\sigma$ de cette série, arrondi au centième.`,
      mode: "nombre", prefixe: "σ ≈", attendu: s, tolerance: 0.006,
      erreurs: [{ valeur: Math.round(ecType(L) ** 2 * 100) / 100, message: "Ça, c'est la **variance**. L'écart type est sa racine carrée." }],
      aides: ["Calculatrice : mode statistiques, entre la liste, puis lis $\\sigma$ (ou $\\sigma_x$), pas $s$.", `La moyenne vaut $${nb(Math.round(moy(L) * 100) / 100)}$.`, "À la main : $\\sigma = \\sqrt{\\dfrac{(x_1 - \\bar{x})^2 + \\ldots + (x_n - \\bar{x})^2}{n}}$."],
      solution: `$\\bar{x} = ${nb(Math.round(moy(L) * 1000) / 1000)}$ et la variance vaut $V \\approx ${nb(Math.round(ecType(L) ** 2 * 1000) / 1000)}$. Donc $\\sigma = \\sqrt{V} \\approx ${nb(s)}$.\n\nL'écart type mesure la **dispersion** des valeurs autour de la moyenne.`
    };
  };

  GEN["st-interquartile"] = function () {
    const n = pick([8, 9, 11, 12, 15]), L = serie(n, 1, 20), q1 = quartile(L, 1), q3 = quartile(L, 3);
    const T = L.slice().sort((a, b) => a - b);
    return {
      enonce: `Série : $${listeTex(L)}$. Calcule l'écart interquartile $Q_3 - Q_1$.`,
      mode: "nombre", prefixe: "Q₃ − Q₁ =", attendu: q3 - q1,
      erreurs: [{ valeur: T[n - 1] - T[0], message: "Ça, c'est l'**étendue** (max − min). On demande $Q_3 - Q_1$." }],
      aides: ["Range d'abord les valeurs dans l'ordre croissant.", `$Q_1$ est la valeur de rang $\\dfrac{${n}}{4}$ arrondi à l'entier supérieur, soit le rang $${Math.ceil(n / 4)}$. $Q_3$ : rang $${Math.ceil((3 * n) / 4)}$.`, `Série rangée : $${listeTex(T)}$.`],
      solution: `Série rangée : $${listeTex(T)}$.\n\n$Q_1 = ${q1}$ (rang $${Math.ceil(n / 4)}$) et $Q_3 = ${q3}$ (rang $${Math.ceil((3 * n) / 4)}$). Écart interquartile : $${q3} - ${q1} = ${q3 - q1}$.\n\nAu moins la moitié des valeurs sont entre $Q_1$ et $Q_3$.`
    };
  };

  GEN["st-influence"] = function () {
    const n = rand(5, 9), m = rand(9, 14), v = pick([rand(0, 5), rand(16, 20)]);
    const ajout = Math.random() < 0.6, total = n * m;
    if (ajout) {
      const r = Math.round(((total + v) / (n + 1)) * 100) / 100;
      return {
        enonce: `Un élève a $${n}$ notes, de moyenne $${m}$. Il obtient une nouvelle note : $${v}$. Quelle est sa nouvelle moyenne (arrondie au centième) ?`,
        mode: "nombre", prefixe: "Moyenne :", attendu: r, tolerance: 0.006,
        erreurs: [{ valeur: (m + v) / 2, message: "On ne fait pas la moyenne de l'ancienne moyenne et de la nouvelle note : l'ancienne moyenne « pèse » $" + n + "$ notes." }],
        aides: [`La somme des $${n}$ notes vaut $${n} \\times ${m} = ${total}$.`, `Nouvelle somme : $${total} + ${v}$.`, `Divise par le nouveau nombre de notes : $${n + 1}$.`],
        solution: `Somme : $${n} \\times ${m} + ${v} = ${total + v}$ pour $${n + 1}$ notes. Moyenne : $\\dfrac{${total + v}}{${n + 1}} \\approx ${nb(r)}$.\n\n${v > m ? "La note est au-dessus de la moyenne : la moyenne augmente." : v < m ? "La note est en dessous de la moyenne : la moyenne baisse." : "La moyenne ne change pas."} Une valeur extrême influence la moyenne, beaucoup moins la médiane.`
      };
    }
    const r = Math.round(((total - v) / (n - 1)) * 100) / 100;
    return {
      enonce: `Une série de $${n}$ valeurs a pour moyenne $${m}$. On retire la valeur $${v}$. Quelle est la nouvelle moyenne (arrondie au centième) ?`,
      mode: "nombre", prefixe: "Moyenne :", attendu: r, tolerance: 0.006,
      aides: [`La somme des $${n}$ valeurs vaut $${n} \\times ${m} = ${total}$.`, `Nouvelle somme : $${total} - ${v}$.`, `Il reste $${n - 1}$ valeurs.`],
      solution: `$\\dfrac{${total} - ${v}}{${n - 1}} = \\dfrac{${total - v}}{${n - 1}} \\approx ${nb(r)}$.`
    };
  };

  GEN["st-comparer"] = function () {
    const t = rand(0, 2);
    const m = rand(9, 13), d = rand(1, 3), s1 = rand(10, 25) / 10, s2 = s1 + rand(10, 30) / 10;
    if (t === 0) {
      const homog = Math.random() < 0.5 ? "A" : "B", sA = homog === "A" ? s1 : s2, sB = homog === "A" ? s2 : s1;
      return {
        enonce: `Classe A : moyenne $${m}$, écart type $${nb(sA)}$. Classe B : moyenne $${m}$, écart type $${nb(sB)}$. Quelle classe a les notes les plus **homogènes** (les moins dispersées) ?`,
        mode: "choix", choix: ["La classe A", "La classe B", "On ne peut pas savoir"], attendu: homog === "A" ? 0 : 1,
        aides: ["L'écart type mesure la dispersion autour de la moyenne.", "Plus l'écart type est petit, plus les valeurs sont regroupées.", "Compare les deux écarts types."],
        solution: `Même moyenne, mais l'écart type de la classe ${homog} est plus petit ($${nb(Math.min(sA, sB))} < ${nb(Math.max(sA, sB))}$) : ses notes sont plus **homogènes**.`
      };
    }
    if (t === 1) {
      const meA = m + d, meB = m, eA = rand(3, 6), eB = eA + rand(2, 4);
      return {
        enonce: `Masses de tortues vertes (en kg) sur deux plages. Plage 1 : médiane $${meA * 10}$, écart interquartile $${eA * 10}$. Plage 2 : médiane $${meB * 10}$, écart interquartile $${eB * 10}$. Quelle affirmation est vraie ?`,
        ...((c) => ({ mode: "choix", choix: c.choix, attendu: c.attendu }))(melangeChoix("Les tortues de la plage 1 sont en général plus lourdes et leurs masses moins dispersées" , ["Les tortues de la plage 2 sont en général plus lourdes", "Les masses de la plage 1 sont plus dispersées", "Toutes les tortues de la plage 1 sont plus lourdes que celles de la plage 2"])),
        aides: ["La médiane donne le « centre » de la série : la moitié des valeurs est en dessous.", "L'écart interquartile $Q_3 - Q_1$ mesure la dispersion.", "Attention aux affirmations trop fortes (« toutes ») : les indicateurs ne disent rien de chaque valeur."],
        solution: `Médiane plus grande sur la plage 1 ($${meA * 10} > ${meB * 10}$) : les tortues y sont en général plus lourdes. Écart interquartile plus petit ($${eA * 10} < ${eB * 10}$) : masses moins dispersées. Mais on ne peut pas dire que **toutes** sont plus lourdes.`
      };
    }
    return {
      enonce: `Pour comparer deux séries, quel couple d'indicateurs va avec la médiane ?`,
      ...((c) => ({ mode: "choix", choix: c.choix, attendu: c.attendu }))(melangeChoix("La médiane et l'écart interquartile", ["La médiane et l'écart type", "La médiane et la moyenne", "La médiane et l'effectif total"])),
      aides: ["On associe un indicateur de position et un indicateur de dispersion qui « vont ensemble ».", "La moyenne va avec l'écart type (tous deux calculés avec toutes les valeurs).", "La médiane va avec les quartiles."],
      solution: "On compare avec les couples (moyenne ; écart type) ou (médiane ; écart interquartile). La médiane et l'écart interquartile sont peu sensibles aux valeurs extrêmes."
    };
  };

  GEN["st-python"] = function () {
    const n = rand(3, 5), L = serie(n, 2, 15), s = L.reduce((a, b) => a + b, 0);
    const t = Math.random() < 0.5;
    if (t) {
      return {
        enonce: "On considère la fonction Python :\n\n```python\ndef moyenne(L):\n    s = 0\n    for x in L:\n        s = s + x\n    return s / len(L)\n```\n\n" + `Que renvoie $\\texttt{moyenne([${L.join(", ")}])}$ ? (Arrondis au centième si besoin.)`,
        mode: "nombre", prefixe: "Résultat :", attendu: Math.round((s / n) * 100) / 100, tolerance: 0.006,
        aides: ["$\\texttt{s}$ accumule la somme des valeurs de la liste.", "$\\texttt{len(L)}$ est le nombre de valeurs de la liste.", `Somme : $${s}$ ; nombre de valeurs : $${n}$.`],
        solution: `La boucle calcule $s = ${L.join(" + ")} = ${s}$, puis la fonction renvoie $\\dfrac{${s}}{${n}} ${Number.isInteger(s / n) ? "=" : "\\approx"} ${nb(Math.round((s / n) * 100) / 100)}$ : c'est la moyenne.`
      };
    }
    return {
      enonce: "On considère la fonction Python :\n\n```python\ndef mystere(L):\n    s = 0\n    for x in L:\n        s = s + x\n    return s\n```\n\n" + `Que renvoie $\\texttt{mystere([${L.join(", ")}])}$ ?`,
      mode: "nombre", prefixe: "Résultat :", attendu: s,
      erreurs: [{ valeur: Math.round((s / n) * 100) / 100, message: "La fonction ne divise pas par $\\texttt{len(L)}$ : elle renvoie la somme." }],
      aides: ["La boucle parcourt chaque valeur $x$ de la liste.", "À chaque tour, $x$ est ajouté à $s$.", "Que vaut $s$ à la fin ?"],
      solution: `$s$ vaut successivement ${L.map((_, i) => `$${L.slice(0, i + 1).reduce((a, b) => a + b, 0)}$`).join(", ")}. La fonction renvoie la **somme** des valeurs : $${s}$.`
    };
  };


  /* ---------- Seconde, chapitre 9 : variations, extremums, carré et valeur absolue (préfixe vx-) ---------- */
  GEN["vx-comparer"] = refRestreint("var-ref-comparer", ["carre", "carre", "absolue"]);
  GEN["vx-equation"] = refRestreint("var-ref-equation", null, [0, 0, 1]);

  GEN["vx-inequation-carre"] = function () {
    const r = rand(1, 9), k = r * r, op = pick(OPS), neg = Math.random() < 0.15;
    const kk = neg ? -k : k;
    let bonne, faux, expl;
    const large = op === "\\leqslant" || op === "\\geqslant", o = large ? "[" : "]", f = large ? "]" : "[";
    const dedans = `${o}-${r}\\,;${r}${f}`, dehors = `]-\\infty\\,;-${r}${f} \\cup ${o}${r}\\,;+\\infty[`;
    if (neg) {
      const tout = op === ">" || op === "\\geqslant";
      bonne = tout ? "\\mathbb{R}" : "\\varnothing"; faux = [tout ? "\\varnothing" : "\\mathbb{R}", `]-\\infty\\,;-${r}[`, `[${r}\\,;+\\infty[`];
      expl = `Un carré est toujours positif ou nul, donc toujours supérieur à $${kk}$. ` + (tout ? "Tous les réels sont solutions : $S = \\mathbb{R}$." : "Aucun réel n'est solution : $S = \\varnothing$.");
    } else if (op === "<" || op === "\\leqslant") {
      bonne = dedans; faux = [dehors, `${o}-\\infty\\,;${r}${f}`.replace("[-\\infty", "]-\\infty"), `${o}0\\,;${r}${f}`];
      expl = `Sur la parabole, $x^2 ${op} ${k}$ là où la courbe est ${op === "<" ? "strictement " : ""}sous la droite $y = ${k}$ : entre $-${r}$ et $${r}$. $S = ${dedans}$.`;
    } else {
      bonne = dehors; faux = [dedans, `${o}${r}\\,;+\\infty[`, `]-\\infty\\,;-${r}${f}`];
      expl = `$x^2 ${op} ${k}$ là où la parabole est au-dessus de la droite $y = ${k}$ : avant $-${r}$ et après $${r}$. $S = ${dehors}$.`;
    }
    const ch = melangeChoix(`$${bonne}$`, faux.map((t) => `$${t}$`));
    return {
      enonce: `Résous dans $\\mathbb{R}$ l'inéquation $x^2 ${op} ${kk}$.`,
      figure: neg ? undefined : graph({ xmin: -(r + 2), xmax: r + 2, ymin: -((r + 2) ** 2) / 10, ymax: (r + 2) ** 2, ystep: (r + 2) ** 2 > 40 ? 10 : (r + 2) ** 2 > 15 ? 5 : 1, xetiq: r > 4 ? 2 : 1, yetiq: (r + 2) ** 2 > 40 ? 20 : (r + 2) ** 2 > 15 ? 5 : 2, h: 260, curves: [{ f: (x) => x * x, a: -(r + 2), b: r + 2, closed: false }], hlines: [{ y: k, label: `y = ${k}` }], aria: "Parabole y = x² et droite horizontale" }),
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [neg ? "Un carré peut-il être négatif ?" : `Résous d'abord l'équation $x^2 = ${k}$ : deux solutions, $-${r}$ et $${r}$.`, "Sur la figure, repère où la parabole est sous (ou au-dessus de) la droite horizontale.", "Attention : $x^2 < 9$ ne donne pas seulement $x < 3$ ; il faut aussi $x > -3$."],
      solution: expl
    };
  };

  GEN["vx-optimisation"] = function () {
    const mur = Math.random() < 0.5, P = mur ? 4 * rand(5, 20) : 4 * rand(5, 25);
    const demandeAire = Math.random() < 0.5;
    if (mur) {
      // trois côtés : x, P − 2x, x ; aire x(P − 2x), maximale en x = P/4
      const x0 = P / 4, A = x0 * (P - 2 * x0);
      return {
        enonce: `On construit un enclos rectangulaire pour les cabris le long d'un mur, avec $${P}$ m de grillage pour les trois autres côtés. On note $x$ la largeur (les deux côtés perpendiculaires au mur). L'aire est $A(x) = x(${P} - 2x)$. ${demandeAire ? "Quelle est l'aire maximale (en m²) ?" : "Pour quelle largeur $x$ l'aire est-elle maximale ?"}`,
        mode: "nombre", prefixe: demandeAire ? "Aire max :" : "x =", suffixe: demandeAire ? "m²" : "m", attendu: demandeAire ? A : x0,
        erreurs: demandeAire ? [{ valeur: x0, message: "Ça, c'est la largeur optimale ; on demande l'aire." }] : [{ valeur: A, message: "Ça, c'est l'aire maximale ; on demande la largeur." }],
        aides: [`$A(x) = ${P}x - 2x^2$. Tableau de valeurs à la calculatrice pour $x$ entre $0$ et $${P / 2}$.`, `$A$ s'annule en $x = 0$ et en $x = ${P / 2}$ ; par symétrie de la parabole, le maximum est au milieu.`, `Le maximum est atteint en $x = ${nb(x0)}$.`],
        solution: `$A(x) = x(${P} - 2x)$ s'annule en $0$ et en $${P / 2}$. Le sommet de la parabole est au milieu : $x = ${nb(x0)}$ m.\n\n$A(${nb(x0)}) = ${nb(x0)} \\times ${nb(P - 2 * x0)} = ${nb(A)}$ m². L'aire maximale est $${nb(A)}$ m², pour un enclos de $${nb(x0)}$ m sur $${nb(P - 2 * x0)}$ m.`
      };
    }
    const c = P / 4, A = c * c;
    return {
      enonce: `Un enclos rectangulaire a un périmètre de $${P}$ m. On note $x$ sa largeur ; sa longueur vaut $${P / 2} - x$ et son aire $A(x) = x(${P / 2} - x)$. ${demandeAire ? "Quelle est l'aire maximale (en m²) ?" : "Pour quelle largeur $x$ l'aire est-elle maximale ?"}`,
      mode: "nombre", prefixe: demandeAire ? "Aire max :" : "x =", suffixe: demandeAire ? "m²" : "m", attendu: demandeAire ? A : c,
      erreurs: demandeAire ? [{ valeur: c, message: "Ça, c'est la largeur optimale ; on demande l'aire." }] : [{ valeur: A, message: "Ça, c'est l'aire maximale ; on demande la largeur." }],
      aides: [`$A(x)$ s'annule en $x = 0$ et en $x = ${P / 2}$.`, "La courbe est une parabole « tournée vers le bas » : son maximum est au milieu des deux zéros.", `Le maximum est atteint en $x = ${nb(c)}$ : l'enclos est alors un carré.`],
      solution: `Le maximum est au milieu de $0$ et $${P / 2}$ : $x = ${nb(c)}$ m. L'enclos est un **carré** de côté $${nb(c)}$ m, d'aire $${nb(c)}^2 = ${nb(A)}$ m².`
    };
  };

  GEN["vx-python"] = function () {
    const P = 4 * rand(2, 6), b = P / 2;
    const pas = pick([1, 0.5]);
    return {
      enonce: "On cherche le maximum de $A(x) = x(" + b + " - x)$ sur $[0\\,;" + b + "]$ par **balayage** :\n\n```python\ndef balayage(pas):\n    x = 0\n    meilleur_x = 0\n    meilleur_A = 0\n    while x <= " + b + ":\n        A = x * (" + b + " - x)\n        if A > meilleur_A:\n            meilleur_x = x\n            meilleur_A = A\n        x = x + pas\n    return meilleur_x\n```\n\n" + `Que renvoie $\\texttt{balayage(${pas === 1 ? "1" : "0.5"})}$ ?`,
      mode: "nombre", prefixe: "Résultat :", attendu: b / 2,
      erreurs: [{ valeur: (b / 2) * (b / 2), message: "La fonction renvoie $\\texttt{meilleur\\_x}$, l'abscisse du maximum, pas l'aire." }],
      aides: ["Le programme calcule $A(x)$ pour $x = 0$, puis $x = 0 + \\text{pas}$, etc.", "Il garde en mémoire le $x$ qui donne la plus grande aire rencontrée.", `$A$ est maximale au milieu de $0$ et $${b}$.`],
      solution: `Les valeurs de $A$ augmentent jusqu'à $x = ${nb(b / 2)}$ (où $A = ${nb((b / 2) ** 2)}$), puis diminuent. Le test $\\texttt{A > meilleur\\_A}$ n'est plus vrai ensuite : la fonction renvoie $${nb(b / 2)}$.`
    };
  };


  /* ---------- Seconde, chapitre 10 : tableaux croisés, fréquences conditionnelles, probabilités (préfixe tc-) ---------- */
  // Tableau croisé de l'exemple du cours
  FIGURES["tableau-transport"] = () => `<div class="scroll-x"><table class="valeurs croise">${[["", "2de", "1re", "Total"], ["Bus", "70", "?", "120"], ["À pied", "30", "50", "80"], ["Total", "100", "100", "200"]].map((l, i) => `<tr>${l.map((v, j) => (i === 0 || j === 0 ? `<th>${v}</th>` : `<td>${v}</td>`)).join("")}</tr>`).join("")}</table></div>`;
  // Enquête du lycée : mode de transport × niveau. Renvoie les effectifs et le tableau complet avec totaux.
  function enqueteLycee() {
    const L = ["\\text{Bus}", "\\text{À pied}", "\\text{Voiture}"], C = ["\\text{2de}", "\\text{1re}", "\\text{Tle}"];
    const N = L.map(() => C.map(() => 5 * rand(4, 30)));
    const totL = N.map((r) => r.reduce((a, b) => a + b, 0)), totC = C.map((_, j) => N.reduce((a, r) => a + r[j], 0)), tot = totL.reduce((a, b) => a + b, 0);
    const lignes = (cache) => [["", ...C, "\\text{Total}"], ...L.map((l, i) => [l, ...N[i].map((v, j) => (cache && cache[0] === i && cache[1] === j ? "?" : v)), totL[i]]), ["\\text{Total}", ...totC, tot]];
    return { L, C, N, totL, totC, tot, lignes, noms: ["en bus", "à pied", "en voiture"], niv: ["de Seconde", "de Première", "de Terminale"] };
  }
  const fracDec = (n, d) => `\\dfrac{${n}}{${d}} \\approx ${nb(Math.round((n / d) * 100) / 100)}`;

  GEN["tc-completer"] = function () {
    const E = enqueteLycee(), i = rand(0, 2), j = rand(0, 2);
    return {
      enonce: `Enquête sur le mode de transport des élèves du lycée. Retrouve l'effectif manquant.`,
      tableau: { lignes: E.lignes([i, j]) },
      mode: "nombre", prefixe: "? =", attendu: E.N[i][j],
      aides: ["Dans un tableau croisé, chaque total est la somme de sa ligne (ou de sa colonne).", `Utilise la ligne « ${E.noms[i]} » : total $${E.totL[i]}$.`, `Soustrais du total les deux autres effectifs de la ligne.`],
      solution: `Sur la ligne « ${E.noms[i]} » : $${E.totL[i]} - ${E.N[i].filter((_, k) => k !== j).join(" - ")} = ${E.N[i][j]}$. On peut vérifier avec la colonne : total $${E.totC[j]}$.`
    };
  };

  GEN["tc-frequence"] = function () {
    const E = enqueteLycee(), i = rand(0, 2), j = rand(0, 2), t = rand(0, 2);
    let enonce, n, d, sol;
    if (t === 0) { enonce = `Quelle est la fréquence **marginale** des élèves qui viennent ${E.noms[i]} ?`; n = E.totL[i]; d = E.tot; sol = `On divise le total de la ligne « ${E.noms[i]} » par l'effectif total.`; }
    else if (t === 1) { enonce = `Parmi les élèves ${E.niv[j]}, quelle est la fréquence de ceux qui viennent ${E.noms[i]} ?`; n = E.N[i][j]; d = E.totC[j]; sol = `C'est une fréquence **conditionnelle** : on se restreint à la colonne « ${E.niv[j].replace("de ", "")} » (total $${d}$).`; }
    else { enonce = `Parmi les élèves qui viennent ${E.noms[i]}, quelle est la fréquence de ceux ${E.niv[j]} ?`; n = E.N[i][j]; d = E.totL[i]; sol = `C'est une fréquence **conditionnelle** : on se restreint à la ligne « ${E.noms[i]} » (total $${d}$).`; }
    return {
      enonce: `Enquête sur le mode de transport des élèves du lycée (tableau ci-dessous). ${enonce} Donne une fraction ou un arrondi au centième.`,
      tableau: { lignes: E.lignes() },
      mode: "nombre", prefixe: "Fréquence :", attendu: n / d, tolerance: 0.0051,
      erreurs: t ? [{ valeur: n / E.tot, message: "Tu as divisé par l'effectif total : ici on ne regarde qu'une partie des élèves (« parmi … »)." }, { valeur: n / (t === 1 ? E.totL[i] : E.totC[j]), message: "Tu t'es trompé de sous-population : relis bien ce qui suit « parmi »." }] : [],
      aides: ["Fréquence $=$ effectif $\\div$ effectif de la population de référence.", t ? "« Parmi les … » indique la population de référence : c'est par son total qu'on divise." : "Fréquence marginale : on utilise un total de ligne ou de colonne, divisé par l'effectif total.", `Ici : $\\dfrac{${n}}{${d}}$.`],
      solution: `${sol}\n\n$f = ${fracDec(n, d)}$.`
    };
  };

  GEN["tc-medias"] = function () {
    const T = [
      ["« $40\\,\\%$ des filles du lycée font du sport. »", "F", "S", "fille", "fait du sport"],
      ["« Parmi les élèves qui viennent en bus, $25\\,\\%$ sont en Terminale. »", "B", "T", "vient en bus", "est en Terminale"],
      ["« $15\\,\\%$ des fumeurs ont une maladie respiratoire. »", "F", "M", "fumeur", "a une maladie respiratoire"],
      ["« $60\\,\\%$ des personnes vaccinées n'ont pas eu la grippe. »", "V", "\\overline{G}", "vacciné", "n'a pas eu la grippe"]
    ];
    const [phr, A, B] = pick(T);
    const ch = melangeChoix(`$f_{${A}}(${B})$`, [`$f_{${B}}(${A})$`, `$f(${A} \\cap ${B})$`, `$f(${B})$`]);
    return {
      enonce: `Comment traduire l'information ${phr} ? ($f_X(Y)$ est la fréquence de $Y$ parmi les $X$.)`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Cherche la population de référence : « des … », « parmi les … ».", `La population de référence est $${A}$ : elle va en indice.`, "$f_A(B)$ : parmi les $A$, la part de $B$."],
      solution: `La population de référence est $${A}$ ; on regarde la part de $${B}$ parmi eux : $f_{${A}}(${B})$. Attention, $f_{${B}}(${A})$ serait la part de $${A}$ parmi les $${B}$ : ce n'est pas la même chose.`
    };
  };

  GEN["tc-evenement"] = function () {
    const E = enqueteLycee(), i = rand(0, 2), j = rand(0, 2), t = rand(0, 2);
    const A = `A`, B = `B`;
    const dA = `$A$ : « l'élève vient ${E.noms[i]} » et $B$ : « l'élève est ${E.niv[j].replace("de ", "en ")} »`;
    let n, q, sol;
    if (t === 0) { n = E.N[i][j]; q = "P(A \\cap B)"; sol = `$A \\cap B$ : vient ${E.noms[i]} **et** est ${E.niv[j].replace("de ", "en ")}. Case du tableau : $${n}$. $P(A \\cap B) = ${fracDec(n, E.tot)}$.`; }
    else if (t === 1) { n = E.totL[i] + E.totC[j] - E.N[i][j]; q = "P(A \\cup B)"; sol = `$A \\cup B$ : vient ${E.noms[i]} **ou** est ${E.niv[j].replace("de ", "en ")} (ou les deux). $\\text{Card}(A \\cup B) = ${E.totL[i]} + ${E.totC[j]} - ${E.N[i][j]} = ${n}$ (on enlève la case commune, comptée deux fois). $P(A \\cup B) = ${fracDec(n, E.tot)}$.`; }
    else { n = E.tot - E.totL[i]; q = "P(\\overline{A})"; sol = `$\\overline{A}$ : l'élève ne vient **pas** ${E.noms[i]}. $P(\\overline{A}) = 1 - P(A) = 1 - \\dfrac{${E.totL[i]}}{${E.tot}} = ${fracDec(n, E.tot)}$.`; }
    return {
      enonce: `On choisit un élève au hasard dans l'enquête ci-dessous. ${dA}. Calcule $${q}$ (fraction ou arrondi au centième).`,
      tableau: { lignes: E.lignes() },
      mode: "nombre", prefixe: `${q.replace(/\\cap/, "∩").replace(/\\cup/, "∪").replace("\\overline{A}", "Ā")} =`, attendu: n / E.tot, tolerance: 0.0051,
      erreurs: t === 1 ? [{ valeur: (E.totL[i] + E.totC[j]) / E.tot, message: "La case commune a été comptée deux fois : il faut la retirer une fois." }] : [],
      aides: ["Situation d'équiprobabilité : $P(E) = \\dfrac{\\text{Card}(E)}{\\text{Card}(\\Omega)}$, avec $\\text{Card}(\\Omega) = " + E.tot + "$.", "$\\cap$ se lit « et » (les deux à la fois), $\\cup$ se lit « ou » (au moins l'un des deux), $\\overline{A}$ « non $A$ ».", t === 1 ? "$\\text{Card}(A \\cup B) = \\text{Card}(A) + \\text{Card}(B) - \\text{Card}(A \\cap B)$." : "Repère les cases du tableau qui correspondent à l'événement."],
      solution: sol
    };
  };

  GEN["tc-python"] = function () {
    const n = rand(6, 8), noms = ["bus", "pied", "voiture"], niv = ["2de", "1re", "Tle"];
    const L = Array.from({ length: n }, () => [pick(noms), pick(niv)]);
    const t = rand(0, 2), a = pick(noms), b = pick(niv);
    const cond = [`transport == "${a}" and niveau == "${b}"`, `transport == "${a}" or niveau == "${b}"`, `not transport == "${a}"`][t];
    const test = [(e) => e[0] === a && e[1] === b, (e) => e[0] === a || e[1] === b, (e) => e[0] !== a][t];
    const c = L.filter(test).length;
    return {
      enonce: "On considère le programme Python :\n\n```python\neleves = [\n    " + L.map((e) => `("${e[0]}", "${e[1]}")`).join(",\n    ") + "\n]\nc = 0\nfor (transport, niveau) in eleves:\n    if " + cond + ":\n        c = c + 1\nprint(c)\n```\n\nQuel nombre affiche-t-il ?",
      mode: "nombre", prefixe: "Affichage :", attendu: c,
      aides: ["La boucle parcourt chaque élève de la liste ; $c$ compte ceux qui vérifient la condition.", ["$\\texttt{and}$ : les **deux** conditions doivent être vraies.", "$\\texttt{or}$ : **au moins une** des deux conditions doit être vraie.", "$\\texttt{not}$ : la condition doit être **fausse**."][t], "Passe les élèves en revue un par un."],
      solution: `Les élèves qui vérifient la condition sont : ${L.map((e, k) => (test(e) ? `n°${k + 1} (${e[0]}, ${e[1]})` : null)).filter(Boolean).join(", ") || "aucun"}. Le programme affiche $${c}$.`
    };
  };


  /* ---------- Seconde, chapitre 11 : vecteurs 2, colinéarité et déterminant (préfixe co-) ---------- */
  const col = (x, y) => `\\begin{pmatrix} ${nb(x)} \\\\ ${nb(y)} \\end{pmatrix}`;
  const det = (u, v) => u[0] * v[1] - u[1] * v[0];
  const detTex = (u, v) => `${par(u[0])} \\times ${par(v[1])} - ${par(u[1])} \\times ${par(v[0])}`;
  // Deux vecteurs colinéaires (ou non) à coordonnées entières
  function paireVecteurs(colin) {
    let u, v;
    do {
      u = [randNZ(-6, 6), rand(-6, 6)];
      if (colin) { const k = pick([-3, -2, -0.5, 0.5, 2, 3, 1.5]); v = [u[0] * k, u[1] * k]; if (!Number.isInteger(v[0]) || !Number.isInteger(v[1])) v = [u[0] * 2, u[1] * 2]; }
      else v = [rand(-6, 6), randNZ(-6, 6)];
    } while (colin === (det(u, v) !== 0));
    return [u, v];
  }

  GEN["co-produit"] = function () {
    const u = [randNZ(-5, 5), randNZ(-5, 5)], v = [randNZ(-5, 5), randNZ(-5, 5)], a = randNZ(-3, 3), b = randNZ(-3, 3), q = rand(0, 1);
    const w = [a * u[0] + b * v[0], a * u[1] + b * v[1]];
    const expr = `${a === 1 ? "" : a === -1 ? "-" : a}\\vec{u} ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}\\vec{v}`;
    return {
      enonce: `$\\vec{u}${col(...u)}$ et $\\vec{v}${col(...v)}$. Calcule ${q ? "l'ordonnée" : "l'abscisse"} du vecteur $\\vec{w} = ${expr}$.`,
      mode: "nombre", prefixe: `${q ? "y" : "x"} =`, attendu: w[q],
      aides: ["$k\\vec{u}$ a pour coordonnées $(kx\\,;ky)$ : on multiplie chaque coordonnée par $k$.", `${q ? "Ordonnées" : "Abscisses"} : $${a} \\times ${par(u[q])}$ et $${b} \\times ${par(v[q])}$.`, "Additionne les deux résultats."],
      solution: `${q ? "Ordonnée" : "Abscisse"} de $\\vec{w}$ : $${a} \\times ${par(u[q])} + ${par(b)} \\times ${par(v[q])} = ${a * u[q]} + ${par(b * v[q])} = ${w[q]}$.\n\n$\\vec{w}${col(...w)}$.`
    };
  };

  GEN["co-determinant"] = function () {
    const u = [rand(-7, 7), rand(-7, 7)], v = [rand(-7, 7), rand(-7, 7)], d = det(u, v);
    return {
      enonce: `Calcule le déterminant $\\det(\\vec{u}, \\vec{v})$ avec $\\vec{u}${col(...u)}$ et $\\vec{v}${col(...v)}$.`,
      mode: "nombre", prefixe: "det =", attendu: d,
      erreurs: [{ valeur: -d, message: "Respecte l'ordre : $xy' - yx'$ (le produit « en diagonale descendante » en premier)." }, { valeur: u[0] * v[1] + u[1] * v[0], message: "C'est une **différence** de deux produits, pas une somme." }],
      aides: ["$\\det(\\vec{u}, \\vec{v}) = \\begin{vmatrix} x & x' \\\\ y & y' \\end{vmatrix} = xy' - yx'$.", `$x y' = ${par(u[0])} \\times ${par(v[1])} = ${u[0] * v[1]}$.`, `$y x' = ${par(u[1])} \\times ${par(v[0])} = ${u[1] * v[0]}$.`],
      solution: `$\\det(\\vec{u}, \\vec{v}) = ${detTex(u, v)} = ${u[0] * v[1]} - ${par(u[1] * v[0])} = ${d}$.` + (d === 0 ? " Le déterminant est nul : les vecteurs sont colinéaires." : "")
    };
  };

  GEN["co-colineaires"] = function () {
    const colin = Math.random() < 0.5, [u, v] = paireVecteurs(colin), d = det(u, v);
    return {
      enonce: `Les vecteurs $\\vec{u}${col(...u)}$ et $\\vec{v}${col(...v)}$ sont-ils colinéaires ?`,
      mode: "choix", choix: ["Oui", "Non"], attendu: colin ? 0 : 1,
      aides: ["Deux vecteurs sont colinéaires si et seulement si leur déterminant est nul.", "$\\det(\\vec{u}, \\vec{v}) = xy' - yx'$.", `Calcule $${detTex(u, v)}$.`],
      solution: `$\\det(\\vec{u}, \\vec{v}) = ${detTex(u, v)} = ${d}$.\n\n` + (colin ? `Le déterminant est nul : $\\vec{u}$ et $\\vec{v}$ sont **colinéaires**${u[0] ? ` ($\\vec{v} = ${nb(v[0] / u[0])}\\vec{u}$)` : ""}.` : "Le déterminant n'est pas nul : les vecteurs ne sont **pas** colinéaires.")
    };
  };

  GEN["co-parametre"] = function () {
    let u, v, m;
    do { u = [randNZ(-6, 6), randNZ(-6, 6)]; v = [randNZ(-6, 6), 0]; m = (u[1] * v[0]) / u[0]; } while (!Number.isInteger(m) || m === 0);
    // v = (v0 ; m) colinéaire à u
    return {
      enonce: `Trouve le réel $m$ pour que $\\vec{u}${col(...u)}$ et $\\vec{v}\\begin{pmatrix} ${v[0]} \\\\ m \\end{pmatrix}$ soient colinéaires.`,
      mode: "nombre", prefixe: "m =", attendu: m,
      aides: ["Colinéaires $\\iff \\det(\\vec{u}, \\vec{v}) = 0$.", `$\\det(\\vec{u}, \\vec{v}) = ${par(u[0])} \\times m - ${par(u[1])} \\times ${par(v[0])}$.`, `Résous $${u[0]}m - ${par(u[1] * v[0])} = 0$.`],
      solution: `$${par(u[0])}m - ${par(u[1])} \\times ${par(v[0])} = 0 \\iff ${u[0]}m = ${u[1] * v[0]} \\iff m = ${m}$.\n\nVérification : $\\vec{v} = ${nb(v[0] / u[0])}\\vec{u}$.`
    };
  };

  GEN["co-alignes"] = function () {
    const align = Math.random() < 0.5;
    let A, B, C;
    do {
      A = [rand(-6, 6), rand(-6, 6)]; const d = [randNZ(-4, 4), rand(-4, 4)];
      B = [A[0] + d[0], A[1] + d[1]];
      const k = pick([-2, -1, 2, 3]);
      C = align ? [A[0] + k * d[0], A[1] + k * d[1]] : [A[0] + k * d[0] + randNZ(-2, 2), A[1] + k * d[1]];
    } while (Math.max(...C.map(Math.abs)) > 15 || (det([B[0] - A[0], B[1] - A[1]], [C[0] - A[0], C[1] - A[1]]) === 0) !== align);
    const AB = [B[0] - A[0], B[1] - A[1]], AC = [C[0] - A[0], C[1] - A[1]], d = det(AB, AC);
    const para = Math.random() < 0.4;
    if (para) {
      const D = [C[0] + (align ? 0 : 1), C[1] + 3], CD = [D[0] - C[0], D[1] - C[1]];
      // (AB) et (CD) parallèles ? On choisit D pour que la réponse varie
      const Dp = align ? [C[0] + 2 * AB[0], C[1] + 2 * AB[1]] : D, CDp = [Dp[0] - C[0], Dp[1] - C[1]], dd = det(AB, CDp);
      return {
        enonce: `$A${pt(...A)}$, $B${pt(...B)}$, $C${pt(...C)}$ et $D${pt(...Dp)}$. Les droites $(AB)$ et $(CD)$ sont-elles parallèles ?`,
        mode: "choix", choix: ["Oui", "Non"], attendu: dd === 0 ? 0 : 1,
        aides: ["$(AB) \\parallel (CD)$ si et seulement si $\\overrightarrow{AB}$ et $\\overrightarrow{CD}$ sont colinéaires.", `$\\overrightarrow{AB}${col(...AB)}$ et $\\overrightarrow{CD}${col(...CDp)}$.`, "Calcule leur déterminant."],
        solution: `$\\det(\\overrightarrow{AB}, \\overrightarrow{CD}) = ${detTex(AB, CDp)} = ${dd}$. ` + (dd === 0 ? "Il est nul : les vecteurs sont colinéaires, les droites sont **parallèles**." : "Il n'est pas nul : les droites ne sont **pas** parallèles.")
      };
    }
    return {
      enonce: `Les points $A${pt(...A)}$, $B${pt(...B)}$ et $C${pt(...C)}$ sont-ils alignés ?`,
      mode: "choix", choix: ["Oui", "Non"], attendu: align ? 0 : 1,
      aides: ["$A$, $B$, $C$ sont alignés si et seulement si $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ sont colinéaires.", `$\\overrightarrow{AB}${col(...AB)}$ et $\\overrightarrow{AC}${col(...AC)}$.`, "Calcule $\\det(\\overrightarrow{AB}, \\overrightarrow{AC})$."],
      solution: `$\\det(\\overrightarrow{AB}, \\overrightarrow{AC}) = ${detTex(AB, AC)} = ${d}$. ` + (d === 0 ? "Il est nul : les vecteurs sont colinéaires, les points sont **alignés**." : "Il n'est pas nul : les points ne sont **pas** alignés.")
    };
  };

  GEN["co-combinaison"] = function () {
    let u, v;
    do { u = [randNZ(-4, 4), rand(-4, 4)]; v = [rand(-4, 4), randNZ(-4, 4)]; } while (det(u, v) === 0);
    const a = randNZ(-3, 3), b = randNZ(-3, 3), w = [a * u[0] + b * v[0], a * u[1] + b * v[1]], q = Math.random() < 0.5;
    return {
      enonce: `$\\vec{u}${col(...u)}$, $\\vec{v}${col(...v)}$ et $\\vec{w}${col(...w)}$. On cherche les réels $a$ et $b$ tels que $\\vec{w} = a\\vec{u} + b\\vec{v}$. Que vaut $${q ? "a" : "b"}$ ?`,
      mode: "nombre", prefixe: `${q ? "a" : "b"} =`, attendu: q ? a : b,
      erreurs: [{ valeur: q ? b : a, message: `Ça, c'est $${q ? "b" : "a"}$.` }],
      aides: ["Écris l'égalité coordonnée par coordonnée : deux équations, deux inconnues $a$ et $b$.", `$${u[0]}a ${v[0] < 0 ? "-" : "+"} ${Math.abs(v[0])}b = ${w[0]}$ et $${u[1]}a ${v[1] < 0 ? "-" : "+"} ${Math.abs(v[1])}b = ${w[1]}$.`, `Teste des petites valeurs entières : par exemple $a = ${a}$.`],
      solution: `$${a}\\vec{u} + ${par(b)}\\vec{v}${col(a * u[0] + b * v[0], a * u[1] + b * v[1])} = \\vec{w}$. Donc $a = ${a}$ et $b = ${b}$.\n\nComme $\\vec{u}$ et $\\vec{v}$ ne sont pas colinéaires ($\\det = ${det(u, v)} \\neq 0$), cette écriture est **unique**.`
    };
  };

  GEN["co-python"] = function () {
    const align = Math.random() < 0.5;
    let A, B, C;
    do { A = [rand(-5, 5), rand(-5, 5)]; const d = [randNZ(-3, 3), rand(-3, 3)]; B = [A[0] + d[0], A[1] + d[1]]; C = align ? [A[0] - d[0], A[1] - d[1]] : [B[0] + randNZ(-3, 3), B[1] + rand(-3, 3)]; }
    while ((det([B[0] - A[0], B[1] - A[1]], [C[0] - A[0], C[1] - A[1]]) === 0) !== align);
    return {
      enonce: "On considère la fonction Python :\n\n```python\ndef alignes(xA, yA, xB, yB, xC, yC):\n    x1, y1 = xB - xA, yB - yA\n    x2, y2 = xC - xA, yC - yA\n    return x1 * y2 - y1 * x2 == 0\n```\n\n" + `Que renvoie $\\texttt{alignes(${A.join(", ")}, ${B.join(", ")}, ${C.join(", ")})}$ ?`,
      mode: "choix", choix: ["True", "False"], attendu: align ? 0 : 1,
      aides: ["$(x_1\\,;y_1)$ sont les coordonnées de $\\overrightarrow{AB}$, $(x_2\\,;y_2)$ celles de $\\overrightarrow{AC}$.", "La fonction teste si le déterminant $x_1y_2 - y_1x_2$ est nul.", "Calcule ce déterminant."],
      solution: `$\\overrightarrow{AB}${col(B[0] - A[0], B[1] - A[1])}$, $\\overrightarrow{AC}${col(C[0] - A[0], C[1] - A[1])}$, déterminant $= ${det([B[0] - A[0], B[1] - A[1]], [C[0] - A[0], C[1] - A[1]])}$. La fonction renvoie **${align ? "True" : "False"}** : les points ${align ? "sont" : "ne sont pas"} alignés.`
    };
  };


  /* ---------- Seconde, chapitre 12 : droites du plan (préfixe dr-) ---------- */
  // « ax + by + c = 0 » proprement écrit
  function cartTex(a, b, c) {
    let s = "";
    [[a, "x"], [b, "y"], [c, ""]].forEach(([k, v]) => {
      if (k === 0) return;
      const abs = Math.abs(k), coef = v && abs === 1 ? "" : `${abs}`;
      s += s === "" ? `${k < 0 ? "-" : ""}${coef}${v}` : ` ${k < 0 ? "-" : "+"} ${coef}${v}`;
    });
    return `${s || "0"} = 0`;
  }
  const reduiteTex = (m, p) => `y = ${poly([m, p]).replace(/^0$/, "0")}`.replace("y = 0x", "y = ");
  const fracTex = (n, d) => frac(n, d);

  GEN["dr-vecteur-directeur"] = function () {
    const a = randNZ(-6, 6), b = randNZ(-6, 6), c = rand(-9, 9);
    const faux = [[a, b], [b, a], [a, -b], [-a, -b], [2 * a, b]].filter((w) => det(w, [-b, a]) !== 0).slice(0, 3);
    const ch = melangeChoix(`$\\vec{u}${col(-b, a)}$`, faux.map((w) => `$\\vec{u}${col(...w)}$`));
    return {
      enonce: `Quel vecteur est un vecteur directeur de la droite $d$ d'équation $${cartTex(a, b, c)}$ ?`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Une droite d'équation $ax + by + c = 0$ a pour vecteur directeur $\\vec{u}\\begin{pmatrix} -b \\\\ a \\end{pmatrix}$.", `Ici $a = ${a}$ et $b = ${b}$.`, `Donc $-b = ${-b}$ et $a = ${a}$.`],
      solution: `$a = ${a}$, $b = ${b}$ : un vecteur directeur est $\\vec{u}${col(-b, a)}$. Tout vecteur colinéaire à celui-ci (et non nul) convient aussi.`
    };
  };

  GEN["dr-cartesienne"] = function () {
    const A = [rand(-5, 5), rand(-5, 5)], u = [randNZ(-5, 5), randNZ(-5, 5)];
    const a = u[1], b = -u[0], c = -(a * A[0] + b * A[1]);
    const bonne = cartTex(a, b, c);
    const memeDroite = (t) => t[0] * b - t[1] * a === 0 && t[0] * c - t[2] * a === 0 && t[1] * c - t[2] * b === 0;
    const faux = [[u[0], u[1], -(u[0] * A[0] + u[1] * A[1])], [a, b, -c], [-b, a, b * A[0] - a * A[1]], [a, b, c + 1]].filter((t) => !memeDroite(t)).slice(0, 3).map((t) => cartTex(...t));
    const ch = melangeChoix(`$${bonne}$`, faux.map((f) => `$${f}$`));
    return {
      enonce: `Quelle est une équation cartésienne de la droite passant par $A(${A[0]}\\,;${A[1]})$ et de vecteur directeur $\\vec{u}${col(...u)}$ ?`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["$M(x\\,;y)$ est sur la droite si et seulement si $\\overrightarrow{AM}$ et $\\vec{u}$ sont colinéaires : $\\det(\\overrightarrow{AM}, \\vec{u}) = 0$.", `$\\overrightarrow{AM}\\begin{pmatrix} x ${sg(-A[0])} \\\\ y ${sg(-A[1])} \\end{pmatrix}$.`, `$\\det = (x ${sg(-A[0])}) \\times ${par(u[1])} - (y ${sg(-A[1])}) \\times ${par(u[0])}$. Développe.`],
      solution: `$\\det(\\overrightarrow{AM}, \\vec{u}) = (x ${sg(-A[0])}) \\times ${par(u[1])} - (y ${sg(-A[1])}) \\times ${par(u[0])} = 0$, soit $${bonne}$.\n\nVérification : $A$ vérifie l'équation, et un vecteur directeur est $(-b\\,;a) = (${u[0]}\\,;${u[1]})$.`
    };
  };

  GEN["dr-reduite-2pts"] = function () {
    let A, B, m, p;
    do { m = pick([-3, -2, -1, -0.5, 0.5, 1, 2, 3, 4]); p = rand(-6, 6); const xa = rand(-4, 2), xb = xa + pick([2, 4]); A = [xa, m * xa + p]; B = [xb, m * xb + p]; } while (!Number.isInteger(A[1]) || !Number.isInteger(B[1]));
    const q = Math.random() < 0.5;
    return {
      enonce: `La droite $(AB)$ passe par $A(${A[0]}\\,;${A[1]})$ et $B(${B[0]}\\,;${B[1]})$. Son équation réduite est $y = mx + p$. Que vaut $${q ? "m" : "p"}$ ?`,
      mode: "nombre", prefixe: `${q ? "m" : "p"} =`, attendu: q ? m : p,
      erreurs: q ? [{ valeur: 1 / m, message: "Pente $= \\dfrac{y_B - y_A}{x_B - x_A}$ : les $y$ en haut." }, { valeur: -m, message: "Garde le même ordre en haut et en bas : $y_B - y_A$ et $x_B - x_A$." }] : [{ valeur: m, message: "Ça, c'est la pente $m$ ; on demande l'ordonnée à l'origine $p$." }],
      aides: ["La pente est $m = \\dfrac{y_B - y_A}{x_B - x_A}$.", `$m = \\dfrac{${B[1]} - ${par(A[1])}}{${B[0]} - ${par(A[0])}} = ${nb(m)}$.`, `Puis $p$ : $${A[1]} = ${nb(m)} \\times ${par(A[0])} + p$.`],
      solution: `$m = \\dfrac{${B[1] - A[1]}}{${B[0] - A[0]}} = ${nb(m)}$. Puis $${A[1]} = ${nb(m)} \\times ${par(A[0])} + p$, donc $p = ${p}$.\n\n$(AB) : y = ${poly([m, p]).replace(/(\d)\.(\d)/g, "$1{,}$2")}$.`
    };
  };

  GEN["dr-reduite"] = function () {
    // ax + by + c = 0 avec b ≠ 0 → y = (−a/b)x − c/b, coefficients « jolis »
    let a, b, c;
    do { b = randNZ(-4, 4); a = b * randNZ(-3, 3) * pick([1, 1, 0.5]); c = b * rand(-5, 5); } while (!Number.isInteger(a) || a === 0);
    const m = -a / b, p = -c / b;
    const bonne = `y = ${poly([m, p]).replace(/(\d)\.(\d)/g, "$1{,}$2")}`;
    const faux = [`y = ${poly([a / b, -p]).replace(/(\d)\.(\d)/g, "$1{,}$2")}`, `y = ${poly([-a, -c]).replace(/(\d)\.(\d)/g, "$1{,}$2")}`, `y = ${poly([m, -p]).replace(/(\d)\.(\d)/g, "$1{,}$2")}`];
    const ch = melangeChoix(`$${bonne}$`, faux.map((f) => `$${f}$`));
    return {
      enonce: `Quelle est l'équation réduite de la droite d'équation cartésienne $${cartTex(a, b, c)}$ ?`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["On isole $y$ : on laisse le terme en $y$ seul d'un côté.", `$${b === 1 ? "" : b === -1 ? "-" : b}y = ${poly([-a, -c])}$.`, `Divise par $${b}$.`],
      solution: `$${cartTex(a, b, c)} \\iff ${b === 1 ? "" : b === -1 ? "-" : b}y = ${poly([-a, -c])} \\iff ${bonne}$.`
    };
  };

  GEN["dr-position"] = function () {
    const m1 = randNZ(-4, 4), p1 = rand(-8, 8), para = Math.random() < 0.35;
    let m2, p2, x0;
    if (para) { m2 = m1; do { p2 = rand(-8, 8); } while (p2 === p1); }
    else { do { m2 = randNZ(-4, 4); } while (m2 === m1); x0 = rand(-5, 5); p2 = m1 * x0 + p1 - m2 * x0; }
    if (para || Math.random() < 0.4) {
      return {
        enonce: `Les droites $d_1 : ${reduiteTex(m1, p1)}$ et $d_2 : ${reduiteTex(m2, p2)}$ sont-elles parallèles ou sécantes ?`,
        mode: "choix", choix: ["Parallèles", "Sécantes"], attendu: para ? 0 : 1,
        aides: ["Deux droites d'équations réduites sont parallèles si et seulement si elles ont la **même pente**.", `Pentes : $${m1}$ et $${m2}$.`, "Si les pentes sont différentes, les droites se coupent en un point."],
        solution: para ? `Même pente $${m1}$ (et ordonnées à l'origine différentes) : les droites sont **parallèles** (strictement).` : `Pentes différentes ($${m1} \\neq ${m2}$) : les droites sont **sécantes**.`
      };
    }
    return {
      enonce: `Les droites $d_1 : ${reduiteTex(m1, p1)}$ et $d_2 : ${reduiteTex(m2, p2)}$ sont sécantes. Calcule l'abscisse de leur point d'intersection.`,
      mode: "nombre", prefixe: "x =", attendu: x0,
      aides: ["Au point d'intersection, les deux $y$ sont égaux.", `Résous $${poly([m1, p1])} = ${poly([m2, p2])}$.`, `$${poly([m1 - m2, 0])} = ${p2 - p1}$.`],
      solution: `$${poly([m1, p1])} = ${poly([m2, p2])} \\iff ${poly([m1 - m2, 0])} = ${p2 - p1} \\iff x = ${x0}$.\n\nPuis $y = ${m1} \\times ${par(x0)} ${sg(p1)} = ${m1 * x0 + p1}$ : le point d'intersection est $(${x0}\\,;${m1 * x0 + p1})$.`
    };
  };

  GEN["dr-python"] = function () {
    const m = randNZ(-4, 4), p = rand(-5, 5), xa = rand(-4, 1), xb = xa + rand(1, 4);
    const A = [xa, m * xa + p], B = [xb, m * xb + p], q = Math.random() < 0.5;
    return {
      enonce: "On considère la fonction Python :\n\n```python\ndef droite(xA, yA, xB, yB):\n    m = (yB - yA) / (xB - xA)\n    p = yA - m * xA\n    return m, p\n```\n\n" + `Que renvoie $\\texttt{droite(${A.join(", ")}, ${B.join(", ")})}$ ? Donne la ${q ? "première" : "seconde"} valeur.`,
      mode: "nombre", prefixe: "Réponse :", attendu: q ? m : p,
      aides: ["La fonction calcule la pente $m$, puis l'ordonnée à l'origine $p$.", `$m = \\dfrac{${B[1]} - ${par(A[1])}}{${B[0]} - ${par(A[0])}}$.`, `$p = y_A - m \\times x_A$.`],
      solution: `$m = \\dfrac{${B[1] - A[1]}}{${B[0] - A[0]}} = ${m}$ et $p = ${A[1]} - ${par(m)} \\times ${par(A[0])} = ${p}$. La fonction renvoie $(${m}\\,;${p})$ : la droite $(AB)$ a pour équation $${reduiteTex(m, p)}$.`
    };
  };


  /* ---------- Seconde, chapitre 13 : fonctions inverse, racine carrée, cube (préfixe fr-) ---------- */
  GEN["fr-comparer"] = refRestreint("var-ref-comparer", ["inverse", "inverse", "racine", "cube"]);
  GEN["fr-equation"] = refRestreint("var-ref-equation", null, [2, 3, 4, 4]);

  GEN["fr-position"] = function () {
    const petit = Math.random() < 0.5;
    const x = petit ? pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]) : pick([1.1, 1.2, 1.5, 2, 2.5, 3]);
    const xt = nb(x);
    const bonne = petit ? `${xt}^3 < ${xt}^2 < ${xt}` : `${xt} < ${xt}^2 < ${xt}^3`;
    const faux = petit ? [`${xt} < ${xt}^2 < ${xt}^3`, `${xt}^2 < ${xt}^3 < ${xt}`, `${xt}^2 < ${xt} < ${xt}^3`] : [`${xt}^3 < ${xt}^2 < ${xt}`, `${xt}^2 < ${xt} < ${xt}^3`, `${xt} < ${xt}^3 < ${xt}^2`];
    const ch = melangeChoix(`$${bonne}$`, faux.map((f) => `$${f}$`));
    return {
      enonce: `Sans calculatrice, range dans l'ordre croissant $${xt}$, $${xt}^2$ et $${xt}^3$.`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Tout dépend de la position de $x$ par rapport à $1$.", "Pour $0 < x < 1$, multiplier par $x$ fait **diminuer** un nombre positif. Pour $x > 1$, cela le fait augmenter.", `Ici $x = ${xt}$ est ${petit ? "entre $0$ et $1$" : "supérieur à $1$"}.`],
      solution: petit ? `$0 < ${xt} < 1$ : chaque multiplication par $${xt}$ fait diminuer. Donc $${bonne}$ (en effet $${nb(+(x ** 3).toFixed(4))} < ${nb(+(x ** 2).toFixed(4))} < ${xt}$).` : `$${xt} > 1$ : chaque multiplication par $${xt}$ fait augmenter. Donc $${bonne}$ (en effet $${xt} < ${nb(+(x ** 2).toFixed(4))} < ${nb(+(x ** 3).toFixed(4))}$).`
    };
  };

  GEN["fr-inequation"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      // 1/x > k ou < k sur ]0 ; +∞[
      const k = pick([2, 4, 5, 10, 0.5]), sup = Math.random() < 0.5, b = nb(1 / k);
      const bonne = sup ? `]0\\,;${b}[` : `]${b}\\,;+\\infty[`;
      const ch = melangeChoix(`$${bonne}$`, [sup ? `]${b}\\,;+\\infty[` : `]0\\,;${b}[`, sup ? `]0\\,;${nb(k)}[` : `]${nb(k)}\\,;+\\infty[`, `]-\\infty\\,;${b}[`].map((f) => `$${f}$`));
      return {
        enonce: `Résous sur $]0\\,;+\\infty[$ l'inéquation $\\dfrac{1}{x} ${sup ? ">" : "<"} ${nb(k)}$.`,
        mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`Résous d'abord $\\dfrac{1}{x} = ${nb(k)}$ : $x = \\dfrac{1}{${nb(k)}} = ${b}$.`, "La fonction inverse est **décroissante** sur $]0\\,;+\\infty[$ : l'ordre s'inverse.", `$\\dfrac{1}{x} ${sup ? ">" : "<"} \\dfrac{1}{${b}} \\iff x ${sup ? "<" : ">"} ${b}$ (pour $x > 0$).`],
        solution: `Sur $]0\\,;+\\infty[$, la fonction inverse est décroissante : $\\dfrac{1}{x} ${sup ? ">" : "<"} ${nb(k)} \\iff x ${sup ? "<" : ">"} ${b}$. Donc $S = ${bonne}$.`
      };
    }
    if (t === 1) {
      // √x < k ou > k
      const k = rand(2, 9), sup = Math.random() < 0.5, bonne = sup ? `]${k * k}\\,;+\\infty[` : `[0\\,;${k * k}[`;
      const ch = melangeChoix(`$${bonne}$`, [sup ? `]${k}\\,;+\\infty[` : `[0\\,;${k}[`, sup ? `[0\\,;${k * k}[` : `]${k * k}\\,;+\\infty[`, sup ? `]-\\infty\\,;${k * k}[` : `]-\\infty\\,;${k * k}[`].map((f) => `$${f}$`));
      return {
        enonce: `Résous l'inéquation $\\sqrt{x} ${sup ? ">" : "<"} ${k}$.`,
        mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["$\\sqrt{x}$ n'existe que pour $x \\geqslant 0$.", `$\\sqrt{x} = ${k} \\iff x = ${k * k}$.`, "La fonction racine carrée est **croissante** : l'ordre est conservé."],
        solution: `La racine carrée est croissante sur $[0\\,;+\\infty[$ : $\\sqrt{x} ${sup ? ">" : "<"} ${k} \\iff ${sup ? `x > ${k * k}` : `0 \\leqslant x < ${k * k}`}$. Donc $S = ${bonne}$.`
      };
    }
    // x³ < k
    const c = randNZ(-4, 4), k = c ** 3, sup = Math.random() < 0.5, bonne = sup ? `]${c}\\,;+\\infty[` : `]-\\infty\\,;${c}[`;
    const ch = melangeChoix(`$${bonne}$`, [sup ? `]-\\infty\\,;${c}[` : `]${c}\\,;+\\infty[`, sup ? `]${k}\\,;+\\infty[` : `]-\\infty\\,;${k}[`, `]${-Math.abs(c)}\\,;${Math.abs(c)}[`].map((f) => `$${f}$`));
    return {
      enonce: `Résous dans $\\mathbb{R}$ l'inéquation $x^3 ${sup ? ">" : "<"} ${k}$.`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`Cherche le nombre dont le cube vaut $${k}$ : c'est $${c}$.`, "La fonction cube est **croissante** sur $\\mathbb{R}$ : l'ordre est conservé.", `$x^3 ${sup ? ">" : "<"} ${par(c)}^3 \\iff x ${sup ? ">" : "<"} ${c}$.`],
      solution: `$${par(c)}^3 = ${k}$ et la fonction cube est croissante sur $\\mathbb{R}$, donc $x^3 ${sup ? ">" : "<"} ${k} \\iff x ${sup ? ">" : "<"} ${c}$. $S = ${bonne}$.`
    };
  };

  GEN["fr-python"] = function () {
    const k = pick([2, 3, 5, 6, 7, 10, 11]), n = rand(1, 2), pas = 10 ** -n;
    // première valeur x = 1, 1 + pas, … telle que x² ≥ k (calculée en entiers pour éviter les arrondis)
    let i = Math.round(10 ** n); while (i * i < k * 10 ** (2 * n)) i++;
    const r = i / 10 ** n, deb = Math.floor(Math.sqrt(k));
    return {
      enonce: "On considère la fonction Python :\n\n```python\ndef encadrement(k, pas):\n    x = " + deb + "\n    while x * x < k:\n        x = x + pas\n    return x - pas, x\n```\n\n" + `Que renvoie $\\texttt{encadrement(${k}, ${n === 1 ? "0.1" : "0.01"})}$ ? Donne la **seconde** valeur (arrondie à $10^{-${n}}$).`,
      mode: "nombre", prefixe: "Réponse :", attendu: r, tolerance: pas / 2,
      erreurs: [{ valeur: r - pas, message: "Ça, c'est la première valeur (la borne inférieure)." }],
      aides: [`La boucle augmente $x$ de $${nb(pas)}$ tant que $x^2 < ${k}$ : elle s'arrête dès que $x^2 \\geqslant ${k}$.`, `On cherche donc le premier nombre de la forme $${deb} + ${nb(pas)} \\times \\ldots$ dont le carré dépasse $${k}$.`, `$\\sqrt{${k}} \\approx ${nb(+Math.sqrt(k).toFixed(4))}$.`],
      solution: `$${nb(+(r - pas).toFixed(n))}^2 < ${k} \\leqslant ${nb(r)}^2$ : la fonction renvoie $(${nb(+(r - pas).toFixed(n))}\\,;${nb(r)})$, un encadrement de $\\sqrt{${k}}$ d'amplitude $10^{-${n}}$ : $${nb(+(r - pas).toFixed(n))} < \\sqrt{${k}} \\leqslant ${nb(r)}$.\n\nEn pratique, Python peut afficher des valeurs comme $\\texttt{1.4000000000000001}$ : c'est l'arrondi de la machine.`
    };
  };


  /* ---------- Seconde, chapitre 14 : signes d'expressions et équations quotients (préfixe sg-) ---------- */
  // Deux facteurs affines x − r1 et x − r2 (r1 < r2), éventuellement multipliés par un coefficient
  function deuxRacines() { let a, b; do { a = rand(-6, 6); b = rand(-6, 6); } while (a === b); return a < b ? [a, b] : [b, a]; }
  const fx1 = (r) => (r === 0 ? "x" : `x ${r > 0 ? "-" : "+"} ${Math.abs(r)}`);

  GEN["sg-tableau"] = function () {
    const [r1, r2] = deuxRacines(), quot = Math.random() < 0.4, zone = rand(0, 2);
    const s = [1, -1, 1][zone]; // signe de (x − r1)(x − r2) : + − +
    const ordre = Math.random() < 0.5; // facteur en r1 au numérateur ou non
    const expr = quot ? `\\dfrac{${fx1(ordre ? r1 : r2)}}{${fx1(ordre ? r2 : r1)}}` : `(${fx1(r1)})(${fx1(r2)})`;
    const zt = [`x < ${r1}`, `${r1} < x < ${r2}`, `x > ${r2}`][zone];
    const t = (r) => fx1(r).replace(" - ", " − "), m = (k) => String(k).replace("-", "−");
    const fin = ["", quot ? (ordre ? "0" : "||") : "0", "", quot ? (ordre ? "||" : "0") : "0", ""]; fin[2 * zone] = "?";
    const fig = tabsigne(["−∞", m(r1), m(r2), "+∞"], [{ nom: t(r1), cases: ["-", "0", "+", "", "+"] }, { nom: t(r2), cases: ["-", "", "-", "0", "+"] }, { nom: quot ? "quotient" : "produit", cases: fin }]);
    return {
      figure: fig,
      enonce: `Dans le tableau de signes de $${expr}$, quel est le signe ${zone === 1 ? "entre" : zone === 0 ? "avant" : "après"} les valeurs remarquables, c'est-à-dire pour $${zt}$ ?`,
      mode: "choix", choix: ["$+$", "$-$"], attendu: s > 0 ? 0 : 1,
      aides: [`Les facteurs s'annulent en $${r1}$ et en $${r2}$.`, "$x - a$ est négatif avant $a$ et positif après.", quot ? "Pour un quotient, la règle des signes est la même que pour un produit." : "Règle des signes : deux facteurs de même signe donnent $+$, de signes contraires donnent $-$."],
      solution: `Pour $${zt}$ : $${fx1(r1)}$ est ${zone === 0 ? "négatif" : "positif"} et $${fx1(r2)}$ est ${zone === 2 ? "positif" : "négatif"}. ${s > 0 ? "Même signe" : "Signes contraires"} : le ${quot ? "quotient" : "produit"} est **${s > 0 ? "positif" : "négatif"}**.` + (quot ? `\n\nAttention : en $${ordre ? r2 : r1}$, le dénominateur s'annule : **valeur interdite** (double barre dans le tableau).` : "")
    };
  };

  GEN["sg-quotient"] = function () {
    const [r1, r2] = deuxRacines(), op = pick(OPS), numR = Math.random() < 0.5 ? r1 : r2, denR = numR === r1 ? r2 : r1;
    const large = op === "\\geqslant" || op === "\\leqslant", veutPos = op === ">" || op === "\\geqslant";
    // le quotient est positif à l'extérieur de [r1 ; r2], négatif à l'intérieur
    const cr = (r) => (r === numR && large ? "[" : "]"), cl = (r) => (r === numR && large ? "]" : "[");
    const ext = `]-\\infty\\,;${r1}${cl(r1)} \\cup ${cr(r2)}${r2}\\,;+\\infty[`;
    const int = `${cr(r1)}${r1}\\,;${r2}${cl(r2)}`;
    const bonne = veutPos ? ext : int;
    const faux = [veutPos ? int : ext, veutPos ? `]-\\infty\\,;${r1}] \\cup [${r2}\\,;+\\infty[` : `[${r1}\\,;${r2}]`, veutPos ? `]${r2}\\,;+\\infty[` : `]-\\infty\\,;${r2}[`].filter((f) => f !== bonne);
    const ch = melangeChoix(`$${bonne}$`, faux.map((f) => `$${f}$`));
    return {
      enonce: `Résous l'inéquation $\\dfrac{${fx1(numR)}}{${fx1(denR)}} ${op} 0$.`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`Valeur interdite : $${denR}$ (le dénominateur s'annule). Le numérateur s'annule en $${numR}$.`, `Dresse le tableau de signes : le quotient est positif pour $x < ${r1}$ et $x > ${r2}$, négatif entre $${r1}$ et $${r2}$.`, `La valeur interdite $${denR}$ est **toujours exclue**${large ? `, mais $${numR}$ est inclus car l'inégalité est large` : ""}.`],
      solution: `Le quotient s'annule en $${numR}$ et n'existe pas en $${denR}$. Il est ${veutPos ? "positif" : "négatif"} ${veutPos ? `pour $x < ${r1}$ ou $x > ${r2}$` : `entre $${r1}$ et $${r2}$`}.\n\n$S = ${bonne}$ (crochet ouvert en $${denR}$, valeur interdite).`
    };
  };

  GEN["sg-eq-quotient"] = function () {
    // (ax + b)/(x + c) = k, solution unique entière différente de la valeur interdite
    let a, b, c, k, x0;
    do { a = randNZ(-4, 4); c = rand(-6, 6); k = randNZ(-4, 4); x0 = rand(-6, 6); b = k * (x0 + c) - a * x0; } while (a === k || x0 === -c || Math.abs(b) > 20);
    const num = poly([a, b]), den = poly([1, c]);
    if (Math.random() < 0.35) {
      // A(x)/B(x) = 0
      const r = rand(-6, 6), interdite = Math.random() < 0.3 ? r : rand(-6, 6);
      const sol = r === interdite ? [] : [r];
      return {
        enonce: `Résous l'équation $\\dfrac{${fx1(r)}}{${fx1(interdite)}} = 0$. (Écris « aucune » s'il n'y a pas de solution.)`,
        mode: "ensemble", prefixe: "Solution(s) :", attendu: sol,
        aides: ["Un quotient est nul si et seulement si son **numérateur** est nul **et** son dénominateur ne l'est pas.", `Valeur interdite : $${interdite}$.`, `Le numérateur s'annule en $${r}$.`],
        solution: r === interdite ? `Le numérateur s'annule en $${r}$, mais c'est aussi la valeur interdite. **Aucune** solution.` : `Le numérateur s'annule en $${r}$, qui n'est pas la valeur interdite ($${interdite}$). Solution : $${r}$.`
      };
    }
    return {
      enonce: `Résous l'équation $\\dfrac{${num}}{${den}} = ${k}$ (pour $x \\neq ${-c}$).`,
      mode: "nombre", prefixe: "x =", attendu: x0,
      aides: [`Pour $x \\neq ${-c}$, on multiplie les deux membres par $${den}$ : $${num} = ${k}(${den})$.`, `Développe : $${num} = ${poly([k, k * c])}$.`, "Résous cette équation du premier degré, puis vérifie que la solution n'est pas la valeur interdite."],
      solution: `$\\dfrac{${num}}{${den}} = ${k} \\iff ${num} = ${poly([k, k * c])}$ (avec $x \\neq ${-c}$) $\\iff ${poly([a - k, 0])} = ${k * c - b} \\iff x = ${x0}$.\n\n$${x0} \\neq ${-c}$ : la solution est $${x0}$.`
    };
  };

  GEN["sg-difference"] = function () {
    const t = rand(0, 2);
    const T = [
      { q: "Pour $x > 0$, compare $x + \\dfrac{1}{x}$ et $2$.", rep: "$x + \\dfrac{1}{x} \\geqslant 2$", faux: ["$x + \\dfrac{1}{x} \\leqslant 2$", "Ça dépend de $x$", "$x + \\dfrac{1}{x} = 2$"], diff: "$x + \\dfrac{1}{x} - 2 = \\dfrac{x^2 - 2x + 1}{x} = \\dfrac{(x - 1)^2}{x}$", sol: "Un carré est positif et $x > 0$ : la différence est positive ou nulle. Donc $x + \\dfrac{1}{x} \\geqslant 2$ (égalité pour $x = 1$)." },
      { q: "Pour tout réel $x$, compare $(x + 3)^2$ et $x^2 + 9$.", rep: "Ça dépend du signe de $x$", faux: ["$(x + 3)^2 \\geqslant x^2 + 9$ toujours", "$(x + 3)^2 \\leqslant x^2 + 9$ toujours", "Ils sont toujours égaux"], diff: "$(x + 3)^2 - (x^2 + 9) = 6x$", sol: "$6x$ est positif si $x > 0$, négatif si $x < 0$, nul si $x = 0$ : la comparaison dépend du signe de $x$." },
      { q: "Pour $x \\geqslant 0$, compare $\\sqrt{x}$ et $x$ quand $0 \\leqslant x \\leqslant 1$.", rep: "$x \\leqslant \\sqrt{x}$", faux: ["$x \\geqslant \\sqrt{x}$", "Ils sont égaux", "On ne peut pas comparer"], diff: "$\\sqrt{x} - x = \\sqrt{x}(1 - \\sqrt{x})$", sol: "Pour $0 \\leqslant x \\leqslant 1$, $\\sqrt{x} \\geqslant 0$ et $1 - \\sqrt{x} \\geqslant 0$ : la différence est positive, donc $x \\leqslant \\sqrt{x}$ (par exemple $0{,}25 < 0{,}5$)." }
    ][t];
    const ch = melangeChoix(T.rep, T.faux);
    return {
      enonce: T.q,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Pour comparer $A$ et $B$, on étudie le **signe de la différence** $A - B$.", `Ici : ${T.diff}.`, "Étudie le signe de cette expression."],
      solution: `${T.diff}.\n\n${T.sol}`
    };
  };

  GEN["sg-python"] = function () {
    const a = randNZ(-4, 4), b = randNZ(-6, 6), c = randNZ(-3, 3), d = randNZ(-6, 6), x = rand(-5, 5);
    const v = (a * x + b) * (c * x + d);
    return {
      enonce: "On considère le programme Python :\n\n```python\ndef signe(v):\n    if v > 0:\n        return \"+\"\n    elif v < 0:\n        return \"-\"\n    else:\n        return \"0\"\n\nx = " + x + "\nprint(signe((" + a + " * x " + (b < 0 ? "- " + -b : "+ " + b) + ") * (" + c + " * x " + (d < 0 ? "- " + -d : "+ " + d) + ")))\n```\n\nQu'affiche ce programme ?",
      mode: "choix", choix: ["$\\texttt{+}$", "$\\texttt{-}$", "$\\texttt{0}$"], attendu: v > 0 ? 0 : v < 0 ? 1 : 2,
      aides: [`Calcule chaque facteur pour $x = ${x}$.`, `$${a} \\times ${par(x)} + ${par(b)} = ${a * x + b}$ et $${c} \\times ${par(x)} + ${par(d)} = ${c * x + d}$.`, "Applique la règle des signes au produit."],
      solution: `$(${a * x + b}) \\times (${c * x + d}) = ${v}$ : le programme affiche $\\texttt{${v > 0 ? "+" : v < 0 ? "-" : "0"}}$.`
    };
  };


  /* ---------- Seconde, chapitre 15 : probabilités conditionnelles et arbres pondérés (préfixe pc-) ---------- */
  // Arbre pondéré à deux épreuves. n : noms [A, ~A, B, ~B] (« ~ » : barre au-dessus) ;
  // p : textes des 6 branches [A, non A, B sachant A, non B sachant A, B sachant non A, non B sachant non A] ("?" possible)
  function arbre(n, p) {
    const W = 320, H = 200, x0 = 14, x1 = 120, x2 = 270, yA = 55, yN = 145, d = 30;
    const ys = [yA - d, yA + d, yN - d, yN + d];
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="Arbre pondéré à deux épreuves">`;
    const nom = (t) => (t[0] === "~" ? `<tspan style="text-decoration:overline">${t.slice(1)}</tspan>` : t);
    const br = (xa, ya, xb, yb, t) => {
      s += `<line x1="${xa}" y1="${ya}" x2="${xb - 14}" y2="${yb}" style="stroke:var(--doux);stroke-width:1.6"/>`;
      s += `<text class="g-label" x="${(xa + xb - 14) / 2}" y="${(ya + yb) / 2 - 5}" text-anchor="middle" style="fill:${t === "?" ? "var(--ylang)" : "var(--encre)"}">${t}</text>`;
    };
    br(x0, H / 2, x1, yA, p[0]); br(x0, H / 2, x1, yN, p[1]);
    br(x1 + 10, yA, x2, ys[0], p[2]); br(x1 + 10, yA, x2, ys[1], p[3]);
    br(x1 + 10, yN, x2, ys[2], p[4]); br(x1 + 10, yN, x2, ys[3], p[5]);
    s += `<text class="g-clabel" x="${x1 - 8}" y="${yA + 4}">${nom(n[0])}</text><text class="g-clabel" x="${x1 - 8}" y="${yN + 4}">${nom(n[1])}</text>`;
    ys.forEach((y, i) => { s += `<text class="g-clabel" x="${x2 - 8}" y="${y + 4}">${nom(n[2 + (i % 2)])}</text>`; });
    return s + `</svg>`;
  }
  const NOMS_ARBRE = ["A", "~A", "B", "~B"];
  const dec2 = (x) => nb(+x.toFixed(4));
  FIGURES["arbre-depistage"] = () => arbre(["M", "~M", "T", "~T"], ["0,02", "0,98", "0,95", "0,05", "0,1", "0,9"]);

  GEN["pc-formule"] = function () {
    const pA = pick([0.2, 0.25, 0.4, 0.5, 0.6, 0.8]), pBA = pick([0.1, 0.2, 0.25, 0.3, 0.5, 0.6, 0.75]), inter = +(pA * pBA).toFixed(4);
    const t = Math.random() < 0.5;
    if (t) return {
      enonce: `On donne $P(A) = ${dec2(pA)}$ et $P(A \\cap B) = ${dec2(inter)}$. Calcule $P_A(B)$.`,
      mode: "nombre", prefixe: "$P_A(B) =$", attendu: pBA,
      erreurs: [{ valeur: inter * pA, message: "On **divise** par $P(A)$ : $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$." }],
      aides: ["$P_A(B)$ est la probabilité de $B$ **sachant** $A$.", "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.", `Calcule $\\dfrac{${dec2(inter)}}{${dec2(pA)}}$.`],
      solution: `$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)} = \\dfrac{${dec2(inter)}}{${dec2(pA)}} = ${dec2(pBA)}$.`
    };
    return {
      enonce: `On donne $P(A) = ${dec2(pA)}$ et $P_A(B) = ${dec2(pBA)}$. Calcule $P(A \\cap B)$.`,
      mode: "nombre", prefixe: "P(A ∩ B) =", attendu: inter,
      erreurs: [{ valeur: pBA / pA, message: "On **multiplie** : $P(A \\cap B) = P(A) \\times P_A(B)$." }],
      aides: ["Sur un arbre, on multiplie les probabilités le long d'un chemin.", "$P(A \\cap B) = P(A) \\times P_A(B)$.", `Calcule $${dec2(pA)} \\times ${dec2(pBA)}$.`],
      solution: `$P(A \\cap B) = P(A) \\times P_A(B) = ${dec2(pA)} \\times ${dec2(pBA)} = ${dec2(inter)}$.`
    };
  };

  GEN["pc-arbre"] = function () {
    const pA = pick([0.1, 0.2, 0.3, 0.4, 0.6, 0.7]), b1 = pick([0.2, 0.3, 0.4, 0.6, 0.8, 0.9]), b2 = pick([0.1, 0.2, 0.5, 0.7]);
    const P = [pA, 1 - pA, b1, 1 - b1, b2, 1 - b2].map((x) => +x.toFixed(2));
    const k = rand(1, 5), lab = P.map((x) => String(x).replace(".", ","));
    const t = rand(0, 1);
    if (t === 0) {
      // branche manquante
      const shown = lab.slice(); shown[k] = "?";
      const nomsB = ["P(\\overline{A})", "P_A(B)", "P_A(\\overline{B})", "P_{\\overline{A}}(B)", "P_{\\overline{A}}(\\overline{B})"][k - 1];
      const paire = k === 1 ? 0 : k % 2 === 0 ? k + 1 : k - 1;
      return {
        enonce: "Complète la branche marquée d'un **?** dans l'arbre pondéré.",
        figure: arbre(NOMS_ARBRE, shown),
        mode: "nombre", prefixe: "? =", attendu: P[k],
        aides: ["La somme des probabilités des branches qui partent d'un même nœud vaut $1$.", `Repère l'autre branche qui part du même nœud.`, `$1 - ${dec2(P[paire])}$.`],
        solution: `Les deux branches qui partent du même nœud ont pour somme $1$ : $${nomsB} = 1 - ${dec2(P[paire])} = ${dec2(P[k])}$.`
      };
    }
    const chemin = rand(0, 3), probas = [P[0] * P[2], P[0] * P[3], P[1] * P[4], P[1] * P[5]], ev = ["A \\cap B", "A \\cap \\overline{B}", "\\overline{A} \\cap B", "\\overline{A} \\cap \\overline{B}"][chemin];
    const facteurs = [[P[0], P[2]], [P[0], P[3]], [P[1], P[4]], [P[1], P[5]]][chemin];
    return {
      enonce: `D'après l'arbre pondéré, calcule $P(${ev})$.`,
      figure: arbre(NOMS_ARBRE, lab),
      mode: "nombre", prefixe: "Probabilité :", attendu: +probas[chemin].toFixed(4),
      erreurs: [{ valeur: facteurs[0] + facteurs[1], message: "Le long d'un chemin, on **multiplie** les probabilités (on n'additionne pas)." }],
      aides: [`Repère le chemin qui mène à $${ev}$.`, "On multiplie les probabilités rencontrées le long du chemin.", `$${dec2(facteurs[0])} \\times ${dec2(facteurs[1])}$.`],
      solution: `$P(${ev}) = ${dec2(facteurs[0])} \\times ${dec2(facteurs[1])} = ${dec2(probas[chemin])}$.`
    };
  };

  GEN["pc-traduire"] = function () {
    const T = [
      ["la probabilité qu'une personne ait un test positif **sachant** qu'elle est malade", "P_M(T)", ["P_T(M)", "P(M \\cap T)", "P(T)"]],
      ["la probabilité qu'une personne soit malade **sachant** que son test est positif", "P_T(M)", ["P_M(T)", "P(M \\cap T)", "P(M)"]],
      ["la probabilité qu'une personne soit malade **et** ait un test positif", "P(M \\cap T)", ["P_M(T)", "P_T(M)", "P(M) + P(T)"]],
      ["la probabilité qu'une personne saine ait un test négatif (la **spécificité**)", "P_{\\overline{M}}(\\overline{T})", ["P_{\\overline{T}}(\\overline{M})", "P(\\overline{M} \\cap \\overline{T})", "P_M(\\overline{T})"]],
      ["la probabilité qu'une personne saine ait un test positif (un **faux positif**)", "P_{\\overline{M}}(T)", ["P_T(\\overline{M})", "P_M(\\overline{T})", "P(\\overline{M})"]]
    ];
    const [txt, bonne, faux] = pick(T);
    const ch = melangeChoix(`$${bonne}$`, faux.map((f) => `$${f}$`));
    return {
      enonce: `Test de dépistage au dispensaire. $M$ : « la personne est malade », $T$ : « le test est positif ». Comment note-t-on ${txt} ?`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["« Sachant que … » : ce qui est connu va en **indice**.", "« … et … » : c'est une intersection $\\cap$.", "Malade : $M$ ; sain : $\\overline{M}$ ; test positif : $T$ ; test négatif : $\\overline{T}$."],
      solution: `C'est $${bonne}$. Attention : $P_M(T)$ et $P_T(M)$ sont des probabilités **différentes**.`
    };
  };

  GEN["pc-depistage"] = function () {
    const prev = pick([0.01, 0.02, 0.05, 0.1]), se = pick([0.9, 0.95, 0.99]), sp = pick([0.9, 0.95, 0.98]);
    const N = 10000, M = Math.round(N * prev), S = N - M, VP = Math.round(M * se), FP = Math.round(S * (1 - sp)), Tpos = VP + FP;
    const q = rand(0, 2);
    const ctx = `Un test de dépistage est utilisé au dispensaire. $${nb(prev * 100)}\\,\\%$ de la population est malade. Si la personne est malade, le test est positif dans $${nb(se * 100)}\\,\\%$ des cas (sensibilité) ; si elle est saine, il est négatif dans $${nb(sp * 100)}\\,\\%$ des cas (spécificité). On imagine $10\\,000$ personnes.`;
    if (q === 0) return {
      enonce: `${ctx} Combien de **faux positifs** (personnes saines avec un test positif) ?`,
      mode: "nombre", prefixe: "Faux positifs :", attendu: FP,
      aides: [`Malades : $${nb(M)}$ ; saines : $${nb(S)}$.`, `Une personne saine a un test positif avec la probabilité $1 - ${dec2(sp)} = ${dec2(1 - sp)}$.`, `Calcule $${nb(S)} \\times ${dec2(1 - sp)}$.`],
      solution: `Saines : $10\\,000 - ${nb(M)} = ${nb(S)}$. Faux positifs : $${nb(S)} \\times ${dec2(1 - sp)} = ${nb(FP)}$.`
    };
    const rep = +(VP / Tpos).toFixed(2);
    if (q === 1) return {
      enonce: `${ctx} Une personne a un test **positif**. Quelle est la probabilité qu'elle soit malade, $P_T(M)$ ? (Arrondis au centième.)`,
      mode: "nombre", prefixe: "$P_T(M) \\approx$", attendu: rep, tolerance: 0.006,
      erreurs: [{ valeur: se, message: "Ça, c'est $P_M(T)$ (la sensibilité). On demande $P_T(M)$ : on inverse le conditionnement." }],
      aides: [`Dresse le tableau : malades positifs $${nb(M)} \\times ${dec2(se)} = ${nb(VP)}$ ; sains positifs $${nb(S)} \\times ${dec2(1 - sp)} = ${nb(FP)}$.`, `Nombre total de tests positifs : $${nb(VP)} + ${nb(FP)} = ${nb(Tpos)}$.`, `$P_T(M) = \\dfrac{${nb(VP)}}{${nb(Tpos)}}$.`],
      solution: `Parmi les $${nb(Tpos)}$ tests positifs, $${nb(VP)}$ concernent des malades : $P_T(M) = \\dfrac{${nb(VP)}}{${nb(Tpos)}} \\approx ${dec2(rep)}$.\n\n${rep < 0.5 ? "Moins d'une chance sur deux, alors que le test est « fiable » : c'est parce que la maladie est rare, et les faux positifs nombreux." : "On inverse le conditionnement : $P_T(M)$ est bien différent de $P_M(T)$."}`
    };
    return {
      enonce: `${ctx} Combien de personnes ont un test **positif** au total ?`,
      mode: "nombre", prefixe: "Tests positifs :", attendu: Tpos,
      erreurs: [{ valeur: VP, message: "N'oublie pas les faux positifs : des personnes saines peuvent aussi avoir un test positif." }],
      aides: [`Malades positifs : $${nb(M)} \\times ${dec2(se)}$.`, `Sains positifs : $${nb(S)} \\times ${dec2(1 - sp)}$.`, "Additionne."],
      solution: `$${nb(M)} \\times ${dec2(se)} + ${nb(S)} \\times ${dec2(1 - sp)} = ${nb(VP)} + ${nb(FP)} = ${nb(Tpos)}$ tests positifs.`,

    };
  };

  GEN["pc-python"] = function () {
    const p1 = pick([0.2, 0.3, 0.4, 0.5, 0.6]), p2 = pick([0.1, 0.25, 0.5, 0.7, 0.8]);
    const t = rand(0, 1);
    const prog = "```python\nfrom random import random\n\ndef experience():\n    a = random() < " + p1 + "\n    b = random() < " + p2 + "\n    return a and " + (t ? "not b" : "b") + "\n```";
    const r = +(p1 * (t ? 1 - p2 : p2)).toFixed(4);
    return {
      enonce: `$\\texttt{random()}$ renvoie un nombre au hasard dans $[0\\,;1[$ : $\\texttt{random() < p}$ est vrai avec la probabilité $p$. On considère :\n\n${prog}\n\nOn répète l'expérience un grand nombre de fois. Vers quelle valeur la fréquence de $\\texttt{True}$ se rapproche-t-elle ?`,
      mode: "nombre", prefixe: "Probabilité :", attendu: r,
      aides: [`$\\texttt{a}$ est vrai avec la probabilité $${dec2(p1)}$, $\\texttt{b}$ avec la probabilité $${dec2(p2)}$, indépendamment.`, `La fonction renvoie vrai quand $\\texttt{a}$ est vrai **et** $\\texttt{b}$ est ${t ? "faux" : "vrai"}.`, "Sur l'arbre, on multiplie le long du chemin."],
      solution: `$P = ${dec2(p1)} \\times ${dec2(t ? 1 - p2 : p2)} = ${dec2(r)}$. D'après la loi des grands nombres, la fréquence observée se rapproche de $${dec2(r)}$.`
    };
  };


  /* ---------- Seconde, chapitre 16 : statistiques 2 et échantillonnage (préfixe ec-) ---------- */
  // Figures du cours du chapitre 16 : 40 tortues, classes [60 ; 70[ … [100 ; 110[
  const TORTUES = [4, 10, 14, 8, 4];
  FIGURES["histogramme-tortues"] = () => graph({ xmin: 55, xmax: 115, ymin: -1, ymax: 16, xstep: 5, ystep: 1, xetiq: 10, yetiq: 2, h: 230, padL: 24, padB: 22, rects: TORTUES.map((e, k) => ({ a: 60 + 10 * k, b: 70 + 10 * k, h: e })), xlabel: "kg", aria: "Histogramme des masses de 40 tortues" });
  FIGURES["polygone-tortues"] = () => {
    const P = [[60, 0], [70, 10], [80, 35], [90, 70], [100, 90], [110, 100]];
    const f = (x) => { for (let i = 1; i < P.length; i++) if (x <= P[i][0]) return P[i - 1][1] + ((x - P[i - 1][0]) / (P[i][0] - P[i - 1][0])) * (P[i][1] - P[i - 1][1]); return 100; };
    return graph({ xmin: 55, xmax: 115, ymin: -5, ymax: 105, xstep: 5, ystep: 10, xetiq: 10, yetiq: 20, h: 240, padL: 28, padB: 22, curves: [{ f, a: 60, b: 110, closed: false }], hlines: [{ y: 50, label: "50 %" }], points: P.map(([x, y]) => ({ x, y })), xlabel: "kg", aria: "Polygone des fréquences cumulées croissantes" });
  };

  // Série regroupée en classes de même amplitude : masses de tortues vertes (kg)
  function serieClasses() {
    const a0 = pick([60, 80, 100]), amp = pick([10, 20]), k = rand(4, 5);
    const bornes = Array.from({ length: k + 1 }, (_, i) => a0 + i * amp);
    const eff = Array.from({ length: k }, (_, i) => rand(2, 12) + (i === 1 || i === 2 ? rand(4, 10) : 0));
    const N = eff.reduce((s, x) => s + x, 0);
    const cum = eff.reduce((t, x) => (t.push((t[t.length - 1] || 0) + x), t), []);
    const classes = bornes.slice(0, -1).map((b, i) => `[${b}\\,;${bornes[i + 1]}[`);
    const centres = bornes.slice(0, -1).map((b) => b + amp / 2);
    const tableau = { lignes: [["\\text{Masse (kg)}", ...classes], ["\\text{Effectif}", ...eff]] };
    return { a0, amp, k, bornes, eff, N, cum, classes, centres, tableau };
  }

  GEN["ec-moyenne"] = function () {
    const S = serieClasses(), m = S.centres.reduce((s, c, i) => s + c * S.eff[i], 0) / S.N, r = Math.round(m * 10) / 10;
    return {
      enonce: "Masses (en kg) de tortues vertes mesurées sur une plage de Mayotte, regroupées en classes. Estime la masse moyenne en utilisant le centre de chaque classe (arrondis au dixième).",
      tableau: S.tableau,
      mode: "nombre", prefixe: "Moyenne ≈", suffixe: "kg", attendu: r, tolerance: 0.051,
      aides: [`Le centre de la classe $[a\\,;b[$ est $\\dfrac{a + b}{2}$ : ici $${S.centres.join("\\,;\\,")}$.`, "Moyenne pondérée : $\\dfrac{\\text{somme des (centre} \\times \\text{effectif)}}{\\text{effectif total}}$.", `Effectif total : $${S.N}$.`],
      solution: `$\\bar{x} \\approx \\dfrac{${S.centres.map((c, i) => `${c} \\times ${S.eff[i]}`).join(" + ")}}{${S.N}} = \\dfrac{${S.centres.reduce((s, c, i) => s + c * S.eff[i], 0)}}{${S.N}} \\approx ${nb(r)}$ kg.\n\nC'est une **estimation** : on suppose que toutes les tortues d'une classe ont la masse du centre.`
    };
  };

  GEN["ec-cumul"] = function () {
    const S = serieClasses(), i = rand(0, S.k - 2), freq = Math.random() < 0.4;
    return {
      enonce: `Masses (en kg) de tortues vertes regroupées en classes. ${freq ? `Quelle est la **fréquence cumulée croissante** (en %, arrondie à l'unité) des tortues de moins de $${S.bornes[i + 1]}$ kg ?` : `Combien de tortues pèsent moins de $${S.bornes[i + 1]}$ kg (effectif cumulé croissant) ?`}`,
      tableau: S.tableau,
      mode: "nombre", prefixe: freq ? "Fréquence (%) :" : "Effectif cumulé :", attendu: freq ? Math.round((S.cum[i] / S.N) * 100) : S.cum[i], tolerance: freq ? 0.51 : 1e-9,
      aides: ["L'effectif cumulé croissant d'une classe est la somme des effectifs de cette classe et de toutes celles d'avant.", `Additionne les effectifs des classes jusqu'à $[${S.bornes[i]}\\,;${S.bornes[i + 1]}[$.`, freq ? `Puis divise par l'effectif total $${S.N}$ et multiplie par $100$.` : "Moins de $" + S.bornes[i + 1] + "$ kg : toutes les classes à gauche de cette borne."],
      solution: `$${S.eff.slice(0, i + 1).join(" + ")} = ${S.cum[i]}$ tortues pèsent moins de $${S.bornes[i + 1]}$ kg.` + (freq ? ` Fréquence cumulée : $\\dfrac{${S.cum[i]}}{${S.N}} \\approx ${Math.round((S.cum[i] / S.N) * 100)}\\,\\%$.` : "")
    };
  };

  GEN["ec-classe-mediane"] = function () {
    const S = serieClasses(), j = S.cum.findIndex((c) => c >= S.N / 2);
    return {
      enonce: "Masses (en kg) de tortues vertes regroupées en classes. Quelle est la **classe médiane** ?",
      tableau: S.tableau,
      mode: "choix", choix: S.classes.map((c) => `$${c}$`), attendu: j,
      aides: [`Effectif total : $${S.N}$. La moitié : $${nb(S.N / 2)}$.`, `Effectifs cumulés croissants : $${S.cum.join("\\,;\\,")}$.`, `La classe médiane est la première dont l'effectif cumulé atteint $${nb(S.N / 2)}$.`],
      solution: `Effectifs cumulés : $${S.cum.join("\\,;\\,")}$. On atteint $\\dfrac{${S.N}}{2} = ${nb(S.N / 2)}$ dans la classe $${S.classes[j]}$ : c'est la classe médiane.`
    };
  };

  GEN["ec-mediane"] = function () {
    const S = serieClasses(), j = S.cum.findIndex((c) => c >= S.N / 2), avant = j ? S.cum[j - 1] : 0;
    const med = S.bornes[j] + ((S.N / 2 - avant) / S.eff[j]) * S.amp, r = Math.round(med * 10) / 10;
    return {
      enonce: "Masses (en kg) de tortues vertes regroupées en classes. On suppose que les tortues d'une classe sont réparties **uniformément**. Estime la médiane (arrondie au dixième).",
      tableau: S.tableau,
      mode: "nombre", prefixe: "Médiane ≈", suffixe: "kg", attendu: r, tolerance: 0.051,
      aides: [`Classe médiane : $${S.classes[j]}$ (effectifs cumulés $${S.cum.join("\\,;\\,")}$).`, `Avant cette classe : $${avant}$ tortues. Il en manque $${nb(S.N / 2)} - ${avant} = ${nb(S.N / 2 - avant)}$ pour arriver à la moitié.`, `Ces $${nb(S.N / 2 - avant)}$ tortues occupent la fraction $\\dfrac{${nb(S.N / 2 - avant)}}{${S.eff[j]}}$ de la classe, d'amplitude $${S.amp}$.`],
      solution: `$Me \\approx ${S.bornes[j]} + \\dfrac{${nb(S.N / 2 - avant)}}{${S.eff[j]}} \\times ${S.amp} \\approx ${nb(r)}$ kg.\n\nC'est ce qu'on lit sur le polygone des fréquences cumulées croissantes, à l'ordonnée $50\\,\\%$.`
    };
  };

  GEN["ec-histogramme"] = function () {
    const S = serieClasses(), i = rand(0, S.k - 1), maxE = Math.max(...S.eff);
    return {
      enonce: `L'histogramme représente les masses (en kg) de tortues vertes ; les classes ont toutes la même amplitude, la hauteur des rectangles est l'effectif. Combien de tortues ont une masse dans $${S.classes[i]}$ ?`,
      figure: graph({ xmin: S.a0 - S.amp / 2, xmax: S.bornes[S.k] + S.amp / 2, ymin: -1, ymax: maxE + 3, xstep: S.amp / 2, ystep: 1, xetiq: S.amp, yetiq: maxE > 15 ? 4 : 2, h: 240, padL: 24, padB: 22, rects: S.eff.map((e, k) => ({ a: S.bornes[k], b: S.bornes[k + 1], h: e })), aria: "Histogramme des masses" }),
      mode: "nombre", prefixe: "Effectif :", attendu: S.eff[i],
      aides: [`Repère le rectangle entre $${S.bornes[i]}$ et $${S.bornes[i + 1]}$ sur l'axe horizontal.`, "Lis sa hauteur sur l'axe vertical.", "Toutes les classes ont la même amplitude : la hauteur est directement l'effectif."],
      solution: `Le rectangle au-dessus de $${S.classes[i]}$ monte jusqu'à $${S.eff[i]}$ : $${S.eff[i]}$ tortues.`
    };
  };

  GEN["ec-lgn"] = function () {
    const T = [
      { q: "On lance $10$ fois une pièce équilibrée et on obtient $7$ fois « pile ». Que peut-on dire ?", b: "Rien d'anormal : sur $10$ lancers, la fréquence fluctue beaucoup", f: ["La pièce est truquée", "La probabilité de « pile » est $0{,}7$", "Au prochain lancer, on aura sûrement « face »"], s: "Sur un petit échantillon, la fréquence observée **fluctue** : $7$ « pile » sur $10$ arrive assez souvent. Seule une très longue série permettrait de douter. Et la pièce n'a pas de mémoire." },
      { q: "On lance un dé équilibré un très grand nombre de fois. Vers quoi se rapproche la fréquence d'apparition du $6$ ?", b: "$\\dfrac{1}{6}$", f: ["$6$", "$0{,}6$", "Elle ne se stabilise pas"], s: "**Loi des grands nombres** : quand on répète une expérience un grand nombre de fois, la fréquence observée se rapproche de la probabilité, ici $\\dfrac{1}{6} \\approx 0{,}167$." },
      { q: "Deux élèves simulent $100$ lancers d'une pièce équilibrée. L'un obtient $46$ « pile », l'autre $55$. Pourquoi ?", b: "C'est la fluctuation d'échantillonnage", f: ["L'un des deux s'est trompé", "La pièce change de probabilité", "Il fallait obtenir exactement $50$"], s: "Deux échantillons de même taille ne donnent pas la même fréquence : c'est la **fluctuation d'échantillonnage**. Plus l'échantillon est grand, plus elle est faible." },
      { q: "Sur $10\\,000$ naissances à Mayotte, on observe une fréquence de garçons de $0{,}51$. Que peut-on dire ?", b: "$0{,}51$ est une estimation de la probabilité qu'un bébé soit un garçon", f: ["La probabilité est exactement $0{,}5$", "La probabilité est exactement $0{,}51$", "Une naissance sur deux est forcément un garçon"], s: "Un modèle probabiliste ne décrit pas exactement la réalité : sur un grand échantillon, la fréquence observée **estime** la probabilité, sans l'égaler forcément." }
    ];
    const t = pick(T), ch = melangeChoix(t.b, t.f);
    return {
      enonce: t.q, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Sur un petit nombre d'expériences, la fréquence observée varie beaucoup.", "Sur un très grand nombre d'expériences, elle se rapproche de la probabilité (loi des grands nombres).", "Un modèle (une probabilité) et une observation (une fréquence) sont deux choses différentes."],
      solution: t.s
    };
  };

  GEN["ec-python"] = function () {
    const t = rand(0, 2);
    const P = [
      ["from random import randint\n\ndef experience():\n    return randint(1, 6) == 6", "1/6", 1 / 6, "$\\texttt{randint(1, 6)}$ donne un entier au hasard de $1$ à $6$ : la probabilité d'obtenir $6$ est $\\dfrac{1}{6}$."],
      ["from random import randint\n\ndef experience():\n    return randint(1, 6) % 2 == 0", "1/2", 1 / 2, "Le résultat est pair ($2$, $4$ ou $6$) avec la probabilité $\\dfrac{3}{6} = \\dfrac{1}{2}$."],
      ["from random import randint\n\ndef experience():\n    return randint(1, 6) + randint(1, 6) == 7", "1/6", 1 / 6, "Avec deux dés, $36$ couples équiprobables, dont $6$ de somme $7$ : $\\dfrac{6}{36} = \\dfrac{1}{6}$."]
    ][t];
    return {
      enonce: "On considère le programme :\n\n```python\n" + P[0] + "\n\ndef frequence(n):\n    c = 0\n    for i in range(n):\n        if experience():\n            c = c + 1\n    return c / n\n```\n\nPour $n$ très grand, vers quelle valeur $\\texttt{frequence(n)}$ se rapproche-t-elle ? (Fraction ou décimal à $0{,}01$ près.)",
      mode: "nombre", prefixe: "Valeur :", attendu: P[2], tolerance: 0.006,
      aides: ["$\\texttt{frequence(n)}$ répète $n$ fois l'expérience et renvoie la fréquence des succès.", "D'après la loi des grands nombres, cette fréquence se rapproche de la probabilité de succès.", "Calcule la probabilité que $\\texttt{experience()}$ renvoie $\\texttt{True}$."],
      solution: `${P[3]}\n\nPour $n$ grand, $\\texttt{frequence(n)}$ se rapproche de $\\dfrac{${P[1].split("/").join("}{")}} \\approx ${nb(+P[2].toFixed(3))}$.`
    };
  };


  /* ---------- Seconde, chapitre 17 : problèmes de synthèse (préfixe sy-) ---------- */
  GEN["sy-boite"] = function () {
    const c = pick([12, 18, 24, 30, 36]), xs = c / 6, t = rand(0, 1);
    const V = (x) => x * (c - 2 * x) ** 2;
    if (t === 0) {
      const x = rand(1, c / 2 - 1);
      return {
        figure: patron(c),
        enonce: `Dans une plaque de carton carrée de $${c}$ cm de côté, on découpe un carré de côté $x$ cm à chaque coin, puis on replie les bords pour faire une boîte sans couvercle. Calcule le volume (en cm³) pour $x = ${x}$.`,
        mode: "nombre", prefixe: "V =", suffixe: "cm³", attendu: V(x),
        aides: [`Le fond de la boîte est un carré de côté $${c} - 2x$ (on enlève $x$ de chaque côté).`, `La hauteur de la boîte est $x$. Donc $V(x) = x(${c} - 2x)^2$.`, `Pour $x = ${x}$ : fond de côté $${c - 2 * x}$ cm.`],
        solution: `$V(${x}) = ${x} \\times (${c} - 2 \\times ${x})^2 = ${x} \\times ${c - 2 * x}^2 = ${x} \\times ${(c - 2 * x) ** 2} = ${V(x)}$ cm³.`
      };
    }
    const vals = Array.from({ length: c / 2 - 1 }, (_, i) => i + 1);
    return {
      figure: patron(c),
      enonce: `Dans une plaque de carton carrée de $${c}$ cm de côté, on découpe un carré de côté $x$ cm à chaque coin pour faire une boîte sans couvercle, de volume $V(x) = x(${c} - 2x)^2$. Pour quelle valeur **entière** de $x$ le volume est-il maximal ?`,
      mode: "nombre", prefixe: "x =", suffixe: "cm", attendu: xs,
      erreurs: [{ valeur: c / 4, message: `$V(${c / 4}) = ${nb(V(c / 4))}$ : ce n'est pas le maximum, compare avec les valeurs voisines.` }],
      aides: [`$x$ est compris entre $0$ et $${c / 2}$.`, "Fais un tableau de valeurs de $V(x)$ pour $x = 1, 2, 3$… (calculatrice ou Python).", `Compare : $V(${xs - 1}) = ${V(xs - 1)}$, $V(${xs}) = ${V(xs)}$, $V(${xs + 1}) = ${V(xs + 1)}$.`],
      solution: `Tableau de valeurs : ${vals.slice(0, Math.min(vals.length, 8)).map((x) => `$V(${x}) = ${V(x)}$`).join(" ; ")}${vals.length > 8 ? "…" : ""}\n\nLe volume est maximal pour $x = ${xs}$ cm : $V(${xs}) = ${V(xs)}$ cm³.`
    };
  };

  GEN["sy-triangle"] = function () {
    // Triangle rectangle (ou non) en un sommet, coordonnées entières
    const O = [rand(-4, 2), rand(-4, 2)], rect = Math.random() < 0.7;
    let u, v;
    do { u = [randNZ(-4, 4), randNZ(-4, 4)]; const k = pick([1, 2]); v = rect ? [-u[1] * k, u[0] * k] : [-u[1] * k + randNZ(-2, 2), u[0] * k]; } while (det(u, v) === 0);
    const [A, B, C] = shuffle([O, [O[0] + u[0], O[1] + u[1]], [O[0] + v[0], O[1] + v[1]]]);
    const d2 = (P, Q) => (P[0] - Q[0]) ** 2 + (P[1] - Q[1]) ** 2;
    const AB = d2(A, B), AC = d2(A, C), BC = d2(B, C);
    const sommet = AB + AC === BC ? 0 : AB + BC === AC ? 1 : AC + BC === AB ? 2 : 3;
    return {
      enonce: `Dans un repère orthonormé : $A(${A[0]}\\,;${A[1]})$, $B(${B[0]}\\,;${B[1]})$, $C(${C[0]}\\,;${C[1]})$. Le triangle $ABC$ est-il rectangle ?`,
      mode: "choix", choix: ["Oui, rectangle en $A$", "Oui, rectangle en $B$", "Oui, rectangle en $C$", "Non"], attendu: sommet,
      aides: ["Calcule les carrés des longueurs : $AB^2 = (x_B - x_A)^2 + (y_B - y_A)^2$, etc.", `$AB^2 = ${AB}$, $AC^2 = ${AC}$, $BC^2 = ${BC}$.`, "Réciproque de Pythagore : le triangle est rectangle si le plus grand carré est égal à la somme des deux autres."],
      solution: `$AB^2 = ${AB}$, $AC^2 = ${AC}$, $BC^2 = ${BC}$.\n\n` + (sommet < 3 ? `$${["AB^2 + AC^2", "AB^2 + BC^2", "AC^2 + BC^2"][sommet]} = ${[AB + AC, AB + BC, AC + BC][sommet]} = ${["BC", "AC", "AB"][sommet]}^2$ : d'après la réciproque du théorème de Pythagore, le triangle est rectangle en $${"ABC"[sommet]}$.` : `Le plus grand carré n'est pas la somme des deux autres : le triangle n'est **pas** rectangle.`)
    };
  };

  GEN["sy-suite"] = function () {
    const t = rand(0, 2), n = rand(3, 12);
    const F = [
      () => { const a = randNZ(-5, 6), b = rand(-9, 9); return [`u(n) = ${poly([a, b], "n")}`, a * n + b, `$u(${n}) = ${a} \\times ${n} ${sg(b)} = ${a * n + b}$.`]; },
      () => { const b = rand(-9, 9); return [`u(n) = n^2 ${sg(b)}`.replace(" + 0", "").replace(" - 0", ""), n * n + b, `$u(${n}) = ${n}^2 ${sg(b)} = ${n * n + b}$.`]; },
      () => { const q = pick([2, 3]); return [`u(n) = ${q}^n`, q ** n, `$u(${n}) = ${q}^{${n}} = ${q ** n}$.`]; }
    ];
    const [def, v, sol] = F[t]();
    return {
      enonce: `On définit, pour tout entier naturel $n$, $${def}$. Calcule $u(${n})$.`,
      mode: "nombre", prefixe: `u(${n}) =`, attendu: v,
      aides: ["$u$ est une fonction définie sur $\\mathbb{N}$ : on ne la calcule que pour des entiers.", `Remplace $n$ par $${n}$.`, "Respecte les priorités : la puissance d'abord."],
      solution: sol + " Ces fonctions définies sur $\\mathbb{N}$ s'appellent des **suites** : on les étudiera en Première."
    };
  };

  GEN["sy-raisonnement"] = function () {
    const T = [
      ["Pour montrer que « tout nombre premier est impair » est faux, on cite $2$.", "Un contre-exemple"],
      ["On suppose que $\\sqrt{2} = \\dfrac{p}{q}$ irréductible, et on aboutit à une contradiction.", "Un raisonnement par l'absurde"],
      ["Pour montrer que $n(n + 1)$ est pair, on traite le cas $n$ pair puis le cas $n$ impair.", "Une disjonction des cas"],
      ["Pour montrer que deux vecteurs ne sont pas colinéaires, on montre que leur déterminant n'est pas nul.", "La contraposée d'une implication"],
      ["On résout $3x + 1 = 7 \\iff 3x = 6 \\iff x = 2$.", "Une suite d'équivalences"],
      ["Pour montrer que la somme de deux multiples de $3$ est un multiple de $3$, on écrit $3k_1 + 3k_2 = 3(k_1 + k_2)$.", "Une démonstration directe dans le cas général"]
    ];
    const noms = T.map((t) => t[1]), i = rand(0, T.length - 1);
    const ch = melangeChoix(noms[i], shuffle(noms.filter((_, k) => k !== i)).slice(0, 3));
    return {
      enonce: `Quel type de raisonnement est utilisé ? ${T[i][0]}`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Contre-exemple : un seul cas suffit pour montrer qu'une affirmation générale est fausse.", "Absurde : on suppose le contraire et on trouve une contradiction. Disjonction des cas : on sépare les cas possibles.", "Contraposée : « si non Q, alors non P » démontre « si P, alors Q »."],
      solution: `C'est **${noms[i].toLowerCase()}**.`
    };
  };

  GEN["sy-longueur"] = function () {
    const n = pick([1, 2, 4]), t = rand(0, 1);
    const f = t ? (x) => x * x : (x) => Math.sqrt(x), ftex = t ? "x**2" : "sqrt(x)";
    let L = 0; for (let i = 0; i < n; i++) { const a = i / n, b = (i + 1) / n; L += Math.hypot(b - a, f(b) - f(a)); }
    const r = Math.round(L * 1000) / 1000;
    return {
      enonce: "On approche la longueur de la courbe de $f$ sur $[0\\,;1]$ par une ligne brisée de $n$ segments :\n\n```python\nfrom math import sqrt\n\ndef f(x):\n    return " + ftex + "\n\ndef longueur(n):\n    L = 0\n    for i in range(n):\n        a, b = i / n, (i + 1) / n\n        L = L + sqrt((b - a)**2 + (f(b) - f(a))**2)\n    return L\n```\n\n" + `Que renvoie $\\texttt{longueur(${n})}$ ? (Arrondis au millième.)`,
      mode: "nombre", prefixe: "Longueur ≈", attendu: r, tolerance: 0.0011,
      aides: [`On découpe $[0\\,;1]$ en $${n}$ morceaux de largeur $${nb(1 / n)}$.`, "Chaque segment relie $(a\\,;f(a))$ et $(b\\,;f(b))$ ; sa longueur se calcule avec la formule de la distance (chapitre 7).", n === 1 ? "Un seul segment, de $(0\\,;0)$ à $(1\\,;1)$." : "Additionne les longueurs des segments."],
      solution: (n === 1 ? "Un seul segment de $(0\\,;0)$ à $(1\\,;1)$ : $\\sqrt{1^2 + 1^2} = \\sqrt{2}$" : `Somme des longueurs des $${n}$ segments`) + ` $\\approx ${nb(r)}$.\n\nPlus $n$ est grand, plus la ligne brisée « colle » à la courbe et plus l'approximation est bonne.`
    };
  };


  /* ---------- Schémas des cours de Seconde (chapitres 4 à 17) ---------- */
  // Tableau de signes. xs : valeurs de la 1re ligne (textes, ±∞ compris) ;
  // lignes : [{ nom, cases }] avec cases = [signe, marque, signe, marque, …, signe] (marque : "0", "||" ou "")
  function tabsigne(xs, lignes) {
    const W = 320, g = 78, hR = 30, H = hR * (lignes.length + 1) + 2, n = xs.length;
    const X = (k) => g + 16 + (k * (W - g - 32)) / (n - 1);
    let s = `<svg class="graph tabvar" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tableau de signes">`;
    s += `<g class="g-axis"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="none" stroke-width="1.2" style="stroke:var(--doux)"/><line x1="${g}" y1="1" x2="${g}" y2="${H - 1}"/>`;
    for (let r = 1; r <= lignes.length; r++) s += `<line x1="1" y1="${r * hR}" x2="${W - 1}" y2="${r * hR}"/>`;
    s += `</g><text class="g-label" x="${g / 2}" y="20" text-anchor="middle">x</text>`;
    xs.forEach((x, k) => { s += `<text class="g-label" x="${X(k)}" y="20" text-anchor="middle">${x}</text>`; });
    lignes.forEach((l, r) => {
      const y0 = (r + 1) * hR, yc = y0 + 20, der = r === lignes.length - 1;
      s += `<text class="g-label" x="${g / 2}" y="${yc}" text-anchor="middle" ${der ? 'style="fill:var(--lagon)"' : ""}>${l.nom}</text>`;
      l.cases.forEach((c, i) => {
        if (i % 2 === 0) { const xm = (X(i / 2) + X(i / 2 + 1)) / 2; s += `<text class="g-clabel" x="${xm}" y="${yc + 1}" text-anchor="middle" style="fill:${c === "+" ? "var(--lagon)" : c === "?" ? "var(--ylang)" : "var(--faux)"}">${c === "-" ? "−" : c}</text>`; }
        else {
          const xv = X((i + 1) / 2);
          if (c === "||") s += `<line x1="${xv - 2}" y1="${y0}" x2="${xv - 2}" y2="${y0 + hR}" style="stroke:var(--encre);stroke-width:1.2"/><line x1="${xv + 2}" y1="${y0}" x2="${xv + 2}" y2="${y0 + hR}" style="stroke:var(--encre);stroke-width:1.2"/>`;
          else { s += `<line x1="${xv}" y1="${y0}" x2="${xv}" y2="${y0 + hR}" style="stroke:var(--trait);stroke-width:1;stroke-dasharray:3 3"/>`; if (c) s += `<text class="g-label" x="${xv}" y="${yc}" text-anchor="middle" style="paint-order:stroke;stroke:var(--surface);stroke-width:4px">${c}</text>`; }
        }
      });
    });
    return s + `</svg>`;
  }
  FIGURES["tabsigne-produit"] = () => tabsigne(["−∞", "−2", "3", "+∞"], [{ nom: "x + 2", cases: ["-", "0", "+", "", "+"] }, { nom: "3 − x", cases: ["+", "", "+", "0", "-"] }, { nom: "produit", cases: ["-", "0", "+", "0", "-"] }]);
  FIGURES["tabsigne-quotient"] = () => tabsigne(["−∞", "−4", "3", "+∞"], [{ nom: "x + 4", cases: ["-", "0", "+", "", "+"] }, { nom: "x − 3", cases: ["-", "", "-", "0", "+"] }, { nom: "quotient", cases: ["+", "0", "-", "||", "+"] }]);

  // Chapitre 4 : multiples de 15 et de 20 sur une droite graduée (deux barges)
  FIGURES["multiples-barges"] = () => {
    const W = 320, X = (v) => 16 + (v * (W - 32)) / 65;
    let s = `<svg class="graph" viewBox="0 0 ${W} 120" role="img" aria-label="Multiples de 15 et de 20 jusqu'à 60 : le premier multiple commun est 60">`;
    s += `<g class="g-axis"><line x1="${X(0)}" y1="60" x2="${X(65)}" y2="60"/></g><g class="g-tick">`;
    for (let v = 0; v <= 60; v += 5) s += `<line x1="${X(v)}" y1="56" x2="${X(v)}" y2="64" style="stroke:var(--doux)"/>`;
    for (let v = 0; v <= 60; v += 10) s += `<text x="${X(v)}" y="78" text-anchor="middle">${v}</text>`;
    s += `</g>`;
    [15, 30, 45, 60].forEach((v, i) => { s += `<path class="g-curve g-curve-0" d="M${X(v - 15)} 54 Q${(X(v - 15) + X(v)) / 2} 22 ${X(v)} 54"/>`; });
    [20, 40, 60].forEach((v) => { s += `<path class="g-curve g-curve-1" d="M${X(v - 20)} 66 Q${(X(v - 20) + X(v)) / 2} 104 ${X(v)} 66"/>`; });
    s += `<text class="g-clabel g-curve-0" x="${X(7.5)}" y="22" text-anchor="middle">+15</text><text class="g-clabel g-curve-1" x="${X(10)}" y="112" text-anchor="middle">+20</text>`;
    s += `<circle class="g-point" cx="${X(60)}" cy="60" r="5"/><text class="g-plabel" x="${X(60) + 8}" y="50">60</text>`;
    return s + `</svg>`;
  };

  // Chapitre 5 : (a + b)² découpé en a², ab, ab, b²
  FIGURES["identite-carre"] = () => {
    const o = 40, A = 150, B = 80, T = A + B;
    let s = `<svg class="graph" viewBox="0 0 320 ${T + 50}" role="img" aria-label="Carré de côté a + b découpé en un carré a², un carré b² et deux rectangles ab">`;
    const r = (x, y, w, h, cl, t) => { s += `<rect x="${o + x}" y="${10 + y}" width="${w}" height="${h}" style="fill:var(${cl});stroke:var(--doux);stroke-width:1.4"/><text class="g-clabel" x="${o + x + w / 2}" y="${10 + y + h / 2 + 5}" text-anchor="middle">${t}</text>`; };
    r(0, 0, A, A, "--lagon-pale", "a²"); r(A, 0, B, A, "--ylang-pale", "ab"); r(0, A, A, B, "--ylang-pale", "ab"); r(A, A, B, B, "--lagon-pale", "b²");
    s += `<text class="g-label" x="${o + A / 2}" y="${T + 30}" text-anchor="middle">a</text><text class="g-label" x="${o + A + B / 2}" y="${T + 30}" text-anchor="middle">b</text>`;
    s += `<text class="g-label" x="${o - 10}" y="${10 + A / 2}" text-anchor="end">a</text><text class="g-label" x="${o - 10}" y="${10 + A + B / 2}" text-anchor="end">b</text>`;
    return s + `</svg>`;
  };
  // Chapitre 5 : x² = 4 (deux solutions), x² = 0, x² = −2 (aucune)
  FIGURES["carre-niveaux"] = () => graph({ xmin: -3.4, xmax: 3.4, ymin: -3, ymax: 9.6, h: 300, curves: [{ f: (x) => x * x, a: -3, b: 3, closed: false }], hlines: [{ y: 4, label: "y = 4" }, { y: -2, label: "y = −2" }], points: [{ x: -2, y: 4, label: "−2", gauche: true }, { x: 2, y: 4, label: "2" }, { x: 0, y: 0 }], aria: "Parabole y = x² : la droite y = 4 la coupe en −2 et 2, la droite y = −2 ne la coupe pas" });

  // Chapitre 6 : taux d'accroissement et ordonnée à l'origine de y = 2x − 1
  FIGURES["droite-affine"] = () => graph({ xmin: -2.5, xmax: 4.5, ymin: -3.5, ymax: 6.5, curves: [{ f: (x) => 2 * x - 1, a: -1.2, b: 3.6, closed: false, label: "y = 2x − 1", lx: 3.4, dx: -8, dy: 2 }], fleches: [{ x1: 1, y1: 1, x2: 2, y2: 1, c: 1, label: "+1" }, { x1: 2, y1: 1, x2: 2, y2: 3, c: 1, label: "+2" }], points: [{ x: 0, y: -1, label: "p = −1" }], aria: "Droite y = 2x − 1 : quand x augmente de 1, y augmente de 2 ; elle coupe l'axe des ordonnées en −1" });
  FIGURES["signe-affine"] = () => graph({ xmin: -1.5, xmax: 6.5, ymin: -6.5, ymax: 8.5, h: 280, curves: [{ f: (x) => -2 * x + 6, a: -1, b: 6, closed: false, label: "y = −2x + 6", lx: 5.5, dx: -6, dy: -8 }], points: [{ x: 3, y: 0, label: "3" }], marques: [{ x: 1, y: -2.5, texte: "f(x) > 0" }, { x: 5, y: 2.5, texte: "f(x) < 0" }], aria: "La droite y = −2x + 6 est au-dessus de l'axe avant 3 et en dessous après 3" });
  FIGURES["taxis"] = () => graph({ xmin: -1, xmax: 21, ymin: -4, ymax: 62, xstep: 2, ystep: 10, xetiq: 4, yetiq: 20, h: 260, padL: 24, curves: [{ f: (x) => 2 * x + 10, a: 0, b: 20, closed: false, label: "A", lx: 20, dx: -2, dy: 14 }, { f: (x) => 2.5 * x + 4, a: 0, b: 20, closed: false, label: "B", lx: 20, dx: -2, dy: -6 }], points: [{ x: 12, y: 34, label: "(12 ; 34)", gauche: true }], xlabel: "km", ylabel: "€", aria: "Deux droites de tarifs qui se croisent pour 12 km : après 12 km, A est sous B" });

  // Chapitre 7 : vecteurs
  FIGURES["parallelogramme"] = () => graph({ xmin: -4.5, xmax: 3.5, ymin: -3.5, ymax: 3.5, fleches: [{ x1: -3, y1: -2, x2: 1, y2: -1, label: "AB" }, { x1: -2, y1: 1, x2: 2, y2: 2, label: "DC" }], points: [{ x: -3, y: -2, label: "A", gauche: true }, { x: 1, y: -1, label: "B" }, { x: 2, y: 2, label: "C" }, { x: -2, y: 1, label: "D", gauche: true }], aria: "Parallélogramme ABCD : les flèches AB et DC sont égales" });
  FIGURES["chasles"] = () => graph({ xmin: -4.5, xmax: 4.5, ymin: -3.5, ymax: 3.5, fleches: [{ x1: -3, y1: -2, x2: 1, y2: 2 }, { x1: 1, y1: 2, x2: 3, y2: -2 }, { x1: -3, y1: -2, x2: 3, y2: -2, c: 1 }], points: [{ x: -3, y: -2, label: "A", gauche: true }, { x: 1, y: 2, label: "B" }, { x: 3, y: -2, label: "C" }], aria: "Relation de Chasles : aller de A à B puis de B à C revient à aller de A à C" });
  FIGURES["coord-vecteur"] = () => graph({ xmin: -3.5, xmax: 4.5, ymin: -2.5, ymax: 3.5, fleches: [{ x1: -2, y1: -1, x2: 3, y2: -1, c: 1, label: "+5" }, { x1: 3, y1: -1, x2: 3, y2: 2, c: 1, label: "+3" }, { x1: -2, y1: -1, x2: 3, y2: 2, label: "u" }], points: [{ x: -2, y: -1, label: "A", gauche: true }, { x: 3, y: 2, label: "B" }], aria: "Le vecteur u de A vers B a pour coordonnées 5 et 3" });
  FIGURES["milieu-distance"] = () => graph({ xmin: -0.5, xmax: 8.5, ymin: -3.5, ymax: 7.5, curves: [{ f: (x) => (4 / 3) * x - 10 / 3, a: 1, b: 7, closed: false }], fleches: [{ x1: 1, y1: -2, x2: 7, y2: -2, c: 1, label: "6" }, { x1: 7, y1: -2, x2: 7, y2: 6, c: 1, label: "8" }], points: [{ x: 1, y: -2, label: "A", gauche: true }, { x: 7, y: 6, label: "B" }, { x: 4, y: 2, label: "I", gauche: true }], aria: "Segment AB avec son milieu I ; les écarts 6 et 8 forment un triangle rectangle d'hypoténuse AB = 10" });

  // Chapitre 10 : intersection et réunion
  FIGURES["venn"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 170" role="img" aria-label="Deux ensembles A et B qui se chevauchent : la partie commune est A ∩ B">`;
    s += `<defs><clipPath id="venn-a"><circle cx="125" cy="88" r="62"/></clipPath></defs>`;
    s += `<rect x="6" y="6" width="308" height="158" rx="10" style="fill:none;stroke:var(--doux);stroke-width:1.2"/><text class="g-label" x="20" y="26">Ω</text>`;
    s += `<circle cx="195" cy="88" r="62" clip-path="url(#venn-a)" style="fill:var(--ylang-pale)"/>`;
    s += `<circle cx="125" cy="88" r="62" style="fill:none;stroke:var(--lagon);stroke-width:2"/><circle cx="195" cy="88" r="62" style="fill:none;stroke:var(--courbe2);stroke-width:2"/>`;
    s += `<text class="g-clabel g-curve-0" x="88" y="92">A</text><text class="g-clabel g-curve-1" x="226" y="92">B</text><text class="g-label" x="160" y="92" text-anchor="middle">A ∩ B</text>`;
    return s + `</svg>`;
  };

  // Chapitre 11 : colinéarité
  FIGURES["colineaires"] = () => graph({ xmin: -4.5, xmax: 4.5, ymin: -3.5, ymax: 3.5, fleches: [{ x1: -3, y1: 2, x2: -1, y2: 3, label: "u" }, { x1: 3, y1: 1, x2: -1, y2: -1, label: "v" }, { x1: 0, y1: -3, x2: 2, y2: 0, c: 1, label: "w" }], aria: "u et v = −2u ont la même direction, w n'est pas colinéaire à u" });
  FIGURES["alignes"] = () => graph({ xmin: -0.5, xmax: 8.5, ymin: -0.5, ymax: 12.5, ystep: 2, yetiq: 2, h: 280, curves: [{ f: (x) => 1.5 * x + 0.5, a: 0, b: 7.6, closed: false }], points: [{ x: 1, y: 2, label: "A", gauche: true }, { x: 3, y: 5, label: "B", gauche: true }, { x: 7, y: 11, label: "C", gauche: true }], aria: "Les trois bouées A, B, C sont sur une même droite" });

  // Chapitre 12 : droites
  FIGURES["droite-directeur"] = () => graph({ xmin: -1.5, xmax: 5.5, ymin: -3.5, ymax: 3.5, curves: [{ f: (x) => (-1 - x) / 2, a: -1.4, b: 5.4, closed: false, label: "x + 2y + 1 = 0", lx: 5.2, dx: -2, dy: 16 }], fleches: [{ x1: 3, y1: -2, x2: 1, y2: -1, c: 1, label: "u" }], points: [{ x: 3, y: -2, label: "A" }], aria: "Droite passant par A(3 ; −2) dirigée par u(−2 ; 1)" });
  FIGURES["deux-droites"] = () => graph({ xmin: -0.5, xmax: 6.5, ymin: -3.5, ymax: 7.5, curves: [{ f: (x) => 2 * x - 3, a: 0, b: 5.2, closed: false, label: "d₁", lx: 5, dx: 2, dy: 2 }, { f: (x) => -x + 6, a: 0, b: 6.4, closed: false, label: "d₂", lx: 6.2, dx: 2, dy: -4 }], points: [{ x: 3, y: 3, label: "(3 ; 3)" }], aria: "Les droites y = 2x − 3 et y = −x + 6 se coupent au point (3 ; 3)" });

  // Chapitre 17 : patron de la boîte (carton de 30 cm, coins de côté x)
  const patron = (c) => {
    const o = 50, L = 220, x = 44;
    let s = `<svg class="graph" viewBox="0 0 320 ${L + 40}" role="img" aria-label="Plaque carrée dont on découpe un carré de côté x à chaque coin">`;
    s += `<rect x="${o}" y="10" width="${L}" height="${L}" style="fill:var(--lagon-pale);stroke:var(--lagon);stroke-width:1.6"/>`;
    [[0, 0], [L - x, 0], [0, L - x], [L - x, L - x]].forEach(([a, b]) => { s += `<rect x="${o + a}" y="${10 + b}" width="${x}" height="${x}" style="fill:var(--surface);stroke:var(--faux);stroke-width:1.4;stroke-dasharray:4 3"/>`; });
    s += `<rect x="${o + x}" y="${10 + x}" width="${L - 2 * x}" height="${L - 2 * x}" style="fill:none;stroke:var(--doux);stroke-width:1;stroke-dasharray:3 3"/>`;
    s += `<text class="g-label" x="${o + x / 2}" y="${10 + x / 2 + 4}" text-anchor="middle">x</text><text class="g-label" x="${o + L / 2}" y="${10 + L / 2 + 4}" text-anchor="middle">fond : ${c} − 2x</text>`;
    s += `<text class="g-label" x="${o + L / 2}" y="${L + 30}" text-anchor="middle">${c} cm</text>`;
    return s + `</svg>`;
  };
  FIGURES["boite-patron"] = () => patron(30);


  /* ---------- Première, chapitre 1 : suites, généralités (préfixe su-) ---------- */
  // Motifs : galets en triangle, en carré, allumettes en rangée de carrés. Renvoie le dessin des étapes 1 à 3.
  const MOTIFS = {
    triangle: { nom: "de galets rangés en triangle", u: (n) => (n * (n + 1)) / 2, rec: "u_{n+1} = u_n + (n + 1)", gen: "u_n = \\dfrac{n(n + 1)}{2}", expl: (n) => `$u_n = 1 + 2 + \\dots + ${n} = \\dfrac{${n} \\times ${n + 1}}{2}$` },
    carre: { nom: "de galets rangés en carré", u: (n) => n * n, rec: "u_{n+1} = u_n + 2n + 1", gen: "u_n = n^2", expl: (n) => `$u_n = n^2 = ${n}^2$` },
    allumettes: { nom: "d'allumettes formant une rangée de carrés", u: (n) => 3 * n + 1, rec: "u_{n+1} = u_n + 3", gen: "u_n = 3n + 1", expl: (n) => `$u_n = 3n + 1 = 3 \\times ${n} + 1$` }
  };
  function motifFig(cle) {
    const W = 320, H = 120;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="Étapes 1, 2 et 3 du motif">`;
    const ox = [14, 82, 180];
    [1, 2, 3].forEach((n, i) => {
      const x0 = ox[i];
      if (cle === "allumettes") {
        const c = 22, y0 = 40;
        for (let k = 0; k <= n; k++) s += `<line x1="${x0 + k * c}" y1="${y0}" x2="${x0 + k * c}" y2="${y0 + c}" style="stroke:var(--courbe2);stroke-width:3;stroke-linecap:round"/>`;
        for (let k = 0; k < n; k++) s += `<line x1="${x0 + k * c}" y1="${y0}" x2="${x0 + (k + 1) * c}" y2="${y0}" style="stroke:var(--courbe2);stroke-width:3;stroke-linecap:round"/><line x1="${x0 + k * c}" y1="${y0 + c}" x2="${x0 + (k + 1) * c}" y2="${y0 + c}" style="stroke:var(--courbe2);stroke-width:3;stroke-linecap:round"/>`;
      } else {
        const r = 6.5, d = 15;
        for (let ligne = 0; ligne < n; ligne++) {
          const nb = cle === "triangle" ? ligne + 1 : n;
          for (let k = 0; k < nb; k++) s += `<circle cx="${x0 + 10 + k * d + (cle === "triangle" ? (n - ligne - 1) * d / 2 : 0)}" cy="${86 - (n - 1 - ligne) * d}" r="${r}" style="fill:var(--lagon-pale);stroke:var(--lagon);stroke-width:1.4"/>`;
        }
      }
      s += `<text class="g-label" x="${x0 + 22}" y="${H - 6}" text-anchor="middle">étape ${n}</text>`;
    });
    return s + `</svg>`;
  }
  FIGURES["motif-galets"] = () => motifFig("triangle");
  FIGURES["motif-allumettes"] = () => motifFig("allumettes");

  GEN["su-motif"] = function () {
    const cle = pick(Object.keys(MOTIFS)), M = MOTIFS[cle], n = rand(5, 12);
    return {
      enonce: `On construit des motifs ${M.nom} (étapes $1$, $2$, $3$ ci-dessous). On note $u_n$ le nombre ${cle === "allumettes" ? "d'allumettes" : "de galets"} à l'étape $n$. Calcule $u_{${n}}$.`,
      figure: motifFig(cle),
      mode: "nombre", prefixe: `$u_{${n}} =$`, attendu: M.u(n),
      aides: [`Compte : $u_1 = ${M.u(1)}$, $u_2 = ${M.u(2)}$, $u_3 = ${M.u(3)}$.`, `Passage d'une étape à la suivante : $${M.rec}$.`, `Formule explicite : $${M.gen}$, ou continue de proche en proche.`],
      solution: `${M.expl(n).slice(0, -1)} = ${M.u(n)}$.\n\nRelation de récurrence : $${M.rec}$.`
    };
  };

  GEN["su-traduire"] = function () {
    const a = rand(2, 9) * 10, p = pick([2, 3, 4, 5, 8, 10]), T = [
      [`Chaque année, la commune gagne $${a}$ habitants.`, `u_{n+1} = u_n + ${a}`, [`u_{n+1} = ${a}u_n`, `u_n = u_{n+1} + ${a}`, `u_{n+1} = u_n \\times ${1 + a / 100}`]],
      [`Chaque année, la population augmente de $${p}\\,\\%$.`, `u_{n+1} = ${nb(1 + p / 100)}u_n`, [`u_{n+1} = u_n + ${p}`, `u_{n+1} = ${nb(p / 100)}u_n`, `u_{n+1} = u_n + ${nb(1 + p / 100)}`]],
      [`Chaque année, la population diminue de $${p}\\,\\%$, puis $${a}$ personnes s'installent.`, `u_{n+1} = ${nb(1 - p / 100)}u_n + ${a}`, [`u_{n+1} = ${nb(1 + p / 100)}u_n + ${a}`, `u_{n+1} = ${nb(1 - p / 100)}(u_n + ${a})`, `u_{n+1} = u_n - ${p} + ${a}`]]
    ];
    const [phr, bonne, faux] = pick(T);
    const ch = melangeChoix(`$${bonne}$`, faux.map((f) => `$${f}$`));
    return {
      enonce: `On note $u_n$ la population d'une commune de Mayotte $n$ années après 2026. ${phr} Quelle relation traduit cette phrase ?`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["$u_{n+1}$ est la population l'année suivante : exprime-la à partir de $u_n$.", "Ajouter une quantité fixe : $+$. Augmenter de $t\\,\\%$ : multiplier par $1 + \\dfrac{t}{100}$. Diminuer : multiplier par $1 - \\dfrac{t}{100}$.", "Respecte l'ordre des opérations décrit dans la phrase."],
      solution: `$${bonne}$.`
    };
  };

  GEN["su-variation"] = function () {
    const t = rand(0, 3);
    let enonce, rep, sol;
    if (t === 0) {
      const a = randNZ(-6, 6);
      enonce = `On sait que, pour tout entier $n$, $u_{n+1} - u_n = ${a < 0 ? `-n^2 ${sg(a)}` : `n^2 + ${a}`}$. Quel est le sens de variation de $(u_n)$ ?`;
      rep = a > 0 ? 0 : 1; if (a < 0) rep = 1;
      sol = a > 0 ? `$n^2 + ${a} > 0$ pour tout $n$ : $u_{n+1} > u_n$, la suite est **croissante**.` : `$-n^2 ${sg(a)} < 0$ pour tout $n$ : $u_{n+1} < u_n$, la suite est **décroissante**.`;
    } else if (t === 1) {
      const k = rand(2, 9);
      enonce = `$u_n = n^2 - ${2 * k}n$. On calcule $u_{n+1} - u_n = 2n + 1 - ${2 * k} = 2n - ${2 * k - 1}$. La suite est-elle croissante **à partir du rang $${k}$** ?`;
      rep = 0;
      sol = `Pour $n \\geqslant ${k}$, $2n - ${2 * k - 1} \\geqslant ${2 * k} - ${2 * k - 1} = 1 > 0$ : la suite est croissante à partir du rang $${k}$ (avant, elle décroît).`;
    } else if (t === 2) {
      const c = rand(2, 9);
      enonce = `$u_n = (-1)^n \\times ${c}$. Quel est le sens de variation de $(u_n)$ ?`;
      rep = 2;
      sol = `Les termes valent $${c}$, $-${c}$, $${c}$, $-${c}$… : ils montent puis descendent sans arrêt. La suite n'est **ni croissante ni décroissante**. Il suffit d'un contre-exemple : $u_1 < u_0$ mais $u_2 > u_1$.`;
    } else {
      const f = pick([["\\sqrt{n}", 0, "La fonction racine carrée est croissante sur $[0\\,;+\\infty[$"], ["\\dfrac{1}{n + 1}", 1, "La fonction $x \\mapsto \\dfrac{1}{x + 1}$ est décroissante sur $[0\\,;+\\infty[$"], ["5 - 3n", 1, "La fonction affine $x \\mapsto 5 - 3x$ est décroissante (coefficient $-3 < 0$)"], ["n^2 + 4", 0, "La fonction $x \\mapsto x^2 + 4$ est croissante sur $[0\\,;+\\infty[$"]]);
      enonce = `$u_n = ${f[0]}$ pour tout $n \\in \\mathbb{N}$. Quel est le sens de variation de $(u_n)$ ?`;
      rep = f[1];
      sol = `${f[2]}, donc la suite $(u_n)$, avec $u_n = f(n)$, a le même sens de variation : elle est **${rep ? "décroissante" : "croissante"}**.`;
    }
    return {
      enonce, mode: "choix", choix: t === 1 ? ["Oui", "Non"] : ["Croissante", "Décroissante", "Ni croissante ni décroissante"], attendu: rep,
      aides: ["$(u_n)$ est croissante si $u_{n+1} \\geqslant u_n$ pour tout $n$ : on étudie le signe de $u_{n+1} - u_n$.", "Si $u_n = f(n)$ et que $f$ est monotone sur $[0\\,;+\\infty[$, la suite a le même sens de variation que $f$.", "Pour montrer qu'une suite n'est pas monotone, un contre-exemple suffit."],
      solution: sol
    };
  };

  GEN["su-limite"] = function () {
    const T = [
      ["3 + \\dfrac{1}{n}", "elle se rapproche de $3$", "$\\dfrac{1}{n}$ devient aussi petit qu'on veut : $u_n$ se rapproche de $3$ (limite finie)."],
      ["n^2 + 1", "elle devient aussi grande qu'on veut", "$n^2$ dépasse n'importe quel nombre : la limite est $+\\infty$."],
      ["(-1)^n", "elle n'a pas de limite", "Les termes valent $1$, $-1$, $1$… : ils ne se rapprochent d'aucun nombre. Pas de limite."],
      ["5 - 2n", "elle devient négative et aussi grande qu'on veut en valeur absolue", "$-2n$ devient de plus en plus négatif : la limite est $-\\infty$."],
      ["2 - \\dfrac{3}{n + 1}", "elle se rapproche de $2$", "$\\dfrac{3}{n + 1}$ se rapproche de $0$ : $u_n$ se rapproche de $2$."],
      ["1000 \\times 0{,}5^n", "elle se rapproche de $0$", "$0{,}5^n$ est divisé par $2$ à chaque rang : il se rapproche de $0$, et $u_n$ aussi."]
    ];
    const [f, b, s] = pick(T), autres = ["elle se rapproche de $0$", "elle devient aussi grande qu'on veut", "elle n'a pas de limite", "elle se rapproche de $1$"].filter((x) => x !== b);
    const ch = melangeChoix(b, autres.slice(0, 3));
    return {
      enonce: `$u_n = ${f}$. Calcule quelques termes pour de grandes valeurs de $n$ ($10$, $100$, $1\\,000$) et conjecture le comportement de $(u_n)$ quand $n$ devient très grand.`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Calcule $u_{10}$, $u_{100}$ et $u_{1\\,000}$, à la calculatrice ou de tête.", "Regarde si les termes se stabilisent autour d'un nombre, grandissent sans fin, ou oscillent.", "En Première, on conjecture une limite : on ne la démontre pas encore."],
      solution: s
    };
  };

  GEN["su-liste"] = function () {
    const t = rand(0, 3);
    if (t === 0) {
      const a = rand(2, 5), b = rand(-3, 4), n = rand(4, 7), i = rand(0, n - 1);
      const L = Array.from({ length: n }, (_, k) => a * k + b);
      return {
        enonce: "En Python :\n\n```python\nL = [" + a + " * k " + (b < 0 ? "- " + -b : "+ " + b) + " for k in range(" + n + ")]\n```\n\n" + `Que vaut $\\texttt{L[${i}]}$ ? (Les indices commencent à $0$.)`,
        mode: "nombre", prefixe: "Réponse :", attendu: L[i],
        erreurs: i + 1 < n ? [{ valeur: L[i + 1], message: "Les indices commencent à $0$ : $\\texttt{L[0]}$ est le premier élément." }] : [],
        aides: ["Liste en compréhension : on calcule l'expression pour chaque $k$ de $\\texttt{range(" + n + ")}$, c'est-à-dire $0$, $1$, …, $" + (n - 1) + "$.", `$\\texttt{L[${i}]}$ correspond à $k = ${i}$.`, `Calcule $${a} \\times ${i} ${sg(b)}$.`],
        solution: `$\\texttt{L} = [${L.join(",\\ ")}]$. $\\texttt{L[${i}]} = ${a} \\times ${i} ${sg(b)} = ${L[i]}$.`
      };
    }
    if (t === 1) {
      const n = rand(6, 10), F = [1, 1]; while (F.length < n) F.push(F[F.length - 1] + F[F.length - 2]);
      return {
        enonce: "Suite de Fibonacci en Python :\n\n```python\nF = [1, 1]\nfor i in range(" + (n - 2) + "):\n    F.append(F[-1] + F[-2])\nprint(F[-1])\n```\n\nQu'affiche ce programme ?",
        mode: "nombre", prefixe: "Affichage :", attendu: F[n - 1],
        aides: ["$\\texttt{F.append(x)}$ ajoute $x$ à la fin de la liste ; $\\texttt{F[-1]}$ est le dernier élément, $\\texttt{F[-2]}$ l'avant-dernier.", "Chaque nouveau terme est la somme des deux précédents : $1, 1, 2, 3, 5…$", `La boucle ajoute $${n - 2}$ termes : la liste contient $${n}$ termes à la fin.`],
        solution: `$\\texttt{F} = [${F.join(",\\ ")}]$ : le programme affiche le dernier, $${F[n - 1]}$.`
      };
    }
    if (t === 2) {
      let u = pick([3, 6, 7, 9, 11, 12]); const S = [u]; while (u !== 1 && S.length < 30) { u = u % 2 ? 3 * u + 1 : u / 2; S.push(u); }
      return {
        enonce: "Suite de Syracuse : si $u$ est pair, on le divise par $2$ ; sinon, on le remplace par $3u + 1$.\n\n```python\nu = " + S[0] + "\nL = [u]\nwhile u != 1:\n    if u % 2 == 0:\n        u = u // 2\n    else:\n        u = 3 * u + 1\n    L.append(u)\nprint(len(L))\n```\n\nQu'affiche ce programme ?",
        mode: "nombre", prefixe: "Affichage :", attendu: S.length,
        aides: ["$\\texttt{len(L)}$ est le nombre d'éléments de la liste.", `Calcule la suite à partir de $${S[0]}$ jusqu'à arriver à $1$.`, `Les premiers termes : $${S.slice(0, 4).join(",\\ ")}$…`],
        solution: `$\\texttt{L} = [${S.join(",\\ ")}]$ : $${S.length}$ éléments. Le programme affiche $${S.length}$.`
      };
    }
    const u0 = rand(1, 5), a = rand(2, 3), n = rand(3, 5); const L = [u0]; for (let k = 0; k < n; k++) L.push(a * L[L.length - 1]);
    return {
      enonce: "En Python :\n\n```python\nL = [" + u0 + "]\nfor k in range(" + n + "):\n    L.append(" + a + " * L[k])\nprint(sum(L))\n```\n\nQu'affiche ce programme ?",
      mode: "nombre", prefixe: "Affichage :", attendu: L.reduce((s, x) => s + x, 0),
      aides: ["La liste se construit terme par terme : $\\texttt{L[k+1]} = " + a + " \\times \\texttt{L[k]}$.", `La boucle ajoute $${n}$ termes : la liste en contient $${n + 1}$.`, "$\\texttt{sum(L)}$ additionne tous les éléments."],
      solution: `$\\texttt{L} = [${L.join(",\\ ")}]$ et $\\texttt{sum(L)} = ${L.reduce((s, x) => s + x, 0)}$.`
    };
  };


  /* ---------- Première, chapitre 2 : second degré, forme factorisée (préfixe s2-) ---------- */
  const facteurX = (r) => (r === 0 ? "x" : `(x ${r > 0 ? "-" : "+"} ${Math.abs(r)})`);
  const coefTex = (a) => (a === 1 ? "" : a === -1 ? "-" : `${a}`);

  GEN["s2-statut"] = function () {
    const k = rand(2, 9), T = [
      [`(x + ${k})^2 = x^2 + ${2 * k}x + ${k * k}`, 0, "C'est une **identité** : l'égalité est vraie pour **tout** réel $x$ (identité remarquable). $x$ est une **variable**."],
      [`x^2 + ${2 * k}x + ${k * k} = 0`, 1, `C'est une **équation** : on cherche les valeurs de l'**inconnue** $x$ qui la rendent vraie. Ici $(x + ${k})^2 = 0$, seule solution $x = -${k}$.`],
      [`(x - ${k})(x + ${k}) = x^2 - ${k * k}`, 0, "C'est une **identité** : vraie pour tout réel $x$ (en développant, on retrouve le membre de droite)."],
      [`x(x - ${k}) = ${k}x`, 1, `C'est une **équation** : elle n'est vraie que pour certaines valeurs ($x = 0$ ou $x = ${2 * k}$).`],
      [`(x + ${k})^2 = x^2 + ${k * k}`, 2, `C'est **faux** en général : pour $x = 1$, on trouve $${(1 + k) ** 2}$ d'un côté et $${1 + k * k}$ de l'autre. Il manque le double produit $${2 * k}x$. Comme équation, elle n'a qu'une solution, $x = 0$.`]
    ];
    const [eg, rep, sol] = pick(T);
    return {
      enonce: `Quel est le statut de l'égalité $${eg}$ ?`,
      mode: "choix", choix: ["Une identité (vraie pour tout $x$)", "Une équation à résoudre", "Une identité fausse : elle n'est pas vraie pour tout $x$"], attendu: rep,
      aides: ["Une **identité** est vraie pour toutes les valeurs de la variable. Une **équation** n'est vraie que pour certaines valeurs de l'inconnue.", "Teste l'égalité avec $x = 0$ et $x = 1$.", "Développe le membre de gauche et compare avec celui de droite."],
      solution: sol
    };
  };

  GEN["s2-factoriser"] = function () {
    const t = rand(0, 3);
    let tex, bonne, faux, sol;
    if (t === 0) {
      // racine évidente 1 et produit des racines
      const a = pick([1, 2, 3, -1]), r = rand(2, 7) * pick([1, -1]);
      const b = -a * (1 + r), c = a * r;
      tex = poly([a, b, c]);
      bonne = `${coefTex(a)}${facteurX(1)}${facteurX(r)}`;
      faux = [`${coefTex(a)}${facteurX(-1)}${facteurX(-r)}`, `${coefTex(a)}${facteurX(1)}${facteurX(-r)}`, `${facteurX(1)}${facteurX(r)}`].filter((f) => f !== bonne);
      sol = `$1$ est racine évidente : $${a} ${sg(b)} ${sg(c)} = 0$. Le produit des racines vaut $\\dfrac{c}{a} = ${r}$, donc l'autre racine est $${r}$.\n\n$${tex} = ${bonne}$.`;
    } else if (t === 1) {
      const k = rand(2, 9), a = pick([1, 1, 2, 3]);
      tex = poly([a, 0, -a * k * k]);
      bonne = `${coefTex(a)}(x - ${k})(x + ${k})`;
      faux = [`${coefTex(a)}(x - ${k})^2`, `${coefTex(a)}(x - ${k * k})(x + ${k * k})`, `${coefTex(a)}x(x - ${k})`];
      sol = `Coefficient de $x$ nul : $${tex} = ${a === 1 ? "" : `${a}(`}x^2 - ${k * k}${a === 1 ? "" : ")"} = ${bonne}$ (identité $a^2 - b^2$).`;
    } else if (t === 2) {
      const a = randNZ(-4, 4), k = rand(2, 9);
      tex = poly([a, -a * k, 0]);
      bonne = `${coefTex(a)}x(x - ${k})`;
      faux = [`${coefTex(a)}x(x + ${k})`, `${coefTex(a)}(x - ${k})^2`, `x(${a}x - ${k})`].filter((f) => f !== bonne);
      sol = `Pas de terme constant : on met $x$ en facteur. $${tex} = ${bonne}$. Racines $0$ et $${k}$.`;
    } else {
      // somme et produit : x² − sx + p avec racines entières
      let r1, r2; do { r1 = randNZ(-7, 7); r2 = randNZ(-7, 7); } while (r1 === r2 || r1 === -r2);
      tex = poly([1, -(r1 + r2), r1 * r2]);
      bonne = `${facteurX(r1)}${facteurX(r2)}`;
      faux = [`${facteurX(-r1)}${facteurX(-r2)}`, `${facteurX(r1)}${facteurX(-r2)}`, `${facteurX(r1 + r2)}${facteurX(1)}`].filter((f) => f !== bonne);
      sol = `On cherche deux nombres de somme $${r1 + r2}$ et de produit $${r1 * r2}$ : $${r1}$ et $${r2}$.\n\n$${tex} = ${bonne}$.`;
    }
    const ch = melangeChoix(`$${bonne}$`, faux.map((f) => `$${f}$`));
    return {
      enonce: `Factorise $${tex}$ sans calculer de discriminant.`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Cherche d'abord un facteur commun, une identité remarquable, ou une racine évidente ($1$, $-1$, $2$…).", "Si $x_1$ et $x_2$ sont les racines : $x_1 + x_2 = -\\dfrac{b}{a}$ et $x_1 x_2 = \\dfrac{c}{a}$.", "Vérifie en développant ta réponse."],
      solution: sol
    };
  };

  GEN["s2-python"] = function () {
    let a, b, c, x, oui;
    do { a = randNZ(-3, 3); const r = randNZ(-5, 5), s = rand(-5, 5); b = -a * (r + s); c = a * r * s; oui = Math.random() < 0.5; x = oui ? pick([r, s]) : rand(-5, 5); } while (!oui && a * x * x + b * x + c === 0);
    const vrai = a * x * x + b * x + c === 0;
    return {
      enonce: "On considère la fonction Python :\n\n```python\ndef est_racine(a, b, c, x):\n    return a * x**2 + b * x + c == 0\n```\n\n" + `Que renvoie $\\texttt{est\\_racine(${a}, ${b}, ${c}, ${x})}$ ?`,
      mode: "choix", choix: ["True", "False"], attendu: vrai ? 0 : 1,
      aides: [`La fonction calcule $${poly([a, b, c])}$ pour $x = ${x}$.`, "Elle renvoie True si le résultat vaut $0$, c'est-à-dire si $x$ est une racine.", `Calcule $${a} \\times ${par(x)}^2 ${sg(b)} \\times ${par(x)} ${sg(c)}$.`],
      solution: `$${a} \\times ${par(x)}^2 ${sg(b)} \\times ${par(x)} ${sg(c)} = ${a * x * x + b * x + c}$. ` + (vrai ? `Le résultat est nul : **True**, $${x}$ est une racine.` : "Le résultat n'est pas nul : **False**.")
    };
  };

  GEN["s2-jardin"] = function () {
    const L = rand(6, 14), l = rand(4, L - 1), x = pick([0.5, 1, 1.5, 2]);
    const A = (L + 2 * x) * (l + 2 * x) - L * l;
    return {
      enonce: `Un jardin créole rectangulaire de $${L}$ m sur $${l}$ m est bordé tout autour d'une allée de largeur $x$ m. L'aire de l'allée est $A(x) = (${L} + 2x)(${l} + 2x) - ${L * l}$. Développe $A(x)$, puis calcule l'aire de l'allée pour $x = ${nb(x)}$ m.`,
      mode: "nombre", prefixe: "Aire :", suffixe: "m²", attendu: A,
      aides: [`$(${L} + 2x)(${l} + 2x) = ${L * l} + ${2 * L}x + ${2 * l}x + 4x^2$.`, `Donc $A(x) = 4x^2 + ${2 * (L + l)}x = 2x(2x + ${L + l})$ : une forme factorisée, de racines $0$ et $-${nb((L + l) / 2)}$.`, `Remplace $x$ par $${nb(x)}$.`],
      solution: `$A(x) = 4x^2 + ${2 * (L + l)}x$, donc $A(${nb(x)}) = 4 \\times ${nb(x * x)} + ${2 * (L + l)} \\times ${nb(x)} = ${nb(A)}$ m².`
    };
  };


  /* ---------- Schémas de Première (chapitres 2 et 5) ---------- */
  // Jardin créole de 10 m sur 6 m bordé d'une allée de largeur x
  FIGURES["jardin-allee"] = () => {
    const o = 40, W = 240, H = 150, x = 22;
    let s = `<svg class="graph" viewBox="0 0 320 ${H + 30}" role="img" aria-label="Jardin rectangulaire entouré d'une allée de largeur x">`;
    s += `<rect x="${o}" y="8" width="${W}" height="${H}" style="fill:var(--ylang-pale);stroke:var(--doux);stroke-width:1.4"/>`;
    s += `<rect x="${o + x}" y="${8 + x}" width="${W - 2 * x}" height="${H - 2 * x}" style="fill:var(--lagon-pale);stroke:var(--lagon);stroke-width:1.6"/>`;
    s += `<text class="g-label" x="${o + W / 2}" y="${8 + H / 2 + 4}" text-anchor="middle">jardin 10 m × 6 m</text>`;
    s += `<text class="g-label" x="${o + x / 2}" y="${8 + H / 2 + 4}" text-anchor="middle">x</text><text class="g-label" x="${o + W / 2}" y="${8 + x / 2 + 4}" text-anchor="middle">x</text>`;
    s += `<text class="g-label" x="${o + W / 2}" y="${H + 26}" text-anchor="middle">10 + 2x</text><text class="g-label" x="${o + W + 6}" y="${8 + H / 2 + 4}">6 + 2x</text>`;
    return s + `</svg>`;
  };
  // Parabole de f(x) = x² puis de f(x − 3) (translation horizontale)
  FIGURES["parabole-translation"] = () => graph({ xmin: -3.5, xmax: 6.5, ymin: -1, ymax: 9.5, h: 280, curves: [{ f: (x) => x * x, a: -3, b: 3, closed: false, label: "y = x²", lx: -2.5, dx: 30, dy: 4 }, { f: (x) => (x - 3) ** 2, a: 0, b: 6, closed: false, label: "y = (x − 3)²", lx: 5.9, dx: -4, dy: 4 }], fleches: [{ x1: 0.3, y1: 0.4, x2: 2.7, y2: 0.4, c: 1, label: "+3" }], points: [{ x: 0, y: 0 }, { x: 3, y: 0 }], aria: "La parabole y = (x − 3)² est la parabole y = x² décalée de 3 vers la droite" });


  /* ---------- Première, chapitre 3 : suites arithmétiques (préfixe su-) ---------- */
  GEN["su-arith-reconnaitre"] = function () {
    const a = randNZ(-6, 6), b = rand(-9, 9), t = rand(0, 3);
    const T = [
      [`u_n = ${poly([a, b], "n")}`, true, `$u_{n+1} - u_n = ${a}(n + 1) ${sg(b)} - (${poly([a, b], "n")}) = ${a}$ : constant. Arithmétique de raison $${a}$.`],
      [`u_n = n^2 ${sg(b)}`.replace(" + 0", "").replace(" - 0", ""), false, "$u_{n+1} - u_n = (n + 1)^2 - n^2 = 2n + 1$ : dépend de $n$, donc **pas** arithmétique. Contre-exemple : $u_1 - u_0 = 1$ mais $u_2 - u_1 = 3$."],
      [`u_0 = ${b} \\text{ et } u_{n+1} = u_n ${sg(a)}`, true, `On passe d'un terme au suivant en ajoutant toujours $${a}$ : arithmétique de raison $${a}$.`],
      [`u_0 = ${b === 0 ? 1 : b} \\text{ et } u_{n+1} = ${Math.abs(a) === 1 ? 2 : Math.abs(a)}u_n`, false, `On **multiplie** par $${Math.abs(a) === 1 ? 2 : Math.abs(a)}$ à chaque étape : la différence $u_{n+1} - u_n$ n'est pas constante. Pas arithmétique (elle est géométrique, chapitre 6).`]
    ];
    const [def, oui, sol] = T[t];
    return {
      enonce: `La suite définie par $${def}$ est-elle arithmétique ?`,
      mode: "choix", choix: ["Oui", "Non"], attendu: oui ? 0 : 1,
      aides: ["Une suite est arithmétique **si et seulement si** $u_{n+1} - u_n$ est constant (ne dépend pas de $n$).", "Calcule $u_{n+1} - u_n$, ou les trois premiers termes.", "Pour dire « non », un contre-exemple sur les premiers termes suffit."],
      solution: sol
    };
  };

  GEN["su-somme-entiers"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const n = pick([10, 20, 30, 40, 50, 99, 100, 200, 365]);
      return {
        enonce: `Calcule $1 + 2 + 3 + \\dots + ${n}$.`,
        mode: "nombre", prefixe: "Somme :", attendu: (n * (n + 1)) / 2,
        erreurs: [{ valeur: (n * n) / 2, message: "La formule est $\\dfrac{n(n + 1)}{2}$, pas $\\dfrac{n^2}{2}$." }],
        aides: ["$1 + 2 + \\dots + n = \\dfrac{n(n + 1)}{2}$.", `Ici $n = ${n}$.`, `Calcule $\\dfrac{${n} \\times ${n + 1}}{2}$.`],
        solution: `$1 + 2 + \\dots + ${n} = \\dfrac{${n} \\times ${n + 1}}{2} = ${nb((n * (n + 1)) / 2)}$.`
      };
    }
    const u0 = rand(-5, 20), r = randNZ(-4, 6), n = rand(8, 25), last = u0 + (n - 1) * r, S = (n * (u0 + last)) / 2;
    if (t === 1) {
      return {
        enonce: `$(u_n)$ est arithmétique de premier terme $u_0 = ${u0}$ et de raison $${r}$. Calcule $u_0 + u_1 + \\dots + u_{${n - 1}}$.`,
        mode: "nombre", prefixe: "Somme :", attendu: S,
        erreurs: [{ valeur: ((n - 1) * (u0 + last)) / 2, message: `De $u_0$ à $u_{${n - 1}}$, il y a $${n}$ termes, pas $${n - 1}$.` }],
        aides: ["Somme de termes consécutifs : $\\text{nombre de termes} \\times \\dfrac{\\text{premier} + \\text{dernier}}{2}$.", `Dernier terme : $u_{${n - 1}} = ${u0} + ${n - 1} \\times ${par(r)} = ${last}$.`, `Nombre de termes : de $0$ à $${n - 1}$, soit $${n}$.`],
        solution: `$u_{${n - 1}} = ${last}$ et $S = ${n} \\times \\dfrac{${u0} + ${par(last)}}{2} = ${nb(S)}$.`
      };
    }
    const a = rand(5, 30), b = a + rand(10, 60), m = b - a + 1;
    return {
      enonce: `Calcule la somme des entiers de $${a}$ à $${b}$ : $${a} + ${a + 1} + \\dots + ${b}$.`,
      mode: "nombre", prefixe: "Somme :", attendu: (m * (a + b)) / 2,
      erreurs: [{ valeur: ((b - a) * (a + b)) / 2, message: `De $${a}$ à $${b}$, il y a $${b} - ${a} + 1 = ${m}$ termes.` }],
      aides: ["Ce sont les termes consécutifs d'une suite arithmétique de raison $1$.", `Nombre de termes : $${b} - ${a} + 1 = ${m}$.`, `$S = ${m} \\times \\dfrac{${a} + ${b}}{2}$.`],
      solution: `$S = ${m} \\times \\dfrac{${a} + ${b}}{2} = ${nb((m * (a + b)) / 2)}$.`
    };
  };

  GEN["su-arith-modele"] = function () {
    const S0 = pick([0, 50, 100, 150, 200]), m = pick([30, 40, 50, 60, 75, 80]), cible = pick([1200, 1500, 1800]);
    const t = rand(0, 1);
    if (t === 0) {
      const n = rand(6, 18);
      return {
        enonce: `Pour payer son permis de conduire, Faïza a $${S0}$ € et met de côté $${m}$ € chaque mois. On note $u_n$ son épargne après $n$ mois ($u_0 = ${S0}$). Combien aura-t-elle après $${n}$ mois ?`,
        mode: "nombre", prefixe: `$u_{${n}} =$`, suffixe: "€", attendu: S0 + n * m,
        aides: [`Chaque mois, on ajoute $${m}$ € : $(u_n)$ est arithmétique de raison $${m}$.`, "$u_n = u_0 + n \\times r$.", `$u_{${n}} = ${S0} + ${n} \\times ${m}$.`],
        solution: `$u_{${n}} = ${S0} + ${n} \\times ${m} = ${S0 + n * m}$ €. C'est une croissance **linéaire** : les points $(n\\,;u_n)$ sont alignés.`
      };
    }
    const n = Math.ceil((cible - S0) / m);
    return {
      enonce: `Faïza a $${S0}$ € et met de côté $${m}$ € par mois pour un permis qui coûte $${nb(cible)}$ €. Au bout de combien de mois aura-t-elle assez d'argent ?`,
      mode: "nombre", prefixe: "Mois :", attendu: n,
      erreurs: [{ valeur: n - 1, message: `Après $${n - 1}$ mois, elle n'a que $${S0 + (n - 1) * m}$ € : pas encore assez.` }],
      aides: [`$u_n = ${S0} + ${m}n$.`, `Résous $${S0} + ${m}n \\geqslant ${cible}$.`, `$n \\geqslant \\dfrac{${cible - S0}}{${m}} \\approx ${nb(Math.round(((cible - S0) / m) * 100) / 100)}$ : prends le premier entier qui convient.`],
      solution: `$${S0} + ${m}n \\geqslant ${cible} \\iff n \\geqslant \\dfrac{${cible - S0}}{${m}}$. Le plus petit entier qui convient est $n = ${n}$ : $u_{${n}} = ${S0 + n * m}$ €.`
    };
  };

  GEN["su-arith-python"] = function () {
    const t = rand(0, 1);
    if (t === 0) {
      const n = rand(3, 7); let f = 1; for (let i = 2; i <= n; i++) f *= i;
      return {
        enonce: "On considère la fonction Python :\n\n```python\ndef factorielle(n):\n    p = 1\n    for i in range(1, n + 1):\n        p = p * i\n    return p\n```\n\n" + `Que renvoie $\\texttt{factorielle(${n})}$ ?`,
        mode: "nombre", prefixe: "Résultat :", attendu: f,
        aides: [`$\\texttt{range(1, ${n + 1})}$ donne $1$, $2$, …, $${n}$.`, "À chaque tour, $p$ est multiplié par $i$.", `On calcule $1 \\times 2 \\times \\dots \\times ${n}$, noté $${n}!$.`],
        solution: `$${n}! = ${Array.from({ length: n }, (_, i) => i + 1).join(" \\times ")} = ${f}$.`
      };
    }
    const u0 = rand(1, 9), r = rand(2, 6), n = rand(4, 8); let s = 0; for (let k = 0; k <= n; k++) s += u0 + k * r;
    return {
      enonce: "On considère la fonction Python :\n\n```python\ndef somme(n):\n    u = " + u0 + "\n    s = u\n    for i in range(n):\n        u = u + " + r + "\n        s = s + u\n    return s\n```\n\n" + `Que renvoie $\\texttt{somme(${n})}$ ?`,
      mode: "nombre", prefixe: "Résultat :", attendu: s,
      aides: [`$u$ prend les valeurs $${u0}$, $${u0 + r}$, $${u0 + 2 * r}$… : une suite arithmétique de raison $${r}$.`, `$s$ additionne $u_0$, $u_1$, …, $u_{${n}}$ : $${n + 1}$ termes.`, `Formule : $${n + 1} \\times \\dfrac{${u0} + ${u0 + n * r}}{2}$.`],
      solution: `$s = u_0 + \\dots + u_{${n}} = ${n + 1} \\times \\dfrac{${u0} + ${u0 + n * r}}{2} = ${s}$.`
    };
  };


  // Première, chapitre 3 : nuage d'une suite arithmétique (points alignés) ; chapitre 6 : suite géométrique
  FIGURES["suite-arith"] = () => graph({ xmin: -0.5, xmax: 7.5, ymin: -0.5, ymax: 14, ystep: 2, yetiq: 2, h: 260, curves: [{ f: (x) => 2 + 1.5 * x, a: 0, b: 7, closed: false }], points: Array.from({ length: 8 }, (_, n) => ({ x: n, y: 2 + 1.5 * n })), fleches: [{ x1: 4, y1: 8, x2: 5, y2: 8, c: 1 }, { x1: 5, y1: 8, x2: 5, y2: 9.5, c: 1 }], marques: [{ x: 5.9, y: 8.6, texte: "+r" }], aria: "Les points d'une suite arithmétique de raison 1,5 sont alignés" }).replace(/g-curve g-curve-0" d/, 'g-curve g-curve-0" style="stroke-dasharray:4 4;opacity:.6" d');
  FIGURES["suite-geo"] = () => graph({ xmin: -0.5, xmax: 7.5, ymin: -2, ymax: 34, ystep: 4, yetiq: 8, h: 260, curves: [{ f: (x) => 2 ** (x * 0.5 + 0) * 1, a: 0, b: 0, closed: false }].slice(0, 0), points: Array.from({ length: 6 }, (_, n) => ({ x: n, y: 2 ** n })).concat(Array.from({ length: 8 }, (_, n) => ({ x: n, y: 24 * 0.6 ** n }))), marques: [{ x: 5.6, y: 31, texte: "×2" }, { x: 6.2, y: 3.2, texte: "×0,6" }], aria: "Suite géométrique de raison 2 (croissante) et de raison 0,6 (décroissante)" });


  /* ---------- Première, chapitre 4 : probabilités conditionnelles et indépendance (préfixe pi-) ---------- */
  // Arbre à trois branches au premier niveau (partition A₁, A₂, A₃), deux au second (D, non D)
  function arbre3(noms, p1, p2) {
    const W = 320, H = 230, x0 = 14, x1 = 120, x2 = 270, ys = [40, 115, 190], d = 22;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="Arbre pondéré : partition en trois événements">`;
    const nom = (t) => (t[0] === "~" ? `<tspan style="text-decoration:overline">${t.slice(1)}</tspan>` : t);
    const br = (xa, ya, xb, yb, t) => {
      s += `<line x1="${xa}" y1="${ya}" x2="${xb - 14}" y2="${yb}" style="stroke:var(--doux);stroke-width:1.6"/>`;
      s += `<text class="g-label" x="${(xa + xb - 14) / 2}" y="${(ya + yb) / 2 - 5}" text-anchor="middle" style="fill:${t === "?" ? "var(--ylang)" : "var(--encre)"}">${t}</text>`;
    };
    ys.forEach((y, i) => {
      br(x0, H / 2, x1, y, p1[i]);
      s += `<text class="g-clabel" x="${x1 - 8}" y="${y + 4}">${nom(noms[i])}</text>`;
      br(x1 + 14, y, x2, y - d, p2[i]); br(x1 + 14, y, x2, y + d, "");
      s += `<text class="g-clabel" x="${x2 - 8}" y="${y - d + 4}">${nom(noms[3])}</text><text class="g-clabel" x="${x2 - 8}" y="${y + d + 4}">${nom("~" + noms[3])}</text>`;
    });
    return s + `</svg>`;
  }
  const vir = (x) => String(+x.toFixed(4)).replace(".", ","), virT = (x) => vir(x).replace(",", "{,}");

  GEN["pi-totales"] = function () {
    const pA = pick([0.2, 0.3, 0.4, 0.6, 0.7]), b1 = pick([0.1, 0.2, 0.5, 0.8, 0.9]), b2 = pick([0.05, 0.1, 0.3, 0.4, 0.6]);
    const P = [pA, 1 - pA, b1, 1 - b1, b2, 1 - b2].map((x) => +x.toFixed(2)), pB = +(P[0] * P[2] + P[1] * P[4]).toFixed(4);
    return {
      enonce: "D'après l'arbre pondéré, calcule $P(B)$.",
      figure: arbre(NOMS_ARBRE, P.map(vir)),
      mode: "nombre", prefixe: "$P(B) =$", attendu: pB,
      erreurs: [{ valeur: +(P[0] * P[2]).toFixed(4), message: "Ça, c'est seulement $P(A \\cap B)$ : il faut ajouter le chemin qui passe par $\\overline{A}$." }, { valeur: +(P[2] + P[4]).toFixed(4), message: "On n'additionne pas les branches du second niveau : on additionne les **chemins** (produits)." }],
      aides: ["$A$ et $\\overline{A}$ forment une **partition** de l'univers : $B = (A \\cap B) \\cup (\\overline{A} \\cap B)$.", "**Formule des probabilités totales** : $P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.", `$P(B) = ${virT(P[0])} \\times ${virT(P[2])} + ${virT(P[1])} \\times ${virT(P[4])}$.`],
      solution: `$P(B) = P(A)P_A(B) + P(\\overline{A})P_{\\overline{A}}(B) = ${virT(P[0])} \\times ${virT(P[2])} + ${virT(P[1])} \\times ${virT(P[4])} = ${virT(+(P[0] * P[2]).toFixed(4))} + ${virT(+(P[1] * P[4]).toFixed(4))} = ${virT(pB)}$.`
    };
  };

  GEN["pi-inverser"] = function () {
    const pA = pick([0.02, 0.05, 0.1, 0.2, 0.3]), b1 = pick([0.9, 0.95, 0.98]), b2 = pick([0.05, 0.1, 0.2]);
    const inter = pA * b1, pB = inter + (1 - pA) * b2, r = Math.round((inter / pB) * 100) / 100;
    const P = [pA, 1 - pA, b1, 1 - b1, b2, 1 - b2].map((x) => +x.toFixed(2));
    return {
      enonce: "Dépistage au dispensaire : $M$ « la personne est malade », $T$ « le test est positif ». D'après l'arbre, calcule $P_T(M)$, arrondie au centième.",
      figure: arbre(["M", "~M", "T", "~T"], P.map(vir)),
      mode: "nombre", prefixe: "$P_T(M) \\approx$", attendu: r, tolerance: 0.006,
      erreurs: [{ valeur: b1, message: "Ça, c'est $P_M(T)$ (sur l'arbre). On demande l'inverse : $P_T(M)$." }],
      aides: ["$P_T(M) = \\dfrac{P(M \\cap T)}{P(T)}$.", `$P(M \\cap T) = ${virT(P[0])} \\times ${virT(P[2])} = ${virT(+inter.toFixed(4))}$.`, `$P(T)$ par les probabilités totales : $${virT(+inter.toFixed(4))} + ${virT(P[1])} \\times ${virT(P[4])} = ${virT(+pB.toFixed(4))}$.`],
      solution: `$P_T(M) = \\dfrac{P(M \\cap T)}{P(T)} = \\dfrac{${virT(+inter.toFixed(4))}}{${virT(+pB.toFixed(4))}} \\approx ${virT(r)}$.\n\n${r < 0.5 ? "Moins d'une chance sur deux d'être malade malgré un test positif : la maladie est rare et les faux positifs nombreux." : "On a inversé le conditionnement : $P_T(M) \\neq P_M(T)$."}`
    };
  };

  GEN["pi-independance"] = function () {
    const t = rand(0, 1);
    const pA = pick([0.2, 0.3, 0.4, 0.5, 0.6]), pB = pick([0.1, 0.2, 0.3, 0.5, 0.7]);
    if (t === 0) {
      const indep = Math.random() < 0.5, inter = +(indep ? pA * pB : pA * pB + pick([0.04, -0.03, 0.05])).toFixed(3);
      return {
        enonce: `$P(A) = ${virT(pA)}$, $P(B) = ${virT(pB)}$ et $P(A \\cap B) = ${virT(inter)}$. Les événements $A$ et $B$ sont-ils indépendants ?`,
        mode: "choix", choix: ["Oui", "Non"], attendu: indep ? 0 : 1,
        aides: ["$A$ et $B$ sont **indépendants** si et seulement si $P(A \\cap B) = P(A) \\times P(B)$.", `Calcule $P(A) \\times P(B) = ${virT(pA)} \\times ${virT(pB)}$.`, "Compare avec $P(A \\cap B)$."],
        solution: `$P(A) \\times P(B) = ${virT(+(pA * pB).toFixed(4))}$ ${indep ? "$=" : "$\\neq"} P(A \\cap B)$ : ${indep ? "ils sont **indépendants** (savoir que $A$ est réalisé ne change pas la probabilité de $B$)." : "ils ne sont **pas** indépendants."}`
      };
    }
    return {
      enonce: `$A$ et $B$ sont indépendants, avec $P(A) = ${virT(pA)}$ et $P(B) = ${virT(pB)}$. Calcule $P(A \\cap B)$.`,
      mode: "nombre", prefixe: "$P(A \\cap B) =$", attendu: +(pA * pB).toFixed(4),
      erreurs: [{ valeur: +(pA + pB).toFixed(4), message: "Pour l'intersection d'événements indépendants, on **multiplie**." }],
      aides: ["Indépendants : $P(A \\cap B) = P(A) \\times P(B)$.", "C'est aussi $P_A(B) = P(B)$ : savoir $A$ ne change rien.", `$${virT(pA)} \\times ${virT(pB)}$.`],
      solution: `$P(A \\cap B) = ${virT(pA)} \\times ${virT(pB)} = ${virT(+(pA * pB).toFixed(4))}$.`
    };
  };

  GEN["pi-epreuves"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const k = rand(1, 6);
      return {
        enonce: `On lance un dé équilibré à $6$ faces puis une pièce équilibrée (épreuves indépendantes). Quelle est la probabilité d'obtenir un nombre supérieur ou égal à $${k}$ **et** « pile » ? (Fraction.)`,
        mode: "nombre", prefixe: "Probabilité :", attendu: ((7 - k) / 6) * 0.5,
        aides: ["Les deux épreuves sont indépendantes : on multiplie les probabilités.", `$P(\\text{dé} \\geqslant ${k}) = \\dfrac{${7 - k}}{6}$ et $P(\\text{pile}) = \\dfrac{1}{2}$.`, "Fais le produit, et simplifie si tu veux (écris par exemple $5/12$)."],
        solution: `$\\dfrac{${7 - k}}{6} \\times \\dfrac{1}{2} = ${frac(7 - k, 12)}$.`
      };
    }
    if (t === 1) {
      const r = rand(2, 6), b = rand(2, 6), n = r + b;
      return {
        enonce: `Une urne contient $${r}$ boules rouges et $${b}$ bleues. On tire une boule, on la **remet**, puis on en tire une seconde. Probabilité d'obtenir deux boules rouges ? (Fraction.)`,
        mode: "nombre", prefixe: "Probabilité :", attendu: (r / n) ** 2,
        erreurs: [{ valeur: (r / n) * ((r - 1) / (n - 1)), message: "La boule est remise : la composition de l'urne ne change pas au second tirage." }],
        aides: ["Avec remise, les deux tirages sont **indépendants**.", `$P(R) = \\dfrac{${r}}{${n}}$ à chaque tirage.`, `$P(R \\text{ puis } R) = \\dfrac{${r}}{${n}} \\times \\dfrac{${r}}{${n}}$.`],
        solution: `$\\dfrac{${r}}{${n}} \\times \\dfrac{${r}}{${n}} = ${frac(r * r, n * n)}$.`
      };
    }
    const p = pick([0.1, 0.2, 0.3, 0.6, 0.8]);
    return {
      enonce: `Un tireur atteint la cible avec la probabilité $${virT(p)}$, indépendamment d'un tir à l'autre. Il tire deux fois. Probabilité qu'il atteigne la cible **exactement une fois** ?`,
      mode: "nombre", prefixe: "Probabilité :", attendu: +(2 * p * (1 - p)).toFixed(4),
      erreurs: [{ valeur: +(p * (1 - p)).toFixed(4), message: "Il y a **deux** chemins : réussite puis échec, et échec puis réussite." }],
      aides: ["Fais un arbre à deux niveaux (succès $S$, échec $\\overline{S}$).", `Chemins favorables : $S\\overline{S}$ et $\\overline{S}S$, chacun de probabilité $${virT(p)} \\times ${virT(1 - p)}$.`, "Additionne les deux chemins."],
      solution: `$P = ${virT(p)} \\times ${virT(1 - p)} + ${virT(1 - p)} \\times ${virT(p)} = ${virT(+(2 * p * (1 - p)).toFixed(4))}$.`
    };
  };

  GEN["pi-partition"] = function () {
    const p1 = pick([0.2, 0.3, 0.5]), p2 = pick([0.2, 0.3]), p3 = +(1 - p1 - p2).toFixed(2);
    const d = [pick([0.01, 0.02, 0.03]), pick([0.02, 0.04, 0.05]), pick([0.01, 0.06, 0.08])];
    const pD = +(p1 * d[0] + p2 * d[1] + p3 * d[2]).toFixed(4);
    return {
      enonce: `Une coopérative de vanille trie ses gousses venant de trois villages $A_1$, $A_2$, $A_3$ (proportions et taux de gousses abîmées $D$ sur l'arbre). Quelle est la probabilité qu'une gousse prise au hasard soit abîmée ?`,
      figure: arbre3(["A₁", "A₂", "A₃", "D"], [p1, p2, p3].map(vir), d.map(vir)),
      mode: "nombre", prefixe: "$P(D) =$", attendu: pD,
      aides: ["$A_1$, $A_2$, $A_3$ forment une **partition** de l'univers : chaque gousse vient d'un seul village.", "Probabilités totales : $P(D) = P(A_1)P_{A_1}(D) + P(A_2)P_{A_2}(D) + P(A_3)P_{A_3}(D)$.", "Additionne les trois chemins qui mènent à $D$."],
      solution: `$P(D) = ${virT(p1)} \\times ${virT(d[0])} + ${virT(p2)} \\times ${virT(d[1])} + ${virT(p3)} \\times ${virT(d[2])} = ${virT(pD)}$.`
    };
  };


  // Première, chapitre 4 : arbres du cours
  FIGURES["arbre-partition"] = () => arbre3(["A₁", "A₂", "A₃", "D"], ["0,5", "0,3", "0,2"], ["0,02", "0,04", "0,06"]);
  FIGURES["arbre-independance"] = () => arbre(["A", "~A", "B", "~B"], ["0,4", "0,6", "0,3", "0,7", "0,3", "0,7"]);


  /* ---------- Première, chapitre 5 : forme canonique et discriminant (préfixe s5-) ---------- */
  // Compléter le carré : x² + 2ax = (x + a)² − a², vu comme un carré auquel il manque un coin
  FIGURES["completer-carre"] = () => {
    const o = 50, X = 150, A = 60, T = X + A;
    let s = `<svg class="graph" viewBox="0 0 320 ${T + 44}" role="img" aria-label="Un carré x² et deux rectangles ax forment presque un carré de côté x + a : il manque le petit carré a²">`;
    const r = (x, y, w, h, st, t) => { s += `<rect x="${o + x}" y="${10 + y}" width="${w}" height="${h}" style="${st}"/><text class="g-clabel" x="${o + x + w / 2}" y="${10 + y + h / 2 + 5}" text-anchor="middle">${t}</text>`; };
    const plein = (c) => `fill:var(${c});stroke:var(--doux);stroke-width:1.4`;
    r(0, 0, X, X, plein("--lagon-pale"), "x²"); r(X, 0, A, X, plein("--ylang-pale"), "ax"); r(0, X, X, A, plein("--ylang-pale"), "ax");
    r(X, X, A, A, "fill:none;stroke:var(--doux);stroke-width:1.4;stroke-dasharray:5 4", "a²");
    s += `<text class="g-label" x="${o + X / 2}" y="${T + 28}" text-anchor="middle">x</text><text class="g-label" x="${o + X + A / 2}" y="${T + 28}" text-anchor="middle">a</text>`;
    s += `<text class="g-label" x="${o - 10}" y="${10 + X / 2}" text-anchor="end">x</text><text class="g-label" x="${o - 10}" y="${10 + X + A / 2}" text-anchor="end">a</text>`;
    s += `<text class="g-label" x="${o + T + 8}" y="${10 + X + A / 2 + 4}">manque</text>`;
    return s + `</svg>`;
  };
  // Signe de ax² + bx + c pour a > 0 selon le signe de Δ
  FIGURES["signe-trinome"] = () => {
    const cas = [{ f: (x) => x * x - 1, t: "Δ > 0", sg: [[-1.7, "+"], [-1, "0"], [0, "−"], [1, "0"], [1.7, "+"]], R: [-1, 1] }, { f: (x) => x * x, t: "Δ = 0", sg: [[-1.4, "+"], [0, "0"], [1.4, "+"]], R: [0] }, { f: (x) => x * x + 0.8, t: "Δ < 0", sg: [[-1.4, "+"], [0, "+"], [1.4, "+"]], R: [] }];
    let s = `<svg class="graph" viewBox="0 0 320 184" role="img" aria-label="Trois paraboles tournées vers le haut : avec deux racines le trinôme est négatif entre elles, avec une racine double il est positif et nul en un point, sans racine il est toujours positif">`;
    cas.forEach((c, i) => {
      const ox = 8 + i * 104, X = (x) => +(ox + 48 + x * 22).toFixed(1), Y = (y) => +(104 - y * 22).toFixed(1);
      let d = ""; for (let k = 0; k <= 60; k++) { const x = -2.05 + (4.1 * k) / 60; const y = c.f(x); if (y <= 3.9) d += (d ? "L" : "M") + X(x) + " " + Y(y); }
      s += `<g class="g-axis"><line x1="${ox + 2}" y1="${Y(0)}" x2="${ox + 96}" y2="${Y(0)}"/></g>`;
      s += `<path class="g-curve g-curve-${i === 1 ? 1 : 0}" d="${d}"/>`;
      c.R.forEach((r) => { s += `<circle class="g-point" cx="${X(r)}" cy="${Y(0)}" r="3"/>`; });
      c.sg.forEach(([x, t]) => { s += `<text class="g-clabel" x="${X(x)}" y="${Y(0) + 44}" text-anchor="middle" style="font-size:13px">${t}</text>`; });
      s += `<text class="g-label" x="${ox + 48}" y="${Y(0) + 70}" text-anchor="middle">${c.t}</text>`;
    });
    return s + `</svg>`;
  };
  // Trajectoire du ballon : h(t) = −5t² + 15t
  FIGURES["ballon"] = () => graph({ xmin: -0.3, xmax: 3.5, ymin: -1.4, ymax: 13.6, xstep: 0.5, ystep: 2, xetiq: 1, yetiq: 2, h: 260, padL: 22, xlabel: "t (s)", ylabel: "h (m)", curves: [{ f: (t) => -5 * t * t + 15 * t, a: 0, b: 3, closed: false }], hlines: [{ y: 11.25, label: "11,25 m" }], points: [{ x: 1.5, y: 11.25, label: "S", gauche: true }, { x: 0, y: 0 }, { x: 3, y: 0, label: "chute", gauche: true }], aria: "Parabole de h(t) = −5t² + 15t : le ballon part du sol, monte jusqu'à 11,25 m à t = 1,5 s et retombe à t = 3 s" });

  // Repère adapté à une parabole de sommet (al ; be) et à sa translatée
  function repereParaboles(a, al, be, m) {
    const w = Math.sqrt(6.5 / Math.abs(a)), nouv = al + m;
    const xmin = Math.min(Math.floor(Math.min(al, nouv) - 3), -1) - 0.5, xmax = Math.max(Math.ceil(Math.max(al, nouv) + 3), 1) + 0.5;
    const ymin = a > 0 ? Math.min(be - 1.5, -1.5) : Math.min(be - 7, -1.5), ymax = a > 0 ? Math.max(be + 7, 1.5) : Math.max(be + 1.5, 1.5);
    const f = (x) => a * (x - al) ** 2 + be;
    const nom = (n) => `C<tspan class="sub" dy="3">${n}</tspan>`;
    const lab = (x, y, n) => `${n}(${x} ; ${y})`.replace(/-/g, "−");
    const base = { xmin, xmax, ymin, ymax, h: 260, xetiq: xmax - xmin > 11 ? 2 : 1, yetiq: 2, aria: `Parabole de f, de sommet S(${al} ; ${be})`.replace(/-/g, "−") };
    const cf = { f, a: al - w, b: al + w, closed: false, label: nom("f"), lx: al - 0.85 * w, dx: -6, dy: 4 };
    const cg = { f: (x) => f(x - m), a: nouv - w, b: nouv + w, closed: false, label: nom("g"), lx: nouv + 0.85 * w, dx: 22, dy: 4 };
    return {
      figure: graph({ ...base, curves: [cf], points: [{ x: al, y: be, label: lab(al, be, "S") }] }),
      figureSolution: graph({ ...base, curves: [cf, cg], fleches: [{ x1: al, y1: be, x2: nouv, y2: be, c: 1 }], points: [{ x: al, y: be, label: lab(al, be, "S"), gauche: m > 0 }, { x: nouv, y: be, label: lab(nouv, be, "S′"), gauche: m < 0 }], aria: `La parabole de g est celle de f décalée de ${Math.abs(m)} vers la ${m > 0 ? "droite" : "gauche"}` })
    };
  }

  GEN["s5-translation"] = function () {
    const al = randNZ(-4, 4), be = rand(-5, 5), m = randNZ(-5, 5), a = pick([1, -1, 2, -2]);
    const fTex = canon(a, al, be), nouv = al + m, q = Math.random() < 0.5;
    const gTex = `f(x ${m > 0 ? "-" : "+"} ${Math.abs(m)})`, sens = m > 0 ? "droite" : "gauche", faux = m > 0 ? "gauche" : "droite";
    const rep = q
      ? { mode: "nombre", prefixe: "Abscisse :", attendu: nouv, erreurs: [{ valeur: al - m, message: `Remplacer $x$ par $x ${m > 0 ? "-" : "+"} ${Math.abs(m)}$ décale la courbe vers la ${sens}, pas vers la ${faux}.` }] }
      : (() => { const c = melangeChoix(`Un décalage de $${Math.abs(m)}$ vers la ${sens}`, [`Un décalage de $${Math.abs(m)}$ vers la ${faux}`, `Un décalage de $${Math.abs(m)}$ vers le haut`, `Un décalage de $${Math.abs(m)}$ vers le bas`]); return { mode: "choix", choix: c.choix, attendu: c.attendu }; })();
    return {
      enonce: `La parabole de $f(x) = ${fTex}$ a pour sommet $S(${al}\\,;${be})$. On pose $g(x) = ${gTex}$. ${q ? "Quelle est l'abscisse du sommet de la parabole de $g$ ?" : "Comment obtient-on la courbe de $g$ à partir de celle de $f$ ?"}`,
      ...rep,
      ...repereParaboles(a, al, be, m),
      aides: ["La courbe de $x \\mapsto f(x - m)$ est celle de $f$ décalée **horizontalement** de $m$ : vers la droite si $m > 0$, vers la gauche si $m < 0$.", `$g(x) = ${m > 0 ? gTex : `${gTex} = f(x - (${m}))`}$ : ici $m = ${m}$.`, `Le sommet garde son ordonnée $${be}$ et son abscisse devient $${al} ${sg(m)}$.`],
      solution: `$g(x) = f(x - ${par(m)})$ avec $m = ${m}$ : la parabole de $f$ est décalée de $${Math.abs(m)}$ vers la ${sens}. Le sommet de la parabole de $g$ est $S'(${nouv}\\,;${be})$ : même ordonnée, abscisse $${al} ${sg(m)} = ${nouv}$.`
    };
  };

  GEN["s5-ballon"] = function () {
    const t0 = pick([1, 1.2, 1.4, 1.5, 1.6, 2]), h0 = pick([0, 0, 0.5, 1]);
    const b = +(10 * t0).toFixed(2), hmax = +(5 * t0 * t0 + h0).toFixed(2);
    const q = pick(h0 === 0 ? ["hmax", "tmax", "chute", "chute"] : ["hmax", "hmax", "tmax"]);
    const hTex = `-5t^2 + ${nb(b)}t${h0 ? ` + ${nb(h0)}` : ""}`;
    const fin = +((b + Math.sqrt(b * b + 20 * h0)) / 10).toFixed(3);
    const ys = hmax <= 8 ? 1 : hmax <= 16 ? 2 : 5;
    const figure = graph({ xmin: -0.3, xmax: fin + 0.4, ymin: -hmax * 0.1, ymax: hmax * 1.15, xstep: 0.5, xetiq: 1, ystep: ys, h: 240, padL: 22, xlabel: "t (s)", ylabel: "h (m)", curves: [{ f: (t) => -5 * t * t + b * t + h0, a: 0, b: fin, closed: false }], aria: "Trajectoire du ballon : une parabole tournée vers le bas" });
    const calc = `$\\alpha = -\\dfrac{${nb(b)}}{2 \\times (-5)} = ${nb(t0)}$ et $h(${nb(t0)}) = -5 \\times ${nb(+(t0 * t0).toFixed(2))} + ${nb(b)} \\times ${nb(t0)}${h0 ? ` + ${nb(h0)}` : ""} = ${nb(hmax)}$.`;
    const enonces = { hmax: "Quelle est la hauteur maximale atteinte par le ballon ?", tmax: "À quel instant le ballon est-il le plus haut ?", chute: "À quel instant le ballon retombe-t-il au sol ?" };
    const base = {
      enonce: `Au stade de Cavani, Faïza dégage le ballon. Sa hauteur (en m) au bout de $t$ secondes est $h(t) = ${hTex}$. ${enonces[q]}`,
      mode: "nombre", figure
    };
    if (q === "chute") return {
      ...base, prefixe: "$t =$", suffixe: "s", attendu: 2 * t0,
      erreurs: [{ valeur: t0, message: "Ça, c'est l'instant où le ballon est le plus haut. Au sol, $h(t) = 0$." }, { valeur: 0, message: "À $t = 0$ le ballon part du sol ; on cherche l'autre instant où $h(t) = 0$." }],
      aides: ["Le ballon est au sol quand $h(t) = 0$.", `Factorise : $h(t) = t(-5t + ${nb(b)})$.`, `Produit nul : $t = 0$ (le départ) ou $-5t + ${nb(b)} = 0$.`],
      solution: `$h(t) = t(-5t + ${nb(b)}) = 0 \\iff t = 0$ ou $t = \\dfrac{${nb(b)}}{5} = ${nb(2 * t0)}$. Le ballon retombe au sol au bout de $${nb(2 * t0)}$ s. (Le sommet est atteint à mi-chemin, à $t = ${nb(t0)}$ s : la parabole est symétrique.)`
    };
    return {
      ...base, prefixe: q === "hmax" ? "Hauteur :" : "$t =$", suffixe: q === "hmax" ? "m" : "s", attendu: q === "hmax" ? hmax : t0,
      erreurs: q === "hmax" ? [{ valeur: t0, message: "Ça, c'est l'instant du maximum $\\alpha$ ; on demande la hauteur $h(\\alpha)$." }] : [{ valeur: hmax, message: "Ça, c'est la hauteur maximale $\\beta$ ; on demande l'instant $\\alpha$." }],
      aides: ["$a = -5 < 0$ : la parabole est tournée vers le bas, son sommet est un **maximum**.", `L'instant du maximum est $\\alpha = -\\dfrac{b}{2a} = -\\dfrac{${nb(b)}}{2 \\times (-5)}$.`, q === "hmax" ? "La hauteur maximale est $h(\\alpha)$." : "C'est $\\alpha$ qu'on demande, pas $h(\\alpha)$."],
      solution: `${calc} Le ballon est au plus haut à $t = ${nb(t0)}$ s, à $${nb(hmax)}$ m.`
    };
  };

  GEN["s5-python"] = function () {
    const code = (cond) => "```python\nfrom math import sqrt\n\ndef solutions(a, b, c):\n    d = b**2 - 4*a*c\n    if " + cond + ":\n        return [(-b - sqrt(d)) / (2*a), (-b + sqrt(d)) / (2*a)]\n    elif d == 0:\n        return [-b / (2*a)]\n    else:\n        return []\n```";
    if (Math.random() < 0.3) {
      const c = melangeChoix("d > 0", ["d >= 0", "d < 0", "a > 0"]);
      return {
        enonce: "Cette fonction doit renvoyer la liste des solutions de $ax^2 + bx + c = 0$. Quelle condition faut-il écrire à la place de « … » ?\n\n" + code("…"),
        mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["La ligne qui suit renvoie **deux** solutions.", "Le nombre de solutions dépend du signe du discriminant, stocké dans la variable d.", "Le cas « d == 0 » est déjà traité par la ligne « elif »."],
        solution: "Deux solutions quand $\\Delta > 0$ : il faut écrire « d > 0 ». Avec « d >= 0 », le cas $\\Delta = 0$ renverrait deux fois la même solution et la ligne « elif » ne servirait jamais. C'est une **disjonction des cas** : $\\Delta > 0$, $\\Delta = 0$, $\\Delta < 0$."
      };
    }
    let a, b, c, sol;
    const t = rand(0, 2);
    if (t === 0) { const r = randNZ(-5, 5), s = randNZ(-5, 5); a = pick([1, 2, -1]); b = -a * (r + s); c = a * r * s; sol = r === s ? [r] : [Math.min(r, s), Math.max(r, s)]; }
    else if (t === 1) { a = pick([1, 2]); b = rand(-4, 4); c = Math.ceil(rand(2, 6) + (b * b) / (4 * a)); sol = []; }
    else { const r = randNZ(-5, 5); a = pick([1, -1]); b = -2 * a * r; c = a * r * r; sol = [r]; }
    const d = b * b - 4 * a * c, n = sol.length;
    return {
      enonce: "On considère la fonction Python :\n\n" + code("d > 0") + `\n\nCombien d'éléments contient la liste renvoyée par $\\texttt{solutions(${a}, ${b}, ${c})}$ ?`,
      mode: "nombre", prefixe: "Nombre d'éléments :", attendu: n,
      aides: ["La fonction calcule le discriminant $\\texttt{d} = b^2 - 4ac$.", `Ici $\\Delta = ${par(b)}^2 - 4 \\times ${par(a)} \\times ${par(c)}$.`, "Deux éléments si $\\Delta > 0$, un si $\\Delta = 0$, aucun (liste vide) si $\\Delta < 0$."],
      solution: `$\\Delta = ${b * b} ${sg(-4 * a * c)} = ${d}$, ${d > 0 ? "strictement positif" : d === 0 ? "nul" : "strictement négatif"} : la liste contient $${n}$ élément${n > 1 ? "s" : ""}${n ? ` (la solution${n > 1 ? "s" : ""} $${sol.join("$ et $")}$)` : " : c'est la liste vide"}.`
    };
  };

  GEN["s5-factoriser"] = function () {
    const type = pick([2, 2, 2, 1, 0]);
    let t; do { t = trinome(type); } while ((type === 2 && t.R[0] + t.R[1] === 0) || (type === 1 && t.R[0] === 0) || (type === 0 && t.al === 0));
    const aTex = (a) => (a === 1 ? "" : a === -1 ? "-" : `${a}`);
    const D = t.b * t.b - 4 * t.a * t.c;
    const pasFact = "On ne peut pas factoriser en facteurs du premier degré";
    let bonne, fausses;
    if (type === 2) { const [r1, r2] = t.R; bonne = `$${formeFact(t.a, r1, r2)}$`; fausses = [`$${formeFact(t.a, -r1, -r2)}$`, `$${formeFact(t.a === 1 ? 2 : 1, r1, r2)}$`, `$${formeFact(t.a, r1, -r2)}$`, `$${formeFact(t.a, -r1, r2)}$`, pasFact]; }
    else if (type === 1) { const r = t.R[0]; bonne = `$${aTex(t.a)}${carre(r)}$`; fausses = [`$${aTex(t.a)}${carre(-r)}$`, `$${aTex(t.a)}${facteur(r)}${facteur(-r)}$`, `$${t.a === 1 ? "2" : ""}${carre(r)}$`, pasFact]; }
    else { bonne = pasFact; fausses = [`$${aTex(t.a)}${carre(t.al)}$`, `$${aTex(t.a)}${facteur(t.al)}${facteur(-t.al)}$`, `$${aTex(t.a)}${carre(-t.al)}$`]; }
    const c = melangeChoix(bonne, fausses.filter((f) => !/\(x\s*[+-]\s*0\)/.test(f)));
    return {
      enonce: `Quelle est une forme factorisée de $f(x) = ${poly([t.a, t.b, t.c])}$ ?`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Calcule $\\Delta = b^2 - 4ac$ pour savoir combien il y a de racines.", `$\\Delta = ${par(t.b)}^2 - 4 \\times ${par(t.a)} \\times ${par(t.c)} = ${D}$.`, type === 2 ? "Deux racines : $f(x) = a(x - x_1)(x - x_2)$, sans oublier $a$." : type === 1 ? "Racine double : $f(x) = a(x - x_0)^2$." : "$\\Delta < 0$ : aucune racine réelle."],
      solution: type === 2 ? `$\\Delta = ${D} > 0$ : deux racines $x_1 = ${t.R[0]}$ et $x_2 = ${t.R[1]}$, donc $f(x) = ${formeFact(t.a, t.R[0], t.R[1])}$. Vérifie en développant.`
        : type === 1 ? `$\\Delta = 0$ : racine double $x_0 = -\\dfrac{b}{2a} = ${t.R[0]}$, donc $f(x) = ${aTex(t.a)}${carre(t.R[0])}$.`
        : `$\\Delta = ${D} < 0$ : $f$ n'a aucune racine réelle, donc on ne peut pas l'écrire $a(x - x_1)(x - x_2)$.`
    };
  };

  // Logique : « pour tout réel x… » se démontre par disjonction des cas sur Δ, se réfute par un contre-exemple
  GEN["s5-vrai-faux"] = function () {
    const type = pick([2, 1, 0, 0]), t = trinome(type), large = Math.random() < 0.5;
    const P = (x) => t.a * x * x + t.b * x + t.c, D = t.b * t.b - 4 * t.a * t.c;
    const vrai = t.a > 0 && (D < 0 || (large && D === 0));
    let x0 = null;
    if (!vrai) {
      if (t.a < 0) x0 = type === 2 ? t.R[1] + 1 : type === 1 ? t.R[0] + 1 : t.al;
      else if (type === 2) x0 = large ? (t.R[1] - t.R[0] > 1 ? t.R[0] + 1 : (t.R[0] + t.R[1]) / 2) : t.R[0];
      else x0 = t.R[0];
    }
    const op = large ? "\\geqslant" : ">";
    return {
      enonce: `Vrai ou faux : « pour tout réel $x$, $${poly([t.a, t.b, t.c])} ${op} 0$ » ?`,
      mode: "choix", choix: ["Vrai", "Faux"], attendu: vrai ? 0 : 1,
      aides: ["Calcule $\\Delta$ et regarde le signe de $a$ : on raisonne **cas par cas** selon le signe de $\\Delta$.", `$\\Delta = ${D}$ et $a = ${t.a}$.`, "Pour montrer qu'un « pour tout » est faux, **un seul contre-exemple** suffit."],
      solution: vrai
        ? `$\\Delta = ${D}${D < 0 ? " < 0$ : le trinôme n'a pas de racine, il est strictement" : "$ : le trinôme a une racine double, il est"} du signe de $a = ${t.a} > 0$${D === 0 ? ", et nul seulement en $" + t.R[0] + "$" : ""}. L'affirmation est **vraie**.`
        : `**Faux**. Contre-exemple : pour $x = ${nb(x0)}$, on obtient $${nb(P(x0))}$, qui n'est pas ${large ? "positif ou nul" : "strictement positif"}. ($\\Delta = ${D}$ et $a = ${t.a}$.)`
    };
  };

  GEN["s5-forme-adaptee"] = function () {
    const a = pick([1, 2, -1, -2, 3]);
    let r1, r2; do { [r1, r2] = racines2(); } while ((r1 + r2) % 2 || !r1 || !r2 || r1 + r2 === 0);
    const al = (r1 + r2) / 2, be = a * (al - r1) * (al - r2), b = -a * (r1 + r2), c = a * r1 * r2;
    const formes = [`Développée : $${poly([a, b, c])}$`, `Canonique : $${canon(a, al, be)}$`, `Factorisée : $${formeFact(a, r1, r2)}$`];
    const Q = [
      ["calculer $f(0)$", 0, `$f(0) = ${c}$ se lit directement : c'est le terme constant.`],
      ["résoudre $f(x) = 0$", 2, `Produit nul : $x = ${r1}$ ou $x = ${r2}$.`],
      [`trouver ${a > 0 ? "le minimum" : "le maximum"} de $f$`, 1, `Le sommet est $S(${al}\\,;${be})$ : ${a > 0 ? "minimum" : "maximum"} $${be}$ atteint en $${al}$.`],
      ["dresser le tableau de variations de $f$", 1, `La forme canonique donne le sommet $S(${al}\\,;${be})$ et $a = ${a}$ donne le sens des flèches.`],
      ["étudier le signe de $f(x)$", 2, `Les racines $${r1}$ et $${r2}$ et le signe de $a$ suffisent pour le tableau de signes.`],
      [`résoudre $f(x) = ${c}$`, 0, `$${poly([a, b, c])} = ${c} \\iff ${poly([a, b, 0])} = 0 \\iff x(${poly([a, b])}) = 0$ : on factorise par $x$.`],
      [`résoudre $f(x) = ${be}$`, 1, `$${canon(a, al, be)} = ${be} \\iff ${carre(al)} = 0 \\iff x = ${al}$.`]
    ];
    const [txt, k, expl] = pick(Q);
    return {
      enonce: `$f$ s'écrit de trois façons :\n\n- ${formes.join("\n- ")}\n\nQuelle forme est la plus adaptée pour ${txt} ?`,
      mode: "choix", choix: ["Forme développée", "Forme canonique", "Forme factorisée"], attendu: k,
      aides: ["Développée : on lit $f(0)$. Canonique : on lit le sommet. Factorisée : on lit les racines.", "Une équation $f(x) = k$ se résout facilement si, après simplification, on obtient un produit nul ou un carré nul.", `Objectif : ${txt}.`],
      solution: `**Forme ${["développée", "canonique", "factorisée"][k]}.** ${expl}`
    };
  };


  /* ---------- Première, chapitre 6 : suites géométriques (préfixe su-geo-) ---------- */
  // Évolutions successives d'un prix : 100 € ×1,04 ×1,04 ×1,04
  FIGURES["prix-evolution"] = () => {
    const v = [100, 104, 108.16, 112.4864], X = [40, 120, 200, 280];
    let s = `<svg class="graph" viewBox="0 0 320 120" role="img" aria-label="Un prix de 100 euros multiplié par 1,04 chaque année : 104, puis 108,16, puis environ 112,49 euros">`;
    v.forEach((p, i) => {
      s += `<rect x="${X[i] - 34}" y="40" width="68" height="34" rx="8" style="fill:var(--lagon-pale);stroke:var(--doux);stroke-width:1.2"/>`;
      s += `<text class="g-clabel" x="${X[i]}" y="62" text-anchor="middle" style="font-size:12px">${i === 3 ? "≈ 112,49" : vir(p)}</text>`;
      s += `<text class="g-label" x="${X[i]}" y="96" text-anchor="middle">u${"₀₁₂₃"[i]}</text>`;
      if (i < 3) s += `<path class="g-curve g-curve-1" d="M${X[i] + 10} 34 Q${X[i] + 40} 12 ${X[i + 1] - 12} 33" style="fill:none"/><path class="g-end g-curve-1" d="M${X[i + 1] - 10} 37 l-8 -3 l4 -6 z"/><text class="g-clabel g-curve-1" x="${X[i] + 40}" y="16" text-anchor="middle" style="font-size:11px">×1,04</text>`;
    });
    return s + `</svg>`;
  };
  // Raison négative : les termes changent de signe (u_n = 4 × (−0,7)^n)
  FIGURES["suite-geo-alterne"] = () => graph({ xmin: -0.5, xmax: 10.5, ymin: -3.5, ymax: 4.5, h: 240, points: Array.from({ length: 11 }, (_, n) => ({ x: n, y: 4 * (-0.7) ** n })), aria: "Points de la suite 4 × (−0,7) puissance n : un terme sur deux est négatif, et les points se rapprochent de l'axe" });
  // Dose de médicament : u_n = 500 × 0,8^n et seuil de 100 mg
  FIGURES["medicament"] = () => graph({ xmin: -0.5, xmax: 11.5, ymin: -40, ymax: 560, ystep: 50, yetiq: 100, h: 260, padL: 30, xlabel: "n (h)", ylabel: "mg", hlines: [{ y: 100, label: "100 mg" }], marques: [{ x: 8, y: 35, texte: "n = 8" }], points: Array.from({ length: 12 }, (_, n) => ({ x: n, y: 500 * 0.8 ** n })), aria: "Quantité de médicament 500 × 0,8 puissance n : elle passe sous 100 mg à partir de la 8e heure" });
  // Linéaire ou exponentiel : A = 1000 + 80n, B = 1000 × 1,06^n
  FIGURES["lineaire-exponentiel"] = () => graph({ xmin: -0.5, xmax: 16.5, ymin: 900, ymax: 2700, xstep: 1, xetiq: 2, ystep: 100, yetiq: 200, h: 280, padL: 34, xlabel: "années", curves: [{ f: (x) => 1000 + 80 * x, a: 0, b: 16, closed: false, label: "A", lx: 16, dx: 4, dy: 18 }, { f: (x) => 1000 * 1.06 ** x, a: 0, b: 16, closed: false, label: "B", lx: 15.2, dx: -4, dy: -8 }], points: Array.from({ length: 17 }, (_, n) => [{ x: n, y: 1000 + 80 * n }, { x: n, y: 1000 * 1.06 ** n, ...(n === 11 ? { label: "B passe devant", gauche: true } : {}) }]).flat(), aria: "Croissance linéaire A (+80 par an) et exponentielle B (+6 % par an) : B dépasse A à partir de la 11e année" }).replace(/(g-curve g-curve-[01]" )d/g, '$1style="stroke-dasharray:3 4" d');

  GEN["su-geo-reconnaitre"] = function () {
    const k = pick([2, 3, 5, 7]), q = pick([2, 3]);
    const T = [
      () => [`u_n = ${k} \\times ${q}^n`, q, `$u_{n+1} = ${k} \\times ${q}^{n+1} = ${q} \\times (${k} \\times ${q}^n) = ${q}u_n$ : géométrique de raison $${q}$ et de premier terme $u_0 = ${k}$.`],
      () => [`u_n = ${q}^{n+1}`, q, `$u_{n+1} = ${q}^{n+2} = ${q} \\times ${q}^{n+1} = ${q}u_n$ : géométrique de raison $${q}$ et de premier terme $u_0 = ${q}$.`],
      () => [`u_n = ${q}^{2n}`, q * q, `$u_n = (${q}^2)^n = ${q * q}^n$ : géométrique de raison $${q * q}$ (et non $${q}$), de premier terme $u_0 = 1$.`],
      () => { const d = pick([2, 4, 5]); return [`u_n = \\dfrac{${k}}{${d}^n}`, 1 / d, `$u_n = ${k} \\times \\left(\\dfrac{1}{${d}}\\right)^n$ : géométrique de raison $\\dfrac{1}{${d}} = ${nb(1 / d)}$ et de premier terme $${k}$.`]; },
      () => [`u_0 = ${k} \\text{ et } u_{n+1} = ${q}u_n`, q, `On multiplie toujours par $${q}$ : géométrique de raison $${q}$.`],
      () => [`u_n = n \\times ${q}^n`, null, `$u_1 = ${q}$, $u_2 = ${2 * q * q}$, $u_3 = ${3 * q ** 3}$ : $\\dfrac{u_2}{u_1} = ${2 * q}$ mais $\\dfrac{u_3}{u_2} = ${nb((3 * q) / 2)}$. Contre-exemple : **pas** géométrique.`],
      () => [`u_n = ${k} \\times ${q}^n + 1`, null, `$u_0 = ${k + 1}$, $u_1 = ${k * q + 1}$, $u_2 = ${k * q * q + 1}$ : $\\dfrac{u_1}{u_0} = ${frac(k * q + 1, k + 1)}$ et $\\dfrac{u_2}{u_1} = ${frac(k * q * q + 1, k * q + 1)}$ sont différents. **Pas** géométrique.`],
      () => [`u_0 = ${k} \\text{ et } u_{n+1} = u_n + ${q}`, null, `On **ajoute** $${q}$ à chaque étape : $${k}$, $${k + q}$, $${k + 2 * q}$… Les quotients $${frac(k + q, k)}$ et $${frac(k + 2 * q, k + q)}$ sont différents : la suite est arithmétique, **pas** géométrique.`]
    ];
    const [def, r, sol] = pick(T)();
    const rais = (x) => `Géométrique de raison $${x === 0.5 ? "\\dfrac{1}{2}" : x === 0.25 ? "\\dfrac{1}{4}" : x === 0.2 ? "\\dfrac{1}{5}" : x}$`;
    const non = "Pas géométrique";
    const bonne = r === null ? non : rais(r);
    const fausses = r === null ? [rais(q), rais(k), rais(q + 1)] : r < 1 ? [rais(Math.round(1 / r)), rais(k), non] : r === q * q ? [rais(q), rais(2 * q), non] : [rais(k), rais(q + 1), non];
    const c = melangeChoix(bonne, fausses);
    return {
      enonce: `La suite définie pour tout $n \\in \\mathbb{N}$ par $${def}$ est-elle géométrique ?`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Une suite est géométrique quand on passe d'un terme au suivant en **multipliant** toujours par le même nombre $q$ : $u_{n+1} = q \\times u_n$.", "Essaie d'écrire $u_{n+1}$ en fonction de $u_n$, ou calcule les premiers termes et leurs quotients.", "Pour répondre « non », un contre-exemple suffit : deux quotients consécutifs différents."],
      solution: sol
    };
  };

  GEN["su-geo-deux-termes"] = function () {
    const q = pick([2, 3, 0.5]), u0 = q === 2 ? pick([1, 3, 5]) : q === 3 ? pick([1, 2]) : pick([64, 128, 256]);
    const p = rand(1, 2), d = rand(2, 3), up = u0 * q ** p, uq = u0 * q ** (p + d), Q = Math.random() < 0.6;
    const qT = q === 0.5 ? "\\dfrac{1}{2}" : `${q}`;
    return {
      enonce: `$(u_n)$ est une suite géométrique de raison positive, avec $u_{${p}} = ${nb(up)}$ et $u_{${p + d}} = ${nb(uq)}$. ${Q ? "Quelle est sa raison $q$ ?" : "Calcule son premier terme $u_0$."}`,
      mode: "nombre", prefixe: Q ? "$q =$" : "$u_0 =$", attendu: Q ? q : u0,
      erreurs: Q ? [{ valeur: uq / up, message: `$\\dfrac{u_{${p + d}}}{u_{${p}}} = ${nb(uq / up)}$, c'est $q^{${d}}$ : il y a $${d}$ multiplications par $q$ entre ces deux termes.` }, { valeur: (uq - up) / d, message: "Ça, c'est la méthode des suites arithmétiques. Ici on **multiplie** : $u_{n+" + d + "} = u_n \\times q^{" + d + "}$." }] : [{ valeur: up / q ** (p - 1), message: `De $u_0$ à $u_{${p}}$, on multiplie $${p}$ fois par $q$.` }],
      aides: [`De $u_{${p}}$ à $u_{${p + d}}$, on multiplie $${d}$ fois par $q$ : $u_{${p + d}} = u_{${p}} \\times q^{${d}}$.`, Q ? `$q^{${d}} = \\dfrac{${nb(uq)}}{${nb(up)}} = ${nb(uq / up)}$.` : `$q^{${d}} = \\dfrac{${nb(uq)}}{${nb(up)}} = ${nb(uq / up)}$, donc $q = ${qT}$ (raison positive).`, Q ? `Cherche le nombre positif dont la puissance $${d}$ vaut $${nb(uq / up)}$ : essaie $2$, $3$, $\\dfrac{1}{2}$…` : `Puis $u_${p} = u_0 \\times q^{${p}}$, donc $u_0 = \\dfrac{u_${p}}{q^{${p}}}$.`],
      solution: `$q^{${d}} = \\dfrac{${nb(uq)}}{${nb(up)}} = ${nb(uq / up)}$ donc $q = ${qT}$. Puis $u_0 = \\dfrac{${nb(up)}}{${q === 0.5 ? `0{,}5^{${p}}` : `${q}^{${p}}`}} = ${nb(u0)}$, et $u_n = ${nb(u0)} \\times ${q === 0.5 ? "0{,}5" : q}^n$.`
    };
  };

  GEN["su-geo-taux"] = function () {
    const objet = pick(["le prix du kilo de riz", "le prix de la bouteille de gaz", "le loyer d'un appartement à Mamoudzou", "le prix du ticket de barge"]);
    if (Math.random() < 0.5) {
      let t, n, g; do { t = pick([2, 3, 4, 5, 8, 10]); n = pick([2, 3, 5, 10]); g = +(((1 + t / 100) ** n - 1) * 100).toFixed(1); } while (g - n * t < 0.3); // l'écart avec la somme des taux doit se voir
      return {
        enonce: `Pendant $${n}$ ans, ${objet} augmente de $${pc(t)}$ par an. De quel pourcentage a-t-il augmenté au total ? Arrondis au dixième.`,
        mode: "nombre", prefixe: "Hausse totale :", suffixe: "%", attendu: g, tolerance: 0.051,
        erreurs: [{ valeur: n * t, message: "Les pourcentages successifs ne s'additionnent pas : on **multiplie** les coefficients multiplicateurs." }],
        aides: [`Augmenter de $${pc(t)}$, c'est multiplier par $${nb(1 + t / 100)}$.`, `En $${n}$ ans, on multiplie par $${nb(1 + t / 100)}^{${n}} \\approx ${nb(+((1 + t / 100) ** n).toFixed(4))}$.`, "Taux global $=$ (coefficient global $- 1$) $\\times 100$."],
        solution: `Coefficient global : $${nb(1 + t / 100)}^{${n}} \\approx ${nb(+((1 + t / 100) ** n).toFixed(4))}$, soit une hausse d'environ $${pc(g)}$ (et non $${pc(n * t)}$). Les valeurs successives forment une suite géométrique de raison $${nb(1 + t / 100)}$.`
      };
    }
    let e1, e2; do { e1 = pick([10, 20, 25, 50, -10, -20, -25, -50]); e2 = pick([10, 20, 25, 50, -10, -20, -25, -50]); } while (e1 + e2 === 0 && Math.random() < 0.3);
    const c1 = 1 + e1 / 100, c2 = 1 + e2 / 100, g = +((c1 * c2 - 1) * 100).toFixed(2);
    const mot = (e) => (e > 0 ? `augmente de $${pc(e)}$` : `baisse de $${pc(-e)}$`);
    return {
      enonce: `Une année, ${objet} ${mot(e1)}, puis l'année suivante il ${mot(e2)}. Quel est le taux d'évolution global sur les deux ans ? (Écris un nombre négatif pour une baisse.)`,
      mode: "nombre", prefixe: "Taux global :", suffixe: "%", attendu: g,
      erreurs: e1 + e2 !== g ? [{ valeur: e1 + e2, message: "Les pourcentages successifs ne s'additionnent pas : on **multiplie** les coefficients multiplicateurs." }] : [],
      aides: [`Coefficients multiplicateurs : $${nb(c1)}$ puis $${nb(c2)}$.`, `Coefficient global : $${nb(c1)} \\times ${nb(c2)} = ${nb(c1 * c2)}$.`, "Taux global $=$ (coefficient global $- 1$) $\\times 100$."],
      solution: `$${nb(c1)} \\times ${nb(c2)} = ${nb(+(c1 * c2).toFixed(4))}$, donc un taux global de $${g > 0 ? "+" : ""}${pc(g)}$${e1 + e2 !== g ? ` (et non $${e1 + e2 > 0 ? "+" : ""}${pc(e1 + e2)}$)` : ""}.`
    };
  };

  GEN["su-geo-medicament"] = function () {
    const D = pick([200, 400, 500, 800, 1000]), p = pick([10, 20, 25, 30, 40, 50]), q = 1 - p / 100;
    const intro = `Au dispensaire, on injecte à un patient une dose de $${nb(D)}$ mg d'un médicament. Chaque heure, son corps en élimine $${pc(p)}$. On note $u_n$ la quantité (en mg) restant dans le sang au bout de $n$ heures.`;
    if (Math.random() < 0.5) {
      const n = rand(2, 6), v = +(D * q ** n).toFixed(1);
      return {
        enonce: `${intro} Calcule $u_{${n}}$, arrondi au dixième.`,
        mode: "nombre", prefixe: `$u_{${n}} =$`, suffixe: "mg", attendu: v, tolerance: 0.051,
        erreurs: [{ valeur: +(D * (1 - (n * p) / 100)).toFixed(1), message: `On n'enlève pas $${pc(p)}$ de la dose **de départ** à chaque heure, mais de la quantité **restante** : on multiplie par $${nb(q)}$ à chaque heure.` }, { valeur: +(D * (p / 100) ** n).toFixed(1), message: `$${nb(p / 100)}$, c'est la part éliminée. Ce qui **reste**, c'est $1 - ${nb(p / 100)} = ${nb(q)}$.` }].filter((e) => Math.abs(e.valeur - v) > 0.1),
        aides: [`Retirer $${pc(p)}$, c'est multiplier par $${nb(q)}$ : $(u_n)$ est géométrique de raison $${nb(q)}$.`, `$u_n = ${nb(D)} \\times ${nb(q)}^n$.`, `$u_{${n}} = ${nb(D)} \\times ${nb(q)}^{${n}}$.`],
        solution: `$u_{${n}} = ${nb(D)} \\times ${nb(q)}^{${n}} \\approx ${nb(v)}$ mg.`,
        figure: graph({ xmin: -0.5, xmax: n + 1.5, ymin: -D * 0.08, ymax: D * 1.12, ystep: D / 10, yetiq: D / 5, h: 240, padL: 34, xlabel: "n (h)", ylabel: "mg", points: Array.from({ length: n + 1 }, (_, k) => ({ x: k, y: D * q ** k })), aria: "Quantité de médicament heure par heure" })
      };
    }
    const A = D / pick([4, 5, 10]);
    let n = 0; while (D * q ** n >= A) n++;
    return {
      enonce: `${intro} Au bout de combien d'heures restera-t-il moins de $${nb(A)}$ mg ?`,
      mode: "nombre", prefixe: "Heures :", attendu: n,
      erreurs: [{ valeur: n - 1, message: `$u_{${n - 1}} \\approx ${nb(+(D * q ** (n - 1)).toFixed(1))}$ : ce n'est pas encore moins de $${nb(A)}$ mg.` }],
      aides: [`$u_n = ${nb(D)} \\times ${nb(q)}^n$ : la suite est décroissante.`, `Calcule les termes un par un (tableau de valeurs de la calculatrice) jusqu'à passer sous $${nb(A)}$.`, `$u_{${n - 1}} \\approx ${nb(+(D * q ** (n - 1)).toFixed(1))}$.`],
      solution: `$u_{${n - 1}} \\approx ${nb(+(D * q ** (n - 1)).toFixed(1))} \\geqslant ${nb(A)}$ et $u_{${n}} \\approx ${nb(+(D * q ** n).toFixed(1))} < ${nb(A)}$ : il faut $${n}$ heures. La suite étant décroissante, la quantité reste ensuite sous $${nb(A)}$ mg.`,
      figure: graph({ xmin: -0.5, xmax: n + 1.5, ymin: -D * 0.08, ymax: D * 1.12, ystep: D / 10, yetiq: D / 5, h: 240, padL: 34, xlabel: "n (h)", ylabel: "mg", hlines: [{ y: A, label: `${vir(A)} mg` }], points: Array.from({ length: n + 2 }, (_, k) => ({ x: k, y: D * q ** k })), aria: "Quantité de médicament heure par heure et seuil" })
    };
  };

  GEN["su-geo-somme"] = function () {
    const t = rand(0, 2);
    if (t === 2) {
      const n = rand(3, 6), S = 2 - 0.5 ** n;
      return {
        enonce: `Calcule $S = 1 + 0{,}5 + 0{,}5^2 + \\dots + 0{,}5^{${n}}$ (valeur exacte en écriture décimale).`,
        mode: "nombre", prefixe: "$S =$", attendu: S, tolerance: 1e-6,
        erreurs: [{ valeur: 2 - 0.5 ** (n - 1), message: `Il y a $${n + 1}$ termes (de $0{,}5^0$ à $0{,}5^{${n}}$) : l'exposant dans la formule est $${n + 1}$.` }],
        aides: ["$1 + q + \\dots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$ pour $q \\neq 1$.", `Ici $q = 0{,}5$ et l'exposant final est $${n}$, donc $q^{${n + 1}}$ dans la formule.`, `$S = \\dfrac{1 - 0{,}5^{${n + 1}}}{0{,}5}$.`],
        solution: `$S = \\dfrac{1 - 0{,}5^{${n + 1}}}{1 - 0{,}5} = \\dfrac{1 - ${nb(0.5 ** (n + 1))}}{0{,}5} = ${nb(S)}$.`
      };
    }
    const a = pick([1, 2, 3, 5]), q = pick([2, 3]), n = q === 2 ? rand(4, 9) : rand(3, 6);
    const S = (a * (q ** (n + 1) - 1)) / (q - 1);
    const expr = t === 0 ? `u_0 + u_1 + \\dots + u_{${n}}` : `${a} + ${a * q} + ${a * q * q} + \\dots + ${a === 1 ? "" : `${a} \\times `}${q}^{${n}}`;
    return {
      enonce: t === 0 ? `$(u_n)$ est géométrique de premier terme $u_0 = ${a}$ et de raison $${q}$. Calcule $S = ${expr}$.` : `Calcule $S = ${expr}$.`,
      mode: "nombre", prefixe: "$S =$", attendu: S,
      erreurs: [{ valeur: (a * (q ** n - 1)) / (q - 1), message: `De $u_0$ à $u_{${n}}$, il y a $${n + 1}$ termes, pas $${n}$ : l'exposant dans la formule est $${n + 1}$.` }],
      aides: [t === 0 ? "Somme de termes consécutifs d'une suite géométrique : $\\text{premier terme} \\times \\dfrac{1 - q^{\\text{nombre de termes}}}{1 - q}$." : `Les termes sont ceux de la suite géométrique de premier terme $${a}$ et de raison $${q}$ : $${a} \\times ${q}^0$, …, $${a} \\times ${q}^{${n}}$.`, `Nombre de termes : de l'exposant $0$ à l'exposant $${n}$, soit $${n + 1}$.`, `$S = ${a} \\times \\dfrac{1 - ${q}^{${n + 1}}}{1 - ${q}}$.`],
      solution: `$S = ${a} \\times \\dfrac{1 - ${q}^{${n + 1}}}{1 - ${q}} = ${a} \\times \\dfrac{${1 - q ** (n + 1)}}{${1 - q}} = ${nb(S)}$.`
    };
  };

  GEN["su-geo-python"] = function () {
    const D = pick([500, 800, 1000]), q = pick([0.8, 0.5, 0.7, 0.9]), A = pick([100, 200, 250]);
    const code = (cond) => "```python\ndef heures(A):\n    u = " + D + "\n    n = 0\n    while " + cond + ":\n        u = " + q + " * u\n        n = n + 1\n    return n\n```";
    const intro = `Une dose de $${D}$ mg de médicament diminue de $${pc(Math.round((1 - q) * 100))}$ par heure. `;
    const t = rand(0, 2);
    if (t === 1) {
      const c = melangeChoix("u >= A", ["u < A", "u == A", "n < A"]);
      return {
        enonce: intro + "La fonction doit renvoyer le nombre d'heures au bout duquel il reste **moins** de A mg. Quelle condition faut-il écrire à la place de « … » ?\n\n" + code("…"),
        mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["La boucle « while » se répète **tant que** la condition est vraie.", "On continue de multiplier tant qu'il reste **au moins** A mg.", "La boucle s'arrête dès que la quantité passe sous A."],
        solution: "Il faut continuer tant que $u \\geqslant A$ : on écrit « u >= A ». La boucle s'arrête au premier rang où $u < A$, et la fonction renvoie ce rang : c'est l'**algorithme de seuil**."
      };
    }
    if (t === 2) {
      const c = melangeChoix("Le nombre d'heures au bout duquel il reste moins de A mg", ["La quantité restant au bout de A heures", "La quantité éliminée en une heure", "La quantité restant quand la boucle s'arrête"]);
      return {
        enonce: intro + "Que représente le nombre renvoyé par heures(A) ?\n\n" + code("u >= A"),
        mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["La fonction renvoie $n$, pas $u$.", "$n$ augmente de $1$ à chaque passage dans la boucle, donc à chaque heure.", "La boucle s'arrête dès que $u < A$."],
        solution: "La fonction renvoie $n$, le nombre de passages dans la boucle : c'est le **premier** nombre d'heures au bout duquel la quantité $u$ est passée sous $A$ mg (le seuil)."
      };
    }
    const vals = [D]; while (vals[vals.length - 1] >= A) vals.push(q * vals[vals.length - 1]);
    const n = vals.length - 1;
    return {
      enonce: intro + "On considère la fonction Python :\n\n" + code("u >= A") + `\n\nQue renvoie heures(${A}) ?`,
      mode: "nombre", prefixe: "Résultat :", attendu: n,
      erreurs: [{ valeur: n - 1, message: `Après $${n - 1}$ passages, $u \\approx ${nb(+vals[n - 1].toFixed(2))}$ : la condition $u \\geqslant ${A}$ est encore vraie, la boucle continue.` }, { valeur: +vals[n].toFixed(2), message: "Ça, c'est la valeur finale de $u$. La fonction renvoie $n$." }],
      aides: [`À chaque passage, $u$ est multiplié par $${nb(q)}$ et $n$ augmente de $1$.`, `Les valeurs de $u$ : $${vals.slice(0, 3).map((v) => nb(+v.toFixed(2))).join("$ ; $")}$…`, `Continue jusqu'à ce que $u < ${A}$, en comptant les passages.`],
      solution: `$u$ prend les valeurs $${vals.map((v) => nb(+v.toFixed(2))).join("$ ; $")}$. La condition $u \\geqslant ${A}$ devient fausse après $${n}$ passages : heures(${A}) renvoie $${n}$.`
    };
  };

  // Logique : négation de « majorée », vrai ou faux avec contre-exemple
  GEN["su-geo-logique"] = function () {
    const T = [
      () => {
        const c = melangeChoix("Pour tout réel $M$, il existe un entier $n$ tel que $u_n > M$", ["Il existe un réel $M$ tel que, pour tout entier $n$, $u_n > M$", "Pour tout réel $M$ et tout entier $n$, $u_n > M$", "Il existe un entier $n$ tel que $u_n > 0$"]);
        return { enonce: "« $(u_n)$ est majorée » signifie : il existe un réel $M$ tel que, pour tout entier $n$, $u_n \\leqslant M$. Quelle est la traduction de « $(u_n)$ n'est **pas** majorée » ?", ...c, sol: "Pour nier, on échange « il existe » et « pour tout », puis on nie la fin : $u_n \\leqslant M$ devient $u_n > M$. Aucun nombre $M$ ne peut bloquer tous les termes." };
      },
      () => ({ enonce: "Vrai ou faux : « une suite géométrique de raison $q > 1$ est croissante » ?", choix: ["Vrai", "Faux"], attendu: 1, sol: "**Faux**. Contre-exemple : $u_0 = -1$ et $q = 2$ donnent $-1$, $-2$, $-4$… La suite est décroissante. Il faut aussi $u_0 > 0$." }),
      () => ({ enonce: "Vrai ou faux : « si $(u_n)$ est géométrique de raison $2$, alors $(u_n + 1)$ est aussi géométrique » ?", choix: ["Vrai", "Faux"], attendu: 1, sol: "**Faux**. Contre-exemple : $u_n = 2^n$ donne $u_n + 1$ : $2$, $3$, $5$, $9$… Les quotients $\\dfrac{3}{2}$ et $\\dfrac{5}{3}$ sont différents." }),
      () => ({ enonce: "Vrai ou faux : « la suite définie par $u_n = 2^n$ n'est pas majorée » ?", choix: ["Vrai", "Faux"], attendu: 0, sol: "**Vrai**. Quel que soit le nombre $M$, les puissances de $2$ finissent par le dépasser : par exemple $2^{10} = 1\\,024 > 1\\,000$ et $2^{20} > 1\\,000\\,000$. Aucun $M$ ne bloque tous les termes." }),
      () => ({ enonce: "Vrai ou faux : « une hausse de $2\\,\\%$ par an pendant $10$ ans fait une hausse de $20\\,\\%$ » ?", choix: ["Vrai", "Faux"], attendu: 1, sol: "**Faux**. Le coefficient global est $1{,}02^{10} \\approx 1{,}219$ : la hausse est d'environ $21{,}9\\,\\%$. Les pourcentages successifs ne s'additionnent pas." }),
      () => ({ enonce: "Vrai ou faux : « si $0 < q < 1$, la suite géométrique $u_n = u_0 \\times q^n$ est décroissante » ?", choix: ["Vrai", "Faux"], attendu: 1, sol: "**Faux**. Contre-exemple : $u_0 = -8$ et $q = 0{,}5$ donnent $-8$, $-4$, $-2$… La suite est croissante. Avec $u_0 > 0$, l'affirmation devient vraie." }),
      () => ({ enonce: "Vrai ou faux : « la suite géométrique de premier terme $8$ et de raison $0{,}5$ est majorée par $8$ » ?", choix: ["Vrai", "Faux"], attendu: 0, sol: "**Vrai**. $u_0 = 8 > 0$ et $0 < q < 1$ : la suite est décroissante, donc pour tout $n$, $u_n \\leqslant u_0 = 8$." }),
      () => ({ enonce: "Vrai ou faux : « une suite dont les termes changent de signe n'a pas de limite » ?", choix: ["Vrai", "Faux"], attendu: 1, sol: "**Faux**. Contre-exemple : $u_n = 4 \\times (-0{,}5)^n$ donne $4$, $-2$, $1$, $-0{,}5$… Les termes changent de signe mais se rapprochent de $0$ : la limite est $0$." })
    ];
    const r = pick(T)();
    return {
      enonce: r.enonce, mode: "choix", choix: r.choix, attendu: r.attendu,
      aides: ["« Pour tout » se réfute avec **un seul** contre-exemple.", "Pense aux cas particuliers : premier terme négatif, raison négative, raison entre $0$ et $1$.", "Pour nier une phrase, « pour tout » devient « il existe » et inversement."],
      solution: r.sol
    };
  };

  GEN["su-geo-limite"] = function () {
    const T = [
      () => { const k = pick([200, 50, 3]), q = pick([1.05, 1.2, 2, 3]); return [`${k} \\times ${nb(q)}^n`, "+\\infty", `$q = ${nb(q)} > 1$ : $${nb(q)}^n$ devient aussi grand qu'on veut, et $${k} > 0$. Limite $+\\infty$.`]; },
      () => { const k = pick([2, 5]), q = pick([1.5, 2, 3]); return [`-${k} \\times ${nb(q)}^n`, "-\\infty", `$${nb(q)}^n$ tend vers $+\\infty$ et on multiplie par $-${k} < 0$ : limite $-\\infty$.`]; },
      () => { const k = pick([1000, 500, 8]), q = pick([0.3, 0.5, 0.9, -0.5]); return [`${k} \\times ${q < 0 ? `(${nb(q)})` : nb(q)}^n`, "0", `$-1 < ${nb(q)} < 1$ : $${q < 0 ? `(${nb(q)})` : nb(q)}^n$ se rapproche de $0$${q < 0 ? " (en changeant de signe)" : ""}. Limite $0$.`]; },
      () => { const k = pick([3, 2]), q = pick([-2, -1, -1.5]); return [`${k} \\times (${nb(q)})^n`, "\\text{pas de limite}", `$q = ${nb(q)} \\leqslant -1$ : les termes changent de signe ${q === -1 ? "en valant alternativement $" + k + "$ et $-" + k + "$" : "en s'éloignant de $0$"}. Pas de limite.`]; },
      () => { const c = pick([5, 150, 3]), k = pick([2, 150, 4]), q = pick([0.5, 0.6, 0.8]); return [`${c} - ${k} \\times ${nb(q)}^n`, `${c}`, `$${nb(q)}^n$ tend vers $0$, donc $${k} \\times ${nb(q)}^n$ aussi : $u_n$ se rapproche de $${c}$.`]; }
    ];
    const [expr, bonne, sol] = pick(T)();
    const tous = ["+\\infty", "-\\infty", "0", "\\text{pas de limite}", "1"];
    const c = melangeChoix(bonne, shuffle(tous.filter((x) => x !== bonne)).slice(0, 3));
    return {
      enonce: `Conjecture la limite de la suite définie par $u_n = ${expr}$.`,
      mode: "choix", choix: c.choix.map((x) => (x === "\\text{pas de limite}" ? "Pas de limite" : `$${x}$`)), attendu: c.attendu,
      aides: ["Regarde d'abord $q^n$ : si $q > 1$, limite $+\\infty$ ; si $-1 < q < 1$, limite $0$ ; si $q \\leqslant -1$, pas de limite.", "Puis tiens compte du nombre qui multiplie (son signe) et de ce qu'on ajoute.", "Vérifie avec le tableau de valeurs de la calculatrice : $n = 10$, $50$, $100$."],
      solution: sol
    };
  };


  /* ---------- Première, chapitre 7 : dérivation, point de vue local (préfixe d1-) ---------- */
  const polyD = (c, v) => poly(c, v).replace(/(\d)\.(\d)/g, "$1{,}$2"); // polynôme avec virgule décimale
  // Droite y = m x + p en TeX (m et p éventuellement décimaux)
  const d1Droite = (m, p) => {
    const mx = m === 0 ? "" : m === 1 ? "x" : m === -1 ? "-x" : `${nb(m)}x`;
    if (!mx) return `y = ${nb(p)}`;
    return `y = ${mx}${p ? ` ${p < 0 ? "-" : "+"} ${nb(Math.abs(p))}` : ""}`;
  };
  // Plus grand intervalle autour de a (|x - a| <= w) où la fonction reste dans [y0 ; y1]
  function d1Domaine(f, a, w, y0, y1) {
    let g = a, d = a;
    while (g - 0.05 >= a - w && f(g - 0.05) >= y0 && f(g - 0.05) <= y1) g -= 0.05;
    while (d + 0.05 <= a + w && f(d + 0.05) >= y0 && f(d + 0.05) <= y1) d += 0.05;
    return [+g.toFixed(2), +d.toFixed(2)];
  }
  const d1Par = (x) => (x < 0 ? `(${nb(x)})` : nb(x)); // décimal négatif entre parenthèses
  const tiret = (svg, i) => svg.replace(new RegExp(`(g-curve g-curve-${i}" )d`), '$1style="stroke-dasharray:5 4" d');

  // Taux de variation : pente de la sécante (AB) à la parabole y = x²
  FIGURES["secante"] = () => graph({ xmin: -0.8, xmax: 4.2, ymin: -1.5, ymax: 12.5, ystep: 1, yetiq: 2, h: 300, curves: [{ f: (x) => x * x, a: -0.6, b: 3.5, closed: false, label: "y = x²", lx: 3.3, dx: -10, dy: 6 }, { f: (x) => 4 * x - 3, a: 0.45, b: 3.8, closed: false }], fleches: [{ x1: 1, y1: 1, x2: 3, y2: 1, c: 1, label: "+2" }, { x1: 3, y1: 1, x2: 3, y2: 9, c: 1, label: "+8" }], points: [{ x: 1, y: 1, label: "A", gauche: true }, { x: 3, y: 9, label: "B", gauche: true }], aria: "Sécante (AB) à la parabole y = x² entre 1 et 3 : on avance de 2 et on monte de 8, la pente vaut 4" });
  // Les sécantes (AM) tendent vers la tangente en A quand M se rapproche de A
  FIGURES["secantes-tangente"] = () => {
    const f = (x) => x * x, cs = [{ f, a: -0.8, b: 3.3, closed: false }];
    const ligne = (m) => { const g = (x) => m * (x - 1) + 1, [a, b] = d1Domaine(g, 1, 2.5, -1.8, 10.5); return { f: g, a, b, closed: false }; };
    cs.push(Object.assign(ligne(2), { label: "tangente", lx: 2.5, dx: 46, dy: 16 }), ligne(4), ligne(3), ligne(2.5));
    let s = graph({ xmin: -1, xmax: 3.6, ymin: -2, ymax: 11, ystep: 1, yetiq: 2, h: 300, curves: cs, points: [{ x: 1, y: 1, label: "A", gauche: true }, { x: 3, y: 9, label: "M₁", gauche: true }, { x: 2, y: 4, label: "M₂", gauche: true }, { x: 1.5, y: 2.25 }], aria: "Les sécantes (AM) de pentes 4, 3 et 2,5 se rapprochent de la tangente en A, de pente 2, quand M se rapproche de A" });
    [2, 3, 4].forEach((i) => { s = tiret(s, i); });
    return s;
  };
  // Lire un nombre dérivé : la tangente en A(1 ; 2) a pour pente 3
  FIGURES["tangente-lecture"] = () => {
    const f = (x) => -0.5 * (x - 1) ** 2 + 3 * (x - 1) + 2, t = (x) => 3 * (x - 1) + 2;
    const [a, b] = d1Domaine(f, 1, 3.4, -2.8, 7.8), [ta, tb] = d1Domaine(t, 1, 3, -2.8, 7.8);
    return graph({ xmin: -1.5, xmax: 4.5, ymin: -3, ymax: 8, h: 300, curves: [{ f, a, b, closed: false, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: b, dx: -2, dy: 16 }, { f: t, a: ta, b: tb, closed: false }], fleches: [{ x1: 1, y1: 2, x2: 2, y2: 2, c: 1, label: "+1" }, { x1: 2, y1: 2, x2: 2, y2: 5, c: 1, label: "+3" }], points: [{ x: 1, y: 2, label: "A", gauche: true }], aria: "Tangente en A(1 ; 2) : on avance de 1, on monte de 3, donc f'(1) = 3" });
  };
  // Vitesse du taxi : d(t) = 0,8t², sécante entre 5 et 10, tangente en 10
  FIGURES["taxi-vitesse"] = () => tiret(graph({ xmin: -0.8, xmax: 11.5, ymin: -8, ymax: 92, ystep: 10, yetiq: 20, h: 280, padL: 26, xlabel: "t (s)", ylabel: "d (m)", curves: [{ f: (t) => 0.8 * t * t, a: 0, b: 10.6, closed: false }, { f: (t) => 16 * t - 80, a: 5.3, b: 10.7, closed: false, label: "tangente", lx: 8.5, dx: 54, dy: 8 }, { f: (t) => 12 * t - 40, a: 3.6, b: 10.6, closed: false }], points: [{ x: 5, y: 20, label: "t = 5", gauche: true }, { x: 10, y: 80, label: "t = 10", gauche: true }], aria: "Distance parcourue par le taxi : la sécante entre 5 et 10 s a pour pente 12 (vitesse moyenne), la tangente en 10 s a pour pente 16 (vitesse instantanée)" }), 2);

  GEN["d1-taux"] = function () {
    const t = rand(0, 3);
    let fTex, f, a, b, tau, tauTex, sol;
    if (t === 0) { const p = pick([1, 2, -1, 3]), q = rand(-4, 4), r = rand(-5, 5); fTex = poly([p, q, r]); f = (x) => p * x * x + q * x + r; a = rand(-3, 2); b = a + rand(1, 4); tau = p * (a + b) + q; tauTex = `${tau}`; }
    else if (t === 1) { const k = pick([1, 2, 3, 4, 6, 12]); fTex = k === 1 ? "\\dfrac{1}{x}" : `\\dfrac{${k}}{x}`; f = (x) => k / x; [a, b] = pick([[1, 2], [1, 3], [2, 4], [1, 4], [2, 3], [3, 6]]); tau = -k / (a * b); tauTex = frac(-k, a * b); }
    else if (t === 2) { [a, b] = pick([[1, 4], [4, 9], [1, 9], [9, 16], [0, 4], [4, 16]]); fTex = "\\sqrt{x}"; f = Math.sqrt; tau = (Math.sqrt(b) - Math.sqrt(a)) / (b - a); tauTex = frac(Math.sqrt(b) - Math.sqrt(a), b - a); }
    else { const m = randNZ(-4, 4), p = rand(-5, 5); fTex = poly([m, p]); f = (x) => m * x + p; a = rand(-3, 2); b = a + rand(2, 5); tau = m; tauTex = `${m}`; }
    const fa = +f(a).toFixed(6), fb = +f(b).toFixed(6), num = +(fb - fa).toFixed(6);
    const fr2 = (x) => (Number.isInteger(x) ? `${x}` : t === 1 ? frac(Math.round(x * 12 * 12), 144) : nb(x));
    sol = `$\\dfrac{f(${b}) - f(${a})}{${b} - ${par(a)}} = \\dfrac{${fr2(fb)} - ${par(fr2(fa))}}{${b - a}} = ${tauTex}$.${t === 3 ? " Pour une fonction affine, le taux est toujours le coefficient directeur." : ""} C'est la pente de la sécante passant par les points d'abscisses $${a}$ et $${b}$.`;
    return {
      enonce: `Calcule le taux de variation de $f(x) = ${fTex}$ entre $${a}$ et $${b}$.`,
      mode: "nombre", prefixe: "Taux :", attendu: tau,
      erreurs: [{ valeur: num, message: `N'oublie pas de diviser par $${b} - ${par(a)} = ${b - a}$.` }, ...(num ? [{ valeur: (b - a) / num, message: "C'est l'inverse : on divise la variation de $f$ par la variation de $x$." }] : [])].filter((e) => Math.abs(e.valeur - tau) > 1e-9),
      aides: ["Taux de variation entre $a$ et $b$ : $\\dfrac{f(b) - f(a)}{b - a}$.", `$f(${a}) = ${fr2(fa)}$ et $f(${b}) = ${fr2(fb)}$.`, t === 1 || t === 2 ? "Donne une fraction, par exemple $-1/2$ ou $1/3$." : `Calcule $\\dfrac{${fr2(fb)} - ${par(fr2(fa))}}{${b - a}}$.`],
      solution: sol
    };
  };

  GEN["d1-nombre-derive"] = function () {
    if (Math.random() < 0.3) {
      const k = pick([1, 2, 3, 4]), a = pick([1, 2, -1, -2, 3, 4]);
      const fTex = k === 1 ? "\\dfrac{1}{x}" : `\\dfrac{${k}}{x}`, rep = -k / (a * a);
      return {
        enonce: `$f(x) = ${fTex}$. En calculant la limite du taux de variation, détermine $f'(${a})$.`,
        mode: "nombre", prefixe: `$f'(${a}) =$`, attendu: rep,
        erreurs: [{ valeur: k / (a * a), message: "Attention au signe : $\\dfrac{k}{a + h} - \\dfrac{k}{a}$ est négatif pour $h > 0$." }, { valeur: -k / a, message: `Le dénominateur devient $${par(a)} \\times ${par(a)}$ quand $h$ tend vers $0$.` }].filter((e) => Math.abs(e.valeur - rep) > 1e-9),
        aides: [`$f(${a} + h) - f(${a}) = \\dfrac{${k}}{${a} + h} - \\dfrac{${k}}{${a}}$ : mets au même dénominateur.`, `On obtient $\\dfrac{${-k}h}{${a}(${a} + h)}$, donc le taux vaut $\\dfrac{${-k}}{${a}(${a} + h)}$.`, "Quand $h$ se rapproche de $0$, $" + a + " + h$ se rapproche de $" + a + "$. Donne une fraction, par exemple $-1/4$."],
        solution: `$\\dfrac{f(${a} + h) - f(${a})}{h} = \\dfrac{${-k}}{${a}(${a} + h)}$, qui se rapproche de $\\dfrac{${-k}}{${a * a}}$ quand $h$ tend vers $0$. Donc $f'(${a}) = ${frac(-k, a * a)}$.`
      };
    }
    const p = pick([1, 1, 2, -1, 3, -2]), q = rand(-5, 5), r = rand(-6, 6), a = rand(-3, 4);
    const rep = 2 * p * a + q, fa = p * a * a + q * a + r;
    const taux = `${rep}${p === 1 ? " + h" : p === -1 ? " - h" : ` ${p < 0 ? "-" : "+"} ${Math.abs(p)}h`}`;
    return {
      enonce: `$f(x) = ${poly([p, q, r])}$. En calculant la limite du taux de variation, détermine $f'(${a})$.`,
      mode: "nombre", prefixe: `$f'(${a}) =$`, attendu: rep,
      erreurs: [{ valeur: fa, message: `Ça, c'est l'image $f(${a})$. Le nombre dérivé est la limite du **taux de variation**.` }, { valeur: rep + p, message: "Ça, c'est le taux pour $h = 1$ (une sécante). Fais tendre $h$ vers $0$." }, { valeur: 2 * p * a, message: `Il manque la contribution du terme $${q}x$.` }].filter((e) => e.valeur !== rep && (e.valeur !== 2 * p * a || q !== 0)),
      aides: [`Développe $f(${a} + h) = ${p === 1 ? "" : p === -1 ? "-" : p}(${a} + h)^2 ${q ? `${sg(q)}(${a} + h)` : ""} ${r ? sg(r) : ""}$.`, `$f(${a} + h) - f(${a}) = ${poly([p, rep, 0], "h")} = h(${taux})$.`, `Le taux vaut $${taux}$ : que devient-il quand $h$ se rapproche de $0$ ?`],
      solution: `$\\dfrac{f(${a} + h) - f(${a})}{h} = ${taux}$ pour $h \\neq 0$. Quand $h$ se rapproche de $0$, ce taux se rapproche de $${rep}$ : $f'(${a}) = ${rep}$.`
    };
  };

  GEN["d1-lire"] = function () {
    const a = rand(-1, 2), ya = rand(-1, 3), m = pick([-2, -1, -0.5, 0, 0.5, 1, 2, 3]), c = pick([0.5, -0.5, 0.4, -0.4]);
    const f = (x) => c * (x - a) ** 2 + m * (x - a) + ya, t = (x) => m * (x - a) + ya;
    const xmin = Math.min(a - 3, -1) - 0.5, xmax = Math.max(a + 3, 1) + 0.5, ymin = Math.min(ya - 4, -1) - 0.5, ymax = Math.max(ya + 4, 1) + 0.5;
    const [fa, fb] = d1Domaine(f, a, 3.2, ymin + 0.3, ymax - 0.3), [ta, tb] = d1Domaine(t, a, 2.6, ymin + 0.3, ymax - 0.3);
    const base = { xmin, xmax, ymin, ymax, h: 280, curves: [{ f, a: fa, b: fb, closed: false, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: fb, dx: -6, dy: -10 }, { f: t, a: ta, b: tb, closed: false }], aria: "Courbe de f et sa tangente au point A" };
    const pas = m === 0.5 || m === -0.5 ? 2 : 1;
    const fl = m === 0 ? [{ x1: a, y1: ya, x2: a + 1, y2: ya, c: 1, label: "+1" }] : [{ x1: a, y1: ya, x2: a + pas, y2: ya, c: 1, label: `+${pas}` }, { x1: a + pas, y1: ya, x2: a + pas, y2: ya + m * pas, c: 1, label: `${m * pas > 0 ? "+" : "−"}${Math.abs(m * pas)}` }];
    const figure = graph({ ...base, points: [{ x: a, y: ya, label: "A", gauche: true }] }), figureSolution = graph({ ...base, fleches: fl, points: [{ x: a, y: ya, label: "A", gauche: true }] });
    const lecture = m === 0 ? "La tangente est horizontale : sa pente est nulle." : `En partant de A, on avance de $${pas}$ et on ${m > 0 ? "monte" : "descend"} de $${nb(Math.abs(m * pas))}$ : la pente vaut $${pas === 2 ? `\\dfrac{${m * pas}}{2} = ` : ""}${nb(m)}$.`;
    if (Math.random() < 0.6) {
      return {
        enonce: `On a tracé la courbe de $f$ et sa tangente au point $A$ d'abscisse $${a}$. Lis $f'(${a})$.`,
        mode: "nombre", prefixe: `$f'(${a}) =$`, attendu: m, figure, figureSolution,
        erreurs: [{ valeur: ya, message: `$${ya}$, c'est $f(${a})$, l'ordonnée de A. Le nombre dérivé est la **pente** de la tangente.` }, ...(m ? [{ valeur: -m, message: `Attention au sens : la tangente ${m > 0 ? "monte" : "descend"} quand on va vers la droite.` }] : [])].filter((e) => e.valeur !== m),
        aides: ["$f'(a)$ est le coefficient directeur (la pente) de la tangente au point d'abscisse $a$.", "Pars de A, avance d'une unité vers la droite et regarde de combien la tangente monte ou descend.", m === 0.5 || m === -0.5 ? "Si c'est difficile à lire, avance de $2$ unités puis divise par $2$." : "Vérifie avec un deuxième point de la tangente bien placé sur le quadrillage."],
        solution: `${lecture} Donc $f'(${a}) = ${nb(m)}$.`
      };
    }
    const p = +(ya - m * a).toFixed(2);
    const bonne = `$${d1Droite(m, p)}$`;
    const c2 = melangeChoix(bonne, [`$${d1Droite(m, ya)}$`, `$${d1Droite(m, +(ya + m * a).toFixed(2))}$`, `$${d1Droite(-m, +(ya + m * a).toFixed(2))}$`, `$${d1Droite(ya, m)}$`, `$${d1Droite(m + 1, p)}$`]);
    return {
      enonce: `On a tracé la courbe de $f$ et sa tangente au point $A$ d'abscisse $${a}$. Quelle est l'équation réduite de cette tangente ?`,
      mode: "choix", choix: c2.choix, attendu: c2.attendu, figure, figureSolution,
      aides: [`Lis $f(${a})$ (l'ordonnée de A) et $f'(${a})$ (la pente de la tangente).`, "Équation de la tangente : $y = f'(a)(x - a) + f(a)$.", `Ici $f(${a}) = ${ya}$ ; remplace et développe.`],
      solution: `$f(${a}) = ${ya}$ et ${lecture.charAt(0).toLowerCase() + lecture.slice(1)} Donc $y = ${a === 0 ? `${nb(m)}x` : `${nb(m)}(x ${a < 0 ? "+" : "-"} ${Math.abs(a)})`} ${sg(ya)}$, soit $${d1Droite(m, p)}$.`
    };
  };

  GEN["d1-tangente-eq"] = function () {
    const a = randNZ(-3, 4), fa = rand(-5, 6), m = randNZ(-4, 5), p = fa - m * a;
    if (Math.random() < 0.5) {
      return {
        enonce: `On sait que $f(${a}) = ${fa}$ et $f'(${a}) = ${m}$. La tangente à la courbe de $f$ au point d'abscisse $${a}$ a pour équation réduite $y = mx + p$. Que vaut $p$ ?`,
        mode: "nombre", prefixe: "$p =$", attendu: p,
        erreurs: [{ valeur: fa + m * a, message: `Attention au signe : $x - a = x - ${par(a)}$.` }, { valeur: fa, message: `$${fa}$, c'est $f(${a})$ ; l'ordonnée à l'origine s'obtient en développant.` }].filter((e) => e.valeur !== p),
        aides: ["$y = f'(a)(x - a) + f(a)$.", `$y = ${m}(x - ${par(a)}) ${sg(fa)}$.`, `Développe : $${m}x ${sg(-m * a)} ${sg(fa)}$.`],
        solution: `$y = ${m}(x - ${par(a)}) ${sg(fa)} = ${m}x ${sg(-m * a)} ${sg(fa)}$, donc $${d1Droite(m, p)}$ et $p = ${p}$.`
      };
    }
    const bonne = `$${d1Droite(m, p)}$`;
    const c = melangeChoix(bonne, [`$${d1Droite(m, fa + m * a)}$`, `$${d1Droite(fa, m)}$`, `$${d1Droite(m, fa)}$`, `$${d1Droite(-m, p)}$`]);
    return {
      enonce: `On sait que $f(${a}) = ${fa}$ et $f'(${a}) = ${m}$. Quelle est l'équation réduite de la tangente à la courbe de $f$ au point d'abscisse $${a}$ ?`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["La tangente passe par $A(a\\,;f(a))$ et a pour coefficient directeur $f'(a)$.", "$y = f'(a)(x - a) + f(a)$.", `$y = ${m}(x - ${par(a)}) ${sg(fa)}$ : développe.`],
      solution: `$y = ${m}(x - ${par(a)}) ${sg(fa)} = ${d1Droite(m, p).slice(4)}$. Vérification : pour $x = ${a}$, on trouve bien $y = ${fa}$.`
    };
  };

  GEN["d1-approx"] = function () {
    const t = rand(0, 2);
    let enonce, rep, aides, sol, exact;
    if (t === 0) {
      const a = pick([2, 3, 5, 10]), h = pick([0.01, 0.02, -0.01, 0.1, 0.03]);
      rep = +(a * a + 2 * a * h).toFixed(6); exact = +((a + h) ** 2).toFixed(6);
      enonce = `$f(x) = x^2$, et on admet que $f'(${a}) = ${2 * a}$. Donne la valeur approchée de $${nb(a + h)}^2$ obtenue par approximation linéaire.`;
      aides = ["$f(a + h) \\approx f(a) + f'(a) \\times h$ quand $h$ est proche de $0$.", `Ici $a = ${a}$ et $h = ${nb(h)}$.`, `$${a * a} + ${2 * a} \\times ${d1Par(h)}$.`];
      sol = `$${nb(a + h)}^2 \\approx ${a * a} + ${2 * a} \\times ${d1Par(h)} = ${nb(rep)}$. La valeur exacte est $${nb(exact)}$ : l'erreur est très petite.`;
    } else if (t === 1) {
      const a = pick([1, 2, 4, 5]), h = pick([0.01, 0.02, 0.1, -0.02]);
      rep = +(1 / a - h / (a * a)).toFixed(6); exact = 1 / (a + h);
      enonce = `$f(x) = \\dfrac{1}{x}$, et on admet que $f'(${a}) = ${frac(-1, a * a)}$. Donne la valeur approchée de $\\dfrac{1}{${nb(a + h)}}$ obtenue par approximation linéaire.`;
      aides = ["$f(a + h) \\approx f(a) + f'(a) \\times h$ quand $h$ est proche de $0$.", `Ici $a = ${a}$, $h = ${nb(h)}$ et $f(${a}) = ${nb(1 / a)}$.`, `$${nb(1 / a)} + \\left(${frac(-1, a * a)}\\right) \\times ${d1Par(h)}$.`];
      sol = `$\\dfrac{1}{${nb(a + h)}} \\approx ${nb(1 / a)} + \\left(${frac(-1, a * a)}\\right) \\times ${d1Par(h)} = ${nb(rep)}$. La calculatrice donne $${nb(+exact.toFixed(6))}$…`;
    } else {
      const a = rand(1, 4), fa = rand(-3, 8), m = randNZ(-5, 5), h = pick([0.1, 0.2, -0.1, 0.05]);
      rep = +(fa + m * h).toFixed(6);
      enonce = `On sait que $f(${a}) = ${fa}$ et $f'(${a}) = ${m}$. Donne une valeur approchée de $f(${nb(a + h)})$ par approximation linéaire.`;
      aides = ["$f(a + h) \\approx f(a) + f'(a) \\times h$ quand $h$ est proche de $0$.", `$${nb(a + h)} = ${a} + ${d1Par(h)}$, donc $h = ${nb(h)}$.`, `$${fa} + ${m} \\times ${d1Par(h)}$.`];
      sol = `$f(${nb(a + h)}) \\approx ${fa} + ${m} \\times ${d1Par(h)} = ${nb(rep)}$. On remplace la courbe par sa tangente près du point d'abscisse $${a}$.`;
    }
    return { enonce, mode: "nombre", prefixe: "Valeur approchée :", attendu: rep, tolerance: 1e-6, aides, solution: sol };
  };

  GEN["d1-vitesse"] = function () {
    const k = pick([0.5, 1, 1.5]), base = `Sur la route de Sada, un taxi démarre. La distance parcourue (en m) au bout de $t$ secondes est $d(t) = ${k === 1 ? "" : nb(k)}t^2$ (pour $t \\leqslant 10$).`;
    const opts = { xmin: -0.8, xmax: 11, ymin: -k * 8, ymax: k * 110, ystep: k * 10, yetiq: k * 20, h: 260, padL: 30, xlabel: "t (s)", ylabel: "d (m)" };
    const courbe = { f: (t) => k * t * t, a: 0, b: 10.2, closed: false };
    if (Math.random() < 0.5) {
      const t1 = rand(1, 5), t2 = t1 + rand(2, 5), v = k * (t1 + t2);
      return {
        enonce: `${base} Quelle est sa vitesse moyenne (en m/s) entre $t = ${t1}$ et $t = ${t2}$ ?`,
        mode: "nombre", prefixe: "Vitesse moyenne :", suffixe: "m/s", attendu: v,
        erreurs: [{ valeur: k * (t2 * t2 - t1 * t1), message: `C'est la distance parcourue ; divise-la par la durée $${t2 - t1}$ s.` }],
        aides: ["Vitesse moyenne $=$ distance parcourue $\\div$ durée : c'est le **taux de variation** de $d$.", `$d(${t1}) = ${nb(k * t1 * t1)}$ et $d(${t2}) = ${nb(k * t2 * t2)}$.`, `$\\dfrac{${nb(k * t2 * t2)} - ${nb(k * t1 * t1)}}{${t2} - ${t1}}$.`],
        solution: `$\\dfrac{d(${t2}) - d(${t1})}{${t2} - ${t1}} = \\dfrac{${nb(k * (t2 * t2 - t1 * t1))}}{${t2 - t1}} = ${nb(v)}$ m/s : c'est la pente de la sécante.`,
        figure: graph({ ...opts, curves: [courbe] }),
        figureSolution: graph({ ...opts, curves: [courbe, { f: (t) => v * (t - t1) + k * t1 * t1, a: t1, b: t2, closed: true }], points: [{ x: t1, y: k * t1 * t1 }, { x: t2, y: k * t2 * t2 }] })
      };
    }
    const t0 = rand(2, 8), v = 2 * k * t0;
    return {
      enonce: `${base} En calculant la limite du taux de variation, détermine sa vitesse instantanée (en m/s) à $t = ${t0}$.`,
      mode: "nombre", prefixe: `$d'(${t0}) =$`, suffixe: "m/s", attendu: v,
      erreurs: [{ valeur: k * t0, message: `Ça, c'est la vitesse moyenne entre $0$ et $${t0}$. La vitesse instantanée est le nombre dérivé $d'(${t0})$.` }, { valeur: k * t0 * t0, message: `Ça, c'est la distance $d(${t0})$.` }].filter((e) => e.valeur !== v),
      aides: [`$d(${t0} + h) - d(${t0}) = ${k === 1 ? "" : nb(k)}\\left((${t0} + h)^2 - ${t0 * t0}\\right) = ${k === 1 ? "" : nb(k)}(${2 * t0}h + h^2)$.`, `Le taux vaut $${nb(2 * k * t0)} ${k === 1 ? "+ h" : `+ ${nb(k)}h`}$.`, "Fais tendre $h$ vers $0$."],
      solution: `$\\dfrac{d(${t0} + h) - d(${t0})}{h} = ${nb(2 * k * t0)} + ${k === 1 ? "" : nb(k)}h$, qui se rapproche de $${nb(v)}$ : la vitesse instantanée est $d'(${t0}) = ${nb(v)}$ m/s, soit $${nb(+(v * 3.6).toFixed(1))}$ km/h. C'est la pente de la tangente.`,
      figure: graph({ ...opts, curves: [courbe] }),
      figureSolution: graph({ ...opts, curves: [courbe, (() => { const g = (t) => v * (t - t0) + k * t0 * t0, [a, b] = d1Domaine(g, t0, 3, opts.ymin + 1, opts.ymax - 1); return { f: g, a, b, closed: false }; })()], points: [{ x: t0, y: k * t0 * t0 }] })
    };
  };

  GEN["d1-marginal"] = function () {
    const al = pick([0.01, 0.02, 0.05]), be = pick([1, 2, 3, 5]), ga = pick([50, 100, 200]), q0 = pick([20, 50, 100]);
    const CTex = `${nb(al)}q^2 + ${be}q + ${ga}`, Cm = +(2 * al * q0 + be).toFixed(6), diff = +(2 * al * q0 + al + be).toFixed(6);
    const intro = `Une coopérative de Bandrélé fabrique des pots de confiture de mangue. Le coût de fabrication de $q$ pots est $C(q) = ${CTex}$ euros.`;
    const t = rand(0, 2);
    if (t === 2) {
      const c = melangeChoix(`Le coût de fabrication du ${q0 + 1}e pot, environ`, [`Le coût total des ${q0} premiers pots`, "Le coût moyen d'un pot", `Le bénéfice réalisé sur ${q0} pots`]);
      return {
        enonce: `${intro} On trouve $C'(${q0}) = ${nb(Cm)}$. Que représente ce nombre ?`,
        mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["$C'(q_0)$ est la limite du taux $\\dfrac{C(q_0 + h) - C(q_0)}{h}$.", "Pour $h = 1$, ce taux vaut $C(q_0 + 1) - C(q_0)$ : le coût d'un pot de plus.", "On l'appelle le **coût marginal**."],
        solution: `$C'(${q0})$ est le **coût marginal** : il donne environ le coût de fabrication d'un pot supplémentaire, le ${q0 + 1}e. Ici $C(${q0 + 1}) - C(${q0}) = ${nb(diff)}$ €, très proche de $${nb(Cm)}$ €.`
      };
    }
    if (t === 1) {
      return {
        enonce: `${intro} Combien coûte la fabrication du ${q0 + 1}e pot, c'est-à-dire $C(${q0 + 1}) - C(${q0})$ ?`,
        mode: "nombre", prefixe: "Coût :", suffixe: "€", attendu: diff, tolerance: 1e-6,
        erreurs: [{ valeur: +(al * (q0 + 1) ** 2 + be * (q0 + 1) + ga).toFixed(6), message: "Ça, c'est le coût total de $" + (q0 + 1) + "$ pots. On demande le coût du dernier seulement." }],
        aides: [`$C(${q0}) = ${nb(al)} \\times ${q0 * q0} + ${be} \\times ${q0} + ${ga} = ${nb(al * q0 * q0 + be * q0 + ga)}$.`, `$C(${q0 + 1}) = ${nb(al)} \\times ${(q0 + 1) ** 2} + ${be} \\times ${q0 + 1} + ${ga}$.`, "Fais la différence."],
        solution: `$C(${q0 + 1}) - C(${q0}) = ${nb(+(al * (q0 + 1) ** 2 + be * (q0 + 1) + ga).toFixed(6))} - ${nb(al * q0 * q0 + be * q0 + ga)} = ${nb(diff)}$ €. C'est presque le coût marginal $C'(${q0}) = ${nb(Cm)}$ €.`
      };
    }
    return {
      enonce: `${intro} En calculant la limite du taux de variation, détermine le coût marginal $C'(${q0})$.`,
      mode: "nombre", prefixe: `$C'(${q0}) =$`, suffixe: "€", attendu: Cm, tolerance: 1e-6,
      erreurs: [{ valeur: diff, message: "Ça, c'est le taux pour $h = 1$. Le coût marginal est la **limite** quand $h$ tend vers $0$." }],
      aides: [`$C(${q0} + h) - C(${q0}) = ${nb(al)}\\left((${q0} + h)^2 - ${q0 * q0}\\right) + ${be}h$.`, `$= ${nb(al)}(${2 * q0}h + h^2) + ${be}h = h(${nb(2 * al * q0)} + ${nb(al)}h + ${be})$.`, "Simplifie par $h$, puis fais tendre $h$ vers $0$."],
      solution: `$\\dfrac{C(${q0} + h) - C(${q0})}{h} = ${nb(Cm)} + ${nb(al)}h$, qui se rapproche de $${nb(Cm)}$. Donc $C'(${q0}) = ${nb(Cm)}$ € : fabriquer un pot de plus coûte environ $${nb(Cm)}$ €.`
    };
  };

  GEN["d1-python"] = function () {
    const K = rand(-3, 3), a = rand(1, 4), d = 2 * a + K;
    const fx = K === 0 ? "x**2" : `x**2 ${K < 0 ? "-" : "+"} ${Math.abs(K) === 1 ? "x" : `${Math.abs(K)}*x`}`;
    const code = "```python\ndef f(x):\n    return " + fx + "\n\ndef pentes(a, pas):\n    return [(f(a + h) - f(a)) / h for h in pas]\n```";
    const fTex = poly([1, K, 0]);
    const t = rand(0, 2);
    if (t === 0) {
      const py = (v) => (Number.isInteger(v) ? `${v}.0` : String(v)), liste = (x) => `[${[1, 0.1, 0.01].map((h) => py(+(x + h).toFixed(2))).join(", ")}]`;
      const c = melangeChoix(liste(d), [liste(d + 1), liste(2 * a), `[${[1, 0.1, 0.01].map((h) => py(+(a * a + K * a + h).toFixed(2))).join(", ")}]`]);
      return {
        enonce: `On considère ce programme :\n\n${code}\n\nQue renvoie (environ) pentes(${a}, [1, 0.1, 0.01]) ?`,
        mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: [`Chaque élément est le taux $\\dfrac{f(${a} + h) - f(${a})}{h}$ pour une valeur de $h$.`, `Avec $f(x) = ${fTex}$, ce taux vaut $${d} + h$.`, "Remplace $h$ par $1$, puis $0{,}1$, puis $0{,}01$."],
        solution: `Le taux vaut $${d} + h$ : la liste est environ ${liste(d)}. Python peut afficher de petites erreurs d'arrondi dans les derniers chiffres.`
      };
    }
    if (t === 1) {
      return {
        enonce: `On considère ce programme :\n\n${code}\n\nOn calcule pentes(${a}, [0.1, 0.01, 0.001, 0.0001]). Vers quel nombre les valeurs de la liste se rapprochent-elles ?`,
        mode: "nombre", prefixe: "Réponse :", attendu: d,
        erreurs: [{ valeur: a * a + K * a, message: `Ça, c'est $f(${a})$. Les éléments de la liste sont des **pentes** de sécantes.` }].filter((e) => e.valeur !== d),
        aides: ["Chaque élément est la pente d'une sécante passant par le point d'abscisse " + a + ".", `Pour $f(x) = ${fTex}$, le taux vaut $${d} + h$.`, "Quand $h$ se rapproche de $0$, les pentes se rapprochent du nombre dérivé."],
        solution: `Les valeurs sont environ $${nb(d + 0.1)}$, $${nb(d + 0.01)}$, $${nb(d + 0.001)}$, $${nb(d + 0.0001)}$ : elles se rapprochent de $${d} = f'(${a})$, la pente de la tangente.`
      };
    }
    const c = melangeChoix("Le coefficient directeur d'une sécante à la courbe de f", ["Une image f(a + h)", "Le nombre dérivé f'(a) exact", "L'ordonnée à l'origine d'une tangente"]);
    return {
      enonce: `On considère ce programme :\n\n${code}\n\nQue représente chaque nombre de la liste renvoyée par pentes(a, pas) ?`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Le programme calcule (f(a + h) − f(a)) / h pour chaque h de la liste pas.", "C'est un taux de variation entre a et a + h.", "Un taux de variation, c'est la pente d'une droite passant par deux points de la courbe."],
      solution: "Chaque nombre est le taux de variation de $f$ entre $a$ et $a + h$ : le **coefficient directeur de la sécante** passant par les points d'abscisses $a$ et $a + h$. Quand $h$ devient petit, ces pentes s'approchent de $f'(a)$."
    };
  };

  // Logique : a est un paramètre (fixé), h une variable qui tend vers 0
  GEN["d1-statut"] = function () {
    const T = [
      ["Dans le taux $\\dfrac{f(a + h) - f(a)}{h}$ qui sert à calculer $f'(a)$, quel est le rôle de $h$ ?", "Une variable non nulle qui se rapproche de $0$", ["Un nombre fixé à l'avance, comme $a$", "L'inconnue d'une équation à résoudre", "Le nombre dérivé"], "$h$ est une **variable** : on la fait varier, de plus en plus près de $0$, sans jamais qu'elle vaille $0$ (on divise par $h$)."],
      ["Dans le taux $\\dfrac{f(a + h) - f(a)}{h}$ qui sert à calculer $f'(a)$, quel est le rôle de $a$ ?", "Un paramètre : l'abscisse fixée du point étudié", ["Une variable qui se rapproche de $0$", "L'inconnue d'une équation", "La pente de la tangente"], "$a$ est un **paramètre** : il est fixé pendant tout le calcul (c'est le point où l'on dérive). Seul $h$ varie."],
      ["Peut-on remplacer directement $h$ par $0$ dans $\\dfrac{f(a + h) - f(a)}{h}$ ?", "Non : on obtiendrait $\\dfrac{0}{0}$, il faut d'abord simplifier par $h$", ["Oui, et on trouve $f'(a)$", "Oui, et on trouve $0$", "Non, car $a$ doit être nul"], "Pour $h = 0$, le quotient n'existe pas. On simplifie d'abord par $h$ (avec $h \\neq 0$), puis on regarde vers quoi tend le résultat quand $h$ se rapproche de $0$."],
      ["Dans l'équation de tangente $y = f'(a)(x - a) + f(a)$, quelles lettres varient quand on parcourt la droite ?", "$x$ et $y$", ["$a$ et $f(a)$", "$a$ seulement", "$f'(a)$ et $x$"], "$a$, $f(a)$ et $f'(a)$ sont des **nombres fixés** ; $x$ et $y$ sont les coordonnées d'un point qui se déplace sur la droite."],
      ["$f'(3)$ est…", "un nombre : la pente de la tangente au point d'abscisse $3$", ["une fonction", "l'image de $3$ par $f$", "une équation de droite"], "$f'(3)$ est un **nombre**, la limite du taux de variation en $3$, c'est-à-dire la pente de la tangente au point d'abscisse $3$."]
    ];
    const [q, b, f, s] = pick(T), c = melangeChoix(b, f);
    return {
      enonce: q, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Un **paramètre** est une lettre fixée pendant le calcul ; une **variable** prend différentes valeurs.", "Dans $f'(a)$, le point d'abscisse $a$ ne bouge pas : c'est le second point, d'abscisse $a + h$, qui se rapproche.", "On ne divise jamais par $0$."],
      solution: s
    };
  };


  /* ---------- Première, chapitre 8 : trigonométrie (préfixe tr-) ---------- */
  // Valeurs remarquables : angle = k π / d, écrit en texte (π/3) ou en TeX (\dfrac{\pi}{3})
  const trTxt = (k, d) => { const g = pgcd(Math.abs(k), d); k /= g; d /= g; if (k === 0) return "0"; const s = k < 0 ? "−" : "", a = Math.abs(k); return `${s}${a === 1 ? "" : a}π${d === 1 ? "" : `/${d}`}`; };
  const trTex = (k, d) => { const g = pgcd(Math.abs(k), d); k /= g; d /= g; if (k === 0) return "0"; const s = k < 0 ? "-" : "", a = Math.abs(k); return d === 1 ? `${s}${a === 1 ? "" : a}\\pi` : `${s}\\dfrac{${a === 1 ? "" : a}\\pi}{${d}}`; };
  // Cercle trigonométrique : points [{a, label}], projections d'un angle, arc depuis I
  function cercleTrig(o) {
    const W = 320, H = o.h || 290, R = o.R || 104, cx = o.cx || 160, cy = o.cy || H / 2;
    const P = (a, r) => [+(cx + (r || R) * Math.cos(a)).toFixed(1), +(cy - (r || R) * Math.sin(a)).toFixed(1)];
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria || "Cercle trigonométrique"}">`;
    s += `<g class="g-axis"><line x1="${cx - R - 26}" y1="${cy}" x2="${cx + R + 30}" y2="${cy}"/><line x1="${cx}" y1="${cy + R + 22}" x2="${cx}" y2="${cy - R - 24}"/><path d="M${cx + R + 30} ${cy} l-6 -3.5 v7z"/><path d="M${cx} ${cy - R - 24} l-3.5 6 h7z"/></g>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${R}" class="g-curve" style="fill:none"/>`;
    if (o.grille) [-1, -0.5, 0.5, 1].forEach((v) => { s += `<line class="g-grid-l" x1="${cx + v * R}" y1="${cy - R - 6}" x2="${cx + v * R}" y2="${cy + R + 6}" style="stroke:var(--doux);stroke-width:.6;opacity:.5"/><line x1="${cx - R - 6}" y1="${cy - v * R}" x2="${cx + R + 6}" y2="${cy - v * R}" style="stroke:var(--doux);stroke-width:.6;opacity:.5"/>`; });
    s += `<text class="g-label" x="${cx - 6}" y="${cy + 14}" text-anchor="end">O</text><text class="g-label" x="${cx + R + 4}" y="${cy + 14}">I</text><text class="g-label" x="${cx - 6}" y="${cy - R - 6}" text-anchor="end">J</text>`;
    if (o.arc !== undefined) {
      const a = o.arc, n = Math.max(40, Math.ceil(Math.abs(a) * 14)); let d = "";
      for (let k = 0; k <= n; k++) { const [x, y] = P((a * k) / n, R + 10); d += (k ? "L" : "M") + x + " " + y; }
      const [ex, ey] = P(a, R + 10), t = a + (a > 0 ? Math.PI / 2 : -Math.PI / 2), u = [Math.cos(t), -Math.sin(t)];
      s += `<path class="g-curve g-curve-1" d="${d}" style="fill:none;stroke-width:2"/><path class="g-end g-curve-1" d="M${ex + 7 * u[0]} ${ey + 7 * u[1]} L${ex - 5 * u[1] - 3 * u[0]} ${ey + 5 * u[0] - 3 * u[1]} L${ex + 5 * u[1] - 3 * u[0]} ${ey - 5 * u[0] - 3 * u[1]} Z"/>`;
    }
    if (o.proj !== undefined) {
      const [mx, my] = P(o.proj);
      s += `<line class="g-hline" x1="${mx}" y1="${my}" x2="${mx}" y2="${cy}"/><line class="g-hline" x1="${mx}" y1="${my}" x2="${cx}" y2="${my}"/><line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" style="stroke:var(--doux);stroke-width:1.4"/>`;
      s += `<circle class="g-point" cx="${mx}" cy="${cy}" r="3"/><circle class="g-point" cx="${cx}" cy="${my}" r="3"/>`;
      if (o.projLabels !== false) s += `<text class="g-clabel g-curve-1" x="${mx}" y="${cy + (my < cy ? 16 : -8)}" text-anchor="middle">${o.cosLabel || "cos x"}</text><text class="g-clabel g-curve-1" x="${cx + (mx > cx ? -6 : 6)}" y="${my + 4}" text-anchor="${mx > cx ? "end" : "start"}">${o.sinLabel || "sin x"}</text>`;
    }
    (o.points || []).forEach((p) => {
      const [x, y] = P(p.a), [lx, ly] = P(p.a, R + (p.r || 18));
      s += `<circle class="g-point" cx="${x}" cy="${y}" r="${p.gros ? 4.5 : 3.5}"/>`;
      // sur un axe, l'étiquette passe en diagonale pour ne pas couvrir l'axe ni les lettres I et J
      const c = Math.round(Math.cos(p.a) * 1e6) / 1e6, sn = Math.round(Math.sin(p.a) * 1e6) / 1e6, axe = Math.abs(c) === 1 || Math.abs(sn) === 1;
      const [tx, ty, an] = axe ? [x + (c === -1 ? -7 : 7), y + (c === 1 ? -7 : c === -1 ? 15 : sn === 1 ? -8 : 17), c === -1 ? "end" : "start"] : [lx, ly + 4, "middle"];
      if (p.label) s += `<text class="g-plabel" x="${tx}" y="${ty}" text-anchor="${an}" style="font-size:${p.fs || 11}px">${p.label}</text>`;
    });
    return s + (o.extra || "") + `</svg>`;
  }

  FIGURES["cercle-trigo"] = () => cercleTrig({ arc: 1, points: [{ a: 1, label: "M", gros: true }], extra: `<line x1="160" y1="145" x2="216.2" y2="57.5" style="stroke:var(--doux);stroke-width:1.4"/><text class="g-clabel g-curve-1" x="314" y="26" text-anchor="end">arc de longueur 1</text><text class="g-label" x="190" y="134">1 rad</text>`, aria: "Cercle trigonométrique de centre O et de rayon 1, orienté dans le sens inverse des aiguilles d'une montre : l'arc de I à M a pour longueur 1, l'angle mesure 1 radian" });
  FIGURES["enroulement"] = () => {
    const cx = 120, cy = 180, R = 66, X = cx + R, Y = (t) => +(cy - R * t).toFixed(1);
    let s = `<svg class="graph" viewBox="0 0 320 300" role="img" aria-label="La droite des réels, tangente au cercle en I, s'enroule autour du cercle : le réel 1 vient sur le point M(1), le réel π/2 sur J">`;
    s += `<g class="g-axis"><line x1="${cx - R - 20}" y1="${cy}" x2="${cx + R + 20}" y2="${cy}"/><line x1="${cx}" y1="${cy + R + 20}" x2="${cx}" y2="${cy - R - 20}"/></g><circle cx="${cx}" cy="${cy}" r="${R}" class="g-curve" style="fill:none"/>`;
    s += `<line x1="${X}" y1="${Y(-1.3)}" x2="${X}" y2="${Y(2.45)}" class="g-curve g-curve-1" style="stroke-width:2"/><path class="g-end g-curve-1" d="M${X} ${Y(2.55)} l-4 8 h8z"/>`;
    [[-1, "−1"], [0, "0"], [1, "1"], [Math.PI / 2, "π/2"], [2, "2"]].forEach(([t, l]) => { s += `<line x1="${X - 5}" y1="${Y(t)}" x2="${X + 5}" y2="${Y(t)}" style="stroke:var(--encre);stroke-width:1.5"/><text class="g-label" x="${X + 10}" y="${Y(t) + 4}">${l}</text>`; });
    const M = (a) => [+(cx + R * Math.cos(a)).toFixed(1), +(cy - R * Math.sin(a)).toFixed(1)];
    const [m1x, m1y] = M(1), [jx, jy] = M(Math.PI / 2), [nx, ny] = M(-1);
    s += `<path d="M${X - 6} ${Y(1)} Q${X + 4} ${(Y(1) + m1y) / 2 - 18} ${m1x + 6} ${m1y - 4}" style="fill:none;stroke:var(--ylang);stroke-width:1.6;stroke-dasharray:4 3"/><path d="M${X - 6} ${Y(Math.PI / 2)} Q${(X + jx) / 2} ${jy - 34} ${jx + 6} ${jy - 5}" style="fill:none;stroke:var(--ylang);stroke-width:1.6;stroke-dasharray:4 3"/><path d="M${X - 6} ${Y(-1)} Q${X + 6} ${(Y(-1) + ny) / 2 + 16} ${nx + 6} ${ny + 4}" style="fill:none;stroke:var(--ylang);stroke-width:1.6;stroke-dasharray:4 3"/>`;
    [[m1x, m1y, "M(1)"], [jx, jy, "J = M(π/2)"], [nx, ny, "M(−1)"]].forEach(([x, y, l], i) => { s += `<circle class="g-point" cx="${x}" cy="${y}" r="3.5"/><text class="g-plabel" x="${i === 0 ? x + 6 : x - 6}" y="${y + (i === 2 ? 16 : i === 0 ? 14 : -8)}" text-anchor="${i === 0 ? "start" : "end"}">${l}</text>`; });
    s += `<circle class="g-point" cx="${X}" cy="${cy}" r="3.5"/><text class="g-label" x="${X - 4}" y="${cy + 14}" text-anchor="end">I</text>`;
    return s + `</svg>`;
  };
  FIGURES["cercle-reperes"] = () => {
    const pts = [[0, 1], [1, 6], [1, 4], [1, 3], [1, 2], [2, 3], [3, 4], [5, 6], [1, 1], [-5, 6], [-3, 4], [-2, 3], [-1, 2], [-1, 3], [-1, 4], [-1, 6]];
    return cercleTrig({ R: 96, h: 290, points: pts.map(([k, d]) => ({ a: (k * Math.PI) / d, label: trTxt(k, d), r: [6, 4, 3].includes(d) ? 24 : 18, fs: 10 })), aria: "Cercle trigonométrique avec les points associés aux réels 0, π/6, π/4, π/3, π/2, 2π/3, 3π/4, 5π/6, π et leurs opposés" });
  };
  FIGURES["cos-sin"] = () => cercleTrig({ grille: true, proj: 0.95, points: [{ a: 0.95, label: "M(x)", gros: true }], arc: 0.95, aria: "Le point M(x) du cercle : son abscisse est cos x, son ordonnée est sin x" });
  FIGURES["valeurs-remarquables"] = () => {
    const R = 210, cx = 60, cy = 250, P = (a) => [+(cx + R * Math.cos(a)).toFixed(1), +(cy - R * Math.sin(a)).toFixed(1)];
    let s = `<svg class="graph" viewBox="0 0 320 290" role="img" aria-label="Quart de cercle : π/6 a pour coordonnées (√3/2 ; 1/2), π/4 a pour coordonnées (√2/2 ; √2/2), π/3 a pour coordonnées (1/2 ; √3/2)">`;
    s += `<g class="g-axis"><line x1="${cx - 10}" y1="${cy}" x2="${cx + R + 30}" y2="${cy}"/><line x1="${cx}" y1="${cy + 10}" x2="${cx}" y2="${cy - R - 24}"/></g><path class="g-curve" d="M${cx + R} ${cy} A${R} ${R} 0 0 0 ${cx} ${cy - R}" style="fill:none"/>`;
    const L = [[Math.PI / 6, "π/6", "√3/2", "1/2"], [Math.PI / 4, "π/4", "√2/2", "√2/2"], [Math.PI / 3, "π/3", "1/2", "√3/2"]];
    L.forEach(([a, n, c, si], i) => {
      const [x, y] = P(a);
      s += `<line class="g-hline" x1="${x}" y1="${y}" x2="${x}" y2="${cy}" style="opacity:.7"/><line class="g-hline" x1="${x}" y1="${y}" x2="${cx}" y2="${y}" style="opacity:.7"/><line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" style="stroke:var(--doux);stroke-width:1"/><circle class="g-point" cx="${x}" cy="${y}" r="4"/>`;
      s += `<text class="g-plabel" x="${x + 8}" y="${y - 6}">${n}</text><text class="g-clabel g-curve-1" x="${x}" y="${cy + 16 + (i === 1 ? 14 : 0)}" text-anchor="middle" style="font-size:11px">${c}</text><text class="g-clabel g-curve-1" x="${cx - 6}" y="${y + 4}" text-anchor="end" style="font-size:11px">${si}</text>`;
    });
    s += `<text class="g-label" x="${cx + R + 2}" y="${cy + 16}">1</text><text class="g-label" x="${cx - 6}" y="${cy - R + 4}" text-anchor="end">1</text>`;
    return s + `</svg>`;
  };
  FIGURES["angles-associes"] = () => {
    const a = Math.PI / 3;
    return cercleTrig({ grille: true, points: [{ a, label: "π/3", gros: true }, { a: Math.PI - a, label: "2π/3" }, { a: -a, label: "−π/3" }, { a: Math.PI + a, label: "4π/3" }], extra: (() => { const R = 104, cx = 160, cy = 145, c = R * Math.cos(a), sn = R * Math.sin(a); return `<rect x="${cx - c}" y="${cy - sn}" width="${2 * c}" height="${2 * sn}" style="fill:none;stroke:var(--ylang);stroke-width:1.4;stroke-dasharray:5 4"/>`; })(), aria: "Les points associés à π/3, 2π/3, −π/3 et 4π/3 sont symétriques : ils forment un rectangle, leurs cosinus et sinus ne diffèrent que par le signe" });
  };
  FIGURES["pedalier"] = () => {
    const cx = 120, cy = 138, R = 110, a = Math.PI / 3, mx = +(cx + R * Math.cos(a)).toFixed(1), my = +(cy - R * Math.sin(a)).toFixed(1);
    let s = `<svg class="graph" viewBox="0 0 320 262" role="img" aria-label="Pédalier de rayon 17 cm : la manivelle fait un angle de π/3 avec l'horizontale, la pédale est à 17 sin(π/3) ≈ 14,7 cm au-dessus de l'axe">`;
    s += `<circle cx="${cx}" cy="${cy}" r="${R}" style="fill:none;stroke:var(--doux);stroke-width:1.2;stroke-dasharray:3 4"/><circle cx="${cx}" cy="${cy}" r="30" style="fill:var(--lagon-pale);stroke:var(--lagon);stroke-width:2"/>`;
    s += `<line x1="${cx - R - 10}" y1="${cy}" x2="${cx + R + 40}" y2="${cy}" class="g-hline" style="opacity:.6"/><line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" class="g-curve" style="stroke-width:6"/><rect x="${mx - 16}" y="${my - 5}" width="32" height="10" rx="3" style="fill:var(--ylang)"/>`;
    s += `<line x1="${mx}" y1="${my + 5}" x2="${mx}" y2="${cy}" class="g-curve g-curve-1" style="stroke-width:1.6;stroke-dasharray:4 3"/><text class="g-clabel g-curve-1" x="${mx + 8}" y="${(my + cy) / 2 + 4}">h ≈ 14,7 cm</text>`;
    s += `<text class="g-label" x="${(cx + mx) / 2 - 14}" y="${(cy + my) / 2 - 4}" text-anchor="end">17 cm</text><path d="M${cx + 46} ${cy} A46 46 0 0 0 ${+(cx + 46 * Math.cos(a)).toFixed(1)} ${+(cy - 46 * Math.sin(a)).toFixed(1)}" style="fill:none;stroke:var(--encre);stroke-width:1.2"/><text class="g-label" x="${cx + 54}" y="${cy - 14}">π/3</text>`;
    return s + `</svg>`;
  };

  // Angles remarquables utilisés dans les exercices : [k, d] pour k π / d
  const TR_ANGLES = [[0, 1], [1, 6], [1, 4], [1, 3], [1, 2], [2, 3], [3, 4], [5, 6], [1, 1], [7, 6], [5, 4], [4, 3], [3, 2], [5, 3], [7, 4], [11, 6]];
  const trCos = { 0: "1", 30: "\\dfrac{\\sqrt{3}}{2}", 45: "\\dfrac{\\sqrt{2}}{2}", 60: "\\dfrac{1}{2}", 90: "0" };
  // cos ou sin exact d'un angle remarquable, en TeX
  function trValeur(k, d, f) {
    const deg = ((((180 * k) / d) % 360) + 360) % 360, a = (deg * Math.PI) / 180;
    const v = f === "cos" ? Math.cos(a) : Math.sin(a);
    const ref = Math.round((Math.acos(Math.abs(Math.cos(a))) * 180) / Math.PI); // angle aigu associé
    const base = f === "cos" ? trCos[ref] : trCos[90 - ref];
    return { tex: Math.abs(v) < 1e-9 ? "0" : `${v < 0 ? "-" : ""}${base}`, v };
  }

  GEN["tr-conversion"] = function () {
    const [k, d] = pick(TR_ANGLES.filter(([k]) => k)), sgn = Math.random() < 0.2 ? -1 : 1, kk = sgn * k, deg = (180 * kk) / d;
    if (Math.random() < 0.5) {
      return {
        enonce: `Convertis $${trTex(kk, d)}$ radians en degrés.`,
        mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: deg,
        aides: ["$\\pi$ radians $= 180°$.", "Remplace $\\pi$ par $180$.", `Calcule $${par(kk)} \\times 180 \\div ${d}$.`],
        solution: `$${trTex(kk, d)}$ rad $= \\dfrac{${kk} \\times 180}{${d}}° = ${deg}°$.`
      };
    }
    const fausses = [trTex(kk, 2 * d), trTex(2 * kk, d), trTex(-kk, d), trTex(kk + d, d)];
    const c = melangeChoix(`$${trTex(kk, d)}$`, fausses.filter((x) => x !== trTex(kk, d)).map((x) => `$${x}$`));
    return {
      enonce: `Convertis $${deg}°$ en radians.`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["$180° = \\pi$ radians, donc $1° = \\dfrac{\\pi}{180}$ rad.", `$${deg}° = ${deg} \\times \\dfrac{\\pi}{180}$ rad.`, `Simplifie la fraction $\\dfrac{${deg}}{180}$.`],
      solution: `$${deg} \\times \\dfrac{\\pi}{180} = ${trTex(kk, d)}$ rad.`
    };
  };

  GEN["tr-arc"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const r = pick([17, 18, 20]), [k, d] = pick([[1, 3], [1, 2], [2, 3], [1, 6], [3, 4], [1, 1]]), L = (r * k * Math.PI) / d;
      return {
        enonce: `La manivelle d'un pédalier mesure $${r}$ cm. La pédale tourne d'un angle de $${trTex(k, d)}$ radian${(k * Math.PI) / d >= 2 ? "s" : ""}. Quelle longueur d'arc parcourt-elle ? Arrondis au dixième de cm.`,
        mode: "nombre", prefixe: "Longueur :", suffixe: "cm", attendu: +L.toFixed(1), tolerance: 0.051,
        aides: ["Sur un cercle de rayon $r$, un angle de $\\alpha$ radians intercepte un arc de longueur $r \\times \\alpha$.", `$L = ${r} \\times ${trTex(k, d)}$.`, `$\\pi \\approx 3{,}1416$.`],
        solution: `$L = ${r} \\times ${trTex(k, d)} \\approx ${nb(+L.toFixed(1))}$ cm.`
      };
    }
    if (t === 1) {
      const r = pick([30, 33, 35]), tours = pick([1, 2, 10]), L = 2 * Math.PI * r * tours;
      return {
        enonce: `Une roue de vélo a un rayon de $${r}$ cm. Quelle distance parcourt le vélo quand la roue fait $${tours}$ tour${tours > 1 ? "s" : ""} (sans glisser) ? Arrondis au cm.`,
        mode: "nombre", prefixe: "Distance :", suffixe: "cm", attendu: Math.round(L), tolerance: 0.51,
        erreurs: [{ valeur: Math.round(Math.PI * r * tours), message: "Un tour complet correspond à un angle de $2\\pi$ : la longueur est $2\\pi r$, pas $\\pi r$." }],
        aides: ["Un tour complet, c'est un angle de $2\\pi$ radians.", `Un tour : $2\\pi \\times ${r}$ cm.`, `Multiplie par $${tours}$.`],
        solution: `$${tours} \\times 2\\pi \\times ${r} \\approx ${Math.round(L)}$ cm${tours >= 10 ? `, soit environ $${nb(+(L / 100).toFixed(1))}$ m` : ""}.`
      };
    }
    const r = pick([2, 4, 5, 10]), al = pick([0.5, 1.5, 2, 3]), L = r * al;
    return {
      enonce: `Sur un cercle de rayon $${r}$ cm, un arc mesure $${nb(L)}$ cm. Quelle est la mesure en radians de l'angle au centre correspondant ?`,
      mode: "nombre", prefixe: "Angle :", suffixe: "rad", attendu: al, tolerance: 1e-6,
      erreurs: [{ valeur: L * r, message: "On **divise** la longueur de l'arc par le rayon : $L = r \\times \\alpha$." }],
      aides: ["$L = r \\times \\alpha$, avec $\\alpha$ en radians.", `Donc $\\alpha = \\dfrac{L}{r}$.`, `$\\alpha = \\dfrac{${nb(L)}}{${r}}$.`],
      solution: `$\\alpha = \\dfrac{${nb(L)}}{${r}} = ${nb(al)}$ rad.`
    };
  };

  GEN["tr-placer"] = function () {
    const lettres = "ABCDEFGHKLMNPQRS".split(""), pts = TR_ANGLES.map(([k, d], i) => ({ k, d, a: (k * Math.PI) / d, l: lettres[i] }));
    const melange = shuffle(lettres.slice()), noms = {}; pts.forEach((p, i) => { noms[i] = melange[i]; });
    const i = rand(1, pts.length - 1), p = pts[i], tour = pick([0, 0, 1, -1, 2]);
    const kk = p.k + 2 * p.d * tour - (Math.random() < 0.3 && tour === 0 ? 2 * p.d : 0), x = trTex(kk, p.d);
    const figure = cercleTrig({ R: 96, points: pts.map((q, j) => ({ a: q.a, label: noms[j], r: 16 })), aria: "Cercle trigonométrique avec seize points nommés par des lettres" });
    const figureSolution = cercleTrig({ R: 96, arc: (kk * Math.PI) / p.d, points: pts.map((q, j) => ({ a: q.a, label: j === i ? `${noms[j]} = M(${trTxt(kk, p.d)})` : noms[j], r: j === i ? 30 : 16, gros: j === i })), aria: "Le point cherché, avec l'arc parcouru depuis I" });
    const proches = [i, (i + 1) % pts.length, (i + pts.length - 1) % pts.length, (i + pts.length / 2) % pts.length];
    const c = melangeChoix(`Le point ${noms[i]}`, proches.slice(1).map((j) => `Le point ${noms[j]}`));
    return {
      enonce: `Quel point du cercle trigonométrique est associé au réel $${x}$ ?`,
      mode: "choix", choix: c.choix, attendu: c.attendu, figure, figureSolution,
      aides: ["On part de $I$ (le réel $0$) et on tourne dans le sens inverse des aiguilles d'une montre pour un réel positif, dans l'autre sens pour un réel négatif.", "Un demi-tour correspond à $\\pi$, un tour complet à $2\\pi$ : ajouter ou retirer $2\\pi$ ne change pas le point.", kk === p.k ? `$${x}$ est entre $0$ et $2\\pi$ : compte les sixièmes ou les quarts de demi-tour depuis $I$.` : `$${x} = ${trTex(p.k, p.d)} ${kk > p.k ? "+" : "-"} ${Math.abs(kk - p.k) / (2 * p.d) === 1 ? "" : `${Math.abs(kk - p.k) / (2 * p.d)} \\times `}2\\pi$.`],
      solution: `${kk !== p.k ? `$${x}$ et $${trTex(p.k, p.d)}$ diffèrent d'un nombre entier de tours ($2\\pi$ chacun) : ils ont le même point image. ` : ""}Le point associé à $${trTex(p.k, p.d)}$ est le point ${noms[i]}.`
    };
  };

  GEN["tr-valeurs"] = function () {
    const [k0, d] = pick(TR_ANGLES), neg = Math.random() < 0.25 && k0, k = neg ? -k0 : k0, f = pick(["cos", "sin"]);
    const { tex, v } = trValeur(k, d, f), autre = trValeur(k, d, f === "cos" ? "sin" : "cos").tex;
    const pool = ["0", "1", "-1", "\\dfrac{1}{2}", "-\\dfrac{1}{2}", "\\dfrac{\\sqrt{2}}{2}", "-\\dfrac{\\sqrt{2}}{2}", "\\dfrac{\\sqrt{3}}{2}", "-\\dfrac{\\sqrt{3}}{2}"];
    const cands = [tex === "0" ? "1" : tex.startsWith("-") ? tex.slice(1) : `-${tex}`, autre, ...shuffle(pool)];
    const c = melangeChoix(`$${tex}$`, cands.filter((x) => x !== tex).map((x) => `$${x}$`));
    const a = (k * Math.PI) / d;
    return {
      enonce: `Que vaut $\\${f}\\left(${trTex(k, d)}\\right)$ ?`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      figureSolution: cercleTrig({ grille: true, proj: a, arc: a, cosLabel: "cos", sinLabel: "sin", points: [{ a, label: trTxt(k, d), gros: true, r: 22 }], aria: "Le point associé et ses projections sur les axes" }),
      figure: cercleTrig({ grille: true, aria: "Cercle trigonométrique avec un quadrillage de pas 0,5" }),
      aides: [`Place le point associé à $${trTex(k, d)}$ sur le cercle.`, `Le ${f === "cos" ? "cosinus est l'abscisse" : "sinus est l'ordonnée"} de ce point.`, "Utilise l'angle aigu associé ($0$, $\\dfrac{\\pi}{6}$, $\\dfrac{\\pi}{4}$, $\\dfrac{\\pi}{3}$ ou $\\dfrac{\\pi}{2}$) et le signe donné par le quart de cercle."],
      solution: `Le point associé à $${trTex(k, d)}$ a pour ${f === "cos" ? "abscisse" : "ordonnée"} $${tex}$ : $\\${f}\\left(${trTex(k, d)}\\right) = ${tex}$${Math.abs(v) > 1e-9 && Math.abs(Math.abs(v) - 1) > 1e-9 ? ` (environ $${nb(+v.toFixed(3))}$)` : ""}.`
    };
  };

  GEN["tr-pythagore"] = function () {
    const [p, q, h] = pick([[3, 4, 5], [5, 12, 13], [7, 24, 25], [8, 15, 17]]), donne = pick(["cos", "sin"]), quart = pick([1, 2, 4]);
    // quart 1 : [0 ; π/2], quart 2 : [π/2 ; π], quart 4 : [−π/2 ; 0]
    const cosPos = quart !== 2, sinPos = quart !== 4;
    const val = donne === "cos" ? (cosPos ? p : -p) / h : (sinPos ? p : -p) / h;
    const rep = donne === "cos" ? (sinPos ? q : -q) / h : (cosPos ? q : -q) / h, cherche = donne === "cos" ? "sin" : "cos";
    const inter = { 1: "\\left[0\\,;\\dfrac{\\pi}{2}\\right]", 2: "\\left[\\dfrac{\\pi}{2}\\,;\\pi\\right]", 4: "\\left[-\\dfrac{\\pi}{2}\\,;0\\right]" }[quart];
    return {
      enonce: `On sait que $\\${donne} x = ${frac(Math.round(val * h), h)}$ et que $x \\in ${inter}$. Calcule $\\${cherche} x$ (fraction).`,
      mode: "nombre", prefixe: `$\\${cherche} x =$`, attendu: rep,
      erreurs: [{ valeur: -rep, message: `Attention au signe : pour $x \\in ${inter}$, le point est dans un quart de cercle où $\\${cherche} x$ est ${rep > 0 ? "positif" : "négatif"}.` }, { valeur: 1 - Math.abs(val), message: "$\\cos^2 x + \\sin^2 x = 1$ porte sur les **carrés**, pas sur les nombres eux-mêmes." }],
      aides: ["Pour tout réel $x$, $\\cos^2 x + \\sin^2 x = 1$.", `$\\${cherche}^2 x = 1 - \\left(${frac(Math.round(val * h), h)}\\right)^2 = \\dfrac{${q * q}}{${h * h}}$.`, `Donc $\\${cherche} x = \\dfrac{${q}}{${h}}$ ou $-\\dfrac{${q}}{${h}}$ : le signe dépend du quart de cercle.`],
      solution: `$\\${cherche}^2 x = 1 - \\dfrac{${p * p}}{${h * h}} = \\dfrac{${q * q}}{${h * h}}$. Pour $x \\in ${inter}$, $\\${cherche} x$ est ${rep > 0 ? "positif" : "négatif"}, donc $\\${cherche} x = ${frac(Math.round(rep * h), h)}$.`
    };
  };

  GEN["tr-triangle"] = function () {
    const r = pick([17, 18, 20]), [k, d] = pick([[1, 6], [1, 4], [1, 3]]), f = pick(["sin", "cos"]), a = (k * Math.PI) / d, v = r * (f === "sin" ? Math.sin(a) : Math.cos(a));
    return {
      enonce: `La manivelle d'un pédalier mesure $${r}$ cm. Elle fait un angle de $${trTex(k, d)}$ avec l'horizontale, vers le haut. ${f === "sin" ? "À quelle hauteur au-dessus de l'axe du pédalier se trouve la pédale ?" : "À quelle distance horizontale de l'axe du pédalier se trouve la pédale ?"} Arrondis au dixième de cm.`,
      mode: "nombre", prefixe: f === "sin" ? "Hauteur :" : "Distance :", suffixe: "cm", attendu: +v.toFixed(1), tolerance: 0.051,
      erreurs: [{ valeur: +(r * (f === "sin" ? Math.cos(a) : Math.sin(a))).toFixed(1), message: `La ${f === "sin" ? "hauteur correspond au côté opposé à l'angle : c'est le **sinus**" : "distance horizontale correspond au côté adjacent : c'est le **cosinus**"}.` }].filter((e) => Math.abs(e.valeur - +v.toFixed(1)) > 0.06),
      aides: ["Dans le triangle rectangle formé par la manivelle (hypoténuse), la verticale et l'horizontale :", f === "sin" ? "côté opposé $=$ hypoténuse $\\times \\sin(\\text{angle})$." : "côté adjacent $=$ hypoténuse $\\times \\cos(\\text{angle})$.", `$${r} \\times \\${f}\\left(${trTex(k, d)}\\right) = ${r} \\times ${trValeur(k, d, f).tex}$.`],
      solution: `$${r} \\times \\${f}\\left(${trTex(k, d)}\\right) = ${r} \\times ${trValeur(k, d, f).tex} \\approx ${nb(+v.toFixed(1))}$ cm.`
    };
  };

  // Logique : « pour tout réel x » et « il existe un réel x »
  GEN["tr-logique"] = function () {
    const T = [
      ["Pour tout réel $x$, $\\cos^2 x + \\sin^2 x = 1$.", 0, "**Vrai** : dans le triangle rectangle formé par $O$, $M(x)$ et son projeté, le théorème de Pythagore donne $\\cos^2 x + \\sin^2 x = OM^2 = 1$, et cela pour **tout** réel $x$."],
      ["Pour tout réel $x$, $\\sin x \\geqslant 0$.", 1, "**Faux**. Contre-exemple : $\\sin\\left(-\\dfrac{\\pi}{2}\\right) = -1 < 0$."],
      ["Il existe un réel $x$ tel que $\\cos x = 2$.", 1, "**Faux** : pour tout réel $x$, $-1 \\leqslant \\cos x \\leqslant 1$, car le cercle a pour rayon $1$."],
      ["Il existe un réel $x$ tel que $\\sin x = 1$.", 0, "**Vrai** : $x = \\dfrac{\\pi}{2}$ convient. Pour un « il existe », **un exemple** suffit."],
      ["Pour tout réel $x$, $\\cos x + \\sin x = 1$.", 1, "**Faux**. Contre-exemple : $\\cos\\dfrac{\\pi}{4} + \\sin\\dfrac{\\pi}{4} = \\sqrt{2} \\neq 1$. Ne pas confondre avec $\\cos^2 x + \\sin^2 x = 1$."],
      ["Pour tout réel $x$, $\\cos(x + 2\\pi) = \\cos x$.", 0, "**Vrai** : $x$ et $x + 2\\pi$ diffèrent d'un tour complet, ils ont le même point image sur le cercle."],
      ["Pour tout réel $x$, $\\cos(-x) = \\cos x$.", 0, "**Vrai** : les points associés à $x$ et $-x$ sont symétriques par rapport à l'axe des abscisses, ils ont la même abscisse."],
      ["Il existe un réel $x$ tel que $\\cos x = \\sin x$.", 0, "**Vrai** : $x = \\dfrac{\\pi}{4}$ convient, avec $\\cos\\dfrac{\\pi}{4} = \\sin\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$."]
    ];
    const [aff, rep, sol] = pick(T);
    return {
      enonce: `Vrai ou faux : « ${aff} »`,
      mode: "choix", choix: ["Vrai", "Faux"], attendu: rep,
      aides: ["« Pour tout » : il faut que ce soit vrai pour **chaque** réel ; un seul contre-exemple suffit pour dire faux.", "« Il existe » : un seul exemple suffit pour dire vrai.", "Pense au cercle : le cosinus est une abscisse, le sinus une ordonnée, toutes deux entre $-1$ et $1$."],
      solution: sol
    };
  };

  GEN["tr-python"] = function () {
    const code = "```python\nfrom math import sqrt\n\ndef archimede(etapes):\n    n = 6    # hexagone inscrit dans le cercle de rayon 1\n    c = 1    # longueur d'un côté\n    for i in range(etapes):\n        c = sqrt(2 - sqrt(4 - c**2))\n        n = 2 * n\n    return n * c / 2\n```";
    const t = rand(0, 3);
    if (t === 0) {
      const e = rand(1, 5), n = 6 * 2 ** e;
      return {
        enonce: `Archimède approchait $\\pi$ avec des polygones réguliers inscrits dans un cercle.\n\n${code}\n\nAprès archimede(${e}), combien de côtés a le polygone ?`,
        mode: "nombre", prefixe: "Côtés :", attendu: n,
        erreurs: [{ valeur: 6 * 2 * e, message: "À chaque étape, le nombre de côtés est **multiplié** par $2$, pas augmenté." }].filter((x) => x.valeur !== n),
        aides: ["Au départ, $n = 6$ (un hexagone).", `La boucle tourne $${e}$ fois et double $n$ à chaque fois.`, `$6 \\times 2^{${e}}$.`],
        solution: `$n = 6 \\times 2^{${e}} = ${n}$ côtés. Archimède est allé jusqu'à $96$ côtés.`
      };
    }
    if (t === 1) {
      return {
        enonce: `${code}\n\nQue renvoie archimede(0) ?`,
        mode: "nombre", prefixe: "Résultat :", attendu: 3,
        aides: ["Avec $0$ étape, la boucle ne tourne pas : $n = 6$ et $c = 1$.", "La fonction renvoie $\\dfrac{n \\times c}{2}$.", "C'est le demi-périmètre de l'hexagone inscrit."],
        solution: "$\\dfrac{6 \\times 1}{2} = 3$ : le demi-périmètre de l'hexagone, première approximation de $\\pi$ (le demi-périmètre du cercle de rayon $1$)."
      };
    }
    if (t === 2) {
      const c = melangeChoix("$\\pi$", ["$3$", "$2\\pi$", "$6$"]);
      return {
        enonce: `${code}\n\nVers quel nombre se rapprochent les résultats de archimede(1), archimede(2), archimede(3)… ?`,
        mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Le polygone a de plus en plus de côtés : il « colle » au cercle.", "La fonction renvoie le **demi**-périmètre du polygone.", "Le périmètre du cercle de rayon $1$ est $2\\pi$."],
        solution: "Les résultats valent environ $3{,}106$ ; $3{,}133$ ; $3{,}139$ ; $3{,}141$… Ils se rapprochent du demi-périmètre du cercle de rayon $1$, c'est-à-dire $\\pi$."
      };
    }
    const c = melangeChoix("Le polygone est à l'intérieur du cercle : son périmètre est plus court", ["Python fait des erreurs d'arrondi", "La racine carrée diminue les nombres", "Le cercle n'a pas un rayon égal à 1"]);
    return {
      enonce: `${code}\n\nPourquoi les résultats de archimede(k) sont-ils toujours inférieurs à $\\pi$ ?`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Le polygone est **inscrit** : ses sommets sont sur le cercle.", "Entre deux sommets, le côté (segment) est plus court que l'arc de cercle.", "On compare le demi-périmètre du polygone au demi-périmètre du cercle, $\\pi$."],
      solution: "Chaque côté du polygone inscrit est un segment, plus court que l'arc de cercle qu'il sous-tend : le demi-périmètre du polygone est donc inférieur à $\\pi$. Il s'en approche quand le nombre de côtés augmente."
    };
  };


  /* ---------- Première, chapitre 9 : dérivation, point de vue global (préfixe d2-) ---------- */
  // f(x) = x² et sa dérivée f'(x) = 2x : la pente de la tangente devient l'ordonnée d'un point de f'
  FIGURES["fonction-derivee"] = () => {
    let s = graph({ xmin: -2.6, xmax: 2.6, ymin: -4.6, ymax: 6.6, h: 320, curves: [{ f: (x) => x * x, a: -2.5, b: 2.5, closed: false, label: "y = x²", lx: -2.4, dx: 44, dy: 6 }, { f: (x) => 2 * x, a: -2.25, b: 2.6, closed: false, label: "y = 2x", lx: -1.9, dx: -6, dy: -2 }, { f: (x) => -2 * x - 1, a: -1.8, b: -0.3, closed: false }, { f: (x) => 2 * x - 1, a: 0.3, b: 1.8, closed: false }], points: [{ x: -1, y: 1 }, { x: 1, y: 1 }, { x: -1, y: -2, label: "f′(−1) = −2", gauche: true }, { x: 1, y: 2, label: "f′(1) = 2", gauche: true }], aria: "Parabole y = x² avec ses tangentes en −1 et en 1, de pentes −2 et 2 ; ces pentes sont les ordonnées des points de la droite y = 2x, courbe de la fonction dérivée" });
    [2, 3].forEach((i) => { s = tiret(s, i); });
    return s;
  };
  // Racine carrée en 0 : les sécantes (OM) deviennent de plus en plus raides
  FIGURES["racine-tangente"] = () => {
    const cs = [{ f: Math.sqrt, a: 0, b: 4.1, closed: false, label: "y = √x", lx: 3.6, dx: 4, dy: -10 }];
    [[1, 2.25], [0.25, 1.15], [0.04, 0.46]].forEach(([h, b]) => cs.push({ f: (x) => x / Math.sqrt(h), a: 0, b, closed: false }));
    let s = graph({ xmin: -0.4, xmax: 4.3, ymin: -0.4, ymax: 2.5, xstep: 0.5, ystep: 0.5, xetiq: 1, yetiq: 1, h: 240, curves: cs, points: [{ x: 1, y: 1, label: "pente 1" }, { x: 0.25, y: 0.5, label: "pente 2" }, { x: 0.04, y: 0.2, label: "pente 5" }], aria: "Les sécantes à la courbe de la racine carrée passant par l'origine ont des pentes 1, 2, 5… de plus en plus grandes : la tangente en 0 est verticale" });
    [1, 2, 3].forEach((i) => { s = tiret(s, i); });
    return s;
  };
  // Valeur absolue : pente −1 à gauche de 0, pente 1 à droite
  FIGURES["valeur-absolue"] = () => graph({ xmin: -3.4, xmax: 3.4, ymin: -1, ymax: 3.6, h: 220, curves: [{ f: (x) => -x, a: -3, b: 0, closed: false }, { f: (x) => x, a: 0, b: 3, closed: false, label: "y = |x|", lx: 2.4, dx: 46, dy: 0 }], marques: [{ x: -2, y: 2.8, texte: "pente −1" }, { x: 1.3, y: 2.8, texte: "pente 1" }], points: [{ x: 0, y: 0 }], aria: "Courbe de la valeur absolue en forme de V : pente −1 à gauche de 0, pente 1 à droite, pas de tangente en 0" }).replace(/g-curve g-curve-1"/, 'g-curve g-curve-0"');

  // Écrit un monôme k x^n en TeX (k entier non nul)
  const d2Mono = (k, e) => (e === 0 ? `${k}` : `${k === 1 ? "" : k === -1 ? "-" : k}${e === 1 ? "x" : `x^{${e}}`}`);

  GEN["d2-usuelles"] = function () {
    const T = [
      () => { const n = rand(2, 6); return [`x^{${n}}`, d2Mono(n, n - 1), [d2Mono(n, n), d2Mono(n - 1, n - 1), d2Mono(1, n - 1), d2Mono(n + 1, n - 1)], `$(x^n)' = nx^{n-1}$ avec $n = ${n}$.`]; },
      () => { const k = pick([2, 3, 4, 5, -2, -3, 7]), n = rand(2, 4); return [d2Mono(k, n), d2Mono(k * n, n - 1), [d2Mono(k, n - 1), d2Mono(n, n - 1), d2Mono(k * n, n)], `$(kx^n)' = k \\times nx^{n-1}$ : $${k} \\times ${n} = ${k * n}$.`]; },
      () => ["\\dfrac{1}{x}", "-\\dfrac{1}{x^2}", ["\\dfrac{1}{x^2}", "-\\dfrac{1}{x}", "\\dfrac{1}{2x}"], "$\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$, pour $x \\neq 0$."],
      () => { const k = pick([2, 3, 5, -4]), K = Math.abs(k), sgn = (p) => (p ? "-" : ""); return [`\\dfrac{${k}}{x}`, `${sgn(k > 0)}\\dfrac{${K}}{x^2}`, [`${sgn(k < 0)}\\dfrac{${K}}{x^2}`, `${k}`, `${sgn(k > 0)}\\dfrac{${K}}{x}`, "-\\dfrac{1}{x^2}"], `$\\dfrac{${k}}{x} = ${k} \\times \\dfrac{1}{x}$, donc la dérivée est $${k} \\times \\left(-\\dfrac{1}{x^2}\\right)$.`]; },
      () => ["\\sqrt{x}", "\\dfrac{1}{2\\sqrt{x}}", ["2\\sqrt{x}", "\\dfrac{1}{\\sqrt{x}}", "-\\dfrac{1}{2\\sqrt{x}}"], "$(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$, pour $x > 0$."],
      () => { const k = pick([5, -3, 7, 12]); return [`${k}`, "0", [`${k}`, "1", `${k}x`], "La dérivée d'une fonction constante est nulle : sa courbe est une droite horizontale."]; },
      () => { const m = randNZ(-6, 6), p = randNZ(-9, 9); return [poly([m, p]), `${m}`, [poly([m, 0]), `${p}`, `${m + p}`], `La dérivée de $mx + p$ est $m$ : ici $${m}$, le coefficient directeur.`]; }
    ];
    const [f, d, fausses, sol] = pick(T)();
    const c = melangeChoix(`$f'(x) = ${d}$`, [...new Set(fausses)].filter((x) => x !== d).map((x) => `$f'(x) = ${x}$`));
    return {
      enonce: `Quelle est la fonction dérivée de $f(x) = ${f}$ ?`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Dérivées à connaître : $k \\to 0$ ; $x^n \\to nx^{n-1}$ ; $\\dfrac{1}{x} \\to -\\dfrac{1}{x^2}$ ; $\\sqrt{x} \\to \\dfrac{1}{2\\sqrt{x}}$.", "Un coefficient multiplicateur se garde : $(ku)' = ku'$.", "Vérifie en calculant le nombre dérivé en un point simple."],
      solution: sol
    };
  };

  GEN["d2-polynome"] = function () {
    const a = pick([1, -1, 2, -2, 3]), b = rand(-5, 5), c = rand(-6, 6), d = rand(-9, 9);
    const fp = [3 * a, 2 * b, c], f = poly([a, b, c, d]), fpTex = poly(fp);
    if (Math.random() < 0.5) {
      const x0 = rand(-2, 3), v = 3 * a * x0 * x0 + 2 * b * x0 + c;
      return {
        enonce: `$f(x) = ${f}$. Calcule $f'(${x0})$.`,
        mode: "nombre", prefixe: `$f'(${x0}) =$`, attendu: v,
        erreurs: [{ valeur: a * x0 ** 3 + b * x0 * x0 + c * x0 + d, message: `Ça, c'est $f(${x0})$. Calcule d'abord la fonction dérivée $f'(x)$.` }, { valeur: 3 * a * x0 * x0 + 2 * b * x0 + c + d, message: "La dérivée d'une constante est nulle : le terme constant disparaît." }].filter((e) => e.valeur !== v),
        aides: ["Dérive terme à terme : $(x^3)' = 3x^2$, $(x^2)' = 2x$, $(x)' = 1$, et une constante a pour dérivée $0$.", `$f'(x) = ${fpTex}$.`, `Remplace $x$ par $${x0}$.`],
        solution: `$f'(x) = ${fpTex}$, donc $f'(${x0}) = ${3 * a} \\times ${par(x0)}^2 ${sg(2 * b)} \\times ${par(x0)} ${sg(c)} = ${v}$.`
      };
    }
    const bonne = fpTex, fausses = [poly([3 * a, 2 * b, c, d]), poly([a, b, c]), poly([3 * a, b, c]), poly([3 * a, 2 * b, 0])];
    const ch = melangeChoix(`$${bonne}$`, [...new Set(fausses)].filter((x) => x !== bonne).map((x) => `$${x}$`));
    return {
      enonce: `$f(x) = ${f}$. Quelle est l'expression de $f'(x)$ ?`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["La dérivée d'une somme est la somme des dérivées.", "$(ax^3)' = 3ax^2$, $(bx^2)' = 2bx$, $(cx)' = c$ et $(d)' = 0$.", `Le terme en $x^3$ devient $${3 * a}x^2$.`],
      solution: `On dérive terme à terme${d ? ` ; la constante $${d}$ a pour dérivée $0$` : ""} : $f'(x) = ${fpTex}$.`
    };
  };

  GEN["d2-produit"] = function () {
    const p = randNZ(-3, 4), q = rand(-5, 5), r = pick([1, 2, -1, 3]), s = rand(-6, 6), x0 = rand(-2, 3);
    const u = (x) => p * x + q, v = (x) => r * x * x + s, up = p, vp = (x) => 2 * r * x;
    const rep = up * v(x0) + u(x0) * vp(x0);
    return {
      enonce: `$f(x) = (${poly([p, q])})(${poly([r, 0, s])})$. Calcule $f'(${x0})$.`,
      mode: "nombre", prefixe: `$f'(${x0}) =$`, attendu: rep,
      erreurs: [{ valeur: up * vp(x0), message: "La dérivée d'un produit n'est pas le produit des dérivées : $(uv)' = u'v + uv'$." }, { valeur: u(x0) * v(x0), message: `Ça, c'est $f(${x0})$.` }].filter((e) => e.valeur !== rep),
      aides: [`$u(x) = ${poly([p, q])}$ et $v(x) = ${poly([r, 0, s])}$ : $u'(x) = ${p}$ et $v'(x) = ${poly([2 * r, 0])}$.`, "$(uv)' = u'v + uv'$.", `$f'(${x0}) = ${p} \\times ${par(v(x0))} + ${par(u(x0))} \\times ${par(vp(x0))}$.`],
      solution: `$f'(x) = ${p}(${poly([r, 0, s])}) + (${poly([p, q])})(${poly([2 * r, 0])})$, donc $f'(${x0}) = ${p} \\times ${par(v(x0))} + ${par(u(x0))} \\times ${par(vp(x0))} = ${rep}$.`
    };
  };

  GEN["d2-quotient"] = function () {
    if (Math.random() < 0.35) {
      // inverse d'une fonction : f = 1 / v
      const a = pick([1, 2, 3]), b = pick([1, 2, 3, 4]), x0 = rand(-2, 2);
      const v0 = a * x0 * x0 + b, num = -2 * a * x0, rep = num / (v0 * v0);
      return {
        enonce: `$f(x) = \\dfrac{1}{${poly([a, 0, b])}}$. Calcule $f'(${x0})$ (fraction ou entier).`,
        mode: "nombre", prefixe: `$f'(${x0}) =$`, attendu: rep,
        erreurs: [{ valeur: -num / (v0 * v0), message: "Attention au signe : $\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$." }, { valeur: 1 / (2 * a * x0 || 1), message: "La dérivée de $\\dfrac{1}{v}$ n'est pas $\\dfrac{1}{v'}$." }].filter((e) => Math.abs(e.valeur - rep) > 1e-9),
        aides: [`$v(x) = ${poly([a, 0, b])}$ et $v'(x) = ${poly([2 * a, 0])}$.`, "$\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$.", `$v(${x0}) = ${v0}$ et $v'(${x0}) = ${2 * a * x0}$.`],
        solution: `$f'(x) = -\\dfrac{${poly([2 * a, 0])}}{(${poly([a, 0, b])})^2}$, donc $f'(${x0}) = -\\dfrac{${2 * a * x0}}{${v0}^2} = ${frac(num, v0 * v0)}$.`
      };
    }
    let a, b, c, d; do { a = randNZ(-4, 4); b = rand(-5, 5); c = randNZ(-3, 3); d = rand(-5, 5); } while (a * d - b * c === 0);
    const N = a * d - b * c, xs = [-2, -1, 0, 1, 2, 3].filter((x) => c * x + d !== 0), x0 = pick(xs), den = c * x0 + d;
    const q = Math.random() < 0.5;
    return {
      enonce: q ? `$f(x) = \\dfrac{${poly([a, b])}}{${poly([c, d])}}$. On admet que $f'(x) = \\dfrac{k}{(${poly([c, d])})^2}$. Que vaut $k$ ?` : `$f(x) = \\dfrac{${poly([a, b])}}{${poly([c, d])}}$. Calcule $f'(${x0})$ (fraction ou entier).`,
      mode: "nombre", prefixe: q ? "$k =$" : `$f'(${x0}) =$`, attendu: q ? N : N / (den * den),
      erreurs: (q ? [{ valeur: -N, message: "L'ordre compte : $u'v - uv'$, pas $uv' - u'v$." }] : [{ valeur: -N / (den * den), message: "L'ordre compte : $u'v - uv'$, pas $uv' - u'v$." }, { valeur: a / c, message: "La dérivée d'un quotient n'est pas le quotient des dérivées." }]).filter((e) => Math.abs(e.valeur - (q ? N : N / (den * den))) > 1e-9),
      aides: [`$u(x) = ${poly([a, b])}$, $u'(x) = ${a}$ ; $v(x) = ${poly([c, d])}$, $v'(x) = ${c}$.`, "$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.", `Numérateur : $${a}(${poly([c, d])}) - (${poly([a, b])}) \\times ${par(c)}$ : les termes en $x$ s'annulent.`],
      solution: `$u'v - uv' = ${a}(${poly([c, d])}) - ${par(c)}(${poly([a, b])}) = ${a * d} ${sg(-b * c)} = ${N}$, donc $f'(x) = \\dfrac{${N}}{(${poly([c, d])})^2}$${q ? "" : ` et $f'(${x0}) = \\dfrac{${N}}{${den * den}} = ${frac(N, den * den)}$`}.`
    };
  };

  GEN["d2-compo"] = function () {
    const t = rand(0, 3), a = pick([2, 3, -1, -2, 4]);
    let fTex, rep, err, aide, sol, x0, b;
    if (t === 0) { b = rand(-4, 4); x0 = rand(-2, 2); const w = a * x0 + b; fTex = `(${poly([a, b])})^2`; rep = 2 * a * w; err = 2 * w; aide = `$g(X) = X^2$, $g'(X) = 2X$ : $f'(x) = ${a} \\times 2(${poly([a, b])})$.`; sol = `$f'(x) = ${a} \\times 2(${poly([a, b])}) = ${2 * a}(${poly([a, b])})$, donc $f'(${x0}) = ${2 * a} \\times ${par(w)} = ${rep}$.`; }
    else if (t === 1) { b = rand(-3, 3); x0 = rand(-1, 2); const w = a * x0 + b; fTex = `(${poly([a, b])})^3`; rep = 3 * a * w * w; err = 3 * w * w; aide = `$g(X) = X^3$, $g'(X) = 3X^2$ : $f'(x) = ${a} \\times 3(${poly([a, b])})^2$.`; sol = `$f'(x) = ${3 * a}(${poly([a, b])})^2$, donc $f'(${x0}) = ${3 * a} \\times ${par(w)}^2 = ${rep}$.`; }
    else if (t === 2) { const A = Math.abs(a), w = pick([1, 4, 9, 16]); x0 = rand(0, 3); b = w - A * x0; fTex = `\\sqrt{${poly([A, b])}}`; rep = A / (2 * Math.sqrt(w)); err = 1 / (2 * Math.sqrt(w)); aide = `$g(X) = \\sqrt{X}$, $g'(X) = \\dfrac{1}{2\\sqrt{X}}$ : $f'(x) = \\dfrac{${A}}{2\\sqrt{${poly([A, b])}}}$.`; sol = `$f'(x) = \\dfrac{${A}}{2\\sqrt{${poly([A, b])}}}$, donc $f'(${x0}) = \\dfrac{${A}}{2\\sqrt{${w}}} = ${frac(A, 2 * Math.sqrt(w))}$.`; }
    else { do { b = rand(-4, 4); x0 = rand(-2, 2); } while (a * x0 + b === 0); const w = a * x0 + b; fTex = `\\dfrac{1}{${poly([a, b])}}`; rep = -a / (w * w); err = -1 / (w * w); aide = `$g(X) = \\dfrac{1}{X}$, $g'(X) = -\\dfrac{1}{X^2}$ : $f'(x) = ${a} \\times \\left(-\\dfrac{1}{(${poly([a, b])})^2}\\right)$.`; sol = `$f'(x) = -\\dfrac{${a}}{(${poly([a, b])})^2}$, donc $f'(${x0}) = -\\dfrac{${a}}{${w * w}} = ${frac(-a, w * w)}$.`; }
    return {
      enonce: `$f(x) = ${fTex}$. Calcule $f'(${x0})$ (fraction ou entier).`,
      mode: "nombre", prefixe: `$f'(${x0}) =$`, attendu: rep,
      erreurs: [{ valeur: err, message: `Il manque le facteur $${t === 2 ? Math.abs(a) : a}$ : la dérivée de $g(ax + b)$ est $a \\times g'(ax + b)$.` }].filter((e) => Math.abs(e.valeur - rep) > 1e-9),
      aides: ["Pour $f(x) = g(ax + b)$ : $f'(x) = a \\times g'(ax + b)$.", aide, `Remplace $x$ par $${x0}$.`],
      solution: sol
    };
  };

  // Logique : disjonction des cas (valeur absolue), contre-exemples
  GEN["d2-logique"] = function () {
    const T = [
      ["La fonction racine carrée est-elle dérivable en $0$ ?", "Non : le taux $\\dfrac{\\sqrt{h}}{h} = \\dfrac{1}{\\sqrt{h}}$ devient aussi grand qu'on veut", ["Oui, et le nombre dérivé vaut $0$", "Oui, et le nombre dérivé vaut $\\dfrac{1}{2}$", "Non, car elle n'est pas définie en $0$"], "Pour $h > 0$, $\\dfrac{\\sqrt{0 + h} - \\sqrt{0}}{h} = \\dfrac{1}{\\sqrt{h}}$, qui n'a pas de limite finie quand $h$ tend vers $0$ : la tangente en $0$ est verticale. Pourtant $\\sqrt{0} = 0$ existe bien."],
      ["La fonction valeur absolue est-elle dérivable en $0$ ?", "Non : le taux vaut $1$ si $h > 0$ et $-1$ si $h < 0$", ["Oui, et le nombre dérivé vaut $0$", "Oui, et le nombre dérivé vaut $1$", "Non, car $|0|$ n'existe pas"], "Disjonction des cas : si $h > 0$, $\\dfrac{|h|}{h} = 1$ ; si $h < 0$, $\\dfrac{|h|}{h} = -1$. Le taux ne se rapproche pas d'un nombre unique : pas de nombre dérivé en $0$."],
      ["Pour $h < 0$, le taux $\\dfrac{|0 + h| - |0|}{h}$ vaut :", "$-1$", ["$1$", "$0$", "$h$"], "Pour $h < 0$, $|h| = -h$, donc $\\dfrac{|h|}{h} = \\dfrac{-h}{h} = -1$."],
      ["Vrai ou faux : « une fonction dont la courbe se trace sans lever le crayon est dérivable partout » ?", "Faux", ["Vrai"], "Faux. Contre-exemple : la valeur absolue se trace sans lever le crayon, mais elle n'est pas dérivable en $0$ (pointe de la courbe)."],
      ["Vrai ou faux : « si $f'(x) = g'(x)$ pour tout $x$, alors $f = g$ » ?", "Faux", ["Vrai"], "Faux. Contre-exemple : $f(x) = x^2$ et $g(x) = x^2 + 1$ ont la même dérivée $2x$, mais $f \\neq g$."],
      ["Pour simplifier $|x - 2|$, on raisonne par disjonction des cas :", "si $x \\geqslant 2$, $|x - 2| = x - 2$ ; si $x < 2$, $|x - 2| = 2 - x$", ["si $x \\geqslant 0$, $|x - 2| = x - 2$ ; sinon $|x - 2| = x + 2$", "$|x - 2| = x - 2$ pour tout $x$", "$|x - 2| = |x| - 2$ pour tout $x$"], "On regarde le signe de ce qui est dans la valeur absolue : $x - 2 \\geqslant 0$ quand $x \\geqslant 2$."]
    ];
    const [q, b, f, s] = pick(T), c = melangeChoix(b, f);
    return {
      enonce: q, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Une fonction est dérivable en $a$ si le taux $\\dfrac{f(a + h) - f(a)}{h}$ se rapproche d'un **nombre réel** quand $h$ tend vers $0$.", "Pour la valeur absolue, distingue les cas $h > 0$ et $h < 0$.", "Un seul contre-exemple suffit pour réfuter une affirmation générale."],
      solution: s
    };
  };

  GEN["d2-physique"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const t0 = pick([0.5, 1, 1.5, 2]), v = +(9.8 * t0).toFixed(2);
      return {
        enonce: `Une noix de coco tombe d'un cocotier. La distance parcourue (en m) au bout de $t$ secondes est $d(t) = 4{,}9t^2$. Quelle est sa vitesse $v(t) = d'(t)$ à $t = ${nb(t0)}$ s ?`,
        mode: "nombre", prefixe: `$v(${nb(t0)}) =$`, suffixe: "m/s", attendu: v, tolerance: 1e-6,
        erreurs: [{ valeur: +(4.9 * t0 * t0).toFixed(4), message: `Ça, c'est la distance $d(${nb(t0)})$. La vitesse est la **dérivée** de la distance.` }, { valeur: +(4.9 * t0).toFixed(4), message: "$(t^2)' = 2t$ : n'oublie pas le facteur $2$." }].filter((e) => Math.abs(e.valeur - v) > 1e-9),
        aides: ["En physique, la vitesse est la dérivée de la position : $v(t) = d'(t)$, noté aussi $\\dfrac{\\mathrm{d}d}{\\mathrm{d}t}$.", "$(t^2)' = 2t$, donc $d'(t) = 4{,}9 \\times 2t = 9{,}8t$.", `Remplace $t$ par $${nb(t0)}$.`],
        solution: `$v(t) = d'(t) = 9{,}8t$, donc $v(${nb(t0)}) = 9{,}8 \\times ${nb(t0)} = ${nb(v)}$ m/s.`
      };
    }
    const a = pick([0.5, 1, 2, 3]), b = rand(1, 6), c = rand(0, 10), t0 = rand(1, 5), v = 2 * a * t0 + b;
    const xTex = `${a === 1 ? "" : nb(a)}t^2 + ${b}t${c ? ` + ${c}` : ""}`;
    return {
      enonce: t === 1 ? `Un scooter roule sur la route de Sada. Sa position (en m) à l'instant $t$ (en s) est $x(t) = ${xTex}$. Quelle est sa vitesse $x'(t)$ à $t = ${t0}$ s ?` : `En physique-chimie, on note $v = \\dfrac{\\mathrm{d}x}{\\mathrm{d}t}$ la dérivée de la position. Pour $x(t) = ${xTex}$, que vaut $\\dfrac{\\mathrm{d}x}{\\mathrm{d}t}$ à $t = ${t0}$ ?`,
      mode: "nombre", prefixe: "Vitesse :", suffixe: "m/s", attendu: v, tolerance: 1e-6,
      erreurs: [{ valeur: a * t0 * t0 + b * t0 + c, message: `Ça, c'est la position $x(${t0})$. La vitesse est la dérivée.` }].filter((e) => e.valeur !== v),
      aides: ["La vitesse instantanée est la dérivée de la position : $v(t) = x'(t)$.", `$x'(t) = ${2 * a === 1 ? "" : nb(2 * a)}t + ${b}$.`, `Remplace $t$ par $${t0}$.`],
      solution: `$x'(t) = ${2 * a === 1 ? "" : nb(2 * a)}t + ${b}$, donc $x'(${t0}) = ${nb(2 * a)} \\times ${t0} + ${b} = ${nb(v)}$ m/s.`
    };
  };

  GEN["d2-python"] = function () {
    const A = pick([0, 0, 1, 4, 16, 25]);
    const code = "```python\nfrom math import sqrt\n\ndef taux(f, a, h):\n    return (f(a + h) - f(a)) / h\n\nprint([taux(sqrt, " + A + ", 10**(-k)) for k in range(1, 6)])\n```";
    if (A === 0) {
      const c = melangeChoix("Elles deviennent de plus en plus grandes : la racine carrée n'est pas dérivable en 0", ["Elles se rapprochent de 0 : la racine carrée a pour nombre dérivé 0 en 0", "Elles se rapprochent de 0,5", "Le programme renvoie une erreur"]);
      return {
        enonce: `${code}\n\nLe programme affiche environ [3.16, 10.0, 31.6, 100.0, 316.2]. Qu'en conclure ?`,
        mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Chaque valeur est le taux de variation de la racine carrée entre $0$ et $h$.", "Ce taux vaut $\\dfrac{\\sqrt{h}}{h} = \\dfrac{1}{\\sqrt{h}}$.", "Un nombre dérivé existe seulement si le taux se rapproche d'un nombre réel."],
        solution: "Le taux $\\dfrac{1}{\\sqrt{h}}$ est multiplié par environ $3{,}16$ à chaque fois que $h$ est divisé par $10$ : il devient aussi grand qu'on veut. La racine carrée n'est pas dérivable en $0$ (tangente verticale)."
      };
    }
    const rep = 1 / (2 * Math.sqrt(A));
    return {
      enonce: `${code}\n\nVers quel nombre les valeurs affichées se rapprochent-elles ?`,
      mode: "nombre", prefixe: "Réponse :", attendu: rep, tolerance: 0.001,
      erreurs: [{ valeur: Math.sqrt(A), message: `Ça, c'est $\\sqrt{${A}}$. Les valeurs sont des **taux de variation**.` }].filter((e) => Math.abs(e.valeur - rep) > 0.001),
      aides: ["Chaque valeur est le taux de variation de la racine carrée entre $" + A + "$ et $" + A + " + h$.", "Quand $h$ tend vers $0$, le taux tend vers le nombre dérivé.", `$(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$ : calcule-le en $x = ${A}$.`],
      solution: `Les taux se rapprochent du nombre dérivé $\\dfrac{1}{2\\sqrt{${A}}} = ${frac(1, 2 * Math.sqrt(A))} = ${nb(rep)}$.`
    };
  };


  /* ---------- Première, chapitre 10 : variations et courbes représentatives (préfixe vr-) ---------- */
  // Tableau de signes de f' et de variations de f : xs (textes), cases de f' (2n − 1), ys (valeurs aux xs, "" si aucune)
  function tabSV(xs, cases, ys, nomF) {
    const W = 320, g = 58, hR = 30, H = 2 * hR + 74, n = xs.length;
    const X = (k) => g + 18 + (k * (W - g - 36)) / (n - 1);
    const monte = (k) => cases[2 * k] === "+";
    let s = `<svg class="graph tabvar" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tableau de signes de la dérivée et de variations de ${nomF || "f"}">`;
    s += `<g class="g-axis"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="none" stroke-width="1.2" style="stroke:var(--doux)"/><line x1="${g}" y1="1" x2="${g}" y2="${H - 1}"/><line x1="1" y1="${hR}" x2="${W - 1}" y2="${hR}"/><line x1="1" y1="${2 * hR}" x2="${W - 1}" y2="${2 * hR}"/></g>`;
    s += `<text class="g-label" x="${g / 2}" y="20" text-anchor="middle">x</text><text class="g-label" x="${g / 2}" y="${hR + 20}" text-anchor="middle">${nomF || "f"}′(x)</text><text class="g-label" x="${g / 2}" y="${2 * hR + 42}" text-anchor="middle" style="fill:var(--lagon)">${nomF || "f"}</text>`;
    xs.forEach((x, k) => { s += `<text class="g-label" x="${X(k)}" y="20" text-anchor="middle">${x}</text>`; });
    cases.forEach((c, i) => {
      if (i % 2 === 0) { const xm = (X(i / 2) + X(i / 2 + 1)) / 2; s += `<text class="g-clabel" x="${xm}" y="${hR + 21}" text-anchor="middle" style="fill:${c === "+" ? "var(--lagon)" : c === "?" ? "var(--ylang)" : "var(--faux)"}">${c === "-" ? "−" : c}</text>`; }
      else { const xv = X((i + 1) / 2); s += `<line x1="${xv}" y1="${hR}" x2="${xv}" y2="${2 * hR}" style="stroke:var(--trait);stroke-width:1;stroke-dasharray:3 3"/>`; if (c) s += `<text class="g-label" x="${xv}" y="${hR + 20}" text-anchor="middle" style="paint-order:stroke;stroke:var(--surface);stroke-width:4px">${c}</text>`; }
    });
    const haut = xs.map((_, k) => (k > 0 && monte(k - 1)) || (k < n - 1 && !monte(k)));
    const yH = 2 * hR + 18, yB = H - 10;
    ys.forEach((y, k) => { if (y !== "" && y !== undefined) s += `<text class="g-label" x="${X(k)}" y="${haut[k] ? yH : yB}" text-anchor="middle">${y}</text>`; });
    for (let k = 0; k < n - 1; k++) {
      if (cases[2 * k] !== "+" && cases[2 * k] !== "-") continue; // case « ? » : tableau à compléter
      const up = monte(k), y1 = up ? yB - 14 : yH + 8, y2 = up ? yH + 8 : yB - 14, x1 = X(k) + (ys[k] === "" ? 0 : 14), x2 = X(k + 1) - (ys[k + 1] === "" ? 0 : 14);
      const a = Math.atan2(y2 - y1, x2 - x1), hx = x2 - 7 * Math.cos(a - 0.45), hy = y2 - 7 * Math.sin(a - 0.45), kx = x2 - 7 * Math.cos(a + 0.45), ky = y2 - 7 * Math.sin(a + 0.45);
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--lagon);stroke-width:1.8"/><path d="M${x2} ${y2} L${hx.toFixed(1)} ${hy.toFixed(1)} L${kx.toFixed(1)} ${ky.toFixed(1)}z" style="fill:var(--lagon)"/>`;
    }
    return s + `</svg>`;
  }
  // Cubique f(x) = x³ − 3x : croissante, décroissante, croissante
  FIGURES["cubique-variations"] = () => {
    const f = (x) => x ** 3 - 3 * x;
    let s = graph({ xmin: -2.5, xmax: 2.5, ymin: -3.5, ymax: 3.5, h: 280, curves: [{ f, a: -2.15, b: 2.15, closed: false }, { f: () => 2, a: -1.6, b: -0.4, closed: false }, { f: () => -2, a: 0.4, b: 1.6, closed: false }], marques: [{ x: -1.75, y: -2.6, texte: "f′ > 0" }, { x: 0.45, y: 1.6, texte: "f′ < 0" }, { x: 1.75, y: 2.6, texte: "f′ > 0" }], points: [{ x: -1, y: 2, label: "max 2", gauche: true }, { x: 1, y: -2, label: "min −2" }], aria: "Courbe de x³ − 3x : elle monte tant que f′ est positive, descend entre −1 et 1 où f′ est négative ; tangentes horizontales au maximum 2 et au minimum −2" });
    [1, 2].forEach((i) => { s = tiret(s, i); });
    return s;
  };
  FIGURES["tabsv-cubique"] = () => tabSV(["−∞", "−1", "1", "+∞"], ["+", "0", "-", "0", "+"], ["", "2", "−2", ""]);
  // x³ : f′(0) = 0 mais pas d'extremum
  FIGURES["x3-palier"] = () => tiret(graph({ xmin: -2, xmax: 2, ymin: -3.2, ymax: 3.2, h: 240, curves: [{ f: (x) => x ** 3, a: -1.45, b: 1.45, closed: false, label: "y = x³", lx: 1.4, dx: -6, dy: 6 }, { f: () => 0, a: -1.2, b: 1.2, closed: false }], points: [{ x: 0, y: 0, label: "f′(0) = 0" }], aria: "La courbe de x³ a une tangente horizontale en 0 mais continue de monter : pas d'extremum" }), 1);
  // Parité : x² symétrique par rapport à l'axe des ordonnées, x³ par rapport à l'origine
  FIGURES["parite"] = () => graph({ xmin: -2.4, xmax: 2.4, ymin: -3.4, ymax: 4.4, h: 300, curves: [{ f: (x) => x * x, a: -2.05, b: 2.05, closed: false, label: "y = x² (paire)", lx: -2, dx: 96, dy: 4 }, { f: (x) => x ** 3, a: -1.48, b: 1.6, closed: false, label: "y = x³ (impaire)", lx: -1.48, dx: 112, dy: 12 }], points: [{ x: -1.5, y: 2.25 }, { x: 1.5, y: 2.25 }, { x: -1.2, y: -1.728 }, { x: 1.2, y: 1.728 }], aria: "La parabole y = x² est symétrique par rapport à l'axe des ordonnées ; la courbe y = x³ est symétrique par rapport à l'origine" });
  // Inégalité : la courbe de x³ est au-dessus de la droite y = 3x − 2 sur [0 ; +∞[, tangente en (1 ; 1)
  FIGURES["inegalite-cubique"] = () => graph({ xmin: -0.5, xmax: 2.4, ymin: -2.5, ymax: 6.5, xstep: 0.5, xetiq: 1, h: 280, curves: [{ f: (x) => x ** 3, a: 0, b: 1.86, closed: false, label: "y = x³", lx: 1.8, dx: -8, dy: 2 }, { f: (x) => 3 * x - 2, a: 0, b: 2.3, closed: false, label: "y = 3x − 2", lx: 2.3, dx: -2, dy: 18 }], points: [{ x: 1, y: 1, label: "(1 ; 1)" }], aria: "Sur [0 ; +∞[, la courbe de x³ est au-dessus de la droite y = 3x − 2, qui la touche au point (1 ; 1)" });
  // Méthode de Newton pour x² − 2 : tangente en 2, puis en 1,5
  FIGURES["newton"] = () => {
    const f = (x) => x * x - 2;
    let s = graph({ xmin: -0.3, xmax: 2.4, ymin: -2.4, ymax: 3, xstep: 0.5, xetiq: 0.5, ystep: 1, h: 260, curves: [{ f, a: 0, b: 2.2, closed: false, label: "y = x² − 2", lx: 2.2, dx: -6, dy: -8 }, { f: (x) => 4 * (x - 2) + 2, a: 1.4, b: 2.15, closed: false }, { f: (x) => 3 * (x - 1.5) + 0.25, a: 1.3, b: 1.75, closed: false }], points: [{ x: 2, y: 2, label: "x₀ = 2" }, { x: 1.5, y: 0, label: "x₁ = 1,5", gauche: true }, { x: 1.5, y: 0.25 }, { x: 1.4167, y: 0 }], aria: "Méthode de Newton : la tangente en x₀ = 2 coupe l'axe en x₁ = 1,5, la tangente suivante en x₂ ≈ 1,417, de plus en plus près de √2" });
    [1, 2].forEach((i) => { s = tiret(s, i); });
    return s;
  };

  // Cubique f(x) = a(x³ − (3/2)(r1 + r2)x² + 3 r1 r2 x) + d, dont la dérivée est 3a(x − r1)(x − r2)
  function vrCubique() {
    let r1, r2; do { r1 = rand(-3, 2); r2 = r1 + pick([2, 4]); } while ((r1 + r2) % 2);
    const a = pick([1, 1, -1]), d = rand(-4, 4);
    const c2 = (-3 * a * (r1 + r2)) / 2, c1 = 3 * a * r1 * r2;
    const f = (x) => a * x ** 3 + c2 * x * x + c1 * x + d;
    return { a, r1, r2, d, f, tex: poly([a, c2, c1, d]), fp: poly([3 * a, 2 * c2, c1]), fpFact: `${a > 0 ? "3" : "-3"}${facteur(r1)}${facteur(r2)}` };
  }

  GEN["vr-tableau"] = function () {
    const C = vrCubique(), t = rand(0, 2), f1 = C.f(C.r1), f2 = C.f(C.r2);
    const cases = C.a > 0 ? ["+", "0", "-", "0", "+"] : ["-", "0", "+", "0", "-"];
    const tab = tabSV(["−∞", nbSvg(C.r1), nbSvg(C.r2), "+∞"], cases, ["", nbSvg(f1), nbSvg(f2), ""]);
    const aides = [`$f'(x) = ${C.fp}$.`, `$f'(x) = ${C.fpFact}$ : les racines sont $${C.r1}$ et $${C.r2}$.`, `Signe de $f'$ : ${C.a > 0 ? "positif à l'extérieur des racines, négatif entre" : "négatif à l'extérieur des racines, positif entre"}. Puis calcule $f(${C.r1})$ et $f(${C.r2})$.`];
    const base = `$f'(x) = ${C.fpFact}$, ${C.a > 0 ? "positif à l'extérieur des racines et négatif entre elles" : "négatif à l'extérieur des racines et positif entre elles"}. Donc $f$ est ${C.a > 0 ? `croissante sur $]-\\infty\\,;${C.r1}]$, décroissante sur $[${C.r1}\\,;${C.r2}]$, croissante sur $[${C.r2}\\,;+\\infty[$` : `décroissante sur $]-\\infty\\,;${C.r1}]$, croissante sur $[${C.r1}\\,;${C.r2}]$, décroissante sur $[${C.r2}\\,;+\\infty[$`}, avec $f(${C.r1}) = ${f1}$ et $f(${C.r2}) = ${f2}$.`;
    if (t === 0) {
      const I = (x, y) => `$[${x}\\,;${y}]$`, bonne = C.a > 0 ? I(C.r1, C.r2) : `$]-\\infty\\,;${C.r1}]$ et $[${C.r2}\\,;+\\infty[$`;
      const c = melangeChoix(bonne, [C.a > 0 ? `$]-\\infty\\,;${C.r1}]$ et $[${C.r2}\\,;+\\infty[$` : I(C.r1, C.r2), I(Math.min(f1, f2), Math.max(f1, f2)), `$[${C.r1 - 1}\\,;${C.r2 + 1}]$`]);
      return { enonce: `$f(x) = ${C.tex}$. Sur quel(s) intervalle(s) $f$ est-elle décroissante ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides, solution: base, figureSolution: tab, figure: tabSV(["−∞", "?", "?", "+∞"], ["?", "", "?", "", "?"], ["", "", "", ""]) };
    }
    const maxX = C.a > 0 ? C.r1 : C.r2, minX = C.a > 0 ? C.r2 : C.r1, q = t === 1;
    return {
      enonce: `$f(x) = ${C.tex}$. ${q ? "Quelle est la valeur du maximum local de $f$ ?" : "En quelle valeur de $x$ la fonction $f$ admet-elle un minimum local ?"}`,
      mode: "nombre", prefixe: q ? "Maximum local :" : "$x =$", attendu: q ? C.f(maxX) : minX,
      erreurs: q ? [{ valeur: maxX, message: `Ça, c'est l'abscisse du maximum. On demande sa valeur $f(${maxX})$.` }].filter((e) => e.valeur !== C.f(maxX)) : [{ valeur: maxX, message: "En cette valeur, $f$ passe de croissante à décroissante : c'est un **maximum** local." }, { valeur: C.f(minX), message: "Ça, c'est la valeur du minimum. On demande l'abscisse où il est atteint." }].filter((e) => e.valeur !== minX),
      aides, solution: base, figureSolution: tab, figure: tabSV(["−∞", "?", "?", "+∞"], ["?", "", "?", "", "?"], ["", "", "", ""])
    };
  };

  GEN["vr-lecture-derivee"] = function () {
    let r1, r2; do { r1 = rand(-3, 1); r2 = r1 + rand(2, 4); } while (r2 > 3);
    const s = pick([1, -1]), k = 0.5, fp = (x) => s * k * (x - r1) * (x - r2);
    const m = -s * k * ((r2 - r1) / 2) ** 2;
    const fig = graph({ xmin: -4.5, xmax: 4.5, ymin: Math.min(m, 0) - 1.5, ymax: Math.max(m, 0) + 2.5, h: 240, curves: [{ f: fp, ...(() => { const [a, b] = d1Domaine(fp, (r1 + r2) / 2, 4.4, Math.min(m, 0) - 1.4, Math.max(m, 0) + 2.4); return { a, b }; })(), closed: false, label: "C<tspan class=\"sub\" dy=\"3\">f′</tspan>", lx: (r1 + r2) / 2, dx: 18, dy: s > 0 ? 20 : -10 }], points: [{ x: r1, y: 0 }, { x: r2, y: 0 }], aria: "Courbe de la fonction dérivée f′" });
    const I = (x, y) => `$[${x}\\,;${y}]$`, ext = `$]-\\infty\\,;${r1}]$ et $[${r2}\\,;+\\infty[$`;
    const croiss = s > 0 ? ext : I(r1, r2);
    const c = melangeChoix(croiss, [s > 0 ? I(r1, r2) : ext, `$[${r1}\\,;+\\infty[$`, `$]-\\infty\\,;${r2}]$`]);
    return {
      enonce: "On a tracé la courbe de la **dérivée** $f'$ d'une fonction $f$. Sur quel(s) intervalle(s) $f$ est-elle croissante ?",
      mode: "choix", choix: c.choix, attendu: c.attendu, figure: fig,
      aides: ["Attention : c'est la courbe de $f'$, pas celle de $f$.", "$f$ est croissante là où $f'(x) \\geqslant 0$, c'est-à-dire là où la courbe de $f'$ est **au-dessus** de l'axe des abscisses.", `La courbe de $f'$ coupe l'axe en $${r1}$ et $${r2}$.`],
      solution: `$f'(x) \\geqslant 0$ ${s > 0 ? `à l'extérieur de $[${r1}\\,;${r2}]$` : `sur $[${r1}\\,;${r2}]$`} : $f$ est croissante sur ${croiss}.`
    };
  };

  GEN["vr-second-degre"] = function () {
    const a = pick([1, -1, 2, -2, 3, -3]), al = randNZ(-4, 4), be = rand(-8, 8), b = -2 * a * al, c = a * al * al + be;
    const q = Math.random() < 0.5;
    return {
      enonce: `$f(x) = ${poly([a, b, c])}$. En étudiant le signe de $f'(x)$, ${q ? `détermine l'abscisse du point où $f$ atteint son ${a > 0 ? "minimum" : "maximum"}` : `détermine le ${a > 0 ? "minimum" : "maximum"} de $f$`}.`,
      mode: "nombre", prefixe: q ? "$x =$" : (a > 0 ? "Minimum :" : "Maximum :"), attendu: q ? al : be,
      erreurs: q ? [{ valeur: -al, message: "Résous $2ax + b = 0$ : attention au signe, $x = -\\dfrac{b}{2a}$." }, { valeur: be, message: "Ça, c'est la valeur de l'extremum. On demande où il est atteint." }].filter((e) => e.valeur !== al) : [{ valeur: al, message: `Ça, c'est l'abscisse $x = ${al}$. On demande la valeur $f(${al})$.` }].filter((e) => e.valeur !== be),
      aides: [`$f'(x) = ${poly([2 * a, b])}$.`, `$f'(x) = 0 \\iff x = ${al}$, et $f'$ est ${a > 0 ? "négative avant, positive après" : "positive avant, négative après"}.`, q ? "C'est l'abscisse du sommet de la parabole." : `Calcule $f(${al})$.`],
      solution: `$f'(x) = ${poly([2 * a, b])}$ s'annule en $${al}$ en changeant de signe (${a > 0 ? "− puis +" : "+ puis −"}) : $f$ admet un ${a > 0 ? "minimum" : "maximum"} en $x = ${al}$, égal à $f(${al}) = ${be}$. On retrouve le sommet $\\left(-\\dfrac{b}{2a}\\,;\\beta\\right)$ du chapitre 5.`,
      figure: tabSV(["−∞", "?", "+∞"], ["?", "", "?"], ["", "", ""]),
      figureSolution: tabSV(["−∞", nbSvg(al), "+∞"], a > 0 ? ["-", "0", "+"] : ["+", "0", "-"], ["", nbSvg(be), ""])
    };
  };

  GEN["vr-parite"] = function () {
    const T = [
      ["x^4 - 3x^2", 0, "$f(-x) = (-x)^4 - 3(-x)^2 = x^4 - 3x^2 = f(x)$ : **paire**, la courbe est symétrique par rapport à l'axe des ordonnées."],
      ["x^3 + 5x", 1, "$f(-x) = (-x)^3 + 5(-x) = -x^3 - 5x = -f(x)$ : **impaire**, la courbe est symétrique par rapport à l'origine."],
      ["x^2 + x", 2, "$f(-1) = 0$ et $f(1) = 2$ : on n'a ni $f(-1) = f(1)$, ni $f(-1) = -f(1)$. Ni paire ni impaire (un contre-exemple suffit)."],
      ["|x| + 1", 0, "$f(-x) = |-x| + 1 = |x| + 1 = f(x)$ : **paire**."],
      ["\\dfrac{1}{x}", 1, "Défini sur $\\mathbb{R} \\setminus \\{0\\}$, symétrique par rapport à $0$, et $f(-x) = -\\dfrac{1}{x} = -f(x)$ : **impaire**."],
      ["x^3 + 1", 2, "$f(-1) = 0$ et $f(1) = 2$ : ni $f(-1) = f(1)$, ni $f(-1) = -f(1)$. Ni paire ni impaire."],
      ["\\sqrt{x}", 2, "L'ensemble de définition $[0\\,;+\\infty[$ n'est pas symétrique par rapport à $0$ : ni paire ni impaire."],
      ["\\dfrac{x^2 + 1}{x}", 1, "$f(-x) = \\dfrac{x^2 + 1}{-x} = -f(x)$ : **impaire**."],
      ["2x^2 - 7", 0, "$f(-x) = 2(-x)^2 - 7 = 2x^2 - 7 = f(x)$ : **paire**."],
      ["x^5 - 2x^3", 1, "$f(-x) = -x^5 + 2x^3 = -f(x)$ : **impaire**."]
    ];
    const [fx, rep, sol] = pick(T);
    return {
      enonce: `La fonction $f(x) = ${fx}$ est-elle paire, impaire ou ni l'un ni l'autre ?`,
      mode: "choix", choix: ["Paire", "Impaire", "Ni paire ni impaire"], attendu: rep,
      aides: ["Vérifie d'abord que l'ensemble de définition est symétrique par rapport à $0$.", "Calcule $f(-x)$ : si $f(-x) = f(x)$ pour tout $x$, $f$ est paire ; si $f(-x) = -f(x)$, $f$ est impaire.", "Pour prouver « ni l'un ni l'autre », un contre-exemple numérique suffit (par exemple $x = 1$)."],
      solution: sol
    };
  };

  // Logique : implication, réciproque, condition nécessaire non suffisante
  GEN["vr-logique"] = function () {
    const T = [
      ["Si $f'(a) = 0$, alors $f$ admet un extremum en $a$.", 1, "**Faux**. Contre-exemple : $f(x) = x^3$, $f'(0) = 0$ mais $f$ est croissante, sans extremum en $0$. La condition $f'(a) = 0$ est **nécessaire**, pas suffisante."],
      ["Si $f$ est dérivable sur un intervalle ouvert et admet un extremum en $a$, alors $f'(a) = 0$.", 0, "**Vrai** : en un extremum à l'intérieur de l'intervalle, la tangente est horizontale."],
      ["Si $f'(x) \\geqslant 0$ pour tout $x$ de $I$, alors $f$ est croissante sur $I$.", 0, "**Vrai** : c'est le théorème du cours (admis)."],
      ["Si $f$ est strictement croissante sur $I$, alors $f'(x) > 0$ pour tout $x$ de $I$.", 1, "**Faux**. Contre-exemple : $x^3$ est strictement croissante sur $\\mathbb{R}$, mais sa dérivée $3x^2$ s'annule en $0$. La réciproque d'un théorème vrai n'est pas forcément vraie."],
      ["Si $f'$ s'annule en $a$ en changeant de signe, alors $f$ admet un extremum en $a$.", 0, "**Vrai** : $f$ change de sens de variation en $a$ ; de « + » à « − » c'est un maximum, de « − » à « + » un minimum."],
      ["Si $f'(x) = 0$ pour tout $x$ d'un intervalle $I$, alors $f$ est constante sur $I$.", 0, "**Vrai** : une dérivée nulle sur un intervalle caractérise les fonctions constantes."],
      ["Une fonction paire ne peut pas être croissante sur $\\mathbb{R}$, sauf si elle est constante.", 0, "**Vrai** : si $f$ est paire, $f(-1) = f(1)$. Si $f$ était croissante et non constante, on aurait une contradiction entre $f(-x)$ et $f(x)$ pour un $x > 0$ où elle augmente."]
    ];
    const [aff, rep, sol] = pick(T);
    return {
      enonce: `Vrai ou faux : « ${aff} »`,
      mode: "choix", choix: ["Vrai", "Faux"], attendu: rep,
      aides: ["Distingue une implication « si A alors B » de sa réciproque « si B alors A ».", "Pense à la fonction $x \\mapsto x^3$ : elle a une tangente horizontale en $0$ sans y avoir d'extremum.", "Pour dire « faux », un contre-exemple suffit."],
      solution: sol
    };
  };

  GEN["vr-optimisation"] = function () {
    if (Math.random() < 0.5) {
      const L = pick([12, 18, 24, 30, 36]), x = L / 6, V = (2 * L ** 3) / 27, q = Math.random() < 0.5;
      return {
        enonce: `Dans une plaque carrée de $${L}$ cm de côté, on découpe aux quatre coins des carrés de côté $x$ cm, puis on replie pour former une boîte sans couvercle. Son volume est $V(x) = x(${L} - 2x)^2$ pour $0 < x < ${L / 2}$. ${q ? "Pour quelle valeur de $x$ le volume est-il maximal ?" : "Quel est le volume maximal ?"}`,
        mode: "nombre", prefixe: q ? "$x =$" : "$V_{\\max} =$", suffixe: q ? "cm" : "cm³", attendu: q ? x : V,
        erreurs: q ? [{ valeur: L / 2, message: "Pour cette valeur, $V(x) = 0$ : la boîte est plate. C'est l'autre racine de $V'$." }] : [{ valeur: x, message: "Ça, c'est la valeur de $x$. On demande le volume $V(x)$." }],
        aides: ["$V(x) = x(L - 2x)^2$ est un produit : $V'(x) = (L - 2x)^2 + x \\times 2(L - 2x) \\times (-2)$.", `$V'(x) = (${L} - 2x)(${L} - 6x)$.`, `Sur $]0\\,;${L / 2}[$, $V'$ s'annule en $x = ${x}$ en passant de « + » à « − ».`],
        solution: `$V'(x) = (${L} - 2x)^2 - 4x(${L} - 2x) = (${L} - 2x)(${L} - 6x)$. Sur $]0\\,;${L / 2}[$, $${L} - 2x > 0$ : $V'$ a le signe de $${L} - 6x$, positif avant $${x}$ et négatif après. Le volume est maximal pour $x = ${x}$ cm : $V(${x}) = ${x} \\times ${L - 2 * x}^2 = ${nb(V)}$ cm³.`,
        figure: patron(L)
      };
    }
    const k = pick([10, 12, 15]), c = pick([200, 500]), Bmax = k ** 3 - c, q = Math.random() < 0.5;
    return {
      enonce: `Une distillerie d'ylang-ylang produit $x$ litres d'huile essentielle par mois ($0 \\leqslant x \\leqslant 20$). Son bénéfice, en euros, est $B(x) = -2x^3 + ${3 * k}x^2 - ${c}$. ${q ? "Quelle production rend le bénéfice maximal ?" : "Quel est le bénéfice maximal ?"}`,
      mode: "nombre", prefixe: q ? "$x =$" : "$B_{\\max} =$", suffixe: q ? "L" : "€", attendu: q ? k : Bmax,
      erreurs: q ? [{ valeur: 0, message: "En $0$, $B'$ s'annule mais le bénéfice y est négatif : c'est un minimum." }] : [{ valeur: k, message: "Ça, c'est la production optimale. On demande le bénéfice $B(x)$." }],
      aides: [`$B'(x) = -6x^2 + ${6 * k}x$.`, `$B'(x) = -6x(x - ${k})$ : positif sur $]0\\,;${k}[$, négatif sur $]${k}\\,;20]$.`, `Le maximum est atteint en $x = ${k}$ ; calcule $B(${k})$.`],
      solution: `$B'(x) = -6x(x - ${k})$ : $B$ croît sur $[0\\,;${k}]$ puis décroît sur $[${k}\\,;20]$. Le bénéfice est maximal pour $${k}$ L : $B(${k}) = -2 \\times ${k ** 3} + ${3 * k} \\times ${k * k} - ${c} = ${nb(Bmax)}$ €.`,
      figure: tabSV(["0", "?", "20"], ["?", "", "?"], ["", "", ""], "B"),
      figureSolution: tabSV(["0", `${k}`, "20"], ["+", "0", "-"], [nbSvg(-c), nbSvg(Bmax), nbSvg(-2 * 8000 + 3 * k * 400 - c)], "B")
    };
  };

  GEN["vr-inegalite"] = function () {
    const m = pick([2, 3, 5, 6]), q = Math.random() < 0.5;
    return {
      enonce: `Pour comparer $x^3$ et $3x - ${m}$ sur $[0\\,;+\\infty[$, on étudie $d(x) = x^3 - 3x + ${m}$. ${q ? "Quel est le minimum de $d$ sur $[0\\,;+\\infty[$ ?" : "En quelle valeur de $x$ ce minimum est-il atteint ?"}`,
      mode: "nombre", prefixe: q ? "Minimum :" : "$x =$", attendu: q ? m - 2 : 1,
      erreurs: q ? [{ valeur: m, message: "Ça, c'est $d(0)$. Le minimum est atteint là où $d'$ change de signe." }, { valeur: 1, message: "Ça, c'est l'abscisse du minimum. On demande sa valeur $d(1)$." }].filter((e) => e.valeur !== m - 2) : [{ valeur: -1, message: "$-1$ n'est pas dans $[0\\,;+\\infty[$." }],
      aides: ["$d'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$.", "Sur $[0\\,;+\\infty[$, $d'$ est négative avant $1$ et positive après.", "Le minimum est $d(1)$."],
      solution: `$d'(x) = 3(x - 1)(x + 1)$ : $d$ décroît sur $[0\\,;1]$ et croît sur $[1\\,;+\\infty[$. Son minimum est $d(1) = 1 - 3 + ${m} = ${m - 2}$. ${m - 2 === 0 ? "Donc $d(x) \\geqslant 0$ : $x^3 \\geqslant 3x - 2$ sur $[0\\,;+\\infty[$, avec égalité en $1$ (la droite est tangente à la courbe)." : `Donc $d(x) > 0$ : $x^3 > 3x - ${m}$ sur $[0\\,;+\\infty[$, la courbe est toujours au-dessus de la droite.`}`,
      figure: tabSV(["0", "?", "+∞"], ["?", "", "?"], ["", "", ""], "d"),
      figureSolution: tabSV(["0", "1", "+∞"], ["-", "0", "+"], [nbSvg(m), nbSvg(m - 2), ""], "d")
    };
  };

  GEN["vr-newton"] = function () {
    const [A, x0] = pick([[2, 1], [2, 2], [3, 2], [5, 2], [10, 3], [7, 3], [6, 2]]), x1 = (x0 + A / x0) / 2;
    const code = "```python\ndef newton(f, fp, x, n):\n    for i in range(n):\n        x = x - f(x) / fp(x)\n    return x\n\ndef f(x):\n    return x**2 - " + A + "\n\ndef fp(x):\n    return 2 * x\n```";
    if (Math.random() < 0.6) {
      return {
        enonce: `${code}\n\nQue renvoie newton(f, fp, ${x0}, 1) ? (Valeur exacte : fraction ou décimal.)`,
        mode: "nombre", prefixe: "Résultat :", attendu: x1, tolerance: 1e-6,
        erreurs: [{ valeur: x0 - (x0 * x0 - A), message: "On divise $f(x)$ par $f'(x)$ avant de soustraire." }].filter((e) => Math.abs(e.valeur - x1) > 1e-6),
        aides: ["Une seule étape : $x_1 = x_0 - \\dfrac{f(x_0)}{f'(x_0)}$.", `$f(${x0}) = ${x0 * x0 - A}$ et $f'(${x0}) = ${2 * x0}$.`, `$x_1 = ${x0} - \\dfrac{${x0 * x0 - A}}{${2 * x0}}$.`],
        solution: `$x_1 = ${x0} - \\dfrac{${x0 * x0 - A}}{${2 * x0}} = ${frac(x0 * 2 * x0 - (x0 * x0 - A), 2 * x0)}${Number.isInteger(x1 * 1000) ? ` = ${nb(x1)}` : ` \\approx ${nb(+x1.toFixed(4))}`}$. C'est l'abscisse où la tangente en $${x0}$ coupe l'axe des abscisses.`
      };
    }
    const c = melangeChoix(`$\\sqrt{${A}}$`, [`$${A}$`, `$\\dfrac{${A}}{2}$`, "$0$"]);
    return {
      enonce: `${code}\n\nVers quel nombre se rapprochent les résultats de newton(f, fp, ${x0}, n) quand n augmente ?`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["La méthode de Newton cherche une solution de $f(x) = 0$.", `Ici $f(x) = x^2 - ${A}$.`, `$x^2 - ${A} = 0$ pour $x = \\sqrt{${A}}$ ou $x = -\\sqrt{${A}}$ ; on part d'un nombre positif.`],
      solution: `La méthode suit les tangentes jusqu'à la solution positive de $x^2 - ${A} = 0$ : $\\sqrt{${A}} \\approx ${nb(+Math.sqrt(A).toFixed(6))}$. Quelques étapes suffisent pour obtenir beaucoup de décimales exactes.`
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
  Object.keys(GEN).filter((k) => /^(ld|am|cd|ar|cl|fa|ve|st|vx|tc|co|dr|fr|sg|pc|ec|sy|su|s2|pi|s5|d1|tr|d2|vr)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => { const q = g(i); if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9)); return q; };
  });

  window.PM_EXO = { GEN, FIGURES, graph, shuffle };
})();
