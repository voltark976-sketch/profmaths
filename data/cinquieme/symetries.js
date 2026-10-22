/*
  CHAPITRE : 5e — Symétries
  --------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026, partie
  « Transformations » : définir le demi-tour, ou symétrie centrale ; connaitre les propriétés du demi-tour.
  Automatismes : symétrique d'une figure par symétrie axiale (sur quadrillage et sur feuille blanche).
  figure : "sc5-point" ou "sc5-figure" (assets/exercices-cinquieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-symetries"] = {
  niveau: "5e",
  numero: 7,
  titre: "Symétries",
  accroche: "Après le pliage de la symétrie axiale, le demi-tour : construire le symétrique d'un point ou d'une figure par rapport à un point et utiliser ses propriétés.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : symétries (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Sym.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : symétrie centrale (Yvan Monka)", url: "https://youtu.be/-ZWAUCXmXB4", type: "video" },
    { titre: "Construire l'image d'une figure par une symétrie centrale (Yvan Monka)", url: "https://youtu.be/gQZIWxzOfaE", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Symétrie axiale et symétrie centrale",
      texte:
        "- La **symétrie axiale** d'axe $(d)$ correspond à un **pliage** le long de $(d)$ : $(d)$ est la médiatrice du segment qui joint un point et son image.\n" +
        "- La **symétrie centrale** de centre $O$ correspond à un **demi-tour** autour de $O$ : la figure tourne de $180^\\circ$.\n\n" +
        "Par un demi-tour, une figure n'est pas retournée « en miroir » : elle se retrouve « la tête en bas ».",
      figure: "sc5-figure",
      exemple: {
        enonce: "Sur la figure, comment passe-t-on du triangle bleu au triangle jaune ?",
        solution: "Par un demi-tour autour de $O$ : c'est la symétrie de centre $O$. Chaque sommet et son image sont de part et d'autre de $O$, à la même distance."
      }
    },
    {
      titre: "Construire le symétrique d'un point",
      video: { titre: "Vidéo d'Yvan Monka : construire l'image d'un point par symétrie centrale", youtube: "https://youtu.be/SmdZEpPKYF8" },
      texte:
        "**Définition** : le symétrique du point $A$ par rapport au point $O$ est le point $A'$ tel que $O$ soit le **milieu** de $[AA']$.\n\n" +
        "- Sur feuille blanche : on trace la demi-droite $[AO)$ et on reporte la longueur $OA$ au compas de l'autre côté de $O$.\n" +
        "- Sur quadrillage : on compte les carreaux de $A$ à $O$, puis on refait le même déplacement à partir de $O$.\n\n" +
        "Le symétrique de $O$ est $O$ lui-même.",
      figure: "sc5-point",
      exemple: {
        enonce: "Sur la figure, vérifie que $A'$ est le symétrique de $A$ par rapport à $O$.",
        solution: "De $A$ à $O$ : $3$ carreaux vers la droite et $2$ vers le bas. De $O$ à $A'$ : encore $3$ vers la droite et $2$ vers le bas. $O$ est bien le milieu de $[AA']$."
      }
    },
    {
      titre: "Propriétés de la symétrie centrale",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les propriétés de la symétrie centrale", youtube: "https://youtu.be/B3xlAAp10ww" },
      texte:
        "La symétrie centrale **conserve** :\n\n" +
        "- les longueurs (le symétrique d'un segment est un segment de même longueur) ;\n" +
        "- les angles, les périmètres et les aires ;\n" +
        "- l'alignement des points.\n\n" +
        "De plus, l'image d'une droite est une droite **parallèle** (ou la même droite si elle passe par $O$).",
      exemple: {
        enonce: "Par la symétrie de centre $O$, le triangle $ABC$ a pour image $A'B'C'$, avec $AB = 4$ cm et $\\widehat{BAC} = 35^\\circ$. Que sait-on sur $A'B'C'$ ?",
        solution: "$A'B' = 4$ cm et $\\widehat{B'A'C'} = 35^\\circ$ : les longueurs et les angles sont conservés. De plus, $(A'B')$ est parallèle à $(AB)$."
      }
    },
    {
      titre: "Centre de symétrie d'une figure",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un centre ou un axe de symétrie", youtube: "https://youtu.be/x2MqdM1t5Y4" },
      texte:
        "Un point $O$ est un **centre de symétrie** d'une figure si, après un demi-tour autour de $O$, la figure se superpose à elle-même.\n\n" +
        "- Le cercle (son centre), le carré, le rectangle, le losange et le parallélogramme (le point d'intersection des diagonales) ont un centre de symétrie.\n" +
        "- Un triangle n'a jamais de centre de symétrie.\n" +
        "- Les lettres N, S, Z ont un centre de symétrie mais pas d'axe ; la lettre A a un axe mais pas de centre ; H, O, X ont les deux.",
      exemple: {
        enonce: "Un parallélogramme qui n'est ni un rectangle ni un losange a-t-il un axe de symétrie ? Un centre de symétrie ?",
        solution: "Aucun pliage ne superpose ses deux moitiés : il n'a pas d'axe. Mais un demi-tour autour du point d'intersection de ses diagonales le laisse inchangé : il a un centre de symétrie."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "sc5-point", titre: "Symétrique d'un point", etape: "Construire", nb: 6 },
    { type: "sc5-figure", titre: "Image d'une figure", etape: "Construire", nb: 5 },
    { type: "sc5-proprietes", titre: "Utiliser les propriétés", etape: "Propriétés", nb: 6 },
    { type: "sc5-centre", titre: "Centre et axes de symétrie", etape: "Propriétés", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "La symétrie centrale correspond à :", choix: ["un demi-tour", "un pliage", "un quart de tour", "un agrandissement"], bonne: 0, explication: "Une rotation de $180^\\circ$ autour du centre." },
    { question: "$A'$ est le symétrique de $A$ par rapport à $O$ si :", choix: ["$O$ est le milieu de $[AA']$", "$OA = 2 \\times OA'$", "$(AA')$ est perpendiculaire en $O$", "$A$ est le milieu de $[OA']$"], bonne: 0, explication: "C'est la définition." },
    { question: "$OA = 3$ cm. Si $A'$ est le symétrique de $A$ par rapport à $O$, alors $AA'$ mesure :", choix: ["$6$ cm", "$3$ cm", "$1{,}5$ cm", "$9$ cm"], bonne: 0, explication: "$O$ est le milieu : $2 \\times 3 = 6$." },
    { question: "Le symétrique de $O$ par rapport à $O$ est :", choix: ["$O$", "il n'existe pas", "un point quelconque", "le milieu de $[OA]$"], bonne: 0, explication: "Le centre ne bouge pas." },
    { question: "La symétrie centrale conserve :", choix: ["les longueurs, les angles et les aires", "seulement les longueurs", "seulement les angles", "rien"], bonne: 0, explication: "C'est un déplacement : la figure garde sa forme et ses dimensions." },
    { question: "L'image d'une droite par une symétrie centrale est une droite :", choix: ["parallèle", "perpendiculaire", "sécante en $O$ seulement", "deux fois plus longue"], bonne: 0, explication: "Propriété de la symétrie centrale." },
    { question: "Un angle de $47^\\circ$ a pour image par une symétrie centrale un angle de :", choix: ["$47^\\circ$", "$133^\\circ$", "$94^\\circ$", "$43^\\circ$"], bonne: 0, explication: "Les angles sont conservés." },
    { question: "Sur la figure, $O$ est :", figure: "sc5-point", choix: ["le milieu de $[AA']$", "sur la médiatrice de $[AA']$ seulement", "à égale distance de $A$ et d'un autre point", "l'image de $A$"], bonne: 0, explication: "$A'$ est le symétrique de $A$ par rapport à $O$." },
    { question: "Quelle figure possède un centre de symétrie ?", choix: ["le parallélogramme", "le triangle équilatéral", "le trapèze isocèle", "le demi-cercle"], bonne: 0, explication: "Le point d'intersection des diagonales." },
    { question: "Un triangle peut-il avoir un centre de symétrie ?", choix: ["Jamais", "Oui, s'il est équilatéral", "Oui, s'il est rectangle", "Oui, s'il est isocèle"], bonne: 0, explication: "Retourné, un triangle a toujours « la pointe en bas »." },
    { question: "Quelle lettre a un centre de symétrie mais aucun axe ?", choix: ["S", "A", "H", "T"], bonne: 0, explication: "S retournée d'un demi-tour reste S, mais aucun pliage ne la superpose." },
    { question: "Le centre de symétrie d'un rectangle est :", choix: ["le point d'intersection de ses diagonales", "un de ses sommets", "le milieu d'un côté", "il n'en a pas"], bonne: 0, explication: "Les diagonales se coupent en leur milieu." },
    { question: "Un carré possède :", choix: ["un centre et quatre axes de symétrie", "un centre et deux axes", "quatre axes et aucun centre", "un seul axe"], bonne: 0, explication: "Deux médianes et deux diagonales comme axes." },
    { question: "Par une symétrie centrale, un cercle de rayon $2$ cm a pour image :", choix: ["un cercle de rayon $2$ cm", "un cercle de rayon $4$ cm", "un demi-cercle", "un point"], bonne: 0, explication: "Les longueurs sont conservées." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Construire le symétrique d'un point",
      etapes: [
        "Trace la demi-droite $[AO)$ (ou compte les carreaux de $A$ à $O$).",
        "Reporte la longueur $OA$ de l'autre côté de $O$ (ou refais le même déplacement).",
        "Vérifie que $O$ est le milieu de $[AA']$."
      ],
      exemple: "De $A$ à $O$ : $+3$ ; $-2$. De $O$ à $A'$ : $+3$ ; $-2$."
    },
    {
      titre: "Construire l'image d'une figure",
      etapes: [
        "Construis le symétrique de chaque sommet.",
        "Relie les images dans le même ordre.",
        "Contrôle : la figure image est retournée d'un demi-tour, avec les mêmes dimensions."
      ],
      exemple: "Image du triangle $ABC$ : le triangle $A'B'C'$."
    },
    {
      titre: "Utiliser les propriétés",
      etapes: [
        "Repère l'élément de la figure image qui correspond à l'élément connu.",
        "Longueurs, angles, aires : mêmes mesures.",
        "Droites : l'image est parallèle à la droite de départ."
      ],
      exemple: "$MN = 5$ cm donc $M'N' = 5$ cm."
    },
    {
      titre: "Trouver un centre de symétrie",
      etapes: [
        "Imagine la figure tournée d'un demi-tour.",
        "Si elle se superpose à elle-même, elle a un centre de symétrie.",
        "Pour un quadrilatère, c'est le point d'intersection des diagonales."
      ],
      exemple: "Le losange a un centre de symétrie ; le cerf-volant n'en a pas."
    }
  ],
  erreurs: [
    "Confondre symétrie centrale (demi-tour) et symétrie axiale (pliage).",
    "Placer le symétrique à une distance double de $O$ : $OA' = OA$.",
    "Croire que la symétrie centrale change les longueurs ou les angles.",
    "Penser qu'une figure qui a un axe de symétrie a forcément un centre de symétrie.",
    "Relier les images des sommets dans un ordre différent."
  ]
};
