/*
  CHAPITRE : 6e — Symétrie axiale
  --------------------------------
  Programme de mathématiques du cycle 3 (BO n° 16 du 17 avril 2025), en vigueur en 6e depuis la rentrée 2025 :
  « Symétrie axiale » : connaître la définition du symétrique d'un point par rapport à une droite ; connaître et utiliser
  les propriétés de la symétrie axiale pour effectuer des constructions (quadrillage, papier pointé, papier uni).
  Automatisme : reconnaître si une figure possède un ou plusieurs axes de symétrie.
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js.
  figure : "sx6-grille" ou "sx6-rectangle" (assets/exercices-college.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["sixieme-symetrie"] = {
  niveau: "6e",
  numero: 12,
  titre: "Symétrie axiale",
  accroche: "Le symétrique d'un point, d'une figure, ce que la symétrie conserve, et les axes de symétrie des figures usuelles.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : symétrie axiale (PDF)", url: "https://www.maths-et-tiques.fr/telech/25Sym_axe.pdf" }
  ],
  liens: [
    { titre: "Tout le cours en vidéo (Yvan Monka)", url: "https://youtu.be/ydDOYEfWsoQ", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Deux figures symétriques",
      video: { titre: "Vidéo d'Yvan Monka : revoir les bases de la symétrie axiale", youtube: "https://youtu.be/F7MlLZBt3rs" },
      texte:
        "Deux figures sont **symétriques par rapport à une droite** $(d)$ si elles se **superposent** quand on plie la feuille le long de $(d)$.\n\n" +
        "La droite $(d)$ s'appelle l'**axe de symétrie**.\n\n" +
        "Sur le quadrillage, les deux triangles sont symétriques par rapport à la droite $(d)$ : chaque sommet a son symétrique de l'autre côté, à la même distance de l'axe.",
      figure: "sx6-grille",
      exemple: {
        enonce: "Sur le quadrillage, $A$ est à $3$ carreaux de $(d)$. Où se trouve son symétrique $A'$ ?",
        solution: "De l'autre côté de $(d)$, sur la même ligne du quadrillage, à $3$ carreaux de $(d)$ : c'est le point $A'$ de la figure."
      }
    },
    {
      titre: "Le symétrique d'un point",
      video: { titre: "Vidéo d'Yvan Monka : construire le symétrique d'un point", youtube: "https://youtu.be/JauG01P544k" },
      texte:
        "**Définition :** le symétrique de $A$ par rapport à la droite $(d)$ est le point $A'$ tel que $(d)$ soit la **médiatrice** du segment $[AA']$.\n\n" +
        "Donc $(AA')$ est **perpendiculaire** à $(d)$, et $(d)$ passe par le **milieu** de $[AA']$ : $A$ et $A'$ sont à la même distance de $(d)$.\n\n" +
        "Si $A$ est **sur** la droite $(d)$, son symétrique est lui-même.\n\n" +
        "Pour le construire sur papier uni : on trace la perpendiculaire à $(d)$ passant par $A$ (équerre), puis on reporte la distance de l'autre côté (compas).",
      exemple: {
        enonce: "$A'$ est le symétrique de $A$ par rapport à $(d)$, et $AA' = 7$ cm. À quelle distance de $(d)$ se trouve $A$ ?",
        solution: "$(d)$ passe par le milieu de $[AA']$ : $A$ est à $7 \\div 2 = 3{,}5$ cm de $(d)$."
      }
    },
    {
      titre: "Ce que la symétrie conserve",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les propriétés de la symétrie axiale", youtube: "https://youtu.be/UE6q39qc1E8" },
      texte:
        "La symétrie axiale est comme un pliage : elle ne déforme rien. Elle **conserve** :\n\n" +
        "- les **longueurs** : le symétrique d'un segment est un segment de même longueur ;\n" +
        "- les **angles** : le symétrique d'un angle est un angle de même mesure ;\n" +
        "- les **alignements** : le symétrique d'une droite est une droite ;\n" +
        "- les **aires** et les **formes** : le symétrique d'un cercle est un cercle de même rayon, dont le centre est le symétrique du centre.\n\n" +
        "Pour construire le symétrique d'un polygone, il suffit de construire les symétriques de ses sommets, puis de les relier.",
      exemple: {
        enonce: "$A'B'C'$ est le symétrique du triangle $ABC$. On sait que $AB = 4{,}2$ cm et $\\widehat{ABC} = 47$°. Que vaut $A'B'$ ? Et $\\widehat{A'B'C'}$ ?",
        solution: "La symétrie conserve les longueurs et les angles : $A'B' = 4{,}2$ cm et $\\widehat{A'B'C'} = 47$°."
      }
    },
    {
      titre: "Les axes de symétrie d'une figure",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître un axe de symétrie", youtube: "https://youtu.be/Kt1VtKhlySA" },
      texte:
        "Une droite est un **axe de symétrie** d'une figure si la figure est **sa propre symétrique** par rapport à cette droite : en pliant, les deux moitiés se superposent.\n\n" +
        "- triangle isocèle : $1$ axe ; triangle équilatéral : $3$ axes ;\n" +
        "- rectangle : $2$ axes (les médiatrices des côtés, **pas** les diagonales) ;\n" +
        "- losange : $2$ axes (ses diagonales) ; carré : $4$ axes ;\n" +
        "- parallélogramme quelconque : aucun axe ;\n" +
        "- cercle : une infinité d'axes (toutes les droites qui passent par son centre).",
      figure: "sx6-rectangle",
      exemple: {
        enonce: "Pourquoi la diagonale d'un rectangle n'est-elle pas un axe de symétrie ?",
        solution: "Si on plie un rectangle (non carré) le long d'une diagonale, les deux triangles ne se superposent pas : les coins dépassent. Les seuls axes sont les deux médiatrices des côtés."
      }
    }
  ],

  videosNote: "Constructions et exercices corrigés par Yvan Monka (maths-et-tiques).",
  videos: [
    { titre: "Construire le symétrique d'une figure", type: "Construction", youtube: "https://youtu.be/sRcgsiPeIq4" },
    { titre: "Construire le symétrique d'une droite", type: "Construction", youtube: "https://youtu.be/NILIM-H2tSY" },
    { titre: "Construire le symétrique d'un cercle", type: "Construction", youtube: "https://youtu.be/m97Q9Cdo4to" },
    { titre: "Compléter une figure par symétrie axiale", type: "Quadrillage", youtube: "https://youtu.be/wvR197QDF8s" },
    { titre: "Construire le symétrique d'une figure (exercice)", type: "Exercice", youtube: "https://youtu.be/jtrX8brMZcU" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "sx6-point", titre: "Le symétrique d'un point sur quadrillage", etape: "Symétrique d'un point", nb: 6 },
    { type: "sx6-definition", titre: "Définition : axe et médiatrice", etape: "Symétrique d'un point", nb: 5 },
    { type: "sx6-proprietes", titre: "Ce que la symétrie conserve", etape: "Propriétés et axes", nb: 5 },
    { type: "sx6-axes", titre: "Combien d'axes de symétrie ?", etape: "Propriétés et axes", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Deux figures sont symétriques par rapport à une droite si :", choix: ["elles se superposent par pliage le long de la droite", "elles sont du même côté de la droite", "elles ont la même couleur", "l'une est deux fois plus grande que l'autre"], bonne: 0, explication: "C'est la définition par le pliage." },
    { question: "$A'$ est le symétrique de $A$ par rapport à $(d)$. Alors :", choix: ["$(d)$ est la médiatrice de $[AA']$", "$(d)$ passe par $A$", "$(AA')$ est parallèle à $(d)$", "$AA' = 0$"], bonne: 0, explication: "$(d)$ coupe $[AA']$ en son milieu, perpendiculairement." },
    { question: "Si $M$ est sur l'axe $(d)$, son symétrique est :", choix: ["$M$ lui-même", "un point de l'autre côté", "inexistant", "le milieu de $(d)$"], bonne: 0, explication: "Un point de l'axe ne bouge pas." },
    { question: "$AA' = 7$ cm, avec $A'$ symétrique de $A$ par rapport à $(d)$. La distance de $A$ à $(d)$ est :", choix: ["$3{,}5$ cm", "$7$ cm", "$14$ cm", "$0$ cm"], bonne: 0, explication: "$(d)$ passe par le milieu de $[AA']$." },
    { question: "La symétrie axiale conserve :", choix: ["les longueurs et les angles", "seulement les longueurs", "seulement les angles", "ni les longueurs ni les angles"], bonne: 0, explication: "C'est un « pliage » : rien n'est déformé." },
    { question: "Le symétrique d'un segment de $5$ cm est :", choix: ["un segment de $5$ cm", "un segment de $10$ cm", "une droite", "un point"], bonne: 0, explication: "Les longueurs sont conservées." },
    { question: "Le symétrique d'un cercle de rayon $3$ cm est :", choix: ["un cercle de rayon $3$ cm", "un cercle de rayon $6$ cm", "un disque de rayon $1{,}5$ cm", "une droite"], bonne: 0, explication: "Son centre est le symétrique du centre, et le rayon ne change pas." },
    { question: "Le symétrique d'un angle de $47$° mesure :", choix: ["$47$°", "$133$°", "$94$°", "$23{,}5$°"], bonne: 0, explication: "Les angles sont conservés." },
    { question: "Combien d'axes de symétrie a un carré ?", choix: ["$4$", "$2$", "$1$", "une infinité"], bonne: 0, explication: "Ses deux diagonales et les deux médiatrices de ses côtés." },
    { question: "Combien d'axes de symétrie a un rectangle (non carré) ?", figure: "sx6-rectangle", choix: ["$2$", "$4$", "$1$", "$0$"], bonne: 0, explication: "Les médiatrices des côtés ; les diagonales ne sont pas des axes." },
    { question: "Combien d'axes de symétrie a un triangle équilatéral ?", choix: ["$3$", "$1$", "$0$", "$6$"], bonne: 0, explication: "Les trois médiatrices de ses côtés." },
    { question: "Combien d'axes de symétrie a un triangle isocèle non équilatéral ?", choix: ["$1$", "$2$", "$3$", "$0$"], bonne: 0, explication: "La médiatrice de sa base." },
    { question: "Quelle figure n'a aucun axe de symétrie ?", choix: ["un parallélogramme quelconque", "un losange", "un cercle", "un trapèze isocèle"], bonne: 0, explication: "Aucun pliage ne superpose les deux moitiés d'un parallélogramme quelconque." },
    { question: "Un cercle a :", choix: ["une infinité d'axes de symétrie", "$1$ axe de symétrie", "$2$ axes de symétrie", "aucun axe de symétrie"], bonne: 0, explication: "Toute droite passant par son centre est un axe." },
    { question: "Pour construire le symétrique d'un triangle, on :", choix: ["construit les symétriques des trois sommets, puis on les relie", "recopie le triangle à côté de l'axe", "trace le triangle deux fois plus grand", "construit seulement le symétrique d'un sommet"], bonne: 0, explication: "Les symétriques des sommets suffisent, car les segments sont conservés." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Construire le symétrique d'un point sur quadrillage",
      etapes: [
        "Compte les carreaux (ou les diagonales de carreaux) entre le point et l'axe, perpendiculairement à l'axe.",
        "Reporte le même nombre de carreaux de l'autre côté de l'axe.",
        "Vérifie : l'axe doit être la médiatrice du segment qui relie le point et son symétrique."
      ],
      exemple: "$A$ à $3$ carreaux à gauche d'un axe vertical : $A'$ est à $3$ carreaux à droite, sur la même ligne."
    },
    {
      titre: "Construire le symétrique d'un point sur papier uni",
      etapes: [
        "Trace la perpendiculaire à $(d)$ passant par $A$, avec l'équerre.",
        "Avec le compas, reporte la distance de $A$ à $(d)$ de l'autre côté.",
        "Nomme le point $A'$ et code la figure (angle droit, longueurs égales)."
      ],
      exemple: "On peut aussi tracer deux arcs centrés sur deux points de $(d)$ et passant par $A$ : ils se recoupent en $A'$."
    },
    {
      titre: "Utiliser les propriétés",
      etapes: [
        "Repère les éléments qui se correspondent : $A \\rightarrow A'$, $[AB] \\rightarrow [A'B']$.",
        "Les longueurs, les angles et les aires sont les mêmes.",
        "Le symétrique d'une droite est une droite, celui d'un cercle est un cercle de même rayon."
      ],
      exemple: "$AB = 4{,}2$ cm, donc $A'B' = 4{,}2$ cm."
    },
    {
      titre: "Trouver les axes de symétrie",
      etapes: [
        "Imagine des pliages : selon les diagonales, selon les médiatrices des côtés.",
        "Garde ceux où les deux moitiés se superposent exactement.",
        "Compte-les."
      ],
      exemple: "Losange : ses deux diagonales sont des axes, les médiatrices des côtés non."
    }
  ],
  erreurs: [
    "Reporter le point « en face » sans prendre la perpendiculaire à l'axe quand l'axe est en biais.",
    "Ne pas reporter la même distance de l'autre côté de l'axe.",
    "Croire que la symétrie change les longueurs ou les angles.",
    "Croire que les diagonales d'un rectangle sont des axes de symétrie.",
    "Oublier qu'un point de l'axe est son propre symétrique.",
    "Compter les axes « à l'œil » sans vérifier par pliage."
  ]
};
