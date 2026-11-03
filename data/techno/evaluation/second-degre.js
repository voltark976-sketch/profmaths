/*
  ENTRAÎNEMENT : Première technologique — chapitre 8, Fonctions polynômes de degré 2
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre techno-second-degre.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Programme 2026 de première technologique : pas de discriminant ; symétrie, forme factorisée, racine évidente.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  const f1 = (x) => x * x - 4, f2 = (x) => -(x - 1) * (x - 5), f3 = (x) => 0.5 * x * x; // paraboles de l'exercice 3
  const C = (k) => `C<tspan class="sub" dy="3">${k}</tspan>`;

  window.EVALUATIONS["techno-second-degre"] = {
    revisions: {
      intro: "Les polynômes de degré 2 en un coup d'œil : orientation de la parabole, axe et sommet par la symétrie, forme factorisée, racines, signe et modélisation, sans discriminant. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "La parabole",
          texte: "La courbe de $f(x) = ax^2 + bx + c$, avec $a \\neq 0$, est une parabole : tournée vers le haut si $a > 0$ (elle a un minimum), vers le bas si $a < 0$ (elle a un maximum)."
        },
        {
          titre: "Axe et sommet",
          texte: "L'axe de symétrie passe au **milieu** de deux points de même ordonnée, par exemple des deux racines. Le sommet est sur cet axe, et son ordonnée est le minimum ou le maximum."
        },
        {
          titre: "Forme factorisée",
          texte: "$f(x) = a(x - x_1)(x - x_2)$ : les racines sont $x_1$ et $x_2$. $f(x)$ a le signe de $a$ à l'extérieur des racines, et le signe contraire entre elles."
        },
        {
          titre: "Racine évidente",
          texte: "$1$ est racine de $x^2 + 4x - 5$, car $1 + 4 - 5 = 0$. On cherche alors $x^2 + 4x - 5 = (x - 1)(x - k)$ : en développant, le terme constant est $k$, donc $k = -5$, et $x^2 + 4x - 5 = (x - 1)(x + 5)$."
        },
        {
          titre: "Formes à reconnaître",
          texte:
            "- $ax^2$ : le sommet est l'origine ;\n" +
            "- $ax^2 + c$ : le sommet est $(0\\,;c)$, l'axe des ordonnées est l'axe de symétrie ;\n" +
            "- $a(x - x_1)(x - x_2)$ : la parabole coupe l'axe des abscisses en $x_1$ et $x_2$."
        },
        {
          titre: "Modéliser",
          texte: "Trajectoire, aire d'un rectangle de périmètre fixé, bénéfice : le maximum se lit au sommet, et on ne garde que les solutions qui ont un sens (longueur ou durée positive)."
        }
      ],
      pieges: [
        "Lire les racines avec le mauvais signe : $(x + 3)$ s'annule en $-3$, pas en $3$.",
        "Placer le sommet sur une racine : il est au **milieu** des racines.",
        "Confondre l'abscisse du sommet (l'axe de symétrie) et son ordonnée (l'extremum).",
        "Oublier le coefficient $a$ : $2(x - 1)(x - 3)$ n'est pas $(x - 1)(x - 3)$.",
        "Dire « positif entre les racines » sans regarder le signe de $a$.",
        "Vouloir utiliser le discriminant : la forme factorisée ou une racine évidente suffit."
      ]
    },

    evaluation: {
      intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Une forme factorisée",
          duree: 25, points: 7, calculatrice: false,
          contexte: "On considère la fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = 2(x + 1)(x - 3)$.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Donne les racines de $f$ et l'orientation de sa parabole.",
              indice: "Un produit est nul si l'un de ses facteurs est nul. Regarde le signe de $a = 2$.",
              corrige: "$f(x) = 0 \\iff x + 1 = 0$ ou $x - 3 = 0$ : les racines sont $-1$ et $3$. Comme $a = 2 > 0$, la parabole est tournée vers le haut."
            },
            {
              n: "2.", points: 1.5,
              texte: "Détermine l'axe de symétrie et le sommet de la parabole, puis le tableau de variations de $f$.",
              indice: "L'axe passe au milieu des racines : $\\dfrac{-1 + 3}{2}$.",
              corrige: "L'axe de symétrie est la droite d'équation $x = 1$, au milieu de $-1$ et $3$. Et $f(1) = 2 \\times 2 \\times (-2) = -8$ : le sommet est $S(1\\,;-8)$.\n\n$f$ est décroissante sur $]-\\infty\\,;1]$, puis croissante sur $[1\\,;+\\infty[$ ; son minimum est $-8$."
            },
            {
              n: "3.", points: 1.5,
              texte: "Développe $f(x)$, puis calcule $f(0)$ de deux façons.",
              indice: "Développe d'abord $(x + 1)(x - 3)$, puis multiplie par $2$.",
              corrige: "$(x + 1)(x - 3) = x^2 - 3x + x - 3 = x^2 - 2x - 3$, donc $f(x) = 2x^2 - 4x - 6$.\n\nAvec la forme développée, $f(0) = -6$ ; avec la forme factorisée, $f(0) = 2 \\times 1 \\times (-3) = -6$."
            },
            {
              n: "4.", points: 1.5,
              texte: "Dresse le tableau de signes de $f(x)$, puis résous l'inéquation $f(x) \\leqslant 0$.",
              indice: "$a > 0$ : $f(x)$ est positif à l'extérieur des racines.",
              corrige: "$f(x)$ a le signe de $a = 2$, positif, à l'extérieur des racines, et il est négatif entre elles. Donc $f(x) \\leqslant 0 \\iff x \\in [-1\\,;3]$ (les racines sont incluses).",
              tableauCorrige: { lignes: [["x", "-\\infty", "", "-1", "", "3", "", "+\\infty"], ["x + 1", "", "-", "0", "+", "", "+", ""], ["x - 3", "", "-", "", "-", "0", "+", ""], ["f(x)", "", "+", "0", "-", "0", "+", ""]] }
            },
            {
              n: "5.", points: 1,
              texte: "Vrai ou faux : « Le sommet de la parabole est le point $(-1\\,;0)$. » Justifie.",
              indice: "Le point $(-1\\,;0)$ est-il au milieu des racines ?",
              corrige: "**Faux.** $(-1\\,;0)$ est un point où la parabole coupe l'axe des abscisses. Le sommet est au milieu des racines : c'est $(1\\,;-8)$."
            }
          ]
        },
        {
          titre: "Le plus grand enclos",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Avec $24$ m de grillage, un éleveur veut entourer un enclos rectangulaire pour ses chèvres. On note $x$ la largeur de l'enclos, en mètres, avec $0 < x < 12$.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Montre que la longueur de l'enclos vaut $12 - x$, puis que son aire est $A(x) = x(12 - x)$.",
              indice: "Le périmètre vaut $2 \\times (\\text{largeur} + \\text{longueur}) = 24$.",
              corrige: "$2(x + L) = 24$, donc $x + L = 12$ et $L = 12 - x$. L'aire est largeur fois longueur : $A(x) = x(12 - x)$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Donne les racines de $A$. Déduis-en l'axe de symétrie de la parabole, puis l'aire maximale et les dimensions de l'enclos correspondant.",
              indice: "$A(x) = 0$ pour $x = 0$ ou $x = 12$. La parabole est tournée vers le bas.",
              corrige: "$A$ s'annule en $0$ et en $12$ : l'axe de symétrie est la droite d'équation $x = 6$. Comme $A(x) = -x^2 + 12x$, avec $a = -1 < 0$, l'aire est maximale en $x = 6$ : $A(6) = 6 \\times 6 = 36$ m². L'enclos est alors un carré de $6$ m de côté."
            },
            {
              n: "3.", points: 1.5,
              texte: "L'éleveur veut une aire d'au moins $32$ m². Montre que cela revient à $x^2 - 12x + 32 \\leqslant 0$, puis vérifie que $4$ est une racine de $x^2 - 12x + 32$.",
              indice: "Développe $x(12 - x) \\geqslant 32$, puis passe tout dans le même membre.",
              corrige: "$x(12 - x) \\geqslant 32 \\iff 12x - x^2 - 32 \\geqslant 0 \\iff x^2 - 12x + 32 \\leqslant 0$, en changeant tous les signes.\n\nPour $x = 4$ : $16 - 48 + 32 = 0$, donc $4$ est une racine."
            },
            {
              n: "4.", points: 1.5,
              texte: "Factorise $x^2 - 12x + 32$, puis résous l'inéquation $x^2 - 12x + 32 \\leqslant 0$.",
              indice: "Cherche $x^2 - 12x + 32 = (x - 4)(x - k)$ : le terme constant vaut $4k$.",
              corrige: "En développant $(x - 4)(x - k)$, le terme constant est $4k = 32$, donc $k = 8$ : $x^2 - 12x + 32 = (x - 4)(x - 8)$ (on vérifie : $-4x - 8x = -12x$).\n\nAvec $a = 1 > 0$, ce produit est négatif ou nul entre les racines : $S = [4\\,;8]$."
            },
            {
              n: "5.", points: 1,
              texte: "Conclus : quelles largeurs l'éleveur peut-il choisir ? Donne un exemple d'enclos qui convient.",
              indice: "Reviens au contexte : $x$ est une largeur comprise entre $0$ et $12$.",
              corrige: "Toute largeur entre $4$ m et $8$ m donne une aire d'au moins $32$ m². Par exemple, un enclos de $4$ m sur $8$ m a exactement $32$ m², et le carré de $6$ m de côté en a $36$."
            }
          ]
        },
        {
          titre: "Trois paraboles",
          duree: 25, points: 6, calculatrice: false,
          contexte: "On a tracé les courbes $\\mathcal{C}_1$, $\\mathcal{C}_2$ et $\\mathcal{C}_3$ de trois fonctions : $f(x) = x^2 - 4$, $g(x) = -(x - 1)(x - 5)$ et $h(x) = 0{,}5x^2$, dans le désordre.",
          figure: (o) => o.graph({
            xmin: -4.2, xmax: 6.4, ymin: -5, ymax: 7.6, xstep: 1, ystep: 1, yetiq: 2, h: 320,
            curves: [
              { f: f1, a: -3.3, b: 3.3, label: C(1), lx: -2.6, dx: -10, dy: 0 },
              { f: f2, a: 0.25, b: 5.75, label: C(2), lx: 5.6, dx: 20, dy: 6 },
              { f: f3, a: -3.85, b: 3.85, label: C(3), lx: 3.7, dx: 20, dy: 4 }
            ],
            points: [{ x: -2, y: 0, label: "−2", gauche: true }, { x: 2, y: 0, label: "2" }, { x: 1, y: 0, label: "1", gauche: true }, { x: 5, y: 0, label: "5" }], // nombres de l'axe cachés par les courbes
            aria: "Trois paraboles : C1 tournée vers le haut, de sommet (0 ; −4), qui coupe l'axe des abscisses en −2 et 2 ; C2 tournée vers le bas, de sommet (3 ; 4), qui coupe l'axe des abscisses en 1 et 5 ; C3 tournée vers le haut, de sommet à l'origine"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Associe chaque fonction à sa courbe, en justifiant.",
              indice: "Regarde l'orientation de chaque parabole et la position de son sommet.",
              corrige: "$g$ a un coefficient $a = -1 < 0$ : c'est la seule parabole tournée vers le bas, $\\mathcal{C}_2$, qui coupe bien l'axe des abscisses en $1$ et $5$.\n\n$h(0) = 0$ : $\\mathcal{C}_3$ passe par l'origine. $f(0) = -4$ : $\\mathcal{C}_1$ a pour sommet $(0\\,;-4)$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Donne le sommet de la parabole de $g$, puis les valeurs de $x$ pour lesquelles $g(x) > 0$.",
              indice: "L'axe de symétrie passe au milieu de $1$ et $5$.",
              corrige: "L'axe est la droite d'équation $x = 3$ et $g(3) = -(2)(-2) = 4$ : le sommet est $(3\\,;4)$. Comme $a < 0$, $g(x)$ est positif entre les racines : $g(x) > 0 \\iff x \\in ]1\\,;5[$."
            },
            {
              n: "3.", points: 1.5,
              texte: "Factorise $f(x)$, puis résous $f(x) = 0$ et $f(x) < 0$.",
              indice: "$x^2 - 4 = x^2 - 2^2$.",
              corrige: "$f(x) = (x - 2)(x + 2)$ : $f(x) = 0 \\iff x = 2$ ou $x = -2$. Avec $a = 1 > 0$, $f(x)$ est négatif entre les racines : $f(x) < 0 \\iff x \\in ]-2\\,;2[$."
            },
            {
              n: "4.", points: 1.5,
              texte:
                "Qu'affiche ce programme ? Trouverait-il les racines de n'importe quel polynôme de degré 2 ?\n\n" +
                "```python\ndef g(x):\n    return -(x - 1)*(x - 5)\n\nR = []\nfor x in range(-10, 11):\n    if g(x) == 0:\n        R.append(x)\nprint(R)\n```",
              indice: "$\\texttt{range(-10, 11)}$ donne les entiers de $-10$ à $10$.",
              corrige: "Il teste les entiers de $-10$ à $10$ et garde ceux qui annulent $g$ : il affiche $\\texttt{[1, 5]}$.\n\nIl ne trouverait pas toutes les racines : seulement les racines entières entre $-10$ et $10$. Par exemple, les racines de $x^2 - 2$ ne sont pas entières."
            }
          ]
        }
      ]
    }
  };
})();
