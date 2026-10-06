/*
  CHAPITRE : Seconde — Variations et fonctions de référence
  ----------------------------------------------------------
  Programme de Seconde 2026 (BO n°14 du 2 avril 2026), partie Fonctions :
  variations et extremums, fonctions affines, fonctions de référence
  (carré, inverse, valeur absolue, racine carrée, cube).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Figures disponibles : "tabvar-exemple", "courbe-carre", "courbe-inverse", "courbe-absolue",
  "courbe-racine-cube", "x-et-x2".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-variations"] = {
  niveau: "Seconde",
  numero: 4,
  titre: "Variations et fonctions de référence",
  accroche: "Une courbe qui monte, qui descend, un maximum, un minimum : décrire une fonction en un coup d'œil, puis connaître par cœur les cinq fonctions de référence.",

  playlist: "", // lien de la playlist YouTube du chapitre
  drive: "",
  pdfs: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Fonction croissante, fonction décroissante",
      texte:
        "Soit $f$ une fonction définie sur un intervalle $I$.\n\n" +
        "- $f$ est **croissante** sur $I$ si, pour tous $a$ et $b$ de $I$ : $a < b \\Rightarrow f(a) \\leqslant f(b)$. Les images sont rangées **dans le même ordre** que les nombres : la courbe **monte**.\n" +
        "- $f$ est **décroissante** sur $I$ si, pour tous $a$ et $b$ de $I$ : $a < b \\Rightarrow f(a) \\geqslant f(b)$. L'ordre est **inversé** : la courbe **descend**.\n" +
        "- On lit toujours la courbe **de gauche à droite**, et les intervalles se lisent sur l'axe des **abscisses**.",
      exemple: {
        enonce: "$f$ est croissante sur $[1\\,;6]$. Comparer $f(2)$ et $f(5)$.",
        solution: "$2 < 5$ et $f$ est croissante sur $[1\\,;6]$, donc $f(2) \\leqslant f(5)$."
      }
    },
    {
      titre: "Tableau de variations, maximum et minimum",
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
      titre: "Fonctions affines : sens de variation et signe",
      texte:
        "Une fonction affine s'écrit $f(x) = mx + p$. Sa courbe est une droite.\n\n" +
        "- $m$ est le **taux d'accroissement** : quand $x$ augmente de $1$, $f(x)$ augmente de $m$. $p$ est l'**ordonnée à l'origine**.\n" +
        "- Si $m > 0$, $f$ est **croissante** sur $\\mathbb{R}$ ; si $m < 0$, $f$ est **décroissante** ; si $m = 0$, $f$ est constante.\n" +
        "- **Signe** : $f$ s'annule en $x_0 = -\\dfrac{p}{m}$. Si $m > 0$, $f(x)$ est négatif avant $x_0$ et positif après ; si $m < 0$, c'est l'inverse.",
      exemple: {
        enonce: "Donner le sens de variation et le signe de $f(x) = -2x + 6$.",
        solution: "$m = -2 < 0$ : $f$ est décroissante sur $\\mathbb{R}$.\n\n$-2x + 6 = 0 \\iff x = 3$. Donc $f(x) > 0$ pour $x < 3$ et $f(x) < 0$ pour $x > 3$."
      }
    },
    {
      titre: "La fonction carré",
      texte:
        "La fonction carré est définie sur $\\mathbb{R}$ par $f(x) = x^2$. Sa courbe est une **parabole**.\n\n" +
        "- Elle est **positive** : $x^2 \\geqslant 0$ pour tout réel $x$.\n" +
        "- Elle est **décroissante** sur $]-\\infty\\,;0]$ et **croissante** sur $[0\\,;+\\infty[$ ; son minimum est $0$, atteint en $x = 0$.\n" +
        "- Équation $x^2 = k$ : aucune solution si $k < 0$ ; une seule ($0$) si $k = 0$ ; deux solutions $-\\sqrt{k}$ et $\\sqrt{k}$ si $k > 0$.",
      figure: "courbe-carre",
      exemple: {
        enonce: "Comparer $(-3{,}1)^2$ et $(-2{,}7)^2$ sans les calculer.",
        solution: "$-3{,}1 < -2{,}7 \\leqslant 0$ et la fonction carré est décroissante sur $]-\\infty\\,;0]$ : l'ordre s'inverse, donc $(-3{,}1)^2 > (-2{,}7)^2$."
      }
    },
    {
      titre: "La fonction inverse",
      texte:
        "La fonction inverse est définie sur $\\mathbb{R}^* = ]-\\infty\\,;0[ \\cup ]0\\,;+\\infty[$ par $f(x) = \\dfrac{1}{x}$. Sa courbe est une **hyperbole** à deux branches.\n\n" +
        "- $0$ n'a pas d'image : on ne divise jamais par $0$. Et $\\dfrac{1}{x}$ n'est jamais égal à $0$.\n" +
        "- Elle est **décroissante** sur $]-\\infty\\,;0[$ et **décroissante** sur $]0\\,;+\\infty[$.\n" +
        "- $\\dfrac{1}{x}$ a le **signe de $x$** : négatif pour $x < 0$, positif pour $x > 0$.",
      figure: "courbe-inverse",
      exemple: {
        enonce: "Comparer $\\dfrac{1}{0{,}4}$ et $\\dfrac{1}{0{,}9}$.",
        solution: "$0 < 0{,}4 < 0{,}9$ et la fonction inverse est décroissante sur $]0\\,;+\\infty[$, donc $\\dfrac{1}{0{,}4} > \\dfrac{1}{0{,}9}$ (en effet $2{,}5 > 1{,}11\\ldots$)."
      }
    },
    {
      titre: "La fonction valeur absolue",
      texte:
        "La fonction valeur absolue est définie sur $\\mathbb{R}$ par $f(x) = |x|$, la **distance** entre $x$ et $0$.\n\n" +
        "- $|x| = x$ si $x \\geqslant 0$ et $|x| = -x$ si $x < 0$ : par exemple $\\lvert -5 \\rvert = 5$.\n" +
        "- Elle est **positive**, **décroissante** sur $]-\\infty\\,;0]$ et **croissante** sur $[0\\,;+\\infty[$.\n" +
        "- Sa courbe est un **V** formé de deux demi-droites, de sommet l'origine.",
      figure: "courbe-absolue",
      exemple: {
        enonce: "Résoudre $|x| = 4$.",
        solution: "Les nombres à la distance $4$ de $0$ sont $-4$ et $4$."
      }
    },
    {
      titre: "Racine carrée et cube",
      texte:
        "- La fonction **racine carrée** $x \\mapsto \\sqrt{x}$ est définie sur $[0\\,;+\\infty[$ ; elle est positive et **croissante**. $\\sqrt{x} = k$ a pour solution $k^2$ si $k \\geqslant 0$, aucune si $k < 0$.\n" +
        "- La fonction **cube** $x \\mapsto x^3$ est définie sur $\\mathbb{R}$ et **croissante** sur $\\mathbb{R}$ ; $x^3$ a le signe de $x$. L'équation $x^3 = k$ a toujours une seule solution.\n" +
        "- Pour ces deux fonctions croissantes, comparer les images revient à comparer les nombres.",
      figure: "courbe-racine-cube",
      exemple: {
        enonce: "Résoudre $x^3 = -27$, puis $\\sqrt{x} = 3$.",
        solution: "$(-3)^3 = -27$, donc $x = -3$.\n\n$\\sqrt{x} = 3 \\iff x = 3^2 = 9$."
      }
    },
    {
      titre: "Comparer $x$ et $x^2$",
      texte:
        "Pour $x \\geqslant 0$, on étudie le signe de la différence : $x^2 - x = x(x - 1)$.\n\n" +
        "- Si $0 \\leqslant x \\leqslant 1$ : $x \\geqslant 0$ et $x - 1 \\leqslant 0$, donc $x^2 - x \\leqslant 0$, soit $x^2 \\leqslant x$.\n" +
        "- Si $x \\geqslant 1$ : les deux facteurs sont positifs, donc $x^2 \\geqslant x$.\n" +
        "- Sur $[0\\,;1]$, la parabole est **sous** la droite $y = x$ ; après $1$, elle est **au-dessus**.",
      figure: "x-et-x2",
      exemple: {
        enonce: "Sans calculatrice, ranger $0{,}7$ et $0{,}7^2$.",
        solution: "$0{,}7$ est entre $0$ et $1$, donc $0{,}7^2 < 0{,}7$ (en effet $0{,}49 < 0{,}7$)."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES ---------- */
  exercices: [
    { type: "var-intervalle", titre: "Lire où la courbe monte ou descend", etape: "Sens de variation", nb: 5 },
    { type: "var-extremum", titre: "Lire un maximum ou un minimum", etape: "Sens de variation", nb: 5 },
    { type: "var-tableau", titre: "Utiliser un tableau de variations", etape: "Sens de variation", nb: 5 },
    { type: "var-affine", titre: "Fonctions affines : sens et signe", etape: "Fonctions affines", nb: 5 },
    { type: "var-ref-courbe", titre: "Reconnaître une fonction de référence", etape: "Fonctions de référence", nb: 5 },
    { type: "var-ref-comparer", titre: "Comparer sans calculatrice", etape: "Fonctions de référence", nb: 5 },
    { type: "var-ref-equation", titre: "Résoudre x² = k, |x| = k, 1/x = k…", etape: "Fonctions de référence", nb: 5 }
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
      question: "La fonction $f(x) = -0{,}5x + 3$ est…",
      choix: ["croissante sur $\\mathbb{R}$", "décroissante sur $\\mathbb{R}$", "croissante puis décroissante", "constante"],
      bonne: 1,
      explication: "$m = -0{,}5 < 0$ : la fonction affine est décroissante."
    },
    {
      question: "$f(x) = 2x - 8$ est positive pour…",
      choix: ["$x > 4$", "$x < 4$", "$x > -4$", "$x > 8$"],
      bonne: 0,
      explication: "$2x - 8 = 0 \\iff x = 4$, et $m = 2 > 0$ : $f$ est négative avant $4$, positive après."
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
      question: "Sur $]0\\,;+\\infty[$, la fonction inverse est…",
      choix: ["croissante", "décroissante", "positive puis négative", "constante"],
      bonne: 1,
      explication: "Plus $x$ est grand, plus $\\dfrac{1}{x}$ est petit : décroissante."
    },
    {
      question: "L'équation $|x| = -2$ a pour solutions…",
      choix: ["$-2$ et $2$", "$-2$", "$2$", "aucune"],
      bonne: 3,
      explication: "$|x|$ est une distance, donc toujours positive : aucune solution."
    },
    {
      question: "La courbe de la fonction racine carrée…",
      choix: ["existe pour tout réel $x$", "commence en $(0\\,;0)$ et monte", "est une parabole", "a deux branches"],
      bonne: 1,
      explication: "$\\sqrt{x}$ n'existe que pour $x \\geqslant 0$, vaut $0$ en $0$, puis la fonction est croissante."
    },
    {
      question: "Pour $x = 0{,}3$, on a…",
      choix: ["$x^2 < x$", "$x^2 > x$", "$x^2 = x$"],
      bonne: 0,
      explication: "Entre $0$ et $1$, $x^2 \\leqslant x$ : $0{,}09 < 0{,}3$."
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
      exemple: "$0 < 0{,}2 < 0{,}5$ et l'inverse est décroissante sur $]0\\,;+\\infty[$ : $\\dfrac{1}{0{,}2} > \\dfrac{1}{0{,}5}$."
    },
    {
      titre: "Étudier le signe d'une fonction affine",
      etapes: [
        "Résous $mx + p = 0$ : la valeur trouvée $x_0$ partage la droite des réels en deux.",
        "Regarde le signe de $m$.",
        "Si $m > 0$ : signe $-$ avant $x_0$, signe $+$ après. Si $m < 0$ : l'inverse.",
        "Écris la conclusion sous forme d'intervalles ou d'un tableau de signes."
      ],
      exemple: "$-3x + 12$ : nul en $x = 4$, $m = -3 < 0$, donc positif sur $]-\\infty\\,;4[$ et négatif sur $]4\\,;+\\infty[$."
    }
  ],
  erreurs: [
    "Lire un intervalle de variation sur l'axe des ordonnées : les intervalles sont des valeurs de $x$.",
    "Confondre le maximum (une valeur de $f(x)$) et l'endroit où il est atteint (une valeur de $x$).",
    "Oublier une solution : $x^2 = 9$ a deux solutions, $-3$ et $3$.",
    "Croire que la fonction inverse est décroissante sur $\\mathbb{R}^*$ entier : $-1 < 1$ mais $\\dfrac{1}{-1} < \\dfrac{1}{1}$. Elle est décroissante sur chacun des deux intervalles séparément.",
    "Comparer deux carrés de nombres négatifs comme s'ils étaient positifs : $-3 < -2$ mais $(-3)^2 > (-2)^2$."
  ]
};
