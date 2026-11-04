/*
  ENTRAÎNEMENT : 4e — chapitre 13, Équations
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre quatrieme-equations.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle de 4e.
  Équations et problèmes différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["quatrieme-equations"] = {
  revisions: {
    intro: "Les équations en un coup d'œil : tester une valeur, garder l'égalité équilibrée, résoudre et mettre un problème en équation. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Une équation",
        texte: "C'est une égalité qui contient une inconnue. Une solution est une valeur de l'inconnue pour laquelle l'égalité est vraie."
      },
      {
        titre: "Tester une valeur",
        texte: "On calcule séparément les deux membres : pour $x = 2$, $4x - 1 = 7$ et $x + 5 = 7$. Ils sont égaux, donc $2$ est solution de $4x - 1 = x + 5$."
      },
      {
        titre: "Garder l'équilibre",
        texte: "On peut ajouter ou soustraire un même nombre aux deux membres, et les multiplier ou les diviser par un même nombre non nul : l'égalité reste vraie."
      },
      {
        titre: "La méthode",
        texte: "On regroupe les termes en $x$ d'un côté et les nombres de l'autre : $6x - 5 = 2x + 7$ donne $4x = 12$, puis $x = 3$."
      },
      {
        titre: "Mettre en équation",
        texte: "On choisit l'inconnue, on traduit l'énoncé par une équation, on la résout, puis on vérifie et on conclut par une phrase."
      }
    ],
    pieges: [
      "Faire passer un terme de l'autre côté sans changer son signe.",
      "Ne diviser qu'une partie d'un membre.",
      "Oublier de développer les parenthèses : $2(x + 3) = 2x + 6$.",
      "Ne pas vérifier la solution dans l'équation de départ.",
      "Oublier de répondre à la question posée, par une phrase."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $50$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Tester et résoudre",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Détaille chaque étape.",
        questions: [
          { n: "1.", points: 1, texte: "Le nombre $-2$ est-il solution de l'équation $5x + 4 = x - 4$ ?", corrige: "Pour $x = -2$ : $5 \\times (-2) + 4 = -6$ et $-2 - 4 = -6$. Les deux membres sont égaux : $-2$ est solution." },
          { n: "2.", points: 1.5, texte: "Résous $8x - 3 = 21$.", corrige: "$8x = 24$, donc $x = 3$." },
          { n: "3.", points: 1.5, texte: "Résous $9 - 2x = 3x - 11$.", corrige: "$9 + 11 = 3x + 2x$, soit $20 = 5x$, donc $x = 4$." },
          { n: "4.", points: 1.5, texte: "Résous $4(x - 3) = 2x + 5$.", indice: "Développe d'abord le premier membre.", corrige: "$4x - 12 = 2x + 5$, puis $2x = 17$, donc $x = 8{,}5$." },
          { n: "5.", points: 1.5, texte: "Résous $\\dfrac{x}{3} + 2 = 7$.", corrige: "$\\dfrac{x}{3} = 5$, donc $x = 15$." }
        ]
      },
      {
        titre: "Trois problèmes",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Pour chaque problème, choisis l'inconnue, écris une équation, résous-la, puis conclus par une phrase.",
        questions: [
          { n: "1.", points: 2.5, texte: "Un triangle isocèle a une base de $x + 2$ cm et deux côtés égaux de $2x - 1$ cm. Son périmètre vaut $35$ cm. Trouve $x$, puis les longueurs des côtés.", corrige: "$(x + 2) + 2(2x - 1) = 35$, soit $x + 2 + 4x - 2 = 35$, donc $5x = 35$ et $x = 7$.\n\nLe triangle a une base de $9$ cm et deux côtés de $13$ cm (vérification : $9 + 13 + 13 = 35$)." },
          { n: "2.", points: 2.5, texte: "Moussa a trois fois plus de billes qu'Ali. S'il donne $12$ billes à Ali, ils en ont autant l'un que l'autre. Combien chacun a-t-il de billes au départ ?", indice: "Appelle $x$ le nombre de billes d'Ali.", corrige: "Ali a $x$ billes, Moussa $3x$. Après le don : $3x - 12 = x + 12$, donc $2x = 24$ et $x = 12$.\n\nAli a $12$ billes et Moussa $36$ (après le don, chacun en a $24$)." },
          { n: "3.", points: 2, texte: "Le rectangle A mesure $5$ cm sur $x + 1$ cm, le rectangle B mesure $3$ cm sur $x + 5$ cm. Pour quelle valeur de $x$ ont-ils la même aire ?", corrige: "$5(x + 1) = 3(x + 5)$, soit $5x + 5 = 3x + 15$, donc $2x = 10$ et $x = 5$. Les deux rectangles ont alors une aire de $30$ cm²." }
        ]
      },
      {
        titre: "Le programme mystère",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Voici un programme de calcul :\n\n- choisir un nombre ;\n- le multiplier par $3$ ;\n- soustraire $7$ ;\n- multiplier le résultat par $2$.",
        questions: [
          { n: "1.", points: 1.5, texte: "Quel résultat obtient-on en choisissant $4$ ?", corrige: "$4 \\times 3 = 12$ ; $12 - 7 = 5$ ; $5 \\times 2 = 10$." },
          { n: "2.", points: 1.5, texte: "On choisit un nombre $x$. Exprime le résultat en fonction de $x$, sous forme développée.", corrige: "$2(3x - 7) = 6x - 14$." },
          { n: "3.", points: 1.5, texte: "Quel nombre faut-il choisir pour obtenir $22$ ?", corrige: "$6x - 14 = 22$, donc $6x = 36$ et $x = 6$." },
          { n: "4.", points: 1.5, texte: "Quel nombre faut-il choisir pour obtenir le nombre de départ ?", corrige: "$6x - 14 = x$, donc $5x = 14$ et $x = 2{,}8$. Vérification : $2{,}8 \\times 3 = 8{,}4$ ; $8{,}4 - 7 = 1{,}4$ ; $1{,}4 \\times 2 = 2{,}8$." }
        ]
      }
    ]
  }
};
