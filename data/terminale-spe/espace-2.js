/*
  CHAPITRE : Terminale spécialité — Géométrie dans l'espace 2 : orthogonalité et distances
  ---------------------------------------------------------------------------------------
  Chapitre 8 de la progression de Terminale spécialité (V26, période 3, 3 semaines) :
  produit scalaire et orthogonalité dans l'espace, vecteur normal, projeté orthogonal, calculs de distances,
  équations cartésiennes de plans.
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas de vidéo de la chaîne sur ce thème : vidéos d'Yvan Monka (cours 20Esp2 et 20Esp3).
  Figure : "pse-plan" (et le cube "esp-cube" du chapitre 3). Générateurs : pse- dans assets/exercices.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-spe-espace-2"] = {
  niveau: "Terminale spécialité",
  numero: 8,
  titre: "Géométrie dans l'espace 2 : orthogonalité et distances",
  accroche: "Le produit scalaire passe à trois dimensions : vecteurs orthogonaux, vecteur normal à un plan, équation cartésienne $ax + by + cz + d = 0$, projeté orthogonal et distance d'un point à un plan.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur le produit scalaire de l'espace (Yvan Monka)", url: "https://youtu.be/pMQBaCqLPsQ", type: "video" },
    { titre: "Démonstration : équation cartésienne d'un plan (Yvan Monka)", url: "https://youtu.be/GKsHtrImI_o", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Produit scalaire dans l'espace",
      video: { titre: "Vidéo d'Yvan Monka : calculer un produit scalaire dans l'espace", youtube: "https://youtu.be/vp3ICG3rRQk" },
      texte:
        "Deux vecteurs $\\vec{u}$ et $\\vec{v}$ de l'espace sont toujours dans un même plan : leur **produit scalaire** se définit comme en Première, dans ce plan.\n\n" +
        "- $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos(\\vec{u}, \\vec{v})$ ;\n" +
        "- $\\vec{u} \\cdot \\vec{v} = \\dfrac{1}{2}\\left(\\|\\vec{u} + \\vec{v}\\|^2 - \\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2\\right)$ ;\n" +
        "- mêmes règles de calcul (symétrie, bilinéarité, $\\vec{u} \\cdot \\vec{u} = \\|\\vec{u}\\|^2$).\n\n" +
        "**Dans un repère orthonormé**, avec $\\vec{u}(x\\,;y\\,;z)$ et $\\vec{v}(x'\\,;y'\\,;z')$ :\n\n" +
        "$\\vec{u} \\cdot \\vec{v} = xx' + yy' + zz'$, $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2 + z^2}$, et la distance $AB$ est la norme de $\\overrightarrow{AB}$.",
      exemple: {
        enonce: "Dans un repère orthonormé, $A(1\\,;0\\,;2)$, $B(3\\,;1\\,;0)$ et $C(2\\,;-2\\,;4)$. Calcule $\\overrightarrow{AB} \\cdot \\overrightarrow{AC}$ et $AB$.",
        solution: "$\\overrightarrow{AB}(2\\,;1\\,;-2)$ et $\\overrightarrow{AC}(1\\,;-2\\,;2)$.\n\n$\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 2 - 2 - 4 = -4$ et $AB = \\sqrt{4 + 1 + 4} = 3$."
      }
    },
    {
      titre: "Orthogonalité",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que deux droites sont orthogonales", youtube: "https://youtu.be/qKWghhaQJUs" },
      texte:
        "- Deux vecteurs sont **orthogonaux** si et seulement si leur produit scalaire est nul.\n" +
        "- Deux droites sont **orthogonales** si leurs vecteurs directeurs sont orthogonaux. Dans l'espace, deux droites orthogonales ne se coupent pas forcément (contrairement à « perpendiculaires », qui exige un point commun).\n" +
        "- Une droite est **orthogonale à un plan** si elle est orthogonale à **deux droites sécantes** de ce plan ; elle est alors orthogonale à toutes les droites du plan.\n\n" +
        "Dans le cube $ABCDEFGH$, $(AE)$ est orthogonale au plan $(ABC)$ ; et $(AE)$ est orthogonale à $(BC)$, sans la couper.",
      exemple: {
        enonce: "Dans le cube $ABCDEFGH$ d'arête $1$, montre que $(AG)$ est orthogonale à $(BD)$.",
        solution: "Dans le repère $(A\\,;\\overrightarrow{AB},\\overrightarrow{AD},\\overrightarrow{AE})$, orthonormé : $\\overrightarrow{AG}(1\\,;1\\,;1)$ et $\\overrightarrow{BD}(-1\\,;1\\,;0)$.\n\n$\\overrightarrow{AG} \\cdot \\overrightarrow{BD} = -1 + 1 + 0 = 0$ : les droites sont orthogonales."
      }
    },
    {
      titre: "Vecteur normal à un plan",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un vecteur normal à un plan", youtube: "https://youtu.be/IDBEI6thBPU" },
      texte:
        "Un **vecteur normal** à un plan $\\mathcal{P}$ est un vecteur non nul dont la direction est orthogonale au plan.\n\n" +
        "- $\\vec{n}$ est normal à $\\mathcal{P}$ si et seulement s'il est orthogonal à **deux vecteurs non colinéaires** de $\\mathcal{P}$.\n" +
        "- Pour **trouver** un vecteur normal au plan $(ABC)$, on cherche $\\vec{n}(a\\,;b\\,;c)$ avec $\\vec{n} \\cdot \\overrightarrow{AB} = 0$ et $\\vec{n} \\cdot \\overrightarrow{AC} = 0$ : deux équations, trois inconnues, on fixe une coordonnée.\n" +
        "- Deux plans sont **parallèles** si leurs vecteurs normaux sont colinéaires, **perpendiculaires** si leurs vecteurs normaux sont orthogonaux.\n" +
        "- Une droite est **orthogonale** au plan si son vecteur directeur est colinéaire à $\\vec{n}$ ; elle est **parallèle** au plan si son vecteur directeur est orthogonal à $\\vec{n}$.",
      exemple: {
        enonce: "Trouve un vecteur normal au plan dirigé par $\\vec{u}(1\\,;0\\,;2)$ et $\\vec{v}(0\\,;1\\,;-1)$.",
        solution: "On cherche $\\vec{n}(a\\,;b\\,;c)$ : $a + 2c = 0$ et $b - c = 0$.\n\nAvec $c = 1$ : $a = -2$ et $b = 1$. Donc $\\vec{n}(-2\\,;1\\,;1)$ (vérification : $-2 + 0 + 2 = 0$ et $0 + 1 - 1 = 0$)."
      }
    },
    {
      titre: "Équation cartésienne d'un plan",
      figure: "pse-plan",
      video: { titre: "Vidéo d'Yvan Monka : déterminer une équation cartésienne d'un plan", youtube: "https://youtu.be/s4xqI6IPQBY" },
      texte:
        "Dans un repère orthonormé :\n\n" +
        "- un plan de vecteur normal $\\vec{n}(a\\,;b\\,;c)$ a une équation de la forme $ax + by + cz + d = 0$ (démonstration au programme : $M \\in \\mathcal{P} \\iff \\overrightarrow{AM} \\cdot \\vec{n} = 0$) ;\n" +
        "- réciproquement, l'ensemble des points vérifiant $ax + by + cz + d = 0$ (avec $a$, $b$, $c$ non tous nuls) est un plan de vecteur normal $\\vec{n}(a\\,;b\\,;c)$.\n\n" +
        "**Méthode** : on écrit $ax + by + cz + d = 0$ avec les coordonnées de $\\vec{n}$, puis on trouve $d$ en remplaçant par les coordonnées d'un point du plan.\n\n" +
        "Un point appartient au plan si et seulement si ses coordonnées vérifient l'équation.",
      exemple: {
        enonce: "Donne une équation du plan passant par $A(1\\,;-2\\,;3)$, de vecteur normal $\\vec{n}(2\\,;1\\,;-1)$.",
        solution: "L'équation est de la forme $2x + y - z + d = 0$.\n\n$A$ est dans le plan : $2 - 2 - 3 + d = 0$, donc $d = 3$. Le plan a pour équation $2x + y - z + 3 = 0$."
      }
    },
    {
      titre: "Intersection d'une droite et d'un plan",
      video: { titre: "Vidéo d'Yvan Monka : déterminer l'intersection d'une droite et d'un plan", youtube: "https://youtu.be/BYBMauyizhE" },
      texte:
        "Pour trouver le point d'intersection d'une droite (représentation paramétrique) et d'un plan (équation cartésienne) :\n\n" +
        "- on remplace $x$, $y$, $z$ par leurs expressions en $t$ dans l'équation du plan ;\n" +
        "- on résout l'équation obtenue, du premier degré en $t$ ;\n" +
        "- on remplace la valeur de $t$ dans la représentation paramétrique.\n\n" +
        "Si l'équation n'a pas de solution, la droite est strictement parallèle au plan ; si elle est vraie pour tout $t$, la droite est contenue dans le plan.",
      exemple: {
        enonce: "Trouve l'intersection de $\\Delta : x = 1 + t$, $y = 2t$, $z = -1 + t$ ($t \\in \\mathbb{R}$) et de $\\mathcal{P} : x + y - z - 8 = 0$.",
        solution: "$(1 + t) + 2t - (-1 + t) - 8 = 0$, soit $2t - 6 = 0$ et $t = 3$.\n\nLe point d'intersection est $(4\\,;6\\,;2)$ (vérification : $4 + 6 - 2 - 8 = 0$)."
      }
    },
    {
      titre: "Projeté orthogonal et distances",
      video: { titre: "Vidéo d'Yvan Monka : déterminer la distance d'un point à un plan (projection orthogonale)", youtube: "https://youtu.be/1b9FtX4sCmQ" },
      texte:
        "Le **projeté orthogonal** du point $M$ sur le plan $\\mathcal{P}$ est le point $H$ de $\\mathcal{P}$ tel que $(MH)$ soit orthogonale à $\\mathcal{P}$ (ou $H = M$ si $M \\in \\mathcal{P}$).\n\n" +
        "- $H$ est le point de $\\mathcal{P}$ **le plus proche** de $M$ (démonstration au programme, avec Pythagore) : la **distance de $M$ au plan** est $MH$.\n" +
        "- Pour calculer $H$ : on écrit la droite passant par $M$ de vecteur directeur $\\vec{n}$, puis on cherche son intersection avec $\\mathcal{P}$.\n\n" +
        "On définit de même le projeté orthogonal d'un point sur une droite : on cherche le point $H$ de la droite tel que $\\overrightarrow{MH}$ soit orthogonal au vecteur directeur.",
      exemple: {
        enonce: "$\\mathcal{P} : x + 2y + 2z - 1 = 0$ et $M(3\\,;4\\,;4)$. Trouve le projeté orthogonal $H$ de $M$ sur $\\mathcal{P}$ et la distance de $M$ au plan.",
        solution: "La droite $(MH)$, de vecteur directeur $\\vec{n}(1\\,;2\\,;2)$ : $x = 3 + t$, $y = 4 + 2t$, $z = 4 + 2t$.\n\nDans l'équation : $(3 + t) + 2(4 + 2t) + 2(4 + 2t) - 1 = 0$, soit $9t + 18 = 0$ et $t = -2$. Donc $H(1\\,;0\\,;0)$ et $MH = \\sqrt{4 + 16 + 16} = 6$."
      }
    },
    {
      titre: "Algorithmique : calculs dans l'espace",
      texte:
        "Avec des listes de trois nombres, on programme les calculs du chapitre :\n\n" +
        "```python\nfrom math import sqrt\n\ndef scal(u, v):\n    return u[0]*v[0] + u[1]*v[1] + u[2]*v[2]\n\ndef norme(u):\n    return sqrt(scal(u, u))\n\ndef dans_plan(a, b, c, d, M):\n    return a*M[0] + b*M[1] + c*M[2] + d == 0\n```\n\n" +
        "- $\\texttt{scal(u, v) == 0}$ teste l'orthogonalité.\n" +
        "- $\\texttt{norme(u)}$ utilise $\\vec{u} \\cdot \\vec{u} = \\|\\vec{u}\\|^2$.\n" +
        "- Attention : avec des nombres décimaux, un test d'égalité exacte peut échouer à cause des arrondis.",
      exemple: {
        enonce: "Que renvoient $\\texttt{scal([2, -1, 3], [1, 5, 1])}$ et $\\texttt{norme([2, 3, 6])}$ ?",
        solution: "$2 - 5 + 3 = 0$ : les vecteurs sont orthogonaux, la fonction renvoie $\\texttt{0}$.\n\n$\\sqrt{4 + 9 + 36} = \\sqrt{49} = 7$ : la fonction renvoie $\\texttt{7.0}$."
      }
    }
  ],

  videos: [
    { titre: "Démontrer que deux vecteurs sont orthogonaux", type: "Orthogonalité", youtube: "https://youtu.be/N1IA15sKH-E" },
    { titre: "Démontrer qu'un vecteur est normal à un plan", type: "Vecteur normal", youtube: "https://youtu.be/aAnz_cP72Q4" },
    { titre: "Projeté orthogonal d'un point sur une droite", type: "Projeté", youtube: "https://youtu.be/RoacrySlUAU" },
    { titre: "Démontrer que deux plans sont perpendiculaires", type: "Plans", youtube: "https://youtu.be/okvo1SUtHUc" },
    { titre: "Prépare ton bac : produit scalaire, droite, plan, algorithme", type: "Bac", youtube: "https://youtu.be/dQd3SbhoPF4" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "pse-scalaire", titre: "Produit scalaire, distances, angles", etape: "Produit scalaire", nb: 5 },
    { type: "pse-orthogonaux", titre: "Vecteurs orthogonaux", etape: "Produit scalaire", nb: 4 },
    { type: "pse-cube", titre: "Produit scalaire dans un cube", etape: "Produit scalaire", nb: 4 },
    { type: "pse-normal", titre: "Vecteur normal", etape: "Plans", nb: 5 },
    { type: "pse-equation", titre: "Équation cartésienne d'un plan", etape: "Plans", nb: 5 },
    { type: "pse-positions", titre: "Positions relatives avec les vecteurs normaux", etape: "Plans", nb: 5 },
    { type: "pse-intersection", titre: "Intersection d'une droite et d'un plan", etape: "Intersections et distances", nb: 4 },
    { type: "pse-projete", titre: "Projeté orthogonal et distance", etape: "Intersections et distances", nb: 4 },
    { type: "pse-python", titre: "L'espace en Python", etape: "Algorithmique", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Dans un repère orthonormé, $\\vec{u}(1\\,;-2\\,;3)$ et $\\vec{v}(4\\,;1\\,;-1)$. Alors $\\vec{u} \\cdot \\vec{v}$ vaut :", choix: ["$-1$", "$5$", "$9$", "$0$"], bonne: 0, explication: "$4 - 2 - 3 = -1$." },
    { question: "Dans un repère orthonormé, la norme de $\\vec{u}(2\\,;-6\\,;3)$ vaut :", choix: ["$7$", "$49$", "$-1$", "$11$"], bonne: 0, explication: "$\\sqrt{4 + 36 + 9} = \\sqrt{49} = 7$." },
    { question: "$\\vec{u}(3\\,;m\\,;-1)$ et $\\vec{v}(2\\,;1\\,;4)$ sont orthogonaux pour :", choix: ["$m = -2$", "$m = 2$", "$m = 10$", "$m = 0$"], bonne: 0, explication: "$6 + m - 4 = 0$ donne $m = -2$." },
    { question: "Dans l'espace, deux droites orthogonales :", choix: ["ne sont pas forcément sécantes", "sont toujours sécantes", "sont parallèles", "sont dans un même plan"], bonne: 0, explication: "Dans un cube, $(AE)$ et $(BC)$ sont orthogonales mais ne se coupent pas." },
    { question: "Une droite est orthogonale à un plan si elle est orthogonale à :", choix: ["deux droites sécantes du plan", "une droite du plan", "deux droites parallèles du plan", "aucune droite du plan"], bonne: 0, explication: "Il faut deux directions différentes du plan." },
    { question: "Un vecteur normal au plan d'équation $3x - y + 2z - 5 = 0$ est :", choix: ["$(3\\,;-1\\,;2)$", "$(3\\,;-1\\,;-5)$", "$(-1\\,;2\\,;-5)$", "$(3\\,;1\\,;2)$"], bonne: 0, explication: "On lit les coefficients de $x$, $y$ et $z$." },
    { question: "Le plan de vecteur normal $\\vec{n}(1\\,;2\\,;-1)$ passant par $A(0\\,;1\\,;1)$ a pour équation :", choix: ["$x + 2y - z - 1 = 0$", "$x + 2y - z + 1 = 0$", "$y + z - 1 = 0$", "$x + 2y - z = 0$"], bonne: 0, explication: "$x + 2y - z + d = 0$ avec $0 + 2 - 1 + d = 0$, donc $d = -1$." },
    { question: "Le point $M(1\\,;1\\,;1)$ appartient-il au plan $2x - y + z - 2 = 0$ ?", choix: ["Oui, car $2 - 1 + 1 - 2 = 0$", "Non, car $2 - 1 + 1 - 2 = 2$", "Non, car $M$ n'a pas de coordonnée nulle", "On ne peut pas savoir"], bonne: 0, explication: "Les coordonnées de $M$ vérifient l'équation." },
    { question: "Les plans $x + y - z = 1$ et $2x + 2y - 2z = 5$ sont :", choix: ["strictement parallèles", "confondus", "perpendiculaires", "sécants non perpendiculaires"], bonne: 0, explication: "Vecteurs normaux colinéaires ($\\times 2$), mais $5 \\neq 2 \\times 1$ : pas le même plan." },
    { question: "Les plans $x + y + z = 0$ et $x - y = 3$ sont :", choix: ["perpendiculaires", "parallèles", "confondus", "sécants non perpendiculaires"], bonne: 0, explication: "$\\vec{n_1}(1\\,;1\\,;1)$ et $\\vec{n_2}(1\\,;-1\\,;0)$ : $1 - 1 + 0 = 0$." },
    { question: "La droite de vecteur directeur $\\vec{u}(2\\,;-4\\,;6)$ et le plan $x - 2y + 3z = 0$ sont :", choix: ["orthogonaux", "parallèles", "sécants non orthogonaux", "confondus"], bonne: 0, explication: "$\\vec{u} = 2\\vec{n}$ avec $\\vec{n}(1\\,;-2\\,;3)$." },
    { question: "La droite de vecteur directeur $\\vec{u}(1\\,;1\\,;0)$ et le plan $x - y + 4z = 2$ sont :", choix: ["parallèles (la droite peut être contenue dans le plan)", "orthogonaux", "sécants", "perpendiculaires"], bonne: 0, explication: "$\\vec{u} \\cdot \\vec{n} = 1 - 1 + 0 = 0$ : la direction de la droite est dans le plan." },
    { question: "Pour trouver l'intersection de $\\Delta$ (représentation paramétrique) et $\\mathcal{P}$ (équation cartésienne), on :", choix: ["remplace $x$, $y$, $z$ en fonction de $t$ dans l'équation du plan", "pose $t = 0$", "calcule un produit scalaire", "résout un système à trois inconnues $x$, $y$, $z$ sans utiliser $t$"], bonne: 0, explication: "On obtient une équation du premier degré en $t$." },
    { question: "Le projeté orthogonal $H$ de $M$ sur $\\mathcal{P}$ est :", choix: ["le point de $\\mathcal{P}$ le plus proche de $M$", "le milieu de $M$ et de l'origine", "le point d'intersection de $\\mathcal{P}$ avec l'axe des abscisses", "un point quelconque de $\\mathcal{P}$"], bonne: 0, explication: "Par Pythagore, tout autre point $K$ du plan vérifie $MK^2 = MH^2 + HK^2 > MH^2$." },
    { question: "Pour calculer le projeté orthogonal de $M$ sur $\\mathcal{P}$, on utilise la droite passant par $M$ et de vecteur directeur :", choix: ["un vecteur normal à $\\mathcal{P}$", "un vecteur du plan $\\mathcal{P}$", "$\\overrightarrow{OM}$", "$(1\\,;1\\,;1)$"], bonne: 0, explication: "La droite $(MH)$ est orthogonale au plan." },
    { question: "$M(1\\,;2\\,;2)$ et $H(0\\,;0\\,;0)$ est son projeté sur un plan. La distance de $M$ au plan vaut :", choix: ["$3$", "$9$", "$5$", "$\\sqrt{5}$"], bonne: 0, explication: "$MH = \\sqrt{1 + 4 + 4} = 3$." },
    { question: "Dans le cube $ABCDEFGH$ d'arête $1$, $\\overrightarrow{AB} \\cdot \\overrightarrow{AG}$ vaut :", choix: ["$1$", "$0$", "$\\sqrt{3}$", "$3$"], bonne: 0, explication: "$\\overrightarrow{AB}(1\\,;0\\,;0)$ et $\\overrightarrow{AG}(1\\,;1\\,;1)$." },
    { question: "Dans le cube $ABCDEFGH$ d'arête $1$, la longueur de la grande diagonale $AG$ vaut :", choix: ["$\\sqrt{3}$", "$\\sqrt{2}$", "$3$", "$1$"], bonne: 0, explication: "$\\sqrt{1 + 1 + 1} = \\sqrt{3}$." },
    { question: "Dans un repère orthonormé, l'ensemble des points $M(x\\,;y\\,;z)$ tels que $z = 2$ est :", choix: ["un plan parallèle au plan $(xOy)$", "une droite", "un point", "l'axe des cotes"], bonne: 0, explication: "C'est le plan d'équation $z - 2 = 0$, de vecteur normal $(0\\,;0\\,;1)$." },
    { question: "$\\vec{u} \\cdot \\vec{v} = 6$, $\\|\\vec{u}\\| = 3$ et $\\|\\vec{v}\\| = 4$. Alors $\\cos(\\vec{u}, \\vec{v})$ vaut :", choix: ["$\\dfrac{1}{2}$", "$2$", "$\\dfrac{1}{3}$", "$\\dfrac{3}{4}$"], bonne: 0, explication: "$\\cos = \\dfrac{6}{3 \\times 4} = \\dfrac{1}{2}$ : l'angle mesure $60°$." },
    { question: "Pour trouver un vecteur normal au plan $(ABC)$, on résout :", choix: ["$\\vec{n} \\cdot \\overrightarrow{AB} = 0$ et $\\vec{n} \\cdot \\overrightarrow{AC} = 0$", "$\\vec{n} = \\overrightarrow{AB} + \\overrightarrow{AC}$", "$\\vec{n} \\cdot \\overrightarrow{AB} = 1$", "$\\vec{n} = \\overrightarrow{BC}$"], bonne: 0, explication: "Un vecteur normal est orthogonal à deux vecteurs non colinéaires du plan." },
    { question: "Que renvoie $\\texttt{scal([1, 2, 3], [3, 0, -1])}$ avec la fonction du cours ?", choix: ["$\\texttt{0}$", "$\\texttt{6}$", "$\\texttt{[3, 0, -3]}$", "$\\texttt{4}$"], bonne: 0, explication: "$3 + 0 - 3 = 0$ : les vecteurs sont orthogonaux." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Démontrer une orthogonalité",
      etapes: [
        "Se placer dans un repère orthonormé (dans un cube : $(A\\,;\\overrightarrow{AB},\\overrightarrow{AD},\\overrightarrow{AE})$ si l'arête vaut $1$).",
        "Calculer les coordonnées des vecteurs utiles.",
        "Calculer le produit scalaire $xx' + yy' + zz'$.",
        "S'il est nul, conclure à l'orthogonalité (vecteurs, droites). Pour un plan, le faire avec deux vecteurs non colinéaires du plan."
      ],
      exemple: "$\\overrightarrow{AG}(1\\,;1\\,;1)$ est orthogonal à $\\overrightarrow{BD}(-1\\,;1\\,;0)$ et à $\\overrightarrow{BE}(-1\\,;0\\,;1)$ : $(AG)$ est orthogonale au plan $(BDE)$."
    },
    {
      titre: "Déterminer une équation cartésienne de plan",
      etapes: [
        "Trouver un vecteur normal $\\vec{n}(a\\,;b\\,;c)$ (donné, ou à chercher avec deux produits scalaires nuls).",
        "Écrire $ax + by + cz + d = 0$.",
        "Remplacer par les coordonnées d'un point du plan pour trouver $d$.",
        "Vérifier avec un autre point connu du plan."
      ],
      exemple: "Plan $(ABC)$ avec $\\vec{n}(1\\,;-1\\,;2)$ et $A(2\\,;0\\,;1)$ : $x - y + 2z + d = 0$, $2 + 2 + d = 0$, d'où $x - y + 2z - 4 = 0$."
    },
    {
      titre: "Calculer la distance d'un point à un plan",
      etapes: [
        "Écrire une représentation paramétrique de la droite passant par $M$, de vecteur directeur $\\vec{n}$.",
        "Remplacer dans l'équation du plan et résoudre en $t$.",
        "Obtenir le projeté $H$ avec cette valeur de $t$.",
        "Calculer $MH$ : c'est la distance cherchée."
      ],
      exemple: "$\\mathcal{P} : z = 0$ et $M(1\\,;5\\,;-3)$ : $H(1\\,;5\\,;0)$ et la distance vaut $3$."
    },
    {
      titre: "Étudier des positions relatives",
      etapes: [
        "Deux plans : comparer les vecteurs normaux (colinéaires : parallèles ; orthogonaux : perpendiculaires).",
        "Droite et plan : comparer $\\vec{u}$ et $\\vec{n}$ (colinéaires : orthogonale ; $\\vec{u} \\cdot \\vec{n} = 0$ : parallèle).",
        "Pour des plans parallèles : tester un point de l'un dans l'équation de l'autre (confondus ou non).",
        "Pour une droite sécante : calculer le point d'intersection."
      ],
      exemple: "$\\vec{u}(1\\,;2\\,;0)$ et $\\vec{n}(2\\,;-1\\,;5)$ : $\\vec{u} \\cdot \\vec{n} = 0$, la droite est parallèle au plan."
    }
  ],
  erreurs: [
    "Utiliser la formule $xx' + yy' + zz'$ dans un repère qui n'est pas orthonormé.",
    "Oublier la troisième coordonnée dans un produit scalaire ou une norme.",
    "Confondre « orthogonales » et « perpendiculaires » pour des droites de l'espace.",
    "Croire qu'une droite orthogonale à une seule droite d'un plan est orthogonale au plan.",
    "Lire le vecteur normal en y mettant le terme constant $d$.",
    "Confondre vecteur normal (orthogonal au plan) et vecteur directeur (dans le plan).",
    "Oublier la racine carrée dans un calcul de distance."
  ]
};
