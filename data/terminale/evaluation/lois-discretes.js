/*
  ENTRAÎNEMENT : Terminale maths complémentaires — chapitre 2, Lois discrètes
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-lois-discretes.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths complémentaires.
  Données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-lois-discretes"] = {
  revisions: {
    intro: "Les lois discrètes en un coup d'œil : espérance, loi uniforme, Bernoulli, loi binomiale et cumuls, intervalle de fluctuation, loi géométrique sans mémoire. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Loi et espérance",
        texte: "La loi de $X$ donne la probabilité de chaque valeur ; leur somme vaut $1$. $E(X) = x_1p_1 + \\dots + x_np_n$ est la moyenne des valeurs sur un grand nombre de répétitions. Loi uniforme sur $\\{1\\,;\\dots\\,;n\\}$ : chaque valeur a la probabilité $\\dfrac{1}{n}$."
      },
      {
        titre: "Loi binomiale",
        texte: "Si $X$ compte les succès de $n$ épreuves identiques et indépendantes, de probabilité $p$ : $X$ suit $\\mathcal{B}(n\\,;p)$ et $P(X = k) = \\dbinom{n}{k}p^k(1 - p)^{n-k}$."
      },
      {
        titre: "Espérance et écart type",
        texte: "Pour $\\mathcal{B}(n\\,;p)$ : $E(X) = np$, $V(X) = np(1 - p)$ et $\\sigma(X) = \\sqrt{np(1 - p)}$."
      },
      {
        titre: "Cumuls",
        texte: "$P(X \\leqslant k)$ se lit à la calculatrice. $P(X \\geqslant k) = 1 - P(X \\leqslant k - 1)$ et $P(a \\leqslant X \\leqslant b) = P(X \\leqslant b) - P(X \\leqslant a - 1)$."
      },
      {
        titre: "Intervalle de fluctuation",
        texte: "Le plus petit $b$ tel que $P(X \\leqslant b) \\geqslant 0{,}95$ donne l'intervalle $[0\\,;b]$ au seuil de $95\\,\\%$. Une valeur observée au-delà de $b$ est peu probable avec ce modèle : on peut le remettre en question."
      },
      {
        titre: "Loi géométrique",
        texte: "Le rang $T$ du premier succès suit $\\mathcal{G}(p)$ : $P(T = k) = (1 - p)^{k-1}p$, $P(T > k) = (1 - p)^k$ et $E(T) = \\dfrac{1}{p}$. Elle est **sans mémoire** : $P_{T > s}(T > s + t) = P(T > t)$."
      }
    ],
    pieges: [
      "Prendre l'espérance pour un résultat certain, ou forcément possible.",
      "Utiliser la loi binomiale pour des tirages sans remise : les essais ne sont pas indépendants.",
      "Oublier le coefficient $\\dbinom{n}{k}$ dans $P(X = k)$.",
      "Écrire $P(X \\geqslant k) = 1 - P(X \\leqslant k)$ au lieu de $1 - P(X \\leqslant k - 1)$.",
      "Compter $k$ échecs au lieu de $k - 1$ dans $P(T = k)$.",
      "Croire qu'après plusieurs échecs, un succès devient « dû »."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Les colis abîmés",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Un magasin de Mamoudzou reçoit des colis par bateau. Chaque colis arrive abîmé avec la probabilité $0{,}05$, indépendamment des autres (données fictives). Sur une livraison de $30$ colis, on note $X$ le nombre de colis abîmés. Les probabilités seront arrondies au millième.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Justifie que $X$ suit une loi binomiale et précise ses paramètres. Calcule $P(X = 0)$.",
            indice: "$30$ épreuves identiques et indépendantes, succès « le colis est abîmé ».",
            corrige: "On répète $30$ fois, de façon identique et indépendante, l'épreuve « le colis est abîmé », de probabilité $0{,}05$ : $X$ suit $\\mathcal{B}(30\\,;0{,}05)$. $P(X = 0) = 0{,}95^{30} \\approx 0{,}215$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule la probabilité qu'au moins deux colis soient abîmés.",
            indice: "$P(X \\geqslant 2) = 1 - P(X = 0) - P(X = 1)$.",
            corrige: "$P(X = 1) = 30 \\times 0{,}05 \\times 0{,}95^{29} \\approx 0{,}339$, donc $P(X \\geqslant 2) = 1 - P(X \\leqslant 1) \\approx 1 - 0{,}215 - 0{,}339 = 0{,}446$ (la calculatrice donne directement $P(X \\leqslant 1) \\approx 0{,}554$)."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule l'espérance et l'écart type de $X$. Interprète l'espérance.",
            indice: "$E(X) = np$ et $\\sigma(X) = \\sqrt{np(1 - p)}$.",
            corrige: "$E(X) = 30 \\times 0{,}05 = 1{,}5$ et $\\sigma(X) = \\sqrt{30 \\times 0{,}05 \\times 0{,}95} = \\sqrt{1{,}425} \\approx 1{,}194$. Sur un grand nombre de livraisons, il y a en moyenne $1{,}5$ colis abîmés par livraison."
          },
          {
            n: "4.", points: 1.5,
            texte: "Voici des cumuls arrondis de la loi de $X$. Détermine le plus petit entier $b$ tel que $P(X \\leqslant b) \\geqslant 0{,}95$.",
            tableau: { lignes: [["k", "P(X \\leqslant k)"], ["0", "0{,}215"], ["1", "0{,}554"], ["2", "0{,}812"], ["3", "0{,}939"], ["4", "0{,}984"], ["5", "0{,}997"]] },
            indice: "Lis la première colonne où le cumul atteint $0{,}95$.",
            corrige: "$P(X \\leqslant 3) \\approx 0{,}939 < 0{,}95$ et $P(X \\leqslant 4) \\approx 0{,}984 \\geqslant 0{,}95$ : $b = 4$. L'intervalle de fluctuation au seuil de $95\\,\\%$ est $[0\\,;4]$."
          },
          {
            n: "5.", points: 1,
            texte: "Une livraison arrive avec $7$ colis abîmés. Que peut en penser le magasin ?",
            indice: "Compare $7$ avec l'intervalle de la question 4.",
            corrige: "$7$ est en dehors de $[0\\,;4]$ : avec ce modèle, un tel résultat est très peu probable. Le magasin peut penser que la probabilité qu'un colis soit abîmé est plus grande que $0{,}05$ pour cette livraison, et le signaler au transporteur."
          }
        ]
      },
      {
        titre: "Le premier panier",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Nassim tente des lancers francs. À chaque lancer, il marque avec la probabilité $0{,}3$, et les lancers sont indépendants. On note $T$ le rang du premier lancer réussi.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Quelle est la loi de $T$ ? Calcule $P(T = 1)$ et $P(T = 3)$.",
            indice: "$T = 3$ : deux échecs, puis un succès.",
            corrige: "On répète une épreuve de Bernoulli de paramètre $0{,}3$ jusqu'au premier succès : $T$ suit $\\mathcal{G}(0{,}3)$. $P(T = 1) = 0{,}3$ et $P(T = 3) = 0{,}7^2 \\times 0{,}3 = 0{,}147$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule la probabilité que Nassim ait besoin de plus de $4$ lancers, puis celle qu'il réussisse en $4$ lancers au plus.",
            indice: "$T > 4$ : les $4$ premiers lancers sont des échecs.",
            corrige: "$P(T > 4) = 0{,}7^4 = 0{,}2401$ et $P(T \\leqslant 4) = 1 - 0{,}2401 = 0{,}7599$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule $E(T)$ et interprète.",
            indice: "$E(T) = \\dfrac{1}{p}$.",
            corrige: "$E(T) = \\dfrac{1}{0{,}3} = \\dfrac{10}{3} \\approx 3{,}33$ : en moyenne, Nassim marque son premier panier au bout de $3$ ou $4$ lancers."
          },
          {
            n: "4.", points: 1.5,
            texte: "Les trois premiers lancers ont échoué. Quelle est la probabilité que Nassim marque lors de l'un des deux lancers suivants ?",
            indice: "La loi géométrique est sans mémoire : tout se passe comme s'il recommençait.",
            corrige: "Par absence de mémoire, $P_{T > 3}(T \\leqslant 5) = P(T \\leqslant 2) = 1 - 0{,}7^2 = 0{,}51$. Les échecs passés ne changent rien : la probabilité de marquer reste $0{,}3$ à chaque lancer."
          },
          {
            n: "5.", points: 1,
            texte:
              "Que simule cette fonction ? Vers quelle valeur la moyenne de $10\\,000$ appels à $\\texttt{premier(0.3)}$ sera-t-elle proche ?\n\n" +
              "```python\nfrom random import random\n\ndef premier(p):\n    k = 1\n    while random() >= p:\n        k = k + 1\n    return k\n```",
            indice: "La boucle continue tant que le lancer est un échec.",
            corrige: "Elle simule les lancers jusqu'au premier succès et renvoie son rang : une valeur de $T$. La moyenne de $10\\,000$ appels sera proche de $E(T) \\approx 3{,}33$."
          }
        ]
      },
      {
        titre: "La roue de la kermesse",
        duree: 20, points: 6, calculatrice: false,
        contexte: "À la kermesse du lycée, une roue a $8$ secteurs de même taille numérotés de $1$ à $8$. On la fait tourner et on note $X$ le numéro obtenu. On gagne $10$ € si on obtient $8$, $2$ € si on obtient $6$ ou $7$, et on perd la mise $m$ sinon.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Quelle est la loi de $X$ ? Calcule $E(X)$ et $P(X \\geqslant 6)$.",
            indice: "Les $8$ secteurs ont la même probabilité.",
            corrige: "$X$ suit la loi uniforme sur $\\{1\\,;\\dots\\,;8\\}$ : $P(X = k) = \\dfrac{1}{8}$. $E(X) = \\dfrac{1 + 2 + \\dots + 8}{8} = \\dfrac{36}{8} = 4{,}5$ et $P(X \\geqslant 6) = \\dfrac{3}{8}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Avec une mise $m = 2$ €, on note $G$ le gain algébrique. Donne la loi de $G$ et calcule $E(G)$.",
            indice: "$G$ vaut $10$, $2$ ou $-2$.",
            corrige: "$P(G = 10) = \\dfrac{1}{8}$, $P(G = 2) = \\dfrac{2}{8}$ et $P(G = -2) = \\dfrac{5}{8}$. $E(G) = \\dfrac{10 + 4 - 10}{8} = \\dfrac{4}{8} = 0{,}5$ € : en moyenne, le joueur gagne $0{,}50$ € par partie."
          },
          {
            n: "3.", points: 1.5,
            texte: "Quelle mise $m$ rend le jeu équitable ?",
            indice: "Équitable : $E(G) = 0$, avec $P(G = -m) = \\dfrac{5}{8}$.",
            corrige: "$E(G) = \\dfrac{10 + 4 - 5m}{8} = 0 \\iff 5m = 14 \\iff m = 2{,}8$ €."
          },
          {
            n: "4.", points: 1.5,
            texte: "Avec $m = 2$ €, un joueur fait deux parties indépendantes. Quelle est la probabilité qu'il gagne de l'argent à au moins une des deux parties ?",
            indice: "Gagner de l'argent à une partie, c'est obtenir $6$, $7$ ou $8$ : probabilité $\\dfrac{3}{8}$. Passe par le contraire.",
            corrige: "Le nombre de parties gagnantes suit $\\mathcal{B}\\left(2\\,;\\dfrac{3}{8}\\right)$. $P(\\text{au moins une}) = 1 - \\left(\\dfrac{5}{8}\\right)^2 = 1 - \\dfrac{25}{64} = \\dfrac{39}{64} \\approx 0{,}61$."
          }
        ]
      }
    ]
  }
};
