/*
  CHAPITRE : Terminale spécialité — Fonctions trigonométriques
  -------------------------------------------------------------
  Chapitre 12 de la progression de Terminale spécialité (V26, période 4, 2 semaines) :
  fonctions cosinus et sinus, variations, équations et inéquations sur [−π ; π] (programme 2019),
  aussi sur ]−π ; π] et [0 ; 2π[ dans les exercices ; modélisation de phénomènes périodiques (marées du lagon).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas de vidéo de la chaîne sur ce thème : vidéos d'Yvan Monka (cours 20TrigoT et rappels de Première).
  Figures : "trg-…" (cours, méthode, QCM) et "cos-sin" (cercle du chapitre de Première).
  Générateurs : trg- (et tr-valeurs).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-spe-trigonometrie"] = {
  niveau: "Terminale spécialité",
  numero: 12,
  titre: "Fonctions trigonométriques",
  accroche: "Cosinus et sinus deviennent des fonctions : des vagues qui se répètent tous les $2\\pi$. Parité, périodicité, dérivées, variations, et les équations $\\cos x = a$ ou $\\sin x = a$ lues sur le cercle.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : fonctions trigonométriques (PDF)", url: "https://www.maths-et-tiques.fr/telech/20TrigoT.pdf" }
  ],
  liens: [
    { titre: "Rappels : le cours de trigonométrie de Première (Yvan Monka)", url: "https://youtu.be/wJjb3CSS3cg", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Rappels : cosinus et sinus d'un réel",
      figure: "cos-sin",
      video: { titre: "Vidéo d'Yvan Monka : le cours de trigonométrie de Première", youtube: "https://youtu.be/wJjb3CSS3cg" },
      texte:
        "À tout réel $x$, on associe un point $M$ du **cercle trigonométrique** (on « enroule » la droite des réels autour du cercle, à partir de $I$, dans le sens direct). Le **cosinus** et le **sinus** de $x$ sont l'abscisse et l'ordonnée de $M$.\n\n" +
        "- $-1 \\leqslant \\cos x \\leqslant 1$, $-1 \\leqslant \\sin x \\leqslant 1$, et $\\cos^2 x + \\sin^2 x = 1$.\n" +
        "- Valeurs remarquables : $\\cos\\dfrac{\\pi}{6} = \\dfrac{\\sqrt{3}}{2}$, $\\cos\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$, $\\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$ (et les sinus « en sens inverse »).\n" +
        "- Symétries : $\\cos(-x) = \\cos x$, $\\sin(-x) = -\\sin x$, $\\cos(\\pi - x) = -\\cos x$, $\\sin(\\pi - x) = \\sin x$, $\\cos(x + \\pi) = -\\cos x$, $\\sin(x + \\pi) = -\\sin x$.",
      exemple: {
        enonce: "Calcule $\\cos\\dfrac{2\\pi}{3}$ et $\\sin\\left(-\\dfrac{5\\pi}{6}\\right)$.",
        solution: "$\\dfrac{2\\pi}{3} = \\pi - \\dfrac{\\pi}{3}$, donc $\\cos\\dfrac{2\\pi}{3} = -\\cos\\dfrac{\\pi}{3} = -\\dfrac{1}{2}$.\n\n$\\sin\\left(-\\dfrac{5\\pi}{6}\\right) = -\\sin\\dfrac{5\\pi}{6} = -\\sin\\dfrac{\\pi}{6} = -\\dfrac{1}{2}$."
      }
    },
    {
      titre: "Parité et périodicité",
      figure: "trg-courbes",
      video: { titre: "Vidéo d'Yvan Monka : étudier une fonction trigonométrique (parité)", youtube: "https://youtu.be/uOXv5XnAiNk" },
      texte:
        "Les fonctions **cosinus** et **sinus** sont définies sur $\\mathbb{R}$.\n\n" +
        "- Elles sont **périodiques de période $2\\pi$** : $\\cos(x + 2\\pi) = \\cos x$ et $\\sin(x + 2\\pi) = \\sin x$. Leur courbe se répète tous les $2\\pi$ : il suffit de l'étudier sur un intervalle de longueur $2\\pi$, par exemple $[-\\pi\\,;\\pi]$.\n" +
        "- $\\cos$ est **paire** ($\\cos(-x) = \\cos x$) : sa courbe est symétrique par rapport à l'axe des ordonnées.\n" +
        "- $\\sin$ est **impaire** ($\\sin(-x) = -\\sin x$) : sa courbe est symétrique par rapport à l'origine.\n\n" +
        "Grâce à la parité, on peut même réduire l'étude à $[0\\,;\\pi]$ puis compléter par symétrie.\n\n" +
        "Plus généralement, $x \\mapsto \\cos(kx)$ et $x \\mapsto \\sin(kx)$ ($k > 0$) sont périodiques de période $\\dfrac{2\\pi}{k}$.",
      exemple: {
        enonce: "Étudie la parité de $f(x) = x\\sin x$ et donne la période de $g(x) = \\cos(3x)$.",
        solution: "$f(-x) = (-x)\\sin(-x) = (-x)(-\\sin x) = x\\sin x = f(x)$ : $f$ est paire.\n\n$g\\left(x + \\dfrac{2\\pi}{3}\\right) = \\cos(3x + 2\\pi) = \\cos(3x)$ : $g$ est périodique de période $\\dfrac{2\\pi}{3}$."
      }
    },
    {
      titre: "Dérivées et variations",
      figure: ["trg-cours-tabcos", "trg-cours-tabsin"],
      video: { titre: "Vidéo d'Yvan Monka : étudier une fonction trigonométrique (variations)", youtube: "https://youtu.be/X6vJog_xQRY" },
      texte:
        "Les fonctions cosinus et sinus sont dérivables sur $\\mathbb{R}$ :\n\n" +
        "- $(\\sin x)' = \\cos x$ et $(\\cos x)' = -\\sin x$ ;\n" +
        "- $(\\sin(ax + b))' = a\\cos(ax + b)$ et $(\\cos(ax + b))' = -a\\sin(ax + b)$.\n\n" +
        "**Variations sur $[0\\,;\\pi]$** : $\\cos$ est décroissante de $1$ à $-1$ ; $\\sin$ est croissante sur $\\left[0\\,;\\dfrac{\\pi}{2}\\right]$ puis décroissante, avec un maximum $1$ en $\\dfrac{\\pi}{2}$.\n\n" +
        "On complète sur $[-\\pi\\,;0]$ par parité (tableaux ci-contre sur $[-\\pi\\,;\\pi]$), puis sur $\\mathbb{R}$ par périodicité.\n\n" +
        "**Primitives** : une primitive de $\\cos$ est $\\sin$, une primitive de $\\sin$ est $-\\cos$.",
      exemple: {
        enonce: "Étudie les variations de $f(x) = x - \\sin x$ sur $\\mathbb{R}$, et déduis-en le signe de $x - \\sin x$ pour $x \\geqslant 0$.",
        solution: "$f'(x) = 1 - \\cos x \\geqslant 0$ (car $\\cos x \\leqslant 1$) : $f$ est croissante sur $\\mathbb{R}$.\n\nComme $f(0) = 0$, pour $x \\geqslant 0$ : $f(x) \\geqslant 0$, c'est-à-dire $\\sin x \\leqslant x$."
      }
    },
    {
      titre: "Une limite à connaître",
      figure: "trg-cours-tangente",
      texte:
        "$\\lim\\limits_{x \\to 0} \\dfrac{\\sin x}{x} = 1$.\n\n" +
        "**Pourquoi ?** C'est un taux d'accroissement : $\\dfrac{\\sin x - \\sin 0}{x - 0}$, qui tend vers le nombre dérivé de $\\sin$ en $0$, soit $\\cos 0 = 1$.\n\n" +
        "De même, $\\lim\\limits_{x \\to 0} \\dfrac{\\cos x - 1}{x} = -\\sin 0 = 0$.\n\n" +
        "Graphiquement, la courbe de $\\sin$ est tangente à la droite $y = x$ en l'origine : pour $x$ petit, $\\sin x \\approx x$ (en radians).",
      exemple: {
        enonce: "Détermine $\\lim\\limits_{x \\to 0} \\dfrac{\\sin(5x)}{x}$.",
        solution: "$\\dfrac{\\sin(5x)}{x} = 5 \\times \\dfrac{\\sin(5x)}{5x}$. Quand $x \\to 0$, $X = 5x \\to 0$ et $\\dfrac{\\sin X}{X} \\to 1$.\n\nLa limite vaut $5$."
      }
    },
    {
      titre: "Équations $\\cos x = a$ et $\\sin x = a$",
      figure: "trg-cours-equation",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation du type cos(x) = a ou sin(x) = a", youtube: "https://youtu.be/p6U55YsS440" },
      texte:
        "On résout sur le cercle trigonométrique, dans un intervalle de longueur $2\\pi$ : le programme demande $[-\\pi\\,;\\pi]$ ; on rencontre aussi $]-\\pi\\,;\\pi]$ et $[0\\,;2\\pi[$.\n\n" +
        "- $\\cos x = a$ : on trace la droite **verticale** d'abscisse $a$. Si $-1 < a < 1$, deux solutions **opposées** : $\\alpha$ et $-\\alpha$.\n" +
        "- $\\sin x = a$ : on trace la droite **horizontale** d'ordonnée $a$ (figure). Si $-1 < a < 1$, deux solutions : $\\alpha$ et $\\pi - \\alpha$.\n" +
        "- Si $a > 1$ ou $a < -1$, pas de solution ; si $a = \\pm 1$, la droite est tangente au cercle : un seul point.\n\n" +
        "Plus généralement, $\\cos x = \\cos a \\iff x = a$ ou $x = -a$ (à $2\\pi$ près) et $\\sin x = \\sin a \\iff x = a$ ou $x = \\pi - a$ (à $2\\pi$ près).\n\n" +
        "Attention aux bornes : $-\\pi$ et $\\pi$ sont associés au même point du cercle. Dans $[-\\pi\\,;\\pi]$, $\\cos x = -1$ a deux solutions, $-\\pi$ et $\\pi$ ; dans $]-\\pi\\,;\\pi]$, une seule.",
      exemple: {
        enonce: "Résous dans $[-\\pi\\,;\\pi]$ l'équation $2\\sin x - 1 = 0$.",
        solution: "$\\sin x = \\dfrac{1}{2}$. On sait que $\\sin\\dfrac{\\pi}{6} = \\dfrac{1}{2}$ ; l'autre solution est $\\pi - \\dfrac{\\pi}{6} = \\dfrac{5\\pi}{6}$.\n\nSolutions : $\\left\\{\\dfrac{\\pi}{6}\\,;\\dfrac{5\\pi}{6}\\right\\}$."
      }
    },
    {
      titre: "Inéquations trigonométriques",
      figure: "trg-cours-inequation",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une inéquation du type cos(x) ≤ a", youtube: "https://youtu.be/raU77Qb_-Iw" },
      texte:
        "**Méthode** :\n\n" +
        "- résoudre d'abord l'équation associée ;\n" +
        "- placer les solutions sur le cercle ;\n" +
        "- colorier l'arc des points qui conviennent : à droite de la droite verticale pour $\\cos x > a$, au-dessus de la droite horizontale pour $\\sin x > a$ ;\n" +
        "- lire cet arc dans l'intervalle demandé, ce qui peut donner une **réunion** d'intervalles.\n\n" +
        "Attention aux crochets : inégalité stricte, crochets ouverts ; inégalité large, crochets fermés. Une borne de l'intervalle d'étude garde son crochet : $-\\pi$ est exclue de $]-\\pi\\,;\\pi]$, $2\\pi$ est exclu de $[0\\,;2\\pi[$.",
      exemple: {
        enonce: "Résous dans $[-\\pi\\,;\\pi]$ l'inéquation $\\cos x \\leqslant \\dfrac{1}{2}$.",
        solution: "$\\cos x = \\dfrac{1}{2}$ pour $x = -\\dfrac{\\pi}{3}$ ou $\\dfrac{\\pi}{3}$. Les points d'abscisse inférieure ou égale à $\\dfrac{1}{2}$ sont à gauche de la droite verticale (arc colorié).\n\nSolutions : $\\left[-\\pi\\,;-\\dfrac{\\pi}{3}\\right] \\cup \\left[\\dfrac{\\pi}{3}\\,;\\pi\\right]$ (dans $]-\\pi\\,;\\pi]$, le premier crochet serait ouvert : $\\left]-\\pi\\,;-\\dfrac{\\pi}{3}\\right]$)."
      }
    },
    {
      titre: "Modéliser un phénomène périodique",
      figure: "trg-cours-maree",
      texte:
        "Les fonctions $t \\mapsto a\\cos(\\omega t) + b$ et $t \\mapsto a\\sin(\\omega t) + b$ ($a > 0$, $\\omega > 0$) modélisent des phénomènes qui se répètent : marées, températures sur une journée, oscillations.\n\n" +
        "- Elles oscillent entre $b - a$ et $b + a$ : $b$ est la valeur moyenne, $a$ l'**amplitude**.\n" +
        "- Leur **période** est $T = \\dfrac{2\\pi}{\\omega}$.\n" +
        "- Pour savoir **quand** une valeur est dépassée, on se ramène à une inéquation $\\cos X > k$ (ou $\\sin X > k$) qu'on lit sur le cercle, puis on revient à $t$.\n\n" +
        "Au lagon de Mayotte, le marnage (écart entre marée haute et marée basse) peut dépasser $3$ m.",
      exemple: {
        enonce: "À Dzaoudzi, la hauteur d'eau (en m) $t$ heures après minuit est $h(t) = 2 + 1{,}5\\cos\\left(\\dfrac{\\pi t}{6}\\right)$. Donne les marées haute et basse, la période, et la durée, entre $0$ h et $12$ h, pendant laquelle $h(t) > 2{,}75$.",
        solution: "$h$ oscille entre $2 - 1{,}5 = 0{,}5$ m (marée basse, à $6$ h) et $3{,}5$ m (marée haute, à $0$ h et $12$ h). Période : $\\dfrac{2\\pi}{\\pi/6} = 12$ heures.\n\n$h(t) > 2{,}75 \\iff \\cos X > \\dfrac{1}{2}$ avec $X = \\dfrac{\\pi t}{6} \\in [0\\,;2\\pi]$, soit $X \\in \\left[0\\,;\\dfrac{\\pi}{3}\\right[ \\cup \\left]\\dfrac{5\\pi}{3}\\,;2\\pi\\right]$, donc $t \\in [0\\,;2[ \\cup ]10\\,;12]$ : $4$ heures en tout."
      }
    },
    {
      titre: "Algorithmique : trigonométrie en Python",
      texte:
        "Le module $\\texttt{math}$ fournit $\\texttt{sin}$, $\\texttt{cos}$ et $\\texttt{pi}$. Les angles sont en **radians**.\n\n" +
        "```python\nfrom math import cos, pi\n\na, b = 0, 1\nfor i in range(20):\n    m = (a + b) / 2\n    if (cos(a) - a) * (cos(m) - m) <= 0:\n        b = m\n    else:\n        a = m\nprint(a, b)\n```\n\n" +
        "Ce programme encadre par dichotomie l'unique solution de $\\cos x = x$ (environ $0{,}739$), qu'on ne sait pas calculer exactement.\n\n" +
        "Attention : $\\texttt{cos(60)}$ calcule le cosinus de $60$ radians, pas de $60$ degrés.",
      exemple: {
        enonce: "Que renvoient $\\texttt{round(sin(pi / 6), 4)}$ et $\\texttt{round(cos(pi), 4)}$ ?",
        solution: "$\\sin\\dfrac{\\pi}{6} = \\dfrac{1}{2}$ : la fonction renvoie $\\texttt{0.5}$.\n\n$\\cos \\pi = -1$ : elle renvoie $\\texttt{-1.0}$."
      }
    }
  ],

  videos: [
    { titre: "Résoudre une équation trigonométrique", type: "Équation", youtube: "https://youtu.be/PcgvyxU5FCc" },
    { titre: "Étudier une fonction trigonométrique : périodicité", type: "Étude", youtube: "https://youtu.be/s3S85RL06ks" },
    { titre: "Étudier une fonction trigonométrique : représentation", type: "Étude", youtube: "https://youtu.be/ol6UtCpFDQM" },
    { titre: "Compléter un graphique par parité et périodicité", type: "Parité", youtube: "https://youtu.be/KbCpqXSvR8M" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "tr-valeurs", titre: "Rappels : valeurs remarquables", etape: "Cosinus et sinus", nb: 5 },
    { type: "trg-symetries", titre: "Symétries, parité, période", etape: "Cosinus et sinus", nb: 5 },
    { type: "trg-derivee", titre: "Dériver", etape: "Étudier", nb: 5 },
    { type: "trg-variations", titre: "Variations", etape: "Étudier", nb: 4 },
    { type: "trg-limites", titre: "Limites", etape: "Étudier", nb: 4 },
    { type: "trg-equation", titre: "Équations", etape: "Résoudre", nb: 5 },
    { type: "trg-inequation", titre: "Inéquations", etape: "Résoudre", nb: 5 },
    { type: "trg-probleme", titre: "Problèmes : marées, températures, enclos", etape: "Modéliser", nb: 4 },
    { type: "trg-python", titre: "Trigonométrie en Python", etape: "Algorithmique", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "La fonction cosinus est :", choix: ["paire et $2\\pi$-périodique", "impaire et $2\\pi$-périodique", "paire et $\\pi$-périodique", "ni paire ni impaire"], bonne: 0, explication: "$\\cos(-x) = \\cos x$ et $\\cos(x + 2\\pi) = \\cos x$." },
    { question: "La fonction sinus est :", choix: ["impaire", "paire", "ni paire ni impaire", "constante"], bonne: 0, explication: "$\\sin(-x) = -\\sin x$ : courbe symétrique par rapport à l'origine." },
    { question: "$\\sin(\\pi - x)$ est égal à :", choix: ["$\\sin x$", "$-\\sin x$", "$\\cos x$", "$-\\cos x$"], bonne: 0, explication: "Les points associés à $x$ et $\\pi - x$ sont symétriques par rapport à l'axe des ordonnées." },
    { question: "$\\cos(x + \\pi)$ est égal à :", choix: ["$-\\cos x$", "$\\cos x$", "$\\sin x$", "$-\\sin x$"], bonne: 0, explication: "Les points sont symétriques par rapport à l'origine." },
    { question: "La période de $x \\mapsto \\sin(2x)$ est :", choix: ["$\\pi$", "$2\\pi$", "$4\\pi$", "$\\dfrac{\\pi}{2}$"], bonne: 0, explication: "$\\dfrac{2\\pi}{2} = \\pi$." },
    { question: "La dérivée de $\\cos x$ est :", choix: ["$-\\sin x$", "$\\sin x$", "$-\\cos x$", "$\\cos x$"], bonne: 0, explication: "À retenir : $(\\cos x)' = -\\sin x$." },
    { question: "La dérivée de $\\sin(3x)$ est :", choix: ["$3\\cos(3x)$", "$\\cos(3x)$", "$-3\\cos(3x)$", "$3\\sin(3x)$"], bonne: 0, explication: "$(\\sin(ax + b))' = a\\cos(ax + b)$." },
    { question: "La dérivée de $x\\cos x$ est :", choix: ["$\\cos x - x\\sin x$", "$-\\sin x$", "$\\cos x + x\\sin x$", "$-x\\sin x$"], bonne: 0, explication: "Produit : $1 \\times \\cos x + x \\times (-\\sin x)$." },
    { question: "Sur $[0\\,;\\pi]$, la fonction cosinus est :", choix: ["décroissante", "croissante", "croissante puis décroissante", "constante"], bonne: 0, explication: "$\\cos' = -\\sin \\leqslant 0$ sur $[0\\,;\\pi]$." },
    { question: "Le maximum de $\\sin$ sur $[0\\,;\\pi]$ est atteint en :", choix: ["$\\dfrac{\\pi}{2}$", "$0$", "$\\pi$", "$\\dfrac{\\pi}{4}$"], bonne: 0, explication: "$\\sin\\dfrac{\\pi}{2} = 1$." },
    { question: "$\\lim\\limits_{x \\to 0} \\dfrac{\\sin x}{x}$ vaut :", choix: ["$1$", "$0$", "$+\\infty$", "elle n'existe pas"], bonne: 0, explication: "C'est le nombre dérivé de $\\sin$ en $0$ : $\\cos 0 = 1$." },
    { question: "$\\lim\\limits_{x \\to +\\infty} \\dfrac{\\cos x}{x}$ vaut :", choix: ["$0$", "$1$", "$+\\infty$", "elle n'existe pas"], bonne: 0, explication: "Gendarmes : $-\\dfrac{1}{x} \\leqslant \\dfrac{\\cos x}{x} \\leqslant \\dfrac{1}{x}$ pour $x > 0$." },
    { question: "Les solutions dans $]-\\pi\\,;\\pi]$ de $\\cos x = \\dfrac{\\sqrt{2}}{2}$ sont :", choix: ["$-\\dfrac{\\pi}{4}$ et $\\dfrac{\\pi}{4}$", "$\\dfrac{\\pi}{4}$ et $\\dfrac{3\\pi}{4}$", "$\\dfrac{\\pi}{4}$ seulement", "$-\\dfrac{3\\pi}{4}$ et $\\dfrac{3\\pi}{4}$"], bonne: 0, explication: "Pour le cosinus, les deux solutions sont opposées." },
    { question: "Les solutions dans $]-\\pi\\,;\\pi]$ de $\\sin x = \\dfrac{\\sqrt{3}}{2}$ sont :", choix: ["$\\dfrac{\\pi}{3}$ et $\\dfrac{2\\pi}{3}$", "$-\\dfrac{\\pi}{3}$ et $\\dfrac{\\pi}{3}$", "$\\dfrac{\\pi}{6}$ et $\\dfrac{5\\pi}{6}$", "$\\dfrac{\\pi}{3}$ seulement"], bonne: 0, explication: "$\\alpha = \\dfrac{\\pi}{3}$ et $\\pi - \\alpha = \\dfrac{2\\pi}{3}$." },
    { question: "L'équation $\\cos x = 2$ a :", choix: ["aucune solution", "une solution", "deux solutions", "une infinité de solutions"], bonne: 0, explication: "$\\cos x$ est toujours entre $-1$ et $1$." },
    { question: "L'équation $\\sin x = 1$ a, dans $]-\\pi\\,;\\pi]$ :", choix: ["une seule solution, $\\dfrac{\\pi}{2}$", "deux solutions", "aucune solution", "la solution $0$"], bonne: 0, explication: "La droite $y = 1$ est tangente au cercle en $J$." },
    { question: "Dans $]-\\pi\\,;\\pi]$, $\\sin x < 0$ équivaut à :", choix: ["$x \\in\\, ]-\\pi\\,;0[$", "$x \\in\\, ]0\\,;\\pi[$", "$x \\in \\left]-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right[$", "$x \\in\\, ]-\\pi\\,;\\pi]$"], bonne: 0, explication: "Les points d'ordonnée négative sont sous l'axe des abscisses." },
    { question: "Dans $]-\\pi\\,;\\pi]$, $\\cos x \\geqslant 0$ équivaut à :", choix: ["$x \\in \\left[-\\dfrac{\\pi}{2}\\,;\\dfrac{\\pi}{2}\\right]$", "$x \\in [0\\,;\\pi]$", "$x \\in \\left[0\\,;\\dfrac{\\pi}{2}\\right]$", "$x \\in\\, ]-\\pi\\,;0]$"], bonne: 0, explication: "Les points d'abscisse positive sont à droite de l'axe des ordonnées." },
    { question: "$\\cos x = \\cos\\dfrac{\\pi}{7}$ équivaut, dans $]-\\pi\\,;\\pi]$, à :", choix: ["$x = \\dfrac{\\pi}{7}$ ou $x = -\\dfrac{\\pi}{7}$", "$x = \\dfrac{\\pi}{7}$ seulement", "$x = \\dfrac{\\pi}{7}$ ou $x = \\dfrac{6\\pi}{7}$", "$x = \\dfrac{\\pi}{7} + \\pi$"], bonne: 0, explication: "Deux points de même abscisse sont symétriques par rapport à l'axe des abscisses." },
    { question: "Une primitive de $\\cos x$ est :", choix: ["$\\sin x$", "$-\\sin x$", "$\\cos x$", "$-\\cos x$"], bonne: 0, explication: "$(\\sin x)' = \\cos x$." },
    { question: "En Python, $\\texttt{cos(pi / 3)}$ renvoie environ :", choix: ["$0{,}5$", "$0{,}866$", "$1{,}047$", "$-0{,}5$"], bonne: 0, explication: "$\\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$, avec un petit écart dû aux arrondis ($\\texttt{0.5000000000000001}$)." },
    { question: "La courbe de $\\sin$ en l'origine est tangente à la droite :", choix: ["$y = x$", "$y = 0$", "$y = 1$", "$x = 0$"], bonne: 0, explication: "$\\sin'(0) = \\cos 0 = 1$ et $\\sin 0 = 0$ : la tangente est $y = x$." },
    { question: "La courbe ci-dessous représente la fonction :", figure: "trg-qcm-courbe", choix: ["$x \\mapsto 2\\sin x$", "$x \\mapsto \\sin(2x)$", "$x \\mapsto 2\\cos x$", "$x \\mapsto \\sin x + 2$"], bonne: 0, explication: "La courbe passe par l'origine (comme celle de $\\sin$), oscille entre $-2$ et $2$ et a pour période $2\\pi$ : c'est celle de $x \\mapsto 2\\sin x$." },
    { question: "Quelle est la période de la fonction représentée ci-dessous ?", figure: "trg-qcm-periode", choix: ["$\\dfrac{2\\pi}{3}$", "$\\dfrac{\\pi}{3}$", "$2\\pi$", "$3\\pi$"], bonne: 0, explication: "La courbe vaut $1$ en $0$, puis de nouveau en $\\dfrac{2\\pi}{3}$ : c'est celle de $\\cos(3x)$, de période $\\dfrac{2\\pi}{3}$." },
    { question: "Dans $[-\\pi\\,;\\pi]$, l'arc colorié sur le cercle représente les solutions de :", figure: "trg-qcm-arc", choix: ["$\\cos x \\geqslant \\dfrac{\\sqrt{3}}{2}$", "$\\sin x \\geqslant \\dfrac{\\sqrt{3}}{2}$", "$\\cos x \\leqslant \\dfrac{\\sqrt{3}}{2}$", "$\\sin x \\leqslant \\dfrac{1}{2}$"], bonne: 0, explication: "L'arc va de $-\\dfrac{\\pi}{6}$ à $\\dfrac{\\pi}{6}$, à droite de la droite verticale d'abscisse $\\dfrac{\\sqrt{3}}{2}$ : ce sont les réels tels que $\\cos x \\geqslant \\dfrac{\\sqrt{3}}{2}$." },
    { question: "Ce tableau de variations sur $[0\\,;\\pi]$ est celui de la fonction :", figure: "trg-qcm-tableau", choix: ["$\\sin$", "$\\cos$", "$-\\cos$", "$-\\sin$"], bonne: 0, explication: "$f(0) = 0$, $f\\left(\\dfrac{\\pi}{2}\\right) = 1$ et $f(\\pi) = 0$, avec $f'$ positive puis négative : c'est $\\sin$, dont la dérivée $\\cos$ change de signe en $\\dfrac{\\pi}{2}$." },
    { question: "Les points $M$ et $N$ du cercle sont associés aux solutions dans $[-\\pi\\,;\\pi]$ de l'équation :", figure: "trg-qcm-points", choix: ["$\\cos x = -\\dfrac{1}{2}$", "$\\sin x = -\\dfrac{1}{2}$", "$\\cos x = \\dfrac{1}{2}$", "$\\sin x = \\dfrac{\\sqrt{3}}{2}$"], bonne: 0, explication: "$M$ et $N$ ont la même abscisse $-\\dfrac{1}{2}$ (symétriques par rapport à l'axe des abscisses) : ils sont associés à $\\dfrac{2\\pi}{3}$ et $-\\dfrac{2\\pi}{3}$, solutions de $\\cos x = -\\dfrac{1}{2}$." },
    { question: "Dans $[-\\pi\\,;\\pi]$, l'équation $\\cos x = -1$ a pour solutions :", choix: ["$-\\pi$ et $\\pi$", "$\\pi$ seulement", "$0$ seulement", "aucune"], bonne: 0, explication: "$-\\pi$ et $\\pi$ appartiennent à $[-\\pi\\,;\\pi]$ et sont associés au même point $(-1\\,;0)$ du cercle. Dans $]-\\pi\\,;\\pi]$, seul $\\pi$ conviendrait." },
    { question: "À Dzaoudzi, la hauteur d'eau (en m) est $h(t) = 2 + 1{,}5\\cos\\left(\\dfrac{\\pi t}{6}\\right)$, $t$ en heures. La marée haute revient toutes les :", choix: ["$12$ heures", "$6$ heures", "$24$ heures", "$2\\pi$ heures"], bonne: 0, explication: "La période est $\\dfrac{2\\pi}{\\pi/6} = 12$ : deux marées hautes par jour." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Étudier une fonction trigonométrique",
      etapes: [
        "Chercher la parité ($f(-x)$) et la période : on réduit l'intervalle d'étude.",
        "Calculer $f'(x)$ avec $(\\sin u)' = u'\\cos u$ et $(\\cos u)' = -u'\\sin u$.",
        "Étudier le signe de $f'$ sur l'intervalle réduit (cercle trigonométrique, valeurs remarquables).",
        "Dresser le tableau de variations, puis compléter la courbe par symétrie et par translation."
      ],
      figure: "trg-meth-cos2x",
      exemple: "$f(x) = \\cos(2x)$ : paire, période $\\pi$ ; étude sur $\\left[0\\,;\\dfrac{\\pi}{2}\\right]$ où $f' = -2\\sin(2x) \\leqslant 0$."
    },
    {
      titre: "Résoudre $\\cos x = a$ ou $\\sin x = a$",
      etapes: [
        "Isoler $\\cos x$ ou $\\sin x$.",
        "Vérifier que $-1 \\leqslant a \\leqslant 1$ (sinon, pas de solution).",
        "Trouver un angle $\\alpha$ remarquable tel que $\\cos\\alpha = a$ (ou $\\sin\\alpha = a$).",
        "Écrire les solutions : $\\pm\\alpha$ pour le cosinus, $\\alpha$ et $\\pi - \\alpha$ pour le sinus, puis les ramener dans l'intervalle demandé (en ajoutant ou en retirant $2\\pi$)."
      ],
      figure: "trg-meth-equation",
      exemple: "$\\sin x = -\\dfrac{\\sqrt{2}}{2}$ : $\\alpha = -\\dfrac{\\pi}{4}$, et $\\pi - \\alpha = \\dfrac{5\\pi}{4}$, ramené à $-\\dfrac{3\\pi}{4}$. Solutions : $-\\dfrac{3\\pi}{4}$ et $-\\dfrac{\\pi}{4}$."
    },
    {
      titre: "Résoudre une inéquation",
      etapes: [
        "Résoudre l'équation associée et placer les solutions sur le cercle.",
        "Tracer la droite verticale (cosinus) ou horizontale (sinus) correspondante.",
        "Repérer l'arc qui convient (à droite, à gauche, au-dessus, au-dessous).",
        "Lire l'arc dans l'intervalle demandé, par exemple $[-\\pi\\,;\\pi]$ : on obtient un intervalle, ou une réunion de deux intervalles."
      ],
      figure: "trg-meth-inequation",
      exemple: "$\\sin x > \\dfrac{1}{2}$ : au-dessus de la droite $y = \\dfrac{1}{2}$, d'où $\\left]\\dfrac{\\pi}{6}\\,;\\dfrac{5\\pi}{6}\\right[$."
    }
  ],
  erreurs: [
    "Oublier que $\\cos' = -\\sin$ (le signe moins).",
    "Oublier le facteur $a$ dans la dérivée de $\\sin(ax + b)$ ou $\\cos(ax + b)$.",
    "Donner une seule solution à $\\cos x = a$ alors qu'il y en a deux en général.",
    "Écrire $-\\alpha$ comme seconde solution de $\\sin x = \\sin\\alpha$ (c'est $\\pi - \\alpha$).",
    "Laisser une solution hors de l'intervalle demandé, ou oublier que $-\\pi$ et $\\pi$ (tous deux dans $[-\\pi\\,;\\pi]$) sont associés au même point du cercle.",
    "Calculer en degrés au lieu de radians (calculatrice ou Python).",
    "Se tromper de crochets dans une inéquation (stricte ou large, borne $-\\pi$ exclue de $]-\\pi\\,;\\pi]$).",
    "Oublier de changer le sens d'une inégalité en divisant par un nombre négatif ($-2\\cos x > 1 \\iff \\cos x < -\\dfrac{1}{2}$)."
  ]
};
