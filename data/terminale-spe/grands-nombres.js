/*
  CHAPITRE : Terminale spécialité — Loi des grands nombres
  ---------------------------------------------------------
  Chapitre 15 de la progression de Terminale spécialité (V26, période 5, 1,5 semaine) :
  transformations de variables aléatoires (aX + b, sommes, échantillons), inégalités de concentration
  (Bienaymé-Tchebychev), loi des grands nombres.
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas de vidéo de la chaîne sur ce thème : vidéos d'Yvan Monka (cours 20VA2 et 20GrandN).
  Figure : "lgn-frequences". Générateurs : lgn- dans assets/exercices.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-spe-grands-nombres"] = {
  niveau: "Terminale spécialité",
  numero: 15,
  titre: "Loi des grands nombres",
  accroche: "Pourquoi la fréquence des 6 se rapproche de $\\dfrac{1}{6}$ quand on lance un dé un grand nombre de fois : sommes de variables aléatoires, inégalité de Bienaymé-Tchebychev et loi des grands nombres.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours : somme de variables aléatoires (Yvan Monka)", url: "https://youtu.be/GweMOVratYI", type: "video" },
    { titre: "Le cours : concentration et loi des grands nombres (Yvan Monka)", url: "https://youtu.be/_ZzxgjAxrt4", type: "video" },
    { titre: "Démonstration : espérance et variance de la loi binomiale (Yvan Monka)", url: "https://youtu.be/ljWJfGLRgJE", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Transformation affine d'une variable aléatoire",
      video: { titre: "Vidéo d'Yvan Monka : utiliser la linéarité de l'espérance", youtube: "https://youtu.be/ljITvCBExVY" },
      texte:
        "Rappels de Première : $E(X) = \\sum x_ip_i$, $V(X) = E\\left((X - E(X))^2\\right)$ et $\\sigma(X) = \\sqrt{V(X)}$.\n\n" +
        "Pour tous réels $a$ et $b$ :\n\n" +
        "- $E(aX + b) = aE(X) + b$ ;\n" +
        "- $V(aX + b) = a^2V(X)$ ;\n" +
        "- $\\sigma(aX + b) = |a|\\,\\sigma(X)$.\n\n" +
        "Ajouter une constante décale toutes les valeurs : la moyenne bouge, la dispersion ne change pas. Multiplier par $a$ multiplie les écarts par $|a|$.",
      exemple: {
        enonce: "Un jeu rapporte $X$ euros, avec $E(X) = 4$ et $V(X) = 9$. On double les gains et on retire $5$ € de mise : $G = 2X - 5$. Calcule $E(G)$ et $\\sigma(G)$.",
        solution: "$E(G) = 2 \\times 4 - 5 = 3$ €.\n\n$V(G) = 2^2 \\times 9 = 36$, donc $\\sigma(G) = 6$ € (ou directement $|2| \\times 3$)."
      }
    },
    {
      titre: "Somme de deux variables aléatoires",
      video: { titre: "Vidéo d'Yvan Monka : déterminer la loi d'une somme de variables aléatoires", youtube: "https://youtu.be/0l7tz8oGh-s" },
      texte:
        "Si $X$ et $Y$ sont deux variables aléatoires sur le même univers :\n\n" +
        "- la **loi** de $X + Y$ s'obtient en cherchant tous les couples de valeurs $(x\\,;y)$ de somme donnée ;\n" +
        "- $E(X + Y) = E(X) + E(Y)$ (**toujours**) ;\n" +
        "- si $X$ et $Y$ sont **indépendantes**, $P((X = x) \\cap (Y = y)) = P(X = x) \\times P(Y = y)$ et $V(X + Y) = V(X) + V(Y)$.\n\n" +
        "Attention : $V(X - Y) = V(X) + V(Y)$ aussi (pour des variables indépendantes), car $V(-Y) = V(Y)$.",
      exemple: {
        enonce: "On lance deux dés équilibrés. $X$ et $Y$ sont les résultats, $S = X + Y$. Calcule $P(S = 4)$, $E(S)$ et $V(S)$, sachant que $V(X) = \\dfrac{35}{12}$.",
        solution: "Couples de somme $4$ : $(1\\,;3)$, $(2\\,;2)$, $(3\\,;1)$, donc $P(S = 4) = \\dfrac{3}{36} = \\dfrac{1}{12}$.\n\n$E(S) = 3{,}5 + 3{,}5 = 7$ et, les dés étant indépendants, $V(S) = \\dfrac{35}{12} \\times 2 = \\dfrac{35}{6}$."
      }
    },
    {
      titre: "Échantillon et variable moyenne",
      video: { titre: "Vidéo d'Yvan Monka : espérance, variance et écart type d'une variable aléatoire moyenne", youtube: "https://youtu.be/o67OOavrbHQ" },
      texte:
        "Un **échantillon de taille $n$** d'une loi est une liste $(X_1, \\dots, X_n)$ de variables aléatoires **indépendantes** qui suivent toutes cette loi (d'espérance $\\mu$ et de variance $V$).\n\n" +
        "- **Somme** $S_n = X_1 + \\dots + X_n$ : $E(S_n) = n\\mu$ et $V(S_n) = nV$.\n" +
        "- **Moyenne** $M_n = \\dfrac{S_n}{n}$ : $E(M_n) = \\mu$ et $V(M_n) = \\dfrac{V}{n}$, donc $\\sigma(M_n) = \\dfrac{\\sigma}{\\sqrt{n}}$.\n\n" +
        "Plus l'échantillon est grand, moins la moyenne est dispersée autour de $\\mu$.\n\n" +
        "**Application** : une variable de loi $\\mathcal{B}(n\\,;p)$ est la somme de $n$ variables de Bernoulli indépendantes, d'où $E(X) = np$ et $V(X) = np(1 - p)$ (démonstration au programme).",
      exemple: {
        enonce: "On lance $100$ fois un dé équilibré ($\\mu = 3{,}5$, $V = \\dfrac{35}{12}$). Donne l'espérance et l'écart type de la moyenne $M_{100}$ des résultats.",
        solution: "$E(M_{100}) = 3{,}5$ et $V(M_{100}) = \\dfrac{35}{12 \\times 100} = \\dfrac{35}{1\\,200}$.\n\n$\\sigma(M_{100}) = \\sqrt{\\dfrac{35}{1\\,200}} \\approx 0{,}17$ : la moyenne de $100$ lancers est en général très proche de $3{,}5$."
      }
    },
    {
      titre: "Inégalité de Bienaymé-Tchebychev",
      video: { titre: "Vidéo d'Yvan Monka : appliquer l'inégalité de Bienaymé-Tchebychev", youtube: "https://youtu.be/4XMvq1FnYwU" },
      texte:
        "Pour toute variable aléatoire $X$ d'espérance $\\mu$ et de variance $V$, et pour tout réel $\\delta > 0$ :\n\n" +
        "$P(|X - \\mu| \\geqslant \\delta) \\leqslant \\dfrac{V}{\\delta^2}$.\n\n" +
        "Elle majore la probabilité que $X$ s'écarte de son espérance d'au moins $\\delta$, **quelle que soit la loi** de $X$.\n\n" +
        "- Avec $\\delta = 2\\sigma$ : $P(|X - \\mu| \\geqslant 2\\sigma) \\leqslant \\dfrac{1}{4}$.\n" +
        "- Par passage au contraire : $P(|X - \\mu| < \\delta) \\geqslant 1 - \\dfrac{V}{\\delta^2}$.\n\n" +
        "C'est une majoration souvent grossière (les vraies probabilités sont plus petites), mais toujours valable.",
      exemple: {
        enonce: "Le temps de trajet $X$ (en minutes) a pour espérance $30$ et pour variance $16$. Minore $P(20 < X < 40)$.",
        solution: "$20 < X < 40 \\iff |X - 30| < 10$. D'après l'inégalité de Bienaymé-Tchebychev, $P(|X - 30| \\geqslant 10) \\leqslant \\dfrac{16}{100} = 0{,}16$.\n\nDonc $P(20 < X < 40) \\geqslant 1 - 0{,}16 = 0{,}84$."
      }
    },
    {
      titre: "Inégalité de concentration",
      video: { titre: "Vidéo d'Yvan Monka : déterminer la taille d'un échantillon avec l'inégalité de concentration", youtube: "https://youtu.be/7Nk9U-zwWOA" },
      texte:
        "En appliquant Bienaymé-Tchebychev à la moyenne $M_n$ d'un échantillon (espérance $\\mu$, variance $\\dfrac{V}{n}$) :\n\n" +
        "$P(|M_n - \\mu| \\geqslant \\delta) \\leqslant \\dfrac{V}{n\\delta^2}$.\n\n" +
        "**Taille d'échantillon** : pour garantir $P(|M_n - \\mu| \\geqslant \\delta) \\leqslant \\alpha$, il suffit que $\\dfrac{V}{n\\delta^2} \\leqslant \\alpha$, c'est-à-dire $n \\geqslant \\dfrac{V}{\\alpha\\delta^2}$.",
      exemple: {
        enonce: "On estime une proportion $p$ par la fréquence observée sur $n$ personnes (variance de la loi de Bernoulli : $p(1 - p) \\leqslant 0{,}25$). Quelle taille garantit un écart d'au moins $0{,}05$ avec une probabilité au plus $0{,}05$ ?",
        solution: "Il suffit que $\\dfrac{0{,}25}{n \\times 0{,}05^2} \\leqslant 0{,}05$, soit $n \\geqslant \\dfrac{0{,}25}{0{,}05 \\times 0{,}0025} = 2\\,000$.\n\nAvec $2\\,000$ personnes interrogées, c'est garanti."
      }
    },
    {
      titre: "Loi des grands nombres",
      figure: "lgn-frequences",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la loi des grands nombres", youtube: "https://youtu.be/fzuNxQSDTb8" },
      texte:
        "**Loi (faible) des grands nombres** : pour tout $\\delta > 0$,\n\n" +
        "$\\lim\\limits_{n \\to +\\infty} P(|M_n - \\mu| \\geqslant \\delta) = 0$.\n\n" +
        "Elle découle de l'inégalité de concentration, car $\\dfrac{V}{n\\delta^2} \\to 0$.\n\n" +
        "**Interprétation** : quand on répète une expérience un grand nombre de fois, la moyenne des résultats se rapproche de l'espérance, et la **fréquence** d'un événement se rapproche de sa **probabilité** (figure : fréquence du $6$ sur $300$ lancers).\n\n" +
        "C'est ce qui justifie l'estimation d'une probabilité par une fréquence observée, et les simulations.",
      exemple: {
        enonce: "Un joueur lance $1\\,000\\,000$ de fois un dé équilibré. Que peut-on dire de la moyenne des résultats ?",
        solution: "D'après la loi des grands nombres, elle est très probablement très proche de $3{,}5$.\n\nInégalité de concentration avec $\\delta = 0{,}01$ : $P(|M_n - 3{,}5| \\geqslant 0{,}01) \\leqslant \\dfrac{35/12}{10^6 \\times 10^{-4}} \\approx 0{,}029$."
      }
    },
    {
      titre: "Algorithmique : simuler pour estimer",
      texte:
        "On simule une expérience un grand nombre de fois et on calcule la fréquence ou la moyenne :\n\n" +
        "```python\nfrom random import randint\n\ndef moyenne(n):\n    s = 0\n    for i in range(n):\n        s = s + randint(1, 6)\n    return s / n\n\nprint(moyenne(10), moyenne(10000))\n```\n\n" +
        "- $\\texttt{moyenne(10)}$ peut être loin de $3{,}5$ ; $\\texttt{moyenne(10000)}$ en est presque toujours très proche.\n" +
        "- Chaque exécution donne un résultat différent : c'est une **valeur observée** d'une variable aléatoire.\n" +
        "- Un programme peut aussi chercher, avec une boucle $\\texttt{while}$, la plus petite taille $n$ donnée par l'inégalité de concentration.",
      exemple: {
        enonce: "Comment estimer, par simulation, la probabilité d'obtenir une somme égale à $7$ avec deux dés ?",
        solution: "On simule un grand nombre $n$ de lancers de deux dés, on compte ceux de somme $7$, et on divise par $n$.\n\nLa fréquence obtenue se rapproche de $\\dfrac{6}{36} = \\dfrac{1}{6}$ quand $n$ augmente (loi des grands nombres)."
      }
    }
  ],

  videos: [
    { titre: "Calculer espérance et variance d'une somme de variables aléatoires (1)", type: "Somme", youtube: "https://youtu.be/19nVXFHbmjU" },
    { titre: "Calculer espérance et variance d'une somme de variables aléatoires (2)", type: "Somme", youtube: "https://youtu.be/fRYVMQk3bQQ" },
    { titre: "Variance et écart type d'une loi binomiale", type: "Binomiale", youtube: "https://youtu.be/MvCZw9XIZ4Q" },
    { titre: "Espérance, variance et écart type d'une loi binomiale", type: "Binomiale", youtube: "https://youtu.be/W98SSzPSAtQ" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "lgn-lineaire", titre: "Espérance et variance de $aX + b$", etape: "Transformer", nb: 5 },
    { type: "lgn-somme", titre: "Somme de variables indépendantes", etape: "Transformer", nb: 5 },
    { type: "lgn-loi-somme", titre: "Loi d'une somme", etape: "Transformer", nb: 4 },
    { type: "lgn-echantillon", titre: "Échantillon : somme et moyenne", etape: "Transformer", nb: 5 },
    { type: "lgn-binomiale", titre: "Variance de la loi binomiale", etape: "Concentration", nb: 4 },
    { type: "lgn-bienayme", titre: "Inégalité de Bienaymé-Tchebychev", etape: "Concentration", nb: 5 },
    { type: "lgn-concentration", titre: "Inégalité de concentration", etape: "Concentration", nb: 5 },
    { type: "lgn-python", titre: "Simuler en Python", etape: "Algorithmique", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$E(X) = 5$. Alors $E(3X - 2)$ vaut :", choix: ["$13$", "$15$", "$3$", "$17$"], bonne: 0, explication: "$3 \\times 5 - 2 = 13$." },
    { question: "$V(X) = 4$. Alors $V(3X - 2)$ vaut :", choix: ["$36$", "$12$", "$10$", "$34$"], bonne: 0, explication: "$V(aX + b) = a^2V(X) = 9 \\times 4$." },
    { question: "$\\sigma(X) = 2$. Alors $\\sigma(-5X + 1)$ vaut :", choix: ["$10$", "$-10$", "$9$", "$100$"], bonne: 0, explication: "$\\sigma(aX + b) = |a|\\sigma(X) = 5 \\times 2$." },
    { question: "$E(X + Y) = E(X) + E(Y)$ est vraie :", choix: ["toujours", "seulement si $X$ et $Y$ sont indépendantes", "seulement si $X = Y$", "jamais"], bonne: 0, explication: "La linéarité de l'espérance ne demande pas l'indépendance." },
    { question: "$V(X + Y) = V(X) + V(Y)$ est vraie :", choix: ["si $X$ et $Y$ sont indépendantes", "toujours", "jamais", "seulement si $E(X) = E(Y)$"], bonne: 0, explication: "Il faut l'indépendance (contre-exemple : $Y = X$ donne $V(2X) = 4V(X)$)." },
    { question: "$X$ et $Y$ indépendantes, $V(X) = 3$ et $V(Y) = 5$. Alors $V(X - Y)$ vaut :", choix: ["$8$", "$-2$", "$2$", "$15$"], bonne: 0, explication: "$V(-Y) = V(Y)$, donc les variances s'ajoutent." },
    { question: "On lance deux dés équilibrés. $P(X + Y = 3)$ vaut :", choix: ["$\\dfrac{2}{36}$", "$\\dfrac{1}{36}$", "$\\dfrac{3}{36}$", "$\\dfrac{1}{6}$"], bonne: 0, explication: "Couples $(1\\,;2)$ et $(2\\,;1)$." },
    { question: "$(X_1, \\dots, X_n)$ est un échantillon d'une loi d'espérance $\\mu$ et de variance $V$. $V(X_1 + \\dots + X_n)$ vaut :", choix: ["$nV$", "$n^2V$", "$V$", "$\\dfrac{V}{n}$"], bonne: 0, explication: "Variables indépendantes : les variances s'ajoutent." },
    { question: "La moyenne $M_n$ d'un échantillon de taille $n$ a pour variance :", choix: ["$\\dfrac{V}{n}$", "$nV$", "$V$", "$\\dfrac{V}{n^2}$"], bonne: 0, explication: "$V\\left(\\dfrac{S_n}{n}\\right) = \\dfrac{nV}{n^2} = \\dfrac{V}{n}$." },
    { question: "Si on multiplie la taille de l'échantillon par $4$, l'écart type de la moyenne est :", choix: ["divisé par $2$", "divisé par $4$", "multiplié par $2$", "inchangé"], bonne: 0, explication: "$\\sigma(M_n) = \\dfrac{\\sigma}{\\sqrt{n}}$ et $\\sqrt{4} = 2$." },
    { question: "La formule $V(X) = np(1 - p)$ pour la loi binomiale se démontre en écrivant $X$ comme :", choix: ["une somme de $n$ variables de Bernoulli indépendantes", "un produit de $n$ variables", "$n$ fois une variable de Bernoulli", "une moyenne"], bonne: 0, explication: "Chaque variable de Bernoulli a pour variance $p(1 - p)$." },
    { question: "L'inégalité de Bienaymé-Tchebychev s'écrit :", choix: ["$P(|X - \\mu| \\geqslant \\delta) \\leqslant \\dfrac{V(X)}{\\delta^2}$", "$P(|X - \\mu| \\geqslant \\delta) \\geqslant \\dfrac{V(X)}{\\delta^2}$", "$P(|X - \\mu| \\leqslant \\delta) \\leqslant \\dfrac{V(X)}{\\delta}$", "$P(X \\geqslant \\delta) = \\dfrac{V(X)}{\\delta^2}$"], bonne: 0, explication: "Elle majore la probabilité de s'écarter de la moyenne." },
    { question: "$E(X) = 50$ et $V(X) = 25$. L'inégalité de Bienaymé-Tchebychev donne $P(|X - 50| \\geqslant 10) \\leqslant$ :", choix: ["$0{,}25$", "$2{,}5$", "$0{,}5$", "$0{,}025$"], bonne: 0, explication: "$\\dfrac{25}{10^2} = 0{,}25$." },
    { question: "Avec $\\delta = 3\\sigma$, l'inégalité de Bienaymé-Tchebychev donne $P(|X - \\mu| \\geqslant 3\\sigma) \\leqslant$ :", choix: ["$\\dfrac{1}{9}$", "$\\dfrac{1}{3}$", "$3$", "$\\dfrac{1}{6}$"], bonne: 0, explication: "$\\dfrac{\\sigma^2}{9\\sigma^2} = \\dfrac{1}{9}$, pour n'importe quelle loi." },
    { question: "$E(X) = 20$ et $V(X) = 4$. Alors $P(16 < X < 24)$ est au moins égale à :", choix: ["$0{,}75$", "$0{,}25$", "$0{,}5$", "$1$"], bonne: 0, explication: "$P(|X - 20| \\geqslant 4) \\leqslant \\dfrac{4}{16} = 0{,}25$, donc la probabilité contraire est au moins $0{,}75$." },
    { question: "L'inégalité de concentration pour la moyenne $M_n$ s'écrit :", choix: ["$P(|M_n - \\mu| \\geqslant \\delta) \\leqslant \\dfrac{V}{n\\delta^2}$", "$P(|M_n - \\mu| \\geqslant \\delta) \\leqslant \\dfrac{nV}{\\delta^2}$", "$P(|M_n - \\mu| \\geqslant \\delta) \\leqslant \\dfrac{V}{\\delta^2}$", "$P(M_n = \\mu) = 1$"], bonne: 0, explication: "C'est Bienaymé-Tchebychev appliquée à $M_n$, de variance $\\dfrac{V}{n}$." },
    { question: "Pour avoir $\\dfrac{1}{n \\times 0{,}1^2} \\leqslant 0{,}05$, il faut :", choix: ["$n \\geqslant 2\\,000$", "$n \\geqslant 200$", "$n \\geqslant 20$", "$n \\geqslant 20\\,000$"], bonne: 0, explication: "$n \\geqslant \\dfrac{1}{0{,}05 \\times 0{,}01} = 2\\,000$." },
    { question: "La loi des grands nombres affirme que, quand $n$ devient grand :", choix: ["la moyenne de l'échantillon se rapproche de l'espérance avec une probabilité qui tend vers $1$", "la moyenne de l'échantillon est égale à l'espérance", "les résultats deviennent tous égaux", "la variance de chaque $X_i$ diminue"], bonne: 0, explication: "C'est une convergence « en probabilité » : de grands écarts deviennent de plus en plus improbables." },
    { question: "On lance $10\\,000$ fois une pièce équilibrée. La fréquence de PILE sera :", choix: ["très probablement proche de $0{,}5$", "exactement $0{,}5$", "égale à $5\\,000$", "imprévisible, même approximativement"], bonne: 0, explication: "La fréquence fluctue, mais se concentre autour de la probabilité $0{,}5$." },
    { question: "Pourquoi peut-on estimer une probabilité par une fréquence observée sur un grand nombre d'expériences ?", choix: ["Grâce à la loi des grands nombres", "Grâce à la formule des probabilités totales", "Grâce au TVI", "On ne peut pas"], bonne: 0, explication: "La fréquence est la moyenne des variables de Bernoulli de chaque expérience." },
    { question: "En Python, $\\texttt{randint(1, 6)}$ renvoie :", choix: ["un entier au hasard entre $1$ et $6$ inclus", "un réel entre $1$ et $6$", "un entier entre $1$ et $5$", "toujours $3{,}5$"], bonne: 0, explication: "Les deux bornes sont incluses pour $\\texttt{randint}$." },
    { question: "L'inégalité de Bienaymé-Tchebychev est une majoration :", choix: ["valable pour toutes les lois, mais souvent grossière", "exacte pour toutes les lois", "valable seulement pour la loi binomiale", "fausse si la variance est grande"], bonne: 0, explication: "Elle n'utilise que l'espérance et la variance, sans connaître la loi." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer espérance et variance par transformation",
      etapes: [
        "Écrire la variable comme $aX + b$, ou comme une somme $X + Y$ (ou $X_1 + \\dots + X_n$).",
        "Espérance : $E(aX + b) = aE(X) + b$ et $E(X + Y) = E(X) + E(Y)$, toujours.",
        "Variance : $V(aX + b) = a^2V(X)$ ; $V(X + Y) = V(X) + V(Y)$ seulement si $X$ et $Y$ sont indépendantes.",
        "Écart type : racine carrée de la variance (positif)."
      ],
      exemple: "Gain total sur $10$ parties indépendantes, chacune d'espérance $2$ et de variance $3$ : $E = 20$, $V = 30$."
    },
    {
      titre: "Utiliser l'inégalité de Bienaymé-Tchebychev",
      etapes: [
        "Calculer l'espérance $\\mu$ et la variance $V$ de la variable.",
        "Traduire l'événement en écart à la moyenne : $a < X < b$ avec $\\mu$ au milieu devient $|X - \\mu| < \\delta$.",
        "Majorer $P(|X - \\mu| \\geqslant \\delta)$ par $\\dfrac{V}{\\delta^2}$.",
        "Si besoin, passer au contraire : $P(|X - \\mu| < \\delta) \\geqslant 1 - \\dfrac{V}{\\delta^2}$."
      ],
      exemple: "$X$ de loi $\\mathcal{B}(100\\,;0{,}5)$ : $\\mu = 50$, $V = 25$ ; $P(40 < X < 60) \\geqslant 1 - \\dfrac{25}{100} = 0{,}75$."
    },
    {
      titre: "Déterminer une taille d'échantillon",
      etapes: [
        "Identifier la variance $V$ de la loi (pour une proportion : $p(1 - p) \\leqslant 0{,}25$).",
        "Écrire la condition $\\dfrac{V}{n\\delta^2} \\leqslant \\alpha$.",
        "Isoler $n$ : $n \\geqslant \\dfrac{V}{\\alpha\\delta^2}$.",
        "Donner le premier entier qui convient."
      ],
      exemple: "$V = 4$, $\\delta = 0{,}5$, $\\alpha = 0{,}1$ : $n \\geqslant \\dfrac{4}{0{,}1 \\times 0{,}25} = 160$."
    }
  ],
  erreurs: [
    "Écrire $V(aX + b) = aV(X) + b$ : la constante disparaît et $a$ est au carré.",
    "Additionner les variances de variables qui ne sont pas indépendantes.",
    "Écrire $V(X - Y) = V(X) - V(Y)$ : les variances s'ajoutent.",
    "Confondre $V(S_n) = nV$ et $V(M_n) = \\dfrac{V}{n}$.",
    "Oublier le carré de $\\delta$ dans l'inégalité de Bienaymé-Tchebychev.",
    "Croire que la loi des grands nombres donne exactement l'espérance pour un grand échantillon.",
    "Croire qu'après une série de PILE, FACE devient plus probable : les lancers sont indépendants."
  ]
};
