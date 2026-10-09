/*
  CHAPITRE : Première spécialité — Dérivation 1 : point de vue local
  -------------------------------------------------------------------
  Chapitre 7 de la progression spiralée 2026-2027 (programme de Première 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas encore de vidéo de la chaîne ni de PDF pour ce chapitre : les vidéos sont celles d'Yvan Monka.
  Figures : "secante", "secantes-tangente", "tangente-lecture", "taxi-vitesse". Générateurs : d1-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-derivation-1"] = {
  niveau: "Première spécialité",
  numero: 7,
  titre: "Dérivation 1 : point de vue local",
  accroche: "Des sécantes qui pivotent jusqu'à la tangente : nombre dérivé, équation de tangente, vitesse du taxi sur la route de Sada et coût d'un pot de confiture de plus.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur la dérivation en vidéo (Yvan Monka)", url: "https://youtu.be/uMSNllPBFhQ", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Taux de variation et sécante",
      figure: "secante",
      texte:
        "Soit $f$ une fonction et $a$, $b$ deux réels distincts de son ensemble de définition. Le **taux de variation** de $f$ entre $a$ et $b$ est\n\n" +
        "$\\dfrac{f(b) - f(a)}{b - a}$.\n\n" +
        "C'est le **coefficient directeur** (la pente) de la **sécante** $(AB)$, avec $A(a\\,;f(a))$ et $B(b\\,;f(b))$.\n\n" +
        "En posant $b = a + h$ (avec $h \\neq 0$), le taux s'écrit $\\dfrac{f(a + h) - f(a)}{h}$.\n\n" +
        "Sur le schéma, pour $f(x) = x^2$ entre $1$ et $3$ : on avance de $2$ et on monte de $8$, la pente vaut $\\dfrac{9 - 1}{3 - 1} = 4$.",
      exemple: {
        enonce: "Calcule le taux de variation de $f(x) = x^2$ entre $2$ et $2 + h$.",
        solution: "$\\dfrac{(2 + h)^2 - 4}{h} = \\dfrac{4h + h^2}{h} = 4 + h$, pour $h \\neq 0$."
      }
    },
    {
      titre: "Nombre dérivé : limite du taux de variation",
      figure: "secantes-tangente",
      video: { titre: "Vidéo d'Yvan Monka : calculer le nombre dérivé (1)", youtube: "https://youtu.be/UmT0Gov6yyE" },
      texte:
        "Quand $h$ se rapproche de $0$, le point $M$ d'abscisse $a + h$ se rapproche de $A$, et la sécante $(AM)$ pivote autour de $A$ (schéma).\n\n" +
        "**Définition** : $f$ est **dérivable** en $a$ si le taux $\\dfrac{f(a + h) - f(a)}{h}$ se rapproche d'un nombre réel quand $h$ se rapproche de $0$. Ce nombre est le **nombre dérivé** de $f$ en $a$, noté $f'(a)$ :\n\n" +
        "$f'(a) = \\lim\\limits_{h \\to 0} \\dfrac{f(a + h) - f(a)}{h}$.\n\n" +
        "On ne peut pas remplacer $h$ par $0$ (on obtiendrait $\\dfrac{0}{0}$) : on **simplifie d'abord** par $h$, puis on fait tendre $h$ vers $0$.",
      exemple: {
        enonce: "Pour $f(x) = x^2$, calcule $f'(1)$.",
        solution: "$\\dfrac{(1 + h)^2 - 1}{h} = \\dfrac{2h + h^2}{h} = 2 + h$, qui se rapproche de $2$ : $f'(1) = 2$.\n\nSur le schéma, les sécantes $(AM_1)$, $(AM_2)$… de pentes $4$, $3$, $2{,}5$ se rapprochent de la tangente, de pente $2$."
      }
    },
    {
      titre: "Avec la fonction inverse",
      video: { titre: "Vidéo d'Yvan Monka : calculer le nombre dérivé (2)", youtube: "https://youtu.be/Iv5_mw1EYBE" },
      texte:
        "Pour $f(x) = \\dfrac{1}{x}$ et $a \\neq 0$ :\n\n" +
        "$f(a + h) - f(a) = \\dfrac{1}{a + h} - \\dfrac{1}{a} = \\dfrac{a - (a + h)}{a(a + h)} = \\dfrac{-h}{a(a + h)}$.\n\n" +
        "Le taux vaut donc $\\dfrac{-1}{a(a + h)}$, qui se rapproche de $-\\dfrac{1}{a^2}$ quand $h$ tend vers $0$ :\n\n" +
        "$f'(a) = -\\dfrac{1}{a^2}$.\n\n" +
        "Ce nombre dérivé est toujours négatif : la courbe de la fonction inverse descend sur chacun de ses deux intervalles.",
      exemple: {
        enonce: "Calcule $f'(2)$ et $f'(-1)$ pour $f(x) = \\dfrac{1}{x}$.",
        solution: "$f'(2) = -\\dfrac{1}{4}$ et $f'(-1) = -\\dfrac{1}{(-1)^2} = -1$."
      }
    },
    {
      titre: "Lire un nombre dérivé, tracer une tangente",
      figure: "tangente-lecture",
      video: { titre: "Vidéo d'Yvan Monka : lire graphiquement le nombre dérivé", youtube: "https://youtu.be/f7AuwNAagAQ" },
      texte:
        "La **tangente** à la courbe de $f$ au point $A(a\\,;f(a))$ est la droite passant par $A$ de coefficient directeur $f'(a)$ : c'est la position limite des sécantes.\n\n" +
        "**Lire** $f'(a)$ : on part de $A$, on avance d'une unité vers la droite et on compte de combien la tangente monte (nombre positif) ou descend (nombre négatif). Sur le schéma, $f'(1) = 3$.\n\n" +
        "- Tangente horizontale : $f'(a) = 0$.\n" +
        "- Si la lecture est difficile, avance de $2$ unités puis divise par $2$.\n\n" +
        "**Tracer** la tangente quand on connaît $f'(a)$ : placer $A$, puis le point obtenu en avançant de $1$ et en montant de $f'(a)$, et relier les deux points.",
      exemple: {
        enonce: "On sait que $f(-1) = 2$ et $f'(-1) = -\\dfrac{1}{2}$. Comment tracer la tangente au point d'abscisse $-1$ ?",
        solution: "On place $A(-1\\,;2)$. On avance de $2$ et on descend de $1$ : on arrive au point $(1\\,;1)$. La tangente est la droite passant par ces deux points."
      }
    },
    {
      titre: "Démonstration : équation de la tangente",
      video: { titre: "Vidéo d'Yvan Monka : démonstration de l'équation de la tangente", youtube: "https://youtu.be/Jj0ql6-o2Uo" },
      texte:
        "**Propriété** : si $f$ est dérivable en $a$, la tangente à sa courbe au point d'abscisse $a$ a pour équation\n\n" +
        "$y = f'(a)(x - a) + f(a)$.\n\n" +
        "**Démonstration**. La tangente a pour coefficient directeur $f'(a)$ : son équation est de la forme $y = f'(a)\\,x + p$. Elle passe par $A(a\\,;f(a))$, donc $f(a) = f'(a) \\times a + p$, soit $p = f(a) - f'(a)\\,a$.\n\n" +
        "Ainsi $y = f'(a)\\,x + f(a) - f'(a)\\,a = f'(a)(x - a) + f(a)$.",
      exemple: {
        enonce: "Pour $f(x) = x^2$, on a $f(3) = 9$ et $f'(3) = 6$. Donne l'équation de la tangente au point d'abscisse $3$.",
        solution: "$y = 6(x - 3) + 9 = 6x - 18 + 9 = 6x - 9$. Vérification : pour $x = 3$, on trouve bien $y = 9$."
      }
    },
    {
      titre: "Approximation linéaire",
      video: { titre: "Vidéo d'Yvan Monka : utiliser une approximation linéaire", youtube: "https://youtu.be/jH8CXsqhy7M" },
      texte:
        "Près du point $A$, la courbe et sa tangente sont presque confondues. Pour $h$ proche de $0$ :\n\n" +
        "$f(a + h) \\approx f(a) + f'(a)\\,h$.\n\n" +
        "C'est l'**approximation linéaire** de $f$ au voisinage de $a$ : on remplace la courbe par sa tangente. Plus $h$ est petit, meilleure est l'approximation.",
      exemple: {
        enonce: "Avec $f(x) = x^2$, $f(3) = 9$ et $f'(3) = 6$, donne une valeur approchée de $3{,}01^2$.",
        solution: "$3{,}01^2 \\approx 9 + 6 \\times 0{,}01 = 9{,}06$. La valeur exacte est $9{,}0601$."
      }
    },
    {
      titre: "Interpréter : la vitesse du taxi",
      figure: "taxi-vitesse",
      texte:
        "Sur la route de Sada, un taxi démarre. La distance parcourue (en m) au bout de $t$ secondes est $d(t) = 0{,}8t^2$.\n\n" +
        "- **Vitesse moyenne** entre $5$ et $10$ s : $\\dfrac{d(10) - d(5)}{10 - 5} = \\dfrac{80 - 20}{5} = 12$ m/s. C'est la pente de la **sécante** (en pointillés).\n" +
        "- **Vitesse instantanée** à $t = 10$ s : $\\dfrac{d(10 + h) - d(10)}{h} = \\dfrac{0{,}8(20h + h^2)}{h} = 16 + 0{,}8h$, qui tend vers $16$. Donc $d'(10) = 16$ m/s, soit $57{,}6$ km/h : c'est la pente de la **tangente**.\n\n" +
        "La vitesse affichée par le compteur est une vitesse instantanée : un nombre dérivé.",
      exemple: {
        enonce: "Quelle est la vitesse instantanée du taxi à $t = 5$ s ?",
        solution: "$\\dfrac{d(5 + h) - d(5)}{h} = \\dfrac{0{,}8(10h + h^2)}{h} = 8 + 0{,}8h$, qui tend vers $8$ : $d'(5) = 8$ m/s, soit $28{,}8$ km/h."
      }
    },
    {
      titre: "Interpréter : le coût marginal",
      texte:
        "Une coopérative de Bandrélé fabrique des pots de confiture de mangue. Le coût de fabrication de $q$ pots est $C(q) = 0{,}02q^2 + 2q + 50$ euros.\n\n" +
        "Le **coût marginal** en $q$ est le nombre dérivé $C'(q)$ : c'est, environ, le coût de fabrication d'un pot supplémentaire.\n\n" +
        "Pour $q = 100$ : $\\dfrac{C(100 + h) - C(100)}{h} = \\dfrac{0{,}02(200h + h^2) + 2h}{h} = 6 + 0{,}02h$, qui tend vers $6$. Donc $C'(100) = 6$ €.\n\n" +
        "Vérification : $C(101) - C(100) = 456{,}02 - 450 = 6{,}02$ € pour fabriquer le 101e pot.",
      exemple: {
        enonce: "Calcule le coût marginal $C'(50)$.",
        solution: "$\\dfrac{C(50 + h) - C(50)}{h} = \\dfrac{0{,}02(100h + h^2) + 2h}{h} = 4 + 0{,}02h$, qui tend vers $4$ : $C'(50) = 4$ €."
      }
    },
    {
      titre: "Python : les pentes des sécantes",
      texte:
        "On calcule la pente des sécantes pour des pas $h$ de plus en plus petits :\n\n" +
        "```python\ndef f(x):\n    return x**2\n\ndef pentes(a, pas):\n    return [(f(a + h) - f(a)) / h for h in pas]\n\nprint(pentes(3, [1, 0.1, 0.01, 0.001]))\n```\n\n" +
        "Le programme affiche environ $\\texttt{[7.0, 6.1, 6.01, 6.001]}$, avec de petites erreurs d'arrondi dans les derniers chiffres. Les pentes se rapprochent de $6$ : on conjecture que $f'(3) = 6$.",
      exemple: {
        enonce: "Que faut-il écrire pour étudier $f'(-2)$ ? Que trouve-t-on ?",
        solution: "On appelle $\\texttt{pentes(-2,}$ $\\texttt{[1, 0.1, 0.01, 0.001])}$ : on obtient environ $-3$, $-3{,}9$, $-3{,}99$, $-3{,}999$, qui se rapprochent de $-4 = f'(-2)$."
      }
    },
    {
      titre: "Logique : paramètre et variable",
      texte:
        "Dans $f'(a) = \\lim\\limits_{h \\to 0} \\dfrac{f(a + h) - f(a)}{h}$ :\n\n" +
        "- $a$ est un **paramètre** : il est fixé pendant tout le calcul, c'est l'abscisse du point étudié ;\n" +
        "- $h$ est une **variable** : elle prend des valeurs non nulles de plus en plus proches de $0$ ;\n" +
        "- $f'(a)$ est un **nombre**, pas une fonction (pour l'instant).\n\n" +
        "Dans l'équation de tangente $y = f'(a)(x - a) + f(a)$, les nombres $a$, $f(a)$ et $f'(a)$ sont fixés : ce sont $x$ et $y$ qui varient le long de la droite.",
      exemple: {
        enonce: "Dans $y = 6(x - 3) + 9$, que représentent $3$, $6$ et $9$ ?",
        solution: "$3$ est l'abscisse $a$ du point de contact, $9 = f(3)$ son ordonnée et $6 = f'(3)$ la pente de la tangente."
      }
    }
  ],

  videos: [
    { titre: "Déterminer une équation d'une tangente à une courbe", type: "Tangente", youtube: "https://youtu.be/fKEGoo50Xmo" },
    { titre: "Déterminer graphiquement le nombre dérivé et l'équation de la tangente", type: "Lecture graphique", youtube: "https://youtu.be/0jhxK55jONs" },
    { titre: "Déterminer graphiquement une tangente à une courbe", type: "Lecture graphique", youtube: "https://youtu.be/7-z62dSkkTQ" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "d1-taux", titre: "Taux de variation", etape: "Nombre dérivé", nb: 5 },
    { type: "d1-nombre-derive", titre: "Calculer un nombre dérivé", etape: "Nombre dérivé", nb: 5 },
    { type: "d1-statut", titre: "Paramètre ou variable ?", etape: "Nombre dérivé", nb: 4 },
    { type: "d1-lire", titre: "Lire un nombre dérivé, une tangente", etape: "Tangente", nb: 5 },
    { type: "d1-tangente-eq", titre: "Équation de la tangente", etape: "Tangente", nb: 5 },
    { type: "d1-approx", titre: "Approximation linéaire", etape: "Tangente", nb: 4 },
    { type: "d1-vitesse", titre: "La vitesse du taxi", etape: "Interpréter", nb: 4 },
    { type: "d1-marginal", titre: "Le coût marginal", etape: "Interpréter", nb: 4 },
    { type: "d1-python", titre: "Python : pentes des sécantes", etape: "Interpréter", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    {
      question: "Le taux de variation de $f(x) = x^2$ entre $1$ et $4$ vaut :",
      choix: ["$5$", "$15$", "$3$", "$8$"],
      bonne: 0,
      explication: "$\\dfrac{16 - 1}{4 - 1} = \\dfrac{15}{3} = 5$."
    },
    {
      question: "Le taux de variation de $f$ entre $a$ et $b$ est :",
      choix: ["le coefficient directeur de la sécante $(AB)$", "l'ordonnée à l'origine de $(AB)$", "la moyenne de $f(a)$ et $f(b)$", "la pente de la tangente en $a$"],
      bonne: 0,
      explication: "$\\dfrac{f(b) - f(a)}{b - a}$ est la pente de la droite passant par $A(a\\,;f(a))$ et $B(b\\,;f(b))$."
    },
    {
      question: "Pour $f(x) = x^2$ et $h \\neq 0$, le taux $\\dfrac{f(3 + h) - f(3)}{h}$ vaut :",
      choix: ["$6 + h$", "$6$", "$9 + h$", "$h^2 + 6$"],
      bonne: 0,
      explication: "$(3 + h)^2 - 9 = 6h + h^2$, et on divise par $h$."
    },
    {
      question: "Avec le résultat précédent, $f'(3)$ vaut :",
      choix: ["$6$", "$9$", "$3$", "$6 + h$"],
      bonne: 0,
      explication: "Quand $h$ se rapproche de $0$, $6 + h$ se rapproche de $6$. Un nombre dérivé ne dépend pas de $h$."
    },
    {
      question: "Pour $f(x) = \\dfrac{1}{x}$, $f'(2)$ vaut :",
      choix: ["$-\\dfrac{1}{4}$", "$\\dfrac{1}{4}$", "$-\\dfrac{1}{2}$", "$\\dfrac{1}{2}$"],
      bonne: 0,
      explication: "$f'(a) = -\\dfrac{1}{a^2}$, donc $f'(2) = -\\dfrac{1}{4}$."
    },
    {
      question: "La tangente au point d'abscisse $a$ est horizontale. Cela signifie :",
      choix: ["$f'(a) = 0$", "$f(a) = 0$", "$a = 0$", "$f$ n'est pas dérivable en $a$"],
      bonne: 0,
      explication: "Une droite horizontale a un coefficient directeur nul."
    },
    {
      question: "La tangente en $A(2\\,;5)$ passe aussi par le point $(3\\,;2)$. Alors $f'(2)$ vaut :",
      choix: ["$-3$", "$3$", "$5$", "$2$"],
      bonne: 0,
      explication: "On avance de $1$ et on descend de $3$ : la pente vaut $\\dfrac{2 - 5}{3 - 2} = -3$."
    },
    {
      question: "L'équation de la tangente au point d'abscisse $a$ est :",
      choix: ["$y = f'(a)(x - a) + f(a)$", "$y = f(a)(x - a) + f'(a)$", "$y = f'(a)(x + a) + f(a)$", "$y = f'(a)\\,x + f(a)$"],
      bonne: 0,
      explication: "Pente $f'(a)$ et passage par $A(a\\,;f(a))$. La dernière proposition ne convient que si $a = 0$."
    },
    {
      question: "$f(1) = 3$ et $f'(1) = 2$. La tangente au point d'abscisse $1$ a pour équation :",
      choix: ["$y = 2x + 1$", "$y = 2x + 3$", "$y = 3x + 2$", "$y = 2x - 1$"],
      bonne: 0,
      explication: "$y = 2(x - 1) + 3 = 2x + 1$."
    },
    {
      question: "$f(2) = 4$ et $f'(2) = -1$. Une valeur approchée de $f(2{,}1)$ est :",
      choix: ["$3{,}9$", "$4{,}1$", "$3$", "$4$"],
      bonne: 0,
      explication: "$f(2 + 0{,}1) \\approx 4 + (-1) \\times 0{,}1 = 3{,}9$."
    },
    {
      question: "Pour $h$ proche de $0$, l'approximation linéaire s'écrit :",
      choix: ["$f(a + h) \\approx f(a) + f'(a)\\,h$", "$f(a + h) \\approx f(a) + h$", "$f(a + h) \\approx f'(a) + f(a)\\,h$", "$f(a + h) \\approx f(a)\\,h$"],
      bonne: 0,
      explication: "On remplace la courbe par sa tangente : $y = f(a) + f'(a)(x - a)$ avec $x = a + h$."
    },
    {
      question: "$d(t)$ est la distance (en m) parcourue par un taxi au bout de $t$ secondes. $d'(4) = 12$ signifie :",
      choix: ["à $t = 4$ s, sa vitesse est $12$ m/s", "il a parcouru $12$ m en $4$ s", "sa vitesse moyenne sur $4$ s est $12$ m/s", "il s'arrête au bout de $4$ s"],
      bonne: 0,
      explication: "Le nombre dérivé de la distance est la vitesse instantanée."
    },
    {
      question: "Pour le taxi, la vitesse moyenne entre $t_1$ et $t_2$ correspond à :",
      choix: ["la pente d'une sécante", "la pente d'une tangente", "une image $d(t)$", "une ordonnée à l'origine"],
      bonne: 0,
      explication: "C'est le taux de variation $\\dfrac{d(t_2) - d(t_1)}{t_2 - t_1}$ : la pente de la sécante."
    },
    {
      question: "Le coût marginal $C'(q)$ représente environ :",
      choix: ["le coût de fabrication d'un objet supplémentaire", "le coût total de $q$ objets", "le coût moyen d'un objet", "le bénéfice réalisé"],
      bonne: 0,
      explication: "$C'(q) \\approx C(q + 1) - C(q)$ : le coût d'une unité de plus."
    },
    {
      question: "Peut-on calculer $f'(a)$ en remplaçant directement $h$ par $0$ dans $\\dfrac{f(a + h) - f(a)}{h}$ ?",
      choix: ["Non, il faut d'abord simplifier par $h$", "Oui, toujours", "Oui, si $a = 0$", "Non, car $f'(a)$ n'existe jamais"],
      bonne: 0,
      explication: "Pour $h = 0$, on obtient $\\dfrac{0}{0}$. On simplifie par $h$ (avec $h \\neq 0$), puis on fait tendre $h$ vers $0$."
    },
    {
      question: "Dans $\\dfrac{f(a + h) - f(a)}{h}$, la lettre $a$ est :",
      choix: ["un paramètre fixé", "une variable qui tend vers $0$", "toujours égale à $0$", "le nombre dérivé"],
      bonne: 0,
      explication: "$a$ est l'abscisse fixée du point étudié ; c'est $h$ qui varie."
    },
    {
      question: "Avec $f(x) = x^2$, que renvoie environ pentes(3, [1, 0.1, 0.01]) (programme du cours) ?",
      choix: ["[7.0, 6.1, 6.01]", "[9, 9.61, 9.0601]", "[6, 6, 6]", "[16.0, 9.61, 9.06]"],
      bonne: 0,
      explication: "Ce sont les pentes $6 + h$ des sécantes pour $h = 1$, $0{,}1$, $0{,}01$."
    },
    {
      question: "Les pentes des sécantes calculées par Python se rapprochent de $-4$. On conjecture que :",
      choix: ["$f'(a) = -4$", "$f(a) = -4$", "$a = -4$", "la tangente passe par $(0\\,;-4)$"],
      bonne: 0,
      explication: "La limite des pentes des sécantes est le nombre dérivé, pente de la tangente."
    },
    { question: "Le taux de variation de $f(x) = 3x - 7$ entre $2$ et $10$ vaut :", choix: ["$3$", "$24$", "$8$", "$-7$"], bonne: 0, explication: "$\\dfrac{f(10) - f(2)}{10 - 2} = \\dfrac{23 - (-1)}{8} = \\dfrac{24}{8} = 3$. Pour une fonction affine, le taux de variation est toujours le coefficient directeur." },
    { question: "Le taux de variation de $f(x) = x^2$ entre $-2$ et $1$ vaut :", choix: ["$-1$", "$1$", "$-3$", "$3$"], bonne: 0, explication: "$\\dfrac{f(1) - f(-2)}{1 - (-2)} = \\dfrac{1 - 4}{3} = -1$. Sans diviser par l'écart $3$, on trouverait $-3$." },
    { question: "Pour $f(x) = 2x^2$ et $h \\neq 0$, le taux $\\dfrac{f(1 + h) - f(1)}{h}$ vaut :", choix: ["$4 + 2h$", "$2 + 2h$", "$4 + h$", "$2h$"], bonne: 0, explication: "$f(1 + h) - f(1) = 2(1 + 2h + h^2) - 2 = 4h + 2h^2$, puis on divise par $h$ : $4 + 2h$. Donc $f'(1) = 4$." },
    { question: "Pour $f(x) = x^2 + 5x$, on trouve $\\dfrac{f(a + h) - f(a)}{h} = 2a + 5 + h$. Le nombre dérivé $f'(a)$ vaut :", choix: ["$2a + 5$", "$2a + 5 + h$", "$a^2 + 5a$", "$5$"], bonne: 0, explication: "Quand $h$ se rapproche de $0$, $2a + 5 + h$ se rapproche de $2a + 5$. Un nombre dérivé ne dépend pas de $h$, et $a^2 + 5a$ est l'image $f(a)$." },
    { question: "Pour $f(x) = \\dfrac{1}{x}$, la tangente au point d'abscisse $-1$ a pour coefficient directeur :", choix: ["$-1$", "$1$", "$-\\dfrac{1}{2}$", "$0$"], bonne: 0, explication: "$f'(a) = -\\dfrac{1}{a^2}$, donc $f'(-1) = -\\dfrac{1}{(-1)^2} = -1$. Le carré est positif : ce nombre dérivé reste négatif." },
    { question: "$f(-2) = 3$ et $f'(-2) = 4$. La tangente au point d'abscisse $-2$ a pour équation :", choix: ["$y = 4x + 11$", "$y = 4x - 5$", "$y = 4x + 3$", "$y = 3x + 10$"], bonne: 0, explication: "$y = f'(-2)(x - (-2)) + f(-2) = 4(x + 2) + 3 = 4x + 11$. Vérification : pour $x = -2$, $y = -8 + 11 = 3$." },
    { question: "La tangente à la courbe de $f$ en $A(1\\,;2)$ passe aussi par $B(3\\,;3)$. Alors $f'(1) =$", choix: ["$\\dfrac{1}{2}$", "$1$", "$2$", "$3$"], bonne: 0, explication: "$f'(1)$ est la pente de la tangente : $\\dfrac{3 - 2}{3 - 1} = \\dfrac{1}{2}$. On avance de $2$ et on monte de $1$." },
    { question: "$f(3) = 9$ et $f'(3) = 6$. Une valeur approchée de $f(2{,}99)$ est :", choix: ["$8{,}94$", "$9{,}06$", "$8{,}99$", "$8{,}4$"], bonne: 0, explication: "$f(3 + h) \\approx f(3) + f'(3)\\,h$ avec $h = -0{,}01$ : $9 + 6 \\times (-0{,}01) = 8{,}94$. Ici $h$ est négatif." },
    { question: "Un taxi parcourt $d(t) = 0{,}8t^2$ mètres en $t$ secondes. Sa vitesse moyenne entre $t = 0$ et $t = 5$ s vaut :", choix: ["$4$ m/s", "$20$ m/s", "$8$ m/s", "$0{,}8$ m/s"], bonne: 0, explication: "$\\dfrac{d(5) - d(0)}{5 - 0} = \\dfrac{20}{5} = 4$ m/s : c'est la pente d'une sécante. $8$ m/s est la vitesse instantanée $d'(5)$." },
    { question: "Vrai ou faux : si $f(a) = 0$, alors $f'(a) = 0$.", choix: ["Faux", "Vrai"], bonne: 0, explication: "Contre-exemple : $f(x) = 2x$ vérifie $f(0) = 0$, mais toutes ses sécantes ont pour pente $2$, donc $f'(0) = 2$. Ne confonds pas l'ordonnée $f(a)$ et la pente $f'(a)$." },
    { question: "Avec $f(x) = x^2$, que renvoie environ $\\texttt{pentes(1, [1, 0.1])}$ (programme du cours) ?", choix: ["$\\texttt{[3.0, 2.1]}$", "$\\texttt{[4, 1.21]}$", "$\\texttt{[2, 2]}$", "$\\texttt{[3.0, 3.0]}$"], bonne: 0, explication: "Pour $h = 1$ : $\\dfrac{4 - 1}{1} = 3$. Pour $h = 0{,}1$ : $\\dfrac{1{,}21 - 1}{0{,}1} = 2{,}1$. Ces pentes $2 + h$ se rapprochent de $f'(1) = 2$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer un taux de variation",
      etapes: [
        "Calculer $f(a)$ et $f(b)$.",
        "Faire $\\dfrac{f(b) - f(a)}{b - a}$, en mettant les négatifs entre parenthèses.",
        "Interpréter : c'est la pente de la sécante (ou une vitesse moyenne)."
      ],
      exemple: "$f(x) = x^2 - 2x$ entre $-1$ et $2$ : $\\dfrac{0 - 3}{2 - (-1)} = -1$."
    },
    {
      titre: "Calculer un nombre dérivé avec la limite",
      etapes: [
        "Écrire $f(a + h)$ et développer.",
        "Calculer $f(a + h) - f(a)$ : tous les termes restants contiennent $h$.",
        "Diviser par $h$ (avec $h \\neq 0$) et simplifier.",
        "Faire tendre $h$ vers $0$ : la limite est $f'(a)$."
      ],
      exemple: "$f(x) = 2x^2 + x$ et $a = 1$ : $f(1 + h) - f(1) = 5h + 2h^2$, le taux vaut $5 + 2h$, donc $f'(1) = 5$."
    },
    {
      titre: "Lire un nombre dérivé sur un graphique",
      etapes: [
        "Repérer le point $A$ d'abscisse $a$ et la tangente en $A$.",
        "Avancer de $1$ (ou de $2$) unité vers la droite le long de la tangente.",
        "Compter de combien on monte (+) ou on descend (−), puis diviser par le déplacement horizontal."
      ],
      exemple: "On avance de $2$ et on descend de $1$ : $f'(a) = -\\dfrac{1}{2}$."
    },
    {
      titre: "Déterminer l'équation d'une tangente",
      etapes: [
        "Trouver $f(a)$ et $f'(a)$, par le calcul ou par lecture.",
        "Remplacer dans $y = f'(a)(x - a) + f(a)$.",
        "Développer pour obtenir $y = mx + p$, puis vérifier avec $x = a$."
      ],
      exemple: "$f(2) = 1$ et $f'(2) = -3$ : $y = -3(x - 2) + 1 = -3x + 7$."
    },
    {
      titre: "Utiliser l'approximation linéaire",
      etapes: [
        "Choisir $a$ proche de la valeur voulue, avec $f(a)$ et $f'(a)$ connus.",
        "Calculer l'écart $h$.",
        "Écrire $f(a + h) \\approx f(a) + f'(a)\\,h$."
      ],
      exemple: "$\\dfrac{1}{2{,}1}$ : $a = 2$, $h = 0{,}1$ et $f'(2) = -\\dfrac{1}{4}$, donc $\\dfrac{1}{2{,}1} \\approx 0{,}5 - 0{,}025 = 0{,}475$."
    },
    {
      titre: "Interpréter un nombre dérivé",
      etapes: [
        "Distance en fonction du temps : le nombre dérivé est la vitesse instantanée.",
        "Coût en fonction de la quantité : le nombre dérivé est le coût marginal, environ le coût d'une unité de plus.",
        "Un taux de variation entre deux valeurs est une moyenne : pente d'une sécante."
      ],
      exemple: "$d'(10) = 16$ : à $10$ s, le taxi roule à $16$ m/s, soit $57{,}6$ km/h."
    }
  ],
  erreurs: [
    "Diviser $f(b) - f(a)$ par $b$ au lieu de $b - a$.",
    "Remplacer $h$ par $0$ avant de simplifier : on obtient $\\dfrac{0}{0}$, qui n'a pas de sens.",
    "Confondre $f(a)$ (l'ordonnée du point) et $f'(a)$ (la pente de la tangente).",
    "Oublier un terme en développant $(a + h)^2 = a^2 + 2ah + h^2$.",
    "Se tromper de signe dans $x - a$ quand $a$ est négatif : $x - (-2) = x + 2$.",
    "Lire une pente en comptant les carreaux sans regarder l'échelle des axes.",
    "Confondre vitesse moyenne (pente d'une sécante) et vitesse instantanée (pente de la tangente).",
    "Prendre le coût marginal pour le coût total."
  ]
};
