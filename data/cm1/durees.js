/*
  CHAPITRE : CM1 — Le temps et les durées
  ----------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : lire l'heure (matin, après-midi) ; unités de durée (s, min,
  h, jour, semaine, mois, année, siècle, millénaire) et leurs relations ; convertir ; calculer une durée, un instant
  de début ou de fin ; problèmes.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-durees"] = {
  niveau: "CM1",
  numero: 13,
  titre: "Le temps et les durées",
  accroche: "Lire l'heure, convertir des durées et calculer combien de temps dure un trajet.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Heures et unités de durée",
      video: { titre: "Vidéo de Maître Lucas : convertir des mesures de durée", youtube: "https://youtu.be/tVtsBfbthQg" },
      texte:
        "Sur une horloge à aiguilles, la même position indique une heure du **matin** ou de l'**après-midi** : $8$ h $40$ ou $20$ h $40$ (on ajoute $12$).\n\n" +
        "- $1$ min $= 60$ s ; $1$ h $= 60$ min ; $1$ jour $= 24$ h ; $1$ semaine $= 7$ jours.\n" +
        "- $1$ an $= 12$ mois $= 365$ jours ($366$ les années bissextiles).\n" +
        "- $1$ siècle $= 100$ ans ; $1$ millénaire $= 1\\,000$ ans. L'année $2026$ est dans le $21$e siècle.\n\n" +
        "Attention : $1$ h $= 60$ min, **pas $100$** ! $2$ h $15$ min $= 120 + 15 = 135$ min.",
      figure: "m1h-cours-horloge",
      exemple: { enonce: "Combien de minutes dans $1$ h $10$ min ?", solution: "$60 + 10 = 70$ min." }
    },
    {
      titre: "Calculer une durée",
      video: { titre: "Vidéo de Maître Lucas : calcul de durée entre deux instants", youtube: "https://youtu.be/oRxu7M1g4qM" },
      texte:
        "Nasra part de Bandrélé à $13$ h $45$ et arrive à Mamoudzou à $14$ h $30$. Combien de temps a duré le trajet ?\n\n" +
        "On avance par **bonds** jusqu'aux heures justes :\n\n" +
        "- de $13$ h $45$ à $14$ h : $15$ min ;\n" +
        "- de $14$ h à $14$ h $30$ : $30$ min.\n\n" +
        "Total : $15 + 30 = 45$ min.\n\n" +
        "Pour trouver une **heure d'arrivée**, on ajoute la durée : $15$ h $50 + 30$ min $= 16$ h $20$.",
      exemple: { enonce: "Un film commence à $20$ h $15$ et dure $1$ h $50$. À quelle heure finit-il ?", solution: "$20$ h $15 + 1$ h $= 21$ h $15$ ; $+ 45$ min $= 22$ h ; $+ 5$ min $= 22$ h $05$." }
    }
  ],
  exercices: [
    { type: "m1h-lire", titre: "Lire l'heure", etape: "L'heure", nb: 5 },
    { type: "m1h-convertir", titre: "Unités de durée", etape: "Convertir", nb: 6 },
    { type: "m1h-durees", titre: "Calculer des durées", etape: "Durées", nb: 6 }
  ],
  qcm: [
    { question: "$1$ h $=$", choix: ["$60$ min", "$100$ min", "$24$ min", "$30$ min"], bonne: 0, explication: "Une heure, $60$ minutes." },
    { question: "$1$ min $=$", choix: ["$60$ s", "$100$ s", "$10$ s", "$1\\,000$ s"], bonne: 0, explication: "Une minute, $60$ secondes." },
    { question: "$2$ h $15$ min $=$", choix: ["$135$ min", "$215$ min", "$17$ min", "$125$ min"], bonne: 0, explication: "$120 + 15$." },
    { question: "$1$ siècle $=$", choix: ["$100$ ans", "$10$ ans", "$1\\,000$ ans", "$12$ ans"], bonne: 0, explication: "Un siècle dure cent ans." },
    { question: "L'année $2026$ est dans le :", choix: ["$21$e siècle", "$20$e siècle", "$22$e siècle", "$202$e siècle"], bonne: 0, explication: "Le $21$e siècle va de $2001$ à $2100$." },
    { question: "Combien de jours dans $3$ semaines ?", choix: ["$21$", "$30$", "$18$", "$10$"], bonne: 0, explication: "$3 \\times 7$." },
    { question: "L'après-midi, l'horloge indique $3$ h $20$. Il est :", choix: ["$15$ h $20$", "$3$ h $20$", "$13$ h $20$", "$15$ h $04$"], bonne: 0, explication: "On ajoute $12$ : $3 + 12 = 15$." },
    { question: "De $13$ h $45$ à $14$ h $30$, il s'écoule :", choix: ["$45$ min", "$85$ min", "$1$ h $15$", "$55$ min"], bonne: 0, explication: "$15$ min $+ 30$ min." },
    { question: "$15$ h $50 + 30$ min $=$", choix: ["$16$ h $20$", "$15$ h $80$", "$16$ h $80$", "$15$ h $20$"], bonne: 0, explication: "$10$ min pour $16$ h, puis $20$ min." },
    { question: "Un film commence à $20$ h $15$ et dure $1$ h $50$. Il finit à :", choix: ["$22$ h $05$", "$21$ h $65$", "$21$ h $05$", "$22$ h $15$"], bonne: 0, explication: "$20$ h $15 + 1$ h $50 = 22$ h $05$." },
    { question: "Combien d'heures dans une journée ?", choix: ["$24$", "$12$", "$60$", "$100$"], bonne: 0, explication: "Un jour, $24$ heures." },
    { question: "Un quart d'heure, c'est :", choix: ["$15$ min", "$25$ min", "$4$ min", "$45$ min"], bonne: 0, explication: "$60 \\div 4$." },
    { question: "Trois quarts d'heure, c'est :", choix: ["$45$ min", "$34$ min", "$75$ min", "$30$ min"], bonne: 0, explication: "$3 \\times 15$." },
    { question: "$90$ min $=$", choix: ["$1$ h $30$ min", "$1$ h $90$ min", "$9$ h", "$1$ h $10$ min"], bonne: 0, explication: "$60 + 30$." },
    { question: "Une année bissextile a :", choix: ["$366$ jours", "$365$ jours", "$360$ jours", "$400$ jours"], bonne: 0, explication: "Un jour de plus : le $29$ février." },
    { question: "Pour mesurer la durée d'une course de $100$ m, on utilise :", choix: ["les secondes", "les heures", "les jours", "les siècles"], bonne: 0, explication: "C'est très court." },
    { question: "Kamal se couche à $21$ h $30$ et se lève à $6$ h $30$. Il dort :", choix: ["$9$ h", "$15$ h", "$8$ h", "$27$ h"], bonne: 0, explication: "$2$ h $30$ jusqu'à minuit, puis $6$ h $30$." },
    { question: "Un millénaire, c'est :", choix: ["$1\\,000$ ans", "$100$ ans", "$10$ siècles et $1$ an", "$1\\,000$ jours"], bonne: 0, explication: "Mille ans, soit $10$ siècles." }
  ],
  methode: [
    { titre: "Calculer une durée entre deux heures", etapes: ["Avance de l'heure de départ jusqu'à l'heure juste suivante.", "Ajoute les heures entières.", "Ajoute les minutes jusqu'à l'heure d'arrivée.", "Additionne les bonds ; convertis si tu dépasses $60$ min."], exemple: "$13$ h $45 \\to 14$ h ($15$ min) $\\to 14$ h $30$ ($30$ min) : $45$ min." }
  ],
  erreurs: ["Compter $100$ minutes dans une heure.", "Écrire $15$ h $80$ au lieu de $16$ h $20$.", "Oublier que l'horloge indique aussi les heures de l'après-midi.", "Se tromper de siècle : $2026$ est au $21$e siècle, pas au $20$e."]
};
