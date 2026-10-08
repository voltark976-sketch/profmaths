/*
  AUTOMATISMES · STATISTIQUES (ST01 à ST06)
  -----------------------------------------
  ST01 à ST03 : programme de Seconde. ST04 à ST06 : ajouts de Première.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["auto-statistiques"] = {
  niveau: "Automatismes",
  numero: null,
  periode: "Seconde et Première",
  titre: "Statistiques",
  accroche: "Lire un graphique, calculer moyenne, médiane et quartiles, et comparer deux séries avec des boîtes à moustaches.",

  playlist: "",
  drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv",
  pdfs: [
    { titre: "Dossier élève de Seconde (partie P9)", url: "https://drive.google.com/file/d/1vr9e5N38rAOQLWIvUR5suK6l6ciyoLNY/view" }
  ],

  cours: [
    {
      titre: "Lire un graphique (ST01, ST04, ST05)",
      video: { titre: "Vidéo d'Yvan Monka : lire et interpréter un graphique", youtube: "https://youtu.be/CR4lSAfho5A" },
      texte:
        "- Diagramme en **bâtons** ou en **barres** : la hauteur donne l'effectif (ou la fréquence) de chaque valeur.\n" +
        "- Diagramme **circulaire** : les angles sont proportionnels aux effectifs. Le disque entier ($360°$) représente $100\\,\\%$ : un secteur de $90°$ représente $25\\,\\%$.\n" +
        "- **Histogramme** : pour des classes $[a\\,;b[$, les aires des rectangles sont proportionnelles aux effectifs.\n" +
        "- Avant de lire (ST04) : le titre, les unités, l'**origine** du repère (un axe ne commence pas toujours à $0$) et la **valeur d'un carreau** : si $20$ et $30$ sont séparés par $5$ carreaux, un carreau vaut $2$.\n" +
        "- Du graphique aux données et inversement (ST05) : on lit les effectifs sur le graphique ; pour construire un diagramme circulaire, l'angle d'un secteur vaut $\\dfrac{\\text{effectif}}{\\text{effectif total}} \\times 360°$.",
      exemple: {
        enonce: "Dans un diagramme circulaire, un secteur représente $15\\,\\%$ de l'effectif. Quel est son angle ?",
        solution: "$0{,}15 \\times 360 = 54°$."
      }
    },
    {
      titre: "Moyenne (ST02, ST06)",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la linéarité de la moyenne", youtube: "https://youtu.be/Z4bwDyrtO8A" },
      texte:
        "- Moyenne : $\\bar{x} = \\dfrac{\\text{somme des valeurs}}{\\text{nombre de valeurs}}$.\n" +
        "- Avec des effectifs : $\\bar{x} = \\dfrac{n_1 x_1 + n_2 x_2 + \\dots + n_p x_p}{N}$, où $N$ est l'effectif total (moyenne **pondérée**).\n" +
        "- La moyenne est sensible aux valeurs extrêmes.",
      exemple: {
        enonce: "Notes : $12$ (coefficient $3$) et $8$ (coefficient $1$). Calculer la moyenne.",
        solution: "$\\bar{x} = \\dfrac{3 \\times 12 + 1 \\times 8}{3 + 1} = \\dfrac{44}{4} = 11$."
      }
    },
    {
      titre: "Médiane et quartiles (ST02, ST06)",
      texte:
        "- On **range** d'abord les valeurs dans l'ordre croissant.\n" +
        "- **Médiane** : la valeur du milieu (si $N$ est pair, la moyenne des deux valeurs du milieu). Au moins la moitié des valeurs sont inférieures ou égales à la médiane.\n" +
        "- **Premier quartile** $Q_1$ : la plus petite valeur telle qu'au moins $25\\,\\%$ des valeurs lui soient inférieures ou égales. Son rang est $\\dfrac{N}{4}$ arrondi à l'entier supérieur.\n" +
        "- **Troisième quartile** $Q_3$ : même idée avec $75\\,\\%$, rang $\\dfrac{3N}{4}$ arrondi à l'entier supérieur.\n" +
        "- Écart interquartile : $Q_3 - Q_1$. Étendue : max $-$ min.",
      video: { titre: "Vidéo d'Yvan Monka : moyenne, médiane, quartiles", youtube: "https://youtu.be/qKrgLZKGE8o" },
      exemple: {
        enonce: "Série rangée : $2 ; 5 ; 7 ; 8 ; 10 ; 11 ; 14 ; 15 ; 18 ; 20$. Donner la médiane, $Q_1$ et $Q_3$.",
        solution: "$N = 10$. Médiane $= \\dfrac{10 + 11}{2} = 10{,}5$.\n\n$\\dfrac{10}{4} = 2{,}5$, rang $3$ : $Q_1 = 7$. $\\dfrac{30}{4} = 7{,}5$, rang $8$ : $Q_3 = 15$."
      }
    },
    {
      titre: "Comparer avec des boîtes à moustaches (ST03)",
      video: { titre: "Vidéo d'Yvan Monka : construire un diagramme en boîte", youtube: "https://youtu.be/la7c0Yf8VyM" },
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

  videos: [],

  exercices: [
    { type: "am-diagramme", titre: "ST01 · Lire un diagramme", etape: "Programme de Seconde", nb: 5 },
    { type: "auto-statistiques", titre: "ST02 · Moyenne, médiane, étendue", etape: "Programme de Seconde", nb: 5 },
    { type: "am-quartiles", titre: "ST02 · Quartiles", etape: "Programme de Seconde", nb: 5 },
    { type: "am-boites", titre: "ST03 · Comparer des boîtes à moustaches", etape: "Programme de Seconde", nb: 5 },
    { type: "am-lire-graphique", titre: "ST04 · Origine, unités et graduations", etape: "Ajouts de Première", nb: 5 },
    { type: "am-graphique-donnees", titre: "ST05 · Du graphique aux données", etape: "Ajouts de Première", nb: 5 },
    { type: "am-moyenne-ponderee", titre: "ST06 · Moyenne avec des effectifs", etape: "Ajouts de Première", nb: 5 },
    { type: "am-flash-st", titre: "Flash : statistiques mélangées", etape: "Défi", nb: 8 }
  ],

  qcm: [
    { question: "ST01 · Un secteur de $72°$ dans un diagramme circulaire représente :", choix: ["$72\\,\\%$", "$20\\,\\%$", "$25\\,\\%$", "$7{,}2\\,\\%$"], bonne: 1, explication: "$\\dfrac{72}{360} = 0{,}2 = 20\\,\\%$." },
    { question: "ST02 · Moyenne de $8 ; 12 ; 15 ; 9$ :", choix: ["$10$", "$11$", "$12$", "$44$"], bonne: 1, explication: "$\\dfrac{44}{4} = 11$." },
    { question: "ST02 · Médiane de $4 ; 9 ; 1 ; 7 ; 3$ :", choix: ["$1$", "$4$", "$7$", "$4{,}8$"], bonne: 1, explication: "Rangée : $1 ; 3 ; 4 ; 7 ; 9$. La valeur du milieu est $4$." },
    { question: "ST02 · Pour une série de $20$ valeurs rangées, $Q_1$ est la valeur de rang :", choix: ["$4$", "$5$", "$6$", "$10$"], bonne: 1, explication: "$\\dfrac{20}{4} = 5$ : rang $5$." },
    { question: "ST02 · On ajoute une valeur très grande à une série. Ce qui change le plus :", choix: ["la médiane", "la moyenne"], bonne: 1, explication: "La moyenne est sensible aux valeurs extrêmes, la médiane beaucoup moins." },
    { question: "ST03 · Dans une boîte à moustaches, la largeur de la boîte est :", choix: ["l'étendue", "l'écart interquartile", "la moyenne", "la médiane"], bonne: 1, explication: "La boîte va de $Q_1$ à $Q_3$ : sa largeur est $Q_3 - Q_1$." },
    { question: "ST03 · D'après les boîtes du cours, au moins la moitié des élèves de la classe $A$ ont au moins :", figure: "boites-exemple", choix: ["$9$", "$11$", "$13$", "$18$"], bonne: 1, explication: "La médiane de la classe $A$ vaut $11$." },
    { question: "ST04 · Sur l'axe vertical d'un graphique, les nombres $20$ et $30$ sont écrits et séparés par $5$ carreaux. Un carreau vaut :", choix: ["$1$", "$2$", "$5$", "$10$"], bonne: 1, explication: "$5$ carreaux pour $30 - 20 = 10$ : un carreau vaut $\\dfrac{10}{5} = 2$." },
    { question: "ST05 · Sur $200$ élèves, $15\\,\\%$ viennent à pied. Dans un diagramme en bâtons des effectifs, le bâton « à pied » monte à :", choix: ["$15$", "$30$", "$185$", "$20$"], bonne: 1, explication: "$\\dfrac{15}{100} \\times 200 = 30$ élèves." },
    { question: "ST05 · $9$ élèves sur $36$ viennent en bus. Dans un diagramme circulaire, l'angle du secteur « bus » est :", choix: ["$9°$", "$25°$", "$90°$", "$36°$"], bonne: 2, explication: "$\\dfrac{9}{36} \\times 360 = 90°$." },
    { question: "ST06 · Notes : $10$ (effectif $2$), $16$ (effectif $1$). Moyenne :", choix: ["$13$", "$12$", "$26$", "$14$"], bonne: 1, explication: "$\\dfrac{2 \\times 10 + 16}{3} = \\dfrac{36}{3} = 12$." },
    { question: "ST06 · L'étendue de $3 ; 17 ; 8 ; 12$ est :", choix: ["$9$", "$14$", "$17$", "$10$"], bonne: 1, explication: "$17 - 3 = 14$." },
    { question: "ST01 · Dans un diagramme circulaire, un secteur représente $50\\,\\%$ de l'effectif. Son angle mesure :", choix: ["$180°$", "$50°$", "$90°$", "$100°$"], bonne: 0, explication: "Le disque entier, $360°$, représente $100\\,\\%$. La moitié de l'effectif correspond donc à la moitié du disque : $180°$." },
    { question: "ST01 · Dans un histogramme dont les classes ont toutes la même amplitude, le rectangle le plus haut correspond :", choix: ["à la classe qui a le plus grand effectif", "à la classe qui contient la moyenne", "à la classe qui contient la médiane", "à la dernière classe"], bonne: 0, explication: "Les aires sont proportionnelles aux effectifs. Avec des largeurs égales, les hauteurs le sont aussi : le plus haut rectangle est la classe la plus fournie." },
    { question: "ST01 · Dans un diagramme en bâtons, le bâton de la valeur $12$ monte jusqu'à $7$. Cela signifie que :", choix: ["la valeur $12$ apparaît $7$ fois", "la valeur $7$ apparaît $12$ fois", "la moyenne de la série vaut $12$", "$12\\,\\%$ des valeurs valent $7$"], bonne: 0, explication: "En abscisse, on lit la valeur ; la hauteur du bâton donne son effectif. Ici, l'effectif de la valeur $12$ est $7$." },
    { question: "ST02 · Médiane de $5 ; 2 ; 9 ; 14 ; 7 ; 3$ :", choix: ["$6$", "$11{,}5$", "$5$", "$6{,}7$"], bonne: 0, explication: "Rangée : $2 ; 3 ; 5 ; 7 ; 9 ; 14$. $N = 6$ est pair : médiane $= \\dfrac{5 + 7}{2} = 6$. $11{,}5$ vient de l'oubli du rangement, $6{,}7$ est environ la moyenne." },
    { question: "ST02 · Pour la série rangée $2 ; 4 ; 4 ; 5 ; 7 ; 8 ; 10 ; 11 ; 15$, $Q_3$ vaut :", choix: ["$10$", "$8$", "$11$", "$7$"], bonne: 0, explication: "$N = 9$ et $\\dfrac{3 \\times 9}{4} = 6{,}75$, arrondi à l'entier supérieur : rang $7$. La $7^\\text{e}$ valeur est $10$." },
    { question: "ST02 · Pour la série rangée $2 ; 4 ; 4 ; 5 ; 7 ; 8 ; 10 ; 11 ; 15$, l'écart interquartile vaut :", choix: ["$6$", "$13$", "$3$", "$7$"], bonne: 0, explication: "$Q_1$ : rang $\\dfrac{9}{4} = 2{,}25$, arrondi à $3$, donc $Q_1 = 4$. $Q_3$ : rang $7$, donc $Q_3 = 10$. Écart interquartile : $10 - 4 = 6$. $13$, c'est l'étendue." },
    { question: "ST02 · Une série a pour moyenne $12$. On ajoute $3$ à chaque valeur. La nouvelle moyenne est :", choix: ["$15$", "$12$", "$36$", "$4$"], bonne: 0, explication: "Chaque valeur augmente de $3$, donc la somme augmente de $3N$ et la moyenne de $\\dfrac{3N}{N} = 3$ : elle passe à $15$." },
    { question: "ST03 · Une boîte à moustaches a pour minimum $4$, $Q_1 = 8$, médiane $11$, $Q_3 = 13$ et maximum $19$. L'étendue vaut :", choix: ["$15$", "$5$", "$11$", "$19$"], bonne: 0, explication: "Étendue $=$ max $-$ min $= 19 - 4 = 15$. $5 = Q_3 - Q_1$ est l'écart interquartile, la largeur de la boîte." },
    { question: "ST03 · Deux classes ont la même médiane, mais la boîte de la classe $B$ est deux fois plus large que celle de la classe $A$. On peut dire que :", choix: ["les notes de $B$ sont plus dispersées que celles de $A$", "les notes de $B$ sont meilleures que celles de $A$", "la classe $B$ a deux fois plus d'élèves", "la moyenne de $B$ est deux fois plus grande"], bonne: 0, explication: "La largeur de la boîte est l'écart interquartile, un indicateur de dispersion. Même médiane : même position, mais $B$ est plus dispersée." },
    { question: "ST03 · Dans une boîte à moustaches, quelle part des valeurs se trouve environ entre $Q_1$ et la médiane ?", choix: ["environ $25\\,\\%$", "environ $50\\,\\%$", "environ $75\\,\\%$", "on ne peut pas savoir"], bonne: 0, explication: "Environ $25\\,\\%$ des valeurs sont sous $Q_1$ et environ $50\\,\\%$ sous la médiane : il en reste environ $25\\,\\%$ entre les deux, même si cette partie de la boîte est étroite." },
    { question: "ST04 · L'axe vertical d'un diagramme en barres commence à $90$ et non à $0$. Une barre deux fois plus haute qu'une autre représente :", choix: ["pas forcément une valeur deux fois plus grande", "toujours une valeur deux fois plus grande", "une valeur deux fois plus petite", "toujours une valeur supérieure de $90$"], bonne: 0, explication: "Les hauteurs se mesurent à partir de $90$ : les valeurs $95$ et $100$ donnent des barres de hauteurs $5$ et $10$, alors que $100$ n'est pas le double de $95$." },
    { question: "ST04 · Sur l'axe horizontal d'un graphique, $1$ km correspond à $4$ carreaux. Combien de carreaux pour $2{,}5$ km ?", choix: ["$10$", "$6{,}5$", "$8$", "$2{,}5$"], bonne: 0, explication: "C'est une situation de proportionnalité : $2{,}5 \\times 4 = 10$ carreaux." },
    { question: "ST05 · Sur $40$ élèves, $6$ pratiquent la pirogue. Dans un diagramme circulaire, l'angle du secteur « pirogue » est :", choix: ["$54°$", "$6°$", "$15°$", "$60°$"], bonne: 0, explication: "$\\dfrac{6}{40} \\times 360° = 0{,}15 \\times 360° = 54°$. $15$ est le pourcentage, pas l'angle." },
    { question: "ST05 · Dans un diagramme circulaire sur $60$ producteurs, le secteur « bananes » mesure $120°$. Combien de producteurs cultivent des bananes ?", choix: ["$20$", "$120$", "$40$", "$2$"], bonne: 0, explication: "$120°$ représente $\\dfrac{120}{360} = \\dfrac{1}{3}$ du disque, donc $\\dfrac{1}{3} \\times 60 = 20$ producteurs." },
    { question: "ST06 · Valeurs : $2$ (effectif $3$), $5$ (effectif $1$) et $6$ (effectif $1$). Moyenne :", choix: ["$3{,}4$", "$\\dfrac{13}{3}$", "$17$", "$5$"], bonne: 0, explication: "$\\bar{x} = \\dfrac{3 \\times 2 + 1 \\times 5 + 1 \\times 6}{5} = \\dfrac{17}{5} = 3{,}4$. $\\dfrac{13}{3}$ est la moyenne de $2$, $5$ et $6$ sans les effectifs." },
    { question: "ST06 · Dans un club de football de Sada, $8$ joueurs ont $15$ ans et $2$ joueurs ont $20$ ans. Âge moyen ?", choix: ["$16$ ans", "$17{,}5$ ans", "$18$ ans", "$15$ ans"], bonne: 0, explication: "$\\bar{x} = \\dfrac{8 \\times 15 + 2 \\times 20}{10} = \\dfrac{120 + 40}{10} = 16$ ans. $17{,}5$ est la moyenne de $15$ et $20$ sans tenir compte des effectifs." }
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
      exemple: "Médianes $11$ et $10$, écarts interquartiles $4$ et $9$ : séries de niveau proche, mais B est bien plus dispersée."
    }
  ],
  erreurs: [
    "On range les valeurs **avant** de chercher la médiane ou les quartiles.",
    "Avec des effectifs, chaque valeur compte autant de fois que son effectif.",
    "Écart interquartile ($Q_3 - Q_1$) et étendue (max $-$ min) sont deux choses différentes.",
    "La médiane n'est pas forcément au milieu de la boîte.",
    "Dans un diagramme circulaire, ce sont les angles qui sont proportionnels aux effectifs : $360°$ pour $100\\,\\%$."
  ]
};
