/*
  ENTRAÎNEMENT : Terminale spécialité — chapitre 11, Équations différentielles
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-spe-equations-differentielles.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit du bac. Modèles fictifs.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-spe-equations-differentielles"] = {
  revisions: {
    intro: "Les équations différentielles en un coup d'œil : $y' = ay$, $y' = ay + b$, solution particulière, condition initiale, modélisation et méthode d'Euler. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Vérifier une solution",
        texte: "On calcule $f'$, puis on remplace $y$ par $f$ et $y'$ par $f'$ dans l'équation : l'égalité doit être vraie pour **tout** $x$ de l'intervalle."
      },
      {
        titre: "$y' = ay$",
        texte: "Les solutions sont les fonctions $x \\mapsto Ce^{ax}$, avec $C$ réel. Une condition $y(x_0) = y_0$ donne une unique solution."
      },
      {
        titre: "$y' = ay + b$",
        texte: "Pour $a \\neq 0$, la solution constante est $-\\dfrac{b}{a}$, et les solutions sont les fonctions $x \\mapsto Ce^{ax} - \\dfrac{b}{a}$. On écrit d'abord la forme générale, puis on utilise la condition initiale."
      },
      {
        titre: "$y' = ay + f$",
        texte: "Si $p$ est une solution particulière, les solutions sont les fonctions $p + h$, où $h$ est solution de $y' = ay$ : $x \\mapsto p(x) + Ce^{ax}$."
      },
      {
        titre: "Modéliser",
        texte: "Refroidissement : $T' = -k(T - T_a)$, donc $T(t) = T_a + (T_0 - T_a)e^{-kt}$. Radioactivité : $N(t) = N_0e^{-\\lambda t}$. Croissance : $N(t) = N_0e^{kt}$. On résout ensuite avec le logarithme."
      },
      {
        titre: "Méthode d'Euler",
        texte: "$y(x + h) \\approx y(x) + h \\times y'(x)$ : on avance de $h$ en suivant la tangente. On remplace $y'(x)$ par ce que donne l'équation, par exemple $ay(x) + b$."
      }
    ],
    pieges: [
      "Oublier d'isoler $y'$ avant de lire $a$ et $b$ : $y' + 4y = 0$ donne $a = -4$.",
      "Écrire la solution constante $\\dfrac{b}{a}$ au lieu de $-\\dfrac{b}{a}$.",
      "Écrire $y = e^{ax} + C$ au lieu de $y = Ce^{ax}$.",
      "Utiliser la condition initiale avant d'avoir écrit la forme générale complète.",
      "Croire que $e^0 = 0$ en calculant $y(0)$.",
      "Confondre $e^{-kt}$, qui décroît, et $e^{kt}$, qui croît."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit du bac (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Une boisson au réfrigérateur",
        duree: 30, points: 7, calculatrice: true,
        contexte: "Une bouteille de jus de goyave à $30$ °C est placée dans un réfrigérateur à $4$ °C. On admet que sa température $T(t)$, en °C, $t$ minutes plus tard, vérifie $T' = -0{,}2(T - 4)$ et $T(0) = 30$ (modèle fictif).",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Écris l'équation sous la forme $T' = aT + b$ et donne sa solution constante.",
            indice: "Développe $-0{,}2(T - 4)$.",
            corrige: "$T' = -0{,}2T + 0{,}8$, donc $a = -0{,}2$ et $b = 0{,}8$. La solution constante est $-\\dfrac{b}{a} = -\\dfrac{0{,}8}{-0{,}2} = 4$ : c'est la température du réfrigérateur."
          },
          {
            n: "2.", points: 1.5,
            texte: "Résous l'équation, puis détermine $T(t)$ avec la condition $T(0) = 30$.",
            indice: "Les solutions sont $Ce^{-0{,}2t} + 4$.",
            corrige: "Les solutions sont $T(t) = Ce^{-0{,}2t} + 4$, avec $C$ réel. Puis $T(0) = C + 4 = 30$, donc $C = 26$ et $T(t) = 4 + 26e^{-0{,}2t}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Étudie le sens de variation de $T$ et sa limite en $+\\infty$. Interprète.",
            indice: "$T'(t) = 26 \\times (-0{,}2)e^{-0{,}2t}$ ; et $e^{-0{,}2t} \\to 0$.",
            corrige: "$T'(t) = -5{,}2e^{-0{,}2t} < 0$ : la température diminue. Comme $e^{-0{,}2t} \\to 0$, $T(t) \\to 4$ : la boisson se rapproche de la température du réfrigérateur, sans jamais l'atteindre dans ce modèle."
          },
          {
            n: "4.", points: 1.5,
            texte: "Au bout de combien de temps la boisson sera-t-elle à $8$ °C ou moins ? Donne la valeur exacte, puis une valeur approchée au dixième de minute.",
            indice: "Résous $4 + 26e^{-0{,}2t} \\leqslant 8$, puis applique $\\ln$, qui est croissante.",
            corrige: "$4 + 26e^{-0{,}2t} \\leqslant 8 \\iff e^{-0{,}2t} \\leqslant \\dfrac{2}{13} \\iff -0{,}2t \\leqslant \\ln\\dfrac{2}{13} \\iff t \\geqslant 5\\ln\\dfrac{13}{2}$. Il faut attendre $5\\ln 6{,}5 \\approx 9{,}4$ minutes."
          },
          {
            n: "5.", points: 1.5,
            texte: "Calcule $T'(0)$ et $T'(10)$. Que peux-tu dire de la vitesse de refroidissement ?",
            indice: "$T'(t)$ est la vitesse d'évolution de la température, en °C par minute.",
            corrige: "$T'(0) = -5{,}2$ et $T'(10) = -5{,}2e^{-2} \\approx -0{,}70$ °C par minute. La boisson refroidit vite au début, puis de plus en plus lentement, à mesure que l'écart avec $4$ °C diminue."
          }
        ]
      },
      {
        titre: "Résoudre des équations différentielles",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Résous $y' + 4y = 0$, puis donne la solution telle que $y(0) = -2$.",
            indice: "Isole $y'$ : $y' = -4y$.",
            corrige: "$y' = -4y$ : les solutions sont $x \\mapsto Ce^{-4x}$. Avec $y(0) = C = -2$ : $y(x) = -2e^{-4x}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Résous $3y' = 6y - 9$, puis donne la solution telle que $y(0) = 0$.",
            indice: "Divise par $3$ : $y' = 2y - 3$.",
            corrige: "$y' = 2y - 3$ : $a = 2$, $b = -3$, solution constante $-\\dfrac{b}{a} = \\dfrac{3}{2}$. Les solutions sont $y(x) = Ce^{2x} + \\dfrac{3}{2}$. Avec $y(0) = C + \\dfrac{3}{2} = 0$ : $C = -\\dfrac{3}{2}$ et $y(x) = \\dfrac{3}{2}(1 - e^{2x})$."
          },
          {
            n: "3.", points: 2,
            texte: "On considère $(E) : y' = -y + 2x + 1$. Montre que $p(x) = 2x - 1$ est une solution de $(E)$, puis donne toutes les solutions de $(E)$ et celle qui vaut $1$ en $0$.",
            indice: "Les solutions de $(E)$ sont $p + h$, avec $h$ solution de $y' = -y$.",
            corrige: "$p'(x) = 2$ et $-p(x) + 2x + 1 = -2x + 1 + 2x + 1 = 2$ : $p$ est solution. Les solutions de $y' = -y$ sont $Ce^{-x}$, donc celles de $(E)$ sont $y(x) = Ce^{-x} + 2x - 1$. Avec $y(0) = C - 1 = 1$ : $C = 2$ et $y(x) = 2e^{-x} + 2x - 1$."
          },
          {
            n: "4.", points: 1,
            texte: "Vérifie que $f(x) = xe^{2x}$ est solution de $y' - 2y = e^{2x}$.",
            indice: "Dérive $f$ comme un produit.",
            corrige: "$f'(x) = e^{2x} + 2xe^{2x}$, donc $f'(x) - 2f(x) = e^{2x} + 2xe^{2x} - 2xe^{2x} = e^{2x}$."
          },
          {
            n: "5.", points: 1,
            texte: "La fonction $g$ est la solution de $y' = 3y$ telle que $g(0) = 2$. Quel est le coefficient directeur de la tangente à sa courbe au point d'abscisse $0$ ?",
            indice: "Le coefficient directeur est $g'(0)$, et l'équation donne $g'(0)$.",
            corrige: "$g'(0) = 3g(0) = 6$ : le coefficient directeur vaut $6$, et non $3$. On le retrouve avec $g(x) = 2e^{3x}$ : $g'(0) = 6$."
          }
        ]
      },
      {
        titre: "Des bactéries et la méthode d'Euler",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Dans un milieu de culture, on admet que le nombre $N(t)$ de bactéries, $t$ heures après le début de l'expérience, vérifie $N' = 0{,}3N$ et $N(0) = 1\\,000$ (modèle fictif).",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Exprime $N(t)$ en fonction de $t$, puis calcule $N(2)$, arrondi à l'unité.",
            indice: "Les solutions de $y' = 0{,}3y$ sont $Ce^{0{,}3t}$.",
            corrige: "$N(t) = Ce^{0{,}3t}$ et $N(0) = C = 1\\,000$, donc $N(t) = 1\\,000e^{0{,}3t}$. Puis $N(2) = 1\\,000e^{0{,}6} \\approx 1\\,822$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Au bout de combien de temps le nombre de bactéries a-t-il doublé ? Donne la valeur exacte, puis une valeur approchée à la minute près.",
            indice: "Résous $1\\,000e^{0{,}3t} = 2\\,000$.",
            corrige: "$e^{0{,}3t} = 2 \\iff 0{,}3t = \\ln 2 \\iff t = \\dfrac{\\ln 2}{0{,}3} \\approx 2{,}31$ h, soit environ $2$ h $19$ min ($0{,}31 \\times 60 \\approx 19$)."
          },
          {
            n: "3.", points: 1.5,
            texte:
              "On approche $N(2)$ par la méthode d'Euler avec un pas de $0{,}5$ h. Que renvoie $\\texttt{euler(1000, 0.5, 4)}$ ? Compare avec $N(2)$.\n\n" +
              "```python\ndef euler(N, h, n):\n    for k in range(n):\n        N = N + h * 0.3 * N\n    return N\n```",
            indice: "À chaque pas, $N$ est multiplié par $1 + 0{,}5 \\times 0{,}3 = 1{,}15$.",
            corrige: "Après $4$ pas : $1\\,000 \\times 1{,}15^4 \\approx 1\\,749$. La fonction renvoie $\\texttt{1749.00625}$, en dessous de la valeur exacte $N(2) \\approx 1\\,822$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Explique pourquoi la méthode d'Euler donne ici une valeur trop petite.",
            indice: "Compare $1 + 0{,}3h$ et $e^{0{,}3h}$ : la courbe de l'exponentielle est au-dessus de ses tangentes.",
            corrige: "Sur un pas, la vraie solution est multipliée par $e^{0{,}3h}$, alors que la méthode multiplie par $1 + 0{,}3h$. Or $e^x \\geqslant 1 + x$ (convexité de l'exponentielle) : $e^{0{,}15} \\approx 1{,}162 > 1{,}15$. À chaque pas on perd un peu, d'où une valeur trop petite ; avec un pas plus petit, l'écart diminue."
          }
        ]
      }
    ]
  }
};
