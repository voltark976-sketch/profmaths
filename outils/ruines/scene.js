// Génère assets/ruines-scene.svg : la scène du bandeau d'accueil du thème « Ruines ».
// À gauche, un ciel calme et des collines (le texte s'y pose) ; à droite, le groupe de ruines :
// cyprès, terminal sur son socle, temple dorique brisé, arche fermée par un champ de force.
// Dessin original. Usage : node outils/ruines/scene.js assets
const fs = require("fs"), path = require("path");
const W = 1400, H = 400, SOL = 346;
let graine = 11;
const alea = () => { graine = (graine * 16807) % 2147483647; return graine / 2147483647; };
const r1 = (x) => Math.round(x * 10) / 10;

/* ---------- Colonnes doriques ---------- */
function colonne(x, haut, casse) {
  const w = 30;
  let s = "";
  if (casse) {
    s += `<path d="M${x} ${SOL - 20}V${haut + 6}l5 -7 6 5 6 -9 5 6 4 -4 4 3V${SOL - 20}z" fill="url(#fut)"/>`;
  } else {
    s += `<rect x="${x}" y="${haut + 8}" width="${w}" height="${SOL - 20 - haut - 8}" fill="url(#fut)"/>`;
    s += `<path d="M${x - 4} ${haut + 2}h${w + 8}l-4 7h${-w}z" fill="#e2c99a"/>`;
    s += `<rect x="${x - 6}" y="${haut - 6}" width="${w + 12}" height="8" fill="#f4e4bf"/><rect x="${x - 6}" y="${haut - 6}" width="${w + 12}" height="2" fill="#fff6dc"/>`;
  }
  const y0 = casse ? haut + 12 : haut + 10;
  s += `<path d="M${x + 8} ${y0}V${SOL - 22}M${x + 15} ${y0}V${SOL - 22}M${x + 22} ${y0}V${SOL - 22}" stroke="#a9874f" stroke-opacity=".35"/>`;
  s += `<path d="M${x} ${SOL - 20}h${w}l-16 6h${-w}z" fill="#6d5326" fill-opacity=".22"/>`;
  return s;
}

/* ---------- Arche : voussoirs, dont deux manquent en haut à droite ---------- */
function arche(cx, cy, rIn, rOut) {
  let s = "";
  const n = 9;
  for (let k = 0; k < n; k++) {
    if (k === 6 || k === 7) continue;
    const a0 = Math.PI - (k * Math.PI) / n, a1 = Math.PI - ((k + 1) * Math.PI) / n;
    const p = (r, a) => `${r1(cx + r * Math.cos(a))} ${r1(cy - r * Math.sin(a))}`;
    s += `<path d="M${p(rOut, a0)}A${rOut} ${rOut} 0 0 1 ${p(rOut, a1)}L${p(rIn, a1)}A${rIn} ${rIn} 0 0 0 ${p(rIn, a0)}z" fill="${k % 2 ? "#ead4a3" : "#f3e2ba"}" stroke="#b08c55" stroke-opacity=".55"/>`;
  }
  s += `<path d="M${cx + 70} ${SOL + 14}l26 -4 6 14 -28 4z" fill="#e7d09f" stroke="#b08c55" stroke-opacity=".5"/>`;
  return s;
}

/* ---------- Cyprès ---------- */
function cypres(x, h, base) {
  base = base || SOL + 4;
  const y = base - h;
  return `<path d="M${x} ${base}C${x - 15} ${base - h * 0.2} ${x - 16} ${base - h * 0.62} ${x - 8} ${base - h * 0.84}C${x - 4} ${y + 8} ${x - 1} ${y + 3} ${x} ${y}C${x + 1} ${y + 3} ${x + 4} ${y + 8} ${x + 8} ${base - h * 0.84}C${x + 16} ${base - h * 0.62} ${x + 15} ${base - h * 0.2} ${x} ${base}z" fill="url(#cyp)"/>`;
}
const cypresLoin = (x, h, base) => `<path d="M${x} ${base}c-5 -${h * 0.4} -4 -${h * 0.8} 0 -${h}c4 ${h * 0.2} 5 ${h * 0.6} 0 ${h}z" fill="#4e7b62" fill-opacity=".75"/>`;

