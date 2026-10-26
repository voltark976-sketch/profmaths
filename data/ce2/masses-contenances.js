/*
  CHAPITRE : CE2 — Masses et contenances
  ---------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE2 : masses en g, kg, t (1 kg = 1 000 g ; 1 t = 1 000 kg) ; choisir l'unité ;
  comparer, estimer ; contenances : comparer, L, dL, cL (1 L = 10 dL = 100 cL).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce2-masses-contenances"] = {
  niveau: "CE2",
  numero: 10,
  titre: "Masses et contenances",
  accroche: "Grammes, kilogrammes, tonnes ; litres, décilitres, centilitres.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Les masses",
      video: { titre: "Vidéo de Maître Lucas : connaître et utiliser les unités de masse", youtube: "https://youtu.be/731NIh-d3h4" },
      texte:
        "- $1$ kg $= 1\\,000$ g.\n" +
        "- $1$ **tonne** (t) $= 1\\,000$ kg : pour les objets très lourds (un camion, un éléphant).\n\n" +
        "Pour comparer, on écrit toutes les masses dans la même unité.",
      exemple: { enonce: "Range : $1$ kg ; $950$ g ; $1\\,500$ g.", solution: "$950$ g $< 1$ kg ($1\\,000$ g) $< 1\\,500$ g." }
    },
    {
      titre: "Les contenances",
      video: { titre: "Vidéo de Maître Lucas : litre, décilitre, centilitre", youtube: "https://youtu.be/oqR9IbmyrME" },
      texte:
        "La **contenance**, c'est la quantité de liquide qu'un récipient peut contenir.\n\n" +
        "- Le **litre** (L) : une bouteille d'eau contient $1$ L ou $1{,}5$ L.\n" +
        "- $1$ L $= 10$ dL $= 100$ cL.\n" +
        "- Un verre contient environ $20$ cL ; une cuillère à soupe environ $1$ cL.",
      exemple: { enonce: "Combien de verres de $25$ cL peut-on remplir avec $1$ L ?", solution: "$1$ L $= 100$ cL ; $4 \\times 25 = 100$ : $4$ verres." }
    }
  ],
  exercices: [
    { type: "e2p-conversions", titre: "Unités et conversions", etape: "Masses et contenances", nb: 6 },
    { type: "e2p-comparer", titre: "Comparer des masses et des contenances", etape: "Masses et contenances", nb: 5 },
    { type: "e2r-partage", titre: "Partager des quantités", etape: "Problèmes", nb: 5 }
  ],
  qcm: [
    { question: "$1$ kg $=$", choix: ["$1\\,000$ g", "$100$ g", "$10$ g", "$10\\,000$ g"], bonne: 0, explication: "Mille grammes." },
    { question: "$1$ t $=$", choix: ["$1\\,000$ kg", "$100$ kg", "$10$ kg", "$1\\,000$ g"], bonne: 0, explication: "Une tonne fait mille kilogrammes." },
    { question: "$1$ L $=$", choix: ["$100$ cL", "$10$ cL", "$1\\,000$ cL", "$100$ dL"], bonne: 0, explication: "$1$ L $= 100$ cL." },
    { question: "$1$ L, c'est combien de décilitres ?", choix: ["$10$ dL", "$100$ dL", "$1$ dL", "$1\\,000$ dL"], bonne: 0, explication: "$1$ L $= 10$ dL." },
    { question: "La masse d'un camion s'exprime en :", choix: ["t", "g", "cL", "mm"], bonne: 0, explication: "Très lourd : tonnes." },
    { question: "La contenance d'un verre est d'environ :", choix: ["$20$ cL", "$20$ L", "$2$ cL", "$200$ L"], bonne: 0, explication: "Un verre : un cinquième de litre." },
    { question: "$3$ kg $=$", choix: ["$3\\,000$ g", "$300$ g", "$30$ g", "$3$ g"], bonne: 0, explication: "$3 \\times 1\\,000$." },
    { question: "$5$ L $=$", choix: ["$500$ cL", "$50$ cL", "$5\\,000$ cL", "$5$ cL"], bonne: 0, explication: "$5 \\times 100$." },
    { question: "La plus lourde :", choix: ["$2$ kg", "$1\\,500$ g", "$950$ g", "$800$ g"], bonne: 0, explication: "$2\\,000$ g." },
    { question: "La plus grande contenance :", choix: ["$2$ L", "$150$ cL", "$8$ dL", "$50$ cL"], bonne: 0, explication: "$200$ cL." },
    { question: "$50$ cL $+ 50$ cL $=$", choix: ["$1$ L", "$100$ L", "$10$ L", "$1$ dL"], bonne: 0, explication: "$100$ cL $= 1$ L." },
    { question: "La contenance d'une baignoire s'exprime en :", choix: ["L", "cL", "g", "t"], bonne: 0, explication: "Beaucoup de litres." },
    { question: "Combien de verres de $25$ cL dans $1$ L ?", choix: ["$4$", "$25$", "$10$", "$2$"], bonne: 0, explication: "$4 \\times 25 = 100$ cL." },
    { question: "$2\\,000$ kg $=$", choix: ["$2$ t", "$20$ t", "$200$ t", "$2$ g"], bonne: 0, explication: "$1\\,000$ kg $= 1$ t." },
    { question: "$3$ dL $=$", choix: ["$30$ cL", "$3$ cL", "$300$ cL", "$3$ L"], bonne: 0, explication: "$1$ dL $= 10$ cL." },
    { question: "Une pomme pèse environ :", choix: ["$150$ g", "$150$ kg", "$15$ t", "$1{,}5$ g"], bonne: 0, explication: "Un peu plus de cent grammes." },
    { question: "La contenance, c'est :", choix: ["la quantité de liquide contenue", "le poids", "la longueur", "le prix"], bonne: 0, explication: "Ce que le récipient peut contenir." },
    { question: "$1$ kg $\\;\\ldots\\;$ $999$ g", choix: ["$>$", "$<$", "$=$"], bonne: 0, explication: "$1\\,000$ g $> 999$ g." }
  ],
  methode: [
    { titre: "Comparer des mesures", etapes: ["Choisis une unité commune (g pour les masses, cL pour les contenances).", "Convertis : $1$ kg $= 1\\,000$ g ; $1$ L $= 100$ cL ; $1$ dL $= 10$ cL.", "Compare les nombres."], exemple: "$8$ dL $= 80$ cL $< 1$ L $= 100$ cL." }
  ],
  erreurs: ["Croire que $1$ L $= 10$ cL.", "Comparer sans convertir.", "Confondre masse (g, kg) et contenance (L, cL).", "Oublier que $1$ t $= 1\\,000$ kg."]
};
