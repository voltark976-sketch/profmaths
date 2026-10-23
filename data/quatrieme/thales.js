/*
  CHAPITRE : 4e — Théorème de Thalès
  -----------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : connaitre et utiliser le théorème
  de Thalès dans la configuration des triangles emboîtés (points sur les côtés, ou sur leurs prolongements au-delà
  de la base) et sa réciproque ; lien avec l'agrandissement et la réduction. (La configuration « papillon » est
  vue en 3e.) Figures : "th4-figure", "th4-cours-…", "th4-qcm-…", "th4-meth…" (assets/exercices-quatrieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["quatrieme-thales"] = {
  niveau: "4e",
  numero: 8,
  titre: "Théorème de Thalès",
  accroche: "Une parallèle à un côté d'un triangle découpe un petit triangle dont les longueurs sont proportionnelles à celles du grand : calculer des longueurs et prouver un parallélisme.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : théorème de Thalès (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Thales4.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : le théorème de Thalès (Yvan Monka)", url: "https://youtu.be/JpU7X7AhB-A", type: "video" },
    { titre: "Appliquer la réciproque du théorème de Thalès (Yvan Monka)", url: "https://youtu.be/U9XX5w8FeOI", type: "video" },
    { titre: "Résoudre un problème avec le théorème de Thalès (Yvan Monka)", url: "https://youtu.be/hmJQNkpi0gI", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Le théorème de Thalès",
      video: { titre: "Vidéo d'Yvan Monka : calculer une longueur avec le théorème de Thalès", youtube: "https://youtu.be/zP16D2Zrv1A" },
      texte:
        "**Théorème** : dans un triangle $ABC$, si $M$ est un point de $[AB]$, $N$ un point de $[AC]$ et si les droites $(MN)$ et $(BC)$ sont **parallèles**, alors :\n\n" +
        "$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.\n\n" +
        "Le triangle $AMN$ est une **réduction** du triangle $ABC$ : ces rapports sont égaux au coefficient de réduction (les côtés du petit triangle en haut, ceux du grand en bas).",
      figure: "th4-figure",
      exemple: {
        enonce: "Sur la figure, $AM = 2$ cm, $MB = 3$ cm, $(MN) \\parallel (BC)$ et $BC = 7{,}5$ cm. Calcule $MN$.",
        solution: "$AB = 5$ cm. D'après le théorème de Thalès, $\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$, soit $\\dfrac{2}{5} = \\dfrac{MN}{7{,}5}$. Donc $MN = \\dfrac{2 \\times 7{,}5}{5} = 3$ cm."
      }
    },
    {
      titre: "Utiliser le théorème",
      video: { titre: "Vidéo d'Yvan Monka : calculer une longueur avec le théorème de Thalès (2)", youtube: "https://youtu.be/RnN4UtfUkI8" },
      texte:
        "Le théorème s'applique aussi quand les points $M$ et $N$ sont **au-delà** de $B$ et $C$ (sur les demi-droites $[AB)$ et $[AC)$) : les deux triangles $ABC$ et $AMN$ sont emboîtés, avec le sommet $A$ en commun et $(MN) \\parallel (BC)$. Les mêmes rapports sont égaux ; ici $AMN$ est un agrandissement de $ABC$.\n\n" +
        "1. On vérifie les hypothèses : points alignés, droites parallèles.\n" +
        "2. On écrit les trois rapports égaux.\n" +
        "3. On garde l'égalité de deux rapports qui contient la longueur cherchée et trois longueurs connues.\n" +
        "4. On termine par un produit en croix.\n\n" +
        "Attention : on utilise $AB$ (le côté entier) et non $MB$.",
      figure: "th4-cours-agrandi",
      exemple: {
        enonce: "Avec $AM = 3$, $AB = 9$ et $AC = 12$, calcule $AN$ (les droites sont parallèles).",
        solution: "$\\dfrac{3}{9} = \\dfrac{AN}{12}$ donc $AN = \\dfrac{3 \\times 12}{9} = 4$."
      }
    },
    {
      titre: "La réciproque",
      video: { titre: "Vidéo d'Yvan Monka : la réciproque du théorème de Thalès", youtube: "https://youtu.be/_6d-3GHwKRc" },
      texte:
        "**Réciproque** : dans un triangle $ABC$, si $M \\in [AB]$, $N \\in [AC]$ et $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$, alors les droites $(MN)$ et $(BC)$ sont **parallèles**.\n\n" +
        "Si les rapports ne sont pas égaux, les droites ne sont pas parallèles. On compare souvent les rapports avec les produits en croix. Sur la figure, $(MN)$ est en pointillés tant qu'on n'a pas prouvé le parallélisme.",
      figure: "th4-cours-reciproque",
      exemple: {
        enonce: "$AM = 4$, $AB = 10$, $AN = 6$, $AC = 15$. $(MN)$ et $(BC)$ sont-elles parallèles ?",
        solution: "$4 \\times 15 = 60$ et $10 \\times 6 = 60$ : les rapports sont égaux, les droites sont parallèles."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "th4-longueur", titre: "Calculer une longueur", etape: "Théorème de Thalès", nb: 6 },
    { type: "th4-coefficient", titre: "Coefficient de réduction", etape: "Théorème de Thalès", nb: 5 },
    { type: "th4-egalite", titre: "Égalité de Thalès et réciproque", etape: "Réciproque", nb: 6 },
    { type: "th4-problemes", titre: "Problèmes", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Pour appliquer le théorème de Thalès dans le triangle $ABC$ avec $M \\in [AB]$, $N \\in [AC]$, il faut savoir que :", choix: ["$(MN) \\parallel (BC)$", "$(MN) \\perp (BC)$", "$AM = AN$", "$ABC$ est rectangle"], bonne: 0, explication: "C'est l'hypothèse du théorème." },
    { question: "Avec $(MN) \\parallel (BC)$, l'égalité correcte est :", choix: ["$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$", "$\\dfrac{AM}{MB} = \\dfrac{AN}{NC} = \\dfrac{MN}{BC}$", "$\\dfrac{AB}{AM} = \\dfrac{AN}{AC}$", "$AM \\times AN = AB \\times AC$"], bonne: 0, explication: "Petit triangle sur grand triangle." },
    { question: "$AM = 2$, $AB = 6$, $BC = 9$, $(MN) \\parallel (BC)$. Alors $MN =$ :", choix: ["$3$", "$27$", "$6$", "$4{,}5$"], bonne: 0, explication: "$\\dfrac{2}{6} \\times 9 = 3$." },
    { question: "$AN = 5$, $AC = 8$, $AB = 12$, $(MN) \\parallel (BC)$. Alors $AM =$ :", choix: ["$7{,}5$", "$19{,}2$", "$9$", "$6$"], bonne: 0, explication: "$\\dfrac{5 \\times 12}{8}$." },
    { question: "Le coefficient de réduction de $ABC$ vers $AMN$ avec $AM = 3$ et $AB = 12$ est :", choix: ["$\\dfrac{1}{4}$", "$4$", "$\\dfrac{3}{4}$", "$9$"], bonne: 0, explication: "$\\dfrac{3}{12}$." },
    { question: "Si $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$ (points sur les côtés), alors :", choix: ["$(MN) \\parallel (BC)$", "$(MN) \\perp (BC)$", "$AM = AN$", "on ne peut rien dire"], bonne: 0, explication: "Réciproque du théorème de Thalès." },
    { question: "$AM = 3$, $AB = 5$, $AN = 4$, $AC = 7$. Les droites $(MN)$ et $(BC)$ :", choix: ["ne sont pas parallèles", "sont parallèles", "sont perpendiculaires", "on ne peut pas savoir"], bonne: 0, explication: "$3 \\times 7 = 21 \\neq 5 \\times 4 = 20$." },
    { question: "Dans l'égalité de Thalès, on utilise :", choix: ["la longueur $AB$ entière", "la longueur $MB$", "la hauteur du triangle", "l'aire du triangle"], bonne: 0, explication: "Côtés du petit triangle sur côtés du grand." },
    { question: "Un bâton de $1$ m a une ombre de $2$ m ; un arbre a une ombre de $8$ m. L'arbre mesure :", choix: ["$4$ m", "$16$ m", "$9$ m", "$2$ m"], bonne: 0, explication: "Rapport $\\dfrac{1}{2}$." },
    { question: "Si $\\dfrac{AM}{AB} = \\dfrac{2}{5}$ et $AC = 10$, alors $AN =$ :", choix: ["$4$", "$25$", "$5$", "$2$"], bonne: 0, explication: "$\\dfrac{2}{5} \\times 10$." },
    { question: "Le triangle $AMN$ est :", choix: ["une réduction du triangle $ABC$", "un agrandissement de $ABC$", "toujours isocèle", "toujours rectangle"], bonne: 0, explication: "Ses côtés sont proportionnels à ceux de $ABC$." },
    { question: "Sur la figure, $AM = 2$ et $MB = 3$. Le coefficient $\\dfrac{AM}{AB}$ vaut :", figure: "th4-figure", choix: ["$\\dfrac{2}{5}$", "$\\dfrac{2}{3}$", "$\\dfrac{3}{5}$", "$\\dfrac{3}{2}$"], bonne: 0, explication: "$AB = 2 + 3 = 5$." },
    { question: "Les rapports de Thalès sont égaux :", choix: ["au coefficient de réduction", "à $1$", "à l'aire", "au périmètre"], bonne: 0, explication: "Les longueurs sont multipliées par $k$." },
    { question: "Pour la réciproque, on compare souvent :", choix: ["les produits en croix", "les angles", "les aires", "les hauteurs"], bonne: 0, explication: "Deux fractions sont égales si les produits en croix le sont." },
    { question: "Sur la figure, $(MN) \\parallel (BC)$. La longueur $MN$ vaut :", figure: "th4-qcm-longueurs", choix: ["$3$", "$27$", "$4{,}5$", "$5$"], bonne: 0, explication: "$\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$, soit $\\dfrac{2}{6} = \\dfrac{MN}{9}$, donc $MN = \\dfrac{2 \\times 9}{6} = 3$." },
    { question: "Sur la figure, $B \\in [AM]$, $C \\in [AN]$ et $(BC) \\parallel (MN)$. Le triangle $AMN$ est :", figure: "th4-cours-agrandi", choix: ["un agrandissement du triangle $ABC$", "une réduction du triangle $ABC$", "un triangle quelconque", "égal au triangle $ABC$"], bonne: 0, explication: "Les points $M$ et $N$ sont au-delà de $B$ et $C$ : les côtés de $AMN$ sont proportionnels à ceux de $ABC$, en plus grand." },
    { question: "Sur la figure, $AM = 4$, $AB = 10$, $AN = 6$ et $AC = 15$. Les droites $(MN)$ et $(BC)$ sont :", figure: "th4-cours-reciproque", choix: ["parallèles", "sécantes", "perpendiculaires", "on ne peut pas savoir"], bonne: 0, explication: "$4 \\times 15 = 60 = 10 \\times 6$ : les rapports $\\dfrac{AM}{AB}$ et $\\dfrac{AN}{AC}$ sont égaux, donc, d'après la réciproque, les droites sont parallèles." },
    { question: "Un bâton de $1{,}5$ m a une ombre de $2$ m, et l'ombre d'un poteau mesure $8$ m (figure). Le poteau mesure :", figure: "th4-meth-ombre", choix: ["$6$ m", "$10{,}7$ m", "$9{,}5$ m", "$4$ m"], bonne: 0, explication: "$\\dfrac{h}{1{,}5} = \\dfrac{8}{2}$, donc $h = 1{,}5 \\times 4 = 6$ m." },
    { question: "$(MN) \\parallel (BC)$ avec un coefficient de réduction de $0{,}4$. Si $BC = 12$ cm, alors $MN =$ :", choix: ["$4{,}8$ cm", "$30$ cm", "$11{,}6$ cm", "$12{,}4$ cm"], bonne: 0, explication: "$MN = 0{,}4 \\times 12 = 4{,}8$ cm." },
    { question: "Dans un triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$, $AM = 3$, $MB = 6$, $AN = 2$, $NC = 4$. Les droites $(MN)$ et $(BC)$ :", choix: ["sont parallèles", "ne sont pas parallèles", "sont perpendiculaires", "se coupent en $A$"], bonne: 0, explication: "$AB = 9$ et $AC = 6$ : $\\dfrac{3}{9} = \\dfrac{1}{3}$ et $\\dfrac{2}{6} = \\dfrac{1}{3}$. Les rapports sont égaux : d'après la réciproque, les droites sont parallèles." },
    { question: "$(MN) \\parallel (BC)$, $AM = 5$ et $AB = 4$ ($B$ est entre $A$ et $M$). Le coefficient d'agrandissement de $ABC$ vers $AMN$ est :", choix: ["$\\dfrac{5}{4}$", "$\\dfrac{4}{5}$", "$1$", "$9$"], bonne: 0, explication: "Les longueurs de $AMN$ sont celles de $ABC$ multipliées par $\\dfrac{AM}{AB} = \\dfrac{5}{4}$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer une longueur avec Thalès",
      etapes: [
        "Vérifie : points alignés (sommet commun) et droites parallèles.",
        "Écris $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.",
        "Garde deux rapports, remplace et fais un produit en croix."
      ],
      figure: "th4-meth",
      exemple: "$\\dfrac{4}{10} = \\dfrac{MN}{6}$ : $MN = \\dfrac{4 \\times 6}{10} = 2{,}4$."
    },
    {
      titre: "Démontrer que deux droites sont parallèles",
      etapes: [
        "Calcule $\\dfrac{AM}{AB}$ et $\\dfrac{AN}{AC}$ séparément (ou les produits en croix).",
        "Égaux : les droites sont parallèles (réciproque).",
        "Différents : elles ne le sont pas."
      ],
      figure: "th4-cours-reciproque",
      exemple: "$\\dfrac{4}{10} = \\dfrac{6}{15}$ : $(MN) \\parallel (BC)$."
    },
    {
      titre: "Mesurer une hauteur inaccessible",
      etapes: [
        "Place un bâton vertical pour que les extrémités des deux ombres coïncident.",
        "Les objets verticaux sont parallèles : c'est une configuration de Thalès.",
        "Écris $\\dfrac{h}{\\text{bâton}} = \\dfrac{\\text{ombre de l'objet}}{\\text{ombre du bâton}}$, puis fais un produit en croix."
      ],
      figure: "th4-meth-ombre",
      exemple: "$\\dfrac{h}{1{,}5} = \\dfrac{8}{2}$ : $h = 6$ m."
    }
  ],
  erreurs: [
    "Utiliser $MB$ au lieu de $AB$ dans les rapports.",
    "Mélanger petit et grand triangle dans un même rapport.",
    "Appliquer le théorème sans droites parallèles.",
    "Conclure au parallélisme sans comparer les deux rapports.",
    "Croire qu'une figure qui « a l'air » parallèle suffit à prouver le parallélisme.",
    "Arrondir les rapports avant de comparer."
  ]
};
