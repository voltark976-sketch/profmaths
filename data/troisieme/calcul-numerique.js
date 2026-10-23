/*
  CHAPITRE : 3e — Calcul numérique : fractions et puissances
  -----------------------------------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027) : calculer avec des
  nombres rationnels (priorités, fractions) ; utiliser les puissances d'exposant entier, positif ou négatif, et
  leurs règles de calcul ; utiliser l'écriture scientifique (ordres de grandeur, problèmes).
  Vidéos et cours PDF d'Yvan Monka.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-calcul-numerique"] = {
  niveau: "3e",
  numero: 1,
  titre: "Calcul numérique : fractions et puissances",
  accroche: "Enchaîner les calculs de fractions, manier les règles des puissances et l'écriture scientifique, comme au brevet.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : calculs numériques (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Calc_numeriq.pdf" },
    { titre: "Formulaire de 3e : tout le cours en 4 pages (Yvan Monka)", url: "https://www.maths-et-tiques.fr/telech/19Formulaire3e.pdf" }
  ],
  liens: [
    { titre: "Utiliser les puissances d'exposant négatif (Yvan Monka)", url: "https://youtu.be/5miQxq30zhY", type: "video" },
    { titre: "Résoudre un problème à l'aide des puissances (Yvan Monka)", url: "https://youtu.be/4kwH1rM992Q", type: "video" },
    { titre: "Prépare ton brevet : fractions, puissances… (Yvan Monka)", url: "https://youtu.be/15Jad7dbshs", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Calculer avec des fractions",
      video: { titre: "Vidéo d'Yvan Monka : le cours sur les fractions", youtube: "https://youtu.be/a0Qb812W75c" },
      texte:
        "- **Additionner** : on réduit au même dénominateur, puis on additionne les numérateurs.\n" +
        "- **Multiplier** : $\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{a \\times c}{b \\times d}$.\n" +
        "- **Diviser** : diviser par $\\dfrac{c}{d}$, c'est multiplier par son inverse $\\dfrac{d}{c}$.\n\n" +
        "Les **priorités** s'appliquent : parenthèses, puis multiplications et divisions, puis additions et soustractions. On simplifie le résultat pour obtenir une fraction **irréductible**.\n\n" +
        "Sur la figure, $\\dfrac{3}{4}$ des colonnes et $\\dfrac{2}{3}$ des lignes sont coloriées : la partie commune représente $\\dfrac{3}{4} \\times \\dfrac{2}{3} = \\dfrac{6}{12} = \\dfrac{1}{2}$ du carré.",
      figure: "cn3-cours-produit",
      exemple: {
        enonce: "Calcule $\\dfrac{1}{2} + \\dfrac{3}{4} \\times \\dfrac{2}{3}$.",
        solution: "$\\dfrac{3}{4} \\times \\dfrac{2}{3} = \\dfrac{6}{12} = \\dfrac{1}{2}$, donc le résultat est $\\dfrac{1}{2} + \\dfrac{1}{2} = 1$."
      }
    },
    {
      titre: "Règles des puissances",
      video: { titre: "Vidéo d'Yvan Monka : le cours sur les puissances", youtube: "https://youtu.be/IxCzv5FPJ3s" },
      texte:
        "Pour $a \\neq 0$ et des entiers $m$ et $n$ :\n\n" +
        "- $a^{m} \\times a^{n} = a^{m + n}$ ;\n" +
        "- $\\dfrac{a^{m}}{a^{n}} = a^{m - n}$ ;\n" +
        "- $\\left(a^{m}\\right)^{n} = a^{m \\times n}$ ;\n" +
        "- $a^{-n} = \\dfrac{1}{a^{n}}$ et $a^{0} = 1$.\n\n" +
        "Ces règles ne s'appliquent qu'avec la **même base**. Elles viennent de la définition : $2^{5} \\times 2^{3}$ contient $5 + 3 = 8$ facteurs égaux à $2$, c'est $2^{8}$ (voir la figure).",
      figure: "cn3-cours-puissances",
      exemple: {
        enonce: "Écris $\\dfrac{2^{5} \\times 2^{-3}}{2^{4}}$ sous la forme d'une puissance de $2$.",
        solution: "$\\dfrac{2^{5 + (-3)}}{2^{4}} = \\dfrac{2^{2}}{2^{4}} = 2^{2 - 4} = 2^{-2}$."
      }
    },
    {
      titre: "Écriture scientifique",
      video: { titre: "Vidéo d'Yvan Monka : écrire un nombre sous forme scientifique", youtube: "https://youtu.be/tzhNCpLRtCY" },
      texte:
        "Tout nombre décimal positif s'écrit $a \\times 10^{n}$ avec $1 \\leqslant a < 10$ et $n$ entier : c'est son **écriture scientifique**.\n\n" +
        "$34\\,500 = 3{,}45 \\times 10^{4}$ et $0{,}0072 = 7{,}2 \\times 10^{-3}$.\n\n" +
        "Pour un produit, on multiplie les nombres devant et on additionne les exposants, puis on ajuste : $28 \\times 10^{3} = 2{,}8 \\times 10^{4}$.\n\n" +
        "Les **préfixes** remplacent des puissances de $10$ : nano ($10^{-9}$), micro ($10^{-6}$), milli ($10^{-3}$), kilo ($10^{3}$), méga ($10^{6}$), giga ($10^{9}$). L'échelle situe des objets selon leur **ordre de grandeur** : une bactérie mesure quelques micromètres, le Mont Choungui environ $6 \\times 10^{2}$ m.",
      figure: "cn3-cours-echelle",
      exemple: {
        enonce: "Donne l'écriture scientifique de $(4 \\times 10^{5}) \\times (3 \\times 10^{-2})$.",
        solution: "$12 \\times 10^{3} = 1{,}2 \\times 10^{4}$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "cn3-fractions", titre: "Enchaîner des calculs de fractions", etape: "Fractions", nb: 6 },
    { type: "cn3-puissances", titre: "Règles des puissances", etape: "Puissances", nb: 6 },
    { type: "cn3-scientifique", titre: "Écriture scientifique", etape: "Puissances", nb: 5 },
    { type: "cn3-problemes", titre: "Problèmes avec des puissances", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$\\dfrac{2}{3} + \\dfrac{1}{6}$ est égal à :", choix: ["$\\dfrac{5}{6}$", "$\\dfrac{3}{9}$", "$\\dfrac{3}{6}$", "$\\dfrac{2}{18}$"], bonne: 0, explication: "$\\dfrac{4}{6} + \\dfrac{1}{6}$." },
    { question: "$\\dfrac{3}{5} \\div \\dfrac{9}{10}$ est égal à :", choix: ["$\\dfrac{2}{3}$", "$\\dfrac{27}{50}$", "$\\dfrac{3}{2}$", "$\\dfrac{1}{3}$"], bonne: 0, explication: "$\\dfrac{3}{5} \\times \\dfrac{10}{9} = \\dfrac{30}{45}$." },
    { question: "$1 - \\dfrac{1}{4} \\times \\dfrac{2}{3}$ est égal à :", choix: ["$\\dfrac{5}{6}$", "$\\dfrac{1}{2}$", "$\\dfrac{1}{6}$", "$\\dfrac{3}{4}$"], bonne: 0, explication: "$1 - \\dfrac{1}{6}$." },
    { question: "$5^{3} \\times 5^{4}$ est égal à :", choix: ["$5^{7}$", "$5^{12}$", "$25^{7}$", "$10^{7}$"], bonne: 0, explication: "On additionne les exposants." },
    { question: "$\\dfrac{10^{2}}{10^{-3}}$ est égal à :", choix: ["$10^{5}$", "$10^{-1}$", "$10^{-6}$", "$1^{5}$"], bonne: 0, explication: "$2 - (-3) = 5$." },
    { question: "$\\left(3^{2}\\right)^{4}$ est égal à :", choix: ["$3^{8}$", "$3^{6}$", "$9^{6}$", "$3^{16}$"], bonne: 0, explication: "On multiplie les exposants." },
    { question: "$2^{-3}$ est égal à :", choix: ["$\\dfrac{1}{8}$", "$-8$", "$-6$", "$\\dfrac{1}{6}$"], bonne: 0, explication: "$\\dfrac{1}{2^{3}}$." },
    { question: "$7^{0}$ est égal à :", choix: ["$1$", "$0$", "$7$", "$\\dfrac{1}{7}$"], bonne: 0, explication: "Tout nombre non nul à la puissance $0$ vaut $1$." },
    { question: "L'écriture scientifique de $0{,}00056$ est :", choix: ["$5{,}6 \\times 10^{-4}$", "$5{,}6 \\times 10^{4}$", "$56 \\times 10^{-5}$", "$0{,}56 \\times 10^{-3}$"], bonne: 0, explication: "On décale la virgule de $4$ rangs." },
    { question: "L'écriture scientifique de $47\\,000\\,000$ est :", choix: ["$4{,}7 \\times 10^{7}$", "$47 \\times 10^{6}$", "$4{,}7 \\times 10^{6}$", "$4{,}7 \\times 10^{-7}$"], bonne: 0, explication: "$4{,}7$ puis $7$ rangs." },
    { question: "$(2 \\times 10^{3}) \\times (6 \\times 10^{4})$ en écriture scientifique :", choix: ["$1{,}2 \\times 10^{8}$", "$12 \\times 10^{7}$", "$1{,}2 \\times 10^{7}$", "$8 \\times 10^{7}$"], bonne: 0, explication: "$12 \\times 10^{7} = 1{,}2 \\times 10^{8}$." },
    { question: "$10^{-2}$ est égal à :", choix: ["$0{,}01$", "$-100$", "$-20$", "$0{,}1$"], bonne: 0, explication: "$\\dfrac{1}{100}$." },
    { question: "$\\dfrac{5}{6} - \\dfrac{1}{3} \\times \\dfrac{3}{4}$ est égal à :", choix: ["$\\dfrac{7}{12}$", "$\\dfrac{3}{8}$", "$\\dfrac{4}{9}$", "$1$"], bonne: 0, explication: "Priorité à la multiplication : $\\dfrac{1}{3} \\times \\dfrac{3}{4} = \\dfrac{1}{4}$, puis $\\dfrac{10}{12} - \\dfrac{3}{12} = \\dfrac{7}{12}$." },
    { question: "La partie encadrée représente quelle fraction du carré ?", figure: "cn3-qcm-produit", choix: ["$\\dfrac{3}{10}$", "$\\dfrac{5}{9}$", "$\\dfrac{2}{5}$", "$\\dfrac{23}{20}$"], bonne: 0, explication: "C'est $\\dfrac{2}{5} \\times \\dfrac{3}{4} = \\dfrac{6}{20} = \\dfrac{3}{10}$ : $6$ cases sur $20$." },
    { question: "L'inverse de $\\dfrac{3}{7}$ est :", choix: ["$\\dfrac{7}{3}$", "$-\\dfrac{3}{7}$", "$\\dfrac{3}{7}$", "$-\\dfrac{7}{3}$"], bonne: 0, explication: "$\\dfrac{3}{7} \\times \\dfrac{7}{3} = 1$." },
    { question: "$\\dfrac{2^{7}}{2^{3}}$ est égal à :", choix: ["$2^{4}$", "$2^{10}$", "$1^{4}$", "$2^{21}$"], bonne: 0, explication: "On soustrait les exposants : $7 - 3 = 4$." },
    { question: "$(-3)^{2}$ est égal à :", choix: ["$9$", "$-9$", "$-6$", "$6$"], bonne: 0, explication: "$(-3) \\times (-3) = 9$." },
    { question: "$-3^{2}$ est égal à :", choix: ["$-9$", "$9$", "$-6$", "$6$"], bonne: 0, explication: "Le carré ne porte que sur $3$ : $-3^{2} = -(3 \\times 3) = -9$." },
    { question: "$5 \\times 10^{-3}$ est égal à :", choix: ["$0{,}005$", "$0{,}0005$", "$5\\,000$", "$0{,}05$"], bonne: 0, explication: "$10^{-3} = 0{,}001$." },
    { question: "L'écriture scientifique de $0{,}3 \\times 10^{5}$ est :", choix: ["$3 \\times 10^{4}$", "$3 \\times 10^{5}$", "$3 \\times 10^{6}$", "$30 \\times 10^{3}$"], bonne: 0, explication: "$0{,}3 = 3 \\times 10^{-1}$, donc $0{,}3 \\times 10^{5} = 3 \\times 10^{4}$." },
    { question: "Un gigaoctet (Go), c'est :", choix: ["$10^{9}$ octets", "$10^{6}$ octets", "$10^{3}$ octets", "$10^{12}$ octets"], bonne: 0, explication: "Le préfixe giga signifie $10^{9}$, un milliard." },
    { question: "Sur cette échelle des puissances de $10$ (en mètres), le point « ? » correspond à :", figure: "cn3-qcm-echelle", choix: ["$10^{-6}$ m, un micromètre", "$10^{-3}$ m, un millimètre", "$10^{6}$ m, un mégamètre", "$10^{-9}$ m, un nanomètre"], bonne: 0, explication: "Le point est sur la graduation « micro » : $10^{-6}$ m." },
    { question: "Le volume de ce cube est :", figure: "cn3-qcm-cube", choix: ["$2^{9}$ cm³", "$2^{6}$ cm³", "$2^{3}$ cm³", "$6^{3}$ cm³"], bonne: 0, explication: "$\\left(2^{3}\\right)^{3} = 2^{3 \\times 3} = 2^{9}$." },
    { question: "Une cellule mesure $2 \\times 10^{-5}$ m. $1\\,000$ cellules alignées mesurent :", choix: ["$2 \\times 10^{-2}$ m", "$2 \\times 10^{-8}$ m", "$2 \\times 10^{-15}$ m", "$2 \\times 10^{3}$ m"], bonne: 0, explication: "$2 \\times 10^{-5} \\times 10^{3} = 2 \\times 10^{-2}$ m, soit $2$ cm." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer une expression avec des fractions",
      etapes: [
        "Repère l'opération prioritaire (parenthèses, puis $\\times$ et $\\div$).",
        "Pour $\\times$ : numérateurs ensemble, dénominateurs ensemble ; pour $\\div$ : multiplie par l'inverse.",
        "Pour $+$ et $-$ : même dénominateur. Termine en simplifiant."
      ],
      figure: "cn3-cours-produit",
      exemple: "$\\dfrac{1}{3} + \\dfrac{1}{2} \\div \\dfrac{3}{4} = \\dfrac{1}{3} + \\dfrac{2}{3} = 1$."
    },
    {
      titre: "Simplifier avec les puissances",
      etapes: [
        "Vérifie que toutes les puissances ont la même base.",
        "Produit : additionne les exposants ; quotient : soustrais ; puissance de puissance : multiplie.",
        "Pour l'écriture scientifique, ajuste pour que le nombre devant soit entre $1$ et $10$."
      ],
      figure: "cn3-cours-puissances",
      exemple: "$3^{4} \\times 3^{-6} = 3^{-2}$."
    }
  ],
  erreurs: [
    "Additionner les dénominateurs de deux fractions.",
    "Oublier les priorités opératoires dans une expression avec des fractions.",
    "Multiplier les exposants au lieu de les additionner pour un produit.",
    "Mal gérer un exposant négatif : $a^{m - (-n)} = a^{m + n}$.",
    "Laisser un nombre supérieur à $10$ devant la puissance de $10$ dans une écriture scientifique."
  ]
};
