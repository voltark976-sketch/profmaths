// =====================================================================
//  HÉROS : Talos en grand, pour les combats
// =====================================================================
//  Dans l'arène, Talos est dessiné bien plus grand que dans les salles,
//  avec un « squelette » : un bassin, un buste, une tête, deux bras et
//  deux jambes qui se plient aux coudes et aux genoux.
//
//  Une « pose » donne l'angle de chaque articulation. Pour animer, on
//  passe en douceur d'une pose à l'autre (fonction melanger).
//  Les angles sont en radians :
//   - pour un bras ou une jambe, 0 veut dire « tout droit vers le bas »,
//     et un angle positif l'envoie vers l'avant (vers le monstre) ;
//   - un genou plié (g) ramène le tibia vers l'arrière, un coude plié (c)
//     ramène l'avant-bras vers l'avant ;
//   - la lance : 0 = pointée vers l'avant, -1,57 (−π/2) = vers le ciel.
//  Talos regarde toujours vers la droite.
// =====================================================================

var Heros = (function () {

  var PI = Math.PI, PI2 = PI * 2;
  var POLICE = "'Cinzel', 'Trajan Pro', Georgia, serif";

  // Les longueurs des os, en pixels, pour Talos à l'échelle 1 (environ 150 px de haut).
  var L = { cuisse: 33, tibia: 33, buste: 46, cou: 15, bras: 25, avantBras: 24, pied: 4 };
  var HANCHE = 66;   // hauteur du bassin quand Talos est en l'air

  // La pose de base (en garde). Les autres poses ne disent que ce qui change.
  var BASE = {
    x: 0, y: 0,        // décalage du bassin
    sol: 1,            // 1 : les pieds touchent le sol ; 0 : en l'air
    rot: 0,            // rotation de tout le corps (pirouette, chute)
    torse: 0.06, tete: 0,
    hAv: 0.28, gAv: 0.35, hAr: -0.22, gAr: 0.3,    // hanches et genoux (avant / arrière)
    eAv: 0.5, cAv: 0.9, eAr: -0.55, cAr: 1.0,      // épaules et coudes
    lance: -0.55,      // angle de la lance
    arc: 0,            // 1 : Talos tient l'arc au lieu de la lance
    tension: 0,        // la corde de l'arc tirée (0 à 1)
    bouclier: 1,       // 1 : le bouclier rond est au bras arrière
    eclat: 0           // l'œil et le cœur d'ichor brillent plus fort (0 à 1)
  };

  function pose(changements) {
    var p = {};
    for (var k in BASE) p[k] = BASE[k];
    for (var c in changements) p[c] = changements[c];
    return p;
  }

  var POSES = {
    garde: pose({}),
    // Respire : la même garde, un peu plus basse
    souffle: pose({ hAv: 0.34, gAv: 0.5, hAr: -0.18, gAr: 0.42, eAv: 0.46, cAv: 0.95 }),
    // Accroupi : pour prendre son élan, ou en retombant d'un saut
    accroupi: pose({ torse: 0.38, hAv: 1.05, gAv: 1.75, hAr: 0.3, gAr: 1.6, eAv: 0.25, cAv: 1.2, eAr: -0.5, cAr: 1.0, lance: -0.25 }),
    // L'arc bandé, puis la flèche lâchée
    bandeArc: pose({ arc: 1, bouclier: 0, tension: 1, torse: -0.04, tete: 0.02,
      hAv: 0.5, gAv: 0.25, hAr: -0.5, gAr: 0.12, eAv: 1.5, cAv: 0.05, eAr: 1.42, cAr: 2.65, eclat: 0.7 }),
    lacher: pose({ arc: 1, bouclier: 0, tension: 0, torse: -0.1, tete: -0.04,
      hAv: 0.52, gAv: 0.2, hAr: -0.52, gAr: 0.1, eAv: 1.55, cAv: 0.0, eAr: 0.6, cAr: 2.9, eclat: 1 }),
    garderArc: pose({ arc: 1, bouclier: 0, eAv: 0.9, cAv: 0.5, eAr: -0.25, cAr: 1.1 }),
    // L'élan avant le coup de lance, puis la fente
    elan: pose({ torse: -0.22, tete: 0.1, hAv: 0.55, gAv: 0.7, hAr: -0.5, gAr: 0.45, eAv: -0.55, cAv: 1.7, eAr: 0.4, cAr: 1.3, lance: -0.08 }),
    fente: pose({ torse: 0.5, tete: -0.2, hAv: 1.1, gAv: 1.15, hAr: -0.95, gAr: 0.1, eAv: 1.5, cAv: 0.05, eAr: -0.6, cAr: 0.9, lance: 0.04, eclat: 1 }),
    // En boule pour la pirouette, puis la frappe qui descend
    vrille: pose({ sol: 0, torse: 0.55, tete: 0.3, hAv: 1.9, gAv: 2.5, hAr: 1.6, gAr: 2.4, eAv: 1.1, cAv: 1.6, eAr: 0.9, cAr: 1.9, lance: -1.0, eclat: 0.8 }),
    frappe: pose({ sol: 0, torse: 0.55, tete: 0.2, hAv: 0.95, gAv: 1.3, hAr: -0.35, gAr: 0.9, eAv: 1.95, cAv: 0.2, eAr: -0.7, cAr: 1.0, lance: 1.05, eclat: 1 }),
    // Touché par le monstre
    touche: pose({ torse: -0.38, tete: -0.35, hAv: 0.15, gAv: 0.45, hAr: -0.45, gAr: 0.5, eAv: -0.35, cAv: 0.6, eAr: -0.8, cAr: 0.5, lance: -1.05 }),
    // À genoux, puis à terre
    genou: pose({ torse: 0.45, tete: 0.55, hAv: 1.45, gAv: 1.55, hAr: 0.05, gAr: 2.35, eAv: 0.35, cAv: 0.3, eAr: 0.15, cAr: 0.2, lance: 0.75 }),
    aTerre: pose({ sol: 0, y: 50, rot: -1.5, torse: 0.0, tete: 0.25, hAv: 0.35, gAv: 0.7, hAr: 0.1, gAr: 0.3, eAv: 0.9, cAv: 0.4, eAr: 1.2, cAr: 0.3, lance: 0.15 }),
    // La victoire : la lance (ou l'arc) levée vers le ciel
    victoire: pose({ torse: -0.06, tete: -0.18, hAv: 0.3, gAv: 0.12, hAr: -0.3, gAr: 0.08, eAv: 2.95, cAv: 0.15, eAr: -0.35, cAr: 1.0, lance: -1.5, eclat: 1 }),
    victoireArc: pose({ arc: 1, bouclier: 0, torse: -0.06, tete: -0.18, hAv: 0.3, gAv: 0.12, hAr: -0.3, gAr: 0.08, eAv: 2.75, cAv: 0.25, eAr: -0.4, cAr: 1.2, eclat: 1 }),
    // Il appelle la foudre d'Athéna
    appel: pose({ torse: -0.12, tete: -0.45, hAv: 0.4, gAv: 0.2, hAr: -0.4, gAr: 0.15, eAv: 3.05, cAv: 0.0, eAr: 1.0, cAr: 1.4, lance: -1.57, eclat: 1 })
  };

  // Passe de la pose a à la pose b (k = 0 : a ; k = 1 : b).
  function melanger(a, b, k) {
    var p = {};
    for (var c in BASE) {
      var va = a[c], vb = b[c];
      p[c] = va + (vb - va) * k;
    }
    return p;
  }

  // Des courbes pour animer en douceur (k entre 0 et 1).
  var Courbe = {
    douce: function (k) { k = Math.max(0, Math.min(1, k)); return k * k * (3 - 2 * k); },
    sortie: function (k) { k = Math.max(0, Math.min(1, k)); return 1 - (1 - k) * (1 - k) * (1 - k); },
    entree: function (k) { k = Math.max(0, Math.min(1, k)); return k * k * k; },
    // dépasse un peu le but, puis y revient (un ressort)
    ressort: function (k) {
      k = Math.max(0, Math.min(1, k));
      var c = 1.70158 * 1.4;
      return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2);
    }
  };

  // ---------------------------------------------------------------
  //  Le squelette : où se trouvent les articulations pour une pose
  // ---------------------------------------------------------------
  function dir(a) { return { x: Math.sin(a), y: Math.cos(a) }; }

  // Hauteur d'une jambe (du bassin à la plante du pied), selon ses angles.
  function hauteurJambe(h, g) { return L.cuisse * Math.cos(h) + L.tibia * Math.cos(h - g) + L.pied; }

  // Position des articulations, dans le repère du bassin (avant la rotation « rot »).
  function squelette(p) {
    var s = {};
    s.bassin = { x: 0, y: 0 };
    var t = p.torse;
    s.cou = { x: Math.sin(t) * L.buste, y: -Math.cos(t) * L.buste };
    s.tete = { x: s.cou.x + Math.sin(t + p.tete) * L.cou, y: s.cou.y - Math.cos(t + p.tete) * L.cou };
    // Les épaules, un peu sous le cou ; l'épaule arrière est un peu en retrait
    var bas = { x: -Math.sin(t) * 6, y: Math.cos(t) * 6 };
    s.epauleAv = { x: s.cou.x + bas.x + Math.cos(t) * 3, y: s.cou.y + bas.y + Math.sin(t) * 3 };
    s.epauleAr = { x: s.cou.x + bas.x - Math.cos(t) * 4, y: s.cou.y + bas.y - Math.sin(t) * 4 };
    function bras(e, c, ep) {
      var d1 = dir(e), d2 = dir(e + c);
      var coude = { x: ep.x + d1.x * L.bras, y: ep.y + d1.y * L.bras };
      var main = { x: coude.x + d2.x * L.avantBras, y: coude.y + d2.y * L.avantBras };
      return { epaule: ep, coude: coude, main: main, a1: e, a2: e + c };
    }
    s.brasAv = bras(p.eAv, p.cAv, s.epauleAv);
    s.brasAr = bras(p.eAr, p.cAr, s.epauleAr);
    function jambe(h, g, decal) {
      var hanche = { x: decal, y: 0 };
      var d1 = dir(h), d2 = dir(h - g);
      var genou = { x: hanche.x + d1.x * L.cuisse, y: hanche.y + d1.y * L.cuisse };
      var cheville = { x: genou.x + d2.x * L.tibia, y: genou.y + d2.y * L.tibia };
      return { hanche: hanche, genou: genou, cheville: cheville, a1: h, a2: h - g };
    }
    s.jambeAv = jambe(p.hAv, p.gAv, 3);
    s.jambeAr = jambe(p.hAr, p.gAr, -3);
    return s;
  }

  // Hauteur du bassin au-dessus du sol pour cette pose.
  function hauteurBassin(p) {
    var auSol = Math.max(hauteurJambe(p.hAv, p.gAv), hauteurJambe(p.hAr, p.gAr));
    return auSol * p.sol + HANCHE * (1 - p.sol) - p.y;
  }

  // Les points utiles au combat (en coordonnées de l'arène) : la pointe de la
  // lance, la main, la tête, le centre du corps.
  function points(p, o) {
    var e = o.echelle || 1;
    var s = squelette(p);
    var bx = o.x + p.x * e, by = o.y - hauteurBassin(p) * e;
    var cr = Math.cos(p.rot), sr = Math.sin(p.rot);
    function monde(q) { return { x: bx + (q.x * cr - q.y * sr) * e, y: by + (q.x * sr + q.y * cr) * e }; }
    var main = s.brasAv.main;
    var pointe = { x: main.x + Math.cos(p.lance) * 86, y: main.y + Math.sin(p.lance) * 86 };
    return {
      bassin: monde(s.bassin), tete: monde(s.tete), main: monde(main), pointe: monde(pointe),
      mainArr: monde(s.brasAr.main), coeur: monde({ x: s.cou.x * 0.6 + 5, y: s.cou.y * 0.62 }),
      centre: monde({ x: s.cou.x * 0.5, y: s.cou.y * 0.45 })
    };
  }

  // ---------------------------------------------------------------
  //  Le dessin
  // ---------------------------------------------------------------
  var BRONZE = { clair: "#f6bb72", base: "#c47b36", sombre: "#7a471c", trait: "#3f230c", reflet: "#ffe2b0" };
  var OR = { clair: "#ffe48e", base: "#dcae3e", sombre: "#8a6418", trait: "#4e380a", reflet: "#fff6cf" };

  function capsule(ctx, x, y, l, h, r) {
    r = Math.min(r, h / 2, l / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + l - r, y);
    ctx.arc(x + l - r, y + r, r, -PI / 2, PI / 2);
    ctx.lineTo(x + r, y + h);
    ctx.arc(x + r, y + r, r, PI / 2, PI * 1.5);
    ctx.closePath();
  }
  function disque(ctx, x, y, r) { ctx.beginPath(); ctx.arc(x, y, Math.max(0.1, r), 0, PI2); ctx.fill(); }
  function ovale(ctx, x, y, rx, ry, rot) { ctx.beginPath(); ctx.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot || 0, 0, PI2); ctx.fill(); }
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

  // Un os (bras, cuisse...) : une gélule métallique de a à b, de largeur w.
  function segment(ctx, a, b, w, P, arriere) {
    var dx = b.x - a.x, dy = b.y - a.y, l = Math.sqrt(dx * dx + dy * dy) || 0.01;
    ctx.save();
    ctx.translate(a.x, a.y);
    ctx.rotate(Math.atan2(dy, dx));
    var g = ctx.createLinearGradient(0, -w / 2, 0, w / 2);
    g.addColorStop(0, arriere ? P.base : P.clair);
    g.addColorStop(0.42, arriere ? P.sombre : P.base);
    g.addColorStop(1, P.trait);
    ctx.fillStyle = g;
    capsule(ctx, -w * 0.18, -w / 2, l + w * 0.36, w, w / 2);
    ctx.fill();
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = P.trait;
    ctx.stroke();
    if (!arriere) {
      ctx.strokeStyle = "rgba(255,240,200,0.45)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w * 0.1, -w * 0.26);
      ctx.lineTo(l - w * 0.1, -w * 0.26);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Un rivet d'or (coudes, genoux, épaules)
  function rivet(ctx, x, y, r) {
    ctx.fillStyle = "#8a6418";
    disque(ctx, x, y, r);
    ctx.fillStyle = "#f6d47a";
    disque(ctx, x - r * 0.25, y - r * 0.25, r * 0.6);
  }

  // Une jambe complète : cuisse, tibia avec sa jambière, sandale.
  function dessinerJambe(ctx, j, P, arriere, parures, tps, clou) {
    segment(ctx, j.hanche, j.genou, 17, P, arriere);
    segment(ctx, j.genou, j.cheville, 13, P, arriere);
    // La jambière (cnémide), plus claire, sur le tibia
    var mx = j.genou.x + (j.cheville.x - j.genou.x) * 0.15, my = j.genou.y + (j.cheville.y - j.genou.y) * 0.15;
    var nx = j.genou.x + (j.cheville.x - j.genou.x) * 0.85, ny = j.genou.y + (j.cheville.y - j.genou.y) * 0.85;
    ctx.save();
    ctx.globalAlpha = arriere ? 0.5 : 0.8;
    segment(ctx, { x: mx, y: my }, { x: nx, y: ny }, 9, OR, arriere);
    ctx.restore();
    rivet(ctx, j.genou.x, j.genou.y, 3.4);
    // La sandale, posée à plat devant la cheville
    var a = j.a2, fx = Math.cos(a), fy = -Math.sin(a);
    ctx.save();
    ctx.translate(j.cheville.x, j.cheville.y);
    ctx.rotate(Math.atan2(fy, fx));
    ctx.fillStyle = arriere ? "#4a2c14" : "#6b4220";
    capsule(ctx, -4, -3, 17, 6.5, 3);
    ctx.fill();
    ctx.fillStyle = arriere ? P.sombre : P.base;
    capsule(ctx, -3.5, -4.2, 9, 4.2, 2);
    ctx.fill();
    ctx.restore();
    // Le clou d'or de la cheville : dans la légende, le seul point faible de Talos
    if (clou) { ctx.fillStyle = "#f6d47a"; disque(ctx, j.cheville.x - 2, j.cheville.y - 3, 1.8); }
    if (parures.sandales) {
      var bat = Math.sin(tps * 14) * 0.4;
      ctx.save();
      ctx.translate(j.cheville.x - 4, j.cheville.y - 4);
      ctx.rotate(-2.4 - bat);
      ctx.fillStyle = "#fbf5e8";
      for (var k = 0; k < 3; k++) ovale(ctx, 6 + k * 1.5, -k * 2.6, 8 - k * 1.6, 2.2, -k * 0.25);
      ctx.restore();
    }
  }

  // Un bras complet, avec sa main.
  function dessinerBras(ctx, b, P, arriere) {
    segment(ctx, b.epaule, b.coude, 12, P, arriere);
    segment(ctx, b.coude, b.main, 11, P, arriere);
    rivet(ctx, b.coude.x, b.coude.y, 2.8);
    ctx.fillStyle = arriere ? P.sombre : P.clair;
    disque(ctx, b.main.x, b.main.y, 5.2);
    ctx.strokeStyle = P.trait;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(b.main.x, b.main.y, 5.2, 0, PI2); ctx.stroke();
  }

  // La lance : hampe de bois, pointe de bronze en forme de feuille.
  function dessinerLance(ctx, m, a, eclat) {
    ctx.save();
    ctx.translate(m.x, m.y);
    ctx.rotate(a);
    var g = ctx.createLinearGradient(0, -2.4, 0, 2.4);
    g.addColorStop(0, "#c99a62"); g.addColorStop(0.5, "#8a5a2b"); g.addColorStop(1, "#4e3016");
    ctx.fillStyle = g;
    ctx.fillRect(-46, -2.2, 122, 4.4);
    ctx.fillStyle = "#c47b36";
    ctx.fillRect(-48, -2.8, 7, 5.6);
    ctx.fillRect(70, -2.8, 6, 5.6);
    ctx.fillStyle = "#7a471c";
    ctx.beginPath(); ctx.moveTo(-48, -2.6); ctx.lineTo(-60, 0); ctx.lineTo(-48, 2.6); ctx.closePath(); ctx.fill();
    // La pointe
    var p = ctx.createLinearGradient(74, -7, 74, 7);
    p.addColorStop(0, "#fff0c0"); p.addColorStop(0.5, "#e2a65a"); p.addColorStop(1, "#7a471c");
    ctx.fillStyle = p;
    ctx.beginPath();
    ctx.moveTo(73, 0);
    ctx.quadraticCurveTo(82, -8, 104, 0);
    ctx.quadraticCurveTo(82, 8, 73, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#3f230c"; ctx.lineWidth = 1; ctx.stroke();
    ctx.strokeStyle = "rgba(255,250,230,0.8)";
    ctx.beginPath(); ctx.moveTo(76, -0.5); ctx.lineTo(101, -0.2); ctx.stroke();
    if (eclat > 0) lueur(ctx, 92, 0, 26 * eclat + 6, "255,214,130", 0.55 * eclat);
    ctx.restore();
  }

  // Le bouclier rond (hoplon), vu de trois quarts, avec la chouette d'Athéna.
  function dessinerBouclier(ctx, b, P) {
    var cx = (b.coude.x + b.main.x) / 2, cy = (b.coude.y + b.main.y) / 2;
    ctx.save();
    ctx.translate(cx - 2, cy);
    ctx.rotate(0.12);
    ctx.fillStyle = P.trait;
    ovale(ctx, 0, 0, 19, 29);
    var g = ctx.createLinearGradient(-18, -28, 18, 28);
    g.addColorStop(0, P.clair); g.addColorStop(0.5, P.base); g.addColorStop(1, P.sombre);
    ctx.fillStyle = g;
    ovale(ctx, 0, 0, 17.5, 27.5);
    ctx.fillStyle = "#6b2420";
    ovale(ctx, 0.8, 0, 12.5, 21);
    // La chouette : deux grands yeux d'or
    ctx.fillStyle = "#e2b24c";
    ovale(ctx, -3, -5, 3.6, 4.2); ovale(ctx, 5, -5, 3.6, 4.2);
    ctx.fillStyle = "#3a1408";
    disque(ctx, -3, -4.5, 1.6); disque(ctx, 5, -4.5, 1.6);
    ctx.fillStyle = "#e2b24c";
    ctx.beginPath(); ctx.moveTo(1, -2); ctx.lineTo(2.6, 1.5); ctx.lineTo(-0.6, 1.5); ctx.closePath(); ctx.fill();
    // les aigrettes et le corps de la chouette
    ctx.beginPath(); ctx.moveTo(-6.5, -8); ctx.lineTo(-5, -13); ctx.lineTo(-2, -9); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(8.5, -8); ctx.lineTo(7, -13); ctx.lineTo(4, -9); ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-5, 1); ctx.quadraticCurveTo(-8, 10, 1, 16); ctx.quadraticCurveTo(10, 10, 7, 1);
    ctx.quadraticCurveTo(1, 5, -5, 1); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "#6b2420"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-2, 7); ctx.lineTo(4, 7); ctx.moveTo(-1, 10.5); ctx.lineTo(3, 10.5); ctx.stroke();
    ctx.restore();
  }

  // L'arc d'or, tenu dans la main avant ; la corde va jusqu'à la main arrière.
  function dessinerArc(ctx, s, p, eclat, fleche) {
    var mAv = s.brasAv.main, mAr = s.brasAr.main;
    var phi = PI / 2 - s.brasAv.a2;
    ctx.save();
    ctx.translate(mAv.x, mAv.y);
    ctx.rotate(phi);
    // La main arrière, vue depuis l'arc
    var rx = mAr.x - mAv.x, ry = mAr.y - mAv.y;
    var cr = Math.cos(-phi), sr = Math.sin(-phi);
    var tire = { x: rx * cr - ry * sr, y: rx * sr + ry * cr };
    var k = Math.max(0, Math.min(1, p.tension));
    var encoche = { x: -7 + (tire.x + 7) * k, y: tire.y * k };
    var courbe = 1 + 0.25 * k;   // l'arc se plie quand on tire
    function branches() {
      ctx.beginPath();
      ctx.moveTo(-7 * courbe, -46);
      ctx.bezierCurveTo(6 * courbe, -40, 13 * courbe, -14, 0, 0);
      ctx.bezierCurveTo(13 * courbe, 14, 6 * courbe, 40, -7 * courbe, 46);
    }
    // La corde
    ctx.strokeStyle = "rgba(255,245,220,0.9)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-7 * courbe, -46); ctx.lineTo(encoche.x, encoche.y); ctx.lineTo(-7 * courbe, 46);
    ctx.stroke();
    branches();
    ctx.strokeStyle = "#5a400c"; ctx.lineWidth = 6.5; ctx.lineCap = "round"; ctx.stroke();
    branches();
    var g = ctx.createLinearGradient(0, -46, 0, 46);
    g.addColorStop(0, "#fff0b0"); g.addColorStop(0.5, "#e2b24c"); g.addColorStop(1, "#b07e22");
    ctx.strokeStyle = g; ctx.lineWidth = 4; ctx.stroke();
    ctx.fillStyle = "#6b2420";
    capsule(ctx, -3, -6, 7, 12, 3); ctx.fill();
    // La flèche encochée
    if (fleche) {
      var x0 = encoche.x, y0 = encoche.y, x1 = Math.max(x0 + 60, 28);
      ctx.strokeStyle = "#8a5a2b"; ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y0 * 0.2); ctx.stroke();
      ctx.fillStyle = "#e9e2d2";
      ctx.beginPath(); ctx.moveTo(x0 + 1, y0); ctx.lineTo(x0 + 9, y0 - 5); ctx.lineTo(x0 + 13, y0 - 0.5); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(x0 + 1, y0); ctx.lineTo(x0 + 9, y0 + 5); ctx.lineTo(x0 + 13, y0 + 0.5); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#f6d47a";
      ctx.beginPath(); ctx.moveTo(x1 + 10, y0 * 0.2); ctx.lineTo(x1 - 1, y0 * 0.2 - 4); ctx.lineTo(x1 - 1, y0 * 0.2 + 4); ctx.closePath(); ctx.fill();
      if (eclat > 0) lueur(ctx, x1 + 6, y0 * 0.2, 10 + 30 * eclat, "255,224,150", 0.7 * eclat);
    }
    ctx.restore();
  }

  // La cape pourpre (parure), attachée aux épaules ; elle flotte au vent.
  function dessinerCape(ctx, s, p, tps, vent) {
    var onde = Math.sin(tps * 6) * (3 + 4 * vent), onde2 = Math.sin(tps * 6 + 1.3) * (2 + 3 * vent);
    var ax = s.cou.x - 7, ay = s.cou.y + 5, bx = s.cou.x + 4, by = s.cou.y + 7;
    var cx = -36 - 26 * vent + onde, cy = 14 - 22 * vent;
    var dx = -8 - 18 * vent + onde2, dy = 26 - 14 * vent;
    var g = ctx.createLinearGradient(ax, ay, cx, cy);
    g.addColorStop(0, "#8a3a8a"); g.addColorStop(1, "#4a1a4a");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.quadraticCurveTo(-24 - 10 * vent, -18, cx, cy);
    ctx.quadraticCurveTo((cx + dx) / 2 + onde * 0.5, (cy + dy) / 2 + 6, dx, dy);
    ctx.quadraticCurveTo(-4, -2, bx, by);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#e2b24c";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.quadraticCurveTo((cx + dx) / 2 + onde * 0.5, (cy + dy) / 2 + 6, dx, dy);
    ctx.stroke();
  }

  // Le buste : une cuirasse « musclée » à la grecque, la ceinture et les lanières.
  function dessinerTorse(ctx, s, p, P, tps) {
    ctx.save();
    ctx.rotate(p.torse);
    // Les lanières de cuir (ptéruges) sous la ceinture
    for (var k = 0; k < 6; k++) {
      var x = -13 + k * 5.2, sw = Math.sin(tps * 3 + k) * 0.6;
      ctx.fillStyle = k % 2 ? "#5a1f1c" : "#7a2a24";
      capsule(ctx, x + sw, -2, 4.8, 15, 2);
      ctx.fill();
      ctx.fillStyle = "#e2b24c";
      ctx.fillRect(x + sw + 0.5, 10.5, 3.8, 2.2);
    }
    // La cuirasse
    ctx.beginPath();
    ctx.moveTo(-13, -3);
    ctx.quadraticCurveTo(-18, -24, -15, -41);
    ctx.quadraticCurveTo(-9, -49, 3, -48);
    ctx.quadraticCurveTo(16, -47, 18, -37);
    ctx.quadraticCurveTo(21, -25, 14, -15);
    ctx.quadraticCurveTo(12, -8, 13, -3);
    ctx.closePath();
    var g = ctx.createLinearGradient(-18, 0, 21, 0);
    g.addColorStop(0, P.trait); g.addColorStop(0.3, P.sombre); g.addColorStop(0.62, P.base);
    g.addColorStop(0.82, P.clair); g.addColorStop(1, P.base);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = P.trait; ctx.lineWidth = 1.4; ctx.stroke();
    // Les muscles gravés dans le bronze
    ctx.strokeStyle = "rgba(60,30,8,0.55)"; ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(-3, -36); ctx.quadraticCurveTo(7, -27, 18, -33);
    ctx.moveTo(1, -21); ctx.quadraticCurveTo(8, -18, 14, -21);
    ctx.moveTo(1, -13); ctx.quadraticCurveTo(7, -10, 12, -13);
    ctx.moveTo(4, -26); ctx.lineTo(5, -6);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,240,200,0.4)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-1, -44); ctx.quadraticCurveTo(10, -44, 15, -38); ctx.stroke();
    // La ceinture d'or
    ctx.fillStyle = "#8a6418";
    capsule(ctx, -14, -7, 28, 6, 2); ctx.fill();
    ctx.fillStyle = "#e2b24c";
    capsule(ctx, -13.5, -6.6, 27, 3.2, 1.6); ctx.fill();
    // Le cœur d'ichor, la vie de l'automate, qui bat
    var pulse = 0.5 + 0.5 * Math.sin(tps * 3.2);
    var force = 0.35 + 0.25 * pulse + 0.45 * p.eclat;
    lueur(ctx, 7, -30, 16 + 10 * p.eclat, "255,190,100", force);
    ctx.fillStyle = "#ffe3a0";
    disque(ctx, 7, -30, 3 + 0.8 * pulse);
    ctx.fillStyle = "#fff8e0";
    disque(ctx, 6.4, -30.6, 1.3);
    // L'épaulière
    ctx.fillStyle = P.base;
    ovale(ctx, 4, -42, 9, 6, -0.2);
    ctx.strokeStyle = P.trait; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(4, -42, 9, 6, -0.2, 0, PI2); ctx.stroke();
    ctx.restore();
  }

  // La tête : un casque corinthien, avec la fente lumineuse de l'œil.
  function dessinerTete(ctx, s, p, P, parures, tps) {
    ctx.save();
    ctx.translate(s.tete.x, s.tete.y);
    ctx.rotate(p.torse + p.tete);
    // Le plumet (parure) : une crinière rouge, du front jusque dans le dos
    if (parures.plumet) {
      var sw = Math.sin(tps * 4) * 2;
      ctx.fillStyle = "#8f2620";
      ctx.beginPath();
      ctx.moveTo(8, -12);
      ctx.quadraticCurveTo(4, -32, -12, -27 + sw * 0.3);
      ctx.quadraticCurveTo(-26, -20, -27 + sw, -3);
      ctx.quadraticCurveTo(-18, -12, -8, -13);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#d6463a";
      ctx.beginPath();
      ctx.moveTo(6, -14);
      ctx.quadraticCurveTo(2, -28, -11, -24 + sw * 0.3);
      ctx.quadraticCurveTo(-20, -19, -22 + sw, -8);
      ctx.quadraticCurveTo(-14, -15, -6, -15);
      ctx.closePath();
      ctx.fill();
    }
    // Le casque
    var g = ctx.createLinearGradient(-12, -14, 12, 12);
    g.addColorStop(0, P.sombre); g.addColorStop(0.45, P.base); g.addColorStop(0.75, P.clair); g.addColorStop(1, P.base);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(-11, 4);
    ctx.quadraticCurveTo(-13, -13, 0, -14.5);
    ctx.quadraticCurveTo(12, -14, 13, -3);
    ctx.lineTo(13.5, 7);
    ctx.quadraticCurveTo(11, 13, 4, 13);
    ctx.lineTo(1, 7);
    ctx.quadraticCurveTo(-4, 12, -11, 10);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = P.trait; ctx.lineWidth = 1.3; ctx.stroke();
    // La fente des yeux et du nez, en forme de T
    ctx.fillStyle = "#170c04";
    ctx.beginPath();
    ctx.moveTo(2, -4.5); ctx.lineTo(13.6, -4.2); ctx.lineTo(13.6, -0.3); ctx.lineTo(9.3, -0.3);
    ctx.lineTo(9.3, 9); ctx.lineTo(7, 9); ctx.lineTo(7, -0.3); ctx.lineTo(2, -0.6);
    ctx.closePath();
    ctx.fill();
    // L'œil qui brille
    var e = 0.45 + 0.55 * p.eclat;
    lueur(ctx, 9.5, -2.4, 10 + 12 * p.eclat, "255,220,140", 0.6 * e);
    ctx.fillStyle = "#fff3c4";
    capsule(ctx, 4, -3.4, 9, 1.9, 0.9);
    ctx.fill();
    // Le cimier d'or, sur le dessus du casque
    ctx.strokeStyle = "#8a6418"; ctx.lineWidth = 4.2;
    ctx.beginPath(); ctx.arc(0, -1, 13.5, PI * 1.12, PI * 1.92); ctx.stroke();
    ctx.strokeStyle = "#f6d47a"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, -1, 13.5, PI * 1.12, PI * 1.92); ctx.stroke();
    // Reflet
    ctx.strokeStyle = "rgba(255,245,220,0.55)"; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(1, -1, 10, PI * 1.25, PI * 1.6); ctx.stroke();
    // La couronne de laurier (parure)
    if (parures.laurier) {
      for (var f = 0; f < 9; f++) {
        var af = PI * (0.95 + f * 0.12);
        var fx = Math.cos(af) * 13, fy = -2 + Math.sin(af) * 12.5;
        ctx.fillStyle = f % 2 ? "#86b35a" : "#5d8a3a";
        ovale(ctx, fx, fy, 4.4, 1.9, af + PI / 2);
      }
    }
    ctx.restore();
  }

  // Dessine Talos.
  // o = { x, y : le point du sol sous ses pieds ; echelle ; parures ; tps ;
  //       fleche : une flèche est encochée ; vent : la cape flotte (0 à 1) }
  function dessiner(ctx, p, o) {
    var e = o.echelle || 1, parures = o.parures || {}, tps = o.tps || 0;
    var P = parures.armure ? OR : BRONZE;
    var s = squelette(p);
    var arc = p.arc >= 0.5;
    ctx.save();
    ctx.translate(o.x + p.x * e, o.y - hauteurBassin(p) * e);
    ctx.scale(e, e);
    ctx.rotate(p.rot);
    ctx.lineJoin = "round";

    if (parures.aura) lueur(ctx, s.cou.x * 0.5, s.cou.y * 0.5, 95, "190,205,255", 0.16 + 0.06 * Math.sin(tps * 2.5));
    if (parures.cape) dessinerCape(ctx, s, p, tps, o.vent || 0);

    dessinerJambe(ctx, s.jambeAr, P, true, parures, tps, false);
    if (!arc) {
      dessinerBras(ctx, s.brasAr, P, true);
      if (p.bouclier >= 0.5) dessinerBouclier(ctx, s.brasAr, P);
    }
    dessinerJambe(ctx, s.jambeAv, P, false, parures, tps, true);
    dessinerTorse(ctx, s, p, P, tps);
    segment(ctx, { x: s.cou.x * 0.9, y: s.cou.y * 0.9 }, s.tete, 9, P, false);
    dessinerTete(ctx, s, p, P, parures, tps);

    if (arc) {
      dessinerArc(ctx, s, p, p.eclat, o.fleche !== false);
      dessinerBras(ctx, s.brasAr, P, false);
    } else {
      dessinerLance(ctx, s.brasAv.main, p.lance, p.eclat);
    }
    dessinerBras(ctx, s.brasAv, P, false);
    rivet(ctx, s.epauleAv.x, s.epauleAv.y, 3);
    ctx.restore();

    // L'aura de sagesse (parure) : π, Σ et ∞ tournent autour de Talos
    if (parures.aura) {
      var pts = points(p, o);
      ctx.save();
      ctx.font = "700 " + Math.round(16 * e) + "px " + POLICE;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      var symboles = ["π", "Σ", "∞"];
      for (var n = 0; n < 3; n++) {
        var an = tps * 1.3 + n * PI2 / 3;
        ctx.fillStyle = "rgba(246,212,122," + (0.55 + 0.35 * Math.sin(an)).toFixed(3) + ")";
        ctx.fillText(symboles[n], pts.centre.x + Math.cos(an) * 62 * e, pts.centre.y + Math.sin(an) * 34 * e);
      }
      ctx.restore();
    }
  }

  return {
    POSES: POSES, melanger: melanger, pose: pose, Courbe: Courbe,
    dessiner: dessiner, points: points, hauteurBassin: hauteurBassin, lueur: lueur
  };
})();
