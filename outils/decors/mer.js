// Dessins du bandeau du thème « Mer » : nuages, phare sur son cap, voilier, mouettes, île au loin,
// scintillement du soleil sur l'eau, vagues et rochers au premier plan. Dessins originaux.
// Usage : node outils/decors/mer.js   (réécrit les dessins dans assets/theme-mer.css)
const { hasard, n1, colle, nums, poly, svg, ecrire } = require("./commun");
const alea = hasard(11);

/* ---------- Cumulus : boules de tailles variées, plus hautes au milieu, base plate et ombrée ---------- */
function cumulus(cx, base, w, h, n) {
  let c = "";
  for (let i = 0; i < n; i++) {
    const u = (i + 0.3 + alea() * 0.4) / n, x = cx - w / 2 + u * w;
    const tour = h * Math.pow(Math.sin(Math.PI * u), 0.9);
    const r = (w / n) * (0.55 + alea() * 0.45) + h * 0.12;
    c += `<circle cx='${n1(x)}' cy='${n1(base - Math.max(tour - r * 0.9, r * 0.45))}' r='${n1(r)}'/>`;
    // petites boules sur le dessus : l'aspect « chou-fleur »
    if (tour > h * 0.55 && alea() < 0.7) {
      const r2 = r * (0.45 + alea() * 0.2);
      c += `<circle cx='${n1(x + (alea() - 0.5) * r)}' cy='${n1(base - tour + r2 * 0.6)}' r='${n1(r2)}'/>`;
    }
  }
  return c;
}
const degradeNuage = (id, h) => `<linearGradient id='${id}' x1='0' y1='0' x2='0' y2='${h}' gradientUnits='userSpaceOnUse'><stop offset='.35' stop-color='#fff'/><stop offset='.8' stop-color='#e4eef4'/><stop offset='1' stop-color='#b7cddb'/></linearGradient>`;
const nuages = svg("0 0 220 44", `<defs>${degradeNuage("n", 44)}<clipPath id='b'><rect width='220' height='42'/></clipPath></defs><g fill='url(#n)' clip-path='url(#b)'>${cumulus(122, 42, 100, 38, 9)}${cumulus(42, 42, 58, 17, 6)}${cumulus(196, 42, 42, 13, 5)}</g>`);
const nuageHaut = svg("0 0 80 26", `<defs>${degradeNuage("n", 26)}<clipPath id='b'><rect width='80' height='24'/></clipPath></defs><g fill='url(#n)' fill-opacity='.95' clip-path='url(#b)'>${cumulus(40, 24, 66, 17, 7)}</g>`);

/* ---------- Cap rocheux et phare (au loin, couleurs un peu voilées) ---------- */
const phare = svg("0 0 130 64", [
  // le cap : pente herbeuse bosselée, falaise claire côté mer avec ses strates, ombre au pied
  `<path d='M0 64V36C8 33 16 31 26 31 32 29 38 30 44 29.6 52 29 60 30 68 30.4 76 30.8 82 32 87 34 94 36 99 39 104 43L110 50C114 55 117 60 121 64z' fill='#7a9a82'/>`,
  `<path d='M2 35.4C9 33 16 31.6 25 31.6M35 30.2C40 29.6 46 29.4 50 29.8' fill='none' stroke='#93b98d' stroke-width='1.8' stroke-linecap='round'/>`,
  `<path d='M87 34C94 36 99 39 104 43L110 50C114 55 117 60 121 64H95C97 57 96 48 92 41 90 38 89 36 87 34z' fill='#bcc0b2'/>`,
  `<path d='M93 44C97 47 101 49 106 50M95 52C99 54 104 55 112 56' fill='none' stroke='#9fa597' stroke-width='.9'/>`,
  `<path d='M95 64C97 57 96 48 92 41L87 34C89 42 90 52 87 64z' fill='#8f978d'/>`,
  // maison du gardien
  `<path d='M64 30.6V24.8h9v5.8z' fill='#eef1ec'/><path d='M63 25.2l5.5-4 5.5 4z' fill='#b9473f'/><path d='M66 26.4h2v2h-2z' fill='#6e8590'/>`,
  // phare : tour blanche à bandes rouges, galerie, lanterne allumée, toit
  `<path d='M51 31L53.4 9.6h5.2L61 31z' fill='#f5f7f3'/><path d='M51 31L53.4 9.6H55.4V31z' fill='#dfe5e1'/>`,
  `<path d='M52.2 21.4h7.6l.5 4.4h-8.6zM53 14.4h6l.4 3.4h-6.8z' fill='#c9453d'/>`,
  `<path d='M52.2 9.6h7.6' stroke='#3c4a4e' stroke-width='1.2'/><rect x='53.6' y='5.2' width='4.8' height='4.4' fill='#ffe58a'/><path d='M53.6 5.2h4.8M56 5.2v4.4' stroke='#3c4a4e' stroke-width='.5'/><path d='M53 5.4L56 2.2 59 5.4z' fill='#9c3a33'/>`,
  // écume au pied de la falaise
  `<path d='M98 63.6C102 60.6 106 61.4 109 59.4 112 58 116 60 118 61.4S121 63 123 64z' fill='#fff' fill-opacity='.8'/>`,
].join(""));

