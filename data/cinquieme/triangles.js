/*
  CHAPITRE : 5e — Triangles
  --------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026, partie
  « Triangles » : construire des triangles à partir de données partielles ; connaitre les propriétés des médiatrices
  et du cercle circonscrit dans le cas de triangles particuliers ; définir et tracer les hauteurs (concourantes) ;
  définir et tracer les médianes ; démontrer qu'une médiane partage un triangle en deux triangles d'aires égales.
  La somme des angles est traitée au chapitre « Angles et parallélisme », l'aire du triangle au chapitre « Aires »
  (comme dans la progression d'Yvan Monka).
  figure : "tr5-mediatrice", "tr5-hauteur", "tr5-mediane" ou "tr5-circonscrit" (assets/exercices-cinquieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-triangles"] = {
  niveau: "5e",
  numero: 2,
  titre: "Triangles",
  accroche: "Savoir quand un triangle est constructible, puis tracer ses droites remarquables : médiatrices, hauteurs et médianes.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : triangles (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Triangles1.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : triangles et angles (Yvan Monka)", url: "https://youtu.be/7XAffsX2cAA", type: "video" },
    { titre: "Construire un triangle connaissant ses trois côtés (Yvan Monka)", url: "https://youtu.be/-7UGauYeTdk", type: "video" },
    { titre: "Construire un triangle avec un côté et deux angles (Yvan Monka)", url: "https://youtu.be/tX-vhEtJJzY", type: "video" },
    { titre: "Exercice : rédiger un programme de construction (Yvan Monka)", url: "https://youtu.be/zT3CJ5RUhtw", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Construire un triangle",
      video: { titre: "Vidéo d'Yvan Monka : construire un triangle (deux côtés et un angle)", youtube: "https://youtu.be/6mFBqacFzws" },
      texte:
        "On peut construire un triangle dans trois cas :\n\n" +
        "- **trois côtés** : on trace un côté, puis deux arcs de cercle au compas ;\n" +
        "- **deux côtés et l'angle compris entre eux** : on trace un côté, l'angle au rapporteur, puis on reporte le second côté ;\n" +
        "- **un côté et les deux angles qui l'encadrent** : on trace le côté, puis un angle à chaque extrémité.\n\n" +
        "Ce n'est pas toujours possible. Avec trois longueurs, la plus grande doit être **plus petite que la somme des deux autres** (si elle est égale, les trois points sont alignés). Avec deux angles, leur somme doit être **plus petite que $180^\\circ$**.",
      exemple: {
        enonce: "Peut-on construire un triangle $ABC$ avec $AB = 4$ cm, $BC = 6$ cm et $AC = 11$ cm ? Et avec $AB = 5$ cm, $\\widehat{CAB} = 60^\\circ$ et $\\widehat{ABC} = 70^\\circ$ ?",
        solution: "$4 + 6 = 10$ et $11 > 10$ : la plus grande longueur dépasse la somme des deux autres, c'est impossible.\n\n$60^\\circ + 70^\\circ = 130^\\circ < 180^\\circ$ : ce triangle est constructible (son troisième angle mesure $50^\\circ$)."
      }
    },
    {
      titre: "Médiatrices et cercle circonscrit",
      video: { titre: "Vidéo d'Yvan Monka : tracer un cercle circonscrit", youtube: "https://youtu.be/0h9bZZoQfJM" },
      texte:
        "La **médiatrice** d'un segment est la droite perpendiculaire à ce segment en son milieu.\n\n" +
        "**Propriété** : un point est sur la médiatrice de $[AB]$ si et seulement s'il est à égale distance de $A$ et de $B$.\n\n" +
        "Les trois médiatrices d'un triangle se coupent en un même point $O$, à égale distance des trois sommets : c'est le **centre du cercle circonscrit**, le cercle qui passe par les trois sommets.\n\n" +
        "Cas particulier : dans un triangle **rectangle**, le centre du cercle circonscrit est le **milieu de l'hypoténuse**.",
      figure: "tr5-circonscrit",
      exemple: {
        enonce: "$ABC$ est rectangle en $A$ et $BC = 9$ cm. Où est le centre de son cercle circonscrit ? Quel est son rayon ?",
        solution: "Le centre est le milieu de l'hypoténuse $[BC]$ ; $[BC]$ est un diamètre, donc le rayon mesure $9 \\div 2 = 4{,}5$ cm."
      }
    },
    {
      titre: "Les hauteurs",
      video: { titre: "Vidéo d'Yvan Monka : construire une médiatrice ou une hauteur", youtube: "https://youtu.be/NYKW2MHECnQ" },
      texte:
        "Dans un triangle, une **hauteur** est une droite qui passe par un sommet et qui est **perpendiculaire au côté opposé**.\n\n" +
        "Sur la figure, la droite passe par $A$ et coupe $(BC)$ en $K$ avec un angle droit : c'est la hauteur issue de $A$. La longueur $AK$ est la distance du point $A$ à la droite $(BC)$.\n\n" +
        "Un triangle a trois hauteurs, et elles sont **concourantes** (elles se coupent en un même point). Dans un triangle rectangle en $A$, elles se coupent en $A$.",
      figure: "tr5-hauteur",
      exemple: {
        enonce: "On trace la hauteur issue de $A$ dans un triangle $ABC$. Quelle est la différence avec la médiatrice de $[BC]$ ?",
        solution: "Les deux droites sont perpendiculaires à $(BC)$. Mais la hauteur passe par le sommet $A$, alors que la médiatrice passe par le milieu de $[BC]$. Elles ne sont confondues que si le triangle est isocèle en $A$."
      }
    },
    {
      titre: "Les médianes",
      video: { titre: "Vidéo d'Yvan Monka : tracer les médianes d'un triangle", youtube: "https://youtu.be/jN3544Sofx8" },
      texte:
        "Dans un triangle, une **médiane** est une droite qui passe par un sommet et par le **milieu du côté opposé**.\n\n" +
        "**Propriété** : une médiane partage un triangle en deux triangles de **même aire**.\n\n" +
        "Pourquoi ? Si $K$ est le milieu de $[BC]$, les triangles $ABK$ et $AKC$ ont des bases de même longueur ($BK = KC$) et la même hauteur issue de $A$. Leurs aires sont donc égales.",
      figure: "tr5-mediane",
      exemple: {
        enonce: "Le triangle $ABC$ a une aire de $18$ cm² et $K$ est le milieu de $[BC]$. Quelle est l'aire du triangle $ABK$ ?",
        solution: "$[AK]$ est une médiane : elle partage $ABC$ en deux triangles de même aire. Aire de $ABK$ : $18 \\div 2 = 9$ cm²."
      }
    },
    {
      titre: "Triangles particuliers",
      texte:
        "Dans un triangle **isocèle** en $A$, le sommet $A$ est à égale distance de $B$ et de $C$ : il est sur la médiatrice de $[BC]$. Cette droite est donc à la fois la **médiatrice** de $[BC]$, la **hauteur** et la **médiane** issues de $A$.\n\n" +
        "Dans un triangle **équilatéral**, c'est vrai pour les trois sommets : chaque médiatrice est aussi une hauteur et une médiane.",
      figure: "tr5-mediatrice",
      exemple: {
        enonce: "Sur la figure, la médiatrice de $[BC]$ ne passe pas par $A$. Que peut-on en déduire ?",
        solution: "$A$ n'est pas à égale distance de $B$ et de $C$ : $AB \\neq AC$, le triangle n'est pas isocèle en $A$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "tr5-constructible", titre: "Le triangle est-il constructible ?", etape: "Construire un triangle", nb: 6 },
    { type: "tr5-droites", titre: "Médiatrice, hauteur ou médiane ?", etape: "Droites remarquables", nb: 6 },
    { type: "tr5-proprietes", titre: "Utiliser les propriétés", etape: "Droites remarquables", nb: 5 },
    { type: "tr5-mediatrice", titre: "Médiatrice et cercle circonscrit", etape: "Calculer avec les propriétés", nb: 5 },
    { type: "tr5-mediane", titre: "Médianes et aires", etape: "Calculer avec les propriétés", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Peut-on construire un triangle de côtés $3$ cm, $4$ cm et $8$ cm ?", choix: ["Non, car $3 + 4 < 8$", "Oui, toujours", "Oui, car $3 + 4 + 8 = 15$", "Non, car $8$ est pair"], bonne: 0, explication: "La plus grande longueur doit être plus petite que la somme des deux autres." },
    { question: "Avec $AB = 6$ cm, $\\widehat{A} = 100^\\circ$ et $\\widehat{B} = 90^\\circ$ :", choix: ["le triangle n'existe pas", "le triangle est rectangle", "le triangle est isocèle", "il y a deux triangles possibles"], bonne: 0, explication: "$100^\\circ + 90^\\circ = 190^\\circ$, plus que $180^\\circ$." },
    { question: "La médiatrice d'un segment est :", choix: ["perpendiculaire au segment en son milieu", "parallèle au segment", "perpendiculaire au segment en une extrémité", "la moitié du segment"], bonne: 0, explication: "Définition de la médiatrice." },
    { question: "$M$ est sur la médiatrice de $[AB]$ et $MA = 5$ cm. Alors :", choix: ["$MB = 5$ cm", "$MB = 2{,}5$ cm", "$AB = 5$ cm", "$MB = 10$ cm"], bonne: 0, explication: "Les points de la médiatrice sont à égale distance de $A$ et de $B$." },
    { question: "Le centre du cercle circonscrit à un triangle est le point de concours :", choix: ["des médiatrices", "des hauteurs", "des médianes", "des côtés"], bonne: 0, explication: "Il est à égale distance des trois sommets." },
    { question: "Dans un triangle rectangle, le centre du cercle circonscrit est :", choix: ["le milieu de l'hypoténuse", "le sommet de l'angle droit", "à l'extérieur du triangle", "le milieu du plus petit côté"], bonne: 0, explication: "L'hypoténuse est un diamètre du cercle." },
    { question: "La droite tracée est :", figure: "tr5-hauteur", choix: ["la hauteur issue de $A$", "la médiane issue de $A$", "la médiatrice de $[BC]$", "la hauteur issue de $B$"], bonne: 0, explication: "Elle passe par $A$ et est perpendiculaire à $(BC)$." },
    { question: "La droite tracée est :", figure: "tr5-mediane", choix: ["la médiane issue de $A$", "la hauteur issue de $A$", "la médiatrice de $[BC]$", "la médiane issue de $C$"], bonne: 0, explication: "Elle passe par $A$ et par le milieu de $[BC]$." },
    { question: "La droite tracée est :", figure: "tr5-mediatrice", choix: ["la médiatrice de $[BC]$", "la hauteur issue de $A$", "la médiane issue de $A$", "la médiatrice de $[AB]$"], bonne: 0, explication: "Elle est perpendiculaire à $[BC]$ en son milieu." },
    { question: "Les trois hauteurs d'un triangle :", choix: ["sont concourantes", "sont parallèles", "passent toutes par le milieu d'un côté", "ont toujours la même longueur"], bonne: 0, explication: "Elles se coupent en un même point." },
    { question: "Une médiane partage un triangle en deux triangles :", choix: ["de même aire", "de même périmètre", "rectangles", "isocèles"], bonne: 0, explication: "Même hauteur et bases de même longueur." },
    { question: "Le triangle $ABC$ a une aire de $30$ cm², $I$ est le milieu de $[BC]$. L'aire de $ABI$ est :", choix: ["$15$ cm²", "$30$ cm²", "$60$ cm²", "$10$ cm²"], bonne: 0, explication: "$[AI]$ est une médiane : $30 \\div 2 = 15$." },
    { question: "$ABC$ est isocèle en $A$. La hauteur issue de $A$ est aussi :", choix: ["la médiatrice de $[BC]$ et la médiane issue de $A$", "la médiatrice de $[AB]$", "la médiane issue de $B$", "parallèle à $(BC)$"], bonne: 0, explication: "Dans un triangle isocèle en $A$, ces trois droites sont confondues." },
    { question: "$ABC$ est rectangle en $A$ avec $BC = 12$ cm. Le rayon du cercle circonscrit mesure :", choix: ["$6$ cm", "$12$ cm", "$24$ cm", "$3$ cm"], bonne: 0, explication: "L'hypoténuse est un diamètre : $12 \\div 2 = 6$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Savoir si un triangle est constructible",
      etapes: [
        "Trois longueurs : compare la plus grande à la somme des deux autres (plus petite : oui ; égale : points alignés ; plus grande : non).",
        "Deux côtés et l'angle compris : toujours constructible.",
        "Un côté et deux angles : la somme des deux angles doit être plus petite que $180^\\circ$."
      ],
      exemple: "$5$ ; $7$ ; $10$ cm : $5 + 7 = 12 > 10$, constructible."
    },
    {
      titre: "Reconnaître une droite remarquable",
      etapes: [
        "Passe-t-elle par un sommet ? Par le milieu d'un côté (codage) ?",
        "Est-elle perpendiculaire à un côté (angle droit) ?",
        "Médiatrice : milieu + angle droit. Hauteur : sommet + angle droit. Médiane : sommet + milieu."
      ],
      exemple: "Une droite qui passe par $A$ et par le milieu de $[BC]$ est la médiane issue de $A$."
    },
    {
      titre: "Utiliser la médiatrice et le cercle circonscrit",
      etapes: [
        "Un point de la médiatrice de $[AB]$ est à égale distance de $A$ et de $B$.",
        "Le centre $O$ du cercle circonscrit est sur les trois médiatrices : $OA = OB = OC$.",
        "Triangle rectangle : le centre est le milieu de l'hypoténuse, qui est un diamètre."
      ],
      exemple: "Hypoténuse de $10$ cm : rayon de $5$ cm."
    },
    {
      titre: "Utiliser une médiane",
      etapes: [
        "Repère le sommet et le milieu du côté opposé.",
        "La médiane partage le triangle en deux triangles de même aire.",
        "Chaque petit triangle a donc la moitié de l'aire du grand."
      ],
      exemple: "Aire de $ABC$ : $24$ cm² ; aire de $ABI$ ($I$ milieu de $[BC]$) : $12$ cm²."
    }
  ],
  erreurs: [
    "Confondre la hauteur issue de $A$ (elle passe par $A$) et la médiatrice de $[BC]$ (elle passe par le milieu de $[BC]$).",
    "Confondre médiane (milieu du côté opposé) et hauteur (angle droit avec le côté opposé).",
    "Croire que la médiatrice d'un côté passe toujours par le sommet opposé.",
    "Oublier le cas d'égalité : si la plus grande longueur est égale à la somme des deux autres, les points sont alignés.",
    "Prendre l'hypoténuse pour le rayon du cercle circonscrit : c'est un diamètre."
  ]
};
