/*
  CHAPITRE : Terminale maths expertes — Nombres premiers
  -------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme officiel de maths expertes (BO spécial n° 8 du 25 juillet 2019), « Arithmétique » :
  nombres premiers, infinité (démonstration), décomposition en facteurs premiers (existence et unicité),
  petit théorème de Fermat, crible d'Ératosthène. RSA, Mersenne, Fermat : « problèmes possibles ».
  video : vidéos d'Yvan Monka. Générateurs : préfixe xn- dans assets/exercices-expertes.js ; figure "xn-cours-crible".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["expertes-nombres-premiers"] = {
  niveau: "Terminale maths expertes",
  numero: 8,
  titre: "Nombres premiers",
  accroche: "Les briques de tous les entiers : les reconnaître, décomposer, compter les diviseurs et utiliser le petit théorème de Fermat.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : PGCD et nombres premiers (PDF)", url: "https://www.maths-et-tiques.fr/telech/20ArithTE2.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Nombres premiers et crible d'Ératosthène",
      figure: "xn-cours-crible",
      video: { titre: "Vidéo d'Yvan Monka : vérifier si un nombre est premier", youtube: "https://youtu.be/kLs0TiIz7lc" },
      texte:
        "Un entier naturel $p$ est **premier** s'il a exactement **deux** diviseurs positifs : $1$ et $p$. Ainsi $0$ et $1$ ne sont pas premiers, et $2$ est le seul nombre premier pair.\n\n" +
        "Les premiers nombres premiers : $2$, $3$, $5$, $7$, $11$, $13$, $17$, $19$, $23$, $29$…\n\n" +
        "**Crible d'Ératosthène** : on écrit les entiers de $2$ à $N$, on garde $2$ et on barre ses multiples, puis on garde le premier nombre non barré ($3$) et on barre ses multiples, etc. Les nombres qui restent sont premiers.\n\n" +
        "```python\ndef crible(N):\n    premier = [True] * (N + 1)\n    premier[0] = premier[1] = False\n    for k in range(2, N + 1):\n        if premier[k]:\n            for m in range(2 * k, N + 1, k):\n                premier[m] = False\n    return [k for k in range(N + 1) if premier[k]]\n```",
      exemple: {
        enonce: "Combien y a-t-il de nombres premiers inférieurs à $50$ ?",
        solution: "$2$, $3$, $5$, $7$, $11$, $13$, $17$, $19$, $23$, $29$, $31$, $37$, $41$, $43$, $47$ : il y en a $15$."
      }
    },
    {
      titre: "Tester si un nombre est premier",
      texte:
        "**Propriété.** Tout entier $n \\geqslant 2$ admet un diviseur premier : son plus petit diviseur supérieur à $1$.\n\n" +
        "**Propriété.** Si $n \\geqslant 2$ n'est pas premier, il admet un diviseur premier $p$ tel que $p^2 \\leqslant n$.\n\n" +
        "En effet, si $n = ab$ avec $1 < a \\leqslant b$, alors $a^2 \\leqslant ab = n$, et un diviseur premier de $a$ convient.\n\n" +
        "**Test** : pour savoir si $n$ est premier, on essaie de le diviser par les nombres premiers $p$ tels que $p \\leqslant \\sqrt{n}$. Si aucun ne divise $n$, alors $n$ est premier.",
      exemple: {
        enonce: "$221$ est-il premier ?",
        solution: "$\\sqrt{221} \\approx 14{,}9$ : on teste $2$, $3$, $5$, $7$, $11$, $13$. On trouve $221 = 13 \\times 17$ : il n'est pas premier."
      }
    },
    {
      titre: "L'ensemble des nombres premiers est infini",
      texte:
        "**Théorème (Euclide).** Il existe une infinité de nombres premiers.\n\n" +
        "**Démonstration par l'absurde.** Supposons qu'il n'y en ait qu'un nombre fini : $p_1, p_2, \\dots, p_k$. Posons $N = p_1 \\times p_2 \\times \\dots \\times p_k + 1$. Comme $N \\geqslant 2$, il a un diviseur premier, qui est l'un des $p_i$. Alors $p_i$ divise $N$ et le produit $p_1 \\dots p_k$, donc il divise leur différence $1$ : c'est impossible.\n\n" +
        "Il y a donc une infinité de nombres premiers. Pourtant, ils se raréfient : il y en a $25$ avant $100$, mais seulement $21$ entre $100$ et $200$."
    },
    {
      titre: "Décomposition en facteurs premiers",
      video: { titre: "Vidéo d'Yvan Monka : décomposer un nombre en produit de facteurs premiers", youtube: "https://youtu.be/1WMQ-iH7-7c" },
      texte:
        "**Théorème fondamental de l'arithmétique.** Tout entier $n \\geqslant 2$ s'écrit comme un produit de nombres premiers :\n\n" +
        "$n = p_1^{a_1} \\times p_2^{a_2} \\times \\dots \\times p_k^{a_k}$\n\n" +
        "avec $p_1 < p_2 < \\dots < p_k$ premiers et des exposants $a_i \\geqslant 1$. Cette écriture est **unique**.\n\n" +
        "- **Existence** : on divise par le plus petit diviseur premier, puis on recommence avec le quotient.\n" +
        "- **Unicité** : elle découle de la propriété « si un nombre premier divise un produit, il divise l'un des facteurs » (conséquence du théorème de Gauss).\n\n" +
        "**Pratique** : on divise par $2$ tant que c'est possible, puis par $3$, par $5$, par $7$…",
      exemple: {
        enonce: "Décompose $1\\,260$ en produit de facteurs premiers.",
        solution: "$1\\,260 = 2 \\times 630 = 2^2 \\times 315 = 2^2 \\times 3 \\times 105 = 2^2 \\times 3^2 \\times 35 = 2^2 \\times 3^2 \\times 5 \\times 7$."
      }
    },
    {
      titre: "Diviseurs, PGCD et PPCM avec la décomposition",
      video: { titre: "Vidéo d'Yvan Monka : déterminer tous les diviseurs d'un nombre par décomposition", youtube: "https://youtu.be/k0rhj8fwdjs" },
      texte:
        "Si $n = p_1^{a_1} \\times \\dots \\times p_k^{a_k}$ :\n\n" +
        "- les diviseurs positifs de $n$ sont les $p_1^{b_1} \\times \\dots \\times p_k^{b_k}$ avec $0 \\leqslant b_i \\leqslant a_i$ ;\n" +
        "- $n$ a donc $(a_1 + 1)(a_2 + 1) \\dots (a_k + 1)$ diviseurs positifs ;\n" +
        "- $n$ est un **carré** si et seulement si tous les $a_i$ sont pairs.\n\n" +
        "Avec deux nombres décomposés sur les mêmes facteurs premiers (exposants éventuellement nuls) :\n\n" +
        "- le **PGCD** prend le **plus petit** exposant de chaque facteur ;\n" +
        "- le **PPCM** prend le **plus grand** exposant.",
      exemple: {
        enonce: "$a = 2^3 \\times 3 \\times 5^2$ et $b = 2 \\times 3^2 \\times 7$. Calcule $\\text{PGCD}(a\\,;b)$ et le nombre de diviseurs de $a$.",
        solution: "$\\text{PGCD}(a\\,;b) = 2^1 \\times 3^1 = 6$ ($5$ et $7$ ne sont pas communs).\n\n$a$ a $(3 + 1)(1 + 1)(2 + 1) = 24$ diviseurs."
      }
    },
    {
      titre: "Le petit théorème de Fermat",
      video: { titre: "Vidéo d'Yvan Monka : appliquer le petit théorème de Fermat", youtube: "https://youtu.be/dMLtO6mB5yI" },
      texte:
        "**Théorème.** Soit $p$ un nombre **premier** et $a$ un entier **non divisible par $p$**. Alors :\n\n" +
        "$a^{p-1} \\equiv 1\\ [p]$\n\n" +
        "**Forme équivalente** : pour tout entier $a$, $a^p \\equiv a\\ [p]$.\n\n" +
        "**Usage** : pour calculer $a^k$ modulo $p$, on divise l'exposant par $p - 1$ : si $k = (p - 1)q + r$, alors $a^k \\equiv a^r\\ [p]$.\n\n" +
        "**Attention** : l'hypothèse « $p$ premier » est indispensable. Pour $n = 4$ : $3^3 = 27 \\equiv 3\\ [4]$, pas $1$.",
      exemple: {
        enonce: "Quel est le reste de la division de $3^{2026}$ par $7$ ?",
        solution: "$7$ est premier et ne divise pas $3$ : $3^6 \\equiv 1\\ [7]$. Or $2026 = 6 \\times 337 + 4$, donc $3^{2026} \\equiv 3^4 = 81 \\equiv 4\\ [7]$.\n\nLe reste est $4$."
      }
    },
    {
      titre: "Pour aller plus loin : nombres premiers et secrets",
      texte:
        "**Le chiffrement RSA** (1977) protège les paiements en ligne. On choisit deux grands nombres premiers $p$ et $q$ et on publie $n = pq$. Retrouver $p$ et $q$ à partir de $n$ est extrêmement long quand ils ont des centaines de chiffres : c'est ce qui garantit la sécurité. Le déchiffrement repose sur le petit théorème de Fermat.\n\n" +
        "**Nombres de Mersenne** $2^n - 1$ : ils ne sont premiers que pour certains $n$ (premiers eux-mêmes). Les plus grands nombres premiers connus en sont, avec des dizaines de millions de chiffres.\n\n" +
        "**Une question ouverte** : la conjecture de Goldbach (1742) affirme que tout nombre pair supérieur ou égal à $4$ est la somme de deux nombres premiers ($28 = 5 + 23$). Personne ne l'a encore démontrée !"
    }
  ],

  videos: [
    { type: "Méthode", titre: "Déterminer le PGCD et le PPCM par décomposition", youtube: "https://youtu.be/2bIK1KkQ1k0" }
  ],
  videosNote: "Méthode expliquée en vidéo par Yvan Monka.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "xn-premier", titre: "Reconnaître un nombre premier", etape: "Nombres premiers", nb: 4 },
    { type: "xn-test", titre: "Jusqu'où tester ?", etape: "Nombres premiers", nb: 5 },
    { type: "xn-decomposition", titre: "Décomposer en facteurs premiers", etape: "Décomposition", nb: 5 },
    { type: "xn-nombre-diviseurs", titre: "Nombre de diviseurs", etape: "Décomposition", nb: 5 },
    { type: "xn-pgcd-decomp", titre: "PGCD et PPCM par décomposition", etape: "Décomposition", nb: 5 },
    { type: "xn-carre", titre: "Rendre un nombre carré", etape: "Décomposition", nb: 4 },
    { type: "xn-fermat", titre: "Petit théorème de Fermat", etape: "Fermat", nb: 5 },
    { type: "xn-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Lequel de ces nombres est premier ?", choix: ["$97$", "$91$", "$87$", "$51$"], bonne: 0, explication: "$91 = 7 \\times 13$, $87 = 3 \\times 29$, $51 = 3 \\times 17$. $97$ n'est divisible ni par $2$, ni par $3$, ni par $5$, ni par $7$ (et $11^2 > 97$)." },
    { question: "Combien y a-t-il de nombres premiers inférieurs à $30$ ?", choix: ["$10$", "$9$", "$11$", "$15$"], bonne: 0, explication: "$2$, $3$, $5$, $7$, $11$, $13$, $17$, $19$, $23$, $29$." },
    { question: "Pour savoir si $187$ est premier, il suffit de tester les nombres premiers jusqu'à :", choix: ["$13$", "$93$", "$187$", "$17$"], bonne: 0, explication: "$\\sqrt{187} \\approx 13{,}7$ : on teste jusqu'à $13$. D'ailleurs $187 = 11 \\times 17$." },
    { question: "La décomposition de $360$ en facteurs premiers est :", choix: ["$2^3 \\times 3^2 \\times 5$", "$2^2 \\times 3^2 \\times 10$", "$2^3 \\times 45$", "$6^2 \\times 10$"], bonne: 0, explication: "$360 = 8 \\times 45 = 2^3 \\times 3^2 \\times 5$ : tous les facteurs doivent être premiers." },
    { question: "Combien $2^4 \\times 3^2$ a-t-il de diviseurs positifs ?", choix: ["$15$", "$8$", "$6$", "$144$"], bonne: 0, explication: "$(4 + 1)(2 + 1) = 15$." },
    { question: "Le PGCD de $2^3 \\times 3 \\times 5^2$ et $2^2 \\times 3^4 \\times 7$ est :", choix: ["$2^2 \\times 3$", "$2^3 \\times 3^4 \\times 5^2 \\times 7$", "$2^2 \\times 3 \\times 5 \\times 7$", "$6$"], bonne: 0, explication: "On garde les facteurs communs avec le plus petit exposant : $2^2 \\times 3 = 12$." },
    { question: "Le PPCM de $12 = 2^2 \\times 3$ et $18 = 2 \\times 3^2$ est :", choix: ["$36$", "$6$", "$216$", "$72$"], bonne: 0, explication: "Plus grand exposant de chaque facteur : $2^2 \\times 3^2 = 36$." },
    { question: "Le plus petit entier $k > 0$ tel que $12k$ soit un carré est :", choix: ["$3$", "$12$", "$2$", "$6$"], bonne: 0, explication: "$12 = 2^2 \\times 3$ : seul l'exposant de $3$ est impair, donc $k = 3$ et $36 = 6^2$." },
    { question: "D'après le petit théorème de Fermat, $4^{10}$ est congru modulo $11$ à :", choix: ["$1$", "$4$", "$0$", "$10$"], bonne: 0, explication: "$11$ est premier et ne divise pas $4$ : $4^{11 - 1} \\equiv 1\\ [11]$." },
    { question: "Le reste de la division de $2^{100}$ par $7$ est :", choix: ["$2$", "$1$", "$4$", "$0$"], bonne: 0, explication: "$2^6 \\equiv 1\\ [7]$ et $100 = 6 \\times 16 + 4$, donc $2^{100} \\equiv 2^4 = 16 \\equiv 2\\ [7]$." },
    { question: "Pour quels entiers $p$ peut-on appliquer le petit théorème de Fermat ?", choix: ["les nombres premiers", "tous les entiers", "les entiers pairs", "les carrés"], bonne: 0, explication: "Le théorème demande que $p$ soit premier (et que $a$ ne soit pas divisible par $p$)." },
    { question: "Si un nombre premier $p$ divise $ab$, alors :", choix: ["$p$ divise $a$ ou $p$ divise $b$", "$p$ divise $a$ et $b$", "$p = a$ ou $p = b$", "$p$ divise $a + b$"], bonne: 0, explication: "Si $p$ ne divise pas $a$, il est premier avec $a$, et Gauss donne $p \\mid b$." },
    { question: "Dans la démonstration d'Euclide, on considère le nombre :", choix: ["$p_1 \\times p_2 \\times \\dots \\times p_k + 1$", "$p_1 + p_2 + \\dots + p_k$", "$p_k + 1$", "$2^{p_k} - 1$"], bonne: 0, explication: "Aucun des $p_i$ ne divise ce nombre, car il laisse un reste $1$ : contradiction." },
    { question: "Combien de diviseurs positifs a un nombre premier $p$ ?", choix: ["$2$", "$1$", "$p$", "$0$"], bonne: 0, explication: "Exactement deux : $1$ et $p$." },
    { question: "Lequel de ces nombres est le carré d'un entier ?", choix: ["$2^4 \\times 3^2 \\times 5^6$", "$2^3 \\times 3^2$", "$2 \\times 3^4$", "$2^2 \\times 3 \\times 5^2$"], bonne: 0, explication: "Un entier est un carré quand tous ses exposants sont pairs : ici $(2^2 \\times 3 \\times 5^3)^2$." },
    { question: "$2^{11} - 1 = 2\\,047$ est-il premier ?", choix: ["Non, car $2\\,047 = 23 \\times 89$", "Oui, car $11$ est premier", "Oui, comme tous les $2^n - 1$", "Non, car il est pair"], bonne: 0, explication: "Même avec $n$ premier, $2^n - 1$ n'est pas toujours premier : $2\\,047 = 23 \\times 89$." },
    { question: "Combien $100 = 2^2 \\times 5^2$ a-t-il de diviseurs positifs ?", choix: ["$9$", "$4$", "$6$", "$10$"], bonne: 0, explication: "$(2 + 1)(2 + 1) = 9$ : $1$, $2$, $4$, $5$, $10$, $20$, $25$, $50$, $100$." },
    { question: "Pour tout entier $a$ et tout premier $p$, on a :", choix: ["$a^p \\equiv a\\ [p]$", "$a^p \\equiv 1\\ [p]$", "$a^p \\equiv 0\\ [p]$", "$a^{p+1} \\equiv 1\\ [p]$"], bonne: 0, explication: "C'est la forme générale du petit théorème de Fermat (valable même si $p$ divise $a$)." },
    { question: "Le nombre $1\\,001$ est :", choix: ["$7 \\times 11 \\times 13$", "premier", "$11 \\times 91$ avec $91$ premier", "$3 \\times 337$"], bonne: 0, explication: "$1\\,001 = 7 \\times 143 = 7 \\times 11 \\times 13$." },
    { question: "Quel est le plus petit diviseur premier de $323$ ?", choix: ["$17$", "$3$", "$19$", "$7$"], bonne: 0, explication: "$323$ n'est divisible ni par $2$, $3$, $5$, $7$, $11$, $13$ ; $323 = 17 \\times 19$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Savoir si un nombre est premier",
      figure: "xn-cours-crible",
      etapes: [
        "Calculer $\\sqrt{n}$ (à la calculatrice ou par encadrement).",
        "Tester la divisibilité par $2$, $3$, $5$, $7$, $11$… jusqu'au plus grand nombre premier inférieur ou égal à $\\sqrt{n}$.",
        "Si l'un d'eux divise $n$, il n'est pas premier ; sinon, il est premier."
      ],
      exemple: "$157$ : $\\sqrt{157} \\approx 12{,}5$ ; ni $2$, ni $3$, ni $5$, ni $7$, ni $11$ ne divisent $157$, donc il est premier."
    },
    {
      titre: "Décomposer et exploiter la décomposition",
      etapes: [
        "Diviser par $2$ tant que possible, puis par $3$, $5$, $7$… en notant les facteurs.",
        "Écrire $n = p_1^{a_1} \\times \\dots \\times p_k^{a_k}$ et vérifier le produit.",
        "Nombre de diviseurs : $(a_1 + 1) \\times \\dots \\times (a_k + 1)$.",
        "PGCD : plus petits exposants ; PPCM : plus grands exposants ; carré : tous les exposants pairs."
      ],
      exemple: "$540 = 2^2 \\times 3^3 \\times 5$ : $3 \\times 4 \\times 2 = 24$ diviseurs."
    },
    {
      titre: "Calculer un reste avec Fermat",
      etapes: [
        "Vérifier que le module $p$ est premier et qu'il ne divise pas la base $a$.",
        "Écrire $a^{p-1} \\equiv 1\\ [p]$.",
        "Diviser l'exposant par $p - 1$ : $k = (p - 1)q + r$, donc $a^k \\equiv a^r\\ [p]$.",
        "Calculer $a^r$ modulo $p$ (petit calcul)."
      ],
      exemple: "$5^{38}$ modulo $13$ : $5^{12} \\equiv 1$, $38 = 12 \\times 3 + 2$, donc $5^{38} \\equiv 25 \\equiv 12\\ [13]$."
    }
  ],
  erreurs: [
    "Dire que $1$ est premier : il n'a qu'un seul diviseur.",
    "Laisser un facteur non premier dans une décomposition ($12 = 2 \\times 6$).",
    "Tester tous les nombres jusqu'à $n$ ou $\\dfrac{n}{2}$ : la racine carrée suffit.",
    "Oublier d'ajouter $1$ aux exposants pour compter les diviseurs.",
    "Inverser PGCD (plus petits exposants) et PPCM (plus grands exposants).",
    "Appliquer Fermat avec un module non premier, ou diviser l'exposant par $p$ au lieu de $p - 1$.",
    "Croire que $2^n - 1$ ou $n^2 + n + 41$ donnent toujours des nombres premiers : un contre-exemple suffit."
  ]
};
