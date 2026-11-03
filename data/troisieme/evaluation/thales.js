/*
  ENTRAÎNEMENT : 3e — chapitre 11, Théorème de Thalès
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre troisieme-thales.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type brevet.
  Figures dessinées par o.figGeo (assets/exercices-base.js), en pixels.
  Longueurs différentes de celles du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["troisieme-thales"] = {
  revisions: {
    intro: "Le théorème de Thalès en un coup d'œil : les deux configurations, le calcul d'une longueur, la réciproque, la contraposée et les réductions. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Le théorème",
        texte: "Si les points $A$, $M$, $B$ sont alignés, ainsi que $A$, $N$, $C$, et si $(MN) \\parallel (BC)$, alors :\n\n$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$"
      },
      {
        titre: "Deux configurations",
        texte: "Triangles emboîtés ($M$ sur $[AB]$, $N$ sur $[AC]$) ou « papillon » ($M$ et $N$ de l'autre côté de $A$) : les rapports s'écrivent de la même façon, en partant toujours du point commun $A$."
      },
      {
        titre: "Calculer une longueur",
        texte: "On garde deux rapports, dont un seul contient l'inconnue, puis on fait un produit en croix. Avec $AM = 2$, $AB = 6$ et $BC = 9$ :\n\n$\\dfrac{2}{6} = \\dfrac{MN}{9}$\n\ndonc $MN = \\dfrac{2 \\times 9}{6} = 3$."
      },
      {
        titre: "La réciproque",
        texte: "Si $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$ et si les points $A$, $M$, $B$ et $A$, $N$, $C$ sont dans le même ordre, alors $(MN) \\parallel (BC)$."
      },
      {
        titre: "La contraposée",
        texte: "Si $\\dfrac{AM}{AB} \\neq \\dfrac{AN}{AC}$, alors les droites $(MN)$ et $(BC)$ ne sont **pas** parallèles."
      },
      {
        titre: "Agrandissement et réduction",
        texte: "Le triangle $AMN$ est une réduction ou un agrandissement de $ABC$, de rapport $k = \\dfrac{AM}{AB}$ : les longueurs sont multipliées par $k$, les aires par $k^2$, les volumes par $k^3$. Les angles ne changent pas."
      }
    ],
    pieges: [
      "Utiliser le théorème de Thalès sans avoir justifié que les droites sont parallèles.",
      "Écrire $\\dfrac{AM}{MB}$ : chaque longueur se mesure depuis le point commun $A$.",
      "Mélanger les triangles : en haut, toujours les côtés du même triangle.",
      "Comparer des valeurs arrondies dans la réciproque : compare des fractions, ou fais les produits en croix.",
      "Multiplier une aire par $k$ : elle est multipliée par $k^2$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme au brevet (environ $60$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le triangle et la parallèle",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Sur la figure ci-dessous, qui n'est pas en vraie grandeur, $M$ est sur le segment $[AB]$ et $N$ sur le segment $[AC]$. On donne : $AM = 8$ cm, $MB = 4$ cm, $AN = 6$ cm, $NC = 3$ cm et $BC = 15$ cm.",
        figure: (o) => o.figGeo({
          W: 320, H: 204,
          pts: { A: [120, 180], B: [120, 30], C: [232.5, 180], M: [120, 80], N: [195, 180] },
          segs: [["A", "B"], ["A", "C"], ["B", "C"], ["M", "N"]],
          cotes: [["M", "B", "4 cm", "C"], ["A", "M", "8 cm", "C"], ["A", "N", "6 cm", "B"], ["N", "C", "3 cm", "B"], ["B", "C", "15 cm", "A"]],
          decal: { A: [-6, 14], B: [-6, 4], C: [6, 12], M: [-6, 5], N: [4, -6] },
          aria: "Triangle ABC, M sur [AB] et N sur [AC], segment [MN] : AM = 8 cm, MB = 4 cm, AN = 6 cm, NC = 3 cm, BC = 15 cm"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Calcule $AB$ et $AC$, puis démontre que le triangle $ABC$ est rectangle en $A$.", indice: "Compare $BC^2$ et $AB^2 + AC^2$.", corrige: "$AB = 8 + 4 = 12$ cm et $AC = 6 + 3 = 9$ cm.\n\n$BC^2 = 15^2 = 225$ et $AB^2 + AC^2 = 144 + 81 = 225$.\n\nComme $BC^2 = AB^2 + AC^2$, le triangle $ABC$ est rectangle en $A$, d'après la réciproque du théorème de Pythagore." },
          { n: "2.", points: 2, texte: "Démontre que les droites $(MN)$ et $(BC)$ sont parallèles.", indice: "Compare $\\dfrac{AM}{AB}$ et $\\dfrac{AN}{AC}$.", corrige: "$\\dfrac{AM}{AB} = \\dfrac{8}{12} = \\dfrac{2}{3}$\n\n$\\dfrac{AN}{AC} = \\dfrac{6}{9} = \\dfrac{2}{3}$\n\nLes deux rapports sont égaux, et les points $A$, $M$, $B$ et $A$, $N$, $C$ sont dans le même ordre : d'après la réciproque du théorème de Thalès, $(MN) \\parallel (BC)$." },
          { n: "3.", points: 1.5, texte: "Calcule la longueur $MN$.", corrige: "Comme $(MN) \\parallel (BC)$, le théorème de Thalès donne :\n\n$\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$\n\n$\\dfrac{2}{3} = \\dfrac{MN}{15}$\n\ndonc $MN = \\dfrac{2 \\times 15}{3} = 10$ cm." },
          { n: "4.", points: 2, texte: "Calcule l'aire du triangle $AMN$, puis celle du triangle $ABC$. Par quel nombre l'aire a-t-elle été multipliée ?", indice: "Les deux triangles sont rectangles en $A$.", corrige: "Aire de $AMN$ : $\\dfrac{8 \\times 6}{2} = 24$ cm².\n\nAire de $ABC$ : $\\dfrac{12 \\times 9}{2} = 54$ cm².\n\n$\\dfrac{24}{54} = \\dfrac{4}{9}$ : l'aire a été multipliée par $\\dfrac{4}{9}$, le carré du rapport de réduction $\\dfrac{2}{3}$." }
        ]
      },
      {
        titre: "La table pliante",
        duree: 20, points: 7, calculatrice: true,
        contexte: "Vue de côté, les pieds d'une table pliante sont deux segments $[MB]$ et $[NC]$ qui se croisent en $A$. Le plateau $(MN)$ et le sol $(BC)$ sont horizontaux, donc parallèles. On donne : $AM = AN = 40$ cm, $AB = AC = 60$ cm et $MN = 50$ cm. $H$ est le milieu de $[MN]$ et $K$ celui de $[BC]$ : la droite $(HK)$ passe par $A$ et elle est perpendiculaire au plateau et au sol. La figure n'est pas à l'échelle.",
        figure: (o) => o.figGeo({
          W: 320, H: 204,
          pts: { M: [110, 24], N: [210, 24], A: [160, 86.4], B: [235, 180], C: [85, 180], H: [160, 24], K: [160, 180] },
          droites: [["M", "N", 0.3], ["C", "B", 0.35]],
          segs: [["M", "B"], ["N", "C"], ["M", "N"]],
          caches: [["H", "K"]],
          cotes: [["M", "N", "50 cm", "A"], ["A", "M", "40 cm", "N"], ["A", "B", "60 cm", "C"], ["C", "B", "?", "A"]],
          decal: { M: [-6, -5], N: [6, -5], A: [9, 4], B: [6, 14], C: [-6, 14], H: [5, 14], K: [5, -5] },
          aria: "Table pliante vue de côté : les pieds [MB] et [NC] se croisent en A ; plateau (MN) en haut, sol (BC) en bas ; AM = 40 cm, AB = 60 cm, MN = 50 cm, BC inconnue ; H et K milieux de [MN] et [BC], (HK) en pointillés"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Calcule l'écartement $BC$ des pieds sur le sol.", indice: "C'est une configuration « papillon ».", corrige: "Les droites $(MB)$ et $(NC)$ se coupent en $A$ et $(MN) \\parallel (BC)$. D'après le théorème de Thalès :\n\n$\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$\n\n$\\dfrac{40}{60} = \\dfrac{50}{BC}$\n\ndonc $BC = \\dfrac{50 \\times 60}{40} = 75$ cm." },
          { n: "2.", points: 3, texte: "Calcule $AH$ et $AK$, arrondies au millimètre, puis la hauteur $HK$ de la table, au centimètre près.", indice: "Utilise le théorème de Pythagore dans les triangles $AMH$ et $ABK$, rectangles en $H$ et en $K$.", corrige: "$MH = 50 \\div 2 = 25$ cm. Dans le triangle $AMH$ rectangle en $H$ :\n\n$AH^2 = 40^2 - 25^2 = 975$, donc $AH = \\sqrt{975} \\approx 31{,}2$ cm.\n\n$BK = 75 \\div 2 = 37{,}5$ cm. Dans le triangle $ABK$ rectangle en $K$ :\n\n$AK^2 = 60^2 - 37{,}5^2 = 2\\,193{,}75$, donc $AK \\approx 46{,}8$ cm.\n\nHauteur de la table : $HK = AH + AK \\approx 78$ cm." },
          { n: "3.", points: 2, texte: "Sur un autre modèle, on mesure $AM = 42$ cm, $AB = 63$ cm, $AN = 40$ cm et $AC = 58$ cm. Le plateau est-il parallèle au sol ?", indice: "Compare $\\dfrac{AM}{AB}$ et $\\dfrac{AN}{AC}$.", corrige: "$\\dfrac{AM}{AB} = \\dfrac{42}{63} = \\dfrac{2}{3}$\n\n$\\dfrac{AN}{AC} = \\dfrac{40}{58} = \\dfrac{20}{29}$\n\nProduits en croix : $2 \\times 29 = 58$ et $3 \\times 20 = 60$, donc les deux rapports sont différents. D'après la contraposée du théorème de Thalès, $(MN)$ et $(BC)$ ne sont pas parallèles : le plateau n'est pas parallèle au sol." }
        ]
      },
      {
        titre: "La voile du voilier",
        duree: 20, points: 6, calculatrice: true,
        contexte: "La voile d'un petit voilier a la forme d'un triangle $SBC$ rectangle en $B$. Le mât $[SB]$ mesure $5$ m et la bôme $[BC]$ mesure $3$ m. Une latte $[MN]$, parallèle à la bôme, rigidifie la voile : $M$ est sur $[SB]$ avec $SM = 2$ m, et $N$ est sur $[SC]$.",
        figure: (o) => o.figGeo({
          W: 320, H: 206,
          pts: { S: [160, 26], M: [160, 90], B: [160, 186], C: [256, 186], N: [198.4, 90] },
          polys: [["S", "B", "C"]],
          teintes: [["S", "M", "N"]],
          segs: [["S", "B"], ["B", "C"], ["S", "C"], ["M", "N"]],
          droitAngle: [["S", "B", "C"]],
          cotes: [["S", "M", "2 m", "C"], ["M", "B", "3 m", "C"], ["B", "C", "3 m", "S"]],
          decal: { S: [0, -8], M: [-6, 5], B: [-6, 14], C: [6, 5], N: [7, 2] },
          aria: "Voile triangulaire SBC rectangle en B : mât [SB], bôme [BC] de 3 m, latte [MN] parallèle à la bôme avec SM = 2 m et MB = 3 m ; le petit triangle SMN est teinté"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Calcule la longueur $MN$ de la latte.", corrige: "$M \\in [SB]$, $N \\in [SC]$ et $(MN) \\parallel (BC)$. D'après le théorème de Thalès :\n\n$\\dfrac{SM}{SB} = \\dfrac{MN}{BC}$\n\n$\\dfrac{2}{5} = \\dfrac{MN}{3}$\n\ndonc $MN = \\dfrac{2 \\times 3}{5} = 1{,}2$ m." },
          { n: "2.", points: 1.5, texte: "Calcule la longueur $SC$, arrondie au centimètre.", corrige: "Dans le triangle $SBC$ rectangle en $B$, d'après le théorème de Pythagore : $SC^2 = 5^2 + 3^2 = 34$, donc $SC = \\sqrt{34} \\approx 5{,}83$ m." },
          { n: "3.", points: 1.5, texte: "Le triangle $SMN$ est une réduction du triangle $SBC$. Quel est le rapport de réduction ? Calcule l'aire de la voile, puis celle du triangle $SMN$.", indice: "Les aires sont multipliées par le carré du rapport.", corrige: "Rapport : $k = \\dfrac{SM}{SB} = \\dfrac{2}{5} = 0{,}4$.\n\nAire de la voile : $\\dfrac{5 \\times 3}{2} = 7{,}5$ m².\n\nAire de $SMN$ : $7{,}5 \\times 0{,}4^2 = 7{,}5 \\times 0{,}16 = 1{,}2$ m²." },
          { n: "4.", points: 1.5, texte: "Quelle est l'aire de la partie de la voile située sous la latte ? Quel pourcentage de la voile représente-t-elle ?", corrige: "$7{,}5 - 1{,}2 = 6{,}3$ m², soit $\\dfrac{6{,}3}{7{,}5} = 0{,}84 = 84\\,\\%$ de la voile." }
        ]
      }
    ]
  }
};
