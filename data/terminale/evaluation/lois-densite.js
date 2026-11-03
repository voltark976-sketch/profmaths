/*
  ENTRAÎNEMENT : Terminale maths complémentaires — chapitre 13, Lois à densité
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-lois-densite.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths complémentaires.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-lois-densite"] = {
  revisions: {
    intro: "Les lois à densité en un coup d'œil : densité et probabilité comme aire, fonction de répartition, espérance, loi uniforme et loi exponentielle sans mémoire. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Densité",
        texte: "Une densité sur $I$ est une fonction continue, positive, d'aire totale $1$ sur $I$. Alors $P(c \\leqslant X \\leqslant d) = \\displaystyle\\int_c^d f(x)\\,\\mathrm{d}x$, et $P(X = c) = 0$ : avec une densité, $<$ ou $\\leqslant$, c'est pareil."
      },
      {
        titre: "Répartition et espérance",
        texte:
          "Pour une densité $f$ sur $[a\\,;b]$ :\n" +
          "- $F(x) = P(X \\leqslant x) = \\displaystyle\\int_a^x f(t)\\,\\mathrm{d}t$, donc $F' = f$ ;\n" +
          "- $E(X) = \\displaystyle\\int_a^b xf(x)\\,\\mathrm{d}x$."
      },
      {
        titre: "Loi uniforme sur $[a\\,;b]$",
        texte: "Sa densité est constante, égale à $\\dfrac{1}{b - a}$. Alors $P(c \\leqslant X \\leqslant d) = \\dfrac{d - c}{b - a}$ (longueur favorable sur longueur totale) et $E(X) = \\dfrac{a + b}{2}$."
      },
      {
        titre: "Loi exponentielle",
        texte:
          "Sa densité est $t \\mapsto \\lambda e^{-\\lambda t}$ sur $[0\\,;+\\infty[$, avec $\\lambda > 0$ :\n" +
          "- $P(X \\leqslant t) = 1 - e^{-\\lambda t}$ et $P(X > t) = e^{-\\lambda t}$ ;\n" +
          "- $E(X) = \\dfrac{1}{\\lambda}$."
      },
      {
        titre: "Absence de mémoire",
        texte: "Pour une loi exponentielle, $P_{X > s}(X > s + t) = P(X > t)$ : avoir déjà attendu $s$ ne change rien à l'attente qui reste."
      }
    ],
    pieges: [
      "Croire qu'une densité est une probabilité : c'est l'aire sous la densité qui en est une.",
      "Penser qu'une densité ne peut pas dépasser $1$.",
      "Confondre $P(X > t) = e^{-\\lambda t}$ et $P(X \\leqslant t) = 1 - e^{-\\lambda t}$.",
      "Écrire $E(X) = \\lambda$ au lieu de $E(X) = \\dfrac{1}{\\lambda}$.",
      "Intégrer $f(x)$ au lieu de $xf(x)$ pour une espérance."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le temps de réponse",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans un jeu de calcul mental, on a $3$ secondes pour répondre. Le temps de réponse $X$ d'un élève, en secondes, est une variable aléatoire de densité $f(x) = kx(3 - x)$ sur $[0\\,;3]$, où $k$ est un réel strictement positif.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Démontre que $k = \\dfrac{2}{9}$.",
            indice: "L'aire totale sous une densité vaut $1$ : calcule $\\displaystyle\\int_0^3 x(3 - x)\\,\\mathrm{d}x$.",
            corrige: "$\\displaystyle\\int_0^3 (3x - x^2)\\,\\mathrm{d}x = \\left[\\dfrac{3x^2}{2} - \\dfrac{x^3}{3}\\right]_0^3 = \\dfrac{27}{2} - 9 = \\dfrac{9}{2}$.\n\nL'aire totale vaut $1$ : $k \\times \\dfrac{9}{2} = 1$, donc $k = \\dfrac{2}{9}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule la probabilité qu'un élève réponde en moins d'une seconde. Donne-la sous forme de fraction.",
            indice: "$P(X \\leqslant 1) = \\displaystyle\\int_0^1 \\dfrac{2}{9}(3x - x^2)\\,\\mathrm{d}x$.",
            corrige: "$P(X \\leqslant 1) = \\dfrac{2}{9}\\left[\\dfrac{3x^2}{2} - \\dfrac{x^3}{3}\\right]_0^1 = \\dfrac{2}{9}\\left(\\dfrac{3}{2} - \\dfrac{1}{3}\\right) = \\dfrac{2}{9} \\times \\dfrac{7}{6} = \\dfrac{7}{27}$, soit environ $0{,}26$.",
            figureCorrige: (o) => o.graph({
              xmin: -0.3, xmax: 3.3, ymin: 0, ymax: 0.6, xstep: 0.5, xetiq: 1, ystep: 0.1, yetiq: 0.2, h: 200, padL: 28,
              aires: [{ f: (x) => (2 / 9) * x * (3 - x), a: 0, b: 1 }],
              curves: [{ f: (x) => (2 / 9) * x * (3 - x), a: 0, b: 3, label: "f", lx: 2.3, dx: 14, dy: -4 }],
              aria: "Courbe de la densité f, en forme d'arche de 0 à 3, de sommet 0,5 en x = 1,5 ; l'aire sous la courbe entre 0 et 1, égale à 7/27, est coloriée"
            })
          },
          {
            n: "3.", points: 1.5,
            texte: "Détermine la fonction de répartition $F$ de $X$ sur $[0\\,;3]$. Vérifie que $F(1{,}5) = 0{,}5$ et interprète.",
            indice: "$F(x) = \\displaystyle\\int_0^x f(t)\\,\\mathrm{d}t$, avec la primitive de la question 2.",
            corrige: "$F(x) = \\dfrac{2}{9}\\left(\\dfrac{3x^2}{2} - \\dfrac{x^3}{3}\\right) = \\dfrac{x^2}{3} - \\dfrac{2x^3}{27}$.\n\n$F(1{,}5) = \\dfrac{2{,}25}{3} - \\dfrac{2 \\times 3{,}375}{27} = 0{,}75 - 0{,}25 = 0{,}5$ : la moitié des élèves répondent en moins de $1{,}5$ seconde."
          },
          {
            n: "4.", points: 1.5,
            texte: "Calcule $E(X)$. Ce résultat était-il prévisible ?",
            indice: "$E(X) = \\displaystyle\\int_0^3 xf(x)\\,\\mathrm{d}x = \\dfrac{2}{9}\\displaystyle\\int_0^3 (3x^2 - x^3)\\,\\mathrm{d}x$.",
            corrige: "$E(X) = \\dfrac{2}{9}\\left[x^3 - \\dfrac{x^4}{4}\\right]_0^3 = \\dfrac{2}{9}\\left(27 - \\dfrac{81}{4}\\right) = \\dfrac{2}{9} \\times \\dfrac{27}{4} = \\dfrac{3}{2}$ : le temps de réponse moyen est $1{,}5$ seconde.\n\nC'était prévisible : la courbe de $f$ est une parabole symétrique par rapport à la droite $x = 1{,}5$."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « Comme $f(1{,}5) = 0{,}5$, un élève répond en exactement $1{,}5$ seconde avec la probabilité $0{,}5$. » Justifie.",
            indice: "Que vaut l'aire sous la courbe entre $1{,}5$ et $1{,}5$ ?",
            corrige: "**Faux.** $P(X = 1{,}5) = \\displaystyle\\int_{1{,}5}^{1{,}5} f(x)\\,\\mathrm{d}x = 0$. La valeur $f(1{,}5)$ d'une densité n'est pas une probabilité : seules les aires sous sa courbe en sont."
          }
        ]
      },
      {
        titre: "Attendre un taxi",
        duree: 25, points: 7, calculatrice: true,
        contexte: "À un arrêt de taxis collectifs, le temps d'attente $T$, en minutes, avant le passage d'un taxi suit la loi exponentielle de paramètre $\\lambda = 0{,}2$ : sa densité est $f(t) = 0{,}2e^{-0{,}2t}$ sur $[0\\,;+\\infty[$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $\\displaystyle\\int_0^x 0{,}2e^{-0{,}2t}\\,\\mathrm{d}t$ pour $x \\geqslant 0$, puis sa limite quand $x$ tend vers $+\\infty$. Que vérifie-t-on ainsi ?",
            indice: "Une primitive de $0{,}2e^{-0{,}2t}$ est $-e^{-0{,}2t}$.",
            corrige: "$\\displaystyle\\int_0^x 0{,}2e^{-0{,}2t}\\,\\mathrm{d}t = \\big[-e^{-0{,}2t}\\big]_0^x = 1 - e^{-0{,}2x}$, qui tend vers $1$ quand $x \\to +\\infty$, car $e^{-0{,}2x} \\to 0$.\n\nL'aire totale sous la courbe de $f$ vaut $1$ : $f$, continue et positive, est bien une densité."
          },
          {
            n: "2.", points: 1,
            texte: "Quel est le temps d'attente moyen ? Calcule $P(T \\leqslant 5)$.",
            indice: "$E(T) = \\dfrac{1}{\\lambda}$ et $P(T \\leqslant t) = 1 - e^{-\\lambda t}$.",
            corrige: "$E(T) = \\dfrac{1}{0{,}2} = 5$ minutes. $P(T \\leqslant 5) = 1 - e^{-1} \\approx 0{,}632$ : on attend moins que la moyenne dans environ $63\\,\\%$ des cas."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule $P(T > 10)$, puis $P(2 \\leqslant T \\leqslant 6)$.",
            indice: "$P(T > t) = e^{-\\lambda t}$ et $P(2 \\leqslant T \\leqslant 6) = P(T > 2) - P(T > 6)$.",
            corrige: "$P(T > 10) = e^{-2} \\approx 0{,}135$.\n\n$P(2 \\leqslant T \\leqslant 6) = e^{-0{,}4} - e^{-1{,}2} \\approx 0{,}670 - 0{,}301 = 0{,}369$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Fatima attend depuis $10$ minutes. Elle se dit : « Le taxi ne va plus tarder. » Calcule la probabilité qu'elle attende encore au moins $5$ minutes. Commente.",
            indice: "Calcule $P_{T > 10}(T > 15)$, avec l'absence de mémoire.",
            corrige: "Par absence de mémoire, $P_{T > 10}(T > 15) = P(T > 5) = e^{-1} \\approx 0{,}368$ : c'est la même probabilité que si elle venait d'arriver. Ses $10$ minutes d'attente ne rendent pas le taxi plus proche."
          },
          {
            n: "5.", points: 1.5,
            texte: "Détermine le temps $t$ tel que $P(T \\leqslant t) = 0{,}95$. Interprète.",
            indice: "Résous $1 - e^{-0{,}2t} = 0{,}95$ avec $\\ln$.",
            corrige: "$1 - e^{-0{,}2t} = 0{,}95 \\iff e^{-0{,}2t} = 0{,}05 \\iff -0{,}2t = \\ln 0{,}05 \\iff t = -5\\ln 0{,}05 = 5\\ln 20$.\n\nComme $5\\ln 20 \\approx 15$, un taxi passe en moins de $15$ minutes environ $19$ fois sur $20$."
          }
        ]
      },
      {
        titre: "Le bus de ramassage",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Le bus de ramassage scolaire passe à un arrêt à un instant aléatoire entre 6 h 40 et 7 h 00. On note $X$ l'instant de passage, en minutes après 6 h 40 : on admet que $X$ suit la loi uniforme sur $[0\\,;20]$. Anli arrive à l'arrêt à 6 h 45.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Donne la densité de $X$. Calcule la probabilité qu'Anli ait raté le bus, puis celle que le bus passe entre 6 h 45 et 6 h 52.",
            indice: "Pour une loi uniforme, une probabilité est une longueur favorable divisée par la longueur totale.",
            corrige: "La densité est constante, égale à $\\dfrac{1}{20}$ sur $[0\\,;20]$. Anli a raté le bus si $X < 5$ : $P(X < 5) = \\dfrac{5}{20} = 0{,}25$.\n\n$P(5 \\leqslant X \\leqslant 12) = \\dfrac{12 - 5}{20} = 0{,}35$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $E(X)$ avec une intégrale. À quelle heure le bus passe-t-il en moyenne ?",
            indice: "$E(X) = \\displaystyle\\int_0^{20} x \\times \\dfrac{1}{20}\\,\\mathrm{d}x$.",
            corrige: "$E(X) = \\displaystyle\\int_0^{20} \\dfrac{x}{20}\\,\\mathrm{d}x = \\left[\\dfrac{x^2}{40}\\right]_0^{20} = \\dfrac{400}{40} = 10$ : le bus passe en moyenne à 6 h 50."
          },
          {
            n: "3.", points: 1.5,
            texte: "À quelle heure Anli doit-il arriver, au plus tard, pour avoir au moins $90\\,\\%$ de chances d'attraper le bus ?",
            indice: "S'il arrive $a$ minutes après 6 h 40, il attrape le bus si $X \\geqslant a$. Résous $P(X \\geqslant a) \\geqslant 0{,}9$.",
            corrige: "En arrivant $a$ minutes après 6 h 40, avec $0 \\leqslant a \\leqslant 20$ : $P(X \\geqslant a) = \\dfrac{20 - a}{20} \\geqslant 0{,}9 \\iff 20 - a \\geqslant 18 \\iff a \\leqslant 2$. Il doit arriver au plus tard à 6 h 42."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Qu'estime ce programme ? Donne une valeur approchée du nombre affiché, en justifiant.\n\n" +
              "```python\nfrom random import random\n\ns = 0\nn = 0\nfor i in range(10000):\n    x = 20 * random()\n    if x >= 5:\n        s = s + (x - 5)\n        n = n + 1\nprint(s / n)\n```",
            indice: "$\\texttt{20 * random()}$ simule $X$. Que représente $\\texttt{x - 5}$ pour Anli quand $\\texttt{x >= 5}$ ?",
            corrige: "$\\texttt{20 * random()}$ suit la loi uniforme sur $[0\\,;20]$ : le programme simule $10\\,000$ passages du bus. Il garde les cas où Anli attrape le bus ($x \\geqslant 5$), et calcule la moyenne de son attente $x - 5$.\n\nDans ces cas, le passage est équiréparti entre $5$ et $20$, donc l'attente est équirépartie entre $0$ et $15$ minutes, de moyenne $7{,}5$. Le programme affiche un nombre proche de $7{,}5$ : quand Anli attrape le bus, il attend en moyenne $7$ min $30$ s."
          }
        ]
      }
    ]
  }
};
