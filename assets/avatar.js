/*
  Niveaux, rangs et avatar de l'élève.
  Les réglages (XP par niveau, rangs, récompenses) sont dans data/niveaux.js ;
  ce fichier calcule le niveau et dessine l'avatar en SVG (aucune image à télécharger).
*/
(function () {
  "use strict";
  const N = window.NIVEAUX;
  const A = N.avatar;

  /* ---------- Niveaux et rangs ---------- */
  // XP total pour atteindre le niveau n : chaque niveau coûte un peu plus que le précédent
  const xpPour = (n) => N.xpPremierNiveau * (n - 1) + N.hausseParNiveau * (n - 1) * (n - 2) / 2;
  const NIV_MAX = 999;
  function niveau(xp) {
    xp = Number.isFinite(+xp) ? Math.max(0, Math.floor(+xp)) : 0;
    xp = Math.min(xp, xpPour(NIV_MAX + 1) - 1);
    // Résolution directe de xpPour(n) ≤ xp (second degré en m = n − 1), puis ajustement
    const P = N.xpPremierNiveau, H = N.hausseParNiveau, B = P - H / 2;
    let n = H > 0 ? 1 + Math.floor((-B + Math.sqrt(B * B + 2 * H * xp)) / H) : 1 + Math.floor(xp / P);
    n = Math.max(1, Math.min(NIV_MAX, n || 1));
    while (n > 1 && xpPour(n) > xp) n--;
    while (n < NIV_MAX && xpPour(n + 1) <= xp) n++;
    const debut = xpPour(n), fin = xpPour(n + 1);
    return { niveau: n, rang: rang(n), xp, dans: xp - debut, besoin: fin - debut, reste: fin - xp };
  }
  function rang(n) {
    let r = N.rangs[0];
    N.rangs.forEach((x) => { if (n >= x.des) r = x; });
    return r.nom;
  }

  /* ---------- Éléments d'avatar ---------- */
  const CATEGORIES = [
    { id: "peau", nom: "Teint" },
    { id: "cheveux", nom: "Coiffure" },
    { id: "couleurCheveux", nom: "Couleur des cheveux" },
    { id: "visage", nom: "Expression" },
    { id: "haut", nom: "Haut" },
    { id: "accessoire", nom: "Accessoire" },
    { id: "fond", nom: "Fond" },
    { id: "cadre", nom: "Cadre" },
    { id: "compagnon", nom: "Compagnon" }
  ];
  const DEFAUT = { peau: "p3", cheveux: "court", couleurCheveux: "noir", visage: "sourire", haut: "lagon", accessoire: "aucun", fond: "lagon", cadre: "simple", compagnon: "aucun" };
  const element = (cat, id) => (A[cat] || []).find((e) => e.id === id);
  const debloque = (e, niv) => !e.niveau || niv >= e.niveau;
  // Avatar valide pour ce niveau : un élément inconnu ou pas encore débloqué reprend la valeur de départ
  function normaliser(av, niv) {
    const out = {};
    CATEGORIES.forEach(({ id }) => {
      const e = element(id, av && av[id]);
      out[id] = e && debloque(e, niv) ? e.id : DEFAUT[id];
    });
    return out;
  }
  // Récompenses débloquées exactement à ce niveau
  function recompenses(n) {
    const r = [];
    CATEGORIES.forEach((c) => (A[c.id] || []).forEach((e) => { if (e.niveau === n) r.push({ cat: c.id, categorie: c.nom, id: e.id, nom: e.nom }); }));
    return r;
  }
  // Prochain niveau qui débloque quelque chose
  function prochaine(n) {
    let m = Infinity;
    CATEGORIES.forEach((c) => (A[c.id] || []).forEach((e) => { if (e.niveau > n && e.niveau < m) m = e.niveau; }));
    return m === Infinity ? null : { niveau: m, recompenses: recompenses(m) };
  }

  /* ---------- Dessin ---------- */
  let compteur = 0; // identifiants uniques pour les dégradés (plusieurs avatars sur une page)
  const PEAU_OMBRE = 0.82;
  function assombrir(hex, f) {
    const v = parseInt(hex.slice(1), 16);
    const c = [(v >> 16) & 255, (v >> 8) & 255, v & 255].map((x) => Math.round(x * f));
    return "#" + c.map((x) => x.toString(16).padStart(2, "0")).join("");
  }

  function fond(id, u) {
    switch (id) {
      case "sable": return `<rect width="100" height="100" fill="#f3e3c3"/><circle cx="20" cy="80" r="2" fill="#e6cf9f"/><circle cx="78" cy="22" r="2.5" fill="#e6cf9f"/><circle cx="85" cy="70" r="1.6" fill="#e6cf9f"/>`;
      case "ciel": return `<rect width="100" height="100" fill="#bfe3f5"/><ellipse cx="22" cy="24" rx="12" ry="5" fill="#fff" opacity=".8"/><ellipse cx="80" cy="16" rx="9" ry="4" fill="#fff" opacity=".7"/>`;
      case "corail": return `<rect width="100" height="100" fill="#f8c9bd"/><path d="M12 100 V82 M12 88 l-6 -6 M12 90 l6 -7 M88 100 V80 M88 86 l6 -6 M88 90 l-6 -5" stroke="#ef8f78" stroke-width="3" stroke-linecap="round" fill="none"/>`;
      case "grille": return `<rect width="100" height="100" fill="#eef5f4"/><g stroke="#0a7c76" stroke-opacity=".18" stroke-width=".8">${[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="100"/><line x1="0" y1="${x}" x2="100" y2="${x}"/>`).join("")}</g><path d="M6 30 Q20 4 34 30" stroke="#c98a08" stroke-width="1.6" fill="none" opacity=".7"/>`;
      case "vagues": return `<rect width="100" height="100" fill="#4fb6c9"/><g fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="2.2" stroke-linecap="round">${[18, 34, 86].map((y) => `<path d="M0 ${y} q8 -6 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0"/>`).join("")}</g>`;
      case "nuit": return `<rect width="100" height="100" fill="#14203a"/>${[[15, 20], [30, 10], [80, 14], [88, 34], [12, 48], [70, 26], [22, 72], [86, 66]].map(([x, y], k) => `<circle cx="${x}" cy="${y}" r="${k % 3 ? 0.9 : 1.5}" fill="#fff" opacity=".85"/>`).join("")}<circle cx="78" cy="22" r="7" fill="#f6e7a6"/><circle cx="81" cy="20" r="6" fill="#14203a"/>`;
      case "coucher": return `<defs><linearGradient id="g${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b4aa8"/><stop offset=".55" stop-color="#f08a5d"/><stop offset="1" stop-color="#f9c46b"/></linearGradient></defs><rect width="100" height="100" fill="url(#g${u})"/><circle cx="50" cy="66" r="16" fill="#ffd27a" opacity=".9"/><rect y="70" width="100" height="30" fill="#2e6f8e" opacity=".85"/>`;
      case "galaxie": return `<defs><radialGradient id="g${u}" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#8b5cf6"/><stop offset=".5" stop-color="#3b1d6e"/><stop offset="1" stop-color="#120b2a"/></radialGradient></defs><rect width="100" height="100" fill="url(#g${u})"/>${[[12, 18], [26, 40], [84, 20], [76, 44], [16, 66], [90, 76], [60, 12], [40, 8]].map(([x, y], k) => `<circle cx="${x}" cy="${y}" r="${k % 2 ? 0.8 : 1.4}" fill="#fff"/>`).join("")}<ellipse cx="50" cy="30" rx="40" ry="6" fill="#f0abfc" opacity=".18" transform="rotate(-18 50 30)"/>`;
      case "ylang": return `<defs><linearGradient id="g${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbe6a2"/><stop offset="1" stop-color="#e3b23c"/></linearGradient></defs><rect width="100" height="100" fill="url(#g${u})"/>${[[16, 20], [84, 26], [14, 74], [88, 80]].map(([x, y]) => fleur(x, y, 0.8, "#fff7cc")).join("")}`;
      default: return `<defs><linearGradient id="g${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7fd6cd"/><stop offset="1" stop-color="#2a8fb8"/></linearGradient></defs><rect width="100" height="100" fill="url(#g${u})"/>`;
    }
  }
  function fleur(x, y, s, c) {
    return `<g transform="translate(${x} ${y}) scale(${s})">${[0, 72, 144, 216, 288].map((r) => `<ellipse cx="0" cy="-5" rx="2.6" ry="5.5" fill="${c}" transform="rotate(${r})"/>`).join("")}<circle r="1.8" fill="#c98a08"/></g>`;
  }

  // Cheveux : une partie derrière la tête, une partie devant
  function cheveux(id, c, haut) {
    const cap = `<path d="M31 46 C29 26 40 20 50 20 C60 20 71 26 69 46 C67 36 60 31 50 31 C40 31 33 36 31 46 Z" fill="${c}"/>`;
    switch (id) {
      case "ras": return { der: "", dev: `<path d="M33 40 C33 27 42 24 50 24 C58 24 67 27 67 40 C63 33 57 31 50 31 C43 31 37 33 33 40 Z" fill="${c}" opacity=".9"/>` };
      case "boucles": return {
        der: [[35, 33, 9], [43, 25, 9], [54, 24, 9], [63, 29, 9], [68, 39, 7], [32, 41, 7]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join(""),
        dev: [[40, 30, 5.5], [49, 28, 5.5], [58, 30, 5.5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join("")
      };
      case "tresses": return {
        der: `<g fill="${c}"><rect x="27" y="40" width="7" height="30" rx="3.5"/><rect x="66" y="40" width="7" height="30" rx="3.5"/></g><g stroke="#000" stroke-opacity=".25" stroke-width=".8">${[48, 55, 62].map((y) => `<line x1="27" y1="${y}" x2="34" y2="${y + 2}"/><line x1="66" y1="${y}" x2="73" y2="${y + 2}"/>`).join("")}</g>`,
        dev: cap
      };
      case "long": return { der: `<path d="M29 46 C27 22 40 19 50 19 C60 19 73 22 71 46 L73 74 C64 78 36 78 27 74 Z" fill="${c}"/>`, dev: cap };
      case "chignon": return { der: `<circle cx="50" cy="19" r="8.5" fill="${c}"/>`, dev: cap };
      case "foulard": return {
        der: `<path d="M27 50 C26 24 38 20 50 20 C62 20 74 24 73 50 C74 62 70 70 62 74 L38 74 C30 70 26 62 27 50 Z" fill="${haut}"/>`,
        dev: `<path d="M30 44 C30 27 40 22 50 22 C60 22 70 27 70 44 C67 34 60 30 50 30 C40 30 33 34 30 44 Z" fill="${haut}"/><path d="M30 44 C33 33 41 30 50 30 C59 30 67 33 70 44" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.2"/>`
      };
      default: return { der: "", dev: cap + `<path d="M38 31 C43 35 48 35 54 32" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/>` };
    }
  }

  function visage(id) {
    const encre = "#2b1d16";
    const joues = `<circle cx="39" cy="52" r="3" fill="#ff7a7a" opacity=".22"/><circle cx="61" cy="52" r="3" fill="#ff7a7a" opacity=".22"/>`;
    const sourire = `<path d="M44 54 Q50 59 56 54" stroke="${encre}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
    switch (id) {
      case "content": return joues + `<path d="M40 47 Q43 43 46 47 M54 47 Q57 43 60 47" stroke="${encre}" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M43 52 Q50 61 57 52 Z" fill="${encre}"/><path d="M46 56.5 Q50 58.5 54 56.5" fill="#e86a6a"/>`;
      case "concentre": return `<circle cx="43" cy="46" r="2" fill="${encre}"/><circle cx="57" cy="46" r="2" fill="${encre}"/><path d="M39 41 L46 42.5 M61 41 L54 42.5" stroke="${encre}" stroke-width="1.6" stroke-linecap="round"/><path d="M46 55 L54 55" stroke="${encre}" stroke-width="1.8" stroke-linecap="round"/>`;
      case "clin": return joues + `<circle cx="43" cy="46" r="2" fill="${encre}"/><path d="M54 46 Q57 48.5 60 46" stroke="${encre}" stroke-width="1.8" fill="none" stroke-linecap="round"/>` + `<path d="M43 53 Q50 60 57 53" stroke="${encre}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
      case "etoiles": return joues + [43, 57].map((x) => `<path transform="translate(${x} 46) scale(.42)" d="M0 -9 L2.6 -2.8 L9 -2.8 L3.8 1.2 L5.6 7.6 L0 3.8 L-5.6 7.6 L-3.8 1.2 L-9 -2.8 L-2.6 -2.8 Z" fill="#f2b705" stroke="#b07d00" stroke-width="1"/>`).join("") + `<path d="M43 52 Q50 61 57 52 Z" fill="${encre}"/>`;
      default: return joues + `<circle cx="43" cy="46" r="2" fill="${encre}"/><circle cx="57" cy="46" r="2" fill="${encre}"/>` + sourire;
    }
  }

  function haut(e, u) {
    const corps = "M16 100 C16 82 31 72 50 72 C69 72 84 82 84 100 Z";
    const col = `<path d="M43 72 Q50 79 57 72" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="1.6"/>`;
    switch (e.id) {
      case "pi": return `<path d="${corps}" fill="${e.couleur}"/>${col}<text x="50" y="94" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="15" fill="#fff">π</text>`;
      case "pythagore": return `<path d="${corps}" fill="${e.couleur}"/>${col}<g fill="none" stroke="#fff" stroke-width="1.3" stroke-opacity=".9"><path d="M43 95 L57 95 L43 84 Z"/><rect x="43" y="95" width="14" height="5"/><rect x="38" y="84" width="5" height="11"/></g>`;
      case "blouse": return `<path d="${corps}" fill="${e.couleur}" stroke="#c9d3d8" stroke-width="1"/><path d="M50 74 L42 100 M50 74 L58 100" stroke="#c9d3d8" stroke-width="1.2"/><path d="M44 72 L50 82 L56 72" fill="#0a7c76"/><rect x="62" y="86" width="8" height="7" rx="1" fill="none" stroke="#c9d3d8"/><line x1="64" y1="83" x2="64" y2="89" stroke="#1e63b8" stroke-width="1.4"/>`;
      case "toge": return `<path d="${corps}" fill="${e.couleur}"/><path d="M41 73 L45 100 M59 73 L55 100" stroke="#e3b23c" stroke-width="4"/>`;
      case "dore": return `<defs><linearGradient id="h${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6d77a"/><stop offset=".5" stop-color="#d9a520"/><stop offset="1" stop-color="#a97a0c"/></linearGradient></defs><path d="${corps}" fill="url(#h${u})"/><path d="M50 74 L50 100" stroke="#8a6408" stroke-width="1"/>${[82, 89, 96].map((y) => `<circle cx="53" cy="${y}" r="1.2" fill="#fff6d0"/>`).join("")}`;
      case "cape": return `<path d="M12 100 C14 78 30 70 50 70 C70 70 86 78 88 100 Z" fill="${e.couleur}"/><path d="${corps}" fill="#24324a"/><path d="M36 74 Q50 82 64 74" stroke="#e3b23c" stroke-width="2.4" fill="none"/><circle cx="50" cy="79" r="3" fill="#e3b23c"/>`;
      default: return `<path d="${corps}" fill="${e.couleur}"/>${col}`;
    }
  }

  function accessoire(id, u) {
    switch (id) {
      case "lunettes": return `<g fill="none" stroke="#2b2b2b" stroke-width="1.5"><circle cx="43" cy="46" r="5.2"/><circle cx="57" cy="46" r="5.2"/><path d="M48.2 46 Q50 44.5 51.8 46 M37.8 45 L33 43.5 M62.2 45 L67 43.5"/></g>`;
      case "soleil": return `<g fill="#1b1f24"><rect x="36.5" y="42" width="12" height="8" rx="3"/><rect x="51.5" y="42" width="12" height="8" rx="3"/></g><path d="M48.5 45 L51.5 45 M36.5 44 L32.5 42.5 M63.5 44 L67.5 42.5" stroke="#1b1f24" stroke-width="1.5"/><path d="M38.5 44 L42 44" stroke="#fff" stroke-opacity=".5" stroke-width="1.2"/>`;
      case "casquette": return `<path d="M31 40 C31 23 69 23 69 40 Z" fill="#e2725b"/><path d="M50 39 C62 38 76 39 79 42.5 C71 44 59 43 50 42 Z" fill="#c95a44"/><circle cx="50" cy="25.5" r="1.8" fill="#c95a44"/>`;
      case "fleur": return fleur(66, 30, 1, "#efe27a");
      case "casque": return `<path d="M30 47 C29 20 71 20 70 47" fill="none" stroke="#24324a" stroke-width="4" stroke-linecap="round"/><rect x="25" y="41" width="9" height="14" rx="4" fill="#e2725b"/><rect x="66" y="41" width="9" height="14" rx="4" fill="#e2725b"/>`;
      case "laurier": return `<g fill="#4c9a4a">${[-60, -40, -20, 0, 20, 40, 60].map((a) => `<ellipse cx="0" cy="-23" rx="2.8" ry="5.5" transform="translate(50 46) rotate(${a}) rotate(${a < 0 ? -30 : 30} 0 -23)"/>`).join("")}</g>`;
      case "toque": return `<rect x="38" y="25" width="24" height="7" rx="1.5" fill="#1d2433"/><path d="M28 25 L50 17 L72 25 L50 33 Z" fill="#2a3346"/><path d="M50 25 L69 27 L69 37" stroke="#e3b23c" stroke-width="1.4" fill="none"/><circle cx="69" cy="38" r="2" fill="#e3b23c"/>`;
      case "aureole": return `<ellipse cx="50" cy="16" rx="15" ry="4.2" fill="none" stroke="#f2c94c" stroke-width="2.6"/><text x="50" y="14" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="7" fill="#c98a08">π</text>`;
      case "couronne": return `<defs><linearGradient id="c${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbe08a"/><stop offset="1" stop-color="#d9a520"/></linearGradient></defs><path d="M35 30 L37 15 L43.5 23 L50 12 L56.5 23 L63 15 L65 30 Z" fill="url(#c${u})" stroke="#a97a0c" stroke-width="1"/><circle cx="50" cy="25" r="2" fill="#e2725b"/><circle cx="41" cy="27" r="1.4" fill="#2bb3c0"/><circle cx="59" cy="27" r="1.4" fill="#2bb3c0"/>`;
      default: return "";
    }
  }

  function cadre(id, u) {
    const anneau = (stroke, w) => `<circle cx="50" cy="50" r="${48 - w / 2}" fill="none" stroke="${stroke}" stroke-width="${w}"/>`;
    switch (id) {
      case "bronze": return anneau("#b87333", 4);
      case "argent": return anneau("#aab8c2", 4) + anneau("#e8eef2", 1);
      case "or": return anneau("#e3b23c", 4.5) + anneau("#fff1b8", 1);
      case "lagon": return `<defs><linearGradient id="k${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3cc2b6"/><stop offset="1" stop-color="#1e63b8"/></linearGradient></defs>` + anneau(`url(#k${u})`, 5);
      case "arcenciel": return `<defs><linearGradient id="k${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ef4444"/><stop offset=".25" stop-color="#f59e0b"/><stop offset=".5" stop-color="#22c55e"/><stop offset=".75" stop-color="#3b82f6"/><stop offset="1" stop-color="#a855f7"/></linearGradient></defs>` + anneau(`url(#k${u})`, 5);
      case "legende": return `<defs><linearGradient id="k${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1b8"/><stop offset=".5" stop-color="#e3b23c"/><stop offset="1" stop-color="#a97a0c"/></linearGradient></defs>` + anneau(`url(#k${u})`, 6) + [0, 90, 180, 270].map((a) => `<path transform="rotate(${a} 50 50) translate(50 3.5) scale(.32)" d="M0 -9 L2.6 -2.8 L9 -2.8 L3.8 1.2 L5.6 7.6 L0 3.8 L-5.6 7.6 L-3.8 1.2 L-9 -2.8 L-2.6 -2.8 Z" fill="#fff6d0" stroke="#a97a0c" stroke-width="1.5"/>`).join("");
      default: return anneau("rgba(19,40,44,.12)", 2);
    }
  }

  // Dessin complet ; av doit déjà être normalisé
  function dessin(av, taille, titre) {
    const u = "av" + (++compteur);
    const peau = element("peau", av.peau).couleur;
    const ch = element("couleurCheveux", av.couleurCheveux).couleur;
    const h = element("haut", av.haut);
    const hair = cheveux(av.cheveux, ch, h.id === "blouse" ? "#0a7c76" : h.couleur);
    const comp = element("compagnon", av.compagnon);
    const label = titre ? `role="img" aria-label="${titre.replace(/"/g, "&quot;")}"` : `aria-hidden="true"`;
    return `<svg class="avatar" viewBox="0 0 100 100" width="${taille}" height="${taille}" ${label} focusable="false">
      <defs><clipPath id="r${u}"><circle cx="50" cy="50" r="48"/></clipPath></defs>
      <g clip-path="url(#r${u})">${fond(av.fond, u)}${hair.der}
        ${haut(h, u)}
        <rect x="44" y="60" width="12" height="13" rx="4" fill="${assombrir(peau, PEAU_OMBRE)}"/>
        ${av.cheveux === "foulard" ? "" : `<circle cx="33" cy="47" r="4" fill="${peau}"/><circle cx="67" cy="47" r="4" fill="${peau}"/>`}
        <ellipse cx="50" cy="45" rx="17" ry="19" fill="${peau}"/>
        ${visage(av.visage)}${hair.dev}${accessoire(av.accessoire, u)}
      </g>${cadre(av.cadre, u)}${comp && comp.emoji ? `<circle cx="82" cy="82" r="13" fill="#fff" stroke="rgba(19,40,44,.15)"/><text x="82" y="87.5" text-anchor="middle" font-size="15">${comp.emoji}</text>` : ""}
    </svg>`;
  }

  window.PM_AVATAR = { niveau, xpPour, rang, CATEGORIES, DEFAUT, element, debloque, normaliser, recompenses, prochaine, dessin };
})();
