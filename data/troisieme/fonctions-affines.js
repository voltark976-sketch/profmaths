/*
  CHAPITRE : 3e — Fonctions linéaires et affines
  -----------------------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027) : fonctions
  linéaires (modélisation de la proportionnalité, pourcentages) et affines ; coefficient directeur et ordonnée à
  l'origine ; représentation graphique par une droite ; déterminer une fonction affine à partir de deux nombres
  et de leurs images. Vidéos et cours PDF d'Yvan Monka.
  figure : droites dessinées avec repere3() (assets/exercices-troisieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-fonctions-affines"] = {
  niveau: "3e",
  numero: 7,
  titre: "Fonctions linéaires et affines",
  accroche: "$f(x) = ax + b$ : reconnaître, représenter par une droite, trouver $a$ et $b$, résoudre des problèmes de tarifs.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : fonctions linéaires et affines, partie 1 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Fonct_aff1.pdf" },
    { titre: "Cours d'Yvan Monka : fonctions linéaires et affines, partie 2 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Fonct_aff2.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : fonctions affines (Yvan Monka)", url: "https://youtu.be/n5_pRx4ozIg", type: "video" },
    { titre: "Représenter une fonction affine avec deux points (Yvan Monka)", url: "https://youtu.be/OQ37ZFZnqZg", type: "video" },
    { titre: "Résoudre un problème à l'aide des fonctions affines (Yvan Monka)", url: "https://youtu.be/XOwoyupaPx0", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Fonctions linéaires et affines",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître l'expression d'une fonction affine", youtube: "https://youtu.be/r5f6kS-8ePM" },
      texte:
        "Une fonction **affine** s'écrit $f(x) = ax + b$ : $a$ est le **coefficient directeur**, $b$ l'**ordonnée à l'origine** ($b = f(0)$).\n\n" +
        "Si $b = 0$, $f(x) = ax$ est **linéaire** : elle modélise une situation de **proportionnalité**.\n\n" +
        "Augmenter de $20\\,\\%$, c'est appliquer la fonction linéaire $x \\mapsto 1{,}2x$ ; baisser de $20\\,\\%$, c'est appliquer $x \\mapsto 0{,}8x$.\n\n" +
        "Sur la figure, la droite de la fonction linéaire $f(x) = 2x$ passe par l'origine ; celle de la fonction affine $g(x) = -x + 3$ coupe l'axe des ordonnées en $3$.",
      figure: "fa3-cours-lineaire",
      exemple: {
        enonce: "$f(x) = 3(x - 2)$ est-elle affine ?",
        solution: "Oui : $f(x) = 3x - 6$, avec $a = 3$ et $b = -6$."
      }
    },
    {
      titre: "Représentation graphique",
      video: { titre: "Vidéo d'Yvan Monka : déterminer graphiquement l'expression d'une fonction affine", youtube: "https://youtu.be/E0NTyDRqWfM" },
      texte:
        "La courbe d'une fonction affine est une **droite**. Elle passe par le point $(0 ; b)$ ; celle d'une fonction linéaire passe par l'origine.\n\n" +
        "Quand $x$ augmente de $1$, $f(x)$ augmente de $a$ : si $a > 0$, la droite **monte** ; si $a < 0$, elle **descend**.\n\n" +
        "Pour la tracer, il suffit de deux points, par exemple $(0 ; b)$ et $(1 ; a + b)$. Sur la figure, $f(x) = 2x - 1$ : la droite passe par $(0 ; -1)$, et quand on avance de $1$, on monte de $2$.",
      figure: "fa3-cours-pente",
      exemple: {
        enonce: "Une droite passe par $(0 ; 2)$ et $(1 ; -1)$. Quelle fonction représente-t-elle ?",
        solution: "$b = 2$ et $a = -1 - 2 = -3$ : $f(x) = -3x + 2$."
      }
    },
    {
      titre: "Trouver a et b avec deux images",
      video: { titre: "Vidéo d'Yvan Monka : déterminer une fonction affine par deux nombres et leurs images", youtube: "https://youtu.be/cXl6snfEJbg" },
      texte:
        "Si $f(x_1) = y_1$ et $f(x_2) = y_2$, alors $a = \\dfrac{y_2 - y_1}{x_2 - x_1}$.\n\n" +
        "On trouve ensuite $b$ avec $b = y_1 - a x_1$.\n\n" +
        "$f(1) = 5$ et $f(4) = 11$ : $a = \\dfrac{11 - 5}{4 - 1} = 2$, puis $b = 5 - 2 \\times 1 = 3$, donc $f(x) = 2x + 3$. Sur la figure, de $A$ à $B$ : on avance de $3$ et on monte de $6$.",
      figure: "fa3-cours-deux-points",
      exemple: {
        enonce: "$f(0) = -4$ et $f(2) = 6$. Trouve $f$.",
        solution: "$b = -4$, $a = \\dfrac{6 - (-4)}{2} = 5$ : $f(x) = 5x - 4$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "fa3-reconnaitre", titre: "Reconnaître et calculer", etape: "Expressions", nb: 6 },
    { type: "fa3-graphe", titre: "Lire une droite", etape: "Droites", nb: 6 },
    { type: "fa3-deux-points", titre: "a et b à partir de deux images", etape: "Droites", nb: 5 },
    { type: "fa3-problemes", titre: "Pourcentages et tarifs", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Laquelle est une fonction linéaire ?", choix: ["$f(x) = -4x$", "$f(x) = 4x + 1$", "$f(x) = x^2$", "$f(x) = \\dfrac{4}{x}$"], bonne: 0, explication: "Forme $ax$." },
    { question: "$f(x) = 5 - 2x$ : le coefficient directeur est :", choix: ["$-2$", "$5$", "$2$", "$3$"], bonne: 0, explication: "$f(x) = -2x + 5$." },
    { question: "$f(x) = 3x - 7$ : l'ordonnée à l'origine est :", choix: ["$-7$", "$3$", "$7$", "$0$"], bonne: 0, explication: "$f(0) = -7$." },
    { question: "La représentation graphique d'une fonction affine est :", choix: ["une droite", "une parabole", "un cercle", "une courbe quelconque"], bonne: 0, explication: "Propriété du cours." },
    { question: "La droite d'une fonction linéaire passe toujours par :", choix: ["l'origine du repère", "le point $(1 ; 0)$", "le point $(0 ; 1)$", "aucun point fixe"], bonne: 0, explication: "$f(0) = 0$." },
    { question: "Si $a < 0$, la droite de $f(x) = ax + b$ :", choix: ["descend", "monte", "est horizontale", "est verticale"], bonne: 0, explication: "$f$ est décroissante." },
    { question: "Augmenter un prix de $15\\,\\%$ revient à le multiplier par :", choix: ["$1{,}15$", "$0{,}15$", "$0{,}85$", "$15$"], bonne: 0, explication: "$1 + 0{,}15$." },
    { question: "Baisser un prix de $30\\,\\%$ revient à le multiplier par :", choix: ["$0{,}7$", "$0{,}3$", "$1{,}3$", "$-0{,}3$"], bonne: 0, explication: "$1 - 0{,}3$." },
    { question: "$f(2) = 7$ et $f(5) = 13$ pour une fonction affine. Alors $a$ vaut :", choix: ["$2$", "$6$", "$3$", "$\\dfrac{1}{2}$"], bonne: 0, explication: "$\\dfrac{13 - 7}{5 - 2}$." },
    { question: "Le point $(2 ; 5)$ est-il sur la droite de $f(x) = 3x - 1$ ?", choix: ["Oui", "Non", "Seulement si $x = 0$", "On ne peut pas savoir"], bonne: 0, explication: "$f(2) = 5$." },
    { question: "$f(x) = 2x + 3$. L'antécédent de $11$ est :", choix: ["$4$", "$25$", "$7$", "$5{,}5$"], bonne: 0, explication: "$2x + 3 = 11$." },
    { question: "Un abonnement coûte $10$ € puis $2$ € par film. Le prix pour $x$ films est :", choix: ["$f(x) = 2x + 10$", "$f(x) = 10x + 2$", "$f(x) = 12x$", "$f(x) = 2(x + 10)$"], bonne: 0, explication: "$10$ € fixes et $2$ € par film." },
    { question: "Cette droite représente la fonction :", figure: "fa3-qcm-droite", choix: ["$f(x) = 2x + 1$", "$f(x) = x + 2$", "$f(x) = -2x + 1$", "$f(x) = 2x - 1$"], bonne: 0, explication: "Elle coupe l'axe des ordonnées en $1$ ($b = 1$) et monte de $2$ quand on avance de $1$ ($a = 2$)." },
    { question: "Cette droite représente une fonction :", figure: "fa3-qcm-lineaire", choix: ["linéaire, de coefficient $-0{,}5$", "linéaire, de coefficient $-2$", "affine non linéaire, de coefficient $0{,}5$", "constante"], bonne: 0, explication: "Elle passe par l'origine : linéaire. Quand $x$ augmente de $2$, $f(x)$ diminue de $1$ : $a = -0{,}5$." },
    { question: "$f(x) = 3x - 2$. Le point $A(2 ; 4)$ :", choix: ["est sur la droite de $f$, car $f(2) = 4$", "n'est pas sur la droite de $f$", "est le point où la droite coupe l'axe des ordonnées", "est sur la droite seulement si $x = 0$"], bonne: 0, explication: "$f(2) = 3 \\times 2 - 2 = 4$." },
    { question: "La fonction $f(x) = 4$ est :", choix: ["affine, avec $a = 0$", "linéaire", "ni linéaire ni affine", "affine, avec $a = 4$"], bonne: 0, explication: "$f(x) = 0 \\times x + 4$ : c'est une fonction affine constante, sa droite est horizontale." },
    { question: "$f$ est linéaire et $f(3) = 12$. Alors $f(5)$ vaut :", choix: ["$20$", "$14$", "$15$", "$60$"], bonne: 0, explication: "$f(x) = ax$ avec $3a = 12$, donc $a = 4$ et $f(5) = 20$." },
    { question: "Une baisse de $40\\,\\%$ correspond à la fonction :", choix: ["$x \\mapsto 0{,}6x$", "$x \\mapsto 0{,}4x$", "$x \\mapsto 1{,}4x$", "$x \\mapsto x - 40$"], bonne: 0, explication: "$1 - 0{,}4 = 0{,}6$." },
    { question: "$f$ est affine, $f(1) = 3$ et $f(3) = -1$. Son coefficient directeur est :", choix: ["$-2$", "$2$", "$-\\dfrac{1}{2}$", "$1$"], bonne: 0, explication: "$a = \\dfrac{-1 - 3}{3 - 1} = \\dfrac{-4}{2} = -2$." },
    { question: "Un taxi-brousse coûte $2$ € de prise en charge et $0{,}50$ € par km. Le prix pour $x$ km est :", choix: ["$f(x) = 0{,}5x + 2$", "$f(x) = 2x + 0{,}5$", "$f(x) = 2{,}5x$", "$f(x) = 0{,}5(x + 2)$"], bonne: 0, explication: "$2$ € une seule fois, plus $0{,}50$ € par kilomètre." },
    { question: "D'après le graphique, pour combien de séances les tarifs A et B coûtent-ils le même prix ?", figure: "fa3-qcm-tarifs", choix: ["$5$", "$25$", "$15$", "$3$"], bonne: 0, explication: "Les droites se coupent au point $(5 ; 25)$ : pour $5$ séances, les deux tarifs coûtent $25$ €." },
    { question: "La droite d'une fonction affine coupe l'axe des ordonnées au point $(0 ; -4)$. Donc :", choix: ["$b = -4$", "$a = -4$", "$f(-4) = 0$", "$b = 4$"], bonne: 0, explication: "$b = f(0)$ : c'est l'ordonnée à l'origine." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Lire a et b sur une droite",
      etapes: [
        "$b$ : ordonnée du point où la droite coupe l'axe vertical.",
        "$a$ : à partir d'un point de la droite, avance de $1$ vers la droite et compte de combien on monte ($a > 0$) ou on descend ($a < 0$).",
        "Écris $f(x) = ax + b$ et vérifie avec un autre point."
      ],
      figure: "fa3-cours-pente",
      exemple: "Coupe l'axe en $-1$, monte de $2$ : $f(x) = 2x - 1$."
    },
    {
      titre: "Trouver f avec deux images",
      etapes: [
        "Calcule $a = \\dfrac{y_2 - y_1}{x_2 - x_1}$.",
        "Calcule $b = y_1 - a x_1$.",
        "Vérifie avec le second point."
      ],
      figure: "fa3-cours-deux-points",
      exemple: "$f(-1) = 1$ et $f(3) = 9$ : $a = 2$, $b = 3$ (c'est la droite de la figure)."
    }
  ],
  erreurs: [
    "Confondre coefficient directeur et ordonnée à l'origine.",
    "Inverser le quotient : $\\dfrac{x_2 - x_1}{y_2 - y_1}$.",
    "Croire qu'une fonction affine est toujours proportionnelle.",
    "Multiplier par $0{,}2$ pour augmenter de $20\\,\\%$.",
    "Oublier le signe de $a$ quand la droite descend."
  ]
};
