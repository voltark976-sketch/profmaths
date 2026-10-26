/*
  CHAPITRE : CM2 — La division
  -----------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : division euclidienne posée (révision) ; divisions décimales
  avec un dividende entier et un diviseur à un chiffre ; avec un dividende décimal et un diviseur à un chiffre ;
  problèmes de partage et de groupement (interpréter le quotient et le reste).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-division"] = {
  niveau: "CM2",
  numero: 6,
  titre: "La division",
  accroche: "Division euclidienne et division décimale : continuer après la virgule.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "La division décimale d'un entier",
      video: { titre: "Vidéo de Maître Lucas : division décimale de deux entiers", youtube: "https://youtu.be/t5wwXy55Aws" },
      texte:
        "$47 \\div 4$ : la division euclidienne donne $47 = 4 \\times 11 + 3$. Mais on peut **continuer** !\n\n" +
        "- On écrit $47$ comme $47{,}00$ et on met une **virgule au quotient** quand on passe aux dixièmes.\n" +
        "- $3$ unités $= 30$ dixièmes : $30 \\div 4 = 7$, reste $2$ dixièmes.\n" +
        "- $2$ dixièmes $= 20$ centièmes : $20 \\div 4 = 5$, reste $0$.\n\n" +
        "Donc $47 \\div 4 = 11{,}75$. **Vérification** : $4 \\times 11{,}75 = 47$.",
      exemple: { enonce: "Calcule $9 \\div 2$.", solution: "$4$, reste $1$ ; $10$ dixièmes $\\div 2 = 5$ : $9 \\div 2 = 4{,}5$." }
    },
    {
      titre: "Diviser un décimal par un entier",
      video: { titre: "Vidéo de Maître Lucas : division d'un nombre décimal par un entier", youtube: "https://youtu.be/4oBxj-NrEr8" },
      texte:
        "$29{,}07 \\div 3$ : on divise comme d'habitude, et on place la virgule au quotient **au moment où on abaisse le chiffre des dixièmes**.\n\n" +
        "- $29 \\div 3 = 9$, reste $2$.\n" +
        "- On abaisse le $0$ (dixièmes) : virgule ! $20 \\div 3 = 6$, reste $2$.\n" +
        "- On abaisse le $7$ : $27 \\div 3 = 9$, reste $0$.\n\n" +
        "$29{,}07 \\div 3 = 9{,}69$.\n\n" +
        "Dans un problème, on se demande ce que représente le résultat : un prix ($9{,}69$ €) peut être décimal, mais pas un nombre de minibus !",
      exemple: { enonce: "$5$ amis partagent $26{,}4$ €. Combien chacun ?", solution: "$26{,}4 \\div 5 = 5{,}28$ €." }
    }
  ],
  exercices: [
    { type: "m2v-euclide", titre: "Division euclidienne", etape: "Euclidienne", nb: 5 },
    { type: "m2v-decimale", titre: "Division décimale", etape: "Décimale", nb: 6 },
    { type: "m2v-problemes", titre: "Problèmes de division", etape: "Problèmes", nb: 5 }
  ],
  qcm: [
    { question: "$47 \\div 4 =$", choix: ["$11{,}75$", "$11{,}3$", "$11$", "$12$"], bonne: 0, explication: "On continue après la virgule." },
    { question: "$9 \\div 2 =$", choix: ["$4{,}5$", "$4{,}1$", "$4$", "$5$"], bonne: 0, explication: "$10$ dixièmes $\\div 2 = 5$ dixièmes." },
    { question: "$29{,}07 \\div 3 =$", choix: ["$9{,}69$", "$9{,}609$", "$96{,}9$", "$9{,}7$"], bonne: 0, explication: "$3 \\times 9{,}69 = 29{,}07$." },
    { question: "$26{,}4 \\div 5 =$", choix: ["$5{,}28$", "$5{,}8$", "$52{,}8$", "$5{,}208$"], bonne: 0, explication: "$5 \\times 5{,}28 = 26{,}4$." },
    { question: "$15{,}08 \\div 4 =$", choix: ["$3{,}77$", "$3{,}707$", "$37{,}7$", "$3{,}02$"], bonne: 0, explication: "$4 \\times 3{,}77 = 15{,}08$." },
    { question: "Dans $15{,}08 \\div 4$, on écrit la virgule au quotient quand :", choix: ["on abaisse le chiffre des dixièmes", "on commence", "on a fini", "on abaisse le chiffre des centièmes"], bonne: 0, explication: "Les unités sont finies." },
    { question: "$5\\,781 \\div 4$ : quel est le reste de la division euclidienne ?", choix: ["$1$", "$3$", "$4$", "$0$"], bonne: 0, explication: "$4 \\times 1\\,445 = 5\\,780$." },
    { question: "$7 \\div 4 =$", choix: ["$1{,}75$", "$1{,}3$", "$1{,}4$", "$2$"], bonne: 0, explication: "$1$ reste $3$ ; $30 \\div 4 = 7$ reste $2$ ; $20 \\div 4 = 5$." },
    { question: "Pour vérifier $29{,}07 \\div 3 = 9{,}69$, on calcule :", choix: ["$3 \\times 9{,}69$", "$29{,}07 \\times 3$", "$9{,}69 - 3$", "$29{,}07 + 3$"], bonne: 0, explication: "On doit retrouver $29{,}07$." },
    { question: "Un ruban de $7{,}2$ m est coupé en $4$ morceaux égaux. Un morceau mesure :", choix: ["$1{,}8$ m", "$1{,}2$ m", "$28{,}8$ m", "$3{,}2$ m"], bonne: 0, explication: "$7{,}2 \\div 4$." },
    { question: "$643$ œufs en boîtes de $9$ : combien de boîtes pleines ?", choix: ["$71$", "$72$", "$4$", "$70$"], bonne: 0, explication: "$9 \\times 71 = 639$, reste $4$." },
    { question: "$130$ supporters, minibus de $8$ places. Combien de minibus au minimum ?", choix: ["$17$", "$16$", "$16{,}25$", "$18$"], bonne: 0, explication: "$16$ pleins, plus $1$ pour les $2$ derniers." },
    { question: "$12 \\div 5 =$", choix: ["$2{,}4$", "$2{,}2$", "$2$", "$2{,}5$"], bonne: 0, explication: "$2$ reste $2$ ; $20$ dixièmes $\\div 5 = 4$." },
    { question: "$0{,}9 \\div 3 =$", choix: ["$0{,}3$", "$3$", "$0{,}03$", "$0{,}6$"], bonne: 0, explication: "$9$ dixièmes $\\div 3 = 3$ dixièmes." },
    { question: "$4$ amis partagent $30$ €. Chacun reçoit :", choix: ["$7{,}50$ €", "$7{,}20$ €", "$7$ €", "$8$ €"], bonne: 0, explication: "$30 \\div 4 = 7{,}5$." },
    { question: "$6{,}3 \\div 7 =$", choix: ["$0{,}9$", "$9$", "$0{,}09$", "$1{,}1$"], bonne: 0, explication: "$63$ dixièmes $\\div 7 = 9$ dixièmes." },
    { question: "Dans une division euclidienne par $6$, le reste peut être :", choix: ["$5$", "$6$", "$7$", "$12$"], bonne: 0, explication: "Le reste est plus petit que le diviseur." },
    { question: "$100 \\div 8 =$", choix: ["$12{,}5$", "$12{,}4$", "$12$", "$13$"], bonne: 0, explication: "$8 \\times 12{,}5 = 100$." }
  ],
  methode: [
    { titre: "Poser une division décimale", etapes: ["Divise la partie entière comme une division euclidienne.", "Quand tu abaisses le chiffre des dixièmes (ou un $0$ ajouté), écris la virgule au quotient.", "Continue en ajoutant des zéros au dividende jusqu'à un reste nul.", "Vérifie : diviseur $\\times$ quotient $=$ dividende."], exemple: "$47 \\div 4 = 11{,}75$ ; $4 \\times 11{,}75 = 47$." }
  ],
  erreurs: ["Oublier la virgule au quotient.", "Écrire « $11$ reste $3$ » quand on demande un résultat décimal.", "Placer la virgule trop tôt ou trop tard.", "Donner un nombre décimal de minibus ou de boîtes."]
};
