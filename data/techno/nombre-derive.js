/*
  CHAPITRE : Première technologique — Nombre dérivé et tangente
  --------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme 2026 de première technologique, « Dérivation », point de vue local : sécantes passant par un point, taux de
  variation en un point, tangente comme position limite des sécantes, nombre dérivé comme limite du taux de variation,
  équation réduite de la tangente ; interprétation géométrique (coefficient directeur), construction de la tangente ;
  contextes : vitesse instantanée, coût marginal. Pas de définition formelle de la limite (approche intuitive).
  video : vidéos d'Yvan Monka et d'autres chaînes. Générateurs : préfixe yd- dans assets/exercices-techno.js ; figures "yd-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["techno-nombre-derive"] = {
  niveau: "Première technologique",
  numero: 9,
  titre: "Nombre dérivé et tangente",
  accroche: "Zoomer sur une courbe jusqu'à ce qu'elle ressemble à une droite : la **tangente**, dont la pente est le **nombre dérivé** $f'(a)$, une vitesse instantanée.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : dérivation, chapitre 1 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Derivation1TM.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Des sécantes à la tangente",
      figure: "yd-cours-secantes",
      video: { titre: "Vidéo d'Yvan Monka : déterminer graphiquement le nombre dérivé", youtube: "https://youtu.be/f7AuwNAagAQ" },
      texte:
        "Soit $A$ le point de $C_f$ d'abscisse $a$ et $M$ un autre point de la courbe, d'abscisse $a + h$. La droite $(AM)$ est une **sécante** ; son coefficient directeur est le **taux de variation** de $f$ entre $a$ et $a + h$ :\n\n" +
        "$\\dfrac{f(a + h) - f(a)}{h}$\n\n" +
        "Quand $M$ se rapproche de $A$ ($h$ se rapproche de $0$), les sécantes $(AM)$ pivotent autour de $A$ et se rapprochent d'une droite limite : la **tangente** à $C_f$ en $A$. C'est la droite qui « colle » le mieux à la courbe au voisinage de $A$ : si on zoome sur $A$, la courbe et la tangente se confondent.",
      exemple: {
        enonce: "$f(x) = 0{,}5x^2$ et $A(1\\,;0{,}5)$. Calcule le taux de variation entre $1$ et $1 + h$ pour $h = 2$, $1$, $0{,}5$.",
        solution: "$h = 2$ : $\\dfrac{4{,}5 - 0{,}5}{2} = 2$ ; $h = 1$ : $\\dfrac{2 - 0{,}5}{1} = 1{,}5$ ; $h = 0{,}5$ : $\\dfrac{1{,}125 - 0{,}5}{0{,}5} = 1{,}25$. Les pentes se rapprochent de $1$."
      }
    },
    {
      titre: "Le nombre dérivé",
      video: { titre: "Vidéo d'Yvan Monka : calculer le nombre dérivé", youtube: "https://youtu.be/UmT0Gov6yyE" },
      texte:
        "Le **nombre dérivé** de $f$ en $a$, noté $f'(a)$, est la valeur vers laquelle tend le taux de variation $\\dfrac{f(a + h) - f(a)}{h}$ quand $h$ tend vers $0$. On écrit\n\n" +
        "$f'(a) = \\lim\\limits_{h \\to 0} \\dfrac{f(a + h) - f(a)}{h}$\n\n" +
        "**Interprétation géométrique** : $f'(a)$ est le **coefficient directeur de la tangente** à $C_f$ au point d'abscisse $a$.\n\n" +
        "Exemple avec $f(x) = x^2$ en $a = 3$ : $\\dfrac{(3 + h)^2 - 9}{h} = \\dfrac{6h + h^2}{h} = 6 + h$, qui tend vers $6$ quand $h \\to 0$. Donc $f'(3) = 6$ : la tangente en $(3\\,;9)$ a pour pente $6$.\n\n" +
        "On s'en tient à cette approche intuitive de la limite : on calcule le taux, on simplifie par $h$, on fait disparaître les termes en $h$.",
      exemple: {
        enonce: "$f(x) = x^2 + x$. Calcule $f'(1)$.",
        solution: "$\\dfrac{(1 + h)^2 + (1 + h) - 2}{h} = \\dfrac{3h + h^2}{h} = 3 + h \\to 3$. Donc $f'(1) = 3$."
      }
    },
    {
      titre: "Lire et construire une tangente",
      figure: "yd-cours-tangente",
      video: { titre: "Vidéo d'Yvan Monka : déterminer graphiquement une tangente à une courbe", youtube: "https://youtu.be/7-z62dSkkTQ" },
      texte:
        "**Lire $f'(a)$** sur un graphique : on repère la tangente en $A$ et on mesure sa pente, comme pour toute droite : en avançant de $1$ en abscisse, de combien monte-t-on (ou descend-on) ? Sur la figure, la tangente en $A(2\\,;2)$ monte de $2$ pour $+1$ : $f'(2) = 2$.\n\n" +
        "**Construire la tangente** connaissant $f'(a)$ : placer $A(a\\,;f(a))$, puis le point $(a + 1\\,;f(a) + f'(a))$, et tracer la droite qui les joint.\n\n" +
        "Signe : $f'(a) > 0$, la tangente monte ; $f'(a) < 0$, elle descend ; $f'(a) = 0$, elle est **horizontale** (souvent au sommet d'une bosse ou au fond d'un creux).",
      exemple: {
        enonce: "On sait que $f(4) = 1$ et $f'(4) = -0{,}5$. Comment tracer la tangente en $4$ ?",
        solution: "Placer $A(4\\,;1)$, puis le point $(5\\,;0{,}5)$ (on avance de $1$, on descend de $0{,}5$), et joindre."
      }
    },
    {
      titre: "Équation réduite de la tangente",
      video: { titre: "Vidéo d'Yvan Monka : déterminer l'équation d'une tangente à une courbe", youtube: "https://youtu.be/fKEGoo50Xmo" },
      texte:
        "La tangente en $a$ est la droite de coefficient directeur $f'(a)$ passant par $A(a\\,;f(a))$. Son équation réduite est\n\n" +
        "$y = f'(a)\\,(x - a) + f(a)$\n\n" +
        "**Pourquoi ?** Une droite de pente $m$ passant par $A$ vérifie $\\dfrac{y - f(a)}{x - a} = m$, soit $y = m(x - a) + f(a)$.\n\n" +
        "Exemple : $f(3) = 9$ et $f'(3) = 6$ : $y = 6(x - 3) + 9 = 6x - 9$. Pour vérifier, $x = 3$ donne bien $y = 9$.\n\n" +
        "Près de $A$, la courbe est proche de la tangente : $f(a + h) \\approx f(a) + f'(a) \\times h$ pour $h$ petit. C'est une estimation rapide.",
      exemple: {
        enonce: "$f(2) = -1$ et $f'(2) = 4$. Équation de la tangente en $2$ ? Estimation de $f(2{,}1)$ ?",
        solution: "$y = 4(x - 2) - 1 = 4x - 9$. $f(2{,}1) \\approx -1 + 4 \\times 0{,}1 = -0{,}6$."
      }
    },
    {
      titre: "Vitesse instantanée, coût marginal",
      figure: "yd-cours-vitesse",
      video: { titre: "Vidéo de Maths en tête : nombre dérivé et vitesse instantanée", youtube: "https://youtu.be/xhX0AkDscUk" },
      texte:
        "**Mouvement** : si $d(t)$ est la distance parcourue à l'instant $t$, le taux de variation entre $t_1$ et $t_2$ est la **vitesse moyenne** sur l'intervalle, et $d'(t)$ est la **vitesse instantanée** à l'instant $t$ (celle du compteur). Sur la figure, $d(t) = 2t^2$ : vitesse moyenne entre $0$ et $3$ s : $6$ m/s ; vitesse instantanée à $3$ s : $d'(3) = 12$ m/s.\n\n" +
        "**Économie** : si $C(q)$ est le coût total de fabrication de $q$ objets, $C'(q)$ est le **coût marginal** : approximativement le coût de l'objet supplémentaire, $C(q + 1) - C(q)$.\n\n" +
        "D'une façon générale, $f'(a)$ se lit « vitesse de variation de $f$ à l'instant $a$ », en unités de $f$ par unité de la variable.",
      exemple: {
        enonce: "Pour $C(q)$ en euros, $C(100) = 2\\,500$ et $C'(100) = 18$. Interprète.",
        solution: "Fabriquer $100$ objets coûte $2\\,500$ € ; le $101$e objet coûte environ $18$ € de plus (coût marginal)."
      }
    },
    {
      titre: "Python : les pentes des sécantes",
      video: { titre: "Vidéo de Mathématiques au lycée : approcher un nombre dérivé en Python (exercice corrigé)", youtube: "https://youtu.be/jsMoCibojrs" },
      texte:
        "```python\ndef f(x):\n    return x ** 2\n\ndef taux(a, h):\n    return (f(a + h) - f(a)) / h\n\nfor h in [1, 0.1, 0.01, 0.001]:\n    print(h, taux(3, h))      # 7, 6.1, 6.01, 6.001 : vers f'(3) = 6\n```\n\n" +
        "Le programme ne donne jamais exactement la limite, mais des valeurs de plus en plus proches : c'est l'idée du nombre dérivé."
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "yd-taux-h", titre: "Taux de variation entre a et a + h, limite", etape: "Nombre dérivé", nb: 5 },
    { type: "yd-lecture", titre: "Lire f'(a) sur un graphique", etape: "Tangente", nb: 5 },
    { type: "yd-tracer", titre: "Reconnaître la tangente", etape: "Tangente", nb: 4 },
    { type: "yd-equation", titre: "Équation de la tangente", etape: "Tangente", nb: 5 },
    { type: "yd-contexte", titre: "Vitesse instantanée, coût marginal", etape: "Interpréter", nb: 5 },
    { type: "yd-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Le taux de variation de $f$ entre $a$ et $a + h$ est :", choix: ["$\\dfrac{f(a + h) - f(a)}{h}$", "$\\dfrac{f(a + h) - f(a)}{a}$", "$f(a + h) - f(a)$", "$\\dfrac{h}{f(a + h) - f(a)}$"], bonne: 0, explication: "Variation de $f$ sur variation de $x$, qui vaut $h$." },
    { question: "Le nombre dérivé $f'(a)$ est :", choix: ["la limite du taux de variation quand $h \\to 0$", "le taux de variation pour $h = 1$", "l'image de $a$", "l'ordonnée à l'origine de la tangente"], bonne: 0, explication: "C'est la définition." },
    { question: "Graphiquement, $f'(a)$ est :", choix: ["le coefficient directeur de la tangente en $a$", "l'ordonnée du point d'abscisse $a$", "l'abscisse du point de tangence", "l'aire sous la courbe"], bonne: 0, explication: "La tangente a pour pente $f'(a)$." },
    { question: "La tangente est :", choix: ["la position limite des sécantes $(AM)$ quand $M$ se rapproche de $A$", "la droite qui joint deux points éloignés de la courbe", "l'axe de symétrie de la courbe", "une droite horizontale"], bonne: 0, explication: "Les sécantes pivotent vers la tangente." },
    { question: "Pour $f(x) = x^2$, le taux entre $2$ et $2 + h$ vaut $4 + h$. Donc $f'(2)$ vaut :", choix: ["$4$", "$4 + h$", "$5$", "$2$"], bonne: 0, explication: "Quand $h \\to 0$, $4 + h \\to 4$." },
    { question: "Pour $f(x) = x^2$, le taux entre $3$ et $3{,}1$ vaut :", choix: ["$6{,}1$", "$6$", "$0{,}61$", "$9{,}61$"], bonne: 0, explication: "$\\dfrac{9{,}61 - 9}{0{,}1} = 6{,}1$." },
    { question: "La tangente en $A$ passe par $A(1\\,;3)$ et par $(2\\,;7)$. Alors $f'(1)$ vaut :", choix: ["$4$", "$3$", "$7$", "$\\dfrac{1}{4}$"], bonne: 0, explication: "Pente : $\\dfrac{7 - 3}{2 - 1} = 4$." },
    { question: "La tangente en $A$ est horizontale. Alors :", choix: ["$f'(a) = 0$", "$f(a) = 0$", "$f'(a) = 1$", "$a = 0$"], bonne: 0, explication: "Une droite horizontale a un coefficient directeur nul." },
    { question: "Si la tangente en $a$ descend, alors :", choix: ["$f'(a) < 0$", "$f'(a) > 0$", "$f(a) < 0$", "$a < 0$"], bonne: 0, explication: "Pente négative." },
    { question: "L'équation réduite de la tangente en $a$ est :", choix: ["$y = f'(a)(x - a) + f(a)$", "$y = f(a)(x - a) + f'(a)$", "$y = f'(a)x + f(a)$", "$y = f'(a)(x + a) + f(a)$"], bonne: 0, explication: "Pente $f'(a)$, passage par $(a\\,;f(a))$." },
    { question: "$f(1) = 2$ et $f'(1) = 3$. La tangente en $1$ a pour équation :", choix: ["$y = 3x - 1$", "$y = 3x + 2$", "$y = 2x + 3$", "$y = 3x + 1$"], bonne: 0, explication: "$y = 3(x - 1) + 2 = 3x - 1$." },
    { question: "$f(0) = -4$ et $f'(0) = 2$. La tangente en $0$ a pour équation :", choix: ["$y = 2x - 4$", "$y = -4x + 2$", "$y = 2x + 4$", "$y = 2$"], bonne: 0, explication: "$y = 2(x - 0) - 4$." },
    { question: "$f(2) = 5$ et $f'(2) = -1$. La tangente en $2$ coupe l'axe des ordonnées en :", choix: ["$7$", "$5$", "$-1$", "$3$"], bonne: 0, explication: "$y = -(x - 2) + 5 = -x + 7$." },
    { question: "Pour tracer la tangente en $A(3\\,;1)$ sachant $f'(3) = 2$, on joint $A$ au point :", choix: ["$(4\\,;3)$", "$(3\\,;3)$", "$(5\\,;1)$", "$(2\\,;1)$"], bonne: 0, explication: "On avance de $1$, on monte de $2$." },
    { question: "Si $f(4) = 10$ et $f'(4) = 3$, une valeur approchée de $f(4{,}1)$ est :", choix: ["$10{,}3$", "$13$", "$10{,}1$", "$12{,}1$"], bonne: 0, explication: "$f(4 + 0{,}1) \\approx 10 + 3 \\times 0{,}1$." },
    { question: "$d(t)$ est la distance parcourue (en m) à l'instant $t$ (en s). $d'(5) = 8$ signifie :", choix: ["à $t = 5$ s, la vitesse instantanée est $8$ m/s", "en $5$ s, on a parcouru $8$ m", "la vitesse moyenne sur $5$ s est $8$ m/s", "le mobile met $8$ s pour faire $5$ m"], bonne: 0, explication: "Le nombre dérivé de la distance est la vitesse instantanée." },
    { question: "$C(q)$ est le coût total de $q$ objets. $C'(200) = 15$ signifie :", choix: ["le $201$e objet coûte environ $15$ €", "$200$ objets coûtent $15$ €", "chaque objet coûte $15$ € en moyenne", "le coût augmente de $15\\,\\%$"], bonne: 0, explication: "Le coût marginal est le coût approché d'un objet supplémentaire." },
    { question: "La vitesse moyenne entre $t_1$ et $t_2$ est :", choix: ["le taux de variation de $d$ entre $t_1$ et $t_2$", "$d'(t_1)$", "$d(t_2)$", "la pente de la tangente en $t_1$"], bonne: 0, explication: "Distance parcourue divisée par la durée." },
    { question: "Pour $f(x) = x^2$, les taux de variation entre $3$ et $3 + h$ pour $h = 0{,}1$ ; $0{,}01$ ; $0{,}001$ valent $6{,}1$ ; $6{,}01$ ; $6{,}001$. On en déduit :", choix: ["$f'(3) = 6$", "$f'(3) = 6{,}001$", "$f(3) = 6$", "$f'(3) = 9$"], bonne: 0, explication: "Les taux se rapprochent de $6$." },
    { question: "Si $f'(a) = 0{,}5$, quand $x$ augmente de $1$ à partir de $a$, la tangente :", choix: ["monte de $0{,}5$", "descend de $0{,}5$", "monte de $1$", "reste horizontale"], bonne: 0, explication: "Pente $0{,}5$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer $f'(a)$ avec le taux de variation",
      figure: "yd-cours-secantes",
      etapes: [
        "Calculer $f(a + h)$ en développant.",
        "Former $\\dfrac{f(a + h) - f(a)}{h}$ et simplifier par $h$ (tous les termes du numérateur contiennent $h$).",
        "Faire tendre $h$ vers $0$ : les termes en $h$ disparaissent.",
        "Le nombre obtenu est $f'(a)$."
      ],
      exemple: "$f(x) = x^2$, $a = 5$ : $\\dfrac{(5 + h)^2 - 25}{h} = \\dfrac{10h + h^2}{h} = 10 + h \\to 10$, donc $f'(5) = 10$."
    },
    {
      titre: "Lire $f'(a)$ sur un graphique",
      figure: "yd-cours-tangente",
      etapes: [
        "Repérer la tangente en $A$ (droite qui touche la courbe en $A$).",
        "Choisir deux points de cette droite faciles à lire (sur la grille).",
        "Calculer la pente : $\\dfrac{\\Delta y}{\\Delta x}$.",
        "Vérifier le signe avec le sens de la droite."
      ],
      exemple: "Tangente passant par $(2\\,;2)$ et $(3\\,;4)$ : $f'(2) = \\dfrac{4 - 2}{3 - 2} = 2$."
    },
    {
      titre: "Écrire l'équation de la tangente",
      etapes: [
        "Relever $a$, $f(a)$ et $f'(a)$.",
        "Écrire $y = f'(a)(x - a) + f(a)$.",
        "Développer et réduire en $y = mx + p$.",
        "Vérifier : pour $x = a$, on doit retrouver $y = f(a)$."
      ],
      exemple: "$f(-1) = 4$, $f'(-1) = -2$ : $y = -2(x + 1) + 4 = -2x + 2$."
    },
    {
      titre: "Interpréter un nombre dérivé en contexte",
      figure: "yd-cours-vitesse",
      etapes: [
        "Identifier la grandeur $f$ et la variable (temps, quantité…), avec leurs unités.",
        "$f'(a)$ est une vitesse de variation « à l'instant $a$ », en unité de $f$ par unité de variable.",
        "Pour une distance : vitesse instantanée ; pour un coût : coût marginal.",
        "Pour une petite variation $h$ : $f(a + h) \\approx f(a) + f'(a) \\times h$."
      ],
      exemple: "$T'(10) = -3$ °C/min : à la 10e minute, la température baisse de $3$ °C par minute."
    }
  ],
  erreurs: [
    "Confondre $f(a)$ (ordonnée du point) et $f'(a)$ (pente de la tangente).",
    "Diviser par $a$ au lieu de $h$ dans le taux de variation.",
    "Oublier de faire tendre $h$ vers $0$ : le taux pour $h = 1$ n'est pas le nombre dérivé.",
    "Écrire $y = f'(a)x + f(a)$ : il manque le $(x - a)$, sauf si $a = 0$.",
    "Confondre vitesse moyenne (taux sur un intervalle) et vitesse instantanée (nombre dérivé).",
    "Se tromper de signe en lisant une pente : une droite qui descend a un coefficient directeur négatif.",
    "Croire que la tangente ne touche la courbe qu'en un point : elle peut la recouper plus loin.",
    "Oublier les unités dans l'interprétation (m/s, € par objet, °C par minute)."
  ]
};
