/*
  ENTRAÎNEMENT : 4e — chapitre 8, Théorème de Thalès
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre quatrieme-thales.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle de 4e (triangles emboîtés).
  Figures dessinées par o.figGeo (assets/exercices-base.js). Longueurs différentes de celles du cours, de la méthode,
  du QCM et de l'entraînement de 3e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["quatrieme-thales"] = {
  revisions: {
    intro: "Le théorème de Thalès en un coup d'œil : les rapports égaux, le calcul d'une longueur, le coefficient de réduction et la réciproque. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Le théorème",
        texte: "Dans un triangle $ABC$, si $M$ est sur $[AB]$, $N$ sur $[AC]$ et $(MN) \\parallel (BC)$, alors :\n\n$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$"
      },
      {
        titre: "Calculer une longueur",
        texte: "On choisit deux rapports, dont un seul contient l'inconnue, puis on fait un produit en croix. Avec $AM = 3$, $AB = 5$ et $AC = 8$ :\n\n$\\dfrac{3}{5} = \\dfrac{AN}{8}$\n\ndonc $AN = \\dfrac{3 \\times 8}{5} = 4{,}8$."
      },
      {
        titre: "Le coefficient de réduction",
        texte: "Le triangle $AMN$ est une réduction du triangle $ABC$, de coefficient $k = \\dfrac{AM}{AB}$ : toutes ses longueurs, et donc son périmètre, sont multipliées par $k$."
      },
      {
        titre: "La réciproque",
        texte: "Si $M$ est sur $[AB]$, $N$ sur $[AC]$ et $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$, alors $(MN) \\parallel (BC)$. Si les rapports sont différents, les droites ne sont pas parallèles."
      },
      {
        titre: "Comparer deux rapports",
        texte: "Pour comparer $\\dfrac{a}{b}$ et $\\dfrac{c}{d}$ sans arrondir, on compare les produits en croix $a \\times d$ et $b \\times c$."
      }
    ],
    pieges: [
      "Utiliser le théorème sans savoir que les droites sont parallèles.",
      "Écrire $\\dfrac{AM}{MB}$ au lieu de $\\dfrac{AM}{AB}$ : les longueurs partent toutes de $A$.",
      "Mélanger les rapports : en haut, les côtés du petit triangle ; en bas, ceux du grand.",
      "Comparer des valeurs arrondies dans la réciproque.",
      "Oublier que $AB = AM + MB$ quand l'énoncé donne $MB$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $50$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Calculer des longueurs",
        duree: 20, points: 7, calculatrice: true,
        contexte: "Dans le triangle $ABC$, $M$ est sur $[AB]$ et $N$ sur $[AC]$, avec $(MN) \\parallel (BC)$. On donne $AM = 3{,}5$ cm, $AB = 5$ cm, $AC = 6$ cm et $BC = 7$ cm. La figure n'est pas en vraie grandeur.",
        figure: (o) => o.figGeo({
          W: 320, H: 196,
          pts: { A: [146.4, 44], B: [65, 170], C: [275, 170], M: [89.4, 132.2], N: [236.4, 132.2] },
          segs: [["A", "B"], ["A", "C"], ["B", "C"], ["M", "N"]],
          decal: { A: [0, -8], B: [-6, 12], C: [6, 12], M: [-7, 4], N: [7, 4] },
          aria: "Triangle ABC avec M sur [AB] et N sur [AC] ; le segment [MN] est parallèle à [BC]"
        }),
        questions: [
          { n: "1.", points: 1, texte: "Écris les rapports égaux donnés par le théorème de Thalès.", corrige: "$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$" },
          { n: "2.", points: 2, texte: "Calcule $AN$.", corrige: "$\\dfrac{3{,}5}{5} = \\dfrac{AN}{6}$\n\ndonc $AN = \\dfrac{3{,}5 \\times 6}{5} = 4{,}2$ cm." },
          { n: "3.", points: 2, texte: "Calcule $MN$.", corrige: "$\\dfrac{3{,}5}{5} = \\dfrac{MN}{7}$\n\ndonc $MN = \\dfrac{3{,}5 \\times 7}{5} = 4{,}9$ cm." },
          { n: "4.", points: 2, texte: "Calcule le périmètre du triangle $AMN$ de deux façons.", indice: "Le coefficient de réduction vaut $\\dfrac{3{,}5}{5} = 0{,}7$.", corrige: "En additionnant : $3{,}5 + 4{,}2 + 4{,}9 = 12{,}6$ cm.\n\nAvec le coefficient : le périmètre de $ABC$ vaut $5 + 6 + 7 = 18$ cm, et $0{,}7 \\times 18 = 12{,}6$ cm." }
        ]
      },
      {
        titre: "Parallèles ou pas ?",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Dans chaque cas, les points sont sur les côtés des triangles.",
        questions: [
          { n: "1.", points: 3, texte: "Dans le triangle $EFG$, $P$ est sur $[EF]$ et $R$ sur $[EG]$, avec $EP = 6$ cm, $EF = 10$ cm, $ER = 4{,}5$ cm et $EG = 7{,}5$ cm. Les droites $(PR)$ et $(FG)$ sont-elles parallèles ?", corrige: "$\\dfrac{EP}{EF} = \\dfrac{6}{10} = 0{,}6$\n\n$\\dfrac{ER}{EG} = \\dfrac{4{,}5}{7{,}5} = 0{,}6$\n\nLes rapports sont égaux : d'après la réciproque du théorème de Thalès, $(PR) \\parallel (FG)$." },
          { n: "2.", points: 3, texte: "Dans le triangle $STU$, $K$ est sur $[ST]$ et $L$ sur $[SU]$, avec $SK = 4$ cm, $ST = 7$ cm, $SL = 6$ cm et $SU = 10$ cm. Les droites $(KL)$ et $(TU)$ sont-elles parallèles ?", indice: "Compare les produits en croix.", corrige: "On compare $\\dfrac{SK}{ST} = \\dfrac{4}{7}$ et $\\dfrac{SL}{SU} = \\dfrac{6}{10}$ : produits en croix, $4 \\times 10 = 40$ et $7 \\times 6 = 42$.\n\nLes rapports sont différents : les droites $(KL)$ et $(TU)$ ne sont pas parallèles." },
          { n: "3.", points: 1, texte: "Dans le triangle $EFG$ de la question 1, $FG = 9$ cm. Calcule $PR$.", corrige: "Comme $(PR) \\parallel (FG)$ : $PR = 0{,}6 \\times 9 = 5{,}4$ cm." }
        ]
      },
      {
        titre: "Le toboggan",
        duree: 15, points: 6, calculatrice: true,
        contexte: "Vu de côté, la piste d'un toboggan est le segment $[AC]$. Le haut $C$ de la piste est à $2{,}4$ m au-dessus du point $B$ du sol, et le bas $A$ est sur le sol, à $3{,}2$ m de $B$. Un pied vertical $[MN]$ soutient la piste : $M$ est sur le sol, à $2$ m de $A$, et $N$ sur la piste.",
        figure: (o) => o.figGeo({
          W: 320, H: 180,
          pts: { A: [60, 160], B: [252, 160], C: [252, 16], M: [180, 160], N: [180, 70] },
          segs: [["A", "B"], ["B", "C"], ["A", "C"], ["M", "N"]],
          droitAngle: [["A", "B", "C"], ["A", "M", "N"]],
          cotes: [["B", "C", "2,4 m", "A"], ["A", "M", "2 m", "C"]],
          decal: { A: [-6, 12], B: [6, 12], C: [6, 0], M: [0, 16], N: [-4, -7] },
          aria: "Triangle ABC rectangle en B : la piste [AC] du toboggan, la hauteur [BC] de 2,4 m ; le pied vertical [MN], avec AM = 2 m"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Pourquoi les droites $(MN)$ et $(BC)$ sont-elles parallèles ?", corrige: "Elles sont toutes les deux perpendiculaires au sol $(AB)$ ; deux droites perpendiculaires à une même droite sont parallèles." },
          { n: "2.", points: 2, texte: "Calcule la hauteur $MN$ du pied.", corrige: "D'après le théorème de Thalès dans le triangle $ABC$ :\n\n$\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$\n\n$\\dfrac{2}{3{,}2} = \\dfrac{MN}{2{,}4}$\n\ndonc $MN = \\dfrac{2 \\times 2{,}4}{3{,}2} = 1{,}5$ m." },
          { n: "3.", points: 1.5, texte: "Calcule la longueur $AC$ de la piste.", indice: "Le triangle $ABC$ est rectangle en $B$.", corrige: "D'après le théorème de Pythagore : $AC^2 = 3{,}2^2 + 2{,}4^2 = 10{,}24 + 5{,}76 = 16$, donc $AC = 4$ m." },
          { n: "4.", points: 1, texte: "Calcule la longueur $AN$.", corrige: "$\\dfrac{AN}{AC} = \\dfrac{AM}{AB}$, donc $AN = 4 \\times \\dfrac{2}{3{,}2} = 2{,}5$ m." }
        ]
      }
    ]
  }
};
