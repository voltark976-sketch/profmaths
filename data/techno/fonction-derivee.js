/*
  CHAPITRE : Première technologique — Fonction dérivée et variations
  -------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme 2026 de première technologique, « Dérivation », point de vue global : fonction dérivée ; dérivées de x² et x³ ;
  dérivée d'une somme, de kf, d'un polynôme de degré inférieur ou égal à 3 ; sens de variation et signe de la dérivée ;
  tableau de variations, extremums ; démonstration possible : la dérivée d'une fonction monotone est de signe constant
  (réciproque admise).
  video : vidéos d'Yvan Monka. Générateurs : préfixe yr- dans assets/exercices-techno.js ; figures "yr-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["techno-fonction-derivee"] = {
  niveau: "Première technologique",
  numero: 10,
  titre: "Fonction dérivée et variations",
  accroche: "Dériver un polynôme en quelques règles, puis lire le **signe de $f'$** pour obtenir les **variations de $f$** et ses extremums : l'outil roi des problèmes d'optimisation.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : dérivation, chapitre 2 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Derivation2TM.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "La fonction dérivée",
      figure: "yr-cours-formules",
      video: { titre: "Vidéo d'Yvan Monka : démonstration de la dérivée de la fonction carré", youtube: "https://youtu.be/-nRmE8yFSSg" },
      texte:
        "Quand on peut calculer le nombre dérivé $f'(a)$ en tout point $a$, la fonction $x \\mapsto f'(x)$ s'appelle la **fonction dérivée** de $f$.\n\n" +
        "**Dérivées usuelles** : la dérivée d'une constante est $0$ ; $(x)' = 1$ ; $(x^2)' = 2x$ ; $(x^3)' = 3x^2$.\n\n" +
        "**Pourquoi $(x^2)' = 2x$ ?** Le taux de variation en $a$ vaut $\\dfrac{(a + h)^2 - a^2}{h} = \\dfrac{2ah + h^2}{h} = 2a + h$, qui tend vers $2a$ quand $h \\to 0$. Donc $f'(a) = 2a$ pour tout $a$.\n\n" +
        "De même pour $x^3$ : $(a + h)^3 - a^3 = 3a^2h + 3ah^2 + h^3$, et le taux $3a^2 + 3ah + h^2$ tend vers $3a^2$.",
      exemple: {
        enonce: "Que valent $f'(5)$ et $f'(-2)$ pour $f(x) = x^2$ ? Et $g'(2)$ pour $g(x) = x^3$ ?",
        solution: "$f'(x) = 2x$ : $f'(5) = 10$, $f'(-2) = -4$. $g'(x) = 3x^2$ : $g'(2) = 12$."
      }
    },
    {
      titre: "Dériver un polynôme",
      video: { titre: "Vidéo d'Yvan Monka : fonction dérivée d'un polynôme de degré 3", youtube: "https://youtu.be/1fOGueiO_zk" },
      texte:
        "Deux règles suffisent pour tous les polynômes de degré au plus $3$ :\n\n" +
        "- **produit par une constante** : $(k \\times u)' = k \\times u'$. Ainsi $(5x^2)' = 5 \\times 2x = 10x$ ;\n" +
        "- **somme** : $(u + v)' = u' + v'$. On dérive terme à terme.\n\n" +
        "Exemple : $f(x) = 2x^3 - 5x^2 + 4x - 7$ donne $f'(x) = 2 \\times 3x^2 - 5 \\times 2x + 4 - 0 = 6x^2 - 10x + 4$.\n\n" +
        "Retenir : dériver $ax^n$ donne $n \\times a \\times x^{n - 1}$ (l'exposant descend devant, puis baisse de $1$) ; le terme constant disparaît.",
      exemple: {
        enonce: "Dérive $f(x) = -x^3 + 3x^2 + 9x + 1$ et calcule $f'(1)$.",
        solution: "$f'(x) = -3x^2 + 6x + 9$ ; $f'(1) = -3 + 6 + 9 = 12$."
      }
    },
    {
      titre: "Signe de la dérivée et sens de variation",
      figure: "yr-cours-parabole",
      video: { titre: "Vidéo d'Yvan Monka : comprendre le lien entre signe de la dérivée et variations", youtube: "https://youtu.be/dPIlTNyBCiw" },
      texte:
        "**Théorème.** Sur un intervalle $I$ :\n\n" +
        "- si $f'(x) > 0$ pour tout $x$ de $I$, alors $f$ est **croissante** sur $I$ ;\n" +
        "- si $f'(x) < 0$ pour tout $x$ de $I$, alors $f$ est **décroissante** sur $I$ ;\n" +
        "- si $f'(x) = 0$ pour tout $x$ de $I$, alors $f$ est constante sur $I$.\n\n" +
        "**Idée de la preuve** (sens direct, démontrable) : si $f$ est croissante, tous ses taux de variation sont positifs, donc leur limite $f'(a)$ est positive ou nulle. La réciproque (du signe de $f'$ aux variations) est admise : elle s'appuie sur l'image de la tangente, qui monte quand $f' > 0$.\n\n" +
        "Sur la figure, $f(x) = x^2 - 4x + 1$ et $f'(x) = 2x - 4$ : négative avant $2$, positive après. La courbe descend puis monte.",
      exemple: {
        enonce: "$f(x) = -3x + 8$. Que dit la dérivée ?",
        solution: "$f'(x) = -3 < 0$ pour tout $x$ : $f$ est décroissante sur $\\mathbb{R}$, ce qu'on savait déjà (fonction affine de coefficient négatif)."
      }
    },
    {
      titre: "Tableau de variations et extremums",
      figure: "yr-cours-cubique",
      video: { titre: "Vidéo d'Yvan Monka : étudier les variations d'un polynôme de degré 3", youtube: "https://youtu.be/Ktc-PThiP6I" },
      texte:
        "**Méthode** pour étudier $f$ : calculer $f'(x)$, étudier son **signe** (tableau de signes, souvent après factorisation), en déduire le **tableau de variations** de $f$, et calculer les valeurs de $f$ aux bornes et là où $f'$ s'annule.\n\n" +
        "Exemple : $f(x) = x^3 - 3x$, $f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$. Racines $-1$ et $1$ ; $f' > 0$ à l'extérieur, $f' < 0$ entre. Donc $f$ croît, décroît sur $[-1\\,;1]$, puis croît. $f(-1) = 2$ est un **maximum local**, $f(1) = -2$ un **minimum local**.\n\n" +
        "Un **extremum** (maximum ou minimum) est atteint là où $f'$ **s'annule en changeant de signe**. Attention : $f'(a) = 0$ ne suffit pas ($x^3$ en $0$ : la courbe fait un palier, pas de bosse).",
      exemple: {
        enonce: "Dresse le tableau de variations de $f(x) = 2x^2 - 8x + 3$.",
        solution: "$f'(x) = 4x - 8$, nulle en $2$, négative avant, positive après : $f$ décroissante sur $]-\\infty\\,;2]$, croissante sur $[2\\,;+\\infty[$, minimum $f(2) = -5$."
      }
    },
    {
      titre: "Le tableau de signes de $f'$ en image",
      figure: "yr-cours-tabsv",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un extremum", youtube: "https://youtu.be/zxyKLqnlMIk" },
      texte:
        "Le tableau ci-dessus résume l'étude de $f(x) = x^3 - 3x$ : première ligne les valeurs de $x$, deuxième ligne le signe de $f'(x)$, troisième ligne les flèches de variation de $f$ avec les valeurs aux extremums.\n\n" +
        "Pour le lire : $f' > 0$ sur $]-\\infty\\,;-1]$, donc $f$ croît jusqu'à $2$ ; $f' < 0$ sur $[-1\\,;1]$, donc $f$ décroît de $2$ à $-2$ ; $f' > 0$ ensuite, $f$ remonte.\n\n" +
        "Réciproquement, un tableau de variations donné permet de retrouver le signe de $f'$ sur chaque intervalle."
    },
    {
      titre: "Optimiser : le meilleur choix",
      video: { titre: "Vidéo d'Yvan Monka : résoudre un problème d'optimisation", youtube: "https://youtu.be/V0gLF8iWARs" },
      texte:
        "Dans un problème d'**optimisation**, on cherche la valeur de $x$ qui rend une grandeur maximale (aire, bénéfice, volume) ou minimale (coût). Démarche :\n\n" +
        "1. exprimer la grandeur en fonction de $x$ et préciser l'intervalle d'étude ;\n" +
        "2. dériver et étudier le signe de la dérivée ;\n" +
        "3. dresser le tableau de variations ;\n" +
        "4. conclure : la valeur de $x$ et l'extremum, avec les unités.\n\n" +
        "Exemple : volume d'une boîte sans couvercle découpée dans un carré de $12$ cm, $V(x) = 4x^3 - 48x^2 + 144x$ pour $0 < x < 6$ ; $V'(x) = 12x^2 - 96x + 144 = 12(x - 2)(x - 6)$, positive avant $2$, négative entre $2$ et $6$ : volume maximal $V(2) = 128$ cm³.",
      exemple: {
        enonce: "Le bénéfice (en k€) pour $x$ tonnes est $B(x) = -2x^2 + 20x - 18$. Quelle production maximise le bénéfice ?",
        solution: "$B'(x) = -4x + 20$, nulle en $x = 5$, positive avant, négative après : bénéfice maximal pour $5$ tonnes, $B(5) = 32$ k€."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "yr-formules", titre: "Dériver un polynôme", etape: "Dériver", nb: 5 },
    { type: "yr-valeur", titre: "Calculer f'(a), tangente", etape: "Dériver", nb: 5 },
    { type: "yr-signe-variations", titre: "Signe de f' et variations (degré 2)", etape: "Variations", nb: 5 },
    { type: "yr-cubique", titre: "Variations d'un polynôme de degré 3", etape: "Variations", nb: 5 },
    { type: "yr-lecture", titre: "Lire un tableau de signes ou une courbe", etape: "Variations", nb: 4 },
    { type: "yr-optimisation", titre: "Problèmes d'optimisation", etape: "Optimiser", nb: 4 },
    { type: "yr-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "La dérivée de $f(x) = x^2$ est :", choix: ["$f'(x) = 2x$", "$f'(x) = x$", "$f'(x) = 2$", "$f'(x) = x^2$"], bonne: 0, explication: "Formule usuelle." },
    { question: "La dérivée de $f(x) = x^3$ est :", choix: ["$f'(x) = 3x^2$", "$f'(x) = x^2$", "$f'(x) = 3x$", "$f'(x) = 3x^3$"], bonne: 0, explication: "L'exposant descend devant et baisse de $1$." },
    { question: "La dérivée de $f(x) = 4x^2 - 6x + 9$ est :", choix: ["$f'(x) = 8x - 6$", "$f'(x) = 8x - 6 + 9$", "$f'(x) = 4x - 6$", "$f'(x) = 8x$"], bonne: 0, explication: "Terme à terme ; la constante $9$ disparaît." },
    { question: "La dérivée de $f(x) = -x^3 + 2x$ est :", choix: ["$f'(x) = -3x^2 + 2$", "$f'(x) = -3x^2 + 2x$", "$f'(x) = -x^2 + 2$", "$f'(x) = 3x^2 + 2$"], bonne: 0, explication: "$(-x^3)' = -3x^2$ et $(2x)' = 2$." },
    { question: "La dérivée de $f(x) = 7$ est :", choix: ["$f'(x) = 0$", "$f'(x) = 7$", "$f'(x) = 7x$", "$f'(x) = 1$"], bonne: 0, explication: "Une constante ne varie pas." },
    { question: "Pour $f(x) = x^2 - 5x$, $f'(3)$ vaut :", choix: ["$1$", "$-6$", "$6$", "$-1$"], bonne: 0, explication: "$f'(x) = 2x - 5$, $f'(3) = 1$." },
    { question: "Pour $f(x) = 2x^3$, $f'(-1)$ vaut :", choix: ["$6$", "$-6$", "$-2$", "$2$"], bonne: 0, explication: "$f'(x) = 6x^2$, $f'(-1) = 6$." },
    { question: "Si $f'(x) > 0$ sur $[1\\,;4]$, alors sur cet intervalle $f$ est :", choix: ["croissante", "décroissante", "positive", "constante"], bonne: 0, explication: "Signe positif de la dérivée : fonction croissante." },
    { question: "Si $f$ est décroissante sur $I$, alors sur $I$ :", choix: ["$f'(x) \\leqslant 0$", "$f'(x) \\geqslant 0$", "$f(x) \\leqslant 0$", "$f'(x) = 0$"], bonne: 0, explication: "Les tangentes descendent (ou sont horizontales)." },
    { question: "Pour $f(x) = x^2 - 6x + 1$, la dérivée $f'(x) = 2x - 6$ est :", choix: ["négative pour $x < 3$, positive pour $x > 3$", "positive pour $x < 3$, négative pour $x > 3$", "toujours positive", "négative pour $x < 6$"], bonne: 0, explication: "$2x - 6 = 0 \\Leftrightarrow x = 3$, coefficient $2 > 0$." },
    { question: "Donc $f(x) = x^2 - 6x + 1$ admet :", choix: ["un minimum en $x = 3$", "un maximum en $x = 3$", "un minimum en $x = 6$", "pas d'extremum"], bonne: 0, explication: "Décroissante puis croissante : minimum $f(3) = -8$." },
    { question: "Pour $f(x) = -x^2 + 8x$, le maximum de $f$ vaut :", choix: ["$16$", "$4$", "$8$", "$0$"], bonne: 0, explication: "$f'(x) = -2x + 8 = 0 \\Leftrightarrow x = 4$, et $f(4) = 16$." },
    { question: "$f'(x) = 3(x - 2)(x + 1)$. Le signe de $f'$ est :", choix: ["positif à l'extérieur de $[-1\\,;2]$, négatif entre", "négatif à l'extérieur, positif entre", "toujours positif", "positif pour $x > -1$"], bonne: 0, explication: "Coefficient $3 > 0$ : signe de $a$ à l'extérieur des racines." },
    { question: "Avec $f'(x) = 3(x - 2)(x + 1)$, la fonction $f$ est :", choix: ["croissante, puis décroissante sur $[-1\\,;2]$, puis croissante", "décroissante, puis croissante sur $[-1\\,;2]$, puis décroissante", "croissante sur $\\mathbb{R}$", "décroissante sur $\\mathbb{R}$"], bonne: 0, explication: "$f' > 0$, puis $< 0$ entre les racines, puis $> 0$." },
    { question: "Avec $f'(x) = 3(x - 2)(x + 1)$, $f$ admet :", choix: ["un maximum local en $-1$ et un minimum local en $2$", "un minimum local en $-1$ et un maximum local en $2$", "un seul extremum", "aucun extremum"], bonne: 0, explication: "En $-1$, $f'$ passe de $+$ à $-$ ; en $2$, de $-$ à $+$." },
    { question: "Si $f'(a) = 0$ mais que $f'$ ne change pas de signe en $a$, alors :", choix: ["$f$ n'a pas d'extremum en $a$", "$f$ a un maximum en $a$", "$f$ a un minimum en $a$", "$f$ est constante"], bonne: 0, explication: "Exemple : $x^3$ en $0$, simple palier." },
    { question: "Dans un tableau de variations, une flèche qui monte correspond à :", choix: ["$f' \\geqslant 0$ sur l'intervalle", "$f' \\leqslant 0$ sur l'intervalle", "$f \\geqslant 0$", "$f' = 0$"], bonne: 0, explication: "Croissante $\\Leftrightarrow$ dérivée positive." },
    { question: "Une aire $A(x) = x(30 - x) = 30x - x^2$ est maximale pour :", choix: ["$x = 15$", "$x = 30$", "$x = 0$", "$x = 10$"], bonne: 0, explication: "$A'(x) = 30 - 2x = 0 \\Leftrightarrow x = 15$, et $A'$ passe du positif au négatif." },
    { question: "Un coût $C(x) = x^2 - 12x + 50$ est minimal pour :", choix: ["$x = 6$", "$x = 12$", "$x = 50$", "$x = 3$"], bonne: 0, explication: "$C'(x) = 2x - 12$ s'annule en $6$, négative avant, positive après." },
    { question: "La tangente à $y = x^3$ au point d'abscisse $1$ a pour coefficient directeur :", choix: ["$3$", "$1$", "$0$", "$2$"], bonne: 0, explication: "$f'(x) = 3x^2$, $f'(1) = 3$." },
    { question: "$V(x) = 4x^3 - 48x^2 + 144x$ sur $]0\\,;6[$ a pour dérivée $V'(x) = 12(x - 2)(x - 6)$. Le volume est maximal pour :", choix: ["$x = 2$", "$x = 6$", "$x = 4$", "$x = 12$"], bonne: 0, explication: "$V' > 0$ avant $2$, $< 0$ entre $2$ et $6$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Dériver un polynôme",
      figure: "yr-cours-formules",
      etapes: [
        "Écrire la fonction terme par terme.",
        "Chaque $ax^n$ devient $n \\times a \\times x^{n - 1}$ : $ax^3 \\to 3ax^2$, $ax^2 \\to 2ax$, $ax \\to a$.",
        "Supprimer le terme constant (dérivée nulle).",
        "Vérifier que le degré a baissé de $1$."
      ],
      exemple: "$f(x) = 3x^3 - x^2 + 5x - 8$ : $f'(x) = 9x^2 - 2x + 5$."
    },
    {
      titre: "Étudier les variations",
      figure: "yr-cours-tabsv",
      etapes: [
        "Calculer $f'(x)$.",
        "Étudier le signe de $f'(x)$ : racine d'une expression du premier degré, ou tableau de signes d'une forme factorisée.",
        "Première ligne : $x$ et les racines ; deuxième : signe de $f'$ ; troisième : flèches de $f$.",
        "Calculer les valeurs de $f$ aux racines de $f'$ (extremums) et aux bornes."
      ],
      exemple: "$f(x) = x^3 - 12x$ : $f'(x) = 3x^2 - 12 = 3(x - 2)(x + 2)$, max local $f(-2) = 16$, min local $f(2) = -16$."
    },
    {
      titre: "Trouver un extremum",
      figure: "yr-cours-parabole",
      etapes: [
        "Résoudre $f'(x) = 0$.",
        "Vérifier que $f'$ change de signe en cette valeur ($+$ puis $-$ : maximum ; $-$ puis $+$ : minimum).",
        "Calculer l'extremum : la valeur de $f$ en ce point.",
        "Pour un polynôme de degré 2, c'est le sommet de la parabole."
      ],
      exemple: "$f(x) = -x^2 + 6x + 2$ : $f'(x) = -2x + 6$, nulle en $3$, $+$ puis $-$ : maximum $f(3) = 11$."
    },
    {
      titre: "Résoudre un problème d'optimisation",
      figure: "yr-cours-cubique",
      etapes: [
        "Modéliser : exprimer la grandeur $g(x)$ et l'intervalle des valeurs possibles de $x$.",
        "Dériver et étudier le signe de $g'(x)$ sur cet intervalle.",
        "Dresser le tableau de variations et repérer le maximum ou le minimum.",
        "Conclure dans le contexte avec les unités (valeur de $x$ et valeur optimale)."
      ],
      exemple: "Boîte : $V(x) = 4x^3 - 48x^2 + 144x$ sur $]0\\,;6[$ ; $V'(x) = 12(x - 2)(x - 6)$ ; maximum $V(2) = 128$ cm³ pour $x = 2$ cm."
    }
  ],
  erreurs: [
    "Oublier de faire baisser l'exposant : la dérivée de $x^3$ est $3x^2$, pas $3x^3$.",
    "Garder le terme constant : la dérivée de $x^2 + 5$ est $2x$.",
    "Confondre le signe de $f'$ (variations de $f$) et le signe de $f$ (position par rapport à l'axe).",
    "Conclure à un extremum dès que $f'(a) = 0$ sans vérifier le changement de signe.",
    "Donner l'abscisse à la place de la valeur de l'extremum (ou l'inverse).",
    "Se tromper dans le tableau de signes d'une forme factorisée : signe de $a$ à l'extérieur des racines.",
    "Étudier une fonction en dehors de l'intervalle imposé par le contexte.",
    "Oublier les unités dans la conclusion d'un problème d'optimisation."
  ]
};
