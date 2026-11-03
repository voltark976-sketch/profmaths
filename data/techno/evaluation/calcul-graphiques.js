/*
  ENTRAÎNEMENT : Première technologique — chapitre 4, Automatismes : calcul, fonctions et graphiques
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre techno-calcul-graphiques.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["techno-calcul-graphiques"] = {
  revisions: {
    intro: "Les automatismes de calcul et de lecture graphique en un coup d'œil : produit nul, signe, développer et factoriser, résoudre sur une courbe, droites, moyenne et médiane. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Produit nul",
        texte: "Un produit est nul si et seulement si l'un au moins de ses facteurs est nul : $(x - 1)(3x + 6) = 0 \\iff x = 1$ ou $x = -2$."
      },
      {
        titre: "Signe de $ax + b$",
        texte: "$ax + b$ s'annule en $-\\dfrac{b}{a}$ : il a le signe de $a$ après cette valeur, et le signe contraire avant. Pour un produit, on fait un tableau de signes : une ligne par facteur, puis la règle des signes."
      },
      {
        titre: "Développer, factoriser",
        texte:
          "- $(a + b)^2 = a^2 + 2ab + b^2$ ;\n" +
          "- $(a - b)^2 = a^2 - 2ab + b^2$ ;\n" +
          "- $(a + b)(a - b) = a^2 - b^2$.\n\n" +
          "Factoriser, c'est repérer un facteur commun ou l'une de ces identités."
      },
      {
        titre: "Résoudre sur une courbe",
        texte: "Les solutions de $f(x) = k$ sont les **abscisses** des points de la courbe d'ordonnée $k$. Celles de $f(x) < k$ sont les abscisses des points de la courbe situés sous la droite d'équation $y = k$."
      },
      {
        titre: "Droites",
        texte: "Dans $y = mx + p$, $p$ est l'ordonnée à l'origine et $m$ le coefficient directeur : quand $x$ augmente de $1$, $y$ augmente de $m$. Avec deux points, $m = \\dfrac{y_B - y_A}{x_B - x_A}$."
      },
      {
        titre: "Moyenne, médiane",
        texte: "La moyenne est la somme des valeurs divisée par l'effectif. La médiane partage la série **rangée** en deux moitiés : elle est moins sensible que la moyenne aux valeurs extrêmes."
      }
    ],
    pieges: [
      "Diviser par $x$ dans $x^2 = 5x$ : on perd la solution $x = 0$.",
      "Oublier le signe de $a$ : $-2x + 6$ est positif **avant** $3$.",
      "Écrire $(x + 3)^2 = x^2 + 9$ : il manque le double produit $6x$.",
      "Résoudre $f(x) < k$ en lisant des ordonnées : les solutions sont des **abscisses**.",
      "Inverser le calcul de $\\dfrac{y_B - y_A}{x_B - x_A}$ ou mélanger l'ordre des points.",
      "Calculer une médiane sans ranger les valeurs."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Calculer, factoriser, résoudre",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Développe et réduis $A = (2x + 3)(x - 4)$ et $B = (x - 5)^2$.",
            indice: "Double distributivité pour $A$ ; identité $(a - b)^2 = a^2 - 2ab + b^2$ pour $B$.",
            corrige: "$A = 2x^2 - 8x + 3x - 12 = 2x^2 - 5x - 12$.\n\n$B = x^2 - 2 \\times x \\times 5 + 25 = x^2 - 10x + 25$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Factorise $C = 4x^2 - 20x$ et $D = x^2 - 49$.",
            indice: "$4x$ est un facteur commun de $C$. Et $49 = 7^2$.",
            corrige: "$C = 4x \\times x - 4x \\times 5 = 4x(x - 5)$.\n\n$D = x^2 - 7^2 = (x - 7)(x + 7)$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Résous l'équation $4x^2 = 20x$. Pourquoi ne faut-il pas commencer par diviser par $x$ ?",
            indice: "Mets tout du même côté, puis utilise la question 2.",
            corrige: "$4x^2 = 20x \\iff 4x^2 - 20x = 0 \\iff 4x(x - 5) = 0 \\iff x = 0$ ou $x = 5$. Donc $S = \\{0\\,;5\\}$.\n\nEn divisant par $x$, on perdrait la solution $x = 0$ (et on ne peut pas diviser par $0$)."
          },
          {
            n: "4.", points: 1.5,
            texte: "Dresse le tableau de signes de $(x - 7)(x + 7)$, puis résous l'inéquation $x^2 - 49 < 0$.",
            indice: "$x + 7$ s'annule en $-7$ et $x - 7$ en $7$ ; les deux ont un coefficient de $x$ positif.",
            corrige: "On a $x^2 - 49 = (x - 7)(x + 7)$. D'après le tableau de signes, ce produit est strictement négatif entre $-7$ et $7$ : $S = ]-7\\,;7[$.",
            tableauCorrige: { lignes: [["x", "-\\infty", "", "-7", "", "7", "", "+\\infty"], ["x + 7", "", "-", "0", "+", "", "+", ""], ["x - 7", "", "-", "", "-", "0", "+", ""], ["x^2 - 49", "", "+", "0", "-", "0", "+", ""]] }
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « Pour tout réel $x$, $(x + 6)^2 = x^2 + 36$. » Justifie.",
            indice: "Essaie $x = 1$, ou développe avec l'identité remarquable.",
            corrige: "**Faux.** $(x + 6)^2 = x^2 + 12x + 36$. Par exemple, pour $x = 1$ : $(1 + 6)^2 = 49$, mais $1 + 36 = 37$."
          }
        ]
      },
      {
        titre: "Le bénéfice d'un atelier",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Un atelier fabrique et vend des objets artisanaux. Son bénéfice, en milliers d'euros, pour $x$ centaines d'objets vendus, est noté $B(x)$, pour $x \\in [0\\,;8]$. Sa courbe est tracée ci-dessous.",
        figure: (o) => o.graph({
          xmin: -0.5, xmax: 8.6, ymin: -13, ymax: 5.6, xstep: 1, ystep: 1, yetiq: 2, h: 320, padL: 28,
          xlabel: "x", ylabel: "B(x)",
          curves: [{ f: (x) => -x * x + 8 * x - 12, a: 0, b: 8, label: "B", lx: 7.4, dx: 18, dy: 4 }],
          points: [{ x: 2, y: 0, label: "2", gauche: true }, { x: 6, y: 0, label: "6" }], // les nombres 2 et 6 de l'axe sont cachés par la courbe
          aria: "Courbe du bénéfice B pour x entre 0 et 8 : elle part de −12, coupe l'axe des abscisses en 2, monte jusqu'à 4 en x = 4, redescend, recoupe l'axe en 6 et finit à −12 en x = 8"
        }),
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Lis $B(0)$ et interprète. Donne les variations de $B$ et son maximum.",
            indice: "Regarde le point de la courbe d'abscisse $0$, puis le point le plus haut.",
            corrige: "$B(0) = -12$ : sans rien vendre, l'atelier perd $12\\,000$ € (ses frais fixes).\n\n$B$ est croissante sur $[0\\,;4]$ et décroissante sur $[4\\,;8]$. Son maximum est $B(4) = 4$ : $4\\,000$ € de bénéfice pour $400$ objets vendus."
          },
          {
            n: "2.", points: 1.5,
            texte: "Résous graphiquement $B(x) = 3$, puis $B(x) \\geqslant 0$.",
            indice: "Trace la droite d'équation $y = 3$ et lis les **abscisses** des points d'intersection.",
            corrige: "La droite d'équation $y = 3$ coupe la courbe aux points d'abscisses $3$ et $5$ : $S = \\{3\\,;5\\}$.\n\nLa courbe est au-dessus de l'axe des abscisses, ou dessus, pour $x$ entre $2$ et $6$ : $S = [2\\,;6]$."
          },
          {
            n: "3.", points: 1.5,
            texte: "On admet que $B(x) = -x^2 + 8x - 12$. Vérifie que $B(x) = (x - 2)(6 - x)$, puis retrouve avec un tableau de signes le résultat de $B(x) \\geqslant 0$.",
            indice: "Développe $(x - 2)(6 - x)$. Attention : $6 - x$ a un coefficient de $x$ négatif.",
            corrige: "$(x - 2)(6 - x) = 6x - x^2 - 12 + 2x = -x^2 + 8x - 12 = B(x)$.\n\nD'après le tableau de signes, $B(x) \\geqslant 0$ pour $x \\in [2\\,;6]$ : on retrouve le résultat lu sur la courbe.",
            tableauCorrige: { lignes: [["x", "0", "", "2", "", "6", "", "8"], ["x - 2", "", "-", "0", "+", "", "+", ""], ["6 - x", "", "+", "", "+", "0", "-", ""], ["B(x)", "", "-", "0", "+", "0", "-", ""]] }
          },
          {
            n: "4.", points: 1.5,
            texte: "Calcule $B(3)$ et $B(5)$ pour vérifier la question 2. Combien d'objets l'atelier doit-il vendre pour gagner au moins $3\\,000$ € ?",
            indice: "$B(3) = -9 + 24 - 12$. Pour la question posée, regarde où la courbe est au-dessus de la droite $y = 3$.",
            corrige: "$B(3) = -9 + 24 - 12 = 3$ et $B(5) = -25 + 40 - 12 = 3$ : c'est bien ce qu'on a lu.\n\nLa courbe est au-dessus de la droite d'équation $y = 3$ pour $x \\in [3\\,;5]$ : l'atelier doit vendre entre $300$ et $500$ objets."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « Plus l'atelier vend d'objets, plus son bénéfice est grand. » Justifie.",
            indice: "Compare $B(4)$ et $B(6)$.",
            corrige: "**Faux.** Au-delà de $400$ objets, le bénéfice diminue : $B(6) = 0$, alors que $B(4) = 4$."
          }
        ]
      },
      {
        titre: "Louer un scooter",
        duree: 25, points: 6, calculatrice: false,
        contexte: "Un loueur de scooters propose deux offres. Leurs prix, en euros, en fonction du nombre $x$ de jours de location, sont représentés par les droites $d_A$ et $d_B$ ci-dessous.",
        figure: (o) => o.graph({
          xmin: -0.4, xmax: 8.6, ymin: 0, ymax: 130, xstep: 1, ystep: 10, yetiq: 20, h: 300, padL: 30,
          xlabel: "x", ylabel: "prix",
          curves: [
            { f: (x) => 15 * x, a: 0, b: 8, label: "d<tspan class=\"sub\" dy=\"3\">A</tspan>", lx: 7.6, dx: -10, dy: -8 },
            { f: (x) => 10 * x + 20, a: 0, b: 8, label: "d<tspan class=\"sub\" dy=\"3\">B</tspan>", lx: 7.6, dx: 10, dy: 22 }
          ],
          points: [{ x: 0, y: 20, label: "20", gauche: true }, { x: 2, y: 30 }, { x: 2, y: 40 }, { x: 4, y: 60 }], // le nombre 20 de l'axe serait sous le point

          aria: "Deux droites : dA part de l'origine et passe par (2 ; 30) et (4 ; 60) ; dB part de (0 ; 20) et passe par (2 ; 40) et (4 ; 60) ; elles se coupent au point (4 ; 60)"
        }),
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Lis l'ordonnée à l'origine et le coefficient directeur de chaque droite, puis donne leurs équations réduites.",
            indice: "Le coefficient directeur est l'augmentation de $y$ quand $x$ augmente de $1$ : regarde de $x = 0$ à $x = 2$.",
            corrige: "$d_A$ passe par l'origine et par $(2\\,;30)$ : $p = 0$ et $m = \\dfrac{30}{2} = 15$, donc $y = 15x$.\n\n$d_B$ passe par $(0\\,;20)$ et par $(2\\,;40)$ : $p = 20$ et $m = \\dfrac{40 - 20}{2} = 10$, donc $y = 10x + 20$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Résous l'équation $15x = 10x + 20$. Interprète le résultat.",
            indice: "Regroupe les termes en $x$ d'un même côté.",
            corrige: "$15x = 10x + 20 \\iff 5x = 20 \\iff x = 4$. Pour $4$ jours, les deux offres coûtent le même prix : $15 \\times 4 = 60$ €. C'est le point d'intersection des deux droites."
          },
          {
            n: "3.", points: 1.5,
            texte: "Quelle offre est la moins chère pour $3$ jours ? Et pour $6$ jours ? Justifie par le calcul.",
            indice: "Calcule le prix de chaque offre pour $x = 3$, puis pour $x = 6$.",
            corrige: "Pour $3$ jours : $15 \\times 3 = 45$ € avec $A$ et $10 \\times 3 + 20 = 50$ € avec $B$ : l'offre $A$ est la moins chère.\n\nPour $6$ jours : $90$ € avec $A$ et $80$ € avec $B$ : l'offre $B$ est la moins chère."
          },
          {
            n: "4.", points: 1.5,
            texte: "Voici les durées, en jours, des $10$ dernières locations : $1$ ; $2$ ; $2$ ; $3$ ; $3$ ; $3$ ; $4$ ; $5$ ; $6$ ; $11$. Calcule leur moyenne et leur médiane. Le loueur dit : « En moyenne, nos clients louent $4$ jours, donc les deux offres se valent. » Qu'en penses-tu ?",
            indice: "La série est déjà rangée : la médiane est la moyenne des $5^\\text{e}$ et $6^\\text{e}$ valeurs.",
            corrige: "La somme des durées vaut $40$ : la moyenne est $\\dfrac{40}{10} = 4$ jours. La médiane est $\\dfrac{3 + 3}{2} = 3$ jours.\n\nLa moitié des clients louent $3$ jours ou moins : pour eux, l'offre $A$ est la moins chère. La moyenne est tirée vers le haut par la location de $11$ jours : $6$ clients sur $10$ ont intérêt à choisir $A$."
          }
        ]
      }
    ]
  }
};
