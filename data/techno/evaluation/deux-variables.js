/*
  ENTRAÎNEMENT : Première technologique — chapitre 11, Statistiques à deux variables : ajustement affine
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre techno-deux-variables.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Toutes les données sont fictives, choisies pour des calculs à la main.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  const X1 = [1, 2, 3, 5, 6, 7], Y1 = [7, 7, 10, 11, 15, 16]; // exercice 1 : heures de révision et notes

  window.EVALUATIONS["techno-deux-variables"] = {
    revisions: {
      intro: "Les séries à deux variables en un coup d'œil : nuage de points, point moyen, méthode de Mayer, moindres carrés, interpolation et extrapolation, esprit critique. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Nuage de points",
          texte: "On place les points $(x_i\\,;y_i)$ sans les relier. S'ils sont à peu près alignés, un ajustement affine est pertinent ; s'ils dessinent une courbe ou sont très dispersés, il ne l'est pas."
        },
        {
          titre: "Point moyen",
          texte: "$G(\\bar{x}\\,;\\bar{y})$, où $\\bar{x}$ est la moyenne des $x_i$ et $\\bar{y}$ celle des $y_i$. Les droites d'ajustement usuelles passent par $G$."
        },
        {
          titre: "Méthode de Mayer",
          texte: "On range le nuage selon $x$, on le partage en deux groupes de même effectif, on calcule leurs points moyens $G_1$ et $G_2$ : la droite d'ajustement est $(G_1G_2)$."
        },
        {
          titre: "Moindres carrés",
          texte: "Pour une droite $y = ax + b$, on additionne les carrés des écarts verticaux $\\big(y_i - (ax_i + b)\\big)^2$. La droite des moindres carrés est celle qui rend cette somme la plus petite possible."
        },
        {
          titre: "Interpoler, extrapoler",
          texte: "Avec $y = ax + b$, on estime $y$ pour un $x$ donné : dans la plage des données, c'est une interpolation ; en dehors, c'est une extrapolation, à prendre avec prudence."
        },
        {
          titre: "Corrélation, causalité",
          texte: "Deux grandeurs qui varient ensemble n'ont pas forcément un lien de cause à effet : une troisième, comme la chaleur, peut les faire varier toutes les deux."
        }
      ],
      pieges: [
        "Relier les points du nuage comme une courbe.",
        "Oublier de diviser par l'effectif en calculant $\\bar{x}$ ou $\\bar{y}$.",
        "Échanger les coordonnées du point moyen $G$.",
        "Utiliser un ajustement affine pour un nuage courbé ou très dispersé.",
        "Additionner les écarts sans les élever au carré, dans la méthode des moindres carrés.",
        "Conclure qu'une grandeur cause l'autre parce que le nuage est aligné."
      ]
    },

    evaluation: {
      intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Les données sont fictives. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Réviser pour progresser",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Avant un contrôle, six élèves ont noté leur temps de révision $x$, en heures, et leur note $y$, sur $20$.",
          tableau: { lignes: [["x", "1", "2", "3", "5", "6", "7"], ["y", "7", "7", "10", "11", "15", "16"]] },
          figure: (o) => o.graph({
            xmin: -0.4, xmax: 8.4, ymin: 0, ymax: 20.5, xstep: 1, ystep: 1, yetiq: 2, h: 280, padL: 26,
            xlabel: "x", ylabel: "y",
            points: X1.map((x, k) => ({ x, y: Y1[k] })),
            aria: "Nuage de six points : (1 ; 7), (2 ; 7), (3 ; 10), (5 ; 11), (6 ; 15) et (7 ; 16), qui montent à peu près en ligne droite"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Un ajustement affine de ce nuage te semble-t-il pertinent ? Justifie.",
              indice: "Les points sont-ils à peu près alignés ?",
              corrige: "Oui : les points sont à peu près alignés, et la note augmente avec le temps de révision. On peut résumer le nuage par une droite."
            },
            {
              n: "2.", points: 1.5,
              texte: "Calcule les coordonnées du point moyen $G$ du nuage.",
              indice: "$\\bar{x}$ : somme des $x_i$ divisée par $6$ ; de même pour $\\bar{y}$.",
              corrige: "$\\bar{x} = \\dfrac{1 + 2 + 3 + 5 + 6 + 7}{6} = \\dfrac{24}{6} = 4$.\n\n$\\bar{y} = \\dfrac{7 + 7 + 10 + 11 + 15 + 16}{6} = \\dfrac{66}{6} = 11$.\n\nDonc $G(4\\,;11)$."
            },
            {
              n: "3.", points: 1.5,
              texte: "Méthode de Mayer : calcule le point moyen $G_1$ des trois premiers points et le point moyen $G_2$ des trois derniers, puis l'équation réduite de la droite $(G_1G_2)$.",
              indice: "Le coefficient directeur est $\\dfrac{y_{G_2} - y_{G_1}}{x_{G_2} - x_{G_1}}$.",
              corrige: "$G_1\\left(\\dfrac{1 + 2 + 3}{3}\\,;\\dfrac{7 + 7 + 10}{3}\\right) = (2\\,;8)$ et $G_2\\left(\\dfrac{5 + 6 + 7}{3}\\,;\\dfrac{11 + 15 + 16}{3}\\right) = (6\\,;14)$.\n\nCoefficient directeur : $\\dfrac{14 - 8}{6 - 2} = 1{,}5$. Puis $8 = 1{,}5 \\times 2 + b$ donne $b = 5$ : la droite a pour équation $y = 1{,}5x + 5$.",
              figureCorrige: (o) => o.graph({
                xmin: -0.4, xmax: 8.4, ymin: 0, ymax: 20.5, xstep: 1, ystep: 1, yetiq: 2, h: 280, padL: 26,
                xlabel: "x", ylabel: "y",
                curves: [{ f: (x) => 1.5 * x + 5, a: 0, b: 8, closed: false, label: "y = 1,5x + 5", lx: 7.6, dx: 4, dy: -12 }],
                points: X1.map((x, k) => ({ x, y: Y1[k] })).concat([{ x: 2, y: 8, label: "G₁", gauche: true }, { x: 6, y: 14, label: "G₂", gauche: true }]),
                aria: "Le nuage et la droite de Mayer d'équation y = 1,5x + 5, qui passe par G1(2 ; 8) et G2(6 ; 14)"
              })
            },
            {
              n: "4.", points: 1.5,
              texte: "Vérifie que $G$ appartient à cette droite. Estime la note d'un élève qui a révisé $4$ h $30$ min.",
              indice: "$4$ h $30$ min, c'est $4{,}5$ h.",
              corrige: "$1{,}5 \\times 4 + 5 = 11$ : $G(4\\,;11)$ est bien sur la droite. Pour $x = 4{,}5$ : $1{,}5 \\times 4{,}5 + 5 = 6{,}75 + 5 = 11{,}75$, soit une note d'environ $11{,}75$ sur $20$ (c'est une interpolation)."
            },
            {
              n: "5.", points: 1,
              texte: "Que prévoit la droite pour $12$ h de révision ? Commente.",
              indice: "Calcule $1{,}5 \\times 12 + 5$. Une note peut-elle dépasser $20$ ?",
              corrige: "$1{,}5 \\times 12 + 5 = 23$ : une note de $23$ sur $20$ est impossible. $12$ h est loin des données (au plus $7$ h) : cette extrapolation n'a pas de sens."
            }
          ]
        },
        {
          titre: "Quelle droite choisir ?",
          duree: 25, points: 7, calculatrice: false,
          contexte: "En sciences physiques, on mesure l'intensité $I$ du courant qui traverse un composant, en mA, pour plusieurs tensions $U$, en volts. On compare deux droites d'ajustement : $D_1$ d'équation $y = 2x + 1$, et $D_2$ d'équation $y = 1{,}6x + 1{,}5$.",
          tableau: { lignes: [["U", "1", "2", "3", "4"], ["I", "3", "5", "6", "8"]] },
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule les coordonnées du point moyen $G$. Laquelle des deux droites passe par $G$ ?",
              indice: "Remplace $x$ par $\\bar{x}$ dans chaque équation et compare avec $\\bar{y}$.",
              corrige: "$\\bar{x} = \\dfrac{10}{4} = 2{,}5$ et $\\bar{y} = \\dfrac{22}{4} = 5{,}5$ : $G(2{,}5\\,;5{,}5)$.\n\n$2 \\times 2{,}5 + 1 = 6 \\neq 5{,}5$ : $D_1$ ne passe pas par $G$. $1{,}6 \\times 2{,}5 + 1{,}5 = 4 + 1{,}5 = 5{,}5$ : $D_2$ passe par $G$."
            },
            {
              n: "2.", points: 2,
              texte: "Pour la droite $D_1$, calcule les quatre écarts $y_i - (2x_i + 1)$, puis la somme de leurs carrés.",
              indice: "Pour $x = 1$ : $3 - (2 \\times 1 + 1) = 0$.",
              corrige: "Les écarts sont $3 - 3 = 0$, $5 - 5 = 0$, $6 - 7 = -1$ et $8 - 9 = -1$. La somme de leurs carrés vaut $0 + 0 + 1 + 1 = 2$."
            },
            {
              n: "3.", points: 2,
              texte: "Même question avec la droite $D_2$. Quelle droite ajuste le mieux le nuage, au sens des moindres carrés ?",
              indice: "Pour $x = 1$ : $1{,}6 \\times 1 + 1{,}5 = 3{,}1$, donc l'écart est $3 - 3{,}1 = -0{,}1$.",
              corrige: "Les valeurs de $D_2$ sont $3{,}1$ ; $4{,}7$ ; $6{,}3$ et $7{,}9$. Les écarts sont $-0{,}1$ ; $0{,}3$ ; $-0{,}3$ et $0{,}1$, et la somme de leurs carrés vaut $0{,}01 + 0{,}09 + 0{,}09 + 0{,}01 = 0{,}2$.\n\n$0{,}2 < 2$ : $D_2$ ajuste mieux le nuage. C'est d'ailleurs la droite des moindres carrés de ces données."
            },
            {
              n: "4.", points: 1.5,
              texte: "Avec la droite $D_2$, estime l'intensité pour une tension de $5$ V. S'agit-il d'une interpolation ou d'une extrapolation ?",
              indice: "Remplace $x$ par $5$ dans l'équation de $D_2$.",
              corrige: "$1{,}6 \\times 5 + 1{,}5 = 9{,}5$ : environ $9{,}5$ mA. $5$ V est en dehors des tensions mesurées (de $1$ à $4$ V) : c'est une extrapolation, raisonnable ici car on reste proche des données."
            }
          ]
        },
        {
          titre: "Glaces et chaleur",
          duree: 25, points: 6, calculatrice: false,
          contexte: "Un glacier de la plage relève, pendant cinq jours, la température maximale $x$, en °C, et le nombre $y$ de glaces vendues.",
          tableau: { lignes: [["x", "26", "28", "30", "31", "35"], ["y", "40", "46", "55", "58", "71"]] },
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule les coordonnées du point moyen $G$.",
              indice: "La somme des températures vaut $150$.",
              corrige: "$\\bar{x} = \\dfrac{150}{5} = 30$ et $\\bar{y} = \\dfrac{40 + 46 + 55 + 58 + 71}{5} = \\dfrac{270}{5} = 54$ : $G(30\\,;54)$."
            },
            {
              n: "2.", points: 1.5,
              texte: "On ajuste le nuage par la droite de coefficient directeur $3{,}4$ qui passe par $G$. Détermine son équation réduite.",
              indice: "$y = 3{,}4x + b$, avec $54 = 3{,}4 \\times 30 + b$.",
              corrige: "$54 = 3{,}4 \\times 30 + b = 102 + b$, donc $b = -48$ : la droite a pour équation $y = 3{,}4x - 48$."
            },
            {
              n: "3.", points: 1.5,
              texte: "Estime le nombre de glaces vendues un jour à $33$ °C. Pourquoi serait-il risqué d'utiliser la droite pour un jour à $15$ °C ?",
              indice: "$3{,}4 \\times 33 = 112{,}2$.",
              corrige: "$3{,}4 \\times 33 - 48 = 112{,}2 - 48 = 64{,}2$ : environ $64$ glaces. Pour $15$ °C, on sortirait largement des données (de $26$ à $35$ °C) : la droite donnerait $3$ glaces, une extrapolation qui n'a guère de sens."
            },
            {
              n: "4.", points: 1.5,
              texte: "Ces mêmes jours, la pharmacie voisine a soigné de plus en plus de coups de soleil. Peut-on en conclure que les glaces donnent des coups de soleil ? Explique.",
              indice: "Qu'est-ce qui pourrait faire augmenter les deux en même temps ?",
              corrige: "Non. Les deux grandeurs augmentent ensemble (elles sont corrélées), mais l'une ne cause pas l'autre : c'est le soleil et la chaleur qui font augmenter à la fois les ventes de glaces et les coups de soleil."
            }
          ]
        }
      ]
    }
  };
})();
