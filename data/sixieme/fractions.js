/*
  CHAPITRE : 6e — Fractions
  --------------------------
  Programme de mathématiques du cycle 3 (BO n° 16 du 17 avril 2025), en vigueur en 6e depuis la rentrée 2025 :
  - le sens quotient : a/b est le nombre qui, multiplié par b, donne a ; égalités à trous multiplicatives ;
    une fraction peut être un entier, un décimal non entier ou un nombre non décimal ; fractions sur une demi-droite graduée ;
  - la fraction opérateur : appliquer une fraction à une quantité ou à un nombre entier ;
  - égalités de fractions, comparer, encadrer, ranger (fractions et sommes d'un entier et d'une fraction) ;
  - additionner et soustraire des fractions (un dénominateur multiple de l'autre), multiplier une fraction par un entier ;
  - problèmes. Les pourcentages sont dans un chapitre à part.
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js.
  figure : "f6-bande", "f6-bande-7" ou "f6-droite" (assets/exercices-college.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["sixieme-fractions"] = {
  niveau: "6e",
  numero: 4,
  titre: "Fractions",
  accroche: "Une fraction pour partager, pour diviser et pour repérer un point ; puis comparer, additionner et prendre une fraction d'une quantité.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka, partie 1 : écriture fractionnaire, quotient, demi-droite (PDF)", url: "https://www.maths-et-tiques.fr/telech/25Fra1.pdf" },
    { titre: "Cours d'Yvan Monka, partie 2 : fractions égales, comparaison, opérations (PDF)", url: "https://www.maths-et-tiques.fr/telech/25Fra2.pdf" }
  ],
  liens: [
    { titre: "Tout le cours en vidéo (Yvan Monka)", url: "https://youtu.be/m0HUFgWbgsA", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Une fraction pour représenter un partage",
      video: { titre: "Vidéo d'Yvan Monka : représenter un partage à l'aide d'une fraction", youtube: "https://youtu.be/_xZkeQM8tm4" },
      texte:
        "La bande est partagée en $4$ parts **égales** et on en colorie $3$ : on a colorié les $\\dfrac{3}{4}$ de la bande.\n\n" +
        "- $3$ est le **numérateur** : il compte les parts prises.\n" +
        "- $4$ est le **dénominateur** : il dit en combien de parts égales on a partagé l'unité (ici, des quarts).\n\n" +
        "$\\dfrac{3}{4} = \\dfrac{1}{4} + \\dfrac{1}{4} + \\dfrac{1}{4} = 3 \\times \\dfrac{1}{4}$.\n\n" +
        "Une fraction peut dépasser $1$ : $\\dfrac{7}{4}$, ce sont $7$ quarts, soit une bande entière et encore $3$ quarts.\n\n" +
        "Le savais-tu ? Au Moyen Âge, on appelait les fractions des « nombres rompus » : le mot vient du latin « fractio », la cassure.",
      figure: "f6-bande",
      exemple: {
        enonce: "Une bande est partagée en $8$ parts égales et $5$ parts sont coloriées. Quelle fraction est coloriée ? Quelle fraction ne l'est pas ?",
        solution: "Coloriée : $\\dfrac{5}{8}$ de la bande. Pas coloriée : $\\dfrac{3}{8}$ (car $8 - 5 = 3$)."
      }
    },
    {
      titre: "Une fraction est un quotient",
      video: { titre: "Vidéo d'Yvan Monka : donner l'écriture décimale d'un quotient", youtube: "https://youtu.be/L7AW1Kmx8y8" },
      texte:
        "Le **quotient** de $a$ par $b$ ($b \\neq 0$) est le nombre qui, multiplié par $b$, donne $a$. On l'écrit $\\dfrac{a}{b}$, et $\\dfrac{a}{b} = a \\div b$.\n\n" +
        "- $4 \\times \\dfrac{3}{4} = 3$ : $\\dfrac{3}{4}$, c'est aussi **le quart de $3$**.\n" +
        "- L'égalité à trous $7 \\times \\ldots = 3$ se complète par $\\dfrac{3}{7}$.\n\n" +
        "Une fraction peut être :\n\n" +
        "- un **entier** : $\\dfrac{12}{4} = 3$ ;\n" +
        "- un **décimal** non entier : $\\dfrac{3}{4} = 0{,}75$ ; $\\dfrac{5}{2} = 2{,}5$ ;\n" +
        "- un nombre **non décimal** : $\\dfrac{1}{3} = 0{,}333\\ldots$ (la division ne s'arrête jamais).\n\n" +
        "À connaître par cœur : $\\dfrac{1}{4} = 0{,}25$ ; $\\dfrac{1}{2} = 0{,}5$ ; $\\dfrac{3}{4} = 0{,}75$ ; $\\dfrac{3}{2} = 1{,}5$ ; $\\dfrac{5}{2} = 2{,}5$.\n\n" +
        "Sur la figure, un segment de $3$ unités est partagé en $4$ parts égales : chaque part mesure $\\dfrac{3}{4}$ d'unité, le quart de $3$.",
      figure: "f6-cours-quotient",
      exemple: {
        enonce: "Complète $5 \\times \\ldots = 2$. Donne l'écriture décimale de $\\dfrac{7}{4}$.",
        solution: "$5 \\times \\dfrac{2}{5} = 2$, et $\\dfrac{2}{5} = 0{,}4$.\n\n$\\dfrac{7}{4} = 7 \\div 4 = 1{,}75$."
      }
    },
    {
      titre: "Fractions sur une demi-droite graduée",
      video: { titre: "Vidéo d'Yvan Monka : placer une fraction sur une demi-droite graduée", youtube: "https://youtu.be/VcuaJOf2N5w" },
      texte:
        "Pour placer $\\dfrac{3}{5}$, on partage l'unité (de $0$ à $1$) en $5$ parts égales, puis on compte $3$ parts à partir de $0$.\n\n" +
        "Sur la figure, $M$ a pour abscisse $\\dfrac{3}{5}$ et $N$ a pour abscisse $\\dfrac{7}{5}$.\n\n" +
        "$\\dfrac{7}{5}$ est plus grand que $1$ : $\\dfrac{7}{5} = \\dfrac{5}{5} + \\dfrac{2}{5} = 1 + \\dfrac{2}{5}$. C'est la somme d'un entier et d'une fraction plus petite que $1$.\n\n" +
        "Pour partager un segment en parts égales quand c'est difficile à la règle (en $7$, en $11$…), on peut utiliser un réseau de droites parallèles également espacées : le « guide-âne ».",
      figure: "f6-droite",
      exemple: {
        enonce: "Sur une demi-droite où l'unité est partagée en $6$, à quelle graduation place-t-on $\\dfrac{11}{6}$ ? Écris $\\dfrac{11}{6}$ comme la somme d'un entier et d'une fraction.",
        solution: "On compte $11$ graduations de $\\dfrac{1}{6}$ à partir de $0$ : c'est $5$ graduations après $1$.\n\n$\\dfrac{11}{6} = \\dfrac{6}{6} + \\dfrac{5}{6} = 1 + \\dfrac{5}{6}$."
      }
    },
    {
      titre: "Fractions égales",
      video: { titre: "Vidéo d'Yvan Monka : trouver des fractions égales", youtube: "https://youtu.be/6AiX2DuI03Q" },
      texte:
        "On ne change pas une fraction quand on **multiplie** (ou qu'on **divise**) son numérateur **et** son dénominateur par un même nombre (non nul) :\n\n" +
        "$\\dfrac{3}{4} = \\dfrac{3 \\times 2}{4 \\times 2} = \\dfrac{6}{8}$ et $\\dfrac{20}{15} = \\dfrac{20 \\div 5}{15 \\div 5} = \\dfrac{4}{3}$.\n\n" +
        "Diviser en haut et en bas, c'est **simplifier** la fraction : les tables de multiplication et les diviseurs aident à trouver par quoi diviser.\n\n" +
        "Attention : **ajouter** le même nombre en haut et en bas change la fraction : $\\dfrac{3}{4} = 0{,}75$ mais $\\dfrac{3 + 5}{4 + 5} = \\dfrac{8}{9} \\approx 0{,}89$.\n\n" +
        "Sur la figure, $\\dfrac{3}{4}$ et $\\dfrac{6}{8}$ de la même bande ont la même longueur.",
      figure: "f6-cours-egales",
      exemple: {
        enonce: "Complète : $\\dfrac{5}{7} = \\dfrac{\\ldots}{42}$ et $\\dfrac{27}{21} = \\dfrac{9}{\\ldots}$.",
        solution: "De $7$ à $42$, on multiplie par $6$ : $\\dfrac{5}{7} = \\dfrac{30}{42}$.\n\nDe $27$ à $9$, on divise par $3$ : $\\dfrac{27}{21} = \\dfrac{9}{7}$."
      }
    },
    {
      titre: "Comparer, encadrer et ranger des fractions",
      video: { titre: "Vidéo d'Yvan Monka : comparer les fractions", youtube: "https://youtu.be/ZorNhzRGwq4" },
      texte:
        "- Deux fractions de **même dénominateur** : la plus grande est celle qui a le plus grand numérateur.\n" +
        "- Sinon, on les met **au même dénominateur** (ici, l'un est un multiple de l'autre) : $\\dfrac{3}{7}$ et $\\dfrac{11}{21}$ : $\\dfrac{3}{7} = \\dfrac{9}{21} < \\dfrac{11}{21}$.\n" +
        "- Une fraction est plus petite que $1$ si son numérateur est plus petit que son dénominateur.\n\n" +
        "Pour **encadrer** $\\dfrac{18}{5}$ par deux entiers consécutifs, on cherche les multiples de $5$ autour de $18$ : $15 < 18 < 20$, donc $3 < \\dfrac{18}{5} < 4$.\n\n" +
        "Sur une demi-droite graduée, la plus grande fraction est la plus à droite (figure : l'exemple ci-dessous).",
      figure: "f6-cours-comparer",
      exemple: {
        enonce: "Range dans l'ordre croissant : $\\dfrac{2}{3}$ ; $\\dfrac{5}{6}$ ; $\\dfrac{1}{6}$ ; $\\dfrac{7}{6}$.",
        solution: "On écrit $\\dfrac{2}{3} = \\dfrac{4}{6}$. Avec le dénominateur $6$ : $1 < 4 < 5 < 7$.\n\nDonc $\\dfrac{1}{6} < \\dfrac{2}{3} < \\dfrac{5}{6} < \\dfrac{7}{6}$."
      }
    },
    {
      titre: "Additionner et soustraire des fractions",
      video: { titre: "Vidéo d'Yvan Monka : effectuer des additions et soustractions de fractions", youtube: "https://youtu.be/lGShZVQlXMQ" },
      texte:
        "- **Même dénominateur** : on additionne (ou on soustrait) les numérateurs et on **garde** le dénominateur : $\\dfrac{2}{7} + \\dfrac{4}{7} = \\dfrac{6}{7}$.\n" +
        "- **Dénominateurs différents** : on met d'abord les fractions au même dénominateur : $\\dfrac{3}{8} + \\dfrac{3}{4} = \\dfrac{3}{8} + \\dfrac{6}{8} = \\dfrac{9}{8}$.\n" +
        "- Avec un entier : $1 + \\dfrac{2}{5} = \\dfrac{5}{5} + \\dfrac{2}{5} = \\dfrac{7}{5}$.\n\n" +
        "On n'additionne **jamais** les dénominateurs : $\\dfrac{1}{2} + \\dfrac{1}{2} = 1$, pas $\\dfrac{2}{4}$ !\n\n" +
        "À savoir par cœur : $\\dfrac{1}{2} + \\dfrac{1}{2} = 1$ ; $\\dfrac{1}{4} + \\dfrac{1}{4} = \\dfrac{1}{2}$ ; $\\dfrac{1}{2} + \\dfrac{1}{4} = \\dfrac{3}{4}$ ; $1 - \\dfrac{1}{4} = \\dfrac{3}{4}$.\n\n" +
        "Sur la figure, $\\dfrac{3}{8} + \\dfrac{3}{4} = \\dfrac{3}{8} + \\dfrac{6}{8} = \\dfrac{9}{8}$ : une bande entière et encore $\\dfrac{1}{8}$.",
      figure: "f6-cours-addition",
      exemple: {
        enonce: "Calcule $\\dfrac{4}{9} + \\dfrac{1}{27}$ et $\\dfrac{4}{5} - \\dfrac{3}{10}$.",
        solution: "$\\dfrac{4}{9} = \\dfrac{12}{27}$, donc $\\dfrac{4}{9} + \\dfrac{1}{27} = \\dfrac{13}{27}$.\n\n$\\dfrac{4}{5} = \\dfrac{8}{10}$, donc $\\dfrac{4}{5} - \\dfrac{3}{10} = \\dfrac{5}{10} = \\dfrac{1}{2}$."
      }
    },
    {
      titre: "Prendre une fraction d'une quantité, multiplier par un entier",
      video: { titre: "Vidéo d'Yvan Monka : calculer la fraction d'une quantité", youtube: "https://youtu.be/Q5nNel8scIw" },
      texte:
        "Prendre les $\\dfrac{2}{3}$ de $12$ œufs, c'est calculer $\\dfrac{2}{3} \\times 12$ : on partage en $3$, puis on prend $2$ parts.\n\n" +
        "$\\dfrac{2}{3} \\times 12 = (12 \\div 3) \\times 2 = 4 \\times 2 = 8$ œufs.\n\n" +
        "De même, les $\\dfrac{3}{4}$ de $10$ m : $\\dfrac{3}{4} \\times 10 = \\dfrac{30}{4} = 7{,}5$ m.\n\n" +
        "Pour multiplier une fraction par un entier, on multiplie le **numérateur** et on garde le dénominateur : $5 \\times \\dfrac{2}{7} = \\dfrac{10}{7}$.\n\n" +
        "Sur la figure : $12$ œufs en $3$ rangées de $4$ ; les $\\dfrac{2}{3}$, ce sont $2$ rangées, soit $8$ œufs.",
      figure: "f6-cours-oeufs",
      exemple: {
        enonce: "Une classe de $28$ élèves : les $\\dfrac{3}{4}$ viennent au collège en bus. Combien d'élèves viennent en bus ? Combien viennent autrement ?",
        solution: "$\\dfrac{3}{4} \\times 28 = (28 \\div 4) \\times 3 = 7 \\times 3 = 21$ élèves en bus.\n\nLes autres : $28 - 21 = 7$ élèves."
      }
    }
  ],

  videosNote: "Exercices corrigés en vidéo par Yvan Monka (maths-et-tiques).",
  videos: [
    { titre: "Représenter un partage à l'aide de fractions", type: "Partage", youtube: "https://youtu.be/EQO1YwOsFSA" },
    { titre: "Placer une fraction sur une demi-droite graduée", type: "Demi-droite", youtube: "https://youtu.be/-xT6_4YsEjQ" },
    { titre: "Modifier une fraction", type: "Fractions égales", youtube: "https://youtu.be/hthVBH2w7dA" },
    { titre: "Comparer les fractions", type: "Comparer", youtube: "https://youtu.be/ZNSUFQyiYIU" },
    { titre: "Additions et soustractions de fractions", type: "Calculer", youtube: "https://youtu.be/wfzLW6oF7VY" },
    { titre: "Calculer la fraction d'une quantité", type: "Problème", youtube: "https://youtu.be/ifOuBXR1Ums" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "f6-partage", titre: "Quelle fraction est coloriée ?", etape: "Le sens d'une fraction", nb: 5 },
    { type: "f6-quotient", titre: "Une fraction est un quotient", etape: "Le sens d'une fraction", nb: 6 },
    { type: "f6-droite", titre: "Lire une fraction sur une demi-droite", etape: "Le sens d'une fraction", nb: 5 },
    { type: "f6-egales", titre: "Fractions égales et simplification", etape: "Comparer des fractions", nb: 6 },
    { type: "f6-comparer", titre: "Comparer et ranger des fractions", etape: "Comparer des fractions", nb: 5 },
    { type: "f6-encadrer", titre: "Encadrer par deux entiers, entier + fraction", etape: "Comparer des fractions", nb: 5 },
    { type: "f6-addsous", titre: "Additionner et soustraire des fractions", etape: "Calculer avec des fractions", nb: 6 },
    { type: "f6-fois", titre: "Fraction d'une quantité, multiplier par un entier", etape: "Calculer avec des fractions", nb: 6 },
    { type: "f6-probleme", titre: "Problèmes avec des fractions", etape: "Calculer avec des fractions", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Quelle fraction de la bande est coloriée ?", figure: "f6-bande", choix: ["$\\dfrac{3}{4}$", "$\\dfrac{1}{4}$", "$\\dfrac{4}{3}$", "$\\dfrac{3}{1}$"], bonne: 0, explication: "La bande est partagée en $4$ parts égales et $3$ sont coloriées : $\\dfrac{3}{4}$." },
    { question: "Chaque bande est une unité. La partie coloriée représente :", figure: "f6-bande-7", choix: ["$\\dfrac{7}{4}$", "$\\dfrac{7}{8}$", "$\\dfrac{4}{7}$", "$\\dfrac{3}{4}$"], bonne: 0, explication: "Une unité est partagée en $4$ et on colorie $7$ quarts : $\\dfrac{7}{4} = 1 + \\dfrac{3}{4}$." },
    { question: "Dans la fraction $\\dfrac{5}{9}$, le dénominateur est :", choix: ["$9$", "$5$", "$\\dfrac{5}{9}$", "$4$"], bonne: 0, explication: "Le dénominateur est en bas : il dit en combien de parts on a partagé l'unité." },
    { question: "$\\dfrac{3}{4}$ est égal à :", choix: ["$3 \\div 4$", "$4 \\div 3$", "$3 - 4$", "$3{,}4$"], bonne: 0, explication: "Une fraction est un quotient : $\\dfrac{3}{4} = 3 \\div 4 = 0{,}75$." },
    { question: "Quel nombre complète l'égalité $7 \\times \\ldots = 3$ ?", choix: ["$\\dfrac{3}{7}$", "$\\dfrac{7}{3}$", "$4$", "$0{,}4$"], bonne: 0, explication: "Par définition, $\\dfrac{3}{7}$ est le nombre qui, multiplié par $7$, donne $3$." },
    { question: "$\\dfrac{3}{4} = $", choix: ["$0{,}75$", "$3{,}4$", "$0{,}34$", "$1{,}33$"], bonne: 0, explication: "$3 \\div 4 = 0{,}75$. $3{,}4$ est une erreur classique." },
    { question: "$\\dfrac{5}{2} = $", choix: ["$2{,}5$", "$5{,}2$", "$0{,}4$", "$2{,}05$"], bonne: 0, explication: "$5 \\div 2 = 2{,}5$." },
    { question: "Le nombre $\\dfrac{1}{3}$ est :", choix: ["un nombre qui n'est pas décimal", "égal à $0{,}3$", "égal à $0{,}33$", "un nombre entier"], bonne: 0, explication: "$1 \\div 3 = 0{,}333\\ldots$ : la division ne s'arrête jamais. $0{,}33$ n'est qu'une valeur approchée." },
    { question: "$\\dfrac{12}{4}$ est :", choix: ["un nombre entier", "un nombre décimal non entier", "un nombre non décimal", "plus petit que $1$"], bonne: 0, explication: "$\\dfrac{12}{4} = 12 \\div 4 = 3$." },
    { question: "Sur la figure, quelle est l'abscisse du point $N$ ?", figure: "f6-droite", choix: ["$\\dfrac{7}{5}$", "$\\dfrac{7}{10}$", "$\\dfrac{2}{5}$", "$\\dfrac{5}{7}$"], bonne: 0, explication: "L'unité est partagée en $5$ et $N$ est à $7$ graduations de $0$ : $\\dfrac{7}{5}$." },
    { question: "$\\dfrac{7}{5}$ est égal à :", choix: ["$1 + \\dfrac{2}{5}$", "$2 + \\dfrac{1}{5}$", "$1 + \\dfrac{7}{5}$", "$7 + \\dfrac{1}{5}$"], bonne: 0, explication: "$\\dfrac{7}{5} = \\dfrac{5}{5} + \\dfrac{2}{5} = 1 + \\dfrac{2}{5}$." },
    { question: "Quelle fraction est égale à $\\dfrac{3}{4}$ ?", choix: ["$\\dfrac{9}{12}$", "$\\dfrac{8}{9}$", "$\\dfrac{6}{4}$", "$\\dfrac{3}{8}$"], bonne: 0, explication: "$\\dfrac{3 \\times 3}{4 \\times 3} = \\dfrac{9}{12}$. $\\dfrac{8}{9}$ vient de l'erreur « ajouter $5$ en haut et en bas »." },
    { question: "$\\dfrac{20}{15}$ simplifiée s'écrit :", choix: ["$\\dfrac{4}{3}$", "$\\dfrac{5}{3}$", "$\\dfrac{2}{1}$", "$\\dfrac{4}{5}$"], bonne: 0, explication: "On divise en haut et en bas par $5$ : $\\dfrac{20 \\div 5}{15 \\div 5} = \\dfrac{4}{3}$." },
    { question: "Complète : $\\dfrac{5}{7} = \\dfrac{\\ldots}{42}$.", choix: ["$30$", "$40$", "$35$", "$6$"], bonne: 0, explication: "De $7$ à $42$, on multiplie par $6$ : $5 \\times 6 = 30$." },
    { question: "Quelle comparaison est juste ?", choix: ["$\\dfrac{3}{7} < \\dfrac{11}{21}$", "$\\dfrac{3}{7} > \\dfrac{11}{21}$", "$\\dfrac{3}{7} = \\dfrac{11}{21}$", "$\\dfrac{5}{8} > \\dfrac{7}{8}$"], bonne: 0, explication: "$\\dfrac{3}{7} = \\dfrac{9}{21}$ et $9 < 11$." },
    { question: "Laquelle de ces fractions est plus grande que $1$ ?", choix: ["$\\dfrac{9}{8}$", "$\\dfrac{8}{9}$", "$\\dfrac{3}{5}$", "$\\dfrac{7}{7}$"], bonne: 0, explication: "Son numérateur est plus grand que son dénominateur. $\\dfrac{7}{7} = 1$." },
    { question: "$\\dfrac{18}{5}$ est compris entre :", choix: ["$3$ et $4$", "$1$ et $2$", "$18$ et $19$", "$4$ et $5$"], bonne: 0, explication: "$15 < 18 < 20$, donc $\\dfrac{15}{5} < \\dfrac{18}{5} < \\dfrac{20}{5}$, soit $3 < \\dfrac{18}{5} < 4$." },
    { question: "L'ordre croissant de $\\dfrac{2}{3}$ ; $\\dfrac{5}{6}$ ; $\\dfrac{1}{6}$ est :", choix: ["$\\dfrac{1}{6} < \\dfrac{2}{3} < \\dfrac{5}{6}$", "$\\dfrac{2}{3} < \\dfrac{1}{6} < \\dfrac{5}{6}$", "$\\dfrac{1}{6} < \\dfrac{5}{6} < \\dfrac{2}{3}$", "$\\dfrac{5}{6} < \\dfrac{2}{3} < \\dfrac{1}{6}$"], bonne: 0, explication: "$\\dfrac{2}{3} = \\dfrac{4}{6}$ et $1 < 4 < 5$." },
    { question: "$\\dfrac{2}{7} + \\dfrac{4}{7} = $", choix: ["$\\dfrac{6}{7}$", "$\\dfrac{6}{14}$", "$\\dfrac{8}{7}$", "$\\dfrac{2}{7}$"], bonne: 0, explication: "Même dénominateur : on additionne les numérateurs et on garde le dénominateur." },
    { question: "$\\dfrac{3}{8} + \\dfrac{3}{4} = $", choix: ["$\\dfrac{9}{8}$", "$\\dfrac{6}{12}$", "$\\dfrac{6}{8}$", "$\\dfrac{9}{4}$"], bonne: 0, explication: "$\\dfrac{3}{4} = \\dfrac{6}{8}$, donc $\\dfrac{3}{8} + \\dfrac{6}{8} = \\dfrac{9}{8}$." },
    { question: "$\\dfrac{1}{2} + \\dfrac{1}{4} = $", choix: ["$\\dfrac{3}{4}$", "$\\dfrac{2}{6}$", "$\\dfrac{1}{6}$", "$\\dfrac{2}{4}$"], bonne: 0, explication: "$\\dfrac{1}{2} = \\dfrac{2}{4}$, donc $\\dfrac{2}{4} + \\dfrac{1}{4} = \\dfrac{3}{4}$." },
    { question: "$1 - \\dfrac{1}{4} = $", choix: ["$\\dfrac{3}{4}$", "$0$", "$\\dfrac{1}{3}$", "$\\dfrac{0}{4}$"], bonne: 0, explication: "$1 = \\dfrac{4}{4}$, donc $\\dfrac{4}{4} - \\dfrac{1}{4} = \\dfrac{3}{4}$." },
    { question: "$5 \\times \\dfrac{2}{7} = $", choix: ["$\\dfrac{10}{7}$", "$\\dfrac{10}{35}$", "$\\dfrac{7}{7}$", "$\\dfrac{2}{35}$"], bonne: 0, explication: "On multiplie le numérateur et on garde le dénominateur : $\\dfrac{5 \\times 2}{7}$." },
    { question: "Les $\\dfrac{2}{3}$ de $12$ œufs, c'est :", choix: ["$8$ œufs", "$4$ œufs", "$18$ œufs", "$6$ œufs"], bonne: 0, explication: "$12 \\div 3 = 4$, puis $4 \\times 2 = 8$." },
    { question: "Les $\\dfrac{3}{4}$ de $10$ m, c'est :", choix: ["$7{,}5$ m", "$7$ m", "$13{,}3$ m", "$2{,}5$ m"], bonne: 0, explication: "$\\dfrac{3}{4} \\times 10 = \\dfrac{30}{4} = 7{,}5$ m. $2{,}5$ m, c'est seulement le quart." },
    { question: "Dans une classe de $28$ élèves, les $\\dfrac{3}{4}$ viennent en bus. Combien ne viennent pas en bus ?", choix: ["$7$", "$21$", "$25$", "$4$"], bonne: 0, explication: "$\\dfrac{3}{4} \\times 28 = 21$ en bus, donc $28 - 21 = 7$ élèves ne viennent pas en bus." },
    { question: "Un champ : $\\dfrac{3}{8}$ en bananiers et $\\dfrac{1}{4}$ en manioc. Quelle fraction reste libre ?", choix: ["$\\dfrac{3}{8}$", "$\\dfrac{4}{12}$", "$\\dfrac{5}{8}$", "$\\dfrac{1}{2}$"], bonne: 0, explication: "$\\dfrac{1}{4} = \\dfrac{2}{8}$ ; planté : $\\dfrac{5}{8}$ ; libre : $\\dfrac{8}{8} - \\dfrac{5}{8} = \\dfrac{3}{8}$." },
    { question: "Quelle fraction de la pizza est coloriée ?", figure: "f6-qcm-pizza", choix: ["$\\dfrac{2}{3}$", "$\\dfrac{4}{2}$", "$\\dfrac{1}{3}$", "$\\dfrac{4}{10}$"], bonne: 0, explication: "$4$ parts sur $6$ sont coloriées : $\\dfrac{4}{6} = \\dfrac{2}{3}$. Les parts n'ont pas besoin d'être côte à côte." },
    { question: "Quelle fraction du rectangle est coloriée ?", figure: "f6-qcm-grille", choix: ["$\\dfrac{5}{12}$", "$\\dfrac{5}{7}$", "$\\dfrac{7}{12}$", "$\\dfrac{12}{5}$"], bonne: 0, explication: "Le rectangle est partagé en $3 \\times 4 = 12$ cases égales, dont $5$ sont coloriées : $\\dfrac{5}{12}$." },
    { question: "Un segment de $3$ unités est partagé en $4$ parts égales. Chaque part mesure :", figure: "f6-cours-quotient", choix: ["$\\dfrac{3}{4}$ d'unité", "$\\dfrac{4}{3}$ d'unité", "$\\dfrac{1}{4}$ d'unité", "$3{,}4$ unités"], bonne: 0, explication: "On partage $3$ en $4$ : $3 \\div 4 = \\dfrac{3}{4}$. C'est le quart de $3$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Lire une fraction sur une figure",
      etapes: [
        "Vérifie que l'unité est partagée en parts **égales**.",
        "Dénominateur : le nombre de parts dans **une** unité.",
        "Numérateur : le nombre de parts coloriées (on peut dépasser une unité)."
      ],
      figure: "f6-bande-7",
      exemple: "$7$ parts coloriées, l'unité partagée en $4$ : $\\dfrac{7}{4}$."
    },
    {
      titre: "Passer d'une fraction à l'écriture décimale",
      etapes: [
        "Une fraction est un quotient : $\\dfrac{a}{b} = a \\div b$.",
        "Pose la division décimale.",
        "Si elle ne s'arrête pas, le nombre n'est pas décimal : donne une valeur approchée, ou garde la fraction."
      ],
      figure: "f6-cours-quotient",
      exemple: "$\\dfrac{7}{4} = 1{,}75$ ; $\\dfrac{2}{3} = 0{,}666\\ldots \\approx 0{,}67$."
    },
    {
      titre: "Trouver une fraction égale",
      etapes: [
        "Cherche par quel nombre on passe d'un dénominateur (ou numérateur) à l'autre.",
        "Multiplie (ou divise) l'autre étage par le même nombre.",
        "Jamais d'addition ni de soustraction en haut et en bas."
      ],
      figure: "f6-cours-egales",
      exemple: "$\\dfrac{5}{7} = \\dfrac{30}{42}$ (on a multiplié par $6$)."
    },
    {
      titre: "Comparer deux fractions",
      etapes: [
        "Mets-les au même dénominateur.",
        "Compare les numérateurs.",
        "Pour comparer à $1$ : numérateur plus petit que le dénominateur, la fraction est plus petite que $1$."
      ],
      figure: "f6-cours-comparer",
      exemple: "$\\dfrac{3}{7} = \\dfrac{9}{21} < \\dfrac{11}{21}$."
    },
    {
      titre: "Additionner ou soustraire des fractions",
      etapes: [
        "Mets les fractions au même dénominateur (un entier $n$ s'écrit $\\dfrac{n \\times b}{b}$).",
        "Additionne ou soustrais les numérateurs, garde le dénominateur.",
        "Simplifie si c'est possible."
      ],
      figure: "f6-cours-addition",
      exemple: "$\\dfrac{4}{5} - \\dfrac{3}{10} = \\dfrac{8}{10} - \\dfrac{3}{10} = \\dfrac{5}{10} = \\dfrac{1}{2}$."
    },
    {
      titre: "Prendre une fraction d'une quantité",
      etapes: [
        "Divise la quantité par le dénominateur.",
        "Multiplie le résultat par le numérateur.",
        "Écris l'unité et fais une phrase."
      ],
      figure: "f6-cours-oeufs",
      exemple: "$\\dfrac{3}{5}$ de $40$ € : $40 \\div 5 = 8$, puis $8 \\times 3 = 24$ €."
    }
  ],
  erreurs: [
    "Compter des parts qui ne sont pas égales : une fraction suppose un partage en parts **égales**.",
    "Écrire $\\dfrac{3}{4} = 3{,}4$ : c'est $3 \\div 4 = 0{,}75$.",
    "Écrire $\\dfrac{1}{3} = 0{,}33$ : ce n'est qu'une valeur approchée.",
    "Compter les traits au lieu des intervalles sur une demi-droite graduée.",
    "Ajouter le même nombre en haut et en bas : $\\dfrac{3}{4} \\neq \\dfrac{8}{9}$.",
    "Additionner les dénominateurs : $\\dfrac{1}{2} + \\dfrac{1}{2} = 1$, pas $\\dfrac{2}{4}$.",
    "Multiplier aussi le dénominateur : $5 \\times \\dfrac{2}{7} = \\dfrac{10}{7}$, pas $\\dfrac{10}{35}$.",
    "Pour les $\\dfrac{3}{4}$ de $28$, s'arrêter au quart ($7$) : il faut encore multiplier par $3$."
  ]
};
