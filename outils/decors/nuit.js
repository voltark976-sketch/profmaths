// Dessins du bandeau du thème « Nuit étoilée » : étoiles (champ clair et voie lactée), étoiles vives
// à aigrettes, lune en croissant avec sa lumière cendrée, étoile filante, collines, village endormi
// aux fenêtres allumées, arbres en silhouette. Dessins originaux.
// Usage : node outils/decors/nuit.js   (réécrit les dessins dans assets/theme-nuit.css)
const { hasard, n1, nums, svg, ecrire } = require("./commun");
const alea = hasard(31);

/* ---------- Champs d'étoiles : motifs qui se répètent ; tailles et éclats variés ---------- */
function champ(w, h, n, rmin, rmax, teintes) {
  let c = "";
  for (let i = 0; i < n; i++) {
    const r = rmin + Math.pow(alea(), 2.2) * (rmax - rmin);
    c += `<circle cx='${n1(alea() * w)}' cy='${n1(alea() * h)}' r='${n1(r)}' fill='${teintes[Math.floor(alea() * teintes.length)]}' fill-opacity='${n1(0.35 + alea() * 0.65)}'/>`;
  }
  return svg(`0 0 ${w} ${h}`, c);
}
const etoiles = champ(200, 200, 34, 0.35, 1.25, ["#fff", "#fff", "#dfe7ff", "#fff1d6"]);
const voieLactee = champ(120, 120, 60, 0.25, 0.75, ["#fff", "#e6ecff", "#d6e0ff"]);
// Étoile vive : point blanc, halo, aigrettes en croix
const vive = svg("0 0 20 20", `<defs><radialGradient id='h'><stop offset='0' stop-color='#fff' stop-opacity='.9'/><stop offset='.25' stop-color='#cfdcff' stop-opacity='.35'/><stop offset='1' stop-color='#cfdcff' stop-opacity='0'/></radialGradient></defs><circle cx='10' cy='10' r='10' fill='url(#h)'/><path d='M10 1.5L10.6 9.4 18.5 10 10.6 10.6 10 18.5 9.4 10.6 1.5 10 9.4 9.4z' fill='#fff' fill-opacity='.9'/><circle cx='10' cy='10' r='1.3' fill='#fff'/>`);

/* ---------- Lune : croissant éclairé, le reste du disque à peine visible (lumière cendrée), quelques mers ---------- */
// (dessin de 120 × 120 : la lune au centre, entourée de son halo)
const lune = svg("0 0 120 120", [
  `<defs><radialGradient id='h'><stop offset='.3' stop-color='#fff4cc' stop-opacity='.22'/><stop offset='.55' stop-color='#fff4cc' stop-opacity='.07'/><stop offset='1' stop-color='#fff4cc' stop-opacity='0'/></radialGradient><radialGradient id='c' cx='.62' cy='.4'><stop offset='0' stop-color='#fffbea'/><stop offset='1' stop-color='#f2df9e'/></radialGradient><mask id='m'><rect width='120' height='120' fill='#fff'/><circle cx='51' cy='56' r='22' fill='#000'/></mask></defs>`,
  `<circle cx='60' cy='60' r='60' fill='url(#h)'/>`,
  `<circle cx='60' cy='60' r='22' fill='#2c3570'/><circle cx='60' cy='60' r='22' fill='#8b96c9' fill-opacity='.18'/>`,
  `<g mask='url(#m)'><circle cx='60' cy='60' r='22' fill='url(#c)'/><ellipse cx='74' cy='54' rx='3.4' ry='2.6' fill='#d9c788' fill-opacity='.55'/><ellipse cx='70' cy='70' rx='2.6' ry='2' fill='#d9c788' fill-opacity='.5'/><circle cx='77' cy='64' r='1.6' fill='#d9c788' fill-opacity='.45'/></g>`,
].join(""));

/* ---------- Étoile filante : un trait qui s'efface vers l'arrière ---------- */
const filante = svg("0 0 90 30", `<defs><linearGradient id='f' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='#fff' stop-opacity='0'/><stop offset='.85' stop-color='#e6ecff' stop-opacity='.75'/><stop offset='1' stop-color='#fff'/></linearGradient></defs><path d='M2 28L86 4' stroke='url(#f)' stroke-width='1.3' stroke-linecap='round'/><circle cx='86' cy='4' r='1.5' fill='#fff'/>`);

