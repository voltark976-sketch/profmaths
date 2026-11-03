// Dessins du bandeau du thème « Tableau noir » : figures tracées à la craie (repère et parabole,
// triangle rectangle, cercle et rayon), traces d'éponge, poussière de craie, craies et brosse posées
// dans la rigole. Dessins originaux.
// Usage : node outils/decors/tableau.js   (réécrit les dessins dans assets/theme-tableau.css)
const { hasard, n1, nums, svg, ecrire } = require("./commun");
const alea = hasard(79);

// Trait de craie : un passage franc et un second, plus léger et un peu décalé (le grain de la craie)
function craie(pts, coul, ep = 1.6) {
  const tracer = (dj) => "M" + pts.map(([x, y], i) => (i ? "L" : "") + nums(x + (alea() - 0.5) * dj, y + (alea() - 0.5) * dj)).join("");
  return `<path d='${tracer(0.5)}' fill='none' stroke='${coul}' stroke-width='${ep}' stroke-opacity='.85' stroke-linecap='round' stroke-linejoin='round'/><path d='${tracer(1.4)}' fill='none' stroke='${coul}' stroke-width='${n1(ep * 0.55)}' stroke-opacity='.4' stroke-linecap='round' stroke-linejoin='round'/>`;
}
const segment = (a, b, n = 6) => Array.from({ length: n + 1 }, (_, i) => [a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n]);
const BLANC = "#f4f1e4", JAUNE = "#f3d36b", ROSE = "#f7a8b8", BLEU = "#9cd3f5";

/* ---------- Repère et parabole, sommet marqué ---------- */
const repere = svg("0 0 120 100", [
  craie(segment([8, 80], [114, 80]), BLANC, 1.5), craie([[109, 76.5], [114, 80], [109, 83.5]], BLANC, 1.5),
  craie(segment([30, 96], [30, 4]), BLANC, 1.5), craie([[26.5, 9], [30, 4], [33.5, 9]], BLANC, 1.5),
  craie(Array.from({ length: 25 }, (_, i) => { const x = 36 + i * 3.1; return [x, 86 - 0.032 * (x - 73) ** 2 + -8 + 0]; }).map(([x, y]) => [x, y]), JAUNE, 1.7),
  `<circle cx='73' cy='78' r='2.2' fill='${ROSE}' fill-opacity='.9'/>`,
  craie(segment([73, 78], [73, 84], 2), ROSE, 1), craie(segment([24, 78], [36, 78], 2), BLANC, 1),
].join(""));
/* ---------- Triangle rectangle, angle droit et côtés codés ---------- */
const triangle = svg("0 0 90 80", [
  craie([...segment([10, 70], [80, 70]), ...segment([80, 70], [10, 14]).slice(1), ...segment([10, 14], [10, 70]).slice(1)], BLANC, 1.6),
  craie([[10, 61], [19, 61], [19, 70]], ROSE, 1.2),
  craie([[44, 66], [44, 74]], JAUNE, 1.2), craie([[4, 40], [16, 44]], JAUNE, 1.2),
  craie(Array.from({ length: 7 }, (_, i) => { const a = Math.PI + 0.12 + (i * 0.55) / 6; return [80 + 14 * Math.cos(a), 70 + 14 * Math.sin(a)]; }), BLEU, 1.1),
].join(""));
/* ---------- Cercle, centre et rayon ---------- */
const cercle = svg("0 0 80 80", [
  craie(Array.from({ length: 33 }, (_, i) => { const a = (i / 32) * Math.PI * 2 + 0.3; return [40 + 30 * Math.cos(a) + (i === 32 ? 1.5 : 0), 40 + 30 * Math.sin(a)]; }), BLANC, 1.6),
  `<circle cx='40' cy='40' r='1.8' fill='${JAUNE}'/>`,
  craie(segment([40, 40], [64, 22], 4), JAUNE, 1.4),
].join(""));

/* ---------- Traces d'éponge sur le tableau ---------- */
function traces() {
  let d = "";
  for (let i = 0; i < 5; i++) {
    const x = alea() * 300, y = 20 + alea() * 120, w = 60 + alea() * 90, h = 10 + alea() * 18;
    d += `M${nums(x, y)}c${nums(w * 0.3, -h, w * 0.7, -h, w, 0)}`;
  }
  return svg("0 0 400 160", `<path d='${d}' fill='none' stroke='#fff' stroke-opacity='.05' stroke-width='16' stroke-linecap='round'/>`, " preserveAspectRatio='none'");
}
/* ---------- Poussière de craie au pied du tableau ---------- */
function poussiere(w, h, n) {
  let c = "";
  for (let i = 0; i < n; i++) c += `<circle cx='${n1(alea() * w)}' cy='${n1(h - Math.pow(alea(), 2) * h)}' r='${n1(0.4 + alea() * 0.8)}' fill-opacity='${n1(0.15 + alea() * 0.35)}'/>`;
  return svg(`0 0 ${w} ${h}`, `<g fill='#f4f1e4'>${c}</g>`);
}

/* ---------- Dans la rigole : trois craies et la brosse ---------- */
const rigole = svg("0 0 160 22", [
  // brosse : dos en bois, feutre gris
  `<rect x='92' y='5' width='46' height='9' rx='2' fill='#9a6a38'/><rect x='92' y='5' width='46' height='2.6' rx='1.3' fill='#b98a52'/><rect x='93' y='14' width='44' height='5' rx='1' fill='#5b6266'/><path d='M95 16.6h38' stroke='#7c8488' stroke-width='.8'/>`,
  // craies
  `<rect x='10' y='13' width='24' height='5' rx='2.4' fill='#f4f1e4'/><rect x='10' y='13' width='24' height='1.8' rx='.9' fill='#fff'/>`,
  `<rect x='40' y='14' width='16' height='4.6' rx='2.3' fill='#f3d36b' transform='rotate(-8 48 16)'/>`,
  `<rect x='62' y='13.6' width='12' height='4.6' rx='2.3' fill='#f7a8b8'/>`,
].join(""));

ecrire("tableau", { repere, triangle, cercle, traces: traces(), poussiere: poussiere(200, 30, 40), rigole });
