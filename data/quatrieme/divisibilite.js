/*
  CHAPITRE : 4e — Divisibilité et nombres premiers
  -------------------------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : multiples et diviseurs ; critères
  de divisibilité par 2, 3, 5, 9, 10 ; division euclidienne ; déterminer si un nombre entier est premier
  (nombres premiers jusqu'à 100) ; décomposer un nombre entier en produit de facteurs premiers ; simplifier une
  fraction pour la rendre irréductible ; modéliser et résoudre des problèmes de divisibilité (engrenages,
  phénomènes périodiques, partages…). Vidéos et cours PDF d'Yvan Monka (programme 2019-2020).
  Figures : "dp4-cours-…", "dp4-qcm-…", "dp4-meth-…" (assets/exercices-quatrieme.js).
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
    { titre: "Déterminer les nombres premiers entre 20 et 50 (Yvan Monka)", url: "https://youtu.be/N1gY8G_Y5k4", type: "video" },
    { titre: "Reconnaître un multiple ou un diviseur (Yvan Monka)", url: "https://youtu.be/-PLZFlAG99Q", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Multiples, diviseurs et critères",
      video: { titre: "Vidéo d'Yvan Monka : appliquer les critères de divisibilité", youtube: "https://youtu.be/BJDE6uOrmYQ" },
      texte:
        "$a$ est un **multiple** de $b$ (et $b$ un **diviseur** de $a$) s'il existe un entier $k$ tel que $a = b \\times k$. Les $12$ jetons rangés en $3$ rangées de $4$ montrent que $3$ et $4$ sont des diviseurs de $12$.\n\n" +
        "Critères : un entier est divisible par $2$ si son chiffre des unités est pair ; par $5$ s'il se termine par $0$ ou $5$ ; par $10$ s'il se termine par $0$ ; par $3$ (ou par $9$) si la somme de ses chiffres est divisible par $3$ (ou par $9$).\n\n" +
        "**Division euclidienne** : diviser $a$ par $b$, c'est trouver le quotient $q$ et le reste $r$ tels que $a = b \\times q + r$ avec $r < b$. Par exemple $47 = 6 \\times 7 + 5$. $b$ est un diviseur de $a$ quand le reste est nul.",
      figure: "dp4-cours-jetons",
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
        "Sur la grille, les nombres premiers jusqu'à $60$ sont colorés. Les nombres premiers inférieurs à $30$ sont : $2$ ; $3$ ; $5$ ; $7$ ; $11$ ; $13$ ; $17$ ; $19$ ; $23$ ; $29$.\n\n" +
        "Pour savoir si $n$ est premier, on teste la divisibilité par les nombres premiers $2$, $3$, $5$, $7$… tant que leur carré ne dépasse pas $n$.",
      figure: "dp4-cours-crible",
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
        "On divise par $2$ tant que c'est possible, puis par $3$, $5$, $7$… L'arbre montre les étapes ; les facteurs premiers sont entourés :\n\n" +
        "$360 = 2 \\times 180 = 2 \\times 2 \\times 90 = 2 \\times 2 \\times 2 \\times 45 = 2^3 \\times 3^2 \\times 5$.",
      figure: "dp4-cours-arbre",
      exemple: {
        enonce: "Décompose $84$ en produit de facteurs premiers.",
        solution: "$84 = 2 \\times 42 = 2 \\times 2 \\times 21 = 2^2 \\times 3 \\times 7$."
      }
    },
    {
      titre: "Fractions irréductibles et problèmes",
      video: { titre: "Vidéo d'Yvan Monka : simplifier une fraction", youtube: "https://youtu.be/6ce96Tze9nI" },
      texte:
        "Une fraction est **irréductible** quand son numérateur et son dénominateur n'ont aucun diviseur commun autre que $1$. On simplifie grâce aux décompositions :\n\n" +
        "$\\dfrac{84}{360} = \\dfrac{2^2 \\times 3 \\times 7}{2^3 \\times 3^2 \\times 5} = \\dfrac{7}{2 \\times 3 \\times 5} = \\dfrac{7}{30}$.\n\n" +
        "Les problèmes de **rendez-vous** (engrenages, barges, feux) utilisent le plus petit multiple commun : les roues de $12$ et $18$ dents retrouvent leurs marques face à face au bout de $36$ dents. Les problèmes de **partage** en groupes identiques utilisent le plus grand diviseur commun.",
      figure: "dp4-cours-engrenages",
      exemple: {
        enonce: "On veut faire le plus de paquets identiques possible avec $48$ mangues et $36$ ananas, sans reste. Combien de paquets ?",
        solution: "$48 = 2^4 \\times 3$ et $36 = 2^2 \\times 3^2$. Facteurs communs : $2^2 \\times 3 = 12$. On fait $12$ paquets de $4$ mangues et $3$ ananas."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "dp4-premier", titre: "Critères et nombres premiers", etape: "Nombres premiers", nb: 6 },
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
    { question: "$2^2 \\times 3 \\times 5^2$ est égal à :", choix: ["$300$", "$60$", "$150$", "$120$"], bonne: 0, explication: "$4 \\times 3 \\times 25 = 300$." },
    { question: "L'arbre de décomposition de $180$ est commencé. La décomposition complète est :", figure: "dp4-qcm-arbre", choix: ["$2^2 \\times 3^2 \\times 5$", "$2^2 \\times 45$", "$2 \\times 3^2 \\times 5$", "$2^2 \\times 3 \\times 15$"], bonne: 0, explication: "$45 = 3 \\times 15 = 3 \\times 3 \\times 5$, donc $180 = 2^2 \\times 3^2 \\times 5$ : tous les facteurs sont premiers." },
    { question: "Ce rangement de $91$ jetons montre que :", figure: "dp4-qcm-jetons", choix: ["$91$ n'est pas premier", "$91$ est premier", "$91$ est pair", "$91$ est divisible par $9$"], bonne: 0, explication: "$7$ rangées de $13$ : $91 = 7 \\times 13$, donc $7$ et $13$ sont des diviseurs de $91$." },
    { question: "Deux phares clignotent ensemble, puis l'un toutes les $6$ s et l'autre toutes les $8$ s. D'après la frise, ils clignotent de nouveau ensemble au bout de :", figure: "dp4-qcm-frise", choix: ["$24$ s", "$48$ s", "$14$ s", "$2$ s"], bonne: 0, explication: "$24$ est le plus petit multiple commun de $6$ et de $8$." },
    { question: "Le reste de la division euclidienne de $100$ par $7$ est :", choix: ["$2$", "$14$", "$3$", "$0$"], bonne: 0, explication: "$100 = 7 \\times 14 + 2$ avec $2 < 7$ : le quotient est $14$ et le reste $2$." },
    { question: "Lequel de ces nombres est divisible par $9$ ?", choix: ["$4\\,815$", "$4\\,812$", "$9\\,991$", "$1\\,239$"], bonne: 0, explication: "$4 + 8 + 1 + 5 = 18$, qui est un multiple de $9$. Pour les autres, on trouve $15$, $28$ et $15$." },
    { question: "$7\\,350$ est divisible par :", choix: ["$2$, $3$, $5$ et $10$", "$2$ et $5$ seulement", "$3$ et $9$", "$5$ seulement"], bonne: 0, explication: "Il se termine par $0$ : divisible par $2$, $5$ et $10$. $7 + 3 + 5 + 0 = 15$ : divisible par $3$ mais pas par $9$." },
    { question: "Un sol de $60$ cm sur $36$ cm est couvert de carreaux carrés identiques, les plus grands possible (voir la figure). Leur côté mesure :", figure: "dp4-qcm-carrelage", choix: ["$12$ cm", "$6$ cm", "$180$ cm", "$24$ cm"], bonne: 0, explication: "$12$ est le plus grand diviseur commun de $60$ et $36$ : $5$ carreaux sur la longueur et $3$ sur la largeur." },
    { question: "Combien y a-t-il de nombres premiers inférieurs à $30$ ?", choix: ["$10$", "$9$", "$11$", "$15$"], bonne: 0, explication: "$2$ ; $3$ ; $5$ ; $7$ ; $11$ ; $13$ ; $17$ ; $19$ ; $23$ ; $29$." },
    { question: "$\\dfrac{2^3 \\times 5}{2 \\times 5^2}$ sous forme irréductible est :", choix: ["$\\dfrac{4}{5}$", "$\\dfrac{8}{25}$", "$\\dfrac{2}{5}$", "$\\dfrac{4}{25}$"], bonne: 0, explication: "On simplifie par $2$ et par $5$ : il reste $\\dfrac{2^2}{5} = \\dfrac{4}{5}$." }
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
        "Puis par $3$, par $5$, par $7$… (un arbre aide à ne rien oublier).",
        "Écris le produit avec des puissances."
      ],
      figure: "dp4-meth-arbre",
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
    },
    {
      titre: "Problème de rendez-vous ou de partage",
      etapes: [
        "Des évènements qui se répètent et que l'on veut voir revenir ensemble : cherche le plus petit **multiple** commun.",
        "Un partage en groupes identiques, sans reste : cherche le plus grand **diviseur** commun.",
        "Liste les multiples (une frise aide) ou utilise les décompositions, puis réponds par une phrase."
      ],
      figure: "dp4-meth-frise",
      exemple: "Deux feux passent au vert toutes les $4$ min et toutes les $6$ min : de nouveau ensemble au bout de $12$ min."
    }
  ],
  erreurs: [
    "Croire que $1$ est premier.",
    "Croire qu'un nombre impair est forcément premier ($91 = 7 \\times 13$).",
    "Croire qu'un nombre qui se termine par $3$ est divisible par $3$ ($13$, $23$…) : on regarde la somme des chiffres.",
    "Laisser un facteur non premier dans la décomposition ($72 = 8 \\times 9$).",
    "Simplifier une fraction « à moitié » sans aller jusqu'à la forme irréductible.",
    "Confondre multiple commun (rendez-vous) et diviseur commun (partage)."
  ]
};
