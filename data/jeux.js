/*
  JEUX
  ----
  Les jeux de l'onglet « Jeux ». Pour l'instant un seul jeu : le Défi chrono.
  - duree : temps de la partie, en secondes
  - vies  : nombre d'erreurs permises
  Les thèmes se construisent tout seuls à partir de data/catalogue.js : un onglet par classe,
  une ligne « Tout mélangé » puis une ligne par chapitre disponible.
  Un nouveau chapitre apparaît donc automatiquement dans le jeu.
  - exclure : séries d'exercices à ne pas mettre dans le jeu (trop longues pour un chrono),
    par exemple exclure: ["sd-developper"]
*/
window.JEUX = {
  chrono: {
    titre: "Défi chrono",
    accroche: "Réponds juste à un maximum de questions avant la fin du temps. Enchaîne les bonnes réponses pour multiplier tes points !",
    duree: 90,
    vies: 3,
    exclure: []
  }
};
