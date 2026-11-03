/*
  ENTRAÎNEMENT : 4e — chapitre 9, Calcul littéral
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre quatrieme-calcul-litteral.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle de 4e, sans calculatrice.
  Figure dessinée par o.figGeo (assets/exercices-base.js). Expressions différentes de celles du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["quatrieme-calcul-litteral"] = {
  revisions: {
    intro: "Le calcul littéral en un coup d'œil : réduire, développer, supprimer des parenthèses, factoriser, calculer et prouver. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Réduire",
        texte: "On regroupe les termes de même nature : $5x^2 + 3x - 2x^2 + x = 3x^2 + 4x$."
      },
      {
        titre: "Développer",
        texte: "$k(a + b) = ka + kb$, en appliquant la règle des signes : $-3(2x - 5) = -6x + 15$."
      },
      {
        titre: "Supprimer des parenthèses",
        texte: "Précédées d'un signe $+$, on les enlève ; précédées d'un signe $-$, on change le signe de chaque terme : $-(4x - 7) = -4x + 7$."
      },
      {
        titre: "Factoriser",
        texte: "On repère un facteur commun à tous les termes : $6x + 15 = 3(2x + 5)$ et $x^2 + 7x = x(x + 7)$."
      },
      {
        titre: "Calculer une expression",
        texte: "On remplace la lettre par sa valeur, entre parenthèses si elle est négative : pour $x = -4$, $x^2 - 2x = (-4)^2 - 2 \\times (-4) = 16 + 8 = 24$."
      },
      {
        titre: "Prouver",
        texte: "Pour montrer qu'un résultat est vrai pour tous les nombres, on calcule avec une lettre : un exemple ne suffit pas. Un seul contre-exemple suffit, en revanche, pour montrer qu'une affirmation est fausse."
      }
    ],
    pieges: [
      "Réduire $2x + 3$ en $5x$ : on n'additionne que des termes de même nature.",
      "Oublier de distribuer à tous les termes : $3(x + 4) = 3x + 12$, et non $3x + 4$.",
      "Ne changer qu'un seul signe en supprimant $-(\\ldots)$.",
      "Confondre $x^2$ et $2x$ : pour $x = 5$, $x^2 = 25$ et $2x = 10$.",
      "Oublier les parenthèses autour d'une valeur négative : $(-4)^2 = 16$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $50$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Développer, réduire, factoriser",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Détaille chaque étape.",
        questions: [
          { n: "1.", points: 2, texte: "Développe et réduis $A = 5(2x - 3) - 4(x + 1)$.", corrige: "$A = 10x - 15 - 4x - 4 = 6x - 19$." },
          { n: "2.", points: 2, texte: "Développe et réduis $B = -(x^2 - 3x) + 2x(x + 1)$.", indice: "Le signe $-$ devant la première parenthèse change le signe de chacun de ses termes.", corrige: "$B = -x^2 + 3x + 2x^2 + 2x = x^2 + 5x$." },
          { n: "3.", points: 2, texte: "Factorise $C = 14x - 21$ et $D = 4x^2 + 10x$.", corrige: "$C = 7 \\times 2x - 7 \\times 3 = 7(2x - 3)$.\n\n$D = 2x \\times 2x + 2x \\times 5 = 2x(2x + 5)$." },
          { n: "4.", points: 1, texte: "Calcule $B$ pour $x = -3$.", corrige: "Avec la forme réduite : $B = (-3)^2 + 5 \\times (-3) = 9 - 15 = -6$." }
        ]
      },
      {
        titre: "Le programme de calcul",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Voici un programme de calcul :\n\n- choisir un nombre ;\n- le multiplier par $4$ ;\n- ajouter $6$ ;\n- diviser le résultat par $2$ ;\n- soustraire le nombre de départ.",
        questions: [
          { n: "1.", points: 1.5, texte: "Quel résultat obtient-on en choisissant $5$ ?", corrige: "$5 \\times 4 = 20$ ; $20 + 6 = 26$ ; $26 \\div 2 = 13$ ; $13 - 5 = 8$." },
          { n: "2.", points: 1.5, texte: "Quel résultat obtient-on en choisissant $-2$ ?", corrige: "$-2 \\times 4 = -8$ ; $-8 + 6 = -2$ ; $-2 \\div 2 = -1$ ; $-1 - (-2) = 1$." },
          { n: "3.", points: 2.5, texte: "On choisit un nombre $x$. Montre que le résultat est $x + 3$.", indice: "Écris toutes les étapes avec $x$.", corrige: "$x \\times 4 = 4x$, puis $4x + 6$, puis $\\dfrac{4x + 6}{2} = 2x + 3$, enfin $2x + 3 - x = x + 3$. Le programme ajoute toujours $3$ au nombre choisi." },
          { n: "4.", points: 1.5, texte: "Quel nombre faut-il choisir pour obtenir $0$ ?", corrige: "$x + 3 = 0$ donne $x = -3$." }
        ]
      },
      {
        titre: "Le terrain et la piscine",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Un terrain rectangulaire mesure $2x + 3$ mètres de long et $x$ mètres de large, avec $x > 4$. On y construit une piscine rectangulaire de $x$ mètres sur $4$ mètres.",
        figure: (o) => o.figGeo({
          W: 320, H: 160,
          pts: { A: [30, 130], B: [290, 130], C: [290, 30], D: [30, 30], P: [198, 130], Q: [262, 130], R: [262, 30], S: [198, 30] },
          formes: [{ p: [[198, 130], [262, 130], [262, 30], [198, 30]], image: true }],
          segs: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]],
          cotes: [["A", "B", "2x + 3", "D"], ["D", "A", "x", "B"], ["P", "Q", "4", "R"]],
          textes: [[230, 84, "piscine", "middle"]],
          sansPoint: ["A", "B", "C", "D", "P", "Q", "R", "S"],
          aria: "Terrain rectangulaire de 2x + 3 mètres sur x mètres, avec une piscine rectangulaire de 4 mètres sur x mètres"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Exprime l'aire du terrain en fonction de $x$, sous forme développée.", corrige: "$x(2x + 3) = 2x^2 + 3x$ (en m²)." },
          { n: "2.", points: 1.5, texte: "Exprime l'aire du terrain sans la piscine.", corrige: "L'aire de la piscine vaut $4x$ : il reste $2x^2 + 3x - 4x = 2x^2 - x$ (en m²)." },
          { n: "3.", points: 1.5, texte: "Calcule cette aire pour $x = 6$.", corrige: "$2 \\times 6^2 - 6 = 72 - 6 = 66$ m²." },
          { n: "4.", points: 1, texte: "Factorise $2x^2 - x$.", corrige: "$2x^2 - x = x(2x - 1)$." }
        ]
      }
    ]
  }
};
