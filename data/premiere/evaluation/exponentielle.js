/*
  ENTRAÎNEMENT : Première spécialité — chapitre 12, Fonction exponentielle
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-exponentielle.
  Format : voir data/premiere/evaluation/second-degre-2.js. Sans calculatrice (épreuve anticipée) :
  valeurs exactes, et 1,25⁴ calculé à la main pour la méthode d'Euler.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-exponentielle"] = {
  revisions: {
    intro: "La fonction exponentielle en un coup d'œil : sa définition, ses règles de calcul, son signe, ses variations et sa dérivée. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Définition",
        texte: "La fonction exponentielle est l'unique fonction dérivable sur $\\mathbb{R}$ telle que $\\exp' = \\exp$ et $\\exp(0) = 1$. On note $e = \\exp(1) \\approx 2{,}718$ et $\\exp(x) = e^x$."
      },
      {
        titre: "Règles de calcul",
        texte:
          "Pour tous réels $a$ et $b$ et tout entier $n$ :\n\n" +
          "- $e^{a + b} = e^a \\times e^b$ ;\n" +
          "- $e^{-a} = \\dfrac{1}{e^a}$ et $e^{a - b} = \\dfrac{e^a}{e^b}$ ;\n" +
          "- $\\left(e^a\\right)^n = e^{na}$."
      },
      {
        titre: "Signe et variations",
        texte: "Pour tout réel $x$, $e^x > 0$ : l'exponentielle ne s'annule jamais. Comme $(e^x)' = e^x > 0$, elle est **strictement croissante** sur $\\mathbb{R}$."
      },
      {
        titre: "Équations et inéquations",
        texte:
          "- $e^a = e^b \\iff a = b$ ;\n" +
          "- $e^a < e^b \\iff a < b$ : le sens de l'inégalité est conservé.\n\n" +
          "Et $e^a = 1 \\iff a = 0$."
      },
      {
        titre: "Dériver $e^{at}$",
        texte:
          "$\\left(e^{at}\\right)' = a\\,e^{at}$ et $\\left(e^{at + b}\\right)' = a\\,e^{at + b}$.\n\n" +
          "Par exemple, $\\left(5e^{-2t}\\right)' = -10e^{-2t}$."
      },
      {
        titre: "Un produit avec $e^x$",
        texte:
          "$\\left(u(x)\\,e^x\\right)' = u'(x)e^x + u(x)e^x = \\left(u(x) + u'(x)\\right)e^x$.\n\n" +
          "Comme $e^x > 0$, le signe de la dérivée est celui de $u(x) + u'(x)$."
      },
      {
        titre: "Croissance et décroissance",
        texte: "Pour $k > 0$, $t \\mapsto e^{kt}$ est croissante (croissance exponentielle) et $t \\mapsto e^{-kt}$ décroissante, ses valeurs se rapprochant de $0$ sans jamais l'atteindre."
      },
      {
        titre: "Lien avec les suites",
        texte: "$u_n = e^{an}$ définit une suite géométrique de raison $e^a$ : $u_{n+1} = e^{an + a} = u_n \\times e^a$. Elle est croissante si $a > 0$, décroissante si $a < 0$."
      }
    ],
    pieges: [
      "Écrire $e^{a + b} = e^a + e^b$ : une somme d'exposants donne un **produit**.",
      "Écrire $\\left(e^x\\right)^2 = e^{x^2}$ au lieu de $e^{2x}$.",
      "Croire que $e^{-x}$ est négatif : une exponentielle est toujours strictement positive.",
      "Oublier le facteur $a$ en dérivant $e^{at}$.",
      "Changer le sens d'une inéquation en comparant les exposants : l'exponentielle est croissante.",
      "Confondre la raison $e^a$ d'une suite géométrique avec l'exposant $a$."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Calculs avec l'exponentielle",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions de cet exercice sont indépendantes. $x$ désigne un nombre réel.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Écris plus simplement $A = e^{2x} \\times e^{-x + 3}$ et $B = \\dfrac{\\left(e^x\\right)^3}{e^{2x - 1}}$.",
            indice: "On additionne les exposants pour un produit, on les soustrait pour un quotient, et $\\left(e^x\\right)^3 = e^{3x}$.",
            corrige: "$A = e^{2x + (-x + 3)} = e^{x + 3}$ et $B = \\dfrac{e^{3x}}{e^{2x - 1}} = e^{3x - (2x - 1)} = e^{x + 1}$. Attention aux parenthèses devant le signe moins."
          },
          {
            n: "2.", points: 1.5,
            texte: "Résous l'équation $e^{2x - 1} = e^{x + 3}$.",
            indice: "$e^a = e^b \\iff a = b$.",
            corrige: "$e^{2x - 1} = e^{x + 3} \\iff 2x - 1 = x + 3 \\iff x = 4$. $S = \\{4\\}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Résous l'inéquation $e^{3x} < e^{x + 4}$.",
            indice: "L'exponentielle est strictement croissante : on compare les exposants, sans changer le sens.",
            corrige: "$e^{3x} < e^{x + 4} \\iff 3x < x + 4 \\iff 2x < 4 \\iff x < 2$. $S = ]-\\infty\\,;2[$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Résous l'équation $e^{2x} - e^x = 0$.",
            indice: "$e^{2x} = e^x \\times e^x$ : mets $e^x$ en facteur, puis utilise $e^x > 0$.",
            corrige: "$e^{2x} - e^x = e^x(e^x - 1)$. Comme $e^x > 0$, l'équation équivaut à $e^x - 1 = 0$, soit $e^x = 1 = e^0$, donc $x = 0$. $S = \\{0\\}$."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « il existe un réel $x$ tel que $e^{-x} < 0$ ». Justifie.",
            indice: "Que sait-on du signe d'une exponentielle ?",
            corrige: "**Faux.** Pour tout réel $t$, $e^t > 0$ ; avec $t = -x$, $e^{-x} > 0$ pour tout réel $x$. Aucun réel ne convient."
          }
        ]
      },
      {
        titre: "Étude d'une fonction",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On considère la fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = (x - 1)e^x$. On donne $e \\approx 2{,}7$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $f(0)$ et $f(1)$.",
            indice: "$e^0 = 1$.",
            corrige: "$f(0) = (0 - 1)e^0 = -1$ et $f(1) = 0 \\times e^1 = 0$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Montre que, pour tout réel $x$, $f'(x) = xe^x$.",
            indice: "Formule du produit avec $u(x) = x - 1$ et $v(x) = e^x$.",
            corrige: "$u'(x) = 1$ et $v'(x) = e^x$, donc $f'(x) = 1 \\times e^x + (x - 1)e^x = (1 + x - 1)e^x = xe^x$."
          },
          {
            n: "3.", points: 2,
            texte: "Étudie le signe de $f'(x)$ et dresse le tableau de variations de $f$. Quel est le minimum de $f$ ?",
            indice: "$e^x > 0$ pour tout $x$ : $f'(x)$ a le signe de $x$.",
            corrige: "$e^x > 0$, donc $f'(x)$ a le signe de $x$ : négatif sur $]-\\infty\\,;0[$, positif sur $]0\\,;+\\infty[$. $f$ décroît sur $]-\\infty\\,;0]$ puis croît sur $[0\\,;+\\infty[$ : son minimum est $f(0) = -1$, atteint en $0$.",
            tableauCorrige: { lignes: [["x", "-\\infty", "", "0", "", "+\\infty"], ["f'(x)", "", "-", "0", "+", ""], ["f(x)", "", "\\searrow", "-1", "\\nearrow", ""]] }
          },
          {
            n: "4.", points: 1.5,
            texte: "Détermine une équation de la tangente à la courbe de $f$ au point d'abscisse $1$.",
            indice: "$y = f'(1)(x - 1) + f(1)$, avec $f'(1) = 1 \\times e^1$.",
            corrige: "$f(1) = 0$ et $f'(1) = e$, donc la tangente a pour équation $y = e(x - 1)$, soit $y = ex - e$ (environ $y = 2{,}7x - 2{,}7$)."
          },
          {
            n: "5.", points: 1,
            texte: "Résous l'inéquation $f(x) > 0$.",
            indice: "$e^x > 0$ : le signe de $f(x)$ est celui de $x - 1$.",
            corrige: "$e^x > 0$, donc $f(x) > 0 \\iff x - 1 > 0 \\iff x > 1$. $S = ]1\\,;+\\infty[$ : la courbe est au-dessus de l'axe des abscisses à droite de $1$."
          }
        ]
      },
      {
        titre: "Approcher le nombre e avec Euler",
        duree: 20, points: 6, calculatrice: false,
        contexte: "La fonction exponentielle vérifie $\\exp' = \\exp$ et $\\exp(0) = 1$. Avec la méthode d'Euler de pas $h$, on suit la tangente : $y(x + h) \\approx y(x) + h\\,y'(x)$, donc ici $y(x + h) \\approx (1 + h) \\times y(x)$, en partant de $y(0) = 1$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Avec le pas $h = 0{,}5$, calcule les valeurs approchées de $\\exp(0{,}5)$ puis de $\\exp(1) = e$.",
            indice: "Deux pas de $0{,}5$ mènent de $0$ à $1$ : on multiplie deux fois par $1{,}5$.",
            corrige: "$y(0{,}5) \\approx 1{,}5 \\times 1 = 1{,}5$, puis $y(1) \\approx 1{,}5 \\times 1{,}5 = 2{,}25$. On obtient $e \\approx 2{,}25$, assez loin de $2{,}718$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Même question avec le pas $h = 0{,}25$.",
            indice: "Quatre pas : $e \\approx 1{,}25^4$. Calcule d'abord $1{,}25^2$.",
            corrige: "$1{,}25^2 = 1{,}5625$ et $1{,}25^4 = 1{,}5625^2 = 2{,}44140625$. On obtient $e \\approx 2{,}44$ : c'est mieux avec un pas plus petit."
          },
          {
            n: "3.", points: 1.5,
            texte: "On découpe $[0\\,;1]$ en $n$ pas de longueur $h = \\dfrac{1}{n}$. Montre que la valeur approchée de $e$ obtenue est $\\left(1 + \\dfrac{1}{n}\\right)^n$.",
            indice: "À chaque pas, on multiplie par $1 + h$ : la suite des valeurs approchées est géométrique.",
            corrige: "À chaque pas, la valeur est multipliée par $1 + h = 1 + \\dfrac{1}{n}$ : les valeurs successives forment une suite géométrique de premier terme $1$ et de raison $1 + \\dfrac{1}{n}$. Après $n$ pas, on obtient $\\left(1 + \\dfrac{1}{n}\\right)^n$."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Que renvoie ce programme ? Que va-t-il afficher, environ ?\n\n" +
              "```python\ndef euler(n):\n    y = 1\n    for k in range(n):\n        y = y * (1 + 1 / n)\n    return y\n\nprint(euler(1000))\n```",
            indice: "La boucle fait $n$ fois la multiplication de la question 3.",
            corrige: "$\\texttt{euler(n)}$ renvoie $\\left(1 + \\dfrac{1}{n}\\right)^n$, la valeur approchée de $e$ avec $n$ pas. Avec $1\\,000$ pas, le programme affiche environ $2{,}717$, très proche de $e \\approx 2{,}718$."
          }
        ]
      }
    ]
  }
};
