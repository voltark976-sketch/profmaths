// =====================================================================
//  VERSION « CHAPITRE » : un temple pour un seul chapitre du programme
// =====================================================================
//  Adresse : les-salles/chapitre.html?c=premiere-suites
//  Ce petit fichier lit le chapitre demandé, puis charge dans l'ordre :
//    1. KaTeX (les formules) ;
//    2. le fichier du chapitre, chapitres/<id>.js (salles, leçons, exercices) ;
//    3. le moteur du jeu, le même que pour la version Seconde.
//  Le gros fichier niveaux/niveaux.js (toutes les salles de Seconde)
//  n'est pas chargé : seul le chapitre demandé arrive sur le téléphone.
//
//  Pour ajouter un chapitre : écrire chapitres/<id>.js (sur le modèle de
//  premiere-suites.js) et ajouter <id> à la liste CHAPITRES_DISPONIBLES.
// =====================================================================
(function () {
  var VERSION = "202611210755";   // à changer à chaque mise en ligne d'un fichier du jeu
  var CHAPITRES_DISPONIBLES = ["premiere-suites"];

  var m = /[?&]c=([a-z0-9-]+)/.exec(window.location.search);
  var id = m ? m[1] : "";
  if (CHAPITRES_DISPONIBLES.indexOf(id) === -1) {
    document.getElementById("titre-salle").textContent = "Chapitre introuvable";
    document.getElementById("athena-texte").textContent = "Ce chapitre n'a pas encore son temple. Reviens à la page Jeu du site.";
    return;
  }
  window.SALLES_CLE = "salles-" + id;   // une sauvegarde par chapitre

  var fichiers = [
    "../assets/katex/katex.min.js",
    "chapitres/" + id + ".js",
    "niveaux/parures.js", "niveaux/rangs.js",
    "js/sauvegarde.js", "js/moteur.js", "js/decor.js",
    "js/ambiances1.js", "js/ambiances2.js", "js/ambiances3.js",
    "js/dessin.js", "js/commandes.js", "js/sons.js", "js/heros.js",
    "js/monstres.js", "js/gardiens.js", "js/combat.js", "js/jeu.js"
  ];
  // async = false : les fichiers se téléchargent en même temps,
  // mais s'exécutent dans l'ordre de la liste.
  fichiers.forEach(function (f) {
    var s = document.createElement("script");
    s.src = f + "?v=" + VERSION;
    s.async = false;
    document.body.appendChild(s);
  });
})();
