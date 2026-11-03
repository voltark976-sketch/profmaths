/*
  ENTRAÎNEMENT : Seconde — chapitre 5, Calcul littéral et équations
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-calcul-litteral.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle ou devoir commun de Seconde.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["seconde-calcul-litteral"] = {
  revisions: {
    intro: "Le calcul littéral en un coup d'œil : puissances, racines carrées, identités remarquables, factorisation et équations. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Puissances",
        texte:
          "- $a^n \\times a^p = a^{n+p}$ et $\\dfrac{a^n}{a^p} = a^{n-p}$ ;\n" +
          "- $(a^n)^p = a^{np}$ et $a^{-n} = \\dfrac{1}{a^n}$ ;\n" +
          "- $a^0 = 1$. Notation scientifique : $a \\times 10^n$ avec $1 \\leqslant a < 10$."
      },
      {
        titre: "Racines carrées",
        texte:
          "Pour $a$ et $b$ positifs : $\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$ et $(\\sqrt{a})^2 = a$.\n\n" +
          "$\\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}$. Mais $\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$ : $\\sqrt{9 + 16} = 5$."
      },
      {
        titre: "Identités remarquables",
        texte:
          "- $(a + b)^2 = a^2 + 2ab + b^2$ ;\n" +
          "- $(a - b)^2 = a^2 - 2ab + b^2$ ;\n" +
          "- $(a - b)(a + b) = a^2 - b^2$."
      },
      {
        titre: "Factoriser",
        texte: "On cherche d'abord un **facteur commun**, même une parenthèse : $(x + 1)(2x - 3) + (x + 1)(x + 5) = (x + 1)(3x + 2)$. Sinon, une identité lue à l'envers : $9x^2 - 25 = (3x - 5)(3x + 5)$."
      },
      {
        titre: "Équation du premier degré",
        texte: "On ajoute ou on retire le même terme aux deux membres, on multiplie ou on divise par un même nombre non nul : $5x - 7 = 2x + 8 \\iff 3x = 15 \\iff x = 5$."
      },
      {
        titre: "L'équation $x^2 = a$",
        texte:
          "- $a < 0$ : aucune solution ;\n" +
          "- $a = 0$ : une solution, $0$ ;\n" +
          "- $a > 0$ : deux solutions, $-\\sqrt{a}$ et $\\sqrt{a}$."
      },
      {
        titre: "Produit nul",
        texte: "$A \\times B = 0 \\iff A = 0$ ou $B = 0$. Pour $x^2 = 3x$ : on ne divise pas par $x$, on factorise, $x(x - 3) = 0 \\iff x = 0$ ou $x = 3$."
      },
      {
        titre: "Isoler une variable",
        texte: "Une formule se transforme comme une équation : $d = vt \\iff t = \\dfrac{d}{v}$, et $S = \\pi r^2 \\iff r = \\sqrt{\\dfrac{S}{\\pi}}$ (avec $r > 0$)."
      }
    ],
    pieges: [
      "Confondre $(-3)^2 = 9$ et $-3^2 = -9$.",
      "Multiplier les exposants pour un produit : $2^3 \\times 2^4 = 2^7$, pas $2^{12}$.",
      "Écrire $\\sqrt{a + b} = \\sqrt{a} + \\sqrt{b}$.",
      "Oublier le double produit : $(x + 3)^2 \\neq x^2 + 9$.",
      "Oublier la solution négative de $x^2 = 9$ : il y a $-3$ et $3$.",
      "Diviser par $x$ dans $x^2 = 5x$ : on perd la solution $0$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle ou au devoir commun (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Puissances et racines",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Les questions sont indépendantes. Donne des résultats exacts.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Écris sous la forme d'une puissance de $2$ ou de $10$ : $A = \\dfrac{2^5 \\times 2^{-3}}{2^4}$ et $B = (10^3)^2 \\times 10^{-4}$. Puis écris $C = 3 \\times 10^4 \\times 2 \\times 10^{-6}$ en notation scientifique.",
            indice: "Additionne les exposants pour un produit, soustrais-les pour un quotient, multiplie-les pour une puissance de puissance.",
            corrige: "$A = \\dfrac{2^{2}}{2^4} = 2^{-2}$, soit $\\dfrac{1}{4}$. $B = 10^6 \\times 10^{-4} = 10^2$. $C = 6 \\times 10^{-2}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Écris le plus simplement possible : $\\sqrt{50}$ ; $\\sqrt{12} + \\sqrt{27}$ ; $\\sqrt{3} \\times \\sqrt{12}$.",
            indice: "Fais apparaître un carré parfait sous la racine : $50 = 25 \\times 2$, $12 = 4 \\times 3$, $27 = 9 \\times 3$.",
            corrige: "$\\sqrt{50} = 5\\sqrt{2}$ ; $\\sqrt{12} + \\sqrt{27} = 2\\sqrt{3} + 3\\sqrt{3} = 5\\sqrt{3}$ ; $\\sqrt{3} \\times \\sqrt{12} = \\sqrt{36} = 6$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule $(2\\sqrt{3})^2$ et $(\\sqrt{5} - 1)(\\sqrt{5} + 1)$.",
            indice: "$(ab)^2 = a^2b^2$, et la troisième identité remarquable.",
            corrige: "$(2\\sqrt{3})^2 = 4 \\times 3 = 12$ et $(\\sqrt{5} - 1)(\\sqrt{5} + 1) = 5 - 1 = 4$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Vrai ou faux : « $\\sqrt{9 + 16} = 7$ ». Justifie.",
            indice: "Calcule d'abord ce qu'il y a sous la racine.",
            corrige: "**Faux.** $\\sqrt{9 + 16} = \\sqrt{25} = 5$, alors que $\\sqrt{9} + \\sqrt{16} = 7$ : la racine d'une somme n'est pas la somme des racines."
          }
        ]
      },
      {
        titre: "Le terrain et la case",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Un terrain carré a pour côté $x + 4$ mètres, avec $x \\geqslant 0$. Dans un coin, on construit une case carrée de $2$ m de côté. On note $A(x)$ l'aire du terrain qui reste libre, en m².",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Justifie que $A(x) = (x + 4)^2 - 4$.",
            indice: "Aire du grand carré moins aire de la case.",
            corrige: "Le terrain a pour aire $(x + 4)^2$ et la case $2^2 = 4$, donc $A(x) = (x + 4)^2 - 4$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Développe et réduis $A(x)$.",
            indice: "$(x + 4)^2 = x^2 + 2 \\times x \\times 4 + 16$.",
            corrige: "$A(x) = x^2 + 8x + 16 - 4 = x^2 + 8x + 12$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Factorise $A(x)$ en remarquant que $4 = 2^2$.",
            indice: "$(x + 4)^2 - 2^2$ est de la forme $a^2 - b^2 = (a - b)(a + b)$.",
            corrige: "$A(x) = (x + 4)^2 - 2^2 = (x + 4 - 2)(x + 4 + 2) = (x + 2)(x + 6)$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Calcule $A(6)$ avec la forme la plus pratique, puis résous l'équation $A(x) = 12$.",
            indice: "La forme factorisée donne vite $A(6)$. Pour $A(x) = 12$, la forme développée fait disparaître le $12$.",
            corrige: "$A(6) = 8 \\times 12 = 96$ m². Et $A(x) = 12 \\iff x^2 + 8x = 0 \\iff x(x + 8) = 0 \\iff x = 0$ ou $x = -8$. Comme $x \\geqslant 0$, la seule solution est $x = 0$ (le terrain fait alors $4$ m de côté)."
          },
          {
            n: "5.", points: 1.5,
            texte: "Pour quelle valeur de $x$ l'aire libre vaut-elle $32$ m² ?",
            indice: "Avec la forme de la question 1 : $(x + 4)^2 - 4 = 32 \\iff (x + 4)^2 = 36$.",
            corrige: "$(x + 4)^2 = 36 \\iff x + 4 = 6$ ou $x + 4 = -6$. Comme $x \\geqslant 0$, $x + 4 > 0$, donc $x + 4 = 6$ et $x = 2$ : le terrain fait $6$ m de côté. Vérification : $A(2) = 4 \\times 8 = 32$."
          }
        ]
      },
      {
        titre: "Équations et formules",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Résous l'équation $5(x - 2) - 3 = 2x + 8$.",
            indice: "Développe le membre de gauche, puis regroupe les $x$ d'un côté.",
            corrige: "$5x - 10 - 3 = 2x + 8 \\iff 5x - 13 = 2x + 8 \\iff 3x = 21 \\iff x = 7$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Résous l'équation $(3x - 6)(x + 4) = 0$.",
            indice: "Un produit est nul si et seulement si l'un de ses facteurs est nul.",
            corrige: "$3x - 6 = 0$ ou $x + 4 = 0 \\iff x = 2$ ou $x = -4$. $S = \\{-4\\,;2\\}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Résous l'équation $x^2 = 5x$.",
            indice: "Ne divise pas par $x$ : passe tout à gauche et factorise.",
            corrige: "$x^2 = 5x \\iff x^2 - 5x = 0 \\iff x(x - 5) = 0 \\iff x = 0$ ou $x = 5$. $S = \\{0\\,;5\\}$."
          },
          {
            n: "4.", points: 1.5,
            texte: "L'énergie cinétique d'un objet de masse $m$ (kg) à la vitesse $v$ (m/s) est $E = \\dfrac{1}{2}mv^2$ (en joules). Exprime $v$ en fonction de $E$ et $m$, puis calcule $v$ pour $E = 400$ J et $m = 2$ kg.",
            indice: "Isole $v^2$, puis prends la racine carrée ($v$ est positive).",
            corrige: "$E = \\dfrac{1}{2}mv^2 \\iff v^2 = \\dfrac{2E}{m} \\iff v = \\sqrt{\\dfrac{2E}{m}}$, car $v > 0$. Pour $E = 400$ et $m = 2$ : $v = \\sqrt{400} = 20$ m/s."
          },
          {
            n: "5.", points: 1,
            texte:
              "Que renvoie $\\texttt{rang(3, 1000)}$ ?\n\n" +
              "```python\ndef rang(a, s):\n    n = 0\n    p = 1\n    while p <= s:\n        n = n + 1\n        p = p * a\n    return n\n```",
            indice: "La boucle calcule $a^1$, $a^2$, $a^3$… tant que la puissance ne dépasse pas $s$.",
            corrige: "$3^6 = 729 \\leqslant 1\\,000$ et $3^7 = 2\\,187 > 1\\,000$ : la boucle s'arrête quand $p = 3^7$, et la fonction renvoie $\\texttt{7}$, le premier exposant pour lequel $3^n$ dépasse $1\\,000$."
          }
        ]
      }
    ]
  }
};
