/*
  CHAPITRE : Seconde — Problèmes de synthèse
  -------------------------------------------
  Chapitre 17 (dernier) de la progression spiralée 2026-2027 (programme de Seconde 2026).
  Problèmes qui mélangent plusieurs domaines, logique (propositions, et, ou, négation, implication, réciproque,
  contraposée, équivalence, « pour tout », « il existe » : les symboles ∀ et ∃ sont hors programme) et bilan des
  types de raisonnement.
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Figures : "boite-patron", "sy-cours-triangle", "sy-cours-suite", "sy-cours-longueur", "tc-venn-inter",
  "tc-venn-union", "tc-venn-nonInter".
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
      video: { titre: "Vidéo de ton prof : modéliser par une fonction, l'enclos", youtube: "https://youtu.be/LeM5BO2az9w" },
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
      figure: "sy-cours-triangle",
      video: { titre: "Vidéo d'Yvan Monka : calculer la longueur d'un segment", youtube: "https://youtu.be/pP8ebg8W9o8" },
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
      figure: "sy-cours-suite",
      video: { titre: "Vidéo de ton prof (Première) : la notion de suite, pour aller plus loin", youtube: "https://youtu.be/sVkYEQQWvDo" },
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
      titre: "Propositions : et, ou, non",
      figure: ["tc-venn-inter", "tc-venn-union"],
      texte:
        "Une **proposition** est une phrase qui est soit vraie, soit fausse : « $7$ est premier » (vraie), « $2 > 5$ » (fausse). Avec une variable, sa vérité dépend de la valeur : « $x > 3$ » est vraie pour $x = 4$, fausse pour $x = 1$.\n\n" +
        "- « $P$ **et** $Q$ » est vraie quand les **deux** sont vraies (comme $A \\cap B$, première figure).\n" +
        "- « $P$ **ou** $Q$ » est vraie quand **au moins une** des deux est vraie : le « ou » mathématique est **inclusif** (comme $A \\cup B$, seconde figure).\n" +
        "- La **négation** « non $P$ » est vraie quand $P$ est fausse. La négation de $x > 3$ est $x \\leqslant 3$ (et non $x < 3$).\n\n" +
        "Pour nier « et » ou « ou », on nie chaque partie **et** on échange les mots : non ($P$ et $Q$) = (non $P$) ou (non $Q$) ; non ($P$ ou $Q$) = (non $P$) et (non $Q$).",
      exemple: {
        enonce: "Écrire la négation de « Anli a son permis et habite à Sada », puis celle de « $x < -1$ ou $x \\geqslant 4$ ».",
        solution: "« Anli n'a pas son permis **ou** n'habite pas à Sada » : il suffit qu'une des deux conditions manque.\n\nNégation de « $x < -1$ ou $x \\geqslant 4$ » : « $x \\geqslant -1$ **et** $x < 4$ », c'est-à-dire $-1 \\leqslant x < 4$."
      }
    },
    {
      titre: "Implication, réciproque, contraposée, « pour tout » et « il existe »",
      texte:
        "- **Implication** « si $P$, alors $Q$ » (on écrit aussi $P \\Rightarrow Q$) : chaque fois que $P$ est vraie, $Q$ l'est aussi. Pour la contredire, il faut un cas où $P$ est vraie et $Q$ fausse : un **contre-exemple**.\n" +
        "- **Réciproque** : « si $Q$, alors $P$ ». Elle peut être fausse alors que l'implication est vraie.\n" +
        "- **Contraposée** : « si non $Q$, alors non $P$ ». Elle est vraie exactement quand l'implication est vraie.\n" +
        "- **Équivalence** « $P$ si et seulement si $Q$ » ($P \\iff Q$) : l'implication et sa réciproque sont vraies.\n\n" +
        "**Quantificateurs** (en mots, sans symbole) : « **pour tout** réel $x$, … » doit être vrai dans tous les cas, un contre-exemple suffit à la rendre fausse ; « **il existe** un réel $x$ tel que … » est vraie dès qu'on trouve un exemple.",
      exemple: {
        enonce: "« Si $x = 3$, alors $x^2 = 9$. » Est-elle vraie ? Écrire sa réciproque et sa contraposée, et dire si elles sont vraies.",
        solution: "L'implication est vraie : $3^2 = 9$.\n\nRéciproque : « si $x^2 = 9$, alors $x = 3$ ». Elle est fausse : contre-exemple $x = -3$.\n\nContraposée : « si $x^2 \\neq 9$, alors $x \\neq 3$ ». Elle est vraie, comme l'implication."
      }
    },
    {
      titre: "Bilan des types de raisonnement",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que la somme de deux multiples de a est un multiple de a", youtube: "https://youtu.be/4an6JTwrJV4" },
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
      figure: "sy-cours-longueur",
      texte:
        "On remplace la courbe par une **ligne brisée** de $n$ segments, et on additionne leurs longueurs (formule de la distance, chapitre 7). Sur $[0\\,;1]$, chaque segment a une largeur $h = \\dfrac{1}{n}$ et relie $(a\\,;f(a))$ à $(b\\,;f(b))$ : sa longueur est $\\sqrt{h^2 + (f(b) - f(a))^2}$.\n\n" +
        "```python\nfrom math import sqrt\n\ndef f(x):\n    return x**2\n\ndef longueur(n):\n    h = 1 / n\n    L = 0\n    for i in range(n):\n        a, b = i * h, (i + 1) * h\n        dy = f(b) - f(a)\n        L = L + sqrt(h**2 + dy**2)\n    return L\n```\n\n" +
        "La figure montre la ligne brisée pour $n = 4$. Plus $n$ est grand, plus la ligne brisée « colle » à la courbe et plus l'approximation est précise.",
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
    { type: "sy-triangle", titre: "Géométrie repérée : triangle, parallélogramme, distance", etape: "Géométrie repérée", nb: 5 },
    { type: "co-alignes", titre: "Alignement et parallélisme", etape: "Géométrie repérée", nb: 4 },
    { type: "sy-logique", titre: "Logique : négation, réciproque, contraposée, contre-exemple", etape: "Raisonner", nb: 6 },
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
    { question: "Boîte en carton : dans une plaque carrée de $30$ cm de côté, on découpe un carré de côté $x$ à chaque coin (figure ci-dessous). Les valeurs possibles de $x$ sont :", figure: "boite-patron", choix: ["$0 < x < 15$", "$0 < x < 30$", "$0 \\leqslant x \\leqslant 30$", "$x > 0$"], bonne: 0, explication: "Le fond a pour côté $30 - 2x$, qui doit être strictement positif : $x < 15$. Et il faut $x > 0$ pour que la boîte ait une hauteur." },
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
    { question: "Dans le repère ci-dessous, $A(0\\,;2)$, $B(-2\\,;0)$ et $C(2\\,;0)$. Le triangle $ABC$ est :", figure: "sy-cours-triangle", choix: ["rectangle et isocèle en $A$", "équilatéral", "rectangle en $B$", "rectangle en $C$"], bonne: 0, explication: "$AB^2 = 2^2 + 2^2 = 8$, $AC^2 = 8$ et $BC^2 = 4^2 = 16$. Comme $AB^2 + AC^2 = 16 = BC^2$, il est rectangle en $A$ (réciproque de Pythagore), et isocèle car $AB = AC$." },
    { question: "Les points ci-dessous représentent $u(n) = 500 \\times 1{,}1^n$. Que vaut $u(3)$ ?", figure: "sy-cours-suite", choix: ["$665{,}5$", "$650$", "$605$", "$1\\,650$"], bonne: 0, explication: "$1{,}1^3 = 1{,}331$, donc $u(3) = 500 \\times 1{,}331 = 665{,}5$. ($650 = 500 + 3 \\times 50$ suppose une hausse de $50$ chaque année ; $605$ est $u(2)$.)" },
    { question: "La ligne brisée ci-dessous ($4$ segments) approche la courbe de $y = x^2$ sur $[0\\,;1]$. Sa longueur est :", figure: "sy-cours-longueur", choix: ["un peu plus petite que la longueur de la courbe", "un peu plus grande que la longueur de la courbe", "égale à $\\sqrt{2}$", "égale à $4$"], bonne: 0, explication: "Chaque segment est le plus court chemin entre ses deux extrémités : la ligne brisée est un peu plus courte que la courbe. Avec plus de segments, elle s'en rapproche." },
    { question: "La négation de « $x > 3$ et $y \\leqslant 1$ » est :", choix: ["$x \\leqslant 3$ ou $y > 1$", "$x \\leqslant 3$ et $y > 1$", "$x < 3$ ou $y > 1$", "$x > 3$ ou $y \\leqslant 1$"], bonne: 0, explication: "On nie chaque partie ($x > 3$ devient $x \\leqslant 3$, $y \\leqslant 1$ devient $y > 1$) et « et » devient « ou »." },
    { question: "La proposition « il existe un réel $x$ tel que $x^2 = 5$ » est :", choix: ["vraie : $x = \\sqrt{5}$ convient", "fausse : $5$ n'est pas le carré d'un entier", "fausse : un carré est toujours positif", "vraie : $x = 2{,}5$ convient"], bonne: 0, explication: "Pour « il existe », un seul exemple suffit : $(\\sqrt{5})^2 = 5$. Attention, $2{,}5^2 = 6{,}25$." },
    { question: "La réciproque de « si $x = 2$, alors $x^2 = 4$ » est :", choix: ["« si $x^2 = 4$, alors $x = 2$ », qui est fausse", "« si $x \\neq 2$, alors $x^2 \\neq 4$ », qui est vraie", "« si $x^2 \\neq 4$, alors $x \\neq 2$ », qui est fausse", "« si $x = 2$, alors $x^2 \\neq 4$ »"], bonne: 0, explication: "On échange les deux parties. Elle est fausse : contre-exemple $x = -2$, car $(-2)^2 = 4$. La 3e proposition est la contraposée, qui est vraie." },
    { question: "Les propositions « $x^2 = 9$ » et « $x = 3$ ou $x = -3$ » sont :", choix: ["équivalentes", "contraires l'une de l'autre", "sans lien : aucune n'entraîne l'autre", "équivalentes seulement quand $x > 0$"], bonne: 0, explication: "$x^2 = 9 \\iff x = 3$ ou $x = -3$ : chacune entraîne l'autre, elles sont équivalentes." },
    { question: "Sur la figure ci-dessous, la zone coloriée représente les éléments qui vérifient :", figure: "tc-venn-union", choix: ["« être dans $A$ ou dans $B$ »", "« être dans $A$ et dans $B$ »", "« n'être ni dans $A$, ni dans $B$ »", "« être dans $A$ mais pas dans $B$ »"], bonne: 0, explication: "Tout ce qui est dans $A$, dans $B$ ou dans les deux est colorié : c'est le « ou » inclusif, $A \\cup B$." },
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
      figure: "boite-patron",
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
    },
    {
      titre: "Nier une proposition, écrire une réciproque ou une contraposée",
      etapes: [
        "Négation : nier chaque partie ($>$ devient $\\leqslant$, « est » devient « n'est pas ») et échanger « et » et « ou ».",
        "Réciproque de « si $P$, alors $Q$ » : « si $Q$, alors $P$ » (on échange, sans nier).",
        "Contraposée : « si non $Q$, alors non $P$ » (on échange et on nie) ; elle est vraie exactement quand l'implication l'est.",
        "Pour montrer qu'une affirmation « pour tout » est fausse : un contre-exemple suffit."
      ],
      figure: "tc-venn-nonInter",
      exemple: "Non (« $x > 0$ et $y > 0$ ») : « $x \\leqslant 0$ ou $y \\leqslant 0$ » (zone coloriée : tout sauf $A \\cap B$)."
    }
  ],
  erreurs: [
    "Oublier de préciser les valeurs possibles de l'inconnue ($0 < x < 15$ pour la boîte).",
    "Conclure à partir d'une figure ou de quelques exemples : il faut démontrer.",
    "Confondre réciproque et contraposée.",
    "Nier « $P$ et $Q$ » en gardant « et » : la négation est « non $P$ ou non $Q$ ».",
    "Prendre $x < 3$ pour le contraire de $x > 3$ : c'est $x \\leqslant 3$.",
    "Répondre sans phrase ni unité."
  ]
};
