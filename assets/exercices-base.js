/*
  Outils communs à tous les exercices du site (lycée, collège, école) : tirages au hasard, écriture des nombres,
  graphiques SVG (graph) et figures prédéfinies des cours (FIGURES).
  Ce petit fichier est chargé seul pour le primaire et le collège ; assets/exercices.js (générateurs du lycée,
  beaucoup plus lourd) n'est téléchargé que pour un chapitre du lycée. Les deux reprennent ces outils
  par window.PM_EXO.outils : un outil ajouté ici doit aussi être ajouté à la liste « outils » en bas du fichier.
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
  // nombre d'un axe de graphique : virgule décimale, signe « − », espace des milliers (12 000)
  const nbAxe = (v) => String(+(+v).toFixed(6)).replace("-", "−").replace(".", ",").replace(/^(−?)(\d{4,})/, (m, s, e) => s + e.replace(/\B(?=(\d{3})+(?!\d))/g, " "));

  // Élisions devant un mot inséré (prénom, lieu…) : deN("Anli") → « d'Anli », queN("Awa") → « qu'Awa », leN("îlot") → « l'îlot »
  const commenceVoyelle = (s) => /^[aeiouyàâäéèêëîïôöùûüœAEIOUYÀÂÄÉÈÊËÎÏÔÖÙÛÜŒ]/.test(String(s).trim());
  const deN = (s) => (commenceVoyelle(s) ? `d'${s}` : `de ${s}`);
  const queN = (s) => (commenceVoyelle(s) ? `qu'${s}` : `que ${s}`);
  const leN = (s) => (commenceVoyelle(s) ? `l'${s}` : `le ${s}`);
  const laN = (s) => (commenceVoyelle(s) ? `l'${s}` : `la ${s}`);

  /* ---------- Graphiques SVG ---------- */
  // Étiquettes des graphiques : largeur approchée d'un texte et boîtes englobantes, pour éviter les chevauchements
  const largeurTexte = (t, taille) => String(t).replace(/<[^>]+>/g, "").length * taille * 0.62;
  const boiteTexte = (x, y, t, taille, ancre) => { const w = largeurTexte(t, taille), x1 = ancre === "end" ? x - w : ancre === "middle" ? x - w / 2 : x; return { x1: x1 - 1, x2: x1 + w + 1, y1: y - taille * 0.95, y2: y + taille * 0.3 + (/<tspan/.test(t) ? 4 : 0) }; };
  const seCoupent = (a, b) => a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;

  function graph(o) {
    const W = 320, pad = 14, padL = o.padL || pad, padB = o.padB || (o.ymin >= 0 ? 18 : pad); // marges de gauche et du bas (plus grande si l’axe horizontal est tout en bas)
    const xstep = o.xstep || 1, ystep = o.ystep || 1;
    const spanX = o.xmax - o.xmin, spanY = o.ymax - o.ymin;
    const ux = (W - padL - pad) / spanX;
    let H = o.h || Math.round(ux * spanY * (xstep / ystep) + pad + padB);
    H = Math.max(200, Math.min(400, H));
    const uy = (H - pad - padB) / spanY;
    const X = (x) => +(padL + (x - o.xmin) * ux).toFixed(1);
    const Y = (y) => +(pad + (o.ymax - y) * uy).toFixed(1);
    const x0 = Math.min(Math.max(0, o.xmin), o.xmax), y0 = Math.min(Math.max(0, o.ymin), o.ymax);
    const gy = X(x0) - ((o.bars || []).some((b) => b.x === x0) ? 8 : 4); // nombres de l'axe vertical, décalés si un bâton est sur l'axe

    // 1. Places déjà prises par les étiquettes (axes, droites horizontales, courbes, vecteurs, repères)
    const prises = [];
    const ronds = (o.points || []).map((p) => ({ x1: X(p.x) - 3.5, x2: X(p.x) + 3.5, y1: Y(p.y) - 3.5, y2: Y(p.y) + 3.5 }));
    const dansCadre = (b) => b.x1 >= 2 && b.x2 <= W - 2 && b.y1 >= 2 && b.y2 <= H - 2; // marge de 2 : la largeur des lettres est estimée
    // tracés des courbes (en pixels) : une étiquette ou un nombre d'axe évite de se faire barrer par une courbe
    const traces = (o.curves || []).map((c) => { const pts = []; for (let k = 0; k <= 160; k++) { const x = c.a + ((c.b - c.a) * k) / 160, y = c.f(x); if (isFinite(y)) pts.push([X(x), Y(y)]); } return pts; });
    const segmentDansBoite = (b, [x1, y1], [x2, y2]) => { // découpage de Liang-Barsky
      let t0 = 0, t1 = 1;
      for (const [p, q] of [[x1 - x2, x1 - b.x1], [x2 - x1, b.x2 - x1], [y1 - y2, y1 - b.y1], [y2 - y1, b.y2 - y1]]) {
        if (p === 0) { if (q < 0) return false; continue; }
        const r = q / p;
        if (p < 0) { if (r > t1) return false; if (r > t0) t0 = r; } else { if (r < t0) return false; if (r < t1) t1 = r; }
      }
      return true;
    };
    const barre = (b) => traces.some((pts) => pts.some((p, k) => k > 0 && segmentDansBoite(b, pts[k - 1], p)));
    // première position libre parmi des essais [x, y, ancre] ; à défaut, la première
    const placer = (essais, t, taille) => {
      const libre = (e) => { const b = boiteTexte(e[0], e[1], t, taille, e[2]); return dansCadre(b) && !ronds.some((r) => seCoupent(b, r)) && !prises.some((q) => seCoupent(b, q)); };
      const e = essais.find(libre) || essais[0];
      prises.push(boiteTexte(e[0], e[1], t, taille, e[2]));
      return e;
    };
    // nom de l'axe horizontal : au bout de l'axe, au-dessus ; plus haut ou en dessous s'il cacherait un point
    const placeX = o.xlabel ? placer([[W - pad, Y(y0) - 6, "end"], [W - pad, Y(y0) - 20, "end"], [W - pad, Y(y0) + 26, "end"], [W - pad, Y(y0) - 34, "end"], [W - pad, Y(y0) - 48, "end"]], o.xlabel, 11) : null;
    if (o.ylabel) prises.push(boiteTexte(X(x0) + 6, pad + 8, o.ylabel, 11, "start"));
    // nom d'une droite horizontale : à droite, ou à gauche s'il cacherait un point
    const placesH = (o.hlines || []).map((h) => h.label ? placer([[W - pad - 2, Y(h.y) - 5, "end"], [Math.max(padL, X(x0)) + 4, Y(h.y) - 5, "start"], [W - pad - 2, Y(h.y) + 14, "end"], [Math.max(padL, X(x0)) + 4, Y(h.y) + 14, "start"]], h.label, 11) : null);
    (o.marques || []).forEach((m) => prises.push(boiteTexte(X(m.x), Y(m.y), m.texte, 11, "middle")));
    // nom d'une courbe : à l'endroit prévu, décalé vers le bas ou le haut s'il tombe sur un autre nom
    const placesC = (o.curves || []).map((c) => {
      if (!c.label) return null;
      const lx = c.lx !== undefined ? c.lx : c.b, x = X(lx) + (c.dx || -4), y = Y(c.f(lx)) + (c.dy || -8);
      const essais = [0, 14, -14, 26, -26].map((d) => [x, y + d, "end"]);
      const e = essais.find((e) => { const b = boiteTexte(e[0], e[1], c.label, 13, "end"); return dansCadre(b) && !prises.some((q) => seCoupent(b, q)) && !ronds.some((r) => seCoupent(b, r)); }) || essais[0];
      prises.push(boiteTexte(e[0], e[1], c.label, 13, "end"));
      return e;
    });
    // nom d'un vecteur : d'un côté de la flèche, ou de l'autre s'il tombe sur un autre nom
    const decalF = (o.fleches || []).map((f) => {
      if (!f.label) return 9;
      const ax = X(f.x1), ay = Y(f.y1), bx = X(f.x2), by = Y(f.y2), t = Math.atan2(by - ay, bx - ax);
      const boite = (d) => boiteTexte((ax + bx) / 2 + d * Math.sin(t), (ay + by) / 2 - d * Math.cos(t) + 4, f.label, 13, "middle");
      const d = [9, -11, 16, -18].find((d) => dansCadre(boite(d)) && !prises.some((q) => seCoupent(boite(d), q))) || 9;
      prises.push(boite(d));
      return d;
    });
    // 2. Étiquettes des points : à droite au-dessus, sinon à gauche, sinon en dessous, là où la place est libre
    const placesPoints = (o.points || []).map((p, k) => {
      if (!p.label) return null;
      const px = X(p.x), py = Y(p.y);
      let essais = [[px + 6, py - 6, "start"], [px - 8, py - 6, "end"], [px + 6, py + 15, "start"], [px - 8, py + 15, "end"]];
      if (p.gauche) essais = [essais[1], essais[0], essais[3], essais[2]];
      const libre = (e) => { const b = boiteTexte(e[0], e[1], p.label, 11, e[2]); return dansCadre(b) && !prises.some((q) => seCoupent(b, q)) && !ronds.some((r, j) => j !== k && seCoupent(b, r)); };
      const e = essais.find(libre) || essais[0];
      prises.push(boiteTexte(e[0], e[1], p.label, 11, e[2]));
      return e;
    });
    // Le 0 de l'origine
    let zero = null;
    if (x0 === 0 && y0 === 0) zero = [X(x0) - 4, Y(y0) + 13, "end"];
    else if (x0 === 0) zero = [X(0), Y(y0) + 13, "middle"];
    else if (y0 === 0) zero = [gy, Y(0) + 4, "end"];
    // Un nombre d'axe (y compris le 0) qui tomberait sous une étiquette ou serait barré par une courbe n'est pas écrit
    const nombreLibre = (x, y, t, ancre) => { const b0 = boiteTexte(x, y, t, 10, ancre), b = { x1: b0.x1 - 2, x2: b0.x2 + 2, y1: b0.y1 - 2, y2: b0.y2 + 2 }; return !prises.some((q) => seCoupent(b, q)) && !ronds.some((r) => seCoupent(b, r)) && !barre(b0); };
    if (zero && !nombreLibre(zero[0], zero[1], "0", zero[2])) zero = null;
    if (zero) prises.push(boiteTexte(zero[0], zero[1], "0", 10, zero[2]));

    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria || "Courbe dans un repère"}">`;
    // quadrillage
    s += `<g class="g-grid">`;
    for (let x = Math.ceil(o.xmin / xstep) * xstep; x <= o.xmax; x += xstep) s += `<line x1="${X(x)}" y1="${pad}" x2="${X(x)}" y2="${H - padB}"/>`;
    for (let y = Math.ceil(o.ymin / ystep) * ystep; y <= o.ymax; y += ystep) s += `<line x1="${padL}" y1="${Y(y)}" x2="${W - pad}" y2="${Y(y)}"/>`;
    s += `</g>`;
    // histogramme : rectangles de a à b, de hauteur h (sous les axes et les étiquettes)
    // aires : domaine entre la courbe f et la courbe g (ou l'axe horizontal) pour x de a à b ; neg : true pour la couleur des parties « en dessous »
    (o.aires || []).forEach((z) => { const n = 120, g = z.g || (() => y0); let d = ""; for (let k = 0; k <= n; k++) { const x = z.a + ((z.b - z.a) * k) / n; d += (k ? "L" : "M") + X(x) + " " + Y(z.f(x)); } for (let k = n; k >= 0; k--) { const x = z.a + ((z.b - z.a) * k) / n; d += "L" + X(x) + " " + Y(g(x)); } s += `<path class="g-aire${z.neg ? " g-aire-neg" : ""}" d="${d}Z"/>`; });
    (o.rects || []).forEach((r) => { s += `<rect class="g-rect" x="${X(r.a)}" y="${Y(r.h)}" width="${+(X(r.b) - X(r.a)).toFixed(1)}" height="${+(Y(y0) - Y(r.h)).toFixed(1)}"/>`; });
    // axes ; si l'origine n'est pas 0 sur un axe, l'autre axe s'arrête à l'origine
    const axG = y0 !== 0 && x0 > o.xmin ? X(x0) : padL, axB = x0 !== 0 && y0 > o.ymin ? Y(y0) : H - padB;
    s += `<g class="g-axis"><line x1="${axG}" y1="${Y(y0)}" x2="${W - pad}" y2="${Y(y0)}"/><line x1="${X(x0)}" y1="${pad}" x2="${X(x0)}" y2="${axB}"/>`;
    s += `<path d="M${W - pad} ${Y(y0)} l-6 -3.5 v7z"/><path d="M${X(x0)} ${pad} l-3.5 6 h7z"/></g>`;
    // graduations (xetiq / yetiq : un nombre écrit toutes les k unités, par défaut à chaque graduation)
    const xetiq = o.xetiq || xstep, yetiq = o.yetiq || ystep;
    s += `<g class="g-tick">`;
    for (let x = Math.ceil(o.xmin / xetiq) * xetiq; x <= o.xmax - xstep / 2; x += xetiq) {
      if (x === 0) continue;
      const t = nbAxe(x);
      // pas écrit s'il tombe sous une étiquette ou une courbe (une figure peut ajouter ses propres noms ailleurs : on ne le déplace pas)
      if (nombreLibre(X(x), Y(y0) + 13, t, "middle")) s += `<text x="${X(x)}" y="${Y(y0) + 13}" text-anchor="middle">${t}</text>`;
    }
    for (let y = Math.ceil(o.ymin / yetiq) * yetiq; y <= o.ymax - ystep / 2; y += yetiq) {
      if (y === 0) continue;
      const t = nbAxe(y);
      if (nombreLibre(gy, Y(y) + 4, t, "end")) s += `<text x="${gy}" y="${Y(y) + 4}" text-anchor="end">${t}</text>`;
    }
    // le 0 : au coin si l'origine est (0 ; 0), sinon sur l'axe où il se trouve
    if (zero) s += `<text x="${zero[0]}" y="${zero[1]}" text-anchor="${zero[2]}">0</text>`;
    s += `</g>`;
    if (placeX) s += `<text class="g-label" x="${placeX[0]}" y="${+placeX[1].toFixed(1)}" text-anchor="end">${o.xlabel}</text>`;
    if (o.ylabel) s += `<text class="g-label" x="${X(x0) + 6}" y="${pad + 8}">${o.ylabel}</text>`;
    // droites horizontales
    (o.hlines || []).forEach((h, k) => {
      s += `<line class="g-hline" x1="${padL}" y1="${Y(h.y)}" x2="${W - pad}" y2="${Y(h.y)}"/>`;
      const e = placesH[k];
      if (e) s += `<text class="g-hlabel" x="${+e[0].toFixed(1)}" y="${+e[1].toFixed(1)}" text-anchor="${e[2]}">${h.label}</text>`;
    });
    // diagramme en bâtons
    (o.bars || []).forEach((b) => { s += `<line class="g-bar" x1="${X(b.x)}" y1="${Y(y0)}" x2="${X(b.x)}" y2="${Y(b.y)}"/>`; });
    (o.marques || []).forEach((m) => { s += `<text class="g-label" x="${X(m.x)}" y="${Y(m.y)}" text-anchor="middle">${m.texte}</text>`; });
    // courbes
    (o.curves || []).forEach((c, j) => {
      const i = c.couleur !== undefined ? c.couleur : j; // couleur imposée (deux branches d'une même courbe)
      const n = 160; let d = "";
      for (let k = 0; k <= n; k++) {
        const x = c.a + ((c.b - c.a) * k) / n;
        d += (k ? "L" : "M") + X(x) + " " + Y(c.f(x));
      }
      s += `<path class="g-curve g-curve-${i}" d="${d}"/>`;
      if (c.closed !== false) {
        s += `<circle class="g-end g-curve-${i}" cx="${X(c.a)}" cy="${Y(c.f(c.a))}" r="3"/><circle class="g-end g-curve-${i}" cx="${X(c.b)}" cy="${Y(c.f(c.b))}" r="3"/>`;
      }
      const e = placesC[j];
      if (e) s += `<text class="g-clabel g-curve-${i}" x="${+e[0].toFixed(1)}" y="${+e[1].toFixed(1)}" text-anchor="end">${c.label}</text>`;
    });
    // vecteurs : flèches de (x1 ; y1) à (x2 ; y2), couleur c (0 ou 1), nom affiché au milieu
    (o.fleches || []).forEach((f, k) => {
      const c = f.c || 0, ax = X(f.x1), ay = Y(f.y1), bx = X(f.x2), by = Y(f.y2), t = Math.atan2(by - ay, bx - ax), dd = decalF[k];
      const pt = (r, a) => `${+(bx - r * Math.cos(t + a)).toFixed(1)} ${+(by - r * Math.sin(t + a)).toFixed(1)}`;
      s += `<path class="g-curve g-curve-${c}" d="M${ax} ${ay}L${pt(6, 0)}"/><path class="g-end g-curve-${c}" d="M${bx} ${by}L${pt(11, 0.4)}L${pt(11, -0.4)}Z"/>`;
      if (f.label) s += `<text class="g-clabel g-curve-${c}" x="${+((ax + bx) / 2 + dd * Math.sin(t)).toFixed(1)}" y="${+((ay + by) / 2 - dd * Math.cos(t) + 4).toFixed(1)}" text-anchor="middle">${f.label}</text>`;
      // petite flèche au-dessus du nom du vecteur
      if (f.label && /^[A-Za-z]{1,2}$/.test(f.label)) s += `<text class="g-clabel g-curve-${c} g-fleche-nom" style="font-size:10px" x="${+((ax + bx) / 2 + dd * Math.sin(t)).toFixed(1)}" y="${+((ay + by) / 2 - dd * Math.cos(t) - 7).toFixed(1)}" text-anchor="middle">→</text>`;
    });
    // chemins : lignes brisées pointillées (par exemple l'escalier d'une suite récurrente)
    (o.chemins || []).forEach((ch) => { s += `<path class="g-curve g-curve-1" d="${ch.map(([x, y], k) => (k ? "L" : "M") + X(x) + " " + Y(y)).join("")}" style="fill:none;stroke-width:1.6;stroke-dasharray:5 3"/>`; });
    (o.points || []).forEach((p, k) => {
      s += `<circle class="g-point" cx="${X(p.x)}" cy="${Y(p.y)}" r="3.5"/>`;
      const e = placesPoints[k];
      if (e) s += `<text class="g-plabel" x="${+e[0].toFixed(1)}" y="${+e[1].toFixed(1)}"${e[2] === "end" ? ' text-anchor="end"' : ""}>${p.label}</text>`;
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

  // Coefficient binomial (aussi utilisé par la figure de la loi binomiale ci-dessus)
  const C = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return Math.round(r); };

  window.PM_EXO = window.PM_EXO || {};
  window.PM_EXO.GEN = window.PM_EXO.GEN || {};
  Object.assign(window.PM_EXO, { FIGURES, graph, shuffle, outils: { rand, pick, randNZ, shuffle, par, sg, poly, interv, nbAxe, commenceVoyelle, deN, queN, leN, laN, largeurTexte, boiteTexte, seCoupent, graph, FIGURES, parabole, C } });
})();
