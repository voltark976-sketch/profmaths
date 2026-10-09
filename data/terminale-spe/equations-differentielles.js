/*
  CHAPITRE : Terminale spécialité — Équations différentielles
  ------------------------------------------------------------
  Chapitre 11 de la progression de Terminale spécialité (V26, période 4, 2 semaines) :
  équations différentielles y' = ay et y' = ay + b (et y' = ay + f avec une solution particulière donnée),
  modélisation (refroidissement, radioactivité, croissance), méthode d'Euler.
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas de vidéo de la chaîne sur ce thème : vidéos d'Yvan Monka (cours 20Prim-EdT).
  Figure : "edo-courbes". Générateurs : edo- dans assets/exercices.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-spe-equations-differentielles"] = {
  niveau: "Terminale spécialité",
  numero: 11,
  titre: "Équations différentielles",
  accroche: "Des équations dont l'inconnue est une fonction : $y' = ay$ et $y' = ay + b$ modélisent le refroidissement d'un café, la radioactivité ou la croissance d'une population.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours complet sur les équations différentielles en vidéo (Yvan Monka)", url: "https://youtu.be/qHF5kiDFkW8", type: "video" },
    { titre: "Démonstration : solutions de y' = ay (Yvan Monka)", url: "https://youtu.be/FQlxi8JKmg4", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Équation différentielle et solution",
      video: { titre: "Vidéo d'Yvan Monka : vérifier si une fonction est solution d'une équation différentielle", youtube: "https://youtu.be/LX8PxR-ScfM" },
      texte:
        "Une **équation différentielle** relie une fonction inconnue $y$ et sa dérivée $y'$ (par exemple $y' = 2y$). Une **solution** sur un intervalle $I$ est une fonction $f$ dérivable sur $I$ telle que, pour tout $x$ de $I$, $f'(x) = 2f(x)$.\n\n" +
        "- Pour **vérifier** qu'une fonction est solution : on calcule $f'$, et on remplace dans l'équation.\n" +
        "- Une équation différentielle a en général une **infinité** de solutions ; une **condition initiale** ($f(0) = 3$, par exemple) en sélectionne une seule.\n\n" +
        "Au chapitre 10, on a résolu $y' = f$ : les solutions sont les primitives de $f$.",
      exemple: {
        enonce: "Vérifie que $f(x) = 5e^{-3x}$ est solution de $y' + 3y = 0$.",
        solution: "$f'(x) = -15e^{-3x}$, donc $f'(x) + 3f(x) = -15e^{-3x} + 15e^{-3x} = 0$ : $f$ est solution."
      }
    },
    {
      titre: "L'équation $y' = ay$",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation différentielle du type y' = ay", youtube: "https://youtu.be/YJNHTq85tJA" },
      texte:
        "Soit $a$ un réel. Les solutions sur $\\mathbb{R}$ de l'équation $y' = ay$ sont les fonctions\n\n" +
        "$x \\mapsto Ce^{ax}$, où $C$ est un réel quelconque (démonstration au programme).\n\n" +
        "- Pour tout $x_0$ et $y_0$, il existe une **unique** solution telle que $y(x_0) = y_0$.\n" +
        "- Avec $y(0) = y_0$ : la solution est $y = y_0e^{ax}$.\n\n" +
        "C'est le modèle des évolutions **proportionnelles à la quantité présente** : radioactivité ($a < 0$), croissance d'une population sans contrainte ($a > 0$), capitalisation continue.",
      exemple: {
        enonce: "Résous $2y' - 6y = 0$, puis trouve la solution telle que $y(0) = 4$.",
        solution: "L'équation équivaut à $y' = 3y$ : solutions $y = Ce^{3x}$, $C$ réel.\n\n$y(0) = C = 4$, donc la solution cherchée est $y = 4e^{3x}$."
      }
    },
    {
      titre: "L'équation $y' = ay + b$",
      figure: "edo-courbes",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation différentielle du type y' = ay + b", youtube: "https://youtu.be/F_LQLZ8rUhg" },
      texte:
        "Soit $a \\neq 0$ et $b$ deux réels.\n\n" +
        "- L'équation $y' = ay + b$ a une **solution constante** : $y = -\\dfrac{b}{a}$ (on cherche $y$ constante, donc $y' = 0$).\n" +
        "- Ses solutions sont les fonctions $x \\mapsto Ce^{ax} - \\dfrac{b}{a}$, avec $C$ réel.\n\n" +
        "Autrement dit : **solution constante + solutions de $y' = ay$**.\n\n" +
        "Si $a < 0$, $Ce^{ax} \\to 0$ quand $x \\to +\\infty$ : toutes les solutions tendent vers la solution constante (figure). C'est un **équilibre**, comme la température de la pièce pour un café qui refroidit.",
      exemple: {
        enonce: "Résous $y' = -0{,}5y + 3$, puis trouve la solution telle que $y(0) = 10$.",
        solution: "Solution constante : $y = -\\dfrac{3}{-0{,}5} = 6$. Solutions : $y = Ce^{-0{,}5x} + 6$.\n\n$y(0) = C + 6 = 10$, donc $C = 4$ : $y = 4e^{-0{,}5x} + 6$, qui tend vers $6$ en $+\\infty$."
      }
    },
    {
      titre: "L'équation $y' = ay + f$",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation différentielle du type y' = ay + f", youtube: "https://youtu.be/QeGvVncvyLc" },
      texte:
        "Quand le second membre est une fonction $f$, on ne sait pas toujours trouver une solution, mais si l'on connaît **une solution particulière** $p$ :\n\n" +
        "les solutions de $y' = ay + f$ sont les fonctions $p + h$, où $h$ est solution de $y' = ay$, c'est-à-dire $x \\mapsto p(x) + Ce^{ax}$.\n\n" +
        "**Pourquoi ?** $y$ est solution si et seulement si $y - p$ vérifie $(y - p)' = a(y - p)$.\n\n" +
        "En pratique, l'énoncé donne la forme de $p$ (par exemple $p(x) = \\alpha x + \\beta$) et on trouve $\\alpha$ et $\\beta$ en identifiant.",
      exemple: {
        enonce: "Montre que $p(x) = x + 1$ est solution de $y' = 2y - 2x - 1$, puis donne toutes les solutions.",
        solution: "$p'(x) = 1$ et $2p(x) - 2x - 1 = 2x + 2 - 2x - 1 = 1$ : $p$ est solution.\n\nLes solutions sont $y = x + 1 + Ce^{2x}$, $C$ réel."
      }
    },
    {
      titre: "Modéliser avec une équation différentielle",
      video: { titre: "Vidéo d'Yvan Monka : résoudre y' = ay + b (exemple 2)", youtube: "https://youtu.be/CFZr44vny3w" },
      texte:
        "- **Refroidissement (loi de Newton)** : la température $T$ d'un objet dans une pièce à $T_a$ vérifie $T' = -k(T - T_a)$, avec $k > 0$. Solutions : $T(t) = T_a + (T_0 - T_a)e^{-kt}$.\n" +
        "- **Radioactivité** : $N' = -\\lambda N$, donc $N(t) = N_0e^{-\\lambda t}$. La **demi-vie** $t_{1/2}$ vérifie $e^{-\\lambda t_{1/2}} = \\dfrac{1}{2}$, soit $t_{1/2} = \\dfrac{\\ln 2}{\\lambda}$.\n" +
        "- **Croissance** : $P' = kP$ donne $P(t) = P_0e^{kt}$.\n\n" +
        "Le logarithme permet ensuite de trouver **quand** une valeur est atteinte.",
      exemple: {
        enonce: "Un café à $80$ °C refroidit dans une pièce à $20$ °C selon $T' = -0{,}1(T - 20)$ ($t$ en minutes). Quand sera-t-il à $40$ °C ?",
        solution: "$T(t) = 20 + 60e^{-0{,}1t}$. $T(t) = 40 \\iff e^{-0{,}1t} = \\dfrac{1}{3} \\iff -0{,}1t = -\\ln 3 \\iff t = 10\\ln 3 \\approx 11$ minutes."
      }
    },
    {
      titre: "Algorithmique : la méthode d'Euler",
      texte:
        "La **méthode d'Euler** construit une approximation de la solution de $y' = F(y)$ avec $y(0) = y_0$, pas à pas, avec un petit pas $h$ :\n\n" +
        "$y(x + h) \\approx y(x) + h \\times y'(x)$ : on suit la tangente sur chaque petit intervalle.\n\n" +
        "```python\ndef euler(y0, h, n):\n    y = y0\n    for i in range(n):\n        y = y + h * (-0.5 * y + 3)   # y' = -0,5y + 3\n    return y\n```\n\n" +
        "Plus $h$ est petit, plus l'approximation est bonne (et plus il faut de pas pour aller loin).",
      exemple: {
        enonce: "Calcule $\\texttt{euler(10, 0.5, 2)}$ et compare à la solution exacte $y(1) = 4e^{-0{,}5} + 6$.",
        solution: "Pas 1 : $10 + 0{,}5 \\times (-5 + 3) = 9$. Pas 2 : $9 + 0{,}5 \\times (-4{,}5 + 3) = 8{,}25$.\n\nValeur exacte : $y(1) \\approx 8{,}43$. L'écart vient du pas assez grand."
      }
    }
  ],

  videos: [
    { titre: "Résoudre une équation différentielle du type y' = ay + b (2)", type: "y' = ay + b", youtube: "https://youtu.be/CFZr44vny3w" },
    { titre: "Prépare ton bac : équations différentielles, exponentielles, suites", type: "Bac", youtube: "https://youtu.be/VMRsAkKAVZo" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "edo-verifier", titre: "Vérifier une solution", etape: "Résoudre", nb: 4 },
    { type: "edo-yay", titre: "Résoudre $y' = ay$", etape: "Résoudre", nb: 5 },
    { type: "edo-yayb", titre: "Résoudre $y' = ay + b$", etape: "Résoudre", nb: 5 },
    { type: "edo-condition", titre: "Condition initiale et limite", etape: "Résoudre", nb: 5 },
    { type: "edo-particuliere", titre: "Avec une solution particulière", etape: "Résoudre", nb: 4 },
    { type: "edo-modele", titre: "Refroidissement, demi-vie, croissance", etape: "Modéliser", nb: 5 },
    { type: "edo-euler", titre: "Python : la méthode d'Euler", etape: "Algorithmique", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Les solutions de $y' = 4y$ sont :", choix: ["$y = Ce^{4x}$, $C$ réel", "$y = e^{4x} + C$", "$y = 4Ce^{x}$", "$y = Ce^{-4x}$"], bonne: 0, explication: "Solutions de $y' = ay$ : $Ce^{ax}$." },
    { question: "La solution de $y' = -2y$ telle que $y(0) = 3$ est :", choix: ["$y = 3e^{-2x}$", "$y = -2e^{3x}$", "$y = 3e^{2x}$", "$y = e^{-2x} + 3$"], bonne: 0, explication: "$y = Ce^{-2x}$ et $C = y(0) = 3$." },
    { question: "L'équation $y' + 5y = 0$ s'écrit :", choix: ["$y' = -5y$", "$y' = 5y$", "$y = 5y'$", "$y' = y - 5$"], bonne: 0, explication: "On isole $y'$." },
    { question: "La solution constante de $y' = 2y - 8$ est :", choix: ["$y = 4$", "$y = -4$", "$y = 8$", "$y = 2$"], bonne: 0, explication: "$0 = 2y - 8 \\iff y = 4$." },
    { question: "Les solutions de $y' = -3y + 6$ sont :", choix: ["$y = Ce^{-3x} + 2$", "$y = Ce^{-3x} - 2$", "$y = Ce^{3x} + 2$", "$y = Ce^{-3x} + 6$"], bonne: 0, explication: "Solution constante $-\\dfrac{b}{a} = -\\dfrac{6}{-3} = 2$, plus $Ce^{-3x}$." },
    { question: "La fonction $f(x) = 2e^{x} - 1$ est solution de :", choix: ["$y' = y + 1$", "$y' = y - 1$", "$y' = 2y$", "$y' = -y$"], bonne: 0, explication: "$f'(x) = 2e^x$ et $f(x) + 1 = 2e^x$." },
    { question: "Toutes les solutions de $y' = -0{,}2y + 4$ tendent, en $+\\infty$, vers :", choix: ["$20$", "$4$", "$0$", "$-20$"], bonne: 0, explication: "Solution constante $-\\dfrac{4}{-0{,}2} = 20$, et $e^{-0{,}2x} \\to 0$." },
    { question: "La solution de $y' = y - 3$ telle que $y(0) = 5$ est :", choix: ["$y = 2e^{x} + 3$", "$y = 5e^{x} + 3$", "$y = 2e^{x} - 3$", "$y = 5e^{x} - 3$"], bonne: 0, explication: "$y = Ce^x + 3$ et $C + 3 = 5$." },
    { question: "Combien de solutions de $y' = ay + b$ vérifient $y(0) = 1$ ?", choix: ["Une seule", "Aucune", "Deux", "Une infinité"], bonne: 0, explication: "La condition initiale fixe la constante $C$." },
    { question: "Une substance vérifie $N' = -0{,}1N$ ($t$ en jours). Sa demi-vie vaut :", choix: ["$10\\ln 2$ jours", "$0{,}1\\ln 2$ jour", "$5$ jours", "$\\ln 0{,}1$ jours"], bonne: 0, explication: "$e^{-0{,}1t} = \\dfrac{1}{2} \\iff t = \\dfrac{\\ln 2}{0{,}1} \\approx 6{,}9$ jours." },
    { question: "Si $p$ est une solution particulière de $y' = ay + f$, les solutions sont :", choix: ["$p + Ce^{ax}$", "$Cp$", "$p \\times e^{ax}$", "$p + C$"], bonne: 0, explication: "Solution particulière + solutions de l'équation sans second membre." },
    { question: "La loi de refroidissement $T' = -k(T - 20)$, avec $k > 0$, donne une température qui tend vers :", choix: ["$20$", "$0$", "$-20$", "$T(0)$"], bonne: 0, explication: "La solution constante est $20$, température de la pièce." },
    { question: "La fonction $f(x) = 3$ est solution de $y' = -2y + 6$ ?", choix: ["Oui : $0 = -6 + 6$", "Non, car $f$ est constante", "Non : $0 \\neq 6$", "Seulement en $x = 0$"], bonne: 0, explication: "C'est la solution constante $-\\dfrac{6}{-2} = 3$." },
    { question: "Dans la méthode d'Euler, on passe de $y(x)$ à $y(x + h)$ en calculant :", choix: ["$y(x) + h \\times y'(x)$", "$y(x) \\times h$", "$y(x) + y'(x)$", "$\\dfrac{y(x)}{h}$"], bonne: 0, explication: "On suit la tangente sur un petit intervalle de longueur $h$." },
    { question: "Pour la méthode d'Euler, réduire le pas $h$ :", choix: ["améliore l'approximation", "ne change rien", "rend le résultat exact", "rend l'approximation moins bonne"], bonne: 0, explication: "L'erreur diminue avec le pas, mais il faut plus d'étapes." },
    { question: "$P' = 0{,}05P$ et $P(0) = 100$. Alors $P(t)$ vaut :", choix: ["$100e^{0{,}05t}$", "$0{,}05e^{100t}$", "$100 + 0{,}05t$", "$100e^{-0{,}05t}$"], bonne: 0, explication: "Solution de $y' = ay$ avec $C = P(0)$." },
    { question: "Les solutions de $3y' = y$ sont :", choix: ["$y = Ce^{\\frac{x}{3}}$", "$y = Ce^{3x}$", "$y = 3Ce^{x}$", "$y = Ce^{-3x}$"], bonne: 0, explication: "$y' = \\dfrac{1}{3}y$." },
    { question: "L'équation $y' = ay + b$ avec $a > 0$ : quand $x \\to +\\infty$, une solution non constante :", choix: ["tend vers $+\\infty$ ou $-\\infty$", "tend vers la solution constante", "tend vers $0$", "n'a pas de limite"], bonne: 0, explication: "$Ce^{ax} \\to \\pm\\infty$ selon le signe de $C$ quand $a > 0$." },
    { question: "Pour résoudre $e^{-0{,}1t} = \\dfrac{1}{3}$, on écrit :", choix: ["$-0{,}1t = -\\ln 3$", "$-0{,}1t = \\dfrac{1}{3}$", "$t = e^{\\frac{1}{3}}$", "$t = -0{,}1\\ln 3$"], bonne: 0, explication: "On prend le logarithme : $\\ln\\dfrac{1}{3} = -\\ln 3$, d'où $t = 10\\ln 3$." },
    { question: "Le modèle $y' = ay$ convient quand la vitesse d'évolution est :", choix: ["proportionnelle à la quantité présente", "constante", "proportionnelle au temps", "nulle"], bonne: 0, explication: "$y'$ (vitesse) $= a \\times y$ (quantité)." },
    { question: "Les solutions de $y' = 0$ sont :", choix: ["les fonctions constantes", "la fonction nulle seulement", "les fonctions $Ce^x$", "les fonctions affines"], bonne: 0, explication: "Une dérivée nulle sur un intervalle : fonction constante (c'est le cas $a = 0$)." },
    { question: "La solution de $y' = -0{,}3y$ telle que $y(0) = 5$ :", choix: ["décroît et tend vers $0$", "croît vers $+\\infty$", "est constante", "tend vers $5$"], bonne: 0, explication: "$y = 5e^{-0{,}3x}$ : $a < 0$, la fonction décroît et tend vers $0$." },
    { question: "La fonction $f(x) = e^{2x} + 1$ est solution de :", choix: ["$y' = 2y - 2$", "$y' = 2y + 1$", "$y' = y + 1$", "$y' = 2y$"], bonne: 0, explication: "$f'(x) = 2e^{2x}$ et $2f(x) - 2 = 2e^{2x} + 2 - 2 = 2e^{2x}$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Résoudre $y' = ay + b$ avec une condition initiale",
      etapes: [
        "Écrire l'équation sous la forme $y' = ay + b$ (isoler $y'$).",
        "Calculer la solution constante $-\\dfrac{b}{a}$.",
        "Écrire les solutions : $y = Ce^{ax} - \\dfrac{b}{a}$.",
        "Utiliser la condition $y(x_0) = y_0$ pour trouver $C$, puis écrire la solution."
      ],
      exemple: "$y' - 2y = 4$, $y(0) = 1$ : $y' = 2y + 4$, solution constante $-2$, $y = Ce^{2x} - 2$, $C - 2 = 1$, donc $y = 3e^{2x} - 2$."
    },
    {
      titre: "Résoudre $y' = ay + f$",
      etapes: [
        "Vérifier (ou déterminer en identifiant) la solution particulière $p$ donnée par l'énoncé.",
        "Résoudre l'équation sans second membre $y' = ay$ : $Ce^{ax}$.",
        "Écrire les solutions : $y = p(x) + Ce^{ax}$.",
        "Utiliser la condition initiale si besoin."
      ],
      exemple: "$p(x) = 2x$ solution de $y' = y - 2x + 2$ ; solutions : $y = 2x + Ce^{x}$."
    },
    {
      titre: "Exploiter un modèle",
      etapes: [
        "Identifier $a$, $b$ et la condition initiale dans l'énoncé.",
        "Écrire la solution explicite.",
        "Calculer une valeur (remplacer $t$), ou résoudre $y(t) = k$ avec le logarithme.",
        "Interpréter la limite en $+\\infty$ (équilibre) si $a < 0$."
      ],
      exemple: "$N(t) = N_0e^{-0{,}2t}$ : $N(t) = 0{,}1N_0 \\iff t = \\dfrac{\\ln 10}{0{,}2} \\approx 11{,}5$."
    }
  ],
  erreurs: [
    "Oublier d'isoler $y'$ avant de lire $a$ et $b$ ($y' + 3y = 0$ donne $a = -3$).",
    "Écrire la solution constante $\\dfrac{b}{a}$ au lieu de $-\\dfrac{b}{a}$.",
    "Écrire $y = e^{ax} + C$ au lieu de $y = Ce^{ax}$.",
    "Oublier la solution constante dans les solutions de $y' = ay + b$.",
    "Utiliser la condition initiale avant d'avoir écrit la forme générale complète.",
    "Croire que $e^0 = 0$ en utilisant $y(0)$.",
    "Confondre $e^{-kt}$ (décroissance) et $e^{kt}$ (croissance)."
  ]
};
