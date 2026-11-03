/*
  ENTRAÎNEMENT : Terminale spécialité — chapitre 13, Calcul intégral
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-spe-integration.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit du bac. Modèle du bateau fictif.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-spe-integration"] = {
  revisions: {
    intro: "Le calcul intégral en un coup d'œil : intégrale et aire, lien avec les primitives, propriétés, intégration par parties, valeur moyenne, aire entre deux courbes et méthode des rectangles. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Intégrale et aire",
        texte: "Pour $f$ continue et positive sur $[a\\,;b]$, $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$ est l'aire, en unités d'aire, du domaine entre la courbe, l'axe des abscisses et les droites $x = a$ et $x = b$."
      },
      {
        titre: "Avec une primitive",
        texte: "Si $F$ est une primitive de $f$ : $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x = \\left[F(x)\\right]_a^b = F(b) - F(a)$. Une intégrale peut être négative : elle compte négativement les parties sous l'axe."
      },
      {
        titre: "Propriétés",
        texte: "Chasles : $\\displaystyle\\int_a^b f + \\int_b^c f = \\int_a^c f$. Linéarité : on peut sortir les constantes et séparer une somme. Positivité : si $f \\leqslant g$ sur $[a\\,;b]$ avec $a \\leqslant b$, alors $\\displaystyle\\int_a^b f \\leqslant \\int_a^b g$."
      },
      {
        titre: "Intégration par parties",
        texte: "$\\displaystyle\\int_a^b uv' = \\left[uv\\right]_a^b - \\int_a^b u'v$. On choisit pour $u$ la partie qui se simplifie en la dérivant, par exemple $x$ dans $xe^x$."
      },
      {
        titre: "Valeur moyenne",
        texte: "$\\mu = \\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$ : c'est la hauteur du rectangle de base $[a\\,;b]$ qui a la même aire que le domaine sous la courbe."
      },
      {
        titre: "Aire entre deux courbes",
        texte: "Si $g \\leqslant f$ sur $[a\\,;b]$, l'aire entre les courbes vaut $\\displaystyle\\int_a^b (f - g)$ : « haut moins bas ». On cherche d'abord les points d'intersection et la position des courbes."
      },
      {
        titre: "Méthode des rectangles",
        texte: "On découpe $[a\\,;b]$ en $n$ parts de largeur $h$ et on additionne des aires de rectangles. Pour une fonction croissante, les rectangles à gauche donnent une valeur par défaut, ceux à droite une valeur par excès."
      }
    ],
    pieges: [
      "Calculer $F(a) - F(b)$ au lieu de $F(b) - F(a)$.",
      "Oublier les parenthèses autour de $F(a)$ quand il est négatif.",
      "Confondre intégrale, qui peut être négative, et aire, toujours positive.",
      "Oublier de diviser par $b - a$ dans une valeur moyenne.",
      "Intégrer $g - f$ au lieu de $f - g$ pour une aire entre deux courbes.",
      "Oublier le signe moins devant la seconde intégrale d'une intégration par parties."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit du bac (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Entre une parabole et une droite",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans un repère orthonormé, on considère les courbes des fonctions $f(x) = x^2 - 4x + 5$ et $g(x) = x + 1$, définies sur $\\mathbb{R}$.",
        figure: (o) => o.graph({
          xmin: -0.5, xmax: 5.5, ymin: -0.5, ymax: 7.5, h: 280,
          aires: [{ f: (x) => x + 1, g: (x) => x * x - 4 * x + 5, a: 1, b: 4 }],
          curves: [
            { f: (x) => x * x - 4 * x + 5, a: -0.3, b: 4.65, closed: false, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: 0.3, dx: 16, dy: 0 },
            { f: (x) => x + 1, a: -0.5, b: 5.5, closed: false, couleur: 1, label: "C<tspan class=\"sub\" dy=\"3\">g</tspan>", lx: 5.2, dx: 0, dy: 14 }
          ],
          aria: "Parabole de f et droite de g qui se coupent en deux points ; le domaine entre elles, de x = 1 à x = 4, est coloré"
        }),
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine les coordonnées des points d'intersection des deux courbes.",
            indice: "Résous $f(x) = g(x)$.",
            corrige: "$x^2 - 4x + 5 = x + 1 \\iff x^2 - 5x + 4 = 0 \\iff (x - 1)(x - 4) = 0$. Les points d'intersection sont $(1\\,;2)$ et $(4\\,;5)$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Étudie la position relative des deux courbes sur $[1\\,;4]$.",
            indice: "Étudie le signe de $g(x) - f(x)$.",
            corrige: "$g(x) - f(x) = -x^2 + 5x - 4 = -(x - 1)(x - 4)$. Sur $[1\\,;4]$, $(x - 1)(x - 4) \\leqslant 0$, donc $g(x) - f(x) \\geqslant 0$ : la droite est au-dessus de la parabole."
          },
          {
            n: "3.", points: 2,
            texte: "Calcule l'aire du domaine coloré, compris entre les deux courbes.",
            indice: "Aire $= \\displaystyle\\int_1^4 (g(x) - f(x))\\,\\mathrm{d}x$, avec la primitive $-\\dfrac{x^3}{3} + \\dfrac{5x^2}{2} - 4x$.",
            corrige: "Avec $G(x) = -\\dfrac{x^3}{3} + \\dfrac{5x^2}{2} - 4x$ : $G(4) = -\\dfrac{64}{3} + 40 - 16 = \\dfrac{8}{3}$ et $G(1) = -\\dfrac{1}{3} + \\dfrac{5}{2} - 4 = -\\dfrac{11}{6}$. L'aire vaut $G(4) - G(1) = \\dfrac{16}{6} + \\dfrac{11}{6} = \\dfrac{9}{2}$ unités d'aire."
          },
          {
            n: "4.", points: 1,
            texte: "Calcule la valeur moyenne de $f$ sur $[0\\,;4]$.",
            indice: "$\\mu = \\dfrac{1}{4}\\displaystyle\\int_0^4 f(x)\\,\\mathrm{d}x$.",
            corrige: "$\\displaystyle\\int_0^4 (x^2 - 4x + 5)\\,\\mathrm{d}x = \\left[\\dfrac{x^3}{3} - 2x^2 + 5x\\right]_0^4 = \\dfrac{64}{3} - 32 + 20 = \\dfrac{28}{3}$, donc $\\mu = \\dfrac{1}{4} \\times \\dfrac{28}{3} = \\dfrac{7}{3}$."
          },
          {
            n: "5.", points: 1,
            texte:
              "Que renvoie $\\texttt{rect(d, 1, 4, 3)}$, où $\\texttt{d}$ calcule $g(x) - f(x)$ ? Compare avec la question 3.\n\n" +
              "```python\ndef rect(f, a, b, n):\n    h = (b - a) / n\n    s = 0\n    for i in range(n):\n        x = a + i * h\n        s = s + h * f(x)\n    return s\n```",
            indice: "Ici $h = 1$ : la fonction additionne $d(1)$, $d(2)$ et $d(3)$.",
            corrige: "$d(1) + d(2) + d(3) = 0 + 2 + 2 = 4$ : la fonction renvoie $\\texttt{4.0}$, une valeur approchée de l'aire exacte $4{,}5$. Avec plus de rectangles, on s'en rapprocherait."
          }
        ]
      },
      {
        titre: "Une suite d'intégrales",
        duree: 30, points: 7, calculatrice: true,
        contexte: "Pour tout entier naturel $n$, on pose $I_n = \\displaystyle\\int_0^1 x^ne^{-x}\\,\\mathrm{d}x$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $I_0$.",
            indice: "Une primitive de $e^{-x}$ est $-e^{-x}$.",
            corrige: "$I_0 = \\left[-e^{-x}\\right]_0^1 = -e^{-1} + 1 = 1 - e^{-1}$."
          },
          {
            n: "2.", points: 2,
            texte: "À l'aide d'une intégration par parties, démontre que $I_1 = 1 - 2e^{-1}$.",
            indice: "Pose $u(x) = x$ et $v'(x) = e^{-x}$, donc $u'(x) = 1$ et $v(x) = -e^{-x}$.",
            corrige: "$I_1 = \\left[-xe^{-x}\\right]_0^1 - \\displaystyle\\int_0^1 (-e^{-x})\\,\\mathrm{d}x = -e^{-1} + I_0 = -e^{-1} + 1 - e^{-1} = 1 - 2e^{-1}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "De la même façon, démontre que $I_{n+1} = (n + 1)I_n - e^{-1}$ pour tout $n$, puis calcule $I_2$.",
            indice: "Pose $u(x) = x^{n+1}$ et $v'(x) = e^{-x}$.",
            corrige: "Avec $u'(x) = (n + 1)x^n$ et $v(x) = -e^{-x}$, la seconde intégrale redonne $I_n$ : $I_{n+1} = \\left[-x^{n+1}e^{-x}\\right]_0^1 + (n + 1)I_n$. Le crochet vaut $-e^{-1}$, donc $I_{n+1} = (n + 1)I_n - e^{-1}$. Puis $I_2 = 2I_1 - e^{-1} = 2 - 5e^{-1}$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Démontre que, pour tout $n$, $\\dfrac{1}{(n + 1)e} \\leqslant I_n \\leqslant \\dfrac{1}{n + 1}$. Déduis-en la limite de $(I_n)$.",
            indice: "Pour $x \\in [0\\,;1]$, $e^{-1} \\leqslant e^{-x} \\leqslant 1$. Multiplie par $x^n \\geqslant 0$ et intègre.",
            corrige: "Sur $[0\\,;1]$, $e^{-1}x^n \\leqslant x^ne^{-x} \\leqslant x^n$. En intégrant de $0$ à $1$ (positivité), avec $\\displaystyle\\int_0^1 x^n\\,\\mathrm{d}x = \\dfrac{1}{n + 1}$, on obtient l'encadrement. Les deux bornes tendent vers $0$ : par le théorème des gendarmes, $I_n \\to 0$."
          },
          {
            n: "5.", points: 1,
            texte:
              "Que renvoie environ $\\texttt{I(5)}$ ? Vérifie l'encadrement de la question 4.\n\n" +
              "```python\nfrom math import exp\n\ndef I(n):\n    a = exp(-1)\n    v = 1 - a\n    for k in range(n):\n        v = (k + 1) * v - a\n    return v\n```",
            indice: "Le programme part de $I_0$ et applique la relation de la question 3.",
            corrige: "Il renvoie environ $0{,}0713$. Et $\\dfrac{1}{6e} \\approx 0{,}061 \\leqslant 0{,}0713 \\leqslant \\dfrac{1}{6} \\approx 0{,}167$ : l'encadrement est vérifié."
          }
        ]
      },
      {
        titre: "La distance parcourue par un bateau",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Un bateau démarre ; sa vitesse, en km/h, $t$ heures après le départ, est $v(t) = 20(1 - e^{-0{,}5t})$ (modèle fictif). La distance parcourue entre les instants $a$ et $b$ est $\\displaystyle\\int_a^b v(t)\\,\\mathrm{d}t$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Démontre que $V(t) = 20t + 40e^{-0{,}5t}$ est une primitive de $v$ sur $[0\\,;+\\infty[$.",
            indice: "Dérive $V$ ; la dérivée de $e^{-0{,}5t}$ est $-0{,}5e^{-0{,}5t}$.",
            corrige: "$V'(t) = 20 + 40 \\times (-0{,}5)e^{-0{,}5t} = 20 - 20e^{-0{,}5t} = v(t)$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule la distance parcourue pendant les $4$ premières heures : valeur exacte, puis arrondie au dixième de km.",
            indice: "$\\displaystyle\\int_0^4 v(t)\\,\\mathrm{d}t = V(4) - V(0)$.",
            corrige: "$V(4) - V(0) = (80 + 40e^{-2}) - 40 = 40 + 40e^{-2} \\approx 45{,}4$ km."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule la vitesse moyenne pendant ces $4$ heures, et compare-la avec la vitesse au bout de $4$ heures.",
            indice: "Vitesse moyenne : la valeur moyenne de $v$ sur $[0\\,;4]$.",
            corrige: "$\\mu = \\dfrac{1}{4}(40 + 40e^{-2}) = 10 + 10e^{-2} \\approx 11{,}4$ km/h, alors que $v(4) = 20(1 - e^{-2}) \\approx 17{,}3$ km/h : le bateau a été lent au début."
          },
          {
            n: "4.", points: 1.5,
            texte: "La fonction $\\texttt{rect}$ de l'exercice 1, avec $\\texttt{rect(v, 0, 4, 4)}$, renvoie environ $36{,}0$. Pourquoi ce résultat est-il trop petit ?",
            indice: "$v$ est croissante, et chaque rectangle prend la valeur à gauche de son intervalle.",
            corrige: "$v'(t) = 10e^{-0{,}5t} > 0$ : $v$ est croissante. Chaque rectangle a pour hauteur la valeur de $v$ au bord gauche, la plus petite de l'intervalle : il est sous la courbe. La somme $v(0) + v(1) + v(2) + v(3) \\approx 36{,}0$ est donc inférieure à l'intégrale $45{,}4$."
          }
        ]
      }
    ]
  }
};
