/*
  ENTRAÎNEMENT : Terminale maths complémentaires — chapitre 10, Loi géométrique et temps d'attente
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-loi-geometrique.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths complémentaires.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-loi-geometrique"] = {
  revisions: {
    intro: "La loi géométrique en un coup d'œil : le rang du premier succès, les probabilités d'attente, l'espérance $\\dfrac{1}{p}$, l'absence de mémoire, la période de retour et les seuils avec $\\ln$. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Loi géométrique",
        texte: "On répète une épreuve de Bernoulli de paramètre $p$, de façon indépendante, jusqu'au premier succès. Son rang $X$ suit la loi géométrique de paramètre $p$ : $P(X = k) = (1 - p)^{k-1}p$ pour tout entier $k \\geqslant 1$."
      },
      {
        titre: "Attendre plus de $n$ épreuves",
        texte: "« $X > n$ » signifie que les $n$ premières épreuves sont des échecs :\n" +
          "- $P(X > n) = (1 - p)^n$ ;\n" +
          "- $P(X \\leqslant n) = 1 - (1 - p)^n$."
      },
      {
        titre: "Espérance et période de retour",
        texte: "$E(X) = \\dfrac{1}{p}$ : avec $p = 0{,}2$, il faut en moyenne $5$ épreuves. Pour un phénomène de probabilité annuelle $p$, $T = \\dfrac{1}{p}$ est la **période de retour** : une durée moyenne d'attente, pas un rendez-vous régulier."
      },
      {
        titre: "Absence de mémoire",
        texte: "$P_{X > m}(X > m + n) = P(X > n)$ : avoir déjà attendu $m$ épreuves ne change rien à l'attente qui reste."
      },
      {
        titre: "Seuil avec $\\ln$",
        texte: "Pour avoir au moins $99\\,\\%$ de chances d'un succès en $n$ épreuves : $(1 - p)^n \\leqslant 0{,}01 \\iff n \\geqslant \\dfrac{\\ln 0{,}01}{\\ln(1 - p)}$. Le sens change car $\\ln(1 - p) < 0$."
      }
    ],
    pieges: [
      "Confondre $P(X = k) = (1 - p)^{k-1}p$ et $P(X > k) = (1 - p)^k$.",
      "Croire qu'un phénomène de période de retour $100$ ans se produit forcément dans les $100$ ans.",
      "Penser qu'après une longue série d'échecs, le succès devient plus probable.",
      "Calculer $n \\times p$ pour « au moins un succès en $n$ essais » au lieu de $1 - (1 - p)^n$.",
      "Écrire $E(X) = p$ au lieu de $E(X) = \\dfrac{1}{p}$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Voir une baleine",
        duree: 25, points: 7, calculatrice: true,
        contexte: "De juillet à octobre, des baleines à bosse viennent dans le lagon de Mayotte. Inaya veut en voir une et hésite entre deux clubs. Au club A, une sortie coûte $45$ € et permet d'en voir une avec la probabilité $0{,}4$. Au club B, une sortie coûte $70$ € et permet d'en voir une avec la probabilité $0{,}7$. Les sorties sont indépendantes, et Inaya en fait jusqu'à voir une baleine. On note $X_A$ et $X_B$ les nombres de sorties nécessaires dans chaque club.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Quelles sont les lois de $X_A$ et de $X_B$ ? Justifie.",
            indice: "Chaque sortie est une épreuve de Bernoulli : quel est le succès ?",
            corrige: "Chaque sortie est une épreuve de Bernoulli, de succès « voir une baleine ». Les sorties sont indépendantes et on compte le rang du premier succès : $X_A$ suit la loi géométrique de paramètre $0{,}4$, et $X_B$ celle de paramètre $0{,}7$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule, pour chaque club, le nombre moyen de sorties et le coût moyen. Quel club est le moins cher en moyenne ?",
            indice: "$E(X) = \\dfrac{1}{p}$, et le coût est $45X_A$ ou $70X_B$.",
            corrige: "$E(X_A) = \\dfrac{1}{0{,}4} = 2{,}5$ sorties, soit en moyenne $45 \\times 2{,}5 = 112{,}50$ €. $E(X_B) = \\dfrac{1}{0{,}7} \\approx 1{,}43$ sortie, soit en moyenne $\\dfrac{70}{0{,}7} = 100$ €. Le club B est le moins cher en moyenne, malgré une sortie plus chère."
          },
          {
            n: "3.", points: 1.5,
            texte: "Dans chaque club, calcule la probabilité que la dépense dépasse $150$ €.",
            indice: "$45X_A > 150 \\iff X_A \\geqslant 4$, c'est-à-dire $X_A > 3$. Et $P(X > n) = (1 - p)^n$.",
            corrige: "Au club A : $45X_A > 150 \\iff X_A > 3$, et $P(X_A > 3) = 0{,}6^3 = 0{,}216$.\n\nAu club B : $70X_B > 150 \\iff X_B > 2$, et $P(X_B > 2) = 0{,}3^2 = 0{,}09$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Dans chaque club, combien de sorties faut-il prévoir pour avoir au moins $95\\,\\%$ de chances de voir une baleine ? Pour quel budget ?",
            indice: "Résous $1 - 0{,}6^n \\geqslant 0{,}95$ avec $\\ln$, sans oublier que $\\ln 0{,}6 < 0$.",
            corrige: "Club A : $1 - 0{,}6^n \\geqslant 0{,}95 \\iff 0{,}6^n \\leqslant 0{,}05 \\iff n \\geqslant \\dfrac{\\ln 0{,}05}{\\ln 0{,}6} \\approx 5{,}86$, car $\\ln 0{,}6 < 0$ : $6$ sorties, soit $270$ €.\n\nClub B : $0{,}3^n \\leqslant 0{,}05 \\iff n \\geqslant \\dfrac{\\ln 0{,}05}{\\ln 0{,}3} \\approx 2{,}49$ : $3$ sorties, soit $210$ €."
          },
          {
            n: "5.", points: 1.5,
            texte: "Inaya a déjà fait $2$ sorties au club A sans voir de baleine. Son amie lui dit : « Continue avec A, tu as déjà payé $90$ €, ça va finir par arriver. » Quelle est la probabilité qu'elle en voie une à sa prochaine sortie au club A ? Que lui conseilles-tu ?",
            indice: "Calcule $P_{X_A > 2}(X_A = 3)$. La loi géométrique est sans mémoire.",
            corrige: "$P_{X_A > 2}(X_A = 3) = \\dfrac{P(X_A = 3)}{P(X_A > 2)} = \\dfrac{0{,}6^2 \\times 0{,}4}{0{,}6^2} = 0{,}4$ : c'est la même chance qu'à la première sortie.\n\nPar absence de mémoire, l'attente qui reste au club A suit la même loi qu'au départ : elle coûte encore $112{,}50$ € en moyenne, contre $100$ € au club B. Les $90$ € déjà payés ne changent rien : mieux vaut passer au club B."
          }
        ]
      },
      {
        titre: "Période de retour",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Un phénomène naturel rare a, chaque année, la probabilité $p$ de se produire, indépendamment des autres années. On note $X$ le rang de l'année où il se produit pour la première fois à partir de maintenant ($X = 1$ pour l'année qui vient). $X$ suit la loi géométrique de paramètre $p$, et la **période de retour** du phénomène est $T = E(X) = \\dfrac{1}{p}$.",
        questions: [
          { partie: "Partie A : une forte houle", texte: "Une très forte houle, qui submerge la route du littoral, a une période de retour de $20$ ans." },
          {
            n: "1.", points: 1,
            texte: "Donne $p$. Calcule $P(X = 20)$ : la $20^\\text{e}$ année a-t-elle quelque chose de particulier ?",
            indice: "$p = \\dfrac{1}{T}$ et $P(X = k) = (1 - p)^{k-1}p$.",
            corrige: "$p = \\dfrac{1}{20} = 0{,}05$, et $P(X = 20) = 0{,}95^{19} \\times 0{,}05 \\approx 0{,}019$ : moins de $2\\,\\%$ de chances que la première houle tombe exactement la $20^\\text{e}$ année. Cette année n'a rien de particulier : $P(X = k)$ diminue avec $k$, et l'année la plus probable est la première.",
            figureCorrige: (o) => o.graph({
              xmin: 0, xmax: 21, ymin: 0, ymax: 0.055, xstep: 1, xetiq: 5, ystep: 0.01, h: 200, padL: 34,
              xlabel: "k",
              bars: Array.from({ length: 20 }, (_, i) => ({ x: i + 1, y: 0.95 ** i * 0.05 })),
              aria: "Diagramme en bâtons de la loi géométrique de paramètre 0,05 pour k de 1 à 20 : les bâtons diminuent régulièrement, de 0,05 en k = 1 à environ 0,019 en k = 20"
            })
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule la probabilité qu'au moins une telle houle se produise dans les $20$ prochaines années. Une période de retour de $20$ ans veut-elle dire « une fois tous les $20$ ans » ?",
            indice: "« Au moins une houle en $20$ ans », c'est $X \\leqslant 20$.",
            corrige: "$P(X \\leqslant 20) = 1 - 0{,}95^{20} \\approx 0{,}642$. Il y a donc environ $36\\,\\%$ de chances de n'avoir aucune houle en $20$ ans : la période de retour est une durée **moyenne** d'attente, pas un rendez-vous régulier."
          },
          {
            n: "3.", points: 1.5,
            texte: "Il n'y a pas eu de telle houle depuis $15$ ans. Un habitant affirme : « Elle arrivera forcément dans les $5$ ans. » Calcule la probabilité d'au moins une houle dans les $5$ prochaines années, et commente.",
            indice: "Les années sont indépendantes : les $15$ années passées ne changent rien (absence de mémoire).",
            corrige: "Les années sont indépendantes : les $15$ années passées ne changent rien. La probabilité d'au moins une houle dans les $5$ prochaines années est $P(X \\leqslant 5) = 1 - 0{,}95^5 \\approx 0{,}226$. Ce n'est pas « forcément » : il y a environ $77\\,\\%$ de chances qu'il n'y en ait aucune."
          },
          { partie: "Partie B : séismes et constructions", texte: "En Europe, les normes parasismiques des bâtiments courants retiennent un séisme de période de retour $T = 475$ ans." },
          {
            n: "4.", points: 1.5,
            texte: "Montre que la probabilité qu'un tel séisme se produise au moins une fois pendant les $50$ ans de vie d'un bâtiment est d'environ $10\\,\\%$.",
            indice: "$p = \\dfrac{1}{475}$, et « au moins une fois en $50$ ans », c'est $X \\leqslant 50$.",
            corrige: "$p = \\dfrac{1}{475}$, donc $P(X \\leqslant 50) = 1 - \\left(1 - \\dfrac{1}{475}\\right)^{50} \\approx 0{,}100$, soit environ $10\\,\\%$."
          },
          {
            n: "5.", points: 1.5,
            texte: "Pour un hôpital, on veut que cette probabilité sur $50$ ans soit au plus $5\\,\\%$. Montre que cela revient à $\\ln(1 - p) \\geqslant \\dfrac{\\ln 0{,}95}{50}$, puis déduis-en la période de retour à retenir.",
            indice: "$1 - (1 - p)^{50} \\leqslant 0{,}05 \\iff (1 - p)^{50} \\geqslant 0{,}95$. Puis $\\ln$, et enfin $\\ln a \\geqslant c \\iff a \\geqslant e^c$.",
            corrige: "$1 - (1 - p)^{50} \\leqslant 0{,}05 \\iff (1 - p)^{50} \\geqslant 0{,}95 \\iff 50\\ln(1 - p) \\geqslant \\ln 0{,}95 \\iff \\ln(1 - p) \\geqslant \\dfrac{\\ln 0{,}95}{50}$.\n\nAlors $1 - p \\geqslant e^{\\frac{\\ln 0{,}95}{50}} \\approx 0{,}998975$, donc $p \\leqslant 0{,}001025$ environ, et $T = \\dfrac{1}{p} \\geqslant 975$ environ. Il faut retenir un séisme de période de retour d'environ $975$ ans, deux fois plus que pour un bâtiment courant."
          }
        ]
      },
      {
        titre: "Retrouver un code",
        duree: 20, points: 6, calculatrice: true,
        contexte:
          "Mahamoudou a oublié le code à deux chiffres, de $00$ à $99$, du cadenas de son casier. Tous les codes sont a priori également probables.\n" +
          "- **Méthode A** : à chaque essai, il tape un code au hasard parmi les $100$, sans se souvenir de ceux qu'il a déjà essayés.\n" +
          "- **Méthode B** : il essaie les codes dans l'ordre $00$, $01$, $02$… jusqu'au bon.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Avec la méthode A, on note $X$ le nombre d'essais. Quelle est la loi de $X$ ? Calcule $E(X)$ et $P(X \\leqslant 50)$.",
            indice: "À chaque essai, le code tapé est le bon avec la probabilité $\\dfrac{1}{100}$, quels que soient les essais précédents.",
            corrige: "À chaque essai, le code tapé est le bon avec la probabilité $0{,}01$, indépendamment des autres essais : $X$ suit la loi géométrique de paramètre $0{,}01$. Donc $E(X) = \\dfrac{1}{0{,}01} = 100$ essais, et $P(X \\leqslant 50) = 1 - 0{,}99^{50} \\approx 0{,}395$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Avec la méthode B, on note $Y$ le nombre d'essais. Justifie que $Y$ suit la loi uniforme sur $\\{1\\,;2\\,;\\dots\\,;100\\}$. Calcule $E(Y)$ et $P(Y \\leqslant 50)$. Quelle méthode conseilles-tu ?",
            indice: "Le bon code peut être le $1^\\text{er}$, le $2^\\text{e}$… ou le $100^\\text{e}$ de la liste, avec la même probabilité. Pour la loi uniforme, $E(Y) = \\dfrac{n + 1}{2}$.",
            corrige: "Le bon code est le $k$-ième de la liste avec la probabilité $\\dfrac{1}{100}$, pour chaque $k$ de $1$ à $100$ : $Y$ suit la loi uniforme sur $\\{1\\,;\\dots\\,;100\\}$. $E(Y) = \\dfrac{1 + 100}{2} = 50{,}5$ essais et $P(Y \\leqslant 50) = \\dfrac{50}{100} = 0{,}5$.\n\nLa méthode B est bien meilleure : environ deux fois moins d'essais en moyenne, et jamais plus de $100$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Avec la méthode A, combien d'essais faut-il prévoir pour avoir au moins $90\\,\\%$ de chances d'ouvrir le cadenas ?",
            indice: "Résous $1 - 0{,}99^n \\geqslant 0{,}9$ avec $\\ln$. Attention au sens de l'inégalité.",
            corrige: "$1 - 0{,}99^n \\geqslant 0{,}9 \\iff 0{,}99^n \\leqslant 0{,}1 \\iff n\\ln 0{,}99 \\leqslant \\ln 0{,}1 \\iff n \\geqslant \\dfrac{\\ln 0{,}1}{\\ln 0{,}99}$, car $\\ln 0{,}99 < 0$.\n\nOr $\\dfrac{\\ln 0{,}1}{\\ln 0{,}99} \\approx 229{,}1$ : il faut prévoir $230$ essais, alors que la méthode B en demande au plus $100$ dans tous les cas."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Ce programme simule $10\\,000$ fois la méthode A. Qu'estime-t-il ? Donne une valeur approchée du nombre affiché.\n\n" +
              "```python\nfrom random import random\n\ndef essais():\n    n = 1\n    while random() >= 0.01:\n        n = n + 1\n    return n\n\nc = 0\nfor i in range(10000):\n    if essais() <= 50:\n        c = c + 1\nprint(c / 10000)\n```",
            indice: "$\\texttt{random() >= 0.01}$ est vrai avec la probabilité $0{,}99$ : c'est un essai raté. Que compte $\\texttt{c}$ ?",
            corrige: "$\\texttt{random() >= 0.01}$ a la probabilité $0{,}99$ : c'est un essai raté. La fonction renvoie donc le nombre d'essais de la méthode A, et $\\texttt{c}$ compte les simulations où le cadenas s'ouvre en au plus $50$ essais.\n\nLe programme affiche la fréquence de ces simulations : il estime $P(X \\leqslant 50)$, et affiche un nombre proche de $0{,}395$, qui change un peu d'une exécution à l'autre."
          }
        ]
      }
    ]
  }
};
