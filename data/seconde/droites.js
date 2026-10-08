/*
  CHAPITRE : Seconde — Droites du plan
  -------------------------------------
  Chapitre 12 de la progression spiralée 2026-2027 (programme de Seconde 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce, programme Python entre ```python et ```).
  Vidéos : celles de la chaîne d'abord, Yvan Monka en complément.
  Les générateurs d'exercices commencent par « dr- » dans assets/exercices.js
  (le chapitre reprend aussi am-droite-point et am-lire-droite de la partie Automatismes).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-droites"] = {
  niveau: "Seconde",
  numero: 12,
  titre: "Droites du plan",
  accroche: "Vecteur directeur, équation cartésienne, équation réduite : décrire une droite par une équation, puis savoir si deux trajectoires d'embarcations se croisent.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur les équations de droites en vidéo (Yvan Monka)", url: "https://youtu.be/d-rUnClmcCY", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Vecteur directeur d'une droite",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un vecteur directeur", youtube: "https://youtu.be/6VdSz-0QT4Y" },
      texte:
        "Un **vecteur directeur** d'une droite $d$ est un vecteur non nul $\\vec{u}$ qui a la même direction que $d$ : si $A$ et $B$ sont deux points distincts de $d$, $\\overrightarrow{AB}$ est un vecteur directeur.\n\n" +
        "- Tout vecteur non nul colinéaire à $\\vec{u}$ est aussi un vecteur directeur de $d$.\n" +
        "- Un point $M$ est sur la droite passant par $A$ et dirigée par $\\vec{u}$ si et seulement si $\\overrightarrow{AM}$ et $\\vec{u}$ sont **colinéaires** (chapitre 11).",
      exemple: {
        enonce: "La droite $d$ passe par $A(1\\,;3)$ et $B(4\\,;-3)$. Donner deux vecteurs directeurs de $d$.",
        solution: "$\\overrightarrow{AB}\\begin{pmatrix} 3 \\\\ -6 \\end{pmatrix}$ en est un. En le divisant par $3$ : $\\vec{u}\\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix}$ en est un autre."
      }
    },
    {
      titre: "Équation cartésienne",
      figure: "droite-directeur",
      video: { titre: "Vidéo d'Yvan Monka : déterminer une équation cartésienne avec le déterminant", youtube: "https://youtu.be/rLxQIbQkPsQ" },
      texte:
        "**Propriété** : toute droite a une équation de la forme $ax + by + c = 0$, avec $(a\\,;b) \\neq (0\\,;0)$ : c'est une **équation cartésienne**.\n\n" +
        "- Un vecteur directeur de la droite $ax + by + c = 0$ est $\\vec{u}\\begin{pmatrix} -b \\\\ a \\end{pmatrix}$.\n" +
        "- $M(x\\,;y) \\in d$ si et seulement si ses coordonnées vérifient l'équation.\n" +
        "- Une droite a une infinité d'équations cartésiennes : on peut tout multiplier par un même nombre non nul.",
      exemple: {
        enonce: "Déterminer une équation cartésienne de la droite passant par $A(3\\,;-2)$ et dirigée par $\\vec{u}\\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix}$.",
        solution: "$M(x\\,;y) \\in d \\iff \\det(\\overrightarrow{AM}, \\vec{u}) = 0 \\iff (x - 3) \\times 1 - (y + 2) \\times (-2) = 0$.\n\nSoit $x - 3 + 2y + 4 = 0$, c'est-à-dire $x + 2y + 1 = 0$."
      }
    },
    {
      titre: "Démonstration : forme générale d'une équation de droite",
      video: { titre: "Vidéo d'Yvan Monka : démontrer qu'une équation de droite est de la forme ax + by + c = 0", youtube: "https://youtu.be/GVDUrdsRUdA" },
      texte:
        "Soit $d$ la droite passant par $A(x_A\\,;y_A)$ et dirigée par $\\vec{u}\\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix}$ (non nul).\n\n" +
        "$M(x\\,;y) \\in d \\iff \\overrightarrow{AM}$ et $\\vec{u}$ colinéaires $\\iff \\det(\\overrightarrow{AM}, \\vec{u}) = 0$\n\n" +
        "$\\iff (x - x_A)\\beta - (y - y_A)\\alpha = 0 \\iff \\beta x - \\alpha y + (\\alpha y_A - \\beta x_A) = 0$.\n\n" +
        "On pose $a = \\beta$, $b = -\\alpha$ et $c = \\alpha y_A - \\beta x_A$ : on obtient $ax + by + c = 0$, avec $(a\\,;b) \\neq (0\\,;0)$ car $\\vec{u} \\neq \\vec{0}$.",
      exemple: {
        enonce: "Vérifier sur cette démonstration que $\\vec{u}\\begin{pmatrix} -b \\\\ a \\end{pmatrix}$ est un vecteur directeur.",
        solution: "$-b = \\alpha$ et $a = \\beta$ : on retrouve exactement $\\vec{u}\\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix}$."
      }
    },
    {
      titre: "Équation réduite et pente",
      video: { titre: "Vidéo d'Yvan Monka : équation de droite connaissant deux points", youtube: "https://youtu.be/tfagLy6QRuw" },
      texte:
        "Si $b \\neq 0$, on isole $y$ : la droite a une **équation réduite** $y = mx + p$ (une fonction affine, chapitre 6).\n" +
        "- $m$ est la **pente** (coefficient directeur) : $m = \\dfrac{y_B - y_A}{x_B - x_A}$ pour deux points de la droite. Un vecteur directeur est $\\vec{u}\\begin{pmatrix} 1 \\\\ m \\end{pmatrix}$.\n" +
        "- $p$ est l'**ordonnée à l'origine**.\n\n" +
        "Si $b = 0$, la droite est **verticale**, d'équation $x = k$ : elle n'a pas d'équation réduite de la forme $y = mx + p$.",
      exemple: {
        enonce: "Équation réduite de la droite $(AB)$ avec $A(-1\\,;-1)$ et $B(1\\,;3)$, puis de la droite $6x + 2y - 4 = 0$.",
        solution: "$m = \\dfrac{3 - (-1)}{1 - (-1)} = 2$ ; $-1 = 2 \\times (-1) + p$ donne $p = 1$. $(AB) : y = 2x + 1$.\n\n$6x + 2y - 4 = 0 \\iff 2y = -6x + 4 \\iff y = -3x + 2$."
      }
    },
    {
      titre: "Point d'une droite, tracé",
      video: { titre: "Vidéo de ton prof : exploiter une équation de courbe", youtube: "https://youtu.be/A--qoNu8uno" },
      texte:
        "- Pour savoir si $M(x_M\\,;y_M)$ est sur $d$, on remplace $x$ et $y$ par ses coordonnées dans l'équation : l'égalité doit être vraie.\n" +
        "- Pour **tracer** une droite, deux points suffisent : on choisit deux valeurs de $x$ et on calcule $y$.\n" +
        "- Avec l'équation réduite : on part du point $(0\\,;p)$, puis on avance de $1$ vers la droite et de $m$ vers le haut (ou vers le bas si $m < 0$).",
      exemple: {
        enonce: "Le point $M(2\\,;5)$ est-il sur la droite $d : y = 3x - 1$ ? Et $N(-1\\,;-3)$ ?",
        solution: "$3 \\times 2 - 1 = 5$ : oui, $M \\in d$.\n\n$3 \\times (-1) - 1 = -4 \\neq -3$ : non, $N \\notin d$."
      }
    },
    {
      titre: "Droites parallèles, droites sécantes",
      figure: "deux-droites",
      video: { titre: "Vidéo d'Yvan Monka : étudier la position relative de deux droites", youtube: "https://youtu.be/gTUPGw7Bulc" },
      texte:
        "- Deux droites sont **parallèles** si et seulement si leurs vecteurs directeurs sont colinéaires.\n" +
        "- Avec les équations réduites : parallèles si et seulement si elles ont la **même pente** $m$.\n" +
        "- Sinon, elles sont **sécantes** : pour trouver le point d'intersection de $y = mx + p$ et $y = m'x + p'$, on résout $mx + p = m'x + p'$, puis on calcule $y$.",
      exemple: {
        enonce: "Deux embarcations suivent les trajectoires $d_1 : y = 2x - 3$ et $d_2 : y = -x + 6$. Se croisent-elles ? Où ?",
        solution: "Pentes $2$ et $-1$ différentes : les droites sont sécantes.\n\n$2x - 3 = -x + 6 \\iff 3x = 9 \\iff x = 3$, puis $y = 2 \\times 3 - 3 = 3$. Les trajectoires se croisent au point $(3\\,;3)$ (ce qui ne veut pas dire que les embarcations s'y trouvent au même moment !)."
      }
    },
    {
      titre: "Python : équation d'une droite",
      texte:
        "La fonction calcule la pente et l'ordonnée à l'origine de la droite $(AB)$ (avec $x_A \\neq x_B$) :\n\n" +
        "```python\ndef droite(xA, yA, xB, yB):\n    m = (yB - yA) / (xB - xA)\n    p = yA - m * xA\n    return m, p\n```\n\n" +
        "Pour tester si trois points sont alignés, on peut vérifier que $C$ vérifie l'équation de $(AB)$, ou utiliser le déterminant (chapitre 11).",
      exemple: {
        enonce: "Que renvoie $\\texttt{droite(-1, -1, 1, 3)}$ ?",
        solution: "$m = \\dfrac{4}{2} = 2{,}0$ et $p = -1 - 2 \\times (-1) = 1{,}0$ : la fonction renvoie $(2{,}0\\,;1{,}0)$, soit $y = 2x + 1$."
      }
    }
  ],

  /* Exercices corrigés en vidéo */
  videos: [
    { titre: "Démontrer que deux droites sont parallèles", type: "Position relative", youtube: "https://youtu.be/NjsVdVolhvU" },
    { titre: "Tracer une droite à partir de l'équation cartésienne", type: "Tracé", youtube: "https://youtu.be/EchUv2cGtzo" },
    { titre: "Interpréter graphiquement les solutions d'un système", type: "Intersection", youtube: "https://youtu.be/-LV_5rkW0RY" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ----------
     Chaque série tire des nombres au hasard : on peut la refaire autant qu'on veut.
     type : nom du générateur (voir assets/exercices.js). nb : nombre de questions. */
  exercices: [
    { type: "dr-vecteur-directeur", titre: "Vecteur directeur", etape: "Équation cartésienne", nb: 4 },
    { type: "dr-cartesienne", titre: "Trouver une équation cartésienne", etape: "Équation cartésienne", nb: 4 },
    { type: "am-droite-point", titre: "Le point est-il sur la droite ?", etape: "Équation cartésienne", nb: 4 },
    { type: "dr-reduite", titre: "De l'équation cartésienne à la réduite", etape: "Équation réduite", nb: 4 },
    { type: "dr-reduite-2pts", titre: "Équation réduite par deux points", etape: "Équation réduite", nb: 5 },
    { type: "am-lire-droite", titre: "Lire l'équation réduite sur un graphique", etape: "Équation réduite", nb: 4 },
    { type: "dr-position", titre: "Parallèles ou sécantes ? Intersection", etape: "Position relative", nb: 5 },
    { type: "dr-python", titre: "Python : équation de (AB)", etape: "Python", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ----------
     bonne : numéro de la bonne réponse en partant de 0 (0 = la première). */
  qcm: [
    {
      question: "Un vecteur directeur de la droite $3x - 2y + 5 = 0$ est :",
      choix: ["$\\begin{pmatrix} 2 \\\\ 3 \\end{pmatrix}$", "$\\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix}$", "$\\begin{pmatrix} -2 \\\\ 3 \\end{pmatrix}$", "$\\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}$"],
      bonne: 0,
      explication: "$a = 3$, $b = -2$ : $\\vec{u}\\begin{pmatrix} -b \\\\ a \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 3 \\end{pmatrix}$."
    },
    {
      question: "Le point $A(1\\,;2)$ appartient à la droite :",
      choix: ["$2x + y - 4 = 0$", "$x + y + 3 = 0$", "$x - 2y = 0$", "$3x - y + 1 = 0$"],
      bonne: 0,
      explication: "$2 \\times 1 + 2 - 4 = 0$ : l'égalité est vraie. Pour les autres : $6$, $-3$ et $2$, non nuls."
    },
    {
      question: "La pente de la droite passant par $A(2\\,;1)$ et $B(5\\,;7)$ est :",
      choix: ["$2$", "$\\dfrac{1}{2}$", "$6$", "$3$"],
      bonne: 0,
      explication: "$m = \\dfrac{7 - 1}{5 - 2} = \\dfrac{6}{3} = 2$."
    },
    {
      question: "L'équation réduite de $4x + 2y - 6 = 0$ est :",
      choix: ["$y = -2x + 3$", "$y = 2x - 3$", "$y = -4x + 6$", "$y = 2x + 3$"],
      bonne: 0,
      explication: "$2y = -4x + 6$, donc $y = -2x + 3$."
    },
    {
      question: "La droite d'équation $x = 4$ est :",
      choix: ["verticale", "horizontale", "la droite $y = 4x$", "parallèle à l'axe des abscisses"],
      bonne: 0,
      explication: "Tous ses points ont pour abscisse $4$ : c'est une droite verticale (elle n'a pas d'équation réduite $y = mx + p$)."
    },
    {
      question: "$d_1 : y = 3x - 1$ et $d_2 : y = 3x + 5$ sont :",
      choix: ["parallèles", "sécantes en $(0\\,;-1)$", "confondues", "perpendiculaires"],
      bonne: 0,
      explication: "Même pente $3$, ordonnées à l'origine différentes : parallèles (strictement)."
    },
    {
      question: "Le point d'intersection de $y = x + 1$ et $y = -x + 5$ est :",
      choix: ["$(2\\,;3)$", "$(3\\,;2)$", "$(1\\,;2)$", "$(-2\\,;-1)$"],
      bonne: 0,
      explication: "$x + 1 = -x + 5 \\iff x = 2$, puis $y = 3$."
    },
    {
      question: "Une droite a pour équation cartésienne $x - 3y + 2 = 0$. Une autre équation de la même droite est :",
      choix: ["$-2x + 6y - 4 = 0$", "$x + 3y + 2 = 0$", "$3x - y + 2 = 0$", "$x - 3y = 0$"],
      bonne: 0,
      explication: "On a multiplié tous les coefficients par $-2$ : c'est la même droite."
    },
    { question: "$A(1\\,;2)$ et $B(3\\,;8)$. Un vecteur directeur de la droite $(AB)$ est :", choix: ["$\\begin{pmatrix} 1 \\\\ 3 \\end{pmatrix}$", "$\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix}$", "$\\begin{pmatrix} 4 \\\\ 10 \\end{pmatrix}$", "$\\begin{pmatrix} 2 \\\\ 8 \\end{pmatrix}$"], bonne: 0, explication: "$\\overrightarrow{AB}\\begin{pmatrix} 2 \\\\ 6 \\end{pmatrix}$ est un vecteur directeur, et $\\begin{pmatrix} 1 \\\\ 3 \\end{pmatrix} = \\dfrac{1}{2}\\overrightarrow{AB}$ lui est colinéaire." },
    { question: "Vrai ou faux : si $\\vec{u}\\begin{pmatrix} 1 \\\\ 3 \\end{pmatrix}$ dirige la droite $d$, alors $\\vec{v}\\begin{pmatrix} -2 \\\\ -6 \\end{pmatrix}$ dirige aussi $d$.", choix: ["Vrai", "Faux"], bonne: 0, explication: "$\\vec{v} = -2\\vec{u}$ : il est non nul et colinéaire à $\\vec{u}$, donc c'est aussi un vecteur directeur de $d$. Le sens n'a pas d'importance." },
    { question: "Un vecteur directeur de la droite $y = -2x + 5$ est :", choix: ["$\\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix}$", "$\\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix}$", "$\\begin{pmatrix} 1 \\\\ 5 \\end{pmatrix}$", "$\\begin{pmatrix} -2 \\\\ 5 \\end{pmatrix}$"], bonne: 0, explication: "Pour $y = mx + p$, $\\vec{u}\\begin{pmatrix} 1 \\\\ m \\end{pmatrix}$ est un vecteur directeur : ici $\\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix}$." },
    { question: "Une équation cartésienne de la droite passant par $A(1\\,;1)$ et dirigée par $\\vec{u}\\begin{pmatrix} 2 \\\\ 3 \\end{pmatrix}$ est :", choix: ["$3x - 2y - 1 = 0$", "$2x + 3y - 5 = 0$", "$3x + 2y - 5 = 0$", "$2x - 3y + 1 = 0$"], bonne: 0, explication: "$\\vec{u}\\begin{pmatrix} -b \\\\ a \\end{pmatrix}$ donne $a = 3$ et $b = -2$ : $3x - 2y + c = 0$, et $A$ donne $3 - 2 + c = 0$, soit $c = -1$. Les autres équations passent aussi par $A$, mais n'ont pas la bonne direction." },
    { question: "Pour quelle valeur de $k$ le point $M(2\\,;k)$ est-il sur la droite $3x + y - 4 = 0$ ?", choix: ["$k = -2$", "$k = 2$", "$k = 10$", "$k = -10$"], bonne: 0, explication: "On remplace : $3 \\times 2 + k - 4 = 0 \\iff 2 + k = 0 \\iff k = -2$." },
    { question: "La droite passant par $A(3\\,;-1)$ et $B(3\\,;5)$ a pour équation :", choix: ["$x = 3$", "$y = 3$", "$y = 3x$", "$y = 2x - 1$"], bonne: 0, explication: "$A$ et $B$ ont la même abscisse $3$ : la droite est verticale, d'équation $x = 3$. On ne peut pas calculer de pente (division par $0$)." },
    { question: "La droite d'équation $y = -2$ est :", choix: ["parallèle à l'axe des abscisses", "verticale", "de pente $-2$", "passant par l'origine du repère"], bonne: 0, explication: "Tous ses points ont pour ordonnée $-2$ : c'est une droite horizontale, de pente $0$ ($y = 0x - 2$)." },
    { question: "La droite $y = 4x - 7$ coupe l'axe des ordonnées au point :", choix: ["$(0\\,;-7)$", "$(-7\\,;0)$", "$(0\\,;4)$", "$(4\\,;-7)$"], bonne: 0, explication: "Sur l'axe des ordonnées, $x = 0$ : $y = 4 \\times 0 - 7 = -7$. C'est l'ordonnée à l'origine $p$." },
    { question: "L'équation réduite de la droite passant par $A(0\\,;3)$ et $B(2\\,;-1)$ est :", choix: ["$y = -2x + 3$", "$y = 2x + 3$", "$y = -\\dfrac{1}{2}x + 3$", "$y = 3x - 2$"], bonne: 0, explication: "$m = \\dfrac{-1 - 3}{2 - 0} = -2$ et la droite passe par $(0\\,;3)$, donc $p = 3$. ($-\\dfrac{1}{2}$ vient d'une pente inversée.)" },
    { question: "Pour tracer $y = -\\dfrac{1}{2}x + 2$, on part du point $(0\\,;2)$, on avance de $2$ vers la droite, puis on :", choix: ["descend de $1$", "monte de $1$", "descend de $2$", "monte de $2$"], bonne: 0, explication: "Pente $-\\dfrac{1}{2}$ : pour $+2$ en abscisse, l'ordonnée varie de $2 \\times \\left(-\\dfrac{1}{2}\\right) = -1$. On arrive au point $(2\\,;1)$." },
    { question: "$d_1 : 2x - y + 1 = 0$ et $d_2 : -4x + 2y + 3 = 0$ sont :", choix: ["parallèles", "sécantes", "confondues", "perpendiculaires"], bonne: 0, explication: "Vecteurs directeurs $\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$ et $\\begin{pmatrix} -2 \\\\ -4 \\end{pmatrix}$, colinéaires. Réduites : $y = 2x + 1$ et $y = 2x - 1{,}5$ : même pente, ordonnées à l'origine différentes." },
    { question: "Le point d'intersection des droites $y = 2x + 3$ et $y = -x - 3$ est :", choix: ["$(-2\\,;-1)$", "$(-1\\,;-2)$", "$(0\\,;3)$", "$(2\\,;7)$"], bonne: 0, explication: "$2x + 3 = -x - 3 \\iff 3x = -6 \\iff x = -2$, puis $y = 2 \\times (-2) + 3 = -1$. Vérification : $-(-2) - 3 = -1$." },
    { question: "Les trajectoires de deux pirogues se coupent au point $(3\\,;3)$. Cela signifie que :", choix: ["les deux trajectoires passent par ce point, pas forcément au même moment", "les deux pirogues vont forcément se heurter", "les deux pirogues vont à la même vitesse", "les deux trajectoires sont parallèles"], bonne: 0, explication: "Une équation de droite décrit un chemin, pas un horaire : les pirogues peuvent passer en $(3\\,;3)$ à des moments différents." },
    { question: "Que renvoie $\\texttt{droite(0, 1, 2, 7)}$, avec la fonction Python du cours ?", choix: ["$(3{,}0\\,;1{,}0)$", "$(1{,}0\\,;3{,}0)$", "$(3{,}0\\,;7{,}0)$", "$(4{,}0\\,;1{,}0)$"], bonne: 0, explication: "$m = \\dfrac{7 - 1}{2 - 0} = 3$ et $p = 1 - 3 \\times 0 = 1$ : la fonction renvoie $m$ puis $p$, soit la droite $y = 3x + 1$." },
    { question: "Pourquoi la fonction Python $\\texttt{droite}$ du cours demande-t-elle $x_A \\neq x_B$ ?", choix: ["sinon on divise par $0$ : la droite est verticale et n'a pas d'équation réduite", "sinon la pente est nulle", "sinon les points $A$ et $B$ sont forcément confondus", "parce que Python ne sait pas soustraire deux nombres égaux"], bonne: 0, explication: "La pente est $\\dfrac{y_B - y_A}{x_B - x_A}$ : si $x_A = x_B$, le dénominateur est nul. La droite $(AB)$ est alors verticale, d'équation $x = x_A$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Équation cartésienne avec un point et un vecteur directeur",
      etapes: [
        "Écrire les coordonnées de $\\overrightarrow{AM}$ en fonction de $x$ et $y$.",
        "Écrire $\\det(\\overrightarrow{AM}, \\vec{u}) = 0$.",
        "Développer et réduire pour obtenir $ax + by + c = 0$."
      ],
      exemple: "$A(3\\,;-2)$, $\\vec{u}(-2\\,;1)$ : $x + 2y + 1 = 0$."
    },
    {
      titre: "Autre méthode : avec $\\vec{u}(-b\\,;a)$",
      etapes: [
        "Lire $a$ et $b$ sur le vecteur directeur : $a = u_y$, $b = -u_x$.",
        "Écrire $ax + by + c = 0$.",
        "Trouver $c$ en remplaçant par les coordonnées de $A$."
      ],
      exemple: "$\\vec{u}(-2\\,;1)$ : $x + 2y + c = 0$ ; avec $A(3\\,;-2)$ : $3 - 4 + c = 0$, $c = 1$."
    },
    {
      titre: "Équation réduite par deux points",
      etapes: [
        "Calculer la pente $m = \\dfrac{y_B - y_A}{x_B - x_A}$.",
        "Remplacer les coordonnées de $A$ dans $y = mx + p$ pour trouver $p$.",
        "Vérifier avec $B$."
      ],
      exemple: "$A(-1\\,;-1)$, $B(1\\,;3)$ : $m = 2$, $p = 1$, $y = 2x + 1$."
    },
    {
      titre: "Intersection de deux droites",
      etapes: [
        "Comparer les pentes : égales, les droites sont parallèles.",
        "Sinon, résoudre $mx + p = m'x + p'$.",
        "Calculer $y$ avec l'une des deux équations, puis vérifier avec l'autre."
      ],
      exemple: "$2x - 3 = -x + 6$ : $x = 3$, $y = 3$."
    }
  ],
  erreurs: [
    "Prendre $\\begin{pmatrix} a \\\\ b \\end{pmatrix}$ comme vecteur directeur de $ax + by + c = 0$ : c'est $\\begin{pmatrix} -b \\\\ a \\end{pmatrix}$.",
    "Inverser la pente : $m = \\dfrac{y_B - y_A}{x_B - x_A}$, les $y$ en haut.",
    "Oublier de diviser **tous** les termes par $b$ en isolant $y$.",
    "Croire qu'une droite verticale a une équation réduite $y = \\ldots$ : c'est $x = k$.",
    "Conclure « parallèles » sans comparer les pentes, ou oublier de calculer $y$ pour le point d'intersection."
  ]
};
