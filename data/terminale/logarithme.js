/*
  CHAPITRE : Terminale maths complémentaires — Fonction logarithme népérien
  -------------------------------------------------------------------------
  Chapitre 8 de la progression spiralée 2026-2027 (programme de maths complémentaires de 2019).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Vidéos d'Yvan Monka (cours 20LogTC).
  Figures : "tln-courbe", "tln-neper". Générateurs : tln-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-logarithme"] = {
  niveau: "Terminale maths complémentaires",
  numero: 8,
  titre: "Fonction logarithme népérien",
  accroche: "La réciproque de l'exponentielle : transformer les produits en sommes, résoudre des équations, trouver un seuil, étudier la fonction ln, avec un détour par Neper et Briggs.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur le logarithme népérien en vidéo (Yvan Monka)", url: "https://youtu.be/VJns0RfVWGg", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "La réciproque de l'exponentielle",
      figure: "tln-courbe",
      video: { titre: "Vidéo d'Yvan Monka : déterminer la fonction réciproque d'une fonction", youtube: "https://youtu.be/bgINubYekqo" },
      texte:
        "La fonction exponentielle est continue et strictement croissante sur $\\mathbb{R}$, à valeurs dans $]0\\,;+\\infty[$. Pour tout $y > 0$, l'équation $e^x = y$ a une unique solution, notée $\\ln y$ : c'est le **logarithme népérien** de $y$.\n\n" +
        "- Pour $x \\in \\mathbb{R}$ et $y > 0$ : $y = e^x \\iff x = \\ln y$.\n" +
        "- $\\ln(e^x) = x$ et $e^{\\ln y} = y$.\n" +
        "- $\\ln 1 = 0$ et $\\ln e = 1$.\n\n" +
        "Comme pour le carré et la racine carrée (chapitre 7), les courbes de $\\exp$ et de $\\ln$ sont symétriques par rapport à la droite $y = x$.",
      exemple: {
        enonce: "Calcule $\\ln(e^{5})$, $e^{\\ln 7}$ et résous $e^x = 4$.",
        solution: "$\\ln(e^5) = 5$ ; $e^{\\ln 7} = 7$ ; $e^x = 4 \\iff x = \\ln 4 \\approx 1{,}39$."
      }
    },
    {
      titre: "Propriétés algébriques",
      video: { titre: "Vidéo d'Yvan Monka : appliquer les formules sur les logarithmes", youtube: "https://youtu.be/HGrK77-SCl4" },
      texte:
        "Pour tous $a > 0$ et $b > 0$, et tout entier $n$ :\n\n" +
        "- $\\ln(ab) = \\ln a + \\ln b$ (**équation fonctionnelle** : le logarithme transforme les produits en sommes) ;\n" +
        "- $\\ln\\left(\\dfrac{1}{a}\\right) = -\\ln a$ et $\\ln\\left(\\dfrac{a}{b}\\right) = \\ln a - \\ln b$ ;\n" +
        "- $\\ln(a^n) = n\\ln a$ et $\\ln\\sqrt{a} = \\dfrac{1}{2}\\ln a$.\n\n" +
        "**Démonstration de $\\ln(ab) = \\ln a + \\ln b$** : $e^{\\ln a + \\ln b} = e^{\\ln a} \\times e^{\\ln b} = ab = e^{\\ln(ab)}$ ; l'exponentielle étant strictement croissante, les exposants sont égaux.\n\n" +
        "Attention : $\\ln(a + b)$ ne se simplifie pas.",
      exemple: {
        enonce: "Écris $A = \\ln 18 - \\ln 2 + \\ln\\left(\\dfrac{1}{3}\\right)$ sous la forme $\\ln c$, et $B = \\ln 32$ sous la forme $k\\ln 2$.",
        solution: "$A = \\ln\\left(\\dfrac{18}{2 \\times 3}\\right) = \\ln 3$.\n\n$32 = 2^5$, donc $B = 5\\ln 2$."
      }
    },
    {
      titre: "Équations et inéquations",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une inéquation contenant des logarithmes", youtube: "https://youtu.be/_fpPphstjYw" },
      texte:
        "$\\ln$ est strictement croissante sur $]0\\,;+\\infty[$. Pour $a > 0$ et $b > 0$ :\n\n" +
        "- $\\ln a = \\ln b \\iff a = b$ ;\n" +
        "- $\\ln a < \\ln b \\iff a < b$ (**équivalence** : l'ordre est conservé dans les deux sens) ;\n" +
        "- $\\ln x = c \\iff x = e^c$ ; $e^x = k \\iff x = \\ln k$ (pour $k > 0$).\n\n" +
        "Toujours vérifier que ce qui est dans le logarithme est **strictement positif**.",
      exemple: {
        enonce: "Résous $\\ln(2x - 1) = 3$ puis $\\ln x < 2$.",
        solution: "$2x - 1 = e^3 \\iff x = \\dfrac{e^3 + 1}{2} \\approx 10{,}54$ (et $2x - 1 = e^3 > 0$).\n\n$\\ln x < 2 \\iff 0 < x < e^2$ : $S = ]0\\,;e^2[$."
      }
    },
    {
      titre: "Seuil d'une suite géométrique : $\\ln(q^n) = n\\ln q$",
      video: { titre: "Vidéo d'Yvan Monka : déterminer par le calcul un seuil pour une suite géométrique", youtube: "https://youtu.be/fm1YBGcix0E" },
      texte:
        "Pour trouver le premier $n$ tel que $q^n > A$ (ou $q^n < A$), on applique $\\ln$ :\n\n" +
        "$n\\ln q > \\ln A$.\n\n" +
        "- Si $q > 1$, $\\ln q > 0$ : $n > \\dfrac{\\ln A}{\\ln q}$.\n" +
        "- Si $0 < q < 1$, $\\ln q < 0$ : en divisant, **le sens de l'inégalité change**.\n\n" +
        "Retour au modèle de Malthus (chapitre 1) : $320\\,000 \\times 1{,}03^n > 400\\,000 \\iff 1{,}03^n > 1{,}25 \\iff n > \\dfrac{\\ln 1{,}25}{\\ln 1{,}03} \\approx 7{,}55$ : à partir de $n = 8$, soit en 2032. Plus besoin de tâtonner !",
      exemple: {
        enonce: "Le plat du chapitre 3 : $T_n = 25 + 65 \\times 0{,}8^n$. À partir de quand $T_n < 40$ ?",
        solution: "$65 \\times 0{,}8^n < 15 \\iff 0{,}8^n < \\dfrac{3}{13} \\iff n\\ln 0{,}8 < \\ln\\dfrac{3}{13} \\iff n > \\dfrac{\\ln(3/13)}{\\ln 0{,}8} \\approx 6{,}57$ (on divise par $\\ln 0{,}8 < 0$) : à partir de $7$ minutes."
      }
    },
    {
      titre: "Étude de la fonction ln",
      video: { titre: "Vidéo d'Yvan Monka : étudier la fonction logarithme népérien", youtube: "https://youtu.be/3KLX-ScJmcI" },
      texte:
        "- **Dérivée** : $\\ln$ est dérivable sur $]0\\,;+\\infty[$ et $(\\ln x)' = \\dfrac{1}{x}$ (en dérivant $e^{\\ln x} = x$ : $(\\ln x)' e^{\\ln x} = 1$).\n" +
        "- $\\dfrac{1}{x} > 0$ : $\\ln$ est **strictement croissante**.\n" +
        "- **Limites** : $\\lim\\limits_{x \\to +\\infty} \\ln x = +\\infty$ (très lentement) et $\\lim\\limits_{x \\to 0,\\ x > 0} \\ln x = -\\infty$ : l'axe des ordonnées est asymptote verticale.\n" +
        "- **Signe** : $\\ln x < 0$ sur $]0\\,;1[$, $\\ln 1 = 0$, $\\ln x > 0$ sur $]1\\,;+\\infty[$.",
      exemple: {
        enonce: "Étudie les variations de $f(x) = 2x - \\ln x$ sur $]0\\,;+\\infty[$.",
        solution: "$f'(x) = 2 - \\dfrac{1}{x} = \\dfrac{2x - 1}{x}$ : négatif sur $\\left]0\\,;\\dfrac{1}{2}\\right[$, positif ensuite. Minimum $f\\left(\\dfrac{1}{2}\\right) = 1 - \\ln\\dfrac{1}{2} = 1 + \\ln 2$."
      }
    },
    {
      titre: "Dérivée de $\\ln u$",
      video: { titre: "Vidéo d'Yvan Monka : dériver une fonction du type ln(u)", youtube: "https://youtu.be/-zrhBc9xdRs" },
      texte:
        "Si $u$ est dérivable et **strictement positive** sur un intervalle :\n\n" +
        "$(\\ln u)' = \\dfrac{u'}{u}$.\n\n" +
        "Comme $u > 0$, $(\\ln u)'$ a le signe de $u'$ : **$\\ln u$ a les mêmes variations que $u$**.\n\n" +
        "Exemples : $(\\ln(3x + 1))' = \\dfrac{3}{3x + 1}$ ; $(\\ln(x^2 + 4))' = \\dfrac{2x}{x^2 + 4}$.",
      exemple: {
        enonce: "Dérive $f(x) = x\\ln x$ sur $]0\\,;+\\infty[$ et trouve son minimum.",
        solution: "$f'(x) = 1 \\times \\ln x + x \\times \\dfrac{1}{x} = \\ln x + 1$, nul pour $x = e^{-1}$, négatif avant, positif après. Minimum $f\\left(\\dfrac{1}{e}\\right) = -\\dfrac{1}{e}$."
      }
    },
    {
      titre: "Un peu d'histoire : les tables de Neper et de Briggs",
      figure: "tln-neper",
      texte:
        "Au début du XVIIe siècle, John Neper cherche à simplifier les calculs des astronomes et des navigateurs : multiplier de grands nombres est long, additionner est facile.\n\n" +
        "Idée : mettre en face une suite **géométrique** ($1$, $2$, $4$, $8$…) et une suite **arithmétique** ($0$, $1$, $2$, $3$…). Multiplier en bas revient à additionner en haut : $4 \\times 8 = 32$ correspond à $2 + 3 = 5$.\n\n" +
        "Le logarithme fait exactement cela : $\\ln(ab) = \\ln a + \\ln b$. Henry Briggs a ensuite calculé des tables très précises, en prenant des racines carrées successives.",
      exemple: {
        enonce: "Avec la table, calcule $16 \\times 4$ en n'utilisant que des additions.",
        solution: "$16$ est sous $4$ et $4$ sous $2$ : $4 + 2 = 6$, et sous $6$ on lit $64$. Donc $16 \\times 4 = 64$."
      }
    },
    {
      titre: "Python : approcher ln 2",
      texte:
        "**Brouncker** : $\\ln 2 = \\dfrac{1}{1 \\times 2} + \\dfrac{1}{3 \\times 4} + \\dfrac{1}{5 \\times 6} + \\dots$\n\n" +
        "```python\ndef brouncker(n):\n    s = 0\n    for k in range(1, n + 1):\n        s = s + 1 / ((2*k - 1) * (2*k))\n    return s\n```\n\n" +
        "**Briggs** : après $k$ racines carrées, $a$ est proche de $1$, et $\\ln a \\approx 2^k(a^{1/2^k} - 1)$.\n\n" +
        "```python\nfrom math import sqrt\n\ndef briggs(a, k):\n    for i in range(k):\n        a = sqrt(a)\n    return 2**k * (a - 1)\n```\n\n" +
        "brouncker(1000) et briggs(2, 20) donnent tous deux environ $0{,}693$.",
      exemple: {
        enonce: "Que renvoie brouncker(2) ?",
        solution: "$\\dfrac{1}{2} + \\dfrac{1}{12} = \\dfrac{7}{12} \\approx 0{,}583$."
      }
    }
  ],

  videos: [
    { titre: "Simplifier une expression contenant des logarithmes", type: "Calcul", youtube: "https://youtu.be/HGrK77-SCl4" },
    { titre: "Résoudre une équation contenant des logarithmes", type: "Équation", youtube: "https://youtu.be/lCT-8ijhZiE" },
    { titre: "Étudier une fonction contenant des logarithmes", type: "Étude", youtube: "https://youtu.be/iT9C0BiOK4Y" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "tln-proprietes", titre: "Propriétés algébriques", etape: "Calculer", nb: 5 },
    { type: "tln-equation", titre: "Équations avec ln et exp", etape: "Calculer", nb: 5 },
    { type: "tln-inequation", titre: "Inéquations", etape: "Calculer", nb: 4 },
    { type: "tln-seuil", titre: "Seuil d'une suite géométrique", etape: "Calculer", nb: 4 },
    { type: "tln-limites", titre: "Limites avec ln", etape: "Étudier la fonction ln", nb: 4 },
    { type: "tln-derivee", titre: "Dériver ln u", etape: "Étudier la fonction ln", nb: 4 },
    { type: "tln-variations", titre: "Variations et extremums", etape: "Étudier la fonction ln", nb: 4 },
    { type: "tln-logique", titre: "Vrai ou faux sur ln", etape: "Raisonner", nb: 5 },
    { type: "tln-python", titre: "Python : Brouncker et Briggs", etape: "Raisonner", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$\\ln 1 =$", choix: ["$0$", "$1$", "$e$", "n'existe pas"], bonne: 0, explication: "$e^0 = 1$." },
    { question: "$\\ln e =$", choix: ["$1$", "$0$", "$e$", "$-1$"], bonne: 0, explication: "$e^1 = e$." },
    { question: "$\\ln(e^{4}) =$", choix: ["$4$", "$e^4$", "$4e$", "$\\ln 4$"], bonne: 0, explication: "$\\ln$ et $\\exp$ sont réciproques." },
    { question: "$e^{\\ln 6} =$", choix: ["$6$", "$e^6$", "$\\ln 6$", "$1$"], bonne: 0, explication: "Pour $y > 0$, $e^{\\ln y} = y$." },
    { question: "$\\ln 3 + \\ln 5 =$", choix: ["$\\ln 15$", "$\\ln 8$", "$15$", "$\\ln 3 \\times \\ln 5$"], bonne: 0, explication: "$\\ln(ab) = \\ln a + \\ln b$." },
    { question: "$\\ln 20 - \\ln 4 =$", choix: ["$\\ln 5$", "$\\ln 16$", "$5$", "$\\dfrac{\\ln 20}{\\ln 4}$"], bonne: 0, explication: "$\\ln\\dfrac{20}{4}$." },
    { question: "$\\ln(2^{7}) =$", choix: ["$7\\ln 2$", "$\\ln 14$", "$2\\ln 7$", "$\\ln 2 + 7$"], bonne: 0, explication: "$\\ln(a^n) = n\\ln a$." },
    { question: "$\\ln\\left(\\dfrac{1}{5}\\right) =$", choix: ["$-\\ln 5$", "$\\dfrac{1}{\\ln 5}$", "$\\ln 5$", "$-5$"], bonne: 0, explication: "$\\ln\\dfrac{1}{a} = -\\ln a$." },
    { question: "L'équation $e^x = 9$ a pour solution :", choix: ["$\\ln 9$", "$e^9$", "$\\dfrac{9}{e}$", "$3$"], bonne: 0, explication: "On applique $\\ln$." },
    { question: "L'équation $\\ln x = 2$ a pour solution :", choix: ["$e^2$", "$2$", "$\\ln 2$", "$2e$"], bonne: 0, explication: "On applique $\\exp$." },
    { question: "$\\ln x < 0 \\iff$", choix: ["$0 < x < 1$", "$x < 0$", "$x > 1$", "$x < 1$"], bonne: 0, explication: "$\\ln$ est croissante, $\\ln 1 = 0$, définie sur $]0\\,;+\\infty[$." },
    { question: "$\\ln(-3)$ :", choix: ["n'existe pas", "vaut $-\\ln 3$", "vaut $0$", "vaut $\\ln 3$"], bonne: 0, explication: "$\\ln$ est définie sur $]0\\,;+\\infty[$." },
    { question: "$(\\ln x)' =$", choix: ["$\\dfrac{1}{x}$", "$\\ln x$", "$e^x$", "$x\\ln x$"], bonne: 0, explication: "Sur $]0\\,;+\\infty[$." },
    { question: "$(\\ln(x^2 + 1))' =$", choix: ["$\\dfrac{2x}{x^2 + 1}$", "$\\dfrac{1}{x^2 + 1}$", "$2x\\ln(x^2 + 1)$", "$\\dfrac{2x}{x}$"], bonne: 0, explication: "$(\\ln u)' = \\dfrac{u'}{u}$." },
    { question: "$\\lim\\limits_{x \\to 0,\\ x > 0} \\ln x =$", choix: ["$-\\infty$", "$0$", "$1$", "$+\\infty$"], bonne: 0, explication: "Asymptote verticale $x = 0$." },
    { question: "$\\lim\\limits_{x \\to +\\infty} \\ln x =$", choix: ["$+\\infty$", "$0$", "$1$", "$e$"], bonne: 0, explication: "Croissance lente mais sans limite finie." },
    { question: "Les courbes de $\\ln$ et $\\exp$ sont symétriques par rapport à :", choix: ["la droite $y = x$", "l'axe des abscisses", "l'axe des ordonnées", "l'origine"], bonne: 0, explication: "Fonctions réciproques." },
    { question: "Le premier $n$ tel que $2^n > 1\\,000$ est :", choix: ["$10$", "$9$", "$500$", "$100$"], bonne: 0, explication: "$n > \\dfrac{\\ln 1\\,000}{\\ln 2} \\approx 9{,}97$." },
    { question: "Pour résoudre $0{,}5^n < 0{,}01$, en divisant par $\\ln 0{,}5$ :", choix: ["on change le sens de l'inégalité", "on garde le sens", "on ne peut pas diviser", "on obtient $n < 0$"], bonne: 0, explication: "$\\ln 0{,}5 < 0$." },
    { question: "$\\ln(a + b) =$", choix: ["ne se simplifie pas en général", "$\\ln a + \\ln b$", "$\\ln a \\times \\ln b$", "$\\ln(ab)$"], bonne: 0, explication: "Contre-exemple : $\\ln 2 \\neq \\ln 1 + \\ln 1$." },
    { question: "$f(x) = x - \\ln x$ admet un minimum en :", choix: ["$1$", "$0$", "$e$", "$\\dfrac{1}{e}$"], bonne: 0, explication: "$f'(x) = 1 - \\dfrac{1}{x}$ s'annule en $1$." },
    { question: "Neper a mis en correspondance :", choix: ["une suite géométrique et une suite arithmétique", "deux suites géométriques", "deux fonctions affines", "le sinus et le cosinus"], bonne: 0, explication: "Les produits deviennent des sommes." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Résoudre une équation ou une inéquation",
      etapes: ["Vérifier les conditions : ce qui est dans $\\ln$ doit être strictement positif.", "Isoler $\\ln(\\dots)$ ou $e^{\\dots}$.", "Appliquer $\\exp$ ou $\\ln$ (strictement croissantes : le sens est conservé)."],
      exemple: "$\\ln(2x - 1) = 3 \\iff x = \\dfrac{e^3 + 1}{2}$."
    },
    {
      titre: "Déterminer un seuil",
      etapes: ["Isoler la puissance : $q^n > A$ (ou $< A$).", "Appliquer $\\ln$ : $n\\ln q > \\ln A$.", "Diviser par $\\ln q$, en changeant le sens si $0 < q < 1$, puis prendre le premier entier."],
      exemple: "$1{,}03^n > 1{,}25 \\iff n > 7{,}55$ : $n = 8$."
    },
    {
      titre: "Dériver et étudier une fonction avec ln",
      etapes: ["$(\\ln x)' = \\dfrac{1}{x}$, $(\\ln u)' = \\dfrac{u'}{u}$, produit et quotient si besoin.", "Réduire au même dénominateur pour étudier le signe.", "Dresser le tableau de variations sur $]0\\,;+\\infty[$ (ou là où $u > 0$)."],
      exemple: "$2x - \\ln x$ : $f'(x) = \\dfrac{2x - 1}{x}$, minimum en $\\dfrac{1}{2}$."
    }
  ],
  erreurs: [
    "Écrire $\\ln(a + b) = \\ln a + \\ln b$.",
    "Écrire $\\ln\\left(\\dfrac{a}{b}\\right) = \\dfrac{\\ln a}{\\ln b}$.",
    "Oublier de vérifier que ce qui est dans le logarithme est strictement positif.",
    "Oublier de changer le sens de l'inégalité en divisant par $\\ln q < 0$.",
    "Confondre $\\ln(e^x) = x$ et $e^{\\ln x} = x$ (cette dernière seulement pour $x > 0$).",
    "Croire que $\\ln x$ a une limite finie en $+\\infty$ parce qu'il croît lentement."
  ]
};
