/*
  CHAPITRE : Seconde — Fonctions affines, inégalités et inéquations
  ------------------------------------------------------------------
  Chapitre 6 de la progression spiralée 2026-2027 (programme de Seconde 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce, programme Python entre ```python et ```).
  Vidéos : celles de la chaîne d'abord, Yvan Monka en complément.
  Pas encore de PDF pour ce chapitre : ajouter les liens dans pdfs le moment venu.
  Les générateurs d'exercices commencent par « fa- » dans assets/exercices.js
  (le chapitre reprend aussi am-reconnaitre et am-lire-droite de la partie Automatismes).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-fonctions-affines"] = {
  niveau: "Seconde",
  numero: 6,
  titre: "Fonctions affines, inégalités et inéquations",
  accroche: "Une droite, un taux d'accroissement, un signe : modéliser un tarif ou un forfait, puis résoudre des inéquations pour comparer.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur les inéquations en vidéo (Yvan Monka)", url: "https://youtu.be/kbTWwWQ9tYo", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Fonction affine et taux d'accroissement",
      figure: "droite-affine",
      video: { titre: "Vidéo de ton prof : reconnaître une fonction affine", youtube: "https://youtu.be/hfiPikWtwoA" },
      texte:
        "Une fonction **affine** est définie sur $\\mathbb{R}$ par $f(x) = mx + p$, où $m$ et $p$ sont deux réels. Sa courbe est une **droite**.\n\n" +
        "- $p = f(0)$ est l'**ordonnée à l'origine** : la droite coupe l'axe des ordonnées au point $(0\\,;p)$.\n" +
        "- $m$ est le **taux d'accroissement** (ou coefficient directeur) : quand $x$ augmente de $1$, $f(x)$ augmente de $m$.\n" +
        "- Pour deux réels $a \\neq b$ : $m = \\dfrac{f(b) - f(a)}{b - a}$. Les **accroissements** de $f(x)$ sont **proportionnels** à ceux de $x$.\n\n" +
        "Cas particuliers : si $p = 0$, $f(x) = mx$ est **linéaire** (droite qui passe par l'origine) ; si $m = 0$, $f$ est **constante**.\n\n" +
        "Sur la figure, $y = 2x - 1$ : la droite coupe l'axe des ordonnées en $p = -1$, et quand $x$ augmente de $1$, $y$ augmente de $m = 2$.",
      exemple: {
        enonce: "$f$ est affine, avec $f(1) = 5$ et $f(4) = -1$. Déterminer $f(x)$.",
        solution: "$m = \\dfrac{-1 - 5}{4 - 1} = \\dfrac{-6}{3} = -2$, donc $f(x) = -2x + p$.\n\n$f(1) = 5$ : $-2 + p = 5$, donc $p = 7$. Ainsi $f(x) = -2x + 7$."
      }
    },
    {
      titre: "Sens de variation d'une fonction affine",
      video: { titre: "Vidéo d'Yvan Monka : démontrer les variations des fonctions affines", youtube: "https://youtu.be/sovePsrmcYw" },
      texte:
        "**Propriété** : la fonction affine $f(x) = mx + p$ est\n" +
        "- **croissante** sur $\\mathbb{R}$ si $m > 0$ ;\n" +
        "- **décroissante** sur $\\mathbb{R}$ si $m < 0$ ;\n" +
        "- **constante** sur $\\mathbb{R}$ si $m = 0$.\n\n" +
        "**Démonstration** (cas $m > 0$). Soit $a < b$ deux réels. $f(b) - f(a) = (mb + p) - (ma + p) = m(b - a)$.\n" +
        "Or $b - a > 0$ et $m > 0$, donc $f(b) - f(a) > 0$, c'est-à-dire $f(a) < f(b)$ : les images sont rangées dans le même ordre, $f$ est croissante. Si $m < 0$, le produit $m(b - a)$ est négatif et l'ordre s'inverse.",
      exemple: {
        enonce: "Donner le sens de variation de $f(x) = 5 - 3x$ et de $g(x) = \\dfrac{x + 4}{2}$.",
        solution: "$f(x) = -3x + 5$ : $m = -3 < 0$, $f$ est décroissante.\n\n$g(x) = \\dfrac{1}{2}x + 2$ : $m = \\dfrac{1}{2} > 0$, $g$ est croissante."
      }
    },
    {
      titre: "Signe d'une fonction affine",
      figure: "signe-affine",
      video: { titre: "Vidéo d'Yvan Monka : dresser le tableau de signes d'une fonction affine", youtube: "https://youtu.be/zZ9SbX8mC2o" },
      texte:
        "Si $m \\neq 0$, $f(x) = mx + p$ s'annule en une seule valeur : $mx + p = 0 \\iff x = -\\dfrac{p}{m}$.\n\n" +
        "- Si $m > 0$, $f(x)$ est **négatif** avant $-\\dfrac{p}{m}$ et **positif** après.\n" +
        "- Si $m < 0$, c'est l'inverse : positif, puis négatif.\n\n" +
        "On résume dans un **tableau de signes** : première ligne les valeurs de $x$, deuxième ligne le signe de $f(x)$, avec un $0$ sous $-\\dfrac{p}{m}$.\n\n" +
        "Sur la droite : $f(x) > 0$ là où la droite est **au-dessus** de l'axe des abscisses.",
      exemple: {
        enonce: "Dresser le tableau de signes de $f(x) = -2x + 6$.",
        solution: "$-2x + 6 = 0 \\iff x = 3$. Comme $m = -2 < 0$ : $f(x) > 0$ pour $x < 3$, $f(3) = 0$, et $f(x) < 0$ pour $x > 3$.",
        tableau: { var: "x", nom: "\\text{signe de } f(x)", x: ["-\\infty", "3", "+\\infty"], y: ["+", "0", "-"] }
      }
    },
    {
      titre: "Opérations sur les inégalités",
      texte:
        "Pour des réels $a$, $b$, $c$, $d$ :\n" +
        "- on peut **ajouter** un même nombre aux deux membres : si $a < b$, alors $a + c < b + c$ ;\n" +
        "- on peut **additionner** membre à membre deux inégalités de même sens : si $a < b$ et $c < d$, alors $a + c < b + d$ ;\n" +
        "- en **multipliant** par un réel **positif**, le sens est **conservé** : si $a < b$ et $k > 0$, alors $ka < kb$ ;\n" +
        "- en multipliant par un réel **négatif**, le sens **change** : si $a < b$ et $k < 0$, alors $ka > kb$.\n\n" +
        "Attention : on ne peut pas soustraire ni multiplier membre à membre deux inégalités.",
      exemple: {
        enonce: "On sait que $2 \\leqslant x \\leqslant 5$. Encadrer $-3x + 1$.",
        solution: "On multiplie par $-3 < 0$, le sens change : $-15 \\leqslant -3x \\leqslant -6$.\n\nOn ajoute $1$ : $-14 \\leqslant -3x + 1 \\leqslant -5$."
      }
    },
    {
      titre: "Inéquations du premier degré",
      video: { titre: "Vidéo de ton prof : équations et inéquations", youtube: "https://youtu.be/2Fv54-YT1lI" },
      texte:
        "On résout $ax + b < cx + d$ comme une équation, avec une seule différence : **diviser ou multiplier par un nombre négatif change le sens** de l'inégalité.\n\n" +
        "L'ensemble des solutions est un **intervalle**, à écrire avec les bons crochets :\n" +
        "- $x > 2$ : $S = \\,]2\\,;+\\infty[$ ;\n" +
        "- $x \\leqslant -1$ : $S = \\,]-\\infty\\,;-1]$.\n\n" +
        "**Négation** : le contraire de « $x < 3$ » est « $x \\geqslant 3$ » (et non « $x > 3$ »). Le contraire de « A **et** B » est « non A **ou** non B ».",
      exemple: {
        enonce: "Résoudre $2x - 7 \\geqslant 5x + 2$.",
        solution: "$2x - 5x \\geqslant 2 + 7 \\iff -3x \\geqslant 9 \\iff x \\leqslant -3$ (on divise par $-3 < 0$, le sens change).\n\n$S = \\,]-\\infty\\,;-3]$."
      }
    },
    {
      titre: "Modéliser par une fonction affine ou une inéquation",
      figure: "taxis",
      video: { titre: "Vidéo de ton prof : résoudre f(x) = g(x) graphiquement (location de kayaks)", youtube: "https://youtu.be/p03kXQ2bVXU" },
      texte:
        "Un **tarif** avec une partie fixe et une partie proportionnelle est une fonction affine : prix $=$ (prix par unité) $\\times x$ $+$ (partie fixe).\n\n" +
        "Pour comparer deux tarifs $f$ et $g$ :\n" +
        "- on écrit les deux expressions ;\n" +
        "- on résout $f(x) = g(x)$ pour trouver le seuil, puis $f(x) < g(x)$ pour savoir quand $f$ est moins chère ;\n" +
        "- on vérifie sur le graphique : la droite la plus **basse** correspond au tarif le moins cher.",
      exemple: {
        enonce: "Taxi A : $10$ € de prise en charge puis $2$ € par km. Taxi B : $4$ € puis $2{,}50$ € par km. Pour quelles distances A est-il moins cher ?",
        solution: "$A(x) = 2x + 10$ et $B(x) = 2{,}5x + 4$.\n\n$2x + 10 < 2{,}5x + 4 \\iff 6 < 0{,}5x \\iff x > 12$.\n\nLe taxi A est moins cher pour les courses de plus de $12$ km."
      }
    },
    {
      titre: "Python : la boucle for",
      texte:
        "La boucle $\\texttt{for}$ répète des instructions un **nombre de fois connu à l'avance**. $\\texttt{range(a, b)}$ donne les entiers de $a$ à $b - 1$ ($b$ est exclu).\n\n" +
        "Tableau de valeurs de $f(x) = 2x - 1$ pour $x$ allant de $-2$ à $3$ :\n\n" +
        "```python\ndef f(x):\n    return 2 * x - 1\n\nfor x in range(-2, 4):\n    print(x, f(x))\n```",
      exemple: {
        enonce: "Combien de lignes ce programme affiche-t-il ? Quelle est la dernière ?",
        solution: "$x$ prend les valeurs $-2$, $-1$, $0$, $1$, $2$, $3$ : $6$ lignes. La dernière est $\\texttt{3 5}$, car $f(3) = 5$."
      }
    }
  ],

  videos: [
    { titre: "Résoudre une inéquation", type: "Inéquations", youtube: "https://youtu.be/ycYfb8aHssY" },
    { titre: "Déterminer les variations d'une fonction affine", type: "Variations", youtube: "https://youtu.be/9x1mMKopdI0" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ----------
     Chaque série tire des nombres au hasard : on peut la refaire autant qu'on veut.
     type : nom du générateur (voir assets/exercices.js). nb : nombre de questions. */
  exercices: [
    { type: "am-reconnaitre", titre: "Reconnaître une fonction affine", etape: "Fonctions affines", nb: 4 },
    { type: "fa-taux", titre: "Calculer le taux d'accroissement m", etape: "Fonctions affines", nb: 5 },
    { type: "fa-expression", titre: "Retrouver f(x) = mx + p", etape: "Fonctions affines", nb: 4 },
    { type: "am-lire-droite", titre: "Lire l'équation d'une droite", etape: "Fonctions affines", nb: 4 },
    { type: "fa-variations", titre: "Croissante ou décroissante ?", etape: "Variations et signe", nb: 5 },
    { type: "fa-signe", titre: "Tableau de signes d'une fonction affine", etape: "Variations et signe", nb: 5 },
    { type: "fa-inegalite", titre: "Opérations sur les inégalités", etape: "Inéquations", nb: 6 },
    { type: "fa-inequation", titre: "Résoudre une inéquation", etape: "Inéquations", nb: 6 },
    { type: "fa-negation", titre: "Négation, « et », « ou »", etape: "Inéquations", nb: 4 },
    { type: "fa-modele", titre: "Comparer deux tarifs", etape: "Modéliser", nb: 3 },
    { type: "fa-python", titre: "Python : la boucle for", etape: "Modéliser", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ----------
     bonne : numéro de la bonne réponse en partant de 0 (0 = la première). */
  qcm: [
    {
      question: "Laquelle de ces fonctions est affine ?",
      choix: ["$f(x) = 3 - \\dfrac{x}{2}$", "$f(x) = \\dfrac{3}{x}$", "$f(x) = x^2 + 1$", "$f(x) = \\sqrt{x}$"],
      bonne: 0,
      explication: "$3 - \\dfrac{x}{2} = -\\dfrac{1}{2}x + 3$ est de la forme $mx + p$. Les autres ont $x$ au dénominateur, au carré ou sous une racine."
    },
    {
      question: "$f$ est affine, $f(2) = 7$ et $f(5) = 1$. Son taux d'accroissement est :",
      choix: ["$-2$", "$2$", "$-\\dfrac{1}{2}$", "$-6$"],
      bonne: 0,
      explication: "$m = \\dfrac{f(5) - f(2)}{5 - 2} = \\dfrac{1 - 7}{3} = -2$."
    },
    {
      question: "L'ordonnée à l'origine de $f(x) = -4x + 9$ est :",
      choix: ["$9$", "$-4$", "$\\dfrac{9}{4}$", "$0$"],
      bonne: 0,
      explication: "C'est $p = f(0) = 9$ : la droite coupe l'axe des ordonnées en $(0\\,;9)$."
    },
    {
      question: "La fonction $f(x) = 2 - 5x$ est :",
      choix: ["décroissante sur $\\mathbb{R}$", "croissante sur $\\mathbb{R}$", "constante", "croissante puis décroissante"],
      bonne: 0,
      explication: "$f(x) = -5x + 2$ : $m = -5 < 0$, donc $f$ est décroissante. L'ordre d'écriture ne change rien, seul le signe du coefficient de $x$ compte."
    },
    {
      question: "$f(x) = 3x - 12$ est positive pour :",
      choix: ["$x \\geqslant 4$", "$x \\leqslant 4$", "$x \\geqslant -4$", "$x \\geqslant 12$"],
      bonne: 0,
      explication: "$3x - 12 \\geqslant 0 \\iff x \\geqslant 4$. Avec $m = 3 > 0$, $f$ est négative avant $4$ et positive après."
    },
    {
      question: "Si $a < b$, alors :",
      choix: ["$-2a > -2b$", "$-2a < -2b$", "$a - 2 > b - 2$", "$\\dfrac{a}{2} > \\dfrac{b}{2}$"],
      bonne: 0,
      explication: "Multiplier par $-2 < 0$ change le sens. Ajouter $-2$ ou diviser par $2 > 0$ le conserve."
    },
    {
      question: "Si $1 \\leqslant x \\leqslant 3$, alors $-2x + 5$ est compris entre :",
      choix: ["$-1$ et $3$", "$3$ et $-1$", "$-1$ et $11$", "$7$ et $11$"],
      bonne: 0,
      explication: "$-6 \\leqslant -2x \\leqslant -2$ (le sens change), puis $-1 \\leqslant -2x + 5 \\leqslant 3$."
    },
    {
      question: "L'ensemble des solutions de $-3x + 6 > 0$ est :",
      choix: ["$]-\\infty\\,;2[$", "$]2\\,;+\\infty[$", "$]-\\infty\\,;-2[$", "$]-\\infty\\,;2]$"],
      bonne: 0,
      explication: "$-3x > -6 \\iff x < 2$ (on divise par $-3$, le sens change). Inégalité stricte : $2$ est exclu."
    },
    {
      question: "La négation de « $x < 5$ » est :",
      choix: ["$x \\geqslant 5$", "$x > 5$", "$x \\leqslant 5$", "$x < -5$"],
      bonne: 0,
      explication: "Si $x$ n'est pas strictement inférieur à $5$, il peut être égal à $5$ ou plus grand : $x \\geqslant 5$."
    },
    {
      question: "Un forfait coûte $15$ € par mois plus $0{,}10$ € par SMS. Le prix pour $x$ SMS est :",
      choix: ["$0{,}1x + 15$", "$15x + 0{,}1$", "$15{,}1x$", "$0{,}1(x + 15)$"],
      bonne: 0,
      explication: "La partie fixe ($15$ €) est l'ordonnée à l'origine, le prix par SMS ($0{,}10$ €) est le taux d'accroissement."
    },
    {
      question: "Que contient $\\texttt{range(1, 5)}$ en Python ?",
      choix: ["$1$, $2$, $3$, $4$", "$1$, $2$, $3$, $4$, $5$", "$0$, $1$, $2$, $3$, $4$", "$2$, $3$, $4$, $5$"],
      bonne: 0,
      explication: "$\\texttt{range(a, b)}$ commence à $a$ et s'arrête **avant** $b$."
    }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Déterminer l'expression d'une fonction affine",
      etapes: [
        "Calculer $m = \\dfrac{f(b) - f(a)}{b - a}$ avec les deux valeurs connues.",
        "Remplacer dans $f(a) = ma + p$ pour trouver $p$.",
        "Vérifier avec la seconde valeur."
      ],
      exemple: "$f(1) = 5$, $f(4) = -1$ : $m = -2$, $p = 7$, $f(x) = -2x + 7$."
    },
    {
      titre: "Dresser le tableau de signes de $mx + p$",
      etapes: [
        "Résoudre $mx + p = 0$ : $x = -\\dfrac{p}{m}$.",
        "Regarder le signe de $m$.",
        "$m > 0$ : « $-$ puis $+$ ». $m < 0$ : « $+$ puis $-$ »."
      ],
      exemple: "$-2x + 6$ s'annule en $3$ ; $m < 0$ : $+$ avant $3$, $-$ après."
    },
    {
      titre: "Résoudre une inéquation du premier degré",
      etapes: [
        "Regrouper les $x$ d'un côté, les nombres de l'autre.",
        "Diviser par le coefficient de $x$ : s'il est **négatif**, changer le sens.",
        "Écrire l'ensemble des solutions sous forme d'intervalle, avec les bons crochets."
      ],
      exemple: "$4 - 2x < 10 \\iff -2x < 6 \\iff x > -3$ : $S = \\,]-3\\,;+\\infty[$."
    },
    {
      titre: "Comparer deux tarifs",
      etapes: [
        "Écrire chaque tarif sous la forme $mx + p$ (partie proportionnelle + partie fixe).",
        "Résoudre l'inéquation « tarif 1 $<$ tarif 2 ».",
        "Conclure par une phrase avec l'unité."
      ],
      exemple: "$2x + 10 < 2{,}5x + 4 \\iff x > 12$ : A est moins cher au-delà de $12$ km."
    }
  ],
  erreurs: [
    "Croire que $f(x) = 5 - 3x$ est croissante parce que $5$ est positif : seul le coefficient de $x$ compte.",
    "Inverser le calcul du taux : $m = \\dfrac{f(b) - f(a)}{b - a}$, et non l'inverse.",
    "Oublier de changer le sens de l'inégalité en divisant par un nombre négatif.",
    "Écrire « le contraire de $x < 3$ est $x > 3$ » : il manque le cas $x = 3$.",
    "Mettre un crochet fermé du côté de l'infini : $[2\\,;+\\infty]$ n'a pas de sens.",
    "Soustraire deux inégalités membre à membre : c'est interdit.",
    "Oublier que $\\texttt{range(1, 5)}$ s'arrête à $4$."
  ]
};
