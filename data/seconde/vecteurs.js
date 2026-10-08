/*
  CHAPITRE : Seconde — Vecteurs 1 : translation et coordonnées
  -------------------------------------------------------------
  Chapitre 7 de la progression spiralée 2026-2027 (programme de Seconde 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce, programme Python entre ```python et ```).
  Vidéos : celles de la chaîne d'abord (repérage), Yvan Monka en complément.
  Pas encore de PDF pour ce chapitre : ajouter les liens dans pdfs le moment venu.
  Les générateurs d'exercices commencent par « ve- » dans assets/exercices.js.
  La colinéarité et le déterminant sont au chapitre 11 (Vecteurs 2).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-vecteurs"] = {
  niveau: "Seconde",
  numero: 7,
  titre: "Vecteurs 1 : translation et coordonnées",
  accroche: "Un déplacement, une direction, un sens, une longueur : les vecteurs pour décrire un trajet en barge, calculer un milieu ou une distance.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur les vecteurs en vidéo (Yvan Monka)", url: "https://youtu.be/aSSDBNn_rRI", type: "video" },
    { titre: "Le cours « vecteurs et repérage » en vidéo (Yvan Monka)", url: "https://youtu.be/9OB3hct6gak", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Translation et vecteur",
      video: { titre: "Vidéo d'Yvan Monka : construire l'image d'une figure par une translation", youtube: "https://youtu.be/8Jb9cMOeYSk" },
      texte:
        "La **translation** qui transforme $A$ en $B$ fait glisser toute la figure : même direction que $(AB)$, même sens (de $A$ vers $B$), même longueur $AB$.\n\n" +
        "On la représente par le **vecteur** $\\overrightarrow{AB}$, une flèche de $A$ vers $B$. Un vecteur est défini par :\n" +
        "- une **direction** (celle de la droite $(AB)$) ;\n" +
        "- un **sens** (de $A$ vers $B$) ;\n" +
        "- une **norme**, sa longueur, notée $\\|\\overrightarrow{AB}\\| = AB$.\n\n" +
        "Si $M'$ est l'image de $M$ par cette translation, alors $\\overrightarrow{MM'} = \\overrightarrow{AB}$.",
      exemple: {
        enonce: "La barge va de Mamoudzou ($M$) à Dzaoudzi ($D$). Que représente le vecteur $\\overrightarrow{MD}$ ? Et $\\overrightarrow{DM}$ ?",
        solution: "$\\overrightarrow{MD}$ décrit le trajet aller : direction de la droite $(MD)$, sens de $M$ vers $D$, longueur $MD$.\n\n$\\overrightarrow{DM}$ a la même direction et la même longueur, mais le sens contraire : c'est le trajet retour, le vecteur **opposé**, $\\overrightarrow{DM} = -\\overrightarrow{MD}$."
      }
    },
    {
      titre: "Vecteurs égaux et parallélogramme",
      figure: "parallelogramme",
      video: { titre: "Vidéo d'Yvan Monka : utiliser des propriétés sur les vecteurs", youtube: "https://youtu.be/XokpP_8mTOE" },
      texte:
        "Deux vecteurs sont **égaux** s'ils ont même direction, même sens et même norme. Ce sont des **représentants** du même vecteur, placés à des endroits différents.\n\n" +
        "**Propriété** : $\\overrightarrow{AB} = \\overrightarrow{DC}$ **si et seulement si** $ABCD$ est un parallélogramme (éventuellement aplati).\n\n" +
        "- Attention à l'ordre des lettres : $\\overrightarrow{AB} = \\overrightarrow{DC}$, pas $\\overrightarrow{CD}$.\n" +
        "- Le **vecteur nul** $\\vec{0} = \\overrightarrow{AA}$ correspond à la translation qui ne bouge rien.\n" +
        "- $I$ est le milieu de $[AB]$ si et seulement si $\\overrightarrow{AI} = \\overrightarrow{IB}$.",
      exemple: {
        enonce: "$ABCD$ est un parallélogramme. Compléter : $\\overrightarrow{AB} = \\overrightarrow{\\ldots}$ et $\\overrightarrow{AD} = \\overrightarrow{\\ldots}$.",
        solution: "$\\overrightarrow{AB} = \\overrightarrow{DC}$ et $\\overrightarrow{AD} = \\overrightarrow{BC}$ (les côtés opposés, parcourus dans le même sens)."
      }
    },
    {
      titre: "Somme de vecteurs, relation de Chasles",
      figure: "chasles",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la relation de Chasles", youtube: "https://youtu.be/fbVrdYiY0qc" },
      texte:
        "Enchaîner deux translations revient à faire une seule translation : c'est la **somme** des vecteurs.\n\n" +
        "**Relation de Chasles** : pour tous points $A$, $B$, $C$, $\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$.\n\n" +
        "- Règle du parallélogramme : $\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$ quand $ABCD$ est un parallélogramme.\n" +
        "- $\\overrightarrow{AB} + \\overrightarrow{BA} = \\overrightarrow{AA} = \\vec{0}$ : $\\overrightarrow{BA} = -\\overrightarrow{AB}$.\n" +
        "- Soustraire, c'est ajouter l'opposé : $\\vec{u} - \\vec{v} = \\vec{u} + (-\\vec{v})$.",
      exemple: {
        enonce: "Simplifier $\\overrightarrow{MA} + \\overrightarrow{AB} + \\overrightarrow{BM}$ et $\\overrightarrow{CB} + \\overrightarrow{AC}$.",
        solution: "$\\overrightarrow{MA} + \\overrightarrow{AB} + \\overrightarrow{BM} = \\overrightarrow{MB} + \\overrightarrow{BM} = \\overrightarrow{MM} = \\vec{0}$ : on revient au point de départ.\n\n$\\overrightarrow{CB} + \\overrightarrow{AC} = \\overrightarrow{AC} + \\overrightarrow{CB} = \\overrightarrow{AB}$."
      }
    },
    {
      titre: "Coordonnées d'un vecteur",
      figure: "coord-vecteur",
      video: { titre: "Vidéo d'Yvan Monka : lire les coordonnées d'un vecteur", youtube: "https://youtu.be/8PyiMHtp1fE" },
      texte:
        "Dans une **base orthonormée** $(\\vec{i}, \\vec{j})$ (deux vecteurs de longueur $1$, perpendiculaires), tout vecteur s'écrit $\\vec{u} = x\\vec{i} + y\\vec{j}$. On note $\\vec{u}\\begin{pmatrix} x \\\\ y \\end{pmatrix}$.\n\n" +
        "- $x$ : déplacement horizontal (vers la droite si $x > 0$) ; $y$ : déplacement vertical (vers le haut si $y > 0$).\n" +
        "- Pour $A(x_A\\,;y_A)$ et $B(x_B\\,;y_B)$ : $\\overrightarrow{AB}\\begin{pmatrix} x_B - x_A \\\\ y_B - y_A \\end{pmatrix}$ (arrivée moins départ).\n" +
        "- Deux vecteurs sont égaux si et seulement s'ils ont les **mêmes coordonnées**.\n" +
        "- Coordonnées d'une somme : on additionne. $\\vec{u} + \\vec{v}\\begin{pmatrix} x + x' \\\\ y + y' \\end{pmatrix}$.\n\n" +
        "Sur la figure, pour aller de $A$ à $B$ on avance de $5$ vers la droite et de $3$ vers le haut : $\\overrightarrow{AB}\\begin{pmatrix} 5 \\\\ 3 \\end{pmatrix}$.",
      exemple: {
        enonce: "$A(2\\,;-1)$ et $B(-3\\,;4)$. Calculer les coordonnées de $\\overrightarrow{AB}$.",
        solution: "$x_B - x_A = -3 - 2 = -5$ et $y_B - y_A = 4 - (-1) = 5$.\n\n$\\overrightarrow{AB}\\begin{pmatrix} -5 \\\\ 5 \\end{pmatrix}$ : $5$ carreaux vers la gauche, $5$ vers le haut."
      }
    },
    {
      titre: "Calculer les coordonnées d'un point",
      video: { titre: "Vidéo d'Yvan Monka : coordonnées d'un point défini par une égalité vectorielle", youtube: "https://youtu.be/eQsMZTcniuY" },
      texte:
        "Pour trouver un point défini par une égalité de vecteurs, on traduit l'égalité **coordonnée par coordonnée**.\n\n" +
        "Exemple type : trouver $D$ pour que $ABCD$ soit un parallélogramme. On écrit $\\overrightarrow{AB} = \\overrightarrow{DC}$, puis deux petites équations, une pour $x_D$ et une pour $y_D$.",
      exemple: {
        enonce: "$A(1\\,;2)$, $B(4\\,;3)$, $C(5\\,;-1)$. Trouver $D$ tel que $ABCD$ soit un parallélogramme.",
        solution: "$\\overrightarrow{AB}\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix}$ et $\\overrightarrow{DC}\\begin{pmatrix} 5 - x_D \\\\ -1 - y_D \\end{pmatrix}$.\n\n$5 - x_D = 3$ donne $x_D = 2$ ; $-1 - y_D = 1$ donne $y_D = -2$. Donc $D(2\\,;-2)$."
      }
    },
    {
      titre: "Milieu d'un segment",
      video: { titre: "Vidéo d'Yvan Monka : calculer les coordonnées d'un milieu", youtube: "https://youtu.be/YTQCtSvxAmM" },
      texte:
        "Le milieu $I$ de $[AB]$ a pour coordonnées les **moyennes** des coordonnées de $A$ et de $B$ :\n\n" +
        "$x_I = \\dfrac{x_A + x_B}{2}$ et $y_I = \\dfrac{y_A + y_B}{2}$.\n\n" +
        "Cette formule marche dans **n'importe quel repère**, orthonormé ou non.",
      exemple: {
        enonce: "$A(-3\\,;5)$ et $B(4\\,;-1)$. Calculer les coordonnées du milieu $I$ de $[AB]$.",
        solution: "$x_I = \\dfrac{-3 + 4}{2} = 0{,}5$ et $y_I = \\dfrac{5 + (-1)}{2} = 2$. Donc $I(0{,}5\\,;2)$."
      }
    },
    {
      titre: "Norme d'un vecteur, distance entre deux points",
      figure: "milieu-distance",
      video: { titre: "Vidéo d'Yvan Monka : calculer la longueur d'un segment", youtube: "https://youtu.be/pP8ebg8W9o8" },
      texte:
        "Dans un repère **orthonormé** :\n" +
        "- la norme de $\\vec{u}\\begin{pmatrix} x \\\\ y \\end{pmatrix}$ est $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$ ;\n" +
        "- la distance entre $A$ et $B$ est $AB = \\|\\overrightarrow{AB}\\| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$.\n\n" +
        "C'est le **théorème de Pythagore** dans le triangle rectangle formé par le déplacement horizontal et le déplacement vertical. La formule n'est valable que si le repère est orthonormé.",
      exemple: {
        enonce: "$A(1\\,;-2)$ et $B(7\\,;6)$ dans un repère orthonormé. Calculer $AB$.",
        solution: "$AB = \\sqrt{(7 - 1)^2 + (6 - (-2))^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$."
      }
    },
    {
      titre: "Python : fonctions à plusieurs arguments",
      texte:
        "Une fonction Python peut recevoir plusieurs nombres. Pour le milieu et la distance, on donne les quatre coordonnées :\n\n" +
        "```python\nfrom math import sqrt\n\ndef milieu(xA, yA, xB, yB):\n    return (xA + xB) / 2, (yA + yB) / 2\n\ndef distance(xA, yA, xB, yB):\n    return sqrt((xB - xA)**2 + (yB - yA)**2)\n```\n\n" +
        "$\\texttt{**2}$ est le carré, $\\texttt{sqrt}$ la racine carrée (à importer depuis le module $\\texttt{math}$).",
      exemple: {
        enonce: "Que renvoient $\\texttt{milieu(1, 2, 5, -4)}$ et $\\texttt{distance(0, 0, 3, 4)}$ ?",
        solution: "$\\texttt{milieu(1, 2, 5, -4)}$ renvoie $(3{,}0\\,;-1{,}0)$.\n\n$\\texttt{distance(0, 0, 3, 4)}$ renvoie $\\sqrt{9 + 16} = 5{,}0$."
      }
    }
  ],

  /* Exercices corrigés en vidéo */
  videos: [
    { titre: "#19 Repérage sur une droite et dans le plan", type: "Repérage", youtube: "https://youtu.be/KTPki_bOLzU" },
    { titre: "Déterminer les coordonnées d'un vecteur par calcul (Yvan Monka)", type: "Coordonnées", youtube: "https://youtu.be/wnNzmod2tMM" },
    { titre: "Construire un point à partir d'une somme de vecteurs (Yvan Monka)", type: "Somme", youtube: "https://youtu.be/nzABUzFM6p8" }
  ],
  videosNote: "La première vidéo est celle de ton prof (énoncé dans le dossier élève des automatismes) ; les deux autres sont d'Yvan Monka, avec l'énoncé au début.",

  /* ---------- 2. EXERCICES INTERACTIFS ----------
     Chaque série tire des nombres au hasard : on peut la refaire autant qu'on veut.
     type : nom du générateur (voir assets/exercices.js). nb : nombre de questions. */
  exercices: [
    { type: "ve-chasles", titre: "Relation de Chasles", etape: "Vecteurs et translations", nb: 5 },
    { type: "ve-lire", titre: "Lire les coordonnées d'un vecteur", etape: "Coordonnées", nb: 5 },
    { type: "ve-coord", titre: "Calculer les coordonnées de AB", etape: "Coordonnées", nb: 6 },
    { type: "ve-somme", titre: "Coordonnées d'une somme", etape: "Coordonnées", nb: 4 },
    { type: "ve-parallelogramme", titre: "Quatrième sommet d'un parallélogramme", etape: "Coordonnées", nb: 4 },
    { type: "ve-milieu", titre: "Coordonnées d'un milieu", etape: "Milieu et distance", nb: 5 },
    { type: "ve-norme", titre: "Norme et distance", etape: "Milieu et distance", nb: 5 },
    { type: "ve-python", titre: "Python : milieu et distance", etape: "Python", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ----------
     bonne : numéro de la bonne réponse en partant de 0 (0 = la première). */
  qcm: [
    {
      question: "Deux vecteurs égaux ont :",
      choix: ["même direction, même sens et même norme", "seulement la même longueur", "la même origine", "des sens contraires"],
      bonne: 0,
      explication: "Il faut les trois : direction, sens et norme. Deux vecteurs égaux peuvent avoir des origines différentes."
    },
    {
      question: "$ABCD$ est un parallélogramme si et seulement si :",
      choix: ["$\\overrightarrow{AB} = \\overrightarrow{DC}$", "$\\overrightarrow{AB} = \\overrightarrow{CD}$", "$\\overrightarrow{AB} = \\overrightarrow{BC}$", "$AB = CD$"],
      bonne: 0,
      explication: "Les côtés opposés $[AB]$ et $[DC]$ doivent être parcourus dans le même sens. $AB = CD$ (longueurs) ne suffit pas."
    },
    {
      question: "$\\overrightarrow{AB} + \\overrightarrow{BC}$ est égal à :",
      choix: ["$\\overrightarrow{AC}$", "$\\overrightarrow{CA}$", "$\\overrightarrow{BB}$", "$\\overrightarrow{AB}$"],
      bonne: 0,
      explication: "Relation de Chasles : on va de $A$ à $B$, puis de $B$ à $C$, c'est-à-dire de $A$ à $C$."
    },
    {
      question: "$\\overrightarrow{AB} + \\overrightarrow{BA}$ est égal à :",
      choix: ["$\\vec{0}$", "$2\\overrightarrow{AB}$", "$\\overrightarrow{AB}$", "$0$"],
      bonne: 0,
      explication: "$\\overrightarrow{AB} + \\overrightarrow{BA} = \\overrightarrow{AA} = \\vec{0}$ : c'est le **vecteur** nul, pas le nombre $0$."
    },
    {
      question: "$A(3\\,;-1)$ et $B(1\\,;4)$. Les coordonnées de $\\overrightarrow{AB}$ sont :",
      choix: ["$\\begin{pmatrix} -2 \\\\ 5 \\end{pmatrix}$", "$\\begin{pmatrix} 2 \\\\ -5 \\end{pmatrix}$", "$\\begin{pmatrix} 4 \\\\ 3 \\end{pmatrix}$", "$\\begin{pmatrix} -2 \\\\ 3 \\end{pmatrix}$"],
      bonne: 0,
      explication: "Arrivée moins départ : $1 - 3 = -2$ et $4 - (-1) = 5$."
    },
    {
      question: "$\\vec{u}\\begin{pmatrix} 2 \\\\ -3 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} -5 \\\\ 1 \\end{pmatrix}$. Les coordonnées de $\\vec{u} + \\vec{v}$ sont :",
      choix: ["$\\begin{pmatrix} -3 \\\\ -2 \\end{pmatrix}$", "$\\begin{pmatrix} 7 \\\\ -4 \\end{pmatrix}$", "$\\begin{pmatrix} -10 \\\\ -3 \\end{pmatrix}$", "$\\begin{pmatrix} -3 \\\\ 2 \\end{pmatrix}$"],
      bonne: 0,
      explication: "On additionne coordonnée par coordonnée : $2 + (-5) = -3$ et $-3 + 1 = -2$."
    },
    {
      question: "Le milieu de $[AB]$ avec $A(-2\\,;6)$ et $B(4\\,;0)$ est :",
      choix: ["$(1\\,;3)$", "$(3\\,;-3)$", "$(2\\,;6)$", "$(6\\,;-6)$"],
      bonne: 0,
      explication: "$\\dfrac{-2 + 4}{2} = 1$ et $\\dfrac{6 + 0}{2} = 3$. Les autres réponses viennent d'une soustraction ou d'un oubli de la division par $2$."
    },
    {
      question: "Dans un repère orthonormé, la norme de $\\vec{u}\\begin{pmatrix} -6 \\\\ 8 \\end{pmatrix}$ est :",
      choix: ["$10$", "$2$", "$14$", "$100$"],
      bonne: 0,
      explication: "$\\sqrt{(-6)^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$."
    },
    {
      question: "La formule $AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$ est valable :",
      choix: ["dans un repère orthonormé", "dans n'importe quel repère", "seulement si $A$ est l'origine", "seulement pour des coordonnées positives"],
      bonne: 0,
      explication: "Elle vient du théorème de Pythagore : il faut des axes perpendiculaires et la même unité sur les deux axes."
    },
    {
      question: "$A(1\\,;1)$, $B(5\\,;2)$, $C(6\\,;5)$. Le point $D$ tel que $ABCD$ soit un parallélogramme est :",
      choix: ["$D(2\\,;4)$", "$D(10\\,;6)$", "$D(0\\,;-2)$", "$D(4\\,;1)$"],
      bonne: 0,
      explication: "$\\overrightarrow{AB}\\begin{pmatrix} 4 \\\\ 1 \\end{pmatrix} = \\overrightarrow{DC}$ : $6 - x_D = 4$ et $5 - y_D = 1$, donc $D(2\\,;4)$."
    },
    { question: "La barge fait l'aller $\\overrightarrow{MD}$ puis le retour $\\overrightarrow{DM}$. Ces deux vecteurs ont :", choix: ["la même direction, la même norme et des sens contraires", "la même direction, le même sens et la même norme", "des directions différentes", "des normes différentes"], bonne: 0, explication: "$\\overrightarrow{DM}$ est l'opposé de $\\overrightarrow{MD}$ : même droite, même longueur, mais on va dans l'autre sens. $\\overrightarrow{DM} = -\\overrightarrow{MD}$." },
    { question: "Par la translation de vecteur $\\overrightarrow{AB}$, le point $M$ a pour image le point $M'$ tel que :", choix: ["$\\overrightarrow{MM'} = \\overrightarrow{AB}$", "$\\overrightarrow{M'M} = \\overrightarrow{AB}$", "$\\overrightarrow{MM'} = \\overrightarrow{BA}$", "$M'$ est le milieu de $[AB]$"], bonne: 0, explication: "La translation fait glisser $M$ comme $A$ glisse vers $B$ : même direction, même sens, même longueur, donc $\\overrightarrow{MM'} = \\overrightarrow{AB}$." },
    { question: "$ABCD$ est un parallélogramme. $\\overrightarrow{AB} + \\overrightarrow{AD}$ est égal à :", choix: ["$\\overrightarrow{AC}$", "$\\overrightarrow{BD}$", "$\\overrightarrow{DB}$", "$\\overrightarrow{CA}$"], bonne: 0, explication: "Règle du parallélogramme : $\\overrightarrow{AD} = \\overrightarrow{BC}$, donc $\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$, la diagonale issue de $A$." },
    { question: "$\\overrightarrow{MA} + \\overrightarrow{AB} + \\overrightarrow{BC}$ est égal à :", choix: ["$\\overrightarrow{MC}$", "$\\overrightarrow{CM}$", "$\\vec{0}$", "$\\overrightarrow{AC}$"], bonne: 0, explication: "Les vecteurs s'enchaînent : de $M$ à $A$, puis à $B$, puis à $C$. Au total, on va de $M$ à $C$." },
    { question: "$\\overrightarrow{AB} - \\overrightarrow{AC}$ est égal à :", choix: ["$\\overrightarrow{CB}$", "$\\overrightarrow{BC}$", "$\\vec{0}$", "$\\overrightarrow{AB}$"], bonne: 0, explication: "Soustraire, c'est ajouter l'opposé : $\\overrightarrow{AB} + \\overrightarrow{CA} = \\overrightarrow{CA} + \\overrightarrow{AB} = \\overrightarrow{CB}$." },
    { question: "Vrai ou faux : pour tous points $A$, $B$, $C$, $\\overrightarrow{AB} + \\overrightarrow{CB} = \\overrightarrow{AC}$.", choix: ["Faux", "Vrai"], bonne: 0, explication: "Les vecteurs ne s'enchaînent pas ($B$ n'est pas le départ de $\\overrightarrow{CB}$). Contre-exemple avec $C = A$ : $\\overrightarrow{AB} + \\overrightarrow{AB} = 2\\overrightarrow{AB}$, et non $\\overrightarrow{AA} = \\vec{0}$." },
    { question: "$I$ est le milieu de $[AB]$ si et seulement si :", choix: ["$\\overrightarrow{AI} = \\overrightarrow{IB}$", "$\\overrightarrow{AI} = \\overrightarrow{BI}$", "$\\overrightarrow{IA} = \\overrightarrow{IB}$", "$AI = IB$"], bonne: 0, explication: "On va de $A$ à $I$ comme de $I$ à $B$. Avec seulement des longueurs ($AI = IB$), $I$ pourrait être n'importe où sur la médiatrice de $[AB]$." },
    { question: "Sur un quadrillage, pour aller de $A$ à $B$, on se déplace de $3$ carreaux vers la gauche et de $2$ vers le haut. Alors :", choix: ["$\\overrightarrow{AB}\\begin{pmatrix} -3 \\\\ 2 \\end{pmatrix}$", "$\\overrightarrow{AB}\\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}$", "$\\overrightarrow{AB}\\begin{pmatrix} 2 \\\\ -3 \\end{pmatrix}$", "$\\overrightarrow{AB}\\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix}$"], bonne: 0, explication: "La première coordonnée est le déplacement horizontal ($-3$ : vers la gauche), la seconde le déplacement vertical ($+2$ : vers le haut)." },
    { question: "$A(2\\,;5)$ et $\\overrightarrow{AB}\\begin{pmatrix} -3 \\\\ 1 \\end{pmatrix}$. Les coordonnées de $B$ sont :", choix: ["$(-1\\,;6)$", "$(5\\,;4)$", "$(-6\\,;5)$", "$(-3\\,;1)$"], bonne: 0, explication: "$x_B - 2 = -3$ donne $x_B = -1$ ; $y_B - 5 = 1$ donne $y_B = 6$. On part de $A$ et on applique le déplacement." },
    { question: "$\\vec{u}\\begin{pmatrix} 2 \\\\ a \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} b \\\\ -1 \\end{pmatrix}$ sont égaux pour :", choix: ["$a = -1$ et $b = 2$", "$a = 2$ et $b = -1$", "$a = 1$ et $b = -2$", "toutes les valeurs telles que $a + b = 1$"], bonne: 0, explication: "Deux vecteurs sont égaux si et seulement s'ils ont les mêmes coordonnées : $2 = b$ et $a = -1$." },
    { question: "$I(1\\,;3)$ est le milieu de $[AB]$, avec $A(-2\\,;4)$. Les coordonnées de $B$ sont :", choix: ["$(4\\,;2)$", "$(-0{,}5\\,;3{,}5)$", "$(3\\,;-1)$", "$(-5\\,;5)$"], bonne: 0, explication: "$\\dfrac{-2 + x_B}{2} = 1$ donne $x_B = 4$ ; $\\dfrac{4 + y_B}{2} = 3$ donne $y_B = 2$. ($(-0{,}5\\,;3{,}5)$ est le milieu de $[AI]$.)" },
    { question: "Dans un repère orthonormé, $A(0\\,;1)$ et $B(2\\,;5)$. La distance $AB$ vaut :", choix: ["$2\\sqrt{5}$", "$6$", "$20$", "$4\\sqrt{5}$"], bonne: 0, explication: "$AB = \\sqrt{2^2 + 4^2} = \\sqrt{20} = \\sqrt{4 \\times 5} = 2\\sqrt{5}$. ($6$ vient d'une addition des écarts, sans Pythagore.)" },
    { question: "Dans un repère orthonormé, la norme de $\\vec{u}\\begin{pmatrix} -1 \\\\ -1 \\end{pmatrix}$ est :", choix: ["$\\sqrt{2}$", "$2$", "$0$", "$-\\sqrt{2}$"], bonne: 0, explication: "$\\|\\vec{u}\\| = \\sqrt{(-1)^2 + (-1)^2} = \\sqrt{1 + 1} = \\sqrt{2}$. Une norme n'est jamais négative." },
    { question: "Que renvoie $\\texttt{distance(1, 1, 4, 5)}$, avec la fonction Python du cours ?", choix: ["$5{,}0$", "$7{,}0$", "$25{,}0$", "$(2{,}5\\,;3{,}0)$"], bonne: 0, explication: "$\\sqrt{(4 - 1)^2 + (5 - 1)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5{,}0$. ($(2{,}5\\,;3{,}0)$ est ce que renverrait $\\texttt{milieu}$.)" },
    { question: "Pourquoi le programme du cours commence-t-il par $\\texttt{from math import sqrt}$ ?", choix: ["pour pouvoir utiliser la racine carrée dans $\\texttt{distance}$", "pour pouvoir calculer un carré avec $\\texttt{**2}$", "pour pouvoir calculer un milieu", "parce que c'est obligatoire dans tout programme Python"], bonne: 0, explication: "$\\texttt{sqrt}$ (racine carrée) est rangée dans le module $\\texttt{math}$ : il faut l'importer. Le carré $\\texttt{**2}$ et la division marchent sans import." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer les coordonnées de $\\overrightarrow{AB}$",
      etapes: [
        "Écrire « arrivée moins départ » : $x_B - x_A$ et $y_B - y_A$.",
        "Mettre les nombres négatifs entre parenthèses.",
        "Contrôler sur un dessin : signe positif vers la droite ou vers le haut."
      ],
      exemple: "$A(2\\,;-1)$, $B(-3\\,;4)$ : $\\overrightarrow{AB}\\begin{pmatrix} -5 \\\\ 5 \\end{pmatrix}$."
    },
    {
      titre: "Trouver le 4e sommet d'un parallélogramme $ABCD$",
      etapes: [
        "Écrire l'égalité $\\overrightarrow{AB} = \\overrightarrow{DC}$ (respecter l'ordre des lettres).",
        "Calculer les coordonnées de $\\overrightarrow{AB}$, et exprimer celles de $\\overrightarrow{DC}$ avec $x_D$ et $y_D$.",
        "Résoudre les deux équations."
      ],
      exemple: "$5 - x_D = 3 \\iff x_D = 2$."
    },
    {
      titre: "Utiliser la relation de Chasles",
      etapes: [
        "Chercher deux vecteurs qui s'enchaînent : la fin de l'un est le début de l'autre.",
        "Changer l'ordre de la somme si besoin.",
        "Remplacer $\\overrightarrow{AB} + \\overrightarrow{BC}$ par $\\overrightarrow{AC}$, et $\\overrightarrow{AA}$ par $\\vec{0}$."
      ],
      exemple: "$\\overrightarrow{CB} + \\overrightarrow{AC} = \\overrightarrow{AC} + \\overrightarrow{CB} = \\overrightarrow{AB}$."
    },
    {
      titre: "Milieu et distance",
      etapes: [
        "Milieu : la moyenne des abscisses, la moyenne des ordonnées.",
        "Distance (repère orthonormé) : $\\sqrt{(\\text{écart des } x)^2 + (\\text{écart des } y)^2}$.",
        "Simplifier la racine carrée si possible."
      ],
      exemple: "$A(1\\,;-2)$, $B(7\\,;6)$ : $I(4\\,;2)$ et $AB = 10$."
    }
  ],
  erreurs: [
    "Faire « départ moins arrivée » : $\\overrightarrow{AB}$, c'est $x_B - x_A$.",
    "Écrire $\\overrightarrow{AB} = \\overrightarrow{CD}$ pour un parallélogramme $ABCD$ : c'est $\\overrightarrow{DC}$.",
    "Confondre le vecteur nul $\\vec{0}$ et le nombre $0$.",
    "Chasles « à l'envers » : $\\overrightarrow{AB} + \\overrightarrow{CB}$ ne se simplifie pas directement.",
    "Oublier de diviser par $2$ pour le milieu, ou soustraire au lieu d'additionner.",
    "Additionner les écarts pour une distance : il faut Pythagore et une racine carrée.",
    "Oublier les parenthèses : $(-3)^2 = 9$, alors que $-3^2 = -9$."
  ]
};
