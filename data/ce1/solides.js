/*
  CHAPITRE : CE1 — Les solides
  -----------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE1, « Les solides » :
  - reconnaître cube, boule, cône, pyramide, cylindre, pavé ; les nommer ;
  - décrire cube, pavé, pyramide avec « face », « sommet », « arête » ; nombre et nature des faces ;
    dénombrer faces, arêtes et sommets d'un polyèdre ; repérer les solides dans l'environnement.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce1-solides"] = {
  niveau: "CE1",
  numero: 12,
  titre: "Les solides",
  accroche: "Cube, pavé, pyramide, boule, cylindre, cône : les reconnaître et compter leurs faces, arêtes et sommets.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Six solides à connaître",
      video: { titre: "Vidéo de Maître Lucas : les solides (CE1-CE2)", youtube: "https://youtu.be/QxkAPpOCZ1w" },
      texte:
        "- Le **cube**, le **pavé** et la **pyramide** n'ont que des faces plates : ce sont des polyèdres.\n" +
        "- La **boule**, le **cylindre** et le **cône** ont une partie arrondie : ils roulent.\n\n" +
        "Autour de nous : un dé (cube), une valise (pavé), une balle (boule), une bougie (cylindre), un cornet (cône), la pyramide du Louvre (pyramide).",
      figure: ["e1s-cours-solides", "e1s-cours-ronds"],
      exemple: {
        enonce: "Quel solide a une pointe et des faces triangulaires ?",
        solution: "La pyramide."
      }
    },
    {
      titre: "Faces, arêtes, sommets",
      video: { titre: "Vidéo de Super Croco : arête, face et sommet", youtube: "https://youtu.be/ywJjcUcNZOU" },
      texte:
        "- Une **face** est une surface plate.\n" +
        "- Une **arête** est un bord, là où deux faces se touchent.\n" +
        "- Un **sommet** est un coin, là où des arêtes se rejoignent.\n\n" +
        "Le cube : $6$ faces carrées, $12$ arêtes, $8$ sommets.\n\n" +
        "Le pavé : $6$ faces rectangulaires, $12$ arêtes, $8$ sommets.\n\n" +
        "La pyramide à base carrée : $5$ faces ($1$ carré et $4$ triangles), $8$ arêtes, $5$ sommets.\n\n" +
        "Sur un dessin, les arêtes cachées sont en pointillés.",
      exemple: {
        enonce: "Combien d'arêtes a un cube ?",
        solution: "$4$ en haut, $4$ en bas et $4$ verticales : $12$ arêtes."
      }
    }
  ],

  exercices: [
    { type: "e1s-nommer", titre: "Reconnaître les solides", etape: "Les solides", nb: 6 },
    { type: "e1s-objets", titre: "Les solides autour de nous", etape: "Les solides", nb: 5 },
    { type: "e1s-compter", titre: "Faces, arêtes et sommets", etape: "Décrire un solide", nb: 6 }
  ],

  qcm: [
    { question: "Comment s'appelle ce solide ?", figure: "e1s-qcm-pyramide", choix: ["Une pyramide", "Un cône", "Un cube", "Un triangle"], bonne: 0, explication: "Une pointe, une base carrée et des faces triangulaires." },
    { question: "Combien de faces a un cube ?", choix: ["$6$", "$8$", "$12$", "$4$"], bonne: 0, explication: "$6$ faces carrées." },
    { question: "Combien d'arêtes a un cube ?", choix: ["$12$", "$6$", "$8$", "$10$"], bonne: 0, explication: "$4 + 4 + 4 = 12$." },
    { question: "Combien de sommets a un pavé ?", choix: ["$8$", "$6$", "$12$", "$4$"], bonne: 0, explication: "$4$ en haut et $4$ en bas." },
    { question: "Combien de faces a une pyramide à base carrée ?", choix: ["$5$", "$4$", "$6$", "$8$"], bonne: 0, explication: "$1$ carré et $4$ triangles." },
    { question: "Combien de sommets a une pyramide à base carrée ?", choix: ["$5$", "$4$", "$8$", "$6$"], bonne: 0, explication: "$4$ coins de la base et la pointe." },
    { question: "Les faces d'un pavé sont :", choix: ["des rectangles", "des triangles", "des disques", "des cercles"], bonne: 0, explication: "Parfois deux carrés, mais surtout des rectangles." },
    { question: "Lequel de ces solides roule ?", choix: ["le cylindre", "le cube", "le pavé", "la pyramide"], bonne: 0, explication: "Il a une partie arrondie." },
    { question: "Une arête, c'est :", choix: ["un bord entre deux faces", "un coin", "une face plate", "une pointe"], bonne: 0, explication: "Là où deux faces se touchent." },
    { question: "Un sommet, c'est :", choix: ["un coin", "un bord", "une face", "le dessous"], bonne: 0, explication: "Là où des arêtes se rejoignent." },
    { question: "Une balle de tennis a la forme :", choix: ["d'une boule", "d'un cylindre", "d'un cône", "d'un cube"], bonne: 0, explication: "Toute ronde." },
    { question: "Une boîte à chaussures a la forme :", choix: ["d'un pavé", "d'un cube", "d'une pyramide", "d'un cylindre"], bonne: 0, explication: "Faces rectangulaires." },
    { question: "Sur un dessin de solide, les pointillés montrent :", choix: ["les arêtes cachées", "les faces colorées", "le centre", "rien"], bonne: 0, explication: "Ce qu'on ne voit pas." },
    { question: "Quel solide a des faces triangulaires ?", choix: ["la pyramide", "le cube", "le pavé", "le cylindre"], bonne: 0, explication: "Les faces de côté de la pyramide sont des triangles." },
    { question: "Le cube et le pavé ont le même nombre :", choix: ["de faces, d'arêtes et de sommets", "de faces seulement", "de rien", "d'arêtes seulement"], bonne: 0, explication: "$6$ faces, $12$ arêtes, $8$ sommets tous les deux." },
    { question: "Un cornet de glace a la forme :", choix: ["d'un cône", "d'une pyramide", "d'un cylindre", "d'une boule"], bonne: 0, explication: "Une pointe et un disque." },
    { question: "Combien d'arêtes a une pyramide à base carrée ?", choix: ["$8$", "$5$", "$12$", "$4$"], bonne: 0, explication: "$4$ autour de la base et $4$ vers la pointe." },
    { question: "Une boule a combien de sommets ?", choix: ["aucun", "$1$", "$8$", "$6$"], bonne: 0, explication: "Elle n'a pas de coin." }
  ],

  methode: [
    {
      titre: "Compter les arêtes d'un solide",
      etapes: [
        "Compte les arêtes de la face du haut.",
        "Compte celles de la face du bas.",
        "Ajoute celles qui relient le haut et le bas (ou qui montent vers la pointe)."
      ],
      figure: "e1s-cours-solides",
      exemple: "Cube : $4 + 4 + 4 = 12$ arêtes."
    }
  ],
  erreurs: [
    "Oublier les faces, arêtes ou sommets cachés.",
    "Confondre le cône (il roule) et la pyramide (faces plates).",
    "Confondre face, arête et sommet.",
    "Appeler « carré » un cube : le carré est une figure plate."
  ]
};
