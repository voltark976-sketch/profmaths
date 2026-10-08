/*
  CHAPITRE : Seconde — Vecteurs 2 : colinéarité et déterminant
  -------------------------------------------------------------
  Chapitre 11 de la progression spiralée 2026-2027 (programme de Seconde 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce, programme Python entre ```python et ```).
  Pas encore de vidéo de la chaîne ni de PDF pour ce chapitre : les vidéos sont celles d'Yvan Monka.
  Les générateurs d'exercices commencent par « co- » dans assets/exercices.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-colinearite"] = {
  niveau: "Seconde",
  numero: 11,
  titre: "Vecteurs 2 : colinéarité et déterminant",
  accroche: "Des bouées de balisage sont-elles alignées ? Deux trajectoires sont-elles parallèles ? Un seul calcul répond : le déterminant.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours « vecteurs et repérage » en vidéo (Yvan Monka)", url: "https://youtu.be/9OB3hct6gak", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Produit d'un vecteur par un réel",
      video: { titre: "Vidéo d'Yvan Monka : construire un point à partir d'une égalité vectorielle", youtube: "https://youtu.be/JxYpPE6iPEA" },
      texte:
        "Pour un réel $k$ et un vecteur $\\vec{u}$ non nul, $k\\vec{u}$ est le vecteur qui a :\n" +
        "- la **même direction** que $\\vec{u}$ ;\n" +
        "- le **même sens** si $k > 0$, le **sens contraire** si $k < 0$ ;\n" +
        "- une norme multipliée par $|k|$ : $\\|k\\vec{u}\\| = |k| \\times \\|\\vec{u}\\|$.\n\n" +
        "En coordonnées : si $\\vec{u}\\begin{pmatrix} x \\\\ y \\end{pmatrix}$, alors $k\\vec{u}\\begin{pmatrix} kx \\\\ ky \\end{pmatrix}$. Et $0\\vec{u} = \\vec{0}$.",
      exemple: {
        enonce: "$\\vec{u}\\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} -3 \\\\ 4 \\end{pmatrix}$. Calculer les coordonnées de $\\vec{w} = 3\\vec{u} - 2\\vec{v}$.",
        solution: "$3\\vec{u}\\begin{pmatrix} 6 \\\\ -3 \\end{pmatrix}$ et $-2\\vec{v}\\begin{pmatrix} 6 \\\\ -8 \\end{pmatrix}$, donc $\\vec{w}\\begin{pmatrix} 12 \\\\ -11 \\end{pmatrix}$."
      }
    },
    {
      titre: "Vecteurs colinéaires",
      figure: "colineaires",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que deux vecteurs sont colinéaires", youtube: "https://youtu.be/FjUbd9Pbhmg" },
      texte:
        "Deux vecteurs $\\vec{u}$ et $\\vec{v}$ sont **colinéaires** s'il existe un réel $k$ tel que $\\vec{v} = k\\vec{u}$ (ou $\\vec{u} = k\\vec{v}$). Ils ont alors la **même direction**.\n\n" +
        "- Le vecteur nul est colinéaire à tous les vecteurs.\n" +
        "- En coordonnées : les coordonnées de $\\vec{u}$ et de $\\vec{v}$ sont **proportionnelles**.\n" +
        "- Sur la figure, $\\vec{v} = -2\\vec{u}$ : même direction, sens contraire. $\\vec{w}$ n'est pas colinéaire à $\\vec{u}$.\n\n" +
        "**Caractérisation vectorielle du milieu** : $I$ est le milieu de $[AB]$ si et seulement si $\\overrightarrow{AI} = \\dfrac{1}{2}\\overrightarrow{AB}$, ou encore $\\overrightarrow{IA} + \\overrightarrow{IB} = \\vec{0}$.",
      exemple: {
        enonce: "$\\vec{u}\\begin{pmatrix} 4 \\\\ -6 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} -2 \\\\ 3 \\end{pmatrix}$ sont-ils colinéaires ?",
        solution: "$-\\dfrac{1}{2} \\times 4 = -2$ et $-\\dfrac{1}{2} \\times (-6) = 3$ : $\\vec{v} = -\\dfrac{1}{2}\\vec{u}$. Ils sont colinéaires, de sens contraires."
      }
    },
    {
      titre: "Le déterminant de deux vecteurs",
      video: { titre: "Vidéo d'Yvan Monka : vérifier la colinéarité à l'aide du déterminant", youtube: "https://youtu.be/MeHOuwy81-8" },
      texte:
        "Dans une base orthonormée, le **déterminant** de $\\vec{u}\\begin{pmatrix} x \\\\ y \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} x' \\\\ y' \\end{pmatrix}$ est le nombre :\n\n" +
        "$\\det(\\vec{u}, \\vec{v}) = \\begin{vmatrix} x & x' \\\\ y & y' \\end{vmatrix} = xy' - yx'$.\n\n" +
        "**Propriété** : $\\vec{u}$ et $\\vec{v}$ sont colinéaires **si et seulement si** $\\det(\\vec{u}, \\vec{v}) = 0$.\n\n" +
        "**Contraposée** : si $\\det(\\vec{u}, \\vec{v}) \\neq 0$, alors $\\vec{u}$ et $\\vec{v}$ ne sont pas colinéaires.",
      exemple: {
        enonce: "$\\vec{u}\\begin{pmatrix} 3 \\\\ 5 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} 6 \\\\ 9 \\end{pmatrix}$ sont-ils colinéaires ?",
        solution: "$\\det(\\vec{u}, \\vec{v}) = 3 \\times 9 - 5 \\times 6 = 27 - 30 = -3 \\neq 0$. Ils ne sont **pas** colinéaires (alors que $6 = 2 \\times 3$, on a $9 \\neq 2 \\times 5$)."
      }
    },
    {
      titre: "Démonstration : colinéarité et déterminant",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que colinéaires équivaut à déterminant nul", youtube: "https://youtu.be/VKMrzaiPtw4" },
      texte:
        "Soit $\\vec{u}\\begin{pmatrix} x \\\\ y \\end{pmatrix}$ non nul et $\\vec{v}\\begin{pmatrix} x' \\\\ y' \\end{pmatrix}$.\n\n" +
        "**Sens direct**. Si $\\vec{v} = k\\vec{u}$, alors $x' = kx$ et $y' = ky$, donc $xy' - yx' = x \\times ky - y \\times kx = 0$.\n\n" +
        "**Réciproque**. Supposons $xy' - yx' = 0$. Comme $\\vec{u} \\neq \\vec{0}$, l'une de ses coordonnées n'est pas nulle, par exemple $x \\neq 0$. On pose $k = \\dfrac{x'}{x}$ : alors $x' = kx$, et $xy' = yx' = ykx$, donc $y' = ky$ (on divise par $x \\neq 0$). Ainsi $\\vec{v} = k\\vec{u}$.\n\n" +
        "Les deux sens sont démontrés : c'est une **équivalence**.",
      exemple: {
        enonce: "Pourquoi faut-il démontrer les deux sens ?",
        solution: "Le sens direct dit : colinéaires $\\Rightarrow$ déterminant nul. La réciproque dit : déterminant nul $\\Rightarrow$ colinéaires. C'est la réciproque qu'on utilise pour **prouver** une colinéarité par le calcul."
      }
    },
    {
      titre: "Alignement et parallélisme",
      figure: "alignes",
      video: { titre: "Vidéo d'Yvan Monka : démontrer un alignement avec la colinéarité", youtube: "https://youtu.be/dZ81uKVDGpE" },
      texte:
        "- Les points $A$, $B$, $C$ sont **alignés** si et seulement si $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ sont colinéaires.\n" +
        "- Les droites $(AB)$ et $(CD)$ sont **parallèles** si et seulement si $\\overrightarrow{AB}$ et $\\overrightarrow{CD}$ sont colinéaires.\n\n" +
        "Dans les deux cas, on calcule les coordonnées des deux vecteurs, puis leur déterminant.",
      exemple: {
        enonce: "Trois bouées sont placées en $A(1\\,;2)$, $B(3\\,;5)$ et $C(7\\,;11)$. Sont-elles alignées ?",
        solution: "$\\overrightarrow{AB}\\begin{pmatrix} 2 \\\\ 3 \\end{pmatrix}$ et $\\overrightarrow{AC}\\begin{pmatrix} 6 \\\\ 9 \\end{pmatrix}$.\n\n$\\det = 2 \\times 9 - 3 \\times 6 = 0$ : les bouées sont alignées."
      }
    },
    {
      titre: "Décomposer un vecteur",
      video: { titre: "Vidéo d'Yvan Monka : exprimer un vecteur en fonction de deux autres", youtube: "https://youtu.be/ODZGKdIKewo" },
      texte:
        "Si $\\vec{u}$ et $\\vec{v}$ ne sont **pas** colinéaires, tout vecteur $\\vec{w}$ s'écrit de façon **unique** $\\vec{w} = a\\vec{u} + b\\vec{v}$ ($a$ et $b$ réels) : c'est une **combinaison linéaire** de $\\vec{u}$ et $\\vec{v}$.\n\n" +
        "Pour trouver $a$ et $b$ : par lecture sur un quadrillage, ou en écrivant l'égalité coordonnée par coordonnée.\n\n" +
        "Choisir la méthode la plus adaptée : figure, relation de Chasles, coordonnées…",
      exemple: {
        enonce: "$\\vec{u}\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$, $\\vec{v}\\begin{pmatrix} 3 \\\\ -1 \\end{pmatrix}$, $\\vec{w}\\begin{pmatrix} 5 \\\\ 3 \\end{pmatrix}$. Trouver $a$ et $b$ tels que $\\vec{w} = a\\vec{u} + b\\vec{v}$.",
        solution: "$a + 3b = 5$ et $2a - b = 3$. De la seconde, $b = 2a - 3$ ; dans la première : $a + 6a - 9 = 5$, donc $a = 2$ et $b = 1$. Ainsi $\\vec{w} = 2\\vec{u} + \\vec{v}$."
      }
    },
    {
      titre: "Python : tester l'alignement",
      texte:
        "On calcule les coordonnées de $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$, puis on teste si le déterminant est nul :\n\n" +
        "```python\ndef alignes(xA, yA, xB, yB, xC, yC):\n    x1, y1 = xB - xA, yB - yA\n    x2, y2 = xC - xA, yC - yA\n    return x1 * y2 - y1 * x2 == 0\n```\n\n" +
        "Attention : avec des nombres décimaux, l'ordinateur fait des arrondis ($\\texttt{0.1 + 0.2}$ ne vaut pas exactement $\\texttt{0.3}$). On préfère alors tester si le déterminant est **très proche** de $0$.",
      exemple: {
        enonce: "Que renvoie $\\texttt{alignes(1, 2, 3, 5, 7, 11)}$ ?",
        solution: "$x_1 = 2$, $y_1 = 3$, $x_2 = 6$, $y_2 = 9$ ; $2 \\times 9 - 3 \\times 6 = 0$ : la fonction renvoie $\\texttt{True}$."
      }
    }
  ],

  /* Exercices corrigés en vidéo */
  videos: [
    { titre: "Appliquer le critère de colinéarité", type: "Colinéarité", youtube: "https://youtu.be/eX-_639Pfw8" },
    { titre: "Démontrer un parallélisme avec la colinéarité", type: "Parallélisme", youtube: "https://youtu.be/hp8v6YAQQRI" },
    { titre: "Appliquer des formules sur les coordonnées des vecteurs", type: "Coordonnées", youtube: "https://youtu.be/rC3xJNCuzkw" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ----------
     Chaque série tire des nombres au hasard : on peut la refaire autant qu'on veut.
     type : nom du générateur (voir assets/exercices.js). nb : nombre de questions. */
  exercices: [
    { type: "co-produit", titre: "Coordonnées de au + bv", etape: "Produit par un réel", nb: 5 },
    { type: "co-determinant", titre: "Calculer un déterminant", etape: "Colinéarité", nb: 5 },
    { type: "co-colineaires", titre: "Colinéaires ou pas ?", etape: "Colinéarité", nb: 6 },
    { type: "co-parametre", titre: "Trouver m pour la colinéarité", etape: "Colinéarité", nb: 4 },
    { type: "co-alignes", titre: "Alignés ? Parallèles ?", etape: "Alignement et parallélisme", nb: 6 },
    { type: "co-combinaison", titre: "Décomposer w = au + bv", etape: "Alignement et parallélisme", nb: 3 },
    { type: "co-python", titre: "Python : tester l'alignement", etape: "Python", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ----------
     bonne : numéro de la bonne réponse en partant de 0 (0 = la première). */
  qcm: [
    {
      question: "$\\vec{u}\\begin{pmatrix} -2 \\\\ 5 \\end{pmatrix}$. Les coordonnées de $-3\\vec{u}$ sont :",
      choix: ["$\\begin{pmatrix} 6 \\\\ -15 \\end{pmatrix}$", "$\\begin{pmatrix} -6 \\\\ 15 \\end{pmatrix}$", "$\\begin{pmatrix} -5 \\\\ 2 \\end{pmatrix}$", "$\\begin{pmatrix} 6 \\\\ 15 \\end{pmatrix}$"],
      bonne: 0,
      explication: "On multiplie chaque coordonnée par $-3$ : $(-3) \\times (-2) = 6$ et $(-3) \\times 5 = -15$."
    },
    {
      question: "$\\vec{v} = -2\\vec{u}$ avec $\\vec{u} \\neq \\vec{0}$. Alors $\\vec{v}$ :",
      choix: ["a la même direction que $\\vec{u}$, le sens contraire et une norme double", "a le même sens que $\\vec{u}$", "est perpendiculaire à $\\vec{u}$", "a la même norme que $\\vec{u}$"],
      bonne: 0,
      explication: "$k = -2 < 0$ : même direction, sens contraire, norme multipliée par $|-2| = 2$."
    },
    {
      question: "$\\det(\\vec{u}, \\vec{v})$ avec $\\vec{u}\\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} 4 \\\\ 1 \\end{pmatrix}$ vaut :",
      choix: ["$-5$", "$5$", "$11$", "$14$"],
      bonne: 0,
      explication: "$xy' - yx' = 3 \\times 1 - 2 \\times 4 = 3 - 8 = -5$."
    },
    {
      question: "Deux vecteurs sont colinéaires si et seulement si :",
      choix: ["leur déterminant est nul", "leur déterminant vaut $1$", "ils ont la même norme", "leurs coordonnées sont égales"],
      bonne: 0,
      explication: "C'est la propriété du cours, démontrée dans les deux sens."
    },
    {
      question: "$\\vec{u}\\begin{pmatrix} 2 \\\\ 3 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} 6 \\\\ m \\end{pmatrix}$ sont colinéaires pour :",
      choix: ["$m = 9$", "$m = 4$", "$m = 6$", "$m = -9$"],
      bonne: 0,
      explication: "$2m - 3 \\times 6 = 0 \\iff m = 9$. On vérifie : $\\vec{v} = 3\\vec{u}$."
    },
    {
      question: "Pour prouver que $A$, $B$, $C$ sont alignés, on montre que :",
      choix: ["$\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ sont colinéaires", "$AB = AC$", "$\\overrightarrow{AB} = \\overrightarrow{AC}$", "$\\overrightarrow{AB}$ et $\\overrightarrow{BC}$ ont la même norme"],
      bonne: 0,
      explication: "Deux vecteurs colinéaires avec un point commun $A$ : les trois points sont sur une même droite."
    },
    {
      question: "$I$ est le milieu de $[AB]$ si et seulement si :",
      choix: ["$\\overrightarrow{IA} + \\overrightarrow{IB} = \\vec{0}$", "$\\overrightarrow{IA} = \\overrightarrow{IB}$", "$\\overrightarrow{AI} = 2\\overrightarrow{AB}$", "$IA + IB = 0$"],
      bonne: 0,
      explication: "$\\overrightarrow{IA}$ et $\\overrightarrow{IB}$ sont opposés. $\\overrightarrow{IA} = \\overrightarrow{IB}$ voudrait dire $A = B$."
    },
    {
      question: "La contraposée de « si $\\vec{u}$ et $\\vec{v}$ sont colinéaires, alors $\\det(\\vec{u}, \\vec{v}) = 0$ » est :",
      choix: ["si $\\det(\\vec{u}, \\vec{v}) \\neq 0$, alors $\\vec{u}$ et $\\vec{v}$ ne sont pas colinéaires", "si $\\det(\\vec{u}, \\vec{v}) = 0$, alors ils sont colinéaires", "si ils ne sont pas colinéaires, alors $\\det \\neq 0$", "$\\det(\\vec{u}, \\vec{v}) = 0$"],
      bonne: 0,
      explication: "Contraposée de « $P \\Rightarrow Q$ » : « non $Q \\Rightarrow$ non $P$ ». La 2e proposition est la réciproque."
    },
    { question: "$\\vec{u}\\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix}$. Les coordonnées de $3\\vec{u} - 2\\vec{v}$ sont :", choix: ["$\\begin{pmatrix} -3 \\\\ -8 \\end{pmatrix}$", "$\\begin{pmatrix} 9 \\\\ -4 \\end{pmatrix}$", "$\\begin{pmatrix} -3 \\\\ -4 \\end{pmatrix}$", "$\\begin{pmatrix} 3 \\\\ 8 \\end{pmatrix}$"], bonne: 0, explication: "$3\\vec{u}\\begin{pmatrix} 3 \\\\ -6 \\end{pmatrix}$ et $-2\\vec{v}\\begin{pmatrix} -6 \\\\ -2 \\end{pmatrix}$, donc $3 - 6 = -3$ et $-6 - 2 = -8$." },
    { question: "$\\|\\vec{u}\\| = 2$. La norme de $-3\\vec{u}$ vaut :", choix: ["$6$", "$-6$", "$2$", "$\\dfrac{2}{3}$"], bonne: 0, explication: "$\\|k\\vec{u}\\| = |k| \\times \\|\\vec{u}\\| = 3 \\times 2 = 6$. Une norme n'est jamais négative." },
    { question: "$\\vec{v} = 0{,}5\\vec{u}$ avec $\\vec{u} \\neq \\vec{0}$. Alors $\\vec{u}$ et $\\vec{v}$ :", choix: ["ont la même direction et le même sens", "ont la même direction et des sens contraires", "ont la même norme", "ne sont pas colinéaires"], bonne: 0, explication: "$k = 0{,}5 > 0$ : même direction, même sens, et la norme est divisée par $2$." },
    { question: "$\\det(\\vec{u}, \\vec{v})$ avec $\\vec{u}\\begin{pmatrix} -1 \\\\ 2 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$ vaut :", choix: ["$-10$", "$2$", "$10$", "$5$"], bonne: 0, explication: "$xy' - yx' = (-1) \\times 4 - 2 \\times 3 = -4 - 6 = -10$. ($2$ vient d'une somme au lieu d'une différence.)" },
    { question: "$\\vec{u}\\begin{pmatrix} 4 \\\\ -6 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} -6 \\\\ 9 \\end{pmatrix}$ :", choix: ["sont colinéaires, avec $\\vec{v} = -\\dfrac{3}{2}\\vec{u}$", "ne sont pas colinéaires, car leur déterminant vaut $72$", "sont colinéaires, avec $\\vec{v} = \\dfrac{3}{2}\\vec{u}$", "ne sont pas colinéaires, car leurs coordonnées n'ont pas les mêmes signes"], bonne: 0, explication: "$\\det = 4 \\times 9 - (-6) \\times (-6) = 36 - 36 = 0$ : colinéaires. Et $-\\dfrac{3}{2} \\times 4 = -6$, $-\\dfrac{3}{2} \\times (-6) = 9$." },
    { question: "Vrai ou faux : le vecteur nul est colinéaire à tous les vecteurs.", choix: ["Vrai", "Faux"], bonne: 0, explication: "Pour tout $\\vec{u}$, $\\vec{0} = 0\\vec{u}$. D'ailleurs $\\det(\\vec{u}, \\vec{0}) = x \\times 0 - y \\times 0 = 0$." },
    { question: "$\\vec{u}\\begin{pmatrix} m \\\\ 2 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} 6 \\\\ 3 \\end{pmatrix}$ sont colinéaires pour :", choix: ["$m = 4$", "$m = 9$", "$m = 1$", "$m = -4$"], bonne: 0, explication: "$\\det = 3m - 2 \\times 6 = 3m - 12 = 0 \\iff m = 4$. On vérifie : $\\vec{v} = \\dfrac{3}{2}\\vec{u}$ avec $\\vec{u}\\begin{pmatrix} 4 \\\\ 2 \\end{pmatrix}$." },
    { question: "$A(1\\,;1)$, $B(2\\,;3)$ et $C(4\\,;6)$. Les points $A$, $B$, $C$ :", choix: ["ne sont pas alignés, car $\\det(\\overrightarrow{AB}, \\overrightarrow{AC}) = -1$", "sont alignés, car $\\det(\\overrightarrow{AB}, \\overrightarrow{AC}) = -1$", "sont alignés, car sur une figure ils semblent sur une même droite", "sont alignés, car $\\det(\\overrightarrow{AB}, \\overrightarrow{AC}) = 11$"], bonne: 0, explication: "$\\overrightarrow{AB}\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$, $\\overrightarrow{AC}\\begin{pmatrix} 3 \\\\ 5 \\end{pmatrix}$ : $1 \\times 5 - 2 \\times 3 = -1 \\neq 0$. Ils sont presque alignés, d'où le piège de la figure." },
    { question: "$A(1\\,;2)$ et $B(3\\,;6)$. Le point $C(5\\,;y)$ est aligné avec $A$ et $B$ pour :", choix: ["$y = 10$", "$y = 8$", "$y = 12$", "$y = 6$"], bonne: 0, explication: "$\\overrightarrow{AB}\\begin{pmatrix} 2 \\\\ 4 \\end{pmatrix}$ et $\\overrightarrow{AC}\\begin{pmatrix} 4 \\\\ y - 2 \\end{pmatrix}$ : $2(y - 2) - 4 \\times 4 = 0 \\iff y - 2 = 8 \\iff y = 10$." },
    { question: "$A(0\\,;0)$, $B(1\\,;3)$, $C(2\\,;1)$ et $D(4\\,;7)$. Les droites $(AB)$ et $(CD)$ sont :", choix: ["parallèles", "sécantes", "confondues", "perpendiculaires"], bonne: 0, explication: "$\\overrightarrow{AB}\\begin{pmatrix} 1 \\\\ 3 \\end{pmatrix}$, $\\overrightarrow{CD}\\begin{pmatrix} 2 \\\\ 6 \\end{pmatrix}$ : $1 \\times 6 - 3 \\times 2 = 0$. Elles ne sont pas confondues : $\\det(\\overrightarrow{AB}, \\overrightarrow{AC}) = 1 \\times 1 - 3 \\times 2 = -5 \\neq 0$." },
    { question: "$\\vec{u}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$, $\\vec{v}\\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}$ et $\\vec{w}\\begin{pmatrix} 5 \\\\ 1 \\end{pmatrix}$. On a :", choix: ["$\\vec{w} = 3\\vec{u} + 2\\vec{v}$", "$\\vec{w} = 2\\vec{u} + 3\\vec{v}$", "$\\vec{w} = 5\\vec{u} + \\vec{v}$", "$\\vec{w} = 3\\vec{u} - 2\\vec{v}$"], bonne: 0, explication: "$a + b = 5$ et $a - b = 1$ donnent $a = 3$ et $b = 2$. Vérification : $3 + 2 = 5$ et $3 - 2 = 1$." },
    { question: "$I$ est le milieu de $[AB]$. Alors $\\overrightarrow{AI}$ est égal à :", choix: ["$\\dfrac{1}{2}\\overrightarrow{AB}$", "$2\\overrightarrow{AB}$", "$\\overrightarrow{BI}$", "$-\\dfrac{1}{2}\\overrightarrow{AB}$"], bonne: 0, explication: "On va de $A$ vers $B$ en s'arrêtant à mi-chemin. $\\overrightarrow{BI}$ est l'opposé de $\\overrightarrow{AI}$." },
    { question: "Pour prouver par le calcul que deux vecteurs sont colinéaires, on utilise :", choix: ["la réciproque : si $\\det(\\vec{u}, \\vec{v}) = 0$, alors ils sont colinéaires", "le sens direct : s'ils sont colinéaires, alors $\\det(\\vec{u}, \\vec{v}) = 0$", "la contraposée : si $\\det(\\vec{u}, \\vec{v}) \\neq 0$, alors ils ne sont pas colinéaires", "une figure bien faite"], bonne: 0, explication: "On calcule le déterminant ; s'il est nul, c'est la réciproque qui permet de conclure à la colinéarité. La contraposée sert à prouver qu'ils ne le sont pas." },
    { question: "Que renvoie $\\texttt{alignes(0, 0, 1, 2, 3, 6)}$, avec la fonction Python du cours ?", choix: ["$\\texttt{True}$", "$\\texttt{False}$", "$\\texttt{0}$", "$\\texttt{6}$"], bonne: 0, explication: "$\\overrightarrow{AB}\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$, $\\overrightarrow{AC}\\begin{pmatrix} 3 \\\\ 6 \\end{pmatrix}$ et $1 \\times 6 - 2 \\times 3 = 0$ : le test $\\texttt{== 0}$ est vrai, la fonction renvoie $\\texttt{True}$." },
    { question: "En Python, pourquoi teste-t-on parfois si un déterminant est « très proche » de $0$ plutôt qu'égal à $0$ ?", choix: ["à cause des arrondis de l'ordinateur sur les nombres décimaux", "parce qu'un déterminant n'est jamais exactement nul", "pour que le programme aille plus vite", "parce que Python ne sait pas multiplier des entiers"], bonne: 0, explication: "Avec des décimaux, l'ordinateur arrondit : $\\texttt{0.1 + 0.2}$ ne vaut pas exactement $\\texttt{0.3}$, et un déterminant nul peut donner un tout petit nombre." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Tester la colinéarité de deux vecteurs",
      etapes: [
        "Écrire les coordonnées des deux vecteurs.",
        "Calculer $\\det(\\vec{u}, \\vec{v}) = xy' - yx'$.",
        "Nul : colinéaires. Non nul : pas colinéaires."
      ],
      exemple: "$\\begin{pmatrix} 4 \\\\ -6 \\end{pmatrix}$ et $\\begin{pmatrix} -2 \\\\ 3 \\end{pmatrix}$ : $4 \\times 3 - (-6) \\times (-2) = 0$, colinéaires."
    },
    {
      titre: "Démontrer un alignement",
      etapes: [
        "Calculer les coordonnées de $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$.",
        "Calculer leur déterminant.",
        "Conclure : nul $\\iff$ $A$, $B$, $C$ alignés."
      ],
      exemple: "$A(1\\,;2)$, $B(3\\,;5)$, $C(7\\,;11)$ : $\\det = 2 \\times 9 - 3 \\times 6 = 0$, alignés."
    },
    {
      titre: "Démontrer un parallélisme",
      etapes: [
        "Calculer les coordonnées de $\\overrightarrow{AB}$ et $\\overrightarrow{CD}$.",
        "Calculer leur déterminant.",
        "Nul : $(AB) \\parallel (CD)$. Sinon, les droites sont sécantes."
      ],
      exemple: "$\\overrightarrow{AB}\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$, $\\overrightarrow{CD}\\begin{pmatrix} -4 \\\\ -2 \\end{pmatrix}$ : $\\det = -4 + 4 = 0$, parallèles."
    },
    {
      titre: "Trouver un paramètre",
      etapes: [
        "Écrire le déterminant en fonction du paramètre $m$.",
        "Résoudre l'équation « déterminant $= 0$ ».",
        "Vérifier en trouvant $k$ tel que $\\vec{v} = k\\vec{u}$."
      ],
      exemple: "$\\begin{pmatrix} 2 \\\\ 3 \\end{pmatrix}$, $\\begin{pmatrix} 6 \\\\ m \\end{pmatrix}$ : $2m - 18 = 0$, $m = 9$."
    }
  ],
  erreurs: [
    "Inverser l'ordre dans le déterminant : c'est $xy' - yx'$.",
    "Écrire une somme au lieu d'une différence : $xy' + yx'$ n'est pas le déterminant.",
    "Conclure « colinéaires » parce qu'une seule coordonnée est proportionnelle.",
    "Prendre $\\overrightarrow{AB}$ et $\\overrightarrow{CD}$ pour un alignement : il faut un point commun ($\\overrightarrow{AB}$ et $\\overrightarrow{AC}$).",
    "Confondre réciproque et contraposée."
  ]
};
