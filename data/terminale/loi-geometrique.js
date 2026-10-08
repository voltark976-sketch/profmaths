/*
  CHAPITRE : Terminale maths complémentaires — Loi géométrique et temps d'attente discrets
  ---------------------------------------------------------------------------------------
  Chapitre 10 de la progression spiralée 2026-2027 (programme de maths complémentaires de 2019).
  Les bases (définition, absence de mémoire) sont déjà dans le chapitre 2 « Lois discrètes » (livret et vidéos du prof) :
  ce chapitre les approfondit (temps d'attente, crues et période de retour, seuils avec ln, simulation).
  Figures : "tlg-batons", "tlg-crue". Générateurs : tlg- (et ld-geometrique, ld-sans-memoire du chapitre 2).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-loi-geometrique"] = {
  niveau: "Terminale maths complémentaires",
  numero: 10,
  titre: "Loi géométrique et temps d'attente",
  accroche: "Combien de temps attendre le premier succès ? Espérance 1/p, absence de mémoire, crues et période de retour, seuils avec le logarithme et simulation en Python.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Le temps d'attente du premier succès",
      figure: "tlg-batons",
      video: { titre: "Vidéo d'Yvan Monka : calculer avec une loi géométrique", youtube: "https://youtu.be/hg7V5cj2QYE" },
      texte:
        "On répète une épreuve de Bernoulli de paramètre $p$ (succès de probabilité $p$), de façon indépendante, **jusqu'au premier succès**. Le rang $X$ du premier succès suit la **loi géométrique** de paramètre $p$ (vue au chapitre 2) :\n\n" +
        "$P(X = k) = (1 - p)^{k-1}p$ pour $k = 1, 2, 3, \\dots$\n\n" +
        "Il faut $k - 1$ échecs puis un succès. La figure montre les bâtons pour $p = 0{,}3$ : ils diminuent comme une suite géométrique de raison $0{,}7$.",
      exemple: {
        enonce: "On lance un dé jusqu'à obtenir un six. Calcule $P(X = 3)$.",
        solution: "$P(X = 3) = \\left(\\dfrac{5}{6}\\right)^2 \\times \\dfrac{1}{6} = \\dfrac{25}{216} \\approx 0{,}116$."
      }
    },
    {
      titre: "Attendre plus de n épreuves",
      texte:
        "L'événement « $X > n$ » signifie que les $n$ premières épreuves sont des **échecs** :\n\n" +
        "$P(X > n) = (1 - p)^n$ et $P(X \\leqslant n) = 1 - (1 - p)^n$.\n\n" +
        "C'est beaucoup plus rapide que d'additionner les $P(X = k)$.",
      exemple: {
        enonce: "Avec $p = 0{,}2$, calcule la probabilité d'attendre plus de $5$ épreuves, puis d'avoir un succès en au plus $5$ épreuves.",
        solution: "$P(X > 5) = 0{,}8^5 \\approx 0{,}328$ et $P(X \\leqslant 5) = 1 - 0{,}8^5 \\approx 0{,}672$."
      }
    },
    {
      titre: "Espérance : en moyenne 1/p épreuves",
      texte:
        "Propriété (admise) : $E(X) = \\dfrac{1}{p}$.\n\n" +
        "- Un dé : $p = \\dfrac{1}{6}$, il faut en moyenne $6$ lancers pour obtenir un six.\n" +
        "- Plus le succès est rare, plus l'attente moyenne est longue.\n\n" +
        "On vérifie aussi que les probabilités font bien $1$ : $\\sum P(X = k) = p \\times \\left(1 + (1 - p) + (1 - p)^2 + \\dots\\right) = p \\times \\dfrac{1}{1 - (1 - p)} = 1$ (somme géométrique du chapitre 1).",
      exemple: {
        enonce: "Un vendeur de la coopérative réussit une vente avec la probabilité $0{,}25$ à chaque client. Combien de clients aborde-t-il en moyenne avant sa première vente (incluse) ?",
        solution: "$E(X) = \\dfrac{1}{0{,}25} = 4$ clients en moyenne."
      }
    },
    {
      titre: "Absence de mémoire",
      video: { titre: "Vidéo de ton prof : loi géométrique et absence de mémoire (cours 4/4)", youtube: "https://youtu.be/Lp19Rs3SHRs" },
      texte:
        "Pour tous entiers $m$ et $n$ : $P_{X > m}(X > m + n) = P(X > n)$.\n\n" +
        "**Démonstration** : $P_{X > m}(X > m + n) = \\dfrac{P(X > m + n)}{P(X > m)} = \\dfrac{(1 - p)^{m+n}}{(1 - p)^m} = (1 - p)^n = P(X > n)$.\n\n" +
        "Avoir déjà attendu $m$ épreuves ne change rien pour la suite : le hasard « n'a pas de mémoire ». On admet que la loi géométrique est la seule loi discrète qui a cette propriété (caractérisation).",
      exemple: {
        enonce: "Le six n'est pas sorti lors des $10$ premiers lancers. Quelle est la probabilité qu'il ne sorte pas non plus lors des $3$ suivants ?",
        solution: "Absence de mémoire : $P_{X > 10}(X > 13) = P(X > 3) = \\left(\\dfrac{5}{6}\\right)^3 \\approx 0{,}579$."
      }
    },
    {
      titre: "Crues et période de retour",
      figure: "tlg-crue",
      texte:
        "Une crue est dite **centennale** si elle a, chaque année, la probabilité $\\dfrac{1}{100}$ de se produire. L'année $X$ de la prochaine crue suit une loi géométrique de paramètre $0{,}01$, et $E(X) = 100$ ans : c'est la **période de retour**.\n\n" +
        "Mais attention, c'est une moyenne :\n\n" +
        "- probabilité d'au moins une crue centennale en $100$ ans : $1 - 0{,}99^{100} \\approx 0{,}63$ (pas $1$) ;\n" +
        "- en $30$ ans (durée d'un crédit immobilier) : $1 - 0{,}99^{30} \\approx 0{,}26$, ce qui n'est pas négligeable pour construire près d'une ravine à Mayotte.",
      exemple: {
        enonce: "Pour une crue décennale, quelle est la probabilité d'au moins une crue en $10$ ans ?",
        solution: "$1 - 0{,}9^{10} \\approx 0{,}65$."
      }
    },
    {
      titre: "Seuil : combien d'essais pour être presque sûr ?",
      texte:
        "On cherche le plus petit $n$ tel que $P(X \\leqslant n) \\geqslant 0{,}95$ :\n\n" +
        "$1 - (1 - p)^n \\geqslant 0{,}95 \\iff (1 - p)^n \\leqslant 0{,}05 \\iff n\\ln(1 - p) \\leqslant \\ln 0{,}05 \\iff n \\geqslant \\dfrac{\\ln 0{,}05}{\\ln(1 - p)}$,\n\n" +
        "en changeant le sens car $\\ln(1 - p) < 0$ (méthode du chapitre 8).",
      exemple: {
        enonce: "Combien de lancers de dé faut-il pour avoir au moins $95\\,\\%$ de chances d'obtenir un six ?",
        solution: "$n \\geqslant \\dfrac{\\ln 0{,}05}{\\ln(5/6)} \\approx 16{,}4$ : il faut $17$ lancers."
      }
    },
    {
      titre: "Python : simuler une loi géométrique",
      texte:
        "```python\nfrom random import random\n\ndef attente(p):\n    n = 1\n    while random() >= p:\n        n = n + 1\n    return n\n\ndef moyenne(p, N):\n    s = 0\n    for i in range(N):\n        s = s + attente(p)\n    return s / N\n```\n\n" +
        "random() < p simule un succès. attente(p) renvoie le rang du premier succès. Pour $N$ grand, moyenne(p, N) se rapproche de $\\dfrac{1}{p}$ (loi des grands nombres).",
      exemple: {
        enonce: "Que donne environ moyenne(0.1, 100000) ?",
        solution: "Environ $\\dfrac{1}{0{,}1} = 10$ (la valeur exacte change à chaque exécution)."
      }
    }
  ],

  videos: [
    { titre: "Calculer avec une loi géométrique", type: "Calcul", youtube: "https://youtu.be/hg7V5cj2QYE" },
    { titre: "Ton prof : loi géométrique et absence de mémoire (cours 4/4)", type: "Cours", youtube: "https://youtu.be/Lp19Rs3SHRs" }
  ],
  videosNote: "Vidéo d'Yvan Monka et vidéo de ton prof (le cours complet de la loi géométrique est aussi dans le chapitre 2).",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "ld-geometrique", titre: "Rappel : loi géométrique", etape: "Temps d'attente", nb: 4 },
    { type: "tlg-attente", titre: "P(X = k), P(X > n), P(X ⩽ n)", etape: "Temps d'attente", nb: 5 },
    { type: "tlg-esperance", titre: "Espérance et période de retour", etape: "Temps d'attente", nb: 4 },
    { type: "tlg-memoire", titre: "Absence de mémoire", etape: "Absence de mémoire", nb: 4 },
    { type: "ld-sans-memoire", titre: "Absence de mémoire (chapitre 2)", etape: "Absence de mémoire", nb: 3 },
    { type: "tlg-crue", titre: "Crues : au moins une en n ans", etape: "Modéliser", nb: 4 },
    { type: "tlg-seuil", titre: "Seuil avec le logarithme", etape: "Modéliser", nb: 4 },
    { type: "tlg-python", titre: "Python : simulation", etape: "Raisonner", nb: 3 },
    { type: "tlg-logique", titre: "Vrai ou faux sur l'attente", etape: "Raisonner", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$X$ géométrique de paramètre $p$. $P(X = k) =$", choix: ["$(1 - p)^{k-1}p$", "$p^k$", "$(1 - p)^k$", "$kp$"], bonne: 0, explication: "$k - 1$ échecs puis un succès." },
    { question: "$P(X > n) =$", choix: ["$(1 - p)^n$", "$1 - p^n$", "$p^n$", "$np$"], bonne: 0, explication: "$n$ échecs de suite." },
    { question: "$E(X) =$", choix: ["$\\dfrac{1}{p}$", "$p$", "$1 - p$", "$\\dfrac{1 - p}{p^2}$"], bonne: 0, explication: "Espérance admise." },
    { question: "Un dé, on attend le six. En moyenne, il faut :", choix: ["$6$ lancers", "$3{,}5$ lancers", "$1$ lancer", "$36$ lancers"], bonne: 0, explication: "$\\dfrac{1}{1/6}$." },
    { question: "$p = 0{,}5$. $P(X = 3) =$", choix: ["$0{,}125$", "$0{,}5$", "$0{,}25$", "$0{,}375$"], bonne: 0, explication: "$0{,}5^2 \\times 0{,}5$." },
    { question: "$p = 0{,}5$. $P(X > 3) =$", choix: ["$0{,}125$", "$0{,}875$", "$0{,}5$", "$0{,}25$"], bonne: 0, explication: "$0{,}5^3$." },
    { question: "$P(X \\leqslant n) =$", choix: ["$1 - (1 - p)^n$", "$(1 - p)^n$", "$np$", "$p^n$"], bonne: 0, explication: "Événement contraire de $X > n$." },
    { question: "Absence de mémoire : $P_{X > m}(X > m + n) =$", choix: ["$P(X > n)$", "$P(X > m + n)$", "$P(X > m)$", "$0$"], bonne: 0, explication: "Le passé ne compte pas." },
    { question: "Le six n'est pas sorti en $20$ lancers. Au $21$e lancer, la probabilité d'un six est :", choix: ["$\\dfrac{1}{6}$", "plus grande", "plus petite", "$\\dfrac{21}{6}$"], bonne: 0, explication: "Lancers indépendants." },
    { question: "Une crue centennale a chaque année la probabilité :", choix: ["$0{,}01$", "$0{,}1$", "$1$", "$100$"], bonne: 0, explication: "$\\dfrac{1}{100}$." },
    { question: "La période de retour d'une crue de probabilité annuelle $0{,}02$ est :", choix: ["$50$ ans", "$2$ ans", "$20$ ans", "$98$ ans"], bonne: 0, explication: "$\\dfrac{1}{0{,}02} = 50$." },
    { question: "En $100$ ans, la probabilité d'au moins une crue centennale vaut environ :", choix: ["$0{,}63$", "$1$", "$0{,}01$", "$0{,}5$"], bonne: 0, explication: "$1 - 0{,}99^{100}$." },
    { question: "Une crue centennale vient d'avoir lieu. Une autre l'an prochain est :", choix: ["possible, avec la probabilité $0{,}01$", "impossible avant $100$ ans", "certaine", "plus probable"], bonne: 0, explication: "Absence de mémoire." },
    { question: "Pour résoudre $(1 - p)^n \\leqslant 0{,}05$, on utilise :", choix: ["le logarithme", "le théorème de Pythagore", "la dérivée seconde", "la formule de Bayes"], bonne: 0, explication: "$n\\ln(1 - p) \\leqslant \\ln 0{,}05$." },
    { question: "En divisant par $\\ln(1 - p)$ avec $0 < p < 1$ :", choix: ["on change le sens de l'inégalité", "on garde le sens", "on ne peut pas", "on obtient $n = 0$"], bonne: 0, explication: "$\\ln(1 - p) < 0$." },
    { question: "Dans attente(p), la condition random() >= p simule :", choix: ["un échec", "un succès", "la fin", "la moyenne"], bonne: 0, explication: "Succès : random() < p." },
    { question: "moyenne(0.25, 100000) donne environ :", choix: ["$4$", "$0{,}25$", "$25$", "$0{,}75$"], bonne: 0, explication: "$\\dfrac{1}{0{,}25}$." },
    { question: "Plus $p$ est petit :", choix: ["plus l'attente moyenne est longue", "plus l'attente moyenne est courte", "plus $P(X = 1)$ est grand", "rien ne change"], bonne: 0, explication: "$E(X) = \\dfrac{1}{p}$." },
    { question: "Les bâtons de la loi géométrique :", choix: ["diminuent", "augmentent", "sont tous égaux", "forment une cloche"], bonne: 0, explication: "Ils sont multipliés par $1 - p$ à chaque rang." },
    { question: "$P(X = 1) =$", choix: ["$p$", "$1 - p$", "$1$", "$0$"], bonne: 0, explication: "Succès dès la première épreuve." },
    { question: "Nombre de lancers pour avoir au moins $95\\,\\%$ de chances d'un six :", choix: ["$17$", "$6$", "$10$", "$95$"], bonne: 0, explication: "$n \\geqslant \\dfrac{\\ln 0{,}05}{\\ln(5/6)} \\approx 16{,}4$." },
    { question: "La loi géométrique est la seule loi discrète :", choix: ["sans mémoire", "symétrique", "d'espérance $1$", "bornée"], bonne: 0, explication: "Caractérisation admise." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Reconnaître et utiliser une loi géométrique",
      etapes: ["Repérer des épreuves de Bernoulli identiques et indépendantes, répétées jusqu'au premier succès.", "$X$ = rang du premier succès : $P(X = k) = (1 - p)^{k-1}p$, $P(X > n) = (1 - p)^n$.", "Espérance : $\\dfrac{1}{p}$, à interpréter comme une moyenne."],
      exemple: "Dé et six : $P(X > 3) = \\left(\\dfrac{5}{6}\\right)^3$, $E(X) = 6$."
    },
    {
      titre: "« Au moins une fois en n essais »",
      etapes: ["Passer par le contraire : aucune réussite en $n$ essais.", "$P(\\text{aucune}) = (1 - p)^n$.", "Conclure : $1 - (1 - p)^n$."],
      exemple: "Crue décennale en $10$ ans : $1 - 0{,}9^{10} \\approx 0{,}65$."
    },
    {
      titre: "Seuil avec le logarithme",
      etapes: ["Écrire $(1 - p)^n \\leqslant$ seuil.", "Appliquer $\\ln$, diviser par $\\ln(1 - p) < 0$ en changeant le sens.", "Prendre le premier entier qui convient."],
      exemple: "$0{,}8^n \\leqslant 0{,}05 \\iff n \\geqslant 13{,}4$ : $n = 14$."
    }
  ],
  erreurs: [
    "Confondre $P(X = k) = (1 - p)^{k-1}p$ et $(1 - p)^k$.",
    "Croire qu'une crue de période de retour $100$ ans arrive forcément dans $100$ ans.",
    "Penser qu'après une longue série d'échecs, le succès devient plus probable.",
    "Multiplier $n \\times p$ pour « au moins une fois en $n$ essais » au lieu de $1 - (1 - p)^n$.",
    "Oublier de changer le sens de l'inégalité en divisant par $\\ln(1 - p)$.",
    "Écrire $E(X) = p$ au lieu de $\\dfrac{1}{p}$."
  ]
};
