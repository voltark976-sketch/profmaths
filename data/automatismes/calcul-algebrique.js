/*
  AUTOMATISMES · CALCUL ALGÉBRIQUE
  --------------------------------
  Liste « Calcul numérique et algébrique » du programme de Seconde 2026 (calcul littéral élémentaire, identités,
  équations, isoler une variable, application numérique d'une formule), à entretenir en Première,
  et ajouts du programme de Première 2026 (produit nul, signe, développer / factoriser / réduire).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["auto-calcul-algebrique"] = {
  niveau: "Automatismes",
  numero: null,
  periode: "Seconde et Première",
  titre: "Calcul algébrique",
  accroche: "Remplacer des lettres par des nombres, calculer avec des lettres, développer, factoriser, résoudre, isoler une variable et étudier un signe.",

  playlist: "https://www.youtube.com/playlist?list=PLVTjofGlms14",
  drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv",
  pdfs: [
    { titre: "Dossier élève de Seconde (parties P3 et P4)", url: "https://drive.google.com/file/d/1vr9e5N38rAOQLWIvUR5suK6l6ciyoLNY/view" }
  ],

  cours: [
    {
      titre: "Calculer avec des lettres, appliquer une formule",
      video: { titre: "Vidéo de ton prof : utiliser des formules dans des situations concrètes", youtube: "https://youtu.be/WOSEvJv7GwQ" },
      texte:
        "- Remplacer une lettre par un nombre : on met le nombre **entre parenthèses** s'il est négatif. Pour $a = -2$ : $3a^2 = 3 \\times (-2)^2 = 12$.\n" +
        "- Priorités : parenthèses, puis puissances, puis multiplications et divisions, puis additions et soustractions.\n" +
        "- Réduire : on regroupe les termes de même nature : $3x + 5 - 7x + 2 = -4x + 7$.\n" +
        "- Appliquer une formule (physique, géométrie, vie courante) : on remplace chaque lettre par sa valeur, avec la bonne unité.",
      exemple: {
        enonce: "Calculer $E_c = \\dfrac{1}{2} m v^2$ pour $m = 4$ kg et $v = 3$ m/s.",
        solution: "$E_c = \\dfrac{1}{2} \\times 4 \\times 3^2 = 2 \\times 9 = 18$ J."
      }
    },
    {
      titre: "Calcul littéral élémentaire",
      video: { titre: "Vidéo de ton prof : supprimer les parenthèses", youtube: "https://youtu.be/FX8UOq0J7uM" },
      texte:
        "- Sommes : $-(a + b) = -a - b$ et $-(a - b) = b - a$.\n" +
        "- Produits : $x = 1 \\times x$, $(-1) \\times a = \\dfrac{a}{-1} = -a$, $0 \\times x = 0$ et $\\dfrac{0}{a} = 0$ (pour $a \\neq 0$).\n" +
        "- Inverses : $a \\times \\dfrac{1}{b} = \\dfrac{a}{b}$ et $\\dfrac{1}{\\frac{1}{a}} = a$.\n" +
        "- Fractions : $\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{ac}{bd}$ et $\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c} = \\dfrac{ad}{bc}$ (lettres non nulles).\n" +
        "- Attention : $x \\times x = x^2$ mais $x + x = 2x$.",
      exemple: {
        enonce: "Pour $x \\neq 0$, simplifier $\\dfrac{3x}{4} \\times \\dfrac{8}{9x}$ et $-(5 - 2x)$.",
        solution: "$\\dfrac{3x \\times 8}{4 \\times 9x} = \\dfrac{24x}{36x} = \\dfrac{2}{3}$.\n\n$-(5 - 2x) = -5 + 2x = 2x - 5$."
      }
    },
    {
      titre: "Développer, factoriser, réduire",
      video: { titre: "Vidéo de ton prof : développer et factoriser avec les identités remarquables", youtube: "https://youtu.be/zrIo7AksY5o" },
      texte:
        "- $k(a + b) = ka + kb$ et $(a + b)(c + d) = ac + ad + bc + bd$.\n" +
        "- Identités remarquables : $(a + b)^2 = a^2 + 2ab + b^2$, $(a - b)^2 = a^2 - 2ab + b^2$, $(a + b)(a - b) = a^2 - b^2$. Le carré ci-contre montre pourquoi le double produit $2ab$ apparaît.\n" +
        "- Factoriser : on cherche un **facteur commun** ($ax^2 + bx = x(ax + b)$, $ax + bx = (a + b)x$), sinon une identité remarquable. On vérifie en redéveloppant.",
      figure: "am-cours-identite",
      exemple: {
        enonce: "Développer $(2x - 3)^2$ et factoriser $5x^2 - 10x$.",
        solution: "$(2x - 3)^2 = 4x^2 - 12x + 9$.\n\n$5x^2 - 10x = 5x(x - 2)$."
      }
    },
    {
      titre: "Équations et inéquations du premier degré",
      video: { titre: "Vidéo de ton prof : équations et inéquations", youtube: "https://youtu.be/2Fv54-YT1lI" },
      texte:
        "- $ax + b = cx + d$ : on regroupe les $x$ d'un côté et les nombres de l'autre, puis on divise par le coefficient de $x$. $ax = b$ (avec $a \\neq 0$) : $x = \\dfrac{b}{a}$.\n" +
        "- $x^2 = a$ : deux solutions $\\sqrt{a}$ et $-\\sqrt{a}$ si $a > 0$, une seule ($0$) si $a = 0$, aucune si $a < 0$.\n" +
        "- Dans une inéquation, multiplier ou diviser par un nombre **négatif** change le sens : $-2x \\geqslant 6 \\iff x \\leqslant -3$. Les solutions forment l'intervalle $]-\\infty\\,;-3]$, représenté ci-contre : le crochet est tourné vers le trait car $-3$ est une solution.\n" +
        "- On peut toujours vérifier une solution en la remplaçant dans l'équation de départ.",
      figure: "am-cours-inequation",
      exemple: {
        enonce: "Résoudre $5 - 3x < 11$.",
        solution: "$-3x < 6 \\iff x > -2$ (on divise par $-3$, le sens change). Les solutions forment l'intervalle $]-2\\,;+\\infty[$ : $-2$ est exclu."
      }
    },
    {
      titre: "Isoler une variable",
      video: { titre: "Vidéo de ton prof : isoler une variable dans une formule", youtube: "https://youtu.be/4h0pTjSfrdE" },
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
      titre: "Équation produit nul (Première)",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation-produit", youtube: "https://youtu.be/4CWk30Ypj04" },
      texte:
        "- Un produit est nul si et seulement si **l'un au moins** de ses facteurs est nul.\n" +
        "- $(ax + b)(cx + d) = 0 \\iff ax + b = 0$ ou $cx + d = 0$.\n" +
        "- Cela ne marche qu'avec un produit égal à **zéro** : $(x - 1)(x + 2) = 5$ ne se résout pas ainsi.\n" +
        "- Graphiquement, les solutions sont les abscisses des points où la courbe coupe l'axe des abscisses : ci-contre, la courbe de $x \\mapsto (x - 1)(x + 2)$ coupe l'axe en $-2$ et en $1$, les solutions de $(x - 1)(x + 2) = 0$.",
      figure: "am-cours-produit-nul",
      exemple: {
        enonce: "Résoudre $(x - 4)(2x + 3) = 0$.",
        solution: "$x - 4 = 0$ ou $2x + 3 = 0$, donc $x = 4$ ou $x = -\\dfrac{3}{2}$.\n\n$S = \\left\\{-\\dfrac{3}{2}\\,;4\\right\\}$"
      }
    },
    {
      titre: "Signe d'une expression (Première)",
      video: { titre: "Vidéo d'Yvan Monka : dresser un tableau de signes", youtube: "https://youtu.be/50CByVTP4ig" },
      texte:
        "- $ax + b$ s'annule en $x = -\\dfrac{b}{a}$. Il est du signe de $a$ **à droite** de cette valeur, et du signe contraire à gauche.\n" +
        "- Pour un produit, on fait un **tableau de signes** : une ligne par facteur, puis la règle des signes. Le tableau ci-contre montre que $(x - 1)(x - 4)$ est positif à l'extérieur de $[1\\,;4]$ et négatif entre $1$ et $4$.\n" +
        "- Une expression factorisée $a(x - x_1)(x - x_2)$ est du signe de $a$ à l'extérieur des racines et du signe contraire entre elles.",
      figure: "am-cours-signe",
      exemple: {
        enonce: "Étudier le signe de $-2(x + 1)(x - 3)$.",
        solution: "Racines $-1$ et $3$, et $a = -2 < 0$ : l'expression est négative sur $]-\\infty\\,;-1]$ et sur $[3\\,;+\\infty[$, positive sur $[-1\\,;3]$ (du signe contraire de $a$ entre les racines)."
      }
    }
  ],

  videos: [
    { titre: "Exercice 7 · Supprimer les parenthèses", type: "Réduire", youtube: "https://youtu.be/FX8UOq0J7uM" },
    { titre: "Exercice 8 · Identités remarquables", type: "Développer", youtube: "https://youtu.be/zrIo7AksY5o" },
    { titre: "Exercice 9 · Forme développée ou factorisée ?", type: "Choisir", youtube: "https://youtu.be/QcZ8u7ROq60" },
    { titre: "Exercice 10 · Équations et inéquations", type: "Résoudre", youtube: "https://youtu.be/2Fv54-YT1lI" },
    { titre: "Exercice 11 · Isoler une variable", type: "Formules", youtube: "https://youtu.be/4h0pTjSfrdE" },
    { titre: "Exercice 12 · Applications numériques et modélisation", type: "Modéliser", youtube: "https://youtu.be/WOSEvJv7GwQ" }
  ],
  videosNote: "Vidéos de ton prof (playlist « Secondes : automatismes ») : les énoncés sont dans le dossier élève ci-dessus.",

  exercices: [
    { type: "am-substituer", titre: "Remplacer des lettres par des nombres", etape: "Automatismes de Seconde", nb: 5 },
    { type: "am-litteral-elem", titre: "Calcul littéral élémentaire", etape: "Automatismes de Seconde", nb: 5 },
    { type: "am-reduire", titre: "Réduire une expression", etape: "Automatismes de Seconde", nb: 5 },
    { type: "auto-litteral", titre: "Identités remarquables et facteur commun", etape: "Automatismes de Seconde", nb: 6 },
    { type: "am-premier-degre", titre: "Équations et inéquations", etape: "Automatismes de Seconde", nb: 6 },
    { type: "am-isoler", titre: "Isoler une variable", etape: "Automatismes de Seconde", nb: 5 },
    { type: "am-formule", titre: "Appliquer une formule", etape: "Automatismes de Seconde", nb: 5 },
    { type: "am-produit-nul", titre: "Équation produit nul", etape: "Automatismes de Première", nb: 5 },
    { type: "am-signe", titre: "Signe d'une expression", etape: "Automatismes de Première", nb: 5 },
    { type: "am-developper", titre: "Développer, factoriser, réduire", etape: "Automatismes de Première", nb: 5 },
    { type: "am-flash-ca", titre: "Flash : calcul algébrique mélangé", etape: "Défi", nb: 10 }
  ],

  qcm: [
    { question: "Pour $a = -3$, $2a^2 =$", choix: ["$-18$", "$18$", "$36$", "$-12$"], bonne: 1, explication: "$2 \\times (-3)^2 = 2 \\times 9 = 18$." },
    { question: "$4x - 7 - 6x + 2$ réduit donne :", choix: ["$-2x - 5$", "$10x - 5$", "$-2x - 9$", "$-7x$"], bonne: 0, explication: "$4x - 6x = -2x$ et $-7 + 2 = -5$." },
    { question: "$(x + 5)^2 =$", choix: ["$x^2 + 25$", "$x^2 + 10x + 25$", "$x^2 + 5x + 25$", "$2x + 10$"], bonne: 1, explication: "$(a + b)^2 = a^2 + 2ab + b^2$ avec $2ab = 10x$." },
    { question: "Une forme factorisée de $4x^2 - 9$ est :", choix: ["$(4x - 3)(4x + 3)$", "$(2x - 3)^2$", "$(2x - 3)(2x + 3)$", "$(2x - 9)(2x + 9)$"], bonne: 2, explication: "$(2x)^2 - 3^2 = (2x - 3)(2x + 3)$." },
    { question: "D'après le carré ci-contre, de côté $a + b$, l'aire $(a + b)^2$ est égale à :", figure: "am-cours-identite", choix: ["$a^2 + 2ab + b^2$", "$a^2 + b^2$", "$a^2 + ab + b^2$", "$2a + 2b$"], bonne: 0, explication: "Le grand carré est formé d'un carré $a^2$, d'un carré $b^2$ et de **deux** rectangles $ab$. On n'oublie pas le double produit." },
    { question: "La solution de $3x + 4 = x - 6$ est :", choix: ["$x = -5$", "$x = 5$", "$x = -1$", "$x = -2{,}5$"], bonne: 0, explication: "$2x = -10 \\iff x = -5$." },
    { question: "$-4x > 12 \\iff$", choix: ["$x > -3$", "$x < -3$", "$x > 3$", "$x < 3$"], bonne: 1, explication: "On divise par $-4$ : le sens change." },
    { question: "Les solutions de $x^2 = 49$ sont :", choix: ["$-7$ et $7$", "$7$ seulement", "$24{,}5$", "il n'y en a pas"], bonne: 0, explication: "$7^2 = 49$ et $(-7)^2 = 49$ : deux solutions." },
    { question: "L'équation $x^2 = -4$ :", choix: ["n'a aucune solution", "a pour solutions $-2$ et $2$", "a pour solution $-2$", "a pour solution $-16$"], bonne: 0, explication: "Un carré est toujours positif ou nul : il ne peut pas valoir $-4$." },
    { question: "Si $P = 2L + 2\\ell$, alors $\\ell =$", choix: ["$\\dfrac{P - 2L}{2}$", "$P - 2L$", "$\\dfrac{P}{2} - 2L$", "$2P - L$"], bonne: 0, explication: "$2\\ell = P - 2L$, puis on divise par $2$." },
    { question: "Avec $U = R \\times I$, $R = 220$ Ω et $I = 0{,}5$ A, on obtient $U =$", choix: ["$110$ V", "$440$ V", "$220{,}5$ V", "$11$ V"], bonne: 0, explication: "$220 \\times 0{,}5 = 110$ V." },
    { question: "Les solutions de $x(x - 7) = 0$ sont :", choix: ["$7$ seulement", "$0$ et $7$", "$0$ et $-7$", "$-7$ seulement"], bonne: 1, explication: "$x = 0$ ou $x - 7 = 0$." },
    { question: "Les solutions de $(2x - 1)(x + 3) = 0$ sont :", choix: ["$\\dfrac{1}{2}$ et $-3$", "$2$ et $3$", "$-\\dfrac{1}{2}$ et $3$", "$1$ et $-3$"], bonne: 0, explication: "$2x - 1 = 0 \\iff x = \\dfrac{1}{2}$, et $x + 3 = 0 \\iff x = -3$." },
    { question: "$-2x + 6$ est positif ou nul pour :", choix: ["$x \\geqslant 3$", "$x \\leqslant 3$", "$x \\geqslant -3$", "$x \\leqslant -3$"], bonne: 1, explication: "$-2x + 6 \\geqslant 0 \\iff -2x \\geqslant -6 \\iff x \\leqslant 3$." },
    { question: "$(x + 2)(x - 5)$ est négatif ou nul sur :", choix: ["$[-2\\,;5]$", "$]-\\infty\\,;-2] \\cup [5\\,;+\\infty[$", "$[-5\\,;2]$", "$[2\\,;5]$"], bonne: 0, explication: "Entre les racines $-2$ et $5$, le trinôme est du signe contraire de $a = 1$." },
    { question: "Pour $x = -2$, $x^2 - 3x =$", choix: ["$10$", "$-2$", "$-10$", "$2$"], bonne: 0, explication: "$(-2)^2 - 3 \\times (-2) = 4 + 6 = 10$. On met $-2$ entre parenthèses : $(-2)^2 = 4$ et $-3 \\times (-2) = +6$." },
    { question: "$5a + 3 - 2a - 8 + a$ réduit donne :", choix: ["$4a - 5$", "$2a - 5$", "$4a + 5$", "$-a$"], bonne: 0, explication: "Termes en $a$ : $5a - 2a + a = 4a$. Nombres : $3 - 8 = -5$. Donc $4a - 5$, qu'on ne peut pas réduire davantage." },
    { question: "Pour $a = 2$ et $b = -3$, $ab - b^2 =$", choix: ["$-15$", "$3$", "$-3$", "$15$"], bonne: 0, explication: "$ab = 2 \\times (-3) = -6$ et $b^2 = (-3)^2 = 9$, donc $ab - b^2 = -6 - 9 = -15$." },
    { question: "$-(4 - x) =$", choix: ["$x - 4$", "$-4 - x$", "$4 + x$", "$-4x$"], bonne: 0, explication: "Le signe $-$ change le signe de chaque terme : $-4 + x = x - 4$." },
    { question: "Pour $a$, $b$, $c$ et $d$ non nuls, $\\dfrac{a}{b} \\div \\dfrac{c}{d} =$", choix: ["$\\dfrac{ad}{bc}$", "$\\dfrac{ac}{bd}$", "$\\dfrac{bc}{ad}$", "$\\dfrac{a + c}{b + d}$"], bonne: 0, explication: "Diviser par $\\dfrac{c}{d}$, c'est multiplier par son inverse $\\dfrac{d}{c}$ : $\\dfrac{a}{b} \\times \\dfrac{d}{c} = \\dfrac{ad}{bc}$." },
    { question: "Pour $x \\neq 0$, $\\dfrac{2x}{3} \\times \\dfrac{9}{4x} =$", choix: ["$\\dfrac{3}{2}$", "$\\dfrac{3}{2}x$", "$\\dfrac{3}{2}x^2$", "$\\dfrac{8}{27}$"], bonne: 0, explication: "$\\dfrac{2x \\times 9}{3 \\times 4x} = \\dfrac{18x}{12x} = \\dfrac{3}{2}$ : on simplifie par $x$." },
    { question: "$3(2x - 4) - (x - 5) =$", choix: ["$5x - 7$", "$5x - 17$", "$7x - 7$", "$5x + 7$"], bonne: 0, explication: "$3(2x - 4) = 6x - 12$ et $-(x - 5) = -x + 5$ : le signe $-$ change chaque signe. Total : $6x - 12 - x + 5 = 5x - 7$." },
    { question: "Une forme factorisée de $6x^2 + 9x$ est :", choix: ["$3x(2x + 3)$", "$3x(2x + 9)$", "$15x^3$", "$6x(x + 9)$"], bonne: 0, explication: "Le facteur commun est $3x$ : $6x^2 = 3x \\times 2x$ et $9x = 3x \\times 3$. On vérifie : $3x(2x + 3) = 6x^2 + 9x$." },
    { question: "$(x - 4)(x + 4) =$", choix: ["$x^2 - 16$", "$x^2 + 16$", "$x^2 - 8x + 16$", "$x^2 - 8$"], bonne: 0, explication: "$(a - b)(a + b) = a^2 - b^2$ avec $a = x$ et $b = 4$ : $x^2 - 16$." },
    { question: "La solution de $2(x - 3) = x + 1$ est :", choix: ["$x = 7$", "$x = 4$", "$x = -5$", "$x = 2$"], bonne: 0, explication: "$2x - 6 = x + 1 \\iff 2x - x = 1 + 6 \\iff x = 7$. Vérification : $2 \\times 4 = 8$ et $7 + 1 = 8$." },
    { question: "$5 - x \\leqslant 2 \\iff$", choix: ["$x \\geqslant 3$", "$x \\leqslant 3$", "$x \\leqslant -3$", "$x \\geqslant -3$"], bonne: 0, explication: "$5 - x \\leqslant 2 \\iff -x \\leqslant -3 \\iff x \\geqslant 3$ : on multiplie par $-1$, le sens change." },
    { question: "Quel ensemble est représenté sur la droite graduée ci-contre ?", figure: "am-qcm-intervalle", choix: ["$]-2\\,;+\\infty[$", "$[-2\\,;+\\infty[$", "$]-\\infty\\,;-2[$", "$]-\\infty\\,;-2]$"], bonne: 0, explication: "Le trait part de $-2$ vers la droite, et le crochet en $-2$ est tourné vers l'extérieur : $-2$ est exclu. C'est $]-2\\,;+\\infty[$, l'ensemble des solutions de $x > -2$." },
    { question: "Le nombre $-2$ est-il solution de $3x + 10 = 4 - x$ ?", choix: ["Non : le membre de gauche vaut $4$ et celui de droite vaut $6$", "Oui : les deux membres valent $4$", "Oui : les deux membres valent $6$", "On ne peut pas savoir sans résoudre l'équation"], bonne: 0, explication: "On remplace $x$ par $-2$ : $3 \\times (-2) + 10 = 4$ et $4 - (-2) = 6$. Les deux membres sont différents : $-2$ n'est pas solution." },
    { question: "Si $A = \\dfrac{b \\times h}{2}$, alors $h =$", choix: ["$\\dfrac{2A}{b}$", "$\\dfrac{A}{2b}$", "$2A - b$", "$\\dfrac{Ab}{2}$"], bonne: 0, explication: "On multiplie par $2$ : $2A = b \\times h$, puis on divise par $b$ : $h = \\dfrac{2A}{b}$." },
    { question: "Si $F = 1{,}8C + 32$, alors $C =$", choix: ["$\\dfrac{F - 32}{1{,}8}$", "$\\dfrac{F}{1{,}8} - 32$", "$1{,}8F - 32$", "$\\dfrac{F + 32}{1{,}8}$"], bonne: 0, explication: "On enlève d'abord ce qui est ajouté : $F - 32 = 1{,}8C$. Puis on divise par $1{,}8$ : $C = \\dfrac{F - 32}{1{,}8}$." },
    { question: "À Mamoudzou, la location d'un scooter coûte $P = 8d + 5$ euros pour $d$ jours. Pour $d = 3$, $P =$", choix: ["$29$ €", "$24$ €", "$16$ €", "$64$ €"], bonne: 0, explication: "Multiplication d'abord : $8 \\times 3 + 5 = 24 + 5 = 29$ €. $64$ € viendrait du calcul faux $8 \\times (3 + 5)$." },
    { question: "L'énergie cinétique vaut $E = \\dfrac{1}{2}mv^2$. Avec $m = 4$ kg et $v = 3$ m/s, $E =$", choix: ["$18$ J", "$36$ J", "$6$ J", "$72$ J"], bonne: 0, explication: "Le carré ne porte que sur $v$ : $E = \\dfrac{1}{2} \\times 4 \\times 3^2 = 2 \\times 9 = 18$ J. $36$ J, c'est l'oubli du $\\dfrac{1}{2}$." },
    { question: "Les solutions de $(x + 4)(3x - 6) = 0$ sont :", choix: ["$-4$ et $2$", "$4$ et $-2$", "$-4$ et $6$", "$-4$ et $3$"], bonne: 0, explication: "$x + 4 = 0 \\iff x = -4$, et $3x - 6 = 0 \\iff 3x = 6 \\iff x = 2$." },
    { question: "Pour résoudre $x^2 = 4x$, on commence par :", choix: ["écrire $x^2 - 4x = 0$, puis factoriser : $x(x - 4) = 0$", "diviser les deux membres par $x$", "prendre la racine carrée des deux membres", "écrire $x = 0$ ou $x = 4x$"], bonne: 0, explication: "On passe tout du même côté et on factorise, pour utiliser le produit nul : $x = 0$ ou $x = 4$. Diviser par $x$ ferait perdre la solution $0$." },
    { question: "Peut-on écrire $(x - 1)(x + 2) = 5 \\iff x - 1 = 5$ ou $x + 2 = 5$ ?", choix: ["Non : la règle du produit nul ne marche que si le produit vaut $0$", "Oui : c'est la règle du produit nul", "Oui, mais seulement pour $x > 0$", "Non : il faudrait écrire $x - 1 = 5$ et $x + 2 = 5$"], bonne: 0, explication: "La règle ne marche que pour un produit égal à $0$. Contre-exemple : $x = 6$ donne $x - 1 = 5$, mais $(6 - 1)(6 + 2) = 40 \\neq 5$." },
    { question: "$3x - 12$ est strictement négatif pour :", choix: ["$x < 4$", "$x > 4$", "$x < -4$", "$x < 9$"], bonne: 0, explication: "$3x - 12$ s'annule en $x = 4$. Le coefficient $3$ est positif : l'expression est négative à gauche de $4$, positive à droite." },
    { question: "L'expression $-2(x - 1)(x - 3)$ est positive ou nulle sur :", choix: ["$[1\\,;3]$", "$]-\\infty\\,;1] \\cup [3\\,;+\\infty[$", "$[-3\\,;-1]$", "$\\mathbb{R}$"], bonne: 0, explication: "Les racines sont $1$ et $3$, et $a = -2 < 0$. L'expression est du signe contraire de $a$, donc positive, entre les racines." },
    { question: "D'après ce tableau de signes, sur quel ensemble $(x - 1)(x + 3)$ est-il strictement négatif ?", figure: "am-meth-signe", choix: ["$]-3\\,;1[$", "$]-\\infty\\,;-3[ \\cup ]1\\,;+\\infty[$", "$]-1\\,;3[$", "$[-3\\,;1]$"], bonne: 0, explication: "La dernière ligne porte le signe $-$ entre $-3$ et $1$. Les valeurs $-3$ et $1$ sont exclues car le produit y vaut $0$." },
    { question: "La forme développée de $2(x - 1)(x + 3)$ est :", choix: ["$2x^2 + 4x - 6$", "$2x^2 + 4x - 3$", "$2x^2 + 2x - 6$", "$x^2 + 2x - 3$"], bonne: 0, explication: "$(x - 1)(x + 3) = x^2 + 3x - x - 3 = x^2 + 2x - 3$, puis on multiplie chaque terme par $2$ : $2x^2 + 4x - 6$." }
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
      figure: "am-meth-signe",
      exemple: "$(x - 1)(x + 3)$ : racines $-3$ et $1$. Le produit est positif avant $-3$, négatif entre $-3$ et $1$, positif après $1$."
    }
  ],
  erreurs: [
    "$-3^2 = -9$ mais $(-3)^2 = 9$ : mets les nombres négatifs entre parenthèses.",
    "$(a + b)^2 \\neq a^2 + b^2$ : il manque le double produit $2ab$.",
    "$-(x - 3) = -x + 3$, et non $-x - 3$.",
    "$x \\times x = x^2$, alors que $x + x = 2x$.",
    "Diviser une inéquation par un nombre négatif change son sens.",
    "$3x + 2$ ne se réduit pas en $5x$ : on n'additionne pas un terme en $x$ et un nombre.",
    "$x^2 = 9$ a **deux** solutions : $3$ et $-3$.",
    "La règle du produit nul ne marche que si le produit est égal à $0$."
  ]
};
