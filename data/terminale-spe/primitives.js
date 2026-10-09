/*
  CHAPITRE : Terminale spécialité — Primitives
  ---------------------------------------------
  Chapitre 10 de la progression de Terminale spécialité (V26, période 3, 2 semaines) :
  équation différentielle y' = f et primitive, primitives des fonctions usuelles, primitives et opérations.
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas de vidéo de la chaîne sur ce thème : vidéos d'Yvan Monka (cours 20Prim-EdT).
  Générateurs : pri- (et tpe-condition).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-spe-primitives"] = {
  niveau: "Terminale spécialité",
  numero: 10,
  titre: "Primitives",
  accroche: "Faire le chemin inverse de la dérivation : retrouver $F$ quand on connaît $F' = f$. Primitives usuelles, formes $u'u^n$, $\\dfrac{u'}{u}$, $u'e^u$, et l'unique primitive qui vérifie une condition.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours complet sur les primitives en vidéo (Yvan Monka)", url: "https://youtu.be/bQ-eS1zZCdw", type: "video" },
    { titre: "Démonstration : deux primitives diffèrent d'une constante (Yvan Monka)", url: "https://youtu.be/oloWk2F4bI8", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Équation $y' = f$ et primitive",
      video: { titre: "Vidéo d'Yvan Monka : vérifier si une fonction est une primitive d'une autre", youtube: "https://youtu.be/7tQqY9Vkmss" },
      texte:
        "Une **équation différentielle** est une équation dont l'inconnue est une **fonction** $y$, et qui fait intervenir ses dérivées. La plus simple est $y' = f$, où $f$ est une fonction donnée.\n\n" +
        "Une solution de $y' = f$ sur un intervalle $I$ s'appelle une **primitive** de $f$ sur $I$ : c'est une fonction $F$ dérivable sur $I$ telle que $F' = f$.\n\n" +
        "- Pour **vérifier** que $F$ est une primitive de $f$, il suffit de dériver $F$.\n" +
        "- Exemple : $F(x) = x^3 + 5$ est une primitive de $f(x) = 3x^2$, et $G(x) = x^3 - 2$ aussi.",
      exemple: {
        enonce: "Vérifie que $F(x) = (x - 1)e^x$ est une primitive de $f(x) = xe^x$ sur $\\mathbb{R}$.",
        solution: "$F'(x) = 1 \\times e^x + (x - 1)e^x = xe^x = f(x)$ : $F$ est bien une primitive de $f$."
      }
    },
    {
      titre: "Toutes les primitives d'une fonction",
      video: { titre: "Vidéo d'Yvan Monka : calculer LA primitive d'une fonction", youtube: "https://youtu.be/-q9M7oJ9gkI" },
      texte:
        "- **Toute fonction continue** sur un intervalle admet des primitives sur cet intervalle (admis ; ce sera justifié au chapitre 13).\n" +
        "- Si $F$ est une primitive de $f$ sur $I$, les primitives de $f$ sur $I$ sont exactement les fonctions $F + C$, avec $C$ réel (démonstration au programme : deux primitives ont la même dérivée, leur différence est constante).\n" +
        "- Pour tous réels $x_0 \\in I$ et $y_0$, il existe une **unique** primitive $F$ de $f$ telle que $F(x_0) = y_0$.\n\n" +
        "Autrement dit, l'équation $y' = f$ a une infinité de solutions, mais une seule vérifie une **condition initiale** donnée.",
      exemple: {
        enonce: "Détermine la primitive $F$ de $f(x) = 2x - 3$ telle que $F(2) = 5$.",
        solution: "Les primitives sont $F(x) = x^2 - 3x + C$. Alors $F(2) = 4 - 6 + C = -2 + C = 5$, donc $C = 7$.\n\n$F(x) = x^2 - 3x + 7$."
      }
    },
    {
      titre: "Primitives des fonctions usuelles",
      video: { titre: "Vidéo d'Yvan Monka : calculer une primitive (1)", youtube: "https://youtu.be/GA6jMgLd_Cw" },
      texte:
        "On lit le tableau des dérivées « à l'envers » ($C$ réel) :\n\n" +
        "- $f(x) = k$ (constante) : $F(x) = kx + C$ ;\n" +
        "- $f(x) = x^n$ ($n$ entier, $n \\neq -1$) : $F(x) = \\dfrac{x^{n+1}}{n + 1} + C$ ;\n" +
        "- $f(x) = \\dfrac{1}{x^2}$ sur $]0\\,;+\\infty[$ ou $]-\\infty\\,;0[$ : $F(x) = -\\dfrac{1}{x} + C$ ;\n" +
        "- $f(x) = \\dfrac{1}{\\sqrt{x}}$ sur $]0\\,;+\\infty[$ : $F(x) = 2\\sqrt{x} + C$ ;\n" +
        "- $f(x) = \\dfrac{1}{x}$ sur $]0\\,;+\\infty[$ : $F(x) = \\ln x + C$ ;\n" +
        "- $f(x) = e^x$ : $F(x) = e^x + C$ ;\n" +
        "- $f(x) = \\cos x$ : $F(x) = \\sin x + C$ et $f(x) = \\sin x$ : $F(x) = -\\cos x + C$ (voir chapitre 12).",
      exemple: {
        enonce: "Donne une primitive de $f(x) = x^4$, de $g(x) = \\dfrac{1}{x^3}$ (sur $]0\\,;+\\infty[$) et de $h(x) = 5$.",
        solution: "$F(x) = \\dfrac{x^5}{5}$.\n\n$g(x) = x^{-3}$, donc $G(x) = \\dfrac{x^{-2}}{-2} = -\\dfrac{1}{2x^2}$.\n\n$H(x) = 5x$."
      }
    },
    {
      titre: "Primitives et opérations",
      video: { titre: "Vidéo d'Yvan Monka : calculer une primitive (2)", youtube: "https://youtu.be/82HYI4xuClw" },
      texte:
        "- **Linéarité** : si $F$ et $G$ sont des primitives de $f$ et $g$, alors $F + G$ est une primitive de $f + g$, et $kF$ une primitive de $kf$.\n" +
        "\n**Formes composées** ($u$ dérivable sur $I$) :\n\n" +
        "- $u'u^n$ ($n \\neq -1$) a pour primitive $\\dfrac{u^{n+1}}{n + 1}$ ;\n" +
        "- $\\dfrac{u'}{u}$ (avec $u > 0$) a pour primitive $\\ln u$ ;\n" +
        "- $u'e^u$ a pour primitive $e^u$ ;\n" +
        "- $\\dfrac{u'}{\\sqrt{u}}$ (avec $u > 0$) a pour primitive $2\\sqrt{u}$ ;\n" +
        "- $\\dfrac{u'}{u^2}$ (avec $u \\neq 0$) a pour primitive $-\\dfrac{1}{u}$.\n\n" +
        "Il n'y a pas de formule pour un produit ou un quotient quelconque : on cherche à **reconnaître** une forme, en ajustant une constante si besoin.",
      exemple: {
        enonce: "Donne une primitive de $f(x) = x(x^2 + 1)^3$ et de $g(x) = e^{3x}$.",
        solution: "Avec $u(x) = x^2 + 1$, $u'(x) = 2x$ : $f = \\dfrac{1}{2}u'u^3$, donc $F(x) = \\dfrac{1}{2} \\times \\dfrac{(x^2 + 1)^4}{4} = \\dfrac{(x^2 + 1)^4}{8}$.\n\n$g = \\dfrac{1}{3} \\times 3e^{3x}$, donc $G(x) = \\dfrac{1}{3}e^{3x}$."
      }
    },
    {
      titre: "Reconnaître une forme",
      video: { titre: "Vidéo d'Yvan Monka : calculer une primitive (3)", youtube: "https://youtu.be/gxRpmHWnoGQ" },
      texte:
        "**Méthode** pour trouver une primitive :\n\n" +
        "- repérer une fonction $u$ « à l'intérieur » ($x^2 + 1$ dans $(x^2 + 1)^3$, $3x$ dans $e^{3x}$) ;\n" +
        "- calculer $u'$ et regarder si $f$ s'écrit $k \\times u' \\times (\\dots)$ ;\n" +
        "- appliquer la forme correspondante, multipliée par la constante $k$ ;\n" +
        "- **vérifier en dérivant**.\n\n" +
        "Exemples : $\\dfrac{2x}{x^2 + 3}$ est de la forme $\\dfrac{u'}{u}$ ; $\\dfrac{x}{x^2 + 3}$ est de la forme $\\dfrac{1}{2} \\times \\dfrac{u'}{u}$ ; $\\dfrac{1}{x^2 + 3}$ n'est d'aucune de ces formes.",
      exemple: {
        enonce: "Donne une primitive de $f(x) = \\dfrac{x}{x^2 + 3}$ sur $\\mathbb{R}$.",
        solution: "$u(x) = x^2 + 3 > 0$, $u'(x) = 2x$ : $f(x) = \\dfrac{1}{2} \\times \\dfrac{2x}{x^2 + 3} = \\dfrac{1}{2} \\times \\dfrac{u'}{u}$.\n\nDonc $F(x) = \\dfrac{1}{2}\\ln(x^2 + 3)$. Vérification : $F'(x) = \\dfrac{1}{2} \\times \\dfrac{2x}{x^2 + 3} = f(x)$."
      }
    },
    {
      titre: "Algorithmique : primitive et calcul",
      texte:
        "Une primitive permet de calculer la différence $F(b) - F(a)$, qui ne dépend **pas** de la primitive choisie : la constante $C$ s'élimine.\n\n" +
        "```python\ndef F(x):\n    return x**3 + x      # une primitive de 3x² + 1\n\nprint(F(2) - F(0))\n```\n\n" +
        "Ce nombre, $F(b) - F(a)$, sera au chapitre 13 l'**intégrale** de $f$ entre $a$ et $b$, qui mesure une aire.\n\n" +
        "On peut aussi vérifier numériquement que $F' = f$ : pour $h$ petit, $\\dfrac{F(x + h) - F(x)}{h}$ doit être proche de $f(x)$.",
      exemple: {
        enonce: "Que renvoie le programme ? Change $F$ en $x^3 + x + 7$ : que renvoie-t-il alors ?",
        solution: "$F(2) - F(0) = (8 + 2) - 0 = 10$.\n\nAvec $x^3 + x + 7$ : $(10 + 7) - 7 = 10$ aussi. La constante s'élimine."
      }
    }
  ],

  videos: [
    { titre: "Calculer une primitive (4)", type: "Primitive", youtube: "https://youtu.be/iiq6eUQee9g" },
    { titre: "Calculer une primitive (3)", type: "Primitive", youtube: "https://youtu.be/gxRpmHWnoGQ" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "pri-verifier", titre: "Reconnaître une primitive", etape: "Primitives", nb: 5 },
    { type: "pri-polynome", titre: "Primitives de polynômes", etape: "Primitives", nb: 5 },
    { type: "tpe-condition", titre: "La primitive qui vérifie une condition", etape: "Primitives", nb: 4 },
    { type: "pri-composees", titre: "Formes $u'u^n$, $\\dfrac{u'}{u}$, $u'e^u$…", etape: "Opérations", nb: 6 },
    { type: "pri-condition", titre: "Conditions initiales", etape: "Opérations", nb: 5 },
    { type: "pri-equation", titre: "Résoudre $y' = f$", etape: "Opérations", nb: 4 },
    { type: "pri-python", titre: "Primitives en Python", etape: "Algorithmique", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$F$ est une primitive de $f$ sur $I$ signifie :", choix: ["$F' = f$ sur $I$", "$f' = F$ sur $I$", "$F = f + C$", "$F(0) = f(0)$"], bonne: 0, explication: "On dérive $F$ pour retrouver $f$." },
    { question: "Une primitive de $f(x) = 6x^2$ est :", choix: ["$2x^3$", "$12x$", "$6x^3$", "$3x^2$"], bonne: 0, explication: "$(2x^3)' = 6x^2$." },
    { question: "Une primitive de $f(x) = x^5$ est :", choix: ["$\\dfrac{x^6}{6}$", "$5x^4$", "$x^6$", "$\\dfrac{x^5}{5}$"], bonne: 0, explication: "On augmente l'exposant de $1$ et on divise par le nouvel exposant." },
    { question: "Si $F$ est une primitive de $f$, les autres primitives sont :", choix: ["les fonctions $F + C$, $C$ réel", "les fonctions $CF$", "la seule fonction $F$", "les fonctions $F'$"], bonne: 0, explication: "Deux primitives diffèrent d'une constante." },
    { question: "Combien de primitives de $f$ vérifient $F(1) = 3$ ?", choix: ["Une seule", "Aucune", "Deux", "Une infinité"], bonne: 0, explication: "La condition fixe la constante." },
    { question: "Une primitive de $f(x) = \\dfrac{1}{x}$ sur $]0\\,;+\\infty[$ est :", choix: ["$\\ln x$", "$-\\dfrac{1}{x^2}$", "$e^x$", "$\\dfrac{x^2}{2}$"], bonne: 0, explication: "$(\\ln x)' = \\dfrac{1}{x}$." },
    { question: "Une primitive de $f(x) = \\dfrac{1}{x^2}$ sur $]0\\,;+\\infty[$ est :", choix: ["$-\\dfrac{1}{x}$", "$\\dfrac{1}{x}$", "$\\ln(x^2)$", "$-\\dfrac{2}{x^3}$"], bonne: 0, explication: "$\\left(-\\dfrac{1}{x}\\right)' = \\dfrac{1}{x^2}$." },
    { question: "Une primitive de $f(x) = e^{2x}$ est :", choix: ["$\\dfrac{1}{2}e^{2x}$", "$2e^{2x}$", "$e^{2x}$", "$\\dfrac{e^{2x + 1}}{2x + 1}$"], bonne: 0, explication: "$\\left(\\dfrac{1}{2}e^{2x}\\right)' = \\dfrac{1}{2} \\times 2e^{2x} = e^{2x}$." },
    { question: "Une primitive de $f(x) = \\dfrac{2x}{x^2 + 1}$ est :", choix: ["$\\ln(x^2 + 1)$", "$\\dfrac{1}{x^2 + 1}$", "$2x\\ln(x^2 + 1)$", "$\\ln(2x)$"], bonne: 0, explication: "Forme $\\dfrac{u'}{u}$ avec $u = x^2 + 1 > 0$." },
    { question: "Une primitive de $f(x) = 3(3x + 1)^4$ est :", choix: ["$\\dfrac{(3x + 1)^5}{5}$", "$(3x + 1)^5$", "$\\dfrac{3(3x + 1)^5}{5}$", "$12(3x + 1)^3$"], bonne: 0, explication: "Forme $u'u^4$ avec $u = 3x + 1$, $u' = 3$." },
    { question: "Une primitive de $f(x) = 2xe^{x^2}$ est :", choix: ["$e^{x^2}$", "$x^2e^{x^2}$", "$2e^{x^2}$", "$e^{2x}$"], bonne: 0, explication: "Forme $u'e^u$ avec $u = x^2$." },
    { question: "Une primitive de $f(x) = \\dfrac{1}{\\sqrt{x}}$ sur $]0\\,;+\\infty[$ est :", choix: ["$2\\sqrt{x}$", "$\\sqrt{x}$", "$\\dfrac{1}{2\\sqrt{x}}$", "$\\ln\\sqrt{x}$"], bonne: 0, explication: "$(2\\sqrt{x})' = 2 \\times \\dfrac{1}{2\\sqrt{x}} = \\dfrac{1}{\\sqrt{x}}$." },
    { question: "La primitive de $f(x) = 2x$ telle que $F(1) = 0$ est :", choix: ["$x^2 - 1$", "$x^2$", "$x^2 + 1$", "$2x - 2$"], bonne: 0, explication: "$F(x) = x^2 + C$ et $1 + C = 0$." },
    { question: "Les solutions de l'équation différentielle $y' = 4x^3$ sont :", choix: ["$y = x^4 + C$, $C$ réel", "$y = 12x^2 + C$", "$y = x^4$", "$y = 4x^4 + C$"], bonne: 0, explication: "Ce sont les primitives de $4x^3$." },
    { question: "Pour vérifier que $F$ est une primitive de $f$, on :", choix: ["calcule $F'$ et on compare à $f$", "calcule $f'$ et on compare à $F$", "calcule $F(0)$", "trace $F$"], bonne: 0, explication: "Par définition : $F' = f$." },
    { question: "$F(x) = x\\ln x - x$ est une primitive sur $]0\\,;+\\infty[$ de :", choix: ["$\\ln x$", "$\\dfrac{1}{x}$", "$\\ln x - 1$", "$x\\ln x$"], bonne: 0, explication: "$F'(x) = \\ln x + x \\times \\dfrac{1}{x} - 1 = \\ln x$." },
    { question: "Une primitive de $f(x) = \\dfrac{x}{x^2 + 4}$ est :", choix: ["$\\dfrac{1}{2}\\ln(x^2 + 4)$", "$\\ln(x^2 + 4)$", "$2\\ln(x^2 + 4)$", "$\\dfrac{x^2}{2}\\ln(x^2 + 4)$"], bonne: 0, explication: "$f = \\dfrac{1}{2} \\times \\dfrac{2x}{x^2 + 4}$." },
    { question: "$F$ et $G$ sont deux primitives de $f$, avec $F(0) = 1$ et $G(0) = 4$. Alors :", choix: ["$G = F + 3$", "$G = 4F$", "$G = F$", "$G = F - 3$"], bonne: 0, explication: "Elles diffèrent d'une constante, qui vaut $G(0) - F(0) = 3$." },
    { question: "Si $F$ est une primitive de $f$, la valeur de $F(3) - F(1)$ :", choix: ["ne dépend pas de la primitive choisie", "dépend de la constante $C$", "vaut toujours $0$", "vaut $f(3) - f(1)$"], bonne: 0, explication: "$(F(3) + C) - (F(1) + C) = F(3) - F(1)$." },
    { question: "Toute fonction continue sur un intervalle :", choix: ["admet des primitives sur cet intervalle", "est dérivable", "admet une seule primitive", "est une primitive"], bonne: 0, explication: "C'est une propriété admise, justifiée au chapitre 13 avec l'intégrale." },
    { question: "Une primitive de $f(x) = \\dfrac{3}{(x + 1)^2}$ sur $]-1\\,;+\\infty[$ est :", choix: ["$-\\dfrac{3}{x + 1}$", "$\\dfrac{3}{x + 1}$", "$3\\ln(x + 1)^2$", "$-\\dfrac{6}{(x + 1)^3}$"], bonne: 0, explication: "Forme $3 \\times \\dfrac{u'}{u^2}$ avec $u = x + 1$." },
    { question: "Une primitive de $f(x) = 4x^3 - 2x + 1$ est :", choix: ["$x^4 - x^2 + x$", "$12x^2 - 2$", "$4x^4 - 2x^2 + x$", "$x^4 - 2x^2 + 1$"], bonne: 0, explication: "Terme à terme : $x^4$, $-x^2$ et $x$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Trouver une primitive",
      etapes: [
        "Découper $f$ en somme de termes simples (linéarité).",
        "Pour chaque terme, utiliser le tableau des primitives usuelles, ou reconnaître une forme $u'u^n$, $\\dfrac{u'}{u}$, $u'e^u$, $\\dfrac{u'}{\\sqrt{u}}$, $\\dfrac{u'}{u^2}$.",
        "Ajuster la constante multiplicative si $u'$ n'apparaît pas exactement.",
        "Vérifier en dérivant le résultat."
      ],
      exemple: "$f(x) = e^{-x} + \\dfrac{1}{x}$ sur $]0\\,;+\\infty[$ : $F(x) = -e^{-x} + \\ln x$."
    },
    {
      titre: "Déterminer la primitive qui vérifie une condition",
      etapes: [
        "Écrire la forme générale $F(x) = G(x) + C$, où $G$ est une primitive de $f$.",
        "Remplacer $x$ par $x_0$ dans la condition $F(x_0) = y_0$.",
        "Résoudre l'équation en $C$.",
        "Écrire $F$ avec la valeur de $C$ trouvée."
      ],
      exemple: "$f(x) = e^{2x}$, $F(0) = 1$ : $F(x) = \\dfrac{1}{2}e^{2x} + C$, $\\dfrac{1}{2} + C = 1$, donc $F(x) = \\dfrac{1}{2}e^{2x} + \\dfrac{1}{2}$."
    },
    {
      titre: "Vérifier qu'une fonction est une primitive",
      etapes: [
        "Dériver la fonction proposée $F$ (produit, composée…).",
        "Simplifier $F'(x)$.",
        "Comparer avec $f(x)$ : si $F' = f$ sur l'intervalle, c'est une primitive.",
        "Bon réflexe pour les formes qu'on ne sait pas « intégrer » directement : l'énoncé donne souvent $F$, il reste à vérifier."
      ],
      exemple: "$F(x) = (2x - 1)e^{x}$ : $F'(x) = 2e^x + (2x - 1)e^x = (2x + 1)e^x$, primitive de $(2x + 1)e^x$."
    }
  ],
  erreurs: [
    "Dériver au lieu de chercher une primitive.",
    "Oublier de diviser par le nouvel exposant : une primitive de $x^3$ est $\\dfrac{x^4}{4}$, pas $x^4$.",
    "Oublier la constante $C$ quand on demande **toutes** les primitives.",
    "Écrire qu'une primitive de $e^{3x}$ est $3e^{3x}$ (c'est la dérivée) : c'est $\\dfrac{1}{3}e^{3x}$.",
    "Croire qu'une primitive d'un produit est le produit des primitives.",
    "Utiliser $\\ln u$ sans vérifier que $u > 0$ sur l'intervalle.",
    "Ne pas vérifier son résultat en le dérivant."
  ]
};
