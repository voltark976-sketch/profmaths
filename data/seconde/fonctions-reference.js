/*
  CHAPITRE : Seconde — Fonctions de référence : inverse, racine carrée, cube
  ---------------------------------------------------------------------------
  Chapitre 13 de la progression spiralée 2026-2027 (programme de Seconde 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Figures disponibles : "courbe-inverse", "courbe-racine-cube", "x-et-x2".
  Pas encore de vidéo de la chaîne ni de PDF pour ce chapitre : les vidéos sont celles d'Yvan Monka.
  Générateurs : fr- dans assets/exercices.js (fr-comparer et fr-equation reprennent var-ref-comparer
  et var-ref-equation limités à l'inverse, la racine carrée et le cube), et var-ref-courbe.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-fonctions-reference"] = {
  niveau: "Seconde",
  numero: 13,
  titre: "Fonctions de référence : inverse, racine carrée, cube",
  accroche: "Une hyperbole, une demi-parabole couchée, une courbe en S : trois nouvelles fonctions de référence, et une vraie démonstration par l'absurde.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur les fonctions de référence en vidéo (Yvan Monka)", url: "https://youtu.be/7BlHXCcTEx8", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "La fonction inverse",
      video: { titre: "Vidéo d'Yvan Monka : étudier les variations de la fonction inverse", youtube: "https://youtu.be/Vl2rlbFF22Y" },
      texte:
        "La fonction inverse est définie sur $\\mathbb{R}^* = \\,]-\\infty\\,;0[ \\cup \\,]0\\,;+\\infty[$ par $f(x) = \\dfrac{1}{x}$. Sa courbe est une **hyperbole** à deux branches.\n\n" +
        "- $0$ n'a pas d'image : on ne divise jamais par $0$. Et $\\dfrac{1}{x}$ n'est jamais égal à $0$.\n" +
        "- Elle est **décroissante** sur $]-\\infty\\,;0[$ et **décroissante** sur $]0\\,;+\\infty[$ (mais pas sur $\\mathbb{R}^*$ entier : $-1 < 1$ et $\\dfrac{1}{-1} < \\dfrac{1}{1}$).\n" +
        "- $\\dfrac{1}{x}$ a le **signe de $x$** : négatif pour $x < 0$, positif pour $x > 0$.",
      figure: "courbe-inverse",
      exemple: {
        enonce: "Le trajet Mamoudzou–Sada fait environ $30$ km. La durée (en heures) à la vitesse moyenne $v$ (en km/h) est $t = \\dfrac{30}{v}$. Comparer la durée à $40$ km/h et à $60$ km/h.",
        solution: "$40 < 60$ et la fonction inverse est décroissante sur $]0\\,;+\\infty[$ : $\\dfrac{1}{40} > \\dfrac{1}{60}$, donc $\\dfrac{30}{40} > \\dfrac{30}{60}$. Plus on roule vite, moins le trajet dure : $45$ min contre $30$ min."
      }
    },
    {
      titre: "Démonstration : variations de la fonction inverse",
      video: { titre: "Vidéo d'Yvan Monka : démontrer les variations de la fonction inverse", youtube: "https://youtu.be/cZYWnLA30q0" },
      texte:
        "**Propriété** : la fonction inverse est décroissante sur $]0\\,;+\\infty[$.\n\n" +
        "**Démonstration**. Soit $a$ et $b$ deux réels tels que $0 < a < b$.\n" +
        "- $\\dfrac{1}{b} - \\dfrac{1}{a} = \\dfrac{a - b}{ab}$ (même dénominateur).\n" +
        "- $a - b < 0$ car $a < b$, et $ab > 0$ car $a$ et $b$ sont positifs.\n" +
        "- Donc $\\dfrac{1}{b} - \\dfrac{1}{a} < 0$, c'est-à-dire $\\dfrac{1}{b} < \\dfrac{1}{a}$.\n\n" +
        "L'ordre des images est inversé : la fonction est décroissante sur $]0\\,;+\\infty[$. Sur $]-\\infty\\,;0[$, $ab > 0$ aussi : même conclusion.",
      exemple: {
        enonce: "Pourquoi la démonstration ne marche-t-elle pas avec $a = -2$ et $b = 3$ ?",
        solution: "Alors $ab = -6 < 0$ : le quotient $\\dfrac{a - b}{ab}$ est positif, et $\\dfrac{1}{3} > -\\dfrac{1}{2}$. C'est pour ça qu'on étudie chaque intervalle séparément."
      }
    },
    {
      titre: "Racine carrée et cube",
      video: { titre: "Vidéo d'Yvan Monka : étudier les variations de la fonction racine carrée", youtube: "https://youtu.be/qJ-Iiz8TvZ4" },
      texte:
        "- La fonction **racine carrée** $x \\mapsto \\sqrt{x}$ est définie sur $[0\\,;+\\infty[$ ; elle est positive et **croissante**. $\\sqrt{x} = k$ a pour solution $k^2$ si $k \\geqslant 0$, aucune si $k < 0$.\n" +
        "- La fonction **cube** $x \\mapsto x^3$ est définie sur $\\mathbb{R}$ et **croissante** sur $\\mathbb{R}$ ; $x^3$ a le signe de $x$. L'équation $x^3 = k$ a toujours une seule solution.\n" +
        "- Pour ces deux fonctions croissantes, comparer les images revient à comparer les nombres : $a < b \\iff a^3 < b^3$.",
      figure: "courbe-racine-cube",
      exemple: {
        enonce: "Résoudre $x^3 = -27$, puis $\\sqrt{x} = 3$, puis $\\sqrt{x} < 3$.",
        solution: "$(-3)^3 = -27$, donc $x = -3$.\n\n$\\sqrt{x} = 3 \\iff x = 9$.\n\n$\\sqrt{x} < 3 \\iff 0 \\leqslant x < 9$ (la racine carrée est croissante), soit $S = [0\\,;9[$."
      }
    },
    {
      titre: "Résoudre $f(x) = k$ et $f(x) < k$",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une inéquation avec la fonction inverse", youtube: "https://youtu.be/V07NxCl7Eto" },
      texte:
        "Graphiquement, on trace la droite horizontale $y = k$ et on lit les abscisses des points de la courbe sur ou sous cette droite.\n\n" +
        "Algébriquement, on utilise le sens de variation **sur un intervalle** :\n" +
        "- fonction croissante : l'inégalité garde son sens ;\n" +
        "- fonction décroissante : l'inégalité change de sens.\n\n" +
        "Exemple : sur $]0\\,;+\\infty[$, $\\dfrac{1}{x} < 2 \\iff x > \\dfrac{1}{2}$.",
      exemple: {
        enonce: "Résoudre sur $]0\\,;+\\infty[$ l'inéquation $\\dfrac{1}{x} \\geqslant 4$.",
        solution: "$\\dfrac{1}{x} = 4 \\iff x = \\dfrac{1}{4}$. La fonction inverse est décroissante sur $]0\\,;+\\infty[$, donc $\\dfrac{1}{x} \\geqslant 4 \\iff x \\leqslant \\dfrac{1}{4}$. $S = \\,]0\\,;\\dfrac{1}{4}]$."
      }
    },
    {
      titre: "Démonstration : comparer $x$, $x^2$ et $x^3$",
      video: { titre: "Vidéo d'Yvan Monka : démontrer les positions relatives de x, x² et x³", youtube: "https://youtu.be/op54acayjIQ" },
      texte:
        "Pour $x \\geqslant 0$, on étudie le **signe de la différence** : $x^2 - x = x(x - 1)$.\n\n" +
        "- Si $0 \\leqslant x \\leqslant 1$ : $x \\geqslant 0$ et $x - 1 \\leqslant 0$, donc $x^2 - x \\leqslant 0$, soit $x^2 \\leqslant x$.\n" +
        "- Si $x \\geqslant 1$ : les deux facteurs sont positifs, donc $x^2 \\geqslant x$.\n" +
        "- Sur $[0\\,;1]$, la parabole est **sous** la droite $y = x$ ; après $1$, elle est **au-dessus**.\n\n" +
        "De même, $x^3 - x^2 = x^2(x - 1)$ : pour $0 \\leqslant x \\leqslant 1$, $x^3 \\leqslant x^2 \\leqslant x$ ; pour $x \\geqslant 1$, $x \\leqslant x^2 \\leqslant x^3$.",
      figure: "x-et-x2",
      exemple: {
        enonce: "Sans calculatrice, ranger $0{,}7$, $0{,}7^2$ et $0{,}7^3$.",
        solution: "$0{,}7$ est entre $0$ et $1$ : $0{,}7^3 < 0{,}7^2 < 0{,}7$ (en effet $0{,}343 < 0{,}49 < 0{,}7$)."
      }
    },
    {
      titre: "Démonstration : $\\sqrt{2}$ est irrationnel",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que √2 est irrationnel", youtube: "https://youtu.be/oRcTlNh1Sjc" },
      texte:
        "**Raisonnement par l'absurde** : on suppose le contraire de ce qu'on veut montrer, et on arrive à une contradiction.\n\n" +
        "Supposons $\\sqrt{2} = \\dfrac{p}{q}$ avec $p$ et $q$ entiers positifs et la fraction **irréductible** (chapitre 4).\n" +
        "- Alors $2 = \\dfrac{p^2}{q^2}$, donc $p^2 = 2q^2$ : $p^2$ est pair.\n" +
        "- Si $p$ était impair, $p^2$ serait impair (chapitre 4). Donc $p$ est pair : $p = 2k$.\n" +
        "- Alors $4k^2 = 2q^2$, soit $q^2 = 2k^2$ : $q^2$ est pair, donc $q$ est pair.\n" +
        "- $p$ et $q$ sont tous les deux pairs : la fraction n'est pas irréductible. **Contradiction**.\n\n" +
        "L'hypothèse est fausse : $\\sqrt{2}$ n'est pas rationnel.",
      exemple: {
        enonce: "Pourquoi peut-on supposer la fraction $\\dfrac{p}{q}$ irréductible ?",
        solution: "Toute fraction peut être simplifiée jusqu'à devenir irréductible. Si $\\sqrt{2}$ était un quotient d'entiers, il serait égal à une fraction irréductible."
      }
    },
    {
      titre: "Python : encadrer $\\sqrt{2}$ par balayage",
      texte:
        "On part d'un entier $x$ inférieur à $\\sqrt{k}$ et on avance de $\\texttt{pas}$ tant que $x^2 < k$ :\n\n" +
        "```python\ndef encadrement(k, pas):\n    x = 1\n    while x * x < k:\n        x = x + pas\n    return x - pas, x\n```\n\n" +
        "Avec $\\texttt{pas} = 10^{-n}$, on obtient un encadrement de $\\sqrt{k}$ d'amplitude $10^{-n}$ (chapitre 1). Python affiche parfois $\\texttt{1.4000000000000001}$ : c'est l'arrondi de la machine.",
      exemple: {
        enonce: "Que renvoie $\\texttt{encadrement(2, 0.1)}$ ?",
        solution: "$1{,}4^2 = 1{,}96 < 2$ et $1{,}5^2 = 2{,}25 \\geqslant 2$ : la fonction renvoie environ $(1{,}4\\,;1{,}5)$, donc $1{,}4 < \\sqrt{2} < 1{,}5$."
      }
    }
  ],

  /* Exercices corrigés en vidéo */
  videos: [
    { titre: "Ordonner des nombres avec la fonction cube", type: "Cube", youtube: "https://youtu.be/8h8uAq0wH1A" },
    { titre: "Résoudre une inéquation avec la fonction racine carrée", type: "Racine carrée", youtube: "https://youtu.be/UPI7RoS0Vhg" },
    { titre: "Image ou antécédent par la fonction inverse", type: "Inverse", youtube: "https://youtu.be/gHDcYSHfSlk" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES ---------- */
  exercices: [
    { type: "var-ref-courbe", titre: "Reconnaître une fonction de référence", etape: "Les fonctions de référence", nb: 5 },
    { type: "fr-comparer", titre: "Comparer sans calculatrice", etape: "Les fonctions de référence", nb: 6 },
    { type: "fr-equation", titre: "Résoudre 1/x = k, √x = k, x³ = k", etape: "Équations et inéquations", nb: 5 },
    { type: "fr-inequation", titre: "Résoudre 1/x < k, √x < k, x³ < k", etape: "Équations et inéquations", nb: 5 },
    { type: "fr-position", titre: "Ranger x, x² et x³", etape: "Positions relatives", nb: 4 },
    { type: "fr-python", titre: "Python : encadrer une racine carrée", etape: "Python", nb: 3 }
  ],

  /* ---------- 3. QCM ---------- */
  qcm: [
    {
      question: "Sur $]0\\,;+\\infty[$, la fonction inverse est…",
      choix: ["croissante", "décroissante", "positive puis négative", "constante"],
      bonne: 1,
      explication: "Plus $x$ est grand, plus $\\dfrac{1}{x}$ est petit : décroissante."
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
    },
    {
      question: "L'équation $\\dfrac{1}{x} = 0$ a :",
      choix: ["aucune solution", "une solution : $0$", "une infinité de solutions", "deux solutions"],
      bonne: 0,
      explication: "Un quotient de numérateur $1$ ne peut jamais être nul, et $0$ n'a pas d'image."
    },
    {
      question: "Sans calculatrice : $(-2{,}1)^3$ … $(-1{,}9)^3$",
      choix: ["$<$", "$>$", "$=$"],
      bonne: 0,
      explication: "$-2{,}1 < -1{,}9$ et la fonction cube est croissante sur $\\mathbb{R}$ : l'ordre est conservé."
    },
    {
      question: "L'ensemble des solutions de $\\sqrt{x} \\leqslant 5$ est :",
      choix: ["$[0\\,;25]$", "$]-\\infty\\,;25]$", "$[0\\,;5]$", "$[0\\,;\\sqrt{5}]$"],
      bonne: 0,
      explication: "$\\sqrt{x}$ existe pour $x \\geqslant 0$ et la fonction est croissante : $\\sqrt{x} \\leqslant 5 \\iff 0 \\leqslant x \\leqslant 25$."
    },
    {
      question: "Dans un raisonnement par l'absurde, on commence par :",
      choix: ["supposer le contraire de ce qu'on veut démontrer", "vérifier sur un exemple", "supposer ce qu'on veut démontrer", "tracer une figure"],
      bonne: 0,
      explication: "On suppose le contraire, on en tire des conséquences jusqu'à une contradiction : l'hypothèse était donc fausse."
    },
    {
      question: "$\\sqrt{2}$ est irrationnel signifie :",
      choix: ["$\\sqrt{2}$ ne peut pas s'écrire comme un quotient de deux entiers", "$\\sqrt{2}$ n'existe pas", "$\\sqrt{2}$ est négatif", "$\\sqrt{2}$ n'a pas de valeur approchée"],
      bonne: 0,
      explication: "Il existe bien, vaut environ $1{,}414$, mais aucune fraction $\\dfrac{p}{q}$ ne lui est égale."
    }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
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
      titre: "Résoudre $f(x) < k$ avec une fonction de référence",
      etapes: [
        "Vérifier l'ensemble de définition ($x \\geqslant 0$ pour $\\sqrt{x}$, $x \\neq 0$ pour $\\dfrac{1}{x}$).",
        "Résoudre d'abord $f(x) = k$.",
        "Utiliser le sens de variation sur l'intervalle étudié pour conclure.",
        "Contrôler sur la courbe."
      ],
      exemple: "$\\sqrt{x} < 3 \\iff 0 \\leqslant x < 9$."
    },
    {
      titre: "Comparer $x$, $x^2$, $x^3$ pour $x \\geqslant 0$",
      etapes: [
        "Situer $x$ par rapport à $1$.",
        "Entre $0$ et $1$ : $x^3 \\leqslant x^2 \\leqslant x$.",
        "Au-delà de $1$ : $x \\leqslant x^2 \\leqslant x^3$."
      ],
      exemple: "$1{,}5 < 1{,}5^2 = 2{,}25 < 1{,}5^3 = 3{,}375$."
    }
  ],
  erreurs: [
    "Croire que la fonction inverse est décroissante sur $\\mathbb{R}^*$ entier : elle est décroissante sur chacun des deux intervalles séparément.",
    "Écrire $\\dfrac{1}{0} = 0$ : $0$ n'a pas d'image par la fonction inverse.",
    "Oublier que $\\sqrt{x}$ n'existe que pour $x \\geqslant 0$ dans une inéquation.",
    "Croire que $x^2$ est toujours plus grand que $x$ : c'est faux entre $0$ et $1$.",
    "Démontrer « par l'absurde » en vérifiant seulement des exemples."
  ]
};
