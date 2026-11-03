/*
  ENTRAÎNEMENT : 3e — chapitre 3, Factoriser
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre troisieme-factoriser.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type brevet.
  Expressions et calculs différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["troisieme-factoriser"] = {
  revisions: {
    intro: "Factoriser en un coup d'œil : la forme factorisée, le facteur commun et la différence de deux carrés. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Somme ou produit ?",
        texte: "Factoriser, c'est transformer une **somme** en **produit**. $3(x - 2)$ et $(x + 1)(x - 5)$ sont des formes factorisées ; $3x - 6$ est une forme développée."
      },
      {
        titre: "Facteur commun",
        texte: "$ka + kb = k(a + b)$. Le facteur commun peut être une parenthèse : $(x + 1)(2x + 3) - (x + 1)(x - 5) = (x + 1)\\left[(2x + 3) - (x - 5)\\right] = (x + 1)(x + 8)$."
      },
      {
        titre: "Différence de deux carrés",
        texte: "$a^2 - b^2 = (a - b)(a + b)$. Exemples : $x^2 - 36 = (x - 6)(x + 6)$ et $(x + 1)^2 - 9 = (x + 1 - 3)(x + 1 + 3) = (x - 2)(x + 4)$."
      },
      {
        titre: "Factoriser au maximum",
        texte: "On met en facteur tout ce qui est commun : $12x^2 + 8x = 4x(3x + 2)$, et pas seulement $4(3x^2 + 2x)$."
      },
      {
        titre: "À quoi ça sert ?",
        texte: "À calculer astucieusement ($37 \\times 12 + 37 \\times 88 = 37 \\times 100$) et à résoudre des équations produits : $A \\times B = 0$ si et seulement si $A = 0$ ou $B = 0$."
      },
      {
        titre: "Vérifier",
        texte: "On développe la forme factorisée trouvée : on doit retrouver l'expression de départ."
      }
    ],
    pieges: [
      "$x^2 + 9$ ne se factorise pas : seule une **différence** de deux carrés se factorise ainsi.",
      "Oublier les crochets en soustrayant une parenthèse : $-(x - 5) = -x + 5$.",
      "Écrire $x^2 - 4x = x(x - 4x)$ : c'est $x(x - 4)$.",
      "S'arrêter avant d'avoir mis en facteur tout ce qui est commun.",
      "Confondre $(x - 3)^2$ et $x^2 - 9$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme au brevet (environ $60$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Calculer astucieusement",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Calcule sans calculatrice, en factorisant. Les questions sont indépendantes.",
        questions: [
          { n: "1.", points: 1.5, texte: "$37 \\times 12 + 37 \\times 88$", indice: "$37$ est un facteur commun.", corrige: "$37 \\times (12 + 88) = 37 \\times 100 = 3\\,700$." },
          { n: "2.", points: 1.5, texte: "$65^2 - 35^2$", indice: "C'est une différence de deux carrés.", corrige: "$(65 - 35)(65 + 35) = 30 \\times 100 = 3\\,000$." },
          { n: "3.", points: 1.5, texte: "$2{,}5 \\times 7{,}3 + 2{,}5 \\times 2{,}7$", corrige: "$2{,}5 \\times (7{,}3 + 2{,}7) = 2{,}5 \\times 10 = 25$." },
          { n: "4.", points: 1.5, texte: "Un élève affirme : « $1\\,001^2 - 999^2 = 4\\,000$. » A-t-il raison ?", corrige: "**Oui.** $1\\,001^2 - 999^2 = (1\\,001 - 999)(1\\,001 + 999) = 2 \\times 2\\,000 = 4\\,000$." }
        ]
      },
      {
        titre: "Factoriser, puis résoudre",
        duree: 25, points: 8, calculatrice: false,
        contexte: "Factorise chaque expression le plus possible. Les questions 1 à 4 sont indépendantes.",
        questions: [
          { n: "1.", points: 1.5, texte: "$6x^2 - 9x$", indice: "$3$ et $x$ sont communs aux deux termes.", corrige: "$6x^2 - 9x = 3x \\times 2x - 3x \\times 3 = 3x(2x - 3)$." },
          { n: "2.", points: 2, texte: "$(x - 3)(4x + 1) + (x - 3)(x - 2)$", indice: "Le facteur commun est la parenthèse $(x - 3)$.", corrige: "$(x - 3)\\left[(4x + 1) + (x - 2)\\right] = (x - 3)(5x - 1)$." },
          { n: "3.", points: 1.5, texte: "$9x^2 - 64$", indice: "$9x^2 = (3x)^2$ et $64 = 8^2$.", corrige: "$9x^2 - 64 = (3x)^2 - 8^2 = (3x - 8)(3x + 8)$." },
          { n: "4.", points: 1.5, texte: "$(2x - 1)^2 - 25$", indice: "$25 = 5^2$ : c'est une différence de deux carrés, avec $a = 2x - 1$.", corrige: "$(2x - 1)^2 - 5^2 = (2x - 1 - 5)(2x - 1 + 5)$, soit $(2x - 6)(2x + 4)$." },
          { n: "5.", points: 1.5, texte: "Résous l'équation $(x - 3)(5x - 1) = 0$.", indice: "Un produit est nul si et seulement si l'un de ses facteurs est nul.", corrige: "$x - 3 = 0$ ou $5x - 1 = 0$, donc $x = 3$ ou $x = \\dfrac{1}{5}$. L'équation a deux solutions : $3$ et $\\dfrac{1}{5}$." }
        ]
      },
      {
        titre: "Le cadre photo",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Un cadre carré de côté $x + 2$, en décimètres, entoure une photo carrée de côté $x - 2$, avec $x > 2$. On note $A$ l'aire du cadre seul (sans la photo), en décimètres carrés.",
        questions: [
          { n: "1.", points: 1.5, texte: "Calcule $A$ pour $x = 5$.", corrige: "Le cadre a pour côté $7$ dm et la photo $3$ dm : $A = 7^2 - 3^2 = 49 - 9 = 40$ dm²." },
          { n: "2.", points: 2, texte: "Montre, en factorisant, que $A = 8x$.", indice: "$A = (x + 2)^2 - (x - 2)^2$ : c'est une différence de deux carrés.", corrige: "$A = (x + 2)^2 - (x - 2)^2$ est de la forme $a^2 - b^2 = (a - b)(a + b)$, avec $a = x + 2$ et $b = x - 2$.\n\nOr $a - b = (x + 2) - (x - 2) = 4$ et $a + b = (x + 2) + (x - 2) = 2x$.\n\nDonc $A = 4 \\times 2x = 8x$." },
          { n: "3.", points: 1.5, texte: "Pour quelle valeur de $x$ l'aire du cadre vaut-elle $60$ dm² ?", corrige: "$8x = 60 \\iff x = 7{,}5$. Le cadre mesure alors $9{,}5$ dm de côté et la photo $5{,}5$ dm." },
          { n: "4.", points: 1, texte: "Vérifie ce résultat sans utiliser la formule $8x$.", corrige: "$9{,}5^2 - 5{,}5^2 = 90{,}25 - 30{,}25 = 60$ dm² : c'est bien $60$." }
        ]
      }
    ]
  }
};
