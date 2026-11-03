/*
  ENTRAÎNEMENT : Première tronc commun — chapitre 6, Deux caractères quantitatifs : nuage de points et ajustement affine
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre tronc-ajustement-affine.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Données fictives, différentes de celles de Première techno (même cours, autres exercices).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  const X1 = [0, 1, 2, 4, 5, 6], Y1 = [30, 29.2, 29, 27.6, 27.1, 26.3]; // altitude (centaines de m) et température (°C)
  const X3 = [1, 2, 3, 4, 5, 6], Y3 = [1, 2, 4, 8, 16, 32]; // mois et utilisateurs (milliers)

  window.EVALUATIONS["tronc-ajustement-affine"] = {
    revisions: {
      intro: "Les séries à deux variables en un coup d'œil : nuage de points, point moyen, méthode de Mayer, moindres carrés, interpolation et extrapolation, esprit critique. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Nuage de points",
          texte: "On place les points $(x_i\\,;y_i)$ sans les relier. Un ajustement affine n'a de sens que si les points sont à peu près alignés."
        },
        {
          titre: "Point moyen",
          texte: "$G(\\bar{x}\\,;\\bar{y})$ : $\\bar{x}$ est la moyenne des $x_i$, $\\bar{y}$ celle des $y_i$. Les droites d'ajustement usuelles passent par $G$."
        },
        {
          titre: "Méthode de Mayer",
          texte: "On partage le nuage, rangé selon $x$, en deux groupes de même effectif. La droite qui passe par leurs points moyens $G_1$ et $G_2$ est la droite de Mayer."
        },
        {
          titre: "Moindres carrés",
          texte: "On mesure la qualité d'une droite par la somme des carrés des écarts verticaux $\\big(y_i - (ax_i + b)\\big)^2$ : plus elle est petite, mieux la droite ajuste le nuage."
        },
        {
          titre: "Interpoler, extrapoler",
          texte: "Une estimation dans la plage des données est une interpolation ; en dehors, c'est une extrapolation, d'autant moins fiable qu'on s'éloigne des données."
        },
        {
          titre: "Esprit critique",
          texte: "Corrélation n'est pas causalité : deux grandeurs peuvent varier ensemble sous l'effet d'une troisième. Et un nuage courbé appelle un autre modèle qu'une droite."
        }
      ],
      pieges: [
        "Relier les points du nuage comme une courbe.",
        "Oublier de diviser par l'effectif en calculant $\\bar{x}$ ou $\\bar{y}$.",
        "Échanger les coordonnées du point moyen $G$.",
        "Utiliser un ajustement affine pour un nuage courbé ou très dispersé.",
        "Faire confiance à une extrapolation lointaine sans regard critique.",
        "Conclure qu'une grandeur cause l'autre parce que le nuage est aligné."
      ]
    },

    evaluation: {
      intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Les données sont fictives. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Température et altitude",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Un jour de beau temps, des élèves relèvent la température en montant une colline de Mayotte. On note $x$ l'altitude, en centaines de mètres, et $y$ la température, en °C.",
          tableau: { lignes: [["x", "0", "1", "2", "4", "5", "6"], ["y", "30", "29{,}2", "29", "27{,}6", "27{,}1", "26{,}3"]] },
          figure: (o) => o.graph({
            xmin: -0.5, xmax: 7.4, ymin: 25, ymax: 31, xstep: 1, ystep: 0.2, yetiq: 1, h: 260, padL: 26,
            xlabel: "x", ylabel: "y",
            points: X1.map((x, k) => ({ x, y: Y1[k] })),
            aria: "Nuage de six points qui descendent à peu près en ligne droite, de (0 ; 30) à (6 ; 26,3)"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Un ajustement affine de ce nuage te semble-t-il pertinent ? Justifie.",
              indice: "Regarde si les points sont à peu près alignés.",
              corrige: "Oui : les points sont à peu près alignés, et la température baisse quand l'altitude augmente."
            },
            {
              n: "2.", points: 1.5,
              texte: "Calcule les coordonnées du point moyen $G$.",
              indice: "La somme des températures vaut $169{,}2$.",
              corrige: "$\\bar{x} = \\dfrac{0 + 1 + 2 + 4 + 5 + 6}{6} = \\dfrac{18}{6} = 3$ et $\\bar{y} = \\dfrac{169{,}2}{6} = 28{,}2$ : $G(3\\,;28{,}2)$."
            },
            {
              n: "3.", points: 1.5,
              texte: "Méthode de Mayer : calcule les points moyens $G_1$ des trois premiers points et $G_2$ des trois derniers, puis l'équation réduite de la droite $(G_1G_2)$. Vérifie qu'elle passe par $G$.",
              indice: "$30 + 29{,}2 + 29 = 88{,}2$ et $27{,}6 + 27{,}1 + 26{,}3 = 81$.",
              corrige: "$G_1\\left(1\\,;\\dfrac{88{,}2}{3}\\right) = (1\\,;29{,}4)$ et $G_2\\left(5\\,;\\dfrac{81}{3}\\right) = (5\\,;27)$. Coefficient directeur : $\\dfrac{27 - 29{,}4}{5 - 1} = \\dfrac{-2{,}4}{4} = -0{,}6$.\n\nPuis $29{,}4 = -0{,}6 \\times 1 + b$ donne $b = 30$ : $y = -0{,}6x + 30$. Et $-0{,}6 \\times 3 + 30 = 28{,}2$ : la droite passe bien par $G$."
            },
            {
              n: "4.", points: 1.5,
              texte: "Interprète le coefficient directeur. Estime la température au sommet du mont Bénara, à $660$ m d'altitude.",
              indice: "$660$ m correspondent à $x = 6{,}6$.",
              corrige: "La température baisse d'environ $0{,}6$ °C quand on monte de $100$ m. Pour $x = 6{,}6$ : $-0{,}6 \\times 6{,}6 + 30 = -3{,}96 + 30 \\approx 26$ °C, une légère extrapolation, juste au-dessus des données."
            },
            {
              n: "5.", points: 1,
              texte: "À quelle altitude le modèle prévoit-il une température de $0$ °C ? Que penses-tu de cette prévision ?",
              indice: "Résous $-0{,}6x + 30 = 0$.",
              corrige: "$-0{,}6x + 30 = 0 \\iff x = 50$, soit $5\\,000$ m. C'est une extrapolation très lointaine : les mesures vont seulement jusqu'à $600$ m. On ne peut pas lui faire confiance avec ces seules données."
            }
          ]
        },
        {
          titre: "L'allongement d'un ressort",
          duree: 25, points: 7, calculatrice: false,
          contexte: "En sciences, on accroche des masses $x$, en kg, à un ressort et on mesure son allongement $y$, en cm. On compare deux droites d'ajustement : $D_1$ d'équation $y = 1{,}5x + 0{,}2$, et $D_2$ d'équation $y = 1{,}4x + 0{,}5$.",
          tableau: { lignes: [["x", "1", "2", "3", "4"], ["y", "2", "3", "5", "6"]] },
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule les coordonnées du point moyen $G$. Laquelle des deux droites passe par $G$ ?",
              indice: "Remplace $x$ par $\\bar{x}$ dans chaque équation.",
              corrige: "$\\bar{x} = \\dfrac{10}{4} = 2{,}5$ et $\\bar{y} = \\dfrac{16}{4} = 4$ : $G(2{,}5\\,;4)$.\n\n$1{,}5 \\times 2{,}5 + 0{,}2 = 3{,}95$ : $D_1$ ne passe pas par $G$. $1{,}4 \\times 2{,}5 + 0{,}5 = 4$ : $D_2$ passe par $G$."
            },
            {
              n: "2.", points: 2,
              texte: "Pour $D_1$, calcule les quatre écarts $y_i - (1{,}5x_i + 0{,}2)$, puis la somme de leurs carrés.",
              indice: "Valeurs de $D_1$ : $1{,}7$ ; $3{,}2$ ; $4{,}7$ et $6{,}2$.",
              corrige: "Les écarts sont $0{,}3$ ; $-0{,}2$ ; $0{,}3$ et $-0{,}2$. La somme des carrés vaut $0{,}09 + 0{,}04 + 0{,}09 + 0{,}04 = 0{,}26$."
            },
            {
              n: "3.", points: 2,
              texte: "Même question avec $D_2$. Quelle droite ajuste le mieux le nuage ?",
              indice: "Valeurs de $D_2$ : $1{,}9$ ; $3{,}3$ ; $4{,}7$ et $6{,}1$.",
              corrige: "Les écarts sont $0{,}1$ ; $-0{,}3$ ; $0{,}3$ et $-0{,}1$, et la somme des carrés vaut $0{,}01 + 0{,}09 + 0{,}09 + 0{,}01 = 0{,}2$.\n\n$0{,}2 < 0{,}26$ : $D_2$ ajuste mieux le nuage. C'est la droite des moindres carrés de ces données."
            },
            {
              n: "4.", points: 1.5,
              texte: "Avec $D_2$, estime l'allongement pour une masse de $2{,}5$ kg, puis pour $10$ kg. Laquelle de ces deux estimations est la plus fiable ?",
              indice: "La plage des masses mesurées va de $1$ à $4$ kg.",
              corrige: "Pour $2{,}5$ kg : $4$ cm (interpolation). Pour $10$ kg : $1{,}4 \\times 10 + 0{,}5 = 14{,}5$ cm, une extrapolation loin des mesures. La première est bien plus fiable : avec une grosse masse, le ressort pourrait même se déformer ou casser."
            }
          ]
        },
        {
          titre: "Une droite ne convient pas toujours",
          duree: 25, points: 6, calculatrice: false,
          contexte: "Le nombre d'utilisateurs d'une nouvelle application, en milliers, a été relevé pendant ses six premiers mois. On admet que la droite des moindres carrés de ce nuage a pour équation $y = 5{,}74x - 9{,}6$, où $x$ est le numéro du mois.",
          tableau: { lignes: [["x", "1", "2", "3", "4", "5", "6"], ["y", "1", "2", "4", "8", "16", "32"]] },
          figure: (o) => o.graph({
            xmin: -0.3, xmax: 7.4, ymin: -12, ymax: 34, xstep: 1, ystep: 2, yetiq: 10, h: 280, padL: 30,
            xlabel: "x", ylabel: "y",
            curves: [{ f: (x) => 5.74 * x - 9.6, a: 0.6, b: 7, closed: false, label: "droite", lx: 1.5, dx: 44, dy: 18 }],
            points: X3.map((x, k) => ({ x, y: Y3[k] })),
            aria: "Nuage de six points qui montent de plus en plus vite (1, 2, 4, 8, 16, 32) et droite d'ajustement : les points des extrémités sont au-dessus de la droite, ceux du milieu en dessous"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Regarde le nuage et la droite. Les points sont-ils répartis au hasard de part et d'autre de la droite ?",
              indice: "Compare la position des premiers, des points du milieu et des derniers par rapport à la droite.",
              corrige: "Non : les points des deux extrémités sont au-dessus de la droite, ceux du milieu en dessous. Le nuage est courbé : une droite le résume mal."
            },
            {
              n: "2.", points: 1.5,
              texte: "Calcule l'écart entre les nombres d'utilisateurs de deux mois consécutifs. Que remarques-tu ? Quel modèle proposerais-tu ?",
              indice: "$2 - 1$, $4 - 2$, $8 - 4$…",
              corrige: "Les écarts valent $1$, $2$, $4$, $8$ et $16$ : ils doublent. Le nombre d'utilisateurs double chaque mois : c'est une croissance exponentielle, à modéliser par une suite géométrique de raison $2$, pas par une droite."
            },
            {
              n: "3.", points: 1.5,
              texte: "Que prévoient la droite et le modèle « doublement » pour le mois $8$ ?",
              indice: "Avec la droite, calcule $5{,}74 \\times 8 - 9{,}6$. En doublant : mois $7$, puis mois $8$.",
              corrige: "La droite prévoit $5{,}74 \\times 8 - 9{,}6 = 45{,}92 - 9{,}6 \\approx 36$ milliers d'utilisateurs. En doublant : $64$ milliers au mois $7$, puis $128$ milliers au mois $8$. Les deux modèles donnent des prévisions très différentes."
            },
            {
              n: "4.", points: 1.5,
              texte: "Dans plusieurs pays (données fictives), le nombre de smartphones par habitant et l'espérance de vie augmentent ensemble. Peut-on en conclure que les smartphones font vivre plus longtemps ?",
              indice: "Une troisième grandeur pourrait-elle faire augmenter les deux ?",
              corrige: "Non. Les deux grandeurs sont corrélées, mais rien ne prouve que l'une cause l'autre : la richesse d'un pays, par exemple, augmente à la fois l'équipement en smartphones et l'accès aux soins."
            }
          ]
        }
      ]
    }
  };
})();
