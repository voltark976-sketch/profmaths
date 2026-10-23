/*
  CHAPITRE : 3e — Équations
  --------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027) : résoudre
  algébriquement des équations du premier degré ou s'y ramenant, dont les équations produits ; résoudre une
  équation du type x² = a ; mettre un problème en équation. Vidéos et cours PDF d'Yvan Monka.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-equations"] = {
  niveau: "3e",
  numero: 4,
  titre: "Équations",
  accroche: "Équations du premier degré, équations produits, x² = a et mise en équation de problèmes.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : équations (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Equations_3e.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : équations (Yvan Monka)", url: "https://youtu.be/WoTpA2RyuVU", type: "video" },
    { titre: "Résoudre une équation contenant des fractions (Yvan Monka)", url: "https://youtu.be/l4NEpMsA2jc", type: "video" },
    { titre: "Mettre un problème en équation (Yvan Monka)", url: "https://youtu.be/Xn8rUSZPO34", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Équations du premier degré",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation (1)", youtube: "https://youtu.be/quzC5C3a9jM" },
      texte:
        "On garde l'égalité vraie en faisant **la même opération** sur les deux membres. Méthode :\n\n" +
        "- développer s'il y a des parenthèses ;\n" +
        "- regrouper les termes en $x$ d'un côté et les nombres de l'autre ;\n" +
        "- diviser par le coefficient de $x$.\n\n" +
        "Avec des fractions, on peut utiliser les **produits en croix** : $\\dfrac{x + 1}{3} = \\dfrac{x - 2}{2}$ donne $2(x + 1) = 3(x - 2)$, donc $x = 8$.",
      exemple: {
        enonce: "Résous $3(x - 2) = x + 4$.",
        solution: "$3x - 6 = x + 4$, $2x = 10$, $x = 5$."
      }
    },
    {
      titre: "Équation produit",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation-produit", youtube: "https://youtu.be/APj1WPPNUgo" },
      texte:
        "**Un produit est nul si et seulement si l'un au moins de ses facteurs est nul.**\n\n" +
        "$(2x - 3)(x + 5) = 0$ équivaut à $2x - 3 = 0$ ou $x + 5 = 0$ : les solutions sont $\\dfrac{3}{2}$ et $-5$.\n\n" +
        "Pour une équation comme $x^2 - 4x = 0$, on **factorise** d'abord : $x(x - 4) = 0$, donc $x = 0$ ou $x = 4$.",
      exemple: {
        enonce: "Résous $(x - 7)(3x + 1) = 0$.",
        solution: "$x = 7$ ou $x = -\\dfrac{1}{3}$."
      }
    },
    {
      titre: "Équations x² = a",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation du type x² = a", youtube: "https://youtu.be/VNGFmMt1W3Y" },
      texte:
        "- Si $a > 0$, l'équation $x^2 = a$ a **deux** solutions : $\\sqrt{a}$ et $-\\sqrt{a}$.\n" +
        "- Si $a = 0$, elle a **une** solution : $0$.\n" +
        "- Si $a < 0$, elle n'a **aucune** solution, car un carré est toujours positif.\n\n" +
        "$x^2 = 25$ : $x = 5$ ou $x = -5$. $x^2 = 7$ : $x = \\sqrt{7}$ ou $x = -\\sqrt{7}$.",
      exemple: {
        enonce: "Résous $x^2 - 81 = 0$.",
        solution: "$x^2 = 81$, donc $x = 9$ ou $x = -9$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "eq3-premier", titre: "Équations du premier degré", etape: "Résoudre", nb: 6 },
    { type: "eq3-produit", titre: "Équations produits", etape: "Résoudre", nb: 6 },
    { type: "eq3-carre", titre: "Équations x² = a", etape: "Résoudre", nb: 5 },
    { type: "eq3-problemes", titre: "Mettre en équation", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "La solution de $5x - 3 = 2x + 9$ est :", choix: ["$4$", "$2$", "$\\dfrac{6}{7}$", "$12$"], bonne: 0, explication: "$3x = 12$." },
    { question: "La solution de $2(x + 3) = 4x - 2$ est :", choix: ["$4$", "$\\dfrac{5}{2}$", "$1$", "$-4$"], bonne: 0, explication: "$2x + 6 = 4x - 2$, $-2x = -8$." },
    { question: "La solution de $\\dfrac{x}{3} = 5$ est :", choix: ["$15$", "$\\dfrac{5}{3}$", "$8$", "$2$"], bonne: 0, explication: "On multiplie par $3$." },
    { question: "Les solutions de $(x - 2)(x + 6) = 0$ sont :", choix: ["$2$ et $-6$", "$-2$ et $6$", "$2$ et $6$", "$-12$"], bonne: 0, explication: "Chaque facteur peut être nul." },
    { question: "Les solutions de $(3x - 1)(x + 4) = 0$ sont :", choix: ["$\\dfrac{1}{3}$ et $-4$", "$3$ et $-4$", "$-\\dfrac{1}{3}$ et $4$", "$1$ et $4$"], bonne: 0, explication: "$3x - 1 = 0$ donne $x = \\dfrac{1}{3}$." },
    { question: "Les solutions de $x^2 - 5x = 0$ sont :", choix: ["$0$ et $5$", "$5$ seulement", "$-5$ et $5$", "$0$ et $-5$"], bonne: 0, explication: "$x(x - 5) = 0$." },
    { question: "L'équation $x^2 = 36$ a pour solutions :", choix: ["$6$ et $-6$", "$6$ seulement", "$18$", "$18$ et $-18$"], bonne: 0, explication: "$\\sqrt{36} = 6$." },
    { question: "L'équation $x^2 = -9$ :", choix: ["n'a aucune solution", "a pour solutions $3$ et $-3$", "a pour solution $-3$", "a pour solution $-81$"], bonne: 0, explication: "Un carré n'est jamais négatif." },
    { question: "L'équation $x^2 = 11$ a pour solutions :", choix: ["$\\sqrt{11}$ et $-\\sqrt{11}$", "$\\sqrt{11}$ seulement", "$5{,}5$ et $-5{,}5$", "aucune"], bonne: 0, explication: "$11 > 0$." },
    { question: "« Un produit est nul » signifie :", choix: ["l'un au moins des facteurs est nul", "tous les facteurs sont nuls", "la somme des facteurs est nulle", "un des facteurs vaut $1$"], bonne: 0, explication: "C'est la propriété du produit nul." },
    { question: "Le double d'un nombre augmenté de $7$ vaut $25$. Ce nombre est :", choix: ["$9$", "$16$", "$18$", "$12{,}5$"], bonne: 0, explication: "$2x + 7 = 25$." },
    { question: "Pour résoudre $\\dfrac{x + 1}{2} = \\dfrac{x}{3}$, on peut écrire :", choix: ["$3(x + 1) = 2x$", "$2(x + 1) = 3x$", "$x + 1 = x$", "$6(x + 1) = x$"], bonne: 0, explication: "Produits en croix." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Résoudre une équation produit",
      etapes: [
        "Vérifie que le membre de droite est $0$ ; sinon, ramène tout à gauche.",
        "Factorise le membre de gauche si besoin (facteur commun, $a^2 - b^2$).",
        "Écris « l'un des facteurs est nul » et résous chaque petite équation."
      ],
      exemple: "$x^2 - 16 = 0$ : $(x - 4)(x + 4) = 0$, donc $x = 4$ ou $x = -4$."
    },
    {
      titre: "Mettre un problème en équation",
      etapes: [
        "Choisis l'inconnue et écris ce qu'elle représente.",
        "Traduis l'énoncé par une équation, puis résous-la.",
        "Vérifie que la solution a du sens et réponds par une phrase."
      ],
      exemple: "Âge du fils $x$, du père $3x$ : $x + 3x = 48$, donc $x = 12$."
    }
  ],
  erreurs: [
    "Oublier une des deux solutions d'une équation produit.",
    "Écrire $x^2 = 9$ donc $x = 3$ seulement.",
    "Chercher des solutions à $x^2 = a$ quand $a < 0$.",
    "Diviser par $x$ des deux côtés, ce qui fait perdre la solution $0$.",
    "Garder une solution négative pour une longueur."
  ]
};
