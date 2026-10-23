/*
  CHAPITRE : 4e — Équations
  --------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : mettre un problème en équation ;
  résoudre algébriquement des équations du premier degré (ax + b = cx + d), y compris avec des parenthèses à
  développer ; vérifier une solution. Vidéos et cours PDF d'Yvan Monka.
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
        "On vérifie : $3 \\times 7 - 5 = 16$.",
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
        "S'il y a des parenthèses, on commence par développer : $2(x + 3) = 5x - 9$ devient $2x + 6 = 5x - 9$.",
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
        "4. Vérifier et répondre par une phrase.",
      exemple: {
        enonce: "La longueur d'un rectangle dépasse sa largeur de $4$ cm et son périmètre vaut $40$ cm. Trouve ses dimensions.",
        solution: "Soit $x$ la largeur : $2(x + x + 4) = 40$, donc $4x + 8 = 40$, $x = 8$. Le rectangle mesure $8$ cm sur $12$ cm."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "eq4-etapes", titre: "Résoudre ax + b = c", etape: "Résoudre", nb: 6 },
    { type: "eq4-deux-membres", titre: "Inconnue dans les deux membres", etape: "Résoudre", nb: 6 },
    { type: "eq4-parentheses", titre: "Équations avec parenthèses", etape: "Résoudre", nb: 5 },
    { type: "eq4-problemes", titre: "Mettre en équation", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$2$ est-il solution de $3x - 1 = x + 3$ ?", choix: ["Oui", "Non", "On ne peut pas savoir"], bonne: 0, explication: "$5 = 5$." },
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
    { question: "Un père a $3$ fois l'âge de son fils ; ensemble ils ont $48$ ans. Le fils a :", choix: ["$12$ ans", "$16$ ans", "$36$ ans", "$24$ ans"], bonne: 0, explication: "$4x = 48$." }
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
      exemple: "$2x + 9 = 5x - 3$ : $-3x = -12$, $x = 4$."
    },
    {
      titre: "Mettre en équation",
      etapes: [
        "Choisis l'inconnue et exprime les autres quantités en fonction d'elle.",
        "Écris l'égalité donnée par l'énoncé.",
        "Résous, vérifie, conclus par une phrase."
      ],
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
