/*
  CHAPITRE : Première spécialité — Produit scalaire 2
  ----------------------------------------------------
  Chapitre 14 de la progression spiralée 2026-2027 (programme de Première 2026).
  Suite du chapitre 11 : bilinéarité, identités, Al-Kashi, ensemble des points M tels que MA · MB = 0.
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas encore de vidéo de la chaîne ni de PDF pour ce chapitre : les vidéos sont celles d'Yvan Monka.
  Figures : "al-kashi", "ilots", "cercle-diametre". Générateurs : sc-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-produit-scalaire-2"] = {
  niveau: "Première spécialité",
  numero: 14,
  titre: "Produit scalaire 2",
  accroche: "Développer avec le produit scalaire : identités, formule d'Al-Kashi, la distance entre deux îlots du lagon et le cercle de diamètre [AB].",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur le produit scalaire en vidéo (Yvan Monka)", url: "https://youtu.be/dII7myZuLvo", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Symétrie et bilinéarité",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les formules du produit scalaire (symétrie, bilinéarité)", youtube: "https://youtu.be/_SDj-fG1S18" },
      texte:
        "Pour tous vecteurs $\\vec{u}$, $\\vec{v}$, $\\vec{w}$ et tout réel $k$ :\n\n" +
        "- **symétrie** : $\\vec{u} \\cdot \\vec{v} = \\vec{v} \\cdot \\vec{u}$ ;\n" +
        "- **bilinéarité** : $\\vec{u} \\cdot (\\vec{v} + \\vec{w}) = \\vec{u} \\cdot \\vec{v} + \\vec{u} \\cdot \\vec{w}$ et $(k\\vec{u}) \\cdot \\vec{v} = k\\,(\\vec{u} \\cdot \\vec{v})$.\n\n" +
        "On développe donc un produit scalaire comme un produit de nombres, en remplaçant $\\vec{u} \\cdot \\vec{u}$ par $\\|\\vec{u}\\|^2$.",
      exemple: {
        enonce: "$\\|\\vec{u}\\| = 2$, $\\|\\vec{v}\\| = 3$ et $\\vec{u} \\cdot \\vec{v} = -1$. Calcule $(3\\vec{u} + \\vec{v}) \\cdot \\vec{u}$.",
        solution: "$(3\\vec{u} + \\vec{v}) \\cdot \\vec{u} = 3\\|\\vec{u}\\|^2 + \\vec{v} \\cdot \\vec{u} = 3 \\times 4 + (-1) = 11$."
      }
    },
    {
      titre: "Identités remarquables",
      video: { titre: "Vidéo d'Yvan Monka : calculer un produit scalaire avec les normes", youtube: "https://youtu.be/iNsm05JimgA" },
      texte:
        "En développant par bilinéarité :\n\n" +
        "- $\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$ ;\n" +
        "- $\\|\\vec{u} - \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 - 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$ ;\n" +
        "- $(\\vec{u} + \\vec{v}) \\cdot (\\vec{u} - \\vec{v}) = \\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2$.\n\n" +
        "On en tire $\\vec{u} \\cdot \\vec{v}$ à partir de trois **longueurs** :\n\n" +
        "$\\vec{u} \\cdot \\vec{v} = \\dfrac{1}{2}\\left(\\|\\vec{u} + \\vec{v}\\|^2 - \\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2\\right)$.\n\n" +
        "C'est ainsi qu'on démontre la formule $xx' + yy'$ du chapitre 11 : en repère orthonormé, $\\|\\vec{u} + \\vec{v}\\|^2 = (x + x')^2 + (y + y')^2$, et en développant il reste $\\vec{u} \\cdot \\vec{v} = xx' + yy'$.",
      exemple: {
        enonce: "$\\|\\vec{u}\\| = 3$, $\\|\\vec{v}\\| = 5$ et $\\|\\vec{u} + \\vec{v}\\| = 7$. Calcule $\\vec{u} \\cdot \\vec{v}$.",
        solution: "$\\vec{u} \\cdot \\vec{v} = \\dfrac{1}{2}(49 - 9 - 25) = \\dfrac{15}{2} = 7{,}5$."
      }
    },
    {
      titre: "Démonstration : la formule d'Al-Kashi",
      figure: "al-kashi",
      video: { titre: "Vidéo d'Yvan Monka : démonstration du théorème d'Al-Kashi", youtube: "https://youtu.be/34OJiQ_4-N4" },
      texte:
        "**Théorème d'Al-Kashi** : dans un triangle $ABC$, avec $a = BC$, $b = AC$ et $c = AB$,\n\n" +
        "$a^2 = b^2 + c^2 - 2bc \\cos \\widehat{A}$.\n\n" +
        "**Démonstration**. $\\overrightarrow{BC} = \\overrightarrow{AC} - \\overrightarrow{AB}$, donc\n\n" +
        "$BC^2 = \\|\\overrightarrow{AC} - \\overrightarrow{AB}\\|^2 = AC^2 - 2\\,\\overrightarrow{AB} \\cdot \\overrightarrow{AC} + AB^2$,\n\n" +
        "et $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = AB \\times AC \\times \\cos \\widehat{A}$.\n\n" +
        "Si l'angle $\\widehat{A}$ est droit, $\\cos \\widehat{A} = 0$ et on retrouve le **théorème de Pythagore** : Al-Kashi le généralise à tous les triangles.",
      exemple: {
        enonce: "$AB = 5$, $AC = 8$ et $\\widehat{A} = 60°$. Calcule $BC$.",
        solution: "$BC^2 = 64 + 25 - 2 \\times 8 \\times 5 \\times \\dfrac{1}{2} = 89 - 40 = 49$, donc $BC = 7$."
      }
    },
    {
      titre: "Calculer une longueur ou un angle",
      video: { titre: "Vidéo d'Yvan Monka : appliquer le théorème d'Al-Kashi", youtube: "https://youtu.be/SeFjmbOGhVc" },
      texte:
        "- Deux côtés et l'angle entre eux sont connus : Al-Kashi donne le **troisième côté**.\n" +
        "- Les trois côtés sont connus : on isole le cosinus\n\n" +
        "$\\cos \\widehat{A} = \\dfrac{b^2 + c^2 - a^2}{2bc}$,\n\n" +
        "puis on trouve l'angle avec une valeur remarquable ou la touche $\\cos^{-1}$ de la calculatrice (mode degrés).\n\n" +
        "Le signe de $b^2 + c^2 - a^2$ indique la nature de l'angle $\\widehat{A}$ : positif, aigu ; nul, droit ; négatif, obtus.",
      exemple: {
        enonce: "Un triangle a pour côtés $AB = 3$, $AC = 5$ et $BC = 7$. Calcule $\\widehat{A}$.",
        solution: "$\\cos \\widehat{A} = \\dfrac{25 + 9 - 49}{2 \\times 5 \\times 3} = \\dfrac{-15}{30} = -\\dfrac{1}{2}$, donc $\\widehat{A} = 120°$."
      }
    },
    {
      titre: "La distance entre deux îlots du lagon",
      figure: "ilots",
      texte:
        "On ne peut pas mesurer directement la distance entre deux îlots, mais depuis une pirogue $P$ on peut mesurer les distances $PA$ et $PB$ (par exemple avec un GPS) et l'angle entre les deux visées (avec une boussole).\n\n" +
        "Sur le schéma : $PA = 2{,}4$ km, $PB = 3{,}1$ km et $\\widehat{APB} = 52°$. Par Al-Kashi :\n\n" +
        "$AB^2 = 2{,}4^2 + 3{,}1^2 - 2 \\times 2{,}4 \\times 3{,}1 \\times \\cos 52° \\approx 6{,}21$,\n\n" +
        "donc $AB \\approx 2{,}49$ km.\n\n" +
        "C'est le principe de la **triangulation**, utilisé depuis des siècles par les navigateurs et les géomètres.",
      exemple: {
        enonce: "Même calcul si l'angle mesure $90°$.",
        solution: "$\\cos 90° = 0$ : $AB^2 = 5{,}76 + 9{,}61 = 15{,}37$, donc $AB \\approx 3{,}92$ km (Pythagore)."
      }
    },
    {
      titre: "Démonstration : l'ensemble des points $M$ tels que $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = 0$",
      figure: "cercle-diametre",
      video: { titre: "Vidéo d'Yvan Monka : démonstration, ensemble des points M tels que MA · MB = 0", youtube: "https://youtu.be/D3n8aYsSQLA" },
      texte:
        "Soit $I$ le milieu de $[AB]$, de sorte que $\\overrightarrow{IB} = -\\overrightarrow{IA}$. Pour tout point $M$ :\n\n" +
        "$\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = (\\overrightarrow{MI} + \\overrightarrow{IA}) \\cdot (\\overrightarrow{MI} - \\overrightarrow{IA}) = MI^2 - IA^2$.\n\n" +
        "Donc $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = 0 \\iff MI^2 = IA^2 \\iff MI = IA$.\n\n" +
        "**Propriété** : l'ensemble des points $M$ tels que $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = 0$ est le **cercle de diamètre** $[AB]$. Autrement dit, $M \\neq A, B$ est sur ce cercle si et seulement si le triangle $AMB$ est rectangle en $M$.",
      exemple: {
        enonce: "$A(1\\,;2)$ et $B(5\\,;4)$. Le point $M(2\\,;5)$ est-il sur le cercle de diamètre $[AB]$ ?",
        solution: "$\\overrightarrow{MA}\\begin{pmatrix} -1 \\\\ -3 \\end{pmatrix}$ et $\\overrightarrow{MB}\\begin{pmatrix} 3 \\\\ -1 \\end{pmatrix}$ : $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = -3 + 3 = 0$. Oui, $M$ est sur le cercle."
      }
    },
    {
      titre: "Transformer $\\overrightarrow{MA} \\cdot \\overrightarrow{MB}$",
      video: { titre: "Vidéo d'Yvan Monka : appliquer l'égalité MA · MB = 0", youtube: "https://youtu.be/bUARS-dthLM" },
      texte:
        "La démonstration précédente donne, pour tout point $M$, avec $I$ milieu de $[AB]$ :\n\n" +
        "$\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = MI^2 - \\dfrac{AB^2}{4}$.\n\n" +
        "On en déduit l'ensemble des points $M$ tels que $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = k$ : c'est un cercle de centre $I$ si $k + \\dfrac{AB^2}{4} > 0$, de rayon $\\sqrt{k + \\dfrac{AB^2}{4}}$.",
      exemple: {
        enonce: "$AB = 6$. Quel est l'ensemble des points $M$ tels que $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = 7$ ?",
        solution: "$MI^2 - 9 = 7 \\iff MI^2 = 16 \\iff MI = 4$ : c'est le cercle de centre $I$ et de rayon $4$."
      }
    },
    {
      titre: "Logique : la contraposée",
      texte:
        "À partir de l'implication « si P, alors Q » :\n\n" +
        "- sa **réciproque** est « si Q, alors P » : elle peut être fausse ;\n" +
        "- sa **contraposée** est « si non Q, alors non P » : elle est **toujours équivalente** à l'implication de départ.\n\n" +
        "Exemple avec Pythagore : « si $ABC$ est rectangle en $A$, alors $BC^2 = AB^2 + AC^2$ ». Sa contraposée, « si $BC^2 \\neq AB^2 + AC^2$, alors $ABC$ n'est pas rectangle en $A$ », sert à **démontrer** qu'un triangle n'est pas rectangle.\n\n" +
        "Al-Kashi précise même la nature de l'angle : si $BC^2 > AB^2 + AC^2$, alors $\\cos \\widehat{A} < 0$ et l'angle est obtus.",
      exemple: {
        enonce: "Un triangle a pour côtés $5$, $6$ et $8$. Est-il rectangle ?",
        solution: "$8^2 = 64$ et $5^2 + 6^2 = 61 \\neq 64$. Par la contraposée de Pythagore, il n'est pas rectangle ; comme $64 > 61$, l'angle opposé au côté $8$ est obtus (environ $92{,}9°$)."
      }
    },
    {
      titre: "Python : un angle à partir de trois points",
      texte:
        "Avec les coordonnées de trois points $A$, $B$, $C$, on calcule l'angle $\\widehat{BAC}$ :\n\n" +
        "```python\nfrom math import sqrt, acos, degrees\n\ndef angle(A, B, C):\n    u = (B[0] - A[0], B[1] - A[1])\n    v = (C[0] - A[0], C[1] - A[1])\n    ps = u[0] * v[0] + u[1] * v[1]\n    nu = sqrt(u[0]**2 + u[1]**2)\n    nv = sqrt(v[0]**2 + v[1]**2)\n    return degrees(acos(ps / (nu * nv)))\n\nprint(angle((0, 0), (4, 0), (2, 2)))\n```\n\n" +
        "acos est la fonction $\\cos^{-1}$ (elle renvoie un angle en radians) et degrees le convertit en degrés. Le programme affiche environ $45$.",
      exemple: {
        enonce: "Que renvoie angle((1, 1), (4, 1), (1, 6)) ?",
        solution: "$\\overrightarrow{AB}\\begin{pmatrix} 3 \\\\ 0 \\end{pmatrix}$ et $\\overrightarrow{AC}\\begin{pmatrix} 0 \\\\ 5 \\end{pmatrix}$ : le produit scalaire est nul, la fonction renvoie $90$ (à un arrondi près)."
      }
    }
  ],

  videos: [
    { titre: "Calculer un produit scalaire à l'aide de la bilinéarité", type: "Bilinéarité", youtube: "https://youtu.be/P0nKS-cTEO0" },
    { titre: "Appliquer le théorème d'Al-Kashi (2) : calculer un angle", type: "Al-Kashi", youtube: "https://youtu.be/-cQQAjHJ0Kc" },
    { titre: "Calculer une longueur à l'aide du produit scalaire", type: "Longueur", youtube: "https://youtu.be/K4Izn5xB_Qk" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "sc-bilineaire", titre: "Développer un produit scalaire", etape: "Calcul vectoriel", nb: 5 },
    { type: "sc-normes", titre: "Produit scalaire et normes", etape: "Calcul vectoriel", nb: 4 },
    { type: "sc-alkashi", titre: "Al-Kashi : longueurs et angles", etape: "Al-Kashi", nb: 6 },
    { type: "sc-ilots", titre: "Les îlots du lagon", etape: "Al-Kashi", nb: 4 },
    { type: "sc-logique", titre: "Contraposée ou réciproque ?", etape: "Al-Kashi", nb: 4 },
    { type: "sc-cercle", titre: "Le cercle de diamètre [AB]", etape: "Ensembles de points", nb: 5 },
    { type: "sc-python", titre: "Python : angle de trois points", etape: "Ensembles de points", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$\\vec{u} \\cdot (\\vec{v} + \\vec{w})$ est égal à :", choix: ["$\\vec{u} \\cdot \\vec{v} + \\vec{u} \\cdot \\vec{w}$", "$\\vec{u} \\cdot \\vec{v} \\times \\vec{u} \\cdot \\vec{w}$", "$\\|\\vec{u}\\| + \\vec{v} \\cdot \\vec{w}$", "$(\\vec{u} \\cdot \\vec{v}) + \\vec{w}$"], bonne: 0, explication: "Bilinéarité : on distribue comme avec des nombres." },
    { question: "$\\|\\vec{u} + \\vec{v}\\|^2 =$", choix: ["$\\|\\vec{u}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$", "$\\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2$", "$(\\|\\vec{u}\\| + \\|\\vec{v}\\|)^2$", "$2\\,\\vec{u} \\cdot \\vec{v}$"], bonne: 0, explication: "Identité remarquable du produit scalaire." },
    { question: "$\\|\\vec{u}\\| = 4$ et $\\|\\vec{v}\\| = 3$. $(\\vec{u} + \\vec{v}) \\cdot (\\vec{u} - \\vec{v}) =$", choix: ["$7$", "$25$", "$1$", "$12$"], bonne: 0, explication: "$\\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2 = 16 - 9$." },
    { question: "$\\|\\vec{u}\\| = 2$, $\\|\\vec{v}\\| = 3$ et $\\|\\vec{u} + \\vec{v}\\| = 4$. $\\vec{u} \\cdot \\vec{v} =$", choix: ["$1{,}5$", "$3$", "$-1{,}5$", "$12$"], bonne: 0, explication: "$\\dfrac{16 - 4 - 9}{2} = 1{,}5$." },
    { question: "La formule d'Al-Kashi dans le triangle $ABC$ s'écrit :", choix: ["$BC^2 = AB^2 + AC^2 - 2\\,AB \\times AC \\cos \\widehat{A}$", "$BC^2 = AB^2 + AC^2$", "$BC^2 = AB^2 + AC^2 + 2\\,AB \\times AC \\cos \\widehat{A}$", "$BC = AB + AC - 2\\cos \\widehat{A}$"], bonne: 0, explication: "Elle généralise Pythagore (cas $\\widehat{A} = 90°$)." },
    { question: "$AB = 3$, $AC = 4$ et $\\widehat{A} = 60°$. $BC^2 =$", choix: ["$13$", "$25$", "$37$", "$7$"], bonne: 0, explication: "$9 + 16 - 2 \\times 3 \\times 4 \\times \\dfrac{1}{2} = 13$." },
    { question: "$AB = 3$, $AC = 5$, $BC = 7$. $\\cos \\widehat{A} =$", choix: ["$-\\dfrac{1}{2}$", "$\\dfrac{1}{2}$", "$\\dfrac{7}{15}$", "$0$"], bonne: 0, explication: "$\\dfrac{9 + 25 - 49}{30} = -\\dfrac{1}{2}$ : l'angle mesure $120°$." },
    { question: "Si $BC^2 > AB^2 + AC^2$, l'angle $\\widehat{A}$ est :", choix: ["obtus", "aigu", "droit", "nul"], bonne: 0, explication: "Alors $\\cos \\widehat{A} < 0$." },
    { question: "L'ensemble des points $M$ tels que $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = 0$ est :", choix: ["le cercle de diamètre $[AB]$", "la médiatrice de $[AB]$", "la droite $(AB)$", "le cercle de centre $A$ et de rayon $AB$"], bonne: 0, explication: "Démontré dans le cours avec le milieu $I$ de $[AB]$." },
    { question: "$A(0\\,;0)$ et $B(6\\,;0)$. Le cercle de diamètre $[AB]$ a pour rayon :", choix: ["$3$", "$6$", "$9$", "$36$"], bonne: 0, explication: "$\\dfrac{AB}{2} = 3$." },
    { question: "$I$ est le milieu de $[AB]$. $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} =$", choix: ["$MI^2 - \\dfrac{AB^2}{4}$", "$MI^2 + \\dfrac{AB^2}{4}$", "$MA \\times MB$", "$MI^2$"], bonne: 0, explication: "$(\\overrightarrow{MI} + \\overrightarrow{IA}) \\cdot (\\overrightarrow{MI} - \\overrightarrow{IA}) = MI^2 - IA^2$." },
    { question: "La contraposée de « si P, alors Q » est :", choix: ["« si non Q, alors non P »", "« si Q, alors P »", "« si non P, alors non Q »", "« P et non Q »"], bonne: 0, explication: "« si Q, alors P » est la réciproque." },
    { question: "Un triangle de côtés $6$, $8$ et $11$ est-il rectangle ?", choix: ["Non, car $11^2 \\neq 6^2 + 8^2$", "Oui, car $6 + 8 > 11$", "Oui, car $11$ est le plus grand côté", "On ne peut pas savoir"], bonne: 0, explication: "$121 \\neq 100$ : contraposée de Pythagore." },
    { question: "Depuis une pirogue, $PA = 2$ km, $PB = 2$ km et $\\widehat{APB} = 60°$. $AB =$", choix: ["$2$ km", "$4$ km", "$2\\sqrt{2}$ km", "$1$ km"], bonne: 0, explication: "$AB^2 = 4 + 4 - 2 \\times 4 \\times \\dfrac{1}{2} = 4$ : le triangle est équilatéral." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Développer un produit scalaire",
      etapes: ["Distribuer comme pour un produit de nombres (bilinéarité).", "Remplacer $\\vec{u} \\cdot \\vec{u}$ par $\\|\\vec{u}\\|^2$ et regrouper $\\vec{u} \\cdot \\vec{v} = \\vec{v} \\cdot \\vec{u}$.", "Remplacer par les valeurs connues."],
      exemple: "$(2\\vec{u} - \\vec{v}) \\cdot (\\vec{u} + \\vec{v}) = 2\\|\\vec{u}\\|^2 + \\vec{u} \\cdot \\vec{v} - \\|\\vec{v}\\|^2$."
    },
    {
      titre: "Utiliser Al-Kashi",
      etapes: ["Repérer l'angle connu (ou cherché) et les deux côtés qui l'encadrent.", "Écrire $a^2 = b^2 + c^2 - 2bc\\cos \\widehat{A}$, $a$ étant le côté opposé.", "Isoler l'inconnue : la longueur (racine carrée) ou le cosinus (puis l'angle)."],
      exemple: "$b = 8$, $c = 5$, $\\widehat{A} = 60°$ : $a^2 = 64 + 25 - 40 = 49$, $a = 7$."
    },
    {
      titre: "Déterminer un ensemble de points",
      etapes: ["Introduire le milieu $I$ de $[AB]$.", "Transformer : $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = MI^2 - \\dfrac{AB^2}{4}$.", "Conclure : cercle de centre $I$ (de diamètre $[AB]$ si le produit est nul)."],
      exemple: "$\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = 0$ : cercle de diamètre $[AB]$."
    },
    {
      titre: "Démontrer qu'un triangle n'est pas rectangle",
      etapes: ["Repérer le plus grand côté.", "Comparer son carré à la somme des carrés des deux autres.", "S'ils sont différents, conclure par la contraposée de Pythagore (angle obtus si le carré est plus grand)."],
      exemple: "$5$, $6$, $8$ : $64 \\neq 61$, pas rectangle, angle obtus en face du côté $8$."
    }
  ],
  erreurs: [
    "Écrire $\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2$ en oubliant $2\\,\\vec{u} \\cdot \\vec{v}$.",
    "Utiliser Pythagore dans un triangle qui n'est pas rectangle : il faut Al-Kashi.",
    "Se tromper de côté : dans Al-Kashi, $a$ est le côté **opposé** à l'angle $\\widehat{A}$.",
    "Oublier de diviser par $2bc$ en isolant $\\cos \\widehat{A}$.",
    "Utiliser la calculatrice en mode radians pour un angle en degrés.",
    "Confondre la contraposée (« si non Q, alors non P ») avec la réciproque (« si Q, alors P »).",
    "Prendre le rayon égal à $AB$ au lieu de $\\dfrac{AB}{2}$ pour le cercle de diamètre $[AB]$."
  ]
};
