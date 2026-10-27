/*
  CHAPITRE : Terminale maths expertes — Nombres complexes et géométrie
  ---------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme officiel de maths expertes (BO spécial n° 8 du 25 juillet 2019), « Utilisation des nombres complexes en géométrie ».
  Somme des racines n-ièmes de l'unité et pentagone régulier : « problèmes possibles » du programme.
  video : vidéos d'Yvan Monka. Générateurs : préfixe xc- dans assets/exercices-expertes.js ; figures "xc-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["expertes-complexes-geometrie"] = {
  niveau: "Terminale maths expertes",
  numero: 5,
  titre: "Nombres complexes et géométrie",
  accroche: "Distances, angles, alignements, ensembles de points et polygones réguliers : la géométrie se fait en calculant.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : nombres complexes, partie 4 (PDF)", url: "https://www.maths-et-tiques.fr/telech/20NC4.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Longueurs et angles avec un quotient",
      figure: "xc-cours-angle",
      video: { titre: "Vidéo d'Yvan Monka : appliquer les nombres complexes à la géométrie", youtube: "https://youtu.be/NjLZfbqRFB0" },
      texte:
        "Soit $A$, $B$, $C$ trois points distincts d'affixes $a$, $b$, $c$.\n\n" +
        "- Rappel : $AB = |b - a|$ et un argument de $b - a$ est une mesure de l'angle $(\\vec{u}, \\overrightarrow{AB})$.\n" +
        "- **Module du quotient** : $\\left|\\dfrac{c - a}{b - a}\\right| = \\dfrac{|c - a|}{|b - a|} = \\dfrac{AC}{AB}$.\n" +
        "- **Argument du quotient** : $\\arg\\left(\\dfrac{c - a}{b - a}\\right) = \\arg(c - a) - \\arg(b - a) = (\\overrightarrow{AB}, \\overrightarrow{AC})\\ [2\\pi]$.\n\n" +
        "Un seul calcul donne donc à la fois un **rapport de longueurs** et un **angle**.",
      exemple: {
        enonce: "$A(1 + i)$, $B(5 + 2i)$, $C(2 + 5i)$. Calcule $\\dfrac{c - a}{b - a}$ et interprète.",
        solution: "$\\dfrac{1 + 4i}{4 + i} = \\dfrac{(1 + 4i)(4 - i)}{17} = \\dfrac{4 - i + 16i + 4}{17} = \\dfrac{8 + 15i}{17}$.\n\nSon module vaut $\\dfrac{\\sqrt{64 + 225}}{17} = 1$ : $AC = AB$, le triangle $ABC$ est isocèle en $A$."
      }
    },
    {
      titre: "Alignement, orthogonalité, nature d'un triangle",
      figure: "xc-cours-angle",
      texte:
        "Avec $q = \\dfrac{c - a}{b - a}$ :\n\n" +
        "- $q$ **réel** $\\iff$ $A$, $B$, $C$ **alignés** (angle $0$ ou $\\pi$) ;\n" +
        "- $q$ **imaginaire pur** $\\iff$ $(AB) \\perp (AC)$ : triangle **rectangle en $A$** ;\n" +
        "- $|q| = 1$ $\\iff$ $AB = AC$ : triangle **isocèle en $A$** ;\n" +
        "- $q = \\pm i$ : triangle **rectangle isocèle en $A$** ;\n" +
        "- $q = e^{\\pm i\\frac{\\pi}{3}}$ : triangle **équilatéral**.\n\n" +
        "**Rotation de centre $O$.** Multiplier une affixe par $e^{i\\theta}$ fait tourner le point d'un angle $\\theta$ autour de $O$ : par exemple, multiplier par $i$ fait tourner d'un quart de tour.",
      exemple: {
        enonce: "$A(1 + i)$, $B(3 + 2i)$, $C(3i)$. Quelle est la nature du triangle $ABC$ ?",
        solution: "$\\dfrac{c - a}{b - a} = \\dfrac{-1 + 2i}{2 + i} = \\dfrac{(-1 + 2i)(2 - i)}{5} = \\dfrac{-2 + i + 4i - 2i^2}{5} = \\dfrac{5i}{5} = i$.\n\nLe quotient vaut $i$ : module $1$ ($AC = AB$) et argument $\\dfrac{\\pi}{2}$ (angle droit en $A$). Le triangle $ABC$ est rectangle isocèle en $A$."
      }
    },
    {
      titre: "Déterminer un ensemble de points",
      figure: "xc-cours-ensembles",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un ensemble de points (1)", youtube: "https://youtu.be/WTXu19XC9Lw" },
      texte:
        "On traduit l'égalité sur $z$ en une propriété géométrique du point $M$ d'affixe $z$ :\n\n" +
        "- $|z - a| = r$ (avec $r > 0$) : $AM = r$, c'est le **cercle** de centre $A$ et de rayon $r$ ;\n" +
        "- $|z - a| \\leqslant r$ : le **disque** de centre $A$ et de rayon $r$ ;\n" +
        "- $|z - a| = |z - b|$ : $AM = BM$, c'est la **médiatrice** du segment $[AB]$ ;\n" +
        "- $\\arg(z - a) = \\theta\\ [2\\pi]$ : la **demi-droite** d'origine $A$ (privée de $A$) qui fait l'angle $\\theta$ avec $\\vec{u}$.\n\n" +
        "**Attention aux signes** : $|z + 2 - i| = |z - (-2 + i)|$, le centre a pour affixe $-2 + i$.",
      exemple: {
        enonce: "Détermine l'ensemble des points $M(z)$ tels que $|iz + 2| = 3$.",
        solution: "$iz + 2 = i\\left(z + \\dfrac{2}{i}\\right) = i(z - 2i)$, et $|i| = 1$.\n\nDonc $|z - 2i| = 3$ : c'est le cercle de centre le point d'affixe $2i$ et de rayon $3$."
      }
    },
    {
      titre: "Les racines $n$-ièmes de l'unité",
      figure: "xc-cours-un",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les racines n-ièmes de l'unité", youtube: "https://youtu.be/cqK_IGw_0fE" },
      texte:
        "Soit $n \\geqslant 1$ un entier. Une **racine $n$-ième de l'unité** est un complexe $z$ tel que $z^n = 1$. On note $\\mathbb{U}_n$ leur ensemble.\n\n" +
        "**Propriété.** $\\mathbb{U}_n = \\left\\{e^{\\frac{2ik\\pi}{n}},\\ k = 0, 1, \\dots, n - 1\\right\\}$ : il y en a exactement $n$.\n\n" +
        "**Démonstration.** Si $z^n = 1$, alors $|z|^n = 1$ donc $|z| = 1$, et $z = e^{i\\theta}$. Alors $e^{in\\theta} = 1$ : $n\\theta = 2k\\pi$, soit $\\theta = \\dfrac{2k\\pi}{n}$ avec $k$ entier. Réciproquement, ces nombres conviennent. Deux valeurs de $k$ qui diffèrent d'un multiple de $n$ donnent le même nombre, d'où les $n$ valeurs $k = 0, \\dots, n - 1$ (elles sont distinctes).\n\n" +
        "Leurs images sont les **sommets d'un polygone régulier à $n$ côtés** inscrit dans le cercle unité, dont un sommet est le point d'affixe $1$.\n\n" +
        "Avec $\\omega = e^{\\frac{2i\\pi}{n}}$ : $\\mathbb{U}_n = \\{1, \\omega, \\omega^2, \\dots, \\omega^{n-1}\\}$ et, pour $n \\geqslant 2$, $1 + \\omega + \\dots + \\omega^{n-1} = \\dfrac{1 - \\omega^n}{1 - \\omega} = 0$.",
      exemple: {
        enonce: "Écris les racines quatrièmes de l'unité.",
        solution: "$e^{0} = 1$, $e^{i\\frac{\\pi}{2}} = i$, $e^{i\\pi} = -1$ et $e^{i\\frac{3\\pi}{2}} = -i$ : les sommets d'un carré."
      }
    },
    {
      titre: "Cas $n = 2, 3, 4$ : le nombre $j$",
      figure: "xc-cours-j",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation avec les racines de l'unité", youtube: "https://youtu.be/PZWgjj_7G7c" },
      texte:
        "- $\\mathbb{U}_2 = \\{1\\,;-1\\}$ et $\\mathbb{U}_4 = \\{1\\,;i\\,;-1\\,;-i\\}$.\n" +
        "- $\\mathbb{U}_3 = \\{1\\,;j\\,;j^2\\}$ avec $j = e^{\\frac{2i\\pi}{3}} = -\\dfrac{1}{2} + \\dfrac{\\sqrt{3}}{2}i$.\n\n" +
        "Propriétés de $j$ : $j^3 = 1$, $\\overline{j} = j^2 = \\dfrac{1}{j}$ et $1 + j + j^2 = 0$. Les points d'affixes $1$, $j$, $j^2$ forment un **triangle équilatéral**.\n\n" +
        "**Résoudre $z^n = a$** : si on connaît une solution $z_0$, les solutions sont $z_0$, $z_0\\omega$, $z_0\\omega^2$, …, $z_0\\omega^{n-1}$.",
      exemple: {
        enonce: "Résous $z^3 = 8$ dans $\\mathbb{C}$.",
        solution: "$2$ est solution. Les solutions sont $2$, $2j = -1 + i\\sqrt{3}$ et $2j^2 = -1 - i\\sqrt{3}$."
      }
    },
    {
      titre: "Polygones réguliers et pentagone",
      figure: "xc-cours-un",
      texte:
        "Les sommets d'un polygone régulier de centre $O$ s'obtiennent en multipliant l'affixe d'un sommet par $e^{\\frac{2i\\pi}{n}}$ : c'est une rotation de centre $O$.\n\n" +
        "**Pour aller plus loin : le pentagone.** Avec $\\omega = e^{\\frac{2i\\pi}{5}}$, on a $1 + \\omega + \\omega^2 + \\omega^3 + \\omega^4 = 0$. Comme $\\omega^4 = \\overline{\\omega}$ et $\\omega^3 = \\overline{\\omega^2}$, en notant $c = \\cos\\dfrac{2\\pi}{5}$, la partie réelle donne $1 + 2c + 2\\cos\\dfrac{4\\pi}{5} = 0$, puis avec $\\cos\\dfrac{4\\pi}{5} = 2c^2 - 1$ : $4c^2 + 2c - 1 = 0$. On en tire $\\cos\\dfrac{2\\pi}{5} = \\dfrac{\\sqrt{5} - 1}{4}$, longueur qui permet de **construire le pentagone régulier à la règle et au compas**, comme dans les *Éléments* d'Euclide."
    }
  ],

  videos: [
    { type: "Méthode", titre: "Déterminer un ensemble de points (2)", youtube: "https://youtu.be/5puq7tzMZAo" },
    { type: "Méthode", titre: "Déterminer un ensemble de points (3)", youtube: "https://youtu.be/r6RO4ifOf70" }
  ],
  videosNote: "Deux autres méthodes expliquées en vidéo par Yvan Monka.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "xc-quotient", titre: "Calculer le quotient", etape: "Configurations", nb: 4 },
    { type: "xc-nature", titre: "Nature d'un triangle", etape: "Configurations", nb: 5 },
    { type: "xc-alignement", titre: "Alignement et orthogonalité", etape: "Configurations", nb: 5 },
    { type: "xc-ensemble", titre: "Ensembles de points", etape: "Ensembles de points", nb: 5 },
    { type: "xc-polygone", titre: "Rotations et polygones", etape: "Racines de l'unité", nb: 5 },
    { type: "xc-racines-unite", titre: "Racines de l'unité", etape: "Racines de l'unité", nb: 5 },
    { type: "xc-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Le module de $\\dfrac{c - a}{b - a}$ est égal à :", choix: ["$\\dfrac{AC}{AB}$", "$\\dfrac{AB}{AC}$", "$AC \\times AB$", "$BC$"], bonne: 0, explication: "$\\left|\\dfrac{c - a}{b - a}\\right| = \\dfrac{|c - a|}{|b - a|} = \\dfrac{AC}{AB}$." },
    { question: "Un argument de $\\dfrac{c - a}{b - a}$ est une mesure de l'angle :", choix: ["$(\\overrightarrow{AB}, \\overrightarrow{AC})$", "$(\\overrightarrow{AC}, \\overrightarrow{AB})$", "$(\\overrightarrow{BA}, \\overrightarrow{BC})$", "$(\\vec{u}, \\overrightarrow{BC})$"], bonne: 0, explication: "$\\arg(c - a) - \\arg(b - a) = (\\vec{u}, \\overrightarrow{AC}) - (\\vec{u}, \\overrightarrow{AB}) = (\\overrightarrow{AB}, \\overrightarrow{AC})$." },
    { question: "Si $\\dfrac{c - a}{b - a} = -3$, alors :", choix: ["$A$, $B$, $C$ sont alignés", "$ABC$ est rectangle en $A$", "$ABC$ est isocèle en $A$", "$ABC$ est équilatéral"], bonne: 0, explication: "Le quotient est réel : $\\overrightarrow{AC} = -3\\overrightarrow{AB}$, les vecteurs sont colinéaires." },
    { question: "Si $\\dfrac{c - a}{b - a} = 2i$, alors le triangle $ABC$ est :", choix: ["rectangle en $A$, avec $AC = 2AB$", "rectangle isocèle en $A$", "équilatéral", "aplati"], bonne: 0, explication: "Imaginaire pur : angle droit en $A$. Module $2$ : $AC = 2AB$." },
    { question: "Si $\\dfrac{c - a}{b - a} = e^{i\\frac{\\pi}{3}}$, alors le triangle $ABC$ est :", choix: ["équilatéral", "rectangle en $A$", "isocèle rectangle", "aplati"], bonne: 0, explication: "Module $1$ : $AB = AC$ ; angle $\\dfrac{\\pi}{3}$ en $A$ : un triangle isocèle avec un angle de $60°$ est équilatéral." },
    { question: "L'ensemble des points $M(z)$ tels que $|z - 3 + i| = 2$ est le cercle de centre :", choix: ["le point d'affixe $3 - i$, de rayon $2$", "le point d'affixe $-3 + i$, de rayon $2$", "le point d'affixe $3 - i$, de rayon $4$", "le point d'affixe $3 + i$, de rayon $2$"], bonne: 0, explication: "$|z - 3 + i| = |z - (3 - i)|$ : le centre a pour affixe $3 - i$." },
    { question: "L'ensemble des points $M(z)$ tels que $|z - 2| = |z - 2i|$ est :", choix: ["la médiatrice du segment d'extrémités $2$ et $2i$", "le cercle de centre $2$ passant par $2i$", "le segment d'extrémités $2$ et $2i$", "la droite passant par $2$ et $2i$"], bonne: 0, explication: "$AM = BM$ avec $A(2)$ et $B(2i)$ : c'est la médiatrice de $[AB]$ (ici la droite d'équation $y = x$)." },
    { question: "L'ensemble des points $M(z)$ tels que $|z| \\leqslant 1$ est :", choix: ["le disque de centre $O$ et de rayon $1$", "le cercle de centre $O$ et de rayon $1$", "le carré de côté $2$ centré en $O$", "l'intérieur du cercle, sans le cercle"], bonne: 0, explication: "$OM \\leqslant 1$ : les points à distance au plus $1$ de $O$, cercle compris." },
    { question: "Combien y a-t-il de racines $8$-ièmes de l'unité ?", choix: ["$8$", "$2$", "$4$", "$16$"], bonne: 0, explication: "$\\mathbb{U}_n$ a exactement $n$ éléments : les $e^{\\frac{2ik\\pi}{8}}$ pour $k$ de $0$ à $7$." },
    { question: "Lequel de ces nombres est une racine $6$-ième de l'unité ?", choix: ["$e^{\\frac{i\\pi}{3}}$", "$e^{\\frac{i\\pi}{6}}$", "$e^{\\frac{i\\pi}{4}}$", "$2$"], bonne: 0, explication: "$\\left(e^{\\frac{i\\pi}{3}}\\right)^6 = e^{2i\\pi} = 1$, alors que $\\left(e^{\\frac{i\\pi}{6}}\\right)^6 = e^{i\\pi} = -1$." },
    { question: "On note $j = e^{\\frac{2i\\pi}{3}}$. Que vaut $1 + j + j^2$ ?", choix: ["$0$", "$1$", "$3$", "$-1$"], bonne: 0, explication: "C'est la somme des racines cubiques de l'unité, qui est nulle." },
    { question: "On note $j = e^{\\frac{2i\\pi}{3}}$. Quelle est sa forme algébrique ?", choix: ["$-\\dfrac{1}{2} + \\dfrac{\\sqrt{3}}{2}i$", "$\\dfrac{1}{2} + \\dfrac{\\sqrt{3}}{2}i$", "$-\\dfrac{\\sqrt{3}}{2} + \\dfrac{1}{2}i$", "$-\\dfrac{1}{2} - \\dfrac{\\sqrt{3}}{2}i$"], bonne: 0, explication: "$\\cos\\dfrac{2\\pi}{3} = -\\dfrac{1}{2}$ et $\\sin\\dfrac{2\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$." },
    { question: "Les images des racines cubiques de l'unité forment :", choix: ["un triangle équilatéral", "un carré", "un triangle rectangle", "trois points alignés"], bonne: 0, explication: "$n$ racines $n$-ièmes forment un polygone régulier à $n$ côtés : ici un triangle équilatéral." },
    { question: "Le point $B$ est l'image de $A(2 + i)$ par la rotation de centre $O$ d'angle $\\dfrac{\\pi}{2}$. Son affixe est :", choix: ["$-1 + 2i$", "$1 - 2i$", "$2 - i$", "$-2 - i$"], bonne: 0, explication: "On multiplie par $e^{i\\frac{\\pi}{2}} = i$ : $i(2 + i) = 2i - 1$." },
    { question: "Les solutions de $z^4 = 1$ sont :", choix: ["$1$, $i$, $-1$, $-i$", "$1$ et $-1$", "$1$ seulement", "$1$, $j$, $j^2$"], bonne: 0, explication: "$\\mathbb{U}_4 = \\{e^{\\frac{2ik\\pi}{4}}\\} = \\{1\\,;i\\,;-1\\,;-i\\}$." },
    { question: "Si $z_0$ est une solution de $z^3 = a$, alors les solutions sont :", choix: ["$z_0$, $z_0j$ et $z_0j^2$", "$z_0$, $-z_0$ et $iz_0$", "$z_0$, $2z_0$ et $3z_0$", "$z_0$ et $\\overline{z_0}$ seulement"], bonne: 0, explication: "$(z_0j^k)^3 = z_0^3(j^3)^k = a$ : on multiplie $z_0$ par les racines cubiques de l'unité." },
    { question: "Pour $A(1)$, $B(i)$ et $C(-1)$, que vaut $\\dfrac{c - a}{b - a}$ ?", choix: ["$1 + i$", "$1 - i$", "$-1 + i$", "$2i$"], bonne: 0, explication: "$\\dfrac{c - a}{b - a} = \\dfrac{-2}{-1 + i} = \\dfrac{-2(-1 - i)}{(-1 + i)(-1 - i)} = \\dfrac{2 + 2i}{2} = 1 + i$." },
    { question: "La somme des racines $5$-ièmes de l'unité vaut :", choix: ["$0$", "$5$", "$1$", "$-1$"], bonne: 0, explication: "$1 + \\omega + \\omega^2 + \\omega^3 + \\omega^4 = \\dfrac{1 - \\omega^5}{1 - \\omega} = 0$ avec $\\omega = e^{\\frac{2i\\pi}{5}}$." },
    { question: "L'ensemble des points $M(z)$ tels que $|\\overline{z} - 1| = 2$ est :", choix: ["le cercle de centre le point d'affixe $1$ et de rayon $2$", "le cercle de centre le point d'affixe $-1$ et de rayon $2$", "la médiatrice de $[OA]$ avec $A(1)$", "le disque de centre $O$ et de rayon $2$"], bonne: 0, explication: "$|\\overline{z} - 1| = |\\overline{z - 1}| = |z - 1|$ : un nombre et son conjugué ont le même module." },
    { question: "Pour $A(2 + i)$ et $B(5 + 5i)$, la longueur $AB$ vaut :", choix: ["$5$", "$7$", "$25$", "$\\sqrt{7}$"], bonne: 0, explication: "$AB = |3 + 4i| = \\sqrt{9 + 16} = 5$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Déterminer la nature d'un triangle",
      figure: "xc-cours-angle",
      etapes: [
        "Calculer $q = \\dfrac{c - a}{b - a}$ sous forme algébrique (conjugué du dénominateur).",
        "Si $q$ est réel : $A$, $B$, $C$ alignés.",
        "Si $q$ est imaginaire pur : rectangle en $A$. Si $|q| = 1$ : isocèle en $A$.",
        "Si $q = \\pm i$ : rectangle isocèle en $A$ ; si $q = e^{\\pm i\\frac{\\pi}{3}}$ : équilatéral."
      ],
      exemple: "$A(0)$, $B(2)$, $C(2i)$ : $q = \\dfrac{2i}{2} = i$, donc $ABC$ est rectangle isocèle en $A$."
    },
    {
      titre: "Déterminer un ensemble de points",
      figure: "xc-cours-ensembles",
      etapes: [
        "Faire apparaître des expressions de la forme $|z - a|$ (mettre en facteur si besoin, comme $|iz + 2| = |z - 2i|$).",
        "Traduire : $|z - a| = AM$.",
        "Reconnaître : $AM = r$ cercle, $AM \\leqslant r$ disque, $AM = BM$ médiatrice.",
        "Préciser le centre et le rayon (ou les points $A$ et $B$)."
      ],
      exemple: "$|z + 1 - 2i| = 4$ : $|z - (-1 + 2i)| = 4$, cercle de centre $(-1 + 2i)$ et de rayon $4$."
    },
    {
      titre: "Utiliser les racines de l'unité",
      figure: "xc-cours-un",
      etapes: [
        "Écrire $\\omega = e^{\\frac{2i\\pi}{n}}$ et les $n$ racines $\\omega^k$, $k = 0, \\dots, n - 1$.",
        "Pour savoir si $e^{i\\theta}$ est une racine $n$-ième : vérifier que $n\\theta$ est un multiple de $2\\pi$.",
        "Pour une somme de racines : utiliser la somme géométrique $\\dfrac{1 - \\omega^n}{1 - \\omega} = 0$.",
        "Pour un polygone régulier : on passe d'un sommet au suivant en multipliant par $\\omega$."
      ],
      exemple: "Les racines $3$-ièmes de l'unité : $1$, $j$, $j^2$ ; $1 + j + j^2 = 0$."
    }
  ],
  erreurs: [
    "Écrire $\\dfrac{AB}{AC}$ au lieu de $\\dfrac{AC}{AB}$ : on lit $\\dfrac{c - a}{b - a}$ « $C$ en haut, $B$ en bas ».",
    "Se tromper de signe sur le centre : $|z + 3| = 2$ a pour centre $-3$, pas $3$.",
    "Confondre cercle ($=$) et disque ($\\leqslant$).",
    "Conclure « alignés » quand le quotient est imaginaire pur : c'est un angle droit.",
    "Oublier $1$ parmi les racines $n$-ièmes de l'unité, ou en compter $n + 1$.",
    "Croire qu'une figure suffit : la nature d'un triangle se démontre par un calcul."
  ]
};
