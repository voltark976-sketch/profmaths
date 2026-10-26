/*
  CHAPITRE : CE1 — La multiplication
  -----------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE1 :
  - comprendre et utiliser le symbole × (lu « fois ») ; « 7 × 20 », c'est 20 ajouté 7 fois ;
  - la multiplication est commutative (8 colonnes de 4 = 4 rangées de 8) ;
  - connaitre dans les deux sens les tables de multiplication (A × B = C, A et B de 0 à 10).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce1-multiplication"] = {
  niveau: "CE1",
  numero: 6,
  titre: "La multiplication",
  accroche: "Le signe $\\times$, « fois » : compter vite des groupes égaux et apprendre les tables.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Le signe $\\times$",
      video: { titre: "Vidéo de Maître Lucas : le sens de la multiplication", youtube: "https://youtu.be/z97YBO49dL0" },
      texte:
        "Jan a $7$ paquets de $20$ biscuits. Il a « $7$ fois $20$ » biscuits.\n\n" +
        "On écrit $7 \\times 20$ et on lit « sept fois vingt ». C'est plus court que $20 + 20 + 20 + 20 + 20 + 20 + 20$.\n\n" +
        "$7 \\times 20 = 140$ biscuits.",
      exemple: {
        enonce: "Écris avec le signe $\\times$ : $5 + 5 + 5 + 5$.",
        solution: "Le nombre $5$ est écrit $4$ fois : $4 \\times 5 = 20$."
      }
    },
    {
      titre: "On peut échanger les nombres",
      video: { titre: "Vidéo de Maître Lucas : débuter la multiplication", youtube: "https://youtu.be/YLnEHg9umr4" },
      texte:
        "Dans le potager, il y a $4$ rangées de $8$ salades. On peut aussi voir $8$ colonnes de $4$ salades.\n\n" +
        "$4 \\times 8 = 8 \\times 4 = 32$ : dans une multiplication, **l'ordre des nombres ne change pas le résultat**.\n\n" +
        "C'est pratique : $2 \\times 9$, c'est comme $9 \\times 2$, le double de $9$.",
      figure: "e1m-cours-rangees",
      exemple: {
        enonce: "Complète : $6 \\times 3 = 3 \\times \\ldots$",
        solution: "$6 \\times 3 = 3 \\times 6 = 18$."
      }
    },
    {
      titre: "Les tables de multiplication",
      video: { titre: "Vidéo de Maître Lucas : la table de 2 et la table de 4", youtube: "https://youtu.be/6zz7rz6DTtw" },
      texte:
        "Il faut connaître les tables de $0$ à $10$ dans les deux sens : $5 \\times 3 = \\ldots$, mais aussi $4 \\times \\ldots = 12$.\n\n" +
        "Des astuces :\n\n" +
        "- $\\times 1$ : le nombre ne change pas ; $\\times 0$ : on trouve $0$ ;\n" +
        "- $\\times 2$ : c'est le double ; $\\times 4$ : le double du double ;\n" +
        "- $\\times 10$ : on ajoute un $0$ à droite ($7 \\times 10 = 70$) ;\n" +
        "- $\\times 5$ : la moitié de $\\times 10$ ($6 \\times 5 = 30$).",
      exemple: {
        enonce: "Complète : $\\ldots \\times 6 = 24$.",
        solution: "$4 \\times 6 = 24$."
      }
    }
  ],

  exercices: [
    { type: "e1m-sens", titre: "Comprendre le signe ×", etape: "Le sens", nb: 6 },
    { type: "e1m-astuces", titre: "Les astuces : × 0, × 1, × 2, × 4, × 5, × 10", etape: "Les tables", nb: 6 },
    { type: "e1m-tables", titre: "Les tables de multiplication", etape: "Les tables", nb: 8 }
  ],

  qcm: [
    { question: "« $6$ fois $4$ » s'écrit :", choix: ["$6 \\times 4$", "$6 + 4$", "$64$", "$6 - 4$"], bonne: 0, explication: "« fois » se note $\\times$." },
    { question: "$3 + 3 + 3 + 3 + 3 = $", choix: ["$5 \\times 3$", "$3 \\times 3$", "$5 + 3$", "$3 \\times 15$"], bonne: 0, explication: "Le nombre $3$ écrit $5$ fois." },
    { question: "Combien de ronds ?", figure: "e1m-qcm-rangees", choix: ["$18$", "$9$", "$36$", "$12$"], bonne: 0, explication: "$3$ rangées de $6$ : $3 \\times 6 = 18$." },
    { question: "$7 \\times 4 = 4 \\times \\ldots$", choix: ["$7$", "$4$", "$28$", "$11$"], bonne: 0, explication: "On peut échanger les nombres." },
    { question: "$9 \\times 2 = $", choix: ["$18$", "$11$", "$92$", "$16$"], bonne: 0, explication: "Le double de $9$." },
    { question: "$5 \\times 6 = $", choix: ["$30$", "$11$", "$56$", "$35$"], bonne: 0, explication: "Table de $5$." },
    { question: "$8 \\times 10 = $", choix: ["$80$", "$18$", "$810$", "$800$"], bonne: 0, explication: "$\\times 10$ : un zéro à droite." },
    { question: "$4 \\times \\ldots = 12$", choix: ["$3$", "$8$", "$48$", "$16$"], bonne: 0, explication: "$4 \\times 3 = 12$." },
    { question: "$\\ldots \\times 7 = 35$", choix: ["$5$", "$28$", "$42$", "$6$"], bonne: 0, explication: "$5 \\times 7 = 35$." },
    { question: "$0 \\times 9 = $", choix: ["$0$", "$9$", "$1$", "$90$"], bonne: 0, explication: "Zéro fois neuf, c'est zéro." },
    { question: "$1 \\times 8 = $", choix: ["$8$", "$1$", "$9$", "$0$"], bonne: 0, explication: "Une fois huit, c'est huit." },
    { question: "$3 \\times 9 = $", choix: ["$27$", "$12$", "$24$", "$39$"], bonne: 0, explication: "Table de $3$ : $27$." },
    { question: "$6 \\times 6 = $", choix: ["$36$", "$12$", "$66$", "$32$"], bonne: 0, explication: "Table de $6$." },
    { question: "$7$ paquets de $20$ biscuits :", choix: ["$7 \\times 20$", "$7 + 20$", "$20 - 7$", "$720$"], bonne: 0, explication: "$7$ fois $20$." },
    { question: "$4 \\times 8 = $", choix: ["$32$", "$12$", "$36$", "$48$"], bonne: 0, explication: "Double de $16$." },
    { question: "$10 = 2 \\times \\ldots$", choix: ["$5$", "$8$", "$20$", "$12$"], bonne: 0, explication: "$2 \\times 5 = 10$." },
    { question: "Un multiple de $5$ se termine par :", choix: ["$0$ ou $5$", "$2$", "$1$ ou $6$", "n'importe quoi"], bonne: 0, explication: "$5$, $10$, $15$, $20$…" },
    { question: "$9 \\times 9 = $", choix: ["$81$", "$18$", "$99$", "$72$"], bonne: 0, explication: "Table de $9$." }
  ],

  methode: [
    {
      titre: "Passer de l'addition répétée à la multiplication",
      etapes: [
        "Repère le nombre qui se répète.",
        "Compte combien de fois il est écrit.",
        "Écris (nombre de fois) $\\times$ (nombre répété)."
      ],
      exemple: "$6 + 6 + 6 + 6 = 4 \\times 6 = 24$."
    },
    {
      titre: "Retrouver un résultat de table oublié",
      etapes: [
        "Échange les nombres si c'est plus facile.",
        "Pars d'un résultat que tu connais.",
        "Ajoute ou enlève le nombre une fois."
      ],
      exemple: "$7 \\times 6$ : $6 \\times 6 = 36$, et $36 + 6 = 42$."
    }
  ],
  erreurs: [
    "Confondre $\\times$ et $+$ : $4 \\times 3 = 12$, pas $7$.",
    "Croire que $0 \\times 5 = 5$ : c'est $0$.",
    "Écrire $3 \\times 4$ pour « $3 + 4$ ».",
    "Oublier qu'on peut échanger les nombres d'une multiplication."
  ]
};
