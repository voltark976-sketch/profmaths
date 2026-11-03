// Dessin ajouté au bandeau du thème « Ruines » : hirondelles qui tournent au-dessus des ruines.
// (La scène elle-même, le mur et les sigils sont calculés par outils/ruines/*.js.) Dessin original.
// Usage : node outils/decors/ruines.js   (réécrit le dessin dans assets/theme-ruines.css)
const { nums, svg, ecrire } = require("./commun");

// Hirondelle en vol : ailes en croissant rejetées vers l'arrière, queue fourchue ; s = taille, a = inclinaison
function hirondelle(x, y, s, a) {
  const d = `M${nums(0.62 * s, 0)}C${nums(0.3 * s, -0.06 * s, 0.05 * s, -0.3 * s, -0.42 * s, -0.5 * s)}C${nums(-0.12 * s, -0.24 * s, 0.02 * s, -0.08 * s, 0.1 * s, 0.02 * s)}`
    + `C${nums(-0.1 * s, 0.02 * s, -0.4 * s, -0.02 * s, -0.62 * s, -0.12 * s)}L${nums(-0.4 * s, 0.04 * s)}L${nums(-0.66 * s, 0.14 * s)}C${nums(-0.4 * s, 0.14 * s, -0.12 * s, 0.1 * s, 0.08 * s, 0.08 * s)}`
    + `C${nums(-0.02 * s, 0.22 * s, -0.16 * s, 0.4 * s, -0.36 * s, 0.56 * s)}C${nums(0.06 * s, 0.38 * s, 0.32 * s, 0.14 * s, 0.62 * s, 0)}z`;
  return `<path transform='translate(${nums(x, y)}) rotate(${a})' d='${d}'/>`;
}
const hirondelles = svg("0 0 90 40", `<g fill='#1d2f45' fill-opacity='.85'>${hirondelle(16, 22, 13, -12)}${hirondelle(44, 10, 9, 8)}${hirondelle(70, 26, 11, -4)}${hirondelle(56, 34, 6, 14)}</g>`);

ecrire("ruines", { hirondelles });
