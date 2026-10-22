/*
  CHAPITRE : 6e — Initiation à la pensée informatique
  -----------------------------------------------------
  Programme de mathématiques du cycle 3 (BO n° 16 du 17 avril 2025), en vigueur en 6e depuis la rentrée 2025 :
  notions d'instruction, de séquence d'instructions, d'entrée, de sortie et de répétition, avec ou sans machine
  (robot, Scratch). Objectifs : identifier une instruction ou une séquence d'instructions ; produire et exécuter une
  séquence d'instructions ; répéter à la main une séquence d'instructions ; programmer la construction d'un chemin simple.
  Les variables et les conditions relèvent du cycle 4 : elles n'apparaissent pas ici.
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js.
  figure : "pi6-programme", "pi6-fleches", "pi6-robot", "pi6-chemin" ou "pi6-boucle" (assets/exercices-college.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["sixieme-informatique"] = {
  niveau: "6e",
  numero: 15,
  titre: "Initiation à la pensée informatique",
  accroche: "Lire et écrire des programmes : suivre une séquence d'instructions, guider un robot sur un quadrillage et répéter des instructions avec une boucle.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Programmer un déplacement relatif (Mr. Robin, 6e)", url: "https://youtu.be/_ZtXizmh620", type: "video" },
    { titre: "La boucle « répéter » pour tracer un carré (jaicompris Maths)", url: "https://youtu.be/mromwv04LcA", type: "video" },
    { titre: "Programmer en ligne avec Scratch (gratuit)", url: "https://scratch.mit.edu/projects/editor/", type: "jeu" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Instructions, entrée et sortie",
      video: { titre: "Vidéo d'Educode : qu'est-ce qu'un algorithme ?", youtube: "https://youtu.be/tbmKIErjnns" },
      texte:
        "Une **instruction** est un ordre simple : « ajouter $5$ », « avancer de $2$ cases », « dire le résultat ».\n\n" +
        "Un **programme** est une **séquence d'instructions** : elles sont exécutées **l'une après l'autre, dans l'ordre**. Dans Scratch, on empile des blocs et on les lit de haut en bas.\n\n" +
        "- L'**entrée** est ce qu'on donne au programme (ici, le nombre demandé).\n" +
        "- La **sortie** est ce que le programme nous rend (ici, le résultat affiché).\n\n" +
        "L'ordre compte : « multiplier par $3$ puis ajouter $5$ » ne donne pas le même résultat que « ajouter $5$ puis multiplier par $3$ ».",
      figure: "pi6-programme",
      exemple: {
        enonce: "Avec le programme de la figure, on donne le nombre $4$. Qu'affiche-t-il ? Et si on échange les deux blocs verts ?",
        solution: "$4 \\times 3 = 12$, puis $12 + 5 = 17$ : le programme affiche $17$.\n\nBlocs échangés : $4 + 5 = 9$, puis $9 \\times 3 = 27$. Le résultat change : l'ordre des instructions compte."
      }
    },
    {
      titre: "Coder un déplacement avec des flèches",
      video: { titre: "Vidéo de Maître Lucas : coder des déplacements", youtube: "https://youtu.be/0RQzTlSCN-k" },
      texte:
        "Sur un quadrillage, une case se nomme par sa **colonne** (une lettre) puis sa **ligne** (un nombre) : B2 est dans la colonne B, à la ligne 2.\n\n" +
        "Un code de déplacement est une suite de flèches. Chaque flèche fait avancer d'**une case** : ↑ vers le haut, → vers la droite, ↓ vers le bas, ← vers la gauche.\n\n" +
        "Pour exécuter un code, on suit les flèches **dans l'ordre**, une par une. Sur la figure, le code **→ → → ↑ ↑ ←** mène de B2 (le rond) à D4 (le carré).",
      figure: "pi6-fleches",
      exemple: {
        enonce: "Un robot est sur la case A1. Où arrive-t-il avec le code ↑ ↑ → → → ↓ ?",
        solution: "↑ ↑ : $2$ cases vers le haut, il est en A3. → → → : $3$ cases vers la droite, il est en D3. ↓ : $1$ case vers le bas. Il arrive en **D2**."
      }
    },
    {
      titre: "Avancer et tourner : le robot a une direction",
      video: { titre: "Vidéo d'Yvan Monka : apprendre à programmer avec Scratch (1)", youtube: "https://youtu.be/pdtMUgnmRa4" },
      texte:
        "Un robot (ou un lutin dans Scratch) regarde dans une **direction**. Ses instructions dépendent de cette direction :\n\n" +
        "- « **avancer de $2$** » : il avance de $2$ cases tout droit, devant lui. La case de départ ne compte pas.\n" +
        "- « **tourner à droite** » : il fait un quart de tour sur place, vers **sa** droite. Il ne change pas de case.\n" +
        "- « **tourner à gauche** » : un quart de tour sur place, vers sa gauche.\n\n" +
        "Attention : la droite du robot n'est pas toujours la droite de la feuille. S'il regarde vers le bas, sa droite est la gauche de la feuille !",
      figure: "pi6-robot",
      exemple: {
        enonce: "Le robot est en B2 et regarde vers le haut. Où arrive-t-il avec le programme de la figure ? Et si on remplace le dernier bloc par « tourner à gauche ; avancer de $1$ » ?",
        solution: "Il avance de $2$ cases vers le haut : B4. Il tourne à droite et regarde vers la droite. Il avance de $3$ cases : il arrive en **E4**.\n\nAvec l'autre fin : en B4, il tourne à gauche et regarde vers la gauche, puis avance de $1$ case : il arrive en **A4**."
      }
    },
    {
      titre: "Programmer un chemin",
      texte:
        "Pour faire suivre un chemin à un robot :\n\n" +
        "- on repère sa case de départ et la direction dans laquelle il regarde ;\n" +
        "- on découpe le chemin en lignes droites et on compte les cases de chacune ;\n" +
        "- à chaque virage, on se met à la place du robot : tourne-t-il vers **sa** droite ou vers **sa** gauche ?\n\n" +
        "On vérifie toujours en exécutant le programme à la main, bloc par bloc.",
      figure: "pi6-chemin",
      exemple: {
        enonce: "Le robot est en B2 et regarde vers la droite. Écris un programme qui lui fait suivre le chemin dessiné jusqu'au carré.",
        solution: "avancer de $3$ (il arrive en E2) ; tourner à gauche (il regarde vers le haut) ; avancer de $2$ (E4) ; tourner à gauche (il regarde vers la gauche) ; avancer de $1$ : il arrive en D4.\n\nAvec des flèches, le même chemin s'écrit → → → ↑ ↑ ←."
      }
    },
    {
      titre: "Répéter des instructions : la boucle",
      video: { titre: "Vidéo d'Yvan Monka : apprendre à programmer avec Scratch (2), les boucles", youtube: "https://youtu.be/8Sfarvw6jgg" },
      texte:
        "Quand une séquence d'instructions revient plusieurs fois, on l'écrit une seule fois dans un bloc **« répéter … fois »** : c'est une **boucle**.\n\n" +
        "Le code → ↑ → ↑ → ↑ s'écrit : répéter $3$ fois (→ ↑).\n\n" +
        "Pour exécuter une boucle à la main, on fait tous les blocs de l'intérieur, puis on recommence, autant de fois qu'indiqué. Sur la figure, le lutin avance de $80$ pas puis tourne de $90^\\circ$, et cela $4$ fois : il trace un **carré** de côté $80$ pas.",
      figure: "pi6-boucle",
      exemple: {
        enonce: "On donne le nombre $5$ à un programme qui contient : répéter $3$ fois (ajouter $4$). Quel nombre obtient-on ?",
        solution: "Premier passage : $5 + 4 = 9$. Deuxième : $9 + 4 = 13$. Troisième : $13 + 4 = 17$.\n\nOn obtient $17$ (on a ajouté $3 \\times 4 = 12$ en tout)."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "pi6-executer", titre: "Exécuter un programme", etape: "Instructions et séquences", nb: 6 },
    { type: "pi6-identifier", titre: "Entrée, sortie et ordre des instructions", etape: "Instructions et séquences", nb: 5 },
    { type: "pi6-fleches", titre: "Coder un déplacement avec des flèches", etape: "Déplacements sur un quadrillage", nb: 6 },
    { type: "pi6-robot", titre: "Avancer et tourner", etape: "Déplacements sur un quadrillage", nb: 6 },
    { type: "pi6-repeter", titre: "Répéter des instructions", etape: "Les boucles", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Dans un programme, les instructions sont exécutées :", choix: ["l'une après l'autre, dans l'ordre", "toutes en même temps", "dans n'importe quel ordre", "de la dernière à la première"], bonne: 0, explication: "Un programme est une séquence d'instructions : on les lit de haut en bas." },
    { question: "Avec le programme, on donne le nombre $6$. Il affiche :", figure: "pi6-programme", choix: ["$23$", "$33$", "$18$", "$14$"], bonne: 0, explication: "$6 \\times 3 = 18$, puis $18 + 5 = 23$." },
    { question: "Dans ce programme, l'instruction « demander un nombre » est :", figure: "pi6-programme", choix: ["l'entrée", "la sortie", "une répétition", "un calcul"], bonne: 0, explication: "C'est là qu'on donne le nombre au programme." },
    { question: "Dans ce programme, l'instruction « dire le résultat » est :", figure: "pi6-programme", choix: ["la sortie", "l'entrée", "une répétition", "un déplacement"], bonne: 0, explication: "C'est là que le programme montre ce qu'il a calculé." },
    { question: "La case B4 se trouve :", choix: ["dans la colonne B, à la ligne 4", "dans la colonne 4, à la ligne B", "à 4 cases de la case B", "dans la ligne B"], bonne: 0, explication: "La lettre donne la colonne, le nombre donne la ligne." },
    { question: "Un robot est en C3. Avec le code → → ↑, il arrive en :", choix: ["E4", "D5", "E2", "C5"], bonne: 0, explication: "Deux cases à droite (E3), une vers le haut (E4)." },
    { question: "Quel code fait suivre le chemin dessiné, du rond au carré ?", figure: "pi6-fleches", choix: ["→ → → ↑ ↑ ←", "↑ ↑ → → → ←", "→ → → ↓ ↓ ←", "→ → ↑ ↑ ←"], bonne: 0, explication: "$3$ cases à droite, $2$ vers le haut, $1$ vers la gauche." },
    { question: "« Tourner à droite » fait :", choix: ["un quart de tour sur place, vers la droite du robot", "avancer d'une case vers la droite de la feuille", "un demi-tour", "reculer d'une case"], bonne: 0, explication: "Le robot pivote sans changer de case." },
    { question: "Un robot regarde vers le bas. Il tourne à droite. Il regarde maintenant :", choix: ["vers la gauche", "vers la droite", "vers le haut", "vers le bas"], bonne: 0, explication: "Dans l'ordre d'un quart de tour à droite : haut, droite, bas, gauche." },
    { question: "Le robot de la figure exécute le programme. Il arrive en :", figure: "pi6-robot", choix: ["E4", "B5", "D4", "E2"], bonne: 0, explication: "B2 → B4 (vers le haut), il tourne vers la droite, puis B4 → E4." },
    { question: "Le code → ↓ → ↓ → ↓ → ↓ peut s'écrire :", choix: ["répéter $4$ fois (→ ↓)", "répéter $8$ fois (→ ↓)", "répéter $2$ fois (→ ↓)", "répéter $4$ fois (→)"], bonne: 0, explication: "Le groupe → ↓ revient $4$ fois." },
    { question: "Quelle figure trace le lutin avec ce programme ?", figure: "pi6-boucle", choix: ["un carré", "un triangle", "un rectangle non carré", "un hexagone"], bonne: 0, explication: "$4$ côtés de $80$ pas et $4$ quarts de tour : un carré." },
    { question: "On part de $2$ et on répète $3$ fois « multiplier par $2$ ». On obtient :", choix: ["$16$", "$12$", "$8$", "$64$"], bonne: 0, explication: "$2 \\to 4 \\to 8 \\to 16$." },
    { question: "Pour tracer un triangle équilatéral, le lutin répète « avancer ; tourner de $120^\\circ$ » :", choix: ["$3$ fois", "$120$ fois", "$4$ fois", "$6$ fois"], bonne: 0, explication: "Un triangle a $3$ côtés, et $3 \\times 120^\\circ = 360^\\circ$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Exécuter un programme à la main",
      etapes: [
        "Repère l'entrée (ce qu'on donne) et la sortie (ce qui est affiché).",
        "Lis les blocs de haut en bas, un par un.",
        "Après chaque bloc, note le nouveau nombre (ou la nouvelle case et la direction du robot)."
      ],
      exemple: "Entrée $4$ ; multiplier par $3$ : $12$ ; ajouter $5$ : $17$. Sortie : $17$."
    },
    {
      titre: "Suivre ou écrire un code de flèches",
      etapes: [
        "Pars de la case de départ (colonne puis ligne).",
        "Une flèche = une case dans sa direction ; regroupe les flèches identiques.",
        "Pour écrire un code, découpe le chemin en lignes droites et compte les cases."
      ],
      exemple: "De A1 avec ↑ ↑ → → → ↓ : A3, puis D3, puis D2."
    },
    {
      titre: "Guider un robot qui tourne",
      etapes: [
        "Note la direction du robot au départ.",
        "« Avancer » : tout droit, devant lui. « Tourner » : quart de tour sur place, vers sa droite ou sa gauche.",
        "À chaque virage, mets-toi à la place du robot pour savoir s'il tourne à droite ou à gauche."
      ],
      exemple: "Il regarde vers le haut ; « tourner à droite » : il regarde vers la droite de la feuille."
    },
    {
      titre: "Utiliser une boucle",
      etapes: [
        "Repère la séquence qui se répète et compte combien de fois elle revient.",
        "Écris : répéter … fois (la séquence).",
        "Pour exécuter une boucle, fais tout l'intérieur, puis recommence, autant de fois qu'indiqué."
      ],
      exemple: "→ ↑ → ↑ → ↑ s'écrit répéter $3$ fois (→ ↑)."
    }
  ],
  erreurs: [
    "Exécuter les instructions dans le désordre : l'ordre change le résultat.",
    "Confondre la droite du robot avec la droite de la feuille.",
    "Croire que « tourner » fait changer de case : le robot pivote sur place.",
    "Compter la case de départ quand le robot avance.",
    "Oublier de refaire la boucle autant de fois qu'indiqué (ou ne la faire qu'une fois).",
    "Confondre le nombre de répétitions avec le nombre total de flèches."
  ]
};
