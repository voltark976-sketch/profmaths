/*
  CHAPITRE : Première technologique — Fonctions polynômes de degré 2
  -------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme 2026 de première technologique, « Fonctions polynômes de degré 2 » : allure, axe de symétrie, sommet (par la
  symétrie, en résolvant f(x) = c), tableau de variations ; associer une parabole aux formes ax², ax² + c, a(x − x1)(x − x2) ;
  racines et signe d'un polynôme donné sous forme factorisée ; vérifier qu'une valeur est racine ; factoriser dans des cas
  simples connaissant une racine. Le discriminant n'est PAS au programme (un solveur peut servir en cas de besoin).
  video : vidéos de la chaîne (Première spé) et d'Yvan Monka. Générateurs : préfixe yp- dans assets/exercices-techno.js ; figures "yp-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["techno-second-degre"] = {
  niveau: "Première technologique",
  numero: 8,
  titre: "Fonctions polynômes de degré 2",
  accroche: "La parabole : son orientation, son axe de symétrie, son sommet, et la **forme factorisée** $a(x - x_1)(x - x_2)$ qui donne racines et signe sans aucune formule.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : second degré, chapitre 1 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19SecondegreT1M.pdf" },
    { titre: "Cours d'Yvan Monka : second degré, chapitre 2 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19SecondegreT2M.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "La parabole : orientation et sommet",
      figure: "yp-cours-orientation",
      video: { titre: "Vidéo d'Yvan Monka : associer une fonction de degré 2 à sa courbe", youtube: "https://youtu.be/hRadBik3zRk" },
      texte:
        "Une **fonction polynôme de degré 2** s'écrit $f(x) = ax^2 + bx + c$ avec $a \\neq 0$. Sa courbe est une **parabole** :\n\n" +
        "- tournée vers le **haut** si $a > 0$ (elle a un point le plus bas, le **minimum**) ;\n" +
        "- tournée vers le **bas** si $a < 0$ (elle a un point le plus haut, le **maximum**).\n\n" +
        "Ce point extrême est le **sommet**. La parabole est symétrique par rapport à la droite verticale passant par le sommet : son **axe de symétrie**. Deux points de la courbe qui ont la même ordonnée sont symétriques par rapport à cet axe.\n\n" +
        "Cas particuliers : $f(x) = ax^2$ a pour sommet l'origine ; $f(x) = ax^2 + c$ a pour sommet $(0\\,;c)$, sur l'axe des ordonnées.",
      exemple: {
        enonce: "Décris la courbe de $f(x) = -3x^2 + 2$.",
        solution: "$a = -3 < 0$ : parabole tournée vers le bas, sommet $(0\\,;2)$ (forme $ax^2 + c$), maximum $2$ atteint en $x = 0$, axe de symétrie $x = 0$."
      }
    },
    {
      titre: "Trouver l'axe de symétrie sans formule",
      figure: "yp-cours-factorisee",
      video: { titre: "Vidéo de ton prof : lire une forme canonique, sommet et extremum (exercice corrigé)", youtube: "https://youtu.be/bd8ZITKW6hs" },
      texte:
        "Aucune formule n'est attendue pour le sommet : on utilise la **symétrie**.\n\n" +
        "- Avec deux points de même ordonnée : l'axe passe au milieu. Pour $f(x) = ax^2 + bx + c$, on résout $f(x) = c$ : $ax^2 + bx = x(ax + b) = 0$ donne $x = 0$ et $x = -\\dfrac{b}{a}$ ; l'axe est au milieu, $x = -\\dfrac{b}{2a}$.\n" +
        "- Avec les **racines** $x_1$ et $x_2$ (là où la courbe coupe l'axe des abscisses) : l'axe est $x = \\dfrac{x_1 + x_2}{2}$.\n\n" +
        "L'**ordonnée du sommet** est l'image de cette abscisse. Le **tableau de variations** s'en déduit : si $a > 0$, $f$ décroît jusqu'à l'axe puis croît ; si $a < 0$, l'inverse.",
      exemple: {
        enonce: "$f(x) = (x - 1)(x - 5)$. Donne le sommet et le tableau de variations.",
        solution: "Racines $1$ et $5$, axe $x = 3$, $f(3) = (2)(-2) = -4$ : sommet $(3\\,;-4)$. $a = 1 > 0$ : $f$ est décroissante sur $]-\\infty\\,;3]$ et croissante sur $[3\\,;+\\infty[$, minimum $-4$."
      }
    },
    {
      titre: "Forme factorisée : racines",
      video: { titre: "Vidéo de ton prof : second degré, forme factorisée (cours complet)", youtube: "https://youtu.be/p4GJqFX6bMk" },
      texte:
        "Une **racine** de $f$ est un nombre $x$ tel que $f(x) = 0$ : c'est l'abscisse d'un point où la parabole coupe l'axe des abscisses. Pour **vérifier** qu'une valeur est racine, on calcule son image : $2$ est racine de $x^2 - 3x + 2$ car $4 - 6 + 2 = 0$.\n\n" +
        "Quand $f$ est donnée sous **forme factorisée** $f(x) = a(x - x_1)(x - x_2)$, ses racines sont $x_1$ et $x_2$ (produit nul). Réciproquement, si on connaît les racines et $a$, on peut écrire cette forme : une parabole qui coupe l'axe en $-1$ et $4$ avec $a = 2$ est $f(x) = 2(x + 1)(x - 4)$.\n\n" +
        "**Factoriser connaissant une racine** (cas simples) : si $3$ est racine de $x^2 - 7x + 12$, on écrit $(x - 3)(x - x_2)$ et on identifie le terme constant : $-3 \\times (-x_2) = 12$, donc $x_2 = 4$ et $x^2 - 7x + 12 = (x - 3)(x - 4)$.\n\n" +
        "Le calcul des racines par le discriminant n'est pas au programme : si une équation du second degré sans racine évidente se présente, on utilise un solveur ou le graphique.",
      exemple: {
        enonce: "Factorise $x^2 + 2x - 8$ sachant que $2$ est une racine.",
        solution: "$(x - 2)(x - x_2)$ : terme constant $-2 \\times (-x_2) = 2x_2 = -8$, donc $x_2 = -4$ et $x^2 + 2x - 8 = (x - 2)(x + 4)$."
      }
    },
    {
      titre: "Forme factorisée : signe",
      figure: "yp-cours-signe",
      video: { titre: "Vidéo de ton prof : signe d'une forme factorisée et inéquations (exercice corrigé)", youtube: "https://youtu.be/xpcwo2134yI" },
      texte:
        "Pour $f(x) = a(x - x_1)(x - x_2)$ avec $x_1 < x_2$, le **tableau de signes** donne :\n\n" +
        "- **du signe de $a$ à l'extérieur** des racines (pour $x < x_1$ ou $x > x_2$) ;\n" +
        "- **du signe contraire entre** les racines (pour $x_1 < x < x_2$) ;\n" +
        "- nul en $x_1$ et $x_2$.\n\n" +
        "Graphiquement : si $a > 0$, la parabole est en dessous de l'axe entre ses racines et au-dessus ailleurs. Ce tableau résout les inéquations : $(x - 1)(x - 5) \\leqslant 0 \\Leftrightarrow x \\in [1\\,;5]$.",
      exemple: {
        enonce: "Résous $-2(x + 3)(x - 1) > 0$.",
        solution: "Racines $-3$ et $1$, $a = -2 < 0$ : négatif à l'extérieur, positif entre. $S = ]-3\\,;1[$."
      }
    },
    {
      titre: "Modéliser : trajectoire, aire maximale",
      figure: "yp-cours-trajectoire",
      video: { titre: "Vidéo de jaicompris : trouver la hauteur maximale d'un lancer", youtube: "https://youtu.be/SSOVZDZA2BA" },
      texte:
        "Beaucoup de situations se modélisent par un polynôme de degré 2 : hauteur d'un projectile, aire d'un rectangle de périmètre fixé, bénéfice en fonction d'une quantité, hauteur de marée…\n\n" +
        "Exemple : une balle lancée verticalement a pour hauteur $h(t) = -5t^2 + 20t$ (en m, $t$ en s). Forme factorisée : $h(t) = -5t(t - 4)$, racines $0$ et $4$ : la balle retombe au bout de $4$ s. Sommet au milieu, $t = 2$ : hauteur maximale $h(2) = 20$ m.\n\n" +
        "Autre exemple : avec $40$ m de grillage, un jardin rectangulaire de largeur $x$ a pour aire $A(x) = x(20 - x)$ ; racines $0$ et $20$, maximum en $x = 10$ : le carré de $10$ m de côté, d'aire $100$ m².",
      exemple: {
        enonce: "Un bénéfice (en milliers d'euros) vaut $B(x) = -(x - 2)(x - 10)$ pour $x$ centaines d'articles. Pour quelles quantités le bénéfice est-il positif ? Quel est le bénéfice maximal ?",
        solution: "$a = -1 < 0$ : positif entre les racines, pour $x \\in ]2\\,;10[$. Maximum en $x = 6$ : $B(6) = -(4)(-4) = 16$, soit $16\\,000$ €."
      }
    },
    {
      titre: "Python : tester une racine, balayer",
      video: { titre: "Vidéo d'Yvan Monka : créer une liste en compréhension en Python", youtube: "https://youtu.be/TzVQgK6RSXc" },
      texte:
        "```python\ndef f(x):\n    return x ** 2 - 7 * x + 12\n\nprint(f(3) == 0, f(4) == 0)                    # True True : 3 et 4 sont racines\nracines = [x for x in range(-10, 11) if f(x) == 0]   # racines entières entre -10 et 10\nprint(racines)                                  # [3, 4]\n```\n\n" +
        "Quand les racines ne sont pas entières, un balayage (chapitre 7) ou un solveur de calculatrice donne des valeurs approchées."
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "yp-allure", titre: "Associer une parabole à son expression", etape: "Allure", nb: 5 },
    { type: "yp-sommet", titre: "Axe de symétrie, sommet, variations", etape: "Sommet", nb: 5 },
    { type: "yp-racines", titre: "Racines d'un polynôme de degré 2", etape: "Forme factorisée", nb: 5 },
    { type: "yp-factoriser", titre: "Factoriser connaissant une racine", etape: "Forme factorisée", nb: 5 },
    { type: "yp-signe", titre: "Signe et inéquations", etape: "Forme factorisée", nb: 5 },
    { type: "yp-modeliser", titre: "Trajectoire, aire, bénéfice", etape: "Modéliser", nb: 4 },
    { type: "yp-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "La courbe de $f(x) = -2x^2 + 3x - 1$ est :", choix: ["tournée vers le bas", "tournée vers le haut", "une droite", "symétrique par rapport à l'axe des abscisses"], bonne: 0, explication: "$a = -2 < 0$." },
    { question: "Le sommet de la parabole $y = 3x^2 - 5$ est :", choix: ["$(0\\,;-5)$", "$(-5\\,;0)$", "$(3\\,;-5)$", "$(0\\,;3)$"], bonne: 0, explication: "Forme $ax^2 + c$ : sommet $(0\\,;c)$." },
    { question: "Une parabole de sommet l'origine passant par $(2\\,;12)$ a pour équation :", choix: ["$y = 3x^2$", "$y = 6x^2$", "$y = 12x^2$", "$y = 2x^2$"], bonne: 0, explication: "$y = ax^2$ et $a \\times 4 = 12$." },
    { question: "Les racines de $f(x) = 2(x - 3)(x + 4)$ sont :", choix: ["$3$ et $-4$", "$-3$ et $4$", "$2$, $3$ et $-4$", "$3$ et $4$"], bonne: 0, explication: "$x - 3 = 0$ ou $x + 4 = 0$." },
    { question: "L'axe de symétrie de la parabole $y = (x - 2)(x - 8)$ est :", choix: ["$x = 5$", "$x = 3$", "$x = 10$", "$x = -5$"], bonne: 0, explication: "Milieu des racines : $\\dfrac{2 + 8}{2} = 5$." },
    { question: "Le sommet de la parabole $y = (x - 2)(x - 8)$ a pour ordonnée :", choix: ["$-9$", "$5$", "$9$", "$16$"], bonne: 0, explication: "$f(5) = 3 \\times (-3) = -9$." },
    { question: "Pour $f(x) = x^2 + 6x + 1$, résoudre $f(x) = 1$ donne $x = 0$ ou $x = -6$. L'axe de symétrie est :", choix: ["$x = -3$", "$x = 3$", "$x = -6$", "$x = 1$"], bonne: 0, explication: "Milieu de $0$ et $-6$." },
    { question: "$f(x) = -(x + 1)(x - 3)$ admet :", choix: ["un maximum en $x = 1$", "un minimum en $x = 1$", "un maximum en $x = -1$", "un minimum en $x = 3$"], bonne: 0, explication: "$a = -1 < 0$ : maximum, au milieu des racines $-1$ et $3$." },
    { question: "$3$ est-il racine de $f(x) = x^2 - 5x + 6$ ?", choix: ["oui, car $f(3) = 0$", "non, car $f(3) = 6$", "non, car $3$ n'est pas un carré", "oui, car $f(0) = 6$"], bonne: 0, explication: "$9 - 15 + 6 = 0$." },
    { question: "Sachant que $2$ est racine de $x^2 - 9x + 14$, l'autre racine est :", choix: ["$7$", "$-7$", "$14$", "$9$"], bonne: 0, explication: "$(x - 2)(x - x_2)$ : $-2 \\times (-x_2) = 14$, $x_2 = 7$." },
    { question: "La forme factorisée de $f(x) = x^2 - x - 6$, de racines $-2$ et $3$, est :", choix: ["$(x + 2)(x - 3)$", "$(x - 2)(x + 3)$", "$(x + 2)(x + 3)$", "$(x - 2)(x - 3)$"], bonne: 0, explication: "$a(x - x_1)(x - x_2)$ avec $x_1 = -2$ : $(x + 2)$." },
    { question: "Une parabole coupe l'axe des abscisses en $1$ et $5$ et a pour coefficient $a = -2$. Son équation est :", choix: ["$y = -2(x - 1)(x - 5)$", "$y = -2(x + 1)(x + 5)$", "$y = (x - 1)(x - 5)$", "$y = -2x^2 + 5$"], bonne: 0, explication: "$a(x - x_1)(x - x_2)$." },
    { question: "$f(x) = (x - 2)(x - 6)$ est négatif pour :", choix: ["$x \\in ]2\\,;6[$", "$x < 2$", "$x > 6$", "tout $x$"], bonne: 0, explication: "$a = 1 > 0$ : signe contraire entre les racines." },
    { question: "$f(x) = -3(x + 1)(x - 4)$ est positif pour :", choix: ["$x \\in ]-1\\,;4[$", "$x < -1$ ou $x > 4$", "tout $x$", "$x > 0$"], bonne: 0, explication: "$a = -3 < 0$ : positif entre les racines." },
    { question: "L'inéquation $(x + 5)(x - 1) \\geqslant 0$ a pour solutions :", choix: ["$]-\\infty\\,;-5] \\cup [1\\,;+\\infty[$", "$[-5\\,;1]$", "$[1\\,;5]$", "$[-1\\,;5]$"], bonne: 0, explication: "Positif (signe de $a = 1$) à l'extérieur des racines $-5$ et $1$." },
    { question: "Sans calculer, le signe de $f(7) $ pour $f(x) = (x - 2)(x - 6)$ est :", choix: ["positif", "négatif", "nul", "impossible à dire"], bonne: 0, explication: "$7$ est à l'extérieur des racines, signe de $a = 1$." },
    { question: "Une balle a pour hauteur $h(t) = -5t(t - 6)$. Elle retombe au sol à :", choix: ["$t = 6$ s", "$t = 3$ s", "$t = 5$ s", "$t = 30$ s"], bonne: 0, explication: "Racines $0$ et $6$." },
    { question: "La hauteur maximale de la balle précédente est :", choix: ["$45$ m", "$30$ m", "$90$ m", "$15$ m"], bonne: 0, explication: "Sommet en $t = 3$ : $h(3) = -15 \\times (-3) = 45$." },
    { question: "Avec $60$ m de grillage, un rectangle de largeur $x$ a pour aire $x(30 - x)$. L'aire est maximale pour :", choix: ["$x = 15$ m", "$x = 30$ m", "$x = 60$ m", "$x = 10$ m"], bonne: 0, explication: "Racines $0$ et $30$, sommet au milieu." },
    { question: "Pour $f(x) = ax^2 + bx + c$, le programme recommande de trouver l'axe de symétrie :", choix: ["en résolvant $f(x) = c$ et en prenant le milieu des solutions", "en calculant le discriminant", "en dérivant", "en lisant $b$"], bonne: 0, explication: "Les solutions $0$ et $-\\dfrac{b}{a}$ sont symétriques par rapport à l'axe." },
    { question: "$f(x) = 2(x - 1)^2 - 3$ (les deux racines sont confondues ou absentes). Son sommet est :", choix: ["$(1\\,;-3)$", "$(-1\\,;3)$", "$(2\\,;-3)$", "$(1\\,;3)$"], bonne: 0, explication: "$(x - 1)^2 \\geqslant 0$ est minimal (nul) en $x = 1$, et $f(1) = -3$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Décrire une parabole",
      figure: "yp-cours-orientation",
      etapes: [
        "Lire le signe de $a$ : vers le haut ($a > 0$, minimum) ou vers le bas ($a < 0$, maximum).",
        "Trouver l'axe de symétrie : milieu des racines, ou milieu des solutions de $f(x) = c$.",
        "Calculer l'ordonnée du sommet : l'image de cette abscisse.",
        "Dresser le tableau de variations."
      ],
      exemple: "$f(x) = -(x + 2)(x - 4)$ : vers le bas, axe $x = 1$, sommet $(1\\,;9)$, maximum $9$."
    },
    {
      titre: "Racines et forme factorisée",
      figure: "yp-cours-factorisee",
      etapes: [
        "Forme factorisée donnée : les racines sont les valeurs qui annulent chaque facteur.",
        "Vérifier une racine : calculer $f(x_0)$ et trouver $0$.",
        "Connaissant une racine $x_1$ et $a$ : écrire $a(x - x_1)(x - x_2)$ et identifier le terme constant (ou le coefficient de $x$) pour trouver $x_2$.",
        "Vérifier en développant."
      ],
      exemple: "$x^2 + 3x - 10$, racine $2$ : $(x - 2)(x - x_2)$, $-2 \\times (-x_2) = -10$, $x_2 = -5$ : $(x - 2)(x + 5)$."
    },
    {
      titre: "Signe et inéquation",
      figure: "yp-cours-signe",
      etapes: [
        "Mettre sous forme factorisée $a(x - x_1)(x - x_2)$ et repérer $x_1 < x_2$.",
        "Signe de $a$ à l'extérieur des racines, signe contraire entre.",
        "Dresser le tableau de signes (ou lire la parabole).",
        "Lire l'ensemble solution, bornes comprises pour $\\leqslant$ et $\\geqslant$."
      ],
      exemple: "$3(x - 1)(x + 2) < 0$ : $a > 0$, négatif entre : $S = ]-2\\,;1[$."
    },
    {
      titre: "Résoudre un problème d'optimisation",
      figure: "yp-cours-trajectoire",
      etapes: [
        "Exprimer la grandeur en fonction de la variable : $f(x) = a(x - x_1)(x - x_2)$ (factoriser si besoin).",
        "Les racines donnent les valeurs où la grandeur est nulle ; l'extremum est au milieu.",
        "Calculer l'image du milieu : c'est le maximum (si $a < 0$) ou le minimum.",
        "Répondre avec les unités et vérifier la cohérence (positivité, domaine)."
      ],
      exemple: "$A(x) = x(20 - x)$ : racines $0$ et $20$, maximum $A(10) = 100$ m²."
    }
  ],
  erreurs: [
    "Lire les racines avec le mauvais signe : $(x + 3)$ s'annule en $-3$, pas en $3$.",
    "Prendre le sommet aux racines : il est au **milieu** des racines.",
    "Confondre abscisse du sommet (sur l'axe de symétrie) et ordonnée du sommet (l'extremum).",
    "Oublier le coefficient $a$ dans la forme factorisée : $2(x - 1)(x - 3)$ n'est pas $(x - 1)(x - 3)$.",
    "Dire « positif entre les racines » sans regarder le signe de $a$.",
    "Vouloir utiliser le discriminant : la forme factorisée ou une racine évidente suffit en Première technologique.",
    "Oublier les bornes dans une inéquation large ($\\leqslant$, $\\geqslant$).",
    "Garder une solution hors du contexte (longueur négative, temps négatif)."
  ]
};
