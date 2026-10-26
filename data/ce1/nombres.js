/*
  CHAPITRE : CE1 — Les nombres jusqu'à 1 000
  -------------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE1, « Les nombres entiers » :
  - dénombrer et construire des collections organisées en centaines, dizaines et unités (y compris « 17 unités, 8 dizaines
    et 2 centaines ») ; relations entre unités, dizaines et centaines ;
  - suites écrite et orale jusqu'à mille ; écritures d'un nombre : matériel, chiffres, lettres, unités de numération,
    (6 × 100) + (3 × 10) + (5 × 1), décomposition additive ; valeur d'un chiffre selon sa position.
  figure : FIGURES de assets/exercices-ce1.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce1-nombres"] = {
  niveau: "CE1",
  numero: 1,
  titre: "Les nombres jusqu'à 1 000",
  accroche: "Les centaines arrivent : faire des paquets de cent, lire et écrire les nombres jusqu'à $1\\,000$ de plusieurs façons.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Unités, dizaines, centaines",
      video: { titre: "Vidéo de Maître Lucas : les centaines, lire et écrire les nombres de 100 à 999", youtube: "https://youtu.be/yzeF5zduj4A" },
      texte:
        "- $10$ unités font $1$ **dizaine**.\n" +
        "- $10$ dizaines font $1$ **centaine** : $100$.\n" +
        "- $10$ centaines font $1\\,000$ (mille).\n\n" +
        "Sur le dessin : $2$ plaques de cent, $4$ barres de dix et $7$ cubes, c'est $200 + 40 + 7 = 247$.\n\n" +
        "Dans $247$ : $2$ est le chiffre des centaines, $4$ celui des dizaines, $7$ celui des unités.",
      figure: "e1n-cours-paquets",
      exemple: {
        enonce: "Quel nombre fait $2$ centaines, $27$ dizaines et $14$ unités ?",
        solution: "$200 + 270 + 14 = 484$."
      }
    },
    {
      titre: "Plusieurs écritures d'un même nombre",
      video: { titre: "Vidéo de « Cheddar & Mimolette » : décomposer un nombre en centaines, dizaines et unités", youtube: "https://youtu.be/fYpLrAsDWDQ" },
      texte:
        "Le nombre $635$ peut s'écrire :\n\n" +
        "- $6$ centaines, $3$ dizaines et $5$ unités ;\n" +
        "- $63$ dizaines et $5$ unités, ou $635$ unités ;\n" +
        "- $600 + 30 + 5$ ;\n" +
        "- $(6 \\times 100) + (3 \\times 10) + (5 \\times 1)$ ;\n" +
        "- en lettres : six-cent-trente-cinq.",
      exemple: {
        enonce: "Combien y a-t-il de dizaines en tout dans $428$ ?",
        solution: "$428 = 42$ dizaines et $8$ unités : $42$ dizaines."
      }
    },
    {
      titre: "Lire et écrire les nombres en lettres",
      video: { titre: "Vidéo de Pass Education : lire et écrire les nombres jusqu'à 99", youtube: "https://youtu.be/yesVg-ZCbVE" },
      texte:
        "On lit d'abord les centaines, puis le reste :\n\n" +
        "- $300$ : trois-cents ; $308$ : trois-cent-huit ;\n" +
        "- $571$ : cinq-cent-soixante-et-onze ;\n" +
        "- $1\\,000$ : mille.\n\n" +
        "« Cent » prend un **s** quand il est multiplié et qu'il termine le nombre : deux-cents, mais deux-cent-trois. On met des traits d'union entre tous les mots.",
      exemple: {
        enonce: "Écris en chiffres : quatre-cent-quatre-vingt-dix.",
        solution: "Quatre-cents ($400$) et quatre-vingt-dix ($90$) : $490$."
      }
    }
  ],

  exercices: [
    { type: "e1n-denombrer", titre: "Centaines, dizaines, unités", etape: "Comprendre les nombres", nb: 6 },
    { type: "e1n-chiffres", titre: "La valeur des chiffres", etape: "Comprendre les nombres", nb: 6 },
    { type: "e1n-lettres", titre: "Lire et écrire en lettres", etape: "Lire et écrire", nb: 6 }
  ],

  qcm: [
    { question: "Combien y a-t-il de cubes ?", figure: "e1n-qcm-paquets", choix: ["$305$", "$35$", "$350$", "$8$"], bonne: 0, explication: "$3$ plaques ($300$) et $5$ cubes : $305$." },
    { question: "$10$ dizaines, c'est :", choix: ["$1$ centaine", "$1$ unité", "$10$ unités", "$1\\,000$"], bonne: 0, explication: "$10 \\times 10 = 100$." },
    { question: "Dans $473$, le chiffre des centaines est :", choix: ["$4$", "$7$", "$3$", "$400$"], bonne: 0, explication: "Le chiffre de gauche : $4$." },
    { question: "Dans $806$, le chiffre des dizaines est :", choix: ["$0$", "$8$", "$6$", "$80$"], bonne: 0, explication: "$806$ : $8$ centaines, $0$ dizaine, $6$ unités." },
    { question: "$5$ centaines, $2$ dizaines et $9$ unités, c'est :", choix: ["$529$", "$925$", "$16$", "$5\\,209$"], bonne: 0, explication: "$500 + 20 + 9 = 529$." },
    { question: "$4$ unités, $7$ centaines et $1$ dizaine, c'est :", choix: ["$714$", "$471$", "$417$", "$12$"], bonne: 0, explication: "Centaines $7$, dizaines $1$, unités $4$ : $714$." },
    { question: "$3$ centaines et $15$ dizaines, c'est :", choix: ["$450$", "$315$", "$3\\,150$", "$18$"], bonne: 0, explication: "$300 + 150 = 450$." },
    { question: "Combien de dizaines en tout dans $560$ ?", choix: ["$56$", "$6$", "$5$", "$560$"], bonne: 0, explication: "$560 = 56$ dizaines." },
    { question: "$(2 \\times 100) + (9 \\times 10) + 4 = $", choix: ["$294$", "$2\\,094$", "$15$", "$492$"], bonne: 0, explication: "$200 + 90 + 4 = 294$." },
    { question: "« Six-cent-quatre » s'écrit :", choix: ["$604$", "$6\\,004$", "$640$", "$64$"], bonne: 0, explication: "$600 + 4 = 604$." },
    { question: "« Huit-cent-soixante-dix » s'écrit :", choix: ["$870$", "$860$", "$8\\,070$", "$807$"], bonne: 0, explication: "$800 + 70 = 870$." },
    { question: "$300$ s'écrit en lettres :", choix: ["trois-cents", "trois-cent", "trente", "trois-mille"], bonne: 0, explication: "Cent prend un s quand il termine le nombre : trois-cents." },
    { question: "$215$ s'écrit en lettres :", choix: ["deux-cent-quinze", "deux-cents-quinze", "deux-cent-cinquante", "vingt-et-un-cinq"], bonne: 0, explication: "Pas de s à cent quand il est suivi d'un autre nombre." },
    { question: "Le nombre juste après $599$ est :", choix: ["$600$", "$5\\,910$", "$598$", "$500$"], bonne: 0, explication: "$599 + 1 = 600$." },
    { question: "$1\\,000$, c'est :", choix: ["$10$ centaines", "$100$ centaines", "$10$ dizaines", "$1$ centaine"], bonne: 0, explication: "$10 \\times 100 = 1\\,000$." },
    { question: "Pour avoir $340$ timbres en carnets de $10$, il faut :", choix: ["$34$ carnets", "$4$ carnets", "$340$ carnets", "$3$ carnets"], bonne: 0, explication: "$340 = 34$ dizaines." },
    { question: "$700 + 50 + 3 = $", choix: ["$753$", "$7\\,503$", "$735$", "$75$"], bonne: 0, explication: "$7$ centaines, $5$ dizaines, $3$ unités." },
    { question: "Le nombre qui a $9$ centaines, $0$ dizaine et $0$ unité est :", choix: ["$900$", "$9$", "$90$", "$9\\,000$"], bonne: 0, explication: "$9 \\times 100 = 900$." }
  ],

  methode: [
    {
      titre: "Écrire un nombre avec centaines, dizaines et unités",
      etapes: [
        "Transforme chaque morceau en nombre : centaines × $100$, dizaines × $10$.",
        "S'il y a plus de $9$ dizaines ou unités, ce n'est pas grave : additionne.",
        "Fais la somme."
      ],
      figure: "e1n-methode-paquets",
      exemple: "$1$ centaine, $6$ dizaines, $3$ unités : $100 + 60 + 3 = 163$."
    },
    {
      titre: "Écrire en chiffres un nombre dicté",
      etapes: [
        "Écoute les centaines : c'est le premier chiffre.",
        "Écoute la fin (de $0$ à $99$) : ce sont les deux derniers chiffres.",
        "S'il n'y a pas de dizaines, écris un $0$ au milieu."
      ],
      exemple: "Cinq-cent-sept : $5$ centaines, $0$ dizaine, $7$ unités → $507$."
    }
  ],
  erreurs: [
    "Coller les nombres entendus : « deux-cent-trois » s'écrit $203$, pas $2003$.",
    "Oublier le $0$ des dizaines : $507$ et pas $57$.",
    "Confondre le chiffre des dizaines ($4$ dans $247$) et le nombre de dizaines ($24$).",
    "Écrire « deux-cents-trois » : cent ne prend pas de s s'il est suivi d'un nombre.",
    "Garder plus de $9$ dizaines sans les regrouper en centaines."
  ]
};
