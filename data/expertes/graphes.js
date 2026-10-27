/*
  CHAPITRE : Terminale maths expertes — Graphes et matrice d'adjacence
  ---------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme officiel de maths expertes (BO spécial n° 8 du 25 juillet 2019), « Graphes et matrices » :
  graphe, sommets, arêtes, graphe complet, sommets adjacents, degré, ordre, chaîne, longueur, graphe connexe,
  matrice d'adjacence, nombre de chemins de longueur n (démonstration). Graphes eulériens : « problème possible ».
  video : vidéos d'Yvan Monka. Générateurs : préfixe xr- dans assets/exercices-expertes.js ; figures "xr-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["expertes-graphes"] = {
  niveau: "Terminale maths expertes",
  numero: 10,
  titre: "Graphes et matrice d'adjacence",
  accroche: "Des points reliés par des traits pour modéliser routes, réseaux et rencontres, et une matrice pour compter les chemins.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : graphes, partie 1 (PDF)", url: "https://www.maths-et-tiques.fr/telech/20graphe1.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Vocabulaire des graphes",
      figure: "xr-cours-graphe",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la propriété de la somme des degrés", youtube: "https://youtu.be/gznmzmzjBsQ" },
      texte:
        "Un **graphe** (non orienté) est formé de **sommets** et d'**arêtes** qui relient deux sommets.\n\n" +
        "- L'**ordre** du graphe est son nombre de sommets.\n" +
        "- Deux sommets reliés par une arête sont **adjacents**.\n" +
        "- Le **degré** d'un sommet est le nombre d'arêtes qui en partent.\n\n" +
        "**Propriété (lemme des poignées de main).** La somme des degrés des sommets est égale au **double du nombre d'arêtes**.\n\n" +
        "En effet, chaque arête a deux extrémités : elle compte pour $1$ dans le degré de chacune. Conséquence : le nombre de sommets de degré impair est toujours **pair**.",
      exemple: {
        enonce: "Dans le graphe dessiné, donne l'ordre, le degré de chaque sommet et le nombre d'arêtes.",
        solution: "Ordre $5$. Degrés : A : $2$, B : $3$, C : $3$, D : $2$, E : $2$. Somme $12 = 2 \\times 6$ : il y a $6$ arêtes."
      }
    },
    {
      titre: "Le graphe complet",
      figure: "xr-cours-complet",
      texte:
        "Un graphe est **complet** si tous ses sommets sont adjacents deux à deux. On note $K_n$ le graphe complet d'ordre $n$.\n\n" +
        "Chaque sommet de $K_n$ est de degré $n - 1$, donc la somme des degrés vaut $n(n - 1)$ et le nombre d'arêtes est :\n\n" +
        "$\\dfrac{n(n - 1)}{2}$\n\n" +
        "C'est aussi le nombre de matchs d'un tournoi où chaque équipe rencontre une fois chacune des autres, ou $\\dbinom{n}{2}$ (choix de $2$ sommets parmi $n$).",
      exemple: {
        enonce: "Un tournoi de handball réunit $8$ villages de Mayotte, chaque équipe rencontrant une fois chacune des autres. Combien de matchs ?",
        solution: "C'est le nombre d'arêtes de $K_8$ : $\\dfrac{8 \\times 7}{2} = 28$ matchs."
      }
    },
    {
      titre: "Chaînes, cycles, graphe connexe",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître une chaîne et un cycle", youtube: "https://youtu.be/88D9yWJAYYk" },
      texte:
        "- Une **chaîne** est une suite de sommets dans laquelle deux sommets consécutifs sont adjacents. Sa **longueur** est son nombre d'**arêtes**.\n" +
        "- Une chaîne **fermée** revient à son point de départ. Un **cycle** est une chaîne fermée dont les arêtes sont toutes distinctes.\n" +
        "- Un graphe est **connexe** si deux sommets quelconques peuvent toujours être reliés par une chaîne : « on peut aller partout ».\n" +
        "- La **distance** entre deux sommets est la longueur d'une plus courte chaîne qui les relie.",
      exemple: {
        enonce: "Dans le graphe du cours, donne une chaîne de longueur $3$ de A à E, puis la distance entre A et E.",
        solution: "A – C – D – E est une chaîne de longueur $3$. Mais A – B – E a pour longueur $2$, et A n'est pas adjacent à E : la distance vaut $2$."
      }
    },
    {
      titre: "Graphes orientés",
      figure: "xr-cours-oriente",
      video: { titre: "Vidéo d'Yvan Monka : déterminer la matrice d'adjacence d'un graphe orienté", youtube: "https://youtu.be/yRBCx3uxN9A" },
      texte:
        "Dans un graphe **orienté**, les arêtes ont un sens : ce sont des **arcs**, dessinés par des flèches (rues à sens unique, liens d'une page web vers une autre…).\n\n" +
        "- Un **chemin** est une suite de sommets reliés par des arcs, parcourus dans le bon sens. Sa longueur est son nombre d'arcs.\n" +
        "- Un **circuit** est un chemin fermé.\n" +
        "- Une **boucle** est un arc qui va d'un sommet vers lui-même."
    },
    {
      titre: "La matrice d'adjacence",
      video: { titre: "Vidéo d'Yvan Monka : déterminer la matrice d'adjacence", youtube: "https://youtu.be/JMBCVKiVsic" },
      texte:
        "On numérote les sommets de $1$ à $n$. La **matrice d'adjacence** est la matrice carrée $A$ d'ordre $n$ telle que $a_{ij}$ est le nombre d'arêtes (ou d'arcs) **de $i$ vers $j$** : en général $1$ s'ils sont reliés, $0$ sinon.\n\n" +
        "- Pour un graphe **non orienté**, $A$ est **symétrique** et la somme de la ligne $i$ est le degré du sommet $i$.\n" +
        "- Pour un graphe **orienté**, la ligne correspond au sommet de départ et la colonne au sommet d'arrivée.\n\n" +
        "Exemple (graphe orienté ci-dessus, ordre A, B, C, D) : $A = \\begin{pmatrix} 0 & 1 & 0 & 1 \\\\ 0 & 0 & 1 & 0 \\\\ 1 & 0 & 0 & 1 \\\\ 0 & 0 & 1 & 0 \\end{pmatrix}$."
    },
    {
      titre: "Compter les chemins avec $A^n$",
      video: { titre: "Vidéo d'Yvan Monka : déterminer le nombre de chaînes reliant deux sommets", youtube: "https://youtu.be/FzqGLJ80jLw" },
      texte:
        "**Propriété.** Le coefficient $(i\\,;j)$ de la matrice $A^n$ est le **nombre de chemins de longueur $n$** allant du sommet $i$ au sommet $j$.\n\n" +
        "**Démonstration par récurrence.** Pour $n = 1$, c'est la définition de $A$. Supposons la propriété vraie au rang $n$. Un chemin de longueur $n + 1$ de $i$ à $j$ est un chemin de longueur $n$ de $i$ à un sommet $k$, suivi d'un arc de $k$ à $j$. Leur nombre est $\\displaystyle\\sum_{k} (A^n)_{ik} \\times a_{kj}$, c'est-à-dire le coefficient $(i\\,;j)$ de $A^n \\times A = A^{n+1}$.",
      exemple: {
        enonce: "Avec la matrice du graphe orienté du cours, combien y a-t-il de chemins de longueur $2$ de A à C ?",
        solution: "$(A^2)_{13}$ = ligne de A $\\times$ colonne de C $= 0 \\times 0 + 1 \\times 1 + 0 \\times 0 + 1 \\times 1 = 2$ : les chemins A → B → C et A → D → C."
      }
    },
    {
      titre: "Pour aller plus loin : les ponts de Königsberg",
      texte:
        "En 1736, **Euler** étudie un casse-tête de la ville de Königsberg : peut-on faire une promenade qui emprunte **une seule fois** chacun des $7$ ponts de la ville ?\n\n" +
        "Il modélise les rives et les îles par des sommets, les ponts par des arêtes, et démontre : un graphe connexe possède une chaîne passant une fois et une seule par chaque arête si et seulement si il a $0$ ou $2$ sommets de degré impair.\n\n" +
        "À Königsberg, les quatre sommets ont des degrés impairs ($3$, $3$, $3$ et $5$) : la promenade est impossible. C'est le premier théorème de la théorie des graphes."
    }
  ],

  videos: [
    { type: "Bac", titre: "Exercice du bac : graphes et matrices", youtube: "https://youtu.be/muYpLFo2oMk" }
  ],
  videosNote: "Exercice corrigé en vidéo par Yvan Monka.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "xr-degre", titre: "Degrés et arêtes", etape: "Vocabulaire", nb: 5 },
    { type: "xr-poignees", titre: "Somme des degrés, graphe complet", etape: "Vocabulaire", nb: 5 },
    { type: "xr-chaine", titre: "Plus courte chaîne", etape: "Vocabulaire", nb: 4 },
    { type: "xr-matrice", titre: "Matrice d'adjacence", etape: "Matrice d'adjacence", nb: 4 },
    { type: "xr-chemins", titre: "Compter les chemins", etape: "Matrice d'adjacence", nb: 5 },
    { type: "xr-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "L'ordre d'un graphe est :", choix: ["son nombre de sommets", "son nombre d'arêtes", "le plus grand degré", "la somme des degrés"], bonne: 0, explication: "C'est la définition de l'ordre." },
    { question: "Le degré d'un sommet est :", choix: ["le nombre d'arêtes qui en partent", "le nombre de sommets du graphe", "la longueur de la plus longue chaîne", "toujours pair"], bonne: 0, explication: "On compte les arêtes issues de ce sommet." },
    { question: "Un graphe a des sommets de degrés $1$, $2$, $2$, $3$, $4$. Combien a-t-il d'arêtes ?", choix: ["$6$", "$12$", "$5$", "$4$"], bonne: 0, explication: "Somme des degrés $= 12 = 2 \\times 6$." },
    { question: "Combien d'arêtes a le graphe complet à $6$ sommets ?", choix: ["$15$", "$30$", "$36$", "$6$"], bonne: 0, explication: "$\\dfrac{6 \\times 5}{2} = 15$." },
    { question: "Peut-il exister un graphe à $4$ sommets de degrés $1$, $2$, $2$, $2$ ?", choix: ["Non, la somme des degrés est impaire", "Oui", "Oui, avec $7$ arêtes", "Non, car il faut un sommet de degré $3$"], bonne: 0, explication: "$1 + 2 + 2 + 2 = 7$ est impair, alors que c'est le double du nombre d'arêtes." },
    { question: "La longueur de la chaîne A – B – C – D est :", choix: ["$3$", "$4$", "$2$", "$1$"], bonne: 0, explication: "Elle comporte $3$ arêtes : A–B, B–C, C–D." },
    { question: "Un graphe est connexe quand :", choix: ["deux sommets quelconques sont reliés par une chaîne", "tous les sommets sont adjacents", "tous les degrés sont pairs", "il n'a pas de cycle"], bonne: 0, explication: "C'est la définition. « Tous adjacents » correspond au graphe complet, plus exigeant." },
    { question: "La matrice d'adjacence d'un graphe non orienté est toujours :", choix: ["symétrique", "diagonale", "inversible", "remplie de $1$"], bonne: 0, explication: "Si $i$ est relié à $j$, alors $j$ est relié à $i$ : $a_{ij} = a_{ji}$." },
    { question: "Dans la matrice d'adjacence d'un graphe non orienté sans boucle, la somme de la ligne $i$ est :", choix: ["le degré du sommet $i$", "l'ordre du graphe", "le nombre d'arêtes", "toujours $1$"], bonne: 0, explication: "Chaque $1$ de la ligne correspond à une arête issue du sommet $i$." },
    { question: "Le nombre de chemins de longueur $3$ du sommet $2$ au sommet $4$ se lit dans :", choix: ["le coefficient $(2\\,;4)$ de $A^3$", "le coefficient $(4\\,;2)$ de $A^3$", "le coefficient $(2\\,;4)$ de $3A$", "le coefficient $(3\\,;4)$ de $A^2$"], bonne: 0, explication: "Le coefficient $(i\\,;j)$ de $A^n$ compte les chemins de longueur $n$ de $i$ vers $j$." },
    { question: "Avec $A = \\begin{pmatrix} 0 & 1 & 1 \\\\ 1 & 0 & 1 \\\\ 1 & 1 & 0 \\end{pmatrix}$, combien de chaînes de longueur $2$ vont du sommet $1$ au sommet $1$ ?", choix: ["$2$", "$0$", "$1$", "$3$"], bonne: 0, explication: "$(A^2)_{11} = 0 \\times 0 + 1 \\times 1 + 1 \\times 1 = 2$ : 1 → 2 → 1 et 1 → 3 → 1." },
    { question: "Dans un graphe orienté, le coefficient $a_{ij}$ de la matrice d'adjacence vaut $1$ quand :", choix: ["il y a un arc de $i$ vers $j$", "il y a un arc de $j$ vers $i$", "$i$ et $j$ ont le même degré", "$i = j$"], bonne: 0, explication: "Ligne = départ, colonne = arrivée." },
    { question: "Dans un graphe, le nombre de sommets de degré impair est toujours :", choix: ["pair", "impair", "nul", "égal à l'ordre"], bonne: 0, explication: "La somme des degrés est paire ; les sommets de degré pair y contribuent un nombre pair, donc ceux de degré impair sont en nombre pair." },
    { question: "$10$ personnes se serrent toutes la main une fois. Combien de poignées de main ?", choix: ["$45$", "$90$", "$100$", "$10$"], bonne: 0, explication: "C'est le nombre d'arêtes de $K_{10}$ : $\\dfrac{10 \\times 9}{2} = 45$." },
    { question: "Pour la matrice d'adjacence $A$ d'un graphe, $(A^2)_{ij}$ s'obtient en calculant :", choix: ["la ligne $i$ de $A$ multipliée par la colonne $j$ de $A$", "$a_{ij}^2$", "$2a_{ij}$", "$a_{ii} \\times a_{jj}$"], bonne: 0, explication: "C'est le produit matriciel $A \\times A$, « ligne par colonne »." },
    { question: "Un graphe d'ordre $5$ a au plus combien d'arêtes (sans boucle ni arête double) ?", choix: ["$10$", "$5$", "$20$", "$25$"], bonne: 0, explication: "Au maximum, c'est le graphe complet $K_5$ : $\\dfrac{5 \\times 4}{2} = 10$ arêtes." },
    { question: "La distance entre deux sommets est :", choix: ["la longueur d'une plus courte chaîne qui les relie", "la longueur de la plus longue chaîne", "la différence de leurs degrés", "le nombre de chaînes qui les relient"], bonne: 0, explication: "C'est la définition de la distance dans un graphe connexe." },
    { question: "Dans un graphe non orienté, si $(A^2)_{11} = 3$, alors le sommet $1$ :", choix: ["est de degré $3$", "a une boucle", "est isolé", "est relié à lui-même par $3$ arêtes"], bonne: 0, explication: "$(A^2)_{11}$ compte les allers-retours $1 \\to k \\to 1$ : un par voisin. Le sommet $1$ a donc $3$ voisins." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Modéliser une situation par un graphe",
      figure: "xr-cours-graphe",
      etapes: [
        "Choisir ce que représentent les sommets (villes, personnes, équipes…).",
        "Choisir ce que représentent les arêtes (routes, poignées de main, matchs…), et s'il faut un sens (graphe orienté).",
        "Dessiner le graphe, puis traduire la question : degré, chaîne, connexité, nombre d'arêtes…"
      ],
      exemple: "Des routes entre villages : sommets = villages, arêtes = routes. « Peut-on aller de partout à partout ? » devient « le graphe est-il connexe ? »."
    },
    {
      titre: "Utiliser la somme des degrés",
      figure: "xr-cours-complet",
      etapes: [
        "Calculer la somme des degrés de tous les sommets.",
        "Nombre d'arêtes $= \\dfrac{\\text{somme des degrés}}{2}$.",
        "Si la somme est impaire, le graphe n'existe pas.",
        "Pour un graphe complet d'ordre $n$ : $\\dfrac{n(n - 1)}{2}$ arêtes."
      ],
      exemple: "$7$ sommets de degré $3$ : somme $21$, impaire : impossible."
    },
    {
      titre: "Écrire la matrice d'adjacence et compter les chemins",
      figure: "xr-cours-oriente",
      etapes: [
        "Numéroter les sommets dans un ordre fixé.",
        "Pour chaque ligne $i$ (départ) et colonne $j$ (arrivée), écrire le nombre d'arcs de $i$ vers $j$.",
        "Calculer $A^n$ (à la main pour $n = 2$, à la calculatrice ensuite).",
        "Lire le coefficient $(i\\,;j)$ : nombre de chemins de longueur $n$ de $i$ à $j$."
      ],
      exemple: "Graphe orienté du cours : $(A^2)_{13} = 2$, chemins A → B → C et A → D → C."
    }
  ],
  erreurs: [
    "Confondre l'ordre (nombre de sommets) et le nombre d'arêtes.",
    "Compter les sommets au lieu des arêtes pour la longueur d'une chaîne.",
    "Oublier de diviser par $2$ : la somme des degrés est le **double** du nombre d'arêtes.",
    "Écrire $n^2$ ou $n(n - 1)$ arêtes pour le graphe complet : c'est $\\dfrac{n(n - 1)}{2}$.",
    "Inverser ligne et colonne dans la matrice d'un graphe orienté (ligne = départ).",
    "Lire $A$ au lieu de $A^n$ pour les chemins de longueur $n$, ou mettre chaque coefficient au carré pour obtenir $A^2$."
  ]
};
