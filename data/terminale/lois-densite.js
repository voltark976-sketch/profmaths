/*
  CHAPITRE : Terminale maths complémentaires — Lois à densité
  -----------------------------------------------------------
  Chapitre 13 de la progression spiralée 2026-2027 (programme de maths complémentaires de 2019).
  Densité, probabilité comme aire, fonction de répartition, espérance et variance, loi uniforme sur [0 ; 1] puis [a ; b],
  loi exponentielle et absence de mémoire (retour sur le ch. 10), Python (exponentielle à partir d'une uniforme, sommes),
  attente de la barge, durée de vie d'un atome radioactif.
  Figures : "tld-densite", "tld-uniforme", "tld-exponentielle". Générateurs : tld-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-lois-densite"] = {
  niveau: "Terminale maths complémentaires",
  numero: 13,
  titre: "Lois à densité",
  accroche: "Quand le hasard prend toutes les valeurs d'un intervalle : densité, probabilité comme aire, loi uniforme (l'attente de la barge), loi exponentielle (durée de vie d'un atome) et simulations en Python.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Variable aléatoire continue et densité",
      figure: "tld-densite",
      video: { titre: "Vidéo d'Yvan Monka : démontrer qu'une fonction est une densité", youtube: "https://youtu.be/r-8jxBaS7Ms" },
      texte:
        "Un temps d'attente, une durée de vie, une taille peuvent prendre **toutes** les valeurs d'un intervalle $I$ : on parle de variable aléatoire **continue**.\n\n" +
        "Une **densité** sur $I$ est une fonction $f$ continue, **positive**, dont l'aire totale sous la courbe vaut $1$ : $\\displaystyle\\int_I f(x)\\,\\mathrm{d}x = 1$.\n\n" +
        "$X$ suit la loi de densité $f$ si, pour tous $a \\leqslant b$ dans $I$ :\n\n" +
        "$P(a \\leqslant X \\leqslant b) = \\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$ : **une probabilité est une aire**.\n\n" +
        "Conséquence : $P(X = a) = 0$, donc $P(X \\leqslant a) = P(X < a)$.",
      exemple: {
        enonce: "$f(x) = 2x$ sur $[0\\,;1]$. Vérifie que $f$ est une densité, puis calcule $P(0{,}5 \\leqslant X \\leqslant 0{,}8)$ (figure).",
        solution: "$f$ est continue, positive, et $\\displaystyle\\int_0^1 2x\\,\\mathrm{d}x = \\big[x^2\\big]_0^1 = 1$. Puis $P = 0{,}8^2 - 0{,}5^2 = 0{,}39$."
      }
    },
    {
      titre: "Fonction de répartition",
      video: { titre: "Vidéo d'Yvan Monka : utiliser une loi à densité", youtube: "https://youtu.be/0Ry-2yLsANA" },
      texte:
        "La **fonction de répartition** de $X$ est $F(x) = P(X \\leqslant x)$. Pour une densité $f$ sur $[a\\,;b]$ :\n\n" +
        "$F(x) = \\displaystyle\\int_a^x f(t)\\,\\mathrm{d}t$ : c'est la primitive de $f$ qui s'annule en $a$ (chapitre 12), donc $F' = f$.\n\n" +
        "- $F$ est croissante, de $0$ à $1$.\n" +
        "- $P(c < X \\leqslant d) = F(d) - F(c)$.\n\n" +
        "**Discret / continu** : la somme $\\sum P(X = k)$ devient l'intégrale $\\displaystyle\\int f$.",
      exemple: {
        enonce: "Avec $f(x) = 2x$ sur $[0\\,;1]$, donne $F(x)$ puis $P(X \\leqslant 0{,}3)$.",
        solution: "$F(x) = \\displaystyle\\int_0^x 2t\\,\\mathrm{d}t = x^2$ et $P(X \\leqslant 0{,}3) = 0{,}09$."
      }
    },
    {
      titre: "Espérance et variance",
      video: { titre: "Vidéo d'Yvan Monka : calculer l'espérance d'une loi à densité", youtube: "https://youtu.be/oI-tbf9sP6M" },
      texte:
        "Pour $X$ de densité $f$ sur $[a\\,;b]$ :\n\n" +
        "- **Espérance** : $E(X) = \\displaystyle\\int_a^b x f(x)\\,\\mathrm{d}x$ (version continue de $\\sum x_i p_i$) ;\n" +
        "- **Variance** : $V(X) = \\displaystyle\\int_a^b \\big(x - E(X)\\big)^2 f(x)\\,\\mathrm{d}x$, et l'écart type $\\sigma = \\sqrt{V(X)}$.\n\n" +
        "Comme pour les lois discrètes, $E(X)$ est la valeur moyenne obtenue en répétant l'expérience un grand nombre de fois.",
      exemple: {
        enonce: "Calcule $E(X)$ pour $f(x) = 2x$ sur $[0\\,;1]$.",
        solution: "$E(X) = \\displaystyle\\int_0^1 2x^2\\,\\mathrm{d}x = \\left[\\dfrac{2x^3}{3}\\right]_0^1 = \\dfrac{2}{3}$ : les grandes valeurs sont plus probables, la moyenne dépasse $0{,}5$."
      }
    },
    {
      titre: "La loi uniforme : l'attente de la barge",
      figure: "tld-uniforme",
      video: { titre: "Vidéo d'Yvan Monka : utiliser la loi uniforme", youtube: "https://youtu.be/yk4ni_iqxKk" },
      texte:
        "La **loi uniforme sur $[0\\,;1]$** a pour densité $f(x) = 1$ : c'est la loi de random() en Python.\n\n" +
        "Plus généralement, la loi uniforme sur $[a\\,;b]$ a pour densité constante $\\dfrac{1}{b - a}$. Alors :\n\n" +
        "- $P(c \\leqslant X \\leqslant d) = \\dfrac{d - c}{b - a}$ (longueur favorable sur longueur totale) ;\n" +
        "- $E(X) = \\dfrac{a + b}{2}$ et $V(X) = \\dfrac{(b - a)^2}{12}$.\n\n" +
        "La barge Mamoudzou – Dzaoudzi part toutes les $30$ minutes. En arrivant au hasard, le temps d'attente suit la loi uniforme sur $[0\\,;30]$ (figure).",
      exemple: {
        enonce: "Quelle est la probabilité d'attendre plus de $10$ minutes ? Quel est le temps d'attente moyen ?",
        solution: "$P(X > 10) = \\dfrac{30 - 10}{30} = \\dfrac{2}{3}$ et $E(X) = \\dfrac{0 + 30}{2} = 15$ minutes."
      }
    },
    {
      titre: "La loi exponentielle",
      figure: "tld-exponentielle",
      video: { titre: "Vidéo d'Yvan Monka : utiliser la loi exponentielle", youtube: "https://youtu.be/tL8-UTORSLM" },
      texte:
        "$\\lambda$ est un réel strictement positif. La **loi exponentielle** de paramètre $\\lambda$ a pour densité $f(t) = \\lambda e^{-\\lambda t}$ sur $[0\\,;+\\infty[$. Pour $t \\geqslant 0$ :\n\n" +
        "- $P(X \\leqslant t) = \\displaystyle\\int_0^t \\lambda e^{-\\lambda x}\\,\\mathrm{d}x = 1 - e^{-\\lambda t}$ ;\n" +
        "- $P(X > t) = e^{-\\lambda t}$ ;\n" +
        "- $E(X) = \\dfrac{1}{\\lambda}$ (admis).\n\n" +
        "Elle modélise une **durée de vie** (composant électronique, atome radioactif) ou un temps d'attente avant un événement rare.",
      exemple: {
        enonce: "$\\lambda = 0{,}5$. Calcule $P(X > 2)$ (aire hachurée) et $E(X)$.",
        solution: "$P(X > 2) = e^{-1} \\approx 0{,}368$ et $E(X) = \\dfrac{1}{0{,}5} = 2$."
      }
    },
    {
      titre: "Absence de mémoire",
      video: { titre: "Vidéo d'Yvan Monka : durée de vie sans vieillissement", youtube: "https://youtu.be/ZS_sW8yq-94" },
      texte:
        "Pour tous $s, t \\geqslant 0$ : $P_{X > s}(X > s + t) = P(X > t)$.\n\n" +
        "**Démonstration** : $P_{X > s}(X > s + t) = \\dfrac{P(X > s + t)}{P(X > s)} = \\dfrac{e^{-\\lambda(s + t)}}{e^{-\\lambda s}} = e^{-\\lambda t}$.\n\n" +
        "Un composant qui a déjà fonctionné $s$ années n'est pas « usé » : c'est une **durée de vie sans vieillissement**. On retrouve la propriété de la loi géométrique (chapitre 10), dont la loi exponentielle est la version continue.",
      exemple: {
        enonce: "$\\lambda = 0{,}1$ (en années). Un composant a $5$ ans. Probabilité qu'il dure encore $3$ ans ?",
        solution: "$P_{X > 5}(X > 8) = P(X > 3) = e^{-0{,}3} \\approx 0{,}741$."
      }
    },
    {
      titre: "Durée de vie d'un atome radioactif",
      texte:
        "La durée de vie d'un atome radioactif suit une loi exponentielle. La **demi-vie** $T$ vérifie $P(X \\leqslant T) = 0{,}5$ :\n\n" +
        "$1 - e^{-\\lambda T} = 0{,}5 \\iff e^{-\\lambda T} = 0{,}5 \\iff T = \\dfrac{\\ln 2}{\\lambda}$.\n\n" +
        "Sur un grand nombre d'atomes, la moitié s'est désintégrée au bout du temps $T$ : c'est le principe de la datation au carbone 14 ($T \\approx 5\\,730$ ans). On retrouve l'équation $y' = -\\lambda y$ du chapitre 11.",
      exemple: {
        enonce: "Pour l'iode 131, $\\lambda \\approx 0{,}0866$ (en jours). Calcule sa demi-vie.",
        solution: "$T = \\dfrac{\\ln 2}{0{,}0866} \\approx 8$ jours."
      }
    },
    {
      titre: "Python : simuler des lois à densité",
      texte:
        "```python\nfrom random import random\nfrom math import log\n\ndef expo(lam):\n    u = random()\n    return -log(1 - u) / lam\n\ndef somme(n):\n    s = 0\n    for i in range(n):\n        s = s + random()\n    return s\n```\n\n" +
        "- random() suit la loi uniforme sur $[0\\,;1]$.\n" +
        "- expo(lam) résout $1 - e^{-\\lambda x} = u$ : on obtient une simulation de la loi exponentielle à partir d'une loi uniforme.\n" +
        "- somme(n) additionne $n$ variables uniformes indépendantes : son espérance est $\\dfrac{n}{2}$, et l'histogramme de nombreuses sommes prend une forme de cloche.",
      exemple: {
        enonce: "Si random() renvoie $0{,}5$, que renvoie expo(2) ?",
        solution: "$-\\dfrac{\\ln 0{,}5}{2} = \\dfrac{\\ln 2}{2} \\approx 0{,}35$ : c'est la demi-vie pour $\\lambda = 2$."
      }
    }
  ],

  videos: [
    { titre: "Démontrer qu'une fonction est une densité", type: "Méthode", youtube: "https://youtu.be/r-8jxBaS7Ms" },
    { titre: "Utiliser une loi à densité", type: "Méthode", youtube: "https://youtu.be/0Ry-2yLsANA" },
    { titre: "Espérance d'une loi à densité", type: "Calcul", youtube: "https://youtu.be/oI-tbf9sP6M" },
    { titre: "Utiliser la loi uniforme", type: "Méthode", youtube: "https://youtu.be/yk4ni_iqxKk" },
    { titre: "Utiliser la loi exponentielle", type: "Méthode", youtube: "https://youtu.be/tL8-UTORSLM" },
    { titre: "Durée de vie sans vieillissement", type: "Méthode", youtube: "https://youtu.be/ZS_sW8yq-94" }
  ],
  videosNote: "Vidéos d'Yvan Monka, en attendant les vidéos de ton prof sur ce chapitre.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "tld-densite", titre: "Trouver k pour avoir une densité", etape: "Densité", nb: 4 },
    { type: "tld-proba-densite", titre: "Probabilité comme aire", etape: "Densité", nb: 4 },
    { type: "tld-repartition", titre: "Fonction de répartition", etape: "Densité", nb: 4 },
    { type: "tld-esperance", titre: "Calculer une espérance", etape: "Densité", nb: 3 },
    { type: "tld-uniforme", titre: "Loi uniforme et attente de la barge", etape: "Lois usuelles", nb: 5 },
    { type: "tld-exp-proba", titre: "Loi exponentielle : probabilités", etape: "Lois usuelles", nb: 5 },
    { type: "tld-exp-esperance", titre: "Durée de vie moyenne", etape: "Lois usuelles", nb: 4 },
    { type: "tld-memoire", titre: "Absence de mémoire", etape: "Modéliser", nb: 3 },
    { type: "tld-demi-vie", titre: "Atome radioactif", etape: "Modéliser", nb: 4 },
    { type: "tld-python", titre: "Python : simuler", etape: "Raisonner", nb: 3 },
    { type: "tld-logique", titre: "Vrai ou faux", etape: "Raisonner", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Pour une loi de densité $f$, $P(a \\leqslant X \\leqslant b) =$", choix: ["$\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$", "$f(b) - f(a)$", "$f(b)$", "$\\dfrac{f(a) + f(b)}{2}$"], bonne: 0, explication: "Une probabilité est une aire sous la densité." },
    { question: "Une densité sur $I$ doit vérifier :", choix: ["$f \\geqslant 0$ et $\\displaystyle\\int_I f = 1$", "$0 \\leqslant f \\leqslant 1$", "$f(0) = 1$", "$f$ croissante"], bonne: 0, explication: "Positive, continue, aire totale $1$." },
    { question: "$f(x) = k$ sur $[0\\,;4]$ est une densité si $k =$", choix: ["$0{,}25$", "$4$", "$1$", "$0{,}5$"], bonne: 0, explication: "$4k = 1$." },
    { question: "Pour une loi à densité, $P(X = 3) =$", choix: ["$0$", "$f(3)$", "$F(3)$", "$\\dfrac{1}{3}$"], bonne: 0, explication: "Aire d'un segment." },
    { question: "La fonction de répartition $F$ vérifie :", choix: ["$F' = f$", "$F = f$", "$F' = -f$", "$F(x) = f(x) \\times x$"], bonne: 0, explication: "$F(x) = \\displaystyle\\int_a^x f(t)\\,\\mathrm{d}t$." },
    { question: "$E(X) =$", choix: ["$\\displaystyle\\int_a^b x f(x)\\,\\mathrm{d}x$", "$\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$", "$f\\left(\\dfrac{a + b}{2}\\right)$", "$\\displaystyle\\int_a^b x\\,\\mathrm{d}x$"], bonne: 0, explication: "Version continue de $\\sum x_i p_i$." },
    { question: "$X$ uniforme sur $[2\\,;10]$. $P(4 \\leqslant X \\leqslant 6) =$", choix: ["$0{,}25$", "$0{,}5$", "$0{,}2$", "$2$"], bonne: 0, explication: "$\\dfrac{2}{8}$." },
    { question: "$X$ uniforme sur $[2\\,;10]$. $E(X) =$", choix: ["$6$", "$8$", "$5$", "$4$"], bonne: 0, explication: "Milieu de l'intervalle." },
    { question: "La barge part toutes les $20$ min. Attente moyenne en arrivant au hasard :", choix: ["$10$ min", "$20$ min", "$5$ min", "$15$ min"], bonne: 0, explication: "$E(X) = \\dfrac{0 + 20}{2}$." },
    { question: "random() en Python suit :", choix: ["la loi uniforme sur $[0\\,;1]$", "la loi exponentielle", "la loi binomiale", "la loi géométrique"], bonne: 0, explication: "Densité constante égale à $1$." },
    { question: "Loi exponentielle de paramètre $\\lambda$ : $P(X > t) =$", choix: ["$e^{-\\lambda t}$", "$1 - e^{-\\lambda t}$", "$\\lambda e^{-\\lambda t}$", "$e^{\\lambda t}$"], bonne: 0, explication: "$1 - P(X \\leqslant t)$." },
    { question: "Loi exponentielle de paramètre $\\lambda$ : $E(X) =$", choix: ["$\\dfrac{1}{\\lambda}$", "$\\lambda$", "$e^{-\\lambda}$", "$\\ln \\lambda$"], bonne: 0, explication: "Admis." },
    { question: "Durée de vie moyenne $5$ ans (loi exponentielle). Alors $\\lambda =$", choix: ["$0{,}2$", "$5$", "$0{,}5$", "$e^{-5}$"], bonne: 0, explication: "$\\dfrac{1}{5}$." },
    { question: "$\\lambda = 0{,}5$. $P(X \\leqslant 2) \\approx$", choix: ["$0{,}632$", "$0{,}368$", "$0{,}5$", "$1$"], bonne: 0, explication: "$1 - e^{-1}$." },
    { question: "Absence de mémoire : $P_{X > s}(X > s + t) =$", choix: ["$P(X > t)$", "$P(X > s)$", "$P(X > s + t)$", "$0$"], bonne: 0, explication: "Durée de vie sans vieillissement." },
    { question: "La loi exponentielle est la version continue de :", choix: ["la loi géométrique", "la loi binomiale", "la loi uniforme", "la loi de Bernoulli"], bonne: 0, explication: "Temps d'attente sans mémoire." },
    { question: "Demi-vie d'un atome de paramètre $\\lambda$ :", choix: ["$\\dfrac{\\ln 2}{\\lambda}$", "$\\dfrac{1}{\\lambda}$", "$\\dfrac{\\lambda}{2}$", "$e^{-\\lambda}$"], bonne: 0, explication: "$e^{-\\lambda T} = 0{,}5$." },
    { question: "Pour la loi exponentielle, $P(X > E(X)) =$", choix: ["$e^{-1} \\approx 0{,}37$", "$0{,}5$", "$1$", "$0$"], bonne: 0, explication: "$e^{-\\lambda \\times \\frac{1}{\\lambda}}$." },
    { question: "Si $\\lambda$ augmente, la durée de vie moyenne :", choix: ["diminue", "augmente", "ne change pas", "devient nulle"], bonne: 0, explication: "$\\dfrac{1}{\\lambda}$." },
    { question: "$-\\ln(1 - u)/\\lambda$ avec $u$ = random() simule :", choix: ["une loi exponentielle", "une loi uniforme", "une loi binomiale", "une loi normale"], bonne: 0, explication: "On résout $1 - e^{-\\lambda x} = u$." },
    { question: "La somme de $20$ nombres random() vaut en moyenne :", choix: ["$10$", "$20$", "$1$", "$0{,}5$"], bonne: 0, explication: "$20 \\times 0{,}5$." },
    { question: "Variance de la loi uniforme sur $[0\\,;1]$ :", choix: ["$\\dfrac{1}{12}$", "$\\dfrac{1}{2}$", "$1$", "$\\dfrac{1}{4}$"], bonne: 0, explication: "$\\dfrac{(b - a)^2}{12}$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Montrer qu'une fonction est une densité",
      etapes: ["Vérifier que $f$ est continue et positive sur l'intervalle.", "Calculer $\\displaystyle\\int_I f(x)\\,\\mathrm{d}x$ avec une primitive.", "Conclure si l'intégrale vaut $1$ (ou trouver $k$ pour qu'elle vaille $1$)."],
      exemple: "$kx^2$ sur $[0\\,;1]$ : $\\dfrac{k}{3} = 1$, donc $k = 3$."
    },
    {
      titre: "Calculer avec la loi exponentielle",
      etapes: ["Trouver $\\lambda$ (éventuellement $\\lambda = \\dfrac{1}{E(X)}$).", "Utiliser $P(X \\leqslant t) = 1 - e^{-\\lambda t}$ ou $P(X > t) = e^{-\\lambda t}$.", "Pour une condition « sachant que », utiliser l'absence de mémoire."],
      exemple: "$E(X) = 4$ : $\\lambda = 0{,}25$ et $P(X > 8) = e^{-2} \\approx 0{,}135$."
    },
    {
      titre: "Résoudre P(X ⩽ t) = p",
      etapes: ["Écrire $1 - e^{-\\lambda t} = p$, soit $e^{-\\lambda t} = 1 - p$.", "Appliquer $\\ln$ : $-\\lambda t = \\ln(1 - p)$.", "Conclure : $t = -\\dfrac{\\ln(1 - p)}{\\lambda}$."],
      exemple: "Demi-vie : $p = 0{,}5$, $t = \\dfrac{\\ln 2}{\\lambda}$."
    }
  ],
  erreurs: [
    "Croire qu'une densité est une probabilité : c'est l'aire sous la densité qui en est une.",
    "Penser qu'une densité ne peut pas dépasser $1$.",
    "Confondre $P(X > t) = e^{-\\lambda t}$ et $P(X \\leqslant t) = 1 - e^{-\\lambda t}$.",
    "Écrire $E(X) = \\lambda$ au lieu de $\\dfrac{1}{\\lambda}$.",
    "Calculer $P(X > s + t)$ au lieu d'utiliser l'absence de mémoire pour une probabilité conditionnelle.",
    "Oublier d'intégrer $x f(x)$ (et pas $f(x)$) pour une espérance."
  ]
};
