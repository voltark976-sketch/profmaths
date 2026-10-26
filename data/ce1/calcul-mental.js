/*
  CHAPITRE : CE1 — Calcul mental
  -------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE1, « Le calcul mental » (nombres jusqu'à 1 000) :
  - tables d'addition et de multiplication dans les deux sens ; doubles (1 à 15 ; 20, 25… 50 ; 100, 150… 500) et moitiés
    (pairs de 2 à 30 ; 40… 100 ; 200… 1 000) ; multiples de 25 jusqu'à 100 ;
  - ajouter ou soustraire des dizaines et des centaines entières ; multiplier par 10 un nombre inférieur à 100 ;
  - ajouter 9, 19, 29 ; soustraire 9 ; soustraire un nombre inférieur à 9 ; moitié d'un nombre pair par décomposition ;
    13 × 7 = 10 × 7 + 3 × 7.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce1-calcul-mental"] = {
  niveau: "CE1",
  numero: 7,
  titre: "Calcul mental",
  accroche: "Les tables, les doubles et les moitiés, et des astuces pour calculer vite jusqu'à $1\\,000$.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Ce que je sais par cœur",
      video: { titre: "Vidéo de Maître Lucas : doubles et moitiés jusqu'à 100", youtube: "https://youtu.be/h-MK8FgnsdY" },
      texte:
        "- Les tables d'addition et de multiplication, dans les deux sens.\n" +
        "- Les doubles : de $1$ à $15$ ; de $20$, $25$, $30$… $50$ ; de $100$, $150$, $200$… $500$.\n" +
        "- Les moitiés : des nombres pairs jusqu'à $30$ ; de $40$… $100$ ; de $200$… $1\\,000$ (la moitié de $1\\,000$ est $500$).\n" +
        "- $1 \\times 25 = 25$ ; $2 \\times 25 = 50$ ; $3 \\times 25 = 75$ ; $4 \\times 25 = 100$.",
      exemple: {
        enonce: "Double de $150$ ? Moitié de $70$ ?",
        solution: "Double de $150$ : $300$. Moitié de $70$ : $35$."
      }
    },
    {
      titre: "Dizaines, centaines et $\\times 10$",
      video: { titre: "Vidéo de Maître Lucas : la table de 10", youtube: "https://youtu.be/l1A5ZHC3hLg" },
      texte:
        "- $234 + 60$ : on ajoute $6$ dizaines → $294$.\n" +
        "- $765 - 200$ : on enlève $2$ centaines → $565$.\n" +
        "- $746 + 80$ : $74 + 8 = 82$ dizaines → $826$.\n" +
        "- $\\times 10$ : chaque unité devient une dizaine. $47 \\times 10 = 470$.",
      exemple: {
        enonce: "Calcule $541 - 20$ et $63 \\times 10$.",
        solution: "$541 - 20 = 521$ ; $63 \\times 10 = 630$."
      }
    },
    {
      titre: "Des astuces",
      video: { titre: "Vidéo de Maître Lucas : additionner et soustraire 9", youtube: "https://youtu.be/jC6b1llu2Cw" },
      texte:
        "- Ajouter $9$, $19$, $29$ : on ajoute $10$, $20$, $30$ puis on enlève $1$. $57 + 29$ → $87$ → $86$.\n" +
        "- Soustraire $9$ : on enlève $10$ puis on ajoute $1$. $83 - 9$ → $73$ → $74$.\n" +
        "- Soustraire un petit nombre en passant par la dizaine : $153 - 7$ → $150$ (on a enlevé $3$) → $146$ (on enlève encore $4$).\n" +
        "- Moitié de $246$ : $200 + 40 + 6$, moitiés $100 + 20 + 3 = 123$.\n" +
        "- $13 \\times 7$, c'est $10 \\times 7 + 3 \\times 7 = 70 + 21 = 91$.",
      exemple: {
        enonce: "Calcule $16 \\times 4$.",
        solution: "$10 \\times 4 + 6 \\times 4 = 40 + 24 = 64$."
      }
    }
  ],

  exercices: [
    { type: "e1k-faits", titre: "Tables, doubles et moitiés", etape: "Ce que je sais par cœur", nb: 8 },
    { type: "e1k-numeration", titre: "Dizaines, centaines, × 10, + 9…", etape: "Mes astuces", nb: 8 },
    { type: "e1k-procedures", titre: "Moitiés, petites soustractions, 13 × 7", etape: "Mes astuces", nb: 8 }
  ],

  qcm: [
    { question: "Le double de $13$ est :", choix: ["$26$", "$16$", "$23$", "$39$"], bonne: 0, explication: "$13 + 13 = 26$." },
    { question: "Le double de $250$ est :", choix: ["$500$", "$450$", "$252$", "$125$"], bonne: 0, explication: "$250 + 250 = 500$." },
    { question: "La moitié de $30$ est :", choix: ["$15$", "$60$", "$13$", "$10$"], bonne: 0, explication: "$15 + 15 = 30$." },
    { question: "La moitié de $800$ est :", choix: ["$400$", "$1\\,600$", "$80$", "$300$"], bonne: 0, explication: "$400 + 400 = 800$." },
    { question: "$3 \\times 25 = $", choix: ["$75$", "$28$", "$50$", "$325$"], bonne: 0, explication: "$25 + 25 + 25 = 75$." },
    { question: "$234 + 60 = $", choix: ["$294$", "$240$", "$834$", "$284$"], bonne: 0, explication: "On ajoute $6$ dizaines." },
    { question: "$765 - 200 = $", choix: ["$565$", "$745$", "$763$", "$965$"], bonne: 0, explication: "On enlève $2$ centaines." },
    { question: "$746 + 80 = $", choix: ["$826$", "$754$", "$816$", "$1\\,546$"], bonne: 0, explication: "$74 + 8 = 82$ dizaines." },
    { question: "$58 \\times 10 = $", choix: ["$580$", "$68$", "$5\\,800$", "$518$"], bonne: 0, explication: "Un zéro à droite." },
    { question: "$46 + 9 = $", choix: ["$55$", "$56$", "$54$", "$65$"], bonne: 0, explication: "$46 + 10 = 56$, puis $56 - 1 = 55$." },
    { question: "$57 + 29 = $", choix: ["$86$", "$87$", "$76$", "$96$"], bonne: 0, explication: "$57 + 30 = 87$, puis $87 - 1 = 86$." },
    { question: "$83 - 9 = $", choix: ["$74$", "$72$", "$73$", "$92$"], bonne: 0, explication: "$83 - 10 = 73$, puis $73 + 1 = 74$." },
    { question: "$153 - 7 = $", choix: ["$146$", "$156$", "$144$", "$150$"], bonne: 0, explication: "$153 - 3 = 150$, puis $150 - 4 = 146$." },
    { question: "La moitié de $246$ est :", choix: ["$123$", "$143$", "$492$", "$223$"], bonne: 0, explication: "$100 + 20 + 3 = 123$." },
    { question: "$13 \\times 7 = $", choix: ["$91$", "$20$", "$73$", "$81$"], bonne: 0, explication: "$70 + 21 = 91$." },
    { question: "$7 \\times 8 = $", choix: ["$56$", "$15$", "$54$", "$64$"], bonne: 0, explication: "Table de $7$ ou de $8$." },
    { question: "$9 + \\ldots = 17$", choix: ["$8$", "$26$", "$7$", "$9$"], bonne: 0, explication: "$9 + 8 = 17$." },
    { question: "$100 = 4 \\times \\ldots$", choix: ["$25$", "$20$", "$96$", "$40$"], bonne: 0, explication: "$4 \\times 25 = 100$." }
  ],

  methode: [
    {
      titre: "Ajouter $29$ à un nombre",
      etapes: [
        "Ajoute $30$ (trois dizaines).",
        "Enlève $1$.",
        "Vérifie l'ordre de grandeur."
      ],
      exemple: "$64 + 29$ : $64 + 30 = 94$, puis $93$."
    },
    {
      titre: "Multiplier un nombre de $11$ à $19$",
      etapes: [
        "Décompose : $14 = 10 + 4$.",
        "Multiplie chaque morceau : $10 \\times 6$ et $4 \\times 6$.",
        "Ajoute les deux résultats."
      ],
      exemple: "$14 \\times 6 = 60 + 24 = 84$."
    }
  ],
  erreurs: [
    "Ajouter $10$ aux unités : $234 + 60 = 294$, pas $240$.",
    "Ajouter $9$ en ajoutant $10$ sans enlever $1$.",
    "Pour soustraire $9$, enlever $10$ puis enlever encore $1$ : il faut ajouter $1$.",
    "$13 \\times 7$ : oublier le $3 \\times 7$.",
    "Confondre double et moitié."
  ]
};
