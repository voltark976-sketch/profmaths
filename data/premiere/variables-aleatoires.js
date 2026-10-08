/*
  CHAPITRE : Première spécialité — Variables aléatoires
  ------------------------------------------------------
  Chapitre 13 de la progression spiralée 2026-2027 (programme de Première 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas encore de vidéo de la chaîne pour ce niveau : une vidéo de cours de Terminale de la chaîne, puis Yvan Monka.
  Figures : "va-batons", "arbre-bernoulli". Générateurs : va- (et ld-loi-esperance de Terminale).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-variables-aleatoires"] = {
  niveau: "Première spécialité",
  numero: 13,
  titre: "Variables aléatoires",
  accroche: "Associer un nombre au hasard : loi, espérance, variance, la tombola de la maison des lycéens et les répétitions d'épreuves en arbre.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur les variables aléatoires en vidéo (Yvan Monka)", url: "https://youtu.be/krbtyBDeRqQ", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Variable aléatoire et loi de probabilité",
      video: { titre: "Vidéo de ton prof : variable aléatoire (cours de Terminale, partie 1/4)", youtube: "https://youtu.be/gQhLo-TDi9Q" },
      texte:
        "Une expérience aléatoire a un **univers** $\\Omega$ fini (l'ensemble des issues). Une **variable aléatoire** $X$ associe un **nombre réel** à chaque issue : un gain, un nombre de succès, une somme…\n\n" +
        "La **loi de probabilité** de $X$ donne chaque valeur $x_i$ prise par $X$ et sa probabilité $p_i = P(X = x_i)$. On la présente dans un tableau ; la somme des $p_i$ vaut $1$.\n\n" +
        "Exemple : la maison des lycéens vend $200$ billets de tombola à $2$ €, avec $1$ lot de $100$ €, $5$ lots de $20$ € et $20$ lots de $5$ €. Le gain algébrique $X$ d'un acheteur (lot moins prix du billet) peut valoir $98$, $18$, $3$ ou $-2$, avec les probabilités $\\dfrac{1}{200}$, $\\dfrac{5}{200}$, $\\dfrac{20}{200}$ et $\\dfrac{174}{200}$.",
      exemple: {
        enonce: "On lance deux pièces et $X$ est le nombre de « pile ». Donne la loi de $X$.",
        solution: "Quatre issues équiprobables : PP, PF, FP, FF. $P(X = 0) = \\dfrac{1}{4}$, $P(X = 1) = \\dfrac{2}{4} = \\dfrac{1}{2}$, $P(X = 2) = \\dfrac{1}{4}$, et la somme vaut bien $1$."
      }
    },
    {
      titre: "Notations et événements",
      video: { titre: "Vidéo d'Yvan Monka : calculer une probabilité avec une variable aléatoire", youtube: "https://youtu.be/IBqkrg8pxQ4" },
      texte:
        "- $\\{X = a\\}$ est l'événement « $X$ prend la valeur $a$ » ; sa probabilité se note $P(X = a)$.\n" +
        "- $\\{X \\leqslant a\\}$ est l'événement « $X$ prend une valeur inférieure ou égale à $a$ » : $P(X \\leqslant a)$ est la somme des $P(X = x_i)$ pour $x_i \\leqslant a$.\n\n" +
        "Logique des ensembles :\n\n" +
        "- l'**intersection** traduit « et » : $\\{X \\leqslant 3\\} \\cap \\{X \\geqslant 3\\} = \\{X = 3\\}$ ;\n" +
        "- la **négation** de $\\{X \\leqslant a\\}$ est $\\{X > a\\}$, donc $P(X > a) = 1 - P(X \\leqslant a)$.\n\n" +
        "Attention à l'inégalité stricte : $\\{X < a\\}$ ne contient pas la valeur $a$.",
      exemple: {
        enonce: "Pour la tombola, calcule $P(X > 0)$ et $P(X \\leqslant 3)$.",
        solution: "$P(X > 0) = \\dfrac{1 + 5 + 20}{200} = 0{,}13$ (gagner un lot).\n\n$P(X \\leqslant 3) = \\dfrac{20 + 174}{200} = 0{,}97$."
      }
    },
    {
      titre: "Espérance",
      figure: "va-batons",
      video: { titre: "Vidéo d'Yvan Monka : calculer une espérance", youtube: "https://youtu.be/AcWVxHgtWp4" },
      texte:
        "L'**espérance** de $X$ est la moyenne des valeurs pondérées par leurs probabilités :\n\n" +
        "$E(X) = p_1x_1 + p_2x_2 + \\dots + p_nx_n$.\n\n" +
        "Sur un grand nombre de répétitions de l'expérience, la moyenne des valeurs obtenues se rapproche de $E(X)$. Sur le diagramme, $E(X)$ est le **point d'équilibre** des bâtons.\n\n" +
        "Attention : $E(X)$ n'est pas forcément une valeur prise par $X$.",
      exemple: {
        enonce: "Calcule l'espérance du gain $X$ à la tombola.",
        solution: "$E(X) = \\dfrac{1 \\times 98 + 5 \\times 18 + 20 \\times 3 + 174 \\times (-2)}{200} = \\dfrac{98 + 90 + 60 - 348}{200} = -0{,}5$.\n\nEn moyenne, un acheteur perd $0{,}50$ € par billet."
      }
    },
    {
      titre: "Jeu équitable : la tombola de la maison des lycéens",
      video: { titre: "Vidéo d'Yvan Monka : utiliser l'espérance pour résoudre un problème", youtube: "https://youtu.be/CbCMJXGhC4k" },
      texte:
        "Un jeu est **équitable** si l'espérance du gain du joueur est nulle : en moyenne, on ne gagne ni ne perd.\n\n" +
        "Pour la tombola, la valeur totale des lots est $100 + 5 \\times 20 + 20 \\times 5 = 300$ €, soit en moyenne $\\dfrac{300}{200} = 1{,}50$ € par billet.\n\n" +
        "- Avec un billet à $1{,}50$ €, le jeu serait équitable.\n" +
        "- À $2$ €, chaque billet rapporte en moyenne $0{,}50$ € à la maison des lycéens : $200 \\times 0{,}50 = 100$ € de bénéfice.",
      exemple: {
        enonce: "La maison des lycéens veut gagner $160$ € en vendant les $200$ billets. Quel prix choisir ?",
        solution: "Il faut $300 + 160 = 460$ € de recettes, soit $\\dfrac{460}{200} = 2{,}30$ € le billet. L'espérance du gain d'un acheteur est alors $1{,}50 - 2{,}30 = -0{,}80$ €."
      }
    },
    {
      titre: "Variance et écart type",
      video: { titre: "Vidéo d'Yvan Monka : calculer une variance et un écart type", youtube: "https://youtu.be/elpgMDSU5t8" },
      texte:
        "La **variance** mesure la dispersion de $X$ autour de son espérance :\n\n" +
        "$V(X) = p_1(x_1 - E(X))^2 + \\dots + p_n(x_n - E(X))^2$.\n\n" +
        "**Formule de König-Huygens** : $V(X) = E(X^2) - E(X)^2$, avec $E(X^2) = p_1x_1^2 + \\dots + p_nx_n^2$.\n\n" +
        "L'**écart type** est $\\sigma(X) = \\sqrt{V(X)}$ : il s'exprime dans la même unité que $X$. Plus il est grand, plus les valeurs sont dispersées.",
      exemple: {
        enonce: "Calcule $V(X)$ et $\\sigma(X)$ pour la tombola, sachant que $E(X) = -0{,}5$.",
        solution: "$E(X^2) = \\dfrac{98^2 + 5 \\times 18^2 + 20 \\times 3^2 + 174 \\times 4}{200} = \\dfrac{12\\,100}{200} = 60{,}5$.\n\n$V(X) = 60{,}5 - (-0{,}5)^2 = 60{,}25$ et $\\sigma(X) \\approx 7{,}76$ € : les gains sont très dispersés (beaucoup de petites pertes, un gros lot)."
      }
    },
    {
      titre: "Linéarité de l'espérance",
      video: { titre: "Vidéo d'Yvan Monka : utiliser la linéarité de l'espérance", youtube: "https://youtu.be/ljITvCBExVY" },
      texte:
        "Pour tous réels $a$ et $b$ :\n\n" +
        "- $E(aX + b) = aE(X) + b$ ;\n" +
        "- $V(aX + b) = a^2\\,V(X)$, donc $\\sigma(aX + b) = |a|\\,\\sigma(X)$.\n\n" +
        "Ajouter une constante $b$ décale toutes les valeurs, sans changer leur dispersion. Multiplier par $a$ multiplie les écarts par $|a|$.",
      exemple: {
        enonce: "Un vendeur de brochettes gagne $X$ euros par heure, avec $E(X) = 12$ et $V(X) = 4$. Il reverse $10\\,\\%$ et paie $2$ € de charbon par heure : $Y = 0{,}9X - 2$. Calcule $E(Y)$ et $V(Y)$.",
        solution: "$E(Y) = 0{,}9 \\times 12 - 2 = 8{,}8$ € et $V(Y) = 0{,}9^2 \\times 4 = 3{,}24$."
      }
    },
    {
      titre: "Répéter des épreuves de Bernoulli",
      figure: "arbre-bernoulli",
      video: { titre: "Vidéo d'Yvan Monka : calculer une probabilité sur une répétition d'expériences", youtube: "https://youtu.be/e7jH8a1cDtg" },
      texte:
        "Une **épreuve de Bernoulli** n'a que deux issues : succès $S$ (probabilité $p$) ou échec $E$ (probabilité $1 - p$).\n\n" +
        "On répète $n$ fois ($n \\leqslant 4$) la même épreuve, de façon **indépendante**. On représente la situation par un arbre (schéma pour $n = 3$) :\n\n" +
        "- la probabilité d'un chemin est le produit des probabilités de ses branches (chapitre 4) ;\n" +
        "- $P(X = k)$, où $X$ est le nombre de succès, est la somme des probabilités des chemins qui ont exactement $k$ succès.\n\n" +
        "Exemple : un élève répond au hasard à $3$ questions à $4$ choix ($p = 0{,}25$). Trois chemins ont exactement $2$ bonnes réponses ($SSE$, $SES$, $ESS$), donc $P(X = 2) = 3 \\times 0{,}25^2 \\times 0{,}75 \\approx 0{,}141$.",
      exemple: {
        enonce: "Avec ces $3$ questions, calcule $P(X \\geqslant 1)$.",
        solution: "L'événement contraire est « aucune bonne réponse » : un seul chemin $EEE$. $P(X \\geqslant 1) = 1 - 0{,}75^3 \\approx 0{,}578$."
      }
    },
    {
      titre: "Python : espérance, variance et fréquences",
      texte:
        "Avec deux listes, les valeurs x et leurs probabilités p :\n\n" +
        "```python\nfrom math import sqrt\n\ndef esperance(x, p):\n    return sum(x[i] * p[i] for i in range(len(x)))\n\ndef variance(x, p):\n    e = esperance(x, p)\n    return sum(p[i] * (x[i] - e)**2 for i in range(len(x)))\n\nx = [98, 18, 3, -2]\np = [1/200, 5/200, 20/200, 174/200]\nprint(esperance(x, p), variance(x, p), sqrt(variance(x, p)))\n```\n\n" +
        "Le programme affiche environ $-0{,}5$ ; $60{,}25$ ; $7{,}76$ : les résultats de la tombola.\n\n" +
        "Pour construire une loi à partir de données, on compte des fréquences, par exemple celle d'une lettre dans un texte :\n\n" +
        "```python\ndef frequence(lettre, texte):\n    return texte.count(lettre) / len(texte)\n```",
      exemple: {
        enonce: "Que renvoie frequence(\"o\", \"mamoudzou\") ?",
        solution: "Le mot a $9$ lettres, dont $2$ « o » : la fonction renvoie $\\dfrac{2}{9} \\approx 0{,}222$."
      }
    }
  ],

  videos: [
    { titre: "Déterminer la loi de probabilité d'une variable aléatoire (1)", type: "Loi", youtube: "https://youtu.be/2Ge_4hclPnI" },
    { titre: "Déterminer la loi de probabilité d'une variable aléatoire (2)", type: "Loi", youtube: "https://youtu.be/awtn6gsRwfs" },
    { titre: "Calculer une probabilité avec une variable aléatoire (2)", type: "Notations", youtube: "https://youtu.be/OnD_Ym95Px4" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "va-notations", titre: "Notations P(X ⩽ a), P(X > a)", etape: "Loi", nb: 5 },
    { type: "ld-loi-esperance", titre: "Compléter une loi, calculer une espérance", etape: "Loi", nb: 5 },
    { type: "va-logique", titre: "Événements et pièges", etape: "Loi", nb: 4 },
    { type: "va-variance", titre: "Variance et écart type", etape: "Indicateurs", nb: 5 },
    { type: "va-lineaire", titre: "Linéarité", etape: "Indicateurs", nb: 4 },
    { type: "va-equitable", titre: "La tombola : jeu équitable ?", etape: "Indicateurs", nb: 4 },
    { type: "va-bernoulli", titre: "Épreuves répétées en arbre", etape: "Répétitions", nb: 5 },
    { type: "va-python", titre: "Python : espérance et fréquences", etape: "Répétitions", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Une variable aléatoire associe à chaque issue :", choix: ["un nombre réel", "une probabilité", "un événement", "une autre issue"], bonne: 0, explication: "Par exemple un gain, un nombre de succès, une somme." },
    { question: "Dans une loi de probabilité, la somme des $P(X = x_i)$ vaut :", choix: ["$1$", "$0$", "$E(X)$", "le nombre de valeurs"], bonne: 0, explication: "Les événements $\\{X = x_i\\}$ se partagent toutes les issues." },
    { question: "Le contraire de $\\{X \\leqslant 2\\}$ est :", choix: ["$\\{X > 2\\}$", "$\\{X \\geqslant 2\\}$", "$\\{X < 2\\}$", "$\\{X = 2\\}$"], bonne: 0, explication: "La valeur $2$ est dans $\\{X \\leqslant 2\\}$, donc pas dans son contraire." },
    { question: "$P(X \\leqslant 3) = 0{,}7$. Alors $P(X > 3) =$", choix: ["$0{,}3$", "$0{,}7$", "$1{,}7$", "on ne peut pas savoir"], bonne: 0, explication: "Événements contraires : $1 - 0{,}7$." },
    { question: "$X$ prend les valeurs $-1$, $2$ et $5$ avec les probabilités $0{,}5$, $0{,}3$ et $0{,}2$. $E(X) =$", choix: ["$1{,}1$", "$2$", "$1{,}5$", "$0{,}6$"], bonne: 0, explication: "$-0{,}5 + 0{,}6 + 1 = 1{,}1$." },
    { question: "Pour un dé équilibré à $6$ faces, l'espérance du résultat vaut :", choix: ["$3{,}5$", "$3$", "$6$", "$\\dfrac{1}{6}$"], bonne: 0, explication: "$\\dfrac{1 + 2 + 3 + 4 + 5 + 6}{6} = 3{,}5$, qui n'est pas un résultat possible." },
    { question: "Un jeu est équitable lorsque :", choix: ["l'espérance du gain est nulle", "on gagne une fois sur deux", "la mise est égale au gros lot", "la variance est nulle"], bonne: 0, explication: "En moyenne, on ne gagne ni ne perd." },
    { question: "$100$ billets, lots d'une valeur totale de $150$ €. Le prix équitable d'un billet est :", choix: ["$1{,}50$ €", "$150$ €", "$1$ €", "$15$ €"], bonne: 0, explication: "$\\dfrac{150}{100} = 1{,}50$ €." },
    { question: "La formule de König-Huygens s'écrit :", choix: ["$V(X) = E(X^2) - E(X)^2$", "$V(X) = E(X)^2 - E(X^2)$", "$V(X) = E(X^2)$", "$V(X) = \\sqrt{E(X)}$"], bonne: 0, explication: "Moyenne des carrés moins carré de la moyenne." },
    { question: "$V(X) = 9$. L'écart type vaut :", choix: ["$3$", "$81$", "$4{,}5$", "$9$"], bonne: 0, explication: "$\\sigma(X) = \\sqrt{9} = 3$." },
    { question: "$E(X) = 5$. Alors $E(2X - 3) =$", choix: ["$7$", "$10$", "$13$", "$4$"], bonne: 0, explication: "$2 \\times 5 - 3 = 7$." },
    { question: "$V(X) = 4$. Alors $V(3X + 7) =$", choix: ["$36$", "$12$", "$19$", "$43$"], bonne: 0, explication: "$V(aX + b) = a^2V(X) = 9 \\times 4$." },
    { question: "On répète $3$ fois une épreuve de Bernoulli de paramètre $p$, de façon indépendante. Combien de chemins de l'arbre ont exactement $1$ succès ?", choix: ["$3$", "$1$", "$2$", "$8$"], bonne: 0, explication: "$SEE$, $ESE$, $EES$." },
    { question: "Avec $p = 0{,}5$ et $3$ épreuves, $P(X = 0) =$", choix: ["$0{,}125$", "$0{,}5$", "$0$", "$0{,}375$"], bonne: 0, explication: "Un seul chemin $EEE$ : $0{,}5^3 = 0{,}125$." },
    { question: "« Au moins un succès » en $n$ épreuves a pour probabilité :", choix: ["$1 - (1 - p)^n$", "$np$", "$p^n$", "$1 - p^n$"], bonne: 0, explication: "Son contraire, « aucun succès », a pour probabilité $(1 - p)^n$." },
    { question: "Que renvoie esperance([0, 10], [0.9, 0.1]) (programme du cours) ?", choix: ["$1$", "$10$", "$5$", "$0{,}1$"], bonne: 0, explication: "$0 \\times 0{,}9 + 10 \\times 0{,}1 = 1$." },
    { question: "Une loi de probabilité est donnée par $P(X = 0) = 0{,}2$, $P(X = 1) = 0{,}5$ et $P(X = 2) = a$. Alors $a =$", choix: ["$0{,}3$", "$0{,}7$", "$0{,}5$", "$1$"], bonne: 0, explication: "La somme des probabilités vaut $1$ : $a = 1 - 0{,}2 - 0{,}5 = 0{,}3$." },
    { question: "$X$ prend les valeurs $1$, $2$, $3$, $4$ avec les probabilités $0{,}1$ ; $0{,}2$ ; $0{,}3$ ; $0{,}4$. $P(X < 3) =$", choix: ["$0{,}3$", "$0{,}6$", "$0{,}7$", "$0{,}4$"], bonne: 0, explication: "$\\{X < 3\\}$ ne contient pas la valeur $3$ : $P(X < 3) = P(X = 1) + P(X = 2) = 0{,}1 + 0{,}2 = 0{,}3$. $0{,}6$ serait $P(X \\leqslant 3)$." },
    { question: "L'événement $\\{X \\geqslant 2\\} \\cap \\{X \\leqslant 4\\}$ s'écrit aussi :", choix: ["$\\{2 \\leqslant X \\leqslant 4\\}$", "$\\{X < 2\\} \\cup \\{X > 4\\}$", "$\\{X = 2\\} \\cap \\{X = 4\\}$", "$\\{X \\geqslant 4\\}$"], bonne: 0, explication: "L'intersection traduit « et » : $X$ doit être à la fois supérieur ou égal à $2$ et inférieur ou égal à $4$." },
    { question: "$X$ prend les valeurs $-2$ et $3$ avec les probabilités $0{,}6$ et $0{,}4$. $E(X) =$", choix: ["$0$", "$0{,}5$", "$1$", "$-1{,}2$"], bonne: 0, explication: "$E(X) = 0{,}6 \\times (-2) + 0{,}4 \\times 3 = -1{,}2 + 1{,}2 = 0$. $0{,}5$ est la moyenne de $-2$ et $3$ sans tenir compte des probabilités." },
    { question: "On mise $3$ € pour lancer un dé équilibré : on reçoit $12$ € si on obtient $6$, rien sinon. L'espérance du gain algébrique vaut :", choix: ["$-1$ €", "$2$ €", "$1{,}5$ €", "$0$ €"], bonne: 0, explication: "Le gain vaut $12 - 3 = 9$ € avec la probabilité $\\dfrac{1}{6}$, et $-3$ € avec $\\dfrac{5}{6}$ : $E = \\dfrac{9 - 15}{6} = -1$ €. Le jeu est défavorable au joueur." },
    { question: "$X$ prend les valeurs $0$ et $2$, chacune avec la probabilité $0{,}5$. $V(X) =$", choix: ["$1$", "$2$", "$0$", "$4$"], bonne: 0, explication: "$E(X) = 1$ et $E(X^2) = 0{,}5 \\times 0 + 0{,}5 \\times 4 = 2$. König-Huygens : $V(X) = 2 - 1^2 = 1$." },
    { question: "$E(X) = 3$ et $E(X^2) = 13$. Alors $\\sigma(X) =$", choix: ["$2$", "$4$", "$\\sqrt{10}$", "$\\sqrt{13}$"], bonne: 0, explication: "$V(X) = E(X^2) - E(X)^2 = 13 - 9 = 4$, donc $\\sigma(X) = \\sqrt{4} = 2$. Il ne faut pas oublier le carré de $E(X)$." },
    { question: "$\\sigma(X) = 2$. Alors $\\sigma(-3X + 1) =$", choix: ["$6$", "$-6$", "$-5$", "$18$"], bonne: 0, explication: "$\\sigma(aX + b) = |a|\\,\\sigma(X) = 3 \\times 2 = 6$. Un écart type n'est jamais négatif, et la constante $1$ ne change pas la dispersion." },
    { question: "Le nombre $X$ de régimes de bananes récoltés en une semaine a pour espérance $40$. Le revenu, en euros, vaut $R = 15X - 100$. $E(R) =$", choix: ["$500$ €", "$600$ €", "$-85$ €", "$40$ €"], bonne: 0, explication: "Linéarité : $E(15X - 100) = 15E(X) - 100 = 600 - 100 = 500$ €." },
    { question: "On lance $2$ fois une pièce truquée qui donne « pile » avec la probabilité $0{,}6$. La probabilité d'obtenir exactement un « pile » est :", choix: ["$0{,}48$", "$0{,}24$", "$0{,}6$", "$0{,}36$"], bonne: 0, explication: "Deux chemins réalisent l'événement, $PF$ et $FP$, chacun de probabilité $0{,}6 \\times 0{,}4 = 0{,}24$. Au total : $2 \\times 0{,}24 = 0{,}48$." },
    { question: "Un élève répond au hasard à $4$ questions de type Vrai/Faux, de façon indépendante. La probabilité qu'il réponde juste à tout est :", choix: ["$\\dfrac{1}{16}$", "$\\dfrac{1}{8}$", "$\\dfrac{1}{2}$", "$\\dfrac{1}{4}$"], bonne: 0, explication: "Un seul chemin $SSSS$, de probabilité $\\left(\\dfrac{1}{2}\\right)^4 = \\dfrac{1}{16}$." },
    { question: "On répète $3$ fois, de façon indépendante, une épreuve de Bernoulli de paramètre $p = 0{,}1$. La probabilité d'au moins un succès vaut :", choix: ["$0{,}271$", "$0{,}3$", "$0{,}001$", "$0{,}729$"], bonne: 0, explication: "Le contraire, « aucun succès », a pour probabilité $0{,}9^3 = 0{,}729$. Donc $P = 1 - 0{,}729 = 0{,}271$. Additionner $0{,}1$ trois fois est faux : les chemins se chevauchent." },
    { question: "Avec les fonctions du cours, que renvoie $\\texttt{variance([0, 10], [0.5, 0.5])}$ ?", choix: ["$25$", "$5$", "$50$", "$0$"], bonne: 0, explication: "L'espérance vaut $5$, puis $V = 0{,}5 \\times (0 - 5)^2 + 0{,}5 \\times (10 - 5)^2 = 12{,}5 + 12{,}5 = 25$. L'écart type vaut $5$." },
    { question: "Avec la fonction du cours, que renvoie $\\texttt{frequence('a', 'banana')}$ ?", choix: ["$0{,}5$", "$3$", "$\\dfrac{1}{6}$", "$0{,}3$"], bonne: 0, explication: "La lettre a apparaît $3$ fois dans un mot de $6$ lettres : $\\dfrac{3}{6} = 0{,}5$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Déterminer une loi de probabilité",
      etapes: ["Lister les valeurs possibles de $X$.", "Pour chaque valeur, calculer $P(X = x_i)$ (dénombrement, arbre…).", "Présenter dans un tableau et vérifier que la somme vaut $1$."],
      exemple: "Deux pièces, $X$ nombre de « pile » : $P(X = 0) = \\dfrac{1}{4}$, $P(X = 1) = \\dfrac{1}{2}$, $P(X = 2) = \\dfrac{1}{4}$."
    },
    {
      titre: "Calculer espérance, variance, écart type",
      etapes: ["$E(X) = \\sum p_ix_i$.", "$E(X^2) = \\sum p_ix_i^2$, puis $V(X) = E(X^2) - E(X)^2$.", "$\\sigma(X) = \\sqrt{V(X)}$, dans l'unité de $X$."],
      exemple: "Valeurs $0$ et $10$, probabilités $0{,}9$ et $0{,}1$ : $E(X) = 1$, $E(X^2) = 10$, $V(X) = 9$, $\\sigma(X) = 3$."
    },
    {
      titre: "Étudier un jeu",
      etapes: ["Définir $X$ = gain algébrique (gain moins mise).", "Calculer $E(X)$.", "Conclure : $E(X) > 0$ favorable au joueur, $E(X) < 0$ défavorable, $E(X) = 0$ équitable."],
      exemple: "Tombola : $E(X) = -0{,}5$ € par billet, défavorable au joueur."
    },
    {
      titre: "Calculer une probabilité dans des épreuves répétées",
      etapes: ["Dessiner l'arbre des $n$ épreuves (succès $p$, échec $1 - p$).", "Repérer les chemins qui réalisent l'événement.", "Additionner les probabilités de ces chemins (chacune est un produit)."],
      exemple: "$3$ questions, $p = 0{,}25$ : $P(X = 2) = 3 \\times 0{,}25^2 \\times 0{,}75 \\approx 0{,}141$."
    }
  ],
  erreurs: [
    "Oublier de retirer la mise : le gain algébrique est « lot moins prix du billet ».",
    "Confondre $P(X < a)$ et $P(X \\leqslant a)$ : la valeur $a$ est exclue de la première.",
    "Nier $\\{X \\leqslant a\\}$ par $\\{X \\geqslant a\\}$ : la négation est $\\{X > a\\}$.",
    "Oublier le carré dans König-Huygens : $V(X) = E(X^2) - E(X)^2$.",
    "Écrire $V(aX + b) = aV(X) + b$ : la variance donne $a^2V(X)$.",
    "Ne compter qu'un seul chemin dans un arbre alors que plusieurs réalisent l'événement."
  ]
};