/* ---------- Collines lointaines (s'étirent sur toute la largeur) ---------- */
const collines = svg("0 0 400 50", [
  `<path d='M0 50V24C40 16 80 12 124 18S200 30 240 24 320 10 360 14 392 20 400 20V50z' fill='#1d2558'/>`,
  `<path d='M0 50V36C50 30 100 28 150 33S240 42 290 36 360 30 400 33V50z' fill='#151b46'/>`,
].join(""), " preserveAspectRatio='none'");

/* ---------- Village endormi sur une colline, fenêtres allumées, arbres ---------- */
function maison(x, sol, w, h, toit, fenetres) {
  let s = `<path d='M${nums(x, sol)}V${n1(sol - h)}L${nums(x + w / 2, sol - h - toit)}L${nums(x + w, sol - h)}V${n1(sol)}z' fill='#0d1230'/>`;
  for (const [fx, fy] of fenetres) s += `<rect x='${n1(x + fx)}' y='${n1(sol - h + fy)}' width='2' height='2.4' fill='#ffd76a'/><rect x='${n1(x + fx - 1.5)}' y='${n1(sol - h + fy - 1.5)}' width='5' height='5.4' fill='#ffd76a' fill-opacity='.18'/>`;
  return s;
}
function arbreRond(x, sol, h, r) {
  return `<path d='M${nums(x - 0.7, sol)}h1.4l-.3-${n1(h)}h-.8z' fill='#0b0f29'/><circle cx='${n1(x)}' cy='${n1(sol - h - r * 0.4)}' r='${n1(r)}' fill='#0b0f29'/><circle cx='${n1(x - r * 0.6)}' cy='${n1(sol - h + r * 0.15)}' r='${n1(r * 0.7)}' fill='#0b0f29'/><circle cx='${n1(x + r * 0.65)}' cy='${n1(sol - h + r * 0.1)}' r='${n1(r * 0.72)}' fill='#0b0f29'/>`;
}
function palmier(x, sol, h) {
  const tx = x + h * 0.18, ty = sol - h;
  let s = `<path d='M${nums(x - 1, sol)}Q${nums(x + h * 0.02, sol - h * 0.6, tx, ty)}l1 .3Q${nums(x + h * 0.08, sol - h * 0.55, x + 1, sol)}z' fill='#0b0f29'/>`;
  for (const [dx, dy] of [[-1, 0.45], [-0.8, -0.2], [-0.25, -0.55], [0.35, -0.5], [0.85, -0.1], [1, 0.5]]) {
    const L = h * 0.42;
    s += `<path d='M${nums(tx, ty)}q${nums(dx * L * 0.5, dy * L * 0.6 - L * 0.25, dx * L, dy * L)}' fill='none' stroke='#0b0f29' stroke-width='${n1(h * 0.045)}' stroke-linecap='round'/>`;
  }
  return s;
}
const village = svg("0 0 200 80", [
  `<path d='M0 80V34C30 32 60 36 92 44S150 62 200 80z' fill='#10153a'/>`,
  maison(26, 37, 14, 9, 5, [[3, 3], [9, 3]]),
  maison(44, 39.5, 11, 7.5, 4.4, [[4.5, 2.6]]),
  maison(60, 43.5, 16, 9, 5.2, [[3.4, 3], [10.6, 3]]),
  arbreRond(14, 35, 8, 6),
  arbreRond(84, 47, 7, 5.2),
  palmier(104, 51, 30),
].join(""));
const arbresDroite = svg("0 0 120 60", [
  `<path d='M0 60C30 52 70 44 120 40V60z' fill='#10153a'/>`,
  arbreRond(78, 46, 11, 8),
  arbreRond(100, 43, 14, 10),
  palmier(56, 50, 26),
].join(""));
const fond = svg("0 0 400 16", `<path d='M0 16V6C80 2 160 8 240 7S360 3 400 5V16z' fill='#0a0d24'/>`, " preserveAspectRatio='none'");

ecrire("nuit", { etoiles, "voie-lactee": voieLactee, vive, lune, filante, collines, village, "arbres-droite": arbresDroite, fond });
