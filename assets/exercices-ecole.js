/*
  Outils et figures de l'école (CP, CE1, CE2, CM1, CM2).
  Ce fichier ne se charge qu'à l'ouverture d'un chapitre de l'école (voir chargerChapitre dans assets/app.js),
  avant les générateurs du niveau (assets/exercices-cp.js, …). Il ne dépend que de window.PM_EXO (GEN, FIGURES, shuffle)
  et exporte ses outils dans window.PM_EXO.ecole.
  Règles des générateurs : nombres tirés au hasard, réponse attendue, trois indices progressifs, solution rédigée
  avec des phrases courtes pour des enfants ; jamais de question à deux choix ; « × » et « ÷ » en KaTeX.
*/
(function () {
  "use strict";
  if (window.PM_EXO.ecole) return;
  const { GEN, FIGURES, shuffle } = window.PM_EXO;

  /* ---------- Hasard ---------- */
  const rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  // k éléments différents d'une liste
  const tirage = (arr, k) => shuffle(arr.slice()).slice(0, k);
  // Quatre choix au plus, mélangés ; la bonne réponse est fournie à part (jamais en double, jamais seulement deux choix)
  function melange(bonne, fausses) {
    const f = [...new Set(fausses.map(String))].filter((x) => x !== String(bonne)).slice(0, 3);
    if (f.length < 2) throw new Error("pas assez de choix");
    const c = shuffle([String(bonne), ...f]);
    return { choix: c, attendu: c.indexOf(String(bonne)) };
  }

  /* ---------- Écriture des nombres ---------- */
  // KaTeX : espace fine entre les classes, virgule {,}
  const nb = (x) => {
    if (+x < 0) return "-" + nb(-x);
    const s = (+x).toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
    const [e, f] = s.split(".");
    return e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") + (f ? "{,}" + f : "");
  };
  // Texte simple (choix, figures) : 1 234,5 avec espace insécable
  const nbT = (x) => nb(x).replace(/\\,/g, " ").replace("{,}", ",");
  const $ = (x) => `$${nb(x)}$`;

  /* Nombres en lettres (orthographe de 1990 : traits d'union partout ; « million », « milliard » sont des noms) */
  const UN = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"];
  const DIZ = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante"];
  function moinsDeCent(n, finS) {
    if (n < 17) return UN[n];
    if (n < 20) return "dix-" + UN[n - 10];
    const d = Math.floor(n / 10), u = n % 10;
    if (d === 7) return "soixante-" + (u === 1 ? "et-onze" : moinsDeCent(10 + u));
    if (d === 8) return u === 0 ? (finS ? "quatre-vingts" : "quatre-vingt") : "quatre-vingt-" + UN[u];
    if (d === 9) return "quatre-vingt-" + moinsDeCent(10 + u);
    return DIZ[d] + (u === 0 ? "" : u === 1 ? "-et-un" : "-" + UN[u]);
  }
  function moinsDeMille(n, finS) {
    const c = Math.floor(n / 100), r = n % 100;
    if (c === 0) return moinsDeCent(r, finS);
    const cent = c === 1 ? "cent" : UN[c] + "-cent";
    return r ? cent + "-" + moinsDeCent(r, finS) : cent + (c > 1 && finS ? "s" : "");
  }
  function enLettres(n) {
    if (n === 0) return "zéro";
    const parts = [];
    const mrd = Math.floor(n / 1e9), mio = Math.floor(n / 1e6) % 1000, mil = Math.floor(n / 1000) % 1000, r = n % 1000;
    if (mrd) parts.push(moinsDeMille(mrd, true) + " milliard" + (mrd > 1 ? "s" : ""));
    if (mio) parts.push(moinsDeMille(mio, true) + " million" + (mio > 1 ? "s" : ""));
    let fin = "";
    if (mil) fin = mil === 1 ? "mille" : moinsDeMille(mil, false) + "-mille";
    if (r) fin += (fin ? "-" : "") + moinsDeMille(r, true);
    if (fin) parts.push(fin);
    return parts.join(" ");
  }

  /* ---------- Mots et élisions ---------- */
  // Prénoms de Mayotte : [prénom, 1 si fille]
  const PRENOMS = [["Anli", 0], ["Nassim", 0], ["Zaïnaba", 1], ["Fatima", 1], ["Moussa", 0], ["Awa", 1], ["Ibrahim", 0], ["Mariama", 1], ["Saïd", 0], ["Djamila", 1], ["Hamada", 0], ["Faïza", 1], ["Kamal", 0], ["Zalifa", 1], ["Ambdi", 0], ["Nasra", 1], ["Toiyb", 0], ["Roukia", 1], ["Nasma", 1], ["Zaïd", 0], ["Soumaïla", 0], ["Anissa", 1], ["Inaya", 1], ["Elias", 0]];
  const prenom = (sauf) => { const [nom, f] = pick(PRENOMS.filter((p) => !(sauf || []).includes(p[0]))); return { nom, f, il: f ? "elle" : "il", Il: f ? "Elle" : "Il", e: f ? "e" : "" }; };
  const deux = () => { const a = prenom(), b = prenom([a.nom]); return [a, b]; };
  const LIEUX = ["Mamoudzou", "Dzaoudzi", "Pamandzi", "Combani", "Sada", "Chirongui", "Bandrélé", "Kani-Kéli", "M'tsamboro", "Koungou", "Dembéni", "Labattoir", "Tsingoni", "Ouangani", "Bouéni", "Acoua"];
  const voy = (m) => /^[aeiouyhâàéèêîïôûAEIOUYÉÈÎ]/.test(String(m));
  const deN = (m) => (voy(m) ? "d'" : "de ") + m, queN = (m) => (voy(m) ? "qu'" : "que ") + m, leN = (m) => (voy(m) ? "l'" : "le ") + m, laN = (m) => (voy(m) ? "l'" : "la ") + m;
  // « 1 mangue », « 3 mangues » (nombre en KaTeX)
  const plur = (k, mot, pl) => `$${nb(k)}$ ${k > 1 ? pl || mot + "s" : mot}`;
  // Choses à compter, au singulier et au pluriel, avec le genre (f) pour « une », « chacune »
  const CHOSES = [["mangue", "mangues", 1], ["banane", "bananes", 1], ["coquillage", "coquillages", 0], ["bille", "billes", 1], ["crayon", "crayons", 0], ["livre", "livres", 0], ["image", "images", 1], ["noix de coco", "noix de coco", 1], ["poisson", "poissons", 0], ["perle", "perles", 1], ["ballon", "ballons", 0], ["fleur d'ylang", "fleurs d'ylang", 1], ["pierre", "pierres", 1], ["cahier", "cahiers", 0], ["papaye", "papayes", 1]];
  const chose = () => { const [s, p, f] = pick(CHOSES); return { s, p, f, un: f ? "une" : "un" }; };
  const Maj = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  /* ---------- Figures (SVG, couleurs du thème) ---------- */
  const svg = (cls, W, H, aria, corps) => `<svg class="graph ${cls}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${aria}">${corps}</svg>`;
  const r1 = (x) => +x.toFixed(1);

  // Matériel de numération : c plaques de cent, d barres de dix, u cubes (le tout tient dans 320 de large)
  function paquets(c, d, u, o) {
    o = o || {};
    let s = "", x = 6;
    const H = c ? 112 : 104, y0 = H - 6;
    for (let i = 0; i < c; i++) { // plaque 10 × 10
      const k = 8.4, X = x, Y = y0 - 10 * k;
      s += `<rect class="g-rect" x="${X}" y="${r1(Y)}" width="${10 * k}" height="${10 * k}"/>`;
      for (let j = 1; j < 10; j++) s += `<line class="g-droite" x1="${r1(X + j * k)}" y1="${r1(Y)}" x2="${r1(X + j * k)}" y2="${y0}" style="stroke-width:0.6"/><line class="g-droite" x1="${X}" y1="${r1(Y + j * k)}" x2="${r1(X + 10 * k)}" y2="${r1(Y + j * k)}" style="stroke-width:0.6"/>`;
      x += 10 * k + 8;
    }
    const pasB = d > 9 ? 9 : 12;
    for (let i = 0; i < d; i++) { // barre de dix
      const k = 9.2;
      s += `<rect class="g-cube-g" x="${x}" y="${r1(y0 - 10 * k)}" width="${k}" height="${r1(10 * k)}"/>`;
      for (let j = 1; j < 10; j++) s += `<line class="g-droite" x1="${x}" y1="${r1(y0 - j * k)}" x2="${x + k}" y2="${r1(y0 - j * k)}" style="stroke-width:0.6"/>`;
      x += pasB + (i % 5 === 4 ? 6 : 0);
    }
    if (d) x += 8;
    for (let i = 0; i < u; i++) { // cubes rangés par colonnes de 5
      const col = Math.floor(i / 5), lig = i % 5, k = 11;
      s += `<rect class="g-cube-d" x="${x + col * (k + 4)}" y="${y0 - (lig + 1) * (k + 3)}" width="${k}" height="${k}"/>`;
    }
    // Toujours au moins 320 de large (centré) : une petite collection ne doit pas être agrandie
    const w = x + Math.ceil(u / 5) * 15 + 6, W = Math.max(320, w);
    return svg("paquets", r1(W), H, o.aria || `${c ? c + " plaques de cent, " : ""}${d} barres de dix et ${u} cubes`, `<g transform="translate(${r1((W - w) / 2)} 0)">${s}</g>`);
  }

  // Collection d'objets (ronds) groupés : n objets, par paquets de g (0 = en vrac sur des lignes de 10)
  function collection(n, o) {
    o = o || {};
    const g = o.groupes || 0, r = n > 60 ? 5 : 7, pas = 2 * r + 4;
    let s = "", x = 10, y = 10, H = 0;
    if (g) {
      const nbG = Math.floor(n / g), reste = n % g, parLigne = g <= 5 ? 5 : 3, cote = g <= 5 ? g : 5;
      let gx = 8, gy = 8;
      const boite = (k, X, Y) => {
        const lignes = Math.ceil(k / cote), w = cote * pas + 4, h = lignes * pas + 4;
        s += `<rect class="g-vide" x="${X}" y="${Y}" width="${w}" height="${h}" rx="8" style="stroke:var(--doux);stroke-width:1.2;stroke-dasharray:4 3"/>`;
        for (let i = 0; i < k; i++) s += `<circle class="g-point" cx="${X + 2 + r + 2 + (i % cote) * pas}" cy="${Y + 2 + r + 2 + Math.floor(i / cote) * pas}" r="${r}"/>`;
        return [w, h];
      };
      for (let i = 0; i < nbG; i++) {
        const [w, h] = boite(g, gx, gy);
        H = Math.max(H, gy + h);
        gx += w + 8;
        if ((i + 1) % parLigne === 0 || gx + w > 316) { gx = 8; gy += h + 8; }
      }
      for (let i = 0; i < reste; i++) { s += `<circle class="g-point" cx="${gx + r + 4 + i * pas}" cy="${gy + r + 6}" r="${r}"/>`; H = Math.max(H, gy + 2 * r + 10); }
      return svg("collection", 320, H + 8, o.aria || `${n} objets`, s);
    }
    const parL = 10;
    for (let i = 0; i < n; i++) {
      const cx = x + r + (i % parL) * pas + (i % parL >= 5 ? 8 : 0), cy = y + r + Math.floor(i / parL) * pas;
      s += `<circle class="g-point" cx="${cx}" cy="${cy}" r="${r}"/>`;
      H = cy + r;
    }
    return svg("collection", 320, H + 10, o.aria || `${n} objets`, s);
  }

  /* Droite graduée : de a à a + n × pas ; lab = indices des graduations écrites ; points = [{ i, label }] ;
     fleches = [[i, j, texte]] (bonds au-dessus de la droite) */
  function droite(o) {
    const W = 320, pl = 18, pr = 26, y0 = o.fleches ? 52 : 30, H = y0 + 26;
    const ux = (W - pl - pr) / o.n, X = (i) => r1(pl + i * ux);
    let s = `<g class="g-axis"><line x1="${o.origine ? X(0) : 6}" y1="${y0}" x2="${W - 6}" y2="${y0}"/><path d="M${W - 2} ${y0} l-8 -4 v8z"/></g><g class="g-tick">`;
    for (let i = 0; i <= o.n; i++) {
      const grand = (o.lab || []).includes(i) || (o.grands && o.grands(i));
      s += `<line class="g-graduation" x1="${X(i)}" y1="${y0 - (grand ? 7 : 4)}" x2="${X(i)}" y2="${y0 + (grand ? 7 : 4)}"/>`;
      if ((o.lab || []).includes(i)) s += `<text x="${X(i)}" y="${y0 + 20}" text-anchor="middle">${o.texte ? o.texte(i) : nbT(o.a + i * o.pas)}</text>`;
    }
    s += `</g>`;
    (o.fleches || []).forEach(([i, j, t]) => {
      const xm = r1((X(i) + X(j)) / 2), hy = y0 - 6 - Math.min(28, Math.abs(X(j) - X(i)) / 2.4);
      s += `<path class="g-accolade" d="M${X(i)} ${y0 - 5} Q${xm} ${r1(2 * hy - y0 + 5)} ${X(j)} ${y0 - 5}"/><path class="g-end" d="M${X(j)} ${y0 - 4} l${j > i ? -7 : 7} -5 l${j > i ? 1 : -1} 7z"/>`;
      if (t) s += `<text class="g-mesure" x="${xm}" y="${r1(hy - 2)}" text-anchor="middle">${t}</text>`;
    });
    (o.points || []).forEach((p) => {
      s += `<circle class="g-point" cx="${X(p.i)}" cy="${y0}" r="4"/>`;
      if (p.label) s += `<text class="g-plabel" x="${X(p.i)}" y="${y0 - 11}" text-anchor="middle">${p.label}</text>`;
    });
    return svg("droite demi-droite", W, H, o.aria || "Droite graduée", s);
  }
  // Bande numérique : cases numérotées de a à a + n − 1, cases cachées (« ? ») et case coloriée
  function bande(a, n, o) {
    o = o || {};
    const w = Math.min(34, 304 / n), x0 = r1((320 - n * w) / 2);
    let s = "";
    for (let i = 0; i < n; i++) {
      const v = a + i, cache = (o.caches || []).includes(v), col = (o.colorie || []).includes(v);
      s += `<rect class="${col ? "g-aire g-colorie" : "g-vide"}" x="${r1(x0 + i * w)}" y="6" width="${r1(w)}" height="30" style="stroke:var(--encre);stroke-width:1.2"/>`;
      s += `<text class="g-label" x="${r1(x0 + i * w + w / 2)}" y="26" text-anchor="middle">${cache ? "?" : nbT(v)}</text>`;
    }
    return svg("bande-num", 320, 42, o.aria || `Bande numérique de ${a} à ${a + n - 1}`, s);
  }

  // Horloges à aiguilles : L = [[heure, minute, légende, seconde?]]
  function horloges(L) {
    const n = L.length, R = n > 1 ? 58 : 70, cy = R + 8, H = 2 * R + (L.some((x) => x[2]) ? 34 : 16);
    let s = "";
    L.forEach(([h, m, lab, sec], i) => {
      const cx = n > 1 ? 80 + 160 * i : 160, p = (a, r) => `${r1(cx + r * Math.sin(a))} ${r1(cy - r * Math.cos(a))}`;
      s += `<circle cx="${cx}" cy="${cy}" r="${R}" style="fill:var(--surface);stroke:var(--encre);stroke-width:2.5"/>`;
      for (let k = 0; k < 60; k++) { const a = (k * Math.PI) / 30, l = k % 5 ? 4 : 8; s += `<path d="M${p(a, R - 3)} L${p(a, R - 3 - l)}" style="stroke:var(--encre);stroke-width:${k % 5 ? 0.8 : 2}"/>`; }
      for (let k = 1; k <= 12; k++) { const a = (k * Math.PI) / 6, [tx, ty] = p(a, R - 19).split(" "); s += `<text class="g-plabel" x="${tx}" y="${+ty + 4}" text-anchor="middle">${k}</text>`; }
      const ah = (((h % 12) + m / 60) * Math.PI) / 6, am = ((m + (sec || 0) / 60) * Math.PI) / 30;
      s += `<path d="M${cx} ${cy} L${p(ah, R * 0.5)}" style="stroke:var(--encre);stroke-width:5;stroke-linecap:round"/><path d="M${cx} ${cy} L${p(am, R * 0.82)}" style="stroke:var(--lagon);stroke-width:3;stroke-linecap:round"/>`;
      if (sec !== undefined) s += `<path d="M${cx} ${cy} L${p((sec * Math.PI) / 30, R * 0.86)}" style="stroke:var(--faux);stroke-width:1.4"/>`;
      s += `<circle cx="${cx}" cy="${cy}" r="4" style="fill:var(--encre)"/>`;
      if (lab) s += `<text class="g-plabel" x="${cx}" y="${H - 6}" text-anchor="middle">${lab}</text>`;
    });
    return svg("horloge", 320, H, L.map(([h, m, l]) => `${l ? l + " : " : ""}horloge`).join(" ; "), s);
  }

  /* Pièces et billets : liste de valeurs en centimes (1 c à 50 €). Les pièces sont des disques, les billets des rectangles. */
  const nomValeur = (v) => (v >= 100 ? `${v / 100} €` : `${v} c`);
  function monnaie(L) {
    const billets = L.filter((v) => v >= 500).sort((a, b) => b - a), pieces = L.filter((v) => v < 500).sort((a, b) => b - a);
    let s = "", x = 6, y = 6, H = 0;
    billets.forEach((v) => {
      if (x + 92 > 318) { x = 6; y += 50; }
      s += `<rect class="g-rect" x="${x}" y="${y}" width="86" height="44" rx="5"/><rect class="g-vide" x="${x + 5}" y="${y + 5}" width="76" height="34" rx="3" style="stroke:var(--lagon);stroke-width:1"/><text class="g-clabel" x="${x + 43}" y="${y + 27}" text-anchor="middle">${v / 100} €</text>`;
      x += 92; H = y + 44;
    });
    if (billets.length) { x = 6; y = H + 8; }
    pieces.forEach((v) => {
      const r = v >= 100 ? 21 : v >= 10 ? 18 : 15;
      if (x + 2 * r > 318) { x = 6; y += 46; }
      const euro = v >= 100, cls = euro ? "g-barre-plus" : v >= 10 ? "g-rect" : "g-aire";
      s += `<circle class="${cls}" cx="${x + r}" cy="${y + 22}" r="${r}" style="stroke:var(--encre);stroke-width:1.4"/><text class="g-label" x="${x + r}" y="${y + 26}" text-anchor="middle">${nomValeur(v)}</text>`;
      x += 2 * r + 6; H = Math.max(H, y + 44);
    });
    return svg("monnaie", 320, H + 6, L.map(nomValeur).join(", "), s);
  }

  // Diagramme en barres : cats = [[nom, valeur]], pas des graduations
  function barres(cats, pas, unite) {
    const W = 320, H = 196, x0 = 36, y0 = 156, haut = 16, vmax = Math.ceil(Math.max(...cats.map((c) => c[1])) / pas) * pas;
    const Y = (v) => r1(y0 - ((y0 - haut) * v) / vmax), bw = (W - x0 - 10) / cats.length;
    let s = `<g class="g-grid">`; for (let v = 0; v <= vmax; v += pas) s += `<line x1="${x0}" y1="${Y(v)}" x2="${W - 6}" y2="${Y(v)}"/>`; s += `</g><g class="g-tick">`;
    for (let v = 0; v <= vmax; v += pas) s += `<text x="${x0 - 5}" y="${Y(v) + 3.5}" text-anchor="end">${nbT(v)}</text>`;
    s += `</g>`;
    cats.forEach(([nom, v], i) => {
      const x = x0 + i * bw + bw * 0.18, w = bw * 0.64;
      s += `<rect class="g-aire g-colorie g-barre" x="${r1(x)}" y="${Y(v)}" width="${r1(w)}" height="${r1(y0 - Y(v))}"/><text class="g-plabel" x="${r1(x + w / 2)}" y="${y0 + 15}" text-anchor="middle">${nom}</text>`;
    });
    s += `<g class="g-axis"><line x1="${x0}" y1="${y0}" x2="${W - 6}" y2="${y0}"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${haut - 8}"/></g>`;
    if (unite) s += `<text class="g-plabel" x="${x0 + 5}" y="${haut - 4}">${unite}</text>`;
    return svg("diag-barres", W, H, `Diagramme en barres : ${cats.map((c) => c[0]).join(", ")}`, s);
  }

  // Schéma en barres d'un problème : haut = [[texte, longueur]], bas = [[texte, longueur]] (longueurs relatives)
  function schema(haut, bas, o) {
    o = o || {};
    const tot = Math.max(haut.reduce((s, p) => s + p[1], 0), (bas || []).reduce((s, p) => s + p[1], 0));
    const x0 = o.etiquettes ? 70 : 8, W = 312 - x0, U = W / tot;
    let s = "", y = 8;
    [haut, bas].filter(Boolean).forEach((ligne, k) => {
      let x = x0;
      ligne.forEach(([t, l, cache]) => {
        s += `<rect class="${cache ? "g-barre-plus" : k ? "g-rect" : "g-aire g-colorie"}" x="${r1(x)}" y="${y}" width="${r1(l * U)}" height="30" style="stroke:var(--encre);stroke-width:1.2"/><text class="g-label" x="${r1(x + (l * U) / 2)}" y="${y + 20}" text-anchor="middle">${t}</text>`;
        x += l * U;
      });
      if (o.etiquettes) s += `<text class="g-plabel" x="${x0 - 6}" y="${y + 20}" text-anchor="end">${o.etiquettes[k]}</text>`;
      y += 40;
    });
    if (o.total) { const yb = y - 4; s += `<path class="g-accolade" d="M${x0} ${yb} q0 10 10 10 h${r1(W / 2 - 20)} q10 0 10 10 q0 -10 10 -10 h${r1(W / 2 - 20)} q10 0 10 -10"/><text class="g-mesure" x="${r1(x0 + W / 2)}" y="${yb + 34}" text-anchor="middle">${o.total}</text>`; y += 36; }
    return svg("schema", 320, y, o.aria || "Schéma en barres", s);
  }

  // Bandes partagées pour les fractions : rows = [{ n, col (nombre ou liste), lab }]
  function bandesFr(rows) {
    const x0 = rows.some((r) => r.lab) ? 56 : 10, w = 300 - x0, h = 30, gap = 12, H = 12 + rows.length * (h + gap) - gap;
    let s = "";
    rows.forEach((r, k) => {
      const y = 8 + k * (h + gap), col = Array.isArray(r.col) ? r.col : Array.from({ length: r.col }, (_, i) => i);
      for (let i = 0; i < r.n; i++) if (col.includes(i)) s += `<rect class="g-aire g-colorie" x="${r1(x0 + (i * w) / r.n)}" y="${y}" width="${r1(w / r.n)}" height="${h}"/>`;
      s += `<g class="g-grid">${Array.from({ length: r.n - 1 }, (_, i) => `<line x1="${r1(x0 + ((i + 1) * w) / r.n)}" y1="${y}" x2="${r1(x0 + ((i + 1) * w) / r.n)}" y2="${y + h}"/>`).join("")}</g><rect class="g-unite" x="${x0}" y="${y}" width="${w}" height="${h}"/>`;
      if (r.lab) s += `<text class="g-plabel" x="${x0 - 8}" y="${y + h / 2 + 4}" text-anchor="end">${r.lab}</text>`;
    });
    return svg("bandes", 310, H + 6, rows.map((r) => `bande partagée en ${r.n}`).join(" ; "), s);
  }
  // Disques partagés en b parts égales, parts coloriées col
  function disquesFr(b, col, nd) {
    nd = nd || 1; const R = nd > 1 ? 58 : 70, H = 2 * R + 16, cxs = nd > 1 ? [82, 238] : [160];
    let s = "";
    cxs.forEach((cx, d) => {
      for (let i = 0; i < b; i++) {
        const a0 = -Math.PI / 2 + (2 * Math.PI * i) / b, a1 = a0 + (2 * Math.PI) / b, p = (a) => `${r1(cx + R * Math.cos(a))} ${r1(8 + R + R * Math.sin(a))}`;
        s += `<path class="${col.includes(d * b + i) ? "g-aire g-colorie" : "g-vide"}" d="M${cx} ${8 + R} L${p(a0)} A${R} ${R} 0 0 1 ${p(a1)} Z" style="stroke:var(--encre);stroke-width:1.2"/>`;
      }
      s += `<circle class="g-unite" cx="${cx}" cy="${8 + R}" r="${R}"/>`;
    });
    return svg("bandes", 320, H, `disque partagé en ${b} parts égales`, s);
  }

  /* Quadrillage avec chemin : n × m cases ; depart [c, l] ; chemin = suite de lettres h, b, g, d ; objets = [[c, l, texte]] */
  function quadrillage(n, m, o) {
    o = o || {};
    const u = Math.min(30, 300 / n, 210 / m), W = n * u, x0 = r1((320 - W) / 2), y0 = 6, X = (c) => r1(x0 + c * u + u / 2), Y = (l) => r1(y0 + l * u + u / 2);
    let s = `<g class="g-grid">`;
    for (let i = 0; i <= n; i++) s += `<line x1="${r1(x0 + i * u)}" y1="${y0}" x2="${r1(x0 + i * u)}" y2="${r1(y0 + m * u)}"/>`;
    for (let j = 0; j <= m; j++) s += `<line x1="${x0}" y1="${r1(y0 + j * u)}" x2="${r1(x0 + W)}" y2="${r1(y0 + j * u)}"/>`;
    s += `</g>`;
    (o.colorie || []).forEach(([c, l]) => { s += `<rect class="g-carreau" x="${r1(x0 + c * u)}" y="${r1(y0 + l * u)}" width="${r1(u)}" height="${r1(u)}"/>`; });
    if (o.chemin && o.depart) {
      let [c, l] = o.depart, d = `M${X(c)} ${Y(l)}`;
      for (const k of o.chemin) { if (k === "h") l--; if (k === "b") l++; if (k === "g") c--; if (k === "d") c++; d += ` L${X(c)} ${Y(l)}`; }
      s += `<path d="${d}" style="fill:none;stroke:var(--ylang);stroke-width:3;stroke-linejoin:round;stroke-linecap:round"/>`;
    }
    (o.objets || []).forEach(([c, l, t]) => { s += `<text class="g-clabel" x="${X(c)}" y="${Y(l) + 5}" text-anchor="middle">${t}</text>`; });
    if (o.depart && o.marque !== false) s += `<circle class="g-point" cx="${X(o.depart[0])}" cy="${Y(o.depart[1])}" r="6"/>`;
    if (o.axe !== undefined) { const ax = r1(x0 + o.axe * u); s += `<line class="g-axe" x1="${ax}" y1="${y0 - 4}" x2="${ax}" y2="${r1(y0 + m * u + 4)}"/>`; }
    return svg("quadrillage", 320, r1(y0 * 2 + m * u), o.aria || "Quadrillage", s);
  }
  // Flèches de déplacement en texte KaTeX : h → ↑, b → ↓, g → ←, d → →
  const FL = { h: "\\uparrow", b: "\\downarrow", g: "\\leftarrow", d: "\\rightarrow" };
  const fleches = (ch) => `$${ch.split("").map((k) => FL[k]).join("\\,")}$`;

  /* Solides en perspective (cube, pave, pyramide, prisme, cylindre, cone, boule) ; o.nom écrit dessous */
  function solide(type, o) {
    o = o || {};
    const L = { cube: [60, 60, 60], pave: [100, 50, 50] }[type] || [70, 60, 50];
    let s = "", H = 150;
    const vis = "g-segment", cache = "g-cache";
    const seg = (a, b, c) => `<line class="${c}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
    if (type === "cube" || type === "pave") {
      const [l, h] = L, p = type === "cube" ? 26 : 30, x = 110 - l / 2, y = 120;
      const A = [x, y], B = [x + l, y], C = [x + l, y - h], D = [x, y - h], E = [x + p, y - p], F = [x + l + p, y - p], G = [x + l + p, y - h - p], Hh = [x + p, y - h - p];
      s += `<polygon class="g-cube-haut" points="${[D, C, G, Hh].map((q) => q.join(",")).join(" ")}"/><polygon class="g-cube-d" points="${[B, F, G, C].map((q) => q.join(",")).join(" ")}" style="fill-opacity:0.35"/><polygon class="g-cube-g" points="${[A, B, C, D].map((q) => q.join(",")).join(" ")}" style="fill-opacity:0.2"/>`;
      s += seg(A, B, vis) + seg(B, C, vis) + seg(C, D, vis) + seg(D, A, vis) + seg(B, F, vis) + seg(F, G, vis) + seg(G, Hh, vis) + seg(Hh, D, vis) + seg(C, G, vis) + seg(A, E, cache) + seg(E, F, cache) + seg(E, Hh, cache);
    } else if (type === "pyramide") {
      const A = [60, 120], B = [140, 120], C = [170, 96], D = [90, 96], S = [115, 20];
      s += `<polygon class="g-cube-g" points="${[A, B, S].map((q) => q.join(",")).join(" ")}" style="fill-opacity:0.2"/><polygon class="g-cube-d" points="${[B, C, S].map((q) => q.join(",")).join(" ")}" style="fill-opacity:0.35"/>`;
      s += seg(A, B, vis) + seg(B, C, vis) + seg(C, D, cache) + seg(D, A, cache) + seg(A, S, vis) + seg(B, S, vis) + seg(C, S, vis) + seg(D, S, cache);
    } else if (type === "prisme") {
      const A = [60, 124], B = [120, 124], C = [90, 76], A2 = [A[0] + 70, A[1] - 26], B2 = [B[0] + 70, B[1] - 26], C2 = [C[0] + 70, C[1] - 26];
      s += `<polygon class="g-cube-g" points="${[A, B, C].map((q) => q.join(",")).join(" ")}" style="fill-opacity:0.25"/><polygon class="g-cube-d" points="${[B, B2, C2, C].map((q) => q.join(",")).join(" ")}" style="fill-opacity:0.3"/>`;
      s += seg(A, B, vis) + seg(B, C, vis) + seg(C, A, vis) + seg(B, B2, vis) + seg(C, C2, vis) + seg(B2, C2, vis) + seg(A, A2, cache) + seg(A2, B2, cache) + seg(A2, C2, cache);
    } else if (type === "cylindre") {
      s += `<path class="g-cube-g" d="M70 40 L70 116 A45 14 0 0 0 160 116 L160 40 Z" style="fill-opacity:0.25"/><ellipse class="g-cube-haut" cx="115" cy="40" rx="45" ry="14"/><path class="g-arc-plein" d="M70 116 A45 14 0 0 0 160 116"/><path class="g-cache-arc" d="M70 116 A45 14 0 0 1 160 116"/>` + seg([70, 40], [70, 116], vis) + seg([160, 40], [160, 116], vis);
    } else if (type === "cone") {
      s += `<path class="g-cube-g" d="M70 116 L115 22 L160 116 A45 14 0 0 1 70 116 Z" style="fill-opacity:0.25"/><path class="g-arc-plein" d="M70 116 A45 14 0 0 0 160 116"/><path class="g-cache-arc" d="M70 116 A45 14 0 0 1 160 116"/>` + seg([70, 116], [115, 22], vis) + seg([160, 116], [115, 22], vis);
    } else { // boule
      s += `<circle class="g-cube-g" cx="115" cy="72" r="52" style="fill-opacity:0.25;stroke:var(--encre);stroke-width:2"/><path class="g-arc-plein" d="M63 72 A52 15 0 0 0 167 72" style="stroke-width:1.2"/><path class="g-cache-arc" d="M63 72 A52 15 0 0 1 167 72"/>`;
    }
    if (o.nom) { s += `<text class="g-clabel" x="115" y="${H - 6}" text-anchor="middle">${o.nom}</text>`; }
    else H = 134;
    if (o.corps) return s;
    return svg("solide", 320, H, o.aria || "Solide", `<g transform="translate(45 0)">${s}</g>`);
  }
  // Plusieurs solides côte à côte, avec une lettre sous chacun
  function solides(types, noms) {
    const n = types.length, w = 230, k = Math.min(1, 320 / (n * w));
    let s = "";
    types.forEach((t, i) => { const g = solide(t, { nom: noms ? noms[i] : String.fromCharCode(65 + i), corps: true }); s += `<g transform="translate(${r1(i * w * k)} 0) scale(${r1(k * 100) / 100})">${g}</g>`; });
    return svg("solides", r1(n * w * k), r1(150 * k), "Solides " + (noms || types.map((_, i) => String.fromCharCode(65 + i))).join(", "), s);
  }

  // Figures planes : liste de { type, nom } dessinées côte à côte (carre, rectangle, triangle, rectangle-tri, disque, losange, cercle)
  function formes(L, o) {
    o = o || {};
    const n = L.length, w = 320 / n, H = 110;
    let s = "";
    L.forEach((f, i) => {
      const cx = r1(w * i + w / 2), cy = 48, t = f.type, k = Math.min(1, w / 96);
      const P = (pts) => `<polygon class="g-poly" points="${pts.map(([x, y]) => `${r1(cx + x * k)},${r1(cy + y * k)}`).join(" ")}"/>`;
      if (t === "carre") s += P([[-30, -30], [30, -30], [30, 30], [-30, 30]]);
      else if (t === "rectangle") s += P([[-42, -24], [42, -24], [42, 24], [-42, 24]]);
      else if (t === "triangle") s += P([[-36, 30], [38, 30], [-6, -34]]);
      else if (t === "rectangle-tri") s += P([[-30, 30], [36, 30], [-30, -32]]) + `<path class="g-code" d="M${r1(cx - 30 * k + 9)} ${r1(cy + 30 * k)} v-9 h-9"/>`;
      else if (t === "losange") s += P([[0, -38], [30, 0], [0, 38], [-30, 0]]);
      else if (t === "disque") s += `<circle class="g-poly" cx="${cx}" cy="${cy}" r="${r1(34 * k)}"/>`;
      else if (t === "cercle") s += `<circle class="g-cercle" cx="${cx}" cy="${cy}" r="${r1(34 * k)}"/>`;
      else if (t === "pentagone") s += P(Array.from({ length: 5 }, (_, j) => [34 * Math.sin((2 * Math.PI * j) / 5), -34 * Math.cos((2 * Math.PI * j) / 5)]));
      else if (t === "hexagone") s += P(Array.from({ length: 6 }, (_, j) => [34 * Math.sin((2 * Math.PI * j) / 6), -34 * Math.cos((2 * Math.PI * j) / 6)]));
      if (f.nom) s += `<text class="g-clabel" x="${cx}" y="${H - 8}" text-anchor="middle">${f.nom}</text>`;
    });
    return svg("formes", 320, H, o.aria || "Figures", s);
  }

  // Règle graduée en cm (n cm) et segment posé dessus, de a à b (en mm)
  function regle(n, a, b, o) {
    o = o || {};
    const x0 = 14, u = Math.min(28, 292 / n), y = 40;
    let s = `<rect class="g-barre-plus" x="${x0 - 8}" y="${y}" width="${r1(n * u + 16)}" height="34" rx="3" style="stroke:var(--encre);stroke-width:1.2"/><g class="g-tick">`;
    for (let i = 0; i <= n * 10; i++) {
      const x = r1(x0 + (i * u) / 10), l = i % 10 === 0 ? 12 : i % 5 === 0 ? 8 : u >= 20 ? 5 : 0;
      if (l) s += `<line class="g-graduation" x1="${x}" y1="${y}" x2="${x}" y2="${y + l}"/>`;
      if (i % 10 === 0) s += `<text x="${x}" y="${y + 26}" text-anchor="middle">${i / 10}</text>`;
    }
    s += `</g>`;
    if (b !== undefined) s += `<line class="g-segment" x1="${r1(x0 + (a * u) / 10)}" y1="${y - 10}" x2="${r1(x0 + (b * u) / 10)}" y2="${y - 10}" style="stroke-width:3"/><line class="g-guide" x1="${r1(x0 + (a * u) / 10)}" y1="${y - 18}" x2="${r1(x0 + (a * u) / 10)}" y2="${y}"/><line class="g-guide" x1="${r1(x0 + (b * u) / 10)}" y1="${y - 18}" x2="${r1(x0 + (b * u) / 10)}" y2="${y}"/>`;
    if (o.nom) s += `<text class="g-plabel" x="${r1(x0 + ((a + b) * u) / 20)}" y="${y - 16}" text-anchor="middle">${o.nom}</text>`;
    return svg("regle", 320, y + 40, "Règle graduée en centimètres", s);
  }

  // Suite de motifs : symboles (texte) dans des cases ; la case « ? » est à trouver
  function motifs(L) {
    const w = Math.min(30, 312 / L.length), x0 = r1((320 - L.length * w) / 2);
    let s = "";
    L.forEach((t, i) => { s += `<rect class="${t === "?" ? "g-barre-plus" : "g-vide"}" x="${r1(x0 + i * w)}" y="6" width="${r1(w - 2)}" height="30" rx="4" style="stroke:var(--doux);stroke-width:1"/><text class="g-clabel" x="${r1(x0 + i * w + (w - 2) / 2)}" y="27" text-anchor="middle">${t}</text>`; });
    return svg("motifs", 320, 42, "Suite de motifs", s);
  }

  // Élision automatique dans les textes générés (« de Anli » → « d'Anli »), à appliquer aux générateurs d'un préfixe
  const elide = (s) => (typeof s === "string" ? s.replace(/(?<![A-Za-zÀ-ÿ])(de|que|le|la) (?=[AEIOUYÉÈÎ][a-zàâçéèêëîïôûù]|[aeiouéèêîœ])/g, (m, w) => (w === "de" ? "d'" : w === "que" ? "qu'" : "l'")) : s);
  function elisions(re) {
    Object.keys(GEN).filter((k) => re.test(k)).forEach((k) => {
      const g = GEN[k];
      if (g.elide) return;
      GEN[k] = (i) => {
        const q = g(i);
        q.enonce = elide(q.enonce); q.solution = elide(q.solution);
        if (q.aides) q.aides = q.aides.map(elide);
        if (q.choix) q.choix = q.choix.map(elide);
        if (q.erreurs) { q.erreurs.forEach((e) => { e.message = elide(e.message); }); q.erreurs = q.erreurs.filter((e, k, L) => q.mode !== "nombre" || (Math.abs(e.valeur - q.attendu) > 1e-9 && L.findIndex((x) => x.valeur === e.valeur) === k)); }
        return q;
      };
      GEN[k].elide = true;
    });
  }

  window.PM_EXO.ecole = { rand, pick, tirage, melange, nb, nbT, $, enLettres, PRENOMS, prenom, deux, LIEUX, voy, deN, queN, leN, laN, plur, chose, Maj,
    svg, r1, paquets, collection, droite, bande, horloges, nomValeur, monnaie, barres, schema, bandesFr, disquesFr, quadrillage, fleches, solide, solides, formes, regle, motifs, elisions };
})();
