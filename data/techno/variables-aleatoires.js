/*
  CHAPITRE : Première technologique — Variables aléatoires et loi de Bernoulli
  ----------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme 2026 de première technologique, « Variables aléatoires » : variable aléatoire discrète, loi de probabilité,
  espérance ; loi de Bernoulli (0, 1) de paramètre p et son espérance ; interpréter {X = a}, {X ≤ a} ; simuler N échantillons
  de taille n d'une loi de Bernoulli, fréquences observées, distance à p (s, 2s, 3s), écart-type de l'ordre de 1/√n.
  Aucun formalisme sur les variables aléatoires.
  video : vidéos d'Yvan Monka. Générateurs : préfixe yx- dans assets/exercices-techno.js ; figures "yx-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["techno-variables-aleatoires"] = {
  niveau: "Première technologique",
  numero: 14,
  titre: "Variables aléatoires et loi de Bernoulli",
  accroche: "Associer un nombre (un gain, un nombre de succès) au hasard, calculer ce qu'on gagne **en moyenne**, et observer par simulation comment les fréquences fluctuent autour de $p$.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : variables aléatoires (PDF)", url: "https://www.maths-et-tiques.fr/telech/19varM.pdf" },
    { titre: "Cours d'Yvan Monka : loi de Bernoulli et échantillonnage (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Bernou2TM.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Variable aléatoire et loi de probabilité",
      figure: "yx-cours-loi",
      video: { titre: "Vidéo d'Yvan Monka : déterminer une loi de probabilité", youtube: "https://youtu.be/2Ge_4hclPnI" },
      texte:
        "Une **variable aléatoire** $X$ associe un **nombre** à chaque issue d'une expérience aléatoire : un gain, un nombre de succès, une durée…\n\n" +
        "La **loi de probabilité** de $X$ donne chaque valeur possible $x_i$ et sa probabilité $P(X = x_i)$, souvent dans un tableau. La somme des probabilités vaut $1$.\n\n" +
        "Exemple : on paie $2$ € pour tourner une roue qui rapporte $12$ € avec la probabilité $0{,}2$, $5$ € avec la probabilité $0{,}3$, rien sinon. Le gain algébrique $G$ (gain moins mise) prend les valeurs $10$, $3$ et $-2$ :\n\n" +
        "| $g_i$ | $-2$ | $3$ | $10$ |\n|---|---|---|---|\n| $P(G = g_i)$ | $0{,}5$ | $0{,}3$ | $0{,}2$ |\n\n" +
        "On lit $\\{G = 3\\}$ : « le gain vaut $3$ € » et $\\{G \\leqslant 3\\}$ : « le gain vaut au plus $3$ € », de probabilité $0{,}5 + 0{,}3 = 0{,}8$.",
      exemple: {
        enonce: "Avec cette loi, calcule $P(G > 0)$.",
        solution: "$\\{G > 0\\}$ regroupe $3$ et $10$ : $P(G > 0) = 0{,}3 + 0{,}2 = 0{,}5$."
      }
    },
    {
      titre: "Espérance",
      video: { titre: "Vidéo d'Yvan Monka : calculer l'espérance d'une loi de probabilité", youtube: "https://youtu.be/AcWVxHgtWp4" },
      texte:
        "L'**espérance** de $X$ est la moyenne de ses valeurs pondérées par leurs probabilités :\n\n" +
        "$E(X) = x_1 \\times P(X = x_1) + x_2 \\times P(X = x_2) + \\dots + x_k \\times P(X = x_k)$\n\n" +
        "C'est la valeur moyenne qu'on obtiendrait en répétant l'expérience un très grand nombre de fois.\n\n" +
        "Pour la roue : $E(G) = -2 \\times 0{,}5 + 3 \\times 0{,}3 + 10 \\times 0{,}2 = -1 + 0{,}9 + 2 = 1{,}9$. En moyenne, le joueur gagne $1{,}90$ € par partie : le jeu lui est **favorable**. Un jeu est **équitable** si l'espérance du gain est nulle, **défavorable** si elle est négative.",
      exemple: {
        enonce: "$X$ prend les valeurs $0$, $5$, $20$ avec les probabilités $0{,}7$ ; $0{,}2$ ; $0{,}1$. Calcule $E(X)$.",
        solution: "$E(X) = 0 + 5 \\times 0{,}2 + 20 \\times 0{,}1 = 1 + 2 = 3$."
      }
    },
    {
      titre: "Loi de Bernoulli",
      video: { titre: "Vidéo d'Yvan Monka : probabilité associée à une succession d'épreuves de Bernoulli", youtube: "https://youtu.be/95QfNLlIzR0" },
      texte:
        "Une variable aléatoire $X$ suit la **loi de Bernoulli de paramètre $p$** quand elle ne prend que les valeurs $1$ (succès) et $0$ (échec) avec\n\n" +
        "$P(X = 1) = p$ et $P(X = 0) = 1 - p$\n\n" +
        "Son espérance vaut $E(X) = 1 \\times p + 0 \\times (1 - p) = p$.\n\n" +
        "Exemples : $X = 1$ si un client est satisfait ($p = 0{,}85$) ; $X = 1$ si une ampoule est défectueuse ($p = 0{,}02$). Une loi de Bernoulli est la façon de « compter » un succès : la somme de plusieurs variables de Bernoulli donne le nombre de succès.",
      exemple: {
        enonce: "$X$ vaut $1$ si un lancer de dé donne $5$ ou $6$, $0$ sinon. Loi et espérance ?",
        solution: "Bernoulli de paramètre $p = \\dfrac{2}{6} = \\dfrac{1}{3}$ : $P(X = 1) = \\dfrac{1}{3}$, $P(X = 0) = \\dfrac{2}{3}$, $E(X) = \\dfrac{1}{3}$."
      }
    },
    {
      titre: "Simuler des échantillons : la fluctuation",
      figure: "yx-cours-fluctuation",
      video: { titre: "Vidéo d'Yvan Monka : estimer une probabilité avec la loi des grands nombres", youtube: "https://youtu.be/mFwXs_EMYes" },
      texte:
        "Un **échantillon de taille $n$** d'une loi de Bernoulli de paramètre $p$ est une liste de $n$ résultats indépendants ($0$ ou $1$). La **fréquence observée** des $1$ est $f = \\dfrac{\\text{nombre de } 1}{n}$. Elle est proche de $p$, mais **change d'un échantillon à l'autre** : c'est la **fluctuation d'échantillonnage**.\n\n" +
        "En simulant $N$ échantillons (plusieurs centaines), on représente les fréquences par un histogramme : elles se répartissent autour de $p$. Si $s$ est l'**écart-type** de ces fréquences, on observe environ :\n\n" +
        "- $68\\,\\%$ des fréquences dans $[p - s\\,;p + s]$ ;\n" +
        "- $95\\,\\%$ dans $[p - 2s\\,;p + 2s]$ ;\n" +
        "- presque toutes ($99{,}7\\,\\%$) dans $[p - 3s\\,;p + 3s]$.\n\n" +
        "Ainsi, une fréquence observée à plus de $2s$ (et surtout $3s$) de $p$ est une situation **rare** dans le cadre du modèle : elle peut faire douter du modèle, sans le prouver faux.",
      exemple: {
        enonce: "$p = 0{,}4$ et $s = 0{,}05$ pour des échantillons de taille $100$. Une enquête donne $f = 0{,}57$. Commentaire ?",
        solution: "$|0{,}57 - 0{,}4| = 0{,}17 > 3s = 0{,}15$ : situation très rare si $p = 0{,}4$. On peut douter de ce modèle."
      }
    },
    {
      titre: "Dispersion et taille de l'échantillon",
      texte:
        "Sur des simulations, on constate que l'écart-type $s$ des fréquences est de l'ordre de $\\dfrac{1}{\\sqrt{n}}$ : plus l'échantillon est grand, plus les fréquences sont concentrées autour de $p$.\n\n" +
        "Conséquence : pour **diviser la dispersion par $k$**, il faut **multiplier la taille de l'échantillon par $k^2$**. Passer de $100$ à $400$ personnes interrogées divise seulement la dispersion par $2$.\n\n" +
        "C'est pour cela que les sondages sérieux interrogent au moins un millier de personnes."
    },
    {
      titre: "Python : simuler et compter",
      video: { titre: "Vidéo d'Yvan Monka : estimer une probabilité par échantillonnage (simulation)", youtube: "https://youtu.be/EXEcSJE31QY" },
      texte:
        "```python\nfrom random import random\nfrom statistics import pstdev\n\ndef bernoulli(p):\n    return 1 if random() < p else 0\n\ndef frequence(n, p):                     # un échantillon de taille n\n    return sum([bernoulli(p) for k in range(n)]) / n\n\nN, n, p = 1000, 100, 0.4\nF = [frequence(n, p) for j in range(N)] # N fréquences observées\ns = pstdev(F)                            # écart-type, proche de 0,05\nc = len([f for f in F if abs(f - p) <= 2 * s])\nprint(s, c / N)                          # environ 0,05 et 0,95\n```\n\n" +
        "Le tableur fait la même chose avec $\\texttt{ALEA()}$ et $\\texttt{NB.SI}$."
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "yx-loi", titre: "Lire et compléter une loi", etape: "Loi", nb: 5 },
    { type: "yx-esperance", titre: "Calculer une espérance", etape: "Espérance", nb: 5 },
    { type: "yx-jeu", titre: "Jeux : gain moyen, équitable ?", etape: "Espérance", nb: 5 },
    { type: "yx-bernoulli", titre: "Loi de Bernoulli", etape: "Bernoulli", nb: 4 },
    { type: "yx-echantillon", titre: "Échantillons et fluctuation", etape: "Échantillons", nb: 5 },
    { type: "yx-python", titre: "Simuler en Python", etape: "Échantillons", nb: 4 },
    { type: "yx-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "La somme des probabilités d'une loi de probabilité vaut :", choix: ["$1$", "$0$", "$100$", "l'espérance"], bonne: 0, explication: "Toutes les valeurs possibles sont envisagées." },
    { question: "$X$ prend les valeurs $1$, $2$, $3$ avec $P(X = 1) = 0{,}2$ et $P(X = 2) = 0{,}5$. Alors $P(X = 3)$ vaut :", choix: ["$0{,}3$", "$0{,}7$", "$0{,}5$", "$1$"], bonne: 0, explication: "$1 - 0{,}2 - 0{,}5$." },
    { question: "Avec la loi précédente, $P(X \\leqslant 2)$ vaut :", choix: ["$0{,}7$", "$0{,}5$", "$0{,}2$", "$0{,}3$"], bonne: 0, explication: "$0{,}2 + 0{,}5$." },
    { question: "Avec la loi précédente, $E(X)$ vaut :", choix: ["$2{,}1$", "$2$", "$6$", "$1$"], bonne: 0, explication: "$0{,}2 + 1 + 0{,}9 = 2{,}1$." },
    { question: "L'espérance d'une variable aléatoire est :", choix: ["la moyenne des valeurs pondérée par leurs probabilités", "la valeur la plus probable", "la plus grande valeur", "la somme des probabilités"], bonne: 0, explication: "C'est la valeur moyenne sur un grand nombre de répétitions." },
    { question: "Un jeu a une espérance de gain de $-0{,}5$ €. Le jeu est :", choix: ["défavorable au joueur", "favorable au joueur", "équitable", "impossible"], bonne: 0, explication: "En moyenne, le joueur perd $0{,}50$ € par partie." },
    { question: "Un jeu est équitable quand :", choix: ["l'espérance du gain est nulle", "on gagne une fois sur deux", "la mise est nulle", "toutes les probabilités sont égales"], bonne: 0, explication: "En moyenne on ne gagne ni ne perd." },
    { question: "On paie $3$ € ; on gagne $10$ € avec la probabilité $0{,}2$, rien sinon. L'espérance du gain algébrique est :", choix: ["$-1$ €", "$2$ €", "$7$ €", "$-3$ €"], bonne: 0, explication: "$7 \\times 0{,}2 + (-3) \\times 0{,}8 = 1{,}4 - 2{,}4$." },
    { question: "Une loi de Bernoulli de paramètre $p$ prend les valeurs :", choix: ["$0$ et $1$", "$0$ et $p$", "$1$ et $p$", "de $0$ à $n$"], bonne: 0, explication: "Échec $0$, succès $1$." },
    { question: "Si $X$ suit une loi de Bernoulli de paramètre $0{,}15$, $P(X = 0)$ vaut :", choix: ["$0{,}85$", "$0{,}15$", "$0$", "$1$"], bonne: 0, explication: "$1 - p$." },
    { question: "L'espérance d'une loi de Bernoulli de paramètre $p$ est :", choix: ["$p$", "$1 - p$", "$0{,}5$", "$1$"], bonne: 0, explication: "$1 \\times p + 0 \\times (1 - p)$." },
    { question: "Dans un échantillon de taille $200$, on obtient $86$ fois la valeur $1$. La fréquence observée est :", choix: ["$0{,}43$", "$86$", "$0{,}86$", "$2{,}33$"], bonne: 0, explication: "$\\dfrac{86}{200}$." },
    { question: "La fluctuation d'échantillonnage signifie que :", choix: ["la fréquence observée varie d'un échantillon à l'autre", "la probabilité $p$ change", "les échantillons sont faux", "on obtient toujours $p$"], bonne: 0, explication: "Le paramètre est fixe, les fréquences fluctuent autour." },
    { question: "Sur de nombreuses simulations, environ quel pourcentage des fréquences est dans $[p - 2s\\,;p + 2s]$ ?", choix: ["$95\\,\\%$", "$50\\,\\%$", "$68\\,\\%$", "$100\\,\\%$"], bonne: 0, explication: "Environ $95\\,\\%$." },
    { question: "L'écart-type des fréquences d'échantillons de taille $n$ est de l'ordre de :", choix: ["$\\dfrac{1}{\\sqrt{n}}$", "$\\dfrac{1}{n}$", "$\\sqrt{n}$", "$n$"], bonne: 0, explication: "C'est ce qu'on observe sur les simulations." },
    { question: "Pour diviser par $3$ la dispersion des fréquences, on multiplie la taille de l'échantillon par :", choix: ["$9$", "$3$", "$6$", "$\\sqrt{3}$"], bonne: 0, explication: "$\\dfrac{1}{\\sqrt{9n}} = \\dfrac{1}{3\\sqrt{n}}$." },
    { question: "$p = 0{,}5$, $s = 0{,}05$. Une fréquence observée de $0{,}53$ est :", choix: ["une situation fréquente dans le cadre du modèle", "une situation très rare", "impossible", "la preuve que $p \\neq 0{,}5$"], bonne: 0, explication: "$0{,}03 < s$ : fluctuation ordinaire." },
    { question: "$p = 0{,}5$, $s = 0{,}05$. Une fréquence observée de $0{,}68$ est :", choix: ["une situation rare : on peut douter du modèle", "une situation ordinaire", "la preuve certaine que le modèle est faux", "égale à $p$"], bonne: 0, explication: "$0{,}18 > 3s = 0{,}15$." },
    { question: "En Python, $\\texttt{1 if random() < 0.3 else 0}$ simule :", choix: ["une loi de Bernoulli de paramètre $0{,}3$", "une loi de Bernoulli de paramètre $0{,}7$", "un dé", "un nombre entre $0$ et $0{,}3$"], bonne: 0, explication: "Le résultat vaut $1$ avec la probabilité $0{,}3$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Déterminer une loi de probabilité",
      figure: "yx-cours-loi",
      etapes: [
        "Lister toutes les valeurs possibles de $X$ (penser à retirer la mise pour un gain algébrique).",
        "Calculer la probabilité de chaque valeur (arbre, équiprobabilité, tableau).",
        "Présenter dans un tableau $x_i$ / $P(X = x_i)$.",
        "Vérifier que la somme des probabilités vaut $1$."
      ],
      exemple: "Mise $2$ €, gains $12$ € ($0{,}2$) ou $5$ € ($0{,}3$) : $G \\in \\{10\\,;3\\,;-2\\}$ avec $0{,}2$ ; $0{,}3$ ; $0{,}5$."
    },
    {
      titre: "Calculer et interpréter une espérance",
      etapes: [
        "Multiplier chaque valeur par sa probabilité.",
        "Additionner tous les produits : $E(X)$.",
        "Interpréter : valeur moyenne sur un grand nombre de répétitions.",
        "Pour un jeu : $E(G) > 0$ favorable, $= 0$ équitable, $< 0$ défavorable."
      ],
      exemple: "$E(G) = 10 \\times 0{,}2 + 3 \\times 0{,}3 - 2 \\times 0{,}5 = 1{,}9$ € : favorable au joueur."
    },
    {
      titre: "Interpréter une fréquence observée",
      figure: "yx-cours-fluctuation",
      etapes: [
        "Calculer la fréquence observée $f = \\dfrac{\\text{nombre de succès}}{n}$.",
        "Récupérer (par simulation) l'écart-type $s$ des fréquences pour la taille $n$.",
        "Calculer la distance $|f - p|$ et la comparer à $s$, $2s$, $3s$.",
        "Conclure : situation fréquente (moins de $2s$) ou rare (plus de $3s$) dans le cadre du modèle."
      ],
      exemple: "$p = 0{,}3$, $n = 100$, $s \\approx 0{,}046$, $f = 0{,}35$ : $|f - p| = 0{,}05 \\approx 1{,}1s$, situation fréquente."
    }
  ],
  erreurs: [
    "Oublier de retirer la mise pour obtenir le gain algébrique.",
    "Calculer l'espérance comme la moyenne simple des valeurs.",
    "Oublier une valeur dans la loi : la somme des probabilités ne fait alors pas $1$.",
    "Confondre $P(X \\leqslant a)$ et $P(X < a)$.",
    "Croire que la fréquence observée doit être exactement égale à $p$.",
    "Penser que doubler la taille de l'échantillon divise la dispersion par $2$ (il faut la multiplier par $4$).",
    "Conclure avec certitude qu'un modèle est faux à partir d'une seule fréquence éloignée."
  ]
};
