// =====================================================================
//  JEU : le chef d'orchestre
// =====================================================================
//  Ce fichier relie les autres :
//   - il prend une salle dans niveaux.js et la donne au moteur ;
//   - environ 60 fois par seconde (une « image »), il lit le clavier
//     (commandes.js), fait avancer le temps (moteur.js) et redessine
//     la salle (dessin.js) ;
//   - il ouvre les stèles (exercices) et vérifie les réponses, manche
//     après manche, avec le sablier de chaque manche ;
//   - il compte les sceaux, débloque les parures et les sanctuaires ;
//   - il mène les combats : cœurs, expérience et rangs de Talos
//     (combat.js met en scène, gardiens.js fait rôder les monstres dans
//     la salle, ce fichier décide) ;
//   - il lance les figures acrobatiques des stèles d'Hermès ;
//   - il sauvegarde la progression (sauvegarde.js).
// =====================================================================

(function () {

  function $(id) { return document.getElementById(id); }

  var canvas = $("salle");
  var el = {
    chapitre: $("chapitre"), titre: $("titre-salle"), athena: $("athena-texte"),
    dalles: $("compteur-dalles"), sceaux: $("compteur-sceaux"), sceauxTexte: $("texte-sceaux"),
    bonus: $("compteur-bonus"), bonusTexte: $("texte-bonus"), avis: $("avis"),
    bulle: $("bulle"), bulleNom: $("bulle-nom"), bulleTexte: $("bulle-texte"),
    choix: $("choix-salle"), toasts: $("toasts"),
    fenetre: $("fenetre"), fenetreTitre: $("fenetre-titre"), fenetreTexte: $("fenetre-texte"),
    fenetreBouton: $("fenetre-bouton"), fenetreBouton2: $("fenetre-bouton2"),
    stele: $("stele"), steleForm: $("stele-formulaire"), steleTitre: $("stele-titre"), steleEnonce: $("stele-enonce"),
    steleReponse: $("stele-reponse"), steleUnite: $("stele-unite"), steleValider: $("stele-valider"),
    steleRetour: $("stele-retour"), steleIndice: $("stele-indice"), steleExplication: $("stele-explication"),
    steleFermer: $("stele-fermer"), steleSurTitre: $("stele-sur-titre"), steleNote: $("stele-note"),
    parures: $("parures"), paruresCompte: $("parures-compte"), paruresListe: $("parures-liste"),
    sanctuairesListe: $("sanctuaires-liste"), paruresFermer: $("parures-fermer"), boutonParures: $("bouton-parures"),
    ecranTitre: $("ecran-titre"), titreBouton: $("titre-bouton"), titreProgres: $("titre-progres"),
    arene: $("arene"), steleRegle: $("stele-regle"), vie: $("compteur-vie"), niveau: $("compteur-niveau"),
    niveauTexte: $("texte-niveau"), son: $("bouton-son"),
    steleMancheLigne: $("stele-manche-ligne"), steleManche: $("stele-manche"), steleChrono: $("stele-chrono"),
    steleContexte: $("stele-contexte")
  };

  var PAS_DE_TEMPS = 1 / 120;   // le moteur avance par petits pas réguliers

  // Les personnes qui ont demandé moins d'animations (réglage de leur
  // ordinateur) ont un décor immobile.
  var mouvementReduit = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  var progression = Sauvegarde.charger();
  var partieNeuve = progression.reussies.length === 0 && !progression.salleCourante;
  var numeroSalle = 0;
  var etat = null;
  var actionFenetre = null, actionFenetre2 = null;
  var enPause = true;
  var minuteurAvis = null;
  var steleOuverte = -1;
  var paruresPortees = {};

  var LISTE_PARURES = typeof PARURES !== "undefined" && Array.isArray(PARURES) ? PARURES : [];

  // Les combats (rangs.js, combat.js) : si un de ces fichiers manque,
  // le jeu marche quand même, simplement sans les monstres.
  var LISTE_RANGS = typeof RANGS !== "undefined" && Array.isArray(RANGS) && RANGS.length ? RANGS
    : [{ xp: 0, titre: "Automate éveillé", coeurs: 3 }];
  var REGLES_XP = typeof XP !== "undefined" ? XP : { pierre: 100, or: 80, boss: 300, figure: 60, sansFaute: 50, serie: 10, serieMax: 50 };
  var REGLES_TEMPS = typeof TEMPS_LIMITE !== "undefined" && TEMPS_LIMITE ? TEMPS_LIMITE : { actif: false };
  var ORDRE_MONSTRES = typeof ORDRE_DES_MONSTRES !== "undefined" && Array.isArray(ORDRE_DES_MONSTRES) && ORDRE_DES_MONSTRES.length
    ? ORDRE_DES_MONSTRES : ["minotaure"];
  var combatPossible = typeof Combat !== "undefined" && typeof Monstres !== "undefined" && typeof Heros !== "undefined" && !!el.arene;
  var gardiensPossibles = combatPossible && typeof Gardiens !== "undefined";
  var coeurs = 3, coeursMax = 3;   // les cœurs de Talos dans la salle en cours
  var serie = 0;                    // les bonnes réponses d'affilée
  var erreursStele = 0;             // les erreurs à la stèle ouverte
  var dernierCoup = "";             // pour varier les coups de Talos
  var areneOuverte = false;         // le combat est affiché au-dessus de la stèle
  var enCombat = false;             // une animation empêche de répondre
  var koEnAttente = false;          // Talos est à terre : retour au départ en fermant la stèle
  var mancheEnAttente = false;      // une manche est gagnée : on attend « Manche suivante »
  var figureEnAttente = -1;         // une stèle d'Hermès vient d'être résolue : la figure part en fermant
  var dejaResolue = false;          // la stèle ouverte était déjà résolue
  var parfaits = 0;                 // les combats gagnés sans erreur, d'affilée (la foudre au 3e)
  var graceChrono = 0;              // le sablier ne peut pas se vider dans la première seconde
  var dernierTic = -1;

  // Les salles sont rangées par chapitres dans niveaux.js. On les met
  // bout à bout dans une seule liste, en retenant le chapitre de chacune.
  // Le sanctuaire secret d'un chapitre vient juste après ses salles.
  var NIVEAUX = [];
  var LISTE_CHAPITRES = typeof CHAPITRES !== "undefined" && Array.isArray(CHAPITRES) ? CHAPITRES : [];
  LISTE_CHAPITRES.forEach(function (chap, c) {
    var salles = chap.salles || [];
    salles.forEach(function (salle, k) {
      salle.numeroChapitre = c;
      salle.premiereDuChapitre = k === 0;
      salle.derniereNormale = k === salles.length - 1;
      salle.rang = k + 1;
      salle.secrete = false;
      NIVEAUX.push(salle);
    });
    if (chap.sanctuaire && chap.sanctuaire.salle) {
      var secrete = chap.sanctuaire.salle;
      secrete.numeroChapitre = c;
      secrete.premiereDuChapitre = false;
      secrete.derniereNormale = false;
      secrete.secrete = true;
      NIVEAUX.push(secrete);
    }
  });

  if (NIVEAUX.length === 0) {
    afficherErreur("Le fichier niveaux/niveaux.js n'a pas pu être lu. " +
      "Il contient sans doute une faute d'écriture (une virgule, un guillemet ou " +
      "une accolade oubliés). La console du navigateur (touche F12) indique la ligne.");
    return;
  }

  // ---------------------------------------------------------------
  //  Les chapitres et les salles
  // ---------------------------------------------------------------
  function romain(n) {
    return ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][n - 1] || String(n);
  }
  // Le numéro affiché d'un chapitre (le prologue n'est pas compté).
  function numeroAffiche(c) {
    var n = 0;
    for (var i = 0; i <= c; i++) if (!LISTE_CHAPITRES[i].prologue) n++;
    return n;
  }
  function titreChapitre(c) {
    var chap = LISTE_CHAPITRES[c];
    if (chap.prologue) return "Prologue : " + chap.titre;
    return (chap.niveau ? chap.niveau + " · " : "") + "Chapitre " + romain(numeroAffiche(c)) + " : " + chap.titre;
  }
  function libelleChapitre(c) {
    var chap = LISTE_CHAPITRES[c];
    return chap.prologue ? "Prologue : " + chap.titre : "Chapitre " + romain(numeroAffiche(c)) + " : " + chap.titre;
  }

  function indexDe(nom) {
    for (var i = 0; i < NIVEAUX.length; i++) if (NIVEAUX[i].nom === nom) return i;
    return -1;
  }
  function estReussie(i) { return progression.reussies.indexOf(NIVEAUX[i].nom) !== -1; }
  function precedenteNormale(i) {
    for (var k = i - 1; k >= 0; k--) if (!NIVEAUX[k].secrete) return k;
    return -1;
  }
  function prochaineNormale(i) {
    for (var k = i + 1; k < NIVEAUX.length; k++) if (!NIVEAUX[k].secrete) return k;
    return -1;
  }
  function indexSanctuaire(c) {
    for (var i = 0; i < NIVEAUX.length; i++) if (NIVEAUX[i].secrete && NIVEAUX[i].numeroChapitre === c) return i;
    return -1;
  }

  // ---------------------------------------------------------------
  //  Les sceaux
  // ---------------------------------------------------------------
  // Chaque sceau est rangé sous le nom de sa salle : « Le repère de Descartes|s0 »
  // pour la première stèle de pierre, « Le repère de Descartes|b0 » pour la
  // première stèle d'or, « La relation de Chasles|h0 » pour la première
  // stèle d'Hermès (elle ne compte pas parmi les sceaux affichés).
  function sorteDe(stele) { return stele.effet === "figure" ? "h" : (stele.bonus ? "b" : "s"); }
  function cleSceau(niveau, stele) { return niveau.nom + "|" + sorteDe(stele) + stele.numero; }
  function compterSceaux(bonus) {
    var total = 0, gagnes = 0;
    NIVEAUX.forEach(function (niv) {
      var liste = (bonus ? niv.bonus : niv.steles) || [];
      for (var i = 0; i < liste.length; i++) {
        total++;
        if (progression.sceaux[niv.nom + "|" + (bonus ? "b" : "s") + i]) gagnes++;
      }
    });
    return { gagnes: gagnes, total: total };
  }
  // Les sceaux d'or gagnés dans les salles ordinaires d'un chapitre :
  // ce sont eux qui ouvrent son sanctuaire secret.
  function sceauxOrDuChapitre(c) {
    var n = 0;
    NIVEAUX.forEach(function (niv) {
      if (niv.numeroChapitre !== c || niv.secrete) return;
      (niv.bonus || []).forEach(function (b, k) { if (progression.sceaux[niv.nom + "|b" + k]) n++; });
    });
    return n;
  }
  function seuilSanctuaire(c) {
    var chap = LISTE_CHAPITRES[c];
    return chap.sanctuaire ? (chap.sanctuaire.sceauxOr || 0) : 0;
  }
  function sanctuaireOuvert(c) {
    return !!LISTE_CHAPITRES[c].sanctuaire && sceauxOrDuChapitre(c) >= seuilSanctuaire(c);
  }

  // Une salle ordinaire s'ouvre quand la précédente est réussie ;
  // un sanctuaire secret, quand on a assez de sceaux d'or dans son chapitre.
  function salleAccessible(i) {
    if (estReussie(i)) return true;
    if (NIVEAUX[i].secrete) return sanctuaireOuvert(NIVEAUX[i].numeroChapitre);
    var k = precedenteNormale(i);
    return k < 0 || estReussie(k);
  }

  // La salle où reprendre : celle de la sauvegarde si elle est ouverte,
  // sinon la première salle ouverte qui n'est pas encore réussie.
  function salleDeDepart() {
    var i = progression.salleCourante ? indexDe(progression.salleCourante) : -1;
    if (i >= 0 && salleAccessible(i)) return i;
    for (var k = 0; k < NIVEAUX.length; k++) {
      if (!NIVEAUX[k].secrete && !estReussie(k) && salleAccessible(k)) return k;
    }
    return 0;
  }

  function pluriel(n, mot) { return n + " " + mot + (n > 1 ? "x" : ""); }

  function afficherSceaux() {
    var s = compterSceaux(false), b = compterSceaux(true);
    el.sceaux.hidden = s.total === 0;
    el.sceauxTexte.textContent = "Pierre " + s.gagnes + " / " + s.total;
    el.bonus.hidden = b.total === 0;
    el.bonusTexte.textContent = "Or " + b.gagnes + " / " + b.total;
    majParures();
  }

  function bilanTexte() {
    var s = compterSceaux(false), b = compterSceaux(true);
    return " Sceaux de pierre : " + s.gagnes + " / " + s.total + " · sceaux d'or : " + b.gagnes + " / " + b.total + ".";
  }

  // ---------------------------------------------------------------
  //  Les parures (gagnées avec les sceaux d'or)
  // ---------------------------------------------------------------
  function majParures() {
    var or = compterSceaux(true).gagnes;
    paruresPortees = {};
    LISTE_PARURES.forEach(function (p) {
      if (or >= p.sceauxOr && !progression.paruresRetirees[p.id]) paruresPortees[p.id] = true;
    });
  }

  // ---------------------------------------------------------------
  //  Les combats : cœurs, expérience et rangs de Talos
  // ---------------------------------------------------------------
  function rangDe(xp) {
    var r = 0;
    for (var i = 0; i < LISTE_RANGS.length; i++) if (xp >= LISTE_RANGS[i].xp) r = i;
    return r;
  }
  function coeursDuRang() { return LISTE_RANGS[rangDe(progression.xp)].coeurs || 3; }

  function majCompteursCombat() {
    if (!el.vie || !el.niveau) return;
    el.vie.hidden = !combatPossible;
    el.niveau.hidden = !combatPossible;
    el.vie.innerHTML = "";
    for (var i = 0; i < coeursMax; i++) {
      var c = document.createElement("span");
      c.className = i < coeurs ? "coeur plein" : "coeur";
      c.textContent = "♥";
      el.vie.appendChild(c);
    }
    el.vie.title = "Les cœurs de Talos : " + coeurs + " / " + coeursMax + ". Une erreur (ou un sablier vide) en fait perdre un, " +
      "chaque combat gagné en rend un. Sans cœur, Talos revient au départ de la salle.";
    el.vie.setAttribute("aria-label", "Cœurs de Talos : " + coeurs + " sur " + coeursMax);
    var r = rangDe(progression.xp), rang = LISTE_RANGS[r], suivant = LISTE_RANGS[r + 1];
    el.niveauTexte.textContent = rang.titre + " · " + progression.xp + " XP";
    el.niveau.title = "Le rang de Talos : " + rang.titre + " (" + progression.xp + " XP). " +
      (suivant ? "Rang suivant : " + suivant.titre + ", à " + suivant.xp + " XP." : "C'est le rang le plus haut !");
  }

  // Le monstre qui garde une stèle : celui choisi dans niveaux.js (monstre: "hydre"),
  // sinon les oiseaux de Stymphale pour une stèle d'or, le Sphinx dans un
  // sanctuaire, et pour les autres stèles de pierre, chacun son tour (rangs.js).
  function monstreDe(stele) {
    if (stele.monstre && Monstres.existe(stele.monstre)) return stele.monstre;
    if (stele.bonus) return "stymphale";
    if (NIVEAUX[numeroSalle].secrete) return "sphinx";
    var n = stele.numero || 0;
    for (var i = 0; i < numeroSalle; i++) if (!NIVEAUX[i].secrete) n += (NIVEAUX[i].steles || []).length;
    var id = ORDRE_MONSTRES[n % ORDRE_MONSTRES.length];
    return Monstres.existe(id) ? id : "minotaure";
  }

  // Talos gagne de l'expérience : son rang peut monter, et avec lui
  // le nombre de ses cœurs.
  function gagnerExperience(xp) {
    var rangAvant = rangDe(progression.xp);
    progression.xp += xp;
    var rangApres = rangDe(progression.xp);
    var nouveauMax = LISTE_RANGS[rangApres].coeurs || coeursMax;
    if (nouveauMax > coeursMax) { coeurs += nouveauMax - coeursMax; coeursMax = nouveauMax; }
    return { rangMonte: rangApres > rangAvant, rang: LISTE_RANGS[rangApres] };
  }

  // Le dernier coup du combat : la série continue, Talos regagne un cœur, et
  // l'expérience monte (la première fois que la stèle est résolue).
  function victoireCombat(stele, nouveauSceau) {
    serie += 1;
    var sansFaute = !(stele.erreurs > 0);
    parfaits = sansFaute ? parfaits + 1 : 0;
    var xp = 0, details = [];
    if (nouveauSceau) {
      xp = stele.boss ? (REGLES_XP.boss || REGLES_XP.pierre) : (stele.bonus ? REGLES_XP.or : REGLES_XP.pierre);
      if (sansFaute && REGLES_XP.sansFaute) {
        xp += REGLES_XP.sansFaute;
        details.push("Sans aucune erreur : +" + REGLES_XP.sansFaute);
      }
      var bonusSerie = Math.min(REGLES_XP.serieMax || 0, (REGLES_XP.serie || 0) * (serie - 1));
      if (bonusSerie > 0) {
        xp += bonusSerie;
        details.push("Série ×" + serie + " : +" + bonusSerie);
      }
    }
    var rang = gagnerExperience(xp);
    var soin = coeurs < coeursMax;
    if (soin) coeurs += 1;
    // Le coup final de Talos : la foudre d'Athéna tous les 3 combats gagnés sans
    // erreur d'affilée, le tir à l'arc contre les oiseaux des stèles d'or,
    // sinon un coup au hasard.
    var coup;
    if (parfaits > 0 && parfaits % 3 === 0) coup = "foudre";
    else if (stele.bonus) coup = "arc";
    else {
      var possibles = ["pirouette", "fente", "arc"].filter(function (c) { return c !== dernierCoup; });
      coup = possibles[Math.floor(Math.random() * possibles.length)];
    }
    dernierCoup = coup;
    majCompteursCombat();
    return { coup: coup, xp: xp, details: details, soin: soin, sansFaute: sansFaute, rangMonte: rang.rangMonte, rang: rang.rang };
  }

  function majBoutonSon() {
    if (!el.son) return;
    var actif = typeof Sons !== "undefined" && Sons.estActif();
    el.son.hidden = !combatPossible;
    el.son.textContent = actif ? "♪ Son" : "♪ Son coupé";
    el.son.setAttribute("aria-pressed", actif ? "true" : "false");
  }
  if (el.son) {
    el.son.addEventListener("click", function (e) {
      if (typeof Sons === "undefined") return;
      Sons.activer(!Sons.estActif());
      majBoutonSon();
      if (Sons.estActif()) Sons.jouer("sceau");
      e.currentTarget.blur();
    });
  }
  majBoutonSon();

  // ---------------------------------------------------------------
  //  Démarrer une salle
  // ---------------------------------------------------------------
  // Entre dans une salle. Au début d'un chapitre, Athéna le présente d'abord.
  function entrerDans(numero) {
    if (numero < 0) numero = 0;
    if (numero >= NIVEAUX.length) numero = NIVEAUX.length - 1;
    var niveau = NIVEAUX[numero];
    var chap = LISTE_CHAPITRES[niveau.numeroChapitre];
    if (!demarrerSalle(numero)) return;
    if (niveau.premiereDuChapitre && chap.introduction) {
      ouvrirFenetre(titreChapitre(niveau.numeroChapitre), "Athéna : « " + chap.introduction + " »",
        chap.prologue ? "Commencer" : "Entrer dans le chapitre", function () { enPause = false; });
    } else if (niveau.secrete) {
      ouvrirFenetre("Sanctuaire secret", "Athéna : « Tes sceaux d'or t'ont ouvert ce passage. Ici, les problèmes sont plus difficiles : prends ton temps, rien ne presse. »",
        "Entrer dans le sanctuaire", function () { enPause = false; });
    }
  }

  function demarrerSalle(numero) {
    if (numero < 0) numero = 0;
    if (numero >= NIVEAUX.length) numero = NIVEAUX.length - 1;
    numeroSalle = numero;

    var niveau = NIVEAUX[numero];
    el.chapitre.textContent = titreChapitre(niveau.numeroChapitre);
    etat = Moteur.chargerSalle(niveau);
    if (etat.erreur) {
      afficherErreur("Problème dans la salle « " + (niveau.nom || "sans nom") + " » de niveaux.js : " + etat.erreur);
      return false;
    }

    progression.salleCourante = niveau.nom;
    Sauvegarde.enregistrer(progression);
    // Les gardiens prennent leur place près de leurs stèles
    if (gardiensPossibles) {
      try { Gardiens.preparer(etat, monstreDe); } catch (err) { etat.gardiens = []; if (window.console) console.error(err); }
    }
    figureEnAttente = -1;

    var chap = LISTE_CHAPITRES[niveau.numeroChapitre];
    el.titre.textContent = niveau.secrete ? "Sanctuaire secret · " + niveau.nom
      : "Salle " + niveau.rang + " / " + chap.salles.length + " · " + (niveau.nom || "sans nom");
    el.athena.textContent = niveau.athena || niveau.message || "";
    remplirChoixSalles();
    afficherSceaux();
    // Talos entre dans la salle avec tous ses cœurs
    coeursMax = coeursDuRang();
    coeurs = coeursMax;
    majCompteursCombat();
    bulleAffichee = "";
    el.bulle.hidden = true;
    Dessin.ajuster(canvas, etat);
    Commandes.relacherTout();
    enPause = false;
    return true;
  }

  // ---------------------------------------------------------------
  //  La boucle du jeu : appelée à chaque image par le navigateur
  // ---------------------------------------------------------------
  var dernierInstant = null;
  var reserve = 0;

  function boucle(instant) {
    if (dernierInstant === null) dernierInstant = instant;
    var dt = Math.min((instant - dernierInstant) / 1000, 0.1);
    dernierInstant = instant;

    if (etat && !etat.erreur) {
      if (!enPause) {
        var entrees = Commandes.lire();
        reserve += dt;
        while (reserve >= PAS_DE_TEMPS && !enPause) {
          // pendant qu'un gardien bondit sur lui, Talos ne se dirige plus
          var bondit = gardiensPossibles && Gardiens.enAttaque(etat);
          var resultat = Moteur.avancer(etat, bondit ? {} : entrees, PAS_DE_TEMPS);
          entrees.saut = false; // l'appui sur « saut » ne compte qu'une fois
          reserve -= PAS_DE_TEMPS;
          if (resultat === "chute") chute();
          if (resultat === "sortie") salleReussie();
          if (gardiensPossibles && !enPause) {
            var attaquant = Gardiens.mettreAJour(etat, PAS_DE_TEMPS);
            if (attaquant >= 0) ouvrirStele(attaquant);
          }
        }
      } else {
        Commandes.lire();
        reserve = 0;
      }
      avancerChronos();
      var infos = {
        steleProche: Moteur.steleProche(etat),
        guideProche: Moteur.guideProche(etat),
        inscriptionProche: Moteur.inscriptionProche(etat),
        receptionProche: Moteur.receptionProche(etat),
        parures: paruresPortees,
        tps: mouvementReduit ? 8 : instant / 1000,
        mouvementReduit: mouvementReduit
      };
      if (el.ecranTitre.hidden) afficherBulle(infos.guideProche, infos.inscriptionProche);
      else afficherBulle(-1, -1);
      el.dalles.textContent = etat.nbDalles > 0
        ? "Dalles : " + Moteur.nbDallesAllumees(etat) + " / " + etat.nbDalles : "";
      // Pendant un combat, la salle (cachée derrière) ne se redessine pas.
      if (!areneOuverte) Dessin.dessiner(canvas, etat, infos);
    }
    window.requestAnimationFrame(boucle);
  }

  // ---------------------------------------------------------------
  //  Bulle : la parole d'un mathématicien, ou une inscription d'Athéna,
  //  qui s'affiche quand Talos s'approche
  // ---------------------------------------------------------------
  var bulleAffichee = "";
  function afficherBulle(guide, inscription) {
    var cle = guide >= 0 ? "g" + guide : (inscription >= 0 ? "i" + inscription : "");
    if (cle === bulleAffichee) return;
    bulleAffichee = cle;
    if (cle === "") { el.bulle.hidden = true; return; }
    if (guide >= 0) {
      var p = etat.guides[guide].philosophe || {};
      el.bulleNom.textContent = p.nom || "";
      el.bulleTexte.textContent = p.texte || "";
      el.bulle.className = "";
    } else {
      var ins = etat.inscriptions[inscription].inscription || {};
      el.bulleNom.textContent = ins.titre ? "Inscription d'Athéna · " + ins.titre : "Inscription d'Athéna";
      el.bulleTexte.textContent = ins.texte || "";
      el.bulle.className = "inscription";
    }
    el.bulle.hidden = false;
  }

  // ---------------------------------------------------------------
  //  Stèles : les exercices
  // ---------------------------------------------------------------
  // La touche E : lire la stèle toute proche, ou refaire la figure
  // acrobatique d'une stèle d'Hermès déjà résolue (depuis la stèle ou
  // depuis sa réception, le cercle ailé).
  function quandInteragir() {
    if (enPause || !etat || etat.erreur || etat.figure) return;
    if (gardiensPossibles && Gardiens.enAttaque(etat)) return;
    var i = Moteur.steleProche(etat);
    if (i >= 0) {
      if (etat.steles[i].effet === "figure" && etat.steles[i].resolue) lancerFigure(i, false);
      else ouvrirStele(i);
      return;
    }
    var r = Moteur.receptionProche(etat);
    if (r >= 0) lancerFigure(r, true);
  }

  function lancerFigure(i, retour) {
    if (!Moteur.lancerFigure(etat, i, retour)) return;
    if (typeof Sons !== "undefined") Sons.jouer("envol");
    afficherAvis(etat.steles[i].nomFigure + " !");
  }

  // ---------------------------------------------------------------
  //  Les manches d'un combat
  // ---------------------------------------------------------------
  // Avec 3 exercices : l'attaque, l'esquive, le coup final.
  // Avec 5 (un boss) : attaque, esquive, attaque, esquive, coup final.
  function typeManche(k, n) { return k >= n - 1 ? "final" : (k % 2 === 0 ? "attaque" : "esquive"); }
  var NOMS_MANCHES = { attaque: "L'attaque", esquive: "L'esquive", final: "Le coup final" };
  var CONSIGNES_MANCHES = {
    attaque: "une bonne réponse, et Talos frappe.",
    esquive: "QUI va frapper ; une bonne réponse, et Talos esquive.",
    final: "une bonne réponse, et QUI est changé en pierre."
  };

  function enMinutes(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), r = sec % 60;
    return m > 0 ? m + " min" + (r ? " " + r + " s" : "") : r + " s";
  }

  // Remplit le parchemin avec l'exercice en cours de la stèle
  function remplirExercice(s) {
    var ex = s.exercice;
    var n = s.exercices.length, k = s.manche || 0;
    el.steleTitre.textContent = ex.titre || (s.effet === "figure" ? "Le problème d'Hermès" : (s.bonus ? "Automatisme" : "Exercice"));
    el.steleEnonce.textContent = ex.enonce || "";
    el.steleUnite.textContent = ex.unite || "";
    el.steleIndice.hidden = true;
    el.steleIndice.textContent = ex.indice ? "Indice : " + ex.indice : "";
    el.steleExplication.hidden = true;
    el.steleExplication.textContent = ex.explication ? "Correction : " + ex.explication : "";
    el.steleRetour.textContent = "";
    el.steleRetour.className = "retour";
    el.steleContexte.hidden = !s.contexte;
    el.steleContexte.textContent = s.contexte ? "Le problème : " + s.contexte : "";
    // La ligne de la manche (et le sablier, à droite)
    var texte = "";
    if (!s.resolue) {
      if (s.effet === "figure") texte = "Récompense : " + (s.nomFigure || "une figure acrobatique").toLowerCase() + " jusqu'au cercle ailé";
      else if (n > 1) {
        var type = typeManche(k, n);
        texte = (s.boss ? "Question " : "Manche ") + (k + 1) + " / " + n + " · " + NOMS_MANCHES[type] +
          (areneOuverte ? " : " + CONSIGNES_MANCHES[type].replace("QUI", s.boss ? "le boss" : "le gardien") : "");
      }
    }
    el.steleManche.textContent = texte;
    el.steleMancheLigne.hidden = !texte && !s.chrono;
    el.steleValider.textContent = "Graver";
  }

  function ouvrirStele(i) {
    var s = etat.steles[i];
    var ex = s.exercice;
    steleOuverte = i;
    enPause = true;
    Commandes.relacherTout();
    dejaResolue = !!s.resolue;
    mancheEnAttente = false;

    // Le combat : une stèle pas encore résolue est gardée par un monstre
    // (pas les stèles d'Hermès)
    areneOuverte = combatPossible && !s.resolue && s.effet !== "figure";
    enCombat = false;
    koEnAttente = false;
    erreursStele = 0;

    var n = s.exercices.length;
    el.stele.classList.toggle("doree", !!s.bonus);
    el.stele.classList.toggle("boss", !!s.boss);
    el.stele.classList.toggle("hermes", s.effet === "figure");
    el.steleNote.className = "note-or" + (s.boss ? " boss" : (s.effet === "figure" ? " hermes" : ""));
    if (s.effet === "figure") {
      el.steleSurTitre.textContent = "Stèle d'Hermès · figure acrobatique";
      el.steleNote.textContent = "Résous ce problème, et les sandales d'Hermès permettront à Talos de franchir l'obstacle d'un " +
        (s.nomFigure || "salto").toLowerCase() + ". Ici, une erreur ne coûte pas de cœur.";
    } else if (s.boss) {
      el.steleSurTitre.textContent = "Le boss du chapitre · " + s.boss;
      el.steleNote.textContent = "";
    } else if (s.bonus) {
      el.steleSurTitre.textContent = "Stèle d'or · automatisme";
      el.steleNote.textContent = "Facultatif : cette stèle n'ouvre pas la porte. Son sceau d'or fait gagner des parures à Talos et ouvre le sanctuaire secret du chapitre.";
    } else {
      el.steleSurTitre.textContent = "Stèle de pierre · exercice";
      el.steleNote.textContent = "";
    }
    el.steleNote.hidden = !el.steleNote.textContent || s.resolue;
    el.steleRegle.textContent = s.boss ? "Un problème type contrôle en " + n + " questions" +
        (dureeManche(s) ? ", " + enMinutes(dureeManche(s)) + " par question" : "") + ". Erreur ou sablier vide : Talos perd un cœur."
      : n >= 5 ? "Chaque bonne réponse frappe le gardien ou esquive ses coups. Erreur ou sablier vide : Talos perd un cœur."
      : (n > 1 ? "En " + n + " manches : l'attaque, l'esquive, puis le coup final. Erreur ou sablier vide : Talos perd un cœur."
      : "Bonne réponse : Talos terrasse le gardien. Erreur ou sablier vide : il perd un cœur.");

    // Le sablier : il reprend là où il en était si l'on avait fui ce combat
    if (!s.resolue) lancerChrono(s, false);
    remplirExercice(s);

    if (s.resolue) {
      el.steleReponse.value = String(ex.reponse).replace(".", ",");
      el.steleReponse.disabled = true;
      el.steleValider.disabled = true;
      el.steleRetour.textContent = "Cette stèle est déjà résolue.";
      el.steleRetour.className = "retour juste";
      el.steleExplication.hidden = !ex.explication;
    } else {
      el.steleReponse.value = "";
      el.steleReponse.disabled = false;
      el.steleValider.disabled = false;
    }
    el.stele.classList.toggle("sans-arene", !areneOuverte);
    el.steleRegle.hidden = !areneOuverte;
    el.stele.hidden = false;
    if (areneOuverte) {
      try {
        Combat.ouvrir(el.arene, {
          monstre: monstreDe(s), bonus: !!s.bonus, parures: paruresPortees, coeurs: coeurs, coeursMax: coeursMax,
          rangs: LISTE_RANGS, xp: progression.xp, serie: serie, reduit: mouvementReduit,
          manches: n, manche: s.manche || 0, boss: s.boss || ""
        });
      } catch (err) {
        // Si l'arène ne s'ouvre pas, la stèle marche comme avant.
        areneOuverte = false;
        el.stele.classList.add("sans-arene");
        el.steleRegle.hidden = true;
        remplirExercice(s);
        if (window.console) console.error(err);
      }
    }
    if (gardiensPossibles && !dejaResolue) Gardiens.commencerCombat(etat, i);
    afficherChrono();
    if (!s.resolue) el.steleReponse.focus(); else el.steleFermer.focus();
  }

  // ---------------------------------------------------------------
  //  Le sablier : le temps pour répondre à chaque manche (rangs.js)
  // ---------------------------------------------------------------
  // Chaque stèle garde son sablier (stele.chrono) : il continue de couler
  // quand on fuit le combat, et même quand l'onglet du navigateur est caché
  // (on compte avec l'horloge de l'ordinateur). Il s'arrête seulement
  // pendant les animations du combat.
  function dureeManche(s) {
    if (!REGLES_TEMPS.actif) return 0;
    var ex = s.exercice || {};
    var coef = typeof REGLES_TEMPS.coefficient === "number" && REGLES_TEMPS.coefficient > 0 ? REGLES_TEMPS.coefficient : 1;
    var sec;
    if (typeof ex.temps === "number" && ex.temps > 0) sec = ex.temps;
    else if (s.effet === "figure") sec = REGLES_TEMPS.hermes;
    else if (s.boss) sec = REGLES_TEMPS.boss;
    else if (s.bonus) sec = REGLES_TEMPS.automatisme;
    else {
      var type = typeManche(s.manche || 0, s.exercices.length);
      sec = type === "final" ? REGLES_TEMPS.coupFinal : REGLES_TEMPS[type];
    }
    sec = Number(sec) || 0;
    return sec > 0 ? sec * coef : 0;
  }

  // Un sablier plein (neuf) ou, s'il coulait déjà pour cette manche, on le reprend.
  function lancerChrono(s, neuf) {
    var duree = dureeManche(s);
    if (!duree) { s.chrono = null; return; }
    if (neuf || !s.chrono || s.chrono.manche !== (s.manche || 0)) {
      s.chrono = { manche: s.manche || 0, duree: duree, restant: duree * 1000, dernier: Date.now() };
    }
    graceChrono = Date.now() + 900;
    dernierTic = -1;
  }

  function avancerChronos() {
    if (!etat || etat.erreur) return;
    var maintenant = Date.now();
    for (var i = 0; i < etat.steles.length; i++) {
      var c = etat.steles[i].chrono;
      if (!c) continue;
      var ecoule = maintenant - c.dernier;
      c.dernier = maintenant;
      // pendant une animation du combat, le sable ne coule pas
      if (i === steleOuverte && (enCombat || mancheEnAttente || koEnAttente)) continue;
      c.restant -= ecoule;
    }
    if (steleOuverte < 0) return;
    afficherChrono();
    var s = etat.steles[steleOuverte];
    if (s.chrono && !s.resolue && s.chrono.restant <= 0 && maintenant >= graceChrono &&
        !enCombat && !mancheEnAttente && !koEnAttente) sablierVide();
  }

  function afficherChrono() {
    var s = steleOuverte >= 0 ? etat.steles[steleOuverte] : null;
    var c = s && !s.resolue ? s.chrono : null;
    if (!c) {
      el.steleChrono.hidden = true;
      el.steleMancheLigne.hidden = !el.steleManche.textContent;
      if (areneOuverte) Combat.chrono(null);
      return;
    }
    var sec = Math.max(0, Math.ceil(c.restant / 1000));
    var texte = Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);
    el.steleMancheLigne.hidden = false;
    el.steleChrono.hidden = false;
    if (el.steleChrono.textContent !== "⏳ " + texte) el.steleChrono.textContent = "⏳ " + texte;
    el.steleChrono.classList.toggle("urgent", sec <= 15);
    el.steleChrono.title = "Le temps pour répondre à cette manche (" + enMinutes(c.duree) + ").";
    if (areneOuverte) Combat.chrono(Math.max(0, Math.min(1, c.restant / (c.duree * 1000))), sec, texte);
    // les dernières secondes : un petit tic à chaque seconde
    if (sec <= 10 && sec > 0 && sec !== dernierTic && !enCombat && !mancheEnAttente) {
      dernierTic = sec;
      if (typeof Sons !== "undefined") Sons.jouer("tic");
    }
  }

  // Le sablier est vide : cela compte comme une erreur, puis la manche
  // recommence avec un sablier plein.
  function sablierVide() {
    var i = steleOuverte, stele = etat.steles[i];
    Moteur.tempsEcoule(etat, i);
    stele.chrono = null;
    var texte = "Le sablier est vide !";
    if (areneOuverte) {
      erreursStele += 1;
      serie = 0;
      coeurs = Math.max(0, coeurs - 1);
      var ko = coeurs === 0;
      majCompteursCombat();
      if (ko) {
        koEnAttente = true;
        texte += " Le gardien frappe, et Talos n'a plus de cœur ! Athéna le ramène au départ de la salle. Les stèles déjà résolues le restent.";
        el.steleReponse.disabled = true;
      } else {
        texte += " Le gardien frappe : Talos perd un cœur (il lui en reste " + coeurs + "). Un nouveau sablier commence.";
      }
      enCombat = true;
      el.steleValider.disabled = true;
      Combat.degat({ coeurs: coeurs, ko: ko, tempsEcoule: true }, function () {
        enCombat = false;
        if (ko) { fermerStele(); return; }
        if (steleOuverte !== i) return;
        lancerChrono(stele, true);
        el.steleValider.disabled = false;
        el.steleReponse.focus();
        el.steleReponse.select();
      });
    } else {
      if (typeof Sons !== "undefined") Sons.jouer("gong");
      texte += " Un nouveau sablier commence : relis l'indice et réessaie.";
      lancerChrono(stele, true);
    }
    el.steleRetour.textContent = texte;
    el.steleRetour.className = "retour faux";
    if (stele.exercice.indice) el.steleIndice.hidden = false;
  }

  // Ferme l'arène (sans rien décider)
  function cacherArene() {
    if (combatPossible) Combat.fermer();
    areneOuverte = false;
    enCombat = false;
  }

  // Fermer la stèle. Si le combat n'est pas fini, c'est une fuite : le
  // monstre garde ses blessures, et le sablier continue de couler.
  function fermerStele() {
    var i = steleOuverte;
    var s = i >= 0 && etat ? etat.steles[i] : null;
    cacherArene();
    el.stele.hidden = true;
    steleOuverte = -1;
    mancheEnAttente = false;
    el.steleReponse.blur();
    Commandes.relacherTout();
    enPause = false;
    if (s && gardiensPossibles && !dejaResolue) Gardiens.apresCombat(etat, i, s.resolue ? "victoire" : (koEnAttente ? "ko" : "fuite"));
    if (koEnAttente) {
      // Talos était à terre : Athéna le ramène au départ, avec tous ses cœurs.
      koEnAttente = false;
      if (s) s.chrono = null;
      Moteur.placerAuDepart(etat);
      if (gardiensPossibles) Gardiens.reinitialiser(etat);
      coeurs = coeursMax;
      majCompteursCombat();
      afficherAvis("Talos est à terre ! Athéna le ramène au départ de la salle, avec tous ses cœurs.");
    }
    // Une stèle d'Hermès vient d'être résolue : Talos s'élance
    if (figureEnAttente >= 0) {
      var k = figureEnAttente;
      figureEnAttente = -1;
      lancerFigure(k, false);
    }
  }

  // La manche suivante : le nouvel exercice, et un sablier plein
  function mancheSuivante() {
    var stele = etat.steles[steleOuverte];
    mancheEnAttente = false;
    lancerChrono(stele, true);
    remplirExercice(stele);
    el.steleReponse.value = "";
    el.steleReponse.disabled = false;
    el.steleValider.disabled = false;
    if (areneOuverte) Combat.annoncerManche();
    afficherChrono();
    el.steleReponse.focus();
  }

  el.steleForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (steleOuverte < 0 || enCombat || koEnAttente) return;
    if (mancheEnAttente) { mancheSuivante(); return; }
    var stele = etat.steles[steleOuverte];
    if (stele.resolue) return;
    var ex = stele.exercice;
    var r = Moteur.proposerReponse(etat, steleOuverte, el.steleReponse.value);

    if (r.valeur === null) {
      el.steleRetour.textContent = "Écrivez un nombre, par exemple 8, 2,5 ou 7/3.";
      el.steleRetour.className = "retour faux";
      return;
    }

    // Une manche gagnée, mais le combat continue : Talos frappe ou esquive
    if (r.juste && !r.finie) {
      serie += 1;
      stele.chrono = null;
      mancheEnAttente = true;
      var typeGagne = typeManche(r.manche, r.total);
      el.steleRetour.textContent = typeGagne === "esquive" ? (stele.boss ? "Juste ! Talos esquive l'attaque du boss." : "Juste ! Talos esquive l'attaque du gardien.") :
        (stele.boss ? "Juste ! Talos frappe le boss." : "Juste ! Talos frappe le gardien.");
      el.steleRetour.className = "retour juste";
      el.steleExplication.hidden = !ex.explication;
      el.steleIndice.hidden = true;
      el.steleReponse.disabled = true;
      el.steleValider.textContent = (stele.boss ? "Question suivante" : "Manche suivante") + " (Entrée)";
      el.steleChrono.hidden = true;
      if (areneOuverte) {
        Combat.chrono(null);
        enCombat = true;
        el.steleValider.disabled = true;
        Combat.manche({ serie: serie }, function () {
          enCombat = false;
          if (steleOuverte < 0 || !mancheEnAttente) return;
          el.steleValider.disabled = false;
          el.steleValider.focus();
        });
      } else {
        el.steleValider.disabled = false;
        el.steleValider.focus();
      }
      return;
    }

    // Une stèle d'Hermès résolue : la figure acrobatique part quand on ferme
    if (r.juste && stele.effet === "figure") {
      var niv = NIVEAUX[numeroSalle];
      var cleH = cleSceau(niv, stele);
      var premiere = !progression.sceaux[cleH];
      progression.sceaux[cleH] = true;
      var xpH = premiere ? (REGLES_XP.figure || 0) : 0;
      var rangH = gagnerExperience(xpH);
      Sauvegarde.enregistrer(progression);
      majCompteursCombat();
      stele.chrono = null;
      figureEnAttente = steleOuverte;
      el.steleRetour.textContent = "Juste ! Les ailes d'Hermès s'éveillent." + (xpH ? " Talos gagne " + xpH + " XP." : "") +
        (rangH.rangMonte ? " Nouveau rang : " + rangH.rang.titre + " !" : "") +
        " Fermez la stèle : Talos s'élance (" + (stele.nomFigure || "salto").toLowerCase() + "). Ensuite, la touche E devant la stèle ou sur le cercle ailé refait la figure, à l'aller comme au retour.";
      el.steleRetour.className = "retour juste";
      el.steleExplication.hidden = !ex.explication;
      el.steleIndice.hidden = true;
      el.steleReponse.disabled = true;
      el.steleValider.disabled = true;
      afficherChrono();
      if (typeof Sons !== "undefined") Sons.jouer("sceau");
      el.steleFermer.focus();
      return;
    }

    if (r.juste) {
      var niveau = NIVEAUX[numeroSalle];
      var cle = cleSceau(niveau, stele);
      var nouveauSceau = !progression.sceaux[cle];
      var orAvant = compterSceaux(true).gagnes, chapAvant = sceauxOrDuChapitre(niveau.numeroChapitre);
      progression.sceaux[cle] = true;
      var gain = areneOuverte ? victoireCombat(stele, nouveauSceau) : null;
      Sauvegarde.enregistrer(progression);
      afficherSceaux();
      if (stele.bonus) annoncerRecompenses(orAvant, chapAvant, niveau);
      stele.chrono = null;
      var effet = stele.bonus ? "" : (stele.effet === "passerelle" ? " La passerelle se construit." :
                  (etat.porteOuverte ? " La porte s'ouvre." : ""));
      var debut = !areneOuverte ? "Juste !" : (stele.boss ? "Juste ! Le boss est changé en pierre, et sa stèle s'allume." :
                  (stele.bonus ? "Juste ! Les oiseaux de bronze sont changés en pierre, et la stèle d'or s'allume." :
                  "Juste ! Le gardien est changé en pierre, et sa stèle s'allume."));
      var texteSceau = !nouveauSceau ? debut + " (Le sceau de cette stèle était déjà à vous.)"
        : debut + (stele.bonus ? " Vous gagnez un sceau d'or." : " Vous gagnez un sceau de pierre.");
      var texteXP = gain && gain.xp ? " Talos gagne " + gain.xp + " XP." : "";
      var texteRang = gain && gain.rangMonte ? " Nouveau rang : " + gain.rang.titre + " !" : "";
      el.steleRetour.textContent = texteSceau + texteXP + texteRang + effet;
      el.steleRetour.className = "retour juste";
      if (gain) {
        enCombat = true;
        Combat.victoire({
          coup: gain.coup, xpApres: progression.xp, coeurs: coeurs, coeursMax: coeursMax, soin: gain.soin,
          serie: serie, sansFaute: gain.sansFaute, details: gain.details, nouveauSceau: nouveauSceau
        }, function () { enCombat = false; });
      }
      el.steleExplication.hidden = !ex.explication;
      el.steleIndice.hidden = true;
      el.steleReponse.disabled = true;
      el.steleValider.disabled = true;
      afficherChrono();
      el.steleFermer.focus();
      return;
    }

    var texte = "Ce n'est pas la bonne réponse.";
    var iErreur = steleOuverte;
    if (ex.effet === "passerelle" && !stele.bonus) {
      texte += " Une passerelle de " + Math.round(r.valeur) + " case(s) ne relierait pas les deux bords : fermez la stèle pour la voir.";
    }
    if (areneOuverte) {
      // Le gardien frappe : Talos perd un cœur
      erreursStele += 1;
      serie = 0;
      coeurs = Math.max(0, coeurs - 1);
      var ko = coeurs === 0;
      majCompteursCombat();
      if (ko) {
        koEnAttente = true;
        texte = "Ce n'est pas la bonne réponse, et Talos n'a plus de cœur ! Athéna le ramène au départ de la salle. " +
          "Les stèles déjà résolues le restent.";
        el.steleReponse.disabled = true;
      } else {
        texte += " Le gardien frappe : Talos perd un cœur (il lui en reste " + coeurs + ").";
      }
      enCombat = true;
      el.steleValider.disabled = true;
      Combat.degat({ coeurs: coeurs, ko: ko }, function () {
        enCombat = false;
        if (ko) { fermerStele(); return; }
        if (steleOuverte !== iErreur) return;
        lancerChrono(stele, true);    // un nouvel essai : un sablier plein
        el.steleValider.disabled = false;
        el.steleReponse.focus();
        el.steleReponse.select();
      });
    } else {
      lancerChrono(stele, true);
      if (stele.effet === "figure") texte += " Ici, une erreur ne coûte pas de cœur : relis l'indice et réessaie.";
    }
    el.steleRetour.textContent = texte;
    el.steleRetour.className = "retour faux";
    if (ex.indice) el.steleIndice.hidden = false;
    if (!koEnAttente) el.steleReponse.select();
  });

  el.steleFermer.addEventListener("click", fermerStele);
  el.stele.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { e.preventDefault(); fermerStele(); }
  });

  // Après un sceau d'or : une nouvelle parure ? un sanctuaire qui s'ouvre ?
  function annoncerRecompenses(orAvant, chapAvant, niveau) {
    var orApres = compterSceaux(true).gagnes;
    LISTE_PARURES.forEach(function (p) {
      if (orAvant < p.sceauxOr && orApres >= p.sceauxOr) {
        afficherToast("Nouvelle parure : " + p.nom + " ! Talos la porte déjà. Le bouton « Parures » permet de la retirer.");
      }
    });
    var c = niveau.numeroChapitre, chap = LISTE_CHAPITRES[c];
    if (chap.sanctuaire && !niveau.secrete) {
      var seuil = seuilSanctuaire(c), apres = sceauxOrDuChapitre(c);
      if (chapAvant < seuil && apres >= seuil) {
        afficherToast("Un passage secret s'est ouvert : « " + chap.sanctuaire.salle.nom + " » t'attend à la fin du chapitre.");
        remplirChoixSalles();
      }
    }
  }

  function afficherToast(texte) {
    var t = document.createElement("div");
    t.className = "toast";
    t.textContent = texte;
    el.toasts.appendChild(t);
    setTimeout(function () { t.classList.add("partir"); }, 5200);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 5800);
  }

  // ---------------------------------------------------------------
  //  Événements de la salle
  // ---------------------------------------------------------------
  function chute() {
    // Retour au point de départ ; les dalles et les stèles résolues restent acquises.
    Moteur.placerAuDepart(etat);
    afficherAvis("Talos est tombé. Retour au point de départ.");
  }

  function recommencer() {
    if (enPause) return;
    demarrerSalle(numeroSalle);
  }

  function salleReussie() {
    enPause = true;
    var niveau = NIVEAUX[numeroSalle];
    var c = niveau.numeroChapitre, chap = LISTE_CHAPITRES[c];
    if (!estReussie(numeroSalle)) progression.reussies.push(niveau.nom);
    var suivante = prochaineNormale(numeroSalle);
    progression.salleCourante = suivante >= 0 ? NIVEAUX[suivante].nom : niveau.nom;
    Sauvegarde.enregistrer(progression);
    remplirChoixSalles();

    var bilan = bilanTexte();
    var versSuivante = function () { entrerDans(suivante); };
    var finDuTemple = function () {
      ouvrirFenetre("Le temple est accompli",
        "Athéna : « Tu as parcouru toutes les salles ouvertes pour l'instant. D'autres viendront. »" + bilan,
        "Rejouer depuis le début", function () { entrerDans(0); });
    };

    if (niveau.secrete) {
      if (suivante < 0) { finDuTemple(); return; }
      ouvrirFenetre("Sanctuaire accompli",
        "Athéna : « Tu as percé le secret de ce sanctuaire. Peu d'esprits vont aussi loin. »" + bilan,
        "Chapitre suivant", versSuivante);
      return;
    }
    if (!niveau.derniereNormale) {
      ouvrirFenetre("Salle franchie", "La porte de bronze s'est refermée derrière toi." + bilan,
        "Salle suivante (Entrée)", versSuivante);
      return;
    }

    // La dernière salle d'un chapitre
    var conclusion = "Athéna : « " + (chap.conclusion || "Tu as franchi toutes les salles de ce chapitre.") + " »";
    if (chap.prologue) {
      if (suivante < 0) { finDuTemple(); return; }
      ouvrirFenetre("Prologue accompli", conclusion, "Commencer le chapitre I", versSuivante);
      return;
    }
    if (chap.sanctuaire) {
      var iSecrete = indexSanctuaire(c);
      if (sanctuaireOuvert(c)) {
        ouvrirFenetre("Chapitre accompli",
          conclusion + " Tes sceaux d'or ont ouvert un passage secret : « " + chap.sanctuaire.salle.nom + " »." + bilan,
          "Entrer dans le sanctuaire", function () { entrerDans(iSecrete); },
          suivante >= 0 ? "Chapitre suivant" : null, suivante >= 0 ? versSuivante : null);
      } else {
        var manque = seuilSanctuaire(c) - sceauxOrDuChapitre(c);
        ouvrirFenetre("Chapitre accompli",
          conclusion + " Un sanctuaire secret se cache dans ce chapitre : il te manque " + pluriel(manque, "sceau") +
          " d'or pour l'ouvrir. Tu peux rejouer les salles du chapitre (liste déroulante en haut) pour résoudre leurs stèles d'or." + bilan,
          suivante >= 0 ? "Chapitre suivant" : "Rejouer depuis le début", suivante >= 0 ? versSuivante : function () { entrerDans(0); });
      }
      return;
    }
    if (suivante < 0) { finDuTemple(); return; }
    ouvrirFenetre("Chapitre accompli", conclusion + bilan, "Chapitre suivant (Entrée)", versSuivante);
  }

  function afficherAvis(texte) {
    el.avis.textContent = texte;
    el.avis.hidden = false;
    clearTimeout(minuteurAvis);
    minuteurAvis = setTimeout(function () { el.avis.hidden = true; }, 2200);
  }

  // ---------------------------------------------------------------
  //  Fenêtre de message (un ou deux boutons)
  // ---------------------------------------------------------------
  function ouvrirFenetre(titre, texte, libelleBouton, action, libelleBouton2, action2) {
    enPause = true;
    Commandes.relacherTout();
    el.fenetreTitre.textContent = titre;
    el.fenetreTexte.textContent = texte;
    el.fenetreBouton.textContent = libelleBouton || "";
    el.fenetreBouton.hidden = !action;
    el.fenetreBouton2.textContent = libelleBouton2 || "";
    el.fenetreBouton2.hidden = !action2;
    actionFenetre = action;
    actionFenetre2 = action2 || null;
    el.fenetre.hidden = false;
    if (action) el.fenetreBouton.focus();
  }

  el.fenetreBouton.addEventListener("click", function () {
    el.fenetre.hidden = true;
    if (actionFenetre) actionFenetre();
  });
  el.fenetreBouton2.addEventListener("click", function () {
    el.fenetre.hidden = true;
    if (actionFenetre2) actionFenetre2();
  });

  function afficherErreur(texte) {
    ouvrirFenetre("Erreur dans les niveaux", texte, null, null);
  }

  // ---------------------------------------------------------------
  //  Le panneau des parures et des sanctuaires
  // ---------------------------------------------------------------
  var pauseAvantParures = false;

  function ouvrirParures() {
    if (!el.stele.hidden || !el.fenetre.hidden || !el.ecranTitre.hidden) return;
    pauseAvantParures = enPause;
    enPause = true;
    Commandes.relacherTout();
    remplirParures();
    el.parures.hidden = false;
    el.paruresFermer.focus();
  }

  function fermerParures() {
    el.parures.hidden = true;
    enPause = pauseAvantParures;
    Commandes.relacherTout();
    el.boutonParures.blur();
  }

  function remplirParures() {
    var b = compterSceaux(true);
    el.paruresCompte.textContent = b.gagnes + " / " + b.total;
    el.paruresListe.innerHTML = "";
    LISTE_PARURES.forEach(function (p) {
      var ouverte = b.gagnes >= p.sceauxOr;
      var li = document.createElement("li");
      li.className = "parure " + (ouverte ? "ouverte" : "fermee");
      var signe = document.createElement("span");
      signe.className = "pastille";
      signe.textContent = ouverte ? "✦" : p.sceauxOr;
      signe.title = p.sceauxOr + " sceau(x) d'or";
      var texte = document.createElement("div");
      var nom = document.createElement("strong");
      nom.textContent = p.nom;
      var desc = document.createElement("small");
      desc.textContent = p.description || "";
      texte.appendChild(nom);
      texte.appendChild(desc);
      li.appendChild(signe);
      li.appendChild(texte);
      if (ouverte) {
        var bouton = document.createElement("button");
        bouton.type = "button";
        bouton.textContent = progression.paruresRetirees[p.id] ? "Porter" : "Retirer";
        bouton.addEventListener("click", function () {
          if (progression.paruresRetirees[p.id]) delete progression.paruresRetirees[p.id];
          else progression.paruresRetirees[p.id] = true;
          Sauvegarde.enregistrer(progression);
          majParures();
          remplirParures();
        });
        li.appendChild(bouton);
      } else {
        var manque = document.createElement("span");
        manque.className = "manque";
        manque.textContent = "Encore " + pluriel(p.sceauxOr - b.gagnes, "sceau") + " d'or";
        li.appendChild(manque);
      }
      el.paruresListe.appendChild(li);
    });

    el.sanctuairesListe.innerHTML = "";
    LISTE_CHAPITRES.forEach(function (chap, c) {
      if (!chap.sanctuaire || !chap.sanctuaire.salle) return;
      var li = document.createElement("li");
      var i = indexSanctuaire(c);
      var gagnes = sceauxOrDuChapitre(c), seuil = seuilSanctuaire(c);
      var etatTexte = estReussie(i) ? "accompli ✓" : (sanctuaireOuvert(c) ? "ouvert" :
        "fermé : encore " + pluriel(seuil - gagnes, "sceau") + " d'or dans ce chapitre (" + gagnes + " / " + seuil + ")");
      li.textContent = libelleChapitre(c) + " · « " + chap.sanctuaire.salle.nom + " » : " + etatTexte;
      el.sanctuairesListe.appendChild(li);
    });
  }

  el.boutonParures.addEventListener("click", ouvrirParures);
  el.paruresFermer.addEventListener("click", fermerParures);
  el.parures.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { e.preventDefault(); fermerParures(); }
  });

  // ---------------------------------------------------------------
  //  Liste déroulante « Aller à la salle »
  // ---------------------------------------------------------------
  function remplirChoixSalles() {
    el.choix.innerHTML = "";
    var groupe = null;
    NIVEAUX.forEach(function (niveau, i) {
      if (niveau.premiereDuChapitre) {
        groupe = document.createElement("optgroup");
        groupe.label = libelleChapitre(niveau.numeroChapitre);
        el.choix.appendChild(groupe);
      }
      var option = document.createElement("option");
      option.value = i;
      var coche = estReussie(i) ? " ✓" : "";
      var ouverte = salleAccessible(i);
      if (niveau.secrete) {
        var c = niveau.numeroChapitre;
        option.textContent = ouverte ? "✦ Sanctuaire secret : " + niveau.nom + coche
          : "✦ Sanctuaire secret (encore " + pluriel(seuilSanctuaire(c) - sceauxOrDuChapitre(c), "sceau") + " d'or)";
      } else {
        option.textContent = (niveau.nom || "sans nom") + coche;
      }
      option.disabled = !ouverte;
      if (i === numeroSalle) option.selected = true;
      (groupe || el.choix).appendChild(option);
    });
  }

  el.choix.addEventListener("change", function () {
    cacherArene();
    koEnAttente = false;
    mancheEnAttente = false;
    steleOuverte = -1;
    el.stele.hidden = true;
    el.fenetre.hidden = true;
    el.parures.hidden = true;
    entrerDans(parseInt(el.choix.value, 10));
    el.choix.blur();
  });

  $("bouton-recommencer").addEventListener("click", function (e) {
    if (!el.stele.hidden || !el.fenetre.hidden || !el.parures.hidden || !el.ecranTitre.hidden) return;
    demarrerSalle(numeroSalle);
    e.currentTarget.blur();
  });

  // Effacer la progression : il faut cliquer deux fois.
  var boutonEffacer = $("bouton-effacer");
  var attenteConfirmation = null;
  boutonEffacer.addEventListener("click", function () {
    if (attenteConfirmation) {
      clearTimeout(attenteConfirmation);
      attenteConfirmation = null;
      boutonEffacer.textContent = "Effacer la progression";
      progression = Sauvegarde.effacer();
      cacherArene();
      koEnAttente = false;
      mancheEnAttente = false;
      parfaits = 0;
      serie = 0;
      steleOuverte = -1;
      el.stele.hidden = true;
      el.fenetre.hidden = true;
      el.parures.hidden = true;
      entrerDans(0);
    } else {
      boutonEffacer.textContent = "Cliquez encore pour confirmer";
      attenteConfirmation = setTimeout(function () {
        attenteConfirmation = null;
        boutonEffacer.textContent = "Effacer la progression";
      }, 4000);
    }
    boutonEffacer.blur();
  });

  window.addEventListener("resize", function () {
    if (etat && !etat.erreur) Dessin.ajuster(canvas, etat);
    if (areneOuverte) Combat.redimensionner();
  });

  // ---------------------------------------------------------------
  //  L'écran de titre, puis le début du jeu
  // ---------------------------------------------------------------
  // La salle où l'on reprend est déjà chargée derrière l'écran de titre :
  // son décor s'anime pendant qu'on lit.
  function afficherTitre() {
    var s = compterSceaux(false), b = compterSceaux(true);
    el.titreBouton.textContent = partieNeuve ? "Commencer" : "Continuer";
    el.titreProgres.textContent = (partieNeuve ? "Clavier : flèches ou Q, D pour courir, Espace pour sauter, E pour lire une stèle."
      : "Reprise : « " + NIVEAUX[salleDeDepart()].nom + " » · sceaux de pierre " + s.gagnes + " / " + s.total +
        " · sceaux d'or " + b.gagnes + " / " + b.total) +
      " Les monstres gardent les stèles : chaque combat se joue en trois manches, avec un sablier, et un boss attend à la fin de chaque chapitre.";
    el.ecranTitre.hidden = false;
    enPause = true;
    el.titreBouton.focus();
  }

  el.titreBouton.addEventListener("click", function () {
    el.ecranTitre.hidden = true;
    entrerDans(salleDeDepart());
  });

  Commandes.installer(recommencer, quandInteragir);

  if (demarrerSalle(salleDeDepart())) afficherTitre();
  window.requestAnimationFrame(boucle);
})();
