/*
  ENTRAÎNEMENT : 3e — chapitre 8, Proportionnalité et pourcentages
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre troisieme-proportionnalite.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type brevet.
  Prix, distances et durées fictifs ou arrondis ; nombres différents de ceux du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["troisieme-proportionnalite"] = {
  revisions: {
    intro: "Pourcentages, évolutions, grandeurs composées et ratios en un coup d'œil. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Appliquer un pourcentage",
        texte: "$t\\,\\%$ d'une quantité $a$, c'est $a \\times \\dfrac{t}{100}$ : $15\\,\\%$ de $60$, c'est $60 \\times 0{,}15 = 9$."
      },
      {
        titre: "Coefficient multiplicateur",
        texte: "Augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$ ; baisser de $t\\,\\%$, par $1 - \\dfrac{t}{100}$. Pour retrouver la valeur de départ, on **divise** par ce coefficient."
      },
      {
        titre: "Taux d'évolution",
        texte: "Entre une valeur de départ $V_D$ et une valeur d'arrivée $V_A$ : $\\dfrac{V_A - V_D}{V_D}$, que l'on écrit en pourcentage."
      },
      {
        titre: "Évolutions successives",
        texte: "On **multiplie** les coefficients : $+20\\,\\%$ puis $-10\\,\\%$ donnent $1{,}2 \\times 0{,}9 = 1{,}08$, soit $+8\\,\\%$, et non $+10\\,\\%$."
      },
      {
        titre: "Grandeurs composées",
        texte:
          "- vitesse $=$ distance $\\div$ durée ; $1$ m/s $= 3{,}6$ km/h ;\n" +
          "- débit $=$ volume $\\div$ durée ;\n" +
          "- masse volumique $=$ masse $\\div$ volume."
      },
      {
        titre: "Ratio",
        texte: "Partager dans le ratio $3 : 5$, c'est faire $3 + 5 = 8$ parts égales : la première personne en reçoit $3$, la seconde $5$."
      }
    ],
    pieges: [
      "Ajouter les pourcentages d'évolutions successives : on multiplie les coefficients.",
      "Croire qu'une baisse de $30\\,\\%$ annule une hausse de $30\\,\\%$ : $1{,}3 \\times 0{,}7 = 0{,}91$.",
      "Écrire $2$ h $15$ min $= 2{,}15$ h : c'est $2{,}25$ h.",
      "Multiplier par $3{,}6$ pour passer de km/h à m/s : on divise.",
      "Prendre la valeur d'arrivée comme référence dans un taux d'évolution."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme au brevet (environ $60$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le prix de la bouteille de gaz",
        duree: 20, points: 7, calculatrice: true,
        contexte: "En 2024, une bouteille de gaz coûte $25$ €. Son prix augmente de $8\\,\\%$ en 2025, puis baisse de $5\\,\\%$ en 2026 (prix fictifs).",
        questions: [
          { n: "1.", points: 1.5, texte: "Calcule le prix en 2025, puis en 2026.", indice: "Multiplie par $1{,}08$, puis par $0{,}95$.", corrige: "En 2025 : $25 \\times 1{,}08 = 27$ €. En 2026 : $27 \\times 0{,}95 = 25{,}65$ €." },
          { n: "2.", points: 2, texte: "Quel est le taux d'évolution du prix entre 2024 et 2026 ?", corrige: "$1{,}08 \\times 0{,}95 = 1{,}026$ : le prix a augmenté de $2{,}6\\,\\%$. Vérification : $\\dfrac{25{,}65 - 25}{25} = 0{,}026$." },
          { n: "3.", points: 1.5, texte: "Une autre bouteille coûte $32{,}40$ € en 2025, après la hausse de $8\\,\\%$. Combien coûtait-elle en 2024 ?", indice: "On divise par le coefficient multiplicateur.", corrige: "$\\dfrac{32{,}40}{1{,}08} = 30$ € : elle coûtait $30$ € en 2024." },
          { n: "4.", points: 2, texte: "Quel taux de baisse faudrait-il en 2027 pour revenir au prix de 2024 ? Arrondis au dixième de pourcent.", indice: "Le coefficient cherché vaut $\\dfrac{25}{25{,}65}$.", corrige: "$\\dfrac{25}{25{,}65} \\approx 0{,}9747$, et $1 - 0{,}9747 = 0{,}0253$ : il faudrait une baisse d'environ $2{,}5\\,\\%$ (et non de $2{,}6\\,\\%$)." }
        ]
      },
      {
        titre: "La traversée en barge",
        duree: 20, points: 7, calculatrice: true,
        contexte: "La barge relie Mamoudzou à Dzaoudzi, soit environ $4$ km, en $15$ minutes (valeurs arrondies).",
        questions: [
          { n: "1.", points: 1.5, texte: "Calcule la vitesse moyenne de la barge en km/h.", indice: "$15$ minutes, c'est $0{,}25$ heure.", corrige: "$\\dfrac{4}{0{,}25} = 16$ km/h." },
          { n: "2.", points: 1.5, texte: "Convertis cette vitesse en m/s, arrondie au dixième.", corrige: "$16$ km/h $= \\dfrac{16\\,000 \\text{ m}}{3\\,600 \\text{ s}} \\approx 4{,}4$ m/s." },
          { n: "3.", points: 2, texte: "Un bateau rapide fait la même traversée à $40$ km/h. Combien de minutes gagne-t-on ?", indice: "Calcule d'abord la durée de la traversée à $40$ km/h.", corrige: "Durée : $\\dfrac{4}{40} = 0{,}1$ h, soit $6$ minutes. On gagne $15 - 6 = 9$ minutes." },
          { n: "4.", points: 2, texte: "On suppose que la barge consomme $25$ litres de gazole par traversée. Son réservoir contient $600$ litres. Combien de traversées peut-elle faire avec un plein ? Combien de kilomètres cela représente-t-il ?", corrige: "$\\dfrac{600}{25} = 24$ traversées, soit $24 \\times 4 = 96$ km." }
        ]
      },
      {
        titre: "Le mortier du maçon",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Pour préparer du mortier, un maçon mélange d'abord à sec du ciment et du sable dans le ratio $1 : 3$ (en masse) : pour $1$ kg de ciment, $3$ kg de sable. On ne tient pas compte de l'eau.",
        questions: [
          { n: "1.", points: 1.5, texte: "Quelles masses de ciment et de sable faut-il pour $200$ kg de mélange ?", indice: "Le mélange fait $1 + 3 = 4$ parts.", corrige: "$200 \\div 4 = 50$ kg par part : $50$ kg de ciment et $3 \\times 50 = 150$ kg de sable." },
          { n: "2.", points: 1.5, texte: "Il lui reste $40$ kg de ciment. Quelle masse de sable doit-il ajouter ?", corrige: "$3 \\times 40 = 120$ kg de sable, pour $160$ kg de mélange." },
          { n: "3.", points: 1.5, texte: "Le sable a une masse volumique de $1{,}6$ kg/L. Quel volume occupent $120$ kg de sable ?", indice: "Volume $=$ masse $\\div$ masse volumique.", corrige: "$\\dfrac{120}{1{,}6} = 75$ litres." },
          { n: "4.", points: 1.5, texte: "Quel pourcentage de la masse du mélange représente le ciment ?", corrige: "$1$ part sur $4$ : $\\dfrac{1}{4} = 25\\,\\%$ de la masse." }
        ]
      }
    ]
  }
};
