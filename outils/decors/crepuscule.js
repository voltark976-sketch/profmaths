// Dessins du bandeau du thème « Crépuscule » : collines en plans successifs, baobab et arbres en
// silhouette, nuages éclairés par en dessous, vol d'oiseaux, premières étoiles. Dessins originaux.
// Usage : node outils/decors/crepuscule.js   (réécrit les dessins dans assets/theme-crepuscule.css)
const { hasard, n1, nums, poly, svg, ecrire } = require("./commun");
const alea = hasard(23);

/* ---------- Baobab : tronc en bouteille, branches tordues en éventail, quelques touffes ---------- */
function baobab(x, sol, h, coul) {
  const lt = h * 0.5, b = h * 0.27, t = h * 0.17; // hauteur du tronc, largeur au pied, largeur en haut
  let s = `<path d='M${nums(x - b / 2, sol)}C${nums(x - b * 0.66, sol - lt * 0.4, x - t * 0.7, sol - lt * 0.82, x - t / 2, sol - lt)}H${n1(x + t / 2)}C${nums(x + t * 0.7, sol - lt * 0.82, x + b * 0.66, sol - lt * 0.4, x + b / 2, sol)}z' fill='${coul}'/>`;
  const niveaux = [[], [], []], touffes = [];
  const pousse = (x0, y0, ang, L, niv) => {
    const a = (ang * Math.PI) / 180, x1 = x0 + L * Math.cos(a), y1 = y0 - L * Math.sin(a);
    const cx = (x0 + x1) / 2 + (alea() - 0.5) * L * 0.45, cy = (y0 + y1) / 2 + (alea() - 0.5) * L * 0.3;
    niveaux[niv].push(`M${nums(x0, y0)}Q${nums(cx, cy, x1, y1)}`);
    if (niv < 2) {
      const k = niv === 0 ? 2 + (alea() < 0.5 ? 1 : 0) : 2;
      for (let i = 0; i < k; i++) pousse(x1, y1, ang + (i - (k - 1) / 2) * (26 + alea() * 18), L * (0.5 + alea() * 0.15), niv + 1);
    } else if (alea() < 0.55) touffes.push(`<ellipse cx='${n1(x1)}' cy='${n1(y1)}' rx='${n1(h * 0.045)}' ry='${n1(h * 0.028)}'/>`);
  };
  // branches maîtresses épaisses, surtout vers le haut, qui partent toutes du sommet du tronc
  [142, 116, 98, 82, 62, 40].forEach((ang, i) => pousse(x + (i - 2.5) * t * 0.14, sol - lt + h * 0.02, ang + (alea() - 0.5) * 10, h * (0.2 + alea() * 0.07), 0));
  const ep = [h * 0.075, h * 0.04, h * 0.02];
  niveaux.forEach((l, i) => { s += `<path d='${l.join("")}' fill='none' stroke='${coul}' stroke-width='${n1(ep[i])}' stroke-linecap='round'/>`; });
  return s + `<g fill='${coul}'>${touffes.join("")}</g>`;
}
// Arbre à couronne plate (acacia), en silhouette
function acacia(x, sol, h, coul) {
  const l = h * 1.4;
  return `<path d='M${nums(x - 0.8, sol)}q${nums(0.4, -h * 0.5, -h * 0.12, -h * 0.72)}h1.4q${nums(-h * 0.02, h * 0.3, h * 0.2, h * 0.72)}z' fill='${coul}'/><path d='M${nums(x - l / 2, sol - h * 0.7)}c${nums(l * 0.12, -h * 0.34, l * 0.4, -h * 0.4, l * 0.56, -h * 0.3)}c${nums(l * 0.16, -h * 0.12, l * 0.36, -h * 0.04, l * 0.44, h * 0.22)}c${nums(-l * 0.3, h * 0.1, -l * 0.7, h * 0.1, -l, h * 0.08)}z' fill='${coul}'/>`;
}
// Ligne de buissons bosselée
function buissons(x0, x1, sol, hmin, hmax, coul) {
  let d = `M${nums(x0, sol(x0) + 4)}`, x = x0;
  while (x < x1) {
    const w = 3 + alea() * 5, hh = hmin + alea() * (hmax - hmin);
    d += `L${nums(x, sol(x))}q${nums(w * 0.1, -hh * 1.3, w * 0.5, -hh)}q${nums(w * 0.4, hh * 0.3, w * 0.5, hh)}`;
    x += w;
  }
  return `<path d='${d}L${nums(x1, sol(x1) + 4)}z' fill='${coul}'/>`;
}

