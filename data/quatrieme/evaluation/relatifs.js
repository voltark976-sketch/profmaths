/*
  ENTRAÎNEMENT : 4e — chapitre 2, Multiplier et diviser des relatifs
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre quatrieme-relatifs.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle de 4e.
  Pyramides de produits dessinées par o.figGeo (assets/exercices-base.js) ; l'outil pyramide est dans une fonction
  pour ne pas déborder sur les autres fichiers de la page. Nombres différents de ceux du cours, de la méthode et du QCM.
*/
(function () {
  // Pyramide de produits : rangees[0] = base (4 briques), puis 3, 2, 1 ; chaque brique vaut le produit des deux du dessous
  const pyramide = (o, rangees, aria) => {
    const L = 72, H = 34, formes = [], textes = [], bas = 6 + H * (rangees.length - 1);
    rangees.forEach((r, i) => {
      const x0 = 150 - (r.length * L) / 2, y = bas - i * H;
      r.forEach((v, j) => {
        const x = x0 + j * L;
        formes.push({ p: [[x, y], [x + L, y], [x + L, y + H], [x, y + H]], image: v === "?" });
        textes.push([x + L / 2, y + 22, String(v).replace("-", "−"), "middle", "g-clabel"]);
      });
    });
    return o.figGeo({ W: 300, H: bas + H + 6, pts: {}, formes, textes, aria });
  };

  window.EVALUATIONS = window.EVALUATIONS || {};
  window.EVALUATIONS["quatrieme-relatifs"] = {
    revisions: {
      intro: "Multiplier et diviser des relatifs en un coup d'œil : la règle des signes, les produits de plusieurs facteurs, les puissances et les priorités. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "La règle des signes",
          texte: "Le produit de deux nombres de même signe est positif ; de deux nombres de signes contraires, il est négatif : $(-6) \\times (-3) = 18$ et $(-6) \\times 3 = -18$."
        },
        {
          titre: "Plusieurs facteurs",
          texte: "On compte les facteurs négatifs : s'il y en a un nombre pair, le produit est positif ; un nombre impair, il est négatif. Un facteur nul rend tout le produit nul."
        },
        {
          titre: "Diviser",
          texte: "La règle des signes est la même : $\\dfrac{-24}{6} = -4$ et $(-24) \\div (-6) = 4$. On ne divise jamais par $0$."
        },
        {
          titre: "Carrés et cubes",
          texte: "$(-3)^2 = (-3) \\times (-3) = 9$, mais $-3^2 = -9$ : sans parenthèses, le carré ne porte que sur $3$. Et $(-2)^3 = -8$."
        },
        {
          titre: "Les priorités",
          texte: "D'abord les parenthèses, puis les puissances, puis les multiplications et les divisions, enfin les additions et les soustractions, de gauche à droite."
        }
      ],
      pieges: [
        "Appliquer la règle des signes à une addition : $-3 + (-5) = -8$, et non $8$.",
        "Oublier un facteur négatif en comptant les signes d'un produit.",
        "Confondre $(-2)^2 = 4$ et $-2^2 = -4$.",
        "Calculer de gauche à droite sans respecter les priorités.",
        "Croire que diviser par un nombre négatif donne toujours un résultat négatif : $(-12) \\div (-4) = 3$."
      ]
    },

    evaluation: {
      intro: "Trois exercices comme en contrôle (environ $50$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Des calculs",
          duree: 15, points: 7, calculatrice: false,
          contexte: "Calcule en détaillant les étapes.",
          questions: [
            { n: "1.", points: 2, texte: "$A = (-7) \\times 4$ ; $B = (-1{,}5) \\times (-8)$ ; $C = \\dfrac{-63}{9}$ ; $D = (-45) \\div (-0{,}5)$.", corrige: "$A = -28$ (signes contraires) ; $B = 12$ (même signe) ; $C = -7$ ; $D = 90$ (même signe, et $45 \\div 0{,}5 = 90$)." },
            { n: "2.", points: 1.5, texte: "Donne le signe de $E = (-3) \\times 5 \\times (-2)$ ${} \\times (-1{,}5) \\times (-4)$, puis calcule $E$.", indice: "Compte les facteurs négatifs.", corrige: "Il y a $4$ facteurs négatifs, un nombre pair : $E$ est positif. $E = 3 \\times 5 \\times 2 \\times 1{,}5 \\times 4 = 180$." },
            { n: "3.", points: 2, texte: "$F = 7 - 3 \\times (-4) + (-10) \\div 5$ ; $G = (2 - 9) \\times (-3 + 1)$.", indice: "Les multiplications et les divisions passent avant les additions.", corrige: "$F = 7 - (-12) + (-2) = 7 + 12 - 2 = 17$.\n\n$G = (-7) \\times (-2) = 14$." },
            { n: "4.", points: 1.5, texte: "$H = (-2)^3 - (-3)^2$.", corrige: "$(-2)^3 = -8$ et $(-3)^2 = 9$, donc $H = -8 - 9 = -17$." }
          ]
        },
        {
          titre: "Les pyramides de produits",
          duree: 20, points: 7, calculatrice: false,
          contexte: "Dans une pyramide de produits, chaque brique vaut le produit des deux briques sur lesquelles elle repose.",
          questions: [
            {
              n: "1.", points: 3, texte: "Complète la pyramide ci-dessous.",
              figure: (o) => pyramide(o, [[-2, 3, -1, -4], ["?", "?", "?"], ["?", "?"], ["?"]], "Pyramide de produits : base −2, 3, −1, −4 ; les autres briques sont à compléter"),
              corrige: "Deuxième rangée : $(-2) \\times 3 = -6$, $3 \\times (-1) = -3$ et $(-1) \\times (-4) = 4$.\n\nTroisième rangée : $(-6) \\times (-3) = 18$ et $(-3) \\times 4 = -12$. Sommet : $18 \\times (-12) = -216$.",
              figureCorrige: (o) => pyramide(o, [[-2, 3, -1, -4], [-6, -3, 4], [18, -12], [-216]], "Pyramide complétée : base −2, 3, −1, −4 ; puis −6, −3, 4 ; puis 18, −12 ; sommet −216")
            },
            {
              n: "2.", points: 2.5, texte: "Complète cette autre pyramide.",
              indice: "Pour trouver une brique de la base, on divise : $2 \\times ? = -8$.",
              figure: (o) => pyramide(o, [[2, "?", -3], [-8, "?"], ["?"]], "Pyramide à trois rangées : base 2, ?, −3 ; au-dessus −8 et ? ; sommet ?"),
              corrige: "La brique du milieu de la base vaut $(-8) \\div 2 = -4$. Puis $(-4) \\times (-3) = 12$, et le sommet vaut $(-8) \\times 12 = -96$.",
              figureCorrige: (o) => pyramide(o, [[2, -4, -3], [-8, 12], [-96]], "Pyramide complétée : base 2, −4, −3 ; puis −8, 12 ; sommet −96")
            },
            { n: "3.", points: 1.5, texte: "Dans la première pyramide, on remplace la brique $3$ de la base par $-3$. Que devient le sommet ?", corrige: "Base $-2$ ; $-3$ ; $-1$ ; $-4$ : on trouve $6$ ; $3$ ; $4$, puis $18$ ; $12$, et le sommet vaut $216$. Le sommet change de signe." }
          ]
        },
        {
          titre: "Les températures de la station",
          duree: 15, points: 6, calculatrice: true,
          contexte: "Voici les températures minimales, en °C, relevées pendant une semaine dans une station de montagne (données fictives) :\n\n$-6$ ; $-2$ ; $3$ ; $-5$ ; $-8$ ; $1$ ; $-4$.",
          questions: [
            { n: "1.", points: 1.5, texte: "Calcule la température minimale moyenne de la semaine.", corrige: "Somme : $-6 - 2 + 3 - 5 - 8 + 1 - 4 = -21$. Moyenne : $\\dfrac{-21}{7} = -3$ °C." },
            { n: "2.", points: 1.5, texte: "Quel est l'écart entre la plus haute et la plus basse de ces températures ?", corrige: "$3 - (-8) = 3 + 8 = 11$ °C." },
            { n: "3.", points: 1.5, texte: "Pour passer des degrés Celsius aux degrés Fahrenheit, on multiplie par $1{,}8$, puis on ajoute $32$. Convertis $-5$ °C en degrés Fahrenheit.", corrige: "$-5 \\times 1{,}8 + 32 = -9 + 32 = 23$ °F." },
            { n: "4.", points: 1.5, texte: "Quelle température, en degrés Celsius, correspond à $-4$ °F ?", indice: "On fait les opérations inverses, dans l'ordre inverse.", corrige: "On retire $32$, puis on divise par $1{,}8$ : $\\dfrac{-4 - 32}{1{,}8} = \\dfrac{-36}{1{,}8} = -20$ °C." }
          ]
        }
      ]
    }
  };
})();
