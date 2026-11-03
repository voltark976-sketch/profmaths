/*
  ENTRAÎNEMENT : Terminale spécialité — chapitre 10, Primitives
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-spe-primitives.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit du bac.
  L'intégrale vient au chapitre 13 : ici, F(b) - F(a) n'est qu'une différence de valeurs.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-spe-primitives"] = {
  revisions: {
    intro: "Les primitives en un coup d'œil : définition, toutes les primitives, primitives usuelles, formes composées, condition initiale et méthode d'Euler. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Primitive",
        texte: "$F$ est une primitive de $f$ sur $I$ si $F' = f$ sur $I$ : c'est une solution de l'équation différentielle $y' = f$. Pour vérifier une primitive, on la **dérive**."
      },
      {
        titre: "Toutes les primitives",
        texte: "Si $F$ est une primitive de $f$ sur un intervalle, les primitives de $f$ sont les fonctions $F + C$, avec $C$ réel. Une condition comme $F(x_0) = y_0$ fixe $C$ : il y a une seule primitive qui la vérifie."
      },
      {
        titre: "Primitives usuelles",
        texte: "$x^n$ ($n \\neq -1$) : $\\dfrac{x^{n+1}}{n + 1}$ ; $\\dfrac{1}{x^2}$ : $-\\dfrac{1}{x}$ ; $\\dfrac{1}{\\sqrt{x}}$ : $2\\sqrt{x}$ ; $\\dfrac{1}{x}$ sur $]0\\,;+\\infty[$ : $\\ln x$ ; $e^x$ : $e^x$ ; $\\cos x$ : $\\sin x$ ; $\\sin x$ : $-\\cos x$."
      },
      {
        titre: "Formes composées",
        texte: "$u'u^n$ ($n \\neq -1$) : $\\dfrac{u^{n+1}}{n + 1}$ ; $\\dfrac{u'}{u}$ avec $u > 0$ : $\\ln u$ ; $u'e^u$ : $e^u$ ; $\\dfrac{u'}{\\sqrt{u}}$ : $2\\sqrt{u}$. Il manque souvent une constante : on multiplie et on divise par le nombre qui convient."
      },
      {
        titre: "Signe de $f$, variations de $F$",
        texte: "Comme $F' = f$, $F$ est croissante là où $f$ est positive. Et comme $F'' = f'$, $F$ est convexe là où $f$ est croissante."
      },
      {
        titre: "Méthode d'Euler",
        texte: "Pour approcher la solution de $y' = f$ avec $y(x_0) = y_0$ : $y(x + h) \\approx y(x) + h \\times f(x)$. On avance pas à pas en suivant la tangente ; plus le pas $h$ est petit, meilleure est l'approximation."
      }
    ],
    pieges: [
      "Dériver au lieu de chercher une primitive.",
      "Oublier de diviser par le nouvel exposant : une primitive de $x^3$ est $\\dfrac{x^4}{4}$.",
      "Oublier la constante $C$ quand on demande **toutes** les primitives.",
      "Donner $5e^{5x}$ comme primitive de $e^{5x}$ : c'est la dérivée, la primitive est $\\dfrac{1}{5}e^{5x}$.",
      "Croire qu'une primitive d'un produit est le produit des primitives.",
      "Ne pas vérifier son résultat en le dérivant."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit du bac (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Calculer des primitives",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Donne une primitive de chaque fonction : $f_1(x) = 3x^2 - 4x + 5$ sur $\\mathbb{R}$ ; $f_2(x) = \\dfrac{2}{x^2}$ sur $]0\\,;+\\infty[$ ; $f_3(x) = e^{-2x}$ sur $\\mathbb{R}$.",
            indice: "Primitives usuelles et linéarité ; pour $f_3$, la dérivée de $e^{-2x}$ est $-2e^{-2x}$.",
            corrige: "$F_1(x) = x^3 - 2x^2 + 5x$ ; $F_2(x) = -\\dfrac{2}{x}$ ; $F_3(x) = -\\dfrac{1}{2}e^{-2x}$. On vérifie en dérivant : par exemple $F_3'(x) = -\\dfrac{1}{2} \\times (-2)e^{-2x} = e^{-2x}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Donne une primitive de chaque fonction sur $\\mathbb{R}$ : $g_1(x) = (2x + 1)(x^2 + x + 3)^4$ ; $g_2(x) = \\dfrac{3x}{x^2 + 1}$ ; $g_3(x) = xe^{x^2}$.",
            indice: "Repère $u$ : $x^2 + x + 3$, puis $x^2 + 1$, puis $x^2$. Compare $u'$ avec ce qui est devant.",
            corrige: "$g_1 = u'u^4$ avec $u = x^2 + x + 3$ : $G_1(x) = \\dfrac{(x^2 + x + 3)^5}{5}$. $g_2 = \\dfrac{3}{2} \\times \\dfrac{u'}{u}$ avec $u = x^2 + 1 > 0$ : $G_2(x) = \\dfrac{3}{2}\\ln(x^2 + 1)$. $g_3 = \\dfrac{1}{2}u'e^u$ avec $u = x^2$ : $G_3(x) = \\dfrac{1}{2}e^{x^2}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Détermine la primitive $F$ de $f(x) = 6x^2 - 2x + 1$ telle que $F(1) = 4$.",
            indice: "Écris toutes les primitives $F(x) = \\ldots + C$, puis utilise $F(1) = 4$.",
            corrige: "Les primitives de $f$ sont $F(x) = 2x^3 - x^2 + x + C$. Puis $F(1) = 2 - 1 + 1 + C = 2 + C = 4$, donc $C = 2$ et $F(x) = 2x^3 - x^2 + x + 2$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Démontre que $F(x) = (x^2 - 2x + 2)e^x$ est une primitive de $f(x) = x^2e^x$ sur $\\mathbb{R}$.",
            indice: "Dérive $F$ comme un produit.",
            corrige: "$F'(x) = (2x - 2)e^x + (x^2 - 2x + 2)e^x = (x^2 - 2x + 2 + 2x - 2)e^x = x^2e^x = f(x)$."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « une primitive de $h(x) = 2xe^x$ est $x^2e^x$ ». Justifie.",
            indice: "Dérive $x^2e^x$.",
            corrige: "**Faux.** La dérivée de $x^2e^x$ est $2xe^x + x^2e^x$, qui n'est pas $h(x)$. Une primitive d'un produit n'est pas le produit des primitives (une primitive de $h$ est $(2x - 2)e^x$)."
          }
        ]
      },
      {
        titre: "D'une courbe à sa primitive",
        duree: 30, points: 7, calculatrice: true,
        contexte: "On a tracé ci-dessous la courbe de la fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = (1 - x)e^x$. On note $F$ la primitive de $f$ sur $\\mathbb{R}$ qui s'annule en $0$.",
        figure: (o) => o.graph({
          xmin: -3.5, xmax: 2, ymin: -3.2, ymax: 1.8, xstep: 0.5, ystep: 0.5, xetiq: 1, yetiq: 1, h: 280,
          curves: [{ f: (x) => (1 - x) * Math.exp(x), a: -3.5, b: 1.6, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: -2.6, dx: 0, dy: -8 }],
          points: [{ x: 1, y: 0, label: "1" }],
          aria: "Courbe de f(x) = (1 − x)e^x : positive avant 1, nulle en 1, négative après ; maximum 1 en x = 0"
        }),
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "D'après la courbe, quel est le signe de $f(x)$ ? Déduis-en les variations de $F$.",
            indice: "$F' = f$ : $F$ est croissante là où $f$ est positive.",
            corrige: "La courbe est au-dessus de l'axe des abscisses pour $x < 1$ et en dessous pour $x > 1$ : $f(x) > 0$ sur $]-\\infty\\,;1[$ et $f(x) < 0$ sur $]1\\,;+\\infty[$. Comme $F' = f$, $F$ est croissante sur $]-\\infty\\,;1]$ et décroissante sur $[1\\,;+\\infty[$ : elle a un maximum en $1$."
          },
          {
            n: "2.", points: 1.5,
            texte: "D'après la courbe, sur quel intervalle $f$ est-elle croissante ? Déduis-en la convexité de $F$.",
            indice: "$F'' = f'$ : $F$ est convexe là où $f$ est croissante.",
            corrige: "$f$ semble croissante sur $]-\\infty\\,;0]$ et décroissante sur $[0\\,;+\\infty[$. Comme $F'' = f'$, $F$ est convexe sur $]-\\infty\\,;0]$ et concave sur $[0\\,;+\\infty[$ : la courbe de $F$ a un point d'inflexion d'abscisse $0$. Par le calcul, $f'(x) = -xe^x$, ce qui confirme la lecture."
          },
          {
            n: "3.", points: 1.5,
            texte: "Démontre que $F(x) = (2 - x)e^x - 2$.",
            indice: "Vérifie que $(2 - x)e^x - 2$ a pour dérivée $f$ et s'annule en $0$ : c'est alors l'unique primitive qui convient.",
            corrige: "La dérivée de $(2 - x)e^x - 2$ est $-e^x + (2 - x)e^x = (1 - x)e^x = f(x)$, et sa valeur en $0$ est $2 - 2 = 0$. Comme une seule primitive de $f$ s'annule en $0$, c'est $F$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Quel est le maximum de $F$ ? Donne sa valeur exacte, puis une valeur approchée au centième.",
            indice: "D'après la question 1, il est atteint en $1$.",
            corrige: "Le maximum est $F(1) = (2 - 1)e - 2 = e - 2 \\approx 0{,}72$."
          },
          {
            n: "5.", points: 1,
            texte:
              "Que va afficher ce programme ? Pourquoi le résultat ne dépend-il pas de la primitive choisie ?\n\n" +
              "```python\nfrom math import exp\n\ndef G(x):\n    return (2 - x) * exp(x)\n\nprint(G(1) - G(0))\n```",
            indice: "$G$ est une autre primitive de $f$ : $G = F + 2$.",
            corrige: "Il affiche $G(1) - G(0) = e - 2 \\approx 0{,}718$. Comme $G = F + 2$, $G(1) - G(0) = F(1) - F(0)$ : la constante s'élimine. Ce nombre sera, au chapitre 13, l'intégrale de $f$ entre $0$ et $1$."
          }
        ]
      },
      {
        titre: "Une équation différentielle et la méthode d'Euler",
        duree: 20, points: 6, calculatrice: true,
        contexte: "On s'intéresse à l'équation différentielle $(E) : y' = 2x + e^{-x}$ sur $\\mathbb{R}$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine toutes les solutions de $(E)$.",
            indice: "Les solutions de $y' = f$ sont les primitives de $f$ ; une primitive de $e^{-x}$ est $-e^{-x}$.",
            corrige: "Les solutions sont les primitives de $x \\mapsto 2x + e^{-x}$ : $y(x) = x^2 - e^{-x} + C$, avec $C$ réel."
          },
          {
            n: "2.", points: 1.5,
            texte: "Détermine la solution $g$ de $(E)$ telle que $g(0) = 1$, puis la valeur exacte de $g(1)$.",
            indice: "$g(0) = 0 - 1 + C$.",
            corrige: "$g(0) = -1 + C = 1$, donc $C = 2$ et $g(x) = x^2 - e^{-x} + 2$. Puis $g(1) = 3 - e^{-1} \\approx 2{,}632$."
          },
          {
            n: "3.", points: 1.5,
            texte:
              "Ce programme applique la méthode d'Euler avec $n$ pas de longueur $h = \\dfrac{1}{n}$. Explique la ligne $\\texttt{y = y + h * f(x)}$. Que renvoie à peu près $\\texttt{euler(10)}$ ?\n\n" +
              "```python\nfrom math import exp\n\ndef f(x):\n    return 2*x + exp(-x)\n\ndef euler(n):\n    h = 1 / n\n    x = 0\n    y = 1\n    for k in range(n):\n        y = y + h * f(x)\n        x = x + h\n    return y\n```",
            indice: "$f(x)$ est la pente de la tangente à la courbe de la solution au point d'abscisse $x$. Fais tourner le programme à la calculatrice ou en Python.",
            corrige: "La ligne utilise $g(x + h) \\approx g(x) + h \\times g'(x)$, avec $g'(x) = f(x)$ : on avance de $h$ en suivant la tangente. $\\texttt{euler(10)}$ renvoie environ $2{,}564$, une valeur approchée de $g(1) \\approx 2{,}632$."
          },
          {
            n: "4.", points: 1.5,
            texte: "On obtient $\\texttt{euler(100)} \\approx 2{,}625$ et $\\texttt{euler(1000)} \\approx 2{,}631$. Comment évolue l'erreur ? Pourquoi les valeurs sont-elles en dessous de $g(1)$ ?",
            indice: "Compare chaque valeur à $g(1) \\approx 2{,}632$. Pense à la convexité de $g$ : $g''(x) = 2 + e^{-x} > 0$.",
            corrige: "Les erreurs valent environ $0{,}068$, $0{,}007$ puis $0{,}0007$ : quand le pas est divisé par $10$, l'erreur l'est aussi, à peu près. Comme $g'' > 0$, $g$ est convexe : sa courbe est au-dessus de ses tangentes, donc chaque pas d'Euler, qui suit une tangente, donne une valeur trop petite."
          }
        ]
      }
    ]
  }
};
