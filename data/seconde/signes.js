/*
  CHAPITRE : Seconde — Signes d'expressions et équations quotients
  -----------------------------------------------------------------
  Chapitre 14 de la progression spiralée 2026-2027 (programme de Seconde 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce, programme Python entre ```python et ```).
  Pas encore de vidéo de la chaîne ni de PDF pour ce chapitre : les vidéos sont celles d'Yvan Monka.
  Les générateurs d'exercices commencent par « sg- » dans assets/exercices.js
  (le chapitre reprend aussi am-signe et fa-signe).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-signes"] = {
  niveau: "Seconde",
  numero: 14,
  titre: "Signes d'expressions et équations quotients",
  accroche: "Un produit, un quotient : positif ou négatif ? Le tableau de signes pour résoudre des inéquations et comparer deux quantités.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur les inéquations et les tableaux de signes en vidéo (Yvan Monka)", url: "https://youtu.be/kbTWwWQ9tYo", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Signe des fonctions de référence",
      video: { titre: "Vidéo d'Yvan Monka : déterminer graphiquement le signe d'une fonction", youtube: "https://youtu.be/AZvjA44WfPw" },
      texte:
        "- $mx + p$ ($m \\neq 0$) change de signe en $-\\dfrac{p}{m}$ : « signe de $-m$, puis signe de $m$ » (chapitre 6).\n" +
        "- $x^2$, $|x|$ et $\\sqrt{x}$ sont **positifs** (nuls seulement en $0$).\n" +
        "- $\\dfrac{1}{x}$ et $x^3$ ont le **signe de $x$**.\n\n" +
        "Graphiquement, $f(x) > 0$ là où la courbe est **au-dessus** de l'axe des abscisses, $f(x) < 0$ là où elle est en dessous.",
      exemple: {
        enonce: "Quel est le signe de $-3x^2$ ? De $\\dfrac{5}{x}$ pour $x < 0$ ?",
        solution: "$x^2 \\geqslant 0$, donc $-3x^2 \\leqslant 0$ : négatif (nul en $0$).\n\n$\\dfrac{1}{x} < 0$ pour $x < 0$, donc $\\dfrac{5}{x} < 0$."
      }
    },
    {
      titre: "Tableau de signes d'un produit",
      figure: "tabsigne-produit",
      video: { titre: "Vidéo d'Yvan Monka : dresser un tableau de signes", youtube: "https://youtu.be/50CByVTP4ig" },
      texte:
        "Pour étudier le signe de $(ax + b)(cx + d)$ :\n" +
        "- on cherche où chaque facteur s'annule ;\n" +
        "- on dresse un tableau avec une ligne par facteur et une dernière ligne pour le produit ;\n" +
        "- on applique la **règle des signes** dans chaque colonne : même signe donne $+$, signes contraires donnent $-$.\n\n" +
        "C'est une **disjonction des cas** : on traite chaque intervalle séparément.",
      exemple: {
        enonce: "Dresser le tableau de signes de $(x + 2)(3 - x)$.",
        solution: "$x + 2$ s'annule en $-2$ ($-$ puis $+$) ; $3 - x$ s'annule en $3$ ($+$ puis $-$).\n\nProduit : $-$ sur $]-\\infty\\,;-2[$, $+$ sur $]-2\\,;3[$, $-$ sur $]3\\,;+\\infty[$, nul en $-2$ et en $3$."
      }
    },
    {
      titre: "Quotient : valeur interdite",
      figure: "tabsigne-quotient",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une inéquation-quotient", youtube: "https://youtu.be/Vitm29q8AEs" },
      texte:
        "Une expression $\\dfrac{A(x)}{B(x)}$ n'est définie que si $B(x) \\neq 0$ : les valeurs qui annulent le dénominateur sont **interdites**. On précise toujours l'**ensemble de définition**.\n\n" +
        "- Le signe d'un quotient suit la même règle que celui d'un produit.\n" +
        "- Dans le tableau, on met une **double barre** sous une valeur interdite.\n" +
        "- Une valeur interdite n'est **jamais** solution : crochet toujours ouvert.",
      exemple: {
        enonce: "Résoudre $\\dfrac{x + 4}{x - 3} \\geqslant 0$.",
        solution: "Valeur interdite : $3$. Le numérateur s'annule en $-4$.\n\nLe quotient est positif pour $x < -4$ et pour $x > 3$, nul en $-4$.\n\n$S = \\,]-\\infty\\,;-4] \\cup \\,]3\\,;+\\infty[$ ($-4$ inclus, $3$ exclu)."
      }
    },
    {
      titre: "Équations quotients",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation-quotient", youtube: "https://youtu.be/zhY1HD4oLHg" },
      texte:
        "- $\\dfrac{A(x)}{B(x)} = 0 \\iff A(x) = 0$ **et** $B(x) \\neq 0$.\n" +
        "- $\\dfrac{A(x)}{B(x)} = k$ : pour $B(x) \\neq 0$, on multiplie les deux membres par $B(x)$ : $A(x) = k \\times B(x)$.\n\n" +
        "On vérifie à la fin que les solutions trouvées ne sont pas des valeurs interdites.",
      exemple: {
        enonce: "Résoudre $\\dfrac{2x + 1}{x - 1} = 3$.",
        solution: "Pour $x \\neq 1$ : $2x + 1 = 3(x - 1) \\iff 2x + 1 = 3x - 3 \\iff x = 4$.\n\n$4 \\neq 1$ : la solution est $4$."
      }
    },
    {
      titre: "Résoudre $f(x) > 0$ et $f(x) \\leqslant g(x)$",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une inéquation-produit", youtube: "https://youtu.be/qoNLr9NkvUE" },
      texte:
        "- Pour résoudre $f(x) > 0$ : on factorise $f(x)$, on dresse son tableau de signes, on lit les intervalles où il y a $+$.\n" +
        "- Pour résoudre $f(x) \\leqslant g(x)$ : on étudie le signe de la **différence** $f(x) - g(x)$, car $f(x) \\leqslant g(x) \\iff f(x) - g(x) \\leqslant 0$.\n" +
        "- Pour **comparer deux quantités** $A$ et $B$, on étudie le signe de $A - B$.",
      exemple: {
        enonce: "Résoudre $x^2 \\leqslant 3x$.",
        solution: "$x^2 \\leqslant 3x \\iff x^2 - 3x \\leqslant 0 \\iff x(x - 3) \\leqslant 0$.\n\nLe produit est négatif ou nul entre ses racines : $S = [0\\,;3]$. (Diviser par $x$ aurait fait perdre des solutions.)"
      }
    },
    {
      titre: "Python : une fonction qui renvoie un signe",
      texte:
        "Avec $\\texttt{if}$, $\\texttt{elif}$ (« sinon si ») et $\\texttt{else}$ (« sinon »), une fonction peut renvoyer le signe d'un nombre :\n\n" +
        "```python\ndef signe(v):\n    if v > 0:\n        return \"+\"\n    elif v < 0:\n        return \"-\"\n    else:\n        return \"0\"\n```\n\n" +
        "On peut s'en servir pour vérifier un tableau de signes en testant une valeur de chaque intervalle.",
      exemple: {
        enonce: "Que renvoie $\\texttt{signe((x + 2) * (3 - x))}$ pour $x = 5$ ?",
        solution: "$(5 + 2) \\times (3 - 5) = 7 \\times (-2) = -14 < 0$ : la fonction renvoie $\\texttt{\"-\"}$, comme dans le tableau de signes (intervalle $]3\\,;+\\infty[$)."
      }
    }
  ],

  /* Exercices corrigés en vidéo */
  videos: [
    { titre: "Déterminer le signe d'une fonction à l'aide d'un tableau de signes", type: "Tableau de signes", youtube: "https://youtu.be/zoJxmdArAXY" },
    { titre: "Résoudre une équation-quotient (2)", type: "Équation quotient", youtube: "https://youtu.be/OtGN4HHwEek" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ----------
     Chaque série tire des nombres au hasard : on peut la refaire autant qu'on veut.
     type : nom du générateur (voir assets/exercices.js). nb : nombre de questions. */
  exercices: [
    { type: "fa-signe", titre: "Rappel : signe d'une fonction affine", etape: "Tableaux de signes", nb: 3 },
    { type: "sg-tableau", titre: "Lire un tableau de signes", etape: "Tableaux de signes", nb: 5 },
    { type: "am-signe", titre: "Signe d'un produit", etape: "Tableaux de signes", nb: 5 },
    { type: "sg-quotient", titre: "Inéquation quotient", etape: "Quotients", nb: 5 },
    { type: "sg-eq-quotient", titre: "Équation quotient", etape: "Quotients", nb: 5 },
    { type: "sg-difference", titre: "Comparer avec le signe de la différence", etape: "Comparer", nb: 3 },
    { type: "sg-python", titre: "Python : la fonction signe", etape: "Python", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ----------
     bonne : numéro de la bonne réponse en partant de 0 (0 = la première). */
  qcm: [
    {
      question: "Le produit de deux nombres négatifs est :",
      choix: ["positif", "négatif", "nul", "on ne peut pas savoir"],
      bonne: 0,
      explication: "Règle des signes : deux facteurs de même signe donnent un produit positif."
    },
    {
      question: "$(x - 1)(x + 4)$ est négatif pour :",
      choix: ["$-4 < x < 1$", "$x < -4$", "$x > 1$", "$x < -4$ ou $x > 1$"],
      bonne: 0,
      explication: "Entre les racines $-4$ et $1$, les deux facteurs ont des signes contraires : le produit est négatif."
    },
    {
      question: "La valeur interdite de $\\dfrac{2x - 6}{x + 5}$ est :",
      choix: ["$-5$", "$3$", "$5$", "$-3$"],
      bonne: 0,
      explication: "Le dénominateur $x + 5$ s'annule en $-5$. ($3$ annule le numérateur : le quotient y vaut $0$.)"
    },
    {
      question: "$\\dfrac{x - 2}{x + 1} = 0$ a pour solution :",
      choix: ["$2$", "$-1$", "$2$ et $-1$", "aucune"],
      bonne: 0,
      explication: "Le numérateur s'annule en $2$, qui n'est pas la valeur interdite $-1$."
    },
    {
      question: "L'ensemble des solutions de $\\dfrac{x + 3}{x - 2} \\leqslant 0$ est :",
      choix: ["$[-3\\,;2[$", "$[-3\\,;2]$", "$]-3\\,;2[$", "$]-\\infty\\,;-3] \\cup \\,]2\\,;+\\infty[$"],
      bonne: 0,
      explication: "Négatif entre $-3$ et $2$ ; $-3$ inclus (le quotient y est nul), $2$ exclu (valeur interdite)."
    },
    {
      question: "Pour résoudre $f(x) \\leqslant g(x)$, on peut étudier :",
      choix: ["le signe de $f(x) - g(x)$", "le signe de $f(x) \\times g(x)$", "le signe de $f(x) + g(x)$", "seulement le signe de $f(x)$"],
      bonne: 0,
      explication: "$f(x) \\leqslant g(x) \\iff f(x) - g(x) \\leqslant 0$."
    },
    {
      question: "Les solutions de $x^2 < 4x$ sont :",
      choix: ["$]0\\,;4[$", "$]-\\infty\\,;4[$", "$]4\\,;+\\infty[$", "$]-2\\,;2[$"],
      bonne: 0,
      explication: "$x^2 - 4x < 0 \\iff x(x - 4) < 0$ : négatif strictement entre $0$ et $4$."
    }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Dresser le tableau de signes d'un produit ou d'un quotient",
      etapes: [
        "Trouver où chaque facteur s'annule (et les valeurs interdites).",
        "Ranger ces valeurs dans l'ordre sur la première ligne.",
        "Une ligne par facteur affine : « signe de $-m$, $0$, signe de $m$ ».",
        "Dernière ligne : règle des signes ; $0$ là où le numérateur s'annule, double barre aux valeurs interdites."
      ],
      exemple: "$(x + 2)(3 - x)$ : $-$, $0$, $+$, $0$, $-$."
    },
    {
      titre: "Résoudre une inéquation produit ou quotient",
      etapes: [
        "Tout passer d'un côté pour comparer à $0$.",
        "Factoriser (ou réduire au même dénominateur).",
        "Dresser le tableau de signes.",
        "Lire les intervalles, avec les bons crochets (valeurs interdites toujours exclues)."
      ],
      exemple: "$\\dfrac{x + 4}{x - 3} \\geqslant 0$ : $S = \\,]-\\infty\\,;-4] \\cup \\,]3\\,;+\\infty[$."
    },
    {
      titre: "Résoudre une équation quotient",
      etapes: [
        "Donner la ou les valeurs interdites.",
        "$\\dfrac{A}{B} = 0$ : résoudre $A = 0$. $\\dfrac{A}{B} = k$ : résoudre $A = kB$.",
        "Éliminer les solutions qui sont des valeurs interdites."
      ],
      exemple: "$\\dfrac{2x + 1}{x - 1} = 3 \\iff 2x + 1 = 3x - 3 \\iff x = 4$."
    }
  ],
  erreurs: [
    "Oublier la valeur interdite ou la mettre dans l'ensemble des solutions.",
    "Multiplier une inéquation par un dénominateur dont on ne connaît pas le signe : le sens pourrait changer.",
    "Diviser par $x$ dans $x^2 < 3x$ : on perd la moitié des cas.",
    "Se tromper de signe pour $3 - x$ : il est positif **avant** $3$.",
    "Croire que $\\dfrac{A}{B} = 0$ quand $B = 0$."
  ]
};
