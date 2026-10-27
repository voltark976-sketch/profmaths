/*
  CHAPITRE : Terminale maths expertes — Suites de matrices et chaînes de Markov
  -----------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme officiel de maths expertes (BO spécial n° 8 du 25 juillet 2019), « Graphes et matrices » :
  suites de matrices colonnes U(n+1) = A U(n) + C ; chaînes de Markov à deux ou trois états, distribution initiale,
  matrice de transition, graphe pondéré, coefficient (i ; j) de P^n, distribution pi0 P^n, distributions invariantes.
  Démonstrations du programme : probabilité de passer de i à j en n transitions, distribution après n transitions.
  Ehrenfest, marche aléatoire, PageRank, proie-prédateur : « problèmes possibles ».
  video : vidéos d'Yvan Monka. Générateurs : préfixe xk- dans assets/exercices-expertes.js ; figures "xk-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["expertes-suites-matrices-markov"] = {
  niveau: "Terminale maths expertes",
  numero: 11,
  titre: "Suites de matrices et chaînes de Markov",
  accroche: "Faire évoluer plusieurs quantités à la fois, puis suivre au hasard un système qui change d'état : météo, transports, populations.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : matrices, partie 2 (suites de matrices) (PDF)", url: "https://www.maths-et-tiques.fr/telech/20mat2.pdf" },
    { titre: "Cours d'Yvan Monka : graphes, partie 2 (chaînes de Markov) (PDF)", url: "https://www.maths-et-tiques.fr/telech/20graphe2.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Suites de matrices colonnes",
      video: { titre: "Vidéo d'Yvan Monka : calculer les termes d'une suite à l'aide de matrices", youtube: "https://youtu.be/62U34Kl4o1I" },
      texte:
        "Deux suites $(u_n)$ et $(v_n)$ définies ensemble, par exemple $\\begin{cases} u_{n+1} = 0{,}8u_n + 0{,}1v_n \\\\ v_{n+1} = 0{,}2u_n + 0{,}9v_n \\end{cases}$, s'écrivent avec une seule matrice :\n\n" +
        "$U_{n+1} = AU_n$ avec $U_n = \\begin{pmatrix} u_n \\\\ v_n \\end{pmatrix}$ et $A = \\begin{pmatrix} 0{,}8 & 0{,}1 \\\\ 0{,}2 & 0{,}9 \\end{pmatrix}$.\n\n" +
        "**Propriété.** Si $U_{n+1} = AU_n$ pour tout $n$, alors $U_n = A^nU_0$.\n\n" +
        "C'est l'analogue matriciel des suites géométriques ; on le démontre par récurrence : $U_{n+1} = AU_n = A \\times A^nU_0 = A^{n+1}U_0$.",
      exemple: {
        enonce: "Deux villages échangent chaque année des habitants : $u_{n+1} = 0{,}8u_n + 0{,}1v_n$ et $v_{n+1} = 0{,}2u_n + 0{,}9v_n$, avec $u_0 = 1\\,000$ et $v_0 = 2\\,000$. Calcule $U_1$.",
        solution: "$U_1 = \\begin{pmatrix} 0{,}8 & 0{,}1 \\\\ 0{,}2 & 0{,}9 \\end{pmatrix}\\begin{pmatrix} 1\\,000 \\\\ 2\\,000 \\end{pmatrix} = \\begin{pmatrix} 800 + 200 \\\\ 200 + 1\\,800 \\end{pmatrix} = \\begin{pmatrix} 1\\,000 \\\\ 2\\,000 \\end{pmatrix}$.\n\nLa population ne change pas : c'est un état stable."
      }
    },
    {
      titre: "Suites $U_{n+1} = AU_n + C$",
      video: { titre: "Vidéo d'Yvan Monka : déterminer une suite constante de matrices", youtube: "https://youtu.be/C-2-1yf-O4A" },
      texte:
        "Pour étudier $U_{n+1} = AU_n + C$, on cherche d'abord une **suite constante** $L$ telle que $L = AL + C$, c'est-à-dire $(I - A)L = C$. Si $I - A$ est inversible : $L = (I - A)^{-1}C$.\n\n" +
        "On pose ensuite $V_n = U_n - L$. Alors $V_{n+1} = AU_n + C - (AL + C) = A(U_n - L) = AV_n$, donc $V_n = A^nV_0$ et :\n\n" +
        "$U_n = A^n(U_0 - L) + L$\n\n" +
        "Si les coefficients de $A^n$ tendent vers $0$, la suite $(U_n)$ **converge** vers $L$.",
      exemple: {
        enonce: "Trouve la suite constante pour $U_{n+1} = \\begin{pmatrix} 0{,}5 & 0 \\\\ 0 & 0{,}2 \\end{pmatrix}U_n + \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$.",
        solution: "$(I - A)L = C$ : $\\begin{cases} 0{,}5x = 3 \\\\ 0{,}8y = 4 \\end{cases}$, donc $L = \\begin{pmatrix} 6 \\\\ 5 \\end{pmatrix}$."
      }
    },
    {
      titre: "Chaînes de Markov et graphes probabilistes",
      figure: "xk-cours-markov2",
      video: { titre: "Vidéo d'Yvan Monka : déterminer une matrice de transition", youtube: "https://youtu.be/KRi0C_zOsHs" },
      texte:
        "Un système passe au hasard, à chaque étape, d'un **état** à un autre (deux ou trois états), et la probabilité de passer de l'état $i$ à l'état $j$ ne dépend que de $i$ et $j$ : c'est une **chaîne de Markov**.\n\n" +
        "- On la représente par un **graphe probabiliste** : un graphe orienté pondéré, où la flèche de $i$ vers $j$ porte la probabilité $p_{ij}$ de passer de $i$ à $j$. La somme des probabilités des flèches qui **partent** d'un sommet vaut $1$.\n" +
        "- La **matrice de transition** $P$ a pour coefficients les $p_{ij}$ : ligne = état de départ, colonne = état d'arrivée. Chaque **ligne** a pour somme $1$.\n\n" +
        "Exemple : à Mamoudzou, un jour ensoleillé (S) est suivi d'un jour ensoleillé avec la probabilité $0{,}7$ ; un jour de pluie (R) est suivi d'un jour de pluie avec la probabilité $0{,}6$. Alors $P = \\begin{pmatrix} 0{,}7 & 0{,}3 \\\\ 0{,}4 & 0{,}6 \\end{pmatrix}$."
    },
    {
      titre: "Distribution après n transitions",
      figure: "xk-cours-markov3",
      video: { titre: "Vidéo d'Yvan Monka : calculer une probabilité à l'aide d'un graphe probabiliste", youtube: "https://youtu.be/gxrgpotHfnE" },
      texte:
        "La **distribution** à l'étape $n$ est la matrice **ligne** $\\pi_n$ des probabilités d'être dans chaque état. $\\pi_0$ est la distribution initiale.\n\n" +
        "**Propriété.** $\\pi_{n+1} = \\pi_nP$, donc $\\pi_n = \\pi_0P^n$.\n\n" +
        "**Démonstration (deux états).** Par la formule des probabilités totales, la probabilité d'être dans l'état $1$ à l'étape $n + 1$ est $\\pi_n(1)p_{11} + \\pi_n(2)p_{21}$ : c'est la première composante de $\\pi_nP$. De même pour l'état $2$. Puis récurrence.\n\n" +
        "**Propriété.** Le coefficient $(i\\,;j)$ de $P^n$ est la probabilité de passer de l'état $i$ à l'état $j$ en $n$ transitions (même raisonnement qu'avec les chemins d'un graphe).",
      exemple: {
        enonce: "Avec $P = \\begin{pmatrix} 0{,}7 & 0{,}3 \\\\ 0{,}4 & 0{,}6 \\end{pmatrix}$ et un premier jour ensoleillé, $\\pi_0 = \\begin{pmatrix} 1 & 0 \\end{pmatrix}$. Calcule $\\pi_2$.",
        solution: "$\\pi_1 = \\pi_0P = \\begin{pmatrix} 0{,}7 & 0{,}3 \\end{pmatrix}$, puis $\\pi_2 = \\pi_1P = \\begin{pmatrix} 0{,}49 + 0{,}12 & 0{,}21 + 0{,}18 \\end{pmatrix} = \\begin{pmatrix} 0{,}61 & 0{,}39 \\end{pmatrix}$.\n\nDeux jours plus tard, il fait beau avec la probabilité $0{,}61$."
      }
    },
    {
      titre: "Distribution invariante",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un état stable", youtube: "https://youtu.be/PS756B-M0Dw" },
      texte:
        "Une distribution $\\pi$ est **invariante** (ou stable) si $\\pi P = \\pi$ : si le système suit cette distribution, il la garde à l'étape suivante.\n\n" +
        "**Méthode** : on écrit $\\pi = \\begin{pmatrix} x & y \\end{pmatrix}$, on traduit $\\pi P = \\pi$ en équations, et on ajoute $x + y = 1$.\n\n" +
        "Pour $P = \\begin{pmatrix} 1 - a & a \\\\ b & 1 - b \\end{pmatrix}$ avec $0 < a < 1$ et $0 < b < 1$, on trouve $\\pi = \\begin{pmatrix} \\dfrac{b}{a + b} & \\dfrac{a}{a + b} \\end{pmatrix}$, et la suite $(\\pi_n)$ **converge** vers $\\pi$ quelle que soit la distribution initiale : à long terme, le système « oublie » son point de départ.",
      exemple: {
        enonce: "Détermine la distribution invariante pour $P = \\begin{pmatrix} 0{,}7 & 0{,}3 \\\\ 0{,}4 & 0{,}6 \\end{pmatrix}$.",
        solution: "$\\pi P = \\pi$ donne $0{,}7x + 0{,}4y = x$, soit $0{,}3x = 0{,}4y$. Avec $x + y = 1$ : $0{,}3x = 0{,}4 - 0{,}4x$, donc $x = \\dfrac{4}{7}$ et $y = \\dfrac{3}{7}$.\n\nÀ long terme, il fait beau environ $57\\,\\%$ des jours."
      }
    },
    {
      titre: "Pour aller plus loin : Ehrenfest et PageRank",
      texte:
        "**Modèle d'Ehrenfest** (1907) : $N$ molécules sont réparties entre deux récipients ; à chaque étape, une molécule choisie au hasard change de récipient. Le nombre de molécules dans le premier récipient est une chaîne de Markov, qui modélise la diffusion d'un gaz.\n\n" +
        "**PageRank** : l'algorithme de classement des pages web imagine un internaute qui clique au hasard sur les liens. La page la mieux classée est celle où il passe le plus de temps à long terme : c'est la distribution invariante d'une immense chaîne de Markov.\n\n" +
        "**Modèle proie-prédateur discrétisé** : deux populations (par exemple des poissons du lagon et leurs prédateurs) évoluent ensemble selon $U_{n+1} = AU_n$."
    }
  ],

  videos: [
    { type: "Méthode", titre: "Déterminer si une suite de matrices est convergente", youtube: "https://youtu.be/dbP7R-9Q2_s" },
    { type: "Bac", titre: "Exercice du bac : graphes probabilistes et matrices", youtube: "https://youtu.be/qFmUnJDwytY" }
  ],
  videosNote: "Méthode et exercice corrigé en vidéo par Yvan Monka.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "xk-suite", titre: "Calculer des termes", etape: "Suites de matrices", nb: 4 },
    { type: "xk-limite", titre: "Suite constante", etape: "Suites de matrices", nb: 4 },
    { type: "xk-transition", titre: "Matrice de transition", etape: "Chaînes de Markov", nb: 5 },
    { type: "xk-graphe", titre: "Graphe probabiliste", etape: "Chaînes de Markov", nb: 4 },
    { type: "xk-distribution", titre: "Distribution après n étapes", etape: "Chaînes de Markov", nb: 5 },
    { type: "xk-pn", titre: "Deux transitions", etape: "Chaînes de Markov", nb: 5 },
    { type: "xk-invariante", titre: "Distribution invariante", etape: "Défi", nb: 4 },
    { type: "xk-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Si $U_{n+1} = AU_n$ pour tout entier $n$, alors :", choix: ["$U_n = A^nU_0$", "$U_n = nAU_0$", "$U_n = U_0A^n$", "$U_n = A + U_0$"], bonne: 0, explication: "Par récurrence, comme pour une suite géométrique : $U_n = A^nU_0$ (la matrice reste à gauche)." },
    { question: "Le système $u_{n+1} = 2u_n - v_n$, $v_{n+1} = u_n + 3v_n$ s'écrit $U_{n+1} = AU_n$ avec $A$ égale à :", choix: ["$\\begin{pmatrix} 2 & -1 \\\\ 1 & 3 \\end{pmatrix}$", "$\\begin{pmatrix} 2 & 1 \\\\ -1 & 3 \\end{pmatrix}$", "$\\begin{pmatrix} 2 & -1 \\\\ 3 & 1 \\end{pmatrix}$", "$\\begin{pmatrix} 3 & 1 \\\\ -1 & 2 \\end{pmatrix}$"], bonne: 0, explication: "Chaque ligne de $A$ contient les coefficients de $u_n$ et $v_n$ dans une équation." },
    { question: "La suite constante $L$ telle que $L = AL + C$ vérifie :", choix: ["$(I - A)L = C$", "$AL = C$", "$L = A^{-1}C$", "$(A - I)L = C$"], bonne: 0, explication: "$L - AL = C$, soit $(I - A)L = C$." },
    { question: "Dans une matrice de transition, la somme des coefficients :", choix: ["de chaque ligne vaut $1$", "de chaque colonne vaut $1$", "de la diagonale vaut $1$", "de toute la matrice vaut $1$"], bonne: 0, explication: "Depuis un état (ligne), on va forcément dans l'un des états : les probabilités d'une ligne ont pour somme $1$." },
    { question: "Dans un graphe probabiliste, la flèche de A vers B porte $0{,}35$ et il n'y a que deux flèches qui partent de A. La boucle sur A porte :", choix: ["$0{,}65$", "$0{,}35$", "$1$", "$0{,}7$"], bonne: 0, explication: "Les flèches qui partent de A ont pour somme $1$ : $1 - 0{,}35 = 0{,}65$." },
    { question: "Si $\\pi_0$ est la distribution initiale et $P$ la matrice de transition, alors $\\pi_1$ est égale à :", choix: ["$\\pi_0P$", "$P\\pi_0$", "$\\pi_0 + P$", "$P^{-1}\\pi_0$"], bonne: 0, explication: "$\\pi_0$ est une matrice ligne, qu'on multiplie à droite par $P$." },
    { question: "Avec $P = \\begin{pmatrix} 0{,}9 & 0{,}1 \\\\ 0{,}5 & 0{,}5 \\end{pmatrix}$ et $\\pi_0 = \\begin{pmatrix} 1 & 0 \\end{pmatrix}$, que vaut $\\pi_1$ ?", choix: ["$\\begin{pmatrix} 0{,}9 & 0{,}1 \\end{pmatrix}$", "$\\begin{pmatrix} 0{,}5 & 0{,}5 \\end{pmatrix}$", "$\\begin{pmatrix} 0{,}9 & 0{,}5 \\end{pmatrix}$", "$\\begin{pmatrix} 1 & 0 \\end{pmatrix}$"], bonne: 0, explication: "On part sûrement de l'état $1$ : $\\pi_1$ est la première ligne de $P$." },
    { question: "Avec $P = \\begin{pmatrix} 0{,}9 & 0{,}1 \\\\ 0{,}5 & 0{,}5 \\end{pmatrix}$ et $\\pi_0 = \\begin{pmatrix} 0{,}5 & 0{,}5 \\end{pmatrix}$, que vaut $\\pi_1$ ?", choix: ["$\\begin{pmatrix} 0{,}7 & 0{,}3 \\end{pmatrix}$", "$\\begin{pmatrix} 0{,}5 & 0{,}5 \\end{pmatrix}$", "$\\begin{pmatrix} 0{,}45 & 0{,}05 \\end{pmatrix}$", "$\\begin{pmatrix} 0{,}3 & 0{,}7 \\end{pmatrix}$"], bonne: 0, explication: "$0{,}5 \\times 0{,}9 + 0{,}5 \\times 0{,}5 = 0{,}7$ et $0{,}5 \\times 0{,}1 + 0{,}5 \\times 0{,}5 = 0{,}3$." },
    { question: "La probabilité de passer de l'état $1$ à l'état $2$ en $3$ transitions est :", choix: ["le coefficient $(1\\,;2)$ de $P^3$", "$p_{12}^3$", "$3p_{12}$", "le coefficient $(2\\,;1)$ de $P^3$"], bonne: 0, explication: "Le coefficient $(i\\,;j)$ de $P^n$ donne la probabilité de passer de $i$ à $j$ en $n$ transitions." },
    { question: "Avec $P = \\begin{pmatrix} 0{,}5 & 0{,}5 \\\\ 0{,}2 & 0{,}8 \\end{pmatrix}$, la probabilité de passer de l'état $1$ à l'état $1$ en deux transitions vaut :", choix: ["$0{,}35$", "$0{,}25$", "$0{,}5$", "$0{,}7$"], bonne: 0, explication: "$(P^2)_{11} = 0{,}5 \\times 0{,}5 + 0{,}5 \\times 0{,}2 = 0{,}35$ (on reste, ou on va en $2$ puis on revient)." },
    { question: "Une distribution invariante $\\pi$ vérifie :", choix: ["$\\pi P = \\pi$", "$P\\pi = 0$", "$\\pi P = P$", "$\\pi = \\pi_0$"], bonne: 0, explication: "C'est la définition : elle ne change pas après une transition." },
    { question: "La distribution invariante de $P = \\begin{pmatrix} 0{,}8 & 0{,}2 \\\\ 0{,}2 & 0{,}8 \\end{pmatrix}$ est :", choix: ["$\\begin{pmatrix} 0{,}5 & 0{,}5 \\end{pmatrix}$", "$\\begin{pmatrix} 0{,}8 & 0{,}2 \\end{pmatrix}$", "$\\begin{pmatrix} 0{,}2 & 0{,}8 \\end{pmatrix}$", "$\\begin{pmatrix} 1 & 0 \\end{pmatrix}$"], bonne: 0, explication: "$0{,}8x + 0{,}2y = x$ donne $0{,}2y = 0{,}2x$, donc $x = y = 0{,}5$ : la situation est symétrique." },
    { question: "La distribution invariante de $P = \\begin{pmatrix} 0{,}6 & 0{,}4 \\\\ 0{,}1 & 0{,}9 \\end{pmatrix}$ est :", choix: ["$\\begin{pmatrix} 0{,}2 & 0{,}8 \\end{pmatrix}$", "$\\begin{pmatrix} 0{,}8 & 0{,}2 \\end{pmatrix}$", "$\\begin{pmatrix} 0{,}4 & 0{,}6 \\end{pmatrix}$", "$\\begin{pmatrix} 0{,}5 & 0{,}5 \\end{pmatrix}$"], bonne: 0, explication: "$0{,}4x = 0{,}1y$ et $x + y = 1$ : $x = \\dfrac{0{,}1}{0{,}5} = 0{,}2$ et $y = 0{,}8$." },
    { question: "Dans une chaîne de Markov à deux états avec $0 < a < 1$ et $0 < b < 1$, la suite $(\\pi_n)$ :", choix: ["converge vers la distribution invariante", "diverge toujours", "reste égale à $\\pi_0$", "dépend à long terme de $\\pi_0$"], bonne: 0, explication: "C'est la propriété de convergence admise : le système oublie son point de départ." },
    { question: "La matrice $\\begin{pmatrix} 0{,}3 & 0{,}6 \\\\ 0{,}5 & 0{,}5 \\end{pmatrix}$ peut-elle être une matrice de transition ?", choix: ["Non, la première ligne a pour somme $0{,}9$", "Oui", "Non, car elle n'est pas symétrique", "Non, car $0{,}5 + 0{,}5 = 1$"], bonne: 0, explication: "Chaque ligne d'une matrice de transition doit avoir pour somme $1$." },
    { question: "Si $V_n = U_n - L$ avec $L = AL + C$ et $U_{n+1} = AU_n + C$, alors :", choix: ["$V_{n+1} = AV_n$", "$V_{n+1} = AV_n + C$", "$V_{n+1} = V_n + L$", "$V_{n+1} = A + V_n$"], bonne: 0, explication: "$V_{n+1} = AU_n + C - AL - C = A(U_n - L) = AV_n$." },
    { question: "Avec $U_0 = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$ et $A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 2 \\end{pmatrix}$, que vaut $U_1 = AU_0$ ?", choix: ["$\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$", "$\\begin{pmatrix} 1 \\\\ 4 \\end{pmatrix}$", "$\\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}$", "$\\begin{pmatrix} 2 \\\\ 4 \\end{pmatrix}$"], bonne: 0, explication: "$1 \\times 1 + 1 \\times 2 = 3$ et $0 \\times 1 + 2 \\times 2 = 4$." },
    { question: "Un graphe probabiliste à trois états a une flèche de A vers B qui porte $0{,}2$, une boucle sur A qui porte $0{,}5$. La flèche de A vers C porte :", choix: ["$0{,}3$", "$0{,}7$", "$0{,}5$", "$0{,}2$"], bonne: 0, explication: "$1 - 0{,}2 - 0{,}5 = 0{,}3$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Traduire une situation en chaîne de Markov",
      figure: "xk-cours-markov2",
      etapes: [
        "Identifier les états (deux ou trois) et les nommer.",
        "Dessiner le graphe probabiliste : une flèche par passage possible, avec sa probabilité ; vérifier que les flèches qui partent de chaque sommet ont pour somme $1$.",
        "Écrire la matrice de transition $P$ : ligne = départ, colonne = arrivée.",
        "Écrire la distribution initiale $\\pi_0$ en ligne."
      ],
      exemple: "Bus (B) ou pied (P) : si bus, encore bus avec $0{,}6$ ; si pied, bus avec $0{,}3$. $P = \\begin{pmatrix} 0{,}6 & 0{,}4 \\\\ 0{,}3 & 0{,}7 \\end{pmatrix}$."
    },
    {
      titre: "Calculer une distribution ou une probabilité",
      figure: "xk-cours-markov3",
      etapes: [
        "Pour la distribution à l'étape $n$ : $\\pi_n = \\pi_0P^n$ (pas à pas, $\\pi_{n+1} = \\pi_nP$).",
        "Pour passer de $i$ à $j$ en $n$ étapes : lire le coefficient $(i\\,;j)$ de $P^n$.",
        "Faire le calcul « ligne par colonne », ou à la calculatrice pour les grandes puissances."
      ],
      exemple: "$\\pi_0 = \\begin{pmatrix} 0{,}5 & 0{,}5 \\end{pmatrix}$ et $P$ ci-dessus : $\\pi_1 = \\begin{pmatrix} 0{,}45 & 0{,}55 \\end{pmatrix}$."
    },
    {
      titre: "Déterminer la distribution invariante",
      etapes: [
        "Écrire $\\pi = \\begin{pmatrix} x & y \\end{pmatrix}$ (ou $x$, $y$, $z$ pour trois états).",
        "Traduire $\\pi P = \\pi$ en équations.",
        "Ajouter $x + y = 1$ (ou $x + y + z = 1$) et résoudre.",
        "Interpréter : proportion du temps passé dans chaque état à long terme."
      ],
      exemple: "$P = \\begin{pmatrix} 0{,}6 & 0{,}4 \\\\ 0{,}3 & 0{,}7 \\end{pmatrix}$ : $0{,}4x = 0{,}3y$, d'où $x = \\dfrac{3}{7}$ et $y = \\dfrac{4}{7}$."
    },
    {
      titre: "Étudier $U_{n+1} = AU_n + C$",
      etapes: [
        "Chercher $L$ avec $(I - A)L = C$.",
        "Poser $V_n = U_n - L$ : alors $V_{n+1} = AV_n$ et $V_n = A^nV_0$.",
        "Conclure : $U_n = A^n(U_0 - L) + L$ ; si $A^n$ tend vers $0$, $U_n$ tend vers $L$."
      ],
      exemple: "$A = \\begin{pmatrix} 0{,}5 & 0 \\\\ 0 & 0{,}5 \\end{pmatrix}$, $C = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$ : $L = \\begin{pmatrix} 2 \\\\ 4 \\end{pmatrix}$ et $U_n \\to L$."
    }
  ],
  erreurs: [
    "Mettre les probabilités de départ en colonne : dans $P$, chaque **ligne** correspond à un état de départ.",
    "Calculer $P\\pi_0$ au lieu de $\\pi_0P$ : la distribution est une matrice ligne.",
    "Élever un coefficient de $P$ à la puissance $n$ au lieu de calculer $P^n$.",
    "Oublier la condition $x + y = 1$ pour la distribution invariante.",
    "Écrire $U_n = A^nU_0 + nC$ pour $U_{n+1} = AU_n + C$ : il faut passer par la suite constante $L$.",
    "Oublier une flèche (la boucle) dans le graphe probabiliste : les flèches qui partent d'un sommet ont pour somme $1$."
  ]
};
