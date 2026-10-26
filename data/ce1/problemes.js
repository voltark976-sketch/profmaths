/*
  CHAPITRE : CE1 — Résoudre des problèmes
  ----------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE1, « La résolution de problèmes » (nombres jusqu'à 1 000) :
  - problèmes additifs en une étape de type parties-tout (schéma en barres) et de transformation ;
  - problèmes additifs de comparaison (« de plus », « de moins », écart) ;
  - problèmes multiplicatifs en une étape : valeur du tout, nombre de parts, valeur d'une part ;
  - problèmes en deux étapes mêlant les opérations (« 7 litres à 2 € ; on donne 20 € »).
  figure : schémas en barres (assets/exercices-ecole.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce1-problemes"] = {
  niveau: "CE1",
  numero: 8,
  titre: "Résoudre des problèmes",
  accroche: "Le tout et les parties, « de plus » et « de moins », des groupes égaux et des partages : choisir le bon calcul grâce au schéma.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Le schéma en barres",
      video: { titre: "Vidéo de Maître Lucas : les étapes pour résoudre des problèmes", youtube: "https://youtu.be/_f0zWAdvq7c" },
      texte:
        "On dessine une barre pour le **tout** et des barres pour les **parties**.\n\n" +
        "« Dans mes deux coffres, j'ai $227$ billes. J'en ai $113$ dans le coffre vert. Combien dans le coffre rouge ? »\n\n" +
        "Le tout ($227$) est connu, une partie ($113$) aussi : on cherche l'autre partie, $227 - 113 = 114$ billes.",
      exemple: {
        enonce: "J'avais des images. J'en ai distribué $56$ ; il m'en reste $38$. Combien en avais-je ?",
        solution: "Le tout = distribuées + restantes : $56 + 38 = 94$ images."
      }
    },
    {
      titre: "« De plus » et « de moins »",
      video: { titre: "Vidéo de Nathan Primaire : résoudre un problème de comparaison", youtube: "https://youtu.be/SGX5xOIKpzM" },
      texte:
        "- « Lucie a $75$ billes **de plus** que Léo, qui en a $188$ » : Lucie en a $188 + 75 = 263$.\n" +
        "- « Sam a $40$ € **de moins** que Zoé, qui a $120$ € » : Sam a $120 - 40 = 80$ €.\n" +
        "- « Combien de plus ? » : on cherche l'**écart**, par une soustraction.\n\n" +
        "Un schéma avec deux barres l'une sous l'autre aide à voir qui a le plus.",
      exemple: {
        enonce: "Awa a lu $230$ pages et Saïd $180$. Combien de pages de plus a-t-elle lues ?",
        solution: "Écart : $230 - 180 = 50$ pages."
      }
    },
    {
      titre: "Groupes égaux et partages",
      video: { titre: "Vidéo de Nathan Primaire : partage équitable et groupement", youtube: "https://youtu.be/dmLlSON6ABY" },
      texte:
        "- **Le tout** : $6$ boîtes de $10$ crayons → $6 \\times 10 = 60$ crayons.\n" +
        "- **Combien de groupes ?** $60$ élèves en équipes de $5$ → $12$ équipes (car $12 \\times 5 = 60$).\n" +
        "- **Une part** : $40$ bonbons pour $8$ enfants → $5$ chacun (car $8 \\times 5 = 40$).",
      exemple: {
        enonce: "Abi achète $7$ litres d'huile à $2$ € le litre et donne $20$ €. Combien lui rend-on ?",
        solution: "Prix : $7 \\times 2 = 14$ €. Monnaie : $20 - 14 = 6$ €."
      }
    }
  ],

  exercices: [
    { type: "e1r-parties", titre: "Le tout et les parties", etape: "Problèmes additifs", nb: 5 },
    { type: "e1r-comparaison", titre: "De plus, de moins", etape: "Problèmes additifs", nb: 5 },
    { type: "e1r-multiplicatif", titre: "Groupes égaux et partages", etape: "Problèmes multiplicatifs", nb: 5 },
    { type: "e1r-etapes", titre: "Problèmes en deux étapes", etape: "Problèmes multiplicatifs", nb: 4 }
  ],

  qcm: [
    { question: "Dans deux coffres, il y a $300$ billes ; $120$ sont dans le premier. Dans le second :", choix: ["$180$", "$420$", "$120$", "$200$"], bonne: 0, explication: "$300 - 120 = 180$." },
    { question: "Léo a $150$ billes ; Lucie en a $40$ de plus. Lucie en a :", choix: ["$190$", "$110$", "$40$", "$154$"], bonne: 0, explication: "« De plus » : $150 + 40$." },
    { question: "Zoé a $90$ € ; Sam a $25$ € de moins. Sam a :", choix: ["$65$ €", "$115$ €", "$25$ €", "$75$ €"], bonne: 0, explication: "« De moins » : $90 - 25$." },
    { question: "Awa a $320$ points et Anli $250$. Combien de points de plus a Awa ?", choix: ["$70$", "$570$", "$130$", "$80$"], bonne: 0, explication: "Écart : $320 - 250 = 70$." },
    { question: "$8$ boîtes de $6$ œufs, c'est :", choix: ["$48$ œufs", "$14$ œufs", "$86$ œufs", "$42$ œufs"], bonne: 0, explication: "$8 \\times 6 = 48$." },
    { question: "$30$ élèves en équipes de $5$, c'est :", choix: ["$6$ équipes", "$25$ équipes", "$35$ équipes", "$5$ équipes"], bonne: 0, explication: "$6 \\times 5 = 30$." },
    { question: "$36$ bonbons partagés entre $4$ enfants : chacun en a :", choix: ["$9$", "$32$", "$40$", "$8$"], bonne: 0, explication: "$4 \\times 9 = 36$." },
    { question: "J'ai distribué $45$ images, il m'en reste $30$. Au début j'en avais :", choix: ["$75$", "$15$", "$45$", "$65$"], bonne: 0, explication: "$45 + 30 = 75$." },
    { question: "$5$ litres à $3$ € le litre ; je donne $20$ €. On me rend :", choix: ["$5$ €", "$15$ €", "$12$ €", "$8$ €"], bonne: 0, explication: "$5 \\times 3 = 15$ ; $20 - 15 = 5$." },
    { question: "« Combien de plus ? » se calcule avec :", choix: ["une soustraction", "une addition", "une multiplication", "un partage"], bonne: 0, explication: "On cherche l'écart." },
    { question: "$3$ tables de $4$ personnes et $2$ tables de $6$ personnes : en tout",  choix: ["$24$ personnes", "$15$ personnes", "$10$ personnes", "$20$ personnes"], bonne: 0, explication: "$12 + 12 = 24$." },
    { question: "Il y a $250$ élèves à l'école ; $130$ sont des filles. Combien de garçons ?", choix: ["$120$", "$380$", "$130$", "$220$"], bonne: 0, explication: "$250 - 130 = 120$." },
    { question: "Moussa a $6$ fois plus de billes que Kamal, qui en a $5$. Moussa en a :", choix: ["$30$", "$11$", "$65$", "$1$"], bonne: 0, explication: "« fois plus » : $6 \\times 5$." },
    { question: "Une partie vaut $240$, l'autre $160$. Le tout vaut :", choix: ["$400$", "$80$", "$300$", "$360$"], bonne: 0, explication: "$240 + 160 = 400$." },
    { question: "La barge fait $4$ voyages avec $50$ voitures chacun. Elle transporte :", choix: ["$200$ voitures", "$54$ voitures", "$450$ voitures", "$100$ voitures"], bonne: 0, explication: "$4 \\times 50 = 200$." },
    { question: "Dans un problème, pour savoir quel calcul faire, on peut :", choix: ["faire un schéma", "prendre les nombres au hasard", "toujours additionner", "deviner"], bonne: 0, explication: "Le schéma montre le tout, les parties et ce qu'on cherche." },
    { question: "Fatima a $15$ € ; un livre coûte $40$ €. Combien lui manque-t-il ?", choix: ["$25$ €", "$55$ €", "$15$ €", "$35$ €"], bonne: 0, explication: "$40 - 15 = 25$." },
    { question: "Il y a $9$ rangées de $10$ chaises. Combien de chaises ?", choix: ["$90$", "$19$", "$910$", "$80$"], bonne: 0, explication: "$9 \\times 10 = 90$." }
  ],

  methode: [
    {
      titre: "Résoudre un problème avec un schéma",
      etapes: [
        "Lis et repère ce qu'on cherche (le tout ? une partie ? un écart ?).",
        "Fais le schéma en barres avec les nombres connus et un « ? ».",
        "Choisis l'opération, calcule, réponds par une phrase."
      ],
      exemple: "Tout $227$, partie $113$ : $227 - 113 = 114$."
    },
    {
      titre: "« De plus » ou « fois plus » ?",
      etapes: [
        "« $5$ de plus » : on ajoute $5$.",
        "« $5$ fois plus » : on multiplie par $5$.",
        "Relis la question pour vérifier."
      ],
      exemple: "$8$ et « $3$ de plus » : $11$. $8$ et « $3$ fois plus » : $24$."
    }
  ],
  erreurs: [
    "Additionner parce qu'on voit « plus » alors qu'on cherche un écart.",
    "Confondre « de plus » (addition) et « fois plus » (multiplication).",
    "Dans un partage, donner le nombre d'enfants au lieu de la part de chacun.",
    "Oublier une étape dans un problème en deux étapes.",
    "Ne pas vérifier que la réponse est possible."
  ]
};
