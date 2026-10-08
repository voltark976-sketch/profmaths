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
      video: { titre: "Vidéo d'Yvan Monka : appliquer une formule (substitution)", youtube: "https://youtu.be/FOSVfFdDi7w" },
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
      video: { titre: "Vidéo d'Yvan Monka : exprimer une grandeur en fonction d'une autre", youtube: "https://youtu.be/se9gyoJkkJ0" },
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
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation-produit", youtube: "https://youtu.be/4CWk30Ypj04" },
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
    { question: "CA07 · $(x + 2)(x - 5)$ est négatif sur :", choix: ["$[-2\\,;5]$", "$]-\\infty\\,;-2] \\cup [5\\,;+\\infty[$", "$[-5\\,;2]$", "$[2\\,;5]$"], bonne: 0, explication: "Entre les racines $-2$ et $5$, le trinôme est du signe contraire de $a = 1$." },
    { question: "CA01 · Pour $x = -2$, $x^2 - 3x =$", choix: ["$10$", "$-2$", "$-10$", "$2$"], bonne: 0, explication: "$(-2)^2 - 3 \\times (-2) = 4 + 6 = 10$. On met $-2$ entre parenthèses : $(-2)^2 = 4$ et $-3 \\times (-2) = +6$." },
    { question: "CA01 · $5a + 3 - 2a - 8 + a$ réduit donne :", choix: ["$4a - 5$", "$2a - 5$", "$4a + 5$", "$-a$"], bonne: 0, explication: "Termes en $a$ : $5a - 2a + a = 4a$. Nombres : $3 - 8 = -5$. Donc $4a - 5$, qu'on ne peut pas réduire davantage." },
    { question: "CA01 · Pour $a = 2$ et $b = -3$, $ab - b^2 =$", choix: ["$-15$", "$3$", "$-3$", "$15$"], bonne: 0, explication: "$ab = 2 \\times (-3) = -6$ et $b^2 = (-3)^2 = 9$, donc $ab - b^2 = -6 - 9 = -15$." },
    { question: "CA02 · $3(2x - 4) - (x - 5) =$", choix: ["$5x - 7$", "$5x - 17$", "$7x - 7$", "$5x + 7$"], bonne: 0, explication: "$3(2x - 4) = 6x - 12$ et $-(x - 5) = -x + 5$ : le signe $-$ change chaque signe. Total : $6x - 12 - x + 5 = 5x - 7$." },
    { question: "CA02 · Une forme factorisée de $6x^2 + 9x$ est :", choix: ["$3x(2x + 3)$", "$3x(2x + 9)$", "$15x^3$", "$6x(x + 9)$"], bonne: 0, explication: "Le facteur commun est $3x$ : $6x^2 = 3x \\times 2x$ et $9x = 3x \\times 3$. On vérifie : $3x(2x + 3) = 6x^2 + 9x$." },
    { question: "CA02 · $(x - 4)(x + 4) =$", choix: ["$x^2 - 16$", "$x^2 + 16$", "$x^2 - 8x + 16$", "$x^2 - 8$"], bonne: 0, explication: "$(a - b)(a + b) = a^2 - b^2$ avec $a = x$ et $b = 4$ : $x^2 - 16$." },
    { question: "CA03 · La solution de $2(x - 3) = x + 1$ est :", choix: ["$x = 7$", "$x = 4$", "$x = -5$", "$x = 2$"], bonne: 0, explication: "$2x - 6 = x + 1 \\iff 2x - x = 1 + 6 \\iff x = 7$. Vérification : $2 \\times 4 = 8$ et $7 + 1 = 8$." },
    { question: "CA03 · $5 - x \\leqslant 2 \\iff$", choix: ["$x \\geqslant 3$", "$x \\leqslant 3$", "$x \\leqslant -3$", "$x \\geqslant -3$"], bonne: 0, explication: "$5 - x \\leqslant 2 \\iff -x \\leqslant -3 \\iff x \\geqslant 3$ : on multiplie par $-1$, le sens change." },
    { question: "CA03 · Le nombre $-2$ est-il solution de $3x + 10 = 4 - x$ ?", choix: ["Non : le membre de gauche vaut $4$ et celui de droite vaut $6$", "Oui : les deux membres valent $4$", "Oui : les deux membres valent $6$", "On ne peut pas savoir sans résoudre l'équation"], bonne: 0, explication: "On remplace $x$ par $-2$ : $3 \\times (-2) + 10 = 4$ et $4 - (-2) = 6$. Les deux membres sont différents : $-2$ n'est pas solution." },
    { question: "CA04 · Si $A = \\dfrac{b \\times h}{2}$, alors $h =$", choix: ["$\\dfrac{2A}{b}$", "$\\dfrac{A}{2b}$", "$2A - b$", "$\\dfrac{Ab}{2}$"], bonne: 0, explication: "On multiplie par $2$ : $2A = b \\times h$, puis on divise par $b$ : $h = \\dfrac{2A}{b}$." },
    { question: "CA04 · Si $F = 1{,}8C + 32$, alors $C =$", choix: ["$\\dfrac{F - 32}{1{,}8}$", "$\\dfrac{F}{1{,}8} - 32$", "$1{,}8F - 32$", "$\\dfrac{F + 32}{1{,}8}$"], bonne: 0, explication: "On enlève d'abord ce qui est ajouté : $F - 32 = 1{,}8C$. Puis on divise par $1{,}8$ : $C = \\dfrac{F - 32}{1{,}8}$." },
    { question: "CA05 · La location d'un scooter coûte $P = 8d + 5$ euros pour $d$ jours. Pour $d = 3$, $P =$", choix: ["$29$ €", "$24$ €", "$16$ €", "$64$ €"], bonne: 0, explication: "Multiplication d'abord : $8 \\times 3 + 5 = 24 + 5 = 29$ €. $64$ € viendrait du calcul faux $8 \\times (3 + 5)$." },
    { question: "CA05 · L'énergie cinétique vaut $E = \\dfrac{1}{2}mv^2$. Avec $m = 4$ kg et $v = 3$ m/s, $E =$", choix: ["$18$ J", "$36$ J", "$6$ J", "$72$ J"], bonne: 0, explication: "Le carré ne porte que sur $v$ : $E = \\dfrac{1}{2} \\times 4 \\times 3^2 = 2 \\times 9 = 18$ J. $36$ J, c'est l'oubli du $\\dfrac{1}{2}$." },
    { question: "CA06 · Les solutions de $(x + 4)(3x - 6) = 0$ sont :", choix: ["$-4$ et $2$", "$4$ et $-2$", "$-4$ et $6$", "$-4$ et $3$"], bonne: 0, explication: "$x + 4 = 0 \\iff x = -4$, et $3x - 6 = 0 \\iff 3x = 6 \\iff x = 2$." },
    { question: "CA06 · Pour résoudre $x^2 = 4x$, on commence par :", choix: ["écrire $x^2 - 4x = 0$, puis factoriser : $x(x - 4) = 0$", "diviser les deux membres par $x$", "prendre la racine carrée des deux membres", "écrire $x = 0$ ou $x = 4x$"], bonne: 0, explication: "On passe tout du même côté et on factorise, pour utiliser le produit nul : $x = 0$ ou $x = 4$. Diviser par $x$ ferait perdre la solution $0$." },
    { question: "CA06 · Vrai ou faux : $(x - 1)(x + 2) = 5 \\iff x - 1 = 5$ ou $x + 2 = 5$.", choix: ["Faux", "Vrai"], bonne: 0, explication: "La règle ne marche que pour un produit égal à $0$. Contre-exemple : $x = 6$ donne $x - 1 = 5$, mais $(6 - 1)(6 + 2) = 40 \\neq 5$." },
    { question: "CA07 · $3x - 12$ est strictement négatif pour :", choix: ["$x < 4$", "$x > 4$", "$x < -4$", "$x < 9$"], bonne: 0, explication: "$3x - 12$ s'annule en $x = 4$. Le coefficient $3$ est positif : l'expression est négative à gauche de $4$, positive à droite." },
    { question: "CA07 · Le trinôme $-2(x - 1)(x - 3)$ est positif ou nul sur :", choix: ["$[1\\,;3]$", "$]-\\infty\\,;1] \\cup [3\\,;+\\infty[$", "$[-3\\,;-1]$", "$\\mathbb{R}$"], bonne: 0, explication: "Les racines sont $1$ et $3$, et $a = -2 < 0$. Le trinôme est du signe contraire de $a$, donc positif, entre les racines." },
    { question: "CA08 · La forme développée de $2(x - 1)(x + 3)$ est :", choix: ["$2x^2 + 4x - 6$", "$2x^2 + 4x - 3$", "$2x^2 + 2x - 6$", "$x^2 + 2x - 3$"], bonne: 0, explication: "$(x - 1)(x + 3) = x^2 + 3x - x - 3 = x^2 + 2x - 3$, puis on multiplie chaque terme par $2$ : $2x^2 + 4x - 6$." }
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
