/*
  ENTRAÎNEMENT : Terminale maths complémentaires — chapitre 6, Statistique à deux variables quantitatives
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-deux-variables.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths complémentaires.
  Données fictives ; les résultats « de la calculatrice » sont recalculés par la vérification.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-deux-variables"] = {
  revisions: {
    intro: "La statistique à deux variables en un coup d'œil : nuage et point moyen, droite des moindres carrés, coefficient de corrélation, prévisions, changement de variable et causalité. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Nuage et point moyen",
        texte: "Chaque couple $(x_i\\,;y_i)$ donne un point du nuage. Le point moyen est $G(\\bar{x}\\,;\\bar{y})$, avec les moyennes des $x_i$ et des $y_i$."
      },
      {
        titre: "Moindres carrés",
        texte: "La droite des moindres carrés $y = ax + b$ rend minimale la somme des carrés des écarts verticaux $(y_i - ax_i - b)^2$. Elle passe par le point moyen $G$. On obtient $a$ et $b$ à la calculatrice ou au tableur."
      },
      {
        titre: "Coefficient de corrélation",
        texte: "$r$ est entre $-1$ et $1$. Si $|r|$ est proche de $1$, les points sont proches d'une droite ; le signe de $r$ est celui de la pente. Mais il faut aussi regarder le nuage : une forme courbée appelle un autre modèle."
      },
      {
        titre: "Prévoir",
        texte: "Interpoler, à l'intérieur de la plage des données, est assez fiable. Extrapoler, en dehors, suppose que la tendance continue : c'est fragile."
      },
      {
        titre: "Changement de variable",
        texte: "Si le nuage est courbé, on pose par exemple $z = x^2$ : si les points $(z_i\\,;y_i)$ sont presque alignés, on ajuste $y = az + b$, puis on remplace $z$ par $x^2$."
      },
      {
        titre: "Corrélation et causalité",
        texte: "Une forte corrélation ne prouve pas que l'une des variables cause l'autre : un facteur commun peut faire varier les deux en même temps."
      }
    ],
    pieges: [
      "Conclure à une cause à partir d'une forte corrélation.",
      "Extrapoler loin des données sans esprit critique.",
      "Se contenter de $r$ sans regarder la forme du nuage.",
      "Inverser les rôles de $x$ et de $y$ dans la calculatrice.",
      "Dans un changement de variable, remplacer $x$ au lieu de $z$ dans l'équation de la droite.",
      "Additionner les écarts au lieu de leurs carrés."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Les membres du club de plongée",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Un club de plongée de Mayotte a relevé son nombre de membres de 2019 à 2025. On note $x$ le rang de l'année ($x = 0$ en 2019) et $y$ le nombre de membres (données fictives).",
        tableau: { lignes: [["x", "0", "1", "2", "3", "4", "5", "6"], ["y", "120", "130", "141", "150", "159", "170", "180"]] },
        figure: (o) => o.graph({
          xmin: -0.5, xmax: 9.6, ymin: 100, ymax: 215, xstep: 1, ystep: 10, yetiq: 20, h: 260, padL: 30,
          points: [[0, 120], [1, 130], [2, 141], [3, 150], [4, 159], [5, 170], [6, 180]].map(([x, y]) => ({ x, y })),
          aria: "Nuage de 7 points presque alignés, de (0 ; 120) à (6 ; 180)"
        }),
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule les coordonnées du point moyen $G$ du nuage.",
            indice: "$\\bar{x}$ est la moyenne des $x_i$, $\\bar{y}$ celle des $y_i$.",
            corrige: "$\\bar{x} = \\dfrac{0 + 1 + \\dots + 6}{7} = \\dfrac{21}{7} = 3$ et $\\bar{y} = \\dfrac{1\\,050}{7} = 150$ : $G(3\\,;150)$."
          },
          {
            n: "2.", points: 1.5,
            texte: "À la calculatrice, donne l'équation de la droite des moindres carrés (coefficients arrondis au centième) et le coefficient de corrélation $r$ (au dix-millième). Un ajustement affine est-il justifié ?",
            indice: "Mode statistiques à deux variables, régression linéaire.",
            corrige: "On obtient $y = 9{,}93x + 120{,}21$ et $r \\approx 0{,}9997$. $r$ est très proche de $1$ et le nuage est allongé le long d'une droite : l'ajustement affine est justifié."
          },
          {
            n: "3.", points: 1.5,
            texte: "Vérifie que la droite passe par le point moyen. Que représente le coefficient $9{,}93$ ?",
            indice: "Remplace $x$ par $3$.",
            corrige: "$9{,}93 \\times 3 + 120{,}21 = 150$ : la droite passe par $G$. Le coefficient $9{,}93$ est l'augmentation moyenne du nombre de membres par an, environ $10$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Avec cette droite, estime le nombre de membres en 2028. Est-ce une interpolation ou une extrapolation ? Quelle prudence faut-il garder ?",
            indice: "2028 correspond à $x = 9$.",
            corrige: "$9{,}93 \\times 9 + 120{,}21 \\approx 210$ membres. C'est une extrapolation, en dehors de la période observée : elle suppose que la croissance continue au même rythme, ce que rien ne garantit (place sur le bateau, nombre de moniteurs…)."
          },
          {
            n: "5.", points: 1.5,
            texte:
              "On compare la droite des moindres carrés avec la droite $y = 10x + 120$. $\\texttt{somme(X, Y, 10, 120)}$ renvoie $\\texttt{2}$ et $\\texttt{somme(X, Y, 9.93, 120.21)}$ renvoie environ $\\texttt{1.857}$. Que calcule la fonction ? Que montrent ces résultats ?\n\n" +
              "```python\ndef somme(X, Y, a, b):\n    s = 0\n    for i in range(len(X)):\n        p = a * X[i] + b\n        s = s + (Y[i] - p)**2\n    return s\n```",
            indice: "$\\texttt{p}$ est l'ordonnée du point de la droite d'abscisse $x_i$.",
            corrige: "Elle calcule la somme des carrés des écarts verticaux entre les points et la droite $y = ax + b$. La droite des moindres carrés donne une somme plus petite ($1{,}857 < 2$), même si $y = 10x + 120$ passe exactement par plusieurs points : c'est elle qui minimise cette somme."
          }
        ]
      },
      {
        titre: "La distance de freinage",
        duree: 25, points: 7, calculatrice: true,
        contexte: "On a mesuré la distance de freinage $d$, en mètres, d'une voiture sur route sèche en fonction de sa vitesse $v$, en km/h (données fictives).",
        tableau: { lignes: [["v", "30", "50", "70", "90", "110"], ["d", "9{,}5", "24", "50", "80", "122"]] },
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "L'ajustement affine de $d$ en fonction de $v$ donne $d = 1{,}405v - 41{,}25$, avec $r \\approx 0{,}984$. Calcule les distances qu'il prévoit pour $30$ et $110$ km/h. Ce modèle te semble-t-il bon ?",
            indice: "Compare avec les valeurs mesurées : $9{,}5$ m et $122$ m.",
            corrige: "Il prévoit $1{,}405 \\times 30 - 41{,}25 \\approx 0{,}9$ m et $1{,}405 \\times 110 - 41{,}25 \\approx 113{,}3$ m, au lieu de $9{,}5$ m et $122$ m : il se trompe beaucoup aux deux bouts. Malgré $r \\approx 0{,}984$, le nuage est courbé : un ajustement affine en $v$ ne convient pas."
          },
          {
            n: "2.", points: 1.5,
            texte: "On pose $z = v^2$. Calcule les valeurs de $z$, puis donne à la calculatrice l'ajustement affine $d = az + b$ ($a$ arrondi à $10^{-5}$, $b$ au centième) et le coefficient $r$.",
            indice: "$z$ vaut $900$ pour $v = 30$.",
            corrige: "$z$ vaut $900$ ; $2\\,500$ ; $4\\,900$ ; $8\\,100$ et $12\\,100$. On obtient $d = 0{,}01005z - 0{,}18$, avec $r \\approx 0{,}9998$ : les points $(z\\,;d)$ sont presque parfaitement alignés."
          },
          {
            n: "3.", points: 1.5,
            texte: "Exprime $d$ en fonction de $v$, puis estime la distance de freinage à $130$ km/h.",
            indice: "Remplace $z$ par $v^2$.",
            corrige: "$d \\approx 0{,}01005v^2 - 0{,}18$. Pour $v = 130$ : $d \\approx 0{,}01005 \\times 16\\,900 - 0{,}18 \\approx 169{,}7$ m, soit environ $170$ m."
          },
          {
            n: "4.", points: 1.5,
            texte: "Le résultat de la question 3 est-il une interpolation ou une extrapolation ? Pourquoi faut-il rester prudent ?",
            indice: "Les mesures vont de $30$ à $110$ km/h.",
            corrige: "C'est une extrapolation, car $130$ km/h est en dehors des vitesses mesurées. Le modèle suppose que la distance continue de croître comme $v^2$ ; d'autres facteurs (freins, pneus, route) peuvent compter."
          },
          {
            n: "5.", points: 1,
            texte: "Avec ce modèle, à quelle vitesse la distance de freinage atteint-elle $100$ m ?",
            indice: "Résous $0{,}01005v^2 - 0{,}18 = 100$ avec $v > 0$.",
            corrige: "$v^2 = \\dfrac{100{,}18}{0{,}01005} \\approx 9\\,968$, donc $v \\approx 99{,}8$ km/h, soit environ $100$ km/h."
          }
        ]
      },
      {
        titre: "Interpréter sans calculer",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule le point moyen de la série $(2\\,;5)$, $(4\\,;9)$, $(6\\,;12)$, $(8\\,;14)$.",
            indice: "Moyenne des abscisses, puis des ordonnées.",
            corrige: "$\\bar{x} = \\dfrac{2 + 4 + 6 + 8}{4} = 5$ et $\\bar{y} = \\dfrac{5 + 9 + 12 + 14}{4} = 10$ : $G(5\\,;10)$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Pour cette série, la droite des moindres carrés est $y = 1{,}5x + 2{,}5$. Vérifie qu'elle passe par $G$, puis calcule la somme des carrés des écarts.",
            indice: "Les écarts sont $y_i - (1{,}5x_i + 2{,}5)$.",
            corrige: "$1{,}5 \\times 5 + 2{,}5 = 10$ : elle passe par $G$. Les écarts valent $5 - 5{,}5 = -0{,}5$, $9 - 8{,}5 = 0{,}5$, $12 - 11{,}5 = 0{,}5$ et $14 - 14{,}5 = -0{,}5$ : la somme de leurs carrés vaut $4 \\times 0{,}25 = 1$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Deux séries ont pour coefficients de corrélation $r_1 = -0{,}95$ et $r_2 = 0{,}12$. Décris leurs nuages. Pour laquelle un ajustement affine est-il pertinent ?",
            indice: "Regarde $|r|$, puis le signe de $r$.",
            corrige: "Pour $r_1 = -0{,}95$, les points sont proches d'une droite décroissante : un ajustement affine est pertinent. Pour $r_2 = 0{,}12$, les points sont très dispersés, sans tendance affine nette : un ajustement affine ne servirait à rien."
          },
          {
            n: "4.", points: 1.5,
            texte: "Dans les communes de Mayotte, le nombre de voitures et le nombre de boulangeries sont fortement corrélés. Peut-on en conclure que les voitures font ouvrir des boulangeries ?",
            indice: "Cherche un facteur qui fait varier les deux nombres en même temps.",
            corrige: "Non : corrélation n'est pas causalité. Un facteur commun explique les deux : la population. Plus une commune a d'habitants, plus elle a de voitures et de boulangeries."
          }
        ]
      }
    ]
  }
};
