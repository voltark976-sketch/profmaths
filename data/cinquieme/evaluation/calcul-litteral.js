/*
  ENTRAÎNEMENT : 5e — chapitre 11, Calcul littéral
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-calcul-litteral.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e, sans calculatrice.
  Expressions différentes de celles du cours, de la méthode, du QCM et de l'entraînement de 4e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-calcul-litteral"] = {
  revisions: {
    intro: "Le calcul littéral en un coup d'œil : carrés et cubes, écriture simplifiée, substitution, développer, factoriser, réduire et prouver. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Carrés et cubes",
        texte: "$a^2 = a \\times a$ et $a^3 = a \\times a \\times a$ : $7^2 = 49$ et $3^3 = 27$. Les puissances se calculent avant les multiplications : $2 \\times 4^2 = 2 \\times 16 = 32$."
      },
      {
        titre: "Simplifier l'écriture",
        texte: "On peut supprimer le signe $\\times$ devant une lettre ou une parenthèse : $4 \\times x = 4x$, $a \\times b = ab$, $x \\times x = x^2$ et $3 \\times (x + 1) = 3(x + 1)$."
      },
      {
        titre: "Calculer une expression",
        texte: "On remplace la lettre par sa valeur, en rétablissant les signes $\\times$ : pour $x = 3$, $2x^2 + 1 = 2 \\times 9 + 1 = 19$."
      },
      {
        titre: "Développer, factoriser",
        texte: "$k(a + b) = ka + kb$ : développer, c'est passer de gauche à droite ($5(x + 2) = 5x + 10$), factoriser, de droite à gauche ($7x + 14 = 7(x + 2)$)."
      },
      {
        titre: "Réduire",
        texte: "On regroupe les termes de même nature : $3x + 2 + 5x - 1 = 8x + 1$."
      },
      {
        titre: "Prouver",
        texte: "Pour prouver qu'une propriété est toujours vraie, on calcule avec des lettres ; un exemple ne suffit pas. Pour prouver qu'elle est fausse, un seul contre-exemple suffit."
      }
    ],
    pieges: [
      "Confondre $x^2$ et $2x$.",
      "Calculer $2 \\times 3^2$ comme $(2 \\times 3)^2$.",
      "Réduire $3x + 2$ en $5x$.",
      "Ne pas distribuer à tous les termes de la parenthèse.",
      "Croire qu'un exemple suffit pour prouver qu'une propriété est toujours vraie."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Calculer des expressions",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Écris les calculs.",
        questions: [
          { n: "1.", points: 2, texte: "Calcule $5^2$ ; $2 \\times 3^2$ ; $(2 \\times 3)^2$ et $4^3$.", corrige: "$5^2 = 25$ ; $2 \\times 3^2 = 2 \\times 9 = 18$ ; $(2 \\times 3)^2 = 6^2 = 36$ ; $4^3 = 64$." },
          { n: "2.", points: 2.5, texte: "Calcule $A = 3x^2 - 2x + 1$ pour $x = 2$, puis pour $x = 5$.", corrige: "Pour $x = 2$ : $A = 3 \\times 4 - 2 \\times 2 + 1 = 12 - 4 + 1 = 9$.\n\nPour $x = 5$ : $A = 3 \\times 25 - 2 \\times 5 + 1 = 75 - 10 + 1 = 66$." },
          { n: "3.", points: 1.5, texte: "Calcule $B = 2a + 3b - ab$ pour $a = 4$ et $b = 2$.", corrige: "$B = 2 \\times 4 + 3 \\times 2 - 4 \\times 2 = 8 + 6 - 8 = 6$." },
          { n: "4.", points: 1, texte: "Écris plus simplement $3 \\times x \\times x$ et $2 \\times a \\times 5$.", corrige: "$3 \\times x \\times x = 3x^2$ et $2 \\times a \\times 5 = 10a$." }
        ]
      },
      {
        titre: "Développer, factoriser, réduire",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Écris les étapes.",
        questions: [
          { n: "1.", points: 2, texte: "Développe $6(x + 3)$ et $4(2y - 5)$.", corrige: "$6(x + 3) = 6x + 18$ et $4(2y - 5) = 8y - 20$." },
          { n: "2.", points: 2, texte: "Factorise $9a + 27$ et $10x - 15$.", corrige: "$9a + 27 = 9 \\times a + 9 \\times 3 = 9(a + 3)$ et $10x - 15 = 5 \\times 2x - 5 \\times 3 = 5(2x - 3)$." },
          { n: "3.", points: 2, texte: "Réduis $7x + 4 - 3x + 6$ et $2x^2 + 5x - x^2 - 2x$.", corrige: "$7x - 3x + 4 + 6 = 4x + 10$ et $2x^2 - x^2 + 5x - 2x = x^2 + 3x$." },
          { n: "4.", points: 1, texte: "Développe, puis réduis $3(x + 2) + 4x$.", corrige: "$3x + 6 + 4x = 7x + 6$." }
        ]
      },
      {
        titre: "Formules et preuves",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Trois questions indépendantes.",
        questions: [
          { n: "1.", points: 1.5, texte: "Un rectangle a pour longueur $x + 5$ et pour largeur $x$ (en cm). Exprime son périmètre en fonction de $x$, sous forme réduite.", corrige: "$2 \\times (x + 5) + 2 \\times x = 2x + 10 + 2x = 4x + 10$." },
          { n: "2.", points: 1.5, texte: "Calcule ce périmètre pour $x = 3$.", corrige: "$4 \\times 3 + 10 = 22$ cm (le rectangle mesure $8$ cm sur $3$ cm)." },
          { n: "3.", points: 1.5, texte: "$n$ est un nombre entier. Montre que la somme des deux nombres impairs consécutifs $2n + 1$ et $2n + 3$ est un multiple de $4$.", indice: "Réduis la somme, puis factorise par $4$.", corrige: "$(2n + 1) + (2n + 3) = 4n + 4 = 4(n + 1)$ : c'est un multiple de $4$. Par exemple, $7 + 9 = 16 = 4 \\times 4$." },
          { n: "4.", points: 1.5, texte: "Vrai ou faux : « pour tout nombre $x$, $x^2$ est plus grand que $x$ » ?", corrige: "Faux : un contre-exemple suffit. Pour $x = 0{,}5$, $x^2 = 0{,}25$, qui est plus petit que $0{,}5$." }
        ]
      }
    ]
  }
};
