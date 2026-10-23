/*
  CHAPITRE : 3e — Factoriser
  ---------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027) : reconnaître une
  forme factorisée ou développée ; factoriser en mettant en évidence un facteur commun (nombre, lettre ou
  parenthèse) ; factoriser une différence de deux carrés avec a² − b² = (a − b)(a + b).
  Vidéos et cours PDF d'Yvan Monka.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-factoriser"] = {
  niveau: "3e",
  numero: 3,
  titre: "Factoriser",
  accroche: "Transformer une somme en produit : facteur commun et différence de deux carrés.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : factorisations (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Facto3e.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : factorisations (Yvan Monka)", url: "https://youtu.be/JVnzqtfXfl4", type: "video" },
    { titre: "Factoriser : a² − b² ou facteur commun ? (Yvan Monka)", url: "https://youtu.be/91ZSBiadxrA", type: "video" },
    { titre: "Factoriser avec un facteur commun, pour les experts (Yvan Monka)", url: "https://youtu.be/5dCsR85qd3k", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Forme factorisée, forme développée",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître une forme factorisée et une forme développée", youtube: "https://youtu.be/FTi9WOQsq3w" },
      texte:
        "**Factoriser**, c'est transformer une **somme** en **produit** : c'est le contraire de développer.\n\n" +
        "Pour savoir si une expression est un produit, on cherche la **dernière opération** qu'on ferait pour la calculer :\n\n" +
        "- $(x + 1)(2x - 3)$ : un produit, c'est une forme factorisée ;\n" +
        "- $2x^2 - x - 3$ : une somme, c'est une forme développée ;\n" +
        "- $(x + 1)(2x - 3) + 5$ : une somme, ce n'est pas une forme factorisée.",
      exemple: {
        enonce: "$3(x - 2)^2$ est-elle une forme factorisée ?",
        solution: "Oui : la dernière opération est la multiplication par $3$."
      }
    },
    {
      titre: "Facteur commun",
      video: { titre: "Vidéo d'Yvan Monka : factoriser en reconnaissant un facteur commun", youtube: "https://youtu.be/r3AzqvgLcI8" },
      texte:
        "$ka + kb = k(a + b)$ et $ka - kb = k(a - b)$.\n\n" +
        "Le facteur commun $k$ peut être un nombre, une lettre ou une parenthèse :\n\n" +
        "- $6x^2 + 9x = 3x \\times 2x + 3x \\times 3 = 3x(2x + 3)$ ;\n" +
        "- $(x + 2)(3x - 1) + (x + 2)(x + 5) = (x + 2)(4x + 4)$.\n\n" +
        "Avec un signe $-$ devant la deuxième parenthèse, tous ses signes changent.",
      exemple: {
        enonce: "Factorise $(x - 1)(2x + 3) - (x - 1)(x + 4)$.",
        solution: "$(x - 1)[(2x + 3) - (x + 4)] = (x - 1)(x - 1)$."
      }
    },
    {
      titre: "Différence de deux carrés",
      video: { titre: "Vidéo d'Yvan Monka : factoriser avec a² − b² = (a − b)(a + b)", youtube: "https://youtu.be/VWKNW4aLeG8" },
      texte:
        "$a^2 - b^2 = (a - b)(a + b)$.\n\n" +
        "On repère deux carrés séparés par un signe $-$ : $9x^2 - 25 = (3x)^2 - 5^2 = (3x - 5)(3x + 5)$.\n\n" +
        "Cela marche aussi avec une parenthèse : $(x + 1)^2 - 16 = (x + 1 - 4)(x + 1 + 4) = (x - 3)(x + 5)$.",
      exemple: {
        enonce: "Factorise $x^2 - 49$.",
        solution: "$(x - 7)(x + 7)$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "fc3-reconnaitre", titre: "Produit ou somme ?", etape: "Reconnaître", nb: 5 },
    { type: "fc3-commun", titre: "Facteur commun", etape: "Facteur commun", nb: 6 },
    { type: "fc3-carres", titre: "Différence de deux carrés", etape: "a² − b²", nb: 6 },
    { type: "fc3-calcul", titre: "Calculer astucieusement", etape: "a² − b²", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Laquelle est une forme factorisée ?", choix: ["$(x + 3)(x - 1)$", "$x^2 + 2x - 3$", "$x(x + 2) - 3$", "$x^2 - 3$"], bonne: 0, explication: "La dernière opération est une multiplication." },
    { question: "$5x + 15$ se factorise en :", choix: ["$5(x + 3)$", "$5(x + 15)$", "$5x(1 + 3)$", "$x(5 + 15)$"], bonne: 0, explication: "$5 \\times x + 5 \\times 3$." },
    { question: "$x^2 - 4x$ se factorise en :", choix: ["$x(x - 4)$", "$4(x^2 - x)$", "$x^2(1 - 4)$", "$(x - 2)(x + 2)$"], bonne: 0, explication: "$x$ est le facteur commun." },
    { question: "$12x^2 + 8x$ factorisé le plus possible :", choix: ["$4x(3x + 2)$", "$4(3x^2 + 2x)$", "$x(12x + 8)$", "$2x(6x + 4)$"], bonne: 0, explication: "$4x$ est le plus grand facteur commun." },
    { question: "$x^2 - 81$ se factorise en :", choix: ["$(x - 9)(x + 9)$", "$(x - 9)^2$", "$(x - 81)(x + 81)$", "$x(x - 81)$"], bonne: 0, explication: "$x^2 - 9^2$." },
    { question: "$16x^2 - 1$ se factorise en :", choix: ["$(4x - 1)(4x + 1)$", "$(16x - 1)(16x + 1)$", "$(4x - 1)^2$", "$(8x - 1)(8x + 1)$"], bonne: 0, explication: "$(4x)^2 - 1^2$." },
    { question: "$(x + 2)(x + 3) + (x + 2)(2x - 1)$ se factorise en :", choix: ["$(x + 2)(3x + 2)$", "$(x + 2)(2x^2 + 2)$", "$(x + 2)^2(3x + 2)$", "$(x + 2)(3x + 4)$"], bonne: 0, explication: "$(x + 3) + (2x - 1) = 3x + 2$." },
    { question: "$(x - 4)(2x + 1) - (x - 4)(x + 3)$ se factorise en :", choix: ["$(x - 4)(x - 2)$", "$(x - 4)(x + 4)$", "$(x - 4)(3x + 4)$", "$(x - 4)(x - 4)$"], bonne: 0, explication: "$(2x + 1) - (x + 3) = x - 2$." },
    { question: "$(x + 1)^2 - 9$ se factorise en :", choix: ["$(x - 2)(x + 4)$", "$(x - 8)(x + 10)$", "$(x + 1)(x - 8)$", "$(x - 3)(x + 3)$"], bonne: 0, explication: "$(x + 1 - 3)(x + 1 + 3)$." },
    { question: "$53^2 - 47^2$ est égal à :", choix: ["$600$", "$36$", "$100$", "$6$"], bonne: 0, explication: "$(53 - 47)(53 + 47) = 6 \\times 100$." },
    { question: "$x^2 + 9$ :", choix: ["ne se factorise pas avec $a^2 - b^2$", "est égal à $(x + 3)^2$", "est égal à $(x - 3)(x + 3)$", "est égal à $(x + 3)(x + 3)$"], bonne: 0, explication: "C'est une somme de carrés, pas une différence." },
    { question: "Factoriser une expression, c'est l'écrire sous forme :", choix: ["d'un produit", "d'une somme", "d'un quotient", "réduite"], bonne: 0, explication: "C'est le contraire de développer." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Factoriser avec un facteur commun",
      etapes: [
        "Écris chaque terme comme un produit et repère le facteur commun (nombre, lettre ou parenthèse).",
        "Écris le facteur commun devant, puis entre crochets ce qui reste de chaque terme.",
        "Réduis l'intérieur des crochets ; vérifie en redéveloppant."
      ],
      exemple: "$(x + 5)(2x - 1) - (x + 5)x = (x + 5)(x - 1)$."
    },
    {
      titre: "Factoriser a² − b²",
      etapes: [
        "Vérifie que c'est une différence de deux carrés.",
        "Trouve $a$ et $b$ : par exemple $25x^2 = (5x)^2$.",
        "Écris $(a - b)(a + b)$ et réduis chaque facteur."
      ],
      exemple: "$4x^2 - 9 = (2x - 3)(2x + 3)$."
    }
  ],
  erreurs: [
    "Oublier de changer les signes après un $-$ devant une parenthèse.",
    "Confondre $a^2 - b^2$ et $(a - b)^2$.",
    "Ne pas prendre le plus grand facteur commun.",
    "Écrire $25x^2 = (25x)^2$ au lieu de $(5x)^2$.",
    "Croire qu'une somme de deux carrés se factorise comme une différence."
  ]
};
