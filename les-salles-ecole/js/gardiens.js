// =====================================================================
//  GARDIENS : les monstres qui rôdent dans les salles
// =====================================================================
//  Chaque stèle de pierre est gardée par son monstre, qui se tient près
//  d'elle, sur le même sol. Quand Talos approche (à moins de 3,6 cases,
//  à peu près à la même hauteur), le monstre le voit (un « ! » apparaît),
//  s'approche, puis lui saute dessus : le combat commence, et jeu.js
//  ouvre la stèle. On peut aussi aller lire la stèle soi-même (touche E).
//  Un gardien ne quitte jamais son sol et ne s'éloigne pas de plus de
//  4 cases de sa place (5 pour un boss).
//  Les oiseaux des stèles d'or, eux, attendent qu'on vienne les défier.
//  Un gardien vaincu laisse un tas de pierres.
//
//  Ce fichier ne touche ni aux stèles ni à Talos : il dit seulement à
//  jeu.js quel gardien attaque. Il range les gardiens dans etat.gardiens.
// =====================================================================

var Gardiens = (function () {

  // ---- Réglages (on peut les ajuster) ----
  var REGLAGES = {
    vue: 3.6,             // un gardien voit Talos à cette distance (en cases)...
    vueHauteur: 1.6,      // ... s'il est à peu près à la même hauteur
    laisse: 4,            // il ne s'éloigne pas plus de sa place (en cases)
    laisseBoss: 5,
    place: 1.8,           // sa place : à 1,8 case de la stèle, du côté opposé à l'entrée
    alerte: 0.45,         // le temps du « ! » avant qu'il s'élance (en secondes)
    vitesseChasse: 2.4,   // cases par seconde
    vitesseRetour: 1.6,
    vitesseRonde: 0.5,    // quand il fait les cent pas devant sa stèle
    contact: 1.0,         // il attaque quand Talos est à moins d'une case
    contactHauteur: 1.2,
    elan: 0.45,           // son bond, avant que le combat commence
    calme: 2.5,           // après une fuite, il laisse Talos tranquille
    tailleNormale: 1.7,   // la hauteur d'un monstre, en cases
    tailleBoss: 2.6,
    tailleOiseaux: 1.25
  };

  var PI2 = Math.PI * 2;
  var POLICE = "'Cinzel', 'Trajan Pro', Georgia, serif";

  function borner(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function signe(v) { return v < 0 ? -1 : 1; }
  function douce(k) { k = borner(k, 0, 1); return k * k * (3 - 2 * k); }

  // Le sol sur lequel se tient une stèle : les cases libres posées sur
  // une case solide, de part et d'autre de la stèle.
  function solDe(etat, x, y) {
    function libre(cx) { return !Moteur.estSolide(etat, cx, y) && Moteur.estSolide(etat, cx, y + 1); }
    var a = x, b = x;
    while (a - 1 >= 0 && libre(a - 1)) a--;
    while (b + 1 < etat.largeur && libre(b + 1)) b++;
    return { a: a, b: b };
  }

  // Le cri d'un monstre, selon sa façon d'attaquer
  function cri(def) {
    var g = def.genre;
    if (g === "rugissement" || g === "charge") return "rugissement";
    if (g === "pique" || g === "plumes") return "cri";
    if (g === "souffle") return "feu";
    return "sifflement";
  }
  function jouer(nom) { if (typeof Sons !== "undefined") Sons.jouer(nom); }

  // ---------------------------------------------------------------
  //  Placer les gardiens au début d'une salle
  // ---------------------------------------------------------------
  // choisirMonstre(stele) donne le monstre d'une stèle (voir jeu.js).
  function preparer(etat, choisirMonstre) {
    etat.gardiens = [];
    if (typeof Monstres === "undefined") return;
    etat.steles.forEach(function (s, i) {
      if (s.effet === "figure") return;          // les stèles d'Hermès n'ont pas de gardien
      var id = choisirMonstre(s);
      var def = Monstres.liste[id];
      if (!def) return;
      var sol = solDe(etat, s.x, s.y);
      var gauche = sol.a + 0.6, droite = sol.b + 0.4;
      var cote = etat.depart.x <= s.x ? 1 : -1;  // du côté opposé à l'entrée de la salle
      var place = borner(s.x + 0.5 + cote * REGLAGES.place, gauche, droite);
      var laisse = s.boss ? REGLAGES.laisseBoss : REGLAGES.laisse;
      etat.gardiens.push({
        stele: i, id: id, def: def, boss: !!s.boss, passif: !!s.bonus, vole: !!def.vole,
        place: place, x: place, y: s.y + 1,                    // y : la ligne de ses pieds
        min: Math.max(gauche, place - laisse), max: Math.min(droite, place + laisse),
        mode: s.resolue ? "vaincu" : "garde", t: 0, regard: -cote, vitesse: 0,
        pas: 0, ronde: 1, attente: Math.random() * 1.5, phase: Math.random() * 10,
        elanX: 0, tVaincu: -10
      });
    });
  }

  function gardienDe(etat, i) {
    var l = etat.gardiens || [];
    for (var k = 0; k < l.length; k++) if (l[k].stele === i) return l[k];
    return null;
  }

  // Avance vers une position, sans dépasser la laisse. Renvoie vrai si arrivé.
  function marcher(g, cible, vitesse, dt) {
    cible = borner(cible, g.min, g.max);
    var d = cible - g.x, pas = vitesse * dt;
    if (Math.abs(d) <= pas) { g.x = cible; g.vitesse = 0; return true; }
    g.x += signe(d) * pas;
    g.vitesse = vitesse;
    g.regard = signe(d);
    g.pas += pas;
    return false;
  }

  // ---------------------------------------------------------------
  //  Faire vivre les gardiens (appelé à chaque petit pas de temps)
  // ---------------------------------------------------------------
  // Renvoie le numéro de la stèle dont le gardien vient de sauter sur
  // Talos (le combat doit commencer), ou -1.
  function mettreAJour(etat, dt) {
    var liste = etat.gardiens || [];
    if (!liste.length || !etat.joueur) return -1;
    var j = etat.joueur;
    var tx = j.x + j.l / 2, ty = j.y + j.h;   // le milieu de Talos, et ses pieds
    var attaque = -1;
    for (var n = 0; n < liste.length; n++) {
      var g = liste[n], s = etat.steles[g.stele];
      if (s.resolue && g.mode !== "vaincu") { g.mode = "vaincu"; g.tVaincu = etat.temps; }
      if (g.mode === "vaincu" || g.mode === "combat") continue;
      g.t += dt;
      g.vitesse = 0;
      var dx = tx - g.x, dy = ty - g.y;
      var voit = !etat.figure && Math.abs(dx) < REGLAGES.vue && Math.abs(dy) < REGLAGES.vueHauteur &&
                 tx > g.min - 1.2 && tx < g.max + 1.2;
      var touche = !etat.figure && Math.abs(dx) < REGLAGES.contact && Math.abs(dy) < REGLAGES.contactHauteur;

      if (g.passif) {
        // Les oiseaux des stèles d'or volent sur place et regardent Talos
        if (Math.abs(dx) < 6) g.regard = signe(dx);
        continue;
      }

      switch (g.mode) {
        case "garde":
          if (voit) { alerter(g, dx); break; }
          // les cent pas devant la stèle, avec une pause à chaque bout
          if (g.attente > 0) { g.attente -= dt; break; }
          if (marcher(g, g.place + 0.6 * g.ronde, REGLAGES.vitesseRonde, dt)) { g.ronde = -g.ronde; g.attente = 1.2 + Math.random(); }
          break;
        case "alerte":
          g.regard = signe(dx);
          if (touche) { bondir(g); break; }
          if (g.t >= REGLAGES.alerte) { g.mode = "chasse"; g.t = 0; }
          break;
        case "chasse":
          if (touche) { bondir(g); break; }
          if (!voit) { g.mode = "retour"; g.t = 0; break; }
          marcher(g, tx - signe(dx) * 0.6, REGLAGES.vitesseChasse * (g.boss ? 0.85 : 1), dt);
          g.regard = signe(dx);
          break;
        case "elan":
          g.elanX = 0.45 * douce(g.t / REGLAGES.elan);
          if (g.t >= REGLAGES.elan) { g.mode = "combat"; g.elanX = 0; attaque = g.stele; }
          break;
        case "retour":
          if (voit) { alerter(g, dx); break; }
          if (marcher(g, g.place, REGLAGES.vitesseRetour, dt)) { g.mode = "garde"; g.t = 0; g.attente = 0.8; }
          break;
        case "calme":
          marcher(g, g.place, REGLAGES.vitesseRetour, dt);
          if (g.t >= REGLAGES.calme) { g.mode = "retour"; g.t = 0; }
          break;
      }
      if (attaque >= 0) break;
    }
    return attaque;
  }

  function alerter(g, dx) {
    g.mode = "alerte";
    g.t = 0;
    g.regard = signe(dx);
    jouer("alerte");
    if (g.boss) jouer(cri(g.def));
  }
  function bondir(g) {
    g.mode = "elan";
    g.t = 0;
    jouer(cri(g.def));
  }

  // Un gardien est-il en train de sauter sur Talos ? (Talos ne bouge plus)
  function enAttaque(etat) {
    var l = etat.gardiens || [];
    for (var k = 0; k < l.length; k++) if (l[k].mode === "elan") return true;
    return false;
  }

  // Le combat commence (jeu.js a ouvert la stèle n° i) : le gardien
  // vient se placer face à Talos.
  function commencerCombat(etat, i) {
    var g = gardienDe(etat, i);
    if (!g || g.mode === "vaincu") return;
    var j = etat.joueur, tx = j.x + j.l / 2;
    var cote = Math.abs(g.x - tx) > 0.05 ? signe(g.x - tx) : -g.regard;
    if (Math.abs(g.y - (j.y + j.h)) < REGLAGES.contactHauteur) g.x = borner(tx + cote * 1.1, g.min, g.max);
    g.regard = -cote;
    g.mode = "combat";
    g.t = 0;
    g.elanX = 0;
    // si un autre gardien était en train de bondir, il se calme
    (etat.gardiens || []).forEach(function (h) { if (h !== g && h.mode === "elan") { h.mode = "calme"; h.t = 0; h.elanX = 0; } });
  }

  // La stèle n° i se referme. issue : "victoire", "fuite" ou "ko".
  function apresCombat(etat, i, issue) {
    var g = gardienDe(etat, i);
    if (!g) return;
    g.t = 0;
    g.elanX = 0;
    if (issue === "victoire") { g.mode = "vaincu"; g.tVaincu = etat.temps; }
    else if (issue === "ko") { g.mode = "garde"; g.x = g.place; }
    else if (g.mode !== "vaincu") g.mode = "calme";
  }

  // Talos revient au départ de la salle : les gardiens retournent à leur place.
  function reinitialiser(etat) {
    (etat.gardiens || []).forEach(function (g) {
      if (g.mode === "vaincu") return;
      g.mode = "garde"; g.t = 0; g.x = g.place; g.elanX = 0; g.attente = 1;
    });
  }

  // ---------------------------------------------------------------
  //  Le dessin des gardiens, dans la salle (appelé par dessin.js)
  // ---------------------------------------------------------------
  function dessiner(ctx, etat, t, tps) {
    var liste = etat.gardiens || [];
    for (var n = 0; n < liste.length; n++) {
      var g = liste[n];
      if (g.mode === "combat") continue;
      if (g.mode === "vaincu") dessinerRuines(ctx, etat, g, t);
      else dessinerGardien(ctx, etat, g, t, tps);
    }
  }

  // La vie qui reste au monstre (les manches déjà gagnées l'ont blessé)
  function vieDe(s) {
    var n = s.exercices ? s.exercices.length : 1, total = 0, faits = 0;
    for (var k = 0; k < n; k++) {
      var coup = k >= n - 1 || k % 2 === 0;    // les attaques et le coup final
      if (coup) { total++; if (k < (s.manche || 0)) faits++; }
    }
    return total ? 1 - faits / total : 1;
  }

  function dessinerGardien(ctx, etat, g, t, tps) {
    var def = g.def, s = etat.steles[g.stele];
    var taille = g.boss ? REGLAGES.tailleBoss : (g.passif ? REGLAGES.tailleOiseaux : REGLAGES.tailleNormale);
    var echelle = taille * t / (def.hauteur || 250);
    var x = (g.x + g.regard * g.elanX) * t, y = g.y * t;
    // un petit balancement quand il marche, un vol sur place pour ceux qui volent
    if (g.vitesse > 0 && !g.vole) y -= Math.abs(Math.sin(g.pas * 3.2)) * t * 0.06;
    if (g.vole) y -= (0.12 + 0.08 * Math.sin(tps * 2.2 + g.phase)) * t;

    // l'ombre sur le sol
    var O = Decor.outils;
    ctx.fillStyle = "rgba(0,0,0," + (g.vole ? 0.16 : 0.3) + ")";
    O.ovale(ctx, g.x * t, g.y * t - 1, t * taille * 0.32, t * 0.07);

    // l'aura du boss, et celle d'un gardien qui a vu Talos
    var menace = g.mode === "alerte" || g.mode === "chasse" || g.mode === "elan";
    if (g.boss || menace) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      O.lueur(ctx, x, y - taille * t * 0.5, taille * t * (g.boss ? 0.95 : 0.75), def.rgb || "255,90,60",
        (g.boss ? 0.2 : 0) + (menace ? 0.16 : 0) + 0.06 * Math.sin(tps * 4 + g.phase));
      ctx.restore();
    }

    // le monstre lui-même (dessiné par monstres.js, tourné vers la droite)
    var action = "repos", k = 0;
    if (g.mode === "elan") { action = "attaque"; k = 0.55 * douce(g.t / REGLAGES.elan); }
    else if (g.mode === "alerte") { action = "rire"; k = Math.min(1, g.t / REGLAGES.alerte) * 0.6; }
    var j = etat.joueur;
    var portee = Math.max(160, Math.min(600, Math.abs((j.x + j.l / 2) - g.x) * t / echelle));
    var image = imageDuMonstre(ctx, g, taille * t, echelle, { t: tps + g.phase, action: action, k: k, portee: portee }, tps);
    if (image) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(g.regard, 1);
      ctx.drawImage(image.c, -image.ox, -image.oy, image.l, image.h);
      ctx.restore();
    }

    var haut = y - taille * t * (g.vole ? 1.05 : 1.0);
    // la vie du monstre, s'il a déjà été blessé (on peut fuir un combat)
    var vie = vieDe(s);
    if (vie < 1 || g.boss) {
      var bl = t * (g.boss ? 1.8 : 1.0), bh = Math.max(3, t * 0.09), bx = g.x * t - bl / 2, by = haut - t * 0.22;
      ctx.fillStyle = "rgba(20,10,6,0.75)";
      ctx.fillRect(bx - 1, by - 1, bl + 2, bh + 2);
      ctx.fillStyle = "#e0463a";
      ctx.fillRect(bx, by, bl * vie, bh);
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fillRect(bx, by, bl * vie, bh * 0.4);
      haut = by;
    }
    // le « ! » quand il voit Talos
    if (g.mode === "alerte" || g.mode === "elan" || (g.mode === "chasse" && g.t < 0.6)) {
      var age = g.mode === "alerte" ? g.t : REGLAGES.alerte + g.t;
      var pop = age < 0.15 ? 0.6 + 2.7 * age : 1;
      var r = t * 0.26 * pop, ex = g.x * t, ey = haut - t * 0.4;
      ctx.fillStyle = "#fff6e0";
      ctx.beginPath(); ctx.arc(ex, ey, r, 0, PI2); ctx.fill();
      ctx.strokeStyle = "#b8322a";
      ctx.lineWidth = Math.max(1.5, t * 0.05);
      ctx.stroke();
      ctx.fillStyle = "#b8322a";
      ctx.textAlign = "center";
      ctx.font = "700 " + Math.round(t * 0.36 * pop) + "px " + POLICE;
      ctx.fillText(g.boss ? "!!" : "!", ex, ey + t * 0.13 * pop);
    }
  }

  // Dessiner un monstre est long (beaucoup de dégradés) : on le dessine
  // dans une petite image à part, refaite une douzaine de fois par seconde
  // (à chaque image pendant son bond), puis on pose cette image dans la salle.
  function imageDuMonstre(ctx, g, H, echelle, a, tps) {
    var ratio = (ctx.getTransform && ctx.getTransform().a) || window.devicePixelRatio || 1;
    var l = Math.ceil(H * 2.3), h = Math.ceil(H * 1.65), ox = H * 1.15, oy = H * 1.45;
    var im = g.image;
    if (!im || im.l !== l || im.h !== h || im.ratio !== ratio) {
      var c = document.createElement("canvas");
      c.width = Math.max(1, Math.round(l * ratio));
      c.height = Math.max(1, Math.round(h * ratio));
      im = g.image = { c: c, x: c.getContext("2d"), l: l, h: h, ox: ox, oy: oy, ratio: ratio, tps: -99, cle: "" };
    }
    var cle = a.action + "|" + (a.action === "repos" ? 0 : Math.round(a.k * 60));
    if (cle === im.cle && Math.abs(tps - im.tps) < 1 / 12) return im;
    im.cle = cle;
    im.tps = tps;
    var k = im.x;
    k.setTransform(1, 0, 0, 1, 0, 0);
    k.clearRect(0, 0, im.c.width, im.c.height);
    k.setTransform(ratio * echelle, 0, 0, ratio * echelle, ox * ratio, oy * ratio);
    k.lineJoin = "round";
    k.lineCap = "round";
    try { g.def.dessiner(k, a); } catch (e) { }
    return im;
  }

  // Les restes d'un gardien changé en pierre : un tas de blocs gris
  function dessinerRuines(ctx, etat, g, t) {
    var x = g.x * t, y = g.y * t, e = t * (g.boss ? 1.5 : 1);
    var age = etat.temps - g.tVaincu;
    var monte = age >= 0 && age < 0.5 ? douce(age / 0.5) : 1;
    var blocs = [[-0.32, 0.2, 0.22], [0.05, 0.24, 0.26], [0.34, 0.16, 0.18], [-0.1, 0.42, 0.2], [0.2, 0.4, 0.15]];
    blocs.forEach(function (b, n) {
      var bx = x + b[0] * e, r = b[2] * e, by = y - (b[1] * e) * monte - r * 0.2 + (n > 2 ? 0 : r * 0.35);
      ctx.fillStyle = n % 2 ? "#8f887a" : "#a59d8c";
      ctx.beginPath();
      ctx.moveTo(bx - r, by + r * 0.6);
      ctx.lineTo(bx - r * 0.7, by - r * 0.5);
      ctx.lineTo(bx + r * 0.3, by - r * 0.75);
      ctx.lineTo(bx + r, by - r * 0.1);
      ctx.lineTo(bx + r * 0.8, by + r * 0.6);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(60,54,44,0.7)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ctx.fillRect(bx - r * 0.5, by - r * 0.5, r * 0.6, r * 0.18);
    });
    // la poussière, juste après la victoire
    if (age >= 0 && age < 1.2) {
      var k = age / 1.2;
      ctx.fillStyle = "rgba(205,195,175," + (0.4 * (1 - k)).toFixed(3) + ")";
      for (var c = -1; c <= 1; c += 2) Decor.outils.ovale(ctx, x + c * e * (0.3 + 0.6 * k), y - e * 0.08, e * 0.18 * (1 + k), e * 0.08 * (1 + k));
    }
  }

  return {
    REGLAGES: REGLAGES,
    preparer: preparer,
    mettreAJour: mettreAJour,
    enAttaque: enAttaque,
    commencerCombat: commencerCombat,
    apresCombat: apresCombat,
    reinitialiser: reinitialiser,
    dessiner: dessiner
  };
})();
