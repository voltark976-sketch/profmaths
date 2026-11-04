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

  /* ---------- Catégories de l'éditeur ----------
     zoom : partie de l'avatar montrée sur les vignettes (x y largeur hauteur) ;
     couleur : vignette en pastille de couleur */
  const Z_VISAGE = "22 16 56 56", Z_YEUX = "31 30 38 38", Z_BAS = "29 36 42 42", Z_TETE = "8 0 84 84", Z_HAUT = "10 50 80 50";
  const CATEGORIES = [
    { id: "forme", nom: "Forme du visage", court: "Forme", section: "visage", zoom: Z_VISAGE },
    { id: "peau", nom: "Teint", court: "Teint", section: "visage", couleur: true },
    { id: "yeux", nom: "Yeux", court: "Yeux", section: "visage", zoom: Z_YEUX },
    { id: "couleurYeux", nom: "Couleur des yeux", court: "Couleur des yeux", section: "visage", couleur: true },
    { id: "sourcils", nom: "Sourcils", court: "Sourcils", section: "visage", zoom: Z_YEUX },
    { id: "nez", nom: "Nez", court: "Nez", section: "visage", zoom: Z_BAS },
    { id: "bouche", nom: "Bouche", court: "Bouche", section: "visage", zoom: Z_BAS },
    { id: "details", nom: "Détails du visage", court: "Détails", section: "visage", zoom: Z_VISAGE },
    { id: "barbe", nom: "Barbe", court: "Barbe", section: "visage", zoom: Z_BAS },
    { id: "cheveux", nom: "Coiffure", court: "Coiffure", section: "cheveux", zoom: Z_TETE },
    { id: "couleurCheveux", nom: "Couleur des cheveux", court: "Couleur", section: "cheveux", couleur: true },
    { id: "meches", nom: "Pointes colorées", court: "Pointes", section: "cheveux", couleur: true },
    { id: "haut", nom: "Haut", court: "Haut", section: "tenue", zoom: Z_HAUT },
    { id: "couleurHaut", nom: "Couleur du haut", court: "Couleur", section: "tenue", couleur: true },
    { id: "motif", nom: "Motif", court: "Motif", section: "tenue", zoom: Z_HAUT },
    { id: "accessoire", nom: "Chapeau", court: "Chapeau", section: "accessoires", zoom: "10 -2 80 64" },
    { id: "lunettes", nom: "Lunettes", court: "Lunettes", section: "accessoires", zoom: "26 26 48 40" },
    { id: "boucles", nom: "Boucles d'oreilles", court: "Boucles", section: "accessoires", zoom: "20 28 60 40" },
    { id: "compagnon", nom: "Compagnon", court: "Compagnon", section: "accessoires", zoom: "67 67 30 30" },
    { id: "fond", nom: "Fond", court: "Fond", section: "decor" },
    { id: "cadre", nom: "Cadre", court: "Cadre", section: "decor" },
    { id: "medaillon", nom: "Forme du médaillon", court: "Médaillon", section: "decor" },
    { id: "effet", nom: "Effet", court: "Effet", section: "decor" }
  ];
  const SECTIONS = [
    { id: "visage", nom: "Visage" },
    { id: "cheveux", nom: "Cheveux" },
    { id: "tenue", nom: "Tenue" },
    { id: "accessoires", nom: "Accessoires" },
    { id: "decor", nom: "Décor" }
  ];
  const DEFAUT = {
    forme: "ovale", peau: "p3", yeux: "ronds", couleurYeux: "marron", sourcils: "naturels", nez: "arrondi", bouche: "sourire",
    details: "aucun", barbe: "aucune", cheveux: "court", couleurCheveux: "noir", meches: "aucune", haut: "tshirt", couleurHaut: "lagon",
    motif: "aucun", accessoire: "aucun", lunettes: "aucune", boucles: "aucune", compagnon: "aucun", fond: "lagon", cadre: "simple",
    medaillon: "rond", effet: "aucun"
  };
  const element = (cat, id) => (A[cat] || []).find((e) => e.id === id);
  const debloque = (e, niv) => !e.niveau || niv >= e.niveau;
  // Rareté d'un élément, d'après le niveau qui le débloque
  const RARETES = [
    { id: "base", nom: "De base", max: 1 },
    { id: "rare", nom: "Rare", max: 9 },
    { id: "epique", nom: "Épique", max: 19 },
    { id: "legendaire", nom: "Légendaire", max: 29 },
    { id: "mythique", nom: "Mythique", max: Infinity }
  ];
  const rarete = (e) => RARETES.find((r) => (e.niveau || 1) <= r.max);

  // Avatars enregistrés avant la version 2 (expression, t-shirts de couleur, lunettes rangées avec les chapeaux)
  function migrer(av) {
    if (!av || typeof av !== "object") return {};
    if (av.v >= 2) return av;
    const o = Object.assign({}, av);
    const ex = { sourire: ["ronds", "sourire"], content: ["rieurs", "rire"], concentre: ["ronds", "neutre", "fronces"], clin: ["clin", "sourire"], etoiles: ["etoiles", "rire"] }[av.visage];
    if (ex) { o.yeux = ex[0]; o.bouche = ex[1]; if (ex[2]) o.sourcils = ex[2]; }
    if (["lagon", "corail", "soleil", "violet", "nuit"].includes(av.haut)) { o.couleurHaut = av.haut; o.haut = "tshirt"; }
    else if (av.haut === "pi") Object.assign(o, { haut: "tshirt", couleurHaut: "bleu", motif: "pi" });
    else if (av.haut === "pythagore") Object.assign(o, { haut: "sweat", couleurHaut: "framboise", motif: "pythagore" });
    if (av.accessoire === "lunettes") Object.assign(o, { lunettes: "rondes", accessoire: "aucun" });
    else if (av.accessoire === "soleil") Object.assign(o, { lunettes: "soleil", accessoire: "aucun" });
    delete o.visage;
    return o;
  }
  // Avatar valide pour ce niveau : un élément inconnu ou pas encore débloqué reprend la valeur de départ
  function normaliser(av, niv) {
    av = migrer(av);
    const out = { v: 2 };
    CATEGORIES.forEach(({ id }) => {
      const e = element(id, av[id]);
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
  // Éléments débloqués / total
  function collection(n) {
    let ok = 0, tout = 0;
    CATEGORIES.forEach((c) => (A[c.id] || []).forEach((e) => { tout++; if (debloque(e, n)) ok++; }));
    return { ok, tout };
  }

  /* ---------- Dessin ----------
     Le dessin (assets/avatar-dessin.js, environ 18 ko compressés) arrive après l'affichage de la page, pour ne pas
     ralentir la première visite en 3G. En attendant, on montre le dernier avatar dessiné sur cet appareil (mémorisé),
     ou une silhouette. L'événement « pm-avatar-pret » prévient la page quand le dessin est disponible. */
  const SRC = ((document.currentScript || {}).src || "assets/avatar.js").replace("avatar.js", "avatar-dessin.js");
  const CLE_MEMO = "profmaths:avatar-svg";
  let attente = null;
  function charger() {
    if (window.PM_AVATAR_DESSIN) return Promise.resolve();
    return attente || (attente = new Promise((ok, ko) => {
      const s = document.createElement("script");
      s.src = SRC;
      s.onload = () => { ok(); document.dispatchEvent(new Event("pm-avatar-pret")); };
      s.onerror = () => { attente = null; s.remove(); ko(new Error("avatar-dessin")); };
      document.head.appendChild(s);
    }));
  }
  // Chargement sans urgence : une fois la page affichée
  let prevu = false;
  function plusTard() {
    if (prevu || window.PM_AVATAR_DESSIN) return;
    prevu = true;
    const go = () => setTimeout(() => charger().catch(() => { prevu = false; }), 200);
    if (document.readyState === "complete") go(); else window.addEventListener("load", go, { once: true });
  }
  const lireMemo = () => { try { return JSON.parse(localStorage.getItem(CLE_MEMO)) || null; } catch (e) { return null; } };
  const taillee = (svg, taille, titre) => svg.replace(/ width="\d+" height="\d+" (role="img" aria-label="[^"]*"|aria-hidden="true")/, ` width="${taille}" height="${taille}" ${titre ? `role="img" aria-label="${String(titre).replace(/"/g, "&quot;")}"` : `aria-hidden="true"`}`);
  function silhouette(taille, titre) {
    return `<svg class="avatar" viewBox="0 0 100 100" width="${taille}" height="${taille}" ${titre ? `role="img" aria-label="${String(titre).replace(/"/g, "&quot;")}"` : `aria-hidden="true"`} focusable="false"><circle cx="50" cy="50" r="48" fill="#cfe9e6"/><circle cx="50" cy="43" r="17" fill="#9ccfc8"/><path d="M17 92 C21 73 35 67 50 67 C65 67 79 73 83 92 Z" fill="#9ccfc8"/></svg>`;
  }
  // av doit déjà être normalisé ; o.moi : avatar de l'élève (mémorisé pour la prochaine visite) ;
  // o.anime : animations (grand aperçu) ; o.zoom : partie montrée (vignettes de l'éditeur)
  function dessin(av, taille, titre, o) {
    o = o || {};
    if (window.PM_AVATAR_DESSIN) {
      const svg = window.PM_AVATAR_DESSIN(av, taille, titre, o);
      if (o.moi) {
        const cle = JSON.stringify(av), m = lireMemo();
        if (!m || m.cle !== cle) try { localStorage.setItem(CLE_MEMO, JSON.stringify({ cle, svg: svg.replace(/av\d+/g, "avm").replace(/ class="avatar anime"/, ` class="avatar"`) })); } catch (e) {}
      }
      return svg;
    }
    plusTard();
    const m = o.moi && lireMemo();
    return m && m.cle === JSON.stringify(av) ? taillee(m.svg, taille, titre) : silhouette(taille, titre);
  }
  const pret = () => charger();

  window.PM_AVATAR = { niveau, xpPour, rang, CATEGORIES, SECTIONS, DEFAUT, RARETES, element, debloque, rarete, migrer, normaliser, recompenses, prochaine, collection, dessin, pret };
})();
