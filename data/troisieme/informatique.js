/*
  CHAPITRE : 3e — Programmation
  ------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027), thème
  « Algorithmique et programmation » : variables, séquences d'instructions, boucles (y compris imbriquées),
  instructions conditionnelles, événements et messages ; décomposer un problème en sous-problèmes (blocs
  personnalisés avec paramètres). Exercices dans le style de ceux du brevet.
  figure : programmes dessinés avec blocs4() (assets/exercices-quatrieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-informatique"] = {
  niveau: "3e",
  numero: 16,
  titre: "Programmation",
  accroche: "Programmes de calcul, boucles imbriquées, conditions, messages et blocs personnalisés, comme au brevet.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Scratch au brevet (Yvan Monka)", url: "https://youtu.be/7zL-41sUGnM", type: "video" },
    { titre: "Prépare ton brevet : angles et Scratch (Yvan Monka)", url: "https://youtu.be/ZHR09fndcRE", type: "video" },
    { titre: "Programmer en ligne avec Scratch (gratuit)", url: "https://scratch.mit.edu/projects/editor/", type: "jeu" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Programmes de calcul et variables",
      video: { titre: "Vidéo d'Yvan Monka : apprendre à programmer avec Scratch (3)", youtube: "https://youtu.be/qPF7vTP_VBs" },
      texte:
        "Au brevet, un programme Scratch traduit souvent un **programme de calcul** : la variable « réponse » contient le nombre choisi, puis d'autres variables stockent les étapes.\n\n" +
        "Pour trouver l'expression obtenue, on remplace le nombre de départ par $x$ et on suit les instructions : « mettre y à x * 3 », « ajouter 2 à y », « mettre z à y * x » donne $z = (3x + 2)x = 3x^2 + 2x$.",
      exemple: {
        enonce: "Avec ce programme, quel résultat pour $x = 4$ ?",
        solution: "$y = 14$, puis $z = 14 \\times 4 = 56$."
      }
    },
    {
      titre: "Boucles imbriquées et blocs personnalisés",
      video: { titre: "Vidéo d'Yvan Monka : apprendre à programmer avec Scratch (2)", youtube: "https://youtu.be/8Sfarvw6jgg" },
      texte:
        "- Pour un polygone régulier à $n$ côtés : « répéter $n$ fois (avancer ; tourner de $\\dfrac{360}{n}$ degrés) ».\n" +
        "- Une boucle dans une boucle (boucles **imbriquées**) : la boucle intérieure est exécutée entièrement à chaque passage de la boucle extérieure.\n" +
        "- Un **bloc personnalisé** (« définir polygone (côté) ») est un sous-programme : on l'appelle plusieurs fois avec des valeurs différentes du **paramètre**.",
      exemple: {
        enonce: "« répéter 3 fois (répéter 4 fois (avancer de 10)) » : distance parcourue ?",
        solution: "$3 \\times 4 \\times 10 = 120$ pas."
      }
    },
    {
      titre: "Conditions, boucles conditionnelles et messages",
      video: { titre: "Vidéo d'Yvan Monka : apprendre à programmer avec Scratch (4)", youtube: "https://youtu.be/9mb8ATHcP34" },
      texte:
        "- « **si** … **alors** … **sinon** » : une seule des deux branches s'exécute.\n" +
        "- « **répéter jusqu'à** » : on teste la condition avant chaque passage.\n" +
        "- « $n$ **modulo** $2 = 0$ » teste si $n$ est pair (le reste de la division par $2$ est nul).\n" +
        "- « **envoyer à tous** [message] » déclenche les scripts « **quand je reçois** [message] ».",
      exemple: {
        enonce: "$n = 6$ ; si $n$ modulo $2 = 0$ alors $n \\leftarrow n / 2$ sinon $n \\leftarrow 3n + 1$. Nouvelle valeur ?",
        solution: "$6$ est pair : $n = 3$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "pg3-calcul", titre: "Programmes de calcul", etape: "Variables", nb: 6 },
    { type: "pg3-dessin", titre: "Tracés et blocs personnalisés", etape: "Boucles", nb: 6 },
    { type: "pg3-boucles", titre: "Boucles et conditions", etape: "Conditions", nb: 5 },
    { type: "pg3-evenements", titre: "Événements et messages", etape: "Conditions", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "« mettre [y] à [x * 2] » puis « ajouter [5] à [y] » avec $x = 3$ donne :", choix: ["$y = 11$", "$y = 16$", "$y = 10$", "$y = 13$"], bonne: 0, explication: "$3 \\times 2 + 5$." },
    { question: "Pour un hexagone régulier, le lutin tourne à chaque fois de :", choix: ["$60^\\circ$", "$120^\\circ$", "$90^\\circ$", "$360^\\circ$"], bonne: 0, explication: "$360 \\div 6$." },
    { question: "« répéter 5 fois (répéter 3 fois (avancer de 20)) » : distance totale ?", choix: ["$300$ pas", "$100$ pas", "$60$ pas", "$28$ pas"], bonne: 0, explication: "$5 \\times 3 \\times 20$." },
    { question: "Dans « définir carré (côté) », « côté » est :", choix: ["un paramètre", "une boucle", "un message", "un événement"], bonne: 0, explication: "Il change à chaque appel." },
    { question: "« 17 modulo 5 » vaut :", choix: ["$2$", "$3$", "$3{,}4$", "$85$"], bonne: 0, explication: "$17 = 5 \\times 3 + 2$." },
    { question: "Pour tester si $n$ est un multiple de $3$, on écrit :", choix: ["« n modulo 3 = 0 »", "« n / 3 = 0 »", "« n * 3 = 0 »", "« n - 3 = 0 »"], bonne: 0, explication: "Reste nul." },
    { question: "« répéter jusqu'à [n > 10] » avec « ajouter 4 à n » et $n = 1$ au départ : nombre de passages ?", choix: ["$3$", "$2$", "$4$", "$10$"], bonne: 0, explication: "$1 \\to 5 \\to 9 \\to 13$." },
    { question: "« envoyer à tous [go] » déclenche :", choix: ["les scripts « quand je reçois [go] »", "la fin du programme", "le drapeau vert", "une boucle infinie"], bonne: 0, explication: "C'est un message." },
    { question: "Si $n = 7$ : « si n modulo 2 = 0 alors dire [pair] sinon dire [impair] » affiche :", choix: ["impair", "pair", "les deux", "rien"], bonne: 0, explication: "$7$ est impair." },
    { question: "Un programme de calcul donne $x \\mapsto (x + 1) \\times x$. Pour $x = -3$ :", choix: ["$6$", "$-6$", "$12$", "$-2$"], bonne: 0, explication: "$(-2) \\times (-3)$." },
    { question: "Un bloc personnalisé permet :", choix: ["de réutiliser une suite d'instructions", "de supprimer les variables", "de remplacer le drapeau vert", "d'accélérer le lutin"], bonne: 0, explication: "C'est un sous-programme." },
    { question: "Deux scripts commencent par « quand le drapeau est cliqué ». Au clic :", choix: ["ils démarrent tous les deux", "seul le premier démarre", "aucun ne démarre", "seul le second démarre"], bonne: 0, explication: "Le même événement les déclenche." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Trouver l'expression d'un programme",
      etapes: [
        "Remplace le nombre choisi (« réponse ») par $x$.",
        "Traduis chaque instruction en calcul sur l'expression.",
        "Développe et réduis le résultat final ; vérifie avec une valeur."
      ],
      exemple: "$y = 2x - 1$ puis $z = y \\times y$ : $z = (2x - 1)^2$."
    },
    {
      titre: "Suivre une boucle avec condition",
      etapes: [
        "Fais un tableau : une colonne par variable, une ligne par passage.",
        "À chaque passage, teste la condition « si » avec les valeurs actuelles.",
        "Arrête-toi dès que la condition du « répéter jusqu'à » est vraie."
      ],
      exemple: "Syracuse depuis $6$ : $6$, $3$, $10$, $5$, $16$, $8$, $4$, $2$, $1$."
    }
  ],
  erreurs: [
    "Oublier une étape du programme de calcul.",
    "Multiplier seulement par la boucle intérieure dans des boucles imbriquées.",
    "Faire tourner le lutin de l'angle intérieur au lieu de l'angle extérieur.",
    "Exécuter les deux branches d'un « si … sinon ».",
    "Oublier un script déclenché par un message."
  ]
};
