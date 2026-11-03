/*
  ENTRAÎNEMENT : Première technologique — chapitre 13, Répétition d'épreuves de Bernoulli
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre techno-epreuves-bernoulli.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Au plus 4 épreuves, sans loi binomiale (hors programme de première technologique).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["techno-epreuves-bernoulli"] = {
  revisions: {
    intro: "Les épreuves répétées en un coup d'œil : épreuve de Bernoulli, arbre et règle du produit, exactement $k$ succès, au moins un succès et indépendance des tirages. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Épreuve de Bernoulli",
        texte: "Une expérience à deux issues : le succès $S$, de probabilité $p$, et l'échec $\\overline{S}$, de probabilité $1 - p$. Le nombre $p$ est le paramètre."
      },
      {
        titre: "Répéter et multiplier",
        texte: "Pour $n$ épreuves identiques et indépendantes, on fait un arbre : la probabilité d'un chemin est le **produit** des probabilités de ses branches, par exemple $P(S\\overline{S}S) = p \\times (1 - p) \\times p$."
      },
      {
        titre: "Exactement $k$ succès",
        texte: "On repère **tous** les chemins qui réalisent l'événement, puis on **additionne** leurs probabilités. Avec $3$ épreuves, « exactement $2$ succès » correspond à $3$ chemins : $SS\\overline{S}$, $S\\overline{S}S$ et $\\overline{S}SS$."
      },
      {
        titre: "Au moins un succès",
        texte: "Son contraire, « aucun succès », n'a qu'un chemin, de probabilité $(1 - p)^n$. Donc $P(\\text{au moins un succès}) = 1 - (1 - p)^n$."
      },
      {
        titre: "Indépendance",
        texte: "Des tirages avec remise, ou dans une très grande population, sont indépendants. Sans remise dans un petit lot, les probabilités changent d'un tirage à l'autre : ce ne sont plus des épreuves indépendantes."
      }
    ],
    pieges: [
      "Additionner les probabilités le long d'un chemin au lieu de les multiplier.",
      "Oublier des chemins pour « exactement $k$ succès » : il y en a souvent plusieurs.",
      "Calculer « au moins un succès » par $n \\times p$ : on passe par l'événement contraire.",
      "Modéliser des tirages sans remise dans un petit lot par des épreuves indépendantes.",
      "Oublier les échecs dans la probabilité d'un chemin.",
      "Confondre « aucun succès », $(1 - p)^n$, et « que des succès », $p^n$."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Répondre au hasard à un QCM",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Un QCM propose, pour chaque question, quatre réponses dont une seule est juste. Un élève qui n'a pas révisé répond au hasard, indépendamment d'une question à l'autre.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Justifie qu'une question est une épreuve de Bernoulli et donne son paramètre. Représente par un arbre les réponses à deux questions.",
            indice: "Succès : la réponse est juste. Une réponse sur quatre est juste.",
            corrige: "Deux issues : la réponse est juste (succès $J$) ou fausse. Le paramètre est $p = \\dfrac{1}{4}$. L'arbre a deux niveaux, un par question :",
            figureCorrige: (o) => o.arbreProba(["J", "~J", "J", "~J"], ["1/4", "3/4", "1/4", "3/4", "1/4", "3/4"], "Arbre pondéré à deux niveaux : réponse juste J avec la probabilité 1/4 et fausse avec 3/4, à chaque question")
          },
          {
            n: "2.", points: 1.5,
            texte: "Avec deux questions, calcule la probabilité d'avoir deux bonnes réponses, puis celle de n'en avoir aucune. Donne-les sous forme de fraction.",
            indice: "Multiplie les probabilités le long du chemin.",
            corrige: "$P(JJ) = \\dfrac{1}{4} \\times \\dfrac{1}{4} = \\dfrac{1}{16}$ et $P(\\overline{J}\\,\\overline{J}) = \\dfrac{3}{4} \\times \\dfrac{3}{4} = \\dfrac{9}{16}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule la probabilité d'avoir exactement une bonne réponse sur les deux, sous forme de fraction. Vérifie que la somme des trois probabilités vaut $1$.",
            indice: "Deux chemins : $J\\overline{J}$ et $\\overline{J}J$.",
            corrige: "$P(J\\overline{J}) + P(\\overline{J}J) = \\dfrac{3}{16} + \\dfrac{3}{16} = \\dfrac{6}{16} = \\dfrac{3}{8}$. Et $\\dfrac{1}{16} + \\dfrac{6}{16} + \\dfrac{9}{16} = 1$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Le QCM compte maintenant quatre questions. Calcule la probabilité d'avoir au moins une bonne réponse, sous forme de fraction.",
            indice: "Passe par l'événement contraire : aucune bonne réponse.",
            corrige: "Aucune bonne réponse : $\\left(\\dfrac{3}{4}\\right)^4 = \\dfrac{81}{256}$. Donc la probabilité d'au moins une bonne réponse vaut $1 - \\dfrac{81}{256} = \\dfrac{175}{256}$."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « Avec quatre questions, $4 \\times \\dfrac{1}{4} = 1$ : l'élève est sûr d'avoir au moins une bonne réponse. » Justifie.",
            indice: "Compare avec le résultat de la question 4.",
            corrige: "**Faux.** La probabilité d'au moins une bonne réponse est $\\dfrac{175}{256}$, inférieure à $1$ : l'élève peut tout rater, avec la probabilité $\\dfrac{81}{256}$. On ne multiplie pas $n$ par $p$."
          }
        ]
      },
      {
        titre: "Les feux tricolores",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Sur son trajet, un bus scolaire passe trois feux tricolores. À son arrivée, chaque feu est vert avec la probabilité $0{,}7$, indépendamment des autres. On note $V$ « le feu est vert » et $\\overline{V}$ « il ne l'est pas ».",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule la probabilité que les trois feux soient verts.",
            indice: "Un seul chemin : $VVV$.",
            corrige: "$P(VVV) = 0{,}7 \\times 0{,}7 \\times 0{,}7 = 0{,}49 \\times 0{,}7 = 0{,}343$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule la probabilité qu'exactement deux feux soient verts.",
            indice: "Trois chemins : $VV\\overline{V}$, $V\\overline{V}V$ et $\\overline{V}VV$, qui ont la même probabilité.",
            corrige: "Chacun des trois chemins a pour probabilité $0{,}7 \\times 0{,}7 \\times 0{,}3 = 0{,}147$. Donc la probabilité d'exactement deux feux verts vaut $3 \\times 0{,}147 = 0{,}441$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule la probabilité que le bus trouve au moins un feu qui n'est pas vert.",
            indice: "C'est l'événement contraire de « trois feux verts ».",
            corrige: "C'est le contraire de « trois feux verts » : $1 - 0{,}343 = 0{,}657$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Calcule la probabilité d'exactement un feu vert, puis celle d'aucun feu vert. Vérifie que les quatre probabilités trouvées ont une somme égale à $1$.",
            indice: "Exactement un feu vert : trois chemins de probabilité $0{,}7 \\times 0{,}3 \\times 0{,}3$.",
            corrige: "Exactement un feu vert : $3 \\times 0{,}7 \\times 0{,}09 = 0{,}189$. Aucun : $0{,}3^3 = 0{,}027$.\n\nSomme : $0{,}343 + 0{,}441 + 0{,}189 + 0{,}027 = 1$."
          },
          {
            n: "5.", points: 1,
            texte: "Le chauffeur affirme : « Le plus probable, c'est d'avoir les trois feux verts. » A-t-il raison ?",
            indice: "Compare les quatre probabilités.",
            corrige: "**Non.** Le plus probable est d'avoir exactement deux feux verts ($0{,}441$), plus que trois feux verts ($0{,}343$) : il y a trois façons d'en avoir deux, une seule d'en avoir trois."
          }
        ]
      },
      {
        titre: "Un contrôle de qualité",
        duree: 25, points: 6, calculatrice: false,
        contexte: "Une machine fabrique des pièces, dont $10\\,\\%$ sont défectueuses. On prélève au hasard $4$ pièces dans une très grande production : on assimile ces prélèvements à $4$ épreuves de Bernoulli indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule la probabilité qu'aucune des $4$ pièces ne soit défectueuse.",
            indice: "Une pièce est bonne avec la probabilité $0{,}9$ ; calcule $0{,}9^2$, puis son carré.",
            corrige: "$0{,}9^4 = (0{,}9^2)^2 = 0{,}81^2 = 0{,}6561$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Déduis-en la probabilité qu'au moins une pièce soit défectueuse.",
            indice: "Événement contraire.",
            corrige: "$1 - 0{,}6561 = 0{,}3439$ : environ une chance sur trois de trouver au moins une pièce défectueuse."
          },
          {
            n: "3.", points: 1.5,
            texte: "Dans un petit lot de $10$ pièces, dont une seule est défectueuse, on prend $2$ pièces l'une après l'autre, sans remise. Peut-on parler d'épreuves indépendantes ? Explique.",
            indice: "Si la première pièce est défectueuse, quelle est la probabilité que la seconde le soit ?",
            corrige: "Non. La première pièce est défectueuse avec la probabilité $\\dfrac{1}{10}$. Si elle l'est, la seconde ne peut plus l'être : la probabilité passe à $0$. Le premier tirage change les probabilités du second : les épreuves ne sont pas indépendantes."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Qu'estime ce programme ? Quelle valeur affiche-t-il environ ?\n\n" +
              "```python\nfrom random import random\n\nc = 0\nfor k in range(10000):\n    n = 0\n    for i in range(4):\n        if random() < 0.1:\n            n = n + 1\n    if n >= 1:\n        c = c + 1\nprint(c / 10000)\n```",
            indice: "$\\texttt{n}$ compte les pièces défectueuses parmi $4$. Que compte $\\texttt{c}$ ?",
            corrige: "Pour chacun des $10\\,000$ prélèvements simulés, $\\texttt{n}$ compte les pièces défectueuses parmi les $4$, et $\\texttt{c}$ compte les prélèvements avec au moins une pièce défectueuse. Le programme estime donc la probabilité de la question 2 : il affiche un nombre proche de $0{,}344$."
          }
        ]
      }
    ]
  }
};
