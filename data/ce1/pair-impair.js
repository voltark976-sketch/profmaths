/*
  CHAPITRE : CE1 — Pair ou impair
  --------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE1, « Les quatre opérations » : connaitre la notion de parité
  d'un nombre ; dire si un nombre est pair ou impair ; donner tous les nombres pairs entre 767 et 778.
  Jamais de question à deux choix (pair / impair) : on fait chercher un nombre pair parmi plusieurs, ou compter.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce1-pair-impair"] = {
  niveau: "CE1",
  numero: 3,
  titre: "Pair ou impair",
  accroche: "Un nombre pair se range par deux sans reste. Il suffit de regarder son chiffre des unités.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Ranger par deux",
      video: { titre: "Vidéo de Maître Lucas : pair et impair", youtube: "https://youtu.be/3b3SGjBuKMc" },
      texte:
        "Un nombre est **pair** quand on peut ranger les objets **par deux** sans qu'il en reste un tout seul.\n\n" +
        "- $8$ chaussures : $4$ paires, il ne reste rien. $8$ est **pair**.\n" +
        "- $7$ mangues : $3$ paires et $1$ mangue toute seule. $7$ est **impair**.\n\n" +
        "Les nombres pairs sont ceux de la table de $2$ : $0$, $2$, $4$, $6$, $8$, $10$, $12$…",
      exemple: {
        enonce: "Anli a $13$ billes. Il fait des paires. En reste-t-il une toute seule ?",
        solution: "$13 = 6$ paires et $1$ bille : oui, il en reste une. $13$ est impair."
      }
    },
    {
      titre: "Le chiffre des unités suffit",
      video: { titre: "Vidéo d'« Éveiller mon enfant » : les nombres pairs et impairs", youtube: "https://youtu.be/PXw-f9ZXjIo" },
      texte:
        "Pour savoir si un grand nombre est pair, on regarde seulement son **chiffre des unités** :\n\n" +
        "- $0$, $2$, $4$, $6$, $8$ → le nombre est **pair** ($354$, $780$) ;\n" +
        "- $1$, $3$, $5$, $7$, $9$ → le nombre est **impair** ($467$, $901$).\n\n" +
        "Les nombres pairs et impairs se suivent : pair, impair, pair, impair…",
      exemple: {
        enonce: "Donne tous les nombres pairs compris entre $767$ et $778$.",
        solution: "$768$ ; $770$ ; $772$ ; $774$ ; $776$."
      }
    }
  ],

  exercices: [
    { type: "e1p-trouver", titre: "Trouver et compter les nombres pairs ou impairs", etape: "Pair ou impair", nb: 6 },
    { type: "e1p-groupes", titre: "Ranger par deux", etape: "Pair ou impair", nb: 6 },
    { type: "e1p-suite", titre: "Les suites de nombres pairs ou impairs", etape: "Pair ou impair", nb: 6 }
  ],

  qcm: [
    { question: "Quel nombre est pair ?", choix: ["$346$", "$347$", "$349$", "$351$"], bonne: 0, explication: "$346$ se termine par $6$." },
    { question: "Quel nombre est impair ?", choix: ["$705$", "$700$", "$702$", "$708$"], bonne: 0, explication: "$705$ se termine par $5$." },
    { question: "Un nombre pair se termine par :", choix: ["$0$, $2$, $4$, $6$ ou $8$", "$1$, $3$, $5$, $7$ ou $9$", "$5$ seulement", "n'importe quel chiffre"], bonne: 0, explication: "Les chiffres pairs des unités." },
    { question: "Combien de nombres pairs entre $20$ et $30$ (sans $20$ ni $30$) ?", choix: ["$4$", "$5$", "$10$", "$3$"], bonne: 0, explication: "$22$, $24$, $26$, $28$." },
    { question: "Le nombre pair juste après $459$ est :", choix: ["$460$", "$461$", "$458$", "$462$"], bonne: 0, explication: "$459 + 1 = 460$." },
    { question: "Le nombre impair juste avant $300$ est :", choix: ["$299$", "$298$", "$301$", "$290$"], bonne: 0, explication: "$300 - 1 = 299$." },
    { question: "Avec $15$ chaussettes, combien en reste-t-il seule si on fait des paires ?", choix: ["$1$", "$0$", "$7$", "$2$"], bonne: 0, explication: "$15 = 7$ paires et $1$ chaussette." },
    { question: "Avec $24$ élèves en rangs par deux, combien restent seuls ?", choix: ["$0$", "$1$", "$12$", "$2$"], bonne: 0, explication: "$24$ est pair : $12$ paires." },
    { question: "Quelle liste ne contient que des nombres pairs ?", choix: ["$12$ ; $38$ ; $500$", "$12$ ; $37$ ; $500$", "$11$ ; $38$ ; $501$", "$13$ ; $35$ ; $57$"], bonne: 0, explication: "$2$, $8$, $0$ : chiffres pairs." },
    { question: "Quelle liste ne contient que des nombres impairs ?", choix: ["$31$ ; $57$ ; $999$", "$31$ ; $58$ ; $999$", "$30$ ; $57$ ; $999$", "$32$ ; $54$ ; $76$"], bonne: 0, explication: "$1$, $7$, $9$ : chiffres impairs." },
    { question: "Les nombres pairs sont les nombres de la table de :", choix: ["$2$", "$3$", "$5$", "$10$"], bonne: 0, explication: "$2$, $4$, $6$, $8$…" },
    { question: "Après un nombre pair vient toujours :", choix: ["un nombre impair", "un nombre pair", "un nombre rond", "zéro"], bonne: 0, explication: "Pair et impair alternent." },
    { question: "Combien de nombres impairs entre $50$ et $60$ ?", choix: ["$5$", "$4$", "$10$", "$6$"], bonne: 0, explication: "$51$, $53$, $55$, $57$, $59$." },
    { question: "$0$ est :", choix: ["pair", "impair", "ni pair ni impair, c'est zéro", "un nombre à virgule"], bonne: 0, explication: "On peut faire des paires avec $0$ objet sans reste : $0$ est pair." },
    { question: "Lequel n'est pas pair ?", choix: ["$123$", "$124$", "$120$", "$128$"], bonne: 0, explication: "$123$ se termine par $3$." },
    { question: "Kamal a un nombre impair de billes entre $10$ et $13$. Il a :", choix: ["$11$ billes", "$12$ billes", "$10$ billes", "$14$ billes"], bonne: 0, explication: "Entre $10$ et $13$ : $11$ et $12$ ; seul $11$ est impair." },
    { question: "Si on ajoute $2$ à un nombre pair, on obtient :", choix: ["un nombre pair", "un nombre impair", "zéro", "un nombre à virgule"], bonne: 0, explication: "$4 + 2 = 6$, $10 + 2 = 12$ : toujours pair." },
    { question: "$1\\,000$ est :", choix: ["pair", "impair", "ni l'un ni l'autre", "un nombre à virgule"], bonne: 0, explication: "Il se termine par $0$." }
  ],

  methode: [
    {
      titre: "Savoir si un nombre est pair",
      etapes: [
        "Regarde seulement le chiffre des unités.",
        "$0$, $2$, $4$, $6$, $8$ : le nombre est pair.",
        "$1$, $3$, $5$, $7$, $9$ : il est impair."
      ],
      exemple: "$738$ se termine par $8$ : pair. $529$ se termine par $9$ : impair."
    }
  ],
  erreurs: [
    "Regarder le premier chiffre au lieu du chiffre des unités : $347$ est impair.",
    "Croire que $0$ n'est ni pair ni impair : $0$ est pair.",
    "Compter les bornes quand on demande les nombres « entre » deux nombres."
  ]
};
