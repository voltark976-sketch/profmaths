/*
  CHAPITRE : Terminale maths complémentaires — Lois discrètes
  -----------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce). Dans les formules, la virgule décimale s'écrit {,} : $0{,}35$.
  video : vidéo d'aide affichée sous une notion (vidéos d'Yvan Monka citées dans le livret).
  Le corrigé détaillé du Drive est réservé au professeur (Pronote) : il n'est pas lié ici.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-lois-discretes"] = {
  niveau: "Terminale maths complémentaires",
  numero: 2,
  titre: "Lois discrètes",
  accroche: "Un résultat tiré au sort, un nombre de réussites, une attente : reconnaître la situation avant de choisir une formule.",

  playlist: "",
  drive: "https://drive.google.com/drive/folders/1Ocg_jAIkBcx1ZyeAMo7RfSITirsgvD59",
  pdfs: [
    {
      titre: "Livret élève : fiches de révision, cours expliqué et 30 exercices",
      url: "https://drive.google.com/file/d/1-CouZn79KjNqZnUfdB3Y4VxigiRO7Fr8/view"
    }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Variable aléatoire et loi uniforme",
      video: { titre: "Vidéo de ton prof : variable aléatoire et loi de Bernoulli (cours 1/4)", youtube: "https://youtu.be/gQhLo-TDi9Q" },
      texte:
        "Associer un nombre au résultat d'une expérience aléatoire, c'est définir une **variable aléatoire** $X$. Sa **loi de probabilité** associe à chaque valeur possible sa probabilité ; la somme des probabilités vaut $1$.\n\n" +
        "- **Espérance** : $E(X) = x_1 p_1 + x_2 p_2 + \\dots + x_n p_n$, la moyenne à long terme sur de nombreuses répétitions.\n" +
        "- **Loi uniforme** sur $\\{1\\,;2\\,;\\dots\\,;n\\}$ : chaque valeur a la probabilité $\\dfrac{1}{n}$ et $E(X) = \\dfrac{n + 1}{2}$.\n\n" +
        "L'espérance n'est pas forcément une valeur possible : c'est une moyenne, pas l'annonce du prochain résultat.",
      exemple: {
        enonce: "Un sac contient $4$ jetons numérotés de $1$ à $4$. On en tire un au hasard ; $X$ est son numéro. Calcule $P(X \\geqslant 3)$ et $E(X)$.",
        solution: "$P(X \\geqslant 3) = P(X = 3) + P(X = 4) = \\dfrac{1}{4} + \\dfrac{1}{4} = \\dfrac{1}{2}$.\n\n$E(X) = \\dfrac{4 + 1}{2} = 2{,}5$. On ne tire jamais le numéro $2{,}5$ : c'est le numéro moyen sur de nombreux tirages."
      }
    },
    {
      titre: "Épreuve et schéma de Bernoulli",
      texte:
        "- Une **épreuve de Bernoulli** a deux issues : succès (probabilité $p$) ou échec ($1 - p$). La variable qui vaut $1$ en cas de succès et $0$ sinon suit la **loi de Bernoulli** : $E(X) = p$, $V(X) = p(1 - p)$, $\\sigma(X) = \\sqrt{p(1 - p)}$.\n" +
        "- Un **schéma de Bernoulli** répète $n$ fois la même épreuve, de façon **indépendante**. Dans l'arbre, on garde les mêmes probabilités à chaque étape.\n" +
        "- Sur un chemin, on **multiplie** ; entre des chemins incompatibles, on **additionne**.\n\n" +
        "Contre-exemple : un tirage **sans remise** change la composition de l'urne, les essais ne sont plus indépendants.",
      video: { titre: "Vidéo d'Yvan Monka : construire un arbre de répétitions indépendantes", youtube: "https://youtu.be/e7jH8a1cDtg" },
      exemple: {
        enonce: "Un message est transmis correctement avec la probabilité $0{,}7$. On fait deux envois indépendants. Quelle est la probabilité d'avoir exactement un succès ?",
        solution: "Deux chemins : $P(S\\bar{S}) = 0{,}7 \\times 0{,}3 = 0{,}21$ et $P(\\bar{S}S) = 0{,}3 \\times 0{,}7 = 0{,}21$. Donc $P = 0{,}21 + 0{,}21 = 0{,}42$."
      }
    },
    {
      titre: "Coefficients binomiaux et triangle de Pascal",
      texte:
        "Le coefficient $\\dbinom{n}{k}$ compte les façons de placer $k$ succès parmi $n$ essais, c'est-à-dire le nombre de chemins à $k$ succès dans l'arbre.\n\n" +
        "- $\\dbinom{n}{0} = \\dbinom{n}{n} = 1$, $\\dbinom{n}{1} = n$ et $\\dbinom{n}{k} = \\dbinom{n}{n - k}$.\n" +
        "- **Triangle de Pascal** : $\\dbinom{n}{k} = \\dbinom{n - 1}{k - 1} + \\dbinom{n - 1}{k}$. Chaque nombre intérieur est la somme des deux nombres au-dessus.\n\n" +
        "Lignes $0$ à $4$ : $1$ ; $1\\;1$ ; $1\\;2\\;1$ ; $1\\;3\\;3\\;1$ ; $1\\;4\\;6\\;4\\;1$.",
      video: { titre: "Vidéo d'Yvan Monka : utiliser le triangle de Pascal", youtube: "https://youtu.be/6JGrHD5nAoc" },
      exemple: {
        enonce: "Que vaut $\\dbinom{5}{2}$ et que signifie ce nombre ?",
        solution: "Ligne $5$ : $1\\;5\\;10\\;10\\;5\\;1$, donc $\\dbinom{5}{2} = 10$. Dans un schéma de $5$ épreuves, il y a $10$ chemins comportant exactement $2$ succès."
      }
    },
    {
      titre: "La loi binomiale",
      texte:
        "Si $X$ compte les succès d'un schéma de Bernoulli de $n$ épreuves de probabilité $p$, alors $X$ suit la **loi binomiale** $\\mathcal{B}(n\\,;p)$ ; ses valeurs vont de $0$ à $n$.\n\n" +
        "$P(X = k) = \\dbinom{n}{k} p^k (1 - p)^{n - k}$\n\n" +
        "- $E(X) = np$, $V(X) = np(1 - p)$ et $\\sigma(X) = \\sqrt{np(1 - p)}$.\n" +
        "- Pour justifier la loi : nombre d'essais **fixé**, deux issues, même probabilité, essais **indépendants**.\n" +
        "- On la représente par un **diagramme en bâtons**, qui n'est pas toujours symétrique.",
      figure: "batons-binomiale",
      video: { titre: "Vidéo d'Yvan Monka : calculer une probabilité binomiale", youtube: "https://youtu.be/1gMq2TJwSh0" },
      exemple: {
        enonce: "Chaque livraison arrive à l'heure avec la probabilité $0{,}8$, indépendamment des autres. $X$ compte les livraisons à l'heure parmi $3$. Calcule $P(X = 2)$ et $E(X)$.",
        solution: "$X$ suit $\\mathcal{B}(3\\,;0{,}8)$. $P(X = 2) = 3 \\times 0{,}8^2 \\times 0{,}2 = 0{,}384$ et $E(X) = 3 \\times 0{,}8 = 2{,}4$. Loi complète :",
        tableau: { var: "k", nom: "P(X = k)", x: [0, 1, 2, 3], y: ["0{,}008", "0{,}096", "0{,}384", "0{,}512"] }
      }
    },
    {
      titre: "Cumul et intervalle de fluctuation",
      video: { titre: "Vidéo de ton prof : fonction de cumul et intervalle de fluctuation (cours 3/4)", youtube: "https://youtu.be/p1QICyjsI-Y" },
      texte:
        "La calculatrice donne le **cumul** $F(k) = P(X \\leqslant k)$ : toutes les valeurs de $0$ à $k$ incluses.\n\n" +
        "- $P(X \\geqslant k) = 1 - P(X \\leqslant k - 1)$.\n" +
        "- $P(a \\leqslant X \\leqslant b) = P(X \\leqslant b) - P(X \\leqslant a - 1)$.\n" +
        "- Pour $[0\\,;b]$ au seuil $95\\,\\%$ : le plus petit entier $b$ tel que $P(X \\leqslant b) \\geqslant 0{,}95$. On le justifie avec les deux cumuls voisins.\n\n" +
        "Avant de taper sur la calculatrice, écrire la liste des entiers que l'on garde. Une observation hors de l'intervalle est inhabituelle, mais pas impossible.",
      exemple: {
        enonce: "$10$ personnes réservent ; chacune annule avec la probabilité $0{,}2$, indépendamment. $X$ compte les annulations. Calcule $P(X \\geqslant 2)$, $P(2 \\leqslant X \\leqslant 4)$ et le plus petit $b$ tel que $P(X \\leqslant b) \\geqslant 0{,}95$.",
        solution: "$P(X \\geqslant 2) = 1 - F(1) \\approx 0{,}6242$ ; $P(2 \\leqslant X \\leqslant 4) = F(4) - F(1) \\approx 0{,}5914$. Comme $F(3) \\approx 0{,}8791 < 0{,}95$ et $F(4) \\approx 0{,}9672 \\geqslant 0{,}95$, $b = 4$.",
        tableau: { var: "k", nom: "F(k)", x: [0, 1, 2, 3, 4, 5], y: ["0{,}1074", "0{,}3758", "0{,}6778", "0{,}8791", "0{,}9672", "0{,}9936"] }
      }
    },
    {
      titre: "La loi géométrique",
      texte:
        "On répète une épreuve de façon indépendante **jusqu'au premier succès**. Le rang $T$ de ce succès suit la **loi géométrique** $\\mathcal{G}(p)$ ; les rangs commencent à $1$.\n\n" +
        "- $P(T = k) = (1 - p)^{k - 1} p$ : $k - 1$ échecs, puis un succès.\n" +
        "- $P(T > k) = (1 - p)^k$ : $k$ échecs de suite. Et $P(T \\leqslant k) = 1 - (1 - p)^k$.\n" +
        "- $E(T) = \\dfrac{1}{p}$, le rang moyen du premier succès.\n\n" +
        "Ne pas confondre « exactement au $4^\\text{e}$ essai » et « au plus tard au $4^\\text{e}$ essai ».",
      figure: "batons-geometrique",
      video: { titre: "Vidéo d'Yvan Monka : calculer avec une loi géométrique", youtube: "https://youtu.be/hg7V5cj2QYE" },
      exemple: {
        enonce: "À chaque tentative, on gagne avec la probabilité $0{,}25$. Calcule $P(T = 4)$, $P(T \\leqslant 4)$ et $E(T)$.",
        solution: "$P(T = 4) = 0{,}75^3 \\times 0{,}25 \\approx 0{,}1055$. $P(T \\leqslant 4) = 1 - 0{,}75^4 \\approx 0{,}6836$. $E(T) = \\dfrac{1}{0{,}25} = 4$ : il faut en moyenne $4$ essais, sans garantie de réussir avant."
      }
    },
    {
      titre: "Absence de mémoire et choix du modèle",
      video: { titre: "Vidéo de ton prof : loi géométrique et absence de mémoire (cours 4/4)", youtube: "https://youtu.be/Lp19Rs3SHRs" },
      texte:
        "La loi géométrique est **sans mémoire** : après $s$ échecs, attendre encore plus de $t$ essais a la même probabilité qu'au départ.\n\n" +
        "$P_{T > s}(T > s + t) = P(T > t)$\n\n" +
        "La probabilité de réussir au prochain essai reste $p$ : elle n'augmente pas pour « compenser » les échecs.\n\n" +
        "**Choisir la loi** selon ce que décrit la variable :\n" +
        "- une valeur parmi des entiers équiprobables : **uniforme** ;\n" +
        "- le codage $0$ ou $1$ d'un seul essai : **Bernoulli** ;\n" +
        "- le nombre de succès dans un nombre fixé d'essais : **binomiale** ;\n" +
        "- le rang du premier succès : **géométrique**.",
      exemple: {
        enonce: "Au jeu précédent ($p = 0{,}25$), les deux premiers essais ont échoué. Quelle est la probabilité de réussir dans les trois prochains essais ?",
        solution: "Ne pas réussir dans ces trois essais, c'est trois nouveaux échecs : $P_{T > 2}(T > 5) = 0{,}75^3 = 0{,}421875$. Donc la probabilité cherchée est $1 - 0{,}421875 = 0{,}578125$."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "ld-uniforme", titre: "Loi uniforme", etape: "Premières lois", nb: 5 },
    { type: "ld-loi-esperance", titre: "Lire une loi, calculer une espérance", etape: "Premières lois", nb: 5 },
    { type: "ld-bernoulli", titre: "Loi de Bernoulli", etape: "Premières lois", nb: 4 },
    { type: "ld-coef-binomial", titre: "Coefficients binomiaux", etape: "Loi binomiale", nb: 5 },
    { type: "ld-binomiale-egal", titre: "Calculer P(X = k)", etape: "Loi binomiale", nb: 5 },
    { type: "ld-binomiale-esperance", titre: "Espérance, variance, écart type", etape: "Loi binomiale", nb: 5 },
    { type: "ld-traduire", titre: "Traduire avec le cumul", etape: "Cumul et fluctuation", nb: 5 },
    { type: "ld-cumul", titre: "Utiliser un tableau de cumuls", etape: "Cumul et fluctuation", nb: 5 },
    { type: "ld-geometrique", titre: "Loi géométrique", etape: "Loi géométrique", nb: 5 },
    { type: "ld-sans-memoire", titre: "Absence de mémoire", etape: "Loi géométrique", nb: 4 },
    { type: "ld-choisir-loi", titre: "Quelle loi choisir ?", etape: "Défi", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    {
      question: "$X$ suit la loi uniforme sur $\\{1\\,;2\\,;\\dots\\,;8\\}$. Combien vaut $E(X)$ ?",
      choix: ["$4$", "$4{,}5$", "$8$", "$\\dfrac{1}{8}$"],
      bonne: 1,
      explication: "$E(X) = \\dfrac{8 + 1}{2} = 4{,}5$."
    },
    {
      question: "$G$ prend les valeurs $-2$, $0$ et $5$ avec les probabilités $0{,}5$, $0{,}3$ et $p$. Combien vaut $p$ ?",
      choix: ["$0{,}2$", "$0{,}8$", "$0{,}5$", "On ne peut pas savoir"],
      bonne: 0,
      explication: "La somme des probabilités vaut $1$ : $p = 1 - 0{,}5 - 0{,}3 = 0{,}2$."
    },
    {
      question: "Avec la loi précédente ($-2$ ; $0$ ; $5$ avec $0{,}5$ ; $0{,}3$ ; $0{,}2$), que vaut $E(G)$ ?",
      choix: ["$1$", "$0$", "$-1$", "$3$"],
      bonne: 1,
      explication: "$E(G) = -2 \\times 0{,}5 + 0 \\times 0{,}3 + 5 \\times 0{,}2 = -1 + 0 + 1 = 0$ : le jeu est équitable."
    },
    {
      question: "$X$ suit une loi de Bernoulli de paramètre $0{,}3$. Que vaut $V(X)$ ?",
      choix: ["$0{,}3$", "$0{,}09$", "$0{,}21$", "$0{,}7$"],
      bonne: 2,
      explication: "$V(X) = p(1 - p) = 0{,}3 \\times 0{,}7 = 0{,}21$."
    },
    {
      question: "Laquelle de ces situations relève d'une loi binomiale ?",
      choix: ["On lance un dé jusqu'au premier six et on compte les lancers", "On tire 3 boules sans remise et on compte les rouges", "On répond au hasard à 5 questions à 4 choix et on compte les bonnes réponses", "On choisit un numéro entre 1 et 20"],
      bonne: 2,
      explication: "5 essais indépendants, deux issues, même probabilité $\\dfrac{1}{4}$ : $\\mathcal{B}(5\\,;0{,}25)$. Le premier cas est géométrique, le deuxième n'est pas indépendant, le dernier est uniforme."
    },
    {
      question: "Que vaut $\\dbinom{6}{2}$ ?",
      choix: ["$12$", "$15$", "$6$", "$20$"],
      bonne: 1,
      explication: "Ligne $6$ du triangle de Pascal : $1\\;6\\;15\\;20\\;15\\;6\\;1$."
    },
    {
      question: "Pourquoi $\\dbinom{6}{2} = \\dbinom{6}{4}$ ?",
      choix: ["C'est un hasard", "Placer 2 succès revient à placer 4 échecs", "Parce que $2 + 4 = 6$ est pair", "Parce que $2 \\times 2 = 4$"],
      bonne: 1,
      explication: "Choisir les positions des $2$ succès, c'est choisir les positions des $4$ échecs : $\\dbinom{n}{k} = \\dbinom{n}{n - k}$."
    },
    {
      question: "$X$ suit $\\mathcal{B}(4\\,;0{,}1)$. Que vaut $P(X = 1)$ ?",
      choix: ["$0{,}1 \\times 0{,}9^3$", "$4 \\times 0{,}1 \\times 0{,}9^3$", "$4 \\times 0{,}1^3 \\times 0{,}9$", "$0{,}1$"],
      bonne: 1,
      explication: "$P(X = 1) = \\dbinom{4}{1} \\times 0{,}1^1 \\times 0{,}9^3 \\approx 0{,}292$. Ne pas oublier le coefficient qui compte les chemins."
    },
    {
      question: "$X$ suit $\\mathcal{B}(250\\,;0{,}12)$. Que vaut $E(X)$ ?",
      choix: ["$12$", "$25$", "$30$", "$26{,}4$"],
      bonne: 2,
      explication: "$E(X) = np = 250 \\times 0{,}12 = 30$."
    },
    {
      question: "On lance $20$ fois une pièce équilibrée. $X$ compte les FACE. Peut-on affirmer qu'on obtiendra exactement $10$ FACE ?",
      choix: ["Oui, car $E(X) = 10$", "Non : $10$ est la moyenne attendue, pas une certitude", "Oui, la pièce est équilibrée", "Non, car $E(X) = 20$"],
      bonne: 1,
      explication: "$E(X) = 20 \\times 0{,}5 = 10$ est une moyenne à long terme. $P(X = 10) \\approx 0{,}176$ seulement."
    },
    {
      question: "$X$ suit une loi binomiale. $P(X \\geqslant 6)$ s'écrit…",
      choix: ["$1 - P(X \\leqslant 6)$", "$1 - P(X \\leqslant 5)$", "$P(X \\leqslant 6)$", "$1 - P(X \\geqslant 5)$"],
      bonne: 1,
      explication: "« Au moins 6 » a pour contraire $X \\leqslant 5$."
    },
    {
      question: "$P(3 \\leqslant X < 12)$ s'écrit…",
      choix: ["$P(X \\leqslant 12) - P(X \\leqslant 3)$", "$P(X \\leqslant 11) - P(X \\leqslant 3)$", "$P(X \\leqslant 11) - P(X \\leqslant 2)$", "$P(X \\leqslant 12) - P(X \\leqslant 2)$"],
      bonne: 2,
      explication: "On garde les entiers de $3$ à $11$ : cumul jusqu'à $11$, moins le cumul jusqu'à $2$."
    },
    {
      question: "On a $P(X \\leqslant 3) \\approx 0{,}8791$ et $P(X \\leqslant 4) \\approx 0{,}9672$. Plus petit $b$ tel que $P(X \\leqslant b) \\geqslant 0{,}95$ ?",
      choix: ["$3$", "$4$", "$5$", "$0{,}95$"],
      bonne: 1,
      explication: "$3$ ne suffit pas ($0{,}8791 < 0{,}95$) et $4$ convient ($0{,}9672 \\geqslant 0{,}95$)."
    },
    {
      question: "Une valeur observée est en dehors de l'intervalle de fluctuation au seuil de $95\\,\\%$. Que peut-on dire ?",
      choix: ["C'est impossible", "Le modèle est forcément faux", "C'est inhabituel sous ce modèle, mais possible", "Il faut recommencer le calcul"],
      bonne: 2,
      explication: "Sous le modèle, cela arrive avec une probabilité d'au plus $5\\,\\%$ : on peut douter du modèle, sans preuve définitive."
    },
    {
      question: "$T$ suit $\\mathcal{G}(0{,}2)$. Que vaut $P(T = 3)$ ?",
      choix: ["$0{,}8^3 \\times 0{,}2$", "$0{,}8^2 \\times 0{,}2$", "$0{,}2^2 \\times 0{,}8$", "$1 - 0{,}8^3$"],
      bonne: 1,
      explication: "Premier succès au rang $3$ : deux échecs, puis un succès, soit $0{,}8^2 \\times 0{,}2 = 0{,}128$."
    },
    {
      question: "$T$ suit $\\mathcal{G}(0{,}2)$. Que vaut $P(T \\leqslant 3)$ ?",
      choix: ["$0{,}8^3$", "$1 - 0{,}8^3$", "$0{,}2^3$", "$3 \\times 0{,}2$"],
      bonne: 1,
      explication: "Le contraire de $T \\leqslant 3$ est « trois échecs de suite » : $P(T \\leqslant 3) = 1 - 0{,}8^3 = 0{,}488$."
    },
    {
      question: "$T$ suit $\\mathcal{G}(0{,}2)$. Que vaut $E(T)$ ?",
      choix: ["$0{,}2$", "$2$", "$5$", "$0{,}8$"],
      bonne: 2,
      explication: "$E(T) = \\dfrac{1}{p} = \\dfrac{1}{0{,}2} = 5$."
    },
    {
      question: "$T$ suit $\\mathcal{G}(0{,}3)$ et les $10$ premiers essais ont échoué. Probabilité que le prochain réussisse ?",
      choix: ["$0{,}3$", "Plus que $0{,}3$, il est « dû »", "$0{,}7^{10}$", "$0{,}3^{11}$"],
      bonne: 0,
      explication: "Les essais sont indépendants : la loi géométrique est sans mémoire, la probabilité reste $0{,}3$."
    },
    {
      question: "Pour une loi géométrique, $P_{T > 2}(T > 5)$ est égal à…",
      choix: ["$P(T > 5)$", "$P(T > 3)$", "$P(T > 7)$", "$P(T = 3)$"],
      bonne: 1,
      explication: "Absence de mémoire : $P_{T > s}(T > s + t) = P(T > t)$ avec $s = 2$ et $t = 3$."
    },
    {
      question: "Dans quel cas le nombre d'essais est-il fixé à l'avance ?",
      choix: ["Loi géométrique", "Loi binomiale", "Les deux", "Aucune des deux"],
      bonne: 1,
      explication: "Binomiale : $n$ essais fixés, c'est le nombre de succès qui varie. Géométrique : on s'arrête au premier succès."
    },
    { question: "$X$ suit une loi de Bernoulli avec $E(X) = 0{,}6$. Que vaut $P(X = 0)$ ?", choix: ["$0{,}4$", "$0{,}6$", "$0{,}24$", "$0$"], bonne: 0, explication: "Pour une loi de Bernoulli, $E(X) = p = 0{,}6$, donc $P(X = 0) = 1 - p = 0{,}4$. $0{,}24 = p(1 - p)$ est la variance." },
    { question: "$X$ suit $\\mathcal{B}(3\\,;0{,}5)$. Que vaut $P(X = 2)$ ?", choix: ["$0{,}375$", "$0{,}125$", "$0{,}25$", "$0{,}5$"], bonne: 0, explication: "$P(X = 2) = \\dbinom{3}{2} \\times 0{,}5^2 \\times 0{,}5^1 = 3 \\times 0{,}125 = 0{,}375$. Trois chemins ont exactement $2$ succès." },
    { question: "$X$ suit $\\mathcal{B}(100\\,;0{,}1)$. L'écart type $\\sigma(X)$ vaut :", choix: ["$3$", "$9$", "$10$", "$0{,}3$"], bonne: 0, explication: "$V(X) = np(1 - p) = 100 \\times 0{,}1 \\times 0{,}9 = 9$, donc $\\sigma(X) = \\sqrt{9} = 3$. $9$ est la variance et $10$ l'espérance." },
    { question: "$X$ suit $\\mathcal{B}(n\\,;0{,}4)$ et $E(X) = 12$. Alors $n =$", choix: ["$30$", "$4{,}8$", "$12$", "$48$"], bonne: 0, explication: "$E(X) = np$, donc $0{,}4n = 12$ et $n = \\dfrac{12}{0{,}4} = 30$." },
    { question: "$X$ suit $\\mathcal{B}(5\\,;0{,}2)$. Que vaut $P(X \\geqslant 1)$ ?", choix: ["$1 - 0{,}8^5$", "$0{,}8^5$", "$1 - 0{,}2^5$", "$5 \\times 0{,}2$"], bonne: 0, explication: "Le contraire de « au moins un succès » est « aucun succès », de probabilité $0{,}8^5$. Donc $P(X \\geqslant 1) = 1 - 0{,}8^5 \\approx 0{,}672$." },
    { question: "$X$ suit une loi binomiale. $P(X > 4)$ s'écrit…", choix: ["$1 - P(X \\leqslant 4)$", "$1 - P(X \\leqslant 3)$", "$1 - P(X \\geqslant 4)$", "$P(X \\leqslant 4)$"], bonne: 0, explication: "On garde les entiers à partir de $5$ : le contraire de $X > 4$ est $X \\leqslant 4$. À ne pas confondre avec $P(X \\geqslant 4) = 1 - P(X \\leqslant 3)$." },
    { question: "On lance un dé équilibré jusqu'à obtenir un $6$. En moyenne, combien de lancers faut-il ?", choix: ["$6$", "$3{,}5$", "$\\dfrac{1}{6}$", "$3$"], bonne: 0, explication: "Le rang du premier $6$ suit la loi géométrique $\\mathcal{G}\\left(\\dfrac{1}{6}\\right)$, d'espérance $\\dfrac{1}{p} = 6$. $3{,}5$ est la moyenne des résultats d'un lancer." },
    { question: "$T$ suit $\\mathcal{G}(0{,}5)$. Que vaut $P(T > 3)$ ?", choix: ["$0{,}125$", "$0{,}0625$", "$0{,}875$", "$0{,}5$"], bonne: 0, explication: "$T > 3$ signifie trois échecs de suite : $P(T > 3) = 0{,}5^3 = 0{,}125$. $0{,}875 = 1 - 0{,}5^3$ est $P(T \\leqslant 3)$." },
    { question: "À la pêche dans le lagon, chaque lancer de ligne prend un poisson avec la probabilité $0{,}15$, de façon indépendante. Le nombre $N$ de lancers jusqu'au premier poisson suit :", choix: ["la loi géométrique $\\mathcal{G}(0{,}15)$", "la loi binomiale $\\mathcal{B}(10\\,;0{,}15)$", "une loi uniforme", "la loi de Bernoulli de paramètre $0{,}15$"], bonne: 0, explication: "$N$ est le rang du premier succès dans des essais indépendants de même probabilité : c'est la loi géométrique. Le nombre d'essais n'est pas fixé à l'avance." },
    { question: "$\\dbinom{4}{1} + \\dbinom{4}{2}$ est égal à :", choix: ["$\\dbinom{5}{2}$", "$\\dbinom{8}{3}$", "$\\dbinom{4}{3}$", "$\\dbinom{5}{1}$"], bonne: 0, explication: "Triangle de Pascal : $\\dbinom{n - 1}{k - 1} + \\dbinom{n - 1}{k} = \\dbinom{n}{k}$ avec $n = 5$ et $k = 2$. Vérification : $4 + 6 = 10 = \\dbinom{5}{2}$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Justifier qu'une variable suit une loi binomiale",
      etapes: [
        "Décrire l'épreuve et préciser le **succès**, avec sa probabilité $p$.",
        "Vérifier : $n$ répétitions identiques et **indépendantes**, nombre fixé à l'avance.",
        "Dire que $X$ compte les succès : $X$ suit $\\mathcal{B}(n\\,;p)$."
      ],
      exemple: "On répond au hasard à $5$ QCM à $4$ choix : $5$ épreuves indépendantes, succès « bonne réponse » de probabilité $0{,}25$. $X$ suit $\\mathcal{B}(5\\,;0{,}25)$."
    },
    {
      titre: "Calculer une probabilité binomiale",
      etapes: [
        "Écrire $P(X = k) = \\dbinom{n}{k} p^k (1 - p)^{n - k}$ en repérant le coefficient, le facteur de succès et le facteur d'échec.",
        "Obtenir $\\dbinom{n}{k}$ avec le triangle de Pascal ou la calculatrice.",
        "Calculer et arrondir seulement à la fin."
      ],
      exemple: "$\\mathcal{B}(4\\,;0{,}1)$ : $P(X = 1) = 4 \\times 0{,}1 \\times 0{,}9^3 \\approx 0{,}292$."
    },
    {
      titre: "Traduire un événement avec le cumul",
      etapes: [
        "Écrire la liste des entiers que l'on garde.",
        "« Au plus $k$ » : $P(X \\leqslant k)$. « Au moins $k$ » : $1 - P(X \\leqslant k - 1)$.",
        "« Entre $a$ et $b$ inclus » : $P(X \\leqslant b) - P(X \\leqslant a - 1)$.",
        "Inégalité stricte : décaler d'une unité ($X < k$ équivaut à $X \\leqslant k - 1$)."
      ],
      exemple: "$P(X > 6) = 1 - P(X \\leqslant 6)$ et $P(X \\geqslant 6) = 1 - P(X \\leqslant 5)$ : ce ne sont pas les mêmes."
    },
    {
      titre: "Déterminer un intervalle de fluctuation",
      etapes: [
        "Tabuler $P(X \\leqslant k)$ à la calculatrice autour de l'espérance.",
        "Repérer le plus petit $b$ tel que $P(X \\leqslant b) \\geqslant 1 - \\alpha$.",
        "Justifier en citant les deux cumuls qui encadrent le seuil.",
        "Pour un intervalle bilatéral, limiter chaque queue à $\\dfrac{\\alpha}{2}$. Pour une fréquence, diviser les bornes par $n$."
      ],
      exemple: "$\\mathcal{B}(10\\,;0{,}2)$ : $F(3) \\approx 0{,}879$ et $F(4) \\approx 0{,}967$, donc $[0\\,;4]$ au seuil $95\\,\\%$."
    },
    {
      titre: "Calculer avec une loi géométrique",
      etapes: [
        "Vérifier : essais indépendants, même probabilité $p$, on s'arrête au premier succès.",
        "Traduire en nombre d'échecs : $T = k$, c'est $k - 1$ échecs puis un succès ; $T > k$, c'est $k$ échecs.",
        "Appliquer $P(T = k) = (1 - p)^{k - 1} p$, $P(T > k) = (1 - p)^k$, $P(T \\leqslant k) = 1 - (1 - p)^k$.",
        "Avec une condition « sachant que $T > s$ », utiliser l'absence de mémoire."
      ],
      exemple: "$p = 0{,}12$ : $P(T > 4) = 0{,}88^4 \\approx 0{,}600$ et $P(T = 5) = 0{,}88^4 \\times 0{,}12 \\approx 0{,}072$."
    }
  ],
  erreurs: [
    "Prendre l'espérance pour un résultat certain ou forcément possible.",
    "Utiliser la loi binomiale pour des tirages **sans remise** : les essais ne sont pas indépendants.",
    "Oublier le coefficient $\\dbinom{n}{k}$ dans $P(X = k)$.",
    "Écrire $P(X \\geqslant k) = 1 - P(X \\leqslant k)$ : le contraire de « au moins $k$ » est $X \\leqslant k - 1$.",
    "Retirer trop de valeurs dans $P(a \\leqslant X \\leqslant b)$ : on retire seulement le cumul jusqu'à $a - 1$.",
    "Confondre la variance $np(1 - p)$ et l'écart type $\\sqrt{np(1 - p)}$.",
    "Compter $k$ échecs au lieu de $k - 1$ dans $P(T = k)$.",
    "Croire qu'après plusieurs échecs, un succès devient « dû » : la loi géométrique est sans mémoire."
  ]
};
