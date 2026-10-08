/*
  CHAPITRE : Seconde — Problèmes de synthèse
  -------------------------------------------
  Chapitre 17 (dernier) de la progression spiralée 2026-2027 (programme de Seconde 2026).
  Problèmes qui mélangent plusieurs domaines, bilan des types de raisonnement.
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Les générateurs d'exercices commencent par « sy- » dans assets/exercices.js
  (le chapitre reprend aussi vx-optimisation, co-alignes et am-flash-tout).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-synthese"] = {
  niveau: "Seconde",
  numero: 17,
  titre: "Problèmes de synthèse",
  accroche: "Une boîte en carton, un terrain à aménager, des points dans un repère : choisir la bonne méthode parmi tout ce qu'on a vu cette année.",

  playlist: "",
  drive: "",
  pdfs: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Choisir une méthode",
      video: { titre: "Vidéo de ton prof : synthèse, la citerne du faré", youtube: "https://youtu.be/_q_XdOJxjik" },
      texte:
        "Face à un problème, on se demande d'abord **quel outil** convient :\n" +
        "- **graphique** : lire une courbe, une intersection, un extremum (rapide, approché) ;\n" +
        "- **algébrique** : résoudre une équation, une inéquation, étudier un signe (exact) ;\n" +
        "- **logicielle** : calculatrice, tableur ou Python pour un tableau de valeurs ou un balayage ;\n" +
        "- **vectorielle** : coordonnées, colinéarité, milieu, distance pour la géométrie repérée.\n\n" +
        "On commence par **modéliser** : choisir l'inconnue, ses valeurs possibles, et traduire l'énoncé.",
      exemple: {
        enonce: "Pour savoir si trois points sont alignés, quels outils peut-on utiliser ?",
        solution: "Le déterminant de $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ (chapitre 11), ou vérifier que $C$ est sur la droite $(AB)$ grâce à son équation (chapitre 12). Une figure permet de conjecturer, pas de démontrer."
      }
    },
    {
      titre: "Optimisation : la boîte en carton",
      figure: "boite-patron",
      texte:
        "Dans une plaque carrée de $30$ cm de côté, on découpe un carré de côté $x$ à chaque coin, puis on replie pour former une boîte sans couvercle.\n\n" +
        "- Le fond est un carré de côté $30 - 2x$, la hauteur vaut $x$, avec $0 < x < 15$.\n" +
        "- Le volume est $V(x) = x(30 - 2x)^2$.\n" +
        "- Un tableau de valeurs (ou un balayage en Python) montre que le maximum est atteint pour $x = 5$ : $V(5) = 5 \\times 20^2 = 2\\,000$ cm³.",
      exemple: {
        enonce: "Calculer $V(4)$, $V(5)$ et $V(6)$. Que remarque-t-on ?",
        solution: "$V(4) = 4 \\times 22^2 = 1\\,936$ ; $V(5) = 2\\,000$ ; $V(6) = 6 \\times 18^2 = 1\\,944$.\n\nLe volume augmente puis diminue : le maximum (parmi les entiers) est en $x = 5$."
      }
    },
    {
      titre: "Géométrie repérée",
      texte:
        "Avec des coordonnées, on peut tout démontrer par le calcul :\n" +
        "- **longueurs** et triangle rectangle (réciproque de Pythagore) : $AB^2 = (x_B - x_A)^2 + (y_B - y_A)^2$ ;\n" +
        "- **milieu** et parallélogramme : $\\overrightarrow{AB} = \\overrightarrow{DC}$, ou diagonales de même milieu ;\n" +
        "- **alignement** et **parallélisme** : déterminant ;\n" +
        "- **intersection** de deux droites : équations réduites.",
      exemple: {
        enonce: "$A(0\\,;2)$, $B(-2\\,;0)$, $C(2\\,;0)$. Le triangle $ABC$ est-il rectangle ?",
        solution: "$AB^2 = 4 + 4 = 8$, $AC^2 = 8$, $BC^2 = 16$. $AB^2 + AC^2 = 16 = BC^2$ : rectangle en $A$ (et isocèle, car $AB = AC$)."
      }
    },
    {
      titre: "Fonctions définies sur $\\mathbb{N}$",
      texte:
        "Certaines fonctions ne sont définies que pour des entiers : on note $u(n)$ au lieu de $f(x)$.\n\n" +
        "- $u(n) = 3n + 2$ : on ajoute $3$ à chaque étape (comme une fonction affine).\n" +
        "- $u(n) = 2^n$ : on multiplie par $2$ à chaque étape.\n\n" +
        "Ce sont des **suites**, au programme de Première : elles modélisent une évolution étape par étape (par année, par mois…).",
      exemple: {
        enonce: "Une population de tortues est estimée à $u(n) = 500 \\times 1{,}1^n$ après $n$ années. Calculer $u(0)$ et $u(2)$.",
        solution: "$u(0) = 500$ et $u(2) = 500 \\times 1{,}21 = 605$ tortues."
      }
    },
    {
      titre: "Bilan des types de raisonnement",
      texte:
        "- **Démonstration directe** : on part des hypothèses et on enchaîne les propriétés (somme de deux multiples).\n" +
        "- **Contre-exemple** : un seul cas suffit pour montrer qu'une affirmation « pour tout » est fausse.\n" +
        "- **Disjonction des cas** : on sépare les cas ($n$ pair, $n$ impair).\n" +
        "- **Équivalence** : chaque étape d'une résolution est réversible ($\\iff$).\n" +
        "- **Contraposée** : « si non $Q$, alors non $P$ » démontre « si $P$, alors $Q$ ».\n" +
        "- **Absurde** : on suppose le contraire et on trouve une contradiction ($\\sqrt{2}$ irrationnel).\n\n" +
        "Ne pas confondre une implication et sa **réciproque**.",
      exemple: {
        enonce: "« Si $x > 2$, alors $x^2 > 4$. » Quelle est sa réciproque ? Est-elle vraie ?",
        solution: "Réciproque : « si $x^2 > 4$, alors $x > 2$ ». Elle est fausse : contre-exemple $x = -3$ ($9 > 4$ mais $-3 < 2$)."
      }
    },
    {
      titre: "Python : longueur approchée d'une courbe",
      texte:
        "On remplace la courbe par une **ligne brisée** de $n$ segments, et on additionne leurs longueurs (formule de la distance, chapitre 7) :\n\n" +
        "```python\nfrom math import sqrt\n\ndef f(x):\n    return x**2\n\ndef longueur(n):\n    L = 0\n    for i in range(n):\n        a, b = i / n, (i + 1) / n\n        L = L + sqrt((b - a)**2 + (f(b) - f(a))**2)\n    return L\n```\n\n" +
        "Plus $n$ est grand, plus l'approximation est précise.",
      exemple: {
        enonce: "Que renvoie $\\texttt{longueur(1)}$ ? Pourquoi est-ce une valeur approchée par défaut ?",
        solution: "Un seul segment de $(0\\,;0)$ à $(1\\,;1)$ : $\\sqrt{2} \\approx 1{,}414$. Le segment est le plus court chemin entre ses extrémités : la vraie longueur de la courbe est plus grande (environ $1{,}479$)."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES ---------- */
  exercices: [
    { type: "sy-boite", titre: "La boîte en carton", etape: "Optimisation et modélisation", nb: 4 },
    { type: "vx-optimisation", titre: "L'enclos le plus grand", etape: "Optimisation et modélisation", nb: 3 },
    { type: "sy-suite", titre: "Fonctions définies sur ℕ", etape: "Optimisation et modélisation", nb: 4 },
    { type: "sy-triangle", titre: "Triangle rectangle dans un repère", etape: "Géométrie repérée", nb: 4 },
    { type: "co-alignes", titre: "Alignement et parallélisme", etape: "Géométrie repérée", nb: 4 },
    { type: "sy-raisonnement", titre: "Reconnaître un raisonnement", etape: "Raisonner", nb: 5 },
    { type: "sy-longueur", titre: "Python : longueur d'une courbe", etape: "Raisonner", nb: 3 },
    { type: "am-flash-tout", titre: "Révision flash de l'année", etape: "Révisions", nb: 10 }
  ],

  /* ---------- 3. QCM ---------- */
  qcm: [
    {
      question: "Pour trouver le maximum de $V(x) = x(30 - 2x)^2$ en Seconde, on peut :",
      choix: ["faire un tableau de valeurs ou un balayage", "dériver la fonction", "résoudre $V(x) = 0$", "calculer $V(30)$"],
      bonne: 0,
      explication: "Sans dérivée (Première), on utilise un tableau de valeurs, la courbe ou un balayage. $V(x) = 0$ donne les valeurs où la boîte est vide."
    },
    {
      question: "Pour montrer qu'une affirmation « pour tout réel $x$ » est fausse, il suffit :",
      choix: ["d'un contre-exemple", "de trois exemples", "d'un raisonnement par l'absurde", "d'un graphique"],
      bonne: 0,
      explication: "Un seul cas où l'affirmation est fausse suffit."
    },
    {
      question: "La réciproque de « si $ABCD$ est un carré, alors $ABCD$ est un rectangle » est :",
      choix: ["si $ABCD$ est un rectangle, alors c'est un carré (fausse)", "si $ABCD$ n'est pas un rectangle, alors ce n'est pas un carré", "$ABCD$ est un carré et un rectangle", "si $ABCD$ n'est pas un carré, alors ce n'est pas un rectangle"],
      bonne: 0,
      explication: "On échange hypothèse et conclusion. Elle est fausse : un rectangle n'est pas toujours un carré. La 2e proposition est la contraposée (vraie)."
    },
    {
      question: "$u(n) = 2n + 5$. Alors $u(10)$ vaut :",
      choix: ["$25$", "$30$", "$17$", "$205$"],
      bonne: 0,
      explication: "$2 \\times 10 + 5 = 25$."
    },
    {
      question: "$A(1\\,;1)$, $B(4\\,;5)$. La distance $AB$ vaut :",
      choix: ["$5$", "$7$", "$25$", "$\\sqrt{7}$"],
      bonne: 0,
      explication: "$\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$."
    },
    {
      question: "Pour démontrer que $\\sqrt{2}$ est irrationnel, on utilise :",
      choix: ["un raisonnement par l'absurde", "un contre-exemple", "la calculatrice", "une disjonction des cas uniquement"],
      bonne: 0,
      explication: "On suppose $\\sqrt{2} = \\dfrac{p}{q}$ irréductible et on aboutit à une contradiction."
    }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Résoudre un problème de synthèse",
      etapes: [
        "Lire tout l'énoncé et repérer la question finale.",
        "Modéliser : choisir l'inconnue, ses valeurs possibles, traduire en équation, fonction ou coordonnées.",
        "Choisir la méthode : graphique pour conjecturer, calcul pour démontrer, Python pour explorer.",
        "Conclure par une phrase qui répond à la question, avec l'unité."
      ],
      exemple: "Boîte : $V(x) = x(30 - 2x)^2$ sur $]0\\,;15[$, maximum $2\\,000$ cm³ pour $x = 5$ cm."
    },
    {
      titre: "Choisir le bon raisonnement",
      etapes: [
        "Affirmation à réfuter : un contre-exemple.",
        "Propriété « pour tout entier » : démonstration directe avec des lettres, ou disjonction des cas.",
        "Propriété « n'est pas » (irrationnel, non colinéaires…) : absurde ou contraposée."
      ],
      exemple: "« $n^2 + n$ est pair » : disjonction des cas ($n$ pair, $n$ impair)."
    }
  ],
  erreurs: [
    "Oublier de préciser les valeurs possibles de l'inconnue ($0 < x < 15$ pour la boîte).",
    "Conclure à partir d'une figure ou de quelques exemples : il faut démontrer.",
    "Confondre réciproque et contraposée.",
    "Répondre sans phrase ni unité."
  ]
};
