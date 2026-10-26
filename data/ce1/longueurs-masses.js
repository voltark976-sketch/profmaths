/*
  CHAPITRE : CE1 — Longueurs et masses
  -------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE1 :
  - longueurs : m, cm, km et symboles ; 1 m = 100 cm, 1 km = 1 000 m ; choisir l'unité ; mesurer avec une règle ;
    encadrer une longueur par deux nombres entiers de centimètres ; 1 m + 46 cm = 146 cm ; longueurs de référence ;
  - masses : g, kg ; 1 kg = 1 000 g ; comparer, ordonner quatre masses ; masses de référence. Pas d'écriture à virgule.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce1-longueurs-masses"] = {
  niveau: "CE1",
  numero: 9,
  titre: "Longueurs et masses",
  accroche: "Mètre, centimètre, kilomètre ; gramme et kilogramme : mesurer, choisir la bonne unité et comparer.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Les unités de longueur",
      video: { titre: "Vidéo de Maître Lucas : unités de longueur (cm, m, km)", youtube: "https://youtu.be/-qByljFC62o" },
      texte:
        "- Le **centimètre** (cm) : petites longueurs (un crayon : $15$ cm).\n" +
        "- Le **mètre** (m) : $1$ m $= 100$ cm (une porte : $2$ m).\n" +
        "- Le **kilomètre** (km) : $1$ km $= 1\\,000$ m (de Mamoudzou à Sada : environ $25$ km).\n\n" +
        "$1$ m $+ 46$ cm $= 100$ cm $+ 46$ cm $= 146$ cm.",
      exemple: {
        enonce: "Complète : $3$ km $= \\ldots$ m.",
        solution: "$3 \\times 1\\,000 = 3\\,000$ m."
      }
    },
    {
      titre: "Mesurer et encadrer une longueur",
      video: { titre: "Vidéo de Maître Lucas : mesurer avec une règle", youtube: "https://youtu.be/HqY-BzXEebM" },
      texte:
        "On place le $0$ de la règle au début du segment et on lit le nombre au bout.\n\n" +
        "Si le bout tombe entre deux graduations, on **encadre** : « le segment mesure entre $8$ cm et $9$ cm ».",
      figure: "e1l-cours-regle",
      exemple: {
        enonce: "Un segment s'arrête entre la graduation $6$ et la graduation $7$. Encadre sa longueur.",
        solution: "Il mesure entre $6$ cm et $7$ cm."
      }
    },
    {
      titre: "Les masses : gramme et kilogramme",
      video: { titre: "Vidéo de Maître Lucas : mesurer des masses", youtube: "https://youtu.be/W9mo-MeRMy0" },
      texte:
        "- Le **gramme** (g) : objets légers (un sachet de levure : $10$ g ; une gomme : $20$ g).\n" +
        "- Le **kilogramme** (kg) : objets lourds (un paquet de sucre : $1$ kg ; un sac de riz : $5$ kg).\n\n" +
        "**$1$ kg $= 1\\,000$ g.** Pour comparer $1$ kg et $800$ g, on écrit tout en grammes : $1\\,000$ g $> 800$ g.",
      exemple: {
        enonce: "Range du plus léger au plus lourd : $2$ kg ; $950$ g ; $1\\,200$ g ; $500$ g.",
        solution: "$500$ g $< 950$ g $< 1\\,200$ g $< 2$ kg ($2\\,000$ g)."
      }
    }
  ],

  exercices: [
    { type: "e1l-mesurer", titre: "Mesurer et encadrer", etape: "Les longueurs", nb: 5 },
    { type: "e1l-unites", titre: "Unités, conversions et comparaisons", etape: "Longueurs et masses", nb: 8 },
    { type: "e1l-estimer", titre: "Estimer une longueur ou une masse", etape: "Longueurs et masses", nb: 6 }
  ],

  qcm: [
    { question: "Combien mesure le segment ?", figure: "e1l-qcm-regle", choix: ["entre $5$ cm et $6$ cm", "entre $6$ cm et $7$ cm", "exactement $5$ cm", "entre $50$ cm et $60$ cm"], bonne: 0, explication: "Le bout est entre $5$ et $6$." },
    { question: "$1$ m $=$", choix: ["$100$ cm", "$10$ cm", "$1\\,000$ cm", "$1$ cm"], bonne: 0, explication: "Un mètre fait cent centimètres." },
    { question: "$1$ km $=$", choix: ["$1\\,000$ m", "$100$ m", "$10$ m", "$1$ m"], bonne: 0, explication: "Un kilomètre fait mille mètres." },
    { question: "$1$ kg $=$", choix: ["$1\\,000$ g", "$100$ g", "$10$ g", "$1$ g"], bonne: 0, explication: "Un kilogramme fait mille grammes." },
    { question: "$1$ m $+ 25$ cm $=$", choix: ["$125$ cm", "$26$ cm", "$1\\,025$ cm", "$35$ cm"], bonne: 0, explication: "$100 + 25 = 125$ cm." },
    { question: "$4$ m $=$", choix: ["$400$ cm", "$40$ cm", "$4\\,000$ cm", "$104$ cm"], bonne: 0, explication: "$4 \\times 100 = 400$." },
    { question: "La distance entre deux villes se mesure en :", choix: ["km", "cm", "g", "kg"], bonne: 0, explication: "Les grandes distances : kilomètres." },
    { question: "La masse d'un sac de riz se mesure en :", choix: ["kg", "g", "km", "cm"], bonne: 0, explication: "Objet lourd : kilogrammes." },
    { question: "La masse d'une gomme est d'environ :", choix: ["$20$ g", "$20$ kg", "$2$ kg", "$200$ kg"], bonne: 0, explication: "Une gomme est très légère." },
    { question: "La plus lourde est :", choix: ["$2$ kg", "$1\\,500$ g", "$900$ g", "$1$ kg"], bonne: 0, explication: "$2$ kg $= 2\\,000$ g." },
    { question: "$800$ g $\\;\\ldots\\;$ $1$ kg", choix: ["$<$", "$>$", "$=$"], bonne: 0, explication: "$1$ kg $= 1\\,000$ g." },
    { question: "$3\\,000$ m $=$", choix: ["$3$ km", "$30$ km", "$300$ km", "$3$ m"], bonne: 0, explication: "$1\\,000$ m $= 1$ km." },
    { question: "Un cocotier mesure environ :", choix: ["$15$ m", "$15$ cm", "$15$ km", "$15$ g"], bonne: 0, explication: "Un grand arbre : quelques mètres." },
    { question: "$500$ g $+ 500$ g $=$", choix: ["$1$ kg", "$1\\,000$ kg", "$10$ kg", "$100$ g"], bonne: 0, explication: "$1\\,000$ g $= 1$ kg." },
    { question: "Pour mesurer la longueur d'un cahier, on utilise :", choix: ["le centimètre", "le kilomètre", "le kilogramme", "le gramme"], bonne: 0, explication: "Une petite longueur." },
    { question: "$250$ cm $=$", choix: ["$2$ m et $50$ cm", "$25$ m", "$2$ m et $5$ cm", "$250$ m"], bonne: 0, explication: "$200$ cm $= 2$ m, il reste $50$ cm." },
    { question: "Un paquet de sucre pèse environ :", choix: ["$1$ kg", "$1$ g", "$10$ kg", "$100$ kg"], bonne: 0, explication: "C'est une masse de référence." },
    { question: "Le symbole du kilomètre est :", choix: ["km", "kg", "k", "m"], bonne: 0, explication: "km pour kilomètre." }
  ],

  methode: [
    {
      titre: "Comparer deux mesures",
      etapes: [
        "Écris les deux mesures dans la même unité (cm, m ou g).",
        "Utilise $1$ m $= 100$ cm, $1$ km $= 1\\,000$ m, $1$ kg $= 1\\,000$ g.",
        "Compare les nombres."
      ],
      exemple: "$1$ kg et $950$ g : $1\\,000$ g $> 950$ g."
    }
  ],
  erreurs: [
    "Comparer $1$ kg et $800$ g sans convertir et croire que $800$ g est plus lourd.",
    "Croire que $1$ m $= 10$ cm.",
    "Commencer à mesurer au $1$ de la règle.",
    "Choisir le km pour mesurer un objet de la classe."
  ]
};
