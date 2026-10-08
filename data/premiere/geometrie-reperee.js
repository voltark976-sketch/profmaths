/*
  CHAPITRE : Première spécialité — Géométrie repérée
  ---------------------------------------------------
  Chapitre 15 de la progression spiralée 2026-2027 (programme de Première 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas encore de vidéo de la chaîne ni de PDF pour ce chapitre : les vidéos sont celles d'Yvan Monka.
  Figures : "vecteur-normal", "projete", "cercle-repere", "antenne". Générateurs : gr-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-geometrie-reperee"] = {
  niveau: "Première spécialité",
  numero: 15,
  titre: "Géométrie repérée",
  accroche: "Des équations pour décrire des figures : vecteur normal, projeté orthogonal, équations de cercles et zone couverte par une antenne relais.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur la géométrie repérée en vidéo (Yvan Monka)", url: "https://youtu.be/EehP4SFpo5c", type: "video" },
    { titre: "Rappels de Seconde : équations de droites (Yvan Monka)", url: "https://youtu.be/d-rUnClmcCY", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Vecteur normal à une droite",
      figure: "vecteur-normal",
      video: { titre: "Vidéo d'Yvan Monka : équation cartésienne d'une droite avec un vecteur normal", youtube: "https://youtu.be/oR5QoWCiDIo" },
      texte:
        "Dans un repère orthonormé, un vecteur non nul $\\vec{n}$ est **normal** à une droite $d$ s'il est orthogonal à un vecteur directeur de $d$.\n\n" +
        "**Propriété** : la droite d'équation $ax + by + c = 0$ a pour vecteur directeur $\\vec{u}\\begin{pmatrix} -b \\\\ a \\end{pmatrix}$ et pour vecteur normal $\\vec{n}\\begin{pmatrix} a \\\\ b \\end{pmatrix}$.\n\n" +
        "En effet, $\\vec{u} \\cdot \\vec{n} = -ba + ab = 0$.\n\n" +
        "On lit donc un vecteur normal directement sur les coefficients de $x$ et de $y$.",
      exemple: {
        enonce: "Donne un vecteur normal et un vecteur directeur de la droite $d : x - 2y + 2 = 0$ (schéma).",
        solution: "Vecteur normal $\\vec{n}\\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix}$ et vecteur directeur $\\vec{u}\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$ : on vérifie que $1 \\times 2 + (-2) \\times 1 = 0$."
      }
    },
    {
      titre: "Équation avec un point et un vecteur normal",
      texte:
        "Soit $A$ un point et $\\vec{n}\\begin{pmatrix} a \\\\ b \\end{pmatrix}$ un vecteur non nul. La droite $d$ passant par $A$ et de vecteur normal $\\vec{n}$ est l'**ensemble des points** $M$ tels que\n\n" +
        "$\\overrightarrow{AM} \\cdot \\vec{n} = 0$.\n\n" +
        "C'est une **équivalence** : $M \\in d \\iff a(x - x_A) + b(y - y_A) = 0$. En développant, on obtient une équation $ax + by + c = 0$.\n\n" +
        "On peut aussi écrire directement $ax + by + c = 0$, puis trouver $c$ en remplaçant par les coordonnées de $A$.",
      exemple: {
        enonce: "Détermine une équation de la droite passant par $A(2\\,;-1)$ et de vecteur normal $\\vec{n}\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$.",
        solution: "$3(x - 2) + 4(y + 1) = 0 \\iff 3x + 4y - 2 = 0$. Vérification : $3 \\times 2 + 4 \\times (-1) - 2 = 0$."
      }
    },
    {
      titre: "Projeté orthogonal d'un point sur une droite",
      figure: "projete",
      video: { titre: "Vidéo d'Yvan Monka : déterminer les coordonnées d'un projeté orthogonal", youtube: "https://youtu.be/-HNUbyU72Pc" },
      texte:
        "Le **projeté orthogonal** $H$ du point $A$ sur la droite $d$ est le point de $d$ tel que $(AH)$ soit perpendiculaire à $d$. La distance $AH$ est la **distance du point $A$ à la droite $d$** : c'est la plus courte distance entre $A$ et un point de $d$.\n\n" +
        "**Méthode** : $\\overrightarrow{AH}$ est colinéaire à un vecteur normal $\\vec{n}$ de $d$. On écrit $H(x_A + ka\\,;y_A + kb)$, on exprime que $H \\in d$, et on résout en $k$.\n\n" +
        "Sur le schéma : $d : x + y - 4 = 0$, $\\vec{n}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$ et $A(5\\,;3)$. $H(5 + k\\,;3 + k)$ est sur $d$ si $5 + k + 3 + k - 4 = 0$, soit $k = -2$ : $H(3\\,;1)$.",
      exemple: {
        enonce: "Calcule la distance de $A(5\\,;3)$ à la droite $d : x + y - 4 = 0$.",
        solution: "$AH^2 = (3 - 5)^2 + (1 - 3)^2 = 8$, donc $AH = \\sqrt{8} = 2\\sqrt{2} \\approx 2{,}83$."
      }
    },
    {
      titre: "Équation d'un cercle",
      figure: "cercle-repere",
      video: { titre: "Vidéo d'Yvan Monka : déterminer une équation de cercle (1)", youtube: "https://youtu.be/Nr4Fcr-GhXM" },
      texte:
        "Le cercle $\\mathcal{C}$ de centre $\\Omega(a\\,;b)$ et de rayon $r$ est l'ensemble des points $M$ tels que $\\Omega M = r$, c'est-à-dire $\\Omega M^2 = r^2$.\n\n" +
        "Dans un repère orthonormé :\n\n" +
        "$M(x\\,;y) \\in \\mathcal{C} \\iff (x - a)^2 + (y - b)^2 = r^2$.\n\n" +
        "Attention aux signes : le cercle de centre $(-1\\,;2)$ et de rayon $3$ a pour équation $(x + 1)^2 + (y - 2)^2 = 9$.",
      exemple: {
        enonce: "Le point $M(5\\,;1)$ est-il sur le cercle de centre $\\Omega(2\\,;1)$ et de rayon $3$ (schéma) ?",
        solution: "$(5 - 2)^2 + (1 - 1)^2 = 9 = 3^2$ : oui, $M$ est sur le cercle."
      }
    },
    {
      titre: "Reconnaître le centre et le rayon",
      video: { titre: "Vidéo d'Yvan Monka : déterminer une équation de cercle (2)", youtube: "https://youtu.be/nNidpOAhLE8" },
      texte:
        "Une équation de la forme $x^2 + y^2 + \\alpha x + \\beta y + \\gamma = 0$ se transforme en **complétant les carrés** (chapitre 5) :\n\n" +
        "$x^2 - 4x = (x - 2)^2 - 4$ et $y^2 + 6y = (y + 3)^2 - 9$.\n\n" +
        "On obtient $(x - a)^2 + (y - b)^2 = k$ :\n\n" +
        "- si $k > 0$ : c'est le cercle de centre $(a\\,;b)$ et de rayon $\\sqrt{k}$ ;\n" +
        "- si $k = 0$ : c'est le seul point $(a\\,;b)$ ;\n" +
        "- si $k < 0$ : l'ensemble est **vide**, car une somme de carrés n'est jamais négative.",
      exemple: {
        enonce: "Quel est l'ensemble des points $M(x\\,;y)$ tels que $x^2 + y^2 - 4x + 6y - 3 = 0$ ?",
        solution: "$(x - 2)^2 - 4 + (y + 3)^2 - 9 - 3 = 0 \\iff (x - 2)^2 + (y + 3)^2 = 16$ : le cercle de centre $(2\\,;-3)$ et de rayon $4$."
      }
    },
    {
      titre: "La zone couverte par une antenne relais",
      figure: "antenne",
      texte:
        "Une antenne relais placée en $A(a\\,;b)$, de portée $r$ km, couvre le **disque** de centre $A$ et de rayon $r$ :\n\n" +
        "$M(x\\,;y)$ est couvert $\\iff (x - a)^2 + (y - b)^2 \\leqslant r^2$.\n\n" +
        "Sur le schéma (unité : le km), l'antenne est en $O$ avec une portée de $5$ km :\n\n" +
        "- $V_1(3\\,;2)$ : $9 + 4 = 13 \\leqslant 25$, couvert ;\n" +
        "- $V_2(4\\,;4)$ : $16 + 16 = 32 > 25$, pas couvert ;\n" +
        "- $V_3(-2\\,;-4)$ : $4 + 16 = 20 \\leqslant 25$, couvert ;\n" +
        "- $V_4(-5\\,;1{,}5)$ : $25 + 2{,}25 = 27{,}25 > 25$, pas couvert.",
      exemple: {
        enonce: "Quelle portée minimale faudrait-il pour couvrir aussi $V_2$ ?",
        solution: "$OV_2 = \\sqrt{32} = 4\\sqrt{2} \\approx 5{,}66$ km : il faudrait une portée d'au moins $5{,}66$ km."
      }
    },
    {
      titre: "Python : un point est-il couvert ?",
      texte:
        "La condition d'appartenance à un disque se programme directement :\n\n" +
        "```python\ndef couvert(x, y, a, b, r):\n    return (x - a)**2 + (y - b)**2 <= r**2\n\nprint(couvert(3, 2, 0, 0, 5))\nprint(couvert(4, 4, 0, 0, 5))\n```\n\n" +
        "Le programme affiche True puis False. Pour tester l'appartenance au **cercle** (le bord seulement), on remplacerait « <= » par « == » ; avec des coordonnées décimales, il vaut mieux tester si l'écart est très petit, à cause des arrondis.",
      exemple: {
        enonce: "Que renvoie couvert(-3, 4, 0, 0, 5) ?",
        solution: "$9 + 16 = 25 \\leqslant 25$ : True. Le point est exactement sur le bord du disque."
      }
    },
    {
      titre: "Logique : un ensemble défini par une condition",
      texte:
        "Une équation (ou une inéquation) **caractérise** une figure : un point lui appartient si et seulement si ses coordonnées vérifient la condition.\n\n" +
        "- $M \\in d \\iff ax + by + c = 0$ ;\n" +
        "- $M \\in \\mathcal{C} \\iff (x - a)^2 + (y - b)^2 = r^2$ ;\n" +
        "- $M$ dans le disque $\\iff (x - a)^2 + (y - b)^2 \\leqslant r^2$.\n\n" +
        "Pour décrire un ensemble de points, on transforme la condition par **équivalences** successives jusqu'à reconnaître une figure connue, comme pour $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = 0$ au chapitre 14.",
      exemple: {
        enonce: "Quel est l'ensemble des points $M(x\\,;y)$ tels que $x^2 + y^2 + 2x + 5 = 0$ ?",
        solution: "$(x + 1)^2 - 1 + y^2 + 5 = 0 \\iff (x + 1)^2 + y^2 = -4$ : impossible, l'ensemble est **vide**."
      }
    }
  ],

  videos: [
    { titre: "Déterminer une équation cartésienne d'une droite (rappel de Seconde)", type: "Rappel", youtube: "https://youtu.be/NosYmlLLFB4" },
    { titre: "Tracer une droite à partir de l'équation cartésienne (rappel de Seconde)", type: "Rappel", youtube: "https://youtu.be/EchUv2cGtzo" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "gr-normal", titre: "Vecteur normal et équation", etape: "Droites", nb: 5 },
    { type: "gr-projete", titre: "Projeté orthogonal", etape: "Droites", nb: 5 },
    { type: "gr-cercle", titre: "Équation d'un cercle", etape: "Cercles", nb: 5 },
    { type: "gr-centre-rayon", titre: "Retrouver centre et rayon", etape: "Cercles", nb: 5 },
    { type: "gr-logique", titre: "Ensembles de points", etape: "Cercles", nb: 4 },
    { type: "gr-antenne", titre: "L'antenne relais", etape: "Appliquer", nb: 4 },
    { type: "gr-python", titre: "Python : couvert ou pas ?", etape: "Appliquer", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Un vecteur normal à la droite $3x - 2y + 7 = 0$ est :", choix: ["$\\vec{n}\\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix}$", "$\\vec{n}\\begin{pmatrix} 2 \\\\ 3 \\end{pmatrix}$", "$\\vec{n}\\begin{pmatrix} 3 \\\\ 7 \\end{pmatrix}$", "$\\vec{n}\\begin{pmatrix} -2 \\\\ 7 \\end{pmatrix}$"], bonne: 0, explication: "Les coefficients de $x$ et de $y$." },
    { question: "Un vecteur directeur de la droite $3x - 2y + 7 = 0$ est :", choix: ["$\\vec{u}\\begin{pmatrix} 2 \\\\ 3 \\end{pmatrix}$", "$\\vec{u}\\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix}$", "$\\vec{u}\\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}$", "$\\vec{u}\\begin{pmatrix} -3 \\\\ -2 \\end{pmatrix}$"], bonne: 0, explication: "$\\vec{u}\\begin{pmatrix} -b \\\\ a \\end{pmatrix}$ avec $a = 3$ et $b = -2$." },
    { question: "La droite passant par $A(1\\,;2)$ de vecteur normal $\\vec{n}\\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix}$ a pour équation :", choix: ["$2x - y = 0$", "$2x - y + 3 = 0$", "$x + 2y - 5 = 0$", "$2x + y - 4 = 0$"], bonne: 0, explication: "$2(x - 1) - (y - 2) = 2x - y$." },
    { question: "La distance d'un point $A$ à une droite $d$ est :", choix: ["la longueur $AH$, où $H$ est le projeté orthogonal de $A$ sur $d$", "la distance de $A$ à l'origine", "la longueur d'un vecteur normal", "n'importe quelle distance de $A$ à un point de $d$"], bonne: 0, explication: "C'est la plus courte distance entre $A$ et les points de $d$." },
    { question: "Une équation du cercle de centre $(3\\,;-1)$ et de rayon $2$ est :", choix: ["$(x - 3)^2 + (y + 1)^2 = 4$", "$(x + 3)^2 + (y - 1)^2 = 4$", "$(x - 3)^2 + (y + 1)^2 = 2$", "$(x - 3)^2 + (y - 1)^2 = 4$"], bonne: 0, explication: "$(x - a)^2 + (y - b)^2 = r^2$." },
    { question: "Le cercle d'équation $(x + 2)^2 + y^2 = 25$ a pour centre et rayon :", choix: ["$(-2\\,;0)$ et $5$", "$(2\\,;0)$ et $5$", "$(-2\\,;0)$ et $25$", "$(0\\,;-2)$ et $5$"], bonne: 0, explication: "$x + 2 = x - (-2)$ et $\\sqrt{25} = 5$." },
    { question: "$x^2 - 6x$ est égal à :", choix: ["$(x - 3)^2 - 9$", "$(x - 3)^2 + 9$", "$(x - 6)^2 - 36$", "$(x + 3)^2 - 9$"], bonne: 0, explication: "On complète le carré avec la moitié de $6$." },
    { question: "L'équation $x^2 + y^2 - 2x + 4y + 1 = 0$ est celle du cercle :", choix: ["de centre $(1\\,;-2)$ et de rayon $2$", "de centre $(-1\\,;2)$ et de rayon $2$", "de centre $(1\\,;-2)$ et de rayon $4$", "de centre $(2\\,;-4)$ et de rayon $1$"], bonne: 0, explication: "$(x - 1)^2 - 1 + (y + 2)^2 - 4 + 1 = 0 \\iff (x - 1)^2 + (y + 2)^2 = 4$." },
    { question: "L'ensemble des points tels que $x^2 + y^2 = -1$ est :", choix: ["vide", "le cercle de centre $O$ et de rayon $1$", "le point $O$", "une droite"], bonne: 0, explication: "Une somme de carrés n'est jamais négative." },
    { question: "Le point $M(4\\,;3)$ est-il sur le cercle de centre $O$ et de rayon $5$ ?", choix: ["Oui", "Non"], bonne: 0, explication: "$16 + 9 = 25 = 5^2$." },
    { question: "Une antenne en $O$ a une portée de $3$ km. Le point $(2\\,;2)$ est-il couvert ?", choix: ["Oui, car $8 \\leqslant 9$", "Non, car $4 > 3$", "Non, car $8 > 3$", "Oui, car $2 < 3$"], bonne: 0, explication: "On compare $x^2 + y^2 = 8$ à $r^2 = 9$." },
    { question: "Que renvoie couvert(1, 1, 0, 0, 1) (programme du cours) ?", choix: ["False", "True"], bonne: 0, explication: "$1 + 1 = 2 > 1$ : le point est hors du disque." },
    { question: "Un vecteur normal à la droite d'équation $y = 2x + 1$ est :", choix: ["$\\vec{n}\\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix}$", "$\\vec{n}\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$", "$\\vec{n}\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$", "$\\vec{n}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$"], bonne: 0, explication: "On écrit l'équation sous la forme $2x - y + 1 = 0$ : un vecteur normal a pour coordonnées les coefficients de $x$ et de $y$, soit $\\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix}$. $\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$ est un vecteur directeur." },
    { question: "La droite passant par $A(2\\,;-1)$ et de vecteur normal $\\vec{n}\\begin{pmatrix} 1 \\\\ 3 \\end{pmatrix}$ a pour équation :", choix: ["$x + 3y + 1 = 0$", "$x + 3y - 1 = 0$", "$3x - y - 7 = 0$", "$2x - y + 1 = 0$"], bonne: 0, explication: "L'équation s'écrit $x + 3y + c = 0$. Avec $A$ : $2 + 3 \\times (-1) + c = 0$, donc $c = 1$. La droite $3x - y - 7 = 0$ passe par $A$, mais $\\vec{n}$ y est directeur, pas normal." },
    { question: "Les droites $d : 2x + 3y - 1 = 0$ et $d' : 3x - 2y + 5 = 0$ sont :", choix: ["perpendiculaires", "parallèles", "confondues", "sécantes, mais pas perpendiculaires"], bonne: 0, explication: "Leurs vecteurs normaux $\\begin{pmatrix} 2 \\\\ 3 \\end{pmatrix}$ et $\\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix}$ sont orthogonaux : $2 \\times 3 + 3 \\times (-2) = 0$. Les droites sont donc perpendiculaires." },
    { question: "Le vecteur $\\begin{pmatrix} 4 \\\\ -6 \\end{pmatrix}$ est-il normal à la droite $2x - 3y + 5 = 0$ ?", choix: ["Oui : il est colinéaire à $\\begin{pmatrix} 2 \\\\ -3 \\end{pmatrix}$", "Non : le seul vecteur normal est $\\begin{pmatrix} 2 \\\\ -3 \\end{pmatrix}$", "Non : c'est un vecteur directeur de la droite"], bonne: 0, explication: "$\\begin{pmatrix} 4 \\\\ -6 \\end{pmatrix} = 2\\begin{pmatrix} 2 \\\\ -3 \\end{pmatrix}$ : tout vecteur non nul colinéaire à un vecteur normal est encore normal. Une droite a une infinité de vecteurs normaux." },
    { question: "Le projeté orthogonal du point $A(3\\,;5)$ sur l'axe des abscisses est :", choix: ["$(3\\,;0)$", "$(0\\,;5)$", "$(0\\,;0)$", "$(5\\,;0)$"], bonne: 0, explication: "On « descend » verticalement de $A$ jusqu'à l'axe des abscisses : on garde l'abscisse $3$ et l'ordonnée devient $0$. La distance de $A$ à cet axe vaut $5$." },
    { question: "Pour le projeté orthogonal $H$ de $A(1\\,;2)$ sur $d : x - y + 3 = 0$, on écrit $H(1 + k\\,;2 - k)$. On trouve :", choix: ["$k = -1$ et $H(0\\,;3)$", "$k = 1$ et $H(2\\,;1)$", "$k = -2$ et $H(-1\\,;4)$", "$k = 0$ et $H(1\\,;2)$"], bonne: 0, explication: "$H \\in d$ : $(1 + k) - (2 - k) + 3 = 0 \\iff 2k + 2 = 0 \\iff k = -1$, d'où $H(0\\,;3)$. Vérification : $0 - 3 + 3 = 0$." },
    { question: "Le projeté orthogonal de $A(1\\,;2)$ sur la droite $d$ est $H(0\\,;3)$. La distance de $A$ à $d$ vaut :", choix: ["$\\sqrt{2}$", "$2$", "$3$", "$\\sqrt{5}$"], bonne: 0, explication: "C'est la longueur $AH = \\sqrt{(0 - 1)^2 + (3 - 2)^2} = \\sqrt{2}$. $\\sqrt{5}$ est la distance de $A$ à l'origine." },
    { question: "Une équation du cercle de centre $O$ et de rayon $\\sqrt{3}$ est :", choix: ["$x^2 + y^2 = 3$", "$x^2 + y^2 = \\sqrt{3}$", "$x^2 + y^2 = 9$", "$x + y = \\sqrt{3}$"], bonne: 0, explication: "$(x - 0)^2 + (y - 0)^2 = r^2$ avec $r^2 = (\\sqrt{3})^2 = 3$." },
    { question: "Le cercle d'équation $(x - 1)^2 + (y + 4)^2 = 7$ a pour rayon :", choix: ["$\\sqrt{7}$", "$7$", "$49$", "$\\dfrac{7}{2}$"], bonne: 0, explication: "Le membre de droite est $r^2 = 7$, donc $r = \\sqrt{7}$. Le centre est $(1\\,;-4)$." },
    { question: "Le point $A(1\\,;-1)$ appartient-il au cercle d'équation $(x - 4)^2 + (y - 3)^2 = 25$ ?", choix: ["Oui : $(1 - 4)^2 + (-1 - 3)^2 = 9 + 16 = 25$", "Non : $(1 + 4)^2 + (-1 + 3)^2 = 29 \\neq 25$", "Non : $(1 - 4) + (-1 - 3) = -7 \\neq 25$"], bonne: 0, explication: "On remplace $x$ par $1$ et $y$ par $-1$ dans l'équation, sans changer les signes de $-4$ et $-3$ : on trouve bien $25$, donc $A$ est sur le cercle." },
    { question: "$y^2 + 8y$ est égal à :", choix: ["$(y + 4)^2 - 16$", "$(y + 4)^2 + 16$", "$(y + 8)^2 - 64$", "$(y - 4)^2 - 16$"], bonne: 0, explication: "On prend la moitié de $8$ : $(y + 4)^2 = y^2 + 8y + 16$, donc $y^2 + 8y = (y + 4)^2 - 16$. On n'oublie pas de compenser." },
    { question: "L'ensemble des points $M(x\\,;y)$ tels que $x^2 + y^2 - 6x + 9 = 0$ est :", choix: ["le seul point $(3\\,;0)$", "le cercle de centre $(3\\,;0)$ et de rayon $3$", "le cercle de centre $(-3\\,;0)$ et de rayon $3$", "l'ensemble vide"], bonne: 0, explication: "$x^2 - 6x = (x - 3)^2 - 9$, donc l'équation devient $(x - 3)^2 + y^2 = 0$. Une somme de carrés est nulle seulement si les deux carrés sont nuls : $x = 3$ et $y = 0$." },
    { question: "L'équation $x^2 + y^2 + 4y = 5$ est celle du cercle :", choix: ["de centre $(0\\,;-2)$ et de rayon $3$", "de centre $(0\\,;2)$ et de rayon $3$", "de centre $(0\\,;-2)$ et de rayon $\\sqrt{5}$", "de centre $(0\\,;-4)$ et de rayon $3$"], bonne: 0, explication: "$y^2 + 4y = (y + 2)^2 - 4$, donc $x^2 + (y + 2)^2 = 9$. Centre $(0\\,;-2)$, attention au signe, et rayon $\\sqrt{9} = 3$." },
    { question: "Une antenne relais est placée en $A(1\\,;2)$ (unité : le km), avec une portée de $4$ km. Le village $V(4\\,;5)$ est-il couvert ?", choix: ["Non, car $3^2 + 3^2 = 18 > 16$", "Oui, car $3 + 3 = 6 \\leqslant 16$", "Oui, car $4 + 5 = 9 \\leqslant 16$", "Non, car $4^2 + 5^2 = 41 > 16$"], bonne: 0, explication: "On compare $(x - 1)^2 + (y - 2)^2$ à $r^2 = 16$ : $(4 - 1)^2 + (5 - 2)^2 = 18 > 16$. Le village est hors du disque. Il faut calculer à partir du centre $A$, pas de l'origine." },
    { question: "Le disque de centre $\\Omega(a\\,;b)$ et de rayon $r$ est l'ensemble des points $M(x\\,;y)$ tels que :", choix: ["$(x - a)^2 + (y - b)^2 \\leqslant r^2$", "$(x - a)^2 + (y - b)^2 = r^2$", "$(x - a)^2 + (y - b)^2 \\leqslant r$", "$(x + a)^2 + (y + b)^2 \\leqslant r^2$"], bonne: 0, explication: "$M$ est dans le disque si $\\Omega M \\leqslant r$, c'est-à-dire $\\Omega M^2 \\leqslant r^2$. L'égalité ne décrit que le cercle, le bord du disque." },
    { question: "Avec la fonction $\\texttt{couvert}$ du cours, que renvoie $\\texttt{couvert(3, 4, 0, 0, 5)}$ ?", choix: ["$\\texttt{True}$", "$\\texttt{False}$"], bonne: 0, explication: "$3^2 + 4^2 = 25$ et $5^2 = 25$ : le test $25 \\leqslant 25$ est vrai. Le point est sur le bord, qui fait partie du disque." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Équation d'une droite avec un vecteur normal",
      etapes: ["Écrire $ax + by + c = 0$ avec $(a\\,;b)$ les coordonnées du vecteur normal.", "Remplacer $x$ et $y$ par les coordonnées du point connu.", "En déduire $c$, puis vérifier."],
      exemple: "$\\vec{n}\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$, $A(2\\,;-1)$ : $6 - 4 + c = 0$, $c = -2$, d'où $3x + 4y - 2 = 0$."
    },
    {
      titre: "Calculer un projeté orthogonal",
      etapes: ["Lire un vecteur normal $\\vec{n}\\begin{pmatrix} a \\\\ b \\end{pmatrix}$ à la droite.", "Écrire $H(x_A + ka\\,;y_A + kb)$.", "Remplacer dans l'équation de la droite, trouver $k$, puis $H$ ; la distance de $A$ à $d$ est $AH$."],
      exemple: "$d : x + y - 4 = 0$ et $A(5\\,;3)$ : $k = -2$, $H(3\\,;1)$, $AH = 2\\sqrt{2}$."
    },
    {
      titre: "Écrire ou lire une équation de cercle",
      etapes: ["Centre $(a\\,;b)$ et rayon $r$ : $(x - a)^2 + (y - b)^2 = r^2$.", "Équation développée : compléter les carrés en $x$ et en $y$.", "Lire le centre (attention aux signes) et le rayon $\\sqrt{k}$ ; si $k < 0$, l'ensemble est vide."],
      exemple: "$x^2 + y^2 - 4x + 6y - 3 = 0 \\iff (x - 2)^2 + (y + 3)^2 = 16$ : centre $(2\\,;-3)$, rayon $4$."
    },
    {
      titre: "Tester l'appartenance d'un point",
      etapes: ["Remplacer $x$ et $y$ par les coordonnées du point.", "Droite ou cercle : vérifier l'égalité. Disque : vérifier l'inégalité.", "Conclure par une phrase : c'est une équivalence."],
      exemple: "$V(4\\,;4)$ et le disque $x^2 + y^2 \\leqslant 25$ : $32 > 25$, le point n'est pas dans le disque."
    }
  ],
  erreurs: [
    "Confondre vecteur normal $\\begin{pmatrix} a \\\\ b \\end{pmatrix}$ et vecteur directeur $\\begin{pmatrix} -b \\\\ a \\end{pmatrix}$.",
    "Se tromper de signe en lisant le centre : $(x + 2)^2$ correspond à l'abscisse $-2$.",
    "Prendre $r^2$ pour le rayon : dans $(x - a)^2 + (y - b)^2 = 25$, le rayon vaut $5$.",
    "Oublier de compenser en complétant les carrés : $x^2 - 4x = (x - 2)^2 - 4$.",
    "Croire qu'une équation de la forme $x^2 + y^2 + \\dots = 0$ donne toujours un cercle : elle peut donner un point ou l'ensemble vide.",
    "Confondre cercle (égalité) et disque (inégalité)."
  ]
};
