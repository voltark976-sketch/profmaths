/*
  ENTRAÎNEMENT : Première technologique — chapitre 14, Variables aléatoires et loi de Bernoulli
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre techno-variables-aleatoires.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Les écarts-types des fréquences sont donnés (obtenus par simulation), comme dans le programme de première technologique.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["techno-variables-aleatoires"] = {
  revisions: {
    intro: "Les variables aléatoires en un coup d'œil : loi de probabilité, espérance, jeu équitable, loi de Bernoulli et fluctuation des fréquences d'échantillons. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Loi de probabilité",
        texte: "Une variable aléatoire $X$ associe un nombre à chaque issue. Sa loi donne chaque valeur $x_i$ et sa probabilité $P(X = x_i)$ ; la somme de ces probabilités vaut $1$."
      },
      {
        titre: "Espérance",
        texte: "$E(X)$ est la somme des produits $x_i \\times P(X = x_i)$ : c'est la valeur moyenne de $X$ sur un très grand nombre de répétitions. Un jeu est équitable si l'espérance du gain est nulle."
      },
      {
        titre: "Gain algébrique",
        texte: "Le gain algébrique, c'est ce qu'on reçoit moins ce qu'on a payé : avec une mise de $2$ € et un lot de $10$ €, le gain vaut $8$ € ; sans lot, il vaut $-2$ €."
      },
      {
        titre: "Loi de Bernoulli",
        texte: "$X$ vaut $1$ (succès) avec la probabilité $p$ et $0$ (échec) avec la probabilité $1 - p$. Son espérance vaut $E(X) = p$."
      },
      {
        titre: "Fluctuation",
        texte:
          "Pour des échantillons de taille $n$, la fréquence observée $f$ change d'un échantillon à l'autre, autour de $p$. Si $s$ est l'écart-type des fréquences :\n" +
          "- environ $95\\,\\%$ des fréquences sont entre $p - 2s$ et $p + 2s$ ;\n" +
          "- presque toutes sont entre $p - 3s$ et $p + 3s$."
      },
      {
        titre: "Taille de l'échantillon",
        texte: "L'écart-type $s$ est de l'ordre de $\\dfrac{1}{\\sqrt{n}}$ : pour diviser la dispersion par $2$, il faut des échantillons $4$ fois plus grands."
      }
    ],
    pieges: [
      "Oublier de retirer la mise pour obtenir le gain algébrique.",
      "Calculer l'espérance comme la moyenne simple des valeurs, sans les probabilités.",
      "Oublier une valeur dans la loi : la somme des probabilités ne fait alors pas $1$.",
      "Confondre $P(X \\leqslant a)$ et $P(X < a)$.",
      "Croire que la fréquence observée doit être exactement égale à $p$.",
      "Penser que doubler la taille de l'échantillon divise la dispersion par $2$ : il faut la multiplier par $4$."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Un ticket à gratter",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Une association vend des tickets à gratter à $2$ € l'un. Un ticket fait gagner $10$ € avec la probabilité $0{,}05$, $4$ € avec la probabilité $0{,}15$, et rien sinon. On note $G$ le gain algébrique d'un joueur qui achète un ticket : ce qu'il gagne, moins les $2$ € payés.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Quelles valeurs peut prendre $G$ ? Donne la loi de probabilité de $G$.",
            indice: "Retire la mise de $2$ € à chaque lot. La probabilité de ne rien gagner est $1 - 0{,}05 - 0{,}15$.",
            corrige: "$G$ peut valoir $10 - 2 = 8$, $4 - 2 = 2$ ou $0 - 2 = -2$, avec $P(G = -2) = 1 - 0{,}05 - 0{,}15 = 0{,}8$.",
            tableauCorrige: { lignes: [["g", "-2", "2", "8"], ["P(G = g)", "0{,}8", "0{,}15", "0{,}05"]] }
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $P(G > 0)$ et $P(G \\leqslant 2)$. Traduis chaque résultat par une phrase.",
            indice: "$G > 0$ : le joueur gagne de l'argent.",
            corrige: "$P(G > 0) = 0{,}15 + 0{,}05 = 0{,}2$ : un joueur sur cinq gagne de l'argent.\n\n$P(G \\leqslant 2) = 0{,}8 + 0{,}15 = 0{,}95$ : dans $95\\,\\%$ des cas, le joueur gagne au plus $2$ €."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule l'espérance de $G$ et interprète-la.",
            indice: "Multiplie chaque gain par sa probabilité, puis additionne : $8 \\times 0{,}05$, $2 \\times 0{,}15$ et $(-2) \\times 0{,}8$.",
            corrige: "$E(G) = 0{,}4 + 0{,}3 - 1{,}6 = -0{,}9$ : sur un grand nombre de tickets, un joueur perd en moyenne $0{,}90$ € par ticket. Le jeu est défavorable au joueur (et rapporte à l'association)."
          },
          {
            n: "4.", points: 1.5,
            texte: "L'association veut rendre le jeu équitable en changeant seulement le gros lot de $10$ €. Quelle valeur $L$ doit-il avoir ?",
            indice: "Le gain correspondant devient $L - 2$. Résous $E(G) = 0$.",
            corrige: "$E(G) = 0{,}05(L - 2) + 0{,}3 - 1{,}6 = 0 \\iff 0{,}05(L - 2) = 1{,}3 \\iff L - 2 = 26 \\iff L = 28$. Le gros lot devrait valoir $28$ €."
          },
          {
            n: "5.", points: 1,
            texte: "Un joueur dit : « Les gains possibles sont $8$, $2$ et $-2$ ; leur moyenne est positive, donc le jeu est favorable. » Qu'en penses-tu ?",
            indice: "Les trois gains ont-ils la même probabilité ?",
            corrige: "Il a tort : il calcule une moyenne simple, comme si les trois gains avaient la même probabilité. Il faut pondérer par les probabilités : l'espérance vaut $-0{,}9$, le jeu est défavorable."
          }
        ]
      },
      {
        titre: "Des panneaux solaires",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans une ville, $30\\,\\%$ des foyers sont équipés de panneaux solaires (données fictives). On choisit un foyer au hasard et on note $X$ la variable aléatoire qui vaut $1$ si le foyer est équipé, et $0$ sinon.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Quelle est la loi de $X$ ? Calcule son espérance.",
            indice: "$X$ ne prend que les valeurs $0$ et $1$.",
            corrige: "$X$ suit la loi de Bernoulli de paramètre $p = 0{,}3$ : $P(X = 1) = 0{,}3$ et $P(X = 0) = 0{,}7$. Son espérance vaut $E(X) = 1 \\times 0{,}3 + 0 \\times 0{,}7 = 0{,}3$."
          },
          {
            n: "2.", points: 1.5,
            texte: "On interroge $400$ foyers choisis au hasard et on calcule la fréquence $f$ des foyers équipés. Pourquoi $f$ n'est-elle pas toujours égale à $0{,}3$ ?",
            indice: "Deux enquêtes sur $400$ foyers tirés au hasard donnent-elles les mêmes foyers ?",
            corrige: "Les $400$ foyers sont tirés au hasard : un autre tirage donne d'autres foyers, et une autre fréquence. $f$ est proche de $0{,}3$, mais elle fluctue d'un échantillon à l'autre : c'est la fluctuation d'échantillonnage."
          },
          {
            n: "3.", points: 1.5,
            texte: "En simulant $1\\,000$ échantillons de $400$ foyers, on obtient pour les fréquences un écart-type $s \\approx 0{,}023$. Donne les intervalles $[p - 2s\\,;p + 2s]$ et $[p - 3s\\,;p + 3s]$, et ce qu'ils représentent.",
            indice: "$2s = 0{,}046$ et $3s = 0{,}069$.",
            corrige: "$[0{,}3 - 0{,}046\\,;0{,}3 + 0{,}046] = [0{,}254\\,;0{,}346]$ contient environ $95\\,\\%$ des fréquences. $[0{,}3 - 0{,}069\\,;0{,}3 + 0{,}069] = [0{,}231\\,;0{,}369]$ en contient presque toutes."
          },
          {
            n: "4.", points: 1.5,
            texte: "Une enquête auprès de $400$ foyers d'un quartier donne $f = 0{,}38$. Qu'en penses-tu ?",
            indice: "Compare $0{,}38$ avec les intervalles de la question 3.",
            corrige: "$0{,}38 > 0{,}369$ : cette fréquence est en dehors de l'intervalle qui contient presque toutes les fréquences quand $p = 0{,}3$. C'est très inhabituel : on peut penser que ce quartier est plus équipé que la ville, sans en être certain."
          },
          {
            n: "5.", points: 1,
            texte: "Avec quelle taille d'échantillon les fréquences seraient-elles environ deux fois moins dispersées ?",
            indice: "L'écart-type est de l'ordre de $\\dfrac{1}{\\sqrt{n}}$.",
            corrige: "Pour diviser la dispersion par $2$, il faut multiplier la taille par $4$ : des échantillons de $1\\,600$ foyers."
          }
        ]
      },
      {
        titre: "Simuler des lancers de pièce",
        duree: 25, points: 6, calculatrice: false,
        contexte:
          "On étudie ce programme, qui simule des lancers d'une pièce équilibrée :\n\n" +
          "```python\nfrom random import random\n\ndef freq(n):\n    c = 0\n    for k in range(n):\n        if random() < 0.5:\n            c = c + 1\n    return c / n\n\nF = []\nfor i in range(1000):\n    F.append(freq(100))\n```",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Que renvoie $\\texttt{freq(100)}$ ?",
            indice: "$\\texttt{random() < 0.5}$ est vrai avec la probabilité $0{,}5$ : c'est un « pile ».",
            corrige: "La boucle simule $100$ lancers et $\\texttt{c}$ compte les « pile ». $\\texttt{freq(100)}$ renvoie donc la fréquence de « pile » dans un échantillon de $100$ lancers."
          },
          {
            n: "2.", points: 1.5,
            texte: "Que contient la liste $\\texttt{F}$ ? Ses nombres sont-ils tous égaux ? Autour de quelle valeur se répartissent-ils ?",
            indice: "La boucle appelle $1\\,000$ fois la fonction.",
            corrige: "$\\texttt{F}$ contient $1\\,000$ fréquences de « pile », une par échantillon de $100$ lancers. Elles ne sont pas toutes égales, à cause de la fluctuation, mais elles se répartissent autour de $0{,}5$."
          },
          {
            n: "3.", points: 1.5,
            texte:
              "L'écart-type des fréquences de $\\texttt{F}$ est d'environ $0{,}05$. On exécute ensuite ces lignes. Que compte $\\texttt{d}$ ? Quel nombre s'affiche environ ?\n\n" +
              "```python\ns = 0.05\nd = 0\nfor f in F:\n    if abs(f - 0.5) <= 2*s:\n        d = d + 1\nprint(d / 1000)\n```",
            indice: "$\\texttt{abs(f - 0.5)}$ est la distance entre $f$ et $0{,}5$.",
            corrige: "$\\texttt{d}$ compte les fréquences situées à au plus $2s = 0{,}1$ de $0{,}5$, c'est-à-dire entre $0{,}4$ et $0{,}6$. Environ $95\\,\\%$ des fréquences sont dans ce cas : le programme affiche un nombre proche de $0{,}95$."
          },
          {
            n: "4.", points: 1.5,
            texte: "On remplace $\\texttt{freq(100)}$ par $\\texttt{freq(400)}$. Que devient environ l'écart-type des fréquences ? Explique.",
            indice: "La taille de l'échantillon est multipliée par $4$.",
            corrige: "La taille est multipliée par $4$, donc l'écart-type, de l'ordre de $\\dfrac{1}{\\sqrt{n}}$, est divisé par $\\sqrt{4} = 2$ : il passe à environ $0{,}025$. Les fréquences sont plus concentrées autour de $0{,}5$."
          }
        ]
      }
    ]
  }
};
