/*
  ENTRAÎNEMENT : 4e — chapitre 14, Statistiques
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre quatrieme-statistiques.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle de 4e.
  Diagramme dessiné par o.graph (assets/exercices-base.js). Données fictives, différentes de celles du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["quatrieme-statistiques"] = {
  revisions: {
    intro: "Les statistiques en un coup d'œil : moyenne, moyenne pondérée, médiane et étendue, avec une liste ou un tableau. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Moyenne",
        texte: "On additionne toutes les valeurs, puis on divise par le nombre de valeurs."
      },
      {
        titre: "Moyenne pondérée",
        texte: "Chaque valeur compte autant de fois que son coefficient (ou son effectif). Notes $14$ (coefficient $2$) et $11$ (coefficient $3$) :\n\n$\\dfrac{14 \\times 2 + 11 \\times 3}{2 + 3} = \\dfrac{61}{5} = 12{,}2$"
      },
      {
        titre: "Médiane",
        texte: "On range les valeurs dans l'ordre croissant : la médiane partage la série en deux groupes de même effectif. Avec un nombre pair de valeurs, c'est la moyenne des deux valeurs du milieu."
      },
      {
        titre: "Étendue",
        texte: "C'est la différence entre la plus grande et la plus petite valeur : elle mesure l'écart entre les valeurs extrêmes."
      },
      {
        titre: "Avec un tableau d'effectifs",
        texte: "L'effectif total est la somme des effectifs. Pour trouver la médiane, on calcule les effectifs cumulés et on repère la ou les valeurs du milieu."
      }
    ],
    pieges: [
      "Chercher la médiane sans ranger les valeurs.",
      "Oublier les coefficients ou les effectifs dans une moyenne.",
      "Diviser par le nombre de valeurs différentes au lieu de l'effectif total.",
      "Avec un nombre pair de valeurs, ne garder qu'une des deux valeurs du milieu.",
      "Croire que la moyenne est toujours l'une des valeurs de la série."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $50$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le bulletin de Zaïna",
        duree: 20, points: 7, calculatrice: true,
        contexte: "Voici les moyennes de Zaïna au premier trimestre, avec le coefficient de chaque matière (données fictives).",
        tableau: { lignes: [["\\text{Matière}", "\\text{Maths}", "\\text{Fr.}", "\\text{Angl.}", "\\text{SVT}", "\\text{EPS}"], ["\\text{Note}", "13", "11", "15", "9", "17"], ["\\text{Coef.}", "4", "4", "2", "2", "1"]] },
        questions: [
          { n: "1.", points: 1, texte: "Calcule la moyenne des cinq notes, sans tenir compte des coefficients.", corrige: "$\\dfrac{13 + 11 + 15 + 9 + 17}{5} = \\dfrac{65}{5} = 13$." },
          { n: "2.", points: 2.5, texte: "Calcule la moyenne pondérée de Zaïna, arrondie au dixième.", indice: "Multiplie chaque note par son coefficient, additionne, puis divise par la somme des coefficients.", corrige: "$13 \\times 4 + 11 \\times 4 + 15 \\times 2$ ${} + 9 \\times 2 + 17 \\times 1 = 161$ et $4 + 4 + 2 + 2 + 1 = 13$.\n\nMoyenne pondérée : $\\dfrac{161}{13} \\approx 12{,}4$." },
          { n: "3.", points: 2, texte: "Pourquoi la moyenne pondérée est-elle plus basse que la moyenne simple ?", corrige: "Les matières qui comptent le plus (maths et français, coefficient $4$) ont des notes plus basses, alors que la meilleure note ($17$ en EPS) n'a qu'un coefficient $1$." },
          { n: "4.", points: 1.5, texte: "Quelle note en SVT aurait permis d'obtenir exactement $13$ de moyenne pondérée ?", corrige: "Il faudrait un total de $13 \\times 13 = 169$. Sans la SVT, le total vaut $161 - 18 = 143$, donc $2s = 169 - 143 = 26$ et $s = 13$." }
        ]
      },
      {
        titre: "L'équipe de handball",
        duree: 15, points: 7, calculatrice: true,
        contexte: "Voici les tailles, en cm, des $12$ joueuses d'une équipe de handball (données fictives) :\n\n$162$ ; $175$ ; $168$ ; $181$ ; $170$ ; $158$ ; $177$ ; $166$ ; $172$ ; $185$ ; $169$ ; $173$.",
        questions: [
          { n: "1.", points: 2, texte: "Détermine la taille médiane.", indice: "Range les $12$ tailles : la médiane est la moyenne des $6$e et $7$e.", corrige: "Tailles rangées : $158$ ; $162$ ; $166$ ; $168$ ; $169$ ; $170$ ; $172$ ; $173$ ; $175$ ; $177$ ; $181$ ; $185$.\n\nMédiane : $\\dfrac{170 + 172}{2} = 171$ cm." },
          { n: "2.", points: 1.5, texte: "Calcule l'étendue des tailles.", corrige: "$185 - 158 = 27$ cm." },
          { n: "3.", points: 2, texte: "Calcule la taille moyenne, arrondie au dixième.", corrige: "La somme des tailles vaut $2\\,056$ cm, donc la moyenne vaut $\\dfrac{2\\,056}{12} \\approx 171{,}3$ cm." },
          { n: "4.", points: 1.5, texte: "La joueuse de $185$ cm est remplacée par une joueuse de $195$ cm. Quels indicateurs changent : la moyenne, la médiane, l'étendue ?", corrige: "La moyenne augmente (la somme gagne $10$ cm, soit environ $0{,}8$ cm de plus par joueuse) et l'étendue aussi ($195 - 158 = 37$ cm). La médiane ne change pas : les $6$e et $7$e tailles restent $170$ et $172$." }
        ]
      },
      {
        titre: "Les retards du bus",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Le diagramme donne le retard du bus scolaire, en minutes, relevé pendant $20$ jours (données fictives) : par exemple, le bus n'a eu aucun retard $8$ jours.",
        figure: (o) => o.graph({
          xmin: -2, xmax: 33, xstep: 5, ymin: 0, ymax: 9, ystep: 1, h: 230,
          ylabel: "nombre de jours",
          bars: [{ x: 0, y: 8 }, { x: 5, y: 6 }, { x: 10, y: 3 }, { x: 15, y: 2 }, { x: 30, y: 1 }],
          aria: "Diagramme en bâtons : 0 min de retard 8 jours, 5 min 6 jours, 10 min 3 jours, 15 min 2 jours, 30 min 1 jour"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Vérifie que l'effectif total vaut $20$.", corrige: "$8 + 6 + 3 + 2 + 1 = 20$ jours." },
          { n: "2.", points: 1.5, texte: "Calcule le retard moyen.", corrige: "Total des retards : $0 \\times 8 + 5 \\times 6 + 10 \\times 3$ ${} + 15 \\times 2 + 30 \\times 1 = 120$ min.\n\nRetard moyen : $\\dfrac{120}{20} = 6$ min." },
          { n: "3.", points: 1.5, texte: "Détermine le retard médian.", indice: "Avec $20$ valeurs, la médiane est la moyenne des $10$e et $11$e valeurs : utilise les effectifs cumulés.", corrige: "Effectifs cumulés : $8$, puis $14$. Les $10$e et $11$e valeurs valent toutes les deux $5$ : le retard médian est $5$ min." },
          { n: "4.", points: 1.5, texte: "Quel pourcentage des jours le bus a-t-il eu au moins $10$ minutes de retard ?", corrige: "$3 + 2 + 1 = 6$ jours sur $20$ : $\\dfrac{6}{20} = 30\\,\\%$." }
        ]
      }
    ]
  }
};
