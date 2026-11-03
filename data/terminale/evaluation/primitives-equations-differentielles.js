/*
  ENTRAÎNEMENT : Terminale maths complémentaires — chapitre 11, Primitives et équations différentielles
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-primitives-ed.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths complémentaires.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-primitives-ed"] = {
  revisions: {
    intro: "Les primitives et les équations différentielles en un coup d'œil : primitives usuelles et formes composées, condition initiale, équations $y' = ay$ et $y' = ay + b$, modélisation. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Primitive",
        texte: "$F$ est une primitive de $f$ sur $I$ si $F' = f$ sur $I$. Deux primitives de $f$ diffèrent d'une constante : ce sont les fonctions $F + C$. Le signe de $f$ donne les variations de ses primitives."
      },
      {
        titre: "Primitives usuelles",
        texte:
          "- $x^n$ a pour primitive $\\dfrac{x^{n+1}}{n+1}$ ($n$ entier, $n \\neq -1$) ;\n" +
          "- $\\dfrac{1}{x^2}$ a pour primitive $-\\dfrac{1}{x}$ sur $]0\\,;+\\infty[$ ;\n" +
          "- $\\dfrac{1}{x}$ a pour primitive $\\ln x$ sur $]0\\,;+\\infty[$ ;\n" +
          "- $e^{ax}$ a pour primitive $\\dfrac{1}{a}e^{ax}$, pour $a \\neq 0$."
      },
      {
        titre: "Formes composées",
        texte:
          "- $2u'u$ a pour primitive $u^2$ ;\n" +
          "- $u'e^u$ a pour primitive $e^u$ ;\n" +
          "- $\\dfrac{u'}{u}$ a pour primitive $\\ln u$, quand $u > 0$."
      },
      {
        titre: "$y' = ay$ et $y' = ay + b$",
        texte:
          "- $y' = ay$ : $y(x) = Ce^{ax}$, $C$ réel ;\n" +
          "- $y' = ay + b$, avec $a \\neq 0$ : $y(x) = Ce^{ax} - \\dfrac{b}{a}$, où $-\\dfrac{b}{a}$ est la solution constante.\n\n" +
          "Une condition initiale $y(x_0) = y_0$ fixe la constante $C$."
      },
      {
        titre: "Modéliser",
        texte: "Une quantité qui diminue proportionnellement à elle-même vérifie $Q' = -kQ$ : $Q(t) = Q_0e^{-kt}$, de demi-vie $\\dfrac{\\ln 2}{k}$. Avec un apport constant $b$, $Q' = -kQ + b$ : $Q$ se rapproche de l'équilibre $\\dfrac{b}{k}$."
      }
    ],
    pieges: [
      "Oublier que les primitives sont définies à une constante près.",
      "Prendre $2e^{2x}$ pour une primitive de $e^{2x}$ : c'est sa dérivée ; une primitive est $\\dfrac{1}{2}e^{2x}$.",
      "Utiliser $\\ln x$ comme primitive de $\\dfrac{1}{x}$ quand $x < 0$.",
      "Se tromper de signe dans la solution constante de $y' = ay + b$ : c'est $-\\dfrac{b}{a}$.",
      "Écrire $y(0) = C$ pour $y' = ay + b$ au lieu de $y(0) = C - \\dfrac{b}{a}$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Calculer des primitives",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine une primitive de chacune des fonctions $f_1(x) = 4x^3 - 6x + 1$ sur $\\mathbb{R}$, $f_2(x) = \\dfrac{3}{x^2}$ sur $]0\\,;+\\infty[$ et $f_3(x) = e^{-2x}$ sur $\\mathbb{R}$.",
            indice: "Lis le tableau des dérivées à l'envers. Pour $f_3$, dérive $e^{-2x}$ et ajuste le coefficient.",
            corrige: "$F_1(x) = x^4 - 3x^2 + x$.\n\n$F_2(x) = -\\dfrac{3}{x}$, car $\\left(-\\dfrac{1}{x}\\right)' = \\dfrac{1}{x^2}$.\n\n$F_3(x) = -\\dfrac{1}{2}e^{-2x}$, car $\\left(e^{-2x}\\right)' = -2e^{-2x}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Même question, sur $\\mathbb{R}$, avec $g_1(x) = (2x - 3)e^{x^2 - 3x}$, $g_2(x) = \\dfrac{2x - 1}{x^2 - x + 3}$ et $g_3(x) = 4x(x^2 + 5)$.",
            indice: "Reconnais les formes $u'e^u$, $\\dfrac{u'}{u}$ (avec $u > 0$) et $2u'u$.",
            corrige: "$g_1 = u'e^u$ avec $u(x) = x^2 - 3x$ : $G_1(x) = e^{x^2 - 3x}$.\n\n$g_2 = \\dfrac{u'}{u}$ avec $u(x) = x^2 - x + 3$, qui est strictement positif car son discriminant $1 - 12$ est négatif : $G_2(x) = \\ln(x^2 - x + 3)$.\n\n$g_3 = 2u'u$ avec $u(x) = x^2 + 5$ : $G_3(x) = (x^2 + 5)^2$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Détermine la primitive $F$ de $f(x) = 3x^2 + 2x - 1$ sur $\\mathbb{R}$ telle que $F(2) = 3$.",
            indice: "Écris toutes les primitives $x^3 + x^2 - x + C$, puis traduis $F(2) = 3$.",
            corrige: "Les primitives de $f$ sont les fonctions $x \\mapsto x^3 + x^2 - x + C$. Or $F(2) = 8 + 4 - 2 + C = 10 + C$, et $10 + C = 3$ donne $C = -7$ : $F(x) = x^3 + x^2 - x - 7$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Vérifie que $H(x) = xe^x$ est une primitive de $h(x) = (x + 1)e^x$ sur $\\mathbb{R}$. Déduis-en la primitive de $h$ qui s'annule en $1$.",
            indice: "Dérive $H$ comme un produit : $(uv)' = u'v + uv'$.",
            corrige: "$H'(x) = 1 \\times e^x + x \\times e^x = (x + 1)e^x = h(x)$ : $H$ est une primitive de $h$.\n\nLes primitives de $h$ sont les fonctions $x \\mapsto xe^x + C$. Celle qui s'annule en $1$ vérifie $e + C = 0$ : c'est $K(x) = xe^x - e$."
          },
          {
            n: "5.", points: 1,
            texte: "Sans calculer de primitive, donne le sens de variation des primitives de $h$ sur $\\mathbb{R}$.",
            indice: "La dérivée d'une primitive de $h$, c'est $h$. Étudie le signe de $h(x)$.",
            corrige: "Une primitive de $h$ a pour dérivée $h(x) = (x + 1)e^x$, qui a le signe de $x + 1$ car $e^x > 0$. Toutes les primitives de $h$ sont donc décroissantes sur $]-\\infty\\,;-1]$ et croissantes sur $[-1\\,;+\\infty[$."
          }
        ]
      },
      {
        titre: "Saut en parachute",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Avant l'ouverture de son parachute, la vitesse d'une parachutiste, en m/s, $t$ secondes après le saut, est modélisée par une fonction $v$ telle que $v(0) = 0$ et $v' = -0{,}2v + 10$. Le terme $10$ vient de la pesanteur, et le terme $-0{,}2v$ du frottement de l'air.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Détermine la solution constante de l'équation $y' = -0{,}2y + 10$. Que représente-t-elle pour la parachutiste ?",
            indice: "Une fonction constante a une dérivée nulle : résous $0 = -0{,}2y + 10$.",
            corrige: "Une solution constante vérifie $0 = -0{,}2y + 10$, soit $y = 50$. À $50$ m/s, le frottement de l'air compense exactement la pesanteur : la vitesse ne change plus."
          },
          {
            n: "2.", points: 2,
            texte: "Résous l'équation $y' = -0{,}2y + 10$, puis démontre que $v(t) = 50 - 50e^{-0{,}2t}$.",
            indice: "Les solutions de $y' = ay + b$ sont les fonctions $Ce^{at} - \\dfrac{b}{a}$. Puis utilise $v(0) = 0$.",
            corrige: "Avec $a = -0{,}2$ et $b = 10$ : $-\\dfrac{b}{a} = 50$, et les solutions sont les fonctions $t \\mapsto Ce^{-0{,}2t} + 50$, $C$ réel.\n\n$v(0) = C + 50 = 0$ donne $C = -50$ : $v(t) = 50 - 50e^{-0{,}2t}$."
          },
          {
            n: "3.", points: 1,
            texte: "Étudie le sens de variation de $v$ et sa limite en $+\\infty$. Convertis cette limite en km/h.",
            indice: "$v'(t) = 10e^{-0{,}2t}$, et $e^{-0{,}2t} \\to 0$ quand $t \\to +\\infty$.",
            corrige: "$v'(t) = 10e^{-0{,}2t} > 0$ : $v$ est strictement croissante. Quand $t \\to +\\infty$, $e^{-0{,}2t} \\to 0$, donc $v(t) \\to 50$ : la vitesse se rapproche de $50$ m/s, soit $50 \\times 3{,}6 = 180$ km/h, sans l'atteindre."
          },
          {
            n: "4.", points: 1.5,
            texte: "Au bout de combien de secondes la parachutiste atteint-elle $45$ m/s ?",
            indice: "Résous $50 - 50e^{-0{,}2t} \\geqslant 45$, puis applique $\\ln$.",
            corrige: "$v(t) \\geqslant 45 \\iff 50e^{-0{,}2t} \\leqslant 5 \\iff e^{-0{,}2t} \\leqslant 0{,}1 \\iff -0{,}2t \\leqslant \\ln 0{,}1 \\iff t \\geqslant 5\\ln 10$, car $-5\\ln 0{,}1 = 5\\ln 10$.\n\nComme $5\\ln 10 \\approx 11{,}5$, elle atteint $45$ m/s au bout d'environ $11{,}5$ s."
          },
          {
            n: "5.", points: 1.5,
            texte: "La distance parcourue, en mètres, est la primitive $D$ de $v$ telle que $D(0) = 0$. Détermine $D(t)$, puis la distance parcourue pendant les $20$ premières secondes, au mètre près.",
            indice: "Une primitive de $e^{-0{,}2t}$ est $-5e^{-0{,}2t}$.",
            corrige: "Une primitive de $v$ est $t \\mapsto 50t + 250e^{-0{,}2t}$, car $\\left(250e^{-0{,}2t}\\right)' = -50e^{-0{,}2t}$. Donc $D(t) = 50t + 250e^{-0{,}2t} + C$, et $D(0) = 250 + C = 0$ donne $C = -250$ : $D(t) = 50t + 250e^{-0{,}2t} - 250$.\n\nPuis $D(20) = 1\\,000 + 250e^{-4} - 250 \\approx 755$ m."
          }
        ]
      },
      {
        titre: "Dater au carbone 14",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Dans un être vivant, la proportion de carbone 14 reste constante. Après sa mort, le carbone 14 se désintègre : la proportion $p(t)$ qui reste, $t$ années après la mort, vérifie $p' = -\\lambda p$ et $p(0) = 1$, avec $\\lambda > 0$. La demi-vie du carbone 14 est de $5\\,730$ ans : $p(5\\,730) = 0{,}5$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Exprime $p(t)$ en fonction de $\\lambda$ et de $t$, puis démontre que $\\lambda = \\dfrac{\\ln 2}{5\\,730}$.",
            indice: "Les solutions de $y' = ay$ sont les fonctions $Ce^{at}$. Puis résous $e^{-5\\,730\\lambda} = 0{,}5$.",
            corrige: "Les solutions de $y' = -\\lambda y$ sont les fonctions $Ce^{-\\lambda t}$, et $p(0) = C = 1$ : $p(t) = e^{-\\lambda t}$.\n\n$p(5\\,730) = 0{,}5 \\iff -5\\,730\\lambda = \\ln 0{,}5 = -\\ln 2 \\iff \\lambda = \\dfrac{\\ln 2}{5\\,730} \\approx 1{,}21 \\times 10^{-4}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Quelle proportion de carbone 14 reste-t-il au bout de $1\\,000$ ans ? Et au bout de $11\\,460$ ans ?",
            indice: "Pour la seconde, remarque que $11\\,460 = 2 \\times 5\\,730$.",
            corrige: "$p(1\\,000) = e^{-1\\,000\\lambda} \\approx 0{,}886$ : il reste environ $88{,}6\\,\\%$ du carbone 14.\n\n$11\\,460$ ans, ce sont deux demi-vies : $p(11\\,460) = e^{-2\\ln 2} = \\dfrac{1}{4}$, il reste $25\\,\\%$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Un morceau de charbon de bois trouvé sur un site archéologique de Mayotte contient encore $88\\,\\%$ de son carbone 14 initial. Depuis combien d'années environ l'arbre dont il provient est-il mort ?",
            indice: "Résous $e^{-\\lambda t} = 0{,}88$ avec $\\ln$.",
            corrige: "$e^{-\\lambda t} = 0{,}88 \\iff -\\lambda t = \\ln 0{,}88 \\iff t = -\\dfrac{\\ln 0{,}88}{\\lambda} = -\\dfrac{5\\,730\\ln 0{,}88}{\\ln 2}$.\n\nAinsi $t \\approx 1\\,057$ : l'arbre est mort il y a environ $1\\,060$ ans."
          },
          {
            n: "4.", points: 1.5,
            texte: "En dessous de $0{,}1\\,\\%$ de carbone 14 restant, on ne sait plus le mesurer. Jusqu'à quel âge peut-on dater un objet par cette méthode ?",
            indice: "Résous $e^{-\\lambda t} \\geqslant 0{,}001$.",
            corrige: "$e^{-\\lambda t} \\geqslant 0{,}001 \\iff -\\lambda t \\geqslant \\ln 0{,}001 \\iff t \\leqslant \\dfrac{\\ln 1\\,000}{\\lambda} = \\dfrac{5\\,730\\ln 1\\,000}{\\ln 2}$.\n\nAinsi $t \\leqslant 57\\,104$ environ : on peut dater des objets jusqu'à environ $57\\,000$ ans, pas au-delà."
          }
        ]
      }
    ]
  }
};
