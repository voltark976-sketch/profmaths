/*
  CHAPITRE : Première spécialité — Suites numériques : généralités
  -----------------------------------------------------------------
  Chapitre 1 de la progression spiralée 2026-2027 (programme de Première 2026).
  L'identifiant « premiere-suites » est gardé pour conserver la progression des élèves.
  Suites arithmétiques : chapitre 3 ; suites géométriques, sommes et seuils : chapitre 6.
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce). Dans les formules, la virgule décimale s'écrit {,} : $0{,}35$.
  video : vidéo d'aide affichée sous une notion (cours de ta chaîne, sinon vidéo d'Yvan Monka).
  videos : exercices corrigés en vidéo (playlist de la chaîne), avec le numéro de l'exercice du dossier élève.
  Le corrigé détaillé du Drive est réservé au professeur : il n'est pas lié ici.
  Figures : "suite-nuage", "motif-galets", "motif-allumettes". Générateurs : suite- et su-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-suites"] = {
  niveau: "Première spécialité",
  numero: 1,
  titre: "Suites numériques : généralités",
  accroche: "Des galets, des allumettes, une population d'année en année : définir une suite, calculer ses termes, étudier ses variations et deviner sa limite.",

  playlist: "https://www.youtube.com/playlist?list=PLUTXHp2G5xZ4",
  drive: "https://drive.google.com/drive/folders/1Ymru1W2dLIhiEgpawEdchTrVvaK8Q3n6",
  pdfs: [
    {
      titre: "Dossier élève : cours, méthodes et exercices (chapitres 1, 3 et 6)",
      url: "https://drive.google.com/file/d/1ccZ0rwB10ZQr00MtVd9k_bBGR2KYtK44/view"
    }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Qu'est-ce qu'une suite ?",
      video: { titre: "Vidéo de ton prof : notion de suite, formule explicite et récurrence (cours 1/6)", youtube: "https://youtu.be/sVkYEQQWvDo" },
      texte:
        "Une **suite** $(u_n)$ associe à chaque entier naturel $n$ un nombre $u_n$, appelé **terme de rang $n$**. On note aussi $u(n)$ : une suite est une fonction définie sur $\\mathbb{N}$.\n\n" +
        "Plusieurs **modes de génération** :\n" +
        "- **Formule explicite** : $u_n = f(n)$, par exemple $u_n = 3n^2 - 1$. On calcule n'importe quel terme d'un coup.\n" +
        "- **Relation de récurrence** : on donne le premier terme et le moyen de passer d'un terme au suivant, $u_{n+1} = f(u_n)$, par exemple $u_0 = 5$ et $u_{n+1} = 2u_n - 3$. On calcule **de proche en proche**.\n" +
        "- Un **algorithme** ou un **motif géométrique** qui se répète.\n\n" +
        "Attention à ne pas confondre $u_{n+1}$ (le terme suivant) et $u_n + 1$ (le terme plus un).",
      exemple: {
        enonce: "On définit $u_0 = 5$ et $u_{n+1} = 2u_n - 3$. Calcule $u_1$, $u_2$ et $u_3$. Puis, avec $v_n = 3n^2 - 1$, calcule $v_{10}$.",
        solution: "$u_1 = 2 \\times 5 - 3 = 7$, $u_2 = 2 \\times 7 - 3 = 11$, $u_3 = 2 \\times 11 - 3 = 19$.\n\n$v_{10} = 3 \\times 100 - 1 = 299$ : avec une formule explicite, pas besoin des termes précédents."
      }
    },
    {
      titre: "Motifs et dénombrements",
      figure: "motif-galets",
      texte:
        "Pour un motif qui grandit d'étape en étape (galets, allumettes, carreaux), on note $u_n$ le nombre d'objets à l'étape $n$.\n\n" +
        "- On **compte** les premiers termes.\n" +
        "- On cherche ce qu'on **ajoute** d'une étape à la suivante : c'est une relation de récurrence.\n" +
        "- On cherche une **formule explicite**, puis on la vérifie sur les premiers termes.\n\n" +
        "Sur la figure, les galets en triangle : $u_1 = 1$, $u_2 = 3$, $u_3 = 6$. On ajoute une rangée de $n + 1$ galets : $u_{n+1} = u_n + (n + 1)$.",
      exemple: {
        enonce: "Combien de galets à l'étape $10$ du motif en triangle ?",
        solution: "$u_{10} = 1 + 2 + \\dots + 10 = 55$. On verra au chapitre 3 la formule $1 + 2 + \\dots + n = \\dfrac{n(n + 1)}{2}$."
      }
    },
    {
      titre: "Représentation et sens de variation",
      figure: "suite-nuage",
      video: { titre: "Vidéo de ton prof : sens de variation d'une suite, trois méthodes (cours 2/6)", youtube: "https://youtu.be/jpI-dQAsU24" },
      texte:
        "On représente une suite par le **nuage de points** de coordonnées $(n\\,;u_n)$ : on ne relie pas les points.\n\n" +
        "- $(u_n)$ est **croissante** si, pour tout $n$, $u_{n+1} \\geqslant u_n$ ; **décroissante** si, pour tout $n$, $u_{n+1} \\leqslant u_n$.\n" +
        "- Méthode : on étudie le **signe de $u_{n+1} - u_n$**.\n" +
        "- Si $u_n = f(n)$ et que $f$ est monotone sur $[0\\,;+\\infty[$, la suite a le même sens de variation que $f$.\n\n" +
        "« La suite est croissante » cache un « **pour tout** $n$ ». Sa **négation** : « il existe un rang $n$ tel que $u_{n+1} < u_n$ ». Un seul contre-exemple suffit pour montrer qu'une suite n'est pas croissante.",
      exemple: {
        enonce: "Étudie le sens de variation de $u_n = n^2 - 4n$ à partir du rang $2$.",
        solution: "$u_{n+1} - u_n = (n+1)^2 - 4(n+1) - n^2 + 4n = 2n - 3$. Pour $n \\geqslant 2$, $2n - 3 > 0$ : la suite est croissante à partir du rang $2$, comme on le voit sur le nuage."
      }
    },
    {
      titre: "Idée de limite",
      video: { titre: "Vidéo d'Yvan Monka : conjecturer la limite d'une suite", youtube: "https://youtu.be/0CC-EqOH92c" },
      texte:
        "On regarde ce que deviennent les termes quand $n$ devient très grand (tableau de valeurs, nuage de points) :\n" +
        "- ils se rapprochent d'un nombre $\\ell$ : la suite a une **limite finie** $\\ell$ ($u_n = 3 + \\dfrac{1}{n}$ se rapproche de $3$) ;\n" +
        "- ils dépassent n'importe quel nombre : la limite est **infinie** ($u_n = n^2$ tend vers $+\\infty$) ;\n" +
        "- ils ne se stabilisent pas : **pas de limite** ($u_n = (-1)^n$ vaut $1$, $-1$, $1$…).\n\n" +
        "En Première, on **conjecture** la limite sur des exemples ; on la démontrera en Terminale.",
      exemple: {
        enonce: "Conjecturer la limite de $u_n = 2 - \\dfrac{3}{n + 1}$.",
        solution: "$u_9 = 1{,}7$, $u_{99} = 1{,}97$, $u_{999} = 1{,}997$ : les termes se rapprochent de $2$. On conjecture que la limite est $2$."
      }
    },
    {
      titre: "Python : les listes",
      texte:
        "Une **liste** Python range plusieurs valeurs : $\\texttt{L[0]}$ est la première, $\\texttt{L[-1]}$ la dernière, $\\texttt{len(L)}$ le nombre d'éléments.\n\n" +
        "Trois façons de construire la liste des premiers termes :\n\n" +
        "```python\nL = [1, 3, 6, 10]                     # en extension\nL = []\nfor n in range(5):\n    L.append(n * n)                   # par ajouts successifs\nL = [3 * n + 1 for n in range(5)]     # en compréhension\n```\n\n" +
        "Suite de **Fibonacci** : chaque terme est la somme des deux précédents.\n\n" +
        "```python\nF = [1, 1]\nfor i in range(8):\n    F.append(F[-1] + F[-2])\n```",
      exemple: {
        enonce: "Que contient la liste $\\texttt{F}$ à la fin du programme de Fibonacci ?",
        solution: "La boucle ajoute $8$ termes aux deux premiers : $\\texttt{[1, 1, 2, 3, 5,}$ $\\texttt{8, 13, 21, 34, 55]}$."
      }
    }
  ],

  videosNote: "Énoncés dans le dossier élève ci-dessus (numéros des exercices du dossier).",
  videos: [
    { titre: "Exercice 1 · Calculer des termes avec une formule explicite", type: "Notion de suite", youtube: "https://youtu.be/fDxBIGzwXzc" },
    { titre: "Exercice 4 · Un motif d'allumettes : récurrence et formule", type: "Motif", youtube: "https://youtu.be/8xREkcpiSrg" },
    { titre: "Exercice 6 · Représenter, conjecturer, puis démontrer", type: "Sens de variation", youtube: "https://youtu.be/sY5T06fwq1E" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "suite-explicite", titre: "Calculer un terme (formule explicite)", etape: "Définir une suite", nb: 5 },
    { type: "suite-recurrence", titre: "Calculer un terme (récurrence)", etape: "Définir une suite", nb: 5 },
    { type: "su-traduire", titre: "De la phrase à la relation de récurrence", etape: "Définir une suite", nb: 4 },
    { type: "su-motif", titre: "Motifs de galets et d'allumettes", etape: "Définir une suite", nb: 4 },
    { type: "su-variation", titre: "Sens de variation", etape: "Variations et limite", nb: 5 },
    { type: "su-limite", titre: "Conjecturer une limite", etape: "Variations et limite", nb: 4 },
    { type: "su-liste", titre: "Python : listes, Fibonacci, Syracuse", etape: "Python", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    {
      question: "$u_n = n^2 - 3n$. Combien vaut $u_4$ ?",
      choix: ["$4$", "$-4$", "$28$", "$13$"],
      bonne: 0,
      explication: "$u_4 = 4^2 - 3 \\times 4 = 16 - 12 = 4$."
    },
    {
      question: "$u_0 = 2$ et $u_{n+1} = 3u_n - 1$. Combien vaut $u_2$ ?",
      choix: ["$5$", "$14$", "$17$", "$8$"],
      bonne: 1,
      explication: "$u_1 = 3 \\times 2 - 1 = 5$, puis $u_2 = 3 \\times 5 - 1 = 14$."
    },
    {
      question: "Pour une suite $(u_n)$, que désigne $u_{n+1}$ ?",
      choix: ["Le terme $u_n$ augmenté de $1$", "Le terme qui suit $u_n$", "Le rang du terme suivant", "Le produit de $u_n$ par $n + 1$"],
      bonne: 1,
      explication: "$u_{n+1}$ est le terme de rang $n + 1$, c'est-à-dire le suivant. À ne pas confondre avec $u_n + 1$."
    },
    {
      question: "Chaque année, une commune gagne $150$ habitants. Avec $u_n$ la population l'année $n$ :",
      choix: ["$u_{n+1} = u_n + 150$", "$u_{n+1} = 150u_n$", "$u_n = u_{n+1} + 150$", "$u_{n+1} = 1{,}5u_n$"],
      bonne: 0,
      explication: "L'année suivante, on ajoute $150$ à la population de l'année : $u_{n+1} = u_n + 150$."
    },
    {
      question: "On sait que $u_{n+1} - u_n = -n^2 - 1$ pour tout $n$. Que peut-on dire de $(u_n)$ ?",
      choix: ["Elle est croissante", "Elle est décroissante", "Elle est arithmétique", "On ne peut pas conclure"],
      bonne: 1,
      explication: "$-n^2 - 1 < 0$ pour tout $n$, donc $u_{n+1} < u_n$ : la suite est décroissante."
    },
    {
      question: "La négation de « la suite $(u_n)$ est croissante » est :",
      choix: ["il existe $n$ tel que $u_{n+1} < u_n$", "pour tout $n$, $u_{n+1} < u_n$", "la suite est décroissante", "$u_1 < u_0$"],
      bonne: 0,
      explication: "« Croissante » veut dire « pour tout $n$, $u_{n+1} \\geqslant u_n$ ». Sa négation : il existe au moins un rang où ça baisse. La suite n'est pas forcément décroissante."
    },
    {
      question: "$u_n = 5 + \\dfrac{2}{n + 1}$. Quand $n$ devient très grand, $u_n$…",
      choix: ["se rapproche de $5$", "se rapproche de $7$", "devient aussi grand qu'on veut", "se rapproche de $0$"],
      bonne: 0,
      explication: "$\\dfrac{2}{n + 1}$ se rapproche de $0$, donc $u_n$ se rapproche de $5$."
    },
    {
      question: "La suite $u_n = (-1)^n$ :",
      choix: ["n'a pas de limite", "a pour limite $1$", "a pour limite $-1$", "a pour limite $0$"],
      bonne: 0,
      explication: "Les termes valent $1$, $-1$, $1$, $-1$… : ils ne se rapprochent d'aucun nombre."
    },
    {
      question: "En Python, $\\texttt{L = [2 * k for k in range(4)]}$. Que vaut $\\texttt{L}$ ?",
      choix: ["$[0, 2, 4, 6]$", "$[2, 4, 6, 8]$", "$[0, 2, 4, 6, 8]$", "$[2, 4, 6]$"],
      bonne: 0,
      explication: "$k$ prend les valeurs $0$, $1$, $2$, $3$ : on obtient $0$, $2$, $4$, $6$."
    },
    {
      question: "Motif de galets en carré : $1$, $4$, $9$, $16$… Combien de galets à l'étape $12$ ?",
      choix: ["$144$", "$48$", "$24$", "$121$"],
      bonne: 0,
      explication: "L'étape $n$ est un carré de $n$ galets de côté : $u_n = n^2$, donc $u_{12} = 144$."
    },
    { question: "$u_n = 2^n - n$. Combien vaut $u_5$ ?", choix: ["$27$", "$5$", "$37$", "$32$"], bonne: 0, explication: "$u_5 = 2^5 - 5 = 32 - 5 = 27$. Attention : $2^5$ n'est pas $2 \\times 5$." },
    { question: "$u_0 = 1$ et $u_{n+1} = u_n^2 + 1$. Combien vaut $u_3$ ?", choix: ["$26$", "$5$", "$10$", "$17$"], bonne: 0, explication: "De proche en proche : $u_1 = 1^2 + 1 = 2$, $u_2 = 2^2 + 1 = 5$, $u_3 = 5^2 + 1 = 26$. ($10 = 3^2 + 1$ confond le rang et le terme.)" },
    { question: "$u_n = 3n + 2$. Alors $u_{n+1}$ est égal à :", choix: ["$3n + 5$", "$3n + 3$", "$3n + 2$", "$4n + 3$"], bonne: 0, explication: "On remplace $n$ par $n + 1$ : $u_{n+1} = 3(n + 1) + 2 = 3n + 5$. ($3n + 3$, c'est $u_n + 1$.)" },
    { question: "Un stock de vanille augmente de $2\\,\\%$ par mois grâce aux récoltes, puis on en vend $100$ kg à chaque fin de mois. Avec $u_n$ le stock (en kg) au bout de $n$ mois :", choix: ["$u_{n+1} = 1{,}02u_n - 100$", "$u_{n+1} = 0{,}02u_n - 100$", "$u_{n+1} = 1{,}02(u_n - 100)$", "$u_{n+1} = u_n + 2 - 100$"], bonne: 0, explication: "Augmenter de $2\\,\\%$, c'est multiplier par $1{,}02$ ; ensuite seulement, on retire $100$ kg. L'ordre de l'énoncé compte." },
    { question: "Un motif de carrés en allumettes alignés demande $4$, $7$, $10$, $13$… allumettes aux étapes $1$, $2$, $3$, $4$… Une formule explicite est :", choix: ["$u_n = 3n + 1$", "$u_n = 4n$", "$u_n = n + 3$", "$u_n = 3n + 4$"], bonne: 0, explication: "On ajoute $3$ allumettes à chaque étape, et $u_1 = 4$ : $u_n = 3n + 1$. Vérification : $u_2 = 7$, $u_4 = 13$." },
    { question: "Motif de galets en triangle : $u_1 = 1$ et $u_{n+1} = u_n + (n + 1)$. Combien vaut $u_5$ ?", choix: ["$15$", "$10$", "$21$", "$6$"], bonne: 0, explication: "$u_2 = 1 + 2 = 3$, $u_3 = 3 + 3 = 6$, $u_4 = 6 + 4 = 10$, $u_5 = 10 + 5 = 15$." },
    { question: "$u_n = 5 - 2n$. Que peut-on dire de $u_{n+1} - u_n$ ?", choix: ["Il vaut $-2$, donc $(u_n)$ est décroissante", "Il vaut $2$, donc $(u_n)$ est croissante", "Il vaut $-2n$, donc on ne peut pas conclure", "Il vaut $5$, donc $(u_n)$ est croissante"], bonne: 0, explication: "$u_{n+1} - u_n = 5 - 2(n + 1) - (5 - 2n) = -2 < 0$ pour tout $n$ : la suite est décroissante." },
    { question: "$u_n = f(n)$ avec $f(x) = \\sqrt{x} + 1$. La suite $(u_n)$ est :", choix: ["croissante, car $f$ est croissante sur $[0\\,;+\\infty[$", "décroissante, car $\\sqrt{n}$ grandit de moins en moins vite", "constante", "ni croissante ni décroissante"], bonne: 0, explication: "Quand $u_n = f(n)$ et que $f$ est monotone sur $[0\\,;+\\infty[$, la suite a le même sens de variation que $f$." },
    { question: "On sait que $u_0 = 3$, $u_1 = 5$ et $u_2 = 4$. On peut affirmer que :", choix: ["$(u_n)$ n'est pas croissante", "$(u_n)$ est décroissante", "$(u_n)$ est croissante", "$(u_n)$ n'a pas de limite"], bonne: 0, explication: "$u_2 < u_1$ : c'est un contre-exemple, la suite n'est pas croissante. Elle n'est pas décroissante non plus, puisque $u_1 > u_0$." },
    { question: "Pour représenter graphiquement une suite, on trace :", choix: ["un nuage de points $(n\\,;u_n)$, sans les relier", "une courbe continue passant par les points", "un histogramme", "une droite passant par l'origine"], bonne: 0, explication: "Une suite n'est définie que pour des entiers : entre deux rangs, il n'y a rien à tracer." },
    { question: "$u_n = 3n - 100$. Quand $n$ devient très grand, $u_n$ :", choix: ["devient aussi grand qu'on veut", "se rapproche de $-100$", "se rapproche de $3$", "se rapproche de $0$"], bonne: 0, explication: "$3n$ dépasse n'importe quel nombre, même après avoir retiré $100$ : on conjecture que la limite est $+\\infty$." },
    { question: "$u_{10} = 0{,}9$, $u_{100} = 0{,}99$, $u_{1\\,000} = 0{,}999$. On conjecture que :", choix: ["la limite de $(u_n)$ est $1$", "la limite de $(u_n)$ est $0{,}999$", "$(u_n)$ tend vers $+\\infty$", "$(u_n)$ n'a pas de limite"], bonne: 0, explication: "Les termes se rapprochent de $1$ sans le dépasser. C'est une conjecture : on la démontrera en Terminale." },
    { question: "En Python, $\\texttt{L = [5, 8, 13, 21]}$. Que vaut $\\texttt{L[1]}$ ?", choix: ["$8$", "$5$", "$13$", "$21$"], bonne: 0, explication: "Les indices commencent à $0$ : $\\texttt{L[0]}$ vaut $5$ et $\\texttt{L[1]}$ vaut $8$." },
    { question: "Que contient $\\texttt{L}$ après $\\texttt{L = []}$ puis $\\texttt{for n in range(4): L.append(n + 1)}$ ?", choix: ["$\\texttt{[1, 2, 3, 4]}$", "$\\texttt{[0, 1, 2, 3]}$", "$\\texttt{[1, 2, 3, 4, 5]}$", "$\\texttt{[4]}$"], bonne: 0, explication: "$n$ prend les valeurs $0$, $1$, $2$, $3$, et on ajoute $n + 1$ à chaque tour : $1$, $2$, $3$, $4$." },
    { question: "Programme de Fibonacci : $\\texttt{F = [1, 1]}$, puis une boucle qui tourne $5$ fois et ajoute un terme à chaque tour. Combien d'éléments contient $\\texttt{F}$ à la fin ?", choix: ["$7$", "$5$", "$6$", "$8$"], bonne: 0, explication: "On part de $2$ éléments et on en ajoute $5$ : $\\texttt{[1, 1, 2, 3, 5, 8, 13]}$, soit $7$ éléments." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer des termes",
      etapes: [
        "Repérer le type de définition : formule explicite ($u_n$ en fonction de $n$) ou récurrence ($u_{n+1}$ en fonction de $u_n$).",
        "Explicite : remplacer $n$ par la valeur voulue, avec des parenthèses autour des nombres négatifs.",
        "Récurrence : partir du premier terme et calculer chaque terme à partir du précédent, dans l'ordre."
      ],
      exemple: "$u_0 = 4$, $u_{n+1} = \\dfrac{1}{2}u_n + 1$ : $u_1 = 3$, $u_2 = 2{,}5$, $u_3 = 2{,}25$."
    },
    {
      titre: "Traduire un énoncé par une suite",
      etapes: [
        "Dire ce que représente $u_n$ (avec l'unité) et le rang de départ.",
        "Passer d'une étape à la suivante : on ajoute ($+$), on multiplie ($\\times$), ou les deux, dans l'ordre de l'énoncé.",
        "Vérifier la relation sur les premiers termes."
      ],
      exemple: "$-5\\,\\%$ par an puis $+200$ habitants : $u_{n+1} = 0{,}95u_n + 200$."
    },
    {
      titre: "Étudier le sens de variation",
      etapes: [
        "Calculer et simplifier $u_{n+1} - u_n$.",
        "Étudier son signe pour tout $n \\in \\mathbb{N}$ (ou à partir d'un rang).",
        "Ou, si $u_n = f(n)$, utiliser le sens de variation de $f$ sur $[0\\,;+\\infty[$.",
        "Pour montrer qu'une suite n'est pas monotone : un contre-exemple."
      ],
      exemple: "$u_n = n^2 + n$ : $u_{n+1} - u_n = 2n + 2 > 0$, donc $(u_n)$ est croissante."
    },
    {
      titre: "Conjecturer une limite",
      etapes: [
        "Calculer des termes de rang $10$, $100$, $1\\,000$ (calculatrice, tableur, Python).",
        "Regarder si les termes se stabilisent, grandissent sans fin ou oscillent.",
        "Écrire « on conjecture que… » : ce n'est pas une démonstration."
      ],
      exemple: "$u_n = 3 + \\dfrac{1}{n}$ : $3{,}1$ ; $3{,}01$ ; $3{,}001$. On conjecture une limite égale à $3$."
    }
  ],
  erreurs: [
    "Confondre $u_{n+1}$ (le terme suivant) et $u_n + 1$.",
    "Oublier de calculer les termes dans l'ordre avec une relation de récurrence.",
    "Relier les points du nuage d'une suite comme pour une courbe de fonction.",
    "Conclure qu'une suite est croissante en regardant seulement deux termes.",
    "Croire que « pas croissante » veut dire « décroissante ».",
    "Oublier que les indices d'une liste Python commencent à $0$."
  ]
};
