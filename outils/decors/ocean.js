// Dessins du bandeau du thème « Océan » : récif de corail (coraux branchus, cerveaux, gorgones,
// herbiers), tortue verte, banc de poissons, poissons du récif, récif lointain, bulles. Dessins originaux.
// Usage : node outils/decors/ocean.js   (réécrit les dessins dans assets/theme-ocean.css)
const { hasard, n1, nums, poly, svg, ecrire } = require("./commun");
const alea = hasard(67);

/* ---------- Corail branchu : branches qui montent en fourchant, bouts arrondis ---------- */
function branchu(x, sol, h, coul) {
  const niv = [[], [], []];
  const pousse = (x0, y0, ang, L, k) => {
    const a = (ang * Math.PI) / 180, x1 = x0 + L * Math.cos(a), y1 = y0 - L * Math.sin(a);
    niv[k].push(`M${nums(x0, y0)}Q${nums((x0 + x1) / 2 + (alea() - 0.5) * L * 0.3, (y0 + y1) / 2, x1, y1)}`);
    if (k < 2) for (const d of [-1, 1]) pousse(x1, y1, ang + d * (16 + alea() * 18), L * (0.62 + alea() * 0.18), k + 1);
  };
  for (const ang of [112, 90, 68]) pousse(x, sol, ang + (alea() - 0.5) * 10, h * 0.42, 0);
  const ep = [h * 0.17, h * 0.125, h * 0.09];
  return niv.map((l, i) => `<path d='${l.join("")}' fill='none' stroke='${coul}' stroke-width='${n1(ep[i])}' stroke-linecap='round'/>`).join("");
}
/* ---------- Gorgone (éventail de mer) : fines branches en éventail ---------- */
function gorgone(x, sol, h, coul) {
  const traits = [];
  const pousse = (x0, y0, ang, L, k) => {
    const a = (ang * Math.PI) / 180, x1 = x0 + L * Math.cos(a), y1 = y0 - L * Math.sin(a);
    traits.push(`M${nums(x0, y0)}L${nums(x1, y1)}`);
    if (k < 3) for (const d of [-1, 1]) pousse(x1, y1, ang + d * (12 + alea() * 10), L * 0.72, k + 1);
  };
  pousse(x, sol, 90, h * 0.3, 0);
  return `<path d='${traits.join("")}' fill='none' stroke='${coul}' stroke-width='${n1(h * 0.022)}' stroke-linecap='round'/>`;
}
/* ---------- Corail cerveau : dôme et sillons ---------- */
function cerveau(x, sol, r, coul, sillon) {
  let s = `<path d='M${nums(x - r, sol)}a${nums(r, r * 0.78)} 0 0 1 ${n1(2 * r)} 0z' fill='${coul}'/>`;
  let d = "";
  for (let i = 1; i <= 3; i++) {
    const rr = r * (1 - i * 0.24);
    d += `M${nums(x - rr, sol)}c${nums(rr * 0.2, -rr * 0.5, rr * 0.5, -rr * 0.9, rr, -rr * 0.78)}c${nums(rr * 0.5, 0.1, rr * 0.8, rr * 0.4, rr, rr * 0.78)}`;
  }
  return s + `<path d='${d}' fill='none' stroke='${sillon}' stroke-width='${n1(r * 0.07)}' stroke-linecap='round'/>`;
}
/* ---------- Herbier : brins qui ondulent ---------- */
function herbes(x0, x1, sol, hmin, hmax, coul) {
  let d = "";
  for (let x = x0; x < x1; x += 2 + alea() * 3) {
    const h = hmin + alea() * (hmax - hmin), c = (alea() - 0.5) * h * 0.5;
    d += `M${nums(x - 0.9, sol)}q${nums(c, -h * 0.55, c * 0.4 + 1, -h)}q${nums(c * 0.1, h * 0.5, 1.6 - c * 0.4, h)}z`;
  }
  return `<path d='${d}' fill='${coul}'/>`;
}
/* ---------- Poissons ---------- */
const poisson = (x, y, l, sens = 1) => {
  const h = l * 0.36, q = sens;
  return `M${nums(x, y)}q${nums(q * l * 0.45, -h, q * l * 0.85, -h * 0.1)}l${nums(q * l * 0.22, -h * 0.5)}l${nums(-q * l * 0.06, h * 0.6)}l${nums(q * l * 0.06, h * 0.6)}l${nums(-q * l * 0.22, -h * 0.5)}q${nums(-q * l * 0.4, h * 1.1, -q * l * 0.85, h * 0.1)}z`;
};
function banc(w, h, n, lmin, lmax) {
  let d = "";
  for (let i = 0; i < n; i++) {
    const u = alea(), x = w * (0.1 + 0.8 * u), y = h * (0.5 + 0.38 * Math.sin(u * 5 + alea())), l = lmin + alea() * (lmax - lmin);
    d += poisson(x, y, l, -1);
  }
  return svg(`0 0 ${w} ${h}`, `<defs><linearGradient id='p' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#bfeaf5'/><stop offset='1' stop-color='#6fb8cf'/></linearGradient></defs><path d='${d}' fill='url(#p)' fill-opacity='.85'/>`);
}
const bancPoissons = banc(110, 50, 14, 6, 10);

