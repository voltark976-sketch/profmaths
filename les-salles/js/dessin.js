// =====================================================================
//  DESSIN : afficher la salle à l'écran (vue de côté)
// =====================================================================
//  On dessine dans un « canvas » : une zone rectangulaire de la page
//  où l'on peut tracer des formes. Chaque case du plan devient un
//  carré de quelques dizaines de pixels, et toute la salle tient à
//  l'écran.
//
//  Le décor (fonds, murs, effets du ciel...) vient de decor.js et des
//  fichiers d'ambiances. Ce fichier dessine par-dessus ce qui fait le
//  jeu : dalles, portes, passerelles, stèles, inscriptions, bustes des
//  mathématiciens, gardiens (gardiens.js) et Talos, avec leurs petites
//  animations, et les figures acrobatiques des stèles d'Hermès.
//
//  Deux horloges servent aux animations :
//   - le temps du jeu (etat.temps), qui s'arrête quand une fenêtre est
//     ouverte : une stèle résolue s'illumine quand on referme le parchemin ;
//   - le temps « ambiant » (infos.tps), qui ne s'arrête jamais : les
//     flammes et les nuages continuent de bouger derrière les fenêtres.
//  Ce fichier ne modifie jamais l'état du jeu.
// =====================================================================

var Dessin = (function () {

  var C = {
    marbre:       "#e9e2d2",
    marbreOmbre:  "#c4b8a1",
    marbreClair:  "#fbf5e8",
    marbreFonce:  "#9c8f78",
    or:           "#e2b24c",
    orClair:      "#f6d47a",
    orSombre:     "#9b7226",
    bronze:       "#c47b36",
    bronzeClair:  "#eaa75f",
    bronzeSombre: "#7a471c",
    oeil:         "#fff3c4",
    pierre:       "#b0a998",
    pierreSombre: "#6f6858",
    fantome:      "rgba(205, 70, 55, 0.45)",
    fantomeBord:  "#e0604c",
    texte:        "#fbf5e8",
    encre:        "#2b2015"
  };

  var PI2 = Math.PI * 2;
  var POLICE = "'Cinzel', 'Trajan Pro', Georgia, serif";
  var TAILLE_MAX = 52; // taille maximale d'une case, en pixels
  var O = Decor.outils;

  // decor = { etat, p (le décor préparé), murs, vignette, entree }
  var decor = null;
  var taille = 32;

  // Calcule la taille du canvas pour que toute la salle tienne,
  // puis prépare les calques fixes (fond, murs, vignette).
  function ajuster(canvas, etat) {
    var parent = canvas.parentElement;
    var style = window.getComputedStyle(parent);
    var dispoL = parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    var dispoH = parent.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);

    var t = Math.floor(Math.min(dispoL / etat.largeur, dispoH / etat.hauteur, TAILLE_MAX));
    if (!(t >= 4)) t = 4;
    taille = t;

    var ratio = window.devicePixelRatio || 1;
    var L = t * etat.largeur, H = t * etat.hauteur;
    canvas.style.width = L + "px";
    canvas.style.height = H + "px";
    canvas.width = Math.round(L * ratio);
    canvas.height = Math.round(H * ratio);
    canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);

    var p = Decor.preparer(etat, t, ratio);

    var murs = document.createElement("canvas");
    murs.width = canvas.width;
    murs.height = canvas.height;
    var cm = murs.getContext("2d");
    cm.setTransform(ratio, 0, 0, ratio, 0, 0);
    Decor.dessinerMurs(cm, etat, t, p);

    var vignette = document.createElement("canvas");
    vignette.width = canvas.width;
    vignette.height = canvas.height;
    var cv = vignette.getContext("2d");
    cv.setTransform(ratio, 0, 0, ratio, 0, 0);
    var v = cv.createRadialGradient(L / 2, H / 2, Math.min(L, H) * 0.4, L / 2, H / 2, Math.max(L, H) * 0.75);
    v.addColorStop(0, "rgba(0,0,0,0)");
    v.addColorStop(1, p.amb.vignette || "rgba(0,0,0,0.35)");
    cv.fillStyle = v;
    cv.fillRect(0, 0, L, H);

    var nouvelle = !decor || decor.etat !== etat;
    decor = { etat: etat, p: p, murs: murs, vignette: vignette, entree: nouvelle ? performance.now() : decor.entree };
  }

  // =================================================================
  //  Une image complète
  // =================================================================
  // infos = { steleProche, guideProche, inscriptionProche, receptionProche, parures, tps, mouvementReduit }
  function dessiner(canvas, etat, infos) {
    infos = infos || {};
    if (!decor || decor.etat !== etat) ajuster(canvas, etat);
    var ctx = canvas.getContext("2d");
    var t = taille, p = decor.p;
    var L = t * etat.largeur, H = t * etat.hauteur;
    var tps = typeof infos.tps === "number" ? infos.tps : performance.now() / 1000;
    var j = etat.joueur;
    var decalage = infos.mouvementReduit ? 0 : ((j.x + j.l / 2) / etat.largeur - 0.5) * 2;

    Decor.dessinerFond(ctx, p, tps, decalage);
    ctx.drawImage(decor.murs, 0, 0, L, H);

    for (var y = 0; y < etat.hauteur; y++) {
      for (var x = 0; x < etat.largeur; x++) {
        if (etat.cases[y][x] === "dalle") dessinerDalle(ctx, etat, x, y, t, tps);
      }
    }
    dessinerPortes(ctx, etat, t, tps);
    dessinerPasserelle(ctx, etat, t, tps);
    (etat.inscriptions || []).forEach(function (ins, i) { dessinerInscription(ctx, ins, t, i === infos.inscriptionProche, tps); });
    etat.guides.forEach(function (g, i) { dessinerBuste(ctx, g, t, i === infos.guideProche, tps); });
    etat.steles.forEach(function (s, i) { if (s.effet === "figure") dessinerReception(ctx, etat, s, t, i === infos.receptionProche, tps); });
    etat.steles.forEach(function (s, i) { dessinerStele(ctx, etat, s, t, i === infos.steleProche, tps); });
    if (typeof Gardiens !== "undefined" && etat.gardiens) Gardiens.dessiner(ctx, etat, t, tps);
    dessinerFigure(ctx, etat, t);
    dessinerTalos(ctx, etat, t, tps, infos.parures || {}, !!p.amb.sombre);

    Decor.dessinerAvant(ctx, p, tps);
    ctx.drawImage(decor.vignette, 0, 0, L, H);

    // Ouverture en fondu à l'entrée dans une salle
    if (!infos.mouvementReduit) {
      var k = (performance.now() - decor.entree) / 500;
      if (k < 1) {
        ctx.fillStyle = "rgba(10,7,4," + (1 - k).toFixed(3) + ")";
        ctx.fillRect(0, 0, L, H);
      }
    }
  }

  // ---- Petits outils ----
  function disque(ctx, x, y, r) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, PI2); ctx.fill(); }
  function ovale(ctx, x, y, rx, ry, rot) {
    ctx.beginPath();
    ctx.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot || 0, 0, PI2);
    ctx.fill();
  }
  function lueurAjoutee(ctx, x, y, r, rgb, a) {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    O.lueur(ctx, x, y, r, rgb, a);
    ctx.restore();
  }
  // Une petite étoile à quatre branches (scintillement).
  function etincelle(ctx, x, y, r, couleur) {
    ctx.fillStyle = couleur;
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.quadraticCurveTo(x, y, x, y + r);
    ctx.quadraticCurveTo(x, y, x - r, y);
    ctx.quadraticCurveTo(x, y, x, y - r);
    ctx.fill();
  }
  // Un éclat de lumière : un anneau qui s'agrandit et des étincelles projetées.
  // tau = secondes écoulées depuis l'événement.
  function eclat(ctx, x, y, t, tau, rgb, n) {
    if (!(tau >= 0) || tau > 1.2) return;
    var k = tau / 1.2;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "rgba(" + rgb + "," + (0.8 * (1 - k)).toFixed(3) + ")";
    ctx.lineWidth = Math.max(1.5, t * 0.07 * (1 - k));
    ctx.beginPath();
    ctx.arc(x, y, t * (0.2 + 1.3 * Math.sqrt(k)), 0, PI2);
    ctx.stroke();
    for (var i = 0; i < n; i++) {
      var a = i / n * PI2 + 0.3, v = t * (2.2 + (i % 3) * 0.7);
      var px = x + Math.cos(a) * v * tau, py = y + Math.sin(a) * v * tau + 2.5 * t * tau * tau;
      var s = Math.max(1.5, t * 0.07 * (1 - k * 0.5));
      ctx.fillStyle = "rgba(" + rgb + "," + (1 - k).toFixed(3) + ")";
      ctx.fillRect(px - s / 2, py - s / 2, s, s);
    }
    ctx.restore();
  }

  // =================================================================
  //  Dalles, portes, passerelle
  // =================================================================
  function dessinerDalle(ctx, etat, x, y, t, tps) {
    var px = x * t, py = y * t, hp = t * 0.2;
    var allumee = etat.dallesAllumees[x + "," + y];
    if (allumee) {
      var tau = etat.temps - allumee;
      var a = 0.4 + 0.12 * Math.sin(tps * 2.5 + x);
      var halo = ctx.createLinearGradient(0, py + t - hp, 0, py - t * 0.45);
      halo.addColorStop(0, "rgba(255,210,110," + a.toFixed(3) + ")");
      halo.addColorStop(1, "rgba(255,210,110,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(px + t * 0.08, py - t * 0.45, t * 0.84, t * 1.45 - hp);
      for (var k = 0; k < 3; k++) {
        var u = O.boucler(tps * 0.6 + k / 3 + x * 0.37, 0, 1);
        var sx = px + t * (0.2 + 0.6 * ((k * 0.61 + x * 0.13) % 1));
        etincelle(ctx, sx, py + t - hp - u * t * 1.3, t * 0.05, "rgba(255,240,180," + Math.sin(Math.PI * u).toFixed(3) + ")");
      }
      if (tau >= 0 && tau < 0.8) {
        var q = tau / 0.8;
        ctx.strokeStyle = "rgba(255,230,150," + (1 - q).toFixed(3) + ")";
        ctx.lineWidth = Math.max(1.5, t * 0.05);
        ctx.beginPath();
        ctx.ellipse(px + t / 2, py + t - hp / 2, t * (0.4 + 0.9 * q), t * (0.1 + 0.25 * q), 0, 0, PI2);
        ctx.stroke();
      }
    }
    ctx.fillStyle = allumee ? C.or : C.orSombre;
    ctx.fillRect(px + t * 0.08, py + t - hp, t * 0.84, hp);
    ctx.fillStyle = allumee ? C.orClair : "#b48a3a";
    ctx.fillRect(px + t * 0.08, py + t - hp, t * 0.84, Math.max(1, hp * 0.18));
    ctx.strokeStyle = allumee ? C.marbreClair : C.bronzeSombre;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(px + t / 2, py + t - hp / 2, hp * 0.3, 0, PI2);
    ctx.stroke();
  }

  // Les portes : on regroupe les cases « sortie » d'une même colonne.
  function dessinerPortes(ctx, etat, t, tps) {
    for (var x = 0; x < etat.largeur; x++) {
      var y = 0;
      while (y < etat.hauteur) {
        if (etat.cases[y][x] !== "sortie") { y++; continue; }
        var y1 = y;
        while (y < etat.hauteur && etat.cases[y][x] === "sortie") y++;
        dessinerPorte(ctx, etat, x, y1, y - 1, t, tps);
      }
    }
  }

  function dessinerPorte(ctx, etat, x, y1, y2, t, tps) {
    var px = x * t, py = y1 * t, h = (y2 - y1 + 1) * t, m = t * 0.06;
    var dehorsAGauche = x === 0;
    var k = 0;
    if (etat.porteOuverte) {
      var tau = etat.temps - (typeof etat.instantOuverture === "number" ? etat.instantOuverture : -10);
      k = Math.min(1, Math.max(0, tau / 0.8));
      k = 1 - Math.pow(1 - k, 3);
      var lum = ctx.createLinearGradient(dehorsAGauche ? px + t : px, 0, dehorsAGauche ? px : px + t, 0);
      lum.addColorStop(0, "rgba(255,226,150,0.3)");
      lum.addColorStop(1, "rgba(255,244,205,0.95)");
      ctx.fillStyle = lum;
      ctx.fillRect(px + m, py, t - 2 * m, h);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      var cote = dehorsAGauche ? 1 : -1;
      for (var r = 0; r < 3; r++) {
        var a = (0.1 + 0.07 * Math.sin(tps * 1.6 + r * 2)) * k;
        ctx.fillStyle = "rgba(255,230,160," + a.toFixed(3) + ")";
        ctx.beginPath();
        var yr = py + h * (0.2 + 0.3 * r);
        ctx.moveTo(px + (dehorsAGauche ? t : 0), yr);
        ctx.lineTo(px + (dehorsAGauche ? t : 0) + cote * t * 2.6, yr - t * 0.5);
        ctx.lineTo(px + (dehorsAGauche ? t : 0) + cote * t * 2.6, yr + t * 0.5);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
    var lb = (t - 2 * m) / 2 * (1 - 0.85 * k);
    var g = ctx.createLinearGradient(px, 0, px + t, 0);
    g.addColorStop(0, C.bronzeSombre); g.addColorStop(0.5, C.bronze); g.addColorStop(1, C.bronzeSombre);
    [px + m, px + t - m - lb].forEach(function (bx, cote) {
      ctx.fillStyle = g;
      ctx.fillRect(bx, py, lb, h);
      ctx.strokeStyle = C.bronzeSombre;
      ctx.lineWidth = 1;
      if (lb > t * 0.12) {
        for (var n = 0; n < (y2 - y1 + 1); n++) ctx.strokeRect(bx + lb * 0.18, py + n * t + t * 0.14, lb * 0.64, t * 0.72);
        ctx.fillStyle = C.bronzeClair;
        for (var c = 0; c < (y2 - y1 + 1) * 2; c++) disque(ctx, bx + lb * 0.5, py + t * (0.25 + c * 0.5), Math.max(1.2, t * 0.035));
        if (k < 0.3) {
          ctx.strokeStyle = C.or;
          ctx.lineWidth = Math.max(1, t * 0.04);
          ctx.beginPath();
          ctx.arc(cote === 0 ? bx + lb - t * 0.08 : bx + t * 0.08, py + h / 2, t * 0.07, 0, PI2);
          ctx.stroke();
        }
      }
    });
    if (k < 0.5) {
      ctx.fillStyle = "rgba(226,178,76," + (1 - 2 * k).toFixed(3) + ")";
      ctx.font = "700 " + Math.round(t * 0.34) + "px " + POLICE;
      ctx.textAlign = "center";
      ctx.fillText("Ω", px + t / 2, py + t * 0.42);
    }
    ctx.fillStyle = C.orSombre;
    ctx.fillRect(px - t * 0.05, py - t * 0.14, t * 1.1, t * 0.14);
    ctx.fillStyle = C.or;
    ctx.fillRect(px - t * 0.05, py - t * 0.14, t * 1.1, Math.max(1, t * 0.03));
  }

  function ancrage(ctx, x, y, t) {
    ctx.fillStyle = C.orSombre;
    ctx.fillRect(x - t * 0.05, y - t * 0.32, t * 0.1, t * 0.32);
    ctx.fillStyle = C.or;
    disque(ctx, x, y - t * 0.34, t * 0.07);
  }

  // La passerelle : invisible tant qu'elle n'est pas construite (seuls ses
  // ancrages dorés se voient), puis les dalles de marbre apparaissent une à une.
  // Une réponse fausse montre une passerelle « fantôme » rouge de la mauvaise longueur.
  function dessinerPasserelle(ctx, etat, t, tps) {
    if (etat.passerelle.length === 0) return;
    var cases = etat.passerelle.slice().sort(function (a, b) { return a.x - b.x; });
    var debut = cases[0], fin = cases[cases.length - 1];
    ancrage(ctx, debut.x * t, debut.y * t, t);
    ancrage(ctx, (fin.x + 1) * t, fin.y * t, t);
    if (etat.passerelleConstruite) {
      var tau = typeof etat.instantPasserelle === "number" ? etat.temps - etat.instantPasserelle : 99;
      for (var i = 0; i < cases.length; i++) {
        var c = cases[i], u = (tau - i * 0.08) / 0.25;
        if (u <= 0) continue;
        if (u > 1) u = 1;
        var px = c.x * t, py = c.y * t - (1 - u) * t * 0.4;
        ctx.globalAlpha = u;
        ctx.fillStyle = C.marbre; ctx.fillRect(px, py, t, t * 0.5);
        ctx.fillStyle = C.or; ctx.fillRect(px, py, t, Math.max(2, t * 0.08));
        ctx.strokeStyle = C.marbreOmbre; ctx.lineWidth = 1; ctx.strokeRect(px + 0.5, py + 0.5, t - 1, t * 0.5 - 1);
        var reflet = Math.max(0, Math.sin(tps * 2 - c.x * 0.5));
        ctx.fillStyle = "rgba(255,245,210," + (0.5 * Math.pow(reflet, 8)).toFixed(3) + ")";
        ctx.fillRect(px, py, t, Math.max(2, t * 0.08));
        ctx.globalAlpha = 1;
        if (u < 1) lueurAjoutee(ctx, px + t / 2, py + t * 0.25, t * 0.9, "255,215,120", 0.6 * (1 - u));
      }
      return;
    }
    // Des points dorés marquent l'endroit où la passerelle apparaîtra.
    for (var d = 0; d < cases.length; d++) {
      var ad = 0.35 + 0.25 * Math.sin(tps * 2 - d * 0.6);
      ctx.fillStyle = "rgba(226,178,76," + ad.toFixed(3) + ")";
      ctx.fillRect(cases[d].x * t + t * 0.45, cases[d].y * t + t * 0.05, t * 0.1, t * 0.1);
    }
    if (etat.passerelleFantome !== null) {
      var longueur = Math.min(etat.passerelleFantome, etat.largeur - debut.x);
      ctx.globalAlpha = 0.75 + 0.25 * Math.sin(tps * 6);
      ctx.fillStyle = C.fantome;
      ctx.fillRect(debut.x * t, debut.y * t, longueur * t, t * 0.5);
      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = C.fantomeBord; ctx.lineWidth = 1.5;
      ctx.strokeRect(debut.x * t + 0.75, debut.y * t + 0.75, Math.max(0, longueur * t - 1.5), t * 0.5 - 1.5);
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      ctx.fillStyle = C.texte;
      ctx.font = "600 " + Math.round(t * 0.32) + "px " + POLICE;
      ctx.textAlign = "left";
      ctx.fillText("longueur " + etat.passerelleFantome, debut.x * t + 4, debut.y * t + t * 0.85);
    }
  }

  // =================================================================
  //  Inscriptions d'Athéna (les tablettes du tutoriel)
  // =================================================================
  function dessinerInscription(ctx, ins, t, proche, tps) {
    var cx = ins.x * t + t / 2, bas = (ins.y + 1) * t;
    var l = t * 0.72, h = t * 0.6;
    var x0 = cx - l / 2, y0 = bas - t * 0.28 - h;
    // Un halo doré qui respire, plus fort quand Talos est tout près.
    var a = (proche ? 0.42 : 0.2) + 0.08 * Math.sin(tps * 2 + ins.x);
    lueurAjoutee(ctx, cx, y0 + h / 2, t * 0.95, "255,215,120", a);
    // Le pied
    ctx.fillStyle = "#a59d88";
    ctx.fillRect(cx - t * 0.07, bas - t * 0.3, t * 0.14, t * 0.3);
    ctx.fillRect(cx - t * 0.2, bas - t * 0.06, t * 0.4, t * 0.06);
    // La tablette
    ctx.fillStyle = proche ? "#ddd5c0" : "#cfc6b0";
    O.rectArrondi(ctx, x0, y0, l, h, t * 0.06);
    ctx.fill();
    ctx.strokeStyle = "#8a8170";
    ctx.lineWidth = 1;
    ctx.stroke();
    // La chouette d'Athéna, gravée en or
    var ox = cx - l * 0.24, oy = y0 + h * 0.56, u = t * 0.045;
    ctx.fillStyle = C.orSombre;
    ovale(ctx, ox, oy + u * 1.1, u * 1.5, u * 2.0);
    ovale(ctx, ox, oy - u * 1.3, u * 1.45, u * 1.2);
    ctx.beginPath();
    ctx.moveTo(ox - u * 1.4, oy - u * 1.8); ctx.lineTo(ox - u * 1.1, oy - u * 2.9); ctx.lineTo(ox - u * 0.4, oy - u * 2.3);
    ctx.closePath();
    ctx.moveTo(ox + u * 1.4, oy - u * 1.8); ctx.lineTo(ox + u * 1.1, oy - u * 2.9); ctx.lineTo(ox + u * 0.4, oy - u * 2.3);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = C.orClair;
    disque(ctx, ox - u * 0.6, oy - u * 1.3, u * 0.55);
    disque(ctx, ox + u * 0.6, oy - u * 1.3, u * 0.55);
    ctx.fillStyle = C.encre;
    disque(ctx, ox - u * 0.6, oy - u * 1.3, u * 0.25);
    disque(ctx, ox + u * 0.6, oy - u * 1.3, u * 0.25);
    // Des lignes de texte gravées
    ctx.fillStyle = "#8a8170";
    for (var i = 0; i < 3; i++) ctx.fillRect(cx - l * 0.04, y0 + h * (0.3 + i * 0.19), l * 0.38, Math.max(1, t * 0.025));
  }

  // =================================================================
  //  Stèles : de pierre (exercice) ou d'or (automatisme facultatif)
  // =================================================================
  function cheminStele(ctx, x0, y0, l, bas) {
    ctx.beginPath();
    ctx.moveTo(x0, bas);
    ctx.lineTo(x0, y0 + l / 2);
    ctx.arc(x0 + l / 2, y0 + l / 2, l / 2, Math.PI, 0);
    ctx.lineTo(x0 + l, bas);
    ctx.closePath();
  }

  function dessinerStele(ctx, etat, s, t, proche, tps) {
    if (s.effet === "figure") { dessinerHermes(ctx, etat, s, t, proche, tps); return; }
    if (s.boss) { dessinerSteleBoss(ctx, etat, s, t, proche, tps); return; }
    var cx = s.x * t + t / 2, bas = (s.y + 1) * t;
    var marche = t * 0.08, socle = bas - marche;
    var l = t * (s.bonus ? 0.52 : 0.64), h = t * (s.bonus ? 0.76 : 0.92);
    var x0 = cx - l / 2, y0 = socle - h;

    // Le halo : doré si résolue, doré qui pulse pour une stèle d'or,
    // bleu qui pulse pour une stèle de pierre qui attend sa réponse.
    if (s.resolue) lueurAjoutee(ctx, cx, y0 + h * 0.45, t * 1.1, "255,215,120", 0.45 + 0.08 * Math.sin(tps * 2 + s.x));
    else if (s.bonus) lueurAjoutee(ctx, cx, y0 + h * 0.45, t * 1.0, "255,215,120", 0.24 + 0.12 * Math.sin(tps * 2.4 + s.x));
    else lueurAjoutee(ctx, cx, y0 + h * 0.45, t * 1.0, "140,190,255", (proche ? 0.32 : 0.18) + 0.1 * Math.sin(tps * 2.2 + s.x));

    // La marche du socle
    ctx.fillStyle = s.bonus ? C.orSombre : C.pierreSombre;
    ctx.fillRect(cx - l * 0.65, socle, l * 1.3, marche);

    // Le corps, avec un léger modelé
    var g = ctx.createLinearGradient(x0, 0, x0 + l, 0);
    if (s.bonus) {
      g.addColorStop(0, "#b8862e"); g.addColorStop(0.45, proche && !s.resolue ? "#f6d47a" : "#e8bc58"); g.addColorStop(1, "#9b7226");
    } else {
      g.addColorStop(0, "#9a927f"); g.addColorStop(0.45, proche && !s.resolue ? "#d2cab6" : "#bcb4a0"); g.addColorStop(1, "#857d6b");
    }
    ctx.fillStyle = g;
    cheminStele(ctx, x0, y0, l, socle);
    ctx.fill();
    ctx.strokeStyle = s.bonus ? C.orSombre : C.pierreSombre;
    ctx.lineWidth = 1;
    ctx.stroke();
    var e = l * 0.12;
    cheminStele(ctx, x0 + e, y0 + e, l - 2 * e, socle - e * 0.6);
    ctx.strokeStyle = s.bonus ? "rgba(120,80,20,0.55)" : "rgba(80,74,60,0.5)";
    ctx.stroke();

    // Sur l'or : un reflet qui glisse et quelques étincelles
    if (s.bonus) {
      ctx.save();
      cheminStele(ctx, x0, y0, l, socle);
      ctx.clip();
      var u = O.boucler(tps * 0.6 + s.x * 0.3, 0, 2.2);
      var bx = x0 - l + u * l * 1.5;
      ctx.fillStyle = "rgba(255,250,225,0.45)";
      ctx.beginPath();
      ctx.moveTo(bx, socle); ctx.lineTo(bx + l * 0.25, socle);
      ctx.lineTo(bx + l * 0.25 + h * 0.6, y0); ctx.lineTo(bx + h * 0.6, y0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      for (var k = 0; k < 3; k++) {
        var ph = O.boucler(tps * 0.5 + k * 0.37 + s.x * 0.21, 0, 1);
        var al = Math.max(0, Math.sin(ph * Math.PI));
        etincelle(ctx, cx + l * (k - 1) * 0.55, y0 + h * (0.1 + 0.3 * k), t * 0.08 * al + 0.1, "rgba(255,248,215," + al.toFixed(3) + ")");
      }
    }

    // Le signe gravé
    ctx.textAlign = "center";
    ctx.font = "700 " + Math.round(t * (s.bonus ? 0.34 : 0.4)) + "px " + POLICE;
    if (s.resolue) {
      ctx.fillStyle = s.bonus ? C.marbreClair : C.or;
      ctx.fillText("Ω", cx, y0 + h * (s.bonus ? 0.6 : 0.55));
    } else if (s.bonus) {
      ctx.fillStyle = C.bronzeSombre;
      ctx.fillText("+", cx, y0 + h * 0.6);
    } else {
      lueurAjoutee(ctx, cx, y0 + h * 0.42, t * 0.3, "120,170,255", 0.35 + 0.25 * Math.sin(tps * 3 + s.x));
      ctx.fillStyle = "rgba(38,64,112," + (0.7 + 0.3 * Math.sin(tps * 3 + s.x)).toFixed(3) + ")";
      ctx.fillText("?", cx, y0 + h * 0.55);
    }
    if (!s.bonus) {
      ctx.fillStyle = C.pierreSombre;
      for (var i = 0; i < 3; i++) ctx.fillRect(x0 + l * 0.24, y0 + h * (0.68 + i * 0.08), l * 0.52, 1);
    }

    // L'éclat de lumière au moment où la stèle est résolue
    if (s.resolue && typeof s.instantResolue === "number") {
      eclat(ctx, cx, y0 + h * 0.45, t, etat.temps - s.instantResolue, s.bonus ? "255,235,160" : "255,215,120", 18);
    }

    // La touche E, qui flotte au-dessus de la stèle
    if (proche && !s.resolue) {
      var kk = t * 0.36, kx = cx, ky = y0 - t * 0.38 + Math.sin(tps * 4) * t * 0.05;
      ctx.fillStyle = C.marbreClair;
      O.rectArrondi(ctx, kx - kk / 2, ky - kk / 2, kk, kk, t * 0.06);
      ctx.fill();
      ctx.strokeStyle = C.orSombre;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = C.encre;
      ctx.font = "700 " + Math.round(t * 0.26) + "px " + POLICE;
      ctx.textAlign = "center";
      ctx.fillText("E", kx, ky + t * 0.09);
    }
  }

  // La touche E qui flotte au-dessus d'un objet
  function toucheE(ctx, kx, ky, t) {
    var kk = t * 0.36;
    ctx.fillStyle = C.marbreClair;
    O.rectArrondi(ctx, kx - kk / 2, ky - kk / 2, kk, kk, t * 0.06);
    ctx.fill();
    ctx.strokeStyle = C.orSombre;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = C.encre;
    ctx.font = "700 " + Math.round(t * 0.26) + "px " + POLICE;
    ctx.textAlign = "center";
    ctx.fillText("E", kx, ky + t * 0.09);
  }

  // Une flèche qui tourne en rond (le signe d'un salto)
  function fleche(ctx, x, y, r, couleur, epaisseur) {
    ctx.strokeStyle = couleur;
    ctx.fillStyle = couleur;
    ctx.lineWidth = epaisseur;
    ctx.beginPath();
    ctx.arc(x, y, r, -Math.PI * 0.35, Math.PI * 1.45);
    ctx.stroke();
    var a = Math.PI * 1.45, px = x + Math.cos(a) * r, py = y + Math.sin(a) * r, p = r * 0.55;
    ctx.beginPath();
    ctx.moveTo(px + p * 0.9, py - p * 0.2);
    ctx.lineTo(px - p * 0.2, py - p * 0.75);
    ctx.lineTo(px - p * 0.15, py + p * 0.55);
    ctx.closePath();
    ctx.fill();
  }

  // Deux petites ailes, comme celles des sandales d'Hermès.
  // battement : de -1 à 1 ; ouvert : l'écart des ailes.
  function ailes(ctx, cx, cy, r, battement, couleur, bord) {
    for (var cote = -1; cote <= 1; cote += 2) {
      ctx.save();
      ctx.translate(cx + cote * r * 0.35, cy);
      ctx.scale(cote, 1);
      ctx.rotate(-0.35 - 0.25 * battement);
      for (var k = 0; k < 3; k++) {
        ctx.fillStyle = couleur;
        ctx.beginPath();
        ctx.ellipse(r * (0.55 - k * 0.04), -k * r * 0.2, r * (0.62 - k * 0.14), r * 0.15, -k * 0.28, 0, PI2);
        ctx.fill();
        if (bord) { ctx.strokeStyle = bord; ctx.lineWidth = 1; ctx.stroke(); }
      }
      ctx.restore();
    }
  }

  // =================================================================
  //  Stèle d'Hermès : un problème, et la récompense est une figure
  //  acrobatique (salto, double salto) jusqu'à la réception R
  // =================================================================
  function dessinerHermes(ctx, etat, s, t, proche, tps) {
    var cx = s.x * t + t / 2, bas = (s.y + 1) * t;
    var marche = t * 0.08, socle = bas - marche;
    var l = t * 0.56, h = t * 0.86;
    var x0 = cx - l / 2, y0 = socle - h;
    var bat = Math.sin(tps * (s.resolue ? 9 : 3) + s.x);

    // le halo bleu-argent, plus vif quand la stèle est résolue
    lueurAjoutee(ctx, cx, y0 + h * 0.45, t * 1.1, "170,215,255", (s.resolue ? 0.42 : (proche ? 0.32 : 0.2)) + 0.08 * Math.sin(tps * 2.3 + s.x));
    ctx.fillStyle = "#6f7f8f";
    ctx.fillRect(cx - l * 0.65, socle, l * 1.3, marche);
    var g = ctx.createLinearGradient(x0, 0, x0 + l, 0);
    g.addColorStop(0, "#9eabb8"); g.addColorStop(0.45, proche ? "#eef4fa" : "#d6dee6"); g.addColorStop(1, "#7f8c99");
    ctx.fillStyle = g;
    cheminStele(ctx, x0, y0, l, socle);
    ctx.fill();
    ctx.strokeStyle = "#56636f";
    ctx.lineWidth = 1;
    ctx.stroke();
    var e = l * 0.12;
    cheminStele(ctx, x0 + e, y0 + e, l - 2 * e, socle - e * 0.6);
    ctx.strokeStyle = "rgba(70,90,110,0.5)";
    ctx.stroke();

    // les ailes d'Hermès au sommet : elles battent quand la stèle est résolue
    ailes(ctx, cx, y0 + h * 0.08, t * 0.3, bat, s.resolue ? "#fffaf0" : "#e9eef3", "rgba(70,90,110,0.6)");
    // le signe gravé
    ctx.textAlign = "center";
    ctx.font = "700 " + Math.round(t * 0.36) + "px " + POLICE;
    if (s.resolue) {
      lueurAjoutee(ctx, cx, y0 + h * 0.55, t * 0.32, "200,230,255", 0.5);
      var n = s.figure === "double" ? 2 : 1;
      for (var q = 0; q < n; q++) fleche(ctx, cx + (q - (n - 1) / 2) * t * 0.2, y0 + h * 0.56, t * (n > 1 ? 0.1 : 0.13), "#ffffff", Math.max(1.5, t * 0.045));
    } else {
      ctx.fillStyle = "rgba(40,70,110," + (0.7 + 0.3 * Math.sin(tps * 3 + s.x)).toFixed(3) + ")";
      ctx.fillText("?", cx, y0 + h * 0.62);
    }
    if (s.resolue && typeof s.instantResolue === "number") eclat(ctx, cx, y0 + h * 0.45, t, etat.temps - s.instantResolue, "200,230,255", 18);
    if (proche && !etat.figure) toucheE(ctx, cx, y0 - t * 0.42 + Math.sin(tps * 4) * t * 0.05, t);
  }

  // La réception d'une stèle d'Hermès : un cercle ailé sur le sol.
  // Avant la stèle, on ne voit qu'un contour pâle ; après, il brille.
  function dessinerReception(ctx, etat, s, t, proche, tps) {
    var r = s.vers, cx = r.x * t + t / 2, sol = (r.y + 1) * t - t * 0.04;
    var bat = Math.sin(tps * 6 + r.x);
    if (s.resolue) {
      lueurAjoutee(ctx, cx, sol - t * 0.3, t * 0.95, "170,215,255", 0.32 + 0.1 * Math.sin(tps * 2.6));
      ctx.strokeStyle = "rgba(225,240,255,0.95)";
      ctx.lineWidth = Math.max(1.5, t * 0.05);
      ctx.beginPath(); ctx.ellipse(cx, sol, t * 0.42, t * 0.11, 0, 0, PI2); ctx.stroke();
      ctx.strokeStyle = "rgba(170,215,255,0.6)";
      ctx.beginPath(); ctx.ellipse(cx, sol, t * 0.28, t * 0.07, 0, 0, PI2); ctx.stroke();
      ailes(ctx, cx, sol - t * 0.05, t * 0.24, bat, "rgba(250,252,255,0.95)", null);
      // des étincelles qui montent
      for (var k = 0; k < 3; k++) {
        var u = O.boucler(tps * 0.7 + k / 3 + r.x * 0.21, 0, 1);
        etincelle(ctx, cx + t * (k - 1) * 0.25, sol - u * t * 1.1, t * 0.05, "rgba(220,240,255," + Math.sin(Math.PI * u).toFixed(3) + ")");
      }
      if (proche && !etat.figure) toucheE(ctx, cx, sol - t * 1.45 + Math.sin(tps * 4) * t * 0.05, t);
    } else {
      ctx.save();
      ctx.setLineDash([t * 0.08, t * 0.08]);
      ctx.strokeStyle = "rgba(200,220,240," + (0.35 + 0.1 * Math.sin(tps * 2)).toFixed(3) + ")";
      ctx.lineWidth = Math.max(1, t * 0.035);
      ctx.beginPath(); ctx.ellipse(cx, sol, t * 0.42, t * 0.11, 0, 0, PI2); ctx.stroke();
      ctx.restore();
    }
  }

  // =================================================================
  //  Stèle du boss : plus grande, sombre, gravée de runes rouges
  // =================================================================
  function dessinerSteleBoss(ctx, etat, s, t, proche, tps) {
    var cx = s.x * t + t / 2, bas = (s.y + 1) * t;
    var marche = t * 0.1, socle = bas - marche;
    var l = t * 0.8, h = t * 1.25;
    var x0 = cx - l / 2, y0 = socle - h;
    var pulse = 0.5 + 0.5 * Math.sin(tps * 2.4);
    if (s.resolue) lueurAjoutee(ctx, cx, y0 + h * 0.45, t * 1.4, "255,215,120", 0.5 + 0.08 * Math.sin(tps * 2));
    else lueurAjoutee(ctx, cx, y0 + h * 0.45, t * 1.35, "255,70,40", 0.22 + 0.14 * pulse);
    ctx.fillStyle = "#3d302a";
    ctx.fillRect(cx - l * 0.7, socle, l * 1.4, marche);
    ctx.fillRect(cx - l * 0.6, socle - marche * 0.6, l * 1.2, marche * 0.6);
    var g = ctx.createLinearGradient(x0, 0, x0 + l, 0);
    g.addColorStop(0, "#4a3b33"); g.addColorStop(0.45, proche && !s.resolue ? "#7c665a" : "#66544a"); g.addColorStop(1, "#3a2d26");
    ctx.fillStyle = g;
    cheminStele(ctx, x0, y0, l, socle - marche * 0.6);
    ctx.fill();
    ctx.strokeStyle = "#231a15";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    var e = l * 0.1;
    cheminStele(ctx, x0 + e, y0 + e, l - 2 * e, socle - marche * 0.6 - e * 0.6);
    ctx.strokeStyle = s.resolue ? "rgba(255,215,120,0.7)" : "rgba(255,90,60," + (0.35 + 0.35 * pulse).toFixed(3) + ")";
    ctx.stroke();
    // le grand signe, et des runes
    ctx.textAlign = "center";
    ctx.font = "700 " + Math.round(t * 0.5) + "px " + POLICE;
    if (s.resolue) {
      ctx.fillStyle = C.or;
      ctx.fillText("Ω", cx, y0 + h * 0.5);
    } else {
      lueurAjoutee(ctx, cx, y0 + h * 0.4, t * 0.45, "255,80,50", 0.3 + 0.3 * pulse);
      ctx.fillStyle = "rgba(255," + Math.round(120 + 60 * pulse) + ",90,0.95)";
      ctx.fillText("Ψ", cx, y0 + h * 0.5);
    }
    ctx.font = "700 " + Math.round(t * 0.16) + "px " + POLICE;
    ctx.fillStyle = s.resolue ? "rgba(255,215,120,0.8)" : "rgba(255,110,80," + (0.4 + 0.4 * pulse).toFixed(3) + ")";
    ctx.fillText("Δ Σ Φ Λ", cx, y0 + h * 0.72);
    ctx.fillText("Ξ Π Θ", cx, y0 + h * 0.86);
    if (s.resolue && typeof s.instantResolue === "number") eclat(ctx, cx, y0 + h * 0.45, t, etat.temps - s.instantResolue, "255,215,120", 24);
    if (proche && !s.resolue) toucheE(ctx, cx, y0 - t * 0.4 + Math.sin(tps * 4) * t * 0.05, t);
  }

  // =================================================================
  //  La figure acrobatique : une traînée de lumière derrière Talos,
  //  un éclat au départ et un autre à l'arrivée
  // =================================================================
  function centreFigure(f, u, j) {
    var x = f.x0 + (f.x1 - f.x0) * u, y = f.haut + f.k * (u - f.us) * (u - f.us);
    return { x: x + j.l / 2, y: y + j.h / 2 };
  }
  function dessinerFigure(ctx, etat, t) {
    var j = etat.joueur, f = etat.figure;
    if (f) {
      var u = Math.min(1, f.t / f.duree);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      for (var k = 14; k >= 1; k--) {
        var ua = Math.max(0, u - k * 0.022), ub = Math.max(0, u - (k - 1) * 0.022);
        if (ub <= 0) continue;
        var a = centreFigure(f, ua, j), b = centreFigure(f, ub, j);
        ctx.strokeStyle = "rgba(190,225,255," + (0.5 * (1 - k / 15)).toFixed(3) + ")";
        ctx.lineWidth = Math.max(1.5, t * 0.32 * (1 - k / 15));
        ctx.beginPath(); ctx.moveTo(a.x * t, a.y * t); ctx.lineTo(b.x * t, b.y * t); ctx.stroke();
      }
      ctx.restore();
      var d = centreFigure(f, 0, j);
      eclat(ctx, d.x * t, (f.y0 + j.h) * t, t, etat.temps - f.debut, "200,230,255", 12);
    }
    var df = etat.derniereFigure;
    if (df && typeof etat.instantReception === "number") {
      eclat(ctx, (df.x1 + j.l / 2) * t, (df.y1 + j.h) * t, t, etat.temps - etat.instantReception, "200,230,255", 16);
    }
  }

  // =================================================================
  //  Bustes des mathématiciens : chacun a sa coiffure ou son couvre-chef,
  //  pour qu'on les reconnaisse d'une salle à l'autre.
  //  Le champ « portrait » d'un guide (dans niveaux.js) choisit le modèle.
  // =================================================================
  var POIL = "#ad9f84", POIL_SOMBRE = "#8c7f66", TISSU = "#efe6d0", LINGE = "#f7f2e6";

  function barbe(ctx, cx, hy, r, bas, large, couleur) {
    ctx.fillStyle = couleur || POIL;
    ctx.beginPath();
    ctx.moveTo(cx - r * large, hy - r * 0.05);
    ctx.quadraticCurveTo(cx - r * large * 0.95, hy + r * bas * 0.8, cx, hy + r * bas);
    ctx.quadraticCurveTo(cx + r * large * 0.95, hy + r * bas * 0.8, cx + r * large, hy - r * 0.05);
    ctx.quadraticCurveTo(cx + r * 0.5, hy + r * 0.62, cx, hy + r * 0.6);
    ctx.quadraticCurveTo(cx - r * 0.5, hy + r * 0.62, cx - r * large, hy - r * 0.05);
    ctx.fill();
  }
  function moustache(ctx, cx, hy, r, tombante) {
    ctx.strokeStyle = POIL_SOMBRE;
    ctx.lineWidth = Math.max(1, r * 0.12);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx, hy + r * 0.4);
    ctx.quadraticCurveTo(cx - r * 0.25, hy + r * 0.36, cx - r * 0.42, hy + r * (tombante ? 0.85 : 0.5));
    ctx.moveTo(cx, hy + r * 0.4);
    ctx.quadraticCurveTo(cx + r * 0.25, hy + r * 0.36, cx + r * 0.42, hy + r * (tombante ? 0.85 : 0.5));
    ctx.stroke();
    ctx.lineCap = "butt";
  }
  // Une calotte de cheveux sur le haut de la tête ; « relever » dégage le front.
  function calotte(ctx, cx, hy, r, haut, relever, couleur) {
    ctx.fillStyle = couleur || POIL;
    ctx.beginPath();
    ctx.ellipse(cx, hy - r * haut, r * 0.98, r * 0.8, 0, Math.PI, PI2);
    ctx.quadraticCurveTo(cx, hy - r * (haut + relever), cx - r * 0.98, hy - r * haut);
    ctx.fill();
  }
  function rien() {}

  // Pour chaque modèle : ce qui passe derrière la tête, puis ce qui passe devant.
  var PORTRAITS = {
    grec: {   // barbe, boucles et bandeau
      arriere: function (ctx, cx, hy, r) { ctx.fillStyle = POIL; ovale(ctx, cx, hy - r * 0.15, r * 1.02, r * 0.98); },
      avant: function (ctx, cx, hy, r) {
        calotte(ctx, cx, hy, r, 0.25, 0.45);
        ctx.fillStyle = POIL;
        for (var a = 0; a <= 6; a++) {
          var ang = Math.PI * (1.08 + a * 0.14);
          disque(ctx, cx + Math.cos(ang) * r * 0.9, hy - r * 0.2 + Math.sin(ang) * r * 0.75, r * 0.2);
        }
        ctx.strokeStyle = C.or;
        ctx.lineWidth = Math.max(1, r * 0.12);
        ctx.beginPath();
        ctx.ellipse(cx, hy - r * 0.3, r * 0.92, r * 0.5, 0, Math.PI * 1.08, Math.PI * 1.92);
        ctx.stroke();
        barbe(ctx, cx, hy, r, 1.35, 0.85);
        moustache(ctx, cx, hy, r, false);
      }
    },
    casque: {   // Athéna : casque corinthien relevé, cimier rouge, cheveux longs
      arriere: function (ctx, cx, hy, r) {
        ctx.fillStyle = POIL;
        ovale(ctx, cx - r * 0.82, hy + r * 0.75, r * 0.3, r * 0.75);
        ovale(ctx, cx + r * 0.82, hy + r * 0.75, r * 0.3, r * 0.75);
        ctx.fillStyle = "#9a3b2e";
        ovale(ctx, cx, hy - r * 1.55, r * 0.32, r * 0.72);
        ctx.strokeStyle = "#6e2a20";
        ctx.lineWidth = Math.max(1, r * 0.08);
        ctx.beginPath(); ctx.moveTo(cx, hy - r * 2.2); ctx.lineTo(cx, hy - r * 0.95); ctx.stroke();
      },
      avant: function (ctx, cx, hy, r) {
        var g = ctx.createLinearGradient(cx - r, 0, cx + r, 0);
        g.addColorStop(0, C.bronzeSombre); g.addColorStop(0.4, C.bronzeClair); g.addColorStop(1, C.bronzeSombre);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(cx, hy - r * 0.3, r * 1.05, r * 0.92, 0, Math.PI, PI2);
        ctx.quadraticCurveTo(cx, hy - r * 0.6, cx - r * 1.05, hy - r * 0.3);
        ctx.fill();
        ctx.fillStyle = "rgba(40,22,10,0.7)";
        ovale(ctx, cx - r * 0.38, hy - r * 0.72, r * 0.2, r * 0.09, -0.2);
        ovale(ctx, cx + r * 0.38, hy - r * 0.72, r * 0.2, r * 0.09, 0.2);
        ctx.fillStyle = C.bronzeSombre;
        ctx.fillRect(cx - r * 0.12, hy - r * 1.3, r * 0.24, r * 0.12);
      }
    },
    turban: {   // turban à bandes, longue barbe
      arriere: rien,
      avant: function (ctx, cx, hy, r) {
        barbe(ctx, cx, hy, r, 1.55, 0.86, POIL_SOMBRE);
        moustache(ctx, cx, hy, r, true);
        ctx.fillStyle = TISSU;
        ovale(ctx, cx, hy - r * 0.78, r * 1.12, r * 0.6);
        ctx.save();
        ctx.beginPath(); ctx.ellipse(cx, hy - r * 0.78, r * 1.12, r * 0.6, 0, 0, PI2); ctx.clip();
        ctx.strokeStyle = "rgba(150,130,100,0.7)";
        ctx.lineWidth = Math.max(1, r * 0.07);
        for (var k = 0; k < 3; k++) {
          ctx.beginPath();
          ctx.moveTo(cx - r * 1.2, hy - r * (0.5 + k * 0.22));
          ctx.quadraticCurveTo(cx, hy - r * (0.95 + k * 0.22), cx + r * 1.2, hy - r * (0.72 + k * 0.2));
          ctx.stroke();
        }
        ctx.restore();
        ctx.fillStyle = C.or; disque(ctx, cx, hy - r * 0.62, r * 0.14);
        ctx.fillStyle = "#3f7fa8"; disque(ctx, cx, hy - r * 0.62, r * 0.07);
      }
    },
    chignon: {   // Hypatie : cheveux relevés en chignon
      arriere: function (ctx, cx, hy, r) {
        ctx.fillStyle = POIL;
        disque(ctx, cx, hy - r * 1.05, r * 0.42);
        ovale(ctx, cx - r * 0.78, hy + r * 0.3, r * 0.32, r * 0.6);
        ovale(ctx, cx + r * 0.78, hy + r * 0.3, r * 0.32, r * 0.6);
      },
      avant: function (ctx, cx, hy, r) {
        calotte(ctx, cx, hy, r, 0.2, 0.55);
        ctx.strokeStyle = C.or;
        ctx.lineWidth = Math.max(1, r * 0.1);
        ctx.beginPath(); ctx.ellipse(cx, hy - r * 1.05, r * 0.42, r * 0.16, 0, 0, Math.PI); ctx.stroke();
      }
    },
    renaissance: {   // béret plat, fraise, barbe pointue
      arriere: function (ctx, cx, hy, r) {
        ctx.fillStyle = POIL;
        ovale(ctx, cx - r * 0.86, hy + r * 0.05, r * 0.22, r * 0.42);
        ovale(ctx, cx + r * 0.86, hy + r * 0.05, r * 0.22, r * 0.42);
      },
      avant: function (ctx, cx, hy, r) {
        ctx.fillStyle = LINGE;
        ctx.strokeStyle = "rgba(120,105,85,0.6)";
        ctx.lineWidth = 1;
        for (var i = -3; i <= 3; i++) {
          ctx.beginPath(); ctx.arc(cx + i * r * 0.3, hy + r * 1.1, r * 0.22, 0, PI2); ctx.fill(); ctx.stroke();
        }
        ctx.fillStyle = POIL;
        ctx.beginPath();
        ctx.moveTo(cx - r * 0.55, hy + r * 0.35);
        ctx.quadraticCurveTo(cx - r * 0.35, hy + r * 1.0, cx, hy + r * 1.35);
        ctx.quadraticCurveTo(cx + r * 0.35, hy + r * 1.0, cx + r * 0.55, hy + r * 0.35);
        ctx.quadraticCurveTo(cx, hy + r * 0.62, cx - r * 0.55, hy + r * 0.35);
        ctx.fill();
        moustache(ctx, cx, hy, r, false);
        ctx.fillStyle = "#3c3346";
        ovale(ctx, cx + r * 0.12, hy - r * 0.85, r * 1.18, r * 0.34, -0.06);
        ctx.fillStyle = "#2b2433";
        ovale(ctx, cx, hy - r * 0.66, r * 0.95, r * 0.15);
      }
    },
    perruque: {   // XVIIe siècle : longue perruque bouclée
      arriere: function (ctx, cx, hy, r) {
        ctx.fillStyle = POIL;
        ovale(ctx, cx, hy - r * 0.1, r * 1.15, r * 1.05);
        ovale(ctx, cx - r * 0.92, hy + r * 0.85, r * 0.45, r * 0.95);
        ovale(ctx, cx + r * 0.92, hy + r * 0.85, r * 0.45, r * 0.95);
        ctx.fillStyle = "rgba(110,95,70,0.35)";
        for (var k = 0; k < 5; k++) {
          disque(ctx, cx - r * 1.12, hy + r * (0.05 + k * 0.38), r * 0.17);
          disque(ctx, cx + r * 1.12, hy + r * (0.05 + k * 0.38), r * 0.17);
        }
      },
      avant: function (ctx, cx, hy, r) {
        calotte(ctx, cx, hy, r, 0.22, 0.5);
        ctx.strokeStyle = POIL_SOMBRE;
        ctx.lineWidth = Math.max(1, r * 0.06);
        ctx.beginPath();
        ctx.moveTo(cx - r * 0.1, hy - r * 1.0);
        ctx.quadraticCurveTo(cx - r * 0.05, hy - r * 0.7, cx - r * 0.18, hy - r * 0.48);
        ctx.stroke();
        moustache(ctx, cx, hy, r, false);
      }
    },
    xixe: {   // XIXe siècle : cheveux courts, favoris, col haut et cravate
      arriere: rien,
      avant: function (ctx, cx, hy, r) {
        calotte(ctx, cx, hy, r, 0.3, 0.35);
        ctx.fillStyle = POIL;
        ctx.fillRect(cx - r * 0.95, hy - r * 0.35, r * 0.22, r * 0.8);
        ctx.fillRect(cx + r * 0.73, hy - r * 0.35, r * 0.22, r * 0.8);
        ctx.fillStyle = LINGE;
        ctx.beginPath();
        ctx.moveTo(cx - r * 0.55, hy + r * 0.95); ctx.lineTo(cx - r * 0.05, hy + r * 1.25); ctx.lineTo(cx - r * 0.6, hy + r * 1.45); ctx.closePath();
        ctx.moveTo(cx + r * 0.55, hy + r * 0.95); ctx.lineTo(cx + r * 0.05, hy + r * 1.25); ctx.lineTo(cx + r * 0.6, hy + r * 1.45); ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#2f2a33";
        ovale(ctx, cx - r * 0.16, hy + r * 1.35, r * 0.18, r * 0.12);
        ovale(ctx, cx + r * 0.16, hy + r * 1.35, r * 0.18, r * 0.12);
        disque(ctx, cx, hy + r * 1.35, r * 0.08);
      }
    },
    lettre: {   // lettré chinois : bonnet noir à ailes, barbe fine, moustache tombante
      arriere: function (ctx, cx, hy, r) {
        ctx.fillStyle = "#2c2724";
        ctx.fillRect(cx - r * 2.0, hy - r * 0.68, r * 1.3, r * 0.14);
        ctx.fillRect(cx + r * 0.7, hy - r * 0.68, r * 1.3, r * 0.14);
      },
      avant: function (ctx, cx, hy, r) {
        ctx.fillStyle = POIL_SOMBRE;
        ctx.beginPath();
        ctx.moveTo(cx - r * 0.22, hy + r * 0.55);
        ctx.quadraticCurveTo(cx - r * 0.18, hy + r * 1.3, cx, hy + r * 1.75);
        ctx.quadraticCurveTo(cx + r * 0.18, hy + r * 1.3, cx + r * 0.22, hy + r * 0.55);
        ctx.closePath();
        ctx.fill();
        moustache(ctx, cx, hy, r, true);
        ctx.fillStyle = "#2c2724";
        O.rectArrondi(ctx, cx - r * 0.9, hy - r * 1.2, r * 1.8, r * 0.85, r * 0.35);
        ctx.fill();
        O.rectArrondi(ctx, cx - r * 0.52, hy - r * 1.55, r * 1.04, r * 0.55, r * 0.26);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.12)";
        ctx.fillRect(cx - r * 0.8, hy - r * 0.55, r * 1.6, r * 0.08);
      }
    },
    eveque: {   // Oresme, évêque de Lisieux : mitre blanche et or
      arriere: function (ctx, cx, hy, r) {
        ctx.fillStyle = POIL;
        ovale(ctx, cx - r * 0.85, hy + r * 0.1, r * 0.2, r * 0.35);
        ovale(ctx, cx + r * 0.85, hy + r * 0.1, r * 0.2, r * 0.35);
      },
      avant: function (ctx, cx, hy, r) {
        ctx.fillStyle = "#f4eee0";
        ctx.strokeStyle = "rgba(120,105,85,0.7)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - r * 0.86, hy - r * 0.4);
        ctx.lineTo(cx - r * 0.72, hy - r * 1.55);
        ctx.quadraticCurveTo(cx - r * 0.35, hy - r * 2.05, cx, hy - r * 2.35);
        ctx.quadraticCurveTo(cx + r * 0.35, hy - r * 2.05, cx + r * 0.72, hy - r * 1.55);
        ctx.lineTo(cx + r * 0.86, hy - r * 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = C.or;
        ctx.fillRect(cx - r * 0.86, hy - r * 0.62, r * 1.72, r * 0.2);
        ctx.fillRect(cx - r * 0.1, hy - r * 2.15, r * 0.2, r * 1.55);
        ctx.fillRect(cx - r * 0.32, hy - r * 1.5, r * 0.64, r * 0.14);
      }
    },
    moderne: {   // cheveux courts ondulés
      arriere: function (ctx, cx, hy, r) {
        ctx.fillStyle = POIL_SOMBRE;
        ctx.beginPath();
        ctx.moveTo(cx - r * 1.05, hy + r * 0.8);
        ctx.quadraticCurveTo(cx - r * 1.25, hy - r * 1.2, cx, hy - r * 1.15);
        ctx.quadraticCurveTo(cx + r * 1.25, hy - r * 1.2, cx + r * 1.05, hy + r * 0.8);
        ctx.quadraticCurveTo(cx, hy + r * 0.95, cx - r * 1.05, hy + r * 0.8);
        ctx.fill();
      },
      avant: function (ctx, cx, hy, r) {
        ctx.fillStyle = POIL_SOMBRE;
        ctx.beginPath();
        ctx.moveTo(cx - r * 0.95, hy);
        ctx.quadraticCurveTo(cx - r * 0.95, hy - r * 1.05, cx + r * 0.1, hy - r * 1.02);
        ctx.quadraticCurveTo(cx + r * 0.98, hy - r * 0.95, cx + r * 0.95, hy + r * 0.15);
        ctx.quadraticCurveTo(cx + r * 0.55, hy - r * 0.62, cx - r * 0.25, hy - r * 0.45);
        ctx.quadraticCurveTo(cx - r * 0.75, hy - r * 0.35, cx - r * 0.95, hy);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,250,235,0.25)";
        ctx.lineWidth = Math.max(1, r * 0.06);
        ctx.beginPath();
        ctx.moveTo(cx - r * 0.6, hy - r * 0.8); ctx.quadraticCurveTo(cx, hy - r * 0.95, cx + r * 0.6, hy - r * 0.7);
        ctx.stroke();
      }
    },
    femme19: {   // raie au milieu, anglaises, chignon, col de dentelle
      arriere: function (ctx, cx, hy, r) {
        ctx.fillStyle = POIL;
        disque(ctx, cx, hy - r * 1.0, r * 0.32);
      },
      avant: function (ctx, cx, hy, r) {
        calotte(ctx, cx, hy, r, 0.22, 0.6);
        ctx.strokeStyle = POIL_SOMBRE;
        ctx.lineWidth = Math.max(1, r * 0.06);
        ctx.beginPath(); ctx.moveTo(cx, hy - r * 1.0); ctx.lineTo(cx, hy - r * 0.55); ctx.stroke();
        ctx.fillStyle = POIL;
        for (var k = 0; k < 3; k++) {
          ovale(ctx, cx - r * 0.95, hy + r * (0.02 + k * 0.3), r * 0.15, r * 0.18);
          ovale(ctx, cx + r * 0.95, hy + r * (0.02 + k * 0.3), r * 0.15, r * 0.18);
        }
        ctx.fillStyle = LINGE;
        ctx.strokeStyle = "rgba(120,105,85,0.5)";
        ctx.lineWidth = 1;
        for (var i = -3; i <= 3; i++) {
          ctx.beginPath(); ctx.arc(cx + i * r * 0.28, hy + r * 1.12, r * 0.16, 0, Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke();
        }
      }
    }
  };

  function dessinerBuste(ctx, g, t, proche, tps) {
    var cx = g.x * t + t / 2, bas = (g.y + 1) * t;
    var ph = g.philosophe || {};
    var P = PORTRAITS[ph.portrait] || PORTRAITS.grec;
    if (proche) lueurAjoutee(ctx, cx, bas - t * 0.9, t * 1.1, "255,215,120", 0.3 + 0.08 * Math.sin(tps * 2));

    // Le piédestal et sa plaque dorée
    ctx.fillStyle = C.marbreOmbre;
    ctx.fillRect(cx - t * 0.3, bas - t * 0.56, t * 0.6, t * 0.5);
    ctx.fillStyle = C.marbre;
    ctx.fillRect(cx - t * 0.38, bas - t * 0.08, t * 0.76, t * 0.08);
    ctx.fillRect(cx - t * 0.36, bas - t * 0.62, t * 0.72, t * 0.08);
    ctx.fillStyle = C.orSombre;
    ctx.fillRect(cx - t * 0.15, bas - t * 0.42, t * 0.3, t * 0.14);
    ctx.fillStyle = C.or;
    ctx.fillRect(cx - t * 0.13, bas - t * 0.4, t * 0.26, t * 0.1);

    // Les épaules drapées
    var y0 = bas - t * 0.62;
    var marbre = ctx.createLinearGradient(cx - t * 0.34, 0, cx + t * 0.34, 0);
    marbre.addColorStop(0, C.marbreOmbre); marbre.addColorStop(0.4, C.marbreClair); marbre.addColorStop(1, C.marbreFonce);
    ctx.fillStyle = marbre;
    ctx.beginPath();
    ctx.moveTo(cx - t * 0.33, y0);
    ctx.quadraticCurveTo(cx - t * 0.35, y0 - t * 0.34, cx - t * 0.12, y0 - t * 0.4);
    ctx.lineTo(cx + t * 0.12, y0 - t * 0.4);
    ctx.quadraticCurveTo(cx + t * 0.35, y0 - t * 0.34, cx + t * 0.33, y0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(120,105,85,0.45)";
    ctx.lineWidth = Math.max(1, t * 0.022);
    ctx.beginPath();
    ctx.moveTo(cx - t * 0.2, y0 - t * 0.36); ctx.quadraticCurveTo(cx, y0 - t * 0.16, cx + t * 0.24, y0 - t * 0.03);
    ctx.moveTo(cx - t * 0.06, y0 - t * 0.39); ctx.quadraticCurveTo(cx + t * 0.1, y0 - t * 0.26, cx + t * 0.29, y0 - t * 0.17);
    ctx.stroke();
    ctx.fillStyle = C.marbre;
    ctx.fillRect(cx - t * 0.07, y0 - t * 0.52, t * 0.14, t * 0.14);

    // La tête, le visage à peine gravé, puis la coiffure
    var r = t * 0.2, hy = y0 - t * 0.66;
    P.arriere(ctx, cx, hy, r);
    var tete = ctx.createRadialGradient(cx - r * 0.35, hy - r * 0.35, r * 0.1, cx, hy, r * 1.1);
    tete.addColorStop(0, C.marbreClair);
    tete.addColorStop(1, C.marbreOmbre);
    ctx.fillStyle = tete;
    ovale(ctx, cx, hy, r * 0.9, r);
    ctx.strokeStyle = "rgba(60,45,30,0.35)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.strokeStyle = "rgba(110,95,75,0.6)";
    ctx.lineWidth = Math.max(1, t * 0.02);
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.52, hy - r * 0.12); ctx.lineTo(cx - r * 0.14, hy - r * 0.16);
    ctx.moveTo(cx + r * 0.14, hy - r * 0.16); ctx.lineTo(cx + r * 0.52, hy - r * 0.12);
    ctx.moveTo(cx, hy - r * 0.1); ctx.lineTo(cx - r * 0.08, hy + r * 0.25); ctx.lineTo(cx + r * 0.06, hy + r * 0.28);
    ctx.moveTo(cx - r * 0.17, hy + r * 0.5); ctx.quadraticCurveTo(cx, hy + r * 0.56, cx + r * 0.17, hy + r * 0.5);
    ctx.stroke();
    ctx.fillStyle = "rgba(110,95,75,0.5)";
    ovale(ctx, cx - r * 0.32, hy + r * 0.03, r * 0.12, r * 0.06);
    ovale(ctx, cx + r * 0.32, hy + r * 0.03, r * 0.12, r * 0.06);
    P.avant(ctx, cx, hy, r);

    // Le nom, quand Talos s'approche
    if (proche) {
      var nom = String(ph.nom || "").split(" (")[0];
      ctx.font = "700 " + Math.round(t * 0.3) + "px " + POLICE;
      ctx.textAlign = "center";
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(30,20,10,0.75)";
      ctx.strokeText(nom, cx, hy - r * 2.6);
      ctx.fillStyle = C.or;
      ctx.fillText(nom, cx, hy - r * 2.6);
    }
  }

  // =================================================================
  //  Talos, l'automate de bronze, et ses parures
  // =================================================================
  // Un bras ou une jambe : un bâton arrondi qui pivote autour de son attache.
  function membre(ctx, x, y, larg, long, angle, couleur) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = couleur;
    O.rectArrondi(ctx, -larg / 2, 0, larg, long, larg * 0.45);
    ctx.fill();
    ctx.restore();
  }
  function bout(x, y, long, angle) { return { x: x - Math.sin(angle) * long, y: y + Math.cos(angle) * long }; }

  // La rangée du premier sol sous Talos (pour son ombre), ou -1.
  function solSous(etat, j) {
    var cx = Math.floor(j.x + j.l / 2);
    for (var y = Math.max(0, Math.floor(j.y + j.h)); y < etat.hauteur; y++) {
      var c = Moteur.caseEn(etat, cx, y);
      if (c === "mur" || (c === "passerelle" && etat.passerelleConstruite) || (c === "sortie" && !etat.porteOuverte)) return y;
    }
    return -1;
  }

  // Une petite aile (sandales d'Hermès), tournée vers l'arrière.
  function aile(ctx, x, y, t, sens, battement) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(-sens, 1);
    ctx.rotate(-0.6 - battement);
    ctx.fillStyle = "#fbf5e8";
    for (var k = 0; k < 3; k++) ovale(ctx, t * 0.09, -k * t * 0.03, t * (0.1 - k * 0.022), t * 0.024, -k * 0.3);
    ctx.restore();
  }

  function dessinerTalos(ctx, etat, t, tps, parures, sombre) {
    var j = etat.joueur;
    var px = j.x * t, py = j.y * t, l = j.l * t, h = j.h * t;
    var cx = px + l / 2, sens = j.regard || 1;
    var P = parures.armure ? { base: "#d9a93c", clair: "#f6d47a", sombre: "#8a6418" }
                           : { base: C.bronze, clair: C.bronzeClair, sombre: C.bronzeSombre };
    var court = j.auSol && j.vx !== 0;
    var phase = etat.temps * 14;
    var bob = j.auSol ? (court ? -Math.abs(Math.sin(phase)) * h * 0.03 : Math.sin(tps * 2.2) * h * 0.012) : 0;
    var poussiere = sombre ? "150,140,130" : "205,195,175";

    // L'ombre sur le sol, plus petite quand Talos est en l'air
    var sol = solSous(etat, j);
    if (sol >= 0) {
      var dist = (sol * t - (py + h)) / t, ko = Math.max(0, 1 - dist / 4);
      if (ko > 0) {
        ctx.fillStyle = "rgba(0,0,0," + (0.28 * ko).toFixed(3) + ")";
        ovale(ctx, cx, sol * t, l * 0.45 * ko + 1, t * 0.06 * ko + 0.5);
      }
    }
    // Pendant une figure acrobatique, Talos tourne sur lui-même
    ctx.save();
    if (etat.figure) {
      ctx.translate(cx, py + h / 2);
      ctx.rotate(Moteur.angleFigure(etat.figure));
      ctx.translate(-cx, -(py + h / 2));
    }
    // Sa lumière dans les salles sombres, et l'aura de sagesse
    if (sombre) lueurAjoutee(ctx, cx, py + h * 0.5, t * 2.6, "255,196,120", 0.16);
    if (parures.aura) lueurAjoutee(ctx, cx, py + h * 0.5, t * 1.4, "190,205,255", 0.22 + 0.08 * Math.sin(tps * 2.5));

    // La poussière : à l'atterrissage, et derrière les pieds quand il court
    var ta = typeof j.instantAtterrissage === "number" ? etat.temps - j.instantAtterrissage : 99;
    if (ta >= 0 && ta < 0.35) {
      var ka = ta / 0.35;
      ctx.fillStyle = "rgba(" + poussiere + "," + (0.45 * (1 - ka)).toFixed(3) + ")";
      for (var cote = -1; cote <= 1; cote += 2) {
        ovale(ctx, cx + cote * (l * 0.3 + ka * l * 0.7), py + h - t * 0.04, t * 0.08 * (1 + ka), t * 0.05 * (1 + ka));
      }
    }
    if (court) {
      for (var k = 0; k < 3; k++) {
        var u = O.boucler(etat.temps * 2.5 + k / 3, 0, 1);
        ctx.fillStyle = "rgba(" + poussiere + "," + (0.3 * (1 - u)).toFixed(3) + ")";
        disque(ctx, cx - sens * (l * 0.2 + u * l * 0.7), py + h - t * 0.03 - u * t * 0.12, t * 0.04 * (1 + 1.5 * u));
      }
    }

    // L'apparition (au début de la salle, ou après une chute) : un rayon de lumière
    var tapp = typeof etat.instantApparition === "number" ? etat.temps - etat.instantApparition : 99;
    var apparait = tapp >= 0 && tapp < 0.6;
    if (apparait) {
      var kb = 1 - tapp / 0.6;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      var faisceau = ctx.createLinearGradient(0, py - t * 3, 0, py + h);
      faisceau.addColorStop(0, "rgba(255,230,160,0)");
      faisceau.addColorStop(1, "rgba(255,230,160," + (0.5 * kb).toFixed(3) + ")");
      ctx.fillStyle = faisceau;
      ctx.fillRect(cx - l * 0.35, py - t * 3, l * 0.7, t * 3 + h);
      ctx.restore();
      ctx.globalAlpha = Math.max(0.05, 1 - kb);
    }

    // Les angles des bras et des jambes
    var jambeAv, jambeAr, brasAv, brasAr;
    if (!j.auSol) {
      jambeAv = -sens * 0.5; jambeAr = sens * 0.35;
      brasAv = j.vy < 0 ? -sens * 2.2 : -sens * 0.9; brasAr = sens * 0.6;
    } else if (court) {
      var s = Math.sin(phase);
      jambeAv = -sens * s * 0.6; jambeAr = sens * s * 0.6;
      brasAv = sens * s * 0.5; brasAr = -sens * s * 0.5;
    } else {
      var balance = Math.sin(tps * 2.2) * 0.04;
      jambeAv = 0; jambeAr = 0; brasAv = balance; brasAr = -balance;
    }
    var hancheY = py + h * 0.7, longJambe = h * 0.3, largJambe = l * 0.22;
    var hancheAv = cx + sens * l * 0.1, hancheAr = cx - sens * l * 0.1;
    var epauleY = py + h * 0.42 + bob, longBras = h * 0.28, largBras = l * 0.17;

    // La cape pourpre, derrière tout le reste ; elle flotte avec la vitesse
    if (parures.cape) {
      var vit = j.auSol ? Math.min(1, Math.abs(j.vx) / 6) : 0.7;
      var flot = Math.sin(tps * 7) * l * 0.06 * (0.3 + vit);
      var bax = cx - sens * (l * 0.45 + vit * l * 0.6) + flot, bay = py + h * (0.9 - 0.15 * vit);
      var bbx = cx - sens * (l * 0.05 + vit * l * 0.3) + flot * 0.5, bby = py + h * (0.92 - 0.1 * vit);
      ctx.fillStyle = "#6b2a6b";
      ctx.beginPath();
      ctx.moveTo(cx + sens * l * 0.25, epauleY - h * 0.02);
      ctx.lineTo(cx - sens * l * 0.3, epauleY - h * 0.02);
      ctx.quadraticCurveTo(cx - sens * l * 0.45, py + h * 0.65, bax, bay);
      ctx.lineTo(bbx, bby);
      ctx.quadraticCurveTo(cx, py + h * 0.65, cx + sens * l * 0.25, epauleY - h * 0.02);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = C.or;
      ctx.lineWidth = Math.max(1, t * 0.03);
      ctx.beginPath(); ctx.moveTo(bax, bay); ctx.lineTo(bbx, bby); ctx.stroke();
    }

    // Le bras et la jambe de derrière (plus sombres), puis la jambe de devant
    membre(ctx, cx - sens * l * 0.05, epauleY, largBras, longBras, brasAr, P.sombre);
    membre(ctx, hancheAr, hancheY, largJambe, longJambe, jambeAr, P.sombre);
    membre(ctx, hancheAv, hancheY, largJambe, longJambe, jambeAv, P.base);
    var piedAv = bout(hancheAv, hancheY, longJambe, jambeAv);
    var piedAr = bout(hancheAr, hancheY, longJambe, jambeAr);
    // Le clou d'or de la cheville : dans la légende, c'est le point faible de Talos
    ctx.fillStyle = C.or;
    disque(ctx, piedAv.x - sens * largJambe * 0.25, piedAv.y - h * 0.06, Math.max(1, t * 0.028));
    if (parures.sandales) {
      var bat = Math.sin(tps * 12) * 0.35;
      aile(ctx, piedAr.x - sens * largJambe * 0.4, piedAr.y - h * 0.06, t, sens, bat);
      aile(ctx, piedAv.x - sens * largJambe * 0.4, piedAv.y - h * 0.06, t, sens, bat);
    }

    // Le corps
    var cg = ctx.createLinearGradient(cx - l * 0.36, 0, cx + l * 0.36, 0);
    cg.addColorStop(0, P.clair); cg.addColorStop(0.45, P.base); cg.addColorStop(1, P.sombre);
    ctx.fillStyle = cg;
    O.rectArrondi(ctx, cx - l * 0.36, py + h * 0.36 + bob, l * 0.72, h * 0.38, t * 0.08);
    ctx.fill();
    ctx.strokeStyle = P.sombre;
    ctx.lineWidth = Math.max(1, t * 0.025);
    ctx.beginPath();
    ctx.moveTo(cx - l * 0.24, py + h * 0.44 + bob);
    ctx.quadraticCurveTo(cx, py + h * 0.56 + bob, cx + l * 0.24, py + h * 0.44 + bob);
    ctx.stroke();
    ctx.fillStyle = P.sombre;
    ctx.fillRect(cx - l * 0.36, py + h * 0.63 + bob, l * 0.72, h * 0.05);
    ctx.fillStyle = C.or;
    ctx.fillRect(cx + sens * l * 0.14 - l * 0.05, py + h * 0.625 + bob, l * 0.1, h * 0.06);
    // Le cœur d'ichor, la « vie » de l'automate, qui bat doucement
    var coeurX = cx + sens * l * 0.1, coeurY = py + h * 0.52 + bob;
    var pulse = 0.5 + 0.5 * Math.sin(tps * 3);
    lueurAjoutee(ctx, coeurX, coeurY, t * 0.32, "255,200,110", 0.3 + 0.2 * pulse);
    ctx.fillStyle = "#ffe3a0";
    disque(ctx, coeurX, coeurY, l * (0.06 + 0.015 * pulse));

    // La tête, le laurier, le cimier, le plumet et l'œil
    var tl = l * 0.6, th = h * 0.32, tx = cx - tl / 2, ty = py + h * 0.04 + bob;
    var hg = ctx.createLinearGradient(0, ty, 0, ty + th);
    hg.addColorStop(0, P.clair); hg.addColorStop(1, P.base);
    ctx.fillStyle = hg;
    O.rectArrondi(ctx, tx, ty, tl, th, t * 0.1);
    ctx.fill();
    if (parures.plumet) {
      var pv = Math.sin(tps * 3) * 0.08;
      ctx.fillStyle = "#b8322a";
      ovale(ctx, cx - sens * l * 0.3, ty - h * 0.03, l * 0.3, h * 0.065, -sens * (0.3 + pv));
      ctx.fillStyle = "#e0574a";
      ovale(ctx, cx - sens * l * 0.26, ty - h * 0.045, l * 0.18, h * 0.028, -sens * (0.3 + pv));
    }
    if (parures.laurier) {
      for (var f = 0; f < 8; f++) {
        var af = Math.PI * (1.02 + f * 0.137);
        var fx = cx + Math.cos(af) * tl * 0.56, fy = ty + th * 0.5 + Math.sin(af) * th * 0.62;
        ctx.fillStyle = f % 2 ? "#86b35a" : "#5d8a3a";
        ovale(ctx, fx, fy, t * 0.065, t * 0.03, af + Math.PI / 2);
      }
    }
    ctx.fillStyle = C.or;
    ctx.beginPath();
    ctx.ellipse(cx - sens * l * 0.04, ty + h * 0.01, l * 0.26, h * 0.09, 0, Math.PI, PI2);
    ctx.fill();
    var ex = cx + sens * l * 0.1, ey = ty + th * 0.45;
    lueurAjoutee(ctx, ex, ey, t * 0.28, "255,230,150", 0.35);
    ctx.fillStyle = C.oeil;
    ctx.fillRect(ex - l * 0.18, ey - h * 0.03, l * 0.36, h * 0.06);

    // Le bras de devant, avec sa main
    membre(ctx, cx + sens * l * 0.02, epauleY, largBras, longBras, brasAv, P.base);
    var main = bout(cx + sens * l * 0.02, epauleY, longBras, brasAv);
    ctx.fillStyle = P.clair;
    disque(ctx, main.x, main.y, largBras * 0.55);

    // L'aura de sagesse : π, Σ et ∞ tournent autour de Talos
    if (parures.aura) {
      ctx.font = "700 " + Math.round(t * 0.22) + "px " + POLICE;
      ctx.textAlign = "center";
      var symboles = ["π", "Σ", "∞"];
      for (var n = 0; n < 3; n++) {
        var an = tps * 1.3 + n * PI2 / 3;
        ctx.fillStyle = "rgba(246,212,122," + (0.55 + 0.35 * Math.sin(an)).toFixed(3) + ")";
        ctx.fillText(symboles[n], cx + Math.cos(an) * l * 0.95, py + h * 0.45 + Math.sin(an) * h * 0.35 + t * 0.08);
      }
    }

    if (apparait) {
      ctx.globalAlpha = 1;
      var kr = tapp / 0.6;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = "rgba(255,230,160," + (1 - kr).toFixed(3) + ")";
      ctx.lineWidth = Math.max(1.5, t * 0.05);
      ctx.beginPath();
      ctx.ellipse(cx, py + h * 0.55, t * (0.3 + 1.2 * (1 - kr)), t * (0.15 + 0.5 * (1 - kr)), 0, 0, PI2);
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }

  // =================================================================
  //  Le fond de la salle, pour l'arène des combats (combat.js)
  // =================================================================
  // Dessine le décor lointain de la salle en cours dans le rectangle
  // (x, y, L, H), agrandi pour le remplir, et place si possible le sol
  // de la salle à la hauteur « sol ». Renvoie faux si aucune salle n'est prête.
  function fondCombat(ctx, x, y, L, H, sol, tps) {
    if (!decor) return false;
    var p = decor.p;
    var s = Math.max(L / p.W, H / p.H);
    var dy = sol - p.sol * s;
    dy = Math.min(y, Math.max(y + H - p.H * s, dy));
    var dx = x + (L - p.W * s) / 2;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, L, H);
    ctx.clip();
    ctx.translate(dx, dy);
    ctx.scale(s, s);
    Decor.dessinerFond(ctx, p, tps, 0);
    ctx.restore();
    return true;
  }

  return { ajuster: ajuster, dessiner: dessiner, fondCombat: fondCombat };
})();
