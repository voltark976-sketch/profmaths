// Outils communs aux dessins des thèmes (outils/decors/<thème>.js).
// Chaque dessin est un petit SVG écrit en ligne dans assets/theme-<thème>.css, juste après un repère
// /* dessin:nom */ : remplacer() y met la nouvelle version sans toucher au reste de la feuille.
const fs = require("fs"), path = require("path");

// Hasard reproductible : la même graine redonne toujours les mêmes dessins
const hasard = (graine) => () => { graine = (graine * 16807) % 2147483647; return graine / 2147483647; };
// Nombre arrondi au dixième, sans zéro inutile (0.5 -> .5)
const n1 = (x) => { const v = Math.round(x * 10) / 10; return (Object.is(v, -0) ? 0 : v).toString().replace(/^(-?)0\./, "$1."); };
// Colle des nombres déjà écrits, sans espace avant un signe moins
const colle = (l) => l.reduce((s, p, i) => s + (i && !p.startsWith("-") ? " " : "") + p, "");
const nums = (...xs) => colle(xs.map(n1));
// Nombres multipliés par k et entiers (dessin tracé dans une viewBox k fois plus grande)
const entiers = (k) => (...xs) => colle(xs.map((v) => String(Math.round(v * k))));
// Suite de points -> déplacements relatifs (à écrire après un « l ») ; k > 1 : entiers ×k
const relatif = (pts, k = 1) => {
  const ar = (v) => (k === 1 ? Math.round(v * 10) / 10 : Math.round(v * k));
  const fmt = (v) => (k === 1 ? n1(v) : String(Math.round(v)));
  const r = [];
  let px = ar(pts[0][0]), py = ar(pts[0][1]);
  for (let i = 1; i < pts.length; i++) {
    const x = ar(pts[i][0]), y = ar(pts[i][1]);
    r.push(colle([fmt(x - px), fmt(y - py)])); px = x; py = y;
  }
  return colle(r);
};
// Polygone fermé à partir de points
const poly = (pts, k = 1) => "M" + (k === 1 ? nums(pts[0][0], pts[0][1]) : entiers(k)(pts[0][0], pts[0][1])) + "l" + relatif(pts, k) + "z";
const svg = (vb, corps, extra = "") => `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${vb}'${extra}>${corps}</svg>`;
// Courbes de Bézier quadratiques : point et dérivée
const bez = (t, a, b, c) => [(1 - t) ** 2 * a[0] + 2 * (1 - t) * t * b[0] + t * t * c[0], (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * b[1] + t * t * c[1]];
const der = (t, a, b, c) => [2 * (1 - t) * (b[0] - a[0]) + 2 * t * (c[0] - b[0]), 2 * (1 - t) * (b[1] - a[1]) + 2 * t * (c[1] - b[1])];

// Dessin -> url("data:…") pour une feuille CSS
const url = (s) => {
  if (/["%\n]/.test(s)) throw new Error("caractère interdit dans un dessin : " + s.slice(0, 80));
  return `url("data:image/svg+xml;utf8,${s.replace(/#/g, "%23")}")`;
};

// Remplace chaque dessin après son repère /* dessin:nom */ dans la feuille ; sans feuille, les affiche
function ecrire(theme, dessins, fichier) {
  if (process.argv.includes("--afficher")) {
    for (const [nom, s] of Object.entries(dessins)) console.log(`/* dessin:${nom} */ ${url(s)}\n`);
    return;
  }
  const f = fichier || path.join(__dirname, "..", "..", "assets", `theme-${theme}.css`);
  let css = fs.readFileSync(f, "utf8");
  for (const [nom, s] of Object.entries(dessins)) {
    const re = new RegExp(`(/\\* dessin:${nom} \\*/ )url\\("data:image/svg\\+xml;utf8,[^"]*"\\)`, "g");
    const n = (css.match(re) || []).length;
    if (n !== 1) throw new Error(`repère /* dessin:${nom} */ trouvé ${n} fois dans ${f} (il en faut un)`);
    css = css.replace(re, (m, avant) => avant + url(s));
  }
  fs.writeFileSync(f, css);
  console.log(`${path.basename(f)} : ${Object.keys(dessins).length} dessins`);
}

module.exports = { hasard, n1, colle, nums, entiers, relatif, poly, svg, bez, der, url, ecrire };
