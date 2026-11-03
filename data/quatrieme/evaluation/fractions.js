/*
  ENTRAÎNEMENT : 4e — chapitre 4, Calculer avec des fractions
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre quatrieme-fractions.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle de 4e, sans calculatrice.
  Fractions différentes de celles du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["quatrieme-fractions"] = {
  revisions: {
    intro: "Les fractions en un coup d'œil : additionner, multiplier, inverser, diviser, et prendre une fraction d'une quantité. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Additionner, soustraire",
        texte: "On met les fractions au même dénominateur, puis on additionne les numérateurs :\n\n$\\dfrac{3}{8} + \\dfrac{5}{12} = \\dfrac{9}{24} + \\dfrac{10}{24} = \\dfrac{19}{24}$"
      },
      {
        titre: "Multiplier",
        texte: "On multiplie les numérateurs entre eux et les dénominateurs entre eux, en simplifiant d'abord si possible :\n\n$\\dfrac{4}{15} \\times \\dfrac{5}{8} = \\dfrac{4 \\times 5}{15 \\times 8} = \\dfrac{1}{6}$"
      },
      {
        titre: "Inverse",
        texte: "L'inverse de $\\dfrac{a}{b}$ est $\\dfrac{b}{a}$ : leur produit vaut $1$. L'inverse de $5$ est $\\dfrac{1}{5}$ ; $0$ n'a pas d'inverse."
      },
      {
        titre: "Diviser",
        texte: "Diviser par une fraction, c'est multiplier par son inverse :\n\n$\\dfrac{3}{4} \\div \\dfrac{9}{2} = \\dfrac{3}{4} \\times \\dfrac{2}{9} = \\dfrac{1}{6}$"
      },
      {
        titre: "Les signes",
        texte: "$\\dfrac{-a}{b} = \\dfrac{a}{-b} = -\\dfrac{a}{b}$ et $\\dfrac{-a}{-b} = \\dfrac{a}{b}$ : on applique la règle des signes."
      },
      {
        titre: "Fraction d'une quantité",
        texte: "Prendre les $\\dfrac{3}{5}$ de $45$, c'est calculer $\\dfrac{3}{5} \\times 45 = 27$."
      }
    ],
    pieges: [
      "Additionner les dénominateurs : $\\dfrac{1}{2} + \\dfrac{1}{3}$ ne vaut pas $\\dfrac{2}{5}$.",
      "Mettre au même dénominateur pour multiplier : c'est inutile.",
      "Inverser la première fraction au lieu de la seconde dans une division.",
      "Oublier les priorités : la multiplication passe avant l'addition.",
      "Ne pas simplifier le résultat final."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $50$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question. Les résultats sont à donner sous forme de fraction irréductible.",
    exercices: [
      {
        titre: "Des calculs",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Calcule en détaillant, et donne chaque résultat sous forme de fraction irréductible.",
        questions: [
          { n: "1.", points: 1.5, texte: "$A = \\dfrac{5}{6} - \\dfrac{7}{9}$", corrige: "$A = \\dfrac{15}{18} - \\dfrac{14}{18} = \\dfrac{1}{18}$" },
          { n: "2.", points: 1.5, texte: "$B = -\\dfrac{4}{7} \\times \\dfrac{21}{10}$", corrige: "$B = -\\dfrac{4 \\times 21}{7 \\times 10} = -\\dfrac{2 \\times 2 \\times 3 \\times 7}{7 \\times 2 \\times 5} = -\\dfrac{6}{5}$" },
          { n: "3.", points: 2, texte: "$C = \\dfrac{3}{5} \\div \\left(-\\dfrac{9}{10}\\right)$", indice: "Multiplie par l'inverse de $-\\dfrac{9}{10}$.", corrige: "$C = \\dfrac{3}{5} \\times \\left(-\\dfrac{10}{9}\\right) = -\\dfrac{30}{45} = -\\dfrac{2}{3}$" },
          { n: "4.", points: 2, texte: "$D = 2 - \\dfrac{3}{4} \\times \\dfrac{2}{9}$", indice: "La multiplication passe avant la soustraction.", corrige: "$D = 2 - \\dfrac{6}{36} = 2 - \\dfrac{1}{6}$\n\n${} = \\dfrac{12}{6} - \\dfrac{1}{6} = \\dfrac{11}{6}$" }
        ]
      },
      {
        titre: "Le budget de Soumaya",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Soumaya a $180$ €. Elle dépense les $\\dfrac{2}{9}$ de cette somme pour un livre, puis les $\\dfrac{3}{7}$ de ce qui lui reste pour des vêtements.",
        questions: [
          { n: "1.", points: 1.5, texte: "Combien coûte le livre ?", corrige: "$\\dfrac{2}{9} \\times 180 = \\dfrac{360}{9} = 40$ €." },
          { n: "2.", points: 1.5, texte: "Combien dépense-t-elle pour les vêtements ?", corrige: "Après le livre, il lui reste $180 - 40 = 140$ €. Vêtements : $\\dfrac{3}{7} \\times 140 = 60$ €." },
          { n: "3.", points: 2, texte: "Quelle fraction de la somme de départ a-t-elle dépensée pour les vêtements ?", indice: "Après le livre, il lui reste les $\\dfrac{7}{9}$ de la somme.", corrige: "Elle dépense les $\\dfrac{3}{7}$ des $\\dfrac{7}{9}$ de la somme :\n\n$\\dfrac{3}{7} \\times \\dfrac{7}{9} = \\dfrac{3}{9} = \\dfrac{1}{3}$\n\nVérification : $\\dfrac{60}{180} = \\dfrac{1}{3}$." },
          { n: "4.", points: 2, texte: "Quelle fraction de la somme de départ lui reste-t-il ? Combien d'euros cela fait-il ?", corrige: "$1 - \\dfrac{2}{9} - \\dfrac{1}{3} = \\dfrac{9}{9} - \\dfrac{2}{9} - \\dfrac{3}{9} = \\dfrac{4}{9}$, soit $\\dfrac{4}{9} \\times 180 = 80$ €." }
        ]
      },
      {
        titre: "Le réservoir d'eau de pluie",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Un réservoir d'eau de pluie est rempli aux $\\dfrac{5}{8}$. Après un orage, on y ajoute $45$ litres : il est alors rempli aux $\\dfrac{7}{8}$.",
        questions: [
          { n: "1.", points: 2, texte: "Quelle fraction de la capacité du réservoir représentent les $45$ litres ajoutés ?", corrige: "$\\dfrac{7}{8} - \\dfrac{5}{8} = \\dfrac{2}{8} = \\dfrac{1}{4}$ de la capacité." },
          { n: "2.", points: 2, texte: "Quelle est la capacité du réservoir ?", corrige: "Un quart de la capacité vaut $45$ L, donc la capacité vaut $4 \\times 45 = 180$ L." },
          { n: "3.", points: 2, texte: "Avec le réservoir plein, combien d'arrosoirs de $\\dfrac{9}{2}$ litres peut-on remplir ?", indice: "On divise $180$ par $\\dfrac{9}{2}$.", corrige: "$180 \\div \\dfrac{9}{2} = 180 \\times \\dfrac{2}{9} = \\dfrac{360}{9} = 40$ arrosoirs." }
        ]
      }
    ]
  }
};
