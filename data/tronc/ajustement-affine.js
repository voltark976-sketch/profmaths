/*
  CHAPITRE : Première tronc commun — Deux caractères quantitatifs : nuage de points et ajustement affine
  -----------------------------------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme de mathématiques intégré à l'enseignement scientifique de Première générale (BO n° 14 du 2 avril 2026),
  « Analyse de l'information chiffrée », analyse statistique de deux caractères quantitatifs : nuage de points, ajustement
  affine, point moyen, interpolation, extrapolation (ajustements au jugé, de Mayer, moindres carrés, sans connaissance
  théorique) ; utiliser un tableur. Contenu repris en grande partie de la Première technologique.
  video : vidéos d'Yvan Monka. Générateurs : préfixe qn- dans assets/exercices-tronc.js ; figures "qn-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["tronc-ajustement-affine"] = {
  niveau: "Première tronc commun",
  numero: 6,
  titre: "Deux caractères quantitatifs : nuage de points et ajustement affine",
  accroche: "Température et niveau des océans, âge et taille, publicité et ventes : quand deux grandeurs évoluent ensemble, on place un **nuage de points**, on cherche une **droite** qui le résume, et on s'en sert pour estimer… avec prudence.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : statistiques à deux variables (PDF)", url: "https://www.maths-et-tiques.fr/telech/19StatTM.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Nuage de points et point moyen",
      figure: "qn-cours-nuage",
      video: { titre: "Vidéo d'Yvan Monka : représenter un nuage de points et déterminer le point moyen", youtube: "https://youtu.be/Nn6uckb3RvE" },
      texte:
        "Une **série statistique à deux variables** associe à chaque individu deux nombres $x_i$ et $y_i$ (âge et taille, tension et intensité, publicité et ventes…). On la représente par le **nuage de points** $M_i(x_i\\,;y_i)$ dans un repère (on ne relie pas les points).\n\n" +
        "Le **point moyen** du nuage est $G(\\bar{x}\\,;\\bar{y})$, où $\\bar{x}$ est la moyenne des $x_i$ et $\\bar{y}$ celle des $y_i$.\n\n" +
        "Avec un **tableur** : on saisit les $x_i$ dans une colonne, les $y_i$ dans la suivante, on sélectionne les deux colonnes et on insère un graphique « nuage de points » ; la fonction $\\texttt{MOYENNE}$ donne $\\bar{x}$ et $\\bar{y}$. Les données réelles (Insee, data.gouv, rapports du Giec) se traitent ainsi.\n\n" +
        "Exemple : nombre de touristes (en milliers) les années de rang $1$ à $6$ : $32$, $36$, $37$, $42$, $44$, $49$. $\\bar{x} = \\dfrac{1 + 2 + \\dots + 6}{6} = 3{,}5$ et $\\bar{y} = \\dfrac{240}{6} = 40$ : $G(3{,}5\\,;40)$.",
      exemple: {
        enonce: "Calcule le point moyen du nuage $(2\\,;5)$, $(4\\,;9)$, $(6\\,;10)$, $(8\\,;16)$.",
        solution: "$\\bar{x} = \\dfrac{20}{4} = 5$ et $\\bar{y} = \\dfrac{40}{4} = 10$ : $G(5\\,;10)$."
      }
    },
    {
      titre: "Ajustement affine",
      video: { titre: "Vidéo d'Yvan Monka : déterminer et tracer la droite d'ajustement", youtube: "https://youtu.be/vdEL0MOKAIg" },
      texte:
        "Quand les points du nuage sont **à peu près alignés**, on peut le remplacer par une droite $y = ax + b$ : c'est un **ajustement affine**. Plusieurs méthodes donnent des droites voisines :\n\n" +
        "- **au jugé** : on trace à la règle une droite qui passe au milieu du nuage, de préférence par $G$ ;\n" +
        "- **droite de Mayer** : on coupe le nuage en deux groupes, on calcule leurs points moyens $G_1$ et $G_2$, et on trace $(G_1G_2)$ ;\n" +
        "- **moindres carrés** : la calculatrice ou le tableur donnent la droite qui rend la plus petite possible la somme des carrés des écarts verticaux (section suivante).\n\n" +
        "Toutes ces droites passent par le point moyen $G$ (ou très près). Si le nuage n'a pas une forme rectiligne, un ajustement affine **n'est pas pertinent**.",
      exemple: {
        enonce: "Une droite d'ajustement a pour coefficient directeur $2$ et passe par $G(5\\,;10)$. Quelle est son équation ?",
        solution: "$y = 2x + p$ avec $10 = 2 \\times 5 + p$, donc $p = 0$ : $y = 2x$."
      }
    },
    {
      titre: "La méthode des moindres carrés",
      figure: "qn-cours-ecarts",
      video: { titre: "Vidéo d'Yvan Monka : déterminer et tracer la droite d'ajustement (moindres carrés)", youtube: "https://youtu.be/vdEL0MOKAIg" },
      texte:
        "Pour une droite $y = ax + b$, l'**écart vertical** du point $M_i$ est $y_i - (ax_i + b)$ (pointillés sur la figure). La **droite des moindres carrés** est celle qui rend minimale la somme\n\n" +
        "$\\sum (y_i - (ax_i + b))^2$\n\n" +
        "On élève au carré pour que les écarts positifs et négatifs ne se compensent pas, et pour pénaliser les grands écarts. On ne calcule pas $a$ et $b$ à la main : la calculatrice (mode statistiques, « régression linéaire ») ou le tableur (fonctions $\\texttt{PENTE}$ et $\\texttt{ORDONNEE.ORIGINE}$) les donnent. Aucune connaissance théorique n'est attendue.\n\n" +
        "Pour comparer deux droites, on calcule la somme des carrés des écarts de chacune : la plus petite somme désigne le meilleur ajustement.",
      exemple: {
        enonce: "Points $(1\\,;5)$ et $(2\\,;6)$, droite $y = 2x + 2$. Somme des carrés des écarts ?",
        solution: "Écarts : $5 - 4 = 1$ et $6 - 6 = 0$. Somme : $1^2 + 0^2 = 1$."
      }
    },
    {
      titre: "Interpoler, extrapoler",
      video: { titre: "Vidéo d'Yvan Monka : ajustement par les points moyens, interpolation et extrapolation", youtube: "https://youtu.be/ESHY4QPgriw" },
      texte:
        "Avec l'équation $y = ax + b$ de la droite d'ajustement, on **estime** des valeurs inconnues :\n\n" +
        "- **interpolation** : pour un $x$ situé dans la plage des données (entre la plus petite et la plus grande valeur observée) ;\n" +
        "- **extrapolation** : pour un $x$ en dehors, souvent dans le futur (« combien de touristes en année $10$ ? »).\n\n" +
        "On peut aussi chercher le $x$ qui donne un $y$ voulu, en résolvant $ax + b = y$ : c'est le principe de la **droite d'étalonnage** en chimie (on mesure l'absorbance, on en déduit la concentration).\n\n" +
        "Une extrapolation suppose que la tendance **continue** : plus on s'éloigne des données, moins l'estimation est fiable.",
      exemple: {
        enonce: "Touristes (en milliers) ajustés par $y = 3{,}3x + 28{,}7$. Estimation pour l'année de rang $10$ ?",
        solution: "$y = 3{,}3 \\times 10 + 28{,}7 = 61{,}7$ : environ $61\\,700$ touristes, si la tendance se maintient (extrapolation)."
      }
    },
    {
      titre: "Méthode de Mayer",
      figure: "qn-cours-mayer",
      video: { titre: "Vidéo d'Yvan Monka : droite d'ajustement par la méthode des deux points moyens", youtube: "https://youtu.be/ESHY4QPgriw" },
      texte:
        "On range les points selon $x$ et on les partage en deux groupes de même effectif (à un près). On calcule le point moyen de chaque groupe, $G_1$ et $G_2$, puis la droite $(G_1G_2)$ : pente $\\dfrac{y_{G_2} - y_{G_1}}{x_{G_2} - x_{G_1}}$, puis ordonnée à l'origine avec l'un des deux points. Cette droite passe aussi par le point moyen $G$ du nuage entier.\n\n" +
        "C'est une méthode simple, faisable à la main, qui donne une droite proche de celle des moindres carrés."
    },
    {
      titre: "Esprit critique : corrélation n'est pas causalité",
      video: { titre: "Vidéo d'Yvan Monka : effectuer un ajustement à l'aide d'un changement de variable", youtube: "https://youtu.be/nVDL0razClY" },
      texte:
        "Un nuage bien aligné montre que deux grandeurs **varient ensemble** (corrélation). Il ne prouve pas que l'une **cause** l'autre : les ventes de glaces et les noyades augmentent ensemble… parce qu'il fait chaud.\n\n" +
        "Et un ajustement affine n'est valable que sur la plage des données : la taille d'un enfant croît à peu près linéairement les premières années, mais extrapoler à $40$ ans donnerait une taille absurde.\n\n" +
        "Quand le nuage est courbé, on peut parfois se ramener à une droite par un changement de variable (par exemple en remplaçant $x$ par $x^2$), comme on le verra en Terminale."
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "qn-point-moyen", titre: "Calculer le point moyen", etape: "Nuage", nb: 5 },
    { type: "qn-nuage", titre: "Lire un nuage, pertinence d'un ajustement", etape: "Nuage", nb: 5 },
    { type: "qn-droite-g", titre: "Droite passant par le point moyen", etape: "Ajustement", nb: 4 },
    { type: "qn-mayer", titre: "Méthode de Mayer", etape: "Ajustement", nb: 4 },
    { type: "qn-moindres-carres", titre: "Somme des carrés des écarts", etape: "Ajustement", nb: 4 },
    { type: "qn-ajustement", titre: "Interpoler, extrapoler", etape: "Utiliser", nb: 5 },
    { type: "qn-critique", titre: "Esprit critique : vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Le point moyen du nuage $(1\\,;4)$, $(3\\,;8)$, $(5\\,;12)$ est :", choix: ["$G(3\\,;8)$", "$G(9\\,;24)$", "$G(4\\,;3)$", "$G(5\\,;12)$"], bonne: 0, explication: "$\\bar{x} = \\dfrac{9}{3} = 3$, $\\bar{y} = \\dfrac{24}{3} = 8$." },
    { question: "Dans un nuage de points, chaque point a pour coordonnées :", choix: ["$(x_i\\,;y_i)$", "$(\\bar{x}\\,;\\bar{y})$", "$(i\\,;x_i)$", "$(x_i\\,;x_i)$"], bonne: 0, explication: "Un point par individu." },
    { question: "Un ajustement affine est pertinent quand :", choix: ["les points sont à peu près alignés", "il y a beaucoup de points", "les points sont dispersés", "le nuage forme une courbe"], bonne: 0, explication: "On remplace le nuage par une droite seulement s'il est rectiligne." },
    { question: "Une droite d'ajustement passe en général par :", choix: ["le point moyen $G$", "l'origine du repère", "le premier point du nuage", "le point le plus haut"], bonne: 0, explication: "Moindres carrés et Mayer passent par $G$." },
    { question: "Une droite de pente $3$ passe par $G(4\\,;20)$. Son équation est :", choix: ["$y = 3x + 8$", "$y = 3x + 20$", "$y = 4x + 3$", "$y = 3x - 8$"], bonne: 0, explication: "$20 = 3 \\times 4 + p$, donc $p = 8$." },
    { question: "La méthode des moindres carrés minimise :", choix: ["la somme des carrés des écarts verticaux", "la somme des écarts", "le nombre de points hors de la droite", "la pente de la droite"], bonne: 0, explication: "C'est la définition." },
    { question: "Pourquoi élever les écarts au carré ?", choix: ["pour que les écarts positifs et négatifs ne se compensent pas", "pour simplifier les calculs", "parce que les écarts sont toujours positifs", "pour obtenir une aire"], bonne: 0, explication: "Sinon la somme pourrait être nulle avec une très mauvaise droite." },
    { question: "Avec l'ajustement $y = 2x + 5$, l'estimation pour $x = 10$ est :", choix: ["$25$", "$20$", "$2{,}5$", "$15$"], bonne: 0, explication: "$2 \\times 10 + 5 = 25$." },
    { question: "Avec $y = 4x - 2$, la valeur de $x$ qui donne $y = 30$ est :", choix: ["$8$", "$118$", "$7$", "$7{,}5$"], bonne: 0, explication: "$4x - 2 = 30 \\Leftrightarrow x = 8$." },
    { question: "Les données vont de $x = 1$ à $x = 8$. Estimer $y$ pour $x = 5{,}5$ est :", choix: ["une interpolation", "une extrapolation", "impossible", "une moyenne"], bonne: 0, explication: "$5{,}5$ est dans la plage des données." },
    { question: "Les données vont de $x = 1$ à $x = 8$. Estimer $y$ pour $x = 15$ est :", choix: ["une extrapolation", "une interpolation", "un point moyen", "une médiane"], bonne: 0, explication: "On sort de la plage des données." },
    { question: "Une extrapolation est fiable :", choix: ["seulement si la tendance se poursuit au-delà des données", "toujours", "jamais", "si le nuage a plus de $10$ points"], bonne: 0, explication: "Le modèle n'est validé que sur les données observées." },
    { question: "Méthode de Mayer : $G_1(2\\,;5)$ et $G_2(6\\,;13)$. Le coefficient directeur de $(G_1G_2)$ est :", choix: ["$2$", "$8$", "$\\dfrac{1}{2}$", "$4$"], bonne: 0, explication: "$\\dfrac{13 - 5}{6 - 2} = 2$." },
    { question: "Points $(1\\,;3)$, $(2\\,;6)$ et droite $y = 2x + 1$. Somme des carrés des écarts :", choix: ["$1$", "$0$", "$2$", "$3$"], bonne: 0, explication: "Écarts : $3 - 3 = 0$ et $6 - 5 = 1$ ; $0 + 1 = 1$." },
    { question: "Les ventes de climatiseurs et le nombre de coups de soleil augmentent ensemble. On peut dire que :", choix: ["les deux sont liés à une même cause, la chaleur", "les climatiseurs donnent des coups de soleil", "les coups de soleil font acheter des climatiseurs", "il n'y a aucun lien statistique"], bonne: 0, explication: "Corrélation n'est pas causalité." },
    { question: "En chimie, une droite d'étalonnage sert à :", choix: ["déduire une concentration d'une mesure", "mesurer la température", "calculer un pourcentage", "tracer une parabole"], bonne: 0, explication: "On lit l'antécédent de la mesure sur la droite." },
    { question: "Pour obtenir la droite des moindres carrés, on utilise en pratique :", choix: ["la calculatrice ou le tableur", "le discriminant", "la dérivée", "un arbre pondéré"], bonne: 0, explication: "Régression linéaire de la calculatrice, ou fonctions du tableur." },
    { question: "Le point moyen de $(0\\,;2)$, $(2\\,;3)$, $(4\\,;7)$, $(6\\,;8)$ est :", choix: ["$G(3\\,;5)$", "$G(12\\,;20)$", "$G(2\\,;5)$", "$G(3\\,;4)$"], bonne: 0, explication: "$\\dfrac{12}{4} = 3$ et $\\dfrac{20}{4} = 5$." },
    { question: "Un nuage de points se représente :", choix: ["sans relier les points", "en reliant les points dans l'ordre", "par un histogramme", "par un diagramme circulaire"], bonne: 0, explication: "Chaque point est un individu, il n'y a pas d'ordre à suivre." },
    { question: "Une droite d'ajustement d'équation $y = 1{,}5x + 20$ prévoit que, quand $x$ augmente de $1$, $y$ augmente de :", choix: ["$1{,}5$", "$20$", "$21{,}5$", "$15$"], bonne: 0, explication: "C'est le coefficient directeur." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Représenter et résumer un nuage",
      figure: "qn-cours-nuage",
      etapes: [
        "Choisir les échelles, placer les points $(x_i\\,;y_i)$ sans les relier.",
        "Calculer $\\bar{x}$ et $\\bar{y}$ et placer $G(\\bar{x}\\,;\\bar{y})$.",
        "Observer la forme : rectiligne ? courbée ? dispersée ?",
        "Décider si un ajustement affine est pertinent."
      ],
      exemple: "$(1\\,;3)$, $(2\\,;5)$, $(3\\,;8)$, $(4\\,;8)$ : $G(2{,}5\\,;6)$, nuage presque rectiligne."
    },
    {
      titre: "Trouver une droite d'ajustement",
      figure: "qn-cours-mayer",
      etapes: [
        "Mayer : deux groupes, points moyens $G_1$ et $G_2$, pente $\\dfrac{y_{G_2} - y_{G_1}}{x_{G_2} - x_{G_1}}$.",
        "Ou : pente donnée (calculatrice, tableur) et passage par $G$.",
        "Ordonnée à l'origine : $p = \\bar{y} - a \\bar{x}$.",
        "Écrire $y = ax + p$ et vérifier sur le graphique."
      ],
      exemple: "Pente $2$, $G(5\\,;14)$ : $p = 14 - 10 = 4$, droite $y = 2x + 4$."
    },
    {
      titre: "Estimer avec la droite",
      etapes: [
        "Pour estimer $y$ : remplacer $x$ dans $y = ax + b$.",
        "Pour estimer $x$ : résoudre $ax + b = y$.",
        "Dire s'il s'agit d'une interpolation (dans les données) ou d'une extrapolation (au-delà).",
        "Commenter la fiabilité dans le contexte."
      ],
      exemple: "$y = 0{,}8x + 2$ et $y = 10$ : $x = 10$. Si les mesures allaient de $1$ à $12$, c'est une interpolation."
    }
  ],
  erreurs: [
    "Relier les points du nuage comme une courbe.",
    "Oublier de diviser par l'effectif en calculant $\\bar{x}$ ou $\\bar{y}$.",
    "Confondre $\\bar{x}$ et $\\bar{y}$, ou échanger les coordonnées de $G$.",
    "Utiliser un ajustement affine pour un nuage courbé ou dispersé.",
    "Additionner les écarts sans les élever au carré dans la méthode des moindres carrés.",
    "Faire confiance à une extrapolation lointaine sans regard critique.",
    "Conclure qu'une grandeur cause l'autre parce que le nuage est aligné.",
    "Écrire $p = \\bar{y}$ au lieu de $p = \\bar{y} - a\\bar{x}$."
  ]
};
