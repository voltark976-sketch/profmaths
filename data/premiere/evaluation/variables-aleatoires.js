/*
  ENTRAÎNEMENT : Première spécialité — chapitre 13, Variables aléatoires
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-variables-aleatoires.
  Format : voir data/premiere/evaluation/second-degre-2.js. Sans calculatrice (épreuve anticipée).
  Épreuves répétées : arbre, n ⩽ 4, sans loi binomiale (Terminale).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-variables-aleatoires"] = {
  revisions: {
    intro: "Les variables aléatoires en un coup d'œil : la loi, l'espérance, la variance, la linéarité et les épreuves répétées. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Loi de probabilité",
        texte: "Une variable aléatoire $X$ associe un nombre à chaque issue. Sa **loi** donne chaque valeur $x_i$ avec sa probabilité $p_i = P(X = x_i)$, et $p_1 + p_2 + \\dots + p_n = 1$."
      },
      {
        titre: "Notations",
        texte: "$P(X \\leqslant a)$ est la somme des $P(X = x_i)$ pour $x_i \\leqslant a$. L'événement contraire de $\\{X \\leqslant a\\}$ est $\\{X > a\\}$ (et non $\\{X \\geqslant a\\}$) : $P(X > a) = 1 - P(X \\leqslant a)$."
      },
      {
        titre: "Espérance",
        texte:
          "$E(X) = p_1x_1 + p_2x_2 + \\dots + p_nx_n$.\n\n" +
          "Sur un grand nombre de répétitions, la moyenne des valeurs obtenues se rapproche de $E(X)$."
      },
      {
        titre: "Jeu équitable",
        texte: "Le gain algébrique est « ce qu'on reçoit moins la mise ». Le jeu est **équitable** si l'espérance du gain est nulle, favorable au joueur si elle est positive."
      },
      {
        titre: "Variance et écart type",
        texte:
          "$V(X)$ est la moyenne des carrés des écarts $(x_i - E(X))^2$, pondérés par les probabilités $p_i$. Plus rapide :\n\n" +
          "$V(X) = E(X^2) - E(X)^2$.\n\n" +
          "L'écart type est $\\sigma(X) = \\sqrt{V(X)}$ : il mesure la dispersion autour de l'espérance."
      },
      {
        titre: "Linéarité",
        texte:
          "- $E(aX + b) = aE(X) + b$ ;\n" +
          "- $V(aX + b) = a^2\\,V(X)$ et $\\sigma(aX + b) = |a|\\,\\sigma(X)$.\n\n" +
          "Ajouter $b$ ne change pas la dispersion."
      },
      {
        titre: "Épreuves répétées",
        texte: "Pour $n$ épreuves de Bernoulli indépendantes (succès de probabilité $p$), on fait un arbre : la probabilité d'un chemin est le produit des branches, et on additionne tous les chemins qui réalisent l'événement (par exemple « exactement un succès »)."
      },
      {
        titre: "Python : espérance",
        texte:
          "Avec la liste $\\texttt{x}$ des valeurs et la liste $\\texttt{p}$ des probabilités :\n\n" +
          "```python\ndef esperance(x, p):\n    s = 0\n    for i in range(len(x)):\n        s = s + x[i] * p[i]\n    return s\n```"
      }
    ],
    pieges: [
      "Oublier de retirer la mise : le gain algébrique est « lot moins prix du billet ».",
      "Confondre $P(X < a)$ et $P(X \\leqslant a)$ : la valeur $a$ est exclue de la première.",
      "Nier $\\{X \\leqslant a\\}$ par $\\{X \\geqslant a\\}$ : la négation est $\\{X > a\\}$.",
      "Oublier le carré dans $V(X) = E(X^2) - E(X)^2$.",
      "Écrire $V(aX + b) = aV(X) + b$ : c'est $a^2V(X)$.",
      "Ne compter qu'un seul chemin de l'arbre alors que plusieurs réalisent l'événement."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "La roue de la fête du village",
        duree: 25, points: 7, calculatrice: false,
        contexte: "À la fête de Bouéni, une roue est partagée en $8$ secteurs de même taille : $1$ secteur rapporte $10$ €, $2$ secteurs rapportent $5$ € et les $5$ autres ne rapportent rien. Une partie coûte $2$ €. On note $X$ le gain algébrique du joueur : ce qu'il reçoit moins sa mise.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Donne la loi de probabilité de $X$.",
            indice: "Les valeurs de $X$ sont $10 - 2$, $5 - 2$ et $0 - 2$. Les secteurs ont la même taille.",
            corrige: "$X$ prend les valeurs $8$, $3$ et $-2$, avec $P(X = 8) = \\dfrac{1}{8}$, $P(X = 3) = \\dfrac{2}{8} = \\dfrac{1}{4}$ et $P(X = -2) = \\dfrac{5}{8}$. On vérifie que $\\dfrac{1}{8} + \\dfrac{2}{8} + \\dfrac{5}{8} = 1$.",
            tableauCorrige: { lignes: [["x_i", "-2", "3", "8"], ["P(X = x_i)", "\\dfrac{5}{8}", "\\dfrac{2}{8}", "\\dfrac{1}{8}"]] }
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule l'espérance de $X$. Le jeu est-il favorable au joueur ou à l'organisateur ?",
            indice: "$E(X) = \\dfrac{1}{8} \\times 8 + \\dfrac{2}{8} \\times 3 + \\dfrac{5}{8} \\times (-2)$.",
            corrige: "$E(X) = \\dfrac{8 + 6 - 10}{8} = \\dfrac{4}{8} = 0{,}5$. L'espérance est positive : en moyenne, le joueur gagne $0{,}50$ € par partie. Le jeu est favorable au joueur, et l'organisateur perd de l'argent !"
          },
          {
            n: "3.", points: 1,
            texte: "Calcule $P(X > 0)$ et interprète.",
            indice: "$X > 0$ quand la roue s'arrête sur un secteur gagnant.",
            corrige: "$P(X > 0) = P(X = 3) + P(X = 8) = \\dfrac{3}{8}$ : le joueur ressort gagnant dans $3$ parties sur $8$ en moyenne."
          },
          {
            n: "4.", points: 1.5,
            texte: "Quel prix de la partie rendrait le jeu équitable ? Et pour que l'organisateur gagne en moyenne $0{,}50$ € par partie ?",
            indice: "Avec une mise $m$, l'espérance du gain est l'espérance des lots moins $m$. Calcule d'abord l'espérance des lots.",
            corrige: "L'espérance des lots vaut $\\dfrac{1}{8} \\times 10 + \\dfrac{2}{8} \\times 5 = \\dfrac{20}{8} = 2{,}5$ €. Avec une mise $m$, l'espérance du gain est $2{,}5 - m$ : le jeu est équitable pour $m = 2{,}50$ €. Pour que l'organisateur gagne $0{,}50$ € par partie en moyenne, il faut $2{,}5 - m = -0{,}5$, soit $m = 3$ €."
          },
          {
            n: "5.", points: 1.5,
            texte: "Avec la mise de $2$ €, calcule la variance de $X$. On donne $\\sqrt{12{,}5} \\approx 3{,}5$ : que vaut environ l'écart type ?",
            indice: "$V(X) = E(X^2) - E(X)^2$, avec $E(X^2) = \\dfrac{1}{8} \\times 64 + \\dfrac{2}{8} \\times 9 + \\dfrac{5}{8} \\times 4$.",
            corrige: "$E(X^2) = \\dfrac{64 + 18 + 20}{8} = \\dfrac{102}{8} = 12{,}75$, donc $V(X) = 12{,}75 - 0{,}5^2 = 12{,}5$ et $\\sigma(X) = \\sqrt{12{,}5} \\approx 3{,}5$ €. Les gains sont très dispersés autour de la moyenne $0{,}5$ €."
          }
        ]
      },
      {
        titre: "Trois tirs au but",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Lors d'un entraînement au stade de Cavani, Djalim tire trois penaltys. À chaque tir, il marque avec la probabilité $0{,}8$, indépendamment des autres tirs. On note $X$ le nombre de buts marqués.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Représente la situation par un arbre et calcule la probabilité que Djalim marque ses trois tirs.",
            indice: "Chaque tir est une épreuve de Bernoulli : but $B$ (probabilité $0{,}8$) ou échec $\\overline{B}$ (probabilité $0{,}2$). L'arbre a $8$ chemins.",
            corrige: "L'arbre a $3$ niveaux et $8$ chemins ; à chaque nœud, la branche $B$ porte $0{,}8$ et la branche $\\overline{B}$ porte $0{,}2$. Un seul chemin donne trois buts : $P(X = 3) = 0{,}8^3 = 0{,}512$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $P(X = 0)$, puis la probabilité que Djalim marque au moins une fois.",
            indice: "« Au moins un but » est l'événement contraire de « aucun but ».",
            corrige: "$P(X = 0) = 0{,}2^3 = 0{,}008$, donc $P(X \\geqslant 1) = 1 - 0{,}008 = 0{,}992$."
          },
          {
            n: "3.", points: 2,
            texte: "Calcule $P(X = 2)$ et $P(X = 1)$. Vérifie que la somme des probabilités de la loi de $X$ vaut $1$.",
            indice: "Trois chemins donnent exactement deux buts (l'échec peut être au 1er, au 2e ou au 3e tir), et ils ont la même probabilité.",
            corrige:
              "Deux buts : $3$ chemins de probabilité $0{,}8^2 \\times 0{,}2 = 0{,}128$, donc $P(X = 2) = 3 \\times 0{,}128 = 0{,}384$.\n\n" +
              "Un but : $3$ chemins de probabilité $0{,}8 \\times 0{,}2^2 = 0{,}032$, donc $P(X = 1) = 0{,}096$.\n\n" +
              "Total : $0{,}008 + 0{,}096 + 0{,}384 + 0{,}512 = 1$."
          },
          {
            n: "4.", points: 1,
            texte: "Calcule l'espérance de $X$.",
            indice: "Multiplie chaque valeur de $X$ par sa probabilité, puis additionne les quatre produits.",
            corrige: "$E(X) = 0{,}096 + 2 \\times 0{,}384 + 3 \\times 0{,}512 = 0{,}096 + 0{,}768 + 1{,}536 = 2{,}4$."
          },
          {
            n: "5.", points: 1,
            texte: "Interprète $E(X)$. Compare avec le produit $3 \\times 0{,}8$.",
            indice: "L'espérance est une moyenne sur un grand nombre de séances de trois tirs.",
            corrige: "Sur un grand nombre de séances de trois tirs, Djalim marque en moyenne $2{,}4$ buts par séance. C'est exactement $3 \\times 0{,}8$ : trois tirs, chacun réussi $8$ fois sur $10$ en moyenne."
          }
        ]
      },
      {
        titre: "Le food-truck de la plage",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Un food-truck vend des assiettes de brochettes à la plage de Sakouli. Le nombre $X$ d'assiettes vendues en une heure est une variable aléatoire telle que $E(X) = 20$ et $V(X) = 9$. Le bénéfice horaire, en euros, est $B = 4X - 30$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule l'espérance du bénéfice horaire.",
            indice: "Linéarité : $E(aX + b) = aE(X) + b$.",
            corrige: "$E(B) = 4E(X) - 30 = 4 \\times 20 - 30 = 50$ € : en moyenne, le food-truck gagne $50$ € par heure."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule la variance et l'écart type de $B$.",
            indice: "$V(aX + b) = a^2\\,V(X)$.",
            corrige: "$V(B) = 4^2 \\times V(X) = 16 \\times 9 = 144$, donc $\\sigma(B) = \\sqrt{144} = 12$ €. (Et $\\sigma(X) = 3$ : l'écart type est multiplié par $4$.)"
          },
          {
            n: "3.", points: 1,
            texte: "Vrai ou faux : « $V(4X - 30) = 4V(X) - 30$ ». Justifie.",
            indice: "Compare avec ta réponse à la question 2.",
            corrige: "**Faux.** $4V(X) - 30 = 36 - 30 = 6$, alors que $V(4X - 30) = 144$. Retirer $30$ ne change pas la dispersion, et le coefficient $4$ intervient au carré."
          },
          {
            n: "4.", points: 1,
            texte:
              "Que renvoie $\\texttt{esperance(x, p)}$ avec les listes ci-dessous ?\n\n" +
              "```python\ndef esperance(x, p):\n    s = 0\n    for i in range(len(x)):\n        s = s + x[i] * p[i]\n    return s\n\nx = [0, 1, 2, 3]\np = [0.1, 0.2, 0.3, 0.4]\n```",
            indice: "La fonction calcule $p_1x_1 + p_2x_2 + \\dots$ avec les deux listes.",
            corrige: "Les produits $x_i \\times p_i$ valent $0$, $0{,}2$, $0{,}6$ et $1{,}2$, de somme $2$ : la fonction renvoie l'espérance $2$ (Python peut afficher $\\texttt{2.0}$, ou une valeur très proche à cause des arrondis)."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « l'événement contraire de $\\{X \\leqslant 2\\}$ est $\\{X \\geqslant 2\\}$ ». Justifie.",
            indice: "La valeur $2$ peut-elle appartenir à un événement et à son contraire ?",
            corrige: "**Faux.** La valeur $2$ serait dans les deux événements. Le contraire de $\\{X \\leqslant 2\\}$ est $\\{X > 2\\}$."
          }
        ]
      }
    ]
  }
};
