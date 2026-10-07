/*
  CHAPITRE : Seconde — Statistiques 1 : indicateurs
  ---------------------------------------------------
  Chapitre 8 de la progression spiralée 2026-2027 (programme de Seconde 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce, programme Python entre ```python et ```).
  Vidéos : celles de la chaîne d'abord, Yvan Monka en complément.
  À ajouter quand elle sera publique : #23 « Comparer deux séries » (ZuVX12i3Wp4, encore privée le 07/10).
  Les générateurs d'exercices commencent par « st- » dans assets/exercices.js
  (le chapitre reprend aussi auto-statistiques, am-quartiles et am-boites de la partie Automatismes).
  Séries regroupées en classes et échantillonnage : chapitre 16 (Statistiques 2).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-statistiques"] = {
  niveau: "Seconde",
  numero: 8,
  titre: "Statistiques 1 : indicateurs",
  accroche: "Moyenne, médiane, quartiles, écart type : résumer une série en quelques nombres, puis comparer deux séries (pluviométrie, notes, tortues).",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur les statistiques en vidéo (Yvan Monka)", url: "https://youtu.be/dZ1arqz41Bg", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Moyenne et linéarité",
      video: { titre: "Vidéo de ton prof : indicateurs statistiques, moyenne, médiane, quartiles", youtube: "https://youtu.be/ncb1y7IwBZA" },
      texte:
        "La **moyenne** d'une série $x_1$, $x_2$, …, $x_n$ est $\\bar{x} = \\dfrac{x_1 + x_2 + \\ldots + x_n}{n}$.\n\n" +
        "Avec des effectifs $n_1$, $n_2$… (ou des coefficients), on calcule une **moyenne pondérée** : $\\bar{x} = \\dfrac{n_1x_1 + n_2x_2 + \\ldots}{n_1 + n_2 + \\ldots}$.\n\n" +
        "**Linéarité** : si chaque valeur $x$ est remplacée par $ax + b$, la moyenne devient $a\\bar{x} + b$. Ajouter $2$ points à toutes les notes ajoute $2$ points à la moyenne.",
      exemple: {
        enonce: "La moyenne des températures relevées à Mamoudzou une semaine est $28$ °C. On convertit en degrés Fahrenheit avec $F = 1{,}8C + 32$. Quelle est la moyenne en °F ?",
        solution: "Par linéarité : $1{,}8 \\times 28 + 32 = 82{,}4$ °F. Inutile de convertir chaque valeur."
      }
    },
    {
      titre: "Médiane et quartiles",
      video: { titre: "Vidéo d'Yvan Monka : calculer les quartiles", youtube: "https://youtu.be/Yjh-9nMVmEw" },
      texte:
        "On range d'abord les valeurs dans l'**ordre croissant**.\n" +
        "- La **médiane** $Me$ partage la série en deux groupes de même effectif : au moins la moitié des valeurs sont inférieures ou égales à $Me$, au moins la moitié supérieures ou égales.\n" +
        "- Le **premier quartile** $Q_1$ est la plus petite valeur telle qu'au moins $25\\,\\%$ des valeurs lui soient inférieures ou égales : rang $\\dfrac{n}{4}$, arrondi à l'entier supérieur.\n" +
        "- Le **troisième quartile** $Q_3$ : même chose avec $75\\,\\%$, rang $\\dfrac{3n}{4}$ arrondi à l'entier supérieur.\n\n" +
        "L'**écart interquartile** $Q_3 - Q_1$ mesure la dispersion des valeurs « centrales ». L'**étendue** est max $-$ min.",
      exemple: {
        enonce: "Pluviométrie (en mm) de $8$ mois : $45\\,;\\,120\\,;\\,30\\,;\\,210\\,;\\,95\\,;\\,60\\,;\\,180\\,;\\,15$. Calculer la médiane, $Q_1$ et $Q_3$.",
        solution: "Rangée : $15\\,;\\,30\\,;\\,45\\,;\\,60\\,;\\,95\\,;\\,120\\,;\\,180\\,;\\,210$.\n\n$n = 8$ est pair : $Me = \\dfrac{60 + 95}{2} = 77{,}5$ mm.\n\n$\\dfrac{8}{4} = 2$ : $Q_1 = 30$ (2e valeur). $\\dfrac{3 \\times 8}{4} = 6$ : $Q_3 = 120$ (6e valeur). Écart interquartile : $90$ mm."
      }
    },
    {
      titre: "Écart type",
      video: { titre: "Vidéo d'Yvan Monka : calculer la variance et l'écart type", youtube: "https://youtu.be/CiFoBkipJQk" },
      texte:
        "L'**écart type** $\\sigma$ mesure la dispersion des valeurs autour de la **moyenne** : plus il est petit, plus les valeurs sont regroupées.\n\n" +
        "$\\sigma = \\sqrt{V}$, où la **variance** $V$ est la moyenne des carrés des écarts à la moyenne :\n\n" +
        "$V = \\dfrac{(x_1 - \\bar{x})^2 + (x_2 - \\bar{x})^2 + \\ldots + (x_n - \\bar{x})^2}{n}$.\n\n" +
        "En pratique, on l'obtient avec la **calculatrice** (mode statistiques, valeur $\\sigma$ ou $\\sigma_x$).",
      exemple: {
        enonce: "Calculer l'écart type de la série $4\\,;\\,8\\,;\\,6\\,;\\,10$.",
        solution: "$\\bar{x} = \\dfrac{28}{4} = 7$. Écarts : $-3$, $1$, $-1$, $3$. $V = \\dfrac{9 + 1 + 1 + 9}{4} = 5$.\n\n$\\sigma = \\sqrt{5} \\approx 2{,}24$."
      }
    },
    {
      titre: "Influence d'une valeur, comparer deux séries",
      video: { titre: "Vidéo d'Yvan Monka : construire un diagramme en boîte", youtube: "https://youtu.be/la7c0Yf8VyM" },
      texte:
        "Ajouter ou supprimer une valeur **extrême** change beaucoup la moyenne, mais peu la médiane : la médiane est plus « robuste ».\n\n" +
        "Pour **comparer deux séries**, on utilise un couple d'indicateurs :\n" +
        "- (moyenne ; écart type) ;\n" +
        "- (médiane ; écart interquartile), représenté par un **diagramme en boîte**.\n\n" +
        "On compare d'abord la position (quelle série a les plus grandes valeurs ?), puis la dispersion (quelle série est la plus homogène ?). On évite les conclusions sur **chaque** valeur : les indicateurs résument, ils ne disent pas tout.",
      exemple: {
        enonce: "Un élève a $5$ notes de moyenne $12$. Il a $2$ à un devoir supplémentaire. Nouvelle moyenne ?",
        solution: "Somme : $5 \\times 12 + 2 = 62$ pour $6$ notes. Moyenne : $\\dfrac{62}{6} \\approx 10{,}33$. Une seule note très basse fait perdre presque $2$ points de moyenne."
      }
    },
    {
      titre: "Python : lire une fonction statistique",
      texte:
        "La fonction ci-dessous calcule la moyenne d'une liste $\\texttt{L}$ : la boucle additionne les valeurs, puis on divise par le nombre de valeurs $\\texttt{len(L)}$.\n\n" +
        "```python\ndef moyenne(L):\n    s = 0\n    for x in L:\n        s = s + x\n    return s / len(L)\n```\n\n" +
        "Pour l'écart type, on réutilise la moyenne :\n\n" +
        "```python\nfrom math import sqrt\n\ndef ecart_type(L):\n    m = moyenne(L)\n    v = 0\n    for x in L:\n        v = v + (x - m)**2\n    return sqrt(v / len(L))\n```",
      exemple: {
        enonce: "Que renvoie $\\texttt{ecart\\_type([4, 8, 6, 10])}$ ?",
        solution: "$m = 7$, puis $v = 9 + 1 + 1 + 9 = 20$ et la fonction renvoie $\\sqrt{\\dfrac{20}{4}} = \\sqrt{5} \\approx 2{,}236$."
      }
    }
  ],

  /* Exercices corrigés en vidéo */
  videos: [
    { titre: "Appliquer la linéarité de la moyenne", type: "Moyenne", youtube: "https://youtu.be/Z4bwDyrtO8A" },
    { titre: "Calculer l'écart interquartile", type: "Quartiles", youtube: "https://youtu.be/IjsDK0ODwlw" },
    { titre: "Calculer une moyenne pondérée", type: "Moyenne", youtube: "https://youtu.be/88_16UbkdZM" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ----------
     Chaque série tire des nombres au hasard : on peut la refaire autant qu'on veut.
     type : nom du générateur (voir assets/exercices.js). nb : nombre de questions. */
  exercices: [
    { type: "st-moyenne", titre: "Calculer une moyenne", etape: "Moyenne", nb: 4 },
    { type: "am-moyenne-ponderee", titre: "Moyenne pondérée", etape: "Moyenne", nb: 4 },
    { type: "st-linearite", titre: "Linéarité de la moyenne", etape: "Moyenne", nb: 5 },
    { type: "st-influence", titre: "Ajouter ou retirer une valeur", etape: "Moyenne", nb: 4 },
    { type: "auto-statistiques", titre: "Médiane", etape: "Médiane et quartiles", nb: 5 },
    { type: "am-quartiles", titre: "Quartiles", etape: "Médiane et quartiles", nb: 5 },
    { type: "st-interquartile", titre: "Écart interquartile", etape: "Médiane et quartiles", nb: 4 },
    { type: "st-ecart-type", titre: "Écart type à la calculatrice", etape: "Dispersion et comparaison", nb: 3 },
    { type: "st-comparer", titre: "Comparer deux séries", etape: "Dispersion et comparaison", nb: 4 },
    { type: "am-boites", titre: "Lire des diagrammes en boîte", etape: "Dispersion et comparaison", nb: 3 },
    { type: "st-python", titre: "Python : lire une fonction", etape: "Python", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ----------
     bonne : numéro de la bonne réponse en partant de 0 (0 = la première). */
  qcm: [
    {
      question: "La moyenne de $8\\,;\\,12\\,;\\,10\\,;\\,14$ est :",
      choix: ["$11$", "$10$", "$12$", "$44$"],
      bonne: 0,
      explication: "$\\dfrac{8 + 12 + 10 + 14}{4} = \\dfrac{44}{4} = 11$."
    },
    {
      question: "Une série a pour moyenne $10$. On multiplie chaque valeur par $3$ puis on ajoute $1$. La nouvelle moyenne est :",
      choix: ["$31$", "$13$", "$30$", "$40$"],
      bonne: 0,
      explication: "Linéarité : $3 \\times 10 + 1 = 31$."
    },
    {
      question: "La médiane de $3\\,;\\,9\\,;\\,4\\,;\\,15\\,;\\,7$ est :",
      choix: ["$7$", "$4$", "$7{,}6$", "$9$"],
      bonne: 0,
      explication: "Rangée : $3\\,;\\,4\\,;\\,7\\,;\\,9\\,;\\,15$. Il y a $5$ valeurs, la médiane est la 3e : $7$. ($7{,}6$ est la moyenne.)"
    },
    {
      question: "Pour une série de $20$ valeurs rangées, $Q_1$ est :",
      choix: ["la 5e valeur", "la 4e valeur", "la 10e valeur", "la moyenne de la 5e et de la 6e"],
      bonne: 0,
      explication: "$\\dfrac{20}{4} = 5$ : $Q_1$ est la 5e valeur."
    },
    {
      question: "L'écart type d'une série mesure :",
      choix: ["la dispersion des valeurs autour de la moyenne", "la valeur centrale", "l'écart entre le max et le min", "le nombre de valeurs"],
      bonne: 0,
      explication: "Plus l'écart type est grand, plus les valeurs sont éloignées de la moyenne. L'écart max $-$ min est l'étendue."
    },
    {
      question: "On ajoute la valeur $1\\,000$ à une série de $10$ valeurs comprises entre $10$ et $20$. Quel indicateur change le plus ?",
      choix: ["la moyenne", "la médiane", "le premier quartile", "aucun"],
      bonne: 0,
      explication: "Une valeur extrême tire fortement la moyenne. La médiane et les quartiles bougent à peine : ils sont « robustes »."
    },
    {
      question: "Deux classes ont la même moyenne. La classe A a un écart type de $2$, la classe B de $4{,}5$. Alors :",
      choix: ["les notes de A sont plus homogènes", "les notes de B sont plus homogènes", "la classe B a de meilleures notes", "la classe A a de meilleures notes"],
      bonne: 0,
      explication: "Même position, mais A est moins dispersée. L'écart type ne dit rien sur le niveau, seulement sur la dispersion."
    },
    {
      question: "Pour comparer deux séries avec la médiane, on l'associe à :",
      choix: ["l'écart interquartile", "l'écart type", "la moyenne", "l'effectif"],
      bonne: 0,
      explication: "Les couples cohérents sont (médiane ; écart interquartile) et (moyenne ; écart type)."
    },
    {
      question: "Dans un diagramme en boîte, la boîte va de :",
      choix: ["$Q_1$ à $Q_3$", "min à max", "$Q_1$ à la médiane", "la moyenne moins $\\sigma$ à la moyenne plus $\\sigma$"],
      bonne: 0,
      explication: "La boîte va de $Q_1$ à $Q_3$, avec un trait à la médiane ; les moustaches vont jusqu'au min et au max."
    },
    {
      question: "En Python, $\\texttt{len([3, 8, 5])}$ vaut :",
      choix: ["$3$", "$16$", "$8$", "$5{,}33$"],
      bonne: 0,
      explication: "$\\texttt{len}$ donne le nombre d'éléments de la liste : $3$."
    }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer médiane et quartiles",
      etapes: [
        "Ranger les valeurs dans l'ordre croissant et compter l'effectif $n$.",
        "Médiane : si $n$ est impair, la valeur du milieu ; si $n$ est pair, la moyenne des deux valeurs du milieu.",
        "$Q_1$ : rang $\\dfrac{n}{4}$ arrondi à l'entier supérieur. $Q_3$ : rang $\\dfrac{3n}{4}$ arrondi à l'entier supérieur."
      ],
      exemple: "$n = 11$ : $Me$ = 6e valeur, $Q_1$ = 3e, $Q_3$ = 9e."
    },
    {
      titre: "Utiliser la linéarité de la moyenne",
      etapes: [
        "Repérer la transformation : chaque $x$ devient $ax + b$.",
        "Appliquer la même transformation à la moyenne : $a\\bar{x} + b$.",
        "Vérifier l'unité."
      ],
      exemple: "$\\bar{x} = 28$ °C, $F = 1{,}8C + 32$ : moyenne $82{,}4$ °F."
    },
    {
      titre: "Obtenir l'écart type à la calculatrice",
      etapes: [
        "Entrer les valeurs (et les effectifs) dans une liste.",
        "Lancer le calcul statistique à une variable.",
        "Lire $\\sigma$ (ou $\\sigma_x$), et non $s$."
      ],
      exemple: "$4\\,;\\,8\\,;\\,6\\,;\\,10$ : $\\bar{x} = 7$, $\\sigma \\approx 2{,}24$."
    },
    {
      titre: "Comparer deux séries",
      etapes: [
        "Choisir un couple : (moyenne ; écart type) ou (médiane ; écart interquartile).",
        "Comparer la position : quelle série a les valeurs les plus grandes en général ?",
        "Comparer la dispersion : quelle série est la plus homogène ?",
        "Conclure avec prudence, sans parler de chaque valeur."
      ],
      exemple: "Même moyenne, $\\sigma_A = 2 < \\sigma_B = 4{,}5$ : les notes de A sont plus homogènes."
    }
  ],
  erreurs: [
    "Chercher la médiane sans ranger les valeurs.",
    "Confondre médiane et moyenne.",
    "Prendre la moyenne de l'ancienne moyenne et de la nouvelle valeur : il faut repasser par la somme.",
    "Confondre écart interquartile ($Q_3 - Q_1$) et étendue (max $-$ min).",
    "Lire $s$ au lieu de $\\sigma$ sur la calculatrice, ou donner la variance au lieu de l'écart type.",
    "Conclure « tous les élèves de A ont de meilleures notes » à partir de la seule moyenne.",
    "Mélanger les couples : médiane avec écart type."
  ]
};
