/*
  CHAPITRE : Première technologique — Ensembles et logique
  ----------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme 2026 de première technologique (BO n° 14 du 2 avril 2026), partie transversale « Vocabulaire ensembliste et logique ».
  video : vidéos de la chaîne (Seconde, mêmes notions) et d'autres chaînes. Générateurs : préfixe ye- dans assets/exercices-techno.js ; figures "ye-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["techno-ensembles-logique"] = {
  niveau: "Première technologique",
  numero: 1,
  titre: "Ensembles et logique",
  accroche: "Le vocabulaire des maths : $\\in$, $\\subset$, $\\cap$, $\\cup$, les intervalles, « et », « ou », implication et contre-exemple.",

  playlist: "",
  drive: "",
  pdfs: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Élément, sous-ensemble, ensemble vide",
      figure: "ye-cours-ensembles",
      video: { titre: "Vidéo de ton prof : ensembles de nombres et intervalles (cours de Seconde, 1/2)", youtube: "https://youtu.be/_O22jCGJLds" },
      texte:
        "Un **ensemble** est une collection d'objets, ses **éléments**. On l'écrit entre accolades : $A = \\{2\\,;4\\,;6\\,;8\\}$.\n\n" +
        "- $4 \\in A$ : « $4$ **appartient** à $A$ » ; $5 \\notin A$ : « $5$ n'appartient pas à $A$ ».\n" +
        "- $B \\subset A$ : « $B$ est **inclus** dans $A$ » ($B$ est un sous-ensemble de $A$) quand tout élément de $B$ est aussi dans $A$. Par exemple $\\{2\\,;8\\} \\subset A$.\n" +
        "- $\\varnothing$ est l'**ensemble vide** : il n'a aucun élément.\n" +
        "- $\\text{Card}(A)$ est le **cardinal** de $A$ : son nombre d'éléments. Ici $\\text{Card}(A) = 4$.\n\n" +
        "Les **ensembles de nombres** sont emboîtés : $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ (entiers naturels, entiers relatifs, décimaux, rationnels, réels).",
      exemple: {
        enonce: "Vrai ou faux ? $-5 \\in \\mathbb{N}$ ; $\\dfrac{3}{4} \\in \\mathbb{D}$ ; $\\{1\\,;2\\} \\subset \\mathbb{N}$.",
        solution: "$-5 \\in \\mathbb{N}$ est faux ($-5$ est négatif, il est dans $\\mathbb{Z}$). $\\dfrac{3}{4} = 0{,}75 \\in \\mathbb{D}$ est vrai. $\\{1\\,;2\\} \\subset \\mathbb{N}$ est vrai : $1$ et $2$ sont des entiers naturels."
      }
    },
    {
      titre: "Les intervalles",
      figure: "ye-cours-intervalles",
      video: { titre: "Vidéo de ton prof : inégalités et intervalles (exercice corrigé)", youtube: "https://youtu.be/u-z2yEgnBmI" },
      texte:
        "Un **intervalle** est un ensemble de réels « d'un seul tenant ». Le crochet dit si la borne est comprise :\n\n" +
        "- $[a\\,;b]$ : $a \\leqslant x \\leqslant b$ (bornes comprises) ; $]a\\,;b[$ : $a < x < b$ (bornes exclues).\n" +
        "- $[a\\,;+\\infty[$ : $x \\geqslant a$ ; $]-\\infty\\,;b[$ : $x < b$. Du côté de l'infini, le crochet est toujours tourné vers l'extérieur.\n\n" +
        "$\\mathbb{R} = ]-\\infty\\,;+\\infty[$ est lui-même un intervalle.",
      exemple: {
        enonce: "Traduis par un intervalle : $-2 < x \\leqslant 5$, puis $t \\geqslant 3$.",
        solution: "$x \\in ]-2\\,;5]$ (le $-2$ est exclu, le $5$ est compris) et $t \\in [3\\,;+\\infty[$."
      }
    },
    {
      titre: "Intersection, réunion, complémentaire",
      figure: "ye-cours-venn",
      video: { titre: "Vidéo de ton prof : intersection et réunion, les horaires du dispensaire", youtube: "https://youtu.be/Ov8R007Q9Eg" },
      texte:
        "Pour deux sous-ensembles $A$ et $B$ d'un ensemble $E$ :\n\n" +
        "- $A \\cap B$ (**intersection**, « $A$ inter $B$ ») : les éléments qui sont dans $A$ **et** dans $B$.\n" +
        "- $A \\cup B$ (**réunion**, « $A$ union $B$ ») : les éléments qui sont dans $A$ **ou** dans $B$ (au moins l'un des deux).\n" +
        "- $\\overline{A}$ (ou $E \\setminus A$) : le **complémentaire** de $A$ dans $E$, les éléments de $E$ qui ne sont pas dans $A$.\n\n" +
        "Avec des effectifs : $\\text{Card}(A \\cup B) = \\text{Card}(A) + \\text{Card}(B) - \\text{Card}(A \\cap B)$, car les éléments communs seraient comptés deux fois.\n\n" +
        "Pour des intervalles, on dessine les deux sur une même droite graduée : l'intersection est la partie commune, la réunion est tout ce qui est colorié.",
      exemple: {
        enonce: "$I = [1\\,;4]$ et $J = ]2\\,;6[$. Détermine $I \\cap J$ et $I \\cup J$.",
        solution: "Partie commune : $I \\cap J = ]2\\,;4]$ ($2$ exclu car il n'est pas dans $J$, $4$ compris car il est dans les deux). Tout ce qui est colorié : $I \\cup J = [1\\,;6[$."
      }
    },
    {
      titre: "Couples et produit cartésien",
      figure: "ye-cours-produit",
      texte:
        "Un **couple** $(x\\,;y)$ est une liste de deux éléments **dans un ordre** : $(1\\,;2) \\neq (2\\,;1)$. Les coordonnées d'un point sont un couple.\n\n" +
        "Le **produit cartésien** $A \\times B$ est l'ensemble de tous les couples $(x\\,;y)$ avec $x \\in A$ et $y \\in B$. Si $A$ a $p$ éléments et $B$ en a $q$, alors $A \\times B$ a $p \\times q$ éléments.\n\n" +
        "Exemple : un menu propose $3$ plats et $2$ desserts : il y a $3 \\times 2 = 6$ repas (plat ; dessert) possibles. Le plan $\\mathbb{R} \\times \\mathbb{R}$, noté $\\mathbb{R}^2$, est l'ensemble des couples de réels.",
      exemple: {
        enonce: "$A = \\{a\\,;b\\,;c\\}$ et $B = \\{1\\,;2\\}$. Écris tous les éléments de $A \\times B$.",
        solution: "$(a\\,;1)$, $(a\\,;2)$, $(b\\,;1)$, $(b\\,;2)$, $(c\\,;1)$, $(c\\,;2)$ : $6$ couples. Attention, $(1\\,;a)$ n'est pas dans $A \\times B$ (il serait dans $B \\times A$)."
      }
    },
    {
      titre: "« et », « ou », « non »",
      video: { titre: "Vidéo d'Hedacademy : la puissance du contre-exemple", youtube: "https://youtu.be/s7qntK4nynY" },
      texte:
        "Une **proposition** est une phrase vraie ou fausse : « $x > 2$ », « $n$ est pair ».\n\n" +
        "- « $P$ **et** $Q$ » est vraie seulement quand $P$ et $Q$ sont vraies toutes les deux. Elle correspond à l'intersection : $x \\in A \\cap B$ signifie « $x \\in A$ et $x \\in B$ ».\n" +
        "- « $P$ **ou** $Q$ » est vraie dès que l'une au moins des deux est vraie. En maths, le « ou » n'est pas exclusif : si les deux sont vraies, « $P$ ou $Q$ » est vraie. Il correspond à la réunion.\n" +
        "- « **non** $P$ » (la négation) est vraie quand $P$ est fausse. La négation de « $x > 2$ » est « $x \\leqslant 2$ » ; celle de « pour tout… » est « il existe au moins un… qui ne… ».\n\n" +
        "**Contre-exemple.** Pour montrer qu'une proposition universelle (« pour tout $x$… ») est **fausse**, il suffit d'un seul exemple où elle ne marche pas. En revanche, vérifier quelques exemples ne prouve jamais qu'elle est vraie.\n\n" +
        "En Python, les opérateurs $\\texttt{and}$, $\\texttt{or}$ et $\\texttt{not}$ servent à écrire ces conditions, par exemple pour filtrer une liste.",
      exemple: {
        enonce: "La proposition « pour tout entier $n$, $n^2 \\geqslant 2n$ » est-elle vraie ?",
        solution: "Non : pour $n = 1$, $1^2 = 1 < 2$. Ce contre-exemple suffit. (Elle est pourtant vraie pour $n = 0$, $n = 2$, $n = 3$…)"
      }
    },
    {
      titre: "Implication, réciproque, contraposée",
      figure: "ye-cours-implication",
      texte:
        "« **Si** $P$, **alors** $Q$ » (notée $P \\Rightarrow Q$) signifie : chaque fois que $P$ est vraie, $Q$ l'est aussi. Exemple : « si $ABCD$ est un carré, alors $ABCD$ est un rectangle ».\n\n" +
        "- La **réciproque** est « si $Q$, alors $P$ ». Elle peut être fausse même si l'implication est vraie : « si $ABCD$ est un rectangle, alors c'est un carré » est fausse.\n" +
        "- La **contraposée** est « si non $Q$, alors non $P$ » : « si $ABCD$ n'est pas un rectangle, alors ce n'est pas un carré ». Elle est **toujours vraie en même temps** que l'implication : c'est la même information, dite autrement.\n" +
        "- Quand $P \\Rightarrow Q$ et $Q \\Rightarrow P$ sont vraies toutes les deux, $P$ et $Q$ sont **équivalentes** : $P \\Leftrightarrow Q$ (« si et seulement si »).\n\n" +
        "**Condition nécessaire, condition suffisante.** Si $P \\Rightarrow Q$ : $P$ est une condition **suffisante** pour $Q$ (il suffit d'avoir $P$) et $Q$ est une condition **nécessaire** pour $P$ (sans $Q$, pas de $P$). Dans une équivalence, la condition est nécessaire et suffisante.",
      exemple: {
        enonce: "Implication : « si $x > 5$, alors $x > 2$ ». Écris sa réciproque et sa contraposée, et dis si elles sont vraies.",
        solution: "Réciproque : « si $x > 2$, alors $x > 5$ », fausse ($x = 3$ est un contre-exemple). Contraposée : « si $x \\leqslant 2$, alors $x \\leqslant 5$ », vraie, comme l'implication. « $x > 5$ » est une condition suffisante pour « $x > 2$ », mais pas nécessaire."
      }
    },
    {
      titre: "Identité ou équation ? Le statut des lettres",
      video: { titre: "Vidéo de ton prof : identité ou équation, paramètre m (exercice corrigé)", youtube: "https://youtu.be/tpadBfbxTt0" },
      texte:
        "Une égalité avec des lettres peut être :\n\n" +
        "- une **identité**, vraie pour toutes les valeurs : $(x + 1)^2 = x^2 + 2x + 1$. Les lettres sont des **indéterminées** ;\n" +
        "- une **équation**, vraie seulement pour certaines valeurs qu'on cherche : $3x + 1 = 7$. La lettre est une **inconnue**.\n\n" +
        "Dans une fonction $f(x) = 2x + 3$ ou une suite $u(n)$, la lettre $x$ ou $n$ est une **variable** : elle parcourt toutes les valeurs possibles. Dans $f(x) = ax^2$ où $a$ est un nombre fixé mais non précisé, $a$ est un **paramètre**.",
      exemple: {
        enonce: "Quel est le statut de chaque lettre dans « résoudre $2x - m = 5$ où $m$ est un nombre donné » ?",
        solution: "$x$ est l'inconnue (on cherche sa valeur : $x = \\dfrac{5 + m}{2}$) et $m$ est un paramètre (fixé, non précisé)."
      }
    },
    {
      titre: "Pour aller plus loin : les filtres en Python",
      video: { titre: "Vidéo d'Yvan Monka : créer une liste en compréhension en Python", youtube: "https://youtu.be/TzVQgK6RSXc" },
      texte:
        "Une liste en compréhension traduit un ensemble défini par une condition, exactement comme $\\{n \\in \\mathbb{N} \\mid n < 20 \\text{ et } n \\text{ pair}\\}$ :\n\n" +
        "```python\nL = [n for n in range(20) if n % 2 == 0 and n > 6]\n# [8, 10, 12, 14, 16, 18]\nM = [n for n in range(20) if n < 3 or n > 17]\n# [0, 1, 2, 18, 19]\n```\n\n" +
        "$\\texttt{and}$ joue le rôle de « et » (intersection), $\\texttt{or}$ celui de « ou » (réunion), $\\texttt{not}$ celui de la négation."
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "ye-appartient", titre: "Appartenir à un ensemble", etape: "Ensembles", nb: 5 },
    { type: "ye-intervalle", titre: "Traduire une inégalité par un intervalle", etape: "Ensembles", nb: 5 },
    { type: "ye-inter-union", titre: "Intersection et réunion d'intervalles", etape: "Ensembles", nb: 5 },
    { type: "ye-cardinal", titre: "Compter les éléments : Card", etape: "Ensembles", nb: 5 },
    { type: "ye-venn", titre: "Lire un diagramme", etape: "Ensembles", nb: 5 },
    { type: "ye-produit-cartesien", titre: "Couples et produit cartésien", etape: "Ensembles", nb: 4 },
    { type: "ye-et-ou", titre: "« et », « ou », « non »", etape: "Logique", nb: 5 },
    { type: "ye-contre-exemple", titre: "Trouver un contre-exemple", etape: "Logique", nb: 5 },
    { type: "ye-implication", titre: "Réciproque et contraposée", etape: "Logique", nb: 5 },
    { type: "ye-condition", titre: "Condition nécessaire, condition suffisante", etape: "Logique", nb: 4 },
    { type: "ye-statut", titre: "Identité, équation, statut des lettres", etape: "Logique", nb: 5 },
    { type: "ye-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Le plus petit ensemble de nombres contenant $-7$ est :", choix: ["$\\mathbb{Z}$", "$\\mathbb{N}$", "$\\mathbb{D}$", "$\\mathbb{Q}$"], bonne: 0, explication: "$-7$ est un entier négatif : il est dans $\\mathbb{Z}$, pas dans $\\mathbb{N}$." },
    { question: "$0{,}75$ appartient à :", choix: ["$\\mathbb{D}$ (et donc à $\\mathbb{Q}$ et $\\mathbb{R}$)", "$\\mathbb{Z}$", "$\\mathbb{N}$", "aucun ensemble de nombres"], bonne: 0, explication: "Son écriture décimale est finie : c'est un décimal, donc aussi un rationnel et un réel." },
    { question: "L'inégalité $-1 \\leqslant x < 3$ se traduit par :", choix: ["$x \\in [-1\\,;3[$", "$x \\in ]-1\\,;3]$", "$x \\in [-1\\,;3]$", "$x \\in ]-1\\,;3[$"], bonne: 0, explication: "$-1$ est compris ($\\leqslant$), $3$ est exclu ($<$)." },
    { question: "$x \\geqslant 4$ se traduit par :", choix: ["$x \\in [4\\,;+\\infty[$", "$x \\in ]4\\,;+\\infty[$", "$x \\in ]-\\infty\\,;4]$", "$x \\in [4\\,;+\\infty]$"], bonne: 0, explication: "Le $4$ est compris ; du côté de $+\\infty$, le crochet est tourné vers l'extérieur." },
    { question: "$[0\\,;5] \\cap [3\\,;9]$ vaut :", choix: ["$[3\\,;5]$", "$[0\\,;9]$", "$[0\\,;3]$", "$[5\\,;9]$"], bonne: 0, explication: "Les nombres communs aux deux intervalles sont ceux entre $3$ et $5$." },
    { question: "$[0\\,;5] \\cup [3\\,;9]$ vaut :", choix: ["$[0\\,;9]$", "$[3\\,;5]$", "$[0\\,;3] \\cup [5\\,;9]$", "$\\varnothing$"], bonne: 0, explication: "Les deux intervalles se chevauchent : la réunion va de $0$ à $9$." },
    { question: "$[1\\,;2] \\cap [4\\,;6]$ vaut :", choix: ["$\\varnothing$", "$[2\\,;4]$", "$[1\\,;6]$", "$\\{2\\,;4\\}$"], bonne: 0, explication: "Aucun nombre n'est à la fois dans $[1\\,;2]$ et dans $[4\\,;6]$." },
    { question: "$A = \\{1\\,;2\\,;3\\,;4\\}$ et $B = \\{3\\,;4\\,;5\\}$. Alors $A \\cap B$ est :", choix: ["$\\{3\\,;4\\}$", "$\\{1\\,;2\\,;3\\,;4\\,;5\\}$", "$\\{1\\,;2\\}$", "$\\{5\\}$"], bonne: 0, explication: "Les éléments communs sont $3$ et $4$." },
    { question: "Avec les mêmes $A$ et $B$, $\\text{Card}(A \\cup B)$ vaut :", choix: ["$5$", "$7$", "$2$", "$4$"], bonne: 0, explication: "$A \\cup B = \\{1\\,;2\\,;3\\,;4\\,;5\\}$ ; ou $4 + 3 - 2 = 5$." },
    { question: "Dans $E = \\{1\\,;2\\,;\\dots\\,;10\\}$, le complémentaire de $A = \\{2\\,;4\\,;6\\,;8\\,;10\\}$ est :", choix: ["$\\{1\\,;3\\,;5\\,;7\\,;9\\}$", "$\\{2\\,;4\\,;6\\,;8\\,;10\\}$", "$\\varnothing$", "$E$"], bonne: 0, explication: "$\\overline{A}$ contient les éléments de $E$ qui ne sont pas dans $A$ : les impairs." },
    { question: "Si $A$ a $4$ éléments et $B$ en a $5$, le produit cartésien $A \\times B$ a :", choix: ["$20$ couples", "$9$ couples", "$10$ couples", "$45$ couples"], bonne: 0, explication: "Chaque élément de $A$ se combine avec chacun des $5$ éléments de $B$ : $4 \\times 5 = 20$." },
    { question: "Le couple $(2\\,;5)$ et le couple $(5\\,;2)$ sont :", choix: ["différents : l'ordre compte", "égaux", "égaux seulement si $2 = 5$", "des ensembles"], bonne: 0, explication: "Dans un couple, l'ordre compte, comme pour les coordonnées d'un point." },
    { question: "Pour $x = 3$, laquelle de ces propositions est vraie ?", choix: ["$x > 1$ ou $x > 10$", "$x > 1$ et $x > 10$", "non ($x > 1$)", "$x < 1$ ou $x > 10$"], bonne: 0, explication: "« ou » est vraie dès qu'une des deux est vraie : $3 > 1$ suffit." },
    { question: "La négation de « $x \\geqslant 4$ » est :", choix: ["$x < 4$", "$x \\leqslant 4$", "$x > 4$", "$x \\neq 4$"], bonne: 0, explication: "Le contraire de « supérieur ou égal » est « strictement inférieur »." },
    { question: "Un contre-exemple à « pour tout réel $x$, $x^2 \\geqslant x$ » est :", choix: ["$x = 0{,}5$", "$x = 2$", "$x = 0$", "$x = -1$"], bonne: 0, explication: "$0{,}5^2 = 0{,}25 < 0{,}5$. Pour les autres valeurs, l'inégalité est vraie." },
    { question: "Pour prouver qu'une propriété « pour tout entier $n$ » est fausse, il suffit :", choix: ["d'un seul contre-exemple", "de trois contre-exemples", "de la vérifier pour $n = 0$", "de vérifier qu'elle est vraie pour $n = 1$"], bonne: 0, explication: "Un seul cas où elle est fausse suffit à la réfuter." },
    { question: "La réciproque de « si $n$ est multiple de $4$, alors $n$ est pair » est :", choix: ["si $n$ est pair, alors $n$ est multiple de $4$", "si $n$ n'est pas pair, alors $n$ n'est pas multiple de $4$", "si $n$ n'est pas multiple de $4$, alors $n$ n'est pas pair", "si $n$ est multiple de $4$, alors $n$ n'est pas pair"], bonne: 0, explication: "La réciproque échange hypothèse et conclusion. Ici elle est fausse ($6$ est pair mais pas multiple de $4$)." },
    { question: "La contraposée de « si $n$ est multiple de $4$, alors $n$ est pair » est :", choix: ["si $n$ n'est pas pair, alors $n$ n'est pas multiple de $4$", "si $n$ est pair, alors $n$ est multiple de $4$", "si $n$ n'est pas multiple de $4$, alors $n$ n'est pas pair", "si $n$ est impair, alors $n$ est multiple de $4$"], bonne: 0, explication: "On nie les deux parties et on les échange. La contraposée est vraie, comme l'implication." },
    { question: "Une implication et sa contraposée sont :", choix: ["toujours vraies en même temps", "toujours de vérité contraire", "sans lien", "vraies en même temps seulement si la réciproque l'est"], bonne: 0, explication: "C'est la même affirmation dite autrement." },
    { question: "« $x = 3$ » est, pour « $x^2 = 9$ », une condition :", choix: ["suffisante, mais pas nécessaire", "nécessaire, mais pas suffisante", "nécessaire et suffisante", "ni nécessaire ni suffisante"], bonne: 0, explication: "Si $x = 3$, alors $x^2 = 9$ (suffisante). Mais $x^2 = 9$ n'oblige pas $x = 3$ : $x$ peut valoir $-3$." },
    { question: "L'égalité $(x - 2)^2 = x^2 - 4x + 4$ est :", choix: ["une identité, vraie pour tout $x$", "une équation dont la solution est $2$", "fausse", "une équation sans solution"], bonne: 0, explication: "C'est un développement : il est vrai pour toutes les valeurs de $x$." },
    { question: "Dans « $f(x) = kx^2$ où $k$ est un nombre fixé », la lettre $k$ est :", choix: ["un paramètre", "une inconnue", "une variable", "une indéterminée"], bonne: 0, explication: "$k$ est fixé pendant toute l'étude, seul $x$ varie." },
    { question: "En Python, $\\texttt{[n for n in range(10) if n > 3 and n < 7]}$ donne :", choix: ["$\\texttt{[4, 5, 6]}$", "$\\texttt{[4, 5, 6, 7]}$", "$\\texttt{[3, 4, 5, 6, 7]}$", "$\\texttt{[0, 1, 2, 3, 7, 8, 9]}$"], bonne: 0, explication: "$\\texttt{and}$ demande les deux conditions : $n > 3$ **et** $n < 7$, donc $4$, $5$, $6$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Trouver $I \\cap J$ et $I \\cup J$",
      figure: "ye-cours-intervalles",
      etapes: [
        "Dessiner une droite graduée et colorier $I$ au-dessus, $J$ en dessous.",
        "$I \\cap J$ : la partie où les deux couleurs se superposent (vide s'il n'y en a pas).",
        "$I \\cup J$ : tout ce qui est colorié au moins une fois.",
        "Pour les crochets : une borne est dans $I \\cap J$ si elle est dans les deux intervalles, dans $I \\cup J$ si elle est dans l'un des deux."
      ],
      exemple: "$I = [-3\\,;2[$ et $J = ]0\\,;5]$ : $I \\cap J = ]0\\,;2[$ et $I \\cup J = [-3\\,;5]$."
    },
    {
      titre: "Réfuter avec un contre-exemple",
      etapes: [
        "Repérer une proposition « pour tout… ».",
        "Chercher une valeur simple qui la met en défaut ($0$, $1$, un négatif, un nombre entre $0$ et $1$…).",
        "Vérifier par le calcul que la proposition est fausse pour cette valeur.",
        "Conclure : un seul contre-exemple suffit."
      ],
      exemple: "« Pour tout $x$, $\\sqrt{x^2} = x$ » : avec $x = -3$, $\\sqrt{9} = 3 \\neq -3$. Faux."
    },
    {
      titre: "Écrire réciproque et contraposée",
      figure: "ye-cours-implication",
      etapes: [
        "Repérer l'hypothèse $P$ et la conclusion $Q$ dans « si $P$, alors $Q$ ».",
        "Réciproque : échanger, « si $Q$, alors $P$ ». Vérifier si elle est vraie (souvent par un contre-exemple).",
        "Contraposée : nier et échanger, « si non $Q$, alors non $P$ ». Elle a la même vérité que l'implication.",
        "Si implication et réciproque sont vraies : équivalence, condition nécessaire et suffisante."
      ],
      exemple: "« Si $x = 2$, alors $x^2 = 4$ » : réciproque fausse ($x = -2$), contraposée « si $x^2 \\neq 4$, alors $x \\neq 2$ » vraie."
    },
    {
      titre: "Compter avec un diagramme",
      figure: "ye-cours-venn",
      etapes: [
        "Placer d'abord l'effectif de $A \\cap B$ au milieu.",
        "Compléter « $A$ seul » = $\\text{Card}(A) - \\text{Card}(A \\cap B)$, de même pour $B$.",
        "Le reste du groupe va en dehors des deux disques.",
        "Lire la zone demandée et additionner."
      ],
      exemple: "$30$ élèves, $18$ font du sport, $12$ de la musique, $7$ les deux : sport seul $11$, musique seule $5$, ni l'un ni l'autre $30 - 23 = 7$."
    }
  ],
  erreurs: [
    "Confondre $\\in$ (un élément appartient) et $\\subset$ (un ensemble est inclus) : on écrit $2 \\in \\mathbb{N}$ mais $\\{2\\} \\subset \\mathbb{N}$.",
    "Tourner le crochet du mauvais côté : $x < 3$ donne $]-\\infty\\,;3[$, borne exclue.",
    "Écrire $[2\\,;+\\infty]$ : du côté de l'infini, le crochet est toujours ouvert.",
    "Prendre « $A \\cup B$ » pour « $A \\cap B$ » : la réunion rassemble, l'intersection ne garde que le commun.",
    "Croire que le « ou » exclut le cas où les deux sont vraies : en maths, « ou » est inclusif.",
    "Confondre réciproque (on échange) et contraposée (on échange **et** on nie).",
    "Penser qu'une implication vraie a forcément une réciproque vraie : « carré $\\Rightarrow$ rectangle » est vraie, pas l'inverse.",
    "Vouloir prouver une propriété « pour tout » avec quelques exemples."
  ]
};
