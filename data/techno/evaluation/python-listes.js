/*
  ENTRAÎNEMENT : Première technologique — chapitre 2, Python : fonctions et listes
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre techno-python-listes.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Lignes de code : 29 caractères au plus dans un énoncé, 28 dans un indice ou un corrigé (écran de 360 px).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["techno-python-listes"] = {
  revisions: {
    intro: "Python en un coup d'œil : affectation, boucles, compteur et accumulateur, fonctions avec $\\texttt{return}$, listes et simulations avec $\\texttt{random()}$. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Affectation",
        texte: "$\\texttt{a = a + 1}$ : la variable $\\texttt{a}$ reçoit sa valeur augmentée de $1$. Le signe $\\texttt{=}$ range une valeur dans une variable : ce n'est pas une égalité."
      },
      {
        titre: "Boucles, compteur, accumulateur",
        texte:
          "- $\\texttt{for k in range(n):}$ fait prendre à $\\texttt{k}$ les valeurs $0$, $1$, …, $n - 1$ ;\n" +
          "- un compteur part de $0$ et augmente de $1$ à chaque cas trouvé ;\n" +
          "- un accumulateur part de $0$ et ajoute une valeur à chaque tour."
      },
      {
        titre: "Fonctions",
        texte: "$\\texttt{def f(x):}$, puis $\\texttt{return}$ : la fonction reçoit $\\texttt{x}$ et **renvoie** un résultat, que l'on peut réutiliser dans un calcul. $\\texttt{print}$ ne fait qu'afficher."
      },
      {
        titre: "Listes",
        texte:
          "- $\\texttt{L[0]}$ est le premier élément, $\\texttt{L[-1]}$ le dernier, $\\texttt{len(L)}$ le nombre d'éléments ;\n" +
          "- $\\texttt{L.append(x)}$ ajoute $\\texttt{x}$ à la fin de la liste ;\n" +
          "- $\\texttt{[x for x in L if x > 10]}$ garde les éléments qui vérifient la condition."
      },
      {
        titre: "Simuler",
        texte: "$\\texttt{random() < p}$ est vrai avec la probabilité $p$ : c'est un tirage de Bernoulli de paramètre $p$. Chaque appel de $\\texttt{random()}$ fait un nouveau tirage."
      }
    ],
    pieges: [
      "Croire que $\\texttt{range(n)}$ va jusqu'à $n$ : la dernière valeur est $n - 1$.",
      "Compter les indices à partir de $1$ : $\\texttt{L[0]}$ est le premier élément.",
      "Confondre $\\texttt{print}$ (afficher) et $\\texttt{return}$ (renvoyer une valeur réutilisable).",
      "Oublier d'initialiser le compteur ou l'accumulateur avant la boucle.",
      "Mettre le $\\texttt{print}$ dans la boucle alors qu'on veut seulement le résultat final.",
      "Écrire $\\texttt{x \\textasciicircum{} 2}$ pour le carré : en Python, c'est $\\texttt{x ** 2}$."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le tarif d'un taxi collectif",
        duree: 25, points: 7, calculatrice: false,
        contexte:
          "Un taxi collectif calcule le prix d'une course, en euros, à partir de la distance $\\texttt{d}$ parcourue, en kilomètres :\n\n" +
          "```python\ndef tarif(d):\n    if d <= 3:\n        return 2\n    else:\n        return 2 + 0.5*(d-3)\n```",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Que renvoient $\\texttt{tarif(2)}$, $\\texttt{tarif(3)}$ et $\\texttt{tarif(9)}$ ?",
            indice: "Pour $\\texttt{d = 3}$, la condition $\\texttt{d <= 3}$ est-elle vraie ?",
            corrige: "$2 \\leqslant 3$ et $3 \\leqslant 3$ : $\\texttt{tarif(2)}$ et $\\texttt{tarif(3)}$ renvoient $2$.\n\n$9 > 3$ : $\\texttt{tarif(9)}$ renvoie $2 + 0{,}5 \\times 6 = 5$, soit $5$ €."
          },
          {
            n: "2.", points: 1.5,
            texte: "Pour quelle distance la course coûte-t-elle $4$ € ?",
            indice: "Au-delà de $3$ km, résous $2 + 0{,}5(d - 3) = 4$.",
            corrige: "Au plus $3$ km, le prix est $2$ €. Au-delà : $2 + 0{,}5(d - 3) = 4 \\iff 0{,}5(d - 3) = 2 \\iff d - 3 = 4 \\iff d = 7$. La course coûte $4$ € pour $7$ km."
          },
          {
            n: "3.", points: 1,
            texte: "Pourquoi la fonction utilise-t-elle $\\texttt{return}$ et pas $\\texttt{print}$ ?",
            indice: "Regarde la question 4 : que fait-on du résultat de $\\texttt{tarif(d)}$ ?",
            corrige: "$\\texttt{return}$ renvoie le prix, qu'on peut réutiliser dans un calcul, par exemple l'additionner à d'autres prix. $\\texttt{print}$ l'afficherait seulement, sans pouvoir s'en servir ensuite."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Le chauffeur note les distances de ses courses d'une matinée. Qu'affiche ce programme ? Que représente ce nombre ?\n\n" +
              "```python\nD = [2, 5, 3, 9, 1, 7]\ns = 0\nfor d in D:\n    s = s + tarif(d)\nprint(s)\n```",
            indice: "Calcule le prix de chaque course, puis additionne : $\\texttt{s}$ est un accumulateur.",
            corrige: "Les prix sont $2$, $3$, $2$, $5$, $2$ et $4$ €. Le programme les additionne et affiche $\\texttt{18.0}$ : la recette de la matinée est de $18$ €."
          },
          {
            n: "5.", points: 1.5,
            texte: "Écris un programme qui compte les courses de plus de $3$ km de la liste $\\texttt{D}$. Qu'affiche-t-il ?",
            indice: "Un compteur $\\texttt{c}$ part de $0$ et augmente de $1$ quand $\\texttt{d > 3}$.",
            corrige:
              "```python\nc = 0\nfor d in D:\n    if d > 3:\n        c = c + 1\nprint(c)\n```\n\n" +
              "Il affiche $\\texttt{3}$ : les courses de $5$, $9$ et $7$ km."
          }
        ]
      },
      {
        titre: "Les ventes d'un snack",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Un snack de Mamoudzou note ses ventes de brochettes pendant une semaine, du lundi au dimanche, dans la liste $\\texttt{V = [42, 35, 50, 38, 61, 47, 56]}$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Que valent $\\texttt{V[0]}$, $\\texttt{V[3]}$, $\\texttt{V[-1]}$ et $\\texttt{len(V)}$ ? À quels jours correspondent les trois premières valeurs ?",
            indice: "Les indices commencent à $0$ ; $\\texttt{V[-1]}$ est le dernier élément.",
            corrige: "$\\texttt{V[0]}$ vaut $42$ (lundi), $\\texttt{V[3]}$ vaut $38$ (jeudi), $\\texttt{V[-1]}$ vaut $56$ (dimanche) et $\\texttt{len(V)}$ vaut $7$."
          },
          {
            n: "2.", points: 1.5,
            texte:
              "Qu'affiche ce programme ? Que représente ce nombre ?\n\n" +
              "```python\ns = 0\nfor v in V:\n    s = s + v\nprint(s / len(V))\n```",
            indice: "$\\texttt{s}$ additionne toutes les ventes ; on divise par le nombre de jours.",
            corrige: "$\\texttt{s}$ additionne toutes les ventes : $42 + 35 + 50 + 38 = 165$ et $61 + 47 + 56 = 164$, donc $\\texttt{s}$ vaut $329$. Puis $\\dfrac{329}{7} = 47$. Le programme affiche $\\texttt{47.0}$ : la vente moyenne est de $47$ brochettes par jour."
          },
          {
            n: "3.", points: 1.5,
            texte: "Que vaut la liste $\\texttt{[v for v in V if v > 47]}$ ? Combien de jours les ventes ont-elles dépassé la moyenne ?",
            indice: "On garde, dans l'ordre, les valeurs strictement supérieures à $47$.",
            corrige: "Elle vaut $\\texttt{[50, 61, 56]}$ : les ventes ont dépassé la moyenne $3$ jours (mercredi, vendredi et dimanche)."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Qu'affiche ce programme ? Explique le rôle de $\\texttt{m}$.\n\n" +
              "```python\nm = V[0]\nfor v in V:\n    if v > m:\n        m = v\nprint(m)\n```",
            indice: "Suis la valeur de $\\texttt{m}$ tour après tour : $42$, puis…",
            corrige: "$\\texttt{m}$ garde la plus grande valeur rencontrée : $42$, puis $50$ (mercredi), puis $61$ (vendredi). Le programme affiche $\\texttt{61}$, la meilleure vente de la semaine."
          },
          {
            n: "5.", points: 1,
            texte: "Le lundi suivant, le snack vend $44$ brochettes. Écris l'instruction qui l'ajoute à la fin de $\\texttt{V}$. Que vaut alors $\\texttt{len(V)}$ ?",
            indice: "Une méthode des listes ajoute un élément à la fin.",
            corrige: "$\\texttt{V.append(44)}$ ; la liste a alors $8$ éléments : $\\texttt{len(V)}$ vaut $8$."
          }
        ]
      },
      {
        titre: "Des tickets gagnants",
        duree: 25, points: 6, calculatrice: false,
        contexte:
          "Lors d'une opération commerciale, chaque ticket de caisse est gagnant avec la probabilité $0{,}2$, indépendamment des autres. On simule $50$ tickets avec ce programme :\n\n" +
          "```python\nfrom random import random\n\ndef ticket():\n    if random() < 0.2:\n        return 1\n    return 0\n\nT = []\nfor i in range(50):\n    T.append(ticket())\nc = 0\nfor x in T:\n    c = c + x\nprint(c)\n```",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Que renvoie la fonction $\\texttt{ticket()}$ ? Avec quelle probabilité renvoie-t-elle $1$ ?",
            indice: "$\\texttt{random()}$ renvoie un nombre au hasard entre $0$ et $1$.",
            corrige: "Elle renvoie $1$ (ticket gagnant) si $\\texttt{random() < 0.2}$, ce qui arrive avec la probabilité $0{,}2$, et $0$ sinon. Elle simule une loi de Bernoulli de paramètre $0{,}2$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Que contient la liste $\\texttt{T}$ ? Que représente le nombre affiché ? Donne un ordre de grandeur de ce nombre.",
            indice: "$\\texttt{c}$ additionne des $0$ et des $1$.",
            corrige: "$\\texttt{T}$ contient $50$ nombres égaux à $0$ ou $1$, un par ticket. En les additionnant, $\\texttt{c}$ compte les $1$ : le programme affiche le nombre de tickets gagnants parmi les $50$, souvent proche de $50 \\times 0{,}2 = 10$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Un élève remplace les trois lignes qui construisent $\\texttt{T}$ par $\\texttt{T = [ticket()] * 50}$. Pourquoi est-ce une erreur ?",
            indice: "Combien de fois la fonction $\\texttt{ticket()}$ est-elle appelée ?",
            corrige: "$\\texttt{ticket()}$ n'est appelée qu'une fois : son résultat est recopié $50$ fois. La liste ne contient que des $0$ ou que des $1$, et le programme affiche $0$ ou $50$ : ce n'est pas une simulation de $50$ tickets indépendants."
          },
          {
            n: "4.", points: 1.5,
            texte: "Modifie la dernière ligne pour afficher la fréquence des tickets gagnants. Obtient-on toujours la même valeur en relançant le programme ?",
            indice: "La fréquence, c'est le nombre de tickets gagnants divisé par le nombre de tickets.",
            corrige: "$\\texttt{print(c / 50)}$. On obtient souvent un nombre proche de $0{,}2$, mais pas toujours le même : il change d'une simulation à l'autre. C'est la fluctuation d'échantillonnage."
          }
        ]
      }
    ]
  }
};
