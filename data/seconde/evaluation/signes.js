/*
  ENTRAÎNEMENT : Seconde — chapitre 14, Signes d'expressions et équations quotients
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-signes.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle ou devoir commun de Seconde.
  Tableaux de signes : une ligne par facteur, « 0 » là où il s'annule ; double barre (\|) sous une valeur interdite.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["seconde-signes"] = {
  revisions: {
    intro: "Les signes en un coup d'œil : fonctions de référence, tableau de signes d'un produit ou d'un quotient, valeur interdite, inéquations et signe d'une différence. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Signes à connaître",
        texte: "$mx + p$ (avec $m \\neq 0$) change de signe en $-\\dfrac{p}{m}$ : signe de $-m$, puis signe de $m$. $x^2$, $|x|$ et $\\sqrt{x}$ sont positifs ; $\\dfrac{1}{x}$ et $x^3$ ont le signe de $x$."
      },
      {
        titre: "Tableau de signes d'un produit",
        texte: "On cherche où chaque facteur s'annule, on fait une ligne par facteur, puis on applique la règle des signes dans chaque colonne : deux signes égaux donnent $+$, deux signes contraires donnent $-$."
      },
      {
        titre: "Valeur interdite",
        texte: "$\\dfrac{A(x)}{B(x)}$ n'existe que si $B(x) \\neq 0$. On donne l'ensemble de définition, par exemple $\\mathbb{R} \\setminus \\{3\\}$, et on met une double barre sous la valeur interdite. Elle n'est jamais solution."
      },
      {
        titre: "Équations quotients",
        texte: "$\\dfrac{A(x)}{B(x)} = 0 \\iff A(x) = 0$ et $B(x) \\neq 0$. Pour $\\dfrac{A(x)}{B(x)} = k$, on multiplie par $B(x)$, puis on vérifie que les solutions ne sont pas interdites."
      },
      {
        titre: "Résoudre une inéquation",
        texte: "On passe tout du même côté pour comparer à $0$, on factorise, on dresse le tableau de signes et on lit les intervalles. Pour comparer $f(x)$ et $g(x)$, on étudie le signe de $f(x) - g(x)$."
      },
      {
        titre: "Python : la fonction signe",
        texte: "Avec $\\texttt{if}$, $\\texttt{elif}$ (« sinon si ») et $\\texttt{else}$ (« sinon »), une fonction peut renvoyer $\\texttt{\"+\"}$, $\\texttt{\"-\"}$ ou $\\texttt{\"0\"}$ selon le signe d'un nombre."
      }
    ],
    pieges: [
      "Oublier la valeur interdite, ou la mettre dans l'ensemble des solutions.",
      "Multiplier une inéquation par un dénominateur dont on ne connaît pas le signe : le sens pourrait changer.",
      "Diviser par $x$ dans $x^2 > 2x$ : on perd la moitié des cas, il faut factoriser $x(x - 2)$.",
      "Se tromper de signe pour $5 - x$ : il est positif **avant** $5$.",
      "Croire que $\\dfrac{A}{B} = 0$ quand $B = 0$ : un quotient n'existe pas si son dénominateur est nul."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle ou au devoir commun (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Produits et tableaux de signes",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Donne le signe de : a) $-2x^2$ ; b) $\\dfrac{4}{x}$ pour $x < 0$ ; c) $(x - 1)^2 + 3$.",
            indice: "Un carré est toujours positif ou nul ; $\\dfrac{1}{x}$ a le signe de $x$.",
            corrige: "a) $x^2 \\geqslant 0$, donc $-2x^2 \\leqslant 0$ : négatif, nul seulement en $0$. b) Pour $x < 0$, $\\dfrac{1}{x} < 0$, donc $\\dfrac{4}{x} < 0$. c) $(x - 1)^2 \\geqslant 0$, donc $(x - 1)^2 + 3 \\geqslant 3 > 0$ : toujours strictement positif."
          },
          {
            n: "2.", points: 1.5,
            texte: "Dresse le tableau de signes de $P(x) = (2x - 6)(x + 1)$.",
            indice: "$2x - 6 = 0 \\iff x = 3$ et $x + 1 = 0 \\iff x = -1$. Les deux coefficients de $x$ sont positifs : chaque facteur est négatif, puis positif.",
            corrige: "$2x - 6$ s'annule en $3$ et $x + 1$ en $-1$ ; les deux sont négatifs avant leur racine et positifs après. La règle des signes donne le produit :",
            tableauCorrige: { lignes: [["x", "-\\infty", "", "-1", "", "3", "", "+\\infty"], ["2x - 6", "", "-", "", "-", "0", "+", ""], ["x + 1", "", "-", "0", "+", "", "+", ""], ["P(x)", "", "+", "0", "-", "0", "+", ""]] }
          },
          {
            n: "3.", points: 1.5,
            texte: "Résous l'inéquation $(2x - 6)(x + 1) < 0$.",
            indice: "Lis dans le tableau de la question 2 les intervalles où $P(x)$ est strictement négatif.",
            corrige: "$P(x) < 0$ entre les deux racines, qui sont exclues : $S = \\,]-1\\,;3[$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Résous l'inéquation $x^2 \\geqslant 5x$.",
            indice: "Ne divise pas par $x$ ! Passe tout du même côté : $x^2 - 5x \\geqslant 0$, puis factorise.",
            corrige: "$x^2 \\geqslant 5x \\iff x^2 - 5x \\geqslant 0 \\iff x(x - 5) \\geqslant 0$. Le produit s'annule en $0$ et en $5$ ; il est positif à l'extérieur des racines. $S = \\,]-\\infty\\,;0] \\cup [5\\,;+\\infty[$.",
            tableauCorrige: { lignes: [["x", "-\\infty", "", "0", "", "5", "", "+\\infty"], ["x", "", "-", "0", "+", "", "+", ""], ["x - 5", "", "-", "", "-", "0", "+", ""], ["x(x - 5)", "", "+", "0", "-", "0", "+", ""]] }
          },
          {
            n: "5.", points: 1.5,
            texte: "Factorise $(x + 3)^2 - 16$, puis résous l'inéquation $(x + 3)^2 - 16 \\leqslant 0$.",
            indice: "$16 = 4^2$ : utilise $a^2 - b^2 = (a - b)(a + b)$ avec $a = x + 3$ et $b = 4$.",
            corrige: "$(x + 3)^2 - 4^2 = (x + 3 - 4)(x + 3 + 4) = (x - 1)(x + 7)$. Ce produit s'annule en $-7$ et en $1$ ; il est négatif entre les racines. $S = [-7\\,;1]$."
          }
        ]
      },
      {
        titre: "Un quotient",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On considère l'expression $g(x) = \\dfrac{3x - 6}{x + 2}$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Quelle est la valeur interdite ? Donne l'ensemble de définition de $g$.",
            indice: "Le dénominateur ne doit pas s'annuler.",
            corrige: "$x + 2 = 0 \\iff x = -2$ : la valeur $-2$ est interdite. $g$ est définie sur $\\mathbb{R} \\setminus \\{-2\\}$, c'est-à-dire $]-\\infty\\,;-2[ \\cup \\,]-2\\,;+\\infty[$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Résous l'équation $g(x) = 0$.",
            indice: "Un quotient est nul quand son numérateur est nul et que son dénominateur ne l'est pas.",
            corrige: "$g(x) = 0 \\iff 3x - 6 = 0$ et $x \\neq -2$. Or $3x - 6 = 0 \\iff x = 2$, qui n'est pas interdit : $S = \\{2\\}$."
          },
          {
            n: "3.", points: 2,
            texte: "Dresse le tableau de signes de $g(x)$, puis résous $g(x) \\geqslant 0$.",
            indice: "Une ligne pour $3x - 6$, une ligne pour $x + 2$, puis la ligne du quotient, avec une double barre sous $-2$.",
            corrige: "$3x - 6$ s'annule en $2$ et $x + 2$ en $-2$, tous deux négatifs puis positifs. Le quotient est positif à l'extérieur, négatif entre $-2$ et $2$, nul en $2$, et n'existe pas en $-2$. Donc $S = \\,]-\\infty\\,;-2[ \\cup [2\\,;+\\infty[$ : crochet ouvert en $-2$, valeur interdite, et fermé en $2$, où $g(x) = 0$.",
            tableauCorrige: { lignes: [["x", "-\\infty", "", "-2", "", "2", "", "+\\infty"], ["3x - 6", "", "-", "", "-", "0", "+", ""], ["x + 2", "", "-", "0", "+", "", "+", ""], ["g(x)", "", "+", "\\|", "-", "0", "+", ""]] }
          },
          {
            n: "4.", points: 1.5,
            texte: "Résous l'équation $g(x) = 1$.",
            indice: "Pour $x \\neq -2$, multiplie les deux membres par $x + 2$, puis vérifie que la solution n'est pas interdite.",
            corrige: "Pour $x \\neq -2$ : $\\dfrac{3x - 6}{x + 2} = 1 \\iff 3x - 6 = x + 2 \\iff 2x = 8 \\iff x = 4$. Comme $4 \\neq -2$, $S = \\{4\\}$. Vérification : $g(4) = \\dfrac{6}{6} = 1$."
          },
          {
            n: "5.", points: 1,
            texte: "Pour résoudre $g(x) < 1$, un élève écrit : « $3x - 6 < x + 2$, donc $x < 4$ ». Montre avec $x = -3$ que son raisonnement est faux. Quelle est son erreur ?",
            indice: "Calcule $g(-3)$. Quel est le signe de $x + 2$ pour $x = -3$ ?",
            corrige: "$g(-3) = \\dfrac{-15}{-1} = 15$, qui n'est pas inférieur à $1$, alors que $-3 < 4$. L'élève a multiplié l'inéquation par $x + 2$ sans connaître son signe : quand $x + 2 < 0$, le sens de l'inégalité change. Il faut plutôt étudier le signe de $g(x) - 1$."
          }
        ]
      },
      {
        titre: "Le bénéfice de la coopérative",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Une coopérative fabrique et vend $x$ centaines de pots de confiture de goyave par semaine, avec $x \\in [0\\,;8]$. Son bénéfice, en centaines d'euros, est $B(x) = -2x^2 + 16x - 24$ (données fictives).",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Vérifie que $B(x) = -2(x - 2)(x - 6)$.",
            indice: "Développe d'abord $(x - 2)(x - 6)$, puis multiplie par $-2$.",
            corrige: "$(x - 2)(x - 6) = x^2 - 6x - 2x + 12 = x^2 - 8x + 12$, donc $-2(x - 2)(x - 6) = -2x^2 + 16x - 24 = B(x)$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Dresse le tableau de signes de $B(x)$ sur $[0\\,;8]$.",
            indice: "Trois facteurs : $-2$, toujours négatif, puis $x - 2$ et $x - 6$.",
            corrige: "$x - 2$ s'annule en $2$, $x - 6$ en $6$, et $-2$ est toujours négatif. Le produit des trois facteurs :",
            tableauCorrige: { lignes: [["x", "0", "", "2", "", "6", "", "8"], ["-2", "", "-", "", "-", "", "-", ""], ["x - 2", "", "-", "0", "+", "", "+", ""], ["x - 6", "", "-", "", "-", "0", "+", ""], ["B(x)", "", "-", "0", "+", "0", "-", ""]] }
          },
          {
            n: "3.", points: 1.5,
            texte: "Pour quelles productions la coopérative fait-elle un bénéfice strictement positif ?",
            indice: "Lis dans le tableau où $B(x) > 0$, puis traduis en nombre de pots.",
            corrige: "$B(x) > 0$ pour $x \\in \\,]2\\,;6[$ : la coopérative gagne de l'argent quand elle vend entre $200$ et $600$ pots par semaine, bornes exclues. À $200$ ou $600$ pots, le bénéfice est nul."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "On utilise la fonction $\\texttt{signe}$ du cours. Que renvoient $\\texttt{signe(B(5))}$ et $\\texttt{signe(B(7))}$ ? Interprète.\n\n" +
              "```python\ndef signe(v):\n    if v > 0:\n        return \"+\"\n    elif v < 0:\n        return \"-\"\n    else:\n        return \"0\"\n```",
            indice: "Calcule $B(5)$ et $B(7)$ avec la forme factorisée.",
            corrige: "$B(5) = -2 \\times 3 \\times (-1) = 6$ et $B(7) = -2 \\times 5 \\times 1 = -10$. Donc $\\texttt{signe(B(5))}$ renvoie $\\texttt{\"+\"}$ : avec $500$ pots, la coopérative gagne $600$ €. Et $\\texttt{signe(B(7))}$ renvoie $\\texttt{\"-\"}$ : avec $700$ pots, elle perd $1\\,000$ €. C'est conforme au tableau."
          }
        ]
      }
    ]
  }
};
