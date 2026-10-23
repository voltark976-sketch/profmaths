/*
  CHAPITRE : 4e — Équations
  --------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : mettre un problème en équation ;
  résoudre algébriquement des équations du premier degré (ax + b = cx + d), y compris avec des parenthèses à
  développer ; vérifier une solution. Vidéos et cours PDF d'Yvan Monka.
  Figures : "eq4-balance", "eq4-balance-deux", "eq4-qcm-balance", "eq4-rectangle", "eq4-barres" (assets/exercices-quatrieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["quatrieme-equations"] = {
  niveau: "4e",
  numero: 13,
  titre: "Équations",
  accroche: "Résoudre une équation du premier degré en gardant l'égalité équilibrée, et mettre un problème en équation.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : équations (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Eq4e.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : les équations (Yvan Monka)", url: "https://youtu.be/Z0i031tIdpQ", type: "video" },
    { titre: "Résoudre une équation (3) (Yvan Monka)", url: "https://youtu.be/BOq2Lk9Uyw8", type: "video" },
    { titre: "Résoudre une équation (4) (Yvan Monka)", url: "https://youtu.be/QURskM271bE", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Principe de résolution",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation (1)", youtube: "https://youtu.be/uV_EmbYu9_E" },
      texte:
        "Une égalité reste vraie si l'on **ajoute** ou **soustrait** le même nombre aux deux membres, ou si l'on **multiplie** ou **divise** les deux membres par le même nombre non nul.\n\n" +
        "$3x - 5 = 16$ ; on ajoute $5$ : $3x = 21$ ; on divise par $3$ : $x = 7$.\n\n" +
        "On vérifie : $3 \\times 7 - 5 = 16$.\n\n" +
        "On peut imaginer une **balance en équilibre** : sur la figure, $3x + 4 = 19$. On enlève $4$ sur chaque plateau : $3x = 15$ ; on partage en $3$ : $x = 5$.\n\n" +
        "**Tester** un nombre : il est solution si, en le mettant à la place de $x$, l'égalité est vraie. $2$ est solution de $4x - 1 = 7$ car $4 \\times 2 - 1 = 7$ ; $3$ ne l'est pas car $4 \\times 3 - 1 = 11 \\neq 7$.",
      figure: "eq4-balance",
      exemple: {
        enonce: "Résous $-4x + 9 = 1$.",
        solution: "$-4x = 1 - 9 = -8$, puis $x = \\dfrac{-8}{-4} = 2$."
      }
    },
    {
      titre: "Inconnue dans les deux membres",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation (2)", youtube: "https://youtu.be/mK8Y-v-K0cM" },
      texte:
        "On regroupe les termes en $x$ dans un membre et les nombres dans l'autre :\n\n" +
        "$5x + 3 = 2x + 15$ ; on soustrait $2x$ : $3x + 3 = 15$ ; on soustrait $3$ : $3x = 12$ ; $x = 4$.\n\n" +
        "S'il y a des parenthèses, on commence par développer : $2(x + 3) = 5x - 9$ devient $2x + 6 = 5x - 9$.\n\n" +
        "Sur la balance, enlever $2x$ revient à retirer $2$ boîtes de chaque plateau.",
      figure: "eq4-balance-deux",
      exemple: {
        enonce: "Résous $7x - 2 = 3x + 10$.",
        solution: "$4x - 2 = 10$, $4x = 12$, $x = 3$. Vérification : $19 = 19$."
      }
    },
    {
      titre: "Mettre un problème en équation",
      video: { titre: "Vidéo d'Yvan Monka : mettre un problème en équation", youtube: "https://youtu.be/q3ijSWk1iF8" },
      texte:
        "1. Choisir l'inconnue (« soit $x$ l'âge de… »).\n" +
        "2. Traduire l'énoncé par une équation.\n" +
        "3. Résoudre l'équation.\n" +
        "4. Vérifier et répondre par une phrase.\n\n" +
        "Un schéma aide à traduire l'énoncé : sur la figure, la largeur est $x$ et la longueur $x + 4$.",
      figure: "eq4-rectangle",
      exemple: {
        enonce: "La longueur d'un rectangle dépasse sa largeur de $4$ cm et son périmètre vaut $40$ cm. Trouve ses dimensions.",
        solution: "Soit $x$ la largeur : $2(x + x + 4) = 40$, donc $4x + 8 = 40$, $x = 8$. Le rectangle mesure $8$ cm sur $12$ cm."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "eq4-etapes", titre: "Tester, résoudre $ax + b = c$", etape: "Résoudre", nb: 6 },
    { type: "eq4-deux-membres", titre: "Inconnue dans les deux membres", etape: "Résoudre", nb: 6 },
    { type: "eq4-parentheses", titre: "Équations avec parenthèses", etape: "Résoudre", nb: 5 },
    { type: "eq4-problemes", titre: "Mettre en équation", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Lequel de ces nombres est solution de $3x - 1 = x + 3$ ?", choix: ["$2$", "$1$", "$-2$", "$4$"], bonne: 0, explication: "Pour $x = 2$ : $3 \\times 2 - 1 = 5$ et $2 + 3 = 5$." },
    { question: "La solution de $x + 7 = 3$ est :", choix: ["$-4$", "$10$", "$4$", "$\\dfrac{3}{7}$"], bonne: 0, explication: "$3 - 7$." },
    { question: "La solution de $-5x = 30$ est :", choix: ["$-6$", "$6$", "$25$", "$-150$"], bonne: 0, explication: "$30 \\div (-5)$." },
    { question: "La solution de $2x + 5 = 17$ est :", choix: ["$6$", "$11$", "$8{,}5$", "$22$"], bonne: 0, explication: "$2x = 12$." },
    { question: "La solution de $4x - 3 = x + 9$ est :", choix: ["$4$", "$2$", "$\\dfrac{6}{5}$", "$12$"], bonne: 0, explication: "$3x = 12$." },
    { question: "La solution de $3(x - 2) = 9$ est :", choix: ["$5$", "$3$", "$1$", "$\\dfrac{11}{3}$"], bonne: 0, explication: "$3x - 6 = 9$, $3x = 15$." },
    { question: "Pour résoudre $6x = 24$, on :", choix: ["divise les deux membres par $6$", "soustrait $6$", "multiplie par $6$", "ajoute $6$"], bonne: 0, explication: "Opération contraire de $\\times 6$." },
    { question: "Dans $5x + 2 = 3x - 4$, après avoir soustrait $3x$, on obtient :", choix: ["$2x + 2 = -4$", "$8x + 2 = -4$", "$2x = -2$", "$5x = 3x - 6$"], bonne: 0, explication: "$5x - 3x = 2x$." },
    { question: "« Le triple d'un nombre diminué de $4$ vaut $11$ » s'écrit :", choix: ["$3x - 4 = 11$", "$3(x - 4) = 11$", "$x - 4 = 33$", "$3 + x - 4 = 11$"], bonne: 0, explication: "On prend le triple, puis on retire $4$." },
    { question: "La solution de $\\dfrac{x}{4} = -3$ est :", choix: ["$-12$", "$-\\dfrac{3}{4}$", "$12$", "$1$"], bonne: 0, explication: "$-3 \\times 4$." },
    { question: "La solution de $-x = 8$ est :", choix: ["$-8$", "$8$", "$0$", "$\\dfrac{1}{8}$"], bonne: 0, explication: "On multiplie par $-1$." },
    { question: "Un père a $3$ fois l'âge de son fils ; ensemble ils ont $48$ ans. Le fils a :", choix: ["$12$ ans", "$16$ ans", "$36$ ans", "$24$ ans"], bonne: 0, explication: "$4x = 48$." },
    { question: "Sur la figure, la balance est en équilibre. Quelle équation traduit la situation ?", figure: "eq4-balance", choix: ["$3x + 4 = 19$", "$3 + x + 4 = 19$", "$3x = 19 + 4$", "$7x = 19$"], bonne: 0, explication: "À gauche : $3$ boîtes $x$ et une masse $4$ ; à droite : $19$." },
    { question: "Sur la figure, la balance est en équilibre. Combien vaut $x$ ?", figure: "eq4-balance", choix: ["$5$", "$7{,}7$", "$15$", "$6$"], bonne: 0, explication: "$3x + 4 = 19$, donc $3x = 15$ et $x = 5$." },
    { question: "Sur la figure, la balance porte des boîtes $x$ des deux côtés et elle est en équilibre. Combien vaut $x$ ?", figure: "eq4-qcm-balance", choix: ["$4$", "$6$", "$12$", "$2{,}4$"], bonne: 0, explication: "$4x + 6 = x + 18$ ; on enlève une boîte : $3x + 6 = 18$ ; $3x = 12$ ; $x = 4$." },
    { question: "Sur la figure, la balance est en équilibre. Après avoir retiré $2$ boîtes de chaque plateau, on obtient :", figure: "eq4-balance-deux", choix: ["$3x + 3 = 15$", "$7x + 3 = 15$", "$3x + 3 = 13$", "$5x + 1 = 15$"], bonne: 0, explication: "$5x - 2x = 3x$ ; les masses ne changent pas." },
    { question: "Sur le schéma, $3$ places et $5$ € de frais coûtent $29$ €. Le prix d'une place est :", figure: "eq4-barres", choix: ["$8$ €", "$24$ €", "$\\dfrac{29}{3}$ €", "$11{,}3$ €"], bonne: 0, explication: "$3x + 5 = 29$, donc $3x = 24$ et $x = 8$." },
    { question: "Sur la figure, le périmètre du rectangle vaut $40$ cm. Quelle équation convient ?", figure: "eq4-rectangle", choix: ["$2(x + x + 4) = 40$", "$x + x + 4 = 40$", "$x(x + 4) = 40$", "$4x + 4 = 40$"], bonne: 0, explication: "Deux largeurs et deux longueurs : $2(x + x + 4) = 40$, soit $4x + 8 = 40$." },
    { question: "La solution de $2(x + 5) = 18$ est :", choix: ["$4$", "$6{,}5$", "$9$", "$13$"], bonne: 0, explication: "$2x + 10 = 18$, $2x = 8$, $x = 4$." },
    { question: "La solution de $7 - x = 10$ est :", choix: ["$-3$", "$3$", "$17$", "$-17$"], bonne: 0, explication: "$-x = 3$, donc $x = -3$." },
    { question: "Deux loueurs de kayaks : A demande $10$ € puis $3$ € par heure, B demande $5$ € par heure. Ils coûtent le même prix pour :", choix: ["$5$ heures", "$2$ heures", "$10$ heures", "$25$ heures"], bonne: 0, explication: "$10 + 3x = 5x$, donc $10 = 2x$ et $x = 5$ (prix : $25$ €)." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Résoudre une équation du premier degré",
      etapes: [
        "Développe s'il y a des parenthèses.",
        "Regroupe les termes en $x$ dans un membre, les nombres dans l'autre (même opération des deux côtés).",
        "Divise par le coefficient de $x$, puis vérifie."
      ],
      figure: "eq4-balance-deux",
      exemple: "$2x + 9 = 5x - 3$ : $-3x = -12$, $x = 4$."
    },
    {
      titre: "Tester si un nombre est solution",
      etapes: [
        "Remplace l'inconnue par le nombre dans chaque membre.",
        "Calcule séparément les deux membres.",
        "S'ils sont égaux, le nombre est solution ; sinon, il ne l'est pas."
      ],
      exemple: "$5x - 2 = 3x + 4$ avec $x = 3$ : $13$ et $13$, donc $3$ est solution."
    },
    {
      titre: "Mettre en équation",
      etapes: [
        "Choisis l'inconnue et exprime les autres quantités en fonction d'elle.",
        "Écris l'égalité donnée par l'énoncé.",
        "Résous, vérifie, conclus par une phrase."
      ],
      figure: "eq4-barres",
      exemple: "$x$ et $x + 5$, somme $31$ : $2x + 5 = 31$, $x = 13$."
    }
  ],
  erreurs: [
    "Ne faire l'opération que dans un seul membre.",
    "Changer le signe d'un terme qui reste dans le même membre.",
    "Diviser par le coefficient avec le mauvais signe.",
    "Oublier de développer avant de regrouper.",
    "Ne pas vérifier la solution."
  ]
};
