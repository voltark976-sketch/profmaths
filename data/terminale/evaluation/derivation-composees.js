/*
  ENTRAÎNEMENT : Terminale maths complémentaires — chapitre 7, Dérivation : fonctions composées et réciproques
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-derivation-composees.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths complémentaires.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-derivation-composees"] = {
  revisions: {
    intro: "La dérivation des fonctions composées en un coup d'œil : $g(ax + b)$, $e^u$, $u^2$, l'étude de $e^u$, la racine carrée comme réciproque du carré et l'optimisation. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "$g(ax + b)$",
        texte: "$\\left(g(ax + b)\\right)' = a \\times g'(ax + b)$ : on dérive l'extérieur en gardant $ax + b$, puis on multiplie par $a$. Par exemple $\\left(\\sqrt{4x + 1}\\right)' = \\dfrac{4}{2\\sqrt{4x + 1}} = \\dfrac{2}{\\sqrt{4x + 1}}$."
      },
      {
        titre: "$e^u$",
        texte: "$\\left(e^u\\right)' = u'e^u$. Comme $e^u > 0$, la fonction $e^u$ a le même sens de variation que $u$ : il suffit d'étudier le signe de $u'$."
      },
      {
        titre: "$u^2$",
        texte: "$(u^2)' = 2u'u$, car $u^2 = u \\times u$. Par exemple $\\left((x^2 + 1)^2\\right)' = 2 \\times 2x(x^2 + 1) = 4x(x^2 + 1)$."
      },
      {
        titre: "Carré et racine carrée",
        texte: "Pour $x \\geqslant 0$ : $y = x^2 \\iff x = \\sqrt{y}$. Les courbes du carré et de la racine carrée sont symétriques par rapport à la droite $y = x$. Attention : $\\sqrt{x^2} = |x|$."
      },
      {
        titre: "Optimiser",
        texte: "On exprime la grandeur en fonction de $x$ sur son intervalle, on la dérive, on étudie le signe de la dérivée, puis on lit le maximum ou le minimum dans le tableau de variations."
      }
    ],
    pieges: [
      "Oublier le facteur $a$ : $\\left(e^{-2x}\\right)' = -2e^{-2x}$.",
      "Écrire $(u^2)' = 2u$ en oubliant $u'$.",
      "Écrire $\\left(e^u\\right)' = e^{u'}$ au lieu de $u'e^u$.",
      "Chercher le signe de $e^u$ dans l'étude de $f'$ : il est toujours positif.",
      "Croire que $x^2 = y \\iff x = \\sqrt{y}$ sur $\\mathbb{R}$ : il faut $x \\geqslant 0$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Étudier une fonction $e^u$",
        duree: 25, points: 7, calculatrice: true,
        contexte: "On considère la fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = e^{-x^2 + 2x}$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Démontre que $f'(x) = (2 - 2x)e^{-x^2 + 2x}$.",
            indice: "$f = e^u$ avec $u(x) = -x^2 + 2x$.",
            corrige: "Avec $u(x) = -x^2 + 2x$, $u'(x) = -2x + 2$, donc $f'(x) = u'(x)e^{u(x)} = (2 - 2x)e^{-x^2 + 2x}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Étudie le sens de variation de $f$ et donne son maximum.",
            indice: "$e^{-x^2 + 2x} > 0$ : le signe de $f'(x)$ est celui de $2 - 2x$.",
            corrige: "$f'(x)$ a le signe de $2 - 2x$ : $f$ est croissante sur $]-\\infty\\,;1]$ et décroissante sur $[1\\,;+\\infty[$. Son maximum est $f(1) = e^{-1 + 2} = e \\approx 2{,}72$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Détermine les limites de $f$ en $+\\infty$ et en $-\\infty$. Interprète graphiquement.",
            indice: "Cherche d'abord la limite de $u(x) = -x^2 + 2x = x(2 - x)$, puis utilise $\\lim\\limits_{X \\to -\\infty} e^X = 0$.",
            corrige: "$u(x) = x(2 - x)$. En $+\\infty$, $x \\to +\\infty$ et $2 - x \\to -\\infty$ ; en $-\\infty$, $x \\to -\\infty$ et $2 - x \\to +\\infty$. Dans les deux cas, le produit $u(x)$ tend vers $-\\infty$, et $e^X \\to 0$ quand $X \\to -\\infty$. Donc $f(x) \\to 0$ des deux côtés : l'axe des abscisses est asymptote horizontale en $-\\infty$ et en $+\\infty$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Résous l'équation $f(x) = 1$.",
            indice: "$e^u = 1 \\iff u = 0$.",
            corrige: "$e^{-x^2 + 2x} = 1 \\iff -x^2 + 2x = 0 \\iff x(2 - x) = 0 \\iff x = 0$ ou $x = 2$."
          },
          {
            n: "5.", points: 1,
            texte: "Détermine une équation de la tangente à la courbe de $f$ au point d'abscisse $0$.",
            indice: "$f(0) = 1$ et $f'(0) = 2$.",
            corrige: "$f(0) = e^0 = 1$ et $f'(0) = 2e^0 = 2$ : la tangente a pour équation $y = 2x + 1$."
          }
        ]
      },
      {
        titre: "Dériver des fonctions composées",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Dérive $g(x) = (2x + 5)^4$ sur $\\mathbb{R}$, $h(x) = \\sqrt{3x + 1}$ sur $\\left]-\\dfrac{1}{3}\\,;+\\infty\\right[$ et $k(x) = e^{-0{,}5x + 1}$ sur $\\mathbb{R}$.",
            indice: "$\\left(g(ax + b)\\right)' = a \\times g'(ax + b)$.",
            corrige: "$g'(x) = 2 \\times 4(2x + 5)^3 = 8(2x + 5)^3$.\n\n$h'(x) = 3 \\times \\dfrac{1}{2\\sqrt{3x + 1}} = \\dfrac{3}{2\\sqrt{3x + 1}}$.\n\n$k'(x) = -0{,}5e^{-0{,}5x + 1}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Dérive $f(x) = (x^2 - 3x)^2$, puis calcule $f'(1)$.",
            indice: "$(u^2)' = 2u'u$ avec $u(x) = x^2 - 3x$.",
            corrige: "$f'(x) = 2(2x - 3)(x^2 - 3x)$. Puis $f'(1) = 2 \\times (-1) \\times (-2) = 4$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Dérive $q(x) = \\dfrac{1}{(2x - 1)^2}$ sur $\\left]\\dfrac{1}{2}\\,;+\\infty\\right[$.",
            indice: "$\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$, avec $v = (2x - 1)^2$ et $v' = 2 \\times 2(2x - 1)$.",
            corrige: "$v(x) = (2x - 1)^2$ et $v'(x) = 4(2x - 1)$, donc $q'(x) = -\\dfrac{4(2x - 1)}{(2x - 1)^4} = -\\dfrac{4}{(2x - 1)^3}$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Résous $\\sqrt{x} = 3$, puis calcule $\\sqrt{(-4)^2}$. Le point $(5\\,;25)$ est sur la courbe du carré : quel point de la courbe de la racine carrée lui correspond ?",
            indice: "Sur $[0\\,;+\\infty[$, $\\sqrt{x} = y \\iff x = y^2$. Et $\\sqrt{x^2} = |x|$.",
            corrige: "$\\sqrt{x} = 3 \\iff x = 9$. $\\sqrt{(-4)^2} = \\sqrt{16} = 4 = |-4|$. Par symétrie par rapport à $y = x$, au point $(5\\,;25)$ correspond le point $(25\\,;5)$, car $\\sqrt{25} = 5$."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « la dérivée de $e^{3x}$ est $e^{3x}$ ». Justifie.",
            indice: "$e^{3x} = e^u$ avec $u(x) = 3x$.",
            corrige: "**Faux.** $\\left(e^{3x}\\right)' = 3e^{3x}$ : on n'oublie pas le facteur $u'(x) = 3$."
          }
        ]
      },
      {
        titre: "Le plus petit grillage",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Un éleveur veut un enclos rectangulaire de $450$ m² pour ses cabris, en utilisant le moins de grillage possible. On note $x$ la largeur de l'enclos, en mètres, avec $x > 0$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Exprime la longueur en fonction de $x$, puis montre que le périmètre vaut $P(x) = 2x + \\dfrac{900}{x}$.",
            indice: "Aire : largeur fois longueur $= 450$.",
            corrige: "La longueur vaut $\\dfrac{450}{x}$, donc $P(x) = 2x + 2 \\times \\dfrac{450}{x} = 2x + \\dfrac{900}{x}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Démontre que $P'(x) = \\dfrac{2(x^2 - 450)}{x^2}$.",
            indice: "$\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$.",
            corrige: "$P'(x) = 2 - \\dfrac{900}{x^2} = \\dfrac{2x^2 - 900}{x^2} = \\dfrac{2(x^2 - 450)}{x^2}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Étudie les variations de $P$ sur $]0\\,;+\\infty[$. Quelles dimensions demandent le moins de grillage ? Combien de mètres faut-il ?",
            indice: "Pour $x > 0$, $x^2 > 450$ équivaut à $x > \\sqrt{450}$, car la fonction carré est strictement croissante sur $[0\\,;+\\infty[$ et $\\left(\\sqrt{450}\\right)^2 = 450$.",
            corrige: "$P'(x)$ a le signe de $x^2 - 450$ : négatif pour $0 < x < \\sqrt{450}$, positif ensuite. $P$ est minimal en $x = \\sqrt{450} = 15\\sqrt{2} \\approx 21{,}21$ m ; la longueur vaut alors $\\dfrac{450}{15\\sqrt{2}} = 15\\sqrt{2}$ m : l'enclos est carré. Il faut $P = 60\\sqrt{2} \\approx 84{,}85$ m de grillage."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Ce programme cherche la meilleure largeur de $0{,}1$ en $0{,}1$. Qu'affiche-t-il ?\n\n" +
              "```python\ndef P(x):\n    return 2*x + 900/x\n\nm = 1\nfor k in range(1, 1001):\n    x = k / 10\n    if P(x) < P(m):\n        m = x\nprint(m)\n```",
            indice: "Le minimum exact est en $15\\sqrt{2} \\approx 21{,}21$. Compare $P(21{,}2)$ et $P(21{,}3)$.",
            corrige: "$P(21{,}2) \\approx 84{,}8528$ et $P(21{,}3) \\approx 84{,}8535$ : le programme affiche $\\texttt{21.2}$, la valeur au dixième la plus proche du minimum."
          }
        ]
      }
    ]
  }
};
