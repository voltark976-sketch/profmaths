/*
  CHAPITRE : Terminale maths complémentaires — Suites et modèles discrets
  ------------------------------------------------------------------------
  Chapitre 1 de la progression spiralée 2026-2027 (programme de maths complémentaires de 2019, toujours en vigueur).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas encore de vidéo de la chaîne pour ce chapitre : vidéos d'Yvan Monka (cours de maths complémentaires 20SuitesTC1 et TC2).
  Figures : "tsu-escalier", "tsu-limite", "tsu-malthus". Générateurs : tsu- (et suite-, su-geo-limite).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-suites"] = {
  niveau: "Terminale maths complémentaires",
  numero: 1,
  titre: "Suites et modèles discrets",
  accroche: "Modéliser une évolution année après année, deviner où va une suite, calculer la limite d'une suite géométrique et d'une somme : la population de Mayotte et l'épargne en exemples.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Modéliser par une suite",
      video: { titre: "Vidéo d'Yvan Monka : étudier une suite définie par une relation de récurrence", youtube: "https://youtu.be/L7bBL4z-r90" },
      texte:
        "Une **suite** $(u_n)$ associe un nombre $u_n$ à chaque entier $n$ (le rang) : une population chaque année, un capital chaque mois…\n\n" +
        "- **Forme explicite** : $u_n$ se calcule directement à partir de $n$, par exemple $u_n = 3n + 2$ ou $u_n = 500 \\times 1{,}02^n$.\n" +
        "- **Forme récurrente** : on donne le premier terme et la façon de passer d'un terme au suivant, $u_{n+1} = f(u_n)$. Par exemple $u_0 = 1\\,000$ et $u_{n+1} = 1{,}02u_n$.\n\n" +
        "Avec une forme récurrente, on calcule les termes un par un : $u_1 = f(u_0)$, puis $u_2 = f(u_1)$, etc. La calculatrice (mode suite) ou un programme Python le font très vite.",
      exemple: {
        enonce: "Un capital de $1\\,000$ € est placé à $2\\,\\%$ par an. On note $C_n$ le capital au bout de $n$ années. Écris la relation de récurrence, puis calcule $C_2$.",
        solution: "Chaque année, le capital est multiplié par $1{,}02$ : $C_0 = 1\\,000$ et $C_{n+1} = 1{,}02C_n$.\n\n$C_1 = 1\\,020$ et $C_2 = 1{,}02 \\times 1\\,020 = 1\\,040{,}40$ €."
      }
    },
    {
      titre: "Représenter une suite récurrente : l'escalier",
      figure: "tsu-escalier",
      video: { titre: "Vidéo d'Yvan Monka : étudier graphiquement le comportement d'une suite (escalier)", youtube: "https://youtu.be/LDRx7aS9JsA" },
      texte:
        "Pour $u_{n+1} = f(u_n)$, on trace la courbe de $f$ et la droite $y = x$, puis :\n\n" +
        "- on part de $u_0$ sur l'axe horizontal et on monte jusqu'à la courbe : la hauteur atteinte est $u_1 = f(u_0)$ ;\n" +
        "- on va horizontalement jusqu'à la droite $y = x$, qui reporte $u_1$ sur l'axe horizontal ;\n" +
        "- on recommence pour obtenir $u_2$, $u_3$…\n\n" +
        "L'escalier permet de **conjecturer** le comportement de la suite : ici les termes montent et se rapprochent de $4$, abscisse du point où la courbe coupe la droite $y = x$ (là où $f(x) = x$).",
      exemple: {
        enonce: "Avec $u_0 = 0{,}5$ et $u_{n+1} = 0{,}5u_n + 2$, calcule $u_1$ et $u_2$, puis résous $0{,}5x + 2 = x$.",
        solution: "$u_1 = 0{,}5 \\times 0{,}5 + 2 = 2{,}25$ et $u_2 = 0{,}5 \\times 2{,}25 + 2 = 3{,}125$.\n\n$0{,}5x + 2 = x \\iff 2 = 0{,}5x \\iff x = 4$ : on conjecture que $u_n$ tend vers $4$."
      }
    },
    {
      titre: "Limite d'une suite : l'idée",
      figure: "tsu-limite",
      video: { titre: "Vidéo d'Yvan Monka : calculer la limite d'une suite à l'aide des formules d'opération", youtube: "https://youtu.be/v7hD6s3thp8" },
      texte:
        "- $(u_n)$ **tend vers un réel $\\ell$** si les termes finissent par être aussi proches de $\\ell$ qu'on veut : tout intervalle ouvert autour de $\\ell$ contient tous les termes **à partir d'un certain rang**. On note $\\lim\\limits_{n \\to +\\infty} u_n = \\ell$.\n" +
        "- $(u_n)$ **tend vers $+\\infty$** si les termes finissent par dépasser n'importe quel nombre $A$, et restent au-dessus à partir d'un certain rang.\n" +
        "- Une suite peut n'avoir **aucune limite** : $(-1)^n$ vaut $1$, $-1$, $1$…\n\n" +
        "Limites de référence : $\\dfrac{1}{n}$, $\\dfrac{1}{n^2}$, $\\dfrac{1}{\\sqrt{n}}$ tendent vers $0$ ; $n$, $n^2$, $\\sqrt{n}$ tendent vers $+\\infty$.\n\n" +
        "**Opérations** : on additionne, multiplie, divise les limites comme les nombres, tant qu'on ne tombe pas sur une forme comme « $+\\infty - \\infty$ » ou « $0 \\times \\infty$ » (forme indéterminée, non exigible).",
      exemple: {
        enonce: "Détermine la limite de $u_n = 3 + \\dfrac{2}{n}$ et celle de $v_n = 4n^2 - 5$.",
        solution: "$\\dfrac{2}{n} \\to 0$, donc $u_n \\to 3$ (voir la figure).\n\n$n^2 \\to +\\infty$, donc $4n^2 \\to +\\infty$ et $v_n \\to +\\infty$."
      }
    },
    {
      titre: "Comparaison et théorème des gendarmes",
      video: { titre: "Vidéo d'Yvan Monka : calculer une limite à l'aide du théorème d'encadrement", youtube: "https://youtu.be/OdzYjz_vQbw" },
      texte:
        "- **Comparaison** : si $u_n \\geqslant v_n$ à partir d'un certain rang et $v_n \\to +\\infty$, alors $u_n \\to +\\infty$ (de même vers $-\\infty$ avec $u_n \\leqslant v_n$).\n" +
        "- **Gendarmes** : si $v_n \\leqslant u_n \\leqslant w_n$ à partir d'un certain rang et si $(v_n)$ et $(w_n)$ tendent vers le même réel $\\ell$, alors $u_n \\to \\ell$.\n" +
        "- **Passage à la limite** : si $u_n \\leqslant 5$ pour tout $n$ et $u_n \\to \\ell$, alors $\\ell \\leqslant 5$. Attention, une inégalité stricte devient large : $5 - \\dfrac{1}{n} < 5$ mais sa limite vaut $5$.",
      exemple: {
        enonce: "Détermine la limite de $u_n = 2 + \\dfrac{(-1)^n}{n}$ pour $n \\geqslant 1$.",
        solution: "$-1 \\leqslant (-1)^n \\leqslant 1$, donc $2 - \\dfrac{1}{n} \\leqslant u_n \\leqslant 2 + \\dfrac{1}{n}$.\n\nLes deux suites qui encadrent tendent vers $2$ : d'après le théorème des gendarmes, $u_n \\to 2$."
      }
    },
    {
      titre: "Limite d'une suite géométrique",
      video: { titre: "Vidéo d'Yvan Monka : calculer la limite d'une suite géométrique", youtube: "https://youtu.be/F-PGmIK5Ypg" },
      texte:
        "Pour $q > 0$ :\n\n" +
        "- si $q > 1$, $q^n \\to +\\infty$ (même $1{,}001^n$, lentement) ;\n" +
        "- si $q = 1$, $q^n = 1$ ;\n" +
        "- si $0 < q < 1$, $q^n \\to 0$.\n\n" +
        "Pour une suite géométrique $u_n = u_0 \\times q^n$ : si $q > 1$, elle tend vers $+\\infty$ quand $u_0 > 0$ (et vers $-\\infty$ quand $u_0 < 0$) ; si $0 < q < 1$, elle tend vers $0$.",
      exemple: {
        enonce: "Détermine la limite de $u_n = 200 \\times 0{,}8^n + 50$, puis celle de $v_n = -3 \\times 1{,}05^n$.",
        solution: "$0 < 0{,}8 < 1$, donc $0{,}8^n \\to 0$ et $u_n \\to 50$.\n\n$1{,}05 > 1$, donc $1{,}05^n \\to +\\infty$ ; multiplié par $-3$ : $v_n \\to -\\infty$."
      }
    },
    {
      titre: "Somme des termes d'une suite géométrique et sa limite",
      video: { titre: "Vidéo d'Yvan Monka : calculer la limite d'une somme de termes d'une suite géométrique", youtube: "https://youtu.be/6QjMEzEn5X0" },
      texte:
        "Pour $q \\neq 1$ : $1 + q + q^2 + \\dots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$. On l'écrit aussi $\\sum\\limits_{k=0}^{n} q^k$ (la notation $\\Sigma$ sert à écrire la somme, pas à la calculer).\n\n" +
        "Si $0 < q < 1$, $q^{n+1} \\to 0$, donc :\n\n" +
        "$\\lim\\limits_{n \\to +\\infty} \\left(1 + q + \\dots + q^n\\right) = \\dfrac{1}{1 - q}$.\n\n" +
        "On additionne une infinité de termes positifs, et pourtant le total reste fini : les termes deviennent très vite minuscules.",
      exemple: {
        enonce: "Démontre que $1 + 0{,}5 + 0{,}5^2 + \\dots + 0{,}5^n$ tend vers $2$.",
        solution: "$S_n = \\dfrac{1 - 0{,}5^{n+1}}{1 - 0{,}5} = 2\\left(1 - 0{,}5^{n+1}\\right)$.\n\nComme $0 < 0{,}5 < 1$, $0{,}5^{n+1} \\to 0$, donc $S_n \\to 2$."
      }
    },
    {
      titre: "Modèle de Malthus : la population de Mayotte",
      figure: "tsu-malthus",
      texte:
        "Le **modèle de Malthus** suppose que la population augmente chaque année du même pourcentage : $P_{n+1} = (1 + t)P_n$, donc $P_n = P_0 \\times (1 + t)^n$, une suite géométrique.\n\n" +
        "Hypothèse de travail : environ $320\\,000$ habitants à Mayotte en 2024 et $+3\\,\\%$ par an. Alors $P_n = 320\\,000 \\times 1{,}03^n$ ; la figure montre environ $430\\,000$ habitants au bout de $10$ ans.\n\n" +
        "Comme $1{,}03 > 1$, $P_n \\to +\\infty$ : le modèle prédit une croissance sans fin, ce qui n'est pas réaliste à long terme (place, ressources, migrations). Un modèle se **critique** : il est utile sur une courte durée.",
      exemple: {
        enonce: "Avec ce modèle, en quelle année la population dépasse-t-elle $400\\,000$ habitants ?",
        solution: "À la calculatrice : $P_7 = 320\\,000 \\times 1{,}03^7 \\approx 393\\,560$ et $P_8 \\approx 405\\,370$.\n\nLe seuil est dépassé pour $n = 8$, soit en $2032$, selon ce modèle."
      }
    },
    {
      titre: "Python : termes d'une suite et recherche de seuil",
      texte:
        "Les termes d'une suite récurrente se calculent avec une boucle :\n\n" +
        "```python\ndef terme(n):\n    u = 320000\n    for i in range(n):\n        u = 1.03 * u\n    return u\n```\n\n" +
        "Pour trouver à partir de quel rang la suite dépasse un seuil, on utilise une boucle while :\n\n" +
        "```python\ndef seuil(S):\n    n = 0\n    u = 320000\n    while u <= S:\n        u = 1.03 * u\n        n = n + 1\n    return n\n```\n\n" +
        "seuil(400000) renvoie $8$. On peut aussi comparer avec la formule explicite $320\\,000 \\times 1{,}03^n$ : les deux donnent les mêmes valeurs.",
      exemple: {
        enonce: "Que renvoie terme(2) ?",
        solution: "$u$ vaut $320\\,000$, puis $329\\,600$, puis $339\\,488$ : terme(2) renvoie $339\\,488$ (à l'arrondi près des calculs de l'ordinateur)."
      }
    }
  ],

  videos: [
    { titre: "Calculer la limite d'une suite géométrique (2)", type: "Géométrique", youtube: "https://youtu.be/2BueBAoPvvc" },
    { titre: "Calculer la limite d'une suite géométrique (3)", type: "Géométrique", youtube: "https://youtu.be/XTftGHfnYMw" },
    { titre: "Calculer une limite à l'aide du théorème de comparaison", type: "Limites", youtube: "https://youtu.be/iQhh46LupN4" },
    { titre: "Afficher l'escalier d'une suite sur la calculatrice TI", type: "Calculatrice", youtube: "https://youtu.be/bRlvVs9KZuk" },
    { titre: "Afficher l'escalier d'une suite sur la calculatrice Casio", type: "Calculatrice", youtube: "https://youtu.be/9iDvDn3iWqQ" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "suite-recurrence", titre: "Calculer des termes d'une suite récurrente", etape: "Modéliser", nb: 4 },
    { type: "tsu-escalier", titre: "L'escalier d'une suite", etape: "Modéliser", nb: 4 },
    { type: "tsu-modele", titre: "Malthus, épargne : modéliser une évolution", etape: "Modéliser", nb: 4 },
    { type: "tsu-limite", titre: "Limites par opérations", etape: "Limites", nb: 5 },
    { type: "tsu-comparaison", titre: "Comparaison et gendarmes", etape: "Limites", nb: 4 },
    { type: "tsu-logique", titre: "À partir d'un certain rang : vrai ou faux ?", etape: "Limites", nb: 5 },
    { type: "su-geo-limite", titre: "Limite d'une suite géométrique", etape: "Suites géométriques", nb: 4 },
    { type: "tsu-somme-limite", titre: "Somme géométrique et sa limite", etape: "Suites géométriques", nb: 4 },
    { type: "suite-python", titre: "Python : termes d'une suite", etape: "Algorithmes", nb: 3 },
    { type: "suite-seuil", titre: "Recherche de seuil", etape: "Algorithmes", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$u_0 = 5$ et $u_{n+1} = 2u_n - 3$. Alors $u_2 =$", choix: ["$11$", "$7$", "$14$", "$4$"], bonne: 0, explication: "$u_1 = 2 \\times 5 - 3 = 7$, puis $u_2 = 2 \\times 7 - 3 = 11$." },
    { question: "$u_n = 4n - 1$. Cette suite est donnée sous forme :", choix: ["explicite", "récurrente", "géométrique", "constante"], bonne: 0, explication: "On calcule $u_n$ directement à partir de $n$." },
    { question: "Un capital augmente de $3\\,\\%$ par an. Le coefficient multiplicateur annuel est :", choix: ["$1{,}03$", "$0{,}03$", "$3$", "$1{,}3$"], bonne: 0, explication: "$1 + \\dfrac{3}{100} = 1{,}03$." },
    { question: "Dans l'escalier d'une suite $u_{n+1} = f(u_n)$, la droite tracée en plus de la courbe de $f$ est :", choix: ["$y = x$", "$y = 0$", "$x = 0$", "$y = f(0)$"], bonne: 0, explication: "Elle reporte chaque terme de l'axe vertical sur l'axe horizontal." },
    { question: "Si l'escalier se resserre vers le point d'abscisse $4$ de la droite $y = x$, on conjecture que :", choix: ["$u_n$ tend vers $4$", "$u_n$ tend vers $+\\infty$", "$u_n = 4$ pour tout $n$", "$u_4 = 0$"], bonne: 0, explication: "Les termes se rapprochent de l'abscisse du point d'intersection." },
    { question: "$\\lim\\limits_{n \\to +\\infty} \\dfrac{7}{n} =$", choix: ["$0$", "$7$", "$+\\infty$", "$1$"], bonne: 0, explication: "Un nombre fixe divisé par un nombre de plus en plus grand." },
    { question: "$\\lim\\limits_{n \\to +\\infty} \\left(5 - \\dfrac{3}{n^2}\\right) =$", choix: ["$5$", "$2$", "$0$", "$-\\infty$"], bonne: 0, explication: "$\\dfrac{3}{n^2} \\to 0$." },
    { question: "$\\lim\\limits_{n \\to +\\infty} (-2n^2 + 7) =$", choix: ["$-\\infty$", "$+\\infty$", "$7$", "$-2$"], bonne: 0, explication: "$n^2 \\to +\\infty$, multiplié par $-2$ négatif." },
    { question: "La suite $(-1)^n$ :", choix: ["n'a pas de limite", "tend vers $0$", "tend vers $1$", "tend vers $+\\infty$"], bonne: 0, explication: "Elle alterne entre $1$ et $-1$." },
    { question: "$\\lim\\limits_{n \\to +\\infty} 0{,}9^n =$", choix: ["$0$", "$0{,}9$", "$+\\infty$", "$1$"], bonne: 0, explication: "$0 < 0{,}9 < 1$." },
    { question: "$\\lim\\limits_{n \\to +\\infty} 1{,}01^n =$", choix: ["$+\\infty$", "$1$", "$1{,}01$", "$0$"], bonne: 0, explication: "$1{,}01 > 1$, même si la croissance est lente." },
    { question: "$\\lim\\limits_{n \\to +\\infty} (100 \\times 0{,}5^n + 20) =$", choix: ["$20$", "$120$", "$0$", "$+\\infty$"], bonne: 0, explication: "$0{,}5^n \\to 0$." },
    { question: "$\\lim\\limits_{n \\to +\\infty} (-4 \\times 2^n) =$", choix: ["$-\\infty$", "$+\\infty$", "$-4$", "$0$"], bonne: 0, explication: "$2^n \\to +\\infty$, multiplié par $-4$." },
    { question: "$1 + q + \\dots + q^n$ (avec $q \\neq 1$) vaut :", choix: ["$\\dfrac{1 - q^{n+1}}{1 - q}$", "$\\dfrac{1 - q^n}{1 - q}$", "$\\dfrac{q^{n+1}}{1 - q}$", "$n \\times q$"], bonne: 0, explication: "Il y a $n + 1$ termes." },
    { question: "$\\lim\\limits_{n \\to +\\infty} (1 + 0{,}2 + 0{,}2^2 + \\dots + 0{,}2^n) =$", choix: ["$1{,}25$", "$1{,}2$", "$+\\infty$", "$5$"], bonne: 0, explication: "$\\dfrac{1}{1 - 0{,}2} = \\dfrac{1}{0{,}8} = 1{,}25$." },
    { question: "$-\\dfrac{1}{n} \\leqslant u_n - 3 \\leqslant \\dfrac{1}{n}$ pour tout $n \\geqslant 1$. Alors :", choix: ["$u_n \\to 3$", "$u_n \\to 0$", "$u_n \\to +\\infty$", "on ne peut rien dire"], bonne: 0, explication: "Théorème des gendarmes." },
    { question: "$u_n \\geqslant \\sqrt{n}$ pour tout $n$. Alors :", choix: ["$u_n \\to +\\infty$", "$u_n \\to 0$", "$u_n \\to 1$", "on ne peut rien dire"], bonne: 0, explication: "Comparaison avec une suite qui tend vers $+\\infty$." },
    { question: "$u_n \\leqslant n$ pour tout $n$. Alors :", choix: ["on ne peut rien dire de la limite", "$u_n \\to +\\infty$", "$u_n \\to -\\infty$", "$u_n \\to 0$"], bonne: 0, explication: "Être en dessous d'une suite qui tend vers $+\\infty$ ne dit rien." },
    { question: "$u_n < 2$ pour tout $n$ et $u_n \\to \\ell$. Alors :", choix: ["$\\ell \\leqslant 2$", "$\\ell < 2$", "$\\ell = 2$", "$\\ell > 2$"], bonne: 0, explication: "Le passage à la limite transforme l'inégalité stricte en inégalité large." },
    { question: "Une suite croissante :", choix: ["peut avoir une limite finie", "tend toujours vers $+\\infty$", "est toujours majorée", "n'a jamais de limite"], bonne: 0, explication: "Exemple : $2 - \\dfrac{1}{n}$ est croissante et tend vers $2$." },
    { question: "Modèle de Malthus : $P_n = 320\\,000 \\times 1{,}03^n$. La limite de $(P_n)$ est :", choix: ["$+\\infty$", "$320\\,000$", "$1{,}03$", "$0$"], bonne: 0, explication: "$1{,}03 > 1$ : croissance sans fin, irréaliste à long terme." },
    { question: "Dans le programme seuil(S) du cours, la boucle while s'arrête quand :", choix: ["$u$ dépasse $S$", "$n$ dépasse $S$", "$u$ vaut $0$", "$n$ vaut $100$"], bonne: 0, explication: "On répète tant que $u \\leqslant S$ ; on sort dès que $u > S$." },
    { question: "« À partir d'un certain rang, $\\dfrac{1}{n} < 0{,}01$ ». Ce rang est :", choix: ["$101$", "$100$", "$10$", "$1$"], bonne: 0, explication: "$\\dfrac{1}{n} < 0{,}01 \\iff n > 100$." },
    { question: "La notation $\\sum\\limits_{k=0}^{n} 2^k$ désigne :", choix: ["$1 + 2 + 4 + \\dots + 2^n$", "$2^n$", "$2 + 4 + \\dots + 2n$", "$n \\times 2^n$"], bonne: 0, explication: "On additionne les $2^k$ pour $k$ allant de $0$ à $n$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Modéliser une évolution par une suite",
      etapes: ["Repérer ce qui se passe d'une étape à la suivante (on ajoute ? on multiplie ?).", "Écrire $u_0$ et la relation $u_{n+1} = \\dots$", "Si on multiplie toujours par $q$ : suite géométrique, $u_n = u_0 \\times q^n$."],
      exemple: "$+3\\,\\%$ par an : $P_{n+1} = 1{,}03P_n$, donc $P_n = P_0 \\times 1{,}03^n$."
    },
    {
      titre: "Conjecturer avec l'escalier",
      etapes: ["Tracer la courbe de $f$ et la droite $y = x$.", "Partir de $u_0$, monter à la courbe, aller à la droite, recommencer.", "Observer : les termes montent, descendent, se rapprochent d'un point d'intersection ?"],
      exemple: "$u_{n+1} = 0{,}5u_n + 2$ : l'escalier se resserre vers $4$, solution de $0{,}5x + 2 = x$."
    },
    {
      titre: "Calculer une limite",
      etapes: ["Chercher la limite de chaque morceau (limites de référence, $q^n$).", "Combiner par somme, produit, quotient.", "Si c'est impossible directement : encadrer (gendarmes) ou comparer."],
      exemple: "$3 + \\dfrac{(-1)^n}{n}$ : encadrée par $3 \\pm \\dfrac{1}{n}$, elle tend vers $3$."
    },
    {
      titre: "Limite d'une somme géométrique ($0 < q < 1$)",
      etapes: ["Écrire $S_n = $ premier terme $\\times \\dfrac{1 - q^{\\text{nombre de termes}}}{1 - q}$.", "Utiliser $q^n \\to 0$.", "Conclure : $S_n \\to \\dfrac{\\text{premier terme}}{1 - q}$."],
      exemple: "$4 + 2 + 1 + \\dots$ : premier terme $4$, $q = 0{,}5$, limite $\\dfrac{4}{0{,}5} = 8$."
    }
  ],
  erreurs: [
    "Ajouter les pourcentages au lieu de multiplier : $+3\\,\\%$ par an pendant $10$ ans ne fait pas $+30\\,\\%$.",
    "Oublier qu'une suite peut n'avoir aucune limite, comme $(-1)^n$.",
    "Croire qu'une suite croissante tend forcément vers $+\\infty$.",
    "Penser que $1{,}001^n$ reste proche de $1$ : il tend vers $+\\infty$.",
    "Garder une inégalité stricte en passant à la limite : $u_n < 5$ donne seulement $\\ell \\leqslant 5$.",
    "Se tromper sur le nombre de termes dans $1 + q + \\dots + q^n$ : il y en a $n + 1$."
  ]
};
