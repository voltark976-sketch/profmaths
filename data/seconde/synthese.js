/*
  CHAPITRE : Seconde — Problèmes de synthèse
  -------------------------------------------
  Chapitre 17 (dernier) de la progression spiralée 2026-2027 (programme de Seconde 2026).
  Problèmes qui mélangent plusieurs domaines, bilan des types de raisonnement.
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Les générateurs d'exercices commencent par « sy- » dans assets/exercices.js
  (le chapitre reprend aussi vx-optimisation, co-alignes et am-flash-tout).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-synthese"] = {
  niveau: "Seconde",
  numero: 17,
  titre: "Problèmes de synthèse",
  accroche: "Une boîte en carton, un terrain à aménager, des points dans un repère : choisir la bonne méthode parmi tout ce qu'on a vu cette année.",

  playlist: "",
  drive: "",
  pdfs: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Choisir une méthode",
      video: { titre: "Vidéo de ton prof : synthèse, la citerne du faré", youtube: "https://youtu.be/_q_XdOJxjik" },
      texte:
        "Face à un problème, on se demande d'abord **quel outil** convient :\n" +
        "- **graphique** : lire une courbe, une intersection, un extremum (rapide, approché) ;\n" +
        "- **algébrique** : résoudre une équation, une inéquation, étudier un signe (exact) ;\n" +
        "- **logicielle** : calculatrice, tableur ou Python pour un tableau de valeurs ou un balayage ;\n" +
        "- **vectorielle** : coordonnées, colinéarité, milieu, distance pour la géométrie repérée.\n\n" +
        "On commence par **modéliser** : choisir l'inconnue, ses valeurs possibles, et traduire l'énoncé.",
      exemple: {
        enonce: "Pour savoir si trois points sont alignés, quels outils peut-on utiliser ?",
        solution: "Le déterminant de $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ (chapitre 11), ou vérifier que $C$ est sur la droite $(AB)$ grâce à son équation (chapitre 12). Une figure permet de conjecturer, pas de démontrer."
      }
    },
    {
      titre: "Optimisation : la boîte en carton",
      figure: "boite-patron",
      texte:
        "Dans une plaque carrée de $30$ cm de côté, on découpe un carré de côté $x$ à chaque coin, puis on replie pour former une boîte sans couvercle.\n\n" +
        "- Le fond est un carré de côté $30 - 2x$, la hauteur vaut $x$, avec $0 < x < 15$.\n" +
        "- Le volume est $V(x) = x(30 - 2x)^2$.\n" +
        "- Un tableau de valeurs (ou un balayage en Python) montre que le maximum est atteint pour $x = 5$ : $V(5) = 5 \\times 20^2 = 2\\,000$ cm³.",
      exemple: {
        enonce: "Calculer $V(4)$, $V(5)$ et $V(6)$. Que remarque-t-on ?",
        solution: "$V(4) = 4 \\times 22^2 = 1\\,936$ ; $V(5) = 2\\,000$ ; $V(6) = 6 \\times 18^2 = 1\\,944$.\n\nLe volume augmente puis diminue : le maximum (parmi les entiers) est en $x = 5$."
      }
    },
    {
      titre: "Géométrie repérée",
      texte:
        "Avec des coordonnées, on peut tout démontrer par le calcul :\n" +
        "- **longueurs** et triangle rectangle (réciproque de Pythagore) : $AB^2 = (x_B - x_A)^2 + (y_B - y_A)^2$ ;\n" +
        "- **milieu** et parallélogramme : $\\overrightarrow{AB} = \\overrightarrow{DC}$, ou diagonales de même milieu ;\n" +
        "- **alignement** et **parallélisme** : déterminant ;\n" +
        "- **intersection** de deux droites : équations réduites.",
      exemple: {
        enonce: "$A(0\\,;2)$, $B(-2\\,;0)$, $C(2\\,;0)$. Le triangle $ABC$ est-il rectangle ?",
        solution: "$AB^2 = 4 + 4 = 8$, $AC^2 = 8$, $BC^2 = 16$. $AB^2 + AC^2 = 16 = BC^2$ : rectangle en $A$ (et isocèle, car $AB = AC$)."
      }
    },
    {
      titre: "Fonctions définies sur $\\mathbb{N}$",
      texte:
        "Certaines fonctions ne sont définies que pour des entiers : on note $u(n)$ au lieu de $f(x)$.\n\n" +
        "- $u(n) = 3n + 2$ : on ajoute $3$ à chaque étape (comme une fonction affine).\n" +
        "- $u(n) = 2^n$ : on multiplie par $2$ à chaque étape.\n\n" +
        "Ce sont des **suites**, au programme de Première : elles modélisent une évolution étape par étape (par année, par mois…).",
      exemple: {
        enonce: "Une population de tortues est estimée à $u(n) = 500 \\times 1{,}1^n$ après $n$ années. Calculer $u(0)$ et $u(2)$.",
        solution: "$u(0) = 500$ et $u(2) = 500 \\times 1{,}21 = 605$ tortues."
      }
    },
    {
      titre: "Bilan des types de raisonnement",
      texte:
        "- **Démonstration directe** : on part des hypothèses et on enchaîne les propriétés (somme de deux multiples).\n" +
        "- **Contre-exemple** : un seul cas suffit pour montrer qu'une affirmation « pour tout » est fausse.\n" +
        "- **Disjonction des cas** : on sépare les cas ($n$ pair, $n$ impair).\n" +
        "- **Équivalence** : chaque étape d'une résolution est réversible ($\\iff$).\n" +
        "- **Contraposée** : « si non $Q$, alors non $P$ » démontre « si $P$, alors $Q$ ».\n" +
        "- **Absurde** : on suppose le contraire et on trouve une contradiction ($\\sqrt{2}$ irrationnel).\n\n" +
        "Ne pas confondre une implication et sa **réciproque**.",
      exemple: {
        enonce: "« Si $x > 2$, alors $x^2 > 4$. » Quelle est sa réciproque ? Est-elle vraie ?",
        solution: "Réciproque : « si $x^2 > 4$, alors $x > 2$ ». Elle est fausse : contre-exemple $x = -3$ ($9 > 4$ mais $-3 < 2$)."
      }
    },
    {
      titre: "Python : longueur approchée d'une courbe",
      texte:
        "On remplace la courbe par une **ligne brisée** de $n$ segments, et on additionne leurs longueurs (formule de la distance, chapitre 7) :\n\n" +
        "```python\nfrom math import sqrt\n\ndef f(x):\n    return x**2\n\ndef longueur(n):\n    L = 0\n    for i in range(n):\n        a, b = i / n, (i + 1) / n\n        L = L + sqrt((b - a)**2 + (f(b) - f(a))**2)\n    return L\n```\n\n" +
        "Plus $n$ est grand, plus l'approximation est précise.",
      exemple: {
        enonce: "Que renvoie $\\texttt{longueur(1)}$ ? Pourquoi est-ce une valeur approchée par défaut ?",
        solution: "Un seul segment de $(0\\,;0)$ à $(1\\,;1)$ : $\\sqrt{2} \\approx 1{,}414$. Le segment est le plus court chemin entre ses extrémités : la vraie longueur de la courbe est plus grande (environ $1{,}479$)."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES ---------- */
  exercices: [
    { type: "sy-boite", titre: "La boîte en carton", etape: "Optimisation et modélisation", nb: 4 },
    { type: "vx-optimisation", titre: "L'enclos le plus grand", etape: "Optimisation et modélisation", nb: 3 },
    { type: "sy-suite", titre: "Fonctions définies sur ℕ", etape: "Optimisation et modélisation", nb: 4 },
    { type: "sy-triangle", titre: "Triangle rectangle dans un repère", etape: "Géométrie repérée", nb: 4 },
    { type: "co-alignes", titre: "Alignement et parallélisme", etape: "Géométrie repérée", nb: 4 },
    { type: "sy-raisonnement", titre: "Reconnaître un raisonnement", etape: "Raisonner", nb: 5 },
    { type: "sy-longueur", titre: "Python : longueur d'une courbe", etape: "Raisonner", nb: 3 },
    { type: "am-flash-tout", titre: "Révision flash de l'année", etape: "Révisions", nb: 10 }
  ],

  /* ---------- 3. QCM ---------- */
  qcm: [
    {
      question: "Pour trouver le maximum de $V(x) = x(30 - 2x)^2$ en Seconde, on peut :",
      choix: ["faire un tableau de valeurs ou un balayage", "dériver la fonction", "résoudre $V(x) = 0$", "calculer $V(30)$"],
      bonne: 0,
      explication: "Sans dérivée (Première), on utilise un tableau de valeurs, la courbe ou un balayage. $V(x) = 0$ donne les valeurs où la boîte est vide."
    },
    {
      question: "Pour montrer qu'une affirmation « pour tout réel $x$ » est fausse, il suffit :",
      choix: ["d'un contre-exemple", "de trois exemples", "d'un raisonnement par l'absurde", "d'un graphique"],
      bonne: 0,
      explication: "Un seul cas où l'affirmation est fausse suffit."
    },
    {
      question: "La réciproque de « si $ABCD$ est un carré, alors $ABCD$ est un rectangle » est :",
      choix: ["si $ABCD$ est un rectangle, alors c'est un carré (fausse)", "si $ABCD$ n'est pas un rectangle, alors ce n'est pas un carré", "$ABCD$ est un carré et un rectangle", "si $ABCD$ n'est pas un carré, alors ce n'est pas un rectangle"],
      bonne: 0,
      explication: "On échange hypothèse et conclusion. Elle est fausse : un rectangle n'est pas toujours un carré. La 2e proposition est la contraposée (vraie)."
    },
    {
      question: "$u(n) = 2n + 5$. Alors $u(10)$ vaut :",
      choix: ["$25$", "$30$", "$17$", "$205$"],
      bonne: 0,
      explication: "$2 \\times 10 + 5 = 25$."
    },
    {
      question: "$A(1\\,;1)$, $B(4\\,;5)$. La distance $AB$ vaut :",
      choix: ["$5$", "$7$", "$25$", "$\\sqrt{7}$"],
      bonne: 0,
      explication: "$\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$."
    },
    {
      question: "Pour démontrer que $\\sqrt{2}$ est irrationnel, on utilise :",
      choix: ["un raisonnement par l'absurde", "un contre-exemple", "la calculatrice", "une disjonction des cas uniquement"],
      bonne: 0,
      explication: "On suppose $\\sqrt{2} = \\dfrac{p}{q}$ irréductible et on aboutit à une contradiction."
    },
    { question: "Boîte en carton : dans une plaque carrée de $30$ cm de côté, on découpe un carré de côté $x$ à chaque coin. Les valeurs possibles de $x$ sont :", choix: ["$0 < x < 15$", "$0 < x < 30$", "$0 \\leqslant x \\leqslant 30$", "$x > 0$"], bonne: 0, explication: "Le fond a pour côté $30 - 2x$, qui doit être strictement positif : $x < 15$. Et il faut $x > 0$ pour que la boîte ait une hauteur." },
    { question: "Avec $V(x) = x(30 - 2x)^2$, le volume $V(2)$ vaut :", choix: ["$1\\,352$ cm³", "$1\\,568$ cm³", "$52$ cm³", "$2\\,704$ cm³"], bonne: 0, explication: "$V(2) = 2 \\times 26^2 = 2 \\times 676 = 1\\,352$ cm³. ($1\\,568$ vient de $30 - 2 = 28$ : on oublie qu'on découpe des deux côtés.)" },
    { question: "La contraposée de « si $n$ est pair, alors $n^2$ est pair » est :", choix: ["si $n^2$ est impair, alors $n$ est impair", "si $n^2$ est pair, alors $n$ est pair", "si $n$ est impair, alors $n^2$ est impair", "si $n^2$ est impair, alors $n$ est pair"], bonne: 0, explication: "Contraposée de « si $P$, alors $Q$ » : « si non $Q$, alors non $P$ ». La 2e proposition est la réciproque." },
    { question: "Pour démontrer que $n^2 + n$ est pair pour tout entier $n$, une méthode adaptée est :", choix: ["la disjonction des cas : $n$ pair, puis $n$ impair", "un contre-exemple", "vérifier pour $n = 1$, $2$ et $3$", "une lecture graphique"], bonne: 0, explication: "Si $n = 2k$ : $n^2 + n = 2(2k^2 + k)$. Si $n = 2k + 1$ : $n^2 + n = (2k + 1)(2k + 2) = 2(2k + 1)(k + 1)$. Quelques exemples ne démontrent rien." },
    { question: "Vrai ou faux : « pour tout réel $x$, $x^2 \\geqslant x$ ».", choix: ["Faux : $x = 0{,}5$ est un contre-exemple", "Vrai : un carré est toujours plus grand que le nombre", "Vrai : par exemple $3^2 = 9 \\geqslant 3$", "Faux : $x = 2$ est un contre-exemple"], bonne: 0, explication: "$0{,}5^2 = 0{,}25$ et $0{,}25 < 0{,}5$ : un seul contre-exemple suffit. Pour $x = 2$, on a bien $4 \\geqslant 2$." },
    { question: "$A(-1\\,;3)$ et $B(5\\,;-1)$. Le milieu $I$ de $[AB]$ a pour coordonnées :", choix: ["$(2\\,;1)$", "$(3\\,;-2)$", "$(4\\,;2)$", "$(6\\,;-4)$"], bonne: 0, explication: "$x_I = \\dfrac{-1 + 5}{2} = 2$ et $y_I = \\dfrac{3 + (-1)}{2} = 1$. On additionne les coordonnées, on ne les soustrait pas." },
    { question: "$A(1\\,;2)$, $B(4\\,;3)$ et $C(5\\,;6)$. Pour que $ABCD$ soit un parallélogramme, $D$ a pour coordonnées :", choix: ["$(2\\,;5)$", "$(8\\,;7)$", "$(0\\,;-1)$", "$(3\\,;4)$"], bonne: 0, explication: "Il faut $\\overrightarrow{DC} = \\overrightarrow{AB}$, avec $\\overrightarrow{AB}\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix}$ : $x_D = 5 - 3 = 2$ et $y_D = 6 - 1 = 5$." },
    { question: "$A(0\\,;1)$, $B(2\\,;5)$ et $C(3\\,;7)$. Les points $A$, $B$, $C$ sont :", choix: ["alignés, car $\\det(\\overrightarrow{AB}, \\overrightarrow{AC}) = 0$", "non alignés, car $\\det(\\overrightarrow{AB}, \\overrightarrow{AC}) = 0$", "non alignés, car $\\det(\\overrightarrow{AB}, \\overrightarrow{AC}) = 24$", "impossible à savoir sans figure"], bonne: 0, explication: "$\\overrightarrow{AB}\\begin{pmatrix} 2 \\\\ 4 \\end{pmatrix}$, $\\overrightarrow{AC}\\begin{pmatrix} 3 \\\\ 6 \\end{pmatrix}$ et $2 \\times 6 - 4 \\times 3 = 0$ : vecteurs colinéaires, points alignés. ($24$ vient d'une somme au lieu d'une différence.)" },
    { question: "Les droites d'équations $y = 2x + 1$ et $y = -x + 7$ se coupent au point :", choix: ["$(2\\,;5)$", "$(5\\,;2)$", "$(6\\,;13)$", "$(2\\,;-5)$"], bonne: 0, explication: "$2x + 1 = -x + 7 \\iff 3x = 6 \\iff x = 2$, puis $y = 2 \\times 2 + 1 = 5$. On vérifie avec l'autre droite : $-2 + 7 = 5$." },
    { question: "$u(n) = 3 \\times 2^n$. Alors $u(3)$ vaut :", choix: ["$24$", "$216$", "$18$", "$11$"], bonne: 0, explication: "La puissance d'abord : $2^3 = 8$, puis $3 \\times 8 = 24$. ($216 = 6^3$ : la priorité de la puissance n'a pas été respectée.)" },
    { question: "Une population de tortues vaut $u(n) = 500 \\times 1{,}1^n$ après $n$ années. D'une année à la suivante, elle :", choix: ["augmente de $10\\,\\%$", "augmente de $1{,}1\\,\\%$", "augmente de $110\\,\\%$", "augmente toujours de $50$ tortues"], bonne: 0, explication: "On multiplie par $1{,}1 = 1 + \\dfrac{10}{100}$ chaque année : c'est $+10\\,\\%$. La hausse est de $50$ tortues la première année, puis de $55$ la suivante." },
    { question: "$u(n) = 7 - 2n$. Quand on passe de $n$ à $n + 1$ :", choix: ["on soustrait $2$", "on ajoute $2$", "on multiplie par $-2$", "on soustrait $7$"], bonne: 0, explication: "$u(n + 1) = 7 - 2(n + 1) = 7 - 2n - 2 = u(n) - 2$." },
    { question: "Dans la résolution d'une équation, le symbole $\\iff$ entre deux lignes signifie :", choix: ["que les deux équations ont exactement les mêmes solutions", "que la seconde découle de la première, mais pas l'inverse", "qu'on a changé un terme de membre", "que l'équation n'a pas de solution"], bonne: 0, explication: "« $\\iff$ » se lit « équivaut à » : chaque étape est réversible, donc on ne gagne ni ne perd aucune solution." },
    { question: "En Python, la longueur d'une courbe approchée par une ligne brisée est :", choix: ["inférieure ou égale à la vraie longueur", "toujours supérieure à la vraie longueur", "toujours égale à $\\sqrt{2}$", "la même quel que soit le nombre $n$ de segments"], bonne: 0, explication: "Chaque segment est le plus court chemin entre ses extrémités : la ligne brisée est plus courte que la courbe. Plus $n$ est grand, plus elle s'en approche." },
    { question: "Dans un repère orthonormé, $AB^2 = 9$, $AC^2 = 16$ et $BC^2 = 25$. Le triangle $ABC$ est :", choix: ["rectangle en $A$", "rectangle en $B$", "rectangle en $C$", "équilatéral"], bonne: 0, explication: "$AB^2 + AC^2 = 25 = BC^2$ : d'après la réciproque de Pythagore, l'angle droit est opposé au plus grand côté $[BC]$, donc en $A$." },
    { question: "Pour démontrer « il n'existe pas de plus grand nombre entier », on peut :", choix: ["supposer qu'il en existe un, $N$, et remarquer que $N + 1$ est encore plus grand", "donner un contre-exemple", "vérifier à la calculatrice avec de très grands nombres", "faire une disjonction des cas : $N$ pair, $N$ impair"], bonne: 0, explication: "C'est un raisonnement par l'absurde : la supposition mène à une contradiction, elle est donc fausse." },
    { question: "Pour obtenir la valeur exacte de l'abscisse du point d'intersection de deux droites, on utilise plutôt :", choix: ["la résolution d'une équation (méthode algébrique)", "une lecture graphique", "un tableau de valeurs avec un pas de $1$", "un contre-exemple"], bonne: 0, explication: "Le graphique et le tableau de valeurs donnent une conjecture ou une valeur approchée ; le calcul donne la valeur exacte." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Résoudre un problème de synthèse",
      etapes: [
        "Lire tout l'énoncé et repérer la question finale.",
        "Modéliser : choisir l'inconnue, ses valeurs possibles, traduire en équation, fonction ou coordonnées.",
        "Choisir la méthode : graphique pour conjecturer, calcul pour démontrer, Python pour explorer.",
        "Conclure par une phrase qui répond à la question, avec l'unité."
      ],
      exemple: "Boîte : $V(x) = x(30 - 2x)^2$ sur $]0\\,;15[$, maximum $2\\,000$ cm³ pour $x = 5$ cm."
    },
    {
      titre: "Choisir le bon raisonnement",
      etapes: [
        "Affirmation à réfuter : un contre-exemple.",
        "Propriété « pour tout entier » : démonstration directe avec des lettres, ou disjonction des cas.",
        "Propriété « n'est pas » (irrationnel, non colinéaires…) : absurde ou contraposée."
      ],
      exemple: "« $n^2 + n$ est pair » : disjonction des cas ($n$ pair, $n$ impair)."
    }
  ],
  erreurs: [
    "Oublier de préciser les valeurs possibles de l'inconnue ($0 < x < 15$ pour la boîte).",
    "Conclure à partir d'une figure ou de quelques exemples : il faut démontrer.",
    "Confondre réciproque et contraposée.",
    "Répondre sans phrase ni unité."
  ]
};
