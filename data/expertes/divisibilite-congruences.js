/*
  CHAPITRE : Terminale maths expertes — Divisibilité et congruences
  -----------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme officiel de maths expertes (BO spécial n° 8 du 25 juillet 2019), « Arithmétique » :
  divisibilité dans Z, division euclidienne, congruences et compatibilité avec les opérations,
  tests de divisibilité, problèmes de chiffrement (chiffrement affine). Le PGCD, Bézout et Gauss sont au chapitre 7.
  video : vidéos d'Yvan Monka. Générateurs : préfixe xd- dans assets/exercices-expertes.js ; figures "xd-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["expertes-divisibilite-congruences"] = {
  niveau: "Terminale maths expertes",
  numero: 6,
  titre: "Divisibilité et congruences",
  accroche: "Diviseurs, division euclidienne et calcul « modulo $n$ » : une arithmétique des restes, utile pour les calendriers, les codes et les messages secrets.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : divisibilité et congruences (PDF)", url: "https://www.maths-et-tiques.fr/telech/20ArithTE1.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Divisibilité dans ℤ",
      video: { titre: "Vidéo d'Yvan Monka : utiliser la propriété des combinaisons linéaires", youtube: "https://youtu.be/JGJ0VJV2Zgo" },
      texte:
        "Soit $a$ et $b$ deux entiers relatifs. On dit que $a$ **divise** $b$ (noté $a \\mid b$) s'il existe un entier $k$ tel que $b = ka$. On dit aussi que $b$ est un **multiple** de $a$.\n\n" +
        "- Tout entier non nul $b$ a un nombre fini de diviseurs, compris entre $-|b|$ et $|b|$. $0$ est multiple de tous les entiers.\n" +
        "- $a \\mid b$ si et seulement si $-a \\mid b$ : les diviseurs vont par paires opposées.\n" +
        "- **Transitivité** : si $a \\mid b$ et $b \\mid c$, alors $a \\mid c$.\n" +
        "- **Combinaisons linéaires** : si $d \\mid a$ et $d \\mid b$, alors $d \\mid au + bv$ pour tous entiers $u$ et $v$.\n\n" +
        "**Démonstration.** $a = kd$ et $b = k'd$, donc $au + bv = (ku + k'v)d$, avec $ku + k'v$ entier.",
      exemple: {
        enonce: "Détermine les entiers naturels $n$ tels que $n + 1$ divise $n + 8$.",
        solution: "$n + 1$ divise $n + 1$ et $n + 8$, donc il divise leur différence $7$. Les diviseurs positifs de $7$ sont $1$ et $7$ : $n + 1 = 1$ ou $n + 1 = 7$, soit $n = 0$ ou $n = 6$.\n\nRéciproquement, $1$ divise $8$ et $7$ divise $14$ : $S = \\{0\\,;6\\}$."
      }
    },
    {
      titre: "La division euclidienne",
      figure: "xd-cours-division",
      video: { titre: "Vidéo d'Yvan Monka : déterminer le quotient et le reste d'une division euclidienne", youtube: "https://youtu.be/bwS45UeOZrg" },
      texte:
        "**Théorème.** Soit $a$ un entier relatif et $b$ un entier naturel non nul. Il existe un **unique** couple d'entiers $(q\\,;r)$ tel que :\n\n" +
        "$a = bq + r$ avec $0 \\leqslant r < b$\n\n" +
        "$q$ est le **quotient** et $r$ le **reste** de la division euclidienne de $a$ par $b$. On a $b \\mid a$ si et seulement si $r = 0$.\n\n" +
        "**Attention aux nombres négatifs** : le reste reste positif. Pour $a = -17$ et $b = 5$, on écrit $-17 = 5 \\times (-4) + 3$ : le quotient est $-4$ et le reste $3$ (et non $-17 = 5 \\times (-3) - 2$).",
      exemple: {
        enonce: "Donne le quotient et le reste de la division euclidienne de $-45$ par $7$.",
        solution: "Le plus grand multiple de $7$ inférieur ou égal à $-45$ est $-49 = 7 \\times (-7)$.\n\n$-45 = 7 \\times (-7) + 4$ : quotient $-7$, reste $4$."
      }
    },
    {
      titre: "Les congruences",
      figure: "xd-cours-horloge",
      video: { titre: "Vidéo d'Yvan Monka : la notion de congruence en une minute", youtube: "https://youtu.be/HxcyqNbdVUI" },
      texte:
        "Soit $n \\geqslant 2$ un entier. On dit que $a$ et $b$ sont **congrus modulo $n$**, noté $a \\equiv b\\ [n]$, si $n$ divise $a - b$.\n\n" +
        "- $a \\equiv b\\ [n]$ si et seulement si $a$ et $b$ ont le **même reste** dans la division euclidienne par $n$.\n" +
        "- En particulier, $a \\equiv r\\ [n]$ où $r$ est le reste de la division de $a$ par $n$, et $a \\equiv 0\\ [n]$ signifie que $n$ divise $a$.\n" +
        "- Exemples : $17 \\equiv 2\\ [5]$, $-1 \\equiv 6\\ [7]$, $10 \\equiv -1\\ [11]$.\n\n" +
        "On compte « modulo $n$ » tous les jours : les heures se répètent modulo $12$ ou $24$, les jours de la semaine modulo $7$.",
      exemple: {
        enonce: "Le 1er janvier 2027 est un vendredi. Quel jour sera le 1er mars 2027 ($59$ jours plus tard) ?",
        solution: "$59 = 7 \\times 8 + 3$, donc $59 \\equiv 3\\ [7]$ : on avance de $3$ jours, vendredi → samedi → dimanche → **lundi**."
      }
    },
    {
      titre: "Calculer avec les congruences",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les propriétés des congruences", youtube: "https://youtu.be/4RRjMC8_Dio" },
      texte:
        "Si $a \\equiv b\\ [n]$ et $c \\equiv d\\ [n]$, alors :\n\n" +
        "- $a + c \\equiv b + d\\ [n]$ et $a - c \\equiv b - d\\ [n]$ ;\n" +
        "- $ac \\equiv bd\\ [n]$ ;\n" +
        "- $a^k \\equiv b^k\\ [n]$ pour tout entier naturel $k$.\n\n" +
        "**Démonstration (produit).** $ac - bd = a(c - d) + d(a - b)$ : c'est une combinaison linéaire de deux multiples de $n$, donc un multiple de $n$. Les puissances s'en déduisent par récurrence.\n\n" +
        "**Attention** : on ne peut pas « simplifier » une congruence en général. $2 \\times 1 \\equiv 2 \\times 4\\ [6]$, mais $1 \\not\\equiv 4\\ [6]$.",
      exemple: {
        enonce: "Quel est le reste de la division de $3^{2027}$ par $8$ ?",
        solution: "$3^2 = 9 \\equiv 1\\ [8]$. Comme $2027 = 2 \\times 1013 + 1$ : $3^{2027} = (3^2)^{1013} \\times 3 \\equiv 1^{1013} \\times 3 = 3\\ [8]$.\n\nLe reste est $3$."
      }
    },
    {
      titre: "Résoudre une congruence, raisonner par disjonction des cas",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation avec des congruences", youtube: "https://youtu.be/Hb39SqG6nbg" },
      texte:
        "Comme tout entier est congru à l'un des restes $0, 1, \\dots, n - 1$ modulo $n$, on peut **tester tous les restes** : c'est un tableau de congruences.\n\n" +
        "**Résoudre $ax \\equiv b\\ [n]$** : on calcule $ax$ modulo $n$ pour chaque reste possible de $x$, et on garde ceux qui donnent $b$. Il peut y avoir une solution, plusieurs, ou aucune.\n\n" +
        "**Disjonction des cas** : pour démontrer une propriété de tous les entiers, on étudie chaque reste possible.\n\n" +
        "Par exemple, modulo $3$ : si $n \\equiv 0$, $n^2 \\equiv 0$ ; si $n \\equiv 1$, $n^2 \\equiv 1$ ; si $n \\equiv 2$, $n^2 \\equiv 4 \\equiv 1$. Un carré n'est **jamais** congru à $2$ modulo $3$.",
      exemple: {
        enonce: "Résous $3x \\equiv 4\\ [7]$ pour $x$ entier entre $0$ et $6$.",
        solution: "Restes de $3x$ modulo $7$ pour $x = 0, \\dots, 6$ : $0$, $3$, $6$, $2$, $5$, $1$, $4$.\n\nLe reste vaut $4$ pour $x = 6$ : la solution est $x = 6$ (et, dans $\\mathbb{Z}$, tous les $x \\equiv 6\\ [7]$)."
      }
    },
    {
      titre: "Critères de divisibilité",
      video: { titre: "Vidéo d'Yvan Monka : démontrer une divisibilité à l'aide des congruences", youtube: "https://youtu.be/ZzlPFO59_t0" },
      texte:
        "Un entier s'écrit $N = a_k10^k + \\dots + a_1 \\times 10 + a_0$ avec ses chiffres $a_k, \\dots, a_0$.\n\n" +
        "- Modulo $9$ (et modulo $3$) : $10 \\equiv 1$, donc $10^k \\equiv 1$ et $N \\equiv a_k + \\dots + a_1 + a_0$. **Un nombre est divisible par $9$ (ou par $3$) si et seulement si la somme de ses chiffres l'est.**\n" +
        "- Modulo $11$ : $10 \\equiv -1$, donc $N \\equiv a_0 - a_1 + a_2 - \\dots$ (somme alternée des chiffres en partant des unités).\n" +
        "- Modulo $4$ : $100 \\equiv 0$, donc seuls les **deux derniers chiffres** comptent.\n" +
        "- Modulo $5$ ou $10$ : seul le chiffre des unités compte.",
      exemple: {
        enonce: "Le nombre $7\\,284\\,516$ est-il divisible par $9$ ? par $11$ ?",
        solution: "Somme des chiffres : $7 + 2 + 8 + 4 + 5 + 1 + 6 = 33 \\equiv 6\\ [9]$ : non divisible par $9$ (reste $6$).\n\nSomme alternée : $6 - 1 + 5 - 4 + 8 - 2 + 7 = 19 \\equiv 8\\ [11]$ : non divisible par $11$ (reste $8$)."
      }
    },
    {
      titre: "Chiffrement affine et codes de contrôle",
      video: { titre: "Vidéo d'Yvan Monka : coder et décoder avec un chiffrement affine", youtube: "https://youtu.be/PmKrQf7B0oM" },
      texte:
        "On numérote les lettres de $0$ (A) à $25$ (Z). Un **chiffrement affine** code la lettre de rang $x$ par la lettre de rang $y$, où $y$ est le reste de $ax + b$ modulo $26$.\n\n" +
        "- Pour que deux lettres différentes ne soient pas codées pareil, $a$ doit être premier avec $26$ (voir le chapitre 7) : $a$ impair et différent de $13$.\n" +
        "- Pour **décoder**, on résout $ax + b \\equiv y\\ [26]$, ce qui demande un inverse de $a$ modulo $26$.\n\n" +
        "**Codes de contrôle.** Les numéros de Sécurité sociale, de RIB ou les codes-barres contiennent une **clé** calculée avec des restes : une faute de frappe change la clé, et l'erreur est détectée. Par exemple, la clé d'un numéro de Sécurité sociale vaut $97 - r$, où $r$ est le reste du numéro (sans la clé) modulo $97$.",
      exemple: {
        enonce: "Avec $y \\equiv 5x + 2\\ [26]$, code la lettre M.",
        solution: "M a le rang $12$ : $5 \\times 12 + 2 = 62 = 2 \\times 26 + 10$. La lettre de rang $10$ est K : M est codée par K."
      }
    }
  ],

  videos: [
    { type: "Exercice", titre: "Démontrer une divisibilité à l'aide des congruences", youtube: "https://youtu.be/FoGGmSOSrDo" },
    { type: "Bac", titre: "Exercice du bac : divisibilité et congruences", youtube: "https://youtu.be/VzAa2otn_Lc" }
  ],
  videosNote: "Exercices corrigés en vidéo par Yvan Monka.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "xd-diviseurs", titre: "Compter des diviseurs", etape: "Divisibilité", nb: 5 },
    { type: "xd-division", titre: "Division euclidienne", etape: "Divisibilité", nb: 5 },
    { type: "xd-combinaison", titre: "Combinaisons linéaires", etape: "Divisibilité", nb: 4 },
    { type: "xd-congruence", titre: "Congruences et calendrier", etape: "Congruences", nb: 5 },
    { type: "xd-reste-puissance", titre: "Reste d'une puissance", etape: "Congruences", nb: 5 },
    { type: "xd-equation", titre: "Résoudre une congruence", etape: "Congruences", nb: 4 },
    { type: "xd-critere", titre: "Critères de divisibilité", etape: "Applications", nb: 5 },
    { type: "xd-chiffrement", titre: "Chiffrement affine", etape: "Applications", nb: 4 },
    { type: "xd-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Combien l'entier $28$ a-t-il de diviseurs positifs ?", choix: ["$6$", "$4$", "$5$", "$12$"], bonne: 0, explication: "$1$, $2$, $4$, $7$, $14$ et $28$ : six diviseurs." },
    { question: "Le reste de la division euclidienne de $-23$ par $4$ est :", choix: ["$1$", "$-3$", "$3$", "$-1$"], bonne: 0, explication: "$-23 = 4 \\times (-6) + 1$ avec $0 \\leqslant 1 < 4$." },
    { question: "Le quotient de la division euclidienne de $-23$ par $4$ est :", choix: ["$-6$", "$-5$", "$5$", "$-23$"], bonne: 0, explication: "$-23 = 4 \\times (-6) + 1$ : le quotient est $-6$ (avec $-5$, le reste serait $-3$, négatif)." },
    { question: "Si $d$ divise $a$ et $b$, alors $d$ divise forcément :", choix: ["$2a - 3b$", "$a + 1$", "$\\dfrac{a}{b}$", "$a^2 + 1$"], bonne: 0, explication: "Un diviseur commun divise toute combinaison linéaire $au + bv$ avec $u$, $v$ entiers." },
    { question: "Laquelle de ces congruences est vraie ?", choix: ["$38 \\equiv 2\\ [6]$", "$38 \\equiv 3\\ [6]$", "$38 \\equiv 4\\ [6]$", "$38 \\equiv 1\\ [6]$"], bonne: 0, explication: "$38 - 2 = 36 = 6 \\times 6$ : $38$ et $2$ ont le même reste, $2$, dans la division par $6$." },
    { question: "$a \\equiv b\\ [n]$ signifie que :", choix: ["$n$ divise $a - b$", "$a$ divise $b$", "$a - b = n$", "$a$ et $b$ divisent $n$"], bonne: 0, explication: "C'est la définition : $a - b$ est un multiple de $n$ (pas forcément égal à $n$)." },
    { question: "Quel est le reste de la division de $2^{100}$ par $3$ ?", choix: ["$1$", "$2$", "$0$", "$100$"], bonne: 0, explication: "$2 \\equiv -1\\ [3]$, donc $2^{100} \\equiv (-1)^{100} = 1\\ [3]$." },
    { question: "Quel est le reste de la division de $10^{10}$ par $9$ ?", choix: ["$1$", "$0$", "$10$", "$9$"], bonne: 0, explication: "$10 \\equiv 1\\ [9]$, donc $10^{10} \\equiv 1\\ [9]$." },
    { question: "Aujourd'hui, nous sommes un mercredi. Quel jour serons-nous dans $100$ jours ?", choix: ["Vendredi", "Jeudi", "Samedi", "Mercredi"], bonne: 0, explication: "$100 = 7 \\times 14 + 2$ : on avance de $2$ jours, mercredi → jeudi → vendredi." },
    { question: "Les solutions de $2x \\equiv 1\\ [5]$ entre $0$ et $4$ sont :", choix: ["$x = 3$", "$x = 2$", "$x = 3$ et $x = 4$", "aucune"], bonne: 0, explication: "Les restes de $2x$ pour $x = 0, \\dots, 4$ sont $0$, $2$, $4$, $1$, $3$ : seul $x = 3$ donne $1$." },
    { question: "L'équation $2x \\equiv 1\\ [4]$ a :", choix: ["aucune solution", "une solution", "deux solutions", "quatre solutions"], bonne: 0, explication: "$2x$ est pair, et un nombre pair n'est jamais congru à $1$ modulo $4$ : restes $0$ ou $2$." },
    { question: "Le nombre $5\\,382$ est-il divisible par $9$ ?", choix: ["Oui, car $5 + 3 + 8 + 2 = 18$", "Non, car il est pair", "Non, car il se termine par $2$", "Oui, car $82$ est divisible par $9$"], bonne: 0, explication: "Un nombre est divisible par $9$ si et seulement si la somme de ses chiffres l'est : $18$ est divisible par $9$." },
    { question: "Quel est le reste de la division de $1\\,234$ par $11$ ?", choix: ["$2$", "$4$", "$10$", "$1$"], bonne: 0, explication: "Somme alternée en partant des unités : $4 - 3 + 2 - 1 = 2$." },
    { question: "Le nombre $27\\,316$ est-il divisible par $4$ ?", choix: ["Oui, car $16$ est divisible par $4$", "Non, car $6$ n'est pas divisible par $4$", "Non, car la somme des chiffres est $19$", "Oui, car il est pair"], bonne: 0, explication: "$100 \\equiv 0\\ [4]$ : seuls les deux derniers chiffres comptent, et $16 = 4 \\times 4$." },
    { question: "Pour tout entier $n$, $n^2$ modulo $3$ peut valoir :", choix: ["$0$ ou $1$", "$0$, $1$ ou $2$", "$1$ seulement", "$0$ ou $2$"], bonne: 0, explication: "Si $n \\equiv 0$, $n^2 \\equiv 0$ ; si $n \\equiv 1$ ou $n \\equiv 2$, $n^2 \\equiv 1\\ [3]$." },
    { question: "Avec le codage $y \\equiv 3x + 1\\ [26]$ (A = $0$), la lettre C est codée par la lettre de rang :", choix: ["$7$", "$9$", "$6$", "$3$"], bonne: 0, explication: "C a le rang $2$ : $3 \\times 2 + 1 = 7$, c'est la lettre H." },
    { question: "Les entiers naturels $n$ tels que $n + 2$ divise $n + 5$ sont :", choix: ["$n = 1$", "$n = 1$ et $n = 3$", "$n = 3$", "aucun"], bonne: 0, explication: "$n + 2$ divise $(n + 5) - (n + 2) = 3$, donc $n + 2 \\in \\{1\\,;3\\}$. Comme $n + 2 \\geqslant 2$, il reste $n + 2 = 3$, soit $n = 1$." },
    { question: "Si $a \\equiv 3\\ [7]$ et $b \\equiv 5\\ [7]$, alors $ab$ est congru modulo $7$ à :", choix: ["$1$", "$15$", "$8$", "$0$"], bonne: 0, explication: "$ab \\equiv 3 \\times 5 = 15 \\equiv 1\\ [7]$ (le reste doit être entre $0$ et $6$)." },
    { question: "Combien l'entier $-12$ a-t-il de diviseurs dans $\\mathbb{Z}$ ?", choix: ["$12$", "$6$", "$0$", "$24$"], bonne: 0, explication: "Ses diviseurs positifs sont $1$, $2$, $3$, $4$, $6$, $12$, et leurs opposés : $12$ diviseurs." },
    { question: "Le produit de deux entiers consécutifs est toujours :", choix: ["pair", "impair", "multiple de $3$", "un carré"], bonne: 0, explication: "L'un des deux entiers est pair, donc le produit est pair." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Effectuer une division euclidienne (cas négatif)",
      figure: "xd-cours-division",
      etapes: [
        "Chercher le plus grand multiple de $b$ **inférieur ou égal** à $a$ : c'est $bq$.",
        "Calculer le reste $r = a - bq$.",
        "Vérifier que $0 \\leqslant r < b$, puis écrire $a = bq + r$."
      ],
      exemple: "$-30$ par $8$ : le multiple est $-32 = 8 \\times (-4)$, donc $-30 = 8 \\times (-4) + 2$."
    },
    {
      titre: "Calculer le reste d'une grande puissance",
      figure: "xd-cours-horloge",
      etapes: [
        "Réduire la base : remplacer $a$ par son reste (ou par un nombre plus simple comme $-1$).",
        "Chercher une petite puissance congrue à $1$ (ou à $-1$) : $a^p \\equiv 1\\ [n]$.",
        "Diviser l'exposant : $k = pq + s$, donc $a^k = (a^p)^q \\times a^s \\equiv a^s\\ [n]$.",
        "Conclure avec un reste entre $0$ et $n - 1$."
      ],
      exemple: "$5^{77}$ modulo $6$ : $5 \\equiv -1\\ [6]$, donc $5^{77} \\equiv (-1)^{77} = -1 \\equiv 5\\ [6]$."
    },
    {
      titre: "Utiliser une combinaison linéaire",
      etapes: [
        "Repérer ce qui doit diviser quoi : « $n + a$ divise $bn + c$ ».",
        "Écrire $bn + c = b(n + a) + K$ avec $K$ entier.",
        "En déduire que $n + a$ divise $K$, et lister les diviseurs de $K$.",
        "Revenir à $n$, puis vérifier (réciproque)."
      ],
      exemple: "$n + 3 \\mid 2n + 11$ : $2n + 11 = 2(n + 3) + 5$, donc $n + 3 \\mid 5$, $n + 3 = 5$ et $n = 2$."
    },
    {
      titre: "Résoudre $ax \\equiv b\\ [n]$",
      etapes: [
        "Faire un tableau avec les restes possibles $x = 0, 1, \\dots, n - 1$.",
        "Calculer le reste de $ax$ modulo $n$ pour chacun.",
        "Garder les $x$ qui donnent $b$ (il peut n'y en avoir aucun).",
        "Dans $\\mathbb{Z}$ : les solutions sont tous les entiers congrus à ces restes."
      ],
      exemple: "$4x \\equiv 2\\ [6]$ : restes de $4x$ : $0$, $4$, $2$, $0$, $4$, $2$, donc $x \\equiv 2$ ou $x \\equiv 5\\ [6]$."
    }
  ],
  erreurs: [
    "Donner un reste négatif : le reste d'une division euclidienne est toujours entre $0$ et $b - 1$.",
    "Oublier $1$ et le nombre lui-même dans la liste des diviseurs.",
    "Écrire « $a \\equiv b\\ [n]$ donc $a - b = n$ » : $a - b$ est seulement un **multiple** de $n$.",
    "Simplifier une congruence par un facteur commun : $2a \\equiv 2b\\ [8]$ n'entraîne pas $a \\equiv b\\ [8]$.",
    "Réduire l'exposant modulo $n$ : $2^{10}$ modulo $3$ ne se calcule pas avec $10 \\equiv 1\\ [3]$, mais avec le cycle des puissances de $2$.",
    "Croire qu'un produit nul modulo $n$ impose un facteur nul : $2 \\times 3 \\equiv 0\\ [6]$.",
    "Commencer à $1$ pour A dans un chiffrement : par convention, A a le rang $0$."
  ]
};
