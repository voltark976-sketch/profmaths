/*
  CHAPITRE : Terminale spécialité — Loi binomiale
  ------------------------------------------------
  Chapitre 5 de la progression de Terminale spécialité (V26, période 2, 2 semaines) :
  succession d'épreuves indépendantes, schéma de Bernoulli et loi binomiale.
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Vidéos : celles de la chaîne (playlist « Tle comp lois discrètes ») d'abord, puis Yvan Monka.
  Figures : "bin-arbre", "bin-diagramme". Générateurs : bin- (et pi-totales, ld-traduire, ld-cumul).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-spe-loi-binomiale"] = {
  niveau: "Terminale spécialité",
  numero: 5,
  titre: "Loi binomiale",
  accroche: "Répéter la même expérience à deux issues et compter les succès : l'arbre, les coefficients binomiaux, la formule $P(X = k)$ et l'espérance $np$.",

  playlist: "https://www.youtube.com/playlist?list=PLWqYEdzXrOlI",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours complet sur la loi binomiale en vidéo (Yvan Monka)", url: "https://youtu.be/xMmfPUoBTtM", type: "video" },
    { titre: "Démonstration : formule de la loi binomiale (Yvan Monka)", url: "https://youtu.be/R45L_2gS8lU", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Rappels : probabilités conditionnelles",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la formule des probabilités totales", youtube: "https://youtu.be/qTpTBoZA7zY" },
      texte:
        "- **Probabilité conditionnelle** : si $P(A) \\neq 0$, $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$, donc $P(A \\cap B) = P(A) \\times P_A(B)$.\n" +
        "- Dans un **arbre pondéré**, on multiplie les probabilités le long d'un chemin, et la somme des probabilités des branches issues d'un même nœud vaut $1$.\n" +
        "- **Probabilités totales** : si $A$ et $\\overline{A}$ partagent l'univers, $P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.\n" +
        "- $A$ et $B$ sont **indépendants** si $P(A \\cap B) = P(A) \\times P(B)$, c'est-à-dire (si $P(A) \\neq 0$) $P_A(B) = P(B)$ : savoir que $A$ est réalisé ne change pas la probabilité de $B$.",
      exemple: {
        enonce: "$60\\,\\%$ des élèves d'un lycée prennent le bus. Parmi eux, $10\\,\\%$ arrivent en retard ; parmi les autres, $5\\,\\%$. Quelle est la probabilité qu'un élève pris au hasard arrive en retard ?",
        solution: "$P(R) = 0{,}6 \\times 0{,}1 + 0{,}4 \\times 0{,}05 = 0{,}06 + 0{,}02 = 0{,}08$.\n\nLe retard et le bus ne sont pas indépendants : $P_B(R) = 0{,}1 \\neq P(R) = 0{,}08$."
      }
    },
    {
      titre: "Succession d'épreuves indépendantes",
      video: { titre: "Vidéo d'Yvan Monka : calculer la probabilité d'une succession d'épreuves indépendantes", youtube: "https://youtu.be/Pz9VCp-Rsnk" },
      texte:
        "On enchaîne plusieurs épreuves **indépendantes** : le résultat de l'une n'influence pas les autres (lancers successifs, tirages **avec remise**…).\n\n" +
        "- Une issue est une liste de résultats $(x_1\\,;x_2\\,;\\dots\\,;x_n)$ ; l'univers est le produit cartésien des univers de chaque épreuve.\n" +
        "- La probabilité d'une liste de résultats est le **produit** des probabilités de chaque résultat.\n\n" +
        "Dans un arbre, les probabilités des branches ne changent pas d'un niveau à l'autre.\n\n" +
        "Attention : des tirages **sans remise** ne sont pas indépendants, car la composition de l'urne change.",
      exemple: {
        enonce: "On lance un dé équilibré, puis une pièce équilibrée. Quelle est la probabilité d'obtenir un nombre pair puis FACE ?",
        solution: "Les deux épreuves sont indépendantes : $P = \\dfrac{3}{6} \\times \\dfrac{1}{2} = \\dfrac{1}{4}$."
      }
    },
    {
      titre: "Épreuve et loi de Bernoulli",
      video: { titre: "Vidéo de ton prof : variable aléatoire et loi de Bernoulli", youtube: "https://youtu.be/gQhLo-TDi9Q" },
      texte:
        "Une **épreuve de Bernoulli** de paramètre $p$ est une expérience à **deux issues** : le **succès** $S$, de probabilité $p$, et l'**échec** $\\overline{S}$, de probabilité $1 - p$.\n\n" +
        "La variable aléatoire $X$ qui vaut $1$ en cas de succès et $0$ en cas d'échec suit la **loi de Bernoulli** de paramètre $p$ :\n\n" +
        "- $P(X = 1) = p$ et $P(X = 0) = 1 - p$ ;\n" +
        "- $E(X) = p$ et $V(X) = p(1 - p)$.\n\n" +
        "Choisir ce qu'on appelle « succès » fait partie de la modélisation : ce n'est pas forcément quelque chose de positif (une pièce défectueuse, par exemple).",
      exemple: {
        enonce: "On lance un dé équilibré ; on appelle succès « obtenir $5$ ou $6$ ». Donne le paramètre, l'espérance et la variance de la loi de Bernoulli associée.",
        solution: "$p = \\dfrac{2}{6} = \\dfrac{1}{3}$. Alors $E(X) = \\dfrac{1}{3}$ et $V(X) = \\dfrac{1}{3} \\times \\dfrac{2}{3} = \\dfrac{2}{9}$."
      }
    },
    {
      titre: "Schéma de Bernoulli et loi binomiale",
      figure: "bin-arbre",
      video: { titre: "Vidéo de ton prof : schéma de Bernoulli et loi binomiale", youtube: "https://youtu.be/CZvdNX3NMP0" },
      texte:
        "Un **schéma de Bernoulli** de paramètres $n$ et $p$ est la répétition de $n$ épreuves de Bernoulli **identiques et indépendantes**, de même paramètre $p$.\n\n" +
        "La variable aléatoire $X$ qui **compte le nombre de succès** suit la **loi binomiale** $\\mathcal{B}(n\\,;p)$. Elle prend les valeurs $0$, $1$, …, $n$.\n\n" +
        "Pour reconnaître une loi binomiale, on vérifie :\n\n" +
        "- une épreuve à deux issues, répétée un nombre $n$ de fois **fixé à l'avance** ;\n" +
        "- des répétitions **identiques et indépendantes** (même $p$ à chaque fois) ;\n" +
        "- $X$ **compte** les succès.\n\n" +
        "Un sondage sans remise dans une très grande population s'assimile à des tirages avec remise.",
      exemple: {
        enonce: "Dans l'arbre de $3$ épreuves (figure), combien de chemins mènent à exactement $2$ succès ? Quelle est la probabilité de chacun ?",
        solution: "Les chemins $SSE$, $SES$ et $ESS$ : il y en a $3$. Chacun a pour probabilité $p \\times p \\times (1 - p) = p^2(1 - p)$.\n\nDonc $P(X = 2) = 3p^2(1 - p)$."
      }
    },
    {
      titre: "Calculer $P(X = k)$",
      video: { titre: "Vidéo d'Yvan Monka : calculer une probabilité avec une loi binomiale", youtube: "https://youtu.be/1gMq2TJwSh0" },
      texte:
        "Dans l'arbre d'un schéma de Bernoulli à $n$ épreuves, le nombre de chemins comportant exactement $k$ succès est le **coefficient binomial** $\\dbinom{n}{k}$ (chapitre 14 : c'est le nombre de façons de placer les $k$ succès parmi les $n$ épreuves). Chacun de ces chemins a pour probabilité $p^k(1 - p)^{n-k}$.\n\n" +
        "Si $X$ suit la loi $\\mathcal{B}(n\\,;p)$, alors pour tout entier $k$ entre $0$ et $n$ :\n\n" +
        "$P(X = k) = \\dbinom{n}{k} p^k (1 - p)^{n-k}$.\n\n" +
        "- $\\dbinom{n}{0} = \\dbinom{n}{n} = 1$, $\\dbinom{n}{1} = n$, et $\\dbinom{n}{k} = \\dbinom{n}{n - k}$.\n" +
        "- Les coefficients se lisent dans le **triangle de Pascal** ou se calculent à la calculatrice (touche nCr).\n" +
        "- « Au moins un succès » : $P(X \\geqslant 1) = 1 - P(X = 0) = 1 - (1 - p)^n$.",
      exemple: {
        enonce: "Un QCM a $5$ questions à $4$ réponses, dont une seule juste. Un élève répond au hasard. Probabilité d'avoir exactement $3$ bonnes réponses ?",
        solution: "$X$ suit la loi $\\mathcal{B}\\left(5\\,;\\dfrac{1}{4}\\right)$.\n\n$P(X = 3) = \\dbinom{5}{3} \\times 0{,}25^3 \\times 0{,}75^2 = 10 \\times 0{,}015625 \\times 0{,}5625 \\approx 0{,}088$."
      }
    },
    {
      titre: "Espérance, variance, écart type",
      figure: "bin-diagramme",
      video: { titre: "Vidéo d'Yvan Monka : calculer l'espérance d'une loi binomiale", youtube: "https://youtu.be/95t19fznDOU" },
      texte:
        "Si $X$ suit la loi $\\mathcal{B}(n\\,;p)$ :\n\n" +
        "- $E(X) = np$ ;\n" +
        "- $V(X) = np(1 - p)$ ;\n" +
        "- $\\sigma(X) = \\sqrt{np(1 - p)}$.\n\n" +
        "L'espérance est le nombre moyen de succès sur un très grand nombre de répétitions du schéma. On le comprend avec la loi de Bernoulli : chaque épreuve rapporte en moyenne $p$ succès, et il y a $n$ épreuves. La démonstration de ces formules est au programme du chapitre 15 (somme de variables aléatoires).\n\n" +
        "Le diagramme en bâtons de la loi est en forme de « cloche », avec les valeurs les plus probables autour de $np$.",
      exemple: {
        enonce: "$X$ suit la loi $\\mathcal{B}(10\\,;0{,}3)$ (figure). Calcule $E(X)$ et $\\sigma(X)$.",
        solution: "$E(X) = 10 \\times 0{,}3 = 3$ : c'est bien autour de $3$ que les bâtons sont les plus hauts.\n\n$V(X) = 10 \\times 0{,}3 \\times 0{,}7 = 2{,}1$, donc $\\sigma(X) = \\sqrt{2{,}1} \\approx 1{,}45$."
      }
    },
    {
      titre: "Cumul et intervalles avec la calculatrice",
      video: { titre: "Vidéo de ton prof : fonction de cumul et intervalle de fluctuation", youtube: "https://youtu.be/p1QICyjsI-Y" },
      texte:
        "La calculatrice donne $P(X = k)$ (loi binomiale « Fdp » ou « PD ») et la **fonction de cumul** $P(X \\leqslant k)$ (« FRép » ou « CD »).\n\n" +
        "- $P(X < k) = P(X \\leqslant k - 1)$ (les valeurs sont entières) ;\n" +
        "- $P(X \\geqslant k) = 1 - P(X \\leqslant k - 1)$ ;\n" +
        "- $P(a \\leqslant X \\leqslant b) = P(X \\leqslant b) - P(X \\leqslant a - 1)$.\n\n" +
        "**Intervalle de probabilité** : pour trouver le plus petit entier $b$ tel que $P(X \\leqslant b) \\geqslant 0{,}95$, on parcourt la table des cumuls. On en déduit des intervalles $I$ tels que $P(X \\in I) \\geqslant 0{,}95$ : si une observation tombe hors de $I$, elle est peu probable sous le modèle.",
      exemple: {
        enonce: "$X$ suit la loi $\\mathcal{B}(20\\,;0{,}4)$. Calcule $P(X \\geqslant 10)$ et $P(6 \\leqslant X \\leqslant 10)$.",
        solution: "$P(X \\geqslant 10) = 1 - P(X \\leqslant 9) \\approx 1 - 0{,}755 = 0{,}245$.\n\n$P(6 \\leqslant X \\leqslant 10) = P(X \\leqslant 10) - P(X \\leqslant 5) \\approx 0{,}872 - 0{,}126 = 0{,}746$."
      }
    },
    {
      titre: "Algorithmique : simuler et calculer",
      texte:
        "**Simuler** une variable de loi $\\mathcal{B}(n\\,;p)$ : on répète $n$ fois une épreuve de Bernoulli avec $\\texttt{random()}$, qui renvoie un nombre au hasard dans $[0\\,;1[$ ; la condition $\\texttt{random() < p}$ est vraie avec la probabilité $p$.\n\n" +
        "```python\nfrom random import random\nfrom math import comb\n\ndef simul(n, p):\n    x = 0\n    for i in range(n):\n        if random() < p:\n            x = x + 1\n    return x\n\ndef proba(n, p, k):\n    return comb(n, k) * p**k * (1 - p)**(n - k)\n```\n\n" +
        "En appelant $\\texttt{simul(10, 0.3)}$ un grand nombre de fois, la moyenne des résultats se rapproche de $E(X) = 3$, et la fréquence de chaque valeur $k$ se rapproche de $\\texttt{proba(10, 0.3, k)}$.",
      exemple: {
        enonce: "Que renvoie $\\texttt{proba(4, 0.5, 2)}$ ?",
        solution: "$\\dbinom{4}{2} \\times 0{,}5^2 \\times 0{,}5^2 = 6 \\times 0{,}0625 = 0{,}375$.\n\nLa fonction renvoie $\\texttt{0.375}$."
      }
    }
  ],

  videos: [
    { titre: "Loi de Bernoulli, schéma de Bernoulli", type: "Exercices", youtube: "https://youtu.be/YZEA5ey_CxI" },
    { titre: "De l'arbre au triangle de Pascal", type: "Exercices", youtube: "https://youtu.be/UpH1L-svSIQ" },
    { titre: "Loi binomiale à la main", type: "Exercices", youtube: "https://youtu.be/Uf6KzBy5h5c" },
    { titre: "Loi binomiale : risque et seuil", type: "Exercices", youtube: "https://youtu.be/CfnvKi1-IVQ" },
    { titre: "Intervalle de fluctuation bilatéral", type: "Exercice", youtube: "https://youtu.be/4VGkpUq8hCo" },
    { titre: "Prépare ton bac : loi binomiale (Yvan Monka)", type: "Bac", youtube: "https://youtu.be/tNmiZYMG-5A" }
  ],
  videosNote: "Les cinq premières vidéos sont celles de ton prof (playlist de Terminale maths complémentaires, même programme sur ce thème) ; l'énoncé est donné dans la vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "pi-totales", titre: "Rappels : probabilités totales", etape: "Épreuves indépendantes", nb: 4 },
    { type: "bin-epreuves", titre: "Succession d'épreuves indépendantes", etape: "Épreuves indépendantes", nb: 5 },
    { type: "bin-schema", titre: "Reconnaître une loi binomiale", etape: "Loi binomiale", nb: 5 },
    { type: "bin-coef", titre: "Chemins et coefficients binomiaux", etape: "Loi binomiale", nb: 4 },
    { type: "bin-egal", titre: "Calculer $P(X = k)$", etape: "Loi binomiale", nb: 5 },
    { type: "bin-cumul", titre: "Au moins, au plus", etape: "Loi binomiale", nb: 5 },
    { type: "ld-traduire", titre: "Traduire avec la fonction de cumul", etape: "Calculatrice et intervalles", nb: 5 },
    { type: "bin-au-moins-un", titre: "Combien de répétitions ?", etape: "Calculatrice et intervalles", nb: 4 },
    { type: "ld-cumul", titre: "Utiliser un tableau de cumuls", etape: "Calculatrice et intervalles", nb: 4 },
    { type: "bin-esperance", titre: "Espérance, variance, écart type", etape: "Espérance", nb: 5 },
    { type: "bin-lecture", titre: "Lire un diagramme en bâtons", etape: "Espérance", nb: 4 },
    { type: "bin-python", titre: "La loi binomiale en Python", etape: "Algorithmique", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "On lance $3$ fois une pièce équilibrée. La probabilité d'obtenir PILE, PILE, FACE dans cet ordre est :", choix: ["$\\dfrac{1}{8}$", "$\\dfrac{3}{8}$", "$\\dfrac{1}{2}$", "$\\dfrac{1}{3}$"], bonne: 0, explication: "Épreuves indépendantes : $\\dfrac{1}{2} \\times \\dfrac{1}{2} \\times \\dfrac{1}{2} = \\dfrac{1}{8}$. $\\dfrac{3}{8}$ serait la probabilité de « exactement deux PILE » dans n'importe quel ordre." },
    { question: "Une urne contient $3$ rouges et $7$ noires. On tire $2$ boules **sans remise**. Les deux tirages sont-ils indépendants ?", choix: ["Non, la composition de l'urne change", "Oui, toujours", "Oui, car il y a deux couleurs", "Seulement si la première est rouge"], bonne: 0, explication: "Après un premier tirage sans remise, les probabilités du second ne sont plus les mêmes." },
    { question: "$X$ suit une loi de Bernoulli de paramètre $0{,}3$. Que vaut $V(X)$ ?", choix: ["$0{,}21$", "$0{,}3$", "$0{,}09$", "$0{,}7$"], bonne: 0, explication: "$V(X) = p(1 - p) = 0{,}3 \\times 0{,}7 = 0{,}21$." },
    { question: "On lance $12$ fois un dé équilibré et $X$ compte les $6$ obtenus. La loi de $X$ est :", choix: ["$\\mathcal{B}\\left(12\\,;\\dfrac{1}{6}\\right)$", "$\\mathcal{B}\\left(6\\,;\\dfrac{1}{12}\\right)$", "$\\mathcal{B}\\left(12\\,;\\dfrac{5}{6}\\right)$", "$\\mathcal{B}\\left(\\dfrac{1}{6}\\,;12\\right)$"], bonne: 0, explication: "$n = 12$ épreuves identiques et indépendantes, succès « obtenir $6$ » de probabilité $\\dfrac{1}{6}$." },
    { question: "Laquelle de ces variables suit une loi binomiale ?", choix: ["Le nombre de garçons parmi $5$ naissances indépendantes", "Le nombre de lancers d'un dé pour obtenir un $6$", "Le nombre de boules rouges dans $3$ tirages sans remise", "La somme de deux dés"], bonne: 0, explication: "Les autres : un temps d'attente, des tirages non indépendants, et une somme qui ne compte pas des succès." },
    { question: "Dans l'arbre de $4$ épreuves de Bernoulli, combien de chemins comportent exactement $2$ succès ?", choix: ["$6$", "$4$", "$8$", "$16$"], bonne: 0, explication: "$\\dbinom{4}{2} = 6$ : SSEE, SESE, SEES, ESSE, ESES, EESS." },
    { question: "Si $X$ suit $\\mathcal{B}(n\\,;p)$, alors $P(X = k)$ vaut :", choix: ["$\\dbinom{n}{k}p^k(1 - p)^{n-k}$", "$p^k(1 - p)^{n-k}$", "$\\dbinom{n}{k}p^{n-k}(1 - p)^k$", "$\\dbinom{k}{n}p^k(1 - p)^{n-k}$"], bonne: 0, explication: "$\\dbinom{n}{k}$ chemins, chacun de probabilité $p^k(1 - p)^{n-k}$." },
    { question: "$X$ suit $\\mathcal{B}(4\\,;0{,}5)$. Que vaut $P(X = 4)$ ?", choix: ["$0{,}0625$", "$0{,}5$", "$0{,}25$", "$1$"], bonne: 0, explication: "$P(X = 4) = 0{,}5^4 = 0{,}0625$ : un seul chemin, celui des quatre succès." },
    { question: "$X$ suit $\\mathcal{B}(10\\,;0{,}2)$. Alors $P(X \\geqslant 1)$ vaut :", choix: ["$1 - 0{,}8^{10}$", "$0{,}2^{10}$", "$1 - 0{,}2^{10}$", "$10 \\times 0{,}2$"], bonne: 0, explication: "Le contraire de « au moins un succès » est « aucun succès » : $P(X = 0) = 0{,}8^{10}$." },
    { question: "Avec la fonction de cumul, $P(X > 5)$ s'écrit :", choix: ["$1 - P(X \\leqslant 5)$", "$1 - P(X \\leqslant 4)$", "$P(X \\leqslant 5)$", "$1 - P(X \\geqslant 5)$"], bonne: 0, explication: "$X > 5$ signifie $X \\geqslant 6$ ; son contraire est $X \\leqslant 5$." },
    { question: "$P(3 \\leqslant X \\leqslant 7)$ s'écrit :", choix: ["$P(X \\leqslant 7) - P(X \\leqslant 2)$", "$P(X \\leqslant 7) - P(X \\leqslant 3)$", "$P(X \\leqslant 7) + P(X \\leqslant 3)$", "$P(X = 7) - P(X = 3)$"], bonne: 0, explication: "On retire les valeurs $0$, $1$, $2$ : $3$ doit rester compté." },
    { question: "$X$ suit $\\mathcal{B}(50\\,;0{,}4)$. Son espérance est :", choix: ["$20$", "$12$", "$0{,}4$", "$30$"], bonne: 0, explication: "$E(X) = np = 50 \\times 0{,}4 = 20$." },
    { question: "$X$ suit $\\mathcal{B}(100\\,;0{,}5)$. Sa variance est :", choix: ["$25$", "$50$", "$5$", "$0{,}25$"], bonne: 0, explication: "$V(X) = np(1 - p) = 100 \\times 0{,}5 \\times 0{,}5 = 25$ ; l'écart type vaut $5$." },
    { question: "Sur un diagramme en bâtons d'une loi binomiale, la plus grande valeur possible sur l'axe horizontal est :", choix: ["$n$", "$p$", "$np$", "$1$"], bonne: 0, explication: "$X$ prend les valeurs de $0$ à $n$." },
    { question: "Un QCM de $10$ questions a $3$ réponses par question, dont une juste. En répondant au hasard, le nombre moyen de bonnes réponses est :", choix: ["$\\dfrac{10}{3}$", "$3$", "$5$", "$\\dfrac{1}{3}$"], bonne: 0, explication: "$E(X) = 10 \\times \\dfrac{1}{3} \\approx 3{,}3$." },
    { question: "Une pièce est défectueuse avec la probabilité $0{,}02$. Dans un lot de $50$ pièces (indépendantes), la probabilité qu'aucune ne soit défectueuse est :", choix: ["$0{,}98^{50}$", "$1 - 0{,}02^{50}$", "$0{,}02^{50}$", "$50 \\times 0{,}98$"], bonne: 0, explication: "$P(X = 0) = (1 - 0{,}02)^{50} = 0{,}98^{50} \\approx 0{,}364$." },
    { question: "$\\dbinom{6}{2}$ vaut :", choix: ["$15$", "$12$", "$30$", "$36$"], bonne: 0, explication: "$\\dbinom{6}{2} = \\dfrac{6 \\times 5}{2} = 15$." },
    { question: "Que fait la condition $\\texttt{random() < 0.3}$ en Python ?", choix: ["Elle est vraie avec la probabilité $0{,}3$", "Elle est vraie $3$ fois sur $10$ exactement", "Elle renvoie toujours $0{,}3$", "Elle est vraie avec la probabilité $0{,}7$"], bonne: 0, explication: "$\\texttt{random()}$ est uniforme sur $[0\\,;1[$ : la probabilité d'être sous $0{,}3$ vaut $0{,}3$. Sur $10$ essais, on n'a pas forcément exactement $3$ succès." },
    { question: "$X$ suit $\\mathcal{B}(n\\,;p)$ avec $E(X) = 6$ et $n = 24$. Alors $p$ vaut :", choix: ["$0{,}25$", "$0{,}5$", "$4$", "$0{,}6$"], bonne: 0, explication: "$np = 6$ donne $p = \\dfrac{6}{24} = 0{,}25$." },
    { question: "Pour quelle valeur de $p$ le diagramme de $\\mathcal{B}(n\\,;p)$ est-il symétrique ?", choix: ["$p = 0{,}5$", "$p = 0$", "$p = 1$", "pour aucune"], bonne: 0, explication: "Si $p = 0{,}5$, $P(X = k) = \\dbinom{n}{k}0{,}5^n = P(X = n - k)$." },
    { question: "Un tireur atteint sa cible avec la probabilité $0{,}7$. Il tire $3$ fois (tirs indépendants). Probabilité d'atteindre la cible exactement $2$ fois ?", choix: ["$0{,}441$", "$0{,}49$", "$0{,}147$", "$0{,}7$"], bonne: 0, explication: "$\\dbinom{3}{2} \\times 0{,}7^2 \\times 0{,}3 = 3 \\times 0{,}49 \\times 0{,}3 = 0{,}441$." },
    { question: "On sait que $P(X \\leqslant 11) \\approx 0{,}93$ et $P(X \\leqslant 12) \\approx 0{,}97$. Le plus petit entier $b$ tel que $P(X \\leqslant b) \\geqslant 0{,}95$ est :", choix: ["$12$", "$11$", "$13$", "$0{,}95$"], bonne: 0, explication: "$P(X \\leqslant 11) < 0{,}95 \\leqslant P(X \\leqslant 12)$." },
    { question: "$70\\,\\%$ des clients d'un magasin paient par carte. Dans un échantillon de $200$ clients assimilé à des tirages avec remise, le nombre moyen de paiements par carte est :", choix: ["$140$", "$70$", "$60$", "$200$"], bonne: 0, explication: "$E(X) = 200 \\times 0{,}7 = 140$." },
    { question: "$X$ suit $\\mathcal{B}(5\\,;0{,}1)$. Quelle est la valeur la plus probable de $X$ ?", choix: ["$0$", "$1$", "$5$", "$0{,}5$"], bonne: 0, explication: "$P(X = 0) = 0{,}9^5 \\approx 0{,}59$ et $P(X = 1) = 5 \\times 0{,}1 \\times 0{,}9^4 \\approx 0{,}33$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Justifier qu'une variable suit une loi binomiale",
      etapes: [
        "Décrire l'épreuve de Bernoulli : le succès et sa probabilité $p$.",
        "Dire qu'on la répète $n$ fois, de façon **identique et indépendante** (avec remise, ou population assimilable).",
        "Dire que $X$ compte le nombre de succès.",
        "Conclure : $X$ suit la loi $\\mathcal{B}(n\\,;p)$, en donnant $n$ et $p$."
      ],
      exemple: "On contrôle $20$ pièces indépendantes, chacune défectueuse avec la probabilité $0{,}05$ : $X$, nombre de pièces défectueuses, suit $\\mathcal{B}(20\\,;0{,}05)$."
    },
    {
      titre: "Calculer une probabilité avec une loi binomiale",
      etapes: [
        "Traduire l'événement : exactement, au moins, au plus, entre.",
        "Exactement $k$ : formule $\\dbinom{n}{k}p^k(1 - p)^{n-k}$ ou calculatrice.",
        "Au plus, au moins : fonction de cumul ($P(X \\geqslant k) = 1 - P(X \\leqslant k - 1)$).",
        "« Au moins un » : $1 - (1 - p)^n$. Arrondir seulement à la fin."
      ],
      exemple: "$X$ de loi $\\mathcal{B}(8\\,;0{,}3)$ : $P(X \\geqslant 2) = 1 - P(X \\leqslant 1) \\approx 1 - 0{,}255 = 0{,}745$."
    },
    {
      titre: "Trouver un nombre minimal de répétitions",
      etapes: [
        "Écrire la probabilité en fonction de $n$ : souvent $1 - (1 - p)^n$.",
        "Écrire l'inégalité voulue, par exemple $1 - (1 - p)^n \\geqslant 0{,}95$.",
        "Chercher le plus petit $n$ qui convient : tableau de valeurs, programme, ou logarithme (chapitre 9).",
        "Vérifier avec $n - 1$."
      ],
      exemple: "$p = 0{,}1$ : $1 - 0{,}9^{28} \\approx 0{,}948$ et $1 - 0{,}9^{29} \\approx 0{,}953$, il faut $29$ répétitions."
    },
    {
      titre: "Interpréter l'espérance",
      etapes: [
        "Calculer $E(X) = np$.",
        "L'interpréter : nombre moyen de succès quand on répète un grand nombre de fois le schéma.",
        "Pour un gain $G = aX + b$ : $E(G) = aE(X) + b$.",
        "Comparer à $0$ pour savoir si un jeu est favorable."
      ],
      exemple: "Gain $G = 5X - 10$ avec $X$ de loi $\\mathcal{B}(10\\,;0{,}2)$ : $E(G) = 5 \\times 2 - 10 = 0$, le jeu est équitable."
    }
  ],
  erreurs: [
    "Oublier le coefficient $\\dbinom{n}{k}$ : il y a plusieurs chemins à $k$ succès.",
    "Inverser $p$ et $1 - p$ dans la formule.",
    "Utiliser une loi binomiale pour des tirages sans remise dans une petite urne.",
    "Utiliser une loi binomiale quand le nombre d'épreuves n'est pas fixé à l'avance.",
    "Écrire $P(X \\geqslant k) = 1 - P(X \\leqslant k)$ au lieu de $1 - P(X \\leqslant k - 1)$.",
    "Confondre $E(X) = np$ et $V(X) = np(1 - p)$.",
    "Arrondir les résultats intermédiaires.",
    "Croire que la valeur la plus probable est toujours exactement $np$."
  ]
};
