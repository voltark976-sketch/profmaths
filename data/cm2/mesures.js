/*
  CHAPITRE : CM2 — Longueurs, masses, contenances
  ------------------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : renforcer les unités de longueur, masse, contenance ;
  convertir avec des nombres décimaux en s'appuyant sur les relations entre unités (« 3,5 m = 350 cm car 1 m = 100 cm »),
  sans tableau de conversion ; estimer des mesures ; périmètres (pas de formule à mémoriser : le périmètre du carré est
  le quadruple du côté) ; problèmes.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-mesures"] = {
  niveau: "CM2",
  numero: 10,
  titre: "Mesures et conversions",
  accroche: "Convertir avec des décimaux, estimer une mesure, calculer des périmètres.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Convertir avec des décimaux",
      video: { titre: "Vidéo de Maître Lucas : utiliser les nombres décimaux pour exprimer une mesure", youtube: "https://youtu.be/yKq4EgVETTI" },
      texte:
        "On s'appuie sur les **relations entre unités** :\n\n" +
        "- $3{,}5$ m $= 350$ cm, car $1$ m $= 100$ cm : $3{,}5 \\times 100 = 350$.\n" +
        "- $2\\,350$ g $= 2{,}35$ kg, car $1$ kg $= 1\\,000$ g : $2\\,350 \\div 1\\,000 = 2{,}35$.\n" +
        "- $75$ cL $= 0{,}75$ L, car $1$ L $= 100$ cL.\n" +
        "- $2$ L $13$ cL $= 2{,}13$ L.\n\n" +
        "Vers une unité **plus petite**, le nombre devient **plus grand** (on multiplie) ; vers une unité plus grande, il devient plus petit (on divise).",
      exemple: { enonce: "Complète : $1{,}2$ km $=$ … m.", solution: "$1{,}2 \\times 1\\,000 = 1\\,200$ m." }
    },
    {
      titre: "Estimer et calculer des périmètres",
      video: { titre: "Vidéo de Maître Lucas : unités de mesure de longueur (CM1-CM2)", youtube: "https://youtu.be/sMClfLc6Zf0" },
      texte:
        "**Estimer** : une porte mesure environ $2$ m ; un bébé pèse environ $3$ kg ; une canette contient $33$ cL ; la barge relie Mamoudzou à Dzaoudzi en un peu plus de $3$ km.\n\n" +
        "**Périmètre** : c'est la longueur du tour.\n\n" +
        "- Carré : $4$ fois le côté : côté $6{,}8$ cm → $27{,}2$ cm.\n" +
        "- Rectangle : longueur $+$ largeur, puis le double.\n" +
        "- Polygone : on additionne tous les côtés.",
      exemple: { enonce: "Un rectangle de $4{,}5$ m sur $2{,}3$ m : périmètre ?", solution: "$4{,}5 + 2{,}3 = 6{,}8$ ; $2 \\times 6{,}8 = 13{,}6$ m." }
    }
  ],
  exercices: [
    { type: "m2l-convertir", titre: "Convertir des mesures", etape: "Convertir", nb: 6 },
    { type: "m2l-estimer", titre: "Estimer une mesure", etape: "Estimer", nb: 5 },
    { type: "m2l-perimetre", titre: "Périmètres", etape: "Périmètres", nb: 5 }
  ],
  qcm: [
    { question: "$3{,}5$ m $=$", choix: ["$350$ cm", "$35$ cm", "$3\\,500$ cm", "$3{,}50$ cm"], bonne: 0, explication: "$1$ m $= 100$ cm." },
    { question: "$2\\,350$ g $=$", choix: ["$2{,}35$ kg", "$23{,}5$ kg", "$235$ kg", "$0{,}235$ kg"], bonne: 0, explication: "$1$ kg $= 1\\,000$ g." },
    { question: "$75$ cL $=$", choix: ["$0{,}75$ L", "$7{,}5$ L", "$75$ L", "$0{,}075$ L"], bonne: 0, explication: "$1$ L $= 100$ cL." },
    { question: "$1{,}2$ km $=$", choix: ["$1\\,200$ m", "$120$ m", "$12$ m", "$12\\,000$ m"], bonne: 0, explication: "$1$ km $= 1\\,000$ m." },
    { question: "$2$ L $13$ cL $=$", choix: ["$2{,}13$ L", "$2{,}013$ L", "$213$ L", "$21{,}3$ L"], bonne: 0, explication: "$13$ cL $= 0{,}13$ L." },
    { question: "$4$ kg $50$ g $=$", choix: ["$4{,}05$ kg", "$4{,}5$ kg", "$4{,}050$ g", "$45$ kg"], bonne: 0, explication: "$50$ g $= 0{,}05$ kg." },
    { question: "$0{,}5$ t $=$", choix: ["$500$ kg", "$50$ kg", "$5\\,000$ kg", "$5$ kg"], bonne: 0, explication: "$1$ t $= 1\\,000$ kg." },
    { question: "$85$ mm $=$", choix: ["$8{,}5$ cm", "$0{,}85$ cm", "$850$ cm", "$85$ cm"], bonne: 0, explication: "$1$ cm $= 10$ mm." },
    { question: "La longueur d'une voiture :", choix: ["$4{,}5$ m", "$4{,}5$ km", "$45$ cm", "$450$ m"], bonne: 0, explication: "Quelques mètres." },
    { question: "La masse d'une mangue :", choix: ["$300$ g", "$300$ kg", "$3$ g", "$30$ kg"], bonne: 0, explication: "Quelques centaines de grammes." },
    { question: "La contenance d'une canette :", choix: ["$33$ cL", "$33$ L", "$3{,}3$ mL", "$330$ L"], bonne: 0, explication: "Un tiers de litre environ." },
    { question: "Un carré de côté $6{,}8$ cm a un périmètre de :", choix: ["$27{,}2$ cm", "$13{,}6$ cm", "$46{,}24$ cm", "$24{,}8$ cm"], bonne: 0, explication: "$4 \\times 6{,}8$." },
    { question: "Un rectangle de $4{,}5$ m sur $2{,}3$ m a un périmètre de :", choix: ["$13{,}6$ m", "$6{,}8$ m", "$10{,}35$ m", "$11{,}6$ m"], bonne: 0, explication: "$2 \\times (4{,}5 + 2{,}3)$." },
    { question: "Un carré a un périmètre de $96$ cm. Son côté mesure :", choix: ["$24$ cm", "$48$ cm", "$32$ cm", "$92$ cm"], bonne: 0, explication: "$96 \\div 4$." },
    { question: "Pour passer de m à cm, on :", choix: ["multiplie par $100$", "divise par $100$", "multiplie par $10$", "ajoute deux zéros après la virgule"], bonne: 0, explication: "$1$ m $= 100$ cm." },
    { question: "Quelle mesure est la plus grande ?", choix: ["$1{,}5$ km", "$1\\,400$ m", "$15\\,000$ cm", "$140$ dam"], bonne: 0, explication: "$1\\,500$ m ; $1\\,400$ m ; $150$ m ; $1\\,400$ m." },
    { question: "$1$ L d'eau pèse environ :", choix: ["$1$ kg", "$1$ g", "$10$ kg", "$100$ g"], bonne: 0, explication: "Un repère utile pour estimer." },
    { question: "Un pentagone a des côtés de $3$, $4$, $5$, $6$ et $7$ cm. Son périmètre :", choix: ["$25$ cm", "$18$ cm", "$20$ cm", "$30$ cm"], bonne: 0, explication: "On additionne les cinq côtés." }
  ],
  methode: [
    { titre: "Convertir une mesure décimale", etapes: ["Écris la relation entre les deux unités.", "Vers une unité plus petite : multiplie ; vers une plus grande : divise.", "Déplace les chiffres du bon nombre de rangs (complète avec des zéros si besoin).", "Vérifie que le résultat est plausible."], exemple: "$2\\,350$ g en kg : $1$ kg $= 1\\,000$ g → $2\\,350 \\div 1\\,000 = 2{,}35$ kg." }
  ],
  erreurs: ["Multiplier au lieu de diviser (ou l'inverse).", "Écrire $2{,}013$ L pour $2$ L $13$ cL.", "Ajouter des zéros après la virgule pour multiplier par $100$.", "Ne pas vérifier si la mesure est plausible."]
};
