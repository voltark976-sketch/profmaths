/*
  ENTRAÎNEMENT : Première spécialité — chapitre 2, Second degré 1 : forme factorisée
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-second-degre.
  Format : voir data/premiere/evaluation/second-degre-2.js. Sans calculatrice (épreuve anticipée).
  Pas de discriminant ici (chapitre 5) : racines lues, racine évidente, somme et produit des racines.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-second-degre"] = {
  revisions: {
    intro: "La forme factorisée en un coup d'œil : lire les racines, trouver le signe, factoriser sans calcul et retrouver une fonction. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Forme factorisée",
        texte:
          "$f(x) = a(x - x_1)(x - x_2)$, avec $a \\neq 0$ : les **racines** de $f$ sont $x_1$ et $x_2$, là où la parabole coupe l'axe des abscisses.\n\n" +
          "La parabole est tournée vers le haut si $a > 0$, vers le bas si $a < 0$."
      },
      {
        titre: "Lire les racines",
        texte: "On cherche ce qui annule chaque parenthèse : dans $2(x - 1)(x + 3)$, les racines sont $1$ et $-3$ (et non $3$)."
      },
      {
        titre: "Signe",
        texte: "$a(x - x_1)(x - x_2)$ est **du signe de $a$ à l'extérieur** des racines, du signe contraire entre elles.",
        figure: (o) => o.graph({
          xmin: -2.6, xmax: 4.6, ymin: -2.8, ymax: 3, h: 200, xetiq: 10, yetiq: 10,
          curves: [{ f: (x) => -0.5 * (x + 1) * (x - 3), a: -2.2, b: 4.2, closed: false }],
          points: [{ x: -1, y: 0, label: "x₁", gauche: true }, { x: 3, y: 0, label: "x₂" }],
          marques: [
            { x: -2, y: -1.6, texte: "<tspan style=\"font-size:22px;fill:var(--faux)\">−</tspan>" },
            { x: 1, y: 0.6, texte: "<tspan style=\"font-size:22px;fill:var(--bon)\">+</tspan>" },
            { x: 4, y: -1.6, texte: "<tspan style=\"font-size:22px;fill:var(--faux)\">−</tspan>" }
          ],
          aria: "Parabole tournée vers le bas (a négatif) : le trinôme est négatif à l'extérieur des racines x1 et x2, positif entre elles"
        })
      },
      {
        titre: "Somme et produit des racines",
        texte:
          "Pour $ax^2 + bx + c$ de racines $x_1$ et $x_2$ :\n\n" +
          "$x_1 + x_2 = -\\dfrac{b}{a}$ et $x_1 x_2 = \\dfrac{c}{a}$.\n\n" +
          "Deux nombres de somme $s$ et de produit $p$ sont les racines de $x^2 - sx + p$."
      },
      {
        titre: "Racine évidente",
        texte:
          "On teste $1$, $-1$, $2$… Puis le produit donne l'autre racine.\n\n" +
          "$3x^2 - 7x + 4$ : $1$ est racine, et $x_1 x_2 = \\dfrac{4}{3}$, donc l'autre racine est $\\dfrac{4}{3}$."
      },
      {
        titre: "Factoriser directement",
        texte:
          "- pas de terme en $x$ : $3x^2 - 12 = 3(x - 2)(x + 2)$ ;\n" +
          "- pas de terme constant : $x^2 - 7x = x(x - 7)$ ;\n" +
          "- identité remarquable : $4x^2 + 12x + 9 = (2x + 3)^2$."
      },
      {
        titre: "Retrouver la fonction",
        texte:
          "Racines $-1$ et $4$ : $f(x) = a(x + 1)(x - 4)$. Un point connu donne $a$.\n\n" +
          "Si $f(0) = 8$ : $a \\times 1 \\times (-4) = 8$, donc $a = -2$."
      },
      {
        titre: "Identité ou équation ?",
        texte: "Une **identité** est vraie pour tout $x$ : $(x - 3)(x + 3) = x^2 - 9$. Une **équation** n'est vraie que pour certaines valeurs : $x^2 - 9 = 0$. Un seul contre-exemple suffit pour réfuter une identité."
      }
    ],
    pieges: [
      "Lire la racine $3$ dans $(x + 3)$ : c'est $-3$ qui annule la parenthèse.",
      "Oublier le coefficient $a$ en développant $a(x - x_1)(x - x_2)$.",
      "Diviser une équation par $x$ et perdre la solution $x = 0$.",
      "Oublier le signe de $a$ dans le tableau de signes : avec $a < 0$, tout s'inverse.",
      "Inclure les racines dans la solution d'une inéquation stricte.",
      "Écrire $(x + 2)^2 = x^2 + 4$ : il manque le double produit $4x$."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "L'arche de la passerelle",
        duree: 25, points: 7, calculatrice: false,
        contexte:
          "Une passerelle en arc enjambe une rivière de Tsingoni. Dans un repère dont l'unité est le mètre, l'arche est la courbe de la fonction $f$ définie sur $[0\\,;8]$ par :\n\n" +
          "$f(x) = -0{,}25x(x - 8)$,\n\n" +
          "où $x$ est la distance au pied gauche de l'arche et $f(x)$ la hauteur de l'arche au-dessus de l'eau.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "En quels points l'arche touche-t-elle l'eau ? Quelle est sa largeur au niveau de l'eau ?",
            indice: "Cherche les racines de $f$ : quelles valeurs de $x$ annulent un des facteurs ?",
            corrige: "$f(x) = 0 \\iff x = 0$ ou $x - 8 = 0$, c'est-à-dire $x = 0$ ou $x = 8$. L'arche touche l'eau à ses deux pieds, distants de $8$ m : elle est large de $8$ m."
          },
          {
            n: "2.", points: 1,
            texte: "Donne la forme développée de $f(x)$.",
            indice: "Développe $x(x - 8)$, puis multiplie par $-0{,}25$.",
            corrige: "$f(x) = -0{,}25(x^2 - 8x) = -0{,}25x^2 + 2x$."
          },
          {
            n: "3.", points: 1,
            texte: "Calcule la hauteur de l'arche à $1$ m du pied gauche, puis en son milieu.",
            indice: "Le milieu de l'arche est à $4$ m du pied gauche. La forme factorisée rend le calcul rapide.",
            corrige: "$f(1) = -0{,}25 \\times 1 \\times (-7) = 1{,}75$ et $f(4) = -0{,}25 \\times 4 \\times (-4) = 4$. L'arche mesure $1{,}75$ m de haut à $1$ m du pied gauche et $4$ m en son milieu."
          },
          {
            n: "4.", points: 1.5,
            texte: "Montre que, pour tout réel $x$, $f(x) - 3 = -0{,}25(x - 2)(x - 6)$. Déduis-en où l'arche est à au moins $3$ m au-dessus de l'eau.",
            indice: "Développe $-0{,}25(x - 2)(x - 6)$ et compare avec $f(x) - 3$. Puis étudie le signe : $a = -0{,}25 < 0$.",
            corrige:
              "$-0{,}25(x - 2)(x - 6) = -0{,}25(x^2 - 8x + 12) = -0{,}25x^2 + 2x - 3 = f(x) - 3$.\n\n" +
              "Ce trinôme a pour racines $2$ et $6$ et un coefficient $-0{,}25 < 0$ : il est positif ou nul entre ses racines. Donc $f(x) \\geqslant 3 \\iff x \\in [2\\,;6]$ : l'arche est à au moins $3$ m entre $2$ m et $6$ m du pied gauche."
          },
          {
            n: "5.", points: 1.5,
            texte: "Une barque large de $2{,}5$ m, dont le toit est à $3$ m au-dessus de l'eau, peut-elle passer sous l'arche ? Explique.",
            indice: "La barque doit rester là où l'arche est à au moins $3$ m de haut. Quelle est la largeur de cette zone ?",
            corrige:
              "D'après la question 4, l'arche est à au moins $3$ m sur la zone $[2\\,;6]$, large de $4$ m. Comme $2{,}5 < 4$, la barque peut passer en restant dans cette zone, par exemple entre $x = 2{,}75$ et $x = 5{,}25$, bien au milieu.",
            figureCorrige: (o) => o.graph({
              xmin: -0.6, xmax: 8.6, ymin: -0.6, ymax: 4.8, h: 230,
              hlines: [{ y: 3, label: "y = 3" }],
              curves: [{ f: (x) => -0.25 * x * (x - 8), a: 0, b: 8, label: "arche", lx: 7.2, dx: 40, dy: -4 }],
              rects: [{ a: 2.75, b: 5.25, h: 3 }],
              aria: "L'arche au-dessus de l'eau, la droite y = 3 qui la coupe en x = 2 et x = 6, et la barque de 2,5 m de large et 3 m de haut placée au milieu"
            })
          },
          {
            n: "6.", points: 1,
            texte:
              "Complète cette fonction Python, qui doit renvoyer $\\texttt{True}$ quand un bateau de hauteur $\\texttt{h}$ passe sous l'arche à la distance $\\texttt{x}$ du pied gauche. Que renvoie $\\texttt{passe(1, 3)}$ ?\n\n" +
              "```python\ndef passe(x, h):\n    return ...\n```",
            indice: "Le bateau passe si la hauteur de l'arche en $x$ est au moins égale à $h$.",
            corrige:
              "```python\ndef passe(x, h):\n    return -0.25 * x * (x - 8) >= h\n```\n\n" +
              "$\\texttt{passe(1, 3)}$ renvoie $\\texttt{False}$ : à $1$ m du pied gauche, l'arche ne mesure que $1{,}75$ m."
          }
        ]
      },
      {
        titre: "Retrouver une parabole",
        duree: 25, points: 7, calculatrice: false,
        contexte: "La courbe ci-dessous représente une fonction $f$ du second degré. Elle passe par les points de coordonnées $(0\\,;3)$ et $(1\\,;4)$.",
        figure: (o) => o.graph({
          xmin: -2.6, xmax: 4.6, ymin: -3.6, ymax: 5.2, h: 290,
          curves: [{ f: (x) => -(x + 1) * (x - 3), a: -1.9, b: 3.9, closed: false, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: 3.7, dx: 26, dy: 4 }],
          points: [{ x: 0, y: 3 }, { x: 1, y: 4 }],
          aria: "Parabole tournée vers le bas qui coupe l'axe des abscisses en deux points et passe par les points (0 ; 3) et (1 ; 4)"
        }),
        questions: [
          {
            n: "1.", points: 1,
            texte: "Lis graphiquement les racines de $f$.",
            indice: "Les racines sont les abscisses des points où la courbe coupe l'axe des abscisses.",
            corrige: "La courbe coupe l'axe des abscisses en $x = -1$ et $x = 3$ : les racines de $f$ sont $-1$ et $3$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Justifie qu'il existe un réel $a$ tel que, pour tout $x$, $f(x) = a(x + 1)(x - 3)$, puis trouve $a$ avec le point $(1\\,;4)$.",
            indice: "Une fonction du second degré de racines $x_1$ et $x_2$ s'écrit $a(x - x_1)(x - x_2)$. Remplace $x$ par $1$ : $f(1) = 4$.",
            corrige:
              "$f$ est du second degré et a pour racines $-1$ et $3$, donc $f(x) = a(x - (-1))(x - 3) = a(x + 1)(x - 3)$ avec $a \\neq 0$.\n\n" +
              "$f(1) = a \\times 2 \\times (-2) = -4a$ et $f(1) = 4$, donc $a = -1$ : $f(x) = -(x + 1)(x - 3)$. La parabole est bien tournée vers le bas."
          },
          {
            n: "3.", points: 1.5,
            texte: "Montre que $f(x) = -x^2 + 2x + 3$, puis vérifie la somme et le produit des racines avec les formules du cours.",
            indice: "Développe $(x + 1)(x - 3)$. Puis compare $x_1 + x_2$ avec $-\\dfrac{b}{a}$ et $x_1 x_2$ avec $\\dfrac{c}{a}$.",
            corrige:
              "$f(x) = -(x^2 - 3x + x - 3) = -(x^2 - 2x - 3) = -x^2 + 2x + 3$, donc $a = -1$, $b = 2$ et $c = 3$.\n\n" +
              "Somme : $-1 + 3 = 2$ et $-\\dfrac{b}{a} = -\\dfrac{2}{-1} = 2$. Produit : $(-1) \\times 3 = -3$ et $\\dfrac{c}{a} = \\dfrac{3}{-1} = -3$. Tout concorde."
          },
          {
            n: "4.", points: 1.5,
            texte: "Résous l'inéquation $f(x) \\geqslant 0$. Vérifie sur le graphique.",
            indice: "$f(x) = -(x + 1)(x - 3)$ avec $a = -1 < 0$ : où est-il positif ?",
            corrige: "$a = -1 < 0$ : $f(x)$ est positif ou nul entre ses racines, racines comprises (inégalité large). $S = [-1\\,;3]$. Sur le graphique, c'est là que la courbe est au-dessus de l'axe des abscisses, ou dessus.",
            tableauCorrige: { lignes: [["x", "-\\infty", "", "-1", "", "3", "", "+\\infty"], ["f(x)", "", "-", "0", "+", "0", "-", ""]] }
          },
          {
            n: "5.", points: 1.5,
            texte: "Résous l'équation $f(x) = 3$ sans calculer de discriminant. Retrouve les solutions sur le graphique.",
            indice: "$f(x) = 3 \\iff -x^2 + 2x = 0$ : il n'y a plus de terme constant, mets $x$ en facteur.",
            corrige: "$f(x) = 3 \\iff -x^2 + 2x + 3 = 3 \\iff -x^2 + 2x = 0 \\iff x(-x + 2) = 0 \\iff x = 0$ ou $x = 2$. Sur le graphique, la courbe passe à la hauteur $3$ en $x = 0$ (point donné) et en $x = 2$."
          }
        ]
      },
      {
        titre: "Vrai ou faux ?",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Pour chaque affirmation, dis si elle est vraie ou fausse, puis justifie. Une réponse sans justification ne rapporte aucun point.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Pour tout réel $x$, $(x + 2)^2 = x^2 + 4$.",
            indice: "Essaie une valeur de $x$, ou développe avec l'identité remarquable.",
            corrige: "**Faux.** Pour $x = 1$ : $(1 + 2)^2 = 9$ alors que $1^2 + 4 = 5$. Un seul contre-exemple suffit. (En fait $(x + 2)^2 = x^2 + 4x + 4$.)"
          },
          {
            n: "2.", points: 1.5,
            texte: "L'équation $x^2 = 5x$ a une seule solution, $x = 5$.",
            indice: "Ne divise pas par $x$ : ramène tout à gauche et factorise.",
            corrige: "**Faux.** $x^2 = 5x \\iff x^2 - 5x = 0 \\iff x(x - 5) = 0 \\iff x = 0$ ou $x = 5$. Diviser par $x$ fait perdre la solution $0$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Les nombres $2$ et $5$ sont les racines du trinôme $x^2 - 7x + 10$.",
            indice: "Calcule leur somme et leur produit, ou développe $(x - 2)(x - 5)$.",
            corrige: "**Vrai.** $2 + 5 = 7$ et $2 \\times 5 = 10$ : ce sont les racines de $x^2 - 7x + 10$. On le vérifie aussi en développant : $(x - 2)(x - 5) = x^2 - 7x + 10$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Le trinôme $-3(x - 1)(x + 2)$ est positif pour $x = 0$.",
            indice: "Remplace $x$ par $0$, ou utilise le signe entre les racines $-2$ et $1$.",
            corrige: "**Vrai.** $-3 \\times (0 - 1) \\times (0 + 2) = -3 \\times (-1) \\times 2 = 6 > 0$. C'est cohérent avec le cours : $a = -3 < 0$, le trinôme est positif entre ses racines $-2$ et $1$, et $0$ est entre les deux."
          }
        ]
      }
    ]
  }
};
