/*
  ENTRAÎNEMENT : Automatismes — Calcul algébrique
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre auto-calcul-algebrique.
  Format : voir data/automatismes/evaluation/calcul-numerique.js (série d'automatismes, puis deux exercices en situation).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["auto-calcul-algebrique"] = {
  revisions: {
    intro: "Les réflexes de calcul algébrique en un coup d'œil : remplacer une lettre, réduire, développer, factoriser, résoudre, isoler une variable. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Remplacer une lettre",
        texte: "On remplace chaque lettre par sa valeur, entre parenthèses si elle est négative : pour $a = -3$, $a^2 = (-3)^2 = 9$ et $2a - 1 = 2 \\times (-3) - 1 = -7$."
      },
      {
        titre: "Réduire",
        texte: "On regroupe les termes semblables : $3x + 5 - x + 2 = 2x + 7$. Un signe $-$ devant une parenthèse change le signe de chaque terme : $-(a - b) = -a + b$."
      },
      {
        titre: "Identités remarquables",
        texte:
          "- $(a + b)^2 = a^2 + 2ab + b^2$ ;\n" +
          "- $(a - b)^2 = a^2 - 2ab + b^2$ ;\n" +
          "- $(a + b)(a - b) = a^2 - b^2$."
      },
      {
        titre: "Factoriser",
        texte: "On cherche un facteur commun ($6x^2 - 4x = 2x(3x - 2)$), sinon une identité remarquable lue de droite à gauche. On vérifie en développant."
      },
      {
        titre: "Équations et inéquations",
        texte: "On regroupe les $x$ d'un côté et les nombres de l'autre, puis on divise. Dans une inéquation, multiplier ou diviser par un nombre **négatif** change le sens de l'inégalité."
      },
      {
        titre: "Isoler une variable",
        texte: "On « défait » les opérations dans l'ordre inverse : dans $P = 2(L + \\ell)$, on divise par $2$ puis on soustrait $L$, donc $\\ell = \\dfrac{P}{2} - L$."
      },
      {
        titre: "Produit nul (Première)",
        texte: "Un produit est nul si et seulement si l'un de ses facteurs est nul : $AB = 0 \\iff A = 0$ ou $B = 0$."
      }
    ],
    pieges: [
      "$-3^2 = -9$ mais $(-3)^2 = 9$ : mets les nombres négatifs entre parenthèses.",
      "$(a + b)^2 \\neq a^2 + b^2$ : il manque le double produit $2ab$.",
      "$-(x - 3) = -x + 3$, et non $-x - 3$.",
      "$x \\times x = x^2$, alors que $x + x = 2x$.",
      "Diviser une inéquation par un nombre négatif sans changer le sens de l'inégalité.",
      "Oublier une solution d'une équation produit nul : il y en a une par facteur."
    ]
  },

  evaluation: {
    intro: "Une série d'automatismes comme dans la partie 1 de l'épreuve anticipée, puis deux exercices qui les mettent en situation, **sans calculatrice** (environ $55$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Automatismes",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Pour chaque question, écris seulement le résultat, sans justification.",
        questions: [
          { n: "1.", points: 0.5, texte: "Calcule $3a^2 - 2a$ pour $a = -2$.", corrige: "$3 \\times (-2)^2 - 2 \\times (-2) = 12 + 4 = 16$." },
          { n: "2.", points: 0.5, texte: "Réduis $4x - 3(2 - x) + 5$.", corrige: "$4x - 6 + 3x + 5 = 7x - 1$." },
          { n: "3.", points: 0.5, texte: "Développe et réduis $(x + 5)(x - 2)$.", corrige: "$x^2 - 2x + 5x - 10 = x^2 + 3x - 10$." },
          { n: "4.", points: 0.5, texte: "Développe $(3x + 1)^2$.", corrige: "$9x^2 + 6x + 1$." },
          { n: "5.", points: 0.5, texte: "Factorise $25x^2 - 1$.", corrige: "$(5x)^2 - 1^2 = (5x - 1)(5x + 1)$." },
          { n: "6.", points: 0.5, texte: "Factorise $x^2 + 6x + 9$.", corrige: "$x^2 + 2 \\times 3 \\times x + 3^2 = (x + 3)^2$." },
          { n: "7.", points: 0.5, texte: "Factorise $3x^2 + 12x$.", corrige: "$3x(x + 4)$." },
          { n: "8.", points: 0.5, texte: "Résous $7x - 2 = 3x + 10$.", corrige: "$4x = 12$, donc $x = 3$." },
          { n: "9.", points: 0.5, texte: "Résous $-2x + 7 \\geqslant 1$.", corrige: "$-2x \\geqslant -6$, donc $x \\leqslant 3$ (on divise par $-2$ : le sens change)." },
          { n: "10.", points: 0.5, texte: "Dans la formule $v = \\dfrac{d}{t}$, exprime $t$ en fonction de $d$ et de $v$.", corrige: "$t = \\dfrac{d}{v}$." },
          { n: "11.", points: 0.5, texte: "Résous $(2x + 5)(x - 3) = 0$.", corrige: "$2x + 5 = 0$ ou $x - 3 = 0$ : $x = -\\dfrac{5}{2}$ ou $x = 3$." },
          { n: "12.", points: 0.5, texte: "Résous $\\dfrac{x}{4} - \\dfrac{1}{2} = \\dfrac{x}{6}$.", corrige: "En multipliant par $12$ : $3x - 6 = 2x$, donc $x = 6$." }
        ]
      },
      {
        titre: "Le rectangle et le carré",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Pour un réel $x > 1$, on considère un rectangle de longueur $x + 3$ et de largeur $x - 1$, et un carré de côté $x + 1$ (en mètres). On note $A(x)$ l'aire du rectangle et $C(x)$ celle du carré.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Développe et réduis $A(x)$ et $C(x)$.",
            indice: "$A(x) = (x + 3)(x - 1)$ et $C(x) = (x + 1)^2$.",
            corrige: "$A(x) = (x + 3)(x - 1) = x^2 - x + 3x - 3 = x^2 + 2x - 3$ et $C(x) = (x + 1)^2 = x^2 + 2x + 1$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Montre que $C(x) - A(x)$ ne dépend pas de $x$. Interprète ce résultat.",
            indice: "Soustrais les deux expressions de la question 1, en mettant $A(x)$ entre parenthèses.",
            corrige: "$C(x) - A(x) = x^2 + 2x + 1 - (x^2 + 2x - 3) = 4$. Quel que soit $x$, le carré a une aire plus grande que le rectangle de $4$ m²."
          },
          {
            n: "3.", points: 1.5,
            texte: "Compare les périmètres du rectangle et du carré.",
            indice: "Périmètre d'un rectangle : $2(L + \\ell)$ ; d'un carré : $4c$.",
            corrige: "Rectangle : $2\\big((x + 3) + (x - 1)\\big) = 2(2x + 2) = 4x + 4$. Carré : $4(x + 1) = 4x + 4$. Les deux figures ont toujours le même périmètre."
          },
          {
            n: "4.", points: 2.5,
            texte: "Détermine $x$ pour que l'aire du rectangle soit égale à $45$ m², puis donne les dimensions du rectangle.",
            indice: "D'après la question 2, $A(x) = 45 \\iff C(x) = 49$, c'est-à-dire $(x + 1)^2 = 49$.",
            corrige: "D'après la question 2, $A(x) = 45 \\iff (x + 1)^2 = 49 \\iff x + 1 = 7$ ou $x + 1 = -7$, soit $x = 6$ ou $x = -8$. Comme $x > 1$, $x = 6$.\n\nLe rectangle mesure alors $9$ m sur $5$ m, et on vérifie que $9 \\times 5 = 45$."
          }
        ]
      },
      {
        titre: "La moyenne de maths",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Dans un lycée, la moyenne de maths d'un trimestre est calculée par la formule $M = \\dfrac{2a + 3b}{5}$, où $a$ est la note du devoir maison et $b$ celle du devoir surveillé, sur $20$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $M$ pour $a = 14$ et $b = 8$.",
            indice: "Calcule d'abord le numérateur $2a + 3b$.",
            corrige: "$M = \\dfrac{2 \\times 14 + 3 \\times 8}{5} = \\dfrac{28 + 24}{5} = \\dfrac{52}{5} = 10{,}4$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Exprime $b$ en fonction de $M$ et de $a$.",
            indice: "Multiplie par $5$, puis isole $3b$.",
            corrige: "$5M = 2a + 3b$, donc $3b = 5M - 2a$ et $b = \\dfrac{5M - 2a}{3}$."
          },
          {
            n: "3.", points: 2,
            texte: "Anli a eu $11$ au devoir maison. Quelle note doit-il obtenir au devoir surveillé pour avoir exactement $12$ de moyenne ? Donne la valeur exacte, puis l'arrondi au dixième.",
            indice: "Utilise la question 2 avec $M = 12$ et $a = 11$.",
            corrige: "$b = \\dfrac{5 \\times 12 - 2 \\times 11}{3} = \\dfrac{60 - 22}{3} = \\dfrac{38}{3} \\approx 12{,}7$."
          },
          {
            n: "4.", points: 2,
            texte: "Quelles notes au devoir surveillé permettent à Anli d'avoir au moins $10$ de moyenne ? Si les notes sont des nombres entiers, quelle est la plus petite note qui convient ?",
            indice: "Résous l'inéquation $\\dfrac{22 + 3b}{5} \\geqslant 10$.",
            corrige: "$\\dfrac{22 + 3b}{5} \\geqslant 10 \\iff 22 + 3b \\geqslant 50 \\iff 3b \\geqslant 28 \\iff b \\geqslant \\dfrac{28}{3}$, avec $\\dfrac{28}{3} \\approx 9{,}33$.\n\nToutes les notes supérieures ou égales à $\\dfrac{28}{3}$ conviennent ; avec des notes entières, il lui faut au moins $10$."
          }
        ]
      }
    ]
  }
};
