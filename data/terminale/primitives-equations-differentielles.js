/*
  CHAPITRE : Terminale maths complémentaires — Primitives et équations différentielles
  ------------------------------------------------------------------------------------
  Chapitre 11 de la progression spiralée 2026-2027 (programme de maths complémentaires de 2019).
  Équation différentielle, primitive, deux primitives diffèrent d'une constante, y' = ay et y' = ay + b,
  formes 2uu' et u'e^u, condition initiale, méthode d'Euler en Python, élimination d'un médicament.
  Figures : "tpe-famille", "tpe-euler". Générateurs : tpe-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-primitives-ed"] = {
  niveau: "Terminale maths complémentaires",
  numero: 11,
  titre: "Primitives et équations différentielles",
  accroche: "Retrouver une fonction à partir de sa dérivée : primitives, équations y' = ay et y' = ay + b, condition initiale, médicament dans le sang et méthode d'Euler en Python.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Qu'est-ce qu'une équation différentielle ?",
      video: { titre: "Vidéo d'Yvan Monka : vérifier qu'une fonction est solution", youtube: "https://youtu.be/LX8PxR-ScfM" },
      texte:
        "Une **équation différentielle** est une égalité qui relie une fonction inconnue $y$ et sa dérivée $y'$. Par exemple $y' = 2y$.\n\n" +
        "Une **solution** sur un intervalle $I$ est une fonction $f$ dérivable sur $I$ telle que l'égalité est vraie pour tout $x$ de $I$ : ici $f'(x) = 2f(x)$.\n\n" +
        "Pour **vérifier** qu'une fonction est solution, on calcule $f'(x)$, on calcule l'autre membre, et on compare.",
      exemple: {
        enonce: "La fonction $f(x) = 3e^{2x}$ est-elle solution de $y' = 2y$ ?",
        solution: "$f'(x) = 6e^{2x}$ et $2f(x) = 6e^{2x}$ : les deux sont égaux pour tout $x$, donc $f$ est solution."
      }
    },
    {
      titre: "Primitive d'une fonction",
      video: { titre: "Vidéo d'Yvan Monka : cours sur les primitives", youtube: "https://youtu.be/LIm3DN63bxQ" },
      texte:
        "$F$ est une **primitive** de $f$ sur $I$ si $F'(x) = f(x)$ pour tout $x$ de $I$. Autrement dit, $F$ est une solution de l'équation différentielle $y' = f$.\n\n" +
        "**Propriété** : deux primitives d'une même fonction sur un intervalle diffèrent d'une constante. Si $F$ est une primitive, toutes les primitives sont les $F(x) + C$, $C$ réel.\n\n" +
        "**Démonstration** : si $F' = G' = f$, alors $(G - F)' = 0$, donc $G - F$ est constante sur l'intervalle.",
      exemple: {
        enonce: "Donne deux primitives de $f(x) = 2x$.",
        solution: "$F(x) = x^2$ et $G(x) = x^2 + 5$ : leurs dérivées valent toutes deux $2x$."
      }
    },
    {
      titre: "Primitives usuelles",
      video: { titre: "Vidéo d'Yvan Monka : chercher une primitive", youtube: "https://youtu.be/GA6jMgLd_Cw" },
      texte:
        "On lit le tableau des dérivées « à l'envers » (sur un intervalle où tout est défini) :\n\n" +
        "- $k$ (constante) a pour primitive $kx$ ;\n" +
        "- $x^n$ a pour primitive $\\dfrac{x^{n+1}}{n+1}$ ($n$ entier, $n \\neq -1$) ;\n" +
        "- $\\dfrac{1}{x^2}$ a pour primitive $-\\dfrac{1}{x}$ ;\n" +
        "- $\\dfrac{1}{x}$ a pour primitive $\\ln x$ sur $]0\\,;+\\infty[$ ;\n" +
        "- $e^x$ a pour primitive $e^x$, et $e^{kx}$ a pour primitive $\\dfrac{1}{k}e^{kx}$ ($k \\neq 0$).\n\n" +
        "Une primitive d'une somme est la somme des primitives, et une primitive de $kf$ est $kF$.\n\n" +
        "**Réflexe** : on vérifie toujours en dérivant le résultat.",
      exemple: {
        enonce: "Détermine une primitive de $f(x) = 3x^2 - 4x + 5$.",
        solution: "$F(x) = x^3 - 2x^2 + 5x$. Vérification : $F'(x) = 3x^2 - 4x + 5$."
      }
    },
    {
      titre: "Reconnaître une dérivée de fonction composée",
      video: { titre: "Vidéo d'Yvan Monka : chercher une primitive (2)", youtube: "https://youtu.be/82HYI4xuClw" },
      texte:
        "Avec les dérivées du chapitre 7 lues à l'envers, $u$ étant une fonction dérivable :\n\n" +
        "- $2u'u$ a pour primitive $u^2$ (car $(u^2)' = 2u'u$) ;\n" +
        "- $u'e^u$ a pour primitive $e^u$ (car $(e^u)' = u'e^u$) ;\n" +
        "- $\\dfrac{u'}{u}$ a pour primitive $\\ln u$, quand $u > 0$.\n\n" +
        "Il faut parfois ajuster une constante : $xe^{x^2} = \\dfrac{1}{2} \\times 2xe^{x^2}$ a pour primitive $\\dfrac{1}{2}e^{x^2}$.",
      exemple: {
        enonce: "Détermine une primitive de $f(x) = 2x e^{x^2 + 1}$.",
        solution: "Avec $u(x) = x^2 + 1$, on a $u'(x) = 2x$ : $f = u'e^u$, donc $F(x) = e^{x^2 + 1}$."
      }
    },
    {
      titre: "Primitive vérifiant une condition",
      video: { titre: "Vidéo d'Yvan Monka : LA primitive vérifiant une condition", youtube: "https://youtu.be/-q9M7oJ9gkI" },
      texte:
        "Parmi toutes les primitives $F + C$, **une seule** prend une valeur donnée $y_0$ en un point $x_0$ : on écrit $F(x_0) + C = y_0$ et on trouve $C$.\n\n" +
        "C'est un premier exemple d'**existence et unicité** : la condition initiale choisit une solution parmi une infinité.",
      exemple: {
        enonce: "Détermine la primitive $F$ de $f(x) = 6x + 1$ telle que $F(1) = 2$.",
        solution: "$F(x) = 3x^2 + x + C$ et $F(1) = 4 + C = 2$, donc $C = -2$ : $F(x) = 3x^2 + x - 2$."
      }
    },
    {
      titre: "L'équation y' = ay",
      video: { titre: "Vidéo d'Yvan Monka : résoudre y' = ay", youtube: "https://youtu.be/YJNHTq85tJA" },
      texte:
        "$a$ est un réel. Les solutions de $y' = ay$ sur $\\mathbb{R}$ sont les fonctions $x \\mapsto Ce^{ax}$, où $C$ est un réel.\n\n" +
        "Avec une condition initiale $y(0) = y_0$, il y a une **unique** solution : $y(x) = y_0e^{ax}$.\n\n" +
        "C'est la version continue de la suite géométrique : une grandeur dont la vitesse de variation est proportionnelle à elle-même (croissance d'une population, désintégration radioactive, refroidissement…).",
      exemple: {
        enonce: "Résous $y' = -0{,}3y$ avec $y(0) = 50$, puis calcule $y(2)$.",
        solution: "$y(x) = 50e^{-0{,}3x}$ et $y(2) = 50e^{-0{,}6} \\approx 27{,}44$."
      }
    },
    {
      titre: "L'équation y' = ay + b",
      figure: "tpe-famille",
      video: { titre: "Vidéo d'Yvan Monka : résoudre y' = ay + b", youtube: "https://youtu.be/F_LQLZ8rUhg" },
      texte:
        "$a \\neq 0$ et $b$ sont des réels.\n\n" +
        "1. **Solution constante** : $y' = 0$ donne $0 = ay + b$, soit $y = -\\dfrac{b}{a}$ (l'équilibre, comme la suite constante du chapitre 3).\n" +
        "2. **Solutions** : $y(x) = Ce^{ax} - \\dfrac{b}{a}$, $C$ réel.\n" +
        "3. Avec une condition initiale, on calcule $C$ : la solution est unique.\n\n" +
        "Si $a < 0$, $e^{ax} \\to 0$ : toutes les courbes se rapprochent de la droite $y = -\\dfrac{b}{a}$. La figure montre plusieurs solutions de $y' = -0{,}5y + 2$ : elles tendent toutes vers $4$.",
      exemple: {
        enonce: "Résous $y' = -0{,}5y + 2$ avec $y(0) = 10$.",
        solution: "Solution constante : $y = \\dfrac{2}{0{,}5} = 4$. Donc $y(x) = Ce^{-0{,}5x} + 4$, et $y(0) = C + 4 = 10$ donne $C = 6$ : $y(x) = 6e^{-0{,}5x} + 4$."
      }
    },
    {
      titre: "Modéliser : médicament, plat qui refroidit",
      video: { titre: "Vidéo d'Yvan Monka : résoudre y' = ay + b (2)", youtube: "https://youtu.be/CFZr44vny3w" },
      texte:
        "- **Élimination d'un médicament** : le corps élimine chaque heure une part proportionnelle à la quantité présente, donc $Q' = -kQ$ et $Q(t) = Q_0e^{-kt}$. La **demi-vie** $t_{1/2} = \\dfrac{\\ln 2}{k}$ ne dépend pas de la dose.\n" +
        "- **Refroidissement** (loi de Newton) : un plat à $90\\,°\\text{C}$ dans une pièce à $28\\,°\\text{C}$ vérifie $T' = -k(T - 28)$, soit $T' = -kT + 28k$. Sa solution constante est $28$ : le plat tend vers la température de la pièce. C'est la version continue de la suite arithmético-géométrique du chapitre 3.\n" +
        "- **Pour aller plus loin** (sans attendu) : le modèle de Verhulst $y' = ay(1 - y/M)$ décrit une population limitée par les ressources.",
      exemple: {
        enonce: "Un médicament vérifie $Q' = -0{,}2Q$. Quelle est sa demi-vie ?",
        solution: "$t_{1/2} = \\dfrac{\\ln 2}{0{,}2} \\approx 3{,}5$ heures."
      }
    },
    {
      titre: "Python : la méthode d'Euler",
      figure: "tpe-euler",
      texte:
        "Quand on ne sait pas résoudre une équation, on construit une solution approchée pas à pas : on avance de $h$ en suivant la tangente, car $y(x + h) \\approx y(x) + h \\times y'(x)$.\n\n" +
        "```python\ndef euler(a, h, n):\n    x = 0\n    y = 1\n    for i in range(n):\n        y = y + h * a * y\n        x = x + h\n    return y\n```\n\n" +
        "Pour $y' = y$, $y(0) = 1$, chaque pas multiplie $y$ par $1 + h$. La figure compare la ligne brisée obtenue avec $h = 0{,}25$ et la vraie courbe de l'exponentielle : plus le pas est petit, meilleure est l'approximation.",
      exemple: {
        enonce: "Que renvoie euler(1, 0.5, 2) ? Compare avec $e$.",
        solution: "$1{,}5^2 = 2{,}25$, alors que $e^1 \\approx 2{,}72$ : l'approximation est grossière avec un grand pas."
      }
    }
  ],

  videos: [
    { titre: "Cours : primitives", type: "Cours", youtube: "https://youtu.be/LIm3DN63bxQ" },
    { titre: "Cours : équations différentielles", type: "Cours", youtube: "https://youtu.be/qHF5kiDFkW8" },
    { titre: "Vérifier qu'une fonction est solution", type: "Méthode", youtube: "https://youtu.be/LX8PxR-ScfM" },
    { titre: "Chercher une primitive (1)", type: "Calcul", youtube: "https://youtu.be/GA6jMgLd_Cw" },
    { titre: "Chercher une primitive (2)", type: "Calcul", youtube: "https://youtu.be/82HYI4xuClw" },
    { titre: "Chercher une primitive (3)", type: "Calcul", youtube: "https://youtu.be/gxRpmHWnoGQ" },
    { titre: "Chercher une primitive (4)", type: "Calcul", youtube: "https://youtu.be/iiq6eUQee9g" },
    { titre: "LA primitive vérifiant une condition", type: "Méthode", youtube: "https://youtu.be/-q9M7oJ9gkI" },
    { titre: "Résoudre y' = ay", type: "Méthode", youtube: "https://youtu.be/YJNHTq85tJA" },
    { titre: "Résoudre y' = ay + b (1)", type: "Méthode", youtube: "https://youtu.be/F_LQLZ8rUhg" },
    { titre: "Résoudre y' = ay + b (2)", type: "Méthode", youtube: "https://youtu.be/CFZr44vny3w" }
  ],
  videosNote: "Vidéos d'Yvan Monka (maths complémentaires), en attendant les vidéos de ton prof sur ce chapitre.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "tpe-verifier", titre: "Vérifier qu'une fonction est solution", etape: "Primitives", nb: 4 },
    { type: "tpe-primitive", titre: "Trouver une primitive", etape: "Primitives", nb: 6 },
    { type: "tpe-condition", titre: "Primitive vérifiant une condition", etape: "Primitives", nb: 4 },
    { type: "tpe-yay", titre: "Résoudre y' = ay", etape: "Équations différentielles", nb: 4 },
    { type: "tpe-yayb", titre: "Résoudre y' = ay + b", etape: "Équations différentielles", nb: 6 },
    { type: "tpe-medicament", titre: "Élimination d'un médicament", etape: "Modéliser", nb: 4 },
    { type: "tpe-euler", titre: "Python : méthode d'Euler", etape: "Raisonner", nb: 3 },
    { type: "tpe-logique", titre: "Vrai ou faux", etape: "Raisonner", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$F$ est une primitive de $f$ si :", choix: ["$F' = f$", "$f' = F$", "$F = f$", "$F \\times f = 1$"], bonne: 0, explication: "On dérive $F$ pour retrouver $f$." },
    { question: "Une primitive de $f(x) = 3x^2$ est :", choix: ["$x^3$", "$6x$", "$3x^3$", "$x^2$"], bonne: 0, explication: "$(x^3)' = 3x^2$." },
    { question: "Une primitive de $f(x) = e^{2x}$ est :", choix: ["$\\dfrac{1}{2}e^{2x}$", "$2e^{2x}$", "$e^{2x}$", "$e^{x^2}$"], bonne: 0, explication: "$\\left(\\dfrac{1}{2}e^{2x}\\right)' = e^{2x}$." },
    { question: "Sur $]0\\,;+\\infty[$, une primitive de $\\dfrac{1}{x}$ est :", choix: ["$\\ln x$", "$-\\dfrac{1}{x^2}$", "$e^x$", "$x$"], bonne: 0, explication: "$(\\ln x)' = \\dfrac{1}{x}$." },
    { question: "Une primitive de $\\dfrac{1}{x^2}$ est :", choix: ["$-\\dfrac{1}{x}$", "$\\dfrac{1}{x}$", "$\\ln(x^2)$", "$-\\dfrac{2}{x^3}$"], bonne: 0, explication: "$\\left(-\\dfrac{1}{x}\\right)' = \\dfrac{1}{x^2}$." },
    { question: "Une primitive de $2xe^{x^2}$ est :", choix: ["$e^{x^2}$", "$x^2e^{x^2}$", "$2e^{x^2}$", "$e^{2x}$"], bonne: 0, explication: "Forme $u'e^u$." },
    { question: "Une primitive de $2(3x + 1) \\times 3$ est :", choix: ["$(3x + 1)^2$", "$(3x + 1)^3$", "$3(3x + 1)^2$", "$6x$"], bonne: 0, explication: "Forme $2uu'$, primitive $u^2$." },
    { question: "Deux primitives d'une même fonction sur un intervalle :", choix: ["diffèrent d'une constante", "sont égales", "sont opposées", "n'ont aucun lien"], bonne: 0, explication: "$(G - F)' = 0$." },
    { question: "La primitive de $2x$ qui vaut $5$ en $0$ est :", choix: ["$x^2 + 5$", "$x^2$", "$2x + 5$", "$x^2 - 5$"], bonne: 0, explication: "$F(0) = C = 5$." },
    { question: "Les solutions de $y' = 3y$ sont :", choix: ["$Ce^{3x}$", "$3e^{x}$", "$e^{3x} + C$", "$Cx^3$"], bonne: 0, explication: "$y' = ay$ : $Ce^{ax}$." },
    { question: "La solution de $y' = -y$ avec $y(0) = 4$ est :", choix: ["$4e^{-x}$", "$-4e^{x}$", "$e^{-x} + 4$", "$4e^{x}$"], bonne: 0, explication: "$y(0) = C = 4$." },
    { question: "La solution constante de $y' = -2y + 6$ est :", choix: ["$3$", "$-3$", "$6$", "$-12$"], bonne: 0, explication: "$0 = -2y + 6$." },
    { question: "Les solutions de $y' = -2y + 6$ sont :", choix: ["$Ce^{-2x} + 3$", "$Ce^{-2x} - 3$", "$Ce^{6x} - 2$", "$3e^{-2x} + C$"], bonne: 0, explication: "$Ce^{ax} - \\dfrac{b}{a}$." },
    { question: "Si $a < 0$, les solutions de $y' = ay + b$ tendent vers :", choix: ["$-\\dfrac{b}{a}$", "$0$", "$+\\infty$", "$b$"], bonne: 0, explication: "$e^{ax} \\to 0$." },
    { question: "La fonction nulle est solution de :", choix: ["$y' = 5y$", "$y' = 5y + 1$", "$y' = 5$", "$y' = y + 2$"], bonne: 0, explication: "$0 = 5 \\times 0$." },
    { question: "Un médicament vérifie $Q' = -0{,}5Q$. Sa demi-vie est :", choix: ["$\\dfrac{\\ln 2}{0{,}5}$", "$0{,}5$", "$2$", "$\\ln 0{,}5$"], bonne: 0, explication: "$e^{-0{,}5t} = 0{,}5$." },
    { question: "La demi-vie d'un médicament dépend :", choix: ["seulement de $k$", "de la dose", "du patient seulement", "de l'heure de prise"], bonne: 0, explication: "$t_{1/2} = \\dfrac{\\ln 2}{k}$." },
    { question: "Un plat refroidit dans une pièce à $28\\,°\\text{C}$. Sa température tend vers :", choix: ["$28\\,°\\text{C}$", "$0\\,°\\text{C}$", "sa température initiale", "$-\\infty$"], bonne: 0, explication: "Solution constante de $T' = -k(T - 28)$." },
    { question: "Dans la méthode d'Euler, on approche $y(x + h)$ par :", choix: ["$y(x) + h \\times y'(x)$", "$y(x) \\times h$", "$y'(x) + h$", "$y(x + h)^2$"], bonne: 0, explication: "On suit la tangente." },
    { question: "Pour améliorer la méthode d'Euler, on :", choix: ["diminue le pas $h$", "augmente le pas $h$", "change $y(0)$", "arrondit plus"], bonne: 0, explication: "Plus le pas est petit, meilleure est l'approximation." },
    { question: "euler(1, 0.1, 10) approche :", choix: ["$e \\approx 2{,}72$", "$1$", "$10$", "$0{,}1$"], bonne: 0, explication: "$1{,}1^{10} \\approx 2{,}59$, proche de $e^1$." },
    { question: "Une équation différentielle relie :", choix: ["une fonction et sa dérivée", "deux nombres", "deux suites", "deux probabilités"], bonne: 0, explication: "L'inconnue est une fonction." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Vérifier qu'une fonction est solution",
      etapes: ["Calculer $f'(x)$.", "Calculer l'autre membre en remplaçant $y$ par $f(x)$.", "Comparer : solution si l'égalité est vraie pour tout $x$."],
      exemple: "$f(x) = 2e^{-x} + 3$ et $y' = -y + 3$ : $f'(x) = -2e^{-x}$ et $-f(x) + 3 = -2e^{-x}$. C'est une solution."
    },
    {
      titre: "Trouver une primitive",
      etapes: ["Reconnaître une forme du tableau (puissance, $\\dfrac{1}{x}$, $e^{kx}$) ou composée ($2uu'$, $u'e^u$, $\\dfrac{u'}{u}$).", "Ajuster la constante multiplicative si besoin.", "Vérifier en dérivant ; ajouter $C$ si on veut toutes les primitives."],
      exemple: "$xe^{x^2}$ : primitive $\\dfrac{1}{2}e^{x^2}$."
    },
    {
      titre: "Résoudre y' = ay + b avec une condition",
      etapes: ["Solution constante : $-\\dfrac{b}{a}$.", "Solutions : $y(x) = Ce^{ax} - \\dfrac{b}{a}$.", "Condition initiale : calculer $C$, puis conclure (limite si demandé)."],
      exemple: "$y' = -0{,}5y + 2$, $y(0) = 10$ : $y(x) = 6e^{-0{,}5x} + 4$, qui tend vers $4$."
    }
  ],
  erreurs: [
    "Oublier que les primitives sont définies à une constante près.",
    "Écrire $2e^{2x}$ comme primitive de $e^{2x}$ (c'est sa dérivée).",
    "Utiliser $\\ln x$ comme primitive de $\\dfrac{1}{x}$ pour $x < 0$.",
    "Se tromper de signe dans la solution constante : c'est $-\\dfrac{b}{a}$.",
    "Écrire $y(0) = C$ pour $y' = ay + b$ au lieu de $y(0) = C - \\dfrac{b}{a}$.",
    "Croire que la méthode d'Euler donne la valeur exacte."
  ]
};
