/*
  CHAPITRE : Terminale maths expertes — Nombres complexes : point de vue géométrique
  ----------------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme officiel de maths expertes (BO spécial n° 8 du 25 juillet 2019), « Nombres complexes : point de vue géométrique ».
  L'argument d'un produit (relation fonctionnelle) est au chapitre 3, avec la forme exponentielle.
  video : vidéos d'Yvan Monka. Générateurs : préfixe xg- dans assets/exercices-expertes.js ; figures "xg-cours-…", "xg-qcm-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["expertes-complexes-geometrique"] = {
  niveau: "Terminale maths expertes",
  numero: 2,
  titre: "Nombres complexes : point de vue géométrique",
  accroche: "Chaque complexe est un point du plan : son module est une distance, son argument un angle.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : nombres complexes, partie 2 (PDF)", url: "https://www.maths-et-tiques.fr/telech/20NC2.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Le plan complexe",
      figure: "xg-cours-plan",
      video: { titre: "Vidéo d'Yvan Monka : déterminer l'affixe d'un vecteur", youtube: "https://youtu.be/D_yFqcCy3iE" },
      texte:
        "Le plan est muni d'un repère orthonormé direct $(O\\,;\\vec{u},\\vec{v})$.\n\n" +
        "- Au complexe $z = a + ib$, on associe le point $M(a\\,;b)$ : c'est l'**image** de $z$, et $z$ est l'**affixe** de $M$, notée $z_M$.\n" +
        "- L'axe des abscisses est l'**axe des réels**, l'axe des ordonnées l'**axe des imaginaires purs**.\n" +
        "- L'image de $\\overline{z}$ est le symétrique de $M$ par rapport à l'axe des réels.\n" +
        "- Le vecteur $\\vec{w}(a\\,;b)$ a pour affixe $a + ib$. En particulier $z_{\\overrightarrow{AB}} = z_B - z_A$ et $z_{\\vec{w} + \\vec{w}'} = z_{\\vec{w}} + z_{\\vec{w}'}$.\n" +
        "- Le milieu $I$ de $[AB]$ a pour affixe $z_I = \\dfrac{z_A + z_B}{2}$.",
      exemple: {
        enonce: "$A$ et $B$ ont pour affixes $z_A = -1 + 2i$ et $z_B = 3 - 4i$. Donne l'affixe de $\\overrightarrow{AB}$ et du milieu $I$ de $[AB]$.",
        solution: "$z_{\\overrightarrow{AB}} = z_B - z_A = (3 - 4i) - (-1 + 2i) = 4 - 6i$.\n\n$z_I = \\dfrac{(-1 + 2i) + (3 - 4i)}{2} = \\dfrac{2 - 2i}{2} = 1 - i$."
      }
    },
    {
      titre: "Le module d'un nombre complexe",
      figure: "xg-cours-module",
      video: { titre: "Vidéo d'Yvan Monka : calculer le module d'un nombre complexe (1)", youtube: "https://youtu.be/Hu0jjS5O2u4" },
      texte:
        "Le **module** de $z = a + ib$ est le réel positif $|z| = \\sqrt{a^2 + b^2}$.\n\n" +
        "- Si $M$ est l'image de $z$, alors $|z| = OM$ : c'est une **distance** (théorème de Pythagore).\n" +
        "- Pour deux points $A$ et $B$ : $AB = |z_B - z_A|$.\n" +
        "- Si $z$ est réel, $|z|$ est sa valeur absolue : la notation est la même.\n" +
        "- $|z| = 0 \\iff z = 0$ et $|\\overline{z}| = |-z| = |z|$.\n\n" +
        "**Formule $|z|^2 = z\\overline{z}$.** Avec $z = a + ib$ : $z\\overline{z} = (a + ib)(a - ib) = a^2 - i^2b^2 = a^2 + b^2 = |z|^2$.",
      exemple: {
        enonce: "Calcule $|-5 + 12i|$ et la distance $AB$ avec $z_A = 1 + i$ et $z_B = 4 + 5i$.",
        solution: "$|-5 + 12i| = \\sqrt{25 + 144} = \\sqrt{169} = 13$.\n\n$AB = |z_B - z_A| = |3 + 4i| = \\sqrt{9 + 16} = 5$."
      }
    },
    {
      titre: "Module d'un produit, d'un quotient, d'une puissance",
      video: { titre: "Vidéo d'Yvan Monka : calculer le module d'un nombre complexe (2)", youtube: "https://youtu.be/i85d2fKv34w" },
      texte:
        "Pour tous complexes $z$ et $z'$ et tout entier naturel $n$ :\n\n" +
        "- $|zz'| = |z| \\times |z'|$ ;\n" +
        "- $|z^n| = |z|^n$ ;\n" +
        "- si $z \\neq 0$ : $\\left|\\dfrac{1}{z}\\right| = \\dfrac{1}{|z|}$ et $\\left|\\dfrac{z'}{z}\\right| = \\dfrac{|z'|}{|z|}$.\n\n" +
        "**Démonstration (produit).** $|zz'|^2 = zz' \\times \\overline{zz'} = z\\overline{z} \\times z'\\overline{z'} = |z|^2|z'|^2$. Les modules étant positifs, $|zz'| = |z||z'|$.\n\n" +
        "**Démonstration (puissance).** Par récurrence : $|z^0| = 1 = |z|^0$, et si $|z^n| = |z|^n$, alors $|z^{n+1}| = |z^n \\times z| = |z|^n \\times |z| = |z|^{n+1}$.\n\n" +
        "**Attention** : en général $|z + z'| \\neq |z| + |z'|$. On a seulement l'**inégalité triangulaire** $|z + z'| \\leqslant |z| + |z'|$.",
      exemple: {
        enonce: "Calcule le module de $\\dfrac{(3 - 4i)^2}{1 + i}$ sans développer.",
        solution: "$\\left|\\dfrac{(3 - 4i)^2}{1 + i}\\right| = \\dfrac{|3 - 4i|^2}{|1 + i|} = \\dfrac{5^2}{\\sqrt{2}} = \\dfrac{25}{\\sqrt{2}} = \\dfrac{25\\sqrt{2}}{2}$."
      }
    },
    {
      titre: "L'ensemble 𝕌 des nombres de module 1",
      figure: "xg-cours-unite",
      video: { titre: "Vidéo d'Yvan Monka : démontrer qu'un nombre appartient à U", youtube: "https://youtu.be/XTNKoNfFopw" },
      texte:
        "On note $\\mathbb{U}$ l'ensemble des nombres complexes de module $1$. Leurs images forment le **cercle de centre $O$ et de rayon $1$**.\n\n" +
        "- $1$, $-1$, $i$, $-i$ et $\\dfrac{\\sqrt{2}}{2} + \\dfrac{\\sqrt{2}}{2}i$ sont dans $\\mathbb{U}$.\n" +
        "- **Stabilité par produit** : si $z$ et $z'$ sont dans $\\mathbb{U}$, alors $|zz'| = 1 \\times 1 = 1$, donc $zz' \\in \\mathbb{U}$.\n" +
        "- **Stabilité par inverse** : si $z \\in \\mathbb{U}$, alors $\\left|\\dfrac{1}{z}\\right| = \\dfrac{1}{1} = 1$, donc $\\dfrac{1}{z} \\in \\mathbb{U}$. De plus $\\dfrac{1}{z} = \\overline{z}$, car $z\\overline{z} = |z|^2 = 1$.",
      exemple: {
        enonce: "Montre que $z = \\dfrac{1 + 2i}{2 + i}$ appartient à $\\mathbb{U}$.",
        solution: "$|z| = \\dfrac{|1 + 2i|}{|2 + i|} = \\dfrac{\\sqrt{5}}{\\sqrt{5}} = 1$, donc $z \\in \\mathbb{U}$."
      }
    },
    {
      titre: "Arguments d'un nombre complexe",
      video: { titre: "Vidéo d'Yvan Monka : calculer un argument", youtube: "https://youtu.be/NX3pzPL2gwc" },
      texte:
        "Soit $z$ un complexe **non nul**, d'image $M$. Un **argument** de $z$ est une mesure $\\theta$ de l'angle orienté $(\\vec{u}, \\overrightarrow{OM})$. On note $\\arg(z) = \\theta\\ [2\\pi]$ : il est défini à $2\\pi$ près.\n\n" +
        "- Si $z = a + ib$ et $r = |z|$, alors $\\cos\\theta = \\dfrac{a}{r}$ et $\\sin\\theta = \\dfrac{b}{r}$.\n" +
        "- $z$ réel strictement positif : $\\arg(z) = 0$ ; réel strictement négatif : $\\arg(z) = \\pi$.\n" +
        "- $z = ib$ avec $b > 0$ : $\\arg(z) = \\dfrac{\\pi}{2}$ ; avec $b < 0$ : $\\arg(z) = -\\dfrac{\\pi}{2}$.\n" +
        "- $\\arg(\\overline{z}) = -\\arg(z)$ et $\\arg(-z) = \\arg(z) + \\pi$ (symétries du dessin).\n" +
        "- $0$ n'a pas d'argument.",
      exemple: {
        enonce: "Détermine un argument de $z = -\\sqrt{3} + i$.",
        solution: "$|z| = \\sqrt{3 + 1} = 2$, donc $\\cos\\theta = -\\dfrac{\\sqrt{3}}{2}$ et $\\sin\\theta = \\dfrac{1}{2}$.\n\nLe cosinus est négatif et le sinus positif : $\\theta = \\dfrac{5\\pi}{6}$ convient."
      }
    },
    {
      titre: "La forme trigonométrique",
      figure: "xg-cours-module",
      video: { titre: "Vidéo d'Yvan Monka : passer de la forme algébrique à la forme trigonométrique", youtube: "https://youtu.be/zIbpXlgISc4" },
      texte:
        "Tout complexe **non nul** $z$, de module $r$ et d'argument $\\theta$, s'écrit :\n\n" +
        "$z = r(\\cos\\theta + i\\sin\\theta)$\n\n" +
        "C'est une **forme trigonométrique** de $z$. Le facteur $r$ doit être **strictement positif**, et le signe entre les deux termes est un « $+$ ».\n\n" +
        "- **Trigonométrique → algébrique** : on remplace $\\cos\\theta$ et $\\sin\\theta$ par leurs valeurs et on développe.\n" +
        "- **Algébrique → trigonométrique** : on calcule $r = \\sqrt{a^2 + b^2}$, puis on cherche $\\theta$ avec $\\cos\\theta = \\dfrac{a}{r}$ et $\\sin\\theta = \\dfrac{b}{r}$.\n" +
        "- Deux complexes non nuls sont égaux si et seulement s'ils ont le même module et le même argument à $2\\pi$ près.",
      exemple: {
        enonce: "Écris $z = 2 - 2i$ sous forme trigonométrique, puis $w = 4\\left(\\cos\\dfrac{2\\pi}{3} + i\\sin\\dfrac{2\\pi}{3}\\right)$ sous forme algébrique.",
        solution: "$r = \\sqrt{4 + 4} = 2\\sqrt{2}$, $\\cos\\theta = \\dfrac{2}{2\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}$ et $\\sin\\theta = -\\dfrac{\\sqrt{2}}{2}$, donc $\\theta = -\\dfrac{\\pi}{4}$ et $z = 2\\sqrt{2}\\left(\\cos\\left(-\\dfrac{\\pi}{4}\\right) + i\\sin\\left(-\\dfrac{\\pi}{4}\\right)\\right)$.\n\n$w = 4\\left(-\\dfrac{1}{2} + i\\dfrac{\\sqrt{3}}{2}\\right) = -2 + 2i\\sqrt{3}$."
      }
    },
    {
      titre: "Suites de nombres complexes",
      video: { titre: "Vidéo d'Yvan Monka : utiliser une affixe en géométrie", youtube: "https://youtu.be/m9yM6kw1ZzU" },
      texte:
        "Une suite peut prendre des valeurs complexes, par exemple $z_{n+1} = az_n + b$. On calcule les termes de proche en proche, et on suit les points $M_n$ dans le plan.\n\n" +
        "- Avec $z_{n+1} = iz_n$ : multiplier par $i$ fait tourner le point d'un quart de tour autour de $O$, et $|z_{n+1}| = |z_n|$. Les points tournent sur un cercle.\n" +
        "- Avec $z_{n+1} = (1 + i)z_n$ : $|z_{n+1}| = \\sqrt{2}\\,|z_n|$, la distance à $O$ est multipliée par $\\sqrt{2}$ à chaque étape. Les points s'éloignent en spirale.\n\n" +
        "**Pour aller plus loin.** L'**ensemble de Mandelbrot** regroupe les complexes $c$ pour lesquels la suite $z_0 = 0$, $z_{n+1} = z_n^2 + c$ reste bornée. Le dessiner demande un ordinateur : c'est une belle activité en Python.",
      exemple: {
        enonce: "On pose $z_0 = 2$ et $z_{n+1} = (1 + i)z_n$. Calcule $z_1$, $z_2$ et $|z_{10}|$.",
        solution: "$z_1 = 2 + 2i$, $z_2 = (1 + i)(2 + 2i) = 2 + 4i + 2i^2 = 4i$.\n\n$|z_{n+1}| = \\sqrt{2}\\,|z_n|$, donc $|z_{10}| = (\\sqrt{2})^{10} \\times 2 = 32 \\times 2 = 64$."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "xg-affixe", titre: "Affixes de points et de vecteurs", etape: "Plan complexe", nb: 5 },
    { type: "xg-distance", titre: "Distances et cercles", etape: "Plan complexe", nb: 5 },
    { type: "xg-module", titre: "Calculer un module", etape: "Module", nb: 5 },
    { type: "xg-module-prop", titre: "Propriétés du module", etape: "Module", nb: 5 },
    { type: "xg-argument", titre: "Trouver un argument", etape: "Argument et forme trigonométrique", nb: 5 },
    { type: "xg-trigo", titre: "Forme trigonométrique", etape: "Argument et forme trigonométrique", nb: 5 },
    { type: "xg-suite", titre: "Suites de nombres complexes", etape: "Défi", nb: 4 },
    { type: "xg-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "D'après la figure, quelle est l'affixe du point $A$ ?", figure: "xg-qcm-point", choix: ["$-2 + 3i$", "$3 - 2i$", "$-2 - 3i$", "$2 + 3i$"], bonne: 0, explication: "$A$ a pour coordonnées $(-2\\,;3)$ : la partie réelle est l'abscisse, la partie imaginaire l'ordonnée." },
    { question: "Quel est le module de $z = 6 - 8i$ ?", choix: ["$10$", "$14$", "$100$", "$-2$"], bonne: 0, explication: "$|z| = \\sqrt{36 + 64} = \\sqrt{100} = 10$." },
    { question: "Quel est le module de $z = 1 + 2i$ ?", choix: ["$\\sqrt{5}$", "$3$", "$5$", "$\\sqrt{3}$"], bonne: 0, explication: "$|z| = \\sqrt{1^2 + 2^2} = \\sqrt{5}$." },
    { question: "$A$ et $B$ ont pour affixes $z_A = 1 + i$ et $z_B = 4 - 3i$. Que vaut $AB$ ?", choix: ["$5$", "$7$", "$\\sqrt{29}$", "$25$"], bonne: 0, explication: "$AB = |z_B - z_A| = |3 - 4i| = \\sqrt{9 + 16} = 5$." },
    { question: "Quelle est l'affixe du vecteur $\\overrightarrow{AB}$ avec $z_A = 2 - i$ et $z_B = -1 + 3i$ ?", choix: ["$-3 + 4i$", "$3 - 4i$", "$1 + 2i$", "$-3 + 2i$"], bonne: 0, explication: "$z_B - z_A = (-1 + 3i) - (2 - i) = -3 + 4i$." },
    { question: "Si $|z| = 3$, que vaut $|z^4|$ ?", choix: ["$81$", "$12$", "$3$", "$64$"], bonne: 0, explication: "$|z^4| = |z|^4 = 3^4 = 81$." },
    { question: "Si $|z| = 4$ et $|z'| = 2$, que vaut $\\left|\\dfrac{z}{z'}\\right|$ ?", choix: ["$2$", "$8$", "$\\dfrac{1}{2}$", "$6$"], bonne: 0, explication: "Le module d'un quotient est le quotient des modules : $\\dfrac{4}{2} = 2$." },
    { question: "Lequel de ces nombres appartient à $\\mathbb{U}$ ?", choix: ["$\\dfrac{\\sqrt{3}}{2} - \\dfrac{1}{2}i$", "$1 + i$", "$\\dfrac{1}{2} + \\dfrac{1}{2}i$", "$2i$"], bonne: 0, explication: "$\\left|\\dfrac{\\sqrt{3}}{2} - \\dfrac{1}{2}i\\right| = \\sqrt{\\dfrac{3}{4} + \\dfrac{1}{4}} = 1$. Les autres ont pour modules $\\sqrt{2}$, $\\dfrac{\\sqrt{2}}{2}$ et $2$." },
    { question: "Un argument de $z = -5$ est :", choix: ["$\\pi$", "$0$", "$-\\dfrac{\\pi}{2}$", "$5$"], bonne: 0, explication: "$-5$ est un réel strictement négatif : son image est sur la demi-droite des réels négatifs, $\\arg(z) = \\pi$." },
    { question: "Un argument de $z = -3i$ est :", choix: ["$-\\dfrac{\\pi}{2}$", "$\\dfrac{\\pi}{2}$", "$\\pi$", "$-3$"], bonne: 0, explication: "$-3i$ est un imaginaire pur de partie imaginaire négative : son image est sous l'origine, sur l'axe des imaginaires." },
    { question: "Un argument de $z = 1 + i\\sqrt{3}$ est :", choix: ["$\\dfrac{\\pi}{3}$", "$\\dfrac{\\pi}{6}$", "$\\dfrac{\\pi}{4}$", "$\\dfrac{2\\pi}{3}$"], bonne: 0, explication: "$|z| = 2$, $\\cos\\theta = \\dfrac{1}{2}$ et $\\sin\\theta = \\dfrac{\\sqrt{3}}{2}$, donc $\\theta = \\dfrac{\\pi}{3}$." },
    { question: "Un argument de $z = -1 - i$ est :", choix: ["$-\\dfrac{3\\pi}{4}$", "$\\dfrac{\\pi}{4}$", "$\\dfrac{3\\pi}{4}$", "$-\\dfrac{\\pi}{4}$"], bonne: 0, explication: "$|z| = \\sqrt{2}$ et $\\cos\\theta = \\sin\\theta = -\\dfrac{\\sqrt{2}}{2}$ : l'image est dans le quart en bas à gauche, $\\theta = -\\dfrac{3\\pi}{4}$." },
    { question: "Quelle est une forme trigonométrique de $z = 3i$ ?", choix: ["$3\\left(\\cos\\dfrac{\\pi}{2} + i\\sin\\dfrac{\\pi}{2}\\right)$", "$3\\left(\\cos 0 + i\\sin 0\\right)$", "$\\cos\\dfrac{\\pi}{2} + 3i\\sin\\dfrac{\\pi}{2}$", "$3\\left(\\cos\\pi + i\\sin\\pi\\right)$"], bonne: 0, explication: "$|3i| = 3$ et l'image est sur la demi-droite des imaginaires positifs, d'où $\\arg(3i) = \\dfrac{\\pi}{2}$." },
    { question: "Quelle est la forme algébrique de $2\\left(\\cos\\dfrac{\\pi}{6} + i\\sin\\dfrac{\\pi}{6}\\right)$ ?", choix: ["$\\sqrt{3} + i$", "$1 + i\\sqrt{3}$", "$2\\sqrt{3} + 2i$", "$\\dfrac{\\sqrt{3}}{2} + \\dfrac{1}{2}i$"], bonne: 0, explication: "$\\cos\\dfrac{\\pi}{6} = \\dfrac{\\sqrt{3}}{2}$ et $\\sin\\dfrac{\\pi}{6} = \\dfrac{1}{2}$, donc $2\\left(\\dfrac{\\sqrt{3}}{2} + \\dfrac{1}{2}i\\right) = \\sqrt{3} + i$." },
    { question: "Si $\\theta$ est un argument de $z$, alors un argument de $\\overline{z}$ est :", choix: ["$-\\theta$", "$\\theta + \\pi$", "$\\pi - \\theta$", "$\\theta$"], bonne: 0, explication: "L'image de $\\overline{z}$ est la symétrique de celle de $z$ par rapport à l'axe des réels : l'angle change de signe." },
    { question: "Si $\\theta$ est un argument de $z$, alors un argument de $-z$ est :", choix: ["$\\theta + \\pi$", "$-\\theta$", "$\\pi - \\theta$", "$\\theta$"], bonne: 0, explication: "L'image de $-z$ est la symétrique de celle de $z$ par rapport à $O$ : on ajoute un demi-tour." },
    { question: "L'ensemble des points $M$ d'affixe $z$ tels que $|z| = 2$ est :", choix: ["le cercle de centre $O$ et de rayon $2$", "la droite d'équation $x = 2$", "le disque de centre $O$ et de rayon $2$", "le point d'affixe $2$"], bonne: 0, explication: "$|z| = OM$ : les points à la distance $2$ de $O$ forment le cercle de centre $O$ et de rayon $2$." },
    { question: "Si $z \\in \\mathbb{U}$, alors $\\dfrac{1}{z}$ est égal à :", choix: ["$\\overline{z}$", "$z$", "$-z$", "$-\\overline{z}$"], bonne: 0, explication: "$z\\overline{z} = |z|^2 = 1$, donc $\\dfrac{1}{z} = \\overline{z}$." },
    { question: "Quel est le module de $\\dfrac{3 + 4i}{1 - i}$ ?", choix: ["$\\dfrac{5\\sqrt{2}}{2}$", "$\\dfrac{5}{2}$", "$5\\sqrt{2}$", "$\\dfrac{7}{2}$"], bonne: 0, explication: "$\\dfrac{|3 + 4i|}{|1 - i|} = \\dfrac{5}{\\sqrt{2}} = \\dfrac{5\\sqrt{2}}{2}$." },
    { question: "On pose $z_0 = 1$ et $z_{n+1} = iz_n$. Que vaut $z_3$ ?", choix: ["$-i$", "$i$", "$-1$", "$1$"], bonne: 0, explication: "$z_1 = i$, $z_2 = i^2 = -1$, $z_3 = -i$ : le point tourne d'un quart de tour à chaque étape." },
    { question: "Laquelle de ces écritures est une forme trigonométrique ?", choix: ["$5\\left(\\cos\\left(-\\dfrac{\\pi}{3}\\right) + i\\sin\\left(-\\dfrac{\\pi}{3}\\right)\\right)$", "$5\\left(\\cos\\dfrac{\\pi}{3} - i\\sin\\dfrac{\\pi}{3}\\right)$", "$-5\\left(\\cos\\dfrac{\\pi}{3} + i\\sin\\dfrac{\\pi}{3}\\right)$", "$5\\left(\\sin\\dfrac{\\pi}{3} + i\\cos\\dfrac{\\pi}{3}\\right)$"], bonne: 0, explication: "Une forme trigonométrique s'écrit $r(\\cos\\theta + i\\sin\\theta)$ avec $r > 0$, le même angle deux fois et un signe « $+$ »." },
    { question: "D'après la figure, quel est le module de $z_B - z_A$ ?", figure: "xg-qcm-distance", choix: ["$5$", "$7$", "$25$", "$\\sqrt{7}$"], bonne: 0, explication: "$z_B - z_A = 4 + 3i$, donc $|z_B - z_A| = \\sqrt{16 + 9} = 5$ : c'est la longueur $AB$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer un module ou une distance",
      figure: "xg-cours-module",
      etapes: [
        "Écrire le nombre sous forme algébrique $a + ib$ (pour une distance $AB$ : $z_B - z_A$).",
        "Calculer $a^2 + b^2$.",
        "Prendre la racine carrée et la simplifier : $|z| = \\sqrt{a^2 + b^2}$.",
        "Pour un produit, un quotient ou une puissance, utiliser les propriétés sans développer."
      ],
      exemple: "$|(1 + i)^6| = |1 + i|^6 = (\\sqrt{2})^6 = 8$."
    },
    {
      titre: "Trouver un argument",
      figure: "xg-cours-unite",
      etapes: [
        "Calculer le module $r = |z|$.",
        "Calculer $\\cos\\theta = \\dfrac{a}{r}$ et $\\sin\\theta = \\dfrac{b}{r}$.",
        "Reconnaître des valeurs remarquables ($\\dfrac{1}{2}$, $\\dfrac{\\sqrt{2}}{2}$, $\\dfrac{\\sqrt{3}}{2}$…) sur le cercle trigonométrique.",
        "Choisir l'angle dont le cosinus **et** le sinus ont les bons signes (bon quart du cercle)."
      ],
      exemple: "$z = -2 + 2i$ : $r = 2\\sqrt{2}$, $\\cos\\theta = -\\dfrac{\\sqrt{2}}{2}$, $\\sin\\theta = \\dfrac{\\sqrt{2}}{2}$, donc $\\theta = \\dfrac{3\\pi}{4}$."
    },
    {
      titre: "Passer à la forme trigonométrique",
      etapes: [
        "Calculer $r = |z|$ et un argument $\\theta$.",
        "Écrire $z = r(\\cos\\theta + i\\sin\\theta)$.",
        "Vérifier : $r > 0$, le même angle dans le cosinus et dans le sinus, un « $+$ » entre les deux."
      ],
      exemple: "$z = -3$ : $r = 3$, $\\theta = \\pi$, donc $z = 3(\\cos\\pi + i\\sin\\pi)$."
    },
    {
      titre: "Montrer qu'un point est sur un cercle",
      figure: "xg-meth-cercle",
      etapes: [
        "Repérer le centre $\\Omega$ et le rayon $R$.",
        "Calculer $z_M - z_\\Omega$, puis son module $\\Omega M$.",
        "Conclure : $M$ est sur le cercle si et seulement si $\\Omega M = R$."
      ],
      exemple: "$\\Omega(1 + i)$, $R = 5$, $M(4 + 5i)$ : $|z_M - z_\\Omega| = |3 + 4i| = 5$, donc $M$ est sur le cercle."
    }
  ],
  erreurs: [
    "Oublier la racine carrée : $|3 + 4i| = 5$, pas $25$.",
    "Additionner les parties : $|3 + 4i| \\neq 3 + 4$.",
    "Écrire $|z + z'| = |z| + |z'|$ : c'est faux en général (inégalité triangulaire seulement).",
    "Écrire $z_{\\overrightarrow{AB}} = z_A - z_B$ : c'est « arrivée moins départ », $z_B - z_A$.",
    "Choisir un angle avec le bon cosinus mais le mauvais sinus : vérifier le quart du cercle.",
    "Donner un module négatif, ou écrire $-2(\\cos\\theta + i\\sin\\theta)$ comme forme trigonométrique.",
    "Parler de l'argument de $0$ : il n'existe pas."
  ]
};
