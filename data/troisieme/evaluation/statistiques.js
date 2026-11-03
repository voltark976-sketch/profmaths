/*
  ENTRAÎNEMENT : 3e — chapitre 10, Statistiques
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre troisieme-statistiques.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type brevet.
  Pluies, notes et masses fictives ; séries différentes de celles du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["troisieme-statistiques"] = {
  revisions: {
    intro: "Les statistiques en un coup d'œil : fréquences, moyenne, médiane, étendue et données en classes. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Effectif et fréquence",
        texte: "La fréquence d'une valeur est son effectif divisé par l'effectif total. On peut l'écrire en pourcentage. La somme des fréquences vaut $1$ (ou $100\\,\\%$)."
      },
      {
        titre: "Moyenne",
        texte: "On additionne toutes les valeurs et on divise par l'effectif total. Avec un tableau d'effectifs, on multiplie chaque valeur par son effectif avant d'additionner."
      },
      {
        titre: "Médiane",
        texte: "On **range** les valeurs. La médiane partage la série en deux groupes de même effectif : avec $N$ valeurs, c'est la valeur de rang $\\dfrac{N + 1}{2}$ si $N$ est impair, la moyenne des deux valeurs du milieu si $N$ est pair."
      },
      {
        titre: "Étendue",
        texte: "L'étendue est la différence entre la plus grande et la plus petite valeur. Elle mesure la dispersion de la série."
      },
      {
        titre: "Données en classes",
        texte: "On remplace chaque classe par son centre pour estimer la moyenne : le centre de $[30\\,;40[$ est $35$."
      },
      {
        titre: "Comparer deux séries",
        texte: "On compare les moyennes ou les médianes (la position), puis les étendues (la dispersion). La moyenne est sensible aux valeurs extrêmes, pas la médiane."
      }
    ],
    pieges: [
      "Chercher la médiane sans avoir rangé les valeurs.",
      "Oublier les effectifs dans le calcul d'une moyenne.",
      "Avec un nombre pair de valeurs, prendre une seule des deux valeurs du milieu.",
      "Confondre fréquence et effectif.",
      "Croire que deux séries de même moyenne se ressemblent : regarde aussi l'étendue."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme au brevet (environ $60$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "La pluie à Pamandzi",
        duree: 20, points: 7, calculatrice: true,
        contexte: "Voici les hauteurs de pluie mensuelles, en millimètres, relevées pendant une année à Pamandzi (données fictives) :\n\njanvier $280$ ; février $250$ ; mars $230$ ; avril $120$ ; mai $40$ ; juin $20$ ; juillet $15$ ; août $10$ ; septembre $15$ ; octobre $30$ ; novembre $90$ ; décembre $200$.",
        questions: [
          { n: "1.", points: 1.5, texte: "Calcule la hauteur totale de pluie dans l'année, puis la moyenne mensuelle, arrondie au millimètre.", corrige: "Total : $1\\,300$ mm. Moyenne : $\\dfrac{1\\,300}{12} \\approx 108$ mm par mois." },
          { n: "2.", points: 2, texte: "Détermine la médiane de cette série.", indice: "Range les $12$ valeurs : la médiane est la moyenne des $6$e et $7$e valeurs.", corrige: "Valeurs rangées : $10$ ; $15$ ; $15$ ; $20$ ; $30$ ; $40$ ; $90$ ; $120$ ; $200$ ; $230$ ; $250$ ; $280$.\n\nLa médiane est la moyenne des $6$e et $7$e valeurs : $\\dfrac{40 + 90}{2} = 65$ mm." },
          { n: "3.", points: 1, texte: "Calcule l'étendue.", corrige: "$280 - 10 = 270$ mm." },
          { n: "4.", points: 1.5, texte: "Pourquoi la moyenne est-elle bien plus grande que la médiane ? Que cela dit-il du climat ?", corrige: "Quelques mois très pluvieux (de décembre à mars) font monter la moyenne, alors que la moitié des mois reçoivent moins de $65$ mm. Il y a une saison des pluies et une saison sèche bien marquées." },
          { n: "5.", points: 1, texte: "Les douze hauteurs sont dans les cellules B2 à M2 d'un tableur. Quelle formule donne la moyenne ?", corrige: "$\\texttt{=MOYENNE(B2:M2)}$ (ou $\\texttt{=SOMME(B2:M2)/12}$)." }
        ]
      },
      {
        titre: "Deux classes au même contrôle",
        duree: 20, points: 7, calculatrice: true,
        contexte: "Voici les notes sur $20$ des élèves de la classe A à un contrôle. Pour la classe B, le professeur donne seulement : moyenne $11{,}5$, médiane $13$, étendue $15$.",
        tableau: { lignes: [["\\text{Note}", "6", "8", "10", "12", "14", "16", "18"], ["\\text{Effectif}", "2", "3", "5", "6", "4", "3", "2"]] },
        questions: [
          { n: "1.", points: 1, texte: "Combien d'élèves la classe A compte-t-elle ?", corrige: "$2 + 3 + 5 + 6 + 4 + 3 + 2 = 25$ élèves." },
          { n: "2.", points: 2, texte: "Calcule la moyenne de la classe A.", indice: "Multiplie chaque note par son effectif, additionne, puis divise par $25$.", corrige: "$6 \\times 2 + 8 \\times 3 + 10 \\times 5 + 12 \\times 6$ ${} + 14 \\times 4 + 16 \\times 3 + 18 \\times 2 = 298$\n\nMoyenne : $\\dfrac{298}{25} = 11{,}92$." },
          { n: "3.", points: 2, texte: "Détermine la médiane et l'étendue de la classe A.", indice: "Avec $25$ notes, la médiane est la $13$e note : utilise les effectifs cumulés.", corrige: "Effectifs cumulés : $2$ ; $5$ ; $10$ ; $16$… La $13$e note est donc $12$ : la médiane vaut $12$. Étendue : $18 - 6 = 12$." },
          { n: "4.", points: 2, texte: "Compare les deux classes.", indice: "Compare la position (moyenne, médiane), puis la dispersion (étendue).", corrige: "La classe A a une meilleure moyenne ($11{,}92$ contre $11{,}5$), mais la classe B a une meilleure médiane ($13$ contre $12$) : au moins la moitié de la classe B a $13$ ou plus. Les notes de la classe B sont plus dispersées (étendue $15$ contre $12$)." }
        ]
      },
      {
        titre: "La masse des cartables",
        duree: 20, points: 6, calculatrice: true,
        contexte: "On a pesé les cartables de $30$ élèves. Les masses sont regroupées en classes (données fictives).",
        tableau: { lignes: [["\\text{Masse (kg)}", "[2\\,;4[", "[4\\,;6[", "[6\\,;8[", "[8\\,;10["], ["\\text{Effectif}", "5", "12", "8", "5"]] },
        questions: [
          { n: "1.", points: 2, texte: "Estime la masse moyenne d'un cartable, arrondie au dixième, avec les centres des classes.", indice: "Le centre de la classe $[2\\,;4[$ est $3$.", corrige: "Centres : $3$, $5$, $7$ et $9$. $\\dfrac{3 \\times 5 + 5 \\times 12 + 7 \\times 8 + 9 \\times 5}{30} = \\dfrac{176}{30} \\approx 5{,}9$ kg." },
          { n: "2.", points: 1.5, texte: "Quel pourcentage des cartables pèsent $6$ kg ou plus ? Arrondis à l'unité.", corrige: "$8 + 5 = 13$ cartables sur $30$ : $\\dfrac{13}{30} \\approx 43\\,\\%$." },
          { n: "3.", points: 1, texte: "Dans quelle classe se trouve la médiane ?", corrige: "Avec $30$ valeurs, la médiane est entre la $15$e et la $16$e. Effectifs cumulés : $5$, puis $17$ : elles sont dans la classe $[4\\,;6[$." },
          { n: "4.", points: 1.5, texte: "On conseille qu'un cartable pèse au plus $10\\,\\%$ de la masse de l'élève. Pour un élève de $50$ kg, quelle est la masse maximale conseillée ? Peut-on dire, avec ce tableau, combien de cartables la dépassent ?", corrige: "$10\\,\\%$ de $50$ kg font $5$ kg. On ne peut pas le savoir exactement : la classe $[4\\,;6[$ mélange des cartables de moins et de plus de $5$ kg. On sait seulement qu'au moins $13$ cartables dépassent $5$ kg, ceux de $6$ kg et plus." }
        ]
      }
    ]
  }
};
