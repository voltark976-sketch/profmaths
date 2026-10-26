/*
  CHAPITRE : Seconde — Fonctions affines, inégalités et inéquations
  ------------------------------------------------------------------
  Chapitre 6 de la progression spiralée 2026-2027 (programme de Seconde 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce, programme Python entre ```python et ```).
  Vidéos : la playlist « Secondes : fonctions affines, inégalités et inéquations » de la chaîne d'abord, Yvan Monka en complément.
  PDF : cours d'Yvan Monka, à remplacer dans pdfs par le PDF du Drive quand il existera.
  Les générateurs d'exercices commencent par « fa- » dans assets/exercices.js, comme les figures fa-cours-…, fa-meth-…, fa-qcm-…
  (taxis est dans les schémas des cours de Seconde ; le chapitre reprend aussi am-reconnaitre).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-fonctions-affines"] = {
  niveau: "Seconde",
  numero: 6,
  titre: "Fonctions affines, inégalités et inéquations",
  accroche: "Une droite, un taux d'accroissement, un signe : modéliser un tarif ou un forfait, puis résoudre des inéquations pour comparer.",

  playlist: "https://www.youtube.com/playlist?list=PLTXX1uJ8ZJvg", // playlist « Secondes : fonctions affines, inégalités et inéquations »
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : inéquations et tableaux de signes (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Equations_InequationsM2.pdf" }
  ],
  liens: [
    { titre: "Le cours sur les inéquations en vidéo (Yvan Monka)", url: "https://youtu.be/kbTWwWQ9tYo", type: "video" },
    { titre: "Démontrer les variations des fonctions affines (Yvan Monka)", url: "https://youtu.be/sovePsrmcYw", type: "video" },
    { titre: "Effectuer des opérations sur les inégalités (Yvan Monka)", url: "https://youtu.be/6I4MbRM0pqs", type: "video" },
    { titre: "Dresser le tableau de signes d'une fonction affine (Yvan Monka)", url: "https://youtu.be/zZ9SbX8mC2o", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Fonction affine et taux d'accroissement",
      figure: "fa-cours-droite",
      video: { titre: "Vidéo de ton prof : fonction affine, définition, droite et taux d'accroissement (cours)", youtube: "https://youtu.be/WKrmfnGNrgE" },
      texte:
        "Une fonction **affine** est définie sur $\\mathbb{R}$ par $f(x) = mx + p$, où $m$ et $p$ sont deux réels. Sa courbe est une **droite**.\n\n" +
        "- $p = f(0)$ est l'**ordonnée à l'origine** : la droite coupe l'axe des ordonnées au point $(0\\,;p)$.\n" +
        "- $m$ est le **taux d'accroissement** (ou coefficient directeur) : quand $x$ augmente de $1$, $f(x)$ augmente de $m$.\n" +
        "- Pour deux réels $a \\neq b$ : $m = \\dfrac{f(b) - f(a)}{b - a}$. Les **accroissements** de $f(x)$ sont **proportionnels** à ceux de $x$.\n\n" +
        "Cas particuliers : si $p = 0$, $f(x) = mx$ est **linéaire** (droite qui passe par l'origine) ; si $m = 0$, $f$ est **constante**.\n\n" +
        "Sur la figure, $y = 2x - 1$ : la droite coupe l'axe des ordonnées en $p = -1$, et quand $x$ augmente de $1$, $y$ augmente de $m = 2$.",
      exemple: {
        enonce: "$f$ est affine, avec $f(1) = 5$ et $f(4) = -1$. Déterminer $f(x)$.",
        solution: "$m = \\dfrac{-1 - 5}{4 - 1} = \\dfrac{-6}{3} = -2$, donc $f(x) = -2x + p$.\n\n$f(1) = 5$ : $-2 + p = 5$, donc $p = 7$. Ainsi $f(x) = -2x + 7$."
      }
    },
    {
      titre: "Sens de variation d'une fonction affine",
      figure: "fa-cours-variations",
      video: { titre: "Vidéo de ton prof : variations et signe d'une fonction affine (cours)", youtube: "https://youtu.be/M6V8r6jItOU" },
      texte:
        "**Propriété** : la fonction affine $f(x) = mx + p$ est\n" +
        "- **croissante** sur $\\mathbb{R}$ si $m > 0$ : sa droite monte ;\n" +
        "- **décroissante** sur $\\mathbb{R}$ si $m < 0$ : sa droite descend ;\n" +
        "- **constante** sur $\\mathbb{R}$ si $m = 0$ : sa droite est horizontale.\n\n" +
        "**Démonstration** (cas $m > 0$). Soit $a < b$ deux réels. $f(b) - f(a) = (mb + p) - (ma + p) = m(b - a)$.\n" +
        "Or $b - a > 0$ et $m > 0$, donc $f(b) - f(a) > 0$, c'est-à-dire $f(a) < f(b)$ : les images sont rangées dans le même ordre, $f$ est croissante. Si $m < 0$, le produit $m(b - a)$ est négatif et l'ordre s'inverse.\n\n" +
        "**Comparer deux images sans calculer** : une fonction croissante conserve l'ordre, une fonction décroissante l'inverse.",
      exemple: {
        enonce: "Donner le sens de variation de $f(x) = 5 - 3x$, puis comparer $f(\\sqrt{2})$ et $f(1{,}4)$ sans les calculer.",
        solution: "$f(x) = -3x + 5$ : $m = -3 < 0$, $f$ est décroissante sur $\\mathbb{R}$.\n\n$\\sqrt{2} \\approx 1{,}414 > 1{,}4$ et $f$ inverse l'ordre, donc $f(\\sqrt{2}) < f(1{,}4)$."
      }
    },
    {
      titre: "Signe d'une fonction affine",
      figure: "fa-cours-signe",
      video: { titre: "Vidéo de ton prof : variations et signe d'une fonction affine (exercice corrigé)", youtube: "https://youtu.be/Ayn6Oyqpdf0" },
      texte:
        "Si $m \\neq 0$, $f(x) = mx + p$ s'annule en une seule valeur : $mx + p = 0 \\iff x = -\\dfrac{p}{m}$.\n\n" +
        "- Si $m > 0$, $f(x)$ est **négatif** avant $-\\dfrac{p}{m}$ et **positif** après.\n" +
        "- Si $m < 0$, c'est l'inverse : positif, puis négatif.\n\n" +
        "On résume dans un **tableau de signes** : première ligne les valeurs de $x$, deuxième ligne le signe de $f(x)$, avec un $0$ sous $-\\dfrac{p}{m}$.\n\n" +
        "Sur la droite : $f(x) > 0$ là où la droite est **au-dessus** de l'axe des abscisses. Le sens de variation, le signe et la droite racontent la même histoire.",
      exemple: {
        enonce: "Dresser le tableau de signes de $f(x) = -2x + 6$.",
        solution: "$-2x + 6 = 0 \\iff x = 3$. Comme $m = -2 < 0$ : $f(x) > 0$ pour $x < 3$, $f(3) = 0$, et $f(x) < 0$ pour $x > 3$.",
        tableau: { var: "x", nom: "\\text{signe de } f(x)", x: ["-\\infty", "3", "+\\infty"], y: ["+", "0", "-"] }
      }
    },
    {
      titre: "Opérations sur les inégalités",
      figure: "fa-cours-encadrer",
      video: { titre: "Vidéo de ton prof : inégalités, règles de calcul, encadrer, négation (cours)", youtube: "https://youtu.be/3RLv4QjKrAo" },
      texte:
        "Pour des réels $a$, $b$, $c$, $d$ :\n" +
        "- on peut **ajouter** un même nombre aux deux membres : si $a < b$, alors $a + c < b + c$ ;\n" +
        "- on peut **additionner** membre à membre deux inégalités de même sens : si $a < b$ et $c < d$, alors $a + c < b + d$ ;\n" +
        "- en **multipliant** par un réel **positif**, le sens est **conservé** : si $a < b$ et $k > 0$, alors $ka < kb$ ;\n" +
        "- en multipliant par un réel **négatif**, le sens **change** : si $a < b$ et $k < 0$, alors $ka > kb$.\n\n" +
        "Attention : on ne peut pas soustraire ni multiplier membre à membre deux inégalités.\n\n" +
        "C'est le sens de variation d'une fonction affine : sur la figure, $x \\mapsto -3x + 1$ est décroissante, donc quand $x$ va de $2$ à $5$, son image va de $-5$ à $-14$ : l'ordre est inversé.",
      exemple: {
        enonce: "On sait que $2 \\leqslant x \\leqslant 5$. Encadrer $-3x + 1$.",
        solution: "On multiplie par $-3 < 0$, le sens change : $-15 \\leqslant -3x \\leqslant -6$.\n\nOn ajoute $1$ : $-14 \\leqslant -3x + 1 \\leqslant -5$."
      }
    },
    {
      titre: "Inéquations du premier degré",
      figure: "fa-cours-inequation",
      video: { titre: "Vidéo de ton prof : résoudre une inéquation du premier degré (cours)", youtube: "https://youtu.be/MJMs93lk-mg" },
      texte:
        "On résout $ax + b < cx + d$ comme une équation, avec une seule différence : **diviser ou multiplier par un nombre négatif change le sens** de l'inégalité.\n\n" +
        "L'ensemble des solutions est un **intervalle**, à écrire avec les bons crochets :\n" +
        "- $x > 2$ : $S = \\,]2\\,;+\\infty[$ ;\n" +
        "- $x \\leqslant -1$ : $S = \\,]-\\infty\\,;-1]$.\n\n" +
        "Si les $x$ disparaissent, il reste une inégalité entre deux nombres : vraie, $S = \\mathbb{R}$ ; fausse, $S = \\varnothing$.\n\n" +
        "**Négation** : le contraire de « $x < 3$ » est « $x \\geqslant 3$ » (et non « $x > 3$ »). Le contraire de « A **et** B » est « non A **ou** non B ».",
      exemple: {
        enonce: "Résoudre $2x - 7 \\geqslant 5x + 2$.",
        solution: "$2x - 5x \\geqslant 2 + 7 \\iff -3x \\geqslant 9 \\iff x \\leqslant -3$ (on divise par $-3 < 0$, le sens change).\n\n$S = \\,]-\\infty\\,;-3]$, l'intervalle colorié sur la droite graduée de la figure."
      }
    },
    {
      titre: "Modéliser par une fonction affine ou une inéquation",
      figure: "taxis",
      video: { titre: "Vidéo de ton prof : modéliser un problème par une inéquation (cours)", youtube: "https://youtu.be/_dYPruRxKPs" },
      texte:
        "Un **tarif** avec une partie fixe et une partie proportionnelle est une fonction affine : prix $=$ (prix par unité) $\\times x$ $+$ (partie fixe).\n\n" +
        "Pour comparer deux tarifs $f$ et $g$ :\n" +
        "- on écrit les deux expressions ;\n" +
        "- on résout $f(x) = g(x)$ pour trouver le seuil, puis $f(x) < g(x)$ pour savoir quand $f$ est moins chère ;\n" +
        "- on vérifie sur le graphique : la droite la plus **basse** correspond au tarif le moins cher.\n\n" +
        "Avec un budget $B$, on cherche les $x$ tels que $f(x) \\leqslant B$ : c'est une inéquation.",
      exemple: {
        enonce: "Taxi A : $10$ € de prise en charge puis $2$ € par km. Taxi B : $4$ € puis $2{,}50$ € par km. Pour quelles distances A est-il moins cher ?",
        solution: "$A(x) = 2x + 10$ et $B(x) = 2{,}5x + 4$.\n\n$2x + 10 < 2{,}5x + 4 \\iff 6 < 0{,}5x \\iff x > 12$.\n\nLe taxi A est moins cher pour les courses de plus de $12$ km."
      }
    },
    {
      titre: "Python : la boucle for",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les boucles en Python", youtube: "https://youtu.be/i_imOJ9Vw0U" },
      texte:
        "La boucle $\\texttt{for}$ répète des instructions un **nombre de fois connu à l'avance**. $\\texttt{range(a, b)}$ donne les entiers de $a$ à $b - 1$ ($b$ est exclu).\n\n" +
        "Tableau de valeurs de $f(x) = 2x - 1$ pour $x$ allant de $-2$ à $3$ :\n\n" +
        "```python\ndef f(x):\n    return 2 * x - 1\n\nfor x in range(-2, 4):\n    print(x, f(x))\n```",
      exemple: {
        enonce: "Combien de lignes ce programme affiche-t-il ? Quelle est la dernière ?",
        solution: "$x$ prend les valeurs $-2$, $-1$, $0$, $1$, $2$, $3$ : $6$ lignes. La dernière est $\\texttt{3 5}$, car $f(3) = 5$."
      }
    }
  ],

  /* Exercices corrigés en vidéo (playlist « Secondes : fonctions affines, inégalités et inéquations ») */
  videos: [
    { titre: "#02 Lire et tracer une droite (fonction affine)", type: "Droite", youtube: "https://youtu.be/NILT9Qt-OwQ" },
    { titre: "#03 Fonction affine : le prix d'une course de taxi", type: "Modéliser", youtube: "https://youtu.be/66SEM_hm4kU" },
    { titre: "#05 Encadrer une expression pas à pas", type: "Inégalités", youtube: "https://youtu.be/sVltwXnsMzs" },
    { titre: "#06 Vrai ou faux sur les inégalités : le contre-exemple", type: "Inégalités", youtube: "https://youtu.be/0sntftNvjKc" },
    { titre: "#09 Comparer deux images sans calculer", type: "Variations", youtube: "https://youtu.be/cEXHRfdN68k" },
    { titre: "#11 Six inéquations, dont une sans solution", type: "Inéquations", youtube: "https://youtu.be/mIhCpSfc-Lk" },
    { titre: "#12 Inéquation : résolution graphique puis par le calcul", type: "Inéquations", youtube: "https://youtu.be/wbcQ8nopOw8" },
    { titre: "#14 Quel forfait téléphonique choisir ?", type: "Modéliser", youtube: "https://youtu.be/RA_bN2OUt80" },
    { titre: "#15 Barge sur le lagon : quelle formule choisir ?", type: "Synthèse", youtube: "https://youtu.be/2v2mwZQiB00" },
    { titre: "Automatismes #18 : reconnaître une fonction affine", type: "Fonctions affines", youtube: "https://youtu.be/hfiPikWtwoA" }
  ],
  videosNote: "Vidéos de ton prof : playlist « Secondes : fonctions affines, inégalités et inéquations » ; la dernière vient de la playlist « Secondes : automatismes ».",

  /* ---------- 2. EXERCICES INTERACTIFS ----------
     Chaque série tire des nombres au hasard : on peut la refaire autant qu'on veut.
     type : nom du générateur (voir assets/exercices.js). nb : nombre de questions. */
  exercices: [
    { type: "am-reconnaitre", titre: "Reconnaître une fonction affine", etape: "Fonctions affines", nb: 4 },
    { type: "fa-taux", titre: "Calculer le taux d'accroissement $m$", etape: "Fonctions affines", nb: 5 },
    { type: "fa-expression", titre: "Retrouver $f(x) = mx + p$", etape: "Fonctions affines", nb: 4 },
    { type: "fa-lire", titre: "Lire une droite : $m$, $p$, équation", etape: "Fonctions affines", nb: 5 },
    { type: "fa-variations", titre: "Sens de variation, comparer des images", etape: "Variations et signe", nb: 5 },
    { type: "fa-signe", titre: "Signe d'une fonction affine", etape: "Variations et signe", nb: 5 },
    { type: "fa-inegalite", titre: "Opérations sur les inégalités, encadrer", etape: "Inéquations", nb: 6 },
    { type: "fa-inequation", titre: "Résoudre une inéquation", etape: "Inéquations", nb: 6 },
    { type: "fa-negation", titre: "Négation, « et », « ou »", etape: "Inéquations", nb: 4 },
    { type: "fa-modele", titre: "Comparer des tarifs, modéliser", etape: "Modéliser", nb: 4 },
    { type: "fa-python", titre: "Python : la boucle for", etape: "Modéliser", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ----------
     bonne : numéro de la bonne réponse en partant de 0 (0 = la première). */
  qcm: [
    {
      question: "Laquelle de ces fonctions est affine ?",
      choix: ["$f(x) = 3 - \\dfrac{x}{2}$", "$f(x) = \\dfrac{3}{x}$", "$f(x) = x^2 + 1$", "$f(x) = \\sqrt{x}$"],
      bonne: 0,
      explication: "$3 - \\dfrac{x}{2} = -\\dfrac{1}{2}x + 3$ est de la forme $mx + p$. Les autres ont $x$ au dénominateur, au carré ou sous une racine."
    },
    {
      question: "$f$ est affine, $f(2) = 7$ et $f(5) = 1$. Son taux d'accroissement est :",
      choix: ["$-2$", "$2$", "$-\\dfrac{1}{2}$", "$-6$"],
      bonne: 0,
      explication: "$m = \\dfrac{f(5) - f(2)}{5 - 2} = \\dfrac{1 - 7}{3} = -2$."
    },
    {
      question: "L'ordonnée à l'origine de $f(x) = -4x + 9$ est :",
      choix: ["$9$", "$-4$", "$\\dfrac{9}{4}$", "$0$"],
      bonne: 0,
      explication: "C'est $p = f(0) = 9$ : la droite coupe l'axe des ordonnées en $(0\\,;9)$."
    },
    {
      question: "La fonction $f(x) = 2 - 5x$ est :",
      choix: ["décroissante sur $\\mathbb{R}$", "croissante sur $\\mathbb{R}$", "constante", "croissante puis décroissante"],
      bonne: 0,
      explication: "$f(x) = -5x + 2$ : $m = -5 < 0$, donc $f$ est décroissante. L'ordre d'écriture ne change rien, seul le signe du coefficient de $x$ compte."
    },
    {
      question: "$f(x) = 3x - 12$ est positive pour :",
      choix: ["$x \\geqslant 4$", "$x \\leqslant 4$", "$x \\geqslant -4$", "$x \\geqslant 12$"],
      bonne: 0,
      explication: "$3x - 12 \\geqslant 0 \\iff x \\geqslant 4$. Avec $m = 3 > 0$, $f$ est négative avant $4$ et positive après."
    },
    {
      question: "Si $a < b$, alors :",
      choix: ["$-2a > -2b$", "$-2a < -2b$", "$a - 2 > b - 2$", "$\\dfrac{a}{2} > \\dfrac{b}{2}$"],
      bonne: 0,
      explication: "Multiplier par $-2 < 0$ change le sens. Ajouter $-2$ ou diviser par $2 > 0$ le conserve."
    },
    {
      question: "Si $1 \\leqslant x \\leqslant 3$, alors $-2x + 5$ est compris entre :",
      choix: ["$-1$ et $3$", "$3$ et $7$", "$-1$ et $11$", "$7$ et $11$"],
      bonne: 0,
      explication: "$-6 \\leqslant -2x \\leqslant -2$ (le sens change), puis $-1 \\leqslant -2x + 5 \\leqslant 3$."
    },
    {
      question: "L'ensemble des solutions de $-3x + 6 > 0$ est :",
      choix: ["$]-\\infty\\,;2[$", "$]2\\,;+\\infty[$", "$]-\\infty\\,;-2[$", "$]-\\infty\\,;2]$"],
      bonne: 0,
      explication: "$-3x > -6 \\iff x < 2$ (on divise par $-3$, le sens change). Inégalité stricte : $2$ est exclu."
    },
    {
      question: "La négation de « $x < 5$ » est :",
      choix: ["$x \\geqslant 5$", "$x > 5$", "$x \\leqslant 5$", "$x < -5$"],
      bonne: 0,
      explication: "Si $x$ n'est pas strictement inférieur à $5$, il peut être égal à $5$ ou plus grand : $x \\geqslant 5$."
    },
    {
      question: "Un forfait coûte $15$ € par mois plus $0{,}10$ € par SMS. Le prix pour $x$ SMS est :",
      choix: ["$0{,}1x + 15$", "$15x + 0{,}1$", "$15{,}1x$", "$0{,}1(x + 15)$"],
      bonne: 0,
      explication: "La partie fixe ($15$ €) est l'ordonnée à l'origine, le prix par SMS ($0{,}10$ €) est le taux d'accroissement."
    },
    {
      question: "Que contient $\\texttt{range(1, 5)}$ en Python ?",
      choix: ["$1$, $2$, $3$, $4$", "$1$, $2$, $3$, $4$, $5$", "$0$, $1$, $2$, $3$, $4$", "$2$, $3$, $4$, $5$"],
      bonne: 0,
      explication: "$\\texttt{range(a, b)}$ commence à $a$ et s'arrête **avant** $b$."
    },
    { question: "La fonction $f(x) = -3x$ est :", choix: ["linéaire : sa droite passe par l'origine", "constante", "affine, mais pas linéaire", "ni affine, ni linéaire"], bonne: 0, explication: "$f(x) = -3x + 0$ : $p = 0$, c'est une fonction linéaire (cas particulier de fonction affine), et $f(0) = 0$." },
    { question: "$f(x) = 4$ pour tout réel $x$. Alors $f$ est :", choix: ["affine, avec $m = 0$ et $p = 4$", "linéaire, de coefficient $4$", "affine, avec $m = 4$ et $p = 0$", "une fonction qui n'est pas affine"], bonne: 0, explication: "$f(x) = 0x + 4$ : c'est une fonction constante, cas particulier d'affine. Sa droite est horizontale." },
    { question: "$f$ est affine, avec $f(0) = 3$ et $f(2) = 11$. Alors $f(x)$ vaut :", choix: ["$4x + 3$", "$3x + 4$", "$8x + 3$", "$4x + 11$"], bonne: 0, explication: "$p = f(0) = 3$ et $m = \\dfrac{11 - 3}{2 - 0} = 4$. ($8x + 3$ oublie de diviser par $2 - 0$.)" },
    { question: "$f(x) = 3x - 2$. Quand $x$ augmente de $5$, $f(x)$ :", choix: ["augmente de $15$", "augmente de $3$", "augmente de $13$", "augmente de $5$"], bonne: 0, explication: "Les accroissements de $f(x)$ sont proportionnels à ceux de $x$, de coefficient $m = 3$ : $3 \\times 5 = 15$." },
    { question: "Dans la démonstration du sens de variation d'une fonction affine, $f(b) - f(a)$ est égal à :", choix: ["$m(b - a)$", "$m(b + a)$", "$m(b - a) + 2p$", "$b - a$"], bonne: 0, explication: "$(mb + p) - (ma + p) = mb - ma = m(b - a)$ : les $p$ s'éliminent. Son signe est donc celui de $m$ quand $a < b$." },
    { question: "La fonction $f(x) = 4x + 10$ s'annule en :", choix: ["$-2{,}5$", "$2{,}5$", "$-0{,}4$", "$-10$"], bonne: 0, explication: "$4x + 10 = 0 \\iff x = -\\dfrac{10}{4} = -2{,}5$." },
    { question: "Le signe de $f(x) = -x + 2$ est :", choix: ["$+$ avant $2$, $0$ en $2$, $-$ après", "$-$ avant $2$, $0$ en $2$, $+$ après", "$+$ avant $-2$, $0$ en $-2$, $-$ après", "$-$ avant $-2$, $0$ en $-2$, $+$ après"], bonne: 0, explication: "$-x + 2 = 0 \\iff x = 2$, et $m = -1 < 0$ : positif puis négatif. Par exemple $f(0) = 2 > 0$." },
    { question: "Si $a < b$ et $c < d$, on peut affirmer que :", choix: ["$a + c < b + d$", "$a - c < b - d$", "$ac < bd$", "$a - d > b - c$"], bonne: 0, explication: "On peut additionner membre à membre deux inégalités de même sens. On ne peut ni les soustraire ni les multiplier membre à membre." },
    { question: "Si $-1 \\leqslant x \\leqslant 4$, alors $3x - 2$ est compris entre :", choix: ["$-5$ et $10$", "$-3$ et $12$", "$-5$ et $14$", "$-1$ et $10$"], bonne: 0, explication: "On multiplie par $3 > 0$ : $-3 \\leqslant 3x \\leqslant 12$, puis on retire $2$ : $-5 \\leqslant 3x - 2 \\leqslant 10$." },
    { question: "$-4x < 12$ équivaut à :", choix: ["$x > -3$", "$x < -3$", "$x > 3$", "$x < 3$"], bonne: 0, explication: "On divise par $-4 < 0$ : le sens de l'inégalité change, et $\\dfrac{12}{-4} = -3$." },
    { question: "L'ensemble des solutions de $5 - 2x \\leqslant 3x + 15$ est :", choix: ["$[-2\\,;+\\infty[$", "$]-\\infty\\,;-2]$", "$[2\\,;+\\infty[$", "$]-2\\,;+\\infty[$"], bonne: 0, explication: "$5 - 15 \\leqslant 3x + 2x \\iff -10 \\leqslant 5x \\iff x \\geqslant -2$. Inégalité large : $-2$ est inclus." },
    { question: "L'ensemble des réels $x$ tels que $x \\geqslant -1$ s'écrit :", choix: ["$[-1\\,;+\\infty[$", "$]-1\\,;+\\infty[$", "$[-1\\,;+\\infty]$", "$]-\\infty\\,;-1]$"], bonne: 0, explication: "$-1$ est inclus (crochet fermé) ; du côté de l'infini, le crochet est toujours ouvert." },
    { question: "La négation de « $x \\geqslant 2$ et $x < 7$ » est :", choix: ["$x < 2$ ou $x \\geqslant 7$", "$x < 2$ et $x \\geqslant 7$", "$x \\leqslant 2$ ou $x > 7$", "$x > 2$ et $x < 7$"], bonne: 0, explication: "Le contraire de « A et B » est « non A ou non B ». Non ($x \\geqslant 2$) : $x < 2$ ; non ($x < 7$) : $x \\geqslant 7$." },
    { question: "Location de kayak à Sakouli : tarif A, $5$ € plus $3$ € par heure ; tarif B, $8$ € par heure. Le tarif A est moins cher quand la location dure :", choix: ["plus d'une heure", "moins d'une heure", "n'importe quelle durée", "exactement une heure"], bonne: 0, explication: "$3x + 5 < 8x \\iff 5 < 5x \\iff x > 1$. Pour une heure pile, les deux tarifs coûtent $8$ €." },
    { question: "Dans le programme du cours, on remplace $\\texttt{range(-2, 4)}$ par $\\texttt{range(-2, 6)}$. La dernière ligne affichée est :", choix: ["$\\texttt{5 9}$", "$\\texttt{6 11}$", "$\\texttt{3 5}$", "$\\texttt{4 7}$"], bonne: 0, explication: "$\\texttt{range(-2, 6)}$ s'arrête à $5$ ($6$ est exclu), et $f(5) = 2 \\times 5 - 1 = 9$ : la ligne affiche $x$ puis $f(x)$." },
    { question: "La droite $d$ de la figure représente la fonction affine $f$. Son expression est :", figure: "fa-qcm-lire", choix: ["$f(x) = -2x + 3$", "$f(x) = 3x - 2$", "$f(x) = 2x + 3$", "$f(x) = -\\dfrac{1}{2}x + 3$"], bonne: 0, explication: "La droite coupe l'axe des ordonnées en $3$ : $p = 3$. Quand on avance de $1$, elle descend de $2$ : $m = -2$. Donc $f(x) = -2x + 3$." },
    { question: "La droite $d$ de la figure représente une fonction affine $f$. On a $f(x) < 0$ pour :", figure: "fa-qcm-signe", choix: ["$x < 2$", "$x > 2$", "$x < -2$", "$x > -2$"], bonne: 0, explication: "La droite coupe l'axe des abscisses en $2$ et elle monte : elle est en dessous de l'axe avant $2$. Donc $f(x) < 0$ pour $x < 2$." },
    { question: "D'après la figure, l'ensemble des solutions de $f(x) \\leqslant g(x)$ est :", figure: "fa-qcm-inequation", choix: ["$]-\\infty\\,;2]$", "$[2\\,;+\\infty[$", "$]-\\infty\\,;3]$", "$]-\\infty\\,;2[$"], bonne: 0, explication: "Les droites se coupent au point d'abscisse $2$ ; avant $2$, la droite de $f$ est en dessous de celle de $g$. Inégalité large : $2$ est inclus." },
    { question: "Taxi A : $12$ € de prise en charge puis $2$ € par km ; taxi B : $4$ € puis $3$ € par km (voir la figure). Le taxi A est moins cher pour les courses de :", figure: "fa-qcm-tarifs", choix: ["plus de $8$ km", "moins de $8$ km", "plus de $16$ km", "moins de $4$ km"], bonne: 0, explication: "$2x + 12 < 3x + 4 \\iff 8 < x$. Après le point d'intersection (à $8$ km), la droite du taxi A est la plus basse." },
    { question: "Sur la figure, $x \\mapsto -3x + 1$ est tracée pour $2 \\leqslant x \\leqslant 5$. Pour ces valeurs de $x$ :", figure: "fa-cours-encadrer", choix: ["$-14 \\leqslant -3x + 1 \\leqslant -5$", "$-5 \\leqslant -3x + 1 \\leqslant 16$", "$7 \\leqslant -3x + 1 \\leqslant 16$", "$-15 \\leqslant -3x + 1 \\leqslant -6$"], bonne: 0, explication: "On multiplie par $-3 < 0$ (le sens change) : $-15 \\leqslant -3x \\leqslant -6$, puis on ajoute $1$. La fonction est décroissante : l'ordre est inversé." },
    { question: "Soit $f(x) = -2x + 7$. Sans calculer, on peut affirmer que :", choix: ["$f(\\sqrt{5}) < f(2{,}2)$", "$f(\\sqrt{5}) > f(2{,}2)$", "$f(\\sqrt{5}) = f(2{,}2)$", "on ne peut rien affirmer"], bonne: 0, explication: "$\\sqrt{5} \\approx 2{,}236 > 2{,}2$ et $f$ est décroissante ($m = -2 < 0$) : elle inverse l'ordre, donc $f(\\sqrt{5}) < f(2{,}2)$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Déterminer l'expression d'une fonction affine",
      etapes: [
        "Calculer $m = \\dfrac{f(b) - f(a)}{b - a}$ avec les deux valeurs connues.",
        "Remplacer dans $f(a) = ma + p$ pour trouver $p$.",
        "Vérifier avec la seconde valeur."
      ],
      exemple: "$f(1) = 5$, $f(4) = -1$ : $m = -2$, $p = 7$, $f(x) = -2x + 7$."
    },
    {
      titre: "Lire $m$ et $p$ sur une droite",
      figure: "fa-meth-lire",
      etapes: [
        "$p$ : lire l'ordonnée du point où la droite coupe l'axe vertical.",
        "$m$ : partir d'un point de la droite, avancer vers la droite, puis compter de combien on monte (ou on descend).",
        "$m = \\dfrac{\\text{montée}}{\\text{avancée}}$, négatif si la droite descend."
      ],
      exemple: "Sur la figure : $p = -1$ ; on avance de $3$ et on monte de $2$, donc $m = \\dfrac{2}{3}$ et $y = \\dfrac{2}{3}x - 1$."
    },
    {
      titre: "Dresser le tableau de signes de $mx + p$",
      figure: "fa-meth-signe",
      etapes: [
        "Résoudre $mx + p = 0$ : $x = -\\dfrac{p}{m}$.",
        "Regarder le signe de $m$.",
        "$m > 0$ : « $-$ puis $+$ ». $m < 0$ : « $+$ puis $-$ »."
      ],
      exemple: "$-2x + 6$ s'annule en $3$ ; $m < 0$ : $+$ avant $3$, $-$ après."
    },
    {
      titre: "Encadrer une expression $kx + q$",
      figure: "fa-cours-encadrer",
      etapes: [
        "Multiplier chaque membre de l'encadrement de $x$ par $k$ : si $k < 0$, changer le sens.",
        "Ajouter $q$ à chaque membre.",
        "Vérifier : la plus petite borne est à gauche."
      ],
      exemple: "$2 \\leqslant x \\leqslant 5$ : $-15 \\leqslant -3x \\leqslant -6$, puis $-14 \\leqslant -3x + 1 \\leqslant -5$."
    },
    {
      titre: "Résoudre une inéquation du premier degré",
      figure: "fa-cours-inequation",
      etapes: [
        "Regrouper les $x$ d'un côté, les nombres de l'autre.",
        "Diviser par le coefficient de $x$ : s'il est **négatif**, changer le sens.",
        "Écrire l'ensemble des solutions sous forme d'intervalle, avec les bons crochets."
      ],
      exemple: "$4 - 2x < 10 \\iff -2x < 6 \\iff x > -3$ : $S = \\,]-3\\,;+\\infty[$."
    },
    {
      titre: "Comparer deux tarifs",
      figure: "taxis",
      etapes: [
        "Écrire chaque tarif sous la forme $mx + p$ (partie proportionnelle + partie fixe).",
        "Résoudre l'inéquation « tarif 1 $<$ tarif 2 ».",
        "Conclure par une phrase avec l'unité."
      ],
      exemple: "$2x + 10 < 2{,}5x + 4 \\iff x > 12$ : A est moins cher au-delà de $12$ km."
    }
  ],
  erreurs: [
    "Croire que $f(x) = 5 - 3x$ est croissante parce que $5$ est positif : seul le coefficient de $x$ compte.",
    "Inverser le calcul du taux : $m = \\dfrac{f(b) - f(a)}{b - a}$, et non l'inverse.",
    "Lire la pente à l'envers sur un graphique : $m = \\dfrac{\\text{montée}}{\\text{avancée}}$.",
    "Oublier de changer le sens de l'inégalité en divisant par un nombre négatif.",
    "Écrire « le contraire de $x < 3$ est $x > 3$ » : il manque le cas $x = 3$.",
    "Mettre un crochet fermé du côté de l'infini : $[2\\,;+\\infty]$ n'a pas de sens.",
    "Soustraire deux inégalités membre à membre : c'est interdit.",
    "Oublier la partie fixe d'un tarif : avec $10$ € de prise en charge et $2$ € par km, $5$ km coûtent $20$ €, pas $10$ €.",
    "Oublier que $\\texttt{range(1, 5)}$ s'arrête à $4$."
  ]
};
