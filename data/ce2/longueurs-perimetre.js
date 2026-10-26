/*
  CHAPITRE : CE2 — Longueurs et périmètre
  ----------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE2, « Les longueurs » : unités m, dm, cm, mm, km et leurs relations ;
  choisir l'unité ; comparer ; tracer un segment de longueur donnée ; longueurs de référence ; estimer ;
  savoir ce qu'est le périmètre d'une figure plane ; déterminer le périmètre d'un polygone avec une règle graduée.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce2-longueurs-perimetre"] = {
  niveau: "CE2",
  numero: 9,
  titre: "Longueurs et périmètre",
  accroche: "Du millimètre au kilomètre, et le périmètre : la longueur du tour d'une figure.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Les unités de longueur",
      video: { titre: "Vidéo de Maître Lucas : unités de mesure m, dm, cm, mm", youtube: "https://youtu.be/9jc0YmthHos" },
      texte:
        "- $1$ km $= 1\\,000$ m\n" +
        "- $1$ m $= 10$ dm $= 100$ cm $= 1\\,000$ mm\n" +
        "- $1$ dm $= 10$ cm ; $1$ cm $= 10$ mm\n\n" +
        "Le **millimètre** sert pour les très petites longueurs (l'épaisseur d'un cahier), le **décimètre** pour les objets moyens (une feuille : environ $3$ dm).",
      exemple: { enonce: "Complète : $2$ m $35$ cm $= \\ldots$ cm.", solution: "$200 + 35 = 235$ cm." }
    },
    {
      titre: "Le périmètre",
      video: { titre: "Vidéo de Maître Lucas : le périmètre", youtube: "https://youtu.be/9WZIOT5Ulsk" },
      texte:
        "Le **périmètre** d'une figure est la longueur de son **tour**.\n\n" +
        "Pour un polygone, on ajoute les longueurs de tous ses côtés.\n\n" +
        "Le rectangle ci-contre : $8 + 5 + 8 + 5 = 26$ cm.\n\n" +
        "On peut aussi comparer des périmètres sans mesurer, en reportant les côtés avec un compas sur une ligne.",
      figure: "e2l-cours-perimetre",
      exemple: { enonce: "Un carré a des côtés de $7$ cm. Quel est son périmètre ?", solution: "$7 + 7 + 7 + 7 = 28$ cm." }
    }
  ],
  exercices: [
    { type: "e2l-unites", titre: "Unités et conversions", etape: "Les longueurs", nb: 6 },
    { type: "e2l-perimetre", titre: "Calculer un périmètre", etape: "Le périmètre", nb: 6 },
    { type: "e2k-numeration", titre: "Calculer avec des mesures (révision)", etape: "Le périmètre", nb: 5 }
  ],
  qcm: [
    { question: "Quel est le périmètre de ce triangle ?", figure: "e2l-qcm-triangle", choix: ["$22$ cm", "$16$ cm", "$15$ cm", "$63$ cm"], bonne: 0, explication: "$9 + 7 + 6 = 22$." },
    { question: "$1$ m $=$", choix: ["$100$ cm", "$10$ cm", "$1\\,000$ cm", "$100$ mm"], bonne: 0, explication: "Un mètre fait cent centimètres." },
    { question: "$1$ cm $=$", choix: ["$10$ mm", "$100$ mm", "$1$ mm", "$1\\,000$ mm"], bonne: 0, explication: "Dix millimètres." },
    { question: "$1$ dm $=$", choix: ["$10$ cm", "$100$ cm", "$1$ cm", "$1\\,000$ cm"], bonne: 0, explication: "Dix centimètres." },
    { question: "$3$ km $=$", choix: ["$3\\,000$ m", "$300$ m", "$30$ m", "$3$ m"], bonne: 0, explication: "$3 \\times 1\\,000$." },
    { question: "$2$ m $35$ cm $=$", choix: ["$235$ cm", "$37$ cm", "$2\\,035$ cm", "$253$ cm"], bonne: 0, explication: "$200 + 35$." },
    { question: "L'épaisseur d'un cahier se mesure en :", choix: ["mm", "km", "m", "dm"], bonne: 0, explication: "Très petite longueur." },
    { question: "Le périmètre d'une figure, c'est :", choix: ["la longueur de son tour", "sa surface", "sa hauteur", "son nombre de côtés"], bonne: 0, explication: "On fait le tour." },
    { question: "Périmètre d'un rectangle de $8$ cm sur $5$ cm :", choix: ["$26$ cm", "$13$ cm", "$40$ cm", "$21$ cm"], bonne: 0, explication: "$8 + 5 + 8 + 5$." },
    { question: "Périmètre d'un carré de côté $7$ cm :", choix: ["$28$ cm", "$14$ cm", "$49$ cm", "$21$ cm"], bonne: 0, explication: "$4$ côtés de $7$ cm." },
    { question: "La plus grande longueur :", choix: ["$2$ m", "$150$ cm", "$12$ dm", "$600$ mm"], bonne: 0, explication: "$2\\,000$ mm $> 1\\,500 > 1\\,200 > 600$." },
    { question: "$40$ mm $=$", choix: ["$4$ cm", "$40$ cm", "$4$ dm", "$400$ cm"], bonne: 0, explication: "$10$ mm $= 1$ cm." },
    { question: "La distance Mamoudzou-Bandrélé se mesure en :", choix: ["km", "cm", "mm", "dm"], bonne: 0, explication: "Une grande distance." },
    { question: "Un pentagone a des côtés de $3$, $4$, $5$, $4$ et $3$ cm. Son périmètre :", choix: ["$19$ cm", "$5$ cm", "$15$ cm", "$20$ cm"], bonne: 0, explication: "$3 + 4 + 5 + 4 + 3$." },
    { question: "$500$ cm $=$", choix: ["$5$ m", "$50$ m", "$5$ dm", "$500$ m"], bonne: 0, explication: "$100$ cm $= 1$ m." },
    { question: "Pour comparer deux périmètres sans règle, on peut utiliser :", choix: ["le compas", "la balance", "l'horloge", "le thermomètre"], bonne: 0, explication: "On reporte les côtés bout à bout." },
    { question: "Une feuille mesure environ :", choix: ["$3$ dm de long", "$3$ km de long", "$3$ mm de long", "$30$ m de long"], bonne: 0, explication: "Environ $30$ cm, soit $3$ dm." },
    { question: "$1$ m, c'est combien de millimètres ?", choix: ["$1\\,000$ mm", "$100$ mm", "$10$ mm", "$10\\,000$ mm"], bonne: 0, explication: "$100$ cm $\\times 10$ mm." }
  ],
  methode: [
    { titre: "Calculer le périmètre d'un polygone", etapes: ["Repère tous les côtés.", "Vérifie qu'ils sont dans la même unité.", "Ajoute toutes les longueurs."], figure: "e2l-cours-perimetre", exemple: "$8 + 5 + 8 + 5 = 26$ cm." }
  ],
  erreurs: ["Oublier un côté dans le périmètre.", "Pour un rectangle, ajouter seulement la longueur et la largeur.", "Croire que $1$ m $= 10$ cm.", "Additionner des longueurs dans des unités différentes sans convertir."]
};
