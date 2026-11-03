/*
  ENTRAÎNEMENT : Première technologique — chapitre 3, Automatismes : évolutions et pourcentages
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre techno-evolutions.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["techno-evolutions"] = {
  revisions: {
    intro: "Les évolutions en un coup d'œil : pourcentage d'une quantité, coefficient multiplicateur, taux d'évolution, valeurs finale et initiale, évolutions successives, taux réciproque et points de pourcentage. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Prendre un pourcentage",
        texte: "Prendre $t\\,\\%$ d'une quantité, c'est la multiplier par $\\dfrac{t}{100}$ : $15\\,\\%$ de $80$ font $0{,}15 \\times 80 = 12$. Une proportion d'une proportion se calcule par un produit."
      },
      {
        titre: "Coefficient multiplicateur",
        texte: "Une hausse de $t\\,\\%$ multiplie par $1 + \\dfrac{t}{100}$, une baisse de $t\\,\\%$ par $1 - \\dfrac{t}{100}$ : $+8\\,\\%$ donne $CM = 1{,}08$ et $-30\\,\\%$ donne $CM = 0{,}7$."
      },
      {
        titre: "Taux d'évolution",
        texte:
          "- $t = \\dfrac{V_1 - V_0}{V_0}$ : on divise par la valeur de **départ** ;\n" +
          "- valeur finale : $V_1 = V_0 \\times CM$ ;\n" +
          "- valeur initiale : $V_0 = \\dfrac{V_1}{CM}$."
      },
      {
        titre: "Évolutions successives",
        texte: "Les coefficients se **multiplient** : $+20\\,\\%$ puis $+20\\,\\%$ donnent $1{,}2 \\times 1{,}2 = 1{,}44$, soit $+44\\,\\%$. Les taux ne s'additionnent jamais."
      },
      {
        titre: "Taux réciproque",
        texte: "Pour revenir à la valeur de départ, on multiplie par $\\dfrac{1}{CM}$. Après une baisse de $50\\,\\%$ ($CM = 0{,}5$), il faut multiplier par $2$ : une hausse de $100\\,\\%$."
      },
      {
        titre: "Points de pourcentage",
        texte: "Quand un taux passe de $20\\,\\%$ à $25\\,\\%$, il gagne $5$ **points** de pourcentage, mais son taux d'évolution est $\\dfrac{25 - 20}{20} = 0{,}25$, soit $+25\\,\\%$."
      }
    ],
    pieges: [
      "Additionner des pourcentages successifs : $+20\\,\\%$ puis $+20\\,\\%$ font $+44\\,\\%$, pas $+40\\,\\%$.",
      "Retrouver la valeur initiale en retirant le pourcentage à la valeur finale : il faut diviser par le coefficient.",
      "Croire qu'une hausse de $t\\,\\%$ s'annule par une baisse de $t\\,\\%$.",
      "Diviser par la valeur d'arrivée au lieu de la valeur de départ dans un taux d'évolution.",
      "Oublier le $1$ dans le coefficient : une hausse de $8\\,\\%$ multiplie par $1{,}08$, pas par $0{,}08$.",
      "Confondre une variation en points et un taux d'évolution quand la grandeur est un pourcentage."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le prix d'un forfait internet",
        duree: 25, points: 7, calculatrice: false,
        contexte: "En janvier, un forfait internet coûte $30$ € par mois. En avril, son prix augmente de $20\\,\\%$. En septembre, une promotion le fait baisser de $25\\,\\%$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Donne les coefficients multiplicateurs de ces deux évolutions, puis le prix du forfait en avril et en septembre.",
            indice: "Une hausse de $20\\,\\%$ multiplie par $1{,}2$ ; une baisse de $25\\,\\%$ multiplie par $0{,}75$.",
            corrige: "Les coefficients sont $1{,}2$ et $0{,}75$. En avril : $30 \\times 1{,}2 = 36$ €. En septembre : $36 \\times 0{,}75 = 27$ €."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule le coefficient multiplicateur global de janvier à septembre, puis le taux d'évolution global. Pourquoi n'est-ce pas $-5\\,\\%$ ?",
            indice: "Le coefficient global est le produit des coefficients.",
            corrige: "$CM = 1{,}2 \\times 0{,}75 = 0{,}9$ : le taux global est $0{,}9 - 1 = -0{,}1$, soit $-10\\,\\%$.\n\nCe n'est pas $20 - 25 = -5$ : les taux ne s'additionnent pas. La baisse de $25\\,\\%$ porte sur $36$ €, un prix plus grand que $30$ €."
          },
          {
            n: "3.", points: 1.5,
            texte: "Retrouve ce taux global directement à partir des prix de janvier et de septembre.",
            indice: "$t = \\dfrac{V_1 - V_0}{V_0}$, avec $V_0$ le prix de départ.",
            corrige: "$t = \\dfrac{27 - 30}{30} = \\dfrac{-3}{30} = -0{,}1$ : on retrouve bien $-10\\,\\%$."
          },
          {
            n: "4.", points: 1.5,
            texte: "En décembre, le forfait revient à $30$ €. Quel est le taux d'évolution de septembre à décembre ? Donne-le sous forme de fraction, puis arrondi à $0{,}1\\,\\%$.",
            indice: "On part maintenant de $27$ €. Et $\\dfrac{1}{9} \\approx 0{,}111$.",
            corrige: "$t = \\dfrac{30 - 27}{27} = \\dfrac{3}{27} = \\dfrac{1}{9} \\approx 0{,}111$, soit une hausse d'environ $11{,}1\\,\\%$. C'est le taux réciproque de $-10\\,\\%$ : $\\dfrac{1}{0{,}9} = \\dfrac{10}{9}$."
          },
          {
            n: "5.", points: 1,
            texte: "En septembre, l'opérateur annonçait : « $-25\\,\\%$ : vous retrouvez le prix de janvier ! » Vrai ou faux ? Justifie.",
            indice: "Compare le prix de septembre et celui de janvier.",
            corrige: "**Faux.** En septembre, le forfait coûte $27$ €, moins que les $30$ € de janvier : une baisse de $25\\,\\%$ n'annule pas une hausse de $20\\,\\%$."
          }
        ]
      },
      {
        titre: "Les bananes de la coopérative",
        duree: 25, points: 7, calculatrice: false,
        contexte: "En 2026, une coopérative agricole a vendu $48$ tonnes de bananes, soit $20\\,\\%$ de plus qu'en 2025.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Combien de tonnes de bananes la coopérative a-t-elle vendues en 2025 ? Explique pourquoi on ne calcule pas $48 - 20\\,\\%$ de $48$.",
            indice: "La masse de 2025, multipliée par $1{,}2$, donne $48$.",
            corrige: "$V_0 \\times 1{,}2 = 48$, donc $V_0 = \\dfrac{48}{1{,}2} = 40$ tonnes.\n\nLes $20\\,\\%$ sont calculés sur la masse de 2025, pas sur celle de 2026 : $48 - 0{,}2 \\times 48 = 38{,}4$ serait faux."
          },
          {
            n: "2.", points: 1.5,
            texte: "Pour 2027, la coopérative prévoit une baisse de $15\\,\\%$ à cause d'une maladie des bananiers. Combien de tonnes prévoit-elle de vendre ?",
            indice: "Multiplie par $0{,}85$, ou retire $15\\,\\%$ de $48$.",
            corrige: "$48 \\times 0{,}85 = 48 - 7{,}2 = 40{,}8$ tonnes."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule le taux d'évolution global de 2025 à 2027 de deux façons.",
            indice: "Avec les masses $40$ et $40{,}8$, puis avec le produit des coefficients.",
            corrige: "Avec les masses : $\\dfrac{40{,}8 - 40}{40} = \\dfrac{0{,}8}{40} = 0{,}02$. Avec les coefficients : $1{,}2 \\times 0{,}85 = 1{,}02$. Dans les deux cas, le taux global est de $+2\\,\\%$."
          },
          {
            n: "4.", points: 1.5,
            texte: "En 2026, les bananes représentent $60\\,\\%$ de la masse totale vendue par la coopérative, et la banane plantain représente $25\\,\\%$ des bananes vendues. Quelle masse totale la coopérative a-t-elle vendue ? Quelle part de cette masse totale représente la banane plantain ?",
            indice: "$48$ tonnes, ce sont $60\\,\\%$ du total. Pour la seconde, c'est une proportion d'une proportion.",
            corrige: "Total : $\\dfrac{48}{0{,}6} = 80$ tonnes. La banane plantain représente $0{,}25 \\times 0{,}6 = 0{,}15$, soit $15\\,\\%$ de la masse totale ($12$ tonnes)."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « Si une production baisse de $15\\,\\%$, puis augmente de $15\\,\\%$, elle retrouve sa valeur de départ. » Justifie.",
            indice: "Calcule $0{,}85 \\times 1{,}15$.",
            corrige: "**Faux.** $0{,}85 \\times 1{,}15 = 0{,}9775$ : au total, la production a baissé de $2{,}25\\,\\%$."
          }
        ]
      },
      {
        titre: "Le taux de réussite au bac",
        duree: 25, points: 6, calculatrice: false,
        contexte: "Dans un lycée, le taux de réussite au bac passe de $75\\,\\%$ en 2025 à $81\\,\\%$ en 2026. Le nombre de candidats passe de $400$ en 2025 à $500$ en 2026.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "De combien de points de pourcentage le taux de réussite a-t-il augmenté ? Quel est son taux d'évolution ?",
            indice: "Points : une différence. Taux d'évolution : $\\dfrac{V_1 - V_0}{V_0}$.",
            corrige: "Il gagne $81 - 75 = 6$ points de pourcentage. Son taux d'évolution est $\\dfrac{81 - 75}{75} = \\dfrac{6}{75} = 0{,}08$, soit $+8\\,\\%$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule le nombre d'admis en 2025 et en 2026, puis le taux d'évolution du nombre d'admis.",
            indice: "Nombre d'admis : taux de réussite $\\times$ nombre de candidats.",
            corrige: "En 2025 : $0{,}75 \\times 400 = 300$ admis. En 2026 : $0{,}81 \\times 500 = 405$ admis. Taux d'évolution : $\\dfrac{405 - 300}{300} = \\dfrac{105}{300} = 0{,}35$, soit $+35\\,\\%$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Un journal titre : « Le taux de réussite a augmenté de $6\\,\\%$. » Corrige cette phrase.",
            indice: "Le taux de réussite est lui-même un pourcentage.",
            corrige: "Il fallait écrire : « Le taux de réussite a augmenté de $6$ points », ou « … a augmenté de $8\\,\\%$ ». Quand la grandeur est un pourcentage, une différence se compte en points."
          },
          {
            n: "4.", points: 1.5,
            texte: "En 2026, $40\\,\\%$ des admis ont une mention. Combien d'élèves ont une mention ? Quelle proportion des candidats cela représente-t-il ?",
            indice: "Une proportion d'une proportion se calcule par un produit.",
            corrige: "$0{,}4 \\times 405 = 162$ élèves ont une mention. Parmi les candidats, cela représente $0{,}81 \\times 0{,}4 = 0{,}324$, soit $32{,}4\\,\\%$ (et $\\dfrac{162}{500} = 0{,}324$)."
          }
        ]
      }
    ]
  }
};
