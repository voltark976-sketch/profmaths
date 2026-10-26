/*
  CHAPITRE : CE1 — La monnaie
  ----------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE1, « La monnaie » :
  - euros et centimes ; 1 € = 100 centimes ; comparer des sommes (valeur et non nombre de pièces) ; ordonner des prix ;
  - valeur d'un ensemble de pièces et de billets en euros et centimes ; écriture à virgule (2,17 € ; 2,05 € ; 2,50 € ; 0,85 €),
    sans parler de dixièmes ni de centièmes ;
  - simuler des achats, rendre la monnaie. Les réponses avec virgule sont annoncées (« écris avec une virgule »).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce1-monnaie"] = {
  niveau: "CE1",
  numero: 10,
  titre: "La monnaie",
  accroche: "Euros et centimes : compter une somme, l'écrire avec une virgule, payer et rendre la monnaie.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Euros et centimes",
      video: { titre: "Vidéo de Maître Lucas : euros et centimes", youtube: "https://youtu.be/0zHqdLLWD68" },
      texte:
        "Les **centimes** sont de petites pièces : $1$, $2$, $5$, $10$, $20$ et $50$ centimes.\n\n" +
        "**$100$ centimes $= 1$ euro.**\n\n" +
        "Sur la figure : $2$ € $+ 1$ € $= 3$ €, et $50 + 20 + 5 = 75$ centimes. En tout : $3$ euros et $75$ centimes.",
      figure: "e1e-cours-monnaie",
      exemple: {
        enonce: "Combien de pièces de $50$ centimes pour faire $1$ € ?",
        solution: "$50 + 50 = 100$ centimes : $2$ pièces."
      }
    },
    {
      titre: "L'écriture avec une virgule",
      video: { titre: "Vidéo de Béatrice Girard : euros et centimes, savoir payer", youtube: "https://youtu.be/jIbCdimoKb4" },
      texte:
        "On écrit les euros, une **virgule**, puis les centimes avec **deux chiffres** :\n\n" +
        "- $2$ € et $17$ centimes s'écrit $2{,}17$ € ;\n" +
        "- $2$ € et $5$ centimes s'écrit $2{,}05$ € (attention au $0$) ;\n" +
        "- $2$ € et $50$ centimes s'écrit $2{,}50$ € ;\n" +
        "- $85$ centimes s'écrit $0{,}85$ €.\n\n" +
        "$345$ centimes $= 300$ centimes $+ 45$ centimes $= 3$ € et $45$ centimes $= 3{,}45$ €.",
      exemple: {
        enonce: "Écris avec une virgule : $7$ euros et $8$ centimes.",
        solution: "$7{,}08$ €."
      }
    },
    {
      titre: "Payer et rendre la monnaie",
      video: { titre: "Vidéo de Maître Lucas : rendre la monnaie", youtube: "https://youtu.be/UHEzDyXuLqc" },
      texte:
        "Un cahier coûte $3{,}60$ € ; on paie avec un billet de $5$ €.\n\n" +
        "On complète : de $3{,}60$ € à $4$ €, il faut $40$ centimes ; de $4$ € à $5$ €, il faut $1$ €. On rend $1{,}40$ €.",
      exemple: {
        enonce: "Une glace coûte $2{,}50$ €. On paie avec $10$ €. Combien rend-on ?",
        solution: "De $2{,}50$ € à $3$ € : $50$ centimes ; de $3$ € à $10$ € : $7$ €. On rend $7{,}50$ €."
      }
    }
  ],

  exercices: [
    { type: "e1e-valeur", titre: "Compter une somme", etape: "Euros et centimes", nb: 5 },
    { type: "e1e-ecritures", titre: "Écrire une somme avec une virgule", etape: "Euros et centimes", nb: 6 },
    { type: "e1e-rendre", titre: "Rendre la monnaie", etape: "Acheter", nb: 5 }
  ],

  qcm: [
    { question: "Combien d'argent y a-t-il ?", figure: "e1e-qcm-monnaie", choix: ["$7{,}70$ €", "$5$ €", "$77$ €", "$7{,}07$ €"], bonne: 0, explication: "$5 + 2 = 7$ € et $50 + 10 + 10 = 70$ centimes." },
    { question: "$1$ € $=$", choix: ["$100$ centimes", "$10$ centimes", "$1\\,000$ centimes", "$50$ centimes"], bonne: 0, explication: "Cent centimes font un euro." },
    { question: "$2$ € et $5$ centimes s'écrit :", choix: ["$2{,}05$ €", "$2{,}5$ €", "$2{,}50$ €", "$25$ €"], bonne: 0, explication: "Deux chiffres pour les centimes : $05$." },
    { question: "$2$ € et $50$ centimes s'écrit :", choix: ["$2{,}50$ €", "$2{,}05$ €", "$250$ €", "$25$ €"], bonne: 0, explication: "$50$ centimes : $2{,}50$ €." },
    { question: "$85$ centimes s'écrit :", choix: ["$0{,}85$ €", "$85$ €", "$8{,}5$ €", "$0{,}085$ €"], bonne: 0, explication: "Moins d'un euro : $0$ euro et $85$ centimes." },
    { question: "$345$ centimes $=$", choix: ["$3{,}45$ €", "$34{,}5$ €", "$345$ €", "$0{,}345$ €"], bonne: 0, explication: "$300$ centimes $= 3$ €." },
    { question: "$4{,}07$ € se lit :", choix: ["$4$ euros et $7$ centimes", "$4$ euros et $70$ centimes", "$407$ euros", "$47$ centimes"], bonne: 0, explication: "Après la virgule : $07$ centimes." },
    { question: "Combien de pièces de $20$ centimes pour $1$ € ?", choix: ["$5$", "$20$", "$2$", "$10$"], bonne: 0, explication: "$5 \\times 20 = 100$." },
    { question: "Quel prix est le plus cher ?", choix: ["$3{,}50$ €", "$3{,}05$ €", "$2{,}99$ €", "$350$ centimes moins $1$ €"], bonne: 0, explication: "$3{,}50 > 3{,}05 > 2{,}99$, et $350 - 100 = 250$ centimes." },
    { question: "Un cahier coûte $3{,}60$ € ; on paie avec $5$ €. On rend :", choix: ["$1{,}40$ €", "$2{,}40$ €", "$1{,}60$ €", "$8{,}60$ €"], bonne: 0, explication: "$3{,}60 + 1{,}40 = 5$." },
    { question: "Trois pièces de $2$ € valent :", choix: ["$6$ €", "$3$ €", "$5$ €", "$2$ €"], bonne: 0, explication: "Ce qui compte, c'est la valeur : $2 + 2 + 2$." },
    { question: "$50$ c $+ 50$ c $=$", choix: ["$1$ €", "$100$ €", "$0{,}50$ €", "$10$ €"], bonne: 0, explication: "$100$ centimes $= 1$ €." },
    { question: "Une glace à $2{,}50$ € payée avec $10$ € : on rend", choix: ["$7{,}50$ €", "$8{,}50$ €", "$12{,}50$ €", "$7$ €"], bonne: 0, explication: "$2{,}50 + 7{,}50 = 10$." },
    { question: "$1{,}20$ € $+ 80$ centimes $=$", choix: ["$2$ €", "$1{,}100$ €", "$9{,}20$ €", "$1{,}28$ €"], bonne: 0, explication: "$20 + 80 = 100$ centimes $= 1$ €." },
    { question: "$600$ centimes $=$", choix: ["$6$ €", "$60$ €", "$0{,}60$ €", "$600$ €"], bonne: 0, explication: "$600 \\div 100 = 6$." },
    { question: "Dans $12{,}35$ €, le nombre d'euros est :", choix: ["$12$", "$35$", "$1\\,235$", "$3$"], bonne: 0, explication: "Avant la virgule : les euros." },
    { question: "Quelle pièce n'existe pas ?", choix: ["$3$ centimes", "$2$ centimes", "$5$ centimes", "$20$ centimes"], bonne: 0, explication: "Les pièces : $1$, $2$, $5$, $10$, $20$, $50$ centimes." },
    { question: "Il manque combien pour faire $1$ € avec $65$ centimes ?", choix: ["$35$ centimes", "$45$ centimes", "$65$ centimes", "$1$ €"], bonne: 0, explication: "$65 + 35 = 100$." }
  ],

  methode: [
    {
      titre: "Écrire une somme avec une virgule",
      etapes: [
        "Compte les euros (billets et pièces de $1$ € et $2$ €).",
        "Compte les centimes (moins de $100$).",
        "Écris : euros, virgule, centimes avec deux chiffres."
      ],
      exemple: "$4$ € et $6$ centimes → $4{,}06$ €."
    },
    {
      titre: "Rendre la monnaie",
      etapes: [
        "Complète d'abord jusqu'à l'euro suivant.",
        "Complète ensuite jusqu'à la somme donnée.",
        "Additionne ce que tu as ajouté."
      ],
      exemple: "$6{,}70$ € payé avec $10$ € : $30$ c puis $3$ €, on rend $3{,}30$ €."
    }
  ],
  erreurs: [
    "Écrire $2{,}5$ € pour $2$ € et $5$ centimes : c'est $2{,}05$ €.",
    "Compter le nombre de pièces au lieu de leur valeur.",
    "Croire que $1$ € $= 10$ centimes.",
    "Donner le prix au lieu de la monnaie rendue."
  ]
};
