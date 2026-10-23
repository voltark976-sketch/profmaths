/*
  CHAPITRE : 4e — Probabilités
  -----------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : vocabulaire (expérience aléatoire,
  issue, évènement, évènement contraire, évènements incompatibles) ; calculer des probabilités dans des situations
  d'équiprobabilité ; probabilité de l'évènement contraire ; somme des probabilités des issues égale à $1$.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["quatrieme-probabilites"] = {
  niveau: "4e",
  numero: 10,
  titre: "Probabilités",
  accroche: "Calculer des probabilités avec des dés, des urnes et des roues, utiliser l'évènement contraire et reconnaître des évènements incompatibles.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : probabilités (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Proba.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : probabilités (Yvan Monka)", url: "https://youtu.be/uIO1gcQmtRw", type: "video" },
    { titre: "Exercice : calculer une probabilité (Yvan Monka)", url: "https://youtu.be/ROqkvyfAoeg", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Vocabulaire",
      video: { titre: "Vidéo d'Yvan Monka : comprendre les notions de probabilités", youtube: "https://youtu.be/242ah8YiUZ4" },
      texte:
        "- Une **expérience aléatoire** a plusieurs résultats possibles, les **issues**, sans qu'on puisse prévoir lequel se produira.\n" +
        "- Un **évènement** est un ensemble d'issues. Il est **impossible** s'il n'est jamais réalisé, **certain** s'il l'est toujours.\n" +
        "- La **probabilité** d'un évènement est un nombre entre $0$ et $1$. La somme des probabilités de toutes les issues vaut $1$.",
      exemple: {
        enonce: "On lance un dé à six faces. Donne un évènement certain et un évènement impossible.",
        solution: "Certain : « obtenir un nombre entre $1$ et $6$ ». Impossible : « obtenir $7$ »."
      }
    },
    {
      titre: "Équiprobabilité",
      video: { titre: "Vidéo d'Yvan Monka : calculer une probabilité simple", youtube: "https://youtu.be/XTlxQPG5ehc" },
      texte:
        "Quand toutes les issues ont la même probabilité (dé équilibré, tirage au hasard…) :\n\n" +
        "$P(A) = \\dfrac{\\text{nombre d'issues favorables à } A}{\\text{nombre total d'issues}}$.\n\n" +
        "Avec deux dés, on peut utiliser un tableau à double entrée : il y a $6 \\times 6 = 36$ issues équiprobables.",
      exemple: {
        enonce: "Une urne contient $3$ boules rouges et $5$ vertes. Quelle est la probabilité de tirer une rouge ?",
        solution: "$P = \\dfrac{3}{8}$."
      }
    },
    {
      titre: "Évènement contraire",
      video: { titre: "Vidéo d'Yvan Monka : calculer la probabilité d'un évènement contraire", youtube: "https://youtu.be/S6HpRIVaL5U" },
      texte:
        "L'**évènement contraire** de $A$, noté « non $A$ » (ou $\\overline{A}$), est réalisé quand $A$ ne l'est pas.\n\n" +
        "$P(\\text{non } A) = 1 - P(A)$.\n\n" +
        "Si la probabilité de gagner est $0{,}15$, la probabilité de perdre est $0{,}85$.",
      exemple: {
        enonce: "On lance un dé. Quelle est la probabilité de ne pas obtenir $6$ ?",
        solution: "$P(\\text{obtenir } 6) = \\dfrac{1}{6}$, donc $P(\\text{ne pas obtenir } 6) = 1 - \\dfrac{1}{6} = \\dfrac{5}{6}$."
      }
    },
    {
      titre: "Évènements incompatibles",
      texte:
        "Deux évènements sont **incompatibles** s'ils ne peuvent pas se réaliser en même temps (aucune issue en commun).\n\n" +
        "Dans ce cas : $P(A \\text{ ou } B) = P(A) + P(B)$.\n\n" +
        "« Obtenir $1$ » et « obtenir $6$ » sont incompatibles ; « obtenir un nombre pair » et « obtenir un multiple de $3$ » ne le sont pas ($6$ réalise les deux).",
      exemple: {
        enonce: "$A$ et $B$ sont incompatibles avec $P(A) = 0{,}2$ et $P(B) = 0{,}35$. Calcule $P(A \\text{ ou } B)$.",
        solution: "$P(A \\text{ ou } B) = 0{,}2 + 0{,}35 = 0{,}55$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "pb4-calcul", titre: "Calculer une probabilité", etape: "Équiprobabilité", nb: 6 },
    { type: "pb4-contraire", titre: "Évènement contraire", etape: "Évènements", nb: 5 },
    { type: "pb4-incompatibles", titre: "Évènements incompatibles", etape: "Évènements", nb: 5 },
    { type: "pb4-tableau", titre: "La somme des probabilités", etape: "Évènements", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Une probabilité est toujours :", choix: ["comprise entre $0$ et $1$", "plus grande que $1$", "un nombre entier", "négative"], bonne: 0, explication: "$0$ : impossible ; $1$ : certain." },
    { question: "On lance un dé équilibré. $P(\\text{obtenir } 3) =$ :", choix: ["$\\dfrac{1}{6}$", "$\\dfrac{1}{3}$", "$\\dfrac{3}{6}$", "$3$"], bonne: 0, explication: "Une issue sur six." },
    { question: "Une urne : $4$ boules rouges et $6$ bleues. $P(\\text{bleue}) =$ :", choix: ["$\\dfrac{3}{5}$", "$\\dfrac{2}{5}$", "$\\dfrac{6}{4}$", "$\\dfrac{1}{6}$"], bonne: 0, explication: "$\\dfrac{6}{10}$." },
    { question: "Si $P(A) = 0{,}3$, alors $P(\\text{non } A) =$ :", choix: ["$0{,}7$", "$0{,}3$", "$-0{,}3$", "$1{,}3$"], bonne: 0, explication: "$1 - 0{,}3$." },
    { question: "L'évènement contraire de « obtenir un nombre pair » est :", choix: ["obtenir un nombre impair", "obtenir $1$", "obtenir $6$", "obtenir un multiple de $2$"], bonne: 0, explication: "Les autres issues." },
    { question: "Avec deux dés, combien y a-t-il d'issues ?", choix: ["$36$", "$12$", "$6$", "$11$"], bonne: 0, explication: "$6 \\times 6$." },
    { question: "Avec deux dés, $P(\\text{somme} = 12) =$ :", choix: ["$\\dfrac{1}{36}$", "$\\dfrac{1}{12}$", "$\\dfrac{2}{36}$", "$\\dfrac{1}{6}$"], bonne: 0, explication: "Seulement $6 + 6$." },
    { question: "« Obtenir $2$ » et « obtenir $5$ » sont :", choix: ["incompatibles", "contraires", "certains", "impossibles"], bonne: 0, explication: "Aucune issue commune (mais ils ne couvrent pas tout)." },
    { question: "$A$ et $B$ incompatibles, $P(A) = 0{,}25$, $P(B) = 0{,}4$ : $P(A \\text{ ou } B) =$ :", choix: ["$0{,}65$", "$0{,}1$", "$0{,}15$", "$1$"], bonne: 0, explication: "On additionne." },
    { question: "Trois issues ont pour probabilités $0{,}2$ ; $0{,}5$ et $x$. Alors $x =$ :", choix: ["$0{,}3$", "$0{,}7$", "$1$", "$0{,}1$"], bonne: 0, explication: "La somme vaut $1$." },
    { question: "« Tirer un roi » et « tirer un cœur » dans un jeu de cartes sont :", choix: ["compatibles", "incompatibles", "contraires", "impossibles"], bonne: 0, explication: "Le roi de cœur réalise les deux." },
    { question: "La probabilité de l'évènement impossible est :", choix: ["$0$", "$1$", "$\\dfrac{1}{2}$", "on ne peut pas savoir"], bonne: 0, explication: "Il ne se réalise jamais." },
    { question: "Sur un dé à $12$ faces, $P(\\text{multiple de } 4) =$ :", choix: ["$\\dfrac{1}{4}$", "$\\dfrac{1}{3}$", "$\\dfrac{4}{12}$", "$\\dfrac{1}{12}$"], bonne: 0, explication: "$4$, $8$, $12$ : $\\dfrac{3}{12}$." },
    { question: "La somme des probabilités d'un évènement et de son contraire vaut :", choix: ["$1$", "$0$", "$2$", "$\\dfrac{1}{2}$"], bonne: 0, explication: "$P(A) + P(\\text{non } A) = 1$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer une probabilité",
      etapes: [
        "Vérifie que les issues sont équiprobables.",
        "Compte les issues favorables et toutes les issues (tableau si deux épreuves).",
        "Divise, puis simplifie la fraction."
      ],
      exemple: "Deux dés, somme $7$ : $\\dfrac{6}{36} = \\dfrac{1}{6}$."
    },
    {
      titre: "Utiliser le contraire",
      etapes: [
        "Quand l'évènement est compliqué, regarde son contraire.",
        "Calcule $P(\\text{non } A)$.",
        "$P(A) = 1 - P(\\text{non } A)$."
      ],
      exemple: "$P(\\text{au moins un pile})$ avec deux pièces : $1 - \\dfrac{1}{4} = \\dfrac{3}{4}$."
    }
  ],
  erreurs: [
    "Diviser par le nombre d'issues défavorables.",
    "Additionner les probabilités d'évènements qui ne sont pas incompatibles.",
    "Confondre évènements incompatibles et évènements contraires.",
    "Oublier que la somme des probabilités des issues vaut $1$.",
    "Croire qu'avec deux dés, chaque somme de $2$ à $12$ a la même probabilité."
  ]
};
