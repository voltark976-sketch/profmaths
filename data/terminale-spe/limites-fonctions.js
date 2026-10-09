/*
  CHAPITRE : Terminale spécialité — Limites de fonctions
  -------------------------------------------------------
  Chapitre 6 de la progression de Terminale spécialité (V26, période 2, 2 semaines) :
  limites en +∞ et en −∞, limite en un réel a, limites et opérations, limites et comparaison
  (avec la fonction exponentielle et les croissances comparées ; le logarithme vient au chapitre 9).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas de vidéo de la chaîne sur ce thème : vidéos d'Yvan Monka (cours 20LimitesFct1 et 20LimitesFct2).
  Figures : "lfo-asymptotes", "lfo-croissance". Générateurs : lfo- dans assets/exercices.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-spe-limites-fonctions"] = {
  niveau: "Terminale spécialité",
  numero: 6,
  titre: "Limites de fonctions",
  accroche: "Que fait $f(x)$ quand $x$ devient très grand, ou s'approche d'une valeur interdite ? Asymptotes, formes indéterminées, fonctions composées et croissances comparées avec l'exponentielle.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur la notion de limite d'une fonction (Yvan Monka)", url: "https://youtu.be/YPwJyYDsmxM", type: "video" },
    { titre: "Démonstration : croissance comparée de xⁿ et de l'exponentielle (Yvan Monka)", url: "https://youtu.be/_re6fVWD4b0", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Limite en $+\\infty$ ou en $-\\infty$",
      figure: "lfo-asymptotes",
      video: { titre: "Vidéo d'Yvan Monka : déterminer graphiquement des limites d'une fonction", youtube: "https://youtu.be/9nEJCL3s2eU" },
      texte:
        "Comme pour les suites, on étudie $f(x)$ quand $x$ devient très grand ($x \\to +\\infty$) ou très négatif ($x \\to -\\infty$).\n\n" +
        "- $\\lim\\limits_{x \\to +\\infty} f(x) = \\ell$ : tout intervalle ouvert contenant $\\ell$ contient toutes les valeurs $f(x)$ pour $x$ assez grand. La droite $y = \\ell$ est alors **asymptote horizontale** à la courbe en $+\\infty$.\n" +
        "- $\\lim\\limits_{x \\to +\\infty} f(x) = +\\infty$ : $f(x)$ dépasse n'importe quel réel $A$ pour $x$ assez grand.\n" +
        "- Mêmes définitions en $-\\infty$.\n\n" +
        "Sur la figure, $f(x) = 2 + \\dfrac{1{,}5}{x - 1}$ se rapproche de $2$ en $+\\infty$ et en $-\\infty$ : la droite $y = 2$ est asymptote horizontale.",
      exemple: {
        enonce: "Détermine $\\lim\\limits_{x \\to +\\infty} \\left(3 - \\dfrac{2}{x^2}\\right)$ et interprète graphiquement.",
        solution: "$\\dfrac{2}{x^2} \\to 0$, donc la limite vaut $3$.\n\nLa droite d'équation $y = 3$ est asymptote horizontale à la courbe en $+\\infty$ (la courbe est en dessous, car $\\dfrac{2}{x^2} > 0$)."
      }
    },
    {
      titre: "Limite en un réel $a$",
      video: { titre: "Vidéo d'Yvan Monka : démontrer qu'une droite est asymptote verticale", youtube: "https://youtu.be/pXDhrx-nMto" },
      texte:
        "Quand $f$ n'est pas définie en $a$ (valeur interdite), on étudie $f(x)$ pour $x$ proche de $a$.\n\n" +
        "- $\\lim\\limits_{x \\to a} f(x) = +\\infty$ : $f(x)$ dépasse n'importe quel réel pour $x$ assez proche de $a$. La droite $x = a$ est **asymptote verticale**.\n" +
        "- On distingue souvent la **limite à droite** ($x \\to a^+$, avec $x > a$) et la **limite à gauche** ($x \\to a^-$, avec $x < a$), qui peuvent être différentes.\n\n" +
        "Pour un quotient dont le dénominateur tend vers $0$ (et pas le numérateur), la limite est infinie : son signe se trouve avec un **tableau de signes** du dénominateur.\n\n" +
        "Par exemple, $\\lim\\limits_{x \\to 0^+} \\dfrac{1}{x} = +\\infty$ et $\\lim\\limits_{x \\to 0^-} \\dfrac{1}{x} = -\\infty$.",
      exemple: {
        enonce: "Étudie les limites de $f(x) = \\dfrac{x + 1}{x - 2}$ en $2^+$ et en $2^-$.",
        solution: "Le numérateur tend vers $3 > 0$. Le dénominateur tend vers $0$ : positif si $x > 2$, négatif si $x < 2$.\n\nDonc $\\lim\\limits_{x \\to 2^+} f(x) = +\\infty$ et $\\lim\\limits_{x \\to 2^-} f(x) = -\\infty$ : la droite $x = 2$ est asymptote verticale."
      }
    },
    {
      titre: "Fonctions de référence et exponentielle",
      video: { titre: "Vidéo d'Yvan Monka : démonstration des limites de la fonction exponentielle", youtube: "https://youtu.be/DDqgEz1Id2s" },
      texte:
        "- $x^2$, $x^n$ ($n \\geqslant 1$), $\\sqrt{x}$ tendent vers $+\\infty$ en $+\\infty$. En $-\\infty$, $x^n$ tend vers $+\\infty$ si $n$ est pair, vers $-\\infty$ si $n$ est impair.\n" +
        "- $\\dfrac{1}{x}$, $\\dfrac{1}{x^n}$, $\\dfrac{1}{\\sqrt{x}}$ tendent vers $0$ en $+\\infty$.\n" +
        "- En $0$ : $\\dfrac{1}{x^2} \\to +\\infty$ ; $\\dfrac{1}{x} \\to +\\infty$ en $0^+$ et $-\\infty$ en $0^-$.\n" +
        "- **Exponentielle** (démonstration au programme) : $\\lim\\limits_{x \\to +\\infty} e^x = +\\infty$ et $\\lim\\limits_{x \\to -\\infty} e^x = 0$. La droite $y = 0$ est asymptote horizontale en $-\\infty$.\n\n" +
        "Démonstration en $+\\infty$ : on a vu que $e^x \\geqslant x + 1$ (convexité, chapitre 2), et $x + 1 \\to +\\infty$.",
      exemple: {
        enonce: "Détermine les limites de $f(x) = 3e^{-x} + 1$ en $+\\infty$ et en $-\\infty$.",
        solution: "En $+\\infty$ : $-x \\to -\\infty$, donc $e^{-x} \\to 0$ et $f(x) \\to 1$.\n\nEn $-\\infty$ : $-x \\to +\\infty$, donc $e^{-x} \\to +\\infty$ et $f(x) \\to +\\infty$."
      }
    },
    {
      titre: "Opérations et formes indéterminées",
      video: { titre: "Vidéo d'Yvan Monka : calculer une limite avec une forme indéterminée", youtube: "https://youtu.be/4NQbGdXThrk" },
      texte:
        "Les règles sur les sommes, produits et quotients sont les mêmes que pour les suites, avec les mêmes **formes indéterminées** : « $+\\infty - \\infty$ », « $0 \\times \\infty$ », « $\\dfrac{\\infty}{\\infty}$ », « $\\dfrac{0}{0}$ ».\n\n" +
        "- **Polynôme** en $\\pm\\infty$ : il a la limite de son terme de plus haut degré.\n" +
        "- **Quotient de polynômes** en $\\pm\\infty$ : il a la limite du quotient des termes de plus haut degré.\n" +
        "- Attention au signe en $-\\infty$ : $-2x^3 \\to +\\infty$ quand $x \\to -\\infty$.\n\n" +
        "Ces règles « des termes dominants » ne valent qu'en $\\pm\\infty$, pas en un réel $a$.",
      exemple: {
        enonce: "Détermine $\\lim\\limits_{x \\to -\\infty} \\dfrac{2x^2 - 3x}{5 - x}$.",
        solution: "Forme « $\\dfrac{\\infty}{\\infty}$ ». Le quotient des termes dominants est $\\dfrac{2x^2}{-x} = -2x$.\n\nQuand $x \\to -\\infty$, $-2x \\to +\\infty$ : la limite vaut $+\\infty$."
      }
    },
    {
      titre: "Limite d'une fonction composée",
      video: { titre: "Vidéo d'Yvan Monka : calculer la limite d'une fonction composée avec l'exponentielle", youtube: "https://youtu.be/f5i_u8XVMfc" },
      texte:
        "Pour une fonction composée $f(x) = g(u(x))$ :\n\n" +
        "si $\\lim\\limits_{x \\to a} u(x) = b$ et $\\lim\\limits_{X \\to b} g(X) = c$, alors $\\lim\\limits_{x \\to a} g(u(x)) = c$ ($a$, $b$, $c$ réels ou infinis).\n\n" +
        "**Méthode** : on pose $X = u(x)$, on cherche la limite de $X$, puis celle de $g(X)$.\n\n" +
        "Le même principe donne la limite d'une suite $u_n = f(v_n)$.",
      exemple: {
        enonce: "Détermine $\\lim\\limits_{x \\to +\\infty} e^{\\frac{2x + 1}{x - 3}}$ et $\\lim\\limits_{x \\to 0^-} e^{\\frac{1}{x}}$.",
        solution: "$\\dfrac{2x + 1}{x - 3} \\to 2$ (termes dominants) et $\\lim\\limits_{X \\to 2} e^X = e^2$ : la première limite vaut $e^2$.\n\n$\\dfrac{1}{x} \\to -\\infty$ quand $x \\to 0^-$, et $\\lim\\limits_{X \\to -\\infty} e^X = 0$ : la seconde vaut $0$."
      }
    },
    {
      titre: "Comparaison et encadrement",
      video: { titre: "Vidéo d'Yvan Monka : calculer la limite d'une fonction à l'aide du théorème de comparaison", youtube: "https://youtu.be/OAtkpYMdu7Y" },
      texte:
        "Les théorèmes des suites s'étendent aux fonctions, en $\\pm\\infty$ ou en un réel :\n\n" +
        "- **Comparaison** : si $f(x) \\geqslant g(x)$ pour $x$ assez grand et $\\lim\\limits_{x \\to +\\infty} g(x) = +\\infty$, alors $\\lim\\limits_{x \\to +\\infty} f(x) = +\\infty$.\n" +
        "- **Gendarmes** : si $g(x) \\leqslant f(x) \\leqslant h(x)$ pour $x$ assez grand, et si $g$ et $h$ ont la même limite $\\ell$ en $+\\infty$, alors $\\lim\\limits_{x \\to +\\infty} f(x) = \\ell$.\n\n" +
        "On les utilise avec $\\sin(x)$ et $\\cos(x)$, qui n'ont pas de limite en $\\pm\\infty$ mais restent entre $-1$ et $1$.",
      exemple: {
        enonce: "Détermine $\\lim\\limits_{x \\to +\\infty} \\left(x + \\cos(x)\\right)$ et $\\lim\\limits_{x \\to +\\infty} \\dfrac{\\sin(x)}{x}$.",
        solution: "$\\cos(x) \\geqslant -1$, donc $x + \\cos(x) \\geqslant x - 1 \\to +\\infty$ : la première limite vaut $+\\infty$.\n\nPour $x > 0$ : $-\\dfrac{1}{x} \\leqslant \\dfrac{\\sin(x)}{x} \\leqslant \\dfrac{1}{x}$, et les deux bornes tendent vers $0$ : la seconde vaut $0$."
      }
    },
    {
      titre: "Croissances comparées",
      figure: "lfo-croissance",
      video: { titre: "Vidéo d'Yvan Monka : calculer une limite par croissance comparée", youtube: "https://youtu.be/GoLYLTZFaz0" },
      texte:
        "Pour tout entier naturel $n$ :\n\n" +
        "- $\\lim\\limits_{x \\to +\\infty} \\dfrac{e^x}{x^n} = +\\infty$ (démonstration au programme pour $n = 1$) ;\n" +
        "- $\\lim\\limits_{x \\to -\\infty} x^n e^x = 0$.\n\n" +
        "On retient : **en l'infini, l'exponentielle l'emporte sur les puissances de $x$**. Ces limites lèvent des formes indéterminées : $e^x - x^3$ en $+\\infty$, $xe^x$ en $-\\infty$, $\\dfrac{x^2}{e^x}$ en $+\\infty$…\n\n" +
        "Sur la figure, $x^3$ est d'abord au-dessus, mais l'exponentielle la dépasse vers $x \\approx 4{,}5$ et s'envole.",
      exemple: {
        enonce: "Détermine $\\lim\\limits_{x \\to +\\infty} (e^x - x^2)$ et $\\lim\\limits_{x \\to +\\infty} x^2e^{-x}$.",
        solution: "$e^x - x^2 = e^x\\left(1 - \\dfrac{x^2}{e^x}\\right)$ : $\\dfrac{x^2}{e^x} \\to 0$, la parenthèse tend vers $1$ et la limite vaut $+\\infty$.\n\n$x^2e^{-x} = \\dfrac{x^2}{e^x} = \\dfrac{1}{\\frac{e^x}{x^2}} \\to 0$."
      }
    },
    {
      titre: "Algorithmique : conjecturer une limite",
      texte:
        "Un programme peut calculer $f(x)$ pour des valeurs de plus en plus grandes, ou de plus en plus proches de $a$, pour **conjecturer** une limite :\n\n" +
        "```python\ndef f(x):\n    return (2*x + 1) / (x - 3)\n\nfor x in [10, 100, 1000, 10000]:\n    print(x, f(x))\n```\n\n" +
        "Les valeurs affichées se rapprochent de $2$. Ce n'est pas une démonstration : on la fait ensuite avec les règles de calcul.\n\n" +
        "Attention aux pièges numériques : pour des $x$ énormes, les calculs de l'ordinateur sont arrondis, et $\\texttt{exp(1000)}$ dépasse la capacité des nombres de Python.",
      exemple: {
        enonce: "Le programme affiche $\\texttt{f(10000)}$ $\\approx 2{,}0007$. Que conjecturer, et comment le démontrer ?",
        solution: "On conjecture $\\lim\\limits_{x \\to +\\infty} f(x) = 2$.\n\nDémonstration : $f(x) = \\dfrac{2 + \\frac{1}{x}}{1 - \\frac{3}{x}}$, le numérateur tend vers $2$ et le dénominateur vers $1$."
      }
    }
  ],

  videos: [
    { titre: "Limite avec une forme indéterminée (2)", type: "Forme indéterminée", youtube: "https://youtu.be/8tAVa4itblc" },
    { titre: "Démontrer qu'une droite est asymptote horizontale", type: "Asymptote", youtube: "https://youtu.be/0LDGK-QkL80" },
    { titre: "Limite d'une fonction composée", type: "Composée", youtube: "https://youtu.be/DNU1M3Ii76k" },
    { titre: "Limite à l'aide du théorème d'encadrement", type: "Encadrement", youtube: "https://youtu.be/Eo1jvPphja0" },
    { titre: "Tracer une courbe à partir du tableau de variations", type: "Courbe", youtube: "https://youtu.be/vkfpsiqMydY" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "lfo-reference", titre: "Limites de référence", etape: "Calculer des limites", nb: 6 },
    { type: "lfo-polyrat", titre: "Polynômes et quotients en l'infini", etape: "Calculer des limites", nb: 5 },
    { type: "lfo-en-a", titre: "Limite en un réel", etape: "Calculer des limites", nb: 5 },
    { type: "lfo-asymptotes", titre: "Asymptotes", etape: "Interpréter", nb: 5 },
    { type: "lfo-composee", titre: "Fonctions composées", etape: "Interpréter", nb: 5 },
    { type: "lfo-comparaison", titre: "Comparaison et gendarmes", etape: "Comparer", nb: 4 },
    { type: "lfo-croissances", titre: "Croissances comparées", etape: "Comparer", nb: 5 },
    { type: "lfo-python", titre: "Conjecturer avec Python", etape: "Algorithmique", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$\\lim\\limits_{x \\to -\\infty} x^3$ vaut :", choix: ["$-\\infty$", "$+\\infty$", "$0$", "$3$"], bonne: 0, explication: "Une puissance impaire d'un nombre très négatif est très négative." },
    { question: "$\\lim\\limits_{x \\to 0^-} \\dfrac{1}{x}$ vaut :", choix: ["$-\\infty$", "$+\\infty$", "$0$", "elle n'existe pas"], bonne: 0, explication: "Pour $x$ petit et négatif, $\\dfrac{1}{x}$ est très négatif." },
    { question: "$\\lim\\limits_{x \\to -\\infty} e^x$ vaut :", choix: ["$0$", "$-\\infty$", "$1$", "$+\\infty$"], bonne: 0, explication: "La courbe de l'exponentielle se rapproche de l'axe des abscisses en $-\\infty$." },
    { question: "Si $\\lim\\limits_{x \\to +\\infty} f(x) = -3$, alors :", choix: ["la droite $y = -3$ est asymptote horizontale en $+\\infty$", "la droite $x = -3$ est asymptote verticale", "$f(x) > -3$ pour tout $x$", "$f$ est décroissante"], bonne: 0, explication: "Limite finie en l'infini : asymptote horizontale." },
    { question: "Si $\\lim\\limits_{x \\to 1^+} f(x) = -\\infty$, alors :", choix: ["la droite $x = 1$ est asymptote verticale", "la droite $y = 1$ est asymptote horizontale", "$f(1) = -\\infty$", "$f$ est définie en $1$"], bonne: 0, explication: "Limite infinie en un réel : asymptote verticale d'équation $x = 1$." },
    { question: "$\\lim\\limits_{x \\to +\\infty} (-x^3 + 5x^2 + 1)$ vaut :", choix: ["$-\\infty$", "$+\\infty$", "$1$", "on ne peut pas savoir"], bonne: 0, explication: "Un polynôme a la limite de son terme de plus haut degré, $-x^3$." },
    { question: "$\\lim\\limits_{x \\to -\\infty} \\dfrac{3x^2 + 1}{x^2 - 4}$ vaut :", choix: ["$3$", "$-\\infty$", "$-\\dfrac{1}{4}$", "$0$"], bonne: 0, explication: "Quotient des termes dominants : $\\dfrac{3x^2}{x^2} = 3$." },
    { question: "$\\lim\\limits_{x \\to +\\infty} \\dfrac{x + 2}{x^2 + 1}$ vaut :", choix: ["$0$", "$1$", "$2$", "$+\\infty$"], bonne: 0, explication: "Quotient des termes dominants : $\\dfrac{x}{x^2} = \\dfrac{1}{x} \\to 0$." },
    { question: "$\\lim\\limits_{x \\to 3^-} \\dfrac{2}{x - 3}$ vaut :", choix: ["$-\\infty$", "$+\\infty$", "$0$", "$\\dfrac{2}{3}$"], bonne: 0, explication: "Pour $x < 3$, $x - 3$ est négatif et tend vers $0$." },
    { question: "$\\lim\\limits_{x \\to 2} \\dfrac{1}{(x - 2)^2}$ vaut :", choix: ["$+\\infty$", "$-\\infty$", "$0$", "elle n'existe pas"], bonne: 0, explication: "Le carré est positif des deux côtés : la limite est $+\\infty$ à gauche comme à droite." },
    { question: "Laquelle de ces formes est indéterminée ?", choix: ["$0 \\times \\infty$", "$\\dfrac{1}{\\infty}$", "$-\\infty - \\infty$", "$\\infty \\times \\infty$"], bonne: 0, explication: "Les trois autres donnent $0$, $-\\infty$ et $\\pm\\infty$." },
    { question: "$\\lim\\limits_{x \\to +\\infty} e^{-x^2}$ vaut :", choix: ["$0$", "$1$", "$-\\infty$", "$+\\infty$"], bonne: 0, explication: "$-x^2 \\to -\\infty$ et $\\lim\\limits_{X \\to -\\infty} e^X = 0$." },
    { question: "$\\lim\\limits_{x \\to +\\infty} e^{\\frac{1}{x}}$ vaut :", choix: ["$1$", "$0$", "$e$", "$+\\infty$"], bonne: 0, explication: "$\\dfrac{1}{x} \\to 0$ et $e^0 = 1$." },
    { question: "$\\lim\\limits_{x \\to +\\infty} \\sqrt{\\dfrac{4x + 1}{x}}$ vaut :", choix: ["$2$", "$4$", "$+\\infty$", "$1$"], bonne: 0, explication: "La fraction tend vers $4$ et $\\sqrt{4} = 2$." },
    { question: "$\\lim\\limits_{x \\to +\\infty} \\dfrac{e^x}{x^5}$ vaut :", choix: ["$+\\infty$", "$0$", "$1$", "on ne peut pas conclure"], bonne: 0, explication: "Croissance comparée : l'exponentielle l'emporte." },
    { question: "$\\lim\\limits_{x \\to -\\infty} x^2e^x$ vaut :", choix: ["$0$", "$+\\infty$", "$-\\infty$", "$1$"], bonne: 0, explication: "Croissance comparée en $-\\infty$ : $x^ne^x \\to 0$." },
    { question: "$\\lim\\limits_{x \\to +\\infty} (e^x - 100x)$ vaut :", choix: ["$+\\infty$", "$-\\infty$", "$0$", "on ne peut pas conclure"], bonne: 0, explication: "$e^x - 100x = e^x\\left(1 - \\dfrac{100x}{e^x}\\right)$ et $\\dfrac{x}{e^x} \\to 0$." },
    { question: "$\\lim\\limits_{x \\to +\\infty} \\dfrac{x^3}{e^x}$ vaut :", choix: ["$0$", "$+\\infty$", "$1$", "$3$"], bonne: 0, explication: "C'est l'inverse de $\\dfrac{e^x}{x^3}$, qui tend vers $+\\infty$." },
    { question: "$\\lim\\limits_{x \\to +\\infty} \\dfrac{2 + \\cos(x)}{x}$ vaut :", choix: ["$0$", "$2$", "$+\\infty$", "elle n'existe pas"], bonne: 0, explication: "$\\dfrac{1}{x} \\leqslant \\dfrac{2 + \\cos(x)}{x} \\leqslant \\dfrac{3}{x}$ pour $x > 0$ : gendarmes." },
    { question: "$\\lim\\limits_{x \\to +\\infty} \\sin(x)$ :", choix: ["n'existe pas", "vaut $0$", "vaut $1$", "vaut $+\\infty$"], bonne: 0, explication: "$\\sin(x)$ oscille entre $-1$ et $1$ sans se rapprocher d'une valeur." },
    { question: "Si $f(x) \\geqslant x^2$ pour tout $x$, alors $\\lim\\limits_{x \\to -\\infty} f(x)$ :", choix: ["vaut $+\\infty$", "vaut $-\\infty$", "vaut $0$", "on ne peut rien dire"], bonne: 0, explication: "$x^2 \\to +\\infty$ en $-\\infty$ ; par comparaison, $f(x) \\to +\\infty$." },
    { question: "La courbe de $f(x) = \\dfrac{3x - 1}{x + 2}$ a pour asymptotes :", choix: ["$y = 3$ et $x = -2$", "$y = -2$ et $x = 3$", "$y = 3$ et $x = 2$", "$y = -\\dfrac{1}{2}$ et $x = -2$"], bonne: 0, explication: "Limite $3$ en $\\pm\\infty$ (termes dominants) et limite infinie en $-2$ (dénominateur nul, numérateur égal à $-7$)." },
    { question: "Un programme affiche $f(10^6) \\approx 0{,}500001$. On peut :", choix: ["conjecturer que la limite en $+\\infty$ vaut $0{,}5$", "affirmer que la limite vaut $0{,}500001$", "affirmer que $f(x) > 0{,}5$ pour tout $x$", "dire qu'il n'y a pas de limite"], bonne: 0, explication: "Un calcul numérique permet de conjecturer ; il faut ensuite démontrer." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer une limite en $\\pm\\infty$",
      etapes: [
        "Chercher la limite de chaque morceau (fonctions de référence, exponentielle).",
        "Appliquer les règles d'opérations ; si forme indéterminée, transformer.",
        "Polynôme ou quotient de polynômes : garder les termes de plus haut degré (attention au signe en $-\\infty$).",
        "Avec l'exponentielle : factoriser par $e^x$ et utiliser les croissances comparées."
      ],
      exemple: "$\\lim\\limits_{x \\to -\\infty} (x^2 + 1)e^x = \\lim (x^2e^x + e^x) = 0 + 0 = 0$."
    },
    {
      titre: "Calculer une limite en une valeur interdite $a$",
      etapes: [
        "Calculer la limite du numérateur (souvent un nombre non nul).",
        "Le dénominateur tend vers $0$ : étudier son signe à gauche et à droite de $a$ (tableau de signes).",
        "Conclure avec la règle des signes : $\\dfrac{\\text{nombre} > 0}{0^+} = +\\infty$, etc.",
        "Interpréter : la droite $x = a$ est asymptote verticale."
      ],
      exemple: "$f(x) = \\dfrac{-3}{x + 1}$ : en $-1^+$, $x + 1 \\to 0^+$, donc $f(x) \\to -\\infty$ ; en $-1^-$, $f(x) \\to +\\infty$."
    },
    {
      titre: "Limite d'une fonction composée",
      etapes: [
        "Repérer la fonction intérieure $u$ et la fonction extérieure $g$ : $f(x) = g(u(x))$.",
        "Poser $X = u(x)$ et chercher la limite $b$ de $X$.",
        "Chercher la limite de $g(X)$ quand $X \\to b$.",
        "Conclure."
      ],
      exemple: "$\\lim\\limits_{x \\to +\\infty} \\sqrt{x^2 + 3} = +\\infty$, car $X = x^2 + 3 \\to +\\infty$ et $\\sqrt{X} \\to +\\infty$."
    },
    {
      titre: "Utiliser une comparaison",
      etapes: [
        "Repérer le terme borné ($\\sin$, $\\cos$, $(-1)^n$) entre $-1$ et $1$.",
        "Encadrer ou minorer $f(x)$ à partir de cet encadrement.",
        "Minoration par une fonction qui tend vers $+\\infty$ : comparaison.",
        "Encadrement par deux fonctions de même limite : gendarmes."
      ],
      exemple: "$x^2 + \\sin(x) \\geqslant x^2 - 1$, qui tend vers $+\\infty$."
    }
  ],
  erreurs: [
    "Oublier le signe en $-\\infty$ : $x^3 \\to -\\infty$, mais $x^2 \\to +\\infty$.",
    "Utiliser la règle des termes dominants en une valeur $a$ (elle ne vaut qu'en $\\pm\\infty$).",
    "Confondre asymptote horizontale ($y = \\ell$) et asymptote verticale ($x = a$).",
    "Oublier d'étudier le signe du dénominateur pour une limite en $a^+$ ou $a^-$.",
    "Conclure « pas de limite » devant une forme indéterminée.",
    "Croire que $\\dfrac{e^x}{x} \\to 1$ : l'exponentielle l'emporte, la limite est $+\\infty$.",
    "Croire qu'une courbe ne peut pas couper son asymptote horizontale."
  ]
};
