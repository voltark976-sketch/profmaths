/*
  CHAPITRE : Terminale maths expertes — Équations polynomiales
  -------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme officiel de maths expertes (BO spécial n° 8 du 25 juillet 2019), « Équations polynomiales ».
  Somme et produit des racines (formules de Viète) et méthode de Cardan : « problèmes possibles » du programme.
  video : vidéos d'Yvan Monka. Générateurs : préfixe xp- dans assets/exercices-expertes.js ; figures "xp-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["expertes-equations-polynomiales"] = {
  niveau: "Terminale maths expertes",
  numero: 4,
  titre: "Équations polynomiales",
  accroche: "Résoudre dans $\\mathbb{C}$ toutes les équations du second degré, factoriser par $z - a$ et venir à bout du degré $3$.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : équations polynomiales (PDF)", url: "https://www.maths-et-tiques.fr/telech/20Poly.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Équations du second degré dans ℂ",
      figure: "xp-cours-parabole",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation du second degré dans ℂ", youtube: "https://youtu.be/KCnorHy5FE4" },
      texte:
        "On considère $az^2 + bz + c = 0$ avec $a$, $b$, $c$ **réels** et $a \\neq 0$, et son discriminant $\\Delta = b^2 - 4ac$.\n\n" +
        "- Si $\\Delta > 0$ : deux solutions réelles $\\dfrac{-b - \\sqrt{\\Delta}}{2a}$ et $\\dfrac{-b + \\sqrt{\\Delta}}{2a}$.\n" +
        "- Si $\\Delta = 0$ : une solution réelle $-\\dfrac{b}{2a}$.\n" +
        "- Si $\\Delta < 0$ : deux solutions **complexes conjuguées** $z_1 = \\dfrac{-b - i\\sqrt{-\\Delta}}{2a}$ et $z_2 = \\overline{z_1} = \\dfrac{-b + i\\sqrt{-\\Delta}}{2a}$.\n\n" +
        "Pourquoi ? Si $\\Delta < 0$, on écrit $\\Delta = (i\\sqrt{-\\Delta})^2$ : la forme canonique $a\\left[\\left(z + \\dfrac{b}{2a}\\right)^2 - \\dfrac{\\Delta}{4a^2}\\right]$ se factorise alors comme une différence de deux carrés.\n\n" +
        "Dans $\\mathbb{C}$, une équation du second degré a **toujours** des solutions, et $az^2 + bz + c = a(z - z_1)(z - z_2)$.",
      exemple: {
        enonce: "Résous dans $\\mathbb{C}$ l'équation $z^2 - 2z + 5 = 0$.",
        solution: "$\\Delta = 4 - 20 = -16 < 0$, donc $z_1 = \\dfrac{2 - 4i}{2} = 1 - 2i$ et $z_2 = 1 + 2i$.\n\n$S = \\{1 - 2i\\,;1 + 2i\\}$. La parabole $y = x^2 - 2x + 5$ ne coupe pas l'axe des abscisses : il n'y a pas de solution réelle."
      }
    },
    {
      titre: "Factoriser par $z - a$",
      video: { titre: "Vidéo d'Yvan Monka : factoriser un polynôme dont une racine est connue", youtube: "https://youtu.be/1Y-JtI6nNXU" },
      texte:
        "Un **polynôme** de degré $n$ est une fonction $P(z) = a_nz^n + \\dots + a_1z + a_0$ avec $a_n \\neq 0$. On admet que si un polynôme est nul pour tout $z$, tous ses coefficients sont nuls : deux polynômes égaux ont donc les **mêmes coefficients**.\n\n" +
        "**Factorisation de $z^n - a^n$.** Pour tout entier $n \\geqslant 1$ :\n\n" +
        "$z^n - a^n = (z - a)(z^{n-1} + az^{n-2} + \\dots + a^{n-2}z + a^{n-1})$\n\n" +
        "En développant le membre de droite, les termes s'annulent deux à deux et il reste $z^n - a^n$.\n\n" +
        "**Théorème.** Si $P(a) = 0$ ($a$ est une **racine** de $P$), alors il existe un polynôme $Q$ de degré $n - 1$ tel que $P(z) = (z - a)Q(z)$.\n\n" +
        "**Démonstration.** $P(z) = P(z) - P(a) = \\displaystyle\\sum_{k=1}^{n} a_k(z^k - a^k)$, et chaque $z^k - a^k$ se factorise par $z - a$.",
      exemple: {
        enonce: "Factorise $z^3 - 27$ par $z - 3$.",
        solution: "$z^3 - 27 = z^3 - 3^3 = (z - 3)(z^2 + 3z + 9)$.\n\nVérification : $z^3 + 3z^2 + 9z - 3z^2 - 9z - 27 = z^3 - 27$."
      }
    },
    {
      titre: "Un polynôme de degré $n$ a au plus $n$ racines",
      texte:
        "**Propriété.** Un polynôme de degré $n$ (non nul) admet **au plus $n$ racines**.\n\n" +
        "**Démonstration par récurrence.** Un polynôme de degré $0$ est une constante non nulle : aucune racine. Supposons la propriété vraie au rang $n - 1$, et soit $P$ de degré $n$. S'il n'a pas de racine, c'est fini. Sinon, soit $a$ une racine : $P(z) = (z - a)Q(z)$ avec $Q$ de degré $n - 1$. Une racine $b$ de $P$ vérifie $(b - a)Q(b) = 0$, donc $b = a$ ou $Q(b) = 0$. Comme $Q$ a au plus $n - 1$ racines, $P$ en a au plus $n$.\n\n" +
        "**Conséquence.** Si un polynôme de degré inférieur ou égal à $n$ s'annule en plus de $n$ valeurs, il est nul.\n\n" +
        "**Polynômes à coefficients réels.** Si $P(z_0) = 0$, alors $P(\\overline{z_0}) = \\overline{P(z_0)} = 0$ : les racines non réelles vont par paires conjuguées."
    },
    {
      titre: "Résoudre une équation de degré 3",
      figure: "xp-cours-conjuguees",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation de degré 3 dont une racine est connue", youtube: "https://youtu.be/KqghKmQ9gOk" },
      texte:
        "Pour résoudre $P(z) = 0$ avec $P$ de degré $3$ à coefficients réels :\n\n" +
        "- On cherche (ou on vérifie) une **racine évidente** $a$ : on essaie $0$, $1$, $-1$, $2$, $-2$, $i$…\n" +
        "- On écrit $P(z) = (z - a)(z^2 + bz + c)$, puis on trouve $b$ et $c$ en **développant et en identifiant** les coefficients.\n" +
        "- On résout $z^2 + bz + c = 0$ avec le discriminant.\n\n" +
        "On obtient au plus $3$ solutions.",
      exemple: {
        enonce: "Résous $z^3 - z^2 + 3z + 5 = 0$ sachant que $-1$ est une racine.",
        solution: "$(z + 1)(z^2 + bz + c) = z^3 + (b + 1)z^2 + (c + b)z + c$.\n\nOn identifie : $b + 1 = -1$, $c + b = 3$ et $c = 5$, donc $b = -2$ et $c = 5$.\n\n$z^2 - 2z + 5 = 0$ : $\\Delta = -16$, solutions $1 - 2i$ et $1 + 2i$.\n\n$S = \\{-1\\,;1 - 2i\\,;1 + 2i\\}$."
      }
    },
    {
      titre: "Somme et produit des racines",
      texte:
        "Si $z_1$ et $z_2$ sont les solutions de $az^2 + bz + c = 0$, alors $az^2 + bz + c = a(z - z_1)(z - z_2) = az^2 - a(z_1 + z_2)z + az_1z_2$. En identifiant :\n\n" +
        "$z_1 + z_2 = -\\dfrac{b}{a}$ et $z_1z_2 = \\dfrac{c}{a}$\n\n" +
        "Ce sont les **formules de Viète**. Réciproquement, deux nombres de somme $S$ et de produit $P$ sont les solutions de $z^2 - Sz + P = 0$.\n\n" +
        "Pour deux racines conjuguées $p \\pm qi$ : la somme vaut $2p$ et le produit $p^2 + q^2$.",
      exemple: {
        enonce: "Écris une équation du second degré qui a pour solutions $3 + 2i$ et $3 - 2i$.",
        solution: "$S = 6$ et $P = 3^2 + 2^2 = 13$ : l'équation $z^2 - 6z + 13 = 0$ convient."
      }
    },
    {
      titre: "Un peu d'histoire",
      texte:
        "Vers 1535, **Tartaglia** trouve une formule pour résoudre les équations de degré $3$, publiée en 1545 par **Cardan** : pour $x^3 + px + q = 0$, une solution est\n\n" +
        "$x = \\sqrt[3]{-\\dfrac{q}{2} + \\sqrt{\\dfrac{q^2}{4} + \\dfrac{p^3}{27}}} + \\sqrt[3]{-\\dfrac{q}{2} - \\sqrt{\\dfrac{q^2}{4} + \\dfrac{p^3}{27}}}$\n\n" +
        "Pour $x^3 - 15x - 4 = 0$, dont $4$ est solution, la formule fait apparaître $\\sqrt{-121}$ ! **Bombelli** calcule malgré tout avec ces nombres et retrouve $4$ : c'est la naissance des nombres complexes.\n\n" +
        "Au XIXe siècle, **Abel** et **Galois** montrent qu'il n'existe pas de telle formule pour le degré $5$ en général."
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "xp-delta", titre: "Discriminant et nombre de solutions", etape: "Second degré", nb: 5 },
    { type: "xp-second-degre", titre: "Résoudre une équation du second degré", etape: "Second degré", nb: 5 },
    { type: "xp-somme-produit", titre: "Somme et produit des racines", etape: "Second degré", nb: 5 },
    { type: "xp-zn-an", titre: "Factoriser zⁿ − aⁿ", etape: "Factoriser par z − a", nb: 4 },
    { type: "xp-racine", titre: "Trouver une racine", etape: "Factoriser par z − a", nb: 5 },
    { type: "xp-factoriser", titre: "Factoriser par identification", etape: "Factoriser par z − a", nb: 5 },
    { type: "xp-degre3", titre: "Résoudre une équation de degré 3", etape: "Défi", nb: 5 },
    { type: "xp-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Les solutions de $z^2 + 9 = 0$ dans $\\mathbb{C}$ sont :", choix: ["$3i$ et $-3i$", "$3$ et $-3$", "$9i$ et $-9i$", "Il n'y en a pas"], bonne: 0, explication: "$z^2 = -9 = (3i)^2$, donc $z = 3i$ ou $z = -3i$." },
    { question: "Les solutions de $z^2 - 4z + 13 = 0$ sont :", choix: ["$2 - 3i$ et $2 + 3i$", "$-2 - 3i$ et $-2 + 3i$", "$2 - 9i$ et $2 + 9i$", "$4 - 6i$ et $4 + 6i$"], bonne: 0, explication: "$\\Delta = 16 - 52 = -36$, donc $z = \\dfrac{4 \\pm 6i}{2} = 2 \\pm 3i$." },
    { question: "Le discriminant de $z^2 + z + 1 = 0$ vaut :", choix: ["$-3$", "$5$", "$3$", "$-5$"], bonne: 0, explication: "$\\Delta = 1^2 - 4 \\times 1 \\times 1 = -3$." },
    { question: "Les solutions de $z^2 + z + 1 = 0$ sont :", choix: ["$-\\dfrac{1}{2} \\pm \\dfrac{\\sqrt{3}}{2}i$", "$\\dfrac{1}{2} \\pm \\dfrac{\\sqrt{3}}{2}i$", "$-1 \\pm i\\sqrt{3}$", "$-\\dfrac{1}{2} \\pm \\dfrac{3}{2}i$"], bonne: 0, explication: "$\\Delta = -3$, donc $z = \\dfrac{-1 \\pm i\\sqrt{3}}{2}$." },
    { question: "Si $\\Delta < 0$, l'équation $az^2 + bz + c = 0$ (coefficients réels) a dans $\\mathbb{C}$ :", choix: ["deux solutions conjuguées", "aucune solution", "une seule solution", "deux solutions réelles"], bonne: 0, explication: "Dans $\\mathbb{C}$, on a toujours deux solutions (éventuellement égales) ; si $\\Delta < 0$, elles sont conjuguées et non réelles." },
    { question: "La factorisation de $z^3 - 8$ par $z - 2$ est :", choix: ["$(z - 2)(z^2 + 2z + 4)$", "$(z - 2)(z^2 - 2z + 4)$", "$(z - 2)(z^2 + 4)$", "$(z - 2)(z^2 + 4z + 4)$"], bonne: 0, explication: "$z^3 - 2^3 = (z - 2)(z^2 + 2z + 2^2)$. On vérifie en développant." },
    { question: "Pour $P(z) = z^3 - 2z^2 + z - 2$, lequel de ces nombres est une racine ?", choix: ["$2$", "$1$", "$-2$", "$-1$"], bonne: 0, explication: "$P(2) = 8 - 8 + 2 - 2 = 0$. On a d'ailleurs $P(z) = (z - 2)(z^2 + 1)$." },
    { question: "Les solutions de $z^3 - 2z^2 + z - 2 = 0$, qui s'écrit $(z - 2)(z^2 + 1) = 0$, sont :", choix: ["$2$, $i$ et $-i$", "$2$ et $1$", "$2$, $1$ et $-1$", "$2$ seulement"], bonne: 0, explication: "$z - 2 = 0$ donne $2$ et $z^2 + 1 = 0$ donne $i$ et $-i$." },
    { question: "Un polynôme de degré $4$ a au plus :", choix: ["$4$ racines", "$3$ racines", "$5$ racines", "$8$ racines"], bonne: 0, explication: "Un polynôme de degré $n$ a au plus $n$ racines." },
    { question: "Si $P(1) = 0$, alors $P(z)$ est divisible par :", choix: ["$z - 1$", "$z + 1$", "$z$", "$z^2 - 1$"], bonne: 0, explication: "Une racine $a$ permet de factoriser par $z - a$." },
    { question: "Un polynôme à coefficients réels a pour racine $3 - 2i$. Il a aussi pour racine :", choix: ["$3 + 2i$", "$-3 + 2i$", "$-3 - 2i$", "$2 - 3i$"], bonne: 0, explication: "Pour un polynôme à coefficients réels, $P(\\overline{z_0}) = \\overline{P(z_0)} = 0$ : le conjugué est aussi racine." },
    { question: "Les solutions de $z^2 - 3z + 7 = 0$ ont pour produit :", choix: ["$7$", "$3$", "$-3$", "$-7$"], bonne: 0, explication: "Formule de Viète : $z_1z_2 = \\dfrac{c}{a} = 7$." },
    { question: "Les solutions de $2z^2 - 6z + 9 = 0$ ont pour somme :", choix: ["$3$", "$-3$", "$6$", "$\\dfrac{9}{2}$"], bonne: 0, explication: "$z_1 + z_2 = -\\dfrac{b}{a} = \\dfrac{6}{2} = 3$." },
    { question: "Quelle équation a pour solutions $1 + i$ et $1 - i$ ?", choix: ["$z^2 - 2z + 2 = 0$", "$z^2 + 2z + 2 = 0$", "$z^2 - 2z - 2 = 0$", "$z^2 + 2 = 0$"], bonne: 0, explication: "Somme $2$, produit $(1 + i)(1 - i) = 2$ : $z^2 - 2z + 2 = 0$." },
    { question: "On écrit $z^3 + 2z^2 + 2z + 1 = (z + 1)(z^2 + bz + c)$. Alors :", choix: ["$b = 1$ et $c = 1$", "$b = 2$ et $c = 1$", "$b = 1$ et $c = 2$", "$b = -1$ et $c = 1$"], bonne: 0, explication: "$(z + 1)(z^2 + bz + c) = z^3 + (b + 1)z^2 + (c + b)z + c$ : $b + 1 = 2$ et $c = 1$." },
    { question: "Combien l'équation $z^4 = 1$ a-t-elle de solutions dans $\\mathbb{C}$ ?", choix: ["$4$", "$2$", "$1$", "Une infinité"], bonne: 0, explication: "$z^4 - 1 = (z - 1)(z + 1)(z - i)(z + i)$ : les solutions sont $1$, $-1$, $i$ et $-i$." },
    { question: "Dans $\\mathbb{C}$, $z^2 + 4$ se factorise en :", choix: ["$(z - 2i)(z + 2i)$", "$(z - 2)(z + 2)$", "$(z + 2)^2$", "Il ne se factorise pas"], bonne: 0, explication: "$z^2 + 4 = z^2 - (2i)^2 = (z - 2i)(z + 2i)$." },
    { question: "Les solutions de $z^2 + 2z + 3 = 0$ sont :", choix: ["$-1 \\pm i\\sqrt{2}$", "$1 \\pm i\\sqrt{2}$", "$-1 \\pm 2i$", "$-2 \\pm i\\sqrt{2}$"], bonne: 0, explication: "$\\Delta = 4 - 12 = -8$ et $\\sqrt{8} = 2\\sqrt{2}$ : $z = \\dfrac{-2 \\pm 2i\\sqrt{2}}{2} = -1 \\pm i\\sqrt{2}$." },
    { question: "Pour $P(z) = z^3 + z$, laquelle de ces affirmations est vraie ?", choix: ["$P$ a trois racines : $0$, $i$ et $-i$", "$P$ a une seule racine, $0$", "$P$ n'a pas de racine", "$P$ a pour racines $0$, $1$ et $-1$"], bonne: 0, explication: "$z^3 + z = z(z^2 + 1) = z(z - i)(z + i)$." },
    { question: "Si $z_1$ est une solution non réelle de $z^2 + bz + c = 0$ ($b$, $c$ réels), alors $|z_1|^2$ vaut :", choix: ["$c$", "$b$", "$-b$", "$b^2 - 4c$"], bonne: 0, explication: "Les deux solutions sont $z_1$ et $\\overline{z_1}$, donc $c = z_1\\overline{z_1} = |z_1|^2$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Résoudre $az^2 + bz + c = 0$ dans $\\mathbb{C}$",
      figure: "xp-cours-parabole",
      etapes: [
        "Calculer $\\Delta = b^2 - 4ac$.",
        "Si $\\Delta \\geqslant 0$ : comme en Première.",
        "Si $\\Delta < 0$ : calculer $\\sqrt{-\\Delta}$, puis $z_1 = \\dfrac{-b - i\\sqrt{-\\Delta}}{2a}$ et $z_2 = \\overline{z_1}$.",
        "Simplifier et vérifier (somme $-\\dfrac{b}{a}$, produit $\\dfrac{c}{a}$)."
      ],
      exemple: "$z^2 + 6z + 10 = 0$ : $\\Delta = -4$, $z = \\dfrac{-6 \\pm 2i}{2} = -3 \\pm i$."
    },
    {
      titre: "Factoriser par identification",
      etapes: [
        "Vérifier que $P(a) = 0$.",
        "Écrire $P(z) = (z - a)(z^2 + bz + c)$ et développer le membre de droite.",
        "Identifier les coefficients de $z^2$, de $z$ et le terme constant avec ceux de $P$.",
        "Résoudre pour trouver $b$ et $c$ (une équation de plus sert de vérification)."
      ],
      exemple: "$z^3 - 1 = (z - 1)(z^2 + bz + c)$ : $b - 1 = 0$ et $-c = -1$, donc $b = 1$, $c = 1$."
    },
    {
      titre: "Résoudre une équation de degré 3",
      figure: "xp-cours-conjuguees",
      etapes: [
        "Trouver une racine $a$ (souvent donnée, ou évidente : $\\pm 1$, $\\pm 2$, $\\pm i$…).",
        "Factoriser : $P(z) = (z - a)Q(z)$ avec $Q$ de degré $2$.",
        "Résoudre $Q(z) = 0$ avec le discriminant.",
        "Conclure : au plus $3$ solutions, les non réelles par paires conjuguées."
      ],
      exemple: "$z^3 + 8 = (z + 2)(z^2 - 2z + 4)$ : solutions $-2$, $1 - i\\sqrt{3}$ et $1 + i\\sqrt{3}$."
    },
    {
      titre: "Trouver une équation à partir de ses solutions",
      etapes: [
        "Calculer la somme $S$ et le produit $P$ des deux solutions.",
        "Écrire l'équation $z^2 - Sz + P = 0$.",
        "Vérifier avec le discriminant si on a un doute."
      ],
      exemple: "Solutions $-1 \\pm 3i$ : $S = -2$, $P = 1 + 9 = 10$, d'où $z^2 + 2z + 10 = 0$."
    }
  ],
  erreurs: [
    "Dire qu'une équation du second degré « n'a pas de solution » quand $\\Delta < 0$ : dans $\\mathbb{C}$, elle en a deux.",
    "Écrire $\\sqrt{\\Delta}$ avec $\\Delta < 0$ : la notation $\\sqrt{\\ }$ est réservée aux réels positifs, on écrit $i\\sqrt{-\\Delta}$.",
    "Oublier de prendre la racine carrée : si $\\Delta = -16$, on utilise $4i$, pas $16i$.",
    "Factoriser par $z + a$ alors que $a$ est la racine : c'est $z - a$.",
    "Se tromper de signes dans $z^3 - a^3 = (z - a)(z^2 + az + a^2)$.",
    "Annoncer plus de $n$ racines pour un polynôme de degré $n$.",
    "Oublier la racine réelle connue dans l'ensemble des solutions d'une équation de degré $3$."
  ]
};
