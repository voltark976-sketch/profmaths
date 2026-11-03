/*
  ENTRAÎNEMENT : 3e — chapitre 4, Équations
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre troisieme-equations.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type brevet.
  Équations et problèmes différents de ceux du cours, de la méthode et du QCM du chapitre ; prix fictifs.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["troisieme-equations"] = {
  revisions: {
    intro: "Les équations en un coup d'œil : premier degré, équations produits, $x^2 = a$ et mise en équation. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Premier degré",
        texte: "On isole $x$ : on peut ajouter ou soustraire un même nombre aux deux membres, et les multiplier ou les diviser par un même nombre **non nul**. Exemple : $4x - 7 = x + 8 \\iff 3x = 15 \\iff x = 5$."
      },
      {
        titre: "Vérifier",
        texte: "On remplace $x$ par la solution trouvée dans chaque membre : on doit obtenir le même nombre."
      },
      {
        titre: "Équation produit",
        texte: "Un produit est nul si et seulement si l'un au moins de ses facteurs est nul : $A \\times B = 0 \\iff A = 0$ ou $B = 0$."
      },
      {
        titre: "Factoriser d'abord",
        texte: "Pour $x^2 - 7x = 0$, on factorise : $x(x - 7) = 0$, donc $x = 0$ ou $x = 7$. On ne divise pas par $x$ : on perdrait la solution $0$."
      },
      {
        titre: "Équations $x^2 = a$",
        texte: "Si $a > 0$ : deux solutions, $\\sqrt{a}$ et $-\\sqrt{a}$. Si $a = 0$ : une solution, $0$. Si $a < 0$ : aucune solution, car un carré n'est jamais négatif."
      },
      {
        titre: "Mettre en équation",
        texte: "On choisit l'inconnue (ce que l'on cherche), on écrit l'équation, on la résout, on vérifie, puis on conclut par une phrase."
      }
    ],
    pieges: [
      "Oublier la solution négative de $x^2 = 16$ : c'est $4$ et $-4$.",
      "Diviser par $x$ dans $x^2 = 3x$ et perdre la solution $0$.",
      "Changer le signe d'un terme qu'on ne fait pas changer de membre.",
      "Croire que $x^2 = -9$ a des solutions.",
      "Oublier de répondre à la question posée par une phrase."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme au brevet (environ $60$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "La vente de la fête du collège",
        duree: 20, points: 6, calculatrice: true,
        contexte: "À la fête du collège, un samoussa coûte $0{,}50$ € et un jus de fruits $1{,}20$ €. Ayman achète trois fois plus de samoussas que de jus, et il paie $13{,}50$ € en tout (prix fictifs).",
        questions: [
          { n: "1.", points: 1, texte: "S'il achète $4$ jus, combien paie-t-il ? Est-ce le bon nombre de jus ?", corrige: "$4$ jus et $12$ samoussas : $4 \\times 1{,}20 + 12 \\times 0{,}50 = 4{,}80 + 6 = 10{,}80$ €. Ce n'est pas $13{,}50$ € : il n'a pas acheté $4$ jus." },
          { n: "2.", points: 2, texte: "On note $x$ le nombre de jus. Montre que le prix payé s'écrit $2{,}7x$.", indice: "Il y a $3x$ samoussas.", corrige: "Il achète $x$ jus et $3x$ samoussas : $1{,}20x + 0{,}50 \\times 3x = 1{,}20x + 1{,}50x = 2{,}7x$." },
          { n: "3.", points: 2, texte: "Écris une équation, puis résous-la.", corrige: "$2{,}7x = 13{,}50 \\iff x = \\dfrac{13{,}50}{2{,}7} = 5$." },
          { n: "4.", points: 1, texte: "Conclus, puis vérifie.", corrige: "Ayman a acheté $5$ jus et $15$ samoussas. Vérification : $5 \\times 1{,}20 + 15 \\times 0{,}50 = 6 + 7{,}50 = 13{,}50$ €." }
        ]
      },
      {
        titre: "Résoudre des équations",
        duree: 20, points: 8, calculatrice: false,
        contexte: "Résous chaque équation. Les questions sont indépendantes. Donne les solutions sous forme de fraction irréductible quand elles ne sont pas entières.",
        questions: [
          { n: "1.", points: 1.5, texte: "$4x - 7 = x + 8$", corrige: "$4x - x = 8 + 7$, soit $3x = 15$, donc $x = 5$. Vérification : $4 \\times 5 - 7 = 13$ et $5 + 8 = 13$." },
          { n: "2.", points: 1.5, texte: "$2(x - 1) - 3 = 5x + 4$", indice: "Développe d'abord le membre de gauche.", corrige: "$2x - 2 - 3 = 5x + 4$, soit $2x - 5 = 5x + 4$, donc $-3x = 9$ et $x = -3$." },
          { n: "3.", points: 1.5, texte: "$(2x + 3)(x - 4) = 0$", indice: "C'est une équation produit.", corrige: "$2x + 3 = 0$ ou $x - 4 = 0$, donc $x = -\\dfrac{3}{2}$ ou $x = 4$." },
          { n: "4.", points: 1.5, texte: "$x^2 - 7x = 0$", indice: "Factorise par $x$.", corrige: "$x(x - 7) = 0$, donc $x = 0$ ou $x = 7$." },
          { n: "5.", points: 2, texte: "$3x^2 = 48$", indice: "Divise par $3$ pour te ramener à $x^2 = a$.", corrige: "$x^2 = 16$, donc $x = 4$ ou $x = -4$." }
        ]
      },
      {
        titre: "Le carré et le rectangle",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Un carré a pour côté $x$ centimètres. Un rectangle a pour longueur $x + 6$ et pour largeur $x - 2$, en centimètres, avec $x > 2$.",
        questions: [
          { n: "1.", points: 1.5, texte: "Montre que le périmètre du rectangle dépasse toujours celui du carré de $8$ cm.", corrige: "Périmètre du carré : $4x$. Périmètre du rectangle : $2\\left[(x + 6) + (x - 2)\\right] = 2(2x + 4) = 4x + 8$. Il dépasse toujours celui du carré de $8$ cm." },
          { n: "2.", points: 2, texte: "Pour quelle valeur de $x$ le carré et le rectangle ont-ils la même aire ?", indice: "Développe $(x + 6)(x - 2)$, puis résous $x^2 = (x + 6)(x - 2)$.", corrige: "$(x + 6)(x - 2) = x^2 - 2x + 6x - 12 = x^2 + 4x - 12$.\n\n$x^2 = x^2 + 4x - 12 \\iff 0 = 4x - 12 \\iff x = 3$." },
          { n: "3.", points: 1, texte: "Vérifie ce résultat.", corrige: "Pour $x = 3$ : le carré a une aire de $9$ cm², et le rectangle mesure $9$ cm sur $1$ cm, soit $9$ cm² aussi." },
          { n: "4.", points: 1.5, texte: "On veut maintenant que le carré ait une aire de $50$ cm². Donne la valeur exacte de $x$, puis une valeur approchée au millimètre.", corrige: "$x^2 = 50$ avec $x > 0$, donc $x = \\sqrt{50}$. Avec la calculatrice, $x \\approx 7{,}07$ cm, soit environ $7{,}1$ cm au millimètre près." }
        ]
      }
    ]
  }
};
