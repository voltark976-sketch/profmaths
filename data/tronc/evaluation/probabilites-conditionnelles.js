/*
  ENTRAÎNEMENT : Première tronc commun — chapitre 7, Probabilités conditionnelles et indépendance
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre tronc-probabilites-conditionnelles.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Données fictives ; contextes différents de ceux du cours (dépistage) et de Première techno.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["tronc-probabilites-conditionnelles"] = {
  revisions: {
    intro: "Les probabilités conditionnelles en un coup d'œil : $P_A(B)$, arbre pondéré, chemins à additionner, fausses alertes, indépendance et jeux célèbres. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Sachant que…",
        texte: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ : la probabilité de $B$ quand on sait que $A$ est réalisé. Avec un tableau, on divise par l'effectif de $A$, pas par l'effectif total."
      },
      {
        titre: "Arbre pondéré",
        texte:
          "- le long d'un chemin, on **multiplie** : $P(A \\cap B) = P(A) \\times P_A(B)$ ;\n" +
          "- pour un événement atteint par plusieurs chemins, on **additionne** : $P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$."
      },
      {
        titre: "Remonter l'arbre",
        texte: "Pour $P_B(A)$, on calcule $P(A \\cap B)$ et $P(B)$ avec l'arbre, puis on divise. Quand $A$ est rare, $P_B(A)$ peut être petite même si le test est fiable : beaucoup d'alertes sont fausses."
      },
      {
        titre: "Indépendance",
        texte: "$A$ et $B$ sont indépendants si $P_A(B) = P(B)$, c'est-à-dire si $P(A \\cap B) = P(A) \\times P(B)$. Deux événements incompatibles, de probabilités non nulles, ne sont jamais indépendants."
      },
      {
        titre: "Jeux célèbres",
        texte: "Dans le jeu de Monty Hall, changer de porte fait gagner avec la probabilité $\\dfrac{2}{3}$ : on gagne en changeant exactement quand le premier choix était mauvais."
      }
    ],
    pieges: [
      "Confondre $P_A(B)$ et $P_B(A)$ : l'événement qu'on sait réalisé va en indice.",
      "Diviser par l'effectif total pour une probabilité conditionnelle.",
      "Additionner le long d'un chemin au lieu de multiplier.",
      "Oublier un chemin dans la formule des probabilités totales.",
      "Écrire $P(A \\cap B) = P(A) \\times P(B)$ sans savoir que les événements sont indépendants.",
      "Confondre indépendants et incompatibles."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Les données sont fictives. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le portique de sécurité",
        duree: 25, points: 7, calculatrice: false,
        contexte: "À l'aéroport, $1\\,\\%$ des bagages contiennent un objet interdit. Le portique sonne pour $90\\,\\%$ des bagages qui en contiennent un, mais aussi, par erreur, pour $5\\,\\%$ des autres. On choisit un bagage au hasard. On note $I$ l'événement « le bagage contient un objet interdit » et $S$ l'événement « le portique sonne ».",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Représente la situation par un arbre pondéré.",
            indice: "Au premier niveau : $I$ et $\\overline{I}$. Au second : $S$ et $\\overline{S}$.",
            corrige: "$P(I) = 0{,}01$, $P(\\overline{I}) = 0{,}99$, $P_I(S) = 0{,}9$ et $P_{\\overline{I}}(S) = 0{,}05$ ; les autres branches s'en déduisent.",
            figureCorrige: (o) => o.arbreProba(["I", "~I", "S", "~S"], ["0,01", "0,99", "0,9", "0,1", "0,05", "0,95"], "Arbre pondéré : I 0,01 et non I 0,99 ; après I : S 0,9 et non S 0,1 ; après non I : S 0,05 et non S 0,95")
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $P(I \\cap S)$ et $P(\\overline{I} \\cap S)$. Interprète la seconde.",
            indice: "Multiplie le long de chaque chemin qui mène à $S$.",
            corrige: "$P(I \\cap S) = 0{,}01 \\times 0{,}9 = 0{,}009$ et $P(\\overline{I} \\cap S) = 0{,}99 \\times 0{,}05 = 0{,}0495$ : environ $5\\,\\%$ des bagages font sonner le portique sans contenir d'objet interdit (fausses alertes)."
          },
          {
            n: "3.", points: 1.5,
            texte: "Démontre que $P(S) = 0{,}0585$.",
            indice: "Additionne les deux chemins qui mènent à $S$.",
            corrige: "$P(S) = P(I \\cap S) + P(\\overline{I} \\cap S) = 0{,}009 + 0{,}0495 = 0{,}0585$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Le portique sonne. Calcule la probabilité que le bagage contienne vraiment un objet interdit, sous forme de fraction irréductible. Commente.",
            indice: "$P_S(I) = \\dfrac{P(I \\cap S)}{P(S)} = \\dfrac{0{,}009}{0{,}0585} = \\dfrac{90}{585}$.",
            corrige: "$P_S(I) = \\dfrac{0{,}009}{0{,}0585} = \\dfrac{90}{585} = \\dfrac{2}{13}$, soit environ $15\\,\\%$. Quand le portique sonne, le bagage ne contient un objet interdit qu'environ une fois sur sept : la plupart des alertes sont fausses, car ces objets sont rares."
          },
          {
            n: "5.", points: 1,
            texte: "Retrouve ce résultat avec $2\\,000$ bagages : combien font sonner le portique ? Parmi eux, combien contiennent un objet interdit ?",
            indice: "$1\\,\\%$ de $2\\,000$, puis $90\\,\\%$ de ce nombre ; et $5\\,\\%$ des autres bagages.",
            corrige: "$20$ bagages contiennent un objet interdit : le portique sonne pour $18$ d'entre eux. Parmi les $1\\,980$ autres, il sonne pour $99$. Il sonne donc $117$ fois, dont $18$ pour un vrai objet : $\\dfrac{18}{117} = \\dfrac{2}{13}$."
          }
        ]
      },
      {
        titre: "Les trois coffrets",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans un jeu télévisé, un seul des trois coffrets contient un cadeau. Le joueur en choisit un au hasard. Le présentateur, qui sait où est le cadeau, ouvre alors un autre coffret, toujours vide. Le joueur peut garder son coffret ou changer pour le dernier coffret fermé.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Quelle est la probabilité que le premier choix du joueur soit le bon ?",
            indice: "Le joueur choisit au hasard parmi trois coffrets.",
            corrige: "Le cadeau est dans l'un des trois coffrets, choisis au hasard : la probabilité que le premier choix soit le bon est $\\dfrac{1}{3}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Le joueur décide de garder son coffret. Quelle est sa probabilité de gagner ?",
            indice: "En gardant, il gagne seulement si son premier choix était le bon.",
            corrige: "En gardant son coffret, il gagne exactement quand son premier choix était le bon : sa probabilité de gagner est $\\dfrac{1}{3}$. L'ouverture d'un coffret vide n'y change rien."
          },
          {
            n: "3.", points: 1.5,
            texte: "Le joueur décide de changer. Explique pourquoi il gagne exactement quand son premier choix était mauvais. Quelle est sa probabilité de gagner ?",
            indice: "Si le premier choix est mauvais, où est le cadeau, sachant que le présentateur ouvre un coffret vide ?",
            corrige: "Si le premier choix est mauvais, le cadeau est dans l'un des deux autres coffrets ; le présentateur ouvre l'autre, qui est vide, et le coffret restant contient le cadeau. En changeant, le joueur gagne donc avec la probabilité $1 - \\dfrac{1}{3} = \\dfrac{2}{3}$ : changer double ses chances."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Ce programme simule $3\\,000$ parties où le joueur change de coffret. Pourquoi compte-t-on un gain quand $\\texttt{choix != cadeau}$ ? Que va afficher le programme, environ ?\n\n" +
              "```python\nfrom random import randint\n\ng = 0\nfor k in range(3000):\n    cadeau = randint(1, 3)\n    choix = randint(1, 3)\n    if choix != cadeau:\n        g = g + 1\nprint(g / 3000)\n```",
            indice: "Utilise la question 3 : en changeant, quand gagne-t-on ?",
            corrige: "En changeant, le joueur gagne exactement quand son premier choix n'est pas le bon coffret, c'est-à-dire quand $\\texttt{choix != cadeau}$. Le programme affiche la fréquence des gains, proche de $\\dfrac{2}{3} \\approx 0{,}67$."
          },
          {
            n: "5.", points: 1,
            texte: "Avec quatre coffrets, le présentateur ouvre un coffret vide, et le joueur qui change choisit au hasard l'un des deux autres coffrets fermés. Quelle est sa probabilité de gagner ? Vaut-il mieux changer ?",
            indice: "Il faut d'abord que le premier choix soit mauvais, puis choisir le bon parmi deux.",
            corrige: "Le premier choix est mauvais avec la probabilité $\\dfrac{3}{4}$ ; il faut ensuite choisir le bon coffret parmi deux : $\\dfrac{3}{4} \\times \\dfrac{1}{2} = \\dfrac{3}{8}$. C'est plus que $\\dfrac{1}{4}$ en gardant : il vaut encore mieux changer."
          }
        ]
      },
      {
        titre: "Groupes sanguins",
        duree: 25, points: 6, calculatrice: false,
        contexte: "Dans un échantillon de $400$ donneurs de sang (données fictives), on a relevé le groupe sanguin (O ou un autre) et le rhésus (positif ou négatif). On choisit un donneur au hasard. On note $O$ l'événement « il est du groupe O » et $R$ l'événement « il est de rhésus positif ».",
        tableau: { lignes: [["", "R^+", "R^-", "\\text{Total}"], ["\\text{Groupe O}", "153", "27", "180"], ["\\text{Autre}", "187", "33", "220"], ["\\text{Total}", "340", "60", "400"]] },
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $P(O)$, $P(R)$ et $P(O \\cap R)$.",
            indice: "Divise chaque effectif par $400$.",
            corrige: "$P(O) = \\dfrac{180}{400} = 0{,}45$, $P(R) = \\dfrac{340}{400} = 0{,}85$ et $P(O \\cap R) = \\dfrac{153}{400} = 0{,}3825$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Les événements $O$ et $R$ sont-ils indépendants ? Justifie de deux façons.",
            indice: "Compare $P(O) \\times P(R)$ et $P(O \\cap R)$, puis $P_O(R)$ et $P(R)$.",
            corrige: "$P(O) \\times P(R) = 0{,}45 \\times 0{,}85 = 0{,}3825 = P(O \\cap R)$. Et $P_O(R) = \\dfrac{153}{180} = 0{,}85 = P(R)$ : savoir que le donneur est du groupe O ne change pas la probabilité qu'il soit de rhésus positif. Les événements sont indépendants."
          },
          {
            n: "3.", points: 1.5,
            texte: "Les donneurs du groupe O de rhésus négatif peuvent donner à tout le monde. Quelle est la probabilité qu'un donneur choisi au hasard soit O négatif ? Retrouve-la avec l'indépendance.",
            indice: "Lis la case « Groupe O », « R moins », ou multiplie $P(O)$ par $P(\\overline{R})$.",
            corrige: "$\\dfrac{27}{400} = 0{,}0675$. Avec l'indépendance : $P(O) \\times P(\\overline{R}) = 0{,}45 \\times 0{,}15 = 0{,}0675$. Environ $7\\,\\%$ des donneurs sont O négatif."
          },
          {
            n: "4.", points: 1.5,
            texte: "On note $A$ l'événement « le donneur est du groupe A », avec $P(A) = 0{,}4$. Les événements $O$ et $A$ sont-ils indépendants ?",
            indice: "Un donneur peut-il être à la fois du groupe O et du groupe A ?",
            corrige: "Non. Un donneur ne peut pas être à la fois du groupe O et du groupe A : $P(O \\cap A) = 0$, alors que $P(O) \\times P(A) = 0{,}45 \\times 0{,}4 = 0{,}18$. Les événements sont incompatibles, donc pas indépendants : savoir que $O$ est réalisé rend $A$ impossible."
          }
        ]
      }
    ]
  }
};
