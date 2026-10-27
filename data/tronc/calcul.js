/*
  CHAPITRE : Première tronc commun — Automatismes : calcul algébrique et signes
  ----------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme de mathématiques intégré à l'enseignement scientifique de Première générale (BO n° 14 du 2 avril 2026),
  partie « Automatismes », bloc « Calcul numérique et algébrique » : solutions d'une équation produit nul ; signe d'une
  expression du premier degré, d'une expression factorisée du second degré ; développer, factoriser, réduire une expression
  algébrique simple (avec les identités remarquables de Seconde).
  video : vidéos de la chaîne et d'Yvan Monka. Générateurs : préfixe qc- dans assets/exercices-tronc.js ; figures "qc-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["tronc-calcul"] = {
  niveau: "Première tronc commun",
  numero: 2,
  titre: "Automatismes : calcul algébrique et signes",
  accroche: "Les réflexes de calcul de l'année : développer, factoriser, réduire, résoudre une équation produit nul et trouver le signe d'une expression avec un tableau.",

  playlist: "",
  drive: "",
  pdfs: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Développer et réduire",
      video: { titre: "Vidéo de ton prof : développer et factoriser avec les identités remarquables", youtube: "https://youtu.be/zrIo7AksY5o" },
      texte:
        "**Développer**, c'est transformer un produit en somme.\n\n" +
        "- Simple distributivité : $k(a + b) = ka + kb$. Ainsi $3(2x - 5) = 6x - 15$.\n" +
        "- Double distributivité : $(a + b)(c + d) = ac + ad + bc + bd$. Chaque terme de la première parenthèse multiplie chaque terme de la seconde.\n" +
        "- Un signe $-$ devant une parenthèse change le signe de **tous** les termes : $-(x - 4) = -x + 4$.\n\n" +
        "**Réduire**, c'est regrouper les termes de même nature : les $x^2$ ensemble, les $x$ ensemble, les nombres ensemble.",
      exemple: {
        enonce: "Développe et réduis $(3x - 2)(x + 4) - 2(x - 1)$.",
        solution: "$(3x - 2)(x + 4) = 3x^2 + 12x - 2x - 8 = 3x^2 + 10x - 8$, et $-2(x - 1) = -2x + 2$. Total : $3x^2 + 8x - 6$."
      }
    },
    {
      titre: "Factoriser",
      video: { titre: "Vidéo de ton prof : développer et factoriser avec les identités remarquables", youtube: "https://youtu.be/zrIo7AksY5o" },
      texte:
        "**Factoriser**, c'est transformer une somme en produit. Deux outils :\n\n" +
        "- un **facteur commun** : $3x^2 + 12x = 3x(x + 4)$ ; $5(x + 2) + (x + 2)(x - 1) = (x + 2)(5 + x - 1) = (x + 2)(x + 4)$ ;\n" +
        "- une **identité remarquable**, lue de droite à gauche : $a^2 + 2ab + b^2 = (a + b)^2$, $a^2 - 2ab + b^2 = (a - b)^2$, $a^2 - b^2 = (a - b)(a + b)$.\n\n" +
        "On vérifie toujours une factorisation en redéveloppant. Factoriser sert surtout à résoudre des équations (produit nul) et à étudier un signe (tableau de signes).",
      exemple: {
        enonce: "Factorise $x^2 - 49$ puis $4x^2 - 12x + 9$.",
        solution: "$x^2 - 49 = x^2 - 7^2 = (x - 7)(x + 7)$. $4x^2 - 12x + 9 = (2x)^2 - 2 \\times 2x \\times 3 + 3^2 = (2x - 3)^2$."
      }
    },
    {
      titre: "Équation produit nul",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation-produit", youtube: "https://youtu.be/4CWk30Ypj04" },
      texte:
        "**Un produit est nul si et seulement si l'un au moins de ses facteurs est nul.**\n\n" +
        "Pour résoudre $(2x - 6)(x + 5) = 0$ : $2x - 6 = 0$ ou $x + 5 = 0$, soit $x = 3$ ou $x = -5$. On écrit $S = \\{-5\\,;3\\}$.\n\n" +
        "Quand l'équation n'est pas déjà un produit égal à zéro, on **regroupe tout du même côté** puis on **factorise** : $x^2 = 7x$ devient $x^2 - 7x = 0$, soit $x(x - 7) = 0$, d'où $x = 0$ ou $x = 7$. On ne divise jamais par $x$ : on perdrait la solution $0$.",
      exemple: {
        enonce: "Résous $3x^2 = 12x$.",
        solution: "$3x^2 - 12x = 0$, soit $3x(x - 4) = 0$ : $x = 0$ ou $x = 4$. $S = \\{0\\,;4\\}$."
      }
    },
    {
      titre: "Signe d'une expression du premier degré",
      video: { titre: "Vidéo de ton prof : variations et signe d'une fonction affine (cours)", youtube: "https://youtu.be/M6V8r6jItOU" },
      texte:
        "L'expression $ax + b$ (avec $a \\neq 0$) s'annule pour $x = -\\dfrac{b}{a}$ et change de signe en cette valeur :\n\n" +
        "- si $a > 0$, elle est **négative avant** la racine et **positive après** ;\n" +
        "- si $a < 0$, elle est **positive avant** la racine et **négative après**.\n\n" +
        "Moyen mnémotechnique : « signe de $a$ après la racine ». On peut aussi résoudre directement l'inéquation : $-3x + 6 > 0$ équivaut à $-3x > -6$, soit $x < 2$ (diviser par un nombre négatif **change le sens** de l'inégalité).",
      exemple: {
        enonce: "Sur quel intervalle $5x - 15$ est-il négatif ou nul ?",
        solution: "$5x - 15 = 0$ pour $x = 3$ ; $a = 5 > 0$ : négatif avant $3$. Donc sur $]-\\infty\\,;3]$."
      }
    },
    {
      titre: "Signe d'un produit : le tableau de signes",
      figure: "qc-cours-signe",
      video: { titre: "Vidéo d'Yvan Monka : dresser un tableau de signes", youtube: "https://youtu.be/50CByVTP4ig" },
      texte:
        "Pour une expression factorisée du second degré comme $(x + 1)(x - 3)$, on dresse un **tableau de signes** :\n\n" +
        "- une ligne par facteur, avec sa racine et son signe de part et d'autre ;\n" +
        "- la dernière ligne donne le signe du produit avec la **règle des signes** ($+ \\times - = -$, $- \\times - = +$).\n\n" +
        "Pour $(x + 1)(x - 3)$ : racines $-1$ et $3$ ; le produit est positif à l'extérieur des racines et négatif entre les deux. Plus généralement, $a(x - x_1)(x - x_2)$ a **le signe de $a$ à l'extérieur des racines** et le signe contraire entre.\n\n" +
        "Ce tableau résout les inéquations : $(x + 1)(x - 3) \\leqslant 0$ a pour solutions $[-1\\,;3]$.",
      exemple: {
        enonce: "Pour quelles valeurs de $x$ a-t-on $-2(x - 1)(x + 4) > 0$ ?",
        solution: "Racines $-4$ et $1$, coefficient $-2 < 0$ : négatif à l'extérieur, positif entre. $S = ]-4\\,;1[$."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "qc-developper", titre: "Développer et réduire un produit", etape: "Calcul littéral", nb: 5 },
    { type: "qc-reduire", titre: "Supprimer des parenthèses, réduire", etape: "Calcul littéral", nb: 5 },
    { type: "qc-factoriser", titre: "Factoriser avec un facteur commun", etape: "Calcul littéral", nb: 5 },
    { type: "qc-identites", titre: "Identités remarquables", etape: "Calcul littéral", nb: 5 },
    { type: "qc-produit-nul", titre: "Équation produit nul", etape: "Équations", nb: 5 },
    { type: "qc-signe-affine", titre: "Signe d'une expression du premier degré", etape: "Signes", nb: 5 },
    { type: "qc-signe-produit", titre: "Signe d'un produit, inéquations", etape: "Signes", nb: 5 },
    { type: "qc-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$3(2x - 5)$ est égal à :", choix: ["$6x - 15$", "$6x - 5$", "$5x - 15$", "$6x + 15$"], bonne: 0, explication: "On multiplie les deux termes par $3$." },
    { question: "$-(x - 4)$ est égal à :", choix: ["$-x + 4$", "$-x - 4$", "$x + 4$", "$x - 4$"], bonne: 0, explication: "Le signe $-$ change le signe de chaque terme." },
    { question: "$(x + 2)(x - 5)$ développé et réduit donne :", choix: ["$x^2 - 3x - 10$", "$x^2 - 10$", "$x^2 + 3x - 10$", "$2x - 3$"], bonne: 0, explication: "$x^2 - 5x + 2x - 10$." },
    { question: "$(x + 3)^2$ est égal à :", choix: ["$x^2 + 6x + 9$", "$x^2 + 9$", "$x^2 + 3x + 9$", "$2x + 6$"], bonne: 0, explication: "$(a + b)^2 = a^2 + 2ab + b^2$." },
    { question: "$(2x - 1)^2$ est égal à :", choix: ["$4x^2 - 4x + 1$", "$4x^2 + 1$", "$2x^2 - 4x + 1$", "$4x^2 - 2x + 1$"], bonne: 0, explication: "$(2x)^2 - 2 \\times 2x \\times 1 + 1^2$." },
    { question: "$2(x + 1) - 3(x - 2)$ réduit donne :", choix: ["$-x + 8$", "$-x - 4$", "$5x - 4$", "$-x + 4$"], bonne: 0, explication: "$2x + 2 - 3x + 6$." },
    { question: "Une factorisation de $5x^2 - 10x$ est :", choix: ["$5x(x - 2)$", "$5(x^2 - 10x)$", "$x(5x - 2)$", "$5x(x - 10)$"], bonne: 0, explication: "Facteur commun $5x$." },
    { question: "$x^2 - 36$ se factorise en :", choix: ["$(x - 6)(x + 6)$", "$(x - 6)^2$", "$(x - 18)(x + 18)$", "$x(x - 36)$"], bonne: 0, explication: "$a^2 - b^2 = (a - b)(a + b)$ avec $b = 6$." },
    { question: "$x^2 + 10x + 25$ se factorise en :", choix: ["$(x + 5)^2$", "$(x + 25)^2$", "$(x - 5)^2$", "$(x + 5)(x - 5)$"], bonne: 0, explication: "$a^2 + 2ab + b^2$ avec $b = 5$." },
    { question: "$(x + 1)(x - 2) + 4(x + 1)$ se factorise en :", choix: ["$(x + 1)(x + 2)$", "$(x + 1)(x - 8)$", "$4(x + 1)(x - 2)$", "$(x + 1)(x + 4)$"], bonne: 0, explication: "$(x + 1)[(x - 2) + 4]$." },
    { question: "Les solutions de $(x - 4)(2x + 6) = 0$ sont :", choix: ["$4$ et $-3$", "$4$ et $3$", "$-4$ et $-3$", "$4$ et $-6$"], bonne: 0, explication: "$x - 4 = 0$ donne $4$ ; $2x + 6 = 0$ donne $-3$." },
    { question: "L'équation $x^2 = 5x$ a pour solutions :", choix: ["$0$ et $5$", "$5$ seulement", "$-5$ et $5$", "$0$ seulement"], bonne: 0, explication: "$x(x - 5) = 0$ : on ne divise pas par $x$." },
    { question: "L'équation $x(x + 3) = 0$ a :", choix: ["deux solutions, $0$ et $-3$", "une solution, $-3$", "une solution, $3$", "aucune solution"], bonne: 0, explication: "$x = 0$ ou $x + 3 = 0$." },
    { question: "$2x - 8$ est positif pour :", choix: ["$x > 4$", "$x < 4$", "$x > -4$", "$x > 8$"], bonne: 0, explication: "$2x - 8 > 0$ équivaut à $x > 4$." },
    { question: "$-3x + 9$ est négatif pour :", choix: ["$x > 3$", "$x < 3$", "$x < -3$", "$x > -3$"], bonne: 0, explication: "Coefficient $-3 < 0$ : négatif après la racine $3$." },
    { question: "$(x - 2)(x - 7)$ est négatif pour :", choix: ["$x \\in ]2\\,;7[$", "$x < 2$", "$x > 7$", "tout $x$"], bonne: 0, explication: "Coefficient $1 > 0$ : signe contraire entre les racines." },
    { question: "$-(x + 1)(x - 4)$ est positif pour :", choix: ["$x \\in ]-1\\,;4[$", "$x < -1$ ou $x > 4$", "$x > 0$", "tout $x$"], bonne: 0, explication: "Coefficient $-1 < 0$ : positif entre les racines." },
    { question: "L'inéquation $(x + 5)(x - 1) \\geqslant 0$ a pour solutions :", choix: ["$]-\\infty\\,;-5] \\cup [1\\,;+\\infty[$", "$[-5\\,;1]$", "$[1\\,;5]$", "$[-1\\,;5]$"], bonne: 0, explication: "Positif à l'extérieur des racines $-5$ et $1$." },
    { question: "Dans un tableau de signes, la dernière ligne s'obtient :", choix: ["avec la règle des signes", "en additionnant les signes", "en recopiant la première ligne", "en prenant toujours $+$"], bonne: 0, explication: "On multiplie les signes des facteurs." },
    { question: "En divisant les deux membres d'une inéquation par $-2$ :", choix: ["on change le sens de l'inégalité", "on garde le sens de l'inégalité", "on obtient une égalité", "on change les signes sans changer le sens"], bonne: 0, explication: "Multiplier ou diviser par un négatif inverse l'ordre." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Développer et réduire",
      etapes: [
        "Repérer le type de produit : $k(a + b)$, $(a + b)(c + d)$ ou une identité remarquable.",
        "Distribuer chaque terme, avec son signe.",
        "Regrouper les $x^2$, les $x$, les constantes.",
        "Vérifier avec une valeur, par exemple $x = 1$, dans l'expression de départ et dans le résultat."
      ],
      exemple: "$(x - 3)(2x + 1) = 2x^2 + x - 6x - 3 = 2x^2 - 5x - 3$ ; pour $x = 1$ : $(-2)(3) = -6$ et $2 - 5 - 3 = -6$."
    },
    {
      titre: "Factoriser",
      etapes: [
        "Chercher un facteur commun (nombre, $x$, ou parenthèse entière).",
        "Sinon, reconnaître une identité remarquable : carré d'une somme, d'une différence, ou $a^2 - b^2$.",
        "Écrire le produit.",
        "Vérifier en redéveloppant."
      ],
      exemple: "$9x^2 - 16 = (3x)^2 - 4^2 = (3x - 4)(3x + 4)$."
    },
    {
      titre: "Résoudre une équation produit nul",
      etapes: [
        "Tout ramener du même côté pour avoir « $\\dots = 0$ ».",
        "Factoriser.",
        "Écrire « facteur $1 = 0$ ou facteur $2 = 0$ » et résoudre chaque équation.",
        "Donner l'ensemble des solutions."
      ],
      exemple: "$2x^2 = 6x$ : $2x(x - 3) = 0$, donc $x = 0$ ou $x = 3$ ; $S = \\{0\\,;3\\}$."
    },
    {
      titre: "Dresser un tableau de signes",
      figure: "qc-cours-signe",
      etapes: [
        "Trouver la racine de chaque facteur et les ranger dans l'ordre croissant.",
        "Une ligne par facteur : signe de $a$ après la racine, signe contraire avant.",
        "Dernière ligne : règle des signes, et $0$ aux racines.",
        "Lire les intervalles demandés (crochets fermés pour $\\leqslant$ et $\\geqslant$)."
      ],
      exemple: "$(x + 2)(3 - x) \\geqslant 0$ : racines $-2$ et $3$, positif entre : $S = [-2\\,;3]$."
    }
  ],
  erreurs: [
    "Oublier de distribuer à **tous** les termes : $3(x + 2) \\neq 3x + 2$.",
    "Oublier le double produit : $(x + 3)^2 \\neq x^2 + 9$.",
    "Ne changer qu'un signe après un $-$ devant une parenthèse.",
    "Diviser par $x$ dans $x^2 = 5x$ et perdre la solution $0$.",
    "Appliquer le produit nul à un produit qui n'est pas égal à $0$ : $(x - 1)(x + 2) = 4$ ne se résout pas ainsi.",
    "Lire la racine de $x + 3$ comme $3$ au lieu de $-3$.",
    "Garder le sens d'une inégalité après une division par un nombre négatif."
  ]
};
