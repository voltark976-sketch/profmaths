// Dessins du bandeau du thème « Forêt » : troncs qui se perdent dans la brume (trois plans), grand
// arbre avec sa liane, fougère arborescente, fougères au sol, poussières dorées dans la lumière.
// Dessins originaux.
// Usage : node outils/decors/foret.js   (réécrit les dessins dans assets/theme-foret.css)
const { hasard, n1, nums, entiers, relatif, poly, svg, bez, der, ecrire } = require("./commun");
const alea = hasard(53);

/* ---------- Troncs : un motif qui se répète ; ils montent de la brume et s'effacent vers le haut ---------- */
function troncs(w, h, n, lmin, lmax, coul, id) {
  let d = "";
  for (let i = 0; i < n; i++) {
    const x = ((i + 0.2 + alea() * 0.6) * w) / n, l = lmin + alea() * (lmax - lmin), pied = l * (1.25 + alea() * 0.2);
    d += `M${nums(x - pied / 2, h)}C${nums(x - l / 2, h - 8, x - l / 2, h * 0.5, x - l * 0.42, 0)}H${n1(x + l * 0.42)}C${nums(x + l / 2, h * 0.5, x + l / 2, h - 8, x + pied / 2, h)}z`;
    // une branche de temps en temps
    if (alea() < 0.45) { const y = h * (0.2 + alea() * 0.35), s = alea() < 0.5 ? -1 : 1; d += `M${nums(x + (s * l) / 2.4, y + l * 0.4)}l${nums(s * l * 1.6, -l * 1.4)}l${nums(s * l * 0.25, l * 0.3)}l${nums(-s * l * 1.5, l * 1.5)}z`; }
  }
  return svg(`0 0 ${w} ${h}`, `<defs><linearGradient id='${id}' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='${coul}' stop-opacity='0'/><stop offset='.45' stop-color='${coul}' stop-opacity='.8'/><stop offset='1' stop-color='${coul}'/></linearGradient></defs><path d='${d}' fill='url(#${id})'/>`);
}
const troncsLoin = troncs(300, 120, 9, 3, 6, "#9cc28d", "a");
const troncsMilieu = troncs(420, 140, 6, 7, 12, "#4f8250", "b");

/* ---------- Fronde (fougère) : nervure arquée, folioles des deux côtés, de plus en plus courtes vers le bout ---------- */
function fronde(C, ang, L, chute, lmax, nf, E) {
  const a = (ang * Math.PI) / 180, u = [Math.cos(a), -Math.sin(a)];
  const Q = [C[0] + L * u[0] * 0.65, C[1] + L * u[1] * 0.65], F = [C[0] + L * u[0], C[1] + L * u[1] + chute * L];
  const g = [], d = [];
  for (let k = 0; k <= nf; k++) {
    const t = 0.08 + (k * 0.92) / nf, p = bez(t, C, Q, F), v = der(t, C, Q, F), n = Math.hypot(v[0], v[1]);
    const T = [v[0] / n, v[1] / n], N = [-T[1], T[0]];
    const l = lmax * Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.05)), 0.7) * (1.15 - 0.7 * t) * (0.85 + alea() * 0.3);
    // folioles un peu tournées vers le bout de la fronde, et qui retombent légèrement
    for (const [s, liste] of [[1, g], [-1, d]]) {
      let dx = 0.45 * T[0] + s * N[0], dy = 0.45 * T[1] + s * N[1] + 0.35;
      const m = Math.hypot(dx, dy); dx /= m; dy /= m;
      liste.push([p[0] + dx * l * 0.35 - T[0] * 0.6, p[1] + dy * l * 0.35 - T[1] * 0.6], [p[0] + dx * l, p[1] + dy * l]);
    }
  }
  const pts = [C, ...g, F, ...d.reverse()];
  return "M" + E(C[0], C[1]) + "l" + relEnt(pts) + "z";
}
const E1 = entiers(1);
// déplacements relatifs en nombres entiers (les dessins sont tracés assez grand pour cela)
const relEnt = (pts) => relatif(pts.map(([x, y]) => [x / 4, y / 4]), 4);

