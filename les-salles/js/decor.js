// =====================================================================
//  DÉCOR : les ambiances des salles (fonds, murs, effets animés)
// =====================================================================
//  Chaque salle choisit une ambiance avec « fond » dans niveaux.js :
//     "temple"        intérieur éclairé à la torche, statues dans des niches
//     "jardin"        ruines à ciel ouvert, oliviers, cyprès, nuages, oiseaux
//     "crepuscule"    coucher de soleil, silhouettes violettes, lucioles
//     "nuit"          ciel étoilé, lune, constellations, étoiles filantes
//     "bibliotheque"  rayonnages de rouleaux, fenêtres, lampes à huile
//     "orient"        arcades, coupoles, lanternes (la Maison de la sagesse)
//     "mer"           bord de mer, vagues, navire, mouettes, colosse
//     "brumes"        montagnes dans la brume, pins, grues, pavillon
//     "sanctuaire"    grotte secrète, cristaux, symboles qui s'élèvent
//
//  Le décor est tiré au hasard, mais un hasard « réglé » par le nom de
//  la salle : deux salles de même ambiance ne se ressemblent pas, et
//  une salle garde toujours le même décor.
//
//  Ce qui ne bouge pas est dessiné une seule fois dans des images en
//  mémoire (des « calques »). Ce qui bouge (flammes, nuages, vagues...)
//  est redessiné à chaque image, selon le temps qui passe.
//
//  Ce fichier contient les outils communs. Les ambiances elles-mêmes
//  sont décrites dans ambiances1.js, ambiances2.js et ambiances3.js.
// =====================================================================