/* ---------- Collines lointaines (s'étirent sur toute la largeur) ---------- */
const collines = svg("0 0 400 60", [
  `<path d='M0 60V30C30 22 60 18 92 22S150 34 186 30 240 14 286 18 350 30 400 26V60z' fill='#ad6a93'/>`,
  `<path d='M0 60V42C40 34 80 32 120 38S190 50 236 44 300 30 344 34 390 42 400 42V60z' fill='#773d7c'/>`,
].join(""), " preserveAspectRatio='none'");

/* ---------- Premier plan : colline à gauche avec le baobab, colline à droite avec des acacias ---------- */
const solG = (x) => 62 + 0.004 * (x - 10) ** 2;
const collineGauche = svg("0 12 180 98", [
  `<path d='M0 110V62C30 62 60 68 90 80S150 102 180 110z' fill='#3d2150'/>`,
  buissons(-2, 150, (x) => solG(x) + 1.5, 1.5, 5, "#2b1640"),
  baobab(54, 73, 72, "#26122f"),
].join(""));
const solD = (x) => 46 - 0.0012 * (x - 150) ** 2;
const collineDroite = svg("0 0 160 50", [
  `<path d='M0 50C30 44 70 34 110 31S150 30 160 31V50z' fill='#3a1f4d'/>`,
  acacia(116, 31.8, 17, "#28142f"),
  acacia(144, 30.6, 12, "#28142f"),
  buissons(20, 160, (x) => 50 - (x < 110 ? (x - 20) * 0.2 : 18 + (x - 110) * 0.02) + 1.5, 1, 3.5, "#2b1640"),
].join(""));
const fond = svg("0 0 400 20", `<path d='M0 20V8C60 4 120 10 200 9S340 4 400 7V20z' fill='#23122e'/>`, " preserveAspectRatio='none'");

/* ---------- Nuages en longues bandes, éclairés par en dessous par le soleil couché ---------- */
function bandeNuage(x, y, w, h) {
  return `M${nums(x, y)}c${nums(w * 0.2, -h * 0.9, w * 0.55, -h * 1.1, w * 0.78, -h * 0.6)}c${nums(w * 0.12, -h * 0.25, w * 0.22, 0, w * 0.22, h * 0.45)}c${nums(-w * 0.3, h * 0.55, -w * 0.72, h * 0.6, -w, h * 0.15)}z`;
}
const nuages = svg("0 0 240 46", `<defs><linearGradient id='n' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#9a4f86'/><stop offset='.65' stop-color='#e98a8a'/><stop offset='1' stop-color='#ffc79a'/></linearGradient></defs><path d='${bandeNuage(10, 16, 120, 7)}${bandeNuage(96, 30, 140, 6)}${bandeNuage(150, 12, 80, 4)}${bandeNuage(40, 40, 70, 3.4)}' fill='url(#n)' fill-opacity='.85'/>`);

/* ---------- Vol d'oiseaux qui rentrent ---------- */
const oiseau = (x, y, s) => `M${nums(x - s, y - s * 0.2)}q${nums(s * 0.5, s * 0.1, s, s * 0.45)}q${nums(s * 0.5, -s * 0.35, s, -s * 0.45)}`;
const oiseaux = svg("0 0 60 26", `<path d='${[[8, 14, 3.4], [16, 9, 3], [24, 6, 3.2], [33, 9.5, 2.8], [41, 13, 2.6], [20, 18, 2.4], [50, 17, 2.2]].map((o) => oiseau(...o)).join("")}' fill='none' stroke='#2a1638' stroke-width='1.1' stroke-linecap='round' stroke-linejoin='round'/>`);

/* ---------- Premières étoiles (un motif qui se répète), plus nombreuses en haut ---------- */
function etoiles(w, h, n, rmin, rmax) {
  let c = "";
  for (let i = 0; i < n; i++) {
    const y = h * Math.pow(alea(), 1.6), r = rmin + alea() * (rmax - rmin) * (1 - y / h);
    c += `<circle cx='${n1(alea() * w)}' cy='${n1(y)}' r='${n1(r)}' fill-opacity='${n1(0.45 + alea() * 0.55)}'/>`;
  }
  return svg(`0 0 ${w} ${h}`, `<g fill='#fff'>${c}</g>`);
}

ecrire("crepuscule", { nuages, oiseaux, collines, "colline-gauche": collineGauche, "colline-droite": collineDroite, fond, etoiles: etoiles(220, 130, 16, 0.4, 1.1), "etoiles-vives": etoiles(220, 130, 7, 0.6, 1.3) });
