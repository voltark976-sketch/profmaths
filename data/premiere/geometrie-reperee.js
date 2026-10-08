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
    { question: "Que renvoie couvert(1, 1, 0, 0, 1) (programme du cours) ?", choix: ["False", "True"], bonne: 0, explication: "$1 + 1 = 2 > 1$ : le point est hors du disque." }
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
