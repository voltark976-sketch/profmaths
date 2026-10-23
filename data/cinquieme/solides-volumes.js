/*
  CHAPITRE : 5e — Solides et volumes
  -----------------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026, partie
  « Représentation de l'espace » : représentations en perspective cavalière du pavé droit, du cube, du cylindre de
  révolution et du prisme droit ; mettre en relation perspective et patron ; calculer le volume du cube, du pavé
  droit, du prisme droit et du cylindre ; connaitre et convertir les unités usuelles de volume et de capacité.
  (L'aire du disque est au chapitre « Aires ».)
  figure : "so6-pave" (dessin du chapitre de 6e, assets/exercices-college.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-solides-volumes"] = {
  niveau: "5e",
  numero: 17,
  titre: "Solides et volumes",
  accroche: "Dessiner un solide en perspective, construire son patron, calculer le volume d'un pavé, d'un prisme ou d'un cylindre, et convertir litres et m³.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : solides, partie 1 (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Solides5e1.pdf" },
    { titre: "Cours d'Yvan Monka : volumes, partie 2 (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Solides5e2.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : solides (Yvan Monka)", url: "https://youtu.be/TCblUwPAnRc", type: "video" },
    { titre: "Faire le patron d'un prisme (Yvan Monka)", url: "https://youtu.be/W19gAsMX8hk", type: "video" },
    { titre: "Convertir les unités de contenance (Yvan Monka)", url: "https://youtu.be/5SeX-WBitOU", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Perspective cavalière",
      video: { titre: "Vidéo d'Yvan Monka : représenter en perspective un prisme et un cylindre", youtube: "https://youtu.be/Mg3unYhw0aI" },
      texte:
        "La **perspective cavalière** permet de dessiner un solide sur une feuille :\n\n" +
        "- la face avant (et la face arrière) est dessinée **en vraie grandeur** ;\n" +
        "- les arêtes qui partent vers l'arrière sont tracées **en biais**, et plus courtes ;\n" +
        "- des arêtes parallèles restent **parallèles** ;\n" +
        "- les arêtes **cachées** sont en **pointillés**.",
      figure: "so6-pave",
      exemple: {
        enonce: "Sur le dessin du pavé droit, combien d'arêtes sont en pointillés ?",
        solution: "Trois arêtes sont cachées : elles partent du sommet caché, à l'arrière en bas à gauche."
      }
    },
    {
      titre: "Patrons",
      video: { titre: "Vidéo d'Yvan Monka : faire le patron d'un cylindre", youtube: "https://youtu.be/oRIISSBmdoI" },
      texte:
        "Un **patron** est une figure plane qu'on peut plier pour obtenir le solide, sans recouvrement.\n\n" +
        "- Pavé droit : $6$ rectangles, identiques deux à deux.\n" +
        "- Prisme droit : $2$ bases (polygones superposables) et autant de rectangles que la base a de côtés.\n" +
        "- Cylindre : $2$ disques et $1$ rectangle dont la longueur est le **périmètre** du disque de base, $2\\pi r$.",
      exemple: {
        enonce: "Dans le patron d'un cylindre de rayon $3$ cm et de hauteur $5$ cm, quelles sont les dimensions du rectangle ?",
        solution: "Largeur : la hauteur, $5$ cm. Longueur : $2 \\times \\pi \\times 3 = 6\\pi \\approx 18{,}8$ cm."
      }
    },
    {
      titre: "Volumes",
      video: { titre: "Vidéo d'Yvan Monka : calculer le volume d'un prisme", youtube: "https://youtu.be/lsAWODx566E" },
      texte:
        "- Cube d'arête $a$ : $V = a^3$.\n" +
        "- Pavé droit : $V = L \\times \\ell \\times h$.\n" +
        "- Prisme droit : $V = \\text{aire de la base} \\times \\text{hauteur}$.\n" +
        "- Cylindre de rayon $r$ et de hauteur $h$ : $V = \\pi r^2 \\times h$.\n\n" +
        "Le pavé droit et le cylindre sont des cas particuliers : on multiplie toujours l'aire de la base par la hauteur.",
      exemple: {
        enonce: "Calcule le volume d'un cylindre de rayon $4$ cm et de hauteur $10$ cm, arrondi au cm³.",
        solution: "$V = \\pi \\times 4^2 \\times 10 = 160\\pi \\approx 503$ cm³."
      }
    },
    {
      titre: "Unités de volume et de capacité",
      video: { titre: "Vidéo d'Yvan Monka : convertir les unités de volume", youtube: "https://youtu.be/nnXfRWe4WDE" },
      texte:
        "Un cube de $1$ dm d'arête contient $10 \\times 10 \\times 10 = 1\\,000$ cubes de $1$ cm : $1$ dm³ $= 1\\,000$ cm³. Entre deux unités de volume voisines, le facteur est **$1\\,000$**.\n\n" +
        "Capacités : $1$ L $= 1$ dm³ ; $1$ mL $= 1$ cm³ ; $1$ m³ $= 1\\,000$ L. Entre L, dL, cL et mL, le facteur est $10$.",
      exemple: {
        enonce: "Un réservoir contient $2{,}5$ m³ d'eau. Combien de litres ?",
        solution: "$2{,}5$ m³ $= 2\\,500$ dm³ $= 2\\,500$ L."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "sv5-patrons", titre: "Perspective et patrons", etape: "Représenter l'espace", nb: 5 },
    { type: "sv5-volumes", titre: "Calculer un volume", etape: "Volumes", nb: 6 },
    { type: "sv5-conversions", titre: "Volumes et capacités", etape: "Volumes", nb: 6 },
    { type: "sv5-problemes", titre: "Problèmes", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "En perspective cavalière, les arêtes cachées sont :", choix: ["en pointillés", "en gras", "absentes", "en rouge"], bonne: 0, explication: "Convention de la perspective cavalière." },
    { question: "Le patron d'un pavé droit comporte :", choix: ["$6$ rectangles", "$4$ rectangles", "$8$ rectangles", "$6$ triangles"], bonne: 0, explication: "Un pavé a six faces." },
    { question: "Le patron d'un prisme droit à base hexagonale comporte :", choix: ["$2$ hexagones et $6$ rectangles", "$1$ hexagone et $6$ rectangles", "$2$ hexagones et $4$ rectangles", "$6$ hexagones"], bonne: 0, explication: "Une face latérale par côté de la base." },
    { question: "Dans le patron d'un cylindre de rayon $r$, la longueur du rectangle est :", choix: ["$2\\pi r$", "$\\pi r^2$", "$r$", "$2r$"], bonne: 0, explication: "Le périmètre du disque de base." },
    { question: "Le volume d'un cube d'arête $5$ cm est :", choix: ["$125$ cm³", "$25$ cm³", "$15$ cm³", "$150$ cm³"], bonne: 0, explication: "$5^3 = 125$." },
    { question: "Le volume d'un pavé $4 \\times 3 \\times 2$ (en cm) est :", choix: ["$24$ cm³", "$9$ cm³", "$26$ cm³", "$52$ cm³"], bonne: 0, explication: "$4 \\times 3 \\times 2$." },
    { question: "Le volume d'un prisme droit est :", choix: ["aire de la base $\\times$ hauteur", "périmètre de la base $\\times$ hauteur", "aire de la base $\\div 2$", "somme des arêtes"], bonne: 0, explication: "Formule générale." },
    { question: "Un prisme a une base d'aire $12$ cm² et une hauteur de $5$ cm. Son volume est :", choix: ["$60$ cm³", "$17$ cm³", "$30$ cm³", "$120$ cm³"], bonne: 0, explication: "$12 \\times 5$." },
    { question: "Le volume d'un cylindre de rayon $2$ cm et de hauteur $5$ cm est :", choix: ["$20\\pi$ cm³", "$10\\pi$ cm³", "$4\\pi$ cm³", "$100\\pi$ cm³"], bonne: 0, explication: "$\\pi \\times 4 \\times 5$." },
    { question: "$1$ dm³ est égal à :", choix: ["$1\\,000$ cm³", "$100$ cm³", "$10$ cm³", "$10\\,000$ cm³"], bonne: 0, explication: "Facteur $1\\,000$." },
    { question: "$1$ L est égal à :", choix: ["$1$ dm³", "$1$ cm³", "$1$ m³", "$10$ dm³"], bonne: 0, explication: "Par définition." },
    { question: "$3$ m³ représentent :", choix: ["$3\\,000$ L", "$300$ L", "$30$ L", "$30\\,000$ L"], bonne: 0, explication: "$1$ m³ $= 1\\,000$ L." },
    { question: "$250$ mL est égal à :", choix: ["$25$ cL", "$2{,}5$ cL", "$2{,}5$ L", "$250$ cL"], bonne: 0, explication: "$1$ cL $= 10$ mL." },
    { question: "Un aquarium de $50 \\times 30 \\times 40$ cm contient :", choix: ["$60$ L", "$600$ L", "$6$ L", "$120$ L"], bonne: 0, explication: "$60\\,000$ cm³ $= 60$ L." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer un volume",
      etapes: [
        "Repère la base du solide et calcule son aire.",
        "Multiplie par la hauteur.",
        "Vérifie que toutes les longueurs sont dans la même unité ; le volume est en unité³."
      ],
      exemple: "Cylindre $r = 3$, $h = 4$ : $9\\pi \\times 4 = 36\\pi \\approx 113{,}1$ cm³."
    },
    {
      titre: "Convertir un volume",
      etapes: [
        "Volumes : facteur $1\\,000$ entre unités voisines (m³, dm³, cm³, mm³).",
        "Capacités : facteur $10$ (L, dL, cL, mL).",
        "Passerelles : $1$ L $= 1$ dm³ et $1$ mL $= 1$ cm³."
      ],
      exemple: "$4\\,500$ cm³ $= 4{,}5$ dm³ $= 4{,}5$ L."
    },
    {
      titre: "Construire un patron",
      etapes: [
        "Dessine une base, puis les faces latérales accolées à ses côtés.",
        "Place la deuxième base contre une face latérale.",
        "Vérifie les longueurs des arêtes qui se recollent."
      ],
      exemple: "Cylindre : rectangle de longueur $2\\pi r$ et deux disques de rayon $r$."
    }
  ],
  erreurs: [
    "Convertir les volumes avec un facteur $10$ ou $100$ au lieu de $1\\,000$.",
    "Oublier de convertir des cm³ en litres.",
    "Utiliser le périmètre de la base au lieu de son aire.",
    "Confondre l'aire du disque ($\\pi r^2$) et le périmètre ($2\\pi r$).",
    "Oublier que le volume est en unité « cube »."
  ]
};
