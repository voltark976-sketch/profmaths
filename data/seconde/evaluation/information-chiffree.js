/*
  ENTRAÎNEMENT : Seconde — chapitre 3, Information chiffrée
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-information-chiffree.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle ou devoir commun de Seconde.
  Les chiffres de la barge et du lycée sont fictifs.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["seconde-information-chiffree"] = {
  revisions: {
    intro: "L'information chiffrée en un coup d'œil : proportions, taux d'évolution, coefficients multiplicateurs, évolutions successives et points de pourcentage. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Proportion",
        texte: "$p = \\dfrac{n_A}{n_E}$, entre $0$ et $1$, en fraction, en décimal ou en pourcentage. La partie vaut $p \\times n_E$, et le tout $n_E = \\dfrac{n_A}{p}$ : le tout est plus grand que la partie."
      },
      {
        titre: "Proportion de proportion",
        texte: "Si $p_1$ des $E$ sont des $A$ et $p_2$ des $A$ sont des $C$, la proportion de $C$ dans $E$ est $p_1 \\times p_2$ : $30\\,\\%$ de $58\\,\\%$, c'est $17{,}4\\,\\%$."
      },
      {
        titre: "Variation et taux d'évolution",
        texte:
          "De $V_1$ à $V_2$ : variation absolue $V_2 - V_1$ (avec l'unité), taux d'évolution\n\n" +
          "$t = \\dfrac{V_2 - V_1}{V_1}$, sans unité, souvent en pourcentage."
      },
      {
        titre: "Coefficient multiplicateur",
        texte:
          "$CM = \\dfrac{V_2}{V_1} = 1 + t$ :\n\n" +
          "- $+5\\,\\%$ : $\\times 1{,}05$ ;\n" +
          "- $-7\\,\\%$ : $\\times 0{,}93$ ;\n" +
          "- valeur initiale : $V_1 = \\dfrac{V_2}{CM}$."
      },
      {
        titre: "Évolutions successives",
        texte: "On **multiplie** les coefficients : $CM = CM_1 \\times CM_2$, puis $t = CM - 1$. Une hausse de $20\\,\\%$ suivie d'une baisse de $20\\,\\%$ donne $1{,}2 \\times 0{,}8 = 0{,}96$, soit $-4\\,\\%$ : les taux ne s'additionnent pas."
      },
      {
        titre: "Évolution réciproque",
        texte: "Pour revenir à la valeur de départ : $CM' = \\dfrac{1}{CM}$. Après $+25\\,\\%$ ($\\times 1{,}25$), il faut $\\times 0{,}8$, soit $-20\\,\\%$."
      },
      {
        titre: "Points ou pourcentage ?",
        texte: "Quand une **proportion** évolue, l'écart se compte en **points** : de $75\\,\\%$ à $81\\,\\%$, c'est $+6$ points, mais un taux d'évolution de $\\dfrac{81 - 75}{75} = +8\\,\\%$."
      }
    ],
    pieges: [
      "Calculer un pourcentage de la partie au lieu de chercher le tout : le tout est le plus grand.",
      "Additionner deux proportions emboîtées : $30\\,\\%$ de $58\\,\\%$ ne fait pas $88\\,\\%$.",
      "Écrire $0{,}7$ pour une baisse de $7\\,\\%$ : c'est $0{,}93$.",
      "Annuler une hausse de $8\\,\\%$ en retirant $8\\,\\%$ : il faut diviser par $1{,}08$.",
      "Additionner des taux successifs, ou croire que la réciproque de $+25\\,\\%$ est $-25\\,\\%$.",
      "Confondre points de pourcentage et taux d'évolution."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle ou au devoir commun (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Les passagers de la barge",
        duree: 25, points: 7, calculatrice: true,
        contexte: "La barge entre Mamoudzou et Dzaoudzi a transporté $3{,}2$ millions de passagers en 2024 et $3{,}44$ millions en 2025 (chiffres fictifs).",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule la variation absolue du nombre de passagers entre 2024 et 2025.",
            indice: "Variation absolue : valeur finale moins valeur initiale, avec l'unité.",
            corrige: "$3{,}44 - 3{,}2 = 0{,}24$ million : il y a eu $240\\,000$ passagers de plus."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule le taux d'évolution entre 2024 et 2025, en pourcentage.",
            indice: "$t = \\dfrac{V_2 - V_1}{V_1}$.",
            corrige: "$t = \\dfrac{0{,}24}{3{,}2} = 0{,}075$, soit une hausse de $7{,}5\\,\\%$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Si le nombre de passagers augmente encore de $7{,}5\\,\\%$ en 2026, combien la barge en transportera-t-elle ?",
            indice: "Augmenter de $7{,}5\\,\\%$, c'est multiplier par $1{,}075$.",
            corrige: "$3{,}44 \\times 1{,}075 = 3{,}698$ : environ $3{,}7$ millions de passagers en 2026."
          },
          {
            n: "4.", points: 1.5,
            texte: "En fait, à cause de travaux, le nombre de passagers baisse de $10\\,\\%$ en 2026. Quelle est alors l'évolution entre 2024 et 2026 ?",
            indice: "Évolutions successives : on multiplie les coefficients $1{,}075$ et $0{,}9$.",
            corrige: "$1{,}075 \\times 0{,}9 = 0{,}9675$ : entre 2024 et 2026, le nombre de passagers baisse de $3{,}25\\,\\%$ ($3{,}44 \\times 0{,}9 = 3{,}096$ millions)."
          },
          {
            n: "5.", points: 1.5,
            texte: "Quel taux d'évolution faudrait-il en 2027 pour retrouver le niveau de 2025 ?",
            indice: "Évolution réciproque d'une baisse de $10\\,\\%$ : $CM' = \\dfrac{1}{0{,}9}$.",
            corrige: "$CM' = \\dfrac{1}{0{,}9} \\approx 1{,}111$ : il faudrait une hausse d'environ $11{,}1\\,\\%$, et non de $10\\,\\%$."
          }
        ]
      },
      {
        titre: "Proportions au lycée",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Un lycée de Mamoudzou compte $1\\,200$ élèves, dont $40\\,\\%$ en Seconde. Parmi les élèves de Seconde, $55\\,\\%$ sont des filles (chiffres fictifs). Les questions 3 à 5 sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Combien le lycée compte-t-il d'élèves de Seconde ?",
            indice: "La partie vaut $p \\times n_E$.",
            corrige: "$0{,}4 \\times 1\\,200 = 480$ élèves de Seconde."
          },
          {
            n: "2.", points: 1.5,
            texte: "Quelle proportion des élèves du lycée sont des filles de Seconde ? Combien sont-elles ?",
            indice: "Proportion de proportion : on multiplie $0{,}4$ et $0{,}55$.",
            corrige: "$0{,}4 \\times 0{,}55 = 0{,}22$ : $22\\,\\%$ des élèves du lycée sont des filles de Seconde, soit $0{,}22 \\times 1\\,200 = 264$ filles."
          },
          {
            n: "3.", points: 1.5,
            texte: "Dans un autre lycée, $156$ élèves de Première prennent le bus, soit $65\\,\\%$ des élèves de Première. Combien y a-t-il d'élèves de Première ?",
            indice: "On connaît la partie et la proportion : le tout vaut $\\dfrac{n_A}{p}$.",
            corrige: "$\\dfrac{156}{0{,}65} = 240$ : il y a $240$ élèves de Première. Vérification : $0{,}65 \\times 240 = 156$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Le taux de réussite au brevet d'un collège passe de $70\\,\\%$ à $77\\,\\%$. Exprime cette évolution en points, puis en pourcentage.",
            indice: "L'écart entre deux proportions se compte en points ; le taux d'évolution se calcule avec $\\dfrac{V_2 - V_1}{V_1}$.",
            corrige: "C'est une hausse de $77 - 70 = 7$ points, mais un taux d'évolution de $\\dfrac{77 - 70}{70} = 0{,}1$, soit $+10\\,\\%$."
          },
          {
            n: "5.", points: 1.5,
            texte: "Après une hausse de $25\\,\\%$, le ticket de cantine coûte $3{,}75$ €. Quel était son prix avant la hausse ?",
            indice: "Valeur initiale : $V_1 = \\dfrac{V_2}{CM}$ avec $CM = 1{,}25$.",
            corrige: "$\\dfrac{3{,}75}{1{,}25} = 3$ : le ticket coûtait $3$ € avant la hausse. (Retirer $25\\,\\%$ de $3{,}75$ donnerait $2{,}81$ €, ce qui est faux.)"
          }
        ]
      },
      {
        titre: "Vrai ou faux ?",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Pour chaque affirmation, dis si elle est vraie ou fausse, puis justifie. Une réponse sans justification ne rapporte aucun point.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Une hausse de $20\\,\\%$ suivie d'une baisse de $20\\,\\%$ ramène au prix de départ.",
            indice: "Multiplie les coefficients.",
            corrige: "**Faux.** $1{,}2 \\times 0{,}8 = 0{,}96$ : le prix final est inférieur de $4\\,\\%$ au prix de départ. Avec $100$ €, on passe à $120$ € puis à $96$ €."
          },
          {
            n: "2.", points: 1.5,
            texte: "Baisser un prix de $25\\,\\%$, c'est le multiplier par $0{,}25$.",
            indice: "Baisser de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$.",
            corrige: "**Faux.** C'est le multiplier par $1 - 0{,}25 = 0{,}75$. Multiplier par $0{,}25$, c'est le diviser par $4$, soit une baisse de $75\\,\\%$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Deux hausses successives de $10\\,\\%$ équivalent à une hausse de $21\\,\\%$.",
            indice: "$1{,}1 \\times 1{,}1 = ?$",
            corrige: "**Vrai.** $1{,}1 \\times 1{,}1 = 1{,}21$ : c'est une hausse de $21\\,\\%$, un peu plus que $20\\,\\%$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Pour compenser une baisse de $50\\,\\%$, il faut une hausse de $100\\,\\%$.",
            indice: "Coefficient réciproque de $0{,}5$.",
            corrige: "**Vrai.** Une baisse de $50\\,\\%$ multiplie par $0{,}5$ ; pour revenir au départ, il faut multiplier par $\\dfrac{1}{0{,}5} = 2$, soit une hausse de $100\\,\\%$."
          }
        ]
      }
    ]
  }
};
