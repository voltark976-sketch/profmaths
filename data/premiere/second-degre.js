/*
  CHAPITRE : Première spécialité — Second degré 1 : forme factorisée
  -------------------------------------------------------------------
  Chapitre 2 de la progression spiralée 2026-2027 (programme de Première 2026).
  L'identifiant « premiere-second-degre » est gardé pour conserver la progression des élèves.
  Forme canonique, discriminant et courbe de x ↦ f(x − m) : chapitre 5 (data/premiere/second-degre-2.js).
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce). Dans les formules, la virgule décimale s'écrit {,} : $0{,}35$.
  Les corrigés du Drive sont réservés au professeur (Pronote) : ils ne sont pas liés ici.
  Figures : "parabole-factorisee", "jardin-allee". Générateurs : sd- et s2-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-second-degre"] = {
  niveau: "Première spécialité",
  numero: 2,
  titre: "Second degré 1 : forme factorisée",
  accroche: "Une parabole qui coupe l'axe en deux racines : les lire, étudier le signe, factoriser sans calcul et retrouver la fonction, du jardin créole à son allée.",

  playlist: "https://www.youtube.com/playlist?list=PLNiZpXHauJZw",
  drive: "https://drive.google.com/drive/folders/1Jw7zQe-wQDLffgycdEJuUw56iU26NGsM",
  pdfs: [
    {
      titre: "Dossier élève : forme factorisée",
      url: "https://drive.google.com/file/d/1Zk2BClkgiNdGVu8luXXi_gnIAdd_CrBk/view"
    },
    {
      titre: "Énoncés des 4 exercices corrigés en vidéo",
      url: "https://drive.google.com/file/d/13EQuWAGkNRVNSXuhjc-z1atSD5OfTD5m/view"
    },
    {
      titre: "Livret élève : formes développée, canonique et factorisée (chapitres 2 et 5)",
      url: "https://drive.google.com/file/d/1rryaVPvC2IRRHjYga5P2UGewdiqDGhs8/view"
    }
  ],
  liens: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Fonction du second degré sous forme factorisée",
      video: { titre: "Vidéo de ton prof : second degré, forme factorisée (cours complet)", youtube: "https://youtu.be/p4GJqFX6bMk" },
      texte:
        "Une **fonction polynôme du second degré** est définie sur $\\mathbb{R}$ par $f(x) = ax^2 + bx + c$ avec $a \\neq 0$ : c'est la **forme développée**. Sa courbe est une **parabole**, tournée vers le haut si $a > 0$, vers le bas si $a < 0$.\n\n" +
        "Quand elle s'annule en $x_1$ et $x_2$, elle s'écrit aussi $f(x) = a(x - x_1)(x - x_2)$ : c'est la **forme factorisée**.\n\n" +
        "- $x_1$ et $x_2$ sont les **racines** de $f$ : les solutions de $f(x) = 0$, abscisses des points d'intersection de la parabole avec l'axe des abscisses.\n" +
        "- Elles se lisent directement : dans $(x + 3)$, la racine est $-3$.\n" +
        "- Le coefficient $a$ est le même dans les deux formes.",
      exemple: {
        enonce: "$f(x) = 2(x - 1)(x + 3)$. Donne les racines de $f$ et sa forme développée.",
        solution: "Racines : $1$ et $-3$ (produit nul).\n\n$f(x) = 2(x^2 + 3x - x - 3) = 2(x^2 + 2x - 3) = 2x^2 + 4x - 6$. Contrôle : $f(0) = -6$ dans les deux formes."
      }
    },
    {
      titre: "Signe d'une forme factorisée",
      figure: "parabole-factorisee",
      video: { titre: "Vidéo de ton prof : signe d'une forme factorisée et inéquations (exercice corrigé)", youtube: "https://youtu.be/xpcwo2134yI" },
      texte:
        "On reprend le **tableau de signes** de Seconde : une ligne par facteur, puis la règle des signes.\n\n" +
        "Résultat à retenir, avec $x_1 < x_2$ :\n" +
        "- $a(x - x_1)(x - x_2)$ est **du signe de $a$ à l'extérieur** des racines ;\n" +
        "- **du signe contraire de $a$ entre** les racines ;\n" +
        "- nul en $x_1$ et en $x_2$.\n\n" +
        "Sur la parabole : avec $a > 0$, la courbe est sous l'axe entre les racines.",
      exemple: {
        enonce: "Résoudre $-2(x - 1)(x - 5) > 0$.",
        solution: "Racines $1$ et $5$, $a = -2 < 0$ : négatif à l'extérieur, **positif entre** les racines. $S = \\,]1\\,;5[$."
      }
    },
    {
      titre: "Somme et produit des racines",
      video: { titre: "Vidéo d'Yvan Monka : déterminer une fonction à partir de ses racines", youtube: "https://youtu.be/JiokX41_2nw" },
      texte:
        "En développant $a(x - x_1)(x - x_2) = ax^2 - a(x_1 + x_2)x + ax_1x_2$ et en comparant avec $ax^2 + bx + c$ :\n\n" +
        "$x_1 + x_2 = -\\dfrac{b}{a}$ et $x_1 x_2 = \\dfrac{c}{a}$.\n\n" +
        "- Réciproquement, deux nombres de somme $s$ et de produit $p$ sont les racines de $x^2 - sx + p$.\n" +
        "- **Fonctions qui s'annulent en deux réels donnés** $x_1$ et $x_2$ : ce sont les $f(x) = a(x - x_1)(x - x_2)$, avec $a \\neq 0$. Un point supplémentaire de la courbe donne $a$.",
      exemple: {
        enonce: "Trouver la fonction du second degré qui s'annule en $-1$ et $4$ et vérifie $f(0) = 8$.",
        solution: "$f(x) = a(x + 1)(x - 4)$ et $f(0) = a \\times 1 \\times (-4) = -4a = 8$, donc $a = -2$ : $f(x) = -2(x + 1)(x - 4)$."
      }
    },
    {
      titre: "Factoriser directement",
      video: { titre: "Vidéo de ton prof : factoriser pour résoudre une inéquation (exercice corrigé)", youtube: "https://youtu.be/QYNlY_BFeUE" },
      texte:
        "Avant tout calcul, on cherche une factorisation **directe** :\n" +
        "- **coefficient de $x$ nul** : $3x^2 - 12 = 3(x^2 - 4) = 3(x - 2)(x + 2)$ ;\n" +
        "- **pas de terme constant** : $x^2 - 7x = x(x - 7)$ ;\n" +
        "- **identité remarquable** : $4x^2 + 12x + 9 = (2x + 3)^2$ ;\n" +
        "- **racine évidente** ($1$, $-1$, $2$…) : si $f(1) = 0$, le produit des racines $\\dfrac{c}{a}$ donne l'autre ;\n" +
        "- **somme et produit** : $x^2 + x - 12$, deux nombres de somme $-1$ et de produit $-12$ : $3$ et $-4$.\n\n" +
        "Les cas qui résistent seront traités au chapitre 5 avec le discriminant.",
      exemple: {
        enonce: "Factoriser $3x^2 - 7x + 4$.",
        solution: "$3 - 7 + 4 = 0$ : $1$ est racine évidente. Le produit des racines vaut $\\dfrac{4}{3}$, donc l'autre racine est $\\dfrac{4}{3}$.\n\n$3x^2 - 7x + 4 = 3(x - 1)\\left(x - \\dfrac{4}{3}\\right) = (x - 1)(3x - 4)$."
      }
    },
    {
      titre: "Identité ou équation ? Statut des lettres",
      video: { titre: "Vidéo de ton prof : identité ou équation, paramètre m (exercice corrigé)", youtube: "https://youtu.be/tpadBfbxTt0" },
      texte:
        "Une égalité n'a pas toujours le même statut :\n" +
        "- une **identité** est vraie **pour tout** $x$ : $(x - 3)(x + 3) = x^2 - 9$. Ici $x$ est une **variable** ;\n" +
        "- une **équation** n'est vraie que pour certaines valeurs de l'**inconnue** : $x^2 - 9 = 0$ ;\n" +
        "- un **paramètre** est une lettre fixée qui peut prendre plusieurs valeurs : dans $x^2 - m = 0$, le nombre de solutions dépend de $m$.\n\n" +
        "Pour montrer qu'une égalité n'est **pas** une identité, un **contre-exemple** suffit.",
      exemple: {
        enonce: "« $(x + 2)^2 = x^2 + 4$ » est-elle une identité ?",
        solution: "Non : pour $x = 1$, on trouve $9$ à gauche et $5$ à droite. Le développement correct est $x^2 + 4x + 4$."
      }
    },
    {
      titre: "Modéliser : l'allée du jardin",
      figure: "jardin-allee",
      texte:
        "Un jardin créole de $10$ m sur $6$ m est bordé d'une allée de largeur $x$ m. Le grand rectangle mesure $10 + 2x$ sur $6 + 2x$.\n\n" +
        "Aire de l'allée : $A(x) = (10 + 2x)(6 + 2x) - 60 = 4x^2 + 32x = 4x(x + 8)$.\n\n" +
        "La forme factorisée donne les racines ($0$ et $-8$) et le signe ; la forme développée sert à calculer des valeurs.",
      exemple: {
        enonce: "Quelle est l'aire de l'allée pour une largeur de $1{,}5$ m ?",
        solution: "$A(1{,}5) = 4 \\times 1{,}5 \\times 9{,}5 = 57$ m²."
      }
    },
    {
      titre: "Python : tester si un nombre est racine",
      texte:
        "Un nombre $x$ est racine de $ax^2 + bx + c$ quand $ax^2 + bx + c = 0$ :\n\n" +
        "```python\ndef est_racine(a, b, c, x):\n    return a * x**2 + b * x + c == 0\n```\n\n" +
        "On peut s'en servir pour chercher une racine évidente parmi les entiers de $-10$ à $10$ :\n\n" +
        "```python\ndef racines_entieres(a, b, c):\n    return [x for x in range(-10, 11) if est_racine(a, b, c, x)]\n```",
      exemple: {
        enonce: "Que renvoie $\\texttt{racines\\_entieres(1, 1, -12)}$ ?",
        solution: "$x^2 + x - 12 = (x - 3)(x + 4)$ : la fonction renvoie $\\texttt{[-4, 3]}$."
      }
    }
  ],

  videos: [
    { titre: "Exercice 1 · Lire a et les racines, puis développer", type: "Application", youtube: "https://youtu.be/ZAp3Z1pdFiY" },
    { titre: "Exercice 2 · Identité ou équation, paramètre m", type: "Raisonnement", youtube: "https://youtu.be/tpadBfbxTt0" },
    { titre: "Exercice 3 · Signe d'une forme factorisée et inéquations", type: "Méthode", youtube: "https://youtu.be/xpcwo2134yI" },
    { titre: "Exercice 4 · Factoriser pour résoudre une inéquation", type: "Synthèse", youtube: "https://youtu.be/QYNlY_BFeUE" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "sd-racines", titre: "Lire les racines", etape: "Forme factorisée", nb: 5 },
    { type: "sd-developper", titre: "Développer une forme factorisée", etape: "Forme factorisée", nb: 5 },
    { type: "s2-statut", titre: "Identité ou équation ?", etape: "Forme factorisée", nb: 4 },
    { type: "sd-inequation", titre: "Signe et inéquation sous forme factorisée", etape: "Signe", nb: 5 },
    { type: "sd-somme-produit", titre: "Racines par somme et produit", etape: "Factoriser", nb: 5 },
    { type: "s2-factoriser", titre: "Factoriser sans discriminant", etape: "Factoriser", nb: 5 },
    { type: "sd-trouver-a", titre: "Retrouver la fonction", etape: "Factoriser", nb: 4 },
    { type: "s2-jardin", titre: "L'allée du jardin créole", etape: "Modéliser", nb: 3 },
    { type: "s2-python", titre: "Python : est-ce une racine ?", etape: "Modéliser", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    {
      question: "Quelles sont les racines de $f(x) = 3(x - 2)(x + 5)$ ?",
      choix: ["$2$ et $-5$", "$-2$ et $5$", "$3$, $2$ et $-5$", "$6$ et $-15$"],
      bonne: 0,
      explication: "Produit nul : $x - 2 = 0$ ou $x + 5 = 0$. Le coefficient $3$ ne s'annule jamais."
    },
    {
      question: "La forme développée de $-3(x + 2)(x - 1)$ est :",
      choix: ["$-3x^2 - 3x + 6$", "$-3x^2 + 3x - 6$", "$-3x^2 - 3x - 6$", "$3x^2 + 3x - 6$"],
      bonne: 0,
      explication: "$(x + 2)(x - 1) = x^2 + x - 2$, puis on multiplie par $-3$ : $-3x^2 - 3x + 6$."
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
      question: "Pour résoudre $x^2 = 7x$, quelle est la bonne méthode ?",
      choix: ["Diviser par $x$ : $x = 7$", "Écrire $x(x - 7) = 0$ : $x = 0$ ou $x = 7$", "Prendre la racine : $x = \\sqrt{7x}$", "Il n'y a pas de solution"],
      bonne: 1,
      explication: "Diviser par $x$ fait perdre la solution $x = 0$. On factorise et on applique le produit nul."
    },
    {
      question: "Quelle est une forme factorisée de $9x^2 - 25$ ?",
      choix: ["$(9x - 25)(9x + 25)$", "$(3x - 5)^2$", "$(3x - 5)(3x + 5)$", "$9(x - 5)(x + 5)$"],
      bonne: 2,
      explication: "$a^2 - b^2 = (a - b)(a + b)$ avec $a = 3x$ et $b = 5$."
    },
    {
      question: "$1$ est racine de $2x^2 + 3x - 5$. L'autre racine est :",
      choix: ["$-\\dfrac{5}{2}$", "$\\dfrac{5}{2}$", "$-5$", "$5$"],
      bonne: 0,
      explication: "Le produit des racines vaut $\\dfrac{c}{a} = -\\dfrac{5}{2}$ ; avec $x_1 = 1$, on a $x_2 = -\\dfrac{5}{2}$."
    },
    {
      question: "« $(x + 1)^2 = x^2 + 1$ » est :",
      choix: ["fausse en général (contre-exemple $x = 1$)", "une identité", "vraie pour tout $x$ positif", "une identité remarquable"],
      bonne: 0,
      explication: "Pour $x = 1$ : $4 \\neq 2$. Il manque le double produit $2x$."
    },
    {
      question: "Dans l'équation $x^2 - m = 0$, la lettre $m$ est :",
      choix: ["un paramètre", "l'inconnue", "une variable muette", "une racine"],
      bonne: 0,
      explication: "On résout en $x$ ; $m$ est fixé mais peut prendre plusieurs valeurs : le nombre de solutions dépend de $m$."
    }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
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
      titre: "Étudier le signe d'une forme factorisée",
      etapes: [
        "Lire les racines $x_1 < x_2$ et le signe de $a$.",
        "Signe de $a$ à l'extérieur des racines, signe contraire entre, $0$ en chaque racine.",
        "Résoudre l'inéquation : choisir les intervalles, crochets fermés aux racines seulement si l'inégalité est large."
      ],
      exemple: "$2(x + 1)(x - 3) \\leqslant 0$ : $a > 0$, négatif entre les racines, $S = [-1\\,;3]$."
    },
    {
      titre: "Factoriser sans discriminant",
      etapes: [
        "Facteur commun ($x$ en facteur s'il n'y a pas de constante).",
        "Identité remarquable ($a^2 - b^2$, carré parfait).",
        "Racine évidente : tester $1$, $-1$, $2$… puis utiliser le produit $\\dfrac{c}{a}$.",
        "Vérifier en développant."
      ],
      exemple: "$x^2 - 5x + 4$ : racine évidente $1$, produit $4$, donc $(x - 1)(x - 4)$."
    },
    {
      titre: "Déterminer une fonction connaissant ses racines",
      etapes: [
        "Écrire $f(x) = a(x - x_1)(x - x_2)$ avec $a$ inconnu.",
        "Utiliser le point connu $(x_0\\,;y_0)$ : $f(x_0) = y_0$.",
        "Résoudre l'équation du premier degré obtenue pour trouver $a$."
      ],
      exemple: "Racines $-2$ et $3$, $f(4) = -5$ : $a \\times 6 \\times 1 = -5$, donc $a = -\\dfrac{5}{6}$."
    }
  ],
  erreurs: [
    "Lire la racine $3$ dans $(x + 3)$ : on cherche ce qui annule la parenthèse, donc $-3$.",
    "Oublier le coefficient $a$ en développant, ou le multiplier avant d'avoir développé.",
    "Diviser une équation par $x$ et perdre la solution $x = 0$.",
    "Oublier le signe de $a$ dans un tableau de signes : avec $a < 0$, tout s'inverse.",
    "Inclure les racines dans la solution d'une inéquation stricte.",
    "Écrire $(x + 2)^2 = x^2 + 4$ : il manque le double produit."
  ]
};
