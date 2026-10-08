/*
  CHAPITRE : Première spécialité — Probabilités conditionnelles et indépendance
  ------------------------------------------------------------------------------
  Chapitre 4 de la progression spiralée 2026-2027 (programme de Première 2026).
  Reprise de Seconde (chapitres 10 et 15) puis indépendance, partition, probabilités totales.
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas encore de vidéo de la chaîne ni de PDF pour ce chapitre : les vidéos sont celles d'Yvan Monka.
  Figures : "arbre-depistage", "arbre-partition", "arbre-independance". Générateurs : pc- (Seconde) et pi-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-probabilites"] = {
  niveau: "Première spécialité",
  numero: 4,
  titre: "Probabilités conditionnelles et indépendance",
  accroche: "Un test positif au dispensaire, des gousses de vanille de trois villages, deux tirs indépendants : arbres pondérés, probabilités totales et indépendance.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur les probabilités conditionnelles en vidéo (Yvan Monka)", url: "https://youtu.be/5oBnmZVrOXE", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Rappels : probabilité conditionnelle et arbre",
      figure: "arbre-depistage",
      video: { titre: "Vidéo d'Yvan Monka : calculer une probabilité conditionnelle (formule)", youtube: "https://youtu.be/SWmkdKxXf_I" },
      texte:
        "Pour $P(A) \\neq 0$, la probabilité de $B$ **sachant** $A$ est $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$, donc $P(A \\cap B) = P(A) \\times P_A(B)$.\n\n" +
        "Dans un **arbre pondéré** :\n" +
        "- les branches issues d'un même nœud ont une somme égale à $1$ ;\n" +
        "- au second niveau, on écrit des probabilités **conditionnelles** ;\n" +
        "- la probabilité d'un **chemin** est le produit des probabilités de ses branches.\n\n" +
        "Bien distinguer $P(A \\cap B)$ (un chemin), $P_A(B)$ (une branche) et $P_B(A)$ (à calculer).",
      exemple: {
        enonce: "Sur l'arbre ci-contre ($M$ : malade, $T$ : test positif), calculer $P(M \\cap T)$.",
        solution: "$P(M \\cap T) = 0{,}02 \\times 0{,}95 = 0{,}019$."
      }
    },
    {
      titre: "Partition et formule des probabilités totales",
      figure: "arbre-partition",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la formule des probabilités totales", youtube: "https://youtu.be/qTpTBoZA7zY" },
      texte:
        "Des événements $A_1$, $A_2$, …, $A_n$ forment une **partition** de l'univers s'ils sont deux à deux disjoints et si leur réunion est l'univers : chaque issue est dans un seul $A_i$.\n\n" +
        "**Formule des probabilités totales** : pour tout événement $B$,\n\n" +
        "$P(B) = P(A_1 \\cap B) + P(A_2 \\cap B) + \\dots + P(A_n \\cap B)$.\n\n" +
        "Sur l'arbre : $P(B)$ est la **somme des probabilités des chemins** qui mènent à $B$. Cas le plus courant : $P(B) = P(A)P_A(B) + P(\\overline{A})P_{\\overline{A}}(B)$.",
      exemple: {
        enonce: "Une coopérative reçoit $50\\,\\%$ de sa vanille du village $A_1$, $30\\,\\%$ de $A_2$, $20\\,\\%$ de $A_3$, avec $2\\,\\%$, $4\\,\\%$ et $6\\,\\%$ de gousses abîmées. Probabilité qu'une gousse soit abîmée ?",
        solution: "$P(D) = 0{,}5 \\times 0{,}02 + 0{,}3 \\times 0{,}04 + 0{,}2 \\times 0{,}06 = 0{,}01 + 0{,}012 + 0{,}012 = 0{,}034$."
      }
    },
    {
      titre: "Inverser un conditionnement",
      texte:
        "On connaît $P_M(T)$ sur l'arbre, et on cherche $P_T(M)$ :\n\n" +
        "$P_T(M) = \\dfrac{P(M \\cap T)}{P(T)}$, où $P(T)$ se calcule avec les probabilités totales.\n\n" +
        "C'est la question « j'ai un test positif : quelle est la probabilité que je sois malade ? ». La réponse peut être faible même si le test est très sensible, quand la maladie est rare.",
      exemple: {
        enonce: "Avec l'arbre du premier paragraphe ($P(M) = 0{,}02$, $P_M(T) = 0{,}95$, $P_{\\overline{M}}(T) = 0{,}1$), calculer $P_T(M)$.",
        solution: "$P(T) = 0{,}02 \\times 0{,}95 + 0{,}98 \\times 0{,}1 = 0{,}019 + 0{,}098 = 0{,}117$.\n\n$P_T(M) = \\dfrac{0{,}019}{0{,}117} \\approx 0{,}16$."
      }
    },
    {
      titre: "Événements indépendants",
      figure: "arbre-independance",
      video: { titre: "Vidéo d'Yvan Monka : démontrer l'indépendance entre deux événements", youtube: "https://youtu.be/wdiMq_lTk1w" },
      texte:
        "Deux événements $A$ et $B$ sont **indépendants** si $P(A \\cap B) = P(A) \\times P(B)$.\n\n" +
        "- Si $P(A) \\neq 0$, c'est équivalent à $P_A(B) = P(B)$ : savoir que $A$ est réalisé ne change pas la probabilité de $B$.\n" +
        "- Sur un arbre, $A$ et $B$ sont indépendants quand $P_A(B) = P_{\\overline{A}}(B)$ (les branches vers $B$ portent le même nombre).\n" +
        "- Si $A$ et $B$ sont indépendants, $\\overline{A}$ et $B$ le sont aussi.\n\n" +
        "Ne pas confondre **indépendants** (une notion de probabilité) et **incompatibles** ($A \\cap B = \\varnothing$).",
      exemple: {
        enonce: "$P(A) = 0{,}4$, $P(B) = 0{,}3$ et $P(A \\cap B) = 0{,}12$. $A$ et $B$ sont-ils indépendants ?",
        solution: "$P(A) \\times P(B) = 0{,}4 \\times 0{,}3 = 0{,}12 = P(A \\cap B)$ : oui, ils sont indépendants (comme sur l'arbre : $P_A(B) = P_{\\overline{A}}(B) = 0{,}3$)."
      }
    },
    {
      titre: "Succession de deux épreuves indépendantes",
      video: { titre: "Vidéo d'Yvan Monka : calculer une probabilité sur une répétition d'expériences", youtube: "https://youtu.be/e7jH8a1cDtg" },
      texte:
        "Quand deux épreuves sont **indépendantes** (lancer un dé puis une pièce, tirer **avec remise**), la probabilité d'une issue $(x\\,;y)$ est le **produit** des probabilités : $P(x\\,;y) = P(x) \\times P(y)$.\n\n" +
        "On représente l'expérience par un arbre (les branches du second niveau sont les mêmes partout) ou par un tableau à double entrée.\n\n" +
        "Attention : un tirage **sans remise** n'est pas une succession d'épreuves indépendantes.",
      exemple: {
        enonce: "Un tireur atteint la cible avec la probabilité $0{,}8$, indépendamment d'un tir à l'autre. Il tire deux fois. Probabilité d'au moins une réussite ?",
        solution: "Événement contraire : deux échecs, de probabilité $0{,}2 \\times 0{,}2 = 0{,}04$. Donc $P = 1 - 0{,}04 = 0{,}96$."
      }
    },
    {
      titre: "Python : simuler deux épreuves indépendantes",
      texte:
        "$\\texttt{random()}$ renvoie un nombre au hasard dans $[0\\,;1[$ : $\\texttt{random() < p}$ est vrai avec la probabilité $p$. Deux appels successifs sont indépendants.\n\n" +
        "```python\nfrom random import random\n\ndef deux_tirs(p):\n    return random() < p, random() < p\n\ndef freq_deux(p, n):\n    c = 0\n    for i in range(n):\n        a, b = deux_tirs(p)\n        if a and b:\n            c = c + 1\n    return c / n\n```",
      exemple: {
        enonce: "Vers quelle valeur $\\texttt{freq\\_deux(0.8, 100000)}$ se rapproche-t-elle ?",
        solution: "Vers $0{,}8 \\times 0{,}8 = 0{,}64$ (épreuves indépendantes, loi des grands nombres)."
      }
    }
  ],

  /* Exercices corrigés en vidéo */
  videos: [
    { titre: "Utiliser l'indépendance entre deux événements (1)", type: "Indépendance", youtube: "https://youtu.be/SD9H5OYYLz0" },
    { titre: "Utiliser l'indépendance entre deux événements (2)", type: "Indépendance", youtube: "https://youtu.be/yIvN6Dh-bDg" },
    { titre: "Compléter un arbre pondéré", type: "Arbre", youtube: "https://youtu.be/o1HQ6xJ7o4U" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES ---------- */
  exercices: [
    { type: "pc-traduire", titre: "Traduire en notations", etape: "Rappels", nb: 4 },
    { type: "pc-arbre", titre: "Compléter et lire un arbre", etape: "Rappels", nb: 5 },
    { type: "pi-totales", titre: "Probabilités totales (deux branches)", etape: "Probabilités totales", nb: 5 },
    { type: "pi-partition", titre: "Probabilités totales (trois villages)", etape: "Probabilités totales", nb: 3 },
    { type: "pi-inverser", titre: "Inverser le conditionnement", etape: "Probabilités totales", nb: 4 },
    { type: "pi-independance", titre: "Indépendants ou pas ?", etape: "Indépendance", nb: 5 },
    { type: "pi-epreuves", titre: "Deux épreuves indépendantes", etape: "Indépendance", nb: 5 },
    { type: "pc-python", titre: "Python : simulation à deux épreuves", etape: "Indépendance", nb: 3 }
  ],

  /* ---------- 3. QCM ---------- */
  qcm: [
    {
      question: "Sur un arbre, $P(A) = 0{,}3$, $P_A(B) = 0{,}6$, $P_{\\overline{A}}(B) = 0{,}2$. Alors $P(B)$ vaut :",
      choix: ["$0{,}32$", "$0{,}8$", "$0{,}18$", "$0{,}4$"],
      bonne: 0,
      explication: "$P(B) = 0{,}3 \\times 0{,}6 + 0{,}7 \\times 0{,}2 = 0{,}18 + 0{,}14 = 0{,}32$."
    },
    {
      question: "La formule des probabilités totales s'applique quand :",
      choix: ["les événements de départ forment une partition de l'univers", "les événements sont indépendants", "les événements sont incompatibles avec $B$", "l'arbre a deux niveaux exactement"],
      bonne: 0,
      explication: "Il faut que chaque issue soit dans un et un seul des événements $A_i$ : une partition."
    },
    {
      question: "$A$ et $B$ sont indépendants si et seulement si :",
      choix: ["$P(A \\cap B) = P(A) \\times P(B)$", "$P(A \\cap B) = 0$", "$P(A) + P(B) = 1$", "$P_A(B) = P_B(A)$"],
      bonne: 0,
      explication: "C'est la définition. $P(A \\cap B) = 0$ correspond à des événements incompatibles."
    },
    {
      question: "$A$ et $B$ indépendants, $P(A) = 0{,}5$ et $P(B) = 0{,}4$. Alors $P_A(B)$ vaut :",
      choix: ["$0{,}4$", "$0{,}5$", "$0{,}2$", "$0{,}8$"],
      bonne: 0,
      explication: "Indépendance : savoir $A$ ne change rien, $P_A(B) = P(B) = 0{,}4$."
    },
    {
      question: "Deux événements incompatibles de probabilités non nulles sont-ils indépendants ?",
      choix: ["Non, jamais", "Oui, toujours", "Seulement si $P(A) = P(B)$", "On ne peut pas savoir"],
      bonne: 0,
      explication: "$P(A \\cap B) = 0$ alors que $P(A) \\times P(B) > 0$ : ils ne sont pas indépendants. Savoir que $A$ est réalisé empêche $B$."
    },
    {
      question: "On tire deux boules **sans remise** dans une urne. Les deux tirages sont :",
      choix: ["dépendants : la composition change", "indépendants", "incompatibles", "équiprobables"],
      bonne: 0,
      explication: "Sans remise, le premier tirage modifie l'urne : la probabilité au second tirage dépend du premier."
    },
    {
      question: "Un test est positif chez $99\\,\\%$ des malades. Cela signifie :",
      choix: ["$P_M(T) = 0{,}99$", "$P_T(M) = 0{,}99$", "$P(M \\cap T) = 0{,}99$", "$P(T) = 0{,}99$"],
      bonne: 0,
      explication: "« Parmi les malades » : $M$ en indice. $P_T(M)$ se calcule ensuite avec les probabilités totales."
    },
    {
      question: "On lance deux fois une pièce équilibrée. Probabilité d'obtenir deux fois « face » :",
      choix: ["$\\dfrac{1}{4}$", "$\\dfrac{1}{2}$", "$1$", "$\\dfrac{1}{3}$"],
      bonne: 0,
      explication: "Épreuves indépendantes : $\\dfrac{1}{2} \\times \\dfrac{1}{2} = \\dfrac{1}{4}$."
    }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer $P(B)$ avec un arbre",
      etapes: [
        "Repérer tous les chemins qui mènent à $B$.",
        "Calculer la probabilité de chaque chemin : produit des branches.",
        "Additionner : c'est la formule des probabilités totales."
      ],
      exemple: "$P(B) = 0{,}3 \\times 0{,}6 + 0{,}7 \\times 0{,}2 = 0{,}32$."
    },
    {
      titre: "Inverser un conditionnement",
      etapes: [
        "Calculer $P(A \\cap B)$ : un chemin de l'arbre.",
        "Calculer $P(B)$ : probabilités totales.",
        "Diviser : $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$."
      ],
      exemple: "$P_T(M) = \\dfrac{0{,}019}{0{,}117} \\approx 0{,}16$."
    },
    {
      titre: "Montrer que deux événements sont indépendants (ou non)",
      etapes: [
        "Calculer $P(A) \\times P(B)$.",
        "Calculer $P(A \\cap B)$ (tableau, arbre ou énoncé).",
        "Égaux : indépendants. Différents : pas indépendants."
      ],
      exemple: "$0{,}4 \\times 0{,}3 = 0{,}12 = P(A \\cap B)$ : indépendants."
    }
  ],
  erreurs: [
    "Confondre $P_A(B)$ et $P_B(A)$.",
    "Additionner les branches du second niveau au lieu des chemins.",
    "Oublier un chemin dans la formule des probabilités totales.",
    "Confondre événements indépendants et incompatibles.",
    "Multiplier les probabilités pour des tirages sans remise comme s'ils étaient indépendants."
  ]
};
