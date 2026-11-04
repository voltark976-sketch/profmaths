/*
  ENTRAÎNEMENT : 5e — chapitre 3, Fractions
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-fractions.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e, sans calculatrice.
  Fractions différentes de celles du cours, de la méthode, du QCM et des entraînements de 6e et de 4e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-fractions"] = {
  revisions: {
    intro: "Les fractions en un coup d'œil : fractions égales, simplification, comparaison, addition, soustraction et fraction d'une quantité. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Fractions égales",
        texte: "On ne change pas une fraction en multipliant, ou en divisant, son numérateur et son dénominateur par un même nombre non nul : $\\dfrac{2}{7} = \\dfrac{2 \\times 3}{7 \\times 3} = \\dfrac{6}{21}$."
      },
      {
        titre: "Simplifier",
        texte: "On divise le numérateur et le dénominateur par un même diviseur :\n\n$\\dfrac{18}{30} = \\dfrac{3 \\times 6}{5 \\times 6} = \\dfrac{3}{5}$"
      },
      {
        titre: "Comparer",
        texte: "Avec le même dénominateur, la plus grande fraction est celle qui a le plus grand numérateur. Sinon, on les écrit d'abord avec un même dénominateur."
      },
      {
        titre: "Additionner, soustraire",
        texte: "Avec le même dénominateur, on additionne les numérateurs. Sinon, on réduit d'abord au même dénominateur :\n\n$\\dfrac{2}{3} + \\dfrac{1}{6} = \\dfrac{4}{6} + \\dfrac{1}{6} = \\dfrac{5}{6}$"
      },
      {
        titre: "Fraction d'une quantité",
        texte: "Les $\\dfrac{3}{4}$ de $28$, c'est $28 \\div 4 \\times 3 = 21$."
      },
      {
        titre: "Entier plus fraction",
        texte: "$\\dfrac{17}{5} = \\dfrac{15}{5} + \\dfrac{2}{5} = 3 + \\dfrac{2}{5}$ : une fraction dont le numérateur dépasse le dénominateur est plus grande que $1$."
      }
    ],
    pieges: [
      "Additionner les dénominateurs : $\\dfrac{1}{4} + \\dfrac{1}{4} = \\dfrac{2}{4}$, et non $\\dfrac{2}{8}$.",
      "Ne multiplier que le numérateur pour obtenir une fraction égale.",
      "Croire que $\\dfrac{4}{9} > \\dfrac{4}{7}$ parce que $9 > 7$ : avec le même numérateur, c'est l'inverse.",
      "Oublier de simplifier le résultat.",
      "Calculer « ce qui reste » sans partir du tout, qui vaut $1$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question. Les résultats sont à donner sous forme de fraction simplifiée.",
    exercices: [
      {
        titre: "Égalités et comparaisons",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Les résultats sont à donner sous forme de fraction simplifiée.",
        questions: [
          { n: "1.", points: 2, texte: "Complète : $\\dfrac{3}{7} = \\dfrac{\\ldots}{35}$ et $\\dfrac{45}{60} = \\dfrac{3}{\\ldots}$.", corrige: "$\\dfrac{3}{7} = \\dfrac{3 \\times 5}{7 \\times 5} = \\dfrac{15}{35}$\n\n$\\dfrac{45}{60} = \\dfrac{45 \\div 15}{60 \\div 15} = \\dfrac{3}{4}$" },
          { n: "2.", points: 1.5, texte: "Simplifie $\\dfrac{42}{56}$ le plus possible.", corrige: "$\\dfrac{42}{56} = \\dfrac{3 \\times 14}{4 \\times 14} = \\dfrac{3}{4}$" },
          { n: "3.", points: 2, texte: "Range dans l'ordre croissant : $\\dfrac{5}{12}$ ; $\\dfrac{1}{3}$ ; $\\dfrac{3}{4}$ ; $\\dfrac{1}{2}$.", indice: "Écris-les toutes avec le dénominateur $12$.", corrige: "$\\dfrac{1}{3} = \\dfrac{4}{12}$, $\\dfrac{3}{4} = \\dfrac{9}{12}$ et $\\dfrac{1}{2} = \\dfrac{6}{12}$. Donc :\n\n$\\dfrac{1}{3} < \\dfrac{5}{12} < \\dfrac{1}{2} < \\dfrac{3}{4}$" },
          { n: "4.", points: 1.5, texte: "Écris $\\dfrac{29}{6}$ sous la forme d'un entier plus une fraction inférieure à $1$.", corrige: "$29 = 6 \\times 4 + 5$, donc $\\dfrac{29}{6} = 4 + \\dfrac{5}{6}$." }
        ]
      },
      {
        titre: "Additions et soustractions",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Calcule, et donne chaque résultat sous forme de fraction simplifiée.",
        questions: [
          { n: "1.", points: 1.5, texte: "$\\dfrac{4}{9} + \\dfrac{2}{9}$", corrige: "$\\dfrac{6}{9} = \\dfrac{2}{3}$" },
          { n: "2.", points: 1.5, texte: "$\\dfrac{7}{10} - \\dfrac{2}{5}$", corrige: "$\\dfrac{7}{10} - \\dfrac{4}{10} = \\dfrac{3}{10}$" },
          { n: "3.", points: 2, texte: "$\\dfrac{5}{6} + \\dfrac{3}{4}$", indice: "$12$ est un multiple de $6$ et de $4$.", corrige: "$\\dfrac{10}{12} + \\dfrac{9}{12} = \\dfrac{19}{12}$" },
          { n: "4.", points: 2, texte: "$3 - \\dfrac{7}{8}$", corrige: "$\\dfrac{24}{8} - \\dfrac{7}{8} = \\dfrac{17}{8}$" }
        ]
      },
      {
        titre: "Le champ de Saïd",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Saïd plante les $\\dfrac{3}{8}$ de son champ en manioc, le quart en bananiers, et le reste en ambrevades (pois d'Angole). Les fractions sont à donner sous forme simplifiée.",
        questions: [
          { n: "1.", points: 2, texte: "Quelle fraction du champ est plantée en manioc ou en bananiers ?", corrige: "$\\dfrac{3}{8} + \\dfrac{1}{4} = \\dfrac{3}{8} + \\dfrac{2}{8} = \\dfrac{5}{8}$" },
          { n: "2.", points: 2, texte: "Quelle fraction du champ reste pour les ambrevades ?", corrige: "$1 - \\dfrac{5}{8} = \\dfrac{8}{8} - \\dfrac{5}{8} = \\dfrac{3}{8}$" },
          { n: "3.", points: 2, texte: "Le champ a une aire de $1\\,200$ m². Quelle aire est plantée en ambrevades ?", corrige: "$\\dfrac{3}{8}$ de $1\\,200$ : $1\\,200 \\div 8 \\times 3 = 150 \\times 3 = 450$ m²." }
        ]
      }
    ]
  }
};
