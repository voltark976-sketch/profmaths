/*
  CHAPITRE : Première spécialité — Fonctions polynômes du second degré
  (formes développée, canonique et factorisée, discriminant, signe)
  ------------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce). Dans les formules, la virgule décimale s'écrit {,} : $0{,}35$.
  video : vidéo d'aide affichée sous une notion (vidéos d'Yvan Monka citées dans les livrets).
  liens : ressources en ligne facultatives (Jeuxmaths), affichées sous les PDF.
  Les corrigés du Drive sont réservés au professeur (Pronote) : ils ne sont pas liés ici.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-second-degre"] = {
  niveau: "Première spécialité",
  numero: 2,
  titre: "Second degré, formes factorisée et canonique",
  accroche: "Trois écritures pour une même fonction, le discriminant, le signe du trinôme et des problèmes à modéliser, du jardin créole à N'Gouja.",

  playlist: "",
  drive: "https://drive.google.com/drive/folders/1Jw7zQe-wQDLffgycdEJuUw56iU26NGsM",
  pdfs: [
    {
      titre: "Livret élève : formes développée, canonique et factorisée",
      url: "https://drive.google.com/file/d/1rryaVPvC2IRRHjYga5P2UGewdiqDGhs8/view"
    },
    {
      titre: "Dossier élève : forme factorisée",
      url: "https://drive.google.com/file/d/1Zk2BClkgiNdGVu8luXXi_gnIAdd_CrBk/view"
    },
    {
      titre: "Énoncés des 4 exercices corrigés en vidéo",
      url: "https://drive.google.com/file/d/13EQuWAGkNRVNSXuhjc-z1atSD5OfTD5m/view"
    }
  ],
  liens: [
    { titre: "Jeuxmaths : vrai ou faux sur le second degré", url: "https://www.jeuxmaths.fr/exercice-de-math-vrai-faux-seconddegre.html" },
    { titre: "Jeuxmaths : équations du second degré", url: "https://www.jeuxmaths.fr/exoshtml5/equations-second-degre.html" },
    { titre: "Jeuxmaths : inéquations du second degré", url: "https://www.jeuxmaths.fr/exoshtml5/inequations-second-degre.html" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Trois écritures pour une même fonction",
      video: { titre: "Vidéo de ton prof : développée, canonique ou factorisée ?", youtube: "https://youtu.be/um5vzSymAr4" },
      texte:
        "Une **fonction polynôme du second degré** est définie sur $\\mathbb{R}$ par $f(x) = ax^2 + bx + c$, avec $a$, $b$, $c$ réels et $a \\neq 0$. Sa courbe est une **parabole**.\n\n" +
        "- **Forme développée** $ax^2 + bx + c$ : on lit $f(0) = c$.\n" +
        "- **Forme canonique** $a(x - \\alpha)^2 + \\beta$ : on lit le sommet $S(\\alpha\\,;\\beta)$ et l'extremum.\n" +
        "- **Forme factorisée** $a(x - x_1)(x - x_2)$, quand il y a des racines : on lit les racines.\n\n" +
        "Le coefficient $a$ est le même dans les trois formes. On choisit l'écriture la plus pratique selon la question.",
      exemple: {
        enonce: "On admet que $p(x) = x^2 - 4x - 5 = (x - 2)^2 - 9 = (x + 1)(x - 5)$. Calcule $p(0)$, résous $p(x) = 0$ et donne le minimum de $p$.",
        solution: "Forme développée : $p(0) = -5$. Forme factorisée : $p(x) = 0 \\iff x = -1$ ou $x = 5$. Forme canonique : $(x - 2)^2 \\geqslant 0$ donc $p(x) \\geqslant -9$, minimum $-9$ atteint en $x = 2$."
      }
    },
    {
      titre: "Forme canonique, sommet et variations",
      texte:
        "Toute fonction du second degré s'écrit $f(x) = a(x - \\alpha)^2 + \\beta$ avec\n\n" +
        "$\\alpha = -\\dfrac{b}{2a}$ et $\\beta = f(\\alpha)$.\n\n" +
        "- La parabole a pour **sommet** $S(\\alpha\\,;\\beta)$ et pour **axe de symétrie** la droite $x = \\alpha$.\n" +
        "- Si $a > 0$ : $f$ décroît sur $]-\\infty\\,;\\alpha]$ puis croît sur $[\\alpha\\,;+\\infty[$ ; $\\beta$ est un **minimum**.\n" +
        "- Si $a < 0$ : $f$ croît puis décroît ; $\\beta$ est un **maximum**.\n\n" +
        "L'extremum est une **image** ($\\beta$) ; l'endroit où il est atteint est une **abscisse** ($\\alpha$).",
      figure: "parabole-canonique",
      video: { titre: "Vidéo d'Yvan Monka : déterminer la forme canonique", youtube: "https://youtu.be/JcT6kph74O0" },
      exemple: {
        enonce: "Détermine la forme canonique de $f(x) = 2x^2 + 4x - 1$.",
        solution: "$\\alpha = -\\dfrac{4}{2 \\times 2} = -1$ et $\\beta = f(-1) = 2 - 4 - 1 = -3$. Donc $f(x) = 2(x + 1)^2 - 3$. Vérification : $2(x^2 + 2x + 1) - 3 = 2x^2 + 4x - 1$."
      }
    },
    {
      titre: "Discriminant et équations",
      texte:
        "Pour résoudre $ax^2 + bx + c = 0$, on regroupe tout dans le membre de gauche, puis on calcule le **discriminant** $\\Delta = b^2 - 4ac$.\n\n" +
        "- $\\Delta > 0$ : deux solutions $x_1 = \\dfrac{-b - \\sqrt{\\Delta}}{2a}$ et $x_2 = \\dfrac{-b + \\sqrt{\\Delta}}{2a}$.\n" +
        "- $\\Delta = 0$ : une solution (racine double) $x_0 = -\\dfrac{b}{2a}$.\n" +
        "- $\\Delta < 0$ : aucune solution réelle.\n\n" +
        "Avant de calculer $\\Delta$, regarder si une factorisation simple suffit : $x^2 - 7x = x(x - 7)$, $4x^2 - 25 = (2x - 5)(2x + 5)$.",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation du second degré", youtube: "https://youtu.be/youUIZ-wsYk" },
      exemple: {
        enonce: "Résous $2x^2 - 5x + 2 = 0$ puis $x^2 - 2x - 1 = 0$.",
        solution: "$\\Delta = 25 - 16 = 9$ : $x_1 = \\dfrac{5 - 3}{4} = \\dfrac{1}{2}$ et $x_2 = \\dfrac{5 + 3}{4} = 2$.\n\n$\\Delta = 4 + 4 = 8$ : $x = \\dfrac{2 \\pm \\sqrt{8}}{2} = 1 \\pm \\sqrt{2}$."
      }
    },
    {
      titre: "Forme factorisée, somme et produit des racines",
      texte:
        "- Si $\\Delta > 0$ : $f(x) = a(x - x_1)(x - x_2)$. Si $\\Delta = 0$ : $f(x) = a(x - x_0)^2$. Si $\\Delta < 0$ : pas de factorisation en facteurs du premier degré réels.\n" +
        "- Les racines se lisent directement : dans $(x + 3)$, la racine est $-3$.\n" +
        "- **Somme et produit** : $x_1 + x_2 = -\\dfrac{b}{a}$ et $x_1 x_2 = \\dfrac{c}{a}$. Réciproquement, deux nombres de somme $s$ et de produit $p$ sont les racines de $x^2 - sx + p$.\n" +
        "- Avec une racine « évidente » ($1$, $-1$, $2$…), le produit donne l'autre, sans discriminant.",
      video: { titre: "Vidéo d'Yvan Monka : déterminer une fonction à partir de ses racines", youtube: "https://youtu.be/JiokX41_2nw" },
      exemple: {
        enonce: "Vérifie que $2$ est racine de $3x^2 - 7x + 2$, puis factorise.",
        solution: "$3 \\times 4 - 14 + 2 = 0$. Le produit des racines vaut $\\dfrac{2}{3}$, donc l'autre racine est $\\dfrac{1}{3}$ et $3x^2 - 7x + 2 = 3(x - 2)\\left(x - \\dfrac{1}{3}\\right)$."
      }
    },
    {
      titre: "Signe du trinôme et inéquations",
      texte:
        "- **Deux racines** $x_1 < x_2$ : le trinôme est **du signe de $a$ à l'extérieur** des racines, **du signe contraire entre** les racines.\n" +
        "- **Racine double** : du signe de $a$ partout, nul seulement en $x_0$.\n" +
        "- **Aucune racine** : strictement du signe de $a$ sur tout $\\mathbb{R}$.\n\n" +
        "Pour résoudre une inéquation : tout ramener à $0$, chercher les racines, dresser le tableau de signes, choisir les intervalles. Les racines sont incluses seulement si l'inégalité est large.\n\n" +
        "Ne pas confondre le signe de $\\Delta$ (le nombre de racines) et le signe de $f(x)$.",
      figure: "parabole-factorisee",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une inéquation en étudiant le signe d'un trinôme", youtube: "https://youtu.be/AEL4qKKNvp8" },
      exemple: {
        enonce: "Résous $x^2 + x \\leqslant 2$.",
        solution: "$x^2 + x - 2 \\leqslant 0$, et $x^2 + x - 2 = (x + 2)(x - 1)$. Racines $-2$ et $1$, $a = 1 > 0$ : négatif ou nul entre les racines. $S = [-2\\,;1]$."
      }
    },
    {
      titre: "Position de deux courbes",
      video: { titre: "Vidéo d'Yvan Monka : étudier la position relative de deux courbes", youtube: "https://youtu.be/OWoaJjL9Hy4" },
      texte:
        "Pour comparer les courbes de $f$ et $g$ :\n\n" +
        "- les **points communs** ont pour abscisses les solutions de $f(x) = g(x)$, soit $f(x) - g(x) = 0$ ;\n" +
        "- la courbe de $f$ est **au-dessus** de celle de $g$ là où $f(x) - g(x) \\geqslant 0$.\n\n" +
        "On étudie donc le signe de $f(x) - g(x)$, qui est souvent un trinôme.",
      exemple: {
        enonce: "$f(x) = x^2$ et $g(x) = 4x - 4$. Étudie la position des deux courbes.",
        solution: "$f(x) - g(x) = x^2 - 4x + 4 = (x - 2)^2 \\geqslant 0$. La parabole est toujours au-dessus de la droite, avec un seul point commun $(2\\,;4)$ : la droite est tangente à la parabole."
      }
    },
    {
      titre: "Modéliser et optimiser",
      texte:
        "Beaucoup de problèmes concrets (aire, bénéfice, hauteur d'un objet lancé) se modélisent par une fonction du second degré.\n\n" +
        "- Le **maximum** ou le **minimum** se lit sur la forme canonique, au sommet.\n" +
        "- « Au moins… », « plus de… » se traduisent par une **inéquation**.\n" +
        "- On vérifie toujours que la réponse a du sens dans le contexte (longueur positive, nombre entier de lots…).",
      figure: "enclos",
      video: { titre: "Vidéo d'Yvan Monka : factoriser une expression du second degré", youtube: "https://youtu.be/T9T4IeYGEe4" },
      exemple: {
        enonce: "Avec $40$ m de clôture, Zaïna entoure trois côtés d'un enclos rectangulaire pour son jardin créole ; le quatrième côté est un mur. Avec $x$ la longueur d'un côté perpendiculaire au mur, l'aire vaut $A(x) = x(40 - 2x)$. Quelle aire maximale ?",
        solution: "$A(x) = -2x^2 + 40x = -2(x - 10)^2 + 200$. Comme $a = -2 < 0$, le maximum est $200$ m², pour $x = 10$ m (et $20$ m le long du mur).\n\nAire d'au moins $150$ m² : $(x - 10)^2 \\leqslant 25$, soit $x \\in [5\\,;15]$."
      }
    }
  ],

  videos: [
    { titre: "Exercice 1 · Racines et forme développée", type: "Application", youtube: "https://youtu.be/ZAp3Z1pdFiY" },
    { titre: "Exercice 2 · Identité ou équation ?", type: "Raisonnement", youtube: "https://youtu.be/tpadBfbxTt0" },
    { titre: "Exercice 3 · Résoudre des inéquations", type: "Méthode", youtube: "https://youtu.be/xpcwo2134yI" },
    { titre: "Exercice 4 · Factoriser pour résoudre", type: "Synthèse", youtube: "https://youtu.be/QYNlY_BFeUE" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "sd-canonique-lire", titre: "Lire une forme canonique", etape: "Forme canonique", nb: 5 },
    { type: "sd-canonique-construire", titre: "Trouver la forme canonique", etape: "Forme canonique", nb: 5 },
    { type: "sd-variations", titre: "Variations d'une fonction du second degré", etape: "Forme canonique", nb: 5 },
    { type: "sd-sommet", titre: "Sommet et extremum depuis les racines", etape: "Forme canonique", nb: 4 },
    { type: "sd-discriminant", titre: "Calculer un discriminant", etape: "Discriminant et équations", nb: 5 },
    { type: "sd-nb-racines", titre: "Combien de racines ?", etape: "Discriminant et équations", nb: 5 },
    { type: "sd-resoudre", titre: "Résoudre une équation du second degré", etape: "Discriminant et équations", nb: 6 },
    { type: "sd-racines", titre: "Lire les racines", etape: "Forme factorisée", nb: 5 },
    { type: "sd-developper", titre: "Développer une forme factorisée", etape: "Forme factorisée", nb: 5 },
    { type: "sd-somme-produit", titre: "Racines par somme et produit", etape: "Forme factorisée", nb: 5 },
    { type: "sd-inequation", titre: "Inéquation sous forme factorisée", etape: "Signe et inéquations", nb: 5 },
    { type: "sd-inequation-delta", titre: "Inéquation sous forme développée", etape: "Signe et inéquations", nb: 6 },
    { type: "sd-intersection", titre: "Points communs à deux courbes", etape: "Défi", nb: 4 },
    { type: "sd-trouver-a", titre: "Retrouver la fonction", etape: "Défi", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    {
      question: "Quelle est la forme canonique de $x^2 - 6x + 5$ ?",
      choix: ["$(x - 3)^2 + 5$", "$(x + 3)^2 - 4$", "$(x - 3)^2 - 4$", "$(x - 6)^2 + 5$"],
      bonne: 2,
      explication: "$\\alpha = -\\dfrac{-6}{2} = 3$ et $\\beta = f(3) = 9 - 18 + 5 = -4$."
    },
    {
      question: "$f(x) = 2(x - 1)^2 - 3$. Que peut-on dire de $f$ ?",
      choix: ["Minimum $-3$ atteint en $1$", "Maximum $-3$ atteint en $1$", "Minimum $1$ atteint en $-3$", "Minimum $-3$ atteint en $-1$"],
      bonne: 0,
      explication: "$a = 2 > 0$ : minimum $\\beta = -3$, atteint en $\\alpha = 1$."
    },
    {
      question: "$g(x) = -(x + 2)^2 + 5$. Sur quel intervalle $g$ est-elle croissante ?",
      choix: ["$[-2\\,;+\\infty[$", "$]-\\infty\\,;-2]$", "$]-\\infty\\,;2]$", "$[5\\,;+\\infty[$"],
      bonne: 1,
      explication: "$\\alpha = -2$ et $a = -1 < 0$ : $g$ croît sur $]-\\infty\\,;-2]$ puis décroît."
    },
    {
      question: "Quelle est l'abscisse du sommet de la parabole de $f(x) = (x + 3)(x - 7)$ ?",
      choix: ["$5$", "$-2$", "$2$", "$-21$"],
      bonne: 2,
      explication: "$\\alpha = \\dfrac{-3 + 7}{2} = 2$, le milieu des racines."
    },
    {
      question: "Quel est le discriminant de $2x^2 - 3x - 2$ ?",
      choix: ["$-7$", "$25$", "$-25$", "$7$"],
      bonne: 1,
      explication: "$\\Delta = (-3)^2 - 4 \\times 2 \\times (-2) = 9 + 16 = 25$."
    },
    {
      question: "Un élève résout $2x^2 - 3x - 2 = 0$ et trouve $\\Delta = 25$, puis $x = \\dfrac{3 \\pm 5}{2}$. Où est l'erreur ?",
      choix: ["Dans le calcul de $\\Delta$", "Il faut diviser par $2a = 4$, pas par $2$", "Il faut prendre $-3$ au lieu de $3$", "Il n'y a pas d'erreur"],
      bonne: 1,
      explication: "$x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a} = \\dfrac{3 \\pm 5}{4}$, soit $-\\dfrac{1}{2}$ et $2$."
    },
    {
      question: "Combien de solutions réelles a l'équation $3x^2 + 2x + 1 = 0$ ?",
      choix: ["Aucune", "Une", "Deux", "Une infinité"],
      bonne: 0,
      explication: "$\\Delta = 4 - 12 = -8 < 0$ : aucune solution réelle."
    },
    {
      question: "Les solutions de $x^2 + 6x + 9 = 0$ sont…",
      choix: ["$3$", "$-3$", "$-3$ et $3$", "aucune"],
      bonne: 1,
      explication: "$x^2 + 6x + 9 = (x + 3)^2$ : racine double $-3$ (et $\\Delta = 36 - 36 = 0$)."
    },
    {
      question: "Pour résoudre $x^2 = 7x$, quelle est la bonne méthode ?",
      choix: ["Diviser par $x$ : $x = 7$", "Écrire $x(x - 7) = 0$ : $x = 0$ ou $x = 7$", "Prendre la racine : $x = \\sqrt{7x}$", "Il n'y a pas de solution"],
      bonne: 1,
      explication: "Diviser par $x$ fait perdre la solution $x = 0$. On factorise et on applique le produit nul."
    },
    {
      question: "Quelles sont les racines de $f(x) = 3(x - 2)(x + 5)$ ?",
      choix: ["$2$ et $-5$", "$-2$ et $5$", "$3$, $2$ et $-5$", "$6$ et $-15$"],
      bonne: 0,
      explication: "Produit nul : $x - 2 = 0$ ou $x + 5 = 0$. Le coefficient $3$ ne s'annule jamais."
    },
    {
      question: "Les racines de $x^2 - x - 12$ sont…",
      choix: ["$3$ et $-4$", "$-3$ et $4$", "$2$ et $-6$", "$-2$ et $6$"],
      bonne: 1,
      explication: "Somme $1$ et produit $-12$ : $-3 + 4 = 1$ et $-3 \\times 4 = -12$."
    },
    {
      question: "Quelle fonction a pour racines $-1$ et $4$ et vérifie $f(0) = 8$ ?",
      choix: ["$f(x) = (x + 1)(x - 4)$", "$f(x) = -2(x + 1)(x - 4)$", "$f(x) = 2(x + 1)(x - 4)$", "$f(x) = -2(x - 1)(x + 4)$"],
      bonne: 1,
      explication: "$f(x) = a(x + 1)(x - 4)$ et $f(0) = -4a = 8$, donc $a = -2$."
    },
    {
      question: "$f(x) = -2(x - 1)(x - 5)$. Sur quel ensemble a-t-on $f(x) > 0$ ?",
      choix: ["$]-\\infty\\,;1[ \\cup ]5\\,;+\\infty[$", "$]1\\,;5[$", "$[1\\,;5]$", "$]-\\infty\\,;5[$"],
      bonne: 1,
      explication: "$a < 0$ : négatif à l'extérieur des racines, **positif entre** elles."
    },
    {
      question: "Les solutions de $2x^2 + 2x + 3 \\leqslant 0$ sont…",
      choix: ["$\\mathbb{R}$", "$\\varnothing$", "$[-1\\,;0]$", "$\\left\\{-\\dfrac{1}{2}\\right\\}$"],
      bonne: 1,
      explication: "$\\Delta = 4 - 24 < 0$ et $a > 0$ : le trinôme est strictement positif partout, jamais négatif ou nul."
    },
    {
      question: "Les solutions de $-x^2 + 4x - 4 \\geqslant 0$ sont…",
      choix: ["$\\mathbb{R}$", "$\\varnothing$", "$\\{2\\}$", "$[2\\,;+\\infty[$"],
      bonne: 2,
      explication: "$-x^2 + 4x - 4 = -(x - 2)^2$ : toujours négatif, nul seulement en $2$."
    },
    {
      question: "Vrai ou faux : « si le discriminant est positif, le trinôme est positif ».",
      choix: ["Vrai", "Faux"],
      bonne: 1,
      explication: "Faux : $\\Delta > 0$ indique seulement deux racines. Par exemple $x^2 - 1$ ($\\Delta = 4$) est négatif entre $-1$ et $1$."
    },
    {
      question: "Vrai ou faux : « si un trinôme a un minimum strictement positif, il n'a aucune racine réelle ».",
      choix: ["Vrai", "Faux"],
      bonne: 0,
      explication: "Vrai : toutes ses valeurs sont supérieures ou égales au minimum, donc strictement positives ; il ne s'annule jamais."
    },
    {
      question: "La parabole de $f(x) = x^2$ et la droite d'équation $y = 4x - 4$ ont…",
      choix: ["aucun point commun", "un seul point commun", "deux points communs", "une infinité de points communs"],
      bonne: 1,
      explication: "$x^2 - 4x + 4 = (x - 2)^2 = 0$ a une seule solution : un point commun $(2\\,;4)$."
    },
    {
      question: "Une balle a pour hauteur $h(t) = -5t^2 + 20t + 1$ (en m, $t$ en s). Quelle est sa hauteur maximale ?",
      choix: ["$1$ m", "$2$ m", "$21$ m", "$41$ m"],
      bonne: 2,
      explication: "$\\alpha = -\\dfrac{20}{-10} = 2$ et $h(2) = -20 + 40 + 1 = 21$ m."
    },
    {
      question: "Quelle est une forme factorisée de $9x^2 - 25$ ?",
      choix: ["$(9x - 25)(9x + 25)$", "$(3x - 5)^2$", "$(3x - 5)(3x + 5)$", "$9(x - 5)(x + 5)$"],
      bonne: 2,
      explication: "$a^2 - b^2 = (a - b)(a + b)$ avec $a = 3x$ et $b = 5$."
    }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Obtenir la forme canonique",
      etapes: [
        "Repérer $a$, $b$ et $c$ dans la forme développée.",
        "Calculer $\\alpha = -\\dfrac{b}{2a}$, puis $\\beta = f(\\alpha)$.",
        "Écrire $f(x) = a(x - \\alpha)^2 + \\beta$ et vérifier en développant."
      ],
      exemple: "$h(x) = -x^2 + 6x - 2$ : $\\alpha = 3$, $\\beta = h(3) = 7$, donc $h(x) = -(x - 3)^2 + 7$."
    },
    {
      titre: "Dresser le tableau de variations",
      etapes: [
        "Trouver $\\alpha$ et $\\beta$ (forme canonique, ou $\\alpha = -\\dfrac{b}{2a}$).",
        "Regarder le signe de $a$ : $a > 0$, la flèche descend puis monte ; $a < 0$, elle monte puis descend.",
        "Placer $\\beta$ sous $\\alpha$ et conclure : minimum ou maximum $\\beta$ atteint en $\\alpha$."
      ],
      exemple: "$g(x) = -2(x + 1)^2 + 8$ : croissante sur $]-\\infty\\,;-1]$, décroissante ensuite, maximum $8$ en $-1$."
    },
    {
      titre: "Résoudre une équation du second degré",
      etapes: [
        "Tout ramener dans le membre de gauche pour obtenir $ax^2 + bx + c = 0$.",
        "Chercher d'abord une factorisation simple (facteur commun, identité remarquable).",
        "Sinon, calculer $\\Delta = b^2 - 4ac$ en mettant les négatifs entre parenthèses.",
        "Selon le signe de $\\Delta$ : deux solutions $\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$, une solution $-\\dfrac{b}{2a}$, ou aucune.",
        "Vérifier une solution en la remplaçant dans l'équation de départ."
      ],
      exemple: "$x^2 + 2x = 8 \\iff x^2 + 2x - 8 = 0$ : $\\Delta = 36$, $x = \\dfrac{-2 \\pm 6}{2}$, soit $-4$ ou $2$."
    },
    {
      titre: "Passer de la forme factorisée à la forme développée",
      etapes: [
        "Développer d'abord le produit des deux parenthèses (double distributivité).",
        "Réduire, **puis** multiplier chaque terme par $a$.",
        "Contrôler : le coefficient de $x^2$ vaut $a$ et le terme constant vaut $f(0)$."
      ],
      exemple: "$-3(x + 2)(x - 1) = -3(x^2 + x - 2) = -3x^2 - 3x + 6$."
    },
    {
      titre: "Déterminer une fonction connaissant ses racines",
      etapes: [
        "Écrire $f(x) = a(x - x_1)(x - x_2)$ avec $a$ inconnu.",
        "Utiliser le point connu $(x_0\\,;y_0)$ : $f(x_0) = y_0$.",
        "Résoudre l'équation du premier degré obtenue pour trouver $a$."
      ],
      exemple: "Racines $-2$ et $3$, $f(4) = -5$ : $a \\times 6 \\times 1 = -5$, donc $a = -\\dfrac{5}{6}$."
    },
    {
      titre: "Résoudre une inéquation du second degré",
      etapes: [
        "Tout passer d'un côté pour comparer à $0$.",
        "Trouver les racines (factorisation ou $\\Delta$) et le signe de $a$.",
        "Dresser le tableau de signes : signe de $a$ à l'extérieur des racines, signe contraire entre ; sans racine, signe de $a$ partout.",
        "Lire les solutions. Crochets fermés en une racine seulement si l'inégalité est large."
      ],
      exemple: "$2x^2 - 3x > 2 \\iff 2x^2 - 3x - 2 > 0$ : racines $-\\dfrac{1}{2}$ et $2$, $a > 0$, donc $S = ]-\\infty\\,;-\\tfrac{1}{2}[ \\cup ]2\\,;+\\infty[$."
    }
  ],
  erreurs: [
    "Lire $\\alpha = 3$ dans $(x + 3)^2$ : on cherche ce qui annule la parenthèse, donc $\\alpha = -3$.",
    "Confondre l'extremum $\\beta$ (une image) et l'endroit où il est atteint $\\alpha$ (une abscisse).",
    "Calculer $-3^2 = 9$ dans $\\Delta$ : c'est $(-3)^2 = 9$ qu'il faut écrire, avec des parenthèses.",
    "Calculer $\\Delta$ avant d'avoir ramené l'équation à « $= 0$ ».",
    "Diviser seulement par $2$ au lieu de $2a$ dans $\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$.",
    "Diviser une équation par $x$ et perdre la solution $x = 0$.",
    "Confondre le signe de $\\Delta$ (nombre de racines) et le signe du trinôme.",
    "Oublier le signe de $a$ dans un tableau de signes : avec $a < 0$, tout s'inverse.",
    "Inclure les racines dans la solution d'une inéquation stricte (ou les exclure d'une inéquation large)."
  ]
};
