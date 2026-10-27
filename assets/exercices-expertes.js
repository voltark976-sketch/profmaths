/*
  Terminale maths expertes : générateurs d'exercices et figures (préfixes x… : xa, xg, xt, xp, xc, xd, xb, xn, xm, xr, xk).
  Chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse attendue,
  trois indices progressifs et la solution rédigée.
  Ce fichier n'a besoin que d'assets/exercices-base.js (outils et graphiques communs), chargé avant lui :
  le gros fichier des générateurs du lycée (assets/exercices.js) n'est pas téléchargé pour ce niveau.
*/
(function () {
  "use strict";
  const { rand, pick, shuffle, graph, C } = window.PM_EXO.outils;
  const FIGURES = window.PM_EXO.FIGURES, GEN = window.PM_EXO.GEN;

  /* ---------- Nombres ---------- */
  const pgcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const mod = (a, n) => ((a % n) + n) % n;
  // Nombre écrit à la française dans une formule : 52\,300 ; 0{,}25 ; -3
  const nb = (x) => {
    const s = String(+(+x).toPrecision(12));
    const neg = s[0] === "-", [e, d] = (neg ? s.slice(1) : s).split(".");
    return (neg ? "-" : "") + e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") + (d ? "{,}" + d : "");
  };
  const pr = (x) => (x < 0 ? `(${nb(x)})` : nb(x)); // entre parenthèses s'il est négatif
  const nbS = (x) => String(+(+x).toFixed(6)).replace("-", "−").replace(".", ","); // nombre écrit dans un SVG
  const frac = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = pgcd(n, d) || 1; n /= g; d /= g; return d === 1 ? nb(n) : `${n < 0 ? "-" : ""}\\dfrac{${Math.abs(n)}}{${d}}`; };
  const estDecimal = (n, d) => { d = Math.abs(d) / (pgcd(n, d) || 1); while (d % 2 === 0) d /= 2; while (d % 5 === 0) d /= 5; return d === 1; };
  // « + 3 », « - 3 » : terme suivant d'une somme ; coef(a, "x") : « 3x », « -x », « x »
  const plus = (x) => (x < 0 ? `- ${nb(-x)}` : `+ ${nb(x)}`);
  const coef = (a, v) => (a === 1 ? v : a === -1 ? `-${v}` : `${nb(a)}${v}`);
  // Polynôme : coefficients du plus haut degré au plus bas, variable v
  const poly = (cs, v = "z") => {
    const d = cs.length - 1; let s = "";
    cs.forEach((c, k) => {
      if (!c) return; const p = d - k, m = p === 0 ? "" : p === 1 ? v : `${v}^${p}`, a = Math.abs(c);
      const t = p === 0 ? nb(a) : a === 1 ? m : `${nb(a)}${m}`;
      s += s ? ` ${c < 0 ? "-" : "+"} ${t}` : (c < 0 ? "-" : "") + t;
    });
    return s || "0";
  };

  /* ---------- Rationnels et complexes (parties réelle et imaginaire rationnelles) ---------- */
  const Q = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = pgcd(n, d) || 1; return { n: n / g, d: d / g }; };
  const qn = (x) => (typeof x === "number" ? Q(x) : x);
  const qTex = (q) => (q.d === 1 ? nb(q.n) : `${q.n < 0 ? "-" : ""}\\dfrac{${Math.abs(q.n)}}{${q.d}}`);
  const qVal = (q) => q.n / q.d;
  // a + bi en LaTeX (a, b : nombres ou rationnels Q)
  function cx(a, b) {
    a = qn(a); b = qn(b);
    if (!b.n) return qTex(a);
    const m = Math.abs(b.n), it = m === 1 && b.d === 1 ? "i" : b.d === 1 ? `${nb(m)}i` : `\\dfrac{${m}}{${b.d}}i`;
    if (!a.n) return (b.n < 0 ? "-" : "") + it;
    return `${qTex(a)} ${b.n < 0 ? "-" : "+"} ${it}`;
  }
  const cxp = (a, b) => (b && a ? `(${cx(a, b)})` : (b < 0 || (!b && a < 0) ? `(${cx(a, b)})` : cx(a, b))); // entre parenthèses si besoin
  const cMul = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];
  const cAdd = ([a, b], [c, d]) => [a + c, b + d];
  const cSub = ([a, b], [c, d]) => [a - c, b - d];
  const cPow = (z, n) => { let r = [1, 0]; for (let k = 0; k < n; k++) r = cMul(r, z); return r; };
  const cDiv = ([a, b], [c, d]) => { const m = c * c + d * d; return [Q(a * c + b * d, m), Q(b * c - a * d, m)]; }; // parties rationnelles
  const cTexQ = ([re, im]) => cx(re, im);
  // Puissances de i
  const IPOW = ["1", "i", "-1", "-i"];

  /* ---------- Matrices ---------- */
  const texCase = (v) => (typeof v === "string" ? v : nb(v));
  const mat = (M) => `\\begin{pmatrix} ${M.map((l) => l.map(texCase).join(" & ")).join(" \\\\ ")} \\end{pmatrix}`;
  const mMul = (A, B) => A.map((l) => B[0].map((_, j) => l.reduce((s, v, k) => s + v * B[k][j], 0)));
  const mAdd = (A, B, a = 1, b = 1) => A.map((l, i) => l.map((v, j) => a * v + b * B[i][j]));
  const mPow = (A, n) => { let R = A.map((l, i) => l.map((_, j) => (i === j ? 1 : 0))); for (let k = 0; k < n; k++) R = mMul(R, A); return R; };
  const det2 = (M) => M[0][0] * M[1][1] - M[0][1] * M[1][0];
  const arr = (x, k = 6) => +(+x).toFixed(k);

  /* ---------- Questions : erreurs prévues, choix, vrai ou faux ---------- */
  // Erreurs prévues : sans doublon, jamais égales à la réponse
  const errs = (att, L) => { const vus = []; return (L || []).filter((e) => { if (!e || typeof e.valeur !== "number" || !isFinite(e.valeur)) return false; if (Math.abs(e.valeur - att) < 1e-9 || vus.some((w) => Math.abs(w - e.valeur) < 1e-9)) return false; vus.push(e.valeur); return true; }); };
  // Quatre choix : la bonne réponse et trois pièges distincts, pris dans l'ordre de la liste ; « autre » fabrique des pièges de réserve
  function choix4(bonne, fausses, autre) {
    const f = [];
    const prendre = (x) => { if (x !== undefined && x !== null && x !== "" && x !== bonne && !f.includes(x)) f.push(x); };
    (fausses || []).forEach(prendre);
    for (let k = 0; f.length < 3 && autre && k < 80; k++) prendre(autre(k));
    const c = shuffle([bonne, ...f.slice(0, 3)]);
    return { choix: c, attendu: c.indexOf(bonne) };
  }
  // Série « vrai ou faux » sans hasard : parmi 4 affirmations du tableau T ([énoncé, vrai ?, explication]), une seule est vraie (ou une seule fausse)
  const minus = (x) => x.replace(/^([A-ZÀÉÈ])(?=[a-zàâçéèêëîïôûù' ])/, (c) => c.toLowerCase());
  function vraiFaux4(T, aides) {
    const V = T.filter((t) => t[1]), F = T.filter((t) => !t[1]), modes = [];
    if (V.length >= 1 && F.length >= 3) modes.push("vraie");
    if (F.length >= 1 && V.length >= 3) modes.push("fausse");
    const m = pick(modes), bon = pick(m === "vraie" ? V : F), autres = shuffle((m === "vraie" ? F : V).slice()).slice(0, 3);
    const c = choix4(bon[0], autres.map((a) => a[0]));
    return { enonce: `Une seule de ces affirmations est **${m}**. Laquelle ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides,
      solution: `« ${bon[0]} » est ${m} : ${minus(bon[2])}\n\n` + autres.map((a) => `- « ${a[0]} » est ${m === "vraie" ? "fausse" : "vraie"} : ${minus(a[2])}`).join("\n") };
  }
  // Enregistre un générateur : nettoie les erreurs prévues d'une question à saisie
  const def = (nom, f) => { GEN[nom] = function (i) { const q = f(i); if (q.mode === "nombre") q.erreurs = errs(q.attendu, q.erreurs); return q; }; };

  /* ---------- Contextes ---------- */
  const PRENOMS = ["Anli", "Nassim", "Zaïnaba", "Fatima", "Moussa", "Awa", "Ibrahim", "Mariama", "Saïd", "Djamila", "Hamada", "Faïza", "Kamal", "Zalifa", "Ambdi", "Nasra", "Toiyb", "Roukia", "Chamsidine", "Hadidja"];
  const LIEUX = ["Mamoudzou", "Dzaoudzi", "Koungou", "Sada", "Chirongui", "Bandraboua", "Kani-Kéli", "Tsingoni", "Ouangani", "Dembéni", "Bouéni", "Acoua", "Mtsamboro", "Pamandzi", "Chiconi", "Bandrélé"];
  const prenom = () => pick(PRENOMS);

  /* ---------- Figures : plan complexe ---------- */
  // planC : comme graph() (points, fleches, curves…), plus des cercles, polygones, segments, arcs d'angle et textes
  function planC(o) {
    const g = Object.assign({ xstep: 1, ystep: 1 }, o);
    const W = 320, pad = 14, padL = g.padL || pad, padB = g.padB || (g.ymin >= 0 ? 18 : pad);
    const ux = (W - padL - pad) / (g.xmax - g.xmin);
    let H = g.h || Math.round(ux * (g.ymax - g.ymin) * (g.xstep / g.ystep) + pad + padB); H = Math.max(200, Math.min(400, H));
    const uy = (H - pad - padB) / (g.ymax - g.ymin);
    const X = (x) => +(padL + (x - g.xmin) * ux).toFixed(1), Y = (y) => +(pad + (g.ymax - y) * uy).toFixed(1);
    let s = "";
    (o.polys || []).forEach((p) => { s += `<path d="${p.map(([x, y], k) => (k ? "L" : "M") + X(x) + " " + Y(y)).join("")}Z" style="fill:var(--lagon);fill-opacity:0.12;stroke:var(--lagon);stroke-width:1.8;stroke-linejoin:round"/>`; });
    (o.cercles || []).forEach((c) => { s += `<ellipse class="g-cercle" cx="${X(c.x)}" cy="${Y(c.y)}" rx="${+(c.r * ux).toFixed(1)}" ry="${+(c.r * uy).toFixed(1)}"${c.pointille ? ' style="stroke-dasharray:5 4"' : ""}/>`; });
    (o.segs || []).forEach(([x1, y1, x2, y2, pointille]) => { s += `<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" style="stroke:var(--encre);stroke-width:1.6${pointille ? ";stroke-dasharray:4 3" : ""}"/>`; });
    (o.arcs || []).forEach((a) => { // arc d'angle de centre (cx ; cy), de l'angle a1 à a2 (radians), rayon r (unités)
      const cx0 = a.cx || 0, cy0 = a.cy || 0, a1 = a.a1 || 0, a2 = a.a2, r = a.r || 0.6;
      const P = (t, rr) => [X(cx0 + rr * Math.cos(t)), Y(cy0 + rr * Math.sin(t))];
      const [x1, y1] = P(a1, r), [x2, y2] = P(a2, r), grand = Math.abs(a2 - a1) > Math.PI ? 1 : 0, sens = a2 > a1 ? 0 : 1;
      s += `<path d="M${x1} ${y1}A${+(r * ux).toFixed(1)} ${+(r * uy).toFixed(1)} 0 ${grand} ${sens} ${x2} ${y2}" style="fill:none;stroke:var(--ylang);stroke-width:2"/>`;
      if (a.label) { const [lx, ly] = P((a1 + a2) / 2, r + (a.dl || 0.45)); s += `<text class="g-label" x="${lx}" y="${+(ly + 4).toFixed(1)}" text-anchor="middle">${a.label}</text>`; }
    });
    (o.textes || []).forEach((t) => { s += `<text class="g-label" x="${+(X(t.x) + (t.dx || 0)).toFixed(1)}" y="${+(Y(t.y) + (t.dy || 0)).toFixed(1)}" text-anchor="${t.ancre || "middle"}">${t.t}</text>`; });
    const svg = graph(g);
    return s ? svg.replace("</g>", "</g>" + s) : svg; // juste après le quadrillage : sous les points et leurs noms
  }
  // Fenêtre carrée autour de points entiers (au moins de -1 à 1)
  function fenetre(pts, marge = 1) {
    const xs = pts.map((p) => p[0]).concat([0]), ys = pts.map((p) => p[1]).concat([0]);
    let xmin = Math.min(...xs) - marge, xmax = Math.max(...xs) + marge, ymin = Math.min(...ys) - marge, ymax = Math.max(...ys) + marge;
    const L = Math.max(xmax - xmin, ymax - ymin, 4);
    const cx0 = (xmin + xmax) / 2, cy0 = (ymin + ymax) / 2;
    xmin = Math.floor(cx0 - L / 2); xmax = xmin + Math.ceil(L); ymin = Math.floor(cy0 - L / 2); ymax = ymin + Math.ceil(L);
    return { xmin: xmin - 0.4, xmax: xmax + 0.4, ymin: ymin - 0.4, ymax: ymax + 0.4, xetiq: L > 9 ? 2 : 1, yetiq: L > 9 ? 2 : 1 };
  }

  /* ---------- Figures : graphes ---------- */
  // sommets : [[nom, x, y]] dans un cadre 320 × h ; aretes : [[a, b, poids]] ; oriente : flèches ; boucles a → a permises
  function grapheG(o) {
    const H = o.h || 230, R = 14, pos = {};
    o.sommets.forEach(([n, x, y]) => (pos[n] = [x, y]));
    const cxm = o.sommets.reduce((s, p) => s + p[1], 0) / o.sommets.length, cym = o.sommets.reduce((s, p) => s + p[2], 0) / o.sommets.length;
    const cles = new Set(o.aretes.map(([a, b]) => a + "→" + b));
    const f1 = (v) => +v.toFixed(1);
    const fleche = (x, y, dx, dy) => { const L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L; return `<path d="M${f1(x)} ${f1(y)}L${f1(x - 9 * ux - 4 * uy)} ${f1(y - 9 * uy + 4 * ux)}L${f1(x - 9 * ux + 4 * uy)} ${f1(y - 9 * uy - 4 * ux)}Z" style="fill:var(--encre)"/>`; };
    const poids = (x, y, w) => `<text x="${f1(x)}" y="${f1(y + 4)}" text-anchor="middle" style="font:700 11px var(--f-texte);fill:var(--lagon);paint-order:stroke;stroke:var(--surface);stroke-width:4px;stroke-linejoin:round">${w}</text>`;
    let traits = "", etiq = "";
    o.aretes.forEach(([a, b, w]) => {
      if (a === b) {
        const [x, y] = pos[a]; let t = Math.atan2(y - cym, x - cxm); if (Math.hypot(x - cxm, y - cym) < 1) t = -Math.PI / 2;
        if (o.boucles && o.boucles[a] !== undefined) t = o.boucles[a];
        const d = (u, r) => [x + r * Math.cos(u), y + r * Math.sin(u)];
        const [p1x, p1y] = d(t - 0.42, R), [p2x, p2y] = d(t + 0.42, R + 1), [c1x, c1y] = d(t - 0.75, 46), [c2x, c2y] = d(t + 0.75, 46);
        traits += `<path d="M${f1(p1x)} ${f1(p1y)}C${f1(c1x)} ${f1(c1y)} ${f1(c2x)} ${f1(c2y)} ${f1(p2x)} ${f1(p2y)}" style="fill:none;stroke:var(--encre);stroke-width:1.5"/>`;
        if (o.oriente) traits += fleche(p2x, p2y, p2x - c2x, p2y - c2y);
        if (w !== undefined && w !== "") { const [lx, ly] = d(t, 44); etiq += poids(lx, ly, w); }
        return;
      }
      const [x1, y1] = pos[a], [x2, y2] = pos[b], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
      const k = o.oriente && cles.has(b + "→" + a) ? 15 : 0;
      const qx = (x1 + x2) / 2 + k * nx, qy = (y1 + y2) / 2 + k * ny;
      const u1 = Math.hypot(qx - x1, qy - y1), u2 = Math.hypot(qx - x2, qy - y2);
      const sx = x1 + (R * (qx - x1)) / u1, sy = y1 + (R * (qy - y1)) / u1, ex = x2 + ((R + 1) * (qx - x2)) / u2, ey = y2 + ((R + 1) * (qy - y2)) / u2;
      traits += `<path d="M${f1(sx)} ${f1(sy)}Q${f1(qx)} ${f1(qy)} ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:var(--encre);stroke-width:1.5"/>`;
      if (o.oriente) traits += fleche(ex, ey, ex - qx, ey - qy);
      if (w !== undefined && w !== "") { const mx = 0.25 * x1 + 0.5 * qx + 0.25 * x2, my = 0.25 * y1 + 0.5 * qy + 0.25 * y2, dd = k ? 9 : 10; etiq += poids(mx + dd * nx, my + dd * ny, w); }
    });
    let s = `<svg class="graph" viewBox="0 0 320 ${H}" role="img" aria-label="${o.aria}">` + traits;
    o.sommets.forEach(([n, x, y]) => { s += `<circle cx="${x}" cy="${y}" r="${R}" style="fill:var(--surface);stroke:var(--lagon);stroke-width:2"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" style="font:700 13px var(--f-texte);fill:var(--encre)">${n}</text>`; });
    return s + etiq + `</svg>`;
  }
  // n sommets régulièrement placés sur un cercle (noms A, B, C…)
  const NOMS = ["A", "B", "C", "D", "E", "F", "G"];
  const enCercle = (n, h = 230, r = 82, noms = NOMS) => Array.from({ length: n }, (_, k) => { const t = -Math.PI / 2 + (2 * Math.PI * k) / n; return [noms[k], Math.round(160 + r * Math.cos(t)), Math.round(h / 2 + 4 + r * Math.sin(t))]; });


  /* ---------- Chapitre 1 : nombres complexes, point de vue algébrique (préfixe xa) ---------- */
  const nz = (a, b) => rand(a, b) || pick([a, b]); // entier non nul
  const pt = (k, v) => (!k ? "" : `${k < 0 ? "-" : "+"} ${Math.abs(k) === 1 && v ? "" : nb(Math.abs(k))}${v}`); // terme suivant : « + 3i », « - i », rien si 0
  const ajoute = (z) => (!z[0] && !z[1] ? "" : z[0] && z[1] ? ` + (${cx(...z)})` : cx(...z).startsWith("-") ? ` - ${cx(-z[0], -z[1])}` : ` + ${cx(...z)}`);
  // Réserve de pièges : un complexe voisin
  const voisin = (a, b) => () => cx(a + pick([-2, -1, 1, 2]), b + pick([-2, -1, 0, 1, 2]));

  def("xa-forme", () => {
    const z1 = [nz(-8, 8), nz(-8, 8)], z2 = [nz(-8, 8), nz(-8, 8)];
    const t = pick(["somme", "diff", "comb", "comb", "carre-i"]);
    const quoi = pick(["Re", "Im"]);
    let enonce, z, aides, detail, pieges = [];
    if (t === "carre-i") {
      const a = nz(-9, 9), b = nz(-9, 9), c = nz(-5, 5), d = pick([2, 3]);
      // z = a + b i + c i^d
      z = d === 2 ? [a - c, b] : [a, b - c];
      enonce = `On pose $z = ${nb(a)} ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : nb(Math.abs(b))}i ${c < 0 ? "-" : "+"} ${Math.abs(c) === 1 ? "" : nb(Math.abs(c))}i^${d}$.`;
      detail = d === 2 ? `$i^2 = -1$, donc $${coef(c, "i^2")} = ${nb(-c)}$ et $z = ${cx(z[0], z[1])}$.` : `$i^3 = i^2 \\times i = -i$, donc $${coef(c, "i^3")} = ${coef(-c, "i")}$ et $z = ${cx(z[0], z[1])}$.`;
      aides = ["Remplace d'abord la puissance de $i$ par sa valeur.", d === 2 ? "$i^2 = -1$." : "$i^3 = i^2 \\times i = -i$.", "Regroupe les termes sans $i$ (partie réelle) et les termes en $i$ (partie imaginaire)."];
      pieges = d === 2 ? [quoi === "Re" ? a + c : b - c] : [quoi === "Re" ? a - c : b + c];
    } else {
      const k = t === "comb" ? [nz(-4, 4), nz(-4, 4)] : t === "somme" ? [1, 1] : [1, -1];
      z = [k[0] * z1[0] + k[1] * z2[0], k[0] * z1[1] + k[1] * z2[1]];
      const nom = t === "somme" ? "z_1 + z_2" : t === "diff" ? "z_1 - z_2" : `${k[0] === 1 ? "" : k[0] === -1 ? "-" : nb(k[0])}z_1 ${k[1] < 0 ? "-" : "+"} ${Math.abs(k[1]) === 1 ? "" : nb(Math.abs(k[1]))}z_2`;
      enonce = `On pose $z_1 = ${cx(...z1)}$ et $z_2 = ${cx(...z2)}$, puis $z = ${nom}$.`;
      detail = `$z = ${nom} = ${cx(z[0], z[1])}$ : on ajoute les parties réelles entre elles et les parties imaginaires entre elles.`;
      aides = ["On calcule comme avec des expressions en $x$ : $i$ joue le rôle d'une lettre.", `Parties réelles : $${k[0] === 1 ? "" : pr(k[0]) + " \\times "}${pr(z1[0])} ${k[1] < 0 ? "-" : "+"} ${Math.abs(k[1]) === 1 ? "" : nb(Math.abs(k[1])) + " \\times "}${pr(z2[0])}$.`, `Parties imaginaires : $${k[0] === 1 ? "" : pr(k[0]) + " \\times "}${pr(z1[1])} ${k[1] < 0 ? "-" : "+"} ${Math.abs(k[1]) === 1 ? "" : nb(Math.abs(k[1])) + " \\times "}${pr(z2[1])}$.`];
      pieges = [quoi === "Re" ? k[0] * z1[0] - k[1] * z2[0] : k[0] * z1[1] - k[1] * z2[1]];
    }
    const att = quoi === "Re" ? z[0] : z[1];
    return {
      enonce: `${enonce} Quelle est la **partie ${quoi === "Re" ? "réelle" : "imaginaire"}** de $z$ ?`,
      mode: "nombre", prefixe: `$\\text{${quoi}}(z) =$`, attendu: att,
      erreurs: [{ valeur: quoi === "Re" ? z[1] : z[0], message: `Ça, c'est la partie ${quoi === "Re" ? "imaginaire" : "réelle"} de $z$.` }, { valeur: pieges[0], message: "Attention aux signes : relis chaque terme avec son signe." }, { valeur: -att, message: "Le signe n'est pas le bon." }],
      aides, solution: `${detail}\n\nDonc $\\text{${quoi}}(z) = ${nb(att)}$.${quoi === "Im" ? " La partie imaginaire est un **réel** : on n'écrit pas le $i$." : ""}`
    };
  });

  def("xa-produit", () => {
    const t = pick(["prod", "prod", "carre", "conj", "kfois"]);
    let z1 = [nz(-6, 6), nz(-6, 6)], z2 = [nz(-6, 6), nz(-6, 6)], nom;
    if (t === "carre") { z2 = z1.slice(); nom = `(${cx(...z1)})^2`; }
    else if (t === "conj") { z2 = [z1[0], -z1[1]]; nom = `(${cx(...z1)})(${cx(...z2)})`; }
    else if (t === "kfois") { z1 = [0, nz(-5, 5)]; nom = `${cx(...z1)}(${cx(...z2)})`; }
    else nom = `(${cx(...z1)})(${cx(...z2)})`;
    const [a, b] = z1, [c, d] = z2, p = cMul(z1, z2);
    const bonne = `$${cx(p[0], p[1])}$`;
    const f = [`$${cx(a * c + b * d, a * d + b * c)}$`, `$${cx(a * c, b * d)}$`, `$${cx(a * c - b * d, a * d - b * c)}$`, `$${cx(-p[0], p[1])}$`];
    const ch = choix4(bonne, f, () => `$${cx(p[0] + pick([-2, -1, 1, 2]), p[1] + pick([-1, 0, 1]))}$`);
    const sol = t === "kfois"
      ? `$${nom} = ${coef(b, "i")} \\times ${pr(c)} + ${b < 0 ? `(${coef(b, "i")})` : coef(b, "i")} \\times ${d < 0 ? `(${coef(d, "i")})` : coef(d, "i")} =${coef(b * c, "i")} ${pt(b * d, "i^2")} = ${cx(p[0], p[1])}$`
      : `$${nom} = ${nb(a * c)} ${pt(a * d, "i")} ${pt(b * c, "i")} ${pt(b * d, "i^2")}$\n\n$= ${nb(a * c)} ${pt(a * d + b * c, "i")} ${plus(b * d)} \\times (-1) = ${cx(p[0], p[1])}$`;
    return {
      enonce: `Quelle est la forme algébrique de $${nom}$ ?`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [t === "carre" ? "Utilise l'identité remarquable $(a + b)^2 = a^2 + 2ab + b^2$, avec $b$ remplacé par le terme en $i$." : t === "conj" ? "C'est la forme $(a + bi)(a - bi)$ : le résultat est toujours un réel." : "Développe comme d'habitude : chaque terme de la première parenthèse par chaque terme de la seconde.", "N'oublie pas que $i^2 = -1$.", "Regroupe la partie réelle d'un côté, la partie imaginaire de l'autre."],
      solution: `${sol}${t === "conj" ? `\n\nOn retrouve $a^2 + b^2 = ${nb(a * a)} + ${nb(b * b)} = ${nb(p[0])}$ : le produit d'un complexe par son conjugué est un réel positif.` : ""}`
    };
  });

  def("xa-puissances-i", () => {
    const t = pick(["une", "une", "somme", "produit", "moins"]);
    let n = rand(5, 2030), m = rand(5, 120), val, nom, expl;
    if (t === "une") { val = [[1, 0], [0, 1], [-1, 0], [0, -1]][n % 4]; nom = `i^{${n}}`; expl = `$${n} = 4 \\times ${Math.floor(n / 4)} + ${n % 4}$, donc $i^{${n}} = (i^4)^{${Math.floor(n / 4)}} \\times i^{${n % 4}} = i^{${n % 4}} = ${IPOW[n % 4]}$.`; }
    else if (t === "moins") { const v = [[1, 0], [0, -1], [-1, 0], [0, 1]][n % 4]; val = v; nom = `(-i)^{${n}}`; expl = `$(-i)^{${n}} = (-1)^{${n}} \\times i^{${n}}$. Comme $${n} = 4 \\times ${Math.floor(n / 4)} + ${n % 4}$, $i^{${n}} = ${IPOW[n % 4]}$ et $(-1)^{${n}} = ${n % 2 ? "-1" : "1"}$, donc $(-i)^{${n}} = ${cx(...v)}$.`; }
    else {
      const P = [[1, 0], [0, 1], [-1, 0], [0, -1]];
      if (t === "somme") { val = cAdd(P[n % 4], P[m % 4]); nom = `i^{${n}} + i^{${m}}`; expl = `$i^{${n}} = ${IPOW[n % 4]}$ (reste de $${n}$ divisé par $4$ : $${n % 4}$) et $i^{${m}} = ${IPOW[m % 4]}$ (reste $${m % 4}$), donc $${nom} = ${cx(...val)}$.`; }
      else { val = P[(n + m) % 4]; nom = `i^{${n}} \\times i^{${m}}`; expl = `$i^{${n}} \\times i^{${m}} = i^{${n + m}}$ et $${n + m} = 4 \\times ${Math.floor((n + m) / 4)} + ${(n + m) % 4}$, donc le produit vaut $${IPOW[(n + m) % 4]}$.`; }
    }
    const bonne = `$${cx(...val)}$`;
    const pool = ["1", "i", "-1", "-i", "0", "2", "-2", "2i", "-2i", "1 + i", "1 - i", "-1 + i", "-1 - i"].map((x) => `$${x}$`);
    const ch = choix4(bonne, shuffle(pool.slice(0, t === "somme" ? 13 : 4)), () => pick(pool));
    return {
      enonce: `Que vaut $${nom}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Les puissances de $i$ se répètent tous les $4$ : $i^1 = i$, $i^2 = -1$, $i^3 = -i$, $i^4 = 1$.", "Cherche le reste de la division de l'exposant par $4$.", "$i^{4q + r} = (i^4)^q \\times i^r = i^r$."],
      solution: expl
    };
  });

  def("xa-conjugue", () => {
    const t = pick(["zzbar", "zzbar", "somme", "conj", "conjprod", "diff"]);
    const a = nz(-9, 9), b = nz(-9, 9), z = cx(a, b);
    if (t === "zzbar") return {
      enonce: `On pose $z = ${z}$. Calcule $z \\overline{z}$.`, mode: "nombre", prefixe: "$z\\overline{z} =$", attendu: a * a + b * b,
      erreurs: [{ valeur: a * a - b * b, message: "Le produit $(a + bi)(a - bi)$ vaut $a^2 - (bi)^2 = a^2 + b^2$ : attention au signe, car $i^2 = -1$." }, { valeur: (a + b) * (a + b), message: "On ne fait pas $(a + b)^2$ : $z\\overline{z} = a^2 + b^2$." }, { valeur: Math.abs(a) + Math.abs(b), message: "Il faut élever au carré : $z\\overline{z} = a^2 + b^2$." }],
      aides: [`$\\overline{z} = ${cx(a, -b)}$.`, "Développe $(a + bi)(a - bi)$ avec l'identité $(u + v)(u - v) = u^2 - v^2$.", "$z\\overline{z} = a^2 + b^2$, toujours un réel positif."],
      solution: `$z\\overline{z} = (${z})(${cx(a, -b)}) = ${pr(a)}^2 + ${pr(b)}^2 = ${nb(a * a)} + ${nb(b * b)} = ${nb(a * a + b * b)}$.`
    };
    if (t === "somme") return {
      enonce: `On pose $z = ${z}$. Calcule $z + \\overline{z}$.`, mode: "nombre", prefixe: "$z + \\overline{z} =$", attendu: 2 * a,
      erreurs: [{ valeur: 2 * b, message: "Les parties imaginaires s'annulent, ce sont les parties réelles qui s'ajoutent." }, { valeur: a, message: "$z + \\overline{z} = 2\\,\\text{Re}(z)$ : n'oublie pas le facteur $2$." }, { valeur: 0, message: "Seules les parties imaginaires s'annulent." }],
      aides: [`$\\overline{z} = ${cx(a, -b)}$ : même partie réelle, partie imaginaire opposée.`, "Ajoute les parties réelles et les parties imaginaires.", "$z + \\overline{z} = 2\\,\\text{Re}(z)$."],
      solution: `$z + \\overline{z} = (${z}) + (${cx(a, -b)}) = ${nb(2 * a)}$, c'est-à-dire $2\\,\\text{Re}(z)$ : un réel.`
    };
    if (t === "diff") {
      const bonne = `$${cx(0, 2 * b)}$`;
      const ch = choix4(bonne, [`$${nb(2 * a)}$`, `$${cx(0, -2 * b)}$`, `$${nb(2 * b)}$`, "$0$"]);
      return { enonce: `On pose $z = ${z}$. Que vaut $z - \\overline{z}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`$\\overline{z} = ${cx(a, -b)}$.`, "Les parties réelles s'annulent.", "$z - \\overline{z} = 2i\\,\\text{Im}(z)$ : un imaginaire pur."],
        solution: `$z - \\overline{z} = (${z}) - (${cx(a, -b)}) = ${cx(0, 2 * b)}$, c'est-à-dire $2i\\,\\text{Im}(z)$.` };
    }
    if (t === "conj") {
      const k = nz(-4, 4), c = nz(-6, 6), d = nz(-6, 6);
      // conjugué de k i z + (c + di) ... on demande le conjugué de w = z + (c + d i)i
      const w = cAdd([a, b], cMul([0, k], [c, d]));
      const bonne = `$${cx(w[0], -w[1])}$`;
      const nom = `${z} ${k < 0 ? "-" : "+"} ${Math.abs(k) === 1 ? "" : nb(Math.abs(k))}i(${cx(c, d)})`;
      const w2 = cAdd([a, -b], cMul([0, k], [c, -d])); // oubli de conjuguer i
      const ch = choix4(bonne, [`$${cx(w[0], w[1])}$`, `$${cx(w2[0], w2[1])}$`, `$${cx(-w[0], w[1])}$`, `$${cx(-w[0], -w[1])}$`], voisin(w[0], -w[1]));
      return { enonce: `Quel est le conjugué de $w = ${nom}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Commence par écrire $w$ sous forme algébrique.", `$${coef(k, "i")}(${cx(c, d)}) = ${cx(-k * d, k * c)}$, car $i^2 = -1$.`, "Le conjugué change seulement le signe de la partie imaginaire."],
        solution: `$w = ${z} + ${cxp(-k * d, k * c)} = ${cx(w[0], w[1])}$, donc $\\overline{w} = ${cx(w[0], -w[1])}$.` };
    }
    // conjprod : conjugué d'un produit
    const c = nz(-5, 5), d = nz(-5, 5), p = cMul([a, b], [c, d]);
    const bonne = `$${cx(p[0], -p[1])}$`;
    const ch = choix4(bonne, [`$${cx(p[0], p[1])}$`, `$${cx(...cMul([a, -b], [c, d]))}$`, `$${cx(-p[0], p[1])}$`, `$${cx(a * c + b * d, -(a * d + b * c))}$`], voisin(p[0], -p[1]));
    return { enonce: `On pose $z_1 = ${z}$ et $z_2 = ${cx(c, d)}$. Que vaut $\\overline{z_1 z_2}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Deux méthodes : calculer $z_1 z_2$ puis conjuguer, ou calculer $\\overline{z_1} \\times \\overline{z_2}$.", `$\\overline{z_1 z_2} = \\overline{z_1}\\,\\overline{z_2} = (${cx(a, -b)})(${cx(c, -d)})$.`, "Développe sans oublier $i^2 = -1$."],
      solution: `$z_1 z_2 = (${z})(${cx(c, d)}) = ${cx(p[0], p[1])}$, donc $\\overline{z_1 z_2} = ${cx(p[0], -p[1])}$.\n\nOn retrouve le même résultat avec $\\overline{z_1}\\,\\overline{z_2} = (${cx(a, -b)})(${cx(c, -d)})$.` };
  });

  def("xa-quotient", () => {
    const t = pick(["entier", "entier", "inverse", "frac", "re"]);
    let den = [nz(-5, 5), nz(-5, 5)], num, q;
    if (t === "entier" || t === "re") { const w = [rand(-6, 6), nz(-6, 6)]; num = cMul(w, den); q = [Q(w[0]), Q(w[1])]; }
    else if (t === "inverse") { num = [1, 0]; q = cDiv(num, den); }
    else { num = [nz(-7, 7), nz(-7, 7)]; q = cDiv(num, den); }
    const [c, d] = den, m = c * c + d * d, [a, b] = num;
    const nomNum = cx(a, b), nom = `\\dfrac{${nomNum}}{${cx(c, d)}}`;
    const conj = cMul(num, [c, -d]);
    const sol = `On multiplie en haut et en bas par le conjugué du dénominateur, $${cx(c, -d)}$ :\n\n$${nom} = \\dfrac{(${nomNum})(${cx(c, -d)})}{${pr(c)}^2 + ${pr(d)}^2} = \\dfrac{${cx(conj[0], conj[1])}}{${m}} = ${cTexQ(q)}$.`;
    const aides = ["Pour enlever $i$ du dénominateur, on multiplie en haut et en bas par le **conjugué** du dénominateur.", `$(${cx(c, d)})(${cx(c, -d)}) = ${pr(c)}^2 + ${pr(d)}^2 = ${m}$ : un réel.`, `Développe le numérateur $(${nomNum})(${cx(c, -d)})$, puis divise chaque partie par $${m}$.`];
    if (t === "re") return {
      enonce: `Quelle est la partie réelle de $z = ${nom}$ ?`, mode: "nombre", prefixe: "$\\text{Re}(z) =$", attendu: qVal(q[0]),
      erreurs: [{ valeur: qVal(q[1]), message: "Ça, c'est la partie imaginaire." }, { valeur: a / c, message: "On ne divise pas partie par partie : il faut multiplier par le conjugué du dénominateur." }, { valeur: (a * c + b * d) / (c * c - d * d || 1), message: "Le dénominateur vaut $c^2 + d^2$, pas $c^2 - d^2$ : $(c + di)(c - di) = c^2 - (di)^2 = c^2 + d^2$." }],
      aides, solution: sol + `\n\nDonc $\\text{Re}(z) = ${qTex(q[0])}$.`
    };
    const bonne = `$${cTexQ(q)}$`;
    const f = [
      `$${cx(Q(a * c - b * d, m), Q(b * c + a * d, m))}$`, // multiplié par le dénominateur lui-même
      `$${cx(Q(conj[0], c * c - d * d || 1), Q(conj[1], c * c - d * d || 1))}$`,
      `$${cx(q[0], { n: -q[1].n, d: q[1].d })}$`,
      `$${cx({ n: -q[0].n, d: q[0].d }, q[1])}$`
    ];
    const ch = choix4(bonne, f, (k) => `$${cx(Q(conj[0] + k + 1, m), q[1])}$`);
    return { enonce: `Quelle est la forme algébrique de $${nom}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu, aides, solution: sol };
  });

  def("xa-equation", () => {
    const t = pick(["lin", "lin", "conj", "iconj"]);
    const x = rand(-6, 6), y = nz(-6, 6), sol = [x, y];
    if (t === "lin") {
      const a = [nz(-4, 4), nz(-4, 4)], b = [rand(-6, 6), rand(-6, 6)], c = cAdd(cMul(a, sol), b);
      const bonne = `$${cx(x, y)}$`;
      const faux1 = cDiv(cAdd(c, b), a), faux2 = cDiv(cSub(c, b), [a[0], -a[1]]);
      const ch = choix4(bonne, [`$${cTexQ(faux1)}$`, `$${cTexQ(faux2)}$`, `$${cx(x, -y)}$`, `$${cx(y, x)}$`], voisin(x, y));
      const membreB = ajoute(b);
      const d = cSub(c, b), m = a[0] * a[0] + a[1] * a[1];
      return { enonce: `Résous dans $\\mathbb{C}$ l'équation $(${cx(...a)})z${membreB} = ${cx(...c)}$.`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Isole d'abord le terme en $z$, comme pour une équation dans $\\mathbb{R}$.", `$(${cx(...a)})z = ${cx(...d)}$, donc $z = \\dfrac{${cx(...d)}}{${cx(...a)}}$.`, "Pour calculer ce quotient, multiplie en haut et en bas par le conjugué du dénominateur."],
        solution: `$(${cx(...a)})z = ${cx(...c)}${b[0] || b[1] ? ` - (${cx(...b)}) = ${cx(...d)}` : ""}$\n\n$z = \\dfrac{${cx(...d)}}{${cx(...a)}} = \\dfrac{(${cx(...d)})(${cx(a[0], -a[1])})}{${m}} = ${cx(x, y)}$.\n\nVérification : $(${cx(...a)})(${cx(x, y)})${b[0] || b[1] ? ` + (${cx(...b)})` : ""} = ${cx(...c)}$.` };
    }
    // αz + βz̄ = γ (conj) ou αz + βi z̄ = γ (iconj), avec z = x + iy
    const al = nz(-4, 4); let be = nz(-4, 4); while (Math.abs(be) === Math.abs(al)) be = nz(-4, 4);
    let g, sys, nomEq;
    if (t === "conj") { g = [(al + be) * x, (al - be) * y]; nomEq = `${coef(al, "z")} ${be < 0 ? "-" : "+"} ${Math.abs(be) === 1 ? "" : nb(Math.abs(be))}\\overline{z} = ${cx(...g)}`; sys = `$${coef(al + be, "x")} = ${nb(g[0])}$ et $${coef(al - be, "y")} = ${nb(g[1])}$`; }
    else { g = [al * x + be * y, al * y + be * x]; nomEq = `${coef(al, "z")} ${be < 0 ? "-" : "+"} ${Math.abs(be) === 1 ? "" : nb(Math.abs(be))}i\\overline{z} = ${cx(...g)}`; sys = `$${coef(al, "x")} ${be < 0 ? "-" : "+"} ${coef(Math.abs(be), "y")} = ${nb(g[0])}$ et $${coef(al, "y")} ${be < 0 ? "-" : "+"} ${coef(Math.abs(be), "x")} = ${nb(g[1])}$`; }
    const bonne = `$${cx(x, y)}$`;
    const ch = choix4(bonne, [`$${cx(x, -y)}$`, `$${cx(y, x)}$`, `$${cx(-x, y)}$`, `$${cx(-y, -x)}$`], voisin(x, y));
    return { enonce: `Résous dans $\\mathbb{C}$ l'équation $${nomEq}$.`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Pose $z = x + iy$ avec $x$ et $y$ réels : alors $\\overline{z} = x - iy$.", t === "conj" ? `$${coef(al, "z")} ${be < 0 ? "-" : "+"} ${coef(Math.abs(be), "\\overline{z}")} = ${coef(al + be, "x")} ${pt(al - be, "iy")}$.` : "$i\\overline{z} = i(x - iy) = y + ix$.", "Deux complexes sont égaux quand ils ont la même partie réelle et la même partie imaginaire : on obtient un système."],
      solution: `Avec $z = x + iy$ : ${t === "conj" ? `$${coef(al, "z")} ${be < 0 ? "-" : "+"} ${coef(Math.abs(be), "\\overline{z}")} = ${coef(al + be, "x")} ${pt(al - be, "iy")}$` : `$${coef(al, "z")} ${be < 0 ? "-" : "+"} ${coef(Math.abs(be), "i\\overline{z}")} = (${coef(al, "x")} ${be < 0 ? "-" : "+"} ${coef(Math.abs(be), "y")}) + i(${coef(al, "y")} ${be < 0 ? "-" : "+"} ${coef(Math.abs(be), "x")})$`}.\n\nOn identifie : ${sys}, d'où $x = ${nb(x)}$ et $y = ${nb(y)}$.\n\nLa solution est $z = ${cx(x, y)}$.` };
  });

  def("xa-binome", () => {
    const t = pick(["coef", "coef", "cube", "cube", "1+i"]);
    if (t === "coef") {
      const n = rand(4, 8), k = rand(1, n - 1), a = nz(-3, 3), v = pick(["z", "x"]);
      const att = C(n, k) * a ** (n - k), pw = (b, e) => (e === 1 ? b : `${b}^{${e}}`);
      return { enonce: `Dans le développement de $(${v} ${plus(a)})^{${n}}$ par la formule du binôme, quel est le coefficient de $${pw(v, k)}$ ?`, mode: "nombre", prefixe: "Coefficient :", attendu: att,
        erreurs: [{ valeur: C(n, k), message: `Il manque la puissance de $${nb(a)}$ : le terme est $\\dbinom{${n}}{${k}}${pw(v, k)} \\times ${pw(pr(a), n - k)}$.` }, { valeur: C(n, k) * a ** k, message: `L'exposant de $${nb(a)}$ est $${n} - ${k} = ${n - k}$, pas $${k}$.` }, { valeur: -att, message: "Attention au signe de la puissance d'un nombre négatif." }],
        aides: ["Formule du binôme : $(a + b)^n = \\displaystyle\\sum_{k=0}^{n} \\binom{n}{k} a^k b^{n-k}$.", `Le terme en $${pw(v, k)}$ est $\\dbinom{${n}}{${k}}${pw(v, k)} \\times ${pw(pr(a), n - k)}$.`, `$\\dbinom{${n}}{${k}} = ${C(n, k)}$ (triangle de Pascal).`],
        solution: `Le terme en $${pw(v, k)}$ est $\\dbinom{${n}}{${k}}${pw(v, k)} \\times ${pw(pr(a), n - k)} = ${C(n, k)} \\times ${a ** (n - k) === 1 ? "" : `${pr(a ** (n - k))} \\times `}${pw(v, k)}$, donc le coefficient vaut $${nb(att)}$.` };
    }
    if (t === "1+i") {
      const n = rand(2, 8), s = pick([1, -1]), v = cPow([1, s], n);
      const bonne = `$${cx(...v)}$`;
      const ch = choix4(bonne, [`$${cx(v[0], -v[1])}$`, `$${cx(-v[0], -v[1])}$`, `$${nb(2 ** n)}$`, `$${cx(2 ** (n - 1), 2 ** (n - 1) * s)}$`, `$${cx(v[1], v[0])}$`], (k) => `$${cx(v[0] + 2 * (k + 1), v[1])}$`);
      const etapes = n >= 2 ? `$(${cx(1, s)})^2 = 1 ${s > 0 ? "+" : "-"} 2i + i^2 = ${cx(0, 2 * s)}$` : "";
      return { enonce: `Quelle est la forme algébrique de $(${cx(1, s)})^{${n}}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`Calcule d'abord $(${cx(1, s)})^2$.`, `$(${cx(1, s)})^2 = ${cx(0, 2 * s)}$, puis $(${cx(1, s)})^4 = (${cx(0, 2 * s)})^2 = -4$.`, `Écris $${n}$ à l'aide de multiples de $2$ et de $4$ et multiplie.`],
        solution: `${etapes}, puis $(${cx(1, s)})^4 = (${cx(0, 2 * s)})^2 = -4$.\n\nDe proche en proche : $(${cx(1, s)})^{${n}} = ${cx(...v)}$.` };
    }
    // (a + bi)^3 avec la formule du binôme : partie réelle ou imaginaire
    const a = nz(-4, 4), b = nz(-3, 3), quoi = pick(["Re", "Im"]);
    const re = a ** 3 - 3 * a * b * b, im = 3 * a * a * b - b ** 3, att = quoi === "Re" ? re : im;
    return { enonce: `On développe $(${cx(a, b)})^3$ avec la formule du binôme. Quelle est sa partie ${quoi === "Re" ? "réelle" : "imaginaire"} ?`, mode: "nombre", prefixe: `$\\text{${quoi}} =$`, attendu: att,
      erreurs: [{ valeur: quoi === "Re" ? a ** 3 + 3 * a * b * b : 3 * a * a * b + b ** 3, message: `Attention : $(${coef(b, "i")})^2 = ${nb(-b * b)}$ et $(${coef(b, "i")})^3 = ${cx(0, -(b ** 3))}$, car $i^2 = -1$ et $i^3 = -i$.` }, { valeur: quoi === "Re" ? im : re, message: `Ça, c'est la partie ${quoi === "Re" ? "imaginaire" : "réelle"}.` }, { valeur: quoi === "Re" ? a ** 3 : b ** 3, message: "Il manque des termes : le binôme en donne quatre." }],
      aides: ["$(u + v)^3 = u^3 + 3u^2v + 3uv^2 + v^3$ (ligne $1$ ; $3$ ; $3$ ; $1$ du triangle de Pascal).", `Avec $u = ${nb(a)}$ et $v = ${coef(b, "i")}$ : $v^2 = ${nb(-b * b)}$ et $v^3 = ${cx(0, -(b ** 3))}$.`, "Regroupe les termes réels d'un côté, les termes en $i$ de l'autre."],
      solution: `$(${cx(a, b)})^3 = ${pr(a)}^3 + 3 \\times ${pr(a)}^2 \\times ${coef(b, "i")} + 3 \\times ${pr(a)} \\times (${coef(b, "i")})^2 + (${coef(b, "i")})^3$\n\n$= ${nb(a ** 3)} ${pt(3 * a * a * b, "i")} ${plus(-3 * a * b * b)} ${pt(-(b ** 3), "i")} = ${cx(re, im)}$.\n\nDonc $\\text{${quoi}} = ${nb(att)}$.` };
  });

  def("xa-vrai-faux", () => vraiFaux4([
    ["Pour tout complexe $z$, $z + \\overline{z}$ est un réel.", true, "$z + \\overline{z} = 2\\,\\text{Re}(z)$."],
    ["Si $\\overline{z} = z$, alors $z$ est un réel.", true, "$z - \\overline{z} = 2i\\,\\text{Im}(z) = 0$, donc $\\text{Im}(z) = 0$."],
    ["$i^{2026} = -1$.", true, "$2026 = 4 \\times 506 + 2$, donc $i^{2026} = i^2 = -1$."],
    ["Pour tous complexes $z_1$ et $z_2$, $\\overline{z_1 z_2} = \\overline{z_1}\\,\\overline{z_2}$.", true, "c'est une propriété du cours, démontrée en développant les deux membres."],
    ["Pour tout complexe $z$, $z\\overline{z}$ est un réel positif ou nul.", true, "$z\\overline{z} = a^2 + b^2$ avec $z = a + ib$."],
    ["Un imaginaire pur $z$ vérifie $\\overline{z} = -z$.", true, "si $z = ib$, alors $\\overline{z} = -ib = -z$."],
    ["$(1 + i)^2 = 2i$.", true, "$(1 + i)^2 = 1 + 2i + i^2 = 2i$."],
    ["$\\dfrac{1}{i} = -i$.", true, "$i \\times (-i) = -i^2 = 1$."],
    ["$0$ est à la fois réel et imaginaire pur.", true, "sa partie réelle et sa partie imaginaire sont nulles."],
    ["Pour tout complexe $z$, $z^2$ est un réel positif.", false, "$i^2 = -1$ est négatif, et $(1 + i)^2 = 2i$ n'est même pas réel."],
    ["La partie imaginaire de $3 - 4i$ est $-4i$.", false, "la partie imaginaire est le réel $-4$, sans le $i$."],
    ["$i^3 = i$.", false, "$i^3 = i^2 \\times i = -i$."],
    ["$\\overline{z_1 + z_2} = \\overline{z_1} - \\overline{z_2}$ pour tous complexes $z_1$, $z_2$.", false, "le conjugué d'une somme est la somme des conjugués : $\\overline{z_1} + \\overline{z_2}$."],
    ["$(a + ib)^2 = a^2 - b^2$ pour tous réels $a$ et $b$.", false, "il manque le double produit : $(a + ib)^2 = a^2 - b^2 + 2abi$."],
    ["$\\dfrac{1}{i} = i$.", false, "$i \\times i = -1$, donc l'inverse de $i$ est $-i$."],
    ["$\\text{Re}(z z') = \\text{Re}(z) \\times \\text{Re}(z')$ pour tous complexes $z$ et $z'$.", false, "contre-exemple : $\\text{Re}(i \\times i) = -1$ alors que $\\text{Re}(i) \\times \\text{Re}(i) = 0$."],
    ["Deux complexes qui ont la même partie réelle sont égaux.", false, "$1 + i$ et $1 - i$ ont la même partie réelle sans être égaux."],
    ["$i^2 = 1$.", false, "par définition, $i^2 = -1$."],
    ["Le conjugué de $2 + 5i$ est $-2 + 5i$.", false, "on change seulement le signe de la partie imaginaire : $2 - 5i$."]
  ], ["Teste chaque affirmation sur un exemple simple ($z = i$, $z = 1 + i$…).", "Rappelle-toi : $i^2 = -1$ et $\\overline{a + ib} = a - ib$.", "Une affirmation « pour tout $z$ » est fausse dès qu'un contre-exemple existe."]));

  // Figures du cours (chapitre 1)
  FIGURES["xa-cours-ensembles"] = () => {
    // ensembles emboîtés N ⊂ Z ⊂ D ⊂ Q ⊂ R ⊂ C
    const noms = ["ℕ", "ℤ", "𝔻", "ℚ", "ℝ", "ℂ"], ex = ["3", "−5", "0,7", "⅓", "√2", "2 + i"];
    let s = `<svg class="graph" viewBox="0 0 320 200" role="img" aria-label="Ensembles de nombres emboîtés : N dans Z dans D dans Q dans R dans C ; exemples 3, −5, 0,7, un tiers, racine de 2 et 2 + i">`;
    for (let k = 5; k >= 0; k--) { const w = 70 + k * 48, h = 40 + k * 30; s += `<rect x="${160 - w / 2}" y="${196 - h - 4}" width="${w}" height="${h}" rx="14" style="fill:var(--lagon);fill-opacity:${0.05 + 0.03 * (5 - k)};stroke:var(--lagon);stroke-width:1.5"/>`; s += `<text x="${160 - w / 2 + 12}" y="${196 - h + 13}" style="font:700 13px var(--f-texte);fill:var(--lagon)">${noms[k]}</text>`; s += `<text x="${160 + w / 2 - 12}" y="${196 - h + 13}" text-anchor="end" style="font:11px var(--f-texte);fill:var(--encre)">${ex[k]}</text>`; }
    return s + `</svg>`;
  };
  FIGURES["xa-cours-puissances-i"] = () => planC({ xmin: -1.7, xmax: 1.7, ymin: -1.7, ymax: 1.7, xstep: 0.5, ystep: 0.5, xetiq: 1, yetiq: 1,
    cercles: [{ x: 0, y: 0, r: 1, pointille: true }],
    points: [{ x: 1, y: 0, label: "1 = i⁰ = i⁴" }, { x: 0, y: 1, label: "i = i¹" }, { x: -1, y: 0, label: "−1 = i²", gauche: true }, { x: 0, y: -1, label: "−i = i³" }],
    arcs: [{ a1: 0.15, a2: Math.PI / 2 - 0.15, r: 1.25, label: "× i", dl: 0.25 }],
    aria: "Les puissances de i : 1, i, −1, −i, placées sur le cercle de rayon 1 ; multiplier par i fait tourner d'un quart de tour" });
  FIGURES["xa-pascal"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 230" role="img" aria-label="Triangle de Pascal des lignes 0 à 6 ; la ligne 3 est 1, 3, 3, 1 et la ligne 4 est 1, 4, 6, 4, 1">`;
    const pos = (n, k) => [172 + (k - n / 2) * 40, 22 + n * 30];
    for (let k = 0; k <= 4; k++) { const [x, y] = pos(4, k); s += `<circle class="g-rect" cx="${x}" cy="${y - 4}" r="13"/>`; }
    for (let n = 0; n <= 6; n++) {
      s += `<text x="8" y="${22 + n * 30}" style="fill:var(--doux);font:10px var(--f-texte)">n = ${n}</text>`;
      for (let k = 0; k <= n; k++) { const [x, y] = pos(n, k); s += `<text class="g-clabel" x="${x}" y="${y}" text-anchor="middle">${C(n, k)}</text>`; }
    }
    return s + `<text class="g-label" x="172" y="226" text-anchor="middle">(a + b)⁴ : coefficients 1, 4, 6, 4, 1</text></svg>`;
  };


  /* ---------- Valeurs exactes : racines carrées et angles remarquables (chapitres 2, 3 et 5) ---------- */
  // Racine carrée simplifiée : sqrtTex(12) = 2\sqrt{3}
  const sqrtPart = (N) => { let k = 1, m = N; for (let d = 2; d * d <= m; d++) while (m % (d * d) === 0) { m /= d * d; k *= d; } return [k, m]; };
  const sqrtTex = (N) => { const [k, m] = sqrtPart(N); return m === 1 ? nb(k) : `${k === 1 ? "" : nb(k)}\\sqrt{${m}}`; };
  // Nombre exact c√m / d (m ∈ {1, 2, 3}) : objet { c, m, d }
  const EXA = (c, m = 1, d = 1) => { if (c === 0) return { c: 0, m: 1, d: 1 }; const g = pgcd(c, d); return { c: c / g, m, d: d / g }; };
  const exVal = (e) => (e.c * Math.sqrt(e.m)) / e.d;
  const exTex = (e) => {
    if (!e.c) return "0";
    const s = e.c < 0 ? "-" : "", a = Math.abs(e.c);
    const haut = e.m === 1 ? nb(a) : `${a === 1 ? "" : nb(a)}\\sqrt{${e.m}}`;
    return s + (e.d === 1 ? haut : `\\dfrac{${haut}}{${e.d}}`);
  };
  const exMul = (e, k) => EXA(e.c * k, e.m, e.d);
  // r × (cos θ + i sin θ) sous forme algébrique, θ = p π / q remarquable
  const COS1 = [EXA(0), EXA(1, 1, 2), EXA(1, 2, 2), EXA(1, 3, 2), EXA(1)];
  const exact = (v) => { const a = Math.abs(v); const e = COS1.find((x) => Math.abs(exVal(x) - a) < 1e-9); return v < 0 ? EXA(-e.c, e.m, e.d) : e; };
  // Angles remarquables de ]-π ; π] : [p, q] pour pπ/q
  const ANGLES = [[0, 1], [1, 6], [1, 4], [1, 3], [1, 2], [2, 3], [3, 4], [5, 6], [1, 1], [-1, 6], [-1, 4], [-1, 3], [-1, 2], [-2, 3], [-3, 4], [-5, 6]];
  const angTex = (p, q) => { if (p === 0) return "0"; const g = pgcd(p, q); p /= g; q /= g; const s = p < 0 ? "-" : "", a = Math.abs(p); return q === 1 ? `${s}${a === 1 ? "" : nb(a)}\\pi` : `${s}\\dfrac{${a === 1 ? "" : nb(a)}\\pi}{${q}}`; };
  const angVal = ([p, q]) => (p * Math.PI) / q;
  const angNorm = ([p, q]) => { const L = 2 * q; let r = ((p % L) + L) % L; if (r > q) r -= L; const g = pgcd(r, q) || q; return [r / g, q / g]; }; // ramène dans ]-π ; π]
  const angAdd = ([p1, q1], [p2, q2]) => angNorm([p1 * q2 + p2 * q1, q1 * q2]);
  // Forme algébrique exacte de r(cos θ + i sin θ) : parties réelle et imaginaire « exactes »
  const algExact = (r, ang) => { const t = angVal(ang); return [exMul(exact(Math.cos(t)), r), exMul(exact(Math.sin(t)), r)]; };
  const imTex = (e) => { // terme imaginaire « b i » écrit avec le i avant la racine : i\sqrt{3}, 2i\sqrt{3}, \dfrac{\sqrt{3}}{2}i
    const a = Math.abs(e.c);
    if (e.d === 1) return e.m === 1 ? (a === 1 ? "i" : `${nb(a)}i`) : `${a === 1 ? "" : nb(a)}i\\sqrt{${e.m}}`;
    return `\\dfrac{${e.m === 1 ? nb(a) : `${a === 1 ? "" : nb(a)}\\sqrt{${e.m}}`}}{${e.d}}i`;
  };
  const cxEx = (re, im) => { if (!im.c) return exTex(re); const it = imTex(im); if (!re.c) return (im.c < 0 ? "-" : "") + it; return `${exTex(re)} ${im.c < 0 ? "-" : "+"} ${it}`; };
  const trigoTex = (rTex, ang) => `${rTex === "1" ? "" : rTex}\\left(\\cos\\left(${angTex(...ang)}\\right) + i\\sin\\left(${angTex(...ang)}\\right)\\right)`;

  /* ---------- Chapitre 2 : nombres complexes, point de vue géométrique (préfixe xg) ---------- */
  const ptC = (x, y, label, extra) => Object.assign({ x, y, label }, extra || {});
  // Triplets pythagoriciens (a ; b ; c)
  const TRIPLETS = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [4, 3, 5], [12, 5, 13], [9, 12, 15], [12, 9, 15], [8, 15, 17], [15, 8, 17], [7, 24, 25], [24, 7, 25], [20, 21, 29], [21, 20, 29], [9, 40, 41]];

  def("xg-affixe", () => {
    const t = pick(["point", "point", "vecteur", "milieu", "conj"]);
    const A = [rand(-4, 4), rand(-4, 4)]; let B; do { B = [rand(-4, 4), rand(-4, 4)]; } while (B[0] === A[0] && B[1] === A[1]);
    if (A[0] === 0 && A[1] === 0) A[0] = 3;
    let bonne, f, enonce, figure, aides, sol, autre;
    if (t === "point" || t === "conj") {
      const S = t === "conj" ? [A[0], -A[1]] : null;
      figure = planC(Object.assign(fenetre([A].concat(S ? [S] : [])), { points: [ptC(A[0], A[1], "A")], segs: S ? [[A[0], A[1], S[0], S[1], true]] : [], aria: `Point A de coordonnées (${A[0]} ; ${A[1]}) dans le plan complexe` }));
      if (t === "point") {
        bonne = `$${cx(A[0], A[1])}$`; f = [`$${cx(A[1], A[0])}$`, `$${cx(A[0], -A[1])}$`, `$${cx(-A[0], A[1])}$`, `$${cx(-A[0], -A[1])}$`];
        enonce = "Quelle est l'affixe du point $A$ ?";
        aides = ["L'affixe du point de coordonnées $(a\\,;b)$ est $a + ib$.", "L'abscisse donne la partie réelle (axe horizontal).", "L'ordonnée donne la partie imaginaire (axe vertical)."];
        sol = `$A$ a pour coordonnées $(${nb(A[0])}\\,;${nb(A[1])})$, donc son affixe est $z_A = ${cx(A[0], A[1])}$.`;
      } else {
        bonne = `$${cx(A[0], -A[1])}$`; f = [`$${cx(-A[0], A[1])}$`, `$${cx(A[0], A[1])}$`, `$${cx(-A[0], -A[1])}$`, `$${cx(A[1], A[0])}$`];
        enonce = "On appelle $A'$ le symétrique de $A$ par rapport à l'axe des réels. Quelle est l'affixe de $A'$ ?";
        aides = ["Lis d'abord l'affixe $z_A$ du point $A$.", "La symétrie par rapport à l'axe des réels garde l'abscisse et change le signe de l'ordonnée.", "L'affixe de $A'$ est le conjugué $\\overline{z_A}$."];
        sol = `$z_A = ${cx(A[0], A[1])}$. Le symétrique par rapport à l'axe réel a pour affixe le conjugué : $z_{A'} = \\overline{z_A} = ${cx(A[0], -A[1])}$.`;
      }
      autre = voisin(A[0], A[1]);
    } else {
      figure = planC(Object.assign(fenetre([A, B]), { points: [ptC(A[0], A[1], "A"), ptC(B[0], B[1], "B")], aria: `Points A (${A[0]} ; ${A[1]}) et B (${B[0]} ; ${B[1]}) dans le plan complexe` }));
      if (t === "vecteur") {
        const v = [B[0] - A[0], B[1] - A[1]];
        bonne = `$${cx(...v)}$`; f = [`$${cx(-v[0], -v[1])}$`, `$${cx(A[0] + B[0], A[1] + B[1])}$`, `$${cx(v[1], v[0])}$`, `$${cx(v[0], -v[1])}$`];
        enonce = "Quelle est l'affixe du vecteur $\\overrightarrow{AB}$ ?";
        aides = ["Lis les affixes $z_A$ et $z_B$ sur la figure.", "L'affixe du vecteur $\\overrightarrow{AB}$ est $z_B - z_A$ : « arrivée moins départ ».", "Soustrais les parties réelles, puis les parties imaginaires."];
        sol = `$z_A = ${cx(...A)}$ et $z_B = ${cx(...B)}$, donc $z_{\\overrightarrow{AB}} = z_B - z_A = ${cx(...v)}$.`;
        autre = voisin(...v);
      } else {
        const m = [Q(A[0] + B[0], 2), Q(A[1] + B[1], 2)];
        bonne = `$${cx(...m)}$`; f = [`$${cx(A[0] + B[0], A[1] + B[1])}$`, `$${cx(Q(B[0] - A[0], 2), Q(B[1] - A[1], 2))}$`, `$${cx(m[1], m[0])}$`, `$${cx(m[0], { n: -m[1].n, d: m[1].d })}$`];
        enonce = "Quelle est l'affixe du milieu $I$ du segment $[AB]$ ?";
        aides = ["Lis les affixes $z_A$ et $z_B$ sur la figure.", "$z_I = \\dfrac{z_A + z_B}{2}$.", "Calcule $z_A + z_B$, puis divise la partie réelle et la partie imaginaire par $2$."];
        sol = `$z_A = ${cx(...A)}$ et $z_B = ${cx(...B)}$, donc $z_I = \\dfrac{z_A + z_B}{2} = \\dfrac{${cx(A[0] + B[0], A[1] + B[1])}}{2} = ${cx(...m)}$.`;
        autre = (k) => `$${cx(Q(A[0] + B[0] + k + 1, 2), m[1])}$`;
      }
    }
    const ch = choix4(bonne, f, autre);
    return { enonce, figure, mode: "choix", choix: ch.choix, attendu: ch.attendu, aides, solution: sol };
  });

  def("xg-module", () => {
    const t = pick(["entier", "entier", "racine", "racine", "produit"]);
    if (t === "entier") {
      const [p, q, r] = pick(TRIPLETS), a = p * pick([-1, 1]), b = q * pick([-1, 1]), k = pick([1, 1, 1, 2]);
      const z = cx(k * a, k * b);
      return { enonce: `Calcule le module de $z = ${z}$.`, mode: "nombre", prefixe: "$|z| =$", attendu: k * r,
        erreurs: [{ valeur: k * k * r * r, message: "Il faut prendre la racine carrée : $|z| = \\sqrt{a^2 + b^2}$." }, { valeur: Math.abs(k * a) + Math.abs(k * b), message: "On n'additionne pas les parties : $|z| = \\sqrt{a^2 + b^2}$, comme une distance avec Pythagore." }, { valeur: Math.sqrt(Math.abs(k * k * (a * a - b * b))), message: "C'est $a^2 + b^2$ sous la racine, pas $a^2 - b^2$." }],
        aides: ["$|a + ib| = \\sqrt{a^2 + b^2}$ : c'est la distance $OM$.", `$a^2 + b^2 = ${pr(k * a)}^2 + ${pr(k * b)}^2 = ${k * k * (a * a + b * b)}$.`, "Prends la racine carrée."],
        solution: `$|z| = \\sqrt{${pr(k * a)}^2 + ${pr(k * b)}^2} = \\sqrt{${nb(k * k * r * r)}} = ${nb(k * r)}$.` };
    }
    if (t === "racine") {
      let a, b, N; do { a = rand(-7, 7); b = rand(-7, 7); N = a * a + b * b; } while (!a || !b || Number.isInteger(Math.sqrt(N)));
      const bonne = `$${sqrtTex(N)}$`;
      const f = [`$${nb(N)}$`, `$${nb(Math.abs(a) + Math.abs(b))}$`, Math.abs(a * a - b * b) > 0 ? `$${sqrtTex(Math.abs(a * a - b * b))}$` : null, `$\\sqrt{${Math.abs(a) + Math.abs(b)}}$`, `$${sqrtTex(N + 1)}$`];
      const ch = choix4(bonne, f, (k) => `$${sqrtTex(N + 2 + k)}$`);
      const [kk, mm] = sqrtPart(N);
      return { enonce: `Quel est le module de $z = ${cx(a, b)}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["$|a + ib| = \\sqrt{a^2 + b^2}$.", `$a^2 + b^2 = ${pr(a)}^2 + ${pr(b)}^2 = ${N}$.`, kk > 1 ? `Simplifie : $${N} = ${kk * kk} \\times ${mm}$.` : `$${N}$ n'est pas un carré parfait : on laisse $\\sqrt{${N}}$.`],
        solution: `$|z| = \\sqrt{${pr(a)}^2 + ${pr(b)}^2} = \\sqrt{${N}}${kk > 1 ? ` = \\sqrt{${kk * kk} \\times ${mm}} = ${sqrtTex(N)}` : ""}$.` };
    }
    // module d'un produit : |z1 z2| = |z1| |z2|
    const [p1, q1, r1] = pick(TRIPLETS.slice(0, 6)), [p2, q2, r2] = pick(TRIPLETS.slice(0, 8));
    const z1 = [p1 * pick([-1, 1]), q1 * pick([-1, 1])], z2 = [p2 * pick([-1, 1]), q2 * pick([-1, 1])];
    return { enonce: `Calcule le module de $z = (${cx(...z1)})(${cx(...z2)})$, sans développer.`, mode: "nombre", prefixe: "$|z| =$", attendu: r1 * r2,
      erreurs: [{ valeur: r1 + r2, message: "Le module d'un produit est le **produit** des modules." }, { valeur: r1 * r1 * r2 * r2, message: "Il faut prendre les modules, pas leurs carrés." }],
      aides: ["Propriété : $|z_1 z_2| = |z_1| \\times |z_2|$.", `$|${cx(...z1)}| = \\sqrt{${p1 * p1} + ${q1 * q1}} = ${r1}$.`, `$|${cx(...z2)}| = \\sqrt{${p2 * p2} + ${q2 * q2}} = ${r2}$.`],
      solution: `$|z| = |${cx(...z1)}| \\times |${cx(...z2)}| = ${r1} \\times ${r2} = ${r1 * r2}$.` };
  });

  def("xg-module-prop", () => {
    const r1 = rand(2, 12), r2 = rand(2, 12), t = pick(["prod", "quot", "puiss", "conj", "kfois", "inv"]);
    const intro = `On sait que $|z_1| = ${r1}$ et $|z_2| = ${r2}$.`;
    if (t === "prod") return { enonce: `${intro} Que vaut $|z_1 z_2|$ ?`, mode: "nombre", prefixe: "$|z_1 z_2| =$", attendu: r1 * r2,
      erreurs: [{ valeur: r1 + r2, message: "Le module d'un produit est le produit des modules." }], aides: ["Pense à la propriété du module d'un produit.", "$|z_1 z_2| = |z_1| \\times |z_2|$.", `$${r1} \\times ${r2}$.`], solution: `$|z_1 z_2| = |z_1| \\times |z_2| = ${r1} \\times ${r2} = ${r1 * r2}$.` };
    if (t === "quot") return { enonce: `${intro} Que vaut $\\left|\\dfrac{z_1}{z_2}\\right|$ ? Donne la valeur exacte (fraction si besoin).`, mode: "nombre", prefixe: "Module :", attendu: r1 / r2,
      erreurs: [{ valeur: r1 - r2, message: "Le module d'un quotient est le quotient des modules." }, { valeur: r2 / r1, message: "Dans l'autre sens : $\\dfrac{|z_1|}{|z_2|}$." }, { valeur: +(r1 / r2).toFixed(2), message: "C'est une valeur approchée : donne la valeur exacte, en fraction." }],
      aides: ["Pense à la propriété du module d'un quotient.", "$\\left|\\dfrac{z_1}{z_2}\\right| = \\dfrac{|z_1|}{|z_2|}$.", "Simplifie la fraction si possible."], solution: `$\\left|\\dfrac{z_1}{z_2}\\right| = \\dfrac{|z_1|}{|z_2|} = ${frac(r1, r2)}$.` };
    if (t === "inv") return { enonce: `${intro} Que vaut $\\left|\\dfrac{1}{z_1}\\right|$ ? Donne la valeur exacte (fraction).`, mode: "nombre", prefixe: "Module :", attendu: 1 / r1,
      erreurs: [{ valeur: -r1, message: "Un module est toujours positif." }, { valeur: r1, message: "Le module de l'inverse est l'inverse du module." }, { valeur: +(1 / r1).toFixed(2), message: "C'est une valeur approchée : donne la fraction." }],
      aides: ["Pense à la propriété du module d'un inverse.", "$\\left|\\dfrac{1}{z}\\right| = \\dfrac{1}{|z|}$.", `$\\dfrac{1}{${r1}}$.`], solution: `$\\left|\\dfrac{1}{z_1}\\right| = \\dfrac{1}{|z_1|} = \\dfrac{1}{${r1}}$.` };
    if (t === "puiss") { const n = rand(2, 4), r = rand(2, 7); return { enonce: `On sait que $|z| = ${r}$. Que vaut $|z^{${n}}|$ ?`, mode: "nombre", prefixe: `$|z^{${n}}| =$`, attendu: r ** n,
      erreurs: [{ valeur: n * r, message: `Le module d'une puissance est la puissance du module : $${r}^{${n}}$, pas $${n} \\times ${r}$.` }, { valeur: r, message: "La puissance change le module." }], aides: ["Le module d'une puissance est la puissance du module.", `$|z^{${n}}| = |z|^{${n}}$.`, `$${r}^{${n}}$.`], solution: `$|z^{${n}}| = |z|^{${n}} = ${r}^{${n}} = ${r ** n}$.` }; }
    if (t === "conj") return { enonce: `${intro} Que vaut $|\\overline{z_1}\\, z_2|$ ?`, mode: "nombre", prefixe: "Module :", attendu: r1 * r2,
      erreurs: [{ valeur: -r1 * r2, message: "Un module est toujours positif." }, { valeur: r1 + r2, message: "Le module d'un produit est le produit des modules." }], aides: ["Un nombre et son conjugué ont le même module.", "$|\\overline{z_1}\\, z_2| = |\\overline{z_1}| \\times |z_2|$.", `$|\\overline{z_1}| = |z_1| = ${r1}$.`], solution: `$|\\overline{z_1}\\, z_2| = |\\overline{z_1}| \\times |z_2| = ${r1} \\times ${r2} = ${r1 * r2}$ (car $|\\overline{z_1}| = |z_1|$).` };
    const k = pick([-5, -4, -3, -2, 2, 3, 4, 5]), useI = pick([true, false]);
    return { enonce: `${intro} Que vaut $|${useI ? coef(k, "i") : nb(k)}z_1|$ ?`, mode: "nombre", prefixe: "Module :", attendu: Math.abs(k) * r1,
      erreurs: [{ valeur: k * r1, message: "Un module est toujours positif : $|" + nb(k) + "| = " + Math.abs(k) + "$." }, { valeur: r1, message: "Le facteur multiplie aussi le module." }],
      aides: ["$|kz| = |k| \\times |z|$.", useI ? `$|${coef(k, "i")}| = ${Math.abs(k)}$ : le point est à la distance $${Math.abs(k)}$ de $O$.` : `$|${nb(k)}| = ${Math.abs(k)}$.`, `$${Math.abs(k)} \\times ${r1}$.`],
      solution: `$|${useI ? coef(k, "i") : nb(k)}z_1| = |${useI ? coef(k, "i") : nb(k)}| \\times |z_1| = ${Math.abs(k)} \\times ${r1} = ${Math.abs(k) * r1}$.` };
  });

  // Un complexe « remarquable » r(cos θ + i sin θ) tiré au hasard (θ non nul et différent de π pour l'argument)
  const remarquable = (sansAxes) => {
    let ang; do { ang = pick(ANGLES); } while (sansAxes && (ang[0] === 0 || ang[1] === 1 || ang[1] === 2));
    const r = rand(1, 9);
    const [re, im] = algExact(r, ang);
    return { r, ang, re, im, tex: cxEx(re, im) };
  };

  def("xg-argument", () => {
    const Z = remarquable(Math.random() < 0.8);
    const [p, q] = Z.ang;
    const bonne = `$${angTex(p, q)}$`;
    const pieges = [angNorm([-p, q]), angNorm([q - p, q]), angNorm([p * 2 + (p ? 0 : 1), q * 2]), angNorm([p + q, q]), angNorm([q - 2 * p, 2 * q])].map((a) => `$${angTex(...a)}$`);
    // l'angle « complémentaire » (cos et sin échangés)
    pieges.unshift(`$${angTex(...angNorm([q - 2 * p, 2 * q]))}$`);
    const ch = choix4(bonne, pieges, () => `$${angTex(...pick(ANGLES))}$`);
    const cosT = exTex(exact(Math.cos(angVal(Z.ang)))), sinT = exTex(exact(Math.sin(angVal(Z.ang))));
    return { enonce: `Parmi ces nombres, lequel est un argument de $z = ${Z.tex}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`Calcule d'abord le module : $|z| = ${Z.r}$.`, `Un argument $\\theta$ vérifie $\\cos\\theta = \\dfrac{\\text{Re}(z)}{|z|}$ et $\\sin\\theta = \\dfrac{\\text{Im}(z)}{|z|}$.`, `Cherche l'angle dont le cosinus vaut $${cosT}$ et le sinus $${sinT}$ (les signes donnent le quadrant).`],
      solution: `$|z| = ${Z.r}$, donc $\\cos\\theta = ${cosT}$ et $\\sin\\theta = ${sinT}$.\n\nL'angle qui convient est $\\theta = ${angTex(p, q)}$ (à $2\\pi$ près).` };
  });

  def("xg-trigo", () => {
    const Z = remarquable(Math.random() < 0.85), sens = pick(["versTrigo", "versTrigo", "versAlg"]);
    const rTex = nb(Z.r), [p, q] = Z.ang;
    if (sens === "versAlg") {
      const bonne = `$${Z.tex}$`;
      const [re2, im2] = algExact(Z.r, angNorm([q - 2 * p, 2 * q])); // cos et sin échangés
      const f = [`$${cxEx(re2, im2)}$`, `$${cxEx(EXA(-Z.re.c, Z.re.m, Z.re.d), Z.im)}$`, `$${cxEx(Z.re, EXA(-Z.im.c, Z.im.m, Z.im.d))}$`, `$${cxEx(EXA(-Z.re.c, Z.re.m, Z.re.d), EXA(-Z.im.c, Z.im.m, Z.im.d))}$`];
      const ch = choix4(bonne, f, () => { const W = remarquable(false); return `$${W.tex}$`; });
      return { enonce: `Quelle est la forme algébrique de $z = ${trigoTex(rTex, Z.ang)}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Remplace le cosinus et le sinus par leurs valeurs exactes.", `$\\cos\\left(${angTex(p, q)}\\right) = ${exTex(exact(Math.cos(angVal(Z.ang))))}$ et $\\sin\\left(${angTex(p, q)}\\right) = ${exTex(exact(Math.sin(angVal(Z.ang))))}$.`, `Développe en multipliant par $${rTex}$.`],
        solution: `$z = ${rTex === "1" ? "" : rTex}\\left(${exTex(exact(Math.cos(angVal(Z.ang))))} + i \\times ${exact(Math.sin(angVal(Z.ang))).c < 0 ? `\\left(${exTex(exact(Math.sin(angVal(Z.ang))))}\\right)` : exTex(exact(Math.sin(angVal(Z.ang))))}\\right) = ${Z.tex}$.` };
    }
    const bonne = `$${trigoTex(rTex, Z.ang)}$`;
    const r2 = Z.r * Z.r;
    const f = [trigoTex(nb(r2), Z.ang), trigoTex(rTex, angNorm([-p, q])), trigoTex(rTex, angNorm([q - 2 * p, 2 * q])), trigoTex(rTex, angNorm([p + q, q])), trigoTex(nb(Z.r + 1), Z.ang)].map((x) => `$${x}$`);
    const ch = choix4(bonne, f);
    return { enonce: `Quelle est une forme trigonométrique de $z = ${Z.tex}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Calcule d'abord le module $r = |z| = \\sqrt{a^2 + b^2}$.", `$r = ${Z.r}$ : cherche $\\theta$ tel que $\\cos\\theta = \\dfrac{a}{r}$ et $\\sin\\theta = \\dfrac{b}{r}$.`, "La forme trigonométrique s'écrit $r(\\cos\\theta + i\\sin\\theta)$, avec $r > 0$."],
      solution: `$r = |z| = ${Z.r}$. Puis $\\cos\\theta = ${exTex(exact(Math.cos(angVal(Z.ang))))}$ et $\\sin\\theta = ${exTex(exact(Math.sin(angVal(Z.ang))))}$, donc $\\theta = ${angTex(p, q)}$.\n\n$z = ${trigoTex(rTex, Z.ang)}$.` };
  });

  def("xg-distance", () => {
    const t = pick(["entier", "entier", "racine", "cercle"]);
    let A, B, v;
    if (t === "entier") { const [p, q] = pick(TRIPLETS.slice(0, 5)); A = [rand(-3, 2), rand(-3, 2)]; v = [p * pick([-1, 1]), q * pick([-1, 1])]; B = [A[0] + v[0], A[1] + v[1]]; }
    else { A = [rand(-4, 4), rand(-4, 4)]; do { B = [rand(-4, 4), rand(-4, 4)]; v = [B[0] - A[0], B[1] - A[1]]; } while (!v[0] || !v[1] || Number.isInteger(Math.sqrt(v[0] ** 2 + v[1] ** 2))); }
    const N = v[0] ** 2 + v[1] ** 2;
    if (t === "cercle") {
      const r = pick([2, 3, 4, 5]), P = pick([[r, 0], [0, r], [3, 4], [4, 3], [1, 2], [2, 2], [1, 3], [-3, 4], [-2, -2], [0, -r], [2, 1]]);
      const dans = P[0] ** 2 + P[1] ** 2 === r * r;
      const cible = [rand(-2, 2), rand(-2, 2)], M = [cible[0] + P[0], cible[1] + P[1]];
      const c4 = choix4(dans ? "Oui : $|z_M - z_\\Omega| = " + r + "$" : `Non : $|z_M - z_\\Omega| = ${sqrtTex(P[0] ** 2 + P[1] ** 2)}$`, dans ? ["Non : $|z_M| \\neq " + r + "$", `Non : $|z_M - z_\\Omega| = ${nb(r * r)}$`, "On ne peut pas savoir sans figure"] : [`Oui : $|z_M - z_\\Omega| = ${r}$`, `Oui : $|z_M| = ${sqrtTex(M[0] ** 2 + M[1] ** 2)}$`, "On ne peut pas savoir sans figure"]);
      return { enonce: `Le point $M$ d'affixe $z_M = ${cx(...M)}$ est-il sur le cercle de centre $\\Omega$ d'affixe $${cx(...cible)}$ et de rayon $${r}$ ?`, mode: "choix", choix: c4.choix, attendu: c4.attendu,
        aides: ["$M$ est sur le cercle si et seulement si $\\Omega M = r$.", "$\\Omega M = |z_M - z_\\Omega|$.", `$z_M - z_\\Omega = ${cx(...P)}$ : calcule son module.`],
        solution: `$z_M - z_\\Omega = ${cx(...P)}$, donc $\\Omega M = |${cx(...P)}| = \\sqrt{${P[0] ** 2 + P[1] ** 2}}${dans ? ` = ${r}` : ` = ${sqrtTex(P[0] ** 2 + P[1] ** 2)} \\neq ${r}`}$.\n\n${dans ? "Le point $M$ est bien sur le cercle." : "Le point $M$ n'est pas sur le cercle."}` };
    }
    const figure = planC(Object.assign(fenetre([A, B]), { points: [ptC(A[0], A[1], "A"), ptC(B[0], B[1], "B")], segs: [[A[0], A[1], B[0], B[1]]], aria: `Points A (${A[0]} ; ${A[1]}) et B (${B[0]} ; ${B[1]}) reliés par un segment` }));
    const enonce = `On donne $z_A = ${cx(...A)}$ et $z_B = ${cx(...B)}$. Calcule la distance $AB$.`;
    const aides = ["$AB = |z_B - z_A|$.", `$z_B - z_A = ${cx(...v)}$.`, "Calcule le module : $\\sqrt{a^2 + b^2}$."];
    const sol = `$AB = |z_B - z_A| = |${cx(...v)}| = \\sqrt{${pr(v[0])}^2 + ${pr(v[1])}^2} = \\sqrt{${N}}${Number.isInteger(Math.sqrt(N)) ? ` = ${Math.sqrt(N)}` : sqrtPart(N)[0] > 1 ? ` = ${sqrtTex(N)}` : ""}$.`;
    if (t === "entier") return { enonce, figure, mode: "nombre", prefixe: "$AB =$", attendu: Math.sqrt(N), aides, solution: sol,
      erreurs: [{ valeur: N, message: "Il manque la racine carrée." }, { valeur: Math.sqrt((A[0] + B[0]) ** 2 + (A[1] + B[1]) ** 2), message: "C'est $|z_B - z_A|$, avec une **différence**." }, { valeur: Math.abs(v[0]) + Math.abs(v[1]), message: "On n'additionne pas les écarts : utilise $\\sqrt{a^2 + b^2}$." }] };
    const ch = choix4(`$${sqrtTex(N)}$`, [`$${nb(N)}$`, `$${sqrtTex((A[0] + B[0]) ** 2 + (A[1] + B[1]) ** 2 || 1)}$`, `$${nb(Math.abs(v[0]) + Math.abs(v[1]))}$`, `$${sqrtTex(Math.abs(v[0] ** 2 - v[1] ** 2) || 2)}$`], (k) => `$${sqrtTex(N + k + 1)}$`);
    return { enonce, figure, mode: "choix", choix: ch.choix, attendu: ch.attendu, aides, solution: sol };
  });

  def("xg-suite", () => {
    // z_{n+1} = a z_n + b
    const a = pick([[0, 1], [0, -1], [1, 1], [1, -1], [0, 2], [2, 0], [-1, 1], [0, 1]]), b = [rand(-3, 3), rand(-3, 3)], z0 = [rand(-3, 3), rand(-3, 3)];
    if (!z0[0] && !z0[1]) z0[0] = 1;
    const aT = a[0] === 0 ? coef(a[1], "i") : a[1] === 0 ? nb(a[0]) : `(${cx(...a)})`;
    const z1 = cAdd(cMul(a, z0), b), z2 = cAdd(cMul(a, z1), b), quoi = pick(["Re", "Im"]), att = quoi === "Re" ? z2[0] : z2[1];
    const fauxZ1 = cAdd(cMul(a, z0), b), fauxZ2 = cAdd(cMul(a, z0), cMul([2, 0], b));
    return { enonce: `La suite $(z_n)$ est définie par $z_0 = ${cx(...z0)}$ et, pour tout entier $n$, $z_{n+1} = ${aT}z_n${ajoute(b)}$. Quelle est la partie ${quoi === "Re" ? "réelle" : "imaginaire"} de $z_2$ ?`,
      mode: "nombre", prefixe: `$\\text{${quoi}}(z_2) =$`, attendu: att,
      erreurs: [{ valeur: quoi === "Re" ? z1[0] : z1[1], message: `Ça, c'est pour $z_1$ : il faut encore une étape.` }, { valeur: quoi === "Re" ? z2[1] : z2[0], message: `Ça, c'est la partie ${quoi === "Re" ? "imaginaire" : "réelle"} de $z_2$.` }, { valeur: quoi === "Re" ? fauxZ2[0] : fauxZ2[1], message: "On ne saute pas d'étape : calcule $z_1$, puis $z_2$ à partir de $z_1$." }],
      aides: ["Calcule d'abord $z_1$ en remplaçant $n$ par $0$.", `$z_1 = ${cx(...z1)}$.`, "Recommence avec $z_1$ pour obtenir $z_2$ (sans oublier $i^2 = -1$)."],
      solution: `$z_1 = ${aT}(${cx(...z0)})${ajoute(b)} = ${cx(...z1)}$\n\n$z_2 = ${aT}(${cx(...z1)})${ajoute(b)} = ${cx(...z2)}$\n\nDonc $\\text{${quoi}}(z_2) = ${nb(att)}$.` };
  });

  def("xg-vrai-faux", () => vraiFaux4([
    ["Pour tout complexe $z$, $|z|^2 = z\\overline{z}$.", true, "avec $z = a + ib$, $z\\overline{z} = a^2 + b^2 = |z|^2$."],
    ["Pour tous complexes $z_1$ et $z_2$, $|z_1 z_2| = |z_1| \\times |z_2|$.", true, "c'est une propriété du cours, démontrée avec $|z|^2 = z\\overline{z}$."],
    ["Un complexe et son conjugué ont le même module.", true, "$a^2 + (-b)^2 = a^2 + b^2$ : les deux points sont symétriques par rapport à l'axe réel."],
    ["Le nombre $\\dfrac{3}{5} + \\dfrac{4}{5}i$ appartient à $\\mathbb{U}$.", true, "son module vaut $\\sqrt{\\dfrac{9}{25} + \\dfrac{16}{25}} = 1$."],
    ["Si $z$ et $z'$ sont dans $\\mathbb{U}$, alors $zz'$ est dans $\\mathbb{U}$.", true, "$|zz'| = |z| \\times |z'| = 1 \\times 1 = 1$."],
    ["Un argument de $-3$ est $\\pi$.", true, "le point d'affixe $-3$ est sur la demi-droite des réels négatifs."],
    ["Un argument de $2i$ est $\\dfrac{\\pi}{2}$.", true, "le point d'affixe $2i$ est sur la demi-droite des imaginaires positifs."],
    ["L'affixe du vecteur $\\overrightarrow{AB}$ est $z_B - z_A$.", true, "on fait « arrivée moins départ », comme pour les coordonnées."],
    ["Pour tous complexes $z_1$ et $z_2$, $|z_1 + z_2| = |z_1| + |z_2|$.", false, "contre-exemple : $|1 + (-1)| = 0$ alors que $|1| + |-1| = 2$ (on a seulement l'inégalité triangulaire)."],
    ["Le module de $3 - 4i$ est $-1$.", false, "un module est positif : $|3 - 4i| = \\sqrt{9 + 16} = 5$."],
    ["Le nombre $0$ a pour argument $0$.", false, "$0$ n'a pas d'argument : on ne définit l'argument que pour $z \\neq 0$."],
    ["Un argument de $1 + i$ est $\\dfrac{\\pi}{2}$.", false, "$\\cos\\theta = \\sin\\theta = \\dfrac{\\sqrt{2}}{2}$, donc $\\theta = \\dfrac{\\pi}{4}$."],
    ["$2\\left(\\cos\\dfrac{\\pi}{3} - i\\sin\\dfrac{\\pi}{3}\\right)$ est une forme trigonométrique.", false, "il faut un « $+$ » : on écrit $2\\left(\\cos\\left(-\\dfrac{\\pi}{3}\\right) + i\\sin\\left(-\\dfrac{\\pi}{3}\\right)\\right)$."],
    ["$-2\\left(\\cos\\dfrac{\\pi}{4} + i\\sin\\dfrac{\\pi}{4}\\right)$ est une forme trigonométrique de module $-2$.", false, "le module est toujours positif : ce nombre a pour module $2$ (et pour argument $-\\dfrac{3\\pi}{4}$)."],
    ["Le module de $i$ est $i$.", false, "un module est un réel positif : $|i| = 1$."],
    ["L'affixe du milieu de $[AB]$ est $z_A + z_B$.", false, "il faut diviser par $2$ : $\\dfrac{z_A + z_B}{2}$."]
  ], ["Fais un petit dessin dans le plan complexe.", "Rappelle-toi : $|z| = \\sqrt{a^2 + b^2}$ est une distance, toujours positive.", "Pour « pour tous », un seul contre-exemple suffit à prouver que c'est faux."]));

  /* Figures du cours (chapitre 2) */
  FIGURES["xg-cours-plan"] = () => planC({ xmin: -4.4, xmax: 4.4, ymin: -3.4, ymax: 3.4,
    points: [ptC(3, 2, "M(3 + 2i)"), ptC(3, -2, "M'(3 − 2i)"), ptC(-2, 1, "A(−2 + i)", { gauche: true })],
    fleches: [{ x1: -2, y1: 1, x2: 3, y2: 2, label: "", c: 1 }], segs: [[3, 2, 3, -2, true]],
    textes: [{ x: 0.7, y: 1.1, t: "vecteur AM : 5 + i", dy: 10 }],
    aria: "Plan complexe : M d'affixe 3 + 2i, son symétrique M' d'affixe 3 − 2i (conjugué), et le vecteur AM d'affixe 5 + i" });
  FIGURES["xg-cours-module"] = () => planC({ xmin: -1.4, xmax: 4.4, ymin: -1.4, ymax: 3.6,
    points: [ptC(3, 2, "M(a + ib)")], segs: [[0, 0, 3, 2], [3, 0, 3, 2, true], [0, 2, 3, 2, true]],
    arcs: [{ a1: 0, a2: Math.atan2(2, 3), r: 1.1, label: "θ", dl: 0.3 }],
    textes: [{ x: 1.3, y: 1.25, t: "r = |z|", dx: -6, dy: -4 }, { x: 3, y: -0.15, t: "a", dy: 12 }, { x: -0.15, y: 2, t: "b", ancre: "end", dx: -4, dy: 4 }],
    aria: "Le module r est la distance OM, un argument θ est l'angle entre l'axe des réels et OM" });
  FIGURES["xg-cours-unite"] = () => {
    const pts = [[1, 0, "1"], [0, 1, "i"], [-1, 0, "−1"], [0, -1, "−i"], [0.5, Math.sqrt(3) / 2, "π/3"], [Math.sqrt(2) / 2, Math.sqrt(2) / 2, "π/4"], [Math.sqrt(3) / 2, 0.5, "π/6"], [-0.5, Math.sqrt(3) / 2, "2π/3"]];
    return planC({ xmin: -1.6, xmax: 1.6, ymin: -1.6, ymax: 1.6, xstep: 0.5, ystep: 0.5, xetiq: 1, yetiq: 1, cercles: [{ x: 0, y: 0, r: 1 }],
      points: pts.map(([x, y, l]) => ptC(x, y, l)), aria: "Cercle des nombres complexes de module 1 avec les points 1, i, −1, −i et les points d'arguments π/6, π/4, π/3 et 2π/3" });
  };
  FIGURES["xg-qcm-point"] = () => planC({ xmin: -4.4, xmax: 4.4, ymin: -2.4, ymax: 4.4, points: [ptC(-2, 3, "A")], aria: "Point A dans le plan complexe, d'abscisse −2 et d'ordonnée 3" });
  FIGURES["xg-qcm-distance"] = () => planC({ xmin: -2.4, xmax: 4.4, ymin: -2.4, ymax: 3.4, points: [ptC(-1, -1, "A"), ptC(3, 2, "B")], segs: [[-1, -1, 3, 2], [-1, -1, 3, -1, true], [3, -1, 3, 2, true]], aria: "Points A (−1 ; −1) et B (3 ; 2) : 4 carreaux vers la droite et 3 vers le haut" });
  FIGURES["xg-meth-cercle"] = () => planC({ xmin: -4.6, xmax: 6.6, ymin: -4.6, ymax: 6.6, xetiq: 2, yetiq: 2, cercles: [{ x: 1, y: 1, r: 5 }], points: [ptC(1, 1, "Ω"), ptC(4, 5, "M")], segs: [[1, 1, 4, 5]], aria: "Cercle de centre Ω (1 ; 1) et de rayon 5, passant par le point M (4 ; 5)" });


  /* ---------- Chapitre 3 : nombres complexes et trigonométrie (préfixe xt) ---------- */
  const expoTex = (rTex, ang) => { const a = angTex(...ang); return `${rTex === "1" ? "" : rTex}e^{${a === "0" ? "0" : `i${a.startsWith("-") ? "\\left(" + a + "\\right)" : a}`}}`; };
  const expoTex2 = (rTex, ang) => { const a = angTex(...ang).replace(/\\dfrac/g, "\\frac"); if (a === "0") return rTex; const neg = a.startsWith("-"); return `${rTex === "1" ? "" : rTex}e^{${neg ? "-" : ""}i${neg ? a.slice(1) : a}}`; };
  const angE = (p, q) => angTex(p, q).replace(/\\dfrac/g, "\\frac"); // angle écrit en petit, dans un exposant
  // Valeurs exactes en π/12
  const V12 = { p: "\\dfrac{\\sqrt{6} + \\sqrt{2}}{4}", m: "\\dfrac{\\sqrt{6} - \\sqrt{2}}{4}", mp: "-\\dfrac{\\sqrt{6} + \\sqrt{2}}{4}", mm: "\\dfrac{\\sqrt{2} - \\sqrt{6}}{4}" };
  const DECOMP = [
    { ang: [1, 12], cos: "p", sin: "m", d: [[1, 3], "-", [1, 4]] },
    { ang: [1, 12], cos: "p", sin: "m", d: [[1, 4], "-", [1, 6]] },
    { ang: [5, 12], cos: "m", sin: "p", d: [[1, 4], "+", [1, 6]] },
    { ang: [7, 12], cos: "mm", sin: "p", d: [[1, 3], "+", [1, 4]] },
    { ang: [11, 12], cos: "mp", sin: "m", d: [[2, 3], "+", [1, 4]] },
    { ang: [-1, 12], cos: "p", sin: "mm", d: [[1, 6], "-", [1, 4]] },
    { ang: [-5, 12], cos: "m", sin: "mp", d: [[-1, 4], "-", [1, 6]] },
    { ang: [5, 12], cos: "m", sin: "p", d: [[2, 3], "-", [1, 4]] },
    { ang: [7, 12], cos: "mm", sin: "p", d: [[5, 6], "-", [1, 4]] },
    { ang: [-7, 12], cos: "mm", sin: "mp", d: [[-1, 3], "-", [1, 4]] }
  ];
  const cosT = (ang) => exTex(exact(Math.cos(angVal(ang)))), sinT = (ang) => exTex(exact(Math.sin(angVal(ang))));
  const parT = (t) => (t.startsWith("-") ? `\\left(${t}\\right)` : t);
  // cos et sin rationnels d'un angle : triplets pythagoriciens
  const TRIG_RAT = [[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17], [7, 24, 25], [24, 7, 25], [20, 21, 29], [21, 20, 29], [9, 40, 41], [40, 9, 41]];

  def("xt-addition", () => {
    if (Math.random() < 0.3) {
      const D = pick(DECOMP), quoi = pick(["cos", "sin"]), [a, op, b] = D.d;
      const bonne = `$${V12[D[quoi]]}$`;
      const ch = choix4(bonne, ["p", "m", "mp", "mm"].filter((k) => k !== D[quoi]).map((k) => `$${V12[k]}$`));
      const fa = quoi === "cos" ? (op === "+" ? `\\cos a\\cos b - \\sin a\\sin b` : `\\cos a\\cos b + \\sin a\\sin b`) : (op === "+" ? `\\sin a\\cos b + \\cos a\\sin b` : `\\sin a\\cos b - \\cos a\\sin b`);
      const A = angTex(...a), B = angTex(...b);
      const calc = quoi === "cos" ? `${parT(cosT(a))} \\times ${parT(cosT(b))} ${op === "+" ? "-" : "+"} ${parT(sinT(a))} \\times ${parT(sinT(b))}` : `${parT(sinT(a))} \\times ${parT(cosT(b))} ${op} ${parT(cosT(a))} \\times ${parT(sinT(b))}`;
      return { enonce: `En remarquant que $${angTex(...D.ang)} = ${A} ${op} ${B}$, calcule la valeur exacte de $\\${quoi}\\left(${angTex(...D.ang)}\\right)$.`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`Formule : $\\${quoi}(a ${op} b) = ${fa}$.`, `Avec $a = ${A}$ et $b = ${B}$ : $\\cos a = ${cosT(a)}$, $\\sin a = ${sinT(a)}$, $\\cos b = ${cosT(b)}$, $\\sin b = ${sinT(b)}$.`, "Multiplie les racines : $\\sqrt{3} \\times \\sqrt{2} = \\sqrt{6}$ et $\\sqrt{2} \\times \\sqrt{2} = 2$."],
        solution: `$\\${quoi}\\left(${angTex(...D.ang)}\\right) = \\${quoi}\\left(${A} ${op} ${B}\\right) = ${calc}$\n\n$= ${V12[D[quoi]]}$.` };
    }
    // cos(a ± b) et sin(a ± b) à partir de valeurs rationnelles
    const [p1, q1, r1] = pick(TRIG_RAT), [p2, q2, r2] = pick(TRIG_RAT), op = pick(["+", "-"]), quoi = pick(["cos", "sin"]);
    // a et b dans ]0 ; π/2[ : cos a = p1/r1, sin a = q1/r1
    const D2 = r1 * r2;
    const num = quoi === "cos" ? (op === "+" ? p1 * p2 - q1 * q2 : p1 * p2 + q1 * q2) : (op === "+" ? q1 * p2 + p1 * q2 : q1 * p2 - p1 * q2);
    const faux = quoi === "cos" ? (op === "+" ? p1 * p2 + q1 * q2 : p1 * p2 - q1 * q2) : (op === "+" ? q1 * p2 - p1 * q2 : q1 * p2 + p1 * q2);
    return { enonce: `$a$ et $b$ sont deux réels de $\\left]0\\,;\\dfrac{\\pi}{2}\\right[$ tels que $\\cos a = \\dfrac{${p1}}{${r1}}$, $\\sin a = \\dfrac{${q1}}{${r1}}$, $\\cos b = \\dfrac{${p2}}{${r2}}$ et $\\sin b = \\dfrac{${q2}}{${r2}}$. Calcule $\\${quoi}(a ${op} b)$. Donne la valeur exacte (fraction).`,
      mode: "nombre", prefixe: `$\\${quoi}(a ${op} b) =$`, attendu: num / D2,
      erreurs: [{ valeur: faux / D2, message: quoi === "cos" ? "Attention au signe : $\\cos(a + b) = \\cos a\\cos b - \\sin a\\sin b$ et $\\cos(a - b) = \\cos a\\cos b + \\sin a\\sin b$." : "Attention au signe : $\\sin(a \\pm b) = \\sin a\\cos b \\pm \\cos a\\sin b$." }, { valeur: quoi === "cos" ? (op === "+" ? p1 / r1 + p2 / r2 : p1 / r1 - p2 / r2) : (op === "+" ? q1 / r1 + q2 / r2 : q1 / r1 - q2 / r2), message: `$\\${quoi}(a ${op} b)$ n'est pas $\\${quoi} a ${op} \\${quoi} b$ : utilise la formule d'addition.` }, { valeur: +(num / D2).toFixed(2), message: "C'est une valeur approchée : donne la fraction exacte." }],
      aides: [quoi === "cos" ? `$\\cos(a ${op} b) = \\cos a\\cos b ${op === "+" ? "-" : "+"} \\sin a\\sin b$.` : `$\\sin(a ${op} b) = \\sin a\\cos b ${op} \\cos a\\sin b$.`, "Remplace chaque cosinus et chaque sinus par sa valeur.", `Le dénominateur commun est $${r1} \\times ${r2} = ${D2}$.`],
      solution: quoi === "cos" ? `$\\cos(a ${op} b) = \\dfrac{${p1}}{${r1}} \\times \\dfrac{${p2}}{${r2}} ${op === "+" ? "-" : "+"} \\dfrac{${q1}}{${r1}} \\times \\dfrac{${q2}}{${r2}} = \\dfrac{${p1 * p2} ${op === "+" ? "-" : "+"} ${q1 * q2}}{${D2}} = ${frac(num, D2)}$.` : `$\\sin(a ${op} b) = \\dfrac{${q1}}{${r1}} \\times \\dfrac{${p2}}{${r2}} ${op} \\dfrac{${p1}}{${r1}} \\times \\dfrac{${q2}}{${r2}} = \\dfrac{${q1 * p2} ${op} ${p1 * q2}}{${D2}} = ${frac(num, D2)}$.` };
  });

  def("xt-duplication", () => {
    const t = pick(["cos2", "cos2", "sin2", "sin2x", "cos2sin"]);
    if (t === "sin2") {
      const [p, q, r] = pick(TRIG_RAT), sgn = pick([1, -1]);
      return { enonce: `$x$ est un réel de $\\left]0\\,;${sgn > 0 ? "\\dfrac{\\pi}{2}" : "\\pi"}\\right[$ tel que $\\cos x = ${frac(sgn * p, r)}$ et $\\sin x = \\dfrac{${q}}{${r}}$. Calcule $\\sin(2x)$. Donne la valeur exacte (fraction).`,
        mode: "nombre", prefixe: "$\\sin(2x) =$", attendu: (2 * sgn * p * q) / (r * r),
        erreurs: [{ valeur: (2 * q) / r, message: "$\\sin(2x)$ n'est pas $2\\sin x$ : utilise $\\sin(2x) = 2\\sin x\\cos x$." }, { valeur: (sgn * p * q) / (r * r), message: "Il manque le facteur $2$ : $\\sin(2x) = 2\\sin x\\cos x$." }, { valeur: (-2 * sgn * p * q) / (r * r), message: "Attention au signe de $\\cos x$." }],
        aides: ["Formule de duplication : $\\sin(2x) = 2\\sin x\\cos x$.", `$2 \\times \\dfrac{${q}}{${r}} \\times ${parT(frac(sgn * p, r))}$.`, `Le dénominateur est $${r}^2 = ${r * r}$.`],
        solution: `$\\sin(2x) = 2\\sin x\\cos x = 2 \\times \\dfrac{${q}}{${r}} \\times ${parT(frac(sgn * p, r))} = ${frac(2 * sgn * p * q, r * r)}$.` };
    }
    if (t === "sin2x") { // sin² x à partir de cos 2x
      const p = rand(1, 8), q = pick([9, 11, 13, 15, 17, 19, 25]), s = pick([1, -1]);
      return { enonce: `On sait que $\\cos(2x) = ${frac(s * p, q)}$. Calcule $\\sin^2 x$. Donne la valeur exacte (fraction).`, mode: "nombre", prefixe: "$\\sin^2 x =$", attendu: (1 - (s * p) / q) / 2,
        erreurs: [{ valeur: (1 + (s * p) / q) / 2, message: "Ça, c'est $\\cos^2 x = \\dfrac{1 + \\cos(2x)}{2}$. Pour $\\sin^2 x$, c'est $\\dfrac{1 - \\cos(2x)}{2}$." }, { valeur: 1 - (s * p) / q, message: "N'oublie pas de diviser par $2$." }, { valeur: +((1 - (s * p) / q) / 2).toFixed(2), message: "C'est une valeur approchée : donne la fraction." }],
        aides: ["$\\cos(2x) = 1 - 2\\sin^2 x$.", "Isole $\\sin^2 x$ : $\\sin^2 x = \\dfrac{1 - \\cos(2x)}{2}$.", `$1 - ${parT(frac(s * p, q))} = ${frac(q - s * p, q)}$.`],
        solution: `$\\cos(2x) = 1 - 2\\sin^2 x$, donc $\\sin^2 x = \\dfrac{1 - \\cos(2x)}{2} = \\dfrac{1}{2}\\left(1 - ${parT(frac(s * p, q))}\\right) = ${frac(q - s * p, 2 * q)}$.` };
    }
    if (t === "cos2sin") {
      let p, q; do { q = rand(3, 11); p = rand(1, q - 1); } while (pgcd(p, q) > 1);
      return { enonce: `On sait que $\\sin x = \\dfrac{${p}}{${q}}$. Calcule $\\cos(2x)$. Donne la valeur exacte (fraction).`, mode: "nombre", prefixe: "$\\cos(2x) =$", attendu: 1 - (2 * p * p) / (q * q),
        erreurs: [{ valeur: 2 * p / q, message: "$\\cos(2x)$ ne s'obtient pas en doublant : utilise $\\cos(2x) = 1 - 2\\sin^2 x$." }, { valeur: 1 - (p * p) / (q * q), message: "Il manque le facteur $2$ : $\\cos(2x) = 1 - 2\\sin^2 x$." }, { valeur: (2 * p * p) / (q * q) - 1, message: "Le signe est inversé : $\\cos(2x) = 1 - 2\\sin^2 x$." }],
        aides: ["Choisis la formule de duplication qui n'utilise que $\\sin x$.", "$\\cos(2x) = 1 - 2\\sin^2 x$.", `$\\sin^2 x = \\dfrac{${p * p}}{${q * q}}$.`],
        solution: `$\\cos(2x) = 1 - 2\\sin^2 x = 1 - 2 \\times \\dfrac{${p * p}}{${q * q}} = ${frac(q * q - 2 * p * p, q * q)}$.` };
    }
    let p, q; do { q = rand(3, 15); p = rand(1, q - 1); } while (pgcd(p, q) > 1); const s = pick([1, -1]);
    return { enonce: `On sait que $\\cos x = ${frac(s * p, q)}$. Calcule $\\cos(2x)$. Donne la valeur exacte (fraction).`, mode: "nombre", prefixe: "$\\cos(2x) =$", attendu: (2 * p * p) / (q * q) - 1,
      erreurs: [{ valeur: (2 * s * p) / q, message: "$\\cos(2x)$ n'est pas $2\\cos x$ : utilise $\\cos(2x) = 2\\cos^2 x - 1$." }, { valeur: (p * p) / (q * q) - 1, message: "Il manque le facteur $2$ : $\\cos(2x) = 2\\cos^2 x - 1$." }, { valeur: 1 - (2 * p * p) / (q * q), message: "Le signe est inversé : $\\cos(2x) = 2\\cos^2 x - 1$." }],
      aides: ["Choisis la formule de duplication qui n'utilise que $\\cos x$.", "$\\cos(2x) = 2\\cos^2 x - 1$.", `$\\cos^2 x = ${frac(p * p, q * q)}$ (un carré est positif).`],
      solution: `$\\cos(2x) = 2\\cos^2 x - 1 = 2 \\times ${frac(p * p, q * q)} - 1 = ${frac(2 * p * p - q * q, q * q)}$.` };
  });

  def("xt-expo-alg", () => {
    const Z = remarquable(Math.random() < 0.75), [p, q] = Z.ang;
    const bonne = `$${Z.tex}$`;
    const [re2, im2] = algExact(Z.r, angNorm([q - 2 * p, 2 * q]));
    const neg = (e) => EXA(-e.c, e.m, e.d);
    const ch = choix4(bonne, [`$${cxEx(re2, im2)}$`, `$${cxEx(neg(Z.re), Z.im)}$`, `$${cxEx(Z.re, neg(Z.im))}$`, `$${cxEx(neg(Z.re), neg(Z.im))}$`], () => `$${remarquable(false).tex}$`);
    return { enonce: `Quelle est la forme algébrique de $z = ${expoTex2(nb(Z.r), Z.ang)}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["$re^{i\\theta} = r(\\cos\\theta + i\\sin\\theta)$.", `$\\cos\\left(${angTex(p, q)}\\right) = ${cosT(Z.ang)}$ et $\\sin\\left(${angTex(p, q)}\\right) = ${sinT(Z.ang)}$.`, `Multiplie par $${nb(Z.r)}$.`],
      solution: `$z = ${nb(Z.r) === "1" ? "" : nb(Z.r)}\\left(\\cos\\left(${angTex(p, q)}\\right) + i\\sin\\left(${angTex(p, q)}\\right)\\right) = ${nb(Z.r) === "1" ? "" : nb(Z.r)}\\left(${cosT(Z.ang)} + i \\times ${parT(sinT(Z.ang))}\\right) = ${Z.tex}$.` };
  });

  def("xt-alg-expo", () => {
    const Z = remarquable(Math.random() < 0.8), [p, q] = Z.ang;
    const bonne = `$${expoTex2(nb(Z.r), Z.ang)}$`;
    const f = [expoTex2(nb(Z.r * Z.r), Z.ang), expoTex2(nb(Z.r), angNorm([-p, q])), expoTex2(nb(Z.r), angNorm([q - 2 * p, 2 * q])), expoTex2(nb(Z.r), angNorm([p + q, q])), expoTex2(nb(Z.r + 1), Z.ang)].map((x) => `$${x}$`);
    const ch = choix4(bonne, f);
    return { enonce: `Quelle est une forme exponentielle de $z = ${Z.tex}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Calcule le module $r = |z|$.", `$r = ${Z.r}$ ; cherche $\\theta$ avec $\\cos\\theta = ${cosT(Z.ang)}$ et $\\sin\\theta = ${sinT(Z.ang)}$.`, "Écris $z = re^{i\\theta}$."],
      solution: `$|z| = ${Z.r}$ et un argument est $${angTex(p, q)}$, donc $z = ${expoTex2(nb(Z.r), Z.ang)}$.` };
  });

  def("xt-calcul", () => {
    const t = pick(["prod", "prod", "quot", "puiss", "conj", "inv"]);
    const A1 = pick(ANGLES.filter((a) => a[0])), A2 = pick(ANGLES.filter((a) => a[0])), r1 = rand(1, 6), r2 = rand(1, 6);
    const z1 = expoTex2(nb(r1), A1), z2 = expoTex2(nb(r2), A2);
    let bonne, f, enonce, aides, sol;
    if (t === "prod") {
      const a = angAdd(A1, A2);
      bonne = expoTex2(nb(r1 * r2), a); f = [expoTex2(nb(r1 + r2), a), expoTex2(nb(r1 * r2), angNorm([A1[0] * A2[0] * 1, A1[1] * A2[1]])), expoTex2(nb(r1 * r2), angAdd(A1, [-A2[0], A2[1]])), expoTex2(nb(r1 + r2), angAdd(A1, [-A2[0], A2[1]]))];
      enonce = `On pose $z_1 = ${z1}$ et $z_2 = ${z2}$. Quelle est une forme exponentielle de $z_1 z_2$ ?`;
      aides = ["Relation fonctionnelle : $e^{i\\theta} \\times e^{i\\theta'} = e^{i(\\theta + \\theta')}$.", "On multiplie les modules et on **additionne** les arguments.", "Ramène l'argument dans $]-\\pi\\,;\\pi]$ si besoin, en ajoutant ou retirant $2\\pi$."];
      sol = `$z_1 z_2 = ${nb(r1)} \\times ${nb(r2)} \\times e^{i\\left(${angE(...A1)} + ${parT(angE(...A2))}\\right)} = ${bonne}$.`;
    } else if (t === "quot") {
      const a = angAdd(A1, [-A2[0], A2[1]]);
      bonne = expoTex2(frac(r1, r2), a); f = [expoTex2(frac(r1, r2), angAdd(A1, A2)), expoTex2(frac(r2, r1), a), expoTex2(nb(r1 - r2 || r1 * r2), a), expoTex2(frac(r2, r1), angAdd(A1, A2))];
      enonce = `On pose $z_1 = ${z1}$ et $z_2 = ${z2}$. Quelle est une forme exponentielle de $\\dfrac{z_1}{z_2}$ ?`;
      aides = ["$\\dfrac{e^{i\\theta}}{e^{i\\theta'}} = e^{i(\\theta - \\theta')}$.", "On divise les modules et on **soustrait** les arguments.", "Ramène l'argument dans $]-\\pi\\,;\\pi]$ si besoin."];
      sol = `$\\dfrac{z_1}{z_2} = \\dfrac{${nb(r1)}}{${nb(r2)}}e^{i\\left(${angE(...A1)} - ${parT(angE(...A2))}\\right)} = ${bonne}$.`;
    } else if (t === "puiss") {
      const n = rand(2, 6), a = angNorm([A1[0] * n, A1[1]]);
      bonne = expoTex2(nb(r1 ** n), a); f = [expoTex2(nb(n * r1), a), expoTex2(nb(r1 ** n), A1), expoTex2(nb(n * r1), angNorm([A1[0] * n, A1[1]]) && A1), expoTex2(nb(r1 ** n), angNorm([A1[0] + n * A1[1], A1[1]]))];
      enonce = `On pose $z = ${z1}$. Quelle est une forme exponentielle de $z^{${n}}$ ?`;
      aides = ["$\\left(re^{i\\theta}\\right)^n = r^n e^{in\\theta}$ (formule de Moivre).", `Le module est $${nb(r1)}^{${n}}$ et l'argument $${n} \\times ${parT(angTex(...A1))}$.`, "Ramène l'argument dans $]-\\pi\\,;\\pi]$ en retirant des multiples de $2\\pi$."];
      sol = `$z^{${n}} = ${nb(r1)}^{${n}}e^{i \\times ${n} \\times ${parT(angTex(...A1))}} = ${nb(r1 ** n)}e^{i${parT(angE(A1[0] * n, A1[1]))}} = ${bonne}$.`;
    } else if (t === "conj") {
      const a = angNorm([-A1[0], A1[1]]);
      bonne = expoTex2(nb(r1), a); f = [expoTex2(nb(r1), A1), expoTex2(nb(r1), angAdd(A1, [1, 1])), expoTex2(nb(r1), angAdd(a, [1, 1])), expoTex2(nb(r1 + 1), a)];
      enonce = `On pose $z = ${z1}$. Quelle est une forme exponentielle de $\\overline{z}$ ?`;
      aides = ["Un nombre et son conjugué ont le même module.", "Leurs arguments sont opposés.", "$\\overline{re^{i\\theta}} = re^{-i\\theta}$."];
      sol = `$\\overline{z} = ${expoTex2(nb(r1), a)}$ : même module, argument opposé.`;
    } else {
      const a = angNorm([-A1[0], A1[1]]);
      bonne = expoTex2(frac(1, r1), a); f = [expoTex2(frac(1, r1), A1), expoTex2(nb(r1), a), "-" + expoTex2(nb(r1), A1), expoTex2(frac(1, r1 + 1), a)];
      enonce = `On pose $z = ${z1}$. Quelle est une forme exponentielle de $\\dfrac{1}{z}$ ?`;
      aides = ["$\\dfrac{1}{e^{i\\theta}} = e^{-i\\theta}$.", "Le module de l'inverse est l'inverse du module.", "L'argument de l'inverse est l'opposé de l'argument."];
      sol = `$\\dfrac{1}{z} = ${r1 === 1 ? "" : `\\dfrac{1}{${nb(r1)}}`}e^{${a[0] ? `i${parT(angTex(...a))}` : "0"}} = ${bonne}$.`;
    }
    const ch = choix4(`$${bonne}$`, f.map((x) => `$${x}$`), () => `$${expoTex2(nb(rand(1, 9)), pick(ANGLES))}$`);
    return { enonce, mode: "choix", choix: ch.choix, attendu: ch.attendu, aides, solution: sol };
  });

  def("xt-moivre", () => {
    const t = pick(["entier", "entier", "racine3", "module"]);
    if (t === "entier" || t === "module") {
      const B = pick([[1, 1], [1, -1], [-1, 1], [-1, -1]]), n = rand(3, 12), v = cPow(B, n);
      const ang = angNorm([({ "1,1": 1, "1,-1": -1, "-1,1": 3, "-1,-1": -3 })[B.join(",")], 4]);
      if (t === "module") return { enonce: n % 2 ? `Le module de $(${cx(...B)})^{${n}}$ s'écrit $a\\sqrt{2}$ avec $a$ entier. Que vaut $a$ ?` : `Calcule le module de $(${cx(...B)})^{${n}}$.`, mode: "nombre", prefixe: n % 2 ? "$a =$" : "Module :", attendu: n % 2 ? 2 ** ((n - 1) / 2) : 2 ** (n / 2),
        erreurs: [{ valeur: n % 2 ? 2 ** ((n + 1) / 2) : 2 * n, message: n % 2 ? "Vérifie l'exposant : $(\\sqrt{2})^n$." : "Le module d'une puissance est la puissance du module : $(\\sqrt{2})^{" + n + "}$." }, { valeur: n % 2 ? n : 2 ** n, message: "$|1 + i| = \\sqrt{2}$, pas $2$ : le module est $(\\sqrt{2})^{" + n + "}$." }],
        aides: [`$|${cx(...B)}| = \\sqrt{2}$.`, `$|(${cx(...B)})^{${n}}| = (\\sqrt{2})^{${n}}$.`, "$(\\sqrt{2})^2 = 2$ : regroupe les facteurs deux par deux."],
        solution: `$|(${cx(...B)})^{${n}}| = |${cx(...B)}|^{${n}} = (\\sqrt{2})^{${n}} = ${n % 2 ? `2^{${(n - 1) / 2}}\\sqrt{2} = ${nb(2 ** ((n - 1) / 2))}\\sqrt{2}` : `2^{${n / 2}} = ${nb(2 ** (n / 2))}`}$.` };
      const bonne = `$${cx(...v)}$`;
      const ch = choix4(bonne, [`$${cx(-v[0], -v[1])}$`, `$${cx(v[0], -v[1])}$`, `$${cx(v[1], v[0])}$`, `$${nb(2 ** n)}$`, `$${cx(2 * v[0] || 2, v[1])}$`], (k) => `$${cx(v[0] + 2 * (k + 1), v[1])}$`);
      return { enonce: `Quelle est la forme algébrique de $(${cx(...B)})^{${n}}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`Écris d'abord $${cx(...B)}$ sous forme exponentielle : $${expoTex2("\\sqrt{2}", ang)}$.`, `Formule de Moivre : $(${cx(...B)})^{${n}} = (\\sqrt{2})^{${n}}e^{i \\times ${n} \\times ${parT(angTex(...ang))}}$.`, "Ramène l'argument dans $]-\\pi\\,;\\pi]$, puis repasse en forme algébrique."],
        solution: `$${cx(...B)} = ${expoTex2("\\sqrt{2}", ang)}$, donc $(${cx(...B)})^{${n}} = (\\sqrt{2})^{${n}}e^{i${parT(angE(ang[0] * n, 4))}} = ${n % 2 ? `${nb(2 ** ((n - 1) / 2))}\\sqrt{2}` : nb(2 ** (n / 2))}${expoTex2("", angNorm([ang[0] * n, 4])) || ""}$.\n\nEn forme algébrique : $(${cx(...B)})^{${n}} = ${cx(...v)}$.` };
    }
    // (±√3 ± i)^n ou (1 ± i√3)^n : module 2, argument multiple de π/6
    const base = pick([[1, 6], [-1, 6], [5, 6], [-5, 6], [1, 3], [-1, 3], [2, 3], [-2, 3]]), n = rand(2, 8);
    const [bre, bim] = algExact(2, base), a = angNorm([base[0] * n, base[1]]);
    const [re, im] = algExact(2 ** n, a);
    const bonne = `$${cxEx(re, im)}$`;
    const neg = (e) => EXA(-e.c, e.m, e.d);
    const [re2, im2] = algExact(2 ** n, angNorm([a[1] - 2 * a[0], 2 * a[1]]));
    const ch = choix4(bonne, [`$${cxEx(neg(re), im)}$`, `$${cxEx(re, neg(im))}$`, `$${cxEx(re2, im2)}$`, `$${cxEx(neg(re), neg(im))}$`, `$${cxEx(...algExact(2 * n, a))}$`], () => `$${cxEx(...algExact(2 ** n, pick(ANGLES)))}$`);
    return { enonce: `Quelle est la forme algébrique de $\\left(${cxEx(bre, bim)}\\right)^{${n}}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`Le module de $${cxEx(bre, bim)}$ est $2$ et un argument est $${angTex(...base)}$.`, `Formule de Moivre : le module de la puissance est $2^{${n}} = ${2 ** n}$ et un argument $${n} \\times ${parT(angTex(...base))} = ${angTex(base[0] * n, base[1])}$.`, `Ramène l'argument dans $]-\\pi\\,;\\pi]$ : $${angTex(...a)}$.`],
      solution: `$${cxEx(bre, bim)} = ${expoTex2("2", base)}$, donc $\\left(${cxEx(bre, bim)}\\right)^{${n}} = 2^{${n}}e^{i${parT(angE(base[0] * n, base[1]))}} = ${expoTex2(nb(2 ** n), a)}$.\n\nForme algébrique : $${nb(2 ** n)}\\left(${cosT(a)} + i \\times ${parT(sinT(a))}\\right) = ${cxEx(re, im)}$.` };
  });

  def("xt-euler", () => {
    const k = rand(1, 6), a = pick([1, 1, 2, 3, 4, 6, 8]), t = pick(["cos2", "sin2", "cossin", "cos3", "sin3"]);
    const kx = k === 1 ? "x" : `${k}x`, k2 = `${2 * k}x`, A = a === 1 ? "" : nb(a);
    let bonne, f, enonce, sol;
    const h = (c) => (c === 1 ? "" : frac(c, 1));
    if (t === "cos2") { enonce = `${A}\\cos^2(${kx})`; bonne = `${frac(a, 2)} + ${a === 2 ? "" : frac(a, 2)}\\cos(${k2})`; f = [`${frac(a, 2)} - ${a === 2 ? "" : frac(a, 2)}\\cos(${k2})`, `${A}\\cos(${k2})`, `${frac(a, 2)} + ${a === 2 ? "" : frac(a, 2)}\\cos(${kx})`, `${frac(a, 2)}\\cos(${k2})`]; sol = `$\\cos^2\\theta = \\left(\\dfrac{e^{i\\theta} + e^{-i\\theta}}{2}\\right)^2 = \\dfrac{e^{2i\\theta} + 2 + e^{-2i\\theta}}{4} = \\dfrac{1 + \\cos(2\\theta)}{2}$.`; }
    else if (t === "sin2") { enonce = `${A}\\sin^2(${kx})`; bonne = `${frac(a, 2)} - ${a === 2 ? "" : frac(a, 2)}\\cos(${k2})`; f = [`${frac(a, 2)} + ${a === 2 ? "" : frac(a, 2)}\\cos(${k2})`, `${A}\\sin(${k2})`, `${frac(a, 2)} - ${a === 2 ? "" : frac(a, 2)}\\sin(${k2})`, `-${frac(a, 2)}\\cos(${k2})`]; sol = `$\\sin^2\\theta = \\left(\\dfrac{e^{i\\theta} - e^{-i\\theta}}{2i}\\right)^2 = \\dfrac{e^{2i\\theta} - 2 + e^{-2i\\theta}}{-4} = \\dfrac{1 - \\cos(2\\theta)}{2}$.`; }
    else if (t === "cossin") { enonce = `${A}\\cos(${kx})\\sin(${kx})`; bonne = `${a === 2 ? "" : frac(a, 2)}\\sin(${k2})`; f = [`${A || ""}\\sin(${k2})`.replace(/^\\/, "\\"), `${a === 2 ? "" : frac(a, 2)}\\cos(${k2})`, `${2 * a === 1 ? "" : nb(2 * a)}\\sin(${k2})`, `${frac(a, 2)} + ${a === 2 ? "" : frac(a, 2)}\\sin(${k2})`]; sol = "$\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$ (formule de duplication), donc $\\cos\\theta\\sin\\theta = \\dfrac{1}{2}\\sin(2\\theta)$."; }
    else if (t === "cos3") { enonce = `${A}\\cos^3(${kx})`; const k3 = `${3 * k}x`; bonne = `${frac(3 * a, 4)}\\cos(${kx}) + ${a === 4 ? "" : frac(a, 4)}\\cos(${k3})`; f = [`${frac(a, 4)}\\cos(${kx}) + ${frac(3 * a, 4)}\\cos(${k3})`, `${frac(3 * a, 4)}\\cos(${kx}) - ${a === 4 ? "" : frac(a, 4)}\\cos(${k3})`, `${A || ""}\\cos(${k3})`.replace(/^$/, "\\cos(" + k3 + ")"), `${frac(a, 2)} + ${a === 2 ? "" : frac(a, 2)}\\cos(${k3})`]; sol = `$\\cos^3\\theta = \\dfrac{(e^{i\\theta} + e^{-i\\theta})^3}{8} = \\dfrac{e^{3i\\theta} + 3e^{i\\theta} + 3e^{-i\\theta} + e^{-3i\\theta}}{8} = \\dfrac{2\\cos(3\\theta) + 6\\cos\\theta}{8} = \\dfrac{3}{4}\\cos\\theta + \\dfrac{1}{4}\\cos(3\\theta)$.`; }
    else { enonce = `${A}\\sin^3(${kx})`; const k3 = `${3 * k}x`; bonne = `${frac(3 * a, 4)}\\sin(${kx}) - ${a === 4 ? "" : frac(a, 4)}\\sin(${k3})`; f = [`${frac(3 * a, 4)}\\sin(${kx}) + ${a === 4 ? "" : frac(a, 4)}\\sin(${k3})`, `${frac(a, 4)}\\sin(${kx}) - ${frac(3 * a, 4)}\\sin(${k3})`, `${A || ""}\\sin(${k3})`, `${frac(3 * a, 4)}\\cos(${kx}) - ${a === 4 ? "" : frac(a, 4)}\\cos(${k3})`]; sol = `$\\sin^3\\theta = \\dfrac{(e^{i\\theta} - e^{-i\\theta})^3}{(2i)^3} = \\dfrac{e^{3i\\theta} - 3e^{i\\theta} + 3e^{-i\\theta} - e^{-3i\\theta}}{-8i} = \\dfrac{2i\\sin(3\\theta) - 6i\\sin\\theta}{-8i} = \\dfrac{3}{4}\\sin\\theta - \\dfrac{1}{4}\\sin(3\\theta)$.`; }
    const ch = choix4(`$${bonne}$`, f.map((x) => `$${x}$`), (j) => `$${frac(a * (j + 3), 4)}\\cos(${k2})$`);
    return { enonce: `Quelle est la forme linéarisée de $${enonce}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Formules d'Euler : $\\cos\\theta = \\dfrac{e^{i\\theta} + e^{-i\\theta}}{2}$ et $\\sin\\theta = \\dfrac{e^{i\\theta} - e^{-i\\theta}}{2i}$.", "Développe la puissance (binôme), puis regroupe $e^{ik\\theta}$ avec $e^{-ik\\theta}$.", `Applique le résultat avec $\\theta = ${kx}$${a > 1 ? `, puis multiplie par $${nb(a)}$` : ""}.`],
      solution: `${sol}\n\nAvec $\\theta = ${kx}$${a > 1 ? ` et le facteur $${nb(a)}$` : ""} : $${enonce} = ${bonne}$.` };
  });

  def("xt-vrai-faux", () => vraiFaux4([
    ["Pour tous réels $\\theta$ et $\\theta'$, $e^{i\\theta}e^{i\\theta'} = e^{i(\\theta + \\theta')}$.", true, "c'est la relation fonctionnelle, qui découle des formules d'addition."],
    ["$e^{i\\pi} + 1 = 0$.", true, "$e^{i\\pi} = \\cos\\pi + i\\sin\\pi = -1$ (identité d'Euler)."],
    ["$\\overline{e^{i\\theta}} = e^{-i\\theta}$ pour tout réel $\\theta$.", true, "$\\overline{\\cos\\theta + i\\sin\\theta} = \\cos\\theta - i\\sin\\theta = \\cos(-\\theta) + i\\sin(-\\theta)$."],
    ["$|e^{i\\theta}| = 1$ pour tout réel $\\theta$.", true, "$\\cos^2\\theta + \\sin^2\\theta = 1$."],
    ["$\\cos(2x) = 2\\cos^2 x - 1$ pour tout réel $x$.", true, "c'est une formule de duplication."],
    ["$e^{2i\\pi} = 1$.", true, "$\\cos(2\\pi) + i\\sin(2\\pi) = 1$."],
    ["$(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)$ pour tout entier naturel $n$.", true, "c'est la formule de Moivre, $(e^{i\\theta})^n = e^{in\\theta}$."],
    ["$\\cos\\theta = \\dfrac{e^{i\\theta} + e^{-i\\theta}}{2}$ pour tout réel $\\theta$.", true, "c'est une formule d'Euler."],
    ["$\\cos(a + b) = \\cos a + \\cos b$ pour tous réels $a$ et $b$.", false, "contre-exemple : $\\cos(0 + 0) = 1$ alors que $\\cos 0 + \\cos 0 = 2$."],
    ["$\\sin(2x) = 2\\sin x$ pour tout réel $x$.", false, "$\\sin(2x) = 2\\sin x\\cos x$ ; par exemple $\\sin\\left(2 \\times \\dfrac{\\pi}{2}\\right) = 0 \\neq 2$."],
    ["$e^{i\\frac{\\pi}{2}} = 1$.", false, "$e^{i\\frac{\\pi}{2}} = \\cos\\dfrac{\\pi}{2} + i\\sin\\dfrac{\\pi}{2} = i$."],
    ["$-3e^{i\\frac{\\pi}{4}}$ est une forme exponentielle de module $-3$.", false, "un module est positif : $-3e^{i\\frac{\\pi}{4}} = 3e^{i\\frac{5\\pi}{4}} = 3e^{-i\\frac{3\\pi}{4}}$."],
    ["$e^{i\\theta} + e^{i\\theta'} = e^{i(\\theta + \\theta')}$ pour tous réels $\\theta$ et $\\theta'$.", false, "c'est le **produit** qui donne $e^{i(\\theta + \\theta')}$, pas la somme."],
    ["$\\sin\\theta = \\dfrac{e^{i\\theta} - e^{-i\\theta}}{2}$ pour tout réel $\\theta$.", false, "il faut diviser par $2i$ : $\\sin\\theta = \\dfrac{e^{i\\theta} - e^{-i\\theta}}{2i}$."],
    ["Un argument de $\\left(e^{i\\frac{\\pi}{3}}\\right)^3$ est $\\dfrac{\\pi}{9}$.", false, "Moivre multiplie l'argument : $3 \\times \\dfrac{\\pi}{3} = \\pi$."],
    ["$\\cos^2 x = \\dfrac{1 - \\cos(2x)}{2}$ pour tout réel $x$.", false, "c'est $\\sin^2 x$ ; $\\cos^2 x = \\dfrac{1 + \\cos(2x)}{2}$."]
  ], ["Teste avec $\\theta = 0$ ou $\\theta = \\dfrac{\\pi}{2}$.", "Rappelle-toi : $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$.", "Un seul contre-exemple suffit à montrer qu'une affirmation « pour tout » est fausse."]));

  /* Figures du cours (chapitre 3) */
  FIGURES["xt-cours-addition"] = () => {
    const a = 1.1, b = 0.45;
    return planC({ xmin: -1.5, xmax: 1.5, ymin: -0.6, ymax: 1.5, xstep: 0.5, ystep: 0.5, xetiq: 1, yetiq: 1, cercles: [{ x: 0, y: 0, r: 1, pointille: true }],
      fleches: [{ x1: 0, y1: 0, x2: Math.cos(a), y2: Math.sin(a), label: "", c: 0 }, { x1: 0, y1: 0, x2: Math.cos(b), y2: Math.sin(b), label: "", c: 1 }],
      points: [ptC(Math.cos(a), Math.sin(a), "A(cos a ; sin a)", { gauche: true }), ptC(Math.cos(b), Math.sin(b), "B(cos b ; sin b)")],
      arcs: [{ a1: b, a2: a, r: 0.42, label: "a − b", dl: 0.2 }],
      aria: "Deux vecteurs unitaires OA et OB d'angles a et b : l'angle entre eux vaut a − b" });
  };
  FIGURES["xt-cours-produit"] = () => {
    const t1 = Math.PI / 6, t2 = Math.PI / 4;
    return planC({ xmin: -1.2, xmax: 2.6, ymin: -0.5, ymax: 2.6, xstep: 0.5, ystep: 0.5, xetiq: 1, yetiq: 1,
      points: [ptC(1.2 * Math.cos(t1), 1.2 * Math.sin(t1), "z"), ptC(1.5 * Math.cos(t2), 1.5 * Math.sin(t2), "z'"), ptC(1.8 * Math.cos(t1 + t2), 1.8 * Math.sin(t1 + t2), "zz'", { gauche: true })],
      segs: [[0, 0, 1.2 * Math.cos(t1), 1.2 * Math.sin(t1), true], [0, 0, 1.5 * Math.cos(t2), 1.5 * Math.sin(t2), true], [0, 0, 1.8 * Math.cos(t1 + t2), 1.8 * Math.sin(t1 + t2)]],
      arcs: [{ a1: 0, a2: t1 + t2, r: 0.5, label: "θ + θ'", dl: 0.35 }],
      aria: "Multiplier deux complexes : les modules se multiplient (1,2 × 1,5 = 1,8) et les arguments s'ajoutent" });
  };


  /* ---------- Chapitre 4 : équations polynomiales (préfixe xp) ---------- */
  const ens = (L) => `S = \\left\\{${L.join("\\,;")}\\right\\}`; // ensemble de solutions
  const imSqrt = (p, m, s) => { // p + s i√m (m > 0 non carré)
    const it = `i\\sqrt{${m}}`;
    return p ? `${nb(p)} ${s < 0 ? "-" : "+"} ${it}` : `${s < 0 ? "-" : ""}${it}`;
  };
  // Racines conjuguées p ± qi (q entier) ou p ± i√m : { tex: [z1, z2], b, c } pour z² + bz + c
  const racinesConj = () => {
    const p = rand(-5, 5);
    if (Math.random() < 0.7) { const q = rand(1, 6); return { p, q, m: q * q, tex: [cx(p, -q), cx(p, q)], b: -2 * p, c: p * p + q * q }; }
    const m = pick([2, 3, 5, 6, 7, 10, 11, 13]); return { p, m, tex: [imSqrt(p, m, -1), imSqrt(p, m, 1)], b: -2 * p, c: p * p + m };
  };

  def("xp-delta", () => {
    const a = pick([1, 1, 1, 2, -1, 3]), b = rand(-8, 8), c = rand(-9, 9), D = b * b - 4 * a * c;
    const eq = `${poly([a, b, c])} = 0`;
    if (Math.random() < 0.55) return { enonce: `Calcule le discriminant de l'équation $${eq}$.`, mode: "nombre", prefixe: "$\\Delta =$", attendu: D,
      erreurs: [{ valeur: b * b + 4 * a * c, message: "$\\Delta = b^2 - 4ac$ : attention au signe." }, { valeur: -b * b - 4 * a * c, message: `$b^2 = ${pr(b)}^2 = ${b * b}$ est positif.` }, { valeur: b - 4 * a * c, message: "Il faut élever $b$ au carré." }],
      aides: ["$\\Delta = b^2 - 4ac$.", `Ici $a = ${nb(a)}$, $b = ${nb(b)}$ et $c = ${nb(c)}$.`, `$b^2 = ${b * b}$ et $4ac = ${4 * a * c}$.`],
      solution: `$\\Delta = ${pr(b)}^2 - 4 \\times ${pr(a)} \\times ${pr(c)} = ${b * b} ${plus(-4 * a * c)} = ${nb(D)}$.` };
    const nat = D > 0 ? 0 : D === 0 ? 1 : 2;
    const L = ["Deux solutions réelles distinctes", "Une seule solution, réelle (double)", "Deux solutions complexes conjuguées non réelles", "Aucune solution dans $\\mathbb{C}$"];
    const ch = choix4(L[nat], L.filter((_, k) => k !== nat));
    return { enonce: `Combien l'équation $${eq}$ a-t-elle de solutions dans $\\mathbb{C}$, et de quelle nature ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Calcule le discriminant $\\Delta = b^2 - 4ac$.", `$\\Delta = ${nb(D)}$.`, "Si $\\Delta < 0$, il y a deux solutions complexes conjuguées : dans $\\mathbb{C}$, une équation du second degré a toujours des solutions."],
      solution: `$\\Delta = ${pr(b)}^2 - 4 \\times ${pr(a)} \\times ${pr(c)} = ${nb(D)}$${D > 0 ? " > 0" : D < 0 ? " < 0" : ""}.\n\n${["Deux solutions réelles distinctes.", "Une solution réelle double $-\\dfrac{b}{2a}$.", "Deux solutions complexes conjuguées $\\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a}$."][nat]}` };
  });

  def("xp-second-degre", () => {
    const R = racinesConj(), k = pick([1, 1, 1, 2, 3]);
    const eq = `${poly([k, k * R.b, k * R.c])} = 0`, D = k * k * (R.b * R.b - 4 * R.c);
    const bonne = `$${ens(R.tex)}$`;
    const f = [
      R.q ? ens([cx(-R.p, -R.q), cx(-R.p, R.q)]) : ens([imSqrt(-R.p, R.m, -1), imSqrt(-R.p, R.m, 1)]),
      R.q ? ens([cx(R.p, -R.q * R.q), cx(R.p, R.q * R.q)]) : ens([cx(R.p, -R.m), cx(R.p, R.m)]),
      R.q ? ens([cx(R.p, -2 * R.q), cx(R.p, 2 * R.q)]) : ens([imSqrt(R.p, 4 * R.m, -1), imSqrt(R.p, 4 * R.m, 1)]),
      R.q ? ens([nb(R.p - R.q), nb(R.p + R.q)]) : ens([`${nb(R.p)} - \\sqrt{${R.m}}`, `${nb(R.p)} + \\sqrt{${R.m}}`]),
      "$S = \\varnothing$"
    ].map((x) => (x.startsWith("$") ? x : `$${x}$`));
    const ch = choix4(bonne, f);
    const rac = Math.sqrt(-D), racTex = Number.isInteger(rac) ? nb(rac) : sqrtTex(-D);
    return { enonce: `Résous dans $\\mathbb{C}$ l'équation $${eq}$.`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Calcule le discriminant $\\Delta = b^2 - 4ac$.", `$\\Delta = ${nb(D)} < 0$ : les solutions sont $\\dfrac{-b - i\\sqrt{-\\Delta}}{2a}$ et $\\dfrac{-b + i\\sqrt{-\\Delta}}{2a}$.`, `$\\sqrt{-\\Delta} = \\sqrt{${-D}} = ${racTex}$.`],
      solution: `$\\Delta = ${pr(k * R.b)}^2 - 4 \\times ${pr(k)} \\times ${pr(k * R.c)} = ${nb(D)} < 0$.\n\nLes solutions sont $z_1 = \\dfrac{${R.b ? nb(-k * R.b) + " " : ""}- ${Number.isInteger(rac) ? nb(rac) + "i" : `i\\sqrt{${-D}}`}}{${2 * k}}$ et $z_2 = \\overline{z_1}$, d'où $${ens(R.tex)}$.` };
  });

  def("xp-somme-produit", () => {
    const t = pick(["somme", "produit", "produit", "equation"]);
    if (t === "equation") {
      const R = racinesConj();
      const bonne = `$${poly([1, R.b, R.c])} = 0$`;
      const f = [poly([1, -R.b, R.c]), poly([1, R.b, -R.c]), poly([1, R.b, R.p * R.p - R.m]), poly([1, R.b, R.c + 2])].map((x) => `$${x} = 0$`);
      const ch = choix4(bonne, f);
      return { enonce: `Quelle équation a pour solutions $${R.tex[0]}$ et $${R.tex[1]}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Une équation $z^2 - Sz + P = 0$ a pour solutions deux nombres de somme $S$ et de produit $P$.", `Somme : $(${R.tex[0]}) + (${R.tex[1]}) = ${nb(-R.b)}$.`, `Produit : $z\\overline{z} = ${nb(R.p)}^2 + ${R.q ? nb(R.q) + "^2" : R.m} = ${nb(R.c)}$.`],
        solution: `$S = z_1 + z_2 = ${nb(-R.b)}$ et $P = z_1z_2 = |z_1|^2 = ${nb(R.c)}$.\n\nL'équation $z^2 - Sz + P = 0$ s'écrit $${poly([1, R.b, R.c])} = 0$.` };
    }
    const a = pick([1, 1, 2, 3, -1]), b = rand(-9, 9), c = rand(-9, 9) || 4;
    const att = t === "somme" ? -b / a : c / a;
    const fr2 = !Number.isInteger(att);
    return { enonce: `On note $z_1$ et $z_2$ les deux solutions (éventuellement égales) de $${poly([a, b, c])} = 0$ dans $\\mathbb{C}$. Sans les calculer, donne ${t === "somme" ? "$z_1 + z_2$" : "$z_1 z_2$"}${fr2 ? " (fraction)" : ""}.`,
      mode: "nombre", prefixe: t === "somme" ? "$z_1 + z_2 =$" : "$z_1 z_2 =$", attendu: att,
      erreurs: t === "somme" ? [{ valeur: b / a, message: "Attention au signe : $z_1 + z_2 = -\\dfrac{b}{a}$." }, { valeur: c / a, message: "Ça, c'est le produit $\\dfrac{c}{a}$." }] : [{ valeur: -c / a, message: "Le produit vaut $\\dfrac{c}{a}$, sans changer de signe." }, { valeur: -b / a, message: "Ça, c'est la somme $-\\dfrac{b}{a}$." }],
      aides: ["En factorisant, $az^2 + bz + c = a(z - z_1)(z - z_2) = az^2 - a(z_1 + z_2)z + az_1z_2$.", "On identifie les coefficients : $z_1 + z_2 = -\\dfrac{b}{a}$ et $z_1z_2 = \\dfrac{c}{a}$.", `Ici $a = ${nb(a)}$, $b = ${nb(b)}$, $c = ${nb(c)}$.`],
      solution: t === "somme" ? `$z_1 + z_2 = -\\dfrac{b}{a} = -\\dfrac{${nb(b)}}{${nb(a)}} = ${frac(-b, a)}$.` : `$z_1 z_2 = \\dfrac{c}{a} = \\dfrac{${nb(c)}}{${nb(a)}} = ${frac(c, a)}$.` };
  });

  // P(z) = (z - r)(z² + βz + γ)
  const cubique = () => { const r = pick([-3, -2, -1, 1, 2, 3]), R = racinesConj(); const be = R.b, ga = R.c; return { r, R, be, ga, P: [1, be - r, ga - r * be, -r * ga] }; };
  const evalP = (P, x) => P.reduce((s, c) => s * x + c, 0);

  def("xp-racine", () => {
    const K = cubique(), t = pick(["reel", "reel", "complexe"]);
    if (t === "reel") {
      const cands = [K.r, -K.r, 2 * K.r, K.r + 1, K.r - 1, 0].filter((x, i, A) => A.indexOf(x) === i && evalP(K.P, x) !== 0);
      const ch = choix4(`$${nb(K.r)}$`, cands.map((x) => `$${nb(x)}$`));
      return { enonce: `Lequel de ces nombres est une racine du polynôme $P(z) = ${poly(K.P)}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["$a$ est racine de $P$ quand $P(a) = 0$.", "Calcule $P(a)$ pour chaque proposition.", `Essaie $z = ${nb(K.r)}$.`],
        solution: `$P(${nb(K.r)}) = ${nb(K.r ** 3)} ${pt(K.P[1] * K.r * K.r, "")} ${pt(K.P[2] * K.r, "")} ${pt(K.P[3], "")} = 0$, donc $${nb(K.r)}$ est une racine. Les autres propositions ne donnent pas $0$.` };
    }
    // racine imaginaire pure : P(z) = (z² + m)(z - r) a pour racines ±i√m
    const q = rand(1, 4), r = pick([-4, -3, -2, -1, 1, 2, 3, 4]), P = [1, -r, q * q, -r * q * q];
    const bonne = `$${cx(0, q)}$`;
    const ch = choix4(bonne, [`$${nb(q)}$`, `$${nb(-q)}$`, `$${cx(q, q)}$`, `$${nb(q * q)}$`, `$${cx(0, q * q)}$`]);
    const zq = cPow([0, q], 3), zq2 = cPow([0, q], 2);
    return { enonce: `Lequel de ces nombres est une racine du polynôme $P(z) = ${poly(P)}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["$a$ est racine de $P$ quand $P(a) = 0$.", `Pour $z = ${cx(0, q)}$ : $z^2 = ${nb(zq2[0])}$ et $z^3 = ${cx(...zq)}$.`, "Calcule $P(z)$ en regroupant parties réelles et imaginaires."],
      solution: `$P(${cx(0, q)}) = ${cx(...zq)} ${pt(r * q * q, "")} ${pt(q ** 3, "i")} ${pt(-r * q * q, "")} = 0$.\n\nEn effet $P(z) = (z^2 + ${q * q})(z ${plus(-r)})$, et $(${cx(0, q)})^2 = ${nb(-q * q)}$.` };
  });

  def("xp-factoriser", () => {
    const K = cubique(), quoi = pick(["b", "c"]), att = quoi === "b" ? K.be : K.ga;
    return { enonce: `On sait que $${nb(K.r)}$ est une racine de $P(z) = ${poly(K.P)}$. On écrit $P(z) = (z ${plus(-K.r)})(z^2 + bz + c)$. Que vaut $${quoi}$ ?`,
      mode: "nombre", prefixe: `$${quoi} =$`, attendu: att,
      erreurs: quoi === "b" ? [{ valeur: K.P[1], message: `En développant, le coefficient de $z^2$ est $b ${plus(-K.r)}$ : il faut retirer $${pr(-K.r)}$.` }, { valeur: K.P[1] - K.r, message: "Attention au signe en identifiant les coefficients." }] : [{ valeur: K.P[3] / K.r, message: `Le terme constant vaut $${pr(-K.r)} \\times c$ : divise par $${nb(-K.r)}$, en gardant le signe.` }, { valeur: K.P[2], message: "Il faut tenir compte du terme $-rbz$ dans le coefficient de $z$." }],
      aides: [`Développe $(z ${plus(-K.r)})(z^2 + bz + c) = z^3 + (b ${plus(-K.r)})z^2 + (c ${pt(-K.r, "b")})z ${pt(-K.r, "c")}$.`, "Identifie avec les coefficients de $P$ (deux polynômes égaux ont les mêmes coefficients).", quoi === "b" ? `$b ${plus(-K.r)} = ${nb(K.P[1])}$.` : `Le terme constant donne $${coef(-K.r, "c")} =${nb(K.P[3])}$.`],
      solution: `En développant : $z^3 + (b ${plus(-K.r)})z^2 + (c ${K.r < 0 ? "+" : "-"} ${Math.abs(K.r) === 1 ? "" : nb(Math.abs(K.r))}b)z ${K.r < 0 ? "+" : "-"} ${Math.abs(K.r) === 1 ? "" : nb(Math.abs(K.r))}c$.\n\nOn identifie : $b ${plus(-K.r)} = ${nb(K.P[1])}$ donne $b = ${nb(K.be)}$, et $${coef(-K.r, "c")} = ${nb(K.P[3])}$ donne $c = ${nb(K.ga)}$.\n\n$P(z) = (z ${plus(-K.r)})(${poly([1, K.be, K.ga])})$.` };
  });

  def("xp-degre3", () => {
    const K = cubique();
    const bonne = `$${ens([nb(K.r), ...K.R.tex])}$`;
    const R = K.R;
    const conjFaux = R.q ? [cx(-R.p, -R.q), cx(-R.p, R.q)] : [imSqrt(-R.p, R.m, -1), imSqrt(-R.p, R.m, 1)];
    const f = [ens([nb(-K.r), ...R.tex]), ens([nb(K.r), ...conjFaux]), ens(R.tex), ens([nb(-K.r), ...conjFaux]), ens([nb(K.r)])].map((x) => `$${x}$`);
    const ch = choix4(bonne, f);
    const D = R.b * R.b - 4 * R.c;
    return { enonce: `Le polynôme $P(z) = ${poly(K.P)}$ vérifie $P(z) = (z ${plus(-K.r)})(${poly([1, R.b, R.c])})$. Résous dans $\\mathbb{C}$ l'équation $P(z) = 0$.`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Un produit est nul si et seulement si l'un de ses facteurs est nul.", `$z ${plus(-K.r)} = 0$ donne $z = ${nb(K.r)}$.`, `Pour $${poly([1, R.b, R.c])} = 0$ : $\\Delta = ${D} < 0$.`],
      solution: `$z ${plus(-K.r)} = 0$ donne $z = ${nb(K.r)}$.\n\nPour $${poly([1, R.b, R.c])} = 0$ : $\\Delta = ${pr(R.b)}^2 - 4 \\times ${R.c} = ${D} < 0$, d'où deux solutions conjuguées $${R.tex[0]}$ et $${R.tex[1]}$.\n\n$${ens([nb(K.r), ...R.tex])}$` };
  });

  def("xp-zn-an", () => {
    if (Math.random() < 0.3) { // résoudre z³ = a³
      const a = pick([-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8]), A = Math.abs(a);
      const re = EXA(-a, 1, 2), im = EXA(A, 3, 2), imN = EXA(-A, 3, 2);
      const bonne = `$${ens([nb(a), cxEx(re, imN), cxEx(re, im)])}$`;
      const f = [ens([nb(a)]), ens([nb(a), cxEx(EXA(a, 1, 2), imN), cxEx(EXA(a, 1, 2), im)]), ens([nb(a), cxEx(EXA(-a), EXA(-A, 3)), cxEx(EXA(-a), EXA(A, 3))]), ens([nb(-a), cxEx(re, imN), cxEx(re, im)]), ens([nb(a), nb(-a)])].map((x) => `$${x}$`);
      const ch = choix4(bonne, f);
      return { enonce: `Résous dans $\\mathbb{C}$ l'équation $z^3 = ${nb(a ** 3)}$.`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`$${nb(a ** 3)} = ${pr(a)}^3$ : l'équation s'écrit $z^3 - ${pr(a)}^3 = 0$.`, `Factorise : $z^3 - ${pr(a)}^3 = (z ${plus(-a)})(${poly([1, a, a * a])})$.`, `Résous $${poly([1, a, a * a])} = 0$ : $\\Delta = ${a * a} - ${4 * a * a} = ${-3 * a * a}$.`],
        solution: `$z^3 - ${pr(a)}^3 = (z ${plus(-a)})(${poly([1, a, a * a])})$.\n\n$z ${plus(-a)} = 0$ donne $z = ${nb(a)}$. Pour $${poly([1, a, a * a])} = 0$ : $\\Delta = ${-3 * a * a} < 0$, $\\sqrt{${3 * a * a}} = ${sqrtTex(3 * a * a)}$, d'où $z = \\dfrac{${nb(-a)} \\pm ${A === 1 ? "" : nb(A)}i\\sqrt{3}}{2}$.\n\n$${ens([nb(a), cxEx(re, imN), cxEx(re, im)])}$` };
    }
    const n = pick([3, 4, 5, 6]), a = pick([1, 2, 3, 4, 5, -1, -2, -3, -4, -5]);
    const fac = Array.from({ length: n }, (_, k) => a ** k); // z^{n-1} + a z^{n-2} + … + a^{n-1}
    const bonne = `$(z ${plus(-a)})(${poly(fac)})$`;
    const alt = Array.from({ length: n }, (_, k) => (-a) ** k), sansCoef = [1].concat(Array(n - 2).fill(0), [a ** (n - 1)]), carre = Array.from({ length: n }, (_, k) => (k === 0 ? 1 : a ** k * (k === 1 ? 2 : 1)));
    const ch = choix4(bonne, [`$(z ${plus(-a)})(${poly(alt)})$`, `$(z ${plus(-a)})(${poly(sansCoef)})$`, `$(z ${plus(a)})(${poly(fac)})$`, `$(z ${plus(-a)})(${poly(carre)})$`]);
    const an = a ** n;
    return { enonce: `Quelle est la factorisation de $z^{${n}} ${plus(-an)}$ par $z ${plus(-a)}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`$${nb(an)} = ${pr(a)}^{${n}}$ : on factorise $z^{${n}} - ${pr(a)}^{${n}}$.`, "$z^n - a^n = (z - a)(z^{n-1} + az^{n-2} + \\dots + a^{n-2}z + a^{n-1})$.", "Vérifie en développant : tous les termes intermédiaires s'annulent."],
      solution: `Avec la formule $z^n - a^n = (z - a)(z^{n-1} + az^{n-2} + \\dots + a^{n-1})$ et $a = ${nb(a)}$ :\n\n$z^{${n}} ${plus(-an)} = (z ${plus(-a)})(${poly(fac)})$.` };
  });

  def("xp-vrai-faux", () => vraiFaux4([
    ["Une équation du second degré à coefficients réels a toujours au moins une solution dans $\\mathbb{C}$.", true, "si $\\Delta < 0$, il y a deux solutions complexes conjuguées."],
    ["Si $\\Delta < 0$, les deux solutions sont conjuguées l'une de l'autre.", true, "elles valent $\\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a}$."],
    ["Un polynôme de degré $3$ a au plus $3$ racines.", true, "un polynôme de degré $n$ a au plus $n$ racines."],
    ["Si $P(2) = 0$, alors $P(z)$ se factorise par $z - 2$.", true, "c'est le théorème de factorisation par $z - a$."],
    ["$z^3 - 1 = (z - 1)(z^2 + z + 1)$.", true, "en développant : $z^3 + z^2 + z - z^2 - z - 1 = z^3 - 1$."],
    ["Si $z_1$ et $z_2$ sont les solutions de $z^2 + bz + c = 0$, alors $z_1z_2 = c$.", true, "car $(z - z_1)(z - z_2) = z^2 - (z_1 + z_2)z + z_1z_2$."],
    ["Si un polynôme à coefficients réels a pour racine $2 + i$, il a aussi pour racine $2 - i$.", true, "$P(\\overline{z}) = \\overline{P(z)}$ quand les coefficients sont réels."],
    ["L'équation $z^2 + 4 = 0$ n'a pas de solution.", false, "dans $\\mathbb{C}$, elle a deux solutions : $2i$ et $-2i$."],
    ["Un polynôme de degré $2$ peut avoir $3$ racines distinctes.", false, "un polynôme de degré $n$ a au plus $n$ racines."],
    ["Si $\\Delta = -16$, les solutions de $z^2 + bz + c = 0$ sont $\\dfrac{-b \\pm 16i}{2}$.", false, "on prend la racine carrée de $-\\Delta$ : $\\dfrac{-b \\pm 4i}{2}$."],
    ["$z^3 - 8 = (z - 2)(z^2 - 2z + 4)$.", false, "c'est $(z - 2)(z^2 + 2z + 4)$ : tous les signes du second facteur sont « $+$ »."],
    ["Les solutions de $z^2 - 2z + 5 = 0$ sont $-1 + 2i$ et $-1 - 2i$.", false, "$\\Delta = -16$ et les solutions sont $\\dfrac{2 \\pm 4i}{2} = 1 \\pm 2i$."],
    ["Pour tout polynôme $P$ tel que $P(3) = 0$, on peut écrire $P(z) = (z + 3)Q(z)$.", false, "c'est par $z - 3$ qu'on factorise ; contre-exemple : $P(z) = z - 3$."],
    ["Si $z_1$ et $z_2$ sont les solutions de $z^2 + bz + c = 0$, alors $z_1 + z_2 = b$.", false, "$z_1 + z_2 = -b$."]
  ], ["Pense au discriminant et à la factorisation par $z - a$.", "Vérifie une factorisation en développant.", "Un seul contre-exemple suffit pour une affirmation fausse."]));

  /* Figures du cours (chapitre 4) */
  FIGURES["xp-cours-parabole"] = () => graph({ xmin: -1.6, xmax: 4.6, ymin: -1.6, ymax: 9.6, ystep: 1, h: 240,
    curves: [{ f: (x) => x * x - 2 * x + 5, a: -1.3, b: 3.3, label: "y = x² − 2x + 5", lx: 3.1, dx: -10, dy: -2 }],
    aria: "Parabole d'équation y = x² − 2x + 5, entièrement au-dessus de l'axe des abscisses : pas de racine réelle" });
  FIGURES["xp-cours-conjuguees"] = () => planC({ xmin: -2.4, xmax: 3.4, ymin: -3.4, ymax: 3.4,
    points: [ptC(1, 2, "z₁ = 1 + 2i"), ptC(1, -2, "z₂ = 1 − 2i"), ptC(-1, 0, "−1", { gauche: true })], segs: [[1, 2, 1, -2, true]],
    aria: "Les racines de z³ − z² + 3z + 5 : −1 sur l'axe réel, et 1 + 2i, 1 − 2i symétriques par rapport à l'axe réel" });


  /* ---------- Chapitre 5 : nombres complexes et géométrie (préfixe xc) ---------- */
  // Configuration A, B, C : zC - zA = q (zB - zA), q pris dans une liste (parties entières ou rationnelles simples)
  const NATURES = ["Les points $A$, $B$ et $C$ sont alignés", "$ABC$ est rectangle isocèle en $A$", "$ABC$ est rectangle en $A$, mais pas isocèle", "$ABC$ est isocèle en $A$, mais pas rectangle", "$ABC$ est équilatéral"];
  const configABC = () => {
    const A = [rand(-3, 3), rand(-3, 3)];
    const t = pick(["aligne", "rectIso", "rect", "iso"]);
    let u, q;
    if (t === "iso") { u = pick([[5, 0], [0, 5], [-5, 0], [0, -5]]); q = pick([[Q(3, 5), Q(4, 5)], [Q(4, 5), Q(3, 5)], [Q(3, 5), Q(-4, 5)], [Q(-4, 5), Q(3, 5)], [Q(-3, 5), Q(-4, 5)]]); }
    else { do { u = [rand(-3, 3), rand(-3, 3)]; } while (!u[0] && !u[1]); q = t === "aligne" ? [Q(pick([-3, -2, -1, 2, 3])), Q(0)] : t === "rectIso" ? [Q(0), Q(pick([-1, 1]))] : [Q(0), Q(pick([-3, -2, 2, 3]))]; }
    const qv = [qVal(q[0]), qVal(q[1])];
    const v = [qv[0] * u[0] - qv[1] * u[1], qv[0] * u[1] + qv[1] * u[0]];
    const B = [A[0] + u[0], A[1] + u[1]], Cc = [A[0] + v[0], A[1] + v[1]];
    return { A, B, C: Cc, u, v, q, t, nat: { aligne: 0, rectIso: 1, rect: 2, iso: 3 }[t] };
  };

  def("xc-quotient", () => {
    const K = configABC();
    const bonne = `$${cTexQ(K.q)}$`;
    const f = [`$${cx(K.q[0], { n: -K.q[1].n, d: K.q[1].d })}$`, `$${cx({ n: -K.q[0].n, d: K.q[0].d }, K.q[1])}$`, `$${cx({ n: -K.q[0].n, d: K.q[0].d }, { n: -K.q[1].n, d: K.q[1].d })}$`, `$${cx(K.q[1], K.q[0])}$`];
    const ch = choix4(bonne, f, (k) => `$${cx(qVal(K.q[0]) + k + 1, K.q[1])}$`);
    return { enonce: `On donne $z_A = ${cx(...K.A)}$, $z_B = ${cx(...K.B)}$ et $z_C = ${cx(...K.C)}$. Calcule $\\dfrac{z_C - z_A}{z_B - z_A}$.`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`$z_C - z_A = ${cx(...K.v)}$ et $z_B - z_A = ${cx(...K.u)}$.`, "Pour le quotient, multiplie en haut et en bas par le conjugué du dénominateur.", `Le dénominateur devient $${K.u[0] ** 2 + K.u[1] ** 2}$.`],
      solution: `$\\dfrac{z_C - z_A}{z_B - z_A} = \\dfrac{${cx(...K.v)}}{${cx(...K.u)}} = \\dfrac{(${cx(...K.v)})(${cx(K.u[0], -K.u[1])})}{${K.u[0] ** 2 + K.u[1] ** 2}} = ${cTexQ(K.q)}$.` };
  });

  def("xc-nature", () => {
    const K = configABC();
    const ch = choix4(NATURES[K.nat], shuffle(NATURES.filter((_, k) => k !== K.nat)));
    const mq = Math.sqrt(qVal(K.q[0]) ** 2 + qVal(K.q[1]) ** 2);
    const expl = ["Le quotient est un **réel** : les vecteurs $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ sont colinéaires, donc $A$, $B$, $C$ sont alignés.",
      `Le quotient vaut $${cTexQ(K.q)}$ : son module est $1$, donc $AC = AB$, et c'est un imaginaire pur, donc $(AB) \\perp (AC)$. Le triangle est rectangle isocèle en $A$.`,
      `Le quotient est un imaginaire pur, donc $(AB) \\perp (AC)$ : rectangle en $A$. Son module vaut $${nb(mq)} \\neq 1$, donc $AC \\neq AB$ : pas isocèle.`,
      `Le module du quotient vaut $1$, car $\\left(${qTex(K.q[0])}\\right)^2 + \\left(${qTex(K.q[1])}\\right)^2 = 1$ : $AC = AB$, le triangle est isocèle en $A$. Le quotient n'est ni réel ni imaginaire pur : pas d'angle droit en $A$ (et il n'est pas équilatéral, car un argument n'est pas $\\pm\\dfrac{\\pi}{3}$).`][K.nat];
    return { enonce: `On donne $z_A = ${cx(...K.A)}$, $z_B = ${cx(...K.B)}$ et $z_C = ${cx(...K.C)}$. On calcule $\\dfrac{z_C - z_A}{z_B - z_A} = ${cTexQ(K.q)}$. Que peut-on en déduire ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Le module de $\\dfrac{z_C - z_A}{z_B - z_A}$ vaut $\\dfrac{AC}{AB}$.", "Un argument de ce quotient est une mesure de l'angle $(\\overrightarrow{AB}, \\overrightarrow{AC})$.", "Réel : alignés. Imaginaire pur : angle droit en $A$. Module $1$ : $AB = AC$."],
      solution: expl };
  });

  def("xc-alignement", () => {
    const A = [rand(-4, 4), rand(-4, 4)], t = pick(["aligne", "ortho"]);
    let u; do { u = [rand(-4, 4), pick([-3, -2, -1, 1, 2, 3])]; } while (!u[0]);
    // M = (x ; m) ; alignés : u0 (m - a1) - u1 (x - a0) = 0 ; orthogonaux : u0 (x - a0) + u1 (m - a1) = 0
    let x, m;
    if (t === "aligne") { const k = rand(-3, 3) || 2; x = A[0] + k * u[0]; m = A[1] + k * u[1]; }
    else { const k = rand(-3, 3) || 1; x = A[0] - k * u[1]; m = A[1] + k * u[0]; }
    const B = [A[0] + u[0], A[1] + u[1]], dy = m - A[1];
    const faux = t === "aligne" ? A[0] - (u[1] * dy) / u[0] : A[0] + (u[1] * dy) / u[0];
    const xm = A[0] ? `x ${plus(-A[0])}` : "x", xmp = A[0] ? `(${xm})` : "x";
    const zM = `x${m ? " " + pt(m, "i") : ""}`, zMA = `${xmp}${dy ? " " + pt(dy, "i") : ""}`;
    const cond = t === "aligne" ? "le quotient $\\dfrac{z_M - z_A}{z_B - z_A}$ doit être **réel**." : "le quotient $\\dfrac{z_M - z_A}{z_B - z_A}$ doit être **imaginaire pur**.";
    return { enonce: `On donne $z_A = ${cx(...A)}$, $z_B = ${cx(...B)}$ et $z_M = ${zM}$ avec $x$ réel. Pour quelle valeur de $x$ ${t === "aligne" ? "les points $A$, $B$ et $M$ sont-ils alignés" : "les droites $(AB)$ et $(AM)$ sont-elles perpendiculaires"} ?`,
      mode: "nombre", prefixe: "$x =$", attendu: x,
      erreurs: [{ valeur: faux, message: "Vérifie la condition : " + cond }, { valeur: -x, message: "Attention au signe en isolant $x$." }],
      aides: [`$z_B - z_A = ${cx(...u)}$ et $z_M - z_A = ${zMA}$.`, t === "aligne" ? "Les points sont alignés quand les vecteurs $\\overrightarrow{AB}$ et $\\overrightarrow{AM}$ sont colinéaires : déterminant $xy' - x'y = 0$." : "Les droites sont perpendiculaires quand $\\overrightarrow{AB} \\cdot \\overrightarrow{AM} = 0$ (le quotient est alors imaginaire pur).", "Écris l'équation obtenue et résous-la."],
      solution: t === "aligne"
        ? `$\\overrightarrow{AB}(${nb(u[0])}\\,;${nb(u[1])})$ et $\\overrightarrow{AM}(${xm}\\,;${nb(dy)})$ sont colinéaires quand $${nb(u[0])} \\times ${pr(dy)} - ${pr(u[1])} \\times ${xmp} = 0$, soit $x = ${nb(x)}$.\n\nAvec les complexes : $\\dfrac{z_M - z_A}{z_B - z_A}$ est alors un réel.`
        : `$\\overrightarrow{AB} \\cdot \\overrightarrow{AM} = ${pr(u[0])} \\times ${xmp} + ${pr(u[1])} \\times ${pr(dy)} = 0$, avec $\\overrightarrow{AB}(${nb(u[0])}\\,;${nb(u[1])})$ et $\\overrightarrow{AM}(${xm}\\,;${nb(dy)})$, soit $x = ${nb(x)}$.\n\nAvec les complexes : $\\dfrac{z_M - z_A}{z_B - z_A}$ est alors un imaginaire pur.` };
  });

  def("xc-ensemble", () => {
    const t = pick(["cercle", "cercle", "mediatrice", "cercleI", "disque"]);
    const a = [rand(-4, 4), rand(-4, 4)], r = rand(1, 6);
    if (!a[0] && !a[1]) a[1] = 2;
    const zm = (w) => `z${w[0] ? " " + pt(-w[0], "") : ""}${w[1] ? " " + pt(-w[1], "i") : ""}`; // z - w développé : z + 4 - 2i
    const ptO = `\\Omega(${cx(...a)})`;
    if (t === "cercle" || t === "disque") {
      const sym = t === "cercle" ? "=" : "\\leqslant";
      const nom = t === "cercle" ? "le cercle" : "le disque";
      const bonne = `${nom[0].toUpperCase() + nom.slice(1)} de centre $${ptO}$ et de rayon $${r}$`;
      const f = [`${nom[0].toUpperCase() + nom.slice(1)} de centre $\\Omega(${cx(-a[0], -a[1])})$ et de rayon $${r}$`, `${nom[0].toUpperCase() + nom.slice(1)} de centre $${ptO}$ et de rayon $${r * r}$`, `${t === "cercle" ? "Le disque" : "Le cercle"} de centre $${ptO}$ et de rayon $${r}$`, `La droite d'équation $x = ${nb(a[0] + r)}$`];
      const ch = choix4(bonne, f);
      return { enonce: `Quel est l'ensemble des points $M$ d'affixe $z$ tels que $|${zm(a)}| ${sym} ${r}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["$|z - z_\\Omega| = \\Omega M$ : c'est une distance.", `Écris le module sous la forme $|z - z_\\Omega|$ : ici $z_\\Omega = ${cx(...a)}$.`, t === "cercle" ? "Les points à la distance $r$ d'un point forment un cercle." : "Les points à une distance inférieure ou égale à $r$ forment un disque."],
        solution: `$|${zm(a)}| = |z - (${cx(...a)})| = \\Omega M$ avec $\\Omega$ d'affixe $${cx(...a)}$.\n\n$\\Omega M ${sym} ${r}$ : c'est ${nom} de centre $\\Omega$ et de rayon $${r}$.` };
    }
    if (t === "cercleI") { // |iz - b| = r  ⇔  |z + ib| = r  ⇔ centre -i·(-b)… : |i(z - b/i)| = |z + ib|
      const b = [rand(-4, 4), rand(-4, 4)]; if (!b[0] && !b[1]) b[0] = 2;
      const c = cMul([0, -1], b); // b/i = -ib
      const bonne = `Le cercle de centre $\\Omega(${cx(...c)})$ et de rayon $${r}$`;
      const f = [`Le cercle de centre $\\Omega(${cx(...b)})$ et de rayon $${r}$`, `Le cercle de centre $\\Omega(${cx(-c[0], -c[1])})$ et de rayon $${r}$`, `Le cercle de centre $\\Omega(${cx(...c)})$ et de rayon $${r * r}$`, `La médiatrice du segment $[OB]$, où $B$ a pour affixe $${cx(...b)}$`];
      const ch = choix4(bonne, f);
      return { enonce: `Quel est l'ensemble des points $M$ d'affixe $z$ tels que $|${zm(b).replace(/^z/, "iz")}| = ${r}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Mets $i$ en facteur : $iz - b = i\\left(z - \\dfrac{b}{i}\\right)$.", "$|i| = 1$, donc $|iz - b| = \\left|z - \\dfrac{b}{i}\\right|$.", `$\\dfrac{1}{i} = -i$, donc $\\dfrac{b}{i} = -ib = ${cx(...c)}$.`],
        solution: `$|iz - (${cx(...b)})| = |i| \\times \\left|z - \\dfrac{${cx(...b)}}{i}\\right| = |z - (${cx(...c)})|$.\n\nC'est le cercle de centre $\\Omega(${cx(...c)})$ et de rayon $${r}$.` };
    }
    const b = [rand(-4, 4), rand(-4, 4)]; if (b[0] === a[0] && b[1] === a[1]) b[0] += 2;
    const bonne = `La médiatrice du segment $[AB]$, avec $A(${cx(...a)})$ et $B(${cx(...b)})$`;
    const f = [`Le cercle de centre $A(${cx(...a)})$ passant par $B(${cx(...b)})$`, `La médiatrice du segment $[AB]$, avec $A(${cx(-a[0], -a[1])})$ et $B(${cx(-b[0], -b[1])})$`, `Le milieu du segment $[AB]$, avec $A(${cx(...a)})$ et $B(${cx(...b)})$`, `La droite $(AB)$, avec $A(${cx(...a)})$ et $B(${cx(...b)})$`];
    const ch = choix4(bonne, f);
    return { enonce: `Quel est l'ensemble des points $M$ d'affixe $z$ tels que $|${zm(a)}| = |${zm(b)}|$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Traduis chaque module en distance : $|z - z_A| = AM$.", `Ici $AM = BM$ avec $z_A = ${cx(...a)}$ et $z_B = ${cx(...b)}$.`, "Les points équidistants de $A$ et de $B$ forment la médiatrice de $[AB]$."],
      solution: `$|${zm(a)}| = AM$ et $|${zm(b)}| = BM$, avec $A(${cx(...a)})$ et $B(${cx(...b)})$.\n\n$AM = BM$ : l'ensemble cherché est la médiatrice du segment $[AB]$.` };
  });

  def("xc-racines-unite", () => {
    const t = pick(["nombre", "appartient", "appartient", "somme", "j", "j"]);
    const n = rand(3, 12);
    if (t === "nombre") return { enonce: `Combien l'équation $z^{${n}} = 1$ a-t-elle de solutions dans $\\mathbb{C}$ ?`, mode: "nombre", prefixe: "Nombre de solutions :", attendu: n,
      erreurs: [{ valeur: n % 2 ? 1 : 2, message: "Ça, ce sont seulement les solutions réelles. Dans $\\mathbb{C}$, il y en a d'autres." }, { valeur: n - 1, message: "N'oublie pas $1$ lui-même." }],
      aides: ["Les solutions sont les racines $" + n + "$-ièmes de l'unité.", "$\\mathbb{U}_n = \\left\\{e^{\\frac{2ik\\pi}{n}},\\ k = 0, 1, \\dots, n - 1\\right\\}$.", "Compte les valeurs de $k$."],
      solution: `Les solutions sont les $e^{\\frac{2ik\\pi}{${n}}}$ pour $k = 0, 1, \\dots, ${n - 1}$ : il y en a $${n}$, sommets d'un polygone régulier à $${n}$ côtés.` };
    if (t === "somme") { const k = rand(1, 3); return { enonce: `On note $\\omega = e^{\\frac{2i\\pi}{${n}}}$. Que vaut $${k === 1 ? "" : nb(k) + "\\left("}1 + \\omega + \\omega^2 + \\dots + \\omega^{${n - 1}}${k === 1 ? "" : "\\right)"}$ ?`, mode: "nombre", prefixe: "Somme :", attendu: 0,
      erreurs: [{ valeur: k * n, message: "Les termes ne valent pas tous $1$ : seule la somme est remarquable." }, { valeur: k, message: "Utilise la somme des termes d'une suite géométrique de raison $\\omega$." }],
      aides: ["C'est la somme des termes d'une suite géométrique de raison $\\omega \\neq 1$.", "$1 + \\omega + \\dots + \\omega^{n-1} = \\dfrac{1 - \\omega^n}{1 - \\omega}$.", "$\\omega^n = 1$."],
      solution: `$1 + \\omega + \\dots + \\omega^{${n - 1}} = \\dfrac{1 - \\omega^{${n}}}{1 - \\omega} = \\dfrac{1 - 1}{1 - \\omega} = 0$${k > 1 ? `, donc l'expression vaut $${k} \\times 0 = 0$` : ""}.` }; }
    if (t === "j") {
      const p = rand(2, 99), quoi = pick(["puiss", "puiss", "somme"]);
      let bonne, f, enonce, sol;
      const J = ["1", "j", "j^2"];
      if (quoi === "puiss") { bonne = `$${J[p % 3]}$`; f = ["$1$", "$j$", "$j^2$", "$-1$", "$-j$"]; enonce = `On note $j = e^{\\frac{2i\\pi}{3}}$. Que vaut $j^{${p}}$ ?`; sol = `$j^3 = 1$ et $${p} = 3 \\times ${Math.floor(p / 3)} + ${p % 3}$, donc $j^{${p}} = (j^3)^{${Math.floor(p / 3)}} \\times j^{${p % 3}} = ${J[p % 3]}$.`; }
      else if (quoi === "somme") { // j^p + j^(p+1) + j^(p+2) = 0, ou conjugué de j à une puissance
        if (p % 2) { bonne = "$0$"; f = ["$1$", "$3$", "$-1$", `$${J[p % 3]}$`, "$3j$"]; enonce = `On note $j = e^{\\frac{2i\\pi}{3}}$. Que vaut $j^{${p}} + j^{${p + 1}} + j^{${p + 2}}$ ?`; sol = `$j^{${p}} + j^{${p + 1}} + j^{${p + 2}} = j^{${p}}(1 + j + j^2) = 0$, car la somme des racines cubiques de l'unité est nulle.`; }
        else { bonne = `$${J[(2 * p) % 3]}$`; f = ["$1$", "$j$", "$j^2$", "$-1$", "$-j$"]; enonce = `On note $j = e^{\\frac{2i\\pi}{3}}$. Que vaut $\\overline{j}^{\\,${p}}$ ?`; sol = `$\\overline{j} = j^2$, donc $\\overline{j}^{\\,${p}} = j^{${2 * p}}$, et $${2 * p} = 3 \\times ${Math.floor((2 * p) / 3)} + ${(2 * p) % 3}$, d'où $\\overline{j}^{\\,${p}} = ${J[(2 * p) % 3]}$.`; }
      }
      else { bonne = "$j^2$"; f = ["$j$", "$-j$", "$1$", "$-j^2$"]; enonce = "On note $j = e^{\\frac{2i\\pi}{3}}$. À quoi est égal $\\overline{j}$ ?"; sol = "$\\overline{j} = e^{-\\frac{2i\\pi}{3}} = e^{\\frac{4i\\pi}{3}} = j^2$ (on ajoute $2\\pi$ à l'argument)."; }
      const ch = choix4(bonne, f);
      return { enonce, mode: "choix", choix: ch.choix, attendu: ch.attendu, aides: ["$j = e^{\\frac{2i\\pi}{3}} = -\\dfrac{1}{2} + \\dfrac{\\sqrt{3}}{2}i$.", "$j^3 = e^{2i\\pi} = 1$.", "$1 + j + j^2 = 0$ et $\\overline{j} = j^2$."], solution: sol };
    }
    // appartient : lequel est une racine n-ième de l'unité ?
    const k = rand(1, n - 1);
    const fx = (p, q) => { const gg = pgcd(p, q); p /= gg; q /= gg; return q === 1 ? `$e^{${p === 1 ? "" : nb(p)}i\\pi}$` : `$e^{\\frac{${p === 1 ? "" : nb(p)}i\\pi}{${q}}}$`; };
    const bonneT = fx(2 * k, n);
    const f = [fx(2 * k + 1, n), fx(1, n), fx(2 * k, n + 1), fx(1, 2 * n), fx(2 * k + 1, 2 * n)].filter((x) => x !== bonneT);
    // élimine un piège qui serait lui aussi une racine n-ième
    const estRacine = (s) => { const m = s.match(/\{(?:\\frac\{)?(\d*)i\\pi\}?(?:\{(\d+)\})?/); const p = +(m[1] || 1), q = +(m[2] || 1); return (p * n) % (2 * q) === 0; };
    const ch = choix4(bonneT, f.filter((x) => !estRacine(x)), (j) => fx(2 * j + 1, n));
    return { enonce: `Lequel de ces nombres est une racine $${n}$-ième de l'unité ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`Les racines $${n}$-ièmes de l'unité sont les $e^{\\frac{2ik\\pi}{${n}}}$, $k$ entier.`, `$z = e^{i\\theta}$ convient si $z^{${n}} = e^{i${n}\\theta} = 1$, c'est-à-dire si $${n}\\theta$ est un multiple de $2\\pi$.`, "Pour chaque proposition, multiplie l'argument par $" + n + "$."],
      solution: `$${bonneT.slice(1, -1)}$ s'écrit $e^{\\frac{2ki\\pi}{${n}}}$ avec $k = ${k}$ : sa puissance $${n}$-ième vaut $e^{${2 * k}i\\pi} = 1$. Pour les autres, $${n}\\theta$ n'est pas un multiple de $2\\pi$.` };
  });

  def("xc-polygone", () => {
    const t = pick(["rot90", "rot90", "rotPi", "rot60", "carre"]);
    if (t === "rot60") {
      const r = pick([2, 4, 6, 8, 10, 12, 14, 16]), s = pick([1, -1]);
      const [re, im] = algExact(r, [s, 3]);
      const bonne = `$${cxEx(re, im)}$`;
      const neg = (e) => EXA(-e.c, e.m, e.d);
      const [re2, im2] = algExact(r, [s, 6]);
      const ch = choix4(bonne, [`$${cxEx(re2, im2)}$`, `$${cxEx(re, neg(im))}$`, `$${cxEx(neg(re), im)}$`, `$${cxEx(...algExact(r, [2 * s, 3]))}$`]);
      return { enonce: `$A$ a pour affixe $${r}$. Le triangle $OAB$ est équilatéral, et on passe de $\\overrightarrow{OA}$ à $\\overrightarrow{OB}$ par une rotation d'angle $${s > 0 ? "" : "-"}\\dfrac{\\pi}{3}$. Quelle est l'affixe de $B$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Tourner d'un angle $\\theta$ autour de $O$, c'est multiplier l'affixe par $e^{i\\theta}$.", `$z_B = ${r}e^{${s > 0 ? "" : "-"}i\\frac{\\pi}{3}}$.`, "$\\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$ et $\\sin\\dfrac{\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$."],
        solution: `$z_B = ${r}e^{${s > 0 ? "" : "-"}i\\frac{\\pi}{3}} = ${r}\\left(\\dfrac{1}{2} ${s > 0 ? "+" : "-"} \\dfrac{\\sqrt{3}}{2}i\\right) = ${cxEx(re, im)}$.` };
    }
    const A = [rand(-5, 5), rand(-5, 5)]; if (!A[0] && !A[1]) A[0] = 3;
    let rot, nom, txt;
    if (t === "rotPi") { rot = [-1, 0]; nom = "\\pi"; txt = "d'un demi-tour"; }
    else { const s = pick([1, -1]); rot = [0, s]; nom = s > 0 ? "\\dfrac{\\pi}{2}" : "-\\dfrac{\\pi}{2}"; txt = `d'angle $${nom}$`; }
    const B = cMul(rot, A);
    if (t === "carre") {
      // carré OABC direct : zB = zA + i zA, zC = i zA
      const Cc = cMul([0, 1], A), Bb = cAdd(A, Cc);
      const ch = choix4(`$${cx(...Bb)}$`, [`$${cx(...cAdd(A, cMul([0, -1], A)))}$`, `$${cx(...Cc)}$`, `$${cx(...cMul([2, 0], A))}$`, `$${cx(A[0] + A[1], A[1] + A[0])}$`], voisin(...Bb));
      return { enonce: `$OABC$ est un carré direct (sommets dans le sens inverse des aiguilles d'une montre), avec $z_A = ${cx(...A)}$. Quelle est l'affixe de $B$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["$C$ est l'image de $A$ par la rotation de centre $O$ et d'angle $\\dfrac{\\pi}{2}$ : $z_C = iz_A$.", `$z_C = i(${cx(...A)}) = ${cx(...Cc)}$.`, "Dans le parallélogramme $OABC$ : $\\overrightarrow{OB} = \\overrightarrow{OA} + \\overrightarrow{OC}$."],
        solution: `$z_C = iz_A = ${cx(...Cc)}$, puis $z_B = z_A + z_C = (${cx(...A)}) + (${cx(...Cc)}) = ${cx(...Bb)}$.`,
        figure: undefined };
    }
    const ch = choix4(`$${cx(...B)}$`, [`$${cx(...cMul([-rot[0], -rot[1]], A))}$`, `$${cx(A[0], -A[1])}$`, `$${cx(A[1], A[0])}$`, `$${cx(-A[0], A[1])}$`], voisin(...B));
    return { enonce: `$B$ est l'image du point $A$ d'affixe $${cx(...A)}$ par la rotation de centre $O$ ${txt}. Quelle est l'affixe de $B$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Tourner d'un angle $\\theta$ autour de $O$ revient à multiplier l'affixe par $e^{i\\theta}$.", `$e^{i${nom}} = ${cx(...rot)}$.`, `Calcule $${cx(...rot)} \\times (${cx(...A)})$.`],
      solution: `$z_B = e^{i${nom}} \\times z_A = ${cx(...rot)}(${cx(...A)}) = ${cx(...B)}$.`,
      figure: planC(Object.assign(fenetre([A, B]), { points: [ptC(A[0], A[1], "A")], segs: [[0, 0, A[0], A[1], true]], aria: `Point A d'affixe ${A[0]} ${A[1] < 0 ? "−" : "+"} ${Math.abs(A[1])}i, à faire tourner autour de O` })) };
  });

  def("xc-vrai-faux", () => vraiFaux4([
    ["Si $\\dfrac{z_C - z_A}{z_B - z_A}$ est réel, alors $A$, $B$ et $C$ sont alignés.", true, "un argument est $0$ ou $\\pi$ : les vecteurs $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ sont colinéaires."],
    ["Si $\\dfrac{z_C - z_A}{z_B - z_A} = i$, alors $ABC$ est rectangle isocèle en $A$.", true, "le module $1$ donne $AC = AB$ et l'argument $\\dfrac{\\pi}{2}$ l'angle droit."],
    ["L'ensemble des $M(z)$ tels que $|z - 2i| = 3$ est un cercle de rayon $3$.", true, "c'est le cercle de centre le point d'affixe $2i$ et de rayon $3$."],
    ["L'équation $z^5 = 1$ a exactement $5$ solutions dans $\\mathbb{C}$.", true, "ce sont les $e^{\\frac{2ik\\pi}{5}}$ pour $k$ de $0$ à $4$."],
    ["La somme des racines $n$-ièmes de l'unité est nulle (pour $n \\geqslant 2$).", true, "c'est une somme géométrique de raison $\\omega = e^{\\frac{2i\\pi}{n}} \\neq 1$ avec $\\omega^n = 1$."],
    ["Les images des racines $6$-ièmes de l'unité sont les sommets d'un hexagone régulier.", true, "elles sont sur le cercle unité, séparées par des angles de $\\dfrac{\\pi}{3}$."],
    ["$i$ est une racine $4$-ième de l'unité.", true, "$i^4 = 1$."],
    ["L'ensemble des $M(z)$ tels que $|z - 1| = |z + 1|$ est l'axe des imaginaires purs.", true, "c'est la médiatrice du segment d'extrémités $1$ et $-1$."],
    ["Si $\\dfrac{z_C - z_A}{z_B - z_A}$ est imaginaire pur, alors $A$, $B$ et $C$ sont alignés.", false, "c'est alors un angle droit : $(AB) \\perp (AC)$."],
    ["L'ensemble des $M(z)$ tels que $|z + 3| = 2$ est le cercle de centre le point d'affixe $3$.", false, "$|z + 3| = |z - (-3)|$ : le centre a pour affixe $-3$."],
    ["$-1$ est une racine cubique de l'unité.", false, "$(-1)^3 = -1 \\neq 1$."],
    ["L'équation $z^3 = 1$ a une seule solution dans $\\mathbb{C}$.", false, "elle en a trois : $1$, $j$ et $j^2$."],
    ["$e^{\\frac{i\\pi}{3}}$ est une racine cubique de l'unité.", false, "$\\left(e^{\\frac{i\\pi}{3}}\\right)^3 = e^{i\\pi} = -1$ : c'est une racine $6$-ième."],
    ["L'ensemble des $M(z)$ tels que $|z - i| = 4$ est un disque.", false, "c'est un cercle (le disque correspond à $\\leqslant 4$)."]
  ], ["Traduis les modules en distances et les arguments en angles.", "Pour les racines de l'unité, élève à la puissance $n$.", "Un contre-exemple suffit pour montrer qu'une affirmation est fausse."]));

  /* Figures du cours (chapitre 5) */
  FIGURES["xc-cours-angle"] = () => planC({ xmin: -1.4, xmax: 6.4, ymin: -1.4, ymax: 5.4,
    points: [ptC(1, 1, "A"), ptC(5, 2, "B"), ptC(2, 4, "C", { gauche: true })], fleches: [{ x1: 1, y1: 1, x2: 5, y2: 2, label: "", c: 0 }, { x1: 1, y1: 1, x2: 2, y2: 4, label: "", c: 1 }],
    arcs: [{ cx: 1, cy: 1, a1: Math.atan2(1, 4), a2: Math.atan2(3, 1), r: 1, label: "θ", dl: 0.3 }],
    aria: "Triangle ABC : le module de (zC − zA)/(zB − zA) est AC/AB, son argument est l'angle θ entre les vecteurs AB et AC" });
  FIGURES["xc-cours-un"] = () => {
    const n = 6, pts = Array.from({ length: n }, (_, k) => [Math.cos((2 * k * Math.PI) / n), Math.sin((2 * k * Math.PI) / n)]);
    const lab = ["1", "ω", "ω²", "ω³ = −1", "ω⁴", "ω⁵"];
    return planC({ xmin: -1.6, xmax: 1.6, ymin: -1.6, ymax: 1.6, xstep: 0.5, ystep: 0.5, xetiq: 1, yetiq: 1, cercles: [{ x: 0, y: 0, r: 1, pointille: true }], polys: [pts],
      points: pts.map(([x, y], k) => ptC(x, y, lab[k], { gauche: x < -0.1 })), aria: "Les racines sixièmes de l'unité, sommets d'un hexagone régulier inscrit dans le cercle unité" });
  };
  FIGURES["xc-cours-j"] = () => {
    const pts = [[1, 0], [-0.5, Math.sqrt(3) / 2], [-0.5, -Math.sqrt(3) / 2]];
    return planC({ xmin: -1.6, xmax: 1.6, ymin: -1.6, ymax: 1.6, xstep: 0.5, ystep: 0.5, xetiq: 1, yetiq: 1, cercles: [{ x: 0, y: 0, r: 1, pointille: true }], polys: [pts],
      points: [ptC(1, 0, "1"), ptC(-0.5, Math.sqrt(3) / 2, "j", { gauche: true }), ptC(-0.5, -Math.sqrt(3) / 2, "j² = j̄", { gauche: true })], aria: "Les racines cubiques de l'unité 1, j et j², sommets d'un triangle équilatéral" });
  };
  FIGURES["xc-cours-ensembles"] = () => planC({ xmin: -3.6, xmax: 4.6, ymin: -3.6, ymax: 4.6,
    cercles: [{ x: 1, y: 1, r: 2 }], points: [ptC(1, 1, "Ω(1 + i)"), ptC(-2, -2, "A"), ptC(3, -2, "B")], segs: [[0.5, -3.4, 0.5, 4.4, true], [-2, -2, 3, -2]],
    textes: [{ x: 0.6, y: 3.9, t: "AM = BM", ancre: "start", dx: 4 }],
    aria: "Le cercle |z − (1 + i)| = 2, et la médiatrice de [AB], ensemble des points tels que AM = BM" });


  /* ---------- Chapitre 6 : divisibilité et congruences (préfixe xd) ---------- */
  const diviseurs = (n) => { const d = []; for (let k = 1; k <= Math.abs(n); k++) if (n % k === 0) d.push(k); return d; };
  const liste = (L) => L.map((x) => `$${nb(x)}$`).join(" ; ");
  const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
  const LETTRES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  def("xd-diviseurs", () => {
    const t = pick(["nombre", "nombre", "Z", "commun"]);
    if (t === "commun") {
      let a, b; do { a = rand(12, 90); b = rand(12, 90); } while (a === b || pgcd(a, b) < 2);
      const D = diviseurs(pgcd(a, b));
      return { enonce: `Combien d'entiers naturels divisent à la fois $${a}$ et $${b}$ ?`, mode: "nombre", prefixe: "Nombre de diviseurs communs :", attendu: D.length,
        erreurs: [{ valeur: D.length - 1, message: "N'oublie pas $1$, qui divise tous les entiers." }, { valeur: diviseurs(a).length + diviseurs(b).length, message: "On cherche les diviseurs **communs**, pas tous les diviseurs." }],
        aides: [`Liste les diviseurs de $${a}$.`, `Liste les diviseurs de $${b}$, puis garde ceux qui sont dans les deux listes.`, `Les diviseurs communs sont les diviseurs de $\\text{PGCD}(${a}\\,;${b}) = ${pgcd(a, b)}$.`],
        solution: `Diviseurs de $${a}$ : ${liste(diviseurs(a))}.\n\nDiviseurs de $${b}$ : ${liste(diviseurs(b))}.\n\nDiviseurs communs : ${liste(D)}, soit $${D.length}$ entiers.` };
    }
    const n = pick([rand(12, 99), rand(100, 240), pick([36, 48, 60, 72, 84, 90, 96, 100, 120, 144, 180, 210])]), D = diviseurs(n);
    const Z = t === "Z";
    return { enonce: `Combien ${Z ? "d'entiers **relatifs**" : "d'entiers naturels"} divisent $${n}$ ?`, mode: "nombre", prefixe: "Nombre de diviseurs :", attendu: Z ? 2 * D.length : D.length,
      erreurs: Z ? [{ valeur: D.length, message: "Dans $\\mathbb{Z}$, chaque diviseur positif $d$ va avec son opposé $-d$." }, { valeur: 2 * D.length - 2, message: "N'oublie pas $1$, $-1$, $" + n + "$ et $-" + n + "$." }] : [{ valeur: D.length - 2, message: `N'oublie pas $1$ et $${n}$ eux-mêmes.` }, { valeur: 2 * D.length, message: "On ne compte que les diviseurs positifs (entiers naturels)." }, { valeur: D.length - 1, message: "Il en manque un : $1$ ou le nombre lui-même ?" }],
      aides: ["Cherche les diviseurs par paires : si $d \\times d' = " + n + "$, alors $d$ et $d'$ divisent $" + n + "$.", `Il suffit de tester les entiers $d$ tels que $d^2 \\leqslant ${n}$, c'est-à-dire $d \\leqslant ${Math.floor(Math.sqrt(n))}$.`, Z ? "Dans $\\mathbb{Z}$, double le nombre de diviseurs positifs." : "Compte tous les diviseurs trouvés, sans oublier $1$ et " + n + "."],
      solution: `Diviseurs positifs de $${n}$ : ${liste(D)}, soit $${D.length}$ diviseurs.${Z ? `\n\nDans $\\mathbb{Z}$, on ajoute leurs opposés : $${2 * D.length}$ diviseurs.` : ""}` };
  });

  def("xd-division", () => {
    const b = rand(3, 25), neg = Math.random() < 0.5, q0 = rand(2, 40), r0 = rand(0, b - 1), a = neg ? -(q0 * b + r0) : q0 * b + r0;
    const q = Math.floor(a / b), r = a - b * q, quoi = pick(["r", "r", "q"]);
    const att = quoi === "r" ? r : q;
    return { enonce: `Dans la division euclidienne de $${nb(a)}$ par $${b}$, quel est le ${quoi === "r" ? "reste" : "quotient"} ?`, mode: "nombre", prefixe: quoi === "r" ? "Reste $r$ =" : "Quotient $q$ =", attendu: att,
      erreurs: quoi === "r" ? [{ valeur: a % b, message: "Le reste doit vérifier $0 \\leqslant r < " + b + "$ : il ne peut pas être négatif." }, { valeur: q, message: "Ça, c'est le quotient." }, { valeur: Math.abs(a) % b, message: "Pour un nombre négatif, le quotient est plus petit : vérifie $a = bq + r$." }] : [{ valeur: Math.trunc(a / b), message: "Avec $" + nb(a) + " = " + b + " \\times " + pr(Math.trunc(a / b)) + " + r$, le reste serait négatif : il faut prendre le quotient juste en dessous." }, { valeur: r, message: "Ça, c'est le reste." }],
      aides: [`On cherche $q$ et $r$ entiers avec $${nb(a)} = ${b}q + r$ et $0 \\leqslant r < ${b}$.`, neg ? `$${b}q$ doit être le plus grand multiple de $${b}$ inférieur ou égal à $${nb(a)}$ (attention, $${nb(a)}$ est négatif).` : `$${b}q$ est le plus grand multiple de $${b}$ inférieur ou égal à $${a}$.`, `Le multiple cherché est $${nb(b * q)}$.`],
      solution: `$${nb(a)} = ${b} \\times ${pr(q)} + ${r}$ avec $0 \\leqslant ${r} < ${b}$.\n\nLe quotient est $${nb(q)}$ et le reste $${r}$.${neg && r ? ` (Et non $${nb(a)} = ${b} \\times ${pr(Math.trunc(a / b))} ${plus(a % b)}$ : ce reste serait négatif.)` : ""}` };
  });

  def("xd-combinaison", () => {
    // n + a divise b n + c  ⇔  n + a divise K = c - a b
    const a = rand(1, 6), b = rand(2, 6), K = pick([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 21, 24]), c = K + a * b;
    const sol = diviseurs(K).filter((d) => d >= a).map((d) => d - a);
    return { enonce: `Détermine tous les entiers naturels $n$ tels que $n + ${a}$ divise $${b}n + ${c}$. Sépare les réponses par « ; ».`, mode: "ensemble", prefixe: "$n \\in$", attendu: sol,
      aides: [`Écris $${b}n + ${c}$ en faisant apparaître $n + ${a}$ : $${b}n + ${c} = ${b}(n + ${a}) + ${K}$.`, `Si $n + ${a}$ divise $${b}n + ${c}$ et $${b}(n + ${a})$, il divise leur différence $${K}$.`, `$n + ${a}$ est donc un diviseur de $${K}$ supérieur ou égal à $${a}$ (car $n \\geqslant 0$).`],
      solution: `$${b}n + ${c} = ${b}(n + ${a}) + ${K}$. Si $n + ${a}$ divise $${b}n + ${c}$, il divise la combinaison $(${b}n + ${c}) - ${b}(n + ${a}) = ${K}$. Réciproquement, si $n + ${a}$ divise $${K}$, il divise $${b}(n + ${a}) + ${K}$.\n\nDiviseurs de $${K}$ : ${liste(diviseurs(K))}. Ceux qui sont supérieurs ou égaux à $${a}$ donnent $n = d - ${a}$ : ${sol.length ? liste(sol) : "aucun"}.` };
  });

  def("xd-congruence", () => {
    const t = pick(["vrai", "vrai", "jour", "jour"]);
    if (t === "jour") {
      const j0 = rand(0, 6), d = rand(15, 400), j1 = (j0 + d) % 7, qui = pick(["Le marché de Mamoudzou", "Le premier jour du ramadan", "Une fête de village à Sada", "Le match de Koungou", "Le départ de la barge spéciale", "La rentrée de " + prenom()]);
      const ch = choix4(JOURS[j1], shuffle(JOURS.filter((_, k) => k !== j1)));
      return { enonce: `Aujourd'hui, nous sommes un **${JOURS[j0]}**. ${qui} a lieu dans $${d}$ jours. Quel jour de la semaine sera-t-on ?`, mode: "choix", choix: ch.choix.map((x) => x[0].toUpperCase() + x.slice(1)), attendu: ch.attendu,
        aides: ["Les jours de la semaine reviennent tous les $7$ jours : on travaille modulo $7$.", `Cherche le reste de la division de $${d}$ par $7$.`, `$${d} = 7 \\times ${Math.floor(d / 7)} + ${d % 7}$ : avance de $${d % 7}$ jour${d % 7 > 1 ? "s" : ""} à partir du ${JOURS[j0]}.`],
        solution: `$${d} = 7 \\times ${Math.floor(d / 7)} + ${d % 7}$, donc $${d} \\equiv ${d % 7}\\ [7]$ : dans $${d}$ jours, on sera le même jour que dans $${d % 7}$ jour${d % 7 > 1 ? "s" : ""}, c'est-à-dire un **${JOURS[j1]}**.` };
    }
    const n = rand(4, 17), a = pick([rand(20, 500), -rand(5, 200)]), r = mod(a, n);
    const bonne = `$${nb(a)} \\equiv ${r}\\ [${n}]$`;
    const f = [`$${nb(a)} \\equiv ${(r + 1) % n}\\ [${n}]$`, `$${nb(a)} \\equiv ${a % n === r ? (r + 2) % n : a % n}\\ [${n}]$`, `$${nb(a)} \\equiv ${(r + n - 1) % n}\\ [${n}]$`, `$${nb(a)} \\equiv ${(r + 3) % n}\\ [${n}]$`];
    const ch = choix4(bonne, f.filter((x) => x !== bonne));
    return { enonce: "Laquelle de ces congruences est **vraie** ?", mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["$a \\equiv b\\ [n]$ signifie que $n$ divise $a - b$.", `Cherche le reste de la division euclidienne de $${nb(a)}$ par $${n}$ (entre $0$ et $${n - 1}$).`, `$${nb(a)} = ${n} \\times ${pr(Math.floor(a / n))} + ${r}$.`],
      solution: `$${nb(a)} = ${n} \\times ${pr(Math.floor(a / n))} + ${r}$, donc $${nb(a)} - ${r}$ est un multiple de $${n}$ : $${nb(a)} \\equiv ${r}\\ [${n}]$.\n\nLes autres restes proposés sont différents de $${r}$ et compris entre $0$ et $${n - 1}$ : ils sont faux.` };
  });

  def("xd-reste-puissance", () => {
    const n = pick([3, 4, 5, 7, 8, 9, 10, 11, 13]), a = rand(2, 60), k = rand(10, 2027);
    // cycle des puissances de a modulo n
    const ar = mod(a, n), P = [1]; let x = 1;
    for (let j = 1; j <= 40; j++) { x = (x * ar) % n; P.push(x); }
    // période p à partir du rang m (puissances finalement périodiques)
    let m = 0, p = 0;
    for (let i = 0; i <= 12 && !p; i++) for (let q = 1; q <= 24; q++) if (P.slice(i, i + 12).every((v, j) => v === P[i + j + q])) { m = i; p = q; break; }
    const r = k >= m ? P[m + ((k - m) % p)] : P[k];
    const cyc = P.slice(m, m + p);
    return { enonce: `Quel est le reste de la division euclidienne de $${a}^{${k}}$ par $${n}$ ?`, mode: "nombre", prefixe: "Reste :", attendu: r,
      erreurs: [{ valeur: ar, message: `Ça, c'est le reste de $${a}$ : il faut tenir compte de la puissance.` }, { valeur: k % n, message: "On ne divise pas l'exposant par $" + n + "$ : on cherche la période des restes des puissances." }, P[k % 10] === r ? null : { valeur: P[k % 10], message: "Vérifie la période des restes." }],
      aides: [`Commence par réduire la base : $${a} \\equiv ${ar}\\ [${n}]$.`, `Calcule les restes des premières puissances de $${ar}$ modulo $${n}$ : ${P.slice(0, Math.min(m + p + 1, 8)).map((v, j) => `$${ar}^{${j}} \\equiv ${v}$`).join(", ")}.`, `Les restes se répètent avec une période de $${p}$${m ? ` à partir de l'exposant $${m}$` : ""} : regarde le reste de $${k}${m ? ` - ${m}` : ""}$ dans la division par $${p}$.`],
      solution: `$${a} \\equiv ${ar}\\ [${n}]$, donc $${a}^{${k}} \\equiv ${ar}^{${k}}\\ [${n}]$.\n\nLes restes des puissances de $${ar}$ modulo $${n}$ forment le cycle ${liste(cyc)} (période $${p}$${m ? `, à partir de l'exposant $${m}$` : ""}).\n\n${p === 1 ? `Le reste est donc toujours $${r}$.` : `$${k - m} = ${p} \\times ${Math.floor((k - m) / p)} + ${(k - m) % p}$, donc $${a}^{${k}} \\equiv ${ar}^{${m + ((k - m) % p)}} \\equiv ${r}\\ [${n}]$.`}\n\nLe reste est $${r}$.` };
  });

  def("xd-equation", () => {
    const n = rand(5, 13), a = rand(2, n - 1), b = rand(0, n - 1);
    const sol = []; for (let x = 0; x < n; x++) if ((a * x - b) % n === 0) sol.push(x);
    return { enonce: `Résous la congruence $${a}x \\equiv ${b}\\ [${n}]$, pour $x$ entier compris entre $0$ et $${n - 1}$. Sépare les solutions par « ; » (ou écris « aucun »).`, mode: "ensemble", prefixe: "$x \\in$", attendu: sol,
      aides: [`Fais un tableau : pour chaque $x$ de $0$ à $${n - 1}$, calcule le reste de $${a}x$ modulo $${n}$.`, `Garde les valeurs de $x$ pour lesquelles ce reste vaut $${b}$.`, pgcd(a, n) > 1 ? `Comme $${a}$ et $${n}$ ont un diviseur commun $${pgcd(a, n)}$, il peut y avoir plusieurs solutions… ou aucune.` : `$${a}$ et $${n}$ sont premiers entre eux : il y a exactement une solution.`],
      solution: `Restes de $${a}x$ modulo $${n}$ pour $x = 0, 1, \\dots, ${n - 1}$ : ${Array.from({ length: n }, (_, x) => `$${(a * x) % n}$`).join(" ; ")}.\n\n${sol.length ? `Le reste vaut $${b}$ pour $x = ${sol.join("$ et $x = ")}$.` : `Le reste ne vaut jamais $${b}$ : il n'y a **aucune** solution.`}` };
  });

  def("xd-critere", () => {
    const t = pick(["9", "9", "3", "11", "chiffre9", "chiffre3", "4"]);
    const N = rand(10000, 9999999), s = String(N), som = [...s].reduce((x, c) => x + +c, 0);
    if (t === "chiffre9" || t === "chiffre3") {
      const m = t === "chiffre9" ? 9 : 3, chiffres = String(rand(1000, 99999)).split(""), pos = rand(1, chiffres.length - 1);
      chiffres[pos] = "x"; const reste = chiffres.reduce((a2, c) => a2 + (c === "x" ? 0 : +c), 0);
      const sol = []; for (let x = 0; x <= 9; x++) if ((reste + x) % m === 0) sol.push(x);
      const nomb = chiffres.map((c) => (c === "x" ? "\\boxed{x}" : c)).join("");
      return { enonce: `Le nombre $${nomb}$ s'écrit avec un chiffre inconnu $x$. Pour quelles valeurs de $x$ (de $0$ à $9$) est-il divisible par $${m}$ ? Sépare les réponses par « ; ».`, mode: "ensemble", prefixe: "$x \\in$", attendu: sol,
        aides: [`$10 \\equiv 1\\ [${m}]$, donc un nombre est congru à la somme de ses chiffres modulo $${m}$.`, `La somme des chiffres connus vaut $${reste}$.`, `Il faut que $${reste} + x$ soit un multiple de $${m}$, avec $0 \\leqslant x \\leqslant 9$.`],
        solution: `Comme $10 \\equiv 1\\ [${m}]$, le nombre est congru à la somme de ses chiffres : $${reste} + x$.\n\n$${reste} + x$ est multiple de $${m}$ pour $x = ${sol.join("$, $x = ")}$.` };
    }
    let r, expl, m;
    if (t === "9" || t === "3") { m = +t; r = N % m; expl = `$10 \\equiv 1\\ [${m}]$, donc $10^k \\equiv 1\\ [${m}]$ : un nombre est congru à la somme de ses chiffres. Ici $${[...s].join(" + ")} = ${som}$ et $${som} \\equiv ${r}\\ [${m}]$.`; }
    else if (t === "11") { m = 11; r = N % 11; const alt = [...s].reverse().reduce((x, c, i) => x + (i % 2 ? -1 : 1) * +c, 0); expl = `$10 \\equiv -1\\ [11]$, donc $10^k \\equiv (-1)^k\\ [11]$ : on fait la somme alternée des chiffres, en partant des unités : $${alt}$, et $${alt} \\equiv ${r}\\ [11]$.`; }
    else { m = 4; r = N % 4; expl = `$100 = 4 \\times 25 \\equiv 0\\ [4]$ : seul le nombre formé par les deux derniers chiffres compte. $${s.slice(-2)} \\equiv ${r}\\ [4]$.`; }
    return { enonce: `Quel est le reste de la division de $${nb(N)}$ par $${m}$ ? (Utilise un critère, sans poser la division.)`, mode: "nombre", prefixe: "Reste :", attendu: r,
      erreurs: [{ valeur: som, message: "Il faut encore prendre le reste de cette somme." }, N % 10 % m === r ? null : { valeur: N % 10 % m, message: "Un seul chiffre ne suffit pas : utilise le bon critère." }, { valeur: (r + 1) % m, message: "Vérifie ton calcul." }],
      aides: [t === "11" ? "$10 \\equiv -1\\ [11]$." : t === "4" ? "$100 \\equiv 0\\ [4]$." : `$10 \\equiv 1\\ [${m}]$.`, t === "11" ? "Fais la somme alternée des chiffres : unités moins dizaines plus centaines…" : t === "4" ? "Seuls les deux derniers chiffres comptent." : "Additionne les chiffres du nombre.", `Prends le reste du résultat modulo $${m}$ (entre $0$ et $${m - 1}$).`],
      solution: `${expl}\n\nLe reste est $${r}$.` };
  });

  def("xd-chiffrement", () => {
    const a = pick([3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]), b = rand(0, 25), x = rand(0, 25), y = (a * x + b) % 26;
    const L = LETTRES[x], M = LETTRES[y];
    return { enonce: `On code une lettre de rang $x$ (A = $0$, B = $1$, …, Z = $25$) par la lettre de rang $y$, reste de $${a}x + ${b}$ modulo $26$. Quel est le rang $y$ de la lettre qui code **${L}** ?`, mode: "nombre", prefixe: "$y =$", attendu: y,
      erreurs: [{ valeur: a * x + b, message: "Il faut prendre le reste modulo $26$ (entre $0$ et $25$)." }, { valeur: (a * (x + 1) + b) % 26, message: "Attention : A a le rang $0$, pas $1$." }, { valeur: (a * x) % 26, message: "N'oublie pas d'ajouter $" + b + "$." }],
      aides: [`${L} a pour rang $x = ${x}$.`, `$${a} \\times ${x} + ${b} = ${a * x + b}$.`, "Prends le reste de la division par $26$."],
      solution: `$x = ${x}$ (lettre ${L}), puis $${a} \\times ${x} + ${b} = ${a * x + b} = 26 \\times ${Math.floor((a * x + b) / 26)} + ${y}$.\n\nDonc $y = ${y}$ : ${L} est codée par **${M}**.` };
  });

  def("xd-vrai-faux", () => vraiFaux4([
    ["Si $a$ divise $b$ et $b$ divise $c$, alors $a$ divise $c$.", true, "si $b = ka$ et $c = k'b$, alors $c = (k'k)a$."],
    ["Si $d$ divise $a$ et $b$, alors $d$ divise $3a - 5b$.", true, "un diviseur commun divise toute combinaison linéaire $au + bv$."],
    ["$-7$ divise $21$.", true, "$21 = (-7) \\times (-3)$."],
    ["$2^{10} \\equiv 1\\ [3]$.", true, "$2 \\equiv -1\\ [3]$, donc $2^{10} \\equiv (-1)^{10} = 1\\ [3]$."],
    ["Si $a \\equiv b\\ [n]$, alors $a^2 \\equiv b^2\\ [n]$.", true, "les congruences sont compatibles avec la multiplication."],
    ["Le reste de la division euclidienne de $-17$ par $5$ est $3$.", true, "$-17 = 5 \\times (-4) + 3$ avec $0 \\leqslant 3 < 5$."],
    ["Pour tout entier $n$, $n(n + 1)$ est pair.", true, "un des deux entiers consécutifs est pair."],
    ["$10 \\equiv -1\\ [11]$.", true, "$10 - (-1) = 11$."],
    ["Le reste de la division euclidienne de $-17$ par $5$ est $-2$.", false, "un reste est toujours positif : $-17 = 5 \\times (-4) + 3$, le reste est $3$."],
    ["Si $a$ divise $b + c$, alors $a$ divise $b$ et $a$ divise $c$.", false, "contre-exemple : $2$ divise $1 + 3$ mais ne divise ni $1$ ni $3$."],
    ["Si $ab \\equiv 0\\ [n]$, alors $a \\equiv 0\\ [n]$ ou $b \\equiv 0\\ [n]$.", false, "contre-exemple : $2 \\times 3 \\equiv 0\\ [6]$, alors que ni $2$ ni $3$ ne sont divisibles par $6$."],
    ["Si $2a \\equiv 2b\\ [8]$, alors $a \\equiv b\\ [8]$.", false, "contre-exemple : $2 \\times 0 \\equiv 2 \\times 4\\ [8]$, mais $0 \\not\\equiv 4\\ [8]$. On ne simplifie pas une congruence en général."],
    ["$0$ n'est divisible par aucun entier.", false, "$0 = 0 \\times k$ : $0$ est divisible par tous les entiers."],
    ["$26 \\equiv 4\\ [7]$.", false, "$26 - 4 = 22$ n'est pas un multiple de $7$ ; en fait $26 \\equiv 5\\ [7]$."],
    ["Un entier est divisible par $4$ dès que son chiffre des unités l'est.", false, "contre-exemple : $14$ se termine par $4$ mais n'est pas divisible par $4$ ; il faut regarder les deux derniers chiffres."]
  ], ["Revenir aux définitions : $a$ divise $b$ si $b = ka$ ; $a \\equiv b\\ [n]$ si $n$ divise $a - b$.", "Un reste de division euclidienne est toujours entre $0$ et $b - 1$.", "Cherche un contre-exemple avec de petits nombres."]));

  /* Figures du cours (chapitre 6) */
  FIGURES["xd-cours-division"] = () => {
    // 23 = 5 × 4 + 3 : quatre paquets de 5 et un reste de 3
    let s = `<svg class="graph" viewBox="0 0 320 120" role="img" aria-label="Division euclidienne de 23 par 5 : quatre paquets de 5 et un reste de 3, donc 23 = 5 × 4 + 3">`;
    for (let k = 0; k < 23; k++) { const g = Math.floor(k / 5), x = 14 + k * 12 + g * 8; s += `<circle cx="${x}" cy="46" r="5" style="fill:${g < 4 ? "var(--lagon)" : "var(--ylang)"}"/>`; }
    for (let g = 0; g < 4; g++) { const x0 = 8 + g * 68; s += `<rect x="${x0}" y="34" width="60" height="24" rx="6" style="fill:none;stroke:var(--lagon);stroke-width:1.5"/>`; }
    s += `<text x="120" y="84" text-anchor="middle" style="font:700 12px var(--f-texte);fill:var(--lagon)">4 paquets de 5 (quotient q = 4)</text>`;
    s += `<text x="300" y="84" text-anchor="end" style="font:700 12px var(--f-texte);fill:var(--ylang)">reste r = 3</text>`;
    s += `<text x="160" y="108" text-anchor="middle" style="font:700 13px var(--f-texte);fill:var(--encre)">23 = 5 × 4 + 3, avec 0 ≤ 3 &lt; 5</text>`;
    return s + "</svg>";
  };
  FIGURES["xd-cours-horloge"] = () => {
    // horloge modulo 7 : jours de la semaine
    let s = `<svg class="graph" viewBox="0 0 320 230" role="img" aria-label="Les jours de la semaine forment un cycle de 7 : deux dates dont l'écart est un multiple de 7 tombent le même jour">`;
    const cx0 = 160, cy0 = 115, R = 80, noms = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];
    s += `<circle cx="${cx0}" cy="${cy0}" r="${R}" style="fill:none;stroke:var(--trait);stroke-width:2;stroke-dasharray:5 4"/>`;
    noms.forEach((nm, k) => { const t = -Math.PI / 2 + (2 * Math.PI * k) / 7, x = cx0 + R * Math.cos(t), y = cy0 + R * Math.sin(t); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="17" style="fill:var(--surface);stroke:var(--lagon);stroke-width:2"/><text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle" style="font:700 11px var(--f-texte);fill:var(--encre)">${nm}</text><text x="${(cx0 + (R - 34) * Math.cos(t)).toFixed(1)}" y="${(cy0 + (R - 34) * Math.sin(t) + 4).toFixed(1)}" text-anchor="middle" style="font:11px var(--f-texte);fill:var(--doux)">${k}</text>`; });
    s += `<text x="${cx0}" y="${cy0 + 4}" text-anchor="middle" style="font:700 12px var(--f-texte);fill:var(--lagon)">modulo 7</text>`;
    return s + "</svg>";
  };


  /* ---------- Chapitre 7 : PGCD, théorèmes de Bézout et de Gauss (préfixe xb) ---------- */
  // Algorithme d'Euclide étendu : [g, u, v] avec au + bv = g
  const euclideEtendu = (a, b) => { let [r0, r1, u0, u1, v0, v1] = [a, b, 1, 0, 0, 1]; while (r1) { const q = Math.floor(r0 / r1); [r0, r1] = [r1, r0 - q * r1]; [u0, u1] = [u1, u0 - q * u1]; [v0, v1] = [v1, v0 - q * v1]; } return [r0, u0, v0]; };
  // Étapes de l'algorithme d'Euclide : lignes « a = b × q + r »
  const etapesEuclide = (a, b) => { const L = []; while (b) { L.push(`$${nb(a)} = ${nb(b)} \\times ${Math.floor(a / b)} + ${nb(a % b)}$`); [a, b] = [b, a % b]; } return L; };
  const ppcm = (a, b) => (a / pgcd(a, b)) * b;

  def("xb-pgcd", () => {
    const g = pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 17, 18, 21, 24]);
    let p, q; do { p = rand(3, 90); q = rand(3, 90); } while (p === q || pgcd(p, q) !== 1);
    const a = g * Math.max(p, q), b = g * Math.min(p, q);
    const E = etapesEuclide(a, b);
    return { enonce: `Calcule $\\text{PGCD}(${nb(a)}\\,;${nb(b)})$.`, mode: "nombre", prefixe: "PGCD :", attendu: g,
      erreurs: [{ valeur: ppcm(a, b), message: "Ça, c'est le PPCM (plus petit multiple commun). On cherche le plus grand diviseur commun." }, { valeur: b, message: `$${nb(b)}$ ne divise pas $${nb(a)}$ : il ne peut pas être le PGCD.` }, { valeur: a % b, message: "Ce n'est que le premier reste : continue l'algorithme d'Euclide jusqu'à un reste nul." }],
      aides: ["Algorithme d'Euclide : $\\text{PGCD}(a\\,;b) = \\text{PGCD}(b\\,;r)$, où $r$ est le reste de la division de $a$ par $b$.", `Première étape : ${E[0]}.`, "Recommence jusqu'à obtenir un reste nul : le PGCD est le dernier reste non nul."],
      solution: `Algorithme d'Euclide :\n\n${E.join("\n\n")}\n\nLe dernier reste non nul est $${g}$ : $\\text{PGCD}(${nb(a)}\\,;${nb(b)}) = ${g}$.` };
  });

  def("xb-premiers", () => {
    const paires = [];
    let bon; do { bon = [rand(6, 99), rand(6, 99)]; } while (pgcd(...bon) !== 1 || bon[0] === bon[1]);
    while (paires.length < 3) { const g = pick([2, 3, 5, 7, 11, 13]), x = [g * rand(2, 20), g * rand(2, 20)]; if (x[0] !== x[1] && x[0] < 140 && x[1] < 140) paires.push(x); }
    const tx = ([a, b]) => `$${a}$ et $${b}$`;
    const ch = choix4(tx(bon), paires.map(tx));
    return { enonce: "Lequel de ces couples est formé de deux nombres **premiers entre eux** ?", mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Deux nombres sont premiers entre eux quand leur PGCD vaut $1$ : leur seul diviseur commun positif est $1$.", "Cherche un diviseur commun évident : $2$ (pairs), $3$ (somme des chiffres), $5$ (finissent par $0$ ou $5$)…", "Pour être sûr, calcule le PGCD avec l'algorithme d'Euclide."],
      solution: `$\\text{PGCD}(${bon[0]}\\,;${bon[1]}) = 1$ : ${tx(bon)} sont premiers entre eux.\n\n${paires.map(([a, b]) => `- $\\text{PGCD}(${a}\\,;${b}) = ${pgcd(a, b)}$.`).join("\n")}` };
  });

  def("xb-bezout", () => {
    let a, b; do { a = rand(5, 60); b = rand(5, 60); } while (a === b || pgcd(a, b) !== 1);
    const [, u0, v0] = euclideEtendu(a, b), k = rand(-2, 2), u = u0 + k * b, v = v0 - k * a, quoi = pick(["v", "u"]);
    const enonce = quoi === "v" ? `$${a}$ et $${b}$ sont premiers entre eux. Trouve l'entier $v$ tel que $${a} \\times ${pr(u)} + ${b}v = 1$.` : `$${a}$ et $${b}$ sont premiers entre eux. Trouve l'entier $u$ tel que $${a}u + ${b} \\times ${pr(v)} = 1$.`;
    const att = quoi === "v" ? v : u;
    return { enonce, mode: "nombre", prefixe: `$${quoi} =$`, attendu: att,
      erreurs: [{ valeur: -att, message: "Attention au signe." }, { valeur: quoi === "v" ? (1 + a * u) / b : (1 + b * v) / a, message: "En isolant le terme inconnu, on soustrait : $" + (quoi === "v" ? `${b}v = 1 - ${a} \\times ${pr(u)}` : `${a}u = 1 - ${b} \\times ${pr(v)}`) + "$." }],
      aides: [quoi === "v" ? `Calcule $${a} \\times ${pr(u)} = ${a * u}$.` : `Calcule $${b} \\times ${pr(v)} = ${b * v}$.`, quoi === "v" ? `Alors $${b}v = 1 - ${pr(a * u)} = ${1 - a * u}$.` : `Alors $${a}u = 1 - ${pr(b * v)} = ${1 - b * v}$.`, `Divise par $${quoi === "v" ? b : a}$.`],
      solution: quoi === "v" ? `$${b}v = 1 - ${a} \\times ${pr(u)} = ${1 - a * u}$, donc $v = \\dfrac{${1 - a * u}}{${b}} = ${v}$.\n\nVérification : $${a} \\times ${pr(u)} + ${b} \\times ${pr(v)} = ${a * u} ${plus(b * v)} = 1$.` : `$${a}u = 1 - ${b} \\times ${pr(v)} = ${1 - b * v}$, donc $u = \\dfrac{${1 - b * v}}{${a}} = ${u}$.\n\nVérification : $${a} \\times ${pr(u)} + ${b} \\times ${pr(v)} = ${a * u} ${plus(b * v)} = 1$.` };
  });

  def("xb-inverse", () => {
    let n, a; do { n = rand(7, 31); a = rand(2, n - 1); } while (pgcd(a, n) !== 1);
    let inv = 1; while ((a * inv) % n !== 1) inv++;
    const [, u] = euclideEtendu(a, n);
    return { enonce: `Détermine l'inverse de $${a}$ modulo $${n}$, c'est-à-dire l'entier $x$ entre $0$ et $${n - 1}$ tel que $${a}x \\equiv 1\\ [${n}]$.`, mode: "nombre", prefixe: "$x =$", attendu: inv,
      erreurs: [{ valeur: n - inv, message: `Vérifie : $${a} \\times ${n - inv} = ${a * (n - inv)} \\equiv ${(a * (n - inv)) % n}\\ [${n}]$, pas $1$.` }, { valeur: u, message: "Ce coefficient de Bézout convient, mais il faut le ramener entre $0$ et $" + (n - 1) + "$." }, { valeur: a, message: "On cherche $x$ tel que $" + a + "x \\equiv 1$." }],
      aides: [`$${a}$ et $${n}$ sont premiers entre eux : d'après Bézout, il existe $u$, $v$ avec $${a}u + ${n}v = 1$, donc $${a}u \\equiv 1\\ [${n}]$.`, n <= 13 ? `Teste les valeurs de $x$ : $${a} \\times 1$, $${a} \\times 2$… modulo $${n}$.` : `L'algorithme d'Euclide étendu donne $${a} \\times ${pr(u)} + ${n} \\times ${pr((1 - a * u) / n)} = 1$.`, "Ramène $u$ entre $0$ et $" + (n - 1) + "$ en ajoutant ou retirant des multiples de $" + n + "$."],
      solution: `$${a} \\times ${pr(u)} + ${n} \\times ${pr((1 - a * u) / n)} = 1$, donc $${a} \\times ${pr(u)} \\equiv 1\\ [${n}]$.\n\n$${u} \\equiv ${inv}\\ [${n}]$ : l'inverse est $${inv}$. Vérification : $${a} \\times ${inv} = ${a * inv} = ${n} \\times ${Math.floor((a * inv) / n)} + 1$.` };
  });

  def("xb-gauss", () => {
    const t = pick(["plusPetit", "plusPetit", "choix"]);
    if (t === "plusPetit") {
      const k = rand(6, 60), a = rand(2, 40), g = pgcd(k, a), att = k / g;
      return { enonce: `Quel est le plus petit entier naturel non nul $n$ tel que $${k}$ divise $${a}n$ ?`, mode: "nombre", prefixe: "$n =$", attendu: att,
        erreurs: [{ valeur: k, message: g > 1 ? `$${k}$ et $${a}$ ont des facteurs communs : on peut faire plus petit.` : "C'est le bon raisonnement… vérifie le calcul." }, { valeur: g, message: "Ça, c'est le PGCD. Utilise-le pour simplifier." }, { valeur: k * a, message: "On cherche le plus petit $n$." }],
        aides: [`$\\text{PGCD}(${k}\\,;${a}) = ${g}$.`, g > 1 ? `Divise par $${g}$ : $${k / g}$ divise $${coef(a / g, "n")}$, avec $${k / g}$ et $${a / g}$ premiers entre eux.` : `$${k}$ et $${a}$ sont premiers entre eux.`, `Théorème de Gauss : $${k / g}$ divise alors $n$.`],
        solution: `$\\text{PGCD}(${k}\\,;${a}) = ${g}$.${g > 1 ? ` On écrit $${k} = ${g} \\times ${k / g}$ et $${a} = ${g} \\times ${a / g}$ : $${k}$ divise $${a}n$ si et seulement si $${k / g}$ divise $${coef(a / g, "n")}$.` : ""}\n\nComme $${k / g}$ et $${a / g}$ sont premiers entre eux, le théorème de Gauss donne : $${k / g}$ divise $n$. Le plus petit $n$ non nul est $${att}$.` };
    }
    // a x = b y avec a, b premiers entre eux
    let a, b; do { a = rand(3, 25); b = rand(3, 25); } while (a === b || pgcd(a, b) !== 1);
    const bonne = `$${b}$ divise $x$`;
    const ch = choix4(bonne, [`$${a}$ divise $x$`, `$${a * b}$ divise $x$`, `$x = ${b}$`, `$${b}$ divise $y$`]);
    return { enonce: `$x$ et $y$ sont des entiers tels que $${a}x = ${b}y$. Que peut-on affirmer ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`$${b}$ divise $${b}y$, donc $${b}$ divise $${a}x$.`, `$\\text{PGCD}(${a}\\,;${b}) = 1$.`, "Théorème de Gauss : si $c$ divise $ab$ et $c$ est premier avec $a$, alors $c$ divise $b$."],
      solution: `$${b}$ divise $${b}y = ${a}x$. Comme $${b}$ et $${a}$ sont premiers entre eux, le théorème de Gauss donne : **$${b}$ divise $x$** (et de même $${a}$ divise $y$).\n\n$x = ${b}$ n'est qu'un cas particulier : $x = ${2 * b}$, $y = ${2 * a}$ convient aussi.` };
  });

  def("xb-diophante", () => {
    let a, b; do { a = rand(2, 15); b = rand(2, 15); } while (a === b || pgcd(a, b) !== 1);
    const c = rand(1, 60), [, u, v] = euclideEtendu(a, b);
    const x0 = u * c, y0 = v * c; // solution particulière
    // forme réduite de la solution particulière : x0 ramené entre 0 et b-1
    const q = Math.floor(x0 / b), xr = x0 - q * b, yr = y0 + q * a;
    const lin = (c0, k, s) => (c0 ? `${nb(c0)} ${s} ${k}k` : `${s === "-" ? "-" : ""}${k}k`); // c0 + k·k ou c0 - k·k
    const couple = (k1, s1, k2, s2) => `(${lin(xr, k1, s1)}\\,;${lin(yr, k2, s2)})`;
    const sol = couple(b, "+", a, "-");
    const bonne = `$${sol}$, $k \\in \\mathbb{Z}$`;
    const f = [couple(a, "+", b, "-"), couple(b, "+", a, "+"), couple(b, "-", a, "-")].map((x) => `$${x}$, $k \\in \\mathbb{Z}$`).concat([`$(${nb(xr)}\\,;${nb(yr)})$ seulement`]);
    const ch = choix4(bonne, f);
    const xmoins = xr ? `x - ${nb(xr)}` : "x", ymoins2 = yr ? `y - ${pr(yr)}` : "y";
    const ymoins = yr ? `${pr(yr)} - y` : "-y";
    return { enonce: `On cherche les couples d'entiers $(x\\,;y)$ tels que $${a}x + ${b}y = ${c}$. On remarque que $(${nb(xr)}\\,;${nb(yr)})$ est une solution. Quelles sont toutes les solutions ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`Soustrais : $${a}(${xmoins}) + ${b}(${ymoins2}) = 0$, donc $${a}(${xmoins}) = ${b}(${ymoins})$.`, `$${b}$ divise $${a}(${xmoins})$ et $\\text{PGCD}(${a}\\,;${b}) = 1$ : par Gauss, $${xmoins} = ${b}k$.`, `En remplaçant, $${ymoins} = ${a}k$.`],
      solution: `$${a}x + ${b}y = ${c}$ et $${a} \\times ${pr(xr)} + ${b} \\times ${pr(yr)} = ${c}$. Par différence : $${a}(${xmoins}) = ${b}(${ymoins})$.\n\n$${b}$ divise $${a}(${xmoins})$ et est premier avec $${a}$ : d'après le théorème de Gauss, $${xmoins} = ${b}k$ avec $k$ entier. Alors $${a} \\times ${b}k = ${b}(${ymoins})$, d'où $y = ${lin(yr, a, "-")}$.\n\nRéciproquement, ces couples conviennent : $S = \\{${sol},\\ k \\in \\mathbb{Z}\\}$.` };
  });

  def("xb-diophante-n", () => {
    let a, b; do { a = rand(2, 9); b = rand(2, 12); } while (a === b || pgcd(a, b) !== 1);
    const c = rand(20, 120);
    const sol = []; for (let x = 0; a * x <= c; x++) if ((c - a * x) % b === 0) sol.push([x, (c - a * x) / b]);
    const [o1, o2, lieu] = pick([["mangues", "ananas", "au marché de Mamoudzou"], ["cahiers", "stylos", "à la papeterie de Dzaoudzi"], ["tickets de bus", "tickets de barge", "au guichet"], ["bouteilles d'eau", "brochettes", "à la buvette du stade de Cavani"], ["samoussas", "jus de fruits", "à la vente de gâteaux du lycée"]]);
    return { enonce: `${prenom()} dépense exactement $${c}$ € ${lieu} en achetant des ${o1} à $${a}$ € pièce et des ${o2} à $${b}$ € pièce (au moins zéro de chaque). De combien de façons est-ce possible ?`,
      mode: "nombre", prefixe: "Nombre de possibilités :", attendu: sol.length,
      erreurs: [{ valeur: sol.length + 1, message: "Vérifie chaque cas : les deux nombres doivent être des entiers positifs ou nuls." }, { valeur: Math.max(0, sol.length - 1), message: "N'oublie pas les cas où l'un des deux nombres est nul." }],
      aides: [`Avec $x$ ${o1} et $y$ ${o2} : $${a}x + ${b}y = ${c}$, avec $x$ et $y$ entiers naturels.`, `Pour chaque $x$ de $0$ à $${Math.floor(c / a)}$, regarde si $${c} - ${a}x$ est un multiple de $${b}$.`, `Les solutions entières s'écrivent $x = x_0 + ${b}k$ : elles sont espacées de $${b}$.`],
      solution: `On résout $${a}x + ${b}y = ${c}$ avec $x \\geqslant 0$ et $y \\geqslant 0$.\n\n${sol.length ? `Les couples $(x\\,;y)$ qui conviennent sont : ${sol.map(([x, y]) => `$(${x}\\,;${y})$`).join(", ")}.\n\nIl y a donc $${sol.length}$ possibilité${sol.length > 1 ? "s" : ""}.` : "Aucun couple ne convient : il y a $0$ possibilité."}` };
  });

  def("xb-vrai-faux", () => vraiFaux4([
    ["$\\text{PGCD}(a\\,;b) = \\text{PGCD}(b\\,;r)$, où $r$ est le reste de la division de $a$ par $b$.", true, "c'est le principe de l'algorithme d'Euclide."],
    ["Si $\\text{PGCD}(a\\,;b) = 1$, il existe des entiers $u$ et $v$ tels que $au + bv = 1$.", true, "c'est le théorème de Bézout."],
    ["Si $a$ divise $bc$ et que $a$ est premier avec $b$, alors $a$ divise $c$.", true, "c'est le théorème de Gauss."],
    ["Deux entiers consécutifs sont toujours premiers entre eux.", true, "$(n + 1) - n = 1$ : un diviseur commun divise $1$."],
    ["Si $3$ et $4$ divisent $n$, alors $12$ divise $n$.", true, "$3$ et $4$ sont premiers entre eux, donc leur produit divise $n$."],
    ["$5$ a un inverse modulo $12$.", true, "$5 \\times 5 = 25 \\equiv 1\\ [12]$."],
    ["Le PGCD de deux entiers divise toute combinaison $au + bv$.", true, "il divise $a$ et $b$, donc toute combinaison linéaire."],
    ["L'équation $4x + 6y = 1$ a des solutions entières.", false, "$4x + 6y$ est toujours pair : il ne peut pas valoir $1$ (le PGCD $2$ ne divise pas $1$)."],
    ["Si $2$ et $6$ divisent $n$, alors $12$ divise $n$.", false, "contre-exemple : $n = 6$ ; $2$ et $6$ ne sont pas premiers entre eux."],
    ["Si $6$ divise $ab$, alors $6$ divise $a$ ou $6$ divise $b$.", false, "contre-exemple : $6$ divise $2 \\times 3$."],
    ["$\\text{PGCD}(12\\,;18) = 36$.", false, "$36$ est le PPCM ; le PGCD vaut $6$."],
    ["$4$ a un inverse modulo $10$.", false, "$4x$ est toujours pair, donc jamais congru à $1$ modulo $10$ : $4$ et $10$ ne sont pas premiers entre eux."],
    ["Si $au + bv = 2$, alors $\\text{PGCD}(a\\,;b) = 2$.", false, "on sait seulement que le PGCD divise $2$ : contre-exemple $3 \\times 2 + 4 \\times (-1) = 2$, alors que $\\text{PGCD}(3\\,;4) = 1$."],
    ["Les couples d'entiers solutions de $ax + by = c$ sont en nombre fini.", false, "quand il y en a une, il y en a une infinité : $(x_0 + b'k\\,;y_0 - a'k)$."]
  ], ["Rappelle les énoncés exacts de Bézout et de Gauss, avec leurs hypothèses.", "Pour un contre-exemple, essaie de petits nombres comme $2$, $3$, $4$, $6$.", "« Premiers entre eux » signifie PGCD égal à $1$."]));

  /* Figure du cours (chapitre 7) */
  FIGURES["xb-cours-euclide"] = () => {
    // rectangle 21 × 8 découpé en carrés : 21 = 8×2 + 5, 8 = 5×1 + 3, 5 = 3×1 + 2, 3 = 2×1 + 1, 2 = 1×2
    const u = 13.6, x0 = 10, y0 = 14; let s = `<svg class="graph" viewBox="0 0 320 150" role="img" aria-label="Un rectangle de 21 sur 8 découpé en carrés de plus en plus petits : 8, 8, 5, 3, 2, 1, 1 ; le dernier carré mesure 1, c'est le PGCD de 21 et 8">`;
    const carres = [[0, 0, 8], [8, 0, 8], [16, 0, 5], [16, 5, 3], [19, 5, 2], [19, 7, 1], [20, 7, 1]];
    const coul = ["var(--lagon)", "var(--lagon)", "var(--courbe2)", "var(--ylang)", "var(--bon)", "var(--encre)", "var(--encre)"];
    carres.forEach(([x, y, c], k) => { s += `<rect x="${(x0 + x * u).toFixed(1)}" y="${(y0 + y * u).toFixed(1)}" width="${(c * u).toFixed(1)}" height="${(c * u).toFixed(1)}" style="fill:${coul[k]};fill-opacity:0.18;stroke:${coul[k]};stroke-width:1.5"/>`; if (c > 1) s += `<text x="${(x0 + (x + c / 2) * u).toFixed(1)}" y="${(y0 + (y + c / 2) * u + 4).toFixed(1)}" text-anchor="middle" style="font:700 ${c > 2 ? 13 : 10}px var(--f-texte);fill:var(--encre)">${c}</text>`; });
    s += `<text x="160" y="142" text-anchor="middle" style="font:700 12px var(--f-texte);fill:var(--encre)">PGCD(21 ; 8) = 1 : le plus petit carré</text>`;
    return s + "</svg>";
  };


  /* ---------- Chapitre 8 : nombres premiers (préfixe xn) ---------- */
  const estPremier = (n) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
  const PREMIERS = Array.from({ length: 400 }, (_, k) => k).filter(estPremier);
  const facteurs = (n) => { const F = []; for (let p = 2; p * p <= n; p++) { let e = 0; while (n % p === 0) { n /= p; e++; } if (e) F.push([p, e]); } if (n > 1) F.push([n, 1]); return F; };
  const decompTex = (F) => F.map(([p, e]) => (e === 1 ? nb(p) : `${p}^{${e}}`)).join(" \\times ");
  // Composés « trompeurs » (sans petit facteur évident 2, 3, 5)
  const COMPOSES = [49, 77, 91, 119, 121, 133, 143, 161, 169, 187, 203, 209, 217, 221, 247, 253, 259, 287, 289, 299, 301, 319, 323, 329, 341, 343, 361, 371, 377, 391, 403, 407, 413, 427, 437, 451, 469, 473, 481, 493, 497, 511, 517, 527, 529, 533, 539, 551, 553, 559, 581, 583, 589];

  def("xn-premier", () => {
    const p = pick(PREMIERS.filter((x) => x > 50));
    const f = shuffle(COMPOSES.slice()).slice(0, 3).map((x) => `$${x}$`);
    const ch = choix4(`$${p}$`, f);
    const autres = ch.choix.filter((_, k) => k !== ch.attendu).map((s) => +s.replace(/\$/g, ""));
    return { enonce: "Lequel de ces nombres est **premier** ?", mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Un nombre premier n'a que deux diviseurs : $1$ et lui-même.", "Pour tester $n$, il suffit d'essayer les nombres premiers $p$ tels que $p^2 \\leqslant n$.", "Essaie $7$, $11$, $13$, $17$, $19$… sur chaque proposition."],
      solution: `$${p}$ n'est divisible par aucun nombre premier $p$ tel que $p^2 \\leqslant ${p}$ : il est premier.\n\n${autres.map((x) => { const d = facteurs(x)[0][0]; return `- $${x} = ${d} \\times ${x / d}$ n'est pas premier.`; }).join("\n")}` };
  });

  def("xn-test", () => {
    const n = rand(30, 2000), r = Math.floor(Math.sqrt(n)), p = [...PREMIERS].reverse().find((x) => x <= r);
    const suiv = PREMIERS.find((x) => x > r);
    return { enonce: `Pour savoir si $${nb(n)}$ est premier, on teste sa divisibilité par les nombres premiers dans l'ordre croissant. Quel est le **plus grand** nombre premier qu'il faut essayer, au maximum ?`, mode: "nombre", prefixe: "Plus grand premier à tester :", attendu: p,
      erreurs: [{ valeur: suiv, message: `$${suiv}^2 = ${suiv * suiv} > ${n}$ : ce n'est pas la peine d'aller jusque-là.` }, { valeur: r, message: estPremier(r) ? "C'est bien la borne, mais vérifie." : `$${r}$ n'est pas premier : on ne teste que des nombres premiers.` }, { valeur: Math.floor(n / 2), message: "Inutile d'aller jusqu'à la moitié : la racine carrée suffit." }],
      aides: ["Si $n$ n'est pas premier, il a un diviseur premier $p$ tel que $p^2 \\leqslant n$.", `$\\sqrt{${n}} \\approx ${nb(+Math.sqrt(n).toFixed(2))}$.`, `Cherche le plus grand nombre premier inférieur ou égal à $${r}$.`],
      solution: `Si $${nb(n)}$ a un diviseur autre que $1$ et lui-même, il en a un premier $p$ avec $p^2 \\leqslant ${nb(n)}$, c'est-à-dire $p \\leqslant \\sqrt{${nb(n)}} \\approx ${nb(+Math.sqrt(n).toFixed(2))}$.\n\nLe plus grand nombre premier à tester est donc $${p}$ ($${suiv}^2 = ${suiv * suiv} > ${nb(n)}$).${estPremier(n) ? ` En testant, on trouve que $${nb(n)}$ est premier.` : ` Ici, $${nb(n)} = ${decompTex(facteurs(n))}$ n'est pas premier.`}` };
  });

  def("xn-decomposition", () => {
    let F; do { const ps = shuffle([2, 3, 5, 7, 11, 13].slice()).slice(0, rand(2, 3)).sort((x, y) => x - y); F = ps.map((p) => [p, p < 6 ? rand(1, 4) : rand(1, 2)]); } while (F.reduce((s, [p, e]) => s * p ** e, 1) > 6000);
    const n = F.reduce((s, [p, e]) => s * p ** e, 1);
    const bonne = `$${decompTex(F)}$`;
    const f1 = F.map(([p, e], k) => [p, k === 0 ? e + 1 : e]), f2 = F.map(([p, e], k) => [p, k === F.length - 1 && e > 1 ? e - 1 : e]);
    const f3 = F[0][0] === 2 && F[0][1] >= 2 ? `$4 \\times ${decompTex([[2, F[0][1] - 2]].filter(([, e]) => e).concat(F.slice(1)))}$`.replace("$4 \\times $", "$4$") : `$${decompTex(F.map(([p, e]) => [p, e + (e === 1 ? 1 : 0)]))}$`;
    const f4 = `$${F.map(([p, e]) => `${p} \\times ${e}`).join(" \\times ")}$`;
    const ch = choix4(bonne, [`$${decompTex(f1)}$`, `$${decompTex(f2)}$`, f3, f4]);
    return { enonce: `Quelle est la décomposition de $${nb(n)}$ en produit de facteurs premiers ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Divise par $2$ tant que c'est possible, puis par $3$, par $5$, par $7$…", "Chaque facteur de la décomposition doit être un nombre **premier** ($4$, $6$, $9$ ne le sont pas).", "Vérifie en recalculant le produit."],
      solution: `En divisant successivement par les nombres premiers : $${nb(n)} = ${decompTex(F)}$.\n\nVérification : ${F.map(([p, e]) => `$${p}^{${e}} = ${p ** e}$`).join(", ")} et le produit vaut bien $${nb(n)}$.` };
  });

  def("xn-nombre-diviseurs", () => {
    const k = rand(1, 3), ps = shuffle([2, 3, 5, 7, 11, 13, 17].slice()).slice(0, k + 1).sort((x, y) => x - y);
    const F = ps.map((p) => [p, rand(1, 5)]), att = F.reduce((s, [, e]) => s * (e + 1), 1);
    return { enonce: `On donne $n = ${decompTex(F)}$. Combien $n$ a-t-il de diviseurs positifs ?`, mode: "nombre", prefixe: "Nombre de diviseurs :", attendu: att,
      erreurs: [{ valeur: F.reduce((s, [, e]) => s * e, 1), message: "Il faut ajouter $1$ à chaque exposant : l'exposant $0$ est aussi possible." }, { valeur: F.reduce((s, [, e]) => s + e + 1, 0), message: "On multiplie les nombres de choix, on ne les additionne pas." }, { valeur: F.reduce((s, [, e]) => s + e, 0), message: "Un diviseur s'écrit avec les mêmes facteurs premiers et des exposants de $0$ jusqu'à ceux de $n$ : compte les choix pour chaque exposant." }],
      aides: [`Un diviseur de $n$ s'écrit $${F.map(([p], i) => `${p}^{${"abcd"[i]}}`).join(" \\times ")}$ avec des exposants compris entre $0$ et ceux de $n$.`, `Il y a ${F.map(([p, e]) => `$${e + 1}$ choix pour l'exposant de $${p}$`).join(", ")}.`, "Principe multiplicatif : multiplie les nombres de choix."],
      solution: `Un diviseur s'écrit $${F.map(([p], i) => `${p}^{${"abcd"[i]}}`).join(" \\times ")}$ avec ${F.map(([, e], i) => `$0 \\leqslant ${"abcd"[i]} \\leqslant ${e}$`).join(", ")}.\n\nNombre de diviseurs : $${F.map(([, e]) => `(${e} + 1)`).join(" \\times ")} = ${att}$.` };
  });

  def("xn-pgcd-decomp", () => {
    const ps = [2, 3, 5, 7].slice(0, rand(3, 4));
    const A = ps.map((p) => [p, rand(0, 4)]), B = ps.map((p) => [p, rand(0, 4)]);
    const clean = (F) => F.filter(([, e]) => e);
    if (!clean(A).length || !clean(B).length) { A[0][1] = 2; B[0][1] = 1; }
    const quoi = pick(["PGCD", "PGCD", "PPCM"]);
    const G = ps.map((p, i) => [p, quoi === "PGCD" ? Math.min(A[i][1], B[i][1]) : Math.max(A[i][1], B[i][1])]);
    const val = G.reduce((s, [p, e]) => s * p ** e, 1), autre = ps.map((p, i) => [p, quoi === "PGCD" ? Math.max(A[i][1], B[i][1]) : Math.min(A[i][1], B[i][1])]).reduce((s, [p, e]) => s * p ** e, 1);
    const tex = (F) => decompTex(clean(F)) || "1";
    return { enonce: `On donne $a = ${tex(A)}$ et $b = ${tex(B)}$. Calcule le ${quoi} de $a$ et $b$ (donne sa valeur, pas sa décomposition).`, mode: "nombre", prefixe: `${quoi} :`, attendu: val,
      erreurs: [{ valeur: autre, message: quoi === "PGCD" ? "Ça, c'est le PPCM : pour le PGCD, on prend le **plus petit** exposant de chaque facteur." : "Ça, c'est le PGCD : pour le PPCM, on prend le **plus grand** exposant de chaque facteur." }, { valeur: A.reduce((s, [p, e]) => s * p ** e, 1) * B.reduce((s, [p, e]) => s * p ** e, 1), message: "Le produit $ab$ n'est pas le " + quoi + "." }],
      aides: [`Pour le ${quoi}, on garde chaque facteur premier avec le **plus ${quoi === "PGCD" ? "petit" : "grand"}** de ses deux exposants.`, `${ps.map((p, i) => `$${p}$ : exposants $${A[i][1]}$ et $${B[i][1]}$`).join(" ; ")}.`, `Le ${quoi} vaut $${tex(G)}$ : calcule ce produit.`],
      solution: `On prend, pour chaque facteur premier, le plus ${quoi === "PGCD" ? "petit" : "grand"} exposant : ${quoi} $= ${tex(G)} = ${nb(val)}$.` };
  });

  def("xn-fermat", () => {
    const p = pick([5, 7, 11, 13, 17, 19, 23, 29, 31]), k = rand(50, 3000);
    let a; do { a = rand(2, 60); } while (a % p === 0);
    const e = k % (p - 1), ar = mod(a, p);
    let r = 1; for (let j = 0; j < e; j++) r = (r * ar) % p;
    return { enonce: `$${p}$ est un nombre premier. À l'aide du petit théorème de Fermat, détermine le reste de la division de $${a}^{${k}}$ par $${p}$.`, mode: "nombre", prefixe: "Reste :", attendu: r,
      erreurs: [{ valeur: 1, message: `$${a}^{${p - 1}} \\equiv 1\\ [${p}]$, mais l'exposant $${k}$ n'est pas forcément un multiple de $${p - 1}$.` }, { valeur: ar, message: "Ça, c'est le reste de la base seulement." }, { valeur: (() => { let x = 1; for (let j = 0; j < k % p; j++) x = (x * ar) % p; return x; })(), message: `On divise l'exposant par $p - 1 = ${p - 1}$, pas par $${p}$.` }],
      aides: [`$${a}$ n'est pas divisible par $${p}$, donc d'après Fermat : $${a}^{${p - 1}} \\equiv 1\\ [${p}]$.`, `$${k} = ${p - 1} \\times ${Math.floor(k / (p - 1))} + ${e}$, donc $${a}^{${k}} \\equiv ${a}^{${e}}\\ [${p}]$.`, `Calcule $${a}^{${e}}$ modulo $${p}$, en remplaçant d'abord $${a}$ par $${ar}$.`],
      solution: `$${p}$ est premier et ne divise pas $${a}$ : $${a}^{${p - 1}} \\equiv 1\\ [${p}]$ (petit théorème de Fermat).\n\n$${k} = ${p - 1} \\times ${Math.floor(k / (p - 1))} + ${e}$, donc $${a}^{${k}} = \\left(${a}^{${p - 1}}\\right)^{${Math.floor(k / (p - 1))}} \\times ${a}^{${e}} \\equiv ${a}^{${e}}\\ [${p}]$.\n\nAvec $${a} \\equiv ${ar}\\ [${p}]$ : $${ar}^{${e}} \\equiv ${r}\\ [${p}]$. Le reste est $${r}$.` };
  });

  def("xn-carre", () => {
    let F; do { const ps = shuffle([2, 3, 5, 7, 11].slice()).slice(0, rand(2, 3)).sort((x, y) => x - y); F = ps.map((p) => [p, rand(1, 4)]); } while (F.every(([, e]) => e % 2 === 0) || F.reduce((s, [p, e]) => s * p ** e, 1) > 20000);
    const n = F.reduce((s, [p, e]) => s * p ** e, 1), k = F.filter(([, e]) => e % 2).reduce((s, [p]) => s * p, 1);
    return { enonce: `Quel est le plus petit entier naturel non nul $k$ tel que $${nb(n)} \\times k$ soit le carré d'un entier ?`, mode: "nombre", prefixe: "$k =$", attendu: k,
      erreurs: [{ valeur: n, message: "Ça marche, mais on peut faire plus petit." }, { valeur: F.filter(([, e]) => e % 2).reduce((s, [p]) => s * p * p, 1), message: "Un seul facteur suffit pour rendre chaque exposant pair." }],
      aides: [`Décompose : $${nb(n)} = ${decompTex(F)}$.`, "Un entier est un carré si et seulement si tous les exposants de sa décomposition sont pairs.", "Multiplie par chaque facteur premier qui a un exposant impair."],
      solution: `$${nb(n)} = ${decompTex(F)}$. Les exposants impairs sont ceux de ${F.filter(([, e]) => e % 2).map(([p]) => `$${p}$`).join(", ")}.\n\nIl faut multiplier par $k = ${F.filter(([, e]) => e % 2).map(([p]) => p).join(" \\times ")} = ${k}$ : on obtient $${decompTex(F.map(([p, e]) => [p, e + (e % 2)]))} = ${nb(n * k)} = ${nb(Math.sqrt(n * k))}^2$.` };
  });

  def("xn-vrai-faux", () => vraiFaux4([
    ["Il existe une infinité de nombres premiers.", true, "c'est le théorème d'Euclide, démontré dans le cours."],
    ["Tout entier $n \\geqslant 2$ admet au moins un diviseur premier.", true, "son plus petit diviseur supérieur à $1$ est premier."],
    ["Si un nombre premier $p$ divise $ab$, alors $p$ divise $a$ ou $p$ divise $b$.", true, "si $p$ ne divise pas $a$, il est premier avec $a$ et Gauss donne $p \\mid b$."],
    ["$2^{12} \\equiv 1\\ [13]$.", true, "$13$ est premier et ne divise pas $2$ : petit théorème de Fermat."],
    ["$2$ est le seul nombre premier pair.", true, "tout autre nombre pair est divisible par $2$."],
    ["$91$ n'est pas premier.", true, "$91 = 7 \\times 13$."],
    ["$360$ a $24$ diviseurs positifs.", true, "$360 = 2^3 \\times 3^2 \\times 5$, donc $(3 + 1)(2 + 1)(1 + 1) = 24$."],
    ["$1$ est un nombre premier.", false, "un nombre premier a exactement deux diviseurs ; $1$ n'en a qu'un."],
    ["Tous les nombres impairs sont premiers.", false, "contre-exemple : $9 = 3 \\times 3$."],
    ["$2^n - 1$ est premier pour tout entier $n \\geqslant 2$.", false, "contre-exemple : $2^4 - 1 = 15 = 3 \\times 5$."],
    ["Pour savoir si $n$ est premier, il faut tester tous les entiers jusqu'à $\\dfrac{n}{2}$.", false, "il suffit de tester les nombres premiers $p$ tels que $p^2 \\leqslant n$."],
    ["$6^{4} \\equiv 1\\ [4]$, d'après le petit théorème de Fermat.", false, "$4$ n'est pas premier et divise $6^4$ : en fait $6^4 \\equiv 0\\ [4]$."],
    ["La décomposition de $12$ en facteurs premiers est $2 \\times 6$.", false, "$6$ n'est pas premier : $12 = 2^2 \\times 3$."],
    ["Le produit de deux nombres premiers peut être premier.", false, "$pq$ a au moins les diviseurs $1$, $p$, $q$ et $pq$."]
  ], ["Rappelle-toi : un nombre premier a exactement deux diviseurs positifs.", "Le petit théorème de Fermat exige un module **premier**.", "Cherche un contre-exemple avec de petits nombres."]));

  /* Figure du cours (chapitre 8) */
  FIGURES["xn-cours-crible"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 320" role="img" aria-label="Crible d'Ératosthène de 1 à 100 : les 25 nombres premiers sont mis en couleur">`;
    for (let k = 1; k <= 100; k++) {
      const i = (k - 1) % 10, j = Math.floor((k - 1) / 10), x = 10 + i * 30, y = 10 + j * 30, pr0 = estPremier(k);
      s += `<rect x="${x}" y="${y}" width="28" height="28" rx="4" style="fill:${pr0 ? "var(--lagon)" : "var(--surface)"};fill-opacity:${pr0 ? 0.85 : 1};stroke:var(--trait)"/>`;
      s += `<text x="${x + 14}" y="${y + 18.5}" text-anchor="middle" style="font:${pr0 ? 700 : 400} 11px var(--f-texte);fill:${pr0 ? "var(--surface)" : "var(--doux)"}">${k}</text>`;
    }
    return s + "</svg>";
  };


  /* ---------- Chapitre 9 : matrices et calcul matriciel (préfixe xm) ---------- */
  const mRand = (n, p, a = -5, b = 6) => Array.from({ length: n }, () => Array.from({ length: p }, () => rand(a, b)));
  const ORD = ["", "première", "deuxième", "troisième"];
  const coefNom = (i, j) => `$(${i}\\,;${j})$`;
  const mInv2 = (M) => { const d = det2(M); return [[Q(M[1][1], d), Q(-M[0][1], d)], [Q(-M[1][0], d), Q(M[0][0], d)]]; };
  const matQ = (M) => mat(M.map((l) => l.map((q) => qTex(q))));

  def("xm-operations", () => {
    const n = pick([2, 2, 3]), p = pick([2, 3]), A = mRand(n, p), B = mRand(n, p), a = pick([-3, -2, -1, 2, 3, 4]), b = pick([-3, -2, -1, 1, 2, 3]);
    const i = rand(1, n), j = rand(1, p), att = a * A[i - 1][j - 1] + b * B[i - 1][j - 1];
    const nom = `${a === 1 ? "" : a === -1 ? "-" : nb(a)}A ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : nb(Math.abs(b))}B`;
    return { enonce: `On donne $A = ${mat(A)}$ et $B = ${mat(B)}$. Quel est le coefficient de la ligne $${i}$ et de la colonne $${j}$ de $${nom}$ ?`, mode: "nombre", prefixe: `Coefficient ${coefNom(i, j)} :`, attendu: att,
      erreurs: [{ valeur: a * A[j - 1] !== undefined && A[j - 1] && A[j - 1][i - 1] !== undefined ? a * A[j - 1][i - 1] + b * B[j - 1][i - 1] : NaN, message: "Attention : ligne $" + i + "$ d'abord, colonne $" + j + "$ ensuite." }, { valeur: A[i - 1][j - 1] + B[i - 1][j - 1], message: "N'oublie pas de multiplier par les coefficients $" + nb(a) + "$ et $" + nb(b) + "$." }, { valeur: a * A[i - 1][j - 1] - b * B[i - 1][j - 1], message: "Attention au signe devant $B$." }],
      aides: ["On additionne et on multiplie par un réel **coefficient par coefficient**.", `Le coefficient ${coefNom(i, j)} de $A$ est $${nb(A[i - 1][j - 1])}$, celui de $B$ est $${nb(B[i - 1][j - 1])}$.`, `Calcule $${pr(a)} \\times ${pr(A[i - 1][j - 1])} + ${pr(b)} \\times ${pr(B[i - 1][j - 1])}$.`],
      solution: `$${pr(a)} \\times ${pr(A[i - 1][j - 1])} + ${pr(b)} \\times ${pr(B[i - 1][j - 1])} = ${nb(att)}$.\n\nEn entier : $${nom} = ${mat(mAdd(A, B, a, b))}$.` };
  });

  def("xm-produit", () => {
    const t = pick(["22", "22", "33", "23"]);
    const [n, k, p] = t === "22" ? [2, 2, 2] : t === "33" ? [3, 3, 3] : pick([[2, 3, 2], [3, 2, 3], [2, 3, 3], [3, 2, 2]]);
    const A = mRand(n, k, -4, 5), B = mRand(k, p, -4, 5), i = rand(1, n), j = rand(1, p), P = mMul(A, B), att = P[i - 1][j - 1];
    const ligne = A[i - 1], col = B.map((l) => l[j - 1]);
    const BA = n === p && k === n ? mMul(B, A)[i - 1][j - 1] : NaN;
    return { enonce: `On donne $A = ${mat(A)}$ et $B = ${mat(B)}$. Quel est le coefficient ${coefNom(i, j)} (ligne $${i}$, colonne $${j}$) du produit $AB$ ?`, mode: "nombre", prefixe: `$(AB)_{${i}${j}} =$`, attendu: att,
      erreurs: [{ valeur: A[i - 1][j - 1] !== undefined && B[i - 1] && B[i - 1][j - 1] !== undefined ? A[i - 1][j - 1] * B[i - 1][j - 1] : NaN, message: "On ne multiplie pas les coefficients à la même place : c'est « ligne de $A$ × colonne de $B$ »." }, { valeur: BA, message: "Ça, c'est le coefficient de $BA$ : l'ordre compte, le produit n'est pas commutatif." }, { valeur: ligne.reduce((s, v, q) => s + v + col[q], 0), message: "On multiplie terme à terme, puis on additionne les produits." }],
      aides: [`Le coefficient ${coefNom(i, j)} de $AB$ s'obtient avec la **ligne $${i}$ de $A$** et la **colonne $${j}$ de $B$**.`, `Ligne $${i}$ de $A$ : ${liste(ligne)}. Colonne $${j}$ de $B$ : ${liste(col)}.`, "Multiplie les termes deux à deux, puis additionne."],
      solution: `$(AB)_{${i}${j}} = ${ligne.map((v, q) => `${pr(v)} \\times ${pr(col[q])}`).join(" + ")} = ${nb(att)}$.\n\nEn entier : $AB = ${mat(P)}$.` };
  });

  def("xm-dimension", () => {
    const d = () => rand(1, 4);
    let [n, k, k2, p] = [d(), d(), d(), d()];
    if (Math.random() < 0.65) k2 = k; else while (k2 === k) k2 = d();
    const ok = k === k2, bonne = ok ? `$${n} \\times ${p}$` : "Le produit n'existe pas";
    const f = [`$${p} \\times ${n}$`, `$${k} \\times ${k2}$`, `$${n} \\times ${k}$`, ok ? "Le produit n'existe pas" : `$${n} \\times ${p}$`, `$${n} \\times ${k2}$`, `$${k} \\times ${p}$`];
    const ch = choix4(bonne, f.filter((x) => x !== bonne), (j) => `$${j + 1} \\times ${j + 2}$`);
    return { enonce: `$A$ est une matrice à $${n}$ ligne${n > 1 ? "s" : ""} et $${k}$ colonne${k > 1 ? "s" : ""}, $B$ une matrice à $${k2}$ ligne${k2 > 1 ? "s" : ""} et $${p}$ colonne${p > 1 ? "s" : ""}. Quelle est la taille du produit $AB$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Le produit $AB$ n'existe que si le nombre de **colonnes de $A$** est égal au nombre de **lignes de $B$**.", `Ici : $${k}$ colonne${k > 1 ? "s" : ""} pour $A$, $${k2}$ ligne${k2 > 1 ? "s" : ""} pour $B$.`, "S'il existe, $AB$ a autant de lignes que $A$ et autant de colonnes que $B$."],
      solution: ok ? `$A$ a $${k}$ colonnes et $B$ a $${k}$ lignes : le produit existe. $AB$ a $${n}$ ligne${n > 1 ? "s" : ""} (comme $A$) et $${p}$ colonne${p > 1 ? "s" : ""} (comme $B$) : c'est une matrice $${n} \\times ${p}$.` : `$A$ a $${k}$ colonne${k > 1 ? "s" : ""} mais $B$ a $${k2}$ ligne${k2 > 1 ? "s" : ""} : on ne peut pas faire « ligne par colonne », le produit $AB$ n'existe pas.` };
  });

  def("xm-puissance", () => {
    const t = pick(["carre", "carre", "diag", "triang"]);
    if (t === "diag") {
      const a = pick([-3, -2, -1, 2, 3]), b = pick([-2, -1, 2, 3, 4]), c = pick([1, 2, -1]), n = rand(3, 7), D = [[a, 0, 0], [0, b, 0], [0, 0, c]], k = rand(1, 3);
      const v = [a, b, c][k - 1] ** n;
      return { enonce: `On donne la matrice diagonale $D = ${mat(D)}$. Quel est le coefficient ${coefNom(k, k)} de $D^{${n}}$ ?`, mode: "nombre", prefixe: `$(D^{${n}})_{${k}${k}} =$`, attendu: v,
        erreurs: [{ valeur: n * [a, b, c][k - 1], message: "Une puissance n'est pas une multiplication par $" + n + "$." }, { valeur: Math.abs(v), message: "Attention au signe d'une puissance d'un nombre négatif." }],
        aides: ["Le produit de deux matrices diagonales est diagonal, avec les produits des coefficients diagonaux.", `Donc $D^{${n}}$ est diagonale, de coefficients $${pr(a)}^{${n}}$, $${pr(b)}^{${n}}$ et $${pr(c)}^{${n}}$.`, `Calcule $${pr([a, b, c][k - 1])}^{${n}}$.`],
        solution: `$D^{${n}} = ${mat([[`${pr(a)}^{${n}}`, 0, 0], [0, `${pr(b)}^{${n}}`, 0], [0, 0, `${pr(c)}^{${n}}`]])} = ${mat([[a ** n, 0, 0], [0, b ** n, 0], [0, 0, c ** n]])}$.\n\nLe coefficient cherché vaut $${nb(v)}$.` };
    }
    if (t === "triang") {
      const a = pick([-4, -3, -2, -1, 1, 2, 3, 4, 5]), n = rand(3, 20), A = [[1, a], [0, 1]];
      return { enonce: `On donne $A = ${mat(A)}$. En calculant $A^2$ et $A^3$, conjecture $A^n$. Quel est le coefficient en haut à droite de $A^{${n}}$ ?`, mode: "nombre", prefixe: `Coefficient ${coefNom(1, 2)} :`, attendu: n * a,
        erreurs: [{ valeur: a ** n, message: "Calcule $A^2$ et $A^3$ : le coefficient ne se multiplie pas, il s'ajoute." }, { valeur: a, message: "Il change à chaque puissance." }, { valeur: (n - 1) * a, message: "Vérifie sur $A^2$ : coefficient $" + 2 * a + "$." }],
        aides: [`$A^2 = ${mat(mPow(A, 2))}$.`, `$A^3 = ${mat(mPow(A, 3))}$.`, `On conjecture $A^n = ${mat([[1, coef(a, "n")], [0, 1]])}$ (cela se démontre par récurrence).`],
        solution: `$A^2 = ${mat(mPow(A, 2))}$, $A^3 = ${mat(mPow(A, 3))}$ : le coefficient en haut à droite augmente de $${nb(a)}$ à chaque fois.\n\nPar récurrence, $A^n = ${mat([[1, `${nb(a)}n`.replace(/^1n$/, "n").replace(/^-1n$/, "-n")], [0, 1]])}$, donc ce coefficient vaut $${n} \\times ${pr(a)} = ${nb(n * a)}$ pour $n = ${n}$.` };
    }
    const n = pick([2, 2, 3]), A = mRand(n, n, -3, 4), A2 = mMul(A, A), i = rand(1, n), j = rand(1, n);
    return { enonce: `On donne $A = ${mat(A)}$. Quel est le coefficient ${coefNom(i, j)} de $A^2$ ?`, mode: "nombre", prefixe: `$(A^2)_{${i}${j}} =$`, attendu: A2[i - 1][j - 1],
      erreurs: [{ valeur: A[i - 1][j - 1] ** 2, message: "$A^2 = A \\times A$ : on ne met pas chaque coefficient au carré." }, { valeur: 2 * A[i - 1][j - 1], message: "$A^2$ n'est pas $2A$." }],
      aides: ["$A^2 = A \\times A$ : produit « ligne par colonne ».", `Ligne $${i}$ de $A$ : ${liste(A[i - 1])}. Colonne $${j}$ de $A$ : ${liste(A.map((l) => l[j - 1]))}.`, "Multiplie terme à terme et additionne."],
      solution: `$(A^2)_{${i}${j}} = ${A[i - 1].map((v, q) => `${pr(v)} \\times ${pr(A[q][j - 1])}`).join(" + ")} = ${nb(A2[i - 1][j - 1])}$.\n\n$A^2 = ${mat(A2)}$.` };
  });

  def("xm-inverse", () => {
    let M, d; do { M = mRand(2, 2, -6, 7); d = det2(M); } while (!d || Math.abs(d) > 12 || M.flat().filter((x) => x === 0).length > 1);
    const I = mInv2(M);
    const bonne = `$${matQ(I)}$`;
    const sans = mat([[M[1][1], -M[0][1]], [-M[1][0], M[0][0]]]);
    const transp = matQ([[Q(M[1][1], d), Q(-M[1][0], d)], [Q(-M[0][1], d), Q(M[0][0], d)]]);
    const signe = matQ([[Q(M[1][1], d), Q(M[0][1], d)], [Q(M[1][0], d), Q(M[0][0], d)]]);
    const diag = matQ([[Q(M[0][0], d), Q(-M[0][1], d)], [Q(-M[1][0], d), Q(M[1][1], d)]]);
    const f = [Math.abs(d) === 1 ? null : `$${sans}$`, `$${transp}$`, `$${signe}$`, `$${diag}$`, `$${matQ([[Q(M[1][1], -d), Q(-M[0][1], -d)], [Q(-M[1][0], -d), Q(M[0][0], -d)]])}$`];
    const ch = choix4(bonne, f);
    return { enonce: `Quelle est l'inverse de la matrice $A = ${mat(M)}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`$\\det(A) = ad - bc = ${pr(M[0][0])} \\times ${pr(M[1][1])} - ${pr(M[0][1])} \\times ${pr(M[1][0])} = ${d}$.`, "Pour $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ avec $ad - bc \\neq 0$ : $A^{-1} = \\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$.", "On échange les coefficients de la diagonale et on change le signe des deux autres, puis on divise par le déterminant."],
      solution: `$ad - bc = ${d} \\neq 0$, donc $A$ est inversible et $A^{-1} = ${Math.abs(d) === 1 ? (d < 0 ? "-" : "") : `${d < 0 ? "-" : ""}\\dfrac{1}{${Math.abs(d)}}`}${sans} =${matQ(I)}$.\n\nVérification : $A \\times A^{-1} = I_2$.` };
  });

  def("xm-det", () => {
    const t = pick(["k", "k", "calc"]);
    if (t === "calc") { const M = mRand(2, 2, -9, 10), d = det2(M); return { enonce: `La matrice $A = ${mat(M)}$ est-elle inversible ? Pour le savoir, calcule $ad - bc$.`, mode: "nombre", prefixe: "$ad - bc =$", attendu: d,
      erreurs: [{ valeur: M[0][0] * M[1][1] + M[0][1] * M[1][0], message: "C'est une différence : $ad - bc$." }, { valeur: M[0][1] * M[1][0] - M[0][0] * M[1][1], message: "Dans l'autre sens : $ad - bc$ (diagonale principale moins l'autre)." }, { valeur: M[0][0] * M[0][1] - M[1][0] * M[1][1], message: "On multiplie en diagonale : $a \\times d$ et $b \\times c$." }],
      aides: ["Une matrice $2 \\times 2$ est inversible si et seulement si $ad - bc \\neq 0$.", `$a = ${nb(M[0][0])}$, $b = ${nb(M[0][1])}$, $c = ${nb(M[1][0])}$, $d = ${nb(M[1][1])}$.`, `$ad - bc = ${pr(M[0][0])} \\times ${pr(M[1][1])} - ${pr(M[0][1])} \\times ${pr(M[1][0])}$.`],
      solution: `$ad - bc = ${pr(M[0][0])} \\times ${pr(M[1][1])} - ${pr(M[0][1])} \\times ${pr(M[1][0])} = ${nb(d)}$. ${d ? "Ce nombre n'est pas nul : $A$ est inversible." : "Il est nul : $A$ n'est pas inversible."}` }; }
    const dd = pick([-4, -3, -2, -1, 1, 2, 3, 4]), k0 = pick([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]), P = k0 * dd;
    const c = pick(diviseurs(Math.abs(P))) * pick([1, -1]), b = P / c;
    return { enonce: `Pour quelle valeur du réel $k$ la matrice $A = ${mat([["k", b], [c, dd]])}$ n'est-elle **pas** inversible ?`, mode: "nombre", prefixe: "$k =$", attendu: k0,
      erreurs: [{ valeur: -k0, message: "Attention au signe en résolvant l'équation." }, { valeur: b * c, message: "Il faut encore diviser par $" + nb(dd) + "$." }],
      aides: ["$A$ n'est pas inversible si et seulement si $ad - bc = 0$.", `Ici $ad - bc = ${coef(dd, "k")} ${plus(-b * c)}$.`, "Résous cette équation du premier degré."],
      solution: `$ad - bc = ${coef(dd, "k")} ${plus(-b * c)}$. Il est nul pour $k = ${nb(k0)}$ : c'est la seule valeur pour laquelle $A$ n'est pas inversible.` };
  });

  def("xm-systeme", () => {
    let M, d; do { M = mRand(2, 2, -5, 6); d = det2(M); } while (!d || M.flat().filter((x) => x === 0).length > 1);
    const X = [rand(-6, 6), rand(-6, 6)], B = [M[0][0] * X[0] + M[0][1] * X[1], M[1][0] * X[0] + M[1][1] * X[1]], quoi = pick(["x", "y"]);
    const eq = (l, r) => { const tx = l[0] ? coef(l[0], "x") : "", ty = l[1] ? (tx ? " " + pt(l[1], "y") : coef(l[1], "y")) : ""; return `${tx}${ty} = ${nb(r)}`; };
    const I = mInv2(M);
    return { enonce: `On considère le système $\\begin{cases} ${eq(M[0], B[0])} \\\\ ${eq(M[1], B[1])} \\end{cases}$. On l'écrit $AX = B$ avec $X = \\begin{pmatrix} x \\\\ y \\end{pmatrix}$. Que vaut $${quoi}$ ?`, mode: "nombre", prefixe: `$${quoi} =$`, attendu: quoi === "x" ? X[0] : X[1],
      erreurs: [{ valeur: quoi === "x" ? X[1] : X[0], message: `Ça, c'est la valeur de $${quoi === "x" ? "y" : "x"}$.` }, { valeur: quoi === "x" ? -X[0] : -X[1], message: "Attention au signe." }],
      aides: [`$A = ${mat(M)}$ et $B = ${mat([[B[0]], [B[1]]])}$.`, `$\\det(A) = ${d} \\neq 0$, donc $A$ est inversible et $X = A^{-1}B$.`, `$A^{-1} = ${matQ(I)}$.`],
      solution: `$A = ${mat(M)}$ est inversible ($\\det(A) = ${d}$), donc $X = A^{-1}B = ${matQ(I)}${mat([[B[0]], [B[1]]])} = ${mat([[X[0]], [X[1]]])}$.\n\nAinsi $x = ${nb(X[0])}$ et $y = ${nb(X[1])}$.` };
  });

  def("xm-transformation", () => {
    const T = pick([
      { M: [[0, -1], [1, 0]], nom: "la rotation de centre $O$ et d'angle $\\dfrac{\\pi}{2}$" },
      { M: [[0, 1], [-1, 0]], nom: "la rotation de centre $O$ et d'angle $-\\dfrac{\\pi}{2}$" },
      { M: [[-1, 0], [0, -1]], nom: "la symétrie de centre $O$" },
      { M: [[1, 0], [0, -1]], nom: "la symétrie par rapport à l'axe des abscisses" },
      { M: [[-1, 0], [0, 1]], nom: "la symétrie par rapport à l'axe des ordonnées" },
      { M: [[0, 1], [1, 0]], nom: "la symétrie par rapport à la droite d'équation $y = x$" },
      { M: [[2, 0], [0, 2]], nom: "l'homothétie de centre $O$ et de rapport $2$" },
      { M: [[3, 0], [0, 3]], nom: "l'homothétie de centre $O$ et de rapport $3$" }
    ]);
    let P; do { P = [rand(-5, 5), rand(-5, 5)]; } while (!P[0] || !P[1] || Math.abs(P[0]) === Math.abs(P[1]));
    const im = [T.M[0][0] * P[0] + T.M[0][1] * P[1], T.M[1][0] * P[0] + T.M[1][1] * P[1]];
    const ptx = (v) => `$(${nb(v[0])}\\,;${nb(v[1])})$`;
    const ch = choix4(ptx(im), [ptx([-im[0], -im[1]]), ptx([P[1], P[0]]), ptx([-P[1], P[0]]), ptx([P[1], -P[0]]), ptx([-P[0], P[1]]), ptx([P[0], -P[1]]), ptx([2 * P[0], 2 * P[1]])].filter((x) => x !== ptx(im)));
    return { enonce: `Dans un repère orthonormé, ${T.nom} transforme le point $M(x\\,;y)$ en $M'(x'\\,;y')$ avec $\\begin{pmatrix} x' \\\\ y' \\end{pmatrix} = ${mat(T.M)}\\begin{pmatrix} x \\\\ y \\end{pmatrix}$. Quelles sont les coordonnées de l'image de $M(${nb(P[0])}\\,;${nb(P[1])})$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      figure: planC(Object.assign(fenetre([P, im]), { points: [ptC(P[0], P[1], "M")], segs: [[0, 0, P[0], P[1], true]], aria: `Point M de coordonnées (${P[0]} ; ${P[1]}) à transformer` })),
      aides: ["Calcule le produit de la matrice par la colonne $\\begin{pmatrix} x \\\\ y \\end{pmatrix}$.", `$x' = ${pr(T.M[0][0])} \\times ${pr(P[0])} + ${pr(T.M[0][1])} \\times ${pr(P[1])}$.`, `$y' = ${pr(T.M[1][0])} \\times ${pr(P[0])} + ${pr(T.M[1][1])} \\times ${pr(P[1])}$.`],
      solution: `$${mat(T.M)}${mat([[P[0]], [P[1]]])} = ${mat([[im[0]], [im[1]]])}$ : l'image est $M'(${nb(im[0])}\\,;${nb(im[1])})$, comme on le vérifie sur un dessin pour ${T.nom}.` };
  });

  def("xm-vrai-faux", () => vraiFaux4([
    ["Pour toutes matrices carrées $A$ et $B$ de même taille, $A + B = B + A$.", true, "l'addition se fait coefficient par coefficient."],
    ["$I_2 \\times A = A$ pour toute matrice $A$ de taille $2 \\times 2$.", true, "$I_2$ est l'élément neutre de la multiplication."],
    ["Si $ad - bc \\neq 0$, la matrice $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ est inversible.", true, "son inverse est $\\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$."],
    ["Le produit d'une matrice $2 \\times 3$ par une matrice $3 \\times 4$ est une matrice $2 \\times 4$.", true, "lignes de la première, colonnes de la seconde."],
    ["Si $A$ est inversible, le système $AX = B$ a une unique solution $X = A^{-1}B$.", true, "on multiplie à gauche par $A^{-1}$."],
    ["Une matrice diagonale élevée à la puissance $n$ reste diagonale.", true, "ses coefficients diagonaux sont élevés à la puissance $n$."],
    ["Pour toutes matrices carrées $A$ et $B$ de même taille, $AB = BA$.", false, "le produit n'est pas commutatif : par exemple $\\begin{pmatrix} 1 & 1 \\\\ 0 & 0 \\end{pmatrix}\\begin{pmatrix} 1 & 0 \\\\ 1 & 0 \\end{pmatrix} = \\begin{pmatrix} 2 & 0 \\\\ 0 & 0 \\end{pmatrix}$, mais dans l'autre ordre on obtient $\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$."],
    ["Si $AB = 0$, alors $A = 0$ ou $B = 0$.", false, "contre-exemple : $\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}^2 = 0$."],
    ["Le carré d'une matrice s'obtient en élevant chaque coefficient au carré.", false, "$A^2 = A \\times A$, produit « ligne par colonne »."],
    ["On peut toujours multiplier deux matrices.", false, "il faut que le nombre de colonnes de la première soit égal au nombre de lignes de la seconde."],
    ["$(A + B)^2 = A^2 + 2AB + B^2$ pour toutes matrices carrées $A$ et $B$.", false, "$(A + B)^2 = A^2 + AB + BA + B^2$, et $AB \\neq BA$ en général."],
    ["Toute matrice carrée non nulle est inversible.", false, "$\\begin{pmatrix} 1 & 2 \\\\ 2 & 4 \\end{pmatrix}$ n'est pas inversible : $1 \\times 4 - 2 \\times 2 = 0$."],
    ["L'inverse de $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ est $\\begin{pmatrix} \\frac{1}{a} & \\frac{1}{b} \\\\ \\frac{1}{c} & \\frac{1}{d} \\end{pmatrix}$.", false, "on utilise $\\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$, pas les inverses des coefficients."]
  ], ["Rappelle les règles : addition coefficient par coefficient, produit « ligne par colonne ».", "Le produit de matrices n'est pas commutatif.", "Un contre-exemple $2 \\times 2$ suffit à montrer qu'une affirmation est fausse."]));

  /* Figures du cours (chapitre 9) */
  FIGURES["xm-cours-produit"] = () => {
    // A (2×3) × B (3×2) : ligne 1 de A et colonne 2 de B mises en évidence
    const A = [[1, 2, 0], [3, -1, 4]], B = [[2, 1], [0, 5], [-1, 3]];
    let s = `<svg class="graph" viewBox="0 0 320 170" role="img" aria-label="Produit de matrices : le coefficient ligne 1, colonne 2 de AB s'obtient avec la ligne 1 de A et la colonne 2 de B : 1 × 1 + 2 × 5 + 0 × 3 = 11">`;
    const cell = (x, y, v, on) => `<rect x="${x}" y="${y}" width="26" height="24" rx="4" style="fill:${on ? "var(--lagon)" : "none"};fill-opacity:0.2;stroke:${on ? "var(--lagon)" : "var(--trait)"}"/><text x="${x + 13}" y="${y + 16.5}" text-anchor="middle" style="font:700 12px var(--f-texte);fill:var(--encre)">${nbS(v)}</text>`;
    A.forEach((l, i) => l.forEach((v, j) => (s += cell(8 + j * 28, 54 + i * 26, v, i === 0))));
    B.forEach((l, i) => l.forEach((v, j) => (s += cell(110 + j * 28, 28 + i * 26, v, j === 1))));
    s += `<text x="50" y="44" text-anchor="middle" style="font:700 13px var(--f-texte);fill:var(--encre)">A</text><text x="138" y="20" text-anchor="middle" style="font:700 13px var(--f-texte);fill:var(--encre)">B</text>`;
    const AB = mMul(A, B);
    AB.forEach((l, i) => l.forEach((v, j) => (s += cell(200 + j * 30, 54 + i * 26, v, i === 0 && j === 1))));
    s += `<text x="230" y="44" text-anchor="middle" style="font:700 13px var(--f-texte);fill:var(--encre)">AB</text>`;
    s += `<text x="160" y="150" text-anchor="middle" style="font:700 12px var(--f-texte);fill:var(--lagon)">1 × 1 + 2 × 5 + 0 × 3 = 11</text>`;
    return s + "</svg>";
  };
  FIGURES["xm-cours-rotation"] = () => planC({ xmin: -4.4, xmax: 4.4, ymin: -1.4, ymax: 4.4,
    points: [ptC(3, 1, "M(3 ; 1)"), ptC(-1, 3, "M'(−1 ; 3)", { gauche: true })], segs: [[0, 0, 3, 1, true], [0, 0, -1, 3, true]],
    arcs: [{ a1: Math.atan2(1, 3), a2: Math.atan2(3, -1), r: 1.2, label: "90°", dl: 0.4 }],
    aria: "La rotation de centre O d'angle 90° envoie M(3 ; 1) sur M'(−1 ; 3), grâce à la matrice de lignes (0 ; −1) et (1 ; 0)" });


  /* ---------- Chapitre 10 : graphes et matrice d'adjacence (préfixe xr) ---------- */
  // Graphe aléatoire connexe à n sommets (non orienté) : liste d'arêtes [i, j] avec i < j
  const grapheAlea = (n, extra) => {
    let E; do {
      const ord = shuffle(Array.from({ length: n }, (_, k) => k)); E = [];
      for (let k = 1; k < n; k++) { const a = ord[k], b = ord[rand(0, k - 1)]; E.push([Math.min(a, b), Math.max(a, b)]); } // arbre couvrant : connexe
      for (let k = 0; k < extra; k++) { const a = rand(0, n - 1), b = rand(0, n - 1); if (a !== b && !E.some(([x, y]) => (x === Math.min(a, b) && y === Math.max(a, b)))) E.push([Math.min(a, b), Math.max(a, b)]); }
    } while (E.length < Math.min(n, (n * (n - 1)) / 2) && extra > 0);
    return E;
  };
  const adjNO = (n, E) => { const A = Array.from({ length: n }, () => Array(n).fill(0)); E.forEach(([a, b]) => { A[a][b] = 1; A[b][a] = 1; }); return A; };
  const adjO = (n, E) => { const A = Array.from({ length: n }, () => Array(n).fill(0)); E.forEach(([a, b]) => { A[a][b] = 1; }); return A; };
  const figGraphe = (n, E, oriente, aria) => grapheG({ sommets: enCercle(n), aretes: E.map(([a, b]) => [NOMS[a], NOMS[b]]), oriente, aria: aria || `Graphe ${oriente ? "orienté " : ""}à ${n} sommets ${NOMS.slice(0, n).join(", ")}, avec ${E.length} ${oriente ? "arcs" : "arêtes"} : ${E.map(([a, b]) => NOMS[a] + (oriente ? "→" : "–") + NOMS[b]).join(", ")}` });
  // Distances (plus courtes chaînes) par parcours en largeur
  const distances = (n, A, s) => { const d = Array(n).fill(-1); d[s] = 0; const F = [s]; while (F.length) { const u = F.shift(); for (let v = 0; v < n; v++) if (A[u][v] && d[v] < 0) { d[v] = d[u] + 1; F.push(v); } } return d; };
  const VILLES = ["Mamoudzou", "Koungou", "Dzaoudzi", "Sada", "Chirongui", "Tsingoni", "Dembéni"];

  def("xr-degre", () => {
    const n = rand(5, 6), E = grapheAlea(n, rand(1, 4)), A = adjNO(n, E), t = pick(["degre", "degre", "aretes", "ordre-degre"]);
    const deg = A.map((l) => l.reduce((s, v) => s + v, 0));
    const figure = figGraphe(n, E, false);
    if (t === "aretes") return { enonce: "Combien ce graphe a-t-il d'arêtes ?", figure, mode: "nombre", prefixe: "Nombre d'arêtes :", attendu: E.length,
      erreurs: [{ valeur: n, message: "Ça, c'est l'**ordre** du graphe (le nombre de sommets)." }, { valeur: 2 * E.length, message: "Ça, c'est la somme des degrés : chaque arête y est comptée deux fois." }],
      aides: ["Une arête relie deux sommets : compte les traits.", "Pour vérifier : la somme des degrés est égale au double du nombre d'arêtes.", `Somme des degrés : ${deg.map((d) => `$${d}$`).join(" + ")} $= ${2 * E.length}$.`],
      solution: `Le graphe a $${E.length}$ arêtes : ${E.map(([a, b]) => `${NOMS[a]}–${NOMS[b]}`).join(", ")}.\n\nVérification : la somme des degrés vaut $${deg.join(" + ")} = ${2 * E.length} = 2 \\times ${E.length}$.` };
    const s = rand(0, n - 1);
    return { enonce: `Quel est le degré du sommet ${NOMS[s]} dans ce graphe ?`, figure, mode: "nombre", prefixe: `Degré de ${NOMS[s]} :`, attendu: deg[s],
      erreurs: [{ valeur: n - 1, message: `${NOMS[s]} n'est pas forcément relié à tous les autres sommets.` }, { valeur: deg[s] + 1, message: "On compte les arêtes qui partent du sommet, pas le sommet lui-même." }],
      aides: ["Le degré d'un sommet est le nombre d'arêtes qui le touchent.", `Repère toutes les arêtes qui partent de ${NOMS[s]}.`, `Les voisins de ${NOMS[s]} sont ses sommets adjacents : compte-les.`],
      solution: `Les arêtes issues de ${NOMS[s]} vont vers ${A[s].map((v, k) => (v ? NOMS[k] : null)).filter(Boolean).join(", ")} : le degré de ${NOMS[s]} est $${deg[s]}$.` };
  });

  def("xr-poignees", () => {
    const t = pick(["complet", "complet", "somme", "possible"]);
    if (t === "complet") {
      const n = rand(4, 24), ctx = pick([`Lors d'un tournoi de football entre $${n}$ villages de Mayotte, chaque équipe rencontre une fois chacune des autres. Combien de matchs faut-il organiser ?`, `$${n}$ élèves de la classe se serrent tous la main une fois. Combien de poignées de main y a-t-il ?`, `On veut relier $${n}$ îlots du lagon deux à deux par une liaison directe. Combien de liaisons faut-il ?`]);
      return { enonce: ctx, mode: "nombre", prefixe: "Nombre :", attendu: (n * (n - 1)) / 2,
        erreurs: [{ valeur: n * (n - 1), message: "Chaque rencontre est comptée deux fois : divise par $2$." }, { valeur: n * n, message: "Une équipe ne joue pas contre elle-même, et chaque match est compté deux fois." }],
        aides: ["Modélise par un graphe complet : un sommet par participant, une arête par rencontre.", `Chaque sommet est de degré $${n - 1}$.`, "Somme des degrés $= 2 \\times$ (nombre d'arêtes)."],
        solution: `Le graphe complet à $${n}$ sommets a tous ses sommets de degré $${n - 1}$. La somme des degrés vaut $${n} \\times ${n - 1} = ${n * (n - 1)}$, et c'est le double du nombre d'arêtes : $\\dfrac{${n * (n - 1)}}{2} = ${(n * (n - 1)) / 2}$.` };
    }
    // Havel-Hakimi : la suite de degrés est-elle réalisable par un graphe simple ?
    const realisable = (D) => { let L = D.slice(); while (true) { L.sort((x, y) => y - x); if (!L.length || L[0] === 0) return true; const d = L.shift(); if (d > L.length) return false; for (let k = 0; k < d; k++) { L[k]--; if (L[k] < 0) return false; } } };
    let m, degs, somme;
    do { m = rand(5, 9); degs = Array.from({ length: m }, () => rand(1, Math.min(5, m - 2))); somme = degs.reduce((s, d) => s + d, 0); if (t === "somme" && somme % 2) { degs[0] += 1; somme += 1; } } while (somme % 2 === 0 && !realisable(degs));
    if (t === "somme") {
      return { enonce: `Un graphe a $${m}$ sommets, de degrés ${degs.map((d) => `$${d}$`).join(" ; ")}. Combien a-t-il d'arêtes ?`, mode: "nombre", prefixe: "Nombre d'arêtes :", attendu: somme / 2,
        erreurs: [{ valeur: somme, message: "Chaque arête est comptée deux fois dans la somme des degrés : divise par $2$." }, { valeur: m, message: "Ça, c'est le nombre de sommets." }],
        aides: ["Chaque arête a deux extrémités : elle compte pour $2$ dans la somme des degrés.", `Somme des degrés : $${somme}$.`, "Nombre d'arêtes $= \\dfrac{\\text{somme des degrés}}{2}$."],
        solution: `Somme des degrés : $${degs.join(" + ")} = ${somme}$. Elle vaut le double du nombre d'arêtes : $\\dfrac{${somme}}{2} = ${somme / 2}$ arêtes.` };
    }
    const possible = somme % 2 === 0;
    const ch = choix4(possible ? `Oui, et il a $${somme / 2}$ arêtes` : "Non : la somme des degrés est impaire", possible ? ["Non : la somme des degrés est impaire", "Non : il y a trop de sommets de degré impair", `Oui, et il a $${somme}$ arêtes`] : [`Oui, et il a $${Math.floor(somme / 2)}$ arêtes`, "Oui : chaque sommet a au moins une arête", `Oui, et il a $${somme}$ arêtes`]);
    return { enonce: `Peut-il exister un graphe à $${m}$ sommets de degrés ${degs.map((d) => `$${d}$`).join(" ; ")} ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Somme des degrés $= 2 \\times$ nombre d'arêtes : elle est toujours **paire**.", `Calcule la somme : $${somme}$.`, "Une somme impaire rend le graphe impossible."],
      solution: `Somme des degrés : $${degs.join(" + ")} = ${somme}$. ${possible ? `Elle est paire, et on peut effectivement construire un tel graphe (en reliant d'abord le sommet de plus grand degré aux sommets suivants de plus grands degrés, et ainsi de suite). Il a $\\dfrac{${somme}}{2} = ${somme / 2}$ arêtes.` :"Elle est impaire, alors qu'elle doit valoir le double du nombre d'arêtes : un tel graphe n'existe pas."}` };
  });

  def("xr-matrice", () => {
    const oriente = Math.random() < 0.45, n = oriente ? rand(3, 4) : rand(4, 5);
    let E;
    if (oriente) { do { E = []; for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) if (a !== b && Math.random() < 0.4) E.push([a, b]); } while (E.length < n || E.length > 2 * n); }
    else E = grapheAlea(n, rand(0, 2));
    const A = oriente ? adjO(n, E) : adjNO(n, E);
    const T = A.map((l, i) => l.map((_, j) => A[j][i]));
    const D = A.map((l, i) => l.map((v, j) => (i === j ? 1 : v)));
    const C = A.map((l) => l.map((v) => 1 - v)).map((l, i) => l.map((v, j) => (i === j ? 0 : v)));
    const R = A.slice().reverse();
    const f = [oriente ? `$${mat(T)}$` : null, `$${mat(D)}$`, `$${mat(C)}$`, `$${mat(R)}$`].filter((x) => x && x !== `$${mat(A)}$`);
    const ch = choix4(`$${mat(A)}$`, f, () => { const X = A.map((l) => l.slice()); const i = rand(0, n - 1), j = rand(0, n - 1); if (i !== j) { X[i][j] = 1 - X[i][j]; if (!oriente) X[j][i] = X[i][j]; } return `$${mat(X)}$`; });
    return { enonce: `Quelle est la matrice d'adjacence de ce graphe${oriente ? " orienté" : ""}, les sommets étant rangés dans l'ordre ${NOMS.slice(0, n).join(", ")} ?`, figure: figGraphe(n, E, oriente), mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [oriente ? "Le coefficient $a_{ij}$ vaut $1$ s'il y a un arc **de** $i$ **vers** $j$, et $0$ sinon." : "Le coefficient $a_{ij}$ vaut $1$ si les sommets $i$ et $j$ sont reliés par une arête, et $0$ sinon.", oriente ? "Ligne = sommet de départ, colonne = sommet d'arrivée : la matrice n'est pas forcément symétrique." : "Pour un graphe non orienté, la matrice est symétrique.", "Ici, aucun sommet n'est relié à lui-même : la diagonale ne contient que des $0$."],
      solution: `${oriente ? "Arcs" : "Arêtes"} : ${E.map(([a, b]) => NOMS[a] + (oriente ? "→" : "–") + NOMS[b]).join(", ")}.\n\nLa matrice d'adjacence est $${mat(A)}$.` };
  });

  def("xr-chemins", () => {
    const n = 4, L = pick([2, 2, 3]);
    let E; do { E = []; for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) if (a !== b && Math.random() < 0.45) E.push([a, b]); } while (E.length < 5);
    const A = adjO(n, E), A2 = mMul(A, A), AL = mPow(A, L), i = rand(0, n - 1), j = rand(0, n - 1), att = AL[i][j];
    const intro = `On donne la matrice d'adjacence $A = ${mat(A)}$ du graphe orienté ci-contre (sommets ${NOMS.slice(0, n).join(", ")}).`;
    return { enonce: `${intro}${L === 3 ? ` On a calculé $A^2 = ${mat(A2)}$.` : ""} Combien y a-t-il de chemins de longueur $${L}$ allant de ${NOMS[i]} à ${NOMS[j]} ?`, figure: figGraphe(n, E, true), mode: "nombre", prefixe: "Nombre de chemins :", attendu: att,
      erreurs: [{ valeur: A[i][j], message: "Ça, c'est le nombre de chemins de longueur $1$ (le coefficient de $A$)." }, { valeur: L === 3 ? A2[i][j] : AL[j][i], message: L === 3 ? "Ça, ce sont les chemins de longueur $2$ : il faut $A^3$." : "Attention au sens : de " + NOMS[i] + " vers " + NOMS[j] + ", donc ligne " + (i + 1) + ", colonne " + (j + 1) + "." }],
      aides: [`Le nombre de chemins de longueur $${L}$ de $i$ à $j$ est le coefficient $(i\\,;j)$ de $A^{${L}}$.`, L === 3 ? `$A^3 = A^2 \\times A$ : prends la ligne ${i + 1} de $A^2$ et la colonne ${j + 1} de $A$.` : `$(A^2)_{${i + 1}${j + 1}}$ : ligne ${i + 1} de $A$ fois colonne ${j + 1} de $A$.`, "Tu peux vérifier en listant les chemins sur la figure."],
      solution: `Le nombre cherché est le coefficient ligne ${i + 1}, colonne ${j + 1} de $A^{${L}}$ :\n\n$(A^{${L}})_{${i + 1}${j + 1}} = ${(L === 3 ? A2[i] : A[i]).map((v, k) => `${v} \\times ${A[k][j]}`).join(" + ")} = ${att}$.\n\n$A^{${L}} = ${mat(AL)}$.` };
  });

  def("xr-chaine", () => {
    const n = 6, E = grapheAlea(n, rand(0, 2)), A = adjNO(n, E);
    const s = rand(0, n - 1); let t2; const d = distances(n, A, s); do { t2 = rand(0, n - 1); } while (t2 === s || d[t2] < 2 && Math.random() < 0.7);
    const att = d[t2];
    return { enonce: `Dans ce graphe, quelle est la longueur d'une plus courte chaîne reliant ${NOMS[s]} à ${NOMS[t2]} ?`, figure: figGraphe(n, E, false), mode: "nombre", prefixe: "Longueur :", attendu: att,
      erreurs: [{ valeur: att + 1, message: "La longueur d'une chaîne est son nombre d'**arêtes**, pas son nombre de sommets." }, { valeur: att - 1, message: "Compte toutes les arêtes de la chaîne." }],
      aides: ["La longueur d'une chaîne est le nombre d'arêtes qui la composent.", `Cherche d'abord les voisins de ${NOMS[s]} (à distance $1$), puis leurs voisins (à distance $2$)…`, `${NOMS[t2]} est à distance $${att}$ de ${NOMS[s]} : vérifie qu'aucune chaîne plus courte n'existe.`],
      solution: `Distances depuis ${NOMS[s]} : ${d.map((x, k) => `${NOMS[k]} : $${x}$`).join(", ")}.\n\nUne plus courte chaîne de ${NOMS[s]} à ${NOMS[t2]} a donc pour longueur $${att}$.` };
  });

  def("xr-vrai-faux", () => vraiFaux4([
    ["Dans un graphe non orienté, la somme des degrés est égale au double du nombre d'arêtes.", true, "chaque arête a deux extrémités (lemme des poignées de main)."],
    ["Dans tout graphe, le nombre de sommets de degré impair est pair.", true, "sinon la somme des degrés serait impaire."],
    ["Le graphe complet à $5$ sommets a $10$ arêtes.", true, "$\\dfrac{5 \\times 4}{2} = 10$."],
    ["La matrice d'adjacence d'un graphe non orienté est symétrique.", true, "si $i$ est relié à $j$, alors $j$ est relié à $i$."],
    ["Le coefficient $(i\\,;j)$ de $A^n$ donne le nombre de chemins de longueur $n$ de $i$ à $j$.", true, "c'est la propriété démontrée par récurrence dans le cours."],
    ["Un graphe connexe est un graphe dans lequel deux sommets quelconques sont reliés par une chaîne.", true, "c'est la définition."],
    ["La longueur d'une chaîne est son nombre de sommets.", false, "c'est son nombre d'arêtes."],
    ["Il existe un graphe dont les degrés des sommets sont $3$, $3$, $3$.", false, "la somme $9$ est impaire, alors qu'elle vaut le double du nombre d'arêtes."],
    ["La matrice d'adjacence d'un graphe orienté est toujours symétrique.", false, "un arc de $i$ vers $j$ n'implique pas un arc de $j$ vers $i$."],
    ["L'ordre d'un graphe est son nombre d'arêtes.", false, "c'est son nombre de sommets."],
    ["Le graphe complet à $n$ sommets a $n^2$ arêtes.", false, "il en a $\\dfrac{n(n - 1)}{2}$."],
    ["Dans un graphe complet à $n$ sommets, chaque sommet est de degré $n$.", false, "chaque sommet est relié aux $n - 1$ autres."],
    ["Le coefficient $(i\\,;j)$ de $A^2$ est égal à $a_{ij}^2$.", false, "on calcule $A^2 = A \\times A$ « ligne par colonne », pas coefficient par coefficient."]
  ], ["Rappelle les définitions : ordre, degré, chaîne, longueur, connexe.", "Somme des degrés $= 2 \\times$ nombre d'arêtes.", "Un contre-exemple avec un petit graphe suffit."]));

  /* Figures du cours (chapitre 10) */
  FIGURES["xr-cours-graphe"] = () => grapheG({ sommets: enCercle(5), aretes: [["A", "B"], ["A", "C"], ["B", "C"], ["C", "D"], ["D", "E"], ["B", "E"]], aria: "Graphe à 5 sommets A, B, C, D, E et 6 arêtes : A–B, A–C, B–C, C–D, D–E, B–E ; degrés 2, 3, 3, 2, 2" });
  FIGURES["xr-cours-complet"] = () => { const S = enCercle(5), E = []; for (let a = 0; a < 5; a++) for (let b = a + 1; b < 5; b++) E.push([NOMS[a], NOMS[b]]); return grapheG({ sommets: S, aretes: E, aria: "Graphe complet à 5 sommets : chaque sommet est relié aux 4 autres, 10 arêtes en tout" }); };
  FIGURES["xr-cours-oriente"] = () => grapheG({ sommets: enCercle(4), aretes: [["A", "B"], ["B", "C"], ["C", "A"], ["A", "D"], ["D", "C"], ["C", "D"]], oriente: true, aria: "Graphe orienté à 4 sommets avec les arcs A→B, B→C, C→A, A→D, D→C et C→D" });


  /* ---------- Chapitre 11 : suites de matrices et chaînes de Markov (préfixe xk) ---------- */
  const mArr = (M) => M.map((l) => l.map((v) => arr(v, 8)));
  // Contextes à deux états : [état 1, état 2, phrase « on passe de … », lettres]
  const CTX2 = [
    { e: ["prend le bus", "va à pied"], l: ["B", "P"], qui: "Chaque matin, un élève de Koungou", unite: "matin", un: "un", suiv: "le suivant" },
    { e: ["est ensoleillé", "est pluvieux"], l: ["S", "R"], qui: "À Mamoudzou, pendant la saison des pluies, un jour", unite: "jour", un: "un", suiv: "le suivant" },
    { e: ["prend la barge", "prend l'amphidrome"], l: ["B", "A"], qui: "Chaque jour, un habitant de Petite-Terre qui traverse", unite: "jour", un: "un", suiv: "le suivant" },
    { e: ["joue au football", "joue au basket"], l: ["F", "K"], qui: "Chaque semaine, un adhérent du club de Sada", unite: "semaine", un: "une", suiv: "la suivante" },
    { e: ["mange à la cantine", "mange dehors"], l: ["C", "D"], qui: "Chaque midi, un élève du lycée", unite: "midi", un: "un", suiv: "le suivant" }
  ];
  const dec = (k) => k / 10; // probabilités en dixièmes
  const P2 = () => { const a = rand(1, 8), b = rand(1, 8); return { a: dec(a), b: dec(b), ai: a, bi: b, P: [[arr(1 - dec(a)), dec(a)], [dec(b), arr(1 - dec(b))]] }; };
  const figMarkov2 = (P, L) => grapheG({ sommets: [[L[0], 85, 110], [L[1], 235, 110]], aretes: [[L[0], L[0], nbS(P[0][0])], [L[0], L[1], nbS(P[0][1])], [L[1], L[0], nbS(P[1][0])], [L[1], L[1], nbS(P[1][1])]], oriente: true, h: 200, boucles: { [L[0]]: Math.PI, [L[1]]: 0 }, aria: `Graphe probabiliste à deux états ${L[0]} et ${L[1]} : de ${L[0]} vers ${L[0]} ${nbS(P[0][0])}, de ${L[0]} vers ${L[1]} ${nbS(P[0][1])}, de ${L[1]} vers ${L[0]} ${nbS(P[1][0])}, de ${L[1]} vers ${L[1]} ${nbS(P[1][1])}` });
  const figMarkov3 = (P, L) => grapheG({ sommets: [[L[0], 160, 40], [L[1], 70, 190], [L[2], 250, 190]], aretes: [0, 1, 2].flatMap((i) => [0, 1, 2].filter((j) => P[i][j] > 0).map((j) => [L[i], L[j], nbS(P[i][j])])), oriente: true, h: 240, boucles: { [L[0]]: -Math.PI / 2, [L[1]]: Math.PI * 0.8, [L[2]]: Math.PI * 0.2 }, aria: `Graphe probabiliste à trois états ${L.join(", ")}` });
  // Matrice 3 × 3 stochastique à coefficients en dixièmes
  const P3 = () => Array.from({ length: 3 }, () => { const a = rand(0, 8), b = rand(0, 10 - a); return shuffle([a, b, 10 - a - b]).map(dec); });

  def("xk-suite", () => {
    const t = pick(["sans", "sans", "avec"]);
    const A = [[pick([-1, 1, 2, 3]), pick([-2, -1, 1, 2])], [pick([-1, 1, 2]), pick([-1, 1, 2, 3])]], U0 = [[rand(-4, 5)], [rand(-4, 5)]], Cc = t === "avec" ? [[rand(-4, 4)], [rand(-4, 4)]] : [[0], [0]];
    const U1 = mAdd(mMul(A, U0), Cc), U2 = mAdd(mMul(A, U1), Cc), quoi = pick([0, 1]), att = U2[quoi][0];
    const rel = `U_{n+1} = AU_n${t === "avec" ? " + C" : ""}`;
    return { enonce: `On définit $U_0 = ${mat(U0)}$ et, pour tout entier $n$, $${rel}$ avec $A = ${mat(A)}$${t === "avec" ? ` et $C = ${mat(Cc)}$` : ""}. On note $U_n = \\begin{pmatrix} u_n \\\\ v_n \\end{pmatrix}$. Que vaut $${quoi ? "v_2" : "u_2"}$ ?`, mode: "nombre", prefixe: `$${quoi ? "v_2" : "u_2"} =$`, attendu: att,
      erreurs: [{ valeur: U1[quoi][0], message: "Ça, c'est pour $U_1$ : il faut encore une étape." }, { valeur: U2[1 - quoi][0], message: `Ça, c'est $${quoi ? "u_2" : "v_2"}$.` }, { valeur: mMul(mMul(A, A), U0)[quoi][0] + 2 * Cc[quoi][0], message: "Calcule pas à pas : $U_2 = AU_1 + C$, et non $A^2U_0 + 2C$." }],
      aides: [`Calcule d'abord $U_1 = AU_0${t === "avec" ? " + C" : ""}$.`, `$U_1 = ${mat(U1)}$.`, `Puis $U_2 = AU_1${t === "avec" ? " + C" : ""}$ : produit ligne par colonne.`],
      solution: `$U_1 = ${mat(A)}${mat(U0)}${t === "avec" ? ` + ${mat(Cc)}` : ""} = ${mat(U1)}$.\n\n$U_2 = ${mat(A)}${mat(U1)}${t === "avec" ? ` + ${mat(Cc)}` : ""} = ${mat(U2)}$.\n\nDonc $${quoi ? "v_2" : "u_2"} = ${nb(att)}$.` };
  });

  def("xk-limite", () => {
    // L = AL + C avec A = [[a, b], [c, d]] en dixièmes et L entier
    let A, L, Cc; do {
      A = [[dec(rand(1, 6)), dec(rand(0, 3))], [dec(rand(0, 3)), dec(rand(1, 6))]]; L = [[rand(5, 60)], [rand(5, 60)]];
      Cc = mArr(mAdd(L, mMul(A, L), 1, -1));
    } while (Math.abs(det2([[1 - A[0][0], -A[0][1]], [-A[1][0], 1 - A[1][1]]])) < 1e-9);
    const quoi = pick([0, 1]), att = L[quoi][0];
    const IA = mArr([[1 - A[0][0], -A[0][1]], [-A[1][0], 1 - A[1][1]]]);
    return { enonce: `On considère la suite de matrices colonnes définie par $U_{n+1} = AU_n + C$ avec $A = ${mat(A)}$ et $C = ${mat(Cc)}$. On cherche la matrice colonne constante $L = \\begin{pmatrix} x \\\\ y \\end{pmatrix}$ telle que $L = AL + C$. Que vaut $${quoi ? "y" : "x"}$ ?`, mode: "nombre", prefixe: `$${quoi ? "y" : "x"} =$`, attendu: att,
      erreurs: [{ valeur: L[1 - quoi][0], message: `Ça, c'est la valeur de $${quoi ? "x" : "y"}$.` }, { valeur: arr(Cc[quoi][0] / (1 + A[quoi][quoi]), 6), message: "On résout $(I - A)L = C$ : attention au signe, c'est $1 - a$ sur la diagonale." }],
      aides: ["$L = AL + C$ équivaut à $L - AL = C$, soit $(I_2 - A)L = C$.", `$I_2 - A = ${mat(IA)}$.`, "Résous le système correspondant (ou calcule $(I_2 - A)^{-1}C$)."],
      solution: `$(I_2 - A)L = C$ s'écrit $\\begin{cases} ${nb(IA[0][0])}x ${IA[0][1] < 0 ? "-" : "+"} ${nb(Math.abs(IA[0][1]))}y = ${nb(Cc[0][0])} \\\\ ${nb(IA[1][0])}x ${IA[1][1] < 0 ? "-" : "+"} ${nb(Math.abs(IA[1][1]))}y = ${nb(Cc[1][0])} \\end{cases}$.\n\nOn trouve $x = ${L[0][0]}$ et $y = ${L[1][0]}$ : $L = ${mat(L)}$.\n\nVérification : $AL + C = ${mat(mArr(mMul(A, L)))} + ${mat(Cc)} = ${mat(L)}$.`.replace(/ 0x [+-] /g, " ").replace(/[+-] 0y = /g, "= ") };
  });

  def("xk-transition", () => {
    const K = pick(CTX2), [s1, s2] = K.l; let M; do { M = P2(); } while (M.ai === M.bi || M.ai === 5 || M.bi === 5);
    const bonne = `$${mat(M.P)}$`;
    const T = [[M.P[0][0], M.P[1][0]], [M.P[0][1], M.P[1][1]]];
    const f = [`$${mat(T)}$`, `$${mat([[M.P[0][1], M.P[0][0]], [M.P[1][0], M.P[1][1]]])}$`, `$${mat([[M.P[0][0], M.P[0][1]], [M.P[1][1], M.P[1][0]]])}$`, `$${mat([[M.a, arr(1 - M.a)], [M.b, arr(1 - M.b)]])}$`];
    const ch = choix4(bonne, f.filter((x) => x !== bonne));
    return { enonce: `${K.qui} ${K.e[0]} (état ${s1}) ou ${K.e[1]} (état ${s2}). S'il ${K.e[0]} ${K.un} ${K.unite}, il ${K.e[1]} ${K.suiv} avec la probabilité $${nb(M.a)}$. S'il ${K.e[1]}, il ${K.e[0]} ${K.suiv} avec la probabilité $${nb(M.b)}$. Quelle est la matrice de transition (états rangés dans l'ordre ${s1}, ${s2}) ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Le coefficient $p_{ij}$ est la probabilité de passer de l'état $i$ (ligne) à l'état $j$ (colonne).", "La somme de chaque **ligne** vaut $1$.", `Ligne ${s1} : rester en ${s1} avec $1 - ${nb(M.a)} = ${nb(M.P[0][0])}$, passer en ${s2} avec $${nb(M.a)}$.`],
      solution: `Ligne ${s1} (départ ${s1}) : $${nb(M.P[0][0])}$ vers ${s1}, $${nb(M.P[0][1])}$ vers ${s2}. Ligne ${s2} : $${nb(M.P[1][0])}$ vers ${s1}, $${nb(M.P[1][1])}$ vers ${s2}.\n\n$P = ${mat(M.P)}$ : chaque ligne a pour somme $1$.`,
      figureSolution: figMarkov2(M.P, K.l) };
  });

  def("xk-graphe", () => {
    if (Math.random() < 0.5) {
      const K = pick(CTX2), M = P2(), i = rand(0, 1), j = rand(0, 1);
      const P = M.P.map((l) => l.slice()), L = K.l;
      const fig = grapheG({ sommets: [[L[0], 85, 110], [L[1], 235, 110]], aretes: [[L[0], L[0], i === 0 && j === 0 ? "?" : nbS(P[0][0])], [L[0], L[1], i === 0 && j === 1 ? "?" : nbS(P[0][1])], [L[1], L[0], i === 1 && j === 0 ? "?" : nbS(P[1][0])], [L[1], L[1], i === 1 && j === 1 ? "?" : nbS(P[1][1])]], oriente: true, h: 200, boucles: { [L[0]]: Math.PI, [L[1]]: 0 }, aria: `Graphe probabiliste à deux états ${L[0]} et ${L[1]}, une probabilité est remplacée par un point d'interrogation` });
      return { enonce: `Ce graphe probabiliste représente une chaîne de Markov à deux états ${L[0]} et ${L[1]}. Quelle probabilité remplace le point d'interrogation ?`, figure: fig, mode: "nombre", prefixe: "Probabilité :", attendu: P[i][j],
        erreurs: [{ valeur: P[1 - i][j], message: "On complète avec les flèches qui **partent** du même sommet." }, { valeur: arr(1 - P[1 - i][1 - j]), message: "La somme des probabilités des flèches qui partent d'un même sommet vaut $1$." }],
        aides: ["Les probabilités des flèches qui partent d'un même sommet ont pour somme $1$.", `Repère le sommet de départ de la flèche marquée « ? » : ${L[i]}.`, `L'autre flèche issue de ${L[i]} porte $${nb(P[i][1 - j])}$.`],
        solution: `Depuis ${L[i]} : $${nb(P[i][1 - j])} + ? = 1$, donc $? = ${nb(P[i][j])}$.` };
    }
    const P = P3(), L = ["A", "B", "C"], i = rand(0, 2), j = rand(0, 2);
    return { enonce: `Ce graphe probabiliste représente une chaîne de Markov à trois états (on n'a pas dessiné les flèches de probabilité nulle). Quel est le coefficient $p_{${L[i]}${L[j]}}$ de la matrice de transition (ligne ${L[i]}, colonne ${L[j]}) ?`, figure: figMarkov3(P, L), mode: "nombre", prefixe: `$p_{${L[i]}${L[j]}} =$`, attendu: P[i][j],
      erreurs: [{ valeur: P[j][i], message: "Attention au sens : ligne = départ, colonne = arrivée." }, { valeur: 1, message: "C'est la somme d'une ligne qui vaut $1$." }],
      aides: ["$p_{ij}$ est la probabilité de passer de l'état $i$ à l'état $j$.", `Cherche la flèche qui part de ${L[i]} et arrive en ${L[j]}.`, "S'il n'y a pas de flèche, la probabilité est nulle."],
      solution: `La flèche de ${L[i]} vers ${L[j]} ${P[i][j] ? `porte $${nb(P[i][j])}$` : "n'existe pas : la probabilité est $0$"}.\n\nMatrice de transition : $P = ${mat(P)}$.` };
  });

  def("xk-distribution", () => {
    if (Math.random() < 0.55) {
      const M = P2(), p0 = dec(rand(0, 10)), pi0 = [[p0, arr(1 - p0)]], n = pick([1, 1, 2]), quoi = pick([0, 1]);
      const pin = mArr(mMul(pi0, mPow(M.P, n))), att = pin[0][quoi];
      const pi1 = mArr(mMul(pi0, M.P));
      return { enonce: `Une chaîne de Markov à deux états $1$ et $2$ a pour matrice de transition $P = ${mat(M.P)}$ et pour distribution initiale $\\pi_0 = ${mat(pi0)}$. Quelle est la ${quoi ? "deuxième" : "première"} composante de $\\pi_${n}$ (probabilité d'être dans l'état $${quoi + 1}$ après $${n}$ transition${n > 1 ? "s" : ""}) ?`, mode: "nombre", prefixe: `Probabilité :`, attendu: att,
        erreurs: [{ valeur: arr(mMul(M.P, [[pi0[0][0]], [pi0[0][1]]])[quoi][0]), message: "On multiplie la **ligne** $\\pi_0$ par $P$ (à droite) : $\\pi_1 = \\pi_0 P$." }, { valeur: pin[0][1 - quoi], message: "Ça, c'est l'autre composante." }, { valeur: n === 2 ? pi1[0][quoi] : pi0[0][quoi], message: n === 2 ? "Ça, c'est après une seule transition." : "Ça, c'est la distribution initiale." }],
        aides: ["$\\pi_{n+1} = \\pi_n P$ : on multiplie la matrice ligne par $P$.", `$\\pi_1 = \\pi_0 P = ${mat(pi1)}$${n === 2 ? "" : " : c'est la réponse à lire"}.`, n === 2 ? "Recommence : $\\pi_2 = \\pi_1 P$." : "Lis la composante demandée."],
        solution: `$\\pi_1 = \\pi_0 P = ${mat(pi1)}$.${n === 2 ? `\n\n$\\pi_2 = \\pi_1 P = ${mat(pin)}$.` : ""}\n\nLa composante cherchée vaut $${nb(att)}$.` };
    }
    const P = P3(), a = rand(0, 10), b = rand(0, 10 - a), pi0 = [[dec(a), dec(b), dec(10 - a - b)]], quoi = rand(0, 2);
    const pi1 = mArr(mMul(pi0, P)), att = pi1[0][quoi];
    return { enonce: `Une chaîne de Markov à trois états a pour matrice de transition $P = ${mat(P)}$ et pour distribution initiale $\\pi_0 = ${mat(pi0)}$. Quelle est la composante numéro $${quoi + 1}$ de $\\pi_1$ ?`, mode: "nombre", prefixe: "Probabilité :", attendu: att,
      erreurs: [{ valeur: arr(P[quoi].reduce((s, v, k) => s + v * pi0[0][k], 0)), message: "On multiplie la ligne $\\pi_0$ par la **colonne** $" + (quoi + 1) + "$ de $P$." }, { valeur: pi0[0][quoi], message: "Ça, c'est la distribution initiale." }],
      aides: ["$\\pi_1 = \\pi_0 P$.", `La composante $${quoi + 1}$ de $\\pi_1$ est le produit de $\\pi_0$ par la colonne $${quoi + 1}$ de $P$.`, `Calcule $${pi0[0].map((v, k) => `${nb(v)} \\times ${nb(P[k][quoi])}`).join(" + ")}$.`],
      solution: `Composante $${quoi + 1}$ de $\\pi_1$ : $${pi0[0].map((v, k) => `${nb(v)} \\times ${nb(P[k][quoi])}`).join(" + ")} = ${nb(att)}$.\n\n$\\pi_1 = ${mat(pi1)}$.` };
  });

  def("xk-pn", () => {
    const deux = Math.random() < 0.5, P = deux ? P2().P : P3(), k = P.length, i = rand(0, k - 1), j = rand(0, k - 1), P2m = mArr(mMul(P, P)), att = P2m[i][j];
    return { enonce: `Une chaîne de Markov a pour matrice de transition $P = ${mat(P)}$. Quelle est la probabilité de passer de l'état $${i + 1}$ à l'état $${j + 1}$ en **deux** transitions ?`, mode: "nombre", prefixe: "Probabilité :", attendu: att,
      erreurs: [{ valeur: P[i][j], message: "Ça, c'est en une seule transition." }, { valeur: arr(P[i][j] ** 2), message: "On ne met pas le coefficient au carré : c'est le coefficient de $P^2$." }, { valeur: P2m[j][i], message: "Attention au sens : ligne $" + (i + 1) + "$ (départ), colonne $" + (j + 1) + "$ (arrivée)." }],
      aides: ["La probabilité de passer de $i$ à $j$ en $n$ transitions est le coefficient $(i\\,;j)$ de $P^n$.", `Ici, c'est le coefficient $(${i + 1}\\,;${j + 1})$ de $P^2$ : ligne $${i + 1}$ de $P$ fois colonne $${j + 1}$ de $P$.`, "Chaque terme correspond à un état intermédiaire possible."],
      solution: `$(P^2)_{${i + 1}${j + 1}} = ${P[i].map((v, q) => `${nb(v)} \\times ${nb(P[q][j])}`).join(" + ")} = ${nb(att)}$.\n\nChaque produit correspond à un chemin $${i + 1} \\to q \\to ${j + 1}$ par un état intermédiaire $q$.` };
  });

  def("xk-invariante", () => {
    const M = P2(), quoi = pick([0, 1]);
    const s = M.ai + M.bi, att = quoi ? M.ai / s : M.bi / s;
    return { enonce: `Une chaîne de Markov à deux états a pour matrice de transition $P = ${mat(M.P)}$. On cherche sa distribution invariante $\\pi = \\begin{pmatrix} x & y \\end{pmatrix}$, telle que $\\pi P = \\pi$ et $x + y = 1$. Que vaut $${quoi ? "y" : "x"}$ ? Donne la valeur exacte (fraction).`, mode: "nombre", prefixe: `$${quoi ? "y" : "x"} =$`, attendu: att,
      erreurs: [{ valeur: quoi ? M.bi / s : M.ai / s, message: `Ça, c'est la valeur de $${quoi ? "x" : "y"}$.` }, { valeur: quoi ? M.a : M.b, message: "Il faut résoudre le système $\\pi P = \\pi$ avec $x + y = 1$." }, { valeur: arr(att, 2), message: "C'est une valeur approchée : donne la fraction exacte." }],
      aides: ["$\\pi P = \\pi$ donne, pour la première composante : $" + nb(M.P[0][0]) + "x + " + nb(M.P[1][0]) + "y = x$.", `Simplifie : $${nb(M.a)}x = ${nb(M.b)}y$.`, "Avec $x + y = 1$, remplace $y$ par $1 - x$ et résous."],
      solution: `$\\pi P = \\pi$ donne $${nb(M.P[0][0])}x + ${nb(M.P[1][0])}y = x$, soit $${nb(M.a)}x = ${nb(M.b)}y$.\n\nAvec $y = 1 - x$ : $${nb(M.a)}x = ${nb(M.b)} - ${nb(M.b)}x$, donc $${coef(arr(M.a + M.b), "x")} =${nb(M.b)}$ et $x = ${frac(M.bi, s)}$, puis $y = ${frac(M.ai, s)}$.\n\n$\\pi = \\begin{pmatrix} ${frac(M.bi, s)} & ${frac(M.ai, s)} \\end{pmatrix}$.` };
  });

  def("xk-vrai-faux", () => vraiFaux4([
    ["La somme des coefficients de chaque ligne d'une matrice de transition vaut $1$.", true, "depuis un état, on va forcément dans l'un des états."],
    ["Si $\\pi_0$ est la distribution initiale, la distribution après $n$ transitions est $\\pi_0 P^n$.", true, "car $\\pi_{n+1} = \\pi_n P$ (récurrence)."],
    ["Le coefficient $(i\\,;j)$ de $P^n$ est la probabilité de passer de $i$ à $j$ en $n$ transitions.", true, "c'est la propriété démontrée dans le cours."],
    ["Une distribution invariante $\\pi$ vérifie $\\pi P = \\pi$.", true, "c'est la définition : si on part de $\\pi$, on reste en $\\pi$."],
    ["Si $U_{n+1} = AU_n$, alors $U_n = A^nU_0$.", true, "par récurrence, comme pour une suite géométrique."],
    ["Les coefficients d'une matrice de transition sont compris entre $0$ et $1$.", true, "ce sont des probabilités."],
    ["La somme de chaque colonne d'une matrice de transition vaut $1$.", false, "ce sont les **lignes** qui ont pour somme $1$ (avec la convention du programme)."],
    ["La distribution après une transition est $P\\pi_0$.", false, "$\\pi_0$ est une matrice **ligne** : on calcule $\\pi_0 P$."],
    ["La probabilité de passer de $i$ à $j$ en deux transitions est $p_{ij}^2$.", false, "c'est le coefficient $(i\\,;j)$ de $P^2$, qui tient compte de tous les états intermédiaires."],
    ["Si $U_{n+1} = AU_n + C$, alors $U_n = A^nU_0 + nC$.", false, "on passe par la suite constante $L$ : $U_n - L = A^n(U_0 - L)$."],
    ["Dans un graphe probabiliste, la somme des probabilités des flèches qui arrivent sur un sommet vaut $1$.", false, "c'est la somme des flèches qui **partent** d'un sommet qui vaut $1$."],
    ["Une chaîne de Markov n'a jamais de distribution invariante.", false, "toute chaîne à deux ou trois états en a au moins une."]
  ], ["Une matrice de transition : lignes = départ, colonnes = arrivée, chaque ligne a pour somme $1$.", "La distribution est une matrice ligne, multipliée à droite par $P$.", "Un contre-exemple suffit pour une affirmation fausse."]));

  /* Figures du cours (chapitre 11) */
  FIGURES["xk-cours-markov2"] = () => figMarkov2([[0.7, 0.3], [0.4, 0.6]], ["S", "R"]);
  FIGURES["xk-cours-markov3"] = () => figMarkov3([[0.5, 0.3, 0.2], [0.1, 0.8, 0.1], [0.4, 0, 0.6]], ["A", "B", "C"]);
})();
