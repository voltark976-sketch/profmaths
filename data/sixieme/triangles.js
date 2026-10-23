/*
  CHAPITRE : 6e — Triangles
  --------------------------
  Programme de mathématiques du cycle 3 (BO n° 16 du 17 avril 2025), en vigueur en 6e depuis la rentrée 2025 :
  « Triangles » : construire des triangles (à l'aide du compas, l'élève remarque que trois longueurs ne permettent pas
  toujours de construire un triangle) ; connaître et utiliser les propriétés angulaires des triangles particuliers
  (rectangle, isocèle, équilatéral) ; connaître la somme des mesures des angles d'un triangle et l'utiliser ;
  savoir que les médiatrices d'un triangle sont concourantes ; connaître et construire le cercle circonscrit.
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js.
  figure : "tg6-somme" ou "tg6-isocele" (assets/exercices-college.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["sixieme-triangles"] = {
  niveau: "6e",
  numero: 11,
  titre: "Triangles",
  accroche: "Construire un triangle au compas, reconnaître les triangles particuliers, utiliser la règle des 180° et tracer le cercle circonscrit.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : triangles (PDF)", url: "https://www.maths-et-tiques.fr/telech/25Triang.pdf" }
  ],
  liens: [
    { titre: "Tout le cours en vidéo (Yvan Monka)", url: "https://youtu.be/z0olRGs7kPk", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Construire un triangle connaissant ses trois côtés",
      video: { titre: "Vidéo d'Yvan Monka : construire un triangle", youtube: "https://youtu.be/-7UGauYeTdk" },
      texte:
        "Pour construire le triangle $ABC$ avec $AB = 6$ cm, $AC = 4$ cm et $BC = 5$ cm :\n\n" +
        "- on trace le segment $[AB]$ de $6$ cm ;\n" +
        "- on trace un arc de cercle de centre $A$ et de rayon $4$ cm ;\n" +
        "- on trace un arc de cercle de centre $B$ et de rayon $5$ cm ;\n" +
        "- le point $C$ est à l'intersection des deux arcs.\n\n" +
        "Attention : trois longueurs **ne permettent pas toujours** de construire un triangle. Si le plus grand côté est **plus long** que la somme des deux autres, les arcs ne se coupent pas. S'il lui est **égal**, les trois points sont alignés.",
      figure: "tg6-cours-construction",
      exemple: {
        enonce: "Peut-on construire un triangle de côtés $3$ cm, $4$ cm et $8$ cm ? Et $3$ cm, $5$ cm et $8$ cm ?",
        solution: "$3 + 4 = 7 < 8$ : impossible, les arcs ne se coupent pas.\n\n$3 + 5 = 8$ : les trois points sont alignés, on n'obtient pas un vrai triangle."
      }
    },
    {
      titre: "Les triangles particuliers",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître les triangles particuliers", youtube: "https://youtu.be/WPmB1mJ3HO0" },
      texte:
        "- Un triangle **isocèle** a **deux côtés** de même longueur. Le point commun à ces deux côtés est le **sommet principal** ; le troisième côté est la **base**.\n" +
        "- Un triangle **équilatéral** a ses **trois côtés** de même longueur.\n" +
        "- Un triangle **rectangle** a un **angle droit**. Le côté opposé à l'angle droit s'appelle l'**hypoténuse**.\n" +
        "- Un triangle **rectangle isocèle** a un angle droit et deux côtés de même longueur.\n\n" +
        "Sur une figure, on reconnaît ces triangles **au codage** (traits égaux, petit carré), pas à l'œil.",
      figure: "tg6-isocele",
      exemple: {
        enonce: "Sur la figure, quelle est la nature du triangle $ABC$ ? Quel est son sommet principal ?",
        solution: "Le codage indique $AB = AC$ : le triangle est isocèle en $A$. Son sommet principal est $A$ et sa base est $[BC]$."
      }
    },
    {
      titre: "La somme des angles d'un triangle",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la règle des 180° dans le triangle", youtube: "https://youtu.be/S1vCp-O7fbw" },
      texte:
        "Dans **tout** triangle, la somme des mesures des trois angles est égale à **$180$°**.\n\n" +
        "Si l'on connaît deux angles, on trouve le troisième : $180$° moins les deux autres.\n\n" +
        "Sur la figure : $\\widehat{ACB} = 180 - 62 - 37 = 81$°.\n\n" +
        "On peut le vérifier en découpant les trois coins d'un triangle en papier : mis côte à côte, ils forment un angle plat.",
      figure: "tg6-somme",
      exemple: {
        enonce: "Un triangle peut-il avoir des angles de $70$°, $60$° et $40$° ?",
        solution: "$70 + 60 + 40 = 170$ : ce n'est pas $180$°, un tel triangle n'existe pas."
      }
    },
    {
      titre: "Les angles des triangles particuliers",
      video: { titre: "Vidéo d'Yvan Monka : calculer un angle dans un triangle", youtube: "https://youtu.be/x0UA6kbiDcM" },
      texte:
        "- Dans un triangle **isocèle**, les deux **angles à la base** ont la même mesure.\n" +
        "- Dans un triangle **équilatéral**, les trois angles mesurent **$60$°** ($180 \\div 3$).\n" +
        "- Dans un triangle **rectangle**, les deux autres angles ont une somme de **$90$°** ($180 - 90$).\n\n" +
        "Sur la figure, $ABC$ est équilatéral : ses trois angles mesurent $60$°. Dans le triangle isocèle de la partie 2, $\\widehat{ABC} = \\widehat{ACB} = 55$°, et $\\widehat{BAC} = 180 - 2 \\times 55 = 70$°.",
      figure: "tg6-cours-particuliers",
      exemple: {
        enonce: "$DEF$ est isocèle en $D$ et $\\widehat{EDF} = 50$°. Combien mesurent les angles à la base ?",
        solution: "Il reste $180 - 50 = 130$° pour deux angles égaux : $130 \\div 2 = 65$°. Donc $\\widehat{DEF} = \\widehat{DFE} = 65$°."
      }
    },
    {
      titre: "Le cercle circonscrit",
      video: { titre: "Vidéo d'Yvan Monka : tracer un cercle circonscrit", youtube: "https://youtu.be/0h9bZZoQfJM" },
      texte:
        "Les trois **médiatrices** des côtés d'un triangle se coupent en **un même point** : on dit qu'elles sont **concourantes**.\n\n" +
        "Ce point est à égale distance des trois sommets (il est sur chaque médiatrice). C'est le centre du **cercle circonscrit** au triangle : le cercle qui passe par ses **trois sommets**.\n\n" +
        "Pour le tracer : on construit deux médiatrices (la troisième passe aussi par leur point d'intersection), puis le cercle de centre ce point qui passe par un sommet.\n\n" +
        "Ce centre n'est pas toujours à l'intérieur du triangle : pour un triangle rectangle, c'est le milieu de l'hypoténuse ; quand un angle est obtus, il est à l'extérieur.",
      figure: "tg6-cours-circonscrit",
      exemple: {
        enonce: "$O$ est le centre du cercle circonscrit au triangle $ABC$, et $OA = 3{,}5$ cm. Combien mesurent $OB$ et $OC$ ?",
        solution: "$[OA]$, $[OB]$ et $[OC]$ sont trois rayons du cercle circonscrit : $OB = OC = 3{,}5$ cm."
      }
    }
  ],

  videosNote: "Constructions expliquées pas à pas par Yvan Monka (maths-et-tiques).",
  videos: [
    { titre: "Construire un triangle isocèle", type: "Construction", youtube: "https://youtu.be/sZKmW_UShHs" },
    { titre: "Construire un triangle équilatéral", type: "Construction", youtube: "https://youtu.be/M_JQgO-jEmY" },
    { titre: "Construire un triangle rectangle", type: "Construction", youtube: "https://youtu.be/8Jtg_eScg68" },
    { titre: "Construire un triangle (2 côtés et 1 angle)", type: "Construction", youtube: "https://youtu.be/6mFBqacFzws" },
    { titre: "Construire des triangles à partir d'un texte", type: "Exercice", youtube: "https://youtu.be/WeYslKqvupU" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "tg6-construire", titre: "Ces trois longueurs donnent-elles un triangle ?", etape: "Construire et reconnaître", nb: 5 },
    { type: "tg6-nature", titre: "Isocèle, équilatéral, rectangle ? Lire le codage", etape: "Construire et reconnaître", nb: 5 },
    { type: "tg6-somme", titre: "La règle des 180°", etape: "Les angles du triangle", nb: 6 },
    { type: "tg6-angles-possibles", titre: "Ces angles sont-ils possibles ?", etape: "Les angles du triangle", nb: 5 },
    { type: "tg6-circonscrit", titre: "Médiatrices et cercle circonscrit", etape: "Cercle circonscrit", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Un triangle isocèle a :", choix: ["deux côtés de même longueur", "trois côtés de même longueur", "un angle droit", "trois angles différents"], bonne: 0, explication: "Isocèle : deux côtés égaux. Équilatéral : trois." },
    { question: "Sur la figure, le triangle $ABC$ est :", figure: "tg6-isocele", choix: ["isocèle en $A$", "équilatéral", "rectangle en $A$", "isocèle en $B$"], bonne: 0, explication: "Le codage indique $AB = AC$ : isocèle de sommet principal $A$." },
    { question: "Peut-on construire un triangle de côtés $3$ cm, $4$ cm et $8$ cm ?", choix: ["Non, car $3 + 4 < 8$", "Oui, toujours", "Oui, car $8 = 2 \\times 4$", "Non, car les côtés sont différents"], bonne: 0, explication: "Le plus grand côté est plus long que la somme des deux autres : les arcs ne se coupent pas." },
    { question: "Avec des côtés de $3$ cm, $5$ cm et $8$ cm, on obtient :", choix: ["trois points alignés", "un triangle rectangle", "un triangle isocèle", "un triangle équilatéral"], bonne: 0, explication: "$3 + 5 = 8$ : le triangle est « aplati »." },
    { question: "La somme des angles d'un triangle est :", choix: ["$180$°", "$360$°", "$90$°", "elle dépend du triangle"], bonne: 0, explication: "C'est vrai pour tous les triangles." },
    { question: "Sur la figure, $\\widehat{ACB}$ mesure :", figure: "tg6-somme", choix: ["$81$°", "$99$°", "$261$°", "$71$°"], bonne: 0, explication: "$180 - 62 - 37 = 81$°." },
    { question: "Un triangle peut-il avoir des angles de $70$°, $60$° et $40$° ?", choix: ["Non, car la somme fait $170$°", "Oui", "Oui, s'il est rectangle", "Non, car ils sont tous aigus"], bonne: 0, explication: "La somme doit faire $180$°." },
    { question: "Chaque angle d'un triangle équilatéral mesure :", choix: ["$60$°", "$90$°", "$45$°", "$120$°"], bonne: 0, explication: "$180 \\div 3 = 60$." },
    { question: "$ABC$ est rectangle en $A$ et $\\widehat{ABC} = 35$°. Alors $\\widehat{ACB} = $", choix: ["$55$°", "$145$°", "$35$°", "$65$°"], bonne: 0, explication: "$180 - 90 - 35 = 55$°." },
    { question: "$DEF$ est isocèle en $D$ et $\\widehat{EDF} = 50$°. Les angles à la base mesurent :", choix: ["$65$°", "$130$°", "$50$°", "$40$°"], bonne: 0, explication: "$(180 - 50) \\div 2 = 65$°." },
    { question: "$ABC$ est isocèle en $A$ et $\\widehat{ABC} = 70$°. Alors $\\widehat{BAC} = $", choix: ["$40$°", "$70$°", "$110$°", "$55$°"], bonne: 0, explication: "Les angles à la base mesurent $70$° chacun : $180 - 140 = 40$°." },
    { question: "Dans un triangle rectangle, le côté opposé à l'angle droit s'appelle :", choix: ["l'hypoténuse", "la base", "la médiatrice", "le sommet principal"], bonne: 0, explication: "C'est le plus long côté du triangle rectangle." },
    { question: "Les trois médiatrices d'un triangle :", choix: ["se coupent en un même point", "sont parallèles", "passent par les sommets", "ne se coupent jamais"], bonne: 0, explication: "Elles sont concourantes : leur point commun est le centre du cercle circonscrit." },
    { question: "Le cercle circonscrit à un triangle :", choix: ["passe par ses trois sommets", "touche ses trois côtés à l'intérieur", "a pour diamètre le plus grand côté", "a pour centre un sommet"], bonne: 0, explication: "« Circonscrit » : qui entoure le triangle en passant par ses sommets." },
    { question: "$O$ est le centre du cercle circonscrit à $ABC$ et $OA = 3{,}5$ cm. Alors $OC = $", choix: ["$3{,}5$ cm", "$7$ cm", "$1{,}75$ cm", "on ne peut pas savoir"], bonne: 0, explication: "$[OA]$ et $[OC]$ sont deux rayons du même cercle." },
    { question: "Le triangle $ABC$ est rectangle en $C$. Où se trouve le centre $O$ de son cercle circonscrit ?", figure: "tg6-qcm-rectangle", choix: ["Au milieu de l'hypoténuse $[AB]$", "Au sommet $C$", "À l'extérieur du triangle", "Au milieu de $[AC]$"], bonne: 0, explication: "Pour un triangle rectangle, le centre du cercle circonscrit est le milieu de l'hypoténuse : $[AB]$ est un diamètre du cercle." },
    { question: "D'après le codage, le triangle $DEF$ est :", figure: "tg6-qcm-equi", choix: ["équilatéral", "rectangle", "isocèle seulement en $D$", "quelconque"], bonne: 0, explication: "Les trois côtés portent le même codage : ils ont la même longueur, le triangle est équilatéral." },
    { question: "Le triangle $ABC$ est isocèle en $A$. Combien mesure l'angle marqué « ? » ?", figure: "tg6-qcm-isocele", choix: ["$70$°", "$140$°", "$40$°", "$20$°"], bonne: 0, explication: "Il reste $180 - 40 = 140$° pour les deux angles à la base, égaux : $140 \\div 2 = 70$°." },
    { question: "On essaie de construire au compas un triangle de côtés $8$ cm, $4$ cm et $3$ cm. Que montre la figure ?", figure: "tg6-qcm-arcs", choix: ["Les arcs ne se coupent pas : ce triangle n'existe pas", "Les arcs se coupent en deux points", "Le triangle est rectangle", "Il faut prendre un plus grand compas"], bonne: 0, explication: "$4 + 3 = 7 < 8$ : les deux autres côtés sont trop courts, les arcs ne se rencontrent pas." },
    { question: "Ces trois angles peuvent-ils être les angles d'un même triangle ?", figure: "tg6-qcm-angles", choix: ["Non, car $50 + 60 + 80 = 190$°", "Oui, car ils sont tous aigus", "Oui, car $50 + 60 = 110$°", "On ne peut pas savoir"], bonne: 0, explication: "La somme des angles d'un triangle doit faire $180$° ; ici elle fait $190$°." },
    { question: "Dans un triangle rectangle isocèle, chacun des deux angles aigus mesure :", choix: ["$45$°", "$60$°", "$90$°", "$30$°"], bonne: 0, explication: "Ils sont égaux et font $180 - 90 = 90$° à eux deux : $90 \\div 2 = 45$°." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Construire un triangle avec trois longueurs",
      etapes: [
        "Vérifie d'abord : le plus grand côté doit être plus petit que la somme des deux autres.",
        "Trace le plus grand côté à la règle.",
        "Trace deux arcs de cercle aux extrémités, avec les deux autres longueurs ; le troisième sommet est à leur intersection."
      ],
      figure: "tg6-cours-construction",
      exemple: "$6$ cm, $4$ cm, $5$ cm : $6 < 4 + 5$, le triangle existe."
    },
    {
      titre: "Calculer un angle dans un triangle",
      etapes: [
        "Écris ce que tu sais : angles donnés, angle droit, triangle isocèle ou équilatéral.",
        "Utilise la règle : la somme des trois angles fait $180$°.",
        "Isocèle : les angles à la base sont égaux. Rectangle : les deux autres font $90$° à eux deux."
      ],
      figure: "tg6-somme",
      exemple: "Isocèle en $A$ avec $\\widehat{A} = 40$° : $(180 - 40) \\div 2 = 70$° pour chaque angle à la base."
    },
    {
      titre: "Tracer le cercle circonscrit",
      etapes: [
        "Trace la médiatrice de deux côtés du triangle.",
        "Leur point d'intersection $O$ est le centre.",
        "Trace le cercle de centre $O$ qui passe par un sommet : il passe aussi par les deux autres."
      ],
      figure: "tg6-cours-circonscrit",
      exemple: "$OA = OB = OC$ : ce sont trois rayons."
    }
  ],
  erreurs: [
    "Construire un triangle sans vérifier que les longueurs le permettent.",
    "Se fier à la figure plutôt qu'au codage pour dire qu'un triangle est isocèle ou rectangle.",
    "Utiliser $360$° au lieu de $180$° pour la somme des angles d'un triangle.",
    "Oublier l'angle droit ($90$°) dans un triangle rectangle.",
    "Dans un triangle isocèle, prendre l'angle au sommet pour un angle à la base.",
    "Croire que le centre du cercle circonscrit est toujours à l'intérieur du triangle."
  ]
};
