/*
  CHAPITRE : Seconde — Arithmétique
  ----------------------------------
  Chapitre 4 de la progression spiralée 2026-2027 (programme de Seconde 2026 : multiples, diviseurs,
  nombres pairs et impairs, fractions irréductibles ; les nombres premiers sont hors programme).
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce, programme Python entre ```python et ```).
  Pas encore de vidéo de la chaîne ni de PDF pour ce chapitre : les vidéos sont celles d'Yvan Monka.
  Ajouter les liens dans playlist, pdfs et videos le moment venu.
  Les générateurs d'exercices commencent par « ar- » dans assets/exercices.js ; figures « ar-cours-… », « ar-meth-… », « ar-qcm-… ».
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-arithmetique"] = {
  niveau: "Seconde",
  numero: 4,
  titre: "Arithmétique",
  accroche: "Multiples, diviseurs, nombres pairs et impairs, fractions irréductibles : raisonner sur les entiers et rédiger ses premières démonstrations.",

  playlist: "", // lien de la playlist YouTube du chapitre
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : arithmétique (PDF)", url: "https://www.maths-et-tiques.fr/telech/19NombreEntierM.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Multiples et diviseurs",
      figure: ["ar-cours-rectangles", "multiples-barges"],
      video: { titre: "Vidéo d'Yvan Monka : démontrer qu'un nombre est un multiple (ou un diviseur)", youtube: "https://youtu.be/umlnJooSDas" },
      texte:
        "Dans ce chapitre, on travaille avec les **entiers** : $\\mathbb{N}$ (entiers naturels $0$, $1$, $2$…) et $\\mathbb{Z}$ (entiers relatifs, positifs ou négatifs).\n\n" +
        "Soit $a$ et $b$ deux entiers. On dit que $a$ est un **multiple** de $b$ s'il existe un entier $k$ tel que $a = k \\times b$.\n\n" +
        "On dit alors aussi que $b$ est un **diviseur** de $a$, ou que $a$ est **divisible** par $b$ : ces trois phrases disent la même chose.\n\n" +
        "- Pour le vérifier, on calcule $a \\div b$ : le résultat doit être un **entier**.\n" +
        "- $0$ est un multiple de tous les entiers ($0 = 0 \\times b$), et $1$ divise tous les entiers. $-12 = (-3) \\times 4$ est aussi un multiple de $4$.\n" +
        "- Critères de divisibilité (rappels) : par $2$ si le dernier chiffre est pair ; par $5$ s'il est $0$ ou $5$ ; par $10$ s'il est $0$ ; par $3$ (ou par $9$) si la somme des chiffres est un multiple de $3$ (ou de $9$).\n\n" +
        "Sur les figures : $12$ points rangés en rectangles donnent les diviseurs de $12$ ; puis les multiples de $15$ (au-dessus) et de $20$ (en dessous). Le premier multiple commun est $60$ : deux barges qui partent toutes les $15$ et toutes les $20$ minutes se retrouvent au bout d'une heure.",
      exemple: {
        enonce: "Vrai ou faux ? $84$ est un multiple de $7$ ; $6$ est un diviseur de $45$ ; $3\\,471$ est divisible par $3$.",
        solution: "- $84 = 12 \\times 7$ avec $12$ entier : **vrai**.\n- $7 \\times 6 = 42$ et $8 \\times 6 = 48$ : il n'existe pas d'entier $k$ tel que $45 = k \\times 6$. **Faux**.\n- $3 + 4 + 7 + 1 = 15$ est un multiple de $3$ : **vrai** ($3\\,471 = 3 \\times 1\\,157$)."
      }
    },
    {
      titre: "Démonstration : la somme de deux multiples",
      figure: "ar-cours-somme",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que la somme de deux multiples d'un entier est un multiple de cet entier", youtube: "https://youtu.be/4an6JTwrJV4" },
      texte:
        "**Propriété** : la somme de deux multiples d'un entier $a$ est un multiple de $a$.\n\n" +
        "**Démonstration** (avec $a = 3$). Soit $b$ et $c$ deux multiples de $3$.\n" +
        "- Il existe un entier $k_1$ tel que $b = 3k_1$, et un entier $k_2$ tel que $c = 3k_2$.\n" +
        "- Alors $b + c = 3k_1 + 3k_2 = 3(k_1 + k_2)$.\n" +
        "- $k_1 + k_2$ est un entier (somme de deux entiers). Donc $b + c = 3k$ avec $k = k_1 + k_2$ entier : $b + c$ est un multiple de $3$.\n\n" +
        "Sur la figure : $b$ se range en $4$ groupes de $3$, $c$ en $2$ groupes de $3$ ; ensemble, ils forment $4 + 2 = 6$ groupes de $3$. La même rédaction marche pour n'importe quel entier $a$ à la place de $3$.",
      exemple: {
        enonce: "$700$ et $21$ sont des multiples de $7$. Sans poser la division, justifier que $721$ est un multiple de $7$.",
        solution: "$721 = 700 + 21$ est la somme de deux multiples de $7$ ($700 = 100 \\times 7$ et $21 = 3 \\times 7$), donc c'est un multiple de $7$ : $721 = 7 \\times (100 + 3) = 103 \\times 7$."
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
        "Pour montrer qu'une affirmation est **fausse**, un seul **contre-exemple** suffit.\n\n" +
        "**Division euclidienne** : $a = b \\times q + r$ avec $0 \\leqslant r < b$. Le quotient $q$ donne le nombre de paquets complets de $b$, le reste $r$ ce qui reste : $a$ est un multiple de $b$ quand $r = 0$.",
      exemple: {
        enonce: "Démontrer que la somme de trois entiers consécutifs est toujours un multiple de $3$.",
        solution: "Soit $n$, $n + 1$ et $n + 2$ trois entiers consécutifs.\n\n$S = n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)$.\n\n$S = 3k$ avec $k = n + 1$ entier : $S$ est un multiple de $3$."
      }
    },
    {
      titre: "Nombres pairs, nombres impairs",
      figure: "ar-cours-parite",
      video: { titre: "Vidéo d'Yvan Monka : déterminer la parité d'un nombre", youtube: "https://youtu.be/cE3gOMZ0Kko" },
      texte:
        "Un nombre **pair** est un multiple de $2$ : il s'écrit $2k$, avec $k$ entier. Un nombre **impair** n'est pas pair : il s'écrit $2k + 1$, avec $k$ entier. Sur la figure, un nombre pair se range en paires, un nombre impair laisse un point tout seul.\n\n" +
        "- pair $+$ pair $=$ pair ; impair $+$ impair $=$ pair (les deux points seuls forment une paire) ; pair $+$ impair $=$ impair.\n" +
        "- pair $\\times$ n'importe quel entier $=$ pair ; impair $\\times$ impair $=$ impair.\n\n" +
        "**Disjonction des cas** : quand on ne connaît pas la parité de $n$, on traite les deux cas séparément ($n$ pair, puis $n$ impair). Par exemple, $n(n + 1)$ est toujours pair : un des deux entiers consécutifs est pair.",
      exemple: {
        enonce: "Quelle est la parité de $5\\,678\\,984^2 + 1$ ?",
        solution: "$5\\,678\\,984$ est pair (il se termine par $4$). Pair $\\times$ pair $=$ pair, donc $5\\,678\\,984^2 = 2k$ avec $k$ entier.\n\nAlors $5\\,678\\,984^2 + 1 = 2k + 1$ est **impair**."
      }
    },
    {
      titre: "Démonstration : le carré d'un nombre impair est impair",
      figure: "ar-cours-carre-impair",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que le carré d'un nombre impair est impair", youtube: "https://youtu.be/eKo1MpX9ktw" },
      texte:
        "**Propriété** : le carré d'un nombre impair est impair.\n\n" +
        "**Démonstration**. Soit $a$ un nombre impair : il existe un entier $k$ tel que $a = 2k + 1$.\n" +
        "- $a^2 = (2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$.\n" +
        "- $k' = 2k^2 + 2k$ est un entier, donc $a^2 = 2k' + 1$ : $a^2$ est impair.\n\n" +
        "Sur la figure, le carré de côté $2k + 1$ se découpe en un carré de $4k^2$ cases, deux bandes de $2k$ cases et une case de coin : $4k^2 + 4k$ est pair, la case de coin le rend impair.\n\n" +
        "**Implication et réciproque** : « si $a$ est impair, alors $a^2$ est impair » est vraie. Sa **réciproque**, « si $a^2$ est impair, alors $a$ est impair », est vraie aussi. Mais attention : la réciproque d'une propriété vraie n'est pas toujours vraie (« si $a$ est un multiple de $4$, alors $a$ est pair » est vraie, sa réciproque est fausse : $6$).",
      exemple: {
        enonce: "Démontrer que le produit de deux entiers consécutifs est pair.",
        solution: "Soit $n$ et $n + 1$ deux entiers consécutifs. **Disjonction des cas** :\n\n- si $n$ est pair, $n = 2k$ et $n(n + 1) = 2k(2k + 1) = 2k_1$ avec $k_1 = k(2k + 1)$ entier ;\n- si $n$ est impair, $n = 2k + 1$ et $n(n + 1) = (2k + 1)(2k + 2) = 2(2k + 1)(k + 1)$.\n\nDans tous les cas, $n(n + 1)$ est pair."
      }
    },
    {
      titre: "Fraction irréductible",
      figure: "ar-cours-fraction",
      video: { titre: "Vidéo d'Yvan Monka : simplifier une fraction", youtube: "https://youtu.be/g5oV2wC6RfU" },
      texte:
        "Une fraction $\\dfrac{a}{b}$ est **irréductible** quand $a$ et $b$ n'ont pas de diviseur commun autre que $1$.\n\n" +
        "- Pour la rendre irréductible, on divise le numérateur et le dénominateur par un même diviseur commun ($2$, $3$, $5$, $10$… : les critères de divisibilité aident), et on recommence tant que c'est possible.\n" +
        "- Si l'on repère directement un grand diviseur commun, on va plus vite : $\\dfrac{42}{56} = \\dfrac{14 \\times 3}{14 \\times 4} = \\dfrac{3}{4}$.\n\n" +
        "Sur la figure : $8$ parts sur $12$, regroupées par paquets de $4$, font $2$ paquets sur $3$ : $\\dfrac{8}{12} = \\dfrac{2}{3}$.\n\n" +
        "Un résultat fractionnaire se donne **toujours** sous forme irréductible.",
      exemple: {
        enonce: "Rendre irréductible la fraction $\\dfrac{60}{126}$.",
        solution: "$60$ et $126$ sont pairs : $\\dfrac{60}{126} = \\dfrac{60 \\div 2}{126 \\div 2} = \\dfrac{30}{63}$.\n\n$3 + 0 = 3$ et $6 + 3 = 9$ : ils sont divisibles par $3$. $\\dfrac{30}{63} = \\dfrac{30 \\div 3}{63 \\div 3} = \\dfrac{10}{21}$.\n\nLes diviseurs de $10$ sont $1$, $2$, $5$, $10$ ; aucun autre que $1$ ne divise $21$ : $\\dfrac{10}{21}$ est irréductible."
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
    },
    {
      titre: "Pour aller plus loin (hors programme) : les nombres premiers",
      video: { titre: "Vidéo d'Yvan Monka : le cours complet d'arithmétique (ancien programme)", youtube: "https://youtu.be/nZNAehFmrBE" },
      texte:
        "Cette partie n'est pas au programme de Seconde : elle n'est pas dans les exercices.\n\n" +
        "Un nombre **premier** est un entier naturel qui a **exactement deux** diviseurs positifs : $1$ et lui-même. Les premiers sont $2$, $3$, $5$, $7$, $11$, $13$, $17$… et $1$ n'est **pas** premier.\n\n" +
        "Tout entier $n \\geqslant 2$ s'écrit comme un produit de nombres premiers : $60 = 2^2 \\times 3 \\times 5$. C'est une autre façon de trouver des diviseurs communs pour simplifier une fraction.",
      exemple: {
        enonce: "$91$ est-il premier ?",
        solution: "$91 = 7 \\times 13$ : il a d'autres diviseurs que $1$ et $91$, il n'est **pas** premier."
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
    { type: "ar-multiple", titre: "Multiples, diviseurs, critères de divisibilité", etape: "Multiples et diviseurs", nb: 6 },
    { type: "ar-k", titre: "Trouver l'entier k tel que a = k × b", etape: "Multiples et diviseurs", nb: 5 },
    { type: "ar-diviseurs", titre: "Lister tous les diviseurs d'un nombre", etape: "Multiples et diviseurs", nb: 4 },
    { type: "ar-parite", titre: "Pair, impair, ou ça dépend ?", etape: "Parité et raisonnement", nb: 6 },
    { type: "ar-demo", titre: "Les démonstrations du chapitre", etape: "Parité et raisonnement", nb: 5 },
    { type: "ar-probleme", titre: "Problèmes : barges, rangements, bus, partages", etape: "Parité et raisonnement", nb: 5 },
    { type: "ar-irreductible", titre: "Rendre une fraction irréductible", etape: "Fractions", nb: 5 },
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
      question: "La figure montre $18$ points rangés en rectangles. Combien $18$ a-t-il de diviseurs positifs ?",
      figure: "ar-qcm-rectangles",
      choix: ["$6$", "$3$", "$4$", "$5$"],
      bonne: 0,
      explication: "Chaque rectangle donne **deux** diviseurs : $1 \\times 18$, $2 \\times 9$, $3 \\times 6$. Les diviseurs de $18$ sont $1$, $2$, $3$, $6$, $9$, $18$ : il y en a $6$."
    },
    {
      question: "$b$ et $c$ sont deux multiples de $5$. Alors $b + c$ :",
      choix: ["est toujours un multiple de $5$", "n'est jamais un multiple de $5$", "est un multiple de $10$", "est un multiple de $5$ seulement si $b = c$"],
      bonne: 0,
      explication: "$b = 5k_1$ et $c = 5k_2$, donc $b + c = 5(k_1 + k_2)$ avec $k_1 + k_2$ entier. Ce n'est pas toujours un multiple de $10$ : $5 + 10 = 15$."
    },
    {
      question: "Sur la figure, $b$ et $c$ sont des multiples de $3$. Alors $b + c$ est égal à :",
      figure: "ar-cours-somme",
      choix: ["$3 \\times (4 + 2)$", "$3 \\times 4 \\times 2$", "$6 \\times (4 + 2)$", "$3 + 4 + 2$"],
      bonne: 0,
      explication: "$b = 3 \\times 4$ et $c = 3 \\times 2$ : $b + c = 3 \\times 4 + 3 \\times 2 = 3 \\times (4 + 2) = 18$. On met les $4 + 2 = 6$ groupes de $3$ bout à bout."
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
      question: "D'après la figure, pourquoi la somme de deux nombres impairs est-elle paire ?",
      figure: "ar-cours-parite",
      choix: ["Les deux points restés seuls forment une paire", "Parce que $1 + 1 = 1$", "Parce qu'un nombre impair est un multiple de $2$", "Ce n'est pas toujours vrai"],
      bonne: 0,
      explication: "$(2k + 1) + (2k' + 1) = 2k + 2k' + 2 = 2(k + k' + 1)$ : les deux « $+ 1$ », les points seuls de la figure, forment une nouvelle paire. La somme est paire."
    },
    {
      question: "Pour démontrer que le carré d'un nombre impair est impair, on écrit :",
      choix: ["$(2k + 1)^2 = 2(2k^2 + 2k) + 1$", "$(2k)^2 = 2 \\times 2k^2$", "$3^2 = 9$ est impair", "$(2k + 1)^2 = 4k^2 + 1$"],
      bonne: 0,
      explication: "$(2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$. Un seul exemple comme $3^2 = 9$ ne démontre rien, et $(2k+1)^2 \\neq 4k^2 + 1$ (il manque le double produit $4k$)."
    },
    {
      question: "D'après la figure, le carré de côté $2k + 1$ contient :",
      figure: "ar-cours-carre-impair",
      choix: ["$4k^2 + 4k + 1$ cases", "$4k^2 + 1$ cases", "$4k^2 + 2k + 1$ cases", "$2k^2 + 4k + 1$ cases"],
      bonne: 0,
      explication: "Un carré de $2k \\times 2k = 4k^2$ cases, deux bandes de $2k$ cases ($4k$ en tout) et la case du coin : $(2k + 1)^2 = 4k^2 + 4k + 1$."
    },
    {
      question: "La forme irréductible de $\\dfrac{42}{56}$ est :",
      choix: ["$\\dfrac{3}{4}$", "$\\dfrac{21}{28}$", "$\\dfrac{6}{8}$", "$\\dfrac{7}{8}$"],
      bonne: 0,
      explication: "$42 = 14 \\times 3$ et $56 = 14 \\times 4$, donc $\\dfrac{42}{56} = \\dfrac{3}{4}$. $\\dfrac{21}{28}$ et $\\dfrac{6}{8}$ sont égales mais se simplifient encore."
    },
    {
      question: "Quelle fraction irréductible la barre représente-t-elle ?",
      figure: "ar-qcm-barre",
      choix: ["$\\dfrac{2}{5}$", "$\\dfrac{6}{15}$", "$\\dfrac{3}{5}$", "$\\dfrac{2}{3}$"],
      bonne: 0,
      explication: "$6$ parts coloriées sur $15$ : $\\dfrac{6}{15} = \\dfrac{6 \\div 3}{15 \\div 3} = \\dfrac{2}{5}$. $\\dfrac{6}{15}$ est égale, mais elle n'est pas irréductible."
    },
    {
      question: "En Python, que vaut $\\texttt{23 \\% 5}$ ?",
      choix: ["$3$", "$4$", "$4{,}6$", "$\\texttt{False}$"],
      bonne: 0,
      explication: "$23 = 4 \\times 5 + 3$ : le reste vaut $3$. Le quotient $4$ s'obtient avec $\\texttt{23 // 5}$."
    },
    { question: "Lequel de ces nombres est un diviseur de $84$ ?", choix: ["$12$", "$16$", "$9$", "$168$"], bonne: 0, explication: "$84 = 12 \\times 7$ : $12$ divise $84$. En revanche $84 \\div 16 = 5{,}25$ et $84 \\div 9$ ne tombent pas juste, et $168 = 2 \\times 84$ est un multiple de $84$, pas un diviseur." },
    { question: "Lequel de ces nombres n'est pas un multiple de $6$ ?", choix: ["$75$", "$0$", "$54$", "$-18$"], bonne: 0, explication: "$75 = 6 \\times 12 + 3$ : la division ne tombe pas juste. Attention, $0 = 0 \\times 6$, $54 = 9 \\times 6$ et $-18 = (-3) \\times 6$ sont bien des multiples de $6$." },
    { question: "Lequel de ces nombres appartient à $\\mathbb{Z}$ mais pas à $\\mathbb{N}$ ?", choix: ["$-7$", "$0$", "$12$", "$\\dfrac{7}{2}$"], bonne: 0, explication: "$-7$ est un entier négatif : il est dans $\\mathbb{Z}$, pas dans $\\mathbb{N}$. $0$ et $12$ sont des entiers naturels, et $\\dfrac{7}{2} = 3{,}5$ n'est pas un entier." },
    { question: "Lequel de ces nombres est divisible par $9$ ?", choix: ["$5\\,841$", "$5\\,843$", "$4\\,112$", "$2\\,707$"], bonne: 0, explication: "$5 + 8 + 4 + 1 = 18$ est un multiple de $9$ : $5\\,841 = 9 \\times 649$. Les sommes des chiffres des autres ($20$, $8$, $16$) ne sont pas des multiples de $9$." },
    { question: "Le nombre $2\\,345$ est divisible par :", choix: ["$5$", "$2$", "$3$", "$10$"], bonne: 0, explication: "Il se termine par $5$ : il est divisible par $5$ ($2\\,345 = 5 \\times 469$). Il est impair (pas divisible par $2$ ni par $10$), et $2 + 3 + 4 + 5 = 14$ n'est pas un multiple de $3$." },
    { question: "Deux barges quittent Mamoudzou en même temps. L'une repart toutes les $30$ minutes, l'autre toutes les $45$ minutes. Au bout de combien de temps repartent-elles de nouveau ensemble ?", figure: "ar-qcm-sauts", choix: ["$90$ minutes", "$75$ minutes", "$15$ minutes", "$1\\,350$ minutes"], bonne: 0, explication: "On cherche le plus petit multiple commun non nul de $30$ et $45$. Multiples de $30$ : $30$, $60$, $90$… Multiples de $45$ : $45$, $90$… C'est $90$ minutes, soit $1$ h $30$. Sur la figure, qui s'arrête à $80$ minutes, les sauts ne se rejoignent pas encore : il faut continuer jusqu'à $90$." },
    { question: "Le plus grand multiple de $13$ inférieur ou égal à $100$ est :", choix: ["$91$", "$104$", "$100$", "$78$"], bonne: 0, explication: "$13 \\times 7 = 91 \\leqslant 100$ et $13 \\times 8 = 104 > 100$. $100$ n'est pas un multiple de $13$, et $78 = 13 \\times 6$ n'est pas le plus grand." },
    { question: "Combien y a-t-il de multiples de $7$ compris entre $1$ et $100$ ?", choix: ["$14$", "$15$", "$13$", "$7$"], bonne: 0, explication: "$7 \\times 14 = 98 \\leqslant 100$ et $7 \\times 15 = 105 > 100$ : ce sont $7 \\times 1$, $7 \\times 2$, …, $7 \\times 14$. Il y en a $14$." },
    { question: "$n$ est un entier. La somme $n + (n + 1)$ de deux entiers consécutifs est :", choix: ["toujours impaire", "toujours paire", "paire ou impaire selon $n$", "toujours un multiple de $3$"], bonne: 0, explication: "$n + (n + 1) = 2n + 1$ : c'est de la forme $2k + 1$ avec $k = n$ entier, donc un nombre impair." },
    { question: "Le produit de deux nombres impairs est :", choix: ["toujours impair", "toujours pair", "pair ou impair selon les nombres", "toujours un multiple de $3$"], bonne: 0, explication: "Impair $\\times$ impair $=$ impair : $(2k + 1)(2k' + 1) = 2(2kk' + k + k') + 1$. Exemple : $3 \\times 5 = 15$. Ce n'est pas toujours un multiple de $3$ : $5 \\times 7 = 35$." },
    { question: "Pour démontrer que l'affirmation « tout multiple de $3$ est impair » est fausse, il suffit :", choix: ["de donner un contre-exemple, comme $6 = 2 \\times 3$", "de vérifier que $3$, $9$ et $15$ sont impairs", "d'écrire un multiple de $3$ sous la forme $3k$", "de remarquer que $3$ est impair"], bonne: 0, explication: "Pour montrer qu'une affirmation est fausse, un seul contre-exemple suffit : $6$ est un multiple de $3$, et il est pair." },
    { question: "Quelle est la réciproque de « si $n$ est un multiple de $6$, alors $n$ est pair » ?", choix: ["« si $n$ est pair, alors $n$ est un multiple de $6$ »", "« si $n$ n'est pas pair, alors $n$ n'est pas un multiple de $6$ »", "« si $n$ est un multiple de $6$, alors $n$ est impair »", "« si $n$ est pair, alors $n$ est un multiple de $2$ »"], bonne: 0, explication: "La réciproque échange l'hypothèse et la conclusion. Ici, elle est fausse : $4$ est pair sans être un multiple de $6$." },
    { question: "La forme irréductible de $\\dfrac{60}{84}$ est :", choix: ["$\\dfrac{5}{7}$", "$\\dfrac{10}{14}$", "$\\dfrac{15}{21}$", "$\\dfrac{6}{8}$"], bonne: 0, explication: "$60 = 12 \\times 5$ et $84 = 12 \\times 7$ : on simplifie par $12$ et il reste $\\dfrac{5}{7}$. $\\dfrac{10}{14}$ et $\\dfrac{15}{21}$ sont égales, mais se simplifient encore." },
    { question: "Laquelle de ces fractions est irréductible ?", choix: ["$\\dfrac{35}{48}$", "$\\dfrac{35}{49}$", "$\\dfrac{36}{48}$", "$\\dfrac{35}{45}$"], bonne: 0, explication: "Les diviseurs de $35$ sont $1$, $5$, $7$, $35$ : aucun autre que $1$ ne divise $48$. En revanche $\\dfrac{35}{49}$ se simplifie par $7$, $\\dfrac{36}{48}$ par $12$ et $\\dfrac{35}{45}$ par $5$." },
    { question: "En Python, que vaut $\\texttt{38 // 6}$ ?", choix: ["$6$", "$2$", "$6{,}33$", "$\\texttt{True}$"], bonne: 0, explication: "$38 = 6 \\times 6 + 2$ : $\\texttt{//}$ donne le quotient entier, $6$. Le reste $2$ s'obtient avec $\\texttt{38 \\% 6}$." },
    { question: "En Python, $n$ est un entier. Le test $\\texttt{n \\% 2 == 1}$ vaut $\\texttt{True}$ lorsque :", choix: ["$n$ est impair", "$n$ est pair", "$n$ est divisible par $2$", "$n$ est un multiple de $3$"], bonne: 0, explication: "$\\texttt{n \\% 2}$ est le reste de la division de $n$ par $2$ : il vaut $1$ exactement quand $n$ est impair." },
    { question: "Avec la fonction $\\texttt{plus\\_grand\\_multiple}$ du cours, que renvoie $\\texttt{plus\\_grand\\_multiple(7, 30)}$ ?", choix: ["$28$", "$35$", "$4$", "$21$"], bonne: 0, explication: "On ajoute $7$ tant qu'on ne dépasse pas $30$ : $7$, $14$, $21$, $28$. Ensuite $28 + 7 = 35 > 30$, la boucle s'arrête et la fonction renvoie $28$." },
    { question: "Pour démontrer que $n^2 + n$ est pair pour tout entier $n$, on peut :", choix: ["traiter séparément le cas $n$ pair et le cas $n$ impair", "vérifier que c'est vrai pour $n = 1$, $n = 2$ et $n = 3$", "supposer que $n$ est pair, et s'arrêter là", "chercher un contre-exemple"], bonne: 0, explication: "C'est une disjonction des cas : $n^2 + n = n(n + 1)$. Si $n$ est pair, le facteur $n$ est pair ; sinon, $n + 1$ est pair. Des exemples ne suffisent pas à démontrer." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Montrer que $a$ est (ou n'est pas) un multiple de $b$",
      etapes: [
        "Calculer $a \\div b$ (ou utiliser un critère de divisibilité).",
        "Si le quotient $k$ est entier, écrire $a = k \\times b$ : $a$ est un multiple de $b$.",
        "Sinon, encadrer $a$ entre deux multiples consécutifs de $b$ pour conclure que non."
      ],
      exemple: "$91 = 13 \\times 7$ : multiple de $7$. $45$ est entre $42 = 7 \\times 6$ et $48 = 8 \\times 6$ : pas un multiple de $6$ (figure).",
      figure: "ar-meth-reste"
    },
    {
      titre: "Utiliser les critères de divisibilité",
      etapes: [
        "Par $2$ : dernier chiffre pair. Par $5$ : dernier chiffre $0$ ou $5$. Par $10$ : dernier chiffre $0$.",
        "Par $3$ : la somme des chiffres est un multiple de $3$. Par $9$ : elle est un multiple de $9$.",
        "Par $4$ : le nombre formé par les deux derniers chiffres est un multiple de $4$."
      ],
      exemple: "$4\\,572$ : $4 + 5 + 7 + 2 = 18$, il est divisible par $3$ et par $9$ ; $72 = 4 \\times 18$, il est divisible par $4$."
    },
    {
      titre: "Lister les diviseurs d'un nombre",
      etapes: [
        "Écrire $n = 1 \\times n$, puis tester $2$, $3$, $4$… : chaque produit $a \\times b = n$ donne **deux** diviseurs.",
        "S'arrêter quand le premier facteur dépasse le second.",
        "Ranger les diviseurs dans l'ordre, sans en compter un deux fois ($6 \\times 6 = 36$ ne donne que $6$)."
      ],
      exemple: "$12 = 1 \\times 12 = 2 \\times 6 = 3 \\times 4$ : les diviseurs de $12$ sont $1$, $2$, $3$, $4$, $6$, $12$.",
      figure: "ar-cours-rectangles"
    },
    {
      titre: "Démontrer une propriété pour tous les entiers",
      etapes: [
        "Nommer l'entier : « Soit $n$ un entier ».",
        "Traduire l'énoncé : pair $= 2k$, impair $= 2k + 1$, multiple de $b$ $= bk$, consécutifs $= n, n + 1$…",
        "Calculer, puis factoriser pour faire apparaître $b \\times (\\ldots)$ ou $2 \\times (\\ldots) + 1$.",
        "Justifier que ce qui est entre parenthèses est un **entier**, puis conclure."
      ],
      exemple: "$3k_1 + 3k_2 = 3(k_1 + k_2)$ : la somme de deux multiples de $3$ est un multiple de $3$.",
      figure: "ar-cours-somme"
    },
    {
      titre: "Raisonner par disjonction des cas",
      etapes: [
        "Séparer les cas possibles : $n$ pair ($n = 2k$), puis $n$ impair ($n = 2k + 1$).",
        "Traiter chaque cas jusqu'au bout.",
        "Conclure « dans tous les cas… »."
      ],
      exemple: "$n(n + 1)$ : si $n = 2k$, $n(n+1) = 2k(2k+1)$ ; si $n = 2k + 1$, $n(n+1) = 2(2k+1)(k+1)$. Toujours pair.",
      figure: "ar-cours-parite"
    },
    {
      titre: "Rendre une fraction irréductible",
      etapes: [
        "Chercher un diviseur commun au numérateur et au dénominateur ($2$, $3$, $5$, $10$… avec les critères).",
        "Diviser les deux par ce nombre.",
        "Recommencer jusqu'à ce qu'il n'y ait plus de diviseur commun autre que $1$."
      ],
      exemple: "$\\dfrac{60}{126} = \\dfrac{30}{63} = \\dfrac{10}{21}$ (on divise par $2$, puis par $3$).",
      figure: "ar-cours-fraction"
    }
  ],
  erreurs: [
    "Confondre multiple et diviseur : $8$ est un **diviseur** de $56$, $56$ est un **multiple** de $8$.",
    "Croire qu'un exemple suffit pour démontrer : « $3^2 = 9$ est impair » ne prouve rien pour tous les nombres impairs.",
    "Oublier de justifier que $k$ est un **entier** dans $a = k \\times b$.",
    "Oublier les entiers négatifs : $-12 = (-3) \\times 4$ est un multiple de $4$.",
    "Oublier un diviseur, ou compter deux fois $6$ dans les diviseurs de $36$.",
    "Croire qu'un nombre qui se termine par $3$ est divisible par $3$ : $13$ ne l'est pas, on regarde la **somme** des chiffres.",
    "Écrire $(2k + 1)^2 = 4k^2 + 1$ : il manque le double produit $4k$.",
    "S'arrêter trop tôt : $\\dfrac{21}{28}$ n'est pas irréductible, il faut encore diviser par $7$.",
    "Confondre $\\texttt{a \\% b}$ (le reste) et $\\texttt{a // b}$ (le quotient) en Python."
  ]
};
