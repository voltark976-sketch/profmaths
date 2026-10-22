/*
  CHAPITRE : 5e — Fractions
  --------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026, partie
  « Nombres rationnels » : comparer des fractions ; additionner et soustraire des fractions de dénominateurs
  quelconques ; résoudre des problèmes avec additions et soustractions de fractions. Automatismes entretenus :
  fractions égales, nombre quotient ($3 \times \ldots = 7$), écriture entier + fraction inférieure à $1$,
  fraction d'un nombre.
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js. Une réponse attendue en fraction est
  annoncée dans la consigne (CONSIGNE_FR) et les valeurs approchées décimales sont refusées (FRAC_APPROX).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-fractions"] = {
  niveau: "5e",
  numero: 3,
  titre: "Fractions",
  accroche: "Écrire une fraction autrement, comparer des fractions, puis les additionner et les soustraire même quand leurs dénominateurs sont différents.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : fractions, partie 1 (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Fract1.pdf" },
    { titre: "Cours d'Yvan Monka : fractions, partie 2 (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Fract2.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : les fractions (Yvan Monka)", url: "https://youtu.be/m0HUFgWbgsA", type: "video" },
    { titre: "Ranger des fractions dans l'ordre (Yvan Monka)", url: "https://youtu.be/zzRX2N3o6xM", type: "video" },
    { titre: "Résoudre un problème avec des fractions (Yvan Monka)", url: "https://youtu.be/qm8YLSWtGXQ", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Fractions égales",
      video: { titre: "Vidéo d'Yvan Monka : trouver des fractions égales", youtube: "https://youtu.be/6AiX2DuI03Q" },
      texte:
        "Une fraction ne change pas si l'on **multiplie** (ou si l'on **divise**) son numérateur et son dénominateur par un **même nombre** non nul :\n\n" +
        "$\\dfrac{2}{3} = \\dfrac{2 \\times 5}{3 \\times 5} = \\dfrac{10}{15}$ et $\\dfrac{18}{24} = \\dfrac{18 \\div 6}{24 \\div 6} = \\dfrac{3}{4}$.\n\n" +
        "Attention : on n'**ajoute** jamais le même nombre en haut et en bas.\n\n" +
        "Le quotient $\\dfrac{7}{3}$ est le nombre qui, multiplié par $3$, donne $7$ : $3 \\times \\dfrac{7}{3} = 7$.",
      exemple: {
        enonce: "Complète : $\\dfrac{5}{4} = \\dfrac{\\ldots}{28}$ et $\\dfrac{35}{21} = \\dfrac{5}{\\ldots}$.",
        solution: "$4 \\times 7 = 28$, donc $\\dfrac{5}{4} = \\dfrac{35}{28}$.\n\n$35 \\div 7 = 5$, donc $\\dfrac{35}{21} = \\dfrac{5}{3}$."
      }
    },
    {
      titre: "Fraction plus grande que 1",
      video: { titre: "Vidéo d'Yvan Monka : décomposer une fraction (entier + fraction)", youtube: "https://youtu.be/YIaFLxlrTxg" },
      texte:
        "Une fraction est **plus grande que $1$** quand son numérateur est plus grand que son dénominateur.\n\n" +
        "On peut alors l'écrire comme la somme d'un entier et d'une fraction plus petite que $1$, grâce à la division euclidienne :\n\n" +
        "$17 = 5 \\times 3 + 2$, donc $\\dfrac{17}{5} = \\dfrac{15}{5} + \\dfrac{2}{5} = 3 + \\dfrac{2}{5}$.",
      exemple: {
        enonce: "Écris $\\dfrac{23}{4}$ sous la forme d'un entier plus une fraction inférieure à $1$.",
        solution: "$23 = 4 \\times 5 + 3$, donc $\\dfrac{23}{4} = 5 + \\dfrac{3}{4}$."
      }
    },
    {
      titre: "Comparer des fractions",
      video: { titre: "Vidéo d'Yvan Monka : comparer les fractions", youtube: "https://youtu.be/MVnogrTAGy0" },
      texte:
        "- Avec le **même dénominateur**, la plus grande fraction est celle qui a le plus grand numérateur : $\\dfrac{3}{7} < \\dfrac{5}{7}$.\n" +
        "- Avec le **même numérateur**, la plus grande est celle qui a le plus petit dénominateur : $\\dfrac{2}{3} > \\dfrac{2}{5}$.\n" +
        "- Sinon, on écrit les deux fractions avec un **dénominateur commun** (un multiple commun des deux dénominateurs), puis on compare les numérateurs.",
      exemple: {
        enonce: "Compare $\\dfrac{3}{4}$ et $\\dfrac{5}{6}$.",
        solution: "$12$ est un multiple de $4$ et de $6$ : $\\dfrac{3}{4} = \\dfrac{9}{12}$ et $\\dfrac{5}{6} = \\dfrac{10}{12}$. Comme $9 < 10$, $\\dfrac{3}{4} < \\dfrac{5}{6}$."
      }
    },
    {
      titre: "Additionner et soustraire des fractions",
      video: { titre: "Vidéo d'Yvan Monka : additionner et soustraire des fractions (dénominateurs différents)", youtube: "https://youtu.be/8MRsdipPKz4" },
      texte:
        "Pour additionner ou soustraire deux fractions :\n\n" +
        "- on les écrit avec le **même dénominateur** ;\n" +
        "- on additionne (ou on soustrait) les **numérateurs** et on **garde** le dénominateur.\n\n" +
        "$\\dfrac{1}{3} + \\dfrac{1}{4} = \\dfrac{4}{12} + \\dfrac{3}{12} = \\dfrac{7}{12}$. On ne fait **jamais** $\\dfrac{1 + 1}{3 + 4}$.\n\n" +
        "Un nombre entier s'écrit aussi comme une fraction : $2 = \\dfrac{10}{5}$.",
      exemple: {
        enonce: "Calcule $\\dfrac{5}{6} - \\dfrac{4}{9}$ et $2 - \\dfrac{3}{5}$.",
        solution: "$18$ est un multiple de $6$ et de $9$ : $\\dfrac{5}{6} - \\dfrac{4}{9} = \\dfrac{15}{18} - \\dfrac{8}{18} = \\dfrac{7}{18}$.\n\n$2 - \\dfrac{3}{5} = \\dfrac{10}{5} - \\dfrac{3}{5} = \\dfrac{7}{5}$."
      }
    },
    {
      titre: "Problèmes",
      video: { titre: "Vidéo d'Yvan Monka : résoudre un problème avec des fractions", youtube: "https://youtu.be/qm8YLSWtGXQ" },
      texte:
        "Dans un problème, la quantité totale correspond à la fraction $1$.\n\n" +
        "Pour trouver la part qui **reste**, on additionne les parts connues, puis on retire le résultat de $1$.\n\n" +
        "Pour trouver une quantité, on prend la fraction du total : $\\dfrac{3}{4}$ de $20$, c'est $20 \\div 4 \\times 3 = 15$.",
      exemple: {
        enonce: "Dans une classe de $24$ élèves, $\\dfrac{1}{3}$ font du football et $\\dfrac{1}{4}$ du handball. Les autres font de la danse. Quelle fraction de la classe fait de la danse ? Combien d'élèves ?",
        solution: "$\\dfrac{1}{3} + \\dfrac{1}{4} = \\dfrac{4}{12} + \\dfrac{3}{12} = \\dfrac{7}{12}$. Il reste $1 - \\dfrac{7}{12} = \\dfrac{5}{12}$ de la classe.\n\n$\\dfrac{5}{12}$ de $24$ : $24 \\div 12 \\times 5 = 10$ élèves."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "fr5-egales", titre: "Fractions égales et décompositions", etape: "Écrire une fraction autrement", nb: 6 },
    { type: "fr5-comparer", titre: "Comparer et ranger des fractions", etape: "Comparer", nb: 6 },
    { type: "fr5-addsous", titre: "Additionner et soustraire", etape: "Calculer", nb: 6 },
    { type: "fr5-calculs", titre: "Enchaîner les calculs", etape: "Calculer", nb: 5 },
    { type: "fr5-problemes", titre: "Résoudre des problèmes", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$\\dfrac{3}{5}$ est égal à :", choix: ["$\\dfrac{12}{20}$", "$\\dfrac{5}{7}$", "$\\dfrac{3}{10}$", "$\\dfrac{6}{8}$"], bonne: 0, explication: "On multiplie le numérateur et le dénominateur par $4$." },
    { question: "$\\dfrac{24}{36}$ est égal à :", choix: ["$\\dfrac{2}{3}$", "$\\dfrac{3}{4}$", "$\\dfrac{4}{3}$", "$\\dfrac{12}{16}$"], bonne: 0, explication: "On divise en haut et en bas par $12$." },
    { question: "Le nombre qui, multiplié par $7$, donne $5$ est :", choix: ["$\\dfrac{5}{7}$", "$\\dfrac{7}{5}$", "$35$", "$2$"], bonne: 0, explication: "$7 \\times \\dfrac{5}{7} = 5$." },
    { question: "$\\dfrac{19}{4}$ est égal à :", choix: ["$4 + \\dfrac{3}{4}$", "$19 + \\dfrac{1}{4}$", "$3 + \\dfrac{4}{4}$", "$4 + \\dfrac{1}{4}$"], bonne: 0, explication: "$19 = 4 \\times 4 + 3$." },
    { question: "Quelle fraction est plus grande que $1$ ?", choix: ["$\\dfrac{9}{8}$", "$\\dfrac{8}{9}$", "$\\dfrac{5}{10}$", "$\\dfrac{7}{7}$"], bonne: 0, explication: "Le numérateur est plus grand que le dénominateur." },
    { question: "Compare $\\dfrac{4}{7}$ et $\\dfrac{4}{9}$ :", choix: ["$\\dfrac{4}{7} > \\dfrac{4}{9}$", "$\\dfrac{4}{7} < \\dfrac{4}{9}$", "$\\dfrac{4}{7} = \\dfrac{4}{9}$"], bonne: 0, explication: "Même numérateur : le plus petit dénominateur donne la plus grande fraction." },
    { question: "Compare $\\dfrac{2}{3}$ et $\\dfrac{3}{4}$ :", choix: ["$\\dfrac{2}{3} < \\dfrac{3}{4}$", "$\\dfrac{2}{3} > \\dfrac{3}{4}$", "$\\dfrac{2}{3} = \\dfrac{3}{4}$"], bonne: 0, explication: "$\\dfrac{8}{12} < \\dfrac{9}{12}$." },
    { question: "Un dénominateur commun à $\\dfrac{1}{6}$ et $\\dfrac{3}{8}$ est :", choix: ["$24$", "$14$", "$12$", "$16$"], bonne: 0, explication: "$24$ est un multiple de $6$ et de $8$." },
    { question: "$\\dfrac{2}{5} + \\dfrac{1}{5}$ est égal à :", choix: ["$\\dfrac{3}{5}$", "$\\dfrac{3}{10}$", "$\\dfrac{2}{25}$", "$\\dfrac{3}{25}$"], bonne: 0, explication: "Même dénominateur : on additionne les numérateurs." },
    { question: "$\\dfrac{1}{2} + \\dfrac{1}{3}$ est égal à :", choix: ["$\\dfrac{5}{6}$", "$\\dfrac{2}{5}$", "$\\dfrac{1}{5}$", "$\\dfrac{2}{6}$"], bonne: 0, explication: "$\\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}$." },
    { question: "$\\dfrac{3}{4} - \\dfrac{1}{6}$ est égal à :", choix: ["$\\dfrac{7}{12}$", "$\\dfrac{2}{2}$", "$\\dfrac{1}{12}$", "$\\dfrac{2}{10}$"], bonne: 0, explication: "$\\dfrac{9}{12} - \\dfrac{2}{12} = \\dfrac{7}{12}$." },
    { question: "$1 - \\dfrac{3}{8}$ est égal à :", choix: ["$\\dfrac{5}{8}$", "$\\dfrac{2}{8}$", "$\\dfrac{3}{7}$", "$\\dfrac{4}{8}$"], bonne: 0, explication: "$\\dfrac{8}{8} - \\dfrac{3}{8} = \\dfrac{5}{8}$." },
    { question: "$\\dfrac{2}{3}$ de $21$ est égal à :", choix: ["$14$", "$7$", "$63$", "$42$"], bonne: 0, explication: "$21 \\div 3 \\times 2 = 14$." },
    { question: "$\\dfrac{1}{4}$ d'un terrain est planté de bananiers et $\\dfrac{1}{2}$ de manioc. Quelle fraction reste ?", choix: ["$\\dfrac{1}{4}$", "$\\dfrac{3}{4}$", "$\\dfrac{2}{6}$", "$\\dfrac{1}{2}$"], bonne: 0, explication: "$\\dfrac{1}{4} + \\dfrac{2}{4} = \\dfrac{3}{4}$, il reste $\\dfrac{1}{4}$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Trouver une fraction égale",
      etapes: [
        "Repère par quel nombre on passe d'un dénominateur à l'autre (ou d'un numérateur à l'autre).",
        "Multiplie (ou divise) l'autre terme par le même nombre.",
        "N'ajoute jamais le même nombre en haut et en bas."
      ],
      exemple: "$\\dfrac{3}{8} = \\dfrac{\\ldots}{40}$ : $\\times 5$, donc $\\dfrac{15}{40}$."
    },
    {
      titre: "Comparer deux fractions",
      etapes: [
        "Même dénominateur : compare les numérateurs.",
        "Sinon, cherche un multiple commun aux dénominateurs.",
        "Écris les deux fractions avec ce dénominateur, puis compare les numérateurs."
      ],
      exemple: "$\\dfrac{5}{6}$ et $\\dfrac{7}{9}$ : $\\dfrac{15}{18} > \\dfrac{14}{18}$."
    },
    {
      titre: "Additionner ou soustraire",
      etapes: [
        "Cherche un dénominateur commun (un multiple commun des dénominateurs).",
        "Transforme chaque fraction pour avoir ce dénominateur.",
        "Additionne ou soustrais les numérateurs, garde le dénominateur, puis simplifie si possible."
      ],
      exemple: "$\\dfrac{1}{4} + \\dfrac{1}{6} = \\dfrac{3}{12} + \\dfrac{2}{12} = \\dfrac{5}{12}$."
    },
    {
      titre: "Trouver ce qui reste",
      etapes: [
        "Le tout vaut $1$.",
        "Additionne les parts connues.",
        "Retire leur somme de $1$ ; pour une quantité, prends cette fraction du total."
      ],
      exemple: "$1 - \\left(\\dfrac{1}{2} + \\dfrac{1}{5}\\right) = 1 - \\dfrac{7}{10} = \\dfrac{3}{10}$."
    }
  ],
  erreurs: [
    "Additionner les dénominateurs : $\\dfrac{1}{2} + \\dfrac{1}{3} \\neq \\dfrac{2}{5}$.",
    "Changer le dénominateur sans changer le numérateur.",
    "Ajouter le même nombre au numérateur et au dénominateur pour trouver une fraction égale.",
    "Croire que la fraction au plus grand dénominateur est toujours la plus grande.",
    "Oublier que le tout correspond à $1$ dans un problème."
  ]
};
