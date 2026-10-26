/*
  CHAPITRE : CP — Calcul mental
  ------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CP, « Le calcul mental » (nombres jusqu'à 100) :
  - mémoriser : tables d'addition dans les deux sens (A + B = C, A et B de 0 à 10) ; doubles de 1 à 10 et de 20, 30, 40, 50 ;
    moitiés des nombres pairs de 2 à 20 et de 40, 60, 80, 100 ;
  - numération : ajouter ou soustraire 1, 2, 10, 20… 90 ;
  - procédures : complément à la dizaine supérieure, ajouter un nombre inférieur à 9 en passant par la dizaine, ajouter 9,
    ajouter deux nombres inférieurs à 100, moitié d'un nombre pair, soustraire un nombre inférieur à 10 à une dizaine entière.
  figure : FIGURES de assets/exercices-cp.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cp-calcul-mental"] = {
  niveau: "CP",
  numero: 5,
  titre: "Calcul mental",
  accroche: "Les tables d'addition, les doubles et les moitiés, et des astuces pour calculer vite dans sa tête.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Les tables d'addition",
      video: { titre: "Vidéo de Maître Lucas : les maisons d'additions", youtube: "https://youtu.be/ClYbL0QF2hE" },
      texte:
        "Il faut connaître par cœur les additions de deux nombres de $0$ à $10$, **dans les deux sens** :\n\n" +
        "- $5 + 3 = 8$ ;\n" +
        "- $4 + \\ldots = 12$ (réponse : $8$) ;\n" +
        "- $10 = 7 + \\ldots$ (réponse : $3$).\n\n" +
        "Les **compléments à $10$** sont très utiles : $1 + 9$, $2 + 8$, $3 + 7$, $4 + 6$, $5 + 5$.",
      exemple: {
        enonce: "Complète : $6 + \\ldots = 13$.",
        solution: "$6 + 4 = 10$ et encore $3$ : $6 + 7 = 13$."
      }
    },
    {
      titre: "Les doubles et les moitiés",
      video: { titre: "Vidéo de Maître Lucas : les doubles jusqu'à 10", youtube: "https://youtu.be/i3JrnotelRc" },
      texte:
        "- Le **double** d'un nombre, c'est ce nombre ajouté à lui-même : le double de $7$ est $7 + 7 = 14$ ; le double de $30$ est $60$.\n" +
        "- La **moitié** d'un nombre, c'est le partager en deux parts égales : la moitié de $14$ est $7$ ; la moitié de $80$ est $40$.\n\n" +
        "Pour la moitié de $46$ : $46 = 40 + 6$, la moitié de $40$ est $20$, celle de $6$ est $3$, donc $23$.",
      exemple: {
        enonce: "Quel est le double de $9$ ? Quelle est la moitié de $60$ ?",
        solution: "Double de $9$ : $18$. Moitié de $60$ : $30$."
      }
    },
    {
      titre: "Ajouter ou enlever des dizaines",
      video: { titre: "Vidéo de Maître Lucas : additionner et soustraire des dizaines entières", youtube: "https://youtu.be/ZO--oenG3dk" },
      texte:
        "Ajouter $10$, c'est ajouter **une dizaine** : seul le chiffre des dizaines change. $37 + 10 = 47$.\n\n" +
        "Enlever $30$, c'est enlever **trois dizaines** : $76 - 30 = 46$.\n\n" +
        "Ajouter $1$, c'est dire le nombre juste après ; enlever $2$, c'est reculer de $1$ deux fois.",
      exemple: {
        enonce: "Calcule $58 + 20$ et $83 - 40$.",
        solution: "$5 + 2 = 7$ dizaines : $78$. $8 - 4 = 4$ dizaines : $43$."
      }
    },
    {
      titre: "Passer par la dizaine",
      video: { titre: "Vidéo de Maître Lucas : additionner en passant par 10", youtube: "https://youtu.be/fxvT1XoL__0" },
      texte:
        "Pour calculer $47 + 8$ :\n\n" +
        "1. de $47$ à $50$, il faut $3$ (c'est le **complément** à la dizaine) ;\n" +
        "2. il reste à ajouter $8 - 3 = 5$ ;\n" +
        "3. $50 + 5 = 55$.\n\n" +
        "Pour calculer $50 - 6$, on casse une dizaine : $50 = 40 + 10$ et $10 - 6 = 4$, donc $44$.",
      figure: "cp5-cours-passer10",
      exemple: {
        enonce: "Calcule $36 + 7$.",
        solution: "$36 + 4 = 40$, puis $40 + 3 = 43$."
      }
    },
    {
      titre: "Ajouter $9$, ajouter deux nombres",
      video: { titre: "Vidéo de « Mon CP à petits pas » : ajouter 9", youtube: "https://youtu.be/QzzBk6Et-t4" },
      texte:
        "- Ajouter $9$, c'est **ajouter $10$ puis enlever $1$** : $37 + 9$ → $47$ → $46$.\n" +
        "- Pour $47 + 28$ : dizaines $40 + 20 = 60$, unités $7 + 8 = 15$, puis $60 + 15 = 75$.",
      figure: "cp5-cours-plus9",
      exemple: {
        enonce: "Calcule $64 + 9$.",
        solution: "$64 + 10 = 74$, puis $74 - 1 = 73$."
      }
    }
  ],

  exercices: [
    { type: "cp5-tables", titre: "Les tables d'addition", etape: "Ce que je sais par cœur", nb: 8 },
    { type: "cp5-doubles", titre: "Doubles et moitiés", etape: "Ce que je sais par cœur", nb: 8 },
    { type: "cp5-dizaines", titre: "Ajouter ou enlever 1, 2, 10, des dizaines", etape: "Mes astuces", nb: 8 },
    { type: "cp5-procedures", titre: "Passer par la dizaine, ajouter 9…", etape: "Mes astuces", nb: 8 }
  ],

  qcm: [
    { question: "$7 + 6 = $", choix: ["$13$", "$12$", "$14$", "$1$"], bonne: 0, explication: "$7 + 3 = 10$ et encore $3$ : $13$." },
    { question: "$9 + \\ldots = 15$", choix: ["$6$", "$24$", "$5$", "$7$"], bonne: 0, explication: "$9 + 1 = 10$, et encore $5$ : il faut $6$." },
    { question: "$10 = 4 + \\ldots$", choix: ["$6$", "$14$", "$5$", "$4$"], bonne: 0, explication: "$4 + 6 = 10$ : complément à $10$." },
    { question: "Le double de $8$ est :", choix: ["$16$", "$4$", "$10$", "$88$"], bonne: 0, explication: "$8 + 8 = 16$." },
    { question: "Le double de $40$ est :", choix: ["$80$", "$20$", "$44$", "$42$"], bonne: 0, explication: "$40 + 40 = 80$." },
    { question: "La moitié de $18$ est :", choix: ["$9$", "$36$", "$8$", "$16$"], bonne: 0, explication: "$9 + 9 = 18$." },
    { question: "La moitié de $100$ est :", choix: ["$50$", "$200$", "$10$", "$5$"], bonne: 0, explication: "$50 + 50 = 100$." },
    { question: "La moitié de $64$ est :", choix: ["$32$", "$34$", "$128$", "$30$"], bonne: 0, explication: "Moitié de $60$ : $30$ ; moitié de $4$ : $2$ ; donc $32$." },
    { question: "$45 + 10 = $", choix: ["$55$", "$46$", "$145$", "$54$"], bonne: 0, explication: "On ajoute une dizaine : $55$." },
    { question: "$72 - 30 = $", choix: ["$42$", "$69$", "$102$", "$40$"], bonne: 0, explication: "$7 - 3 = 4$ dizaines : $42$." },
    { question: "$39 + 1 = $", choix: ["$40$", "$310$", "$30$", "$38$"], bonne: 0, explication: "Le nombre juste après $39$ est $40$." },
    { question: "$61 - 2 = $", choix: ["$59$", "$63$", "$60$", "$41$"], bonne: 0, explication: "$61$, $60$, $59$." },
    { question: "Pour aller de $74$ à $80$, il faut ajouter :", choix: ["$6$", "$4$", "$80$", "$16$"], bonne: 0, explication: "$4 + 6 = 10$ : il faut $6$." },
    { question: "$58 + 5 = $", choix: ["$63$", "$53$", "$513$", "$64$"], bonne: 0, explication: "$58 + 2 = 60$, puis $60 + 3 = 63$." },
    { question: "$26 + 9 = $", choix: ["$35$", "$36$", "$34$", "$215$"], bonne: 0, explication: "$26 + 10 = 36$, puis $36 - 1 = 35$." },
    { question: "$70 - 4 = $", choix: ["$66$", "$64$", "$74$", "$34$"], bonne: 0, explication: "On casse une dizaine : $10 - 4 = 6$, donc $66$." },
    { question: "$34 + 25 = $", choix: ["$59$", "$58$", "$69$", "$509$"], bonne: 0, explication: "$30 + 20 = 50$ et $4 + 5 = 9$ : $59$." },
    { question: "$47 + 28 = $", choix: ["$75$", "$65$", "$615$", "$74$"], bonne: 0, explication: "$40 + 20 = 60$, $7 + 8 = 15$, et $60 + 15 = 75$." },
    { question: "Ajouter $9$, c'est :", choix: ["ajouter $10$ puis enlever $1$", "ajouter $10$ puis ajouter $1$", "enlever $10$ puis ajouter $1$", "ajouter $1$ neuf fois puis $10$"], bonne: 0, explication: "$9 = 10 - 1$." },
    { question: "Quelle addition fait $10$ ?", choix: ["$3 + 7$", "$3 + 6$", "$4 + 5$", "$2 + 9$"], bonne: 0, explication: "$3 + 7 = 10$." }
  ],

  methode: [
    {
      titre: "Ajouter un petit nombre en passant par la dizaine",
      etapes: [
        "Cherche combien il manque pour arriver à la dizaine suivante.",
        "Enlève ce nombre de celui que tu ajoutes.",
        "Ajoute ce qui reste à la dizaine."
      ],
      figure: "cp5-cours-passer10",
      exemple: "$47 + 8$ : $47 + 3 = 50$, puis $50 + 5 = 55$."
    },
    {
      titre: "Trouver la moitié d'un nombre",
      etapes: [
        "Décompose le nombre en dizaines et unités.",
        "Prends la moitié de chaque morceau.",
        "Ajoute les deux moitiés."
      ],
      exemple: "$86 = 80 + 6$ ; $40 + 3 = 43$."
    }
  ],
  erreurs: [
    "Confondre double et moitié.",
    "Ajouter $10$ aux unités : $34 + 10 = 44$, pas $35$.",
    "Ajouter $9$ en ajoutant $10$ et en oubliant d'enlever $1$.",
    "Pour $50 - 6$, trouver $46$ : en cassant une dizaine, il reste $10 - 6 = 4$ unités, donc $44$.",
    "Oublier la dizaine des unités dans $47 + 28$ : $7 + 8 = 15$, c'est $1$ dizaine et $5$ unités."
  ]
};