/* ---------- Voiliers ---------- */
const coque = `<path d='M3.6 30.6Q18 35.6 32.4 30.6L30.6 34.2Q18 38 6.2 34.2z' fill='#1f3c52'/><path d='M4.2 31.6Q18 36.2 31.8 31.6' fill='none' stroke='#fff' stroke-width='.7' stroke-opacity='.8'/>`;
const voiles = `<path d='M17.4 3.6C23.8 11.6 27.8 21.4 29.4 30.4H17.4z' fill='#fff'/><path d='M17.4 3.6C21 11 22.6 20.4 22.8 30.4h-5.4z' fill='#e4ecf1'/><path d='M16.4 6C12.6 13.6 9 21.6 6.2 30H16.4z' fill='#f3f6f8'/><path d='M16.9 2.4V31' stroke='#2f3d47' stroke-width='.8'/><path d='M17 2.4l3.4 1-3.4 1z' fill='#d2453b'/>`;
const voilier = svg("0 0 36 42", `<g transform='rotate(-5 18 32)'>${voiles}${coque}</g><ellipse cx='18' cy='38.4' rx='12' ry='1.6' fill='#0d3e58' fill-opacity='.3'/>`);
// petit voilier très loin, sur grand écran seulement
const voilierLoin = svg("0 0 36 42", `<g transform='rotate(4 18 32)' opacity='.75'>${voiles}${coque}</g>`);

/* ---------- Mouettes ---------- */
const mouette = (x, y, s) => `M${nums(x - s, y + s * 0.15)}q${nums(s * 0.45, -s * 0.62, s, -s * 0.05)}q${nums(s * 0.55, -s * 0.57, s, s * 0.05)}`;
const mouettes = svg("0 0 70 28", `<path d='${mouette(10, 12, 6)}${mouette(36, 5, 4.2)}${mouette(56, 18, 3.4)}' fill='none' stroke='#2e5163' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/>`);

/* ---------- Île lointaine sur l'horizon (grand écran) ---------- */
const ile = svg("0 0 90 12", `<path d='M0 12C8 10 14 6.4 22 5.6 28 5 31 2.4 36 2.2S46 4.6 52 5.4C62 6.6 72 9 90 12z' fill='#6d9bb3' fill-opacity='.85'/>`);

/* ---------- Scintillement du soleil sur l'eau : éclats en fuseau, de plus en plus épars ---------- */
function scintillement() {
  let y = 1, d = "", px = 0, py = 0;
  const I = (...v) => colle(v.map(String));
  while (y < 92) {
    const p = y / 96, nb = 1 + Math.floor(alea() * (p < 0.15 ? 2 : 4));
    for (let i = 0; i < nb; i++) {
      const w = 4 + alea() * (14 - p * 6) + (p < 0.08 ? 10 : 0);
      const h = 1.2 + p * 1.6 + alea() * 0.6;
      const x = 45 + (alea() - 0.5) * (20 + p * 58) - w / 2;
      const X = Math.round(x * 4), Y = Math.round(y * 4), W = Math.round(w * 4), H = Math.round(h * 4);
      d += (d ? "m" + I(X - px, Y - py) : "M" + I(X, Y)) + "q" + I(Math.round(W / 2), -H, W, 0) + "q" + I(-Math.round(W / 2), H, -W, 0);
      px = X; py = Y;
    }
    y += 2.2 + p * 7 + alea() * 1.8;
  }
  return svg("0 0 360 384", `<defs><linearGradient id='r' x1='0' y1='0' x2='0' y2='384' gradientUnits='userSpaceOnUse'><stop offset='0' stop-color='#fff'/><stop offset='.5' stop-color='#f2fbff' stop-opacity='.8'/><stop offset='1' stop-color='#e6f6ff' stop-opacity='.35'/></linearGradient></defs><path d='${d}' fill='url(#r)'/>`, " preserveAspectRatio='none'");
}

/* ---------- Premier plan : deux rangées de vagues qui se répètent tous les 800 (sans qu'on le voie),
   reflets clairs sous les crêtes, quelques moutons d'écume ---------- */
