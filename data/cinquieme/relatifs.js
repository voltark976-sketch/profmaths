/*
  CHAPITRE : 5e — Nombres relatifs et repérage
  ---------------------------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026 :
  « Nombres relatifs » : définir les nombres relatifs, l'opposé et la valeur absolue ; nombres positifs,
  strictement positifs, négatifs, strictement négatifs ; représenter des grandeurs (température, altitude…) ;
  lire et placer sur une droite graduée ; comparer et ranger. « Repérage » : lire et placer des points dans un
  repère orthogonal.
  figure : "nr5-droite" ou "nr5-repere" (assets/exercices-cinquieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-relatifs"] = {
  niveau: "5e",
  numero: 8,
  titre: "Nombres relatifs et repérage",
  accroche: "Des nombres sous zéro : altitudes, températures, droite graduée prolongée vers la gauche, puis un repère pour situer un point avec deux nombres.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : nombres relatifs et repérage (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Nomb_rel1.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : nombres relatifs (Yvan Monka)", url: "https://youtu.be/YivvFtSuzno", type: "video" },
    { titre: "Ranger les nombres relatifs (Yvan Monka)", url: "https://youtu.be/jC_oYObrWbQ", type: "video" },
    { titre: "Déterminer l'opposé d'un nombre relatif (Yvan Monka)", url: "https://youtu.be/a5HGl910IXE", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Les nombres relatifs",
      video: { titre: "Vidéo d'Yvan Monka : découvrir les nombres relatifs", youtube: "https://youtu.be/GAhNZgDw1XA" },
      texte:
        "Les **nombres relatifs** permettent de représenter des grandeurs qui peuvent être en dessous de zéro : une température de $-5$ °C, une altitude de $-25$ m (sous le niveau de la mer), un étage $-2$ au parking.\n\n" +
        "- Un nombre **négatif** s'écrit avec le signe $-$ : $-3$ ; $-0{,}7$.\n" +
        "- Un nombre **positif** s'écrit sans signe (ou avec $+$) : $4 = +4$.\n" +
        "- $0$ est à la fois positif et négatif. « Strictement positif » signifie positif et différent de $0$.\n\n" +
        "Un nombre relatif a un **signe** et une **distance à zéro** (sa valeur absolue) : $-7$ a pour distance à zéro $7$.",
      figure: "nr5-cours-thermo",
      exemple: {
        enonce: "Au sommet du Mont Bénara, l'altitude est $660$ m ; une plongeuse est à $18$ m sous la surface. Écris ces altitudes avec des nombres relatifs.",
        solution: "Le sommet : $+660$ m (ou $660$ m). La plongeuse : $-18$ m, car elle est sous le niveau de la mer."
      }
    },
    {
      titre: "Opposé d'un nombre",
      video: { titre: "Vidéo d'Yvan Monka : déterminer l'opposé d'un nombre relatif", youtube: "https://youtu.be/a5HGl910IXE" },
      texte:
        "Deux nombres sont **opposés** s'ils ont la même distance à zéro et des signes contraires : $5$ et $-5$ sont opposés, $-2{,}4$ et $2{,}4$ aussi.\n\n" +
        "Sur une droite graduée, deux nombres opposés sont **symétriques par rapport à l'origine**. L'opposé de $0$ est $0$.",
      figure: "nr5-cours-oppose",
      exemple: {
        enonce: "Donne l'opposé de $-13$, de $0{,}8$ et la distance à zéro de $-6{,}5$.",
        solution: "L'opposé de $-13$ est $13$ ; celui de $0{,}8$ est $-0{,}8$. La distance à zéro de $-6{,}5$ est $6{,}5$."
      }
    },
    {
      titre: "Sur une droite graduée",
      video: { titre: "Vidéo d'Yvan Monka : placer des nombres relatifs sur une droite graduée", youtube: "https://youtu.be/SImiMoRB0vU" },
      texte:
        "On prolonge la demi-droite graduée vers la gauche de l'origine $0$ : à gauche, les nombres négatifs ; à droite, les positifs.\n\n" +
        "Chaque point a une **abscisse**. Sur la figure, $A$ a pour abscisse $-3$, $B$ a pour abscisse $2$ et $C$ a pour abscisse $-1$.",
      figure: "nr5-droite",
      exemple: {
        enonce: "Sur la figure, quelle est la distance entre les points $A$ et $B$ ?",
        solution: "De $-3$ à $0$ il y a $3$ unités, de $0$ à $2$ il y en a $2$ : $AB = 5$ unités."
      }
    },
    {
      titre: "Comparer et ranger",
      video: { titre: "Vidéo d'Yvan Monka : comparer les nombres relatifs", youtube: "https://youtu.be/DYbRr4B42h8" },
      texte:
        "Sur une droite graduée, le plus petit nombre est le plus à gauche.\n\n" +
        "- Un nombre négatif est plus petit qu'un nombre positif : $-8 < 1$.\n" +
        "- Deux nombres positifs : le plus petit est le plus proche de zéro.\n" +
        "- Deux nombres **négatifs** : le plus petit est celui qui a la **plus grande** distance à zéro : $-7 < -2$ (il fait plus froid à $-7$ °C qu'à $-2$ °C).",
      figure: "nr5-cours-comparer",
      exemple: {
        enonce: "Range dans l'ordre croissant : $3$ ; $-4{,}5$ ; $-1$ ; $0$ ; $-12$.",
        solution: "$-12 < -4{,}5 < -1 < 0 < 3$."
      }
    },
    {
      titre: "Se repérer dans le plan",
      video: { titre: "Vidéo d'Yvan Monka : placer des points dans un repère", youtube: "https://youtu.be/AHNYuKCoCvU" },
      texte:
        "Un **repère** est formé de deux droites graduées perpendiculaires qui se coupent à l'origine : l'axe des **abscisses** (horizontal) et l'axe des **ordonnées** (vertical).\n\n" +
        "Un point est repéré par ses **coordonnées** $(x \\, ; \\, y)$ : d'abord l'abscisse, puis l'ordonnée. Sur la figure, $A(3 \\, ; \\, 2)$ et $C(-2 \\, ; \\, -3)$.",
      figure: "nr5-repere",
      exemple: {
        enonce: "Lis les coordonnées de $B$ et de $D$ sur la figure.",
        solution: "$B$ est à $4$ unités à gauche et $1$ au-dessus : $B(-4 \\, ; \\, 1)$. $D$ est à $2$ à droite et $1$ en dessous : $D(2 \\, ; \\, -1)$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "nr5-vocab", titre: "Signe, opposé, distance à zéro", etape: "Les nombres relatifs", nb: 6 },
    { type: "nr5-abscisse", titre: "Lire et placer sur une droite graduée", etape: "Les nombres relatifs", nb: 6 },
    { type: "nr5-comparer", titre: "Comparer et ranger", etape: "Comparer", nb: 6 },
    { type: "nr5-repere", titre: "Coordonnées dans un repère", etape: "Repérage dans le plan", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Une température de $7$ °C sous zéro s'écrit :", choix: ["$-7$ °C", "$7$ °C", "$+7$ °C", "$0{,}7$ °C"], bonne: 0, explication: "Sous zéro : nombre négatif." },
    { question: "L'opposé de $-9$ est :", choix: ["$9$", "$-9$", "$0$", "$\\dfrac{1}{9}$"], bonne: 0, explication: "Même distance à zéro, signe contraire." },
    { question: "La distance à zéro de $-4{,}2$ est :", choix: ["$4{,}2$", "$-4{,}2$", "$0$", "$2{,}4$"], bonne: 0, explication: "On enlève le signe." },
    { question: "Lequel de ces nombres est strictement négatif ?", choix: ["$-0{,}1$", "$0$", "$0{,}1$", "$1$"], bonne: 0, explication: "$0$ n'est pas strictement négatif." },
    { question: "Sur la figure, l'abscisse du point $A$ est :", figure: "nr5-droite", choix: ["$-3$", "$3$", "$-2$", "$2$"], bonne: 0, explication: "Trois graduations à gauche de $0$." },
    { question: "Sur la figure, le point d'abscisse $2$ est :", figure: "nr5-droite", choix: ["$B$", "$A$", "$C$", "aucun"], bonne: 0, explication: "Deux graduations à droite de $0$." },
    { question: "Quelle comparaison est juste ?", choix: ["$-8 < -3$", "$-8 > -3$", "$-3 < -8$", "$-8 = -3$"], bonne: 0, explication: "$-8$ est plus loin de zéro, du côté négatif." },
    { question: "Laquelle de ces comparaisons est vraie ?", choix: ["$-5 < 1$", "$-5 > 1$", "$1 < -5$", "$-5 = 1$"], bonne: 0, explication: "Un négatif est plus petit qu'un positif." },
    { question: "Le plus petit de ces nombres est :", choix: ["$-6{,}5$", "$-6$", "$-0{,}5$", "$0$"], bonne: 0, explication: "C'est le plus éloigné de zéro du côté négatif." },
    { question: "Dans l'ordre croissant :", choix: ["$-4 < -1 < 0 < 2$", "$-1 < -4 < 0 < 2$", "$0 < -1 < 2 < -4$", "$2 < 0 < -1 < -4$"], bonne: 0, explication: "Du plus à gauche au plus à droite sur la droite graduée." },
    { question: "Sur la figure, les coordonnées de $A$ sont :", figure: "nr5-repere", choix: ["$(3 \\, ; \\, 2)$", "$(2 \\, ; \\, 3)$", "$(-3 \\, ; \\, 2)$", "$(3 \\, ; \\, -2)$"], bonne: 0, explication: "Abscisse $3$, ordonnée $2$." },
    { question: "Sur la figure, le point de coordonnées $(-2 \\, ; \\, -3)$ est :", figure: "nr5-repere", choix: ["$C$", "$B$", "$D$", "$A$"], bonne: 0, explication: "$2$ à gauche, $3$ en dessous." },
    { question: "Dans les coordonnées $(x \\, ; \\, y)$ d'un point, $x$ est :", choix: ["l'abscisse", "l'ordonnée", "la distance à l'origine", "l'opposé de $y$"], bonne: 0, explication: "On écrit d'abord l'abscisse." },
    { question: "Un point d'abscisse négative et d'ordonnée positive est :", choix: ["en haut à gauche", "en haut à droite", "en bas à gauche", "en bas à droite"], bonne: 0, explication: "À gauche de l'axe vertical, au-dessus de l'axe horizontal." },
    { question: "Quelle température indique le thermomètre ?", figure: "nr5-qcm-thermo", choix: ["$-6$ °C", "$-4$ °C", "$6$ °C", "$-14$ °C"], bonne: 0, explication: "Une graduation vaut $2$ °C : le repère est $3$ graduations en dessous de $0$, soit $-6$ °C." },
    { question: "Quelle est l'abscisse du point $M$ ?", figure: "nr5-qcm-droite", choix: ["$-2{,}5$", "$-3{,}5$", "$2{,}5$", "$-2$"], bonne: 0, explication: "Une graduation vaut $0{,}5$. $M$ est $5$ graduations à gauche de $0$ : $5 \\times 0{,}5 = 2{,}5$, donc $-2{,}5$." },
    { question: "Les coordonnées du point $E$ sont :", figure: "nr5-qcm-repere", choix: ["$(-3 \\, ; \\, -2)$", "$(-2 \\, ; \\, -3)$", "$(3 \\, ; \\, 2)$", "$(-3 \\, ; \\, 2)$"], bonne: 0, explication: "$E$ est $3$ unités à gauche (abscisse $-3$) et $2$ unités en dessous (ordonnée $-2$)." },
    { question: "L'opposé de l'opposé de $-4$ est :", choix: ["$-4$", "$4$", "$0$", "$8$"], bonne: 0, explication: "L'opposé de $-4$ est $4$, et l'opposé de $4$ est $-4$." },
    { question: "Combien de nombres entiers sont strictement compris entre $-3$ et $2$ ?", choix: ["$4$", "$5$", "$1$", "$6$"], bonne: 0, explication: "Ce sont $-2$, $-1$, $0$ et $1$." },
    { question: "Un point d'ordonnée $0$ est situé :", choix: ["sur l'axe des abscisses", "sur l'axe des ordonnées", "à l'origine du repère seulement", "en bas à gauche"], bonne: 0, explication: "Ordonnée $0$ : ni au-dessus ni en dessous de l'axe horizontal, donc sur l'axe des abscisses." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Trouver l'opposé et la distance à zéro",
      etapes: [
        "La distance à zéro : le nombre sans son signe.",
        "L'opposé : même distance à zéro, signe contraire.",
        "Sur la droite graduée, un nombre et son opposé sont symétriques par rapport à $0$."
      ],
      figure: "nr5-cours-oppose",
      exemple: "$-3{,}5$ : distance à zéro $3{,}5$ ; opposé $3{,}5$."
    },
    {
      titre: "Lire une abscisse",
      etapes: [
        "Repère l'origine $0$ et la valeur d'une graduation.",
        "Compte les graduations entre $0$ et le point.",
        "À gauche de $0$, l'abscisse est négative."
      ],
      figure: "nr5-methode-droite",
      exemple: "$4$ graduations de $0{,}5$ à gauche : $-2$."
    },
    {
      titre: "Comparer deux relatifs",
      etapes: [
        "Signes différents : le négatif est le plus petit.",
        "Deux positifs : le plus proche de zéro est le plus petit.",
        "Deux négatifs : le plus éloigné de zéro est le plus petit."
      ],
      figure: "nr5-cours-comparer",
      exemple: "$-9 < -4$ ; $-2 < 0{,}5$."
    },
    {
      titre: "Lire les coordonnées d'un point",
      etapes: [
        "Abscisse : on lit sur l'axe horizontal (négative à gauche).",
        "Ordonnée : on lit sur l'axe vertical (négative en bas).",
        "On écrit $(\\text{abscisse} \\, ; \\, \\text{ordonnée})$."
      ],
      figure: "nr5-repere",
      exemple: "$3$ à gauche et $1$ en haut : $(-3 \\, ; \\, 1)$."
    }
  ],
  erreurs: [
    "Croire que $-7$ est plus grand que $-2$ parce que $7 > 2$.",
    "Inverser l'abscisse et l'ordonnée.",
    "Oublier le signe $-$ d'une abscisse à gauche de l'origine.",
    "Penser que $0$ est strictement positif.",
    "Donner une distance à zéro négative."
  ]
};
