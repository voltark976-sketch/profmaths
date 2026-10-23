/*
  CHAPITRE : 5e — Équations
  --------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026, partie
  « Calcul littéral et algébrique » : tester si une égalité entre expressions comportant une variable est vraie ;
  donner à la lettre le statut d'inconnue ; modéliser des problèmes relevant des opérations à trous par des
  équations du type ax = c ou x + b = c ; les résoudre par des méthodes arithmétiques s'appuyant sur les
  opérations inverses. (Mise en perspective : Al Khwarizmi, « al-jabr ».)
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-equations"] = {
  niveau: "5e",
  numero: 14,
  titre: "Équations",
  accroche: "Une lettre pour le nombre qu'on cherche : tester une égalité, traduire un problème par une équation et la résoudre avec l'opération contraire.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : équations (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Calcul_lettres2.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : équations (Yvan Monka)", url: "https://youtu.be/KR9kcH7o2Ps", type: "video" },
    { titre: "Tester une égalité pour résoudre un problème (Yvan Monka)", url: "https://youtu.be/pAJ6CBoCMGE", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Tester une égalité",
      video: { titre: "Vidéo d'Yvan Monka : tester une égalité", youtube: "https://youtu.be/xZCXVgGT_Bk" },
      texte:
        "Une **équation** est une égalité qui contient un nombre inconnu, noté par une lettre : $3x - 4 = 5 + 2x$.\n\n" +
        "Un nombre est **solution** de l'équation si, en remplaçant la lettre par ce nombre, les deux membres sont égaux.\n\n" +
        "Pour $x = 9$ : à gauche $3 \\times 9 - 4 = 23$, à droite $5 + 2 \\times 9 = 23$. L'égalité est vraie : $9$ est solution.",
      exemple: {
        enonce: "Le nombre $4$ est-il solution de $5x - 3 = 2x + 8$ ?",
        solution: "À gauche : $5 \\times 4 - 3 = 17$. À droite : $2 \\times 4 + 8 = 16$. $17 \\neq 16$ : $4$ n'est pas solution."
      }
    },
    {
      titre: "Résoudre x + b = c",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation (avec + et −)", youtube: "https://youtu.be/i06vdTJ5wvg" },
      texte:
        "Pour trouver $x$, on fait l'**opération contraire** :\n\n" +
        "- $x + 7 = 19$ : on cherche le nombre auquel on ajoute $7$ pour obtenir $19$, donc $x = 19 - 7 = 12$ ;\n" +
        "- $x - 4{,}5 = 10$ : $x = 10 + 4{,}5 = 14{,}5$.\n\n" +
        "On vérifie toujours : $12 + 7 = 19$.",
      exemple: {
        enonce: "Résous $x + 23 = 51$ et $y - 8 = 30$.",
        solution: "$x = 51 - 23 = 28$.\n\n$y = 30 + 8 = 38$."
      }
    },
    {
      titre: "Résoudre ax = c",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation (avec × et ÷)", youtube: "https://youtu.be/MVMsIkgwZ4g" },
      texte:
        "$5x = 35$ signifie $5 \\times x = 35$ : on cherche le nombre qui, multiplié par $5$, donne $35$. On divise : $x = 35 \\div 5 = 7$.\n\n" +
        "$\\dfrac{x}{4} = 6$ : on cherche le nombre qui, divisé par $4$, donne $6$. On multiplie : $x = 6 \\times 4 = 24$.",
      exemple: {
        enonce: "Résous $8x = 52$.",
        solution: "$x = 52 \\div 8 = 6{,}5$. Vérification : $8 \\times 6{,}5 = 52$."
      }
    },
    {
      titre: "Résoudre un problème avec une équation",
      texte:
        "1. On choisit l'inconnue : « soit $x$ le prix d'un cahier ».\n" +
        "2. On traduit l'énoncé par une équation.\n" +
        "3. On résout l'équation.\n" +
        "4. On vérifie et on répond par une phrase.\n\n" +
        "Le mathématicien Al Khwarizmi (IXᵉ siècle) appelait l'inconnue « la chose » ; le mot « algèbre » vient du titre de son livre (« al-jabr »).",
      exemple: {
        enonce: "Moussa achète $6$ mangues et paie $9$ €. Quel est le prix d'une mangue ?",
        solution: "Soit $x$ le prix d'une mangue : $6x = 9$, donc $x = 9 \\div 6 = 1{,}5$. Une mangue coûte $1{,}50$ €."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "eq5-tester", titre: "Trouver la solution parmi plusieurs nombres", etape: "Tester une égalité", nb: 5 },
    { type: "eq5-plus", titre: "Résoudre x + b = c", etape: "Résoudre", nb: 6 },
    { type: "eq5-fois", titre: "Résoudre ax = c", etape: "Résoudre", nb: 6 },
    { type: "eq5-modeliser", titre: "Mettre un problème en équation", etape: "Problèmes", nb: 5 },
    { type: "eq5-problemes", titre: "Résoudre des problèmes", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$3$ est solution de :", choix: ["$2x + 1 = 7$", "$2x + 1 = 6$", "$x + 3 = 0$", "$3x = 1$"], bonne: 0, explication: "$2 \\times 3 + 1 = 7$." },
    { question: "Pour $x = 2$, l'égalité $4x - 1 = x + 5$ est :", choix: ["vraie", "fausse", "impossible à tester", "vraie pour tout $x$"], bonne: 0, explication: "$7 = 7$." },
    { question: "La solution de $x + 9 = 20$ est :", choix: ["$11$", "$29$", "$180$", "$2{,}2$"], bonne: 0, explication: "$20 - 9 = 11$." },
    { question: "La solution de $x - 6 = 15$ est :", choix: ["$21$", "$9$", "$90$", "$2{,}5$"], bonne: 0, explication: "$15 + 6 = 21$." },
    { question: "La solution de $7x = 56$ est :", choix: ["$8$", "$49$", "$63$", "$392$"], bonne: 0, explication: "$56 \\div 7 = 8$." },
    { question: "La solution de $\\dfrac{x}{3} = 5$ est :", choix: ["$15$", "$\\dfrac{5}{3}$", "$8$", "$2$"], bonne: 0, explication: "$5 \\times 3 = 15$." },
    { question: "La solution de $4x = 10$ est :", choix: ["$2{,}5$", "$6$", "$40$", "$14$"], bonne: 0, explication: "$10 \\div 4 = 2{,}5$." },
    { question: "« Le double d'un nombre vaut $34$ » se traduit par :", choix: ["$2x = 34$", "$x + 2 = 34$", "$x^2 = 34$", "$\\dfrac{x}{2} = 34$"], bonne: 0, explication: "Le double de $x$ est $2x$." },
    { question: "« Dans $4$ ans, j'aurai $17$ ans » se traduit par :", choix: ["$x + 4 = 17$", "$4x = 17$", "$x - 4 = 17$", "$x = 4 + 17$"], bonne: 0, explication: "Mon âge actuel plus $4$." },
    { question: "Pour résoudre $x + 12 = 30$, on :", choix: ["soustrait $12$ à $30$", "ajoute $12$ à $30$", "divise $30$ par $12$", "multiplie $30$ par $12$"], bonne: 0, explication: "On fait l'opération contraire de « $+ 12$ »." },
    { question: "$5x$ signifie :", choix: ["$5 \\times x$", "$5 + x$", "$50 + x$", "$x \\div 5$"], bonne: 0, explication: "Le signe $\\times$ est sous-entendu." },
    { question: "$9$ boîtes identiques pèsent $4{,}5$ kg. Une boîte pèse :", choix: ["$0{,}5$ kg", "$2$ kg", "$40{,}5$ kg", "$5$ kg"], bonne: 0, explication: "$4{,}5 \\div 9 = 0{,}5$." },
    { question: "Le mot « algèbre » vient du livre de :", choix: ["Al Khwarizmi", "Pythagore", "Thalès", "Euclide"], bonne: 0, explication: "« Al-jabr » est dans le titre de son livre." },
    { question: "Après avoir dépensé $8$ €, il me reste $27$ €. J'avais :", choix: ["$35$ €", "$19$ €", "$216$ €", "$27$ €"], bonne: 0, explication: "$x - 8 = 27$ donc $x = 35$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Tester si un nombre est solution",
      etapes: [
        "Remplace la lettre par le nombre dans chaque membre.",
        "Calcule le membre de gauche, puis celui de droite.",
        "S'ils sont égaux, le nombre est solution."
      ],
      exemple: "$x = 5$ dans $2x + 3 = 13$ : $13 = 13$, solution."
    },
    {
      titre: "Résoudre une équation simple",
      etapes: [
        "$x + b = c$ : $x = c - b$. $x - b = c$ : $x = c + b$.",
        "$ax = c$ : $x = c \\div a$. $\\dfrac{x}{a} = c$ : $x = c \\times a$.",
        "Vérifie en remplaçant."
      ],
      exemple: "$6x = 21$ : $x = 3{,}5$."
    },
    {
      titre: "Résoudre un problème",
      etapes: [
        "Choisis l'inconnue et nomme-la $x$.",
        "Traduis l'énoncé par une équation, puis résous-la.",
        "Vérifie et réponds par une phrase."
      ],
      exemple: "$4$ places coûtent $26$ € : $4x = 26$, une place coûte $6{,}50$ €."
    }
  ],
  erreurs: [
    "Faire la même opération au lieu de l'opération contraire ($x + 5 = 12$ donne $x = 7$, pas $17$).",
    "Soustraire au lieu de diviser pour résoudre $3x = 18$.",
    "Oublier de vérifier la solution.",
    "Tester une égalité en ne calculant qu'un seul membre.",
    "Lire $4x$ comme « $4$ et $x$ » ($40 + x$)."
  ]
};
