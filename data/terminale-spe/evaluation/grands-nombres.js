/*
  ENTRAÎNEMENT : Terminale spécialité — chapitre 15, Loi des grands nombres
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-spe-grands-nombres.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit du bac. Données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-spe-grands-nombres"] = {
  revisions: {
    intro: "La loi des grands nombres en un coup d'œil : transformations affines, sommes de variables indépendantes, échantillons, inégalité de Bienaymé-Tchebychev et concentration. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Transformation affine",
        texte: "$E(aX + b) = aE(X) + b$, $V(aX + b) = a^2V(X)$ et $\\sigma(aX + b) = |a|\\,\\sigma(X)$. Ajouter une constante ne change pas la dispersion."
      },
      {
        titre: "Somme de deux variables",
        texte: "$E(X + Y) = E(X) + E(Y)$ toujours. Si $X$ et $Y$ sont **indépendantes** : $V(X + Y) = V(X) + V(Y)$, et aussi $V(X - Y) = V(X) + V(Y)$."
      },
      {
        titre: "Échantillon",
        texte: "Pour un échantillon de taille $n$ d'une loi d'espérance $\\mu$ et de variance $V$ : la somme $S_n$ a pour espérance $n\\mu$ et variance $nV$ ; la moyenne $M_n = \\dfrac{S_n}{n}$ a pour espérance $\\mu$ et variance $\\dfrac{V}{n}$."
      },
      {
        titre: "Bienaymé-Tchebychev",
        texte: "Pour tout $\\delta > 0$ : $P(|X - \\mu| \\geqslant \\delta) \\leqslant \\dfrac{V}{\\delta^2}$. Par passage au contraire : $P(|X - \\mu| < \\delta) \\geqslant 1 - \\dfrac{V}{\\delta^2}$."
      },
      {
        titre: "Inégalité de concentration",
        texte: "Pour la moyenne d'un échantillon : $P(|M_n - \\mu| \\geqslant \\delta) \\leqslant \\dfrac{V}{n\\delta^2}$. Pour un risque au plus $\\alpha$, il suffit que $n \\geqslant \\dfrac{V}{\\alpha\\delta^2}$."
      },
      {
        titre: "Loi des grands nombres",
        texte: "Pour tout $\\delta > 0$, $P(|M_n - \\mu| \\geqslant \\delta) \\to 0$ quand $n \\to +\\infty$ : la moyenne d'un grand échantillon est très probablement proche de l'espérance. Une simulation permet de l'observer."
      }
    ],
    pieges: [
      "Écrire $V(aX + b) = aV(X) + b$ : la constante disparaît et $a$ est au carré.",
      "Additionner les variances de variables qui ne sont pas indépendantes.",
      "Écrire $V(X - Y) = V(X) - V(Y)$ : les variances s'ajoutent.",
      "Confondre $V(S_n) = nV$ et $V(M_n) = \\dfrac{V}{n}$.",
      "Oublier le carré de $\\delta$ dans l'inégalité de Bienaymé-Tchebychev.",
      "Croire qu'après une série de pertes, un gain devient plus probable."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit du bac (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Un jeu et ses parties",
        duree: 25, points: 7, calculatrice: true,
        contexte: "À un jeu, le gain $X$ d'une partie, en euros, vaut $-1$, $2$ ou $5$, avec les probabilités respectives $0{,}5$ ; $0{,}3$ et $0{,}2$. Les parties sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $E(X)$, $V(X)$ et $\\sigma(X)$, arrondi au centième.",
            indice: "$V(X) = E(X^2) - E(X)^2$.",
            corrige: "$E(X) = -0{,}5 + 0{,}6 + 1 = 1{,}1$. $E(X^2) = 0{,}5 + 1{,}2 + 5 = 6{,}7$, donc $V(X) = 6{,}7 - 1{,}21 = 5{,}49$ et $\\sigma(X) \\approx 2{,}34$."
          },
          {
            n: "2.", points: 1.5,
            texte: "On triple les gains et on ajoute un bonus de $2$ € : $Y = 3X + 2$. Calcule $E(Y)$, $V(Y)$ et $\\sigma(Y)$.",
            indice: "$E(aX + b) = aE(X) + b$ et $V(aX + b) = a^2V(X)$.",
            corrige: "$E(Y) = 3 \\times 1{,}1 + 2 = 5{,}3$, $V(Y) = 9 \\times 5{,}49 = 49{,}41$ et $\\sigma(Y) = 3\\sigma(X) \\approx 7{,}03$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Un joueur fait deux parties ; ses gains sont $X_1$ et $X_2$, indépendants et de même loi que $X$. Donne la loi de $S = X_1 + X_2$ et vérifie que $E(S) = 2E(X)$.",
            indice: "Les valeurs de $S$ vont de $-2$ à $10$. La valeur $4$ s'obtient avec $(2\\,;2)$, $(-1\\,;5)$ ou $(5\\,;-1)$.",
            corrige: "$P(S = -2) = 0{,}25$ ; $P(S = 1) = 2 \\times 0{,}5 \\times 0{,}3 = 0{,}3$ ; $P(S = 4) = 0{,}09 + 2 \\times 0{,}1 = 0{,}29$ ; $P(S = 7) = 2 \\times 0{,}06 = 0{,}12$ ; $P(S = 10) = 0{,}04$. La somme fait $1$. Les produits valeur fois probabilité valent $-0{,}5$ ; $0{,}3$ ; $1{,}16$ ; $0{,}84$ et $0{,}4$, donc $E(S) = 2{,}2 = 2E(X)$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Le joueur fait $50$ parties. Donne l'espérance et la variance de son gain total $S_{50}$, puis de son gain moyen par partie $M_{50}$.",
            indice: "$E(S_n) = nE(X)$, $V(S_n) = nV(X)$, et $M_n = \\dfrac{S_n}{n}$.",
            corrige: "$E(S_{50}) = 50 \\times 1{,}1 = 55$ et $V(S_{50}) = 50 \\times 5{,}49 = 274{,}5$. Puis $E(M_{50}) = 1{,}1$ et $V(M_{50}) = \\dfrac{5{,}49}{50} = 0{,}1098$."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « $V(X_1 - X_2) = V(X_1) - V(X_2) = 0$ ». Justifie.",
            indice: "$X_1 - X_2 = X_1 + (-1) \\times X_2$.",
            corrige: "**Faux.** Les variables sont indépendantes : $V(X_1 - X_2) = V(X_1) + (-1)^2V(X_2) = 2 \\times 5{,}49 = 10{,}98$. La différence de deux gains varie, elle n'est pas toujours nulle."
          }
        ]
      },
      {
        titre: "Les mangues de la coopérative",
        duree: 25, points: 7, calculatrice: true,
        contexte: "La masse $X$ d'une mangue, en grammes, a pour espérance $300$ et pour écart type $20$. Les masses des mangues sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "À l'aide de l'inégalité de Bienaymé-Tchebychev, minore la probabilité qu'une mangue pèse strictement entre $260$ et $340$ g.",
            indice: "$260 < X < 340 \\iff |X - 300| < 40$, et $V(X) = 20^2$.",
            corrige: "$V(X) = 400$ et $P(|X - 300| \\geqslant 40) \\leqslant \\dfrac{400}{40^2} = 0{,}25$. Donc $P(260 < X < 340) = 1 - P(|X - 300| \\geqslant 40) \\geqslant 0{,}75$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Un cageot contient $25$ mangues. On note $M_{25}$ la masse moyenne d'une mangue du cageot. Donne son espérance et sa variance.",
            indice: "Moyenne d'un échantillon : espérance $\\mu$ et variance $\\dfrac{V}{n}$.",
            corrige: "$E(M_{25}) = 300$ et $V(M_{25}) = \\dfrac{400}{25} = 16$ (écart type $4$ g)."
          },
          {
            n: "3.", points: 1.5,
            texte: "Majore la probabilité que la masse moyenne du cageot s'écarte de $300$ g d'au moins $10$ g. Interprète.",
            indice: "Inégalité de concentration avec $n = 25$ et $\\delta = 10$.",
            corrige: "$P(|M_{25} - 300| \\geqslant 10) \\leqslant \\dfrac{400}{25 \\times 10^2} = 0{,}16$ : dans au moins $84\\,\\%$ des cageots, la masse moyenne est strictement entre $290$ et $310$ g."
          },
          {
            n: "4.", points: 1.5,
            texte: "Combien de mangues faut-il au moins dans un lot pour que la probabilité que la masse moyenne s'écarte de $300$ g d'au moins $5$ g soit inférieure ou égale à $0{,}05$ ?",
            indice: "On veut $\\dfrac{400}{n \\times 5^2} \\leqslant 0{,}05$.",
            corrige: "$\\dfrac{400}{25n} \\leqslant 0{,}05 \\iff \\dfrac{16}{n} \\leqslant 0{,}05 \\iff n \\geqslant 320$. Un lot de $320$ mangues suffit."
          },
          {
            n: "5.", points: 1,
            texte: "Pourquoi l'inégalité de Bienaymé-Tchebychev n'apprend-elle rien sur $P(|X - 300| \\geqslant 10)$, pour une seule mangue ?",
            indice: "Calcule la majoration $\\dfrac{V}{\\delta^2}$.",
            corrige: "La majoration vaut $\\dfrac{400}{10^2} = 4$, qui est supérieure à $1$ : elle ne dit rien, puisqu'une probabilité est toujours au plus égale à $1$. L'inégalité est utile pour des écarts grands par rapport à l'écart type, ou pour des moyennes de grands échantillons."
          }
        ]
      },
      {
        titre: "Simuler pour estimer",
        duree: 25, points: 6, calculatrice: true,
        contexte: "Dans un jeu, on lance un dé équilibré : on gagne $3$ € si on obtient $6$, et on perd $1$ € sinon. On note $G$ le gain d'une partie ; les parties sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Donne la loi de $G$, puis montre que $E(G) = -\\dfrac{1}{3}$ et $V(G) = \\dfrac{20}{9}$.",
            indice: "$P(G = 3) = \\dfrac{1}{6}$ et $P(G = -1) = \\dfrac{5}{6}$. Puis $V(G) = E(G^2) - E(G)^2$.",
            corrige: "$E(G) = 3 \\times \\dfrac{1}{6} - \\dfrac{5}{6} = -\\dfrac{2}{6} = -\\dfrac{1}{3}$. $E(G^2) = 9 \\times \\dfrac{1}{6} + 1 \\times \\dfrac{5}{6} = \\dfrac{14}{6} = \\dfrac{7}{3}$, donc $V(G) = \\dfrac{7}{3} - \\dfrac{1}{9} = \\dfrac{20}{9}$."
          },
          {
            n: "2.", points: 1.5,
            texte:
              "Que calcule $\\texttt{gain\\_moyen(n)}$ ? Vers quelle valeur le résultat se rapproche-t-il quand $n$ est très grand ?\n\n" +
              "```python\nfrom random import randint\n\ndef gain_moyen(n):\n    s = 0\n    for k in range(n):\n        d = randint(1, 6)\n        if d == 6:\n            s = s + 3\n        else:\n            s = s - 1\n    return s / n\n```",
            indice: "La fonction simule $n$ parties et renvoie le gain moyen par partie.",
            corrige: "Elle simule $n$ parties, additionne les gains dans $\\texttt{s}$ et renvoie le gain moyen $M_n$. D'après la loi des grands nombres, pour $n$ très grand, le résultat est très probablement proche de $E(G) = -\\dfrac{1}{3} \\approx -0{,}333$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Pour $n = 10\\,000$ parties, majore la probabilité que le gain moyen s'écarte de $-\\dfrac{1}{3}$ d'au moins $0{,}1$. Arrondis au millième.",
            indice: "$P\\left(\\left|M_n + \\dfrac{1}{3}\\right| \\geqslant \\delta\\right) \\leqslant \\dfrac{V(G)}{n\\delta^2}$.",
            corrige: "$P\\left(\\left|M_n + \\dfrac{1}{3}\\right| \\geqslant 0{,}1\\right) \\leqslant \\dfrac{20/9}{10\\,000 \\times 0{,}01} = \\dfrac{20}{900} \\approx 0{,}022$ : il est très probable que le gain moyen soit compris entre environ $-0{,}43$ et $-0{,}23$ € par partie."
          },
          {
            n: "4.", points: 1.5,
            texte: "Un joueur a perdu $10$ parties de suite. Il affirme : « maintenant, je suis sûr de gagner bientôt, la loi des grands nombres va rééquilibrer ». Qu'en penses-tu ? Que gagne l'organisateur, en moyenne, sur $10\\,000$ parties ?",
            indice: "Les parties sont indépendantes. L'organisateur gagne ce que les joueurs perdent.",
            corrige: "Il se trompe : les parties sont indépendantes, la probabilité de gagner la partie suivante reste $\\dfrac{1}{6}$. La loi des grands nombres ne compense rien, elle dit seulement que la moyenne se rapproche de $-\\dfrac{1}{3}$. Sur $10\\,000$ parties, l'organisateur gagne en moyenne $10\\,000 \\times \\dfrac{1}{3} \\approx 3\\,333$ €."
          }
        ]
      }
    ]
  }
};
