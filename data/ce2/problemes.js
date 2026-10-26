/*
  CHAPITRE : CE2 — Résoudre des problèmes
  ----------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE2 : problèmes additifs en deux étapes ; problèmes multiplicatifs en
  une étape (tout, nombre de parts, valeur d'une part) ; problèmes de comparaison multiplicative (« fois plus », « fois moins »)
  distingués de « de plus », « de moins » ; problèmes de produits cartésiens (habiller une poupée : 3 pantalons et 7 tee-shirts) ;
  problèmes mêlant les opérations (4 tables de 6 et 7 tables de 4).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce2-problemes"] = {
  niveau: "CE2",
  numero: 8,
  titre: "Résoudre des problèmes",
  accroche: "Problèmes en plusieurs étapes, « fois plus » et « fois moins », et compter toutes les combinaisons.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Problèmes en plusieurs étapes",
      video: { titre: "Vidéo de Maître Lucas : les étapes pour résoudre des problèmes", youtube: "https://youtu.be/_f0zWAdvq7c" },
      texte:
        "On découpe le problème en petites questions.\n\n" +
        "« Un restaurant a $4$ tables de $6$ personnes et $7$ tables de $4$ personnes. Combien de clients peut-il recevoir ? »\n\n" +
        "- Tables de $6$ : $4 \\times 6 = 24$.\n" +
        "- Tables de $4$ : $7 \\times 4 = 28$.\n" +
        "- En tout : $24 + 28 = 52$ clients.",
      exemple: { enonce: "On achète $3$ ananas à $4$ € et $2$ régimes de bananes à $6$ €. Prix total ?", solution: "$12 + 12 = 24$ €." }
    },
    {
      titre: "« Fois plus » et « fois moins »",
      video: { titre: "Vidéo de Maître Lucas : résoudre des problèmes", youtube: "https://youtu.be/p39NsvRlHEU" },
      texte:
        "- « $4$ fois plus cher qu'un casque à $25$ € » : $4 \\times 25 = 100$ €.\n" +
        "- « $3$ fois moins de billes que $36$ » : $36 \\div 3 = 12$ billes.\n\n" +
        "Attention : « $4$ de plus », c'est $+ 4$ ; « $4$ fois plus », c'est $\\times 4$.",
      exemple: { enonce: "Awa a $8$ ans. Sa mère a $4$ fois plus. Quel âge a sa mère ?", solution: "$4 \\times 8 = 32$ ans." }
    },
    {
      titre: "Toutes les combinaisons",
      video: { titre: "Vidéo de Nathan Primaire : apprendre à chercher (problèmes)", youtube: "https://youtu.be/MwdziNgFnuA" },
      texte:
        "« Une poupée a $3$ pantalons et $7$ tee-shirts. De combien de façons peut-on l'habiller ? »\n\n" +
        "On fait un tableau : $3$ lignes (pantalons) et $7$ colonnes (tee-shirts). Chaque case est une tenue : $3 \\times 7 = 21$ façons.",
      exemple: { enonce: "$4$ entrées et $3$ desserts : combien de menus « entrée + dessert » ?", solution: "$4 \\times 3 = 12$ menus." }
    }
  ],
  exercices: [
    { type: "e2r-etapes", titre: "Problèmes en plusieurs étapes", etape: "Problèmes", nb: 5 },
    { type: "e2r-fois", titre: "Fois plus, fois moins, combinaisons", etape: "Problèmes", nb: 6 },
    { type: "e2r-partage", titre: "Partages et groupements", etape: "Problèmes", nb: 5 }
  ],
  qcm: [
    { question: "Un casque coûte $25$ €. Un vélo coûte $4$ fois plus cher. Le vélo coûte :", choix: ["$100$ €", "$29$ €", "$21$ €", "$125$ €"], bonne: 0, explication: "$4 \\times 25$." },
    { question: "Saïd a $36$ billes, Inaya $3$ fois moins. Inaya a :", choix: ["$12$ billes", "$33$ billes", "$108$ billes", "$39$ billes"], bonne: 0, explication: "$36 \\div 3$." },
    { question: "« $5$ fois plus » veut dire :", choix: ["multiplier par $5$", "ajouter $5$", "enlever $5$", "diviser par $5$"], bonne: 0, explication: "Fois : multiplication." },
    { question: "« $6$ de moins » veut dire :", choix: ["enlever $6$", "diviser par $6$", "multiplier par $6$", "ajouter $6$"], bonne: 0, explication: "De moins : soustraction." },
    { question: "$3$ pantalons et $7$ tee-shirts : combien de tenues ?", choix: ["$21$", "$10$", "$4$", "$37$"], bonne: 0, explication: "$3 \\times 7$." },
    { question: "$4$ tables de $6$ et $7$ tables de $4$ : combien de places ?", choix: ["$52$", "$21$", "$48$", "$24$"], bonne: 0, explication: "$24 + 28$." },
    { question: "$5$ ananas à $3$ € et $2$ papayes à $4$ € coûtent :", choix: ["$23$ €", "$14$ €", "$20$ €", "$35$ €"], bonne: 0, explication: "$15 + 8$." },
    { question: "$4$ bus de $50$ places pour $183$ élèves : places libres ?", choix: ["$17$", "$200$", "$133$", "$27$"], bonne: 0, explication: "$200 - 183$." },
    { question: "Un camion a $1\\,500$ kg ; il livre $600$ kg puis $400$ kg. Il reste :", choix: ["$500$ kg", "$900$ kg", "$1\\,100$ kg", "$1\\,000$ kg"], bonne: 0, explication: "$1\\,500 - 1\\,000$." },
    { question: "Awa a $9$ ans, son père $4$ fois plus. Il a :", choix: ["$36$ ans", "$13$ ans", "$49$ ans", "$27$ ans"], bonne: 0, explication: "$4 \\times 9$." },
    { question: "$2$ casquettes et $5$ paires de lunettes : combien d'associations ?", choix: ["$10$", "$7$", "$25$", "$3$"], bonne: 0, explication: "$2 \\times 5$." },
    { question: "$48$ élèves en équipes de $6$ :", choix: ["$8$ équipes", "$42$ équipes", "$54$ équipes", "$6$ équipes"], bonne: 0, explication: "$48 \\div 6$." },
    { question: "Un livre coûte $8$ €, un jeu $3$ fois plus. Le jeu coûte :", choix: ["$24$ €", "$11$ €", "$5$ €", "$83$ €"], bonne: 0, explication: "$3 \\times 8$." },
    { question: "La tour fait $60$ m, la maison $5$ fois moins. La maison fait :", choix: ["$12$ m", "$55$ m", "$300$ m", "$65$ m"], bonne: 0, explication: "$60 \\div 5$." },
    { question: "Pour trouver toutes les combinaisons, on peut faire :", choix: ["un tableau", "une soustraction", "une horloge", "un patron"], bonne: 0, explication: "Une ligne par choix, une colonne par l'autre." },
    { question: "Kamal a $40$ €. Il achète $3$ livres à $9$ €. Il lui reste :", choix: ["$13$ €", "$27$ €", "$31$ €", "$37$ €"], bonne: 0, explication: "$40 - 27$." },
    { question: "$6$ boîtes de $12$ œufs, c'est :", choix: ["$72$ œufs", "$18$ œufs", "$612$ œufs", "$62$ œufs"], bonne: 0, explication: "$6 \\times 12$." },
    { question: "Mangues : $5$ € le kilo. Combien pour $7$ kilos ?", choix: ["$35$ €", "$12$ €", "$57$ €", "$30$ €"], bonne: 0, explication: "$7 \\times 5$." }
  ],
  methode: [
    { titre: "Résoudre un problème en plusieurs étapes", etapes: ["Repère la question finale.", "Cherche ce qu'il faut calculer d'abord (une question intermédiaire).", "Fais les calculs dans l'ordre, puis réponds par une phrase."], exemple: "Prix des ananas, prix des bananes, puis total." }
  ],
  erreurs: ["Confondre « fois plus » et « de plus ».", "Oublier une étape.", "Additionner les choix au lieu de les multiplier dans un problème de combinaisons.", "Pour « fois moins », soustraire au lieu de diviser."]
};
