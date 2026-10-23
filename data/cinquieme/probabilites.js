/*
  CHAPITRE : 5e — Probabilités
  -----------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026, partie
  « Probabilités » : aborder les questions relatives au hasard ; vocabulaire (expérience aléatoire, issue,
  évènement) ; attribuer des probabilités dans des cas simples d'équiprobabilité ; répéter une expérience
  aléatoire et enregistrer les résultats dans un tableau d'effectifs et de fréquences. Automatismes : échelle de
  probabilité, probabilité sous forme de fraction, décimale ou pourcentage, « une chance sur quatre ».
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-probabilites"] = {
  niveau: "5e",
  numero: 16,
  titre: "Probabilités",
  accroche: "Dés, urnes, roues de loterie : décrire une expérience aléatoire, calculer une probabilité et comparer avec les fréquences observées.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : statistiques et probabilités (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Proba-stat.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : probabilités (Yvan Monka)", url: "https://youtu.be/g9CT15Tz7TI", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Expérience aléatoire, issues, évènements",
      video: { titre: "Vidéo d'Yvan Monka : résoudre un problème lié au hasard", youtube: "https://youtu.be/6EtRH4udcKY" },
      texte:
        "Une **expérience aléatoire** est une expérience dont on connaît tous les résultats possibles, sans pouvoir prévoir lequel se produira : lancer un dé, tirer une boule.\n\n" +
        "- Chaque résultat possible est une **issue** : lancer un dé a $6$ issues.\n" +
        "- Un **évènement** est un ensemble d'issues : « obtenir un nombre pair » est réalisé par $2$, $4$ ou $6$.\n\n" +
        "Un évènement **impossible** n'est jamais réalisé ; un évènement **certain** l'est toujours.",
      exemple: {
        enonce: "On tire une boule dans une urne de $3$ boules rouges et $2$ bleues. Combien y a-t-il d'issues ? L'évènement « tirer une boule verte » est-il possible ?",
        solution: "Il y a $5$ issues (une par boule). Il n'y a pas de boule verte : l'évènement est impossible."
      }
    },
    {
      titre: "Calculer une probabilité",
      video: { titre: "Vidéo d'Yvan Monka : calculs de probabilités très simples", youtube: "https://youtu.be/a9Mb5v7Z4Mw" },
      texte:
        "Quand toutes les issues ont la même chance de se produire (**équiprobabilité** : dé équilibré, boules indiscernables…) :\n\n" +
        "$P(\\text{évènement}) = \\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre total d'issues}}$.\n\n" +
        "Une probabilité est comprise entre $0$ (impossible) et $1$ (certain). Elle peut s'écrire en fraction, en décimal ou en pourcentage : « une chance sur quatre » $= \\dfrac{1}{4} = 0{,}25 = 25\\,\\%$.",
      exemple: {
        enonce: "On lance un dé équilibré. Quelle est la probabilité d'obtenir un multiple de $3$ ?",
        solution: "Issues favorables : $3$ et $6$, soit $2$ issues sur $6$. $P = \\dfrac{2}{6} = \\dfrac{1}{3}$."
      }
    },
    {
      titre: "Fréquences et probabilités",
      texte:
        "Quand on **répète** une expérience, on note les résultats dans un tableau d'effectifs et on calcule les **fréquences**.\n\n" +
        "Sur peu d'essais, la fréquence peut être éloignée de la probabilité. Sur un très grand nombre d'essais, elle **s'en rapproche**.\n\n" +
        "Le hasard n'a pas de mémoire : après trois « 6 », la probabilité d'obtenir encore $6$ reste $\\dfrac{1}{6}$.",
      exemple: {
        enonce: "Sur $200$ lancers d'une pièce, on obtient $94$ fois pile. Quelle est la fréquence de pile ? Est-ce étonnant ?",
        solution: "$94 \\div 200 = 0{,}47$. C'est proche de la probabilité $0{,}5$ : ce n'est pas étonnant."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "pb5-vocab", titre: "Vocabulaire et échelle de probabilité", etape: "Le hasard", nb: 6 },
    { type: "pb5-calcul", titre: "Calculer une probabilité", etape: "Probabilités", nb: 6 },
    { type: "pb5-frequences", titre: "Fréquences et probabilités", etape: "Expériences répétées", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Lancer un dé à six faces a :", choix: ["$6$ issues", "$1$ issue", "$2$ issues", "$36$ issues"], bonne: 0, explication: "Une issue par face." },
    { question: "« Obtenir 8 avec un dé à six faces » est un évènement :", choix: ["impossible", "certain", "peu probable", "équiprobable"], bonne: 0, explication: "Aucune face ne porte 8." },
    { question: "La probabilité d'un évènement certain est :", choix: ["$1$", "$0$", "$100$", "$\\dfrac{1}{2}$"], bonne: 0, explication: "Il se produit toujours." },
    { question: "La probabilité d'obtenir pile avec une pièce équilibrée est :", choix: ["$\\dfrac{1}{2}$", "$1$", "$\\dfrac{1}{3}$", "$2$"], bonne: 0, explication: "Une chance sur deux." },
    { question: "Avec un dé équilibré, la probabilité d'obtenir un nombre pair est :", choix: ["$\\dfrac{1}{2}$", "$\\dfrac{1}{6}$", "$\\dfrac{2}{6}$", "$\\dfrac{4}{6}$"], bonne: 0, explication: "$3$ issues sur $6$." },
    { question: "Une urne contient $3$ boules rouges et $7$ noires. La probabilité de tirer une rouge est :", choix: ["$\\dfrac{3}{10}$", "$\\dfrac{3}{7}$", "$\\dfrac{7}{10}$", "$3$"], bonne: 0, explication: "$3$ favorables sur $10$." },
    { question: "« Une chance sur cinq » correspond à :", choix: ["$20\\,\\%$", "$5\\,\\%$", "$50\\,\\%$", "$15\\,\\%$"], bonne: 0, explication: "$\\dfrac{1}{5} = 0{,}2$." },
    { question: "Une probabilité de $0{,}75$ s'écrit aussi :", choix: ["$\\dfrac{3}{4}$", "$\\dfrac{7}{5}$", "$\\dfrac{1}{75}$", "$7{,}5\\,\\%$"], bonne: 0, explication: "$0{,}75 = 75\\,\\%$." },
    { question: "Une probabilité peut-elle valoir $1{,}2$ ?", choix: ["Non, elle est comprise entre $0$ et $1$", "Oui, si l'évènement est très probable", "Oui, toujours", "Seulement pour un dé"], bonne: 0, explication: "Une probabilité ne dépasse jamais $1$." },
    { question: "On lance un dé $600$ fois. Le $2$ sortira environ :", choix: ["$100$ fois", "$200$ fois", "$300$ fois", "$600$ fois"], bonne: 0, explication: "Un sixième de $600$." },
    { question: "Sur $50$ lancers, une pièce donne $28$ fois face. La fréquence de face est :", choix: ["$0{,}56$", "$0{,}28$", "$28$", "$0{,}5$"], bonne: 0, explication: "$28 \\div 50$." },
    { question: "Après trois « pile » de suite, la probabilité d'avoir pile au lancer suivant est :", choix: ["$\\dfrac{1}{2}$", "plus petite que $\\dfrac{1}{2}$", "plus grande que $\\dfrac{1}{2}$", "$0$"], bonne: 0, explication: "La pièce n'a pas de mémoire." },
    { question: "Avec un très grand nombre de lancers, la fréquence d'un évènement :", choix: ["se rapproche de sa probabilité", "vaut toujours $0$", "s'éloigne de la probabilité", "vaut toujours $1$"], bonne: 0, explication: "Loi des grands nombres." },
    { question: "On tire une lettre du mot LAGON. La probabilité de tirer une voyelle est :", choix: ["$\\dfrac{2}{5}$", "$\\dfrac{3}{5}$", "$\\dfrac{1}{5}$", "$\\dfrac{2}{3}$"], bonne: 0, explication: "A et O : $2$ voyelles sur $5$ lettres." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer une probabilité",
      etapes: [
        "Vérifie que les issues sont équiprobables (dé équilibré, boules indiscernables…).",
        "Compte toutes les issues, puis les issues favorables.",
        "Probabilité $=$ favorables $\\div$ total ; simplifie la fraction si possible."
      ],
      exemple: "$4$ boules vertes sur $10$ : $\\dfrac{4}{10} = \\dfrac{2}{5}$."
    },
    {
      titre: "Changer d'écriture",
      etapes: [
        "Fraction → décimal : divise le numérateur par le dénominateur.",
        "Décimal → pourcentage : multiplie par $100$.",
        "« $a$ chances sur $b$ » $= \\dfrac{a}{b}$."
      ],
      exemple: "$\\dfrac{3}{4} = 0{,}75 = 75\\,\\%$."
    },
    {
      titre: "Comparer fréquence et probabilité",
      etapes: [
        "Calcule la fréquence observée : effectif $\\div$ nombre d'essais.",
        "Compare-la à la probabilité théorique.",
        "Plus il y a d'essais, plus elles doivent être proches."
      ],
      exemple: "$510$ piles sur $1\\,000$ lancers : $0{,}51$, proche de $0{,}5$."
    }
  ],
  erreurs: [
    "Diviser par le nombre d'issues défavorables au lieu du nombre total d'issues.",
    "Oublier de compter les objets identiques (deux boules rouges sont deux issues).",
    "Donner une probabilité plus grande que $1$.",
    "Confondre fréquence observée et probabilité.",
    "Croire qu'un résultat est « dû » après une série : le hasard n'a pas de mémoire."
  ]
};
