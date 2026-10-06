/*
  JEUX
  ----
  Le Défi chrono : onglet « Défi » de chaque chapitre, avec les questions des exercices du chapitre.
  - duree : temps de la partie, en secondes
  - vies  : nombre d'erreurs permises
  Chaque nouveau chapitre a automatiquement son défi.
  - exclure : séries d'exercices à ne pas mettre dans le jeu (trop longues pour un chrono),
    par exemple exclure: ["sd-developper"]
*/
window.JEUX = {
  chrono: {
    titre: "Défi chrono",
    accroche: "Réponds juste à un maximum de questions avant la fin du temps. Enchaîne les bonnes réponses pour multiplier tes points !",
    duree: 90,
    vies: 3,
    exclure: ["parite-graphique", "parite-calcul", "parite-symetrique"] // parité : programme de Première depuis 2026
  }
};
