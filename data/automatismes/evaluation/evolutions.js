/*
  ENTRAÎNEMENT : Automatismes — Évolutions et variations
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre auto-evolutions.
  Format : voir data/automatismes/evaluation/calcul-numerique.js (série d'automatismes, puis deux exercices en situation).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["auto-evolutions"] = {
  revisions: {
    intro: "Les évolutions en pourcentage en un coup d'œil : coefficient multiplicateur, valeur finale ou initiale, taux d'évolution, évolutions successives et réciproques. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Coefficient multiplicateur",
        texte: "Augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$ ; baisser de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$. Par exemple, $+8\\,\\%$ : $\\times 1{,}08$ ; $-15\\,\\%$ : $\\times 0{,}85$."
      },
      {
        titre: "Valeur finale, valeur initiale",
        texte: "$V_{\\text{finale}} = V_{\\text{initiale}} \\times CM$. Pour retrouver la valeur initiale, on **divise** par le coefficient : $V_{\\text{initiale}} = \\dfrac{V_{\\text{finale}}}{CM}$."
      },
      {
        titre: "Taux d'évolution",
        texte: "$t = \\dfrac{V_{\\text{finale}} - V_{\\text{initiale}}}{V_{\\text{initiale}}}$, que l'on écrit en pourcentage. On divise toujours par la valeur **de départ**."
      },
      {
        titre: "Évolutions successives",
        texte: "On **multiplie** les coefficients : $+10\\,\\%$ puis $-10\\,\\%$ donnent $1{,}1 \\times 0{,}9 = 0{,}99$, soit une baisse de $1\\,\\%$ (et non $0\\,\\%$)."
      },
      {
        titre: "Évolution réciproque",
        texte: "Pour revenir à la valeur de départ, on multiplie par l'inverse du coefficient : après $\\times CM$, il faut $\\times \\dfrac{1}{CM}$."
      }
    ],
    pieges: [
      "Diminuer de $20\\,\\%$, c'est multiplier par $0{,}8$, pas par $0{,}2$.",
      "Le taux d'évolution se calcule en divisant par la valeur **de départ**.",
      "Les pourcentages successifs ne s'additionnent pas : on multiplie les coefficients.",
      "Une baisse de $20\\,\\%$ ne se compense pas par une hausse de $20\\,\\%$.",
      "Pour retrouver une valeur initiale, on divise par le coefficient, on ne retire pas le pourcentage au prix final.",
      "Multiplier par $1{,}8$, c'est augmenter de $80\\,\\%$, et non de $1{,}8\\,\\%$."
    ]
  },

  evaluation: {
    intro: "Une série d'automatismes comme dans la partie 1 de l'épreuve anticipée, puis deux exercices qui les mettent en situation, **sans calculatrice** (environ $55$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Automatismes",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Pour chaque question, écris seulement le résultat, sans justification.",
        questions: [
          { n: "1.", points: 0.5, texte: "Par quel nombre multiplie-t-on pour augmenter une quantité de $4\\,\\%$ ?", corrige: "$1 + 0{,}04 = 1{,}04$." },
          { n: "2.", points: 0.5, texte: "Par quel nombre multiplie-t-on pour baisser une quantité de $45\\,\\%$ ?", corrige: "$1 - 0{,}45 = 0{,}55$." },
          { n: "3.", points: 0.5, texte: "Multiplier par $0{,}97$ correspond à quelle évolution ?", corrige: "$0{,}97 = 1 - 0{,}03$ : une baisse de $3\\,\\%$." },
          { n: "4.", points: 0.5, texte: "Multiplier par $1{,}8$ correspond à quelle évolution ?", corrige: "$1{,}8 = 1 + 0{,}8$ : une hausse de $80\\,\\%$." },
          { n: "5.", points: 0.5, texte: "Un prix de $80$ € augmente de $15\\,\\%$. Quel est le nouveau prix ?", corrige: "$80 \\times 1{,}15 = 92$ €." },
          { n: "6.", points: 0.5, texte: "Après une hausse de $5\\,\\%$, un article coûte $63$ €. Quel était son prix avant la hausse ?", corrige: "$\\dfrac{63}{1{,}05} = 60$ €." },
          { n: "7.", points: 0.5, texte: "Quel est le taux d'évolution d'une valeur qui passe de $40$ à $46$ ?", corrige: "$\\dfrac{46 - 40}{40} = \\dfrac{6}{40} = 0{,}15$ : $+15\\,\\%$." },
          { n: "8.", points: 0.5, texte: "Quel est le taux d'évolution d'une valeur qui passe de $250$ à $200$ ?", corrige: "$\\dfrac{200 - 250}{250} = -0{,}2$ : $-20\\,\\%$." },
          { n: "9.", points: 0.5, texte: "Un prix augmente deux fois de suite de $10\\,\\%$. Quelle est l'évolution globale ?", corrige: "$1{,}1 \\times 1{,}1 = 1{,}21$ : une hausse de $21\\,\\%$." },
          { n: "10.", points: 0.5, texte: "Une quantité augmente de $50\\,\\%$, puis baisse de $50\\,\\%$. Quelle est l'évolution globale ?", corrige: "$1{,}5 \\times 0{,}5 = 0{,}75$ : une baisse de $25\\,\\%$." },
          { n: "11.", points: 0.5, texte: "Après une baisse de $50\\,\\%$, quelle hausse ramène à la valeur de départ ?", corrige: "$\\dfrac{1}{0{,}5} = 2$ : une hausse de $100\\,\\%$." },
          { n: "12.", points: 0.5, texte: "Une quantité augmente de $5\\,\\%$ par an pendant deux ans. Quel est le taux d'évolution global ?", corrige: "$1{,}05^2 = 1{,}102\\,5$ : une hausse de $10{,}25\\,\\%$." }
        ]
      },
      {
        titre: "Le prix des tomates au marché",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Au marché, le kilo de tomates coûte $3$ € en janvier. Pendant la saison des pluies, son prix augmente de $50\\,\\%$ entre janvier et mars, puis il baisse de $40\\,\\%$ entre mars et mai.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule le prix du kilo de tomates en mars, puis en mai.",
            indice: "En mars : $\\times 1{,}5$. En mai : $\\times 0{,}6$.",
            corrige: "En mars : $3 \\times 1{,}5 = 4{,}50$ €. En mai : $4{,}50 \\times 0{,}6 = 2{,}70$ €."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule le taux d'évolution global du prix entre janvier et mai, de deux façons.",
            indice: "Avec les prix : $\\dfrac{2{,}70 - 3}{3}$. Avec les coefficients : $1{,}5 \\times 0{,}6$.",
            corrige: "Avec les prix : $\\dfrac{2{,}70 - 3}{3} = \\dfrac{-0{,}3}{3} = -0{,}1$. Avec les coefficients : $1{,}5 \\times 0{,}6 = 0{,}9$. Le prix a baissé de $10\\,\\%$."
          },
          {
            n: "3.", points: 2,
            texte: "Un journaliste écrit : « Le prix a augmenté de $50\\,\\%$ puis baissé de $40\\,\\%$ : au total, il a augmenté de $10\\,\\%$. » Explique son erreur.",
            indice: "Les pourcentages s'appliquent à des prix de départ différents.",
            corrige: "Il a additionné les pourcentages. Or la baisse de $40\\,\\%$ porte sur le prix de mars ($4{,}50$ €), plus élevé que celui de janvier : elle retire $1{,}80$ €, alors que la hausse n'avait ajouté que $1{,}50$ €. On multiplie les coefficients : $1{,}5 \\times 0{,}6 = 0{,}9$, une baisse de $10\\,\\%$."
          },
          {
            n: "4.", points: 2,
            texte: "Quel pourcentage de hausse faudrait-il entre mai et juillet pour que le prix revienne à $3$ € ? Donne l'arrondi au dixième de pourcent.",
            indice: "Le coefficient cherché vaut $\\dfrac{3}{2{,}70} = \\dfrac{10}{9}$.",
            corrige: "$CM = \\dfrac{3}{2{,}70} = \\dfrac{10}{9} = 1 + \\dfrac{1}{9}$, et $\\dfrac{1}{9} \\approx 0{,}111$ : il faudrait une hausse d'environ $11{,}1\\,\\%$, plus que la baisse globale de $10\\,\\%$."
          }
        ]
      },
      {
        titre: "Les makis d'une forêt",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Dans un modèle, une population de makis compte $2\\,000$ individus au début de l'étude et augmente de $10\\,\\%$ par an.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Combien de makis compte la population au bout d'un an ? de deux ans ?",
            indice: "Chaque année, on multiplie par $1{,}1$.",
            corrige: "Au bout d'un an : $2\\,000 \\times 1{,}1 = 2\\,200$. Au bout de deux ans : $2\\,200 \\times 1{,}1 = 2\\,420$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Quel est le taux d'évolution de la population sur ces deux ans ? Pourquoi n'est-il pas de $20\\,\\%$ ?",
            indice: "Compare $2\\,420$ et $2\\,000$, ou calcule $1{,}1^2$.",
            corrige: "$1{,}1^2 = 1{,}21$ : la population augmente de $21\\,\\%$ en deux ans. La deuxième hausse de $10\\,\\%$ porte sur $2\\,200$ makis et non sur $2\\,000$ : elle ajoute $220$ makis au lieu de $200$."
          },
          {
            n: "3.", points: 2,
            texte: "Au bout de combien d'années entières la population dépasse-t-elle $3\\,000$ makis pour la première fois ?",
            indice: "Continue les calculs d'année en année : ajouter $10\\,\\%$, c'est ajouter le dixième.",
            corrige: "On ajoute le dixième chaque année : $2\\,420 + 242 = 2\\,662$ (3 ans), $2\\,662 + 266{,}2 = 2\\,928{,}2$ (4 ans), $2\\,928{,}2 + 292{,}82 = 3\\,221{,}02$ (5 ans). La population dépasse $3\\,000$ makis au bout de $5$ ans."
          },
          {
            n: "4.", points: 2,
            texte: "La population avait déjà augmenté de $10\\,\\%$ pendant l'année qui précède l'étude. Combien de makis comptait-elle un an avant le début de l'étude ? Arrondis à l'unité.",
            indice: "On divise par le coefficient $1{,}1$ : on ne retire pas $10\\,\\%$ de $2\\,000$.",
            corrige: "$\\dfrac{2\\,000}{1{,}1} = \\dfrac{20\\,000}{11} \\approx 1\\,818{,}2$ : environ $1\\,818$ makis. Retirer $10\\,\\%$ de $2\\,000$ donnerait $1\\,800$, ce qui est faux : $1\\,800 \\times 1{,}1 = 1\\,980$."
          }
        ]
      }
    ]
  }
};
