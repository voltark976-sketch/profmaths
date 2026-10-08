/*
  CHAPITRE : Seconde — Arithmétique
  ----------------------------------
  Chapitre 4 de la progression spiralée 2026-2027 (programme de Seconde 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce, programme Python entre ```python et ```).
  Pas encore de vidéo de la chaîne ni de PDF pour ce chapitre : les vidéos sont celles d'Yvan Monka.
  Ajouter les liens dans playlist, pdfs et videos le moment venu.
  Les générateurs d'exercices commencent par « ar- » dans assets/exercices.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-arithmetique"] = {
  niveau: "Seconde",
  numero: 4,
  titre: "Arithmétique",
  accroche: "Multiples, diviseurs, nombres pairs et impairs, nombres premiers : raisonner sur les entiers et rédiger ses premières démonstrations.",

  playlist: "", // lien de la playlist YouTube du chapitre
  drive: "",
  pdfs: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Multiples et diviseurs",
      figure: "multiples-barges",
      video: { titre: "Vidéo d'Yvan Monka : démontrer qu'un nombre est un multiple (ou un diviseur)", youtube: "https://youtu.be/umlnJooSDas" },
      texte:
        "Dans ce chapitre, on travaille avec les **entiers** : $\\mathbb{N}$ (entiers naturels $0$, $1$, $2$…) et $\\mathbb{Z}$ (entiers relatifs, positifs ou négatifs).\n\n" +
        "Soit $a$ et $b$ deux entiers. On dit que $a$ est un **multiple** de $b$ s'il existe un entier $k$ tel que $a = k \\times b$.\n\n" +
        "On dit alors aussi que $b$ est un **diviseur** de $a$, ou que $a$ est **divisible** par $b$ : ces trois phrases disent la même chose.\n\n" +
        "- Pour le vérifier, on calcule $a \\div b$ : le résultat doit être un **entier**.\n" +
        "- $0$ est un multiple de tous les entiers ($0 = 0 \\times b$), et $1$ divise tous les entiers.\n\n" +
        "Sur la figure : les multiples de $15$ (au-dessus) et de $20$ (en dessous). Le premier multiple commun est $60$ : deux barges qui partent toutes les $15$ et toutes les $20$ minutes se retrouvent au bout d'une heure.",
      exemple: {
        enonce: "Vrai ou faux ? $84$ est un multiple de $7$ ; $6$ est un diviseur de $45$.",
        solution: "- $84 = 12 \\times 7$ avec $12$ entier : **vrai**.\n- $7 \\times 6 = 42$ et $8 \\times 6 = 48$ : il n'existe pas d'entier $k$ tel que $45 = k \\times 6$. **Faux**."
      }
    },
    {
      titre: "Démonstration : la somme de deux multiples",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que la somme de deux multiples de a est un multiple de a", youtube: "https://youtu.be/4an6JTwrJV4" },
      texte:
        "**Propriété** : la somme de deux multiples d'un entier $a$ est un multiple de $a$.\n\n" +
        "**Démonstration** (avec $a = 3$). Soit $b$ et $c$ deux multiples de $3$.\n" +
        "- Il existe un entier $k_1$ tel que $b = 3k_1$, et un entier $k_2$ tel que $c = 3k_2$.\n" +
        "- Alors $b + c = 3k_1 + 3k_2 = 3(k_1 + k_2)$.\n" +
        "- $k_1 + k_2$ est un entier (somme de deux entiers). Donc $b + c = 3k$ avec $k = k_1 + k_2$ entier : $b + c$ est un multiple de $3$.\n\n" +
        "La même rédaction marche pour n'importe quel entier $a$ à la place de $3$.",
      exemple: {
        enonce: "$700$ et $21$ sont des multiples de $7$. Sans poser la division, justifier que $721$ est un multiple de $7$.",
        solution: "$721 = 700 + 21$ est la somme de deux multiples de $7$ ($700 = 100 \\times 7$ et $21 = 3 \\times 7$), donc c'est un multiple de $7$ : $721 = 103 \\times 7$."
      }
    },
    {
      titre: "Résoudre un problème avec des multiples",
      video: { titre: "Vidéo d'Yvan Monka : résoudre un problème avec multiples et diviseurs", youtube: "https://youtu.be/7nU2M-zhAjk" },
      texte:
        "Pour **démontrer** qu'un nombre est un multiple de $b$, on l'écrit sous la forme $b \\times (\\text{un entier})$. Tester sur quelques exemples ne suffit pas : il faut une écriture valable pour **tous** les entiers.\n\n" +
        "- On nomme l'entier inconnu : $n$.\n" +
        "- On écrit les nombres de l'énoncé en fonction de $n$ : trois entiers consécutifs s'écrivent $n$, $n + 1$, $n + 2$.\n" +
        "- On calcule, puis on **factorise** pour faire apparaître $b \\times (\\ldots)$.\n\n" +
        "Pour montrer qu'une affirmation est **fausse**, un seul **contre-exemple** suffit.",
      exemple: {
        enonce: "Démontrer que la somme de trois entiers consécutifs est toujours un multiple de $3$.",
        solution: "Soit $n$, $n + 1$ et $n + 2$ trois entiers consécutifs.\n\n$S = n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)$.\n\n$S = 3k$ avec $k = n + 1$ entier : $S$ est un multiple de $3$."
      }
    },
    {
      titre: "Nombres pairs, nombres impairs",
      video: { titre: "Vidéo d'Yvan Monka : déterminer la parité d'un nombre", youtube: "https://youtu.be/cE3gOMZ0Kko" },
      texte:
        "Un nombre **pair** est un multiple de $2$ : il s'écrit $2k$, avec $k$ entier. Un nombre **impair** n'est pas pair : il s'écrit $2k + 1$, avec $k$ entier.\n\n" +
        "- pair $+$ pair $=$ pair ; impair $+$ impair $=$ pair ; pair $+$ impair $=$ impair.\n" +
        "- pair $\\times$ n'importe quel entier $=$ pair ; impair $\\times$ impair $=$ impair.\n\n" +
        "**Disjonction des cas** : quand on ne connaît pas la parité de $n$, on traite les deux cas séparément ($n$ pair, puis $n$ impair). Par exemple, $n(n + 1)$ est toujours pair : un des deux entiers consécutifs est pair.",
      exemple: {
        enonce: "Quelle est la parité de $5\\,678\\,984^2 + 1$ ?",
        solution: "$5\\,678\\,984$ est pair (il se termine par $4$). Pair $\\times$ pair $=$ pair, donc $5\\,678\\,984^2 = 2k$ avec $k$ entier.\n\nAlors $5\\,678\\,984^2 + 1 = 2k + 1$ est **impair**."
      }
    },
    {
      titre: "Démonstration : le carré d'un nombre impair est impair",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que le carré d'un nombre impair est impair", youtube: "https://youtu.be/eKo1MpX9ktw" },
      texte:
        "**Propriété** : le carré d'un nombre impair est impair.\n\n" +
        "**Démonstration**. Soit $a$ un nombre impair : il existe un entier $k$ tel que $a = 2k + 1$.\n" +
        "- $a^2 = (2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$.\n" +
        "- $k' = 2k^2 + 2k$ est un entier, donc $a^2 = 2k' + 1$ : $a^2$ est impair.\n\n" +
        "**Implication et réciproque** : « si $a$ est impair, alors $a^2$ est impair » est vraie. Sa **réciproque**, « si $a^2$ est impair, alors $a$ est impair », est vraie aussi. Mais attention : la réciproque d'une propriété vraie n'est pas toujours vraie (« si $a$ est un multiple de $4$, alors $a$ est pair » est vraie, sa réciproque est fausse : $6$).",
      exemple: {
        enonce: "Démontrer que le produit de deux entiers consécutifs est pair.",
        solution: "Soit $n$ et $n + 1$ deux entiers consécutifs. **Disjonction des cas** :\n\n- si $n$ est pair, $n = 2k$ et $n(n + 1) = 2k(2k + 1) = 2k_1$ avec $k_1 = k(2k + 1)$ entier ;\n- si $n$ est impair, $n = 2k + 1$ et $n(n + 1) = (2k + 1)(2k + 2) = 2(2k + 1)(k + 1)$.\n\nDans tous les cas, $n(n + 1)$ est pair."
      }
    },
    {
      titre: "Nombres premiers",
      video: { titre: "Vidéo d'Yvan Monka : le cours complet d'arithmétique (Seconde)", youtube: "https://youtu.be/nZNAehFmrBE" },
      texte:
        "Un nombre **premier** est un entier naturel qui a **exactement deux** diviseurs positifs : $1$ et lui-même.\n\n" +
        "- Les premiers nombres premiers : $2$, $3$, $5$, $7$, $11$, $13$, $17$, $19$, $23$, $29$…\n" +
        "- $1$ n'est **pas** premier (un seul diviseur). $2$ est le seul nombre premier pair.\n" +
        "- Pour savoir si $n$ est premier, on teste la division par $2$, $3$, $5$, $7$… tant que le carré du diviseur testé ne dépasse pas $n$.\n\n" +
        "Tout entier $n \\geqslant 2$ se **décompose en produit de facteurs premiers** : $60 = 2^2 \\times 3 \\times 5$. On divise par $2$ autant que possible, puis par $3$, par $5$…",
      exemple: {
        enonce: "$91$ est-il premier ? Décomposer $84$ en produit de facteurs premiers.",
        solution: "$91 = 7 \\times 13$ : $91$ n'est **pas** premier (il n'est divisible ni par $2$, ni par $3$, ni par $5$, mais par $7$).\n\n$84 \\div 2 = 42$ ; $42 \\div 2 = 21$ ; $21 \\div 3 = 7$ ; $7$ est premier. Donc $84 = 2^2 \\times 3 \\times 7$."
      }
    },
    {
      titre: "Fraction irréductible",
      video: { titre: "Vidéo d'Yvan Monka : écrire plus simplement une fraction", youtube: "https://youtu.be/g5oV2wC6RfU" },
      texte:
        "Une fraction $\\dfrac{a}{b}$ est **irréductible** quand $a$ et $b$ n'ont pas de diviseur commun autre que $1$.\n\n" +
        "- Pour la rendre irréductible, on divise le numérateur et le dénominateur par un même diviseur commun, et on recommence tant que c'est possible.\n" +
        "- Plus rapide : on décompose $a$ et $b$ en facteurs premiers et on barre les facteurs communs.\n\n" +
        "Un résultat fractionnaire se donne **toujours** sous forme irréductible.",
      exemple: {
        enonce: "Rendre irréductible la fraction $\\dfrac{60}{126}$.",
        solution: "$\\dfrac{60}{126} = \\dfrac{60 \\div 2}{126 \\div 2} = \\dfrac{30}{63} = \\dfrac{30 \\div 3}{63 \\div 3} = \\dfrac{10}{21}$.\n\nAvec les facteurs premiers : $\\dfrac{2^2 \\times 3 \\times 5}{2 \\times 3^2 \\times 7} = \\dfrac{2 \\times 5}{3 \\times 7} = \\dfrac{10}{21}$. $10$ et $21$ n'ont pas de diviseur commun autre que $1$."
      }
    },
    {
      titre: "Arithmétique et Python",
      texte:
        "En Python, $\\texttt{a \\% b}$ donne le **reste** de la division euclidienne de $a$ par $b$, et $\\texttt{a // b}$ le **quotient**. $a$ est un multiple de $b$ quand le reste est nul.\n\n" +
        "Le test $\\texttt{a \\% b == 0}$ vaut $\\texttt{True}$ (vrai) ou $\\texttt{False}$ (faux) : c'est un **booléen**.\n\n" +
        "```python\ndef est_multiple(a, b):\n    return a % b == 0\n```\n\n" +
        "Plus grand multiple de $a$ inférieur ou égal à $b$ (on ajoute $a$ tant qu'on ne dépasse pas $b$) :\n\n" +
        "```python\ndef plus_grand_multiple(a, b):\n    m = 0\n    while m + a <= b:\n        m = m + a\n    return m\n```",
      exemple: {
        enonce: "Que renvoient $\\texttt{est\\_multiple(91, 7)}$ et $\\texttt{plus\\_grand\\_multiple(7, 50)}$ ?",
        solution: "$91 = 13 \\times 7 + 0$ : le reste est nul, la fonction renvoie $\\texttt{True}$.\n\n$m$ prend les valeurs $0$, $7$, $14$… $49$. Ensuite $49 + 7 = 56 > 50$ : la boucle s'arrête et la fonction renvoie $49$."
      }
    }
  ],

  /* Exercices corrigés en vidéo */
  videos: [
    { titre: "Résoudre un problème avec des nombres pairs ou impairs", type: "Démonstration", youtube: "https://youtu.be/xCLLqx11Le0" },
    { titre: "Déterminer la parité d'un nombre (2)", type: "Parité", youtube: "https://youtu.be/3Gv_z0pM9pM" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ----------
     Chaque série tire des nombres au hasard : on peut la refaire autant qu'on veut.
     type : nom du générateur (voir assets/exercices.js). nb : nombre de questions. */
  exercices: [
    { type: "ar-multiple", titre: "Multiple, diviseur : vrai ou faux ?", etape: "Multiples et diviseurs", nb: 6 },
    { type: "ar-k", titre: "Trouver l'entier k tel que a = k × b", etape: "Multiples et diviseurs", nb: 5 },
    { type: "ar-diviseurs", titre: "Lister tous les diviseurs d'un nombre", etape: "Multiples et diviseurs", nb: 4 },
    { type: "ar-parite", titre: "Pair, impair, ou ça dépend ?", etape: "Parité et raisonnement", nb: 6 },
    { type: "ar-probleme", titre: "Problèmes : barges, cartons, entiers consécutifs", etape: "Parité et raisonnement", nb: 4 },
    { type: "ar-premier", titre: "Premier ou pas ?", etape: "Nombres premiers et fractions", nb: 6 },
    { type: "ar-decomposer", titre: "Décomposer en facteurs premiers", etape: "Nombres premiers et fractions", nb: 5 },
    { type: "ar-irreductible", titre: "Rendre une fraction irréductible", etape: "Nombres premiers et fractions", nb: 5 },
    { type: "ar-python", titre: "Arithmétique en Python", etape: "Python", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ----------
     bonne : numéro de la bonne réponse en partant de 0 (0 = la première). */
  qcm: [
    {
      question: "Quelle phrase est vraie ?",
      choix: ["$56$ est un multiple de $8$", "$8$ est un multiple de $56$", "$56$ est un diviseur de $8$", "$7$ n'est pas un diviseur de $56$"],
      bonne: 0,
      explication: "$56 = 7 \\times 8$ : $56$ est un multiple de $8$ (et de $7$), et $8$ est un **diviseur** de $56$, pas l'inverse."
    },
    {
      question: "« $a$ est un multiple de $b$ » signifie :",
      choix: ["il existe un entier $k$ tel que $a = kb$", "il existe un entier $k$ tel que $b = ka$", "$a$ est plus grand que $b$", "$a + b$ est pair"],
      bonne: 0,
      explication: "C'est la définition : $a = k \\times b$ avec $k$ entier. Par exemple $15 = 5 \\times 3$ est un multiple de $3$."
    },
    {
      question: "Combien $36$ a-t-il de diviseurs positifs ?",
      choix: ["$9$", "$8$", "$6$", "$4$"],
      bonne: 0,
      explication: "$36 = 1 \\times 36 = 2 \\times 18 = 3 \\times 12 = 4 \\times 9 = 6 \\times 6$ : les diviseurs sont $1$, $2$, $3$, $4$, $6$, $9$, $12$, $18$, $36$. Attention, $6$ ne compte qu'une fois."
    },
    {
      question: "$b$ et $c$ sont deux multiples de $5$. Alors $b + c$ :",
      choix: ["est toujours un multiple de $5$", "n'est jamais un multiple de $5$", "est un multiple de $10$", "est un multiple de $5$ seulement si $b = c$"],
      bonne: 0,
      explication: "$b = 5k_1$ et $c = 5k_2$, donc $b + c = 5(k_1 + k_2)$ avec $k_1 + k_2$ entier. Ce n'est pas toujours un multiple de $10$ : $5 + 10 = 15$."
    },
    {
      question: "$n$ est un entier. Le nombre $2n + 7$ est :",
      choix: ["toujours impair", "toujours pair", "pair ou impair selon $n$", "un multiple de $7$"],
      bonne: 0,
      explication: "$2n + 7 = 2n + 6 + 1 = 2(n + 3) + 1$ : de la forme $2k + 1$, il est toujours impair."
    },
    {
      question: "$n$ est un entier. Le nombre $n(n + 1)$ est :",
      choix: ["toujours pair", "toujours impair", "pair ou impair selon $n$", "toujours un multiple de $3$"],
      bonne: 0,
      explication: "Deux entiers consécutifs : l'un des deux est pair, donc leur produit est pair (disjonction des cas : $n$ pair ou $n$ impair). Pour le multiple de $3$, contre-exemple : $1 \\times 2 = 2$."
    },
    {
      question: "Pour démontrer que le carré d'un nombre impair est impair, on écrit :",
      choix: ["$(2k + 1)^2 = 2(2k^2 + 2k) + 1$", "$(2k)^2 = 2 \\times 2k^2$", "$3^2 = 9$ est impair", "$(2k + 1)^2 = 4k^2 + 1$"],
      bonne: 0,
      explication: "$(2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$. Un seul exemple comme $3^2 = 9$ ne démontre rien, et $(2k+1)^2 \\neq 4k^2 + 1$ (il manque le double produit $4k$)."
    },
    {
      question: "Lequel de ces nombres est premier ?",
      choix: ["$53$", "$51$", "$57$", "$91$"],
      bonne: 0,
      explication: "$51 = 3 \\times 17$, $57 = 3 \\times 19$, $91 = 7 \\times 13$. $53$ n'est divisible ni par $2$, ni par $3$, ni par $5$, ni par $7$ : il est premier."
    },
    {
      question: "Le nombre $1$ est-il premier ?",
      choix: ["Non, il n'a qu'un seul diviseur", "Oui, il n'est divisible que par $1$ et lui-même", "Oui, comme tous les nombres impairs", "Non, car il est pair"],
      bonne: 0,
      explication: "Un nombre premier a **exactement deux** diviseurs. $1$ n'en a qu'un : il n'est pas premier."
    },
    {
      question: "La décomposition de $90$ en produit de facteurs premiers est :",
      choix: ["$2 \\times 3^2 \\times 5$", "$9 \\times 10$", "$2 \\times 3 \\times 15$", "$2^2 \\times 3 \\times 5$"],
      bonne: 0,
      explication: "$90 \\div 2 = 45$, $45 \\div 3 = 15$, $15 \\div 3 = 5$. Donc $90 = 2 \\times 3^2 \\times 5$. $9$, $10$ et $15$ ne sont pas premiers, et $2^2 \\times 3 \\times 5 = 60$."
    },
    {
      question: "La forme irréductible de $\\dfrac{42}{56}$ est :",
      choix: ["$\\dfrac{3}{4}$", "$\\dfrac{21}{28}$", "$\\dfrac{6}{8}$", "$\\dfrac{7}{8}$"],
      bonne: 0,
      explication: "$42 = 14 \\times 3$ et $56 = 14 \\times 4$, donc $\\dfrac{42}{56} = \\dfrac{3}{4}$. $\\dfrac{21}{28}$ et $\\dfrac{6}{8}$ sont égales mais se simplifient encore."
    },
    {
      question: "En Python, que vaut $\\texttt{23 \\% 5}$ ?",
      choix: ["$3$", "$4$", "$4{,}6$", "$\\texttt{False}$"],
      bonne: 0,
      explication: "$23 = 4 \\times 5 + 3$ : le reste vaut $3$. Le quotient $4$ s'obtient avec $\\texttt{23 // 5}$."
    },
    { question: "Lequel de ces nombres est un diviseur de $84$ ?", choix: ["$12$", "$16$", "$9$", "$168$"], bonne: 0, explication: "$84 = 12 \\times 7$ : $12$ divise $84$. En revanche $84 \\div 16 = 5{,}25$ et $84 \\div 9$ ne tombent pas juste, et $168 = 2 \\times 84$ est un multiple de $84$, pas un diviseur." },
    { question: "Lequel de ces nombres n'est pas un multiple de $6$ ?", choix: ["$75$", "$0$", "$54$", "$-18$"], bonne: 0, explication: "$75 = 6 \\times 12 + 3$ : la division ne tombe pas juste. Attention, $0 = 0 \\times 6$, $54 = 9 \\times 6$ et $-18 = (-3) \\times 6$ sont bien des multiples de $6$." },
    { question: "Deux barges quittent Mamoudzou en même temps. L'une repart toutes les $30$ minutes, l'autre toutes les $45$ minutes. Au bout de combien de temps repartent-elles de nouveau ensemble ?", choix: ["$90$ minutes", "$75$ minutes", "$15$ minutes", "$1\\,350$ minutes"], bonne: 0, explication: "On cherche le plus petit multiple commun non nul de $30$ et $45$. Multiples de $30$ : $30$, $60$, $90$… Multiples de $45$ : $45$, $90$… C'est $90$ minutes, soit $1$ h $30$." },
    { question: "$n$ est un entier. La somme $n + (n + 1)$ de deux entiers consécutifs est :", choix: ["toujours impaire", "toujours paire", "paire ou impaire selon $n$", "toujours un multiple de $3$"], bonne: 0, explication: "$n + (n + 1) = 2n + 1$ : c'est de la forme $2k + 1$ avec $k = n$ entier, donc un nombre impair." },
    { question: "Le produit de deux nombres impairs est :", choix: ["toujours impair", "toujours pair", "pair ou impair selon les nombres", "toujours premier"], bonne: 0, explication: "Impair $\\times$ impair $=$ impair, par exemple $3 \\times 5 = 15$. Il n'est pas toujours premier : $15 = 3 \\times 5$ ne l'est pas." },
    { question: "Pour démontrer que l'affirmation « tout nombre impair est premier » est fausse, il suffit :", choix: ["de donner un contre-exemple, comme $9 = 3 \\times 3$", "de vérifier que $3$, $5$ et $7$ sont premiers", "d'écrire un nombre impair sous la forme $2k + 1$", "de remarquer que $2$ est premier"], bonne: 0, explication: "Pour montrer qu'une affirmation est fausse, un seul contre-exemple suffit : $9$ est impair mais divisible par $3$, donc pas premier." },
    { question: "Quelle est la réciproque de « si $n$ est un multiple de $6$, alors $n$ est pair » ?", choix: ["« si $n$ est pair, alors $n$ est un multiple de $6$ »", "« si $n$ n'est pas pair, alors $n$ n'est pas un multiple de $6$ »", "« si $n$ est un multiple de $6$, alors $n$ est impair »", "« si $n$ est pair, alors $n$ est un multiple de $2$ »"], bonne: 0, explication: "La réciproque échange l'hypothèse et la conclusion. Ici, elle est fausse : $4$ est pair sans être un multiple de $6$." },
    { question: "Pour savoir si $97$ est premier, jusqu'à quel nombre premier suffit-il de tester les divisions ?", choix: ["$7$", "$11$", "$47$", "$96$"], bonne: 0, explication: "On teste $2$, $3$, $5$ et $7$, car $7^2 = 49 \\leqslant 97$ mais $11^2 = 121 > 97$. Aucun ne divise $97$ : il est premier." },
    { question: "Combien y a-t-il de nombres premiers entre $20$ et $30$ ?", choix: ["$2$", "$3$", "$1$", "$5$"], bonne: 0, explication: "Ce sont $23$ et $29$. Les nombres pairs sont éliminés, ainsi que $21 = 3 \\times 7$, $25 = 5 \\times 5$ et $27 = 3 \\times 9$." },
    { question: "La décomposition de $72$ en produit de facteurs premiers est :", choix: ["$2^3 \\times 3^2$", "$8 \\times 9$", "$2^2 \\times 3^3$", "$2 \\times 6^2$"], bonne: 0, explication: "$72 \\div 2 = 36$, $36 \\div 2 = 18$, $18 \\div 2 = 9$, $9 \\div 3 = 3$, $3 \\div 3 = 1$ : $72 = 2^3 \\times 3^2$. $8$, $9$ et $6$ ne sont pas premiers, et $2^2 \\times 3^3 = 108$." },
    { question: "La forme irréductible de $\\dfrac{60}{84}$ est :", choix: ["$\\dfrac{5}{7}$", "$\\dfrac{10}{14}$", "$\\dfrac{15}{21}$", "$\\dfrac{6}{8}$"], bonne: 0, explication: "$60 = 2^2 \\times 3 \\times 5$ et $84 = 2^2 \\times 3 \\times 7$ : on barre les facteurs communs $2^2 \\times 3$ et il reste $\\dfrac{5}{7}$. $\\dfrac{10}{14}$ et $\\dfrac{15}{21}$ sont égales, mais se simplifient encore." },
    { question: "Vrai ou faux : la fraction $\\dfrac{35}{48}$ est irréductible.", choix: ["Vrai", "Faux"], bonne: 0, explication: "$35 = 5 \\times 7$ et $48 = 2^4 \\times 3$ : aucun facteur premier commun. Le seul diviseur commun positif est $1$." },
    { question: "En Python, que vaut $\\texttt{38 // 6}$ ?", choix: ["$6$", "$2$", "$6{,}33$", "$\\texttt{True}$"], bonne: 0, explication: "$38 = 6 \\times 6 + 2$ : $\\texttt{//}$ donne le quotient entier, $6$. Le reste $2$ s'obtient avec $\\texttt{38 \\% 6}$." },
    { question: "En Python, $n$ est un entier. Le test $\\texttt{n \\% 2 == 1}$ vaut $\\texttt{True}$ lorsque :", choix: ["$n$ est impair", "$n$ est pair", "$n$ est divisible par $2$", "$n$ est premier"], bonne: 0, explication: "$\\texttt{n \\% 2}$ est le reste de la division de $n$ par $2$ : il vaut $1$ exactement quand $n$ est impair. Le nombre premier $2$ donne un reste nul." },
    { question: "Avec la fonction $\\texttt{plus\\_grand\\_multiple}$ du cours, que renvoie $\\texttt{plus\\_grand\\_multiple(7, 30)}$ ?", choix: ["$28$", "$35$", "$4$", "$21$"], bonne: 0, explication: "On ajoute $7$ tant qu'on ne dépasse pas $30$ : $7$, $14$, $21$, $28$. Ensuite $28 + 7 = 35 > 30$, la boucle s'arrête et la fonction renvoie $28$." },
    { question: "Pour démontrer que $n^2 + n$ est pair pour tout entier $n$, on peut :", choix: ["traiter séparément le cas $n$ pair et le cas $n$ impair", "vérifier que c'est vrai pour $n = 1$, $n = 2$ et $n = 3$", "supposer que $n$ est pair, et s'arrêter là", "chercher un contre-exemple"], bonne: 0, explication: "C'est une disjonction des cas : $n^2 + n = n(n + 1)$. Si $n$ est pair, le facteur $n$ est pair ; sinon, $n + 1$ est pair. Des exemples ne suffisent pas à démontrer." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Montrer que $a$ est (ou n'est pas) un multiple de $b$",
      etapes: [
        "Calculer $a \\div b$.",
        "Si le quotient $k$ est entier, écrire $a = k \\times b$ : $a$ est un multiple de $b$.",
        "Sinon, encadrer $a$ entre deux multiples consécutifs de $b$ pour conclure que non."
      ],
      exemple: "$91 = 13 \\times 7$ : multiple de $7$. $45$ est entre $42 = 7 \\times 6$ et $48 = 8 \\times 6$ : pas un multiple de $6$."
    },
    {
      titre: "Démontrer une propriété pour tous les entiers",
      etapes: [
        "Nommer l'entier : « Soit $n$ un entier ».",
        "Traduire l'énoncé : pair $= 2k$, impair $= 2k + 1$, multiple de $b$ $= bk$, consécutifs $= n, n + 1$…",
        "Calculer, puis factoriser pour faire apparaître $b \\times (\\ldots)$ ou $2 \\times (\\ldots) + 1$.",
        "Justifier que ce qui est entre parenthèses est un **entier**, puis conclure."
      ],
      exemple: "$n + (n + 1) + (n + 2) = 3(n + 1)$ : la somme de trois entiers consécutifs est un multiple de $3$."
    },
    {
      titre: "Raisonner par disjonction des cas",
      etapes: [
        "Séparer les cas possibles : $n$ pair ($n = 2k$), puis $n$ impair ($n = 2k + 1$).",
        "Traiter chaque cas jusqu'au bout.",
        "Conclure « dans tous les cas… »."
      ],
      exemple: "$n(n + 1)$ : si $n = 2k$, $n(n+1) = 2k(2k+1)$ ; si $n = 2k + 1$, $n(n+1) = 2(2k+1)(k+1)$. Toujours pair."
    },
    {
      titre: "Savoir si un nombre est premier",
      etapes: [
        "Éliminer $0$ et $1$ : ils ne sont pas premiers.",
        "Tester la division par $2$, $3$, $5$, $7$, $11$… (critères de divisibilité).",
        "S'arrêter dès que le carré du nombre testé dépasse $n$ : si aucun ne divise $n$, il est premier."
      ],
      exemple: "$97$ : ni $2$, ni $3$, ni $5$, ni $7$ ne le divisent, et $11^2 = 121 > 97$. $97$ est premier."
    },
    {
      titre: "Rendre une fraction irréductible",
      etapes: [
        "Chercher un diviseur commun au numérateur et au dénominateur ($2$, $3$, $5$…).",
        "Diviser les deux par ce nombre.",
        "Recommencer jusqu'à ce qu'il n'y ait plus de diviseur commun autre que $1$."
      ],
      exemple: "$\\dfrac{60}{126} = \\dfrac{30}{63} = \\dfrac{10}{21}$."
    }
  ],
  erreurs: [
    "Confondre multiple et diviseur : $8$ est un **diviseur** de $56$, $56$ est un **multiple** de $8$.",
    "Croire qu'un exemple suffit pour démontrer : « $3^2 = 9$ est impair » ne prouve rien pour tous les nombres impairs.",
    "Oublier de justifier que $k$ est un **entier** dans $a = k \\times b$.",
    "Croire que $1$ est premier : il n'a qu'un seul diviseur.",
    "Oublier un diviseur, ou compter deux fois $6$ dans les diviseurs de $36$.",
    "Mettre des facteurs non premiers dans une décomposition : $90 = 9 \\times 10$ n'est pas une décomposition en facteurs premiers.",
    "S'arrêter trop tôt : $\\dfrac{21}{28}$ n'est pas irréductible, il faut encore diviser par $7$.",
    "Confondre $\\texttt{a \\% b}$ (le reste) et $\\texttt{a // b}$ (le quotient) en Python."
  ]
};
