/*
  ENTRAÎNEMENT : 3e — chapitre 9, Probabilités
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre troisieme-probabilites.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type brevet.
  Compositions d'urnes et de sacs différentes de celles du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["troisieme-probabilites"] = {
  revisions: {
    intro: "Les probabilités en un coup d'œil : issues équiprobables, événement contraire, deux épreuves et fréquences. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Probabilité",
        texte: "Une probabilité est un nombre entre $0$ (événement impossible) et $1$ (événement certain). Si les issues sont équiprobables : $P(A) = \\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre d'issues}}$."
      },
      {
        titre: "Événement contraire",
        texte: "$P\\left(\\overline{A}\\right) = 1 - P(A)$. Les probabilités de toutes les issues ont pour somme $1$."
      },
      {
        titre: "Deux épreuves : l'arbre",
        texte: "On **multiplie** les probabilités le long d'un chemin, puis on **additionne** les probabilités des chemins qui réalisent l'événement."
      },
      {
        titre: "Avec ou sans remise",
        texte: "Avec remise, le second tirage se fait dans la même urne. Sans remise, il reste une boule de moins : les probabilités du second tirage changent."
      },
      {
        titre: "Fréquence et probabilité",
        texte: "Quand on répète une expérience un grand nombre de fois, la fréquence d'un résultat se rapproche de sa probabilité : on peut s'en servir pour l'estimer."
      }
    ],
    pieges: [
      "Trouver une probabilité plus grande que $1$ : il y a une erreur.",
      "Oublier que, sans remise, le second tirage se fait avec une boule de moins.",
      "Oublier un des chemins : « rouge puis bleu » et « bleu puis rouge » sont deux chemins différents.",
      "Croire qu'une pièce « se souvient » des lancers précédents.",
      "Additionner au lieu de multiplier le long d'un chemin."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme au brevet (environ $60$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le sachet de bonbons",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Un sachet contient $20$ bonbons, indiscernables au toucher : $6$ à la mangue, $4$ au coco et $10$ à la goyave. On en prend un au hasard. Les résultats sont à donner sous forme de fraction irréductible.",
        questions: [
          { n: "1.", points: 1.5, texte: "Quelle est la probabilité de prendre un bonbon à la mangue ?", corrige: "$\\dfrac{6}{20} = \\dfrac{3}{10}$." },
          { n: "2.", points: 1.5, texte: "Quelle est la probabilité de ne pas prendre un bonbon à la goyave ?", indice: "Pense à l'événement contraire.", corrige: "$P(\\text{goyave}) = \\dfrac{10}{20} = \\dfrac{1}{2}$, donc $P(\\text{pas goyave}) = 1 - \\dfrac{1}{2} = \\dfrac{1}{2}$." },
          { n: "3.", points: 2, texte: "Naïma prend un bonbon au coco et le mange. Quelle est alors la probabilité qu'un nouveau bonbon pris au hasard soit à la mangue ?", indice: "Il ne reste plus que $19$ bonbons.", corrige: "Il reste $19$ bonbons, dont toujours $6$ à la mangue : la probabilité est $\\dfrac{6}{19}$." },
          { n: "4.", points: 2, texte: "On revient au sachet de départ. Combien de bonbons au coco faut-il ajouter pour que la probabilité d'en prendre un soit $\\dfrac{1}{3}$ ?", indice: "Avec $x$ bonbons ajoutés, il y a $4 + x$ bonbons au coco sur $20 + x$.", corrige: "On cherche $x$ tel que $\\dfrac{4 + x}{20 + x} = \\dfrac{1}{3}$, soit $3(4 + x) = 20 + x$, puis $12 + 3x = 20 + x$ et $x = 4$.\n\nIl faut ajouter $4$ bonbons au coco : il y en a alors $8$ sur $24$, et $\\dfrac{8}{24} = \\dfrac{1}{3}$." }
        ]
      },
      {
        titre: "Deux jetons sans remise",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Une boîte contient $3$ jetons noirs ($N$) et $4$ jetons blancs ($B$). On tire au hasard un premier jeton, on le garde, puis on en tire un second. Les résultats sont à donner sous forme de fraction irréductible.",
        questions: [
          { n: "1.", points: 2, texte: "Construis l'arbre de cette expérience, avec les probabilités sur chaque branche.", indice: "Au second tirage, il ne reste que $6$ jetons.", corrige: "Premier tirage : $P(N) = \\dfrac{3}{7}$ et $P(B) = \\dfrac{4}{7}$. Au second tirage, il reste $6$ jetons : après un noir, $2$ noirs et $4$ blancs ; après un blanc, $3$ noirs et $3$ blancs.", figureCorrige: (o) => o.arbreProba(["N", "B", "N", "B"], ["3/7", "4/7", "2/6", "4/6", "3/6", "3/6"], "Arbre de deux tirages sans remise : N 3/7 et B 4/7 ; après N : N 2/6 et B 4/6 ; après B : N 3/6 et B 3/6") },
          { n: "2.", points: 1.5, texte: "Quelle est la probabilité de tirer deux jetons noirs ?", corrige: "$\\dfrac{3}{7} \\times \\dfrac{2}{6} = \\dfrac{6}{42} = \\dfrac{1}{7}$." },
          { n: "3.", points: 2, texte: "Quelle est la probabilité de tirer deux jetons de la même couleur ?", indice: "Deux chemins conviennent : $NN$ et $BB$.", corrige: "$P(NN) + P(BB) = \\dfrac{6}{42} + \\dfrac{4}{7} \\times \\dfrac{3}{6}$\n\n$= \\dfrac{6}{42} + \\dfrac{12}{42} = \\dfrac{18}{42} = \\dfrac{3}{7}$" },
          { n: "4.", points: 1.5, texte: "Quelle est la probabilité de tirer au moins un jeton blanc ?", indice: "Le contraire de « au moins un blanc » est « deux noirs ».", corrige: "$1 - P(NN) = 1 - \\dfrac{1}{7} = \\dfrac{6}{7}$." }
        ]
      },
      {
        titre: "La pièce est-elle équilibrée ?",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Soilihi pense que sa pièce tombe plus souvent sur « pile » que sur « face ». Il la lance $800$ fois et obtient $480$ fois « pile » (données fictives).",
        questions: [
          { n: "1.", points: 1.5, texte: "Calcule la fréquence d'apparition de « pile ».", corrige: "$\\dfrac{480}{800} = 0{,}6$, soit $60\\,\\%$ des lancers." },
          { n: "2.", points: 1.5, texte: "Avec une pièce équilibrée, combien de « pile » obtiendrait-on à peu près sur $800$ lancers ?", corrige: "La probabilité d'obtenir « pile » serait $\\dfrac{1}{2}$, donc environ $800 \\times \\dfrac{1}{2} = 400$ fois « pile »." },
          { n: "3.", points: 1.5, texte: "Que peut-on penser de la pièce de Soilihi ? Justifie.", indice: "Sur un grand nombre de lancers, la fréquence se rapproche de la probabilité.", corrige: "Sur $800$ lancers, la fréquence devrait être proche de la probabilité. Avec une pièce équilibrée, elle serait proche de $0{,}5$ ; ici, elle vaut $0{,}6$. On ne peut pas en être sûr, mais la pièce est très probablement truquée en faveur de « pile »." },
          { n: "4.", points: 1.5, texte: "Avec cette pièce, estime la probabilité d'obtenir « face », puis celle d'obtenir deux fois « pile » en deux lancers.", indice: "On prend la fréquence observée comme estimation de la probabilité.", corrige: "On estime $P(\\text{pile}) \\approx 0{,}6$, donc $P(\\text{face}) \\approx 1 - 0{,}6 = 0{,}4$, et $P(\\text{pile, pile}) \\approx 0{,}6 \\times 0{,}6 = 0{,}36$." }
        ]
      }
    ]
  }
};
