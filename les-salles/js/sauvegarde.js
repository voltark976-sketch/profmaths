// =====================================================================
//  SAUVEGARDE : retenir la progression du joueur
// =====================================================================
//  Le navigateur possède un petit espace de stockage propre à chaque
//  page, appelé « localStorage ». On y range un texte qui décrit :
//   - la salle où le joueur en est (son nom) ;
//   - la liste des salles déjà réussies (leurs noms) ;
//   - les sceaux gagnés (un par stèle résolue) ;
//   - l'expérience de Talos (XP), gagnée en battant les monstres ;
//   - les parures que le joueur a choisi de ne pas porter.
//  Ce texte reste sur l'appareil même si l'on ferme le navigateur.
//
//  On retient les salles par leur NOM (et non par leur numéro) : on
//  peut ainsi ajouter des salles dans niveaux.js sans abîmer les
//  sauvegardes. Il ne faut donc pas renommer une salle déjà jouée.
// =====================================================================

var Sauvegarde = (function () {

  var CLE = "salles-maths-progression";

  // L'ordre des salles dans la version précédente du jeu, qui retenait
  // des numéros : il sert à relire une ancienne sauvegarde.
  var ANCIEN_ORDRE = [
    "L'éveil", "La dîme de Stevin", "Les grains de sable d'Archimède", "Le secret d'Hippase",
    "Les nombres premiers d'Euclide", "Les lettres de Viète", "Le pont d'al-jabr", "Les signes de Harriot",
    "Le repère de Descartes", "La relation de Chasles", "L'école d'Hypatie", "Le déterminant de Cramer",
    "Les droites de Fermat", "Les neuf chapitres", "Les graphiques d'Oresme", "Le pari du chevalier"
  ];

  function progressionVide() {
    // sceaux : les stèles résolues, par exemple { "La dîme de Stevin|s0": true }
    // pour la première stèle de pierre de cette salle (b0 pour une stèle d'or,
    // h0 pour une stèle d'Hermès).
    return { version: 2, salleCourante: null, reussies: [], sceaux: {}, paruresRetirees: {}, xp: 0 };
  }

  // Une sauvegarde d'avant les combats n'a pas d'expérience : on la
  // calcule d'après les sceaux déjà gagnés (voir les nombres dans rangs.js).
  function xpDesSceaux(sceaux) {
    var regles = typeof XP !== "undefined" ? XP : { pierre: 100, or: 80, figure: 60 };
    var total = 0;
    for (var cle in sceaux) {
      if (!sceaux[cle]) continue;
      if (cle.indexOf("|b") !== -1) total += regles.or;
      else if (cle.indexOf("|h") !== -1) total += regles.figure || 0;
      else total += regles.pierre;
    }
    return total;
  }

  // Lit la progression enregistrée (ou une progression vide).
  function charger() {
    try {
      var texte = window.localStorage.getItem(CLE);
      if (!texte) return progressionVide();
      var p = JSON.parse(texte);
      if (!p || typeof p !== "object") return progressionVide();
      if (p.version !== 2) p = migrer(p);
      if (!Array.isArray(p.reussies)) p.reussies = [];
      if (!p.sceaux || typeof p.sceaux !== "object") p.sceaux = {};
      if (!p.paruresRetirees || typeof p.paruresRetirees !== "object") p.paruresRetirees = {};
      if (typeof p.salleCourante !== "string") p.salleCourante = null;
      if (typeof p.xp !== "number" || !isFinite(p.xp) || p.xp < 0) p.xp = xpDesSceaux(p.sceaux);
      return p;
    } catch (e) {
      // Stockage indisponible (navigation privée, réglages...) :
      // le jeu fonctionne quand même, simplement sans mémoire.
      return progressionVide();
    }
  }

  // Une ancienne sauvegarde retenait des numéros de salles :
  // on les remplace par les noms des salles.
  function migrer(ancien) {
    var p = progressionVide();
    if (Array.isArray(ancien.reussies)) {
      ancien.reussies.forEach(function (n) {
        var nom = typeof n === "number" ? ANCIEN_ORDRE[n] : n;
        if (typeof nom === "string" && p.reussies.indexOf(nom) === -1) p.reussies.push(nom);
      });
    }
    // L'ancienne première salle remplaçait tout le prologue d'aujourd'hui.
    if (p.reussies.indexOf("L'éveil") !== -1) p.reussies.push("La première stèle");
    if (typeof ancien.salleCourante === "number") p.salleCourante = ANCIEN_ORDRE[ancien.salleCourante] || null;
    if (ancien.sceaux && typeof ancien.sceaux === "object") p.sceaux = ancien.sceaux;
    p.xp = xpDesSceaux(p.sceaux);
    return p;
  }

  function enregistrer(p) {
    try {
      window.localStorage.setItem(CLE, JSON.stringify(p));
    } catch (e) {
      // Rien à faire : on continue sans sauvegarde.
    }
  }

  function effacer() {
    try {
      window.localStorage.removeItem(CLE);
    } catch (e) { }
    return progressionVide();
  }

  return { charger: charger, enregistrer: enregistrer, effacer: effacer };
})();
