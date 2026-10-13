// =====================================================================
//  MOTEUR : les règles du jeu (vue de côté)
// =====================================================================
//  Ce fichier ne dessine rien. Il transforme le plan d'une salle
//  (les lettres de niveaux.js) en un « état » : ce qu'il y a sur
//  chaque case, où est le personnage, à quelle vitesse il va.
//  Puis, plusieurs dizaines de fois par seconde, il fait avancer
//  le temps : la gravité attire le personnage vers le bas, les
//  touches le font courir ou sauter, les murs l'arrêtent.
//  Il vérifie aussi les réponses aux stèles (une stèle peut avoir
//  plusieurs exercices, un par manche de combat) et fait voler Talos
//  pendant les figures acrobatiques des stèles d'Hermès.
//
//  Les distances sont mesurées en cases (1 = la largeur d'une case),
//  les durées en secondes. Le repère est celui de l'écran :
//  x vers la droite, y vers le BAS.
// =====================================================================

var Moteur = (function () {

  // ---- Réglages du mouvement (on peut les ajuster) ----
  var REGLAGES = {
    vitesseCourse: 6,       // cases par seconde
    gravite: 32,            // cases par seconde, chaque seconde
    vitesseSaut: 13,        // vitesse vers le haut au moment du saut
                            // (hauteur du saut ≈ 13² / (2 × 32) ≈ 2,6 cases)
    chuteMax: 18,           // vitesse de chute maximale
    toleranceBord: 0.12,    // on peut encore sauter 0,12 s après avoir quitté un bord
    toleranceSaut: 0.12,    // un appui sur « saut » juste avant d'atterrir compte quand même
    largeurPerso: 0.7,
    hauteurPerso: 0.9
  };

  var LETTRES = {
    "#": "mur",
    ".": "vide",
    "J": "vide",        // le personnage démarre dans une case vide
    "D": "dalle",
    "S": "sortie",
    "T": "stele",       // une stèle portant un exercice (on la traverse)
    "G": "guide",       // la statue d'un philosophe (on la traverse)
    "P": "passerelle",  // une case de passerelle, solide une fois construite
    "A": "bonus",       // une stèle d'or : un automatisme en bonus (on la traverse)
    "I": "inscription", // une inscription d'Athéna, lue en passant (on la traverse)
    "H": "hermes",      // une stèle d'Hermès : une figure acrobatique (on la traverse)
    "R": "reception"    // l'endroit où Talos se pose après la figure acrobatique
  };

  // Les figures acrobatiques des stèles d'Hermès : le nombre de tours
  // que Talos fait sur lui-même pendant le vol, et le nom affiché.
  var FIGURES = {
    salto:  { tours: 1, nom: "Salto avant" },
    double: { tours: 2, nom: "Double salto" }
  };

  // Une stèle peut porter un seul exercice (comme avant) ou plusieurs,
  // dans sa liste « exercices » : un par manche du combat.
  function exercicesDe(entree) {
    if (entree && Array.isArray(entree.exercices)) return entree.exercices;
    return entree ? [entree] : [];
  }

  // Vérifie les exercices d'une stèle et les range dans la stèle.
  // Renvoie un texte d'erreur, ou "" si tout va bien.
  function preparerStele(stele, entree, nom) {
    var liste = exercicesDe(entree);
    if (liste.length === 0) return nom + " n'a pas d'exercice.";
    for (var k = 0; k < liste.length; k++) {
      if (!liste[k] || typeof liste[k].reponse !== "number") {
        return nom + (liste.length > 1 ? ", exercice n° " + (k + 1) + "," : "") + " n'a pas de réponse (reponse: un nombre).";
      }
    }
    stele.entree = entree;
    stele.exercices = liste;
    stele.manche = 0;                // l'exercice en cours (la manche du combat)
    stele.exercice = liste[0];
    stele.resolue = false;
    stele.erreurs = 0;
    var passerelle = entree.effet === "passerelle";
    var monstre = entree.monstre || "";
    liste.forEach(function (ex) {
      if (ex.effet === "passerelle") passerelle = true;
      if (!monstre && ex.monstre) monstre = ex.monstre;
    });
    stele.effet = passerelle ? "passerelle" : "porte";
    stele.monstre = monstre;
    stele.boss = entree.boss || "";          // le nom du boss, s'il y en a un
    stele.contexte = entree.contexte || "";  // l'énoncé commun aux questions
    return "";
  }

  // Transforme une salle de niveaux.js en état de jeu.
  // Si le plan contient une erreur, renvoie { erreur: "explication" }.
  function chargerSalle(niveau) {
    if (!niveau || !Array.isArray(niveau.plan) || niveau.plan.length === 0) {
      return { erreur: "Cette salle n'a pas de plan." };
    }

    var hauteur = niveau.plan.length;
    var largeur = 0;
    niveau.plan.forEach(function (ligne) {
      if (ligne.length > largeur) largeur = ligne.length;
    });

    var cases = [];
    var depart = null;
    var nbDalles = 0;
    var nbSorties = 0;
    var steles = [];      // positions des T, dans l'ordre de lecture
    var guides = [];      // positions des G
    var passerelle = [];  // positions des P
    var bonus = [];       // positions des A
    var inscriptions = []; // positions des I
    var hermes = [];      // positions des H
    var receptions = [];  // positions des R

    for (var y = 0; y < hauteur; y++) {
      var rangee = [];
      var ligne = niveau.plan[y];
      for (var x = 0; x < largeur; x++) {
        var lettre = x < ligne.length ? ligne[x] : "#";
        var sorte = LETTRES[lettre];
        if (!sorte) {
          return {
            erreur: "Lettre inconnue « " + lettre + " » à la ligne " + (y + 1) +
                    ", colonne " + (x + 1) + " du plan."
          };
        }
        if (lettre === "J") {
          if (depart) return { erreur: "Le plan contient plusieurs personnages (J). Il en faut un seul." };
          depart = { x: x, y: y };
        }
        if (sorte === "dalle") nbDalles++;
        if (sorte === "sortie") nbSorties++;
        if (sorte === "stele") steles.push({ x: x, y: y });
        if (sorte === "guide") guides.push({ x: x, y: y });
        if (sorte === "passerelle") passerelle.push({ x: x, y: y });
        if (sorte === "bonus") bonus.push({ x: x, y: y });
        if (sorte === "inscription") inscriptions.push({ x: x, y: y });
        if (sorte === "hermes") hermes.push({ x: x, y: y });
        if (sorte === "reception") receptions.push({ x: x, y: y });
        rangee.push(sorte);
      }
      cases.push(rangee);
    }

    if (!depart) return { erreur: "Le plan ne contient pas de personnage (J)." };
    if (nbSorties === 0) return { erreur: "Le plan ne contient pas de sortie (S)." };

    // Chaque T du plan doit avoir son exercice dans « steles »,
    // et chaque G son philosophe dans « guides ».
    var exercices = niveau.steles || [];
    var philosophes = niveau.guides || [];
    if (exercices.length !== steles.length) {
      return { erreur: "Le plan contient " + steles.length + " stèle(s) (T) mais la liste « steles » contient " +
                       exercices.length + " exercice(s). Il en faut autant." };
    }
    if (philosophes.length !== guides.length) {
      return { erreur: "Le plan contient " + guides.length + " statue(s) (G) mais la liste « guides » en décrit " +
                       philosophes.length + ". Il en faut autant." };
    }
    for (var i = 0; i < exercices.length; i++) {
      var probleme = preparerStele(steles[i], exercices[i], "La stèle de pierre n° " + (i + 1));
      if (probleme) return { erreur: probleme };
      if (steles[i].effet === "passerelle" && passerelle.length === 0) {
        return { erreur: "La stèle de pierre n° " + (i + 1) + " construit une passerelle, mais le plan ne contient pas de P." };
      }
    }
    for (var g = 0; g < guides.length; g++) guides[g].philosophe = philosophes[g];

    // Les stèles d'or (A) portent les automatismes de la liste « bonus ».
    // Elles ne gardent aucune porte : elles rapportent un sceau bonus.
    var automatismes = niveau.bonus || [];
    if (automatismes.length !== bonus.length) {
      return { erreur: "Le plan contient " + bonus.length + " stèle(s) d'or (A) mais la liste « bonus » contient " +
                       automatismes.length + " automatisme(s). Il en faut autant." };
    }
    for (var b = 0; b < bonus.length; b++) {
      var souci = preparerStele(bonus[b], automatismes[b], "La stèle d'or n° " + (b + 1));
      if (souci) return { erreur: souci };
      bonus[b].effet = "bonus";
      bonus[b].bonus = true;
      bonus[b].numero = b;
      steles.push(bonus[b]);
    }
    for (var n = 0; n < exercices.length; n++) steles[n].numero = n;

    // Les stèles d'Hermès (H) portent les problèmes de la liste « acrobaties » :
    // une fois résolues, Talos peut faire une figure acrobatique jusqu'à la
    // réception R qui leur correspond (la première H va vers la première R...).
    var acrobaties = niveau.acrobaties || [];
    if (acrobaties.length !== hermes.length || receptions.length !== hermes.length) {
      return { erreur: "Le plan contient " + hermes.length + " stèle(s) d'Hermès (H) et " + receptions.length +
                       " réception(s) (R), et la liste « acrobaties » en contient " + acrobaties.length + ". Il en faut autant." };
    }
    for (var h = 0; h < hermes.length; h++) {
      var ennui = preparerStele(hermes[h], acrobaties[h], "La stèle d'Hermès n° " + (h + 1));
      if (ennui) return { erreur: ennui };
      hermes[h].effet = "figure";
      hermes[h].figure = FIGURES[acrobaties[h].figure] ? acrobaties[h].figure : "salto";
      hermes[h].nomFigure = FIGURES[hermes[h].figure].nom;
      hermes[h].vers = receptions[h];
      hermes[h].numero = h;
      steles.push(hermes[h]);
    }

    // Chaque I du plan doit avoir son texte dans « inscriptions ».
    var textes = niveau.inscriptions || [];
    if (textes.length !== inscriptions.length) {
      return { erreur: "Le plan contient " + inscriptions.length + " inscription(s) (I) mais la liste « inscriptions » en contient " +
                       textes.length + ". Il en faut autant." };
    }
    for (var q = 0; q < inscriptions.length; q++) inscriptions[q].inscription = textes[q];

    var etat = {
      largeur: largeur,
      hauteur: hauteur,
      nom: niveau.nom || "",
      fond: niveau.fond || "temple",   // l'ambiance du décor (voir decor.js)
      cases: cases,
      depart: depart,
      dallesAllumees: {},
      nbDalles: nbDalles,
      steles: steles,
      guides: guides,
      inscriptions: inscriptions,
      passerelle: passerelle,
      passerelleConstruite: false,
      passerelleFantome: null,  // longueur d'une passerelle ratée, pour la montrer
      porteOuverte: false,
      figure: null,             // la figure acrobatique en cours (voir lancerFigure)
      temps: 0,
      joueur: null
    };
    verifierPorte(etat);
    if (etat.porteOuverte) etat.instantOuverture = -10; // déjà ouverte : pas d'animation
    placerAuDepart(etat);
    return etat;
  }

  // La porte s'ouvre quand toutes les dalles sont allumées
  // ET que toutes les stèles « porte » sont résolues.
  function verifierPorte(etat) {
    var avant = etat.porteOuverte;
    etat.porteOuverte = porteDoitSOuvrir(etat);
    if (etat.porteOuverte && !avant) etat.instantOuverture = etat.temps; // pour l'animation
  }
  function porteDoitSOuvrir(etat) {
    if (Object.keys(etat.dallesAllumees).length < etat.nbDalles) return false;
    for (var i = 0; i < etat.steles.length; i++) {
      if (etat.steles[i].effet === "porte" && !etat.steles[i].resolue) return false;
    }
    return true;
  }

  // Lit la réponse tapée par le joueur : « 8 », « 8,0 », « 8 m », « 24/3 »...
  // Renvoie un nombre, ou null si ce n'est pas un nombre.
  function lireNombre(texte) {
    var t = String(texte).trim().replace(/\s+/g, "").replace(/,/g, ".").replace(/[−–]/g, "-");
    t = t.replace(/[a-zA-Zéèàù²³°]+$/, "");   // retire une unité écrite à la fin
    if (t === "") return null;
    var morceaux = t.split("/");
    if (morceaux.length > 2) return null;
    var a = Number(morceaux[0]);
    var b = morceaux.length === 2 ? Number(morceaux[1]) : 1;
    if (!isFinite(a) || !isFinite(b) || b === 0) return null;
    return a / b;
  }

  // Le joueur propose une réponse à l'exercice en cours de la stèle n° i.
  // Une stèle à plusieurs exercices se résout en plusieurs manches : une
  // bonne réponse fait passer à l'exercice suivant, et la stèle est résolue
  // après le dernier.
  // Renvoie { juste, valeur (le nombre lu, ou null), manche (le numéro de
  // l'exercice auquel on vient de répondre, à partir de 0), total (le nombre
  // d'exercices), finie (la stèle vient-elle d'être résolue ?) }.
  function proposerReponse(etat, i, texte) {
    var stele = etat.steles[i];
    var ex = stele.exercice;
    var manche = stele.manche || 0, total = stele.exercices.length;
    var valeur = lireNombre(texte);
    if (valeur === null) return { juste: false, valeur: null, manche: manche, total: total, finie: false };
    var tolerance = typeof ex.tolerance === "number" ? ex.tolerance : 1e-6;
    var juste = Math.abs(valeur - ex.reponse) <= tolerance;
    var finie = false;

    if (juste) {
      stele.manche = manche + 1;
      if (stele.manche >= total) {
        finie = true;
        stele.resolue = true;
        stele.instantResolue = etat.temps;   // pour l'éclat de lumière
        if (stele.effet === "passerelle") {
          etat.passerelleConstruite = true;
          etat.passerelleFantome = null;
          etat.instantPasserelle = etat.temps;
        }
      } else {
        stele.exercice = stele.exercices[stele.manche];
      }
    } else {
      stele.erreurs = (stele.erreurs || 0) + 1;
      if (ex.effet === "passerelle" && stele.effet === "passerelle") {
        // On montre la passerelle telle que la réponse la construirait :
        // une case par unité, en partant du bord gauche. Elle est fragile.
        etat.passerelleFantome = Math.max(0, Math.round(valeur));
      }
    }
    verifierPorte(etat);
    return { juste: juste, valeur: valeur, manche: manche, total: total, finie: finie };
  }

  // Le sablier de la manche s'est vidé : cela compte comme une erreur
  // (la manche reste à jouer).
  function tempsEcoule(etat, i) {
    var stele = etat.steles[i];
    stele.erreurs = (stele.erreurs || 0) + 1;
    return { juste: false, valeur: null, manche: stele.manche || 0, total: stele.exercices.length,
             finie: false, tempsEcoule: true };
  }

  // Résout d'un coup tous les exercices d'une stèle (pour les vérifications).
  function resoudre(etat, i) {
    var s = etat.steles[i];
    while (!s.resolue) proposerReponse(etat, i, String(s.exercice.reponse));
  }

  // ---------------------------------------------------------------
  //  Les figures acrobatiques (stèles d'Hermès)
  // ---------------------------------------------------------------
  // Talos s'élance vers la réception de la stèle n° i (ou, si versStele
  // est vrai, de la réception vers la stèle). Il suit un arc de parabole
  // et tourne sur lui-même pendant le vol. Renvoie vrai si la figure part.
  function lancerFigure(etat, i, versStele) {
    var s = etat.steles[i];
    if (!s || s.effet !== "figure" || !s.resolue || etat.figure) return false;
    var j = etat.joueur;
    var depart = versStele ? s.vers : s, but = versStele ? s : s.vers;
    // L'arc part toujours de la case de départ (la stèle ou la réception) :
    // c'est ce chemin qui a été vérifié. Si Talos se tient un peu à côté,
    // l'écart s'efface pendant le premier quart du vol.
    var x0 = depart.x + (1 - j.l) / 2, y0 = depart.y + 1 - j.h;
    var x1 = but.x + (1 - j.l) / 2, y1 = but.y + 1 - j.h;
    var dx = x1 - x0;
    // Le sommet de l'arc (y vers le bas) : au-dessus du plus haut des deux
    // points, mais sans toucher le plafond de la salle.
    var haut = Math.max(1.05, Math.min(y0, y1) - (1.3 + 0.2 * Math.abs(dx)));
    var a = Math.sqrt(Math.max(0, y0 - haut)), b = Math.sqrt(Math.max(0, y1 - haut));
    var us = a + b > 0 ? a / (a + b) : 0.5;
    var k = us > 0 ? (y0 - haut) / (us * us) : (y1 - haut) / ((1 - us) * (1 - us));
    var distance = Math.sqrt(dx * dx + (y1 - y0) * (y1 - y0));
    etat.figure = {
      stele: i, x0: x0, y0: y0, x1: x1, y1: y1, haut: haut, us: us, k: k, ecartX: j.x - x0, ecartY: j.y - y0,
      t: 0, duree: 0.85 + 0.045 * distance,
      tours: FIGURES[s.figure].tours, sens: dx >= 0 ? 1 : -1, nom: s.nomFigure, debut: etat.temps
    };
    j.regard = dx >= 0 ? 1 : -1;
    j.auSol = false;
    return true;
  }

  // L'angle de Talos pendant la figure (en radians), pour le dessin.
  function angleFigure(f) {
    var u = Math.min(1, f.t / f.duree);
    var d = u * u * (3 - 2 * u);
    return f.sens * f.tours * Math.PI * 2 * d;
  }

  // Fait avancer la figure en cours ; elle se termine sur la réception.
  function avancerFigure(etat, dt) {
    var f = etat.figure, j = etat.joueur;
    f.t += dt;
    var u = Math.min(1, f.t / f.duree);
    var px = j.x, py = j.y;
    var e = Math.min(1, u / 0.25), reste = 1 - e * e * (3 - 2 * e);
    j.x = f.x0 + (f.x1 - f.x0) * u + (f.ecartX || 0) * reste;
    j.y = f.haut + f.k * (u - f.us) * (u - f.us) + (f.ecartY || 0) * reste;
    j.vx = (j.x - px) / Math.max(dt, 1e-6);
    j.vy = (j.y - py) / Math.max(dt, 1e-6);
    j.auSol = false;
    if (u >= 1) {
      j.x = f.x1; j.y = f.y1;
      j.vx = 0; j.vy = 0;
      j.auSol = true;
      j.depuisSol = 0;
      j.sautEnAttente = 0;
      j.instantAtterrissage = etat.temps;
      etat.instantReception = etat.temps;
      etat.derniereFigure = f;
      etat.figure = null;
    }
  }

  // Numéro de la stèle (ou du philosophe) devant laquelle se tient le personnage, ou -1.
  function procheDe(etat, liste) {
    var j = etat.joueur;
    var cx = j.x + j.l / 2, cy = j.y + j.h / 2;
    for (var i = 0; i < liste.length; i++) {
      var dx = Math.abs(cx - (liste[i].x + 0.5));
      var dy = Math.abs(cy - (liste[i].y + 0.5));
      if (dx < 0.9 && dy < 0.9) return i;
    }
    return -1;
  }
  function steleProche(etat) { return procheDe(etat, etat.steles); }
  function guideProche(etat) { return procheDe(etat, etat.guides); }
  // Les inscriptions se lisent d'un peu plus loin.
  function inscriptionProche(etat) {
    var j = etat.joueur, liste = etat.inscriptions || [];
    var cx = j.x + j.l / 2, cy = j.y + j.h / 2;
    for (var i = 0; i < liste.length; i++) {
      if (Math.abs(cx - (liste[i].x + 0.5)) < 1.2 && Math.abs(cy - (liste[i].y + 0.5)) < 1) return i;
    }
    return -1;
  }

  // La stèle d'Hermès (résolue) dont la réception est sous les pieds de Talos, ou -1.
  function receptionProche(etat) {
    var j = etat.joueur;
    var cx = j.x + j.l / 2, cy = j.y + j.h / 2;
    for (var i = 0; i < etat.steles.length; i++) {
      var s = etat.steles[i];
      if (s.effet !== "figure" || !s.resolue) continue;
      if (Math.abs(cx - (s.vers.x + 0.5)) < 0.9 && Math.abs(cy - (s.vers.y + 0.5)) < 0.9) return i;
    }
    return -1;
  }

  // Met le personnage sur sa case de départ, posé sur le sol de cette case.
  function placerAuDepart(etat) {
    etat.joueur = {
      x: etat.depart.x + (1 - REGLAGES.largeurPerso) / 2,
      y: etat.depart.y + 1 - REGLAGES.hauteurPerso,
      l: REGLAGES.largeurPerso,
      h: REGLAGES.hauteurPerso,
      vx: 0,
      vy: 0,
      auSol: false,
      regard: 1,          // 1 = regarde à droite, -1 = à gauche
      depuisSol: 0,       // temps écoulé depuis qu'il a quitté le sol
      sautEnAttente: 0    // temps restant pour un appui sur « saut »
    };
    etat.figure = null;
    etat.instantApparition = etat.temps;  // pour l'animation d'apparition
  }

  // Ce qu'il y a dans la case (x, y). En dehors de la salle :
  // des murs sur les côtés et en haut, du vide en bas (on peut tomber).
  function caseEn(etat, x, y) {
    if (y >= etat.hauteur) return "vide";
    if (x < 0 || y < 0 || x >= etat.largeur) return "mur";
    return etat.cases[y][x];
  }

  // Une case est « solide » si on ne peut pas la traverser.
  function estSolide(etat, x, y) {
    var c = caseEn(etat, x, y);
    if (c === "mur") return true;
    if (c === "sortie") return !etat.porteOuverte;
    if (c === "passerelle") return etat.passerelleConstruite;
    return false;
  }

  // Le rectangle (x, y, l, h) touche-t-il une case solide ?
  function toucheSolide(etat, x, y, l, h) {
    var x1 = Math.floor(x), x2 = Math.floor(x + l - 0.0001);
    var y1 = Math.floor(y), y2 = Math.floor(y + h - 0.0001);
    for (var cy = y1; cy <= y2; cy++) {
      for (var cx = x1; cx <= x2; cx++) {
        if (estSolide(etat, cx, cy)) return true;
      }
    }
    return false;
  }

  // Liste des cases que le personnage recouvre.
  function casesSousJoueur(etat) {
    var j = etat.joueur, liste = [];
    var x1 = Math.floor(j.x), x2 = Math.floor(j.x + j.l - 0.0001);
    var y1 = Math.floor(j.y), y2 = Math.floor(j.y + j.h - 0.0001);
    for (var cy = y1; cy <= y2; cy++) {
      for (var cx = x1; cx <= x2; cx++) liste.push({ x: cx, y: cy, sorte: caseEn(etat, cx, cy) });
    }
    return liste;
  }

  function nbDallesAllumees(etat) {
    return Object.keys(etat.dallesAllumees).length;
  }

  // Fait avancer le temps de dt secondes.
  // entrees = { gauche: vrai/faux, droite: vrai/faux, saut: vrai si on vient d'appuyer }
  // Renvoie "rien", "chute" (tombé hors de la salle) ou "sortie" (salle réussie).
  function avancer(etat, entrees, dt) {
    var j = etat.joueur;
    etat.temps += dt;

    // --- Pendant une figure acrobatique, Talos ne se dirige pas ---
    if (etat.figure) {
      avancerFigure(etat, dt);
      return "rien";
    }

    // --- Direction voulue ---
    var direction = (entrees.droite ? 1 : 0) - (entrees.gauche ? 1 : 0);
    j.vx = direction * REGLAGES.vitesseCourse;
    if (direction !== 0) j.regard = direction;

    // --- Saut (avec un peu de tolérance pour ne pas exiger de réflexes) ---
    if (entrees.saut) j.sautEnAttente = REGLAGES.toleranceSaut;
    else j.sautEnAttente = Math.max(0, j.sautEnAttente - dt);

    j.depuisSol = j.auSol ? 0 : j.depuisSol + dt;
    if (j.sautEnAttente > 0 && j.depuisSol <= REGLAGES.toleranceBord) {
      j.vy = -REGLAGES.vitesseSaut;
      j.sautEnAttente = 0;
      j.depuisSol = REGLAGES.toleranceBord + 1; // pas de deuxième saut en l'air
      j.auSol = false;
    }

    // --- Gravité ---
    j.vy = Math.min(j.vy + REGLAGES.gravite * dt, REGLAGES.chuteMax);

    // --- Déplacement horizontal, puis vertical ---
    // On avance d'abord en x et on recule si on rentre dans un mur,
    // puis on fait pareil en y.
    var nx = j.x + j.vx * dt;
    if (toucheSolide(etat, nx, j.y, j.l, j.h)) {
      nx = j.vx > 0 ? Math.floor(nx + j.l) - j.l - 0.0001 : Math.floor(nx) + 1;
      j.vx = 0;
    }
    j.x = nx;

    var ny = j.y + j.vy * dt;
    var etaitAuSol = j.auSol;
    j.auSol = false;
    if (toucheSolide(etat, j.x, ny, j.l, j.h)) {
      if (j.vy > 0) {
        ny = Math.floor(ny + j.h) - j.h;   // posé sur le sol
        j.auSol = true;
        if (!etaitAuSol && j.vy > 6) j.instantAtterrissage = etat.temps; // petit nuage de poussière
      } else {
        ny = Math.floor(ny) + 1;           // tête contre le plafond
      }
      j.vy = 0;
    }
    j.y = ny;

    // --- Tombé hors de la salle ? ---
    if (j.y > etat.hauteur + 1) return "chute";

    // --- Dalles et sortie ---
    var touchees = casesSousJoueur(etat);
    for (var i = 0; i < touchees.length; i++) {
      var c = touchees[i];
      if (c.sorte === "dalle" && !etat.dallesAllumees[c.x + "," + c.y]) {
        etat.dallesAllumees[c.x + "," + c.y] = Math.max(etat.temps, 0.001); // l'instant où elle s'allume
        verifierPorte(etat);
      }
    }
    for (var k = 0; k < touchees.length; k++) {
      if (touchees[k].sorte === "sortie" && etat.porteOuverte) return "sortie";
    }
    return "rien";
  }

  return {
    REGLAGES: REGLAGES,
    chargerSalle: chargerSalle,
    placerAuDepart: placerAuDepart,
    avancer: avancer,
    caseEn: caseEn,
    estSolide: estSolide,
    nbDallesAllumees: nbDallesAllumees,
    lireNombre: lireNombre,
    proposerReponse: proposerReponse,
    tempsEcoule: tempsEcoule,
    resoudre: resoudre,
    lancerFigure: lancerFigure,
    angleFigure: angleFigure,
    steleProche: steleProche,
    guideProche: guideProche,
    inscriptionProche: inscriptionProche,
    receptionProche: receptionProche
  };
})();
