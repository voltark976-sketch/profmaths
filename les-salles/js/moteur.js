// =====================================================================
//  MOTEUR : les règles du jeu (vue de côté)
// =====================================================================
//  Ce fichier ne dessine rien. Il transforme le plan d'une salle
//  (les lettres de niveaux.js) en un « état » : ce qu'il y a sur
//  chaque case, où est le personnage, à quelle vitesse il va.
//  Puis, plusieurs dizaines de fois par seconde, il fait avancer
//  le temps : la gravité attire le personnage vers le bas, les
//  touches le font courir ou sauter, les murs l'arrêtent.
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
    "I": "inscription"  // une inscription d'Athéna, lue en passant (on la traverse)
  };

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
      steles[i].exercice = exercices[i];
      steles[i].resolue = false;
      if (typeof exercices[i].reponse !== "number") {
        return { erreur: "L'exercice n° " + (i + 1) + " n'a pas de réponse (reponse: un nombre)." };
      }
      if (exercices[i].effet === "passerelle" && passerelle.length === 0) {
        return { erreur: "L'exercice n° " + (i + 1) + " construit une passerelle, mais le plan ne contient pas de P." };
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
      if (typeof automatismes[b].reponse !== "number") {
        return { erreur: "L'automatisme n° " + (b + 1) + " n'a pas de réponse (reponse: un nombre)." };
      }
      bonus[b].exercice = automatismes[b];
      bonus[b].resolue = false;
      bonus[b].bonus = true;
      bonus[b].numero = b;
      steles.push(bonus[b]);
    }
    for (var n = 0; n < exercices.length; n++) steles[n].numero = n;

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
      if (etat.steles[i].bonus) continue;
      var effet = etat.steles[i].exercice.effet || "porte";
      if (effet === "porte" && !etat.steles[i].resolue) return false;
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

  // Le joueur propose une réponse à la stèle n° i.
  // Renvoie { juste: vrai/faux, valeur: le nombre lu (ou null) }.
  function proposerReponse(etat, i, texte) {
    var stele = etat.steles[i];
    var ex = stele.exercice;
    var valeur = lireNombre(texte);
    if (valeur === null) return { juste: false, valeur: null };
    var tolerance = typeof ex.tolerance === "number" ? ex.tolerance : 1e-6;
    var juste = Math.abs(valeur - ex.reponse) <= tolerance;

    if (juste) {
      stele.resolue = true;
      stele.instantResolue = etat.temps;   // pour l'éclat de lumière
      if (ex.effet === "passerelle" && !stele.bonus) {
        etat.passerelleConstruite = true;
        etat.passerelleFantome = null;
        etat.instantPasserelle = etat.temps;
      }
    } else if (ex.effet === "passerelle" && !stele.bonus) {
      // On montre la passerelle telle que la réponse la construirait :
      // une case par unité, en partant du bord gauche. Elle est fragile.
      etat.passerelleFantome = Math.max(0, Math.round(valeur));
    }
    verifierPorte(etat);
    return { juste: juste, valeur: valeur };
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
    chargerSalle: chargerSalle,
    placerAuDepart: placerAuDepart,
    avancer: avancer,
    caseEn: caseEn,
    nbDallesAllumees: nbDallesAllumees,
    lireNombre: lireNombre,
    proposerReponse: proposerReponse,
    steleProche: steleProche,
    guideProche: guideProche,
    inscriptionProche: inscriptionProche
  };
})();
