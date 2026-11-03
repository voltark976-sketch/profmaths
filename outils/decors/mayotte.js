// Dessins du bandeau du thème « Mayotte » : cocotier, reflet du soleil, maquis, îlots,
// Grande-Terre et le mont Choungui, plage. Dessins originaux.
// Usage : node outils/decors/mayotte.js   (réécrit les dessins dans assets/theme-mayotte.css)
const { hasard, n1, colle, nums, entiers, relatif, svg, bez, der, ecrire } = require("./commun");
const alea = hasard(7);

/* ---------- Cocotier : tronc courbe annelé, palmes qui s'arquent puis retombent ---------- */
function cocotier(o) {
  const { C, P0, P1, K } = o, E = entiers(K);
  const g = [], d = [];
  for (let k = 0; k <= 12; k++) {
    const t = k / 12, p = bez(t, P0, P1, C), v = der(t, P0, P1, C), n = Math.hypot(v[0], v[1]);
    const nx = -v[1] / n, ny = v[0] / n, w = o.larg * (t < 0.06 ? 1.35 : 1 - 0.45 * t);
    g.push([p[0] - nx * w, p[1] - ny * w]); d.push([p[0] + nx * w, p[1] + ny * w]);
  }
  const pts = [...g, ...d.reverse()];
  const tronc = "M" + E(pts[0][0], pts[0][1]) + "l" + relatif(pts, K) + "z";
  let anneaux = "";
  for (let k = 1; k < 10; k++) {
    const t = k / 10.5, p = bez(t, P0, P1, C), v = der(t, P0, P1, C), n = Math.hypot(v[0], v[1]);
    const nx = -v[1] / n, ny = v[0] / n, w = o.larg * (1 - 0.45 * t) * 0.8;
    anneaux += "M" + E(p[0] - nx * w, p[1] - ny * w) + "l" + E(2 * nx * w, 2 * ny * w);
  }
  // Chaque palme : dessous, un rideau de folioles qui pendent, frangé (pointes et creux) ;
  // dessus, un bord lisse juste au-dessus de la nervure ; pointue au bout.
  let palmes = "";
  for (const [ang, L, chute, lmax] of o.palmes) {
    const a = (ang * Math.PI) / 180, u = [Math.cos(a), -Math.sin(a)];
    const Q = [C[0] + L * u[0] * 0.7, C[1] + L * u[1] * 0.7], F = [C[0] + L * u[0], C[1] + L * u[1] + chute * L];
    const bas = [], haut = [];
    for (let k = 0; k <= o.nf; k++) {
      const t = 0.05 + (k * 0.95) / o.nf, p = bez(t, C, Q, F), v = der(t, C, Q, F), n = Math.hypot(v[0], v[1]);
      const T = [v[0] / n, v[1] / n];
      let N = [-T[1], T[0]];
      if (N[1] < 0) N = [-N[0], -N[1]];
      let dx = 0.5 * T[0] + N[0], dy = 0.5 * T[1] + N[1] + 1.4;
      const m = Math.hypot(dx, dy); dx /= m; dy /= m;
      const l = lmax * Math.pow(Math.sin(Math.PI * t), 0.5) * (1.2 - 0.6 * t) * (0.8 + alea() * 0.4);
      bas.push([p[0] + dx * l * 0.55, p[1] + dy * l * 0.55], [p[0] + dx * l, p[1] + dy * l]);
      if (k % 3 === 0) haut.push([p[0] - N[0] * 1.1 * (1 - t), p[1] - N[1] * 1.1 * (1 - t)]);
    }
    const tout = [[C[0], C[1]], ...bas, [F[0], F[1]], ...haut.reverse()];
    palmes += "M" + E(tout[0][0], tout[0][1]) + "l" + relatif(tout, K) + "z";
  }
  const noix = o.noix.map(([x, y, r]) => `<circle cx='${E(x)}' cy='${E(y)}' r='${E(r)}'/>`).join("");
  return `<g fill='${o.coul}'><path d='${tronc}'/><path d='${anneaux}' stroke='${o.anneau}' stroke-opacity='.45' stroke-width='${n1(0.7 * K)}'/><path d='${palmes}'/>${noix}</g>`;
}
const cocotierDessin = svg("0 0 520 600", cocotier({
  K: 4, C: [70, 42], P0: [40, 150], P1: [46, 96], larg: 4.3, coul: "#16251e", anneau: "#55402c", nf: 13,
  noix: [[67, 45, 2.7], [71.5, 46, 2.7], [69, 42.5, 2.5]],
  palmes: [[180, 60, 0.7, 13], [152, 52, 0.52, 12], [118, 44, 0.42, 11], [86, 36, 0.36, 9], [56, 46, 0.48, 11], [26, 56, 0.62, 12], [0, 60, 0.74, 13], [-34, 42, 0.66, 10], [214, 42, 0.66, 10]],
}));

