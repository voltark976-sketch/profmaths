/*
  CHAPITRE : CM2 — Les opérations
  --------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : estimer le résultat d'une opération ; calculs avec une ou deux
  paires de parenthèses ; poser et effectuer la multiplication d'un nombre décimal par un nombre entier. Sans calculatrice.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-operations"] = {
  niveau: "CM2",
  numero: 5,
  titre: "Les opérations posées",
  accroche: "Multiplier un décimal par un entier, calculer avec des parenthèses, estimer un résultat.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Multiplier un décimal par un entier",
      video: { titre: "Vidéo de Maître Lucas : multiplier des nombres décimaux", youtube: "https://youtu.be/HccrdysR98o" },
      texte:
        "Pour $51{,}56 \\times 3$ :\n\n" +
        "- on calcule sans la virgule : $5\\,156 \\times 3 = 15\\,468$ ;\n" +
        "- $51{,}56$ a **deux chiffres après la virgule**, donc le résultat aussi : $154{,}68$.\n\n" +
        "$\\begin{array}{r} 51{,}56 \\\\ \\times\\;3 \\\\ \\hline 154{,}68 \\end{array}$\n\n" +
        "On vérifie avec un **ordre de grandeur** : $50 \\times 3 = 150$. ✔",
      exemple: { enonce: "$5$ bouteilles de jus à $1{,}45$ € : combien ?", solution: "$145 \\times 5 = 725$, donc $7{,}25$ €." }
    },
    {
      titre: "Parenthèses et ordre de grandeur",
      video: { titre: "Vidéo de Maître Lucas : les multiplications posées à plusieurs chiffres", youtube: "https://youtu.be/M6t154vbydA" },
      texte:
        "- On calcule d'abord **entre parenthèses** : $(11 + 9) \\times 8 = 20 \\times 8 = 160$.\n" +
        "- Avec deux paires : $(4 + 6) \\times (3 + 2) = 10 \\times 5 = 50$.\n" +
        "- Sans parenthèses, les **multiplications** passent avant les additions et les soustractions : $4 \\times 7 + 10 \\times 2 = 28 + 20 = 48$.\n\n" +
        "Un **ordre de grandeur** se calcule avec des nombres ronds : $48 \\times 96 \\approx 50 \\times 100 = 5\\,000$. Il permet de repérer une erreur de virgule ou de zéro.",
      exemple: { enonce: "Calcule $98 - (10 + 8)$.", solution: "$98 - 18 = 80$." }
    }
  ],
  exercices: [
    { type: "m2o-multiplier", titre: "Multiplier un décimal par un entier", etape: "Multiplier", nb: 6 },
    { type: "m2o-parentheses", titre: "Calculs avec parenthèses", etape: "Parenthèses", nb: 6 },
    { type: "m2o-estimer", titre: "Ordre de grandeur", etape: "Estimer", nb: 5 }
  ],
  qcm: [
    { question: "$51{,}56 \\times 3 =$", choix: ["$154{,}68$", "$15\\,468$", "$153{,}68$", "$1\\,546{,}8$"], bonne: 0, explication: "Deux chiffres après la virgule." },
    { question: "$1{,}45 \\times 5 =$", choix: ["$7{,}25$", "$72{,}5$", "$5{,}25$", "$6{,}45$"], bonne: 0, explication: "$145 \\times 5 = 725$." },
    { question: "$5{,}1 \\times 19 =$", choix: ["$96{,}9$", "$969$", "$95{,}9$", "$9{,}69$"], bonne: 0, explication: "$51 \\times 19 = 969$, un chiffre après la virgule." },
    { question: "$2{,}5 \\times 4 =$", choix: ["$10$", "$8{,}20$", "$100$", "$1$"], bonne: 0, explication: "$25 \\times 4 = 100$ dixièmes." },
    { question: "$0{,}3 \\times 6 =$", choix: ["$1{,}8$", "$0{,}18$", "$18$", "$0{,}9$"], bonne: 0, explication: "$3 \\times 6 = 18$ dixièmes." },
    { question: "$(11 + 9) \\times 8 =$", choix: ["$160$", "$83$", "$88$", "$152$"], bonne: 0, explication: "$20 \\times 8$." },
    { question: "$4 \\times 7 + 10 \\times 2 =$", choix: ["$48$", "$580$", "$76$", "$38$"], bonne: 0, explication: "$28 + 20$." },
    { question: "$(4 + 6) \\times (3 + 2) =$", choix: ["$50$", "$32$", "$29$", "$60$"], bonne: 0, explication: "$10 \\times 5$." },
    { question: "$98 - (10 + 8) =$", choix: ["$80$", "$96$", "$106$", "$70$"], bonne: 0, explication: "$98 - 18$." },
    { question: "$50 - 4 \\times 5 =$", choix: ["$30$", "$230$", "$46$", "$20$"], bonne: 0, explication: "$50 - 20$." },
    { question: "Un ordre de grandeur de $48 \\times 96$ :", choix: ["$5\\,000$", "$500$", "$50\\,000$", "$150$"], bonne: 0, explication: "$50 \\times 100$." },
    { question: "Un ordre de grandeur de $47{,}76 \\times 7$ :", choix: ["$350$", "$35$", "$3\\,500$", "$55$"], bonne: 0, explication: "$50 \\times 7$." },
    { question: "Moussa trouve $3\\,346{,}2$ pour $47{,}8 \\times 7$. Que penser ?", choix: ["Erreur de virgule : il faut environ $350$", "C'est juste", "Il faut environ $35$", "On ne peut pas savoir"], bonne: 0, explication: "$50 \\times 7 = 350$ ; le bon résultat est $334{,}6$." },
    { question: "Pour $23{,}45 \\times 6$, on calcule d'abord :", choix: ["$2\\,345 \\times 6$", "$23 \\times 6$ seulement", "$45 \\times 6$ seulement", "$23 + 45$"], bonne: 0, explication: "Puis on place la virgule." },
    { question: "Combien de chiffres après la virgule dans $3{,}75 \\times 8$ (avant de simplifier) ?", choix: ["$2$", "$1$", "$3$", "$0$"], bonne: 0, explication: "Comme dans $3{,}75$ : $30{,}00 = 30$." },
    { question: "$12 \\times 1{,}5 =$", choix: ["$18$", "$13{,}5$", "$12{,}5$", "$180$"], bonne: 0, explication: "$12 + 6$." },
    { question: "$(20 - 5) \\times (2 + 1) =$", choix: ["$45$", "$18$", "$33$", "$17$"], bonne: 0, explication: "$15 \\times 3$." },
    { question: "$3$ cahiers à $2{,}35$ € coûtent :", choix: ["$7{,}05$ €", "$6{,}105$ €", "$6{,}95$ €", "$70{,}5$ €"], bonne: 0, explication: "$235 \\times 3 = 705$." }
  ],
  methode: [
    { titre: "Multiplier un décimal par un entier", etapes: ["Fais un ordre de grandeur.", "Calcule le produit sans t'occuper de la virgule.", "Place la virgule : autant de chiffres après la virgule que dans le nombre décimal.", "Compare avec l'ordre de grandeur."], exemple: "$51{,}56 \\times 3$ : $15\\,468$ → $154{,}68$ (proche de $150$)." }
  ],
  erreurs: ["Oublier la virgule dans le résultat.", "Calculer de gauche à droite sans tenir compte des parenthèses.", "Faire l'addition avant la multiplication dans $4 \\times 7 + 10 \\times 2$.", "Ne pas vérifier avec un ordre de grandeur."]
};
