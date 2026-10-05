/*
  AUTOMATISMES · CALCUL NUMÉRIQUE (CN01 à CN07)
  ---------------------------------------------
  Liste officielle des automatismes de l'épreuve anticipée de mathématiques (fin de Première).
  CN01 à CN07 viennent du programme de Seconde.
  Mêmes règles d'écriture que les autres chapitres (formules entre $...$, antislash doublé, {,} pour la virgule).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["auto-calcul-numerique"] = {
  niveau: "Automatismes",
  numero: null,
  periode: "Seconde et Première",
  titre: "Calcul numérique",
  accroche: "Comparer, calculer avec des fractions et des puissances, changer d'écriture, estimer et convertir : les réflexes de calcul à avoir sans calculatrice.",

  playlist: "",
  drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv",
  pdfs: [
    { titre: "Dossier élève de Seconde (parties P1 et P2)", url: "https://drive.google.com/file/d/1vr9e5N38rAOQLWIvUR5suK6l6ciyoLNY/view" }
  ],

  cours: [
    {
      titre: "Comparer deux nombres (CN01)",
      video: { titre: "Vidéo de ton prof : comparer deux nombres", youtube: "https://youtu.be/qt6CzZFcV3s" },
      texte:
        "- **Par la différence** : $a - b > 0 \\iff a > b$, et $a - b < 0 \\iff a < b$.\n" +
        "- **Par le quotient**, si $a$ et $b$ sont strictement positifs : $\\dfrac{a}{b} > 1 \\iff a > b$.\n" +
        "- Deux fractions : on les met au **même dénominateur**, puis on compare les numérateurs.\n" +
        "- Deux nombres négatifs : le plus grand est le plus proche de $0$ ($-1{,}45 > -1{,}5$).",
      exemple: {
        enonce: "Comparer $\\dfrac{7}{9}$ et $\\dfrac{4}{5}$.",
        solution: "$\\dfrac{7}{9} - \\dfrac{4}{5} = \\dfrac{35}{45} - \\dfrac{36}{45} = -\\dfrac{1}{45} < 0$, donc $\\dfrac{7}{9} < \\dfrac{4}{5}$."
      }
    },
    {
      titre: "Fractions simples (CN02)",
      texte:
        "- Additionner ou soustraire : on réduit au **même dénominateur**.\n" +
        "- Multiplier : $\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{a \\times c}{b \\times d}$.\n" +
        "- Diviser, c'est multiplier par l'**inverse** : $\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c}$.\n" +
        "- On simplifie le résultat : $\\dfrac{6}{8} = \\dfrac{3}{4}$.",
      video: { titre: "Vidéo d'Yvan Monka : calculer avec des fractions", youtube: "https://youtu.be/Z86gfJOKgBg" },
      exemple: {
        enonce: "Calculer $\\dfrac{2}{3} + \\dfrac{1}{4}$ et $\\dfrac{3}{5} \\div \\dfrac{9}{10}$.",
        solution: "$\\dfrac{8}{12} + \\dfrac{3}{12} = \\dfrac{11}{12}$.\n\n$\\dfrac{3}{5} \\times \\dfrac{10}{9} = \\dfrac{30}{45} = \\dfrac{2}{3}$."
      }
    },
    {
      titre: "Puissances (CN03)",
      video: { titre: "Vidéo de ton prof : puissances et écriture scientifique", youtube: "https://youtu.be/DKvTtv77YIw" },
      texte:
        "- $a^m \\times a^n = a^{m+n}$, $\\dfrac{a^m}{a^n} = a^{m-n}$, $(a^m)^n = a^{mn}$.\n" +
        "- $a^0 = 1$ et $a^{-n} = \\dfrac{1}{a^n}$ (pour $a \\neq 0$).\n" +
        "- Écriture scientifique : $a \\times 10^n$ avec $1 \\leqslant a < 10$. Exemples : $52\\,300 = 5{,}23 \\times 10^4$ et $0{,}0007 = 7 \\times 10^{-4}$.\n" +
        "- Attention : $(-3)^2 = 9$ mais $-3^2 = -9$.",
      exemple: {
        enonce: "Écrire $\\dfrac{10^5 \\times 10^{-2}}{10^4}$ sous la forme $10^n$.",
        solution: "$\\dfrac{10^{5 + (-2)}}{10^4} = \\dfrac{10^3}{10^4} = 10^{3 - 4} = 10^{-1}$."
      }
    },
    {
      titre: "Décimal, fraction, pourcentage (CN04)",
      video: { titre: "Vidéo d'Yvan Monka : passer de la fraction à l'écriture décimale", youtube: "https://youtu.be/n_x3EAigoB0" },
      texte:
        "- Un même nombre a plusieurs écritures : $\\dfrac{3}{4} = 0{,}75 = 75\\,\\%$.\n" +
        "- Fraction → décimal : on divise le numérateur par le dénominateur.\n" +
        "- Décimal → pourcentage : on multiplie par $100$ ($0{,}07 = 7\\,\\%$).\n" +
        "- Pourcentage → décimal : on divise par $100$ ($12{,}5\\,\\% = 0{,}125$).\n" +
        "- À connaître par cœur : $\\dfrac{1}{2} = 50\\,\\%$, $\\dfrac{1}{4} = 25\\,\\%$, $\\dfrac{3}{4} = 75\\,\\%$, $\\dfrac{1}{5} = 20\\,\\%$, $\\dfrac{1}{10} = 10\\,\\%$.",
      exemple: {
        enonce: "Écrire $\\dfrac{3}{8}$ sous forme décimale puis en pourcentage.",
        solution: "$3 \\div 8 = 0{,}375$, soit $37{,}5\\,\\%$."
      }
    },
    {
      titre: "Ordre de grandeur et vraisemblance (CN05, CN06)",
      texte:
        "- Ordre de grandeur : on arrondit chaque nombre à une valeur simple, puis on calcule de tête : $387 \\times 0{,}52 \\approx 400 \\times 0{,}5 = 200$.\n" +
        "- Avant de valider un résultat, on se pose quatre questions : l'**ordre de grandeur** est-il bon ? l'**unité** ? le **signe** ? la valeur a-t-elle du **sens** ?\n" +
        "- Une proportion et une probabilité sont entre $0$ et $1$. Une moyenne est entre la plus petite et la plus grande valeur.",
      exemple: {
        enonce: "Un élève trouve que $2\\,987 \\times 0{,}0198 \\approx 591$. Est-ce plausible ?",
        solution: "$3\\,000 \\times 0{,}02 = 60$ : le bon résultat est proche de $60$. L'élève s'est trompé d'un facteur $10$."
      }
    },
    {
      titre: "Conversions d'unités (CN07)",
      video: { titre: "Vidéo de ton prof : conversions d'unités", youtube: "https://youtu.be/ZmsrIiQvadQ" },
      texte:
        "- Longueurs : $\\times 10$ d'une unité à la suivante. Aires : $\\times 100$. Volumes : $\\times 1\\,000$.\n" +
        "- $1$ dm³ $= 1$ L, $1$ m³ $= 1\\,000$ L, $1$ ha $= 10\\,000$ m².\n" +
        "- Durées : $0{,}25$ h $= 15$ min, $0{,}1$ h $= 6$ min, et $1$ h $30$ min $= 1{,}5$ h.\n" +
        "- Vitesses : $1$ m/s $= 3{,}6$ km/h. De km/h vers m/s, on divise par $3{,}6$.\n" +
        "- Masses : $1$ t $= 1\\,000$ kg, $1$ kg $= 1\\,000$ g.",
      exemple: {
        enonce: "Convertir $72$ km/h en m/s, et $2{,}4$ m² en cm².",
        solution: "$72 \\div 3{,}6 = 20$ m/s.\n\n$2{,}4 \\times 10\\,000 = 24\\,000$ cm²."
      }
    }
  ],

  videos: [],

  exercices: [
    { type: "am-comparer", titre: "CN01 · Comparer deux nombres", etape: "Programme de Seconde", nb: 6 },
    { type: "am-fractions", titre: "CN02 · Calculer avec des fractions", etape: "Programme de Seconde", nb: 6 },
    { type: "am-puissances", titre: "CN03 · Puissances, écriture scientifique", etape: "Programme de Seconde", nb: 6 },
    { type: "am-ecritures", titre: "CN04 · Décimal, fraction, pourcentage", etape: "Programme de Seconde", nb: 6 },
    { type: "am-ordre-grandeur", titre: "CN05 · Ordre de grandeur", etape: "Programme de Seconde", nb: 5 },
    { type: "am-coherence", titre: "CN06 · Ce résultat est-il plausible ?", etape: "Programme de Seconde", nb: 5 },
    { type: "auto-conversions", titre: "CN07 · Conversions d'unités", etape: "Programme de Seconde", nb: 6 },
    { type: "am-flash-cn", titre: "Flash : calcul numérique mélangé", etape: "Défi", nb: 10 }
  ],

  qcm: [
    { question: "CN01 · Quel est le plus grand nombre ?", choix: ["$\\dfrac{2}{3}$", "$0{,}6$", "$\\dfrac{5}{8}$", "$0{,}66$"], bonne: 0, explication: "$\\dfrac{2}{3} \\approx 0{,}667$, $\\dfrac{5}{8} = 0{,}625$ : le plus grand est $\\dfrac{2}{3}$." },
    { question: "CN01 · On compare $-2{,}3$ et $-2{,}25$ :", choix: ["$-2{,}3 > -2{,}25$", "$-2{,}3 < -2{,}25$", "Ils sont égaux"], bonne: 1, explication: "$-2{,}25$ est plus proche de $0$, donc plus grand." },
    { question: "CN02 · $\\dfrac{5}{6} - \\dfrac{1}{3} =$", choix: ["$\\dfrac{4}{3}$", "$\\dfrac{1}{2}$", "$\\dfrac{4}{6}$", "$\\dfrac{1}{6}$"], bonne: 1, explication: "$\\dfrac{5}{6} - \\dfrac{2}{6} = \\dfrac{3}{6} = \\dfrac{1}{2}$." },
    { question: "CN02 · $\\dfrac{2}{3} \\div \\dfrac{4}{9} =$", choix: ["$\\dfrac{8}{27}$", "$\\dfrac{3}{2}$", "$\\dfrac{2}{3}$", "$\\dfrac{6}{12}$"], bonne: 1, explication: "$\\dfrac{2}{3} \\times \\dfrac{9}{4} = \\dfrac{18}{12} = \\dfrac{3}{2}$." },
    { question: "CN03 · $\\dfrac{3^5}{3^7} =$", choix: ["$3^{2}$", "$3^{-2}$", "$1^{-2}$", "$3^{12}$"], bonne: 1, explication: "On soustrait les exposants : $5 - 7 = -2$." },
    { question: "CN03 · L'écriture scientifique de $0{,}00048$ est :", choix: ["$48 \\times 10^{-5}$", "$4{,}8 \\times 10^{-4}$", "$4{,}8 \\times 10^{4}$", "$0{,}48 \\times 10^{-3}$"], bonne: 1, explication: "$1 \\leqslant 4{,}8 < 10$ et la virgule se déplace de $4$ rangs vers la droite." },
    { question: "CN04 · $\\dfrac{7}{20}$ en pourcentage :", choix: ["$7\\,\\%$", "$35\\,\\%$", "$0{,}35\\,\\%$", "$20\\,\\%$"], bonne: 1, explication: "$\\dfrac{7}{20} = \\dfrac{35}{100} = 35\\,\\%$." },
    { question: "CN04 · $2{,}5\\,\\%$ en écriture décimale :", choix: ["$0{,}25$", "$0{,}025$", "$2{,}5$", "$25$"], bonne: 1, explication: "$2{,}5 \\div 100 = 0{,}025$." },
    { question: "CN05 · Un ordre de grandeur de $49{,}8 \\times 0{,}21$ est :", choix: ["$1$", "$10$", "$100$", "$1\\,000$"], bonne: 1, explication: "$50 \\times 0{,}2 = 10$." },
    { question: "CN06 · Une élève trouve qu'un sac de riz pèse $250$ kg. C'est sûrement :", choix: ["plausible", "une erreur d'unité ou de calcul"], bonne: 1, explication: "Un sac de riz courant pèse quelques kilogrammes ($5$ kg, $25$ kg) : $250$ kg n'est pas vraisemblable." },
    { question: "CN07 · $3$ h $45$ min $=$", choix: ["$3{,}45$ h", "$3{,}75$ h", "$3{,}4$ h", "$345$ min"], bonne: 1, explication: "$45$ min $= \\dfrac{45}{60}$ h $= 0{,}75$ h." },
    { question: "CN07 · $1{,}2$ m³ $=$", choix: ["$12$ L", "$120$ L", "$1\\,200$ L", "$12\\,000$ L"], bonne: 2, explication: "$1$ m³ $= 1\\,000$ L, donc $1{,}2$ m³ $= 1\\,200$ L." }
  ],

  methode: [
    {
      titre: "Calculer sans calculatrice",
      etapes: [
        "Repère les nombres « ronds » cachés : $0{,}25 = \\dfrac{1}{4}$, $0{,}5 = \\dfrac{1}{2}$, $1{,}5 = \\dfrac{3}{2}$.",
        "Décompose : $25 \\times 12 = 25 \\times 4 \\times 3 = 300$.",
        "Avec des puissances de $10$, déplace la virgule plutôt que de poser l'opération.",
        "Contrôle ton résultat avec un ordre de grandeur."
      ],
      exemple: "$0{,}25 \\times 36 = \\dfrac{36}{4} = 9$ : bien plus rapide que de poser la multiplication."
    },
    {
      titre: "Contrôler un résultat",
      etapes: [
        "L'ordre de grandeur est-il cohérent ?",
        "L'unité est-elle la bonne (cm², cm³, m/s…) ?",
        "Le signe est-il possible (une longueur est positive) ?",
        "La valeur a-t-elle du sens (une proportion ou une probabilité est entre $0$ et $1$) ?"
      ],
      exemple: "Une bouteille d'eau de $1{,}5$ m³ ? Impossible : c'est $1{,}5$ L."
    }
  ],
  erreurs: [
    "$\\dfrac{a}{b} + \\dfrac{c}{d} \\neq \\dfrac{a + c}{b + d}$ : on réduit d'abord au même dénominateur.",
    "$(-3)^2 = 9$ mais $-3^2 = -9$ : sans parenthèses, le carré ne porte que sur $3$.",
    "$2^3 \\times 2^4 = 2^7$, pas $4^7$ ni $2^{12}$.",
    "$5\\,\\% = 0{,}05$ et non $0{,}5$.",
    "$1$ h $30$ min $= 1{,}5$ h et non $1{,}3$ h ; $1$ m² $= 100$ dm² et non $10$ dm².",
    "Pour comparer des négatifs : $-5 < -2$, même si $5 > 2$."
  ]
};
