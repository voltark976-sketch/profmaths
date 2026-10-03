/*
  AUTOMATISMES · ÉVOLUTIONS ET VARIATIONS (EV01 à EV05)
  -----------------------------------------------------
  EV01 : programme de Seconde. EV02 à EV05 : ajouts de Première.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["auto-evolutions"] = {
  niveau: "Automatismes",
  numero: null,
  periode: "Seconde et Première",
  titre: "Évolutions et variations",
  accroche: "Hausses, baisses, coefficients multiplicateurs, taux successifs et taux réciproques : savoir passer d'un pourcentage à une multiplication.",

  playlist: "",
  drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv",
  pdfs: [
    { titre: "Dossier élève de Seconde (partie P5)", url: "https://drive.google.com/file/d/1vr9e5N38rAOQLWIvUR5suK6l6ciyoLNY/view" }
  ],

  cours: [
    {
      titre: "Du pourcentage au coefficient multiplicateur (EV01)",
      texte:
        "- Augmenter de $t\\,\\%$, c'est **multiplier** par $1 + \\dfrac{t}{100}$ : augmenter de $5\\,\\%$, c'est multiplier par $1{,}05$.\n" +
        "- Diminuer de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$ : diminuer de $20\\,\\%$, c'est multiplier par $0{,}8$.\n" +
        "- Ce nombre s'appelle le **coefficient multiplicateur** $CM$. Hausse : $CM > 1$. Baisse : $0 < CM < 1$.",
      video: { titre: "Vidéo d'Yvan Monka : coefficient multiplicateur", youtube: "https://youtu.be/-5QmcMuzy5I" },
      exemple: {
        enonce: "Par quel nombre multiplie-t-on pour augmenter de $3\\,\\%$ ? pour baisser de $12\\,\\%$ ?",
        solution: "$1 + 0{,}03 = 1{,}03$.\n\n$1 - 0{,}12 = 0{,}88$."
      }
    },
    {
      titre: "Valeur finale, valeur initiale (EV02, Première)",
      texte:
        "- $V_{\\text{finale}} = V_{\\text{initiale}} \\times CM$.\n" +
        "- Pour retrouver la valeur initiale, on **divise** : $V_{\\text{initiale}} = \\dfrac{V_{\\text{finale}}}{CM}$.\n" +
        "- Attention : après une baisse de $20\\,\\%$, on ne retrouve pas le prix de départ en ajoutant $20\\,\\%$.",
      video: { titre: "Vidéo d'Yvan Monka : appliquer une hausse ou une baisse", youtube: "https://youtu.be/-5QmcMuzy5I" },
      exemple: {
        enonce: "Après une hausse de $25\\,\\%$, un article coûte $45$ €. Quel était son prix avant ?",
        solution: "$\\dfrac{45}{1{,}25} = 36$ €."
      }
    },
    {
      titre: "Taux d'évolution (EV03, Première)",
      texte:
        "- Le taux d'évolution entre $V_0$ et $V_1$ est $t = \\dfrac{V_1 - V_0}{V_0}$, qu'on écrit en pourcentage.\n" +
        "- On divise toujours par la valeur **de départ**.\n" +
        "- On peut aussi calculer $CM = \\dfrac{V_1}{V_0}$, puis $t = CM - 1$.",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un taux d'évolution", youtube: "https://youtu.be/Y48-iK7Cp20" },
      exemple: {
        enonce: "Le prix d'un litre d'essence passe de $1{,}60$ € à $1{,}84$ €. Calculer le taux d'évolution.",
        solution: "$t = \\dfrac{1{,}84 - 1{,}60}{1{,}60} = \\dfrac{0{,}24}{1{,}60} = 0{,}15 = +15\\,\\%$."
      }
    },
    {
      titre: "Évolutions successives et taux réciproque (EV04, EV05, Première)",
      texte:
        "- Évolutions successives : on **multiplie** les coefficients. $CM_{\\text{global}} = CM_1 \\times CM_2$.\n" +
        "- Une hausse de $10\\,\\%$ suivie d'une baisse de $10\\,\\%$ donne $1{,}1 \\times 0{,}9 = 0{,}99$, soit une **baisse** de $1\\,\\%$ : les pourcentages ne s'additionnent pas.\n" +
        "- Taux réciproque : l'évolution qui ramène à la valeur de départ a pour coefficient $CM' = \\dfrac{1}{CM}$.",
      video: { titre: "Vidéo d'Yvan Monka : taux d'évolution successifs", youtube: "https://youtu.be/qOg2eXd8Hv0" },
      exemple: {
        enonce: "Un prix baisse de $20\\,\\%$. Quelle hausse permet de revenir au prix initial ?",
        solution: "$CM = 0{,}8$, donc $CM' = \\dfrac{1}{0{,}8} = 1{,}25$ : il faut une hausse de $25\\,\\%$."
      }
    }
  ],

  videos: [],

  exercices: [
    { type: "coefficient", titre: "EV01 · Taux et coefficient multiplicateur", etape: "Programme de Seconde", nb: 6 },
    { type: "appliquer-evolution", titre: "EV02 · Valeur finale, valeur initiale", etape: "Ajouts de Première", nb: 5 },
    { type: "taux-evolution", titre: "EV03 · Calculer un taux d'évolution", etape: "Ajouts de Première", nb: 5 },
    { type: "evolutions-successives", titre: "EV04 · Évolutions successives", etape: "Ajouts de Première", nb: 5 },
    { type: "taux-reciproque", titre: "EV05 · Taux réciproque", etape: "Ajouts de Première", nb: 4 },
    { type: "am-flash-ev", titre: "Flash : évolutions mélangées", etape: "Défi", nb: 8 }
  ],

  qcm: [
    { question: "EV01 · Augmenter de $7\\,\\%$, c'est multiplier par :", choix: ["$0{,}07$", "$1{,}7$", "$1{,}07$", "$7$"], bonne: 2, explication: "$1 + \\dfrac{7}{100} = 1{,}07$." },
    { question: "EV01 · Multiplier par $0{,}65$, c'est :", choix: ["baisser de $65\\,\\%$", "baisser de $35\\,\\%$", "augmenter de $65\\,\\%$", "baisser de $0{,}35\\,\\%$"], bonne: 1, explication: "$0{,}65 = 1 - 0{,}35$ : baisse de $35\\,\\%$." },
    { question: "EV02 · Un article à $80$ € augmente de $15\\,\\%$. Nouveau prix :", choix: ["$95$ €", "$92$ €", "$68$ €", "$81{,}20$ €"], bonne: 1, explication: "$80 \\times 1{,}15 = 92$ €." },
    { question: "EV02 · Après une baisse de $10\\,\\%$, un article coûte $54$ €. Prix initial :", choix: ["$59{,}40$ €", "$60$ €", "$64$ €", "$48{,}60$ €"], bonne: 1, explication: "$\\dfrac{54}{0{,}9} = 60$ €." },
    { question: "EV03 · Une population passe de $200$ à $230$ habitants. Taux d'évolution :", choix: ["$+30\\,\\%$", "$+15\\,\\%$", "$+13\\,\\%$", "$+1{,}15\\,\\%$"], bonne: 1, explication: "$\\dfrac{230 - 200}{200} = 0{,}15$." },
    { question: "EV03 · Un prix passe de $50$ € à $40$ €. Taux d'évolution :", choix: ["$-10\\,\\%$", "$-20\\,\\%$", "$-25\\,\\%$", "$+20\\,\\%$"], bonne: 1, explication: "$\\dfrac{40 - 50}{50} = -0{,}2$." },
    { question: "EV04 · Une hausse de $20\\,\\%$ puis une baisse de $20\\,\\%$ donnent :", choix: ["aucune évolution", "une baisse de $4\\,\\%$", "une hausse de $4\\,\\%$", "une baisse de $40\\,\\%$"], bonne: 1, explication: "$1{,}2 \\times 0{,}8 = 0{,}96$ : baisse de $4\\,\\%$." },
    { question: "EV04 · Deux hausses successives de $10\\,\\%$ équivalent à une hausse de :", choix: ["$20\\,\\%$", "$21\\,\\%$", "$1\\,\\%$", "$11\\,\\%$"], bonne: 1, explication: "$1{,}1 \\times 1{,}1 = 1{,}21$." },
    { question: "EV05 · Après une hausse de $25\\,\\%$, quelle baisse ramène au prix initial ?", choix: ["$25\\,\\%$", "$20\\,\\%$", "$75\\,\\%$", "$12{,}5\\,\\%$"], bonne: 1, explication: "$\\dfrac{1}{1{,}25} = 0{,}8$ : baisse de $20\\,\\%$." },
    { question: "EV05 · Un prix est divisé par $2$. Quelle hausse permet de revenir au prix initial ?", choix: ["$50\\,\\%$", "$100\\,\\%$", "$200\\,\\%$", "$150\\,\\%$"], bonne: 1, explication: "Il faut multiplier par $2$, soit une hausse de $100\\,\\%$." }
  ],

  methode: [
    {
      titre: "Résoudre un problème d'évolution",
      etapes: [
        "Traduis chaque pourcentage en coefficient multiplicateur.",
        "Valeur finale inconnue : multiplie. Valeur initiale inconnue : divise.",
        "Plusieurs évolutions : multiplie les coefficients.",
        "Reviens au pourcentage à la fin : $t = CM - 1$."
      ],
      exemple: "$+5\\,\\%$ puis $-8\\,\\%$ : $1{,}05 \\times 0{,}92 = 0{,}966$, soit $-3{,}4\\,\\%$."
    },
    {
      titre: "Lire un coefficient multiplicateur",
      etapes: [
        "$CM > 1$ : hausse de $(CM - 1) \\times 100\\,\\%$.",
        "$CM < 1$ : baisse de $(1 - CM) \\times 100\\,\\%$.",
        "$CM = 2$ : hausse de $100\\,\\%$ (la valeur double). $CM = 0{,}5$ : baisse de $50\\,\\%$."
      ],
      exemple: "$CM = 1{,}35$ : hausse de $35\\,\\%$. $CM = 0{,}94$ : baisse de $6\\,\\%$."
    }
  ],
  erreurs: [
    "Diminuer de $20\\,\\%$, c'est multiplier par $0{,}8$, pas par $0{,}2$.",
    "Le taux d'évolution se calcule en divisant par la valeur **de départ**.",
    "Les pourcentages successifs ne s'additionnent pas : on multiplie les coefficients.",
    "Une baisse de $20\\,\\%$ ne se compense pas par une hausse de $20\\,\\%$.",
    "Pour retrouver une valeur initiale, on divise par le coefficient, on ne retire pas le pourcentage au prix final."
  ]
};
