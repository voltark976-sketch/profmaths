/*
  CHAPITRE : CE2 — Découvrir la division
  ---------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE2 : comprendre le sens de la division et utiliser le symbole ÷ ;
  la division est l'inverse de la multiplication (7 × 13 = 91, donc 91 ÷ 7 = 13 et 91 ÷ 13 = 7) ;
  problèmes de partage (valeur d'une part) et de groupement (nombre de parts). Pas de division posée au CE2.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce2-division"] = {
  niveau: "CE2",
  numero: 6,
  titre: "Découvrir la division",
  accroche: "Partager en parts égales, faire des groupes : le signe $\\div$ et le lien avec la multiplication.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Partager en parts égales",
      video: { titre: "Vidéo de Maître Lucas : diviser pour partager", youtube: "https://youtu.be/3nhIyOT9sPI" },
      texte:
        "On partage $24$ mangues entre $4$ enfants, chacun autant : chacun en a $6$.\n\n" +
        "On écrit $24 \\div 4 = 6$ et on lit « $24$ divisé par $4$ égale $6$ ».\n\n" +
        "On vérifie : $4 \\times 6 = 24$.",
      exemple: { enonce: "$35$ billes pour $5$ enfants : combien chacun ?", solution: "$35 \\div 5 = 7$ car $5 \\times 7 = 35$." }
    },
    {
      titre: "Faire des groupes",
      video: { titre: "Vidéo de Maître Lucas : diviser pour grouper", youtube: "https://youtu.be/brrNvOq9Emo" },
      texte:
        "Avec $30$ élèves, on fait des équipes de $5$ : combien d'équipes ? On cherche combien de fois $5$ dans $30$ : $30 \\div 5 = 6$ équipes.",
      exemple: { enonce: "$48$ œufs rangés par $6$ : combien de boîtes ?", solution: "$48 \\div 6 = 8$ boîtes." }
    },
    {
      titre: "La division défait la multiplication",
      video: { titre: "Vidéo de Maître Lucas : comprendre le sens de la division", youtube: "https://youtu.be/T0IPInBxrpA" },
      texte:
        "$7 \\times 13 = 91$, donc $91 \\div 7 = 13$ et $91 \\div 13 = 7$.\n\n" +
        "Pour calculer $56 \\div 8$, on cherche dans la table de $8$ : $8 \\times 7 = 56$, donc $56 \\div 8 = 7$.",
      exemple: { enonce: "Sachant que $12 \\times 6 = 72$, combien fait $72 \\div 12$ ?", solution: "$6$." }
    }
  ],
  exercices: [
    { type: "e2v-sens", titre: "Partager et grouper", etape: "Le sens de la division", nb: 6 },
    { type: "e2v-tables", titre: "Diviser avec les tables", etape: "Calculer", nb: 8 },
    { type: "e2r-partage", titre: "Problèmes de partage", etape: "Calculer", nb: 5 }
  ],
  qcm: [
    { question: "$24 \\div 4 = $", choix: ["$6$", "$20$", "$28$", "$8$"], bonne: 0, explication: "$4 \\times 6 = 24$." },
    { question: "$35 \\div 5 = $", choix: ["$7$", "$30$", "$40$", "$6$"], bonne: 0, explication: "$5 \\times 7 = 35$." },
    { question: "$56 \\div 8 = $", choix: ["$7$", "$48$", "$6$", "$8$"], bonne: 0, explication: "$8 \\times 7 = 56$." },
    { question: "$7 \\times 13 = 91$, donc $91 \\div 7 = $", choix: ["$13$", "$7$", "$84$", "$98$"], bonne: 0, explication: "La division défait la multiplication." },
    { question: "« $30 \\div 5$ » se lit :", choix: ["$30$ divisé par $5$", "$30$ fois $5$", "$30$ moins $5$", "$5$ divisé par $30$"], bonne: 0, explication: "Le signe $\\div$ se lit « divisé par »." },
    { question: "$30$ élèves en équipes de $5$ : combien d'équipes ?", choix: ["$6$", "$25$", "$150$", "$5$"], bonne: 0, explication: "$30 \\div 5 = 6$." },
    { question: "$48$ œufs dans des boîtes de $6$ :", choix: ["$8$ boîtes", "$42$ boîtes", "$6$ boîtes", "$54$ boîtes"], bonne: 0, explication: "$48 \\div 6 = 8$." },
    { question: "On partage $45$ € entre $9$ amis. Chacun reçoit :", choix: ["$5$ €", "$36$ €", "$9$ €", "$54$ €"], bonne: 0, explication: "$9 \\times 5 = 45$." },
    { question: "$100 \\div 10 = $", choix: ["$10$", "$90$", "$1\\,000$", "$1$"], bonne: 0, explication: "$10 \\times 10 = 100$." },
    { question: "$63 \\div 9 = $", choix: ["$7$", "$54$", "$72$", "$6$"], bonne: 0, explication: "$9 \\times 7 = 63$." },
    { question: "Pour vérifier $42 \\div 6 = 7$, on calcule :", choix: ["$6 \\times 7$", "$42 + 6$", "$42 - 6$", "$7 + 6$"], bonne: 0, explication: "$6 \\times 7 = 42$." },
    { question: "$18 \\div 2 = $", choix: ["$9$", "$16$", "$36$", "$8$"], bonne: 0, explication: "La moitié de $18$." },
    { question: "Diviser par $2$, c'est prendre :", choix: ["la moitié", "le double", "le quart", "le triple"], bonne: 0, explication: "Partager en deux parts égales." },
    { question: "$80 \\div 10 = $", choix: ["$8$", "$70$", "$800$", "$90$"], bonne: 0, explication: "$10 \\times 8 = 80$." },
    { question: "On range $40$ livres sur $5$ étagères, autant sur chacune :", choix: ["$8$ livres", "$35$ livres", "$45$ livres", "$200$ livres"], bonne: 0, explication: "$40 \\div 5 = 8$." },
    { question: "$27 \\div 3 = $", choix: ["$9$", "$24$", "$30$", "$8$"], bonne: 0, explication: "$3 \\times 9 = 27$." },
    { question: "Dans un partage équitable :", choix: ["chacun reçoit autant", "le premier reçoit plus", "on garde le reste", "on multiplie"], bonne: 0, explication: "Équitable : parts égales." },
    { question: "$72 \\div 12 = 6$ car :", choix: ["$12 \\times 6 = 72$", "$72 - 12 = 60$", "$72 + 12 = 84$", "$6 + 12 = 18$"], bonne: 0, explication: "La multiplication donne la division." }
  ],
  methode: [
    { titre: "Calculer une division avec les tables", etapes: ["Écris l'égalité à trou : $8 \\times \\ldots = 56$.", "Cherche dans la table de $8$.", "Vérifie avec la multiplication."], exemple: "$56 \\div 8 = 7$ car $8 \\times 7 = 56$." }
  ],
  erreurs: ["Soustraire au lieu de diviser.", "Donner le nombre d'enfants au lieu de la part de chacun.", "Inverser : $5 \\div 30$ n'est pas $30 \\div 5$.", "Ne pas vérifier avec une multiplication."]
};