const P = 800;
const harm = (x, termes) => termes.reduce((s, [a, k, ph]) => s + a * Math.sin((2 * Math.PI * k * x) / P + ph), 0);
const crete1 = (x) => 15 + harm(x, [[2.6, 3, 0.4], [1.6, 7, 1.3], [0.9, 13, 2.1]]);
const crete2 = (x) => 28 + harm(x, [[3.4, 4, 2.2], [1.8, 9, 0.2], [1, 17, 1.1]]);
function bande(f, bas, dy = 0) {
  const pts = [];
  for (let x = 0; x <= P; x += 12) pts.push([x, f(x) + dy]);
  return poly([...pts, [P, bas], [0, bas]]);
}
// Reflet clair juste sous une crête (bande fine qui suit la vague)
function lisere(f, ep) {
  const h = [], b = [];
  for (let x = 0; x <= P; x += 12) { h.push([x, f(x) + 0.3]); b.push([x, f(x) + ep * (0.5 + 0.5 * Math.abs(Math.sin(x / 37)))]); }
  return poly([...h, ...b.reverse()]);
}
// Moutons : petites taches d'écume posées sur les crêtes les plus hautes, irrégulières
function moutons(f, n) {
  let d = "";
  for (let i = 0; i < n; i++) {
    let x = alea() * (P - 40) + 20;
    for (let k = 0; k < 6; k++) { const x2 = x + (alea() - 0.5) * 40; if (f(x2) < f(x)) x = x2; }
    const w = 7 + alea() * 12, y = f(x) - 0.4;
    d += `M${nums(x - w / 2, y)}c${nums(w * 0.2, -1.6, w * 0.6, -1.8, w, -0.2)}c${nums(-w * 0.15, 1.4, -w * 0.4, 2.4 + alea(), -w * 0.62, 1.6)}c${nums(-w * 0.18, 0.8, -w * 0.3, 0.2, -w * 0.38, -1.4)}z`;
  }
  return d;
}
const vagues = svg(`0 0 ${P} 46`, [
  `<path d='${bande(crete1, 46)}' fill='#2479a3'/>`,
  `<path d='${lisere(crete1, 2.6)}' fill='#5fb4d4' fill-opacity='.55'/>`,
  `<path d='${moutons(crete1, 6)}' fill='#fff' fill-opacity='.85'/>`,
  `<path d='${bande(crete2, 46)}' fill='#155d82'/>`,
  `<path d='${lisere(crete2, 3.2)}' fill='#3b93ba' fill-opacity='.6'/>`,
  `<path d='${moutons(crete2, 5)}' fill='#fff' fill-opacity='.9'/>`,
  `<path d='${bande(crete2, 46, 6)}' fill='#0f4c69'/>`,
].join(""));

/* ---------- Rochers au premier plan, à droite, avec l'écume qui les entoure ---------- */
// Trois rochers à facettes : dessus éclairé par le soleil (en haut à droite), flanc gauche dans l'ombre
const rochers = svg("0 16 120 34", [
  `<path d='M28 50L31 38 38 30 48 25 57 26 63 21 72 22 79 28 85 35 89 44 91 50z' fill='#2f4248'/>`,
  `<path d='M48 25L57 26 63 21 72 22 79 28 71 29.6 61 30.4 52 29.6z' fill='#627c83'/>`,
  `<path d='M79 28L85 35 89 44 91 50H83L81 40 75 31z' fill='#43585e'/>`,
  `<path d='M28 50L31 38 38 30 44 35 42 50z' fill='#22323a'/>`,
  `<path d='M89 50L92 43 98 39 105 40 111 44 115 50z' fill='#2c3e44'/><path d='M98 39L105 40 111 44 103 44.6z' fill='#5a737a'/>`,
  `<path d='M12 50L15 45.6 21 43.6 26 45.4 28 50z' fill='#2c3e44'/><path d='M15 45.6L21 43.6 26 45.4 20 46.4z' fill='#557078'/>`,
  // écume au pied des rochers, et embruns qui retombent
  `<path d='M4 50C8 46.4 13 47.6 17 48.4 21 46 26 47 30 48.2 34 46.4 40 48 44 50z' fill='#fff' fill-opacity='.85'/>`,
  `<path d='M80 50C83 47 87 47.4 90 48.2 94 45.8 99 47.4 102 48.6 106 46.8 112 47.6 117 50z' fill='#fff' fill-opacity='.8'/>`,
  `<ellipse cx='36' cy='36' rx='7' ry='4' fill='#fff' fill-opacity='.3'/><ellipse cx='32' cy='41' rx='5' ry='3' fill='#fff' fill-opacity='.4'/><ellipse cx='95' cy='40' rx='6' ry='3.4' fill='#fff' fill-opacity='.28'/>`,
].join(""));

ecrire("mer", { nuages, "nuage-haut": nuageHaut, phare, voilier, "voilier-loin": voilierLoin, mouettes, ile, scintillement: scintillement(), vagues, rochers });
