/*
  CHAPITRE : 4e — Calculer avec des fractions
  --------------------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : additionner, soustraire,
  multiplier et diviser des nombres en écriture fractionnaire (positifs ou négatifs) ; inverse d'un nombre ;
  enchainer les opérations ; résoudre des problèmes. Une réponse attendue en fraction est annoncée dans la
  consigne (CONSIGNE_FR). Vidéos et cours PDF d'Yvan Monka.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["quatrieme-fractions"] = {
  niveau: "4e",
  numero: 4,
  titre: "Calculer avec des fractions",
  accroche: "Les quatre opérations sur les fractions, même négatives : additionner au même dénominateur, multiplier en haut et en bas, diviser en multipliant par l'inverse.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : fractions, partie 1 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Fractions1.pdf" },
    { titre: "Cours d'Yvan Monka : fractions, partie 2 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Fractions2.pdf" },
    { titre: "Cours d'Yvan Monka : fractions, partie 3 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Fractions3.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : les fractions (Yvan Monka)", url: "https://youtu.be/a0Qb812W75c", type: "video" },
    { titre: "Calculs mêlés de fractions (Yvan Monka)", url: "https://youtu.be/8vFfzMYi1mM", type: "video" },
    { titre: "Résoudre un problème à l'aide de fractions (Yvan Monka)", url: "https://youtu.be/wkimwCoejZ4", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Additionner et soustraire",
      video: { titre: "Vidéo d'Yvan Monka : additions et soustractions de fractions avec relatifs", youtube: "https://youtu.be/XcsbENjMFZo" },
      texte:
        "On réduit au **même dénominateur**, puis on additionne ou on soustrait les numérateurs avec les règles des relatifs :\n\n" +
        "$\\dfrac{3}{4} - \\dfrac{5}{6} = \\dfrac{9}{12} - \\dfrac{10}{12} = -\\dfrac{1}{12}$.\n\n" +
        "Signe d'une fraction : $\\dfrac{-3}{4} = \\dfrac{3}{-4} = -\\dfrac{3}{4}$ et $\\dfrac{-3}{-4} = \\dfrac{3}{4}$.",
      exemple: {
        enonce: "Calcule $-\\dfrac{2}{3} + \\dfrac{1}{5}$.",
        solution: "$-\\dfrac{10}{15} + \\dfrac{3}{15} = -\\dfrac{7}{15}$."
      }
    },
    {
      titre: "Multiplier",
      video: { titre: "Vidéo d'Yvan Monka : effectuer des multiplications de fractions", youtube: "https://youtu.be/j27kXXrw3Xk" },
      texte:
        "Pour multiplier deux fractions, on multiplie les numérateurs entre eux et les dénominateurs entre eux :\n\n" +
        "$\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{a \\times c}{b \\times d}$. Pas besoin de dénominateur commun.\n\n" +
        "On simplifie avant de calculer quand c'est possible : $\\dfrac{4}{9} \\times \\dfrac{3}{8} = \\dfrac{4 \\times 3}{3 \\times 3 \\times 4 \\times 2} = \\dfrac{1}{6}$.\n\n" +
        "Prendre une fraction d'une quantité, c'est multiplier : $\\dfrac{2}{3}$ de $\\dfrac{3}{4}$, c'est $\\dfrac{2}{3} \\times \\dfrac{3}{4} = \\dfrac{1}{2}$.",
      exemple: {
        enonce: "Calcule $-\\dfrac{5}{6} \\times \\dfrac{9}{10}$.",
        solution: "$-\\dfrac{5 \\times 9}{6 \\times 10} = -\\dfrac{45}{60} = -\\dfrac{3}{4}$."
      }
    },
    {
      titre: "Inverse et division",
      video: { titre: "Vidéo d'Yvan Monka : effectuer des divisions de fractions", youtube: "https://youtu.be/7_hZWOoMBSA" },
      texte:
        "L'**inverse** d'un nombre $x$ non nul est le nombre qui, multiplié par $x$, donne $1$. L'inverse de $\\dfrac{a}{b}$ est $\\dfrac{b}{a}$ ; l'inverse de $5$ est $\\dfrac{1}{5}$.\n\n" +
        "**Diviser** par un nombre non nul, c'est **multiplier par son inverse** :\n\n" +
        "$\\dfrac{3}{4} \\div \\dfrac{5}{2} = \\dfrac{3}{4} \\times \\dfrac{2}{5} = \\dfrac{6}{20} = \\dfrac{3}{10}$.",
      exemple: {
        enonce: "Combien de bouteilles de $\\dfrac{3}{4}$ L remplit-on avec $6$ L ?",
        solution: "$6 \\div \\dfrac{3}{4} = 6 \\times \\dfrac{4}{3} = 8$ bouteilles."
      }
    },
    {
      titre: "Calculs avec priorités",
      video: { titre: "Vidéo d'Yvan Monka : calculs mêlés de fractions", youtube: "https://youtu.be/1NnAEFQ0dgE" },
      texte:
        "Les priorités opératoires restent valables : parenthèses, puis multiplications et divisions, puis additions et soustractions.\n\n" +
        "$\\dfrac{1}{2} + \\dfrac{3}{4} \\times \\dfrac{2}{3} = \\dfrac{1}{2} + \\dfrac{1}{2} = 1$.",
      exemple: {
        enonce: "Calcule $\\left(\\dfrac{5}{6} - \\dfrac{1}{3}\\right) \\div 4$.",
        solution: "$\\dfrac{5}{6} - \\dfrac{2}{6} = \\dfrac{3}{6} = \\dfrac{1}{2}$, puis $\\dfrac{1}{2} \\times \\dfrac{1}{4} = \\dfrac{1}{8}$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "fq4-addsous", titre: "Additionner et soustraire", etape: "Opérations", nb: 6 },
    { type: "fq4-produit", titre: "Multiplier", etape: "Opérations", nb: 6 },
    { type: "fq4-quotient", titre: "Inverse et division", etape: "Opérations", nb: 6 },
    { type: "fq4-priorites", titre: "Calculs avec priorités", etape: "Enchaîner", nb: 5 },
    { type: "fq4-problemes", titre: "Problèmes", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$\\dfrac{-6}{-7}$ est égal à :", choix: ["$\\dfrac{6}{7}$", "$-\\dfrac{6}{7}$", "$\\dfrac{7}{6}$", "$-1$"], bonne: 0, explication: "Même signe : positif." },
    { question: "$\\dfrac{1}{3} - \\dfrac{1}{2}$ est égal à :", choix: ["$-\\dfrac{1}{6}$", "$\\dfrac{1}{6}$", "$0$", "$-1$"], bonne: 0, explication: "$\\dfrac{2}{6} - \\dfrac{3}{6}$." },
    { question: "$\\dfrac{2}{3} \\times \\dfrac{5}{7}$ est égal à :", choix: ["$\\dfrac{10}{21}$", "$\\dfrac{7}{10}$", "$\\dfrac{14}{15}$", "$\\dfrac{7}{21}$"], bonne: 0, explication: "On multiplie en haut et en bas." },
    { question: "$3 \\times \\dfrac{2}{5}$ est égal à :", choix: ["$\\dfrac{6}{5}$", "$\\dfrac{6}{15}$", "$\\dfrac{5}{6}$", "$\\dfrac{2}{15}$"], bonne: 0, explication: "$3 = \\dfrac{3}{1}$." },
    { question: "$\\dfrac{4}{9} \\times \\dfrac{9}{4}$ est égal à :", choix: ["$1$", "$\\dfrac{16}{81}$", "$0$", "$\\dfrac{81}{16}$"], bonne: 0, explication: "Ce sont deux nombres inverses." },
    { question: "L'inverse de $\\dfrac{3}{8}$ est :", choix: ["$\\dfrac{8}{3}$", "$-\\dfrac{3}{8}$", "$\\dfrac{5}{8}$", "$\\dfrac{3}{8}$"], bonne: 0, explication: "On échange numérateur et dénominateur." },
    { question: "L'inverse de $-4$ est :", choix: ["$-\\dfrac{1}{4}$", "$4$", "$\\dfrac{1}{4}$", "$-4$"], bonne: 0, explication: "$(-4) \\times \\left(-\\dfrac{1}{4}\\right) = 1$." },
    { question: "$\\dfrac{2}{5} \\div \\dfrac{4}{3}$ est égal à :", choix: ["$\\dfrac{3}{10}$", "$\\dfrac{8}{15}$", "$\\dfrac{10}{3}$", "$\\dfrac{4}{15}$"], bonne: 0, explication: "$\\dfrac{2}{5} \\times \\dfrac{3}{4} = \\dfrac{6}{20} = \\dfrac{3}{10}$." },
    { question: "Diviser par $\\dfrac{1}{2}$, c'est :", choix: ["multiplier par $2$", "diviser par $2$", "multiplier par $\\dfrac{1}{2}$", "ajouter $2$"], bonne: 0, explication: "L'inverse de $\\dfrac{1}{2}$ est $2$." },
    { question: "$\\dfrac{1}{4} + \\dfrac{1}{2} \\times \\dfrac{1}{2}$ est égal à :", choix: ["$\\dfrac{1}{2}$", "$\\dfrac{3}{8}$", "$\\dfrac{9}{16}$", "$1$"], bonne: 0, explication: "Multiplication d'abord : $\\dfrac{1}{4} + \\dfrac{1}{4}$." },
    { question: "$-\\dfrac{3}{5} \\times \\left(-\\dfrac{10}{9}\\right)$ est égal à :", choix: ["$\\dfrac{2}{3}$", "$-\\dfrac{2}{3}$", "$\\dfrac{5}{3}$", "$-\\dfrac{3}{2}$"], bonne: 0, explication: "Positif, et $\\dfrac{30}{45} = \\dfrac{2}{3}$." },
    { question: "Les $\\dfrac{3}{4}$ des $\\dfrac{2}{5}$ d'une somme représentent :", choix: ["$\\dfrac{3}{10}$ de la somme", "$\\dfrac{5}{9}$ de la somme", "$\\dfrac{23}{20}$ de la somme", "$\\dfrac{15}{8}$ de la somme"], bonne: 0, explication: "$\\dfrac{3}{4} \\times \\dfrac{2}{5} = \\dfrac{6}{20}$." },
    { question: "Avec $5$ L, on remplit combien de verres de $\\dfrac{1}{4}$ L ?", choix: ["$20$", "$\\dfrac{5}{4}$", "$9$", "$1{,}25$"], bonne: 0, explication: "$5 \\div \\dfrac{1}{4} = 20$." },
    { question: "$2 - \\dfrac{7}{3}$ est égal à :", choix: ["$-\\dfrac{1}{3}$", "$\\dfrac{1}{3}$", "$-\\dfrac{5}{3}$", "$\\dfrac{5}{3}$"], bonne: 0, explication: "$\\dfrac{6}{3} - \\dfrac{7}{3}$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Additionner ou soustraire",
      etapes: [
        "Réduis au même dénominateur.",
        "Calcule avec les numérateurs (règles des relatifs).",
        "Simplifie le résultat."
      ],
      exemple: "$\\dfrac{1}{4} - \\dfrac{2}{3} = \\dfrac{3}{12} - \\dfrac{8}{12} = -\\dfrac{5}{12}$."
    },
    {
      titre: "Multiplier ou diviser",
      etapes: [
        "Multiplier : numérateurs entre eux, dénominateurs entre eux.",
        "Diviser : multiplier par l'inverse de la deuxième fraction.",
        "Détermine le signe, puis simplifie (si possible avant de calculer)."
      ],
      exemple: "$\\dfrac{5}{6} \\div \\dfrac{10}{3} = \\dfrac{5}{6} \\times \\dfrac{3}{10} = \\dfrac{1}{4}$."
    },
    {
      titre: "Calcul avec priorités",
      etapes: [
        "Repère l'ordre des calculs.",
        "Effectue d'abord les parenthèses, puis multiplications et divisions.",
        "Termine par les additions et soustractions."
      ],
      exemple: "$1 - \\dfrac{1}{3} \\times \\dfrac{3}{2} = 1 - \\dfrac{1}{2} = \\dfrac{1}{2}$."
    }
  ],
  erreurs: [
    "Réduire au même dénominateur pour multiplier (inutile) ou ne pas le faire pour additionner (indispensable).",
    "Multiplier « en croix » au lieu de numérateur avec numérateur.",
    "Diviser sans retourner la deuxième fraction.",
    "Confondre l'inverse ($\\dfrac{b}{a}$) et l'opposé ($-\\dfrac{a}{b}$).",
    "Oublier les priorités opératoires."
  ]
};
