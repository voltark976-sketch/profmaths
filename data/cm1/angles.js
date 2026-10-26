/*
  CHAPITRE : CM1 — Les angles
  ----------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : notion d'angle (sommet, côtés) ; nommer un angle ; comparer
  des angles par superposition ou avec un gabarit, indépendamment de la longueur des côtés ; angle droit (équerre),
  angle aigu, angle obtus ; droites perpendiculaires. Pas de rapporteur au CM1.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-angles"] = {
  niveau: "CM1",
  numero: 12,
  titre: "Les angles",
  accroche: "Un angle, c'est un écartement : on le compare avec un gabarit ou une équerre.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Qu'est-ce qu'un angle ?",
      video: { titre: "Vidéo d'Yvan Monka : comparer les angles à l'aide d'un gabarit", youtube: "https://youtu.be/hIxRxxW3EJU" },
      texte:
        "Un **angle** est formé de deux demi-droites (ses **côtés**) qui partent d'un même point (son **sommet**).\n\n" +
        "On le nomme avec trois lettres et un chapeau, la lettre du **sommet au milieu** : ici $\\widehat{ABC}$ (ou $\\widehat{CBA}$).\n\n" +
        "La taille d'un angle, c'est son **écartement** : elle ne dépend pas de la longueur des traits. Pour comparer deux angles, on décalque l'un (un **gabarit**) et on le pose sur l'autre, sommet sur sommet, côté sur côté.",
      figure: "m1g-cours-angle",
      exemple: { enonce: "Le sommet est le point S, les côtés passent par R et T. Comment nommer l'angle ?", solution: "$\\widehat{RST}$ ou $\\widehat{TSR}$." }
    },
    {
      titre: "Aigu, droit, obtus",
      video: { titre: "Vidéo de Maître Lucas : droites perpendiculaires et parallèles", youtube: "https://youtu.be/lPjwG4NPHOY" },
      texte:
        "On compare avec l'angle droit de l'**équerre** :\n\n" +
        "- un angle **aigu** est plus petit qu'un angle droit ;\n" +
        "- un angle **droit** est codé par un petit carré ;\n" +
        "- un angle **obtus** est plus grand qu'un angle droit (mais plus petit qu'un demi-tour).\n\n" +
        "Deux droites qui se coupent en formant un angle droit sont **perpendiculaires**. Deux droites qui ne se coupent jamais sont **parallèles**.",
      figure: "m1g-cours-types",
      exemple: { enonce: "Les aiguilles d'une horloge à $3$ h forment quel angle ?", solution: "Un angle droit." }
    }
  ],
  exercices: [
    { type: "m1g-angles", titre: "Nommer, classer, comparer", etape: "Les angles", nb: 6 },
    { type: "m1g-relations", titre: "Droites perpendiculaires ou parallèles", etape: "Angle droit", nb: 5 },
    { type: "m1g-figures", titre: "Angles et figures", etape: "Angle droit", nb: 5 }
  ],
  qcm: [
    { question: "Le point d'où partent les deux côtés d'un angle s'appelle :", choix: ["le sommet", "le centre", "le milieu", "l'arête"], bonne: 0, explication: "C'est le sommet de l'angle." },
    { question: "Dans $\\widehat{ABC}$, le sommet est :", choix: ["B", "A", "C", "on ne sait pas"], bonne: 0, explication: "La lettre du milieu." },
    { question: "Si on allonge les côtés d'un angle, l'angle :", choix: ["ne change pas", "devient plus grand", "devient plus petit", "devient droit"], bonne: 0, explication: "Seul l'écartement compte." },
    { question: "Un angle plus petit qu'un angle droit est :", choix: ["aigu", "obtus", "plat", "droit"], bonne: 0, explication: "Aigu comme une pointe." },
    { question: "Un angle plus grand qu'un angle droit (mais moins qu'un demi-tour) est :", choix: ["obtus", "aigu", "droit", "nul"], bonne: 0, explication: "Il est très ouvert." },
    { question: "Pour vérifier un angle droit, on utilise :", choix: ["l'équerre", "le compas", "la balance", "le thermomètre"], bonne: 0, explication: "L'équerre a un angle droit." },
    { question: "Le petit carré dans un angle signifie :", choix: ["angle droit", "angle aigu", "côtés égaux", "milieu"], bonne: 0, explication: "C'est le codage de l'angle droit." },
    { question: "Pour comparer deux angles sans rapporteur, on peut :", choix: ["utiliser un gabarit (calque)", "mesurer les côtés à la règle", "compter les lettres", "regarder la couleur"], bonne: 0, explication: "On superpose les angles." },
    { question: "Deux droites qui se coupent en formant un angle droit sont :", choix: ["perpendiculaires", "parallèles", "confondues", "courbes"], bonne: 0, explication: "Perpendiculaires." },
    { question: "Deux droites qui ne se coupent jamais sont :", choix: ["parallèles", "perpendiculaires", "sécantes", "obtuses"], bonne: 0, explication: "Même prolongées." },
    { question: "À $3$ h, les aiguilles d'une horloge forment :", choix: ["un angle droit", "un angle aigu", "un angle obtus", "un demi-tour"], bonne: 0, explication: "Un quart de tour." },
    { question: "À $1$ h, les aiguilles d'une horloge forment :", choix: ["un angle aigu", "un angle droit", "un angle obtus", "un demi-tour"], bonne: 0, explication: "Plus petit qu'un quart de tour." },
    { question: "À $5$ h, les aiguilles d'une horloge forment :", choix: ["un angle obtus", "un angle aigu", "un angle droit", "aucun angle"], bonne: 0, explication: "Plus qu'un quart de tour, moins qu'un demi-tour." },
    { question: "Combien d'angles droits a un rectangle ?", choix: ["$4$", "$2$", "$1$", "$0$"], bonne: 0, explication: "Tous ses angles sont droits." },
    { question: "Un triangle rectangle a :", choix: ["un angle droit", "deux angles droits", "trois angles droits", "aucun angle"], bonne: 0, explication: "C'est sa définition." },
    { question: "$\\widehat{RST}$ et $\\widehat{TSR}$ désignent :", choix: ["le même angle", "deux angles différents", "deux droites", "un triangle"], bonne: 0, explication: "Le sommet S est au milieu dans les deux cas." },
    { question: "Le coin d'une feuille de papier forme :", choix: ["un angle droit", "un angle aigu", "un angle obtus", "un angle plat"], bonne: 0, explication: "Comme l'équerre." },
    { question: "Un angle obtus est :", choix: ["plus grand qu'un angle droit", "plus petit qu'un angle droit", "égal à un angle droit", "toujours un demi-tour"], bonne: 0, explication: "Obtus : très ouvert." }
  ],
  methode: [
    { titre: "Comparer deux angles avec un gabarit", etapes: ["Décalque le premier angle sur un papier calque (ou découpe un gabarit).", "Pose le sommet du gabarit sur le sommet du deuxième angle, un côté sur un côté.", "Regarde l'autre côté : s'il est à l'intérieur, le deuxième angle est plus grand."], figure: "m1g-cours-types", exemple: "Un angle obtus « dépasse » le gabarit d'un angle droit." }
  ],
  erreurs: ["Croire qu'un angle aux côtés plus longs est plus grand.", "Mettre la lettre du sommet au début du nom.", "Confondre aigu et obtus.", "Vérifier un angle droit « à l'œil » sans équerre."]
};
