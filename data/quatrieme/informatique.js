/*
  CHAPITRE : 4e — Programmation
  ------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027, thème « Algorithmique et
  programmation » : notion de variable informatique ; déclenchement d'une action par un événement ; séquences
  d'instructions, boucles (« répéter … fois », « répéter jusqu'à ») et instructions conditionnelles
  (« si … alors … sinon »).
  Figures : programmes dessinés avec blocs4() ("in4-cours-…", "in4-qcm-…", assets/exercices-quatrieme.js).
  Pas de cours PDF d'Yvan Monka pour ce thème en 4e (seulement des pages et vidéos Scratch).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["quatrieme-informatique"] = {
  niveau: "4e",
  numero: 15,
  titre: "Programmation",
  accroche: "Variables, conditions « si … alors … sinon », boucles « répéter jusqu'à » et événements : lire et prévoir des programmes Scratch.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Scratch au brevet (Yvan Monka)", url: "https://youtu.be/7zL-41sUGnM", type: "video" },
    { titre: "Prépare ton brevet : équations et Scratch (Yvan Monka)", url: "https://youtu.be/nBTXFN5J0-w", type: "video" },
    { titre: "Programmer en ligne avec Scratch (gratuit)", url: "https://scratch.mit.edu/projects/editor/", type: "jeu" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Les variables",
      video: { titre: "Vidéo d'Yvan Monka : apprendre à programmer avec Scratch (3)", youtube: "https://youtu.be/qPF7vTP_VBs" },
      texte:
        "Une **variable** est une « boîte » qui porte un nom et contient une valeur.\n\n" +
        "- « mettre [A] à [5] » **remplace** le contenu de $A$ par $5$ ;\n" +
        "- « ajouter [3] à [A] » augmente $A$ de $3$ ;\n" +
        "- « mettre [A] à [A * 2] » double $A$ (on calcule avec l'ancienne valeur, puis on range le résultat).\n\n" +
        "Pour prévoir ce que fait un programme, on suit les instructions **dans l'ordre** en notant les valeurs des variables à chaque ligne.",
      figure: "in4-cours-variable",
      exemple: {
        enonce: "mettre [A] à [4] ; mettre [B] à [A + 3] ; mettre [A] à [B * 2]. Que valent $A$ et $B$ ?",
        solution: "$A = 4$, puis $B = 7$, puis $A = 14$. À la fin, $A = 14$ et $B = 7$."
      }
    },
    {
      titre: "Instructions conditionnelles",
      video: { titre: "Vidéo d'Yvan Monka : apprendre à programmer avec Scratch (4)", youtube: "https://youtu.be/9mb8ATHcP34" },
      texte:
        "Le bloc « **si** [condition] **alors** … **sinon** … » teste une condition, qui est vraie ou fausse :\n\n" +
        "- si elle est **vraie**, seules les instructions de « alors » s'exécutent ;\n" +
        "- si elle est **fausse**, seules celles de « sinon » s'exécutent.\n\n" +
        "Attention aux inégalités strictes : avec la condition « réponse $> 10$ », la réponse $10$ donne **faux**.",
      figure: "in4-cours-si",
      exemple: {
        enonce: "si [réponse > 10] alors dire [réponse * 2] sinon dire [réponse + 5]. On répond $10$.",
        solution: "$10 > 10$ est faux : le lutin dit $10 + 5 = 15$."
      }
    },
    {
      titre: "Boucles et événements",
      video: { titre: "Vidéo d'Yvan Monka : apprendre à programmer avec Scratch (2)", youtube: "https://youtu.be/8Sfarvw6jgg" },
      texte:
        "- « répéter [n] fois » répète un bloc un nombre de fois connu à l'avance.\n" +
        "- « **répéter jusqu'à** [condition] » teste la condition avant chaque passage et s'arrête dès qu'elle devient **vraie**.\n\n" +
        "Un **événement** (drapeau cliqué, touche pressée, lutin cliqué, message reçu) **déclenche** le script placé dessous. Plusieurs scripts d'un même lutin peuvent agir sur la même variable, et un lutin peut en prévenir un autre avec « envoyer à tous [message] » et « quand je reçois [message] ».",
      figure: "in4-cours-boucle",
      exemple: {
        enonce: "mettre [N] à [3] ; répéter jusqu'à [N > 20] : mettre [N] à [N * 2] ; dire [N].",
        solution: "$N$ vaut $3$, $6$, $12$, $24$ ; $24 > 20$ : la boucle s'arrête et le lutin dit $24$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "in4-variable", titre: "Suivre des variables", etape: "Variables", nb: 6 },
    { type: "in4-condition", titre: "Si … alors … sinon", etape: "Conditions", nb: 6 },
    { type: "in4-boucle", titre: "Boucles « répéter »", etape: "Boucles", nb: 5 },
    { type: "in4-evenements", titre: "Événements et vocabulaire", etape: "Boucles", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "mettre [A] à [7] ; ajouter [5] à [A]. À la fin, $A$ vaut :", choix: ["$12$", "$7$", "$5$", "$35$"], bonne: 0, explication: "$7 + 5$." },
    { question: "mettre [A] à [3] ; mettre [A] à [A * 4]. À la fin, $A$ vaut :", choix: ["$12$", "$3$", "$4$", "$7$"], bonne: 0, explication: "On calcule avec l'ancienne valeur : $3 \\times 4$." },
    { question: "mettre [A] à [2] ; mettre [B] à [A + 6] ; mettre [A] à [B]. À la fin, $A$ vaut :", choix: ["$8$", "$2$", "$6$", "$14$"], bonne: 0, explication: "$B = 8$, puis $A$ prend la valeur de $B$." },
    { question: "si [réponse < 8] alors dire [Petit] sinon dire [Grand]. On répond $8$. Le lutin dit :", choix: ["Grand", "Petit", "rien", "Petit puis Grand"], bonne: 0, explication: "$8 < 8$ est faux." },
    { question: "si [réponse > 4] alors dire [réponse - 4] sinon dire [4 - réponse]. On répond $9$. Le lutin dit :", choix: ["$5$", "$-5$", "$13$", "$4$"], bonne: 0, explication: "$9 > 4$ est vrai : $9 - 4$." },
    { question: "« répéter jusqu'à [N > 10] » s'arrête :", choix: ["dès que $N > 10$ est vrai", "dès que $N > 10$ est faux", "après $10$ passages", "jamais"], bonne: 0, explication: "On répète tant que la condition est fausse." },
    { question: "mettre [N] à [1] ; répéter jusqu'à [N > 30] : mettre [N] à [N * 2]. À la fin, $N$ vaut :", choix: ["$32$", "$16$", "$30$", "$64$"], bonne: 0, explication: "$1$, $2$, $4$, $8$, $16$, $32$." },
    { question: "mettre [S] à [0] ; répéter [5] fois : ajouter [3] à [S]. À la fin, $S$ vaut :", choix: ["$15$", "$8$", "$3$", "$5$"], bonne: 0, explication: "$5 \\times 3$." },
    { question: "Le bloc « quand la touche espace est pressée » est :", choix: ["un événement", "une boucle", "une condition", "une variable"], bonne: 0, explication: "Il déclenche un script." },
    { question: "Un lutin a deux scripts : « quand le drapeau est cliqué : mettre [score] à [0] » et « quand ce lutin est cliqué : ajouter [2] à [score] ». On clique sur le drapeau puis $4$ fois sur le lutin. score vaut :", choix: ["$8$", "$2$", "$6$", "$0$"], bonne: 0, explication: "$0 + 4 \\times 2$." },
    { question: "Pour savoir si un nombre $N$ est un multiple de $3$, on peut tester :", choix: ["« $N$ modulo $3$ $= 0$ »", "« $N / 3 = 0$ »", "« $N * 3 = 0$ »", "« $N - 3 = 0$ »"], bonne: 0, explication: "Le reste de la division par $3$ est nul." },
    { question: "Pour qu'un lutin réagisse à un autre lutin, on utilise :", choix: ["« envoyer à tous » et « quand je reçois »", "« répéter jusqu'à »", "« demander et attendre »", "« mettre … à »"], bonne: 0, explication: "Les messages sont des événements." },
    { question: "Que dit le lutin à la fin de ce programme ?", figure: "in4-cours-variable", choix: ["$14$", "$8$", "$7$", "$4$"], bonne: 0, explication: "$A = 4$, puis $B = 7$, puis $A = 7 \\times 2 = 14$." },
    { question: "Avec ce programme, on répond $10$. Le lutin dit :", figure: "in4-cours-si", choix: ["$15$", "$20$", "$10$", "$25$"], bonne: 0, explication: "$10 > 10$ est faux : branche « sinon », $10 + 5 = 15$." },
    { question: "Avec ce programme, on répond $12$. Le lutin dit :", figure: "in4-cours-si", choix: ["$24$", "$17$", "$12$", "$22$"], bonne: 0, explication: "$12 > 10$ est vrai : $12 \\times 2 = 24$." },
    { question: "Avec cette boucle « répéter jusqu'à », que dit le lutin à la fin ?", figure: "in4-cours-boucle", choix: ["$24$", "$12$", "$20$", "$48$"], bonne: 0, explication: "$3$ ; $6$ ; $12$ ; $24$, et $24 > 20$ arrête la boucle." },
    { question: "On clique sur le drapeau puis $5$ fois sur le lutin. La variable score vaut :", figure: "in4-qcm-score", choix: ["$10$", "$5$", "$2$", "$7$"], bonne: 0, explication: "$0 + 5 \\times 2 = 10$." },
    { question: "Quelle figure le lutin trace-t-il ?", figure: "in4-qcm-polygone", choix: ["un hexagone régulier", "un triangle équilatéral", "un carré", "un cercle"], bonne: 0, explication: "$6$ côtés de $50$ pas et $6 \\times 60^\\circ = 360^\\circ$." },
    { question: "Le script du bas appartient à un deuxième lutin. Que dit-il quand on clique sur le drapeau ?", figure: "in4-qcm-message", choix: ["$34$", "$17$", "$10$", "$18$"], bonne: 0, explication: "$N = 5 + 3 \\times 4 = 17$, puis le message « fini » déclenche « dire $17 \\times 2 = 34$ »." },
    { question: "Avec ce programme, Nasra répond $14$. Le lutin dit :", figure: "in4-qcm-si", choix: ["Tarif adulte", "Tarif enfant", "rien", "Tarif enfant puis Tarif adulte"], bonne: 0, explication: "$14 < 14$ est faux : c'est la branche « sinon »." },
    { question: "Dans le programme du polygone, combien de pas le lutin parcourt-il en tout ?", figure: "in4-qcm-polygone", choix: ["$300$", "$50$", "$360$", "$250$"], bonne: 0, explication: "$6 \\times 50 = 300$ pas." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Prévoir ce que fait un programme",
      etapes: [
        "Fais un tableau avec une colonne par variable.",
        "Exécute les instructions dans l'ordre, en écrivant les nouvelles valeurs à chaque ligne.",
        "Pour un « si », teste la condition avec les valeurs du moment, puis ne suis qu'une seule branche."
      ],
      figure: "in4-cours-variable",
      exemple: "$A = 5$ ; « mettre [A] à [A * 3] » donne $A = 15$."
    },
    {
      titre: "Boucle « répéter jusqu'à »",
      etapes: [
        "Avant chaque passage, teste la condition.",
        "Si elle est fausse, fais un passage et note les valeurs ; si elle est vraie, sors de la boucle.",
        "Compte les passages si on te demande combien de fois la boucle tourne."
      ],
      figure: "in4-cours-boucle",
      exemple: "$N = 5$, « jusqu'à [N > 12] » et « ajouter [4] à [N] » : $5$, $9$, $13$ : deux passages."
    },
    {
      titre: "Plusieurs scripts, des événements",
      etapes: [
        "Repère l'événement qui déclenche chaque script (drapeau, touche, clic, message).",
        "Fais la liste, dans l'ordre, de ce qui se passe : d'abord le drapeau, puis chaque action de l'utilisateur.",
        "Applique le script correspondant à chaque événement, autant de fois qu'il se produit."
      ],
      figure: "in4-qcm-score",
      exemple: "Drapeau : score $= 0$ ; $5$ clics sur le lutin : $0 + 5 \\times 2 = 10$."
    }
  ],
  erreurs: [
    "Calculer avec la valeur de départ d'une variable qui a déjà changé.",
    "Exécuter les deux branches d'un « si … alors … sinon ».",
    "Oublier qu'une inégalité stricte est fausse en cas d'égalité.",
    "Faire un passage de trop ou de moins dans une boucle « répéter jusqu'à ».",
    "Oublier un script déclenché par un autre événement."
  ]
};
