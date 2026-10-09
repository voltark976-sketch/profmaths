/*
  CHAPITRE : Terminale spécialité — Dérivation et convexité
  ----------------------------------------------------------
  Chapitre 2 de la progression de Terminale spécialité (V26, période 1, 2 semaines) :
  complément de dérivation (fonctions composées, dérivée seconde), convexité (approche graphique,
  convexité des fonctions dérivables, point d'inflexion, inégalités).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas de vidéo de la chaîne sur ce thème : vidéos d'Yvan Monka (cours 20DerivT et 20ConvexiteT).
  Figures : "dvx-convexe", "dvx-inflexion". Générateurs : dvx- (et d2-produit, tcv-graphique).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-spe-derivation-convexite"] = {
  niveau: "Terminale spécialité",
  numero: 2,
  titre: "Dérivation et convexité",
  accroche: "Dériver des fonctions composées comme $\\sqrt{u}$, $u^n$ ou $e^u$, puis lire la forme d'une courbe : en « U » (convexe), en « cloche » (concave), et là où elle change, le point d'inflexion.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours complet sur la convexité en vidéo (Yvan Monka)", url: "https://youtu.be/gge4xdn6cFA", type: "video" },
    { titre: "Démonstration : si f'' ≥ 0, alors f est convexe (Yvan Monka)", url: "https://youtu.be/-OG8l5Batuo", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Rappels : dérivées usuelles et opérations",
      video: { titre: "Vidéo d'Yvan Monka : le cours de dérivation (rappels de Première)", youtube: "https://youtu.be/XAgdHblbajE" },
      texte:
        "**Dérivées usuelles** : $(x^n)' = nx^{n-1}$ ; $\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$ ; $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$ (pour $x > 0$) ; $(e^x)' = e^x$.\n\n" +
        "**Opérations** ($u$ et $v$ dérivables, $k$ réel) :\n\n" +
        "- $(u + v)' = u' + v'$ et $(ku)' = ku'$ ;\n" +
        "- $(uv)' = u'v + uv'$ ;\n" +
        "- $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$ là où $v \\neq 0$ ;\n" +
        "- $(g(ax + b))' = a \\, g'(ax + b)$, par exemple $(e^{kx})' = ke^{kx}$.\n\n" +
        "**Utilité** : le signe de $f'$ donne les variations de $f$, et $f'(a)$ est le coefficient directeur de la tangente en $a$ : $y = f'(a)(x - a) + f(a)$.",
      exemple: {
        enonce: "Dérive $f(x) = (2x - 1)e^x$.",
        solution: "Produit avec $u(x) = 2x - 1$ et $v(x) = e^x$ : $u'(x) = 2$, $v'(x) = e^x$.\n\n$f'(x) = 2e^x + (2x - 1)e^x = (2x + 1)e^x$."
      }
    },
    {
      titre: "Composée de deux fonctions",
      video: { titre: "Vidéo d'Yvan Monka : identifier la composée de deux fonctions", youtube: "https://youtu.be/08HgDgD6XL8" },
      texte:
        "La **composée** de $u$ suivie de $v$ est la fonction $v \\circ u$ (« $v$ rond $u$ ») définie par $(v \\circ u)(x) = v(u(x))$ : on applique **d'abord** $u$, **puis** $v$ au résultat.\n\n" +
        "- Il faut que $u(x)$ soit dans l'ensemble de définition de $v$.\n" +
        "- En général, $v \\circ u \\neq u \\circ v$ : l'ordre compte.\n\n" +
        "Pour reconnaître une composée, on se demande ce qu'on calcule **en premier** avec $x$ : c'est $u$. Par exemple, $f(x) = \\sqrt{3x^2 + 1}$ : on calcule $u(x) = 3x^2 + 1$, puis on prend $v(x) = \\sqrt{x}$.",
      exemple: {
        enonce: "On pose $u(x) = 2x - 1$ et $v(x) = x^2$. Calcule $(v \\circ u)(3)$ et $(u \\circ v)(3)$.",
        solution: "$(v \\circ u)(3) = v(u(3)) = v(5) = 25$.\n\n$(u \\circ v)(3) = u(v(3)) = u(9) = 17$. Les deux résultats sont différents : l'ordre compte."
      }
    },
    {
      titre: "Dériver une fonction composée",
      video: { titre: "Vidéo d'Yvan Monka : dériver une fonction composée (cas général)", youtube: "https://youtu.be/lwcFgnbs0Ew" },
      texte:
        "Si $u$ est dérivable sur $I$ et $v$ dérivable sur un intervalle contenant $u(I)$, alors $v \\circ u$ est dérivable sur $I$ et :\n\n" +
        "$(v \\circ u)' = u' \\times (v' \\circ u)$, c'est-à-dire $(v(u(x)))' = u'(x) \\times v'(u(x))$.\n\n" +
        "Cas particuliers à connaître :\n\n" +
        "- $(u^n)' = n \\, u' \\, u^{n-1}$ ($n$ entier non nul) ;\n" +
        "- $(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$ (si $u > 0$) ;\n" +
        "- $(e^u)' = u' \\, e^u$ ;\n" +
        "- $\\left(\\dfrac{1}{u}\\right)' = -\\dfrac{u'}{u^2}$ (si $u \\neq 0$).\n\n" +
        "L'erreur la plus fréquente : oublier de multiplier par $u'$.",
      exemple: {
        enonce: "Dérive $f(x) = (x^2 + 1)^3$ et $g(x) = e^{-x^2}$, puis étudie les variations de $g$.",
        solution: "$f'(x) = 3 \\times 2x \\times (x^2 + 1)^2 = 6x(x^2 + 1)^2$.\n\n$g'(x) = -2x \\, e^{-x^2}$. Comme $e^{-x^2} > 0$, $g'$ a le signe de $-2x$ : $g$ est croissante sur $]-\\infty\\,;0]$ et décroissante sur $[0\\,;+\\infty[$, avec un maximum $g(0) = 1$."
      }
    },
    {
      titre: "Dérivée seconde",
      video: { titre: "Vidéo d'Yvan Monka : déterminer la dérivée seconde d'une fonction", youtube: "https://youtu.be/W6rypabq8uA" },
      texte:
        "Si $f'$ est elle-même dérivable, sa dérivée est la **dérivée seconde** de $f$, notée $f''$ : $f'' = (f')'$.\n\n" +
        "- $f'$ mesure la pente de la courbe ; $f''$ mesure comment cette pente **évolue**.\n" +
        "- En physique : si $x(t)$ est une position, $x'(t)$ est la vitesse et $x''(t)$ l'accélération.\n\n" +
        "On dérive deux fois de suite, en simplifiant $f'$ avant de la dériver à nouveau.",
      exemple: {
        enonce: "Calcule $f''(x)$ pour $f(x) = x^3 - 6x^2 + 5$ et pour $g(x) = 3e^{2x}$.",
        solution: "$f'(x) = 3x^2 - 12x$ et $f''(x) = 6x - 12$.\n\n$g'(x) = 6e^{2x}$ et $g''(x) = 12e^{2x}$."
      }
    },
    {
      titre: "Convexité : approche graphique",
      figure: "dvx-convexe",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître graphiquement la convexité", youtube: "https://youtu.be/ERML85y_s6E" },
      texte:
        "Soit $f$ dérivable sur un intervalle $I$.\n\n" +
        "- $f$ est **convexe** sur $I$ si sa courbe est **au-dessus de toutes ses tangentes** sur $I$. De façon équivalente, la courbe est **en dessous de ses cordes** : entre deux points de la courbe, elle reste sous le segment qui les relie. La courbe a une forme de « U ».\n" +
        "- $f$ est **concave** sur $I$ si sa courbe est **en dessous de ses tangentes** (et au-dessus de ses cordes) : forme de « cloche ».\n\n" +
        "Fonctions de référence : $x \\mapsto x^2$ et $x \\mapsto e^x$ sont convexes sur $\\mathbb{R}$ ; $x \\mapsto \\sqrt{x}$ est concave sur $[0\\,;+\\infty[$ ; $x \\mapsto \\dfrac{1}{x}$ est concave sur $]-\\infty\\,;0[$ et convexe sur $]0\\,;+\\infty[$ ; $x \\mapsto x^3$ est concave sur $]-\\infty\\,;0]$ et convexe sur $[0\\,;+\\infty[$.",
      exemple: {
        enonce: "La fonction carré est convexe. Que peut-on en déduire en comparant $x^2$ et la corde entre les points d'abscisses $0$ et $2$ ?",
        solution: "La corde passe par $(0\\,;0)$ et $(2\\,;4)$ : elle a pour équation $y = 2x$.\n\nLa courbe est sous ses cordes : pour tout $x \\in [0\\,;2]$, $x^2 \\leqslant 2x$. On le vérifie : $2x - x^2 = x(2 - x) \\geqslant 0$ sur $[0\\,;2]$."
      }
    },
    {
      titre: "Convexité des fonctions dérivables",
      video: { titre: "Vidéo d'Yvan Monka : étudier la convexité d'une fonction", youtube: "https://youtu.be/8H2aYKN8NGE" },
      texte:
        "Soit $f$ deux fois dérivable sur un intervalle $I$. Les trois affirmations suivantes sont équivalentes :\n\n" +
        "- $f$ est convexe sur $I$ ;\n" +
        "- $f'$ est **croissante** sur $I$ (les pentes des tangentes augmentent) ;\n" +
        "- $f'' \\geqslant 0$ sur $I$.\n\n" +
        "De même, $f$ est concave sur $I$ si et seulement si $f'$ est décroissante sur $I$, si et seulement si $f'' \\leqslant 0$ sur $I$.\n\n" +
        "**Méthode** : on calcule $f''$, on étudie son signe, et on conclut intervalle par intervalle. Attention à ne pas confondre : le signe de $f'$ donne les **variations** de $f$, le signe de $f''$ donne sa **convexité**.",
      exemple: {
        enonce: "Étudie la convexité de $f(x) = x^3 - 6x^2 + 5$ sur $\\mathbb{R}$.",
        solution: "$f''(x) = 6x - 12 = 6(x - 2)$.\n\n$f''(x) \\leqslant 0$ sur $]-\\infty\\,;2]$ : $f$ y est concave. $f''(x) \\geqslant 0$ sur $[2\\,;+\\infty[$ : $f$ y est convexe."
      }
    },
    {
      titre: "Point d'inflexion",
      figure: "dvx-inflexion",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître graphiquement un point d'inflexion", youtube: "https://youtu.be/r8sYr6ToeLo" },
      texte:
        "Un **point d'inflexion** est un point où la courbe **traverse sa tangente** : la fonction change de convexité (concave avant, convexe après, ou l'inverse).\n\n" +
        "- Si $f''$ s'annule **en changeant de signe** en $a$, la courbe a un point d'inflexion d'abscisse $a$.\n" +
        "- Si $f''$ s'annule sans changer de signe, ce n'est pas un point d'inflexion : par exemple $f(x) = x^4$ a $f''(0) = 0$ mais reste convexe.\n" +
        "- Sur la courbe de $f'$, un point d'inflexion de $f$ correspond à un **extremum** de $f'$.\n\n" +
        "En pratique : une épidémie ralentit à partir du point d'inflexion de la courbe des cas cumulés, là où le nombre de nouveaux cas par jour est maximal.",
      exemple: {
        enonce: "Montre que la courbe de $f(x) = x^3 - 6x^2 + 5$ a un point d'inflexion, et donne ses coordonnées.",
        solution: "$f''(x) = 6(x - 2)$ s'annule en $x = 2$ en changeant de signe (négative avant, positive après).\n\n$f(2) = 8 - 24 + 5 = -11$ : le point d'inflexion est $I(2\\,;-11)$."
      }
    },
    {
      titre: "Inégalités de convexité",
      video: { titre: "Vidéo d'Yvan Monka : démontrer une inégalité à l'aide de la convexité", youtube: "https://youtu.be/AaxQHlsxZkg" },
      texte:
        "La position d'une courbe par rapport à ses tangentes donne des **inégalités** valables sur tout un intervalle.\n\n" +
        "- La fonction exponentielle est convexe et sa tangente en $0$ est $y = x + 1$ : **pour tout réel $x$, $e^x \\geqslant x + 1$**.\n" +
        "- La fonction racine carrée est concave et sa tangente en $1$ est $y = \\dfrac{x}{2} + \\dfrac{1}{2}$ : pour tout $x \\geqslant 0$, $\\sqrt{x} \\leqslant \\dfrac{x + 1}{2}$.\n\n" +
        "**Méthode** : justifier la convexité (signe de $f''$), écrire l'équation de la tangente, puis conclure avec le bon sens d'inégalité.",
      exemple: {
        enonce: "Démontre que, pour tout réel $x$, $e^{2x} \\geqslant 1 + 2x$.",
        solution: "$f(x) = e^{2x}$ : $f''(x) = 4e^{2x} > 0$, donc $f$ est convexe sur $\\mathbb{R}$.\n\nTangente en $0$ : $f(0) = 1$ et $f'(0) = 2$, d'où $y = 2x + 1$. La courbe est au-dessus de cette tangente : $e^{2x} \\geqslant 1 + 2x$ pour tout réel $x$."
      }
    },
    {
      titre: "Algorithmique : dérivées approchées",
      texte:
        "Quand $h$ est très petit, le taux de variation $\\dfrac{f(a + h) - f(a)}{h}$ est une valeur approchée de $f'(a)$. De même, $\\dfrac{f(a + h) - 2f(a) + f(a - h)}{h^2}$ approche $f''(a)$.\n\n" +
        "```python\ndef f(x):\n    return x**3 - 6*x**2 + 5\n\ndef derivee(a):\n    h = 0.001\n    return (f(a + h) - f(a)) / h\n\ndef seconde(a):\n    h = 0.01\n    return (f(a + h) - 2*f(a) + f(a - h)) / h**2\n```\n\n" +
        "Le signe de $\\texttt{seconde(a)}$ indique si $f$ est convexe ou concave autour de $a$. Ce n'est qu'une valeur approchée : la démonstration passe par le calcul exact de $f''$.",
      exemple: {
        enonce: "Avec les fonctions ci-dessus, que donnent environ $\\texttt{seconde(0)}$ et $\\texttt{seconde(3)}$ ? Qu'en déduis-tu ?",
        solution: "$f''(x) = 6x - 12$, donc $\\texttt{seconde(0)} \\approx -12$ et $\\texttt{seconde(3)} \\approx 6$.\n\n$f$ est concave autour de $0$ et convexe autour de $3$ : la courbe change de convexité entre les deux (en $x = 2$)."
      }
    }
  ],

  videos: [
    { titre: "Étudier la convexité d'une fonction", type: "Convexité", youtube: "https://youtu.be/ji-0MWrZl_c" },
    { titre: "Étudier la convexité pour résoudre un problème", type: "Convexité", youtube: "https://youtu.be/_XlgCeLcN1k" },
    { titre: "Étudier une fonction composée : variations", type: "Composée", youtube: "https://youtu.be/95eLAWaSwwc" },
    { titre: "Prépare ton bac : exponentielle, dérivation, convexité", type: "Bac", youtube: "https://youtu.be/fTLVwAIHawg" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "d2-produit", titre: "Rappels : dériver un produit", etape: "Dériver", nb: 4 },
    { type: "dvx-forme", titre: "Fonctions composées", etape: "Dériver", nb: 5 },
    { type: "dvx-derivee", titre: "Dériver une fonction composée", etape: "Dériver", nb: 5 },
    { type: "dvx-nombre", titre: "Calculer un nombre dérivé", etape: "Dériver", nb: 5 },
    { type: "dvx-variations", titre: "Variations d'une fonction composée", etape: "Dériver", nb: 4 },
    { type: "dvx-seconde", titre: "Calculer une dérivée seconde", etape: "Convexité", nb: 5 },
    { type: "tcv-graphique", titre: "Lire la convexité sur une courbe", etape: "Convexité", nb: 4 },
    { type: "dvx-fprime", titre: "Convexité et courbe de $f'$", etape: "Convexité", nb: 4 },
    { type: "dvx-tangente", titre: "Tangentes, cordes, inégalités", etape: "Convexité", nb: 5 },
    { type: "dvx-python", titre: "Dérivées approchées en Python", etape: "Algorithmique", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "On pose $u(x) = x + 2$ et $v(x) = x^2$. Que vaut $(v \\circ u)(1)$ ?", choix: ["$9$", "$3$", "$5$", "$1$"], bonne: 0, explication: "$u(1) = 3$, puis $v(3) = 9$. Attention : $(u \\circ v)(1) = u(1) = 3$." },
    { question: "La fonction $f(x) = e^{3x^2 - 1}$ s'écrit $v \\circ u$ avec :", choix: ["$u(x) = 3x^2 - 1$ et $v(x) = e^x$", "$u(x) = e^x$ et $v(x) = 3x^2 - 1$", "$u(x) = 3x^2$ et $v(x) = e^x - 1$", "$u(x) = e^{3x^2}$ et $v(x) = x - 1$"], bonne: 0, explication: "On calcule d'abord $3x^2 - 1$, puis on prend l'exponentielle." },
    { question: "La dérivée de $f(x) = (3x + 1)^4$ est :", choix: ["$12(3x + 1)^3$", "$4(3x + 1)^3$", "$12(3x + 1)^4$", "$3(3x + 1)^3$"], bonne: 0, explication: "$(u^n)' = nu'u^{n-1}$ : $4 \\times 3 \\times (3x + 1)^3$." },
    { question: "La dérivée de $f(x) = \\sqrt{x^2 + 9}$ est :", choix: ["$\\dfrac{x}{\\sqrt{x^2 + 9}}$", "$\\dfrac{1}{2\\sqrt{x^2 + 9}}$", "$\\dfrac{2x}{\\sqrt{x^2 + 9}}$", "$2x\\sqrt{x^2 + 9}$"], bonne: 0, explication: "$(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}} = \\dfrac{2x}{2\\sqrt{x^2 + 9}}$, et on simplifie par $2$." },
    { question: "La dérivée de $f(x) = e^{-x^2}$ est :", choix: ["$-2xe^{-x^2}$", "$e^{-x^2}$", "$-x^2e^{-x^2}$", "$-2xe^{-2x}$"], bonne: 0, explication: "$(e^u)' = u'e^u$ avec $u'(x) = -2x$." },
    { question: "La dérivée de $f(x) = \\dfrac{1}{x^2 + 1}$ est :", choix: ["$-\\dfrac{2x}{(x^2 + 1)^2}$", "$\\dfrac{1}{2x}$", "$-\\dfrac{1}{(x^2 + 1)^2}$", "$\\dfrac{2x}{(x^2 + 1)^2}$"], bonne: 0, explication: "$\\left(\\dfrac{1}{u}\\right)' = -\\dfrac{u'}{u^2}$ avec $u'(x) = 2x$." },
    { question: "Si $f(x) = (x^2 - 3)^2$, que vaut $f'(2)$ ?", choix: ["$8$", "$2$", "$4$", "$16$"], bonne: 0, explication: "$f'(x) = 2 \\times 2x \\times (x^2 - 3) = 4x(x^2 - 3)$, donc $f'(2) = 8 \\times 1 = 8$." },
    { question: "La fonction $g(x) = e^{x^2 - 6x}$ est minimale en :", choix: ["$x = 3$", "$x = 0$", "$x = 6$", "$x = -3$"], bonne: 0, explication: "$g'(x) = (2x - 6)e^{x^2 - 6x}$ a le signe de $2x - 6$ : négatif puis positif, minimum en $x = 3$." },
    { question: "Pour $f(x) = x^4 - 2x^3$, la dérivée seconde est :", choix: ["$12x^2 - 12x$", "$4x^3 - 6x^2$", "$12x^2 - 6x$", "$24x - 12$"], bonne: 0, explication: "$f'(x) = 4x^3 - 6x^2$, puis $f''(x) = 12x^2 - 12x$." },
    { question: "Pour $f(x) = 5e^{-2x}$, $f''(x)$ vaut :", choix: ["$20e^{-2x}$", "$-10e^{-2x}$", "$10e^{-2x}$", "$-20e^{-2x}$"], bonne: 0, explication: "$f'(x) = -10e^{-2x}$ et $f''(x) = (-2) \\times (-10)e^{-2x} = 20e^{-2x}$." },
    { question: "Une fonction est convexe sur $I$ lorsque sa courbe est :", choix: ["au-dessus de toutes ses tangentes sur $I$", "en dessous de toutes ses tangentes sur $I$", "au-dessus de toutes ses cordes sur $I$", "toujours croissante sur $I$"], bonne: 0, explication: "Convexe : au-dessus des tangentes et en dessous des cordes, forme en « U »." },
    { question: "Laquelle de ces fonctions est concave sur $[0\\,;+\\infty[$ ?", choix: ["$x \\mapsto \\sqrt{x}$", "$x \\mapsto x^2$", "$x \\mapsto e^x$", "$x \\mapsto x^3$"], bonne: 0, explication: "La racine carrée a sa courbe sous ses tangentes. Les trois autres sont convexes sur $[0\\,;+\\infty[$." },
    { question: "Si $f'' \\geqslant 0$ sur $I$, alors :", choix: ["$f$ est convexe sur $I$", "$f$ est croissante sur $I$", "$f$ est positive sur $I$", "$f'$ est positive sur $I$"], bonne: 0, explication: "Le signe de $f''$ donne la convexité ; il ne dit rien du signe de $f$ ni de celui de $f'$." },
    { question: "$f$ est convexe sur $I$ si et seulement si :", choix: ["$f'$ est croissante sur $I$", "$f'$ est positive sur $I$", "$f$ est croissante sur $I$", "$f''$ est croissante sur $I$"], bonne: 0, explication: "Convexe : les pentes des tangentes augmentent, donc $f'$ est croissante." },
    { question: "La fonction $x \\mapsto e^x$ est décroissante sur $\\mathbb{R}$. Cette phrase est :", choix: ["fausse : elle est croissante et convexe", "vraie : elle est convexe", "vraie pour $x < 0$", "fausse : elle est concave"], bonne: 0, explication: "$(e^x)' = e^x > 0$ et $(e^x)'' = e^x > 0$ : croissante et convexe." },
    { question: "On sait que $f''(x) = (x - 1)(x + 3)$. La courbe de $f$ a :", choix: ["deux points d'inflexion, d'abscisses $1$ et $-3$", "un seul point d'inflexion, d'abscisse $1$", "aucun point d'inflexion", "deux points d'inflexion, d'abscisses $-1$ et $3$"], bonne: 0, explication: "$f''$ s'annule en changeant de signe en $-3$ et en $1$." },
    { question: "$f(x) = x^4$ vérifie $f''(0) = 0$. Le point d'abscisse $0$ est-il un point d'inflexion ?", choix: ["Non, car $f''(x) = 12x^2$ ne change pas de signe", "Oui, car $f''(0) = 0$", "Oui, car $f'(0) = 0$", "On ne peut pas savoir"], bonne: 0, explication: "Il faut un **changement de signe** de $f''$ ; ici $f''(x) \\geqslant 0$ partout et $f$ reste convexe." },
    { question: "Sur la courbe de $f'$, un point d'inflexion de la courbe de $f$ correspond à :", choix: ["un extremum de $f'$", "un point où $f'$ s'annule", "un point où $f'$ est positive", "le point d'abscisse $0$"], bonne: 0, explication: "Au point d'inflexion, $f'$ passe de croissante à décroissante (ou l'inverse) : c'est un extremum de $f'$." },
    { question: "De la convexité de la fonction exponentielle, on déduit que pour tout réel $x$ :", choix: ["$e^x \\geqslant x + 1$", "$e^x \\leqslant x + 1$", "$e^x \\geqslant x^2$", "$e^x = x + 1$"], bonne: 0, explication: "La courbe est au-dessus de sa tangente en $0$, d'équation $y = x + 1$." },
    { question: "$f$ est concave sur $\\mathbb{R}$ et sa tangente en $2$ a pour équation $y = 3x - 1$. Alors, pour tout réel $x$ :", choix: ["$f(x) \\leqslant 3x - 1$", "$f(x) \\geqslant 3x - 1$", "$f(x) = 3x - 1$", "$f(x) \\leqslant 3x - 1$ seulement si $x \\geqslant 2$"], bonne: 0, explication: "Concave : la courbe est sous toutes ses tangentes, sur tout l'intervalle." },
    { question: "La courbe de $f'$ est une droite croissante. Alors $f$ est :", choix: ["convexe", "concave", "croissante", "décroissante"], bonne: 0, explication: "$f'$ croissante équivaut à $f$ convexe. Les variations de $f$ dépendent du signe de $f'$, inconnu ici." },
    { question: "Sur $[0\\,;3]$, la fonction carré est sous sa corde $y = 3x$. Cela traduit le fait qu'elle est :", choix: ["convexe", "concave", "croissante", "positive"], bonne: 0, explication: "Une fonction convexe a sa courbe en dessous de ses cordes." },
    { question: "La fonction $f(x) = x^3 - 3x^2$ est convexe sur :", choix: ["$[1\\,;+\\infty[$", "$]-\\infty\\,;1]$", "$[0\\,;2]$", "$\\mathbb{R}$"], bonne: 0, explication: "$f''(x) = 6x - 6 \\geqslant 0 \\iff x \\geqslant 1$." },
    { question: "Pour $f(x) = x^2$, que renvoie à peu près $\\texttt{(f(3 + 0.001) - f(3)) / 0.001}$ ?", choix: ["$6{,}001$", "$9$", "$3$", "$0{,}001$"], bonne: 0, explication: "C'est un taux de variation proche de $f'(3) = 6$ ; exactement $\\dfrac{9{,}006001 - 9}{0{,}001} = 6{,}001$." },
    { question: "Une voiture a pour position $x(t) = t^3 - 6t^2 + 12t$ (en mètres, $t$ en secondes). Son accélération à $t = 3$ s vaut :", choix: ["$6$ m/s²", "$3$ m/s²", "$9$ m/s²", "$0$ m/s²"], bonne: 0, explication: "L'accélération est $x''(t) = 6t - 12$, donc $x''(3) = 6$." },
    { question: "Si $f(x) = (x + 1)e^x$, alors $f''(x)$ vaut :", choix: ["$(x + 3)e^x$", "$(x + 2)e^x$", "$e^x$", "$(x + 1)e^x$"], bonne: 0, explication: "$f'(x) = e^x + (x + 1)e^x = (x + 2)e^x$, puis $f''(x) = e^x + (x + 2)e^x = (x + 3)e^x$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Dériver une fonction composée",
      etapes: [
        "Repérer la fonction « intérieure » $u$ (ce qu'on calcule en premier) et la fonction « extérieure » $v$.",
        "Calculer $u'(x)$.",
        "Appliquer la formule : $u^n \\to nu'u^{n-1}$, $\\sqrt{u} \\to \\dfrac{u'}{2\\sqrt{u}}$, $e^u \\to u'e^u$, $\\dfrac{1}{u} \\to -\\dfrac{u'}{u^2}$.",
        "Simplifier, puis factoriser si on veut étudier le signe."
      ],
      exemple: "$f(x) = \\sqrt{4x + 1}$ : $u'(x) = 4$, donc $f'(x) = \\dfrac{4}{2\\sqrt{4x + 1}} = \\dfrac{2}{\\sqrt{4x + 1}}$."
    },
    {
      titre: "Étudier la convexité",
      etapes: [
        "Calculer $f'$, puis $f''$ (en simplifiant $f'$ d'abord).",
        "Étudier le signe de $f''$ : factoriser, utiliser $e^u > 0$, faire un tableau de signes.",
        "Conclure : convexe là où $f'' \\geqslant 0$, concave là où $f'' \\leqslant 0$.",
        "Points d'inflexion : là où $f''$ s'annule **en changeant de signe** ; calculer leur ordonnée avec $f$."
      ],
      exemple: "$f(x) = xe^x$ : $f''(x) = (x + 2)e^x$, concave sur $]-\\infty\\,;-2]$, convexe sur $[-2\\,;+\\infty[$, inflexion en $x = -2$."
    },
    {
      titre: "Lire la convexité sur un graphique",
      etapes: [
        "Courbe de $f$ : forme en « U » = convexe ; forme en « cloche » = concave ; changement de forme = point d'inflexion.",
        "Courbe de $f'$ : $f$ est convexe là où $f'$ **monte**, concave là où elle descend.",
        "Courbe de $f''$ : $f$ est convexe là où $f''$ est au-dessus de l'axe.",
        "Ne pas confondre avec les variations de $f$, qui se lisent sur le signe de $f'$."
      ],
      exemple: "Si la courbe de $f'$ descend jusqu'en $x = 1$ puis remonte, $f$ est concave puis convexe : inflexion en $x = 1$."
    },
    {
      titre: "Démontrer une inégalité par convexité",
      etapes: [
        "Choisir la fonction $f$ dont la courbe intervient (souvent le membre « compliqué »).",
        "Montrer que $f$ est convexe (ou concave) avec le signe de $f''$.",
        "Écrire l'équation de la tangente au point bien choisi : $y = f'(a)(x - a) + f(a)$.",
        "Conclure : convexe donne $f(x) \\geqslant$ tangente, concave donne $f(x) \\leqslant$ tangente."
      ],
      exemple: "$e^x \\geqslant ex$ pour tout $x$ : $\\exp$ est convexe et sa tangente en $1$ est $y = e(x - 1) + e = ex$."
    }
  ],
  erreurs: [
    "Oublier de multiplier par $u'$ en dérivant une composée : $(e^{3x})' = 3e^{3x}$, pas $e^{3x}$.",
    "Confondre $v \\circ u$ et $u \\circ v$ : on applique d'abord $u$.",
    "Écrire $(\\sqrt{u})' = \\dfrac{1}{2\\sqrt{u}}$ sans le facteur $u'$.",
    "Confondre le rôle de $f'$ (variations) et celui de $f''$ (convexité).",
    "Croire qu'une fonction croissante est convexe : $\\sqrt{x}$ est croissante et concave.",
    "Conclure à un point d'inflexion dès que $f''(a) = 0$, sans vérifier le changement de signe.",
    "Inverser les positions : convexe, c'est **au-dessus** des tangentes mais **en dessous** des cordes.",
    "Lire la courbe de $f'$ comme si c'était celle de $f$."
  ]
};
