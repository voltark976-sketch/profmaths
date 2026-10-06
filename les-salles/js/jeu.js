// =====================================================================
//  JEU : le chef d'orchestre
// =====================================================================
//  Ce fichier relie les autres :
//   - il prend une salle dans niveaux.js et la donne au moteur ;
//   - environ 60 fois par seconde (une « image »), il lit le clavier
//     (commandes.js), fait avancer le temps (moteur.js) et redessine
//     la salle (dessin.js) ;
//   - il ouvre les stèles (exercices) et vérifie les réponses ;
//   - il compte les sceaux, débloque les parures et les sanctuaires ;
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
    ecranTitre: $("ecran-titre"), titreBouton: $("titre-bouton"), titreProgres: $("titre-progres")
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
  // première stèle d'or.
  function cleSceau(niveau, bonus, numero) {
    return niveau.nom + "|" + (bonus ? "b" : "s") + numero;
  }
  function compterSceaux(bonus) {
    var total = 0, gagnes = 0;
    NIVEAUX.forEach(function (niv) {
      var liste = (bonus ? niv.bonus : niv.steles) || [];
      for (var i = 0; i < liste.length; i++) {
        total++;
        if (progression.sceaux[cleSceau(niv, bonus, i)]) gagnes++;
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
      (niv.bonus || []).forEach(function (b, k) { if (progression.sceaux[cleSceau(niv, true, k)]) n++; });
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

    var chap = LISTE_CHAPITRES[niveau.numeroChapitre];
    el.titre.textContent = niveau.secrete ? "Sanctuaire secret · " + niveau.nom
      : "Salle " + niveau.rang + " / " + chap.salles.length + " · " + (niveau.nom || "sans nom");
    el.athena.textContent = niveau.athena || niveau.message || "";
    remplirChoixSalles();
    afficherSceaux();
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
          var resultat = Moteur.avancer(etat, entrees, PAS_DE_TEMPS);
          entrees.saut = false; // l'appui sur « saut » ne compte qu'une fois
          reserve -= PAS_DE_TEMPS;
          if (resultat === "chute") chute();
          if (resultat === "sortie") salleReussie();
        }
      } else {
        Commandes.lire();
        reserve = 0;
      }
      var infos = {
        steleProche: Moteur.steleProche(etat),
        guideProche: Moteur.guideProche(etat),
        inscriptionProche: Moteur.inscriptionProche(etat),
        parures: paruresPortees,
        tps: mouvementReduit ? 8 : instant / 1000,
        mouvementReduit: mouvementReduit
      };
      if (el.ecranTitre.hidden) afficherBulle(infos.guideProche, infos.inscriptionProche);
      else afficherBulle(-1, -1);
      el.dalles.textContent = etat.nbDalles > 0
        ? "Dalles : " + Moteur.nbDallesAllumees(etat) + " / " + etat.nbDalles : "";
      Dessin.dessiner(canvas, etat, infos);
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
  function quandInteragir() {
    if (enPause || !etat || etat.erreur) return;
    var i = Moteur.steleProche(etat);
    if (i >= 0) ouvrirStele(i);
  }

  function ouvrirStele(i) {
    var s = etat.steles[i];
    var ex = s.exercice;
    steleOuverte = i;
    enPause = true;
    Commandes.relacherTout();

    el.steleSurTitre.textContent = s.bonus ? "Stèle d'or · automatisme" : "Stèle de pierre · exercice";
    el.steleNote.hidden = !s.bonus;
    el.steleNote.textContent = s.bonus ? "Facultatif : cette stèle n'ouvre pas la porte. Son sceau d'or fait gagner des parures à Talos et ouvre le sanctuaire secret du chapitre." : "";
    el.steleTitre.textContent = ex.titre || (s.bonus ? "Automatisme" : "Exercice");
    el.steleEnonce.textContent = ex.enonce || "";
    el.steleUnite.textContent = ex.unite || "";
    el.steleIndice.hidden = true;
    el.steleIndice.textContent = ex.indice ? "Indice : " + ex.indice : "";
    el.steleExplication.hidden = true;
    el.steleExplication.textContent = ex.explication ? "Correction : " + ex.explication : "";
    el.steleRetour.textContent = "";
    el.steleRetour.className = "retour";
    el.stele.classList.toggle("doree", !!s.bonus);

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
    el.stele.hidden = false;
    if (!s.resolue) el.steleReponse.focus(); else el.steleFermer.focus();
  }

  function fermerStele() {
    el.stele.hidden = true;
    steleOuverte = -1;
    el.steleReponse.blur();
    Commandes.relacherTout();
    enPause = false;
  }

  el.steleForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (steleOuverte < 0) return;
    var stele = etat.steles[steleOuverte];
    var ex = stele.exercice;
    var r = Moteur.proposerReponse(etat, steleOuverte, el.steleReponse.value);

    if (r.valeur === null) {
      el.steleRetour.textContent = "Écrivez un nombre, par exemple 8, 2,5 ou 7/3.";
      el.steleRetour.className = "retour faux";
      return;
    }

    if (r.juste) {
      var niveau = NIVEAUX[numeroSalle];
      var orAvant = compterSceaux(true).gagnes, chapAvant = sceauxOrDuChapitre(niveau.numeroChapitre);
      progression.sceaux[cleSceau(niveau, stele.bonus, stele.numero)] = true;
      Sauvegarde.enregistrer(progression);
      afficherSceaux();
      if (stele.bonus) annoncerRecompenses(orAvant, chapAvant, niveau);
      var effet = stele.bonus ? "" : (ex.effet === "passerelle" ? " La passerelle se construit." :
                  (etat.porteOuverte ? " La porte s'ouvre." : ""));
      el.steleRetour.textContent = (stele.bonus ? "Juste ! Vous gagnez un sceau d'or." : "Juste ! Vous gagnez un sceau de pierre.") + effet;
      el.steleRetour.className = "retour juste";
      el.steleExplication.hidden = !ex.explication;
      el.steleReponse.disabled = true;
      el.steleValider.disabled = true;
      el.steleFermer.focus();
      return;
    }

    var texte = "Ce n'est pas la bonne réponse.";
    if (ex.effet === "passerelle" && !stele.bonus) {
      texte += " Une passerelle de " + Math.round(r.valeur) + " case(s) ne relierait pas les deux bords : fermez la stèle pour la voir.";
    }
    el.steleRetour.textContent = texte;
    el.steleRetour.className = "retour faux";
    if (ex.indice) el.steleIndice.hidden = false;
    el.steleReponse.select();
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
  });

  // ---------------------------------------------------------------
  //  L'écran de titre, puis le début du jeu
  // ---------------------------------------------------------------
  // La salle où l'on reprend est déjà chargée derrière l'écran de titre :
  // son décor s'anime pendant qu'on lit.
  function afficherTitre() {
    var s = compterSceaux(false), b = compterSceaux(true);
    el.titreBouton.textContent = partieNeuve ? "Commencer" : "Continuer";
    el.titreProgres.textContent = partieNeuve ? "Clavier : flèches ou Q, D pour courir, Espace pour sauter, E pour lire une stèle."
      : "Reprise : « " + NIVEAUX[salleDeDepart()].nom + " » · sceaux de pierre " + s.gagnes + " / " + s.total +
        " · sceaux d'or " + b.gagnes + " / " + b.total;
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
