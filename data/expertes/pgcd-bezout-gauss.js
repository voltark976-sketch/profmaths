/*
  CHAPITRE : Terminale maths expertes — PGCD, théorèmes de Bézout et de Gauss
  ----------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme officiel de maths expertes (BO spécial n° 8 du 25 juillet 2019), « Arithmétique » :
  PGCD, algorithme d'Euclide, couples premiers entre eux, théorèmes de Bézout et de Gauss,
  inverse modulo n, équations diophantiennes simples. Démonstrations du programme : PGCD = au + bv, théorème de Gauss.
  video : vidéos d'Yvan Monka. Générateurs : préfixe xb- dans assets/exercices-expertes.js ; figure "xb-cours-euclide".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["expertes-pgcd-bezout-gauss"] = {
  niveau: "Terminale maths expertes",
  numero: 7,
  titre: "PGCD, théorèmes de Bézout et de Gauss",
  accroche: "L'algorithme d'Euclide, les entiers premiers entre eux et deux théorèmes clés pour résoudre $ax + by = c$.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : PGCD et nombres premiers (PDF)", url: "https://www.maths-et-tiques.fr/telech/20ArithTE2.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Le PGCD de deux entiers",
      video: { titre: "Vidéo d'Yvan Monka : déterminer le PGCD de deux nombres (diviseurs)", youtube: "https://youtu.be/sC2iPY27Ym0" },
      texte:
        "Soit $a$ et $b$ deux entiers non tous deux nuls. Leurs diviseurs communs positifs sont en nombre fini : le plus grand est le **PGCD** de $a$ et $b$, noté $\\text{PGCD}(a\\,;b)$.\n\n" +
        "- $\\text{PGCD}(a\\,;b) = \\text{PGCD}(b\\,;a) = \\text{PGCD}(|a|\\,;|b|)$.\n" +
        "- Si $b$ divise $a$ ($b > 0$), alors $\\text{PGCD}(a\\,;b) = b$.\n" +
        "- Les **diviseurs communs** à $a$ et $b$ sont exactement les **diviseurs du PGCD** (conséquence de Bézout, plus loin).",
      exemple: {
        enonce: "Détermine $\\text{PGCD}(24\\,;36)$ en listant les diviseurs.",
        solution: "Diviseurs de $24$ : $1$, $2$, $3$, $4$, $6$, $8$, $12$, $24$. Diviseurs de $36$ : $1$, $2$, $3$, $4$, $6$, $9$, $12$, $18$, $36$.\n\nLe plus grand diviseur commun est $12$."
      }
    },
    {
      titre: "L'algorithme d'Euclide",
      figure: "xb-cours-euclide",
      video: { titre: "Vidéo d'Yvan Monka : déterminer le PGCD avec l'algorithme d'Euclide", youtube: "https://youtu.be/npG_apkI18o" },
      texte:
        "**Propriété.** Si $a = bq + r$, alors $\\text{PGCD}(a\\,;b) = \\text{PGCD}(b\\,;r)$.\n\n" +
        "En effet, un diviseur commun à $a$ et $b$ divise $r = a - bq$, et un diviseur commun à $b$ et $r$ divise $a = bq + r$ : les diviseurs communs sont les mêmes.\n\n" +
        "**Algorithme.** On remplace $(a\\,;b)$ par $(b\\,;r)$ tant que $r \\neq 0$. Les restes diminuent, donc on finit par trouver un reste nul : le **PGCD est le dernier reste non nul**.\n\n" +
        "```python\ndef pgcd(a, b):\n    while b != 0:\n        a, b = b, a % b\n    return a\n```",
      exemple: {
        enonce: "Calcule $\\text{PGCD}(546\\,;210)$.",
        solution: "$546 = 210 \\times 2 + 126$, puis $210 = 126 \\times 1 + 84$, $126 = 84 \\times 1 + 42$, $84 = 42 \\times 2 + 0$.\n\nLe dernier reste non nul est $42$ : $\\text{PGCD}(546\\,;210) = 42$."
      }
    },
    {
      titre: "Entiers premiers entre eux",
      video: { titre: "Vidéo d'Yvan Monka : vérifier si deux nombres sont premiers entre eux", youtube: "https://youtu.be/Rno1eANN7aY" },
      texte:
        "Deux entiers $a$ et $b$ sont **premiers entre eux** si $\\text{PGCD}(a\\,;b) = 1$ : leur seul diviseur commun positif est $1$.\n\n" +
        "- Deux entiers consécutifs sont toujours premiers entre eux.\n" +
        "- Si $d = \\text{PGCD}(a\\,;b)$, on peut écrire $a = da'$ et $b = db'$ avec $a'$ et $b'$ **premiers entre eux**. Par exemple, $\\dfrac{a}{b} = \\dfrac{a'}{b'}$ est la forme irréductible de la fraction.",
      exemple: {
        enonce: "$35$ et $48$ sont-ils premiers entre eux ?",
        solution: "$48 = 35 \\times 1 + 13$, $35 = 13 \\times 2 + 9$, $13 = 9 \\times 1 + 4$, $9 = 4 \\times 2 + 1$ : le PGCD vaut $1$. Oui, ils sont premiers entre eux (même si aucun n'est premier)."
      }
    },
    {
      titre: "Le théorème de Bézout",
      video: { titre: "Vidéo d'Yvan Monka : déterminer les coefficients de l'identité de Bézout", youtube: "https://youtu.be/HSrIYM8ufoE" },
      texte:
        "**Identité de Bézout.** Si $d = \\text{PGCD}(a\\,;b)$, il existe des entiers $u$ et $v$ tels que $au + bv = d$.\n\n" +
        "**Démonstration.** L'ensemble $E$ des entiers strictement positifs de la forme $au + bv$ n'est pas vide : il a un plus petit élément $m = au_0 + bv_0$. La division de $a$ par $m$ donne $a = mq + r$ avec $0 \\leqslant r < m$, et $r = a(1 - qu_0) + b(-qv_0)$. Si $r > 0$, il serait dans $E$ et plus petit que $m$ : impossible. Donc $r = 0$ et $m$ divise $a$ ; de même $m$ divise $b$, donc $m \\leqslant d$. Enfin $d$ divise $au_0 + bv_0 = m$, donc $d \\leqslant m$. D'où $m = d$.\n\n" +
        "**Théorème de Bézout.** $a$ et $b$ sont premiers entre eux **si et seulement si** il existe des entiers $u$ et $v$ tels que $au + bv = 1$.\n\n" +
        "On trouve $u$ et $v$ en « remontant » l'algorithme d'Euclide (algorithme d'Euclide étendu).",
      exemple: {
        enonce: "Trouve des entiers $u$ et $v$ tels que $17u + 5v = 1$.",
        solution: "$17 = 5 \\times 3 + 2$ et $5 = 2 \\times 2 + 1$. On remonte : $1 = 5 - 2 \\times 2 = 5 - 2(17 - 5 \\times 3) = 5 \\times 7 - 17 \\times 2$.\n\nDonc $u = -2$ et $v = 7$ : $17 \\times (-2) + 5 \\times 7 = 1$."
      }
    },
    {
      titre: "Inverse modulo n",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un inverse modulo n", youtube: "https://youtu.be/Pl4FaV5GZvc" },
      texte:
        "Si $a$ et $n$ sont premiers entre eux, Bézout donne $au + nv = 1$, donc $au \\equiv 1\\ [n]$ : $u$ est un **inverse de $a$ modulo $n$**.\n\n" +
        "On s'en sert pour **résoudre** $ax \\equiv b\\ [n]$ : on multiplie par l'inverse $u$, et $x \\equiv ub\\ [n]$.\n\n" +
        "C'est aussi ce qui permet de **décoder** un chiffrement affine $y \\equiv ax + b\\ [26]$ quand $a$ est premier avec $26$ : $x \\equiv u(y - b)\\ [26]$.",
      exemple: {
        enonce: "Résous $7x \\equiv 3\\ [26]$.",
        solution: "$7 \\times 15 = 105 = 4 \\times 26 + 1$ : $15$ est l'inverse de $7$ modulo $26$.\n\nOn multiplie par $15$ : $x \\equiv 45 \\equiv 19\\ [26]$."
      }
    },
    {
      titre: "Le théorème de Gauss",
      video: { titre: "Vidéo d'Yvan Monka : appliquer le théorème de Gauss", youtube: "https://youtu.be/vTqqk96T_Fo" },
      texte:
        "**Théorème de Gauss.** Si $a$ divise $bc$ et si $a$ est premier avec $b$, alors $a$ divise $c$.\n\n" +
        "**Démonstration.** D'après Bézout, $au + bv = 1$. On multiplie par $c$ : $acu + bcv = c$. Or $a$ divise $acu$ et $a$ divise $bc$, donc $a$ divise la combinaison $acu + bcv = c$.\n\n" +
        "**Corollaire.** Si $a$ et $b$ divisent $n$ et sont premiers entre eux, alors $ab$ divise $n$. Par exemple, un entier divisible par $3$ et par $4$ est divisible par $12$ (mais divisible par $2$ et $6$ n'implique pas divisible par $12$).\n\n" +
        "**Attention** : sans l'hypothèse « premiers entre eux », c'est faux. $6$ divise $4 \\times 3$ mais ne divise ni $4$ ni $3$.",
      exemple: {
        enonce: "$x$ et $y$ sont des entiers tels que $5x = 8y$. Que peut-on dire de $x$ ?",
        solution: "$8$ divise $8y = 5x$, et $8$ est premier avec $5$ : par Gauss, $8$ divise $x$. On écrit $x = 8k$, puis $y = 5k$."
      }
    },
    {
      titre: "Équations diophantiennes $ax + by = c$",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation du type ax + by = c", youtube: "https://youtu.be/XpYK-F4hX24" },
      texte:
        "On cherche les couples d'**entiers** $(x\\,;y)$ tels que $ax + by = c$.\n\n" +
        "- Il y a des solutions si et seulement si $\\text{PGCD}(a\\,;b)$ divise $c$. On commence par diviser par ce PGCD : on se ramène à $a$ et $b$ premiers entre eux.\n" +
        "- On trouve une **solution particulière** $(x_0\\,;y_0)$ (évidente, ou avec Bézout).\n" +
        "- Par différence : $a(x - x_0) = b(y_0 - y)$. Avec Gauss, $b$ divise $x - x_0$ : $x = x_0 + bk$, puis $y = y_0 - ak$.\n" +
        "- Réciproquement, ces couples conviennent : les solutions sont les $(x_0 + bk\\,;y_0 - ak)$, $k \\in \\mathbb{Z}$.",
      exemple: {
        enonce: "Résous $3x + 5y = 1$ dans $\\mathbb{Z}^2$.",
        solution: "$(2\\,;-1)$ est solution : $6 - 5 = 1$. Par différence, $3(x - 2) = 5(-1 - y)$. $5$ divise $3(x - 2)$ et est premier avec $3$, donc $x - 2 = 5k$ et $y = -1 - 3k$.\n\n$S = \\{(2 + 5k\\,;-1 - 3k),\\ k \\in \\mathbb{Z}\\}$."
      }
    }
  ],

  videos: [
    { type: "Méthode", titre: "Utiliser le théorème de Bézout", youtube: "https://youtu.be/oJuQv8guLJk" },
    { type: "Bac", titre: "Exercice du bac : arithmétique et matrices", youtube: "https://youtu.be/X0SLGBL2uQE" }
  ],
  videosNote: "Méthodes et exercice corrigé en vidéo par Yvan Monka.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "xb-pgcd", titre: "Algorithme d'Euclide", etape: "PGCD", nb: 5 },
    { type: "xb-premiers", titre: "Premiers entre eux ?", etape: "PGCD", nb: 4 },
    { type: "xb-bezout", titre: "Coefficients de Bézout", etape: "Bézout", nb: 5 },
    { type: "xb-inverse", titre: "Inverse modulo n", etape: "Bézout", nb: 5 },
    { type: "xb-gauss", titre: "Théorème de Gauss", etape: "Gauss", nb: 5 },
    { type: "xb-diophante", titre: "Résoudre ax + by = c", etape: "Gauss", nb: 4 },
    { type: "xb-diophante-n", titre: "Problèmes d'achats", etape: "Défi", nb: 4 },
    { type: "xb-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Que vaut $\\text{PGCD}(84\\,;60)$ ?", choix: ["$12$", "$6$", "$420$", "$24$"], bonne: 0, explication: "$84 = 60 \\times 1 + 24$, $60 = 24 \\times 2 + 12$, $24 = 12 \\times 2$ : le PGCD est $12$. $420$ est le PPCM." },
    { question: "Dans l'algorithme d'Euclide, le PGCD est :", choix: ["le dernier reste non nul", "le premier reste", "le dernier quotient", "le produit des quotients"], bonne: 0, explication: "On remplace $(a\\,;b)$ par $(b\\,;r)$ jusqu'à un reste nul : le PGCD est le dernier reste non nul." },
    { question: "Lequel de ces couples est formé d'entiers premiers entre eux ?", choix: ["$15$ et $28$", "$14$ et $21$", "$12$ et $33$", "$25$ et $35$"], bonne: 0, explication: "$15 = 3 \\times 5$ et $28 = 2^2 \\times 7$ n'ont aucun facteur commun. Les autres ont pour PGCD $7$, $3$ et $5$." },
    { question: "Le théorème de Bézout affirme que $a$ et $b$ sont premiers entre eux si et seulement si :", choix: ["il existe des entiers $u$, $v$ avec $au + bv = 1$", "$a$ et $b$ sont des nombres premiers", "$ab = 1$", "$a$ divise $b - 1$"], bonne: 0, explication: "C'est l'énoncé du théorème de Bézout." },
    { question: "Un couple $(u\\,;v)$ tel que $7u + 3v = 1$ est :", choix: ["$(1\\,;-2)$", "$(-1\\,;2)$", "$(1\\,;2)$", "$(2\\,;-1)$"], bonne: 0, explication: "$7 \\times 1 + 3 \\times (-2) = 7 - 6 = 1$." },
    { question: "L'inverse de $3$ modulo $7$ est :", choix: ["$5$", "$4$", "$3$", "$2$"], bonne: 0, explication: "$3 \\times 5 = 15 = 2 \\times 7 + 1 \\equiv 1\\ [7]$." },
    { question: "Si $7$ divise $4n$, alors :", choix: ["$7$ divise $n$", "$7$ divise $4$", "$28$ divise $n$", "$n = 7$"], bonne: 0, explication: "$7$ est premier avec $4$ : par Gauss, $7$ divise $n$." },
    { question: "Si $6$ divise $9n$, alors le plus petit entier $n > 0$ possible est :", choix: ["$2$", "$6$", "$3$", "$1$"], bonne: 0, explication: "On simplifie par $\\text{PGCD}(6\\,;9) = 3$ : $2$ divise $3n$, puis par Gauss $2$ divise $n$." },
    { question: "Si $4$ et $9$ divisent $n$, alors :", choix: ["$36$ divise $n$", "$13$ divise $n$", "$n = 36$", "$4$ divise $9$"], bonne: 0, explication: "$4$ et $9$ sont premiers entre eux, donc leur produit $36$ divise $n$." },
    { question: "L'équation $6x + 9y = 4$ :", choix: ["n'a aucune solution entière", "a une seule solution", "a une infinité de solutions", "a pour solution $(2\\,;-1)$"], bonne: 0, explication: "$6x + 9y$ est un multiple de $3$, et $4$ n'en est pas un : aucune solution." },
    { question: "Les solutions entières de $2x + 3y = 1$ sont :", choix: ["$(-1 + 3k\\,;1 - 2k)$, $k \\in \\mathbb{Z}$", "$(-1 + 2k\\,;1 - 3k)$, $k \\in \\mathbb{Z}$", "$(-1\\,;1)$ seulement", "$(-1 + 3k\\,;1 + 2k)$, $k \\in \\mathbb{Z}$"], bonne: 0, explication: "$(-1\\,;1)$ est solution. Par différence : $2(x + 1) = 3(1 - y)$, donc $x + 1 = 3k$ et $y = 1 - 2k$." },
    { question: "Pour tout entier $n$, $\\text{PGCD}(n\\,;n + 1)$ vaut :", choix: ["$1$", "$n$", "$2$", "cela dépend de $n$"], bonne: 0, explication: "Un diviseur commun divise $(n + 1) - n = 1$." },
    { question: "Pour tout entier $n$, $\\text{PGCD}(n\\,;n + 4)$ est un diviseur de :", choix: ["$4$", "$n$ seulement", "$n + 4$ seulement", "$8$, sans autre précision"], bonne: 0, explication: "Un diviseur commun divise $(n + 4) - n = 4$ : le PGCD vaut $1$, $2$ ou $4$." },
    { question: "$\\text{PGCD}(a\\,;b) = 6$. Alors $a = 6a'$ et $b = 6b'$ avec :", choix: ["$a'$ et $b'$ premiers entre eux", "$a'$ et $b'$ premiers", "$a' = b'$", "$a'$ pair"], bonne: 0, explication: "Après division par le PGCD, il ne reste plus de diviseur commun autre que $1$." },
    { question: "Pour décoder $y \\equiv 3x + 2\\ [26]$, on a besoin :", choix: ["d'un inverse de $3$ modulo $26$", "d'un inverse de $2$ modulo $26$", "de $\\text{PGCD}(3\\,;2)$", "de diviser par $26$"], bonne: 0, explication: "$3x \\equiv y - 2\\ [26]$ : on multiplie par l'inverse de $3$ modulo $26$, qui est $9$ ($27 \\equiv 1$)." },
    { question: "$5x = 12y$ avec $x$ et $y$ entiers. Alors :", choix: ["$12$ divise $x$", "$5$ divise $x$", "$60$ divise $x$", "$x = 12$"], bonne: 0, explication: "$12$ divise $5x$ et est premier avec $5$ : par Gauss, $12$ divise $x$." },
    { question: "Combien de façons de payer exactement $20$ € avec des pièces de $2$ € et des billets de $5$ € ?", choix: ["$3$", "$2$", "$4$", "$1$"], bonne: 0, explication: "$2x + 5y = 20$ : $(10\\,;0)$, $(5\\,;2)$ et $(0\\,;4)$." },
    { question: "Si $\\text{PGCD}(a\\,;b) = d$, l'équation $ax + by = c$ a des solutions entières si et seulement si :", choix: ["$d$ divise $c$", "$c$ divise $d$", "$c = d$", "$c$ est premier"], bonne: 0, explication: "$ax + by$ est toujours un multiple de $d$, et Bézout permet d'obtenir tous les multiples de $d$." },
    { question: "Que renvoie la fonction Python du cours, appelée avec $\\texttt{pgcd(48, 18)}$ ?", choix: ["$6$", "$18$", "$3$", "$144$"], bonne: 0, explication: "$48 = 18 \\times 2 + 12$, $18 = 12 \\times 1 + 6$, $12 = 6 \\times 2$ : elle renvoie $6$." },
    { question: "Si $a$ divise $bc$, on peut affirmer que $a$ divise $c$ :", choix: ["si $a$ est premier avec $b$", "toujours", "si $a$ est premier avec $c$", "si $b$ divise $c$"], bonne: 0, explication: "C'est l'hypothèse du théorème de Gauss : $a$ et $b$ premiers entre eux." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer un PGCD avec l'algorithme d'Euclide",
      figure: "xb-cours-euclide",
      etapes: [
        "Diviser le plus grand nombre par le plus petit : $a = bq + r$.",
        "Recommencer avec $b$ et $r$, tant que le reste n'est pas nul.",
        "Le PGCD est le dernier reste non nul."
      ],
      exemple: "$\\text{PGCD}(91\\,;35)$ : $91 = 35 \\times 2 + 21$, $35 = 21 + 14$, $21 = 14 + 7$, $14 = 7 \\times 2$. Le PGCD est $7$."
    },
    {
      titre: "Trouver des coefficients de Bézout",
      etapes: [
        "Écrire les étapes de l'algorithme d'Euclide.",
        "Partir de l'avant-dernière : écrire le PGCD comme combinaison des deux nombres de cette ligne.",
        "Remplacer, ligne après ligne, chaque reste par son expression, en remontant jusqu'à $a$ et $b$.",
        "Vérifier $au + bv = \\text{PGCD}(a\\,;b)$."
      ],
      exemple: "$11 = 4 \\times 2 + 3$, $4 = 3 + 1$ : $1 = 4 - 3 = 4 - (11 - 4 \\times 2) = 4 \\times 3 - 11$."
    },
    {
      titre: "Utiliser le théorème de Gauss",
      etapes: [
        "Repérer une égalité du type $ax = by$ ou « $n$ divise $ab$ ».",
        "Vérifier l'hypothèse : les deux nombres sont-ils premiers entre eux ?",
        "Conclure : $a$ divise $y$ (et $b$ divise $x$).",
        "Écrire $x = bk$ et en déduire $y$."
      ],
      exemple: "$9x = 4y$ : $4$ divise $9x$ et $\\text{PGCD}(4\\,;9) = 1$, donc $x = 4k$ et $y = 9k$."
    },
    {
      titre: "Résoudre $ax + by = c$",
      etapes: [
        "Vérifier que $\\text{PGCD}(a\\,;b)$ divise $c$ et simplifier par ce PGCD.",
        "Trouver une solution particulière $(x_0\\,;y_0)$.",
        "Soustraire : $a(x - x_0) = b(y_0 - y)$, puis appliquer Gauss : $x = x_0 + bk$, $y = y_0 - ak$.",
        "Vérifier la réciproque et écrire l'ensemble des solutions."
      ],
      exemple: "$4x + 6y = 10$ devient $2x + 3y = 5$ ; $(1\\,;1)$ est solution ; $S = \\{(1 + 3k\\,;1 - 2k),\\ k \\in \\mathbb{Z}\\}$."
    }
  ],
  erreurs: [
    "Confondre PGCD et PPCM : $\\text{PGCD}(12\\,;18) = 6$, $\\text{PPCM}(12\\,;18) = 36$.",
    "Arrêter l'algorithme d'Euclide trop tôt : le PGCD est le **dernier reste non nul**.",
    "Croire que « premiers entre eux » veut dire « nombres premiers » : $8$ et $9$ sont premiers entre eux.",
    "Appliquer Gauss sans vérifier que les nombres sont premiers entre eux.",
    "Dire « $2$ et $6$ divisent $n$, donc $12$ divise $n$ » : il faut des diviseurs premiers entre eux.",
    "Oublier la réciproque, ou les signes, dans les solutions de $ax + by = c$ : $x = x_0 + bk$ et $y = y_0 - ak$.",
    "Conclure que $\\text{PGCD}(a\\,;b) = d$ parce que $au + bv = d$ : le PGCD divise seulement $d$ (sauf si $d = 1$)."
  ]
};
