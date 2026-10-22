/*
  CHAPITRE : 5e — Angles et parallélisme
  ---------------------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026 :
  « Angles » : vocabulaire (angles opposés par le sommet, adjacents, supplémentaires, aigus, obtus, bissectrice) ;
  caractériser le parallélisme par les angles alternes-internes et correspondants. « Triangles » : connaitre la
  somme des angles d'un triangle et savoir la démontrer ; calculer le troisième angle, cas des triangles
  particuliers. (Même regroupement que le chapitre « Angles » d'Yvan Monka.)
  figure : "an5-paralleles" ou "an5-secantes" (assets/exercices-cinquieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-angles"] = {
  niveau: "5e",
  numero: 5,
  titre: "Angles et parallélisme",
  accroche: "Angles opposés, alternes-internes, correspondants : reconnaître des droites parallèles, calculer des angles et démontrer que la somme des angles d'un triangle vaut 180°.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : angles (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Angles5e.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : triangles et angles (Yvan Monka)", url: "https://youtu.be/7XAffsX2cAA", type: "video" },
    { titre: "Reconnaître des angles correspondants (Yvan Monka)", url: "https://youtu.be/ErUq2wdA_PE", type: "video" },
    { titre: "Utiliser des angles correspondants (Yvan Monka)", url: "https://youtu.be/FJVt0P83iCQ", type: "video" },
    { titre: "Calculer un angle dans un triangle (Yvan Monka)", url: "https://youtu.be/x0UA6kbiDcM", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Angles opposés, adjacents, supplémentaires",
      texte:
        "- Un angle **aigu** mesure moins de $90^\\circ$, un angle **droit** $90^\\circ$, un angle **obtus** entre $90^\\circ$ et $180^\\circ$, un angle **plat** $180^\\circ$.\n" +
        "- Deux angles **adjacents** ont le même sommet et un côté commun, et sont de part et d'autre de ce côté.\n" +
        "- Deux angles **supplémentaires** ont une somme de $180^\\circ$ ; **complémentaires**, une somme de $90^\\circ$.\n" +
        "- Deux droites sécantes forment des angles **opposés par le sommet** : ils ont **la même mesure**.\n" +
        "- La **bissectrice** d'un angle le partage en deux angles de même mesure.",
      figure: "an5-secantes",
      exemple: {
        enonce: "Sur la figure, deux droites sont sécantes. Quelles sont les mesures des angles marqués « ? » ?",
        solution: "L'angle opposé par le sommet à l'angle de $55^\\circ$ mesure aussi $55^\\circ$.\n\nL'angle adjacent forme avec lui un angle plat : $180^\\circ - 55^\\circ = 125^\\circ$."
      }
    },
    {
      titre: "Angles alternes-internes et correspondants",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître des angles alternes-internes", youtube: "https://youtu.be/c8CuPY-KaNM" },
      texte:
        "Deux droites $(d)$ et $(d')$ sont coupées par une **sécante**. Elle forme huit angles, numérotés sur la figure.\n\n" +
        "- Les angles **alternes-internes** sont de part et d'autre de la sécante et **entre** les deux droites : $3$ et $5$, $4$ et $6$.\n" +
        "- Les angles **correspondants** sont du même côté de la sécante, à la **même place** : $1$ et $5$, $2$ et $6$, $3$ et $7$, $4$ et $8$.",
      figure: "an5-paralleles",
      exemple: {
        enonce: "Sur la figure, comment sont les angles $2$ et $6$ ? Et les angles $4$ et $6$ ?",
        solution: "$2$ et $6$ : même côté de la sécante, tous deux au-dessus de leur droite : ils sont correspondants.\n\n$4$ et $6$ : de part et d'autre de la sécante, entre les deux droites : ils sont alternes-internes."
      }
    },
    {
      titre: "Angles et droites parallèles",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les angles alternes-internes", youtube: "https://youtu.be/v7XmtQhOP9I" },
      texte:
        "**Propriété** : si deux droites **parallèles** sont coupées par une sécante, alors les angles alternes-internes ont la même mesure, et les angles correspondants aussi.\n\n" +
        "**Propriété réciproque** : si deux droites coupées par une sécante forment des angles alternes-internes (ou correspondants) **de même mesure**, alors elles sont **parallèles**.\n\n" +
        "Avec deux parallèles, il n'y a donc que deux mesures sur la figure : un angle aigu $a$ et son supplémentaire $180^\\circ - a$.",
      exemple: {
        enonce: "$(d)$ et $(d')$ sont parallèles et l'angle $1$ mesure $60^\\circ$. Combien mesurent les angles $5$ et $6$ ?",
        solution: "$1$ et $5$ sont correspondants : l'angle $5$ mesure $60^\\circ$.\n\n$5$ et $6$ sont adjacents supplémentaires : l'angle $6$ mesure $180^\\circ - 60^\\circ = 120^\\circ$."
      }
    },
    {
      titre: "La somme des angles d'un triangle",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la règle des 180° dans le triangle", youtube: "https://youtu.be/S1vCp-O7fbw" },
      texte:
        "**Propriété** : dans un triangle, la somme des mesures des trois angles vaut $180^\\circ$.\n\n" +
        "**Démonstration** : dans le triangle $ABC$, on trace la droite parallèle à $(BC)$ passant par $A$. Avec la sécante $(AB)$, l'angle $\\widehat{B}$ et l'angle formé en $A$ à gauche sont alternes-internes : ils sont égaux. De même avec $(AC)$ pour l'angle $\\widehat{C}$. En $A$, ces deux angles et $\\widehat{A}$ forment un angle plat : $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$.\n\n" +
        "Conséquences : dans un triangle **rectangle**, les deux angles aigus ont une somme de $90^\\circ$ ; dans un triangle **isocèle**, les angles à la base sont égaux ; dans un triangle **équilatéral**, chaque angle mesure $60^\\circ$.",
      exemple: {
        enonce: "$ABC$ est isocèle en $A$ avec $\\widehat{A} = 40^\\circ$. Calcule $\\widehat{B}$.",
        solution: "$\\widehat{B} + \\widehat{C} = 180^\\circ - 40^\\circ = 140^\\circ$, et $\\widehat{B} = \\widehat{C}$, donc $\\widehat{B} = 140^\\circ \\div 2 = 70^\\circ$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "an5-vocabulaire", titre: "Reconnaître et nommer des angles", etape: "Vocabulaire", nb: 6 },
    { type: "an5-calculer", titre: "Calculer un angle avec des parallèles", etape: "Angles et parallélisme", nb: 6 },
    { type: "an5-paralleles", titre: "Les droites sont-elles parallèles ?", etape: "Angles et parallélisme", nb: 5 },
    { type: "an5-triangles", titre: "Angles d'un triangle", etape: "Somme des angles d'un triangle", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Un angle de $135^\\circ$ est :", choix: ["obtus", "aigu", "droit", "plat"], bonne: 0, explication: "Entre $90^\\circ$ et $180^\\circ$." },
    { question: "Deux angles opposés par le sommet :", choix: ["ont la même mesure", "sont toujours droits", "sont supplémentaires", "sont complémentaires"], bonne: 0, explication: "C'est une propriété des droites sécantes." },
    { question: "Deux angles supplémentaires ont une somme de :", choix: ["$180^\\circ$", "$90^\\circ$", "$360^\\circ$", "$100^\\circ$"], bonne: 0, explication: "Ils forment un angle plat." },
    { question: "La bissectrice d'un angle de $84^\\circ$ forme deux angles de :", choix: ["$42^\\circ$", "$84^\\circ$", "$96^\\circ$", "$21^\\circ$"], bonne: 0, explication: "$84 \\div 2 = 42$." },
    { question: "Sur la figure, les angles $3$ et $5$ sont :", figure: "an5-paralleles", choix: ["alternes-internes", "correspondants", "opposés par le sommet", "adjacents"], bonne: 0, explication: "De part et d'autre de la sécante, entre les deux droites." },
    { question: "Sur la figure, les angles $4$ et $8$ sont :", figure: "an5-paralleles", choix: ["correspondants", "alternes-internes", "opposés par le sommet", "adjacents"], bonne: 0, explication: "Même côté de la sécante, à la même place." },
    { question: "Sur la figure, les angles $5$ et $7$ sont :", figure: "an5-paralleles", choix: ["opposés par le sommet", "correspondants", "alternes-internes", "complémentaires"], bonne: 0, explication: "Même sommet, côtés prolongés." },
    { question: "Si deux droites parallèles sont coupées par une sécante, deux angles correspondants :", choix: ["ont la même mesure", "sont supplémentaires", "sont complémentaires", "sont droits"], bonne: 0, explication: "C'est la propriété des angles correspondants." },
    { question: "Deux angles alternes-internes mesurent $52^\\circ$ et $57^\\circ$. Les droites :", choix: ["ne sont pas parallèles", "sont parallèles", "sont perpendiculaires", "on ne peut pas savoir"], bonne: 0, explication: "Les angles ne sont pas égaux." },
    { question: "$(d) \\parallel (d')$ et l'angle $1$ mesure $70^\\circ$. L'angle $6$ mesure :", figure: "an5-paralleles", choix: ["$110^\\circ$", "$70^\\circ$", "$20^\\circ$", "$140^\\circ$"], bonne: 0, explication: "$6$ est correspondant de $2$, supplémentaire de $1$." },
    { question: "Dans un triangle, $\\widehat{A} = 50^\\circ$ et $\\widehat{B} = 60^\\circ$. $\\widehat{C}$ mesure :", choix: ["$70^\\circ$", "$110^\\circ$", "$250^\\circ$", "$90^\\circ$"], bonne: 0, explication: "$180 - 110 = 70$." },
    { question: "Dans un triangle rectangle, un angle aigu mesure $35^\\circ$. L'autre mesure :", choix: ["$55^\\circ$", "$145^\\circ$", "$35^\\circ$", "$65^\\circ$"], bonne: 0, explication: "$90 - 35 = 55$." },
    { question: "Chaque angle d'un triangle équilatéral mesure :", choix: ["$60^\\circ$", "$90^\\circ$", "$45^\\circ$", "$180^\\circ$"], bonne: 0, explication: "$180 \\div 3 = 60$." },
    { question: "Un triangle isocèle a deux angles à la base de $50^\\circ$. Le troisième angle mesure :", choix: ["$80^\\circ$", "$50^\\circ$", "$130^\\circ$", "$100^\\circ$"], bonne: 0, explication: "$180 - 2 \\times 50 = 80$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Reconnaître deux angles",
      etapes: [
        "Même sommet ? Opposés par le sommet (côtés prolongés) ou adjacents (un côté commun).",
        "Sommets différents : de part et d'autre de la sécante et entre les droites → alternes-internes.",
        "Du même côté de la sécante et à la même place → correspondants."
      ],
      exemple: "Les angles $3$ et $5$ de la figure du cours sont alternes-internes."
    },
    {
      titre: "Calculer un angle avec des parallèles",
      etapes: [
        "Vérifie que l'énoncé dit que les droites sont parallèles.",
        "Alternes-internes ou correspondants : même mesure. Opposés par le sommet : même mesure.",
        "Adjacents formant un angle plat : $180^\\circ$ moins l'angle connu."
      ],
      exemple: "Angle connu $65^\\circ$, angle adjacent : $115^\\circ$."
    },
    {
      titre: "Démontrer que deux droites sont parallèles",
      etapes: [
        "Repère deux angles alternes-internes ou correspondants.",
        "Compare leurs mesures (données, pas lues sur le dessin).",
        "Égales : les droites sont parallèles. Différentes : elles ne le sont pas."
      ],
      exemple: "$47^\\circ$ et $47^\\circ$ alternes-internes : $(d) \\parallel (d')$."
    },
    {
      titre: "Calculer un angle dans un triangle",
      etapes: [
        "Additionne les angles connus.",
        "Retire la somme de $180^\\circ$.",
        "Isocèle : angles à la base égaux. Rectangle : angles aigus de somme $90^\\circ$."
      ],
      exemple: "$180 - (45 + 75) = 60^\\circ$."
    }
  ],
  erreurs: [
    "Utiliser l'égalité des angles alternes-internes alors que les droites ne sont pas parallèles.",
    "Confondre angles alternes-internes et correspondants.",
    "Se fier au dessin au lieu des mesures données.",
    "Prendre $360^\\circ$ comme somme des angles d'un triangle.",
    "Dans un triangle isocèle en $A$, croire que $\\widehat{A}$ est égal aux angles à la base."
  ]
};
