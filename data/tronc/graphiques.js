/*
  CHAPITRE : Première tronc commun — Automatismes : fonctions, graphiques et droites
  ---------------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme de mathématiques intégré à l'enseignement scientifique de Première générale (BO n° 14 du 2 avril 2026),
  partie « Automatismes », bloc « Fonctions et représentations » : résoudre graphiquement f(x) = k, f(x) < k ; déterminer
  graphiquement le signe d'une fonction ou son tableau de variations ; tracer une droite donnée par son équation réduite
  ou par un point et son coefficient directeur ; lire l'équation réduite d'une droite ; coefficient directeur à partir des
  coordonnées de deux points.
  video : vidéos de la chaîne et d'Yvan Monka. Générateurs : préfixe qf- dans assets/exercices-tronc.js ; figures "qf-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["tronc-graphiques"] = {
  niveau: "Première tronc commun",
  numero: 3,
  titre: "Automatismes : fonctions, graphiques et droites",
  accroche: "Lire une courbe sans calcul : images, équations, inéquations, signe et variations. Et les droites : tracer, lire leur équation, calculer une pente.",

  playlist: "",
  drive: "",
  pdfs: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Lire une courbe : image et antécédents",
      video: { titre: "Vidéo d'Yvan Monka : lire graphiquement une image ou un antécédent", youtube: "https://youtu.be/8cytzglu8yc" },
      texte:
        "La courbe $C_f$ d'une fonction $f$ est l'ensemble des points de coordonnées $(x\\,;f(x))$.\n\n" +
        "- L'**image** de $a$ se lit sur l'axe **vertical** : on part de $a$ sur l'axe des abscisses, on va jusqu'à la courbe, puis on lit l'ordonnée.\n" +
        "- Les **antécédents** de $k$ se lisent sur l'axe **horizontal** : on trace la droite horizontale $y = k$ et on lit les abscisses des points d'intersection avec la courbe. Il peut y en avoir aucun, un ou plusieurs.",
      exemple: {
        enonce: "Une courbe passe par les points $(-2\\,;3)$, $(0\\,;-1)$ et $(4\\,;3)$. Que vaut $f(0)$ ? Cite deux antécédents de $3$.",
        solution: "$f(0) = -1$ (ordonnée du point d'abscisse $0$). $-2$ et $4$ sont des antécédents de $3$."
      }
    },
    {
      titre: "Résoudre graphiquement $f(x) = k$ et $f(x) < k$",
      figure: "qf-cours-graphique",
      video: { titre: "Vidéo de ton prof : résoudre graphiquement équations et inéquations", youtube: "https://youtu.be/M1WsNoPcego" },
      texte:
        "On trace la droite horizontale $y = k$.\n\n" +
        "- Les solutions de $f(x) = k$ sont les **abscisses** des points d'intersection de $C_f$ avec cette droite.\n" +
        "- Les solutions de $f(x) < k$ sont les abscisses des points où la courbe est **en dessous** de la droite ; pour $f(x) > k$, **au-dessus**.\n" +
        "- Pour $\\leqslant$ ou $\\geqslant$, on garde aussi les points d'intersection : crochets fermés.\n\n" +
        "Sur la figure, $f(x) = 2$ a pour solutions $-1$ et $3$, et $f(x) < 2$ a pour ensemble de solutions $]-1\\,;3[$.",
      exemple: {
        enonce: "Avec la figure, résous $f(x) \\geqslant 2$.",
        solution: "La courbe est au-dessus de la droite $y = 2$ avant $-1$ et après $3$, intersections comprises : $S = ]-\\infty\\,;-1] \\cup [3\\,;+\\infty[$."
      }
    },
    {
      titre: "Signe et variations lus sur un graphique",
      video: { titre: "Vidéo d'Yvan Monka : dresser le tableau de variations d'une fonction", youtube: "https://youtu.be/yGqqoBMq8Fw" },
      texte:
        "**Signe.** $f(x) > 0$ quand la courbe est **au-dessus** de l'axe des abscisses, $f(x) < 0$ quand elle est **en dessous**, $f(x) = 0$ aux points où elle le coupe. On résume dans un **tableau de signes**.\n\n" +
        "**Variations.** $f$ est **croissante** sur un intervalle où la courbe monte (en la lisant de gauche à droite), **décroissante** où elle descend. On résume dans un **tableau de variations** avec des flèches ; on y écrit les valeurs aux extrémités et aux changements de sens (maximum, minimum).\n\n" +
        "Attention : les intervalles s'écrivent avec des **abscisses** (lues sur l'axe horizontal), alors que les extremums sont des **ordonnées**. Et le signe n'a rien à voir avec les variations : une fonction peut être croissante et négative.",
      exemple: {
        enonce: "Une parabole tournée vers le haut a pour sommet $(2\\,;-3)$. Donne ses variations et son minimum.",
        solution: "Décroissante sur $]-\\infty\\,;2]$, croissante sur $[2\\,;+\\infty[$ ; minimum $-3$ atteint en $x = 2$."
      }
    },
    {
      titre: "Droites : équation réduite",
      figure: "qf-cours-droite",
      video: { titre: "Vidéo d'Yvan Monka : représenter une droite dans un repère", youtube: "https://youtu.be/cUdhxkaTqqk" },
      texte:
        "Une droite non verticale a une **équation réduite** $y = mx + p$ :\n\n" +
        "- $p$ est l'**ordonnée à l'origine** : la droite passe par $(0\\,;p)$ ;\n" +
        "- $m$ est le **coefficient directeur** (la pente) : quand $x$ augmente de $1$, $y$ augmente de $m$ (il diminue si $m < 0$ ; la droite est horizontale si $m = 0$).\n\n" +
        "**Tracer** $y = 2x - 1$ : placer $(0\\,;-1)$, puis avancer de $1$ et monter de $2$ pour obtenir $(1\\,;1)$, et joindre.\n\n" +
        "**Tracer par un point et la pente** : depuis $A(1\\,;4)$ avec $m = -3$, on avance de $1$ et on descend de $3$ : $(2\\,;1)$. Pour trouver $p$, on écrit $4 = -3 \\times 1 + p$, donc $p = 7$.",
      exemple: {
        enonce: "Lis l'équation de la droite qui passe par $(0\\,;3)$ et $(2\\,;-1)$.",
        solution: "$p = 3$ ; en avançant de $2$, $y$ baisse de $4$ : $m = \\dfrac{-4}{2} = -2$. Équation : $y = -2x + 3$."
      }
    },
    {
      titre: "Coefficient directeur par deux points",
      video: { titre: "Vidéo d'Yvan Monka : déterminer l'équation réduite d'une droite à partir de deux points", youtube: "https://youtu.be/tfagLy6QRuw" },
      texte:
        "Si une droite passe par $A(x_A\\,;y_A)$ et $B(x_B\\,;y_B)$ (avec $x_A \\neq x_B$), son coefficient directeur est\n\n" +
        "$m = \\dfrac{y_B - y_A}{x_B - x_A}$ : la **variation verticale** divisée par la **variation horizontale**.\n\n" +
        "On garde le même ordre en haut et en bas. Puis on trouve $p$ en écrivant que $A$ est sur la droite : $y_A = m x_A + p$.",
      exemple: {
        enonce: "Équation de la droite passant par $A(2\\,;5)$ et $B(6\\,;-3)$ ?",
        solution: "$m = \\dfrac{-3 - 5}{6 - 2} = -2$ ; $5 = -2 \\times 2 + p$ donne $p = 9$ : $y = -2x + 9$."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "qf-lire", titre: "Image et antécédents sur une courbe", etape: "Courbes", nb: 5 },
    { type: "qf-resoudre", titre: "Résoudre graphiquement", etape: "Courbes", nb: 5 },
    { type: "qf-signe", titre: "Signe lu sur une courbe", etape: "Courbes", nb: 4 },
    { type: "qf-variations", titre: "Variations et extremum", etape: "Courbes", nb: 4 },
    { type: "qf-droite-lire", titre: "Lire l'équation d'une droite", etape: "Droites", nb: 5 },
    { type: "qf-droite-tracer", titre: "Reconnaître la droite d'équation donnée", etape: "Droites", nb: 4 },
    { type: "qf-droite-point", titre: "Droite par un point et sa pente", etape: "Droites", nb: 4 },
    { type: "qf-coef-dir", titre: "Coefficient directeur par deux points", etape: "Droites", nb: 5 },
    { type: "qf-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "L'image d'un nombre par $f$ se lit sur :", choix: ["l'axe des ordonnées", "l'axe des abscisses", "l'origine", "la légende"], bonne: 0, explication: "C'est l'ordonnée du point de la courbe." },
    { question: "Les solutions de $f(x) = 3$ sont :", choix: ["les abscisses des points de $C_f$ d'ordonnée $3$", "les ordonnées des points d'abscisse $3$", "le nombre $f(3)$", "les points où $C_f$ coupe l'axe des abscisses"], bonne: 0, explication: "On trace $y = 3$ et on lit les abscisses." },
    { question: "Pour résoudre $f(x) < 1$, on cherche où la courbe est :", choix: ["en dessous de la droite $y = 1$", "au-dessus de la droite $y = 1$", "à gauche de $x = 1$", "sur l'axe des abscisses"], bonne: 0, explication: "« Plus petit » : en dessous." },
    { question: "Si $C_f$ coupe la droite $y = 2$ en $x = -1$ et $x = 4$ et qu'elle est au-dessus entre les deux, alors $f(x) > 2$ sur :", choix: ["$]-1\\,;4[$", "$[-1\\,;4]$", "$]-\\infty\\,;-1[ \\cup ]4\\,;+\\infty[$", "$\\{-1\\,;4\\}$"], bonne: 0, explication: "Inégalité stricte : bornes exclues." },
    { question: "$f(x) > 0$ signifie que la courbe est :", choix: ["au-dessus de l'axe des abscisses", "croissante", "au-dessus de l'axe des ordonnées", "à droite de l'origine"], bonne: 0, explication: "Les ordonnées sont positives." },
    { question: "Une fonction est décroissante sur un intervalle où sa courbe :", choix: ["descend quand on la lit de gauche à droite", "est en dessous de l'axe", "monte", "coupe l'axe des abscisses"], bonne: 0, explication: "Définition graphique de la décroissance." },
    { question: "Dans un tableau de variations, les intervalles s'écrivent avec :", choix: ["des abscisses", "des ordonnées", "des images", "des pentes"], bonne: 0, explication: "On les lit sur l'axe horizontal." },
    { question: "Une parabole tournée vers le bas a pour sommet $(1\\,;5)$. Son maximum est :", choix: ["$5$", "$1$", "$(1\\,;5)$", "$6$"], bonne: 0, explication: "Le maximum est une valeur de $f$ : l'ordonnée du sommet." },
    { question: "La droite $y = -3x + 2$ a pour ordonnée à l'origine :", choix: ["$2$", "$-3$", "$3$", "$-2$"], bonne: 0, explication: "$p = 2$." },
    { question: "La droite $y = -3x + 2$ :", choix: ["descend", "monte", "est horizontale", "passe par l'origine"], bonne: 0, explication: "$m = -3 < 0$." },
    { question: "La droite passant par $(0\\,;1)$ et $(1\\,;4)$ a pour équation :", choix: ["$y = 3x + 1$", "$y = x + 4$", "$y = 4x + 1$", "$y = 3x + 4$"], bonne: 0, explication: "$p = 1$ et $m = 4 - 1 = 3$." },
    { question: "Le coefficient directeur de la droite passant par $A(1\\,;2)$ et $B(4\\,;11)$ est :", choix: ["$3$", "$\\dfrac{1}{3}$", "$9$", "$-3$"], bonne: 0, explication: "$\\dfrac{11 - 2}{4 - 1} = \\dfrac{9}{3}$." },
    { question: "Le coefficient directeur de la droite passant par $A(-2\\,;5)$ et $B(2\\,;-3)$ est :", choix: ["$-2$", "$2$", "$-\\dfrac{1}{2}$", "$-8$"], bonne: 0, explication: "$\\dfrac{-3 - 5}{2 - (-2)} = \\dfrac{-8}{4}$." },
    { question: "La droite de coefficient directeur $2$ passant par $A(3\\,;4)$ a pour ordonnée à l'origine :", choix: ["$-2$", "$4$", "$10$", "$2$"], bonne: 0, explication: "$4 = 2 \\times 3 + p$, donc $p = -2$." },
    { question: "Pour tracer $y = 0{,}5x - 1$, un point de la droite est :", choix: ["$(2\\,;0)$", "$(0\\,;0{,}5)$", "$(1\\,;0)$", "$(-1\\,;0)$"], bonne: 0, explication: "$0{,}5 \\times 2 - 1 = 0$." },
    { question: "La droite $y = 4$ est :", choix: ["horizontale", "verticale", "de coefficient directeur $4$", "passant par l'origine"], bonne: 0, explication: "$m = 0$ : tous ses points ont pour ordonnée $4$." },
    { question: "Deux droites de même coefficient directeur sont :", choix: ["parallèles", "perpendiculaires", "sécantes en l'origine", "confondues dans tous les cas"], bonne: 0, explication: "Même pente : même direction." },
    { question: "Une courbe coupe l'axe des abscisses en $-2$ et $3$ et est au-dessus entre les deux. $f(x) \\leqslant 0$ sur :", choix: ["$]-\\infty\\,;-2] \\cup [3\\,;+\\infty[$", "$[-2\\,;3]$", "$]-2\\,;3[$", "$\\{-2\\,;3\\}$"], bonne: 0, explication: "En dessous de l'axe à l'extérieur, et nulle en $-2$ et $3$." },
    { question: "Si $f$ est croissante sur $[0\\,;5]$, alors :", choix: ["$f(1) \\leqslant f(4)$", "$f(1) \\geqslant f(4)$", "$f(1) > 0$", "$f(4) < 0$"], bonne: 0, explication: "Croissante : l'ordre est conservé." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Résoudre graphiquement",
      figure: "qf-cours-graphique",
      etapes: [
        "Tracer la droite horizontale $y = k$.",
        "Repérer les points d'intersection avec la courbe et lire leurs abscisses.",
        "Pour une inéquation, repérer où la courbe est au-dessus ($>$) ou en dessous ($<$) de la droite.",
        "Écrire l'ensemble des solutions avec les bons crochets."
      ],
      exemple: "$f(x) \\leqslant 2$ avec intersections en $-1$ et $3$ et courbe en dessous entre : $S = [-1\\,;3]$."
    },
    {
      titre: "Lire signe et variations",
      etapes: [
        "Signe : repérer où la courbe coupe l'axe des abscisses, puis où elle est au-dessus ou en dessous.",
        "Variations : repérer les points où la courbe change de sens (sommets).",
        "Écrire les intervalles avec les abscisses de ces points.",
        "Compléter le tableau avec les valeurs (ordonnées) des extremums."
      ],
      exemple: "Parabole vers le bas de sommet $(2\\,;4)$ coupant l'axe en $0$ et $4$ : croissante puis décroissante, maximum $4$ ; positive sur $[0\\,;4]$."
    },
    {
      titre: "Tracer ou lire une droite",
      figure: "qf-cours-droite",
      etapes: [
        "Placer $(0\\,;p)$ sur l'axe des ordonnées (ou le point donné).",
        "Depuis ce point, avancer de $1$ et monter de $m$ (descendre si $m < 0$).",
        "Pour lire : $p$ là où la droite coupe l'axe vertical, $m$ = variation de $y$ pour $x$ qui augmente de $1$.",
        "Avec deux points : $m = \\dfrac{y_B - y_A}{x_B - x_A}$, puis $p$ avec l'un des points."
      ],
      exemple: "Par $A(1\\,;3)$ et $B(3\\,;7)$ : $m = 2$, $3 = 2 + p$, $p = 1$ : $y = 2x + 1$."
    }
  ],
  erreurs: [
    "Lire une image sur l'axe des abscisses ou un antécédent sur l'axe des ordonnées.",
    "Inverser « au-dessus » et « en dessous » pour $f(x) < k$.",
    "Oublier les bornes (crochets fermés) pour $\\leqslant$ et $\\geqslant$.",
    "Écrire les intervalles de variation avec des ordonnées.",
    "Confondre signe (position par rapport à l'axe) et variations (la courbe monte ou descend).",
    "Mettre les abscisses au numérateur du coefficient directeur.",
    "Confondre coefficient directeur et ordonnée à l'origine."
  ]
};
