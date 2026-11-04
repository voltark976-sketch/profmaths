/*
  ENTRAÎNEMENT : 5e — chapitre 15, Aires
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-aires.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e.
  Figures dessinées par o.figGeo (assets/exercices-base.js). Dimensions différentes de celles du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-aires"] = {
  revisions: {
    intro: "Les aires en un coup d'œil : unités, triangle, parallélogramme, disque et figures composées. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Unités d'aire",
        texte: "On passe d'une unité à la suivante en multipliant ou en divisant par $100$ : $1$ m² $= 100$ dm² $= 10\\,000$ cm²."
      },
      {
        titre: "Triangle",
        texte: "Aire $= \\dfrac{\\text{base} \\times \\text{hauteur}}{2}$, la hauteur étant perpendiculaire à la base choisie."
      },
      {
        titre: "Parallélogramme",
        texte: "Aire $=$ base $\\times$ hauteur relative à cette base (et non le produit de deux côtés)."
      },
      {
        titre: "Disque",
        texte: "Aire $= \\pi \\times r \\times r$, avec $r$ le rayon : pour $r = 4$ cm, $16\\pi \\approx 50{,}3$ cm²."
      },
      {
        titre: "Figures composées",
        texte: "On découpe la figure en morceaux simples, on calcule l'aire de chacun, puis on additionne, ou on soustrait ce qu'on retire."
      }
    ],
    pieges: [
      "Convertir les aires avec des facteurs $10$ au lieu de $100$.",
      "Oublier de diviser par $2$ pour un triangle.",
      "Prendre un côté oblique à la place de la hauteur.",
      "Utiliser le diamètre au lieu du rayon dans l'aire d'un disque.",
      "Confondre l'aire et le périmètre."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Conversions et aires",
        duree: 15, points: 7, calculatrice: true,
        contexte: "Écris les calculs.",
        questions: [
          { n: "1.", points: 2, texte: "Convertis $3{,}5$ m² en dm², $1\\,200$ cm² en dm² et $7$ dm² en cm².", corrige: "$3{,}5$ m² $= 350$ dm² ; $1\\,200$ cm² $= 12$ dm² ; $7$ dm² $= 700$ cm²." },
          { n: "2.", points: 1.5, texte: "Calcule l'aire d'un triangle de base $7$ cm et de hauteur $5$ cm.", corrige: "$\\dfrac{7 \\times 5}{2} = 17{,}5$ cm²." },
          { n: "3.", points: 1.5, texte: "Calcule l'aire d'un parallélogramme de base $6{,}5$ cm et de hauteur $4$ cm.", corrige: "$6{,}5 \\times 4 = 26$ cm²." },
          { n: "4.", points: 2, texte: "Calcule l'aire d'un disque de rayon $6$ cm : donne la valeur exacte, puis une valeur arrondie à l'unité.", corrige: "$\\pi \\times 6 \\times 6 = 36\\pi \\approx 113$ cm²." }
        ]
      },
      {
        titre: "La terrasse",
        duree: 15, points: 7, calculatrice: true,
        contexte: "Une terrasse est formée d'un rectangle de $8$ m sur $5$ m, prolongé par un demi-disque de $5$ m de diamètre.",
        figure: (o) => o.figGeo({
          W: 320, H: 150,
          pts: { A: [40, 130], B: [232, 130], C: [232, 10], D: [40, 10] },
          segs: [["A", "B"], ["D", "C"], ["D", "A"]],
          caches: [["B", "C"]],
          chemins: [["M232 130 A60 60 0 0 0 232 10", false]],
          cotes: [["A", "B", "8 m", "D"], ["D", "A", "5 m", "B"]],
          sansPoint: ["A", "B", "C", "D"],
          aria: "Terrasse : un rectangle de 8 m sur 5 m prolongé à droite par un demi-disque de 5 m de diamètre"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Calcule l'aire de la partie rectangulaire.", corrige: "$8 \\times 5 = 40$ m²." },
          { n: "2.", points: 2, texte: "Calcule l'aire du demi-disque, arrondie au centième.", indice: "Le rayon vaut $2{,}5$ m.", corrige: "$\\dfrac{\\pi \\times 2{,}5 \\times 2{,}5}{2} = 3{,}125\\pi \\approx 9{,}82$ m²." },
          { n: "3.", points: 1.5, texte: "Quelle est l'aire totale de la terrasse ?", corrige: "Environ $40 + 9{,}82 = 49{,}82$ m²." },
          { n: "4.", points: 1.5, texte: "On la recouvre de carreaux carrés de $50$ cm de côté ; un carreau coupé compte comme un carreau entier. Combien faut-il de carreaux, au minimum ?", corrige: "Un carreau couvre $0{,}5 \\times 0{,}5 = 0{,}25$ m². Or $49{,}82 \\div 0{,}25 \\approx 199{,}3$ : il faut au moins $200$ carreaux." }
        ]
      },
      {
        titre: "L'allée du champ",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Un champ rectangulaire de $25$ m sur $20$ m est traversé par une allée en forme de parallélogramme, de base $2$ m et de hauteur $20$ m (la largeur du champ).",
        figure: (o) => o.figGeo({
          W: 320, H: 180,
          pts: { A: [30, 160], B: [290, 160], C: [290, 20], D: [30, 20] },
          segs: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]],
          formes: [{ p: [[110, 160], [131, 160], [191, 20], [170, 20]], image: true }],
          cotes: [["A", "B", "25 m", "D"], ["D", "A", "20 m", "B"]],
          textes: [[150, 100, "allée", "middle"]],
          sansPoint: ["A", "B", "C", "D"],
          aria: "Champ rectangulaire de 25 m sur 20 m traversé par une allée en forme de parallélogramme"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Calcule l'aire du champ.", corrige: "$25 \\times 20 = 500$ m²." },
          { n: "2.", points: 2, texte: "Calcule l'aire de l'allée.", corrige: "Aire d'un parallélogramme : base $\\times$ hauteur $= 2 \\times 20 = 40$ m²." },
          { n: "3.", points: 2, texte: "Quelle aire reste-t-il pour cultiver ? Quel pourcentage du champ l'allée occupe-t-elle ?", corrige: "$500 - 40 = 460$ m² à cultiver. L'allée occupe $\\dfrac{40}{500} = \\dfrac{8}{100} = 8\\,\\%$ du champ." }
        ]
      }
    ]
  }
};
