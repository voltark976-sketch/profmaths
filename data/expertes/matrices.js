/*
  CHAPITRE : Terminale maths expertes — Matrices et calcul matriciel
  -------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Une matrice s'écrit $\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$ (« & » entre les colonnes, « \\\\ » entre les lignes).
  Programme officiel de maths expertes (BO spécial n° 8 du 25 juillet 2019), « Graphes et matrices » :
  matrices, opérations, inverse, puissances ; représentations matricielles (systèmes linéaires, transformations géométriques).
  Les graphes sont au chapitre 10, les suites de matrices et les chaînes de Markov au chapitre 11.
  video : vidéos d'Yvan Monka. Générateurs : préfixe xm- dans assets/exercices-expertes.js ; figures "xm-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["expertes-matrices"] = {
  niveau: "Terminale maths expertes",
  numero: 9,
  titre: "Matrices et calcul matriciel",
  accroche: "Des tableaux de nombres qui se multiplient « ligne par colonne » : un outil pour les systèmes, la géométrie et les suites.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : matrices, partie 1 (PDF)", url: "https://www.maths-et-tiques.fr/telech/20mat1.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Qu'est-ce qu'une matrice ?",
      video: { titre: "Vidéo d'Yvan Monka : calculer la somme de deux matrices", youtube: "https://youtu.be/MMBfOom_mac" },
      texte:
        "Une **matrice** de taille $n \\times p$ est un tableau de nombres réels à $n$ lignes et $p$ colonnes. On note $a_{ij}$ le coefficient de la ligne $i$ et de la colonne $j$.\n\n" +
        "- Si $n = p$, la matrice est **carrée** d'ordre $n$.\n" +
        "- Une matrice à une seule ligne est une **matrice ligne**, à une seule colonne une **matrice colonne**.\n" +
        "- La matrice **identité** $I_n$ a des $1$ sur la diagonale et des $0$ ailleurs. La matrice **nulle** n'a que des $0$.\n\n" +
        "Exemple : $A = \\begin{pmatrix} 2 & -1 & 0 \\\\ 5 & 3 & 7 \\end{pmatrix}$ est de taille $2 \\times 3$ et $a_{21} = 5$.\n\n" +
        "**Somme** (même taille) et **produit par un réel** se font **coefficient par coefficient** : $(A + B)_{ij} = a_{ij} + b_{ij}$ et $(kA)_{ij} = k\\,a_{ij}$.",
      exemple: {
        enonce: "Avec $A = \\begin{pmatrix} 1 & 2 \\\\ 0 & -3 \\end{pmatrix}$ et $B = \\begin{pmatrix} 4 & -1 \\\\ 2 & 5 \\end{pmatrix}$, calcule $2A - B$.",
        solution: "$2A - B = \\begin{pmatrix} 2 - 4 & 4 + 1 \\\\ 0 - 2 & -6 - 5 \\end{pmatrix} = \\begin{pmatrix} -2 & 5 \\\\ -2 & -11 \\end{pmatrix}$."
      }
    },
    {
      titre: "Le produit de deux matrices",
      figure: "xm-cours-produit",
      video: { titre: "Vidéo d'Yvan Monka : calculer le produit de deux matrices carrées", youtube: "https://youtu.be/ZOtgQxB5NXI" },
      texte:
        "Si $A$ est de taille $n \\times p$ et $B$ de taille $p \\times q$ (autant de **colonnes** pour $A$ que de **lignes** pour $B$), le produit $AB$ est la matrice $n \\times q$ telle que :\n\n" +
        "$(AB)_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + \\dots + a_{ip}b_{pj}$\n\n" +
        "C'est le produit de la **ligne $i$ de $A$** par la **colonne $j$ de $B$**.\n\n" +
        "- Le produit est **associatif** : $(AB)C = A(BC)$, et distributif sur l'addition.\n" +
        "- Il n'est **pas commutatif** : en général $AB \\neq BA$.\n" +
        "- $AI_n = I_nA = A$ pour une matrice carrée $A$ d'ordre $n$.\n" +
        "- On peut avoir $AB = 0$ avec $A \\neq 0$ et $B \\neq 0$.",
      exemple: {
        enonce: "Calcule $AB$ avec $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$ et $B = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$, puis $BA$.",
        solution: "$AB = \\begin{pmatrix} 1 \\times 0 + 2 \\times 1 & 1 \\times 1 + 2 \\times 0 \\\\ 3 \\times 0 + 4 \\times 1 & 3 \\times 1 + 4 \\times 0 \\end{pmatrix} = \\begin{pmatrix} 2 & 1 \\\\ 4 & 3 \\end{pmatrix}$.\n\n$BA = \\begin{pmatrix} 3 & 4 \\\\ 1 & 2 \\end{pmatrix}$ : $AB \\neq BA$."
      }
    },
    {
      titre: "Puissances d'une matrice carrée",
      video: { titre: "Vidéo d'Yvan Monka : calculer une puissance d'une matrice", youtube: "https://youtu.be/r81z2eLd07w" },
      texte:
        "Pour une matrice carrée $A$ et un entier $n \\geqslant 1$ : $A^n = A \\times A \\times \\dots \\times A$ ($n$ facteurs), et $A^0 = I$.\n\n" +
        "- $A^2 = A \\times A$ : ce n'est **pas** le carré de chaque coefficient.\n" +
        "- Pour une matrice **diagonale**, on élève chaque coefficient diagonal à la puissance $n$ : $\\begin{pmatrix} a & 0 \\\\ 0 & b \\end{pmatrix}^n = \\begin{pmatrix} a^n & 0 \\\\ 0 & b^n \\end{pmatrix}$.\n" +
        "- En général, on calcule $A^2$, $A^3$, on **conjecture** la forme de $A^n$, puis on la **démontre par récurrence**.\n" +
        "- La calculatrice calcule les puissances de matrices.",
      exemple: {
        enonce: "Avec $A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$, conjecture puis démontre l'expression de $A^n$.",
        solution: "$A^2 = \\begin{pmatrix} 1 & 4 \\\\ 0 & 1 \\end{pmatrix}$, $A^3 = \\begin{pmatrix} 1 & 6 \\\\ 0 & 1 \\end{pmatrix}$ : on conjecture $A^n = \\begin{pmatrix} 1 & 2n \\\\ 0 & 1 \\end{pmatrix}$.\n\nSi c'est vrai au rang $n$ : $A^{n+1} = A^nA = \\begin{pmatrix} 1 & 2n + 2 \\\\ 0 & 1 \\end{pmatrix}$, c'est vrai au rang $n + 1$."
      }
    },
    {
      titre: "Matrice inverse",
      video: { titre: "Vidéo d'Yvan Monka : calculer l'inverse d'une matrice", youtube: "https://youtu.be/4QMzwWY6T7g" },
      texte:
        "Une matrice carrée $A$ d'ordre $n$ est **inversible** s'il existe une matrice $B$ telle que $AB = BA = I_n$. Alors $B$ est unique : c'est l'**inverse** de $A$, notée $A^{-1}$.\n\n" +
        "**Cas $2 \\times 2$.** $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ est inversible si et seulement si $\\det(A) = ad - bc \\neq 0$, et alors :\n\n" +
        "$A^{-1} = \\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$\n\n" +
        "On échange les coefficients de la diagonale, on change le signe des deux autres, et on divise par le déterminant.\n\n" +
        "Pour une matrice $3 \\times 3$, on utilise la calculatrice, ou on vérifie qu'une matrice $B$ donnée vérifie $AB = I_3$.",
      exemple: {
        enonce: "Montre que $A = \\begin{pmatrix} 3 & 5 \\\\ 1 & 2 \\end{pmatrix}$ est inversible et calcule $A^{-1}$.",
        solution: "$\\det(A) = 3 \\times 2 - 5 \\times 1 = 1 \\neq 0$, donc $A$ est inversible et $A^{-1} = \\begin{pmatrix} 2 & -5 \\\\ -1 & 3 \\end{pmatrix}$.\n\nVérification : $AA^{-1} = \\begin{pmatrix} 6 - 5 & -15 + 15 \\\\ 2 - 2 & -5 + 6 \\end{pmatrix} = I_2$."
      }
    },
    {
      titre: "Résoudre un système linéaire",
      video: { titre: "Vidéo d'Yvan Monka : résoudre un système à l'aide de matrices", youtube: "https://youtu.be/vhmGn_x7UZ4" },
      texte:
        "Le système $\\begin{cases} ax + by = e \\\\ cx + dy = f \\end{cases}$ s'écrit $AX = B$ avec $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, $X = \\begin{pmatrix} x \\\\ y \\end{pmatrix}$ et $B = \\begin{pmatrix} e \\\\ f \\end{pmatrix}$.\n\n" +
        "Si $A$ est inversible, on multiplie **à gauche** par $A^{-1}$ : $X = A^{-1}B$. Le système a alors une **unique** solution.\n\n" +
        "Cela marche de la même façon pour $3$ équations à $3$ inconnues, avec la calculatrice pour $A^{-1}$. C'est ainsi qu'on trouve, par exemple, la parabole passant par trois points (interpolation).",
      exemple: {
        enonce: "Résous $\\begin{cases} 3x + 5y = 1 \\\\ x + 2y = 0 \\end{cases}$.",
        solution: "$A = \\begin{pmatrix} 3 & 5 \\\\ 1 & 2 \\end{pmatrix}$ a pour inverse $\\begin{pmatrix} 2 & -5 \\\\ -1 & 3 \\end{pmatrix}$, donc $X = A^{-1}\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix}$ : $x = 2$, $y = -1$."
      }
    },
    {
      titre: "Transformations géométriques du plan",
      figure: "xm-cours-rotation",
      video: { titre: "Vidéo d'Yvan Monka : calculer le produit d'une matrice carrée par une matrice colonne", youtube: "https://youtu.be/nW8XRIhlq0Q" },
      texte:
        "Dans un repère orthonormé, de nombreuses transformations s'écrivent $\\begin{pmatrix} x' \\\\ y' \\end{pmatrix} = M\\begin{pmatrix} x \\\\ y \\end{pmatrix}$ :\n\n" +
        "- rotation de centre $O$ et d'angle $\\theta$ : $M = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}$ (c'est la multiplication par $e^{i\\theta}$ des complexes) ;\n" +
        "- symétrie par rapport à l'axe des abscisses : $\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$ ;\n" +
        "- homothétie de centre $O$ et de rapport $k$ : $\\begin{pmatrix} k & 0 \\\\ 0 & k \\end{pmatrix}$.\n\n" +
        "Enchaîner deux transformations revient à **multiplier leurs matrices** (la seconde à gauche).\n\n" +
        "**Pour aller plus loin** : le chiffrement de Hill code des paires de lettres en les multipliant par une matrice $2 \\times 2$, modulo $26$.",
      exemple: {
        enonce: "Quelle est l'image de $M(3\\,;1)$ par la rotation de centre $O$ et d'angle $\\dfrac{\\pi}{2}$ ?",
        solution: "$\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 3 \\end{pmatrix}$ : l'image est $M'(-1\\,;3)$."
      }
    }
  ],

  videos: [
    { type: "Méthode", titre: "Vérifier si une matrice est inversible", youtube: "https://youtu.be/pHIepnbQaCQ" },
    { type: "Méthode", titre: "Résoudre une équation matricielle", youtube: "https://youtu.be/4-7l11_p7zM" },
    { type: "Calculatrice", titre: "Calculs de matrices avec une TI", youtube: "https://youtu.be/8c4WDe1PSZk" },
    { type: "Calculatrice", titre: "Calculs de matrices avec une Casio", youtube: "https://youtu.be/zq5OHgdTw34" }
  ],
  videosNote: "Méthodes et tutoriels calculatrice en vidéo par Yvan Monka.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "xm-operations", titre: "Somme et produit par un réel", etape: "Opérations", nb: 4 },
    { type: "xm-dimension", titre: "Taille d'un produit", etape: "Opérations", nb: 4 },
    { type: "xm-produit", titre: "Produit de matrices", etape: "Opérations", nb: 5 },
    { type: "xm-puissance", titre: "Puissances", etape: "Puissances et inverse", nb: 5 },
    { type: "xm-det", titre: "Inversible ou non ?", etape: "Puissances et inverse", nb: 4 },
    { type: "xm-inverse", titre: "Calculer une inverse", etape: "Puissances et inverse", nb: 5 },
    { type: "xm-systeme", titre: "Systèmes linéaires", etape: "Applications", nb: 5 },
    { type: "xm-transformation", titre: "Transformations du plan", etape: "Applications", nb: 4 },
    { type: "xm-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "La matrice $\\begin{pmatrix} 1 & 0 & 4 \\\\ 2 & -1 & 3 \\end{pmatrix}$ est de taille :", choix: ["$2 \\times 3$", "$3 \\times 2$", "$6$", "$2 \\times 2$"], bonne: 0, explication: "On donne d'abord le nombre de lignes ($2$), puis le nombre de colonnes ($3$)." },
    { question: "Pour $A = \\begin{pmatrix} 5 & -2 \\\\ 7 & 1 \\end{pmatrix}$, le coefficient $a_{21}$ vaut :", choix: ["$7$", "$-2$", "$5$", "$1$"], bonne: 0, explication: "$a_{21}$ est sur la ligne $2$ et la colonne $1$." },
    { question: "$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}$ est égal à :", choix: ["$\\begin{pmatrix} -1 \\\\ -1 \\end{pmatrix}$", "$\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$", "$\\begin{pmatrix} 1 & -2 \\\\ 3 & -4 \\end{pmatrix}$", "$\\begin{pmatrix} -2 \\\\ -2 \\end{pmatrix}$"], bonne: 0, explication: "$1 \\times 1 + 2 \\times (-1) = -1$ et $3 \\times 1 + 4 \\times (-1) = -1$." },
    { question: "Le produit d'une matrice $3 \\times 2$ par une matrice $2 \\times 4$ est de taille :", choix: ["$3 \\times 4$", "$2 \\times 2$", "$4 \\times 3$", "il n'existe pas"], bonne: 0, explication: "Les $2$ colonnes de la première correspondent aux $2$ lignes de la seconde ; le résultat a $3$ lignes et $4$ colonnes." },
    { question: "Le produit d'une matrice $2 \\times 3$ par une matrice $2 \\times 3$ :", choix: ["n'existe pas", "est de taille $2 \\times 3$", "est de taille $3 \\times 3$", "est de taille $2 \\times 2$"], bonne: 0, explication: "La première a $3$ colonnes, la seconde $2$ lignes : on ne peut pas faire « ligne par colonne »." },
    { question: "Pour deux matrices carrées $A$ et $B$ de même ordre, on a en général :", choix: ["$AB \\neq BA$", "$AB = BA$", "$AB = A + B$", "$AB = 0$"], bonne: 0, explication: "Le produit de matrices n'est pas commutatif." },
    { question: "Que vaut $\\begin{pmatrix} 2 & 0 \\\\ 0 & -1 \\end{pmatrix}^5$ ?", choix: ["$\\begin{pmatrix} 32 & 0 \\\\ 0 & -1 \\end{pmatrix}$", "$\\begin{pmatrix} 10 & 0 \\\\ 0 & -5 \\end{pmatrix}$", "$\\begin{pmatrix} 32 & 0 \\\\ 0 & 1 \\end{pmatrix}$", "$\\begin{pmatrix} 2 & 0 \\\\ 0 & -1 \\end{pmatrix}$"], bonne: 0, explication: "Matrice diagonale : $2^5 = 32$ et $(-1)^5 = -1$." },
    { question: "Pour $A = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$, que vaut $A^2$ ?", choix: ["$\\begin{pmatrix} 2 & 2 \\\\ 2 & 2 \\end{pmatrix}$", "$\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$", "$\\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix}$", "$\\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix}$"], bonne: 0, explication: "Chaque coefficient vaut $1 \\times 1 + 1 \\times 1 = 2$." },
    { question: "La matrice $\\begin{pmatrix} 2 & 6 \\\\ 1 & 3 \\end{pmatrix}$ est-elle inversible ?", choix: ["Non, car $2 \\times 3 - 6 \\times 1 = 0$", "Oui, car aucun coefficient n'est nul", "Oui, son inverse est $\\begin{pmatrix} \\frac{1}{2} & \\frac{1}{6} \\\\ 1 & \\frac{1}{3} \\end{pmatrix}$", "On ne peut pas savoir"], bonne: 0, explication: "Son déterminant $ad - bc$ est nul : elle n'est pas inversible." },
    { question: "L'inverse de $\\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$ est :", choix: ["$\\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$", "$\\begin{pmatrix} 3 & 1 \\\\ 5 & 2 \\end{pmatrix}$", "$\\begin{pmatrix} -3 & 1 \\\\ 5 & -2 \\end{pmatrix}$", "$\\begin{pmatrix} \\frac{1}{2} & 1 \\\\ \\frac{1}{5} & \\frac{1}{3} \\end{pmatrix}$"], bonne: 0, explication: "$\\det = 6 - 5 = 1$, donc l'inverse est $\\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$." },
    { question: "Si $A$ est inversible, la solution de $AX = B$ est :", choix: ["$X = A^{-1}B$", "$X = BA^{-1}$", "$X = \\dfrac{B}{A}$", "$X = B - A$"], bonne: 0, explication: "On multiplie à gauche par $A^{-1}$ : $A^{-1}AX = A^{-1}B$, soit $X = A^{-1}B$. L'ordre compte." },
    { question: "Le système $\\begin{cases} x + 2y = 5 \\\\ 3x - y = 1 \\end{cases}$ s'écrit $AX = B$ avec $A$ égale à :", choix: ["$\\begin{pmatrix} 1 & 2 \\\\ 3 & -1 \\end{pmatrix}$", "$\\begin{pmatrix} 1 & 3 \\\\ 2 & -1 \\end{pmatrix}$", "$\\begin{pmatrix} 5 \\\\ 1 \\end{pmatrix}$", "$\\begin{pmatrix} 1 & 2 & 5 \\\\ 3 & -1 & 1 \\end{pmatrix}$"], bonne: 0, explication: "Chaque ligne de $A$ contient les coefficients de $x$ et de $y$ d'une équation." },
    { question: "La matrice $\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$ est celle de :", choix: ["la rotation de centre $O$ et d'angle $\\dfrac{\\pi}{2}$", "la symétrie de centre $O$", "la symétrie d'axe $(Ox)$", "l'homothétie de rapport $-1$"], bonne: 0, explication: "Avec $\\theta = \\dfrac{\\pi}{2}$ : $\\cos\\theta = 0$ et $\\sin\\theta = 1$." },
    { question: "La matrice de l'homothétie de centre $O$ et de rapport $3$ est :", choix: ["$\\begin{pmatrix} 3 & 0 \\\\ 0 & 3 \\end{pmatrix}$", "$\\begin{pmatrix} 3 & 3 \\\\ 3 & 3 \\end{pmatrix}$", "$\\begin{pmatrix} 0 & 3 \\\\ 3 & 0 \\end{pmatrix}$", "$\\begin{pmatrix} 1 & 0 \\\\ 0 & 3 \\end{pmatrix}$"], bonne: 0, explication: "$x' = 3x$ et $y' = 3y$." },
    { question: "$I_2 \\times \\begin{pmatrix} 4 & 7 \\\\ -1 & 2 \\end{pmatrix}$ est égal à :", choix: ["$\\begin{pmatrix} 4 & 7 \\\\ -1 & 2 \\end{pmatrix}$", "$\\begin{pmatrix} 4 & 0 \\\\ 0 & 2 \\end{pmatrix}$", "$\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$", "$\\begin{pmatrix} 5 & 7 \\\\ -1 & 3 \\end{pmatrix}$"], bonne: 0, explication: "$I_2$ est l'élément neutre de la multiplication." },
    { question: "On peut avoir $AB = 0$ avec $A \\neq 0$ et $B \\neq 0$ :", choix: ["oui, par exemple $\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}^2 = 0$", "non, jamais", "seulement si $A = B$", "seulement pour des matrices $3 \\times 3$"], bonne: 0, explication: "Contrairement aux nombres réels, un produit de matrices non nulles peut être nul." },
    { question: "Pour $A = \\begin{pmatrix} 1 & 3 \\\\ 0 & 1 \\end{pmatrix}$, on a $A^n$ égal à :", choix: ["$\\begin{pmatrix} 1 & 3n \\\\ 0 & 1 \\end{pmatrix}$", "$\\begin{pmatrix} 1 & 3^n \\\\ 0 & 1 \\end{pmatrix}$", "$\\begin{pmatrix} n & 3n \\\\ 0 & n \\end{pmatrix}$", "$\\begin{pmatrix} 1 & 3 \\\\ 0 & 1 \\end{pmatrix}$"], bonne: 0, explication: "$A^2 = \\begin{pmatrix} 1 & 6 \\\\ 0 & 1 \\end{pmatrix}$, $A^3 = \\begin{pmatrix} 1 & 9 \\\\ 0 & 1 \\end{pmatrix}$… puis récurrence." },
    { question: "Pour quelle valeur de $k$ la matrice $\\begin{pmatrix} k & 4 \\\\ 2 & 2 \\end{pmatrix}$ n'est-elle pas inversible ?", choix: ["$4$", "$2$", "$8$", "$0$"], bonne: 0, explication: "$\\det = 2k - 8 = 0$ pour $k = 4$." },
    { question: "Si $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$, alors $3A$ vaut :", choix: ["$\\begin{pmatrix} 3 & 6 \\\\ 9 & 12 \\end{pmatrix}$", "$\\begin{pmatrix} 3 & 2 \\\\ 3 & 4 \\end{pmatrix}$", "$\\begin{pmatrix} 4 & 5 \\\\ 6 & 7 \\end{pmatrix}$", "$\\begin{pmatrix} 1 & 8 \\\\ 27 & 64 \\end{pmatrix}$"], bonne: 0, explication: "On multiplie chaque coefficient par $3$." },
    { question: "Enchaîner la transformation de matrice $M$ puis celle de matrice $N$ revient à utiliser la matrice :", choix: ["$NM$", "$MN$", "$M + N$", "$M^{-1}N$"], bonne: 0, explication: "On applique d'abord $M$ à la colonne $X$, puis $N$ : $N(MX) = (NM)X$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer un produit de matrices",
      figure: "xm-cours-produit",
      etapes: [
        "Vérifier que le nombre de colonnes de $A$ est égal au nombre de lignes de $B$.",
        "Pour le coefficient $(i\\,;j)$ : prendre la ligne $i$ de $A$ et la colonne $j$ de $B$.",
        "Multiplier les termes deux à deux et additionner.",
        "Le résultat a autant de lignes que $A$ et autant de colonnes que $B$."
      ],
      exemple: "$\\begin{pmatrix} 2 & 1 \\end{pmatrix}\\begin{pmatrix} 3 \\\\ -4 \\end{pmatrix} = 2 \\times 3 + 1 \\times (-4) = 2$ (matrice $1 \\times 1$)."
    },
    {
      titre: "Inverser une matrice $2 \\times 2$",
      etapes: [
        "Calculer $\\det(A) = ad - bc$.",
        "S'il est nul : $A$ n'est pas inversible.",
        "Sinon : échanger $a$ et $d$, changer le signe de $b$ et $c$, diviser par $ad - bc$.",
        "Vérifier que $AA^{-1} = I_2$."
      ],
      exemple: "$A = \\begin{pmatrix} 4 & 2 \\\\ 1 & 1 \\end{pmatrix}$ : $\\det = 2$, $A^{-1} = \\dfrac{1}{2}\\begin{pmatrix} 1 & -2 \\\\ -1 & 4 \\end{pmatrix}$."
    },
    {
      titre: "Résoudre un système avec une matrice",
      etapes: [
        "Écrire le système sous la forme $AX = B$ (coefficients de $x$, $y$… en lignes).",
        "Vérifier que $A$ est inversible et calculer $A^{-1}$.",
        "Calculer $X = A^{-1}B$ (inverse à **gauche**).",
        "Vérifier la solution dans le système."
      ],
      exemple: "$\\begin{cases} 4x + 2y = 6 \\\\ x + y = 2 \\end{cases}$ : $X = \\dfrac{1}{2}\\begin{pmatrix} 1 & -2 \\\\ -1 & 4 \\end{pmatrix}\\begin{pmatrix} 6 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$."
    },
    {
      titre: "Calculer $A^n$",
      etapes: [
        "Si $A$ est diagonale : élever chaque coefficient diagonal à la puissance $n$.",
        "Sinon : calculer $A^2$, $A^3$ et repérer une forme.",
        "Démontrer la conjecture par récurrence, en écrivant $A^{n+1} = A^n \\times A$."
      ],
      exemple: "$\\begin{pmatrix} 3 & 0 \\\\ 0 & -2 \\end{pmatrix}^n = \\begin{pmatrix} 3^n & 0 \\\\ 0 & (-2)^n \\end{pmatrix}$."
    }
  ],
  erreurs: [
    "Inverser lignes et colonnes : $a_{ij}$ est sur la ligne $i$ et la colonne $j$.",
    "Multiplier les coefficients à la même place : le produit se fait « ligne par colonne ».",
    "Écrire $AB = BA$ : le produit n'est pas commutatif.",
    "Calculer $A^2$ en élevant chaque coefficient au carré.",
    "Écrire $X = BA^{-1}$ au lieu de $X = A^{-1}B$.",
    "Prendre l'inverse de chaque coefficient pour calculer $A^{-1}$.",
    "Oublier de vérifier que le produit existe (tailles compatibles)."
  ]
};
