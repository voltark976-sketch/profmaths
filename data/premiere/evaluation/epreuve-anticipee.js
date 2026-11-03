/*
  ENTRAÎNEMENT : Première spécialité — chapitre 17, Préparation à l'épreuve anticipée
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-epreuve-anticipee.
  Format : voir data/premiere/evaluation/second-degre-2.js. L'entraînement est ici un sujet blanc complet au format
  de la session 2028 (note de service du 11-9-2026) : partie 1 d'automatismes en réponses courtes (6 points), partie 2
  de deux exercices (14 points), 2 h sans calculatrice. Les cinq sujets types restent dans le cours du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-epreuve-anticipee"] = {
  revisions: {
    intro: "L'épreuve anticipée en un coup d'œil : son format, la méthode de rédaction, les raisonnements et les formules de l'année à connaître par cœur. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Le format",
        texte:
          "- $2$ heures, **sans calculatrice** ;\n" +
          "- partie 1 : automatismes, questions à réponses courtes, $6$ points (environ $25$ minutes) ;\n" +
          "- partie 2 : deux ou trois exercices rédigés, $14$ points ; la qualité de la rédaction compte."
      },
      {
        titre: "Rédiger une réponse",
        texte: "**Annoncer** ce qu'on utilise (une propriété, une formule, la question précédente), **calculer** en écrivant les étapes utiles, **conclure** par une phrase qui répond à la question, avec les mots de l'énoncé et les unités."
      },
      {
        titre: "Raisonnements",
        texte:
          "- un **contre-exemple** suffit pour réfuter un « pour tout » ;\n" +
          "- un **exemple** suffit pour prouver un « il existe » ;\n" +
          "- **contraposée** : « si non Q, alors non P » équivaut à « si P, alors Q » ;\n" +
          "- **disjonction des cas** : on traite chaque cas séparément."
      },
      {
        titre: "Second degré",
        texte: "$\\Delta = b^2 - 4ac$ ; racines $\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ si $\\Delta > 0$ ; le trinôme est du signe de $a$ à l'extérieur des racines ; extremum en $-\\dfrac{b}{2a}$."
      },
      {
        titre: "Suites",
        texte:
          "- arithmétique : $u_n = u_0 + nr$ et $1 + 2 + \\dots + n = \\dfrac{n(n + 1)}{2}$ ;\n" +
          "- géométrique : $u_n = u_0 \\times q^n$ et $1 + q + \\dots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$."
      },
      {
        titre: "Dérivation",
        texte:
          "- $(x^n)' = nx^{n-1}$, $\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$, $(e^{ax})' = ae^{ax}$ ;\n" +
          "- $(uv)' = u'v + uv'$ et $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$ ;\n" +
          "- tangente : $y = f'(a)(x - a) + f(a)$ ; variations par le signe de $f'$."
      },
      {
        titre: "Probabilités",
        texte:
          "- $P(A \\cap B) = P(A) \\times P_A(B)$ et probabilités totales ;\n" +
          "- indépendance : $P(A \\cap B) = P(A) \\times P(B)$ ;\n" +
          "- $E(X) = \\sum p_ix_i$ et $V(X) = E(X^2) - E(X)^2$."
      },
      {
        titre: "Géométrie",
        texte:
          "- $\\vec{u} \\cdot \\vec{v} = xx' + yy'$ (repère orthonormé), nul si et seulement si les vecteurs sont orthogonaux ;\n" +
          "- Al-Kashi : $a^2 = b^2 + c^2 - 2bc \\cos \\widehat{A}$ ;\n" +
          "- cercle : $(x - a)^2 + (y - b)^2 = r^2$."
      }
    ],
    pieges: [
      "Passer trop de temps sur la partie 1 : environ $25$ minutes suffisent.",
      "Laisser une réponse sans phrase de conclusion : la rédaction est notée.",
      "Vérifier une propriété « pour tout $n$ » sur deux ou trois termes seulement.",
      "Conclure à un extremum dès que $f'(a) = 0$, sans vérifier que $f'$ change de signe.",
      "Confondre $P(A \\cap B)$ et $P_A(B)$.",
      "Abandonner un exercice à la première question bloquante : les suivantes sont souvent faisables."
    ]
  },

  evaluation: {
    intro: "Un **sujet blanc** au format de l'épreuve anticipée : partie 1 d'automatismes ($6$ points, environ $25$ minutes), puis deux exercices ($14$ points). Deux heures, **sans calculatrice**. Fais-le d'une traite sur une feuille, puis corrige-toi question par question. D'autres sujets complets sont dans le cours (sujets types 1 à 5).",
    exercices: [
      {
        titre: "Partie 1 : automatismes",
        duree: 25, points: 6, calculatrice: false,
        contexte: "Pour chaque question, écris seulement le résultat, sans justification.",
        questions: [
          { n: "1.", points: 0.5, texte: "Calcule $\\dfrac{3}{4} - \\dfrac{5}{6}$.", corrige: "$\\dfrac{9}{12} - \\dfrac{10}{12} = -\\dfrac{1}{12}$." },
          { n: "2.", points: 0.5, texte: "Écris $0{,}000\\,45$ en notation scientifique.", corrige: "$4{,}5 \\times 10^{-4}$." },
          { n: "3.", points: 0.5, texte: "Un prix augmente de $20\\,\\%$, puis baisse de $20\\,\\%$. Quelle est l'évolution globale ?", corrige: "$1{,}2 \\times 0{,}8 = 0{,}96$ : une baisse de $4\\,\\%$." },
          { n: "4.", points: 0.5, texte: "Développe $(2x - 3)^2$.", corrige: "$4x^2 - 12x + 9$." },
          { n: "5.", points: 0.5, texte: "Résous $3x - 7 = 2x + 5$.", corrige: "$x = 12$." },
          { n: "6.", points: 0.5, texte: "Factorise $x^2 - 16$.", corrige: "$(x - 4)(x + 4)$." },
          { n: "7.", points: 0.5, texte: "Donne la dérivée de $f(x) = x^3 - 2x$.", corrige: "$f'(x) = 3x^2 - 2$." },
          { n: "8.", points: 0.5, texte: "Quel est le coefficient directeur de la droite passant par $(0\\,;3)$ et $(2\\,;7)$ ?", corrige: "$\\dfrac{7 - 3}{2 - 0} = 2$." },
          { n: "9.", points: 0.5, texte: "$(u_n)$ est arithmétique avec $u_0 = 5$ et une raison $-2$. Que vaut $u_{10}$ ?", corrige: "$u_{10} = 5 + 10 \\times (-2) = -15$." },
          { n: "10.", points: 0.5, texte: "On lance deux fois un dé équilibré. Quelle est la probabilité d'obtenir deux fois $6$ ?", corrige: "$\\dfrac{1}{6} \\times \\dfrac{1}{6} = \\dfrac{1}{36}$." },
          { n: "11.", points: 0.5, texte: "Quelle est la moyenne de la série $8$ ; $12$ ; $15$ ; $9$ ?", corrige: "$\\dfrac{8 + 12 + 15 + 9}{4} = \\dfrac{44}{4} = 11$." },
          { n: "12.", points: 0.5, texte: "Écris $e^2 \\times e^{-5}$ sous la forme $e^a$.", corrige: "$e^{2 - 5} = e^{-3}$." }
        ]
      },
      {
        titre: "Partie 2, exercice 1 : le jus de goyave",
        duree: 45, points: 7, calculatrice: false,
        contexte: "Une coopérative de Mayotte produit du jus de goyave. Pour $x$ milliers de litres produits et vendus, avec $x \\in [0\\,;6]$, le coût de production est $C(x) = x^3 - 9x^2 + 30x + 10$ et la recette $R(x) = 15x$, en milliers d'euros.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Montre que le bénéfice est $B(x) = -x^3 + 9x^2 - 15x - 10$.",
            indice: "Le bénéfice est la recette moins le coût.",
            corrige: "$B(x) = R(x) - C(x) = 15x - (x^3 - 9x^2 + 30x + 10) = -x^3 + 9x^2 - 15x - 10$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $B'(x)$, puis montre que $B'(x) = -3(x - 1)(x - 5)$.",
            indice: "Dérive terme à terme, puis développe $-3(x - 1)(x - 5)$.",
            corrige: "$B'(x) = -3x^2 + 18x - 15$, et $-3(x - 1)(x - 5) = -3(x^2 - 6x + 5) = -3x^2 + 18x - 15$."
          },
          {
            n: "3.", points: 2,
            texte: "Dresse le tableau de variations de $B$ sur $[0\\,;6]$, avec les valeurs aux bornes et aux extremums.",
            indice: "$-3(x - 1)(x - 5)$ est un trinôme de coefficient $-3 < 0$ : négatif à l'extérieur des racines $1$ et $5$, positif entre.",
            corrige: "$B'(x)$ est négatif sur $[0\\,;1[$, positif sur $]1\\,;5[$ et négatif sur $]5\\,;6]$. De plus $B(0) = -10$, $B(1) = -1 + 9 - 15 - 10 = -17$, $B(5) = -125 + 225 - 75 - 10 = 15$ et $B(6) = -216 + 324 - 90 - 10 = 8$.",
            tableauCorrige: { lignes: [["x", "0", "", "1", "", "5", "", "6"], ["B'(x)", "", "-", "0", "+", "0", "-", ""], ["B(x)", "-10", "\\searrow", "-17", "\\nearrow", "15", "\\searrow", "8"]] }
          },
          {
            n: "4.", points: 1.5,
            texte: "Quelle production donne le bénéfice maximal ? Quel est ce bénéfice ?",
            indice: "Lis le maximum dans le tableau de variations, et pense aux unités.",
            corrige: "Le bénéfice est maximal pour $x = 5$ : en produisant $5\\,000$ litres, la coopérative gagne $B(5) = 15$ milliers d'euros, soit $15\\,000$ €."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « la coopérative fait un bénéfice pour toute production comprise entre $1\\,000$ et $5\\,000$ litres ». Justifie.",
            indice: "Un contre-exemple suffit : regarde la valeur de $B$ en $1$.",
            corrige: "**Faux.** Pour $x = 1$, $B(1) = -17 < 0$ : avec $1\\,000$ litres, la coopérative perd $17\\,000$ €. Un seul contre-exemple suffit."
          }
        ]
      },
      {
        titre: "Partie 2, exercice 2 : pile ou face, quatre lancers au plus",
        duree: 45, points: 7, calculatrice: false,
        contexte: "Un joueur lance une pièce équilibrée jusqu'à obtenir « pile », sans dépasser quatre lancers : il s'arrête au premier « pile », ou après le quatrième lancer. Les lancers sont indépendants. On note $X$ le nombre de lancers effectués.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $P(X = 1)$, $P(X = 2)$, $P(X = 3)$ et $P(X = 4)$.",
            indice: "$X = 2$ signifie « face, puis pile ». $X = 4$ signifie trois « face » de suite (le quatrième lancer est fait quoi qu'il arrive).",
            corrige: "$P(X = 1) = \\dfrac{1}{2}$, $P(X = 2) = \\dfrac{1}{2} \\times \\dfrac{1}{2} = \\dfrac{1}{4}$, $P(X = 3) = \\left(\\dfrac{1}{2}\\right)^3 = \\dfrac{1}{8}$ et $P(X = 4) = \\left(\\dfrac{1}{2}\\right)^3 = \\dfrac{1}{8}$ (trois « face » au début)."
          },
          {
            n: "2.", points: 1,
            texte: "Vérifie que la somme de ces probabilités vaut $1$.",
            indice: "Mets tout au dénominateur $8$.",
            corrige: "$\\dfrac{4}{8} + \\dfrac{2}{8} + \\dfrac{1}{8} + \\dfrac{1}{8} = \\dfrac{8}{8} = 1$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule l'espérance de $X$ et interprète-la.",
            indice: "Multiplie chaque nombre de lancers par sa probabilité, puis additionne les quatre produits, tous écrits avec le dénominateur $8$.",
            corrige: "$E(X) = \\dfrac{4}{8} + \\dfrac{4}{8} + \\dfrac{3}{8} + \\dfrac{4}{8} = \\dfrac{15}{8} = 1{,}875$. Sur un grand nombre de parties, le joueur fait en moyenne un peu moins de $2$ lancers par partie."
          },
          {
            n: "4.", points: 1.5,
            texte: "La partie coûte $m$ euros et le joueur reçoit $2X$ euros. Pour quelle mise le jeu est-il équitable ?",
            indice: "Le gain est $G = 2X - m$, et $E(G) = 2E(X) - m$ par linéarité.",
            corrige: "$E(G) = 2E(X) - m = \\dfrac{15}{4} - m$. Le jeu est équitable quand $E(G) = 0$, c'est-à-dire pour $m = \\dfrac{15}{4} = 3{,}75$ €."
          },
          {
            n: "5.", points: 1.5,
            texte:
              "Que calcule ce programme ? Autour de quelle valeur sera le nombre affiché ?\n\n" +
              "```python\nfrom random import random\n\ndef partie():\n    n = 1\n    while n < 4:\n        if random() < 0.5:\n            return n\n        n = n + 1\n    return n\n\ns = 0\nfor k in range(10000):\n    s = s + partie()\nprint(s / 10000)\n```",
            indice: "$\\texttt{random() < 0.5}$ simule « pile », qui arrête la partie. Que fait la boucle finale avec les résultats des parties ?",
            corrige: "$\\texttt{partie()}$ simule une partie et renvoie le nombre de lancers : elle s'arrête au premier « pile », ou quand $4$ lancers sont faits. Le programme affiche la moyenne du nombre de lancers sur $10\\,000$ parties : d'après la loi des grands nombres, elle sera proche de $E(X) = 1{,}875$."
          }
        ]
      }
    ]
  }
};
