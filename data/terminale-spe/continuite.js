/*
  CHAPITRE : Terminale spécialité — Continuité
  ---------------------------------------------
  Chapitre 7 de la progression de Terminale spécialité (V26, période 2, 1 semaine) :
  fonctions continues, théorème des valeurs intermédiaires (et cas strictement monotone), dichotomie,
  application aux suites u(n+1) = f(u(n)).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas de vidéo de la chaîne sur ce thème : vidéos d'Yvan Monka (cours 20Cont).
  Figures : "cnt-saut", "cnt-tvi". Générateurs : cnt- (et tlf-tvi, lsu-point-fixe).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-spe-continuite"] = {
  niveau: "Terminale spécialité",
  numero: 7,
  titre: "Continuité",
  accroche: "Tracer une courbe sans lever le crayon, et en tirer une conséquence puissante : une équation $f(x) = k$ a forcément une solution, que l'on encadre ensuite par dichotomie.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours complet sur la continuité en vidéo (Yvan Monka)", url: "https://youtu.be/9SSEUoyHh2s", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Fonction continue",
      figure: "cnt-saut",
      video: { titre: "Vidéo d'Yvan Monka : étudier graphiquement la continuité d'une fonction", youtube: "https://youtu.be/XpjKserte6o" },
      texte:
        "Soit $f$ définie sur un intervalle $I$ contenant $a$.\n\n" +
        "- $f$ est **continue en $a$** si $\\lim\\limits_{x \\to a} f(x) = f(a)$ : quand $x$ se rapproche de $a$, $f(x)$ se rapproche de $f(a)$.\n" +
        "- $f$ est **continue sur $I$** si elle est continue en tout point de $I$.\n\n" +
        "Graphiquement, la courbe d'une fonction continue sur un intervalle se trace **sans lever le crayon**.\n\n" +
        "Sur la figure, la fonction n'est pas continue en $1$ : à gauche, $f(x)$ se rapproche de $1{,}5$, mais $f(1) = 2{,}5$. La courbe fait un saut.\n\n" +
        "Pour une fonction définie « par morceaux », on vérifie que les morceaux **se raccordent** : la limite à gauche, la limite à droite et la valeur en $a$ doivent être égales.",
      exemple: {
        enonce: "$f(x) = x^2$ si $x < 2$ et $f(x) = 3x + k$ si $x \\geqslant 2$. Pour quelle valeur de $k$ la fonction $f$ est-elle continue en $2$ ?",
        solution: "À gauche, $x^2 \\to 4$. En $2$, $f(2) = 6 + k$.\n\nIl faut $6 + k = 4$, donc $k = -2$. Les deux morceaux se raccordent alors au point $(2\\,;4)$."
      }
    },
    {
      titre: "Fonctions continues usuelles",
      video: { titre: "Vidéo d'Yvan Monka : étudier la continuité d'une fonction", youtube: "https://youtu.be/03WMLyc7rLE" },
      texte:
        "- Les fonctions polynômes, la fonction exponentielle, les fonctions sinus et cosinus sont continues sur $\\mathbb{R}$.\n" +
        "- La fonction inverse est continue sur $]-\\infty\\,;0[$ et sur $]0\\,;+\\infty[$ ; la fonction racine carrée sur $[0\\,;+\\infty[$.\n" +
        "- Les sommes, produits, quotients (là où le dénominateur ne s'annule pas) et composées de fonctions continues sont continues.\n\n" +
        "**Propriété** : une fonction **dérivable** en $a$ est **continue** en $a$.\n\n" +
        "La réciproque est fausse : $x \\mapsto |x|$ est continue en $0$ mais pas dérivable (la courbe a un « coin ») ; $x \\mapsto \\sqrt{x}$ est continue en $0$ mais sa tangente y est verticale.\n\n" +
        "Exemple de fonction non continue : la **partie entière**, qui saute d'une unité à chaque entier.",
      exemple: {
        enonce: "La fonction $f(x) = \\dfrac{e^x}{x^2 + 1}$ est-elle continue sur $\\mathbb{R}$ ?",
        solution: "$e^x$ et $x^2 + 1$ sont continues sur $\\mathbb{R}$, et $x^2 + 1 \\geqslant 1$ ne s'annule jamais.\n\nLe quotient est donc continu sur $\\mathbb{R}$ (il est même dérivable)."
      }
    },
    {
      titre: "Théorème des valeurs intermédiaires",
      figure: "cnt-tvi",
      video: { titre: "Vidéo d'Yvan Monka : appliquer le théorème des valeurs intermédiaires", youtube: "https://youtu.be/fkd7c3IAc3Y" },
      texte:
        "**Théorème des valeurs intermédiaires (TVI)** : si $f$ est **continue** sur $[a\\,;b]$, alors pour tout réel $k$ compris entre $f(a)$ et $f(b)$, l'équation $f(x) = k$ a **au moins une** solution dans $[a\\,;b]$.\n\n" +
        "Graphiquement : une courbe tracée sans lever le crayon, qui va de la hauteur $f(a)$ à la hauteur $f(b)$, coupe forcément toute droite horizontale $y = k$ intermédiaire.\n\n" +
        "- La continuité est indispensable : une courbe qui saute peut « passer par-dessus » $k$.\n" +
        "- Le théorème dit qu'une solution **existe**, pas combien il y en a, ni comment la calculer.\n\n" +
        "Cas fréquent : si $f$ est continue et que $f(a)$ et $f(b)$ sont de signes contraires, $f$ s'annule au moins une fois sur $[a\\,;b]$.",
      exemple: {
        enonce: "Montre que l'équation $x^3 - 3x + 1 = 0$ a au moins une solution dans $[0\\,;1]$.",
        solution: "$f(x) = x^3 - 3x + 1$ est continue (polynôme). $f(0) = 1 > 0$ et $f(1) = -1 < 0$.\n\n$0$ est compris entre $f(1)$ et $f(0)$ : d'après le TVI, l'équation $f(x) = 0$ a au moins une solution dans $[0\\,;1]$."
      }
    },
    {
      titre: "Cas d'une fonction strictement monotone",
      video: { titre: "Vidéo d'Yvan Monka : appliquer le théorème des valeurs intermédiaires (cas strictement monotone)", youtube: "https://youtu.be/UmGQf7gkvLg" },
      texte:
        "**Corollaire du TVI** (ou théorème de la bijection) : si $f$ est **continue** et **strictement monotone** sur $[a\\,;b]$, alors pour tout $k$ compris entre $f(a)$ et $f(b)$, l'équation $f(x) = k$ a une **unique** solution dans $[a\\,;b]$.\n\n" +
        "Cela s'étend aux intervalles ouverts ou infinis, en remplaçant $f(a)$ et $f(b)$ par les limites aux bornes.\n\n" +
        "**Avec un tableau de variations** : on applique le corollaire sur chaque intervalle où $f$ est strictement monotone, puis on compte les solutions. Par convention, les flèches obliques d'un tableau de variations traduisent la continuité et la stricte monotonie.",
      exemple: {
        enonce: "$f$ est continue sur $\\mathbb{R}$, strictement croissante sur $]-\\infty\\,;1]$ de $-\\infty$ à $3$, puis strictement décroissante sur $[1\\,;+\\infty[$ de $3$ vers $-2$ (limite en $+\\infty$). Combien de solutions a l'équation $f(x) = 0$ ?",
        solution: "Sur $]-\\infty\\,;1]$ : $0$ est entre $-\\infty$ et $3$, une unique solution.\n\nSur $[1\\,;+\\infty[$ : $0$ est entre $3$ et $-2$, une unique solution.\n\nAu total : $2$ solutions."
      }
    },
    {
      titre: "Encadrer une solution",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un encadrement de la solution d'une équation (calculatrice TI)", youtube: "https://youtu.be/MEkh0fxPakk" },
      texte:
        "Le corollaire du TVI garantit une solution unique $\\alpha$, mais pas sa valeur. On l'encadre par **balayage** :\n\n" +
        "- on calcule $f$ de proche en proche (tableau de valeurs de la calculatrice) avec un pas de $1$, puis $0{,}1$, puis $0{,}01$ ;\n" +
        "- $\\alpha$ est entre deux valeurs consécutives où $f$ **change de signe**.\n\n" +
        "Un encadrement d'amplitude $0{,}01$ donne une valeur approchée au centième. Pour un **arrondi**, on regarde aussi le signe de $f$ au milieu de l'encadrement.",
      exemple: {
        enonce: "$f(x) = x^3 + x - 3$ est strictement croissante. Encadre la solution $\\alpha$ de $f(x) = 0$ au dixième.",
        solution: "$f(1) = -1 < 0$ et $f(2) = 7 > 0$ : $1 < \\alpha < 2$.\n\nAvec un pas de $0{,}1$ : $f(1{,}2) \\approx -0{,}07 < 0$ et $f(1{,}3) \\approx 0{,}50 > 0$. Donc $1{,}2 < \\alpha < 1{,}3$."
      }
    },
    {
      titre: "Continuité et suites",
      video: { titre: "Vidéo d'Yvan Monka : étudier graphiquement le comportement d'une suite (escalier)", youtube: "https://youtu.be/LDRx7aS9JsA" },
      texte:
        "**Propriété** : si $(u_n)$ converge vers $\\ell$ et si $f$ est **continue** en $\\ell$, alors $(f(u_n))$ converge vers $f(\\ell)$.\n\n" +
        "Conséquence (vue au chapitre 4) : si $u_{n+1} = f(u_n)$, si $(u_n)$ converge vers $\\ell$ et si $f$ est continue, alors $\\ell = f(\\ell)$.\n\n" +
        "C'est la continuité qui justifie le « passage à la limite » dans la relation de récurrence. La limite est à chercher parmi les solutions de $f(x) = x$, que l'escalier de la suite permet de visualiser.",
      exemple: {
        enonce: "$u_0 = 1$ et $u_{n+1} = \\sqrt{2u_n + 3}$. On admet que $(u_n)$ converge vers $\\ell \\geqslant 0$. Trouve $\\ell$.",
        solution: "$f(x) = \\sqrt{2x + 3}$ est continue sur $\\left[-\\dfrac{3}{2}\\,;+\\infty\\right[$, donc $\\ell = \\sqrt{2\\ell + 3}$, soit $\\ell^2 - 2\\ell - 3 = 0$.\n\nLes solutions sont $3$ et $-1$ ; comme $\\ell \\geqslant 0$, $\\ell = 3$."
      }
    },
    {
      titre: "Algorithmique : la dichotomie",
      video: { titre: "Vidéo d'Yvan Monka : comprendre l'algorithme de dichotomie", youtube: "https://youtu.be/V7mlMCSrq1U" },
      texte:
        "La **dichotomie** encadre une solution en coupant l'intervalle en deux à chaque étape :\n\n" +
        "- on calcule le milieu $m$ de $[a\\,;b]$ ;\n" +
        "- si $f(a)$ et $f(m)$ sont de signes contraires, la solution est dans $[a\\,;m]$ ; sinon, dans $[m\\,;b]$.\n\n" +
        "```python\ndef dicho(f, a, b, e):\n    while b - a > e:\n        m = (a + b) / 2\n        if f(a) * f(m) <= 0:\n            b = m\n        else:\n            a = m\n    return a, b\n```\n\n" +
        "À chaque tour, l'amplitude est divisée par $2$ : après $10$ tours, elle est divisée par $2^{10} = 1\\,024$.",
      exemple: {
        enonce: "On applique deux tours de dichotomie à $f(x) = x^2 - 2$ sur $[1\\,;2]$. Quel intervalle obtient-on ?",
        solution: "Tour 1 : $m = 1{,}5$ ; $f(1) = -1 < 0$ et $f(1{,}5) = 0{,}25 > 0$ : on garde $[1\\,;1{,}5]$.\n\nTour 2 : $m = 1{,}25$ ; $f(1{,}25) = -0{,}4375 < 0$, même signe que $f(1)$ : on garde $[1{,}25\\,;1{,}5]$. Donc $1{,}25 < \\sqrt{2} < 1{,}5$."
      }
    }
  ],

  videos: [
    { titre: "Appliquer le théorème des valeurs intermédiaires (1)", type: "TVI", youtube: "https://youtu.be/fkd7c3IAc3Y" },
    { titre: "Encadrer la solution d'une équation à la calculatrice (Casio)", type: "Calculatrice", youtube: "https://youtu.be/XEZ5D19FpDQ" },
    { titre: "Prépare ton bac : fonctions et suites", type: "Bac", youtube: "https://youtu.be/mmHtILuE5mU" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "cnt-graphique", titre: "Continue ou pas ?", etape: "Continuité", nb: 4 },
    { type: "cnt-raccord", titre: "Raccorder deux morceaux", etape: "Continuité", nb: 4 },
    { type: "cnt-hypotheses", titre: "Que dit le TVI ?", etape: "Valeurs intermédiaires", nb: 5 },
    { type: "tlf-tvi", titre: "Nombre de solutions de $f(x) = k$", etape: "Valeurs intermédiaires", nb: 4 },
    { type: "cnt-encadrement", titre: "Encadrer une solution", etape: "Valeurs intermédiaires", nb: 4 },
    { type: "lsu-point-fixe", titre: "Continuité et limite d'une suite", etape: "Suites", nb: 4 },
    { type: "cnt-dichotomie", titre: "Python : la dichotomie", etape: "Algorithmique", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Graphiquement, une fonction continue sur un intervalle est une fonction dont la courbe :", choix: ["se trace sans lever le crayon", "est une droite", "n'a pas de coin", "est toujours croissante"], bonne: 0, explication: "Une courbe continue peut avoir des coins (comme $|x|$) ; elle ne fait pas de saut." },
    { question: "$f$ est continue en $a$ signifie :", choix: ["$\\lim\\limits_{x \\to a} f(x) = f(a)$", "$f'(a)$ existe", "$f(a) = 0$", "$f$ est définie en $a$"], bonne: 0, explication: "C'est la définition. La dérivabilité est plus forte." },
    { question: "Une fonction dérivable en $a$ est :", choix: ["continue en $a$", "nulle en $a$", "strictement monotone", "pas forcément continue en $a$"], bonne: 0, explication: "Dérivable implique continue. La réciproque est fausse." },
    { question: "La fonction $x \\mapsto |x|$ en $0$ est :", choix: ["continue mais pas dérivable", "dérivable mais pas continue", "ni continue ni dérivable", "continue et dérivable"], bonne: 0, explication: "La courbe a un coin en $0$ : pas de tangente, mais pas de saut." },
    { question: "$f(x) = 2x + 1$ si $x < 1$ et $f(x) = x^2 + k$ si $x \\geqslant 1$. $f$ est continue sur $\\mathbb{R}$ pour :", choix: ["$k = 2$", "$k = 3$", "$k = 1$", "$k = 0$"], bonne: 0, explication: "À gauche, $2x + 1 \\to 3$ ; $f(1) = 1 + k$. Il faut $1 + k = 3$." },
    { question: "$f$ est continue sur $[0\\,;4]$, $f(0) = -2$ et $f(4) = 5$. Alors l'équation $f(x) = 1$ :", choix: ["a au moins une solution dans $[0\\,;4]$", "a exactement une solution", "n'a pas de solution", "on ne peut rien dire"], bonne: 0, explication: "TVI : $1$ est entre $-2$ et $5$. Sans monotonie, pas d'unicité." },
    { question: "$f$ est continue et strictement décroissante sur $[1\\,;3]$, avec $f(1) = 6$ et $f(3) = -1$. L'équation $f(x) = 0$ a :", choix: ["exactement une solution", "au moins deux solutions", "aucune solution", "on ne peut rien dire"], bonne: 0, explication: "Corollaire du TVI : continue, strictement monotone, et $0$ est entre $-1$ et $6$." },
    { question: "$f$ est définie sur $[0\\,;1]$ avec $f(0) = -1$ et $f(1) = 1$, mais n'est pas continue. Alors :", choix: ["on ne peut pas affirmer que $f$ s'annule", "$f$ s'annule forcément", "$f$ ne s'annule jamais", "$f$ s'annule en $0{,}5$"], bonne: 0, explication: "Sans continuité, la courbe peut sauter de $-1$ à $1$ sans passer par $0$." },
    { question: "$f$ est continue et strictement croissante sur $[2\\,;5]$, avec $f(2) = 1$ et $f(5) = 4$. L'équation $f(x) = 7$ :", choix: ["n'a pas de solution dans $[2\\,;5]$", "a une unique solution", "a au moins une solution", "on ne peut rien dire"], bonne: 0, explication: "$f$ croissante : $f(x) \\leqslant f(5) = 4 < 7$ sur tout l'intervalle." },
    { question: "Dans un tableau de variations, les flèches obliques indiquent par convention que la fonction est :", choix: ["continue et strictement monotone sur l'intervalle", "dérivable et positive", "constante", "seulement croissante"], bonne: 0, explication: "C'est ce qui permet d'appliquer le corollaire du TVI sur chaque intervalle." },
    { question: "$f$ croît strictement de $-3$ à $4$ sur $[0\\,;2]$, puis décroît strictement de $4$ à $1$ sur $[2\\,;5]$ (continue). Combien de solutions a $f(x) = 2$ ?", choix: ["$2$", "$1$", "$0$", "$3$"], bonne: 0, explication: "Une sur $[0\\,;2]$ ($2$ entre $-3$ et $4$), une sur $[2\\,;5]$ ($2$ entre $4$ et $1$)." },
    { question: "Même fonction : combien de solutions a $f(x) = 0$ ?", choix: ["$1$", "$2$", "$0$", "$3$"], bonne: 0, explication: "Sur $[0\\,;2]$ : $0$ est entre $-3$ et $4$, une solution. Sur $[2\\,;5]$ : $f$ reste entre $1$ et $4$, pas de solution." },
    { question: "$f(1{,}4) < 0$ et $f(1{,}5) > 0$, avec $f$ continue et strictement croissante. La solution $\\alpha$ de $f(x) = 0$ vérifie :", choix: ["$1{,}4 < \\alpha < 1{,}5$", "$\\alpha = 1{,}45$", "$\\alpha > 1{,}5$", "$\\alpha < 1{,}4$"], bonne: 0, explication: "TVI sur $[1{,}4\\,;1{,}5]$, avec l'unicité grâce à la monotonie." },
    { question: "Pour savoir si $\\alpha$ s'arrondit à $1{,}4$ ou $1{,}5$ (avec $1{,}4 < \\alpha < 1{,}5$ et $f$ croissante), on calcule :", choix: ["le signe de $f(1{,}45)$", "$f(1{,}4) + f(1{,}5)$", "$f(1)$", "$f'(1{,}4)$"], bonne: 0, explication: "Si $f(1{,}45) < 0$, alors $\\alpha > 1{,}45$ et l'arrondi est $1{,}5$." },
    { question: "Dans la dichotomie, si $f(a) \\times f(m) \\leqslant 0$, on remplace :", choix: ["$b$ par $m$", "$a$ par $m$", "$a$ par $b$", "$m$ par $0$"], bonne: 0, explication: "$f$ change de signe entre $a$ et $m$ : on garde $[a\\,;m]$." },
    { question: "Après $3$ tours de dichotomie sur $[0\\,;1]$, l'amplitude de l'intervalle vaut :", choix: ["$0{,}125$", "$0{,}3$", "$0{,}5$", "$0{,}25$"], bonne: 0, explication: "Elle est divisée par $2$ à chaque tour : $\\dfrac{1}{2^3} = 0{,}125$." },
    { question: "$u_{n+1} = 0{,}5u_n + 2$ converge vers $\\ell$. Pourquoi peut-on écrire $\\ell = 0{,}5\\ell + 2$ ?", choix: ["Car $x \\mapsto 0{,}5x + 2$ est continue", "Car la suite est arithmétique", "Car $u_0 = \\ell$", "Car la suite est croissante"], bonne: 0, explication: "La continuité de $f$ permet de passer à la limite dans $u_{n+1} = f(u_n)$." },
    { question: "La fonction partie entière (qui à $x$ associe le plus grand entier inférieur ou égal à $x$) est :", choix: ["non continue en chaque entier", "continue sur $\\mathbb{R}$", "dérivable sur $\\mathbb{R}$", "continue seulement en $0$"], bonne: 0, explication: "Elle saute d'une unité à chaque entier : sa courbe est « en escalier »." },
    { question: "Laquelle de ces fonctions est continue sur $\\mathbb{R}$ ?", choix: ["$x \\mapsto \\dfrac{1}{x^2 + 1}$", "$x \\mapsto \\dfrac{1}{x}$", "$x \\mapsto \\sqrt{x}$", "$x \\mapsto \\dfrac{1}{x - 2}$"], bonne: 0, explication: "Son dénominateur ne s'annule jamais. Les autres ne sont pas définies sur tout $\\mathbb{R}$." },
    { question: "L'équation $e^x = 3 - x$ a une unique solution, car $g(x) = e^x + x - 3$ est :", choix: ["continue et strictement croissante, avec des limites $-\\infty$ et $+\\infty$", "positive", "décroissante", "dérivable seulement sur $[0\\,;1]$"], bonne: 0, explication: "$g'(x) = e^x + 1 > 0$ ; $g \\to -\\infty$ en $-\\infty$ et $+\\infty$ en $+\\infty$ ; corollaire du TVI avec $k = 0$." },
    { question: "$f$ est continue sur $[-1\\,;3]$ avec $f(-1) = 4$ et $f(3) = 4$. Alors :", choix: ["on ne peut pas affirmer que $f(x) = 0$ a une solution", "$f(x) = 0$ a au moins une solution", "$f$ est constante", "$f(x) = 4$ n'a que deux solutions"], bonne: 0, explication: "$0$ n'est pas entre $f(-1)$ et $f(3)$ : le TVI ne dit rien. La courbe peut rester au-dessus de l'axe ou descendre en dessous." },
    { question: "Le TVI permet d'affirmer qu'une solution existe. Il permet aussi :", choix: ["de l'encadrer, en l'appliquant sur des intervalles de plus en plus petits", "de calculer sa valeur exacte", "de savoir qu'elle est entière", "de la trouver sans calcul"], bonne: 0, explication: "C'est le principe du balayage et de la dichotomie." },
    { question: "La fonction $f(x) = \\sqrt{x}$ en $0$ est :", choix: ["continue mais pas dérivable", "dérivable mais pas continue", "ni continue ni dérivable", "continue et dérivable"], bonne: 0, explication: "$\\lim\\limits_{x \\to 0} \\sqrt{x} = 0 = f(0)$, mais le taux $\\dfrac{\\sqrt{h}}{h} = \\dfrac{1}{\\sqrt{h}}$ tend vers $+\\infty$ : tangente verticale." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Montrer qu'une équation a une unique solution",
      etapes: [
        "Écrire l'équation sous la forme $f(x) = k$ (souvent $k = 0$).",
        "Justifier que $f$ est continue (fonction usuelle, ou dérivable).",
        "Étudier les variations : $f$ strictement monotone sur l'intervalle.",
        "Calculer les valeurs (ou limites) aux bornes et vérifier que $k$ est entre les deux.",
        "Conclure avec le corollaire du TVI : une unique solution $\\alpha$."
      ],
      exemple: "$f(x) = x^3 + 2x - 1$ : continue, $f'(x) = 3x^2 + 2 > 0$, $f(0) = -1 < 0 < f(1) = 2$ : une unique solution dans $[0\\,;1]$."
    },
    {
      titre: "Compter les solutions avec un tableau de variations",
      etapes: [
        "Découper l'ensemble en intervalles où $f$ est strictement monotone.",
        "Sur chaque intervalle, regarder si $k$ est entre les deux valeurs extrêmes.",
        "Si oui : une unique solution sur cet intervalle ; sinon : aucune.",
        "Additionner (attention à ne pas compter deux fois une solution à la jonction)."
      ],
      exemple: "$f$ : $-\\infty \\nearrow 5 \\searrow -1 \\nearrow +\\infty$. Pour $k = 0$ : trois solutions ; pour $k = 6$ : une seule."
    },
    {
      titre: "Rendre continue une fonction définie par morceaux",
      etapes: [
        "Vérifier que chaque morceau est continu sur son intervalle.",
        "Au point de raccord $a$, calculer la limite à gauche et la limite à droite.",
        "Écrire qu'elles sont égales entre elles et à $f(a)$.",
        "Résoudre l'équation obtenue pour trouver le paramètre."
      ],
      exemple: "$f(x) = e^x$ si $x < 0$, $f(x) = x + k$ si $x \\geqslant 0$ : $e^0 = 1 = 0 + k$, donc $k = 1$."
    },
    {
      titre: "Encadrer une solution",
      etapes: [
        "Trouver deux entiers consécutifs où $f$ change de signe.",
        "Balayer avec un pas de $0{,}1$, puis $0{,}01$ (tableau de valeurs).",
        "Écrire l'encadrement obtenu.",
        "Pour un arrondi, tester le signe de $f$ au milieu de l'encadrement."
      ],
      exemple: "$f(2{,}23) < 0 < f(2{,}24)$ pour $f(x) = x^2 - 5$ : $2{,}23 < \\sqrt{5} < 2{,}24$."
    }
  ],
  erreurs: [
    "Appliquer le TVI sans vérifier la continuité.",
    "Conclure à une solution **unique** sans monotonie stricte.",
    "Oublier de vérifier que $k$ est bien entre $f(a)$ et $f(b)$.",
    "Croire que continue implique dérivable ($|x|$ est un contre-exemple).",
    "Dans la dichotomie, garder la mauvaise moitié (il faut celle où $f$ change de signe).",
    "Confondre encadrement au dixième et arrondi au dixième.",
    "Écrire $\\ell = f(\\ell)$ sans avoir justifié la convergence ni la continuité."
  ]
};
