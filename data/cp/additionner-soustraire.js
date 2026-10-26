/*
  CHAPITRE : CP — Additionner et soustraire
  ------------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CP, « Les quatre opérations » :
  - sens de l'addition et de la soustraction (opérations inverses), symboles +, − et = (le = seulement entre deux termes égaux) ;
  - l'ordre des termes ne compte pas pour l'addition, il compte pour la soustraction ;
  - poser et effectuer des additions en colonnes (deux ou trois nombres à un ou deux chiffres) ;
  - sens de la multiplication : « fois » comme addition répétée (20 + 20 + 20). Pas de calculatrice.
  figure : FIGURES de assets/exercices-cp.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cp-additionner-soustraire"] = {
  niveau: "CP",
  numero: 4,
  titre: "Additionner et soustraire",
  accroche: "Ajouter, enlever, bien utiliser le signe $=$, poser une addition en colonnes et découvrir le mot « fois ».",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Ajouter, c'est une addition",
      video: { titre: "Vidéo de Maître Lucas : découvrir les additions", youtube: "https://youtu.be/U64CORDoN_w" },
      texte:
        "Quand on **réunit** ou quand on **ajoute**, on fait une addition avec le signe $+$.\n\n" +
        "$7 + 5 = 12$ se lit « sept plus cinq égale douze ».\n\n" +
        "Dans une addition, on peut changer l'ordre des nombres : $5 + 7 = 7 + 5 = 12$. Astuce : on part du plus grand nombre.",
      figure: "cp4-cours-schema",
      exemple: {
        enonce: "Dans le panier il y a $32$ litchis. Maman en ajoute $15$. Combien y en a-t-il maintenant ?",
        solution: "$32 + 15 = 47$ litchis."
      }
    },
    {
      titre: "Enlever, c'est une soustraction",
      video: { titre: "Vidéo de Maître Lucas : débuter les soustractions", youtube: "https://youtu.be/-Ga6DhnJPpE" },
      texte:
        "Quand on **enlève**, on fait une soustraction avec le signe $-$.\n\n" +
        "$12 - 5 = 7$ se lit « douze moins cinq égale sept ».\n\n" +
        "Dans une soustraction, l'ordre compte : on part du nombre du début.\n\n" +
        "La soustraction défait l'addition : $32 + 15 = 47$, donc $47 - 15 = 32$ et $47 - 32 = 15$.",
      exemple: {
        enonce: "Il y a $43$ cerises. Awa en mange $18$. Combien en reste-t-il ?",
        solution: "$43 - 18 = 25$ cerises (on peut casser une dizaine en $10$ unités pour enlever les $8$)."
      }
    },
    {
      titre: "Bien utiliser le signe $=$",
      video: { titre: "Vidéo de Maître Lucas : les additions en ligne jusqu'à 20", youtube: "https://youtu.be/fGCLGhwni4A" },
      texte:
        "Le signe $=$ veut dire « a la même valeur que ». On ne l'écrit qu'entre deux choses **égales**.\n\n" +
        "Pour calculer $47 + 8$ en passant par $50$ :\n\n" +
        "- juste : $47 + 3 = 50$, puis $50 + 5 = 55$ ;\n" +
        "- faux : « $47 + 3 = 50 + 5 = 55$ », car $47 + 3$ ne vaut pas $55$.",
      exemple: {
        enonce: "Complète : $36 + \\ldots = 50$.",
        solution: "Il faut ajouter $14$ : $36 + 14 = 50$."
      }
    },
    {
      titre: "Poser une addition en colonnes",
      video: { titre: "Vidéo de Maître Lucas : les additions posées avec retenue", youtube: "https://youtu.be/o7XIWn-rx9k" },
      texte:
        "1. On écrit les **unités sous les unités** et les **dizaines sous les dizaines**.\n" +
        "2. On additionne d'abord les unités. Si on trouve $10$ ou plus, on écrit le chiffre des unités et on **retient** une dizaine.\n" +
        "3. On additionne les dizaines, sans oublier la retenue.\n\n" +
        "$\\begin{array}{r} 45 \\\\ +\\;37 \\\\ \\hline 82 \\end{array}$\n\n" +
        "Unités : $5 + 7 = 12$, j'écris $2$ et je retiens $1$. Dizaines : $1 + 4 + 3 = 8$. Donc $45 + 37 = 82$.",
      exemple: {
        enonce: "Pose et calcule $28 + 8 + 56$.",
        solution: "Unités : $8 + 8 + 6 = 22$, j'écris $2$, je retiens $2$. Dizaines : $2 + 2 + 5 = 9$. Résultat : $92$."
      }
    },
    {
      titre: "« Fois » : ajouter plusieurs fois le même nombre",
      video: { titre: "Vidéo d'« À nous les maths » : l'addition répétée", youtube: "https://youtu.be/u0ssk_vXI4I" },
      texte:
        "Jan a $3$ paquets de $20$ biscuits. Il a « $3$ fois $20$ » biscuits : $20 + 20 + 20 = 60$.\n\n" +
        "« $3$ fois $5$ », c'est le nombre $5$ écrit $3$ fois : $5 + 5 + 5 = 15$.",
      figure: "cp4-cours-fois",
      exemple: {
        enonce: "Il y a $4$ sacs de $5$ mangues. Combien de mangues ?",
        solution: "$4$ fois $5$ : $5 + 5 + 5 + 5 = 20$ mangues."
      }
    }
  ],

  exercices: [
    { type: "cp4-sens", titre: "Ajouter ou enlever ?", etape: "Le sens des opérations", nb: 6 },
    { type: "cp4-egal", titre: "Le signe = et les égalités à trou", etape: "Le sens des opérations", nb: 6 },
    { type: "cp4-posee", titre: "Poser une addition", etape: "Calculer", nb: 5 },
    { type: "cp4-fois", titre: "Le sens de « fois »", etape: "Calculer", nb: 5 }
  ],

  qcm: [
    { question: "Quand on enlève des objets, on fait :", choix: ["une soustraction", "une addition", "un double", "rien"], bonne: 0, explication: "Enlever, c'est soustraire, avec le signe $-$." },
    { question: "$8 + 6 = $", choix: ["$14$", "$2$", "$86$", "$13$"], bonne: 0, explication: "$8 + 2 = 10$, puis $10 + 4 = 14$." },
    { question: "$15 - 4 = $", choix: ["$11$", "$19$", "$10$", "$1$"], bonne: 0, explication: "On enlève $4$ unités : $11$." },
    { question: "Quel calcul a le même résultat que $9 + 23$ ?", choix: ["$23 + 9$", "$23 - 9$", "$9 - 23$", "$9 + 32$"], bonne: 0, explication: "Dans une addition, on peut échanger les nombres." },
    { question: "$25 + 14 = 39$. Donc $39 - 14 = $", choix: ["$25$", "$14$", "$53$", "$39$"], bonne: 0, explication: "La soustraction défait l'addition : il reste $25$." },
    { question: "Quelle écriture est juste ?", choix: ["$58 + 2 = 60$", "$58 + 2 = 60 + 4 = 64$", "$58 + 6 = 60 = 64$", "$58 = 60$"], bonne: 0, explication: "Le signe $=$ ne relie que deux choses égales." },
    { question: "Complète : $40 + \\ldots = 47$", choix: ["$7$", "$47$", "$87$", "$4$"], bonne: 0, explication: "$47 = 40 + 7$." },
    { question: "Complète : $\\ldots - 5 = 20$", choix: ["$25$", "$15$", "$20$", "$5$"], bonne: 0, explication: "$25 - 5 = 20$." },
    { question: "Pour poser une addition, on écrit :", choix: ["les unités sous les unités", "les nombres n'importe comment", "les dizaines sous les unités", "le plus petit nombre en premier, à gauche"], bonne: 0, explication: "Les unités sous les unités, les dizaines sous les dizaines." },
    { question: "$46 + 38 = $", choix: ["$84$", "$74$", "$714$", "$82$"], bonne: 0, explication: "Unités $6 + 8 = 14$ : j'écris $4$, je retiens $1$. Dizaines : $1 + 4 + 3 = 8$." },
    { question: "$23 + 41 = $", choix: ["$64$", "$54$", "$46$", "$65$"], bonne: 0, explication: "$3 + 1 = 4$ et $2 + 4 = 6$ : $64$." },
    { question: "$17 + 5 + 30 = $", choix: ["$52$", "$47$", "$42$", "$62$"], bonne: 0, explication: "$17 + 5 = 22$, puis $22 + 30 = 52$." },
    { question: "« $3$ fois $4$ », c'est :", choix: ["$4 + 4 + 4$", "$3 + 4$", "$3 + 3$", "$4 - 3$"], bonne: 0, explication: "Le nombre $4$ écrit $3$ fois." },
    { question: "Combien y a-t-il de ronds ?", figure: "cp4-qcm-fois", choix: ["$12$", "$7$", "$3$", "$4$"], bonne: 0, explication: "$3$ paquets de $4$ : $4 + 4 + 4 = 12$." },
    { question: "$2$ paquets de $10$ crayons, c'est :", choix: ["$20$ crayons", "$12$ crayons", "$210$ crayons", "$10$ crayons"], bonne: 0, explication: "$10 + 10 = 20$." },
    { question: "Moussa a $30$ billes. Il en perd $10$. Combien lui en reste-t-il ?", choix: ["$20$", "$40$", "$10$", "$3$"], bonne: 0, explication: "$30 - 10 = 20$." },
    { question: "Dans le bus, il y a $12$ enfants. $6$ montent. Combien sont-ils ?", choix: ["$18$", "$6$", "$612$", "$16$"], bonne: 0, explication: "Des enfants montent : $12 + 6 = 18$." },
    { question: "$50 - 3 = $", choix: ["$47$", "$53$", "$43$", "$20$"], bonne: 0, explication: "On casse une dizaine : $10 - 3 = 7$, donc $47$." },
    { question: "« $7 + 5 = 12$ » se lit :", choix: ["sept plus cinq égale douze", "sept moins cinq égale douze", "sept fois cinq égale douze", "douze plus cinq égale sept"], bonne: 0, explication: "Le signe $+$ se lit « plus »." },
    { question: "Laquelle est une soustraction ?", choix: ["$18 - 9$", "$18 + 9$", "$9 + 9$", "$18 = 18$"], bonne: 0, explication: "Une soustraction utilise le signe $-$." }
  ],

  methode: [
    {
      titre: "Choisir entre addition et soustraction",
      etapes: [
        "Lis l'histoire : on ajoute, on réunit ? C'est une addition.",
        "On enlève, on perd, on donne ? C'est une soustraction.",
        "Vérifie : le résultat doit être plus grand (addition) ou plus petit (soustraction)."
      ],
      figure: "cp4-cours-schema",
      exemple: "On réunit $32$ et $15$ : $32 + 15 = 47$."
    },
    {
      titre: "Poser une addition avec retenue",
      etapes: [
        "Aligne les unités, puis les dizaines.",
        "Additionne les unités ; si c'est $10$ ou plus, écris les unités et retiens $1$ dizaine.",
        "Additionne les dizaines avec la retenue."
      ],
      exemple: "$37 + 26$ : $7 + 6 = 13$, j'écris $3$, je retiens $1$ ; $1 + 3 + 2 = 6$. Résultat : $63$."
    }
  ],
  erreurs: [
    "Additionner quand on enlève (ou l'inverse) : relis l'histoire.",
    "Écrire une suite d'égalités fausses : $47 + 3 = 50 + 5 = 55$.",
    "Oublier la retenue dans une addition posée.",
    "Mal aligner les chiffres : les unités sous les unités.",
    "Écrire $3 + 4$ pour « $3$ fois $4$ » : c'est $4 + 4 + 4$."
  ]
};
