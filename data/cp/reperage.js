/*
  CHAPITRE : CP — Se repérer et se déplacer
  ------------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CP, « Le repérage dans l'espace » :
  - vocabulaire des positions relatives : gauche, droite ; sur, sous, entre, devant, derrière, au-dessus, en dessous ;
  - situer des personnes ou des objets les uns par rapport aux autres ; plan de la classe ;
  - décrire des déplacements ; utiliser et produire une suite d'instructions qui codent un déplacement
    (avancer, reculer, tourner, monter, descendre ; flèches sur un quadrillage).
  figure : FIGURES de assets/exercices-cp.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cp-reperage"] = {
  niveau: "CP",
  numero: 11,
  titre: "Se repérer et se déplacer",
  accroche: "Devant, derrière, à gauche, à droite, entre : dire où sont les choses, puis suivre et écrire un chemin avec des flèches.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Dire où sont les choses",
      video: { titre: "Vidéo de Maître Lucas : les positions (devant, derrière…)", youtube: "https://youtu.be/Sbschx4b6cM" },
      texte:
        "Pour dire où est un objet, on le compare à un autre :\n\n" +
        "- **sur**, **sous** ; **au-dessus**, **en dessous** ;\n" +
        "- **devant**, **derrière** ;\n" +
        "- **entre** (au milieu de deux choses) ;\n" +
        "- **à gauche de**, **à droite de**.\n\n" +
        "Sur la figure, le rond ● est à droite de l'étoile ★, le carré ■ est au-dessus de l'étoile, le cœur ♥ est en dessous.",
      figure: "cp11-cours-positions",
      exemple: {
        enonce: "Sur la figure, quelle forme est à gauche de l'étoile ?",
        solution: "Le triangle ▲ est juste à gauche de l'étoile."
      }
    },
    {
      titre: "La gauche et la droite",
      video: { titre: "Vidéo de Maître Lucas : distinguer la gauche et la droite", youtube: "https://youtu.be/RB3wbfm4ytI" },
      texte:
        "Ta main **droite** est celle avec laquelle la plupart des enfants écrivent. L'autre est la main **gauche**.\n\n" +
        "Quand des enfants sont assis « de gauche à droite », on lit leurs prénoms dans l'ordre, comme les mots d'un livre.\n\n" +
        "Awa, Anli, Saïd : Anli est **entre** Awa et Saïd, Saïd est à droite d'Anli.",
      exemple: {
        enonce: "Moussa, Inaya et Kamal sont sur un banc, dans cet ordre de gauche à droite. Qui est à gauche d'Inaya ?",
        solution: "Moussa est juste à gauche d'Inaya."
      }
    },
    {
      titre: "Suivre et écrire un chemin",
      video: { titre: "Vidéo de Maître Lucas : se déplacer sur un quadrillage", youtube: "https://youtu.be/PdHewbO2bH0" },
      texte:
        "Sur un quadrillage, on code un déplacement avec des flèches. Chaque flèche fait avancer d'**une case** :\n\n" +
        "- $\\rightarrow$ : vers la droite ; $\\leftarrow$ : vers la gauche ;\n" +
        "- $\\uparrow$ : vers le haut ; $\\downarrow$ : vers le bas.\n\n" +
        "On lit le code dans l'ordre. Le chemin dessiné ci-contre s'écrit $\\rightarrow \\rightarrow \\uparrow \\uparrow \\rightarrow$ : il mène à A.",
      figure: "cp11-cours-chemin",
      exemple: {
        enonce: "Que fait le robot avec le code $\\uparrow \\uparrow \\leftarrow$ ?",
        solution: "Il monte de deux cases, puis va d'une case vers la gauche."
      }
    },
    {
      titre: "Le plan de la classe",
      video: { titre: "Vidéo de Maître Lucas : le plan de la classe", youtube: "https://youtu.be/HVt9pTOTh_4" },
      texte:
        "Un **plan**, c'est la classe dessinée vue d'en haut : on voit les tables, le bureau, la porte, le tableau.\n\n" +
        "Sur un plan, on peut montrer où est assis un élève, ou dessiner un chemin : « de la porte, va jusqu'au tableau, puis tourne à gauche ».",
      exemple: {
        enonce: "Sur le plan, la porte est en bas à gauche et le tableau en haut. Pour aller de la porte au tableau, dans quel sens monte-t-on sur le plan ?",
        solution: "Vers le haut du plan."
      }
    }
  ],

  exercices: [
    { type: "cp11-positions", titre: "À gauche, à droite, au-dessus, en dessous", etape: "Se repérer", nb: 6 },
    { type: "cp11-rang", titre: "Qui est à côté de qui ?", etape: "Se repérer", nb: 5 },
    { type: "cp11-chemin", titre: "Suivre un code de flèches", etape: "Se déplacer", nb: 5 },
    { type: "cp11-coder", titre: "Écrire le code d'un chemin", etape: "Se déplacer", nb: 5 }
  ],

  qcm: [
    { question: "Le robot part du point rond et suit $\\rightarrow \\rightarrow \\uparrow \\uparrow$. Où arrive-t-il ?", figure: "cp11-qcm-chemin", choix: ["A", "B", "C", "Nulle part"], bonne: 0, explication: "Deux cases à droite, puis deux cases vers le haut : A." },
    { question: "Le robot part du point rond et suit $\\rightarrow \\rightarrow \\rightarrow \\rightarrow$. Où arrive-t-il ?", figure: "cp11-qcm-chemin", choix: ["C", "A", "B", "Nulle part"], bonne: 0, explication: "Quatre cases vers la droite sur la même ligne : C." },
    { question: "La flèche $\\uparrow$ veut dire :", choix: ["monter d'une case", "descendre d'une case", "aller à gauche", "aller à droite"], bonne: 0, explication: "La flèche montre le haut." },
    { question: "La flèche $\\leftarrow$ veut dire :", choix: ["aller d'une case à gauche", "aller d'une case à droite", "monter", "descendre"], bonne: 0, explication: "La flèche montre la gauche." },
    { question: "Awa, Anli et Saïd sont assis de gauche à droite. Qui est au milieu ?", choix: ["Anli", "Awa", "Saïd", "Personne"], bonne: 0, explication: "Anli est entre Awa et Saïd." },
    { question: "Awa, Anli et Saïd sont assis de gauche à droite. Qui est à droite d'Anli ?", choix: ["Saïd", "Awa", "Anli", "Personne"], bonne: 0, explication: "Après Anli vient Saïd." },
    { question: "Le contraire de « devant » est :", choix: ["derrière", "dessus", "à gauche", "entre"], bonne: 0, explication: "Devant / derrière." },
    { question: "Le contraire de « au-dessus » est :", choix: ["en dessous", "devant", "à droite", "loin"], bonne: 0, explication: "Au-dessus / en dessous." },
    { question: "Le cahier est posé sur la table. La table est :", choix: ["sous le cahier", "sur le cahier", "à droite du cahier", "derrière le cahier"], bonne: 0, explication: "Si le cahier est sur la table, la table est sous le cahier." },
    { question: "Dans la file, Nasma est devant Zaïd. Zaïd est donc :", choix: ["derrière Nasma", "devant Nasma", "à côté de Nasma", "loin de Nasma"], bonne: 0, explication: "Si Nasma est devant Zaïd, Zaïd est derrière elle." },
    { question: "Un plan de la classe, c'est la classe vue :", choix: ["d'en haut", "de la porte", "d'en dessous", "de côté"], bonne: 0, explication: "Sur un plan, on regarde d'en haut." },
    { question: "« Entre » veut dire :", choix: ["au milieu de deux choses", "tout au bout", "très loin", "dessus"], bonne: 0, explication: "Entre deux enfants, c'est au milieu." },
    { question: "Pour aller de la case du bas à la case juste au-dessus, on utilise :", choix: ["$\\uparrow$", "$\\downarrow$", "$\\rightarrow$", "$\\leftarrow$"], bonne: 0, explication: "On monte d'une case." },
    { question: "Le code $\\rightarrow \\leftarrow$ ramène le robot :", choix: ["à son point de départ", "deux cases à droite", "deux cases à gauche", "en haut"], bonne: 0, explication: "Une case à droite puis une à gauche : retour au départ." },
    { question: "Combien de cases fait le code $\\uparrow \\uparrow \\rightarrow \\downarrow$ ?", choix: ["$4$", "$3$", "$2$", "$1$"], bonne: 0, explication: "Une flèche = une case : $4$ cases." },
    { question: "Le ballon est entre la chaise et la table. Où est le ballon ?", choix: ["au milieu des deux", "sur la table", "loin de la chaise", "sous la chaise"], bonne: 0, explication: "Entre deux objets, c'est au milieu." },
    { question: "Le code $\\downarrow \\downarrow$ fait aller le robot :", choix: ["deux cases vers le bas", "deux cases vers le haut", "deux cases à droite", "une case vers le bas"], bonne: 0, explication: "Deux flèches vers le bas : deux cases vers le bas." },
    { question: "Kamal, Faïza, Toiyb et Roukia sont en ligne de gauche à droite. Qui est tout à droite ?", choix: ["Roukia", "Kamal", "Faïza", "Toiyb"], bonne: 0, explication: "Le dernier prénom est tout à droite." }
  ],

  methode: [
    {
      titre: "Suivre un code de flèches",
      etapes: [
        "Pose ton doigt sur le point de départ.",
        "Pour chaque flèche, avance d'une case dans le sens de la flèche.",
        "Lis les flèches dans l'ordre, de gauche à droite."
      ],
      figure: "cp11-cours-chemin",
      exemple: "$\\rightarrow \\rightarrow \\uparrow \\uparrow \\rightarrow$ : deux à droite, deux en haut, une à droite."
    },
    {
      titre: "Écrire le code d'un chemin",
      etapes: [
        "Pars du point de départ.",
        "Pour chaque case du chemin, écris la flèche du sens dans lequel tu vas.",
        "Vérifie en suivant ton code avec le doigt."
      ],
      exemple: "Le chemin monte de $3$ cases : $\\uparrow \\uparrow \\uparrow$."
    }
  ],
  erreurs: [
    "Confondre la gauche et la droite.",
    "Compter la case de départ comme un déplacement.",
    "Lire le code dans le désordre.",
    "Mélanger « au-dessus » et « en dessous » sur un quadrillage.",
    "Oublier une flèche quand on écrit le code d'un long chemin."
  ]
};
