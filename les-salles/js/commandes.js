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

    installerTactile(quandInteragir);
  }

  // ---------------------------------------------------------------
  //  Sur téléphone et tablette : des boutons à toucher.
  //  Ils n'apparaissent que sur un écran tactile (la page reçoit
  //  alors la classe « tactile ») : sur ordinateur, rien ne change.
  // ---------------------------------------------------------------
  function installerTactile(quandInteragir) {
    var manette = document.createElement("div");
    manette.id = "manette";
    manette.innerHTML =
      '<div class="manette-groupe">' +
        '<button type="button" data-action="gauche" aria-label="Courir à gauche">◀</button>' +
        '<button type="button" data-action="droite" aria-label="Courir à droite">▶</button>' +
      '</div>' +
      '<div class="manette-groupe">' +
        '<button type="button" data-action="lire" aria-label="Lire une stèle">Lire</button>' +
        '<button type="button" data-action="saut" aria-label="Sauter">▲</button>' +
      '</div>';
    var zone = document.getElementById("zone-jeu");
    zone.parentNode.insertBefore(manette, zone.nextSibling);

    // Un doigt posé sur un bouton le garde enfoncé ; on le relâche
    // quand le doigt se lève, glisse hors du bouton ou est interrompu.
    Array.prototype.forEach.call(manette.querySelectorAll("button"), function (b) {
      var action = b.getAttribute("data-action");
      function appuyer(e) {
        e.preventDefault();
        b.classList.add("appuye");
        if (action === "lire") { quandInteragir(); return; }
        if (action === "saut" && !enfoncees.saut) sautVientDEtrePresse = true;
        enfoncees[action] = true;
      }
      function relacher() {
        b.classList.remove("appuye");
        if (action !== "lire") enfoncees[action] = false;
      }
      b.addEventListener("pointerdown", appuyer);
      b.addEventListener("pointerup", relacher);
      b.addEventListener("pointercancel", relacher);
      b.addEventListener("pointerleave", relacher);
      b.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    });

    function activer() {
      if (document.documentElement.classList.contains("tactile")) return;
      document.documentElement.classList.add("tactile");
      window.dispatchEvent(new Event("resize")); // la salle se redessine à la place qui reste
    }
    if (window.matchMedia && window.matchMedia("(hover: none) and (pointer: coarse)").matches) activer();
    // Un ordinateur à écran tactile : les boutons apparaissent au premier toucher.
    window.addEventListener("touchstart", activer, { passive: true });
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
