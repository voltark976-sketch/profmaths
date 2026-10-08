/*
  CHAPITRE : Terminale maths complémentaires — Suites arithmético-géométriques
  ----------------------------------------------------------------------------
  Chapitre 3 de la progression spiralée 2026-2027 (programme de maths complémentaires de 2019).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Vidéos d'Yvan Monka (cours de maths complémentaires 20SuitesTC2).
  Figures : "tsu-escalier", "tag-refroidissement", "tag-dette". Générateurs : tag- (et tsu-escalier).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-arithmetico-geometriques"] = {
  niveau: "Terminale maths complémentaires",
  numero: 3,
  titre: "Suites arithmético-géométriques",
  accroche: "Multiplier puis ajouter : un plat qui refroidit, une dette qu'on rembourse. Trouver la valeur d'équilibre, la formule explicite, la limite et le seuil.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Une suite qui multiplie puis ajoute",
      figure: "tsu-escalier",
      texte:
        "Une suite **arithmético-géométrique** vérifie, pour tout $n$ : $u_{n+1} = au_n + b$, avec $a$ et $b$ deux réels.\n\n" +
        "- Si $a = 1$ : $u_{n+1} = u_n + b$, suite **arithmétique**.\n" +
        "- Si $b = 0$ : $u_{n+1} = au_n$, suite **géométrique**.\n\n" +
        "Dans les autres cas, on ne peut pas calculer $u_n$ directement avec les formules des suites arithmétiques ou géométriques : on va se ramener à une suite géométrique. L'escalier (comme au chapitre 1) donne déjà une idée du comportement.",
      exemple: {
        enonce: "$u_0 = 0{,}5$ et $u_{n+1} = 0{,}5u_n + 2$. Calcule $u_1$ et $u_2$. La suite est-elle arithmétique ? géométrique ?",
        solution: "$u_1 = 2{,}25$ et $u_2 = 3{,}125$.\n\n$u_1 - u_0 = 1{,}75$ et $u_2 - u_1 = 0{,}875$ : pas arithmétique. $\\dfrac{u_1}{u_0} = 4{,}5$ et $\\dfrac{u_2}{u_1} \\approx 1{,}39$ : pas géométrique."
      }
    },
    {
      titre: "La suite constante solution",
      texte:
        "On cherche un réel $\\ell$ tel que la suite constante égale à $\\ell$ vérifie la relation : $\\ell = a\\ell + b$.\n\n" +
        "Si $a \\neq 1$ : $\\ell - a\\ell = b$, donc $\\ell = \\dfrac{b}{1 - a}$.\n\n" +
        "Sur l'escalier, $\\ell$ est l'abscisse du point d'intersection de la droite $y = ax + b$ avec la droite $y = x$. C'est souvent la **valeur d'équilibre** du phénomène (température de la pièce, population stable…).",
      exemple: {
        enonce: "Trouve la suite constante solution de $u_{n+1} = 0{,}8u_n + 5$.",
        solution: "$\\ell = 0{,}8\\ell + 5 \\iff 0{,}2\\ell = 5 \\iff \\ell = 25$. Si $u_0 = 25$, alors $u_1 = 0{,}8 \\times 25 + 5 = 25$, et ainsi de suite."
      }
    },
    {
      titre: "Toutes les solutions : la suite auxiliaire",
      video: { titre: "Vidéo d'Yvan Monka : exprimer une suite arithmético-géométrique en fonction de n", youtube: "https://youtu.be/6-vFnQ6TghM" },
      texte:
        "On pose $v_n = u_n - \\ell$ (l'écart à l'équilibre). Alors :\n\n" +
        "$v_{n+1} = u_{n+1} - \\ell = au_n + b - (a\\ell + b) = a(u_n - \\ell) = av_n$.\n\n" +
        "$(v_n)$ est **géométrique de raison $a$**, donc $v_n = v_0 \\times a^n$ avec $v_0 = u_0 - \\ell$. On en déduit la formule explicite :\n\n" +
        "$u_n = \\ell + (u_0 - \\ell) \\times a^n$.",
      exemple: {
        enonce: "$u_0 = 90$ et $u_{n+1} = 0{,}8u_n + 5$. Exprime $u_n$ en fonction de $n$.",
        solution: "$\\ell = 25$ et $v_0 = 90 - 25 = 65$. $(v_n)$ est géométrique de raison $0{,}8$ : $v_n = 65 \\times 0{,}8^n$.\n\nDonc $u_n = 25 + 65 \\times 0{,}8^n$."
      }
    },
    {
      titre: "Sens de variation",
      video: { titre: "Vidéo d'Yvan Monka : déterminer le sens de variation d'une suite arithmético-géométrique", youtube: "https://youtu.be/0CNt_fUuwEY" },
      texte:
        "Avec $u_n = \\ell + (u_0 - \\ell) \\times a^n$ et $a > 0$ :\n\n" +
        "- $a^n$ est croissante si $a > 1$, décroissante si $0 < a < 1$ ;\n" +
        "- multiplier par $u_0 - \\ell$ garde le sens si $u_0 - \\ell > 0$, l'inverse s'il est négatif ;\n" +
        "- ajouter $\\ell$ ne change pas le sens.\n\n" +
        "Exemple : $u_n = 25 + 65 \\times 0{,}8^n$ est décroissante ($0{,}8^n$ décroît et $65 > 0$).",
      exemple: {
        enonce: "Étudie le sens de variation de $u_n = 40 - 20 \\times 0{,}5^n$.",
        solution: "$0{,}5^n$ est décroissante ; multipliée par $-20 < 0$, elle devient croissante ; on ajoute $40$ : $(u_n)$ est **croissante**."
      }
    },
    {
      titre: "Limite et seuil",
      video: { titre: "Vidéo d'Yvan Monka : déterminer la limite d'une suite arithmético-géométrique", youtube: "https://youtu.be/EgYTH79sDfw" },
      texte:
        "- Si $0 < a < 1$ : $a^n \\to 0$, donc $u_n \\to \\ell$. La suite se rapproche de son équilibre.\n" +
        "- Si $a > 1$ : $a^n \\to +\\infty$, donc $u_n \\to +\\infty$ si $u_0 > \\ell$ et $u_n \\to -\\infty$ si $u_0 < \\ell$.\n\n" +
        "Pour un **seuil** (« à partir de quel rang $u_n < 30$ ? »), on calcule les termes à la calculatrice ou avec une boucle while, en s'aidant de la formule explicite.",
      exemple: {
        enonce: "$u_n = 25 + 65 \\times 0{,}8^n$. Quelle est sa limite ? À partir de quel rang a-t-on $u_n < 30$ ?",
        solution: "$0{,}8^n \\to 0$, donc $u_n \\to 25$.\n\nÀ la calculatrice : $u_{11} \\approx 30{,}6$ et $u_{12} \\approx 29{,}5$ : $u_n < 30$ à partir du rang $12$ (la suite est décroissante)."
      }
    },
    {
      titre: "Le plat qui refroidit (modèle discret de Newton)",
      figure: "tag-refroidissement",
      texte:
        "Un plat sort du four à $90$ °C dans une pièce à $25$ °C. Chaque minute, l'écart avec la pièce diminue de $20\\,\\%$ : $T_{n+1} - 25 = 0{,}8(T_n - 25)$, soit $T_{n+1} = 0{,}8T_n + 5$.\n\n" +
        "On retrouve $\\ell = 25$ (la température de la pièce) et $T_n = 25 + 65 \\times 0{,}8^n$. La température décroît et tend vers $25$ °C, sans jamais l'atteindre dans le modèle.",
      exemple: {
        enonce: "Au bout de combien de minutes le plat passe-t-il sous $40$ °C ?",
        solution: "$T_6 \\approx 42{,}0$ °C et $T_7 \\approx 38{,}6$ °C : il faut $7$ minutes."
      }
    },
    {
      titre: "Rembourser une dette",
      figure: "tag-dette",
      texte:
        "Une dette $D_0 = 3\\,000$ € coûte $1\\,\\%$ d'intérêts par mois, et on rembourse $200$ € par mois : $D_{n+1} = 1{,}01D_n - 200$.\n\n" +
        "$\\ell = \\dfrac{-200}{1 - 1{,}01} = 20\\,000$ et $D_n = 20\\,000 - 17\\,000 \\times 1{,}01^n$. Ici $a = 1{,}01 > 1$ et $D_0 < \\ell$ : la dette diminue de plus en plus vite et finit par être remboursée.\n\n" +
        "Attention : si l'on remboursait moins que les intérêts du premier mois ($30$ €), la dette augmenterait sans fin.",
      exemple: {
        enonce: "Au bout de combien de mois la dette est-elle remboursée ?",
        solution: "On cherche le premier $n$ avec $D_n \\leqslant 0$ : $D_{16} \\approx 66{,}16$ € et $D_{17} \\leqslant 0$. La dette est remboursée au bout de $17$ mois (le dernier versement est plus petit)."
      }
    },
    {
      titre: "Python : le seuil d'une suite arithmético-géométrique",
      texte:
        "```python\ndef seuil(S):\n    n = 0\n    T = 90\n    while T >= S:\n        T = 0.8 * T + 5\n        n = n + 1\n    return n\n```\n\n" +
        "seuil(40) renvoie $7$ : c'est le nombre de minutes pour que le plat passe sous $40$ °C.\n\n" +
        "Attention à la condition : si on demandait seuil(20), la boucle ne s'arrêterait jamais, car $T_n$ reste toujours au-dessus de $25$.",
      exemple: {
        enonce: "Que renvoie seuil(60) ?",
        solution: "$T_1 = 77$, $T_2 = 66{,}6$, $T_3 = 58{,}28 < 60$ : la fonction renvoie $3$."
      }
    }
  ],

  videos: [
    { titre: "Étudier graphiquement le comportement d'une suite (escalier)", type: "Escalier", youtube: "https://youtu.be/LDRx7aS9JsA" },
    { titre: "Calculer la somme des termes d'une suite géométrique (rappel)", type: "Rappel", youtube: "https://youtu.be/rIaYMXPbWE8" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "tsu-escalier", titre: "L'escalier d'une suite", etape: "Comprendre", nb: 4 },
    { type: "tag-point-fixe", titre: "La suite constante solution", etape: "Comprendre", nb: 4 },
    { type: "tag-auxiliaire", titre: "Suite auxiliaire et formule explicite", etape: "Formule explicite", nb: 5 },
    { type: "tag-limite", titre: "Limite et sens de variation", etape: "Formule explicite", nb: 5 },
    { type: "tag-contexte", titre: "Plat qui refroidit, dette à rembourser", etape: "Modéliser", nb: 4 },
    { type: "tag-python", titre: "Python : trouver un seuil", etape: "Modéliser", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Une suite vérifiant $u_{n+1} = au_n + b$ est dite :", choix: ["arithmético-géométrique", "arithmétique", "géométrique", "constante"], bonne: 0, explication: "On multiplie par $a$ puis on ajoute $b$." },
    { question: "Avec $a = 1$, la suite $u_{n+1} = au_n + b$ est :", choix: ["arithmétique", "géométrique", "constante", "décroissante"], bonne: 0, explication: "$u_{n+1} = u_n + b$." },
    { question: "La suite constante solution de $u_{n+1} = 0{,}5u_n + 3$ vaut :", choix: ["$6$", "$3$", "$1{,}5$", "$2$"], bonne: 0, explication: "$\\ell = 0{,}5\\ell + 3 \\iff 0{,}5\\ell = 3 \\iff \\ell = 6$." },
    { question: "La suite constante solution de $u_{n+1} = 0{,}9u_n + 2$ vaut :", choix: ["$20$", "$2$", "$18$", "$0{,}2$"], bonne: 0, explication: "$0{,}1\\ell = 2$." },
    { question: "La suite constante solution de $u_{n+1} = 2u_n - 5$ vaut :", choix: ["$5$", "$-5$", "$2{,}5$", "$-2{,}5$"], bonne: 0, explication: "$\\ell = 2\\ell - 5 \\iff \\ell = 5$." },
    { question: "Si $u_{n+1} = au_n + b$ et $\\ell = a\\ell + b$, alors $v_n = u_n - \\ell$ est :", choix: ["géométrique de raison $a$", "arithmétique de raison $b$", "géométrique de raison $b$", "constante"], bonne: 0, explication: "$v_{n+1} = a(u_n - \\ell) = av_n$." },
    { question: "$u_0 = 10$, $\\ell = 4$. Alors $v_0 = u_0 - \\ell =$", choix: ["$6$", "$14$", "$-6$", "$4$"], bonne: 0, explication: "$10 - 4 = 6$." },
    { question: "$\\ell = 25$, $u_0 = 90$, $a = 0{,}8$. Alors $u_n =$", choix: ["$25 + 65 \\times 0{,}8^n$", "$90 \\times 0{,}8^n$", "$25 \\times 0{,}8^n + 90$", "$65 + 25 \\times 0{,}8^n$"], bonne: 0, explication: "$u_n = \\ell + (u_0 - \\ell)a^n$." },
    { question: "$u_n = 10 + 5 \\times 0{,}6^n$. Sa limite est :", choix: ["$10$", "$15$", "$0$", "$+\\infty$"], bonne: 0, explication: "$0{,}6^n \\to 0$." },
    { question: "$u_n = 10 - 5 \\times 1{,}2^n$. Sa limite est :", choix: ["$-\\infty$", "$+\\infty$", "$10$", "$5$"], bonne: 0, explication: "$1{,}2^n \\to +\\infty$, multiplié par $-5$." },
    { question: "$u_n = 30 - 20 \\times 0{,}5^n$ est :", choix: ["croissante", "décroissante", "constante", "ni l'un ni l'autre"], bonne: 0, explication: "$0{,}5^n$ décroît ; multiplié par $-20$, il croît." },
    { question: "$u_n = 30 + 20 \\times 0{,}5^n$ est :", choix: ["décroissante", "croissante", "constante", "non monotone"], bonne: 0, explication: "$0{,}5^n$ décroît et $20 > 0$." },
    { question: "Dans le modèle $T_{n+1} = 0{,}8T_n + 5$ d'un plat qui refroidit, $\\ell = 25$ représente :", choix: ["la température de la pièce", "la température de départ", "la baisse par minute", "le temps de refroidissement"], bonne: 0, explication: "La température tend vers $25$ °C, celle de la pièce." },
    { question: "Une dette à $1\\,\\%$ par mois avec $200$ € remboursés par mois vérifie :", choix: ["$D_{n+1} = 1{,}01D_n - 200$", "$D_{n+1} = 1{,}01D_n + 200$", "$D_{n+1} = 0{,}01D_n - 200$", "$D_{n+1} = D_n - 200$"], bonne: 0, explication: "Intérêts (×1,01) puis remboursement (−200)." },
    { question: "Si $0 < a < 1$, la suite $u_{n+1} = au_n + b$ :", choix: ["tend vers $\\ell = \\dfrac{b}{1 - a}$", "tend vers $+\\infty$", "tend vers $b$", "n'a pas de limite"], bonne: 0, explication: "$a^n \\to 0$." },
    { question: "$u_{n+1} = 0{,}5u_n + 2$ avec $u_0 = 4$. Alors :", choix: ["$u_n = 4$ pour tout $n$", "$u_n \\to 0$", "$u_n \\to +\\infty$", "$u_1 = 2$"], bonne: 0, explication: "$u_0 = \\ell = 4$ : la suite est constante." },
    { question: "Pour trouver le premier rang où $u_n < 30$, on peut :", choix: ["utiliser une boucle while ou le tableau de la calculatrice", "calculer seulement $u_0$", "résoudre $\\ell = 30$", "calculer $a + b$"], bonne: 0, explication: "On calcule les termes jusqu'à franchir le seuil." },
    { question: "La boucle « while T >= 20 » pour $T_{n+1} = 0{,}8T_n + 5$ ($T_0 = 90$) :", choix: ["ne s'arrête jamais", "s'arrête au rang $5$", "s'arrête au rang $1$", "renvoie $25$"], bonne: 0, explication: "$T_n$ reste au-dessus de $25$ : la condition reste toujours vraie." },
    { question: "$\\ell = \\dfrac{b}{1 - a}$ est l'abscisse du point d'intersection de :", choix: ["la droite $y = ax + b$ et la droite $y = x$", "la droite $y = ax + b$ et l'axe des abscisses", "la droite $y = x$ et l'axe des ordonnées", "deux paraboles"], bonne: 0, explication: "$\\ell$ vérifie $a\\ell + b = \\ell$." },
    { question: "$u_n = 5 + 3 \\times 2^n$. Alors $u_3 =$", choix: ["$29$", "$53$", "$11$", "$64$"], bonne: 0, explication: "$5 + 3 \\times 8 = 29$." },
    { question: "$v_n = u_n - 10$ est géométrique de raison $0{,}5$ et $v_0 = 8$. Alors $u_2 =$", choix: ["$12$", "$2$", "$4$", "$18$"], bonne: 0, explication: "$v_2 = 8 \\times 0{,}25 = 2$, donc $u_2 = 12$." },
    { question: "Pour une suite arithmético-géométrique avec $a > 1$ et $u_0 > \\ell$, la limite est :", choix: ["$+\\infty$", "$-\\infty$", "$\\ell$", "$0$"], bonne: 0, explication: "$(u_0 - \\ell)a^n \\to +\\infty$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Étudier $u_{n+1} = au_n + b$ ($a \\neq 1$)",
      etapes: ["Chercher $\\ell$ : $\\ell = a\\ell + b$, donc $\\ell = \\dfrac{b}{1 - a}$.", "Poser $v_n = u_n - \\ell$ et montrer que $v_{n+1} = av_n$.", "Écrire $v_n = (u_0 - \\ell)a^n$, puis $u_n = \\ell + (u_0 - \\ell)a^n$."],
      exemple: "$u_0 = 90$, $u_{n+1} = 0{,}8u_n + 5$ : $\\ell = 25$, $u_n = 25 + 65 \\times 0{,}8^n$."
    },
    {
      titre: "Limite et sens de variation",
      etapes: ["Regarder $a^n$ : vers $0$ si $0 < a < 1$, vers $+\\infty$ si $a > 1$.", "Tenir compte du signe de $u_0 - \\ell$.", "Ajouter $\\ell$ ne change ni le sens de variation ni le type de limite."],
      exemple: "$40 - 20 \\times 0{,}5^n$ : croissante, limite $40$."
    },
    {
      titre: "Modéliser une situation",
      etapes: ["Traduire l'énoncé : « on multiplie par… puis on ajoute (ou retire)… ».", "Interpréter $\\ell$ : l'équilibre du phénomène.", "Répondre à la question (limite, seuil) par une phrase dans le contexte."],
      exemple: "Plat : $T_{n+1} = 0{,}8T_n + 5$, équilibre à $25$ °C, sous $40$ °C après $7$ minutes."
    }
  ],
  erreurs: [
    "Confondre la relation $u_{n+1} = au_n + b$ avec une suite géométrique de raison $a$.",
    "Oublier de soustraire $\\ell$ : c'est $v_n = u_n - \\ell$ qui est géométrique, pas $u_n$.",
    "Mal calculer $\\ell$ : $\\ell - a\\ell = b$ donne $\\ell = \\dfrac{b}{1 - a}$, pas $\\dfrac{b}{1 + a}$.",
    "Oublier d'ajouter $\\ell$ à la fin : $u_n = \\ell + (u_0 - \\ell)a^n$.",
    "Écrire une boucle while qui ne s'arrête jamais (seuil impossible à atteindre).",
    "Additionner les intérêts au lieu de multiplier par $1 + t$."
  ]
};
