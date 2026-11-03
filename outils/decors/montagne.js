// Dessins du bandeau du thème « Montagne » : sommets enneigés éclairés par l'aube (faces au soleil
// rosées, faces à l'ombre bleutées), brume, forêt sur l'autre rive, lac qui reflète le tout, sapins
// au premier plan. Dessins originaux.
// Usage : node outils/decors/montagne.js   (réécrit les dessins dans assets/theme-montagne.css)
const { hasard, n1, nums, poly: polyDec, svg, ecrire } = require("./commun");
// polygones en nombres entiers : la chaîne est tracée assez grand pour cela
const poly = (pts) => polyDec(pts.map(([x, y]) => [x / 2, y / 2]), 2);
const alea = hasard(41);

// Arête irrégulière entre deux points (déplacement du milieu, plusieurs fois)
function arete(a, b, prof, rugo) {
  if (prof === 0) return [a, b];
  const m = [(a[0] + b[0]) / 2 + (alea() - 0.5) * rugo * 0.4, (a[1] + b[1]) / 2 + (alea() - 0.5) * rugo];
  return [...arete(a, m, prof - 1, rugo * 0.55), ...arete(m, b, prof - 1, rugo * 0.55).slice(1)];
}
/* ---------- Un sommet : face éclairée (soleil à droite), face à l'ombre, calotte de neige ---------- */
function pic(xa, ya, wl, wr, base, c) {
  const A = [xa, ya], L = [xa - wl, base], R = [xa + wr, base], M = [xa + wr * 0.18, base];
  const gauche = arete(L, A, 3, (base - ya) * 0.22), droite = arete(A, R, 3, (base - ya) * 0.22), crete = arete(A, M, 3, (base - ya) * 0.12);
  let s = `<path d='${poly([...gauche, ...droite.slice(1)])}' fill='${c.ombre}'/>`;
  s += `<path d='${poly([...droite, ...crete.slice(1).reverse()])}' fill='${c.soleil}'/>`;
  // neige : tout ce qui est au-dessus d'une ligne irrégulière, plus blanche côté soleil
  const h = (base - ya) * c.neige, coupe = (pts) => pts.filter((p) => p[1] < ya + h * (0.75 + alea() * 0.5));
  const ng = coupe(gauche.slice().reverse()), nd = coupe(droite), nc = coupe(crete);
  if (ng.length > 1 && nc.length > 1) s += `<path d='${poly([...ng.reverse(), ...nc.slice(1)])}' fill='${c.neigeOmbre}'/>`;
  if (nd.length > 1 && nc.length > 1) s += `<path d='${poly([...nd, ...nc.slice(1).reverse()])}' fill='${c.neigeSoleil}'/>`;
  return s;
}
// Lisière de sapins : petites pointes serrées
function lisiere(x0, x1, y, hmin, hmax, coul) {
  const pts = [[x0, y + 6]];
  for (let x = x0; x <= x1; x += 2 + alea() * 2.5) {
    const h = hmin + alea() * (hmax - hmin);
    pts.push([x, y], [x + 1.2, y - h], [x + 2.4, y]);
  }
  pts.push([x1, y + 6]);
  return `<path d='${poly(pts)}' fill='${coul}'/>`;
}

/* ---------- La chaîne, la brume, l'autre rive, et leur reflet dans le lac (même dessin retourné) ---------- */
const loin = { ombre: "#7f8fae", soleil: "#d6a9a6", neigeOmbre: "#dfe7f2", neigeSoleil: "#fff0ea", neige: 0.42 };
const pres = { ombre: "#58698c", soleil: "#bf8f8c", neigeOmbre: "#cbd8ea", neigeSoleil: "#ffe6dc", neige: 0.36 };
const chaine = [
  pic(160, 34, 120, 110, 100, loin), pic(330, 20, 110, 130, 100, loin), pic(560, 12, 150, 120, 100, loin),
  pic(760, 28, 120, 140, 100, loin), pic(980, 30, 140, 120, 100, loin), pic(1110, 40, 100, 120, 100, loin),
  pic(250, 48, 110, 100, 100, pres), pic(450, 36, 120, 110, 100, pres), pic(660, 42, 100, 130, 100, pres),
  pic(870, 50, 110, 100, 100, pres), pic(60, 56, 90, 80, 100, pres),
].join("");
const sommets = svg("0 0 1200 200", [
  `<defs><linearGradient id='b' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#fff' stop-opacity='0'/><stop offset='1' stop-color='#f6eef0' stop-opacity='.85'/></linearGradient>`,
  `<g id='m'>${chaine}<rect y='70' width='1200' height='24' fill='url(#b)'/>${lisiere(0, 1200, 96, 3, 8, "#2f4c5c")}<rect y='96' width='1200' height='4' fill='#2f4c5c'/></g></defs>`,
  `<use href='#m'/><use href='#m' transform='matrix(1 0 0 -1 0 200)' opacity='.38'/>`,
].join(""));

/* ---------- Sapins au premier plan : étages de branches qui retombent ---------- */
function sapin(x, sol, h, coul) {
  const etages = 6, pts = [];
  const larg = (k) => h * 0.36 * (0.35 + 0.65 * (k / etages));
  const gauche = [], droite = [];
  for (let k = 1; k <= etages; k++) {
    const y = sol - h * 0.12 - (h * 0.88 * (etages - k)) / etages, w = larg(k) * (0.9 + alea() * 0.2);
    gauche.push([x - w * 0.55, y - h * 0.07], [x - w, y + h * 0.015]);
    droite.push([x + w, y + h * 0.015], [x + w * 0.55, y - h * 0.07]);
  }
  pts.push([x, sol - h], ...gauche, [x - h * 0.03, sol - h * 0.1], [x - h * 0.025, sol], [x + h * 0.025, sol], [x + h * 0.03, sol - h * 0.1], ...droite.reverse());
  return `<path d='${poly(pts)}' fill='${coul}'/>`;
}
const sapinsGauche = svg("0 0 150 90", [
  `<path d='M0 90V62C30 58 60 60 90 68S130 82 150 90z' fill='#1e3542'/>`,
  sapin(22, 66, 62, "#1a2f3b"), sapin(46, 68, 78, "#152833"), sapin(70, 72, 52, "#1a2f3b"), sapin(8, 64, 44, "#1d3440"), sapin(92, 78, 36, "#1d3440"),
].join(""));
const sapinsDroite = svg("0 0 110 80", [
  `<path d='M0 80C30 70 60 62 110 58V80z' fill='#1e3542'/>`,
  sapin(68, 63, 56, "#152833"), sapin(90, 61, 70, "#1a2f3b"), sapin(46, 68, 38, "#1d3440"),
].join(""));
const rive = svg("0 0 400 16", `<path d='M0 16V8C80 5 140 9 220 8S340 4 400 6V16z' fill='#1b313d'/>`, " preserveAspectRatio='none'");

ecrire("montagne", { sommets, "sapins-gauche": sapinsGauche, "sapins-droite": sapinsDroite, rive });
