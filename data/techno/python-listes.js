/*
  CHAPITRE : Première technologique — Python : fonctions et listes
  -----------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé ; code en ligne avec \\texttt, blocs ```python).
  Programme 2026 de première technologique, partie transversale « Algorithmique et programmation » (sauf série STD2A) :
  variables (générateur aléatoire, compteur, accumulateur), fonctions (entrées, sorties, structurer), listes (en extension,
  par ajouts, en compréhension ; indices ; parcours), sélection de données.
  video : vidéos d'Yvan Monka. Générateurs : préfixe yl- dans assets/exercices-techno.js ; figures "yl-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["techno-python-listes"] = {
  niveau: "Première technologique",
  numero: 2,
  titre: "Python : fonctions et listes",
  accroche: "Variables, boucles, fonctions avec $\\texttt{return}$, et la nouveauté de l'année : les **listes**, pour ranger des suites de nombres, des valeurs ou des tirages au sort.",

  playlist: "",
  drive: "",
  pdfs: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Variables, compteur, accumulateur",
      figure: "yl-cours-boucle",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les boucles en Python", youtube: "https://youtu.be/i_imOJ9Vw0U" },
      texte:
        "Une **variable** est une case mémoire avec un nom. L'**affectation** $\\texttt{a = 5}$ y range la valeur $5$ (en langage naturel on écrit $a \\leftarrow 5$). Le signe $\\texttt{=}$ n'est pas une égalité : $\\texttt{a = a + 1}$ signifie « $\\texttt{a}$ reçoit sa valeur augmentée de $1$ ».\n\n" +
        "Deux usages très fréquents dans une boucle :\n\n" +
        "- un **compteur** compte combien de fois quelque chose se produit : $\\texttt{c = c + 1}$ ;\n" +
        "- un **accumulateur** additionne (ou multiplie) des valeurs au fur et à mesure : $\\texttt{s = s + x}$ ou $\\texttt{p = p * x}$.\n\n" +
        "```python\ns = 0                    # accumulateur\nfor k in range(1, 11):   # k vaut 1, 2, …, 10\n    s = s + k\nprint(s)                 # 55\n```\n\n" +
        "$\\texttt{range(1, 11)}$ donne les entiers de $1$ à $10$ : **la dernière borne est exclue**. $\\texttt{range(4)}$ donne $0$, $1$, $2$, $3$.",
      exemple: {
        enonce: "Que vaut $\\texttt{p}$ après ce programme ? $\\texttt{p = 1}$, puis $\\texttt{for k in range(3): p = p * 5}$.",
        solution: "La boucle fait $3$ tours ($k = 0, 1, 2$) et multiplie $\\texttt{p}$ par $5$ à chaque fois : $\\texttt{p} = 5^3 = 125$."
      }
    },
    {
      titre: "Fonctions : entrées et sortie",
      figure: "yl-cours-fonction",
      texte:
        "Une **fonction** Python reçoit des **entrées** (ses paramètres) et **renvoie** une sortie avec $\\texttt{return}$ :\n\n" +
        "```python\ndef prix(x):             # entrée : x, le montant des achats\n    if x < 50:\n        return x + 6     # frais de port\n    else:\n        return x\n\nprint(prix(30))          # 36\nprint(prix(80))          # 80\n```\n\n" +
        "$\\texttt{return}$ arrête la fonction et renvoie la valeur, qu'on peut réutiliser dans un calcul ou ranger dans une variable ; $\\texttt{print}$ ne fait qu'afficher. Une fonction peut avoir plusieurs entrées : $\\texttt{def aire(L, l): return L * l}$.\n\n" +
        "**Structurer un programme** : on découpe une tâche en petites fonctions (une pour simuler un tirage, une pour calculer une moyenne…), puis on les assemble. C'est la programmation modulaire.",
      exemple: {
        enonce: "Écris une fonction $\\texttt{image(x)}$ qui renvoie $f(x) = 3x^2 - 2$, puis calcule $\\texttt{image(4)}$.",
        solution: "$\\texttt{def image(x): return 3 * x ** 2 - 2}$. Alors $\\texttt{image(4)} = 3 \\times 16 - 2 = 46$. (Rappel : $\\texttt{**}$ est la puissance.)"
      }
    },
    {
      titre: "Les listes : construire et lire",
      figure: "yl-cours-liste",
      video: { titre: "Vidéo d'Yvan Monka : créer une liste en Python", youtube: "https://youtu.be/vVTdlibPu1Y" },
      texte:
        "Une **liste** range plusieurs valeurs dans un ordre. Trois façons de la construire :\n\n" +
        "```python\nL = [4, 9, 2, 7, 5]                   # en extension\nM = []\nfor k in range(5):\n    M.append(2 * k)                   # par ajouts successifs : [0, 2, 4, 6, 8]\nN = [k * k for k in range(5)]         # en compréhension : [0, 1, 4, 9, 16]\n```\n\n" +
        "Chaque élément a un **indice**, en commençant à $0$ : $\\texttt{L[0]}$ vaut $4$, $\\texttt{L[1]}$ vaut $9$, $\\texttt{L[4]}$ vaut $5$. Un indice négatif part de la fin : $\\texttt{L[-1]}$ est le dernier élément. $\\texttt{len(L)}$ est le nombre d'éléments ($5$) et $\\texttt{sum(L)}$ leur somme.\n\n" +
        "On peut **modifier** un élément ($\\texttt{L[2] = 10}$), en **ajouter** un à la fin ($\\texttt{L.append(3)}$) ou en **supprimer** un ($\\texttt{L.pop()}$ retire le dernier, $\\texttt{L.remove(9)}$ retire la valeur $9$).",
      exemple: {
        enonce: "$\\texttt{L = [4, 9, 2, 7, 5]}$. Que valent $\\texttt{L[2]}$, $\\texttt{L[-2]}$ et $\\texttt{len(L)}$ ?",
        solution: "$\\texttt{L[2]} = 2$ (troisième élément), $\\texttt{L[-2]} = 7$ (avant-dernier), $\\texttt{len(L)} = 5$."
      }
    },
    {
      titre: "Parcourir une liste",
      video: { titre: "Vidéo d'Yvan Monka : calculer la somme des termes d'une suite avec Python", youtube: "https://youtu.be/_3bwycUCtmg" },
      texte:
        "$\\texttt{for x in L:}$ parcourt les éléments de $\\texttt{L}$ un par un. Avec un compteur ou un accumulateur, on obtient beaucoup d'informations :\n\n" +
        "```python\nL = [12, 7, 15, 9, 20]\nc = 0            # compteur des valeurs > 10\ns = 0            # somme\nm = L[0]         # maximum\nfor x in L:\n    if x > 10:\n        c = c + 1\n    s = s + x\n    if x > m:\n        m = x\nprint(c, s / len(L), m)   # 3  12.6  20\n```\n\n" +
        "La **moyenne** est $\\texttt{s / len(L)}$ (ou directement $\\texttt{sum(L) / len(L)}$).",
      exemple: {
        enonce: "Que renvoie $\\texttt{[x for x in L if x > 10]}$ avec $\\texttt{L = [12, 7, 15, 9, 20]}$ ?",
        solution: "La liste des éléments qui vérifient la condition : $\\texttt{[12, 15, 20]}$. C'est un **filtre**, une liste en compréhension avec une condition."
      }
    },
    {
      titre: "Simuler avec $\\texttt{random()}$",
      video: { titre: "Vidéo d'Yvan Monka : simuler une expérience avec Python", youtube: "https://youtu.be/EXEcSJE31QY" },
      texte:
        "$\\texttt{random()}$ (du module $\\texttt{random}$) renvoie un nombre au hasard entre $0$ et $1$ ; la probabilité qu'il soit inférieur à $p$ vaut $p$. On simule donc une **loi de Bernoulli** de paramètre $p$ (résultat $1$ avec la probabilité $p$, sinon $0$) :\n\n" +
        "```python\nfrom random import random\n\ndef bernoulli(p):\n    if random() < p:\n        return 1\n    else:\n        return 0\n\nL = [bernoulli(0.3) for k in range(100)]   # échantillon de taille 100\nprint(sum(L) / 100)                        # fréquence des 1, proche de 0,3\n```\n\n" +
        "Ce programme sert dans tout le chapitre sur les variables aléatoires : on y relance $N$ échantillons et on observe la **fluctuation** des fréquences.",
      exemple: {
        enonce: "Quelle instruction simule le lancer d'un dé équilibré ?",
        solution: "$\\texttt{randint(1, 6)}$ (du module $\\texttt{random}$) renvoie un entier entre $1$ et $6$ compris. Pour « obtenir un $6$ » on peut écrire $\\texttt{bernoulli(1/6)}$."
      }
    },
    {
      titre: "Sélectionner des données",
      texte:
        "Un fichier de données réelles (tableur, CSV) se lit comme une liste de lignes. Pour **extraire** une information, on filtre puis on compte ou on additionne :\n\n" +
        "```python\nages = [15, 17, 16, 18, 15, 17, 16, 16]\nmajeurs = [a for a in ages if a >= 18]\nprint(len(majeurs))          # 1\n```\n\n" +
        "Un **tableau croisé** sur deux critères (par exemple série et sexe) s'obtient en comptant, pour chaque case, les lignes qui vérifient les deux conditions avec $\\texttt{and}$. Au tableur, la fonction $\\texttt{NB.SI.ENS}$ fait le même travail."
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "yl-affectation", titre: "Suivre les variables", etape: "Variables", nb: 5 },
    { type: "yl-compteur", titre: "Compteur et accumulateur", etape: "Variables", nb: 5 },
    { type: "yl-fonction", titre: "Entrées et sortie d'une fonction", etape: "Fonctions", nb: 5 },
    { type: "yl-condition", titre: "Conditions dans une fonction", etape: "Fonctions", nb: 5 },
    { type: "yl-indice", titre: "Lire une liste : indices, longueur", etape: "Listes", nb: 5 },
    { type: "yl-comprehension", titre: "Listes en compréhension", etape: "Listes", nb: 5 },
    { type: "yl-parcourir", titre: "Parcourir une liste", etape: "Listes", nb: 5 },
    { type: "yl-bernoulli", titre: "Simuler une loi de Bernoulli", etape: "Simulation", nb: 4 },
    { type: "yl-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Après $\\texttt{a = 4}$ puis $\\texttt{a = a + 3}$, la variable $\\texttt{a}$ vaut :", choix: ["$7$", "$4$", "$3$", "$43$"], bonne: 0, explication: "L'affectation remplace l'ancienne valeur par $4 + 3$." },
    { question: "$\\texttt{range(6)}$ donne :", choix: ["$0, 1, 2, 3, 4, 5$", "$1, 2, 3, 4, 5, 6$", "$0, 1, 2, 3, 4, 5, 6$", "$1, 2, 3, 4, 5$"], bonne: 0, explication: "On part de $0$ et la borne $6$ est exclue : six valeurs." },
    { question: "$\\texttt{range(2, 7)}$ donne :", choix: ["$2, 3, 4, 5, 6$", "$2, 3, 4, 5, 6, 7$", "$3, 4, 5, 6, 7$", "$2, 7$"], bonne: 0, explication: "De $2$ compris à $7$ exclu." },
    { question: "Dans $\\texttt{s = 0}$ puis $\\texttt{for k in range(4): s = s + k}$, la valeur finale de $\\texttt{s}$ est :", choix: ["$6$", "$10$", "$4$", "$3$"], bonne: 0, explication: "$0 + 1 + 2 + 3 = 6$." },
    { question: "$\\texttt{c = c + 1}$ dans une boucle est :", choix: ["un compteur", "un accumulateur de somme", "une condition", "une liste"], bonne: 0, explication: "Il augmente de $1$ à chaque fois : il compte." },
    { question: "Dans une fonction, $\\texttt{return}$ sert à :", choix: ["renvoyer la sortie et arrêter la fonction", "afficher un texte", "définir l'entrée", "répéter des instructions"], bonne: 0, explication: "$\\texttt{print}$ affiche, $\\texttt{return}$ renvoie." },
    { question: "Avec $\\texttt{def f(x): return 2 * x + 1}$, $\\texttt{f(5)}$ vaut :", choix: ["$11$", "$10$", "$7$", "$2 \\times 5 + 1$ n'est pas calculé"], bonne: 0, explication: "On remplace $\\texttt{x}$ par $5$ : $2 \\times 5 + 1 = 11$." },
    { question: "$\\texttt{x ** 3}$ calcule :", choix: ["$x^3$", "$3x$", "$x \\times 3$", "$x + 3$"], bonne: 0, explication: "$\\texttt{**}$ est la puissance." },
    { question: "$\\texttt{L = [5, 8, 2, 9]}$. Alors $\\texttt{L[1]}$ vaut :", choix: ["$8$", "$5$", "$2$", "$1$"], bonne: 0, explication: "Les indices commencent à $0$ : $\\texttt{L[1]}$ est le deuxième élément." },
    { question: "$\\texttt{L = [5, 8, 2, 9]}$. Alors $\\texttt{L[-1]}$ vaut :", choix: ["$9$", "$5$", "$-1$", "erreur"], bonne: 0, explication: "Un indice négatif part de la fin : $\\texttt{L[-1]}$ est le dernier élément." },
    { question: "$\\texttt{L = [5, 8, 2, 9]}$. Alors $\\texttt{len(L)}$ vaut :", choix: ["$4$", "$3$", "$24$", "$9$"], bonne: 0, explication: "La liste a $4$ éléments." },
    { question: "$\\texttt{L = [5, 8, 2, 9]}$. Alors $\\texttt{sum(L)}$ vaut :", choix: ["$24$", "$4$", "$9$", "$5829$"], bonne: 0, explication: "$5 + 8 + 2 + 9 = 24$." },
    { question: "Après $\\texttt{L = [5, 8, 2, 9]}$ puis $\\texttt{L.append(1)}$, la liste est :", choix: ["$\\texttt{[5, 8, 2, 9, 1]}$", "$\\texttt{[1, 5, 8, 2, 9]}$", "$\\texttt{[5, 8, 2, 1]}$", "$\\texttt{[6, 9, 3, 10]}$"], bonne: 0, explication: "$\\texttt{append}$ ajoute à la fin." },
    { question: "$\\texttt{[3 * k for k in range(4)]}$ vaut :", choix: ["$\\texttt{[0, 3, 6, 9]}$", "$\\texttt{[3, 6, 9, 12]}$", "$\\texttt{[0, 3, 6, 9, 12]}$", "$\\texttt{[3, 3, 3, 3]}$"], bonne: 0, explication: "$3k$ pour $k = 0, 1, 2, 3$." },
    { question: "$\\texttt{[k for k in range(10) if k > 6]}$ vaut :", choix: ["$\\texttt{[7, 8, 9]}$", "$\\texttt{[6, 7, 8, 9]}$", "$\\texttt{[7, 8, 9, 10]}$", "$\\texttt{[0, 1, 2, 3, 4, 5, 6]}$"], bonne: 0, explication: "On garde les entiers strictement supérieurs à $6$ parmi $0$ à $9$." },
    { question: "Quelle construction crée la liste $\\texttt{[1, 4, 9, 16]}$ ?", choix: ["$\\texttt{[k ** 2 for k in range(1, 5)]}$", "$\\texttt{[k ** 2 for k in range(4)]}$", "$\\texttt{[2 * k for k in range(1, 5)]}$", "$\\texttt{range(1, 17)}$"], bonne: 0, explication: "Les carrés de $1$, $2$, $3$, $4$ : il faut partir de $1$." },
    { question: "Dans $\\texttt{for x in L: if x > m: m = x}$ (avec $\\texttt{m = L[0]}$ au départ), $\\texttt{m}$ contient à la fin :", choix: ["le maximum de la liste", "le minimum de la liste", "la somme de la liste", "le dernier élément"], bonne: 0, explication: "$\\texttt{m}$ est remplacé dès qu'un élément plus grand est rencontré." },
    { question: "La moyenne des éléments de $\\texttt{L}$ s'écrit :", choix: ["$\\texttt{sum(L) / len(L)}$", "$\\texttt{sum(L) * len(L)}$", "$\\texttt{len(L) / sum(L)}$", "$\\texttt{moyenne(L)}$"], bonne: 0, explication: "Somme des valeurs divisée par leur nombre." },
    { question: "$\\texttt{random()}$ renvoie :", choix: ["un nombre au hasard entre $0$ et $1$", "un entier entre $0$ et $10$", "toujours $0$ ou $1$", "un nombre entre $1$ et $6$"], bonne: 0, explication: "C'est un réel uniforme dans $[0\\,;1[$." },
    { question: "$\\texttt{random() < 0.2}$ est vrai avec la probabilité :", choix: ["$0{,}2$", "$0{,}8$", "$0{,}5$", "$2$"], bonne: 0, explication: "Un nombre uniforme entre $0$ et $1$ est inférieur à $0{,}2$ dans $20\\,\\%$ des cas." },
    { question: "Pour simuler une loi de Bernoulli de paramètre $0{,}7$, on renvoie $1$ si :", choix: ["$\\texttt{random() < 0.7}$", "$\\texttt{random() > 0.7}$", "$\\texttt{random() == 0.7}$", "$\\texttt{random() < 7}$"], bonne: 0, explication: "La probabilité que $\\texttt{random()}$ soit inférieur à $0{,}7$ vaut $0{,}7$." },
    { question: "$\\texttt{[bernoulli(0.5) for k in range(200)]}$ est :", choix: ["un échantillon de $200$ tirages", "un seul tirage répété", "une liste de $200$ zéros", "une erreur"], bonne: 0, explication: "La fonction est appelée $200$ fois, chaque appel donne un nouveau tirage." },
    { question: "Dans $\\texttt{if x > 5 and x < 9}$, la condition est vraie pour :", choix: ["$x = 7$", "$x = 5$", "$x = 9$", "$x = 12$"], bonne: 0, explication: "Les deux conditions doivent être vraies : $5 < x < 9$." },
    { question: "Pour $\\texttt{def mention(n)}$ avec $\\texttt{if n >= 16: return \"TB\"}$, $\\texttt{elif n >= 12: return \"B\"}$, $\\texttt{else: return \"sans\"}$, $\\texttt{mention(14)}$ renvoie :", choix: ["$\\texttt{\"B\"}$", "$\\texttt{\"TB\"}$", "$\\texttt{\"sans\"}$", "$14$"], bonne: 0, explication: "$14 \\geqslant 16$ est faux, $14 \\geqslant 12$ est vrai." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Exécuter un programme à la main",
      figure: "yl-cours-boucle",
      etapes: [
        "Faire un tableau avec une colonne par variable.",
        "Exécuter les instructions une par une, de haut en bas, et noter la nouvelle valeur après chaque affectation.",
        "Pour une boucle $\\texttt{for k in range(n)}$, ajouter une ligne par tour ($k = 0$ à $n - 1$).",
        "La réponse est la dernière ligne du tableau."
      ],
      exemple: "$\\texttt{s = 1}$ ; $\\texttt{for k in range(3): s = 2 * s}$ : $s = 2$, puis $4$, puis $8$."
    },
    {
      titre: "Écrire une fonction",
      figure: "yl-cours-fonction",
      etapes: [
        "Identifier les entrées (les paramètres) et la sortie.",
        "Écrire $\\texttt{def nom(entrées):}$ puis les calculs, indentés.",
        "Terminer par $\\texttt{return}$ suivi de la valeur à renvoyer.",
        "Tester avec une valeur dont on connaît le résultat."
      ],
      exemple: "$\\texttt{def volume(a): return a ** 3}$ ; test : $\\texttt{volume(2)}$ doit donner $8$."
    },
    {
      titre: "Construire une liste",
      figure: "yl-cours-liste",
      etapes: [
        "Quelques valeurs connues : en extension, $\\texttt{[3, 5, 8]}$.",
        "Une formule en $k$ : en compréhension, $\\texttt{[formule for k in range(n)]}$.",
        "Valeurs calculées de proche en proche (suite récurrente, tirages) : liste vide puis $\\texttt{append}$ dans une boucle.",
        "Vérifier le nombre d'éléments avec $\\texttt{len}$."
      ],
      exemple: "Les $5$ premiers multiples de $7$ : $\\texttt{[7 * k for k in range(1, 6)]}$ donne $\\texttt{[7, 14, 21, 28, 35]}$."
    },
    {
      titre: "Compter ou additionner dans une liste",
      etapes: [
        "Initialiser le compteur ($\\texttt{c = 0}$) ou l'accumulateur ($\\texttt{s = 0}$) **avant** la boucle.",
        "Parcourir avec $\\texttt{for x in L:}$.",
        "Dans la boucle, tester la condition avec $\\texttt{if}$, puis $\\texttt{c = c + 1}$ ou $\\texttt{s = s + x}$.",
        "Afficher ou renvoyer le résultat **après** la boucle."
      ],
      exemple: "Nombre de notes $\\geqslant 10$ : $\\texttt{c = 0}$ ; $\\texttt{for x in L: if x >= 10: c = c + 1}$."
    }
  ],
  erreurs: [
    "Croire que $\\texttt{range(n)}$ va jusqu'à $n$ : la dernière valeur est $n - 1$.",
    "Compter les indices à partir de $1$ : $\\texttt{L[0]}$ est le premier élément.",
    "Confondre $\\texttt{print}$ (afficher) et $\\texttt{return}$ (renvoyer une valeur utilisable).",
    "Oublier d'initialiser le compteur ou l'accumulateur avant la boucle.",
    "Mettre le $\\texttt{return}$ ou le $\\texttt{print}$ **dans** la boucle alors qu'on veut le résultat final.",
    "Écrire $\\texttt{x \\textasciicircum{} 2}$ (accent circonflexe, comme sur la calculatrice) pour le carré : en Python c'est $\\texttt{x ** 2}$.",
    "Oublier les deux-points et l'indentation après $\\texttt{if}$, $\\texttt{for}$, $\\texttt{def}$.",
    "Utiliser $\\texttt{[bernoulli()] * 100}$ pour un échantillon : c'est un seul tirage recopié."
  ]
};
