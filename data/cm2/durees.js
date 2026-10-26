/*
  CHAPITRE : CM2 — Le temps et les durées
  ----------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : lire l'heure sur une horloge à aiguilles (heure, minute,
  seconde) ; système sexagésimal : 1 h = 60 min, 1 min = 60 s ; comparer et mesurer des durées entre deux instants
  (en heures, minutes, secondes) ; problèmes à une ou plusieurs étapes.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-durees"] = {
  niveau: "CM2",
  numero: 13,
  titre: "Le temps et les durées",
  accroche: "Heures, minutes et secondes : convertir et calculer des durées.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Heures, minutes, secondes",
      video: { titre: "Vidéo de Maître Lucas : convertir des mesures de durée", youtube: "https://youtu.be/tVtsBfbthQg" },
      texte:
        "Sur l'horloge, l'aiguille fine (la trotteuse) indique les **secondes**. Ici : $10$ h $10$ min $40$ s.\n\n" +
        "- $1$ min $= 60$ s ; $1$ h $= 60$ min $= 3\\,600$ s.\n" +
        "- On compte par **paquets de $60$** (et pas de $100$) : $2$ min $15$ s $= 120 + 15 = 135$ s.\n" +
        "- $200$ s $= 3 \\times 60 + 20$ s $= 3$ min $20$ s.",
      figure: "m2h-cours-horloge",
      exemple: { enonce: "Combien de secondes dans $4$ min $30$ s ?", solution: "$240 + 30 = 270$ s." }
    },
    {
      titre: "Calculer une durée",
      video: { titre: "Vidéo de Maître Lucas : calcul de durée entre deux instants", youtube: "https://youtu.be/oRxu7M1g4qM" },
      texte:
        "Le magasin ouvre à $7$ h $10$ et ferme à $8$ h $30$ : de $7$ h $10$ à $8$ h, $50$ min ; de $8$ h à $8$ h $30$, $30$ min. Total : $80$ min, soit $1$ h $20$ min.\n\n" +
        "Au 800 m, Kamal court en $2$ min $48$ s et Nasra en $3$ min $05$ s. En secondes : $168$ s et $185$ s. Écart : $17$ s.\n\n" +
        "Pour une heure de fin : $17$ h $05 + 69$ min $= 17$ h $05 + 1$ h $09$ min $= 18$ h $14$.",
      exemple: { enonce: "Un film commence à $20$ h $45$ et dure $1$ h $50$ min. Il finit à ?", solution: "$20$ h $45 + 1$ h $= 21$ h $45$ ; $+ 50$ min $= 22$ h $35$." }
    }
  ],
  exercices: [
    { type: "m2h-convertir", titre: "Convertir des durées", etape: "Convertir", nb: 6 },
    { type: "m2h-durees", titre: "Calculer des durées", etape: "Calculer", nb: 6 },
    { type: "m2r-etapes", titre: "Problèmes (révision)", etape: "Calculer", nb: 3 }
  ],
  qcm: [
    { question: "$1$ min $=$", choix: ["$60$ s", "$100$ s", "$10$ s", "$3\\,600$ s"], bonne: 0, explication: "Une minute, soixante secondes." },
    { question: "$1$ h $=$", choix: ["$3\\,600$ s", "$360$ s", "$6\\,000$ s", "$60$ s"], bonne: 0, explication: "$60 \\times 60$." },
    { question: "$2$ min $15$ s $=$", choix: ["$135$ s", "$215$ s", "$17$ s", "$125$ s"], bonne: 0, explication: "$120 + 15$." },
    { question: "$200$ s $=$", choix: ["$3$ min $20$ s", "$2$ min", "$2$ min $0$ s", "$3$ min $2$ s"], bonne: 0, explication: "$3 \\times 60 = 180$ ; reste $20$." },
    { question: "$4$ min $30$ s $=$", choix: ["$270$ s", "$430$ s", "$34$ s", "$240$ s"], bonne: 0, explication: "$240 + 30$." },
    { question: "De $7$ h $10$ à $8$ h $30$ :", choix: ["$80$ min", "$120$ min", "$70$ min", "$140$ min"], bonne: 0, explication: "$50 + 30$." },
    { question: "$2$ min $48$ s et $3$ min $05$ s : l'écart est de", choix: ["$17$ s", "$57$ s", "$1$ min $43$ s", "$27$ s"], bonne: 0, explication: "$185 - 168$." },
    { question: "$17$ h $05 + 69$ min $=$", choix: ["$18$ h $14$", "$17$ h $74$", "$18$ h $04$", "$18$ h $24$"], bonne: 0, explication: "$69$ min $= 1$ h $09$ min." },
    { question: "Un film de $1$ h $50$ min commence à $20$ h $45$. Il finit à :", choix: ["$22$ h $35$", "$21$ h $95$", "$22$ h $05$", "$21$ h $35$"], bonne: 0, explication: "$21$ h $45$, puis $50$ min." },
    { question: "Combien de secondes dans un quart d'heure ?", choix: ["$900$", "$15$", "$1\\,500$", "$250$"], bonne: 0, explication: "$15 \\times 60$." },
    { question: "Combien de minutes dans une journée ?", choix: ["$1\\,440$", "$2\\,400$", "$240$", "$1\\,000$"], bonne: 0, explication: "$24 \\times 60$." },
    { question: "$90$ s $=$", choix: ["$1$ min $30$ s", "$1$ min $90$ s", "$9$ min", "$1$ min $10$ s"], bonne: 0, explication: "$60 + 30$." },
    { question: "La trotteuse d'une horloge indique :", choix: ["les secondes", "les heures", "les jours", "les minutes"], bonne: 0, explication: "Elle fait un tour par minute." },
    { question: "La trotteuse fait un tour complet en :", choix: ["$1$ minute", "$1$ heure", "$1$ seconde", "$12$ heures"], bonne: 0, explication: "$60$ secondes." },
    { question: "$3$ h $20$ min $=$", choix: ["$200$ min", "$320$ min", "$180$ min", "$23$ min"], bonne: 0, explication: "$180 + 20$." },
    { question: "Un coureur fait le tour du stade en $75$ s. Deux tours prennent :", choix: ["$2$ min $30$ s", "$1$ min $50$ s", "$2$ min $50$ s", "$150$ min"], bonne: 0, explication: "$150$ s $= 120 + 30$." },
    { question: "Pour comparer $2$ min $48$ s et $170$ s, on :", choix: ["convertit tout en secondes", "compare $48$ et $170$", "compare $2$ et $170$", "ne peut pas comparer"], bonne: 0, explication: "$168$ s $< 170$ s." },
    { question: "$1$ h $= 60$ min, donc $0{,}5$ h $=$", choix: ["$30$ min", "$50$ min", "$5$ min", "$15$ min"], bonne: 0, explication: "Une demi-heure." }
  ],
  methode: [
    { titre: "Convertir des secondes en minutes et secondes", etapes: ["Cherche combien de fois $60$ dans le nombre de secondes.", "C'est le nombre de minutes.", "Ce qui reste, ce sont les secondes."], figure: "m2h-cours-horloge", exemple: "$200$ s $= 3 \\times 60 + 20$ → $3$ min $20$ s." }
  ],
  erreurs: ["Compter $100$ secondes dans une minute.", "Écrire $17$ h $74$ au lieu de $18$ h $14$.", "Comparer des durées sans les convertir dans la même unité.", "Confondre la trotteuse et l'aiguille des minutes."]
};
