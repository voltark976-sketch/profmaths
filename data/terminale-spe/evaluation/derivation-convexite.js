/*
  ENTRAÎNEMENT : Terminale spécialité — chapitre 2, Dérivation et convexité
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-spe-derivation-convexite.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit du bac.
  Les limites viennent aux chapitres 4 et 6 : les études de fonctions s'en passent ici.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-spe-derivation-convexite"] = {
  revisions: {
    intro: "La dérivation et la convexité en un coup d'œil : fonctions composées, dérivée seconde, convexité, point d'inflexion et inégalités. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Fonction composée",
        texte: "$(v \\circ u)(x) = v(u(x))$ : on applique **d'abord** $u$, **puis** $v$. En général, $v \\circ u$ et $u \\circ v$ sont différentes."
      },
      {
        titre: "Dériver une composée",
        texte: "$(v \\circ u)' = u' \\times (v' \\circ u)$. À connaître : $(u^n)' = n\\,u'\\,u^{n-1}$ ; $(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$ si $u > 0$ ; $(e^u)' = u'\\,e^u$ ; $\\left(\\dfrac{1}{u}\\right)' = -\\dfrac{u'}{u^2}$."
      },
      {
        titre: "Dérivée seconde",
        texte: "$f'' = (f')'$. La dérivée $f'$ donne les variations de $f$ ; la dérivée seconde $f''$ dit comment les pentes évoluent, donc la forme de la courbe."
      },
      {
        titre: "Convexité",
        texte: "Pour $f$ deux fois dérivable sur $I$ : $f$ est convexe $\\iff$ $f'$ est croissante $\\iff$ $f'' \\geqslant 0$ sur $I$. La courbe est alors au-dessus de ses tangentes et en dessous de ses cordes. Concave : tout s'inverse."
      },
      {
        titre: "Point d'inflexion",
        texte: "La courbe y traverse sa tangente : la fonction change de convexité. Si $f''$ s'annule **en changeant de signe** en $a$, il y a un point d'inflexion d'abscisse $a$."
      },
      {
        titre: "Inégalités de convexité",
        texte: "On justifie la convexité, on écrit la tangente, puis on conclut. Exemples : $e^x \\geqslant x + 1$ pour tout réel $x$ ; $\\sqrt{x} \\leqslant \\dfrac{x + 1}{2}$ pour $x \\geqslant 0$."
      },
      {
        titre: "Dérivées approchées",
        texte: "Pour $h$ petit, $\\dfrac{f(a + h) - f(a)}{h} \\approx f'(a)$ et $\\dfrac{f(a + h) - 2f(a) + f(a - h)}{h^2} \\approx f''(a)$ : un programme peut ainsi conjecturer la convexité."
      }
    ],
    pieges: [
      "Oublier de multiplier par $u'$ : $(e^{5x})' = 5e^{5x}$, pas $e^{5x}$.",
      "Confondre $v \\circ u$ et $u \\circ v$ : on applique d'abord $u$.",
      "Écrire $(\\sqrt{u})' = \\dfrac{1}{2\\sqrt{u}}$ sans le facteur $u'$.",
      "Confondre le rôle de $f'$ (variations) et celui de $f''$ (convexité).",
      "Conclure à un point d'inflexion dès que $f''(a) = 0$, sans vérifier le changement de signe.",
      "Lire la courbe de $f'$ comme si c'était celle de $f$."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit du bac (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Une étude complète",
        duree: 30, points: 7, calculatrice: true,
        contexte: "On considère la fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = (x + 1)e^{-x}$, et sa courbe $\\mathcal{C}$ dans un repère.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Démontre que $f'(x) = -xe^{-x}$, puis dresse le tableau de variations de $f$ sur $\\mathbb{R}$, sans les limites.",
            indice: "Dérivée d'un produit, avec $(e^{-x})' = -e^{-x}$. Le signe de $f'(x)$ est celui de $-x$, car $e^{-x} > 0$.",
            corrige: "$f'(x) = 1 \\times e^{-x} + (x + 1) \\times (-e^{-x}) = (1 - x - 1)e^{-x} = -xe^{-x}$. Comme $e^{-x} > 0$, $f'(x)$ a le signe de $-x$ : $f$ est croissante sur $]-\\infty\\,;0]$, décroissante sur $[0\\,;+\\infty[$, de maximum $f(0) = 1$.",
            tableauCorrige: { lignes: [["x", "-\\infty", "", "0", "", "+\\infty"], ["f'(x)", "", "+", "0", "-", ""], ["f(x)", "", "\\nearrow", "1", "\\searrow", ""]] }
          },
          {
            n: "2.", points: 1.5,
            texte: "Démontre que $f''(x) = (x - 1)e^{-x}$.",
            indice: "Dérive $f'(x) = -xe^{-x}$ comme un produit.",
            corrige: "$f''(x) = -1 \\times e^{-x} + (-x) \\times (-e^{-x}) = -e^{-x} + xe^{-x} = (x - 1)e^{-x}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Étudie la convexité de $f$. Montre que $\\mathcal{C}$ a un point d'inflexion $A$ et donne ses coordonnées exactes.",
            indice: "Le signe de $f''(x)$ est celui de $x - 1$.",
            corrige: "$f''(x)$ a le signe de $x - 1$ : $f$ est concave sur $]-\\infty\\,;1]$ et convexe sur $[1\\,;+\\infty[$. Comme $f''$ s'annule en changeant de signe en $1$, $\\mathcal{C}$ a un point d'inflexion $A\\left(1\\,;\\dfrac{2}{e}\\right)$, car $f(1) = 2e^{-1}$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Détermine une équation de la tangente $T$ à $\\mathcal{C}$ au point $A$.",
            indice: "$y = f'(1)(x - 1) + f(1)$, avec $f'(1) = -e^{-1}$.",
            corrige: "$y = -\\dfrac{1}{e}(x - 1) + \\dfrac{2}{e}$, soit $T : y = \\dfrac{3 - x}{e}$."
          },
          {
            n: "5.", points: 1,
            texte: "Déduis-en que, pour tout $x \\geqslant 1$, $(x + 1)e^{-x} \\geqslant \\dfrac{3 - x}{e}$.",
            indice: "Sur $[1\\,;+\\infty[$, $f$ est convexe : où est sa courbe par rapport à ses tangentes ?",
            corrige: "Sur $[1\\,;+\\infty[$, $f$ est convexe, donc sa courbe est au-dessus de ses tangentes, en particulier de $T$, tangente au point d'abscisse $1$ de cet intervalle. Ainsi $f(x) \\geqslant \\dfrac{3 - x}{e}$ pour tout $x \\geqslant 1$. (Sur $]-\\infty\\,;1]$, $f$ est concave et la courbe passe sous $T$ : elle traverse bien sa tangente en $A$.)"
          }
        ]
      },
      {
        titre: "Fonctions composées",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions 2 à 5 portent sur les fonctions $g(x) = \\sqrt{x^2 + 9}$ et $h(x) = e^{x^2 - 4x}$, définies sur $\\mathbb{R}$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Dérive les fonctions $g$ et $h$, ainsi que $k(x) = (3x - 2)^5$.",
            indice: "$(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$, $(e^u)' = u'e^u$ et $(u^n)' = n\\,u'\\,u^{n-1}$.",
            corrige: "$g'(x) = \\dfrac{2x}{2\\sqrt{x^2 + 9}} = \\dfrac{x}{\\sqrt{x^2 + 9}}$ ; $h'(x) = (2x - 4)e^{x^2 - 4x}$ ; $k'(x) = 5 \\times 3 \\times (3x - 2)^4 = 15(3x - 2)^4$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Étudie les variations de $h$ sur $\\mathbb{R}$ et donne son minimum.",
            indice: "$e^{x^2 - 4x} > 0$ : le signe de $h'(x)$ est celui de $2x - 4$.",
            corrige: "$h'(x)$ a le signe de $2x - 4$ : $h$ est décroissante sur $]-\\infty\\,;2]$ et croissante sur $[2\\,;+\\infty[$. Son minimum est $h(2) = e^{4 - 8} = e^{-4}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "On pose $u(x) = x^2 - 4x$ et $v(x) = e^x$, de sorte que $h = v \\circ u$. Calcule $(v \\circ u)(0)$ et $(u \\circ v)(0)$. Que remarques-tu ?",
            indice: "$(u \\circ v)(0) = u(v(0)) = u(1)$.",
            corrige: "$(v \\circ u)(0) = v(u(0)) = v(0) = 1$, alors que $(u \\circ v)(0) = u(v(0)) = u(1) = 1 - 4 = -3$. L'ordre compte : $v \\circ u \\neq u \\circ v$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Démontre que $g''(x) = \\dfrac{9}{(x^2 + 9)\\sqrt{x^2 + 9}}$. Déduis-en la convexité de $g$.",
            indice: "Dérive le quotient $g'(x) = \\dfrac{x}{\\sqrt{x^2 + 9}}$, puis multiplie le numérateur et le dénominateur par $\\sqrt{x^2 + 9}$.",
            corrige: "$g''(x) = \\dfrac{\\sqrt{x^2 + 9} - x \\times \\frac{x}{\\sqrt{x^2 + 9}}}{x^2 + 9} = \\dfrac{(x^2 + 9) - x^2}{(x^2 + 9)\\sqrt{x^2 + 9}} = \\dfrac{9}{(x^2 + 9)\\sqrt{x^2 + 9}}$. Ce nombre est strictement positif : $g$ est convexe sur $\\mathbb{R}$."
          },
          {
            n: "5.", points: 1,
            texte: "Écris l'équation de la tangente à la courbe de $g$ au point d'abscisse $4$. Déduis-en que $\\sqrt{x^2 + 9} \\geqslant 0{,}8x + 1{,}8$ pour tout réel $x$.",
            indice: "$g(4) = 5$ et $g'(4) = \\dfrac{4}{5}$. Une fonction convexe est au-dessus de ses tangentes.",
            corrige: "$y = \\dfrac{4}{5}(x - 4) + 5 = 0{,}8x + 1{,}8$. Comme $g$ est convexe sur $\\mathbb{R}$, sa courbe est au-dessus de cette tangente : $\\sqrt{x^2 + 9} \\geqslant 0{,}8x + 1{,}8$ pour tout réel $x$."
          }
        ]
      },
      {
        titre: "Lire la courbe de la dérivée",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Une fonction $f$ est définie et deux fois dérivable sur $[-2\\,;4]$. On a tracé ci-dessous la courbe de sa **dérivée** $f'$.",
        figure: (o) => o.graph({
          xmin: -2.5, xmax: 4.5, ymin: -4.5, ymax: 5.5, h: 300,
          curves: [{ f: (x) => x * x - 2 * x - 3, a: -2, b: 4, label: "C<tspan class=\"sub\" dy=\"3\">f′</tspan>", lx: 3.7, dx: -12, dy: -4 }],
          points: [{ x: -1, y: 0, label: "−1", gauche: true }, { x: 3, y: 0, label: "3" }],
          aria: "Courbe de la dérivée f' : une parabole qui coupe l'axe des abscisses en −1 et 3, de minimum −4 en x = 1"
        }),
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Lis le signe de $f'(x)$ et déduis-en les variations de $f$ sur $[-2\\,;4]$.",
            indice: "Attention : c'est la courbe de $f'$. Là où elle est au-dessus de l'axe des abscisses, $f'(x) > 0$.",
            corrige: "La courbe de $f'$ coupe l'axe des abscisses en $-1$ et en $3$ : $f'(x) \\geqslant 0$ sur $[-2\\,;-1]$ et sur $[3\\,;4]$, $f'(x) \\leqslant 0$ sur $[-1\\,;3]$. Donc $f$ est croissante sur $[-2\\,;-1]$, décroissante sur $[-1\\,;3]$, puis croissante sur $[3\\,;4]$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Lis les variations de $f'$ et déduis-en la convexité de $f$. La courbe de $f$ a-t-elle un point d'inflexion ?",
            indice: "$f$ est convexe là où $f'$ est croissante.",
            corrige: "$f'$ est décroissante sur $[-2\\,;1]$ et croissante sur $[1\\,;4]$ : $f$ est concave sur $[-2\\,;1]$ et convexe sur $[1\\,;4]$. Elle change de convexité en $1$ : la courbe de $f$ a un point d'inflexion d'abscisse $1$."
          },
          {
            n: "3.", points: 1.5,
            texte: "On admet que $f(x) = \\dfrac{x^3}{3} - x^2 - 3x + 1$. Calcule $f'(x)$ et $f''(x)$, puis confirme les résultats des questions 1 et 2.",
            indice: "$f''$ est une fonction affine : étudie son signe.",
            corrige: "$f'(x) = x^2 - 2x - 3 = (x + 1)(x - 3)$, qui s'annule bien en $-1$ et en $3$. Puis $f''(x) = 2x - 2$, négatif avant $1$ et positif après : $f$ est concave puis convexe, avec un point d'inflexion d'abscisse $1$."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Que renvoient environ $\\texttt{seconde(0)}$ et $\\texttt{seconde(3)}$ ? Qu'en déduis-tu ?\n\n" +
              "```python\ndef f(x):\n    a = x**3 / 3 - x**2\n    return a - 3*x + 1\n\ndef seconde(a):\n    h = 0.001\n    s = f(a + h) + f(a - h)\n    return (s - 2*f(a))/h**2\n```",
            indice: "$\\texttt{seconde(a)}$ est une valeur approchée de $f''(a)$.",
            corrige: "La fonction approche $f''(a) = 2a - 2$ : $\\texttt{seconde(0)}$ renvoie environ $-2$ et $\\texttt{seconde(3)}$ environ $4$. La dérivée seconde change de signe entre $0$ et $3$ : c'est cohérent avec le point d'inflexion d'abscisse $1$."
          }
        ]
      }
    ]
  }
};
