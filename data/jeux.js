/*
  JEUX
  ----
  Les jeux de l'onglet « Jeux ». Pour l'instant un seul jeu : le Défi chrono.
  - duree : temps de la partie, en secondes
  - vies  : nombre d'erreurs permises
  - themes : les thèmes proposés. « serie » est le nom d'une série d'exercices de assets/exercices.js
    (les séries « flash » des Automatismes mélangent toutes les questions d'un thème).
    On peut ajouter un chapitre : par exemple { id: "suites", titre: "Suites", serie: "suite-terme" }.
*/
window.JEUX = {
  chrono: {
    titre: "Défi chrono",
    accroche: "Réponds juste à un maximum de questions avant la fin du temps. Enchaîne les bonnes réponses pour multiplier tes points !",
    duree: 90,
    vies: 3,
    themes: [
      { id: "tout", titre: "Tout mélangé", serie: "am-flash-tout" },
      { id: "cn", titre: "Calcul numérique", serie: "am-flash-cn" },
      { id: "ca", titre: "Calcul algébrique", serie: "am-flash-ca" },
      { id: "pp", titre: "Proportions et pourcentages", serie: "am-flash-pp" },
      { id: "ev", titre: "Évolutions et variations", serie: "am-flash-ev" },
      { id: "fr", titre: "Fonctions et représentations", serie: "am-flash-fr" },
      { id: "st", titre: "Statistiques", serie: "am-flash-st" },
      { id: "pr", titre: "Probabilités", serie: "am-flash-pr" }
    ]
  }
};
