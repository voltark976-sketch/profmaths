/*
  ENTRAÎNEMENT : Première tronc commun — chapitre 1, Automatismes : évolutions et pourcentages
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre tronc-evolutions.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Contextes différents de ceux de Première technologique (même cours, autres exercices).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["tronc-evolutions"] = {
  revisions: {
    intro: "Les évolutions en un coup d'œil : coefficient multiplicateur, taux d'évolution, valeurs finale et initiale, évolutions successives, taux réciproque et points de pourcentage. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Coefficient multiplicateur",
        texte: "Augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$ ; baisser de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$. Par exemple, $+15\\,\\%$ donne $1{,}15$ et $-40\\,\\%$ donne $0{,}6$."
      },
      {
        titre: "Taux d'évolution",
        texte: "De $V_0$ à $V_1$ : $t = \\dfrac{V_1 - V_0}{V_0}$, en divisant toujours par la valeur de départ. De $50$ à $60$, $t = \\dfrac{10}{50} = 0{,}2$, soit $+20\\,\\%$."
      },
      {
        titre: "Valeur initiale",
        texte: "$V_1 = V_0 \\times CM$, donc $V_0 = \\dfrac{V_1}{CM}$ : on divise par le coefficient, on ne retire pas le pourcentage à la valeur finale."
      },
      {
        titre: "Évolutions successives",
        texte: "Les coefficients se multiplient : $-10\\,\\%$ puis $-10\\,\\%$ donnent $0{,}9 \\times 0{,}9 = 0{,}81$, soit $-19\\,\\%$, et non $-20\\,\\%$."
      },
      {
        titre: "Taux réciproque",
        texte: "Pour revenir au départ, on multiplie par $\\dfrac{1}{CM}$ : après $+100\\,\\%$ (le double), il faut diviser par $2$, soit une baisse de $50\\,\\%$."
      },
      {
        titre: "Points de pourcentage",
        texte: "Si un taux passe de $40\\,\\%$ à $50\\,\\%$, il gagne $10$ points, mais son taux d'évolution est $\\dfrac{10}{40} = 0{,}25$, soit $+25\\,\\%$."
      }
    ],
    pieges: [
      "Additionner des pourcentages successifs : $+20\\,\\%$ puis $+20\\,\\%$ font $+44\\,\\%$.",
      "Retrouver une valeur initiale en retirant le pourcentage à la valeur finale.",
      "Croire qu'une hausse de $t\\,\\%$ s'annule par une baisse de $t\\,\\%$.",
      "Diviser par la valeur d'arrivée dans un taux d'évolution.",
      "Oublier le $1$ du coefficient : $+8\\,\\%$ multiplie par $1{,}08$, pas par $0{,}08$.",
      "Confondre points de pourcentage et taux d'évolution."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Les soldes",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Une paire de baskets coûte $80$ €. Pendant les soldes, son prix baisse de $25\\,\\%$. Une semaine plus tard, le magasin fait une démarque supplémentaire de $20\\,\\%$ sur le prix soldé.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule le prix des baskets après la première baisse, puis après la seconde.",
            indice: "Baisser de $25\\,\\%$, c'est multiplier par $0{,}75$ ; baisser de $20\\,\\%$, par $0{,}8$.",
            corrige: "Après la première baisse : $80 \\times 0{,}75 = 60$ €. Après la seconde : $60 \\times 0{,}8 = 48$ €."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule le coefficient multiplicateur global et le taux d'évolution global.",
            indice: "Multiplie les deux coefficients.",
            corrige: "$CM = 0{,}75 \\times 0{,}8 = 0{,}6$ : le taux global est $0{,}6 - 1 = -0{,}4$, soit une baisse de $40\\,\\%$. On vérifie : $80 \\times 0{,}6 = 48$ €."
          },
          {
            n: "3.", points: 1.5,
            texte: "Une vendeuse affirme : « Moins $25\\,\\%$ puis moins $20\\,\\%$, ça fait moins $45\\,\\%$. » Explique son erreur.",
            indice: "Sur quel prix porte la seconde baisse ?",
            corrige: "Les taux ne s'additionnent pas : la seconde baisse de $20\\,\\%$ porte sur $60$ €, pas sur $80$ €. Elle retire $12$ €, et non $16$ €. La baisse totale est de $32$ € sur $80$ €, soit $40\\,\\%$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Après les soldes, le prix revient à $80$ €. Quel est le taux d'évolution de $48$ € à $80$ € ? Donne-le sous forme de fraction, puis en pourcentage arrondi à l'unité.",
            indice: "$t = \\dfrac{80 - 48}{48}$. Simplifie la fraction.",
            corrige: "$t = \\dfrac{80 - 48}{48} = \\dfrac{32}{48} = \\dfrac{2}{3} \\approx 0{,}667$ : une hausse d'environ $67\\,\\%$. C'est le taux réciproque de $-40\\,\\%$ : $\\dfrac{1}{0{,}6} = \\dfrac{5}{3}$."
          },
          {
            n: "5.", points: 1,
            texte: "Pendant ces soldes, un tee-shirt qui a subi les deux baisses coûte $18$ €. Quel était son prix avant les soldes ?",
            indice: "Le prix de départ multiplié par $0{,}6$ donne $18$.",
            corrige: "$V_0 \\times 0{,}6 = 18$, donc $V_0 = \\dfrac{18}{0{,}6} = 30$ € (et non $18 + 40\\,\\%$ de $18$)."
          }
        ]
      },
      {
        titre: "La population d'une commune",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Une commune comptait $12\\,000$ habitants en 2020. Sa population a augmenté de $5\\,\\%$ par an en 2021 et en 2022, puis elle a baissé de $10\\,\\%$ en 2023 (données fictives).",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule le nombre d'habitants en 2021 et en 2022.",
            indice: "Multiplie par $1{,}05$ chaque année ; $5\\,\\%$ de $12\\,000$, c'est $600$.",
            corrige: "En 2021 : $12\\,000 \\times 1{,}05 = 12\\,600$. En 2022 : $12\\,600 \\times 1{,}05 = 12\\,600 + 630 = 13\\,230$ habitants."
          },
          {
            n: "2.", points: 1.5,
            texte: "Quel est le taux d'évolution global de 2020 à 2022 ? Pourquoi n'est-ce pas $+10\\,\\%$ ?",
            indice: "Le coefficient global est $1{,}05 \\times 1{,}05$.",
            corrige: "$1{,}05^2 = 1{,}1025$ : le taux global est de $+10{,}25\\,\\%$. La seconde hausse de $5\\,\\%$ porte sur $12\\,600$ habitants, pas sur $12\\,000$ : elle ajoute $630$ habitants, et non $600$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule le nombre d'habitants en 2023, puis le coefficient multiplicateur global de 2020 à 2023. La population a-t-elle augmenté ou baissé depuis 2020 ?",
            indice: "Baisser de $10\\,\\%$, c'est retirer le dixième.",
            corrige: "En 2023 : $13\\,230 - 1\\,323 = 11\\,907$ habitants. Le coefficient global est $1{,}1025 \\times 0{,}9 = 0{,}99225$, inférieur à $1$ : la population a légèrement baissé depuis 2020, d'environ $0{,}8\\,\\%$ ($12\\,000 \\times 0{,}99225 = 11\\,907$)."
          },
          {
            n: "4.", points: 1.5,
            texte: "En 2022, $60\\,\\%$ des habitants avaient moins de $30$ ans, et $25\\,\\%$ de ces moins de $30$ ans étaient lycéens. Quelle proportion de la population de la commune était lycéenne ? Combien de lycéens cela fait-il ?",
            indice: "Une proportion d'une proportion se calcule par un produit.",
            corrige: "$0{,}25 \\times 0{,}6 = 0{,}15$ : $15\\,\\%$ de la population était lycéenne, soit $0{,}15 \\times 13\\,230 = 1\\,984{,}5$, environ $1\\,985$ lycéens."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « Une hausse de $10\\,\\%$ suivie d'une baisse de $10\\,\\%$ ramène à la valeur de départ. » Justifie.",
            indice: "Calcule $1{,}1 \\times 0{,}9$.",
            corrige: "**Faux.** $1{,}1 \\times 0{,}9 = 0{,}99$ : au total, on perd $1\\,\\%$."
          }
        ]
      },
      {
        titre: "Le taux de chômage",
        duree: 25, points: 6, calculatrice: false,
        contexte: "Dans une région (données fictives), le taux de chômage passe de $25\\,\\%$ à $20\\,\\%$ en un an. Le nombre d'actifs (personnes qui travaillent ou cherchent un emploi) passe de $80\\,000$ à $90\\,000$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "De combien de points le taux de chômage a-t-il baissé ? Quel est son taux d'évolution ?",
            indice: "Points : une différence. Taux d'évolution : $\\dfrac{V_1 - V_0}{V_0}$.",
            corrige: "Il a baissé de $25 - 20 = 5$ points. Son taux d'évolution est $\\dfrac{20 - 25}{25} = -0{,}2$, soit $-20\\,\\%$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule le nombre de chômeurs chaque année. Ce nombre a-t-il baissé ? De quel pourcentage ?",
            indice: "Nombre de chômeurs : taux de chômage $\\times$ nombre d'actifs.",
            corrige: "Première année : $0{,}25 \\times 80\\,000 = 20\\,000$ chômeurs. Seconde année : $0{,}2 \\times 90\\,000 = 18\\,000$. Le nombre a baissé de $2\\,000$, soit $\\dfrac{2\\,000}{20\\,000} = 0{,}1$ : une baisse de $10\\,\\%$."
          },
          {
            n: "3.", points: 1.5,
            texte: "De quel pourcentage le taux de chômage devrait-il augmenter pour revenir à $25\\,\\%$ ?",
            indice: "On part maintenant de $20\\,\\%$.",
            corrige: "$\\dfrac{25 - 20}{20} = 0{,}25$ : il devrait augmenter de $25\\,\\%$. C'est le taux réciproque : $\\dfrac{1}{0{,}8} = 1{,}25$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Un élu déclare : « Le chômage a baissé de $5\\,\\%$. » Corrige sa phrase de deux façons, une pour le taux de chômage et une pour le nombre de chômeurs.",
            indice: "Utilise les questions 1 et 2.",
            corrige: "Le taux de chômage a baissé de $5$ **points**, c'est-à-dire de $20\\,\\%$. Le nombre de chômeurs, lui, a baissé de $10\\,\\%$, car le nombre d'actifs a augmenté."
          }
        ]
      }
    ]
  }
};
