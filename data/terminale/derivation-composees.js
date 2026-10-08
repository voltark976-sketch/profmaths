/*
  CHAPITRE : Terminale maths complémentaires — Dérivation : fonctions composées et réciproques
  -------------------------------------------------------------------------------------------
  Chapitre 7 de la progression spiralée 2026-2027 (programme de maths complémentaires de 2019).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Vidéos d'Yvan Monka (cours 20DerivC et vidéos de Première).
  Figures : "tdc-gauss", "tdc-symetrie", "tdc-boite". Générateurs : tdc- (et d2-usuelles de Première).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-derivation-composees"] = {
  niveau: "Terminale maths complémentaires",
  numero: 7,
  titre: "Dérivation : fonctions composées et réciproques",
  accroche: "Dériver f(ax + b), eᵘ et u², étudier une fonction composée, comprendre la racine carrée comme réciproque du carré, et optimiser une boîte ou un enclos.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Rappels : dérivées usuelles et opérations",
      video: { titre: "Vidéo d'Yvan Monka : dériver les fonctions usuelles", youtube: "https://youtu.be/9Mann4wOGJA" },
      texte:
        "- $(x^n)' = nx^{n-1}$ ; $\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$ ; $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$ ($x > 0$) ; $(e^x)' = e^x$.\n" +
        "- $(u + v)' = u' + v'$ ; $(ku)' = ku'$ ; $(uv)' = u'v + uv'$ ; $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.\n\n" +
        "Le signe de $f'$ donne les variations de $f$ : $f' > 0$ sur un intervalle, $f$ y est strictement croissante ; $f' < 0$, strictement décroissante.",
      exemple: {
        enonce: "Dérive $f(x) = x^3 - 4\\sqrt{x}$ sur $]0\\,;+\\infty[$.",
        solution: "$f'(x) = 3x^2 - 4 \\times \\dfrac{1}{2\\sqrt{x}} = 3x^2 - \\dfrac{2}{\\sqrt{x}}$."
      }
    },
    {
      titre: "Dérivée de $x \\mapsto g(ax + b)$",
      video: { titre: "Vidéo d'Yvan Monka : dériver une fonction (2)", youtube: "https://youtu.be/1fOGueiO_zk" },
      texte:
        "Si $g$ est dérivable, la fonction $x \\mapsto g(ax + b)$ a pour dérivée :\n\n" +
        "$\\left(g(ax + b)\\right)' = a \\times g'(ax + b)$.\n\n" +
        "On dérive « l'extérieur » en gardant $ax + b$ à l'intérieur, puis on multiplie par $a$. Exemples :\n\n" +
        "- $\\left((3x - 1)^2\\right)' = 3 \\times 2(3x - 1) = 6(3x - 1)$ ;\n" +
        "- $\\left(e^{-2x}\\right)' = -2e^{-2x}$ ;\n" +
        "- $\\left(\\sqrt{4x + 1}\\right)' = 4 \\times \\dfrac{1}{2\\sqrt{4x + 1}} = \\dfrac{2}{\\sqrt{4x + 1}}$.",
      exemple: {
        enonce: "Dérive $f(x) = \\dfrac{1}{5x + 2}$ sur un intervalle où elle est définie.",
        solution: "$g(X) = \\dfrac{1}{X}$, $g'(X) = -\\dfrac{1}{X^2}$ et $a = 5$ : $f'(x) = -\\dfrac{5}{(5x + 2)^2}$."
      }
    },
    {
      titre: "Dérivée de $e^{u}$",
      video: { titre: "Vidéo d'Yvan Monka : dériver une fonction exponentielle exp(u)", youtube: "https://youtu.be/5G4Aa8gKH_o" },
      texte:
        "Si $u$ est dérivable sur un intervalle, $x \\mapsto e^{u(x)}$ l'est aussi et :\n\n" +
        "$\\left(e^{u}\\right)' = u'e^{u}$.\n\n" +
        "Comme $e^{u(x)} > 0$, **$e^u$ a le même sens de variation que $u$** : on étudie le signe de $u'$.\n\n" +
        "Cas particulier : $u(x) = ax + b$ redonne $\\left(e^{ax + b}\\right)' = ae^{ax + b}$.",
      exemple: {
        enonce: "Dérive $f(x) = e^{x^2 - 4x}$.",
        solution: "$u(x) = x^2 - 4x$, $u'(x) = 2x - 4$ : $f'(x) = (2x - 4)e^{x^2 - 4x}$."
      }
    },
    {
      titre: "Dérivée de $u^2$",
      texte:
        "$u^2 = u \\times u$, donc avec la dérivée d'un produit : $(u^2)' = u'u + uu' = 2u'u$.\n\n" +
        "Exemple : $\\left((x^2 + 1)^2\\right)' = 2 \\times 2x \\times (x^2 + 1) = 4x(x^2 + 1)$.\n\n" +
        "On peut vérifier en développant : $(x^2 + 1)^2 = x^4 + 2x^2 + 1$, de dérivée $4x^3 + 4x = 4x(x^2 + 1)$.",
      exemple: {
        enonce: "Dérive $f(x) = (3x^2 - 2)^2$ et calcule $f'(1)$.",
        solution: "$f'(x) = 2 \\times 6x \\times (3x^2 - 2) = 12x(3x^2 - 2)$, donc $f'(1) = 12 \\times 1 = 12$."
      }
    },
    {
      titre: "Étudier une fonction composée",
      figure: "tdc-gauss",
      video: { titre: "Vidéo d'Yvan Monka : étudier une fonction exponentielle (variations)", youtube: "https://youtu.be/Vx0H1DV3Yqc" },
      texte:
        "Pour $f(x) = e^{-x^2}$ :\n\n" +
        "- $u(x) = -x^2$, $u'(x) = -2x$, donc $f'(x) = -2xe^{-x^2}$ ;\n" +
        "- $e^{-x^2} > 0$ : $f'(x)$ a le signe de $-2x$, positif pour $x < 0$, négatif pour $x > 0$ ;\n" +
        "- $f$ est croissante sur $]-\\infty\\,;0]$, décroissante sur $[0\\,;+\\infty[$, de maximum $f(0) = 1$.\n\n" +
        "Cette courbe « en cloche » reviendra avec les lois à densité (chapitre 13).",
      exemple: {
        enonce: "Étudie les variations de $f(x) = e^{x^2 - 4x}$.",
        solution: "$f'(x) = (2x - 4)e^{x^2 - 4x}$ a le signe de $2x - 4$ : négatif pour $x < 2$, positif pour $x > 2$. $f$ décroît puis croît, minimum $f(2) = e^{-4}$."
      }
    },
    {
      titre: "Fonction réciproque : carré et racine carrée",
      figure: "tdc-symetrie",
      texte:
        "Sur $[0\\,;+\\infty[$, la fonction carré est continue et strictement croissante. Pour tout $y \\geqslant 0$, l'équation $x^2 = y$ a une unique solution positive : $\\sqrt{y}$.\n\n" +
        "Sur $[0\\,;+\\infty[$ : $y = x^2 \\iff x = \\sqrt{y}$. La racine carrée est la **fonction réciproque** du carré.\n\n" +
        "- Leurs courbes sont **symétriques par rapport à la droite $y = x$** : le point $(2\\,;4)$ correspond à $(4\\,;2)$.\n" +
        "- Attention : sur $\\mathbb{R}$ tout entier, l'équivalence est fausse, car $x^2 = 4$ a deux solutions, $2$ et $-2$.\n\n" +
        "C'est la même idée qui définira le logarithme comme réciproque de l'exponentielle (chapitre 8).",
      exemple: {
        enonce: "Le point $(3\\,;9)$ est sur la courbe du carré. Quel point de la courbe de la racine carrée lui correspond ? Calcule $\\sqrt{(-5)^2}$.",
        solution: "On échange les coordonnées : $(9\\,;3)$, car $\\sqrt{9} = 3$.\n\n$\\sqrt{(-5)^2} = \\sqrt{25} = 5$ : on ne retrouve pas $-5$, car $-5 \\notin [0\\,;+\\infty[$."
      }
    },
    {
      titre: "Optimisation : la boîte et l'enclos",
      figure: "tdc-boite",
      video: { titre: "Vidéo d'Yvan Monka : résoudre un problème d'optimisation", youtube: "https://youtu.be/V0gLF8iWARs" },
      texte:
        "Dans une tôle carrée de $30$ cm de côté, on découpe un carré de côté $x$ à chaque coin, puis on plie : le volume de la boîte est $V(x) = x(30 - 2x)^2$ pour $0 < x < 15$.\n\n" +
        "Avec $(u^2)' = 2u'u$ et $u(x) = 30 - 2x$ : $V'(x) = (30 - 2x)^2 + x \\times 2 \\times (-2)(30 - 2x) = (30 - 2x)(30 - 6x)$.\n\n" +
        "Sur $]0\\,;15[$, $30 - 2x > 0$ : $V'(x)$ a le signe de $30 - 6x$, positif avant $5$, négatif après. Le volume est maximal pour $x = 5$ cm : $V(5) = 5 \\times 20^2 = 2\\,000$ cm³.",
      exemple: {
        enonce: "Un enclos à cabris le long d'un mur utilise $40$ m de grillage : $A(x) = x(40 - 2x)$. Quelle largeur $x$ maximise l'aire ?",
        solution: "$A'(x) = 40 - 4x$ s'annule pour $x = 10$, positif avant, négatif après. Aire maximale : $A(10) = 10 \\times 20 = 200$ m²."
      }
    },
    {
      titre: "Python : une courbe et sa symétrique",
      texte:
        "On trace la courbe de $x \\mapsto x^2$ sur $[0\\,;3]$ et sa symétrique par rapport à $y = x$, en échangeant les listes des abscisses et des ordonnées :\n\n" +
        "```python\nimport matplotlib.pyplot as plt\n\nX = [k / 10 for k in range(31)]\nY = [x**2 for x in X]\nplt.plot(X, Y)\nplt.plot(Y, X)\nplt.plot([0, 9], [0, 9], '--')\nplt.show()\n```\n\n" +
        "La deuxième courbe tracée, avec les rôles de $X$ et $Y$ échangés, est celle de la racine carrée.",
      exemple: {
        enonce: "Quel point de la deuxième courbe correspond à $x = 2{,}5$ dans la liste X ?",
        solution: "$Y = 2{,}5^2 = 6{,}25$. La deuxième courbe contient le point $(6{,}25\\,;2{,}5)$, et $\\sqrt{6{,}25} = 2{,}5$."
      }
    }
  ],

  videos: [
    { titre: "Dériver une fonction (3)", type: "Calcul", youtube: "https://youtu.be/OMsZNNIIdrw" },
    { titre: "Dériver une fonction (4)", type: "Calcul", youtube: "https://youtu.be/jOuC7aq3YkM" },
    { titre: "Étudier les variations d'une fonction", type: "Variations", youtube: "https://youtu.be/23_Ba3N0fu4" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "d2-usuelles", titre: "Rappels : dérivées usuelles", etape: "Dériver", nb: 4 },
    { type: "tdc-affine", titre: "Dériver g(ax + b)", etape: "Dériver", nb: 5 },
    { type: "tdc-exp-u", titre: "Dériver et étudier eᵘ", etape: "Dériver", nb: 5 },
    { type: "tdc-carre-u", titre: "Dériver u²", etape: "Dériver", nb: 4 },
    { type: "tdc-reciproque", titre: "Carré et racine carrée", etape: "Réciproque", nb: 5 },
    { type: "tdc-logique", titre: "Équivalence et dérivées : vrai ou faux ?", etape: "Réciproque", nb: 5 },
    { type: "tdc-optimisation", titre: "La boîte et l'enclos", etape: "Optimiser", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$\\left((2x + 1)^2\\right)' =$", choix: ["$4(2x + 1)$", "$2(2x + 1)$", "$(2x + 1)^2$", "$4x$"], bonne: 0, explication: "$a = 2$ et $(X^2)' = 2X$." },
    { question: "$\\left(e^{3x}\\right)' =$", choix: ["$3e^{3x}$", "$e^{3x}$", "$3xe^{3x - 1}$", "$e^3$"], bonne: 0, explication: "$(e^{ax})' = ae^{ax}$." },
    { question: "$\\left(e^{-x}\\right)' =$", choix: ["$-e^{-x}$", "$e^{-x}$", "$-xe^{-x}$", "$e^x$"], bonne: 0, explication: "$a = -1$." },
    { question: "$\\left(\\sqrt{2x + 3}\\right)' =$", choix: ["$\\dfrac{1}{\\sqrt{2x + 3}}$", "$\\dfrac{1}{2\\sqrt{2x + 3}}$", "$2\\sqrt{2x + 3}$", "$\\dfrac{2}{\\sqrt{2x + 3}}$"], bonne: 0, explication: "$2 \\times \\dfrac{1}{2\\sqrt{2x + 3}}$." },
    { question: "$\\left(\\dfrac{1}{4x - 1}\\right)' =$", choix: ["$-\\dfrac{4}{(4x - 1)^2}$", "$-\\dfrac{1}{(4x - 1)^2}$", "$\\dfrac{4}{(4x - 1)^2}$", "$\\dfrac{1}{4}$"], bonne: 0, explication: "$a = 4$ et $\\left(\\dfrac{1}{X}\\right)' = -\\dfrac{1}{X^2}$." },
    { question: "$\\left(e^{x^2}\\right)' =$", choix: ["$2xe^{x^2}$", "$e^{x^2}$", "$x^2e^{x^2 - 1}$", "$2e^{x^2}$"], bonne: 0, explication: "$(e^u)' = u'e^u$ avec $u' = 2x$." },
    { question: "$(u^2)' =$", choix: ["$2u'u$", "$2u$", "$u'^2$", "$2u'$"], bonne: 0, explication: "Dérivée du produit $u \\times u$." },
    { question: "$\\left((x^2 - 3)^2\\right)' =$", choix: ["$4x(x^2 - 3)$", "$2(x^2 - 3)$", "$2x(x^2 - 3)$", "$4x$"], bonne: 0, explication: "$2 \\times 2x \\times (x^2 - 3)$." },
    { question: "$f(x) = e^{u(x)}$ a les mêmes variations que :", choix: ["$u$", "$-u$", "$u^2$", "$e^x$"], bonne: 0, explication: "$f' = u'e^u$ et $e^u > 0$." },
    { question: "$f(x) = e^{-x^2}$ admet un maximum en :", choix: ["$0$", "$1$", "$-1$", "aucun point"], bonne: 0, explication: "$f'(x) = -2xe^{-x^2}$ change de signe en $0$." },
    { question: "$f(x) = e^{x^2 - 6x}$ admet un minimum en :", choix: ["$3$", "$6$", "$-3$", "$0$"], bonne: 0, explication: "$u'(x) = 2x - 6 = 0$ pour $x = 3$." },
    { question: "Sur $[0\\,;+\\infty[$, $y = x^2 \\iff$", choix: ["$x = \\sqrt{y}$", "$x = y^2$", "$x = -\\sqrt{y}$", "$x = \\dfrac{y}{2}$"], bonne: 0, explication: "La racine carrée est la réciproque du carré sur $[0\\,;+\\infty[$." },
    { question: "Les courbes de $x^2$ ($x \\geqslant 0$) et de $\\sqrt{x}$ sont symétriques par rapport à :", choix: ["la droite $y = x$", "l'axe des ordonnées", "l'axe des abscisses", "l'origine"], bonne: 0, explication: "On échange abscisse et ordonnée." },
    { question: "$\\sqrt{(-3)^2} =$", choix: ["$3$", "$-3$", "$9$", "n'existe pas"], bonne: 0, explication: "$\\sqrt{9} = 3$." },
    { question: "Sur $\\mathbb{R}$, l'équation $x^2 = 16$ a :", choix: ["deux solutions", "une solution", "aucune solution", "une infinité de solutions"], bonne: 0, explication: "$4$ et $-4$." },
    { question: "Le point $(5\\,;25)$ est sur la courbe du carré. Sur celle de la racine carrée, on trouve :", choix: ["$(25\\,;5)$", "$(5\\,;25)$", "$(5\\,;\\sqrt{5})$", "$(-5\\,;25)$"], bonne: 0, explication: "Échange des coordonnées." },
    { question: "Boîte : $V(x) = x(24 - 2x)^2$. Le volume est maximal pour $x =$", choix: ["$4$", "$12$", "$6$", "$8$"], bonne: 0, explication: "$V'(x) = (24 - 2x)(24 - 6x)$ s'annule en $4$." },
    { question: "Enclos : $A(x) = x(30 - 2x)$. L'aire est maximale pour $x =$", choix: ["$7{,}5$", "$15$", "$10$", "$5$"], bonne: 0, explication: "$A'(x) = 30 - 4x$." },
    { question: "$\\left((5 - x)^2\\right)' =$", choix: ["$-2(5 - x)$", "$2(5 - x)$", "$2x$", "$-2x$"], bonne: 0, explication: "$a = -1$." },
    { question: "$\\left(3e^{2x}\\right)' =$", choix: ["$6e^{2x}$", "$3e^{2x}$", "$6xe^{2x}$", "$5e^{2x}$"], bonne: 0, explication: "$3 \\times 2e^{2x}$." },
    { question: "« $x = 4 \\Rightarrow x^2 = 16$ » : sa réciproque, sur $\\mathbb{R}$, est :", choix: ["fausse", "vraie", "une équivalence", "sans objet"], bonne: 0, explication: "$x = -4$ vérifie $x^2 = 16$." },
    { question: "La racine carrée est définie comme réciproque du carré parce que, sur $[0\\,;+\\infty[$, le carré est :", choix: ["continu et strictement croissant", "pair", "positif", "dérivable en $0$ seulement"], bonne: 0, explication: "Chaque $y \\geqslant 0$ a alors un unique antécédent positif." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Dériver une fonction composée",
      etapes: ["Repérer la forme : $g(ax + b)$, $e^{u}$ ou $u^2$.", "Appliquer : $a \\times g'(ax + b)$ ; $u'e^{u}$ ; $2u'u$.", "Simplifier sans oublier le facteur $a$ ou $u'$."],
      exemple: "$\\left(e^{x^2 - 4x}\\right)' = (2x - 4)e^{x^2 - 4x}$."
    },
    {
      titre: "Étudier les variations de $e^{u}$",
      etapes: ["Calculer $u'(x)$.", "Comme $e^u > 0$, étudier seulement le signe de $u'$.", "Dresser le tableau de variations et calculer les extremums."],
      exemple: "$e^{-x^2}$ : croissante puis décroissante, maximum $1$ en $0$."
    },
    {
      titre: "Optimiser une grandeur",
      etapes: ["Exprimer la grandeur en fonction de $x$ et préciser l'intervalle.", "Dériver (produit, $u^2$…), étudier le signe.", "Conclure : valeur de $x$ et valeur optimale, avec les unités."],
      exemple: "Boîte : $V(x) = x(30 - 2x)^2$, maximum $2\\,000$ cm³ pour $x = 5$ cm."
    }
  ],
  erreurs: [
    "Oublier le facteur $a$ : $\\left(e^{-2x}\\right)' = -2e^{-2x}$, pas $e^{-2x}$.",
    "Écrire $(u^2)' = 2u$ en oubliant $u'$.",
    "Écrire $(e^{u})' = e^{u'}$ au lieu de $u'e^{u}$.",
    "Oublier que $e^{u} > 0$ et chercher son signe dans l'étude de $f'$.",
    "Croire que $x^2 = y \\iff x = \\sqrt{y}$ sur $\\mathbb{R}$ : il faut $x \\geqslant 0$.",
    "Confondre la symétrie par rapport à $y = x$ et la symétrie par rapport à un axe."
  ]
};
