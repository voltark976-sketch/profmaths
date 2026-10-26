/*
  CHAPITRE : CE1 — Addition et soustraction posées
  -------------------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE1, « Les quatre opérations » :
  - poser et effectuer des additions de deux ou trois nombres à un, deux ou trois chiffres ;
  - un algorithme de soustraction posée (par cassage ou par compensation), introduit en période 3 au plus tard ;
  - le calcul mental reste privilégié quand c'est possible ; pas de calculatrice.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce1-addition-soustraction"] = {
  niveau: "CE1",
  numero: 5,
  titre: "Addition et soustraction posées",
  accroche: "Poser une addition avec des retenues, poser une soustraction, et vérifier ses calculs.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "L'addition posée",
      video: { titre: "Vidéo de Maître Lucas : les additions posées avec retenue", youtube: "https://youtu.be/o7XIWn-rx9k" },
      texte:
        "On aligne les **unités** sous les unités, les **dizaines** sous les dizaines, les **centaines** sous les centaines.\n\n" +
        "On commence par les unités. Si la somme dépasse $9$, on écrit les unités et on **retient** la dizaine au-dessus de la colonne suivante.\n\n" +
        "$\\begin{array}{r} 245 \\\\ +\\;437 \\\\ \\hline 682 \\end{array}$\n\n" +
        "Unités : $5 + 7 = 12$, j'écris $2$, je retiens $1$. Dizaines : $1 + 4 + 3 = 8$. Centaines : $2 + 4 = 6$.",
      exemple: {
        enonce: "Pose et calcule $76 + 7 + 568$.",
        solution: "Unités : $6 + 7 + 8 = 21$, j'écris $1$, je retiens $2$. Dizaines : $2 + 7 + 6 = 15$, j'écris $5$, je retiens $1$. Centaines : $1 + 5 = 6$. Résultat : $651$."
      }
    },
    {
      titre: "La soustraction posée",
      video: { titre: "Vidéo de Maître Lucas : soustractions posées avec retenues (méthode par cassage)", youtube: "https://youtu.be/4W-T0RAod-g" },
      texte:
        "On aligne les chiffres et on commence par les unités.\n\n" +
        "Si le chiffre du haut est trop petit, on **casse** une dizaine : elle devient $10$ unités.\n\n" +
        "$\\begin{array}{r} 352 \\\\ -\\;127 \\\\ \\hline 225 \\end{array}$\n\n" +
        "Unités : $2 - 7$ impossible ; je casse une dizaine : $12 - 7 = 5$. Dizaines : il en reste $4$, et $4 - 2 = 2$. Centaines : $3 - 1 = 2$.\n\n" +
        "Dans ta classe, on peut aussi utiliser la méthode « par compensation » : le résultat est le même.",
      exemple: {
        enonce: "Pose et calcule $604 - 38$.",
        solution: "On casse une centaine en dizaines, puis une dizaine en unités : $604 - 38 = 566$. Vérification : $566 + 38 = 604$."
      }
    },
    {
      titre: "Vérifier un calcul",
      video: { titre: "Vidéo de Maître Lucas : soustractions posées sans retenue", youtube: "https://youtu.be/E0CUqCHnUSs" },
      texte:
        "- Une soustraction se vérifie avec une addition : $682 - 437 = 245$ car $245 + 437 = 682$.\n" +
        "- On peut aussi estimer : $498 + 203$, c'est environ $500 + 200 = 700$. Un résultat comme $1\\,701$ est forcément faux.",
      exemple: {
        enonce: "Un élève trouve $512 - 48 = 474$. Vérifie.",
        solution: "$474 + 48 = 522$, pas $512$ : c'est faux. Le bon résultat est $464$."
      }
    }
  ],

  exercices: [
    { type: "e1a-addition", titre: "Poser une addition", etape: "Calculer", nb: 5 },
    { type: "e1a-soustraction", titre: "Poser une soustraction", etape: "Calculer", nb: 5 },
    { type: "e1a-sens", titre: "Ajouter, enlever, compléter", etape: "Comprendre", nb: 6 }
  ],

  qcm: [
    { question: "$245 + 437 = $", choix: ["$682$", "$672$", "$6\\,712$", "$582$"], bonne: 0, explication: "$5 + 7 = 12$ : j'écris $2$, je retiens $1$." },
    { question: "$318 + 56 = $", choix: ["$374$", "$364$", "$878$", "$384$"], bonne: 0, explication: "$8 + 6 = 14$ ; $1 + 1 + 5 = 7$ ; $3$." },
    { question: "$500 - 1 = $", choix: ["$499$", "$409$", "$501$", "$490$"], bonne: 0, explication: "Le nombre juste avant $500$." },
    { question: "$352 - 127 = $", choix: ["$225$", "$235$", "$479$", "$215$"], bonne: 0, explication: "On casse une dizaine : $12 - 7 = 5$, $4 - 2 = 2$, $3 - 1 = 2$." },
    { question: "$760 - 300 = $", choix: ["$460$", "$730$", "$1\\,060$", "$457$"], bonne: 0, explication: "On enlève $3$ centaines." },
    { question: "Pour poser une addition, on aligne :", choix: ["les unités sous les unités", "les chiffres à gauche", "le plus grand nombre en bas", "les centaines sous les unités"], bonne: 0, explication: "Chaque chiffre dans sa colonne." },
    { question: "Dans une addition, une retenue vient quand :", choix: ["une colonne dépasse $9$", "on soustrait", "un nombre est pair", "il y a un zéro"], bonne: 0, explication: "$10$ unités font une dizaine qu'on retient." },
    { question: "$405 - 128$ : aux unités, $5 - 8$ est impossible. On :", choix: ["casse une dizaine", "écrit $3$", "change de nombre", "arrête le calcul"], bonne: 0, explication: "On transforme une dizaine en $10$ unités (ici, il faut d'abord casser une centaine)." },
    { question: "Comment vérifier $682 - 437 = 245$ ?", choix: ["$245 + 437$", "$682 + 437$", "$245 - 437$", "$682 + 245$"], bonne: 0, explication: "Résultat + nombre enlevé = nombre de départ." },
    { question: "$198 + 302$ vaut environ :", choix: ["$500$", "$5\\,000$", "$100$", "$300$"], bonne: 0, explication: "$200 + 300 = 500$." },
    { question: "$124 + 35 + 8 = $", choix: ["$167$", "$157$", "$1\\,248$", "$177$"], bonne: 0, explication: "$124 + 35 = 159$, puis $159 + 8 = 167$." },
    { question: "$999 + 1 = $", choix: ["$1\\,000$", "$9\\,991$", "$990$", "$100$"], bonne: 0, explication: "Après $999$ vient mille." },
    { question: "$630 - 45 = $", choix: ["$585$", "$595$", "$675$", "$625$"], bonne: 0, explication: "$630 - 30 = 600$, $600 - 15 = 585$." },
    { question: "Complète : $350 + \\ldots = 500$", choix: ["$150$", "$250$", "$850$", "$50$"], bonne: 0, explication: "$500 - 350 = 150$." },
    { question: "Le marchand a $420$ mangues et en vend $160$. Il lui en reste :", choix: ["$260$", "$580$", "$360$", "$240$"], bonne: 0, explication: "$420 - 160 = 260$." },
    { question: "$27 + 456 = $", choix: ["$483$", "$726$", "$473$", "$493$"], bonne: 0, explication: "Bien aligner : $7 + 6 = 13$ ; $1 + 2 + 5 = 8$ ; $4$." },
    { question: "Dans une soustraction posée, on commence par :", choix: ["les unités", "les centaines", "le plus grand chiffre", "n'importe quelle colonne"], bonne: 0, explication: "Toujours de droite à gauche." },
    { question: "$800 - 450 = $", choix: ["$350$", "$450$", "$1\\,250$", "$400$"], bonne: 0, explication: "$450 + 350 = 800$." }
  ],

  methode: [
    {
      titre: "Poser une addition",
      etapes: [
        "Aligne les chiffres : unités, dizaines, centaines.",
        "Additionne colonne par colonne en commençant par les unités.",
        "Si une colonne fait $10$ ou plus, écris les unités et retiens $1$ au-dessus de la colonne suivante."
      ],
      exemple: "$258 + 167$ : $15$ → $5$, retenue $1$ ; $12$ → $2$, retenue $1$ ; $4$. Résultat : $425$."
    },
    {
      titre: "Poser une soustraction (par cassage)",
      etapes: [
        "Aligne les chiffres, le plus grand nombre en haut.",
        "Commence par les unités : si c'est impossible, casse une dizaine du haut.",
        "Continue colonne par colonne, puis vérifie avec une addition."
      ],
      exemple: "$352 - 127 = 225$ et $225 + 127 = 352$."
    }
  ],
  erreurs: [
    "Mal aligner les chiffres (surtout avec un nombre plus court).",
    "Oublier la retenue.",
    "Dans une soustraction, faire « le plus grand moins le plus petit » dans chaque colonne : $52 - 27$, ce n'est pas $35$.",
    "Oublier de diminuer la dizaine qu'on a cassée.",
    "Ne pas vérifier : un résultat de soustraction plus grand que le nombre de départ est faux."
  ]
};
