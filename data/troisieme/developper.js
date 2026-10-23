/*
  CHAPITRE : 3e — Développer
  ---------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027) : développer un
  produit par la double distributivité ; connaître et utiliser l'égalité (a − b)(a + b) = a² − b² ; utiliser le
  calcul littéral pour prouver un résultat général (programmes de calcul, propriétés des entiers).
  Vidéos et cours PDF d'Yvan Monka.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-developper"] = {
  niveau: "3e",
  numero: 2,
  titre: "Développer",
  accroche: "La double distributivité, l'égalité (a − b)(a + b) = a² − b² et le calcul littéral pour prouver un résultat.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : développements (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Dev3e.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : développements (Yvan Monka)", url: "https://youtu.be/F78Sm4HCHxA", type: "video" },
    { titre: "Développer avec la double distributivité (2) (Yvan Monka)", url: "https://youtu.be/1EPOmbvoAlU", type: "video" },
    { titre: "Résoudre un problème à l'aide du calcul littéral (Yvan Monka)", url: "https://youtu.be/g1tyDEz71hw", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Double distributivité",
      video: { titre: "Vidéo d'Yvan Monka : développer en utilisant la double distributivité", youtube: "https://youtu.be/YS-3JI_z2f0" },
      texte:
        "$(a + b)(c + d) = ac + ad + bc + bd$ : chaque terme de la première parenthèse multiplie chaque terme de la seconde.\n\n" +
        "$(2x + 3)(x - 4) = 2x^2 - 8x + 3x - 12 = 2x^2 - 5x - 12$.\n\n" +
        "On applique la **règle des signes** à chacun des quatre produits, puis on **réduit**.",
      exemple: {
        enonce: "Développe et réduis $(x - 5)(3x + 2)$.",
        solution: "$3x^2 + 2x - 15x - 10 = 3x^2 - 13x - 10$."
      }
    },
    {
      titre: "L'égalité (a − b)(a + b) = a² − b²",
      video: { titre: "Vidéo d'Yvan Monka : développer avec (a − b)(a + b) = a² − b²", youtube: "https://youtu.be/6j0oMQlaBYg" },
      texte:
        "Pour tous nombres $a$ et $b$ : $(a - b)(a + b) = a^2 - b^2$.\n\n" +
        "$(3x - 2)(3x + 2) = (3x)^2 - 2^2 = 9x^2 - 4$.\n\n" +
        "Elle permet aussi de calculer mentalement : $49 \\times 51 = (50 - 1)(50 + 1) = 2\\,500 - 1 = 2\\,499$.",
      exemple: {
        enonce: "Développe $(x + 7)(x - 7)$.",
        solution: "$x^2 - 49$."
      }
    },
    {
      titre: "Prouver avec le calcul littéral",
      video: { titre: "Vidéo d'Yvan Monka : prouver une propriété à l'aide du calcul littéral", youtube: "https://youtu.be/-h9kFZcULz8" },
      texte:
        "Des exemples ne suffisent pas pour prouver qu'un résultat est **toujours** vrai : on appelle $x$ (ou $n$) le nombre de départ et on développe.\n\n" +
        "Programme « choisis $x$, ajoute $3$, multiplie par $x - 3$, ajoute $9$ » : $(x + 3)(x - 3) + 9 = x^2 - 9 + 9 = x^2$. Le résultat est toujours le carré du nombre de départ.\n\n" +
        "Pour prouver qu'une égalité est **fausse**, un seul **contre-exemple** suffit.",
      exemple: {
        enonce: "Prouve que la somme de trois entiers consécutifs est un multiple de $3$.",
        solution: "$n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "dv3-double", titre: "Double distributivité", etape: "Développer", nb: 6 },
    { type: "dv3-coef", titre: "Développer et réduire une somme", etape: "Développer", nb: 6 },
    { type: "dv3-identite", titre: "(a − b)(a + b) = a² − b²", etape: "Égalité remarquable", nb: 5 },
    { type: "dv3-prouver", titre: "Prouver avec des lettres", etape: "Prouver", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$(x + 2)(x + 5)$ est égal à :", choix: ["$x^2 + 7x + 10$", "$x^2 + 10$", "$2x + 7$", "$x^2 + 7x + 7$"], bonne: 0, explication: "$x^2 + 5x + 2x + 10$." },
    { question: "$(x - 3)(x + 4)$ est égal à :", choix: ["$x^2 + x - 12$", "$x^2 - x - 12$", "$x^2 - 12$", "$x^2 + 7x - 12$"], bonne: 0, explication: "$x^2 + 4x - 3x - 12$." },
    { question: "$(2x - 1)(3x - 2)$ est égal à :", choix: ["$6x^2 - 7x + 2$", "$6x^2 - 7x - 2$", "$6x^2 + 2$", "$5x^2 - 7x + 2$"], bonne: 0, explication: "$6x^2 - 4x - 3x + 2$." },
    { question: "$(x - 6)(x + 6)$ est égal à :", choix: ["$x^2 - 36$", "$x^2 + 36$", "$x^2 - 12$", "$2x - 36$"], bonne: 0, explication: "$a^2 - b^2$." },
    { question: "$(5x + 1)(5x - 1)$ est égal à :", choix: ["$25x^2 - 1$", "$5x^2 - 1$", "$25x^2 + 1$", "$10x - 1$"], bonne: 0, explication: "$(5x)^2 - 1^2$." },
    { question: "$99 \\times 101$ est égal à :", choix: ["$9\\,999$", "$10\\,001$", "$9\\,900$", "$10\\,000$"], bonne: 0, explication: "$100^2 - 1^2$." },
    { question: "$(x + 3)^2$ est égal à :", choix: ["$x^2 + 6x + 9$", "$x^2 + 9$", "$x^2 + 3x + 9$", "$2x + 6$"], bonne: 0, explication: "$(x + 3)(x + 3) = x^2 + 3x + 3x + 9$." },
    { question: "$-(x - 4)$ est égal à :", choix: ["$-x + 4$", "$-x - 4$", "$x + 4$", "$x - 4$"], bonne: 0, explication: "Le signe $-$ change le signe de chaque terme." },
    { question: "$2x(x - 3) - x^2$ est égal à :", choix: ["$x^2 - 6x$", "$x^2 - 3x$", "$3x^2 - 6x$", "$-6x$"], bonne: 0, explication: "$2x^2 - 6x - x^2$." },
    { question: "Pour prouver qu'une égalité est vraie pour tout $x$, on :", choix: ["fait un calcul littéral général", "teste trois valeurs", "teste $x = 0$", "trace un graphique"], bonne: 0, explication: "Les exemples ne suffisent pas." },
    { question: "Pour prouver qu'une égalité est fausse, il suffit :", choix: ["d'un contre-exemple", "de la développer", "de trois exemples", "de la factoriser"], bonne: 0, explication: "Un seul cas suffit." },
    { question: "La somme de deux entiers consécutifs $n + (n + 1)$ est :", choix: ["toujours impaire", "toujours paire", "un multiple de $3$", "un carré"], bonne: 0, explication: "$2n + 1$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Développer un produit de deux parenthèses",
      etapes: [
        "Multiplie chaque terme de la première parenthèse par chaque terme de la seconde (quatre produits).",
        "Applique la règle des signes à chaque produit.",
        "Réduis : regroupe les termes en $x^2$, en $x$, puis les nombres."
      ],
      exemple: "$(x + 1)(2x - 3) = 2x^2 - 3x + 2x - 3 = 2x^2 - x - 3$."
    },
    {
      titre: "Reconnaître (a − b)(a + b)",
      etapes: [
        "Les deux parenthèses ont les mêmes termes, avec un signe $-$ dans l'une et $+$ dans l'autre.",
        "Repère $a$ et $b$, puis écris $a^2 - b^2$.",
        "N'oublie pas d'élever au carré le coefficient : $(4x)^2 = 16x^2$."
      ],
      exemple: "$(4x - 3)(4x + 3) = 16x^2 - 9$."
    }
  ],
  erreurs: [
    "Ne faire que deux produits au lieu de quatre.",
    "Oublier la règle des signes dans un produit.",
    "Écrire $(3x)^2 = 3x^2$ au lieu de $9x^2$.",
    "Oublier que le signe $-$ devant une parenthèse change tous les signes.",
    "Croire que des exemples suffisent à prouver un résultat général."
  ]
};
