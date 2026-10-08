/*
  CHAPITRE : Terminale maths complémentaires — Échantillonnage et synthèse
  ------------------------------------------------------------------------
  Chapitre 15 de la progression spiralée 2026-2027 (programme de maths complémentaires de 2019, thème d'étude).
  Échantillons de taille n, série des moyennes, écart type à comparer à σ/√n ; sondages, fourchette, biais ;
  Python : proportion des écarts ⩽ kσ/√n (k = 2 ou 3) ; sondage sur la vaccination au lycée ; préparation du Grand oral.
  Figure : "tec-moyennes". Générateurs : tec- (et sm-intervalle, sm-taille du chapitre « Échantillons » de Première).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-echantillonnage"] = {
  niveau: "Terminale maths complémentaires",
  numero: 15,
  titre: "Échantillonnage et synthèse",
  accroche: "Ce que dit un échantillon : moyennes d'échantillons et écart type σ/√n, sondages, fourchette et biais, un sondage sur la vaccination au lycée, puis des problèmes de synthèse pour préparer le Grand oral.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Échantillons et série des moyennes",
      figure: "tec-moyennes",
      video: { titre: "Vidéo d'Yvan Monka : simuler une expérience avec Python (rappel)", youtube: "https://youtu.be/EXEcSJE31QY" },
      texte:
        "Un **échantillon de taille $n$** d'une variable aléatoire $X$, c'est $n$ valeurs obtenues en répétant l'expérience de façon indépendante. Sa moyenne $M_n$ change d'un échantillon à l'autre : c'est la **fluctuation d'échantillonnage**.\n\n" +
        "Si $X$ a pour espérance $\\mu$ et écart type $\\sigma$, on observe (et on admet) que la série des moyennes :\n\n" +
        "- est centrée autour de $\\mu$ ;\n" +
        "- a un écart type proche de $\\dfrac{\\sigma}{\\sqrt{n}}$ : plus $n$ est grand, moins les moyennes sont dispersées.\n\n" +
        "La figure montre $40$ moyennes d'échantillons de $25$ temps d'attente de la barge (loi uniforme sur $[0\\,;30]$, $\\mu = 15$, $\\sigma \\approx 8{,}66$) : $38$ sur $40$ sont entre $\\mu - 2\\dfrac{\\sigma}{\\sqrt{n}}$ et $\\mu + 2\\dfrac{\\sigma}{\\sqrt{n}}$.",
      exemple: {
        enonce: "Avec $\\sigma \\approx 8{,}66$ et $n = 25$, calcule $\\dfrac{\\sigma}{\\sqrt{n}}$.",
        solution: "$\\dfrac{8{,}66}{5} \\approx 1{,}73$ : une attente individuelle varie beaucoup, la moyenne sur $25$ traversées très peu."
      }
    },
    {
      titre: "Les repères 68 %, 95 %, 99,7 %",
      video: { titre: "Vidéo d'Yvan Monka : loi des grands nombres (rappel)", youtube: "https://youtu.be/mFwXs_EMYes" },
      texte:
        "Pour $n$ assez grand, en simulant un grand nombre d'échantillons, on constate que la proportion des moyennes $M_n$ telles que $|M_n - \\mu| \\leqslant k\\dfrac{\\sigma}{\\sqrt{n}}$ est environ :\n\n" +
        "- $68\\,\\%$ pour $k = 1$ ;\n" +
        "- $95\\,\\%$ pour $k = 2$ ;\n" +
        "- $99{,}7\\,\\%$ pour $k = 3$.\n\n" +
        "Ces repères viennent de la loi normale (« courbe en cloche »), que tu rencontreras après le bac.",
      exemple: {
        enonce: "$\\mu = 50$, $\\sigma = 10$, $n = 100$. Dans quel intervalle se trouvent environ $95\\,\\%$ des moyennes ?",
        solution: "$\\dfrac{\\sigma}{\\sqrt{n}} = 1$, donc $[50 - 2\\,;50 + 2] = [48\\,;52]$."
      }
    },
    {
      titre: "Python : vérifier par simulation",
      texte:
        "```python\nfrom random import random\nfrom math import sqrt\n\nmu = 15\nsigma = 30 / sqrt(12)\n\ndef moyenneEch(n):\n    s = 0\n    for i in range(n):\n        s = s + 30 * random()\n    return s / n\n\ndef proportion(N, n, k):\n    c = 0\n    for i in range(N):\n        m = moyenneEch(n)\n        if abs(m - mu) <= k * sigma / sqrt(n):\n            c = c + 1\n    return c / N\n```\n\n" +
        "moyenneEch(n) simule $n$ attentes de la barge (loi uniforme sur $[0\\,;30]$) et renvoie leur moyenne. proportion(1000, 25, 2) renvoie une valeur proche de $0{,}95$.",
      exemple: {
        enonce: "Que renvoie environ proportion(1000, 25, 3) ?",
        solution: "Environ $0{,}997$ : presque toutes les moyennes sont à moins de $3\\dfrac{\\sigma}{\\sqrt{n}}$ de $15$."
      }
    },
    {
      titre: "Sondages et fourchette",
      texte:
        "On veut connaître une proportion $p$ inconnue dans une population (part d'élèves vaccinés, d'électeurs…). On interroge un échantillon de $n$ personnes tirées au hasard et on calcule la fréquence $f$ observée.\n\n" +
        "La **fourchette** au niveau de confiance $95\\,\\%$ est $\\left[f - \\dfrac{1}{\\sqrt{n}}\\,;f + \\dfrac{1}{\\sqrt{n}}\\right]$ (pour $n \\geqslant 25$ et $f$ entre $0{,}2$ et $0{,}8$).\n\n" +
        "- Elle contient $p$ dans environ $95\\,\\%$ des sondages, pas dans tous.\n" +
        "- Son amplitude $\\dfrac{2}{\\sqrt{n}}$ ne dépend que de $n$ : pour être deux fois plus précis, il faut $4$ fois plus de personnes.\n\n" +
        "Lien avec le cours : une fréquence est la moyenne d'une variable de Bernoulli, d'écart type $\\sqrt{p(1 - p)} \\leqslant 0{,}5$, donc $2\\dfrac{\\sigma}{\\sqrt{n}} \\leqslant \\dfrac{1}{\\sqrt{n}}$.",
      exemple: {
        enonce: "Sondage sur la vaccination au lycée : $244$ élèves à jour sur $400$ interrogés au hasard. Donne la fourchette.",
        solution: "$f = 0{,}61$ et $\\dfrac{1}{\\sqrt{400}} = 0{,}05$ : $[0{,}56\\,;0{,}66]$. Entre $56\\,\\%$ et $66\\,\\%$ des élèves sont à jour (niveau de confiance $95\\,\\%$)."
      }
    },
    {
      titre: "Biais : quand l'échantillon ment",
      texte:
        "Un **biais** apparaît quand l'échantillon n'est pas tiré au hasard dans toute la population :\n\n" +
        "- **biais de sélection** : interroger les élèves présents à l'infirmerie pour estimer la part de vaccinés ;\n" +
        "- **biais de réponse** : une question orientée (« Tu es bien à jour de tes vaccins, j'espère ? ») ou gênante ;\n" +
        "- **non-réponse** : seuls ceux qui ont un avis tranché répondent.\n\n" +
        "Un échantillon biaisé reste faux, **même très grand** : la taille réduit la fluctuation, pas le biais. Avant tout calcul, on vérifie la méthode de tirage.",
      exemple: {
        enonce: "Un questionnaire sur le temps passé sur les réseaux sociaux est publié sur Instagram. Quel est le problème ?",
        solution: "Seuls les utilisateurs d'Instagram répondent : c'est un biais de sélection, la fourchette calculée n'a pas de sens pour tous les élèves."
      }
    },
    {
      titre: "Synthèse et Grand oral",
      texte:
        "Ce dernier chapitre relie toute l'année. Quelques idées de questions pour le **Grand oral**, chacune mobilisant plusieurs chapitres :\n\n" +
        "- « Combien de temps attend-on vraiment la barge ? » : loi uniforme (ch. 13), moyennes d'échantillons (ch. 15).\n" +
        "- « Mayotte est-elle plus inégalitaire que la métropole ? » : déciles, Lorenz, Gini (ch. 14), intégrales (ch. 12).\n" +
        "- « Un test de dépistage positif veut-il dire qu'on est malade ? » : Bayes (ch. 5).\n" +
        "- « Comment date-t-on un objet ancien ? » : loi exponentielle, demi-vie, $y' = -\\lambda y$ (ch. 11 et 13).\n" +
        "- « La population de Mayotte peut-elle croître indéfiniment ? » : suites, Malthus et Verhulst (ch. 1, 3 et 11).\n\n" +
        "**Conseils** : une question qui t'intéresse vraiment, un exemple chiffré simple, un schéma clair (une courbe, un arbre), et une phrase de conclusion qui répond à la question.",
      exemple: {
        enonce: "Pour la question sur la barge, quel calcul simple peut-on présenter ?",
        solution: "Attente moyenne $\\dfrac{0 + 30}{2} = 15$ min, et sur $25$ traversées un écart type de la moyenne d'environ $\\dfrac{8{,}66}{5} \\approx 1{,}7$ min : l'attente moyenne est très prévisible."
      }
    }
  ],

  videos: [
    { titre: "Simuler une expérience avec Python (rappel)", type: "Python", youtube: "https://youtu.be/EXEcSJE31QY" },
    { titre: "Estimer une probabilité : loi des grands nombres (rappel)", type: "Cours", youtube: "https://youtu.be/mFwXs_EMYes" }
  ],
  videosNote: "Deux rappels d'Yvan Monka. Le chapitre « Échantillons » de Première reprend aussi la simulation et l'écart 2σ/√n.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "tec-ecart-type", titre: "Écart type des moyennes σ/√n", etape: "Échantillons", nb: 4 },
    { type: "tec-intervalle", titre: "Intervalle μ ± kσ/√n", etape: "Échantillons", nb: 4 },
    { type: "sm-intervalle", titre: "Rappel de Première : l'écart 2σ/√n", etape: "Échantillons", nb: 3 },
    { type: "tec-python", titre: "Python : proportion des écarts", etape: "Échantillons", nb: 3 },
    { type: "tec-fourchette", titre: "Sondage et fourchette", etape: "Sondages", nb: 4 },
    { type: "tec-taille", titre: "Taille de l'échantillon", etape: "Sondages", nb: 4 },
    { type: "tec-biais", titre: "Repérer un biais", etape: "Sondages", nb: 4 },
    { type: "tec-synthese", titre: "Problèmes de synthèse", etape: "Synthèse", nb: 4 },
    { type: "tec-logique", titre: "Vrai ou faux", etape: "Synthèse", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "L'écart type de la série des moyennes d'échantillons de taille $n$ est environ :", choix: ["$\\dfrac{\\sigma}{\\sqrt{n}}$", "$\\dfrac{\\sigma}{n}$", "$\\sigma\\sqrt{n}$", "$\\sigma$"], bonne: 0, explication: "Il diminue comme $\\dfrac{1}{\\sqrt{n}}$." },
    { question: "$\\sigma = 20$ et $n = 100$. L'écart type des moyennes vaut environ :", choix: ["$2$", "$0{,}2$", "$20$", "$200$"], bonne: 0, explication: "$\\dfrac{20}{10}$." },
    { question: "Pour diviser par $3$ l'écart type des moyennes, on multiplie $n$ par :", choix: ["$9$", "$3$", "$\\sqrt{3}$", "$6$"], bonne: 0, explication: "$\\sqrt{9} = 3$." },
    { question: "Environ $95\\,\\%$ des moyennes sont à moins de ... de $\\mu$ :", choix: ["$2\\dfrac{\\sigma}{\\sqrt{n}}$", "$\\dfrac{\\sigma}{\\sqrt{n}}$", "$2\\sigma$", "$\\dfrac{2}{n}$"], bonne: 0, explication: "Repère $k = 2$." },
    { question: "Avec $k = 3$, la proportion des moyennes à moins de $k\\dfrac{\\sigma}{\\sqrt{n}}$ de $\\mu$ est environ :", choix: ["$99{,}7\\,\\%$", "$95\\,\\%$", "$68\\,\\%$", "$100\\,\\%$"], bonne: 0, explication: "Repère $k = 3$." },
    { question: "Fourchette au niveau $95\\,\\%$ pour une fréquence $f$ observée sur $n$ personnes :", choix: ["$\\left[f - \\dfrac{1}{\\sqrt{n}}\\,;f + \\dfrac{1}{\\sqrt{n}}\\right]$", "$\\left[f - \\dfrac{1}{n}\\,;f + \\dfrac{1}{n}\\right]$", "$[f - 0{,}05\\,;f + 0{,}05]$", "$[0\\,;f]$"], bonne: 0, explication: "Amplitude $\\dfrac{2}{\\sqrt{n}}$." },
    { question: "$f = 0{,}4$ et $n = 100$. La fourchette est :", choix: ["$[0{,}3\\,;0{,}5]$", "$[0{,}39\\,;0{,}41]$", "$[0{,}2\\,;0{,}6]$", "$[0{,}35\\,;0{,}45]$"], bonne: 0, explication: "$\\dfrac{1}{\\sqrt{100}} = 0{,}1$." },
    { question: "Pour une fourchette d'amplitude $0{,}1$, il faut interroger au moins :", choix: ["$400$ personnes", "$100$ personnes", "$20$ personnes", "$1\\,000$ personnes"], bonne: 0, explication: "$\\dfrac{2}{\\sqrt{n}} \\leqslant 0{,}1 \\iff n \\geqslant 400$." },
    { question: "La fourchette contient la vraie proportion :", choix: ["dans environ $95\\,\\%$ des sondages", "toujours", "jamais", "dans $50\\,\\%$ des sondages"], bonne: 0, explication: "Niveau de confiance." },
    { question: "Interroger les élèves de l'infirmerie pour estimer la part de vaccinés, c'est :", choix: ["un échantillon biaisé", "un bon échantillon", "un échantillon trop petit", "une fourchette"], bonne: 0, explication: "Biais de sélection." },
    { question: "Un très grand échantillon biaisé donne :", choix: ["une estimation précise mais fausse", "une estimation juste", "une fourchette plus large", "aucun résultat"], bonne: 0, explication: "La taille ne corrige pas un biais." },
    { question: "Deux sondages sérieux de même taille donnent des fréquences un peu différentes. C'est :", choix: ["la fluctuation d'échantillonnage", "une erreur de calcul", "un biais", "impossible"], bonne: 0, explication: "Le hasard du tirage." },
    { question: "Pour une variable de Bernoulli de paramètre $p$, $\\sigma =$", choix: ["$\\sqrt{p(1 - p)}$", "$p(1 - p)$", "$\\sqrt{p}$", "$1 - p$"], bonne: 0, explication: "$V = p(1 - p)$." },
    { question: "Le temps d'attente de la barge (uniforme sur $[0\\,;30]$) a pour espérance :", choix: ["$15$ min", "$30$ min", "$10$ min", "$7{,}5$ min"], bonne: 0, explication: "Milieu de l'intervalle." },
    { question: "La moyenne d'un échantillon de taille $n$ est une bonne estimation de $\\mu$ quand :", choix: ["$n$ est grand et le tirage au hasard", "$n$ est petit", "on choisit les valeurs", "$\\sigma$ est grand"], bonne: 0, explication: "Loi des grands nombres, sans biais." },
    { question: "Dans proportion(N, n, k), la condition abs(m - mu) <= k * sigma / sqrt(n) teste :", choix: ["si la moyenne est proche de l'espérance", "si l'échantillon est biaisé", "si $n$ est assez grand", "si la variance est nulle"], bonne: 0, explication: "Écart à $\\mu$ comparé à $k\\dfrac{\\sigma}{\\sqrt{n}}$." },
    { question: "$\\mu = 50$, $\\sigma = 10$, $n = 100$. Environ $95\\,\\%$ des moyennes sont dans :", choix: ["$[48\\,;52]$", "$[30\\,;70]$", "$[40\\,;60]$", "$[49\\,;51]$"], bonne: 0, explication: "$2 \\times \\dfrac{10}{10} = 2$." },
    { question: "$f = 0{,}61$ sur $400$ élèves. La fourchette est :", choix: ["$[0{,}56\\,;0{,}66]$", "$[0{,}6\\,;0{,}62]$", "$[0{,}51\\,;0{,}71]$", "$[0{,}59\\,;0{,}63]$"], bonne: 0, explication: "$\\dfrac{1}{\\sqrt{400}} = 0{,}05$." },
    { question: "Une question « Tu es bien à jour de tes vaccins, j'espère ? » crée :", choix: ["un biais de réponse", "un biais de sélection", "une fluctuation", "aucun problème"], bonne: 0, explication: "La formulation oriente la réponse." },
    { question: "Quand $n$ est multiplié par $100$, l'amplitude de la fourchette est :", choix: ["divisée par $10$", "divisée par $100$", "multipliée par $10$", "inchangée"], bonne: 0, explication: "$\\sqrt{100} = 10$." },
    { question: "La fluctuation d'échantillonnage diminue quand :", choix: ["la taille de l'échantillon augmente", "on choisit les personnes", "la population augmente", "on arrondit"], bonne: 0, explication: "Écart type $\\dfrac{\\sigma}{\\sqrt{n}}$." },
    { question: "Pour le Grand oral, une bonne question de mathématiques :", choix: ["s'appuie sur un exemple chiffré et une conclusion claire", "récite tout le cours", "évite les schémas", "n'a pas de conclusion"], bonne: 0, explication: "Une question, un exemple, un schéma, une réponse." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Étudier la fluctuation des moyennes",
      etapes: ["Identifier $\\mu$ et $\\sigma$ de la variable $X$.", "Calculer $\\dfrac{\\sigma}{\\sqrt{n}}$ pour la taille $n$ des échantillons.", "Environ $95\\,\\%$ des moyennes sont dans $\\left[\\mu - 2\\dfrac{\\sigma}{\\sqrt{n}}\\,;\\mu + 2\\dfrac{\\sigma}{\\sqrt{n}}\\right]$."],
      exemple: "$\\mu = 15$, $\\sigma \\approx 8{,}66$, $n = 25$ : environ $95\\,\\%$ des moyennes entre $11{,}5$ et $18{,}5$."
    },
    {
      titre: "Exploiter un sondage",
      etapes: ["Vérifier que l'échantillon est tiré au hasard (pas de biais).", "Calculer $f$ et $\\dfrac{1}{\\sqrt{n}}$.", "Donner la fourchette et conclure avec le niveau de confiance $95\\,\\%$."],
      exemple: "$244$ sur $400$ : $[0{,}56\\,;0{,}66]$."
    },
    {
      titre: "Choisir la taille d'un échantillon",
      etapes: ["Écrire la précision voulue : $\\dfrac{2}{\\sqrt{n}} \\leqslant a$ (ou $\\dfrac{\\sigma}{\\sqrt{n}} \\leqslant e$).", "Isoler $\\sqrt{n}$, puis élever au carré.", "Prendre le plus petit entier qui convient."],
      exemple: "Amplitude $0{,}04$ : $\\sqrt{n} \\geqslant 50$, $n \\geqslant 2\\,500$."
    }
  ],
  erreurs: [
    "Diviser par $n$ au lieu de $\\sqrt{n}$.",
    "Croire que doubler l'échantillon divise l'imprécision par $2$.",
    "Penser que la fourchette contient toujours la vraie proportion.",
    "Croire qu'un grand échantillon corrige un biais.",
    "Confondre l'écart type $\\sigma$ d'une valeur et l'écart type $\\dfrac{\\sigma}{\\sqrt{n}}$ d'une moyenne.",
    "Oublier d'écrire la conclusion en contexte (« entre … % et … % des élèves »)."
  ]
};
