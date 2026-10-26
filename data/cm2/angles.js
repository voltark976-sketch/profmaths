/*
  CHAPITRE : CM2 — Les angles
  ----------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : lexique et notations des angles ; comparer des angles ;
  construire un angle égal à la somme de deux angles ou multiple d'un angle donné ; construire par pliage la moitié d'un
  angle ; savoir qu'un angle droit mesure 90°. Le degré est introduit à partir de l'angle droit ; pas de rapporteur au
  CM2 ; uniquement des angles saillants (moins de 180°).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-angles"] = {
  niveau: "CM2",
  numero: 12,
  titre: "Les angles",
  accroche: "L'angle droit mesure 90° : ajouter, reporter et plier des angles.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Le degré",
      video: { titre: "Vidéo d'Yvan Monka : comparer les angles à l'aide d'un gabarit", youtube: "https://youtu.be/hIxRxxW3EJU" },
      texte:
        "Un **angle droit** mesure $90$ **degrés** : on écrit $90°$.\n\n" +
        "- En pliant un angle droit en deux, on obtient deux angles de $45°$.\n" +
        "- En le partageant en trois angles égaux : $30°$ chacun.\n" +
        "- Un angle **aigu** mesure moins de $90°$ ; un angle **obtus** plus de $90°$ (et moins de $180°$).\n\n" +
        "On note un angle avec trois lettres, le sommet au milieu : $\\widehat{ABC}$.",
      figure: "m2g-cours-angles",
      exemple: { enonce: "Un angle droit est partagé en deux angles ; l'un mesure $35°$. L'autre ?", solution: "$90° - 35° = 55°$." }
    },
    {
      titre: "Ajouter, reporter, partager",
      texte:
        "- **Somme** : en plaçant côte à côte (même sommet, un côté commun) un angle de $50°$ et un angle de $70°$, on obtient un angle de $120°$.\n" +
        "- **Multiple** : en reportant $3$ fois un angle de $25°$ avec un gabarit, on obtient $75°$.\n" +
        "- **Moitié** : en pliant un angle de $70°$ pour superposer ses côtés, le pli le partage en deux angles de $35°$.\n\n" +
        "Sans rapporteur, on utilise des **gabarits** (papier calque, angles découpés) et le **pliage**.",
      exemple: { enonce: "Combien d'angles de $30°$ faut-il reporter pour obtenir un angle droit ?", solution: "$3$, car $3 \\times 30° = 90°$." }
    }
  ],
  exercices: [
    { type: "m2g-classer", titre: "Nommer et classer les angles", etape: "Le degré", nb: 5 },
    { type: "m2g-degres", titre: "Calculer avec les degrés", etape: "Calculer", nb: 6 },
    { type: "m2g-figures", titre: "Angles et figures", etape: "Calculer", nb: 4 }
  ],
  qcm: [
    { question: "Un angle droit mesure :", choix: ["$90°$", "$100°$", "$180°$", "$45°$"], bonne: 0, explication: "C'est la référence." },
    { question: "La moitié d'un angle droit mesure :", choix: ["$45°$", "$90°$", "$50°$", "$30°$"], bonne: 0, explication: "$90 \\div 2$." },
    { question: "Un angle de $120°$ est :", choix: ["obtus", "aigu", "droit", "plat"], bonne: 0, explication: "Plus de $90°$." },
    { question: "Un angle de $35°$ est :", choix: ["aigu", "obtus", "droit", "plat"], bonne: 0, explication: "Moins de $90°$." },
    { question: "$50°$ et $70°$ côte à côte forment un angle de :", choix: ["$120°$", "$20°$", "$110°$", "$3\\,500°$"], bonne: 0, explication: "$50 + 70$." },
    { question: "On reporte $3$ fois un angle de $25°$. On obtient :", choix: ["$75°$", "$28°$", "$50°$", "$100°$"], bonne: 0, explication: "$3 \\times 25$." },
    { question: "En pliant un angle de $70°$ en deux :", choix: ["$35°$", "$140°$", "$70°$", "$20°$"], bonne: 0, explication: "Le pli donne la moitié." },
    { question: "Un angle droit est partagé en $35°$ et :", choix: ["$55°$", "$65°$", "$145°$", "$45°$"], bonne: 0, explication: "$90 - 35$." },
    { question: "Un angle droit partagé en $3$ angles égaux : chacun mesure", choix: ["$30°$", "$270°$", "$87°$", "$33°$"], bonne: 0, explication: "$90 \\div 3$." },
    { question: "Dans $\\widehat{RST}$, le sommet est :", choix: ["S", "R", "T", "on ne sait pas"], bonne: 0, explication: "La lettre du milieu." },
    { question: "Au CM2, pour comparer des angles sans rapporteur, on utilise :", choix: ["un gabarit ou le pliage", "une balance", "un thermomètre", "la règle seulement"], bonne: 0, explication: "On superpose les angles." },
    { question: "Dans un triangle rectangle, l'angle droit mesure :", choix: ["$90°$", "$60°$", "$180°$", "$45°$"], bonne: 0, explication: "Un angle droit mesure toujours $90°$." },
    { question: "Un triangle équilatéral a trois angles de $60°$. Deux de ces angles côte à côte font :", choix: ["$120°$", "$60°$", "$90°$", "$180°$"], bonne: 0, explication: "$60 + 60$." },
    { question: "Combien d'angles de $15°$ pour faire $90°$ ?", choix: ["$6$", "$5$", "$75$", "$9$"], bonne: 0, explication: "$90 \\div 15$." },
    { question: "Les aiguilles d'une horloge à $3$ h forment un angle de :", choix: ["$90°$", "$30°$", "$45°$", "$180°$"], bonne: 0, explication: "Un quart de tour." },
    { question: "Les aiguilles à $1$ h forment un angle de :", choix: ["$30°$", "$10°$", "$60°$", "$90°$"], bonne: 0, explication: "$90° \\div 3$ : une heure sur trois du quart de tour." },
    { question: "Les aiguilles à $2$ h forment un angle de :", choix: ["$60°$", "$20°$", "$30°$", "$120°$"], bonne: 0, explication: "$2 \\times 30°$." },
    { question: "Un angle de $90°$ plus un angle de $45°$ font :", choix: ["$135°$", "$45°$", "$125°$", "$180°$"], bonne: 0, explication: "C'est un angle obtus." }
  ],
  methode: [
    { titre: "Trouver un angle sans rapporteur", etapes: ["Repère un angle connu : l'angle droit ($90°$).", "Ajoute, retranche, multiplie ou partage à partir de lui.", "Vérifie avec un gabarit ou par pliage."], figure: "m2g-cours-angles", exemple: "$90° - 35° = 55°$ ; $90° \\div 2 = 45°$." }
  ],
  erreurs: ["Croire qu'un angle droit mesure $100°$.", "Croire qu'un angle aux côtés plus longs est plus grand.", "Doubler au lieu de prendre la moitié en pliant.", "Mettre la lettre du sommet au début du nom."]
};
