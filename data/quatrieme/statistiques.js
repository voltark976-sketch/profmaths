/*
  CHAPITRE : 4e — Statistiques
  -----------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : calculer et interpréter des
  caractéristiques de position (moyenne, moyenne pondérée, médiane) et de dispersion (étendue) d'une série
  statistique ; lire des données dans un tableau d'effectifs ou un diagramme en barres.
  Figures : "sx4-cours-…", "sx4-qcm-…" (assets/exercices-quatrieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["quatrieme-statistiques"] = {
  niveau: "4e",
  numero: 14,
  titre: "Statistiques",
  accroche: "Moyenne pondérée, médiane et étendue : résumer une série de données et comparer deux séries.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : statistiques (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Statist.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : statistiques (Yvan Monka)", url: "https://youtu.be/DtJAwfouGfY", type: "video" },
    { titre: "Déterminer une médiane dans un diagramme (Yvan Monka)", url: "https://youtu.be/msDPkgW2nhw", type: "video" },
    { titre: "Utiliser le tableur en statistiques (Yvan Monka)", url: "https://youtu.be/o5J1_Rf8D7I", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Moyenne pondérée",
      video: { titre: "Vidéo d'Yvan Monka : calculer une moyenne pondérée", youtube: "https://youtu.be/iRWmgqycx_0" },
      texte:
        "Quand les valeurs ont des **effectifs** (ou des coefficients), on calcule une **moyenne pondérée** :\n\n" +
        "$\\overline{x} = \\dfrac{\\text{somme des produits valeur} \\times \\text{effectif}}{\\text{effectif total}}$.\n\n" +
        "Notes $10$ (effectif $3$), $14$ (effectif $5$), $18$ (effectif $2$), données par le diagramme : $\\dfrac{10 \\times 3 + 14 \\times 5 + 18 \\times 2}{3 + 5 + 2} = \\dfrac{136}{10} = 13{,}6$.\n\n" +
        "Attention : on divise par l'**effectif total**, ici $10$, et non par le nombre de valeurs différentes, ici $3$.",
      figure: "sx4-cours-moyenne",
      exemple: {
        enonce: "Une élève a $12$ (coefficient $2$) et $15$ (coefficient $1$). Quelle est sa moyenne ?",
        solution: "$\\dfrac{12 \\times 2 + 15 \\times 1}{3} = \\dfrac{39}{3} = 13$."
      }
    },
    {
      titre: "Médiane",
      video: { titre: "Vidéo d'Yvan Monka : déterminer une médiane dans une liste de valeurs", youtube: "https://youtu.be/tf9fFDacKAQ" },
      texte:
        "La **médiane** est une valeur qui partage la série **rangée dans l'ordre croissant** en deux groupes de même effectif :\n\n" +
        "- avec un nombre **impair** $n$ de valeurs, c'est la valeur du milieu (la $\\dfrac{n + 1}{2}$e) ;\n" +
        "- avec un nombre **pair**, c'est la moyenne des deux valeurs du milieu.\n\n" +
        "Au moins la moitié des valeurs sont inférieures ou égales à la médiane, et au moins la moitié lui sont supérieures ou égales.\n\n" +
        "Dans un tableau ou un diagramme, on calcule l'effectif total, puis on cumule les effectifs pour trouver la valeur du bon rang.",
      figure: "sx4-cours-mediane",
      exemple: {
        enonce: "Donne la médiane de $7$ ; $3$ ; $12$ ; $5$ ; $9$ ; $4$.",
        solution: "Rangée : $3$ ; $4$ ; $5$ ; $7$ ; $9$ ; $12$. Six valeurs : $\\dfrac{5 + 7}{2} = 6$."
      }
    },
    {
      titre: "Étendue et comparaison",
      video: { titre: "Vidéo d'Yvan Monka : déterminer une médiane dans un tableau", youtube: "https://youtu.be/lv9ZJ8dGn54" },
      texte:
        "L'**étendue** est la différence entre la plus grande et la plus petite valeur : elle mesure la **dispersion**.\n\n" +
        "Deux séries peuvent avoir la même moyenne mais des étendues très différentes. La médiane est moins sensible que la moyenne aux valeurs extrêmes.",
      figure: "sx4-cours-etendue",
      exemple: {
        enonce: "Températures : $-3$ ; $5$ ; $12$ ; $8$ ; $-1$. Quelle est l'étendue ?",
        solution: "$12 - (-3) = 15$ °C."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "sx4-moyenne", titre: "Moyenne pondérée", etape: "Position", nb: 6 },
    { type: "sx4-mediane", titre: "Médiane d'une liste, d'un diagramme", etape: "Position", nb: 6 },
    { type: "sx4-etendue", titre: "Étendue et médiane d'un tableau", etape: "Dispersion", nb: 5 },
    { type: "sx4-interpreter", titre: "Interpréter", etape: "Dispersion", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "La moyenne de $8$ ; $10$ ; $15$ est :", choix: ["$11$", "$10$", "$33$", "$12$"], bonne: 0, explication: "$33 \\div 3$." },
    { question: "Notes $10$ (×$2$) et $16$ (×$1$) : la moyenne pondérée est :", choix: ["$12$", "$13$", "$14$", "$26$"], bonne: 0, explication: "$\\dfrac{20 + 16}{3}$." },
    { question: "La médiane de $2$ ; $5$ ; $9$ ; $11$ ; $20$ est :", choix: ["$9$", "$9{,}4$", "$11$", "$5$"], bonne: 0, explication: "La valeur du milieu." },
    { question: "La médiane de $3$ ; $6$ ; $8$ ; $10$ est :", choix: ["$7$", "$6$", "$8$", "$6{,}75$"], bonne: 0, explication: "$\\dfrac{6 + 8}{2}$." },
    { question: "Avant de chercher une médiane, il faut :", choix: ["ranger les valeurs", "calculer la moyenne", "calculer l'étendue", "supprimer les extrêmes"], bonne: 0, explication: "Ordre croissant." },
    { question: "L'étendue de $4$ ; $12$ ; $7$ ; $15$ est :", choix: ["$11$", "$15$", "$9{,}5$", "$19$"], bonne: 0, explication: "$15 - 4$." },
    { question: "L'étendue de $-2$ ; $6$ ; $3$ est :", choix: ["$8$", "$4$", "$6$", "$2$"], bonne: 0, explication: "$6 - (-2)$." },
    { question: "Pour $25$ valeurs rangées, la médiane est :", choix: ["la $13$e", "la $12$e", "la moyenne des $12$e et $13$e", "la $25$e"], bonne: 0, explication: "$\\dfrac{25 + 1}{2} = 13$." },
    { question: "Une valeur très grande ajoutée à une série modifie surtout :", choix: ["la moyenne", "la médiane", "le rang de la médiane seulement", "rien"], bonne: 0, explication: "La moyenne utilise toutes les valeurs." },
    { question: "La médiane d'une série de salaires est $1\\,800$ €. Donc :", choix: ["au moins la moitié gagne $1\\,800$ € ou moins", "tout le monde gagne $1\\,800$ €", "la moyenne est $1\\,800$ €", "personne ne gagne plus"], bonne: 0, explication: "Définition de la médiane." },
    { question: "Deux séries ont la même moyenne ; la série A a une étendue plus petite. Les valeurs de A sont :", choix: ["plus regroupées", "plus dispersées", "plus grandes", "plus petites"], bonne: 0, explication: "L'étendue mesure la dispersion." },
    { question: "Dans un tableau, l'effectif total est :", choix: ["la somme des effectifs", "le plus grand effectif", "le nombre de colonnes", "la moyenne des effectifs"], bonne: 0, explication: "On additionne." },
    { question: "Sur le diagramme, l'effectif total est :", figure: "sx4-qcm-diagramme", choix: ["$20$", "$5$", "$7$", "$10$"], bonne: 0, explication: "$3 + 7 + 6 + 3 + 1 = 20$ élèves." },
    { question: "Sur le diagramme, la valeur la plus fréquente est :", figure: "sx4-qcm-diagramme", choix: ["$1$", "$7$", "$2$", "$4$"], bonne: 0, explication: "La plus haute barre (effectif $7$) est celle de la valeur $1$." },
    { question: "Sur le diagramme, la médiane du nombre de frères et sœurs est :", figure: "sx4-qcm-diagramme", choix: ["$1{,}5$", "$2$", "$1$", "$1{,}6$"], bonne: 0, explication: "$20$ valeurs : moyenne des $10$e et $11$e. Effectifs cumulés $3$ ; $10$ ; $16$ : la $10$e vaut $1$ et la $11$e vaut $2$, donc $1{,}5$." },
    { question: "Sur le diagramme, la moyenne du nombre de frères et sœurs est :", figure: "sx4-qcm-diagramme", choix: ["$1{,}6$", "$2$", "$6{,}4$", "$1{,}5$"], bonne: 0, explication: "$\\dfrac{0 \\times 3 + 1 \\times 7 + 2 \\times 6 + 3 \\times 3 + 4 \\times 1}{20} = \\dfrac{32}{20} = 1{,}6$." },
    { question: "Sur le diagramme des températures moyennes à Pamandzi, l'étendue est :", figure: "sx4-qcm-temperatures", choix: ["$5$ °C", "$29$ °C", "$24$ °C", "$4$ °C"], bonne: 0, explication: "$29 - 24 = 5$ °C." },
    { question: "Notes : $12$ (coefficient $3$) et $8$ (coefficient $1$). La moyenne est :", choix: ["$11$", "$10$", "$20$", "$9$"], bonne: 0, explication: "$\\dfrac{12 \\times 3 + 8 \\times 1}{4} = \\dfrac{44}{4} = 11$." },
    { question: "La médiane de $14$ ; $3$ ; $9$ ; $21$ ; $6$ est :", choix: ["$9$", "$11$", "$10{,}6$", "$6$"], bonne: 0, explication: "Rangée : $3$ ; $6$ ; $9$ ; $14$ ; $21$ : la $3$e valeur." },
    { question: "Sur la figure, l'étendue des températures est :", figure: "sx4-cours-etendue", choix: ["$15$ °C", "$9$ °C", "$12$ °C", "$4{,}2$ °C"], bonne: 0, explication: "$12 - (-3) = 15$ °C." },
    { question: "Si on ajoute $3$ à toutes les valeurs d'une série, l'étendue :", choix: ["ne change pas", "augmente de $3$", "augmente de $6$", "double"], bonne: 0, explication: "La plus grande et la plus petite valeur augmentent de $3$ : leur écart ne change pas." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Moyenne pondérée",
      etapes: [
        "Multiplie chaque valeur par son effectif.",
        "Additionne ces produits.",
        "Divise par l'effectif total."
      ],
      figure: "sx4-cours-moyenne",
      exemple: "$(12 \\times 3 + 15 \\times 1) \\div 4 = 12{,}75$."
    },
    {
      titre: "Médiane",
      etapes: [
        "Range les valeurs (ou utilise les effectifs cumulés d'un tableau).",
        "Calcule l'effectif total $n$.",
        "$n$ impair : valeur de rang $\\dfrac{n + 1}{2}$ ; $n$ pair : moyenne des valeurs de rangs $\\dfrac{n}{2}$ et $\\dfrac{n}{2} + 1$."
      ],
      figure: "sx4-cours-mediane",
      exemple: "$n = 10$ : moyenne des $5$e et $6$e valeurs."
    },
    {
      titre: "Lire un diagramme en barres",
      etapes: [
        "Sous chaque barre : la valeur ; hauteur de la barre : son effectif.",
        "Effectif total : somme des hauteurs de toutes les barres.",
        "Pour la médiane, cumule les hauteurs de gauche à droite jusqu'au rang cherché."
      ],
      figure: "sx4-qcm-diagramme",
      exemple: "Effectifs $3$ ; $7$ ; $6$ ; $3$ ; $1$ : total $20$ ; cumulés $3$ ; $10$ ; $16$ ; … : la $10$e valeur est $1$, la $11$e est $2$."
    }
  ],
  erreurs: [
    "Oublier les effectifs dans une moyenne pondérée.",
    "Chercher la médiane sans ranger les valeurs.",
    "Confondre médiane et moyenne.",
    "Oublier le signe d'une valeur négative dans le calcul de l'étendue.",
    "Prendre le rang $\\dfrac{n}{2}$ pour un nombre impair de valeurs."
  ]
};
