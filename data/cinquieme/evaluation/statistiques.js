/*
  ENTRAÎNEMENT : 5e — chapitre 13, Statistiques
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-statistiques.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e.
  Données fictives, différentes de celles du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-statistiques"] = {
  revisions: {
    intro: "Les statistiques en un coup d'œil : effectifs, fréquences, moyenne et diagrammes. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Effectifs",
        texte: "L'effectif d'une valeur est le nombre de fois où elle apparaît ; l'effectif total est le nombre de données."
      },
      {
        titre: "Fréquence",
        texte: "Fréquence $= \\dfrac{\\text{effectif de la valeur}}{\\text{effectif total}}$. On peut l'écrire en fraction, en nombre décimal ou en pourcentage : $\\dfrac{3}{12} = 0{,}25 = 25\\,\\%$."
      },
      {
        titre: "Moyenne",
        texte: "On additionne toutes les valeurs, puis on divise par l'effectif total : la moyenne de $7$, $10$ et $16$ est $33 \\div 3 = 11$."
      },
      {
        titre: "Diagramme circulaire",
        texte: "Le disque entier ($360^\\circ$) représente l'effectif total ; l'angle de chaque secteur est proportionnel à l'effectif : une fréquence de $25\\,\\%$ correspond à $90^\\circ$."
      },
      {
        titre: "Choisir un diagramme",
        texte: "Un diagramme en barres compare des effectifs, un diagramme circulaire montre des parts d'un tout, une courbe montre une évolution au cours du temps."
      }
    ],
    pieges: [
      "Diviser par le nombre de valeurs différentes au lieu de l'effectif total.",
      "Oublier qu'une fréquence est comprise entre $0$ et $1$ (ou entre $0\\,\\%$ et $100\\,\\%$).",
      "Faire des angles proportionnels à autre chose qu'aux effectifs.",
      "Croire que la moyenne est forcément l'une des valeurs de la série.",
      "Choisir un diagramme circulaire pour montrer une évolution dans le temps."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le sport préféré",
        duree: 15, points: 7, calculatrice: false,
        contexte: "On a demandé aux élèves d'un club leur sport préféré (données fictives).",
        tableau: { lignes: [["\\text{Sport}", "\\text{football}", "\\text{basket}", "\\text{natation}", "\\text{danse}"], ["\\text{Effectif}", "8", "4", "3", "5"]] },
        questions: [
          { n: "1.", points: 1.5, texte: "Combien d'élèves ont répondu ?", corrige: "$8 + 4 + 3 + 5 = 20$ élèves." },
          { n: "2.", points: 2, texte: "Calcule la fréquence de chaque sport, en pourcentage.", corrige: "Football : $\\dfrac{8}{20} = 40\\,\\%$ ; basket : $\\dfrac{4}{20} = 20\\,\\%$ ; natation : $\\dfrac{3}{20} = 15\\,\\%$ ; danse : $\\dfrac{5}{20} = 25\\,\\%$." },
          { n: "3.", points: 2, texte: "On veut tracer un diagramme circulaire. Calcule l'angle de chaque secteur.", indice: "Chaque élève correspond à $360 \\div 20 = 18^\\circ$.", corrige: "Football : $8 \\times 18 = 144^\\circ$ ; basket : $72^\\circ$ ; natation : $54^\\circ$ ; danse : $90^\\circ$. Vérification : $144 + 72 + 54 + 90 = 360$." },
          { n: "4.", points: 1.5, texte: "Quel diagramme montre le mieux la part de chaque sport parmi les réponses ?", corrige: "Le diagramme circulaire : le disque entier représente tous les élèves, et chaque secteur la part d'un sport." }
        ]
      },
      {
        titre: "Les notes de Rayan",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Voici les notes de Rayan aux cinq premiers contrôles : $12$ ; $8$ ; $15$ ; $11$ ; $9$.",
        questions: [
          { n: "1.", points: 2, texte: "Calcule sa moyenne.", corrige: "$\\dfrac{12 + 8 + 15 + 11 + 9}{5} = \\dfrac{55}{5} = 11$." },
          { n: "2.", points: 2.5, texte: "Quelle note doit-il avoir au sixième contrôle pour obtenir une moyenne de $12$ ?", indice: "Avec six notes et une moyenne de $12$, le total vaut $6 \\times 12$.", corrige: "Il faut un total de $6 \\times 12 = 72$ points. Il en a $55$, donc il lui faut $72 - 55 = 17$." },
          { n: "3.", points: 1.5, texte: "Son professeur s'aperçoit qu'il a fait une erreur : la note $15$ était en réalité un $20$. Quelle est la vraie moyenne des cinq notes ?", corrige: "Le total devient $55 + 5 = 60$, et la moyenne $60 \\div 5 = 12$." },
          { n: "4.", points: 1, texte: "Avec les notes de départ, combien de notes sont au-dessus de la moyenne ?", corrige: "La moyenne vaut $11$ : seules les notes $12$ et $15$ sont au-dessus, soit $2$ notes." }
        ]
      },
      {
        titre: "Les températures de la semaine",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Voici les températures maximales relevées à Mamoudzou pendant une semaine, en °C, du lundi (L) au dimanche (D) (données fictives).",
        tableau: { lignes: [["\\text{Jour}", "\\text{L}", "\\text{Ma}", "\\text{Me}", "\\text{J}", "\\text{V}", "\\text{S}", "\\text{D}"], ["\\text{Temp.}", "27", "29", "30", "28", "31", "29", "29"]] },
        questions: [
          { n: "1.", points: 2, texte: "Calcule la température maximale moyenne de la semaine.", corrige: "$27 + 29 + 30 + 28$ ${} + 31 + 29 + 29 = 203$, et $203 \\div 7 = 29$ °C." },
          { n: "2.", points: 1.5, texte: "Quel jour a-t-il fait le plus chaud ? Quel est l'écart avec le jour le plus frais ?", corrige: "Vendredi ($31$ °C). Le jour le plus frais est lundi ($27$ °C) : l'écart vaut $31 - 27 = 4$ °C." },
          { n: "3.", points: 1.5, texte: "Quel diagramme choisir pour montrer comment la température a évolué pendant la semaine ?", corrige: "Une courbe (ou un diagramme en lignes), avec les jours sur l'axe horizontal : elle montre l'évolution au cours du temps." },
          { n: "4.", points: 1, texte: "Combien de jours la température a-t-elle dépassé la moyenne ?", corrige: "$30$ °C (mercredi) et $31$ °C (vendredi) : $2$ jours." }
        ]
      }
    ]
  }
};
