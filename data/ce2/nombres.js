/*
  CHAPITRE : CE2 — Les nombres jusqu'à 10 000
  --------------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE2 : dénombrer avec des groupes de dix, cent, mille ; relations
  entre unités de numération ; suites écrite et orale jusqu'à dix-mille ; écritures d'un nombre (4 635 ; quatre-mille-six-cent-
  trente-cinq ; 463 dizaines et 5 unités ; (4 × 1 000) + (6 × 100) + (3 × 10) + (5 × 1)) ; valeur des chiffres ;
  problème des lots de cent (1 235 filtres).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce2-nombres"] = {
  niveau: "CE2",
  numero: 1,
  titre: "Les nombres jusqu'à 10 000",
  accroche: "Les milliers : lire, écrire et décomposer les nombres jusqu'à $10\\,000$.",
  playlist: "", drive: "", pdfs: [], liens: [],

  cours: [
    {
      titre: "Le millier",
      video: { titre: "Vidéo de Maître Lucas : les milliers, les nombres jusqu'à 9 999", youtube: "https://youtu.be/qpNKsGeQpBM" },
      texte:
        "$10$ centaines font $1$ **millier** : $1\\,000$. $10$ milliers font $10\\,000$ (dix-mille).\n\n" +
        "Dans $4\\,635$ : $4$ milliers, $6$ centaines, $3$ dizaines, $5$ unités.\n\n" +
        "On laisse un petit espace entre les milliers et les centaines pour lire plus facilement : $4\\,635$.",
      figure: "e2n-cours-milliers",
      exemple: { enonce: "Quel nombre représente la figure ?", solution: "$2\\,000 + 300 + 10 + 5 = 2\\,315$." }
    },
    {
      titre: "Plusieurs écritures",
      video: { titre: "Vidéo de Maître Lucas : le nombre 1 000", youtube: "https://youtu.be/w4dPtO3kIG0" },
      texte:
        "$4\\,635$ s'écrit aussi :\n\n" +
        "- $4$ milliers, $6$ centaines, $3$ dizaines et $5$ unités ;\n" +
        "- $463$ dizaines et $5$ unités ; ou $46$ centaines et $35$ unités ;\n" +
        "- $(4 \\times 1\\,000) + (6 \\times 100) + (3 \\times 10) + 5$ ;\n" +
        "- quatre-mille-six-cent-trente-cinq (mille ne prend jamais de s).",
      exemple: { enonce: "Une entreprise a besoin de $1\\,235$ filtres, vendus par lots de $100$. Combien de lots faut-il ?", solution: "$12$ lots donnent $1\\,200$ filtres : pas assez. Il faut $13$ lots." }
    }
  ],
  exercices: [
    { type: "e2n-denombrer", titre: "Milliers, centaines, dizaines, unités", etape: "Comprendre les nombres", nb: 5 },
    { type: "e2n-unites", titre: "La valeur des chiffres", etape: "Comprendre les nombres", nb: 6 },
    { type: "e2n-lettres", titre: "Lire et écrire les nombres", etape: "Lire et écrire", nb: 6 }
  ],
  qcm: [
    { question: "$10$ centaines, c'est :", choix: ["$1$ millier", "$1$ dizaine", "$100$ unités", "$10\\,000$"], bonne: 0, explication: "$10 \\times 100 = 1\\,000$." },
    { question: "Dans $7\\,428$, le chiffre des milliers est :", choix: ["$7$", "$4$", "$2$", "$8$"], bonne: 0, explication: "Le premier chiffre à gauche." },
    { question: "Dans $5\\,063$, le chiffre des centaines est :", choix: ["$0$", "$5$", "$6$", "$3$"], bonne: 0, explication: "$5$ milliers, $0$ centaine, $6$ dizaines, $3$ unités." },
    { question: "Combien de centaines en tout dans $3\\,700$ ?", choix: ["$37$", "$7$", "$3$", "$370$"], bonne: 0, explication: "$3\\,700 = 37$ centaines." },
    { question: "$(6 \\times 1\\,000) + (2 \\times 100) + 9 = $", choix: ["$6\\,209$", "$629$", "$6\\,290$", "$62\\,009$"], bonne: 0, explication: "$6\\,000 + 200 + 9$." },
    { question: "« Trois-mille-quarante » s'écrit :", choix: ["$3\\,040$", "$3\\,400$", "$30\\,040$", "$340$"], bonne: 0, explication: "$3\\,000 + 40$." },
    { question: "$8\\,005$ s'écrit en lettres :", choix: ["huit-mille-cinq", "huit-mille-cinquante", "huit-cent-cinq", "quatre-vingt-cinq"], bonne: 0, explication: "$8\\,000 + 5$." },
    { question: "Le nombre juste après $4\\,999$ est :", choix: ["$5\\,000$", "$4\\,1000$", "$4\\,990$", "$49\\,910$"], bonne: 0, explication: "$4\\,999 + 1 = 5\\,000$." },
    { question: "$10\\,000$ se lit :", choix: ["dix-mille", "mille", "cent-mille", "dix-cents"], bonne: 0, explication: "Dix milliers." },
    { question: "$35$ centaines et $4$ dizaines, c'est :", choix: ["$3\\,540$", "$354$", "$35\\,040$", "$3\\,504$"], bonne: 0, explication: "$3\\,500 + 40$." },
    { question: "$2$ milliers, $15$ centaines, c'est :", choix: ["$3\\,500$", "$2\\,150$", "$2\\,015$", "$17$"], bonne: 0, explication: "$2\\,000 + 1\\,500 = 3\\,500$." },
    { question: "Combien de lots de $100$ pour avoir au moins $2\\,450$ objets ?", choix: ["$25$", "$24$", "$245$", "$2$"], bonne: 0, explication: "$24$ lots donnent $2\\,400$ : il en faut un de plus." },
    { question: "Mille s'écrit :", choix: ["sans s, même au pluriel", "avec un s à « deux-milles »", "avec deux l et un s", "« mil »"], bonne: 0, explication: "Mille est invariable : deux-mille." },
    { question: "$9\\,000 + 900 + 9 = $", choix: ["$9\\,909$", "$999$", "$9\\,099$", "$90\\,909$"], bonne: 0, explication: "$9$ milliers, $9$ centaines, $0$ dizaine, $9$ unités." },
    { question: "Dans $6\\,284$, que vaut le chiffre $2$ ?", choix: ["$200$", "$2$", "$20$", "$2\\,000$"], bonne: 0, explication: "C'est le chiffre des centaines." },
    { question: "$4\\,635 = 463$ dizaines et :", choix: ["$5$ unités", "$35$ unités", "$3$ unités", "$0$ unité"], bonne: 0, explication: "$4\\,630 + 5$." },
    { question: "Quel nombre a $7$ milliers et rien d'autre ?", choix: ["$7\\,000$", "$7$", "$700$", "$70\\,000$"], bonne: 0, explication: "$7 \\times 1\\,000$." },
    { question: "« Deux-mille-trois-cent-un » s'écrit :", choix: ["$2\\,301$", "$2\\,031$", "$2\\,310$", "$231$"], bonne: 0, explication: "$2\\,000 + 300 + 1$." }
  ],
  methode: [
    { titre: "Écrire en chiffres un nombre dicté", etapes: ["Écris le nombre de milliers.", "Écris la fin du nombre sur trois chiffres (centaines, dizaines, unités).", "Mets des $0$ là où il n'y a rien."], exemple: "Six-mille-quatre : $6$ milliers, puis $004$ → $6\\,004$." }
  ],
  erreurs: ["Écrire « $50\\,003$ » pour cinq-mille-trois : le nombre n'a que $4$ chiffres.", "Oublier les zéros des centaines ou des dizaines.", "Confondre le chiffre des centaines et le nombre de centaines.", "Écrire « milles » avec un s."]
};
