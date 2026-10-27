/*
  CHAPITRE : Première technologique — Automatismes : calcul, fonctions et graphiques
  ----------------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme 2026 de première technologique, partie transversale « Automatismes », blocs « Calcul numérique et algébrique »
  (équation produit nul, signe d'une expression du premier degré ou factorisée du second degré, développer, factoriser, réduire),
  « Fonctions et représentations » (résolution graphique, signe et variations lus sur un graphique, droites : tracer, lire
  l'équation réduite, coefficient directeur) et « Statistiques » (lire un graphique, indicateurs).
  video : vidéos de la chaîne et d'Yvan Monka. Générateurs : préfixe yc- dans assets/exercices-techno.js ; figures "yc-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["techno-calcul-graphiques"] = {
  niveau: "Première technologique",
  numero: 4,
  titre: "Automatismes : calcul, fonctions et graphiques",
  accroche: "Les réflexes de l'année : produit nul, tableau de signes, développer et factoriser, lire une courbe ou une droite, moyenne et médiane.",

  playlist: "",
  drive: "",
  pdfs: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Équation produit nul",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation-produit", youtube: "https://youtu.be/4CWk30Ypj04" },
      texte:
        "**Un produit est nul si et seulement si l'un au moins de ses facteurs est nul.**\n\n" +
        "Pour résoudre $(2x - 6)(x + 5) = 0$ : $2x - 6 = 0$ ou $x + 5 = 0$, soit $x = 3$ ou $x = -5$. On écrit $S = \\{-5\\,;3\\}$.\n\n" +
        "Quand l'équation n'est pas déjà un produit, on **factorise** d'abord : $x^2 - 7x = 0$ s'écrit $x(x - 7) = 0$, d'où $x = 0$ ou $x = 7$. On ne divise jamais par $x$ : on perdrait la solution $0$.",
      exemple: {
        enonce: "Résous $3x^2 = 12x$.",
        solution: "$3x^2 - 12x = 0$, soit $3x(x - 4) = 0$ : $x = 0$ ou $x = 4$. $S = \\{0\\,;4\\}$."
      }
    },
    {
      titre: "Signe d'une expression : tableau de signes",
      figure: "yc-cours-signe",
      video: { titre: "Vidéo d'Yvan Monka : dresser un tableau de signes", youtube: "https://youtu.be/50CByVTP4ig" },
      texte:
        "**Premier degré.** $ax + b$ s'annule en $x = -\\dfrac{b}{a}$. Si $a > 0$, l'expression est négative avant cette valeur et positive après ; si $a < 0$, c'est l'inverse. Moyen mnémotechnique : « signe de $-a$ avant la racine, signe de $a$ après ».\n\n" +
        "**Produit de facteurs du premier degré.** On dresse un **tableau de signes** : une ligne par facteur, puis la ligne du produit avec la règle des signes. Pour $(x + 1)(x - 3)$ : racines $-1$ et $3$ ; le produit est positif à l'extérieur des racines et négatif entre les deux.\n\n" +
        "Ce tableau sert à résoudre les inéquations comme $(x + 1)(x - 3) \\leqslant 0$ : $S = [-1\\,;3]$.",
      exemple: {
        enonce: "Pour quelles valeurs de $x$ a-t-on $(2x - 4)(x + 1) > 0$ ?",
        solution: "Racines $2$ et $-1$. Les deux coefficients de $x$ sont positifs : le produit est positif à l'extérieur. $S = ]-\\infty\\,;-1[ \\cup ]2\\,;+\\infty[$."
      }
    },
    {
      titre: "Développer, factoriser, réduire",
      video: { titre: "Vidéo de ton prof : développer et factoriser avec les identités remarquables", youtube: "https://youtu.be/zrIo7AksY5o" },
      texte:
        "**Développer** : transformer un produit en somme. Simple distributivité $k(a + b) = ka + kb$ ; double distributivité $(a + b)(c + d) = ac + ad + bc + bd$.\n\n" +
        "**Identités remarquables** : $(a + b)^2 = a^2 + 2ab + b^2$, $(a - b)^2 = a^2 - 2ab + b^2$, $(a + b)(a - b) = a^2 - b^2$.\n\n" +
        "**Réduire** : regrouper les termes de même nature ($x^2$ avec $x^2$, $x$ avec $x$, constantes entre elles).\n\n" +
        "**Factoriser** : transformer une somme en produit, en repérant un **facteur commun** ($3x^2 + 12x = 3x(x + 4)$ ; $(x + 2)(x - 1) + 5(x + 2) = (x + 2)(x + 4)$) ou une identité remarquable ($x^2 - 25 = (x - 5)(x + 5)$).",
      exemple: {
        enonce: "Développe et réduis $(3x - 2)(x + 4)$.",
        solution: "$3x \\times x + 3x \\times 4 - 2 \\times x - 2 \\times 4 = 3x^2 + 12x - 2x - 8 = 3x^2 + 10x - 8$."
      }
    },
    {
      titre: "Résoudre graphiquement $f(x) = k$ et $f(x) < k$",
      figure: "yc-cours-graphique",
      video: { titre: "Vidéo d'Yvan Monka : résoudre graphiquement une équation et une inéquation", youtube: "https://youtu.be/OCq4-nDmSrI" },
      texte:
        "Sur la courbe $C_f$ :\n\n" +
        "- les solutions de $f(x) = k$ sont les **abscisses** des points de $C_f$ d'ordonnée $k$ : on trace la droite horizontale $y = k$ et on lit les abscisses des intersections ;\n" +
        "- les solutions de $f(x) < k$ sont les abscisses des points où la courbe est **en dessous** de cette droite ; pour $f(x) > k$, au-dessus.\n\n" +
        "Sur la figure, $f(x) = 2$ a pour solutions $-1$ et $3$, et $f(x) < 2$ a pour ensemble de solutions $]-1\\,;3[$.\n\n" +
        "**Signe** : $f(x) > 0$ quand la courbe est au-dessus de l'axe des abscisses. **Variations** : $f$ est croissante là où la courbe monte (de gauche à droite), décroissante là où elle descend ; les intervalles se lisent sur l'axe des **abscisses**.",
      exemple: {
        enonce: "Avec la figure, résous $f(x) \\geqslant 2$.",
        solution: "La courbe est au-dessus de la droite $y = 2$ avant $-1$ et après $3$ (bornes comprises) : $S = ]-\\infty\\,;-1] \\cup [3\\,;+\\infty[$."
      }
    },
    {
      titre: "Droites : équation réduite, coefficient directeur",
      figure: "yc-cours-droite",
      video: { titre: "Vidéo d'Yvan Monka : déterminer graphiquement une fonction affine", youtube: "https://youtu.be/OnnrfqztpTY" },
      texte:
        "Une droite non verticale a une **équation réduite** $y = mx + p$ :\n\n" +
        "- $p$ est l'**ordonnée à l'origine** : la droite passe par $(0\\,;p)$ ;\n" +
        "- $m$ est le **coefficient directeur** (la pente) : quand $x$ augmente de $1$, $y$ augmente de $m$ (il diminue si $m < 0$).\n\n" +
        "**Tracer** $y = 2x - 1$ : placer $(0\\,;-1)$, puis avancer de $1$ et monter de $2$ pour obtenir $(1\\,;1)$, et joindre.\n\n" +
        "**Lire** $m$ et $p$ : $p$ sur l'axe des ordonnées, $m$ en comptant la variation de $y$ pour un pas de $1$ en $x$.\n\n" +
        "**Par deux points** $A(x_A\\,;y_A)$ et $B(x_B\\,;y_B)$ : $m = \\dfrac{y_B - y_A}{x_B - x_A}$.",
      exemple: {
        enonce: "Coefficient directeur de la droite passant par $A(2\\,;5)$ et $B(6\\,;-3)$ ?",
        solution: "$m = \\dfrac{-3 - 5}{6 - 2} = \\dfrac{-8}{4} = -2$."
      }
    },
    {
      titre: "Statistiques : lire un graphique, indicateurs",
      figure: "yc-cours-barres",
      video: { titre: "Vidéo de ton prof : indicateurs statistiques, moyenne, médiane, quartiles", youtube: "https://youtu.be/ncb1y7IwBZA" },
      texte:
        "Pour lire un diagramme (barres, histogramme, circulaire, boîte) : repérer l'origine des axes, les unités et l'échelle, puis passer des hauteurs aux nombres, et inversement.\n\n" +
        "**Moyenne** $= \\dfrac{\\text{somme des valeurs}}{\\text{effectif total}}$ (avec des effectifs : $\\dfrac{\\sum n_i x_i}{N}$).\n\n" +
        "**Médiane** : on range les valeurs dans l'ordre croissant ; c'est la valeur du milieu (effectif impair) ou la moyenne des deux valeurs centrales (effectif pair). La moitié des valeurs lui est inférieure.\n\n" +
        "**Étendue** $=$ maximum $-$ minimum. Les quartiles $Q_1$ et $Q_3$ partagent la série en quarts ; l'écart interquartile $Q_3 - Q_1$ mesure la dispersion de la moitié centrale.",
      exemple: {
        enonce: "Sur le diagramme, combien d'élèves viennent en voiture ou en scooter ? Quelle proportion sur l'ensemble ?",
        solution: "$12 + 10 = 22$ élèves sur $6 + 12 + 9 + 3 + 10 = 40$, soit $\\dfrac{22}{40} = 55\\,\\%$."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "yc-produit-nul", titre: "Équation produit nul", etape: "Calcul", nb: 5 },
    { type: "yc-signe", titre: "Signe d'une expression", etape: "Calcul", nb: 5 },
    { type: "yc-developper", titre: "Développer, factoriser, réduire", etape: "Calcul", nb: 5 },
    { type: "yc-graphique", titre: "Lire une courbe : équations et inéquations", etape: "Graphiques", nb: 5 },
    { type: "yc-variations", titre: "Variations et extremum sur une courbe", etape: "Graphiques", nb: 4 },
    { type: "yc-droite", titre: "Droites : équation réduite et pente", etape: "Graphiques", nb: 5 },
    { type: "yc-stats", titre: "Lire un diagramme, moyenne et médiane", etape: "Statistiques", nb: 5 },
    { type: "yc-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Les solutions de $(x - 4)(2x + 6) = 0$ sont :", choix: ["$4$ et $-3$", "$4$ et $3$", "$-4$ et $-3$", "$4$ et $-6$"], bonne: 0, explication: "$x - 4 = 0$ donne $4$ ; $2x + 6 = 0$ donne $-3$." },
    { question: "L'équation $x^2 = 5x$ a pour solutions :", choix: ["$0$ et $5$", "$5$ seulement", "$0$ seulement", "$\\sqrt{5}$ et $-\\sqrt{5}$"], bonne: 0, explication: "$x^2 - 5x = x(x - 5) = 0$. Diviser par $x$ ferait perdre la solution $0$." },
    { question: "$3x - 12$ est strictement positif pour :", choix: ["$x > 4$", "$x < 4$", "$x > -4$", "$x > 12$"], bonne: 0, explication: "$3x - 12 > 0 \\Leftrightarrow 3x > 12 \\Leftrightarrow x > 4$." },
    { question: "$-2x + 10$ est strictement positif pour :", choix: ["$x < 5$", "$x > 5$", "$x < -5$", "$x > -5$"], bonne: 0, explication: "Coefficient négatif : l'expression est positive avant la racine $5$." },
    { question: "$(x - 2)(x - 6)$ est négatif pour :", choix: ["$x \\in ]2\\,;6[$", "$x < 2$", "$x > 6$", "$x \\in ]-2\\,;6[$"], bonne: 0, explication: "Produit de deux facteurs à coefficients positifs : négatif entre les racines." },
    { question: "$(x + 3)(5 - x) \\geqslant 0$ a pour solutions :", choix: ["$[-3\\,;5]$", "$]-\\infty\\,;-3] \\cup [5\\,;+\\infty[$", "$[3\\,;5]$", "$[-5\\,;3]$"], bonne: 0, explication: "Racines $-3$ et $5$ ; le facteur $5 - x$ a un coefficient négatif, le produit est positif entre les racines." },
    { question: "$(x + 3)(x - 2)$ développé et réduit donne :", choix: ["$x^2 + x - 6$", "$x^2 - x - 6$", "$x^2 + 6$", "$x^2 + 5x - 6$"], bonne: 0, explication: "$x^2 - 2x + 3x - 6 = x^2 + x - 6$." },
    { question: "$(2x - 1)^2$ vaut :", choix: ["$4x^2 - 4x + 1$", "$4x^2 + 1$", "$4x^2 - 1$", "$2x^2 - 4x + 1$"], bonne: 0, explication: "$(a - b)^2 = a^2 - 2ab + b^2$ avec $a = 2x$, $b = 1$." },
    { question: "$x^2 - 49$ se factorise en :", choix: ["$(x - 7)(x + 7)$", "$(x - 7)^2$", "$(x - 49)(x + 1)$", "$x(x - 49)$"], bonne: 0, explication: "$a^2 - b^2 = (a - b)(a + b)$." },
    { question: "$4x^2 + 12x$ se factorise en :", choix: ["$4x(x + 3)$", "$4(x + 3)$", "$x(4x + 12x)$", "$4x(x + 12)$"], bonne: 0, explication: "Facteur commun $4x$ : $4x \\times x + 4x \\times 3$." },
    { question: "$(x + 1)(x - 5) + 2(x + 1)$ se factorise en :", choix: ["$(x + 1)(x - 3)$", "$(x + 1)(x - 7)$", "$(x + 1)(2x - 5)$", "$(x + 1)^2(x - 5)$"], bonne: 0, explication: "$(x + 1)\\,[(x - 5) + 2] = (x + 1)(x - 3)$." },
    { question: "Graphiquement, les solutions de $f(x) = 3$ sont :", choix: ["les abscisses des points de la courbe d'ordonnée $3$", "les ordonnées des points d'abscisse $3$", "$f(3)$", "les points de la courbe"], bonne: 0, explication: "On trace $y = 3$ et on lit les abscisses des intersections." },
    { question: "Les solutions de $f(x) < k$ sont les abscisses des points où la courbe est :", choix: ["en dessous de la droite $y = k$", "au-dessus de la droite $y = k$", "à gauche de la droite $x = k$", "sur la droite $y = k$"], bonne: 0, explication: "$f(x) < k$ : ordonnée plus petite que $k$, donc en dessous." },
    { question: "$f(x) > 0$ quand la courbe est :", choix: ["au-dessus de l'axe des abscisses", "à droite de l'axe des ordonnées", "en dessous de l'axe des abscisses", "croissante"], bonne: 0, explication: "Ordonnée positive $=$ point au-dessus de l'axe horizontal." },
    { question: "Une fonction est croissante sur un intervalle quand sa courbe :", choix: ["monte quand on la lit de gauche à droite", "est au-dessus de l'axe des abscisses", "descend", "passe par l'origine"], bonne: 0, explication: "Croissante : plus $x$ augmente, plus $f(x)$ augmente." },
    { question: "La droite $y = -3x + 2$ passe par :", choix: ["$(0\\,;2)$ et $(1\\,;-1)$", "$(0\\,;-3)$ et $(1\\,;2)$", "$(2\\,;0)$", "$(0\\,;2)$ et $(1\\,;5)$"], bonne: 0, explication: "Ordonnée à l'origine $2$ ; en avançant de $1$, on descend de $3$." },
    { question: "Une droite passe par $(1\\,;4)$ et $(3\\,;10)$. Son coefficient directeur est :", choix: ["$3$", "$\\dfrac{1}{3}$", "$6$", "$-3$"], bonne: 0, explication: "$\\dfrac{10 - 4}{3 - 1} = \\dfrac{6}{2} = 3$." },
    { question: "Une droite passe par $(0\\,;5)$ et $(2\\,;1)$. Son équation réduite est :", choix: ["$y = -2x + 5$", "$y = 2x + 5$", "$y = -2x + 1$", "$y = 5x - 2$"], bonne: 0, explication: "$p = 5$ et $m = \\dfrac{1 - 5}{2 - 0} = -2$." },
    { question: "Si le coefficient directeur est négatif, la droite :", choix: ["descend quand on la lit de gauche à droite", "monte", "est horizontale", "est verticale"], bonne: 0, explication: "$m < 0$ : $y$ diminue quand $x$ augmente." },
    { question: "La moyenne de $8$ ; $12$ ; $10$ ; $14$ est :", choix: ["$11$", "$10$", "$12$", "$44$"], bonne: 0, explication: "$\\dfrac{44}{4} = 11$." },
    { question: "La médiane de $5$ ; $2$ ; $9$ ; $7$ ; $4$ ; $6$ est :", choix: ["$5{,}5$", "$9$", "$5$", "$7$"], bonne: 0, explication: "Rangée : $2$ ; $4$ ; $5$ ; $6$ ; $7$ ; $9$ : moyenne de $5$ et $6$." },
    { question: "L'étendue de la série $3$ ; $11$ ; $7$ ; $15$ ; $8$ est :", choix: ["$12$", "$15$", "$8$", "$7$"], bonne: 0, explication: "$15 - 3 = 12$." },
    { question: "Sur un diagramme en barres, la valeur d'une catégorie se lit :", choix: ["sur la hauteur de sa barre", "sur la largeur de sa barre", "sur sa position de gauche à droite", "sur le titre"], bonne: 0, explication: "La hauteur se reporte sur l'axe vertical gradué." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Résoudre une équation produit nul",
      etapes: [
        "Mettre tout dans un seul membre ($= 0$) et factoriser si besoin.",
        "Écrire : « un produit est nul si et seulement si l'un des facteurs est nul ».",
        "Résoudre chaque équation du premier degré.",
        "Donner l'ensemble des solutions $S = \\{\\dots\\}$."
      ],
      exemple: "$(x + 2)(3x - 9) = 0$ : $x = -2$ ou $x = 3$."
    },
    {
      titre: "Dresser un tableau de signes",
      figure: "yc-cours-signe",
      etapes: [
        "Trouver la racine de chaque facteur $ax + b$ ($x = -b/a$) et les placer dans l'ordre sur la première ligne.",
        "Pour chaque facteur : signe de $-a$ avant la racine, $0$ à la racine, signe de $a$ après.",
        "Ligne du produit : règle des signes colonne par colonne.",
        "Lire l'ensemble solution de l'inéquation (bornes comprises pour $\\leqslant$ et $\\geqslant$)."
      ],
      exemple: "$(x - 1)(4 - x) \\geqslant 0$ : racines $1$ et $4$, produit positif entre : $S = [1\\,;4]$."
    },
    {
      titre: "Résoudre graphiquement",
      figure: "yc-cours-graphique",
      etapes: [
        "Tracer la droite horizontale $y = k$.",
        "$f(x) = k$ : lire les **abscisses** des points d'intersection.",
        "$f(x) < k$ : repérer où la courbe est en dessous, écrire un intervalle (bornes exclues si strict).",
        "$f(x) > k$ : où la courbe est au-dessus."
      ],
      exemple: "Courbe en dessous de $y = 2$ entre $-1$ et $3$ : $f(x) < 2 \\Leftrightarrow x \\in ]-1\\,;3[$."
    },
    {
      titre: "Tracer ou lire une droite",
      figure: "yc-cours-droite",
      etapes: [
        "Tracer $y = mx + p$ : placer $(0\\,;p)$, avancer de $1$ et varier de $m$, joindre.",
        "Lire $p$ : ordonnée du point sur l'axe vertical.",
        "Lire $m$ : variation de $y$ pour un pas de $1$ en $x$ (ou $\\dfrac{\\Delta y}{\\Delta x}$ entre deux points de la grille).",
        "Par deux points : $m = \\dfrac{y_B - y_A}{x_B - x_A}$ puis $p = y_A - m x_A$."
      ],
      exemple: "$A(1\\,;3)$, $B(4\\,;9)$ : $m = 2$, $p = 3 - 2 \\times 1 = 1$, droite $y = 2x + 1$."
    }
  ],
  erreurs: [
    "Diviser par $x$ dans $x^2 = 5x$ : on perd la solution $x = 0$.",
    "Oublier le signe du coefficient $a$ dans le signe de $ax + b$ : $-2x + 6$ est positif **avant** $3$.",
    "Croire qu'un produit est négatif « partout entre les racines » même quand un coefficient est négatif : refaire le tableau.",
    "Écrire $(x + 3)^2 = x^2 + 9$ : il manque le double produit $6x$.",
    "Résoudre $f(x) < k$ en lisant les ordonnées : les solutions sont des **abscisses**.",
    "Donner les variations avec des ordonnées : les intervalles se lisent sur l'axe des abscisses.",
    "Inverser $\\dfrac{y_B - y_A}{x_B - x_A}$ ou mélanger l'ordre des points.",
    "Calculer la médiane sans ranger les valeurs."
  ]
};
