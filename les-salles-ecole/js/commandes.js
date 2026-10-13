// =====================================================================
//  COMMANDES : le clavier
// =====================================================================
//  Ce fichier retient quelles touches sont enfoncées en ce moment.
//  Le jeu vient le consulter à chaque image pour savoir si le
//  personnage doit courir à gauche, à droite, ou sauter.
// =====================================================================

var Commandes = (function () {

  var TOUCHES = {
    "arrowleft": "gauche", "q": "gauche", "a": "gauche",
    "arrowright": "droite", "d": "droite",
    "arrowup": "saut", "z": "saut", "w": "saut", " ": "saut"
  };

  var enfoncees = { gauche: false, droite: false, saut: false };
  var sautVientDEtrePresse = false;

  // quandRecommencer() est appelée quand on appuie sur R,
  // quandInteragir() quand on appuie sur E (lire une stèle).
  function installer(quandRecommencer, quandInteragir) {
    document.addEventListener("keydown", function (e) {
      // Quand on tape une réponse dans une case de texte,
      // les touches servent à écrire, pas à faire bouger Talos.
      var cible = e.target && e.target.tagName;
      if (cible === "INPUT" || cible === "TEXTAREA" || cible === "SELECT") return;
      var nom = TOUCHES[e.key.toLowerCase()];
      if (nom) {
        e.preventDefault(); // empêche la page de défiler avec les flèches ou Espace
        // Un appui maintenu répète la touche : on ne compte que le premier appui.
        if (nom === "saut" && !enfoncees.saut) sautVientDEtrePresse = true;
        enfoncees[nom] = true;
      } else if (e.key === "ArrowDown") {
        e.preventDefault(); // la flèche du bas ne sert pas, mais ne doit pas faire défiler la page
      } else if (e.key === "r" || e.key === "R") {
        quandRecommencer();
      } else if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        quandInteragir();
      }
    });

    document.addEventListener("keyup", function (e) {
      var nom = TOUCHES[e.key.toLowerCase()];
      if (nom) enfoncees[nom] = false;
    });

    // Si la fenêtre perd le clavier (clic ailleurs), on relâche tout,
    // sinon le personnage continuerait à courir tout seul.
    window.addEventListener("blur", function () {
      enfoncees.gauche = enfoncees.droite = enfoncees.saut = false;
    });
  }

  // Lit l'état des touches pour l'image en cours.
  function relacherTout() {
    enfoncees.gauche = enfoncees.droite = enfoncees.saut = false;
    sautVientDEtrePresse = false;
  }

  function lire() {
    var entrees = {
      gauche: enfoncees.gauche,
      droite: enfoncees.droite,
      saut: sautVientDEtrePresse
    };
    sautVientDEtrePresse = false;
    return entrees;
  }

  return { installer: installer, lire: lire, relacherTout: relacherTout };
})();