/* ---------- Tortue verte (vue de dessus, en train de nager) ---------- */
const tortue = svg("0 0 80 60", [
  `<g transform='rotate(-14 40 30)'>`,
  // nageoires avant longues, arrière courtes
  `<path d='M30 22C22 12 12 8 4 9 12 14 20 20 28 28zM50 22C58 10 68 6 76 8 68 13 60 20 52 28z' fill='#4f8a74'/>`,
  `<path d='M30 40C24 46 20 50 15 51 20 46 24 42 30 37zM50 40C56 46 60 50 65 51 60 46 56 42 50 37z' fill='#4f8a74'/>`,
  // tête
  `<ellipse cx='40' cy='12' rx='5' ry='6' fill='#5f9a82'/><circle cx='38' cy='10.4' r='.9' fill='#10303a'/><circle cx='42' cy='10.4' r='.9' fill='#10303a'/>`,
  // carapace et écailles
  `<ellipse cx='40' cy='31' rx='13' ry='16' fill='#3f6f58'/>`,
  `<path d='M40 17V45M30 24L40 28 50 24M29 37L40 34 51 37M34 18.6L40 28M46 18.6L40 28M33 44L40 34M47 44L40 34' fill='none' stroke='#8cc0a2' stroke-width='1' stroke-opacity='.7'/>`,
  `<ellipse cx='40' cy='31' rx='13' ry='16' fill='none' stroke='#2b5444' stroke-width='1.4'/>`,
  `</g>`,
].join(""));

/* ---------- Poissons du récif, colorés ---------- */
const poissonsRecif = svg("0 0 60 30", [
  `<path d='${poisson(8, 10, 12)}' fill='#f2c14e'/><circle cx='17' cy='9.2' r='.7' fill='#1a2a30'/>`,
  `<path d='${poisson(34, 22, 10, -1)}' fill='#ff8f6b'/><path d='M28 19.6v4.6M25 19.8v4' stroke='#fff' stroke-width='1.1' stroke-opacity='.85'/>`,
  `<path d='${poisson(44, 8, 8)}' fill='#7fd0ff' fill-opacity='.9'/>`,
].join(""));

/* ---------- Récif lointain, dans le bleu ---------- */
const recifLoin = svg("0 0 400 40", `<path d='M0 40V26C20 20 34 24 46 18S70 22 84 16 110 22 126 20 150 12 170 16 196 26 214 22 240 14 262 18 290 24 310 20 340 12 360 18 386 24 400 22V40z' fill='#11506a'/>`, " preserveAspectRatio='none'");

/* ---------- Premier plan : sable, rochers, coraux, gorgones, herbiers ---------- */
const recifGauche = svg("0 0 200 90", [
  `<path d='M0 90V62C20 56 40 58 56 62S90 66 110 72 150 82 200 90z' fill='#13465a'/>`,
  gorgone(30, 66, 64, "#a45bb0"),
  branchu(70, 70, 40, "#e07a6c"),
  cerveau(108, 76, 13, "#c9a24e", "#8e6f2c"),
  herbes(122, 170, 84, 8, 22, "#2f8f78"),
  branchu(10, 64, 26, "#f0a07a"),
].join(""));
const recifDroite = svg("0 0 200 90", [
  `<path d='M0 90C40 82 80 74 120 70S170 64 200 62V90z' fill='#13465a'/>`,
  herbes(10, 60, 86, 6, 18, "#2f8f78"),
  cerveau(78, 74, 15, "#b98ac9", "#7e5690"),
  gorgone(150, 66, 70, "#d0607a"),
  branchu(118, 72, 34, "#f2b36b"),
  branchu(186, 64, 30, "#e07a6c"),
].join(""));
// Butte de corail au milieu (entre les deux côtés du récif)
const recifMilieu = svg("0 0 120 50", [
  `<path d='M0 50C14 40 30 34 50 33S90 38 120 50z' fill='#13465a'/>`,
  cerveau(40, 38, 11, "#d98f6e", "#9c5d43"),
  branchu(70, 38, 28, "#f08a8a"),
  herbes(84, 112, 46, 5, 14, "#2f8f78"),
  branchu(18, 42, 18, "#f2b36b"),
].join(""));
const sable = svg("0 0 400 20", `<path d='M0 20V9C60 5 120 11 200 9S330 4 400 7V20z' fill='#2b6577'/>`, " preserveAspectRatio='none'");

/* ---------- Bulles (motif qui se répète vers le haut) ---------- */
function bulles(w, h, n) {
  let c = "";
  for (let i = 0; i < n; i++) {
    const r = 1.2 + alea() * 3.2, x = alea() * w, y = alea() * h;
    c += `<circle cx='${n1(x)}' cy='${n1(y)}' r='${n1(r)}'/><circle cx='${n1(x - r * 0.35)}' cy='${n1(y - r * 0.35)}' r='${n1(r * 0.25)}' fill='#fff' fill-opacity='.7' stroke='none'/>`;
  }
  return svg(`0 0 ${w} ${h}`, `<g fill='none' stroke='#c8f4ff' stroke-opacity='.55' stroke-width='.8'>${c}</g>`);
}

ecrire("ocean", { tortue, banc: bancPoissons, "poissons-recif": poissonsRecif, "recif-loin": recifLoin, "recif-gauche": recifGauche, "recif-droite": recifDroite, "recif-milieu": recifMilieu, sable, bulles: bulles(160, 220, 6) });