/* ---------- Fougère arborescente (on en voit dans les forêts humides de Mayotte) ---------- */
function fougereArbo(x, sol, h) {
  const C = [x + h * 0.06, sol - h];
  let s = `<path d='M${E1(x - 7, sol)}l${relEnt([[x - 7, sol], [x - 2.4, sol - h * 0.5], [C[0] - 3, C[1] + 3], [C[0] + 3, C[1] + 3], [x + 3.6, sol - h * 0.5], [x + 7, sol]])}z' fill='#173521'/>`;
  let f = "";
  for (const [ang, L, ch] of [[175, 0.62, 0.55], [150, 0.58, 0.35], [124, 0.5, 0.22], [98, 0.44, 0.18], [72, 0.5, 0.22], [46, 0.58, 0.35], [18, 0.62, 0.55], [-20, 0.48, 0.6], [200, 0.48, 0.6]]) f += fronde(C, ang, h * L, ch, h * 0.11, 10, E1);
  return s + `<path d='${f}' fill='#1b4426'/>`;
}
/* ---------- Touffes de fougères au sol ---------- */
function touffe(x, sol, h, coul) {
  let f = "";
  for (const [ang, L, ch] of [[156, 1, 0.5], [122, 0.9, 0.28], [90, 0.85, 0.2], [58, 0.9, 0.3], [26, 1, 0.55]]) f += fronde([x, sol], ang + (alea() - 0.5) * 10, h * L, ch, h * 0.17, 8, E1);
  return `<path d='${f}' fill='${coul}'/>`;
}

/* ---------- Grand arbre à gauche, écorce et liane ---------- */
const grandArbre = svg("0 0 80 150", [
  `<path d='M0 150V0H26C24 30 25 70 28 110S36 140 44 150z' fill='#20341f'/>`,
  `<path d='M8 10C9 40 8 80 11 120M17 4C18 36 17 70 20 104M23 30C24 60 25 90 30 130' fill='none' stroke='#2f4a2b' stroke-width='1.6' stroke-linecap='round'/>`,
  `<path d='M26 150C30 142 38 138 50 140 40 142 34 146 32 150z' fill='#20341f'/>`,
  // liane qui pend, avec ses feuilles
  `<path d='M24 0C40 20 34 50 46 70S44 108 54 124' fill='none' stroke='#2a4826' stroke-width='1.8' stroke-linecap='round'/>`,
  `<g fill='#2f5a2c'><ellipse cx='38' cy='26' rx='4' ry='2' transform='rotate(-30 38 26)'/><ellipse cx='40' cy='50' rx='4' ry='2' transform='rotate(25 40 50)'/><ellipse cx='45' cy='78' rx='4' ry='2' transform='rotate(-25 45 78)'/><ellipse cx='46' cy='100' rx='3.6' ry='1.8' transform='rotate(30 46 100)'/><ellipse cx='52' cy='118' rx='3.4' ry='1.7' transform='rotate(-20 52 118)'/></g>`,
].join(""));

/* ---------- Premier plan : sol moussu, fougères ; la fougère arborescente à droite ---------- */
const solGauche = svg("0 0 520 300", [
  `<path d='M0 300V230C80 222 160 226 240 240S400 270 520 300z' fill='#244a2a'/>`,
  touffe(170, 262, 110, "#2a5a2f"), touffe(70, 252, 130, "#1f4626"), touffe(270, 276, 86, "#2f6533"),
].join(""));
const solDroite = svg("0 0 520 400", [
  `<path d='M0 400C120 370 240 350 360 340S480 336 520 336V400z' fill='#244a2a'/>`,
  fougereArbo(372, 384, 236),
  touffe(240, 380, 104, "#2a5a2f"), touffe(470, 362, 120, "#1f4626"),
].join(""));

/* ---------- Poussières dorées dans la lumière ---------- */
function poussieres(w, h, n) {
  let c = "";
  for (let i = 0; i < n; i++) c += `<circle cx='${n1(alea() * w)}' cy='${n1(alea() * h)}' r='${n1(0.6 + alea() * 1.1)}' fill-opacity='${n1(0.4 + alea() * 0.6)}'/>`;
  return svg(`0 0 ${w} ${h}`, `<g fill='#fff3b0'>${c}</g>`);
}

ecrire("foret", { "troncs-loin": troncsLoin, "troncs-milieu": troncsMilieu, "grand-arbre": grandArbre, "sol-gauche": solGauche, "sol-droite": solDroite, poussieres: poussieres(200, 140, 14) });
