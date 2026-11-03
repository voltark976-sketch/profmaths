/*
  ENTRAÎNEMENT : Terminale spécialité — chapitre 5, Loi binomiale
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-spe-loi-binomiale.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit du bac (probabilités totales
  au programme de Terminale). Le logarithme vient au chapitre 9 : les seuils se trouvent à la calculatrice.
  Données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-spe-loi-binomiale"] = {
  revisions: {
    intro: "La loi binomiale en un coup d'œil : épreuves indépendantes, schéma de Bernoulli, formule de $P(X = k)$, espérance, cumuls et seuils. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Probabilités totales",
        texte: "Si $A$ et $\\overline{A}$ partagent l'univers : $P(B) = P(A \\cap B) + P(\\overline{A} \\cap B) = P(A)P_A(B) + P(\\overline{A})P_{\\overline{A}}(B)$. Dans un arbre, on additionne les chemins qui mènent à $B$."
      },
      {
        titre: "Épreuve de Bernoulli",
        texte: "Deux issues : le succès, de probabilité $p$, et l'échec, de probabilité $1 - p$. La variable qui vaut $1$ en cas de succès et $0$ sinon a pour espérance $p$ et pour variance $p(1 - p)$."
      },
      {
        titre: "Loi binomiale",
        texte: "On répète $n$ fois, de façon **identique et indépendante**, une épreuve de Bernoulli de paramètre $p$. Le nombre $X$ de succès suit la loi $\\mathcal{B}(n\\,;p)$."
      },
      {
        titre: "Calculer $P(X = k)$",
        texte: "$P(X = k) = \\dbinom{n}{k}p^k(1 - p)^{n-k}$ : $\\dbinom{n}{k}$ chemins de l'arbre ont exactement $k$ succès, et chacun a pour probabilité $p^k(1 - p)^{n-k}$."
      },
      {
        titre: "Espérance et écart type",
        texte: "$E(X) = np$, $V(X) = np(1 - p)$ et $\\sigma(X) = \\sqrt{np(1 - p)}$. L'espérance est le nombre moyen de succès sur un grand nombre de répétitions."
      },
      {
        titre: "Au moins, au plus",
        texte: "La calculatrice donne $P(X = k)$ et le cumul $P(X \\leqslant k)$. Puis $P(X \\geqslant k) = 1 - P(X \\leqslant k - 1)$ et $P(a \\leqslant X \\leqslant b) = P(X \\leqslant b) - P(X \\leqslant a - 1)$."
      },
      {
        titre: "Au moins un succès",
        texte: "$P(X \\geqslant 1) = 1 - P(X = 0) = 1 - (1 - p)^n$. Pour trouver le nombre d'épreuves qui rend cette probabilité assez grande, on résout $(1 - p)^n \\leqslant \\ldots$ avec un tableau de valeurs."
      }
    ],
    pieges: [
      "Oublier le coefficient $\\dbinom{n}{k}$ : il y a plusieurs chemins à $k$ succès.",
      "Inverser $p$ et $1 - p$ dans la formule.",
      "Utiliser une loi binomiale pour des tirages sans remise dans une petite urne, ou quand le nombre d'épreuves n'est pas fixé.",
      "Écrire $P(X \\geqslant k) = 1 - P(X \\leqslant k)$ au lieu de $1 - P(X \\leqslant k - 1)$.",
      "Confondre $E(X) = np$ et $V(X) = np(1 - p)$.",
      "Arrondir les résultats intermédiaires."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit du bac (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Les mangues de la coopérative",
        duree: 30, points: 7, calculatrice: true,
        contexte: "Une coopérative vend des mangues venant de deux vergers : $60\\,\\%$ du verger $V_1$ et $40\\,\\%$ du verger $V_2$. Dans le verger $V_1$, $90\\,\\%$ des mangues sont de catégorie A ; dans le verger $V_2$, $80\\,\\%$ (données fictives). On choisit une mangue au hasard ; on note $V$ : « elle vient du verger $V_1$ » et $A$ : « elle est de catégorie A ». Les probabilités seront arrondies au millième.",
        questions: [
          { partie: "Partie A : une mangue" },
          {
            n: "1.", points: 1.5,
            texte: "Construis un arbre pondéré, puis démontre que $P(A) = 0{,}86$.",
            indice: "Formule des probabilités totales, avec les deux chemins qui mènent à $A$.",
            corrige: "$P(A) = P(V \\cap A) + P(\\overline{V} \\cap A) = 0{,}6 \\times 0{,}9 + 0{,}4 \\times 0{,}8 = 0{,}54 + 0{,}32 = 0{,}86$.",
            figureCorrige: (o) => o.arbreProba(["V", "~V", "A", "~A"], ["0,6", "0,4", "0,9", "0,1", "0,8", "0,2"], "Arbre pondéré : V 0,6 et non V 0,4 ; après V : A 0,9 et non A 0,1 ; après non V : A 0,8 et non A 0,2")
          },
          {
            n: "2.", points: 1,
            texte: "La mangue choisie est de catégorie A. Quelle est la probabilité qu'elle vienne du verger $V_1$ ?",
            indice: "On cherche $P_A(V) = \\dfrac{P(A \\cap V)}{P(A)}$.",
            corrige: "$P_A(V) = \\dfrac{P(V \\cap A)}{P(A)} = \\dfrac{0{,}54}{0{,}86} \\approx 0{,}628$."
          },
          { partie: "Partie B : un lot de 20 mangues", texte: "On prélève $20$ mangues au hasard ; le stock est assez grand pour assimiler ce prélèvement à des tirages avec remise. On note $X$ le nombre de mangues de catégorie A du lot." },
          {
            n: "3.", points: 1.5,
            texte: "Justifie que $X$ suit une loi binomiale, dont tu préciseras les paramètres. Calcule $P(X = 20)$.",
            indice: "Combien d'épreuves ? Sont-elles identiques et indépendantes ? Quelle est la probabilité du succès ?",
            corrige: "On répète $20$ fois, de façon identique et indépendante, l'épreuve « la mangue est de catégorie A », de probabilité $0{,}86$ : $X$ suit la loi $\\mathcal{B}(20\\,;0{,}86)$. $P(X = 20) = 0{,}86^{20} \\approx 0{,}049$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Calcule la probabilité qu'au moins $18$ mangues du lot soient de catégorie A.",
            indice: "$P(X \\geqslant 18) = 1 - P(X \\leqslant 17)$, ou bien la somme de $P(X = 18)$, $P(X = 19)$ et $P(X = 20)$.",
            corrige: "$P(X \\geqslant 18) = 1 - P(X \\leqslant 17) \\approx 0{,}455$, à la calculatrice. On peut le vérifier avec la formule : $P(X = 18) = \\dbinom{20}{18} \\times 0{,}86^{18} \\times 0{,}14^2 \\approx 0{,}247$, $P(X = 19) \\approx 0{,}159$ et $P(X = 20) \\approx 0{,}049$."
          },
          {
            n: "5.", points: 1.5,
            texte: "Calcule l'espérance et l'écart type de $X$. Interprète l'espérance.",
            indice: "$E(X) = np$ et $\\sigma(X) = \\sqrt{np(1 - p)}$.",
            corrige: "$E(X) = 20 \\times 0{,}86 = 17{,}2$ et $\\sigma(X) = \\sqrt{20 \\times 0{,}86 \\times 0{,}14} = \\sqrt{2{,}408} \\approx 1{,}552$. Sur un grand nombre de lots de $20$ mangues, il y a en moyenne $17{,}2$ mangues de catégorie A par lot."
          }
        ]
      },
      {
        titre: "Les fléchettes",
        duree: 25, points: 7, calculatrice: true,
        contexte: "À chaque lancer, Anli touche le centre de la cible avec la probabilité $0{,}4$, et les lancers sont indépendants. Les probabilités seront arrondies au millième.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Anli lance $8$ fléchettes ; $X$ est le nombre de lancers au centre. Quelle est la loi de $X$ ? Calcule $P(X = 3)$.",
            indice: "$P(X = 3) = \\dbinom{8}{3} \\times 0{,}4^3 \\times 0{,}6^5$, avec $\\dbinom{8}{3} = 56$.",
            corrige: "On répète $8$ fois, de façon identique et indépendante, une épreuve de Bernoulli de paramètre $0{,}4$ : $X$ suit la loi $\\mathcal{B}(8\\,;0{,}4)$. $P(X = 3) = 56 \\times 0{,}4^3 \\times 0{,}6^5 \\approx 0{,}279$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule la probabilité qu'Anli touche le centre au moins deux fois.",
            indice: "Passe par l'événement contraire : $P(X \\geqslant 2) = 1 - P(X = 0) - P(X = 1)$.",
            corrige: "$P(X = 0) = 0{,}6^8$ et $P(X = 1) = 8 \\times 0{,}4 \\times 0{,}6^7$. Donc $P(X \\geqslant 2) = 1 - 0{,}6^8 - 8 \\times 0{,}4 \\times 0{,}6^7 \\approx 0{,}894$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule $E(X)$ et $\\sigma(X)$. Interprète $E(X)$.",
            indice: "$E(X) = np$ et $V(X) = np(1 - p)$.",
            corrige: "$E(X) = 8 \\times 0{,}4 = 3{,}2$ et $\\sigma(X) = \\sqrt{8 \\times 0{,}4 \\times 0{,}6} = \\sqrt{1{,}92} \\approx 1{,}386$. Sur un grand nombre de séries de $8$ lancers, Anli touche le centre en moyenne $3{,}2$ fois par série."
          },
          {
            n: "4.", points: 1.5,
            texte: "Combien de fléchettes Anli doit-il lancer au minimum pour que la probabilité de toucher au moins une fois le centre dépasse $0{,}99$ ?",
            indice: "Avec $n$ lancers, $P(\\text{au moins un}) = 1 - 0{,}6^n$. Cherche le plus petit $n$ tel que $0{,}6^n \\leqslant 0{,}01$ avec un tableau de valeurs.",
            corrige: "On veut $1 - 0{,}6^n \\geqslant 0{,}99$, soit $0{,}6^n \\leqslant 0{,}01$. À la calculatrice, $0{,}6^9 \\approx 0{,}0101$ et $0{,}6^{10} \\approx 0{,}0060$. Comme $0{,}6^n$ diminue quand $n$ augmente, il faut au moins $10$ lancers."
          },
          {
            n: "5.", points: 1,
            texte:
              "Que renvoie $\\texttt{proba(8, 0.4, 3)}$ ?\n\n" +
              "```python\nfrom math import comb\n\ndef proba(n, p, k):\n    a = comb(n, k) * p**k\n    b = (1 - p)**(n - k)\n    return a * b\n```",
            indice: "$\\texttt{comb(n, k)}$ est le coefficient binomial $\\dbinom{n}{k}$.",
            corrige: "La fonction calcule $\\dbinom{8}{3} \\times 0{,}4^3 \\times 0{,}6^5$ : elle renvoie environ $\\texttt{0.2787}$, la probabilité $P(X = 3)$ de la question 1."
          }
        ]
      },
      {
        titre: "Un jeu de dés",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Les questions 2 à 4 portent sur le jeu suivant : on mise $1$ €, puis on lance trois fois un dé équilibré ; on reçoit $2$ € pour chaque $6$ obtenu. On note $X$ le nombre de $6$ obtenus et $G$ le gain algébrique du joueur.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Dans chaque cas, dis si $Y$ suit une loi binomiale, et donne ses paramètres si c'est le cas. a) On tire $5$ cartes **sans remise** dans un jeu de $32$ cartes ; $Y$ est le nombre de cœurs. b) On lance une pièce jusqu'à obtenir « pile » ; $Y$ est le nombre de lancers. c) On tire $5$ boules **avec remise** dans une urne de $3$ boules rouges et $7$ noires ; $Y$ est le nombre de boules rouges.",
            indice: "Il faut un nombre d'épreuves fixé à l'avance, des épreuves identiques et indépendantes, et compter des succès.",
            corrige: "a) Non : sans remise, la composition du jeu change d'un tirage à l'autre, les tirages ne sont pas indépendants. b) Non : le nombre d'épreuves n'est pas fixé à l'avance. c) Oui : $5$ tirages identiques et indépendants, de succès « rouge » de probabilité $0{,}3$ : $Y$ suit la loi $\\mathcal{B}(5\\,;0{,}3)$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Donne la loi de $X$ : les probabilités $P(X = k)$ pour $k$ de $0$ à $3$, sous forme de fractions de dénominateur $216$.",
            indice: "$X$ suit la loi $\\mathcal{B}\\left(3\\,;\\dfrac{1}{6}\\right)$, et $6^3 = 216$.",
            corrige: "$P(X = 0) = \\left(\\dfrac{5}{6}\\right)^3 = \\dfrac{125}{216}$, $P(X = 1) = 3 \\times \\dfrac{1}{6} \\times \\dfrac{25}{36} = \\dfrac{75}{216}$, $P(X = 2) = 3 \\times \\dfrac{1}{36} \\times \\dfrac{5}{6} = \\dfrac{15}{216}$ et $P(X = 3) = \\dfrac{1}{216}$. La somme fait bien $\\dfrac{216}{216} = 1$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Exprime $G$ en fonction de $X$, puis calcule $E(G)$. Le jeu est-il équitable ?",
            indice: "$G = 2X - 1$ et $E(aX + b) = aE(X) + b$.",
            corrige: "$G = 2X - 1$. Comme $E(X) = 3 \\times \\dfrac{1}{6} = \\dfrac{1}{2}$, $E(G) = 2 \\times \\dfrac{1}{2} - 1 = 0$ : le jeu est équitable."
          },
          {
            n: "4.", points: 1.5,
            texte: "Quelle est la probabilité que le joueur gagne de l'argent ? Que penses-tu de ce jeu ?",
            indice: "Le joueur gagne de l'argent si $G > 0$, c'est-à-dire si $X \\geqslant 1$.",
            corrige: "$G > 0 \\iff X \\geqslant 1$, et $P(X \\geqslant 1) = 1 - \\dfrac{125}{216} = \\dfrac{91}{216} \\approx 0{,}421$. Le joueur perd le plus souvent ($58\\,\\%$ des parties), mais les gains rares compensent en moyenne les pertes, puisque $E(G) = 0$."
          }
        ]
      }
    ]
  }
};
