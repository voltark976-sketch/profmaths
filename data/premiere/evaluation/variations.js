/*
  ENTRAÎNEMENT : Première spécialité — chapitre 10, Variations et courbes représentatives
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-variations.
  Format : voir data/premiere/evaluation/second-degre-2.js. Sans calculatrice (épreuve anticipée).
  Tableaux de variations écrits avec \nearrow et \searrow dans un tableau (tableauCorrige).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-variations"] = {
  revisions: {
    intro: "Les variations en un coup d'œil : du signe de la dérivée au tableau de variations, les extremums, la parité, les inégalités et l'optimisation. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Signe de $f'$ et variations",
        texte:
          "Sur un intervalle $I$ :\n\n" +
          "- $f'(x) \\geqslant 0$ pour tout $x$ : $f$ croissante ;\n" +
          "- $f'(x) \\leqslant 0$ pour tout $x$ : $f$ décroissante ;\n" +
          "- $f'(x) = 0$ pour tout $x$ : $f$ constante."
      },
      {
        titre: "Tableau de variations",
        texte:
          "- calculer $f'(x)$ ;\n" +
          "- étudier son signe (factoriser, signe d'un trinôme…) ;\n" +
          "- flèche montante quand $f' > 0$, descendante quand $f' < 0$ ;\n" +
          "- calculer $f$ aux bornes et là où $f'$ s'annule."
      },
      {
        titre: "Extremum",
        texte: "Si $f$ a un extremum local en $a$ (intérieur à l'intervalle), alors $f'(a) = 0$. La réciproque est fausse : $f(x) = x^3$ a $f'(0) = 0$ sans extremum en $0$. Il faut que $f'$ **change de signe** en $a$."
      },
      {
        titre: "Second degré",
        texte: "Pour $f(x) = ax^2 + bx + c$ : $f'(x) = 2ax + b$ s'annule en $-\\dfrac{b}{2a}$ en changeant de signe. Si $a > 0$, minimum en $-\\dfrac{b}{2a}$ ; si $a < 0$, maximum."
      },
      {
        titre: "Parité",
        texte:
          "Sur un ensemble symétrique par rapport à $0$ :\n\n" +
          "- **paire** : $f(-x) = f(x)$ pour tout $x$, courbe symétrique par rapport à l'axe des ordonnées ($x^2$, $|x|$, $\\cos$) ;\n" +
          "- **impaire** : $f(-x) = -f(x)$, courbe symétrique par rapport à l'origine ($x^3$, $\\dfrac{1}{x}$, $\\sin$)."
      },
      {
        titre: "Démontrer une inégalité",
        texte: "Pour prouver $f(x) \\geqslant g(x)$ sur $I$, on étudie $d(x) = f(x) - g(x)$ : si son minimum sur $I$ est positif ou nul, alors $d(x) \\geqslant 0$, et la courbe de $f$ est au-dessus de celle de $g$."
      },
      {
        titre: "Optimiser",
        texte: "Exprimer la grandeur à optimiser en fonction d'une seule variable, préciser l'intervalle imposé par le problème (longueurs positives…), dériver, faire le tableau de variations, puis répondre à la question posée avec une phrase."
      },
      {
        titre: "Méthode de Newton",
        texte:
          "Pour approcher une solution de $f(x) = 0$, on remplace la courbe par sa tangente :\n\n" +
          "$x_{n+1} = x_n - \\dfrac{f(x_n)}{f'(x_n)}$, avec $f'(x_n) \\neq 0$."
      }
    ],
    pieges: [
      "Lire les variations sur le signe de $f$ au lieu du signe de $f'$.",
      "Conclure à un extremum dès que $f'(a) = 0$ : il faut que $f'$ change de signe ($x^3$ en $0$).",
      "Oublier de calculer les valeurs de $f$ dans le tableau de variations.",
      "Confondre le maximum (une valeur de $f$) et l'endroit où il est atteint (une valeur de $x$).",
      "Dire qu'une fonction est paire après avoir seulement vérifié $f(-1) = f(1)$ : il faut **tout** $x$.",
      "Oublier l'intervalle imposé par le problème : une longueur est positive."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Étude d'une fonction",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On considère la fonction $f$ définie sur $[0\\,;5]$ par $f(x) = x^3 - 6x^2 + 9x + 1$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $f'(x)$.",
            indice: "Dérive terme à terme.",
            corrige: "$f'(x) = 3x^2 - 12x + 9$."
          },
          {
            n: "2.", points: 1,
            texte: "Montre que, pour tout $x$, $f'(x) = 3(x - 1)(x - 3)$.",
            indice: "Développe $3(x - 1)(x - 3)$.",
            corrige: "$3(x - 1)(x - 3) = 3(x^2 - 4x + 3) = 3x^2 - 12x + 9 = f'(x)$."
          },
          {
            n: "3.", points: 2,
            texte: "Étudie le signe de $f'(x)$, puis dresse le tableau de variations de $f$ sur $[0\\,;5]$, avec les valeurs de $f$.",
            indice: "$3(x - 1)(x - 3)$ a pour racines $1$ et $3$, et son coefficient $3$ est positif. Calcule $f(0)$, $f(1)$, $f(3)$ et $f(5)$.",
            corrige: "$f'(x)$ est un trinôme de racines $1$ et $3$, de coefficient $3 > 0$ : il est positif à l'extérieur des racines et négatif entre elles. De plus $f(0) = 1$, $f(1) = 1 - 6 + 9 + 1 = 5$, $f(3) = 27 - 54 + 27 + 1 = 1$ et $f(5) = 125 - 150 + 45 + 1 = 21$.",
            tableauCorrige: { lignes: [["x", "0", "", "1", "", "3", "", "5"], ["f'(x)", "", "+", "0", "-", "0", "+", ""], ["f(x)", "1", "\\nearrow", "5", "\\searrow", "1", "\\nearrow", "21"]] }
          },
          {
            n: "4.", points: 1.5,
            texte: "Quels sont les extremums locaux de $f$ ? Quels sont le maximum et le minimum de $f$ sur $[0\\,;5]$ ?",
            indice: "Un extremum local est atteint là où $f'$ s'annule en changeant de signe. Compare aussi avec les valeurs aux bornes.",
            corrige: "$f'$ s'annule en changeant de signe en $1$ et en $3$ : $f$ a un maximum local $5$ en $1$ et un minimum local $1$ en $3$. Sur $[0\\,;5]$, le maximum est $21$, atteint en $5$, et le minimum est $1$, atteint en $0$ et en $3$."
          },
          {
            n: "5.", points: 1.5,
            texte: "D'après le tableau de variations, combien de fois la courbe de $f$ coupe-t-elle la droite d'équation $y = 3$ ?",
            indice: "Sur chaque intervalle où $f$ est monotone, regarde si $3$ est entre les valeurs extrêmes.",
            corrige: "Sur $[0\\,;1]$, $f$ croît de $1$ à $5$ : elle passe une fois par $3$. Sur $[1\\,;3]$, elle décroît de $5$ à $1$ : une fois. Sur $[3\\,;5]$, elle croît de $1$ à $21$ : une fois. La courbe coupe la droite $y = 3$ en **trois** points."
          }
        ]
      },
      {
        titre: "La boîte de l'ébéniste",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Un ébéniste de Mamoudzou fabrique des boîtes en bois sans couvercle, à fond carré, d'un volume de $32$ dm³. On note $x$ le côté du fond et $h$ la hauteur, en décimètres, avec $x > 0$. Il veut utiliser le moins de bois possible.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Exprime $h$ en fonction de $x$.",
            indice: "Le volume d'un pavé droit est l'aire du fond fois la hauteur.",
            corrige: "$x^2 \\times h = 32$, donc $h = \\dfrac{32}{x^2}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Montre que l'aire totale de bois, en dm², est $S(x) = x^2 + \\dfrac{128}{x}$.",
            indice: "La boîte a un fond carré et quatre faces latérales rectangulaires de côtés $x$ et $h$.",
            corrige: "Le fond mesure $x^2$ et les quatre faces $4xh$ en tout. Donc $S(x) = x^2 + 4x \\times \\dfrac{32}{x^2} = x^2 + \\dfrac{128}{x}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Montre que, pour tout $x > 0$, $S'(x) = \\dfrac{2(x^3 - 64)}{x^2}$.",
            indice: "$\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$, puis mets au même dénominateur.",
            corrige: "$S'(x) = 2x - \\dfrac{128}{x^2} = \\dfrac{2x^3 - 128}{x^2} = \\dfrac{2(x^3 - 64)}{x^2}$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Étudie le signe de $S'(x)$ et dresse le tableau de variations de $S$ sur $]0\\,;+\\infty[$.",
            indice: "$x^2 > 0$. Et $x^3 - 64 < 0 \\iff x^3 < 64 \\iff x < 4$, car la fonction cube est croissante.",
            corrige: "$x^2 > 0$, donc $S'(x)$ a le signe de $x^3 - 64$ : négatif pour $x < 4$, nul en $4$, positif pour $x > 4$ (la fonction cube est croissante et $4^3 = 64$). $S$ décroît sur $]0\\,;4]$ puis croît sur $[4\\,;+\\infty[$.",
            tableauCorrige: { lignes: [["x", "0", "", "4", "", "+\\infty"], ["S'(x)", "", "-", "0", "+", ""], ["S(x)", "", "\\searrow", "48", "\\nearrow", ""]] }
          },
          {
            n: "5.", points: 1.5,
            texte: "Quelles dimensions l'ébéniste doit-il choisir ? Quelle aire de bois utilise-t-il alors ?",
            indice: "Le minimum de $S$ est atteint en $x = 4$ ; calcule $S(4)$ et $h$.",
            corrige: "$S$ est minimale pour $x = 4$ : $S(4) = 16 + \\dfrac{128}{4} = 16 + 32 = 48$ dm². La hauteur vaut alors $h = \\dfrac{32}{16} = 2$ dm. La boîte idéale mesure $4$ dm sur $4$ dm, avec $2$ dm de hauteur, et utilise $48$ dm² de bois."
          }
        ]
      },
      {
        titre: "Parité, inégalité et logique",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Les trois parties sont indépendantes.",
        questions: [
          { partie: "Parité" },
          {
            n: "1.", points: 1.5,
            texte: "La fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = x^4 - 2x^2 + 3$ est-elle paire, impaire, ou ni l'une ni l'autre ? Que peut-on en déduire pour sa courbe ?",
            indice: "Calcule $f(-x)$ et compare avec $f(x)$.",
            corrige: "$f(-x) = (-x)^4 - 2(-x)^2 + 3 = x^4 - 2x^2 + 3 = f(x)$ pour tout réel $x$ : $f$ est **paire**, sa courbe est symétrique par rapport à l'axe des ordonnées."
          },
          {
            n: "2.", points: 1.5,
            texte: "Même question pour $g(x) = x^3 - 3x$.",
            indice: "Calcule $g(-x)$ et compare avec $g(x)$ et $-g(x)$.",
            corrige: "$g(-x) = (-x)^3 - 3(-x) = -x^3 + 3x = -(x^3 - 3x) = -g(x)$ pour tout réel $x$ : $g$ est **impaire**, sa courbe est symétrique par rapport à l'origine du repère."
          },
          { partie: "Une inégalité" },
          {
            n: "3.", points: 2,
            texte: "Démontre que, pour tout réel $x \\geqslant 0$, $x^3 + 2 \\geqslant 3x$.",
            indice: "Étudie les variations de $d(x) = x^3 - 3x + 2$ sur $[0\\,;+\\infty[$ : $d'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$.",
            corrige:
              "Soit $d(x) = x^3 + 2 - 3x$ sur $[0\\,;+\\infty[$. Alors $d'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$. Pour $x \\geqslant 0$, $x + 1 > 0$, donc $d'(x)$ a le signe de $x - 1$ : $d$ décroît sur $[0\\,;1]$ et croît sur $[1\\,;+\\infty[$.\n\n" +
              "Son minimum est $d(1) = 1 + 2 - 3 = 0$, donc $d(x) \\geqslant 0$ pour tout $x \\geqslant 0$ : $x^3 + 2 \\geqslant 3x$."
          },
          { partie: "Logique" },
          {
            n: "4.", points: 1,
            texte: "Vrai ou faux : « si $f'(a) = 0$, alors $f$ admet un extremum local en $a$ ». Justifie.",
            indice: "Pense à la fonction cube en $0$.",
            corrige: "**Faux.** Pour $f(x) = x^3$ : $f'(x) = 3x^2$, donc $f'(0) = 0$, mais $f$ est croissante sur $\\mathbb{R}$ et n'a pas d'extremum en $0$ ($f'$ ne change pas de signe). C'est la réciproque qui est vraie : un extremum local impose $f'(a) = 0$."
          }
        ]
      }
    ]
  }
};
