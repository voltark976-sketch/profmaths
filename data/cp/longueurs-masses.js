/*
  CHAPITRE : CP — Longueurs et masses
  ------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CP, « Les longueurs et les masses » :
  - lexique (long, court, près, loin ; lourd, léger) ; comparer des objets et des segments selon leur longueur ;
  - mesurer un segment avec une règle graduée en centimètres ; unités mètre et centimètre (m, cm) ; 1 m = 100 cm ;
    longueurs de référence ;
  - comparer des objets selon leur masse (en soupesant, avec une balance). Au CP, tout s'appuie sur des manipulations.
  figure : FIGURES de assets/exercices-cp.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cp-longueurs-masses"] = {
  niveau: "CP",
  numero: 7,
  titre: "Longueurs et masses",
  accroche: "Plus long, plus court, plus lourd, plus léger : comparer, mesurer avec une règle et connaître le mètre et le centimètre.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Comparer des longueurs",
      video: { titre: "Vidéo de Maître Lucas : comparer des longueurs", youtube: "https://youtu.be/wCkl4DipT5U" },
      texte:
        "Pour comparer deux objets, on les pose côte à côte en les faisant **partir du même endroit**.\n\n" +
        "Celui qui dépasse est le plus **long**, l'autre est le plus **court**.\n\n" +
        "Si deux traits ne partent pas du même endroit, on peut les comparer avec une bande de papier ou en les mesurant.",
      exemple: {
        enonce: "Un crayon et une gomme sont posés côte à côte, au même départ. Le crayon dépasse. Lequel est le plus court ?",
        solution: "La gomme est la plus courte."
      }
    },
    {
      titre: "Mesurer avec une règle",
      video: { titre: "Vidéo de Maître Lucas : mesurer avec une règle", youtube: "https://youtu.be/HqY-BzXEebM" },
      texte:
        "1. On place le **$0$** de la règle au début du segment.\n" +
        "2. On lit le nombre au bout du segment.\n\n" +
        "Le segment ci-contre mesure $7$ centimètres : on écrit $7$ cm.\n\n" +
        "Si le segment ne commence pas au $0$, on compte les centimètres entre le début et la fin : de $2$ à $8$, cela fait $6$ cm.",
      figure: ["cp7-cours-regle", "cp7-cours-regle2"],
      exemple: {
        enonce: "Un segment va de la graduation $3$ à la graduation $9$ de la règle. Combien mesure-t-il ?",
        solution: "De $3$ à $9$, il y a $6$ centimètres : $6$ cm."
      }
    },
    {
      titre: "Le mètre et le centimètre",
      video: { titre: "Vidéo de Maître Lucas : unités de longueur (cm, m, km)", youtube: "https://youtu.be/-qByljFC62o" },
      texte:
        "- Le **centimètre** (cm) sert pour les petites longueurs : une gomme mesure environ $4$ cm, un crayon $15$ cm.\n" +
        "- Le **mètre** (m) sert pour les grandes longueurs : une porte mesure environ $2$ m, un banga $3$ m.\n\n" +
        "**$1$ m $= 100$ cm.** Une grande règle de tableau mesure $1$ m.",
      exemple: {
        enonce: "Combien de centimètres dans $2$ m ?",
        solution: "$1$ m $= 100$ cm, donc $2$ m $= 200$ cm."
      }
    },
    {
      titre: "Lourd ou léger",
      video: { titre: "Vidéo de Maître Lucas : comparer des masses", youtube: "https://youtu.be/BEYnL7bEW9Q" },
      texte:
        "Pour savoir quel objet est le plus **lourd**, on peut le soupeser ou utiliser une **balance**.\n\n" +
        "Sur une balance à plateaux, le plateau le plus lourd **descend**. Si la balance reste droite, les deux objets ont la même masse.\n\n" +
        "Attention : un gros objet n'est pas toujours le plus lourd (un ballon est plus gros qu'une mangue, mais il peut être plus léger).",
      figure: "cp7-cours-balance",
      exemple: {
        enonce: "Sur la balance, quel fruit est le plus lourd ?",
        solution: "Le plateau de l'ananas descend : l'ananas est le plus lourd."
      }
    }
  ],

  exercices: [
    { type: "cp7-comparer", titre: "Le plus long, le plus court", etape: "Les longueurs", nb: 5 },
    { type: "cp7-mesurer", titre: "Mesurer avec une règle", etape: "Les longueurs", nb: 6 },
    { type: "cp7-unites", titre: "Mètre et centimètre", etape: "Les longueurs", nb: 6 },
    { type: "cp7-masses", titre: "Le plus lourd, le plus léger", etape: "Les masses", nb: 5 }
  ],

  qcm: [
    { question: "Combien mesure le segment ?", figure: "cp7-qcm-regle", choix: ["$6$ cm", "$9$ cm", "$3$ cm", "$7$ cm"], bonne: 0, explication: "Il va de $3$ à $9$ : $6$ cm." },
    { question: "Quel segment est le plus long ?", figure: "cp7-qcm-segments", choix: ["B", "A", "C", "Ils ont la même longueur"], bonne: 0, explication: "Ils partent du même endroit et B dépasse." },
    { question: "Quel objet est le plus lourd ?", figure: "cp7-qcm-balance", choix: ["La noix de coco", "La mangue", "Ils ont la même masse", "On ne peut pas savoir"], bonne: 0, explication: "Le plateau de la noix de coco descend." },
    { question: "$1$ m $=$", choix: ["$100$ cm", "$10$ cm", "$1$ cm", "$1\\,000$ cm"], bonne: 0, explication: "Un mètre, c'est cent centimètres." },
    { question: "$3$ m $=$", choix: ["$300$ cm", "$30$ cm", "$3$ cm", "$103$ cm"], bonne: 0, explication: "$100 + 100 + 100 = 300$ cm." },
    { question: "Une gomme mesure environ :", choix: ["$4$ cm", "$4$ m", "$40$ m", "$40$ cm"], bonne: 0, explication: "Une gomme est plus petite qu'un doigt de long : $4$ cm." },
    { question: "La porte de la classe mesure environ :", choix: ["$2$ m", "$2$ cm", "$20$ cm", "$20$ m"], bonne: 0, explication: "Une porte est un peu plus haute qu'un adulte : $2$ m." },
    { question: "Pour mesurer un segment, on place au début :", choix: ["le $0$ de la règle", "le $1$ de la règle", "le bout de la règle", "le milieu de la règle"], bonne: 0, explication: "On part du $0$." },
    { question: "Pour mesurer la longueur de la cour, on utilise :", choix: ["le mètre", "le centimètre", "le kilogramme", "l'heure"], bonne: 0, explication: "Les grandes longueurs se mesurent en mètres." },
    { question: "Sur une balance, le plateau le plus lourd :", choix: ["descend", "monte", "reste droit", "tourne"], bonne: 0, explication: "Le côté le plus lourd descend." },
    { question: "La balance reste droite. Cela veut dire que :", choix: ["les deux objets ont la même masse", "l'objet de gauche est plus lourd", "l'objet de droite est plus lourd", "la balance est cassée"], bonne: 0, explication: "Même masse : la balance est équilibrée." },
    { question: "Deux bâtons de $30$ cm et $45$ cm bout à bout mesurent :", choix: ["$75$ cm", "$15$ cm", "$3\\,045$ cm", "$65$ cm"], bonne: 0, explication: "$30 + 45 = 75$ cm." },
    { question: "Le contraire de « long » est :", choix: ["court", "lourd", "loin", "léger"], bonne: 0, explication: "Long et court parlent de longueur." },
    { question: "Le contraire de « lourd » est :", choix: ["léger", "court", "petit", "près"], bonne: 0, explication: "Lourd et léger parlent de masse." },
    { question: "L'ananas est plus lourd que la mangue, la mangue est plus lourde que le citron. Le plus léger est :", choix: ["le citron", "l'ananas", "la mangue", "on ne peut pas savoir"], bonne: 0, explication: "Du plus lourd au plus léger : ananas, mangue, citron." },
    { question: "$200$ cm $=$", choix: ["$2$ m", "$20$ m", "$200$ m", "$1$ m"], bonne: 0, explication: "$100$ cm $= 1$ m, donc $200$ cm $= 2$ m." },
    { question: "Un segment va de $1$ à $6$ sur la règle. Il mesure :", choix: ["$5$ cm", "$6$ cm", "$7$ cm", "$1$ cm"], bonne: 0, explication: "De $1$ à $6$ : $6 - 1 = 5$ cm." },
    { question: "Quel objet mesure environ $15$ cm ?", choix: ["un crayon", "un bus", "une fourmi", "une maison"], bonne: 0, explication: "Un crayon mesure environ $15$ cm." }
  ],

  methode: [
    {
      titre: "Mesurer un segment",
      etapes: [
        "Pose la règle le long du segment.",
        "Mets le $0$ au début du segment.",
        "Lis le nombre au bout et écris l'unité : cm."
      ],
      figure: "cp7-cours-regle",
      exemple: "Le bout est sur $7$ : le segment mesure $7$ cm."
    },
    {
      titre: "Lire une balance",
      etapes: [
        "Regarde quel plateau est le plus bas.",
        "L'objet de ce plateau est le plus lourd.",
        "Si la balance est droite, les masses sont égales."
      ],
      figure: "cp7-cours-balance",
      exemple: "Le plateau de l'ananas descend : l'ananas est plus lourd que le citron."
    }
  ],
  erreurs: [
    "Comparer des objets qui ne partent pas du même endroit.",
    "Commencer à mesurer au $1$ de la règle au lieu du $0$.",
    "Oublier l'unité (cm ou m) dans la réponse.",
    "Croire que $1$ m $= 10$ cm : $1$ m $= 100$ cm.",
    "Penser que le plus gros objet est forcément le plus lourd."
  ]
};
