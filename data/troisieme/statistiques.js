/*
  CHAPITRE : 3e — Statistiques
  -----------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027) : recueillir,
  organiser et représenter des données (effectifs, fréquences, classes) ; calculer et interpréter des
  indicateurs de position (moyenne, médiane) et de dispersion (étendue) ; comparer des séries.
  Vidéos et cours PDF d'Yvan Monka.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-statistiques"] = {
  niveau: "3e",
  numero: 10,
  titre: "Statistiques",
  accroche: "Fréquences, moyenne, médiane, étendue, données en classes : résumer et comparer des séries.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : statistiques (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Stat3e.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : statistiques (Yvan Monka)", url: "https://youtu.be/-7Db42jJRuo", type: "video" },
    { titre: "Construire un histogramme (Yvan Monka)", url: "https://youtu.be/BJMLHFmTMcE", type: "video" },
    { titre: "Déterminer une médiane dans un tableau (Yvan Monka)", url: "https://youtu.be/lv9ZJ8dGn54", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Effectifs et fréquences",
      video: { titre: "Vidéo d'Yvan Monka : calculer des fréquences", youtube: "https://youtu.be/GWDDay-mdVA" },
      texte:
        "La **fréquence** d'une valeur est $\\dfrac{\\text{effectif}}{\\text{effectif total}}$. Elle s'écrit en décimal ou en pourcentage.\n\n" +
        "Si $12$ élèves sur $40$ viennent en bus, la fréquence est $\\dfrac{12}{40} = 0{,}3$, soit $30\\,\\%$.\n\n" +
        "La somme des fréquences vaut $1$ (ou $100\\,\\%$).",
      exemple: {
        enonce: "Sur $25$ réponses, $7$ sont « oui ». Fréquence en pourcentage ?",
        solution: "$\\dfrac{7}{25} = 0{,}28$, soit $28\\,\\%$."
      }
    },
    {
      titre: "Moyenne, médiane, étendue",
      video: { titre: "Vidéo d'Yvan Monka : calculer une moyenne, une médiane, une étendue", youtube: "https://youtu.be/aO3pb-FEsbk" },
      texte:
        "- **Moyenne** : somme des (valeur $\\times$ effectif) divisée par l'effectif total.\n" +
        "- **Médiane** : valeur qui partage la série **rangée** en deux groupes de même effectif ; on utilise les effectifs cumulés.\n" +
        "- **Étendue** : plus grande valeur moins plus petite valeur.\n\n" +
        "Pour des données **en classes** $[a ; b[$, on estime la moyenne avec le **centre** $\\dfrac{a + b}{2}$ de chaque classe.",
      exemple: {
        enonce: "Notes $8$ (×$2$), $12$ (×$5$), $15$ (×$3$). Moyenne ?",
        solution: "$\\dfrac{16 + 60 + 45}{10} = 12{,}1$."
      }
    },
    {
      titre: "Comparer des séries",
      video: { titre: "Vidéo d'Yvan Monka : calculer une étendue", youtube: "https://youtu.be/JicN3egTNPg" },
      texte:
        "Pour comparer deux séries, on utilise un indicateur de **position** (moyenne ou médiane) et un indicateur de **dispersion** (étendue).\n\n" +
        "La moyenne est sensible aux valeurs extrêmes, la médiane beaucoup moins : une médiane bien plus petite que la moyenne signale quelques valeurs très grandes.",
      exemple: {
        enonce: "Deux classes ont $11$ de moyenne ; étendues $5$ et $14$. Que dire ?",
        solution: "Les notes de la seconde classe sont plus dispersées."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "st3-frequences", titre: "Calculer des fréquences", etape: "Données", nb: 5 },
    { type: "st3-indicateurs", titre: "Moyenne, médiane, étendue", etape: "Indicateurs", nb: 6 },
    { type: "st3-classes", titre: "Données en classes", etape: "Indicateurs", nb: 5 },
    { type: "st3-comparer", titre: "Interpréter et comparer", etape: "Comparer", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$9$ élèves sur $36$ font de la natation. La fréquence est :", choix: ["$25\\,\\%$", "$9\\,\\%$", "$36\\,\\%$", "$4\\,\\%$"], bonne: 0, explication: "$\\dfrac{9}{36} = 0{,}25$." },
    { question: "La somme des fréquences d'une série vaut :", choix: ["$1$", "l'effectif total", "$10$", "la moyenne"], bonne: 0, explication: "Ou $100\\,\\%$." },
    { question: "La moyenne de $10$ ; $12$ ; $17$ est :", choix: ["$13$", "$12$", "$39$", "$14$"], bonne: 0, explication: "$39 \\div 3$." },
    { question: "La médiane de $4$ ; $9$ ; $2$ ; $15$ ; $7$ est :", choix: ["$7$", "$2$", "$7{,}4$", "$9$"], bonne: 0, explication: "Rangée : $2$ ; $4$ ; $7$ ; $9$ ; $15$." },
    { question: "La médiane de $3$ ; $5$ ; $8$ ; $12$ est :", choix: ["$6{,}5$", "$5$", "$8$", "$7$"], bonne: 0, explication: "$\\dfrac{5 + 8}{2}$." },
    { question: "L'étendue de $14$ ; $6$ ; $19$ ; $11$ est :", choix: ["$13$", "$19$", "$12{,}5$", "$5$"], bonne: 0, explication: "$19 - 6$." },
    { question: "Le centre de la classe $[20 ; 30[$ est :", choix: ["$25$", "$20$", "$30$", "$10$"], bonne: 0, explication: "$\\dfrac{20 + 30}{2}$." },
    { question: "Pour $41$ valeurs rangées, la médiane est la :", choix: ["$21$e valeur", "$20$e valeur", "$41$e valeur", "moyenne des $20$e et $21$e"], bonne: 0, explication: "$\\dfrac{41 + 1}{2}$." },
    { question: "Un indicateur de dispersion est :", choix: ["l'étendue", "la moyenne", "la médiane", "l'effectif total"], bonne: 0, explication: "Il mesure l'écart des valeurs." },
    { question: "La moyenne est bien plus grande que la médiane. Il y a sans doute :", choix: ["quelques valeurs très grandes", "quelques valeurs très petites", "une étendue égale à zéro", "une erreur"], bonne: 0, explication: "La moyenne est tirée vers le haut." },
    { question: "Notes $12$ et $15$. Quelle 3e note pour avoir $14$ de moyenne ?", choix: ["$15$", "$14$", "$13$", "$16$"], bonne: 0, explication: "$3 \\times 14 - 27 = 15$." },
    { question: "Une médiane de $1\\,600$ € pour des salaires signifie :", choix: ["au moins la moitié gagne $1\\,600$ € ou moins", "tous gagnent $1\\,600$ €", "le salaire moyen est $1\\,600$ €", "personne ne gagne plus"], bonne: 0, explication: "Définition de la médiane." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Médiane avec un tableau d'effectifs",
      etapes: [
        "Calcule l'effectif total $N$.",
        "Repère le rang de la médiane : $\\dfrac{N + 1}{2}$ si $N$ est impair ; les rangs $\\dfrac{N}{2}$ et $\\dfrac{N}{2} + 1$ si $N$ est pair.",
        "Cumule les effectifs pour trouver la ou les valeurs correspondantes."
      ],
      exemple: "$N = 24$ : moyenne des $12$e et $13$e valeurs."
    },
    {
      titre: "Moyenne de données en classes",
      etapes: [
        "Calcule le centre de chaque classe.",
        "Multiplie chaque centre par l'effectif de la classe et additionne.",
        "Divise par l'effectif total : c'est une estimation de la moyenne."
      ],
      exemple: "$[0 ; 10[$ (×$3$), $[10 ; 20[$ (×$5$) : $\\dfrac{15 + 75}{8} = 11{,}25$."
    }
  ],
  erreurs: [
    "Oublier de pondérer par les effectifs.",
    "Chercher la médiane sans tenir compte des effectifs.",
    "Calculer l'étendue avec les effectifs au lieu des valeurs.",
    "Prendre la borne d'une classe au lieu de son centre.",
    "Donner une fréquence en décimal quand on demande un pourcentage."
  ]
};
