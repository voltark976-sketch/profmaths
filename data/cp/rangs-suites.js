/*
  CHAPITRE : CP — Les rangs et les suites
  ----------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CP :
  - nombres ordinaux jusqu'à « vingtième » ; repérer un rang dans une file orientée ou une liste ;
  - lien entre le rang d'un objet et le nombre d'éléments qui le précèdent ;
  - ordinaux dans l'étude de suites de symboles, de formes ou de nombres (« quelle est la dix-neuvième lettre ? »).
  figure : FIGURES de assets/exercices-cp.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cp-rangs-suites"] = {
  niveau: "CP",
  numero: 3,
  titre: "Les rangs et les suites",
  accroche: "Premier, deuxième, vingtième : donner une place dans une file, puis continuer des suites de formes et de nombres.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Premier, deuxième, troisième…",
      video: { titre: "Vidéo de Lelivrescolaire.fr : les nombres ordinaux et cardinaux", youtube: "https://youtu.be/JE9XnJ323xQ" },
      texte:
        "Pour dire une **place** (un rang), on utilise les nombres ordinaux : premier ($1$er), deuxième ($2$e), troisième ($3$e)… vingtième ($20$e).\n\n" +
        "On ajoute « ième » au nombre : quatre → quatrième, six → sixième. Attention : cinq → cinq**u**ième, neuf → neu**v**ième.\n\n" +
        "Dans une file, il faut savoir où elle commence : le premier est celui qui est devant.",
      figure: "cp3-cours-file",
      exemple: {
        enonce: "Dans la file pour la barge, Nasra est la cinquième. Combien de personnes sont devant elle ?",
        solution: "Devant elle, il y a le premier, le deuxième, le troisième et le quatrième : $4$ personnes."
      }
    },
    {
      titre: "Le rang et le nombre de personnes devant",
      video: { titre: "Vidéo de Maître Lucas : les suites de nombres", youtube: "https://youtu.be/7kdCpfjRfPM" },
      texte:
        "Si tu es le $6$e de la file, il y a $5$ personnes devant toi : **une de moins que ton rang**.\n\n" +
        "Si $3$ personnes sont devant toi, tu es le $4$e.\n\n" +
        "Dans une liste de nombres aussi, on peut dire le rang : dans la liste $2$ ; $6$ ; $10$ ; $14$ ; $18$, le nombre $10$ est en troisième position, et le quatrième nombre est $14$.",
      exemple: {
        enonce: "Il y a $9$ enfants dans la file de la cantine. Inaya est la troisième. Combien d'enfants sont derrière elle ?",
        solution: "Inaya et les $2$ enfants devant elle : $3$ enfants. Derrière : $9 - 3 = 6$ enfants."
      }
    },
    {
      titre: "Les suites qui se répètent",
      video: { titre: "Vidéo de Super Croco : les suites logiques", youtube: "https://youtu.be/EY-JZrtsfWk" },
      texte:
        "Dans une suite qui se répète, un **motif** revient toujours dans le même ordre.\n\n" +
        "Dans ▲ ■ ● ▲ ■ ● ▲ ■ …, le motif est ▲ ■ ● : il a $3$ formes. Il recommence à la $4$e, à la $7$e, à la $10$e forme…\n\n" +
        "Pour trouver une forme loin dans la suite, on continue le motif en comptant les rangs.",
      figure: "cp3-cours-motifs",
      exemple: {
        enonce: "Quelle forme remplace le « ? » sur la figure ?",
        solution: "Le motif ▲ ■ ● se répète : après ▲ ■ vient ●."
      }
    },
    {
      titre: "Les suites de nombres",
      video: { titre: "Vidéo de « Cheddar & Mimolette » : compter de 1 en 1 puis de 2 en 2", youtube: "https://youtu.be/4TJCMcjh9tA" },
      texte:
        "Une suite de nombres peut avancer toujours du même pas.\n\n" +
        "$1$ ; $3$ ; $5$ ; $7$ ; $9$ : on ajoute $2$ à chaque fois. Le sixième nombre est $11$, le septième est $13$.\n\n" +
        "Pour trouver un nombre loin dans la suite, écris la suite et compte les rangs avec ton doigt.",
      exemple: {
        enonce: "La suite $5$ ; $10$ ; $15$ ; $20$ continue de la même façon. Quel est le sixième nombre ?",
        solution: "$5$ ; $10$ ; $15$ ; $20$ ; $25$ ; $30$ : le sixième est $30$."
      }
    }
  ],

  exercices: [
    { type: "cp3-file", titre: "Ma place dans la file", etape: "Les rangs", nb: 6 },
    { type: "cp3-liste", titre: "Le rang dans une liste", etape: "Les rangs", nb: 6 },
    { type: "cp3-motifs", titre: "Les suites de formes", etape: "Les suites", nb: 6 },
    { type: "cp3-suite-nombres", titre: "Les suites de nombres", etape: "Les suites", nb: 6 }
  ],

  qcm: [
    { question: "Comment écrit-on le rang $5$e en lettres ?", choix: ["cinquième", "cinqième", "quinzième", "cinq"], bonne: 0, explication: "On ajoute un « u » : cinquième." },
    { question: "Comment écrit-on le rang $9$e en lettres ?", choix: ["neuvième", "neufième", "dix-neuvième", "neuf"], bonne: 0, explication: "Le « f » de neuf devient « v » : neuvième." },
    { question: "Dans la file, Moussa est le septième. Combien de personnes sont devant lui ?", choix: ["$6$", "$7$", "$8$", "$5$"], bonne: 0, explication: "Une de moins que son rang : $6$." },
    { question: "$4$ personnes sont devant Awa dans la file. Awa est la :", choix: ["cinquième", "quatrième", "troisième", "sixième"], bonne: 0, explication: "Les $4$ personnes ont les rangs $1$ à $4$ ; Awa est la cinquième." },
    { question: "Il y a $10$ enfants dans la file. Zaïd est le deuxième. Combien d'enfants sont derrière lui ?", choix: ["$8$", "$9$", "$2$", "$1$"], bonne: 0, explication: "Zaïd et celui devant : $2$. Derrière : $10 - 2 = 8$." },
    { question: "Dans la liste $3$ ; $8$ ; $13$ ; $18$ ; $23$, quel est le quatrième nombre ?", choix: ["$18$", "$13$", "$23$", "$4$"], bonne: 0, explication: "$3$ (1er), $8$ (2e), $13$ (3e), $18$ (4e)." },
    { question: "Dans la liste $10$ ; $20$ ; $30$ ; $40$, à quelle position est $30$ ?", choix: ["troisième", "quatrième", "deuxième", "trentième"], bonne: 0, explication: "$10$ est premier, $20$ deuxième, $30$ troisième." },
    { question: "Quelle forme remplace le « ? » ?", figure: "cp3-qcm-motifs", choix: ["★", "●", "■", "▲"], bonne: 0, explication: "Le motif ★ ★ ● se répète : après ★ ★ ● ★ vient ★." },
    { question: "Dans la suite A B A B A B…, quelle est la dixième lettre ?", choix: ["B", "A", "C", "D"], bonne: 0, explication: "Les lettres de rang pair sont des B : la dixième est B." },
    { question: "Dans la suite A B C A B C…, quelle est la septième lettre ?", choix: ["A", "B", "C", "D"], bonne: 0, explication: "Le motif A B C recommence à la 4e et à la 7e lettre : A." },
    { question: "La suite $1$ ; $3$ ; $5$ ; $7$ continue. Quel est le septième nombre ?", choix: ["$13$", "$11$", "$15$", "$7$"], bonne: 0, explication: "$1$, $3$, $5$, $7$, $9$, $11$, $13$." },
    { question: "La suite $0$ ; $10$ ; $20$ ; $30$ continue. Quel est le sixième nombre ?", choix: ["$50$", "$60$", "$40$", "$6$"], bonne: 0, explication: "$0$, $10$, $20$, $30$, $40$, $50$ : le sixième est $50$." },
    { question: "Quel rang vient juste après le dix-neuvième ?", choix: ["le vingtième", "le dix-huitième", "le vingt-et-unième", "le dixième"], bonne: 0, explication: "Après $19$ vient $20$ : vingtième." },
    { question: "Le premier de la file est celui qui est :", choix: ["tout devant", "tout derrière", "au milieu", "le plus grand"], bonne: 0, explication: "On compte les rangs depuis le début de la file." },
    { question: "Dans la suite ● ● ■ ● ● ■…, quelle est la neuvième forme ?", choix: ["■", "●", "▲", "★"], bonne: 0, explication: "Le motif ● ● ■ a $3$ formes ; la 3e, la 6e et la 9e sont des ■." },
    { question: "Sur l'étagère, le livre rouge est le troisième en partant de la gauche. Combien de livres sont à sa gauche ?", choix: ["$2$", "$3$", "$4$", "$1$"], bonne: 0, explication: "Le premier et le deuxième : $2$ livres." },
    { question: "La suite $20$ ; $18$ ; $16$ ; $14$ continue. Quel est le cinquième nombre ?", choix: ["$12$", "$13$", "$10$", "$16$"], bonne: 0, explication: "On enlève $2$ à chaque fois : $14 - 2 = 12$." },
    { question: "« $2$e » se lit :", choix: ["deuxième", "deux", "douzième", "vingtième"], bonne: 0, explication: "$2$e se lit « deuxième »." }
  ],

  methode: [
    {
      titre: "Passer du rang au nombre de personnes devant",
      etapes: [
        "Repère où commence la file (le premier est devant).",
        "Les personnes devant toi ont les rangs avant le tien.",
        "Il y en a une de moins que ton rang."
      ],
      exemple: "$8$e de la file : $7$ personnes devant."
    },
    {
      titre: "Trouver une forme loin dans une suite",
      etapes: [
        "Trouve le motif qui se répète et compte ses formes.",
        "Continue la suite en écrivant les rangs sous les formes.",
        "Arrête-toi au rang demandé."
      ],
      figure: "cp3-cours-motifs",
      exemple: "Motif ▲ ■ ● : la $9$e forme est ●."
    }
  ],
  erreurs: [
    "Se compter soi-même parmi les personnes devant.",
    "Oublier où commence la file (devant ou derrière, à gauche ou à droite).",
    "Écrire « cinqième » ou « neufième » : on écrit cinquième, neuvième.",
    "Recommencer le motif au mauvais endroit dans une suite qui se répète.",
    "Confondre le nombre et son rang dans une liste."
  ]
};
