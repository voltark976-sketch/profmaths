/*
  CHAPITRE : Première spécialité — Produit scalaire 1
  ----------------------------------------------------
  Chapitre 11 de la progression spiralée 2026-2027 (programme de Première 2026).
  Bilinéarité, Al-Kashi et ensemble des points M tels que MA · MB = 0 : chapitre 14 (produit scalaire 2).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas encore de vidéo de la chaîne ni de PDF pour ce chapitre : les vidéos sont celles d'Yvan Monka.
  Figures : "ps-cosinus", "ps-projection", "ps-repere", "pirogue". Générateurs : ps-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-produit-scalaire-1"] = {
  niveau: "Première spécialité",
  numero: 11,
  titre: "Produit scalaire 1",
  accroche: "Multiplier deux vecteurs pour obtenir un nombre : cosinus, projection, coordonnées, angles droits démontrés et la pirogue qu'on tire sur la plage.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur le produit scalaire en vidéo (Yvan Monka)", url: "https://youtu.be/dII7myZuLvo", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Définition avec le cosinus",
      figure: "ps-cosinus",
      video: { titre: "Vidéo d'Yvan Monka : calculer un produit scalaire avec le cosinus", youtube: "https://youtu.be/dfxz40fK0UI" },
      texte:
        "La **norme** d'un vecteur $\\overrightarrow{AB}$ est la longueur $AB$ ; on la note $\\|\\overrightarrow{AB}\\|$.\n\n" +
        "**Définition** : le **produit scalaire** de deux vecteurs non nuls $\\vec{u}$ et $\\vec{v}$ est le **nombre réel**\n\n" +
        "$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos(\\vec{u}, \\vec{v})$.\n\n" +
        "Si l'un des deux vecteurs est nul, $\\vec{u} \\cdot \\vec{v} = 0$.\n\n" +
        "- $\\vec{u} \\cdot \\vec{u} = \\|\\vec{u}\\|^2$ : c'est le **carré scalaire** de $\\vec{u}$.\n" +
        "- Le signe de $\\vec{u} \\cdot \\vec{v}$ est celui du cosinus : positif si l'angle est aigu, négatif s'il est obtus.\n\n" +
        "Attention : le produit scalaire de deux vecteurs est un **nombre**, pas un vecteur.",
      exemple: {
        enonce: "$ABC$ est un triangle équilatéral de côté $6$. Calcule $\\overrightarrow{AB} \\cdot \\overrightarrow{AC}$.",
        solution: "$\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 6 \\times 6 \\times \\cos\\dfrac{\\pi}{3} = 36 \\times \\dfrac{1}{2} = 18$."
      }
    },
    {
      titre: "Projection orthogonale",
      figure: "ps-projection",
      video: { titre: "Vidéo d'Yvan Monka : calculer un produit scalaire par projection", youtube: "https://youtu.be/2eTsaa2vVnI" },
      texte:
        "Soit $H$ le **projeté orthogonal** du point $C$ sur la droite $(AB)$ : c'est le point de $(AB)$ tel que $(CH)$ soit perpendiculaire à $(AB)$.\n\n" +
        "**Propriété** : $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = \\overrightarrow{AB} \\cdot \\overrightarrow{AH}$.\n\n" +
        "- Si $\\overrightarrow{AB}$ et $\\overrightarrow{AH}$ sont de même sens : $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = AB \\times AH$.\n" +
        "- S'ils sont de sens contraires : $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = -AB \\times AH$.\n\n" +
        "En effet, quand l'angle $\\widehat{BAC}$ est aigu, $AH = AC \\times \\cos \\widehat{BAC}$ dans le triangle $ACH$ rectangle en $H$.",
      exemple: {
        enonce: "$ABCD$ est un carré de côté $3$. Calcule $\\overrightarrow{AB} \\cdot \\overrightarrow{AC}$ et $\\overrightarrow{AB} \\cdot \\overrightarrow{CD}$.",
        solution: "Le projeté orthogonal de $C$ sur $(AB)$ est $B$ : $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = AB^2 = 9$.\n\n$\\overrightarrow{CD} = -\\overrightarrow{AB}$ : $\\overrightarrow{AB} \\cdot \\overrightarrow{CD} = -AB^2 = -9$."
      }
    },
    {
      titre: "Orthogonalité : une équivalence",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la propriété d'orthogonalité des vecteurs", youtube: "https://youtu.be/cTtV4DsoMLQ" },
      texte:
        "Par convention, le vecteur nul est orthogonal à tout vecteur.\n\n" +
        "**Propriété** : $\\vec{u} \\cdot \\vec{v} = 0 \\iff \\vec{u}$ et $\\vec{v}$ sont orthogonaux.\n\n" +
        "**Démonstration**. Si l'un des vecteurs est nul, les deux membres sont vrais. Sinon, $\\|\\vec{u}\\| \\neq 0$ et $\\|\\vec{v}\\| \\neq 0$, donc $\\vec{u} \\cdot \\vec{v} = 0 \\iff \\cos(\\vec{u}, \\vec{v}) = 0 \\iff$ l'angle est droit.\n\n" +
        "C'est une **équivalence** (« si et seulement si ») : elle sert dans les deux sens, pour démontrer qu'un angle est droit, ou pour utiliser un angle droit dans un calcul.\n\n" +
        "Attention : un produit scalaire nul ne veut pas dire qu'un des vecteurs est nul.",
      exemple: {
        enonce: "Dans un carré $ABCD$, que vaut $\\overrightarrow{AC} \\cdot \\overrightarrow{BD}$ ?",
        solution: "Les diagonales d'un carré sont perpendiculaires : $\\overrightarrow{AC} \\cdot \\overrightarrow{BD} = 0$."
      }
    },
    {
      titre: "Dans un repère orthonormé",
      video: { titre: "Vidéo d'Yvan Monka : calculer un produit scalaire à partir des coordonnées", youtube: "https://youtu.be/aOLRbG0IibY" },
      texte:
        "Dans un repère **orthonormé**, avec $\\vec{u}\\begin{pmatrix} x \\\\ y \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} x' \\\\ y' \\end{pmatrix}$ :\n\n" +
        "- $\\vec{u} \\cdot \\vec{v} = xx' + yy'$ (admis ici, démontré au chapitre 14) ;\n" +
        "- $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$ ;\n" +
        "- $\\vec{u}$ et $\\vec{v}$ sont orthogonaux $\\iff xx' + yy' = 0$.\n\n" +
        "Ces formules ne valent que dans un repère orthonormé : axes perpendiculaires et même unité sur les deux axes.",
      exemple: {
        enonce: "$\\vec{u}\\begin{pmatrix} 5 \\\\ -2 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} 2 \\\\ 5 \\end{pmatrix}$. Calcule $\\vec{u} \\cdot \\vec{v}$ et $\\|\\vec{u}\\|$.",
        solution: "$\\vec{u} \\cdot \\vec{v} = 5 \\times 2 + (-2) \\times 5 = 0$ : les vecteurs sont orthogonaux.\n\n$\\|\\vec{u}\\| = \\sqrt{25 + 4} = \\sqrt{29}$."
      }
    },
    {
      titre: "Démontrer un angle droit",
      figure: "ps-repere",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la propriété d'orthogonalité (2)", youtube: "https://youtu.be/-Hr28g0PFu0" },
      texte:
        "Pour démontrer qu'un triangle $ABC$ est rectangle en $A$ :\n\n" +
        "- calculer les coordonnées de $\\overrightarrow{AB}$ et de $\\overrightarrow{AC}$ ;\n" +
        "- calculer $\\overrightarrow{AB} \\cdot \\overrightarrow{AC}$ ;\n" +
        "- conclure : s'il est nul, l'angle en $A$ est droit.\n\n" +
        "Sur le schéma : $A(1\\,;1)$, $B(4\\,;2)$, $C(0\\,;4)$. On a $\\overrightarrow{AB}\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix}$ et $\\overrightarrow{AC}\\begin{pmatrix} -1 \\\\ 3 \\end{pmatrix}$, donc $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = -3 + 3 = 0$ : le triangle est rectangle en $A$.",
      exemple: {
        enonce: "Pour quelle valeur de $m$ les vecteurs $\\vec{u}\\begin{pmatrix} 4 \\\\ m \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix}$ sont-ils orthogonaux ?",
        solution: "$\\vec{u} \\cdot \\vec{v} = 12 - 2m$, et $12 - 2m = 0 \\iff m = 6$."
      }
    },
    {
      titre: "Calculer un angle",
      video: { titre: "Vidéo d'Yvan Monka : appliquer plusieurs formules du produit scalaire", youtube: "https://youtu.be/Ok6dZG8WIL8" },
      texte:
        "Si $\\vec{u}$ et $\\vec{v}$ sont non nuls, les deux expressions du produit scalaire donnent\n\n" +
        "$\\cos(\\vec{u}, \\vec{v}) = \\dfrac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\times \\|\\vec{v}\\|}$.\n\n" +
        "On calcule le produit scalaire avec les coordonnées, puis les normes, puis le cosinus. Une valeur remarquable, ou la touche $\\cos^{-1}$ de la calculatrice en mode degrés, donne l'angle.",
      exemple: {
        enonce: "$\\vec{u}\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix}$. Mesure l'angle entre $\\vec{u}$ et $\\vec{v}$.",
        solution: "$\\vec{u} \\cdot \\vec{v} = 3 + 2 = 5$, $\\|\\vec{u}\\| = \\sqrt{5}$ et $\\|\\vec{v}\\| = \\sqrt{10}$.\n\n$\\cos(\\vec{u}, \\vec{v}) = \\dfrac{5}{\\sqrt{50}} = \\dfrac{5}{5\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}$ : l'angle mesure $45°$."
      }
    },
    {
      titre: "Le travail d'une force : tirer une pirogue",
      figure: "pirogue",
      texte:
        "En physique, le **travail** d'une force constante $\\vec{F}$ pendant un déplacement de $A$ à $B$ est le produit scalaire\n\n" +
        "$W = \\vec{F} \\cdot \\overrightarrow{AB} = F \\times AB \\times \\cos \\alpha$,\n\n" +
        "en joules, avec $F$ en newtons et $AB$ en mètres.\n\n" +
        "Pour remonter une pirogue sur la plage, on la tire sur $10$ m avec une force de $200$ N, la corde faisant un angle de $30°$ avec le sable (schéma) : $W = 200 \\times 10 \\times \\cos 30° = 2\\,000 \\times \\dfrac{\\sqrt{3}}{2} \\approx 1\\,732$ J.\n\n" +
        "En tirant à l'horizontale, on aurait $2\\,000$ J : seule la partie de la force dans le sens du déplacement « travaille ». Une force perpendiculaire au déplacement a un travail nul.",
      exemple: {
        enonce: "Avec la même force et une corde à $60°$ du sable, quel est le travail ?",
        solution: "$W = 200 \\times 10 \\times \\cos 60° = 2\\,000 \\times \\dfrac{1}{2} = 1\\,000$ J."
      }
    },
    {
      titre: "Python : produit scalaire et norme",
      texte:
        "Avec des couples de coordonnées :\n\n" +
        "```python\nfrom math import sqrt\n\ndef prodscal(u, v):\n    return u[0] * v[0] + u[1] * v[1]\n\ndef norme(u):\n    return sqrt(prodscal(u, u))\n\nprint(prodscal((3, 1), (-1, 3)))\nprint(norme((3, 4)))\n```\n\n" +
        "Le programme affiche $0$ (les vecteurs sont orthogonaux), puis $\\texttt{5.0}$.\n\n" +
        "Pour tester l'orthogonalité, on compare le produit scalaire à $0$. Avec des coordonnées décimales, on vérifie plutôt que sa valeur absolue est très petite, à cause des arrondis.",
      exemple: {
        enonce: "Comment tester avec ces fonctions si un triangle $ABC$ est rectangle en $A$ ?",
        solution: "On calcule les coordonnées des vecteurs $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$, par exemple $\\texttt{(B[0] - A[0], B[1] - A[1])}$, puis on teste si prodscal(AB, AC) vaut $0$."
      }
    }
  ],

  videos: [
    { titre: "Calculer une longueur à l'aide du produit scalaire", type: "Projection", youtube: "https://youtu.be/K4Izn5xB_Qk" },
    { titre: "Calculer un produit scalaire avec les normes", type: "Normes", youtube: "https://youtu.be/iNsm05JimgA" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "ps-cosinus", titre: "Avec le cosinus", etape: "Définition", nb: 5 },
    { type: "ps-projection", titre: "Par projection", etape: "Définition", nb: 5 },
    { type: "ps-logique", titre: "Équivalence et contre-exemples", etape: "Définition", nb: 4 },
    { type: "ps-coordonnees", titre: "Avec les coordonnées", etape: "Repère orthonormé", nb: 5 },
    { type: "ps-orthogonal", titre: "Orthogonaux ou pas ?", etape: "Repère orthonormé", nb: 5 },
    { type: "ps-norme-angle", titre: "Normes et angles", etape: "Repère orthonormé", nb: 5 },
    { type: "ps-travail", titre: "Tirer la pirogue", etape: "Appliquer", nb: 4 },
    { type: "ps-python", titre: "Python : produit scalaire", etape: "Appliquer", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Le produit scalaire de deux vecteurs est :", choix: ["un nombre réel", "un vecteur", "une longueur toujours positive", "un angle"], bonne: 0, explication: "$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos(\\vec{u}, \\vec{v})$ est un nombre, qui peut être négatif." },
    { question: "$\\|\\vec{u}\\| = 3$, $\\|\\vec{v}\\| = 4$ et l'angle $(\\vec{u}, \\vec{v})$ mesure $\\dfrac{\\pi}{3}$. Alors $\\vec{u} \\cdot \\vec{v} =$", choix: ["$6$", "$12$", "$6\\sqrt{3}$", "$0$"], bonne: 0, explication: "$3 \\times 4 \\times \\dfrac{1}{2} = 6$." },
    { question: "$\\vec{u}$ et $\\vec{v}$ sont non nuls et $\\vec{u} \\cdot \\vec{v} < 0$. Cela signifie que :", choix: ["l'angle entre $\\vec{u}$ et $\\vec{v}$ est obtus", "$\\vec{u}$ et $\\vec{v}$ sont de sens contraires", "l'un des vecteurs est nul", "les vecteurs sont orthogonaux"], bonne: 0, explication: "Le produit scalaire a le signe du cosinus." },
    { question: "$ABCD$ est un carré de côté $5$. $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} =$", choix: ["$25$", "$50$", "$25\\sqrt{2}$", "$0$"], bonne: 0, explication: "Le projeté de $C$ sur $(AB)$ est $B$ : $AB^2 = 25$." },
    { question: "$ABCD$ est un carré de côté $5$. $\\overrightarrow{AB} \\cdot \\overrightarrow{AD} =$", choix: ["$0$", "$25$", "$-25$", "$5$"], bonne: 0, explication: "$(AB) \\perp (AD)$ : produit scalaire nul." },
    { question: "$ABCD$ est un rectangle avec $AB = 6$ et $AD = 2$. $\\overrightarrow{AB} \\cdot \\overrightarrow{CD} =$", choix: ["$-36$", "$36$", "$12$", "$0$"], bonne: 0, explication: "$\\overrightarrow{CD} = -\\overrightarrow{AB}$, donc le produit vaut $-AB^2$." },
    { question: "$\\vec{u}\\begin{pmatrix} 2 \\\\ -3 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} 4 \\\\ 1 \\end{pmatrix}$. $\\vec{u} \\cdot \\vec{v} =$", choix: ["$5$", "$11$", "$-1$", "$\\begin{pmatrix} 8 \\\\ -3 \\end{pmatrix}$"], bonne: 0, explication: "$2 \\times 4 + (-3) \\times 1 = 8 - 3 = 5$." },
    { question: "La norme de $\\vec{u}\\begin{pmatrix} -5 \\\\ 12 \\end{pmatrix}$ est :", choix: ["$13$", "$7$", "$169$", "$17$"], bonne: 0, explication: "$\\sqrt{25 + 144} = \\sqrt{169} = 13$." },
    { question: "$\\vec{u}\\begin{pmatrix} 3 \\\\ m \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} 2 \\\\ -6 \\end{pmatrix}$ sont orthogonaux pour $m =$", choix: ["$1$", "$-1$", "$9$", "$0$"], bonne: 0, explication: "$6 - 6m = 0 \\iff m = 1$." },
    { question: "$A(0\\,;0)$, $B(2\\,;1)$ et $C(-1\\,;2)$. Le triangle $ABC$ est :", choix: ["rectangle en $A$", "rectangle en $B$", "équilatéral", "isocèle en $B$"], bonne: 0, explication: "$\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = -2 + 2 = 0$." },
    { question: "$\\vec{u} \\cdot \\vec{v} = 0$ avec $\\vec{u} \\neq \\vec{0}$. Alors :", choix: ["$\\vec{v}$ est nul ou orthogonal à $\\vec{u}$", "$\\vec{v}$ est forcément nul", "$\\vec{v} = \\vec{u}$", "on ne peut rien dire"], bonne: 0, explication: "Équivalence : produit scalaire nul $\\iff$ orthogonalité (le vecteur nul étant orthogonal à tout vecteur)." },
    { question: "$\\vec{u} \\cdot \\vec{v} = 4$, $\\|\\vec{u}\\| = 2$ et $\\|\\vec{v}\\| = 4$. L'angle entre $\\vec{u}$ et $\\vec{v}$ mesure :", choix: ["$60°$", "$30°$", "$45°$", "$90°$"], bonne: 0, explication: "$\\cos = \\dfrac{4}{8} = \\dfrac{1}{2}$, donc l'angle mesure $60°$." },
    { question: "Le travail d'une force perpendiculaire au déplacement est :", choix: ["nul", "maximal", "négatif", "égal à $F \\times AB$"], bonne: 0, explication: "$\\cos 90° = 0$." },
    { question: "Une force de $300$ N tire une pirogue sur $5$ m, dans le sens du déplacement. Son travail est :", choix: ["$1\\,500$ J", "$0$ J", "$750$ J", "$300$ J"], bonne: 0, explication: "$W = 300 \\times 5 \\times \\cos 0° = 1\\,500$ J." },
    { question: "« $\\vec{u} \\cdot \\vec{v} = 0 \\iff \\vec{u}$ et $\\vec{v}$ sont orthogonaux » est :", choix: ["une équivalence, vraie dans les deux sens", "une implication vraie dans un seul sens", "fausse si $\\vec{u} \\neq \\vec{0}$", "vraie seulement dans un repère orthonormé"], bonne: 0, explication: "Le symbole $\\iff$ signifie « si et seulement si » : les deux implications sont vraies." },
    { question: "Que renvoie prodscal((1, 2), (3, 4)) (programme du cours) ?", choix: ["$11$", "$(3, 8)$", "$10$", "$24$"], bonne: 0, explication: "$1 \\times 3 + 2 \\times 4 = 11$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Choisir la bonne formule",
      etapes: ["Normes et angle connus : $\\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos(\\vec{u}, \\vec{v})$.", "Figure avec des angles droits : projection orthogonale.", "Coordonnées dans un repère orthonormé : $xx' + yy'$."],
      exemple: "Carré $ABCD$ de côté $4$ : par projection, $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = AB^2 = 16$."
    },
    {
      titre: "Calculer par projection",
      etapes: ["Projeter orthogonalement l'extrémité du second vecteur sur la droite qui porte le premier.", "Même sens : produit des longueurs ; sens contraires : son opposé.", "Vecteurs orthogonaux : le produit scalaire est nul."],
      exemple: "$H$ projeté de $C$ sur $(AB)$, $AB = 5$, $AH = 2$, $H$ du même côté que $B$ : $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 10$."
    },
    {
      titre: "Démontrer un angle droit",
      etapes: ["Calculer les coordonnées des deux vecteurs.", "Calculer $xx' + yy'$.", "Conclure : s'il est nul, les vecteurs sont orthogonaux (et réciproquement)."],
      exemple: "$\\overrightarrow{AB}\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix}$ et $\\overrightarrow{AC}\\begin{pmatrix} -1 \\\\ 3 \\end{pmatrix}$ : $-3 + 3 = 0$, l'angle en $A$ est droit."
    },
    {
      titre: "Calculer un angle",
      etapes: ["Calculer $\\vec{u} \\cdot \\vec{v}$ avec les coordonnées.", "Calculer les normes $\\|\\vec{u}\\|$ et $\\|\\vec{v}\\|$.", "Calculer $\\cos(\\vec{u}, \\vec{v}) = \\dfrac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\|\\vec{v}\\|}$, puis l'angle."],
      exemple: "$\\vec{u} \\cdot \\vec{v} = 5$, $\\|\\vec{u}\\| = \\sqrt{5}$, $\\|\\vec{v}\\| = \\sqrt{10}$ : $\\cos = \\dfrac{\\sqrt{2}}{2}$, angle de $45°$."
    },
    {
      titre: "Calculer le travail d'une force",
      etapes: ["Repérer la force $F$, le déplacement $AB$ et l'angle $\\alpha$ entre eux.", "Calculer $W = F \\times AB \\times \\cos \\alpha$.", "Donner le résultat en joules."],
      exemple: "$F = 200$ N, $AB = 10$ m, $\\alpha = 60°$ : $W = 1\\,000$ J."
    }
  ],
  erreurs: [
    "Croire que le produit scalaire est un vecteur : c'est un nombre.",
    "Écrire $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = AB \\times AC$ en oubliant le cosinus.",
    "Oublier le signe moins quand les vecteurs projetés sont de sens contraires.",
    "Croiser les coordonnées : on calcule $xx' + yy'$, pas $xy' + x'y$.",
    "Oublier la racine carrée dans la norme : c'est $\\|\\vec{u}\\|^2$ qui vaut $x^2 + y^2$.",
    "Conclure qu'un vecteur est nul parce que le produit scalaire est nul.",
    "Utiliser $xx' + yy'$ dans un repère qui n'est pas orthonormé."
  ]
};
