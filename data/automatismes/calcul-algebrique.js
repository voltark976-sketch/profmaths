/*
  AUTOMATISMES · CALCUL ALGÉBRIQUE (CA01 à CA08)
  ----------------------------------------------
  CA01 à CA05 : programme de Seconde. CA06 à CA08 : ajouts de Première.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["auto-calcul-algebrique"] = {
  niveau: "Automatismes",
  numero: null,
  periode: "Seconde et Première",
  titre: "Calcul algébrique",
  accroche: "Remplacer des lettres par des nombres, réduire, développer, factoriser, résoudre, isoler une variable et étudier un signe.",

  playlist: "",
  drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv",
  pdfs: [
    { titre: "Dossier élève de Seconde (parties P3 et P4)", url: "https://drive.google.com/file/d/1vr9e5N38rAOQLWIvUR5suK6l6ciyoLNY/view" }
  ],

  cours: [
    {
      titre: "Calculer avec des lettres (CA01, CA05)",
      texte:
        "- Remplacer une lettre par un nombre : on met le nombre **entre parenthèses** s'il est négatif. Pour $a = -2$ : $3a^2 = 3 \\times (-2)^2 = 12$.\n" +
        "- Priorités : parenthèses, puis puissances, puis multiplications et divisions, puis additions et soustractions.\n" +
        "- Réduire : on regroupe les termes de même nature : $3x + 5 - 7x + 2 = -4x + 7$.\n" +
        "- Appliquer une formule (physique, géométrie, économie) : on remplace chaque lettre par sa valeur, avec la bonne unité.",
      exemple: {
        enonce: "Calculer $E_c = \\dfrac{1}{2} m v^2$ pour $m = 4$ kg et $v = 3$ m/s.",
        solution: "$E_c = \\dfrac{1}{2} \\times 4 \\times 3^2 = 2 \\times 9 = 18$ J."
      }
    },
    {
      titre: "Développer, factoriser (CA02, CA08)",
      texte:
        "- $k(a + b) = ka + kb$ et $(a + b)(c + d) = ac + ad + bc + bd$.\n" +
        "- $-(a - b) = -a + b$ : le signe $-$ change le signe de **chaque** terme.\n" +
        "- Identités remarquables : $(a + b)^2 = a^2 + 2ab + b^2$, $(a - b)^2 = a^2 - 2ab + b^2$, $(a + b)(a - b) = a^2 - b^2$.\n" +
        "- Factoriser : on cherche un **facteur commun**, sinon une identité remarquable. On vérifie en redéveloppant.",
      video: { titre: "Vidéo d'Yvan Monka : factoriser avec une identité remarquable", youtube: "https://youtu.be/T9T4IeYGEe4" },
      exemple: {
        enonce: "Développer $(2x - 3)^2$ et factoriser $5x^2 - 10x$.",
        solution: "$(2x - 3)^2 = 4x^2 - 12x + 9$.\n\n$5x^2 - 10x = 5x(x - 2)$."
      }
    },
    {
      titre: "Équations et inéquations du premier degré (CA03)",
      texte:
        "- On regroupe les $x$ d'un côté et les nombres de l'autre, puis on divise par le coefficient de $x$.\n" +
        "- Dans une inéquation, multiplier ou diviser par un nombre **négatif** change le sens : $-2x \\geqslant 6 \\iff x \\leqslant -3$.\n" +
        "- On peut toujours vérifier une solution en la remplaçant dans l'équation de départ.",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation du premier degré", youtube: "https://youtu.be/quzC5C3a9jM" },
      exemple: {
        enonce: "Résoudre $5 - 3x < 11$.",
        solution: "$-3x < 6 \\iff x > -2$ (on divise par $-3$, le sens change)."
      }
    },
    {
      titre: "Isoler une variable (CA04)",
      texte:
        "- On traite la formule comme une équation dont l'inconnue est la lettre à isoler.\n" +
        "- On enlève d'abord ce qui est **ajouté ou soustrait**, puis ce qui **multiplie ou divise**.\n" +
        "- Exemples : $d = vt \\iff t = \\dfrac{d}{v}$ ; $y = 3x + 5 \\iff x = \\dfrac{y - 5}{3}$.",
      exemple: {
        enonce: "Dans $\\mathcal{A} = \\dfrac{b \\times h}{2}$, exprimer $h$.",
        solution: "$2\\mathcal{A} = b \\times h$, donc $h = \\dfrac{2\\mathcal{A}}{b}$."
      }
    },
    {
      titre: "Équation produit nul (CA06, Première)",
      texte:
        "- Un produit est nul si et seulement si **l'un au moins** de ses facteurs est nul.\n" +
        "- $(ax + b)(cx + d) = 0 \\iff ax + b = 0$ ou $cx + d = 0$.\n" +
        "- Cela ne marche qu'avec un produit égal à **zéro** : $(x - 1)(x + 2) = 5$ ne se résout pas ainsi.",
      exemple: {
        enonce: "Résoudre $(x - 4)(2x + 3) = 0$.",
        solution: "$x - 4 = 0$ ou $2x + 3 = 0$, donc $x = 4$ ou $x = -\\dfrac{3}{2}$.\n\n$S = \\{-\\dfrac{3}{2}\\,;4\\}$"
      }
    },
    {
      titre: "Signe d'une expression (CA07, Première)",
      texte:
        "- $ax + b$ s'annule en $x = -\\dfrac{b}{a}$. Il est du signe de $a$ **à droite** de cette valeur, et du signe contraire à gauche.\n" +
        "- Pour un produit, on fait un **tableau de signes** : une ligne par facteur, puis la règle des signes.\n" +
        "- Un trinôme $a(x - x_1)(x - x_2)$ est du signe de $a$ à l'extérieur des racines et du signe contraire entre elles.",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une inéquation en étudiant le signe d'un trinôme", youtube: "https://youtu.be/AEL4qKKNvp8" },
      exemple: {
        enonce: "Étudier le signe de $(x - 1)(x - 4)$.",
        solution: "Racines $1$ et $4$, et $a = 1 > 0$ : l'expression est positive sur $]-\\infty\\,;1]$ et sur $[4\\,;+\\infty[$, négative sur $[1\\,;4]$."
      }
    }
  ],

  videos: [],

  exercices: [
    { type: "am-substituer", titre: "CA01 · Remplacer des lettres par des nombres", etape: "Programme de Seconde", nb: 5 },
    { type: "am-reduire", titre: "CA01 · Réduire une expression", etape: "Programme de Seconde", nb: 5 },
    { type: "auto-litteral", titre: "CA02 · Développer, factoriser", etape: "Programme de Seconde", nb: 6 },
    { type: "am-premier-degre", titre: "CA03 · Équations et inéquations", etape: "Programme de Seconde", nb: 6 },
    { type: "am-isoler", titre: "CA04 · Isoler une variable", etape: "Programme de Seconde", nb: 5 },
    { type: "am-formule", titre: "CA05 · Appliquer une formule", etape: "Programme de Seconde", nb: 5 },
    { type: "am-produit-nul", titre: "CA06 · Équation produit nul", etape: "Ajouts de Première", nb: 5 },
    { type: "am-signe", titre: "CA07 · Signe d'une expression", etape: "Ajouts de Première", nb: 5 },
    { type: "sd-developper", titre: "CA08 · Développer une forme factorisée", etape: "Ajouts de Première", nb: 5 },
    { type: "am-flash-ca", titre: "Flash : calcul algébrique mélangé", etape: "Défi", nb: 10 }
  ],

  qcm: [
    { question: "CA01 · Pour $a = -3$, $2a^2 =$", choix: ["$-18$", "$18$", "$36$", "$-12$"], bonne: 1, explication: "$2 \\times (-3)^2 = 2 \\times 9 = 18$." },
    { question: "CA01 · $4x - 7 - 6x + 2$ réduit donne :", choix: ["$-2x - 5$", "$10x - 5$", "$-2x - 9$", "$-7x$"], bonne: 0, explication: "$4x - 6x = -2x$ et $-7 + 2 = -5$." },
    { question: "CA02 · $(x + 5)^2 =$", choix: ["$x^2 + 25$", "$x^2 + 10x + 25$", "$x^2 + 5x + 25$", "$2x + 10$"], bonne: 1, explication: "$(a + b)^2 = a^2 + 2ab + b^2$ avec $2ab = 10x$." },
    { question: "CA02 · Une forme factorisée de $4x^2 - 9$ est :", choix: ["$(4x - 3)(4x + 3)$", "$(2x - 3)^2$", "$(2x - 3)(2x + 3)$", "$(2x - 9)(2x + 9)$"], bonne: 2, explication: "$(2x)^2 - 3^2 = (2x - 3)(2x + 3)$." },
    { question: "CA03 · La solution de $3x + 4 = x - 6$ est :", choix: ["$x = -5$", "$x = 5$", "$x = -1$", "$x = -2{,}5$"], bonne: 0, explication: "$2x = -10 \\iff x = -5$." },
    { question: "CA03 · $-4x > 12 \\iff$", choix: ["$x > -3$", "$x < -3$", "$x > 3$", "$x < 3$"], bonne: 1, explication: "On divise par $-4$ : le sens change." },
    { question: "CA04 · Si $P = 2L + 2\\ell$, alors $\\ell =$", choix: ["$\\dfrac{P - 2L}{2}$", "$P - 2L$", "$\\dfrac{P}{2} - 2L$", "$2P - L$"], bonne: 0, explication: "$2\\ell = P - 2L$, puis on divise par $2$." },
    { question: "CA05 · Avec $U = R \\times I$, $R = 220$ Ω et $I = 0{,}5$ A, on obtient $U =$", choix: ["$110$ V", "$440$ V", "$220{,}5$ V", "$11$ V"], bonne: 0, explication: "$220 \\times 0{,}5 = 110$ V." },
    { question: "CA06 · Les solutions de $x(x - 7) = 0$ sont :", choix: ["$7$ seulement", "$0$ et $7$", "$0$ et $-7$", "$-7$ seulement"], bonne: 1, explication: "$x = 0$ ou $x - 7 = 0$." },
    { question: "CA06 · Les solutions de $(2x - 1)(x + 3) = 0$ sont :", choix: ["$\\dfrac{1}{2}$ et $-3$", "$2$ et $3$", "$-\\dfrac{1}{2}$ et $3$", "$1$ et $-3$"], bonne: 0, explication: "$2x - 1 = 0 \\iff x = \\dfrac{1}{2}$, et $x + 3 = 0 \\iff x = -3$." },
    { question: "CA07 · $-2x + 6$ est positif pour :", choix: ["$x \\geqslant 3$", "$x \\leqslant 3$", "$x \\geqslant -3$", "$x \\leqslant -3$"], bonne: 1, explication: "$-2x + 6 \\geqslant 0 \\iff -2x \\geqslant -6 \\iff x \\leqslant 3$." },
    { question: "CA07 · $(x + 2)(x - 5)$ est négatif sur :", choix: ["$[-2\\,;5]$", "$]-\\infty\\,;-2] \\cup [5\\,;+\\infty[$", "$[-5\\,;2]$", "$[2\\,;5]$"], bonne: 0, explication: "Entre les racines $-2$ et $5$, le trinôme est du signe contraire de $a = 1$." }
  ],

  methode: [
    {
      titre: "Résoudre une équation du premier degré",
      etapes: [
        "Développe et réduis chaque membre si besoin.",
        "Regroupe les termes en $x$ dans un membre, les nombres dans l'autre.",
        "Divise par le coefficient de $x$ (dans une inéquation : change le sens s'il est négatif).",
        "Vérifie en remplaçant $x$ par ta solution."
      ],
      exemple: "$2(x - 1) = 5x + 4 \\iff 2x - 2 = 5x + 4 \\iff -3x = 6 \\iff x = -2$. Vérification : $2 \\times (-3) = -6$ et $5 \\times (-2) + 4 = -6$."
    },
    {
      titre: "Dresser un tableau de signes",
      etapes: [
        "Cherche la valeur qui annule chaque facteur.",
        "Range ces valeurs dans l'ordre croissant sur la première ligne.",
        "Pour chaque facteur $ax + b$ : signe de $-a$ à gauche de sa racine, signe de $a$ à droite.",
        "Dernière ligne : règle des signes du produit."
      ],
      exemple: "$(x - 1)(x + 3)$ : racines $-3$ et $1$. Le produit est positif avant $-3$, négatif entre $-3$ et $1$, positif après $1$."
    }
  ],
  erreurs: [
    "$-3^2 = -9$ mais $(-3)^2 = 9$ : mets les nombres négatifs entre parenthèses.",
    "$(a + b)^2 \\neq a^2 + b^2$ : il manque le double produit $2ab$.",
    "$-(x - 3) = -x + 3$, et non $-x - 3$.",
    "Diviser une inéquation par un nombre négatif change son sens.",
    "$3x + 2$ ne se réduit pas en $5x$ : on n'additionne pas un terme en $x$ et un nombre.",
    "La règle du produit nul ne marche que si le produit est égal à $0$."
  ]
};
