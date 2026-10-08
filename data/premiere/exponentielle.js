/*
  CHAPITRE : Première spécialité — Fonction exponentielle
  --------------------------------------------------------
  Chapitre 12 de la progression spiralée 2026-2027 (programme de Première 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas encore de vidéo de la chaîne ni de PDF pour ce chapitre : les vidéos sont celles d'Yvan Monka.
  Figures : "exp-courbe", "exp-kt", "refroidissement". Générateurs : ex-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-exponentielle"] = {
  niveau: "Première spécialité",
  numero: 12,
  titre: "Fonction exponentielle",
  accroche: "La fonction égale à sa propre dérivée : règles de calcul, nombre e, courbes de croissance et de décroissance, médicament qui s'élimine, café qui refroidit et méthode d'Euler.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur la fonction exponentielle en vidéo (Yvan Monka)", url: "https://youtu.be/aD03wqgxexk", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Définition : $f' = f$ et $f(0) = 1$",
      figure: "exp-courbe",
      texte:
        "**Théorème** (admis) : il existe une **unique** fonction $f$ dérivable sur $\\mathbb{R}$ telle que $f' = f$ et $f(0) = 1$.\n\n" +
        "On l'appelle la **fonction exponentielle** et on la note $\\exp$. Ainsi :\n\n" +
        "- $\\exp(0) = 1$ ;\n" +
        "- pour tout réel $x$, $\\exp'(x) = \\exp(x)$.\n\n" +
        "La tangente à la courbe au point $(0\\,;1)$ a pour pente $\\exp'(0) = 1$ : c'est la droite $y = x + 1$ (schéma). Pour $h$ proche de $0$, $\\exp(h) \\approx 1 + h$ (approximation linéaire du chapitre 7).",
      exemple: {
        enonce: "Donne une valeur approchée de $\\exp(0{,}02)$.",
        solution: "$\\exp(0{,}02) \\approx 1 + 0{,}02 = 1{,}02$. La calculatrice donne $1{,}0202$."
      }
    },
    {
      titre: "Logique : $\\exp$ ne s'annule jamais (par l'absurde)",
      texte:
        "**Propriété** : pour tout réel $x$, $\\exp(x) \\times \\exp(-x) = 1$.\n\n" +
        "**Démonstration**. Soit $\\varphi(x) = \\exp(x)\\exp(-x)$. Par la formule du produit et la dérivée de $g(ax + b)$ : $\\varphi'(x) = \\exp(x)\\exp(-x) - \\exp(x)\\exp(-x) = 0$. Donc $\\varphi$ est constante, égale à $\\varphi(0) = 1$.\n\n" +
        "**Conséquence, par l'absurde** : supposons qu'il existe un réel $a$ tel que $\\exp(a) = 0$. Alors $\\exp(a)\\exp(-a) = 0$, alors que ce produit vaut $1$ : c'est **absurde**. Donc l'exponentielle ne s'annule jamais.\n\n" +
        "Le **raisonnement par l'absurde** consiste à supposer le contraire de ce qu'on veut démontrer, puis à aboutir à une contradiction.",
      exemple: {
        enonce: "Déduis-en que $\\exp(x) > 0$ pour tout réel $x$.",
        solution: "$\\exp(x) = \\exp\\left(\\dfrac{x}{2} + \\dfrac{x}{2}\\right) = \\left(\\exp\\dfrac{x}{2}\\right)^2 \\geqslant 0$ (relation fonctionnelle, partie suivante). Comme $\\exp(x) \\neq 0$, on a $\\exp(x) > 0$."
      }
    },
    {
      titre: "Relation fonctionnelle",
      video: { titre: "Vidéo d'Yvan Monka : appliquer les formules sur l'exponentielle", youtube: "https://youtu.be/qDFjeFyA_OY" },
      texte:
        "**Propriété** (admise) : pour tous réels $a$ et $b$, $\\exp(a + b) = \\exp(a) \\times \\exp(b)$.\n\n" +
        "Elle transforme une **somme** en **produit**. Conséquences, pour tous réels $a$, $b$ et tout entier $n$ :\n\n" +
        "- $\\exp(-a) = \\dfrac{1}{\\exp(a)}$ ;\n" +
        "- $\\exp(a - b) = \\dfrac{\\exp(a)}{\\exp(b)}$ ;\n" +
        "- $\\exp(na) = \\left(\\exp(a)\\right)^n$.\n\n" +
        "Attention : $\\exp(a + b) \\neq \\exp(a) + \\exp(b)$. Contre-exemple : $a = b = 0$ donne $1$ et $2$.",
      exemple: {
        enonce: "Écris $\\dfrac{\\exp(5) \\times \\exp(-2)}{\\exp(1)}$ sous la forme $\\exp(c)$.",
        solution: "$\\exp(5 - 2 - 1) = \\exp(2)$."
      }
    },
    {
      titre: "Le nombre $e$ et la notation $e^x$",
      texte:
        "On note $e = \\exp(1) \\approx 2{,}718$. Avec la relation fonctionnelle, $\\exp(n) = e^n$ pour tout entier $n$ : on écrit donc $\\exp(x) = e^x$ pour tout réel $x$.\n\n" +
        "Les règles sont celles des puissances :\n\n" +
        "- $e^0 = 1$ et $e^1 = e$ ;\n" +
        "- $e^{a} \\times e^{b} = e^{a + b}$ et $\\dfrac{e^{a}}{e^{b}} = e^{a - b}$ ;\n" +
        "- $e^{-a} = \\dfrac{1}{e^{a}}$ et $\\left(e^{a}\\right)^n = e^{na}$.\n\n" +
        "Le nombre $e$ est irrationnel. On l'approche par exemple avec $\\left(1 + \\dfrac{1}{n}\\right)^n$ pour $n$ grand (voir la partie Python).",
      exemple: {
        enonce: "Simplifie $A = e^{3x} \\times e^{-x}$ et $B = \\dfrac{\\left(e^{x}\\right)^4}{e^{2x + 1}}$.",
        solution: "$A = e^{3x - x} = e^{2x}$.\n\n$B = \\dfrac{e^{4x}}{e^{2x + 1}} = e^{4x - 2x - 1} = e^{2x - 1}$."
      }
    },
    {
      titre: "Signe, variations, équations",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation contenant des exponentielles", youtube: "https://youtu.be/dA73-HT-I_Y" },
      texte:
        "- Pour tout réel $x$, $e^x > 0$ : la courbe est au-dessus de l'axe des abscisses.\n" +
        "- $(e^x)' = e^x > 0$ : la fonction exponentielle est **strictement croissante** sur $\\mathbb{R}$.\n\n" +
        "Conséquences, pour tous réels $a$ et $b$ :\n\n" +
        "- $e^{a} = e^{b} \\iff a = b$ ;\n" +
        "- $e^{a} < e^{b} \\iff a < b$ (le sens de l'inégalité est conservé).\n\n" +
        "On résout ainsi des équations et des inéquations en comparant les exposants.",
      exemple: {
        enonce: "Résous $e^{2x - 1} = e^{x + 3}$, puis $e^{3x} < e^{x + 4}$.",
        solution: "$2x - 1 = x + 3 \\iff x = 4$.\n\n$3x < x + 4 \\iff 2x < 4 \\iff x < 2$ : $S = ]-\\infty\\,;2[$."
      }
    },
    {
      titre: "Dériver $t \\mapsto e^{at}$",
      video: { titre: "Vidéo d'Yvan Monka : dériver une fonction de la forme exponentielle de kt", youtube: "https://youtu.be/RlyFEcx5Y3E" },
      texte:
        "Avec la règle de $g(ax + b)$ du chapitre 9 : pour tout réel $a$,\n\n" +
        "$\\left(e^{at}\\right)' = a\\,e^{at}$, et plus généralement $\\left(e^{at + b}\\right)' = a\\,e^{at + b}$.\n\n" +
        "Avec la formule du produit : $\\left(t\\,e^{t}\\right)' = e^{t} + t\\,e^{t} = (1 + t)e^{t}$.\n\n" +
        "Comme $e^{at} > 0$, le signe de la dérivée se lit souvent sur un seul facteur.",
      exemple: {
        enonce: "Dérive $f(t) = 5e^{-2t}$ et $g(x) = (x - 3)e^{x}$, puis donne le signe de $g'(x)$.",
        solution: "$f'(t) = 5 \\times (-2)e^{-2t} = -10e^{-2t}$.\n\n$g'(x) = e^{x} + (x - 3)e^{x} = (x - 2)e^{x}$, du signe de $x - 2$ : négatif avant $2$, positif après."
      }
    },
    {
      titre: "Croissance et décroissance exponentielles",
      figure: "exp-kt",
      video: { titre: "Vidéo d'Yvan Monka : étudier une fonction avec exponentielle", youtube: "https://youtu.be/_MA1aW8ldjo" },
      texte:
        "Pour $k > 0$ (schéma) :\n\n" +
        "- $t \\mapsto e^{kt}$ a pour dérivée $k\\,e^{kt} > 0$ : elle est strictement croissante, d'autant plus vite que $k$ est grand. C'est une **croissance exponentielle** ;\n" +
        "- $t \\mapsto e^{-kt}$ a pour dérivée $-k\\,e^{-kt} < 0$ : elle est strictement décroissante et se rapproche de $0$ sans l'atteindre. C'est une **décroissance exponentielle**.\n\n" +
        "Toutes ces courbes passent par le point $(0\\,;1)$.",
      exemple: {
        enonce: "Compare $e^{0{,}4 \\times 5}$ et $e^{5}$, puis $e^{-0{,}4 \\times 5}$ et $e^{-5}$.",
        solution: "$e^{2} \\approx 7{,}4 < e^{5} \\approx 148$ : $e^{t}$ croît plus vite.\n\n$e^{-2} \\approx 0{,}135 > e^{-5} \\approx 0{,}007$ : $e^{-t}$ décroît plus vite vers $0$."
      }
    },
    {
      titre: "Lien avec les suites géométriques",
      video: { titre: "Vidéo d'Yvan Monka : déterminer une suite géométrique comprenant une exponentielle", youtube: "https://youtu.be/hKh-ry9AAO0" },
      texte:
        "Pour un réel $a$, posons $u_n = e^{an}$. Alors $u_{n+1} = e^{an + a} = e^{an} \\times e^{a} = u_n \\times e^{a}$.\n\n" +
        "La suite $(u_n)$ est donc **géométrique** de raison $q = e^{a}$ (chapitre 6) :\n\n" +
        "- si $a > 0$, $q > 1$ : la suite est croissante ;\n" +
        "- si $a < 0$, $0 < q < 1$ : la suite décroît vers $0$.\n\n" +
        "Les valeurs de $t \\mapsto e^{at}$ aux instants $0, 1, 2…$ forment une suite géométrique : la fonction exponentielle prolonge les suites géométriques entre les entiers.",
      exemple: {
        enonce: "Quelle est la raison de la suite $u_n = 3e^{-0{,}2n}$ ?",
        solution: "$u_{n+1} = u_n \\times e^{-0{,}2}$ : raison $q = e^{-0{,}2} \\approx 0{,}819$, comprise entre $0$ et $1$."
      }
    },
    {
      titre: "Modéliser : l'élimination d'un médicament",
      video: { titre: "Vidéo d'Yvan Monka : étudier une fonction exponentielle dans une situation concrète", youtube: "https://youtu.be/lsLQwiB9Nrg" },
      texte:
        "Au dispensaire, après une injection, la concentration d'un médicament dans le sang (en mg/L) est modélisée par $C(t) = 20e^{-0{,}3t}$, avec $t$ en heures.\n\n" +
        "- $C(0) = 20$ mg/L au moment de l'injection.\n" +
        "- $C'(t) = -6e^{-0{,}3t} = -0{,}3\\,C(t)$ : la concentration diminue, et la vitesse d'élimination est **proportionnelle** à la quantité présente.\n" +
        "- Au bout de $5$ heures : $C(5) = 20e^{-1{,}5} \\approx 4{,}46$ mg/L.\n\n" +
        "C'est le modèle continu de la dose de médicament du chapitre 6, qui baissait d'un même pourcentage chaque heure.",
      exemple: {
        enonce: "De quel pourcentage la concentration baisse-t-elle chaque heure ?",
        solution: "$C(t + 1) = C(t) \\times e^{-0{,}3}$ et $e^{-0{,}3} \\approx 0{,}741$ : la concentration est multipliée par $0{,}741$ chaque heure, soit une baisse d'environ $25{,}9\\,\\%$."
      }
    },
    {
      titre: "Modéliser : le café qui refroidit",
      figure: "refroidissement",
      texte:
        "Un café à $90$ °C refroidit dans une pièce à $28$ °C. Sa température après $t$ minutes est $T(t) = 28 + 62e^{-0{,}08t}$ (schéma).\n\n" +
        "- $T(0) = 28 + 62 = 90$ °C.\n" +
        "- $T'(t) = 62 \\times (-0{,}08)e^{-0{,}08t} < 0$ : le café refroidit sans cesse.\n" +
        "- Quand $t$ devient grand, $e^{-0{,}08t}$ se rapproche de $0$ : la température se rapproche de $28$ °C, celle de la pièce, sans jamais l'atteindre.",
      exemple: {
        enonce: "Quelle est la température du café après $10$ minutes ? Après $30$ minutes ?",
        solution: "$T(10) = 28 + 62e^{-0{,}8} \\approx 55{,}9$ °C et $T(30) = 28 + 62e^{-2{,}4} \\approx 33{,}6$ °C."
      }
    },
    {
      titre: "Python : méthode d'Euler et valeur approchée de $e$",
      texte:
        "La **méthode d'Euler** construit pas à pas une valeur approchée de la fonction $f$ telle que $f' = f$ et $f(0) = 1$. Sur un petit pas $h$, on suit la tangente : $f(x + h) \\approx f(x) + h f'(x) = f(x) + h f(x)$.\n\n" +
        "```python\ndef euler(h):\n    x, y = 0, 1\n    while x < 1 - h / 2:\n        y = y + h * y\n        x = x + h\n    return y\n\nprint(euler(0.1), euler(0.01), euler(0.001))\n```\n\n" +
        "Le programme affiche environ $2{,}594$ ; $2{,}705$ ; $2{,}717$ : des valeurs approchées de $f(1) = e \\approx 2{,}71828$, de plus en plus précises quand $h$ diminue.\n\n" +
        "Chaque pas multiplie $y$ par $1 + h$ : avec $h = \\dfrac{1}{n}$, on obtient $\\left(1 + \\dfrac{1}{n}\\right)^n$, qui se rapproche de $e$.",
      exemple: {
        enonce: "Que renvoie euler(0.5) ?",
        solution: "Deux pas : $y = 1 \\times 1{,}5 = 1{,}5$, puis $1{,}5 \\times 1{,}5 = 2{,}25$. La fonction renvoie $2{,}25$, une valeur approchée grossière de $e$."
      }
    }
  ],

  videos: [
    { titre: "Résoudre une inéquation contenant des exponentielles", type: "Inéquation", youtube: "https://youtu.be/d28Fb-zBe4Y" },
    { titre: "Dériver une fonction exponentielle", type: "Dérivée", youtube: "https://youtu.be/XcMePHk6Ilk" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "ex-simplifier", titre: "Simplifier avec les règles", etape: "Propriétés", nb: 6 },
    { type: "ex-logique", titre: "Par l'absurde, contre-exemples", etape: "Propriétés", nb: 4 },
    { type: "ex-equation", titre: "Équations et inéquations", etape: "Propriétés", nb: 5 },
    { type: "ex-derivee", titre: "Dériver avec l'exponentielle", etape: "Étude", nb: 5 },
    { type: "ex-variations", titre: "Variations", etape: "Étude", nb: 4 },
    { type: "ex-suite", titre: "Suites géométriques et exponentielle", etape: "Modéliser", nb: 4 },
    { type: "ex-modele", titre: "Médicament et café", etape: "Modéliser", nb: 4 },
    { type: "ex-python", titre: "Python : Euler et le nombre e", etape: "Modéliser", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "La fonction exponentielle est l'unique fonction dérivable sur $\\mathbb{R}$ telle que :", choix: ["$f' = f$ et $f(0) = 1$", "$f' = f$ et $f(0) = 0$", "$f' = 1$ et $f(0) = 1$", "$f(x + y) = f(x) + f(y)$"], bonne: 0, explication: "C'est sa définition." },
    { question: "$e^{3} \\times e^{-5} =$", choix: ["$e^{-2}$", "$e^{-15}$", "$e^{8}$", "$-e^{2}$"], bonne: 0, explication: "$e^{a} \\times e^{b} = e^{a + b}$." },
    { question: "$\\dfrac{e^{2x}}{e^{x - 1}} =$", choix: ["$e^{x + 1}$", "$e^{x - 1}$", "$e^{3x - 1}$", "$e^{2}$"], bonne: 0, explication: "$2x - (x - 1) = x + 1$." },
    { question: "$\\left(e^{x}\\right)^3 =$", choix: ["$e^{3x}$", "$e^{x^3}$", "$3e^{x}$", "$e^{x + 3}$"], bonne: 0, explication: "$\\left(e^{a}\\right)^n = e^{na}$." },
    { question: "Pour tout réel $x$, $e^{-x}$ est égal à :", choix: ["$\\dfrac{1}{e^{x}}$", "$-e^{x}$", "$e^{x} - 1$", "$\\dfrac{-1}{e^{x}}$"], bonne: 0, explication: "$e^{x} \\times e^{-x} = 1$." },
    { question: "« Il existe un réel $x$ tel que $e^{x} = 0$ » est :", choix: ["faux : l'exponentielle ne s'annule jamais", "vrai pour $x = 0$", "vrai pour $x$ très négatif", "vrai pour $x = -1$"], bonne: 0, explication: "Par l'absurde : $e^{a} = 0$ donnerait $e^{a}e^{-a} = 0 \\neq 1$." },
    { question: "La solution de $e^{2x + 1} = e^{x - 3}$ est :", choix: ["$x = -4$", "$x = 4$", "$x = -2$", "aucune"], bonne: 0, explication: "$2x + 1 = x - 3 \\iff x = -4$." },
    { question: "L'ensemble des solutions de $e^{x} > e^{3}$ est :", choix: ["$]3\\,;+\\infty[$", "$]-\\infty\\,;3[$", "$\\{3\\}$", "$\\mathbb{R}$"], bonne: 0, explication: "L'exponentielle est strictement croissante : $x > 3$." },
    { question: "La dérivée de $e^{-4t}$ est :", choix: ["$-4e^{-4t}$", "$e^{-4t}$", "$-4te^{-4t}$", "$e^{-4}$"], bonne: 0, explication: "$\\left(e^{at}\\right)' = ae^{at}$ avec $a = -4$." },
    { question: "La dérivée de $xe^{x}$ est :", choix: ["$(x + 1)e^{x}$", "$e^{x}$", "$xe^{x}$", "$xe^{x - 1}$"], bonne: 0, explication: "Produit : $1 \\times e^{x} + x \\times e^{x}$." },
    { question: "La fonction $t \\mapsto 50e^{-0{,}2t}$ est :", choix: ["strictement décroissante", "strictement croissante", "constante", "négative"], bonne: 0, explication: "Sa dérivée $-10e^{-0{,}2t}$ est strictement négative." },
    { question: "$e \\approx$", choix: ["$2{,}718$", "$3{,}142$", "$1{,}414$", "$2{,}5$"], bonne: 0, explication: "$e = \\exp(1) \\approx 2{,}71828$." },
    { question: "La suite $u_n = e^{0{,}1n}$ est :", choix: ["géométrique de raison $e^{0{,}1}$", "arithmétique de raison $0{,}1$", "géométrique de raison $0{,}1$", "ni arithmétique ni géométrique"], bonne: 0, explication: "$u_{n+1} = u_n \\times e^{0{,}1}$." },
    { question: "$T(t) = 28 + 62e^{-0{,}08t}$ : quand $t$ devient très grand, $T(t)$ se rapproche de :", choix: ["$28$", "$90$", "$0$", "$62$"], bonne: 0, explication: "$e^{-0{,}08t}$ se rapproche de $0$." },
    { question: "Dans la méthode d'Euler pour $f' = f$, chaque pas de longueur $h$ :", choix: ["multiplie $y$ par $1 + h$", "ajoute $h$ à $y$", "multiplie $y$ par $h$", "remplace $y$ par $e^{h}$"], bonne: 0, explication: "$y + hy = (1 + h)y$." },
    { question: "Vrai ou faux : « pour tous réels $a$ et $b$, $e^{a + b} = e^{a} + e^{b}$ ».", choix: ["Vrai", "Faux"], bonne: 1, explication: "Faux : avec $a = b = 0$, on trouve $1$ d'un côté et $2$ de l'autre." },
    { question: "$e^{2} \\times e^{3} \\times e^{-5} =$", choix: ["$1$", "$0$", "$e^{-30}$", "$e$"], bonne: 0, explication: "On ajoute les exposants : $2 + 3 - 5 = 0$, et $e^{0} = 1$. Une exponentielle n'est jamais nulle." },
    { question: "Pour tout réel $x$, $\\dfrac{\\left(e^{x}\\right)^2}{e^{2x - 3}} =$", choix: ["$e^{3}$", "$e^{-3}$", "$e^{x^2 - 2x + 3}$", "$e^{4x - 3}$"], bonne: 0, explication: "$\\left(e^{x}\\right)^2 = e^{2x}$, puis $\\dfrac{e^{2x}}{e^{2x - 3}} = e^{2x - (2x - 3)} = e^{3}$ : le résultat ne dépend pas de $x$." },
    { question: "Le signe de $(x - 2)e^{x}$ est :", choix: ["négatif pour $x < 2$ et positif pour $x > 2$", "toujours positif, car $e^{x} > 0$", "positif pour $x < 2$ et négatif pour $x > 2$", "toujours négatif"], bonne: 0, explication: "$e^{x} > 0$ pour tout $x$ : le produit a le signe de l'autre facteur, $x - 2$, qui est négatif avant $2$ et positif après." },
    { question: "L'équation $e^{x^2} = e^{4}$ a pour solutions :", choix: ["$x = -2$ ou $x = 2$", "$x = 2$ seulement", "$x = 4$", "$x = 16$"], bonne: 0, explication: "$e^{a} = e^{b} \\iff a = b$, donc $x^2 = 4 \\iff x = -2$ ou $x = 2$. Il ne faut pas oublier la solution négative." },
    { question: "L'ensemble des solutions de $e^{-2x} \\leqslant e^{6}$ est :", choix: ["$[-3\\,;+\\infty[$", "$]-\\infty\\,;-3]$", "$]-\\infty\\,;3]$", "$[3\\,;+\\infty[$"], bonne: 0, explication: "L'exponentielle est croissante : $-2x \\leqslant 6$. Puis on divise par $-2$, négatif, et le sens change : $x \\geqslant -3$." },
    { question: "La solution de l'équation $e^{2x} - 1 = 0$ est :", choix: ["$x = 0$", "$x = \\dfrac{1}{2}$", "$x = 1$", "il n'y a pas de solution"], bonne: 0, explication: "$e^{2x} = 1 = e^{0} \\iff 2x = 0 \\iff x = 0$." },
    { question: "La dérivée de $f(x) = 3e^{2x + 1}$ est :", choix: ["$6e^{2x + 1}$", "$3e^{2x + 1}$", "$3(2x + 1)e^{2x}$", "$6xe^{2x + 1}$"], bonne: 0, explication: "$\\left(e^{ax + b}\\right)' = ae^{ax + b}$ avec $a = 2$ : $f'(x) = 3 \\times 2e^{2x + 1} = 6e^{2x + 1}$." },
    { question: "Soit $g(x) = e^{x} - x$, de dérivée $g'(x) = e^{x} - 1$. La fonction $g$ admet un minimum :", choix: ["en $x = 0$, égal à $1$", "en $x = 1$, égal à $e - 1$", "en $x = 0$, égal à $0$", "nulle part : $g$ n'a pas de minimum"], bonne: 0, explication: "$e^{x} - 1 < 0 \\iff e^{x} < e^{0} \\iff x < 0$ : $g$ décroît puis croît, avec un minimum $g(0) = e^{0} - 0 = 1$." },
    { question: "La tangente à la courbe de la fonction exponentielle au point d'abscisse $0$ a pour équation :", choix: ["$y = x + 1$", "$y = x$", "$y = ex$", "$y = 1$"], bonne: 0, explication: "$y = \\exp'(0)(x - 0) + \\exp(0)$, avec $\\exp'(0) = \\exp(0) = 1$ : $y = x + 1$." },
    { question: "Une valeur approchée de $e^{0{,}02}$ est :", choix: ["$1{,}02$", "$0{,}02$", "$1{,}2$", "$2{,}02$"], bonne: 0, explication: "Pour $h$ proche de $0$, $e^{h} \\approx 1 + h$ (approximation par la tangente en $0$) : $e^{0{,}02} \\approx 1{,}02$." },
    { question: "La suite définie par $u_n = 5e^{-0{,}5n}$ est géométrique de raison :", choix: ["$e^{-0{,}5}$", "$-0{,}5$", "$5$", "$5e^{-0{,}5}$"], bonne: 0, explication: "$u_{n+1} = 5e^{-0{,}5n - 0{,}5} = 5e^{-0{,}5n} \\times e^{-0{,}5} = u_n \\times e^{-0{,}5}$. Le premier terme est $u_0 = 5$." },
    { question: "La concentration d'un médicament vaut $C(t) = 20e^{-0{,}3t}$. Vrai ou faux : elle finit par devenir nulle.", choix: ["Faux", "Vrai"], bonne: 0, explication: "Pour tout $t$, $e^{-0{,}3t} > 0$, donc $C(t) > 0$ : la concentration se rapproche de $0$ sans jamais l'atteindre." },
    { question: "Laquelle de ces fonctions est strictement décroissante sur $\\mathbb{R}$ ?", choix: ["$t \\mapsto e^{-2t}$", "$t \\mapsto e^{2t}$", "$t \\mapsto e^{0{,}5t}$", "$t \\mapsto -e^{-t}$"], bonne: 0, explication: "La dérivée de $e^{-2t}$ est $-2e^{-2t} < 0$. Attention : la dérivée de $-e^{-t}$ est $e^{-t} > 0$, elle est donc croissante." },
    { question: "Dans la fonction $\\texttt{euler(h)}$ du cours, quelle valeur est renvoyée avec $h = 0{,}5$ ?", choix: ["$2{,}25$", "$2$", "$1{,}5$", "$2{,}718$"], bonne: 0, explication: "Chaque pas multiplie $y$ par $1 + h = 1{,}5$. Il faut deux pas pour aller de $0$ à $1$ : $y = 1{,}5^2 = 2{,}25$, une valeur approchée grossière de $e$." },
    { question: "Pour démontrer par l'absurde que l'exponentielle ne s'annule jamais, on commence par :", choix: ["supposer qu'il existe un réel $a$ tel que $e^{a} = 0$", "supposer que $e^{x} > 0$ pour tout réel $x$", "calculer $e^{0} = 1$", "tracer la courbe à la calculatrice"], bonne: 0, explication: "On suppose le contraire de ce qu'on veut démontrer, puis on aboutit à une contradiction : ici $e^{a} \\times e^{-a} = 0$, alors que ce produit vaut $1$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Simplifier une expression",
      etapes: ["Écrire chaque facteur sous la forme $e^{\\dots}$.", "Produits : ajouter les exposants ; quotients : les soustraire ; puissances : les multiplier.", "Vérifier avec $e^{0} = 1$ et $e^{-a} = \\dfrac{1}{e^{a}}$."],
      exemple: "$\\dfrac{e^{x + 2} \\times e^{x}}{e^{3}} = e^{2x + 2 - 3} = e^{2x - 1}$."
    },
    {
      titre: "Résoudre une équation ou une inéquation",
      etapes: ["Se ramener à $e^{A} = e^{B}$ ou $e^{A} < e^{B}$.", "Comparer les exposants : $A = B$ ou $A < B$ (même sens).", "Résoudre l'équation ou l'inéquation obtenue."],
      exemple: "$e^{3x} \\geqslant e^{x + 4} \\iff 3x \\geqslant x + 4 \\iff x \\geqslant 2$."
    },
    {
      titre: "Étudier une fonction avec une exponentielle",
      etapes: ["Dériver : $\\left(e^{at}\\right)' = ae^{at}$, formule du produit si besoin.", "Factoriser par l'exponentielle, qui est strictement positive.", "Le signe de $f'$ est celui de l'autre facteur : dresser le tableau de variations."],
      exemple: "$g(x) = (x - 3)e^{x}$ : $g'(x) = (x - 2)e^{x}$, minimum en $2$."
    },
    {
      titre: "Modéliser une évolution exponentielle",
      etapes: ["Repérer la valeur de départ et le signe de l'exposant : croissance ou décroissance.", "Calculer des valeurs à la calculatrice.", "Interpréter : valeur limite, baisse en pourcentage par unité de temps."],
      exemple: "$C(t) = 20e^{-0{,}3t}$ : la concentration est multipliée par $e^{-0{,}3} \\approx 0{,}741$ chaque heure."
    }
  ],
  erreurs: [
    "Écrire $e^{a + b} = e^{a} + e^{b}$ : la somme des exposants donne un **produit**.",
    "Écrire $\\left(e^{x}\\right)^2 = e^{x^2}$ au lieu de $e^{2x}$.",
    "Croire que $e^{-x}$ est négatif : une exponentielle est toujours strictement positive.",
    "Oublier le facteur $a$ en dérivant $e^{at}$.",
    "Changer le sens d'une inéquation en comparant les exposants : l'exponentielle est croissante, le sens est conservé.",
    "Confondre la raison $e^{a}$ d'une suite géométrique avec l'exposant $a$."
  ]
};