/* ---------- Maquis : ligne de buissons bosselée (arcs bombés) sur une pointe de terre ---------- */
function crete(x0, x1, sol, hmin, hmax, pmin, pmax, bas) {
  const pts = [];
  for (let x = x0; x < x1; x += pmin + alea() * (pmax - pmin)) pts.push([x, sol(x) - hmin - alea() * (hmax - hmin)]);
  pts.push([x1, sol(x1)]);
  let d = "M" + nums(x0, bas) + "V" + n1(pts[0][1]);
  let px = Math.round(pts[0][0] * 10) / 10, py = Math.round(pts[0][1] * 10) / 10;
  for (let i = 1; i < pts.length; i++) {
    const x = Math.round(pts[i][0] * 10) / 10, y = Math.round(pts[i][1] * 10) / 10, r = Math.hypot(x - px, y - py) * (0.52 + alea() * 0.18);
    d += "a" + nums(r, r) + " 0 0 1 " + nums(x - px, y - py);
    px = x; py = y;
  }
  return d + "V" + n1(bas) + "z";
}
const solG = (x) => 46 - 30 * Math.exp(-x / 60); // la pointe de terre monte vers la gauche
const maquisGauche = svg("0 0 170 46", `<path d='M0 46V16C30 19 70 27 110 35S150 43 170 46z' fill='#22362c'/><path d='${crete(-2, 112, (x) => solG(x) - 3, 3, 9, 6, 12, 46)}' fill='#2b4538'/><path d='${crete(-3, 150, (x) => solG(x) + 3, 2, 6, 5, 10, 46)}' fill='#16261e'/>`);
const maquisDroite = svg("0 0 80 30", `<path d='M6 30C20 25 50 21 80 19V30z' fill='#22362c'/><path d='${crete(12, 80, (x) => 30 - (x - 6) * 0.15, 2, 7, 4, 8, 30)}' fill='#182a22'/>`);

/* ---------- Reflet du soleil : éclats en fuseau (pointus aux deux bouts), larges sous l'horizon, épars vers la plage ---------- */
function reflet() {
  let y = 0.9, d = "", px = 0, py = 0;
  const I = (...v) => colle(v.map(String));
  while (y < 76) {
    const p = y / 80, nb = p < 0.1 ? 1 : 1 + Math.floor(alea() * (p < 0.4 ? 2 : 3));
    for (let i = 0; i < nb; i++) {
      const w = p < 0.1 ? 32 - p * 90 + alea() * 4 : 5 + alea() * (17 - p * 10);
      const h = 1.3 + p * 1.5 + alea() * 0.5;
      const x = 32 + (nb === 1 ? (alea() - 0.5) * 3 : (alea() - 0.5) * (16 + p * 22)) - w / 2;
      // coordonnées ×5, entières (viewBox 320 × 400)
      const X = Math.round(x * 5), Y = Math.round(y * 5), W = Math.round(w * 5), H = Math.round(h * 5);
      d += (d ? "m" + I(X - px, Y - py) : "M" + I(X, Y)) + "q" + I(Math.round(W / 2), -H, W, 0) + "q" + I(-Math.round(W / 2), H, -W, 0);
      px = X; py = Y;
    }
    y += 2 + p * 6.5 + alea() * 1.5;
  }
  return svg("0 0 320 400", `<defs><linearGradient id='r' x1='0' y1='0' x2='0' y2='400' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#fff8e0'/><stop offset='.35' stop-color='#ffe6a8' stop-opacity='.85'/><stop offset='1' stop-color='#ffd690' stop-opacity='.3'/></linearGradient></defs><path d='${d}' fill='url(#r)'/>`, " preserveAspectRatio='none'");
}
const refletDessin = reflet();