/* ---------- Positions du groupe de ruines ---------- */
const TX = 800;              // terminal
const T0 = 856, PAS = 58;    // temple : première colonne, écart entre colonnes
const AX = 1262;             // centre de l'arche

/* ---------- Herbes, fleurs et lierre ---------- */
let herbes = "", fleurs = "";
const surMarches = (x, y) => x > T0 - 14 && x < T0 + 4 * PAS + 50 && y < SOL + 16;
for (let i = 0; i < 64; i++) {
  const x = alea() * W, y = SOL + 6 + alea() * 48;
  if (surMarches(x, y)) continue;
  const h = 5 + alea() * 9;
  herbes += `M${r1(x)} ${r1(y)}l${r1(-2 - alea() * 2)} ${r1(-h)}M${r1(x)} ${r1(y)}l${r1(1 + alea() * 2)} ${r1(-h * 0.8)}`;
}
const COULEURS = ["#e8452c", "#e8452c", "#ffd23a", "#ffffff", "#e8452c"];
for (let i = 0; i < 40; i++) {
  const x = alea() * W, y = SOL + 10 + alea() * 44;
  if (surMarches(x, y)) continue;
  fleurs += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(1.4 + alea() * 1.3)}" fill="${COULEURS[Math.floor(alea() * COULEURS.length)]}"/>`;
}
let lierre = "";
const feuille = (x, y, a, c) => `<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="4.2" ry="2.6" transform="rotate(${Math.round(a)} ${r1(x)} ${r1(y)})" fill="${c}"/>`;
const vert = () => (alea() < 0.5 ? "#3f8f3a" : "#68b34c");
// le lierre grimpe sur le pilier gauche de l'arche puis suit l'arc
for (let i = 0; i < 30; i++) {
  const t = i / 29;
  const x = t < 0.55 ? AX - 68 + alea() * 14 : AX - 62 + (t - 0.55) * 130 + alea() * 10;
  const y = t < 0.55 ? SOL - t * 270 + alea() * 8 : 196 - Math.sin((t - 0.55) * 3.2) * 62 + alea() * 10;
  lierre += feuille(x, y, alea() * 180, vert());
}
// et retombe du chapiteau de la première colonne du temple
for (let i = 0; i < 14; i++) lierre += feuille(T0 - 2 + alea() * 34, 162 + i * 7 + alea() * 6, alea() * 180, vert());

