/*
  CHAPITRE : 4e — Multiplier et diviser des relatifs
  ---------------------------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : utiliser les nombres relatifs
  pour comparer, additionner, soustraire, multiplier, diviser ; règle des signes ; enchainer les opérations en
  respectant les priorités. Vidéos et cours PDF d'Yvan Monka.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["quatrieme-relatifs"] = {
  niveau: "4e",
  numero: 2,
  titre: "Multiplier et diviser des relatifs",
  accroche: "La règle des signes pour multiplier et diviser des nombres relatifs, puis des calculs complets avec les priorités.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : nombres relatifs (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Nomb_rela.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : les nombres relatifs (Yvan Monka)", url: "https://youtu.be/mAK5sYfze0w", type: "video" },
    { titre: "Appliquer la règle des signes (2) (Yvan Monka)", url: "https://youtu.be/l_BleoCE-3Y", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Multiplier deux relatifs",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la règle des signes", youtube: "https://youtu.be/q-vHvhiizqY" },
      texte:
        "Pour multiplier deux nombres relatifs, on multiplie leurs distances à zéro, puis on applique la **règle des signes** :\n\n" +
        "- deux nombres de **même signe** ont un produit **positif** : $(-4) \\times (-5) = 20$ ;\n" +
        "- deux nombres de **signes contraires** ont un produit **négatif** : $(-4) \\times 5 = -20$.\n\n" +
        "Pourquoi $(-1) \\times (-1) = 1$ ? Parce que $(-1) \\times (1 + (-1)) = (-1) \\times 0 = 0$, donc $-1 + (-1) \\times (-1) = 0$.",
      exemple: {
        enonce: "Calcule $(-2{,}5) \\times (-4)$ et $7 \\times (-0{,}3)$.",
        solution: "Même signe : $2{,}5 \\times 4 = 10$, donc $10$.\n\nSignes contraires : $7 \\times 0{,}3 = 2{,}1$, donc $-2{,}1$."
      }
    },
    {
      titre: "Produit de plusieurs facteurs",
      texte:
        "Le signe d'un produit de plusieurs facteurs non nuls dépend du **nombre de facteurs négatifs** :\n\n" +
        "- nombre **pair** de facteurs négatifs : produit **positif** ;\n" +
        "- nombre **impair** : produit **négatif**.\n\n" +
        "$(-2) \\times 3 \\times (-1) \\times (-5)$ : trois facteurs négatifs, le produit est négatif : $-30$. Si un facteur est nul, le produit est nul.",
      exemple: {
        enonce: "Quel est le signe de $(-1) \\times (-2) \\times (-3) \\times (-4) \\times 5$ ?",
        solution: "Quatre facteurs négatifs (nombre pair) : le produit est positif ($120$)."
      }
    },
    {
      titre: "Diviser des relatifs",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la règle des signes (2)", youtube: "https://youtu.be/l_BleoCE-3Y" },
      texte:
        "Pour diviser, la règle des signes est la même que pour la multiplication :\n\n" +
        "$(-24) \\div (-6) = 4$ ; $(-24) \\div 6 = -4$ ; $\\dfrac{18}{-3} = -6$.\n\n" +
        "Pour les fractions : $\\dfrac{-a}{b} = \\dfrac{a}{-b} = -\\dfrac{a}{b}$ et $\\dfrac{-a}{-b} = \\dfrac{a}{b}$.",
      exemple: {
        enonce: "Calcule $(-4{,}2) \\div 0{,}7$ et $\\dfrac{-35}{-5}$.",
        solution: "$4{,}2 \\div 0{,}7 = 6$, signes contraires : $-6$.\n\n$35 \\div 5 = 7$, même signe : $7$."
      }
    },
    {
      titre: "Enchaîner les calculs",
      video: { titre: "Vidéo d'Yvan Monka : effectuer des calculs avec les nombres relatifs", youtube: "https://youtu.be/p_-4EYjsOiA" },
      texte:
        "Les priorités restent les mêmes : parenthèses, puissances, multiplications et divisions, puis additions et soustractions.\n\n" +
        "$A = -3 + 4 \\times (-2) = -3 + (-8) = -11$.\n\n" +
        "Attention aux carrés : $(-3)^2 = (-3) \\times (-3) = 9$, mais $-3^2 = -9$ (le carré ne porte que sur $3$).",
      exemple: {
        enonce: "Calcule $B = (5 - 8) \\times (-4) + (-6) \\div 2$.",
        solution: "$B = (-3) \\times (-4) + (-3) = 12 - 3 = 9$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "rx4-produit", titre: "Multiplier deux relatifs", etape: "Règle des signes", nb: 6 },
    { type: "rx4-quotient", titre: "Diviser deux relatifs", etape: "Règle des signes", nb: 6 },
    { type: "rx4-signe", titre: "Signe d'un produit", etape: "Règle des signes", nb: 5 },
    { type: "rx4-priorites", titre: "Calculs avec priorités", etape: "Enchaîner les calculs", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$(-6) \\times (-7)$ est égal à :", choix: ["$42$", "$-42$", "$-13$", "$13$"], bonne: 0, explication: "Même signe : positif." },
    { question: "$(-8) \\times 5$ est égal à :", choix: ["$-40$", "$40$", "$-3$", "$-13$"], bonne: 0, explication: "Signes contraires : négatif." },
    { question: "$(-0{,}5) \\times (-0{,}4)$ est égal à :", choix: ["$0{,}2$", "$-0{,}2$", "$2$", "$-0{,}9$"], bonne: 0, explication: "$0{,}5 \\times 0{,}4 = 0{,}2$, positif." },
    { question: "$(-36) \\div 9$ est égal à :", choix: ["$-4$", "$4$", "$-27$", "$-45$"], bonne: 0, explication: "Signes contraires." },
    { question: "$(-56) \\div (-8)$ est égal à :", choix: ["$7$", "$-7$", "$-64$", "$48$"], bonne: 0, explication: "Même signe." },
    { question: "$\\dfrac{-12}{-3}$ est égal à :", choix: ["$4$", "$-4$", "$\\dfrac{-1}{4}$", "$-9$"], bonne: 0, explication: "Même signe : positif." },
    { question: "Le produit $(-1) \\times (-2) \\times (-3)$ est :", choix: ["négatif", "positif", "nul", "impossible à savoir"], bonne: 0, explication: "Trois facteurs négatifs." },
    { question: "Le produit de $6$ facteurs négatifs est :", choix: ["positif", "négatif", "nul", "égal à $6$"], bonne: 0, explication: "Nombre pair de facteurs négatifs." },
    { question: "$(-5)^2$ est égal à :", choix: ["$25$", "$-25$", "$-10$", "$10$"], bonne: 0, explication: "$(-5) \\times (-5)$." },
    { question: "$-5^2$ est égal à :", choix: ["$-25$", "$25$", "$-10$", "$10$"], bonne: 0, explication: "Le carré ne porte que sur $5$." },
    { question: "$-2 + 3 \\times (-4)$ est égal à :", choix: ["$-14$", "$-4$", "$10$", "$-20$"], bonne: 0, explication: "$-2 + (-12) = -14$." },
    { question: "$(-2 + 3) \\times (-4)$ est égal à :", choix: ["$-4$", "$-14$", "$4$", "$20$"], bonne: 0, explication: "$1 \\times (-4)$." },
    { question: "$(-3) \\times 0 \\times (-7)$ est égal à :", choix: ["$0$", "$21$", "$-21$", "$-10$"], bonne: 0, explication: "Un facteur nul." },
    { question: "$\\dfrac{15}{-5}$ est égal à :", choix: ["$-3$", "$3$", "$-\\dfrac{1}{3}$", "$10$"], bonne: 0, explication: "Signes contraires." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Multiplier ou diviser deux relatifs",
      etapes: [
        "Multiplie (ou divise) les distances à zéro.",
        "Même signe : résultat positif.",
        "Signes contraires : résultat négatif."
      ],
      exemple: "$(-9) \\div 3 = -3$ ; $(-9) \\times (-3) = 27$."
    },
    {
      titre: "Trouver le signe d'un produit",
      etapes: [
        "Vérifie qu'aucun facteur n'est nul.",
        "Compte les facteurs négatifs.",
        "Pair : positif ; impair : négatif."
      ],
      exemple: "$(-2)^3$ : trois facteurs $-2$, négatif ($-8$)."
    },
    {
      titre: "Calculer une expression",
      etapes: [
        "Parenthèses et puissances d'abord.",
        "Multiplications et divisions avec la règle des signes.",
        "Additions et soustractions en dernier."
      ],
      exemple: "$4 - (-3) \\times 2 = 4 - (-6) = 10$."
    }
  ],
  erreurs: [
    "Appliquer la règle des signes à l'addition : $(-3) + (-4) = -7$, pas $7$.",
    "Confondre $(-3)^2 = 9$ et $-3^2 = -9$.",
    "Oublier un facteur négatif en comptant les signes.",
    "Ne pas respecter les priorités dans un calcul avec des relatifs.",
    "Croire qu'un quotient de deux négatifs est négatif."
  ]
};
