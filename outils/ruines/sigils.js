// Génère assets/ruines-sigils.svg : pièces de puzzle gravées, peintes ou lumineuses, semées sur le mur.
// Motif de période différente de celle du mur, pour que l'ensemble ne se répète pas à l'identique.
// Usage : node outils/ruines/sigils.js assets
const fs = require("fs"), path = require("path");
const W = 960, H = 780;
const FORMES = {
  T: [[0, 0], [1, 0], [2, 0], [1, 1]],
  L: [[0, 0], [0, 1], [0, 2], [1, 2]],
  J: [[1, 0], [1, 1], [1, 2], [0, 2]],
  S: [[1, 0], [2, 0], [0, 1], [1, 1]],
  Z: [[0, 0], [1, 0], [1, 1], [2, 1]],
  I: [[0, 0], [1, 0], [2, 0], [3, 0]],
  O: [[0, 0], [1, 0], [0, 1], [1, 1]],
  T2: [[0, 0], [0, 1], [0, 2], [1, 1]]
};
// Contour d'une pièce : les côtés de carré qui ne touchent pas une autre case de la pièce
function contour(cases, u, x0, y0) {
  const a = new Set(cases.map(([i, j]) => i + "," + j));
  let d = "";
  for (const [i, j] of cases) {
    const x = x0 + i * u, y = y0 + j * u;
    if (!a.has(i + "," + (j - 1))) d += `M${x} ${y}h${u}`;
    if (!a.has(i + "," + (j + 1))) d += `M${x} ${y + u}h${u}`;
    if (!a.has(i - 1 + "," + j)) d += `M${x} ${y}v${u}`;
    if (!a.has(i + 1 + "," + j)) d += `M${x + u} ${y}v${u}`;
  }
  return d;
}
// Traits intérieurs entre deux cases voisines de la pièce
function interieur(cases, u, x0, y0) {
  const a = new Set(cases.map(([i, j]) => i + "," + j));
  let d = "";
  for (const [i, j] of cases) {
    const x = x0 + i * u, y = y0 + j * u;
    if (a.has(i + 1 + "," + j)) d += `M${x + u} ${y + 3}v${u - 6}`;
    if (a.has(i + "," + (j + 1))) d += `M${x + 3} ${y + u}h${u - 6}`;
  }
  return d;
}
const cases = (cs, u, x0, y0) => cs.map(([i, j]) => `M${x0 + i * u} ${y0 + j * u}h${u}v${u}h${-u}z`).join("");

// Pièces : forme, position, taille d'une case, style (grave, peint, lumineux) et couleur
const PIECES = [
  ["T", 110, 120, 18, "grave"],
  ["L", 520, 70, 18, "peint", "#0f9f96"],
  ["Z", 800, 250, 17, "lumineux", "#3ee07f"],
  ["S", 290, 410, 18, "grave"],
  ["J", 650, 500, 18, "peint", "#e39d12"],
  ["I", 70, 650, 16, "grave"],
  ["T2", 420, 230, 16, "lumineux", "#ffcf4d"],
  ["O", 860, 660, 16, "peint", "#2fae5f"],
  ["S", 330, 690, 15, "lumineux", "#4fd8e8"]
];
let corps = "";
for (const [f, x, y, u, style, c] of PIECES) {
  const cs = FORMES[f], plein = cases(cs, u, x, y), bord = contour(cs, u, x, y), int = interieur(cs, u, x, y);
  if (style === "grave") {
    // Creusé dans la pierre : fond plus sombre, arête claire en bas à droite, rainure sombre en haut à gauche
    corps += `<g><path d="${plein}" fill="#b98a47" fill-opacity=".3"/><path d="${bord}" transform="translate(1.3 1.3)" stroke="#fff6dc" stroke-width="1.6"/><path d="${bord}" stroke="#94672c" stroke-width="1.8" stroke-opacity=".8"/><path d="${int}" stroke="#94672c" stroke-width="1.1" stroke-opacity=".55"/></g>`;
  } else if (style === "peint") {
    corps += `<g><path d="${plein}" fill="${c}" fill-opacity=".42"/><path d="${bord}" transform="translate(1.3 1.3)" stroke="#fff6dc" stroke-width="1.6"/><path d="${bord}" stroke="${c}" stroke-width="2"/><path d="${int}" stroke="${c}" stroke-width="1.2" stroke-opacity=".8"/></g>`;
  } else {
    // Pièce activée : halo flou, coeur clair, contour vif
    corps += `<g><path d="${plein}" fill="${c}" filter="url(#halo)" opacity=".9"/><path d="${plein}" fill="${c}" fill-opacity=".75"/><path d="${bord}" stroke="#fffbea" stroke-width="1.6"/><path d="${int}" stroke="#fffbea" stroke-width="1.1" stroke-opacity=".8"/></g>`;
  }
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs><filter id="halo" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="7"/></filter></defs>
<g fill="none" stroke-linecap="square">${corps}</g>
</svg>`;
fs.writeFileSync(path.join(process.argv[2], "ruines-sigils.svg"), svg);
console.log("ruines-sigils.svg", svg.length, "octets");
