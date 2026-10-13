// =====================================================================
//  COMBAT : l'arène où Talos affronte le gardien d'une stèle
// =====================================================================
//  Quand on lit une stèle, l'arène s'ouvre au-dessus de l'exercice :
//  Talos d'un côté, le monstre de l'autre. Le combat se joue en
//  plusieurs manches, un exercice par manche :
//   - manche d'attaque : une bonne réponse, et Talos frappe le monstre ;
//   - manche d'esquive : le monstre se prépare à attaquer ; une bonne
//     réponse, et Talos esquive d'un salto arrière ;
//   - coup final : Talos porte un coup spectaculaire (tir parfait à
//     l'arc, pirouette héroïque, charge éclair ou foudre d'Athéna). Le
//     monstre se change en pierre puis s'effondre ; Talos gagne de
//     l'expérience, parfois un nouveau rang.
//   - Mauvaise réponse (ou sablier vide) : le monstre attaque, Talos
//     perd un cœur. Sans cœur, il est à terre (jeu.js le ramène au
//     départ de la salle).
//  Un boss (la dernière salle d'un chapitre) est un monstre géant, avec
//  plus de manches ; sa barre de vie s'affiche en bas de l'arène.
//
//  L'arène est dessinée dans un canvas de 960 × 400 « unités »,
//  agrandi ou réduit selon la place sur l'écran.
//  Ce fichier ne touche jamais à la progression : jeu.js lui dit ce qui
//  se passe (victoire, dégât), et l'arène le met en scène.
// =====================================================================

