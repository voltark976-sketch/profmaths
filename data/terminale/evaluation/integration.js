/*
  ENTRAÎNEMENT : Terminale maths complémentaires — chapitre 12, Intégration
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-integration.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths complémentaires.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-integration"] = {
  revisions: {
    intro: "L'intégration en un coup d'œil : l'intégrale comme aire, le calcul avec une primitive, Chasles et la linéarité, le signe, l'aire entre deux courbes et la valeur moyenne. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Intégrale et aire",
        texte: "Si $f$ est continue et positive sur $[a\\,;b]$, $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$ est l'aire, en unités d'aire, du domaine compris entre la courbe, l'axe des abscisses et les droites $x = a$ et $x = b$."
      },
      {
        titre: "Avec une primitive",
        texte: "Si $F$ est une primitive de $f$ : $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x = F(b) - F(a)$, noté $\\big[F(x)\\big]_a^b$. Par exemple $\\displaystyle\\int_0^2 3x^2\\,\\mathrm{d}x = 2^3 - 0^3 = 8$."
      },
      {
        titre: "Propriétés",
        texte:
          "- Chasles : $\\displaystyle\\int_a^b f = \\displaystyle\\int_a^c f + \\int_c^b f$ ;\n" +
          "- linéarité : $\\displaystyle\\int_a^b (kf + g) = \\displaystyle k\\int_a^b f + \\int_a^b g$ ;\n" +
          "- là où $f \\leqslant 0$, l'aire compte négativement."
      },
      {
        titre: "Aire entre deux courbes",
        texte: "Si $f \\geqslant g$ sur $[a\\,;b]$, l'aire entre les deux courbes est $\\displaystyle\\int_a^b \\big(f(x) - g(x)\\big)\\,\\mathrm{d}x$ : la courbe du dessus moins celle du dessous."
      },
      {
        titre: "Valeur moyenne",
        texte: "$\\mu = \\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$ : le rectangle de base $b - a$ et de hauteur $\\mu$ a la même aire que le domaine sous la courbe."
      }
    ],
    pieges: [
      "Calculer $F(a) - F(b)$ au lieu de $F(b) - F(a)$.",
      "Oublier de diviser par $b - a$ pour une valeur moyenne.",
      "Confondre intégrale et aire quand la fonction est négative.",
      "Faire « dessous moins dessus » pour une aire entre deux courbes.",
      "Dériver au lieu de chercher une primitive."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Calculer des intégrales",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $I = \\displaystyle\\int_{-1}^{2} (3x^2 - 2x + 1)\\,\\mathrm{d}x$.",
            indice: "Cherche une primitive $F$, puis calcule $F(2) - F(-1)$.",
            corrige: "Une primitive est $F(x) = x^3 - x^2 + x$. Donc $I = F(2) - F(-1) = (8 - 4 + 2) - (-1 - 1 - 1) = 6 + 3 = 9$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $J = \\displaystyle\\int_0^{\\ln 3} e^x\\,\\mathrm{d}x$ et $K = \\displaystyle\\int_1^4 \\dfrac{1}{x^2}\\,\\mathrm{d}x$.",
            indice: "$e^x$ est sa propre primitive, et $\\dfrac{1}{x^2}$ a pour primitive $-\\dfrac{1}{x}$.",
            corrige: "$J = \\big[e^x\\big]_0^{\\ln 3} = e^{\\ln 3} - e^0 = 3 - 1 = 2$.\n\n$K = \\left[-\\dfrac{1}{x}\\right]_1^4 = -\\dfrac{1}{4} + 1 = \\dfrac{3}{4}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule $L = \\displaystyle\\int_0^4 (x - 3)\\,\\mathrm{d}x$. Explique avec une figure pourquoi ce n'est pas une aire.",
            indice: "Trace la droite $y = x - 3$ : où est-elle sous l'axe des abscisses ?",
            corrige: "$L = \\left[\\dfrac{x^2}{2} - 3x\\right]_0^4 = 8 - 12 = -4$.\n\nSur $[0\\,;3]$, la droite $y = x - 3$ est sous l'axe des abscisses : le triangle d'aire $\\dfrac{3 \\times 3}{2} = 4{,}5$ compte négativement. Sur $[3\\,;4]$, elle est au-dessus : le triangle d'aire $\\dfrac{1 \\times 1}{2} = 0{,}5$ compte positivement. On retrouve $-4{,}5 + 0{,}5 = -4$.",
            figureCorrige: (o) => o.graph({
              xmin: -0.6, xmax: 4.6, ymin: -3.4, ymax: 1.6, h: 220,
              aires: [{ f: (x) => x - 3, a: 0, b: 3, neg: true }, { f: (x) => x - 3, a: 3, b: 4 }],
              curves: [{ f: (x) => x - 3, a: -0.4, b: 4.4, label: "y = x − 3", lx: 3.3, dx: -6, dy: -23 }],
              aria: "La droite y = x − 3 : un triangle sous l'axe des abscisses entre 0 et 3, d'aire 4,5, et un petit triangle au-dessus entre 3 et 4, d'aire 0,5"
            })
          },
          {
            n: "4.", points: 1,
            texte: "Une fonction $f$ continue sur $[0\\,;5]$ vérifie $\\int_0^2 f(x)\\,\\mathrm{d}x = 5$ et $\\int_0^5 f(x)\\,\\mathrm{d}x = 3$. Calcule $\\int_2^5 f(x)\\,\\mathrm{d}x$, puis $\\int_0^2 \\big(2f(x) + 1\\big)\\,\\mathrm{d}x$.",
            indice: "Chasles pour la première, linéarité pour la seconde.",
            corrige: "Par Chasles : $\\displaystyle\\int_2^5 f(x)\\,\\mathrm{d}x = \\displaystyle\\int_0^5 f(x)\\,\\mathrm{d}x - \\int_0^2 f(x)\\,\\mathrm{d}x = 3 - 5 = -2$.\n\nPar linéarité : $\\displaystyle\\int_0^2 \\big(2f(x) + 1\\big)\\,\\mathrm{d}x = \\displaystyle 2 \\times 5 + \\int_0^2 1\\,\\mathrm{d}x = 10 + 2 = 12$."
          },
          {
            n: "5.", points: 1.5,
            texte: "Montre que $x \\geqslant x^3$ sur $[0\\,;1]$, puis calcule l'aire du domaine compris entre les courbes de $x \\mapsto x$ et de $x \\mapsto x^3$ sur cet intervalle.",
            indice: "Factorise $x - x^3 = x(1 - x)(1 + x)$. Puis l'aire est $\\displaystyle\\int_0^1 (x - x^3)\\,\\mathrm{d}x$.",
            corrige: "$x - x^3 = x(1 - x^2) = x(1 - x)(1 + x)$, et les trois facteurs sont positifs sur $[0\\,;1]$ : $x \\geqslant x^3$.\n\nL'aire vaut $\\displaystyle\\int_0^1 (x - x^3)\\,\\mathrm{d}x = \\left[\\dfrac{x^2}{2} - \\dfrac{x^4}{4}\\right]_0^1 = \\dfrac{1}{2} - \\dfrac{1}{4} = \\dfrac{1}{4}$ u.a."
          }
        ]
      },
      {
        titre: "Un panneau solaire",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Un panneau solaire est installé sur le toit du lycée. Par une journée ensoleillée, sa puissance, en kilowatts (kW), $t$ heures après minuit, est modélisée par $P(t) = -0{,}1(t - 6)(t - 18)$ pour $t \\in [6\\,;18]$. L'énergie produite entre les instants $a$ et $b$, en kilowattheures (kWh), est $\\displaystyle\\int_a^b P(t)\\,\\mathrm{d}t$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $P(6)$, $P(12)$ et $P(18)$. Justifie que $P(t) \\geqslant 0$ sur $[6\\,;18]$.",
            indice: "Sur $[6\\,;18]$, quel est le signe de $t - 6$ ? Et celui de $t - 18$ ?",
            corrige: "$P(6) = P(18) = 0$ et $P(12) = -0{,}1 \\times 6 \\times (-6) = 3{,}6$ kW.\n\nSur $[6\\,;18]$, $t - 6 \\geqslant 0$ et $t - 18 \\leqslant 0$ : leur produit est négatif ou nul, donc $P(t) \\geqslant 0$."
          },
          {
            n: "2.", points: 2,
            texte: "Développe $P(t)$, puis démontre que l'énergie produite dans la journée vaut $28{,}8$ kWh.",
            indice: "$P(t) = -0{,}1t^2 + 2{,}4t - 10{,}8$. Cherche une primitive $F$, puis calcule $F(18) - F(6)$.",
            corrige: "$P(t) = -0{,}1(t^2 - 24t + 108) = -0{,}1t^2 + 2{,}4t - 10{,}8$. Une primitive est $F(t) = -\\dfrac{0{,}1}{3}t^3 + 1{,}2t^2 - 10{,}8t$.\n\n$F(18) = -194{,}4 + 388{,}8 - 194{,}4 = 0$ et $F(6) = -7{,}2 + 43{,}2 - 64{,}8 = -28{,}8$. Donc l'énergie vaut $F(18) - F(6) = 28{,}8$ kWh."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule la puissance moyenne du panneau entre $6$ h et $18$ h. Interprète-la avec un rectangle.",
            indice: "$\\mu = \\dfrac{1}{18 - 6}\\displaystyle\\int_6^{18} P(t)\\,\\mathrm{d}t$.",
            corrige: "$\\mu = \\dfrac{28{,}8}{18 - 6} = 2{,}4$ kW. Un panneau qui fournirait $2{,}4$ kW sans varier pendant $12$ heures produirait la même énergie : le rectangle de base $12$ et de hauteur $2{,}4$ a la même aire que le domaine sous la courbe."
          },
          {
            n: "4.", points: 1.5,
            texte: "Quelle part de l'énergie de la journée est produite entre $9$ h et $15$ h ?",
            indice: "Calcule $F(15) - F(9)$ avec la primitive de la question 2.",
            corrige: "$F(15) = -112{,}5 + 270 - 162 = -4{,}5$ et $F(9) = -24{,}3 + 97{,}2 - 97{,}2 = -24{,}3$. Donc $\\displaystyle\\int_9^{15} P(t)\\,\\mathrm{d}t = -4{,}5 + 24{,}3 = 19{,}8$ kWh.\n\nCela fait $\\dfrac{19{,}8}{28{,}8} = 0{,}6875$ : environ $69\\,\\%$ de l'énergie est produite pendant ces $6$ heures."
          },
          {
            n: "5.", points: 1,
            texte:
              "Le compteur relève la puissance à chaque heure pile, de $6$ h à $17$ h, et estime l'énergie avec ce programme. Qu'affiche-t-il ? Quelle méthode reconnais-tu ?\n\n" +
              "```python\ndef P(t):\n    return -0.1*(t-6)*(t-18)\n\ns = 0\nfor t in range(6, 18):\n    s = s + P(t)\nprint(s)\n```",
            indice: "$\\texttt{range(6, 18)}$ donne $t = 6, 7, \\dots, 17$. Chaque terme $P(t)$ est l'aire d'un rectangle de largeur $1$ h.",
            corrige: "Il calcule $P(6) + P(7) + \\dots + P(17)$ : la somme des aires de $12$ rectangles de largeur $1$ h, c'est la méthode des rectangles (à gauche). Il affiche $\\texttt{28.6}$, proche de la valeur exacte $28{,}8$ kWh."
          }
        ]
      },
      {
        titre: "Une aire infinie ?",
        duree: 20, points: 6, calculatrice: true,
        contexte: "On considère la fonction $f$ définie sur $[0\\,;+\\infty[$ par $f(x) = 2e^{-0{,}5x}$. Pour $x \\geqslant 0$, on note $A(x) = \\displaystyle\\int_0^x f(t)\\,\\mathrm{d}t$ l'aire du domaine sous la courbe, entre $0$ et $x$ (colorié ci-dessous pour $x = 3$).",
        figure: (o) => o.graph({
          xmin: -0.6, xmax: 10.6, ymin: 0, ymax: 2.4, xstep: 1, ystep: 0.5, yetiq: 1, h: 200,
          aires: [{ f: (x) => 2 * Math.exp(-0.5 * x), a: 0, b: 3 }],
          curves: [{ f: (x) => 2 * Math.exp(-0.5 * x), a: 0, b: 10, label: "f", lx: 6, dy: -6 }],
          aria: "Courbe de f, qui part de 2 en x = 0 et se rapproche de l'axe des abscisses ; le domaine sous la courbe entre 0 et 3 est colorié"
        }),
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $A(x)$ en fonction de $x$.",
            indice: "Une primitive de $e^{-0{,}5t}$ est $-2e^{-0{,}5t}$.",
            corrige: "Une primitive de $f$ est $F(t) = -4e^{-0{,}5t}$, car $\\left(-4e^{-0{,}5t}\\right)' = 2e^{-0{,}5t}$. Donc $A(x) = F(x) - F(0) = -4e^{-0{,}5x} + 4 = 4 - 4e^{-0{,}5x}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Détermine la limite de $A(x)$ quand $x$ tend vers $+\\infty$. Qu'a de surprenant ce résultat ?",
            indice: "Quand $x \\to +\\infty$, $-0{,}5x \\to -\\infty$, donc $e^{-0{,}5x} \\to 0$.",
            corrige: "$e^{-0{,}5x} \\to 0$, donc $A(x) \\to 4$. Le domaine sous la courbe, de $0$ à $+\\infty$, est infiniment long, et pourtant son aire est finie : elle ne dépasse jamais $4$ u.a."
          },
          {
            n: "3.", points: 1.5,
            texte: "À partir de quelle valeur de $x$ l'aire $A(x)$ dépasse-t-elle $3{,}9$ u.a. ?",
            indice: "Résous $4 - 4e^{-0{,}5x} \\geqslant 3{,}9$, puis applique $\\ln$.",
            corrige: "$A(x) \\geqslant 3{,}9 \\iff 4e^{-0{,}5x} \\leqslant 0{,}1 \\iff e^{-0{,}5x} \\leqslant 0{,}025 \\iff -0{,}5x \\leqslant \\ln 0{,}025 \\iff x \\geqslant -2\\ln 0{,}025$.\n\nOr $-2\\ln 0{,}025 = 2\\ln 40 \\approx 7{,}38$ : l'aire dépasse $3{,}9$ u.a. dès que $x \\geqslant 7{,}38$ environ."
          },
          {
            n: "4.", points: 1.5,
            texte: "On remplace $f$ par $g(x) = \\dfrac{2}{x}$, et on pose $B(x) = \\displaystyle\\int_1^x g(t)\\,\\mathrm{d}t$ pour $x \\geqslant 1$. Calcule $B(x)$ et sa limite en $+\\infty$. Compare avec $A$.",
            indice: "Une primitive de $\\dfrac{2}{t}$ sur $[1\\,;+\\infty[$ est $2\\ln t$.",
            corrige: "$B(x) = \\big[2\\ln t\\big]_1^x = 2\\ln x$, et $2\\ln x \\to +\\infty$ quand $x \\to +\\infty$.\n\nLes deux courbes se rapprochent de l'axe des abscisses, mais pas à la même vitesse : sous la courbe de $g$, l'aire grandit sans limite, alors que sous celle de $f$, elle reste inférieure à $4$ u.a."
          }
        ]
      }
    ]
  }
};
