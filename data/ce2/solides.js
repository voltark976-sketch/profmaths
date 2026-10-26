/*
  CHAPITRE : CE2 — Les solides
  -----------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE2 : nommer cube, boule, pavé, cône, pyramide, cylindre ;
  décrire cube, pavé, pyramide (faces, sommets, arêtes) ; nature des faces d'une pyramide ;
  construire un cube, un pavé, une pyramide ; construire un cube à partir d'un patron.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce2-solides"] = {
  niveau: "CE2",
  numero: 13,
  titre: "Les solides",
  accroche: "Décrire les solides et découvrir le patron du cube.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Décrire un solide",
      video: { titre: "Vidéo de Maître Lucas : les solides (CE1-CE2)", youtube: "https://youtu.be/QxkAPpOCZ1w" },
      texte:
        "- Cube : $6$ faces carrées, $12$ arêtes, $8$ sommets.\n" +
        "- Pavé : $6$ faces rectangulaires, $12$ arêtes, $8$ sommets.\n" +
        "- Pyramide à base carrée : $1$ carré et $4$ triangles, $8$ arêtes, $5$ sommets.\n" +
        "- Boule, cylindre, cône : ils ont une partie arrondie et roulent.",
      exemple: { enonce: "Combien de faces triangulaires a une pyramide à base carrée ?", solution: "$4$ faces triangulaires (et une base carrée)." }
    },
    {
      titre: "Le patron du cube",
      video: { titre: "Vidéo de Jean-Yves Labouche : patrons d'un cube", youtube: "https://youtu.be/qStBPvu_g4M" },
      texte:
        "Un **patron** est une figure plane qu'on peut découper et plier pour fabriquer un solide.\n\n" +
        "Le patron d'un cube est fait de **$6$ carrés** reliés par leurs côtés. Quand on plie, chaque carré devient une face, sans en recouvrir une autre.\n\n" +
        "Le plus connu : une croix (une ligne de $4$ carrés, avec un carré au-dessus et un au-dessous).",
      figure: "e2s-cours-patron",
      exemple: { enonce: "Six carrés alignés forment-ils un patron de cube ?", solution: "Non : en pliant, deux carrés se recouvrent et deux faces restent ouvertes." }
    }
  ],
  exercices: [
    { type: "e2s-decrire", titre: "Nommer et décrire les solides", etape: "Les solides", nb: 6 },
    { type: "e2s-patron", titre: "Reconnaître un patron de cube", etape: "Les patrons", nb: 5 },
    { type: "e2g-figures", titre: "Les figures des faces", etape: "Les patrons", nb: 5 }
  ],
  qcm: [
    { question: "Combien de faces a un cube ?", choix: ["$6$", "$8$", "$12$", "$4$"], bonne: 0, explication: "Six carrés." },
    { question: "Combien d'arêtes a un pavé ?", choix: ["$12$", "$6$", "$8$", "$10$"], bonne: 0, explication: "Comme le cube." },
    { question: "Combien de sommets a une pyramide à base carrée ?", choix: ["$5$", "$4$", "$8$", "$6$"], bonne: 0, explication: "$4$ en bas et $1$ en haut." },
    { question: "Les faces d'une pyramide à base carrée sont :", choix: ["$1$ carré et $4$ triangles", "$6$ carrés", "$5$ triangles", "$2$ disques"], bonne: 0, explication: "Une base carrée, des faces qui montent en pointe." },
    { question: "Un patron de cube est fait de :", choix: ["$6$ carrés", "$4$ carrés", "$6$ rectangles allongés", "$8$ carrés"], bonne: 0, explication: "Une face = un carré." },
    { question: "Six carrés en ligne droite :", choix: ["ne forment pas un patron de cube", "forment un patron de cube", "forment une pyramide", "forment un cylindre"], bonne: 0, explication: "Deux carrés se recouvriraient." },
    { question: "Un patron sert à :", choix: ["fabriquer un solide par pliage", "mesurer une longueur", "lire l'heure", "peser un objet"], bonne: 0, explication: "On découpe et on plie." },
    { question: "Quel solide n'a pas de sommet ?", choix: ["la boule", "le cube", "la pyramide", "le pavé"], bonne: 0, explication: "Elle est toute ronde." },
    { question: "Le cylindre a deux faces plates qui sont :", choix: ["des disques", "des carrés", "des triangles", "des rectangles"], bonne: 0, explication: "Une en haut, une en bas." },
    { question: "Un dé a la forme :", choix: ["d'un cube", "d'un pavé allongé", "d'une pyramide", "d'un cône"], bonne: 0, explication: "Six faces carrées." },
    { question: "Une arête est :", choix: ["le bord commun à deux faces", "un coin", "une face", "le centre"], bonne: 0, explication: "Là où deux faces se touchent." },
    { question: "Combien de faces a un pavé ?", choix: ["$6$", "$4$", "$8$", "$12$"], bonne: 0, explication: "Comme le cube." },
    { question: "Pour fermer un cube, il faut :", choix: ["$6$ faces", "$5$ faces", "$4$ faces", "$8$ faces"], bonne: 0, explication: "Dessus, dessous et $4$ côtés." },
    { question: "La pyramide a combien d'arêtes ?", choix: ["$8$", "$12$", "$5$", "$4$"], bonne: 0, explication: "$4$ autour de la base, $4$ vers la pointe." },
    { question: "Un cornet de glace ressemble à :", choix: ["un cône", "une pyramide", "un cube", "un cylindre"], bonne: 0, explication: "Une pointe et un disque." },
    { question: "Quel solide a $6$ faces rectangulaires ?", choix: ["le pavé", "la pyramide", "le cône", "la boule"], bonne: 0, explication: "Comme une boîte à chaussures." },
    { question: "Un sommet, c'est :", choix: ["un coin du solide", "une face plate", "un bord", "le dessous"], bonne: 0, explication: "Là où des arêtes se rejoignent." },
    { question: "Dans le patron « en croix », combien de carrés sont sur la ligne du milieu ?", choix: ["$4$", "$6$", "$2$", "$3$"], bonne: 0, explication: "Une ligne de $4$, un carré au-dessus, un au-dessous." }
  ],
  methode: [
    { titre: "Vérifier un patron de cube", etapes: ["Compte les carrés : il en faut $6$.", "Imagine le pliage : choisis un carré pour le fond.", "Vérifie qu'aucun carré ne se pose sur un autre et que toutes les faces sont fermées."], figure: "e2s-cours-patron", exemple: "La croix : le carré du centre est le fond, les autres se relèvent." }
  ],
  erreurs: ["Croire que n'importe quel assemblage de $6$ carrés est un patron.", "Oublier les faces cachées.", "Confondre arête et sommet.", "Confondre cône et pyramide."]
};
