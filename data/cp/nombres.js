/*
  CHAPITRE : CP — Les nombres jusqu'à 100
  ----------------------------------------
  Programme de mathématiques du cycle 2 (BO n° 41 du 31 octobre 2024), CP, « Les nombres entiers » :
  - dénombrer et construire des collections en les organisant (paquets de dix) ;
  - suite écrite et orale des nombres jusqu'à cent, compter de un en un, de deux en deux, de dix en dix, à rebours ;
  - représentations d'un nombre : matériel, chiffres, nom oral, unités de numération, 30 + 5, lettres (jusqu'à cinquante) ;
  - valeur des chiffres selon leur position (unités, dizaines) : 23 n'est pas 32.
  Comparer et ranger : chapitre 2. Rangs et suites : chapitre 3.
  Ce fichier est chargé à l'ouverture du chapitre (voir data/catalogue.js, champ source).
  figure : noms de FIGURES de assets/exercices-cp.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cp-nombres"] = {
  niveau: "CP",
  numero: 1,
  titre: "Les nombres jusqu'à 100",
  accroche: "Faire des paquets de dix pour compter vite, connaître les dizaines et les unités, lire et écrire les nombres jusqu'à $100$.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Faire des paquets de dix pour compter",
      video: { titre: "Vidéo de Maître Lucas : les unités et les dizaines", youtube: "https://youtu.be/kVxVES1wM4M" },
      texte:
        "Pour compter beaucoup d'objets sans se tromper, on fait des **paquets de dix**.\n\n" +
        "- Un paquet de dix, c'est une **dizaine**.\n" +
        "- Un objet tout seul, c'est une **unité**.\n\n" +
        "Ensuite on compte les paquets de dix en dix : $10$, $20$, $30$… puis on ajoute les objets seuls.\n\n" +
        "Sur le dessin, il y a $3$ barres de dix cubes et $4$ cubes seuls : $10$, $20$, $30$, puis $31$, $32$, $33$, $34$. Il y a $34$ cubes.",
      figure: "cp1-cours-paquets",
      exemple: {
        enonce: "Anli a ramassé des coquillages sur la plage de N'Gouja. Il fait $2$ paquets de dix et il lui reste $6$ coquillages. Combien a-t-il de coquillages ?",
        solution: "$2$ paquets de dix, c'est $20$. Avec les $6$ qui restent : $20 + 6 = 26$ coquillages."
      }
    },
    {
      titre: "Les dizaines et les unités",
      video: { titre: "Vidéo d'« À nous les maths » : les dizaines et les unités", youtube: "https://youtu.be/Cr1nuVo4vB4" },
      texte:
        "Dans un nombre à deux chiffres :\n\n" +
        "- le chiffre de **gauche** est le chiffre des **dizaines** ;\n" +
        "- le chiffre de **droite** est le chiffre des **unités**.\n\n" +
        "$23$, c'est $2$ dizaines et $3$ unités. $32$, c'est $3$ dizaines et $2$ unités.\n\n" +
        "Les deux nombres ont les mêmes chiffres, mais ce ne sont **pas** les mêmes nombres : la place d'un chiffre change sa valeur.\n\n" +
        "Si on a trop d'unités, on refait une dizaine : $2$ dizaines et $14$ unités, c'est $3$ dizaines et $4$ unités, donc $34$.",
      figure: ["cp1-cours-23", "cp1-cours-32"],
      exemple: {
        enonce: "Dans $58$, quel est le chiffre des dizaines ? Combien vaut-il ?",
        solution: "Le chiffre des dizaines est $5$ : il vaut $5$ dizaines, c'est-à-dire $50$. Le chiffre des unités est $8$."
      }
    },
    {
      titre: "Un nombre s'écrit de plusieurs façons",
      video: { titre: "Vidéo de Maître Lucas : les nombres en lettres jusqu'à 20", youtube: "https://youtu.be/WdhdA7YctPo" },
      texte:
        "Le nombre trente-cinq peut s'écrire :\n\n" +
        "- en chiffres : $35$ ;\n" +
        "- en dizaines et unités : $3$ dizaines et $5$ unités ;\n" +
        "- avec une addition : $30 + 5$ ;\n" +
        "- en unités : $35$ unités ;\n" +
        "- en lettres : trente-cinq.\n\n" +
        "Les mots à connaître pour écrire en lettres jusqu'à cinquante : un, deux, trois… seize, dix, vingt, trente, quarante, cinquante. On met un trait d'union entre les mots : vingt-et-un, quarante-sept.",
      exemple: {
        enonce: "Complète : $47 = 40 + \\ldots$ Écris $47$ en lettres.",
        solution: "$47 = 40 + 7$. En lettres : quarante-sept."
      }
    },
    {
      titre: "Les nombres de 60 à 100",
      video: { titre: "Vidéo de Maître Lucas : lire les nombres de 70 à 99", youtube: "https://youtu.be/tw0fgxPKS2Q" },
      texte:
        "Ces nombres ont des noms un peu spéciaux. Il faut bien les écouter :\n\n" +
        "- **soixante-dix**, c'est soixante et dix : $60 + 10 = 70$. Soixante-treize, c'est $60 + 13 = 73$.\n" +
        "- **quatre-vingts**, c'est quatre fois vingt : $80$. Quatre-vingt-cinq, c'est $80 + 5 = 85$.\n" +
        "- **quatre-vingt-dix**, c'est $80 + 10 = 90$. Quatre-vingt-dix-sept, c'est $80 + 17 = 97$.\n" +
        "- Après quatre-vingt-dix-neuf ($99$) vient **cent** ($100$) : $10$ dizaines.\n\n" +
        "Attention : soixante-douze s'écrit $72$, et pas $6012$ !",
      exemple: {
        enonce: "Moussa dit « quatre-vingt-quatorze ». Écris ce nombre en chiffres.",
        solution: "Quatre-vingts, c'est $80$, et quatorze, c'est $14$ : $80 + 14 = 94$."
      }
    },
    {
      titre: "Compter de 1 en 1, de 2 en 2, de 10 en 10",
      video: { titre: "Vidéo de « Cheddar & Mimolette » : compter de 10 en 10", youtube: "https://youtu.be/CjOliAODUZQ" },
      texte:
        "On peut compter en avançant ou en reculant (à rebours) :\n\n" +
        "- de $1$ en $1$ : $38$, $39$, $40$, $41$ (après $39$, on passe à la dizaine suivante) ;\n" +
        "- de $2$ en $2$ : $14$, $16$, $18$, $20$ ;\n" +
        "- de $10$ en $10$ : $7$, $17$, $27$, $37$ : seul le chiffre des dizaines change ;\n" +
        "- à rebours : $52$, $51$, $50$, $49$.\n\n" +
        "Sur une bande numérique, chaque case vaut un de plus que la case d'avant.",
      figure: ["cp1-cours-bande", "cp1-cours-bonds"],
      exemple: {
        enonce: "Complète en comptant de $10$ en $10$ : $24$ ; $34$ ; $\\ldots$ ; $54$.",
        solution: "On ajoute une dizaine à chaque fois : $34 + 10 = 44$."
      }
    }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "cp1-denombrer", titre: "Compter avec des paquets de dix", etape: "Dénombrer", nb: 6 },
    { type: "cp1-dizaines", titre: "Les dizaines et les unités", etape: "Dizaines et unités", nb: 6 },
    { type: "cp1-ecritures", titre: "Chiffres, lettres et additions", etape: "Dizaines et unités", nb: 6 },
    { type: "cp1-dictee", titre: "Écrire un nombre que l'on entend", etape: "Lire et écrire les nombres", nb: 6 },
    { type: "cp1-compter", titre: "Compter en avançant ou en reculant", etape: "Lire et écrire les nombres", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Combien y a-t-il de cubes ?", figure: "cp1-qcm-paquets", choix: ["$58$", "$13$", "$85$", "$508$"], bonne: 0, explication: "$5$ barres de dix font $50$, et $8$ cubes seuls : $50 + 8 = 58$." },
    { question: "Attention aux cubes seuls ! Combien y a-t-il de cubes ?", figure: "cp1-qcm-paquets2", choix: ["$53$", "$17$", "$413$", "$43$"], bonne: 0, explication: "$4$ barres font $40$. Les $13$ cubes seuls font encore $1$ dizaine et $3$ unités : $40 + 13 = 53$." },
    { question: "Combien y a-t-il de ronds ?", figure: "cp1-qcm-collection", choix: ["$34$", "$7$", "$43$", "$30$"], bonne: 0, explication: "$3$ paquets de dix ($30$) et $4$ ronds seuls : $34$." },
    { question: "Dans $46$, le chiffre des dizaines est :", choix: ["$4$", "$6$", "$46$", "$40$"], bonne: 0, explication: "Le chiffre des dizaines est à gauche : $4$. Il vaut $40$." },
    { question: "Dans $71$, le chiffre des unités est :", choix: ["$1$", "$7$", "$70$", "$71$"], bonne: 0, explication: "Le chiffre des unités est à droite : $1$." },
    { question: "$6$ dizaines et $2$ unités, c'est :", choix: ["$62$", "$26$", "$8$", "$602$"], bonne: 0, explication: "$6$ dizaines $= 60$ ; $60 + 2 = 62$." },
    { question: "$3$ unités et $8$ dizaines, c'est :", choix: ["$83$", "$38$", "$11$", "$803$"], bonne: 0, explication: "On écrit d'abord les dizaines : $8$ dizaines et $3$ unités, c'est $83$." },
    { question: "$2$ dizaines et $15$ unités, c'est :", choix: ["$35$", "$215$", "$17$", "$25$"], bonne: 0, explication: "$15$ unités, c'est $1$ dizaine et $5$ unités. En tout : $3$ dizaines et $5$ unités, donc $35$." },
    { question: "Combien y a-t-il de dizaines dans $70$ ?", choix: ["$7$", "$70$", "$10$", "$0$"], bonne: 0, explication: "$70 = 10 + 10 + 10 + 10 + 10 + 10 + 10$ : $7$ dizaines." },
    { question: "« Quarante-trois » s'écrit :", choix: ["$43$", "$34$", "$403$", "$13$"], bonne: 0, explication: "Quarante, c'est $40$, et trois, c'est $3$ : $43$." },
    { question: "$29$ s'écrit en lettres :", choix: ["vingt-neuf", "vingt-huit", "neuf-vingt", "quatre-vingt-dix"], bonne: 0, explication: "$29 = 20 + 9$ : vingt-neuf." },
    { question: "« Soixante-quinze » s'écrit :", choix: ["$75$", "$6015$", "$65$", "$615$"], bonne: 0, explication: "Soixante et quinze : $60 + 15 = 75$." },
    { question: "« Quatre-vingt-six » s'écrit :", choix: ["$86$", "$4206$", "$66$", "$96$"], bonne: 0, explication: "Quatre-vingts, c'est $80$ ; $80 + 6 = 86$." },
    { question: "« Quatre-vingt-dix-huit » s'écrit :", choix: ["$98$", "$88$", "$918$", "$78$"], bonne: 0, explication: "Quatre-vingt-dix, c'est $90$ ; $90 + 8 = 98$." },
    { question: "$52 = 50 + \\ldots$", choix: ["$2$", "$5$", "$20$", "$52$"], bonne: 0, explication: "$52$, c'est $5$ dizaines et $2$ unités : $52 = 50 + 2$." },
    { question: "$40 + 9 = \\ldots$", choix: ["$49$", "$13$", "$409$", "$94$"], bonne: 0, explication: "$4$ dizaines et $9$ unités : $49$." },
    { question: "Quel nombre vient juste après $59$ ?", choix: ["$60$", "$50$", "$510$", "$58$"], bonne: 0, explication: "Après $9$ unités, on change de dizaine : $59$, $60$." },
    { question: "Quel nombre vient juste avant $80$ ?", choix: ["$79$", "$81$", "$70$", "$89$"], bonne: 0, explication: "$80 - 1 = 79$." },
    { question: "Complète : $15$ ; $25$ ; $35$ ; $\\ldots$", choix: ["$45$", "$36$", "$40$", "$55$"], bonne: 0, explication: "On compte de $10$ en $10$ : $35 + 10 = 45$." },
    { question: "Complète : $36$ ; $34$ ; $32$ ; $\\ldots$", choix: ["$30$", "$31$", "$33$", "$22$"], bonne: 0, explication: "On recule de $2$ en $2$ : $32 - 2 = 30$." },
    { question: "Quel nombre est caché ?", figure: "cp1-qcm-bande", choix: ["$66$", "$65$", "$67$", "$76$"], bonne: 0, explication: "Avant le « ? » il y a $65$ : le nombre caché est $66$." },
    { question: "Cent, c'est :", choix: ["$10$ dizaines", "$100$ dizaines", "$1$ dizaine", "$10$ unités"], bonne: 0, explication: "$100 = 10 + 10 + \\ldots$ (dix fois) : $10$ dizaines." },
    { question: "Fatima a $47$ perles. Combien de colliers de $10$ perles peut-elle faire ?", choix: ["$4$", "$7$", "$47$", "$5$"], bonne: 0, explication: "$47$, c'est $4$ dizaines et $7$ unités : $4$ colliers, et il reste $7$ perles." },
    { question: "Quel nombre a les mêmes chiffres que $27$ mais vaut plus ?", choix: ["$72$", "$27$", "$9$", "$207$"], bonne: 0, explication: "$72$ a $7$ dizaines, alors que $27$ n'en a que $2$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Compter une grande collection",
      etapes: [
        "Fais des paquets de dix (entoure-les).",
        "Compte les paquets de dix en dix : $10$, $20$, $30$…",
        "Ajoute un par un les objets qui restent seuls."
      ],
      figure: "cp1-methode-paquets",
      exemple: "$6$ barres de dix et $7$ cubes : $60$, puis $61$… $67$. Il y a $67$ cubes."
    },
    {
      titre: "Trouver les dizaines et les unités",
      etapes: [
        "Le chiffre de gauche donne les dizaines.",
        "Le chiffre de droite donne les unités.",
        "Vérifie avec une addition : dizaines + unités."
      ],
      exemple: "$84$ : $8$ dizaines et $4$ unités, et $80 + 4 = 84$."
    },
    {
      titre: "Écrire en chiffres un nombre que l'on entend",
      etapes: [
        "Écoute le début : il donne la dizaine (vingt, soixante, quatre-vingts…).",
        "Écoute la fin : c'est ce qu'on ajoute (de un à dix-neuf).",
        "Additionne, puis écris le nombre avec deux chiffres."
      ],
      exemple: "Soixante-dix-sept : $60 + 17 = 77$."
    }
  ],
  erreurs: [
    "Compter une barre de dix comme un seul cube.",
    "Inverser les chiffres : $3$ dizaines et $5$ unités, c'est $35$, pas $53$.",
    "Coller les chiffres que l'on entend : soixante-douze s'écrit $72$, pas $6012$.",
    "Oublier de changer de dizaine en comptant : après $49$ vient $50$.",
    "Garder plus de neuf unités : $2$ dizaines et $14$ unités, c'est $34$."
  ]
};