var Decor = (function () {

  var PI2 = Math.PI * 2;
  var POLICE = "'Cinzel', 'Trajan Pro', Georgia, serif";
  var AMBIANCES = {};

  // =================================================================
  //  Hasard réglé
  // =================================================================
  // Transforme un texte (le nom de la salle) en un nombre entier.
  function graineDe(texte) {
    var h = 2166136261;
    texte = String(texte || "");
    for (var i = 0; i < texte.length; i++) {
      h ^= texte.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  // Fabrique une suite de nombres « au hasard » entre 0 et 1,
  // toujours la même pour une même graine.
  function generateur(graine) {
    var a = graine >>> 0;
    return function () {
      var t = (a += 0x6D2B79F5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function entre(rnd, a, b) { return a + (b - a) * rnd(); }

  function melanger(liste, rnd) {
    for (var i = liste.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var x = liste[i]; liste[i] = liste[j]; liste[j] = x;
    }
    return liste;
  }

  // Un nombre entre 0 et 1 propre à chaque case (pour les murs).
  function hasard(x, y, n) {
    var s = Math.sin(x * 127.1 + y * 311.7 + n * 74.7) * 43758.5453;
    return s - Math.floor(s);
  }

  // Ramène x dans l'intervalle [debut ; debut + longueur[ (pour ce qui
  // traverse l'écran et revient de l'autre côté).
  function boucler(x, debut, longueur) {
    return ((x - debut) % longueur + longueur) % longueur + debut;
  }

  // =================================================================
  //  Petits outils de dessin
  // =================================================================
  function degradeV(ctx, y0, y1, arrets) {
    var g = ctx.createLinearGradient(0, y0, 0, y1);
    for (var i = 0; i < arrets.length; i++) g.addColorStop(arrets[i][0], arrets[i][1]);
    return g;
  }

  function degradeH(ctx, x0, x1, arrets) {
    var g = ctx.createLinearGradient(x0, 0, x1, 0);
    for (var i = 0; i < arrets.length; i++) g.addColorStop(arrets[i][0], arrets[i][1]);
    return g;
  }

  // Une lueur ronde : rgb = "255,200,120", a = opacité au centre.
  function lueur(ctx, x, y, r, rgb, a) {
    if (r <= 0 || a <= 0) return;
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(" + rgb + "," + a + ")");
    g.addColorStop(1, "rgba(" + rgb + ",0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  }

  function disque(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, Math.max(0.1, r), 0, PI2);
    ctx.fill();
  }

  function ovale(ctx, x, y, rx, ry, rot) {
    ctx.beginPath();
    ctx.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot || 0, 0, PI2);
    ctx.fill();
  }

  function rectArrondi(ctx, x, y, l, h, r) {
    r = Math.min(r, l / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + l - r, y);
    ctx.quadraticCurveTo(x + l, y, x + l, y + r);
    ctx.lineTo(x + l, y + h - r);
    ctx.quadraticCurveTo(x + l, y + h, x + l - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // Une ligne de crêtes (collines ou montagnes), remplie jusqu'en bas.
  // base : hauteur moyenne du pied, amp : hauteur des sommets,
  // forme : "rond" (collines), "pointu" (montagnes), "karst" (pitons).
  // Le chemin est seulement tracé : on choisit ensuite la couleur et on remplit.
  // Renvoie la liste des points de la crête.
  function crete(ctx, x0, x1, bas, base, amp, rnd, forme, pas) {
    var ph = [rnd() * PI2, rnd() * PI2, rnd() * PI2];
    var f = [entre(rnd, 0.8, 1.4), entre(rnd, 2.2, 3.4), entre(rnd, 5, 7.5)];
    var w = [0.55, 0.3, 0.15];
    var L = x1 - x0;
    pas = pas || 6;
    var points = [];
    ctx.beginPath();
    ctx.moveTo(x0, bas);
    for (var x = x0; x <= x1 + pas; x += pas) {
      var u = (x - x0) / L * Math.PI;
      var v = 0;
      for (var k = 0; k < 3; k++) {
        var s = Math.sin(u * f[k] + ph[k]);
        if (forme === "rond") v += w[k] * (0.5 + 0.5 * s);
        else if (forme === "pointu") v += w[k] * (1 - Math.abs(s));
        else v += w[k] * Math.pow(1 - Math.abs(s), 3);
      }
      ctx.lineTo(x, base - amp * v);
      points.push([x, base - amp * v]);
    }
    ctx.lineTo(x1 + pas, bas);
    ctx.closePath();
    return points;   // les sommets, pour placer quelque chose sur la crête
  }

  // Une colonne cannelée vue de face. c = { clair, base, ombre }.
  // casse : 0 pour une colonne entière, sinon la fraction de hauteur qui reste.
  function colonne(ctx, cx, haut, bas, l, c, casse) {
    var g = degradeH(ctx, cx - l / 2, cx + l / 2, [[0, c.ombre], [0.35, c.clair], [1, c.ombre]]);
    ctx.fillStyle = c.base;
    ctx.fillRect(cx - l * 0.68, bas - l * 0.26, l * 1.36, l * 0.26);
    ctx.fillRect(cx - l * 0.58, bas - l * 0.42, l * 1.16, l * 0.17);
    var dessusFut = haut + l * 0.5;
    ctx.fillStyle = g;
    if (casse) {
      var top = bas - (bas - haut) * casse;
      dessusFut = top;
      ctx.beginPath();
      ctx.moveTo(cx - l / 2, bas - l * 0.4);
      ctx.lineTo(cx - l / 2, top + l * 0.3);
      ctx.lineTo(cx - l * 0.18, top);
      ctx.lineTo(cx + l * 0.02, top + l * 0.32);
      ctx.lineTo(cx + l * 0.26, top + l * 0.08);
      ctx.lineTo(cx + l / 2, top + l * 0.42);
      ctx.lineTo(cx + l / 2, bas - l * 0.4);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(cx - l / 2, dessusFut, l, bas - l * 0.4 - dessusFut);
      ctx.fillStyle = c.base;
      ctx.fillRect(cx - l * 0.78, haut, l * 1.56, l * 0.24);
      ctx.beginPath();
      ctx.moveTo(cx - l * 0.7, haut + l * 0.24);
      ctx.quadraticCurveTo(cx - l * 0.56, haut + l * 0.52, cx - l * 0.5, haut + l * 0.52);
      ctx.lineTo(cx + l * 0.5, haut + l * 0.52);
      ctx.quadraticCurveTo(cx + l * 0.56, haut + l * 0.52, cx + l * 0.7, haut + l * 0.24);
      ctx.closePath();
      ctx.fill();
    }
    ctx.strokeStyle = "rgba(0,0,0,0.16)";
    ctx.lineWidth = Math.max(1, l * 0.05);
    ctx.beginPath();
    for (var i = -1.5; i <= 1.5; i++) {
      ctx.moveTo(cx + i * l * 0.2, dessusFut + l * 0.4);
      ctx.lineTo(cx + i * l * 0.2, bas - l * 0.45);
    }
    ctx.stroke();
  }

  // Une niche voûtée creusée dans le mur du fond.
  function niche(ctx, cx, bas, l, h) {
    var x = cx - l / 2, r = l / 2, y0 = bas - h + r;
    ctx.fillStyle = degradeV(ctx, bas - h, bas, [[0, "rgba(0,0,0,0.5)"], [1, "rgba(0,0,0,0.18)"]]);
    ctx.beginPath();
    ctx.moveTo(x, bas);
    ctx.lineTo(x, y0);
    ctx.arc(cx, y0, r, Math.PI, 0);
    ctx.lineTo(x + l, bas);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(255,232,195,0.13)";
    ctx.lineWidth = Math.max(1, l * 0.05);
    ctx.stroke();
  }

  // Le contour d'une ouverture en arc (ronde, ou brisée « à l'orientale »),
  // posée sur « bas », de largeur l et de hauteur totale h. Le chemin est
  // seulement tracé : à l'appelant de le remplir ou de le dessiner.
  function cheminArche(ctx, x0, bas, l, h, pointue) {
    var hp = h - (pointue ? l * 0.7 : l / 2);
    var y0 = bas - hp;
    ctx.moveTo(x0, bas);
    ctx.lineTo(x0, y0);
    if (pointue) {
      var r = l * 0.75, phi = Math.atan2(Math.sqrt(r * r - (r - l / 2) * (r - l / 2)), r - l / 2);
      ctx.arc(x0 + r, y0, r, Math.PI, Math.PI + phi);
      ctx.arc(x0 + l - r, y0, r, -phi, 0);
    } else {
      ctx.arc(x0 + l / 2, y0, l / 2, Math.PI, 0);
    }
    ctx.lineTo(x0 + l, bas);
    ctx.closePath();
  }

  // Une arche en ruine : deux piliers et un arc, sans mur autour.
  function arche(ctx, x, bas, l, h, ep, remplissage, pointue) {
    ctx.fillStyle = remplissage;
    ctx.beginPath();
    cheminArche(ctx, x, bas, l, h, pointue);
    cheminArche(ctx, x + ep, bas, l - 2 * ep, h - ep, pointue);
    ctx.fill("evenodd");
  }

  // Un petit temple grec : marches, colonnes, architrave et fronton.
  // manque : liste des numéros de colonnes tombées (temple en ruine).
  function petitTemple(ctx, cx, bas, l, h, couleur, nb, manque) {
    var marche = h * 0.08, archi = h * 0.12, fron = h * 0.22;
    var hc = h - marche - archi - fron;
    ctx.fillStyle = couleur;
    ctx.fillRect(cx - l / 2, bas - marche, l, marche);
    var lc = l / (nb * 2.3);
    for (var i = 0; i < nb; i++) {
      if (manque && manque.indexOf(i) !== -1) continue;
      var x = cx - l / 2 + l * 0.06 + i * (l * 0.88 - lc) / (nb - 1);
      ctx.fillRect(x, bas - marche - hc, lc, hc);
    }
    var y = bas - marche - hc;
    ctx.fillRect(cx - l / 2 - l * 0.02, y - archi, l * 1.04, archi);
    ctx.beginPath();
    ctx.moveTo(cx - l / 2 - l * 0.04, y - archi);
    ctx.lineTo(cx, bas - h);
    ctx.lineTo(cx + l / 2 + l * 0.04, y - archi);
    ctx.closePath();
    ctx.fill();
  }

  // Un nuage, dessiné une fois pour toutes dans une petite image.
  function spriteNuage(t, ratio, rnd, clair, ombre, allonge) {
    var l = t * entre(rnd, 2.6, 4.6) * (allonge ? 1.8 : 1);
    var h = l * (allonge ? 0.2 : 0.42);
    var c = document.createElement("canvas");
    c.width = Math.max(1, Math.ceil(l * ratio));
    c.height = Math.max(1, Math.ceil(h * ratio));
    var x = c.getContext("2d");
    x.scale(ratio, ratio);
    var n = 6 + Math.floor(rnd() * 4), bulles = [];
    for (var i = 0; i < n; i++) {
      bulles.push({ x: l * (0.2 + 0.6 * rnd()), y: h * (0.5 + 0.12 * rnd()), r: h * (0.2 + 0.16 * rnd()) });
    }
    x.fillStyle = ombre;
    bulles.forEach(function (b) { ovale(x, b.x, b.y + b.r * 0.2, b.r * 1.35, b.r); });
    x.fillStyle = clair;
    bulles.forEach(function (b) { ovale(x, b.x - b.r * 0.1, b.y - b.r * 0.12, b.r * 1.2, b.r * 0.85); });
    return { image: c, l: l, h: h };
  }

  // Un oiseau en « V » ; battement entre -1 et 1.
  function oiseau(ctx, x, y, s, battement, couleur) {
    var a = s * (0.15 + 0.45 * battement);
    ctx.strokeStyle = couleur;
    ctx.lineWidth = Math.max(1, s * 0.14);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x - s, y - a);
    ctx.quadraticCurveTo(x - s * 0.45, y - s * 0.2, x, y);
    ctx.quadraticCurveTo(x + s * 0.45, y - s * 0.2, x + s, y - a);
    ctx.stroke();
  }

  // Une flamme qui vacille (torche, lampe, lanterne).
  function flamme(ctx, x, y, s, tps, ph) {
    var f = 1 + 0.13 * Math.sin(tps * 13 + ph) + 0.08 * Math.sin(tps * 21.7 + ph * 2);
    var dx = 0.14 * s * Math.sin(tps * 8.3 + ph);
    var h = s * 1.6 * f;
    ctx.fillStyle = "rgba(255,128,36,0.92)";
    ctx.beginPath();
    ctx.moveTo(x - s * 0.45, y);
    ctx.quadraticCurveTo(x - s * 0.55, y - h * 0.5, x + dx, y - h);
    ctx.quadraticCurveTo(x + s * 0.55, y - h * 0.5, x + s * 0.45, y);
    ctx.quadraticCurveTo(x, y + s * 0.3, x - s * 0.45, y);
    ctx.fill();
    ctx.fillStyle = "rgba(255,232,140,0.95)";
    ctx.beginPath();
    ctx.moveTo(x - s * 0.24, y);
    ctx.quadraticCurveTo(x - s * 0.28, y - h * 0.32, x + dx * 0.6, y - h * 0.62);
    ctx.quadraticCurveTo(x + s * 0.28, y - h * 0.32, x + s * 0.24, y);
    ctx.quadraticCurveTo(x, y + s * 0.16, x - s * 0.24, y);
    ctx.fill();
  }

  // Une bannière de tissu qui ondule, suspendue à une tringle.
  function banniere(ctx, x, y, l, h, tps, ph, couleur, bord) {
    var n = 8;
    function dx(k) { var v = k / n; return Math.sin(tps * 1.15 + ph + v * 2.4) * l * 0.22 * v; }
    ctx.fillStyle = couleur;
    ctx.beginPath();
    ctx.moveTo(x - l / 2, y);
    for (var k = 1; k <= n; k++) ctx.lineTo(x - l / 2 + dx(k), y + h * k / n);
    ctx.lineTo(x + dx(n), y + h * 0.86);
    ctx.lineTo(x + l / 2 + dx(n), y + h);
    for (var k2 = n - 1; k2 >= 0; k2--) ctx.lineTo(x + l / 2 + dx(k2), y + h * k2 / n);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = bord;
    ctx.lineWidth = Math.max(1, l * 0.06);
    ctx.beginPath();
    for (var c = -1; c <= 1; c += 2) {
      ctx.moveTo(x + c * l * 0.36, y);
      for (var k3 = 1; k3 <= n - 1; k3++) ctx.lineTo(x + c * l * 0.36 + dx(k3), y + h * k3 / n);
    }
    ctx.stroke();
    var ex = x + dx(3), ey = y + h * 0.36;
    ctx.beginPath();
    ctx.arc(ex, ey, l * 0.2, 0, PI2);
    ctx.stroke();
    ctx.fillStyle = bord;
    disque(ctx, ex, ey, l * 0.07);
    ctx.fillStyle = "#5e4120";
    ctx.fillRect(x - l * 0.66, y - l * 0.1, l * 1.32, l * 0.13);
  }

  // Une grande statue debout sur son socle. (cx, bas) = milieu du socle,
  // h = hauteur, pose = son attitude, c = { clair, base, ombre },
  // sens = 1 (tournée à droite) ou -1 (à gauche).
  // Poses : rouleau, compas, sphere, athena, penseur, tablette, lyre, flambeau, bras.
  function statue(ctx, cx, bas, h, pose, c, sens) {
    var u = h / 10;
    ctx.save();
    ctx.translate(cx, bas);
    ctx.scale(sens || 1, 1);
    var g = degradeH(ctx, -2 * u, 2 * u, [[0, c.clair], [0.55, c.base], [1, c.ombre]]);
    ctx.fillStyle = g;
    ctx.strokeStyle = g;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Socle
    ctx.fillRect(-1.9 * u, -0.25 * u, 3.8 * u, 0.25 * u);
    ctx.fillRect(-1.6 * u, -1.2 * u, 3.2 * u, 1.0 * u);
    ctx.fillRect(-1.85 * u, -1.4 * u, 3.7 * u, 0.25 * u);

    if (pose === "penseur") {
      ctx.fillRect(-1.3 * u, -3.3 * u, 2.0 * u, 1.95 * u);
      ctx.beginPath();
      ctx.moveTo(-1.0 * u, -3.3 * u);
      ctx.lineTo(-0.9 * u, -5.6 * u);
      ctx.quadraticCurveTo(-0.3 * u, -6.3 * u, 0.4 * u, -5.9 * u);
      ctx.lineTo(0.5 * u, -3.6 * u);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(-0.4 * u, -3.9 * u, 2.0 * u, 0.7 * u);
      ctx.fillRect(1.15 * u, -3.4 * u, 0.55 * u, 2.05 * u);
      disque(ctx, 0.55 * u, -6.55 * u, 0.6 * u);
      ctx.lineWidth = 0.45 * u;
      ctx.beginPath();
      ctx.moveTo(0.2 * u, -5.6 * u);
      ctx.lineTo(1.3 * u, -4.0 * u);
      ctx.lineTo(0.75 * u, -6.0 * u);
      ctx.stroke();
      ctx.restore();
      return;
    }

    // Robe drapée, cou et tête
    ctx.beginPath();
    ctx.moveTo(-1.25 * u, -1.4 * u);
    ctx.quadraticCurveTo(-1.1 * u, -4.2 * u, -0.95 * u, -6.4 * u);
    ctx.quadraticCurveTo(-0.55 * u, -6.95 * u, 0, -7.0 * u);
    ctx.quadraticCurveTo(0.55 * u, -6.95 * u, 0.95 * u, -6.4 * u);
    ctx.quadraticCurveTo(1.1 * u, -4.2 * u, 1.25 * u, -1.4 * u);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(-0.22 * u, -7.45 * u, 0.44 * u, 0.6 * u);
    disque(ctx, 0, -7.95 * u, 0.62 * u);

    // Plis du drapé
    ctx.strokeStyle = "rgba(0,0,0,0.17)";
    ctx.lineWidth = Math.max(1, 0.1 * u);
    ctx.beginPath();
    ctx.moveTo(-0.45 * u, -6.1 * u); ctx.quadraticCurveTo(-0.6 * u, -4 * u, -0.65 * u, -1.6 * u);
    ctx.moveTo(0.3 * u, -5.9 * u); ctx.quadraticCurveTo(0.4 * u, -4 * u, 0.55 * u, -1.6 * u);
    ctx.moveTo(-0.95 * u, -5.4 * u); ctx.quadraticCurveTo(0, -4.5 * u, 1.0 * u, -5.7 * u);
    ctx.stroke();

    // Bras et attributs
    ctx.strokeStyle = g;
    ctx.fillStyle = g;
    ctx.lineWidth = 0.5 * u;
    function bras(points) {
      ctx.beginPath();
      ctx.moveTo(points[0] * u, points[1] * u);
      for (var i = 2; i < points.length; i += 2) ctx.lineTo(points[i] * u, points[i + 1] * u);
      ctx.stroke();
    }
    var brasGaucheBas = [-0.8, -6.3, -1.05, -4.3];
    switch (pose) {
      case "rouleau":
        bras([0.8, -6.3, 1.75, -8.3]);
        bras(brasGaucheBas);
        ctx.fillRect(1.45 * u, -9.5 * u, 0.62 * u, 1.25 * u);
        ovale(ctx, 1.76 * u, -9.5 * u, 0.31 * u, 0.12 * u);
        ovale(ctx, 1.76 * u, -8.25 * u, 0.31 * u, 0.12 * u);
        break;
      case "compas":
        bras([0.8, -6.3, 1.5, -5.0, 2.0, -5.7]);
        bras(brasGaucheBas);
        ctx.lineWidth = 0.18 * u;
        bras([1.55, -3.6, 2.0, -5.85, 2.5, -3.6]);
        break;
      case "sphere":
        bras([0.8, -6.3, 1.25, -5.0]);
        bras([-0.8, -6.3, 0.5, -5.2]);
        disque(ctx, 1.35 * u, -5.9 * u, 0.85 * u);
        ctx.strokeStyle = "rgba(0,0,0,0.22)";
        ctx.lineWidth = Math.max(1, 0.08 * u);
        ctx.beginPath(); ctx.ellipse(1.35 * u, -5.9 * u, 0.85 * u, 0.3 * u, 0, 0, PI2); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(1.35 * u, -5.9 * u, 0.32 * u, 0.85 * u, 0, 0, PI2); ctx.stroke();
        break;
      case "athena":
        ctx.beginPath();
        ctx.moveTo(-0.75 * u, -8.15 * u);
        ctx.quadraticCurveTo(-0.1 * u, -9.9 * u, 0.95 * u, -8.35 * u);
        ctx.lineTo(0.7 * u, -8.05 * u);
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 0.18 * u;
        bras([1.7, -1.4, 1.7, -10.4]);
        ctx.beginPath();
        ctx.moveTo(1.7 * u, -11.2 * u); ctx.lineTo(1.97 * u, -10.3 * u); ctx.lineTo(1.43 * u, -10.3 * u);
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 0.5 * u;
        bras([0.8, -6.3, 1.7, -7.4]);
        disque(ctx, -1.25 * u, -4.4 * u, 1.45 * u);
        ctx.strokeStyle = "rgba(0,0,0,0.25)";
        ctx.lineWidth = Math.max(1, 0.12 * u);
        ctx.beginPath(); ctx.arc(-1.25 * u, -4.4 * u, 1.15 * u, 0, PI2); ctx.stroke();
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        disque(ctx, -1.25 * u, -4.4 * u, 0.32 * u);
        break;
      case "tablette":
        bras([0.8, -6.3, 0.9, -4.9, 0.1, -5.0]);
        bras([-0.8, -6.3, -0.5, -5.0]);
        ctx.save();
        ctx.translate(0.1 * u, -5.6 * u);
        ctx.rotate(-0.2);
        ctx.fillRect(-0.75 * u, -0.95 * u, 1.5 * u, 1.9 * u);
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        for (var i = 0; i < 4; i++) ctx.fillRect(-0.5 * u, (-0.6 + i * 0.4) * u, 1.0 * u, Math.max(1, 0.08 * u));
        ctx.restore();
        break;
      case "lyre":
        bras([-0.8, -6.3, -1.2, -4.6]);
        bras([0.8, -6.3, 0.2, -4.9]);
        ctx.lineWidth = 0.16 * u;
        ctx.beginPath();
        ctx.moveTo(-1.9 * u, -6.3 * u);
        ctx.quadraticCurveTo(-2.15 * u, -4.4 * u, -1.4 * u, -4.2 * u);
        ctx.quadraticCurveTo(-0.65 * u, -4.4 * u, -0.9 * u, -6.3 * u);
        ctx.moveTo(-2.0 * u, -6.05 * u); ctx.lineTo(-0.8 * u, -6.05 * u);
        ctx.stroke();
        ctx.lineWidth = Math.max(1, 0.05 * u);
        bras([-1.65, -6.0, -1.55, -4.4, -1.4, -6.0, -1.4, -4.3, -1.15, -6.0, -1.25, -4.4]);
        break;
      case "flambeau":
        bras([0.8, -6.3, 1.3, -9.6]);
        bras(brasGaucheBas);
        ctx.fillRect(1.1 * u, -10.4 * u, 0.4 * u, 0.9 * u);
        break;
      default:
        bras([0.8, -6.3, 2.1, -7.9]);
        bras(brasGaucheBas);
    }
    ctx.restore();
  }

  // Une tête de statue colossale, tombée sur le côté, le visage vers le ciel.
  function teteGeante(ctx, cx, bas, s, c, rnd) {
    ctx.save();
    ctx.translate(cx, bas);
    ctx.fillStyle = degradeV(ctx, -2 * s, 0, [[0, c.clair], [1, c.ombre]]);
    ctx.beginPath();
    ctx.moveTo(-1.5 * s, 0);
    ctx.bezierCurveTo(-1.75 * s, -1.0 * s, -1.0 * s, -1.6 * s, -0.2 * s, -1.52 * s);
    ctx.lineTo(0.15 * s, -1.62 * s);
    ctx.lineTo(0.36 * s, -1.47 * s);
    ctx.lineTo(0.56 * s, -1.98 * s);
    ctx.lineTo(0.76 * s, -1.52 * s);
    ctx.lineTo(0.92 * s, -1.62 * s);
    ctx.lineTo(1.06 * s, -1.47 * s);
    ctx.quadraticCurveTo(1.36 * s, -1.4 * s, 1.42 * s, -0.9 * s);
    ctx.quadraticCurveTo(1.52 * s, -0.3 * s, 1.3 * s, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.25)";
    ctx.lineWidth = Math.max(1, s * 0.05);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0.05 * s, -1.38 * s); ctx.quadraticCurveTo(0.22 * s, -1.3 * s, 0.38 * s, -1.36 * s);   // oeil fermé
    ctx.moveTo(-0.45 * s, -1.0 * s); ctx.arc(-0.6 * s, -0.85 * s, 0.2 * s, -0.8, 2.2);                 // oreille
    ctx.moveTo(0.6 * s, -0.5 * s); ctx.lineTo(0.75 * s, -0.2 * s); ctx.lineTo(0.68 * s, 0);            // fissure
    ctx.stroke();
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    for (var i = 0; i < 6; i++) {
      var a = Math.PI * (0.55 + i * 0.13);
      disque(ctx, -0.55 * s + Math.cos(a) * 1.0 * s, -0.75 * s - Math.sin(a) * 0.7 * s, s * 0.14);
    }
    ctx.fillStyle = "rgba(90,125,60,0.45)";
    ovale(ctx, -1.1 * s, -0.3 * s, s * 0.35, s * 0.18, 0.4);
    ovale(ctx, 0.9 * s, -0.15 * s, s * 0.3, s * 0.12, -0.2);
    ctx.restore();
  }

  // ---- Arbres et plantes du décor ----
  function cypres(ctx, x, bas, h, l, c1, c2) {
    ctx.fillStyle = c1;
    ctx.beginPath();
    ctx.moveTo(x, bas - h);
    ctx.bezierCurveTo(x + l * 0.65, bas - h * 0.7, x + l * 0.6, bas - h * 0.15, x + l * 0.15, bas);
    ctx.lineTo(x - l * 0.15, bas);
    ctx.bezierCurveTo(x - l * 0.6, bas - h * 0.15, x - l * 0.65, bas - h * 0.7, x, bas - h);
    ctx.fill();
    if (c2) {
      ctx.fillStyle = c2;
      ctx.beginPath();
      ctx.moveTo(x, bas - h * 0.97);
      ctx.bezierCurveTo(x - l * 0.55, bas - h * 0.7, x - l * 0.5, bas - h * 0.2, x - l * 0.1, bas - h * 0.04);
      ctx.quadraticCurveTo(x - l * 0.12, bas - h * 0.5, x, bas - h * 0.97);
      ctx.fill();
    }
  }

  function olivier(ctx, x, bas, s, rnd, tronc, feuille, clair) {
    ctx.fillStyle = tronc;
    ctx.beginPath();
    ctx.moveTo(x - s * 0.2, bas);
    ctx.bezierCurveTo(x - s * 0.05, bas - s * 0.5, x - s * 0.35, bas - s * 0.8, x - s * 0.15, bas - s * 1.25);
    ctx.lineTo(x + s * 0.05, bas - s * 1.2);
    ctx.bezierCurveTo(x - s * 0.05, bas - s * 0.8, x + s * 0.25, bas - s * 0.5, x + s * 0.2, bas);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = tronc;
    ctx.lineWidth = s * 0.08;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x - s * 0.1, bas - s * 1.1); ctx.quadraticCurveTo(x + s * 0.3, bas - s * 1.3, x + s * 0.55, bas - s * 1.5);
    ctx.moveTo(x - s * 0.1, bas - s * 1.15); ctx.quadraticCurveTo(x - s * 0.4, bas - s * 1.35, x - s * 0.6, bas - s * 1.55);
    ctx.stroke();
    var n = 9;
    for (var i = 0; i < n; i++) {
      var a = entre(rnd, -1, 1), b = rnd();
      ctx.fillStyle = b < 0.35 ? clair : feuille;
      ovale(ctx, x + a * s * 0.85, bas - s * (1.55 + 0.3 * Math.sin(i * 1.7) + 0.15 * rnd()), s * entre(rnd, 0.28, 0.45), s * entre(rnd, 0.18, 0.28));
    }
  }

  function palmier(ctx, x, bas, h, couleur, rnd) {
    var pench = entre(rnd, -0.25, 0.25) * h;
    var hx = x + pench, hy = bas - h;
    ctx.strokeStyle = couleur;
    ctx.lineCap = "round";
    ctx.lineWidth = h * 0.06;
    ctx.beginPath();
    ctx.moveTo(x, bas);
    ctx.quadraticCurveTo(x + pench * 0.2, bas - h * 0.6, hx, hy);
    ctx.stroke();
    ctx.fillStyle = couleur;
    for (var i = 0; i < 8; i++) {
      var a = -Math.PI / 2 + (i - 3.5) * 0.42 + entre(rnd, -0.1, 0.1);
      var lg = h * entre(rnd, 0.42, 0.55);
      var ex = hx + Math.cos(a) * lg, ey = hy + Math.sin(a) * lg * 0.55 + lg * 0.35;
      ctx.beginPath();
      ctx.moveTo(hx, hy);
      ctx.quadraticCurveTo(hx + Math.cos(a) * lg * 0.5, hy + Math.sin(a) * lg * 0.6 - h * 0.08, ex, ey);
      ctx.quadraticCurveTo(hx + Math.cos(a) * lg * 0.5, hy + Math.sin(a) * lg * 0.6 + h * 0.02, hx, hy);
      ctx.fill();
    }
  }

  // Pin parasol (bord de mer) : tronc fin, ramure large et plate.
  function pinParasol(ctx, x, bas, h, tronc, feuille, clair, rnd) {
    ctx.strokeStyle = tronc;
    ctx.lineCap = "round";
    ctx.lineWidth = h * 0.05;
    ctx.beginPath();
    ctx.moveTo(x, bas);
    ctx.quadraticCurveTo(x + h * 0.1, bas - h * 0.5, x + h * 0.05, bas - h * 0.82);
    ctx.stroke();
    for (var i = 0; i < 7; i++) {
      ctx.fillStyle = i % 3 === 0 ? clair : feuille;
      ovale(ctx, x + h * 0.05 + entre(rnd, -0.45, 0.45) * h, bas - h * entre(rnd, 0.82, 0.98), h * entre(rnd, 0.2, 0.3), h * entre(rnd, 0.07, 0.11));
    }
  }

  // Pin des peintures chinoises : tronc tordu, coussins d'aiguilles plats.
  function pinChinois(ctx, x, bas, h, tronc, feuille, rnd) {
    ctx.strokeStyle = tronc;
    ctx.lineCap = "round";
    ctx.lineWidth = h * 0.05;
    var pts = [[x, bas]];
    for (var i = 1; i <= 4; i++) pts.push([x + Math.sin(i * 1.9 + rnd() * 2) * h * 0.12, bas - h * i / 4.4]);
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (var k = 1; k < pts.length; k++) ctx.lineTo(pts[k][0], pts[k][1]);
    ctx.stroke();
    ctx.lineWidth = h * 0.022;
    for (var b = 1; b < pts.length; b++) {
      var sens = b % 2 ? 1 : -1, lg = h * entre(rnd, 0.22, 0.36);
      var ex = pts[b][0] + sens * lg, ey = pts[b][1] - h * 0.04;
      ctx.beginPath();
      ctx.moveTo(pts[b][0], pts[b][1]);
      ctx.quadraticCurveTo(pts[b][0] + sens * lg * 0.5, pts[b][1] + h * 0.03, ex, ey);
      ctx.stroke();
      ctx.fillStyle = feuille;
      ovale(ctx, ex, ey - h * 0.02, lg * 0.55, h * 0.045);
      ovale(ctx, ex - sens * lg * 0.35, ey - h * 0.035, lg * 0.4, h * 0.04);
    }
    ctx.fillStyle = feuille;
    ovale(ctx, pts[4][0], pts[4][1] - h * 0.03, h * 0.2, h * 0.05);
  }

  function bambous(ctx, x, bas, h, couleur, rnd) {
    for (var i = 0; i < 5; i++) {
      var bx = x + i * h * 0.07 + entre(rnd, -0.02, 0.02) * h, hh = h * entre(rnd, 0.7, 1);
      ctx.strokeStyle = couleur;
      ctx.lineWidth = Math.max(1.5, h * 0.025);
      ctx.beginPath();
      ctx.moveTo(bx, bas);
      ctx.lineTo(bx + h * 0.03, bas - hh);
      ctx.stroke();
      ctx.fillStyle = couleur;
      for (var n = 1; n < 6; n++) {
        var ny = bas - hh * n / 6;
        ctx.fillRect(bx - h * 0.018 + h * 0.03 * n / 6, ny, h * 0.036, Math.max(1, h * 0.008));
        if (rnd() < 0.5) ovale(ctx, bx + h * 0.05, ny - h * 0.02, h * 0.06, h * 0.012, -0.5);
        if (rnd() < 0.4) ovale(ctx, bx - h * 0.04, ny - h * 0.015, h * 0.055, h * 0.011, 0.5);
      }
    }
  }

  // =================================================================
  //  Les murs : matériaux, gravures et frises
  // =================================================================
  var MATERIAUX = {
    marbre:       { base: "#e4dccb", ombre: "#c4b8a1", clair: "#fbf5e8", lisere: "#9b7226", mousse: 0.08, texture: "veines", veine: "rgba(110,96,78,0.28)" },
    marbreMousse: { base: "#ddd5c1", ombre: "#bcb096", clair: "#f6f0de", lisere: "#8a6a2a", mousse: 0.3, texture: "veines", veine: "rgba(110,96,78,0.25)" },
    marbreRose:   { base: "#efd2bf", ombre: "#c99f8c", clair: "#fde6d6", lisere: "#a8643a", mousse: 0.03, texture: "veines", veine: "rgba(150,82,70,0.25)" },
    pierreLune:   { base: "#8d97b0", ombre: "#6b7590", clair: "#c9d3ec", lisere: "#c9b06a", mousse: 0.05, texture: "paillettes" },
    gres:         { base: "#d9b483", ombre: "#b48e5e", clair: "#f0d3a6", lisere: "#7d5426", mousse: 0, texture: "strates" },
    briqueOrient: { base: "#e2c79a", ombre: "#bfa274", clair: "#f4e3c0", lisere: "#2f6f8f", mousse: 0, texture: "briques" },
    calcaire:     { base: "#efe6c9", ombre: "#cfc39f", clair: "#fffbea", lisere: "#8a7a4a", mousse: 0.05, texture: "points" },
    pierreBrume:  { base: "#a9b2a3", ombre: "#87917f", clair: "#d3dacb", lisere: "#5d6b52", mousse: 0.35, texture: "fissures" },
    basalte:      { base: "#3a4154", ombre: "#262b38", clair: "#5a6582", lisere: "#5fd1ff", mousse: 0, texture: "lueurs" }
  };

  function dessinerBloc(ctx, etat, x, y, t, mat) {
    var px = x * t, py = y * t, lw = Math.max(1, t * 0.025), k;
    ctx.fillStyle = mat.base;
    ctx.fillRect(px, py, t, t);
    var v = hasard(x, y, 1) - 0.5;
    ctx.fillStyle = v < 0 ? "rgba(255,255,255," + (-v * 0.16) + ")" : "rgba(0,0,0," + (v * 0.14) + ")";
    ctx.fillRect(px, py, t, t);

    ctx.lineWidth = lw;
    switch (mat.texture) {
      case "veines":
        ctx.strokeStyle = mat.veine;
        ctx.beginPath();
        ctx.moveTo(px, py + hasard(x, y, 2) * t);
        ctx.quadraticCurveTo(px + t * 0.5, py + hasard(x, y, 3) * t, px + t, py + hasard(x, y, 4) * t);
        if (hasard(x, y, 5) < 0.4) {
          ctx.moveTo(px + hasard(x, y, 6) * t, py);
          ctx.quadraticCurveTo(px + t * 0.4, py + t * 0.5, px + hasard(x, y, 7) * t, py + t);
        }
        ctx.stroke();
        break;
      case "strates":
        ctx.strokeStyle = "rgba(125,84,38,0.25)";
        ctx.beginPath();
        for (k = 1; k <= 3; k++) {
          var sy = py + t * (k / 4) + (hasard(x, y, k) - 0.5) * t * 0.08;
          ctx.moveTo(px, sy);
          ctx.quadraticCurveTo(px + t * 0.5, sy + (hasard(x, y, k + 3) - 0.5) * t * 0.12, px + t, sy);
        }
        ctx.stroke();
        break;
      case "briques":
        ctx.strokeStyle = mat.ombre;
        var dec = (y % 2) * t * 0.25;
        ctx.beginPath();
        ctx.moveTo(px, py + t / 2); ctx.lineTo(px + t, py + t / 2);
        ctx.moveTo(px + t * 0.25 + dec, py); ctx.lineTo(px + t * 0.25 + dec, py + t / 2);
        ctx.moveTo(px + t * 0.75 - dec, py + t / 2); ctx.lineTo(px + t * 0.75 - dec, py + t);
        ctx.stroke();
        break;
      case "points":
        ctx.fillStyle = "rgba(120,105,70,0.3)";
        for (k = 0; k < 7; k++) {
          ctx.fillRect(px + hasard(x, y, 10 + k) * t, py + hasard(x, y, 20 + k) * t, Math.max(1, t * 0.03), Math.max(1, t * 0.03));
        }
        if (hasard(x, y, 8) < 0.06) {     // une petite ammonite fossile
          ctx.strokeStyle = "rgba(120,105,70,0.5)";
          ctx.beginPath();
          for (var a = 0; a < 12; a += 0.4) {
            ctx.lineTo(px + t * 0.5 + Math.cos(a) * t * 0.02 * a, py + t * 0.5 + Math.sin(a) * t * 0.02 * a);
          }
          ctx.stroke();
        }
        break;
      case "paillettes":
        ctx.fillStyle = "rgba(235,240,255,0.7)";
        for (k = 0; k < 5; k++) {
          ctx.fillRect(px + hasard(x, y, 30 + k) * t, py + hasard(x, y, 40 + k) * t, Math.max(1, t * 0.025), Math.max(1, t * 0.025));
        }
        break;
      case "fissures":
      case "lueurs":
        if (hasard(x, y, 9) < (mat.texture === "lueurs" ? 0.28 : 0.35)) {
          var fx = px + hasard(x, y, 11) * t;
          ctx.beginPath();
          ctx.moveTo(fx, py);
          for (k = 1; k <= 4; k++) ctx.lineTo(fx + (hasard(x, y, 12 + k) - 0.5) * t * 0.45, py + t * k / 4);
          if (mat.texture === "lueurs") {
            ctx.strokeStyle = "rgba(95,209,255,0.18)";
            ctx.lineWidth = Math.max(2, t * 0.12);
            ctx.stroke();
            ctx.strokeStyle = "rgba(150,230,255,0.75)";
            ctx.lineWidth = lw;
          } else {
            ctx.strokeStyle = "rgba(40,50,40,0.35)";
          }
          ctx.stroke();
        }
        break;
    }

    ctx.strokeStyle = mat.ombre;
    ctx.lineWidth = 1;
    ctx.strokeRect(px + 0.5, py + 0.5, t - 1, t - 1);

    if (hasard(x, y, 6) < mat.mousse) {
      ctx.fillStyle = "rgba(98,130,70,0.3)";
      ovale(ctx, px + t * hasard(x, y, 7), py + t * hasard(x, y, 8), t * 0.45, t * 0.3);
    }

    // Arête éclairée sur le dessus, ombre en dessous
    var dessus = Moteur.caseEn(etat, x, y - 1), dessous = Moteur.caseEn(etat, x, y + 1);
    if (y > 0 && dessus !== "mur") {
      var e = Math.max(2, t * 0.1);
      if (mat.texture === "briques") {
        var hb = Math.max(3, t * 0.16);
        ctx.fillStyle = mat.lisere;
        ctx.fillRect(px, py, t, hb);
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        for (k = 0; k < 2; k++) {
          var lx = px + t * (0.25 + 0.5 * k), ly = py + hb / 2, r = Math.max(1, t * 0.045);
          ctx.beginPath();
          ctx.moveTo(lx, ly - r); ctx.lineTo(lx + r, ly); ctx.lineTo(lx, ly + r); ctx.lineTo(lx - r, ly);
          ctx.closePath();
          ctx.fill();
        }
      } else {
        ctx.fillStyle = mat.clair;
        ctx.fillRect(px, py, t, e);
        ctx.fillStyle = mat.lisere;
        ctx.fillRect(px, py + e, t, 1);
        if (mat.texture === "lueurs") {
          ctx.fillStyle = "rgba(95,209,255,0.35)";
          ctx.fillRect(px, py, t, Math.max(1, e * 0.5));
        }
      }
    }
    if (y + 1 < etat.hauteur && dessous !== "mur") {
      ctx.fillStyle = degradeV(ctx, py + t * 0.75, py + t, [[0, "rgba(0,0,0,0)"], [1, "rgba(0,0,0,0.22)"]]);
      ctx.fillRect(px, py + t * 0.75, t, t * 0.25);
    }
  }

  // Quelques pierres portent un symbole gravé.
  var GRAVURES = ["π", "φ", "Σ", "Δ", "√", "∞", "α", "θ", "Ω", "≡", "λ", "μ"];
  function graver(ctx, x, y, t, mat) {
    var s = GRAVURES[Math.floor(hasard(x, y, 50) * GRAVURES.length) % GRAVURES.length];
    var cx = x * t + t / 2, cy = y * t + t * 0.54;
    ctx.font = "700 " + Math.round(t * 0.46) + "px " + POLICE;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var brille = mat.texture === "lueurs";
    ctx.fillStyle = brille ? "rgba(95,209,255,0.45)" : "rgba(255,255,255,0.35)";
    ctx.fillText(s, cx + 1, cy + 1);
    ctx.fillStyle = brille ? "rgba(170,238,255,0.85)" : "rgba(0,0,0,0.27)";
    ctx.fillText(s, cx, cy);
    ctx.textBaseline = "alphabetic";
  }

  // La frise qui court le long du plafond.
  function dessinerFrise(ctx, etat, t, style, couleur) {
    ctx.save();
    ctx.strokeStyle = couleur;
    ctx.fillStyle = couleur;
    ctx.lineWidth = Math.max(1.5, t * 0.06);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.font = "700 " + Math.round(t * 0.42) + "px " + POLICE;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (var x = 0; x < etat.largeur; x++) {
      if (etat.cases[0][x] !== "mur") continue;
      var px = x * t, m = t * 0.2, s = t - 2 * m, cx = px + t / 2;
      ctx.beginPath();
      switch (style) {
        case "flots":
          ctx.moveTo(px, t * 0.74); ctx.lineTo(px + t, t * 0.74);
          ctx.moveTo(px, t * 0.74);
          ctx.bezierCurveTo(px + t * 0.3, t * 0.72, px + t * 0.36, t * 0.26, px + t * 0.6, t * 0.3);
          ctx.arc(px + t * 0.6, t * 0.45, t * 0.15, -Math.PI / 2, Math.PI * 1.1);
          break;
        case "etoiles":
          ctx.moveTo(px, t * 0.22); ctx.lineTo(px + t, t * 0.22);
          ctx.moveTo(px, t * 0.86); ctx.lineTo(px + t, t * 0.86);
          ctx.stroke();
          var r = t * 0.17, cy = t * 0.54;
          ctx.beginPath();
          ctx.moveTo(cx, cy - r);
          ctx.quadraticCurveTo(cx, cy, cx + r, cy);
          ctx.quadraticCurveTo(cx, cy, cx, cy + r);
          ctx.quadraticCurveTo(cx, cy, cx - r, cy);
          ctx.quadraticCurveTo(cx, cy, cx, cy - r);
          ctx.fill();
          continue;
        case "oves":
          ctx.moveTo(px, t * 0.2); ctx.lineTo(px + t, t * 0.2);
          ctx.moveTo(px, t * 0.88); ctx.lineTo(px + t, t * 0.88);
          ctx.moveTo(px + t * 0.46, t * 0.55);
          ctx.ellipse(px + t * 0.3, t * 0.55, t * 0.16, t * 0.24, 0, 0, PI2);
          ctx.moveTo(px + t * 0.8, t * 0.32); ctx.lineTo(px + t * 0.8, t * 0.8);
          ctx.moveTo(px + t * 0.72, t * 0.68); ctx.lineTo(px + t * 0.8, t * 0.8); ctx.lineTo(px + t * 0.88, t * 0.68);
          break;
        case "entrelacs":
          ctx.moveTo(px, t * 0.2); ctx.lineTo(px + t, t * 0.2);
          ctx.moveTo(px, t * 0.78);
          ctx.lineTo(px + t * 0.25, t * 0.4); ctx.lineTo(px + t * 0.5, t * 0.78);
          ctx.lineTo(px + t * 0.75, t * 0.4); ctx.lineTo(px + t, t * 0.78);
          ctx.stroke();
          disque(ctx, px + t * 0.25, t * 0.62, t * 0.05);
          disque(ctx, px + t * 0.75, t * 0.62, t * 0.05);
          continue;
        case "nuages":
          ctx.moveTo(px, t * 0.8); ctx.lineTo(px + t, t * 0.8);
          ctx.moveTo(px + t * 0.17, t * 0.55);
          ctx.arc(px + t * 0.32, t * 0.55, t * 0.15, Math.PI, Math.PI * 2.7);
          ctx.moveTo(px + t * 0.57, t * 0.5);
          ctx.arc(px + t * 0.7, t * 0.5, t * 0.13, Math.PI, Math.PI * 2.7);
          break;
        case "runes":
          var lettre = GRAVURES[(x * 7) % GRAVURES.length];
          ctx.fillStyle = "rgba(95,209,255,0.3)";
          ctx.fillText(lettre, cx + 1, t * 0.56 + 1);
          ctx.fillStyle = couleur;
          ctx.fillText(lettre, cx, t * 0.55);
          continue;
        default: // méandre grec
          ctx.moveTo(px, m + s);
          ctx.lineTo(px + m + s, m + s);
          ctx.lineTo(px + m + s, m);
          ctx.lineTo(px + m, m);
          ctx.lineTo(px + m, m + s * 0.66);
          ctx.lineTo(px + m + s * 0.66, m + s * 0.66);
          ctx.lineTo(px + m + s * 0.66, m + s * 0.33);
          ctx.lineTo(px + m + s * 0.33, m + s * 0.33);
          ctx.moveTo(px + m + s, m + s);
          ctx.lineTo(px + t, m + s);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  // =================================================================
  //  Verdure et objets posés sur les blocs
  // =================================================================
  function lierre(ctx, x, y0, longueur, t, graine, c) {
    ctx.strokeStyle = c.feuille;
    ctx.lineWidth = Math.max(1, t * 0.04);
    var n = Math.max(2, Math.round(longueur / (t * 0.25)));
    ctx.beginPath();
    ctx.moveTo(x, y0);
    for (var i = 1; i <= n; i++) ctx.lineTo(x + Math.sin(i * 1.3 + graine) * t * 0.08, y0 + (i * longueur) / n);
    ctx.stroke();
    for (var k = 1; k <= n; k++) {
      var fx = x + Math.sin(k * 1.3 + graine) * t * 0.08 + (k % 2 ? 1 : -1) * t * 0.07;
      var fy = y0 + (k * longueur) / n;
      ctx.fillStyle = k % 3 ? c.feuille : c.clair;
      ovale(ctx, fx, fy, t * 0.08, t * 0.05, k % 2 ? 0.6 : -0.6);
      if (c.fleurLierre && k % 4 === 0) {
        ctx.fillStyle = c.fleurLierre;
        disque(ctx, fx + t * 0.05, fy + t * 0.03, t * 0.035);
      }
    }
  }

  // Chaque objet est dessiné posé sur le dessus d'un bloc : (x, y) est le
  // coin gauche de ce dessus ; r(i, k) donne un nombre au hasard propre à la case.
  var OBJETS = {
    herbe: function (ctx, x, y, t, r, c) {
      ctx.strokeStyle = c.herbe;
      ctx.lineWidth = Math.max(1, t * 0.035);
      ctx.lineCap = "round";
      ctx.beginPath();
      for (var i = 0; i < 6; i++) {
        var bx = x + t * (0.08 + 0.84 * r(i, 1)), hh = t * (0.1 + 0.2 * r(i, 2)), pen = (r(i, 3) - 0.5) * t * 0.2;
        ctx.moveTo(bx, y);
        ctx.quadraticCurveTo(bx + pen * 0.3, y - hh * 0.6, bx + pen, y - hh);
      }
      ctx.stroke();
    },
    fleurs: function (ctx, x, y, t, r, c) {
      OBJETS.herbe(ctx, x, y, t, r, c);
      for (var i = 0; i < 3; i++) {
        var fx = x + t * (0.15 + 0.7 * r(i, 4)), fy = y - t * (0.16 + 0.16 * r(i, 5));
        ctx.strokeStyle = c.herbe;
        ctx.lineWidth = Math.max(1, t * 0.025);
        ctx.beginPath(); ctx.moveTo(fx, y); ctx.lineTo(fx, fy); ctx.stroke();
        ctx.fillStyle = r(i, 6) < 0.5 ? c.fleur : (c.fleur2 || c.fleur);
        disque(ctx, fx, fy, t * 0.055);
        ctx.fillStyle = "rgba(255,240,150,0.9)";
        disque(ctx, fx, fy, t * 0.02);
      }
    },
    buisson: function (ctx, x, y, t, r, c) {
      var cx = x + t * (0.3 + 0.4 * r(0, 1));
      ctx.fillStyle = c.feuille;
      disque(ctx, cx - t * 0.18, y - t * 0.14, t * 0.18);
      disque(ctx, cx + t * 0.16, y - t * 0.16, t * 0.2);
      disque(ctx, cx, y - t * 0.27, t * 0.18);
      ctx.fillStyle = c.clair;
      disque(ctx, cx - t * 0.05, y - t * 0.33, t * 0.07);
      disque(ctx, cx + t * 0.18, y - t * 0.23, t * 0.055);
    },
    amphore: function (ctx, x, y, t, r) {
      var cx = x + t * (0.3 + 0.4 * r(0, 1)), h = t * (0.34 + 0.08 * r(0, 2)), l = h * 0.6;
      ctx.fillStyle = "#b3643a";
      ctx.beginPath();
      ctx.moveTo(cx - l * 0.18, y - h);
      ctx.lineTo(cx - l * 0.18, y - h * 0.82);
      ctx.bezierCurveTo(cx - l * 0.78, y - h * 0.7, cx - l * 0.6, y - h * 0.12, cx - l * 0.12, y);
      ctx.lineTo(cx + l * 0.12, y);
      ctx.bezierCurveTo(cx + l * 0.6, y - h * 0.12, cx + l * 0.78, y - h * 0.7, cx + l * 0.18, y - h * 0.82);
      ctx.lineTo(cx + l * 0.18, y - h);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#3b2216";
      ctx.fillRect(cx - l * 0.42, y - h * 0.56, l * 0.84, h * 0.12);
      ctx.strokeStyle = "#8a4626";
      ctx.lineWidth = Math.max(1, t * 0.03);
      ctx.beginPath();
      ctx.moveTo(cx - l * 0.18, y - h * 0.93); ctx.quadraticCurveTo(cx - l * 0.52, y - h * 0.95, cx - l * 0.42, y - h * 0.7);
      ctx.moveTo(cx + l * 0.18, y - h * 0.93); ctx.quadraticCurveTo(cx + l * 0.52, y - h * 0.95, cx + l * 0.42, y - h * 0.7);
      ctx.stroke();
      ctx.fillStyle = "rgba(255,230,200,0.25)";
      ovale(ctx, cx - l * 0.2, y - h * 0.38, l * 0.08, h * 0.14);
    },
    coupe: function (ctx, x, y, t, r) {
      var cx = x + t * (0.3 + 0.4 * r(0, 1));
      ctx.fillStyle = "#7a4d23";
      ctx.fillRect(cx - t * 0.03, y - t * 0.16, t * 0.06, t * 0.16);
      ctx.fillRect(cx - t * 0.1, y - t * 0.03, t * 0.2, t * 0.03);
      ctx.fillStyle = "#b07a3a";
      ctx.beginPath();
      ctx.moveTo(cx - t * 0.2, y - t * 0.24);
      ctx.quadraticCurveTo(cx, y - t * 0.06, cx + t * 0.2, y - t * 0.24);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#e0b060";
      ctx.fillRect(cx - t * 0.2, y - t * 0.25, t * 0.4, Math.max(1, t * 0.025));
    },
    rouleaux: function (ctx, x, y, t, r) {
      var cx = x + t * (0.25 + 0.5 * r(0, 1)), rr = t * 0.065;
      var pos = [[-0.13, 0], [0, 0], [0.13, 0], [-0.065, -0.115], [0.065, -0.115]];
      for (var i = 0; i < pos.length; i++) {
        var sx = cx + pos[i][0] * t, sy = y - rr + pos[i][1] * t;
        ctx.fillStyle = "#e6d3a6";
        disque(ctx, sx, sy, rr);
        ctx.strokeStyle = "#a88a55";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(sx, sy, rr * 0.55, 0, PI2); ctx.stroke();
        ctx.fillStyle = i === 1 ? "#a8482f" : "#8a6a3a";
        disque(ctx, sx, sy, rr * 0.2);
      }
    },
    livres: function (ctx, x, y, t, r) {
      var cx = x + t * (0.25 + 0.5 * r(0, 1)), couleurs = ["#7a2f22", "#2f4f6f", "#6a5a2a", "#3f5f3a"];
      var hy = y;
      for (var i = 0; i < 3; i++) {
        var l = t * (0.36 - i * 0.05), h = t * 0.08, dx = (r(i, 3) - 0.5) * t * 0.06;
        ctx.fillStyle = couleurs[(i + Math.floor(r(0, 2) * 4)) % 4];
        ctx.fillRect(cx - l / 2 + dx, hy - h, l, h);
        ctx.fillStyle = "#efe2c0";
        ctx.fillRect(cx - l / 2 + dx + l * 0.06, hy - h * 0.7, l * 0.88, h * 0.4);
        hy -= h;
      }
    },
    bougie: function (ctx, x, y, t, r) {
      var cx = x + t * (0.3 + 0.4 * r(0, 1));
      lueur(ctx, cx, y - t * 0.32, t * 0.38, "255,200,110", 0.28);
      ctx.fillStyle = "#7a4d23";
      ctx.fillRect(cx - t * 0.09, y - t * 0.03, t * 0.18, t * 0.03);
      ctx.fillStyle = "#efe6cf";
      ctx.fillRect(cx - t * 0.04, y - t * 0.24, t * 0.08, t * 0.21);
      ctx.fillStyle = "#ffb347";
      ovale(ctx, cx, y - t * 0.3, t * 0.03, t * 0.065);
    },
    jarre: function (ctx, x, y, t, r) {
      var cx = x + t * (0.3 + 0.4 * r(0, 1)), h = t * (0.3 + 0.1 * r(0, 2));
      ctx.fillStyle = "#2f6f8f";
      ctx.beginPath();
      ctx.moveTo(cx - h * 0.18, y - h);
      ctx.bezierCurveTo(cx - h * 0.72, y - h * 0.75, cx - h * 0.55, y, cx, y);
      ctx.bezierCurveTo(cx + h * 0.55, y, cx + h * 0.72, y - h * 0.75, cx + h * 0.18, y - h);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#f3ead2";
      ctx.lineWidth = Math.max(1, t * 0.025);
      ctx.beginPath();
      ctx.moveTo(cx - h * 0.45, y - h * 0.5);
      ctx.quadraticCurveTo(cx, y - h * 0.36, cx + h * 0.45, y - h * 0.5);
      ctx.stroke();
      ctx.fillStyle = "#f3ead2";
      disque(ctx, cx, y - h * 0.64, h * 0.06);
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ovale(ctx, cx - h * 0.22, y - h * 0.52, h * 0.06, h * 0.15);
    },
    coquillage: function (ctx, x, y, t, r) {
      var cx = x + t * (0.2 + 0.6 * r(0, 1)), s = t * 0.12;
      ctx.fillStyle = "#f1d3c0";
      ctx.beginPath(); ctx.moveTo(cx - s, y); ctx.arc(cx, y, s, Math.PI, 0); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#c99a85";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (var i = 1; i < 5; i++) {
        var a = Math.PI + i * Math.PI / 5;
        ctx.moveTo(cx, y); ctx.lineTo(cx + Math.cos(a) * s, y + Math.sin(a) * s);
      }
      ctx.stroke();
    },
    rocher: function (ctx, x, y, t, r, c) {
      var cx = x + t * (0.25 + 0.5 * r(0, 1)), l = t * (0.2 + 0.14 * r(0, 2));
      ctx.fillStyle = c.roche || "#8a8578";
      ctx.beginPath();
      ctx.moveTo(cx - l, y);
      ctx.quadraticCurveTo(cx - l * 0.9, y - l * 0.7, cx - l * 0.1, y - l * 0.75);
      ctx.quadraticCurveTo(cx + l * 0.8, y - l * 0.7, cx + l, y);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ovale(ctx, cx - l * 0.35, y - l * 0.5, l * 0.3, l * 0.12);
    },
    algue: function (ctx, x, y, t, r, c) {
      ctx.strokeStyle = c.herbe;
      ctx.lineWidth = Math.max(1.5, t * 0.045);
      ctx.lineCap = "round";
      ctx.beginPath();
      for (var i = 0; i < 4; i++) {
        var bx = x + t * (0.15 + 0.7 * r(i, 1)), h = t * (0.2 + 0.2 * r(i, 2));
        ctx.moveTo(bx, y);
        ctx.bezierCurveTo(bx + t * 0.08, y - h * 0.3, bx - t * 0.08, y - h * 0.6, bx + t * 0.04, y - h);
      }
      ctx.stroke();
    },
    fougere: function (ctx, x, y, t, r, c) {
      ctx.strokeStyle = c.feuille;
      ctx.lineWidth = Math.max(1, t * 0.03);
      for (var i = 0; i < 3; i++) {
        var bx = x + t * (0.25 + 0.5 * r(i, 1)), sens = i - 1, h = t * (0.28 + 0.12 * r(i, 2));
        var ex = bx + sens * t * 0.22, ey = y - h;
        ctx.beginPath();
        ctx.moveTo(bx, y);
        ctx.quadraticCurveTo(bx + sens * t * 0.05, y - h * 0.8, ex, ey);
        ctx.stroke();
        ctx.fillStyle = i === 1 ? c.clair : c.feuille;
        for (var k = 1; k < 5; k++) {
          var u = k / 5, fx = bx + (ex - bx) * u * u, fy = y + (ey - y) * u;
          ovale(ctx, fx - t * 0.04, fy, t * 0.05, t * 0.018, 0.6);
          ovale(ctx, fx + t * 0.04, fy, t * 0.05, t * 0.018, -0.6);
        }
      }
    },
    cristal: function (ctx, x, y, t, r) {
      var cx = x + t * (0.3 + 0.4 * r(0, 1));
      lueur(ctx, cx, y - t * 0.15, t * 0.45, "95,209,255", 0.22);
      var teintes = [["#58d4ff", "#bdf1ff"], ["#a77bff", "#e1d2ff"]];
      for (var i = 0; i < 3; i++) {
        var c = teintes[Math.floor(r(i, 5) * 2)], a = (i - 1) * 0.4, h = t * (0.22 + 0.16 * r(i, 2)), l = t * 0.07;
        ctx.save();
        ctx.translate(cx + (i - 1) * t * 0.09, y);
        ctx.rotate(a);
        ctx.fillStyle = c[0];
        ctx.beginPath(); ctx.moveTo(-l, 0); ctx.lineTo(-l, -h * 0.75); ctx.lineTo(0, -h); ctx.lineTo(l, -h * 0.75); ctx.lineTo(l, 0); ctx.closePath(); ctx.fill();
        ctx.fillStyle = c[1];
        ctx.beginPath(); ctx.moveTo(-l, -h * 0.75); ctx.lineTo(0, -h); ctx.lineTo(0, 0); ctx.lineTo(-l, 0); ctx.closePath(); ctx.fill();
        ctx.restore();
      }
    },
    champignon: function (ctx, x, y, t, r, c) {
      for (var i = 0; i < 3; i++) {
        var cx = x + t * (0.2 + 0.6 * r(i, 1)), h = t * (0.1 + 0.12 * r(i, 2)), s = t * (0.06 + 0.05 * r(i, 3));
        lueur(ctx, cx, y - h, s * 3, c.lueurChampignon || "120,255,200", 0.25);
        ctx.fillStyle = "#d8e8e0";
        ctx.fillRect(cx - t * 0.012, y - h, t * 0.024, h);
        ctx.fillStyle = c.champignon || "#7fffd0";
        ctx.beginPath(); ctx.moveTo(cx - s, y - h); ctx.arc(cx, y - h, s, Math.PI, 0); ctx.closePath(); ctx.fill();
      }
    },
    lavande: function (ctx, x, y, t, r, c) {
      for (var i = 0; i < 5; i++) {
        var bx = x + t * (0.12 + 0.76 * r(i, 1)), h = t * (0.22 + 0.14 * r(i, 2)), pen = (r(i, 3) - 0.5) * t * 0.12;
        ctx.strokeStyle = c.herbe;
        ctx.lineWidth = Math.max(1, t * 0.025);
        ctx.beginPath(); ctx.moveTo(bx, y); ctx.lineTo(bx + pen, y - h); ctx.stroke();
        ctx.fillStyle = c.fleur;
        ovale(ctx, bx + pen, y - h + t * 0.04, t * 0.025, t * 0.07);
      }
    },
    lys: function (ctx, x, y, t, r, c) {
      OBJETS.herbe(ctx, x, y, t, r, c);
      for (var i = 0; i < 2; i++) {
        var fx = x + t * (0.25 + 0.5 * r(i, 4)), fy = y - t * (0.22 + 0.1 * r(i, 5));
        lueur(ctx, fx, fy, t * 0.2, "200,215,255", 0.3);
        ctx.strokeStyle = c.herbe;
        ctx.beginPath(); ctx.moveTo(fx, y); ctx.lineTo(fx, fy); ctx.stroke();
        ctx.fillStyle = "#e9eeff";
        for (var p = 0; p < 3; p++) ovale(ctx, fx + (p - 1) * t * 0.035, fy - t * 0.02, t * 0.025, t * 0.05, (p - 1) * 0.5);
      }
    }
  };

  // Dessine tous les murs de la salle dans le calque des murs.
  function dessinerMurs(ctx, etat, t, p) {
    var amb = p.amb, mat = MATERIAUX[amb.materiau] || MATERIAUX.marbre;
    var verdure = amb.verdure || { herbe: "#6f8f4a", feuille: "#4f7a3a", clair: "#77a35a", fleur: "#d24b3a" };
    var x, y;
    for (y = 0; y < etat.hauteur; y++) {
      for (x = 0; x < etat.largeur; x++) {
        if (etat.cases[y][x] !== "mur") continue;
        dessinerBloc(ctx, etat, x, y, t, mat);
        if (y > 0 && Moteur.caseEn(etat, x, y - 1) === "mur" && hasard(x, y, 51) < 0.06) graver(ctx, x, y, t, mat);
      }
    }
    dessinerFrise(ctx, etat, t, amb.frise || "meandre", amb.couleurFrise || "#9b7226");

    var liste = amb.objets || [], total = 0;
    liste.forEach(function (o) { total += o[1]; });
    for (y = 0; y < etat.hauteur; y++) {
      for (x = 0; x < etat.largeur; x++) {
        if (etat.cases[y][x] !== "mur") continue;
        var dessous = Moteur.caseEn(etat, x, y + 1);
        // Sous les plafonds et les plateformes : lierre ou stalactites.
        if (dessous === "vide" && y + 1 < etat.hauteur) {
          if (amb.lierre && hasard(x, y, 11) < amb.lierre) {
            var longueur = t * (0.5 + hasard(x, y, 12) * 1.8);
            lierre(ctx, x * t + t * (0.2 + 0.6 * hasard(x, y, 13)), (y + 1) * t, longueur, t, x * 31 + y, verdure);
          }
          if (amb.stalactites && hasard(x, y, 16) < amb.stalactites) {
            var sx = x * t + t * (0.2 + 0.6 * hasard(x, y, 17)), sl = t * (0.25 + 0.5 * hasard(x, y, 18));
            ctx.fillStyle = mat.ombre;
            ctx.beginPath();
            ctx.moveTo(sx - t * 0.12, (y + 1) * t); ctx.lineTo(sx, (y + 1) * t + sl); ctx.lineTo(sx + t * 0.12, (y + 1) * t);
            ctx.closePath();
            ctx.fill();
            lueur(ctx, sx, (y + 1) * t + sl, t * 0.12, "95,209,255", 0.5);
          }
        }
        // Sur les blocs où l'on marche : un objet de temps en temps.
        if (y > 0 && Moteur.caseEn(etat, x, y - 1) === "vide" && total > 0 && hasard(x, y, 14) < (amb.densite || 0.2)) {
          var choix = hasard(x, y, 15) * total, k = 0;
          while (k < liste.length - 1 && choix > liste[k][1]) { choix -= liste[k][1]; k++; }
          var cx = x, cy = y;
          var r = function (i, n) { return hasard(cx * 7 + i, cy * 3 + n, 60 + n); };
          OBJETS[liste[k][0]](ctx, x * t, y * t, t, r, verdure);
        }
      }
    }
  }

  // =================================================================
  //  Effets animés communs (ils dépendent seulement du temps « tps »)
  // =================================================================
  function creerPoints(p, n, x0, x1, y0, y1) {
    var liste = [];
    for (var i = 0; i < n; i++) {
      liste.push({ x: entre(p.rnd, x0, x1), y: entre(p.rnd, y0, y1), ph: p.rnd() * PI2, v: entre(p.rnd, 0.5, 1.5), s: p.rnd() });
    }
    return liste;
  }

  function creerNuages(p, n, clair, ombre, yMin, yMax, allonge) {
    var liste = [];
    for (var i = 0; i < n; i++) {
      var s = spriteNuage(p.t, p.ratio, p.rnd, clair, ombre, allonge);
      liste.push({ sprite: s, x: p.rnd() * (p.W + 2 * p.M + s.l), y: entre(p.rnd, yMin, yMax),
                   v: p.t * entre(p.rnd, 0.07, 0.18), a: entre(p.rnd, 0.6, 0.95) });
    }
    return liste;
  }

  function effetNuages(ctx, p, tps, liste) {
    for (var i = 0; i < liste.length; i++) {
      var n = liste[i], larg = p.W + 2 * p.M + n.sprite.l;
      var x = boucler(n.x + tps * n.v, -p.M - n.sprite.l, larg);
      ctx.globalAlpha = n.a;
      ctx.drawImage(n.sprite.image, x, n.y, n.sprite.l, n.sprite.h);
    }
    ctx.globalAlpha = 1;
  }

  // Des vols de quelques oiseaux qui traversent le ciel.
  function creerVols(p, n, yMin, yMax) {
    var liste = [];
    for (var i = 0; i < n; i++) {
      liste.push({ x: p.rnd() * p.W, y: entre(p.rnd, yMin, yMax), v: p.t * entre(p.rnd, 0.5, 0.9) * (p.rnd() < 0.5 ? -1 : 1),
                   nb: 2 + Math.floor(p.rnd() * 3), ph: p.rnd() * PI2, s: p.t * entre(p.rnd, 0.12, 0.2) });
    }
    return liste;
  }

  function effetVols(ctx, p, tps, liste, couleur) {
    var larg = p.W + 6 * p.t;
    for (var i = 0; i < liste.length; i++) {
      var f = liste[i], dir = f.v > 0 ? -1 : 1;
      var x0 = boucler(f.x + tps * f.v, -3 * p.t, larg);
      var y0 = f.y + Math.sin(tps * 0.4 + f.ph) * p.t * 0.4;
      for (var k = 0; k < f.nb; k++) {
        oiseau(ctx, x0 + dir * k * p.t * 0.55, y0 + (k % 2) * p.t * 0.3 + k * p.t * 0.12, f.s,
               Math.sin(tps * 7 + f.ph + k * 0.9), couleur);
      }
    }
  }

  // Poussière qui flotte dans la lumière.
  function effetPoussieres(ctx, p, tps, liste, rgb) {
    for (var i = 0; i < liste.length; i++) {
      var m = liste[i];
      var x = m.x + Math.sin(tps * 0.17 * m.v + m.ph) * p.t * 0.9;
      var y = m.y + Math.sin(tps * 0.12 * m.v + m.ph * 1.3) * p.t * 0.7;
      var a = 0.18 + 0.22 * (0.5 + 0.5 * Math.sin(tps * 1.3 * m.v + m.ph * 3));
      var s = Math.max(1, p.t * (0.025 + 0.025 * m.s));
      ctx.fillStyle = "rgba(" + rgb + "," + a.toFixed(3) + ")";
      ctx.fillRect(x, y, s, s);
    }
  }

  // Lucioles : de petites lumières qui errent et s'allument tour à tour.
  function effetLucioles(ctx, p, tps, liste, rgb) {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < liste.length; i++) {
      var m = liste[i];
      var x = m.x + Math.sin(tps * 0.31 * m.v + m.ph) * p.t * 1.6 + Math.sin(tps * 0.9 + m.ph * 2) * p.t * 0.25;
      var y = m.y + Math.sin(tps * 0.23 * m.v + m.ph * 1.7) * p.t * 1.1;
      var a = Math.max(0, Math.sin(tps * 0.8 * m.v + m.ph * 5));
      if (a < 0.05) continue;
      lueur(ctx, x, y, p.t * 0.32, rgb, 0.35 * a);
      ctx.fillStyle = "rgba(" + rgb + "," + (0.9 * a).toFixed(3) + ")";
      disque(ctx, x, y, Math.max(1, p.t * 0.035));
    }
    ctx.restore();
  }

  // Feuilles (ou pétales) qui tombent en tournoyant.
  function effetFeuilles(ctx, p, tps, liste, couleurs) {
    for (var i = 0; i < liste.length; i++) {
      var f = liste[i];
      var y = boucler(f.y + tps * p.t * 0.45 * f.v, -p.t * 0.5, p.H + p.t);
      var x = boucler(f.x + tps * p.t * 0.25 + Math.sin(tps * 1.1 * f.v + f.ph) * p.t * 0.7, -p.t, p.W + 2 * p.t);
      var rot = Math.sin(tps * 1.7 * f.v + f.ph) * 1.4;
      ctx.fillStyle = couleurs[i % couleurs.length];
      ovale(ctx, x, y, p.t * 0.075, p.t * 0.032 * (0.4 + 0.6 * Math.abs(Math.cos(tps * 2.3 * f.v + f.ph))), rot);
    }
  }

  // Étoiles qui scintillent (les plus grosses ont une petite croix de lumière).
  function effetScintillement(ctx, p, tps, liste) {
    for (var i = 0; i < liste.length; i++) {
      var e = liste[i];
      var a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(tps * (1.2 + e.v * 1.8) + e.ph));
      var r = Math.max(0.8, p.t * (0.022 + 0.026 * e.s));
      ctx.fillStyle = "rgba(255,250,235," + a.toFixed(3) + ")";
      disque(ctx, e.x, e.y, r);
      if (e.s > 0.72) {
        ctx.strokeStyle = "rgba(255,250,235," + (a * 0.5).toFixed(3) + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(e.x - r * 4, e.y); ctx.lineTo(e.x + r * 4, e.y);
        ctx.moveTo(e.x, e.y - r * 4); ctx.lineTo(e.x, e.y + r * 4);
        ctx.stroke();
      }
    }
  }

  // Une étoile filante passe toutes les « periode » secondes.
  function effetEtoileFilante(ctx, p, tps, periode) {
    var cycle = Math.floor(tps / periode), u = tps - cycle * periode;
    if (u > 1.1) return;
    var r = generateur(cycle * 7919 + 13);
    var x0 = entre(r, 0.1, 0.75) * p.W, y0 = entre(r, 0.06, 0.28) * p.H;
    var dx = p.t * entre(r, 5, 8), dy = p.t * entre(r, 1.5, 3);
    var k = u / 1.1, x = x0 + dx * k, y = y0 + dy * k, a = Math.sin(Math.PI * k);
    var g = ctx.createLinearGradient(x, y, x - dx * 0.35, y - dy * 0.35);
    g.addColorStop(0, "rgba(255,255,240," + (0.95 * a).toFixed(3) + ")");
    g.addColorStop(1, "rgba(255,255,240,0)");
    ctx.strokeStyle = g;
    ctx.lineWidth = Math.max(1.5, p.t * 0.05);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x - dx * 0.35, y - dy * 0.35);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  // Symboles mathématiques qui s'élèvent lentement et s'effacent.
  var SYMBOLES = ["π", "√", "Σ", "∞", "Δ", "φ", "θ", "≈", "∫", "%"];
  function effetSymboles(ctx, p, tps, liste, rgb) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (var i = 0; i < liste.length; i++) {
      var m = liste[i], duree = 9 + m.v * 5;
      var u = boucler(tps / duree + m.s, 0, 1);
      var y = p.H * 0.98 - u * p.H * 0.9;
      var x = m.x + Math.sin(tps * 0.5 + m.ph) * p.t * 0.6;
      ctx.font = "700 " + Math.round(p.t * (0.35 + 0.3 * m.s)) + "px " + POLICE;
      ctx.fillStyle = "rgba(" + rgb + "," + (Math.sin(Math.PI * u) * 0.55).toFixed(3) + ")";
      ctx.fillText(SYMBOLES[i % SYMBOLES.length], x, y);
    }
    ctx.textBaseline = "alphabetic";
  }

  // Les torches : flamme, halo de lumière et braises qui montent.
  function effetTorches(ctx, p, tps, liste) {
    var t = p.t;
    for (var i = 0; i < liste.length; i++) {
      var o = liste[i];
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      lueur(ctx, o.x, o.y - t * 0.25, t * (2.6 + 0.18 * Math.sin(tps * 9 + o.ph)), "255,150,60", 0.17);
      ctx.restore();
      flamme(ctx, o.x, o.y, t * 0.22, tps, o.ph);
      for (var k = 0; k < 4; k++) {
        var u = boucler(tps * 0.55 + k / 4 + o.ph, 0, 1);
        ctx.fillStyle = "rgba(255,170,70," + ((1 - u) * 0.8).toFixed(3) + ")";
        ctx.fillRect(o.x + Math.sin(u * 7 + k + o.ph) * t * 0.25, o.y - t * 0.3 - u * t * 2, Math.max(1, t * 0.035), Math.max(1, t * 0.035));
      }
    }
  }

  // =================================================================
  //  Préparer et dessiner le décor d'une salle
  // =================================================================
  function nouveauCalque(p) {
    var c = document.createElement("canvas");
    c.width = Math.max(1, Math.round((p.W + 2 * p.M) * p.ratio));
    c.height = Math.max(1, Math.round(p.H * p.ratio));
    return c;
  }

  function contexte(calque, p) {
    var ctx = calque.getContext("2d");
    ctx.setTransform(p.ratio, 0, 0, p.ratio, p.M * p.ratio, 0);
    return ctx;
  }

  // Fabrique les calques fixes d'une salle (taille de case t, en pixels).
  function preparer(etat, t, ratio) {
    var nom = AMBIANCES[etat.fond] ? etat.fond : "temple";
    var amb = AMBIANCES[nom];
    var graine = graineDe((etat.nom || "") + "|" + nom);
    var p = {
      nom: nom, amb: amb, t: t, ratio: ratio,
      W: etat.largeur * t, H: etat.hauteur * t, M: t,
      largeur: etat.largeur, hauteur: etat.hauteur,
      rnd: generateur(graine), variante: graine % 6,
      sol: etat.hauteur * t - t * 0.95,
      d1: 0, d2: 0
    };
    p.calqueLoin = nouveauCalque(p);
    p.calqueMilieu = nouveauCalque(p);
    p.loin = contexte(p.calqueLoin, p);
    p.mil = contexte(p.calqueMilieu, p);
    amb.fabriquer(p);
    return p;
  }

  // Dessine le fond : le lointain et ses effets, puis le milieu et ses effets.
  // decalage (entre -1 et 1) : la position de Talos, pour un léger effet de profondeur.
  function dessinerFond(ctx, p, tps, decalage) {
    p.d1 = decalage * p.M * 0.35;
    p.d2 = decalage * p.M * 0.8;
    ctx.save();
    ctx.translate(-p.d1, 0);
    ctx.drawImage(p.calqueLoin, -p.M, 0, p.W + 2 * p.M, p.H);
    if (p.amb.ciel) p.amb.ciel(ctx, p, tps);
    ctx.restore();
    ctx.save();
    ctx.translate(-p.d2, 0);
    ctx.drawImage(p.calqueMilieu, -p.M, 0, p.W + 2 * p.M, p.H);
    if (p.amb.milieu) p.amb.milieu(ctx, p, tps);
    ctx.restore();
  }

  // Ce qui flotte devant les murs (poussière, feuilles, lucioles...).
  function dessinerAvant(ctx, p, tps) {
    if (!p.amb.avant) return;
    ctx.save();
    p.amb.avant(ctx, p, tps);
    ctx.restore();
  }

  return {
    preparer: preparer,
    dessinerFond: dessinerFond,
    dessinerMurs: dessinerMurs,
    dessinerAvant: dessinerAvant,
    ajouterAmbiance: function (nom, definition) { AMBIANCES[nom] = definition; },
    ambiance: function (nom) { return AMBIANCES[nom] || AMBIANCES.temple; },
    noms: function () { return Object.keys(AMBIANCES); },
    outils: {
      PI2: PI2, POLICE: POLICE, entre: entre, melanger: melanger, generateur: generateur, boucler: boucler,
      degradeV: degradeV, degradeH: degradeH, lueur: lueur, disque: disque, ovale: ovale, rectArrondi: rectArrondi,
      crete: crete, colonne: colonne, niche: niche, arche: arche, cheminArche: cheminArche, petitTemple: petitTemple, statue: statue,
      teteGeante: teteGeante, cypres: cypres, olivier: olivier, palmier: palmier, pinParasol: pinParasol,
      pinChinois: pinChinois, bambous: bambous, spriteNuage: spriteNuage, oiseau: oiseau, flamme: flamme,
      banniere: banniere, creerPoints: creerPoints, creerNuages: creerNuages, effetNuages: effetNuages,
      creerVols: creerVols, effetVols: effetVols, effetPoussieres: effetPoussieres, effetLucioles: effetLucioles,
      effetFeuilles: effetFeuilles, effetScintillement: effetScintillement, effetEtoileFilante: effetEtoileFilante,
      effetSymboles: effetSymboles, effetTorches: effetTorches
    }
  };
})();
