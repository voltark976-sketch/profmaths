/*
  ENTRAÎNEMENT : 3e — chapitre 7, Fonctions linéaires et affines (pilote du collège)
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre troisieme-fonctions-affines.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type brevet, calculatrice autorisée sauf mention.
  Tarifs et prix fictifs ; nombres différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["troisieme-fonctions-affines"] = {
  revisions: {
    intro: "Les fonctions linéaires et affines en un coup d'œil : la formule, l'image et l'antécédent, la droite, et les problèmes de tarifs et de pourcentages. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Linéaire ou affine ?",
        texte: "Une fonction **affine** s'écrit $f(x) = ax + b$. Si $b = 0$, elle est **linéaire** : $f(x) = ax$, et elle traduit une situation de proportionnalité de coefficient $a$. Une fonction linéaire est donc un cas particulier de fonction affine."
      },
      {
        titre: "Image et antécédent",
        texte: "L'image de $3$ par $f$ est $f(3)$ : on **remplace** $x$ par $3$. Un antécédent de $7$ est un nombre $x$ tel que $f(x) = 7$ : on **résout** une équation."
      },
      {
        titre: "La droite",
        texte:
          "- La courbe d'une fonction affine est une **droite** ; celle d'une fonction linéaire passe par l'origine.\n" +
          "- $b$ est l'**ordonnée à l'origine** : la droite coupe l'axe vertical au point $(0\\,;b)$.\n" +
          "- $a$ est le **coefficient directeur** : quand $x$ augmente de $1$, $y$ augmente de $a$ (ou diminue si $a < 0$)."
      },
      {
        titre: "Trouver $a$ et $b$",
        texte: "Avec deux images $f(x_1) = y_1$ et $f(x_2) = y_2$ : $a = \\dfrac{y_2 - y_1}{x_2 - x_1}$, puis $b = y_1 - ax_1$. On vérifie avec la seconde image."
      },
      {
        titre: "Pourcentages",
        texte: "Augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$ ; baisser de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$. La fonction $x \\mapsto 1{,}08x$ (hausse de $8\\,\\%$) est linéaire."
      },
      {
        titre: "Comparer deux tarifs",
        texte: "Un tarif « partie fixe $+$ prix par unité » est une fonction affine. Les deux tarifs coûtent la même chose quand $f(x) = g(x)$ : graphiquement, c'est l'abscisse du point d'intersection des deux droites."
      }
    ],
    pieges: [
      "Confondre image et antécédent : pour l'image on calcule, pour l'antécédent on résout.",
      "Croire que toute droite représente une fonction linéaire : seule une droite qui passe par l'origine.",
      "Calculer $a$ à l'envers : c'est la variation de $y$ divisée par la variation de $x$.",
      "Oublier la partie fixe d'un tarif.",
      "Multiplier par $0{,}2$ pour une hausse de $20\\,\\%$ : on multiplie par $1{,}2$.",
      "Croire qu'une hausse de $10\\,\\%$ puis une baisse de $10\\,\\%$ ramènent au prix de départ."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme au brevet (environ $65$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Louer un kayak sur le lagon",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Un club loue des kayaks à l'heure. Formule A : $6$ € par heure. Formule B : une carte de $15$ €, puis $3$ € par heure. On note $f(x)$ le prix, en euros, de $x$ heures avec la formule A, et $g(x)$ avec la formule B. Les deux fonctions sont représentées ci-dessous.",
        figure: (o) => o.graph({
          xmin: -0.5, xmax: 10.5, ymin: -3, ymax: 63, ystep: 10, h: 300,
          curves: [{ f: (x) => 6 * x, a: 0, b: 10, label: "A", lx: 9.3, dx: -10, dy: -6 }, { f: (x) => 3 * x + 15, a: 0, b: 10, label: "B", lx: 9.6, dx: 4, dy: 16 }],
          aria: "Deux droites : A, prix de la formule A, part de l'origine et monte à 60 € pour 10 heures ; B, prix de la formule B, part de 15 € et monte à 45 € pour 10 heures. Elles se coupent au point d'abscisse 5 et d'ordonnée 30"
        }),
        questions: [
          { n: "1.", points: 1, texte: "Calcule le prix de $3$ heures de location avec chaque formule.", indice: "Formule B : n'oublie pas la carte de $15$ €.", corrige: "Formule A : $3 \\times 6 = 18$ €. Formule B : $15 + 3 \\times 3 = 24$ €." },
          { n: "2.", points: 1.5, texte: "Exprime $f(x)$ et $g(x)$ en fonction de $x$. Laquelle de ces deux fonctions est linéaire ?", indice: "Une fonction linéaire s'écrit $ax$, sans partie fixe.", corrige: "$f(x) = 6x$ et $g(x) = 3x + 15$. La fonction $f$ est linéaire (le prix est proportionnel au nombre d'heures) ; $g$ est affine, mais pas linéaire, à cause de la carte." },
          { n: "3.", points: 1.5, texte: "Lis sur le graphique pour quelle durée les deux formules coûtent le même prix, et ce prix.", indice: "Cherche le point d'intersection des deux droites.", corrige: "Les deux droites se coupent au point de coordonnées $(5\\,;30)$ : pour $5$ heures, les deux formules coûtent $30$ €." },
          { n: "4.", points: 1.5, texte: "Retrouve ce résultat par le calcul.", indice: "Résous l'équation $6x = 3x + 15$.", corrige: "$f(x) = g(x) \\iff 6x = 3x + 15 \\iff 3x = 15 \\iff x = 5$, et $f(5) = 6 \\times 5 = 30$ € : on retrouve le résultat lu." },
          { n: "5.", points: 1.5, texte: "Nadia veut faire $8$ heures de kayak pendant les vacances. Quelle formule lui conseilles-tu ?", corrige: "Formule A : $6 \\times 8 = 48$ €. Formule B : $15 + 3 \\times 8 = 39$ €. La formule B est moins chère de $9$ € : au-delà de $5$ heures, la carte devient rentable." }
        ]
      },
      {
        titre: "Lire une droite, trouver la fonction",
        duree: 20, points: 7, calculatrice: false,
        contexte: "La droite ci-dessous représente une fonction affine $h$. Elle passe par les points $(-2\\,;5)$ et $(2\\,;-3)$.",
        figure: (o) => o.graph({
          xmin: -3.5, xmax: 3.5, ymin: -4.5, ymax: 6.5, h: 300,
          curves: [{ f: (x) => -2 * x + 1, a: -2.7, b: 2.7, label: "h", lx: 2.4, dx: 10, dy: 2 }],
          points: [{ x: -2, y: 5 }, { x: 2, y: -3 }],
          aria: "Droite de la fonction h, qui descend : elle passe par les points (−2 ; 5), (0 ; 1), (0,5 ; 0) et (2 ; −3)"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Lis sur le graphique l'image de $0$, l'image de $1$ et l'antécédent de $5$.", indice: "L'image se lit sur l'axe vertical, l'antécédent sur l'axe horizontal.", corrige: "$h(0) = 1$, $h(1) = -1$, et l'antécédent de $5$ est $-2$, car la droite passe par $(-2\\,;5)$." },
          { n: "2.", points: 1.5, texte: "Calcule le coefficient directeur $a$ de la droite.", indice: "$a = \\dfrac{y_2 - y_1}{x_2 - x_1}$ avec les deux points donnés.", corrige: "$a = \\dfrac{-3 - 5}{2 - (-2)} = \\dfrac{-8}{4} = -2$. La droite descend : quand $x$ augmente de $1$, $y$ diminue de $2$." },
          { n: "3.", points: 1.5, texte: "Donne l'expression de $h(x)$.", indice: "L'ordonnée à l'origine $b$ se lit à la question 1.", corrige: "$b = h(0) = 1$, donc $h(x) = -2x + 1$. Vérification : $h(2) = -4 + 1 = -3$." },
          { n: "4.", points: 1.5, texte: "Calcule l'image de $-5$ par $h$, puis l'antécédent de $-9$.", indice: "Pour l'antécédent, résous $-2x + 1 = -9$.", corrige: "$h(-5) = -2 \\times (-5) + 1 = 11$.\n\n$-2x + 1 = -9 \\iff -2x = -10 \\iff x = 5$ : l'antécédent de $-9$ est $5$." },
          { n: "5.", points: 1, texte: "Le point $M(10\\,;-19)$ est-il sur la droite ? Justifie.", corrige: "$h(10) = -2 \\times 10 + 1 = -19$ : c'est l'ordonnée de $M$, donc $M$ est sur la droite." }
        ]
      },
      {
        titre: "Hausse, puis soldes",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Un magasin augmente tous ses prix de $8\\,\\%$. Le nouveau prix, en euros, d'un article qui coûtait $x$ euros est noté $p(x)$.",
        questions: [
          { n: "1.", points: 1, texte: "Un ballon coûtait $25$ €. Calcule son nouveau prix.", indice: "Augmenter de $8\\,\\%$, c'est multiplier par $1{,}08$.", corrige: "$25 \\times 1{,}08 = 27$ € : le ballon coûte maintenant $27$ €." },
          { n: "2.", points: 1.5, texte: "Exprime $p(x)$ en fonction de $x$. Quelle est la nature de la fonction $p$ ?", corrige: "$p(x) = x + \\dfrac{8}{100}x = 1{,}08x$ : $p$ est une fonction linéaire, de coefficient $1{,}08$." },
          { n: "3.", points: 1, texte: "Après la hausse, un sac coûte $54$ €. Quel était son prix avant ?", indice: "Cherche l'antécédent de $54$ : résous $1{,}08x = 54$.", corrige: "$1{,}08x = 54 \\iff x = \\dfrac{54}{1{,}08} = 50$ : le sac coûtait $50$ €." },
          { n: "4.", points: 1, texte: "Les anciens prix sont dans la colonne A d'un tableur, à partir de la cellule A2. Quelle formule écrire dans la cellule B2, puis recopier vers le bas, pour obtenir les nouveaux prix ?", corrige: "$\\texttt{=A2*1,08}$ : la formule multiplie l'ancien prix de la ligne par $1{,}08$." },
          { n: "5.", points: 1.5, texte: "Pendant les soldes, le magasin baisse ensuite ses nouveaux prix de $10\\,\\%$. Un client affirme : « Avec les soldes, on paie moins cher qu'avant la hausse. » A-t-il raison ?", indice: "Multiplie les coefficients : $1{,}08$, puis $0{,}9$.", corrige: "Le prix final est $x \\times 1{,}08 \\times 0{,}9 = 0{,}972x$. Comme $0{,}972 < 1$, le prix soldé est inférieur au prix de départ : le client a raison. Par exemple, le ballon passe de $25$ € à $27$ €, puis à $24{,}30$ €. La baisse totale est de $2{,}8\\,\\%$ : une hausse de $8\\,\\%$ puis une baisse de $10\\,\\%$ ne se compensent pas." }
        ]
      }
    ]
  }
};
