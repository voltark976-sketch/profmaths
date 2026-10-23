/*
  CHAPITRE : 3e — Arithmétique
  -----------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027) : multiples,
  diviseurs, critères de divisibilité, division euclidienne ; nombres premiers ; décomposition en produit de
  facteurs premiers ; diviseurs communs et fractions irréductibles ; raisonner avec des lettres (pair, impair,
  multiple). Vidéos et cours PDF d'Yvan Monka.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-arithmetique"] = {
  niveau: "3e",
  numero: 5,
  titre: "Arithmétique",
  accroche: "Diviseurs, nombres premiers, décompositions et problèmes de partage, comme au brevet.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : arithmétique (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Arithmetique.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : arithmétique (Yvan Monka)", url: "https://youtu.be/al9oHwrlTNo", type: "video" },
    { titre: "Résoudre un problème de divisibilité (Yvan Monka)", url: "https://youtu.be/QoRWa45dQig", type: "video" },
    { titre: "Rendre une fraction irréductible (Yvan Monka)", url: "https://youtu.be/qZaTliAWkA0", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Diviseurs et critères",
      video: { titre: "Vidéo d'Yvan Monka : déterminer les diviseurs d'un nombre", youtube: "https://youtu.be/sSgsrHMyFrI" },
      texte:
        "$a$ est un **diviseur** de $b$ (et $b$ un **multiple** de $a$) si le reste de la division euclidienne de $b$ par $a$ est nul.\n\n" +
        "- par $2$ : chiffre des unités pair ; par $5$ : chiffre des unités $0$ ou $5$ ;\n" +
        "- par $3$ : somme des chiffres multiple de $3$ ; par $9$ : somme des chiffres multiple de $9$.\n\n" +
        "Division euclidienne : $b = a \\times q + r$ avec $0 \\leqslant r < a$.",
      exemple: {
        enonce: "$4\\,572$ est-il divisible par $9$ ?",
        solution: "$4 + 5 + 7 + 2 = 18$, multiple de $9$ : oui."
      }
    },
    {
      titre: "Nombres premiers et décomposition",
      video: { titre: "Vidéo d'Yvan Monka : décomposer en produit de facteurs premiers", youtube: "https://youtu.be/RBE2wPIKagI" },
      texte:
        "Un nombre **premier** a exactement deux diviseurs : $1$ et lui-même ($2$, $3$, $5$, $7$, $11$, $13$…).\n\n" +
        "Tout entier supérieur ou égal à $2$ se **décompose** de façon unique en produit de facteurs premiers : $360 = 2^{3} \\times 3^{2} \\times 5$.\n\n" +
        "La décomposition donne tous les diviseurs et permet de rendre une fraction **irréductible** : $\\dfrac{84}{90} = \\dfrac{2 \\times 2 \\times 3 \\times 7}{2 \\times 3 \\times 3 \\times 5} = \\dfrac{14}{15}$.",
      exemple: {
        enonce: "Décompose $126$.",
        solution: "$126 = 2 \\times 63 = 2 \\times 3^{2} \\times 7$."
      }
    },
    {
      titre: "Problèmes de partage et preuves",
      video: { titre: "Vidéo d'Yvan Monka : écrire avec des lettres un multiple de 3, un nombre pair…", youtube: "https://youtu.be/tcOgLLYNYkI" },
      texte:
        "Pour faire le **plus grand nombre** de paquets identiques avec $a$ et $b$ objets, on cherche le **plus grand diviseur commun** de $a$ et $b$ (avec les décompositions).\n\n" +
        "Avec des lettres ($k$ entier) : un nombre pair s'écrit $2k$, un impair $2k + 1$, un multiple de $3$ s'écrit $3k$.\n\n" +
        "Exemple : $(2k + 1) + (2m + 1) = 2(k + m + 1)$, donc la somme de deux impairs est paire.",
      exemple: {
        enonce: "Avec $84$ billes rouges et $60$ bleues, combien de sacs identiques au maximum ?",
        solution: "$84 = 2^2 \\times 3 \\times 7$, $60 = 2^2 \\times 3 \\times 5$ : $2^2 \\times 3 = 12$ sacs."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "ar3-criteres", titre: "Critères et division euclidienne", etape: "Diviseurs", nb: 6 },
    { type: "ar3-decomposer", titre: "Décomposer et compter les diviseurs", etape: "Nombres premiers", nb: 6 },
    { type: "ar3-problemes", titre: "Problèmes de partage", etape: "Problèmes", nb: 5 },
    { type: "ar3-preuves", titre: "Nombres premiers et preuves", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Lequel est un nombre premier ?", choix: ["$37$", "$39$", "$51$", "$57$"], bonne: 0, explication: "$39 = 3 \\times 13$, $51 = 3 \\times 17$, $57 = 3 \\times 19$." },
    { question: "$2\\,535$ est divisible par :", choix: ["$3$ et $5$", "$2$ et $5$", "$9$", "$2$ et $3$"], bonne: 0, explication: "Somme $15$, unités $5$." },
    { question: "Le reste de la division euclidienne de $100$ par $7$ est :", choix: ["$2$", "$14$", "$3$", "$1$"], bonne: 0, explication: "$100 = 7 \\times 14 + 2$." },
    { question: "La décomposition de $72$ est :", choix: ["$2^{3} \\times 3^{2}$", "$2^{2} \\times 3^{3}$", "$8 \\times 9$", "$2 \\times 36$"], bonne: 0, explication: "$72 = 8 \\times 9$." },
    { question: "La forme irréductible de $\\dfrac{45}{75}$ est :", choix: ["$\\dfrac{3}{5}$", "$\\dfrac{9}{15}$", "$\\dfrac{5}{3}$", "$\\dfrac{15}{25}$"], bonne: 0, explication: "On simplifie par $15$." },
    { question: "Le plus grand diviseur commun de $24$ et $36$ est :", choix: ["$12$", "$6$", "$72$", "$4$"], bonne: 0, explication: "$2^2 \\times 3$." },
    { question: "Combien $12$ a-t-il de diviseurs ?", choix: ["$6$", "$4$", "$3$", "$12$"], bonne: 0, explication: "$1, 2, 3, 4, 6, 12$." },
    { question: "Un nombre impair s'écrit :", choix: ["$2k + 1$", "$2k$", "$k + 2$", "$k^2$"], bonne: 0, explication: "$k$ est un entier." },
    { question: "La somme de deux nombres impairs est :", choix: ["paire", "impaire", "première", "un multiple de $3$"], bonne: 0, explication: "$2(k + m + 1)$." },
    { question: "Avec $48$ crayons et $36$ gommes, le plus grand nombre de lots identiques est :", choix: ["$12$", "$6$", "$84$", "$4$"], bonne: 0, explication: "Plus grand diviseur commun." },
    { question: "Combien y a-t-il de nombres premiers entre $20$ et $30$ ?", choix: ["$2$", "$3$", "$1$", "$4$"], bonne: 0, explication: "$23$ et $29$." },
    { question: "$1$ est :", choix: ["ni premier ni composé", "premier", "pair", "un multiple de $2$"], bonne: 0, explication: "Il n'a qu'un diviseur." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Décomposer en facteurs premiers",
      etapes: [
        "Divise par $2$ tant que c'est possible.",
        "Continue avec $3$, puis $5$, $7$, $11$… jusqu'à obtenir $1$.",
        "Regroupe les facteurs égaux avec des puissances."
      ],
      exemple: "$180 = 2 \\times 90 = 2^2 \\times 45 = 2^2 \\times 3^2 \\times 5$."
    },
    {
      titre: "Problème de partage maximal",
      etapes: [
        "Le nombre de paquets doit diviser chacune des quantités.",
        "Décompose les quantités et prends le produit des facteurs communs.",
        "Divise chaque quantité par ce nombre pour la composition d'un paquet."
      ],
      exemple: "$90$ et $126$ : $2 \\times 3^2 = 18$ paquets de $5$ et $7$."
    }
  ],
  erreurs: [
    "Croire que $1$ est un nombre premier.",
    "Laisser un facteur non premier dans une décomposition ($2^2 \\times 9$).",
    "Confondre quotient et reste d'une division euclidienne.",
    "Utiliser le critère de $3$ pour conclure à la divisibilité par $9$.",
    "Prendre le plus petit multiple commun au lieu du plus grand diviseur commun dans un partage."
  ]
};
