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
        "Pour trouver l'expression obtenue, on remplace le nombre de départ par $x$ et on suit les instructions : « mettre y à x * 3 », « ajouter 2 à y », « mettre z à y * x » donne $z = (3x + 2)x = 3x^2 + 2x$.\n\n" +
        "La figure montre ce programme : « réponse » est le nombre tapé au clavier, rangé dans la variable $x$.",
      figure: "pg3-cours-calcul",
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
        "- Un **bloc personnalisé** (« définir polygone (côté) ») est un sous-programme : on l'appelle plusieurs fois avec des valeurs différentes du **paramètre**.\n\n" +
        "Sur la figure, le bloc « polygone » trace un hexagone régulier : à chaque sommet, le lutin tourne de l'angle extérieur, $360 \\div 6 = 60^\\circ$. Le programme principal l'appelle $3$ fois.",
      figure: "pg3-cours-boucles",
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
        "- « **envoyer à tous** [message] » déclenche les scripts « **quand je reçois** [message] ».\n\n" +
        "Sur la figure : $6$ est pair, donc seule la branche « alors » s'exécute ($n$ devient $3$) ; puis le message « fini » fait dire « Bravo ! ».",
      figure: "pg3-cours-conditions",
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
    { question: "Deux scripts commencent par « quand le drapeau est cliqué ». Au clic :", choix: ["ils démarrent tous les deux", "seul le premier démarre", "aucun ne démarre", "seul le second démarre"], bonne: 0, explication: "Le même événement les déclenche." },
    { question: "On lance ce programme et on répond $1$. Que dit le lutin ?", figure: "pg3-qcm-prog", choix: ["$9$", "$-9$", "$-3$", "$1$"], bonne: 0, explication: "$y = 1 - 4 = -3$, puis $y = (-3) \\times (-3) = 9$." },
    { question: "Le lutin trace ce pentagone régulier. À chaque sommet, il tourne de l'angle $\\alpha$ égal à :", figure: "pg3-qcm-trace", choix: ["$72^\\circ$", "$108^\\circ$", "$60^\\circ$", "$540^\\circ$"], bonne: 0, explication: "Angle extérieur : $360 \\div 5 = 72^\\circ$ ($108^\\circ$ est l'angle intérieur)." },
    { question: "Quelle distance totale le lutin parcourt-il avec ce programme ?", figure: "pg3-qcm-imbrique", choix: ["$360$ pas", "$90$ pas", "$120$ pas", "$1\\,440$ pas"], bonne: 0, explication: "$4 \\times 3 \\times 30 = 360$ pas." },
    { question: "Quelle longueur totale est tracée quand on clique sur le drapeau ?", figure: "pg3-qcm-bloc", choix: ["$280$ pas", "$70$ pas", "$200$ pas", "$140$ pas"], bonne: 0, explication: "$4 \\times 20 + 4 \\times 50 = 80 + 200 = 280$ pas." },
    { question: "Que dit le lutin à la fin de ce programme ?", figure: "pg3-qcm-jusqua", choix: ["$5$", "$-10$", "$20$", "$3$"], bonne: 0, explication: "$n$ vaut $50$, $35$, $20$ puis $5$ : $5 < 10$, la boucle s'arrête." },
    { question: "On clique sur le drapeau, puis $2$ fois sur le lutin. Que vaut « score » ?", figure: "pg3-qcm-msg", choix: ["$8$", "$6$", "$2$", "$10$"], bonne: 0, explication: "Chaque clic ajoute $3$, puis le message « bonus » ajoute $1$ : $2 \\times 4 = 8$." },
    { question: "Avec ce programme, qu'affiche le lutin ?", figure: "pg3-qcm-si", choix: ["Fizz", "$15$", "$5$", "rien"], bonne: 0, explication: "$15 = 3 \\times 5$ : le reste est nul, la condition est vraie." },
    { question: "« $23$ modulo $4$ » vaut :", choix: ["$3$", "$5$", "$5{,}75$", "$92$"], bonne: 0, explication: "$23 = 4 \\times 5 + 3$." },
    { question: "Combien de fois faut-il répéter « avancer de $50$ ; tourner de $40$ degrés » pour revenir au point de départ ?", choix: ["$9$", "$4$", "$40$", "$360$"], bonne: 0, explication: "$360 \\div 40 = 9$ : c'est un polygone régulier à $9$ côtés." },
    { question: "« répéter $10$ fois (ajouter $2$ à $n$) » avec $n = 5$ au départ : à la fin, $n$ vaut :", choix: ["$25$", "$20$", "$7$", "$12$"], bonne: 0, explication: "$5 + 10 \\times 2 = 25$." },
    { question: "Dans un programme Scratch, une variable :", choix: ["mémorise une valeur qui peut changer", "dessine une forme", "répète des instructions", "envoie un message"], bonne: 0, explication: "Elle porte un nom et contient une valeur." },
    { question: "Dans un « si … alors … sinon », si la condition est fausse :", choix: ["seule la branche « sinon » s'exécute", "les deux branches s'exécutent", "seule la branche « alors » s'exécute", "le programme s'arrête"], bonne: 0, explication: "Une seule des deux branches s'exécute." }
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
      figure: "pg3-cours-calcul",
      exemple: "Programme de la figure : $y = 3x + 2$ puis $z = y \\times x = (3x + 2)x = 3x^2 + 2x$ ; avec $x = 4$ : $3 \\times 16 + 8 = 56$."
    },
    {
      titre: "Suivre une boucle avec condition",
      etapes: [
        "Fais un tableau : une colonne par variable, une ligne par passage.",
        "À chaque passage, teste la condition « si » avec les valeurs actuelles.",
        "Arrête-toi dès que la condition du « répéter jusqu'à » est vraie."
      ],
      figure: "pg3-qcm-jusqua",
      exemple: "Programme de la figure : $n$ vaut $50$, $35$, $20$, $5$ ; la condition $n < 10$ est alors vraie, le lutin dit $5$."
    },
    {
      titre: "Tracer un polygone régulier",
      etapes: [
        "Compte le nombre $n$ de côtés.",
        "À chaque sommet, le lutin tourne de l'angle extérieur : $360 \\div n$ degrés.",
        "Répète $n$ fois « avancer ; tourner » : le lutin revient à son point de départ."
      ],
      figure: "pg3-qcm-trace",
      exemple: "Pentagone régulier : $\\alpha = 360 \\div 5 = 72^\\circ$ (et non l'angle intérieur $108^\\circ$)."
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
