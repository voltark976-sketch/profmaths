/*
  AUTOMATISMES · STATISTIQUES
  ---------------------------
  Seconde 2026 : lire et commenter des graphiques (barres, circulaire, semi-circulaire, courbe, nuage de points),
  moyenne, médiane, quartiles (données brutes, par classes, graphiques), boîtes à moustaches.
  Première 2026 : lire un graphique (origine, unités, échelles), passer du graphique aux données et inversement.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["auto-statistiques"] = {
  niveau: "Automatismes",
  numero: null,
  periode: "Seconde et Première",
  titre: "Statistiques",
  accroche: "Lire un graphique, calculer moyenne, médiane et quartiles, et comparer deux séries avec des boîtes à moustaches.",

  playlist: "https://www.youtube.com/playlist?list=PLVTjofGlms14",
  drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv",
  pdfs: [
    { titre: "Dossier élève de Seconde (partie P9)", url: "https://drive.google.com/file/d/1vr9e5N38rAOQLWIvUR5suK6l6ciyoLNY/view" }
  ],

  cours: [
    {
      titre: "Lire et commenter un graphique",
      video: { titre: "Vidéo de ton prof : lire et commenter des graphiques", youtube: "https://youtu.be/sbcsgw91EO0" },
      texte:
        "- Diagramme en **bâtons** ou en **barres** : la hauteur donne l'effectif (ou la fréquence) de chaque valeur.\n" +
        "- Diagramme **circulaire** : les angles sont proportionnels aux effectifs, le disque entier ($360°$) représente $100\\,\\%$. Diagramme **semi-circulaire** : le demi-disque ($180°$) représente $100\\,\\%$.\n" +
        "- **Histogramme** : pour des classes $[a\\,;b[$, les aires des rectangles sont proportionnelles aux effectifs.\n" +
        "- **Courbe** ou **nuage de points** : chaque point donne une valeur (en ordonnée) pour une date ou une autre grandeur (en abscisse).\n" +
        "- Avant de lire : le titre, les unités, l'**origine** du repère (un axe ne commence pas toujours à $0$) et la **valeur d'un carreau** : si $20$ et $30$ sont séparés par $5$ carreaux, un carreau vaut $2$.\n" +
        "- Du graphique aux données : l'angle d'un secteur vaut $\\dfrac{\\text{effectif}}{\\text{effectif total}} \\times 360°$, et inversement.",
      figure: "am-cours-secteurs",
      exemple: {
        enonce: "D'après le diagramme circulaire ci-contre, quel pourcentage des élèves vient au lycée en bus ?",
        solution: "Le secteur « Bus » mesure $108°$ : $\\dfrac{108}{360} = 0{,}3 = 30\\,\\%$ des élèves."
      }
    },
    {
      titre: "Moyenne",
      video: { titre: "Vidéo de ton prof : moyenne, médiane, quartiles", youtube: "https://youtu.be/ncb1y7IwBZA" },
      texte:
        "- Moyenne : $\\bar{x} = \\dfrac{\\text{somme des valeurs}}{\\text{nombre de valeurs}}$.\n" +
        "- Avec des effectifs (ou des coefficients) : $\\bar{x} = \\dfrac{n_1 x_1 + n_2 x_2 + \\dots + n_p x_p}{N}$, où $N$ est l'effectif total (moyenne **pondérée**). Pour les $20$ familles du diagramme ci-contre, la somme des produits vaut $0 \\times 3 + 1 \\times 5 + 2 \\times 8 + 3 \\times 3 + 4 \\times 1 = 34$, donc $\\bar{x} = \\dfrac{34}{20} = 1{,}7$ enfant par famille.\n" +
        "- Données regroupées par classes : on remplace chaque classe par son **centre** ($[10\\,;20[$ devient $15$).\n" +
        "- La moyenne est sensible aux valeurs extrêmes.",
      figure: "am-cours-moyenne",
      exemple: {
        enonce: "Notes : $12$ (coefficient $3$) et $8$ (coefficient $1$). Calculer la moyenne.",
        solution: "$\\bar{x} = \\dfrac{3 \\times 12 + 1 \\times 8}{3 + 1} = \\dfrac{44}{4} = 11$."
      }
    },
    {
      titre: "Médiane et quartiles",
      video: { titre: "Vidéo d'Yvan Monka : calculer une moyenne, une médiane, des quartiles", youtube: "https://youtu.be/qKrgLZKGE8o" },
      texte:
        "- On **range** d'abord les valeurs dans l'ordre croissant.\n" +
        "- **Médiane** : la valeur du milieu (si $N$ est pair, la moyenne des deux valeurs du milieu). Au moins la moitié des valeurs sont inférieures ou égales à la médiane.\n" +
        "- **Premier quartile** $Q_1$ : la plus petite valeur telle qu'au moins $25\\,\\%$ des valeurs lui soient inférieures ou égales. Son rang est $\\dfrac{N}{4}$ arrondi à l'entier supérieur.\n" +
        "- **Troisième quartile** $Q_3$ : même idée avec $75\\,\\%$, rang $\\dfrac{3N}{4}$ arrondi à l'entier supérieur.\n" +
        "- Écart interquartile : $Q_3 - Q_1$. Étendue : max $-$ min. La boîte ci-contre résume la série $2 ; 5 ; 7 ; 8 ; 10 ; 11 ; 14 ; 15 ; 18 ; 20$ : $Q_1 = 7$, médiane $10{,}5$ et $Q_3 = 15$.",
      figure: "am-cours-quartiles",
      exemple: {
        enonce: "Série rangée : $3 ; 4 ; 6 ; 9 ; 9 ; 12 ; 13 ; 15 ; 17$. Donner la médiane, $Q_1$ et $Q_3$.",
        solution: "$N = 9$ : la médiane est la $5^\\text{e}$ valeur, $9$.\n\n$\\dfrac{9}{4} = 2{,}25$, rang $3$ : $Q_1 = 6$. $\\dfrac{27}{4} = 6{,}75$, rang $7$ : $Q_3 = 13$."
      }
    },
    {
      titre: "Comparer avec des boîtes à moustaches",
      video: { titre: "Vidéo de ton prof : comparer deux séries", youtube: "https://youtu.be/ZuVX12i3Wp4" },
      texte:
        "- La boîte va de $Q_1$ à $Q_3$, le trait intérieur est la médiane, les moustaches vont jusqu'au minimum et au maximum.\n" +
        "- Pour comparer deux séries : on compare les **médianes** (position) et les **écarts interquartiles** (dispersion : largeur de la boîte).\n" +
        "- Environ la moitié des valeurs se trouvent dans la boîte.",
      figure: "boites-exemple",
      exemple: {
        enonce: "D'après les boîtes ci-contre, quelle classe a les notes les plus regroupées ?",
        solution: "Classe $A$ : $Q_3 - Q_1 = 13 - 9 = 4$. Classe $B$ : $15 - 6 = 9$. Les notes de la classe $A$ sont plus regroupées, même si les médianes sont proches ($11$ et $10$)."
      }
    }
  ],

  videos: [
    { titre: "Exercice 25 · Moyenne, médiane, quartiles", type: "Indicateurs", youtube: "https://youtu.be/ncb1y7IwBZA" },
    { titre: "Exercice 26 · Lire et commenter des graphiques", type: "Graphiques", youtube: "https://youtu.be/sbcsgw91EO0" },
    { titre: "Exercice 27 · Comparer deux séries", type: "Boîtes", youtube: "https://youtu.be/ZuVX12i3Wp4" }
  ],
  videosNote: "Vidéos de ton prof (playlist « Secondes : automatismes ») : les énoncés sont dans le dossier élève ci-dessus.",

  exercices: [
    { type: "am-diagramme", titre: "Lire un diagramme ou un nuage de points", etape: "Automatismes de Seconde", nb: 5 },
    { type: "auto-statistiques", titre: "Moyenne, médiane, étendue", etape: "Automatismes de Seconde", nb: 5 },
    { type: "am-moyenne-ponderee", titre: "Moyenne avec des effectifs, des coefficients ou des classes", etape: "Automatismes de Seconde", nb: 5 },
    { type: "am-quartiles", titre: "Quartiles", etape: "Automatismes de Seconde", nb: 5 },
    { type: "am-boites", titre: "Comparer des boîtes à moustaches", etape: "Automatismes de Seconde", nb: 5 },
    { type: "am-lire-graphique", titre: "Origine, unités et graduations", etape: "Automatismes de Première", nb: 5 },
    { type: "am-graphique-donnees", titre: "Du graphique aux données", etape: "Automatismes de Première", nb: 5 },
    { type: "am-flash-st", titre: "Flash : statistiques mélangées", etape: "Défi", nb: 8 }
  ],

  qcm: [
    { question: "Un secteur de $72°$ dans un diagramme circulaire représente :", choix: ["$72\\,\\%$", "$20\\,\\%$", "$25\\,\\%$", "$7{,}2\\,\\%$"], bonne: 1, explication: "$\\dfrac{72}{360} = 0{,}2 = 20\\,\\%$." },
    { question: "Moyenne de $8 ; 12 ; 15 ; 9$ :", choix: ["$10$", "$11$", "$12$", "$44$"], bonne: 1, explication: "$\\dfrac{8 + 12 + 15 + 9}{4} = \\dfrac{44}{4} = 11$." },
    { question: "Médiane de $4 ; 9 ; 1 ; 7 ; 3$ :", choix: ["$1$", "$4$", "$7$", "$4{,}8$"], bonne: 1, explication: "Rangée : $1 ; 3 ; 4 ; 7 ; 9$. La valeur du milieu est $4$." },
    { question: "Pour une série de $20$ valeurs rangées, $Q_1$ est la valeur de rang :", choix: ["$4$", "$5$", "$6$", "$10$"], bonne: 1, explication: "$\\dfrac{20}{4} = 5$ : rang $5$." },
    { question: "Dans une série de $20$ valeurs, on remplace la plus grande valeur par une valeur beaucoup plus grande. Quel indicateur change ?", choix: ["la moyenne", "la médiane", "le premier quartile", "le minimum"], bonne: 0, explication: "La moyenne utilise toutes les valeurs : elle augmente. La médiane, $Q_1$ et le minimum ne dépendent pas de la plus grande valeur." },
    { question: "Dans une boîte à moustaches, la largeur de la boîte est :", choix: ["l'étendue", "l'écart interquartile", "la moyenne", "la médiane"], bonne: 1, explication: "La boîte va de $Q_1$ à $Q_3$ : sa largeur est $Q_3 - Q_1$." },
    { question: "D'après les boîtes ci-contre, au moins la moitié des élèves de la classe $A$ ont une note supérieure ou égale à :", figure: "boites-exemple", choix: ["$9$", "$11$", "$13$", "$17$"], bonne: 1, explication: "La médiane de la classe $A$ vaut $11$ : au moins la moitié des notes sont supérieures ou égales à $11$." },
    { question: "Sur l'axe vertical d'un graphique, les nombres $20$ et $30$ sont écrits et séparés par $5$ carreaux. Un carreau vaut :", choix: ["$1$", "$2$", "$5$", "$10$"], bonne: 1, explication: "$5$ carreaux pour $30 - 20 = 10$ : un carreau vaut $\\dfrac{10}{5} = 2$." },
    { question: "Sur $200$ élèves, $15\\,\\%$ viennent à pied. Dans un diagramme en bâtons des effectifs, le bâton « à pied » monte à :", choix: ["$15$", "$30$", "$185$", "$20$"], bonne: 1, explication: "$\\dfrac{15}{100} \\times 200 = 30$ élèves." },
    { question: "$9$ élèves sur $36$ viennent en bus. Dans un diagramme circulaire, l'angle du secteur « bus » est :", choix: ["$9°$", "$25°$", "$90°$", "$36°$"], bonne: 2, explication: "$\\dfrac{9}{36} \\times 360 = 90°$." },
    { question: "Notes : $10$ (effectif $2$), $16$ (effectif $1$). Moyenne :", choix: ["$13$", "$12$", "$26$", "$14$"], bonne: 1, explication: "$\\dfrac{2 \\times 10 + 16}{3} = \\dfrac{36}{3} = 12$." },
    { question: "L'étendue de $3 ; 17 ; 8 ; 12$ est :", choix: ["$9$", "$14$", "$17$", "$10$"], bonne: 1, explication: "$17 - 3 = 14$." },
    { question: "Dans un diagramme circulaire, un secteur représente $50\\,\\%$ de l'effectif. Son angle mesure :", choix: ["$180°$", "$50°$", "$90°$", "$100°$"], bonne: 0, explication: "Le disque entier, $360°$, représente $100\\,\\%$. La moitié de l'effectif correspond donc à la moitié du disque : $180°$." },
    { question: "Dans un histogramme dont les classes ont toutes la même amplitude, le rectangle le plus haut correspond :", choix: ["à la classe qui a le plus grand effectif", "à la classe qui contient la moyenne", "à la classe qui contient la médiane", "à la dernière classe"], bonne: 0, explication: "Les aires sont proportionnelles aux effectifs. Avec des largeurs égales, les hauteurs le sont aussi : le plus haut rectangle est la classe la plus fournie." },
    { question: "Dans un diagramme en bâtons, le bâton de la valeur $12$ monte jusqu'à $7$. Cela signifie que :", choix: ["la valeur $12$ apparaît $7$ fois", "la valeur $7$ apparaît $12$ fois", "la moyenne de la série vaut $12$", "$12\\,\\%$ des valeurs valent $7$"], bonne: 0, explication: "En abscisse, on lit la valeur ; la hauteur du bâton donne son effectif. Ici, l'effectif de la valeur $12$ est $7$." },
    { question: "Médiane de $5 ; 2 ; 9 ; 14 ; 7 ; 3$ :", choix: ["$6$", "$11{,}5$", "$5$", "$6{,}7$"], bonne: 0, explication: "Rangée : $2 ; 3 ; 5 ; 7 ; 9 ; 14$. $N = 6$ est pair : médiane $= \\dfrac{5 + 7}{2} = 6$. $11{,}5$ vient de l'oubli du rangement, $6{,}7$ est environ la moyenne." },
    { question: "Pour la série rangée $2 ; 4 ; 4 ; 5 ; 7 ; 8 ; 10 ; 11 ; 15$, $Q_3$ vaut :", choix: ["$10$", "$8$", "$11$", "$7$"], bonne: 0, explication: "$N = 9$ et $\\dfrac{3 \\times 9}{4} = 6{,}75$, arrondi à l'entier supérieur : rang $7$. La $7^\\text{e}$ valeur est $10$." },
    { question: "Pour la série rangée $2 ; 4 ; 4 ; 5 ; 7 ; 8 ; 10 ; 11 ; 15$, l'écart interquartile vaut :", choix: ["$6$", "$13$", "$3$", "$7$"], bonne: 0, explication: "$Q_1$ : rang $\\dfrac{9}{4} = 2{,}25$, arrondi à $3$, donc $Q_1 = 4$. $Q_3$ : rang $7$, donc $Q_3 = 10$. Écart interquartile : $10 - 4 = 6$. $13$, c'est l'étendue." },
    { question: "Une série a pour moyenne $12$. On ajoute $3$ à chaque valeur. La nouvelle moyenne est :", choix: ["$15$", "$12$", "$36$", "$4$"], bonne: 0, explication: "Chaque valeur augmente de $3$, donc la somme augmente de $3N$ et la moyenne de $\\dfrac{3N}{N} = 3$ : elle passe à $15$." },
    { question: "Une boîte à moustaches a pour minimum $4$, $Q_1 = 8$, médiane $11$, $Q_3 = 13$ et maximum $19$. L'étendue vaut :", choix: ["$15$", "$5$", "$11$", "$19$"], bonne: 0, explication: "Étendue $=$ max $-$ min $= 19 - 4 = 15$. $5 = Q_3 - Q_1$ est l'écart interquartile, la largeur de la boîte." },
    { question: "Deux classes ont la même médiane, mais la boîte de la classe $B$ est deux fois plus large que celle de la classe $A$. On peut dire que :", choix: ["les notes de $B$ sont plus dispersées que celles de $A$", "les notes de $B$ sont meilleures que celles de $A$", "la classe $B$ a deux fois plus d'élèves", "la moyenne de $B$ est deux fois plus grande"], bonne: 0, explication: "La largeur de la boîte est l'écart interquartile, un indicateur de dispersion. Même médiane : même position, mais $B$ est plus dispersée." },
    { question: "Dans une boîte à moustaches, quelle part des valeurs se trouve environ entre $Q_1$ et la médiane ?", choix: ["environ $25\\,\\%$", "environ $50\\,\\%$", "environ $75\\,\\%$", "on ne peut pas savoir"], bonne: 0, explication: "Environ $25\\,\\%$ des valeurs sont sous $Q_1$ et environ $50\\,\\%$ sous la médiane : il en reste environ $25\\,\\%$ entre les deux, même si cette partie de la boîte est étroite." },
    { question: "L'axe vertical d'un diagramme en barres commence à $90$ et non à $0$. Une barre deux fois plus haute qu'une autre représente :", choix: ["pas forcément une valeur deux fois plus grande", "toujours une valeur deux fois plus grande", "une valeur deux fois plus petite", "toujours une valeur supérieure de $90$"], bonne: 0, explication: "Les hauteurs se mesurent à partir de $90$ : les valeurs $95$ et $100$ donnent des barres de hauteurs $5$ et $10$, alors que $100$ n'est pas le double de $95$." },
    { question: "Sur l'axe horizontal d'un graphique, $1$ km correspond à $4$ carreaux. Combien de carreaux pour $2{,}5$ km ?", choix: ["$10$", "$6{,}5$", "$8$", "$2{,}5$"], bonne: 0, explication: "C'est une situation de proportionnalité : $2{,}5 \\times 4 = 10$ carreaux." },
    { question: "Sur $40$ élèves, $6$ pratiquent la pirogue. Dans un diagramme circulaire, l'angle du secteur « pirogue » est :", choix: ["$54°$", "$6°$", "$15°$", "$60°$"], bonne: 0, explication: "$\\dfrac{6}{40} \\times 360° = 0{,}15 \\times 360° = 54°$. $15$ est le pourcentage, pas l'angle." },
    { question: "Dans un diagramme circulaire sur $60$ producteurs, le secteur « bananes » mesure $120°$. Combien de producteurs cultivent des bananes ?", choix: ["$20$", "$120$", "$40$", "$2$"], bonne: 0, explication: "$120°$ représente $\\dfrac{120}{360} = \\dfrac{1}{3}$ du disque, donc $\\dfrac{1}{3} \\times 60 = 20$ producteurs." },
    { question: "Valeurs : $2$ (effectif $3$), $5$ (effectif $1$) et $6$ (effectif $1$). Moyenne :", choix: ["$3{,}4$", "$\\dfrac{13}{3}$", "$17$", "$5$"], bonne: 0, explication: "$\\bar{x} = \\dfrac{3 \\times 2 + 1 \\times 5 + 1 \\times 6}{5} = \\dfrac{17}{5} = 3{,}4$. $\\dfrac{13}{3}$ est la moyenne de $2$, $5$ et $6$ sans les effectifs." },
    { question: "Dans un club de football de Sada, $8$ joueurs ont $15$ ans et $2$ joueurs ont $20$ ans. Âge moyen ?", choix: ["$16$ ans", "$17{,}5$ ans", "$18$ ans", "$15$ ans"], bonne: 0, explication: "$\\bar{x} = \\dfrac{8 \\times 15 + 2 \\times 20}{10} = \\dfrac{120 + 40}{10} = 16$ ans. $17{,}5$ est la moyenne de $15$ et $20$ sans tenir compte des effectifs." },
    { question: "D'après le diagramme circulaire ci-contre, quelle part des élèves vient au lycée en barge ?", figure: "am-qcm-secteurs", choix: ["$40\\,\\%$", "$14{,}4\\,\\%$", "$35\\,\\%$", "$25\\,\\%$"], bonne: 0, explication: "Le secteur « Barge » mesure $144°$ : $\\dfrac{144}{360} = 0{,}4 = 40\\,\\%$. ($35\\,\\%$ et $25\\,\\%$ sont les parts « À pied » et « Bus ».)" },
    { question: "Le diagramme donne le nombre de frères et sœurs des élèves d'une classe. La médiane de cette série est :", figure: "am-qcm-batons", choix: ["$2$", "$2{,}5$", "$7$", "$3$"], bonne: 0, explication: "$N = 2 + 5 + 7 + 3 + 2 + 1 = 20$ : la médiane est la moyenne des $10^\\text{e}$ et $11^\\text{e}$ valeurs. Effectifs cumulés : $2$, $7$, $14$… Les valeurs de rang $8$ à $14$ valent $2$, donc la médiane vaut $2$. ($7$ est l'effectif le plus grand, pas une valeur.)" },
    { question: "Élection du délégué de la classe : d'après le diagramme semi-circulaire ci-contre, quel pourcentage des voix a obtenu Awa ?", figure: "am-qcm-semi", choix: ["$30\\,\\%$", "$15\\,\\%$", "$54\\,\\%$", "$20\\,\\%$"], bonne: 0, explication: "Dans un diagramme semi-circulaire, $180°$ représente $100\\,\\%$ : $\\dfrac{54}{180} = 0{,}3 = 30\\,\\%$. ($15\\,\\%$ vient d'une division par $360$.)" }
  ],

  methode: [
    {
      titre: "Calculer médiane et quartiles",
      etapes: [
        "Range les valeurs dans l'ordre croissant et compte-les : $N$.",
        "Médiane : $N$ impair, valeur de rang $\\dfrac{N + 1}{2}$ ; $N$ pair, moyenne des valeurs de rangs $\\dfrac{N}{2}$ et $\\dfrac{N}{2} + 1$.",
        "$Q_1$ : rang $\\dfrac{N}{4}$ arrondi à l'entier supérieur.",
        "$Q_3$ : rang $\\dfrac{3N}{4}$ arrondi à l'entier supérieur."
      ],
      exemple: "$N = 9$ : médiane au rang $5$, $Q_1$ au rang $3$ ($2{,}25 \\to 3$), $Q_3$ au rang $7$ ($6{,}75 \\to 7$)."
    },
    {
      titre: "Comparer deux séries",
      etapes: [
        "Compare un indicateur de position : moyennes ou médianes.",
        "Compare un indicateur de dispersion : étendues ou écarts interquartiles.",
        "Conclus par une phrase sur la situation : « les notes de A sont en moyenne meilleures et plus regroupées »."
      ],
      figure: "boites-exemple",
      exemple: "Médianes $11$ et $10$, écarts interquartiles $4$ et $9$ : séries de niveau proche, mais B est bien plus dispersée."
    }
  ],
  erreurs: [
    "On range les valeurs **avant** de chercher la médiane ou les quartiles.",
    "Avec des effectifs, chaque valeur compte autant de fois que son effectif.",
    "Écart interquartile ($Q_3 - Q_1$) et étendue (max $-$ min) sont deux choses différentes.",
    "La médiane n'est pas forcément au milieu de la boîte.",
    "Dans un diagramme circulaire, ce sont les angles qui sont proportionnels aux effectifs : $360°$ pour $100\\,\\%$ ($180°$ pour un diagramme semi-circulaire)."
  ]
};
