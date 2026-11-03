/*
  ENTRAÎNEMENT : Première spécialité — chapitre 16, Expérimentations : échantillons
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-echantillons.
  Format : voir data/premiere/evaluation/second-degre-2.js. Sans calculatrice (épreuve anticipée) :
  racines carrées entières (√100, √400, √64, √256).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-echantillons"] = {
  revisions: {
    intro: "Les échantillons en un coup d'œil : simuler une loi, la moyenne d'un échantillon qui fluctue, l'écart $\\dfrac{2\\sigma}{\\sqrt{n}}$ et la méthode de Monte-Carlo. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Simuler une loi",
        texte: "$\\texttt{random()}$ donne un nombre au hasard dans $[0\\,;1[$. On découpe $[0\\,;1[$ en morceaux de longueurs égales aux probabilités : par exemple $\\texttt{r < 0.1}$ pour la première valeur, puis $\\texttt{r < 0.4}$ pour la deuxième si sa probabilité est $0{,}3$, etc."
      },
      {
        titre: "Échantillon",
        texte: "Un échantillon de taille $n$ de $X$ est formé de $n$ répétitions **indépendantes** de la même expérience. Sa moyenne $m$ change d'un échantillon à l'autre : elle **fluctue** autour de l'espérance $\\mu = E(X)$."
      },
      {
        titre: "Loi des grands nombres",
        texte: "Plus la taille $n$ de l'échantillon est grande, plus la moyenne $m$ a de chances d'être proche de l'espérance $\\mu$."
      },
      {
        titre: "L'écart 2σ/√n",
        texte:
          "Pour des échantillons de taille $n$ assez grande, dans environ $95\\,\\%$ des cas :\n\n" +
          "$|m - \\mu| \\leqslant \\dfrac{2\\sigma}{\\sqrt{n}}$, où $\\sigma = \\sigma(X)$."
      },
      {
        titre: "Taille et précision",
        texte: "La marge $\\dfrac{2\\sigma}{\\sqrt{n}}$ est divisée par $2$ quand $n$ est multiplié par $4$ (et non par $2$) : pour gagner en précision, il faut beaucoup plus de données."
      },
      {
        titre: "Estimer une espérance",
        texte: "Avec un seul échantillon de moyenne $m$, on retourne le raisonnement : dans environ $95\\,\\%$ des cas, $\\mu$ est entre $m - \\dfrac{2\\sigma}{\\sqrt{n}}$ et $m + \\dfrac{2\\sigma}{\\sqrt{n}}$."
      },
      {
        titre: "Méthode de Monte-Carlo",
        texte: "On tire des points au hasard dans le carré $[0\\,;1] \\times [0\\,;1]$, d'aire $1$ : la proportion de points sous une courbe estime l'aire sous la courbe. Dans le quart de disque de rayon $1$, elle estime $\\dfrac{\\pi}{4}$, donc $4$ fois la proportion estime $\\pi$."
      }
    ],
    pieges: [
      "Croire que la moyenne d'un échantillon est égale à l'espérance : elle fluctue autour.",
      "Diviser par $n$ au lieu de $\\sqrt{n}$ dans $\\dfrac{2\\sigma}{\\sqrt{n}}$.",
      "Penser que $100\\,\\%$ des moyennes sont dans l'intervalle : c'est environ $95\\,\\%$.",
      "Croire qu'il suffit de doubler $n$ pour diviser la marge par $2$ : il faut multiplier $n$ par $4$.",
      "Utiliser deux $\\texttt{random()}$ différents pour un même tirage : chaque appel donne un nouveau nombre.",
      "Oublier de multiplier par $4$ pour estimer $\\pi$ : la proportion estime $\\dfrac{\\pi}{4}$."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Les poules de la ferme",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans une ferme de Dembéni, le nombre $X$ d'œufs pondus par une poule en une semaine suit la loi : $4$ œufs avec la probabilité $0{,}1$, $5$ avec $0{,}3$, $6$ avec $0{,}4$ et $7$ avec $0{,}2$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Montre que $E(X) = 5{,}7$, puis que l'écart type de $X$ vaut $0{,}9$.",
            indice: "Calcule $E(X^2)$ en pondérant les carrés $16$, $25$, $36$ et $49$ par les probabilités, puis $V(X) = E(X^2) - E(X)^2$.",
            corrige:
              "$E(X) = 0{,}4 + 1{,}5 + 2{,}4 + 1{,}4 = 5{,}7$.\n\n" +
              "$E(X^2) = 1{,}6 + 7{,}5 + 14{,}4 + 9{,}8 = 33{,}3$, donc $V(X) = 33{,}3 - 5{,}7^2 = 33{,}3 - 32{,}49 = 0{,}81$ et $\\sigma(X) = \\sqrt{0{,}81} = 0{,}9$."
          },
          {
            n: "2.", points: 1.5,
            texte:
              "Explique pourquoi cette fonction simule le nombre d'œufs d'une poule. Avec quelle probabilité renvoie-t-elle $6$ ?\n\n" +
              "```python\nfrom random import random\n\ndef oeufs():\n    r = random()\n    if r < 0.1:\n        return 4\n    elif r < 0.4:\n        return 5\n    elif r < 0.8:\n        return 6\n    else:\n        return 7\n```",
            indice: "$\\texttt{r}$ est un nombre au hasard de $[0\\,;1[$ : quelle est la longueur de chaque morceau ?",
            corrige: "Les morceaux $[0\\,;0{,}1[$, $[0{,}1\\,;0{,}4[$, $[0{,}4\\,;0{,}8[$ et $[0{,}8\\,;1[$ ont pour longueurs $0{,}1$, $0{,}3$, $0{,}4$ et $0{,}2$ : ce sont les probabilités de $4$, $5$, $6$ et $7$ œufs. La fonction renvoie $6$ quand $0{,}4 \\leqslant r < 0{,}8$, avec la probabilité $0{,}4$."
          },
          {
            n: "3.", points: 1.5,
            texte: "On observe des échantillons de $100$ poules. Dans quel intervalle se trouve la moyenne d'œufs de l'échantillon, dans environ $95\\,\\%$ des cas ?",
            indice: "Calcule $\\dfrac{2\\sigma}{\\sqrt{n}}$ avec $\\sigma = 0{,}9$ et $\\sqrt{100} = 10$.",
            corrige: "$\\dfrac{2\\sigma}{\\sqrt{n}} = \\dfrac{2 \\times 0{,}9}{10} = 0{,}18$. Dans environ $95\\,\\%$ des cas, la moyenne $m$ est dans $[5{,}7 - 0{,}18\\,;5{,}7 + 0{,}18]$, c'est-à-dire $[5{,}52\\,;5{,}88]$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Quelle taille d'échantillon faut-il pour que la marge $\\dfrac{2\\sigma}{\\sqrt{n}}$ ne dépasse pas $0{,}09$ ?",
            indice: "Résous $\\dfrac{1{,}8}{\\sqrt{n}} \\leqslant 0{,}09$, c'est-à-dire $\\sqrt{n} \\geqslant 20$.",
            corrige: "$\\dfrac{1{,}8}{\\sqrt{n}} \\leqslant 0{,}09 \\iff \\sqrt{n} \\geqslant \\dfrac{1{,}8}{0{,}09} = 20 \\iff n \\geqslant 400$. Il faut au moins $400$ poules : pour diviser la marge par $2$, on a multiplié la taille par $4$."
          },
          {
            n: "5.", points: 1,
            texte: "On simule $1\\,000$ échantillons de $100$ poules. Environ combien de moyennes seront en dehors de $[5{,}52\\,;5{,}88]$ ?",
            indice: "Environ $95\\,\\%$ sont dedans.",
            corrige: "Environ $5\\,\\%$ des moyennes sont en dehors : $0{,}05 \\times 1\\,000 = 50$ environ. Ce n'est qu'un ordre de grandeur, qui varie d'une simulation à l'autre."
          }
        ]
      },
      {
        titre: "La pêche du matin",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Un pêcheur de M'tsapéré pèse $64$ poissons pris au hasard dans sa pêche du matin : leur masse moyenne est $m = 1{,}2$ kg. On suppose que l'écart type de la masse d'un poisson est $\\sigma \\approx 0{,}4$ kg, et on cherche à estimer la masse moyenne $\\mu$ des poissons de ce type.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule la marge $\\dfrac{2\\sigma}{\\sqrt{n}}$.",
            indice: "$n = 64$ et $\\sqrt{64} = 8$.",
            corrige: "$\\dfrac{2 \\times 0{,}4}{\\sqrt{64}} = \\dfrac{0{,}8}{8} = 0{,}1$ kg."
          },
          {
            n: "2.", points: 1.5,
            texte: "Que peut-on dire de la masse moyenne $\\mu$ ?",
            indice: "Dans environ $95\\,\\%$ des cas, $\\mu$ est à moins de la marge de la moyenne observée $m$.",
            corrige: "Dans environ $95\\,\\%$ des cas, $\\mu$ est entre $m - 0{,}1$ et $m + 0{,}1$ : on estime que la masse moyenne de ces poissons est comprise entre $1{,}1$ et $1{,}3$ kg. Ce n'est pas une certitude : environ un échantillon sur $20$ donnerait un intervalle qui ne contient pas $\\mu$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Un autre pêcheur affirme que ces poissons pèsent en moyenne $1{,}5$ kg. Est-ce plausible ?",
            indice: "$1{,}5$ est-il dans l'intervalle de la question 2 ?",
            corrige: "$1{,}5$ n'est pas dans $[1{,}1\\,;1{,}3]$ : avec cet échantillon, une moyenne de $1{,}5$ kg est **peu plausible**. On ne peut pas l'exclure de façon certaine, mais une telle moyenne rendrait très improbable l'échantillon observé."
          },
          {
            n: "4.", points: 1.5,
            texte: "Combien de poissons faudrait-il peser pour obtenir une marge de $0{,}05$ kg ?",
            indice: "Résous $\\dfrac{0{,}8}{\\sqrt{n}} = 0{,}05$.",
            corrige: "$\\dfrac{0{,}8}{\\sqrt{n}} = 0{,}05 \\iff \\sqrt{n} = 16 \\iff n = 256$. Il faudrait peser $256$ poissons, quatre fois plus."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « en pesant deux fois plus de poissons, on divise la marge par $2$ ». Justifie.",
            indice: "Que devient $\\sqrt{n}$ quand $n$ est multiplié par $2$ ?",
            corrige: "**Faux.** Avec $2n$ poissons, $\\sqrt{2n} = \\sqrt{2} \\times \\sqrt{n}$ : la marge est divisée par $\\sqrt{2} \\approx 1{,}4$ seulement. Pour la diviser par $2$, il faut quatre fois plus de poissons (question 4)."
          }
        ]
      },
      {
        titre: "Monte-Carlo : des aires au hasard",
        duree: 20, points: 6, calculatrice: false,
        contexte: "On tire des points $M(x\\,;y)$ au hasard dans le carré $[0\\,;1] \\times [0\\,;1]$, d'aire $1$ : la probabilité qu'un point tombe dans une partie du carré est égale à l'aire de cette partie.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Quelle est la probabilité qu'un point vérifie $y \\leqslant x$ ? Justifie avec une aire.",
            indice: "Les points tels que $y \\leqslant x$ forment un triangle sous la diagonale du carré.",
            corrige: "Les points tels que $y \\leqslant x$ forment le triangle rectangle sous la diagonale, d'aire $\\dfrac{1 \\times 1}{2} = \\dfrac{1}{2}$ : la probabilité vaut $\\dfrac{1}{2}$."
          },
          {
            n: "2.", points: 1.5,
            texte:
              "On exécute ce programme avec $N = 10\\,000$ et il affiche environ $0{,}334$. Qu'estime-t-il ?\n\n" +
              "```python\nfrom random import random\n\ndef aire(N):\n    c = 0\n    for k in range(N):\n        x = random()\n        y = random()\n        if y <= x**2:\n            c = c + 1\n    return c / N\n```",
            indice: "$\\texttt{c}$ compte les points sous la courbe de $y = x^2$.",
            corrige: "Le programme calcule la proportion de points tirés sous la parabole $y = x^2$. Elle estime l'aire sous la courbe de $x \\mapsto x^2$ entre $0$ et $1$ : environ $0{,}334$ (on montrera en Terminale qu'elle vaut exactement $\\dfrac{1}{3}$)."
          },
          {
            n: "3.", points: 1.5,
            texte: "Sur $10\\,000$ points, $7\\,850$ vérifient $x^2 + y^2 \\leqslant 1$. Quelle valeur approchée de $\\pi$ en déduit-on ?",
            indice: "Ces points sont dans le quart de disque de rayon $1$, d'aire $\\dfrac{\\pi}{4}$.",
            corrige: "La proportion $0{,}785$ estime l'aire $\\dfrac{\\pi}{4}$ du quart de disque, donc $\\pi \\approx 4 \\times 0{,}785 = 3{,}14$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Vrai ou faux : « avec $4$ fois plus de points, l'estimation est en général environ $2$ fois plus précise ». Justifie.",
            indice: "La marge d'une moyenne d'échantillon varie comme $\\dfrac{1}{\\sqrt{n}}$.",
            corrige: "**Vrai.** La proportion est la moyenne d'un échantillon de $N$ valeurs ($1$ si le point est dedans, $0$ sinon) : sa marge varie comme $\\dfrac{1}{\\sqrt{N}}$. Avec $4N$ points, elle est divisée par $\\sqrt{4} = 2$."
          }
        ]
      }
    ]
  }
};
