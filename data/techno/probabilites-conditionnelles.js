/*
  CHAPITRE : Première technologique — Probabilités conditionnelles et indépendance
  --------------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme 2026 de première technologique, « Probabilités conditionnelles : indépendance » : indépendance de deux événements
  (définie par P_A(B) = P(B), symétrie démontrée), formule des probabilités totales dans les cas simples ; automatismes :
  probabilités conditionnelles à partir d'un tableau croisé ou d'un arbre pondéré, distinguer P(A ∩ B), P_A(B), P_B(A).
  video : vidéos d'Yvan Monka. Générateurs : préfixe yi- dans assets/exercices-techno.js ; figures "yi-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["techno-probabilites-conditionnelles"] = {
  niveau: "Première technologique",
  numero: 12,
  titre: "Probabilités conditionnelles et indépendance",
  accroche: "« Sachant que… » : restreindre l'univers, lire un tableau croisé ou un arbre, et savoir quand une information ne change rien (indépendance).",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : probabilités conditionnelles et indépendance (PDF)", url: "https://www.maths-et-tiques.fr/telech/19CondTM.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Probabilité conditionnelle avec un tableau croisé",
      video: { titre: "Vidéo d'Yvan Monka : probabilité conditionnelle à l'aide d'un tableau", youtube: "https://youtu.be/JEL4hxtnw0Q" },
      texte:
        "Dans une population, on choisit un individu au hasard. Si $A$ est un événement de probabilité non nulle, la **probabilité de $B$ sachant $A$**, notée $P_A(B)$, est la probabilité que $B$ soit réalisé quand on sait que $A$ l'est : on se **restreint** aux individus de $A$.\n\n" +
        "Avec un tableau croisé d'effectifs : $P_A(B) = \\dfrac{\\text{effectif de } A \\cap B}{\\text{effectif de } A}$.\n\n" +
        "Trois probabilités à ne pas confondre :\n\n" +
        "- $P(A \\cap B)$ : $A$ **et** $B$, sur toute la population ;\n" +
        "- $P_A(B)$ : $B$ parmi les $A$ ;\n" +
        "- $P_B(A)$ : $A$ parmi les $B$.\n\n" +
        "Exemple : sur $200$ personnes testées, $20$ sont malades et $18$ d'entre elles ont un test positif ; $15$ personnes saines ont aussi un test positif. $P_M(T) = \\dfrac{18}{20} = 0{,}9$, mais $P_T(M) = \\dfrac{18}{33} \\approx 0{,}55$ : un test positif ne signifie pas forcément qu'on est malade !",
      exemple: {
        enonce: "Avec ces données, calcule $P(M \\cap T)$.",
        solution: "$P(M \\cap T) = \\dfrac{18}{200} = 0{,}09$ (on divise par l'effectif total)."
      }
    },
    {
      titre: "Formule et arbre pondéré",
      figure: "yi-cours-arbre",
      video: { titre: "Vidéo d'Yvan Monka : calculer une probabilité conditionnelle (formule)", youtube: "https://youtu.be/SWmkdKxXf_I" },
      texte:
        "**Formule** : $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$, donc $P(A \\cap B) = P(A) \\times P_A(B)$.\n\n" +
        "Un **arbre pondéré** représente une expérience en deux étapes :\n\n" +
        "- au premier niveau, $P(A)$ et $P(\\overline{A})$ ;\n" +
        "- au second niveau, les probabilités **conditionnelles** : $P_A(B)$, $P_A(\\overline{B})$ sur les branches issues de $A$, etc. ;\n" +
        "- la somme des probabilités des branches issues d'un même nœud vaut $1$ ;\n" +
        "- la probabilité d'un **chemin** est le **produit** des probabilités de ses branches : $P(A \\cap B) = P(A) \\times P_A(B)$.",
      exemple: {
        enonce: "Sur l'arbre (dépistage), calcule $P(M \\cap T)$.",
        solution: "$P(M \\cap T) = 0{,}1 \\times 0{,}95 = 0{,}095$."
      }
    },
    {
      titre: "Formule des probabilités totales",
      figure: "yi-cours-totales",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la formule des probabilités totales", youtube: "https://youtu.be/qTpTBoZA7zY" },
      texte:
        "Pour obtenir $P(B)$, on additionne les probabilités de **tous les chemins** qui mènent à $B$ :\n\n" +
        "$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B) = P(A) \\times P_A(B) + P(\\overline{A}) \\times P_{\\overline{A}}(B)$\n\n" +
        "C'est la **formule des probabilités totales**. Exemple (usine) : $P(D) = 0{,}3 \\times 0{,}1 + 0{,}7 \\times 0{,}05 = 0{,}03 + 0{,}035 = 0{,}065$ : $6{,}5\\,\\%$ des pièces sont défectueuses.\n\n" +
        "On peut ensuite « remonter » l'arbre : $P_D(A) = \\dfrac{P(A \\cap D)}{P(D)} = \\dfrac{0{,}03}{0{,}065} \\approx 0{,}46$.",
      exemple: {
        enonce: "Sur l'arbre du dépistage, calcule $P(T)$.",
        solution: "$P(T) = 0{,}1 \\times 0{,}95 + 0{,}9 \\times 0{,}02 = 0{,}095 + 0{,}018 = 0{,}113$."
      }
    },
    {
      titre: "Événements indépendants",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que deux événements sont indépendants", youtube: "https://youtu.be/OPuoB5EuOAQ" },
      texte:
        "**Définition.** $A$ étant de probabilité non nulle, $B$ est **indépendant** de $A$ si $P_A(B) = P(B)$ : savoir que $A$ est réalisé ne change pas la probabilité de $B$.\n\n" +
        "**Conséquence.** Alors $P(A \\cap B) = P(A) \\times P_A(B) = P(A) \\times P(B)$. Réciproquement, si $P(A \\cap B) = P(A) \\times P(B)$, les événements sont indépendants.\n\n" +
        "**Démonstration de la symétrie** ($P(A)$ et $P(B)$ non nulles) : si $P_A(B) = P(B)$, alors $P(A \\cap B) = P(A)P(B)$, donc $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{P(A)P(B)}{P(B)} = P(A)$ : $A$ est aussi indépendant de $B$. On dit simplement que $A$ et $B$ sont indépendants.\n\n" +
        "Attention : **indépendants** ne veut pas dire **incompatibles** (sans issue commune). Deux événements incompatibles de probabilités non nulles ne sont jamais indépendants.",
      exemple: {
        enonce: "$P(A) = 0{,}4$, $P(B) = 0{,}5$ et $P(A \\cap B) = 0{,}2$. Indépendants ?",
        solution: "$P(A) \\times P(B) = 0{,}2 = P(A \\cap B)$ : oui."
      }
    },
    {
      titre: "Python : simuler et compter",
      video: { titre: "Vidéo d'Yvan Monka : créer un compteur en Python", youtube: "https://youtu.be/6m04wQqKBBc" },
      texte:
        "On peut estimer une probabilité conditionnelle par simulation :\n\n" +
        "```python\nfrom random import random\n\nnA, nAB = 0, 0\nfor k in range(10000):\n    A = random() < 0.3                 # machine A ?\n    if A:\n        D = random() < 0.1             # défaut sachant A\n    else:\n        D = random() < 0.05            # défaut sachant B\n    if A:\n        nA = nA + 1\n        if D:\n            nAB = nAB + 1\nprint(nAB / nA)                        # proche de P_A(D) = 0,1\n```\n\n" +
        "La fréquence de $D$ **parmi** les cas $A$ approche $P_A(D)$."
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "yi-tableau", titre: "Lire un tableau croisé", etape: "Conditionner", nb: 5 },
    { type: "yi-distinguer", titre: "Distinguer P(A ∩ B), P_A(B), P_B(A)", etape: "Conditionner", nb: 4 },
    { type: "yi-arbre", titre: "Arbre pondéré", etape: "Arbres", nb: 5 },
    { type: "yi-totales", titre: "Probabilités totales et retour", etape: "Arbres", nb: 5 },
    { type: "yi-independance", titre: "Indépendance", etape: "Indépendance", nb: 5 },
    { type: "yi-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$P_A(B)$ se lit :", choix: ["probabilité de $B$ sachant $A$", "probabilité de $A$ sachant $B$", "probabilité de $A$ et $B$", "probabilité de $A$ ou $B$"], bonne: 0, explication: "L'événement en indice est celui qu'on sait réalisé." },
    { question: "Dans un tableau, $30$ élèves font de l'espagnol dont $12$ sont internes. La probabilité qu'un élève soit interne sachant qu'il fait de l'espagnol est :", choix: ["$\\dfrac{12}{30}$", "$\\dfrac{30}{12}$", "$\\dfrac{12}{\\text{effectif total}}$", "$\\dfrac{18}{30}$"], bonne: 0, explication: "On se restreint aux $30$ hispanisants." },
    { question: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ donc $P(A \\cap B)$ vaut :", choix: ["$P(A) \\times P_A(B)$", "$P(A) + P_A(B)$", "$\\dfrac{P_A(B)}{P(A)}$", "$P(B) \\times P_A(B)$"], bonne: 0, explication: "On multiplie les deux côtés par $P(A)$." },
    { question: "$P(A) = 0{,}4$ et $P_A(B) = 0{,}5$. Alors $P(A \\cap B)$ vaut :", choix: ["$0{,}2$", "$0{,}9$", "$0{,}8$", "$1{,}25$"], bonne: 0, explication: "$0{,}4 \\times 0{,}5$." },
    { question: "Sur un arbre, deux branches partent de $A$ : $B$ avec $0{,}35$. Sur la branche vers $\\overline{B}$, on écrit :", choix: ["$0{,}65$", "$0{,}35$", "$1{,}35$", "$P(A)$"], bonne: 0, explication: "Somme égale à $1$." },
    { question: "La probabilité d'un chemin d'un arbre s'obtient :", choix: ["en multipliant les probabilités des branches", "en additionnant les probabilités des branches", "en prenant la dernière branche", "en divisant par le nombre de branches"], bonne: 0, explication: "Règle du produit." },
    { question: "$P(A) = 0{,}2$, $P_A(B) = 0{,}5$, $P_{\\overline{A}}(B) = 0{,}1$. Alors $P(B)$ vaut :", choix: ["$0{,}18$", "$0{,}6$", "$0{,}1$", "$0{,}28$"], bonne: 0, explication: "$0{,}2 \\times 0{,}5 + 0{,}8 \\times 0{,}1 = 0{,}1 + 0{,}08$." },
    { question: "La formule des probabilités totales s'écrit :", choix: ["$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$", "$P(B) = P(A) + P(\\overline{A})$", "$P(B) = P_A(B) + P_{\\overline{A}}(B)$", "$P(B) = P(A) \\times P_A(B)$"], bonne: 0, explication: "On additionne les deux chemins qui mènent à $B$." },
    { question: "Avec $P(A \\cap B) = 0{,}06$ et $P(B) = 0{,}15$, $P_B(A)$ vaut :", choix: ["$0{,}4$", "$0{,}009$", "$2{,}5$", "$0{,}21$"], bonne: 0, explication: "$\\dfrac{0{,}06}{0{,}15}$." },
    { question: "En général, $P_A(B)$ et $P_B(A)$ sont :", choix: ["différentes", "toujours égales", "toujours de somme $1$", "toujours nulles"], bonne: 0, explication: "Les populations de référence sont différentes." },
    { question: "$A$ et $B$ sont indépendants si :", choix: ["$P_A(B) = P(B)$", "$P_A(B) = P(A)$", "$P(A \\cap B) = 0$", "$P(A) = P(B)$"], bonne: 0, explication: "Savoir $A$ ne change pas la probabilité de $B$." },
    { question: "Si $A$ et $B$ sont indépendants avec $P(A) = 0{,}3$ et $P(B) = 0{,}6$, alors $P(A \\cap B)$ vaut :", choix: ["$0{,}18$", "$0{,}9$", "$0{,}3$", "$0{,}5$"], bonne: 0, explication: "$0{,}3 \\times 0{,}6$." },
    { question: "$P(A) = 0{,}5$, $P(B) = 0{,}4$, $P(A \\cap B) = 0{,}3$. Les événements $A$ et $B$ :", choix: ["ne sont pas indépendants", "sont indépendants", "sont incompatibles", "sont contraires"], bonne: 0, explication: "$0{,}5 \\times 0{,}4 = 0{,}2 \\neq 0{,}3$." },
    { question: "Deux événements incompatibles de probabilités non nulles sont :", choix: ["jamais indépendants", "toujours indépendants", "contraires", "de même probabilité"], bonne: 0, explication: "$P(A \\cap B) = 0 \\neq P(A)P(B)$." },
    { question: "Si $A$ et $B$ sont indépendants et $P(B) = 0{,}7$, alors $P_A(B)$ vaut :", choix: ["$0{,}7$", "$0{,}3$", "$P(A) \\times 0{,}7$", "on ne peut pas savoir"], bonne: 0, explication: "Indépendance : $P_A(B) = P(B)$." },
    { question: "Sur un arbre, les probabilités écrites au second niveau sont :", choix: ["des probabilités conditionnelles", "des probabilités d'intersections", "toujours égales à $0{,}5$", "les mêmes sur chaque branche"], bonne: 0, explication: "Elles dépendent de l'issue du premier niveau." },
    { question: "$10\\,\\%$ d'une population est malade ; un test est positif chez $90\\,\\%$ des malades et $5\\,\\%$ des sains. $P(T)$ vaut :", choix: ["$0{,}135$", "$0{,}95$", "$0{,}09$", "$0{,}045$"], bonne: 0, explication: "$0{,}1 \\times 0{,}9 + 0{,}9 \\times 0{,}05 = 0{,}09 + 0{,}045$." },
    { question: "Avec les données précédentes, $P_T(M)$ vaut environ :", choix: ["$0{,}67$", "$0{,}9$", "$0{,}1$", "$0{,}135$"], bonne: 0, explication: "$\\dfrac{0{,}09}{0{,}135} \\approx 0{,}67$." },
    { question: "Dans un tableau croisé, $P(A \\cap B)$ se calcule en divisant l'effectif de $A \\cap B$ par :", choix: ["l'effectif total", "l'effectif de $A$", "l'effectif de $B$", "$2$"], bonne: 0, explication: "Pas de condition : toute la population." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer avec un tableau croisé",
      etapes: [
        "Repérer la population de référence : tout le monde ($P(A \\cap B)$, $P(A)$) ou une sous-population (« sachant », « parmi »).",
        "Numérateur : l'effectif de la case qui vérifie les conditions.",
        "Dénominateur : l'effectif total, ou celui de la ligne ou colonne de la condition.",
        "Simplifier la fraction."
      ],
      exemple: "$18$ malades positifs sur $20$ malades : $P_M(T) = \\dfrac{18}{20} = 0{,}9$."
    },
    {
      titre: "Construire et utiliser un arbre",
      figure: "yi-cours-arbre",
      etapes: [
        "Premier niveau : l'événement « de départ » et son contraire.",
        "Second niveau : les probabilités conditionnelles données dans l'énoncé.",
        "Compléter chaque nœud pour que la somme fasse $1$.",
        "Probabilité d'un chemin : produit ; probabilité d'un événement : somme des chemins qui y mènent."
      ],
      exemple: "$P(T) = 0{,}1 \\times 0{,}95 + 0{,}9 \\times 0{,}02 = 0{,}113$."
    },
    {
      titre: "Remonter l'arbre",
      figure: "yi-cours-totales",
      etapes: [
        "Calculer $P(A \\cap B)$ (un chemin).",
        "Calculer $P(B)$ avec la formule des probabilités totales.",
        "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
        "Interpréter (par exemple : proportion de malades parmi les tests positifs)."
      ],
      exemple: "$P_D(A) = \\dfrac{0{,}03}{0{,}065} \\approx 0{,}46$."
    },
    {
      titre: "Tester l'indépendance",
      etapes: [
        "Calculer $P(A) \\times P(B)$ et le comparer à $P(A \\cap B)$.",
        "Ou comparer $P_A(B)$ et $P(B)$.",
        "Égalité : indépendants ; sinon : dépendants.",
        "Ne pas confondre avec « incompatibles » ($P(A \\cap B) = 0$)."
      ],
      exemple: "$P(A) = 0{,}5$, $P(B) = 0{,}3$, $P(A \\cap B) = 0{,}15$ : indépendants."
    }
  ],
  erreurs: [
    "Confondre $P_A(B)$ et $P_B(A)$ : l'événement qu'on sait réalisé va en indice.",
    "Diviser par l'effectif total pour une probabilité conditionnelle.",
    "Additionner le long d'un chemin au lieu de multiplier.",
    "Oublier un chemin dans la formule des probabilités totales.",
    "Écrire $P(A \\cap B) = P(A) \\times P(B)$ sans savoir que les événements sont indépendants.",
    "Confondre indépendants et incompatibles.",
    "Oublier de compléter les branches pour que leur somme fasse $1$."
  ]
};
