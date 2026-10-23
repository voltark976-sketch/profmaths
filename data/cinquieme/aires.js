/*
  CHAPITRE : 5e — Aires
  ----------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026 :
  « Triangles » : calculer l'aire d'un triangle ; « Parallélogrammes » : calculer l'aire d'un parallélogramme et
  de figures complexes, problèmes avec conversions d'unités de longueur et d'aire ; « Représentation de
  l'espace » : calculer l'aire du disque. (Regroupés comme dans le chapitre « Aires » d'Yvan Monka.)
  Règle du site : une réponse « arrondie au dixième » n'accepte que le bon arrondi.
  figure : "ai5-triangle" (assets/exercices-cinquieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-aires"] = {
  niveau: "5e",
  numero: 15,
  titre: "Aires",
  accroche: "Convertir des unités d'aire et calculer l'aire d'un triangle, d'un parallélogramme, d'un disque et de figures composées.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : aires (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Aires5e.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : aires (Yvan Monka)", url: "https://youtu.be/ThZd29ZU6zA", type: "video" },
    { titre: "Calculer l'aire d'une figure composée (Yvan Monka)", url: "https://youtu.be/vof06TmPcQk", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Unités d'aire",
      video: { titre: "Vidéo d'Yvan Monka : convertir les unités d'aire", youtube: "https://youtu.be/qkDy6lguF80" },
      texte:
        "$1$ m² est l'aire d'un carré de $1$ m de côté. Ce carré contient $10 \\times 10 = 100$ carrés de $1$ dm de côté : $1$ m² $= 100$ dm².\n\n" +
        "Entre deux unités d'aire voisines (km², hm², dam², m², dm², cm², mm²), on multiplie ou on divise par **$100$**.\n\n" +
        "$3{,}5$ m² $= 350$ dm² $= 35\\,000$ cm² ; $250$ mm² $= 2{,}5$ cm².",
      figure: "ai5-cours-m2",
      exemple: {
        enonce: "Convertis $4{,}2$ m² en cm² et $650$ cm² en dm².",
        solution: "$4{,}2$ m² $= 4{,}2 \\times 10\\,000 = 42\\,000$ cm².\n\n$650$ cm² $= 650 \\div 100 = 6{,}5$ dm²."
      }
    },
    {
      titre: "Aire d'un triangle",
      video: { titre: "Vidéo d'Yvan Monka : calculer l'aire d'un triangle", youtube: "https://youtu.be/XciTFhpXIL0" },
      texte:
        "$\\mathcal{A}_{\\text{triangle}} = \\dfrac{\\text{base} \\times \\text{hauteur}}{2}$, où la hauteur est relative à la base choisie (perpendiculaire à cette base).\n\n" +
        "Un triangle est la moitié d'un rectangle (ou d'un parallélogramme) de même base et de même hauteur. Dans un triangle rectangle, on peut prendre comme base et hauteur les deux côtés de l'angle droit.",
      figure: "ai5-triangle",
      exemple: {
        enonce: "Calcule l'aire du triangle de la figure.",
        solution: "$\\mathcal{A} = \\dfrac{8 \\times 5}{2} = 20$ cm²."
      }
    },
    {
      titre: "Aire d'un parallélogramme",
      video: { titre: "Vidéo d'Yvan Monka : calculer l'aire d'un parallélogramme", youtube: "https://youtu.be/BTLoR9iZXnM" },
      texte:
        "$\\mathcal{A}_{\\text{parallélogramme}} = \\text{base} \\times \\text{hauteur}$.\n\n" +
        "En découpant un triangle d'un côté et en le recollant de l'autre, on obtient un rectangle de même base et de même hauteur. Attention : on utilise la **hauteur**, pas le côté penché.",
      figure: "ai5-cours-para",
      exemple: {
        enonce: "Un parallélogramme a un côté de $7$ cm, une hauteur relative à ce côté de $4$ cm et un autre côté de $5$ cm. Quelle est son aire ?",
        solution: "$\\mathcal{A} = 7 \\times 4 = 28$ cm² (le côté de $5$ cm ne sert pas)."
      }
    },
    {
      titre: "Aire d'un disque",
      video: { titre: "Vidéo d'Yvan Monka : calculer l'aire d'un disque", youtube: "https://youtu.be/y-PV5LNmqsM" },
      texte:
        "$\\mathcal{A}_{\\text{disque}} = \\pi \\times r \\times r = \\pi r^2$, où $r$ est le rayon.\n\n" +
        "Ne pas confondre avec le périmètre du cercle, $2 \\times \\pi \\times r$. On utilise la touche $\\pi$ de la calculatrice et on arrondit à la fin.",
      figure: "ai5-cours-disque",
      exemple: {
        enonce: "Calcule l'aire d'un disque de diamètre $10$ cm, arrondie au dixième.",
        solution: "Rayon $5$ cm : $\\pi \\times 5 \\times 5 = 25\\pi \\approx 78{,}5$ cm²."
      }
    },
    {
      titre: "Figures composées",
      video: { titre: "Vidéo d'Yvan Monka : calculer l'aire d'une figure composée", youtube: "https://youtu.be/vof06TmPcQk" },
      texte:
        "Pour une figure complexe, on la **découpe** en figures simples (rectangles, triangles, disques…), puis on **additionne** leurs aires, ou on part d'une grande figure et on **soustrait** les parties retirées.\n\n" +
        "On vérifie que toutes les longueurs sont dans la même unité.",
      figure: "ai5-cours-composee",
      exemple: {
        enonce: "Un terrain est un rectangle de $20$ m sur $12$ m prolongé par un triangle de base $12$ m et de hauteur $5$ m. Quelle est son aire ?",
        solution: "$20 \\times 12 + \\dfrac{12 \\times 5}{2} = 240 + 30 = 270$ m²."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "ai5-conversions", titre: "Convertir des aires", etape: "Unités d'aire", nb: 6 },
    { type: "ai5-triangle", titre: "Aire d'un triangle", etape: "Calculer des aires", nb: 6 },
    { type: "ai5-parallelogramme", titre: "Parallélogramme et losange", etape: "Calculer des aires", nb: 5 },
    { type: "ai5-disque", titre: "Aire d'un disque", etape: "Calculer des aires", nb: 5 },
    { type: "ai5-composees", titre: "Figures composées", etape: "Figures composées", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$1$ m² est égal à :", choix: ["$100$ dm²", "$10$ dm²", "$1\\,000$ dm²", "$1$ dm²"], bonne: 0, explication: "Facteur $100$ entre unités d'aire voisines." },
    { question: "$5$ cm² est égal à :", choix: ["$500$ mm²", "$50$ mm²", "$0{,}05$ mm²", "$5\\,000$ mm²"], bonne: 0, explication: "$5 \\times 100 = 500$." },
    { question: "$2\\,500$ cm² est égal à :", choix: ["$0{,}25$ m²", "$25$ m²", "$2{,}5$ m²", "$250$ m²"], bonne: 0, explication: "$2\\,500 \\div 10\\,000 = 0{,}25$." },
    { question: "L'aire d'un triangle de base $6$ cm et de hauteur $4$ cm est :", choix: ["$12$ cm²", "$24$ cm²", "$10$ cm²", "$20$ cm²"], bonne: 0, explication: "$\\dfrac{6 \\times 4}{2} = 12$." },
    { question: "Un triangle rectangle a des côtés de l'angle droit de $3$ cm et $8$ cm. Son aire est :", choix: ["$12$ cm²", "$24$ cm²", "$11$ cm²", "$22$ cm²"], bonne: 0, explication: "$\\dfrac{3 \\times 8}{2} = 12$." },
    { question: "L'aire d'un parallélogramme de base $9$ cm et de hauteur $5$ cm est :", choix: ["$45$ cm²", "$22{,}5$ cm²", "$28$ cm²", "$14$ cm²"], bonne: 0, explication: "$9 \\times 5$." },
    { question: "Dans l'aire d'un parallélogramme, on utilise :", choix: ["la hauteur relative à la base", "le côté penché", "la diagonale", "le périmètre"], bonne: 0, explication: "La hauteur est perpendiculaire à la base." },
    { question: "La formule de l'aire d'un disque de rayon $r$ est :", choix: ["$\\pi \\times r \\times r$", "$2 \\times \\pi \\times r$", "$\\pi \\times d$", "$r \\times r$"], bonne: 0, explication: "$2\\pi r$ est le périmètre." },
    { question: "L'aire d'un disque de rayon $3$ cm est :", choix: ["$9\\pi$ cm²", "$6\\pi$ cm²", "$3\\pi$ cm²", "$36\\pi$ cm²"], bonne: 0, explication: "$\\pi \\times 3 \\times 3$." },
    { question: "L'aire d'un disque de diamètre $8$ cm est :", choix: ["$16\\pi$ cm²", "$64\\pi$ cm²", "$8\\pi$ cm²", "$4\\pi$ cm²"], bonne: 0, explication: "Rayon $4$ : $\\pi \\times 16$." },
    { question: "$25\\pi$ arrondi au dixième vaut :", choix: ["$78{,}5$", "$78{,}6$", "$75{,}0$", "$78$"], bonne: 0, explication: "$25\\pi \\approx 78{,}54$." },
    { question: "Un carré de $10$ m de côté auquel on retire un carré de $2$ m de côté a une aire de :", choix: ["$96$ m²", "$80$ m²", "$64$ m²", "$98$ m²"], bonne: 0, explication: "$100 - 4 = 96$." },
    { question: "La figure du cours a une aire de :", figure: "ai5-triangle", choix: ["$20$ cm²", "$40$ cm²", "$13$ cm²", "$26$ cm²"], bonne: 0, explication: "$\\dfrac{8 \\times 5}{2} = 20$." },
    { question: "Pour calculer l'aire d'une figure composée, on :", choix: ["la découpe en figures simples", "multiplie tous les côtés", "additionne les longueurs", "mesure le périmètre"], bonne: 0, explication: "On additionne ou on soustrait des aires simples." },
    { question: "Quelle est l'aire du parallélogramme dessiné ?", figure: "ai5-qcm-para", choix: ["$45$ cm²", "$54$ cm²", "$22{,}5$ cm²", "$30$ cm²"], bonne: 0, explication: "Base $\\times$ hauteur : $9 \\times 5 = 45$ cm² ; le côté penché de $6$ cm ne sert pas." },
    { question: "Quelle est l'aire du losange dessiné ?", figure: "ai5-qcm-losange", choix: ["$30$ cm²", "$60$ cm²", "$15$ cm²", "$16$ cm²"], bonne: 0, explication: "Deux triangles de base $10$ cm et de hauteur $3$ cm : $2 \\times \\dfrac{10 \\times 3}{2} = 30$ cm²." },
    { question: "L'aire du disque dessiné, arrondie au dixième, est :", figure: "ai5-qcm-disque", choix: ["$28{,}3$ cm²", "$18{,}8$ cm²", "$113{,}1$ cm²", "$9$ cm²"], bonne: 0, explication: "$\\pi \\times 3 \\times 3 = 9\\pi \\approx 28{,}3$ cm² ($18{,}8$ est le périmètre $2\\pi r$)." },
    { question: "On découpe le plus grand disque possible dans le carré dessiné. L'aire des chutes coloriées, arrondie au dixième, est :", figure: "ai5-qcm-chutes", choix: ["$21{,}5$ cm²", "$78{,}5$ cm²", "$68{,}6$ cm²", "$0$ cm²"], bonne: 0, explication: "$100 - \\pi \\times 5 \\times 5 = 100 - 25\\pi \\approx 21{,}5$ cm²." },
    { question: "Quelle est l'aire de la pièce dessinée (le coin en pointillés est retiré) ?", figure: "ai5-qcm-coin", choix: ["$52$ m²", "$60$ m²", "$68$ m²", "$32$ m²"], bonne: 0, explication: "$10 \\times 6 - 4 \\times 2 = 60 - 8 = 52$ m²." },
    { question: "Quelle est l'aire du triangle rectangle dessiné ?", figure: "ai5-qcm-trirect", choix: ["$12$ cm²", "$24$ cm²", "$11$ cm²", "$22$ cm²"], bonne: 0, explication: "Les côtés de l'angle droit sont base et hauteur : $\\dfrac{8 \\times 3}{2} = 12$ cm²." },
    { question: "D'après l'escalier des unités, pour passer des m² aux cm², on :", figure: "ai5-cours-unites", choix: ["multiplie par $10\\,000$", "multiplie par $100$", "divise par $10\\,000$", "multiplie par $1\\,000$"], bonne: 0, explication: "Deux marches vers des unités plus petites : $\\times 100 \\times 100 = \\times 10\\,000$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Convertir une aire",
      etapes: [
        "Repère le nombre de « marches » entre les deux unités.",
        "Chaque marche vers une unité plus petite : $\\times 100$ ; vers une plus grande : $\\div 100$.",
        "Vérifie l'ordre de grandeur."
      ],
      exemple: "$3$ m² $= 300$ dm² $= 30\\,000$ cm² : deux marches vers la droite, donc on multiplie deux fois par $100$.",
      figure: "ai5-cours-unites"
    },
    {
      titre: "Calculer une aire",
      etapes: [
        "Triangle : $\\dfrac{b \\times h}{2}$. Parallélogramme : $b \\times h$. Disque : $\\pi r^2$.",
        "Vérifie que la hauteur est bien perpendiculaire à la base et que $r$ est le rayon.",
        "Écris l'unité d'aire (cm², m²…)."
      ],
      exemple: "Disque du dessin, de diamètre $10$ cm : rayon $5$ cm, donc $\\pi \\times 5 \\times 5 = 25\\pi \\approx 78{,}5$ cm².",
      figure: "ai5-cours-disque"
    },
    {
      titre: "Figure composée",
      etapes: [
        "Découpe la figure en figures simples.",
        "Calcule chaque aire.",
        "Additionne, ou soustrais ce qui est retiré."
      ],
      exemple: "Rectangle $6 \\times 4$ plus demi-disque de rayon $2$ : $24 + 2\\pi \\approx 30{,}3$ dm².",
      figure: "ai5-methode-table"
    }
  ],
  erreurs: [
    "Convertir les aires avec un facteur $10$ au lieu de $100$.",
    "Oublier de diviser par $2$ pour l'aire d'un triangle.",
    "Utiliser le côté penché au lieu de la hauteur dans un parallélogramme.",
    "Utiliser le diamètre à la place du rayon dans $\\pi r^2$.",
    "Confondre l'aire du disque ($\\pi r^2$) et le périmètre du cercle ($2\\pi r$)."
  ]
};
