/*
  CHAPITRE : Première spécialité — Variations et courbes représentatives
  -----------------------------------------------------------------------
  Chapitre 10 de la progression spiralée 2026-2027 (programme de Première 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas encore de vidéo de la chaîne ni de PDF pour ce chapitre : les vidéos sont celles d'Yvan Monka.
  Figures : "cubique-variations", "tabsv-cubique", "x3-palier", "parite", "inegalite-cubique", "boite-patron", "newton".
  Générateurs : vr-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-variations"] = {
  niveau: "Première spécialité",
  numero: 10,
  titre: "Variations et courbes représentatives",
  accroche: "Le signe de la dérivée raconte les variations : tableaux, extremums, parité, inégalités, la boîte de volume maximal, la distillerie d'ylang-ylang et la méthode de Newton.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur les variations en vidéo (Yvan Monka)", url: "https://youtu.be/uMSNllPBFhQ", type: "video" },
    { titre: "Le cours sur les fonctions paires et impaires (Yvan Monka)", url: "https://youtu.be/DUbAkwCX8O8", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Signe de la dérivée et sens de variation",
      figure: "cubique-variations",
      video: { titre: "Vidéo d'Yvan Monka : comprendre le lien entre signe de la dérivée et variations", youtube: "https://youtu.be/dPIlTNyBCiw" },
      texte:
        "**Théorème** (admis). Soit $f$ dérivable sur un intervalle $I$.\n\n" +
        "- Si $f'(x) \\geqslant 0$ pour tout $x$ de $I$, alors $f$ est croissante sur $I$.\n" +
        "- Si $f'(x) \\leqslant 0$ pour tout $x$ de $I$, alors $f$ est décroissante sur $I$.\n" +
        "- Si $f'(x) = 0$ pour tout $x$ de $I$, alors $f$ est constante sur $I$.\n\n" +
        "Si $f' > 0$ sur $I$, sauf éventuellement en quelques points isolés où elle s'annule, $f$ est **strictement** croissante.\n\n" +
        "Sur le schéma, $f(x) = x^3 - 3x$ : $f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$ est positive avant $-1$, négative entre $-1$ et $1$, positive après $1$.",
      exemple: {
        enonce: "Montre que $g(x) = x^3 + x$ est strictement croissante sur $\\mathbb{R}$.",
        solution: "$g'(x) = 3x^2 + 1$. Un carré est positif ou nul, donc $3x^2 + 1 \\geqslant 1 > 0$ pour tout réel $x$ : $g$ est strictement croissante sur $\\mathbb{R}$."
      }
    },
    {
      titre: "Dresser un tableau de variations",
      figure: "tabsv-cubique",
      video: { titre: "Vidéo d'Yvan Monka : étudier les variations d'une fonction", youtube: "https://youtu.be/23_Ba3N0fu4" },
      texte:
        "**Méthode** :\n\n" +
        "- calculer $f'(x)$ ;\n" +
        "- étudier son signe (factoriser, utiliser le signe d'un trinôme…) ;\n" +
        "- en déduire les flèches : vers le haut quand $f' > 0$, vers le bas quand $f' < 0$ ;\n" +
        "- calculer les valeurs de $f$ aux points où $f'$ s'annule, et aux bornes si l'intervalle est fermé.\n\n" +
        "Pour $f(x) = x^3 - 3x$ (tableau ci-contre) : $f(-1) = 2$ et $f(1) = -2$. La fonction admet un **maximum local** $2$ en $-1$ et un **minimum local** $-2$ en $1$.",
      exemple: {
        enonce: "Étudie les variations de $h(x) = -x^3 + 12x$.",
        solution: "$h'(x) = -3x^2 + 12 = -3(x - 2)(x + 2)$ : négatif avant $-2$, positif entre $-2$ et $2$, négatif après $2$.\n\n$h$ décroît sur $]-\\infty\\,;-2]$, croît sur $[-2\\,;2]$, décroît sur $[2\\,;+\\infty[$, avec un minimum local $h(-2) = -16$ et un maximum local $h(2) = 16$."
      }
    },
    {
      titre: "Logique : implication et réciproque",
      texte:
        "Le théorème dit : « **si** $f' \\geqslant 0$ sur $I$, **alors** $f$ est croissante sur $I$ ». C'est une **implication**.\n\n" +
        "Sa **réciproque** échange les deux parties : « si $f$ est croissante sur $I$, alors $f' \\geqslant 0$ sur $I$ ». Pour une fonction dérivable, elle est vraie aussi.\n\n" +
        "Mais « si $f$ est **strictement** croissante, alors $f' > 0$ » est **faux**. Contre-exemple : $f(x) = x^3$ est strictement croissante sur $\\mathbb{R}$, et pourtant $f'(0) = 0$.\n\n" +
        "Une implication vraie peut avoir une réciproque fausse : on vérifie toujours les deux sens séparément.",
      exemple: {
        enonce: "« Si $f$ est constante sur $I$, alors $f' = 0$ sur $I$. » Quelle est la réciproque ? Est-elle vraie ?",
        solution: "Réciproque : « si $f' = 0$ sur un intervalle $I$, alors $f$ est constante sur $I$ ». Elle est vraie (troisième ligne du théorème) : l'implication et sa réciproque sont vraies, les deux propriétés sont **équivalentes**."
      }
    },
    {
      titre: "Extremum et nombre dérivé",
      figure: "x3-palier",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un extremum", youtube: "https://youtu.be/zxyKLqnlMIk" },
      texte:
        "**Propriété** : si $f$ est dérivable sur un intervalle ouvert $I$ et admet un extremum local en $a \\in I$, alors $f'(a) = 0$ : la tangente y est horizontale.\n\n" +
        "C'est une **condition nécessaire, mais pas suffisante** : pour $f(x) = x^3$, $f'(0) = 0$ et pourtant $f$ n'a pas d'extremum en $0$ (schéma).\n\n" +
        "**Condition suffisante** : si $f'$ s'annule en $a$ **en changeant de signe**, alors $f$ admet un extremum local en $a$ ; c'est un maximum si $f'$ passe de « + » à « − », un minimum si elle passe de « − » à « + »."
      ,
      exemple: {
        enonce: "$f(x) = x^4$. Que vaut $f'(0)$ ? La fonction $f$ a-t-elle un extremum en $0$ ?",
        solution: "$f'(x) = 4x^3$, donc $f'(0) = 0$. De plus $f'$ est négative avant $0$ et positive après : $f$ admet un minimum en $0$, égal à $0$."
      }
    },
    {
      titre: "Retour sur le second degré",
      video: { titre: "Vidéo d'Yvan Monka : étudier les variations d'une fonction (niveau 1)", youtube: "https://youtu.be/EXTobPZzORo" },
      texte:
        "Pour $f(x) = ax^2 + bx + c$ : $f'(x) = 2ax + b$, qui s'annule en $x = -\\dfrac{b}{2a}$ en changeant de signe.\n\n" +
        "- Si $a > 0$ : $f'$ est négative puis positive, $f$ décroît puis croît, avec un minimum en $-\\dfrac{b}{2a}$.\n" +
        "- Si $a < 0$ : $f$ croît puis décroît, avec un maximum en $-\\dfrac{b}{2a}$.\n\n" +
        "On retrouve le sommet de la parabole du chapitre 5, sans passer par la forme canonique.",
      exemple: {
        enonce: "Étudie les variations de $f(x) = -2x^2 + 8x - 3$.",
        solution: "$f'(x) = -4x + 8$, positive pour $x < 2$ et négative pour $x > 2$. $f$ croît sur $]-\\infty\\,;2]$ et décroît sur $[2\\,;+\\infty[$ : maximum $f(2) = -8 + 16 - 3 = 5$."
      }
    },
    {
      titre: "Fonctions paires et impaires",
      figure: "parite",
      video: { titre: "Vidéo d'Yvan Monka : étudier la parité d'une fonction", youtube: "https://youtu.be/oheL-ZQYAy4" },
      texte:
        "Soit $f$ définie sur un ensemble $D$ symétrique par rapport à $0$ : si $x \\in D$, alors $-x \\in D$.\n\n" +
        "- $f$ est **paire** si $f(-x) = f(x)$ pour tout $x$ de $D$ : sa courbe est symétrique par rapport à l'**axe des ordonnées**. Exemples : $x^2$, $|x|$, $\\cos$.\n" +
        "- $f$ est **impaire** si $f(-x) = -f(x)$ pour tout $x$ de $D$ : sa courbe est symétrique par rapport à l'**origine**. Exemples : $x^3$, $\\dfrac{1}{x}$, $\\sin$.\n\n" +
        "Utilité : on étudie $f$ sur $[0\\,;+\\infty[$, puis on complète par symétrie. Pour montrer qu'une fonction n'est **ni** paire **ni** impaire, un contre-exemple numérique suffit.",
      exemple: {
        enonce: "$f(x) = x^4 - 2x^2 + 3$ est-elle paire ?",
        solution: "$f(-x) = (-x)^4 - 2(-x)^2 + 3 = x^4 - 2x^2 + 3 = f(x)$ pour tout réel $x$ : $f$ est paire."
      }
    },
    {
      titre: "Inégalité et position de deux courbes",
      figure: "inegalite-cubique",
      video: { titre: "Vidéo d'Yvan Monka : établir une inégalité à l'aide des variations", youtube: "https://youtu.be/ON14GJOYogw" },
      texte:
        "Pour comparer $f(x)$ et $g(x)$, on étudie la **différence** $d(x) = f(x) - g(x)$ : ses variations donnent son minimum (ou son maximum), donc son signe.\n\n" +
        "- Si $d(x) \\geqslant 0$ sur $I$ : $f(x) \\geqslant g(x)$, la courbe de $f$ est au-dessus de celle de $g$.\n" +
        "- Si $d(x) \\leqslant 0$ sur $I$ : elle est en dessous.\n\n" +
        "Sur le schéma : $d(x) = x^3 - (3x - 2) = x^3 - 3x + 2$ et $d'(x) = 3(x - 1)(x + 1)$. Sur $[0\\,;+\\infty[$, $d$ décroît jusqu'à $1$ puis croît : son minimum est $d(1) = 0$, donc $x^3 \\geqslant 3x - 2$ pour tout $x \\geqslant 0$.",
      exemple: {
        enonce: "Montre que, pour tout réel $x$, $x^2 + 1 \\geqslant 2x$.",
        solution: "$d(x) = x^2 - 2x + 1$ et $d'(x) = 2x - 2$ : $d$ est minimale en $1$, avec $d(1) = 0$. Donc $d(x) \\geqslant 0$ pour tout $x$. (On pouvait aussi reconnaître $d(x) = (x - 1)^2$.)"
      }
    },
    {
      titre: "Optimiser : la boîte de volume maximal",
      figure: "boite-patron",
      video: { titre: "Vidéo d'Yvan Monka : résoudre un problème d'optimisation", youtube: "https://youtu.be/V0gLF8iWARs" },
      texte:
        "Dans une plaque carrée de $30$ cm de côté, on découpe aux coins des carrés de côté $x$ (schéma) et on replie : la boîte a pour volume $V(x) = x(30 - 2x)^2$, pour $0 < x < 15$.\n\n" +
        "- $V'(x) = (30 - 2x)^2 + x \\times 2(30 - 2x) \\times (-2) = (30 - 2x)(30 - 6x)$.\n" +
        "- Sur $]0\\,;15[$, $30 - 2x > 0$ : $V'$ a le signe de $30 - 6x$, positif avant $5$, négatif après.\n" +
        "- Le volume est maximal pour $x = 5$ cm : $V(5) = 5 \\times 20^2 = 2\\,000$ cm³, soit $2$ litres.\n\n" +
        "En Seconde, on avait trouvé ce maximum avec un tableau de valeurs ; la dérivée le **démontre**.",
      exemple: {
        enonce: "Même question avec une plaque de $24$ cm de côté.",
        solution: "$V(x) = x(24 - 2x)^2$ et $V'(x) = (24 - 2x)(24 - 6x)$ : volume maximal pour $x = 4$ cm, $V(4) = 4 \\times 16^2 = 1\\,024$ cm³."
      }
    },
    {
      titre: "Le bénéfice d'une distillerie d'ylang-ylang",
      texte:
        "Une distillerie d'ylang-ylang produit $x$ litres d'huile essentielle par mois, avec $0 \\leqslant x \\leqslant 20$. Son bénéfice, en euros, est $B(x) = -2x^3 + 45x^2 - 200$.\n\n" +
        "- $B'(x) = -6x^2 + 90x = -6x(x - 15)$.\n" +
        "- Sur $]0\\,;15[$, $B'(x) > 0$ ; sur $]15\\,;20]$, $B'(x) < 0$.\n" +
        "- Le bénéfice est maximal pour $15$ litres : $B(15) = -6\\,750 + 10\\,125 - 200 = 3\\,175$ €.\n\n" +
        "Au-delà de $15$ litres, le bénéfice baisse : les coûts augmentent plus vite que les recettes.",
      exemple: {
        enonce: "Le bénéfice est-il positif pour $x = 2$ ? Et pour $x = 20$ ?",
        solution: "$B(2) = -16 + 180 - 200 = -36$ € : c'est une perte. $B(20) = -16\\,000 + 18\\,000 - 200 = 1\\,800$ € : c'est un bénéfice, mais plus petit qu'à $15$ litres."
      }
    },
    {
      titre: "Python : la méthode de Newton",
      figure: "newton",
      texte:
        "Pour approcher une solution de $f(x) = 0$, on part d'un nombre $x_0$ et on remplace la courbe par sa tangente : la tangente en $x_0$ coupe l'axe des abscisses en\n\n" +
        "$x_1 = x_0 - \\dfrac{f(x_0)}{f'(x_0)}$.\n\n" +
        "On recommence à partir de $x_1$, et ainsi de suite (schéma).\n\n" +
        "```python\ndef newton(f, fp, x, n):\n    for i in range(n):\n        x = x - f(x) / fp(x)\n    return x\n\ndef f(x):\n    return x**2 - 2\n\ndef fp(x):\n    return 2 * x\n\nprint(newton(f, fp, 2, 4))\n```\n\n" +
        "Avec $x_0 = 2$, on obtient $1{,}5$ puis $1{,}4167$ puis $1{,}41422$… En $4$ étapes, on a $\\sqrt{2}$ avec $11$ décimales exactes. La méthode marche bien quand on part assez près de la solution et que $f'$ ne s'annule pas : ce sont les cas favorables.",
      exemple: {
        enonce: "Pour $f(x) = x^2 - 3$, calcule $x_1$ et $x_2$ à partir de $x_0 = 1$.",
        solution: "$x_1 = 1 - \\dfrac{1 - 3}{2} = 2$, puis $x_2 = 2 - \\dfrac{4 - 3}{4} = 1{,}75$, déjà proche de $\\sqrt{3} \\approx 1{,}732$."
      }
    }
  ],

  videos: [
    { titre: "Étudier les variations d'une fonction rationnelle", type: "Variations", youtube: "https://youtu.be/5NrV-TXme_8" },
    { titre: "Représenter graphiquement une fonction", type: "Courbe", youtube: "https://youtu.be/gPhyoY-d_VU" },
    { titre: "Déterminer le signe d'une fonction à l'aide de ses variations", type: "Signe", youtube: "https://youtu.be/nLoOEQ9mLW0" },
    { titre: "Étudier la parité d'une fonction (2)", type: "Parité", youtube: "https://youtu.be/pG0JNDLgEDY" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "vr-lecture-derivee", titre: "Lire la courbe de f′", etape: "Variations", nb: 4 },
    { type: "vr-tableau", titre: "Tableau de variations", etape: "Variations", nb: 6 },
    { type: "vr-second-degre", titre: "Le second degré par la dérivée", etape: "Variations", nb: 4 },
    { type: "vr-logique", titre: "Implication, réciproque, extremum", etape: "Variations", nb: 5 },
    { type: "vr-parite", titre: "Paire ou impaire ?", etape: "Courbes", nb: 5 },
    { type: "vr-inegalite", titre: "Démontrer une inégalité", etape: "Courbes", nb: 4 },
    { type: "vr-optimisation", titre: "Boîte et distillerie : optimiser", etape: "Optimiser", nb: 4 },
    { type: "vr-newton", titre: "Python : méthode de Newton", etape: "Optimiser", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$f'(x) > 0$ pour tout $x$ de $[1\\,;5]$. Sur $[1\\,;5]$, la fonction $f$ est :", choix: ["strictement croissante", "positive", "strictement décroissante", "constante"], bonne: 0, explication: "Le signe de $f'$ donne le sens de variation de $f$, pas le signe de $f$." },
    { question: "$f'(x) = (x - 2)(x + 3)$. Sur quel intervalle $f$ est-elle décroissante ?", choix: ["$[-3\\,;2]$", "$]-\\infty\\,;-3]$", "$[2\\,;+\\infty[$", "$[-2\\,;3]$"], bonne: 0, explication: "Le trinôme $(x - 2)(x + 3)$ est négatif entre ses racines $-3$ et $2$." },
    { question: "$f(x) = x^3 - 12x$. Alors $f'(x) =$", choix: ["$3x^2 - 12$", "$3x^2 - 12x$", "$x^2 - 12$", "$3x - 12$"], bonne: 0, explication: "$(x^3)' = 3x^2$ et $(12x)' = 12$." },
    { question: "Avec $f(x) = x^3 - 12x$, $f$ admet un maximum local en :", choix: ["$-2$", "$2$", "$0$", "$12$"], bonne: 0, explication: "$f'(x) = 3(x - 2)(x + 2)$ passe de « + » à « − » en $-2$." },
    { question: "On sait seulement que $f'(a) = 0$. Alors :", choix: ["on ne peut rien conclure sans le signe de $f'$ autour de $a$", "$f$ admet un extremum en $a$", "$f(a) = 0$", "$f$ est constante"], bonne: 0, explication: "Condition nécessaire mais pas suffisante : voir $x^3$ en $0$." },
    { question: "Pour $f(x) = x^3$, en $0$ :", choix: ["$f'(0) = 0$ mais il n'y a pas d'extremum", "$f$ admet un minimum", "$f$ admet un maximum", "$f$ n'est pas dérivable"], bonne: 0, explication: "$f'(x) = 3x^2 \\geqslant 0$ : $f$ est croissante, la tangente est horizontale en $0$ sans extremum." },
    { question: "La réciproque de « si $f' \\geqslant 0$ sur $I$, alors $f$ est croissante sur $I$ » est :", choix: ["« si $f$ est croissante sur $I$, alors $f' \\geqslant 0$ sur $I$ »", "« si $f' < 0$, alors $f$ est décroissante »", "« si $f$ n'est pas croissante, alors $f' < 0$ »", "« $f' \\geqslant 0$ et $f$ est croissante »"], bonne: 0, explication: "La réciproque échange l'hypothèse et la conclusion." },
    { question: "$f(x) = 3x^2 - 12x + 1$ admet un minimum en :", choix: ["$2$", "$-2$", "$12$", "$1$"], bonne: 0, explication: "$f'(x) = 6x - 12$ s'annule en $2$ en passant de « − » à « + »." },
    { question: "La courbe d'une fonction paire est symétrique par rapport :", choix: ["à l'axe des ordonnées", "à l'origine", "à l'axe des abscisses", "à la droite $y = x$"], bonne: 0, explication: "$f(-x) = f(x)$ : les points d'abscisses $x$ et $-x$ ont la même ordonnée." },
    { question: "$f(x) = x^3 - x$ est :", choix: ["impaire", "paire", "ni paire ni impaire", "à la fois paire et impaire"], bonne: 0, explication: "$f(-x) = -x^3 + x = -f(x)$." },
    { question: "$f(x) = x^2 + 2x$ est :", choix: ["ni paire ni impaire", "paire", "impaire", "à la fois paire et impaire"], bonne: 0, explication: "$f(-1) = -1$ et $f(1) = 3$ : ni égaux, ni opposés." },
    { question: "Pour montrer que $f(x) \\geqslant g(x)$ sur $I$, on peut :", choix: ["étudier les variations de $f - g$ et montrer que son minimum est positif ou nul", "comparer $f(0)$ et $g(0)$", "vérifier l'inégalité pour trois valeurs", "comparer $f'$ et $g'$ en un point"], bonne: 0, explication: "Quelques valeurs ne prouvent rien ; le minimum de la différence, si." },
    { question: "$d(x) = f(x) - g(x)$ a pour minimum $3$ sur $\\mathbb{R}$. Alors :", choix: ["la courbe de $f$ est au-dessus de celle de $g$", "les deux courbes se coupent", "la courbe de $f$ est en dessous de celle de $g$", "on ne peut pas savoir"], bonne: 0, explication: "$d(x) \\geqslant 3 > 0$ pour tout $x$, donc $f(x) > g(x)$." },
    { question: "Pour la boîte $V(x) = x(30 - 2x)^2$, le volume est maximal pour $x =$", choix: ["$5$", "$15$", "$10$", "$7{,}5$"], bonne: 0, explication: "$V'(x) = (30 - 2x)(30 - 6x)$ s'annule en $5$ en passant de « + » à « − »." },
    { question: "$B'(x) = -6x(x - 15)$ sur $[0\\,;20]$. Le bénéfice est maximal pour :", choix: ["$x = 15$", "$x = 0$", "$x = 20$", "$x = -6$"], bonne: 0, explication: "$B'$ est positive sur $]0\\,;15[$ et négative sur $]15\\,;20]$." },
    { question: "Dans la méthode de Newton, $x_1 = x_0 - \\dfrac{f(x_0)}{f'(x_0)}$ est :", choix: ["l'abscisse où la tangente en $x_0$ coupe l'axe des abscisses", "la valeur de $f$ en $x_0$", "la pente de la tangente en $x_0$", "l'ordonnée à l'origine de la tangente"], bonne: 0, explication: "On résout $f'(x_0)(x - x_0) + f(x_0) = 0$." },
    { question: "Avec $f(x) = x^2 - 2$ et $x_0 = 2$, on obtient $x_1 =$", choix: ["$1{,}5$", "$2{,}5$", "$1$", "$\\sqrt{2}$"], bonne: 0, explication: "$x_1 = 2 - \\dfrac{2}{4} = 1{,}5$." },
    { question: "Si $f'(x) = 0$ pour tout $x$ de $]0\\,;4[$, alors sur cet intervalle :", choix: ["$f$ est constante", "$f$ est nulle", "$f$ est croissante", "$f$ n'est pas dérivable"], bonne: 0, explication: "Une dérivée nulle sur un intervalle caractérise les fonctions constantes (pas forcément nulles)." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Étudier les variations d'une fonction",
      etapes: ["Calculer $f'(x)$.", "Étudier le signe de $f'(x)$ : factoriser, utiliser le signe d'un trinôme ou d'une fonction affine.", "Dresser le tableau : flèche montante si $f' > 0$, descendante si $f' < 0$.", "Calculer les valeurs de $f$ aux points où $f'$ s'annule."],
      exemple: "$f(x) = x^3 - 3x$ : $f'(x) = 3(x - 1)(x + 1)$, maximum local $2$ en $-1$ et minimum local $-2$ en $1$."
    },
    {
      titre: "Trouver un extremum",
      etapes: ["Résoudre $f'(x) = 0$.", "Vérifier que $f'$ change de signe en ce point.", "« + » puis « − » : maximum ; « − » puis « + » : minimum. Calculer sa valeur."],
      exemple: "$f'(x) = -4x + 8$ s'annule en $2$ en passant de « + » à « − » : maximum $f(2)$."
    },
    {
      titre: "Étudier la parité",
      etapes: ["Vérifier que l'ensemble de définition est symétrique par rapport à $0$.", "Calculer $f(-x)$ et le comparer à $f(x)$ et à $-f(x)$.", "Pour « ni paire ni impaire », donner un contre-exemple numérique."],
      exemple: "$f(x) = x^3 + 1$ : $f(-1) = 0$ et $f(1) = 2$, donc $f$ n'est ni paire ni impaire."
    },
    {
      titre: "Démontrer une inégalité",
      etapes: ["Écrire $d(x) = f(x) - g(x)$.", "Étudier les variations de $d$ et trouver son minimum.", "Si ce minimum est positif ou nul, $f(x) \\geqslant g(x)$ : la courbe de $f$ est au-dessus de celle de $g$."],
      exemple: "$x^2 + 1 - 2x = (x - 1)^2 \\geqslant 0$, donc $x^2 + 1 \\geqslant 2x$ pour tout réel $x$."
    },
    {
      titre: "Résoudre un problème d'optimisation",
      etapes: ["Choisir la variable $x$ et son intervalle, d'après les contraintes du problème.", "Exprimer la quantité à optimiser en fonction de $x$.", "Étudier les variations et conclure par une phrase dans le contexte."],
      exemple: "Boîte : $V(x) = x(30 - 2x)^2$ sur $]0\\,;15[$, volume maximal $2\\,000$ cm³ pour $x = 5$ cm."
    }
  ],
  erreurs: [
    "Lire les variations sur le signe de $f$ au lieu du signe de $f'$.",
    "Conclure à un extremum dès que $f'(a) = 0$ : il faut que $f'$ change de signe (contre-exemple : $x^3$ en $0$).",
    "Oublier de calculer les valeurs de $f$ dans le tableau de variations.",
    "Confondre le maximum (une valeur de $f$) et l'endroit où il est atteint (une valeur de $x$).",
    "Dire qu'une fonction est paire après avoir seulement vérifié $f(-1) = f(1)$ : il faut $f(-x) = f(x)$ pour **tout** $x$.",
    "Oublier l'intervalle imposé par le problème : longueurs positives, $0 < x < 15$…",
    "Utiliser la méthode de Newton en un point où $f'$ s'annule : on diviserait par $0$."
  ]
};
