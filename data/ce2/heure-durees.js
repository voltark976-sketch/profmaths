/*
  CHAPITRE : CE2 — L'heure et les durées
  ---------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE2 : lire l'heure sur une horloge à aiguilles (heures et minutes) ;
  positionner les aiguilles ; comparer et mesurer des durées entre deux instants d'une même journée ; résoudre des problèmes
  à une ou deux étapes impliquant des durées.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce2-heure-durees"] = {
  niveau: "CE2",
  numero: 12,
  titre: "L'heure et les durées",
  accroche: "Lire l'heure à la minute près et calculer des durées.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Lire l'heure à la minute",
      video: { titre: "Vidéo de Maître Lucas : lire les heures, moins le quart, moins dix…", youtube: "https://youtu.be/Nih5-36Vzrw" },
      texte:
        "La grande aiguille parcourt $60$ petites graduations en une heure : chaque petite graduation vaut **$1$ minute**, chaque nombre vaut **$5$ minutes** de plus.\n\n" +
        "Sur l'horloge, la grande aiguille est $2$ graduations après le $7$ : $35 + 2 = 37$ minutes. Il est $10$ h $37$.",
      figure: "e2h-cours-horloge",
      exemple: { enonce: "La grande aiguille est sur le $4$. Combien de minutes ?", solution: "$4 \\times 5 = 20$ minutes." }
    },
    {
      titre: "Calculer une durée",
      video: { titre: "Vidéo de Maître Lucas : calcul de durée entre deux instants", youtube: "https://youtu.be/oRxu7M1g4qM" },
      texte:
        "On avance depuis l'heure de début :\n\n" +
        "De $14$ h $35$ à $16$ h $10$ : $14$ h $35 \\to 15$ h ($25$ min), $15$ h $\\to 16$ h ($1$ h), $16$ h $\\to 16$ h $10$ ($10$ min).\n\n" +
        "Total : $1$ h $35$ min, soit $95$ minutes.",
      exemple: { enonce: "Un trajet commence à $8$ h $50$ et dure $25$ min. À quelle heure finit-il ?", solution: "$8$ h $50 + 10$ min $= 9$ h, puis $+ 15$ min : $9$ h $15$." }
    }
  ],
  exercices: [
    { type: "e2h-lire", titre: "Lire l'heure", etape: "L'heure", nb: 6 },
    { type: "e2h-durees", titre: "Calculer une durée ou une heure d'arrivée", etape: "Les durées", nb: 6 },
    { type: "e2k-numeration", titre: "Calculs avec des nombres (révision)", etape: "Les durées", nb: 4 }
  ],
  qcm: [
    { question: "Quelle heure indique l'horloge (le matin) ?", figure: "e2h-cours-horloge", choix: ["$10$ h $37$", "$7$ h $50$", "$10$ h $35$", "$11$ h $37$"], bonne: 0, explication: "Petite aiguille entre $10$ et $11$ ; grande : $37$ min." },
    { question: "La grande aiguille sur le $4$ indique :", choix: ["$20$ min", "$4$ min", "$40$ min", "$16$ min"], bonne: 0, explication: "$4 \\times 5$." },
    { question: "La grande aiguille sur le $11$ indique :", choix: ["$55$ min", "$11$ min", "$50$ min", "$110$ min"], bonne: 0, explication: "$11 \\times 5$." },
    { question: "$1$ h $=$", choix: ["$60$ min", "$100$ min", "$30$ min", "$24$ min"], bonne: 0, explication: "Soixante minutes." },
    { question: "De $14$ h $35$ à $16$ h $10$, il s'écoule :", choix: ["$1$ h $35$ min", "$2$ h $25$ min", "$1$ h $75$ min", "$2$ h"], bonne: 0, explication: "$25$ min $+ 1$ h $+ 10$ min." },
    { question: "$8$ h $50$ $+ 25$ min $=$", choix: ["$9$ h $15$", "$8$ h $75$", "$9$ h $25$", "$10$ h $15$"], bonne: 0, explication: "$10$ min jusqu'à $9$ h, puis $15$ min." },
    { question: "$95$ minutes, c'est :", choix: ["$1$ h $35$ min", "$9$ h $5$ min", "$1$ h $95$ min", "$1$ h $5$ min"], bonne: 0, explication: "$60 + 35$." },
    { question: "Un film de $13$ h $45$ à $15$ h $15$ dure :", choix: ["$1$ h $30$ min", "$2$ h $30$ min", "$1$ h $70$ min", "$2$ h"], bonne: 0, explication: "$15$ min $+ 1$ h $+ 15$ min." },
    { question: "« $16$ h $40$ » se dit aussi :", choix: ["cinq heures moins vingt", "quatre heures moins vingt", "six heures quarante", "quatre heures quarante du matin"], bonne: 0, explication: "$16$ h $40$ = $17$ h moins $20$ min." },
    { question: "Il est $11$ h $55$. Dans $10$ minutes, il sera :", choix: ["$12$ h $05$", "$11$ h $65$", "$12$ h $10$", "$11$ h $05$"], bonne: 0, explication: "$5$ min jusqu'à midi, puis $5$ min." },
    { question: "Quelle durée est la plus longue ?", choix: ["$1$ h $40$ min", "$90$ min", "$1$ h", "$75$ min"], bonne: 0, explication: "$100$ min $> 90 > 75 > 60$." },
    { question: "La petite aiguille entre le $3$ et le $4$, la grande sur le $6$. Il est :", choix: ["$3$ h $30$", "$6$ h $15$", "$4$ h $30$", "$3$ h $06$"], bonne: 0, explication: "Trois heures et demie." },
    { question: "Il est $7$ h $45$. Il y a $30$ minutes, il était :", choix: ["$7$ h $15$", "$8$ h $15$", "$7$ h $75$", "$7$ h $30$"], bonne: 0, explication: "$45 - 30 = 15$." },
    { question: "Une graduation de minute vaut :", choix: ["$1$ minute", "$5$ minutes", "$1$ heure", "$10$ minutes"], bonne: 0, explication: "Les petits traits." },
    { question: "De $9$ h à $9$ h $45$, il s'écoule :", choix: ["trois quarts d'heure", "une demi-heure", "un quart d'heure", "une heure"], bonne: 0, explication: "$45$ min." },
    { question: "De $9$ h $20$ à $10$ h $05$, il s'écoule :", choix: ["$45$ min", "$85$ min", "$1$ h $15$ min", "$35$ min"], bonne: 0, explication: "$40$ min jusqu'à $10$ h, puis $5$ min." },
    { question: "Midi et quart s'écrit :", choix: ["$12$ h $15$", "$12$ h $25$", "$0$ h $15$", "$15$ h $12$"], bonne: 0, explication: "Midi, c'est $12$ h ; et quart : $15$ min." },
    { question: "Le cours dure $55$ min et commence à $10$ h $15$. Il finit à :", choix: ["$11$ h $10$", "$10$ h $70$", "$11$ h", "$11$ h $15$"], bonne: 0, explication: "$45$ min jusqu'à $11$ h, puis $10$ min." }
  ],
  methode: [
    { titre: "Calculer une heure d'arrivée", etapes: ["Pars de l'heure de départ.", "Ajoute les minutes jusqu'à l'heure juste suivante.", "Ajoute le reste de la durée."], exemple: "$8$ h $50 + 25$ min : $9$ h, puis $9$ h $15$." }
  ],
  erreurs: ["Compter $100$ minutes dans une heure.", "Écrire « $8$ h $75$ » : au-delà de $59$ minutes, on passe à l'heure suivante.", "Confondre petite et grande aiguille.", "Lire le nombre montré par la grande aiguille au lieu de le multiplier par $5$."]
};
