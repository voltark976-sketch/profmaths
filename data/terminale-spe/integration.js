/*
  CHAPITRE : Terminale spécialité — Calcul intégral
  --------------------------------------------------
  Chapitre 13 de la progression de Terminale spécialité (V26, période 4, 3 semaines) :
  intégrale d'une fonction continue et positive, intégrale d'une fonction continue, applications du calcul intégral
  (propriétés, intégration par parties, valeur moyenne, aire entre deux courbes, méthode des rectangles).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas de vidéo de la chaîne sur ce thème : vidéos d'Yvan Monka (cours 20IntegT1 et 20IntegT2).
  Figures : "tin-aire", "tin-signe", "tin-entre", "tin-moyenne", "tin-rectangles" (définies avec le chapitre
  d'intégration de Terminale maths complémentaires). Générateurs : itg- dans assets/exercices.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-spe-integration"] = {
  niveau: "Terminale spécialité",
  numero: 13,
  titre: "Calcul intégral",
  accroche: "Mesurer l'aire sous une courbe avec $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$ : le lien avec les primitives, les propriétés, l'intégration par parties, la valeur moyenne et la méthode des rectangles.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours complet sur l'intégration en vidéo (Yvan Monka)", url: "https://youtu.be/pFKzXZrMVxs", type: "video" },
    { titre: "Démonstration : x ↦ ∫ f(t) dt est une primitive de f (Yvan Monka)", url: "https://youtu.be/p2W6FYBxTlo", type: "video" },
    { titre: "Démonstration : la formule d'intégration par parties (Yvan Monka)", url: "https://youtu.be/v3TdIdu0sgk", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Intégrale d'une fonction continue et positive",
      figure: "tin-aire",
      video: { titre: "Vidéo d'Yvan Monka : déterminer une intégrale par calculs d'aire", youtube: "https://youtu.be/jkxNKkmEXZA" },
      texte:
        "Dans un repère orthogonal, l'**unité d'aire** (u.a.) est l'aire du rectangle construit sur les vecteurs unités.\n\n" +
        "Soit $f$ continue et **positive** sur $[a\\,;b]$. L'**intégrale** de $f$ de $a$ à $b$, notée $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$, est l'**aire** (en u.a.) du domaine compris entre la courbe de $f$, l'axe des abscisses et les droites $x = a$ et $x = b$.\n\n" +
        "- La variable $x$ est **muette** : $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x = \\int_a^b f(t)\\,\\mathrm{d}t$.\n" +
        "- Pour une fonction affine, on calcule l'aire d'un rectangle, d'un triangle ou d'un trapèze.\n" +
        "- Pour les autres fonctions, on utilise une primitive (notion 2), ou on approche l'aire par des rectangles (notion 7).",
      exemple: {
        enonce: "Calcule $\\displaystyle\\int_0^3 (x + 1)\\,\\mathrm{d}x$ par un calcul d'aire.",
        solution: "Le domaine est un trapèze de bases $f(0) = 1$ et $f(3) = 4$, de hauteur $3$.\n\nAire $= \\dfrac{(1 + 4) \\times 3}{2} = 7{,}5$ u.a."
      }
    },
    {
      titre: "Intégrale et primitive",
      video: { titre: "Vidéo d'Yvan Monka : calculer une intégrale", youtube: "https://youtu.be/Z3vKJJE57Uw" },
      texte:
        "**Théorème** (démonstration au programme dans le cas d'une fonction croissante) : si $f$ est continue et positive sur $[a\\,;b]$, la fonction $F : x \\mapsto \\displaystyle\\int_a^x f(t)\\,\\mathrm{d}t$ est dérivable et $F' = f$. C'est la **primitive de $f$ qui s'annule en $a$**.\n\n" +
        "On en déduit que toute fonction continue a des primitives, et :\n\n" +
        "$\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x = F(b) - F(a)$, où $F$ est **n'importe quelle** primitive de $f$.\n\n" +
        "On note $\\left[F(x)\\right]_a^b = F(b) - F(a)$.\n\n" +
        "**Intégrale d'une fonction continue de signe quelconque** : on la définit par cette même formule. Les parties du domaine **sous** l'axe des abscisses comptent alors **négativement**.",
      exemple: {
        enonce: "Calcule $\\displaystyle\\int_1^2 (3x^2 - 2x)\\,\\mathrm{d}x$ et $\\displaystyle\\int_0^{\\ln 2} e^x\\,\\mathrm{d}x$.",
        solution: "$\\left[x^3 - x^2\\right]_1^2 = (8 - 4) - (1 - 1) = 4$.\n\n$\\left[e^x\\right]_0^{\\ln 2} = e^{\\ln 2} - e^0 = 2 - 1 = 1$."
      }
    },
    {
      titre: "Propriétés de l'intégrale",
      figure: "tin-signe",
      video: { titre: "Vidéo d'Yvan Monka : calculer une intégrale à l'aide des formules de linéarité", youtube: "https://youtu.be/B9n_AArwjKw" },
      texte:
        "Pour $f$ et $g$ continues sur un intervalle contenant $a$, $b$, $c$ :\n\n" +
        "- $\\displaystyle\\int_a^a f = 0$ et $\\displaystyle\\int_b^a f = -\\int_a^b f$ ;\n" +
        "- **Chasles** : $\\displaystyle\\int_a^b f + \\int_b^c f = \\int_a^c f$ ;\n" +
        "- **Linéarité** : $\\displaystyle\\int_a^b (kf + mg) = k\\int_a^b f + m\\int_a^b g$ ;\n" +
        "- **Positivité** : si $a \\leqslant b$ et $f \\geqslant 0$ sur $[a\\,;b]$, alors $\\displaystyle\\int_a^b f \\geqslant 0$ ;\n" +
        "- **Croissance** : si $a \\leqslant b$ et $f \\leqslant g$ sur $[a\\,;b]$, alors $\\displaystyle\\int_a^b f \\leqslant \\int_a^b g$.\n\n" +
        "Attention : une intégrale peut être négative ou nulle, une **aire** est toujours positive. Sur la figure, l'intégrale de $x - 1$ entre $-1$ et $3$ vaut $2 - 2 = 0$, mais l'aire colorée vaut $4$.",
      exemple: {
        enonce: "Sachant que $\\displaystyle\\int_0^2 f = 5$ et $\\int_2^6 f = -3$, calcule $\\displaystyle\\int_0^6 f$ et $\\int_6^0 2f$.",
        solution: "Chasles : $\\displaystyle\\int_0^6 f = 5 + (-3) = 2$.\n\n$\\displaystyle\\int_6^0 2f = -2\\int_0^6 f = -4$."
      }
    },
    {
      titre: "Intégration par parties",
      video: { titre: "Vidéo d'Yvan Monka : effectuer une intégration par parties", youtube: "https://youtu.be/uNIpYeaNfsg" },
      texte:
        "Si $u$ et $v$ sont dérivables, à dérivées continues sur $[a\\,;b]$ :\n\n" +
        "$\\displaystyle\\int_a^b u(x)v'(x)\\,\\mathrm{d}x = \\left[u(x)v(x)\\right]_a^b - \\int_a^b u'(x)v(x)\\,\\mathrm{d}x$.\n\n" +
        "C'est la formule $(uv)' = u'v + uv'$, intégrée (démonstration au programme).\n\n" +
        "**Choix** : on prend pour $u$ ce qui se simplifie en dérivant (un polynôme, ou $\\ln x$), et pour $v'$ ce qu'on sait intégrer ($e^{kx}$, $\\sin$, $\\cos$, une puissance). La nouvelle intégrale doit être plus simple.",
      exemple: {
        enonce: "Calcule $\\displaystyle\\int_0^1 xe^x\\,\\mathrm{d}x$.",
        solution: "$u(x) = x$, $v'(x) = e^x$ : $u'(x) = 1$, $v(x) = e^x$.\n\n$\\displaystyle\\int_0^1 xe^x\\,\\mathrm{d}x = \\left[xe^x\\right]_0^1 - \\int_0^1 e^x\\,\\mathrm{d}x = e - (e - 1) = 1$."
      }
    },
    {
      titre: "Valeur moyenne",
      figure: "tin-moyenne",
      video: { titre: "Vidéo d'Yvan Monka : calculer la valeur moyenne d'une fonction", youtube: "https://youtu.be/oVFHojz5y50" },
      texte:
        "La **valeur moyenne** de $f$ continue sur $[a\\,;b]$ (avec $a < b$) est :\n\n" +
        "$\\mu = \\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$.\n\n" +
        "Pour $f$ positive : le rectangle de base $[a\\,;b]$ et de hauteur $\\mu$ a la même aire que le domaine sous la courbe.\n\n" +
        "Exemples : température moyenne sur une journée, vitesse moyenne quand $f$ est une vitesse.",
      exemple: {
        enonce: "Calcule la valeur moyenne de $f(x) = x(4 - x)$ sur $[0\\,;4]$.",
        solution: "$\\displaystyle\\int_0^4 (4x - x^2)\\,\\mathrm{d}x = \\left[2x^2 - \\dfrac{x^3}{3}\\right]_0^4 = 32 - \\dfrac{64}{3} = \\dfrac{32}{3}$.\n\n$\\mu = \\dfrac{1}{4} \\times \\dfrac{32}{3} = \\dfrac{8}{3} \\approx 2{,}67$."
      }
    },
    {
      titre: "Aire entre deux courbes",
      figure: "tin-entre",
      video: { titre: "Vidéo d'Yvan Monka : calculer l'aire entre deux courbes", youtube: "https://youtu.be/oRSAYNwUiHQ" },
      texte:
        "Si $f$ et $g$ sont continues et $g \\leqslant f$ sur $[a\\,;b]$, l'aire du domaine compris entre les deux courbes et les droites $x = a$ et $x = b$ est :\n\n" +
        "$\\displaystyle\\int_a^b \\left(f(x) - g(x)\\right)\\mathrm{d}x$.\n\n" +
        "**Méthode** : trouver les points d'intersection (souvent les bornes), déterminer quelle courbe est au-dessus (signe de $f - g$), puis intégrer la différence.",
      exemple: {
        enonce: "Calcule l'aire du domaine compris entre les courbes de $f(x) = 2x$ et $g(x) = x^2$ entre $0$ et $2$.",
        solution: "Sur $[0\\,;2]$, $2x - x^2 = x(2 - x) \\geqslant 0$ : $f$ est au-dessus.\n\nAire $= \\displaystyle\\int_0^2 (2x - x^2)\\,\\mathrm{d}x = \\left[x^2 - \\dfrac{x^3}{3}\\right]_0^2 = 4 - \\dfrac{8}{3} = \\dfrac{4}{3}$ u.a."
      }
    },
    {
      titre: "Algorithmique : la méthode des rectangles",
      figure: "tin-rectangles",
      video: { titre: "Vidéo d'Yvan Monka : encadrer une intégrale", youtube: "https://youtu.be/VK0PvzWBIso" },
      texte:
        "Quand on ne connaît pas de primitive, on **approche** l'intégrale : on découpe $[a\\,;b]$ en $n$ intervalles de largeur $h = \\dfrac{b - a}{n}$ et on additionne les aires de rectangles.\n\n" +
        "```python\ndef rectangles(f, a, b, n):\n    h = (b - a) / n\n    s = 0\n    for i in range(n):\n        s = s + h * f(a + i * h)\n    return s\n```\n\n" +
        "Pour une fonction **croissante**, les rectangles « à gauche » donnent une valeur par défaut et ceux « à droite » une valeur par excès : on obtient un **encadrement** de l'intégrale, d'autant plus précis que $n$ est grand.",
      exemple: {
        enonce: "Que donne $\\texttt{rectangles(f, 0, 1, 4)}$ pour $f(x) = x^2$ ? Compare à la valeur exacte.",
        solution: "$h = 0{,}25$ : $0{,}25 \\times (0 + 0{,}0625 + 0{,}25 + 0{,}5625) = 0{,}21875$.\n\nValeur exacte : $\\displaystyle\\int_0^1 x^2\\,\\mathrm{d}x = \\dfrac{1}{3} \\approx 0{,}333$. Les rectangles à gauche donnent une valeur par défaut (figure)."
      }
    }
  ],

  videos: [
    { titre: "Calculer une intégrale par calculs d'aire (2)", type: "Aire", youtube: "https://youtu.be/l2zuaZukc0g" },
    { titre: "Effectuer une intégration par parties (2)", type: "Par parties", youtube: "https://youtu.be/vNQeSEb2mj8" },
    { titre: "Étudier une fonction définie par une intégrale", type: "Fonction", youtube: "https://youtu.be/6DHXw5TRzN4" },
    { titre: "Étudier une suite définie par une intégrale", type: "Suite", youtube: "https://youtu.be/8I0jA4lClKM" },
    { titre: "Prépare ton bac : exponentielle, intégration, algorithme", type: "Bac", youtube: "https://youtu.be/JpdTZYEJBpA" },
    { titre: "Prépare ton bac : logarithme, dérivation, intégration, algorithme", type: "Bac", youtube: "https://youtu.be/akJabWOn3jU" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "itg-aire", titre: "Intégrale et aire", etape: "Définir", nb: 4 },
    { type: "itg-poly", titre: "Calculer avec une primitive", etape: "Calculer", nb: 5 },
    { type: "itg-exact", titre: "Valeurs exactes", etape: "Calculer", nb: 5 },
    { type: "itg-proprietes", titre: "Chasles et linéarité", etape: "Calculer", nb: 5 },
    { type: "itg-signe", titre: "Signe, comparaison, aire", etape: "Calculer", nb: 4 },
    { type: "itg-ipp", titre: "Intégration par parties", etape: "Calculer", nb: 5 },
    { type: "itg-fonction", titre: "Fonction définie par une intégrale", etape: "Appliquer", nb: 4 },
    { type: "itg-moyenne", titre: "Valeur moyenne", etape: "Appliquer", nb: 4 },
    { type: "itg-entre", titre: "Aire entre deux courbes", etape: "Appliquer", nb: 4 },
    { type: "itg-python", titre: "Méthode des rectangles", etape: "Algorithmique", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Pour $f$ continue et positive, $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$ représente :", choix: ["l'aire sous la courbe entre $x = a$ et $x = b$", "la pente de la courbe", "la valeur de $f$ en $b$", "la longueur de la courbe"], bonne: 0, explication: "C'est la définition, en unités d'aire." },
    { question: "$\\displaystyle\\int_0^4 3\\,\\mathrm{d}x$ vaut :", choix: ["$12$", "$3$", "$7$", "$\\dfrac{3}{4}$"], bonne: 0, explication: "Aire d'un rectangle de largeur $4$ et de hauteur $3$." },
    { question: "$\\displaystyle\\int_0^2 x\\,\\mathrm{d}x$ vaut :", choix: ["$2$", "$4$", "$1$", "$0$"], bonne: 0, explication: "Triangle de base $2$ et de hauteur $2$, ou $\\left[\\dfrac{x^2}{2}\\right]_0^2 = 2$." },
    { question: "Si $F$ est une primitive de $f$, $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$ vaut :", choix: ["$F(b) - F(a)$", "$F(a) - F(b)$", "$f(b) - f(a)$", "$F(b) + F(a)$"], bonne: 0, explication: "Le théorème fondamental relie intégrale et primitive." },
    { question: "$\\displaystyle\\int_0^1 e^x\\,\\mathrm{d}x$ vaut :", choix: ["$e - 1$", "$e$", "$1$", "$e + 1$"], bonne: 0, explication: "$\\left[e^x\\right]_0^1 = e - 1$." },
    { question: "$\\displaystyle\\int_1^e \\dfrac{1}{x}\\,\\mathrm{d}x$ vaut :", choix: ["$1$", "$e - 1$", "$0$", "$\\dfrac{1}{e}$"], bonne: 0, explication: "$\\left[\\ln x\\right]_1^e = 1 - 0$." },
    { question: "$\\displaystyle\\int_{-1}^{1} x^3\\,\\mathrm{d}x$ vaut :", choix: ["$0$", "$\\dfrac{1}{2}$", "$2$", "$-\\dfrac{1}{2}$"], bonne: 0, explication: "$\\left[\\dfrac{x^4}{4}\\right]_{-1}^1 = \\dfrac{1}{4} - \\dfrac{1}{4} = 0$ : les deux parties se compensent (fonction impaire)." },
    { question: "$\\displaystyle\\int_2^5 f = 4$. Alors $\\displaystyle\\int_5^2 f$ vaut :", choix: ["$-4$", "$4$", "$\\dfrac{1}{4}$", "$0$"], bonne: 0, explication: "Échanger les bornes change le signe." },
    { question: "$\\displaystyle\\int_0^1 f = 2$ et $\\int_1^3 f = 5$. Alors $\\displaystyle\\int_0^3 f$ vaut :", choix: ["$7$", "$3$", "$10$", "$-3$"], bonne: 0, explication: "Relation de Chasles." },
    { question: "$\\displaystyle\\int_0^1 f = 2$ et $\\int_0^1 g = -1$. Alors $\\displaystyle\\int_0^1 (3f - 2g)$ vaut :", choix: ["$8$", "$4$", "$1$", "$5$"], bonne: 0, explication: "Linéarité : $3 \\times 2 - 2 \\times (-1) = 8$." },
    { question: "Si $f(x) \\leqslant 0$ pour tout $x \\in [1\\,;4]$, alors :", choix: ["$\\displaystyle\\int_1^4 f \\leqslant 0$", "$\\displaystyle\\int_1^4 f \\geqslant 0$", "$\\displaystyle\\int_1^4 f = 0$", "on ne peut rien dire"], bonne: 0, explication: "Positivité appliquée à $-f$." },
    { question: "Une intégrale est toujours positive :", choix: ["Faux : elle peut être négative si $f$ est négative", "Vrai, car c'est une aire", "Vrai si $a < b$", "Faux : elle est toujours négative"], bonne: 0, explication: "Les parties sous l'axe comptent négativement. Une aire, elle, est positive." },
    { question: "L'aire entre la courbe de $f(x) = x - 1$, l'axe des abscisses et les droites $x = 0$ et $x = 2$ vaut :", choix: ["$1$", "$0$", "$2$", "$-1$"], bonne: 0, explication: "Deux triangles d'aire $\\dfrac{1}{2}$ chacun ; l'intégrale, elle, vaut $0$." },
    { question: "$F(x) = \\displaystyle\\int_1^x \\dfrac{e^t}{t}\\,\\mathrm{d}t$ pour $x > 0$. Alors $F'(x)$ vaut :", choix: ["$\\dfrac{e^x}{x}$", "$\\dfrac{e^x}{x} - e$", "$e^x\\ln x$", "$0$"], bonne: 0, explication: "$F$ est la primitive de $t \\mapsto \\dfrac{e^t}{t}$ qui s'annule en $1$." },
    { question: "La formule d'intégration par parties est :", choix: ["$\\displaystyle\\int_a^b uv' = [uv]_a^b - \\int_a^b u'v$", "$\\displaystyle\\int_a^b uv' = [uv]_a^b + \\int_a^b u'v$", "$\\displaystyle\\int_a^b uv = \\int u \\times \\int v$", "$\\displaystyle\\int_a^b uv' = u'v$"], bonne: 0, explication: "On intègre $(uv)' = u'v + uv'$." },
    { question: "Pour calculer $\\displaystyle\\int x\\ln x\\,\\mathrm{d}x$ par parties, on choisit :", choix: ["$u = \\ln x$ et $v' = x$", "$u = x$ et $v' = \\ln x$", "$u = x\\ln x$ et $v' = 1$", "$u = 1$ et $v' = x\\ln x$"], bonne: 0, explication: "On dérive $\\ln x$ (qui devient $\\dfrac{1}{x}$) et on intègre $x$." },
    { question: "$\\displaystyle\\int_0^{\\pi} \\sin x\\,\\mathrm{d}x$ vaut :", choix: ["$2$", "$0$", "$1$", "$\\pi$"], bonne: 0, explication: "$\\left[-\\cos x\\right]_0^{\\pi} = 1 + 1 = 2$." },
    { question: "La valeur moyenne de $f(x) = x^2$ sur $[0\\,;3]$ est :", choix: ["$3$", "$9$", "$4{,}5$", "$1$"], bonne: 0, explication: "$\\dfrac{1}{3}\\displaystyle\\int_0^3 x^2\\,\\mathrm{d}x = \\dfrac{1}{3} \\times 9 = 3$." },
    { question: "Si $g \\leqslant f$ sur $[a\\,;b]$, l'aire entre les courbes vaut :", choix: ["$\\displaystyle\\int_a^b (f - g)$", "$\\displaystyle\\int_a^b (g - f)$", "$\\displaystyle\\int_a^b f \\times g$", "$\\displaystyle\\int_a^b f + \\int_a^b g$"], bonne: 0, explication: "On intègre la différence « haut moins bas », positive." },
    { question: "Avec la méthode des rectangles, augmenter $n$ :", choix: ["améliore l'approximation de l'intégrale", "ne change rien", "donne une valeur exacte pour toute fonction", "rend le calcul faux"], bonne: 0, explication: "Les rectangles épousent mieux la courbe quand leur largeur diminue." },
    { question: "Pour une fonction croissante, les rectangles « à gauche » donnent :", choix: ["une valeur par défaut de l'intégrale", "une valeur par excès", "la valeur exacte", "une valeur négative"], bonne: 0, explication: "Chaque rectangle prend la hauteur la plus basse de son intervalle." },
    { question: "$\\displaystyle\\int_0^1 2xe^{x^2}\\,\\mathrm{d}x$ vaut :", choix: ["$e - 1$", "$e$", "$2e$", "$\\dfrac{e - 1}{2}$"], bonne: 0, explication: "Forme $u'e^u$ : primitive $e^{x^2}$, et $e^1 - e^0 = e - 1$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer une intégrale",
      etapes: [
        "Chercher une primitive $F$ de $f$ (tableau, formes composées, ou intégration par parties).",
        "Écrire $\\left[F(x)\\right]_a^b$.",
        "Calculer $F(b) - F(a)$ avec soin (parenthèses autour de $F(a)$).",
        "Contrôler le signe : si $f \\geqslant 0$ et $a < b$, le résultat doit être positif."
      ],
      exemple: "$\\displaystyle\\int_0^2 (x^2 + 1)\\,\\mathrm{d}x = \\left[\\dfrac{x^3}{3} + x\\right]_0^2 = \\dfrac{8}{3} + 2 = \\dfrac{14}{3}$."
    },
    {
      titre: "Calculer une aire",
      etapes: [
        "Étudier le signe de la fonction (ou de la différence $f - g$) sur l'intervalle.",
        "Découper l'intervalle aux points où le signe change.",
        "Sur chaque morceau : intégrer $f$ si $f \\geqslant 0$, $-f$ si $f \\leqslant 0$ (ou « haut moins bas »).",
        "Additionner, et donner le résultat en unités d'aire (convertir si les unités sont en cm)."
      ],
      exemple: "Aire entre $y = x^2$ et l'axe pour $x \\in [-1\\,;2]$ : $\\displaystyle\\int_{-1}^2 x^2\\,\\mathrm{d}x = \\dfrac{8}{3} + \\dfrac{1}{3} = 3$ u.a."
    },
    {
      titre: "Intégrer par parties",
      etapes: [
        "Écrire la fonction comme un produit $u \\times v'$.",
        "Choisir $u$ qui se simplifie en dérivant, $v'$ dont on connaît une primitive $v$.",
        "Calculer $u'$ et $v$, puis appliquer la formule.",
        "Calculer le crochet et la nouvelle intégrale ; vérifier en dérivant une primitive obtenue si possible."
      ],
      exemple: "$\\displaystyle\\int_1^e \\ln x\\,\\mathrm{d}x$ : $u = \\ln x$, $v' = 1$, d'où $\\left[x\\ln x\\right]_1^e - \\int_1^e 1\\,\\mathrm{d}x = e - (e - 1) = 1$."
    },
    {
      titre: "Encadrer une intégrale",
      etapes: [
        "Encadrer la fonction sur l'intervalle : $m \\leqslant f(x) \\leqslant M$ (variations, inégalités connues).",
        "Intégrer l'encadrement (croissance de l'intégrale, avec $a \\leqslant b$).",
        "Conclure : $m(b - a) \\leqslant \\displaystyle\\int_a^b f \\leqslant M(b - a)$.",
        "Numériquement : méthode des rectangles à gauche et à droite pour une fonction monotone."
      ],
      exemple: "Sur $[0\\,;1]$, $1 \\leqslant e^{x^2} \\leqslant e$, donc $1 \\leqslant \\displaystyle\\int_0^1 e^{x^2}\\,\\mathrm{d}x \\leqslant e$."
    }
  ],
  erreurs: [
    "Calculer $F(a) - F(b)$ au lieu de $F(b) - F(a)$.",
    "Oublier les parenthèses autour de $F(a)$ quand il est négatif.",
    "Confondre intégrale (peut être négative) et aire (toujours positive).",
    "Oublier de diviser par $b - a$ dans une valeur moyenne.",
    "Intégrer $g - f$ au lieu de $f - g$ pour une aire entre deux courbes (« haut moins bas »).",
    "Dans une intégration par parties, oublier le signe moins devant la seconde intégrale.",
    "Croire que la méthode des rectangles donne la valeur exacte."
  ]
};
