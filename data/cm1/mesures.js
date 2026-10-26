/*
  CHAPITRE : CM1 — Longueurs, masses, contenances
  ------------------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : unités de longueur (km, m, dm, cm, mm), de masse (t, kg, g,
  mg) et de contenance (hL, L, dL, cL, mL) ; relations entre unités (1 km = 1 000 m…) utilisées pour convertir et
  comparer, sans tableau de conversion ; périmètre d'un polygone, du carré et du rectangle ; problèmes.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-mesures"] = {
  niveau: "CM1",
  numero: 10,
  titre: "Longueurs, masses, contenances",
  accroche: "Choisir la bonne unité, convertir avec les relations entre unités, calculer un périmètre.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Les relations entre unités",
      video: { titre: "Vidéo de Maître Lucas : unités de mesure de longueur (CM1-CM2)", youtube: "https://youtu.be/sMClfLc6Zf0" },
      texte:
        "Il faut connaître ces relations :\n\n" +
        "- **Longueurs** : $1$ km $= 1\\,000$ m ; $1$ m $= 10$ dm $= 100$ cm $= 1\\,000$ mm ; $1$ cm $= 10$ mm.\n" +
        "- **Masses** : $1$ t $= 1\\,000$ kg ; $1$ kg $= 1\\,000$ g ; $1$ g $= 1\\,000$ mg.\n" +
        "- **Contenances** : $1$ hL $= 100$ L ; $1$ L $= 10$ dL $= 100$ cL $= 1\\,000$ mL.\n\n" +
        "Pour **convertir**, on utilise ces relations : $47$ kg $= 47 \\times 1\\,000$ g $= 47\\,000$ g.\n\n" +
        "$6$ L $57$ cL $= 600$ cL $+ 57$ cL $= 657$ cL.",
      exemple: { enonce: "Complète : $18$ m $=$ … cm.", solution: "$1$ m $= 100$ cm, donc $18$ m $= 1\\,800$ cm." }
    },
    {
      titre: "Comparer et calculer un périmètre",
      video: { titre: "Vidéo de Maître Lucas : convertir pour comparer des longueurs", youtube: "https://youtu.be/YpoMiPIvjzA" },
      texte:
        "Pour **comparer** deux mesures, on les exprime dans la **même unité** : $6$ L $= 60$ dL, donc $6$ L $< 61$ dL.\n\n" +
        "Le **périmètre** d'une figure est la longueur de son tour.\n\n" +
        "- Rectangle de $31$ m sur $24$ m : $31 + 24 + 31 + 24 = 110$ m.\n" +
        "- Carré de côté $9$ cm : $4 \\times 9 = 36$ cm ; et si le périmètre est $36$ cm, le côté mesure $36 \\div 4 = 9$ cm.",
      exemple: { enonce: "Un triangle a un périmètre de $23$ cm ; deux côtés mesurent $3$ cm et $9$ cm. Le troisième ?", solution: "$23 - 3 - 9 = 11$ cm." }
    }
  ],
  exercices: [
    { type: "m1l-convertir", titre: "Convertir", etape: "Convertir", nb: 6 },
    { type: "m1l-comparer", titre: "Comparer des mesures", etape: "Comparer", nb: 5 },
    { type: "m1l-perimetre", titre: "Périmètres", etape: "Périmètre", nb: 5 }
  ],
  qcm: [
    { question: "$1$ km $=$", choix: ["$1\\,000$ m", "$100$ m", "$10$ m", "$10\\,000$ m"], bonne: 0, explication: "Kilo veut dire mille." },
    { question: "$47$ kg $=$", choix: ["$47\\,000$ g", "$4\\,700$ g", "$470$ g", "$47$ g"], bonne: 0, explication: "$1$ kg $= 1\\,000$ g." },
    { question: "$18$ m $=$", choix: ["$1\\,800$ cm", "$180$ cm", "$18\\,000$ cm", "$18$ cm"], bonne: 0, explication: "$1$ m $= 100$ cm." },
    { question: "$21$ cm $=$", choix: ["$210$ mm", "$2\\,100$ mm", "$21$ mm", "$2{,}1$ mm"], bonne: 0, explication: "$1$ cm $= 10$ mm." },
    { question: "$6$ L $57$ cL $=$", choix: ["$657$ cL", "$6\\,057$ cL", "$63$ cL", "$65{,}7$ cL"], bonne: 0, explication: "$600 + 57$." },
    { question: "$1$ L $=$", choix: ["$100$ cL", "$10$ cL", "$1\\,000$ cL", "$1$ cL"], bonne: 0, explication: "Centi : un centième." },
    { question: "Choisis le bon signe : $6$ L $\\ldots$ $61$ dL", choix: ["$<$", "$>$", "$=$"], bonne: 0, explication: "$6$ L $= 60$ dL." },
    { question: "Choisis le bon signe : $3$ km $\\ldots$ $3\\,000$ m", choix: ["$=$", "$<$", "$>$"], bonne: 0, explication: "$1$ km $= 1\\,000$ m." },
    { question: "Quelle unité pour la masse d'un camion ?", choix: ["la tonne", "le gramme", "le milligramme", "le litre"], bonne: 0, explication: "C'est très lourd." },
    { question: "Quelle unité pour la contenance d'une cuillère ?", choix: ["le millilitre", "l'hectolitre", "le kilomètre", "la tonne"], bonne: 0, explication: "C'est tout petit." },
    { question: "Un rectangle mesure $31$ m sur $24$ m. Son périmètre :", choix: ["$110$ m", "$55$ m", "$744$ m", "$86$ m"], bonne: 0, explication: "$31 + 24 + 31 + 24$." },
    { question: "Un carré a un périmètre de $36$ cm. Son côté :", choix: ["$9$ cm", "$6$ cm", "$18$ cm", "$144$ cm"], bonne: 0, explication: "$36 \\div 4$." },
    { question: "$2$ t $=$", choix: ["$2\\,000$ kg", "$200$ kg", "$20$ kg", "$20\\,000$ kg"], bonne: 0, explication: "$1$ t $= 1\\,000$ kg." },
    { question: "$5$ hL $=$", choix: ["$500$ L", "$50$ L", "$5\\,000$ L", "$5$ L"], bonne: 0, explication: "$1$ hL $= 100$ L." },
    { question: "Quelle longueur est la plus grande ?", choix: ["$2$ km", "$1\\,900$ m", "$15\\,000$ cm", "$190$ dm"], bonne: 0, explication: "$2$ km $= 2\\,000$ m ; $15\\,000$ cm $= 150$ m ; $190$ dm $= 19$ m." },
    { question: "$3$ m $5$ cm $=$", choix: ["$305$ cm", "$35$ cm", "$350$ cm", "$3\\,005$ cm"], bonne: 0, explication: "$300 + 5$." },
    { question: "Une bouteille de $1{,}5$ L contient :", choix: ["$150$ cL", "$15$ cL", "$1\\,500$ cL", "$105$ cL"], bonne: 0, explication: "$1$ L $= 100$ cL et $0{,}5$ L $= 50$ cL." },
    { question: "Le périmètre d'un triangle de côtés $5$ cm, $7$ cm et $8$ cm est :", choix: ["$20$ cm", "$280$ cm", "$15$ cm", "$12$ cm"], bonne: 0, explication: "$5 + 7 + 8$." }
  ],
  methode: [
    { titre: "Convertir sans tableau", etapes: ["Écris la relation entre les deux unités (ex. : $1$ m $= 100$ cm).", "Multiplie le nombre par ce rapport.", "Vérifie : une unité plus petite donne un nombre plus grand."], exemple: "$18$ m $= 18 \\times 100$ cm $= 1\\,800$ cm." },
    { titre: "Calculer le périmètre d'un rectangle", etapes: ["Repère la longueur et la largeur, dans la même unité.", "Ajoute les quatre côtés (ou longueur + largeur, puis double).", "N'oublie pas l'unité."], exemple: "$(31 + 24) \\times 2 = 110$ m." }
  ],
  erreurs: ["Se tromper de relation : $1$ m $= 10$ cm (faux).", "Comparer $6$ L et $61$ dL sans convertir.", "Oublier deux côtés du rectangle.", "Donner un nombre plus petit en passant à une unité plus petite."]
};