var Combat = (function () {

  var PI = Math.PI, PI2 = PI * 2;
  var POLICE = "'Cinzel', 'Trajan Pro', Georgia, serif";
  var LARG = 960, HAUT = 400, SOL = 332;
  var TALOS_X = 245, MONSTRE_X = 705;
  var ECHELLE_TALOS = 1.22;
  var C = Heros.Courbe;

  var canvas = null, ctx = null, R = 1;
  var ouvert = false, idBoucle = 0, dernierInstant = 0;
  var ct = 0;                 // le temps de l'arène, en secondes (il peut ralentir)
  var echelleTemps = 1;       // 1 : normal ; 0,3 : ralenti
  var gelJusqua = 0;          // un très court arrêt sur image au moment d'un coup
  var E = null;               // tout ce qui se passe dans l'arène
  var calqueM = null, calqueT = null;   // calques pour les effets sur le monstre et Talos

  // ---------------------------------------------------------------
  //  Petits outils
  // ---------------------------------------------------------------
  function S(u, a, b) { return Math.max(0, Math.min(1, (u - a) / (b - a))); }
  function lerp(a, b, k) { return a + (b - a) * k; }
  function hasard(a, b) { return a + Math.random() * (b - a); }
  function disque(c, x, y, r) { c.beginPath(); c.arc(x, y, Math.max(0.1, r), 0, PI2); c.fill(); }
  var lueur = Heros.lueur;

  function nouveauCalque(l, h) {
    var c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(l * R));
    c.height = Math.max(1, Math.round(h * R));
    return { c: c, x: c.getContext("2d"), l: l, h: h };
  }

  // ---------------------------------------------------------------
  //  Ouvrir, fermer, adapter à l'écran
  // ---------------------------------------------------------------
  function redimensionner() {
    if (!canvas) return;
    var largeur = canvas.clientWidth || LARG;
    var dpr = window.devicePixelRatio || 1;
    R = Math.min(2, largeur / LARG * dpr);
    canvas.width = Math.round(LARG * R);
    canvas.height = Math.round(HAUT * R);
    calqueM = nouveauCalque(1100, 480);
    calqueT = nouveauCalque(440, 440);
  }

  // infos = { monstre, bonus, parures, coeurs, coeursMax, rangs, xp, serie, reduit,
  //           manches (le nombre de manches), manche (la manche en cours, à partir de 0),
  //           boss (le nom du boss, ou "") }
  function ouvrir(leCanvas, infos) {
    canvas = leCanvas;
    ctx = canvas.getContext("2d");
    redimensionner();
    var def = Monstres.liste[infos.monstre] || Monstres.liste.minotaure;
    E = {
      def: def, idMonstre: infos.monstre, bonus: !!infos.bonus, parures: infos.parures || {},
      reduit: !!infos.reduit, coeurs: infos.coeurs, coeursMax: infos.coeursMax,
      rangs: infos.rangs || [], xp: infos.xp || 0, xpAffiche: infos.xp || 0, serie: infos.serie || 0,
      // Talos
      pose: Heros.POSES.garde, tx: 0, ty: -400, teinteT: null, fantomes: [], trainee: [], vent: 0, fleche: true,
      victorieux: false, aTerre: false,
      // le monstre
      mx: 0, my: 60, mEchelle: 0.85, mAlpha: 0, mAction: "repos", mK: 0, mFlash: 0,
      petrif: 0, detruit: false, vie: 1, vieAffichee: 1, vieRetard: 1, fissures: null,
      // les effets
      particules: [], projectiles: [], anneaux: [], entailles: [], eclairs: [], textes: [],
      banniere: null, flash: null, secousse: { force: 0, t0: 0, duree: 0.01 },
      zoom: 1, zoomCible: 1, foyer: { x: LARG / 2, y: HAUT / 2 }, cinema: 0, cinemaCible: 0,
      assombri: 0, assombriCible: 0, gris: 0, grisCible: 0, pilier: null, sceau: null,
      coeurPerdu: null, coeurGagne: null, xpAnim: null, poussieres: [],
      alphaT: 1, mFige: false, tFige: 0, foyerCible: null, rayon: null,
      sequence: null,
      // les manches, le boss, le sablier
      manches: Math.max(1, infos.manches || 1), manche: Math.max(0, infos.manche || 0), boss: infos.boss || "",
      menace: null, cibleFixe: null, porteeFixe: null, chrono: null, dernierCoupManche: ""
    };
    E.vie = E.vieAffichee = E.vieRetard = 1 - coupsAvant(E.manche) / totalCoups();
    for (var i = 0; i < 26; i++) {
      E.poussieres.push({ x: hasard(0, LARG), y: hasard(40, SOL), v: hasard(4, 14), ph: hasard(0, 6), r: hasard(0.8, 2.2) });
    }
    ct = 0; echelleTemps = 1; gelJusqua = 0;
    ouvert = true;
    intro();
    dernierInstant = performance.now();
    if (!idBoucle) idBoucle = window.requestAnimationFrame(boucle);
  }

  function fermer() {
    ouvert = false;
    E = null;
    if (idBoucle) { window.cancelAnimationFrame(idBoucle); idBoucle = 0; }
  }

  // Une animation est-elle en cours, qui doit empêcher de répondre ?
  function occupe() { return !!(E && E.sequence && E.sequence.bloque); }

  // ---------------------------------------------------------------
  //  Les séquences : une animation, avec des événements datés
  // ---------------------------------------------------------------
  // evenements = [[instant, fonction], ...] ; maj(u) est appelée à chaque image.
  function sequence(nom, duree, maj, evenements, fin, bloque) {
    E.sequence = {
      nom: nom, t0: ct, duree: duree, maj: maj, fin: fin, bloque: bloque !== false,
      evts: (evenements || []).map(function (e) { return { t: e[0], f: e[1], fait: false }; })
    };
  }
  function avancerSequence() {
    var s = E.sequence;
    if (!s) return;
    var u = ct - s.t0;
    for (var i = 0; i < s.evts.length; i++) {
      var e = s.evts[i];
      if (!e.fait && u >= e.t) { e.fait = true; e.f(); if (!E || E.sequence !== s) return; }
    }
    if (s.maj) s.maj(u);
    if (u >= s.duree && E.sequence === s) {
      E.sequence = null;
      echelleTemps = 1;
      if (s.fin) s.fin();
    }
  }

  // ---------------------------------------------------------------
  //  Les effets : secousses, éclairs de lumière, textes, bannières...
  // ---------------------------------------------------------------
  function secouer(force, duree) {
    if (E.reduit) return;
    E.secousse = { force: force, t0: ct, duree: duree || 0.35 };
  }
  function eclairer(rgb, force, duree) {
    E.flash = { rgb: rgb, force: E.reduit ? force * 0.3 : force, t0: ct, duree: duree || 0.25 };
  }
  function geler(duree) { if (!E.reduit) gelJusqua = performance.now() + duree * 1000; }
  function ralentir(facteur) { echelleTemps = E.reduit ? 1 : facteur; }

  // couleur : "or", "rouge", "bleu" ou "vert"
  function banniere(texte, sous, couleur, duree, taille) {
    taille = taille || 46;
    E.banniere = { texte: texte, sous: sous || "", couleur: couleur || "or", t0: ct, duree: duree || 1.6, taille: taille,
      y: taille <= 32 ? 120 : 178 };
  }
  function texteFlottant(texte, x, y, couleur, taille, coeur) {
    E.textes.push({ texte: texte, x: x, y: y, couleur: couleur, taille: taille || 26, t0: ct, duree: 1.3, coeur: !!coeur });
  }
  function anneau(x, y, r0, r1, duree, rgb, epaisseur, ecrase) {
    E.anneaux.push({ x: x, y: y, r0: r0, r1: r1, t0: ct, duree: duree, rgb: rgb, ep: epaisseur || 6, ecrase: ecrase || 1 });
  }
  function entaille(x, y, r, a0, a1, rgb, duree) {
    E.entailles.push({ x: x, y: y, r: r, a0: a0, a1: a1, rgb: rgb, t0: ct, duree: duree || 0.35 });
  }

  // Les particules : étincelles, poussière, éclats de pierre, braises, plumes, feu...
  function particule(p) {
    p.t0 = ct;
    p.vie = p.vie || 0.8;
    p.g = p.g || 0;
    p.rot = p.rot || 0;
    p.vrot = p.vrot || 0;
    if (E.particules.length < 900) E.particules.push(p);
  }
  function gerbe(x, y, n, rgb, vitesse, vie, taille, type, g) {
    if (E.reduit) n = Math.ceil(n / 3);
    for (var i = 0; i < n; i++) {
      var a = hasard(0, PI2), v = hasard(0.3, 1) * vitesse;
      particule({ type: type || "etincelle", x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vie: hasard(0.5, 1) * vie,
        taille: hasard(0.6, 1.2) * taille, rgb: rgb, g: g || 0 });
    }
  }
  function nuageDePoussiere(x, y, n, largeur) {
    if (E.reduit) n = Math.ceil(n / 3);
    for (var i = 0; i < n; i++) {
      particule({ type: "poussiere", x: x + hasard(-largeur, largeur), y: y - hasard(0, 8), vx: hasard(-60, 60), vy: hasard(-40, -5),
        vie: hasard(0.6, 1.2), taille: hasard(8, 20), rgb: "190,175,150", g: -10 });
    }
  }

  function avancerParticules(dt) {
    var garde = [];
    for (var i = 0; i < E.particules.length; i++) {
      var p = E.particules[i];
      if (ct - p.t0 > p.vie) continue;
      p.vy += p.g * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vrot * dt;
      if (p.sol && p.y > SOL + p.sol) { p.y = SOL + p.sol; p.vy *= -0.32; p.vx *= 0.6; p.vrot *= 0.5; }
      if (p.frein) { p.vx *= (1 - p.frein * dt); p.vy *= (1 - p.frein * dt); }
      garde.push(p);
    }
    E.particules = garde;
  }
  // ---------------------------------------------------------------
  //  Où sont Talos et le monstre (en unités de l'arène)
  // ---------------------------------------------------------------
  // Le calque du monstre : le monstre y est dessiné tourné vers la droite,
  // les pieds au point (ORIGINE_X, ORIGINE_Y) du calque.
  var ORIGINE_X = 260, ORIGINE_Y = 440;

  var ECHELLE_MONSTRE = 0.88;
  var ECHELLE_BOSS = 1.22;     // un boss est plus grand que les autres monstres
  function echelleMonstre() { return E.mEchelle * ECHELLE_MONSTRE * (E.boss ? ECHELLE_BOSS : 1); }
  // Un point du monstre (dans son propre repère) → un point de l'arène.
  // Le monstre est retourné : il regarde vers la gauche, vers Talos.
  function mondeMonstre(q) {
    var s = echelleMonstre();
    return { x: MONSTRE_X + E.mx - q.x * s, y: SOL + E.my + q.y * s };
  }
  // La distance de Talos au monstre, dans le repère du monstre
  function portee() {
    // pendant une esquive, le monstre vise l'endroit où Talos se tenait
    if (typeof E.porteeFixe === "number") return E.porteeFixe;
    return (MONSTRE_X + E.mx - (TALOS_X + E.tx)) / echelleMonstre();
  }
  function animMonstre() {
    return { t: E.mFige ? E.tFige : ct, action: E.mAction, k: E.mK, portee: portee() };
  }
  function pointsMonstre() {
    var p = E.def.points(animMonstre()), r = {};
    for (var n in p) {
      if (p[n] && typeof p[n].x === "number") r[n] = mondeMonstre(p[n]);
      else if (p[n] && p[n].length) r[n] = p[n].map(mondeMonstre);
      else r[n] = p[n];
    }
    return r;
  }
  function optionsTalos(x, y) {
    return { x: x, y: y, echelle: ECHELLE_TALOS, parures: E.parures, tps: ct, fleche: E.fleche, vent: E.vent };
  }
  function pointsTalos() { return Heros.points(E.pose, optionsTalos(TALOS_X + E.tx, SOL + E.ty)); }
  // Là où visent les attaques du monstre : Talos, ou l'endroit qu'il vient de quitter (esquive).
  function cibleTalos() { return E.cibleFixe ? E.cibleFixe.centre : pointsTalos().centre; }
  function teteTalos() { return E.cibleFixe ? E.cibleFixe.tete : pointsTalos().tete; }

  // ---------------------------------------------------------------
  //  Les manches du combat
  // ---------------------------------------------------------------
  // Avec 3 manches : l'attaque, l'esquive, le coup final.
  // Avec 5 manches (un boss) : attaque, esquive, attaque, esquive, coup final.
  function typeManche(k, n) { return k >= n - 1 ? "final" : (k % 2 === 0 ? "attaque" : "esquive"); }
  // Le nombre de coups que Talos doit porter (les attaques et le coup final)...
  function totalCoups() {
    var n = 0;
    for (var k = 0; k < E.manches; k++) if (typeManche(k, E.manches) !== "esquive") n++;
    return Math.max(1, n);
  }
  // ... et ceux déjà portés avant la manche k.
  function coupsAvant(k) {
    var n = 0;
    for (var i = 0; i < k && i < E.manches; i++) if (typeManche(i, E.manches) !== "esquive") n++;
    return n;
  }

  // ---------------------------------------------------------------
  //  L'entrée en scène : le monstre surgit, Talos tombe du ciel
  // ---------------------------------------------------------------
  function intro() {
    var vole = !!E.def.vole;
    var P = Heros.POSES;
    var boss = !!E.boss, D = boss ? 2.6 : 1.6, km = boss ? 1.5 : 0.75;
    Sons.jouer(boss ? "boss" : "apparition");
    E.assombriCible = boss ? 0.42 : 0.18;
    sequence("intro", D, function (u) {
      // Le monstre sort de la fumée (un boss, lentement)
      var k = S(u, 0.05, km);
      E.mAlpha = C.douce(S(u, 0.05, boss ? 0.9 : 0.45));
      E.my = vole ? -110 * (1 - C.sortie(k)) : 26 * (1 - C.sortie(k));
      E.mEchelle = 0.82 + 0.18 * C.ressort(k);
      if (u > km + 0.05) { E.mAction = "rire"; E.mK = S(u, km + 0.05, D); } else { E.mAction = "repos"; E.mK = 0; }
      // Talos tombe du ciel en vrille, puis se relève en garde
      if (u < 0.3) { E.ty = -420; E.pose = P.vrille; }
      else if (u < 0.62) {
        var c = S(u, 0.3, 0.62);
        E.ty = -420 * (1 - c * c);
        E.pose = Heros.melanger(P.vrille, P.vrille, 0);
        E.pose.rot = PI2 * c;
        E.vent = 1;
      } else {
        E.ty = 0;
        E.vent = 0.3;
        if (u < 0.74) E.pose = Heros.melanger(P.vrille, P.accroupi, C.sortie(S(u, 0.62, 0.68)));
        else E.pose = Heros.melanger(P.accroupi, P.garde, C.douce(S(u, 0.76, 1.05)));
      }
    }, [
      [0.02, function () { nuageDePoussiere(MONSTRE_X, SOL, 26, 120); anneau(MONSTRE_X, SOL - 4, 30, 260, 0.7, E.def.rgb, 8, 0.22); }],
      [0.4, function () {
        if (boss) banniere("BOSS", "Le gardien de la galerie", "rouge", 1.1, 32);
        else banniere(E.def.nom, E.def.titre, E.bonus ? "or" : "rouge", 1.5, 44);
      }],
      [1.45, function () {
        if (!boss) return;
        banniere(E.boss.toUpperCase(), E.def.nom + " · " + E.def.titre, "rouge", 1.6, 46);
        secouer(9, 0.6);
        anneau(MONSTRE_X, SOL - 4, 30, 380, 0.9, E.def.rgb, 10, 0.22);
        criMonstre();
      }],
      [0.62, function () {
        Sons.jouer("pas");
        secouer(7, 0.28);
        nuageDePoussiere(TALOS_X, SOL, 16, 50);
        anneau(TALOS_X, SOL, 10, 120, 0.45, "255,230,170", 5, 0.25);
      }],
      [0.85, criMonstre]
    ], function () { E.assombriCible = 0; annoncerManche(); }, false);
  }

  // Le cri du monstre, selon son genre
  function criMonstre() {
    var g = E.def.genre;
    if (g === "rugissement" || g === "charge") Sons.jouer("rugissement");
    else if (g === "pique" || g === "plumes") Sons.jouer("cri");
    else if (g === "souffle") Sons.jouer("feu");
    else Sons.jouer("sifflement");
  }

  // Le début d'une manche : une bannière, et à la manche d'esquive,
  // le monstre se prépare à attaquer.
  var NOMS_MANCHES = { attaque: "L'ATTAQUE", esquive: "L'ESQUIVE", final: "LE COUP FINAL" };
  var CONSIGNES = {
    attaque: "Une bonne réponse, et Talos frappe !",
    esquive: "Le monstre va attaquer : réponds juste pour esquiver !",
    final: "Une bonne réponse, et le monstre est changé en pierre !"
  };
  function annoncerManche() {
    if (!E || E.detruit || E.aTerre) return;
    var type = typeManche(E.manche, E.manches);
    if (E.manches > 1) {
      Sons.jouer("manche");
      banniere((E.boss ? "QUESTION " : "MANCHE ") + (E.manche + 1) + " / " + E.manches + " · " + NOMS_MANCHES[type],
        CONSIGNES[type], type === "esquive" ? "rouge" : (type === "final" ? "or" : "bleu"), 1.9, 30);
    }
    if (type === "esquive") menacer();
    else E.menace = null;
  }

  // La manche d'esquive : le monstre prend son élan et reste prêt à
  // frapper (on garde le début de son attaque, figé, qui tremble).
  // u0 : l'instant de son attaque où il s'arrête.
  var MENACES = { charge: 0.16, rocher: 0.35, morsure: 0.39, regard: 0.3, pique: 0.11, rugissement: 0.24, souffle: 0.1, plumes: 0.11 };
  function menacer() {
    var att = (ATTAQUES[E.def.genre] || ATTAQUES.charge)();
    var u0 = MENACES[E.def.genre] || 0.15;
    E.menace = { att: att, u0: u0 };
    criMonstre();
    sequence("menace", 0.55, function (u) { att.maj(u0 * C.douce(u / 0.55)); }, [], null, false);
  }

  // Si le joueur répond pendant l'entrée en scène, on la termine d'un coup.
  function finirIntro() {
    if (E.sequence && E.sequence.nom === "intro") E.sequence = null;
    E.mAlpha = 1; E.my = 0; E.mx = 0; E.mEchelle = 1; E.mAction = "repos"; E.mK = 0;
    E.ty = 0; E.tx = 0; E.vent = 0.3; E.assombriCible = 0;
  }

  // ---------------------------------------------------------------
  //  Au repos (entre deux animations)
  // ---------------------------------------------------------------
  function repos() {
    var P = Heros.POSES;
    var b = 0.5 + 0.5 * Math.sin(ct * 2.2);
    if (E.aTerre) { E.pose = P.aTerre; return; }
    if (E.victorieux) {
      E.pose = Heros.melanger(E.arcVictoire ? P.victoireArc : P.victoire, P.garde, 0);
      E.pose.y = -2 * Math.sin(ct * 2.2);
    } else {
      E.pose = Heros.melanger(P.garde, P.souffle, b);
    }
    E.tx = 0; E.ty = 0; E.vent = 0.3;
    if (!E.detruit && !E.mFige) {
      E.mAction = "repos"; E.mK = 0; E.mx = 0; E.my = 0;
      if (E.menace) {
        // prêt à frapper : la pose du début de son attaque, qui tremble
        E.menace.att.maj(E.menace.u0);
        E.mK += 0.012 * Math.sin(ct * 31);
        E.mx += 1.6 * Math.sin(ct * 27);
        if (E.rayon) E.rayon = null;
        if (E.teinteT && E.teinteT.duree === 10) E.teinteT = null;
      }
    }
  }

  // ---------------------------------------------------------------
  //  La boucle : une image toutes les 1/60 de seconde environ
  // ---------------------------------------------------------------
  function boucle(maintenant) {
    idBoucle = 0;
    if (!ouvert || !E) return;
    var dtReel = Math.min(0.05, Math.max(0, (maintenant - dernierInstant) / 1000));
    dernierInstant = maintenant;
    var dt = maintenant < gelJusqua ? 0 : dtReel * echelleTemps;
    ct += dt;
    try {
      mettreAJour(dt, dtReel);
      if (E) dessinerArene();
    } catch (err) {
      if (window.console) console.error(err);
    }
    if (ouvert && E) idBoucle = window.requestAnimationFrame(boucle);
  }

  function approcher(valeur, cible, vitesse, dt) { return valeur + (cible - valeur) * Math.min(1, vitesse * dt); }

  function mettreAJour(dt, dtReel) {
    if (!E.sequence) repos();
    avancerSequence();
    if (!E) return;
    // la caméra et les voiles se rapprochent doucement de leur but
    E.zoom = approcher(E.zoom, E.zoomCible, 5, dtReel);
    E.foyer.x = approcher(E.foyer.x, E.foyerCible ? E.foyerCible.x : LARG / 2, 5, dtReel);
    E.foyer.y = approcher(E.foyer.y, E.foyerCible ? E.foyerCible.y : HAUT / 2, 5, dtReel);
    E.cinema = approcher(E.cinema, E.cinemaCible, 6, dtReel);
    E.assombri = approcher(E.assombri, E.assombriCible, 4, dtReel);
    E.gris = approcher(E.gris, E.grisCible, 2.5, dtReel);
    E.mFlash = Math.max(0, E.mFlash - dt * 5);
    if (E.teinteT && ct - E.teinteT.t0 > E.teinteT.duree) E.teinteT = null;
    // la barre de vie du monstre : la vraie valeur, puis la trace blanche qui la suit
    E.vieAffichee = approcher(E.vieAffichee, E.vie, 14, dt);
    if (ct - (E.vieT0 || 0) > 0.35) E.vieRetard = approcher(E.vieRetard, E.vieAffichee, 4, dt);
    // l'expérience qui se remplit
    if (E.xpAnim) {
      var x = E.xpAnim, u = S(ct - x.t0, 0, x.duree);
      E.xpAffiche = lerp(x.de, x.a, C.douce(u));
      if (u >= 1) E.xpAnim = null;
    }
    var r = rangDe(E.xpAffiche);
    if (E.rangAffiche === undefined) E.rangAffiche = r;
    if (r > E.rangAffiche) { E.rangAffiche = r; nouveauRang(r); }
    // les projectiles
    var gardes = [];
    for (var i = 0; i < E.projectiles.length; i++) {
      var p = E.projectiles[i], k = (ct - p.t0) / p.duree;
      if (p.traine) {
        var q = positionProjectile(p, Math.min(1, k));
        p.traine.push({ x: q.x, y: q.y, t: ct });
        while (p.traine.length && ct - p.traine[0].t > 0.16) p.traine.shift();
      }
      if (k >= 1) { if (p.arrivee) p.arrivee(p); }
      else gardes.push(p);
      if (!E) return;
    }
    E.projectiles = gardes;
    avancerParticules(dt);
    // les braises qui montent autour d'un boss
    if (E.boss && !E.detruit && E.mAlpha > 0.5 && !E.reduit && Math.random() < 0.45) {
      particule({ type: "braise", x: MONSTRE_X + E.mx + hasard(-150, 150), y: SOL - hasard(0, 30), vx: hasard(-12, 12), vy: hasard(-110, -50),
        vie: hasard(1.1, 2), taille: hasard(1.5, 3.4), rgb: E.def.rgb, g: -15 });
    }
    // la traînée de la lance, les images fantômes de Talos
    if (E.trainee.length) { while (E.trainee.length && ct - E.trainee[0].t > 0.14) E.trainee.shift(); }
    E.fantomes = E.fantomes.filter(function (f) { return ct - f.t0 < 0.3; });
    E.textes = E.textes.filter(function (t) { return ct - t.t0 < t.duree; });
    E.anneaux = E.anneaux.filter(function (a) { return ct - a.t0 < a.duree; });
    E.entailles = E.entailles.filter(function (a) { return ct - a.t0 < a.duree; });
    E.eclairs = E.eclairs.filter(function (a) { return ct - a.t0 < a.duree; });
    if (E.banniere && ct - E.banniere.t0 > E.banniere.duree) E.banniere = null;
    for (var j = 0; j < E.poussieres.length; j++) {
      var d = E.poussieres[j];
      d.y -= d.v * dt;
      d.x += Math.sin(ct * 0.5 + d.ph) * 6 * dt;
      if (d.y < 30) { d.y = SOL; d.x = hasard(0, LARG); }
    }
  }

  // Le rang qui correspond à une quantité d'expérience
  function rangDe(xp) {
    var r = 0;
    for (var i = 0; i < E.rangs.length; i++) if (xp >= E.rangs[i].xp) r = i;
    return r;
  }

  // Les projectiles (flèche, rocher, plumes) : ils vont de (x0, y0) à (x1, y1)
  // en suivant une courbe de hauteur h.
  function projectile(p) {
    p.t0 = ct;
    p.traine = p.traine === false ? null : [];
    E.projectiles.push(p);
    return p;
  }
  function positionProjectile(p, u) {
    var x = lerp(p.x0, p.x1, u), y = lerp(p.y0, p.y1, u) - (p.h || 0) * 4 * u * (1 - u);
    var dx = (p.x1 - p.x0), dy = (p.y1 - p.y0) - (p.h || 0) * 4 * (1 - 2 * u);
    return { x: x, y: y, a: Math.atan2(dy, dx) };
  }

  // Une copie d'une pose, qu'on peut modifier sans abîmer l'originale
  function copie(p) { return Heros.melanger(p, p, 0); }

  // ===============================================================
  //  LE DESSIN DE L'ARÈNE
  // ===============================================================
  function dessinerArene() {
    var c = ctx;
    c.setTransform(R, 0, 0, R, 0, 0);
    c.globalAlpha = 1;
    c.globalCompositeOperation = "source-over";
    c.lineJoin = "round";
    // La secousse de l'écran
    var sx = 0, sy = 0, s = E.secousse, us = (ct - s.t0) / s.duree;
    if (us < 1 && s.force > 0) {
      var f = s.force * (1 - us) * (1 - us);
      sx = (Math.random() * 2 - 1) * f;
      sy = (Math.random() * 2 - 1) * f;
    }
    // La caméra : un léger zoom vers l'action
    var z = E.zoom, demiL = LARG / (2 * z), demiH = HAUT / (2 * z);
    var fx = Math.max(demiL, Math.min(LARG - demiL, E.foyer.x));
    var fy = Math.max(demiH, Math.min(HAUT - demiH, E.foyer.y));
    c.save();
    c.translate(LARG / 2 + sx, HAUT / 2 + sy);
    c.scale(z, z);
    c.translate(-fx, -fy);
    dessinerFond(c);
    dessinerSol(c);
    dessinerPoussieres(c);
    dessinerOmbres(c);
    dessinerMonstre(c);
    dessinerFantomes(c);
    dessinerTrainee(c);
    dessinerTalos(c);
    dessinerEffets(c);
    if (E.gris > 0.01) {
      // Talos à terre : les couleurs s'éteignent
      c.save();
      c.globalCompositeOperation = "saturation";
      c.fillStyle = "rgba(128,128,128," + Math.min(1, E.gris).toFixed(3) + ")";
      c.fillRect(-60, -60, LARG + 120, HAUT + 120);
      c.restore();
    }
    if (E.pilier) dessinerPilier(c);
    dessinerTextes(c);
    c.restore();
    dessinerVoiles(c);
    dessinerHUD(c);
    dessinerBanniere(c);
    dessinerSceau(c);
  }

  // ---------------------------------------------------------------
  //  Le fond : la salle où se trouve la stèle, puis le sol de l'arène
  // ---------------------------------------------------------------
  function dessinerFond(c) {
    var fait = false;
    if (window.Dessin && Dessin.fondCombat) {
      try { fait = Dessin.fondCombat(c, -40, -40, LARG + 80, HAUT + 80, SOL, ct); } catch (e) { fait = false; }
    }
    if (!fait) {
      // Un temple au crépuscule, si la salle n'est pas disponible
      var g = c.createLinearGradient(0, -40, 0, SOL);
      g.addColorStop(0, "#241c33"); g.addColorStop(0.6, "#634452"); g.addColorStop(1, "#b5865e");
      c.fillStyle = g;
      c.fillRect(-40, -40, LARG + 80, SOL + 50);
      c.fillStyle = "rgba(38,26,30,0.6)";
      for (var i = 0; i < 7; i++) {
        var x = 30 + i * 150;
        c.fillRect(x, 70, 34, SOL - 70);
        c.fillRect(x - 8, 58, 50, 14);
      }
      c.fillRect(-40, 40, LARG + 80, 20);
    }
    // Un voile : plus sombre en haut (pour lire les plaques), plus sombre pendant les grands coups
    var v = c.createLinearGradient(0, -40, 0, SOL);
    v.addColorStop(0, "rgba(8,5,12,0.62)");
    v.addColorStop(0.4, "rgba(8,5,12,0.22)");
    v.addColorStop(1, "rgba(8,5,12,0.08)");
    c.fillStyle = v;
    c.fillRect(-40, -40, LARG + 80, SOL + 40);
    if (E.assombri > 0.005) {
      c.fillStyle = "rgba(6,4,16," + (E.assombri * 0.72).toFixed(3) + ")";
      c.fillRect(-40, -40, LARG + 80, HAUT + 80);
    }
    // Des rayons de lumière qui tombent d'en haut
    if (!E.reduit) {
      c.save();
      c.globalCompositeOperation = "lighter";
      for (var r = 0; r < 3; r++) {
        var x0 = 90 + r * 280 + Math.sin(ct * 0.27 + r * 2.1) * 34;
        var a = (0.075 + 0.03 * Math.sin(ct * 0.6 + r)) * (1 - E.assombri);
        var g2 = c.createLinearGradient(x0, -40, x0 + 170, SOL);
        g2.addColorStop(0, "rgba(255,226,170," + a.toFixed(3) + ")");
        g2.addColorStop(1, "rgba(255,226,170,0)");
        c.fillStyle = g2;
        c.beginPath();
        c.moveTo(x0, -40); c.lineTo(x0 + 66, -40); c.lineTo(x0 + 250, SOL); c.lineTo(x0 + 118, SOL);
        c.closePath();
        c.fill();
      }
      c.restore();
    }
    // L'aura menaçante du monstre (plus forte pour un boss, ou quand il va frapper)
    if (!E.detruit && E.mAlpha > 0) {
      var h = E.def.hauteur * (E.boss ? ECHELLE_BOSS : 1);
      var fort = (E.boss ? 0.2 : 0.11) + (E.menace ? 0.08 : 0);
      lueur(c, MONSTRE_X + E.mx, SOL + E.my - h * 0.5, h * (E.boss ? 1.25 : 0.95), E.def.rgb,
        (fort + 0.05 * Math.sin(ct * (E.menace ? 6 : 2.4))) * E.mAlpha * (1 - E.petrif));
    }
  }

  function dessinerSol(c) {
    var g = c.createLinearGradient(0, SOL - 2, 0, HAUT + 40);
    g.addColorStop(0, "#cbb998");
    g.addColorStop(0.16, "#9f8a67");
    g.addColorStop(1, "#33291c");
    c.fillStyle = g;
    c.fillRect(-40, SOL - 2, LARG + 80, HAUT - SOL + 50);
    c.save();
    // Les joints des dalles de marbre, en perspective
    c.strokeStyle = "rgba(48,34,18,0.3)";
    c.lineWidth = 1.2;
    var vx = LARG / 2, vy = SOL - 320, bas = HAUT + 40, k = (SOL - vy) / (bas - vy);
    for (var i = -11; i <= 11; i++) {
      var xb = vx + i * 120;
      c.beginPath();
      c.moveTo(vx + (xb - vx) * k, SOL);
      c.lineTo(xb, bas);
      c.stroke();
    }
    [9, 22, 41, 68].forEach(function (d) {
      c.beginPath(); c.moveTo(-40, SOL + d); c.lineTo(LARG + 40, SOL + d); c.stroke();
    });
    // Le bord des dalles, éclairé, et les reflets
    c.fillStyle = "rgba(255,238,204,0.3)";
    c.fillRect(-40, SOL - 2, LARG + 80, 2);
    lueur(c, TALOS_X + E.tx, SOL + 16, 130, "255,210,150", 0.1);
    if (!E.detruit) lueur(c, MONSTRE_X + E.mx, SOL + 16, 170, E.def.rgb, 0.08 * E.mAlpha);
    // Le cercle d'or de l'arène
    c.strokeStyle = "rgba(236,196,104,0.5)";
    c.lineWidth = 2.5;
    c.beginPath(); c.ellipse(LARG / 2, SOL + 30, 390, 24, 0, 0, PI2); c.stroke();
    c.strokeStyle = "rgba(236,196,104,0.22)";
    c.lineWidth = 1;
    c.beginPath(); c.ellipse(LARG / 2, SOL + 30, 405, 28, 0, 0, PI2); c.stroke();
    c.restore();
  }

  // Les grains de poussière qui flottent dans la lumière
  function dessinerPoussieres(c) {
    if (E.reduit) return;
    c.save();
    c.globalCompositeOperation = "lighter";
    for (var i = 0; i < E.poussieres.length; i++) {
      var d = E.poussieres[i];
      var a = 0.25 + 0.2 * Math.sin(ct * 1.3 + d.ph);
      c.fillStyle = "rgba(255,230,180," + a.toFixed(3) + ")";
      disque(c, d.x, d.y, d.r);
    }
    c.restore();
  }

  function ombre(c, x, y, rx, a) {
    if (a <= 0 || rx <= 0) return;
    c.save();
    c.translate(x, y);
    c.scale(1, 0.18);
    var g = c.createRadialGradient(0, 0, 0, 0, 0, rx);
    g.addColorStop(0, "rgba(0,0,0," + a.toFixed(3) + ")");
    g.addColorStop(1, "rgba(0,0,0,0)");
    c.fillStyle = g;
    c.fillRect(-rx, -rx, 2 * rx, 2 * rx);
    c.restore();
  }
  function dessinerOmbres(c) {
    var haut = Math.max(0, -E.ty), aT = E.alphaT === undefined ? 1 : E.alphaT;
    ombre(c, TALOS_X + E.tx + 4, SOL + 3, 52 * Math.max(0.35, 1 - haut / 420), 0.42 * Math.max(0.25, 1 - haut / 300) * aT);
    if (!E.detruit && E.mAlpha > 0) {
      var vole = !!E.def.vole;
      ombre(c, MONSTRE_X + E.mx, SOL + 4, (vole ? 70 : 110) * echelleMonstre(), (vole ? 0.22 : 0.45) * E.mAlpha);
    }
  }

  // ---------------------------------------------------------------
  //  Le monstre, dessiné dans son calque (pour l'éclair blanc quand il
  //  est touché, et pour le changer en pierre)
  // ---------------------------------------------------------------
  var calqueP = null;   // le monstre changé en pierre

  function preparerCalqueMonstre() {
    var k = calqueM.x;
    k.setTransform(1, 0, 0, 1, 0, 0);
    k.globalCompositeOperation = "source-over";
    k.globalAlpha = 1;
    k.clearRect(0, 0, calqueM.c.width, calqueM.c.height);
    k.setTransform(R, 0, 0, R, ORIGINE_X * R, ORIGINE_Y * R);
    k.lineJoin = "round";
    k.lineCap = "round";
    E.def.dessiner(k, animMonstre());
    if (E.mFlash > 0.01) {
      k.setTransform(1, 0, 0, 1, 0, 0);
      k.globalCompositeOperation = "source-atop";
      k.fillStyle = "rgba(255,250,235," + Math.min(1, E.mFlash * 0.85).toFixed(3) + ")";
      k.fillRect(0, 0, calqueM.c.width, calqueM.c.height);
      k.globalCompositeOperation = "source-over";
    }
  }

  // Fabrique la version « pierre » du monstre : les mêmes ombres et lumières,
  // mais en gris, avec le grain de la pierre.
  function construirePierre() {
    var w = calqueM.c.width, h = calqueM.c.height;
    if (!calqueP || calqueP.c.width !== w || calqueP.c.height !== h) calqueP = nouveauCalque(1100, 480);
    var k = calqueP.x;
    k.setTransform(1, 0, 0, 1, 0, 0);
    k.globalCompositeOperation = "source-over";
    k.clearRect(0, 0, w, h);
    try {
      var img = calqueM.x.getImageData(0, 0, w, h), d = img.data;
      for (var i = 0; i < d.length; i += 4) {
        if (d[i + 3] === 0) continue;
        var l = 0.3 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2];
        l = 64 + l * 0.66 + (Math.random() - 0.5) * 20;
        d[i] = Math.min(255, l * 1.05);
        d[i + 1] = Math.min(255, l);
        d[i + 2] = Math.min(255, l * 0.9);
      }
      k.putImageData(img, 0, 0);
    } catch (e) {
      // Si le navigateur refuse de lire les pixels : une simple teinte grise
      k.drawImage(calqueM.c, 0, 0);
      k.globalCompositeOperation = "source-atop";
      k.fillStyle = "rgba(150,144,132,0.82)";
      k.fillRect(0, 0, w, h);
      k.globalCompositeOperation = "source-over";
    }
  }

  // Les fissures de la statue grandissent, avec la lumière du monstre qui en sort.
  function dessinerFissures() {
    var f = E.fissures;
    if (!f || f.fini || !calqueP) return;
    var k = Math.min(1, (ct - f.t0) / f.duree);
    var x = calqueP.x;
    x.setTransform(R, 0, 0, R, ORIGINE_X * R, ORIGINE_Y * R);
    x.globalCompositeOperation = "source-atop";
    x.lineJoin = "round";
    x.lineCap = "round";
    for (var i = 0; i < f.lignes.length; i++) {
      var l = f.lignes[i], m = Math.max(1, Math.round((l.length - 1) * k));
      x.beginPath();
      x.moveTo(l[0].x, l[0].y);
      for (var j = 1; j <= m; j++) x.lineTo(l[j].x, l[j].y);
      x.strokeStyle = "rgb(36,30,24)";
      x.lineWidth = 3.4;
      x.stroke();
      x.strokeStyle = "rgb(" + E.def.rgb + ")";
      x.lineWidth = 1.2;
      x.stroke();
    }
    x.globalCompositeOperation = "source-over";
    x.setTransform(1, 0, 0, 1, 0, 0);
    if (k >= 1) f.fini = true;
  }

  function dessinerMonstre(c) {
    if (E.detruit || E.mAlpha <= 0) return;
    if (!E.mFige) preparerCalqueMonstre();
    dessinerFissures();
    var s = echelleMonstre();
    c.save();
    c.globalAlpha = Math.min(1, E.mAlpha);
    c.translate(MONSTRE_X + E.mx, SOL + E.my);
    c.scale(-s, s);
    var X = -ORIGINE_X, Y = -ORIGINE_Y;
    if (E.petrif > 0 && calqueP) {
      // La pierre monte des pieds jusqu'à la tête
      var yl = lerp(40, -(E.def.hauteur + 110), E.petrif);
      if (E.petrif < 1) {
        c.save();
        c.beginPath(); c.rect(X, Y, 1100, yl - Y); c.clip();
        c.drawImage(calqueM.c, X, Y, 1100, 480);
        c.restore();
      }
      c.save();
      c.beginPath(); c.rect(X, yl, 1100, 40 - yl + 1); c.clip();
      c.drawImage(calqueP.c, X, Y, 1100, 480);
      c.restore();
      if (E.petrif < 1) {
        // le bord de la pierre qui monte brille
        c.save();
        c.beginPath(); c.rect(X, yl - 6, 1100, 12); c.clip();
        c.globalCompositeOperation = "lighter";
        c.drawImage(calqueP.c, X, Y, 1100, 480);
        c.drawImage(calqueP.c, X, Y, 1100, 480);
        c.restore();
      }
    } else {
      c.drawImage(calqueM.c, X, Y, 1100, 480);
    }
    c.restore();
  }

  // ---------------------------------------------------------------
  //  Talos (directement, ou dans son calque quand il doit être teinté)
  // ---------------------------------------------------------------
  function talosDansCalque(pose, tx, ty, rgb, a, monte) {
    var k = calqueT.x;
    k.setTransform(1, 0, 0, 1, 0, 0);
    k.globalCompositeOperation = "source-over";
    k.globalAlpha = 1;
    k.clearRect(0, 0, calqueT.c.width, calqueT.c.height);
    k.setTransform(R, 0, 0, R, 0, 0);
    Heros.dessiner(k, pose, optionsTalos(220, 400));
    if (a > 0.005) {
      k.globalCompositeOperation = "source-atop";
      if (monte !== undefined && monte < 1) {
        var yl = 400 - 250 * monte;
        var g = k.createLinearGradient(0, yl - 16, 0, yl + 16);
        g.addColorStop(0, "rgba(" + rgb + ",0)");
        g.addColorStop(1, "rgba(" + rgb + "," + Math.min(1, a).toFixed(3) + ")");
        k.fillStyle = g;
        k.fillRect(0, yl - 16, 440, 460 - yl);
      } else {
        k.fillStyle = "rgba(" + rgb + "," + Math.min(1, a).toFixed(3) + ")";
        k.fillRect(0, 0, 440, 440);
      }
      k.globalCompositeOperation = "source-over";
    }
  }

  function dessinerTalos(c) {
    var alpha = E.alphaT === undefined ? 1 : E.alphaT;
    if (alpha <= 0) return;
    var x = TALOS_X + E.tx, y = SOL + E.ty, t = E.teinteT;
    if (!t) {
      c.save();
      c.globalAlpha = alpha;
      Heros.dessiner(c, E.pose, optionsTalos(x, y));
      c.restore();
      return;
    }
    var ka = 1 - S(ct - t.t0, t.duree * 0.35, t.duree);
    talosDansCalque(E.pose, E.tx, E.ty, t.rgb, t.a * ka, t.monte);
    c.save();
    c.globalAlpha = alpha;
    c.drawImage(calqueT.c, x - 220, y - 400, 440, 440);
    c.restore();
  }

  // Les images fantômes dorées de Talos pendant les mouvements rapides
  function laisserFantome(rgb) {
    E.fantomes.push({ pose: E.pose, tx: E.tx, ty: E.ty, t0: ct, rgb: rgb || "255,212,120" });
    if (E.fantomes.length > 5) E.fantomes.shift();
  }
  function dessinerFantomes(c) {
    for (var i = 0; i < E.fantomes.length; i++) {
      var f = E.fantomes[i], u = (ct - f.t0) / 0.3;
      if (u >= 1) continue;
      talosDansCalque(f.pose, f.tx, f.ty, f.rgb, 0.55, undefined);
      c.save();
      c.globalAlpha = 0.38 * (1 - u);
      c.drawImage(calqueT.c, TALOS_X + f.tx - 220, SOL + f.ty - 400, 440, 440);
      c.restore();
    }
  }

  // La traînée lumineuse de la pointe de la lance
  function dessinerTrainee(c) {
    var t = E.trainee;
    if (t.length < 2) return;
    c.save();
    c.globalCompositeOperation = "lighter";
    c.lineCap = "round";
    for (var i = 1; i < t.length; i++) {
      var u = 1 - (ct - t[i].t) / 0.14;
      if (u <= 0) continue;
      c.strokeStyle = "rgba(255,226,150," + (0.6 * u).toFixed(3) + ")";
      c.lineWidth = 2 + 12 * u;
      c.beginPath(); c.moveTo(t[i - 1].x, t[i - 1].y); c.lineTo(t[i].x, t[i].y); c.stroke();
      c.strokeStyle = "rgba(255,255,255," + (0.7 * u).toFixed(3) + ")";
      c.lineWidth = 1 + 3 * u;
      c.stroke();
    }
    c.restore();
  }

  // ---------------------------------------------------------------
  //  Les effets : ondes, entailles, éclairs, projectiles, particules
  // ---------------------------------------------------------------
  function fairePointsEclair(x0, y0, x1, y1, ecart) {
    var pts = [{ x: x0, y: y0 }, { x: x1, y: y1 }];
    for (var n = 0; n < 6; n++) {
      var nouv = [pts[0]];
      for (var i = 1; i < pts.length; i++) {
        var a = pts[i - 1], b = pts[i];
        var dx = b.x - a.x, dy = b.y - a.y, l = Math.sqrt(dx * dx + dy * dy) || 1;
        var d = (Math.random() - 0.5) * ecart;
        nouv.push({ x: (a.x + b.x) / 2 - dy / l * d, y: (a.y + b.y) / 2 + dx / l * d }, b);
      }
      pts = nouv;
      ecart *= 0.55;
    }
    return pts;
  }
  function eclair(x0, y0, x1, y1, duree, largeur, rgb) {
    var e = { x0: x0, y0: y0, x1: x1, y1: y1, t0: ct, duree: duree, largeur: largeur || 6, rgb: rgb || "180,210,255", maj: ct, branches: [] };
    e.pts = fairePointsEclair(x0, y0, x1, y1, 110);
    for (var b = 0; b < 3; b++) {
      var p = e.pts[Math.floor(hasard(0.25, 0.75) * e.pts.length)];
      e.branches.push(fairePointsEclair(p.x, p.y, p.x + hasard(-100, 100), p.y + hasard(30, 120), 50));
    }
    E.eclairs.push(e);
  }
  function dessinerEclair(c, e) {
    var u = (ct - e.t0) / e.duree;
    if (ct - e.maj > 0.045) {
      // l'éclair tremble : on redessine son chemin de temps en temps
      e.maj = ct;
      e.pts = fairePointsEclair(e.x0, e.y0, e.x1, e.y1, 110);
    }
    var a = (1 - u) * (0.7 + 0.3 * Math.random());
    function trace(pts, w, couleur) {
      c.strokeStyle = couleur;
      c.lineWidth = w;
      c.beginPath();
      c.moveTo(pts[0].x, pts[0].y);
      for (var i = 1; i < pts.length; i++) c.lineTo(pts[i].x, pts[i].y);
      c.stroke();
    }
    c.save();
    c.globalCompositeOperation = "lighter";
    c.lineJoin = "round";
    c.lineCap = "round";
    trace(e.pts, e.largeur * 4.5, "rgba(" + e.rgb + "," + (0.22 * a).toFixed(3) + ")");
    trace(e.pts, e.largeur * 1.7, "rgba(" + e.rgb + "," + (0.75 * a).toFixed(3) + ")");
    trace(e.pts, e.largeur * 0.6, "rgba(255,255,255," + a.toFixed(3) + ")");
    for (var b = 0; b < e.branches.length; b++) trace(e.branches[b], e.largeur * 0.55, "rgba(" + e.rgb + "," + (0.6 * a).toFixed(3) + ")");
    lueur(c, e.x1, e.y1, 90 * e.largeur / 8, e.rgb, 0.6 * a);
    c.restore();
  }

  // Le regard de pierre de Méduse : deux rayons verts, des yeux jusqu'à Talos
  function dessinerRayon(c) {
    var f = E.rayon.force, pm = pointsMonstre(), pt = { tete: teteTalos() };
    if (!pm.yeux) return;
    c.save();
    c.globalCompositeOperation = "lighter";
    c.lineCap = "round";
    for (var o = -1; o <= 1; o += 2) {
      var x0 = pm.yeux.x, y0 = pm.yeux.y + o * 3, x1 = pt.tete.x + 6, y1 = pt.tete.y + 10 + o * 8;
      var tremble = 0.75 + 0.25 * Math.sin(ct * 60 + o);
      c.strokeStyle = "rgba(170,255,120," + (0.2 * f * tremble).toFixed(3) + ")";
      c.lineWidth = 16;
      c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke();
      c.strokeStyle = "rgba(200,255,150," + (0.75 * f * tremble).toFixed(3) + ")";
      c.lineWidth = 4;
      c.stroke();
      c.strokeStyle = "rgba(255,255,255," + (0.9 * f).toFixed(3) + ")";
      c.lineWidth = 1.4;
      c.stroke();
    }
    lueur(c, pm.yeux.x, pm.yeux.y, 50, "170,255,120", 0.7 * f);
    lueur(c, pt.tete.x, pt.tete.y + 10, 70, "170,255,120", 0.5 * f);
    c.restore();
  }

  function dessinerEffets(c) {
    var i;
    if (E.rayon) dessinerRayon(c);
    // les ondes de choc
    for (i = 0; i < E.anneaux.length; i++) {
      var a = E.anneaux[i], u = (ct - a.t0) / a.duree;
      var r = lerp(a.r0, a.r1, C.sortie(u));
      c.save();
      c.globalCompositeOperation = "lighter";
      c.translate(a.x, a.y);
      c.scale(1, a.ecrase);
      c.strokeStyle = "rgba(" + a.rgb + "," + (0.85 * (1 - u)).toFixed(3) + ")";
      c.lineWidth = Math.max(0.5, a.ep * (1 - u * 0.75));
      c.beginPath(); c.arc(0, 0, Math.max(0.1, r), 0, PI2); c.stroke();
      c.restore();
    }
    // les entailles (le passage de la lance)
    for (i = 0; i < E.entailles.length; i++) {
      var e = E.entailles[i], v = (ct - e.t0) / e.duree;
      var fin = lerp(e.a0, e.a1, C.sortie(Math.min(1, v * 2.4)));
      var debut = lerp(e.a0, e.a1, C.entree(v));
      var sens = e.a1 < e.a0;
      var w = 30 * (1 - v), mi = (debut + fin) / 2;
      c.save();
      c.globalCompositeOperation = "lighter";
      c.fillStyle = "rgba(" + e.rgb + "," + (0.9 * (1 - v)).toFixed(3) + ")";
      c.beginPath();
      c.arc(e.x, e.y, e.r, debut, fin, sens);
      c.arc(e.x + Math.cos(mi) * w * 0.6, e.y + Math.sin(mi) * w * 0.6, Math.max(1, e.r - w), fin, debut, !sens);
      c.closePath();
      c.fill();
      c.strokeStyle = "rgba(255,255,255," + (0.85 * (1 - v)).toFixed(3) + ")";
      c.lineWidth = 2.5 * (1 - v) + 0.5;
      c.beginPath(); c.arc(e.x, e.y, e.r - 1, debut, fin, sens); c.stroke();
      c.restore();
    }
    for (i = 0; i < E.eclairs.length; i++) dessinerEclair(c, E.eclairs[i]);
    for (i = 0; i < E.projectiles.length; i++) dessinerProjectile(c, E.projectiles[i]);
    dessinerParticules(c);
  }

  function dessinerProjectile(c, p) {
    var u = Math.min(1, (ct - p.t0) / p.duree), q = positionProjectile(p, u), i;
    if (p.traine && p.traine.length > 1) {
      c.save();
      c.globalCompositeOperation = "lighter";
      c.lineCap = "round";
      for (i = 1; i < p.traine.length; i++) {
        var v = 1 - (ct - p.traine[i].t) / 0.16;
        if (v <= 0) continue;
        c.strokeStyle = "rgba(" + (p.rgb || "255,220,140") + "," + (0.65 * v).toFixed(3) + ")";
        c.lineWidth = (p.largeur || 5) * v + 0.5;
        c.beginPath(); c.moveTo(p.traine[i - 1].x, p.traine[i - 1].y); c.lineTo(p.traine[i].x, p.traine[i].y); c.stroke();
      }
      c.restore();
    }
    c.save();
    c.translate(q.x, q.y);
    if (p.type === "fleche") {
      c.rotate(q.a);
      lueur(c, 0, 0, 46, "255,220,130", 0.55);
      c.strokeStyle = "#5e3f1c"; c.lineWidth = 3;
      c.beginPath(); c.moveTo(-58, 0); c.lineTo(8, 0); c.stroke();
      c.strokeStyle = "rgba(255,230,160,0.8)"; c.lineWidth = 1;
      c.beginPath(); c.moveTo(-58, -1); c.lineTo(8, -1); c.stroke();
      c.fillStyle = "#fff0b8"; c.strokeStyle = "#5a3e10"; c.lineWidth = 1.2;
      c.beginPath(); c.moveTo(22, 0); c.lineTo(5, -7); c.lineTo(8, 0); c.lineTo(5, 7); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = "#f3eee2";
      c.beginPath(); c.moveTo(-50, 0); c.lineTo(-64, -8); c.lineTo(-58, 0); c.lineTo(-64, 8); c.closePath(); c.fill();
    } else if (p.type === "rocher") {
      lueur(c, 0, 0, 50, "255,190,70", 0.15);
      Monstres.dessinerRocher(c, 0, 0, p.r || 26, (p.rot0 || 0) + (ct - p.t0) * (p.vrot || 8));
    } else if (p.type === "plume") {
      c.rotate(q.a);
      lueur(c, 0, 0, 24, "255,190,90", 0.4);
      c.fillStyle = "#e3a24a"; c.strokeStyle = "#4a2a0c"; c.lineWidth = 1.2;
      c.beginPath(); c.moveTo(20, 0); c.quadraticCurveTo(2, -7, -20, -2); c.lineTo(-20, 2); c.quadraticCurveTo(2, 7, 20, 0); c.closePath();
      c.fill(); c.stroke();
      c.strokeStyle = "rgba(255,240,200,0.8)"; c.lineWidth = 1;
      c.beginPath(); c.moveTo(18, 0); c.lineTo(-20, 0); c.stroke();
    } else if (p.type === "onde") {
      // une onde du rugissement : un arc qui grandit en avançant
      var r = 22 + 70 * u;
      c.globalCompositeOperation = "lighter";
      c.strokeStyle = "rgba(170,210,255," + (0.75 * (1 - u * 0.7)).toFixed(3) + ")";
      c.lineWidth = 7 * (1 - u * 0.6);
      c.beginPath(); c.arc(r, 0, r, PI * 0.72, PI * 1.28); c.stroke();
      c.strokeStyle = "rgba(255,255,255," + (0.5 * (1 - u)).toFixed(3) + ")";
      c.lineWidth = 2;
      c.stroke();
    }
    c.restore();
  }

  function dessinerParticules(c) {
    var i, p, u, a;
    // d'abord celles qui cachent (poussière, éclats de pierre, plumes)...
    for (i = 0; i < E.particules.length; i++) {
      p = E.particules[i]; u = (ct - p.t0) / p.vie;
      if (u < 0 || u >= 1) continue;
      a = 1 - u;
      if (p.type === "poussiere") {
        c.fillStyle = "rgba(" + p.rgb + "," + (0.32 * a).toFixed(3) + ")";
        disque(c, p.x, p.y, p.taille * (0.6 + u));
      } else if (p.type === "eclat") {
        c.save();
        c.globalAlpha = Math.min(1, a * 4);
        c.translate(p.x, p.y);
        c.rotate(p.rot);
        c.fillStyle = p.couleur || "#8a8272";
        var t = p.taille;
        c.beginPath();
        c.moveTo(-t * 0.5, -t * 0.3); c.lineTo(-t * 0.05, -t * 0.55); c.lineTo(t * 0.5, -t * 0.25);
        c.lineTo(t * 0.38, t * 0.42); c.lineTo(-t * 0.36, t * 0.5);
        c.closePath();
        c.fill();
        c.strokeStyle = "rgba(30,24,18,0.55)";
        c.lineWidth = 1;
        c.stroke();
        c.fillStyle = "rgba(255,255,255,0.18)";
        c.beginPath(); c.moveTo(-t * 0.5, -t * 0.3); c.lineTo(-t * 0.05, -t * 0.55); c.lineTo(t * 0.1, -t * 0.1); c.closePath(); c.fill();
        c.restore();
      } else if (p.type === "plume") {
        c.save();
        c.globalAlpha = Math.min(1, a * 2);
        c.translate(p.x, p.y);
        c.rotate(p.rot);
        c.fillStyle = p.couleur || "#5a4060";
        c.beginPath(); c.ellipse(0, 0, p.taille, p.taille * 0.3, 0, 0, PI2); c.fill();
        c.restore();
      } else if (p.type === "feu" && u > 0.62) {
        c.fillStyle = "rgba(40,30,28," + (0.35 * (1 - u) / 0.38).toFixed(3) + ")";
        disque(c, p.x, p.y, p.taille * (0.5 + 1.6 * u));
      }
    }
    // ... puis celles qui brillent
    c.save();
    c.globalCompositeOperation = "lighter";
    c.lineCap = "round";
    for (i = 0; i < E.particules.length; i++) {
      p = E.particules[i]; u = (ct - p.t0) / p.vie;
      if (u < 0 || u >= 1) continue;
      a = 1 - u;
      if (p.type === "etincelle") {
        c.strokeStyle = "rgba(" + p.rgb + "," + a.toFixed(3) + ")";
        c.lineWidth = Math.max(0.5, p.taille * a);
        c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(p.x - p.vx * 0.035, p.y - p.vy * 0.035); c.stroke();
      } else if (p.type === "braise" || p.type === "eclatCoeur") {
        c.fillStyle = "rgba(" + p.rgb + "," + (a * (0.7 + 0.3 * Math.sin(ct * 40 + i))).toFixed(3) + ")";
        disque(c, p.x, p.y, p.taille * (0.4 + 0.6 * a));
      } else if (p.type === "feu" && u <= 0.62) {
        var k = u / 0.62, r = p.taille * (0.5 + 1.6 * u);
        var coul = k < 0.25 ? "255,240,190" : (k < 0.6 ? "255,170,60" : "230,80,30");
        var g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, "rgba(" + coul + "," + (0.75 * (1 - k * 0.6)).toFixed(3) + ")");
        g.addColorStop(1, "rgba(" + coul + ",0)");
        c.fillStyle = g;
        c.fillRect(p.x - r, p.y - r, 2 * r, 2 * r);
      } else if (p.type === "trait") {
        c.strokeStyle = "rgba(" + p.rgb + "," + (0.6 * a).toFixed(3) + ")";
        c.lineWidth = 2;
        c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(p.x + p.taille, p.y); c.stroke();
      } else if (p.type === "etoile") {
        var s = p.taille * (0.6 + 0.4 * Math.sin(ct * 18 + i)) * a + 0.5;
        c.fillStyle = "rgba(" + p.rgb + "," + a.toFixed(3) + ")";
        c.beginPath();
        c.moveTo(p.x, p.y - s * 2.2); c.lineTo(p.x + s * 0.5, p.y - s * 0.5); c.lineTo(p.x + s * 2.2, p.y);
        c.lineTo(p.x + s * 0.5, p.y + s * 0.5); c.lineTo(p.x, p.y + s * 2.2); c.lineTo(p.x - s * 0.5, p.y + s * 0.5);
        c.lineTo(p.x - s * 2.2, p.y); c.lineTo(p.x - s * 0.5, p.y - s * 0.5);
        c.closePath();
        c.fill();
      }
    }
    c.restore();
  }

  // Les textes qui s'envolent (« +150 XP », « −1 »...)
  var COULEURS = {
    or: ["#fff3c0", "#ffcb4a", "#c27d16"], rouge: ["#ffd0c4", "#ff5a42", "#a3160e"],
    vert: ["#eaffdf", "#8cff7a", "#2b9636"], bleu: ["#f0f9ff", "#9fd8ff", "#3f7fd6"], blanc: ["#ffffff", "#f3eadb", "#b9ab92"]
  };
  function remplirTexte(c, texte, x, y, taille, couleur, trait) {
    var k = COULEURS[couleur] || COULEURS.or;
    c.lineWidth = trait || Math.max(3, taille * 0.18);
    c.strokeStyle = "rgba(22,12,4,0.88)";
    c.strokeText(texte, x, y);
    var g = c.createLinearGradient(0, y - taille * 0.5, 0, y + taille * 0.5);
    g.addColorStop(0, k[0]); g.addColorStop(0.5, k[1]); g.addColorStop(1, k[2]);
    c.fillStyle = g;
    c.fillText(texte, x, y);
  }
  function dessinerTextes(c) {
    c.save();
    c.textAlign = "center";
    c.textBaseline = "middle";
    for (var i = 0; i < E.textes.length; i++) {
      var t = E.textes[i], u = (ct - t.t0) / t.duree;
      if (u < 0) continue;
      var pop = u < 0.16 ? C.ressort(u / 0.16) : 1;
      var a = u < 0.7 ? 1 : 1 - (u - 0.7) / 0.3;
      c.save();
      c.translate(t.x, t.y - 44 * C.sortie(u));
      c.scale(Math.max(0.01, pop), Math.max(0.01, pop));
      c.globalAlpha = Math.max(0, a);
      c.font = "700 " + t.taille + "px " + POLICE;
      if (t.coeur) {
        var l = c.measureText(t.texte).width, r = t.taille * 0.36;
        remplirTexte(c, t.texte, -r * 1.3, 0, t.taille, t.couleur);
        dessinerCoeur(c, l / 2 + r * 0.2, 2, r, true);
      } else {
        remplirTexte(c, t.texte, 0, 0, t.taille, t.couleur);
      }
      c.restore();
    }
    c.restore();
  }

  // ---------------------------------------------------------------
  //  Le pilier de lumière d'Athéna (quand Talos est à terre)
  // ---------------------------------------------------------------
  function dessinerPilier(c) {
    var p = E.pilier, u = (ct - p.t0) / p.duree;
    if (u < 0) return;
    var x = TALOS_X + E.tx - 40;
    var descente = C.sortie(S(u, 0, 0.18));
    var largeur = 78 * C.sortie(S(u, 0, 0.3)) * (1 - 0.6 * S(u, 0.85, 1.1));
    var bas = lerp(-40, SOL + 6, descente);
    c.save();
    c.globalCompositeOperation = "lighter";
    var g = c.createLinearGradient(x - largeur, 0, x + largeur, 0);
    g.addColorStop(0, "rgba(140,190,255,0)");
    g.addColorStop(0.5, "rgba(225,240,255,0.85)");
    g.addColorStop(1, "rgba(140,190,255,0)");
    c.fillStyle = g;
    c.fillRect(x - largeur, -40, 2 * largeur, bas + 40);
    c.fillStyle = "rgba(255,255,255," + (0.6 * descente).toFixed(3) + ")";
    c.fillRect(x - largeur * 0.12, -40, largeur * 0.24, bas + 40);
    lueur(c, x, SOL, 160, "170,210,255", 0.7 * descente);
    c.restore();
  }

  // ---------------------------------------------------------------
  //  Les voiles de l'écran : vignette, éclair de lumière, bandes noires
  // ---------------------------------------------------------------
  function dessinerVoiles(c) {
    var v = c.createRadialGradient(LARG / 2, HAUT * 0.55, HAUT * 0.42, LARG / 2, HAUT * 0.55, LARG * 0.62);
    v.addColorStop(0, "rgba(0,0,0,0)");
    v.addColorStop(1, "rgba(0,0,0,0.55)");
    c.fillStyle = v;
    c.fillRect(0, 0, LARG, HAUT);
    if (E.flash) {
      var u = (ct - E.flash.t0) / E.flash.duree;
      if (u < 1) {
        c.save();
        c.globalCompositeOperation = "lighter";
        c.fillStyle = "rgba(" + E.flash.rgb + "," + (E.flash.force * (1 - u) * (1 - u)).toFixed(3) + ")";
        c.fillRect(0, 0, LARG, HAUT);
        c.restore();
      } else E.flash = null;
    }
    if (E.boss && !E.detruit) {
      // un boss assombrit les bords de l'écran d'un rouge qui palpite
      var vb = c.createRadialGradient(LARG / 2, HAUT * 0.55, HAUT * 0.5, LARG / 2, HAUT * 0.55, LARG * 0.7);
      vb.addColorStop(0, "rgba(" + E.def.rgb + ",0)");
      vb.addColorStop(1, "rgba(" + E.def.rgb + "," + (0.1 + 0.05 * Math.sin(ct * 2)).toFixed(3) + ")");
      c.fillStyle = vb;
      c.fillRect(0, 0, LARG, HAUT);
    }
    if (E.cinema > 0.01) {
      var h = 30 * E.cinema;
      c.fillStyle = "#000";
      c.fillRect(0, 0, LARG, h);
      c.fillRect(0, HAUT - h, LARG, h);
    }
  }

  // ---------------------------------------------------------------
  //  Les plaques : cœurs, rang et expérience de Talos ; vie du monstre
  // ---------------------------------------------------------------
  function cheminCoeur(c, x, y, r) {
    c.beginPath();
    c.moveTo(x, y + r * 0.95);
    c.bezierCurveTo(x - r * 1.4, y + r * 0.05, x - r * 0.95, y - r * 1.1, x, y - r * 0.38);
    c.bezierCurveTo(x + r * 0.95, y - r * 1.1, x + r * 1.4, y + r * 0.05, x, y + r * 0.95);
    c.closePath();
  }
  function dessinerCoeur(c, x, y, r, plein) {
    cheminCoeur(c, x, y, r);
    if (plein) {
      var g = c.createLinearGradient(x, y - r, x, y + r);
      g.addColorStop(0, "#ff9a86"); g.addColorStop(0.45, "#e8342b"); g.addColorStop(1, "#7d0b0f");
      c.fillStyle = g;
      c.fill();
      c.strokeStyle = "#3a0606";
      c.lineWidth = 1.5;
      c.stroke();
      c.fillStyle = "rgba(255,255,255,0.6)";
      c.beginPath(); c.ellipse(x - r * 0.42, y - r * 0.36, r * 0.24, r * 0.16, -0.6, 0, PI2); c.fill();
    } else {
      c.fillStyle = "rgba(24,12,10,0.6)";
      c.fill();
      c.strokeStyle = "rgba(226,190,140,0.55)";
      c.lineWidth = 1.4;
      c.stroke();
    }
  }

  function plaque(c, x, y, l, h) {
    var b = 10;
    c.beginPath();
    c.moveTo(x + b, y); c.lineTo(x + l - b, y); c.lineTo(x + l, y + b); c.lineTo(x + l, y + h - b);
    c.lineTo(x + l - b, y + h); c.lineTo(x + b, y + h); c.lineTo(x, y + h - b); c.lineTo(x, y + b);
    c.closePath();
    var g = c.createLinearGradient(0, y, 0, y + h);
    g.addColorStop(0, "rgba(34,24,16,0.86)");
    g.addColorStop(1, "rgba(12,8,6,0.86)");
    c.fillStyle = g;
    c.fill();
    c.strokeStyle = "rgba(226,184,96,0.9)";
    c.lineWidth = 1.5;
    c.stroke();
    c.strokeStyle = "rgba(226,184,96,0.25)";
    c.lineWidth = 1;
    c.strokeRect(x + 4, y + 4, l - 8, h - 8);
  }

  // Où se trouvent les cœurs et la barre d'expérience (pour y faire voler des choses)
  var HUD = { x: 14, y: 12, l: 322, h: 76 };
  function placeCoeur(i) { return { x: HUD.x + 24 + i * 28, y: HUD.y + 44 }; }
  function placeBarre() { return { x: HUD.x + 14, y: HUD.y + 62, l: 180, h: 7 }; }

  function dessinerHUD(c) {
    var alpha = 1 - 0.6 * E.cinema, i;
    c.save();
    c.globalAlpha = alpha;
    // ----- Talos -----
    plaque(c, HUD.x, HUD.y, HUD.l, HUD.h);
    c.textBaseline = "alphabetic";
    c.textAlign = "left";
    c.font = "700 15px " + POLICE;
    c.fillStyle = "#f7e2b0";
    c.fillText("TALOS", HUD.x + 14, HUD.y + 23);
    var r = E.rangAffiche || 0, rang = E.rangs[r] || { titre: "", xp: 0 };
    c.font = "600 13px " + POLICE;
    c.fillStyle = "#e9b85c";
    c.fillText("· " + rang.titre, HUD.x + 80, HUD.y + 23);
    // les cœurs
    for (i = 0; i < E.coeursMax; i++) {
      var q = placeCoeur(i), plein = i < E.coeurs;
      if (E.coeurPerdu && E.coeurPerdu.i === i && ct - E.coeurPerdu.t0 < 0.8) continue;
      var echelle = 1;
      if (E.coeurGagne && E.coeurGagne.i === i) {
        var ug = (ct - E.coeurGagne.t0) / 0.5;
        if (ug < 1) {
          echelle = Math.max(0.01, C.ressort(ug));
          lueur(c, q.x, q.y, 30, "255,140,150", 0.8 * (1 - ug));
        }
      }
      if (plein && E.coeurs === 1 && !E.aTerre) {
        // le dernier cœur bat, pour prévenir du danger
        echelle *= 1 + 0.12 * Math.max(0, Math.sin(ct * 7));
        lueur(c, q.x, q.y, 22, "255,60,50", 0.35 + 0.25 * Math.sin(ct * 7));
      }
      c.save();
      c.translate(q.x, q.y);
      c.scale(echelle, echelle);
      dessinerCoeur(c, 0, 0, 10, plein);
      c.restore();
    }
    // le cœur qui se brise en deux
    if (E.coeurPerdu) {
      var up = (ct - E.coeurPerdu.t0) / 0.8;
      if (up < 1) {
        var qp = placeCoeur(E.coeurPerdu.i);
        dessinerCoeur(c, qp.x, qp.y, 10, false);
        for (var cote = -1; cote <= 1; cote += 2) {
          c.save();
          c.globalAlpha = alpha * (1 - up);
          c.translate(qp.x + cote * 16 * up, qp.y + 34 * up * up - 8 * up);
          c.rotate(cote * 1.0 * up);
          c.beginPath();
          c.moveTo(0, -12); c.lineTo(-3 * cote, -5); c.lineTo(2 * cote, 1); c.lineTo(-2 * cote, 7); c.lineTo(0, 14);
          c.lineTo(cote * 16, 14); c.lineTo(cote * 16, -12);
          c.closePath();
          c.clip();
          dessinerCoeur(c, 0, 0, 10 * (1 + 0.35 * C.sortie(Math.min(1, up * 5))), true);
          c.restore();
        }
      } else E.coeurPerdu = null;
    }
    // la série de bonnes réponses
    if (E.serie >= 2) {
      var sx = HUD.x + 24 + Math.max(3, E.coeursMax) * 28 + 8, sy = HUD.y + 36;
      c.font = "700 12px " + POLICE;
      var texte = "SÉRIE ×" + E.serie, lt = c.measureText(texte).width;
      c.fillStyle = "rgba(255,140,40,0.2)";
      c.fillRect(sx - 4, sy - 3, lt + 30, 20);
      c.strokeStyle = "rgba(255,170,70,0.75)";
      c.lineWidth = 1;
      c.strokeRect(sx - 4, sy - 3, lt + 30, 20);
      flamme(c, sx + 8, sy + 13, 7);
      c.fillStyle = "#ffd08a";
      c.fillText(texte, sx + 20, sy + 12);
    }
    // la barre d'expérience
    var suivant = E.rangs[r + 1], bas = rang.xp, haut = suivant ? suivant.xp : bas;
    var k = suivant ? Math.max(0, Math.min(1, (E.xpAffiche - bas) / (haut - bas))) : 1;
    var b = placeBarre();
    c.fillStyle = "rgba(0,0,0,0.65)";
    c.fillRect(b.x, b.y, b.l, b.h);
    var g = c.createLinearGradient(b.x, 0, b.x + b.l, 0);
    g.addColorStop(0, "#4aa8f0"); g.addColorStop(1, "#d8f2ff");
    c.fillStyle = g;
    c.fillRect(b.x, b.y, b.l * k, b.h);
    c.fillStyle = "rgba(255,255,255,0.35)";
    c.fillRect(b.x, b.y, b.l * k, 2);
    if (E.xpAnim) lueur(c, b.x + b.l * k, b.y + b.h / 2, 22, "150,220,255", 0.9);
    c.strokeStyle = "rgba(226,184,96,0.6)";
    c.lineWidth = 1;
    c.strokeRect(b.x - 0.5, b.y - 0.5, b.l + 1, b.h + 1);
    c.font = "600 11px " + POLICE;
    c.fillStyle = "#cfe9ff";
    c.fillText(suivant ? Math.floor(E.xpAffiche - bas) + " / " + (haut - bas) + " XP" : Math.floor(E.xpAffiche) + " XP",
      b.x + b.l + 9, b.y + 8);
    dessinerChrono(c);
    if (E.boss) { dessinerBarreBoss(c); c.restore(); return; }
    // ----- le monstre -----
    var lm = 300, xm = LARG - 14 - lm, ym = 12;
    plaque(c, xm, ym, lm, 66);
    c.textAlign = "right";
    c.font = "700 15px " + POLICE;
    c.fillStyle = E.detruit || E.petrif > 0.5 ? "#b8b0a2" : "#f7e2b0";
    var nom = E.def.nom.toUpperCase();
    var ln = c.measureText(nom).width;
    c.save();
    if (ln > lm - 28) { c.translate(xm + lm - 14, 0); c.scale((lm - 28) / ln, 1); c.fillText(nom, 0, ym + 23); }
    else c.fillText(nom, xm + lm - 14, ym + 23);
    c.restore();
    var hb = { x: xm + 14, y: ym + 32, l: lm - 28, h: 10 };
    c.fillStyle = "rgba(0,0,0,0.65)";
    c.fillRect(hb.x, hb.y, hb.l, hb.h);
    c.fillStyle = "rgba(255,240,220,0.85)";
    c.fillRect(hb.x + hb.l * (1 - E.vieRetard), hb.y, hb.l * E.vieRetard, hb.h);
    var gv = c.createLinearGradient(0, hb.y, 0, hb.y + hb.h);
    gv.addColorStop(0, E.bonus ? "#ffe38a" : "#ff7a5c");
    gv.addColorStop(1, E.bonus ? "#b9821c" : "#9c1810");
    c.fillStyle = gv;
    c.fillRect(hb.x + hb.l * (1 - E.vieAffichee), hb.y, hb.l * E.vieAffichee, hb.h);
    c.strokeStyle = "rgba(226,184,96,0.6)";
    c.strokeRect(hb.x - 0.5, hb.y - 0.5, hb.l + 1, hb.h + 1);
    c.font = "600 11px " + POLICE;
    c.fillStyle = "#d9c7a6";
    c.fillText(E.detruit || E.petrif > 0.5 ? "Changé en pierre" : "Attaque : " + E.def.attaque, xm + lm - 14, ym + 58);
    if (E.manches > 1) pastillesManches(c, xm + 20, ym + 54, 13);
    c.restore();
  }

  // Les losanges des manches : gagnées (or), en cours (qui brille), à venir
  function pastillesManches(c, x, y, pas) {
    for (var k = 0; k < E.manches; k++) {
      var cx = x + k * pas, r = 4.6, type = typeManche(k, E.manches);
      c.beginPath();
      c.moveTo(cx, y - r); c.lineTo(cx + r, y); c.lineTo(cx, y + r); c.lineTo(cx - r, y);
      c.closePath();
      if (k < E.manche || E.detruit) {
        c.fillStyle = "#f2c043";
        c.fill();
      } else if (k === E.manche) {
        lueur(c, cx, y, 12, type === "esquive" ? "255,110,80" : "255,215,120", 0.5 + 0.3 * Math.sin(ct * 5));
        c.fillStyle = type === "esquive" ? "rgba(255,120,90,0.85)" : "rgba(255,226,150,0.85)";
        c.fill();
      } else {
        c.fillStyle = "rgba(0,0,0,0.5)";
        c.fill();
      }
      c.strokeStyle = "rgba(226,184,96,0.85)";
      c.lineWidth = 1;
      c.stroke();
    }
  }

  // La barre de vie d'un boss : en bas de l'arène, avec son nom et ses questions
  function dessinerBarreBoss(c) {
    var l = 560, x = (LARG - l) / 2, y = HAUT - 44, i;
    var pierre = E.detruit || E.petrif > 0.5;
    c.textAlign = "center";
    c.textBaseline = "alphabetic";
    c.font = "800 17px " + POLICE;
    remplirTexte(c, E.boss.toUpperCase(), LARG / 2, y - 9, 17, pierre ? "blanc" : "rouge", 4);
    c.fillStyle = "rgba(0,0,0,0.72)";
    c.fillRect(x - 3, y - 3, l + 6, 16);
    c.fillStyle = "rgba(255,240,220,0.85)";
    c.fillRect(x, y, l * E.vieRetard, 10);
    var gv = c.createLinearGradient(0, y, 0, y + 10);
    gv.addColorStop(0, "#ff8a64"); gv.addColorStop(0.5, "#d8321e"); gv.addColorStop(1, "#6e0c08");
    c.fillStyle = gv;
    c.fillRect(x, y, l * E.vieAffichee, 10);
    c.fillStyle = "rgba(255,255,255,0.3)";
    c.fillRect(x, y, l * E.vieAffichee, 2);
    var n = totalCoups();
    c.fillStyle = "rgba(20,10,6,0.9)";
    for (i = 1; i < n; i++) c.fillRect(x + l * i / n - 1, y - 2, 2, 14);
    c.strokeStyle = "rgba(226,184,96,0.9)";
    c.lineWidth = 1.5;
    c.strokeRect(x - 3.5, y - 3.5, l + 7, 17);
    for (var cote = -1; cote <= 1; cote += 2) {
      var bx = LARG / 2 + cote * (l / 2 + 12);
      c.fillStyle = "#e2b860";
      c.beginPath(); c.moveTo(bx, y - 4); c.lineTo(bx + 7, y + 5); c.lineTo(bx, y + 14); c.lineTo(bx - 7, y + 5); c.closePath(); c.fill();
    }
    c.font = "600 12px " + POLICE;
    c.fillStyle = "#ead6ae";
    c.fillText(pierre ? "Changé en pierre" : "Question " + Math.min(E.manche + 1, E.manches) + " / " + E.manches +
      " · " + NOMS_MANCHES[typeManche(Math.min(E.manche, E.manches - 1), E.manches)].toLowerCase(), LARG / 2, y + 30);
  }

  // Le sablier : le temps qui reste pour répondre (jeu.js le donne avec chrono())
  function dessinerChrono(c) {
    var ch = E.chrono;
    if (!ch || E.detruit || E.aTerre) return;
    var l = 112, h = 40, x = 491 - l / 2, y = 14;
    var urgent = ch.secondes <= 15;
    if (urgent) lueur(c, x + l / 2, y + h / 2, 70, "255,80,50", 0.25 + 0.2 * Math.sin(ct * 9));
    plaque(c, x, y, l, h);
    sablier(c, x + 24, y + 20, 12, ch.f);
    c.textAlign = "left";
    c.textBaseline = "middle";
    c.font = "700 19px " + POLICE;
    c.fillStyle = urgent ? (Math.sin(ct * 9) > 0 ? "#ff8a6a" : "#ffd2c2") : "#f7e2b0";
    c.fillText(ch.texte, x + 44, y + 21);
    c.textBaseline = "alphabetic";
  }
  function sablier(c, x, y, r, f) {
    f = Math.max(0, Math.min(1, f));
    c.save();
    c.translate(x, y);
    var w = r * 0.72;
    // le sable du haut (ce qui reste) et celui du bas (ce qui est passé)
    c.fillStyle = "#f0c868";
    var hh = r * 0.92 * f;
    if (hh > 0.3) { c.beginPath(); c.moveTo(0, -1); c.lineTo(-w * hh / r, -1 - hh); c.lineTo(w * hh / r, -1 - hh); c.closePath(); c.fill(); }
    var hb = r * 0.92 * (1 - f);
    if (hb > 0.3) {
      c.beginPath();
      c.moveTo(-w, r); c.lineTo(w, r); c.lineTo(w * (1 - hb / r), r - hb); c.lineTo(-w * (1 - hb / r), r - hb);
      c.closePath();
      c.fill();
    }
    if (f > 0 && f < 1) { c.fillRect(-0.7, -1, 1.4, r); }
    // le verre et les montants de bois
    c.strokeStyle = "#e2b860";
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(-w, -r); c.lineTo(w, -r); c.lineTo(r * 0.1, 0); c.lineTo(w, r); c.lineTo(-w, r); c.lineTo(-r * 0.1, 0);
    c.closePath();
    c.stroke();
    c.fillStyle = "#9b7226";
    c.fillRect(-w - 3, -r - 3, 2 * w + 6, 3);
    c.fillRect(-w - 3, r, 2 * w + 6, 3);
    c.restore();
  }

  // Une petite flamme (pour la série)
  function flamme(c, x, y, r) {
    var f = Math.sin(ct * 14) * 0.12;
    c.save();
    c.translate(x, y);
    c.beginPath();
    c.moveTo(0, 0);
    c.bezierCurveTo(-r, -r * 0.4, -r * 0.4, -r * (1.3 + f), 0, -r * (2.1 + f));
    c.bezierCurveTo(r * 0.4, -r * (1.3 - f), r, -r * 0.4, 0, 0);
    var g = c.createLinearGradient(0, 0, 0, -r * 2);
    g.addColorStop(0, "#ff5a1f"); g.addColorStop(0.6, "#ffb43c"); g.addColorStop(1, "#fff1a8");
    c.fillStyle = g;
    c.fill();
    c.restore();
  }

  // ---------------------------------------------------------------
  //  La bannière (« VICTOIRE ! », le nom du monstre...)
  // ---------------------------------------------------------------
  var LIGNES = { or: "236,196,104", rouge: "255,110,80", bleu: "160,210,255", vert: "150,255,140" };
  function dessinerBanniere(c) {
    var b = E.banniere;
    if (!b) return;
    var t = ct - b.t0;
    var entree = S(t, 0, 0.35), sortie = S(t, b.duree - 0.35, b.duree);
    var y = b.y || 178, ligne = LIGNES[b.couleur] || LIGNES.or;
    c.save();
    c.globalAlpha = 1 - sortie;
    var bandeH = (b.sous ? 96 : (b.taille <= 32 ? 52 : 78)) * C.sortie(entree);
    c.font = "800 " + b.taille + "px " + POLICE;
    var demi = Math.min(LARG / 2, Math.min(820, c.measureText(b.texte).width) / 2 + 150);
    var g = c.createLinearGradient(LARG / 2 - demi, 0, LARG / 2 + demi, 0);
    g.addColorStop(0, "rgba(6,4,2,0)");
    g.addColorStop(0.3, "rgba(6,4,2,0.62)");
    g.addColorStop(0.7, "rgba(6,4,2,0.62)");
    g.addColorStop(1, "rgba(6,4,2,0)");
    c.fillStyle = g;
    c.fillRect(LARG / 2 - demi, y - bandeH / 2, 2 * demi, bandeH);
    var l = (demi - 30) * C.sortie(S(t, 0.05, 0.5));
    c.fillStyle = "rgba(" + ligne + ",0.9)";
    c.fillRect(LARG / 2 - l, y - bandeH / 2, 2 * l, 1.5);
    c.fillRect(LARG / 2 - l, y + bandeH / 2 - 1.5, 2 * l, 1.5);
    c.translate(LARG / 2, y - (b.sous ? 10 : 0));
    var pop = Math.max(0.01, C.ressort(S(t, 0.03, 0.4))) * (1 + 0.05 * sortie);
    c.font = "800 " + b.taille + "px " + POLICE;
    var lt = c.measureText(b.texte).width, ajuste = Math.min(1, 820 / Math.max(1, lt));
    c.scale(pop * ajuste, pop * ajuste);
    c.textAlign = "center";
    c.textBaseline = "middle";
    lueur(c, 0, 0, 240, ligne, 0.22);
    remplirTexte(c, b.texte, 0, 0, b.taille, b.couleur, 7);
    // un reflet qui traverse le titre
    var xr = lerp(-lt / 2 - 80, lt / 2 + 80, S(t, 0.25, 0.85));
    c.save();
    c.globalCompositeOperation = "lighter";
    c.beginPath();
    c.rect(-lt / 2 - 10, -b.taille / 2, lt + 20, b.taille);
    c.clip();
    var gr = c.createLinearGradient(xr - 40, 0, xr + 40, 0);
    gr.addColorStop(0, "rgba(255,255,255,0)");
    gr.addColorStop(0.5, "rgba(255,255,255,0.45)");
    gr.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = gr;
    c.fillRect(xr - 40, -b.taille / 2, 80, b.taille);
    c.restore();
    if (b.sous) {
      c.font = "600 17px " + POLICE;
      c.lineWidth = 4;
      c.strokeStyle = "rgba(22,12,4,0.88)";
      c.strokeText(b.sous, 0, b.taille * 0.62 + 8);
      c.fillStyle = "#f3e6c8";
      c.fillText(b.sous, 0, b.taille * 0.62 + 8);
    }
    c.restore();
  }

  // ---------------------------------------------------------------
  //  Le sceau gagné : une pièce qui tourne, puis vole vers l'expérience
  // ---------------------------------------------------------------
  function dessinerSceau(c) {
    var s = E.sceau;
    if (!s) return;
    var u = ct - s.t0;
    if (u > s.duree) { E.sceau = null; return; }
    var x, y, r, cible = placeBarre();
    if (u < s.vol) {
      x = s.x0;
      y = s.y0 - 34 * C.sortie(S(u, 0, 0.5)) + 3 * Math.sin(u * 5);
      r = 30 * Math.max(0.01, C.ressort(S(u, 0, 0.35)));
    } else {
      var k = C.entree(S(u, s.vol, s.duree));
      x = lerp(s.x0, cible.x + cible.l * 0.6, k);
      y = lerp(s.y0 - 34, cible.y, k) - 70 * Math.sin(k * PI);
      r = lerp(30, 8, k);
    }
    var tourne = Math.cos(u * 6.5);
    c.save();
    c.translate(x, y);
    lueur(c, 0, 0, r * 3.2, s.bonus ? "255,214,110" : "255,190,130", 0.55);
    if (u < s.vol) {
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.font = "700 14px " + POLICE;
      c.globalAlpha = S(u, 0.15, 0.35) * (1 - S(u, s.vol - 0.15, s.vol));
      remplirTexte(c, s.bonus ? "SCEAU D'OR" : "SCEAU OBTENU", 0, -r - 20, 14, "or", 4);
      c.globalAlpha = 1;
    }
    c.scale(Math.max(0.1, Math.abs(tourne)), 1);
    var g = c.createRadialGradient(-r * 0.3, -r * 0.35, 1, 0, 0, r);
    if (s.bonus) { g.addColorStop(0, "#fff8d2"); g.addColorStop(0.5, "#f2c043"); g.addColorStop(1, "#8a5a10"); }
    else { g.addColorStop(0, "#ffe6c4"); g.addColorStop(0.5, "#c98a4a"); g.addColorStop(1, "#5e3412"); }
    c.fillStyle = g;
    disque(c, 0, 0, r);
    c.strokeStyle = s.bonus ? "#5a3a06" : "#3e220c";
    c.lineWidth = Math.max(1, r * 0.08);
    c.beginPath(); c.arc(0, 0, r, 0, PI2); c.stroke();
    c.beginPath(); c.arc(0, 0, r * 0.8, 0, PI2); c.stroke();
    if (Math.abs(tourne) > 0.3) {
      // la chouette d'Athéna, gravée sur la pièce
      c.fillStyle = c.strokeStyle;
      c.lineWidth = Math.max(0.8, r * 0.07);
      c.beginPath(); c.arc(-r * 0.24, -r * 0.12, r * 0.18, 0, PI2); c.stroke();
      c.beginPath(); c.arc(r * 0.24, -r * 0.12, r * 0.18, 0, PI2); c.stroke();
      c.beginPath(); c.moveTo(-r * 0.48, -r * 0.42); c.lineTo(0, -r * 0.24); c.lineTo(r * 0.48, -r * 0.42); c.stroke();
      c.beginPath(); c.moveTo(0, -r * 0.02); c.lineTo(-r * 0.07, r * 0.12); c.lineTo(r * 0.07, r * 0.12); c.closePath(); c.fill();
      c.beginPath(); c.moveTo(-r * 0.36, r * 0.12); c.quadraticCurveTo(0, r * 0.62, r * 0.36, r * 0.12); c.stroke();
    }
    c.restore();
  }

  // ===============================================================
  //  LA VICTOIRE : un coup héroïque, puis le monstre est changé en pierre
  // ===============================================================
  var TITRES_COUPS = { arc: "Tir parfait", pirouette: "Pirouette héroïque", fente: "Charge éclair", foudre: "Foudre d'Athéna" };

  // Le tir parfait : Talos bande son arc (le temps ralentit), la flèche part
  function coupArc() {
    var P = Heros.POSES;
    return {
      impact: 1.02, cri: "EN PLEIN CŒUR !",
      maj: function (u) {
        var p;
        if (u < 0.16) p = Heros.melanger(P.garde, P.garderArc, C.douce(S(u, 0, 0.16)));
        else if (u < 0.56) p = Heros.melanger(P.garderArc, P.bandeArc, C.douce(S(u, 0.16, 0.56)));
        else if (u < 0.7) { p = copie(P.bandeArc); p.eclat = 0.75 + 0.25 * Math.sin(ct * 40); }
        else if (u < 1.15) p = Heros.melanger(P.bandeArc, P.lacher, C.sortie(S(u, 0.7, 0.76)));
        else p = Heros.melanger(P.lacher, P.garderArc, C.douce(S(u, 1.15, 1.45)));
        E.pose = p;
        E.fleche = u < 0.7;
        E.tx = 0; E.ty = 0;
        if (u > 0.2 && u < 0.7 && Math.random() < 0.5) {
          var m = pointsTalos().main;
          particule({ type: "etoile", x: m.x + hasard(-10, 60), y: m.y + hasard(-20, 20), vx: 0, vy: -20, vie: 0.4, taille: hasard(1.5, 3), rgb: "255,225,150" });
        }
      },
      evenements: [
        [0.08, function () { var m = pointsTalos().main; gerbe(m.x, m.y, 14, "255,220,140", 120, 0.4, 2, "etoile"); }],
        [0.16, function () { Sons.jouer("corde"); E.zoomCible = 1.14; E.foyerCible = { x: 400, y: 215 }; E.cinemaCible = 1; E.assombriCible = 0.35; }],
        [0.6, function () { ralentir(0.3); }],
        [0.7, function () {
          Sons.jouer("fleche");
          ralentir(0.45);
          var m = pointsTalos().main, c = pointsMonstre().centre;
          E.foyerCible = { x: 560, y: 210 };
          projectile({ type: "fleche", x0: m.x + 14, y0: m.y, x1: c.x, y1: c.y, h: 10, duree: 0.32, rgb: "255,220,130", largeur: 7 });
          anneau(m.x + 10, m.y, 4, 64, 0.35, "255,230,170", 4);
          gerbe(m.x + 14, m.y, 12, "255,220,140", 220, 0.35, 2);
        }],
        [1.02, function () { ralentir(1); E.zoomCible = 1; E.foyerCible = null; E.cinemaCible = 0; E.assombriCible = 0; }]
      ]
    };
  }

  // La pirouette héroïque : deux saltos en l'air, puis la lance qui s'abat
  function coupPirouette() {
    var P = Heros.POSES;
    var XA = MONSTRE_X - 150 - TALOS_X;
    return {
      impact: 0.84, cri: "COUP HÉROÏQUE !",
      maj: function (u) {
        var p, k;
        if (u < 0.18) { p = Heros.melanger(P.garde, P.accroupi, C.douce(S(u, 0, 0.18))); E.tx = 0; E.ty = 0; }
        else if (u < 0.62) {
          k = S(u, 0.18, 0.62);
          E.tx = XA * 0.85 * C.douce(k);
          E.ty = -200 * Math.sin(k * PI * 0.8);
          p = copie(P.vrille);
          p.rot = 2 * PI2 * C.douce(k);
          E.vent = 1;
          if (ct - (E.dernierFantome || 0) > 0.05) { laisserFantome(); E.dernierFantome = ct; }
          if (ct - (E.derniereEntaille || 0) > 0.05) {
            E.derniereEntaille = ct;
            var cb = Heros.points(p, optionsTalos(TALOS_X + E.tx, SOL + E.ty)).bassin;
            entaille(cb.x, cb.y - 10, 92, p.rot - PI * 0.5 - 1.5, p.rot - PI * 0.5, "255,226,150", 0.16);
          }
        } else if (u < 0.84) {
          k = S(u, 0.62, 0.84);
          E.tx = XA * (0.85 + 0.15 * k);
          E.ty = -118 * (1 - C.entree(k));
          p = Heros.melanger(P.vrille, P.frappe, C.sortie(S(u, 0.62, 0.7)));
          if (ct - (E.dernierFantome || 0) > 0.03) { laisserFantome(); E.dernierFantome = ct; }
        } else if (u < 1.25) {
          E.tx = XA; E.ty = 0;
          p = Heros.melanger(P.frappe, P.accroupi, C.douce(S(u, 0.84, 1.1)));
        } else if (u < 1.75) {
          k = S(u, 1.25, 1.75);
          E.tx = XA * (1 - C.douce(k));
          E.ty = -120 * 4 * k * (1 - k);
          p = copie(P.vrille);
          p.rot = -PI2 * C.douce(k);
        } else {
          E.tx = 0; E.ty = 0;
          if (u < 1.85) p = Heros.melanger(P.vrille, P.accroupi, C.sortie(S(u, 1.75, 1.82)));
          else p = Heros.melanger(P.accroupi, P.garde, C.douce(S(u, 1.85, 2.1)));
        }
        E.pose = p;
        if (u > 0.64 && u < 0.9) { var pt = pointsTalos().pointe; E.trainee.push({ x: pt.x, y: pt.y, t: ct }); }
      },
      evenements: [
        [0.15, function () { Sons.jouer("vent"); nuageDePoussiere(TALOS_X, SOL, 10, 30); }],
        [0.19, function () {
          Sons.jouer("tourbillon");
          E.cinemaCible = 1; E.zoomCible = 1.08; E.foyerCible = { x: 520, y: 200 };
          anneau(TALOS_X, SOL, 8, 110, 0.4, "255,230,170", 4, 0.25);
        }],
        [0.62, function () { Sons.jouer("vent"); ralentir(0.35); }],
        [0.76, function () { ralentir(1); }],
        [0.85, function () {
          var x = pointsTalos().pointe.x, c = pointsMonstre().centre;
          anneau(x, SOL, 10, 280, 0.6, "255,220,150", 9, 0.22);
          nuageDePoussiere(x, SOL, 26, 90);
          entaille(c.x - 10, c.y - 30, 120, -2.3, 0.5, "255,230,170", 0.38);
          var n = E.reduit ? 4 : 12;
          for (var i = 0; i < n; i++) {
            particule({ type: "eclat", x: x + hasard(-30, 30), y: SOL - 2, vx: hasard(-200, 200), vy: hasard(-380, -120), g: 980,
              vie: hasard(0.7, 1.2), taille: hasard(4, 8), couleur: "#a8977a", rot: hasard(0, 6), vrot: hasard(-12, 12), sol: hasard(2, 20), frein: 0.4 });
          }
        }],
        [1.2, function () { E.cinemaCible = 0; E.zoomCible = 1; E.foyerCible = null; }],
        [1.25, function () { Sons.jouer("vent"); }],
        [1.75, function () { Sons.jouer("pas"); nuageDePoussiere(TALOS_X, SOL, 12, 40); }]
      ]
    };
  }

  // La charge éclair : Talos fonce, lance en avant, plus vite que son ombre
  function coupFente() {
    var P = Heros.POSES;
    var XA = MONSTRE_X - 205 - TALOS_X;
    return {
      impact: 0.44, cri: "TRANSPERCÉ !",
      maj: function (u) {
        var p, k;
        E.ty = 0;
        if (u < 0.16) { E.tx = -16 * C.douce(S(u, 0, 0.16)); p = Heros.melanger(P.garde, P.elan, C.douce(S(u, 0, 0.16))); }
        else if (u < 0.4) {
          k = C.entree(S(u, 0.16, 0.4));
          E.tx = -16 + (XA + 16) * k;
          p = Heros.melanger(P.elan, P.fente, C.sortie(S(u, 0.16, 0.34)));
          E.vent = 1;
          if (ct - (E.dernierFantome || 0) > 0.022) { laisserFantome(); E.dernierFantome = ct; }
          if (!E.reduit) {
            for (var i = 0; i < 2; i++) {
              particule({ type: "trait", x: TALOS_X + E.tx + hasard(-120, 40), y: hasard(SOL - 200, SOL - 10), vx: -900, vy: 0,
                vie: 0.18, taille: hasard(40, 110), rgb: "255,235,190" });
            }
          }
        } else if (u < 0.9) { E.tx = XA; p = P.fente; }
        else if (u < 1.35) {
          k = S(u, 0.9, 1.35);
          E.tx = XA * (1 - C.douce(k));
          E.ty = -46 * 4 * k * (1 - k);
          p = Heros.melanger(P.fente, P.garde, C.douce(k));
        } else { E.tx = 0; p = P.garde; }
        E.pose = p;
        if (u > 0.16 && u < 0.6) { var pt = pointsTalos().pointe; E.trainee.push({ x: pt.x, y: pt.y, t: ct }); }
      },
      evenements: [
        [0.01, function () {
          var pt = pointsTalos().pointe;
          gerbe(pt.x, pt.y, 12, "255,230,160", 90, 0.45, 2, "etoile");
          E.zoomCible = 1.06; E.foyerCible = { x: 470, y: 210 };
        }],
        [0.16, function () { Sons.jouer("vent"); nuageDePoussiere(TALOS_X - 10, SOL, 14, 30); E.cinemaCible = 1; }],
        [0.45, function () { var c = pointsMonstre().centre; entaille(c.x - 160, c.y + 40, 190, -0.75, 0.05, "255,240,200", 0.3); ralentir(0.4); }],
        [0.62, function () { ralentir(1); }],
        [0.95, function () { E.cinemaCible = 0; E.zoomCible = 1; E.foyerCible = null; Sons.jouer("vent"); }],
        [1.35, function () { Sons.jouer("pas"); }]
      ]
    };
  }

  // La foudre d'Athéna (après 3 bonnes réponses d'affilée) : Talos lève sa
  // lance vers le ciel, et la foudre s'abat sur le monstre
  function coupFoudre() {
    var P = Heros.POSES;
    return {
      impact: 1.0, cri: "FOUDROYÉ !",
      maj: function (u) {
        var p;
        if (u < 0.3) p = Heros.melanger(P.garde, P.appel, C.douce(S(u, 0, 0.3)));
        else if (u < 1.3) { p = copie(P.appel); p.y = -3 * S(u, 0.3, 0.9); }
        else p = Heros.melanger(P.appel, P.garde, C.douce(S(u, 1.3, 1.6)));
        E.pose = p;
        E.tx = 0; E.ty = 0;
        E.vent = 0.3 + 0.7 * S(u, 0.3, 0.9) * (1 - S(u, 1.2, 1.5));
        if (u > 0.3 && u < 0.95 && Math.random() < 0.7) {
          var pt = pointsTalos().pointe, an = hasard(0, PI2), d = hasard(30, 70);
          particule({ type: "etincelle", x: pt.x + Math.cos(an) * d, y: pt.y + Math.sin(an) * d, vx: -Math.cos(an) * d * 4, vy: -Math.sin(an) * d * 4,
            vie: 0.25, taille: 2, rgb: "180,215,255" });
        }
      },
      evenements: [
        [0.05, function () { E.assombriCible = 0.65; E.cinemaCible = 1; Sons.jouer("vent"); }],
        [0.3, function () { banniere("FOUDRE D'ATHÉNA", "", "bleu", 1.1, 32); Sons.jouer("rayon"); }],
        [0.5, function () { var pt = pointsTalos().pointe; eclair(pt.x + 30, pt.y - 50, pt.x, pt.y, 0.12, 2); }],
        [0.62, function () { var pt = pointsTalos().pointe; eclair(pt.x - 30, pt.y - 60, pt.x, pt.y, 0.12, 2); }],
        [0.82, function () {
          var pt = pointsTalos().pointe;
          eclair(pt.x + hasard(-40, 40), -40, pt.x, pt.y, 0.32, 7);
          eclairer("200,225,255", 0.3, 0.2);
          Sons.jouer("foudre");
          secouer(6, 0.2);
          anneau(pt.x, pt.y, 4, 70, 0.3, "200,225,255", 5);
        }],
        [1.0, function () {
          var c = pointsMonstre().centre, pt = pointsTalos().pointe;
          eclair(c.x + hasard(-30, 30), -40, c.x, c.y, 0.55, 12);
          eclair(pt.x, pt.y, c.x, c.y, 0.4, 6);
          eclairer("220,235,255", 0.5, 0.3);
          gerbe(c.x, c.y, 40, "190,220,255", 520, 0.7, 3);
        }],
        [1.25, function () { E.assombriCible = 0; E.cinemaCible = 0; }]
      ]
    };
  }

  // Le coup porte
  function impact(cri) {
    var c = pointsMonstre().centre;
    E.mFlash = 1;
    E.vie = 0;
    E.vieT0 = ct;
    Sons.jouer("impact");
    geler(0.09);
    secouer(15, 0.45);
    eclairer("255,245,220", 0.42, 0.22);
    gerbe(c.x, c.y, 44, "255,226,150", 560, 0.6, 3);
    gerbe(c.x, c.y, 16, E.def.rgb, 300, 0.8, 4, "braise", 300);
    anneau(c.x, c.y, 8, 160, 0.42, "255,236,190", 10);
    anneau(c.x, c.y, 4, 95, 0.3, "255,255,255", 4);
    texteFlottant(cri, c.x - 20, c.y - 50, "or", 30);
  }

  // Un coup qui blesse le monstre sans le vaincre (manche d'attaque)
  function blesser(cri, vie) {
    var c = pointsMonstre().centre;
    E.mFlash = 1;
    E.vie = vie;
    E.vieT0 = ct;
    Sons.jouer("impact");
    geler(0.06);
    secouer(9, 0.32);
    eclairer("255,245,220", 0.25, 0.18);
    gerbe(c.x, c.y, 26, "255,226,150", 420, 0.5, 2.6);
    gerbe(c.x, c.y, 10, E.def.rgb, 240, 0.7, 3.5, "braise", 260);
    anneau(c.x, c.y, 6, 120, 0.36, "255,236,190", 7);
    texteFlottant(cri, c.x - 20, c.y - 50, "or", 28);
  }

  // Une flèche rapide (contre les monstres qui volent, à la manche d'attaque)
  function coupRapide() {
    var P = Heros.POSES;
    return {
      impact: 0.62, cri: "EN PLEIN VOL !", duree: 1.05,
      maj: function (u) {
        var p;
        if (u < 0.12) p = Heros.melanger(P.garde, P.garderArc, C.douce(S(u, 0, 0.12)));
        else if (u < 0.32) p = Heros.melanger(P.garderArc, P.bandeArc, C.douce(S(u, 0.12, 0.32)));
        else if (u < 0.36) p = copie(P.bandeArc);
        else if (u < 0.75) p = Heros.melanger(P.bandeArc, P.lacher, C.sortie(S(u, 0.36, 0.42)));
        else p = Heros.melanger(P.lacher, P.garde, C.douce(S(u, 0.75, 1.0)));
        E.pose = p;
        E.fleche = u < 0.36;
        E.tx = 0; E.ty = 0;
      },
      evenements: [
        [0.12, function () { Sons.jouer("corde"); }],
        [0.36, function () {
          Sons.jouer("fleche");
          var m = pointsTalos().main, c = pointsMonstre().centre;
          projectile({ type: "fleche", x0: m.x + 14, y0: m.y, x1: c.x, y1: c.y, h: 6, duree: 0.26, rgb: "255,220,130", largeur: 6 });
          gerbe(m.x + 14, m.y, 8, "255,220,140", 180, 0.3, 2);
        }]
      ]
    };
  }

  // Une bonne réponse qui ne finit pas le combat : à la manche d'attaque,
  // Talos frappe ; à la manche d'esquive, il esquive l'attaque du monstre.
  // infos = { serie } ; fin() est appelée quand l'animation est finie.
  function manche(infos, fin) {
    if (!E) return;
    infos = infos || {};
    finirIntro();
    if (typeof infos.serie === "number") E.serie = infos.serie;
    var type = typeManche(E.manche, E.manches);
    var suite = function () {
      E.manche = Math.min(E.manches - 1, E.manche + 1);
      if (fin) fin();
    };
    if (type === "esquive") esquiver(suite);
    else frapper(suite);
  }

  // Talos frappe (charge éclair ou pirouette ; une flèche contre ceux qui volent)
  function frapper(fin) {
    E.menace = null;
    var nom = E.def.vole ? "rapide" : (E.dernierCoupManche === "fente" ? "pirouette" : "fente");
    E.dernierCoupManche = nom;
    var coup = nom === "rapide" ? coupRapide() : (nom === "pirouette" ? coupPirouette() : coupFente());
    var T = coup.impact, vie = 1 - coupsAvant(E.manche + 1) / totalCoups();
    var duree = nom === "rapide" ? coup.duree : (nom === "pirouette" ? 2.15 : 1.5);
    var cri = nom === "rapide" ? "EN PLEIN VOL !" : (nom === "pirouette" ? "COUP HÉROÏQUE !" : "TOUCHÉ !");
    var evts = [[T, function () { blesser(cri, vie); }]].concat(coup.evenements);
    sequence("frappe", duree, function (u) {
      coup.maj(u);
      if (!E.detruit) {
        if (u < T) { E.mAction = "repos"; E.mK = 0; }
        else { E.mAction = "touche"; E.mK = S(u - T, 0, 0.8); }
      }
    }, evts, function () {
      E.mAction = "repos"; E.mK = 0;
      if (fin) fin();
    }, true);
  }

  // Talos esquive : le monstre attaque l'endroit où il se tenait, et Talos
  // s'en échappe d'un salto arrière, au ralenti, puis revient en garde.
  function esquiver(fin) {
    var P = Heros.POSES;
    var m = E.menace || { att: (ATTAQUES[E.def.genre] || ATTAQUES.charge)(), u0: 0 };
    E.menace = null;
    var att = m.att, u0 = m.u0;
    var T = Math.max(0.3, att.impact - u0), D = Math.max(0.12, T - 0.16);
    var pt = pointsTalos();
    E.cibleFixe = { centre: pt.centre, tete: pt.tete };
    E.porteeFixe = portee();
    var evts = att.evenements.map(function (e) { return [Math.max(0, e[0] - u0), e[1]]; });
    evts.push([D, function () { Sons.jouer("esquive"); ralentir(0.35); E.cinemaCible = 1; E.zoomCible = 1.05; E.foyerCible = { x: 360, y: 220 }; }]);
    evts.push([D + 0.3, function () { ralentir(1); }]);
    evts.push([T, function () {
      var q = E.cibleFixe.centre;
      texteFlottant("ESQUIVÉ !", q.x + 30, q.y - 60, "bleu", 30);
      anneau(q.x, q.y, 6, 100, 0.4, "160,210,255", 5);
      gerbe(q.x, q.y, 16, "190,225,255", 260, 0.45, 2, "etoile");
    }]);
    evts.push([D + 0.75, function () { E.cinemaCible = 0; E.zoomCible = 1; E.foyerCible = null; Sons.jouer("pas"); nuageDePoussiere(TALOS_X - 130, SOL, 10, 30); }]);
    var duree = Math.max(att.duree - u0, D + 1.15);
    sequence("esquive", duree, function (u) {
      att.maj(u + u0);
      // les effets de l'attaque (le feu, la pierre) n'atteignent pas Talos
      if (E.teinteT && E.teinteT.duree === 10) E.teinteT = null;
      var p, k;
      if (u < D) {
        p = Heros.melanger(P.garde, P.accroupi, C.douce(S(u, D - 0.15, D)));
        E.tx = 0; E.ty = 0;
      } else if (u < D + 0.55) {
        k = S(u, D, D + 0.55);
        E.tx = -130 * C.sortie(k);
        E.ty = -170 * Math.sin(PI * k);
        p = copie(P.vrille);
        p.rot = -PI2 * C.douce(k);
        E.vent = 1;
        if (ct - (E.dernierFantome || 0) > 0.04) { laisserFantome("160,210,255"); E.dernierFantome = ct; }
      } else if (u < D + 0.75) {
        E.tx = -130; E.ty = 0;
        p = Heros.melanger(P.vrille, P.accroupi, C.sortie(S(u, D + 0.55, D + 0.62)));
      } else if (u < D + 1.1) {
        k = S(u, D + 0.75, D + 1.1);
        E.tx = -130 * (1 - C.douce(k));
        E.ty = -40 * Math.sin(PI * k);
        p = Heros.melanger(P.accroupi, P.garde, C.douce(k));
      } else {
        E.tx = 0; E.ty = 0;
        p = P.garde;
      }
      E.pose = p;
    }, evts, function () {
      E.cibleFixe = null; E.porteeFixe = null; E.rayon = null;
      E.mx = 0; E.my = 0;
      if (fin) fin();
    }, true);
  }

  // Le monstre se fige, et la pierre monte de ses pieds à sa tête
  function petrifier() {
    if (!E || E.detruit) return;
    E.mFlash = 0;
    E.mAction = "touche";
    E.mK = 0.5;
    preparerCalqueMonstre();
    E.tFige = ct;
    E.mFige = true;
    construirePierre();
    E.petrifT0 = ct;
    Sons.jouer("pierre");
    var c = pointsMonstre().centre;
    texteFlottant("PÉTRIFIÉ !", c.x, c.y + 30, "blanc", 26);
  }

  // La statue se fissure
  function fissurer() {
    if (!E || E.detruit || !calqueP) return;
    var c = E.def.points(animMonstre()).centre;
    var lignes = [], n = E.reduit ? 5 : 9;
    for (var i = 0; i < n; i++) {
      var ang = i / n * PI2 + hasard(-0.3, 0.3), x = c.x, y = c.y, l = [{ x: x, y: y }];
      var longueur = hasard(70, 170);
      for (var d = 0; d < longueur; d += 13) {
        ang += hasard(-0.55, 0.55);
        x += Math.cos(ang) * 13;
        y += Math.sin(ang) * 13;
        l.push({ x: x, y: y });
      }
      lignes.push(l);
    }
    E.fissures = { lignes: lignes, t0: ct, duree: 0.28 };
    Sons.jouer("pierre");
    secouer(4, 0.3);
    var m = pointsMonstre().centre;
    gerbe(m.x, m.y, 10, "200,190,170", 160, 0.5, 2.5);
  }

  // ... et s'effondre en mille morceaux (chaque morceau a la couleur de la statue)
  function effondrer() {
    if (!E || E.detruit) return;
    var source = calqueP || calqueM, w = source.c.width, h = source.c.height, d = null;
    try { d = source.x.getImageData(0, 0, w, h).data; } catch (e) { d = null; }
    var s = echelleMonstre(), centre = mondeMonstre({ x: 0, y: -E.def.hauteur * 0.5 });
    function opaque(lx, ly, pas) {
      var px = Math.floor((lx + ORIGINE_X + pas / 2) * R), py = Math.floor((ly + ORIGINE_Y + pas / 2) * R);
      if (px < 0 || py < 0 || px >= w || py >= h) return -1;
      var i = (py * w + px) * 4;
      return d[i + 3] >= 120 ? i : -1;
    }
    var lx, ly, pas = E.reduit ? 18 : 12, n = 0;
    if (d) {
      // on compte d'abord les morceaux, pour ne pas en faire trop
      for (ly = -ORIGINE_Y; ly < 40; ly += pas) for (lx = -ORIGINE_X; lx < 1100 - ORIGINE_X; lx += pas) if (opaque(lx, ly, pas) >= 0) n++;
      var max = E.reduit ? 220 : 620;
      if (n > max) pas = Math.ceil(pas * Math.sqrt(n / max));
      for (ly = -ORIGINE_Y; ly < 40; ly += pas) {
        for (lx = -ORIGINE_X; lx < 1100 - ORIGINE_X; lx += pas) {
          var i = opaque(lx, ly, pas);
          if (i < 0) continue;
          var q = mondeMonstre({ x: lx + pas / 2, y: ly + pas / 2 });
          var dx = q.x - centre.x, dy = q.y - centre.y;
          particule({ type: "eclat", x: q.x, y: q.y, vx: dx * hasard(1.2, 2.6) + hasard(-40, 40), vy: dy * hasard(0.6, 1.6) - hasard(60, 220),
            g: 980, vie: hasard(1.6, 2.6), taille: pas * s * hasard(1.15, 1.6), couleur: "rgb(" + d[i] + "," + d[i + 1] + "," + d[i + 2] + ")",
            rot: hasard(0, 6), vrot: hasard(-9, 9), sol: hasard(2, 30), frein: 0.5 });
        }
      }
    } else {
      for (var k = 0; k < 160; k++) {
        particule({ type: "eclat", x: centre.x + hasard(-80, 80), y: centre.y + hasard(-110, 110), vx: hasard(-220, 220), vy: hasard(-260, -40),
          g: 980, vie: hasard(1.6, 2.6), taille: hasard(6, 14), couleur: "#8f877a", rot: hasard(0, 6), vrot: hasard(-9, 9), sol: hasard(2, 30), frein: 0.5 });
      }
    }
    E.detruit = true;
    Sons.jouer("eboulement");
    secouer(11, 0.55);
    nuageDePoussiere(MONSTRE_X + E.mx, SOL, 40, 120);
    anneau(MONSTRE_X + E.mx, SOL, 20, 300, 0.8, "220,205,180", 7, 0.22);
    eclairer("255,240,220", 0.25, 0.25);
  }

  // Une bonne réponse redonne un cœur à Talos
  function soigner() {
    if (E.coeurs >= E.coeursMax) return;
    E.coeurGagne = { i: E.coeurs, t0: ct };
    E.coeurs += 1;
    Sons.jouer("soin");
    var pt = pointsTalos(), q = placeCoeur(E.coeurGagne.i);
    texteFlottant("+1", pt.tete.x, pt.tete.y - 34, "vert", 26, true);
    gerbe(pt.centre.x, pt.centre.y, 18, "150,255,160", 110, 0.8, 3, "etoile", -80);
    gerbe(q.x, q.y, 10, "255,150,160", 80, 0.5, 2, "etoile");
  }

  // L'expérience gagnée remplit la barre (et peut faire monter de rang)
  function gagnerXP(infos) {
    var de = E.xpAffiche, a = typeof infos.xpApres === "number" ? infos.xpApres : de;
    if (a <= de) return;
    E.xpAnim = { de: de, a: a, t0: ct, duree: 1.1 };
    var b = placeBarre();
    texteFlottant("+" + Math.round(a - de) + " XP", b.x + b.l * 0.5, b.y + 42, "bleu", 24);
    (infos.details || []).forEach(function (texte, i) {
      E.textes.push({ texte: texte, x: b.x + b.l * 0.5 + 10, y: b.y + 72 + i * 22, couleur: "blanc", taille: 15,
        t0: ct + 0.25 * (i + 1), duree: 1.6, coeur: false });
    });
  }

  function nouveauRang(r) {
    var rang = E.rangs[r];
    if (!rang) return;
    Sons.jouer("niveau");
    banniere("NOUVEAU RANG !", rang.titre, "bleu", 2.2, 44);
    var pt = pointsTalos();
    gerbe(pt.centre.x, pt.centre.y, 60, "160,215,255", 280, 1.1, 3, "etoile", 60);
    anneau(pt.centre.x, pt.centre.y, 10, 190, 0.8, "160,215,255", 8);
    anneau(TALOS_X, SOL, 10, 230, 0.9, "160,215,255", 5, 0.22);
    eclairer("160,215,255", 0.45, 0.4);
    if (rang.coeurs > E.coeursMax) {
      var plus = rang.coeurs - E.coeursMax;
      E.coeursMax = rang.coeurs;
      E.coeurs = Math.min(E.coeursMax, E.coeurs + plus);
      E.coeurGagne = { i: E.coeurs - 1, t0: ct };
      var q = placeCoeur(E.coeurs - 1);
      texteFlottant("+1 cœur", q.x + 34, q.y + 26, "vert", 16);
    }
  }

  // infos = { coup ("arc", "pirouette", "fente" ou "foudre"), xpApres, coeurs, coeursMax,
  //           soin (un cœur regagné ?), serie, sansFaute, details (textes des bonus) }
  function victoire(infos, fin) {
    if (!E) return;
    infos = infos || {};
    finirIntro();
    E.menace = null;
    E.chrono = null;
    var fabriques = { arc: coupArc, pirouette: coupPirouette, fente: coupFente, foudre: coupFoudre };
    var nomCoup = fabriques[infos.coup] ? infos.coup : "pirouette";
    var coup = fabriques[nomCoup]();
    var T = coup.impact, P = Heros.POSES;
    if (typeof infos.serie === "number") E.serie = infos.serie;
    var evts = [[T, function () { impact(coup.cri); }]].concat(coup.evenements);
    evts.push([T + 0.38, petrifier]);
    evts.push([T + 1.0, fissurer]);
    evts.push([T + 1.32, effondrer]);
    evts.push([T + 1.5, function () {
      E.victorieux = true;
      E.arcVictoire = nomCoup === "arc";
      Sons.jouer("victoire");
      banniere(E.boss ? "BOSS VAINCU !" : "VICTOIRE !", TITRES_COUPS[nomCoup] + (infos.sansFaute ? " · sans aucune erreur" : ""), "or", 2.1, 54);
      var pt = pointsTalos();
      gerbe(pt.centre.x, pt.centre.y - 20, 40, "255,215,120", 260, 1.1, 3, "etoile", 120);
      anneau(TALOS_X, SOL, 10, 220, 0.8, "255,215,120", 6, 0.22);
    }]);
    evts.push([T + 1.65, function () {
      if (infos.nouveauSceau === false) return;   // stèle déjà gagnée une autre fois : pas de nouveau sceau
      Sons.jouer("sceau");
      E.sceau = { t0: ct, x0: MONSTRE_X, y0: SOL - 150, vol: 0.6, duree: 1.0, bonus: E.bonus };
    }]);
    evts.push([T + 1.95, function () { if (infos.soin) soigner(); }]);
    evts.push([T + 2.6, function () { gagnerXP(infos); }]);
    sequence("victoire", T + 3.9, function (u) {
      if (u < T + 1.5) coup.maj(u);
      else {
        var p = Heros.melanger(nomCoup === "arc" ? P.garderArc : P.garde, nomCoup === "arc" ? P.victoireArc : P.victoire,
          C.ressort(S(u, T + 1.5, T + 1.85)));
        p.y = -2 * Math.sin(ct * 2.2);
        E.pose = p;
        E.tx = 0; E.ty = 0; E.vent = 0.5;
      }
      // le monstre recule sous le coup, puis se fige
      if (!E.mFige && !E.detruit) {
        if (u < T) { E.mAction = "repos"; E.mK = 0; }
        else { E.mAction = "touche"; E.mK = Math.min(0.5, (u - T) / 0.7); }
      }
      if (E.petrifT0 !== undefined) E.petrif = C.douce(S(ct - E.petrifT0, 0, 0.62));
      if (E.petrif > 0 && E.petrif < 1 && !E.detruit && Math.random() < 0.6) {
        var yl = SOL + E.my + lerp(40, -(E.def.hauteur + 110), E.petrif) * echelleMonstre();
        particule({ type: "poussiere", x: MONSTRE_X + E.mx + hasard(-90, 90), y: yl, vx: hasard(-20, 20), vy: hasard(-30, -5),
          vie: 0.6, taille: hasard(4, 9), rgb: "200,195,185", g: -10 });
      }
      // les monstres volants, changés en pierre, tombent
      if (E.def.vole && E.mFige && !E.detruit) {
        var tf = u - (T + 0.95);
        if (tf > 0) E.my = 520 * tf * tf;
      }
    }, evts, function () {
      if (typeof infos.coeurs === "number") E.coeurs = infos.coeurs;
      if (typeof infos.coeursMax === "number") E.coeursMax = infos.coeursMax;
      if (fin) fin();
    }, true);
  }

  // ===============================================================
  //  LA MAUVAISE RÉPONSE : le monstre attaque, Talos perd un cœur
  // ===============================================================
  // Chaque genre d'attaque : l'instant où le coup touche Talos (impact),
  // la durée totale, le recul de Talos, et l'animation.
  var ATTAQUES = {
    // Le Minotaure fonce, cornes en avant
    charge: function () {
      var dist = MONSTRE_X - TALOS_X - 175;
      return {
        impact: 0.55, duree: 1.15, recul: 60,
        maj: function (u) {
          E.mAction = "attaque"; E.mK = S(u, 0, 1.0);
          if (u < 0.2) E.mx = 24 * C.douce(S(u, 0, 0.2));
          else if (u < 0.55) E.mx = 24 - (dist + 24) * C.entree(S(u, 0.2, 0.55));
          else if (u < 0.7) E.mx = -dist;
          else E.mx = -dist * (1 - C.douce(S(u, 0.7, 1.0)));
          if (u > 0.2 && u < 0.6 && Math.random() < 0.7) {
            particule({ type: "poussiere", x: MONSTRE_X + E.mx + hasard(-20, 50), y: SOL - 2, vx: hasard(20, 80), vy: hasard(-30, -5),
              vie: 0.7, taille: hasard(8, 16), rgb: "190,175,150", g: -10 });
          }
        },
        evenements: [[0.02, function () { Sons.jouer("rugissement"); }], [0.2, function () { Sons.jouer("galop"); }], [0.4, function () { Sons.jouer("galop"); }]]
      };
    },
    // Le Cyclope lance un rocher
    rocher: function () {
      return {
        impact: 0.8, duree: 1.2, recul: 50,
        maj: function (u) { E.mAction = "attaque"; E.mK = S(u, 0, 1.0); },
        evenements: [
          [0.05, function () { Sons.jouer("rugissement"); }],
          [0.42, function () {
            Sons.jouer("lancer");
            var m = pointsMonstre().main, c = cibleTalos();
            projectile({ type: "rocher", x0: m.x, y0: m.y, x1: c.x + 10, y1: c.y, h: 90, duree: 0.38, r: 30, vrot: -9, traine: false });
          }],
          [0.8, function () {
            var c = cibleTalos(), n = E.reduit ? 5 : 14;
            for (var k = 0; k < n; k++) {
              particule({ type: "eclat", x: c.x + hasard(-14, 14), y: c.y + hasard(-14, 14), vx: hasard(-260, 140), vy: hasard(-300, -60), g: 900,
                vie: hasard(0.8, 1.4), taille: hasard(5, 11), couleur: k % 2 ? "#7a7262" : "#a59a88", rot: hasard(0, 6), vrot: hasard(-10, 10), sol: hasard(2, 20), frein: 0.5 });
            }
            nuageDePoussiere(c.x, c.y + 40, 14, 30);
          }]
        ]
      };
    },
    // L'Hydre : une tête jaillit et mord
    morsure: function () {
      return {
        impact: 0.61, duree: 1.45, recul: 40,
        maj: function (u) { E.mAction = "attaque"; E.mK = S(u, 0, 1.3); },
        evenements: [[0.05, function () { Sons.jouer("sifflement"); }], [0.36, function () { Sons.jouer("vent"); }]]
      };
    },
    // Méduse : son regard change Talos en pierre... un instant
    regard: function () {
      return {
        impact: 0.62, duree: 1.45, recul: 24, sansTeinte: true,
        maj: function (u) {
          E.mAction = "attaque"; E.mK = S(u, 0, 1.2);
          var f = S(u, 0.4, 0.5) * (1 - S(u, 0.95, 1.08));
          E.rayon = f > 0 ? { force: f } : null;
          if (u > 0.62 && u < 1.32) {
            var m = C.douce(S(u, 0.62, 0.9)) * (1 - C.douce(S(u, 1.08, 1.32)));
            E.teinteT = { rgb: "150,146,136", a: 0.9, t0: ct, duree: 10, monte: m };
          } else if (E.teinteT && E.teinteT.duree === 10) E.teinteT = null;
        },
        evenements: [[0.05, function () { Sons.jouer("sifflement"); }], [0.38, function () { Sons.jouer("rayon"); }], [0.7, function () { Sons.jouer("pierre"); }]]
      };
    },
    // La Harpie pique, serres en avant
    pique: function () {
      var dx = MONSTRE_X - TALOS_X - 120;
      return {
        impact: 0.55, duree: 1.2, recul: 40,
        maj: function (u) {
          E.mAction = "attaque"; E.mK = S(u, 0, 1.1);
          var k = S(u, 0.12, 0.55), r = S(u, 0.62, 1.1);
          E.mx = -dx * C.entree(k) * (1 - C.douce(r));
          E.my = (-40 * S(u, 0, 0.12) * (1 - k) - 10 * k) * (1 - C.douce(r));
        },
        evenements: [
          [0.04, function () { Sons.jouer("cri"); }],
          [0.3, function () { Sons.jouer("vent"); }],
          [0.56, function () {
            if (E.cibleFixe) return;   // Talos a esquivé : pas de plumes arrachées
            var c = pointsTalos().centre, n = E.reduit ? 3 : 9;
            for (var k = 0; k < n; k++) {
              particule({ type: "plume", x: c.x + hasard(-20, 20), y: c.y + hasard(-30, 10), vx: hasard(-120, 120), vy: hasard(-160, -20), g: 160,
                vie: hasard(0.9, 1.5), taille: hasard(6, 10), couleur: k % 2 ? "#5a4060" : "#b49ab8", rot: hasard(0, 6), vrot: hasard(-6, 6), frein: 1.5 });
            }
          }]
        ]
      };
    },
    // Le Sphinx rugit : des ondes de choc repoussent Talos
    rugissement: function () {
      return {
        impact: 0.6, duree: 1.35, recul: 70,
        maj: function (u) {
          E.mAction = "attaque"; E.mK = S(u, 0, 1.2);
          if (u > 0.25 && u < 0.9 && ct - (E.derniereOnde || 0) > 0.09) {
            E.derniereOnde = ct;
            var b = pointsMonstre().bouche;
            if (b) projectile({ type: "onde", x0: b.x, y0: b.y, x1: TALOS_X + 30, y1: b.y + 24, h: 0, duree: 0.35, traine: false });
          }
        },
        evenements: [[0.1, function () { Sons.jouer("rugissement"); }], [0.35, function () { Sons.jouer("rugissement"); }]]
      };
    },
    // La Chimère crache du feu
    souffle: function () {
      return {
        impact: 0.5, duree: 1.45, recul: 40, sansTeinte: true,
        maj: function (u) {
          E.mAction = "attaque"; E.mK = S(u, 0, 1.3);
          if (u > 0.12 && u < 1.05) {
            var b = pointsMonstre().bouche, cible = cibleTalos(), n = E.reduit ? 1 : 3;
            if (b) {
              var dx = cible.x - b.x, dy = cible.y - b.y, l = Math.sqrt(dx * dx + dy * dy) || 1;
              for (var i = 0; i < n; i++) {
                var v = hasard(480, 620);
                particule({ type: "feu", x: b.x, y: b.y, vx: dx / l * v + hasard(-40, 40), vy: dy / l * v + hasard(-60, 60),
                  vie: hasard(0.65, 0.85), taille: hasard(12, 22), g: -60, frein: 0.4 });
              }
            }
          }
          if (u > 0.5 && u < 1.08) E.teinteT = { rgb: "255,130,40", a: 0.3 + 0.15 * Math.random(), t0: ct, duree: 10 };
          else if (E.teinteT && E.teinteT.duree === 10) E.teinteT = null;
        },
        evenements: [[0.08, function () { Sons.jouer("feu"); }], [0.5, function () { Sons.jouer("feu"); }]]
      };
    },
    // Les oiseaux du lac Stymphale lancent leurs plumes de bronze
    plumes: function () {
      function salve(i) {
        return function () {
          var o = pointsMonstre().oiseaux, c = cibleTalos();
          if (!o || !o[i]) return;
          Sons.jouer("sifflement");
          projectile({ type: "plume", x0: o[i].x, y0: o[i].y, x1: c.x + hasard(-12, 12), y1: c.y + hasard(-30, 30), h: hasard(-20, 30),
            duree: 0.3, rgb: "255,190,90", largeur: 3,
            arrivee: function (p) { gerbe(p.x1, p.y1, 6, "255,200,120", 160, 0.3, 2); } });
        };
      }
      return {
        impact: 0.66, duree: 1.3, recul: 36,
        maj: function (u) { E.mAction = "attaque"; E.mK = S(u, 0, 1.1); },
        evenements: [[0.05, function () { Sons.jouer("cri"); }], [0.3, salve(0)], [0.36, salve(1)], [0.42, salve(2)], [0.48, salve(0)], [0.54, salve(1)]]
      };
    }
  };

  // Le coup touche Talos
  function toucherTalos(infos, att) {
    var pt = pointsTalos();
    Sons.jouer("degat");
    Sons.jouer("coeur", 0.12);
    geler(0.07);
    secouer(13, 0.4);
    eclairer("255,50,30", 0.24, 0.3);
    if (!att.sansTeinte) E.teinteT = { rgb: "255,70,50", a: 0.62, t0: ct, duree: 0.45 };
    gerbe(pt.centre.x, pt.centre.y, 26, "255,170,90", 380, 0.5, 3);
    gerbe(pt.centre.x, pt.centre.y, 10, "255,80,60", 200, 0.7, 4, "braise", 260);
    anneau(pt.centre.x, pt.centre.y, 6, 110, 0.35, "255,120,90", 7);
    var avant = E.coeurs;
    E.coeurs = Math.max(0, typeof infos.coeurs === "number" ? infos.coeurs : E.coeurs - 1);
    if (E.coeurs < avant) {
      E.coeurPerdu = { i: E.coeurs, t0: ct };
      var q = placeCoeur(E.coeurs);
      gerbe(q.x, q.y, 12, "255,80,70", 160, 0.6, 2.5, "eclatCoeur", 400);
    }
    texteFlottant("−1", pt.tete.x, pt.tete.y - 24, "rouge", 30, true);
  }

  // infos = { coeurs (ce qui reste après le coup), ko (plus aucun cœur ?),
  //           tempsEcoule (le sablier s'est vidé ?) }
  function degat(infos, fin) {
    if (!E) return;
    infos = infos || {};
    finirIntro();
    E.serie = 0;
    var P = Heros.POSES;
    // À la manche d'esquive, le monstre était déjà prêt : son attaque part de là.
    var m = E.menace;
    E.menace = null;
    var att = m ? m.att : (ATTAQUES[E.def.genre] || ATTAQUES.charge)();
    var u0 = m ? m.u0 : 0;
    var T = Math.max(0.15, att.impact - u0);
    var evts = att.evenements.map(function (e) { return [Math.max(0, e[0] - u0), e[1]]; })
      .concat([[T, function () { toucherTalos(infos, att); }]]);
    if (infos.tempsEcoule) {
      Sons.jouer("gong");
      banniere("TEMPS ÉCOULÉ !", "Le sablier est vide : le monstre frappe", "rouge", 1.3, 32);
    } else banniere(E.def.attaque, "", "rouge", 1.0, 30);
    sequence("degat", infos.ko ? T + 0.3 : Math.max(att.duree - u0, T + 0.9), function (u) {
      att.maj(u + u0);
      if (u >= T) {
        var k = u - T;
        var recul = C.sortie(S(k, 0, 0.12)) * (1 - C.douce(S(k, 0.3, 0.75)));
        E.pose = Heros.melanger(P.garde, P.touche, infos.ko ? C.sortie(S(k, 0, 0.12)) : recul);
        E.tx = -(att.recul || 34) * (infos.ko ? C.sortie(S(k, 0, 0.12)) : recul);
      } else {
        E.pose = Heros.melanger(P.garde, P.souffle, 0.5 + 0.5 * Math.sin(ct * 2.2));
        E.tx = 0;
      }
      E.ty = 0;
    }, evts, function () {
      E.rayon = null;
      if (E.teinteT && E.teinteT.duree === 10) E.teinteT = null;
      if (infos.ko) { ko(fin); return; }
      E.mx = 0; E.my = 0;
      if (fin) fin();
      // le monstre se moque (cela n'empêche pas de répondre), puis se prépare
      // de nouveau à frapper si c'est la manche d'esquive
      if (!E) return;
      sequence("moquerie", 0.9, function (u) { E.mAction = "rire"; E.mK = u / 0.9; }, [], function () {
        if (E && typeManche(E.manche, E.manches) === "esquive" && !E.menace) menacer();
      }, false);
    }, true);
  }

  // Talos n'a plus de cœur : il tombe, et Athéna l'emporte dans un pilier de lumière
  function ko(fin) {
    var P = Heros.POSES;
    var mx0 = E.mx, my0 = E.my, tx0 = E.tx;
    E.aTerre = true;
    E.rayon = null;
    E.teinteT = null;
    Sons.jouer("ko");
    E.grisCible = 0.85;
    banniere("TALOS EST À TERRE", "Athéna le ramène au départ de la salle", "rouge", 2.5, 40);
    sequence("ko", 2.75, function (u) {
      if (u < 0.5) E.pose = Heros.melanger(P.touche, P.genou, C.douce(S(u, 0, 0.45)));
      else E.pose = Heros.melanger(P.genou, P.aTerre, C.entree(S(u, 0.5, 0.9)));
      E.tx = tx0;
      E.ty = 0;
      E.mAction = "rire"; E.mK = S(u, 0, 1.2);
      var r = C.douce(S(u, 0, 0.6));
      E.mx = mx0 * (1 - r);
      E.my = my0 * (1 - r);
      if (E.pilier) {
        E.alphaT = 1 - S(u, 2.05, 2.6);
        if (Math.random() < 0.6) {
          particule({ type: "etoile", x: TALOS_X + E.tx - 40 + hasard(-50, 50), y: SOL - hasard(0, 60), vx: 0, vy: hasard(-160, -60),
            vie: hasard(0.6, 1.1), taille: hasard(1.5, 3), rgb: "200,225,255" });
        }
      }
    }, [
      [0.9, function () { Sons.jouer("pas"); secouer(8, 0.3); nuageDePoussiere(TALOS_X + E.tx - 40, SOL, 18, 60); }],
      [1.3, function () { E.pilier = { t0: ct, duree: 1.5 }; Sons.jouer("soin"); eclairer("190,220,255", 0.3, 0.4); }],
      [2.1, function () { Sons.jouer("niveau"); gerbe(TALOS_X + E.tx - 40, SOL - 40, 30, "200,225,255", 200, 0.9, 3, "etoile", -100); }]
    ], function () { if (fin) fin(); }, true);
  }

  return {
    ouvrir: ouvrir,
    fermer: fermer,
    occupe: occupe,
    redimensionner: function () {
      if (!canvas || !E) return;
      redimensionner();
      // le monstre figé doit être redessiné dans les nouveaux calques
      if (E.mFige && !E.detruit) {
        E.mFige = false;
        preparerCalqueMonstre();
        E.mFige = true;
        construirePierre();
      }
    },
    victoire: victoire,
    manche: manche,
    annoncerManche: annoncerManche,
    degat: degat,
    // Le sablier : f = la part du temps qui reste (de 1 à 0), secondes,
    // et le texte affiché (« 1:23 ») ; null pour le cacher.
    chrono: function (f, secondes, texte) {
      if (!E) return;
      E.chrono = f === null ? null : { f: f, secondes: secondes, texte: texte };
    },
    estOuvert: function () { return ouvert; }
  };
})();
