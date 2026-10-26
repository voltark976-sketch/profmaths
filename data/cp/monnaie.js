/*
  CHAPITRE : CP — La monnaie
  ---------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CP, « La monnaie » (introduite en période 2 ou 3) :
  - lexique : plus cher, moins cher, rendre la monnaie, billet, pièce, somme, reste, euros ;
  - comparer la valeur de deux ensembles de pièces et de billets (la valeur, pas le nombre de pièces) ;
  - déterminer la valeur en euros d'un ensemble de pièces et de billets ; constituer une somme donnée ;
  - simuler des achats, rendre la monnaie. Au CP : euros entiers (les centimes sont au CE1).
  figure : FIGURES de assets/exercices-cp.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cp-monnaie"] = {
  niveau: "CP",
  numero: 8,
  titre: "La monnaie",
  accroche: "Reconnaître les pièces et les billets en euros, compter une somme, payer juste et rendre la monnaie.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Les pièces et les billets",
      video: { titre: "Vidéo de Maître Lucas : reconnaître et manipuler les euros", youtube: "https://youtu.be/EsfNsZ5DK7s" },
      texte:
        "En France et à Mayotte, on paie en **euros** (€).\n\n" +
        "- Les **pièces** : $1$ € et $2$ €.\n" +
        "- Les **billets** : $5$ €, $10$ €, $20$ €, $50$ €…\n\n" +
        "Ce qui compte, c'est la **valeur**, pas le nombre de pièces : un billet de $10$ € vaut autant que dix pièces de $1$ €.",
      figure: "cp8-cours-monnaie",
      exemple: {
        enonce: "Combien d'euros y a-t-il sur la figure ?",
        solution: "$10 + 5 + 2 + 1 + 1 = 19$ euros."
      }
    },
    {
      titre: "Compter une somme d'argent",
      video: { titre: "Vidéo d'« Éveiller mon enfant » : la monnaie", youtube: "https://youtu.be/8B8stwk7Cqs" },
      texte:
        "Pour compter vite :\n\n" +
        "1. commence par les billets les plus grands ;\n" +
        "2. ajoute les petits billets, puis les pièces.\n\n" +
        "$20$ € $+ 10$ € $+ 2$ € $+ 1$ €, c'est $20$, $30$, $32$, $33$ : $33$ euros.",
      exemple: {
        enonce: "Moussa a $2$ billets de $10$ € et $3$ pièces de $2$ €. Combien a-t-il ?",
        solution: "$10 + 10 = 20$ et $2 + 2 + 2 = 6$ : $26$ euros."
      }
    },
    {
      titre: "Payer et rendre la monnaie",
      video: { titre: "Vidéo de Maître Lucas : rendre la monnaie", youtube: "https://youtu.be/UHEzDyXuLqc" },
      texte:
        "- **Payer juste** : on donne exactement le prix. $37$ €, c'est $20 + 10 + 5 + 2$.\n" +
        "- **Rendre la monnaie** : si on paie avec un billet plus grand que le prix, le marchand rend la différence.\n\n" +
        "Une mangue coûte $3$ €, on paie avec $5$ € : on compte de $3$ à $5$, le marchand rend $2$ €.",
      exemple: {
        enonce: "Un ballon coûte $14$ €. Zalifa paie avec un billet de $20$ €. Combien lui rend-on ?",
        solution: "De $14$ à $20$, il y a $6$ : on lui rend $6$ €."
      }
    }
  ],

  exercices: [
    { type: "cp8-valeur", titre: "Compter une somme", etape: "Les euros", nb: 6 },
    { type: "cp8-comparer", titre: "Qui a le plus d'argent ?", etape: "Les euros", nb: 5 },
    { type: "cp8-payer", titre: "Payer juste", etape: "Acheter", nb: 5 },
    { type: "cp8-rendre", titre: "Rendre la monnaie", etape: "Acheter", nb: 5 }
  ],

  qcm: [
    { question: "Combien d'euros y a-t-il ?", figure: "cp8-qcm-monnaie", choix: ["$29$ €", "$4$ €", "$25$ €", "$31$ €"], bonne: 0, explication: "$20 + 5 + 2 + 2 = 29$ €." },
    { question: "Un billet de $10$ € vaut autant que :", choix: ["dix pièces de $1$ €", "une pièce de $1$ €", "deux pièces de $1$ €", "un billet de $5$ €"], bonne: 0, explication: "$1 + 1 + \\ldots$ (dix fois) $= 10$ €." },
    { question: "Lequel est un billet ?", choix: ["$20$ €", "$1$ €", "$2$ €", "$1$ centime"], bonne: 0, explication: "Les euros de $5$ € et plus sont des billets." },
    { question: "Awa a $3$ pièces de $2$ €. Elle a :", choix: ["$6$ €", "$3$ €", "$5$ €", "$32$ €"], bonne: 0, explication: "$2 + 2 + 2 = 6$ €." },
    { question: "Qui a le plus d'argent : Anli ($10$ € et $5$ €) ou Saïd (cinq pièces de $2$ €) ?", choix: ["Anli", "Saïd", "Ils ont autant", "On ne peut pas savoir"], bonne: 0, explication: "Anli : $15$ €. Saïd : $10$ €." },
    { question: "Pour payer juste $17$ €, on peut donner :", choix: ["$10$ € + $5$ € + $2$ €", "$10$ € + $5$ €", "$10$ € + $7$ €", "$5$ € + $2$ €"], bonne: 0, explication: "$10 + 5 + 2 = 17$." },
    { question: "Un livre coûte $8$ €. On paie avec $10$ €. On nous rend :", choix: ["$2$ €", "$18$ €", "$8$ €", "$10$ €"], bonne: 0, explication: "$8 + 2 = 10$." },
    { question: "Un jeu coûte $35$ €. On paie avec $50$ €. On nous rend :", choix: ["$15$ €", "$25$ €", "$85$ €", "$5$ €"], bonne: 0, explication: "De $35$ à $50$ : $15$ €." },
    { question: "Rendre la monnaie, c'est :", choix: ["rendre ce qui a été payé en trop", "donner le prix", "payer juste", "compter les pièces"], bonne: 0, explication: "On rend la différence entre ce qui est donné et le prix." },
    { question: "$20$ € $+ 20$ € $+ 10$ € $=$", choix: ["$50$ €", "$40$ €", "$30$ €", "$60$ €"], bonne: 0, explication: "$20 + 20 = 40$, puis $40 + 10 = 50$." },
    { question: "Un ananas coûte $3$ € et une papaye $2$ €. Ensemble, ils coûtent :", choix: ["$5$ €", "$1$ €", "$6$ €", "$32$ €"], bonne: 0, explication: "$3 + 2 = 5$ €." },
    { question: "Quel ensemble vaut le plus ?", choix: ["un billet de $50$ €", "dix pièces de $2$ €", "trois billets de $10$ €", "quarante pièces de $1$ €"], bonne: 0, explication: "$50$ € ; $20$ € ; $30$ € ; $40$ €." },
    { question: "Fatima a $20$ €. Un jouet coûte $25$ €. Combien lui manque-t-il ?", choix: ["$5$ €", "$45$ €", "$20$ €", "$25$ €"], bonne: 0, explication: "$20 + 5 = 25$." },
    { question: "« Plus cher » veut dire :", choix: ["il faut payer plus", "il faut payer moins", "c'est gratuit", "c'est lourd"], bonne: 0, explication: "Plus cher : le prix est plus grand." },
    { question: "$2$ billets de $5$ € font :", choix: ["$10$ €", "$7$ €", "$25$ €", "$55$ €"], bonne: 0, explication: "$5 + 5 = 10$ €." },
    { question: "Combien de pièces de $2$ € faut-il pour faire $10$ € ?", choix: ["$5$", "$2$", "$10$", "$8$"], bonne: 0, explication: "$2 + 2 + 2 + 2 + 2 = 10$." },
    { question: "Des brochettes coûtent $12$ €. On paie avec $20$ €. On nous rend :", choix: ["$8$ €", "$32$ €", "$12$ €", "$7$ €"], bonne: 0, explication: "De $12$ à $20$ : $8$ €." },
    { question: "Moussa a beaucoup de pièces de $1$ €, Inaya a un seul billet. Qui a le plus d'argent ?", choix: ["On ne peut pas savoir sans les valeurs", "Moussa", "Inaya", "Ils ont autant"], bonne: 0, explication: "Il faut connaître le nombre de pièces et la valeur du billet." }
  ],

  methode: [
    {
      titre: "Compter une somme d'argent",
      etapes: [
        "Range les billets et les pièces du plus grand au plus petit.",
        "Compte en ajoutant chaque valeur.",
        "Écris le total avec le signe €."
      ],
      figure: "cp8-methode-monnaie",
      exemple: "$20$, $30$, $35$, $37$, $38$ : $38$ €."
    },
    {
      titre: "Rendre la monnaie",
      etapes: [
        "Pars du prix.",
        "Compte jusqu'à la somme donnée.",
        "Ce que tu as ajouté, c'est la monnaie à rendre."
      ],
      exemple: "Prix $13$ €, payé $20$ € : de $13$ à $20$, il y a $7$ € à rendre."
    }
  ],
  erreurs: [
    "Compter le nombre de pièces au lieu de leur valeur.",
    "Oublier un billet ou une pièce en comptant.",
    "Additionner le prix et le billet au lieu de chercher la différence.",
    "Donner le prix au lieu de la monnaie rendue.",
    "Penser qu'un billet vaut toujours plus que plusieurs pièces."
  ]
};
