// Génère assets/ruines-mur.svg : un pan de mur en grès doré, raccordable dans les deux sens.
// Usage : node outils/ruines/mur.js assets
const fs = require("fs"), path = require("path");
const W = 720, H = 400, RH = 100;
// Joints verticaux de chaque assise (x dans [0, W)) ; le dernier bloc se raccorde au premier.
const ASSISES = [
  [0, 230, 420, 590],
  [110, 300, 520, 660],
  [60, 270, 440, 610],
  [160, 340, 500, 690]
];
const TONS = ["#f6e2b0", "#f3d9a1", "#f8e7bf", "#f0d398", "#f5dca8", "#f9e9c6", "#f2d6b0", "#efe0bb"];
let graine = 7;
const alea = () => { graine = (graine * 16807) % 2147483647; return graine / 2147483647; };
const r1 = (x) => Math.round(x * 10) / 10;

let blocs = "", reliefs = "";
ASSISES.forEach((joints, i) => {
  const y = i * RH;
  joints.forEach((x, k) => {
    const fin = k + 1 < joints.length ? joints[k + 1] : joints[0] + W;
    const w = fin - x, ton = TONS[Math.floor(alea() * TONS.length)];
    // Un bloc qui dépasse à droite est redessiné décalé de -W : le motif se raccorde sans couture.
    for (const dx of fin > W ? [0, -W] : [0]) {
      const bx = x + dx;
      blocs += `<rect x="${bx + 1.5}" y="${y + 1.5}" width="${w - 3}" height="${RH - 3}" fill="${ton}"/>`;
      // Arêtes : lumière en haut et à gauche, ombre en bas et à droite (soleil en haut à droite, pierre taillée)
      reliefs += `<path d="M${bx + 2.5} ${y + RH - 2.5}V${y + 2.5}H${bx + w - 2.5}" class="l"/><path d="M${bx + 2.5} ${y + RH - 2.2}H${bx + w - 2.2}V${y + 2.5}" class="o"/>`;
    }
    // Quelques éclats et fissures, pour que chaque bloc soit unique
    if (alea() < 0.45) {
      const fx = x + 12 + alea() * (w - 40), fy = y + 10 + alea() * (RH - 30);
      for (const dx of fx + 30 > W ? [0, -W] : [0]) {
        reliefs += `<path d="M${r1(fx + dx)} ${r1(fy)}l${r1(6 + alea() * 6)} ${r1(5 + alea() * 6)}l${r1(-2 + alea() * 6)} ${r1(6 + alea() * 6)}" class="f"/>`;
      }
    }
  });
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<style>.l{fill:none;stroke:#fff8e6;stroke-width:1.4;stroke-opacity:.85}.o{fill:none;stroke:#a87d40;stroke-width:1.4;stroke-opacity:.45}.f{fill:none;stroke:#a07436;stroke-width:1.1;stroke-opacity:.5;stroke-linecap:round}</style>
<defs><filter id="g" filterUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .45 0 0 0 0 .3 0 0 0 0 .12 0 0 0 -1.6 1.02"/></filter></defs>
<rect width="${W}" height="${H}" fill="#c99d5c"/>
${blocs}
<rect width="${W}" height="${H}" filter="url(#g)" opacity=".5"/>
${reliefs}
</svg>`;
fs.writeFileSync(path.join(process.argv[2], "ruines-mur.svg"), svg);
console.log("ruines-mur.svg", svg.length, "octets");