const cols = [0, 1, 2, 3, 4].map((k) => colonne(T0 + k * PAS, k === 1 ? 226 : k === 3 ? 262 : 170, k === 1 || k === 3)).join("");
const E0 = T0 + 2 * PAS - 10, E1 = T0 + 4 * PAS + 40; // entablement au-dessus des trois dernières colonnes

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
<linearGradient id="ciel" x1="0" y1="0" x2="0" y2="${H}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0a3a66"/><stop offset=".42" stop-color="#1a64a0"/><stop offset=".66" stop-color="#4c9dd0"/><stop offset=".79" stop-color="#a8d7ec"/><stop offset=".87" stop-color="#f9e5b4"/><stop offset="1" stop-color="#f3c983"/></linearGradient>
<radialGradient id="soleil" cx="1318" cy="128" r="132" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff8dc"/><stop offset=".2" stop-color="#ffeaa6" stop-opacity=".9"/><stop offset=".55" stop-color="#ffd27a" stop-opacity=".3"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>
<linearGradient id="fut" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#bf9d68"/><stop offset=".38" stop-color="#e0c592"/><stop offset=".72" stop-color="#f6e6c2"/><stop offset="1" stop-color="#fff5dc"/></linearGradient>
<linearGradient id="cyp" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#173f22"/><stop offset=".55" stop-color="#2b6234"/><stop offset="1" stop-color="#4f9445"/></linearGradient>
<linearGradient id="pre" x1="0" y1="${SOL - 6}" x2="0" y2="${H}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c9b867"/><stop offset=".45" stop-color="#a7a24f"/><stop offset="1" stop-color="#7e8238"/></linearGradient>
<linearGradient id="champ" x1="0" y1="150" x2="0" y2="${SOL}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9ff0ff" stop-opacity=".75"/><stop offset="1" stop-color="#3d8bff" stop-opacity=".45"/></linearGradient>
<pattern id="balayage" width="8" height="5" patternUnits="userSpaceOnUse"><path d="M0 .5h8" stroke="#e8fbff" stroke-opacity=".55"/></pattern>
<filter id="flou" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
<filter id="lueur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#ciel)"/>
<rect width="${W}" height="${H}" fill="url(#soleil)"/>
<circle cx="1318" cy="128" r="26" fill="#fffbee"/>
<g fill="#fff" filter="url(#flou)" opacity=".55"><ellipse cx="1010" cy="96" rx="90" ry="15"/><ellipse cx="1080" cy="84" rx="54" ry="17"/><ellipse cx="1180" cy="70" rx="70" ry="11"/><ellipse cx="900" cy="150" rx="60" ry="10"/></g>
<path d="M0 318C60 300 110 286 170 292S280 276 340 290 450 300 520 284 650 268 720 286 860 300 930 282 1080 270 1200 292 1330 300 1400 286V${H}H0z" fill="#93bdd2"/>
<g fill="#b3ccd5"><rect x="314" y="294" width="40" height="3"/><rect x="316" y="297" width="3" height="13"/><rect x="325" y="297" width="3" height="13"/><rect x="334" y="297" width="3" height="10"/><rect x="343" y="297" width="3" height="13"/><rect x="350" y="297" width="3" height="13"/><path d="M312 294l22 -8 22 8z"/></g>
<path d="M0 336C80 322 150 318 230 326S380 312 470 322 600 334 700 324 880 312 980 322 1120 330 1200 318 1330 326 1400 322V${H}H0z" fill="#7fa98f"/>
${[60, 78, 150, 168, 420, 438, 560, 640, 700].map((x, i) => cypresLoin(x, 22 + (i % 3) * 7, 330 - (i % 2) * 4)).join("")}
<path d="M0 352C120 346 260 350 400 346S700 342 860 348 1080 352 1200 346 1330 350 1400 348V${H}H0z" fill="url(#pre)"/>
${cypres(TX - 52, 112)}${cypres(TX - 28, 154)}${cypres(T0 + 4 * PAS + 52, 196)}${cypres(1360, 162)}${cypres(1386, 116)}
<path d="M${E0} ${SOL - 20}V214h${E1 - E0 - 10}V${SOL - 20}z" fill="#b08f5c" fill-opacity=".55"/>
<path d="M${T0 + 3 * PAS - 18} ${SOL - 20}V262h34V${SOL - 20}z" fill="#4a3a20" fill-opacity=".45"/>
<rect x="${T0 - 34}" y="${SOL}" width="${4 * PAS + 98}" height="10" fill="#d2b783"/><rect x="${T0 - 34}" y="${SOL}" width="${4 * PAS + 98}" height="2" fill="#f2e1b9"/>
<rect x="${T0 - 24}" y="${SOL - 10}" width="${4 * PAS + 78}" height="10" fill="#dcc391"/><rect x="${T0 - 24}" y="${SOL - 10}" width="${4 * PAS + 78}" height="2" fill="#f6e7c3"/>
<rect x="${T0 - 14}" y="${SOL - 20}" width="${4 * PAS + 58}" height="10" fill="#e6d09f"/><rect x="${T0 - 14}" y="${SOL - 20}" width="${4 * PAS + 58}" height="2" fill="#fbf0d4"/>
<rect x="${T0 - 34}" y="${SOL + 10}" width="${4 * PAS + 98}" height="3" fill="#6b5428" fill-opacity=".35"/>
<g stroke-width="1">${cols}</g>
<path d="M${E0 + 8} 160V146h${E1 - E0 - 8}v14z" fill="#ead6a8"/><rect x="${E0 + 8}" y="158" width="${E1 - E0 - 8}" height="2" fill="#a9874f" fill-opacity=".45"/>
<path d="M${E0} 146V132h${E1 - E0}v14z" fill="#e0c794"/>
<g fill="#c8a970">${[0, 1, 2, 3, 4].map((k) => `<rect x="${E0 + 10 + k * 34}" y="133" width="9" height="13"/>`).join("")}</g>
<path d="M${E0 - 6} 132V124h${E1 - E0 + 12}v8z" fill="#f4e5c1"/><rect x="${E0 - 6}" y="124" width="${E1 - E0 + 12}" height="2" fill="#fff7e2"/>
<path d="M${E1 + 6} 124L${E1 - 82} 88l-6 8 5 8-12 6-4 14z" fill="#efdcb0"/><path d="M${E1 - 8} 120L${E1 - 78} 96l-2 4 3 6-8 4-2 10z" fill="#d6bb86"/>
<rect x="${AX - 70}" y="196" width="32" height="${SOL - 196}" fill="url(#fut)"/><rect x="${AX + 38}" y="196" width="32" height="${SOL - 196}" fill="url(#fut)"/>
<rect x="${AX - 74}" y="188" width="40" height="9" fill="#f2e1b8"/><rect x="${AX + 34}" y="188" width="40" height="9" fill="#f2e1b8"/>
<path d="M${AX - 38} ${SOL}V196A38 38 0 0 1 ${AX + 38} 196V${SOL}z" fill="url(#champ)"/>
<path d="M${AX - 38} ${SOL}V196A38 38 0 0 1 ${AX + 38} 196V${SOL}z" fill="url(#balayage)"/>
<path d="M${AX - 37} ${SOL}V196M${AX + 37} ${SOL}V196" stroke="#d9fbff" stroke-width="2" stroke-opacity=".9"/>
<path d="M${AX - 38} ${SOL}V196A38 38 0 0 1 ${AX + 38} 196V${SOL}" fill="none" stroke="#7fdcff" stroke-width="6" stroke-opacity=".35" filter="url(#lueur)"/>
${arche(AX, 196, 38, 72)}
<g>${lierre}</g>
<rect x="${TX - 13}" y="300" width="26" height="${SOL - 300}" fill="url(#fut)"/><rect x="${TX - 19}" y="295" width="38" height="7" fill="#f2e1b8"/>
<path d="M${TX - 25} 262l50 -7 2 36 -50 6z" fill="#7dffb6" filter="url(#lueur)" opacity=".55"/>
<path d="M${TX - 25} 262l50 -7 2 36 -50 6z" fill="#0d1f15" stroke="#3a4a3e" stroke-width="2"/>
<path d="M${TX - 18} 268l30 -4M${TX - 18} 275l38 -5M${TX - 17} 282l22 -3M${TX - 17} 289l12 -2" stroke="#8dffbf" stroke-width="2" stroke-linecap="round"/>
<rect x="${TX - 3}" y="285" width="5" height="6" fill="#c8ffdf" transform="rotate(-8 ${TX - 1} 288)"/>
<g fill="url(#fut)"><rect x="${T0 + 30}" y="${SOL + 12}" width="48" height="20" rx="2"/><rect x="${AX - 40}" y="${SOL + 22}" width="34" height="15" rx="2"/></g>
<ellipse cx="${T0 + 78}" cy="${SOL + 22}" rx="6" ry="10" fill="#f0dcb0" stroke="#b08c55" stroke-opacity=".6"/>
<ellipse cx="${AX - 6}" cy="${SOL + 29.5}" rx="4.5" ry="7.5" fill="#f0dcb0" stroke="#b08c55" stroke-opacity=".6"/>
<path d="${herbes}" stroke="#6f8f2f" stroke-width="1.4" stroke-linecap="round" fill="none"/>
${fleurs}
</svg>`;
fs.writeFileSync(path.join(process.argv[2], "ruines-scene.svg"), svg);
console.log("ruines-scene.svg", svg.length, "octets");
