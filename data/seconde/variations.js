/*
  CHAPITRE : Seconde — Variations et extremums ; fonctions carré et valeur absolue
  ---------------------------------------------------------------------------------
  Chapitre 9 de la progression spiralée 2026-2027 (programme de Seconde 2026).
  L'identifiant « seconde-variations » est gardé pour conserver la progression des élèves.
  Les fonctions affines sont au chapitre 6 ; inverse, racine carrée et cube au chapitre 13.
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Figures disponibles : "tabvar-exemple", "courbe-carre", "courbe-absolue", "enclos".
  Générateurs : var- (lecture de courbes et de tableaux) et vx- dans assets/exercices.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-variations"] = {
  niveau: "Seconde",
  numero: 9,
  titre: "Variations et extremums ; fonctions carré et valeur absolue",
  accroche: "Une courbe qui monte, qui descend, un maximum, un minimum : décrire une fonction en un coup d'œil, connaître la parabole et le « V », puis trouver l'enclos de cabris le plus grand.",

  playlist: "", // lien de la playlist YouTube du chapitre
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur les variations en vidéo (Yvan Monka)", url: "https://youtu.be/i8aYSIidNlk", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Fonction croissante, fonction décroissante",
      video: { titre: "Vidéo d'Yvan Monka : déterminer les variations d'une fonction", youtube: "https://youtu.be/zHYaPOWi4Iw" },
      texte:
        "Soit $f$ une fonction définie sur un intervalle $I$.\n\n" +
        "- $f$ est **croissante** sur $I$ si, pour tous $a$ et $b$ de $I$ : $a < b \\Rightarrow f(a) \\leqslant f(b)$. Les images sont rangées **dans le même ordre** que les nombres : la courbe **monte**.\n" +
        "- $f$ est **décroissante** sur $I$ si, pour tous $a$ et $b$ de $I$ : $a < b \\Rightarrow f(a) \\geqslant f(b)$. L'ordre est **inversé** : la courbe **descend**.\n" +
        "- $f$ est **monotone** sur $I$ si elle est croissante sur tout $I$, ou décroissante sur tout $I$.\n" +
        "- On lit toujours la courbe **de gauche à droite**, et les intervalles se lisent sur l'axe des **abscisses**.\n\n" +
        "Le mot « pour tous » est important : une propriété vérifiée sur deux exemples ne prouve pas que $f$ est croissante.",
      exemple: {
        enonce: "$f$ est croissante sur $[1\\,;6]$. Comparer $f(2)$ et $f(5)$.",
        solution: "$2 < 5$ et $f$ est croissante sur $[1\\,;6]$, donc $f(2) \\leqslant f(5)$."
      }
    },
    {
      titre: "Tableau de variations, maximum et minimum",
      video: { titre: "Vidéo d'Yvan Monka : dresser un tableau de variations", youtube: "https://youtu.be/yGqqoBMq8Fw" },
      texte:
        "- Un **tableau de variations** résume le sens de variation : sur la première ligne les valeurs de $x$, sur la seconde des flèches qui montent ou descendent, avec les valeurs de $f(x)$ au bout des flèches.\n" +
        "- Le **maximum** de $f$ sur $I$ est la plus grande valeur de $f(x)$ ; le **minimum** est la plus petite. Ce sont des valeurs de $f(x)$, lues sur l'axe **vertical**.\n" +
        "- On dit qu'un maximum est **atteint** en une valeur de $x$ : « le maximum $2$ est atteint en $x = -3$ ».",
      figure: "tabvar-exemple",
      exemple: {
        enonce: "D'après le tableau ci-contre, quels sont le maximum et le minimum de $f$ sur $[-3\\,;4]$ ?",
        solution: "Le minimum est $-4$, atteint en $x = 1$. Le maximum est $3$, atteint en $x = 4$ (il faut comparer $2$ et $3$, les deux extrémités hautes)."
      }
    },
    {
      titre: "La fonction carré",
      video: { titre: "Vidéo d'Yvan Monka : étudier les variations de la fonction carré", youtube: "https://youtu.be/B3mM6LYdsF8" },
      texte:
        "La fonction carré est définie sur $\\mathbb{R}$ par $f(x) = x^2$. Sa courbe est une **parabole**, symétrique par rapport à l'axe des ordonnées.\n\n" +
        "- Elle est **positive** : $x^2 \\geqslant 0$ pour tout réel $x$.\n" +
        "- Elle est **décroissante** sur $]-\\infty\\,;0]$ et **croissante** sur $[0\\,;+\\infty[$ ; son minimum est $0$, atteint en $x = 0$.\n" +
        "- Attention : « $a < b$ donc $a^2 < b^2$ » est **faux** en général. Contre-exemple : $-3 < 2$ mais $9 > 4$.",
      figure: "courbe-carre",
      exemple: {
        enonce: "Comparer $(-3{,}1)^2$ et $(-2{,}7)^2$ sans les calculer.",
        solution: "$-3{,}1 < -2{,}7 \\leqslant 0$ et la fonction carré est décroissante sur $]-\\infty\\,;0]$ : l'ordre s'inverse, donc $(-3{,}1)^2 > (-2{,}7)^2$."
      }
    },
    {
      titre: "Démonstration : variations de la fonction carré",
      video: { titre: "Vidéo d'Yvan Monka : démontrer les variations de la fonction carré", youtube: "https://youtu.be/gu2QnY8_9xk" },
      texte:
        "**Propriété** : la fonction carré est croissante sur $[0\\,;+\\infty[$.\n\n" +
        "**Démonstration**. Soit $a$ et $b$ deux réels tels que $0 \\leqslant a < b$.\n" +
        "- $b^2 - a^2 = (b - a)(b + a)$ (identité remarquable).\n" +
        "- $b - a > 0$ car $a < b$, et $b + a > 0$ car $a \\geqslant 0$ et $b > 0$.\n" +
        "- Le produit de deux nombres positifs est positif : $b^2 - a^2 > 0$, donc $a^2 < b^2$.\n\n" +
        "Les images sont rangées dans le même ordre : la fonction carré est croissante sur $[0\\,;+\\infty[$. Sur $]-\\infty\\,;0]$, $b + a < 0$ et l'ordre s'inverse : elle est décroissante.",
      exemple: {
        enonce: "Pourquoi la démonstration ne marche-t-elle pas si $a = -5$ et $b = 1$ ?",
        solution: "Alors $b + a = -4 < 0$ : le produit $(b - a)(b + a)$ est négatif, donc $b^2 < a^2$ ($1 < 25$). La fonction carré n'est pas croissante sur $\\mathbb{R}$ entier."
      }
    },
    {
      titre: "La fonction valeur absolue",
      video: { titre: "Vidéo d'Yvan Monka : encadrer avec les variations de la valeur absolue", youtube: "https://youtu.be/iOxgSgDQ-3Y" },
      texte:
        "La fonction valeur absolue est définie sur $\\mathbb{R}$ par $f(x) = |x|$, la **distance** entre $x$ et $0$ (vue au chapitre 1).\n\n" +
        "- $|x| = x$ si $x \\geqslant 0$ et $|x| = -x$ si $x < 0$ : par exemple $\\lvert -5 \\rvert = 5$.\n" +
        "- Elle est **positive**, **décroissante** sur $]-\\infty\\,;0]$ et **croissante** sur $[0\\,;+\\infty[$ ; son minimum est $0$, en $x = 0$.\n" +
        "- Sa courbe est un **V** formé de deux demi-droites, de sommet l'origine, symétrique par rapport à l'axe des ordonnées.",
      figure: "courbe-absolue",
      exemple: {
        enonce: "Résoudre $|x| = 4$, puis encadrer $|x|$ pour $-3 \\leqslant x \\leqslant 2$.",
        solution: "$|x| = 4$ : les nombres à la distance $4$ de $0$ sont $-4$ et $4$.\n\nSur $[-3\\,;2]$, le minimum de $|x|$ est $0$ (en $0$) et le maximum est $3$ (en $-3$) : $0 \\leqslant |x| \\leqslant 3$."
      }
    },
    {
      titre: "Résoudre $x^2 = k$ et $x^2 < k$",
      texte:
        "On lit les solutions sur la parabole, en traçant la droite horizontale $y = k$.\n\n" +
        "- $x^2 = k$ : aucune solution si $k < 0$ ; une seule ($0$) si $k = 0$ ; deux solutions $-\\sqrt{k}$ et $\\sqrt{k}$ si $k > 0$.\n" +
        "- Pour $k > 0$ : $x^2 < k \\iff -\\sqrt{k} < x < \\sqrt{k}$ (la parabole est **sous** la droite).\n" +
        "- Pour $k > 0$ : $x^2 > k \\iff x < -\\sqrt{k}$ ou $x > \\sqrt{k}$ (la parabole est **au-dessus**).\n\n" +
        "Erreur classique : $x^2 < 9$ ne donne pas « $x < 3$ » seulement ; $-5 < 3$ mais $(-5)^2 = 25 > 9$.",
      figure: "courbe-carre",
      exemple: {
        enonce: "Résoudre $x^2 \\leqslant 4$ puis $x^2 > 4$.",
        solution: "$x^2 = 4$ pour $x = -2$ ou $x = 2$ (points marqués sur la figure).\n\n$x^2 \\leqslant 4 \\iff x \\in [-2\\,;2]$.\n\n$x^2 > 4 \\iff x \\in \\,]-\\infty\\,;-2[ \\cup \\,]2\\,;+\\infty[$."
      }
    },
    {
      titre: "Problème d'optimisation",
      video: { titre: "Vidéo de ton prof : modéliser par une fonction, l'enclos", youtube: "https://youtu.be/LeM5BO2az9w" },
      texte:
        "**Optimiser**, c'est chercher la valeur de $x$ qui rend une quantité (aire, coût, bénéfice) la plus grande ou la plus petite possible.\n\n" +
        "- On exprime la quantité en fonction de $x$ : $A(x) = \\ldots$, en précisant les valeurs possibles de $x$.\n" +
        "- On cherche le maximum (ou le minimum) : avec un tableau de valeurs, la courbe sur la calculatrice, ou par le calcul.\n" +
        "- Pour une parabole qui s'annule en deux valeurs, l'extremum est **au milieu**, par symétrie.",
      figure: "enclos",
      exemple: {
        enonce: "Avec $40$ m de grillage, on fait un enclos rectangulaire. Quelle largeur $x$ donne la plus grande aire ?",
        solution: "Demi-périmètre : $20$ m, donc la longueur vaut $20 - x$ et $A(x) = x(20 - x)$ pour $x \\in [0\\,;20]$.\n\n$A$ s'annule en $0$ et en $20$ : le maximum est au milieu, $x = 10$. C'est un carré de $10$ m de côté, d'aire $100$ m²."
      }
    },
    {
      titre: "Python : approcher un extremum",
      texte:
        "**Balayage** : on calcule $f(x)$ pour $x$ allant de $a$ à $b$ avec un petit **pas**, et on garde la plus grande valeur.\n\n" +
        "```python\ndef balayage(f, a, b, pas):\n    x = a\n    meilleur_x = a\n    while x <= b:\n        if f(x) > f(meilleur_x):\n            meilleur_x = x\n        x = x + pas\n    return meilleur_x\n```\n\n" +
        "**Dichotomie** (pour une fonction qui monte puis descend) : on coupe l'intervalle en deux et on garde la moitié où la fonction monte encore. À chaque tour, l'intervalle est divisé par $2$ : c'est beaucoup plus rapide.",
      exemple: {
        enonce: "Avec $f(x) = x(20 - x)$, que renvoie $\\texttt{balayage(f, 0, 20, 1)}$ ?",
        solution: "Les valeurs augmentent jusqu'à $f(10) = 100$, puis diminuent : la fonction renvoie $10$."
      }
    }
  ],

  videos: [
    { titre: "#16 Lire un graphique : images et antécédents", type: "Lecture graphique", youtube: "https://youtu.be/SSnZlcRgllg" },
    { titre: "Encadrer avec les variations de la fonction carré (Yvan Monka)", type: "Fonction carré", youtube: "https://youtu.be/yRPU-ygcjZ4" }
  ],
  videosNote: "La première vidéo est celle de ton prof (énoncé dans le dossier élève des automatismes) ; la seconde est d'Yvan Monka.",

  /* ---------- 2. EXERCICES ---------- */
  exercices: [
    { type: "var-intervalle", titre: "Lire où la courbe monte ou descend", etape: "Sens de variation", nb: 5 },
    { type: "var-extremum", titre: "Lire un maximum ou un minimum", etape: "Sens de variation", nb: 5 },
    { type: "var-tableau", titre: "Utiliser un tableau de variations", etape: "Sens de variation", nb: 5 },
    { type: "vx-comparer", titre: "Comparer des carrés, des valeurs absolues", etape: "Carré et valeur absolue", nb: 5 },
    { type: "vx-equation", titre: "Résoudre x² = k et |x| = k", etape: "Carré et valeur absolue", nb: 5 },
    { type: "vx-inequation-carre", titre: "Résoudre x² < k, x² > k", etape: "Carré et valeur absolue", nb: 5 },
    { type: "vx-optimisation", titre: "L'enclos le plus grand", etape: "Optimisation", nb: 3 },
    { type: "vx-python", titre: "Python : balayage", etape: "Optimisation", nb: 3 }
  ],

  /* ---------- 3. QCM ---------- */
  qcm: [
    {
      question: "$f$ est décroissante sur $[0\\,;5]$. Alors $f(1)$ et $f(4)$ vérifient :",
      choix: ["$f(1) \\leqslant f(4)$", "$f(1) \\geqslant f(4)$", "$f(1) = f(4)$", "On ne peut pas savoir"],
      bonne: 1,
      explication: "Décroissante : l'ordre s'inverse. $1 < 4$ donc $f(1) \\geqslant f(4)$."
    },
    {
      question: "Le maximum d'une fonction se lit…",
      choix: ["sur l'axe des abscisses", "sur l'axe des ordonnées", "à l'origine du repère", "sur la première ligne du tableau de variations"],
      bonne: 1,
      explication: "Le maximum est une valeur de $f(x)$ : c'est une ordonnée. L'abscisse indique seulement où il est atteint."
    },
    {
      question: "Combien de solutions a l'équation $x^2 = 7$ ?",
      choix: ["aucune", "une", "deux", "une infinité"],
      bonne: 2,
      explication: "$7 > 0$ : deux solutions, $-\\sqrt{7}$ et $\\sqrt{7}$."
    },
    {
      question: "Sans calculer : $(-1{,}5)^2$ … $(-2)^2$",
      choix: ["$<$", "$>$", "$=$"],
      bonne: 0,
      explication: "$-2 < -1{,}5 \\leqslant 0$ et le carré est décroissant sur $]-\\infty\\,;0]$ : $(-2)^2 > (-1{,}5)^2$, soit $2{,}25 < 4$."
    },
    {
      question: "« Si $a < b$, alors $a^2 < b^2$ » est :",
      choix: ["fausse : $-3 < 1$ mais $9 > 1$", "toujours vraie", "vraie seulement si $a$ et $b$ sont négatifs", "vraie car la fonction carré est croissante"],
      bonne: 0,
      explication: "Un seul contre-exemple suffit. La fonction carré n'est croissante que sur $[0\\,;+\\infty[$."
    },
    {
      question: "L'ensemble des solutions de $x^2 < 16$ est :",
      choix: ["$]-4\\,;4[$", "$]-\\infty\\,;4[$", "$]4\\,;+\\infty[$", "$]-16\\,;16[$"],
      bonne: 0,
      explication: "La parabole est sous la droite $y = 16$ entre $-4$ et $4$ (exclus)."
    },
    {
      question: "L'équation $|x| = -2$ a pour solutions…",
      choix: ["$-2$ et $2$", "$-2$", "$2$", "aucune"],
      bonne: 3,
      explication: "$|x|$ est une distance, donc toujours positive : aucune solution."
    },
    {
      question: "Pour $-5 \\leqslant x \\leqslant 3$, on a :",
      choix: ["$0 \\leqslant x^2 \\leqslant 25$", "$9 \\leqslant x^2 \\leqslant 25$", "$-25 \\leqslant x^2 \\leqslant 9$", "$0 \\leqslant x^2 \\leqslant 9$"],
      bonne: 0,
      explication: "$0$ est dans l'intervalle, donc le minimum de $x^2$ est $0$. Le maximum est atteint à l'extrémité la plus éloignée de $0$ : $(-5)^2 = 25$."
    },
    {
      question: "Un rectangle a un périmètre de $24$ cm. Son aire est maximale quand :",
      choix: ["c'est un carré de côté $6$ cm", "sa largeur vaut $12$ cm", "sa largeur vaut $1$ cm", "sa longueur vaut le double de sa largeur"],
      bonne: 0,
      explication: "$A(x) = x(12 - x)$ s'annule en $0$ et $12$ : le maximum est au milieu, $x = 6$, d'où un carré d'aire $36$ cm²."
    },
    {
      question: "La fonction valeur absolue est…",
      choix: ["décroissante puis croissante, avec un minimum $0$ en $0$", "croissante sur $\\mathbb{R}$", "décroissante sur $\\mathbb{R}$", "négative pour $x < 0$"],
      bonne: 0,
      explication: "$|x|$ est une distance : toujours positive, minimale ($0$) en $0$, décroissante sur $]-\\infty\\,;0]$, croissante sur $[0\\,;+\\infty[$."
    }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Dresser un tableau de variations à partir d'une courbe",
      etapes: [
        "Lis la courbe de gauche à droite et repère les points où elle change de sens.",
        "Première ligne : l'abscisse du début, celles des changements de sens, celle de la fin.",
        "Seconde ligne : une flèche qui monte ou qui descend entre deux abscisses.",
        "Au bout de chaque flèche, écris l'ordonnée du point correspondant."
      ],
      exemple: "Une courbe qui descend de $(-3\\,;2)$ à $(1\\,;-4)$ puis monte jusqu'à $(4\\,;3)$ donne : $x$ : $-3$, $1$, $4$ ; flèche vers le bas de $2$ à $-4$, puis vers le haut jusqu'à $3$."
    },
    {
      titre: "Comparer deux images sans calculer",
      etapes: [
        "Vérifie que les deux nombres sont dans un même intervalle où le sens de variation est connu.",
        "Range les deux nombres dans l'ordre croissant.",
        "Fonction croissante : les images sont dans le même ordre. Décroissante : dans l'ordre inverse.",
        "Conclus avec la bonne inégalité, en citant la fonction et l'intervalle."
      ],
      exemple: "$-3 < -2 \\leqslant 0$ et le carré est décroissant sur $]-\\infty\\,;0]$ : $(-3)^2 > (-2)^2$."
    },
    {
      titre: "Résoudre $x^2 < k$ ou $x^2 > k$",
      etapes: [
        "Si $k \\leqslant 0$, raisonne sur le signe d'un carré.",
        "Sinon, résous d'abord $x^2 = k$ : $-\\sqrt{k}$ et $\\sqrt{k}$.",
        "$x^2 < k$ : entre les deux. $x^2 > k$ : à l'extérieur (réunion de deux intervalles).",
        "Choisis les crochets selon que l'inégalité est stricte ou large."
      ],
      exemple: "$x^2 \\geqslant 9 \\iff x \\in \\,]-\\infty\\,;-3] \\cup [3\\,;+\\infty[$."
    },
    {
      titre: "Résoudre un problème d'optimisation",
      etapes: [
        "Choisir la variable $x$ et préciser ses valeurs possibles.",
        "Exprimer la quantité à optimiser en fonction de $x$.",
        "Trouver le maximum : tableau de valeurs, courbe ou symétrie de la parabole.",
        "Répondre à la question posée, avec l'unité."
      ],
      exemple: "$A(x) = x(20 - x)$ sur $[0\\,;20]$ : maximum $100$ m² pour $x = 10$ m."
    }
  ],
  erreurs: [
    "Lire un intervalle de variation sur l'axe des ordonnées : les intervalles sont des valeurs de $x$.",
    "Confondre le maximum (une valeur de $f(x)$) et l'endroit où il est atteint (une valeur de $x$).",
    "Oublier une solution : $x^2 = 9$ a deux solutions, $-3$ et $3$.",
    "Écrire $x^2 < 9 \\iff x < 3$ : il manque la condition $x > -3$.",
    "Comparer deux carrés de nombres négatifs comme s'ils étaient positifs : $-3 < -2$ mais $(-3)^2 > (-2)^2$.",
    "Encadrer $x^2$ en élevant seulement les bornes au carré quand $0$ est dans l'intervalle."
  ]
};
