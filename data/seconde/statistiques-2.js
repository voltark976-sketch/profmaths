/*
  CHAPITRE : Seconde — Statistiques 2 et échantillonnage
  -------------------------------------------------------
  Chapitre 16 de la progression spiralée 2026-2027 (programme de Seconde 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Figures disponibles : "histogramme-tortues", "polygone-tortues" (40 tortues, effectifs 4, 10, 14, 8, 4).
  Pas encore de vidéo de la chaîne ni de PDF pour ce chapitre : les vidéos sont celles d'Yvan Monka.
  Les générateurs d'exercices commencent par « ec- » dans assets/exercices.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-statistiques-2"] = {
  niveau: "Seconde",
  numero: 16,
  titre: "Statistiques 2 et échantillonnage",
  accroche: "Des données regroupées en classes (les tortues vertes de la plage), puis le hasard répété : la loi des grands nombres et la fluctuation d'échantillonnage.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur les statistiques (2) en vidéo (Yvan Monka)", url: "https://youtu.be/mJahFqsk3dc", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Séries regroupées en classes, histogramme",
      texte:
        "Quand les valeurs sont nombreuses et variées, on les regroupe en **classes** $[a\\,;b[$ de même **amplitude** $b - a$.\n\n" +
        "- On les représente par un **histogramme** : des rectangles accolés, un par classe.\n" +
        "- Quand toutes les classes ont la même amplitude, la **hauteur** de chaque rectangle est proportionnelle à l'effectif.\n\n" +
        "Exemple : masses (en kg) de $40$ tortues vertes mesurées sur une plage de Mayotte.",
      figure: "histogramme-tortues",
      exemple: {
        enonce: "D'après l'histogramme, combien de tortues pèsent entre $90$ et $100$ kg ? Quelle proportion pèse moins de $90$ kg ?",
        solution: "Le rectangle de $[90\\,;100[$ a une hauteur de $8$ : $8$ tortues.\n\nMoins de $90$ kg : $4 + 10 + 14 = 28$ tortues, soit $\\dfrac{28}{40} = 70\\,\\%$."
      }
    },
    {
      titre: "Moyenne avec les centres de classes",
      video: { titre: "Vidéo d'Yvan Monka : moyenne et médiane après avoir centré les classes", youtube: "https://youtu.be/3RJJjmtjc9U" },
      texte:
        "On ne connaît plus chaque valeur. Pour **estimer** la moyenne, on remplace chaque valeur par le **centre** de sa classe, $\\dfrac{a + b}{2}$, puis on calcule une moyenne pondérée par les effectifs :\n\n" +
        "$\\bar{x} \\approx \\dfrac{n_1 c_1 + n_2 c_2 + \\ldots}{N}$.",
      exemple: {
        enonce: "Estimer la masse moyenne des $40$ tortues (effectifs $4$, $10$, $14$, $8$, $4$ pour $[60\\,;70[$, …, $[100\\,;110[$).",
        solution: "Centres : $65$, $75$, $85$, $95$, $105$.\n\n$\\bar{x} \\approx \\dfrac{4 \\times 65 + 10 \\times 75 + 14 \\times 85 + 8 \\times 95 + 4 \\times 105}{40} = \\dfrac{3\\,380}{40} = 84{,}5$ kg."
      }
    },
    {
      titre: "Fréquences cumulées, classe médiane",
      video: { titre: "Vidéo d'Yvan Monka : construire le polygone des fréquences cumulées", youtube: "https://youtu.be/DVN-4u6BCPY" },
      texte:
        "- L'**effectif cumulé croissant** d'une classe est le nombre de valeurs **inférieures** à sa borne de droite.\n" +
        "- Le **polygone des fréquences cumulées croissantes** relie les points (borne de droite ; fréquence cumulée), en partant de $0$ à la première borne.\n" +
        "- La **classe médiane** est la première classe dont la fréquence cumulée atteint $50\\,\\%$.\n" +
        "- En supposant les valeurs réparties **uniformément** dans chaque classe, on **estime** la médiane en lisant l'abscisse du point d'ordonnée $50\\,\\%$ sur le polygone.",
      figure: "polygone-tortues",
      exemple: {
        enonce: "Estimer la masse médiane des $40$ tortues.",
        solution: "Fréquences cumulées : $10\\,\\%$, $35\\,\\%$, $70\\,\\%$, $90\\,\\%$, $100\\,\\%$. On atteint $50\\,\\%$ dans $[80\\,;90[$ : c'est la classe médiane.\n\nIl manque $50 - 35 = 15$ points de pourcentage sur les $35$ de la classe : $Me \\approx 80 + \\dfrac{15}{35} \\times 10 \\approx 84{,}3$ kg."
      }
    },
    {
      titre: "Fonction aléatoire et simulation",
      texte:
        "Une **expérience aléatoire** se simule avec une fonction qui renvoie un résultat au hasard :\n" +
        "- $\\texttt{random()}$ : un nombre au hasard dans $[0\\,;1[$ ;\n" +
        "- $\\texttt{randint(1, 6)}$ : un entier au hasard de $1$ à $6$ (un lancer de dé).\n\n" +
        "En **répétant** l'expérience de façon indépendante, on obtient une **série statistique** dont on calcule les fréquences.\n\n" +
        "```python\nfrom random import randint\n\ndef frequence_six(n):\n    c = 0\n    for i in range(n):\n        if randint(1, 6) == 6:\n            c = c + 1\n    return c / n\n```",
      exemple: {
        enonce: "Que renvoie à peu près $\\texttt{frequence\\_six(100000)}$ ?",
        solution: "Une fréquence proche de $\\dfrac{1}{6} \\approx 0{,}167$, mais pas exactement : chaque exécution donne un résultat un peu différent."
      }
    },
    {
      titre: "Loi des grands nombres, fluctuation d'échantillonnage",
      video: { titre: "Vidéo d'Yvan Monka : estimer une probabilité à l'aide de la loi des grands nombres", youtube: "https://youtu.be/mFwXs_EMYes" },
      texte:
        "- **Fluctuation d'échantillonnage** : deux échantillons de même taille donnent des fréquences différentes. Plus l'échantillon est **petit**, plus les fréquences varient.\n" +
        "- **Loi des grands nombres** : quand on répète une expérience un très grand nombre de fois, la fréquence d'un événement se rapproche de sa probabilité.\n\n" +
        "Modèle et réalité : une probabilité est un **modèle**. Une fréquence observée sur un grand échantillon permet d'**estimer** une probabilité inconnue (par exemple la proportion de tortues porteuses d'une étiquette), mais un petit nombre d'essais ne permet pas de conclure.",
      exemple: {
        enonce: "On lance $10$ fois une pièce et on obtient $3$ « pile ». Puis on la lance $10\\,000$ fois et on obtient $4\\,982$ « pile ». Que conclure ?",
        solution: "Sur $10$ lancers, $0{,}3$ n'a rien d'anormal : la fluctuation est forte. Sur $10\\,000$ lancers, la fréquence $0{,}498$ est très proche de $0{,}5$ : la pièce semble équilibrée."
      }
    }
  ],

  /* Exercices corrigés en vidéo */
  videos: [
    { titre: "Calculer les effectifs cumulés et les fréquences cumulées", type: "Classes", youtube: "https://youtu.be/zJ625zpPTds" }
  ],
  videosNote: "Vidéo d'Yvan Monka : l'énoncé est donné au début de la vidéo.",

  /* ---------- 2. EXERCICES ---------- */
  exercices: [
    { type: "ec-histogramme", titre: "Lire un histogramme", etape: "Séries en classes", nb: 4 },
    { type: "ec-moyenne", titre: "Moyenne avec les centres de classes", etape: "Séries en classes", nb: 3 },
    { type: "ec-cumul", titre: "Effectifs et fréquences cumulés", etape: "Séries en classes", nb: 4 },
    { type: "ec-classe-mediane", titre: "Trouver la classe médiane", etape: "Séries en classes", nb: 4 },
    { type: "ec-mediane", titre: "Estimer la médiane", etape: "Séries en classes", nb: 3 },
    { type: "ec-lgn", titre: "Loi des grands nombres, fluctuation", etape: "Échantillonnage", nb: 4 },
    { type: "ec-python", titre: "Python : simulation et fréquence", etape: "Échantillonnage", nb: 3 }
  ],

  /* ---------- 3. QCM ---------- */
  qcm: [
    {
      question: "Le centre de la classe $[40\\,;60[$ est :",
      choix: ["$50$", "$20$", "$40$", "$60$"],
      bonne: 0,
      explication: "$\\dfrac{40 + 60}{2} = 50$. ($20$ est l'amplitude.)"
    },
    {
      question: "Dans un histogramme à classes de même amplitude, la hauteur d'un rectangle représente :",
      choix: ["l'effectif de la classe", "le centre de la classe", "l'amplitude", "l'effectif cumulé"],
      bonne: 0,
      explication: "Avec des classes de même amplitude, la hauteur est proportionnelle à l'effectif."
    },
    {
      question: "La moyenne calculée avec les centres des classes est :",
      choix: ["une estimation de la vraie moyenne", "toujours exactement la vraie moyenne", "toujours plus grande que la vraie moyenne", "égale à la médiane"],
      bonne: 0,
      explication: "On remplace chaque valeur par le centre de sa classe : c'est une approximation."
    },
    {
      question: "Effectifs cumulés croissants : $5$ ; $18$ ; $34$ ; $40$ (total $40$). La classe médiane est la :",
      choix: ["3e classe", "2e classe", "1re classe", "4e classe"],
      bonne: 0,
      explication: "La moitié est $20$ : on la dépasse dans la 3e classe ($18 < 20 \\leqslant 34$)."
    },
    {
      question: "La loi des grands nombres dit que :",
      choix: ["la fréquence se rapproche de la probabilité quand le nombre d'expériences augmente", "la fréquence est toujours égale à la probabilité", "après plusieurs « pile », « face » devient plus probable", "les petits échantillons sont plus fiables"],
      bonne: 0,
      explication: "Sur un grand nombre de répétitions, la fréquence observée se stabilise autour de la probabilité. Le hasard n'a pas de mémoire."
    },
    {
      question: "Deux classes simulent $50$ lancers d'un dé et obtiennent des fréquences du $6$ différentes. C'est :",
      choix: ["la fluctuation d'échantillonnage", "une erreur de calcul", "la preuve que le dé est truqué", "impossible"],
      bonne: 0,
      explication: "Des échantillons différents donnent des fréquences différentes, surtout quand ils sont petits."
    },
    {
      question: "En Python, $\\texttt{randint(1, 6)}$ renvoie :",
      choix: ["un entier au hasard entre $1$ et $6$ (inclus)", "un décimal entre $1$ et $6$", "toujours $6$", "un entier entre $1$ et $5$"],
      bonne: 0,
      explication: "Les deux bornes sont incluses : c'est un lancer de dé simulé."
    }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Estimer la moyenne d'une série en classes",
      etapes: [
        "Calculer le centre $\\dfrac{a + b}{2}$ de chaque classe $[a\\,;b[$.",
        "Multiplier chaque centre par l'effectif de la classe et additionner.",
        "Diviser par l'effectif total."
      ],
      exemple: "Centres $65$, $75$, …, $105$ : $\\bar{x} \\approx \\dfrac{3\\,380}{40} = 84{,}5$ kg."
    },
    {
      titre: "Estimer la médiane",
      etapes: [
        "Calculer les effectifs (ou fréquences) cumulés croissants.",
        "Repérer la classe médiane : la première qui atteint la moitié de l'effectif.",
        "Interpoler dans la classe $[a\\,;b[$ : $Me \\approx a + k \\times (b - a)$, où $k$ est la part de la classe à parcourir pour atteindre la moitié de l'effectif."
      ],
      exemple: "$Me \\approx 80 + \\dfrac{20 - 14}{14} \\times 10 \\approx 84{,}3$ kg."
    },
    {
      titre: "Interpréter une simulation",
      etapes: [
        "Identifier la probabilité théorique (le modèle).",
        "Petit échantillon : la fréquence peut s'en éloigner (fluctuation).",
        "Grand échantillon : la fréquence s'en rapproche (loi des grands nombres)."
      ],
      exemple: "$10\\,000$ lancers d'une pièce : fréquence de « pile » proche de $0{,}5$."
    }
  ],
  erreurs: [
    "Prendre une borne de classe au lieu du centre pour la moyenne.",
    "Oublier de diviser par l'effectif total.",
    "Confondre la classe médiane et la classe de plus grand effectif.",
    "Croire qu'après plusieurs « pile », « face » est plus probable : le hasard n'a pas de mémoire.",
    "Conclure qu'une pièce est truquée à partir de $10$ lancers.",
    "Lire l'effectif sur la largeur d'un rectangle au lieu de sa hauteur."
  ]
};
