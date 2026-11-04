/*
  ENTRAÎNEMENT : 5e — chapitre 5, Angles et parallélisme
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-angles.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e, sans calculatrice.
  Figures dessinées par o.figGeo (assets/exercices-base.js). Mesures différentes de celles du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-angles"] = {
  revisions: {
    intro: "Les angles en un coup d'œil : angles opposés, alternes-internes, correspondants, droites parallèles et somme des angles d'un triangle. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Angles opposés et supplémentaires",
        texte: "Deux angles opposés par le sommet ont la même mesure. Deux angles qui forment un angle plat sont supplémentaires : leur somme vaut $180^\\circ$."
      },
      {
        titre: "Alternes-internes et correspondants",
        texte: "Deux droites coupées par une sécante forment des angles alternes-internes (entre les deux droites, de part et d'autre de la sécante) et des angles correspondants (à la même place à chaque intersection)."
      },
      {
        titre: "Avec des droites parallèles",
        texte: "Si deux droites parallèles sont coupées par une sécante, deux angles alternes-internes ont la même mesure, et deux angles correspondants aussi."
      },
      {
        titre: "Pour prouver que deux droites sont parallèles",
        texte: "Si deux droites coupées par une sécante forment deux angles alternes-internes de même mesure (ou deux angles correspondants de même mesure), alors ces droites sont parallèles."
      },
      {
        titre: "Les angles d'un triangle",
        texte: "La somme des trois angles d'un triangle vaut $180^\\circ$. Dans un triangle isocèle, les deux angles à la base ont la même mesure ; dans un triangle équilatéral, chaque angle mesure $60^\\circ$."
      }
    ],
    pieges: [
      "Confondre angles alternes-internes et angles correspondants.",
      "Utiliser l'égalité des angles alternes-internes alors que les droites ne sont pas parallèles.",
      "Oublier que deux angles adjacents qui forment un angle plat ont une somme de $180^\\circ$.",
      "Dans un triangle isocèle, confondre l'angle au sommet et les angles à la base.",
      "Conclure que des droites sont parallèles avec deux angles « presque » égaux, lus sur un dessin."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Nommer et calculer des angles",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Sur la figure, les droites $(d)$ et $(d')$ sont parallèles ; la sécante $(s)$ coupe $(d)$ en $P$ et $(d')$ en $Q$. Les angles sont numérotés de $1$ à $8$.",
        figure: (o) => o.figGeo({
          W: 320, H: 200,
          pts: { P: [191.2, 60], Q: [130.2, 140], D1: [30, 60], D2: [290, 60], E1: [30, 140], E2: [290, 140], S1: [92, 190], S2: [237, 0] },
          segs: [["D1", "D2"], ["E1", "E2"], ["S1", "S2"]],
          textes: [
            [214, 50, "1", "middle", "g-clabel"], [176, 50, "2", "middle", "g-clabel"], [166, 78, "3", "middle", "g-clabel"], [204, 78, "4", "middle", "g-clabel"],
            [152, 130, "5", "middle", "g-clabel"], [114, 130, "6", "middle", "g-clabel"], [104, 158, "7", "middle", "g-clabel"], [142, 158, "8", "middle", "g-clabel"],
            [296, 56, "(d)", "start"], [296, 136, "(d')", "start"], [244, 14, "(s)", "start"]
          ],
          sansPoint: ["P", "Q", "D1", "D2", "E1", "E2", "S1", "S2"],
          aria: "Deux droites parallèles (d) et (d') coupées par la sécante (s) en P et Q ; autour de P, les angles 1 (en haut à droite), 2 (en haut à gauche), 3 (en bas à gauche), 4 (en bas à droite) ; autour de Q, les angles 5, 6, 7, 8 placés de la même façon"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Comment s'appellent les angles $3$ et $5$ ? Les angles $1$ et $5$ ? Les angles $1$ et $3$ ?", corrige: "$3$ et $5$ sont alternes-internes (entre les deux droites, de part et d'autre de la sécante). $1$ et $5$ sont correspondants (à la même place en $P$ et en $Q$). $1$ et $3$ sont opposés par le sommet $P$." },
          { n: "2.", points: 2, texte: "L'angle $1$ mesure $52^\\circ$. Donne la mesure des angles $3$, $5$ et $6$.", corrige: "$3$ est opposé par le sommet à $1$ : $52^\\circ$. $5$ et $1$ sont correspondants, avec des droites parallèles : $52^\\circ$. $6$ forme un angle plat avec $5$ : $180 - 52 = 128^\\circ$." },
          { n: "3.", points: 1.5, texte: "Explique pourquoi les angles $4$ et $6$ ont la même mesure.", corrige: "Ils sont alternes-internes, et les droites $(d)$ et $(d')$ sont parallèles : ils ont donc la même mesure ($128^\\circ$)." },
          { n: "4.", points: 1.5, texte: "Quelle est la somme des angles $7$ et $8$ ?", corrige: "Ils forment un angle plat : leur somme vaut $180^\\circ$." }
        ]
      },
      {
        titre: "Parallèles ou pas ?",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Justifie chaque réponse.",
        questions: [
          { n: "1.", points: 2, texte: "Deux droites coupées par une sécante forment deux angles alternes-internes de $68^\\circ$ et $68^\\circ$. Ces droites sont-elles parallèles ?", corrige: "Oui : les angles alternes-internes ont la même mesure, donc les droites sont parallèles." },
          { n: "2.", points: 2, texte: "Deux droites coupées par une sécante forment deux angles correspondants de $74^\\circ$ et $76^\\circ$. Ces droites sont-elles parallèles ?", corrige: "Non : si elles étaient parallèles, ces angles correspondants auraient la même mesure." },
          {
            n: "3.", points: 3, texte: "Dans le triangle $ABC$, $M$ est sur $[AB]$ et $N$ sur $[AC]$, avec $(MN) \\parallel (BC)$. On sait que $\\widehat{ABC} = 58^\\circ$ et $\\widehat{ACB} = 47^\\circ$. Calcule $\\widehat{AMN}$, $\\widehat{ANM}$ et $\\widehat{BAC}$.",
            indice: "Les angles $\\widehat{AMN}$ et $\\widehat{ABC}$ sont correspondants.",
            figure: (o) => o.figGeo({
              W: 320, H: 180,
              pts: { A: [150, 20], B: [50, 160], C: [270, 160], M: [100, 90], N: [210, 90] },
              segs: [["A", "B"], ["A", "C"], ["B", "C"], ["M", "N"]],
              angles: [["A", "B", "C", "58°", 24], ["B", "C", "A", "47°", 24]],
              decal: { A: [0, -8], B: [-6, 12], C: [6, 12], M: [-7, 0], N: [7, 0] },
              aria: "Triangle ABC avec M sur [AB] et N sur [AC], (MN) parallèle à (BC) ; angle de 58° en B et de 47° en C"
            }),
            corrige: "Les droites $(MN)$ et $(BC)$ sont parallèles et coupées par la sécante $(AB)$ : $\\widehat{AMN}$ et $\\widehat{ABC}$ sont correspondants, donc $\\widehat{AMN} = 58^\\circ$. De même, avec la sécante $(AC)$ : $\\widehat{ANM} = 47^\\circ$.\n\nDans le triangle $ABC$ : $\\widehat{BAC} = 180 - 58 - 47 = 75^\\circ$."
          }
        ]
      },
      {
        titre: "Les angles du triangle",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Justifie chaque réponse par un calcul.",
        questions: [
          { n: "1.", points: 1.5, texte: "Deux angles d'un triangle mesurent $38^\\circ$ et $97^\\circ$. Combien mesure le troisième ?", corrige: "$180 - 38 - 97 = 45^\\circ$." },
          { n: "2.", points: 1.5, texte: "Un triangle isocèle a un angle au sommet de $36^\\circ$. Combien mesurent ses angles à la base ?", corrige: "Les deux angles à la base sont égaux : $(180 - 36) \\div 2 = 72^\\circ$ chacun." },
          { n: "3.", points: 1.5, texte: "Quelles sont les mesures des angles d'un triangle rectangle isocèle ?", corrige: "Un angle droit de $90^\\circ$, et deux angles égaux de $(180 - 90) \\div 2 = 45^\\circ$." },
          { n: "4.", points: 1.5, texte: "Un triangle peut-il avoir des angles de $65^\\circ$, $55^\\circ$ et $70^\\circ$ ?", corrige: "Non : $65 + 55 + 70 = 190^\\circ$, et non $180^\\circ$." }
        ]
      }
    ]
  }
};
