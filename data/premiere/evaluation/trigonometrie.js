/*
  ENTRAÎNEMENT : Première spécialité — chapitre 8, Trigonométrie
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-trigonometrie.
  Format : voir data/premiere/evaluation/second-degre-2.js. Sans calculatrice (épreuve anticipée) :
  valeurs remarquables et angles associés ; valeurs approchées données dans l'énoncé.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-trigonometrie"] = {
  revisions: {
    intro: "La trigonométrie en un coup d'œil : radians, cercle trigonométrique, cosinus et sinus, valeurs remarquables et angles associés. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Radian",
        texte:
          "$\\pi$ rad $= 180°$, donc $1° = \\dfrac{\\pi}{180}$ rad.\n\n" +
          "Sur un cercle de rayon $r$, un angle au centre de $\\alpha$ radians intercepte un arc de longueur $L = r \\times \\alpha$ (angle en radians)."
      },
      {
        titre: "Point image",
        texte: "On enroule la droite des réels sur le cercle trigonométrique (rayon $1$, sens direct : inverse des aiguilles d'une montre). Chaque réel $x$ a un point image $M(x)$ ; $x$ et $x + 2k\\pi$ ($k$ entier) ont le même point image."
      },
      {
        titre: "Cosinus et sinus",
        texte:
          "$\\cos x$ est l'**abscisse** de $M(x)$, $\\sin x$ son **ordonnée**. Pour tout réel $x$ :\n\n" +
          "- $-1 \\leqslant \\cos x \\leqslant 1$ et $-1 \\leqslant \\sin x \\leqslant 1$ ;\n" +
          "- $\\cos^2 x + \\sin^2 x = 1$."
      },
      {
        titre: "Valeurs remarquables",
        texte:
          "- $\\cos\\dfrac{\\pi}{6} = \\dfrac{\\sqrt{3}}{2}$ et $\\sin\\dfrac{\\pi}{6} = \\dfrac{1}{2}$ ;\n" +
          "- $\\cos\\dfrac{\\pi}{4} = \\sin\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$ ;\n" +
          "- $\\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$ et $\\sin\\dfrac{\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$ ;\n" +
          "- $\\cos\\dfrac{\\pi}{2} = 0$ et $\\sin\\dfrac{\\pi}{2} = 1$ ; $\\cos \\pi = -1$ et $\\sin \\pi = 0$."
      },
      {
        titre: "Angles associés",
        texte:
          "- $\\cos(-x) = \\cos x$ et $\\sin(-x) = -\\sin x$ ;\n" +
          "- $\\cos(\\pi - x) = -\\cos x$ et $\\sin(\\pi - x) = \\sin x$ ;\n" +
          "- $\\cos(\\pi + x) = -\\cos x$ et $\\sin(\\pi + x) = -\\sin x$."
      },
      {
        titre: "Signes",
        texte: "$\\cos x > 0$ quand $M(x)$ est à droite de l'axe des ordonnées, $\\sin x > 0$ quand il est au-dessus de l'axe des abscisses. Par exemple $\\cos\\dfrac{2\\pi}{3} = -\\dfrac{1}{2}$ : le point est à gauche."
      },
      {
        titre: "Placer un point",
        texte: "Le demi-cercle supérieur mesure $\\pi$ : $\\dfrac{\\pi}{2}$ est un quart de tour, $\\dfrac{\\pi}{3}$ un tiers du demi-cercle, $\\dfrac{\\pi}{6}$ un sixième. Pour $\\dfrac{17\\pi}{6} = 2\\pi + \\dfrac{5\\pi}{6}$, on enlève un tour complet."
      },
      {
        titre: "Pour tout, il existe",
        texte: "« Pour tout $x$… » est faux dès qu'**un** contre-exemple existe : « pour tout $x$, $\\sin x \\geqslant 0$ » est faux car $\\sin\\left(-\\dfrac{\\pi}{2}\\right) = -1$. « Il existe $x$… » se prouve avec un seul exemple."
      }
    ],
    pieges: [
      "Confondre cosinus (l'abscisse) et sinus (l'ordonnée).",
      "Oublier le signe : $\\cos\\dfrac{2\\pi}{3}$ est négatif, le point est à gauche de l'axe des ordonnées.",
      "Écrire $\\cos x + \\sin x = 1$ au lieu de $\\cos^2 x + \\sin^2 x = 1$.",
      "Tourner dans le mauvais sens : le sens direct est le sens inverse des aiguilles d'une montre.",
      "Utiliser des degrés dans $L = r \\times \\alpha$ : l'angle doit être en radians.",
      "Croire que deux réels différents ont des points images différents : $x$ et $x + 2\\pi$ ont le même point."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "La grande roue de la fête",
        duree: 25, points: 7, calculatrice: false,
        contexte:
          "Pour la fête de Mamoudzou, on installe une grande roue de rayon $10$ m, dont l'axe $O$ est à $12$ m au-dessus du sol. Une cabine part du point de la roue situé à la hauteur de l'axe, à droite, et la roue tourne dans le sens direct.\n\n" +
          "Quand la roue a tourné d'un angle de $x$ radians, la cabine est à $10\\cos x$ mètres à droite de l'axe vertical (à gauche si ce nombre est négatif) et à la hauteur $12 + 10\\sin x$ mètres. On donne $\\sqrt{3} \\approx 1{,}73$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Quelle distance la cabine parcourt-elle en un tour complet ? Et quand la roue tourne de $\\dfrac{\\pi}{3}$ rad ?",
            indice: "La longueur d'un arc est $L = r \\times \\alpha$, avec $\\alpha$ en radians ; un tour complet vaut $2\\pi$.",
            corrige: "Un tour complet : $L = 10 \\times 2\\pi = 20\\pi$ m, environ $63$ m. Pour $\\dfrac{\\pi}{3}$ rad : $L = 10 \\times \\dfrac{\\pi}{3} = \\dfrac{10\\pi}{3}$ m, environ $10{,}5$ m."
          },
          {
            n: "2.", points: 1,
            texte: "À quelle hauteur est la cabine quand la roue a tourné d'un quart de tour ?",
            indice: "Un quart de tour correspond à $x = \\dfrac{\\pi}{2}$.",
            corrige: "$x = \\dfrac{\\pi}{2}$ et $\\sin\\dfrac{\\pi}{2} = 1$ : la hauteur est $12 + 10 \\times 1 = 22$ m. C'est le point le plus haut de la roue."
          },
          {
            n: "3.", points: 1.5,
            texte: "Où est la cabine quand la roue a tourné de $\\dfrac{\\pi}{6}$ rad ? Donne sa hauteur et sa distance à l'axe vertical.",
            indice: "$\\cos\\dfrac{\\pi}{6} = \\dfrac{\\sqrt{3}}{2}$ et $\\sin\\dfrac{\\pi}{6} = \\dfrac{1}{2}$.",
            corrige: "Hauteur : $12 + 10 \\times \\dfrac{1}{2} = 17$ m. Distance à l'axe vertical : $10 \\times \\dfrac{\\sqrt{3}}{2} = 5\\sqrt{3}$ m, environ $8{,}65$ m, à droite."
          },
          {
            n: "4.", points: 1.5,
            texte: "Même question pour un angle de $\\dfrac{2\\pi}{3}$ rad.",
            indice: "$\\dfrac{2\\pi}{3} = \\pi - \\dfrac{\\pi}{3}$ : utilise $\\cos(\\pi - x) = -\\cos x$ et $\\sin(\\pi - x) = \\sin x$.",
            corrige:
              "$\\cos\\dfrac{2\\pi}{3} = -\\cos\\dfrac{\\pi}{3} = -\\dfrac{1}{2}$ et $\\sin\\dfrac{2\\pi}{3} = \\sin\\dfrac{\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$.\n\n" +
              "La cabine est à $10 \\times \\dfrac{1}{2} = 5$ m **à gauche** de l'axe vertical, à la hauteur $12 + 5\\sqrt{3}$ m, environ $20{,}65$ m."
          },
          {
            n: "5.", points: 1,
            texte: "Et pour un angle de $\\dfrac{7\\pi}{6}$ rad ?",
            indice: "$\\dfrac{7\\pi}{6} = \\pi + \\dfrac{\\pi}{6}$ : utilise $\\sin(\\pi + x) = -\\sin x$.",
            corrige: "$\\sin\\dfrac{7\\pi}{6} = -\\sin\\dfrac{\\pi}{6} = -\\dfrac{1}{2}$, donc la hauteur est $12 - 5 = 7$ m. Et $\\cos\\dfrac{7\\pi}{6} = -\\dfrac{\\sqrt{3}}{2}$ : la cabine est à environ $8{,}65$ m à gauche de l'axe."
          },
          {
            n: "6.", points: 1,
            texte: "Pendant le premier tour ($0 \\leqslant x < 2\\pi$), pour quels angles la cabine est-elle à $17$ m de hauteur ?",
            indice: "$12 + 10\\sin x = 17 \\iff \\sin x = \\dfrac{1}{2}$. Deux points du cercle ont pour ordonnée $\\dfrac{1}{2}$.",
            corrige: "$12 + 10\\sin x = 17 \\iff \\sin x = \\dfrac{1}{2}$. Sur un tour, c'est le cas pour $x = \\dfrac{\\pi}{6}$ et pour $x = \\pi - \\dfrac{\\pi}{6} = \\dfrac{5\\pi}{6}$, une fois en montant et une fois en descendant."
          }
        ]
      },
      {
        titre: "Cosinus, sinus et logique",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans cet exercice, $x$ est un réel de l'intervalle $\\left[\\dfrac{\\pi}{2}\\,;\\pi\\right]$ tel que $\\sin x = \\dfrac{3}{5}$. Les questions 3 à 6 sont des affirmations : dis si elles sont vraies ou fausses, en justifiant.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $\\cos x$.",
            indice: "Utilise $\\cos^2 x + \\sin^2 x = 1$, puis le signe de $\\cos x$ sur $\\left[\\dfrac{\\pi}{2}\\,;\\pi\\right]$.",
            corrige:
              "$\\cos^2 x = 1 - \\sin^2 x = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$, donc $\\cos x = \\dfrac{4}{5}$ ou $\\cos x = -\\dfrac{4}{5}$.\n\n" +
              "Pour $x \\in \\left[\\dfrac{\\pi}{2}\\,;\\pi\\right]$, le point $M(x)$ est à gauche de l'axe des ordonnées, donc $\\cos x \\leqslant 0$ : $\\cos x = -\\dfrac{4}{5}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Déduis-en $\\cos(\\pi - x)$, $\\sin(\\pi - x)$, $\\cos(-x)$ et $\\sin(-x)$.",
            indice: "Angles associés : $\\cos(\\pi - x) = -\\cos x$, $\\sin(\\pi - x) = \\sin x$, $\\cos(-x) = \\cos x$, $\\sin(-x) = -\\sin x$.",
            corrige: "$\\cos(\\pi - x) = \\dfrac{4}{5}$, $\\sin(\\pi - x) = \\dfrac{3}{5}$, $\\cos(-x) = -\\dfrac{4}{5}$ et $\\sin(-x) = -\\dfrac{3}{5}$."
          },
          {
            n: "3.", points: 1,
            texte: "« Pour tout réel $t$, $\\cos t + \\sin t = 1$. »",
            indice: "Cherche un contre-exemple parmi les valeurs remarquables.",
            corrige: "**Faux.** Pour $t = \\pi$ : $\\cos \\pi + \\sin \\pi = -1 + 0 = -1 \\neq 1$. Un contre-exemple suffit. C'est $\\cos^2 t + \\sin^2 t$ qui vaut toujours $1$."
          },
          {
            n: "4.", points: 1,
            texte: "« Il existe un réel $t$ tel que $\\cos t = \\sin t$. »",
            indice: "Un seul exemple suffit pour prouver un « il existe ».",
            corrige: "**Vrai.** Pour $t = \\dfrac{\\pi}{4}$ : $\\cos\\dfrac{\\pi}{4} = \\sin\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$."
          },
          {
            n: "5.", points: 1,
            texte: "« Pour tout réel $t$, $\\sin(t + 2\\pi) = \\sin t$. »",
            indice: "Les réels $t$ et $t + 2\\pi$ ont-ils le même point image ?",
            corrige: "**Vrai.** $t + 2\\pi$ correspond à un tour de plus : il a le même point image que $t$, donc le même sinus (et le même cosinus)."
          },
          {
            n: "6.", points: 1,
            texte: "« Les réels $\\dfrac{\\pi}{3}$ et $\\dfrac{4\\pi}{3}$ ont le même point image. »",
            indice: "Calcule la différence des deux réels.",
            corrige: "**Faux.** $\\dfrac{4\\pi}{3} - \\dfrac{\\pi}{3} = \\pi$ : c'est un demi-tour, pas un tour complet. Les deux points sont diamétralement opposés ; par exemple $\\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$ alors que $\\cos\\dfrac{4\\pi}{3} = -\\dfrac{1}{2}$."
          }
        ]
      },
      {
        titre: "Approcher π comme Archimède",
        duree: 20, points: 6, calculatrice: false,
        contexte: "On inscrit des polygones réguliers dans un cercle de centre $O$ et de rayon $1$, dont le demi-périmètre vaut $\\pi$. Archimède comparait $\\pi$ au demi-périmètre de ces polygones.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Pour un hexagone régulier inscrit, les triangles formés par $O$ et deux sommets consécutifs sont équilatéraux. Quel est le demi-périmètre de l'hexagone ?",
            indice: "Un triangle équilatéral a trois côtés égaux, et deux d'entre eux sont des rayons.",
            corrige: "Chaque triangle est équilatéral avec deux côtés égaux au rayon $1$ : chaque côté de l'hexagone mesure $1$. Le périmètre vaut $6$, le demi-périmètre $3$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Pour un polygone régulier à $n$ côtés inscrit, montre que chaque côté mesure $2\\sin\\dfrac{\\pi}{n}$.",
            indice: "L'angle au centre qui intercepte un côté vaut $\\dfrac{2\\pi}{n}$. La hauteur issue de $O$ coupe le triangle isocèle en deux triangles rectangles d'hypoténuse $1$.",
            corrige:
              "Deux sommets consécutifs $A$ et $B$ forment avec $O$ un triangle isocèle ($OA = OB = 1$), d'angle au centre $\\dfrac{2\\pi}{n}$. La hauteur issue de $O$ coupe $[AB]$ en son milieu $H$ et l'angle en deux angles de $\\dfrac{\\pi}{n}$.\n\n" +
              "Dans le triangle $OHA$ rectangle en $H$ : $AH = OA \\times \\sin\\dfrac{\\pi}{n} = \\sin\\dfrac{\\pi}{n}$. Donc $AB = 2\\sin\\dfrac{\\pi}{n}$."
          },
          {
            n: "3.", points: 1,
            texte: "Vérifie la formule pour l'hexagone, puis donne la longueur du côté du carré inscrit.",
            indice: "Hexagone : $n = 6$ ; carré : $n = 4$.",
            corrige: "$n = 6$ : $2\\sin\\dfrac{\\pi}{6} = 2 \\times \\dfrac{1}{2} = 1$, comme à la question 1. $n = 4$ : $2\\sin\\dfrac{\\pi}{4} = 2 \\times \\dfrac{\\sqrt{2}}{2} = \\sqrt{2}$."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Le demi-périmètre du polygone à $n$ côtés vaut donc $n\\sin\\dfrac{\\pi}{n}$. Combien de lignes ce programme affiche-t-il, et que représentent-elles ?\n\n" +
              "```python\nfrom math import sin, pi\n\nn = 6\nwhile n <= 96:\n    print(n, n * sin(pi / n))\n    n = 2 * n\n```",
            indice: "Écris les valeurs successives de $\\texttt{n}$ : on double à chaque tour, tant que $\\texttt{n}$ ne dépasse pas $96$.",
            corrige: "$\\texttt{n}$ prend les valeurs $6$, $12$, $24$, $48$ et $96$ : le programme affiche $5$ lignes, le nombre de côtés et le demi-périmètre du polygone. Les demi-périmètres valent environ $3$ ; $3{,}106$ ; $3{,}133$ ; $3{,}139$ ; $3{,}141$ : ils se rapprochent de $\\pi$. Archimède s'est arrêté à $96$ côtés."
          },
          {
            n: "5.", points: 1,
            texte: "Pourquoi ces demi-périmètres sont-ils tous inférieurs à $\\pi$ ?",
            indice: "Compare chaque côté du polygone avec l'arc de cercle qui joint les deux mêmes sommets.",
            corrige: "Chaque côté est un segment, plus court que l'arc de cercle qui joint les deux mêmes sommets. Le périmètre du polygone est donc inférieur à celui du cercle, $2\\pi$, et son demi-périmètre est inférieur à $\\pi$."
          }
        ]
      }
    ]
  }
};
