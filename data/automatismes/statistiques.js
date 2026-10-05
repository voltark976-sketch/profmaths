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
        "- Avant de lire : titre, unités des axes, graduations.",
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
    { question: "ST06 · Notes : $10$ (effectif $2$), $16$ (effectif $1$). Moyenne :", choix: ["$13$", "$12$", "$26$", "$14$"], bonne: 1, explication: "$\\dfrac{2 \\times 10 + 16}{3} = \\dfrac{36}{3} = 12$." },
    { question: "ST06 · L'étendue de $3 ; 17 ; 8 ; 12$ est :", choix: ["$9$", "$14$", "$17$", "$10$"], bonne: 1, explication: "$17 - 3 = 14$." }
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
