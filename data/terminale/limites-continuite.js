/*
  CHAPITRE : Terminale maths complémentaires — Limites de fonctions et continuité
  -------------------------------------------------------------------------------
  Chapitre 4 de la progression spiralée 2026-2027 (programme de maths complémentaires de 2019).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Vidéos d'Yvan Monka (cours 20LimFctC et 20ContC).
  Figures : "tlf-reference", "tlf-asymptotes", "tlf-continuite", "tlf-tvi", "tlf-temperature". Générateurs : tlf-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-limites-continuite"] = {
  niveau: "Terminale maths complémentaires",
  numero: 4,
  titre: "Limites de fonctions et continuité",
  accroche: "Ce que devient une fonction aux extrémités, les asymptotes, la continuité, et le théorème des valeurs intermédiaires pour compter et encadrer les solutions d'une équation.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Limites des fonctions de référence",
      figure: "tlf-reference",
      video: { titre: "Vidéo d'Yvan Monka : déterminer graphiquement des limites d'une fonction", youtube: "https://youtu.be/9nEJCL3s2eU" },
      texte:
        "Comme pour les suites, on regarde ce que devient $f(x)$ quand $x$ devient très grand ($x \\to +\\infty$), très grand en négatif ($x \\to -\\infty$) ou très proche d'un nombre.\n\n" +
        "- $x^2$ : $+\\infty$ en $+\\infty$ et en $-\\infty$.\n" +
        "- $x^3$ : $+\\infty$ en $+\\infty$, $-\\infty$ en $-\\infty$.\n" +
        "- $\\sqrt{x}$ : $+\\infty$ en $+\\infty$.\n" +
        "- $\\dfrac{1}{x}$ : $0$ en $\\pm\\infty$ ; $+\\infty$ en $0$ par valeurs positives, $-\\infty$ par valeurs négatives.\n" +
        "- $e^x$ : $+\\infty$ en $+\\infty$ et $0$ en $-\\infty$.",
      exemple: {
        enonce: "Donne $\\lim\\limits_{x \\to -\\infty} e^x$ et $\\lim\\limits_{x \\to +\\infty} e^{-x}$.",
        solution: "$\\lim\\limits_{x \\to -\\infty} e^x = 0$ (la courbe se colle à l'axe à gauche).\n\n$e^{-x} = \\dfrac{1}{e^x}$ et $e^x \\to +\\infty$, donc $\\lim\\limits_{x \\to +\\infty} e^{-x} = 0$."
      }
    },
    {
      titre: "Asymptotes horizontales et verticales",
      figure: "tlf-asymptotes",
      video: { titre: "Vidéo d'Yvan Monka : démontrer qu'une droite est asymptote verticale", youtube: "https://youtu.be/pXDhrx-nMto" },
      texte:
        "- Si $\\lim\\limits_{x \\to +\\infty} f(x) = \\ell$ (ou en $-\\infty$), la droite $y = \\ell$ est **asymptote horizontale** : la courbe s'en rapproche.\n" +
        "- Si $f(x)$ tend vers $+\\infty$ ou $-\\infty$ quand $x$ tend vers $a$, la droite $x = a$ est **asymptote verticale**.\n\n" +
        "Sur la figure, $f(x) = 2 + \\dfrac{1}{x - 1}$ : $\\dfrac{1}{x - 1} \\to 0$ en $\\pm\\infty$, donc $y = 2$ est asymptote horizontale ; le dénominateur s'annule en $1$, où $f(x) \\to \\pm\\infty$ : $x = 1$ est asymptote verticale.",
      exemple: {
        enonce: "Détermine les asymptotes de la courbe de $g(x) = -3 + \\dfrac{2}{x + 4}$.",
        solution: "$\\dfrac{2}{x + 4} \\to 0$ en $\\pm\\infty$ : asymptote horizontale $y = -3$.\n\nLe dénominateur s'annule pour $x = -4$ et $g(x) \\to \\pm\\infty$ : asymptote verticale $x = -4$."
      }
    },
    {
      titre: "Opérations sur les limites",
      video: { titre: "Vidéo d'Yvan Monka : calculer la limite d'une fonction à l'aide des formules d'opération", youtube: "https://youtu.be/at6pFx-Umfs" },
      texte:
        "On combine les limites comme pour les suites (règles admises) :\n\n" +
        "- somme : $\\ell + \\ell'$ ; $+\\infty + \\ell = +\\infty$ ; $+\\infty + (+\\infty) = +\\infty$ ;\n" +
        "- produit : $\\ell \\times \\ell'$ ; un nombre non nul fois $+\\infty$ donne $\\pm\\infty$ selon son signe ;\n" +
        "- quotient : un nombre divisé par une quantité qui tend vers $\\pm\\infty$ tend vers $0$.\n\n" +
        "Les cas « $+\\infty - \\infty$ », « $0 \\times \\infty$ », « $\\dfrac{\\infty}{\\infty}$ » sont des **formes indéterminées** : on ne conclut pas directement (non exigible).",
      exemple: {
        enonce: "Détermine $\\lim\\limits_{x \\to +\\infty} \\left(3 - 2e^{-x}\\right)$ et $\\lim\\limits_{x \\to -\\infty} \\left(x^3 + 5\\right)$.",
        solution: "$e^{-x} \\to 0$ en $+\\infty$, donc $3 - 2e^{-x} \\to 3$.\n\n$x^3 \\to -\\infty$ en $-\\infty$, donc $x^3 + 5 \\to -\\infty$."
      }
    },
    {
      titre: "Continuité",
      figure: "tlf-continuite",
      video: { titre: "Vidéo d'Yvan Monka : étudier graphiquement la continuité d'une fonction", youtube: "https://youtu.be/XpjKserte6o" },
      texte:
        "Une fonction est **continue** sur un intervalle si sa courbe se trace **sans lever le crayon** : pas de saut, pas de trou.\n\n" +
        "- Les fonctions polynômes, $\\sqrt{x}$, $\\dfrac{1}{x}$ (sur chaque intervalle où elle est définie), $e^x$ et leurs combinaisons sont continues là où elles sont définies.\n" +
        "- Une fonction **dérivable** sur un intervalle y est continue (la réciproque est fausse : $|x|$ est continue mais pas dérivable en $0$).\n\n" +
        "Dans un tableau de variations, les flèches traduisent la continuité et la stricte monotonie.",
      exemple: {
        enonce: "$f(x) = 1 + 0{,}5x$ pour $x \\leqslant 3$ et $f(x) = x - 0{,}5$ pour $x > 3$. La courbe a-t-elle un saut en $3$ ?",
        solution: "Les deux formules donnent $2{,}5$ en $x = 3$ ($1 + 1{,}5$ et $3 - 0{,}5$) : les morceaux se raccordent, pas de saut. $f$ est continue (voir la figure)."
      }
    },
    {
      titre: "Théorème des valeurs intermédiaires",
      figure: "tlf-tvi",
      video: { titre: "Vidéo d'Yvan Monka : appliquer le théorème des valeurs intermédiaires", youtube: "https://youtu.be/fkd7c3IAc3Y" },
      texte:
        "**Théorème (admis).** Si $f$ est continue sur $[a\\,;b]$ et si $k$ est compris entre $f(a)$ et $f(b)$, alors **il existe au moins un réel** $c$ de $[a\\,;b]$ tel que $f(c) = k$.\n\n" +
        "**Cas strictement monotone.** Si de plus $f$ est strictement monotone sur $[a\\,;b]$, ce réel $c$ est **unique**.\n\n" +
        "Attention :\n\n" +
        "- sans continuité, la courbe peut « sauter » par-dessus la valeur $k$ ;\n" +
        "- la réciproque est fausse : $f(x) = x^2$ s'annule sur $[-1\\,;1]$ alors que $f(-1)$ et $f(1)$ sont tous deux positifs.\n\n" +
        "Sur la figure, la courbe continue coupe trois fois la droite $y = 2$ : l'équation $f(x) = 2$ a trois solutions.",
      exemple: {
        enonce: "$f$ est continue et strictement croissante sur $[1\\,;4]$, avec $f(1) = -2$ et $f(4) = 7$. Combien de solutions a l'équation $f(x) = 0$ ?",
        solution: "$0$ est compris entre $-2$ et $7$, $f$ est continue et strictement croissante : d'après le corollaire du TVI, l'équation a **une unique** solution dans $[1\\,;4]$."
      }
    },
    {
      titre: "Compter les solutions avec un tableau de variations",
      video: { titre: "Vidéo d'Yvan Monka : appliquer le théorème des valeurs intermédiaires (2)", youtube: "https://youtu.be/UmGQf7gkvLg" },
      texte:
        "Pour compter les solutions de $f(x) = k$ :\n\n" +
        "- on découpe l'intervalle en morceaux où $f$ est continue et strictement monotone (lignes du tableau de variations) ;\n" +
        "- sur chaque morceau, il y a **une** solution si $k$ est strictement entre les valeurs aux bornes, **aucune** sinon ;\n" +
        "- on additionne.\n\n" +
        "Pour résoudre $f(x) \\leqslant k$, on repère sur quels morceaux la courbe est sous la droite $y = k$, en s'aidant des solutions trouvées.",
      exemple: {
        enonce: "$f$ est continue sur $[0\\,;6]$, croît de $-1$ à $5$ sur $[0\\,;2]$, puis décroît de $5$ à $2$ sur $[2\\,;6]$. Combien de solutions a $f(x) = 3$ ?",
        solution: "Sur $[0\\,;2]$ : $3$ est entre $-1$ et $5$, une solution. Sur $[2\\,;6]$ : $3$ est entre $5$ et $2$, une solution. Au total, **deux** solutions."
      }
    },
    {
      titre: "Encadrer une solution : balayage et dichotomie",
      texte:
        "Le TVI dit qu'une solution existe, sans la donner. Pour l'encadrer :\n\n" +
        "- **balayage** : on calcule $f(x)$ de $0{,}1$ en $0{,}1$ (tableau de valeurs) et on repère le changement de signe ;\n" +
        "- **dichotomie** : on coupe l'intervalle en deux à chaque étape et on garde la moitié où le signe change.\n\n" +
        "```python\ndef f(x):\n    return x**3 + x - 1\n\ndef dicho(a, b, k):\n    for i in range(k):\n        m = (a + b) / 2\n        if f(a) * f(m) <= 0:\n            b = m\n        else:\n            a = m\n    return a, b\n```\n\n" +
        "Après $k$ tours, l'intervalle a pour amplitude $\\dfrac{b - a}{2^k}$ : $10$ tours divisent la largeur par plus de $1\\,000$. La méthode de Newton (tangentes, vue en Première) converge encore plus vite.",
      exemple: {
        enonce: "Encadre au dixième la solution $\\alpha$ de $x^3 + x - 1 = 0$ sur $[0\\,;1]$.",
        solution: "$f(0{,}6) \\approx -0{,}184 < 0$ et $f(0{,}7) \\approx 0{,}043 > 0$ : $0{,}6 < \\alpha < 0{,}7$ (en fait $\\alpha \\approx 0{,}682$)."
      }
    },
    {
      titre: "Modèles : coût moyen et température d'équilibre",
      figure: "tlf-temperature",
      texte:
        "- **Coût moyen** d'un artisan qui fabrique $x$ paniers avec $100$ € de frais fixes et $5$ € par panier : $C_M(x) = \\dfrac{5x + 100}{x} = 5 + \\dfrac{100}{x}$. Quand $x \\to +\\infty$, $C_M(x) \\to 5$ : les frais fixes deviennent négligeables, asymptote $y = 5$.\n" +
        "- **Température d'un plat** : $T(t) = 25 + 65e^{-0{,}2t}$. Quand $t \\to +\\infty$, $e^{-0{,}2t} \\to 0$ et $T(t) \\to 25$ °C : la température d'équilibre est une asymptote horizontale (figure).\n\n" +
        "C'est la version « continue » du plat qui refroidit du chapitre 3.",
      exemple: {
        enonce: "À partir de combien de paniers le coût moyen $C_M(x) = 5 + \\dfrac{100}{x}$ passe-t-il sous $7$ € ?",
        solution: "$5 + \\dfrac{100}{x} < 7 \\iff \\dfrac{100}{x} < 2 \\iff x > 50$ (car $x > 0$) : à partir de $51$ paniers."
      }
    }
  ],

  videos: [
    { titre: "Démontrer qu'une droite est asymptote horizontale", type: "Asymptotes", youtube: "https://youtu.be/0LDGK-QkL80" },
    { titre: "Calculer la limite d'une fonction à l'aide du théorème de comparaison", type: "Limites", youtube: "https://youtu.be/OAtkpYMdu7Y" },
    { titre: "Étudier la continuité d'une fonction", type: "Continuité", youtube: "https://youtu.be/03WMLyc7rLE" },
    { titre: "Encadrer la solution d'une équation avec la calculatrice TI", type: "Calculatrice", youtube: "https://youtu.be/MEkh0fxPakk" },
    { titre: "Encadrer la solution d'une équation avec la calculatrice Casio", type: "Calculatrice", youtube: "https://youtu.be/XEZ5D19FpDQ" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "tlf-reference", titre: "Limites des fonctions de référence", etape: "Limites", nb: 5 },
    { type: "tlf-operations", titre: "Limites par opérations", etape: "Limites", nb: 5 },
    { type: "tlf-asymptote", titre: "Asymptotes", etape: "Limites", nb: 4 },
    { type: "tlf-modele", titre: "Coût moyen, température d'équilibre", etape: "Limites", nb: 4 },
    { type: "tlf-tvi", titre: "Nombre de solutions de f(x) = k", etape: "Continuité et TVI", nb: 4 },
    { type: "tlf-logique", titre: "TVI : vrai ou faux ?", etape: "Continuité et TVI", nb: 5 },
    { type: "tlf-encadrer", titre: "Encadrer une solution (balayage)", etape: "Encadrer", nb: 4 },
    { type: "tlf-dichotomie", titre: "Python : dichotomie", etape: "Encadrer", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$\\lim\\limits_{x \\to -\\infty} x^2 =$", choix: ["$+\\infty$", "$-\\infty$", "$0$", "$1$"], bonne: 0, explication: "Un carré est positif et devient très grand." },
    { question: "$\\lim\\limits_{x \\to -\\infty} x^3 =$", choix: ["$-\\infty$", "$+\\infty$", "$0$", "$3$"], bonne: 0, explication: "Le cube garde le signe." },
    { question: "$\\lim\\limits_{x \\to -\\infty} e^x =$", choix: ["$0$", "$-\\infty$", "$1$", "$+\\infty$"], bonne: 0, explication: "La courbe se colle à l'axe des abscisses." },
    { question: "$\\lim\\limits_{x \\to 0,\\, x > 0} \\dfrac{1}{x} =$", choix: ["$+\\infty$", "$-\\infty$", "$0$", "$1$"], bonne: 0, explication: "On divise $1$ par un petit nombre positif." },
    { question: "$\\lim\\limits_{x \\to 0,\\, x < 0} \\dfrac{1}{x} =$", choix: ["$-\\infty$", "$+\\infty$", "$0$", "$-1$"], bonne: 0, explication: "On divise $1$ par un petit nombre négatif." },
    { question: "$\\lim\\limits_{x \\to +\\infty} \\left(4 - \\dfrac{3}{x}\\right) =$", choix: ["$4$", "$1$", "$+\\infty$", "$-3$"], bonne: 0, explication: "$\\dfrac{3}{x} \\to 0$." },
    { question: "$\\lim\\limits_{x \\to +\\infty} \\left(2 + 5e^{-x}\\right) =$", choix: ["$2$", "$7$", "$+\\infty$", "$5$"], bonne: 0, explication: "$e^{-x} \\to 0$." },
    { question: "$\\lim\\limits_{x \\to +\\infty} \\left(x^2 + e^x\\right) =$", choix: ["$+\\infty$", "$0$", "$1$", "forme indéterminée"], bonne: 0, explication: "Somme de deux termes qui tendent vers $+\\infty$." },
    { question: "« $+\\infty - \\infty$ » est :", choix: ["une forme indéterminée", "égal à $0$", "égal à $+\\infty$", "égal à $-\\infty$"], bonne: 0, explication: "On ne peut pas conclure directement." },
    { question: "Si $\\lim\\limits_{x \\to +\\infty} f(x) = -1$, la courbe de $f$ admet :", choix: ["l'asymptote horizontale $y = -1$", "l'asymptote verticale $x = -1$", "l'asymptote $y = x - 1$", "aucune asymptote"], bonne: 0, explication: "Limite finie en $+\\infty$ : asymptote horizontale." },
    { question: "$f(x) = 3 + \\dfrac{1}{x - 2}$ a pour asymptote verticale :", choix: ["$x = 2$", "$x = 3$", "$y = 3$", "$x = -2$"], bonne: 0, explication: "Le dénominateur s'annule en $2$." },
    { question: "$f(x) = 3 + \\dfrac{1}{x - 2}$ a pour asymptote horizontale :", choix: ["$y = 3$", "$y = 2$", "$x = 2$", "$y = 0$"], bonne: 0, explication: "$\\dfrac{1}{x - 2} \\to 0$ en $\\pm\\infty$." },
    { question: "$T(t) = 25 + 65e^{-0{,}2t}$ tend, quand $t \\to +\\infty$, vers :", choix: ["$25$", "$90$", "$65$", "$0$"], bonne: 0, explication: "$e^{-0{,}2t} \\to 0$." },
    { question: "Une fonction continue sur un intervalle :", choix: ["a une courbe tracée sans lever le crayon", "est forcément croissante", "est forcément dérivable", "s'annule forcément"], bonne: 0, explication: "C'est l'idée de la continuité." },
    { question: "Une fonction dérivable sur un intervalle y est :", choix: ["continue", "croissante", "positive", "constante"], bonne: 0, explication: "Dérivable entraîne continue." },
    { question: "La fonction $x \\mapsto |x|$ en $0$ est :", choix: ["continue mais pas dérivable", "dérivable mais pas continue", "ni continue ni dérivable", "continue et dérivable"], bonne: 0, explication: "Pas de saut, mais un angle." },
    { question: "TVI : $f$ continue sur $[a\\,;b]$, $f(a) < 0 < f(b)$. Alors l'équation $f(x) = 0$ a :", choix: ["au moins une solution", "exactement une solution", "aucune solution", "deux solutions"], bonne: 0, explication: "« Il existe au moins un réel $c$ »." },
    { question: "Pour être sûr que la solution est unique, il faut en plus que $f$ soit :", choix: ["strictement monotone", "positive", "paire", "dérivable en $0$"], bonne: 0, explication: "Corollaire du TVI." },
    { question: "$f$ continue, strictement décroissante de $8$ à $-1$ sur $[0\\,;3]$. L'équation $f(x) = 2$ a :", choix: ["une unique solution", "aucune solution", "deux solutions", "une infinité de solutions"], bonne: 0, explication: "$2$ est entre $8$ et $-1$." },
    { question: "$f$ continue, strictement croissante de $1$ à $4$ sur $[0\\,;5]$. L'équation $f(x) = 6$ a :", choix: ["aucune solution", "une unique solution", "deux solutions", "on ne peut pas savoir"], bonne: 0, explication: "$f(x) \\leqslant 4 < 6$." },
    { question: "La réciproque du TVI (« si $f$ s'annule, alors $f(a)$ et $f(b)$ sont de signes contraires ») est :", choix: ["fausse", "vraie", "vraie si $f$ est positive", "le TVI lui-même"], bonne: 0, explication: "Contre-exemple : $x^2$ sur $[-1\\,;1]$." },
    { question: "$f(1{,}3) < 0$ et $f(1{,}4) > 0$ avec $f$ continue. Alors une solution de $f(x) = 0$ est :", choix: ["entre $1{,}3$ et $1{,}4$", "égale à $1{,}35$", "plus grande que $1{,}4$", "impossible à situer"], bonne: 0, explication: "Changement de signe : TVI." },
    { question: "Après $3$ étapes de dichotomie sur $[1\\,;2]$, l'intervalle a pour amplitude :", choix: ["$0{,}125$", "$0{,}3$", "$0{,}5$", "$0{,}25$"], bonne: 0, explication: "$\\dfrac{1}{2^3} = 0{,}125$." },
    { question: "$C_M(x) = 5 + \\dfrac{100}{x}$ (coût moyen). Quand la production devient très grande, $C_M(x)$ tend vers :", choix: ["$5$", "$105$", "$100$", "$0$"], bonne: 0, explication: "Les frais fixes se répartissent sur beaucoup de produits." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer une limite",
      etapes: ["Repérer les fonctions de référence et leurs limites ($x^n$, $\\dfrac{1}{x}$, $\\sqrt{x}$, $e^x$).", "Combiner par somme, produit, quotient.", "Si on tombe sur une forme indéterminée, transformer l'écriture (non exigible) ou utiliser une autre méthode."],
      exemple: "$\\lim\\limits_{x \\to +\\infty} (3 - 2e^{-x}) = 3$."
    },
    {
      titre: "Trouver les asymptotes",
      etapes: ["Limite finie $\\ell$ en $\\pm\\infty$ : asymptote horizontale $y = \\ell$.", "Valeur interdite $a$ où $f(x) \\to \\pm\\infty$ : asymptote verticale $x = a$.", "Vérifier sur la courbe (calculatrice)."],
      exemple: "$2 + \\dfrac{1}{x - 1}$ : $y = 2$ et $x = 1$."
    },
    {
      titre: "Compter les solutions de $f(x) = k$",
      etapes: ["Dresser le tableau de variations (morceaux continus et strictement monotones).", "Sur chaque morceau, $k$ est-il entre les valeurs aux bornes ? Une solution si oui.", "Additionner et conclure par une phrase."],
      exemple: "Croît de $-1$ à $5$ puis décroît de $5$ à $2$ : $f(x) = 3$ a deux solutions."
    },
    {
      titre: "Encadrer une solution",
      etapes: ["Vérifier les hypothèses du TVI (continuité, valeurs de signes contraires).", "Balayage au pas $0{,}1$ (calculatrice) ou dichotomie.", "Conclure : $a < \\alpha < a + 0{,}1$."],
      exemple: "$x^3 + x - 1 = 0$ : $0{,}6 < \\alpha < 0{,}7$."
    }
  ],
  erreurs: [
    "Croire que $\\lim\\limits_{x \\to -\\infty} e^x = -\\infty$ : l'exponentielle est toujours positive, elle tend vers $0$.",
    "Oublier le signe de $x$ pour $\\dfrac{1}{x}$ près de $0$.",
    "Confondre asymptote horizontale ($y = \\dots$) et verticale ($x = \\dots$).",
    "Conclure trop vite face à « $+\\infty - \\infty$ » : c'est une forme indéterminée.",
    "Annoncer une solution unique avec le TVI sans vérifier la stricte monotonie.",
    "Utiliser la réciproque du TVI, qui est fausse."
  ]
};
