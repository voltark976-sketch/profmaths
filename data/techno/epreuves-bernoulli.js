/*
  CHAPITRE : Première technologique — Répétition d'épreuves de Bernoulli
  ----------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme 2026 de première technologique, « Modèle associé à une expérience aléatoire à plusieurs épreuves indépendantes » :
  probabilité associée à la répétition d'épreuves de Bernoulli identiques et indépendantes ; représenter par un arbre la
  répétition de n ≤ 4 épreuves pour calculer des probabilités. (La loi binomiale n'est pas au programme de Première techno.)
  video : vidéos d'Yvan Monka. Générateurs : préfixe yb- dans assets/exercices-techno.js ; figures "yb-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["techno-epreuves-bernoulli"] = {
  niveau: "Première technologique",
  numero: 13,
  titre: "Répétition d'épreuves de Bernoulli",
  accroche: "Succès ou échec, répété $2$, $3$ ou $4$ fois de façon indépendante : un arbre, des produits le long des chemins, et l'astuce de l'événement contraire.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : loi de Bernoulli et épreuves répétées (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Bernou1TM.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Épreuve de Bernoulli",
      video: { titre: "Vidéo d'Yvan Monka : probabilité, expérience à deux épreuves", youtube: "https://youtu.be/gFnCzFIjtqk" },
      texte:
        "Une **épreuve de Bernoulli** est une expérience aléatoire qui n'a que **deux issues** : le **succès** $S$, de probabilité $p$, et l'**échec** $\\overline{S}$, de probabilité $1 - p$. Le nombre $p$ est le **paramètre**.\n\n" +
        "Exemples : lancer une pièce (Pile : succès, $p = 0{,}5$) ; tirer au but (marquer ou non) ; tester une ampoule (défectueuse ou non) ; lancer un dé en ne regardant que « obtenir $6$ » ($p = \\dfrac{1}{6}$).\n\n" +
        "Même une expérience à plusieurs issues devient une épreuve de Bernoulli si on ne s'intéresse qu'à un événement : « nombre pair » ou non.",
      exemple: {
        enonce: "On tire une carte d'un jeu de $32$ et on regarde si c'est un as. Paramètre ?",
        solution: "Succès « as » : $p = \\dfrac{4}{32} = 0{,}125$ ; échec : $0{,}875$."
      }
    },
    {
      titre: "Répéter : l'arbre et la règle du produit",
      figure: "yb-cours-arbre2",
      video: { titre: "Vidéo d'Yvan Monka : probabilité, succession d'épreuves de Bernoulli", youtube: "https://youtu.be/95QfNLlIzR0" },
      texte:
        "On répète $n$ fois la **même** épreuve, de façon **indépendante** (le résultat d'une épreuve ne change pas les probabilités des suivantes). On représente l'expérience par un **arbre** : à chaque niveau, une branche $S$ (probabilité $p$) et une branche $\\overline{S}$ (probabilité $1 - p$). Il y a $2^n$ chemins.\n\n" +
        "Chaque **chemin** est un résultat possible (par exemple $S\\overline{S}S$). Sa probabilité est le **produit** des probabilités de ses branches, car les épreuves sont indépendantes.\n\n" +
        "Exemple : un joueur marque un tir au but avec $p = 0{,}8$. Sur deux tirs : $P(MM) = 0{,}8^2 = 0{,}64$ ; $P(M\\overline{M}) = 0{,}8 \\times 0{,}2 = 0{,}16$.",
      exemple: {
        enonce: "Avec le même joueur, probabilité de rater les deux tirs ?",
        solution: "$P(\\overline{M}\\,\\overline{M}) = 0{,}2 \\times 0{,}2 = 0{,}04$."
      }
    },
    {
      titre: "Exactement $k$ succès",
      figure: "yb-cours-arbre3",
      video: { titre: "Vidéo d'Yvan Monka : exercice, expérience aléatoire à deux épreuves", youtube: "https://youtu.be/Ty3xXmUPTm8" },
      texte:
        "Pour un événement comme « exactement $2$ succès sur $3$ épreuves », on repère **tous** les chemins qui le réalisent, puis on **additionne** leurs probabilités.\n\n" +
        "Avec $p = 0{,}6$ et $3$ épreuves, les chemins avec $2$ succès sont $SS\\overline{S}$, $S\\overline{S}S$ et $\\overline{S}SS$. Chacun a pour probabilité $0{,}6^2 \\times 0{,}4 = 0{,}144$. Donc $P(\\text{exactement } 2 \\text{ succès}) = 3 \\times 0{,}144 = 0{,}432$.\n\n" +
        "Tous les chemins qui ont le même nombre de succès ont la même probabilité : il suffit de les compter et de multiplier.",
      exemple: {
        enonce: "$p = 0{,}5$, $4$ épreuves. Combien de chemins ont exactement $1$ succès, et quelle est la probabilité ?",
        solution: "$4$ chemins (le succès à la 1re, 2e, 3e ou 4e épreuve), chacun de probabilité $0{,}5^4 = 0{,}0625$ : $4 \\times 0{,}0625 = 0{,}25$."
      }
    },
    {
      titre: "Au moins un succès : l'événement contraire",
      texte:
        "« **Au moins un** succès » regroupe beaucoup de chemins. Son contraire, « **aucun** succès », n'en a qu'un : $\\overline{S}\\,\\overline{S}\\dots\\overline{S}$, de probabilité $(1 - p)^n$. Donc\n\n" +
        "$P(\\text{au moins un succès}) = 1 - (1 - p)^n$\n\n" +
        "Exemple : un vol est à l'heure avec la probabilité $0{,}85$. Sur $3$ vols indépendants, la probabilité qu'au moins un soit en retard est $1 - 0{,}85^3 \\approx 0{,}386$.\n\n" +
        "Erreur classique : écrire $3 \\times 0{,}15 = 0{,}45$. Les probabilités ne s'additionnent pas ainsi (avec $10$ vols, on dépasserait $1$ !).",
      exemple: {
        enonce: "On lance $4$ fois un dé. Probabilité d'obtenir au moins un $6$ ?",
        solution: "$1 - \\left(\\dfrac{5}{6}\\right)^4 \\approx 1 - 0{,}482 = 0{,}518$."
      }
    },
    {
      titre: "Python : simuler des épreuves répétées",
      video: { titre: "Vidéo d'Yvan Monka : estimer une probabilité par échantillonnage (simulation)", youtube: "https://youtu.be/EXEcSJE31QY" },
      texte:
        "```python\nfrom random import random\n\ndef succes(p):\n    return 1 if random() < p else 0\n\ndef nb_succes(n, p):           # nombre de succès en n épreuves\n    return sum([succes(p) for k in range(n)])\n\nN = 10000\nc = 0\nfor k in range(N):\n    if nb_succes(3, 0.6) == 2:\n        c = c + 1\nprint(c / N)                   # proche de 0,432\n```\n\n" +
        "La fréquence observée sur un grand nombre de répétitions approche la probabilité calculée avec l'arbre."
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "yb-reconnaitre", titre: "Épreuve de Bernoulli, indépendance", etape: "Modéliser", nb: 4 },
    { type: "yb-chemin", titre: "Probabilité d'un chemin", etape: "Arbre", nb: 5 },
    { type: "yb-k-succes", titre: "Exactement k succès, au moins un", etape: "Arbre", nb: 5 },
    { type: "yb-contexte", titre: "Problèmes en contexte", etape: "Problèmes", nb: 5 },
    { type: "yb-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Une épreuve de Bernoulli a :", choix: ["deux issues", "trois issues", "une seule issue", "autant d'issues qu'on veut"], bonne: 0, explication: "Succès ou échec." },
    { question: "Si la probabilité de succès est $0{,}35$, celle de l'échec est :", choix: ["$0{,}65$", "$0{,}35$", "$1{,}35$", "$0{,}5$"], bonne: 0, explication: "$1 - 0{,}35$." },
    { question: "Pour $4$ épreuves répétées, l'arbre compte :", choix: ["$16$ chemins", "$8$ chemins", "$4$ chemins", "$32$ chemins"], bonne: 0, explication: "$2^4 = 16$." },
    { question: "Avec $p = 0{,}7$, la probabilité de $SS$ (deux succès) est :", choix: ["$0{,}49$", "$1{,}4$", "$0{,}7$", "$0{,}21$"], bonne: 0, explication: "$0{,}7 \\times 0{,}7$." },
    { question: "Avec $p = 0{,}7$, la probabilité de $S\\overline{S}$ est :", choix: ["$0{,}21$", "$0{,}49$", "$0{,}09$", "$1$"], bonne: 0, explication: "$0{,}7 \\times 0{,}3$." },
    { question: "Avec $p = 0{,}7$ et $2$ épreuves, la probabilité d'exactement $1$ succès est :", choix: ["$0{,}42$", "$0{,}21$", "$0{,}7$", "$0{,}49$"], bonne: 0, explication: "Deux chemins $S\\overline{S}$ et $\\overline{S}S$ : $2 \\times 0{,}21$." },
    { question: "Avec $3$ épreuves, le nombre de chemins avec exactement $2$ succès est :", choix: ["$3$", "$2$", "$6$", "$8$"], bonne: 0, explication: "$SS\\overline{S}$, $S\\overline{S}S$, $\\overline{S}SS$." },
    { question: "Avec $p = 0{,}5$ et $3$ épreuves, la probabilité de « que des succès » est :", choix: ["$0{,}125$", "$0{,}5$", "$1{,}5$", "$0{,}25$"], bonne: 0, explication: "$0{,}5^3$." },
    { question: "La probabilité d'au moins un succès en $n$ épreuves est :", choix: ["$1 - (1 - p)^n$", "$np$", "$p^n$", "$1 - p^n$"], bonne: 0, explication: "Contraire de « aucun succès »." },
    { question: "Avec $p = 0{,}1$ et $2$ épreuves, la probabilité d'au moins un succès est :", choix: ["$0{,}19$", "$0{,}2$", "$0{,}01$", "$0{,}81$"], bonne: 0, explication: "$1 - 0{,}9^2 = 1 - 0{,}81$." },
    { question: "Tirer deux boules **avec remise** dans une urne donne deux épreuves :", choix: ["indépendantes", "dépendantes", "incompatibles", "contraires"], bonne: 0, explication: "L'urne est la même à chaque tirage." },
    { question: "Tirer deux boules **sans remise** :", choix: ["les épreuves ne sont pas indépendantes", "les épreuves sont indépendantes", "c'est toujours une loi de Bernoulli", "il n'y a pas d'arbre possible"], bonne: 0, explication: "La composition change après le premier tirage." },
    { question: "Le long d'un chemin d'un arbre d'épreuves indépendantes, on :", choix: ["multiplie les probabilités", "additionne les probabilités", "garde la plus grande", "fait la moyenne"], bonne: 0, explication: "Règle du produit." },
    { question: "Pour un même nombre de succès, tous les chemins ont :", choix: ["la même probabilité", "des probabilités différentes", "une probabilité nulle", "une probabilité de $0{,}5$"], bonne: 0, explication: "Même nombre de facteurs $p$ et $1 - p$." },
    { question: "Lancer un dé et noter le résultat (de $1$ à $6$) est :", choix: ["pas une épreuve de Bernoulli", "une épreuve de Bernoulli de paramètre $\\dfrac{1}{6}$", "une épreuve de Bernoulli de paramètre $\\dfrac{1}{2}$", "impossible à modéliser"], bonne: 0, explication: "Six issues ; il faudrait se limiter à un événement (« obtenir $6$ »)." },
    { question: "Un vol est à l'heure avec la probabilité $0{,}9$. Sur $2$ vols indépendants, la probabilité que les deux soient à l'heure est :", choix: ["$0{,}81$", "$0{,}9$", "$1{,}8$", "$0{,}18$"], bonne: 0, explication: "$0{,}9^2$." },
    { question: "Une urne contient $3$ boules rouges et $7$ blanches. Succès « tirer une rouge » : le paramètre est :", choix: ["$0{,}3$", "$0{,}7$", "$\\dfrac{3}{7}$", "$3$"], bonne: 0, explication: "$\\dfrac{3}{10}$ : issues favorables sur issues possibles." },
    { question: "Avec $p = 0{,}5$ et $2$ épreuves, la probabilité d'au moins un succès est :", choix: ["$0{,}75$", "$0{,}5$", "$1$", "$0{,}25$"], bonne: 0, explication: "$1 - 0{,}5^2 = 0{,}75$." },
    { question: "Avec $p = 0{,}2$ et $3$ épreuves, la probabilité de $S\\overline{S}\\,\\overline{S}$ est :", choix: ["$0{,}128$", "$0{,}2$", "$0{,}384$", "$0{,}008$"], bonne: 0, explication: "$0{,}2 \\times 0{,}8 \\times 0{,}8$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Modéliser par des épreuves répétées",
      etapes: [
        "Identifier l'épreuve, le succès $S$ et sa probabilité $p$.",
        "Vérifier que l'épreuve est répétée à l'identique, de façon indépendante (tirages avec remise, grande population…).",
        "Préciser le nombre $n$ de répétitions ($n \\leqslant 4$ pour un arbre complet).",
        "Dessiner l'arbre : $S$ avec $p$, $\\overline{S}$ avec $1 - p$ à chaque niveau."
      ],
      exemple: "$3$ tirs au but, réussite $0{,}8$ : arbre à $3$ niveaux, $8$ chemins."
    },
    {
      titre: "Calculer une probabilité avec l'arbre",
      figure: "yb-cours-arbre3",
      etapes: [
        "Lister les chemins qui réalisent l'événement.",
        "Probabilité d'un chemin : produit des probabilités de ses branches.",
        "Additionner les probabilités des chemins retenus.",
        "Pour « exactement $k$ succès » : nombre de chemins $\\times$ $p^k(1 - p)^{n - k}$."
      ],
      exemple: "$p = 0{,}6$, $n = 3$, exactement $2$ succès : $3 \\times 0{,}6^2 \\times 0{,}4 = 0{,}432$."
    },
    {
      titre: "« Au moins un » : passer par le contraire",
      etapes: [
        "Écrire l'événement contraire : « aucun succès ».",
        "Un seul chemin : $(1 - p)^n$.",
        "$P(\\text{au moins un}) = 1 - (1 - p)^n$.",
        "Vérifier que le résultat est entre $0$ et $1$."
      ],
      exemple: "$p = 0{,}2$, $n = 3$ : $1 - 0{,}8^3 = 1 - 0{,}512 = 0{,}488$."
    }
  ],
  erreurs: [
    "Additionner les probabilités le long d'un chemin au lieu de les multiplier.",
    "Oublier des chemins pour « exactement $k$ succès » (il y en a souvent plusieurs).",
    "Calculer « au moins un succès » par $n \\times p$ : on passe par l'événement contraire.",
    "Modéliser des tirages sans remise par des épreuves indépendantes.",
    "Oublier les échecs dans la probabilité d'un chemin.",
    "Confondre « aucun succès » $(1 - p)^n$ et « que des succès » $p^n$."
  ]
};
