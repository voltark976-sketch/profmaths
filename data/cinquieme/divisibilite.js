/*
  CHAPITRE : 5e — Divisibilité
  -----------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026, partie
  « Opérations » : diviser par un nombre décimal ; utiliser les notions de multiples et diviseurs ; connaitre les
  critères de divisibilité par 3 et par 9. Automatismes : critères par 2, 5 et 10, quotient et reste d'une division
  euclidienne, factoriser un entier en produit de deux nombres différents de 1 (21 = 3 fois 7).
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-divisibilite"] = {
  niveau: "5e",
  numero: 6,
  titre: "Divisibilité",
  accroche: "Division euclidienne, division par un décimal, multiples, diviseurs et critères de divisibilité pour résoudre des problèmes de partage et de rendez-vous.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : divisibilité (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Arith5e.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : divisibilité (Yvan Monka)", url: "https://youtu.be/kQJ1dYqA6ZU", type: "video" },
    { titre: "Exercice : appliquer les critères de divisibilité (Yvan Monka)", url: "https://youtu.be/BJDE6uOrmYQ", type: "video" },
    { titre: "Résoudre un problème avec des diviseurs (Yvan Monka)", url: "https://youtu.be/BTx0XwEaPB4", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "La division euclidienne",
      video: { titre: "Vidéo d'Yvan Monka : résoudre un problème avec la division euclidienne", youtube: "https://youtu.be/9Fu2CAnMeLY" },
      texte:
        "Effectuer la **division euclidienne** de $a$ par $b$, c'est trouver deux entiers, le **quotient** $q$ et le **reste** $r$, tels que :\n\n" +
        "$a = b \\times q + r$ avec $r < b$.\n\n" +
        "$17 = 3 \\times 5 + 2$ : dans la division de $17$ par $3$, le quotient est $5$ et le reste $2$.\n\n" +
        "Dans un problème, on se demande si la réponse est le quotient, le reste, ou le quotient plus un (s'il faut un bus de plus pour les élèves qui restent).",
      figure: "dv5-cours-euclide",
      exemple: {
        enonce: "$158$ élèves partent en sortie dans des bus de $45$ places. Combien de bus faut-il ?",
        solution: "$158 = 45 \\times 3 + 23$. Trois bus pleins ne suffisent pas : il reste $23$ élèves. Il faut $4$ bus."
      }
    },
    {
      titre: "Diviser par un nombre décimal",
      video: { titre: "Vidéo d'Yvan Monka : diviser par un nombre décimal", youtube: "https://youtu.be/HSaAIP-zY-8" },
      texte:
        "Un quotient ne change pas si l'on multiplie le dividende et le diviseur par un même nombre.\n\n" +
        "Pour diviser par un nombre décimal, on multiplie donc les deux nombres par $10$, $100$… pour que le **diviseur devienne entier** :\n\n" +
        "$7{,}2 \\div 0{,}3 = 72 \\div 3 = 24$ et $1{,}5 \\div 0{,}25 = 150 \\div 25 = 6$.",
      figure: "dv5-cours-decimal",
      exemple: {
        enonce: "Calcule $13{,}5 \\div 0{,}9$.",
        solution: "On multiplie les deux nombres par $10$ : $13{,}5 \\div 0{,}9 = 135 \\div 9 = 15$."
      }
    },
    {
      titre: "Multiples et diviseurs",
      video: { titre: "Vidéo d'Yvan Monka : déterminer tous les diviseurs d'un nombre", youtube: "https://youtu.be/jteZZBzyai8" },
      texte:
        "$a$ et $b$ sont deux entiers. Si $a = b \\times k$ avec $k$ entier, on dit que $a$ est un **multiple** de $b$, et que $b$ est un **diviseur** de $a$ : la division de $a$ par $b$ tombe juste.\n\n" +
        "$36 = 4 \\times 9$ : $36$ est un multiple de $4$ (et de $9$) ; $4$ et $9$ sont des diviseurs de $36$.\n\n" +
        "Pour trouver **tous** les diviseurs d'un nombre, on cherche les produits par paires : $36 = 1 \\times 36 = 2 \\times 18 = 3 \\times 12 = 4 \\times 9 = 6 \\times 6$. Les diviseurs de $36$ sont $1$, $2$, $3$, $4$, $6$, $9$, $12$, $18$ et $36$.\n\n" +
        "Chaque façon de ranger $12$ carreaux en rectangle donne une paire de diviseurs de $12$.",
      figure: "dv5-cours-diviseurs",
      exemple: {
        enonce: "Écris $91$ comme produit de deux entiers différents de $1$.",
        solution: "$91$ n'est divisible ni par $2$, ni par $3$, ni par $5$. On essaie $7$ : $91 = 7 \\times 13$."
      }
    },
    {
      titre: "Critères de divisibilité",
      video: { titre: "Vidéo d'Yvan Monka : appliquer les critères de divisibilité", youtube: "https://youtu.be/BJDE6uOrmYQ" },
      texte:
        "Un nombre entier est divisible :\n\n" +
        "- par $2$ si son chiffre des unités est $0$, $2$, $4$, $6$ ou $8$ ;\n" +
        "- par $5$ si son chiffre des unités est $0$ ou $5$ ;\n" +
        "- par $10$ si son chiffre des unités est $0$ ;\n" +
        "- par $3$ si la **somme de ses chiffres** est divisible par $3$ ;\n" +
        "- par $9$ si la **somme de ses chiffres** est divisible par $9$.\n\n" +
        "Un nombre divisible par $9$ est aussi divisible par $3$, mais pas l'inverse : $12$ est divisible par $3$ et pas par $9$.",
      exemple: {
        enonce: "$4\\,572$ est-il divisible par $3$ ? Par $9$ ?",
        solution: "$4 + 5 + 7 + 2 = 18$. $18$ est divisible par $3$ et par $9$ : $4\\,572$ est divisible par $3$ et par $9$."
      }
    },
    {
      titre: "Problèmes de multiples communs",
      video: { titre: "Vidéo d'Yvan Monka : résoudre un problème avec des diviseurs", youtube: "https://youtu.be/BTx0XwEaPB4" },
      texte:
        "Quand deux phénomènes se répètent régulièrement (des bateaux, des feux, des rendez-vous), ils se produisent en même temps après une durée qui est un **multiple commun** des deux périodes.\n\n" +
        "Pour trouver le premier moment commun, on écrit les multiples de chaque nombre et on cherche le plus petit qui apparaît dans les deux listes.",
      figure: "dv5-cours-multiples",
      exemple: {
        enonce: "Un phare clignote toutes les $6$ secondes, un autre toutes les $8$ secondes. Ils clignotent ensemble. Dans combien de secondes clignoteront-ils de nouveau ensemble ?",
        solution: "Multiples de $6$ : $6$ ; $12$ ; $18$ ; $24$ ; … Multiples de $8$ : $8$ ; $16$ ; $24$ ; … Ils clignoteront ensemble dans $24$ secondes."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "dv5-euclide", titre: "Quotient et reste", etape: "Divisions", nb: 6 },
    { type: "dv5-decimal", titre: "Diviser par un nombre décimal", etape: "Divisions", nb: 6 },
    { type: "dv5-criteres", titre: "Critères de divisibilité", etape: "Multiples et diviseurs", nb: 6 },
    { type: "dv5-diviseurs", titre: "Trouver des diviseurs", etape: "Multiples et diviseurs", nb: 5 },
    { type: "dv5-problemes", titre: "Problèmes", etape: "Multiples et diviseurs", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Dans la division euclidienne de $47$ par $6$, le reste est :", choix: ["$5$", "$7$", "$1$", "$6$"], bonne: 0, explication: "$47 = 6 \\times 7 + 5$." },
    { question: "Quelle égalité traduit une division euclidienne de $50$ par $7$ ?", choix: ["$50 = 7 \\times 7 + 1$", "$50 = 7 \\times 6 + 8$", "$50 = 7 \\times 8 - 6$", "$50 = 5 \\times 7 + 15$"], bonne: 0, explication: "Le reste doit être plus petit que $7$." },
    { question: "$6 \\div 0{,}2$ est égal à :", choix: ["$30$", "$3$", "$1{,}2$", "$0{,}3$"], bonne: 0, explication: "$60 \\div 2 = 30$." },
    { question: "$4{,}8 \\div 0{,}12$ est égal à :", choix: ["$40$", "$4$", "$0{,}4$", "$400$"], bonne: 0, explication: "$480 \\div 12 = 40$." },
    { question: "$54$ est un multiple de :", choix: ["$9$", "$8$", "$5$", "$4$"], bonne: 0, explication: "$54 = 9 \\times 6$." },
    { question: "$7$ est un diviseur de :", choix: ["$63$", "$57$", "$71$", "$27$"], bonne: 0, explication: "$63 = 7 \\times 9$." },
    { question: "Combien de diviseurs a $16$ ?", choix: ["$5$", "$4$", "$3$", "$8$"], bonne: 0, explication: "$1$, $2$, $4$, $8$ et $16$." },
    { question: "$2\\,358$ est divisible par :", choix: ["$9$", "$5$", "$10$", "$4$ et $5$"], bonne: 0, explication: "$2 + 3 + 5 + 8 = 18$, divisible par $9$." },
    { question: "$7\\,215$ est divisible par :", choix: ["$3$ et $5$", "$2$ et $3$", "$9$", "$10$"], bonne: 0, explication: "Somme $15$ : divisible par $3$ ; termine par $5$." },
    { question: "Un nombre divisible par $9$ est toujours divisible par :", choix: ["$3$", "$6$", "$18$", "$27$"], bonne: 0, explication: "$9 = 3 \\times 3$." },
    { question: "Pour que $5\\,\\ldots 2$ soit divisible par $3$, le chiffre manquant peut être :", choix: ["$2$", "$1$", "$3$", "$0$"], bonne: 0, explication: "$5 + 2 + 2 = 9$." },
    { question: "$77 = 7 \\times \\ldots$", choix: ["$11$", "$10$", "$70$", "$7$"], bonne: 0, explication: "$7 \\times 11 = 77$." },
    { question: "Des bateaux partent toutes les $10$ min et d'autres toutes les $15$ min, ensemble à $8$ h. Ils repartent ensemble à :", choix: ["$8$ h $30$", "$8$ h $25$", "$10$ h $30$", "$8$ h $15$"], bonne: 0, explication: "$30$ est le plus petit multiple commun de $10$ et $15$." },
    { question: "$100$ œufs rangés par boîtes de $12$ donnent :", choix: ["$8$ boîtes pleines", "$9$ boîtes pleines", "$12$ boîtes pleines", "$10$ boîtes pleines"], bonne: 0, explication: "$100 = 12 \\times 8 + 4$." },
    { question: "On range $23$ letchis par paquets de $5$, comme sur la figure. On obtient :", figure: "dv5-qcm-paquets", choix: ["$4$ paquets et un reste de $3$", "$5$ paquets et un reste de $2$", "$4$ paquets et un reste de $5$", "$3$ paquets et un reste de $8$"], bonne: 0, explication: "$23 = 5 \\times 4 + 3$, et le reste $3$ est bien plus petit que $5$." },
    { question: "La figure montre les multiples de $4$ (au-dessus) et de $10$ (en dessous). Quel nombre faut-il écrire à la place de « ? » ?", figure: "dv5-qcm-frise", choix: ["$20$", "$40$", "$14$", "$24$"], bonne: 0, explication: "$20 = 4 \\times 5 = 10 \\times 2$ : c'est le plus petit multiple commun à $4$ et $10$ (après $0$)." },
    { question: "Ce rectangle de $18$ carreaux montre que :", figure: "dv5-qcm-rect", choix: ["$3$ et $6$ sont des diviseurs de $18$", "$18$ est un diviseur de $3$", "$3$ et $6$ sont des multiples de $18$", "$18$ n'a que deux diviseurs"], bonne: 0, explication: "$18 = 3 \\times 6$ : $3$ et $6$ divisent $18$, et $18$ est un multiple de $3$ et de $6$." },
    { question: "Dans une division euclidienne par $7$, le reste peut être :", choix: ["$6$", "$7$", "$8$", "$10$"], bonne: 0, explication: "Le reste est toujours plus petit que le diviseur : il vaut $0$, $1$, …, $6$." },
    { question: "Quel nombre est divisible à la fois par $2$ et par $3$ ?", choix: ["$114$", "$115$", "$122$", "$135$"], bonne: 0, explication: "$114$ est pair et $1 + 1 + 4 = 6$ est divisible par $3$. ($135$ est divisible par $3$ mais il est impair.)" },
    { question: "Les diviseurs de $36$ sont :", choix: ["$1$, $2$, $3$, $4$, $6$, $9$, $12$, $18$, $36$", "$2$, $3$, $4$, $6$, $9$, $12$, $18$", "$1$, $2$, $3$, $4$, $6$, $8$, $9$, $12$, $36$", "$36$, $72$, $108$, $144$"], bonne: 0, explication: "$36 = 1 \\times 36 = 2 \\times 18 = 3 \\times 12 = 4 \\times 9 = 6 \\times 6$. ($36$, $72$… sont des multiples.)" },
    { question: "Combien y a-t-il de multiples de $6$ entre $1$ et $50$ ?", choix: ["$8$", "$9$", "$6$", "$50$"], bonne: 0, explication: "$6 \\times 8 = 48 \\leq 50$ et $6 \\times 9 = 54 > 50$ : il y en a $8$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Effectuer une division euclidienne",
      etapes: [
        "Cherche le plus grand multiple du diviseur qui ne dépasse pas le dividende.",
        "Le facteur trouvé est le quotient.",
        "Le reste est la différence ; vérifie qu'il est plus petit que le diviseur."
      ],
      figure: "dv5-methode-euclide",
      exemple: "$85 \\div 9$ : $9 \\times 9 = 81$, donc $85 = 9 \\times 9 + 4$."
    },
    {
      titre: "Diviser par un décimal",
      etapes: [
        "Compte les chiffres après la virgule du diviseur.",
        "Multiplie les deux nombres par $10$, $100$… pour rendre le diviseur entier.",
        "Effectue la division obtenue."
      ],
      figure: "dv5-cours-decimal",
      exemple: "$3{,}6 \\div 0{,}04 = 360 \\div 4 = 90$."
    },
    {
      titre: "Trouver tous les diviseurs",
      etapes: [
        "Teste $1$, $2$, $3$… en écrivant les produits par paires.",
        "Utilise les critères de divisibilité pour aller vite.",
        "Arrête-toi quand les deux facteurs se croisent."
      ],
      figure: "dv5-methode-diviseurs",
      exemple: "$20 = 1 \\times 20 = 2 \\times 10 = 4 \\times 5$ : $1$ ; $2$ ; $4$ ; $5$ ; $10$ ; $20$."
    },
    {
      titre: "Trouver un premier multiple commun",
      etapes: [
        "Écris les premiers multiples du premier nombre.",
        "Écris ceux du second.",
        "Le premier nombre présent dans les deux listes est la réponse."
      ],
      figure: "dv5-methode-multiples",
      exemple: "$4$ et $6$ : $4$, $8$, $12$… et $6$, $12$… → $12$."
    }
  ],
  erreurs: [
    "Donner un reste plus grand que le diviseur.",
    "Oublier un bus (ou une boîte) pour ce qui reste.",
    "Ne multiplier que le diviseur par $10$ quand on divise par un décimal.",
    "Utiliser le chiffre des unités pour tester la divisibilité par $3$ ou $9$.",
    "Oublier $1$ et le nombre lui-même dans la liste des diviseurs."
  ]
};
