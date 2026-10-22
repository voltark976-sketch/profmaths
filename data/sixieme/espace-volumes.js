/*
  CHAPITRE : 6e — Solides, vision dans l'espace et volumes
  ----------------------------------------------------------
  Programme de mathématiques du cycle 3 (BO n° 16 du 17 avril 2025), en vigueur en 6e depuis la rentrée 2025 :
  « La vision dans l'espace » : identifier pyramides, boules, cubes, cylindres, pavés, cônes, prismes droits
  (automatisme) ; voir dans l'espace des assemblages de cubes (passer du solide à ses représentations planes,
  dénombrer). « Les volumes » : connaître l'unité centimètre cube ; comparer des volumes ; déterminer un volume.
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js.
  figure : "so6-assemblage" ou "so6-pave" (assets/exercices-college.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["sixieme-espace-volumes"] = {
  niveau: "6e",
  numero: 14,
  titre: "Solides, vision dans l'espace et volumes",
  accroche: "Reconnaître les solides, compter faces, arêtes et sommets, voir un assemblage de cubes sous tous les angles et mesurer son volume.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : solides et volumes (PDF)", url: "https://www.maths-et-tiques.fr/telech/25Para_Cube.pdf" }
  ],
  liens: [
    { titre: "Tout le cours en vidéo (Yvan Monka)", url: "https://youtu.be/18rPxmBBG-8", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Les solides usuels",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître un solide et ses éléments", youtube: "https://youtu.be/9SlR8ANDL1w" },
      texte:
        "- **Cube** : $6$ faces carrées identiques.\n" +
        "- **Pavé droit** : $6$ faces rectangulaires (une boîte à chaussures).\n" +
        "- **Prisme droit** : deux bases polygonales identiques et parallèles, reliées par des faces rectangulaires.\n" +
        "- **Pyramide** : une base polygonale et des faces triangulaires qui se rejoignent en un sommet.\n" +
        "- **Cylindre** : deux bases en forme de disque, reliées par une face courbe (une boîte de conserve).\n" +
        "- **Cône** : une base en forme de disque et une face courbe qui se termine en pointe.\n" +
        "- **Boule** : tous les points de sa surface sont à la même distance de son centre.\n\n" +
        "En perspective, les arêtes cachées sont dessinées **en pointillés**.",
      figure: "so6-pave",
      exemple: {
        enonce: "Une boîte de lait concentré, un dé à jouer, une glace en cornet : quels solides ?",
        solution: "La boîte : un cylindre. Le dé : un cube. Le cornet : un cône."
      }
    },
    {
      titre: "Faces, arêtes et sommets",
      video: { titre: "Vidéo d'Yvan Monka : dessiner en perspective", youtube: "https://youtu.be/i7PtsYJhs6g" },
      texte:
        "- Une **face** est une surface plane du solide.\n" +
        "- Une **arête** est un segment où deux faces se rejoignent.\n" +
        "- Un **sommet** est un point où plusieurs arêtes se rejoignent.\n\n" +
        "Un pavé droit (et un cube) a $6$ faces, $12$ arêtes et $8$ sommets.\n\n" +
        "Un prisme dont la base a $n$ côtés a $n + 2$ faces, $2 \\times n$ sommets et $3 \\times n$ arêtes. Une pyramide dont la base a $n$ côtés a $n + 1$ faces, $n + 1$ sommets et $2 \\times n$ arêtes.",
      exemple: {
        enonce: "Combien d'arêtes a une pyramide à base carrée ?",
        solution: "$4$ arêtes pour la base carrée, et $4$ arêtes qui montent jusqu'au sommet : $8$ arêtes."
      }
    },
    {
      titre: "Voir un assemblage de cubes",
      video: { titre: "Vidéo d'Yvan Monka : représenter différentes vues d'un assemblage de cubes", youtube: "https://youtu.be/PzQj84LSTrE" },
      texte:
        "Un assemblage de cubes dessiné en perspective montre trois sortes de faces : le dessus, la face de gauche et la face de droite.\n\n" +
        "- Pour **compter** les cubes, on compte **colonne par colonne** : une colonne de $3$ cubes ne montre que son cube du dessus, mais elle en contient $3$.\n" +
        "- **Vue de dessus** : chaque colonne se voit comme un seul carré.\n" +
        "- **Vue de face** ou **de côté** : chaque rangée se voit comme une colonne de carrés, aussi haute que sa colonne la plus haute ; les cubes cachés derrière ne se voient pas.",
      figure: "so6-assemblage",
      exemple: {
        enonce: "Combien de cubes forment l'assemblage de la figure ? Combien de carrés voit-on de dessus ?",
        solution: "Colonnes de $2$, $1$, $1$, $1$ et $1$ cubes : $6$ cubes en tout.\n\nDe dessus, on voit $5$ carrés (un par colonne)."
      }
    },
    {
      titre: "Le volume et le centimètre cube",
      video: { titre: "Vidéo d'Yvan Monka : calculer le volume d'un assemblage de cubes", youtube: "https://youtu.be/hQsUbBJfubA" },
      texte:
        "Le **volume** d'un solide mesure la place qu'il occupe dans l'espace.\n\n" +
        "Le **centimètre cube** (cm³) est le volume d'un cube de $1$ cm d'arête.\n\n" +
        "Un assemblage de $12$ cubes de $1$ cm d'arête a un volume de $12$ cm³.\n\n" +
        "Pour un pavé construit avec des cubes, on compte une **couche** (rangées $\\times$ cubes par rangée), puis on multiplie par le nombre de couches.\n\n" +
        "Deux solides de formes différentes peuvent avoir le même volume.",
      exemple: {
        enonce: "Un pavé fait de cubes de $1$ cm³ mesure $5$ cubes de long, $3$ de large et $4$ couches. Quel est son volume ?",
        solution: "Une couche : $5 \\times 3 = 15$ cubes. $4$ couches : $15 \\times 4 = 60$ cubes, soit $60$ cm³."
      }
    }
  ],

  videosNote: "Méthodes expliquées par Yvan Monka (maths-et-tiques).",
  videos: [
    { titre: "Fabriquer un patron d'un pavé droit", type: "Patron", youtube: "https://youtu.be/WhwYCIcA220" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "so6-reconnaitre", titre: "Reconnaître un solide", etape: "Les solides", nb: 5 },
    { type: "so6-elements", titre: "Faces, arêtes et sommets", etape: "Les solides", nb: 6 },
    { type: "so6-compter", titre: "Compter les cubes d'un assemblage", etape: "Assemblages et volumes", nb: 6 },
    { type: "so6-vues", titre: "Vue de dessus, vue de côté", etape: "Assemblages et volumes", nb: 5 },
    { type: "so6-volume", titre: "Calculer et comparer des volumes", etape: "Assemblages et volumes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Un dé à jouer a la forme :", choix: ["d'un cube", "d'un pavé droit non cubique", "d'une pyramide", "d'un cylindre"], bonne: 0, explication: "$6$ faces carrées identiques." },
    { question: "Une boîte de conserve a la forme :", choix: ["d'un cylindre", "d'un cône", "d'un prisme", "d'une boule"], bonne: 0, explication: "Deux disques reliés par une face courbe." },
    { question: "Le solide dessiné est :", figure: "so6-pave", choix: ["un pavé droit", "un cube", "une pyramide", "un cylindre"], bonne: 0, explication: "Des faces rectangulaires, et elles ne sont pas toutes carrées." },
    { question: "Un pavé droit a combien d'arêtes ?", choix: ["$12$", "$6$", "$8$", "$4$"], bonne: 0, explication: "$4$ arêtes en haut, $4$ en bas, $4$ verticales." },
    { question: "Un cube a combien de sommets ?", choix: ["$8$", "$6$", "$12$", "$4$"], bonne: 0, explication: "$4$ en haut et $4$ en bas." },
    { question: "Une pyramide à base carrée a combien de faces ?", choix: ["$5$", "$4$", "$6$", "$8$"], bonne: 0, explication: "La base carrée et $4$ faces triangulaires." },
    { question: "Un prisme droit à base triangulaire a combien d'arêtes ?", choix: ["$9$", "$6$", "$12$", "$5$"], bonne: 0, explication: "$3$ par base ($6$) et $3$ arêtes latérales." },
    { question: "Sur un dessin en perspective, les arêtes cachées sont tracées :", choix: ["en pointillés", "en rouge", "plus épaisses", "elles ne sont pas tracées"], bonne: 0, explication: "Les pointillés indiquent ce qu'on ne voit pas." },
    { question: "Combien de cubes forment l'assemblage ?", figure: "so6-assemblage", choix: ["$6$", "$5$", "$4$", "$7$"], bonne: 0, explication: "Une colonne de $2$ cubes et quatre colonnes de $1$ cube : $6$ cubes." },
    { question: "Vu de dessus, l'assemblage montre :", figure: "so6-assemblage", choix: ["$5$ carrés", "$6$ carrés", "$3$ carrés", "$2$ carrés"], bonne: 0, explication: "Un carré par colonne : $5$ colonnes." },
    { question: "$1$ cm³ est :", choix: ["le volume d'un cube de $1$ cm d'arête", "l'aire d'un carré de $1$ cm de côté", "la longueur de $1$ cm", "le volume d'un litre"], bonne: 0, explication: "Le centimètre cube mesure un volume." },
    { question: "Un pavé de cubes de $1$ cm³ : $5$ de long, $3$ de large, $4$ couches. Son volume est :", choix: ["$60$ cm³", "$12$ cm³", "$15$ cm³", "$47$ cm³"], bonne: 0, explication: "$5 \\times 3 = 15$ cubes par couche, $\\times 4$ couches $= 60$." },
    { question: "Deux assemblages de $8$ cubes identiques de formes différentes ont :", choix: ["le même volume", "des volumes différents", "toujours la même forme", "le même nombre de carrés vus de dessus"], bonne: 0, explication: "Le volume ne dépend que du nombre de cubes." },
    { question: "Une glace en cornet a la forme :", choix: ["d'un cône", "d'une pyramide", "d'un cylindre", "d'un prisme"], bonne: 0, explication: "Une base en disque et une pointe." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Reconnaître un solide",
      etapes: [
        "Regarde la forme des faces : carrés, rectangles, triangles, disques ?",
        "Deux bases identiques et parallèles : prisme ou cylindre. Une pointe : pyramide ou cône.",
        "Une face courbe : cylindre, cône ou boule."
      ],
      exemple: "Deux disques et une face courbe : un cylindre."
    },
    {
      titre: "Compter les cubes d'un assemblage",
      etapes: [
        "Repère chaque colonne de cubes.",
        "Pour chaque colonne, compte combien de cubes sont empilés (même ceux qu'on ne voit pas).",
        "Additionne : c'est le nombre de cubes, donc le volume en cubes."
      ],
      exemple: "Colonnes de $3$, $2$ et $1$ cubes : $6$ cubes."
    },
    {
      titre: "Trouver une vue",
      etapes: [
        "Place-toi en imagination à la place de l'observateur.",
        "De dessus : un carré par colonne.",
        "De face ou de côté : pour chaque rangée, la hauteur de la colonne la plus haute."
      ],
      exemple: "Une rangée avec des colonnes de $1$, $3$ et $2$ cubes se voit de face comme $3$ carrés empilés."
    },
    {
      titre: "Calculer le volume d'un pavé de cubes",
      etapes: [
        "Compte les cubes d'une couche : rangées $\\times$ cubes par rangée.",
        "Multiplie par le nombre de couches.",
        "Avec des cubes de $1$ cm³, le résultat est en cm³."
      ],
      exemple: "$4 \\times 3 \\times 2 = 24$ cm³."
    }
  ],
  erreurs: [
    "Confondre cube et pavé droit : le cube a toutes ses faces carrées.",
    "Oublier les arêtes ou les sommets cachés.",
    "Ne compter que les cubes visibles d'un assemblage.",
    "Additionner longueur, largeur et nombre de couches au lieu de multiplier.",
    "Confondre cm² (aire) et cm³ (volume)."
  ]
};
