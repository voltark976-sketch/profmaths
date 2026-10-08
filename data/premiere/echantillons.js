/*
  CHAPITRE : Première spécialité — Expérimentations : échantillons
  ----------------------------------------------------------------
  Chapitre 16 de la progression spiralée 2026-2027 (programme de Première 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas de vidéo de la chaîne ni de vidéo d'Yvan Monka propre à ce chapitre de Première : deux vidéos de Seconde d'Yvan Monka
  (simulation, loi des grands nombres) servent de rappel, le reste est porté par les figures et les programmes Python.
  Figures : "sm-decoupage", "echantillons", "monte-carlo", "monte-carlo-pi". Générateurs : sm- (et ec-python, ec-lgn de Seconde).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-echantillons"] = {
  niveau: "Première spécialité",
  numero: 16,
  titre: "Expérimentations : échantillons",
  accroche: "Simuler le hasard en Python, peser des échantillons de régimes de bananes, voir la moyenne se rapprocher de l'espérance, et estimer π en lançant des points au hasard.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Simuler une variable aléatoire",
      figure: "sm-decoupage",
      video: { titre: "Vidéo d'Yvan Monka : simuler une expérience avec Python (rappel de Seconde)", youtube: "https://youtu.be/EXEcSJE31QY" },
      texte:
        "Dans une parcelle de bananiers, la masse $X$ (en kg) d'un régime suit la loi : $8$ kg avec la probabilité $0{,}1$ ; $10$ kg avec $0{,}3$ ; $12$ kg avec $0{,}4$ ; $14$ kg avec $0{,}2$. On a $E(X) = 11{,}4$ kg et $\\sigma(X) = 1{,}8$ kg.\n\n" +
        "random() (module random) renvoie un nombre au hasard dans $[0\\,;1[$. Il tombe dans un intervalle avec une probabilité égale à sa **longueur**. On découpe donc $[0\\,;1[$ en morceaux de longueurs $0{,}1$ ; $0{,}3$ ; $0{,}4$ ; $0{,}2$ :\n\n" +
        "```python\nfrom random import random\n\ndef regime():\n    r = random()\n    if r < 0.1:\n        return 8\n    elif r < 0.4:\n        return 10\n    elif r < 0.8:\n        return 12\n    else:\n        return 14\n```\n\n" +
        "Avec un tableur, ALEA() joue le rôle de random() : on tire le nombre en colonne A, on le teste en colonne B, puis on recopie les deux formules vers le bas.\n\n" +
        "```\nA1 : =ALEA()\nB1 : =SI(A1<0,1;8;SI(A1<0,4;10;SI(A1<0,8;12;14)))\n```\n\n" +
        "Attention : on n'écrit pas ALEA() dans chaque SI. Chaque appel tire un **nouveau** nombre, et la loi ne serait plus respectée.",
      exemple: {
        enonce: "Avec quelle probabilité regime() renvoie-t-elle $12$ ?",
        solution: "Elle renvoie $12$ quand $0{,}4 \\leqslant r < 0{,}8$ : intervalle de longueur $0{,}8 - 0{,}4 = 0{,}4$. C'est bien $P(X = 12)$."
      }
    },
    {
      titre: "Échantillon et moyenne d'un échantillon",
      video: { titre: "Vidéo d'Yvan Monka : estimer une probabilité avec la loi des grands nombres (rappel de Seconde)", youtube: "https://youtu.be/mFwXs_EMYes" },
      texte:
        "Un **échantillon de taille $n$** de $X$ est formé des résultats de $n$ répétitions **indépendantes** de la même expérience : ici, peser $n$ régimes pris au hasard dans la parcelle.\n\n" +
        "Sa **moyenne** $m$ est la moyenne de ces $n$ valeurs. La fonction suivante renvoie la moyenne d'un échantillon simulé de taille $n$ :\n\n" +
        "```python\ndef moyenne(n):\n    s = 0\n    for i in range(n):\n        s = s + regime()\n    return s / n\n```\n\n" +
        "- Deux échantillons différents donnent en général deux moyennes différentes : c'est la **fluctuation d'échantillonnage**.\n" +
        "- Quand $n$ devient grand, $m$ se rapproche de l'espérance $\\mu = E(X)$ : c'est la **loi des grands nombres**, déjà vue en Seconde avec les fréquences.",
      exemple: {
        enonce: "Trois appels à moyenne(10) affichent $11{,}2$ ; $12$ ; $10{,}8$, et un appel à moyenne(10000) affiche $11{,}39$. Commente.",
        solution: "Sur $10$ régimes, la moyenne fluctue beaucoup autour de $11{,}4$. Sur $10\\,000$ régimes, elle en est très proche : la distance $|m - \\mu| = 0{,}01$ est faible."
      }
    },
    {
      titre: "Distance entre la moyenne et l'espérance",
      figure: "echantillons",
      texte:
        "On simule $40$ échantillons de taille $n = 100$ et on place leurs moyennes. Elles se regroupent autour de $\\mu = 11{,}4$.\n\n" +
        "La distance $|m - \\mu|$ mesure l'erreur commise si l'on prend la moyenne de l'échantillon à la place de l'espérance. On observe qu'elle est le plus souvent inférieure à $\\dfrac{2\\sigma}{\\sqrt{n}}$, où $\\sigma$ est l'écart type de $X$ :\n\n" +
        "$\\dfrac{2\\sigma}{\\sqrt{n}} = \\dfrac{2 \\times 1{,}8}{\\sqrt{100}} = 0{,}36$.\n\n" +
        "Sur la figure, $38$ moyennes sur $40$, soit $95\\,\\%$, sont entre $11{,}4 - 0{,}36 = 11{,}04$ et $11{,}4 + 0{,}36 = 11{,}76$.\n\n" +
        "Le $\\sqrt{n}$ au dénominateur explique l'effet de la taille : avec $4$ fois plus de régimes, l'écart est divisé par $2$ ; avec $100$ fois plus, il est divisé par $10$.",
      exemple: {
        enonce: "Que vaut $\\dfrac{2\\sigma}{\\sqrt{n}}$ pour des échantillons de $400$ régimes ?",
        solution: "$\\dfrac{2 \\times 1{,}8}{\\sqrt{400}} = \\dfrac{3{,}6}{20} = 0{,}18$ kg : deux fois moins qu'avec $100$ régimes."
      }
    },
    {
      titre: "Simuler N échantillons : environ 95 % dans l'intervalle",
      texte:
        "On simule $N$ échantillons de taille $n$ et on calcule la **proportion** de ceux qui vérifient $|m - \\mu| \\leqslant \\dfrac{2\\sigma}{\\sqrt{n}}$ :\n\n" +
        "```python\nfrom math import sqrt\n\ndef proportion(N, n):\n    mu, sigma = 11.4, 1.8\n    c = 0\n    for k in range(N):\n        if abs(moyenne(n) - mu) <= 2 * sigma / sqrt(n):\n            c = c + 1\n    return c / N\n```\n\n" +
        "Avec $N = 1\\,000$, on obtient à chaque fois un résultat proche de $0{,}95$, que $n$ vaille $25$, $100$ ou $400$ : environ $95\\,\\%$ des échantillons ont une moyenne à moins de $\\dfrac{2\\sigma}{\\sqrt{n}}$ de l'espérance.\n\n" +
        "Ce n'est pas $100\\,\\%$ : quelques échantillons, par malchance, s'écartent davantage.",
      exemple: {
        enonce: "Sur $1\\,000$ échantillons de $100$ régimes, combien s'attend-on à en trouver en dehors de $[11{,}04\\,;11{,}76]$ ?",
        solution: "Environ $5\\,\\%$ d'entre eux, soit à peu près $50$ échantillons."
      }
    },
    {
      titre: "Estimer une espérance",
      texte:
        "En pratique, on ne connaît pas $\\mu$ : on n'a pesé qu'**un seul** échantillon. On retourne le raisonnement :\n\n" +
        "- dans environ $95\\,\\%$ des cas, $m$ est à moins de $\\dfrac{2\\sigma}{\\sqrt{n}}$ de $\\mu$ ;\n" +
        "- donc dans environ $95\\,\\%$ des cas, $\\mu$ est à moins de $\\dfrac{2\\sigma}{\\sqrt{n}}$ de $m$.\n\n" +
        "La moyenne observée $m$ est une **estimation** de l'espérance, avec une marge d'erreur de l'ordre de $\\dfrac{2\\sigma}{\\sqrt{n}}$. Pour diviser cette marge par $2$, il faut peser $4$ fois plus de régimes.",
      exemple: {
        enonce: "Une coopérative de Mayotte pèse $100$ régimes d'une nouvelle parcelle : moyenne $m = 11{,}9$ kg. On suppose $\\sigma \\approx 1{,}8$ kg. Que peut-on dire de la masse moyenne $\\mu$ des régimes de cette parcelle ?",
        solution: "La marge vaut $\\dfrac{2 \\times 1{,}8}{\\sqrt{100}} = 0{,}36$. On estime que $\\mu$ est entre $11{,}9 - 0{,}36 = 11{,}54$ et $11{,}9 + 0{,}36 = 12{,}26$ kg, avec un risque d'erreur d'environ $5\\,\\%$. Cette parcelle semble donner des régimes plus lourds que la première ($11{,}4$ kg)."
      }
    },
    {
      titre: "Méthode de Monte-Carlo : une aire sous une parabole",
      figure: "monte-carlo",
      texte:
        "On tire des points $(x\\,;y)$ au hasard dans le carré $[0\\,;1] \\times [0\\,;1]$, d'aire $1$. La probabilité qu'un point tombe sous la courbe de $y = x^2$ est égale à l'**aire** sous la courbe.\n\n" +
        "D'après la loi des grands nombres, la **proportion** de points sous la courbe se rapproche de cette aire quand on tire beaucoup de points :\n\n" +
        "```python\nfrom random import random\n\ndef aire(N):\n    c = 0\n    for i in range(N):\n        x = random()\n        y = random()\n        if y <= x*x:\n            c = c + 1\n    return c / N\n```\n\n" +
        "aire(100000) renvoie un nombre proche de $0{,}333$ : l'aire exacte vaut $\\dfrac{1}{3}$ (tu sauras la calculer en Terminale).",
      exemple: {
        enonce: "Sur $200$ points, la figure en montre $67$ sous la courbe. Quelle estimation de l'aire en déduit-on ?",
        solution: "$\\dfrac{67}{200} = 0{,}335$, proche de $\\dfrac{1}{3} \\approx 0{,}333$. Avec seulement $200$ points, l'estimation reste imprécise ; avec $100\\,000$ points, elle devient bien meilleure."
      }
    },
    {
      titre: "Méthode de Monte-Carlo : estimer π",
      figure: "monte-carlo-pi",
      texte:
        "Le quart de disque de centre $O$ et de rayon $1$ (points tels que $x^2 + y^2 \\leqslant 1$) a pour aire $\\dfrac{\\pi}{4}$. La proportion de points du carré qui tombent dedans estime donc $\\dfrac{\\pi}{4}$, et $4$ fois cette proportion estime $\\pi$ :\n\n" +
        "```python\nfrom random import random\n\ndef estimpi(N):\n    c = 0\n    for i in range(N):\n        x = random()\n        y = random()\n        if x*x + y*y <= 1:\n            c = c + 1\n    return 4 * c / N\n```\n\n" +
        "Comme pour les moyennes, l'erreur diminue comme $\\dfrac{1}{\\sqrt{N}}$ : pour gagner une décimale (erreur divisée par $10$), il faut $100$ fois plus de points.",
      exemple: {
        enonce: "Sur $10\\,000$ points, $7\\,862$ tombent dans le quart de disque. Quelle valeur approchée de $\\pi$ obtient-on ?",
        solution: "$\\dfrac{\\pi}{4} \\approx \\dfrac{7\\,862}{10\\,000} = 0{,}7862$, donc $\\pi \\approx 4 \\times 0{,}7862 = 3{,}1448$."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "ec-python", titre: "Rappel de Seconde : simulation et fréquence", etape: "Simulation", nb: 3 },
    { type: "sm-simulation", titre: "Simuler une loi avec random()", etape: "Simulation", nb: 5 },
    { type: "sm-moyenne", titre: "Moyenne d'un échantillon", etape: "Échantillons", nb: 4 },
    { type: "ec-lgn", titre: "Fluctuation et loi des grands nombres", etape: "Échantillons", nb: 3 },
    { type: "sm-lecture", titre: "Fluctuer, estimer : vrai ou faux ?", etape: "Échantillons", nb: 4 },
    { type: "sm-intervalle", titre: "L'écart 2σ/√n et les 95 %", etape: "Estimation", nb: 5 },
    { type: "sm-taille", titre: "Taille de l'échantillon et précision", etape: "Estimation", nb: 4 },
    { type: "sm-montecarlo", titre: "Méthode de Monte-Carlo : aire et π", etape: "Monte-Carlo", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "random() renvoie un nombre au hasard dans $[0\\,;1[$. La probabilité qu'il soit inférieur à $0{,}3$ vaut :", choix: ["$0{,}3$", "$0{,}7$", "$0{,}5$", "$3$"], bonne: 0, explication: "C'est la longueur de l'intervalle $[0\\,;0{,}3[$." },
    { question: "La probabilité que random() soit dans $[0{,}25\\,;0{,}75[$ vaut :", choix: ["$0{,}5$", "$0{,}75$", "$0{,}25$", "$1$"], bonne: 0, explication: "Longueur : $0{,}75 - 0{,}25 = 0{,}5$." },
    { question: "Un échantillon de taille $n$ est formé de :", choix: ["$n$ répétitions indépendantes de la même expérience", "$n$ valeurs toutes égales à $E(X)$", "$n$ expériences différentes", "$n$ probabilités"], bonne: 0, explication: "Par exemple, peser $n$ régimes pris au hasard dans la parcelle." },
    { question: "La moyenne d'un échantillon de $X$ est :", choix: ["une observation qui fluctue d'un échantillon à l'autre", "toujours égale à $E(X)$", "toujours supérieure à $E(X)$", "une probabilité"], bonne: 0, explication: "C'est la fluctuation d'échantillonnage." },
    { question: "Quand la taille $n$ de l'échantillon augmente, la moyenne $m$ :", choix: ["se rapproche en général de $E(X)$", "s'éloigne de $E(X)$", "ne change pas", "devient égale à $\\sigma$"], bonne: 0, explication: "Loi des grands nombres." },
    { question: "$\\sigma = 3$ et $n = 36$. $\\dfrac{2\\sigma}{\\sqrt{n}} =$", choix: ["$1$", "$\\dfrac{1}{6}$", "$6$", "$2$"], bonne: 0, explication: "$\\dfrac{6}{6} = 1$." },
    { question: "Sur un grand nombre d'échantillons de taille $n$, la proportion de ceux qui vérifient $|m - \\mu| \\leqslant \\dfrac{2\\sigma}{\\sqrt{n}}$ est environ :", choix: ["$95\\,\\%$", "$50\\,\\%$", "$100\\,\\%$", "$5\\,\\%$"], bonne: 0, explication: "On l'observe par simulation, quel que soit $n$." },
    { question: "Pour diviser par $2$ la marge $\\dfrac{2\\sigma}{\\sqrt{n}}$, il faut multiplier $n$ par :", choix: ["$4$", "$2$", "$\\sqrt{2}$", "$8$"], bonne: 0, explication: "$\\sqrt{4n} = 2\\sqrt{n}$." },
    { question: "$\\mu = 11{,}4$, $\\sigma = 1{,}8$, $n = 100$. Environ $95\\,\\%$ des moyennes sont dans :", choix: ["$[11{,}04\\,;11{,}76]$", "$[9{,}6\\,;13{,}2]$", "$[11{,}22\\,;11{,}58]$", "$[11{,}38\\,;11{,}42]$"], bonne: 0, explication: "$\\dfrac{2 \\times 1{,}8}{10} = 0{,}36$, et $11{,}4 \\pm 0{,}36$." },
    { question: "On pèse $400$ régimes : $m = 12$ kg, avec $\\sigma \\approx 2$ kg. La marge d'estimation $\\dfrac{2\\sigma}{\\sqrt{n}}$ vaut :", choix: ["$0{,}2$ kg", "$0{,}01$ kg", "$2$ kg", "$0{,}1$ kg"], bonne: 0, explication: "$\\dfrac{4}{20} = 0{,}2$ : $\\mu$ est estimée entre $11{,}8$ et $12{,}2$ kg." },
    { question: "Que renvoie la fonction moyenne(n) du cours ?", choix: ["la moyenne de $n$ masses de régimes simulées", "l'espérance exacte de $X$", "le nombre $n$", "la somme de $n$ probabilités"], bonne: 0, explication: "Elle additionne $n$ appels à regime(), puis divise par $n$." },
    { question: "Dans la méthode de Monte-Carlo du cours, la proportion de points sous la parabole se rapproche de :", choix: ["$\\dfrac{1}{3}$", "$\\dfrac{1}{2}$", "$1$", "$\\pi$"], bonne: 0, explication: "C'est l'aire sous la courbe de $y = x^2$ entre $0$ et $1$." },
    { question: "$787$ points sur $1\\,000$ tombent dans le quart de disque. On estime $\\pi$ par :", choix: ["$3{,}148$", "$0{,}787$", "$7{,}87$", "$1{,}574$"], bonne: 0, explication: "$4 \\times 0{,}787 = 3{,}148$." },
    { question: "Pour être $10$ fois plus précis avec la méthode de Monte-Carlo, il faut tirer :", choix: ["$100$ fois plus de points", "$10$ fois plus de points", "$2$ fois plus de points", "autant de points"], bonne: 0, explication: "L'erreur diminue comme $\\dfrac{1}{\\sqrt{N}}$." },
    { question: "Dans la fonction $\\texttt{regime()}$ du cours, quelle masse est renvoyée si $\\texttt{random()}$ donne exactement $0{,}4$ ?", choix: ["$12$", "$10$", "$8$", "$14$"], bonne: 0, explication: "$0{,}4 < 0{,}1$ est faux, $0{,}4 < 0{,}4$ est faux aussi (inégalité stricte), mais $0{,}4 < 0{,}8$ est vrai : la fonction renvoie $12$." },
    { question: "On veut simuler une variable qui vaut $1$ avec la probabilité $0{,}35$ et $0$ sinon. Quelle règle convient ?", choix: ["renvoyer $1$ si $\\texttt{random()} < 0{,}35$, sinon $0$", "renvoyer $1$ si $\\texttt{random()} > 0{,}35$, sinon $0$", "renvoyer $1$ si $\\texttt{random()} = 0{,}35$, sinon $0$", "renvoyer $1$ si $\\texttt{random()} < 0{,}65$, sinon $0$"], bonne: 0, explication: "$\\texttt{random()}$ tombe dans $[0\\,;0{,}35[$ avec une probabilité égale à la longueur, $0{,}35$. Le test $> 0{,}35$ donnerait la probabilité $0{,}65$." },
    { question: "Dans un tableur, pourquoi ne faut-il pas écrire ALEA() dans chacun des SI imbriqués ?", choix: ["Chaque ALEA() tire un nouveau nombre : la loi ne serait plus respectée", "ALEA() ne fonctionne qu'une fois par feuille", "ALEA() renvoie toujours le même nombre", "Le tableur refuse les SI imbriqués"], bonne: 0, explication: "On tire un seul nombre (colonne A) et on le teste plusieurs fois (colonne B). Avec plusieurs ALEA(), chaque test porterait sur un nombre différent." },
    { question: "Vrai ou faux : avec un échantillon de $10\\,000$ régimes, la moyenne $m$ est exactement égale à $E(X) = 11{,}4$.", choix: ["Faux", "Vrai"], bonne: 0, explication: "La loi des grands nombres dit que $m$ se rapproche de $E(X)$ quand $n$ grandit, mais $m$ fluctue toujours : elle est seulement proche de $11{,}4$." },
    { question: "$\\sigma = 5$ et $n = 25$. $\\dfrac{2\\sigma}{\\sqrt{n}} =$", choix: ["$2$", "$0{,}4$", "$10$", "$1$"], bonne: 0, explication: "$\\dfrac{2 \\times 5}{\\sqrt{25}} = \\dfrac{10}{5} = 2$. Diviser par $n = 25$ au lieu de $\\sqrt{25}$ donnerait $0{,}4$." },
    { question: "On passe d'échantillons de taille $n = 100$ à des échantillons de taille $n = 10\\,000$. La marge $\\dfrac{2\\sigma}{\\sqrt{n}}$ est :", choix: ["divisée par $10$", "divisée par $100$", "multipliée par $10$", "inchangée"], bonne: 0, explication: "$n$ est multiplié par $100$, donc $\\sqrt{n}$ est multiplié par $\\sqrt{100} = 10$ : la marge est divisée par $10$." },
    { question: "$\\mu = 50$, $\\sigma = 4$ et $n = 64$. Environ $95\\,\\%$ des moyennes d'échantillons sont dans :", choix: ["$[49\\,;51]$", "$[42\\,;58]$", "$[49{,}875\\,;50{,}125]$", "$[46\\,;54]$"], bonne: 0, explication: "$\\dfrac{2\\sigma}{\\sqrt{n}} = \\dfrac{8}{8} = 1$, donc l'intervalle va de $50 - 1$ à $50 + 1$." },
    { question: "On simule $1\\,000$ échantillons de taille $n$. Combien, environ, ont une moyenne à plus de $\\dfrac{2\\sigma}{\\sqrt{n}}$ de $\\mu$ ?", choix: ["environ $50$", "aucun", "environ $950$", "environ $500$"], bonne: 0, explication: "Environ $95\\,\\%$ des échantillons sont à moins de $\\dfrac{2\\sigma}{\\sqrt{n}}$ de $\\mu$ : il en reste environ $5\\,\\%$, soit environ $50$ sur $1\\,000$." },
    { question: "On pèse $n = 100$ régimes : $m = 11$ kg, avec $\\sigma = 1{,}5$ kg. Dans environ $95\\,\\%$ des cas, l'espérance $\\mu$ est entre :", choix: ["$10{,}7$ et $11{,}3$ kg", "$9{,}5$ et $12{,}5$ kg", "$10{,}97$ et $11{,}03$ kg", "$8$ et $14$ kg"], bonne: 0, explication: "La marge vaut $\\dfrac{2 \\times 1{,}5}{\\sqrt{100}} = \\dfrac{3}{10} = 0{,}3$ kg, donc $\\mu$ est estimée entre $11 - 0{,}3$ et $11 + 0{,}3$." },
    { question: "La marge $\\dfrac{2\\sigma}{\\sqrt{n}}$ permet d'affirmer que :", choix: ["dans environ $95\\,\\%$ des cas, l'espérance est à moins de cette marge de la moyenne observée", "l'espérance est toujours à moins de cette marge de la moyenne observée", "la moyenne observée est égale à l'espérance", "$95\\,\\%$ des valeurs de l'échantillon sont égales à l'espérance"], bonne: 0, explication: "C'est une estimation : elle est juste dans environ $95\\,\\%$ des cas, pas dans $100\\,\\%$. Quelques échantillons, par malchance, s'écartent davantage." },
    { question: "Dans la fonction $\\texttt{estimpi}$ du cours, le point $(0{,}6\\,;0{,}7)$ est-il compté dans le quart de disque ?", choix: ["Oui, car $0{,}36 + 0{,}49 = 0{,}85 \\leqslant 1$", "Non, car $0{,}6 + 0{,}7 = 1{,}3 > 1$", "Non, car $0{,}7 > 0{,}6$"], bonne: 0, explication: "Le test porte sur $x^2 + y^2 \\leqslant 1$ : $0{,}6^2 + 0{,}7^2 = 0{,}85$. Le point est à une distance inférieure à $1$ de l'origine." },
    { question: "Pour estimer l'aire sous la courbe de $y = x^2$, on tire $10\\,000$ points dans le carré unité : $3\\,320$ sont sous la courbe. L'aire est estimée à :", choix: ["$0{,}332$", "$3{,}32$", "$1{,}328$", "$0{,}668$"], bonne: 0, explication: "Le carré a une aire $1$ : la proportion $\\dfrac{3\\,320}{10\\,000} = 0{,}332$ estime l'aire, proche de la valeur exacte $\\dfrac{1}{3}$. On ne multiplie par $4$ que pour estimer $\\pi$." },
    { question: "La méthode de Monte-Carlo estime une aire grâce à :", choix: ["la loi des grands nombres : la proportion de points dans la zone se rapproche de son aire", "un calcul exact de l'aire", "la formule $\\dfrac{2\\sigma}{\\sqrt{n}}$", "la moyenne des abscisses des points tirés"], bonne: 0, explication: "Chaque point tombe dans la zone avec une probabilité égale à son aire. Sur un grand nombre de points, la fréquence observée se rapproche de cette probabilité." },
    { question: "Avec $N = 100$ points, la méthode de Monte-Carlo donne $\\pi$ à environ $0{,}3$ près. Avec $N = 10\\,000$ points, on peut s'attendre à une erreur d'environ :", choix: ["$0{,}03$", "$0{,}003$", "$0{,}3$", "$0{,}15$"], bonne: 0, explication: "L'erreur diminue comme $\\dfrac{1}{\\sqrt{N}}$ : $N$ est multiplié par $100$, donc l'erreur est divisée par $\\sqrt{100} = 10$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Simuler une variable aléatoire",
      etapes: ["Découper $[0\\,;1[$ en intervalles dont les longueurs sont les probabilités de la loi.", "Tirer r = random() (ou ALEA() dans un tableur), une seule fois.", "Renvoyer la valeur associée à l'intervalle où tombe r."],
      exemple: "Loi $8$ ; $10$ ; $12$ ; $14$ kg de probabilités $0{,}1$ ; $0{,}3$ ; $0{,}4$ ; $0{,}2$ : bornes $0{,}1$ ; $0{,}4$ ; $0{,}8$."
    },
    {
      titre: "Calculer la moyenne d'un échantillon (Python)",
      etapes: ["Initialiser une somme s à $0$.", "Ajouter $n$ valeurs simulées dans une boucle for.", "Renvoyer s / n."],
      exemple: "moyenne(1000) renvoie un nombre proche de $E(X) = 11{,}4$."
    },
    {
      titre: "Estimer une espérance à partir d'un échantillon",
      etapes: ["Calculer la moyenne $m$ de l'échantillon de taille $n$.", "Calculer la marge $\\dfrac{2\\sigma}{\\sqrt{n}}$.", "Conclure : dans environ $95\\,\\%$ des cas, $\\mu$ est entre $m - \\dfrac{2\\sigma}{\\sqrt{n}}$ et $m + \\dfrac{2\\sigma}{\\sqrt{n}}$."],
      exemple: "$n = 100$, $m = 11{,}9$, $\\sigma = 1{,}8$ : marge $0{,}36$, donc $\\mu$ entre $11{,}54$ et $12{,}26$ kg."
    },
    {
      titre: "Méthode de Monte-Carlo",
      etapes: ["Tirer $N$ points $(x\\,;y)$ au hasard dans le carré $[0\\,;1] \\times [0\\,;1]$.", "Compter ceux qui sont dans la zone (sous la courbe, dans le quart de disque…).", "La proportion obtenue estime l'aire de la zone ; pour $\\pi$, multiplier par $4$."],
      exemple: "$7\\,862$ points sur $10\\,000$ dans le quart de disque : $\\pi \\approx 3{,}1448$."
    }
  ],
  erreurs: [
    "Croire que la moyenne d'un échantillon est égale à l'espérance : elle fluctue autour.",
    "Utiliser deux ALEA() différents dans une même formule de tableur : chaque appel tire un nouveau nombre.",
    "Diviser par $n$ au lieu de $\\sqrt{n}$ dans $\\dfrac{2\\sigma}{\\sqrt{n}}$.",
    "Penser que $100\\,\\%$ des moyennes sont dans l'intervalle : c'est environ $95\\,\\%$.",
    "Croire qu'il suffit de doubler $n$ pour diviser la marge par $2$ : il faut multiplier $n$ par $4$.",
    "Oublier de multiplier par $4$ pour estimer $\\pi$ : la proportion estime $\\dfrac{\\pi}{4}$."
  ]
};
