// =====================================================================
//  MONSTRES : les gardiens des stèles
// =====================================================================
//  Chaque stèle est gardée par un monstre de la mythologie grecque.
//  Ce fichier les dessine, avec leurs petits mouvements (respiration,
//  ailes qui battent, serpents qui ondulent...) et leurs attaques.
//
//  Chaque monstre est dessiné tourné vers la droite, les pieds en
//  (0, 0) ; l'arène le retourne pour qu'il fasse face à Talos.
//  « a » décrit l'instant de l'animation :
//     a.t       le temps qui passe (en secondes)
//     a.action  "repos", "attaque", "touche" (il est frappé) ou "rire"
//     a.k       l'avancée de l'action, de 0 à 1
//     a.portee  la distance jusqu'à Talos (pour une tête qui s'allonge)
//  points(a) donne les endroits d'où partent les attaques (la bouche
//  pour le feu, les yeux pour le regard...).
// =====================================================================

var Monstres = (function () {

  var PI = Math.PI, PI2 = PI * 2;
  var TRAIT = "rgba(18,10,6,0.88)";

  // ---------------------------------------------------------------
  //  Petits outils de dessin
  // ---------------------------------------------------------------
  function disque(ctx, x, y, r) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, PI2); ctx.fill(); }
  function ovale(ctx, x, y, rx, ry, rot) { ctx.beginPath(); ctx.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot || 0, 0, PI2); }
  function remplirOvale(ctx, x, y, rx, ry, rot, couleur, trait) {
    ovale(ctx, x, y, rx, ry, rot);
    ctx.fillStyle = couleur;
    ctx.fill();
    if (trait) { ctx.strokeStyle = TRAIT; ctx.lineWidth = trait; ctx.stroke(); }
  }
  function lueur(ctx, x, y, r, rgb, a) {
    if (r <= 0 || a <= 0) return;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(" + rgb + "," + Math.min(1, a).toFixed(3) + ")");
    g.addColorStop(1, "rgba(" + rgb + ",0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
    ctx.restore();
  }
  // Un dégradé linéaire : arrets = [[0, couleur], [1, couleur]...]
  function degrade(ctx, x0, y0, x1, y1, arrets) {
    var g = ctx.createLinearGradient(x0, y0, x1, y1);
    arrets.forEach(function (a) { g.addColorStop(a[0], a[1]); });
    return g;
  }
  // Remplit puis cerne le chemin en cours.
  function peindre(ctx, remplissage, epaisseur) {
    ctx.fillStyle = remplissage;
    ctx.fill();
    if (epaisseur !== 0) { ctx.strokeStyle = TRAIT; ctx.lineWidth = epaisseur || 2; ctx.stroke(); }
  }
  // Un membre qui s'affine : de a (largeur wa) à b (largeur wb).
  // Seuls ses deux bords sont cernés, pour que les articulations restent souples.
  function membre(ctx, a, b, wa, wb, couleurs, epaisseur) {
    var dx = b.x - a.x, dy = b.y - a.y, l = Math.sqrt(dx * dx + dy * dy) || 0.01;
    var nx = -dy / l, ny = dx / l;
    var g = ctx.createLinearGradient(a.x + nx * wa / 2, a.y + ny * wa / 2, a.x - nx * wa / 2, a.y - ny * wa / 2);
    g.addColorStop(0, couleurs[0]); g.addColorStop(0.5, couleurs[1]); g.addColorStop(1, couleurs[2]);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(a.x + nx * wa / 2, a.y + ny * wa / 2);
    ctx.lineTo(b.x + nx * wb / 2, b.y + ny * wb / 2);
    ctx.lineTo(b.x - nx * wb / 2, b.y - ny * wb / 2);
    ctx.lineTo(a.x - nx * wa / 2, a.y - ny * wa / 2);
    ctx.closePath();
    ctx.fill();
    disque(ctx, a.x, a.y, wa / 2);
    disque(ctx, b.x, b.y, wb / 2);
    if (epaisseur !== 0) {
      ctx.strokeStyle = TRAIT;
      ctx.lineWidth = epaisseur || 2;
      ctx.beginPath();
      ctx.moveTo(a.x + nx * wa / 2, a.y + ny * wa / 2); ctx.lineTo(b.x + nx * wb / 2, b.y + ny * wb / 2);
      ctx.moveTo(a.x - nx * wa / 2, a.y - ny * wa / 2); ctx.lineTo(b.x - nx * wb / 2, b.y - ny * wb / 2);
      ctx.stroke();
    }
  }
  // Un œil qui brille.
  function oeil(ctx, x, y, r, rgb, force) {
    lueur(ctx, x, y, r * 5 * (0.7 + 0.5 * force), rgb, 0.55 * force + 0.25);
    ctx.fillStyle = "rgb(" + rgb + ")";
    disque(ctx, x, y, r);
    ctx.fillStyle = "rgba(255,255,240,0.95)";
    disque(ctx, x + r * 0.15, y - r * 0.1, r * 0.45);
  }
  // Une corne courbe, de la base (x, y) vers la pointe.
  function corne(ctx, x, y, x1, y1, x2, y2, larg, couleurs) {
    ctx.beginPath();
    ctx.moveTo(x - larg / 2, y);
    ctx.quadraticCurveTo(x1, y1, x2, y2);
    ctx.quadraticCurveTo(x1 + larg * 0.3, y1 + larg * 0.6, x + larg / 2, y + larg * 0.2);
    ctx.closePath();
    peindre(ctx, degrade(ctx, x, y, x2, y2, [[0, couleurs[0]], [0.6, couleurs[1]], [1, couleurs[2]]]), 1.6);
  }
  function entre(k, a, b) { return Math.max(0, Math.min(1, (k - a) / (b - a))); }
  function douce(k) { k = Math.max(0, Math.min(1, k)); return k * k * (3 - 2 * k); }
  // Une cloche : 0 → 1 → 0 sur l'intervalle [a ; b]
  function cloche(k, a, b) { var u = entre(k, a, b); return Math.sin(u * PI); }

  // =================================================================
  //  LE MINOTAURE : un homme à tête de taureau, avec sa hache double
  // =================================================================
  function enCharge(a) { return a.action === "attaque" ? douce(entre(a.k, 0, 0.25)) * (1 - entre(a.k, 0.75, 1)) : 0; }

  var minotaure = {
    nom: "Le Minotaure", titre: "le gardien du labyrinthe de Crète",
    attaque: "Charge du taureau", genre: "charge", hauteur: 250, rgb: "255,90,60",
    points: function (a) {
      var c = enCharge(a);
      return { tete: { x: 62 + 26 * c, y: -190 + 50 * c }, cornes: { x: 92 + 34 * c, y: -224 + 62 * c },
        centre: { x: 4, y: -130 }, main: { x: 70, y: -100 } };
    },
    dessiner: function (ctx, a) {
      var t = a.t, souffle = Math.sin(t * 2.1);
      var att = a.action === "attaque", charge = enCharge(a);
      var touche = a.action === "touche" ? cloche(a.k, 0, 1) : 0;
      var rire = a.action === "rire" ? Math.sin(a.k * PI * 6) * (1 - a.k) : 0;
      var course = att && a.k > 0.2 && a.k < 0.8 ? Math.sin(a.k * 40) : 0;
      var sombre = ["#5a2f1c", "#40200f", "#22110a"], peau = ["#c46e42", "#8a4426", "#45200f"];
      var sabot = "#1e140e";
      ctx.save();
      ctx.rotate(charge * 0.3 - touche * 0.16);
      // Le bras arrière, levé, qui tient la hache double (labrys) dans le dos
      var lev = Math.sin(t * 1.6) * 0.05 + charge * 0.5;
      ctx.save();
      ctx.translate(-26, -168);
      ctx.rotate(-0.5 - lev);
      ctx.fillStyle = degrade(ctx, -4, 0, 4, 0, [[0, "#3a2414"], [0.5, "#7a5230"], [1, "#3a2414"]]);
      ctx.fillRect(-36, -96, 7, 150);
      ctx.strokeStyle = TRAIT; ctx.lineWidth = 1.5; ctx.strokeRect(-36, -96, 7, 150);
      for (var cote = -1; cote <= 1; cote += 2) {
        ctx.beginPath();
        ctx.moveTo(-32.5, -88);
        ctx.quadraticCurveTo(-32.5 + cote * 18, -98, -32.5 + cote * 44, -116);
        ctx.quadraticCurveTo(-32.5 + cote * 32, -82, -32.5 + cote * 44, -50);
        ctx.quadraticCurveTo(-32.5 + cote * 18, -70, -32.5, -66);
        ctx.closePath();
        peindre(ctx, degrade(ctx, -32, -116, -32 + cote * 44, -50, [[0, "#ffd9a0"], [0.45, "#c47b36"], [1, "#6b3a14"]]), 2);
      }
      membre(ctx, { x: 0, y: 0 }, { x: -20, y: -34 }, 26, 20, sombre, 2);
      membre(ctx, { x: -20, y: -34 }, { x: -32, y: -66 }, 20, 18, sombre, 2);
      remplirOvale(ctx, -32, -66, 11, 10, 0, "#40200f", 2);
      ctx.restore();
      // La jambe arrière
      membre(ctx, { x: -12, y: -98 }, { x: -24 - course * 10, y: -52 }, 34, 24, sombre, 2);
      membre(ctx, { x: -24 - course * 10, y: -52 }, { x: -18 - course * 16, y: -10 }, 24, 17, sombre, 2);
      ctx.beginPath(); ctx.moveTo(-31 - course * 16, -13); ctx.lineTo(-5 - course * 16, -13); ctx.lineTo(-3 - course * 16, 0); ctx.lineTo(-33 - course * 16, 0); ctx.closePath();
      peindre(ctx, sabot, 1.5);
      // La jambe avant
      membre(ctx, { x: 12, y: -98 }, { x: 22 + course * 10, y: -52 }, 34, 24, peau, 2);
      membre(ctx, { x: 22 + course * 10, y: -52 }, { x: 18 + course * 16, y: -10 }, 24, 17, peau, 2);
      ctx.beginPath(); ctx.moveTo(4 + course * 16, -13); ctx.lineTo(31 + course * 16, -13); ctx.lineTo(34 + course * 16, 0); ctx.lineTo(2 + course * 16, 0); ctx.closePath();
      peindre(ctx, sabot, 1.5);
      // Le pagne et la ceinture de bronze
      ctx.beginPath();
      ctx.moveTo(-32, -114); ctx.lineTo(32, -114); ctx.lineTo(38, -72); ctx.quadraticCurveTo(0, -62, -36, -72); ctx.closePath();
      peindre(ctx, degrade(ctx, 0, -114, 0, -66, [[0, "#8a241c"], [1, "#4a0f0b"]]), 2);
      ctx.fillStyle = "#c47b36"; ctx.fillRect(-33, -120, 67, 9);
      ctx.strokeStyle = TRAIT; ctx.lineWidth = 1.5; ctx.strokeRect(-33, -120, 67, 9);
      ctx.fillStyle = "#f6d47a"; disque(ctx, 4, -115.5, 6);
      // Le torse musclé, qui respire
      ctx.save();
      ctx.translate(0, -114);
      ctx.scale(1 + souffle * 0.015, 1 + souffle * 0.022);
      ctx.beginPath();
      ctx.moveTo(-30, 0);
      ctx.quadraticCurveTo(-38, -30, -48, -58);
      ctx.quadraticCurveTo(-36, -78, 0, -74);
      ctx.quadraticCurveTo(48, -76, 58, -52);
      ctx.quadraticCurveTo(60, -26, 32, 0);
      ctx.closePath();
      peindre(ctx, degrade(ctx, -48, 0, 60, 0, [[0, peau[2]], [0.35, peau[1]], [0.72, peau[0]], [1, peau[1]]]), 2.2);
      ctx.strokeStyle = "rgba(40,12,4,0.5)"; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-4, -58); ctx.quadraticCurveTo(24, -40, 54, -52);
      ctx.moveTo(12, -34); ctx.quadraticCurveTo(24, -30, 36, -34);
      ctx.moveTo(12, -19); ctx.quadraticCurveTo(22, -15, 32, -19);
      ctx.moveTo(20, -46); ctx.lineTo(21, -6);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,200,150,0.35)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(14, -70); ctx.quadraticCurveTo(46, -70, 56, -50); ctx.stroke();
      ctx.restore();
      // La fourrure sur les épaules
      ctx.fillStyle = "#3a2216";
      for (var f = 0; f < 10; f++) {
        var fx = -44 + f * 10, fy = -184 + Math.abs(f - 4.5) * 3;
        ctx.beginPath(); ctx.moveTo(fx - 7, fy + 12); ctx.lineTo(fx + 2, fy - 12 - (f % 2) * 7); ctx.lineTo(fx + 9, fy + 12); ctx.closePath(); ctx.fill();
      }
      // La tête de taureau
      ctx.save();
      ctx.translate(42, -184);
      ctx.rotate(charge * 0.55 - touche * 0.3 + rire * 0.12 + Math.sin(t * 1.3) * 0.03);
      ctx.scale(1.3, 1.3);
      corne(ctx, -8, -14, -34, -58, 6, -70, 13, ["#c9bc98", "#b0a27e", "#e9dfc6"]);
      remplirOvale(ctx, 6, -2, 28, 21, 0.18, degrade(ctx, -20, -20, 30, 20, [[0, "#3e1a0e"], [0.5, "#6b3320"], [1, "#a85c38"]]), 2);
      remplirOvale(ctx, -16, -12, 12, 5, -0.6, "#5c2c17", 1.5);
      remplirOvale(ctx, 30, 9, 18, 14, 0.28, degrade(ctx, 18, -2, 40, 24, [[0, "#c08a66"], [1, "#7a4e36"]]), 2);
      ctx.fillStyle = "#1e0e08"; disque(ctx, 39, 11, 3.2); disque(ctx, 31, 17, 2.6);
      ctx.strokeStyle = "#f6d47a"; ctx.lineWidth = 2.6;
      ctx.beginPath(); ctx.arc(38, 21, 6, -0.3, PI + 0.3); ctx.stroke();
      // une touffe sur le front
      ctx.fillStyle = "#2a160c";
      ctx.beginPath(); ctx.moveTo(-6, -18); ctx.quadraticCurveTo(6, -30, 18, -18); ctx.quadraticCurveTo(6, -14, -6, -18); ctx.fill();
      oeil(ctx, 14, -7, 3.6, "255,80,40", 0.6 + 0.4 * charge + 0.3 * Math.sin(t * 3));
      ctx.strokeStyle = "rgba(20,8,4,0.85)"; ctx.lineWidth = 2.6;
      ctx.beginPath(); ctx.moveTo(5, -14); ctx.lineTo(23, -10); ctx.stroke();
      corne(ctx, 10, -18, 14, -60, 54, -58, 14, ["#d8ccaa", "#e9dfc6", "#fffaf0"]);
      ctx.restore();
      // La vapeur qui sort des naseaux
      var cyc = (t * 0.7) % 1;
      if (cyc < 0.45) {
        var u = cyc / 0.45;
        ctx.fillStyle = "rgba(235,225,215," + (0.35 * (1 - u)).toFixed(3) + ")";
        disque(ctx, 98 + u * 26, -160 + u * 6, 4 + u * 10);
        disque(ctx, 90 + u * 20, -152 + u * 10, 3 + u * 8);
      }
      // Le bras avant, poing serré
      membre(ctx, { x: 38, y: -170 }, { x: 60, y: -130 }, 30, 23, peau, 2);
      membre(ctx, { x: 60, y: -130 }, { x: 70, y: -100 }, 23, 21, peau, 2);
      remplirOvale(ctx, 71, -96, 13, 12, 0, degrade(ctx, 60, -108, 84, -84, [[0, "#c46e42"], [1, "#6b3320"]]), 2);
      ctx.restore();
    }
  };

  // =================================================================
  //  LE CYCLOPE : un géant à l'œil unique, qui lance des rochers
  // =================================================================
  // Où en est le lancer : 0 au repos, 1 quand le rocher est au-dessus de la tête.
  function levage(a) {
    if (a.action !== "attaque") return 0;
    return douce(entre(a.k, 0, 0.38)) * (1 - douce(entre(a.k, 0.42, 0.62)));
  }
  function rocherTenu(a) { return a.action !== "attaque" || a.k < 0.42; }
  function dessinerRocher(ctx, x, y, r, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot || 0);
    ctx.beginPath();
    for (var k = 0; k < 9; k++) {
      var an = k / 9 * PI2, rr = r * (0.82 + 0.18 * Math.sin(k * 2.7 + 1));
      if (k === 0) ctx.moveTo(Math.cos(an) * rr, Math.sin(an) * rr); else ctx.lineTo(Math.cos(an) * rr, Math.sin(an) * rr);
    }
    ctx.closePath();
    peindre(ctx, degrade(ctx, -r, -r, r, r, [[0, "#a59a88"], [0.5, "#6f6858"], [1, "#3a352c"]]), 2);
    ctx.strokeStyle = "rgba(30,25,20,0.5)"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(-r * 0.4, -r * 0.2); ctx.lineTo(r * 0.1, r * 0.15); ctx.lineTo(r * 0.3, -r * 0.3); ctx.stroke();
    ctx.restore();
  }

  var cyclope = {
    nom: "Le Cyclope", titre: "le géant à l'œil unique",
    attaque: "Rocher du Cyclope", genre: "rocher", hauteur: 270, rgb: "255,190,70",
    points: function (a) {
      var l = levage(a);
      return { oeil: { x: 46, y: -214 }, tete: { x: 40, y: -206 }, centre: { x: 0, y: -130 },
        main: { x: -52 + 66 * l, y: -84 - 196 * l }, rocher: rocherTenu(a) };
    },
    dessiner: function (ctx, a) {
      var t = a.t, souffle = Math.sin(t * 1.7);
      var l = levage(a), touche = a.action === "touche" ? cloche(a.k, 0, 1) : 0;
      var rire = a.action === "rire" ? Math.sin(a.k * PI * 5) * (1 - a.k) : 0;
      var suite = a.action === "attaque" ? cloche(a.k, 0.42, 0.75) : 0;   // le corps suit le lancer
      var peau = ["#b3c095", "#7d8a6a", "#434c37"], sombre = ["#6d785a", "#535c44", "#2c3324"];
      ctx.save();
      ctx.rotate(-l * 0.1 + suite * 0.18 - touche * 0.15);
      // Le bras arrière (au repos, ou levé avec le rocher)
      var ep = { x: -44, y: -168 };
      var coude = { x: -62 + 46 * l, y: -124 - 112 * l }, main = { x: -52 + 66 * l, y: -84 - 196 * l };
      membre(ctx, ep, coude, 34, 26, sombre, 2);
      membre(ctx, coude, main, 26, 24, sombre, 2);
      if (rocherTenu(a)) dessinerRocher(ctx, main.x, main.y - 18 * l, 26, t * 0.2);
      remplirOvale(ctx, main.x, main.y, 14, 13, 0, "#535c44", 2);
      // Les jambes, courtes et épaisses
      membre(ctx, { x: -26, y: -86 }, { x: -34, y: -44 }, 40, 32, sombre, 2);
      membre(ctx, { x: -34, y: -44 }, { x: -30, y: -10 }, 32, 26, sombre, 2);
      remplirOvale(ctx, -22, -7, 22, 9, 0, "#535c44", 2);
      membre(ctx, { x: 24, y: -86 }, { x: 32, y: -44 }, 40, 32, peau, 2);
      membre(ctx, { x: 32, y: -44 }, { x: 30, y: -10 }, 32, 26, peau, 2);
      remplirOvale(ctx, 42, -7, 23, 9, 0, "#7d8a6a", 2);
      ctx.fillStyle = "#2c2a20";
      for (var o = 0; o < 3; o++) disque(ctx, 56 + o * 4, -7 + o * 1.5, 2.6);
      // Le pagne en peau de bête, tacheté
      ctx.beginPath();
      ctx.moveTo(-52, -104); ctx.lineTo(54, -104);
      for (var d = 0; d <= 8; d++) ctx.lineTo(56 - d * 13.5, -62 + (d % 2) * 10);
      ctx.closePath();
      peindre(ctx, degrade(ctx, 0, -104, 0, -60, [[0, "#c79a52"], [1, "#8a6230"]]), 2);
      ctx.fillStyle = "#4a3418";
      [[-30, -90], [-8, -80], [18, -92], [38, -78], [-40, -72], [6, -96]].forEach(function (q) { disque(ctx, q[0], q[1], 4); });
      // Le gros ventre, qui respire
      ctx.save();
      ctx.translate(8, -124);
      ctx.scale(1 + souffle * 0.02, 1 + souffle * 0.03);
      remplirOvale(ctx, 0, 0, 62, 50, 0, degrade(ctx, -62, 0, 62, 0, [[0, peau[2]], [0.4, peau[1]], [0.78, peau[0]], [1, peau[1]]]), 2.2);
      ctx.strokeStyle = "rgba(40,50,30,0.5)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(14, 6, 26, -0.4, 1.2); ctx.stroke();
      ctx.fillStyle = "#434c37"; disque(ctx, 30, 14, 2.5);
      ctx.restore();
      // Les épaules voûtées
      remplirOvale(ctx, -4, -172, 64, 38, -0.08, degrade(ctx, -60, -172, 60, -172, [[0, peau[2]], [0.5, peau[1]], [1, peau[0]]]), 2.2);
      // La tête et son œil unique
      ctx.save();
      ctx.translate(34, -206);
      ctx.rotate(-l * 0.15 + rire * 0.15 - touche * 0.25);
      remplirOvale(ctx, 0, 0, 34, 32, 0, degrade(ctx, -34, -32, 34, 32, [[0, peau[2]], [0.55, peau[1]], [1, peau[0]]]), 2.2);
      remplirOvale(ctx, -26, 2, 7, 11, 0, peau[1], 1.6);
      ctx.strokeStyle = "#2c2a20"; ctx.lineWidth = 3;
      ctx.beginPath();
      for (var c = 0; c < 5; c++) { ctx.moveTo(-18 + c * 7, -30); ctx.quadraticCurveTo(-24 + c * 7, -44, -16 + c * 6, -50); }
      ctx.stroke();
      // l'œil, qui cligne de temps en temps
      var cligne = (t % 4.2) < 0.15 ? 1 : 0;
      remplirOvale(ctx, 12, -8, 16, 14, 0, "#f3ecd0", 2);
      if (!cligne) {
        lueur(ctx, 15, -8, 30, "255,190,70", 0.35 + 0.25 * Math.sin(t * 2) + 0.4 * l);
        remplirOvale(ctx, 15, -8, 8.5, 8.5, 0, degrade(ctx, 8, -16, 22, 0, [[0, "#ffd36a"], [1, "#c26a10"]]));
        ctx.fillStyle = "#120a04"; disque(ctx, 16.5, -8, 4);
        ctx.fillStyle = "#fffbe8"; disque(ctx, 13.5, -11, 1.8);
      } else {
        remplirOvale(ctx, 12, -8, 16, 14, 0, peau[1], 2);
      }
      // le sourcil, froncé vers l'avant : il a l'air furieux
      ctx.beginPath(); ctx.moveTo(-10, -30); ctx.quadraticCurveTo(12, -32, 34, -12); ctx.lineTo(30, -6); ctx.quadraticCurveTo(12, -22, -8, -20); ctx.closePath();
      peindre(ctx, "#3a4230", 1.5);
      ctx.strokeStyle = "rgba(170,40,30,0.5)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(-2, -4); ctx.lineTo(4, -6); ctx.moveTo(0, 2); ctx.lineTo(6, 0); ctx.moveTo(26, 0); ctx.lineTo(22, -2); ctx.stroke();
      // le nez, la bouche et les défenses
      remplirOvale(ctx, 33, 4, 6, 8, 0.3, peau[0], 1.6);
      var ouvre = 3 + 7 * l + 5 * Math.max(0, rire);
      ctx.beginPath();
      ctx.moveTo(4, 16); ctx.quadraticCurveTo(20, 18 + ouvre, 34, 14); ctx.quadraticCurveTo(20, 14, 4, 16); ctx.closePath();
      peindre(ctx, "#2a1a10", 1.6);
      ctx.fillStyle = "#f3ecd0";
      ctx.beginPath(); ctx.moveTo(10, 18); ctx.lineTo(13, 6); ctx.lineTo(15, 18); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(25, 17); ctx.lineTo(28, 7); ctx.lineTo(30, 16); ctx.closePath(); ctx.fill();
      ctx.restore();
      // Le bras avant et sa massue
      membre(ctx, { x: 46, y: -170 }, { x: 76, y: -128 }, 36, 28, peau, 2);
      membre(ctx, { x: 76, y: -128 }, { x: 88, y: -90 }, 28, 26, peau, 2);
      ctx.save();
      ctx.translate(88, -88);
      ctx.rotate(-0.5 + suite * 0.5);
      ctx.beginPath();
      ctx.moveTo(-5, -10); ctx.lineTo(5, -10); ctx.lineTo(16, 86); ctx.quadraticCurveTo(0, 100, -16, 86); ctx.closePath();
      peindre(ctx, degrade(ctx, -16, 0, 16, 0, [[0, "#3a2414"], [0.45, "#8a5a2b"], [1, "#4a2c14"]]), 2);
      ctx.fillStyle = "#3a2414";
      [[4, 30], [-6, 52], [8, 70]].forEach(function (q) { remplirOvale(ctx, q[0], q[1], 4, 3, 0, "#3a2414"); });
      ctx.fillStyle = "#c9c0a8";
      [[14, 60], [-14, 74], [13, 82]].forEach(function (q) { ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(q[0] + (q[0] > 0 ? 9 : -9), q[1] - 3); ctx.lineTo(q[0], q[1] - 6); ctx.closePath(); ctx.fill(); });
      ctx.restore();
      remplirOvale(ctx, 88, -88, 15, 14, 0, peau[1], 2);
      ctx.restore();
    }
  };

  // =================================================================
  //  L'HYDRE DE LERNE : un serpent géant à plusieurs têtes
  // =================================================================
  var COUS = [
    { bx: -46, by: -78, hx: -22, hy: -238, ph: 0.0, taille: 1.1 },
    { bx: 6, by: -88, hx: 66, hy: -214, ph: 1.7, taille: 1.25 },
    { bx: 44, by: -70, hx: 108, hy: -142, ph: 3.1, taille: 1.15 }
  ];
  // La position d'une tête ; la tête du milieu se jette sur Talos pendant l'attaque.
  function teteHydre(a, i) {
    var c = COUS[i], t = a.t;
    var x = c.hx + Math.sin(t * 1.4 + c.ph) * 9, y = c.hy + Math.cos(t * 1.15 + c.ph) * 7;
    if (a.action === "attaque" && i === 1) {
      var recul = douce(entre(a.k, 0, 0.3)) * (1 - entre(a.k, 0.3, 0.42));
      var jet = douce(entre(a.k, 0.3, 0.46)) * (1 - douce(entre(a.k, 0.62, 1)));
      x += -30 * recul + ((a.portee || 420) - 70 - c.hx) * jet;
      y += -24 * recul + (-118 - c.hy) * jet;
    }
    if (a.action === "touche") { x -= 26 * cloche(a.k, 0, 1); y -= 10 * cloche(a.k, 0, 1); }
    return { x: x, y: y };
  }
  function dessinerCou(ctx, c, h) {
    var c1x = c.bx + 6, c1y = c.by - 70, c2x = h.x - 50, c2y = h.y + 40;
    ctx.lineCap = "round";
    ctx.strokeStyle = TRAIT; ctx.lineWidth = 27 * c.taille;
    ctx.beginPath(); ctx.moveTo(c.bx, c.by); ctx.bezierCurveTo(c1x, c1y, c2x, c2y, h.x, h.y); ctx.stroke();
    ctx.strokeStyle = "#3f7a3a"; ctx.lineWidth = 23 * c.taille;
    ctx.stroke();
    ctx.strokeStyle = "rgba(200,200,120,0.85)"; ctx.lineWidth = 8 * c.taille;
    ctx.beginPath(); ctx.moveTo(c.bx + 6, c.by + 2); ctx.bezierCurveTo(c1x + 8, c1y + 4, c2x + 6, c2y + 8, h.x + 4, h.y + 6); ctx.stroke();
    ctx.strokeStyle = "rgba(160,220,140,0.5)"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(c.bx - 6, c.by - 2); ctx.bezierCurveTo(c1x - 6, c1y - 4, c2x - 4, c2y - 8, h.x - 6, h.y - 6); ctx.stroke();
    ctx.lineCap = "butt";
  }
  function dessinerTeteSerpent(ctx, x, y, s, ouverture, t, ph, regard) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(s, s);
    ctx.rotate(-0.15 + ouverture * -0.2);
    // les crêtes
    ctx.fillStyle = "#2a5a28";
    for (var k = 0; k < 3; k++) {
      ctx.beginPath(); ctx.moveTo(-16 + k * 7, -8); ctx.lineTo(-30 + k * 6, -24 - k * 2); ctx.lineTo(-8 + k * 7, -10); ctx.closePath(); ctx.fill();
    }
    // la mâchoire du bas
    ctx.save();
    ctx.rotate(ouverture * 0.55);
    ctx.beginPath();
    ctx.moveTo(-14, 2); ctx.quadraticCurveTo(10, 12, 34, 6); ctx.lineTo(30, 1); ctx.quadraticCurveTo(8, 4, -10, -2); ctx.closePath();
    peindre(ctx, "#356a32", 1.6);
    ctx.fillStyle = "#f3ecd0";
    ctx.beginPath(); ctx.moveTo(24, 3); ctx.lineTo(26, -5); ctx.lineTo(28, 3); ctx.closePath(); ctx.fill();
    ctx.restore();
    // le crâne
    ctx.beginPath();
    ctx.moveTo(-18, 2); ctx.quadraticCurveTo(-20, -14, 0, -14); ctx.quadraticCurveTo(26, -12, 38, -2);
    ctx.quadraticCurveTo(30, 4, 10, 4); ctx.closePath();
    peindre(ctx, degrade(ctx, 0, -14, 0, 4, [[0, "#5aa04f"], [1, "#2f5c2c"]]), 1.8);
    if (ouverture > 0.1) {
      ctx.fillStyle = "#f3ecd0";
      ctx.beginPath(); ctx.moveTo(28, 0); ctx.lineTo(30, 10 * ouverture + 2); ctx.lineTo(32, 0); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(18, 2); ctx.lineTo(20, 8 * ouverture + 2); ctx.lineTo(22, 2); ctx.closePath(); ctx.fill();
    }
    // la langue fourchue
    var langue = Math.max(0, Math.sin(t * 3 + ph * 2)) > 0.92 ? 1 : 0;
    if (langue || ouverture > 0.3) {
      ctx.strokeStyle = "#c0303a"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(36, 1); ctx.lineTo(48, 2); ctx.lineTo(53, -2); ctx.moveTo(48, 2); ctx.lineTo(53, 5); ctx.stroke();
    }
    oeil(ctx, 8, -7, 2.8, "190,255,90", regard);
    ctx.fillStyle = "#1a2a10"; disque(ctx, 33, -5, 1.4);
    ctx.restore();
  }

  var hydre = {
    nom: "L'Hydre de Lerne", titre: "le serpent aux têtes innombrables",
    attaque: "Morsure de l'Hydre", genre: "morsure", hauteur: 260, rgb: "150,255,110",
    points: function (a) {
      var h = teteHydre(a, 1);
      return { tete: { x: h.x + 30, y: h.y }, centre: { x: 0, y: -120 } };
    },
    dessiner: function (ctx, a) {
      var t = a.t, souffle = Math.sin(t * 1.5);
      var touche = a.action === "touche" ? cloche(a.k, 0, 1) : 0;
      var att = a.action === "attaque";
      ctx.save();
      ctx.rotate(-touche * 0.06);
      // La queue qui ondule derrière
      ctx.lineCap = "round";
      var qx = -150 + Math.sin(t * 1.3) * 10, qy = -66 + Math.cos(t * 1.1) * 8;
      ctx.strokeStyle = TRAIT; ctx.lineWidth = 22;
      ctx.beginPath(); ctx.moveTo(-70, -26); ctx.quadraticCurveTo(-130, -10, qx, qy); ctx.stroke();
      ctx.strokeStyle = "#356a32"; ctx.lineWidth = 18; ctx.stroke();
      ctx.strokeStyle = TRAIT; ctx.lineWidth = 10;
      ctx.beginPath(); ctx.moveTo(qx, qy); ctx.quadraticCurveTo(qx - 16, qy - 26, qx + 4, qy - 34); ctx.stroke();
      ctx.strokeStyle = "#356a32"; ctx.lineWidth = 7; ctx.stroke();
      ctx.lineCap = "butt";
      // Les deux petites têtes du fond (plus sombres)
      ctx.save();
      ctx.globalAlpha = 0.85;
      [{ bx: -70, by: -60, hx: -86, hy: -190, ph: 2.3, taille: 0.7 }, { bx: 70, by: -58, hx: 130, hy: -228, ph: 4.0, taille: 0.7 }].forEach(function (c) {
        var h = { x: c.hx + Math.sin(t * 1.3 + c.ph) * 8, y: c.hy + Math.cos(t * 1.2 + c.ph) * 6 };
        dessinerCou(ctx, c, h);
        dessinerTeteSerpent(ctx, h.x, h.y, 0.75, att ? 0.5 : 0.1, t, c.ph, 0.6);
      });
      ctx.restore();
      // Les anneaux du corps, couverts d'écailles
      ctx.save();
      ctx.scale(1 + souffle * 0.015, 1 + souffle * 0.02);
      remplirOvale(ctx, -12, -36, 94, 34, 0, degrade(ctx, 0, -70, 0, 0, [[0, "#5aa04f"], [0.6, "#3f7a3a"], [1, "#24481f"]]), 2.2);
      remplirOvale(ctx, -4, -74, 72, 30, 0.04, degrade(ctx, 0, -104, 0, -44, [[0, "#64ad58"], [0.6, "#3f7a3a"], [1, "#24481f"]]), 2.2);
      ctx.strokeStyle = "rgba(20,50,18,0.45)"; ctx.lineWidth = 1.4;
      for (var e = 0; e < 14; e++) {
        ctx.beginPath(); ctx.arc(-80 + e * 12, -40 + (e % 2) * 6, 7, PI * 0.1, PI * 0.9); ctx.stroke();
        if (e < 11) { ctx.beginPath(); ctx.arc(-60 + e * 12, -76 + (e % 2) * 5, 6, PI * 0.1, PI * 0.9); ctx.stroke(); }
      }
      remplirOvale(ctx, 20, -20, 60, 10, 0, "rgba(220,214,140,0.55)");
      ctx.restore();
      // Les trois grands cous et leurs têtes
      for (var i = 0; i < COUS.length; i++) {
        var h = teteHydre(a, i);
        dessinerCou(ctx, COUS[i], h);
        var ouvre = 0.15 + 0.1 * Math.sin(t * 2 + i);
        if (att && i === 1) ouvre = a.k < 0.3 ? 0.9 : (a.k < 0.5 ? 1 : (a.k < 0.58 ? 0.1 : 0.4));
        else if (att) ouvre = 0.6;
        if (a.action === "rire") ouvre = 0.5 + 0.4 * Math.sin(a.k * PI * 8);
        dessinerTeteSerpent(ctx, h.x, h.y, COUS[i].taille, ouvre, t, COUS[i].ph, 0.7 + 0.3 * Math.sin(t * 2.5 + i));
      }
      ctx.restore();
    }
  };

  // =================================================================
  //  MÉDUSE : la Gorgone aux cheveux de serpents, au regard qui pétrifie
  // =================================================================
  function regardMeduse(a) { return a.action === "attaque" ? douce(entre(a.k, 0, 0.35)) * (1 - douce(entre(a.k, 0.85, 1))) : 0; }

  var meduse = {
    nom: "Méduse", titre: "la Gorgone au regard de pierre",
    attaque: "Regard de pierre", genre: "regard", hauteur: 250, rgb: "190,255,120",
    points: function (a) {
      var r = regardMeduse(a);
      return { yeux: { x: 30 + 8 * r, y: -195 + 4 * r }, tete: { x: 20 + 8 * r, y: -192 }, centre: { x: 0, y: -130 } };
    },
    dessiner: function (ctx, a) {
      var t = a.t, r = regardMeduse(a), souffle = Math.sin(t * 1.8);
      var touche = a.action === "touche" ? cloche(a.k, 0, 1) : 0;
      var rire = a.action === "rire" ? Math.sin(a.k * PI * 6) * (1 - a.k) : 0;
      var peau = ["#c3d9b8", "#98b28c", "#5a7352"];
      ctx.save();
      ctx.rotate(-touche * 0.12 + r * 0.06);
      // La queue de serpent, enroulée sur le sol
      ctx.lineCap = "round";
      var qx = -116 + Math.sin(t * 1.4) * 10, qy = -16 + Math.cos(t * 1.2) * 5;
      function anneau(l1, l2, l3) {
        ctx.beginPath();
        ctx.moveTo(0, -100);
        ctx.bezierCurveTo(-10, -60, -70, -54, -60, -26);
        ctx.bezierCurveTo(-50, 0, 40, 0, 50, -20);
        ctx.bezierCurveTo(56, -36, 20, -40, -10, -30);
        ctx.quadraticCurveTo(-70, -10, qx, qy);
        ctx.strokeStyle = l1; ctx.lineWidth = l2; ctx.stroke();
        if (l3) { ctx.strokeStyle = l3[0]; ctx.lineWidth = l3[1]; ctx.stroke(); }
      }
      anneau(TRAIT, 38, ["#4f6e4a", 33]);
      ctx.save(); ctx.translate(0, 5); anneau("rgba(205,200,140,0.6)", 9); ctx.restore();
      ctx.strokeStyle = TRAIT; ctx.lineWidth = 12;
      ctx.beginPath(); ctx.moveTo(qx, qy); ctx.quadraticCurveTo(qx - 22, qy - 20, qx - 8, qy - 36); ctx.stroke();
      ctx.strokeStyle = "#4f6e4a"; ctx.lineWidth = 8; ctx.stroke();
      ctx.lineCap = "butt";
      // Le bras arrière, levé, toutes griffes dehors
      membre(ctx, { x: -16, y: -158 }, { x: -38, y: -184 }, 13, 11, ["#7f9876", "#6a8262", "#3e5238"], 1.8);
      membre(ctx, { x: -38, y: -184 }, { x: -32 + r * 6, y: -214 }, 11, 9, ["#7f9876", "#6a8262", "#3e5238"], 1.8);
      ctx.strokeStyle = "#1e2a1a"; ctx.lineWidth = 2;
      for (var g = 0; g < 4; g++) { ctx.beginPath(); ctx.moveTo(-32 + r * 6, -214); ctx.lineTo(-40 + g * 6 + r * 6, -230 + Math.abs(g - 1.5) * 2); ctx.stroke(); }
      // Le buste et la robe (péplos)
      ctx.save();
      ctx.translate(0, -100);
      ctx.scale(1, 1 + souffle * 0.02);
      ctx.beginPath();
      ctx.moveTo(-18, 6); ctx.quadraticCurveTo(-24, -30, -22, -58); ctx.quadraticCurveTo(0, -66, 26, -58);
      ctx.quadraticCurveTo(28, -30, 20, 6); ctx.closePath();
      peindre(ctx, degrade(ctx, -24, 0, 28, 0, [[0, "#163238"], [0.6, "#2b5560"], [1, "#3b6f7a"]]), 2);
      ctx.strokeStyle = "#e2b24c"; ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.moveTo(-20, -2); ctx.lineTo(22, -2); ctx.moveTo(-22, -52); ctx.quadraticCurveTo(2, -40, 24, -54); ctx.stroke();
      ctx.fillStyle = "#f6d47a"; disque(ctx, 18, -54, 3.4);
      ctx.restore();
      // La tête et ses serpents
      ctx.save();
      ctx.translate(16, -186);
      ctx.rotate(r * 0.18 - touche * 0.3 + rire * 0.1 + Math.sin(t * 1.1) * 0.03);
      ctx.scale(1.35, 1.35);
      var vif = 1 + 2.5 * r;
      for (var sp = 0; sp < 11; sp++) {
        var th = -PI * 0.98 + sp * PI * 0.088, longueur = 34 + (sp % 3) * 7 + r * 8;
        var x0 = Math.cos(th) * 13, y0 = Math.sin(th) * 15 - 4;
        ctx.strokeStyle = TRAIT; ctx.lineWidth = 7; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(x0, y0);
        var px = x0, py = y0;
        for (var q = 1; q <= 6; q++) {
          var u = q / 6, ond = Math.sin(t * 5 * vif + sp * 1.3 + u * 6) * 5 * u;
          px = x0 + Math.cos(th) * longueur * u - Math.sin(th) * ond;
          py = y0 + Math.sin(th) * longueur * u + Math.cos(th) * ond;
          ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.strokeStyle = sp % 2 ? "#5f8a3a" : "#4c7a2e"; ctx.lineWidth = 4.5; ctx.stroke();
        ctx.lineCap = "butt";
        remplirOvale(ctx, px, py, 5, 3.4, th, "#4c7a2e", 1.2);
        ctx.fillStyle = "#e0f050"; disque(ctx, px + Math.cos(th) * 1.5, py + Math.sin(th) * 1.5 - 1, 1);
      }
      // le visage, de profil
      ctx.beginPath();
      ctx.moveTo(-12, -10); ctx.quadraticCurveTo(-4, -20, 8, -16); ctx.quadraticCurveTo(15, -10, 15, -3);
      ctx.lineTo(19, 3); ctx.lineTo(15, 5); ctx.quadraticCurveTo(15, 9, 12, 11); ctx.quadraticCurveTo(13, 14, 9, 17);
      ctx.quadraticCurveTo(0, 21, -8, 14); ctx.quadraticCurveTo(-14, 4, -12, -10); ctx.closePath();
      peindre(ctx, degrade(ctx, -12, -16, 16, 16, [[0, peau[2]], [0.5, peau[1]], [1, peau[0]]]), 1.8);
      ctx.strokeStyle = "#3a1a2a"; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(8, 11); ctx.lineTo(13, 11.5 + 2 * Math.max(0, rire)); ctx.stroke();
      ctx.fillStyle = "#f6d47a"; disque(ctx, -6, 6, 2.2);
      oeil(ctx, 9, -6, 2.6 + r * 1.2, "190,255,120", 0.5 + 0.5 * r + 0.2 * Math.sin(t * 4));
      ctx.strokeStyle = "rgba(20,30,15,0.9)"; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(3, -12); ctx.lineTo(14, -9); ctx.stroke();
      ctx.restore();
      // Le bras avant, tendu vers Talos
      membre(ctx, { x: 22, y: -154 }, { x: 46 + r * 6, y: -132 }, 13, 11, peau, 1.8);
      membre(ctx, { x: 46 + r * 6, y: -132 }, { x: 70 + r * 8, y: -140 - r * 8 }, 11, 9, peau, 1.8);
      ctx.strokeStyle = "#1e2a1a"; ctx.lineWidth = 2;
      for (var gg = 0; gg < 4; gg++) {
        ctx.beginPath(); ctx.moveTo(70 + r * 8, -140 - r * 8);
        ctx.quadraticCurveTo(80 + r * 8, -148 + gg * 5 - r * 8, 86 + r * 8, -146 + gg * 6 - r * 8); ctx.stroke();
      }
      ctx.restore();
    }
  };

  // =================================================================
  //  LA HARPIE : moitié femme, moitié oiseau, elle fond sur sa proie
  // =================================================================
  // Une aile de plumes, déployée vers l'arrière (vers les x négatifs) depuis l'épaule (x, y).
  // angle > 0 : l'aile se lève. couleurs : [sombre, moyen, clair].
  function aile(ctx, x, y, angle, s, couleurs) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(s, s);
    // le bord de l'aile : épaule (0, 0), poignet (-46, -26), pointe (-104, -14)
    function bord(u) {
      if (u < 0.45) { var v = u / 0.45; return { x: -46 * v, y: -26 * v }; }
      var w = (u - 0.45) / 0.55;
      return { x: -46 - 58 * w, y: -26 + 12 * w };
    }
    // les grandes plumes, qui pendent du bord
    for (var k = 11; k >= 0; k--) {
      var u = k / 11, q = bord(u);
      var l = 34 + 46 * u, an = PI * 0.55 + 0.42 * u;
      ctx.save();
      ctx.translate(q.x, q.y);
      ctx.rotate(an);
      ctx.beginPath();
      ctx.moveTo(0, -5); ctx.quadraticCurveTo(l * 0.55, -8, l, 0); ctx.quadraticCurveTo(l * 0.55, 7, 0, 5); ctx.closePath();
      peindre(ctx, degrade(ctx, 0, 0, l, 0, [[0, couleurs[1]], [0.75, couleurs[1]], [1, couleurs[2]]]), 1.3);
      ctx.restore();
    }
    // les petites plumes qui couvrent le bord
    ctx.beginPath();
    ctx.moveTo(4, 6); ctx.lineTo(0, -6); ctx.lineTo(-46, -32); ctx.lineTo(-106, -18);
    ctx.quadraticCurveTo(-80, 4, -50, 6); ctx.quadraticCurveTo(-20, 22, 4, 6); ctx.closePath();
    peindre(ctx, degrade(ctx, 0, -30, 0, 20, [[0, couleurs[2]], [0.3, couleurs[1]], [1, couleurs[0]]]), 1.6);
    ctx.strokeStyle = "rgba(0,0,0,0.25)"; ctx.lineWidth = 1;
    for (var r = 0; r < 5; r++) {
      ctx.beginPath(); ctx.moveTo(-10 - r * 18, -2 - r * 2); ctx.quadraticCurveTo(-18 - r * 18, 6, -26 - r * 18, -2 - r * 2); ctx.stroke();
    }
    ctx.restore();
  }

  function hauteurHarpie(a) { return -150 + Math.sin(a.t * 3) * 8; }

  var harpie = {
    nom: "La Harpie", titre: "la voleuse aux serres de bronze",
    attaque: "Serres de la Harpie", genre: "pique", hauteur: 230, vole: true, rgb: "255,90,120",
    points: function (a) {
      var hy = hauteurHarpie(a);
      return { serres: { x: 26, y: hy + 64 }, tete: { x: 22, y: hy - 50 }, centre: { x: 0, y: hy } };
    },
    dessiner: function (ctx, a) {
      var t = a.t, hy = hauteurHarpie(a);
      var att = a.action === "attaque" ? cloche(a.k, 0.15, 0.9) : 0;
      var touche = a.action === "touche" ? cloche(a.k, 0, 1) : 0;
      var cri = att > 0.3 || a.action === "rire";
      var bat = Math.sin(t * 7) * 0.75 * (1 - att * 0.7);
      var plumes = ["#2a1c30", "#5a4060", "#b49ab8"];
      ctx.save();
      ctx.translate(0, hy);
      ctx.rotate(att * 0.5 - touche * 0.3);
      // L'aile arrière
      aile(ctx, -8, -26, 0.2 + bat - att * 0.6, 1.25, ["#140c18", "#352640", "#6e5476"]);
      // Les pattes d'oiseau et leurs serres
      for (var p = 0; p < 2; p++) {
        var hx = -6 + p * 14, ax = hx + 4 + att * 26, ay = 62 - att * 8;
        ctx.strokeStyle = TRAIT; ctx.lineWidth = 7; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(hx, 26); ctx.lineTo(hx + 2 + att * 14, 46); ctx.lineTo(ax, ay); ctx.stroke();
        ctx.strokeStyle = "#c2a45e"; ctx.lineWidth = 4.5; ctx.stroke();
        ctx.strokeStyle = "#140c08"; ctx.lineWidth = 2.6;
        for (var g = -1; g <= 1; g++) {
          ctx.beginPath(); ctx.moveTo(ax, ay);
          ctx.quadraticCurveTo(ax + 6 + g * 2, ay + 4 + g * 5, ax + 9 + att * 4, ay + 10 + g * 6);
          ctx.stroke();
        }
        ctx.lineCap = "butt";
      }
      // Le corps couvert de plumes
      remplirOvale(ctx, 0, 0, 24, 36, 0.15 + att * 0.3, degrade(ctx, -24, -36, 24, 36, [[0, plumes[0]], [0.55, plumes[1]], [1, "#7a5a80"]]), 2);
      ctx.strokeStyle = "rgba(200,170,210,0.35)"; ctx.lineWidth = 1.4;
      for (var v = 0; v < 6; v++) {
        ctx.beginPath(); ctx.moveTo(-10 + (v % 2) * 8, -16 + v * 7); ctx.lineTo(-4 + (v % 2) * 8, -10 + v * 7); ctx.lineTo(2 + (v % 2) * 8, -16 + v * 7); ctx.stroke();
      }
      // La tête : un visage de femme, des cheveux fous
      ctx.save();
      ctx.translate(16, -46);
      ctx.rotate(att * 0.25 - touche * 0.4);
      ctx.scale(1.35, 1.35);
      ctx.fillStyle = "#1e1220";
      for (var c = 0; c < 7; c++) {
        var cv = Math.sin(t * 6 + c) * 6;
        ctx.beginPath();
        ctx.moveTo(-4, -12 + c * 2.5);
        ctx.quadraticCurveTo(-26, -16 + c * 4 + cv, -46 - c * 3, -6 + c * 5 + cv * 1.5);
        ctx.quadraticCurveTo(-24, -4 + c * 4, -2, -4 + c * 2.5);
        ctx.closePath(); ctx.fill();
      }
      ctx.beginPath();
      ctx.moveTo(-10, -8); ctx.quadraticCurveTo(-2, -18, 8, -14); ctx.quadraticCurveTo(14, -8, 13, -2);
      ctx.lineTo(17, 3); ctx.lineTo(13, 5); ctx.quadraticCurveTo(13, 8, 10, 10); ctx.quadraticCurveTo(10, 14, 6, 16);
      ctx.quadraticCurveTo(-4, 18, -9, 10); ctx.closePath();
      peindre(ctx, degrade(ctx, -10, -14, 14, 16, [[0, "#8a7468"], [0.5, "#c4ae9e"], [1, "#e2d0c0"]]), 1.6);
      if (cri) { remplirOvale(ctx, 10, 10, 3, 4, 0, "#2a0c0c", 1); }
      else { ctx.strokeStyle = "#3a1a1a"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(7, 10); ctx.lineTo(12, 10); ctx.stroke(); }
      oeil(ctx, 7, -5, 2.4, "255,70,90", 0.7 + 0.3 * att);
      ctx.strokeStyle = "rgba(20,8,10,0.9)"; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(1, -11); ctx.lineTo(12, -7); ctx.stroke();
      ctx.restore();
      // L'aile avant
      aile(ctx, 2, -22, 0.05 + bat * 1.05 - att * 0.6, 1.3, ["#2a1c30", "#5a4060", "#b49ab8"]);
      ctx.restore();
    }
  };

  // =================================================================
  //  Le corps de lion (pour le Sphinx et la Chimère)
  // =================================================================
  function corpsDeLion(ctx, t, c, course, touche) {
    var souffle = Math.sin(t * 1.9);
    // La queue
    ctx.lineCap = "round";
    var qx = -128 + Math.sin(t * 1.6) * 10, qy = -150 + Math.cos(t * 1.4) * 8;
    ctx.strokeStyle = TRAIT; ctx.lineWidth = 11;
    ctx.beginPath(); ctx.moveTo(-74, -104); ctx.quadraticCurveTo(-122, -100, qx, qy); ctx.stroke();
    ctx.strokeStyle = c[1]; ctx.lineWidth = 7.5; ctx.stroke();
    ctx.lineCap = "butt";
    remplirOvale(ctx, qx, qy - 6, 9, 13, 0.4, c[2], 1.6);
    // Les pattes de derrière (la plus lointaine d'abord)
    membre(ctx, { x: -50, y: -96 }, { x: -66 - course * 8, y: -52 }, 38, 22, [c[2], c[2], "#2a1a0a"], 2);
    membre(ctx, { x: -66 - course * 8, y: -52 }, { x: -54 - course * 14, y: -8 }, 20, 16, [c[2], c[2], "#2a1a0a"], 2);
    remplirOvale(ctx, -48 - course * 14, -6, 13, 7, 0, c[2], 1.8);
    membre(ctx, { x: 40, y: -98 }, { x: 46 + course * 8, y: -52 }, 30, 20, [c[2], c[2], "#2a1a0a"], 2);
    membre(ctx, { x: 46 + course * 8, y: -52 }, { x: 52 + course * 14, y: -8 }, 18, 15, [c[2], c[2], "#2a1a0a"], 2);
    remplirOvale(ctx, 58 + course * 14, -6, 13, 7, 0, c[2], 1.8);
    // Le corps
    ctx.save();
    ctx.translate(-4, -98);
    ctx.scale(1, 1 + souffle * 0.025);
    remplirOvale(ctx, 0, 0, 80, 36, 0.02, degrade(ctx, 0, -36, 0, 36, [[0, c[0]], [0.55, c[1]], [1, c[2]]]), 2.2);
    ctx.strokeStyle = "rgba(60,30,10,0.35)"; ctx.lineWidth = 2;
    for (var r = 0; r < 4; r++) { ctx.beginPath(); ctx.arc(-30 + r * 14, -2, 22, 1.2, 1.9); ctx.stroke(); }
    ctx.restore();
    // Les pattes de devant
    membre(ctx, { x: -36, y: -92 }, { x: -46 + course * 8, y: -50 }, 34, 22, [c[0], c[1], c[2]], 2);
    membre(ctx, { x: -46 + course * 8, y: -50 }, { x: -36 + course * 14, y: -8 }, 20, 16, [c[0], c[1], c[2]], 2);
    remplirOvale(ctx, -30 + course * 14, -6, 14, 7.5, 0, c[1], 1.8);
    membre(ctx, { x: 58, y: -100 }, { x: 64 - course * 8, y: -54 }, 30, 21, [c[0], c[1], c[2]], 2);
    membre(ctx, { x: 64 - course * 8, y: -54 }, { x: 70 - course * 14, y: -8 }, 20, 16, [c[0], c[1], c[2]], 2);
    remplirOvale(ctx, 77 - course * 14, -6, 15, 8, 0, c[1], 1.8);
    ctx.strokeStyle = "#1a0e06"; ctx.lineWidth = 1.6;
    for (var g = 0; g < 3; g++) { ctx.beginPath(); ctx.moveTo(84 - course * 14, -9 + g * 3); ctx.lineTo(91 - course * 14, -7 + g * 3); ctx.stroke(); }
  }

  // =================================================================
  //  LE SPHINX : corps de lion, ailes d'aigle, visage humain
  // =================================================================
  function rugit(a) { return a.action === "attaque" ? douce(entre(a.k, 0.1, 0.35)) * (1 - douce(entre(a.k, 0.75, 1))) : 0; }

  var sphinx = {
    nom: "Le Sphinx", titre: "le gardien des énigmes de Thèbes",
    attaque: "Rugissement du Sphinx", genre: "rugissement", hauteur: 260, rgb: "140,190,255",
    points: function (a) {
      var r = rugit(a);
      return { bouche: { x: 102 + 10 * r, y: -150 + 4 * r }, tete: { x: 90 + 10 * r, y: -164 }, centre: { x: 0, y: -120 } };
    },
    dessiner: function (ctx, a) {
      var t = a.t, r = rugit(a);
      var touche = a.action === "touche" ? cloche(a.k, 0, 1) : 0;
      var c = ["#e8c57e", "#bf9450", "#6e5028"];
      ctx.save();
      ctx.rotate(-touche * 0.1);
      // L'aile lointaine
      aile(ctx, 10, -128, 1.05 + Math.sin(t * 1.5) * 0.06 + r * 0.25, 1.35, ["#7a5420", "#a8782e", "#e8c070"]);
      corpsDeLion(ctx, t, c, 0, touche);
      // Le poitrail et la tête coiffée du némès
      remplirOvale(ctx, 66, -128, 28, 36, -0.2, degrade(ctx, 40, -160, 90, -100, [[0, c[0]], [1, c[1]]]), 2);
      ctx.save();
      ctx.translate(82 + 8 * r, -164);
      ctx.rotate(-r * 0.15 - touche * 0.3 + Math.sin(t * 1.2) * 0.025);
      ctx.scale(1.5, 1.5);
      // le némès rayé, qui retombe derrière la tête
      ctx.beginPath();
      ctx.moveTo(-6, -16); ctx.quadraticCurveTo(10, -22, 14, -8); ctx.lineTo(8, 4);
      ctx.lineTo(-4, 26); ctx.lineTo(-22, 22); ctx.quadraticCurveTo(-20, -6, -6, -16); ctx.closePath();
      ctx.save(); ctx.clip();
      ctx.fillStyle = "#1f3f8a"; ctx.fillRect(-30, -30, 60, 60);
      ctx.fillStyle = "#e2b24c";
      for (var b = 0; b < 8; b++) ctx.fillRect(-30, -24 + b * 7, 60, 3.2);
      ctx.restore();
      ctx.strokeStyle = TRAIT; ctx.lineWidth = 1.5; ctx.stroke();
      // le visage
      ctx.beginPath();
      ctx.moveTo(2, -10); ctx.quadraticCurveTo(10, -12, 13, -5); ctx.lineTo(17, 1); ctx.lineTo(13, 3);
      ctx.quadraticCurveTo(14 + r * 2, 7, 11, 9 + r * 4); ctx.quadraticCurveTo(10, 14, 4, 15); ctx.quadraticCurveTo(-2, 12, 0, 2);
      ctx.closePath();
      peindre(ctx, degrade(ctx, 0, -10, 16, 14, [[0, "#9a6a3a"], [1, "#d8a46a"]]), 1.6);
      if (r > 0.1) remplirOvale(ctx, 11, 9 + r * 2, 2.5, 1.5 + r * 3, 0, "#2a0e06", 1);
      ctx.fillStyle = "#e2b24c"; ctx.fillRect(-2, -14, 15, 3);
      oeil(ctx, 9, -4, 2.2, "140,190,255", 0.6 + 0.4 * r + 0.2 * Math.sin(t * 2.4));
      ctx.strokeStyle = "#1a0e06"; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(4, -7); ctx.lineTo(14, -6); ctx.moveTo(12, -3); ctx.lineTo(16, -4); ctx.stroke();
      ctx.restore();
      // L'aile proche
      aile(ctx, 0, -124, 0.85 + Math.sin(t * 1.5 + 0.4) * 0.07 + r * 0.3, 1.45, ["#8a6024", "#c8913a", "#fff0c0"]);
      ctx.restore();
    }
  };

  // =================================================================
  //  LA CHIMÈRE : un lion qui crache le feu, une chèvre sur le dos,
  //  un serpent pour queue
  // =================================================================
  function crache(a) { return a.action === "attaque" ? douce(entre(a.k, 0.05, 0.3)) * (1 - douce(entre(a.k, 0.85, 1))) : 0; }

  var chimere = {
    nom: "La Chimère", titre: "la bête de feu de Lycie",
    attaque: "Souffle de feu", genre: "souffle", hauteur: 250, rgb: "255,140,40",
    points: function (a) {
      var f = crache(a);
      return { bouche: { x: 122 + 6 * f, y: -124 + 6 * f }, tete: { x: 98, y: -136 }, centre: { x: 0, y: -110 } };
    },
    dessiner: function (ctx, a) {
      var t = a.t, f = crache(a);
      var touche = a.action === "touche" ? cloche(a.k, 0, 1) : 0;
      var rire = a.action === "rire" ? Math.abs(Math.sin(a.k * PI * 5)) * (1 - a.k) : 0;
      var c = ["#d98a46", "#a85a26", "#55290e"];
      ctx.save();
      ctx.rotate(-touche * 0.1 + f * 0.04);
      // La queue de serpent (qui remplace la queue du lion)
      ctx.lineCap = "round";
      var sx = -120 + Math.sin(t * 1.7) * 8, sy = -178 + Math.cos(t * 1.4) * 8;
      ctx.strokeStyle = TRAIT; ctx.lineWidth = 15;
      ctx.beginPath(); ctx.moveTo(-74, -104); ctx.bezierCurveTo(-130, -110, -150, -150, sx, sy); ctx.stroke();
      ctx.strokeStyle = "#3f7a3a"; ctx.lineWidth = 11; ctx.stroke();
      ctx.lineCap = "butt";
      dessinerTeteSerpent(ctx, sx, sy, 0.85, 0.3 + 0.4 * f, t, 2, 0.8);
      // Le corps de lion (sans sa queue : on la cache sous le serpent)
      ctx.save();
      corpsDeLion(ctx, t, c, 0, touche);
      ctx.restore();
      // La chèvre, sur le dos
      ctx.save();
      ctx.translate(-14, -128);
      ctx.rotate(-0.2 + Math.sin(t * 1.3) * 0.05 - touche * 0.2);
      membre(ctx, { x: 0, y: 4 }, { x: -2, y: -24 }, 30, 22, ["#e0d8c8", "#b8b098", "#6a6250"], 2);
      ctx.translate(-1, -32);
      ctx.scale(1.45, 1.45);
      corne(ctx, -6, -6, -30, -20, -38, 6, 8, ["#3a3028", "#5a4c40", "#8a7a6a"]);
      ctx.beginPath();
      ctx.moveTo(-12, -2); ctx.quadraticCurveTo(-4, -14, 10, -8); ctx.lineTo(24, 2); ctx.quadraticCurveTo(22, 8, 12, 8);
      ctx.lineTo(2, 10); ctx.quadraticCurveTo(-10, 8, -12, -2); ctx.closePath();
      peindre(ctx, degrade(ctx, -12, -10, 24, 10, [[0, "#9a9282"], [1, "#e8e0d0"]]), 1.8);
      ctx.fillStyle = "#e8e0d0";
      ctx.beginPath(); ctx.moveTo(10, 8); ctx.lineTo(14, 22); ctx.lineTo(4, 9); ctx.closePath(); ctx.fill();
      oeil(ctx, 4, -4, 2, "255,200,60", 0.6);
      corne(ctx, -2, -8, -20, -26, -30, -2, 8, ["#4a3e34", "#6a5a4c", "#a08e7a"]);
      ctx.restore();
      // La crinière du lion
      ctx.save();
      ctx.translate(84, -132);
      ctx.rotate(-f * 0.1 - touche * 0.3 + rire * 0.1);
      ctx.scale(1.2, 1.2);
      ctx.beginPath();
      for (var k = 0; k < 26; k++) {
        var an = k / 26 * PI2, rr = (k % 2 ? 31 : 41) + Math.sin(t * 3 + k) * 2;
        var px = Math.cos(an) * rr - 6, py = Math.sin(an) * rr * 1.1;
        if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      peindre(ctx, degrade(ctx, -40, -40, 40, 40, [[0, "#5a2408"], [0.5, "#8a3a10"], [1, "#c25a1c"]]), 2);
      // la gueule
      var ouvre = 0.15 + 0.85 * f + 0.4 * rire;
      ctx.save();
      ctx.translate(16, 10);
      ctx.rotate(ouvre * 0.5);
      ctx.beginPath(); ctx.moveTo(-14, 0); ctx.quadraticCurveTo(8, 12, 24, 4); ctx.lineTo(22, -2); ctx.quadraticCurveTo(4, 2, -12, -4); ctx.closePath();
      peindre(ctx, "#b8743e", 1.8);
      ctx.fillStyle = "#f3ecd0";
      ctx.beginPath(); ctx.moveTo(16, 0); ctx.lineTo(18, -7); ctx.lineTo(20, 0); ctx.closePath(); ctx.fill();
      ctx.restore();
      if (ouvre > 0.3) {
        lueur(ctx, 30, 6, 20 + 20 * f, "255,150,40", 0.4 + 0.5 * f);
        remplirOvale(ctx, 26, 8, 8 * ouvre, 5 * ouvre, 0.3, "#3a0c04");
      }
      ctx.beginPath();
      ctx.moveTo(-18, -8); ctx.quadraticCurveTo(-12, -24, 6, -22); ctx.quadraticCurveTo(26, -18, 36, -2);
      ctx.quadraticCurveTo(38, 6, 30, 8); ctx.lineTo(6, 10); ctx.quadraticCurveTo(-14, 10, -18, -8); ctx.closePath();
      peindre(ctx, degrade(ctx, -18, -22, 36, 10, [[0, "#a85a26"], [0.6, "#d98a46"], [1, "#e8a868"]]), 1.8);
      ctx.fillStyle = "#2a1006"; ovale(ctx, 34, -2, 3, 2.4, 0); ctx.fill();
      ctx.fillStyle = "#f3ecd0";
      ctx.beginPath(); ctx.moveTo(22, 8); ctx.lineTo(24, 16); ctx.lineTo(27, 8); ctx.closePath(); ctx.fill();
      oeil(ctx, 14, -12, 3, "255,150,40", 0.7 + 0.3 * f);
      ctx.strokeStyle = "#1a0a04"; ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.moveTo(6, -18); ctx.lineTo(22, -13); ctx.stroke();
      ctx.restore();
      ctx.restore();
    }
  };

  // =================================================================
  //  LES OISEAUX DU LAC STYMPHALE : des oiseaux aux plumes de bronze
  //  (ils gardent les stèles d'or)
  // =================================================================
  var VOLEE = [
    { x: 0, y: -168, s: 1.15, ph: 0 },
    { x: -86, y: -232, s: 0.82, ph: 1.4 },
    { x: 64, y: -252, s: 0.76, ph: 2.7 }
  ];
  function oiseauEn(a, i) {
    var o = VOLEE[i], t = a.t;
    var x = o.x + Math.sin(t * 1.3 + o.ph) * 10, y = o.y + Math.sin(t * 2.6 + o.ph) * 9;
    if (a.action === "attaque") y -= 18 * cloche(a.k, 0, 0.5);
    if (a.action === "touche") { x -= 20 * cloche(a.k, 0, 1); }
    return { x: x, y: y, s: o.s };
  }
  function dessinerOiseau(ctx, x, y, s, t, ph, vite) {
    var bat = Math.sin(t * (9 + 6 * vite) + ph) * 0.8;
    var metal = ["#5a3410", "#c47b36", "#ffd9a0"];
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(s, s);
    aile(ctx, -4, -6, 0.3 + bat, 0.75, ["#3a2008", "#8a5020", "#e2a65a"]);
    // la queue
    for (var q = 0; q < 3; q++) {
      ctx.beginPath(); ctx.moveTo(-22, 0); ctx.lineTo(-58 - q * 4, -6 + q * 8); ctx.lineTo(-24, 6); ctx.closePath();
      peindre(ctx, degrade(ctx, -22, 0, -60, 0, [[0, metal[1]], [1, metal[2]]]), 1.3);
    }
    remplirOvale(ctx, 0, 0, 28, 14, -0.12, degrade(ctx, 0, -14, 0, 14, [[0, metal[2]], [0.45, metal[1]], [1, metal[0]]]), 1.8);
    // la tête et le bec, long et pointu
    remplirOvale(ctx, 26, -10, 11, 9, 0, degrade(ctx, 20, -20, 30, 0, [[0, metal[2]], [1, metal[1]]]), 1.6);
    ctx.beginPath(); ctx.moveTo(34, -13); ctx.lineTo(62, -6); ctx.lineTo(34, -5); ctx.closePath();
    peindre(ctx, degrade(ctx, 34, -13, 62, -6, [[0, "#e2b24c"], [1, "#fff0c0"]]), 1.3);
    ctx.fillStyle = "#7a471c";
    for (var c = 0; c < 3; c++) { ctx.beginPath(); ctx.moveTo(20 + c * 3, -17); ctx.lineTo(12 + c * 3, -30 + c * 2); ctx.lineTo(25 + c * 3, -18); ctx.closePath(); ctx.fill(); }
    oeil(ctx, 29, -12, 2.2, "255,60,40", 0.8);
    aile(ctx, 2, -4, 0.1 + bat * 1.1, 0.8, metal);
    ctx.restore();
  }

  var stymphale = {
    nom: "Les oiseaux du lac Stymphale", titre: "les oiseaux aux plumes de bronze",
    attaque: "Plumes de bronze", genre: "plumes", hauteur: 280, vole: true, rgb: "255,200,90",
    points: function (a) {
      var l = [];
      for (var i = 0; i < VOLEE.length; i++) { var o = oiseauEn(a, i); l.push({ x: o.x + 20 * o.s, y: o.y - 6 * o.s }); }
      return { oiseaux: l, centre: l[0], tete: l[0] };
    },
    dessiner: function (ctx, a) {
      var vite = a.action === "attaque" ? 1 : 0;
      for (var i = VOLEE.length - 1; i >= 0; i--) {
        var o = oiseauEn(a, i);
        dessinerOiseau(ctx, o.x, o.y, o.s, a.t, VOLEE[i].ph, vite);
      }
    }
  };

  var LISTE = {
    minotaure: minotaure, cyclope: cyclope, hydre: hydre, meduse: meduse,
    harpie: harpie, sphinx: sphinx, chimere: chimere, stymphale: stymphale
  };

  return {
    liste: LISTE,
    existe: function (id) { return !!LISTE[id]; },
    dessinerRocher: dessinerRocher
  };
})();
