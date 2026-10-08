/*
  CHAPITRE : Terminale maths complémentaires — Intégration
  --------------------------------------------------------
  Chapitre 12 de la progression spiralée 2026-2027 (programme de maths complémentaires de 2019).
  Intégrale d'une fonction positive comme aire, Chasles, valeur moyenne, méthode des rectangles,
  signe quelconque, x ↦ ∫ₐˣ f(t) dt dérivable de dérivée f, calcul par primitives, aire entre deux courbes,
  Python (rectangles, trapèzes, Monte-Carlo), parcelle au bord du lagon, quadrature de la parabole.
  Figures : "tin-aire", "tin-rectangles", "tin-moyenne", "tin-entre", "tin-signe". Générateurs : tin-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-integration"] = {
  niveau: "Terminale maths complémentaires",
  numero: 12,
  titre: "Intégration",
  accroche: "L'aire sous une courbe : intégrale, relation de Chasles, calcul avec une primitive, valeur moyenne, aire entre deux courbes, rectangles et Monte-Carlo en Python.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Intégrale d'une fonction positive",
      figure: "tin-aire",
      video: { titre: "Vidéo d'Yvan Monka : le cours sur l'intégration", youtube: "https://youtu.be/pFKzXZrMVxs" },
      texte:
        "$f$ est continue et **positive** sur $[a\\,;b]$, de courbe $\\mathcal{C}$. Le domaine situé sous $\\mathcal{C}$, au-dessus de l'axe des abscisses, entre les droites $x = a$ et $x = b$, a une aire $\\mathcal{A}$ en **unités d'aire** (u.a.).\n\n" +
        "Cette aire s'appelle l'**intégrale** de $f$ de $a$ à $b$ et se note $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$.\n\n" +
        "- $a$ et $b$ sont les **bornes** ; $x$ est une variable « muette » : $\\displaystyle\\int_a^b f(t)\\,\\mathrm{d}t$ est le même nombre.\n" +
        "- Le symbole $\\displaystyle\\int$ est un S allongé, pour « somme » (Leibniz).",
      exemple: {
        enonce: "Calcule $\\displaystyle\\int_0^3 (x + 1)\\,\\mathrm{d}x$ avec une aire.",
        solution: "Le domaine est un trapèze de bases $f(0) = 1$ et $f(3) = 4$, de hauteur $3$ : $\\dfrac{1 + 4}{2} \\times 3 = 7{,}5$ u.a."
      }
    },
    {
      titre: "Relation de Chasles et propriétés",
      video: { titre: "Vidéo d'Yvan Monka : intégrale et calculs d'aire", youtube: "https://youtu.be/jkxNKkmEXZA" },
      texte:
        "- **Chasles** : pour $a \\leqslant c \\leqslant b$, $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x = \\int_a^c f(x)\\,\\mathrm{d}x + \\int_c^b f(x)\\,\\mathrm{d}x$ (on découpe le domaine).\n" +
        "- $\\displaystyle\\int_a^a f(x)\\,\\mathrm{d}x = 0$.\n" +
        "- **Linéarité** : $\\displaystyle\\int_a^b \\big(f + g\\big) = \\int_a^b f + \\int_a^b g$ et $\\displaystyle\\int_a^b kf = k\\int_a^b f$.\n" +
        "- **Positivité et ordre** : si $f \\leqslant g$ sur $[a\\,;b]$, alors $\\displaystyle\\int_a^b f \\leqslant \\int_a^b g$. On peut ainsi **encadrer** une intégrale.",
      exemple: {
        enonce: "$f(x) = x^2 + 1$ est croissante sur $[1\\,;3]$. Encadre $I = \\displaystyle\\int_1^3 f(x)\\,\\mathrm{d}x$.",
        solution: "$f(1) = 2 \\leqslant f(x) \\leqslant f(3) = 10$, donc $2 \\times 2 \\leqslant I \\leqslant 2 \\times 10$, soit $4 \\leqslant I \\leqslant 20$."
      }
    },
    {
      titre: "La méthode des rectangles",
      figure: "tin-rectangles",
      video: { titre: "Vidéo d'Yvan Monka : encadrer une intégrale", youtube: "https://youtu.be/VK0PvzWBIso" },
      texte:
        "On découpe $[a\\,;b]$ en $n$ morceaux de largeur $h = \\dfrac{b - a}{n}$ et on additionne les aires des rectangles :\n\n" +
        "$S_n = h \\times \\big(f(x_0) + f(x_1) + \\dots + f(x_{n-1})\\big)$.\n\n" +
        "Quand $n$ augmente, $S_n$ se rapproche de l'intégrale : **la somme devient intégrale** ($\\sum$ devient $\\displaystyle\\int$, et $h$ devient $\\mathrm{d}x$). La figure montre $4$ rectangles sous $y = x^2$ : $S_4 \\approx 0{,}22$, alors que l'intégrale vaut $\\dfrac{1}{3}$.",
      exemple: {
        enonce: "Calcule $S_2$ pour $\\displaystyle\\int_0^1 x^2\\,\\mathrm{d}x$ (rectangles à gauche).",
        solution: "$h = 0{,}5$ : $S_2 = 0{,}5 \\times (0^2 + 0{,}5^2) = 0{,}125$, une valeur par défaut, encore loin de $\\dfrac{1}{3}$."
      }
    },
    {
      titre: "Fonction définie par une intégrale",
      video: { titre: "Vidéo d'Yvan Monka : étudier une fonction définie par une intégrale", youtube: "https://youtu.be/6DHXw5TRzN4" },
      texte:
        "**Théorème** : si $f$ est continue sur $[a\\,;b]$, la fonction $F(x) = \\displaystyle\\int_a^x f(t)\\,\\mathrm{d}t$ est dérivable et $F' = f$. C'est la primitive de $f$ qui s'annule en $a$.\n\n" +
        "**Idée de la démonstration** ($f$ positive et croissante) : pour $h > 0$, l'aire $F(x + h) - F(x)$ est comprise entre deux rectangles : $h f(x) \\leqslant F(x + h) - F(x) \\leqslant h f(x + h)$. On divise par $h$ et on fait tendre $h$ vers $0$ : le taux d'accroissement tend vers $f(x)$.\n\n" +
        "Conséquence : toute fonction continue sur un intervalle admet des primitives.",
      exemple: {
        enonce: "$F(x) = \\displaystyle\\int_0^x e^{-t^2}\\,\\mathrm{d}t$. Quel est le sens de variation de $F$ ?",
        solution: "$F'(x) = e^{-x^2} > 0$, donc $F$ est croissante, même si on ne sait pas calculer $F$."
      }
    },
    {
      titre: "Calculer une intégrale avec une primitive",
      video: { titre: "Vidéo d'Yvan Monka : calculer une intégrale (1)", youtube: "https://youtu.be/Z3vKJJE57Uw" },
      texte:
        "Si $F$ est **une** primitive de $f$ sur $[a\\,;b]$ :\n\n" +
        "$\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x = F(b) - F(a)$, que l'on note aussi $\\big[F(x)\\big]_a^b$.\n\n" +
        "La constante d'une primitive disparaît dans la différence : n'importe quelle primitive convient.",
      exemple: {
        enonce: "Calcule $\\displaystyle\\int_1^2 (3x^2 + 2x)\\,\\mathrm{d}x$ puis $\\displaystyle\\int_0^1 e^x\\,\\mathrm{d}x$.",
        solution: "$\\big[x^3 + x^2\\big]_1^2 = (8 + 4) - (1 + 1) = 10$ et $\\big[e^x\\big]_0^1 = e - 1 \\approx 1{,}72$."
      }
    },
    {
      titre: "Fonction de signe quelconque",
      figure: "tin-signe",
      video: { titre: "Vidéo d'Yvan Monka : calculer une intégrale (2)", youtube: "https://youtu.be/8ci1RrNH1L0" },
      texte:
        "La formule $F(b) - F(a)$ définit l'intégrale de toute fonction continue, même si elle change de signe. Pour $a < b$ :\n\n" +
        "- là où $f \\geqslant 0$, l'aire compte **positivement** ;\n" +
        "- là où $f \\leqslant 0$, l'aire compte **négativement**.\n\n" +
        "L'intégrale est donc « aire au-dessus moins aire en dessous ». Sur la figure, les deux triangles ont la même aire : $\\displaystyle\\int_{-1}^{3} (x - 1)\\,\\mathrm{d}x = 0$.",
      exemple: {
        enonce: "Calcule $\\displaystyle\\int_{0}^{3} (x - 1)\\,\\mathrm{d}x$.",
        solution: "$\\left[\\dfrac{x^2}{2} - x\\right]_0^3 = \\dfrac{9}{2} - 3 = 1{,}5$ : aire au-dessus $2$, aire en dessous $0{,}5$."
      }
    },
    {
      titre: "Aire entre deux courbes",
      figure: "tin-entre",
      video: { titre: "Vidéo d'Yvan Monka : calculer l'aire entre deux courbes", youtube: "https://youtu.be/oRSAYNwUiHQ" },
      texte:
        "Si $f \\geqslant g$ sur $[a\\,;b]$, l'aire du domaine compris entre les deux courbes est :\n\n" +
        "$\\displaystyle\\int_a^b \\big(f(x) - g(x)\\big)\\,\\mathrm{d}x$ (courbe du dessus moins courbe du dessous).\n\n" +
        "Il faut d'abord étudier la position relative des courbes (signe de $f - g$).",
      exemple: {
        enonce: "Calcule l'aire entre $y = 2x$ et $y = x^2$ sur $[0\\,;2]$ (figure).",
        solution: "$2x - x^2 = x(2 - x) \\geqslant 0$ sur $[0\\,;2]$ : aire $= \\left[x^2 - \\dfrac{x^3}{3}\\right]_0^2 = 4 - \\dfrac{8}{3} = \\dfrac{4}{3}$ u.a."
      }
    },
    {
      titre: "Valeur moyenne",
      figure: "tin-moyenne",
      video: { titre: "Vidéo d'Yvan Monka : calculer la valeur moyenne d'une fonction", youtube: "https://youtu.be/oVFHojz5y50" },
      texte:
        "La **valeur moyenne** de $f$ sur $[a\\,;b]$ ($a < b$) est :\n\n" +
        "$\\mu = \\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$.\n\n" +
        "Interprétation : le rectangle de largeur $b - a$ et de hauteur $\\mu$ a la même aire que le domaine sous la courbe (figure). C'est la version continue de la moyenne d'une liste de valeurs (température moyenne d'une journée, vitesse moyenne…).",
      exemple: {
        enonce: "Valeur moyenne de $f(x) = x(4 - x)$ sur $[0\\,;4]$.",
        solution: "$\\displaystyle\\int_0^4 (4x - x^2)\\,\\mathrm{d}x = \\left[2x^2 - \\dfrac{x^3}{3}\\right]_0^4 = 32 - \\dfrac{64}{3} = \\dfrac{32}{3}$, donc $\\mu = \\dfrac{1}{4} \\times \\dfrac{32}{3} = \\dfrac{8}{3} \\approx 2{,}67$."
      }
    },
    {
      titre: "Une parcelle au bord du lagon",
      video: { titre: "Vidéo d'Yvan Monka : calculer une intégrale (3)", youtube: "https://youtu.be/uVMRZSmYcQE" },
      texte:
        "Une parcelle est limitée par une route droite et par la plage, modélisée par $y = 0{,}1x(30 - x)$ pour $x$ entre $0$ et $30$ (en mètres). Son aire est :\n\n" +
        "$\\displaystyle\\int_0^{30} 0{,}1(30x - x^2)\\,\\mathrm{d}x = 0{,}1\\left[15x^2 - \\dfrac{x^3}{3}\\right]_0^{30} = 0{,}1 \\times 4\\,500 = 450$ m².\n\n" +
        "**Quadrature de la parabole** (Archimède, IIIe siècle av. J.-C.) : l'aire sous un arc de parabole vaut les $\\dfrac{2}{3}$ du rectangle qui l'entoure. Ici le rectangle mesure $30 \\times 22{,}5 = 675$ m², et $\\dfrac{2}{3} \\times 675 = 450$ m².",
      exemple: {
        enonce: "Même question avec $y = 0{,}1x(20 - x)$ sur $[0\\,;20]$.",
        solution: "$0{,}1 \\times \\dfrac{20^3}{6} \\approx 133$ m² (rectangle $20 \\times 10 = 200$ m², dont les $\\dfrac{2}{3}$)."
      }
    },
    {
      titre: "Python : rectangles, trapèzes, Monte-Carlo",
      texte:
        "```python\ndef rectangles(f, a, b, n):\n    h = (b - a) / n\n    s = 0\n    for k in range(n):\n        s = s + h * f(a + k * h)\n    return s\n\ndef trapezes(f, a, b, n):\n    h = (b - a) / n\n    s = 0\n    for k in range(n):\n        s = s + h * (f(a + k * h) + f(a + (k + 1) * h)) / 2\n    return s\n```\n\n" +
        "Les trapèzes donnent une bien meilleure approximation pour le même $n$.\n\n" +
        "**Monte-Carlo** : on tire $N$ points au hasard dans un rectangle d'aire $R$ qui contient le domaine. Si $k$ points tombent sous la courbe, l'intégrale vaut environ $\\dfrac{k}{N} \\times R$.\n\n" +
        "```python\nfrom random import random\n\ndef montecarlo(N):\n    k = 0\n    for i in range(N):\n        x = random()\n        y = random()\n        if y <= x ** 2:\n            k = k + 1\n    return k / N\n```",
      exemple: {
        enonce: "montecarlo(100000) renvoie $0{,}3329$. Qu'estime-t-on ?",
        solution: "$\\displaystyle\\int_0^1 x^2\\,\\mathrm{d}x = \\dfrac{1}{3}$ (le carré a une aire $1$) : l'estimation est très proche."
      }
    }
  ],

  videos: [
    { titre: "Le cours : intégration", type: "Cours", youtube: "https://youtu.be/pFKzXZrMVxs" },
    { titre: "Intégrale par calculs d'aire (1)", type: "Méthode", youtube: "https://youtu.be/jkxNKkmEXZA" },
    { titre: "Intégrale par calculs d'aire (2)", type: "Méthode", youtube: "https://youtu.be/l2zuaZukc0g" },
    { titre: "Encadrer une intégrale", type: "Méthode", youtube: "https://youtu.be/VK0PvzWBIso" },
    { titre: "Fonction définie par une intégrale", type: "Méthode", youtube: "https://youtu.be/6DHXw5TRzN4" },
    { titre: "Calculer une intégrale (1)", type: "Calcul", youtube: "https://youtu.be/Z3vKJJE57Uw" },
    { titre: "Calculer une intégrale (2)", type: "Calcul", youtube: "https://youtu.be/8ci1RrNH1L0" },
    { titre: "Calculer une intégrale (3)", type: "Calcul", youtube: "https://youtu.be/uVMRZSmYcQE" },
    { titre: "Aire entre deux courbes", type: "Méthode", youtube: "https://youtu.be/oRSAYNwUiHQ" },
    { titre: "Valeur moyenne d'une fonction", type: "Méthode", youtube: "https://youtu.be/oVFHojz5y50" }
  ],
  videosNote: "Vidéos d'Yvan Monka, en attendant les vidéos de ton prof sur ce chapitre.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "tin-aire-geo", titre: "Intégrale et aire", etape: "Aire sous une courbe", nb: 4 },
    { type: "tin-chasles", titre: "Chasles et linéarité", etape: "Aire sous une courbe", nb: 4 },
    { type: "tin-encadrer", titre: "Encadrer une intégrale", etape: "Aire sous une courbe", nb: 3 },
    { type: "tin-calcul", titre: "Calculer avec une primitive", etape: "Calculer", nb: 5 },
    { type: "tin-calcul-exp", titre: "Exponentielle et logarithme", etape: "Calculer", nb: 4 },
    { type: "tin-signe", titre: "Signe quelconque", etape: "Calculer", nb: 4 },
    { type: "tin-fonction-integrale", titre: "Fonction définie par une intégrale", etape: "Calculer", nb: 4 },
    { type: "tin-entre-courbes", titre: "Aire entre deux courbes", etape: "Aires et moyennes", nb: 3 },
    { type: "tin-moyenne", titre: "Valeur moyenne", etape: "Aires et moyennes", nb: 4 },
    { type: "tin-parcelle", titre: "Parcelle au bord du lagon", etape: "Aires et moyennes", nb: 3 },
    { type: "tin-python", titre: "Python : rectangles, trapèzes, Monte-Carlo", etape: "Raisonner", nb: 4 },
    { type: "tin-logique", titre: "Vrai ou faux", etape: "Raisonner", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Pour $f$ positive, $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$ représente :", choix: ["l'aire sous la courbe entre $a$ et $b$", "la pente de la courbe", "la valeur maximale de $f$", "la longueur de la courbe"], bonne: 0, explication: "En unités d'aire." },
    { question: "$\\displaystyle\\int_0^4 3\\,\\mathrm{d}x =$", choix: ["$12$", "$3$", "$7$", "$0$"], bonne: 0, explication: "Rectangle $4 \\times 3$." },
    { question: "$\\displaystyle\\int_0^2 x\\,\\mathrm{d}x =$", choix: ["$2$", "$4$", "$1$", "$0{,}5$"], bonne: 0, explication: "Triangle $\\dfrac{2 \\times 2}{2}$." },
    { question: "$\\displaystyle\\int_1^3 f = 5$ et $\\displaystyle\\int_3^6 f = 2$. Alors $\\displaystyle\\int_1^6 f =$", choix: ["$7$", "$3$", "$10$", "$-3$"], bonne: 0, explication: "Chasles." },
    { question: "$\\displaystyle\\int_2^2 f(x)\\,\\mathrm{d}x =$", choix: ["$0$", "$f(2)$", "$2$", "$1$"], bonne: 0, explication: "Bornes égales." },
    { question: "Si $F$ est une primitive de $f$, $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x =$", choix: ["$F(b) - F(a)$", "$F(a) - F(b)$", "$f(b) - f(a)$", "$F(b) + F(a)$"], bonne: 0, explication: "Borne du haut moins borne du bas." },
    { question: "$\\displaystyle\\int_0^1 3x^2\\,\\mathrm{d}x =$", choix: ["$1$", "$3$", "$6$", "$\\dfrac{1}{3}$"], bonne: 0, explication: "$\\big[x^3\\big]_0^1$." },
    { question: "$\\displaystyle\\int_0^1 e^x\\,\\mathrm{d}x =$", choix: ["$e - 1$", "$e$", "$1$", "$e + 1$"], bonne: 0, explication: "$\\big[e^x\\big]_0^1$." },
    { question: "$\\displaystyle\\int_1^e \\dfrac{1}{x}\\,\\mathrm{d}x =$", choix: ["$1$", "$e$", "$0$", "$e - 1$"], bonne: 0, explication: "$\\ln e - \\ln 1$." },
    { question: "$\\displaystyle\\int_{-1}^1 x\\,\\mathrm{d}x =$", choix: ["$0$", "$1$", "$2$", "$-1$"], bonne: 0, explication: "Deux triangles de même aire, de signes opposés." },
    { question: "Si $f \\leqslant 0$ sur $[a\\,;b]$ ($a < b$), alors $\\displaystyle\\int_a^b f$ est :", choix: ["négative ou nulle", "positive", "nulle", "impossible à calculer"], bonne: 0, explication: "L'aire compte négativement." },
    { question: "$F(x) = \\displaystyle\\int_2^x f(t)\\,\\mathrm{d}t$. Alors $F'(x) =$", choix: ["$f(x)$", "$f'(x)$", "$f(x) - f(2)$", "$F(x)$"], bonne: 0, explication: "Théorème fondamental." },
    { question: "$F(x) = \\displaystyle\\int_2^x f(t)\\,\\mathrm{d}t$. Alors $F(2) =$", choix: ["$0$", "$f(2)$", "$2$", "on ne peut pas savoir"], bonne: 0, explication: "Bornes égales." },
    { question: "La valeur moyenne de $f$ sur $[a\\,;b]$ est :", choix: ["$\\dfrac{1}{b - a}\\displaystyle\\int_a^b f$", "$\\dfrac{f(a) + f(b)}{2}$", "$\\displaystyle\\int_a^b f$", "$f\\left(\\dfrac{a + b}{2}\\right)$"], bonne: 0, explication: "Intégrale divisée par la longueur." },
    { question: "La valeur moyenne de $f(x) = 2x$ sur $[0\\,;3]$ est :", choix: ["$3$", "$9$", "$6$", "$1{,}5$"], bonne: 0, explication: "$\\dfrac{1}{3} \\times 9$." },
    { question: "Si $f \\geqslant g$ sur $[a\\,;b]$, l'aire entre les courbes est :", choix: ["$\\displaystyle\\int_a^b (f - g)$", "$\\displaystyle\\int_a^b (g - f)$", "$\\displaystyle\\int_a^b f \\times g$", "$\\displaystyle\\int_a^b (f + g)$"], bonne: 0, explication: "Dessus moins dessous." },
    { question: "Aire entre $y = x$ et $y = x^2$ sur $[0\\,;1]$ :", choix: ["$\\dfrac{1}{6}$", "$\\dfrac{1}{2}$", "$\\dfrac{1}{3}$", "$1$"], bonne: 0, explication: "$\\dfrac{1}{2} - \\dfrac{1}{3}$." },
    { question: "Pour améliorer la méthode des rectangles, on :", choix: ["augmente le nombre de rectangles", "diminue le nombre de rectangles", "change les bornes", "arrondit"], bonne: 0, explication: "Les sommes tendent vers l'intégrale." },
    { question: "Pour $f$ croissante, les rectangles « à gauche » donnent une valeur :", choix: ["par défaut", "par excès", "exacte", "négative"], bonne: 0, explication: "Les rectangles restent sous la courbe." },
    { question: "Monte-Carlo : $7\\,000$ points sur $10\\,000$ sous la courbe, rectangle d'aire $2$. Estimation :", choix: ["$1{,}4$", "$0{,}7$", "$7$", "$2$"], bonne: 0, explication: "$0{,}7 \\times 2$." },
    { question: "L'aire sous un arc de parabole vaut, du rectangle qui l'entoure :", choix: ["les $\\dfrac{2}{3}$", "la moitié", "le tiers", "les $\\dfrac{3}{4}$"], bonne: 0, explication: "Quadrature de la parabole d'Archimède." },
    { question: "Le symbole $\\displaystyle\\int$ vient de la lettre :", choix: ["S, pour somme", "I, pour intégrale", "F, pour fonction", "A, pour aire"], bonne: 0, explication: "Notation de Leibniz." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer une intégrale",
      etapes: ["Si la fonction est simple (constante, affine positive), une aire de rectangle, triangle ou trapèze suffit.", "Sinon, chercher une primitive $F$.", "Calculer $F(b) - F(a)$, la borne du haut d'abord."],
      exemple: "$\\displaystyle\\int_0^2 (3x^2 + 1)\\,\\mathrm{d}x = \\big[x^3 + x\\big]_0^2 = 10$."
    },
    {
      titre: "Calculer une aire entre deux courbes",
      etapes: ["Étudier le signe de $f - g$ pour savoir quelle courbe est au-dessus.", "Écrire l'aire $\\displaystyle\\int_a^b (\\text{dessus} - \\text{dessous})$.", "Calculer avec une primitive ; l'aire est positive, en u.a."],
      exemple: "Entre $y = 2x$ et $y = x^2$ sur $[0\\,;2]$ : $\\dfrac{4}{3}$ u.a."
    },
    {
      titre: "Valeur moyenne",
      etapes: ["Calculer $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$.", "Diviser par $b - a$.", "Interpréter dans le contexte (température moyenne, vitesse moyenne…)."],
      exemple: "$x(4 - x)$ sur $[0\\,;4]$ : $\\mu = \\dfrac{8}{3}$."
    }
  ],
  erreurs: [
    "Calculer $F(a) - F(b)$ au lieu de $F(b) - F(a)$.",
    "Oublier de diviser par $b - a$ pour une valeur moyenne.",
    "Confondre intégrale et aire quand la fonction est négative.",
    "Faire « dessous moins dessus » pour une aire entre deux courbes.",
    "Dériver au lieu de chercher une primitive.",
    "Oublier l'unité d'aire (ou les m² en contexte)."
  ]
};
