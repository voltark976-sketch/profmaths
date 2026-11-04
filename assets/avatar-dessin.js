/*
  Dessin de l'avatar en SVG (aucune image à télécharger). Ce fichier n'est chargé qu'après l'affichage de la page,
  ou tout de suite sur la page « Mon avatar » : en attendant, assets/avatar.js montre le dernier avatar dessiné sur l'appareil.
  Les éléments (noms, niveaux, couleurs) sont dans data/niveaux.js ; les dessins sont ici, rangés par partie de l'avatar.
*/
(function () {
  "use strict";
  const element = window.PM_AVATAR.element;

  /* ---------- Couleurs ---------- */
  const rgb = (hex) => { const v = parseInt(hex.slice(1), 16); return [(v >> 16) & 255, (v >> 8) & 255, v & 255]; };
  const hex = (c) => "#" + c.map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0")).join("");
  const assombrir = (h, f) => hex(rgb(h).map((x) => x * f));
  const melange = (a, b, t) => { const x = rgb(a), y = rgb(b); return hex(x.map((v, k) => v + (y[k] - v) * t)); };
  const clarte = (h) => { const [r, g, b] = rgb(h); return (0.299 * r + 0.587 * g + 0.114 * b) / 255; };
  const ENCRE = "#2b1d16";
  const ETOILE = "M0 -9 L2.6 -2.8 L9 -2.8 L3.8 1.2 L5.6 7.6 L0 3.8 L-5.6 7.6 L-3.8 1.2 L-9 -2.8 L-2.6 -2.8 Z";
  const COEUR = "M0 3.2 C-4.4 0 -5.6 -2.4 -4.2 -4.2 C-3 -5.6 -1 -5.2 0 -3.4 C1 -5.2 3 -5.6 4.2 -4.2 C5.6 -2.4 4.4 0 0 3.2 Z";
  const SCINT = "M0 -4 Q.6 -.6 4 0 Q.6 .6 0 4 Q-.6 .6 -4 0 Q-.6 -.6 0 -4 Z";
  const etoile = (x, y, s, attrs) => `<path transform="translate(${x} ${y}) scale(${s})" d="${ETOILE}" ${attrs}/>`;
  const degradeLin = (id, couleurs, vertical, extra) => `<linearGradient id="${id}" x1="0" y1="0" x2="${vertical ? 0 : 1}" y2="1"${extra || ""}>${couleurs.map((c, k) => `<stop offset="${couleurs.length > 1 ? (k / (couleurs.length - 1)).toFixed(2) : 0}" stop-color="${c}"/>`).join("")}</linearGradient>`;

  /* ---------- Médaillon (forme découpée) ---------- */
  function contour(id) {
    switch (id) {
      case "arrondi": return "M24 2 H76 Q98 2 98 24 V76 Q98 98 76 98 H24 Q2 98 2 76 V24 Q2 2 24 2 Z";
      case "hexagone": return "M50 2 L91.6 26 L91.6 74 L50 98 L8.4 74 L8.4 26 Z";
      case "blason": return "M5 5 H95 V46 C95 72 75 90 50 98 C25 90 5 72 5 46 Z";
      case "fleur": {
        let d = "";
        for (let k = 0; k < 12; k++) {
          const a = (k / 12) * Math.PI * 2 - Math.PI / 2, b = ((k + 1) / 12) * Math.PI * 2 - Math.PI / 2;
          const p = (t, r) => `${(50 + r * Math.cos(t)).toFixed(2)} ${(50 + r * Math.sin(t)).toFixed(2)}`;
          d += (k ? "" : "M" + p(a, 41)) + ` A11.2 11.2 0 0 1 ${p(b, 41)}`;
        }
        return d + " Z";
      }
      default: return "M2 50 A48 48 0 1 0 98 50 A48 48 0 1 0 2 50 Z";
    }
  }

  /* ---------- Fonds ---------- */
  function fleur(x, y, s, c, coeur) {
    return `<g transform="translate(${x} ${y}) scale(${s})">${[0, 72, 144, 216, 288].map((r) => `<ellipse cx="0" cy="-5" rx="2.6" ry="5.5" fill="${c}" transform="rotate(${r})"/>`).join("")}<circle r="1.8" fill="${coeur || "#c98a08"}"/></g>`;
  }
  function fond(id, u) {
    switch (id) {
      case "sable": return `<rect width="100" height="100" fill="#f3e3c3"/><circle cx="20" cy="80" r="2" fill="#e6cf9f"/><circle cx="78" cy="22" r="2.5" fill="#e6cf9f"/><circle cx="85" cy="70" r="1.6" fill="#e6cf9f"/><path d="M8 40 q3 -2 6 0 M86 46 q3 -2 6 0" stroke="#e0c48c" stroke-width="1.2" fill="none" stroke-linecap="round"/>`;
      case "ciel": return `<rect width="100" height="100" fill="#bfe3f5"/><ellipse cx="22" cy="24" rx="12" ry="5" fill="#fff" opacity=".8"/><ellipse cx="80" cy="16" rx="9" ry="4" fill="#fff" opacity=".7"/>`;
      case "corail": return `<rect width="100" height="100" fill="#f8c9bd"/><path d="M12 100 V82 M12 88 l-6 -6 M12 90 l6 -7 M88 100 V80 M88 86 l6 -6 M88 90 l-6 -5" stroke="#ef8f78" stroke-width="3" stroke-linecap="round" fill="none"/>`;
      case "choungui": return `<defs>${degradeLin("g" + u, ["#9fd8ef", "#e7f6f2"], true)}</defs><rect width="100" height="100" fill="url(#g${u})"/><circle cx="80" cy="20" r="7" fill="#fff3c4"/><path d="M0 74 L14 66 L26 69 L40 44 L46 32 L50 27 L54 33 L60 46 L70 63 L84 60 L100 68 V100 H0 Z" fill="#3f8f5a"/><path d="M46 32 L50 27 L54 33 L52 38 L50 34 L48 38 Z" fill="#2f6f44"/><path d="M0 80 L30 76 L60 79 L100 75 V100 H0 Z" fill="#2fb3b0"/><path d="M8 86 h14 M62 88 h18 M30 94 h12" stroke="#fff" stroke-opacity=".5" stroke-width="1.2" stroke-linecap="round"/>`;
      case "feuilles": return `<rect width="100" height="100" fill="#d4edcf"/><g fill="#5fae5a">${[[6, 14, -30], [92, 18, 35], [4, 70, -60], [96, 72, 60], [20, 2, 10], [78, 0, -10]].map(([x, y, r]) => `<path transform="translate(${x} ${y}) rotate(${r})" d="M0 -16 C9 -8 9 8 0 16 C-9 8 -9 -8 0 -16 Z"/><path transform="translate(${x} ${y}) rotate(${r})" d="M0 -14 V14" stroke="#3f8a3c" stroke-width="1"/>`).join("")}</g>`;
      case "grille": return `<rect width="100" height="100" fill="#eef5f4"/><g stroke="#0a7c76" stroke-opacity=".18" stroke-width=".8">${[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="100"/><line x1="0" y1="${x}" x2="100" y2="${x}"/>`).join("")}</g><path d="M6 30 Q20 4 34 30" stroke="#c98a08" stroke-width="1.6" fill="none" opacity=".7"/>`;
      case "baobab": return `<defs>${degradeLin("g" + u, ["#ffd59a", "#f6a96c"], true)}</defs><rect width="100" height="100" fill="url(#g${u})"/><circle cx="76" cy="30" r="9" fill="#fff0c2" opacity=".85"/><path d="M0 84 Q50 78 100 84 V100 H0 Z" fill="#c98a52"/><g fill="#6b4a33"><path d="M10 86 C12 72 11 62 9 52 L17 52 C15 62 15 72 18 86 Z"/><path d="M9 54 L2 44 M11 53 L8 40 M15 53 L17 41 M16 54 L24 45" stroke="#6b4a33" stroke-width="2.2" stroke-linecap="round"/></g><g fill="#7da35a"><ellipse cx="2" cy="42" rx="5" ry="3"/><ellipse cx="8" cy="38" rx="4.5" ry="3"/><ellipse cx="17" cy="39" rx="5" ry="3"/><ellipse cx="25" cy="43" rx="5" ry="3"/></g>`;
      case "vagues": return `<rect width="100" height="100" fill="#4fb6c9"/><g fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="2.2" stroke-linecap="round">${[18, 34, 86].map((y) => `<path d="M0 ${y} q8 -6 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0"/>`).join("")}</g>`;
      case "tableau": return `<rect width="100" height="100" fill="#24433b"/><rect width="100" height="100" fill="none" stroke="#7a5a3a" stroke-width="6"/><g fill="#fff" fill-opacity=".55" font-family="Georgia,serif" font-style="italic"><text x="8" y="18" font-size="7">a²+b²=c²</text><text x="64" y="16" font-size="7">π≈3,14</text><text x="6" y="64" font-size="6">y=ax+b</text><text x="72" y="58" font-size="7">√2</text><text x="66" y="40" font-size="6">∑k</text><text x="10" y="40" font-size="6">x²</text></g><path d="M8 80 l6 -6 l6 6" stroke="#fff" stroke-opacity=".4" fill="none" stroke-width="1"/>`;
      case "nuit": return `<rect width="100" height="100" fill="#14203a"/>${[[15, 20], [30, 10], [80, 14], [88, 34], [12, 48], [70, 26], [22, 72], [86, 66]].map(([x, y], k) => `<circle cx="${x}" cy="${y}" r="${k % 3 ? 0.9 : 1.5}" fill="#fff" opacity=".85"/>`).join("")}<circle cx="78" cy="22" r="7" fill="#f6e7a6"/><circle cx="81" cy="20" r="6" fill="#14203a"/>`;
      case "aurore": return `<defs>${degradeLin("g" + u, ["#0b1d3a", "#173b5c"], true)}</defs><rect width="100" height="100" fill="url(#g${u})"/><g fill="none" stroke-linecap="round"><path d="M-5 40 C20 18 40 46 60 24 S95 22 105 10" stroke="#34d399" stroke-width="10" opacity=".35"/><path d="M-5 52 C22 32 44 58 66 36 S96 34 105 24" stroke="#a78bfa" stroke-width="7" opacity=".3"/><path d="M-5 40 C20 18 40 46 60 24 S95 22 105 10" stroke="#a7f3d0" stroke-width="2" opacity=".5"/></g>${[[12, 12], [88, 44], [70, 8], [30, 70], [90, 80]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#fff"/>`).join("")}`;
      case "coucher": return `<defs>${degradeLin("g" + u, ["#6b4aa8", "#f08a5d", "#f9c46b"], true)}</defs><rect width="100" height="100" fill="url(#g${u})"/><circle cx="50" cy="66" r="16" fill="#ffd27a" opacity=".9"/><rect y="70" width="100" height="30" fill="#2e6f8e" opacity=".85"/>`;
      case "galaxie": return `<defs><radialGradient id="g${u}" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#8b5cf6"/><stop offset=".5" stop-color="#3b1d6e"/><stop offset="1" stop-color="#120b2a"/></radialGradient></defs><rect width="100" height="100" fill="url(#g${u})"/>${[[12, 18], [26, 40], [84, 20], [76, 44], [16, 66], [90, 76], [60, 12], [40, 8]].map(([x, y], k) => `<circle cx="${x}" cy="${y}" r="${k % 2 ? 0.8 : 1.4}" fill="#fff"/>`).join("")}<ellipse cx="50" cy="30" rx="40" ry="6" fill="#f0abfc" opacity=".18" transform="rotate(-18 50 30)"/>`;
      case "neon": return `<defs>${degradeLin("g" + u, ["#1a0b3b", "#4a1460"], true)}</defs><rect width="100" height="100" fill="url(#g${u})"/><circle cx="50" cy="52" r="20" fill="#ff4fa3" opacity=".75"/><g stroke="#4a1460" stroke-width="2.2">${[48, 54, 60, 66].map((y) => `<line x1="28" y1="${y}" x2="72" y2="${y}"/>`).join("")}</g><rect y="64" width="100" height="36" fill="#1a0b3b"/><g stroke="#ff4fa3" stroke-width=".7" opacity=".8">${[66, 70, 76, 84, 96].map((y) => `<line x1="0" y1="${y}" x2="100" y2="${y}"/>`).join("")}${[-60, -30, 0, 30, 60].map((d) => `<line x1="${50 + d / 4}" y1="64" x2="${50 + d * 1.6}" y2="100"/>`).join("")}</g>`;
      case "ylang": return `<defs>${degradeLin("g" + u, ["#fbe6a2", "#e3b23c"])}</defs><rect width="100" height="100" fill="url(#g${u})"/>${[[16, 20], [84, 26], [14, 74], [88, 80]].map(([x, y]) => fleur(x, y, 0.8, "#fff7cc")).join("")}`;
      default: return `<defs>${degradeLin("g" + u, ["#7fd6cd", "#2a8fb8"])}</defs><rect width="100" height="100" fill="url(#g${u})"/>`;
    }
  }

  /* ---------- Effets (derrière l'avatar) ---------- */
  function effet(id, u) {
    switch (id) {
      case "etincelles": return [[15, 22, 1.1], [85, 24, 0.9], [11, 58, 0.8], [89, 52, 1.2], [24, 10, 0.6], [74, 8, 0.7]].map(([x, y, s], k) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="av-fx-scintille" style="animation-delay:${(k * 0.45).toFixed(2)}s" d="${SCINT}" fill="#fff6c8"/></g>`).join("");
      case "bulles": return [[14, 70, 3], [22, 50, 2], [84, 64, 2.6], [90, 40, 1.8], [12, 30, 1.6], [80, 20, 2.2]].map(([x, y, r], k) => `<circle class="av-fx-monte" style="animation-delay:${(k * 0.6).toFixed(1)}s" cx="${x}" cy="${y}" r="${r}" fill="#fff" fill-opacity=".18" stroke="#fff" stroke-opacity=".7" stroke-width=".7"/>`).join("");
      case "symboles": return `<g fill="#fff" fill-opacity=".75" font-family="Georgia,serif" font-weight="700" text-anchor="middle">${[["π", 16, 28, 10], ["√", 84, 30, 9], ["Σ", 14, 62, 9], ["∞", 86, 58, 10], ["÷", 26, 14, 7], ["%", 74, 14, 7]].map(([t, x, y, s], k) => `<text class="av-fx-flotte" style="animation-delay:${(k * 0.5).toFixed(1)}s" x="${x}" y="${y}" font-size="${s}">${t}</text>`).join("")}</g>`;
      case "halo": return `<g class="av-fx-pulse"><circle cx="50" cy="46" r="31" fill="none" stroke="#22d3ee" stroke-width="7" opacity=".18"/><circle cx="50" cy="46" r="29" fill="none" stroke="#67e8f9" stroke-width="2" opacity=".8"/><circle cx="50" cy="46" r="34" fill="none" stroke="#e879f9" stroke-width="1.2" opacity=".55"/></g>`;
      case "orbite": return `<circle cx="50" cy="46" r="33" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width=".7" stroke-dasharray="2 2"/><g class="av-fx-tourne"><circle cx="83" cy="46" r="3.4" fill="#fbbf24"/><circle cx="17" cy="46" r="2.4" fill="#60a5fa"/><circle cx="50" cy="13" r="1.8" fill="#f472b6"/></g>`;
      case "rayons": return `<g class="av-fx-tourne-lent" fill="#ffe08a" opacity=".45">${Array.from({ length: 12 }, (_, k) => `<path transform="rotate(${k * 30} 50 46)" d="M50 46 L45 -20 L55 -20 Z"/>`).join("")}</g><circle cx="50" cy="46" r="30" fill="#fff3c4" opacity=".35"/>`;
      case "chiffres": return `<g fill="#6ee7b7" font-family="monospace" font-weight="700" font-size="7" opacity=".8">${[[16, 30, "1", 0], [24, 60, "π", 1.2], [80, 24, "7", 0.6], [86, 52, "0", 1.8], [15, 50, "√", 2.4], [76, 70, "9", 3]].map(([x, y, t, d]) => `<text class="av-fx-tombe" style="animation-delay:${d}s" x="${x}" y="${y}">${t}</text>`).join("")}</g>`;
      default: return "";
    }
  }

  /* ---------- Cheveux : une partie derrière la tête, une partie devant ---------- */
  const CAP = "M31 46 C29 26 40 20 50 20 C60 20 71 26 69 46 C67 36 60 31 50 31 C40 31 33 36 31 46 Z";
  const CAP_RAIE = "M31 47 C29 26 40 20 50 20 C60 20 71 26 69 47 C68 38 63 31.5 56 31 C51 33.5 44 33.5 38.5 35 C35 38 32.5 42 31 47 Z";
  const RAS = "M33.6 40 C33.6 28.5 42 25.6 50 25.6 C58 25.6 66.4 28.5 66.4 40 C63 34 57 32 50 32 C43 32 37 34 33.6 40 Z";
  // Hauteur des cheveux au-dessus du crâne : les chapeaux montent d'autant
  const VOLUME = { afro: 9, crete: 12, superepis: 9, epis: 5, chignon: 7, macarons: 4, vanilles: 3, boucles: 4, bouclelong: 3, degrade: 2, dessin: 2 };
  const cercles = (l, f) => l.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`).join("");
  function cheveux(id, c, k) {
    // c : remplissage (couleur ou dégradé) ; k.s : couleur unie ; k.fonce : traits ; k.peau ; k.tissu : couleur du foulard
    const p = (d, extra) => `<path d="${d}" fill="${c}"${extra || ""}/>`;
    const trait = (d, w, o) => `<path d="${d}" fill="none" stroke="${k.fonce}" stroke-width="${w || 0.8}" stroke-opacity="${o || 0.45}" stroke-linecap="round"/>`;
    switch (id) {
      case "rase": return { der: "", dev: p(RAS, ` opacity=".22"`) };
      case "ras": return { der: "", dev: `<path d="M33 40 C33 27 42 24 50 24 C58 24 67 27 67 40 C63 33 57 31 50 31 C43 31 37 33 33 40 Z" fill="${c}" opacity=".9"/>` };
      case "degrade":
      case "dessin": return {
        der: "",
        dev: p("M32.4 47 C31 30 40 23.6 50 23.6 C60 23.6 69 30 67.6 47 C66 39 60 33.5 50 33.5 C40 33.5 34 39 32.4 47 Z", ` opacity=".45"`) +
          p("M34.5 35 C33.5 21 41.5 17 50 17 C58.5 17 66.5 21 65.5 35 C61.5 31 56 30 50 30 C44 30 38.5 31 34.5 35 Z") + trait("M41 21.5 C46 19.6 54 19.6 59 21.5", 0.7, 0.35) +
          (id === "dessin" ? `<path d="M33.2 41 l2.6 -2.8 l-.4 2.4 l2.6 -2.8 M66.8 41 l-2.6 -2.8 l.4 2.4 l-2.6 -2.8" fill="none" stroke="${k.peau}" stroke-width=".9" stroke-linecap="round" stroke-linejoin="round"/>` : "")
      };
      case "epis": return { der: "", dev: p("M31 45 C30 33 32 27 35.5 24.5 L34 17.5 L40.5 21.5 L43 13.5 L47.5 20.5 L52.5 12.5 L55.5 20.5 L61 14.5 L61.5 22.5 L68 19.5 L65.5 26.5 C68.8 31 70 38 69 45 C66.5 36 59.5 31 50 31 C40.5 31 33.5 36 31 45 Z") };
      case "superepis": return {
        der: p("M28 52 L21 44 L29 41 L19 31 L30 29.5 L24 17 L35 21 L35 7 L44 16.5 L50 3 L56 16.5 L65 7 L65 21 L76 17 L70 29.5 L81 31 L71 41 L79 44 L72 52 Z"),
        dev: p("M31 46 C29.5 33 34 25 40 22 L50 21 L60 22 C66 25 70.5 33 69 46 C67 39 64.5 35.5 61.5 33.5 L58.5 38.5 L55.5 32.5 L50 37.5 L44.5 32.5 L41.5 38.5 L38.5 33.5 C35.5 35.5 33 39 31 46 Z")
      };
      case "crete": return { der: "", dev: p(RAS, ` opacity=".3"`) + p("M44.5 32 C43 24 43 16 46 8 L48.4 13 L50 4 L52 12.5 L54.5 7 C57.5 15 57 24 55.5 32 C52 30.8 48 30.8 44.5 32 Z") };
      case "meche": return { der: "", dev: p("M31 46 C29 25.5 40 19.5 51 19.5 C62 19.5 71.5 25.5 69 46 C68 40 66.5 36 64 33.5 C58 37.5 47 39.5 36.5 37.5 C34 40 32.3 43 31 46 Z") + `<path d="M40 25 C48 22 58 23 64 28" stroke="#fff" stroke-opacity=".2" stroke-width="1.4" fill="none" stroke-linecap="round"/>` };
      case "boucles": return {
        der: cercles([[35, 33, 9], [43, 25, 9], [54, 24, 9], [63, 29, 9], [68, 39, 7], [32, 41, 7]], c),
        dev: cercles([[40, 30, 5.5], [49, 28, 5.5], [58, 30, 5.5]], c)
      };
      case "afro": {
        const l = [[50, 32, 20.5]];
        for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; l.push([+(50 + 20 * Math.cos(a)).toFixed(1), +(32 + 19 * Math.sin(a)).toFixed(1), 6]); }
        return { der: cercles(l, c) + trait("M38 16 q2 -2 4 0 M56 14 q2 -2 4 0 M66 22 q2 -2 4 0 M30 24 q2 -2 4 0", 0.8, 0.3), dev: p("M32 45 C31 31.5 40 27 50 27 C60 27 69 31.5 68 45 C65.5 36.5 58.5 33 50 33 C41.5 33 34.5 36.5 32 45 Z") };
      }
      case "vanilles": {
        let t = "";
        for (let i = 0; i < 11; i++) {
          const a = (195 + i * 15) * Math.PI / 180, x = 50 + 19.5 * Math.cos(a), y = 40 + 19.5 * Math.sin(a), r = (195 + i * 15) + 90;
          t += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${r})"><ellipse rx="2.8" ry="5.4" fill="${c}"/><path d="M-2 -2.4 L2 -1 M-2 .6 L2 2" stroke="${k.fonce}" stroke-opacity=".45" stroke-width=".6"/></g>`;
        }
        return { der: p("M30.5 47 C29 24 39 19 50 19 C61 19 71 24 69.5 47 Z"), dev: p("M31.5 45 C30.5 31 39 26 50 26 C61 26 69.5 31 68.5 45 C66 37.5 59 33.5 50 33.5 C41 33.5 34 37.5 31.5 45 Z") + t };
      }
      case "nattes": return {
        der: `<g fill="${c}"><rect x="29" y="42" width="4.4" height="30" rx="2.2"/><rect x="66.6" y="42" width="4.4" height="30" rx="2.2"/></g>`,
        dev: p("M32.4 43 C31.6 28 40 23.4 50 23.4 C60 23.4 68.4 28 67.6 43 C65 35 58.6 31.6 50 31.6 C41.4 31.6 35 35 32.4 43 Z") +
          `<g fill="none" stroke="${k.fonce}" stroke-opacity=".55" stroke-width=".9" stroke-dasharray="1.3 .9"><path d="M36.6 37 C37.6 30.5 41.5 26.5 46 24.6"/><path d="M43 33.4 C43.8 28.4 45.8 25.6 48.4 24"/><path d="M50 31.6 L50 23.6"/><path d="M57 33.4 C56.2 28.4 54.2 25.6 51.6 24"/><path d="M63.4 37 C62.4 30.5 58.5 26.5 54 24.6"/></g>`
      };
      case "locks": {
        const corde = (x, y1, y2, w) => `<rect x="${x - w / 2}" y="${y1}" width="${w}" height="${y2 - y1}" rx="${w / 2}" fill="${c}"/>` + Array.from({ length: Math.floor((y2 - y1) / 5) }, (_, i) => `<line x1="${x - w / 2 + 0.4}" y1="${y1 + 4 + i * 5}" x2="${x + w / 2 - 0.4}" y2="${y1 + 5 + i * 5}" stroke="${k.fonce}" stroke-opacity=".4" stroke-width=".6"/>`).join("");
        return {
          der: p("M29 47 C27 23 39 18.5 50 18.5 C61 18.5 73 23 71 47 Z") + corde(27.5, 34, 70, 5) + corde(32.5, 40, 74, 5) + corde(67.5, 40, 74, 5) + corde(72.5, 34, 70, 5),
          dev: p(CAP) + trait("M40 23 C38 27 37 32 36 37 M50 20.5 L50 31 M60 23 C62 27 63 32 64 37", 0.7, 0.35) + corde(31.6, 37, 61, 4.6) + corde(68.4, 37, 61, 4.6)
        };
      }
      case "tresses": return {
        der: `<g fill="${c}"><rect x="27" y="40" width="7" height="30" rx="3.5"/><rect x="66" y="40" width="7" height="30" rx="3.5"/></g><g stroke="#000" stroke-opacity=".25" stroke-width=".8">${[48, 55, 62].map((y) => `<line x1="27" y1="${y}" x2="34" y2="${y + 2}"/><line x1="66" y1="${y}" x2="73" y2="${y + 2}"/>`).join("")}</g>`,
        dev: p(CAP)
      };
      case "tresse": return {
        der: "",
        dev: p(CAP_RAIE) + [[32.2, 49], [31.6, 54.4], [31, 59.8], [30.4, 65.2], [29.8, 70.6]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3.7" ry="3.1" fill="${c}"/><path d="M${x - 3} ${y - 0.6} Q${x} ${y + 1.6} ${x + 3} ${y - 0.6}" fill="none" stroke="${k.fonce}" stroke-opacity=".4" stroke-width=".6"/>`).join("") +
          `<rect x="27.6" y="73.4" width="4.4" height="1.8" rx=".9" fill="#e2725b"/><path d="M28 75 L26.6 80 L29.8 78.6 L32.4 80.4 L31.6 75 Z" fill="${c}"/>`
      };
      case "queue": return {
        der: p("M62 27 C75 27 80 39 78.5 53 C77.5 62 74.5 68 70.5 71 C72.5 62 72.5 52 68.5 44 C66.5 38 64 33 59 30 Z"),
        dev: p("M31.5 45 C30 27 40 21.5 50 21.5 C60 21.5 70 27 68.5 45 C67 35 60 29.5 50 29.5 C40 29.5 33 35 31.5 45 Z") + trait("M40 25 C44 23 48 22.5 52 22.6 M44 28 C49 25.5 56 25 62 27", 0.7, 0.3) + `<circle cx="65.4" cy="29.6" r="2.4" fill="#e2725b"/>`
      };
      case "chignon": return { der: `<circle cx="50" cy="19" r="8.5" fill="${c}"/>`, dev: p(CAP) };
      case "macarons": return {
        der: cercles([[34.5, 21.5, 7.5], [65.5, 21.5, 7.5]], c) + trait("M30 21 q4.5 -5 9 0 M61 21 q4.5 -5 9 0", 0.8, 0.35),
        dev: p(CAP) + trait("M50 20.5 L50 30.5", 0.9, 0.5)
      };
      case "couettes": {
        const touffe = (x, y) => { const l = [[x, y, 7.6]]; for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; l.push([+(x + 7 * Math.cos(a)).toFixed(1), +(y + 7 * Math.sin(a)).toFixed(1), 3.2]); } return cercles(l, c); };
        return { der: touffe(26.5, 32) + touffe(73.5, 32), dev: p(CAP) + trait("M50 20.5 L50 30.5", 0.9, 0.5) + `<rect x="31.4" y="33" width="3" height="4.4" rx="1.2" fill="#e2725b" transform="rotate(-35 33 35)"/><rect x="65.6" y="33" width="3" height="4.4" rx="1.2" fill="#e2725b" transform="rotate(35 67 35)"/>` };
      }
      case "carre": return { der: p("M28.5 47 C27 22 40 19 50 19 C60 19 73 22 71.5 47 L72 61.5 C67 64 63 63.5 61 61.5 L39 61.5 C37 63.5 33 64 28 61.5 Z"), dev: p(CAP_RAIE) };
      case "frange": return {
        der: p("M29 46 C27 22 40 19 50 19 C60 19 73 22 71 46 L72 66 C64 69 36 69 28 66 Z"),
        dev: p("M31.5 46 C29.5 25 40 19.5 50 19.5 C60 19.5 70.5 25 68.5 46 C68 42.5 67.6 40.5 67 38.6 C64 39.6 61 38.4 58.5 39.4 C55.5 38.4 52.5 39.6 50 38.6 C47.5 39.6 44.5 38.4 41.5 39.4 C39 38.4 36 39.6 33 38.6 C32.4 40.5 32 42.5 31.5 46 Z")
      };
      case "long": return { der: p("M29 46 C27 22 40 19 50 19 C60 19 73 22 71 46 L73 74 C64 78 36 78 27 74 Z"), dev: p(CAP) };
      case "ondules": return { der: p("M29 46 C27 22 40 19 50 19 C60 19 73 22 71 46 C74 52 70 56 73 62 C75 68 71 72 74 78 L26 78 C29 72 25 68 27 62 C30 56 26 52 29 46 Z"), dev: p(CAP_RAIE) };
      case "bouclelong": {
        const l = [];
        for (let y = 30; y <= 74; y += 6.3) { l.push([27 - (y > 50 ? 1 : 0), y, 4.6]); l.push([73 + (y > 50 ? 1 : 0), y, 4.6]); }
        for (let x = 31; x <= 69; x += 6.3) l.push([x, 77, 4.4]);
        return { der: p("M28 46 C26 22 40 18.5 50 18.5 C60 18.5 74 22 72 46 L74 76 L26 76 Z") + cercles(l, c), dev: p(CAP) + cercles([[38, 29, 4], [45, 26.5, 4], [52, 26, 4], [59, 27.5, 4], [64.5, 31, 3.6], [34, 33.5, 3.6]], c) };
      }
      case "foulard":
      case "kishali": {
        const t = k.tissu, motifs = id === "kishali" ? `<g fill="${clarte(t) > 0.6 ? assombrir(t, 0.75) : melange(t, "#ffffff", 0.55)}">${[[38, 26], [50, 23.5], [62, 26], [33, 38], [67, 38], [30, 52], [70, 52], [36, 66], [64, 66], [44, 72], [56, 72]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.1"/><circle cx="${x + 1.8}" cy="${y}" r=".55"/><circle cx="${x - 1.8}" cy="${y}" r=".55"/><circle cx="${x}" cy="${y + 1.8}" r=".55"/><circle cx="${x}" cy="${y - 1.8}" r=".55"/>`).join("")}</g>` : "";
        return {
          der: `<path d="M27 50 C26 24 38 20 50 20 C62 20 74 24 73 50 C74 62 70 70 62 74 L38 74 C30 70 26 62 27 50 Z" fill="${t}"/>` + motifs,
          dev: `<path d="M30 44 C30 27 40 22 50 22 C60 22 70 27 70 44 C67 34 60 30 50 30 C40 30 33 34 30 44 Z" fill="${t}"/>${id === "kishali" ? `<g fill="${clarte(t) > 0.6 ? assombrir(t, 0.75) : melange(t, "#ffffff", 0.55)}"><circle cx="42" cy="26.5" r=".9"/><circle cx="50" cy="25" r=".9"/><circle cx="58" cy="26.5" r=".9"/></g>` : ""}<path d="M30 44 C33 33 41 30 50 30 C59 30 67 33 70 44" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.2"/>`
        };
      }
      default: return { der: "", dev: p(CAP) + `<path d="M38 31 C43 35 48 35 54 32" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/>` };
    }
  }

  /* ---------- Visage ---------- */
  const FORMES = {
    ovale: { d: "M33 45 A17 19 0 1 0 67 45 A17 19 0 1 0 33 45 Z", o: 33 },
    rond: { d: "M31.7 46 A18.3 18 0 1 0 68.3 46 A18.3 18 0 1 0 31.7 46 Z", o: 32.2 },
    carre: { d: "M33.2 37 C33.2 28.5 40.5 26 50 26 C59.5 26 66.8 28.5 66.8 37 L66.6 52 C66.4 60.5 59.5 64.5 50 64.5 C40.5 64.5 33.6 60.5 33.4 52 Z", o: 33.4 },
    coeur: { d: "M32.6 40 C32.6 29.5 40.5 26 50 26 C59.5 26 67.4 29.5 67.4 40 C67.4 51 59 63.5 50 64.5 C41 63.5 32.6 51 32.6 40 Z", o: 33 },
    long: { d: "M34.4 44.5 A15.6 20.2 0 1 0 65.6 44.5 A15.6 20.2 0 1 0 34.4 44.5 Z", o: 34.6 },
    doux: { d: "M34.5 38 C34.5 29 41.5 26 50 26 C58.5 26 65.5 29 65.5 38 C66.8 47 67.6 55 62.5 60 C58.8 63.6 54.5 64.6 50 64.6 C45.5 64.6 41.2 63.6 37.5 60 C32.4 55 33.2 47 34.5 38 Z", o: 34 }
  };

  function yeux(id, iris, peau) {
    const encre = melange(iris, "#140c07", 0.6);
    const lumiere = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/>`;
    const grand = (x, rx, ry, ri) => `<ellipse cx="${x}" cy="46" rx="${rx}" ry="${ry}" fill="#fff"/><circle cx="${x}" cy="46.4" r="${ri}" fill="${iris}"/><circle cx="${x}" cy="46.4" r="${(ri * 0.5).toFixed(2)}" fill="#140c07"/>` + lumiere(x + 0.9, 45.2, 0.8) + `<path d="M${x - rx - 0.2} 45.4 Q${x} ${46 - ry - 1.6} ${x + rx + 0.2} 45.4" stroke="${ENCRE}" stroke-width="1.15" fill="none" stroke-linecap="round"/>`;
    const deux = (f) => f(43, -1) + f(57, 1);
    switch (id) {
      case "grands": return deux((x) => grand(x, 3.1, 3.5, 2.3));
      case "amande": return deux((x, s) => `<path d="M${x - 3.6} 46 Q${x} 42.6 ${x + 3.6} 46 Q${x} 49 ${x - 3.6} 46 Z" fill="#fff"/><circle cx="${x}" cy="46" r="1.75" fill="${iris}"/><circle cx="${x}" cy="46" r=".85" fill="#140c07"/>` + lumiere(x + 0.6, 45.4, 0.5) + `<path d="M${x - 3.8 * s} 46.2 Q${x} 42.3 ${x + 3.9 * s} 45.6 L${x + 4.8 * s} 44.6" stroke="${ENCRE}" stroke-width="1.25" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
      case "cils": return deux((x, s) => grand(x, 2.8, 3.1, 2.1) + `<path d="M${x + 2.2 * s} 43.4 l${1.3 * s} -1.4 M${x + 3 * s} 44.4 l${1.6 * s} -.9 M${x + 1 * s} 42.9 l${0.8 * s} -1.6" stroke="${ENCRE}" stroke-width=".8" stroke-linecap="round"/>`);
      case "rieurs": return deux((x) => `<path d="M${x - 3} 47 Q${x} 43 ${x + 3} 47" stroke="${ENCRE}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`);
      case "miclos": return deux((x) => `<ellipse cx="${x}" cy="46" rx="3.1" ry="3.1" fill="#fff"/><circle cx="${x}" cy="46.6" r="2.1" fill="${iris}"/><circle cx="${x}" cy="46.6" r="1" fill="#140c07"/><path d="M${x - 3.6} 46.1 V42 H${x + 3.6} V46.1 Z" fill="${peau}"/><path d="M${x - 3.3} 46.1 Q${x} 45.5 ${x + 3.3} 46.1" stroke="${ENCRE}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`);
      case "clin": return `<circle cx="43" cy="46" r="2.2" fill="${encre}"/>` + lumiere(43.7, 45.2, 0.65) + `<path d="M54 46 Q57 48.5 60 46" stroke="${ENCRE}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
      case "brillants": return deux((x) => `<ellipse cx="${x}" cy="46" rx="3.3" ry="3.7" fill="#fff"/><circle cx="${x}" cy="46.3" r="3" fill="${iris}"/><path d="M${x - 2.6} 47.6 A3 3 0 0 0 ${x + 2.6} 47.6 Z" fill="#fff" opacity=".25"/><circle cx="${x}" cy="46.3" r="1.35" fill="#140c07"/>` + lumiere(x + 1.1, 45, 1.1) + lumiere(x - 1.1, 47.6, 0.55) + `<path d="M${x - 3.5} 45.2 Q${x} 41 ${x + 3.5} 45.2" stroke="${ENCRE}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`);
      case "etoiles": return [43, 57].map((x) => etoile(x, 46, 0.42, `fill="#f2b705" stroke="#b07d00" stroke-width="1"`)).join("");
      case "coeurs": return [43, 57].map((x) => `<path transform="translate(${x} 46.6) scale(.78)" d="${COEUR}" fill="#ef4f6d" stroke="#b3203f" stroke-width=".8"/>`).join("");
      default: return deux((x) => `<circle cx="${x}" cy="46" r="2.2" fill="${encre}"/>` + lumiere(x + 0.7, 45.2, 0.65));
    }
  }
  const CLIGNE = ["ronds", "grands", "amande", "cils", "miclos", "brillants"];

  function sourcils(id, c) {
    const s = (d, w) => `<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
    switch (id) {
      case "epais": return s("M38.8 41.4 Q43 39.2 47 40.8 M53 40.8 Q57 39.2 61.2 41.4", 2.6);
      case "fins": return s("M38.6 41 Q43 38.2 47.2 40.4 M52.8 40.4 Q57 38.2 61.4 41", 1.05);
      case "droits": return s("M38.8 40.8 L47 40.2 M53 40.2 L61.2 40.8", 1.8);
      case "fronces": return s("M39 39.6 L47 41.6 M61 39.6 L53 41.6", 1.8);
      case "hauts": return s("M39 39.4 Q43 36.8 47 38.6 M53 38.6 Q57 36.8 61 39.4", 1.5);
      case "aucun": return "";
      default: return s("M38.8 41.4 Q43 39.4 47 40.8 M53 40.8 Q57 39.4 61.2 41.4", 1.6);
    }
  }

  function nez(id, peau) {
    const c = assombrir(peau, 0.74);
    const s = (d, w) => `<path d="${d}" stroke="${c}" stroke-width="${w || 1.3}" fill="none" stroke-linecap="round"/>`;
    switch (id) {
      case "point": return `<circle cx="48.9" cy="51.4" r=".6" fill="${c}"/><circle cx="51.1" cy="51.4" r=".6" fill="${c}"/>`;
      case "droit": return s("M50.4 46.4 L49 51.2 Q50 52.3 51.7 51.6", 1.1);
      case "large": return s("M46.8 50.8 Q47.4 53 50 52.9 Q52.6 53 53.2 50.8") + `<circle cx="48.4" cy="51.7" r=".55" fill="${c}"/><circle cx="51.6" cy="51.7" r=".55" fill="${c}"/>`;
      case "bouton": return `<ellipse cx="50" cy="51" rx="2.4" ry="1.9" fill="${c}" opacity=".35"/><circle cx="49.2" cy="50.4" r=".6" fill="#fff" opacity=".6"/>`;
      case "aucun": return "";
      default: return s("M48.2 51.6 Q50 53.2 51.8 51.6");
    }
  }

  function bouche(id, peau) {
    const s = (d) => `<path d="${d}" stroke="${ENCRE}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
    switch (id) {
      case "grand": return `<path d="M43.5 53.2 Q50 61 56.5 53.2 Z" fill="${ENCRE}"/><path d="M44.7 53.7 L55.3 53.7 Q54.8 55.1 54 55.5 L46 55.5 Q45.2 55.1 44.7 53.7 Z" fill="#fff"/>`;
      case "rire": return `<path d="M43 52 Q50 61 57 52 Z" fill="${ENCRE}"/><path d="M46 56.5 Q50 58.5 54 56.5" fill="#e86a6a"/>`;
      case "neutre": return s("M45.5 55 Q50 55.8 54.5 55");
      case "moue": return s("M45 55.4 Q50 56.3 55.6 53.2");
      case "surpris": return `<ellipse cx="50" cy="55.6" rx="2.4" ry="3" fill="${ENCRE}"/>`;
      case "levres": { const l = melange(peau, "#b0344a", 0.55); return `<path d="M44.5 54 Q47 52.5 50 53.5 Q53 52.5 55.5 54 Q50 58.8 44.5 54 Z" fill="${l}"/><path d="M44.8 54.1 Q50 55.7 55.2 54.1" stroke="${assombrir(l, 0.7)}" stroke-width=".6" fill="none"/>`; }
      case "langue": return s("M44 54 Q50 58.6 56 54") + `<path d="M47.6 56.1 C47.6 60.6 52.6 60.6 52.6 56.1 Z" fill="#ef7a86" stroke="${ENCRE}" stroke-width=".6"/><path d="M50.1 56.4 V58.6" stroke="#c4505e" stroke-width=".5"/>`;
      case "dents": return `<path d="M44 53.4 Q50 59.6 56 53.4 Z" fill="${ENCRE}"/><rect x="47.5" y="53.6" width="2.2" height="2.7" rx=".5" fill="#fff"/><rect x="50.3" y="53.6" width="2.2" height="2.7" rx=".5" fill="#fff"/>`;
      default: return s("M44 54 Q50 59 56 54");
    }
  }

  function details(id, peau) {
    switch (id) {
      case "joues": return `<circle cx="39" cy="52" r="3.6" fill="#ff6b6b" opacity=".33"/><circle cx="61" cy="52" r="3.6" fill="#ff6b6b" opacity=".33"/>`;
      case "rousseur": return `<g fill="${assombrir(peau, 0.68)}" opacity=".85">${[[40, 50], [42.4, 51.3], [38.6, 52.3], [41.2, 53.4], [60, 50], [57.6, 51.3], [61.4, 52.3], [58.8, 53.4], [48.4, 49.4], [51.6, 49.4]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".5"/>`).join("")}</g>`;
      case "grain": return `<circle cx="56.6" cy="57.4" r=".8" fill="${assombrir(peau, 0.45)}"/>`;
      case "msindzano": {
        // Masque de beauté au bois de santal : fleurs de points sur les joues
        const fl = (x, y) => `<circle cx="${x}" cy="${y}" r="1"/>` + [0, 60, 120, 180, 240, 300].map((a) => `<circle cx="${(x + 2.1 * Math.cos(a * Math.PI / 180)).toFixed(2)}" cy="${(y + 2.1 * Math.sin(a * Math.PI / 180)).toFixed(2)}" r=".7"/>`).join("");
        return `<g fill="#f7ecc6" stroke="#d9c58a" stroke-width=".2">${fl(39.2, 52.6)}${fl(60.8, 52.6)}<circle cx="36" cy="48.4" r=".55"/><circle cx="35.4" cy="56" r=".55"/><circle cx="64" cy="48.4" r=".55"/><circle cx="64.6" cy="56" r=".55"/><circle cx="50" cy="61" r=".9"/></g>`;
      }
      case "pansement": return `<g transform="rotate(-25 60.5 51.5)"><rect x="56.5" y="50" width="8" height="3" rx="1.4" fill="#f3cfa6" stroke="#d6a979" stroke-width=".4"/><rect x="59.3" y="50.3" width="2.4" height="2.4" fill="#e9bb8b"/></g>`;
      case "paillettes": return [[36.4, 42.6, 0.32], [63.6, 43, 0.36], [38.6, 49.6, 0.24], [61.6, 49.2, 0.26]].map(([x, y, s]) => `<path transform="translate(${x} ${y}) scale(${s})" d="${SCINT}" fill="#fde68a" stroke="#d4a017" stroke-width=".6"/>`).join("");
      case "pi": return `<text x="60.6" y="55" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="5.6" fill="#1e9fb0">π</text>`;
      case "eclair": return `<path d="M41.4 38.6 L38.8 45.2 L41.4 45.2 L39.2 52 L44.2 43.8 L41.6 43.8 L43.6 38.6 Z" fill="#f2b705" stroke="#c98a08" stroke-width=".4" opacity=".92"/>`;
      default: return "";
    }
  }

  function barbe(id, c, u) {
    const moustache = (o) => `<path d="M44.6 53.5 C46 51.4 48.5 51.8 50 52.8 C51.5 51.8 54 51.4 55.4 53.5 C53.5 53.2 51.5 53.6 50 54 C48.5 53.6 46.5 53.2 44.6 53.5 Z" fill="${c}"${o ? ` opacity="${o}"` : ""}/>`;
    const clip = ` clip-path="url(#v${u})"`;
    switch (id) {
      case "moustache": return moustache();
      case "bouc": return moustache(0.9) + `<path d="M46.4 58.6 Q50 57.4 53.6 58.6 Q53.2 63.4 50 64 Q46.8 63.4 46.4 58.6 Z" fill="${c}"/>`;
      case "collier": return `<path d="M20 47 H80 V80 H20 Z M36.8 47 A13.2 14.4 0 0 0 63.2 47 Z" fill-rule="evenodd" fill="${c}"${clip}/>`;
      case "courte": return `<path d="M20 48 C30 48 36 56.4 43 55.4 Q50 51.4 57 55.4 C64 56.4 70 48 80 48 V80 H20 Z M43.4 55.4 A6.6 3.5 0 1 0 56.6 55.4 A6.6 3.5 0 1 0 43.4 55.4 Z" fill-rule="evenodd" fill="${c}" opacity=".92"${clip}/>` + moustache();
      default: return "";
    }
  }

  /* ---------- Tenue ---------- */
  const CORPS = "M16 100 C16 82 31 72 50 72 C69 72 84 82 84 100 Z";
  // Renvoie le dessin du haut et indique s'il accepte un motif
  function haut(id, c, solide, peau, u) {
    const ombre = assombrir(solide, 0.78), clair = melange(solide, "#ffffff", 0.35);
    const col = `<path d="M43 72 Q50 79 57 72" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="1.6"/>`;
    const manches = `<path d="M27.5 84 Q29.5 91 28.6 100 M72.5 84 Q70.5 91 71.4 100" stroke="#000" stroke-opacity=".12" stroke-width="1" fill="none"/>`;
    const peauOmbre = assombrir(peau, 0.9);
    switch (id) {
      case "colv": return { svg: `<path d="${CORPS}" fill="${c}"/><path d="M43.5 72.2 L50 80.6 L56.5 72.2 Z" fill="${peauOmbre}"/><path d="M43 72 L50 81 L57 72" fill="none" stroke="${ombre}" stroke-width="1.4"/>${manches}`, motif: true };
      case "debardeur": return { svg: `<path d="${CORPS}" fill="${peauOmbre}"/><path d="M29 100 C30 88 33 80 36 73.6 L40 73.2 C42 78 46 80.4 50 80.4 C54 80.4 58 78 60 73.2 L64 73.6 C67 80 70 88 71 100 Z" fill="${c}"/>`, motif: true, zone: "M29 100 C30 88 33 80 36 73.6 L40 73.2 C42 78 46 80.4 50 80.4 C54 80.4 58 78 60 73.2 L64 73.6 C67 80 70 88 71 100 Z" };
      case "sweat": return { svg: `<path d="M33 77 C33 68 40 64.5 50 64.5 C60 64.5 67 68 67 77 L60 78.6 C58 73.4 55 71.4 50 71.4 C45 71.4 42 73.4 40 78.6 Z" fill="${ombre}"/><path d="${CORPS}" fill="${c}"/><path d="M40 78.6 C42 73.4 45 72 50 72 C55 72 58 73.4 60 78.6" fill="none" stroke="${ombre}" stroke-width="1.6"/><path d="M46.6 74.5 L46 85 M53.4 74.5 L54 85" stroke="${clarte(solide) > 0.75 ? "#9aa6ad" : "#f4f6f7"}" stroke-width=".9" stroke-linecap="round"/><path d="M36 100 L38 92 Q50 89.6 62 92 L64 100" fill="none" stroke="#000" stroke-opacity=".14" stroke-width="1"/>${manches}`, motif: true };
      case "chemise": return { svg: `<path d="${CORPS}" fill="${c}"/><path d="M50 79 V100" stroke="${ombre}" stroke-width="1"/>${[86, 92, 98].map((y) => `<circle cx="51.6" cy="${y}" r=".8" fill="${ombre}"/>`).join("")}<path d="M41 72 L50 79.6 L46.4 84 L39.4 75 Z M59 72 L50 79.6 L53.6 84 L60.6 75 Z" fill="${clair}" stroke="${ombre}" stroke-width=".5"/>${manches}`, motif: true, centre: [40, 91], petit: true };
      case "polo": return { svg: `<path d="${CORPS}" fill="${c}"/><path d="M50 77.6 V86" stroke="${ombre}" stroke-width="1"/><circle cx="51.4" cy="80.6" r=".7" fill="${ombre}"/><circle cx="51.4" cy="84" r=".7" fill="${ombre}"/><path d="M42 72.4 L50 77.8 L45.4 80.6 Z M58 72.4 L50 77.8 L54.6 80.6 Z" fill="${clair}" stroke="${ombre}" stroke-width=".5"/>${manches}`, motif: true, centre: [40, 91], petit: true };
      case "salouva": {
        const fleurs = melange(solide, "#ffffff", 0.6), echarpe = clarte(solide) > 0.6 ? "#b3345e" : "#e9b130";
        return { svg: `<path d="${CORPS}" fill="${peauOmbre}"/><path d="M24 100 C25 90 28 84 31 81 C37 83.5 44 84.5 50 84.5 C56 84.5 63 83.5 69 81 C72 84 75 90 76 100 Z" fill="${c}"/><g fill="${fleurs}">${[[34, 90], [46, 92], [58, 90], [70, 93], [40, 98], [52, 99], [64, 98], [28, 97]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2"/><circle cx="${x + 1.9}" cy="${y}" r=".7"/><circle cx="${x - 1.9}" cy="${y}" r=".7"/><circle cx="${x}" cy="${y + 1.9}" r=".7"/><circle cx="${x}" cy="${y - 1.9}" r=".7"/>`).join("")}</g><path d="M31 81 C37 83.5 44 84.5 50 84.5 C56 84.5 63 83.5 69 81 L68.6 84 C62.8 86.4 56 87.4 50 87.4 C44 87.4 37.2 86.4 31.4 84 Z" fill="${ombre}"/><path d="M26.5 100 C26.5 88 31 78 38.5 73 L44 72.6 C39 78.5 35.4 88 35.4 100 Z" fill="${echarpe}"/><path d="M38.5 73 L44 72.6" stroke="${assombrir(echarpe, 0.8)}" stroke-width=".8"/>`, motif: false };
      }
      case "kandzou": {
        const b = solide;
        return { svg: `<path d="${CORPS}" fill="#f6f3ea"/><path d="M41.6 72 Q50 81 58.4 72" fill="none" stroke="${b}" stroke-width="2.4"/><path d="M50 79.4 V100" stroke="${b}" stroke-width="2.8"/><g fill="#f6f3ea">${[83, 87, 91, 95, 99].map((y) => `<path d="M50 ${y - 1.2} L51 ${y} L50 ${y + 1.2} L49 ${y} Z"/>`).join("")}</g><path d="M28 86 Q29.5 92 28.6 100 M72 86 Q70.5 92 71.4 100" stroke="#d9d3c2" stroke-width="1" fill="none"/>`, motif: false };
      }
      case "veste": return { svg: `<path d="${CORPS}" fill="#f4f6f7"/><path d="M16 100 C16 82 31 72 43 72.4 L46.4 86 L44.4 100 Z" fill="${c}"/><path d="M84 100 C84 82 69 72 57 72.4 L53.6 86 L55.6 100 Z" fill="${c}"/><path d="M43 72.4 L46.4 86 L40.6 79 Z M57 72.4 L53.6 86 L59.4 79 Z" fill="${ombre}"/>${manches}`, motif: true, encre: "#24324a" };
      case "maillot": {
        const contraste = clarte(solide) > 0.6 ? "#24324a" : "#ffffff";
        return { svg: `<path d="${CORPS}" fill="${c}"/><path d="M43 72.2 L50 79 L57 72.2" fill="none" stroke="${contraste}" stroke-width="2"/><path d="M28 80 L33 76 M30.5 82.6 L35.5 78.4 M72 80 L67 76 M69.5 82.6 L64.5 78.4" stroke="${contraste}" stroke-width="1.4" stroke-linecap="round"/>`, motif: true, numero: true };
      }
      case "blouse": return { svg: `<path d="${CORPS}" fill="#f4f6f7" stroke="#c9d3d8" stroke-width="1"/><path d="M50 74 L42 100 M50 74 L58 100" stroke="#c9d3d8" stroke-width="1.2"/><path d="M44 72 L50 82 L56 72" fill="#0a7c76"/><rect x="62" y="86" width="8" height="7" rx="1" fill="none" stroke="#c9d3d8"/><line x1="64" y1="83" x2="64" y2="89" stroke="#1e63b8" stroke-width="1.4"/>`, motif: false };
      case "toge": return { svg: `<path d="${CORPS}" fill="#1d2433"/><path d="M41 73 L45 100 M59 73 L55 100" stroke="#e3b23c" stroke-width="4"/>`, motif: false };
      case "dore": return { svg: `<defs>${degradeLin("h" + u, ["#f6d77a", "#d9a520", "#a97a0c"])}</defs><path d="${CORPS}" fill="url(#h${u})"/><path d="M50 74 L50 100" stroke="#8a6408" stroke-width="1"/>${[82, 89, 96].map((y) => `<circle cx="53" cy="${y}" r="1.2" fill="#fff6d0"/>`).join("")}`, motif: false };
      case "cape": return { svg: `<path d="M12 100 C14 78 30 70 50 70 C70 70 86 78 88 100 Z" fill="#7a1f3d"/><path d="${CORPS}" fill="#24324a"/><path d="M36 74 Q50 82 64 74" stroke="#e3b23c" stroke-width="2.4" fill="none"/><circle cx="50" cy="79" r="3" fill="#e3b23c"/>`, motif: false };
      case "spatiale": return { svg: `<path d="${CORPS}" fill="#eef1f4"/><path d="M38 70.6 Q50 77 62 70.6 L63 74.6 Q50 81 37 74.6 Z" fill="#aab4bd"/><rect x="42" y="84" width="16" height="10" rx="2" fill="#cfd6dc" stroke="#9aa5ae" stroke-width=".6"/><circle cx="46" cy="89" r="1.4" fill="#ef4444"/><circle cx="50" cy="89" r="1.4" fill="#22c55e"/><circle cx="54" cy="89" r="1.4" fill="#3b82f6"/><path d="M27 84 Q29 92 28 100 M73 84 Q71 92 72 100" stroke="#c4ccd3" stroke-width="1.4" fill="none"/>`, motif: false };
      default: return { svg: `<path d="${CORPS}" fill="${c}"/>${col}${manches}`, motif: true };
    }
  }

  function motif(id, couleur, h, u) {
    if (!h.motif || id === "aucun") return h.numero ? `<text x="50" y="94" text-anchor="middle" font-family="Trebuchet MS,system-ui,sans-serif" font-weight="800" font-size="13" fill="${couleur}">7</text>` : "";
    const [cx, cy] = h.centre || [50, 90], s = h.petit ? 0.55 : 1;
    const g = (x) => `<g transform="translate(${cx} ${cy}) scale(${s})">${x}</g>`;
    const txt = (t, taille, extra) => g(`<text x="0" y="${(taille * 0.36).toFixed(1)}" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-weight="700" font-size="${taille}" fill="${couleur}"${extra || ""}>${t}</text>`);
    switch (id) {
      case "rayures": return `<g clip-path="url(#b${u})" stroke="${couleur}" stroke-opacity=".35" stroke-width="2.4">${[80, 86, 92, 98].map((y) => `<line x1="10" y1="${y}" x2="90" y2="${y}"/>`).join("")}</g>`;
      case "coeur": return g(`<path transform="scale(1.3)" d="${COEUR}" fill="${couleur}"/>`);
      case "etoile": return g(`<path transform="scale(.75)" d="${ETOILE}" fill="${couleur}"/>`);
      case "palmier": return g(`<path d="M-1 7 C0 2 1 -2 0.5 -5" stroke="${couleur}" stroke-width="1.6" fill="none" stroke-linecap="round"/><g fill="${couleur}"><path d="M0.5 -5 C-3 -8 -6 -7 -8 -4 C-5 -6 -2 -5.6 0.5 -5 Z"/><path d="M0.5 -5 C4 -8.4 7 -7 8.6 -4 C5.4 -6 2.6 -5.4 0.5 -5 Z"/><path d="M0.5 -5 C-1 -9.4 1.4 -11 4 -10 C1.6 -9 1 -7.4 0.5 -5 Z"/><circle cx="-0.6" cy="-4" r="1.1"/><circle cx="1.5" cy="-4" r="1.1"/></g>`);
      case "pi": return txt("π", 15, ` font-style="italic"`);
      case "sigma": return txt("Σ", 13);
      case "infini": return txt("∞", 17);
      case "racine": return g(`<path d="M-8 1 L-6 0 L-3.4 6 L0 -6 H8" fill="none" stroke="${couleur}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><text x="4" y="4" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="8" fill="${couleur}">x</text>`);
      case "pythagore": return g(`<g fill="none" stroke="${couleur}" stroke-width="1.3" stroke-opacity=".9"><path d="M-7 5 L7 5 L-7 -6 Z"/><rect x="-7" y="5" width="14" height="5"/><rect x="-12" y="-6" width="5" height="11"/></g>`);
      case "repere": return g(`<g stroke="${couleur}" fill="none" stroke-linecap="round"><path d="M-10 6 H10 M-6 9 V-8" stroke-width="1"/><path d="M8.6 4.8 L10 6 L8.6 7.2 M-7.2 -6.6 L-6 -8 L-4.8 -6.6" stroke-width="1"/><path d="M-4.5 -6 Q1 14 6.5 -6" stroke-width="1.5"/></g>`);
      case "integrale": return txt("∫", 17, ` font-style="italic"`);
      case "fractale": {
        const tri = [];
        const f = (x, y, t, n) => { if (!n) { tri.push(`M${x} ${y} l${t / 2} ${-t * 0.866} l${t / 2} ${t * 0.866} Z`); return; } f(x, y, t / 2, n - 1); f(x + t / 2, y, t / 2, n - 1); f(x + t / 4, y - t * 0.433, t / 2, n - 1); };
        f(-9, 7, 18, 2);
        return g(`<path d="${tri.join(" ")}" fill="${couleur}"/>`);
      }
      case "phi": return txt("φ", 15, ` font-style="italic"`);
      case "euler": return g(`<text x="0" y="2" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="7" fill="${couleur}">e<tspan dy="-2.6" font-size="4.6">iπ</tspan><tspan dy="2.6">+1=0</tspan></text>`);
      default: return "";
    }
  }

  /* ---------- Accessoires ---------- */
  function chapeau(id, u) {
    switch (id) {
      case "kofia": return `<path d="M33.6 31.6 L34.2 21.6 C38 18.4 44 17.4 50 17.4 C56 17.4 62 18.4 65.8 21.6 L66.4 31.6 C61 29.8 56 29.2 50 29.2 C44 29.2 39 29.8 33.6 31.6 Z" fill="#f7f2e3" stroke="#d8cba6" stroke-width=".5"/><g fill="#c4a96b">${[21.6, 25, 28.2].map((y, r) => Array.from({ length: 9 }, (_, i) => `<path d="M${36.4 + i * 3.4 + (r % 2) * 1.7} ${y - 1.1} l1 1.1 l-1 1.1 l-1 -1.1 Z"/>`).join("")).join("")}</g><path d="M34 30.6 C39 28.8 44 28.2 50 28.2 C56 28.2 61 28.8 66 30.6" stroke="#c4a96b" stroke-width=".7" fill="none"/>`;
      case "bonnet": return `<path d="M30.4 40 C29.4 20.6 70.6 20.6 69.6 40 Z" fill="#3f6fb5"/><path d="M30.2 40.4 C30 35.2 70 35.2 69.8 40.4 C63 38.6 37 38.6 30.2 40.4 Z" fill="#2f5a99"/><g stroke="#24497f" stroke-width=".6">${[34, 38, 42, 46, 50, 54, 58, 62, 66].map((x) => `<line x1="${x}" y1="36.6" x2="${x}" y2="39.6"/>`).join("")}</g><circle cx="50" cy="19.6" r="4.2" fill="#f4f6f7"/>`;
      case "bandeau": return `<path d="M32.3 34 C36 28.8 64 28.8 67.7 34 L68.3 38 C64 33 36 33 31.7 38 Z" fill="#e2725b"/><path d="M32 36 C36 31 64 31 68 36" stroke="#fff" stroke-width=".9" fill="none"/>`;
      case "noeud": return `<g transform="translate(64 26) rotate(20)"><path d="M0 0 L-7 -4.6 L-7 4.6 Z M0 0 L7 -4.6 L7 4.6 Z" fill="#f472b6" stroke="#db2777" stroke-width=".6" stroke-linejoin="round"/><circle r="2" fill="#db2777"/></g>`;
      case "serretete": return `<path d="M31.6 42 C30 22.6 70 22.6 68.4 42" stroke="#6747c7" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="41" cy="25.6" r="1.4" fill="#fbbf24"/>`;
      case "casquette": return `<path d="M31 40 C31 23 69 23 69 40 Z" fill="#e2725b"/><path d="M50 39 C62 38 76 39 79 42.5 C71 44 59 43 50 42 Z" fill="#c95a44"/><circle cx="50" cy="25.5" r="1.8" fill="#c95a44"/>`;
      case "envers": return `<path d="M31.4 38.6 C31.4 22 68.6 22 68.6 38.6 C62 36 38 36 31.4 38.6 Z" fill="#2f6db5"/><path d="M44.6 37.4 Q50 31.6 55.4 37.4 Z" fill="#24497f"/><path d="M36 26 C42 20.4 58 20.4 64 26 L63 22.6 C57 18 43 18 37 22.6 Z" fill="#24497f"/><circle cx="50" cy="23.6" r="1.6" fill="#24497f"/>`;
      case "bob": return `<path d="M34 34 C34 20 66 20 66 34 Z" fill="#e8d6a2"/><path d="M26.6 38.4 C30 31.6 70 31.6 73.4 38.4 C70 40.6 30 40.6 26.6 38.4 Z" fill="#d6c085"/><path d="M34.2 32 C42 30.4 58 30.4 65.8 32" stroke="#b49b5c" stroke-width="1.2" fill="none"/>`;
      case "fleur": return fleur(66, 30, 1, "#efe27a");
      case "paille": return `<ellipse cx="50" cy="33.6" rx="27" ry="5.6" fill="#e8c77a"/><path d="M37 33.6 C37 19.6 63 19.6 63 33.6 Z" fill="#efd28e"/><path d="M37.2 29.8 C42 31.4 58 31.4 62.8 29.8 L62.9 33 C58 34.6 42 34.6 37.1 33 Z" fill="#e2725b"/><path d="M28 34 Q50 38 72 34 M40 24 Q50 22 60 24" stroke="#c9a24a" stroke-width=".5" fill="none"/>`;
      case "couronnefleurs": return `<path d="M32 33 C38 24 62 24 68 33" stroke="#4c9a4a" stroke-width="1.4" fill="none"/>${[[33.5, 31.6, "#f9a8d4"], [40, 26.6, "#fde68a"], [50, 24.6, "#f9a8d4"], [60, 26.6, "#fde68a"], [66.5, 31.6, "#f9a8d4"]].map(([x, y, col]) => fleur(x, y, 0.5, col, "#f59e0b")).join("")}`;
      case "casque": return `<path d="M30 47 C29 20 71 20 70 47" fill="none" stroke="#24324a" stroke-width="4" stroke-linecap="round"/><rect x="25" y="41" width="9" height="14" rx="4" fill="#e2725b"/><rect x="66" y="41" width="9" height="14" rx="4" fill="#e2725b"/>`;
      case "laurier": return `<g fill="#4c9a4a">${[-60, -40, -20, 0, 20, 40, 60].map((a) => `<ellipse cx="0" cy="-23" rx="2.8" ry="5.5" transform="translate(50 46) rotate(${a}) rotate(${a < 0 ? -30 : 30} 0 -23)"/>`).join("")}</g>`;
      case "hautdeforme": return `<rect x="38" y="4" width="24" height="21" rx="2" fill="#1d2127"/><rect x="38" y="19" width="24" height="3.6" fill="#b3345e"/><ellipse cx="50" cy="25.2" rx="18" ry="3.6" fill="#111418"/>`;
      case "toque": return `<rect x="38" y="25" width="24" height="7" rx="1.5" fill="#1d2433"/><path d="M28 25 L50 17 L72 25 L50 33 Z" fill="#2a3346"/><path d="M50 25 L69 27 L69 37" stroke="#e3b23c" stroke-width="1.4" fill="none"/><circle cx="69" cy="38" r="2" fill="#e3b23c"/>`;
      case "sorcier": return `<path d="M34 28 L55 -2 L66 28 Z" fill="#4c3a9e"/><path d="M55 -2 L66 28 L58 28 Z" fill="#3b2c80"/>${etoile(46, 14, 0.3, `fill="#fde68a"`)}${etoile(58, 20, 0.22, `fill="#fde68a"`)}<text x="51" y="24.6" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="6" fill="#fde68a">π</text><ellipse cx="50" cy="28.4" rx="21" ry="4.2" fill="#3b2c80"/>`;
      case "aureole": return `<ellipse cx="50" cy="16" rx="15" ry="4.2" fill="none" stroke="#f2c94c" stroke-width="2.6"/><text x="50" y="14" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="7" fill="#c98a08">π</text>`;
      case "couronne": return `<defs>${degradeLin("c" + u, ["#fbe08a", "#d9a520"], true)}</defs><path d="M35 30 L37 15 L43.5 23 L50 12 L56.5 23 L63 15 L65 30 Z" fill="url(#c${u})" stroke="#a97a0c" stroke-width="1"/><circle cx="50" cy="25" r="2" fill="#e2725b"/><circle cx="41" cy="27" r="1.4" fill="#2bb3c0"/><circle cx="59" cy="27" r="1.4" fill="#2bb3c0"/>`;
      case "antennes": return `<path d="M43 25 Q40 15 35.6 10.6 M57 25 Q60 15 64.4 10.6" stroke="#3fbf86" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="35.4" cy="10.4" r="4.4" fill="#9ef0b9" opacity=".35"/><circle cx="64.6" cy="10.4" r="4.4" fill="#9ef0b9" opacity=".35"/><circle cx="35.4" cy="10.4" r="2.6" fill="#5ee09a"/><circle cx="64.6" cy="10.4" r="2.6" fill="#5ee09a"/>`;
      default: return "";
    }
  }

  function lunettes(id, u) {
    switch (id) {
      case "rondes": return `<g fill="none" stroke="#2b2b2b" stroke-width="1.5"><circle cx="43" cy="46" r="5.2"/><circle cx="57" cy="46" r="5.2"/><path d="M48.2 46 Q50 44.5 51.8 46 M37.8 45 L33 43.5 M62.2 45 L67 43.5"/></g>`;
      case "carrees": return `<g fill="none" stroke="#2b2b2b" stroke-width="1.5"><rect x="37.4" y="41.8" width="11.2" height="8.6" rx="1.6"/><rect x="51.4" y="41.8" width="11.2" height="8.6" rx="1.6"/><path d="M48.6 45.4 Q50 44.4 51.4 45.4 M37.4 44.6 L33 43.4 M62.6 44.6 L67 43.4"/></g>`;
      case "fines": return `<g fill="none" stroke="#b8893a" stroke-width=".9"><ellipse cx="43" cy="46" rx="5.4" ry="4.4"/><ellipse cx="57" cy="46" rx="5.4" ry="4.4"/><path d="M48.4 45.4 Q50 44 51.6 45.4 M37.6 45 L33 43.6 M62.4 45 L67 43.6"/></g>`;
      case "epaisses": return `<g stroke="#1d2127" stroke-width="2.4"><rect x="37" y="41.6" width="11.8" height="9" rx="2.6" fill="#bfe3f5" fill-opacity=".18"/><rect x="51.2" y="41.6" width="11.8" height="9" rx="2.6" fill="#bfe3f5" fill-opacity=".18"/><path d="M48.8 45 L51.2 45 M37 44.4 L33 43.2 M63 44.4 L67 43.2" fill="none"/></g>`;
      case "soleil": return `<g fill="#1b1f24"><rect x="36.5" y="42" width="12" height="8" rx="3"/><rect x="51.5" y="42" width="12" height="8" rx="3"/></g><path d="M48.5 45 L51.5 45 M36.5 44 L32.5 42.5 M63.5 44 L67.5 42.5" stroke="#1b1f24" stroke-width="1.5"/><path d="M38.5 44 L42 44" stroke="#fff" stroke-opacity=".5" stroke-width="1.2"/>`;
      case "plongee": return `<path d="M35 45 L30.6 44 M65 45 L69.4 44" stroke="#2bb3c0" stroke-width="2.4" stroke-linecap="round"/><rect x="35" y="40.4" width="30" height="11.2" rx="5.2" fill="#bfe8f5" fill-opacity=".5" stroke="#2bb3c0" stroke-width="1.8"/><path d="M38 43 Q40 41.8 43 42" stroke="#fff" stroke-width="1" fill="none" stroke-linecap="round"/><path d="M66.6 49 L71.4 46.4 L71.4 22" stroke="#f2b705" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="69.6" y="19" width="3.6" height="4" rx="1" fill="#e2725b"/>`;
      case "aviateur": return `<defs>${degradeLin("l" + u, ["#2c3e50", "#7d93a8"], true)}</defs><g stroke="#c9a24a" stroke-width=".9"><path d="M37.2 42.4 L48.6 42.4 Q49 50 43.4 50.8 Q37.2 50.8 37.2 42.4 Z" fill="url(#l${u})"/><path d="M62.8 42.4 L51.4 42.4 Q51 50 56.6 50.8 Q62.8 50.8 62.8 42.4 Z" fill="url(#l${u})"/><path d="M48.6 43 L51.4 43 M48.8 44.8 L51.2 44.8 M37.2 43 L33 42.2 M62.8 43 L67 42.2" fill="none"/></g>`;
      case "troisd": return `<g stroke="#f4f6f7" stroke-width="1.6"><rect x="37" y="42" width="12" height="8.4" rx="1" fill="#ef4444" fill-opacity=".72"/><rect x="51" y="42" width="12" height="8.4" rx="1" fill="#22d3ee" fill-opacity=".72"/><path d="M49 45 L51 45 M37 44.4 L33 43 M63 44.4 L67 43" fill="none"/></g>`;
      case "coeur": return `<g stroke="#be185d" stroke-width=".9"><path transform="translate(43 47.2) scale(1.25)" d="${COEUR}" fill="#f472b6" fill-opacity=".88"/><path transform="translate(57 47.2) scale(1.25)" d="${COEUR}" fill="#f472b6" fill-opacity=".88"/><path d="M48 44.6 Q50 43.6 52 44.6 M38 44 L33 43 M62 44 L67 43" fill="none"/></g>`;
      case "etoile": return etoile(43, 46.4, 0.66, `fill="#fcd34d" fill-opacity=".9" stroke="#b45309" stroke-width="1.3"`) + etoile(57, 46.4, 0.66, `fill="#fcd34d" fill-opacity=".9" stroke="#b45309" stroke-width="1.3"`) + `<path d="M48.6 45 Q50 44.2 51.4 45 M37.4 44.4 L33 43 M62.6 44.4 L67 43" stroke="#b45309" stroke-width=".9" fill="none"/>`;
      case "monocle": return `<circle cx="57" cy="46" r="5.4" fill="#fff" fill-opacity=".14" stroke="#c9a24a" stroke-width="1.3"/><path d="M61.4 49 Q66 57 62.6 66" stroke="#c9a24a" stroke-width=".7" stroke-dasharray="1 .8" fill="none"/>`;
      case "visiere": return `<path d="M32.6 42.2 Q50 38.4 67.4 42.2 L66.8 49.4 Q50 52 33.2 49.4 Z" fill="#22d3ee" fill-opacity=".22" stroke="#22d3ee" stroke-opacity=".35" stroke-width="3"/><path d="M32.6 42.2 Q50 38.4 67.4 42.2 L66.8 49.4 Q50 52 33.2 49.4 Z" fill="#22d3ee" fill-opacity=".45" stroke="#a5f3fc" stroke-width=".8"/><path d="M36 43 Q46 41 56 41.6" stroke="#fff" stroke-opacity=".8" stroke-width=".8" fill="none" stroke-linecap="round"/>`;
      default: return "";
    }
  }

  function boucles(id, gauche, droite) {
    const deux = (f) => f(gauche) + f(droite);
    switch (id) {
      case "puces": return deux((x) => `<circle cx="${x}" cy="51.2" r="1.05" fill="#e3b23c"/>`);
      case "anneaux": return deux((x) => `<circle cx="${x}" cy="53.4" r="2.3" fill="none" stroke="#e3b23c" stroke-width=".9"/>`);
      case "perles": return deux((x) => `<circle cx="${x}" cy="52" r="1.45" fill="#f8f4ea" stroke="#cfc5ad" stroke-width=".4"/>`);
      case "pendants": return deux((x) => `<path d="M${x} 51 V54.6" stroke="#e3b23c" stroke-width=".6"/><ellipse cx="${x}" cy="56.2" rx="1.2" ry="1.7" fill="#2bb3c0"/>`);
      case "etoiles": return deux((x) => etoile(x, 53, 0.24, `fill="#f2b705" stroke="#b07d00" stroke-width="1.2"`));
      default: return "";
    }
  }

  /* ---------- Cadre (suit la forme du médaillon) ---------- */
  function cadre(id, d, u) {
    const anneau = (stroke, w, extra) => `<path d="${d}" transform="translate(50 50) scale(${((48 - w / 2) / 48).toFixed(4)}) translate(-50 -50)" fill="none" stroke="${stroke}" stroke-width="${(w * 48 / (48 - w / 2)).toFixed(2)}" stroke-linejoin="round"${extra || ""}/>`;
    const deg = (couleurs) => `<defs>${degradeLin("k" + u, couleurs)}</defs>`;
    const autour = (f, n, r) => Array.from({ length: n }, (_, k) => f(k, (k / n) * 360)).join("");
    switch (id) {
      case "bronze": return anneau("#b87333", 4);
      case "argent": return anneau("#aab8c2", 4) + anneau("#e8eef2", 1);
      case "or": return anneau("#e3b23c", 4.5) + anneau("#fff1b8", 1);
      case "fleurs": return anneau("#5fbf9b", 3.4) + autour((k, a) => `<g transform="rotate(${a} 50 50)">${fleur(50, 3.6, 0.42, k % 2 ? "#fde68a" : "#f9a8d4", "#f59e0b")}</g>`, 8);
      case "lagon": return deg(["#3cc2b6", "#1e63b8"]) + anneau(`url(#k${u})`, 5);
      case "arcenciel": return deg(["#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7"]) + anneau(`url(#k${u})`, 5);
      case "legende": return deg(["#fff1b8", "#e3b23c", "#a97a0c"]) + anneau(`url(#k${u})`, 6) + autour((k, a) => `<path transform="rotate(${a} 50 50) translate(50 3.5) scale(.32)" d="${ETOILE}" fill="#fff6d0" stroke="#a97a0c" stroke-width="1.5"/>`, 4);
      case "neon": return anneau("#22d3ee", 7, ` opacity=".25"`) + anneau("#67e8f9", 2.4) + anneau("#f0abfc", 0.8);
      case "diamant": return deg(["#ffffff", "#a5d8ff", "#e0f2fe", "#7dd3fc", "#ffffff"]) + anneau(`url(#k${u})`, 5.4) + autour((k, a) => `<path transform="rotate(${a} 50 50) translate(50 3.2)" d="M0 -2.6 L2 0 L0 2.6 L-2 0 Z" fill="#fff" stroke="#38bdf8" stroke-width=".5"/>`, 6);
      case "cosmos": return deg(["#1e1b4b", "#7c3aed", "#db2777", "#1e1b4b"]) + anneau(`url(#k${u})`, 6) + autour((k, a) => `<circle transform="rotate(${a} 50 50)" cx="50" cy="${k % 2 ? 2.8 : 3.4}" r="${k % 3 ? 0.6 : 1}" fill="#fff"/>`, 14);
      default: return anneau("rgba(19,40,44,.12)", 2);
    }
  }

  /* ---------- Compagnons (dessinés, sans émoji) ---------- */
  function compagnon(id) {
    switch (id) {
      case "maki": return `<circle cx="-6.4" cy="-5.6" r="2.8" fill="#7a5c43"/><circle cx="6.4" cy="-5.6" r="2.8" fill="#7a5c43"/><ellipse cx="0" cy="1" rx="8.6" ry="7.6" fill="#8b6b4e"/><ellipse cx="-6.4" cy="3.4" rx="3" ry="3.6" fill="#c7a17c"/><ellipse cx="6.4" cy="3.4" rx="3" ry="3.6" fill="#c7a17c"/><path d="M-4.8 -1.2 Q0 -4.6 4.8 -1.2 L2.6 6 Q0 7.6 -2.6 6 Z" fill="#3a2a1f"/><circle cx="-2.6" cy="0.2" r="1.9" fill="#f59e0b"/><circle cx="2.6" cy="0.2" r="1.9" fill="#f59e0b"/><circle cx="-2.6" cy="0.3" r=".9" fill="#111"/><circle cx="2.6" cy="0.3" r=".9" fill="#111"/><circle cx="-2.1" cy="-.3" r=".4" fill="#fff"/><circle cx="3.1" cy="-.3" r=".4" fill="#fff"/><ellipse cx="0" cy="4.4" rx="1.1" ry=".8" fill="#111"/>`;
      case "tortue": return `<ellipse cx="-5.6" cy="5.4" rx="2.6" ry="1.6" fill="#7cc47f" transform="rotate(30 -5.6 5.4)"/><ellipse cx="4.6" cy="6" rx="2.6" ry="1.6" fill="#7cc47f" transform="rotate(-30 4.6 6)"/><ellipse cx="-6" cy="-4" rx="2.8" ry="1.6" fill="#7cc47f" transform="rotate(-30 -6 -4)"/><circle cx="8.2" cy="-1.6" r="3.1" fill="#7cc47f"/><circle cx="9.2" cy="-2.4" r=".7" fill="#111"/><ellipse cx="-0.6" cy="0.6" rx="7.8" ry="6.2" fill="#3f8f5a"/><path d="M-0.6 -3.4 L2.6 -1.4 L2.6 2.4 L-0.6 4.4 L-3.8 2.4 L-3.8 -1.4 Z M-0.6 -3.4 V-5.6 M2.6 -1.4 L5.8 -2.6 M2.6 2.4 L5.8 3.6 M-3.8 2.4 L-7 3.6 M-3.8 -1.4 L-7 -2.6 M-0.6 4.4 V6.6" fill="none" stroke="#a7d9a0" stroke-width=".7"/>`;
      case "chat": return `<path d="M-7.4 -2 L-6.6 -9.4 L-1.6 -5.6 Z M7.4 -2 L6.6 -9.4 L1.6 -5.6 Z" fill="#f2a65a"/><path d="M-6 -3.6 L-5.8 -7.4 L-3.2 -5.4 Z M6 -3.6 L5.8 -7.4 L3.2 -5.4 Z" fill="#f9c9d0"/><circle cx="0" cy="1" r="7.8" fill="#f2a65a"/><path d="M-2.6 -6.4 L-1.8 -3.6 M0 -6.8 V-3.8 M2.6 -6.4 L1.8 -3.6" stroke="#d9823a" stroke-width=".9" stroke-linecap="round"/><ellipse cx="-2.8" cy="0.6" rx="1.4" ry="1.8" fill="#3f8f5a"/><ellipse cx="2.8" cy="0.6" rx="1.4" ry="1.8" fill="#3f8f5a"/><ellipse cx="-2.8" cy="0.7" rx=".5" ry="1.4" fill="#111"/><ellipse cx="2.8" cy="0.7" rx=".5" ry="1.4" fill="#111"/><path d="M-.9 3.4 L.9 3.4 L0 4.4 Z" fill="#f472b6"/><path d="M0 4.4 Q-1 5.6 -2 5 M0 4.4 Q1 5.6 2 5 M-3.4 3.8 L-8.4 3 M-3.4 4.8 L-8.2 5.4 M3.4 3.8 L8.4 3 M3.4 4.8 L8.2 5.4" stroke="#7a4a2c" stroke-width=".45" fill="none" stroke-linecap="round"/>`;
      case "poisson": return `<path d="M5.6 0 L10.6 -5 L10.6 5 Z" fill="#f97316" stroke="#1b1f24" stroke-width=".5"/><ellipse cx="-1" cy="0" rx="8" ry="5.4" fill="#f97316" stroke="#1b1f24" stroke-width=".5"/><path d="M-4.6 -5 Q-2.6 0 -4.6 5 L-2.4 5.2 Q-0.4 0 -2.4 -5.2 Z M2 -5 Q3.6 0 2 5 L3.8 4.4 Q5.2 0 3.8 -4.4 Z" fill="#fff" stroke="#1b1f24" stroke-width=".5"/><path d="M-1 -5.2 Q1 -8.4 3.4 -4.8" fill="#f97316" stroke="#1b1f24" stroke-width=".5"/><circle cx="-6.2" cy="-1" r="1.2" fill="#fff"/><circle cx="-6.4" cy="-1" r=".65" fill="#111"/>`;
      case "roussette": return `<path d="M-2 -1 L-11 -5 L-9.6 -1 L-11.4 1.6 L-8 1.4 L-7.4 4.6 L-4.4 2.4 L-2 4.6 Z M2 -1 L11 -5 L9.6 -1 L11.4 1.6 L8 1.4 L7.4 4.6 L4.4 2.4 L2 4.6 Z" fill="#5a3a2a"/><path d="M-3.6 -5.4 L-4 -9.4 L-1.2 -6.6 Z M3.6 -5.4 L4 -9.4 L1.2 -6.6 Z" fill="#8a5a36"/><ellipse cx="0" cy="-2" rx="4.4" ry="4.8" fill="#b2733d"/><path d="M-1.6 1 Q0 3.6 1.6 1 L0 4.2 Z" fill="#8a5a36"/><circle cx="-1.6" cy="-2.6" r="1" fill="#111"/><circle cx="1.6" cy="-2.6" r="1" fill="#111"/><circle cx="-1.3" cy="-2.9" r=".3" fill="#fff"/><circle cx="1.9" cy="-2.9" r=".3" fill="#fff"/><ellipse cx="0" cy="1.4" rx=".8" ry=".5" fill="#2a1a12"/>`;
      case "dauphin": return `<path d="M-9 4 C-6 -6 4 -8 9 -2 C6 -3 3 -2 1 0 C-2 2 -5 5 -9 4 Z" fill="#5b8db8"/><path d="M-7.6 3.4 C-4 2.6 -1 1.2 1.4 -0.4 C-2 3 -5 4.4 -7.6 3.4 Z" fill="#cfe3f2"/><path d="M-1 -5.4 L1 -9.4 L2.6 -5 Z" fill="#4a77a0"/><path d="M-9 4 L-11.4 1.4 M-9 4 L-11 6.6" stroke="#4a77a0" stroke-width="1.8" stroke-linecap="round"/><path d="M9 -2 L11 -1.6" stroke="#4a77a0" stroke-width="1.4" stroke-linecap="round"/><circle cx="5.6" cy="-3.6" r=".7" fill="#111"/>`;
      case "baleine": return `<path d="M-10 2 C-10 -5 2 -7 8 -2 C10 0 10 4 6 5.6 C1 7.4 -10 7 -10 2 Z" fill="#2c4a6e"/><path d="M-8 4.4 C-2 6.6 3 6.4 6.6 5 C3 7.8 -5 7.8 -8 4.4 Z" fill="#e6eef5"/><path d="M-6 5.4 L-5.6 6.8 M-3 5.9 L-2.8 7.2 M0 6 L0 7.2 M3 5.6 L3 6.8" stroke="#2c4a6e" stroke-width=".4"/><path d="M-10 1 L-12.4 -2.4 L-11 1.4 L-12.6 4 Z" fill="#2c4a6e"/><circle cx="3.6" cy="-0.6" r=".7" fill="#fff"/><path d="M2 -6 Q1 -9 -1 -10 M2 -6 Q3 -9 5 -10" stroke="#7cc4ec" stroke-width="1" fill="none" stroke-linecap="round"/>`;
      case "hibou": return `<path d="M-6.4 -6 L-5 -9.6 L-2.6 -6.4 Z M6.4 -6 L5 -9.6 L2.6 -6.4 Z" fill="#7a5233"/><ellipse cx="0" cy="1" rx="7.6" ry="8.4" fill="#9a6a42"/><ellipse cx="0" cy="4" rx="4.6" ry="4.6" fill="#d9b48a"/><circle cx="-3" cy="-1.6" r="2.9" fill="#fff"/><circle cx="3" cy="-1.6" r="2.9" fill="#fff"/><circle cx="-3" cy="-1.6" r="1.6" fill="#f59e0b"/><circle cx="3" cy="-1.6" r="1.6" fill="#f59e0b"/><circle cx="-3" cy="-1.6" r=".8" fill="#111"/><circle cx="3" cy="-1.6" r=".8" fill="#111"/><path d="M-1 0.6 L1 0.6 L0 2.6 Z" fill="#e2a03a"/><path d="M-2 4 l1 1 l1 -1 l1 1 l1 -1" stroke="#9a6a42" stroke-width=".5" fill="none"/>`;
      case "dragon": return `<path d="M-5 -6 L-7.4 -10.6 L-2.6 -7.2 Z M3 -6.6 L4.6 -11 L6.4 -6 Z" fill="#fbbf24"/><path d="M-8 -1 C-8 -7 2 -9 6 -4 L10 -2 C11 1 9 3.6 6 3.4 L4 3.4 C2 7 -7 7 -8 -1 Z" fill="#3fae6a"/><path d="M-6.4 2.6 C-4 4.6 0 4.6 3 3.4" stroke="#bbf7d0" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="1.4" cy="-3" r="1.5" fill="#fff"/><ellipse cx="1.7" cy="-3" rx=".6" ry="1.1" fill="#111"/><circle cx="8.4" cy="-1.2" r=".5" fill="#14532d"/><path d="M-8 -1 L-10.6 -3 L-9.4 0 L-11 2 Z" fill="#2f8f55"/>`;
      case "robot": return `<line x1="0" y1="-7.6" x2="0" y2="-10.2" stroke="#8a96a3" stroke-width="1"/><circle cx="0" cy="-10.6" r="1.4" fill="#ef4444"/><rect x="-7.6" y="-7.6" width="15.2" height="13.4" rx="3.6" fill="#cfd6dc" stroke="#8a96a3" stroke-width=".7"/><rect x="-5.6" y="-5" width="11.2" height="6" rx="2" fill="#1d2127"/><circle cx="-2.6" cy="-2" r="1.3" fill="#22d3ee"/><circle cx="2.6" cy="-2" r="1.3" fill="#22d3ee"/><path d="M-3 3 H3" stroke="#8a96a3" stroke-width=".9" stroke-dasharray="1 .6"/><rect x="-9.4" y="-3" width="1.8" height="4" rx=".6" fill="#8a96a3"/><rect x="7.6" y="-3" width="1.8" height="4" rx=".6" fill="#8a96a3"/>`;
      default: return "";
    }
  }

  /* ---------- Dessin complet ---------- */
  let compteur = 0; // identifiants uniques pour les dégradés (plusieurs avatars sur une page)
  // av doit déjà être normalisé ; o.anime : animations (grand aperçu) ; o.zoom : partie montrée (vignettes)
  function dessin(av, taille, titre, o) {
    o = o || {};
    const u = "av" + (++compteur);
    const peau = element("peau", av.peau).couleur;
    const forme = FORMES[av.forme] || FORMES.ovale;
    const cc = element("couleurCheveux", av.couleurCheveux), meche = element("meches", av.meches);
    const solideCh = cc.couleur;
    let defs = `<clipPath id="r${u}"><path d="${contour(av.medaillon)}"/></clipPath><clipPath id="v${u}"><path d="${forme.d}"/></clipPath><clipPath id="b${u}"><path d="${CORPS}"/></clipPath>`;
    let peintureCh = solideCh;
    if (cc.degrade || (meche && meche.couleur)) {
      const stops = cc.degrade ? cc.degrade.slice() : [solideCh, solideCh];
      if (meche && meche.couleur) stops.push(meche.couleur);
      defs += degradeLin("c" + u, stops, true);
      peintureCh = `url(#c${u})`;
    }
    const ch = element("couleurHaut", av.couleurHaut), solideHt = ch.couleur;
    let peintureHt = solideHt;
    if (ch.degrade) { defs += degradeLin("t" + u, ch.degrade); peintureHt = `url(#t${u})`; }
    const sourc = clarte(solideCh) > 0.62 ? assombrir(solideCh, 0.72) : assombrir(solideCh, 0.9);
    const foulard = av.cheveux === "foulard" || av.cheveux === "kishali";
    const hair = cheveux(av.cheveux, peintureCh, { s: solideCh, fonce: clarte(solideCh) < 0.2 ? melange(solideCh, "#ffffff", 0.35) : assombrir(solideCh, 0.6), peau, tissu: solideHt });
    const h = haut(av.haut, peintureHt, solideHt, peau, u);
    const encreMotif = h.encre || (ch.degrade || clarte(solideHt) < 0.62 ? "#ffffff" : "#1d2127");
    const vol = VOLUME[av.cheveux] || 0;
    const hat = chapeau(av.accessoire, u);
    const chapeauDessin = hat && vol ? `<g transform="translate(0 ${(-vol * 0.55).toFixed(2)}) translate(50 30) scale(${(1 + vol / 70).toFixed(3)}) translate(-50 -30)">${hat}</g>` : hat;
    const ox = forme.o, oreille = (x) => `<circle cx="${x}" cy="47" r="4" fill="${peau}"/><path d="M${x + (x < 50 ? 1.2 : -1.2)} 45 q${x < 50 ? -1.6 : 1.6} 2 0 4" stroke="${assombrir(peau, 0.8)}" stroke-width=".7" fill="none"/>`;
    const label = titre ? `role="img" aria-label="${String(titre).replace(/"/g, "&quot;")}"` : `aria-hidden="true"`;
    const vb = o.zoom || "0 0 100 100";
    const yeuxSvg = yeux(av.yeux, element("couleurYeux", av.couleurYeux).couleur, peau);
    return `<svg class="avatar${o.anime ? " anime" : ""}" viewBox="${vb}" width="${taille}" height="${taille}" ${label} focusable="false"><defs>${defs}</defs>` +
      `<g clip-path="url(#r${u})">${fond(av.fond, u)}${effet(av.effet, u)}` +
      `<g class="av-tete-der">${hair.der}</g>${h.svg}${motif(av.motif, encreMotif, h, u)}` +
      `<rect x="44" y="58" width="12" height="15" rx="4" fill="${assombrir(peau, 0.82)}"/>` +
      `<g class="av-tete">${foulard ? "" : oreille(ox) + oreille(100 - ox) + boucles(av.boucles, ox, 100 - ox)}` +
      `<path d="${forme.d}" fill="${peau}"/><circle cx="39" cy="52" r="3" fill="#ff7a7a" opacity=".16"/><circle cx="61" cy="52" r="3" fill="#ff7a7a" opacity=".16"/>` +
      details(av.details, peau) + nez(av.nez, peau) + bouche(av.bouche, peau) + barbe(av.barbe, solideCh, u) +
      `<g${o.anime && CLIGNE.includes(av.yeux) ? ` class="av-yeux"` : ""}>${yeuxSvg}</g>` + sourcils(av.sourcils, sourc) +
      hair.dev + lunettes(av.lunettes, u) + chapeauDessin + `</g></g>` +
      cadre(av.cadre, contour(av.medaillon), u) +
      (av.compagnon && av.compagnon !== "aucun" ? `<g class="av-compagnon"><circle cx="82" cy="82" r="13" fill="#fff" stroke="rgba(19,40,44,.15)"/><g transform="translate(82 82)">${compagnon(av.compagnon)}</g></g>` : "") +
      `</svg>`;
  }

  window.PM_AVATAR_DESSIN = dessin;
})();
