/*
  CHAPITRE : 4e — Divisibilité et nombres premiers
  -------------------------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : utiliser les critères de
  divisibilité ; déterminer si un entier est multiple ou diviseur d'un autre ; déterminer si un nombre entier est
  premier ; décomposer un nombre entier en produit de facteurs premiers ; simplifier une fraction pour la rendre
  irréductible ; modéliser et résoudre des problèmes de divisibilité (engrenages, phénomènes périodiques…).
  Vidéos et cours PDF d'Yvan Monka (programme 2019-2020).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["quatrieme-divisibilite"] = {
  niveau: "4e",
  numero: 1,
  titre: "Divisibilité et nombres premiers",
  accroche: "Reconnaître un nombre premier, décomposer un entier en produit de facteurs premiers et s'en servir pour simplifier des fractions et résoudre des problèmes.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : divisibilité et nombres premiers (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Divi-np.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : arithmétique (Yvan Monka)", url: "https://youtu.be/al9oHwrlTNo", type: "video" },
    { titre: "Déterminer les nombres premiers entre 20 et 50 (Yvan Monka)", url: "https://youtu.be/N1gY8G_Y5k4", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Multiples, diviseurs et critères",
      video: { titre: "Vidéo d'Yvan Monka : appliquer les critères de divisibilité", youtube: "https://youtu.be/BJDE6uOrmYQ" },
      texte:
        "$a$ est un **multiple** de $b$ (et $b$ un **diviseur** de $a$) s'il existe un entier $k$ tel que $a = b \\times k$.\n\n" +
        "Critères : un entier est divisible par $2$ si son chiffre des unités est pair ; par $5$ s'il se termine par $0$ ou $5$ ; par $10$ s'il se termine par $0$ ; par $3$ (ou par $9$) si la somme de ses chiffres est divisible par $3$ (ou par $9$).",
      exemple: {
        enonce: "$1\\,035$ est-il divisible par $3$ ? par $5$ ? par $9$ ?",
        solution: "$1 + 0 + 3 + 5 = 9$ : divisible par $3$ et par $9$. Il se termine par $5$ : divisible par $5$."
      }
    },
    {
      titre: "Nombres premiers",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître un nombre premier", youtube: "https://youtu.be/g9PLLhnCv88" },
      texte:
        "Un nombre entier est **premier** s'il a exactement deux diviseurs : $1$ et lui-même. $1$ n'est pas premier.\n\n" +
        "Les nombres premiers inférieurs à $50$ : $2$ ; $3$ ; $5$ ; $7$ ; $11$ ; $13$ ; $17$ ; $19$ ; $23$ ; $29$ ; $31$ ; $37$ ; $41$ ; $43$ ; $47$.\n\n" +
        "Pour savoir si $n$ est premier, on teste la divisibilité par les nombres premiers $2$, $3$, $5$, $7$… tant que leur carré ne dépasse pas $n$.",
      exemple: {
        enonce: "$91$ est-il premier ? Et $97$ ?",
        solution: "$91 = 7 \\times 13$ : il n'est pas premier.\n\n$97$ n'est divisible ni par $2$, ni par $3$, ni par $5$, ni par $7$ (et $11^2 = 121 > 97$) : il est premier."
      }
    },
    {
      titre: "Décomposition en facteurs premiers",
      video: { titre: "Vidéo d'Yvan Monka : décomposer un nombre en produit de facteurs premiers", youtube: "https://youtu.be/BlGaIqNz_pk" },
      texte:
        "Tout entier supérieur à $1$ qui n'est pas premier se décompose en un produit de facteurs premiers, et cette décomposition est unique (à l'ordre près).\n\n" +
        "On divise par $2$ tant que c'est possible, puis par $3$, $5$, $7$… :\n\n" +
        "$360 = 2 \\times 180 = 2 \\times 2 \\times 90 = 2 \\times 2 \\times 2 \\times 45 = 2^3 \\times 3^2 \\times 5$.",
      exemple: {
        enonce: "Décompose $84$ en produit de facteurs premiers.",
        solution: "$84 = 2 \\times 42 = 2 \\times 2 \\times 21 = 2^2 \\times 3 \\times 7$."
      }
    },
    {
      titre: "Fractions irréductibles et problèmes",
      texte:
        "Une fraction est **irréductible** quand son numérateur et son dénominateur n'ont aucun diviseur commun autre que $1$. On simplifie grâce aux décompositions :\n\n" +
        "$\\dfrac{84}{360} = \\dfrac{2^2 \\times 3 \\times 7}{2^3 \\times 3^2 \\times 5} = \\dfrac{7}{2 \\times 3 \\times 5} = \\dfrac{7}{30}$.\n\n" +
        "Les problèmes de **rendez-vous** (engrenages, feux, bateaux) utilisent les multiples communs ; les problèmes de **partage** en groupes identiques utilisent les diviseurs communs.",
      exemple: {
        enonce: "On veut faire le plus de paquets identiques possible avec $48$ mangues et $36$ ananas, sans reste. Combien de paquets ?",
        solution: "$48 = 2^4 \\times 3$ et $36 = 2^2 \\times 3^2$. Facteurs communs : $2^2 \\times 3 = 12$. On fait $12$ paquets de $4$ mangues et $3$ ananas."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "dp4-premier", titre: "Reconnaître un nombre premier", etape: "Nombres premiers", nb: 6 },
    { type: "dp4-decomposer", titre: "Décomposer en facteurs premiers", etape: "Nombres premiers", nb: 6 },
    { type: "dp4-irreductible", titre: "Rendre une fraction irréductible", etape: "Applications", nb: 5 },
    { type: "dp4-problemes", titre: "Problèmes de divisibilité", etape: "Applications", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Lequel de ces nombres est premier ?", choix: ["$31$", "$33$", "$35$", "$39$"], bonne: 0, explication: "$33 = 3 \\times 11$, $35 = 5 \\times 7$, $39 = 3 \\times 13$." },
    { question: "Le nombre $1$ est-il premier ?", choix: ["Non, il n'a qu'un seul diviseur", "Oui", "Oui, c'est le plus petit", "Seulement en 4e"], bonne: 0, explication: "Un nombre premier a exactement deux diviseurs." },
    { question: "Le seul nombre premier pair est :", choix: ["$2$", "$4$", "$0$", "il n'y en a pas"], bonne: 0, explication: "Les autres pairs sont divisibles par $2$." },
    { question: "$51$ est :", choix: ["divisible par $3$", "premier", "divisible par $7$", "divisible par $5$"], bonne: 0, explication: "$5 + 1 = 6$ : $51 = 3 \\times 17$." },
    { question: "La décomposition de $60$ est :", choix: ["$2^2 \\times 3 \\times 5$", "$6 \\times 10$", "$2 \\times 3 \\times 10$", "$4 \\times 15$"], bonne: 0, explication: "Tous les facteurs doivent être premiers." },
    { question: "La décomposition de $72$ est :", choix: ["$2^3 \\times 3^2$", "$2^2 \\times 3^3$", "$8 \\times 9$", "$2 \\times 36$"], bonne: 0, explication: "$72 = 8 \\times 9 = 2^3 \\times 3^2$." },
    { question: "Le plus grand facteur premier de $210$ est :", choix: ["$7$", "$5$", "$21$", "$105$"], bonne: 0, explication: "$210 = 2 \\times 3 \\times 5 \\times 7$." },
    { question: "$\\dfrac{18}{24}$ sous forme irréductible est :", choix: ["$\\dfrac{3}{4}$", "$\\dfrac{9}{12}$", "$\\dfrac{6}{8}$", "$\\dfrac{2}{3}$"], bonne: 0, explication: "On simplifie par $6$." },
    { question: "$\\dfrac{35}{49}$ sous forme irréductible est :", choix: ["$\\dfrac{5}{7}$", "$\\dfrac{7}{5}$", "$\\dfrac{35}{49}$", "$\\dfrac{1}{7}$"], bonne: 0, explication: "On simplifie par $7$." },
    { question: "Pour savoir si $113$ est premier, il suffit de tester les diviseurs premiers jusqu'à :", choix: ["$10$", "$113$", "$56$", "$2$"], bonne: 0, explication: "$11^2 = 121 > 113$." },
    { question: "Deux bus partent ensemble ; l'un repasse toutes les $12$ min, l'autre toutes les $18$ min. Ils repartent ensemble au bout de :", choix: ["$36$ min", "$216$ min", "$6$ min", "$30$ min"], bonne: 0, explication: "$36$ est le plus petit multiple commun." },
    { question: "Avec $24$ filles et $40$ garçons, le plus grand nombre d'équipes identiques est :", choix: ["$8$", "$4$", "$64$", "$2$"], bonne: 0, explication: "$8$ est le plus grand diviseur commun." },
    { question: "Combien y a-t-il de nombres premiers entre $20$ et $30$ ?", choix: ["$2$", "$1$", "$3$", "$4$"], bonne: 0, explication: "$23$ et $29$." },
    { question: "$2^2 \\times 3 \\times 5^2$ est égal à :", choix: ["$300$", "$60$", "$150$", "$120$"], bonne: 0, explication: "$4 \\times 3 \\times 25 = 300$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Savoir si un nombre est premier",
      etapes: [
        "Teste $2$, $3$, $5$ avec les critères de divisibilité.",
        "Teste ensuite $7$, $11$, $13$… par division.",
        "Arrête-toi quand le carré du diviseur testé dépasse le nombre : s'il n'y a aucun diviseur, il est premier."
      ],
      exemple: "$89$ : pas divisible par $2$, $3$, $5$, $7$ et $11^2 > 89$ : premier."
    },
    {
      titre: "Décomposer en facteurs premiers",
      etapes: [
        "Divise par $2$ autant de fois que possible.",
        "Puis par $3$, par $5$, par $7$…",
        "Écris le produit avec des puissances."
      ],
      exemple: "$180 = 2^2 \\times 3^2 \\times 5$."
    },
    {
      titre: "Rendre une fraction irréductible",
      etapes: [
        "Décompose le numérateur et le dénominateur.",
        "Simplifie par tous les facteurs communs.",
        "Vérifie qu'il ne reste aucun facteur commun."
      ],
      exemple: "$\\dfrac{60}{84} = \\dfrac{2^2 \\times 3 \\times 5}{2^2 \\times 3 \\times 7} = \\dfrac{5}{7}$."
    }
  ],
  erreurs: [
    "Croire que $1$ est premier.",
    "Croire qu'un nombre impair est forcément premier ($91 = 7 \\times 13$).",
    "Laisser un facteur non premier dans la décomposition ($72 = 8 \\times 9$).",
    "Simplifier une fraction « à moitié » sans aller jusqu'à la forme irréductible.",
    "Confondre multiple commun (rendez-vous) et diviseur commun (partage)."
  ]
};
