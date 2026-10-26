/*
  CHAPITRE : CP — Résoudre des problèmes
  ---------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CP, « La résolution de problèmes » :
  - modèle en quatre phases : comprendre, modéliser, calculer, répondre (avec régulation) ;
  - problèmes additifs en une étape du type parties-tout (les problèmes de transformation, ajout ou retrait, sont traités
    comme des parties-tout), nombres jusqu'à 100 ;
  - problèmes additifs en deux étapes et problèmes multiplicatifs en une étape (groupes égaux, nombre de parts,
    valeur d'une part), champ numérique jusqu'à 30.
  figure : FIGURES de assets/exercices-cp.js (schémas en barres).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cp-problemes"] = {
  niveau: "CP",
  numero: 6,
  titre: "Résoudre des problèmes",
  accroche: "Comprendre l'histoire, faire un schéma, choisir le calcul, puis répondre par une phrase.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Les quatre étapes",
      video: { titre: "Vidéo de Maître Lucas : les étapes pour résoudre des problèmes", youtube: "https://youtu.be/_f0zWAdvq7c" },
      texte:
        "1. **Comprendre** : je lis l'histoire et je la raconte avec mes mots. Qu'est-ce qu'on cherche ?\n" +
        "2. **Modéliser** : je fais un dessin ou un schéma, je choisis le calcul.\n" +
        "3. **Calculer** : je fais le calcul (avec des cubes, de tête ou posé).\n" +
        "4. **Répondre** : j'écris une phrase réponse et je vérifie que c'est possible.",
      exemple: {
        enonce: "Léa a $53$ euros. Elle achète un livre à $7$ euros. Combien lui reste-t-il ?",
        solution: "On cherche ce qui reste : $53 - 7 = 46$. Il lui reste $46$ euros."
      }
    },
    {
      titre: "Le tout et les parties",
      video: { titre: "Vidéo de Nathan Primaire : résoudre un problème de partie-tout", youtube: "https://youtu.be/MwdziNgFnuA" },
      texte:
        "Beaucoup de problèmes ont un **tout** fait de **parties**.\n\n" +
        "- On cherche le **tout** ? On ajoute les parties : addition.\n" +
        "- On cherche une **partie** ? On enlève l'autre partie du tout : soustraction.\n\n" +
        "Le schéma en barres aide à voir ce qu'on cherche. Ici le tout est $43$ cerises, une partie est $25$ : on cherche l'autre partie, $43 - 25 = 18$.",
      figure: "cp6-cours-tout",
      exemple: {
        enonce: "Il y avait $36$ oiseaux dans le manguier. Il n'en reste que $21$. Combien se sont envolés ?",
        solution: "Le tout : $36$. Une partie (ceux qui restent) : $21$. $36 - 21 = 15$ oiseaux se sont envolés."
      }
    },
    {
      titre: "Les problèmes en deux étapes",
      video: { titre: "Vidéo du CP Émile Gallé : le schéma tout et parties", youtube: "https://youtu.be/Z6h0XiORsKw" },
      texte:
        "Certaines histoires ont **deux moments**. On fait un calcul pour chaque moment, dans l'ordre.\n\n" +
        "Il y avait $29$ enfants dans le bus. $12$ descendent, puis $7$ montent :\n\n" +
        "- $29 - 12 = 17$ ;\n" +
        "- $17 + 7 = 24$.\n\n" +
        "Il y a $24$ enfants dans le bus.",
      exemple: {
        enonce: "Il y a $24$ livres : $7$ albums, $6$ BD, et le reste sont des documentaires. Combien de documentaires ?",
        solution: "$7 + 6 = 13$, puis $24 - 13 = 11$ documentaires."
      }
    },
    {
      titre: "Des groupes égaux, des partages",
      video: { titre: "Vidéo de Nathan Primaire : partage équitable et groupement", youtube: "https://youtu.be/dmLlSON6ABY" },
      texte:
        "- **Groupes égaux** : $3$ paquets de $7$ biscuits, c'est $7 + 7 + 7 = 21$ biscuits.\n" +
        "- **Combien de groupes ?** Avec $20$ œufs, on remplit des boîtes de $5$ : $5$, $10$, $15$, $20$, donc $4$ boîtes.\n" +
        "- **Partage équitable** : $12$ bonbons pour $3$ enfants. On distribue un par un : chacun en a $4$.\n\n" +
        "On peut dessiner des croix pour s'aider.",
      figure: "cp6-cours-groupes",
      exemple: {
        enonce: "Paul apporte $3$ paquets de $7$ biscuits. Combien de biscuits ?",
        solution: "$7 + 7 + 7 = 21$ biscuits."
      }
    }
  ],

  exercices: [
    { type: "cp6-parties", titre: "Le tout et les parties", etape: "Une étape", nb: 6 },
    { type: "cp6-groupes", titre: "Groupes égaux et partages", etape: "Une étape", nb: 6 },
    { type: "cp6-deux-etapes", titre: "Problèmes en deux étapes", etape: "Deux étapes", nb: 5 }
  ],

  qcm: [
    { question: "Dans un problème, la première étape est de :", choix: ["comprendre l'histoire", "calculer tout de suite", "écrire la réponse", "deviner"], bonne: 0, explication: "On commence toujours par comprendre ce qu'on cherche." },
    { question: "On réunit $30$ filles et $12$ garçons. Quel calcul ?", figure: "cp6-qcm-schema", choix: ["$30 + 12$", "$30 - 12$", "$12 - 30$", "$30 + 30$"], bonne: 0, explication: "On cherche le tout : on ajoute les parties." },
    { question: "Il y a $45$ élèves ; $20$ sont des garçons. Combien de filles ?", choix: ["$25$", "$65$", "$20$", "$45$"], bonne: 0, explication: "On cherche une partie : $45 - 20 = 25$." },
    { question: "Anli avait $18$ billes. Il en gagne $7$. Combien en a-t-il ?", choix: ["$25$", "$11$", "$187$", "$24$"], bonne: 0, explication: "$18 + 7 = 25$." },
    { question: "Il y avait $50$ poissons dans le filet. $12$ se sont échappés. Combien en reste-t-il ?", choix: ["$38$", "$62$", "$42$", "$12$"], bonne: 0, explication: "$50 - 12 = 38$." },
    { question: "Awa a mangé $6$ bonbons ; il en reste $21$. Combien y en avait-il ?", choix: ["$27$", "$15$", "$21$", "$6$"], bonne: 0, explication: "Avant = mangés + restants : $6 + 21 = 27$." },
    { question: "Dans le bus il y a $20$ enfants. $5$ descendent, puis $3$ montent. Combien sont-ils ?", choix: ["$18$", "$28$", "$12$", "$22$"], bonne: 0, explication: "$20 - 5 = 15$, puis $15 + 3 = 18$." },
    { question: "$4$ boîtes de $5$ œufs, c'est :", choix: ["$20$ œufs", "$9$ œufs", "$45$ œufs", "$1$ œuf"], bonne: 0, explication: "$5 + 5 + 5 + 5 = 20$." },
    { question: "On partage $15$ mangues entre $3$ enfants. Chacun reçoit :", choix: ["$5$ mangues", "$3$ mangues", "$12$ mangues", "$18$ mangues"], bonne: 0, explication: "$5 + 5 + 5 = 15$." },
    { question: "Avec $18$ élèves, on fait des équipes de $6$. Combien d'équipes ?", choix: ["$3$", "$6$", "$12$", "$24$"], bonne: 0, explication: "$6 + 6 + 6 = 18$ : $3$ équipes." },
    { question: "Kamal a $12$ billes. Il en gagne $5$ puis en perd $4$. Combien en a-t-il ?", choix: ["$13$", "$21$", "$11$", "$17$"], bonne: 0, explication: "$12 + 5 = 17$, puis $17 - 4 = 13$." },
    { question: "La barge transporte $20$, puis $15$, puis $10$ voitures. Combien en tout ?", choix: ["$45$", "$35$", "$30$", "$25$"], bonne: 0, explication: "$20 + 15 + 10 = 45$." },
    { question: "On cherche le tout quand on connaît les deux parties : on fait…", choix: ["une addition", "une soustraction", "un partage", "rien"], bonne: 0, explication: "Le tout est la somme des parties." },
    { question: "La réponse d'un problème s'écrit :", choix: ["avec une phrase", "seulement avec un nombre", "avec le calcul seulement", "avec un dessin seulement"], bonne: 0, explication: "On répond par une phrase qui reprend la question." },
    { question: "Fatima a $25$ euros. Un jeu coûte $30$ euros. Combien lui manque-t-il ?", choix: ["$5$ euros", "$55$ euros", "$30$ euros", "$25$ euros"], bonne: 0, explication: "$25 + 5 = 30$ : il manque $5$ euros." },
    { question: "$2$ rangées de $9$ chaises, c'est :", choix: ["$18$ chaises", "$11$ chaises", "$29$ chaises", "$7$ chaises"], bonne: 0, explication: "$9 + 9 = 18$." },
    { question: "Il y a $24$ livres : $10$ albums et $8$ BD, les autres sont des documentaires. Combien de documentaires ?", choix: ["$6$", "$14$", "$18$", "$16$"], bonne: 0, explication: "$10 + 8 = 18$, puis $24 - 18 = 6$." },
    { question: "On trouve $95$ enfants dans une classe de CP. Que penser de cette réponse ?", choix: ["Elle est impossible, il faut vérifier", "Elle est juste", "Elle est trop petite", "On ne peut rien dire"], bonne: 0, explication: "Une classe n'a pas $95$ élèves : on vérifie son calcul." }
  ],

  methode: [
    {
      titre: "Résoudre un problème",
      etapes: [
        "Lis et raconte l'histoire. Souligne la question.",
        "Fais un schéma : le tout, les parties, ce que tu cherches.",
        "Choisis le calcul et fais-le.",
        "Réponds par une phrase et vérifie que c'est possible."
      ],
      figure: "cp6-cours-tout",
      exemple: "Tout $43$, une partie $25$ : l'autre partie est $43 - 25 = 18$."
    },
    {
      titre: "Problème avec des groupes égaux",
      etapes: [
        "Repère combien il y a de groupes et combien dans chaque groupe.",
        "Dessine des croix si besoin.",
        "Ajoute le même nombre autant de fois qu'il y a de groupes."
      ],
      figure: "cp6-cours-groupes",
      exemple: "$3$ paquets de $7$ : $7 + 7 + 7 = 21$."
    }
  ],
  erreurs: [
    "Calculer avec les nombres de l'énoncé sans comprendre l'histoire.",
    "Ajouter quand on cherche une partie : on connaît le tout, on enlève.",
    "Oublier une des deux étapes.",
    "Dans un partage, donner le nombre d'enfants au lieu de la part de chacun.",
    "Oublier la phrase réponse ou ne pas vérifier si le résultat est possible."
  ]
};