/* ---------- Îlots : boisé sur son platier turquoise, banc de sable à deux cocotiers, îlot lointain ---------- */
const ilotBoise = svg("0 0 86 26", `<ellipse cx='43' cy='20' rx='42' ry='4.6' fill='#9ae8d6' fill-opacity='.42'/><path d='M14 20C17 15 22 11.5 27 10.6 29 7.6 33 6.1 36 6.5 39 3.7 44 3.3 47 4.9 50 3.9 54 4.7 56 7.1 60 7.7 64 10.6 66 13.6 68 15.1 70 17.6 72 20z' fill='#24443a'/><path d='M47 4.9C50 3.9 54 4.7 56 7.1 60 7.7 64 10.6 66 13.6 68 15.1 70 17.6 72 20' fill='none' stroke='#f0a868' stroke-opacity='.55' stroke-width='.9'/><path d='M12 20.2h62' stroke='#f5ddab' stroke-width='1.5' stroke-linecap='round'/><path d='M18 22.2C30 23.6 54 23.6 68 22' fill='none' stroke='#0b5866' stroke-opacity='.28' stroke-width='2.2'/>`);
const ilotSable = svg("0 0 52 24", `<ellipse cx='26' cy='19.6' rx='25' ry='3.6' fill='#aaf0de' fill-opacity='.5'/><path d='M8 19.6C14 16.8 34 16.4 43 19.6z' fill='#f8e6bd'/><g fill='none' stroke='#203a33' stroke-linecap='round'><path d='M20.5 18C21 14.6 21.6 11.4 23.6 8.6M31 17.6C30.8 14.8 30.2 12.4 28.6 10' stroke-width='1.2'/><path d='M23.6 8.6q-3-1.4-5.8 1.8M23.6 8.6q-2.4-2.6-5.2-1.6M23.6 8.6q-.2-2.8 2.4-3.6M23.6 8.6q2.6-1.6 5 .6M23.6 8.6q2.8 0 4.2 3M28.6 10q-2.6-1.6-4.8.4M28.6 10q.4-2.6 3-3M28.6 10q2.6-.6 4 2.2' stroke-width='1.1'/></g><path d='M11 21.4C19 22.6 33 22.6 41 21.2' fill='none' stroke='#0b5866' stroke-opacity='.25' stroke-width='1.6'/>`);
const ilotLoin = svg("0 0 34 8", `<path d='M0 8C5 5.4 9 2 15 1.8S27 4.6 34 8z' fill='#5d7470' fill-opacity='.8'/>`);

/* ---------- Grande-Terre au loin, avec le pic du mont Choungui ---------- */
const grandeTerre = svg("0 0 230 28", `<path d='M0 28V9.5C14 7.6 26 9.4 40 7.6S68 8.6 82 9.8C96 11 108 14 120 18S136 26 142 28z' fill='#e3a58c'/><path d='M0 28V15.6C12 14 22 14.6 32 13S52 14 62 13.4 82 15 92 14C99 13.2 104 9.6 108 5 110 2.6 111.6 1.6 113 1.6S115.8 2.6 117.6 5C121 9.6 125 13 132 14.2 148 16.8 166 19 184 22.4 196 24.6 208 26.4 230 28z' fill='#bf7180'/>`);

/* ---------- Plage au premier plan, liseré d'écume ---------- */
const plage = svg("0 0 400 26", `<defs><linearGradient id='s' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#f7ddb0'/><stop offset='1' stop-color='#e8bb82'/></linearGradient></defs><path d='M0 10C50 12 110 15 180 15.4S310 14 350 11.6 390 9.2 400 9.6V26H0z' fill='url(#s)'/><path d='M0 10C50 12 110 15 180 15.4S310 14 350 11.6 390 9.2 400 9.6' fill='none' stroke='#fff' stroke-opacity='.8' stroke-width='1.6' vector-effect='non-scaling-stroke'/>`, " preserveAspectRatio='none'");

ecrire("mayotte", { "ilot-sable": ilotSable, "ilot-boise": ilotBoise, "ilot-loin": ilotLoin, "grande-terre": grandeTerre, reflet: refletDessin, cocotier: cocotierDessin, "maquis-droite": maquisDroite, "maquis-gauche": maquisGauche, plage });
