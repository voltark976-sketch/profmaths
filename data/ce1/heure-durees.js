/*
  CHAPITRE : CE1 — L'heure et les durées
  ---------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE1 :
  - lire l'heure (heures entières, demi-heures, quarts d'heure) ; heures du matin et de l'après-midi (14 h 15) ;
  - h et min ; 1 h = 60 min ; 1 demi-heure = 30 min ; 1 quart d'heure = 15 min ;
  - comparer et mesurer des durées entre deux instants d'une même journée ; ajouter des durées ; comparer 2 h et 130 min.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce1-heure-durees"] = {
  niveau: "CE1",
  numero: 11,
  titre: "L'heure et les durées",
  accroche: "Lire l'heure et quart, et demie, moins le quart ; les heures de l'après-midi ; calculer une durée.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Et quart, et demie, moins le quart",
      video: { titre: "Vidéo de Maître Lucas : lire les heures, les minutes", youtube: "https://youtu.be/20QU8x3ElAs" },
      texte:
        "La grande aiguille fait le tour en $1$ heure, c'est-à-dire $60$ minutes.\n\n" +
        "- Sur le $3$ : $15$ minutes, « et quart » ;\n" +
        "- sur le $6$ : $30$ minutes, « et demie » ;\n" +
        "- sur le $9$ : $45$ minutes, « moins le quart » de l'heure suivante.\n\n" +
        "Sur la première horloge, il est $2$ h $15$ (deux heures et quart).",
      figure: "e1h-cours-quart",
      exemple: {
        enonce: "La petite aiguille est un peu avant le $5$, la grande sur le $9$. Quelle heure est-il ?",
        solution: "$4$ h $45$, c'est-à-dire cinq heures moins le quart."
      }
    },
    {
      titre: "Le matin et l'après-midi",
      video: { titre: "Vidéo de Maître Lucas : lire les heures de l'après-midi", youtube: "https://youtu.be/x8MPr2cyUIU" },
      texte:
        "La petite aiguille fait **deux tours** par jour.\n\n" +
        "- Le matin : de $0$ h à $12$ h (midi).\n" +
        "- L'après-midi et le soir : on ajoute $12$. $2$ heures de l'après-midi, c'est $14$ h ; $8$ heures du soir, c'est $20$ h.\n\n" +
        "Sur une horloge digitale, « 14:15 » veut dire $14$ h $15$.",
      exemple: {
        enonce: "Il est $3$ heures et quart de l'après-midi. Comment l'écrire ?",
        solution: "$15$ h $15$."
      }
    },
    {
      titre: "Les durées",
      video: { titre: "Vidéo de Maître Lucas : savoir lire l'heure (avec les durées)", youtube: "https://youtu.be/jK_HKdDkLvM" },
      texte:
        "- $1$ h $= 60$ min ; une demi-heure $= 30$ min ; un quart d'heure $= 15$ min ; trois quarts d'heure $= 45$ min.\n" +
        "- De $8$ h $30$ à $8$ h $45$ : $15$ minutes. De $15$ h $45$ à $16$ h $15$ : $15$ min $+ 15$ min $= 30$ minutes.\n" +
        "- De midi à $20$ h : $8$ heures.\n\n" +
        "Pour comparer $2$ h et $130$ min : $2$ h $= 120$ min, donc $2$ h $< 130$ min.",
      exemple: {
        enonce: "Mamie taille ses fleurs pendant un quart d'heure, puis bêche pendant une demi-heure. Combien de temps est-elle au jardin ?",
        solution: "$15 + 30 = 45$ minutes, trois quarts d'heure."
      }
    }
  ],

  exercices: [
    { type: "e1h-lire", titre: "Lire l'heure", etape: "L'heure", nb: 6 },
    { type: "e1h-unites", titre: "Heures, demi-heures, quarts d'heure", etape: "Les durées", nb: 6 },
    { type: "e1h-durees", titre: "Calculer une durée", etape: "Les durées", nb: 5 }
  ],

  qcm: [
    { question: "Le matin, quelle heure indique l'horloge ?", figure: "e1h-qcm-horloge", choix: ["$4$ h $45$", "$9$ h $20$", "$5$ h $45$", "$4$ h $15$"], bonne: 0, explication: "Petite aiguille entre $4$ et $5$, grande sur le $9$ : $4$ h $45$." },
    { question: "La grande aiguille sur le $6$ indique :", choix: ["$30$ minutes", "$6$ minutes", "$15$ minutes", "$60$ minutes"], bonne: 0, explication: "Et demie : $30$ minutes." },
    { question: "$1$ heure $=$", choix: ["$60$ minutes", "$100$ minutes", "$30$ minutes", "$12$ minutes"], bonne: 0, explication: "Une heure fait soixante minutes." },
    { question: "Un quart d'heure $=$", choix: ["$15$ minutes", "$25$ minutes", "$4$ minutes", "$45$ minutes"], bonne: 0, explication: "$60 \\div 4 = 15$." },
    { question: "Trois quarts d'heure $=$", choix: ["$45$ minutes", "$34$ minutes", "$30$ minutes", "$75$ minutes"], bonne: 0, explication: "$15 + 15 + 15 = 45$." },
    { question: "$2$ heures de l'après-midi, c'est :", choix: ["$14$ h", "$2$ h", "$12$ h", "$22$ h"], bonne: 0, explication: "$2 + 12 = 14$." },
    { question: "$20$ h, c'est :", choix: ["$8$ heures du soir", "$8$ heures du matin", "$2$ heures", "midi"], bonne: 0, explication: "$20 - 12 = 8$ : le soir." },
    { question: "De $8$ h $30$ à $8$ h $45$, il s'écoule :", choix: ["$15$ minutes", "$45$ minutes", "$1$ heure", "$30$ minutes"], bonne: 0, explication: "$45 - 30 = 15$." },
    { question: "De $15$ h $45$ à $16$ h $15$, il s'écoule :", choix: ["$30$ minutes", "$1$ heure", "$70$ minutes", "$15$ minutes"], bonne: 0, explication: "$15$ min jusqu'à $16$ h, puis $15$ min." },
    { question: "De midi à $20$ h, il s'écoule :", choix: ["$8$ heures", "$20$ heures", "$12$ heures", "$32$ heures"], bonne: 0, explication: "$20 - 12 = 8$." },
    { question: "$2$ h $\\;\\ldots\\;$ $130$ min", choix: ["$<$", "$>$", "$=$"], bonne: 0, explication: "$2$ h $= 120$ min." },
    { question: "Une demi-heure $+$ un quart d'heure $=$", choix: ["$45$ minutes", "$75$ minutes", "$30$ minutes", "$1$ heure"], bonne: 0, explication: "$30 + 15 = 45$." },
    { question: "Deux demi-heures font :", choix: ["$1$ heure", "$2$ heures", "$30$ minutes", "$100$ minutes"], bonne: 0, explication: "$30 + 30 = 60$ minutes." },
    { question: "« 14:15 » sur une horloge digitale se lit :", choix: ["$14$ h $15$", "$15$ h $14$", "$1$ h $415$", "$14$ h $50$"], bonne: 0, explication: "Heures, deux-points, minutes." },
    { question: "Le symbole de la minute est :", choix: ["min", "m", "mi", "h"], bonne: 0, explication: "min pour minute, h pour heure." },
    { question: "Le cours commence à $9$ h et dure $1$ h $30$. Il finit à :", choix: ["$10$ h $30$", "$9$ h $30$", "$10$ h", "$11$ h $30$"], bonne: 0, explication: "$9$ h $+ 1$ h $= 10$ h, puis $+ 30$ min." },
    { question: "$90$ minutes, c'est :", choix: ["$1$ h $30$ min", "$1$ h $90$ min", "$9$ h", "$1$ h $10$ min"], bonne: 0, explication: "$60 + 30 = 90$." },
    { question: "Quelle durée est la plus longue ?", choix: ["$1$ h $15$ min", "$70$ min", "une heure", "trois quarts d'heure"], bonne: 0, explication: "$75$ min $> 70 > 60 > 45$." }
  ],

  methode: [
    {
      titre: "Calculer une durée",
      etapes: [
        "Pars de l'heure de début.",
        "Avance jusqu'à l'heure juste suivante (en minutes), puis d'heure en heure.",
        "Ajoute tous les morceaux."
      ],
      exemple: "De $15$ h $45$ à $17$ h $15$ : $15$ min $+ 1$ h $+ 15$ min $= 1$ h $30$ min."
    }
  ],
  erreurs: [
    "Confondre la petite et la grande aiguille.",
    "Croire qu'une heure fait $100$ minutes.",
    "Oublier d'ajouter $12$ pour les heures de l'après-midi.",
    "Lire « $4$ h $45$ » comme « $5$ h $45$ » : la petite aiguille n'est pas encore sur le $5$."
  ]
};
