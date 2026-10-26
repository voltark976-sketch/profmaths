/*
  CHAPITRE : CP — Solides et figures
  -----------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CP, « Espace et géométrie » :
  - solides : reconnaître cube, boule, cône, cylindre, pavé ; nommer cube, pavé, boule ; décrire cube et pavé avec le mot
    « face » (nombre et nature des faces) ; repérer des solides dans l'environnement ;
  - géométrie plane : reconnaître et nommer disque, carré, rectangle, triangle ; les décrire avec « sommet » et « côté » ;
    nombre de sommets et de côtés d'un polygone ; repérer et vérifier des alignements avec la règle.
  figure : FIGURES de assets/exercices-cp.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cp-solides-figures"] = {
  niveau: "CP",
  numero: 10,
  titre: "Solides et figures",
  accroche: "Cube, pavé, boule, cylindre, cône ; carré, rectangle, triangle, disque : les reconnaître, les nommer et les décrire.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Les solides",
      video: { titre: "Vidéo de Maître Lucas : découvrir les solides", youtube: "https://youtu.be/KpldM-7CUhU" },
      texte:
        "Un **solide** est un objet qu'on peut prendre dans la main.\n\n" +
        "- Le **cube** et le **pavé** ont des faces toutes plates : ils ne roulent pas.\n" +
        "- La **boule** est toute ronde : elle roule dans tous les sens.\n" +
        "- Le **cylindre** roule et a deux disques aux bouts ; le **cône** a une pointe.\n\n" +
        "Autour de nous : un dé est un cube, une boîte à chaussures est un pavé, un ballon est une boule, une boîte de conserve est un cylindre, un cornet de glace est un cône.",
      figure: ["cp10-cours-solides", "cp10-cours-solides2"],
      exemple: {
        enonce: "Une brique de lait a la forme de quel solide ?",
        solution: "D'un pavé : ses faces sont des rectangles."
      }
    },
    {
      titre: "Les faces du cube et du pavé",
      video: { titre: "Vidéo de Maître Lucas : les solides (CE1-CE2)", youtube: "https://youtu.be/QxkAPpOCZ1w" },
      texte:
        "Une **face** est une partie plate d'un solide.\n\n" +
        "- Le **cube** a $6$ faces : ce sont des **carrés** tous pareils.\n" +
        "- Le **pavé** a $6$ faces : ce sont des **rectangles** (parfois deux carrés).\n\n" +
        "Sur un dessin, on ne voit pas toutes les faces : certaines sont cachées derrière.",
      exemple: {
        enonce: "Un dé a combien de faces ? Quelle est leur forme ?",
        solution: "$6$ faces carrées : c'est un cube (avec les points de $1$ à $6$)."
      }
    },
    {
      titre: "Les figures planes",
      video: { titre: "Vidéo de Maître Lucas : figures géométriques", youtube: "https://youtu.be/HkcLxx_E7XE" },
      texte:
        "Une figure plane est dessinée sur une feuille.\n\n" +
        "- Le **triangle** a $3$ côtés et $3$ sommets.\n" +
        "- Le **carré** a $4$ côtés de la même longueur et $4$ sommets.\n" +
        "- Le **rectangle** a $4$ côtés : deux longs et deux courts, pareils deux à deux.\n" +
        "- Le **disque** est rond : il n'a ni côté ni sommet.\n\n" +
        "Un **côté** est un trait droit du bord ; un **sommet** est un coin.",
      figure: "cp10-cours-formes",
      exemple: {
        enonce: "Une figure a $4$ côtés : deux longs et deux courts. Qu'est-ce que c'est ?",
        solution: "C'est un rectangle."
      }
    },
    {
      titre: "Des points alignés",
      video: { titre: "Vidéo de Maître Lucas : repérer des alignements", youtube: "https://youtu.be/MsQwQyGbBI4" },
      texte:
        "Des points sont **alignés** quand on peut les relier avec une même ligne droite.\n\n" +
        "Pour vérifier, on pose la **règle** sur deux points et on regarde si le troisième touche aussi le bord de la règle.\n\n" +
        "Sur la figure, A, B et C sont alignés ; D ne l'est pas.",
      figure: "cp10-cours-alignes",
      exemple: {
        enonce: "Comment vérifier que trois plots de la cour sont alignés ?",
        solution: "On tend une ficelle (ou on regarde le long de la règle) entre deux plots : le troisième doit être dessus."
      }
    }
  ],

  exercices: [
    { type: "cp10-solides", titre: "Reconnaître les solides", etape: "Les solides", nb: 6 },
    { type: "cp10-faces", titre: "Faces, côtés et sommets", etape: "Les solides", nb: 5 },
    { type: "cp10-figures", titre: "Les figures planes et les alignements", etape: "Les figures planes", nb: 6 }
  ],

  qcm: [
    { question: "Comment s'appelle ce solide ?", figure: "cp10-qcm-cylindre", choix: ["Un cylindre", "Un cône", "Une boule", "Un pavé"], bonne: 0, explication: "Il a deux disques et roule : c'est un cylindre." },
    { question: "Et celui-ci, comment s'appelle-t-il ?", figure: "cp10-qcm-pave", choix: ["Un pavé", "Un cube", "Un cylindre", "Un rectangle"], bonne: 0, explication: "Ses faces sont des rectangles : c'est un pavé." },
    { question: "Un ballon de foot a la forme :", choix: ["d'une boule", "d'un cube", "d'un cône", "d'un disque"], bonne: 0, explication: "Il est tout rond : une boule." },
    { question: "Un dé à jouer a la forme :", choix: ["d'un cube", "d'une boule", "d'un pavé allongé", "d'un cylindre"], bonne: 0, explication: "Ses $6$ faces sont des carrés pareils : un cube." },
    { question: "Combien de faces a un cube ?", choix: ["$6$", "$4$", "$3$", "$8$"], bonne: 0, explication: "Dessus, dessous, devant, derrière, gauche, droite : $6$." },
    { question: "Les faces d'un cube sont :", choix: ["des carrés", "des triangles", "des disques", "des rectangles allongés"], bonne: 0, explication: "Toutes les faces d'un cube sont des carrés." },
    { question: "Quel solide a une pointe ?", choix: ["le cône", "le cube", "la boule", "le cylindre"], bonne: 0, explication: "Le cône a une pointe, comme un cornet de glace." },
    { question: "Quel solide roule dans tous les sens ?", choix: ["la boule", "le cube", "le pavé", "le cône"], bonne: 0, explication: "La boule est toute ronde." },
    { question: "Quelle figure est un disque ?", figure: "cp10-qcm-formes", choix: ["C", "A", "B", "Aucune"], bonne: 0, explication: "Le disque est la figure ronde." },
    { question: "Quelle figure est un triangle ?", figure: "cp10-qcm-formes", choix: ["A", "B", "C", "Aucune"], bonne: 0, explication: "La figure A a $3$ côtés." },
    { question: "Combien de côtés a un triangle ?", choix: ["$3$", "$4$", "$2$", "$0$"], bonne: 0, explication: "Tri- veut dire trois." },
    { question: "Combien de sommets a un rectangle ?", choix: ["$4$", "$3$", "$2$", "$6$"], bonne: 0, explication: "Un rectangle a $4$ coins." },
    { question: "Un carré a :", choix: ["$4$ côtés de la même longueur", "$3$ côtés", "$4$ côtés tous différents", "aucun côté"], bonne: 0, explication: "Les $4$ côtés du carré sont égaux." },
    { question: "Un disque a combien de sommets ?", choix: ["aucun", "$1$", "$4$", "$2$"], bonne: 0, explication: "Le disque est rond : pas de coin." },
    { question: "Pour vérifier que des points sont alignés, on utilise :", choix: ["une règle", "une balance", "une horloge", "un compas"], bonne: 0, explication: "On pose la règle sur les points." },
    { question: "Une boîte de conserve a la forme :", choix: ["d'un cylindre", "d'un cube", "d'un cône", "d'une boule"], bonne: 0, explication: "Deux disques et une partie qui roule : un cylindre." },
    { question: "Une figure a $4$ côtés : deux longs et deux courts. C'est :", choix: ["un rectangle", "un carré", "un triangle", "un disque"], bonne: 0, explication: "Le rectangle a deux longueurs différentes." },
    { question: "Un sommet, c'est :", choix: ["un coin", "un trait droit", "une face", "le milieu"], bonne: 0, explication: "Un sommet est un coin de la figure." }
  ],

  methode: [
    {
      titre: "Reconnaître un solide",
      etapes: [
        "Est-ce qu'il roule ? Boule, cylindre ou cône.",
        "A-t-il une pointe ? C'est le cône.",
        "Toutes ses faces sont plates ? Cube (faces carrées) ou pavé (faces rectangles)."
      ],
      figure: "cp10-cours-solides",
      exemple: "Une boîte à chaussures ne roule pas et a des faces rectangles : c'est un pavé."
    },
    {
      titre: "Nommer une figure plane",
      etapes: [
        "Compte les côtés : $3$ → triangle ; $4$ → carré ou rectangle.",
        "Avec $4$ côtés, compare leurs longueurs : tous pareils → carré.",
        "Aucun côté, tout rond → disque."
      ],
      figure: "cp10-cours-formes",
      exemple: "$4$ côtés égaux : un carré."
    }
  ],
  erreurs: [
    "Confondre le carré (figure plate) et le cube (solide).",
    "Confondre le disque (figure plate) et la boule (solide).",
    "Ne compter que les faces visibles d'un cube : il en a $6$.",
    "Appeler « carré » un rectangle allongé.",
    "Dire que des points sont alignés sans vérifier avec la règle."
  ]
};
