/*
  CHAPITRE : Première tronc commun — Suites géométriques (variation exponentielle, 1re partie)
  -------------------------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme de mathématiques intégré à l'enseignement scientifique de Première générale (BO n° 14 du 2 avril 2026),
  « Phénomènes d'évolution », partie « Variation exponentielle » : suites géométriques à termes strictement positifs
  (définition par récurrence, terme de rang n, sens de variation, représentation graphique) ; reconnaître et modéliser une
  croissance ou décroissance exponentielle discrète ; problème de seuil. Situations : intérêts composés, emprunt et dette,
  motifs évolutifs (triangle de Sierpinski), modèle de Malthus. Tableur pour calculer les termes.
  video : vidéos de la chaîne et d'Yvan Monka. Générateurs : préfixes qg-, qu- dans assets/exercices-tronc.js ; figures "qg-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["tronc-suites-geometriques"] = {
  niveau: "Première tronc commun",
  numero: 12,
  titre: "Suites géométriques : croissance exponentielle",
  accroche: "Multiplier toujours par le même nombre : un capital à intérêts composés, une population, des triangles de Sierpinski. Une croissance d'abord lente… puis explosive.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : suites géométriques (PDF)", url: "https://www.maths-et-tiques.fr/telech/20SuitesTT2.pdf" },
    { titre: "Cours d'Yvan Monka : les suites, chapitre 2 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Suites2TM.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Suite géométrique : on multiplie toujours par la même raison",
      figure: "qg-cours-sierpinski",
      video: { titre: "Vidéo de ton prof : suites géométriques, raison et terme général (cours 4/6)", youtube: "https://youtu.be/Nx56kUnM1oI" },
      texte:
        "Une suite est **géométrique** quand on passe d'un terme au suivant en **multipliant toujours par le même nombre** $q$, appelé **raison** :\n\n" +
        "$u(n + 1) = q \\times u(n)$ pour tout entier $n$.\n\n" +
        "Dans ce chapitre, les termes sont **strictement positifs** et $q > 0$. Pour reconnaître une suite géométrique, on calcule les quotients $\\dfrac{u(n + 1)}{u(n)}$ : ils doivent tous être égaux à $q$.\n\n" +
        "**Motif évolutif** : dans le triangle de Sierpinski, chaque triangle coloré est remplacé par $3$ triangles plus petits. Le nombre de triangles colorés, $1$, $3$, $9$, $27$…, est une suite géométrique de raison $3$.",
      exemple: {
        enonce: "La suite $80$ ; $40$ ; $20$ ; $10$ est-elle géométrique ?",
        solution: "Les quotients valent tous $\\dfrac{40}{80} = 0{,}5$ : oui, de raison $0{,}5$."
      }
    },
    {
      titre: "Terme de rang $n$",
      video: { titre: "Vidéo d'Yvan Monka : déterminer l'expression générale d'une suite géométrique", youtube: "https://youtu.be/WTmdtbQpa0c" },
      texte:
        "Pour aller de $u(0)$ à $u(n)$, on multiplie $n$ fois par la raison :\n\n" +
        "$u(n) = u(0) \\times q^n$.\n\n" +
        "Si la suite commence à $u(1)$ : $u(n) = u(1) \\times q^{n - 1}$. On calcule les puissances à la calculatrice.\n\n" +
        "Lien avec les **pourcentages** : augmenter de $t\\,\\%$ à chaque étape, c'est multiplier par $q = 1 + \\dfrac{t}{100}$ ; diminuer de $t\\,\\%$, multiplier par $q = 1 - \\dfrac{t}{100}$. Une évolution à **taux constant** se modélise donc par une suite géométrique.",
      exemple: {
        enonce: "Une ville de $20\\,000$ habitants gagne $3\\,\\%$ d'habitants par an. Population dans $10$ ans ?",
        solution: "$u(n) = 20\\,000 \\times 1{,}03^n$, donc $u(10) = 20\\,000 \\times 1{,}03^{10} \\approx 26\\,878$ habitants."
      }
    },
    {
      titre: "Sens de variation et représentation graphique",
      figure: "qg-cours-geo",
      video: { titre: "Vidéo d'Yvan Monka : déterminer le sens de variation d'une suite géométrique", youtube: "https://youtu.be/vLshnJqW-64" },
      texte:
        "Pour une suite géométrique à termes strictement positifs, de raison $q > 0$ :\n\n" +
        "- si $q > 1$, elle est **croissante** ;\n" +
        "- si $0 < q < 1$, elle est **décroissante** ;\n" +
        "- si $q = 1$, elle est **constante**.\n\n" +
        "Son nuage de points n'est **pas aligné** : les écarts entre deux points consécutifs sont de plus en plus grands (si $q > 1$) ou de plus en plus petits (si $q < 1$). C'est la signature d'une **croissance** (ou décroissance) **exponentielle**.",
      exemple: {
        enonce: "$u(n) = 500 \\times 0{,}8^n$. Sens de variation ?",
        solution: "$q = 0{,}8$, entre $0$ et $1$, termes positifs : la suite est décroissante (baisse de $20\\,\\%$ à chaque étape)."
      }
    },
    {
      titre: "Intérêts composés, dette, emprunt",
      video: { titre: "Vidéo d'Yvan Monka : résoudre un problème avec des pourcentages à l'aide d'une suite", youtube: "https://youtu.be/9Kox2DDd1wI" },
      texte:
        "**Intérêts composés** : chaque année, les intérêts s'ajoutent au capital et rapportent à leur tour. Un capital de $1\\,000$ € à $4\\,\\%$ devient $1\\,000 \\times 1{,}04^n$ après $n$ années. Comparaison sur $10$ ans :\n\n" +
        "- intérêts simples : $1\\,000 + 40 \\times 10 = 1\\,400$ € (suite arithmétique) ;\n" +
        "- intérêts composés : $1\\,000 \\times 1{,}04^{10} \\approx 1\\,480{,}24$ € (suite géométrique).\n\n" +
        "Sur une longue durée, l'écart devient énorme. C'est vrai aussi pour une **dette** qui n'est pas remboursée : ses intérêts produisent eux-mêmes des intérêts. Euler posait déjà ce genre de problème de remboursement au XVIIIᵉ siècle.\n\n" +
        "**Au tableur** : en B2 le capital de départ, en B3 la formule $\\texttt{=B2*1,04}$ recopiée vers le bas.",
      exemple: {
        enonce: "Une dette de $2\\,000$ € augmente de $5\\,\\%$ par an si on ne rembourse rien. Que vaut-elle au bout de $3$ ans ?",
        solution: "$2\\,000 \\times 1{,}05^3 = 2\\,315{,}25$ €."
      }
    },
    {
      titre: "Linéaire ou exponentiel ? Le modèle de Malthus",
      figure: "qg-cours-compare",
      video: { titre: "Vidéo de ton prof : linéaire ou exponentiel ? Les abonnés de Lagon propre (problème corrigé)", youtube: "https://youtu.be/eUVrDnmVZek" },
      texte:
        "- On **ajoute** toujours la même quantité : croissance **linéaire**, suite **arithmétique**, points alignés.\n" +
        "- On **multiplie** toujours par le même nombre (taux d'évolution constant) : croissance **exponentielle**, suite **géométrique**.\n\n" +
        "Au début, une croissance linéaire peut aller plus vite ; mais une croissance exponentielle (avec $q > 1$) finit **toujours** par la dépasser, et de très loin.\n\n" +
        "**Modèle de Malthus** ($1798$) : Malthus pensait que la population croît de façon géométrique (elle double en $25$ ans), alors que les ressources alimentaires ne croissent que de façon arithmétique. Avec $u(n) = 2^n$ (population) et $v(n) = 1 + n$ (ressources), en unités de départ : dès $n = 2$, la population dépasse les ressources. Ce modèle très simple a été démenti par les progrès agricoles, mais il montre la puissance de la croissance exponentielle.",
      exemple: {
        enonce: "Offre A : $100$ € de plus chaque mois à partir de $1\\,000$ €. Offre B : $+8\\,\\%$ par mois à partir de $1\\,000$ €. Au bout de $12$ mois ?",
        solution: "A : $1\\,000 + 1\\,200 = 2\\,200$ €. B : $1\\,000 \\times 1{,}08^{12} \\approx 2\\,518{,}17$ € : B a dépassé A."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "qg-recurrence", titre: "Calculer des termes (récurrence)", etape: "Géométriques", nb: 4 },
    { type: "qg-reconnaitre-geo", titre: "Reconnaître une suite géométrique", etape: "Géométriques", nb: 5 },
    { type: "qg-geo-terme", titre: "Terme de rang n", etape: "Géométriques", nb: 5 },
    { type: "qg-geo-raison", titre: "Trouver la raison", etape: "Géométriques", nb: 4 },
    { type: "qg-variation-geo", titre: "Sens de variation", etape: "Variations", nb: 4 },
    { type: "qg-graphique-geo", titre: "Lire le nuage de points", etape: "Variations", nb: 4 },
    { type: "qg-modele-geo", titre: "Évolutions à taux constant", etape: "Modéliser", nb: 5 },
    { type: "qg-interets", titre: "Intérêts composés", etape: "Modéliser", nb: 5 },
    { type: "qg-sierpinski", titre: "Triangle de Sierpinski", etape: "Modéliser", nb: 4 },
    { type: "qg-seuil", titre: "Problème de seuil", etape: "Modéliser", nb: 4 },
    { type: "qg-tableur", titre: "Suites géométriques au tableur", etape: "Modéliser", nb: 4 },
    { type: "qu-modeliser", titre: "Linéaire ou exponentiel ?", etape: "Comparer", nb: 4 },
    { type: "qg-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "La suite $3$ ; $6$ ; $12$ ; $24$ est :", choix: ["géométrique de raison $2$", "arithmétique de raison $3$", "géométrique de raison $3$", "ni l'une ni l'autre"], bonne: 0, explication: "On multiplie par $2$." },
    { question: "La suite $100$ ; $90$ ; $81$ ; $72{,}9$ est géométrique de raison :", choix: ["$0{,}9$", "$-10$", "$0{,}1$", "$1{,}1$"], bonne: 0, explication: "$\\dfrac{90}{100} = 0{,}9$." },
    { question: "$u(0) = 5$ et $u(n + 1) = 3u(n)$. Alors $u(3)$ vaut :", choix: ["$135$", "$45$", "$14$", "$15$"], bonne: 0, explication: "$5 \\times 3^3$." },
    { question: "Une suite géométrique a pour premier terme $u(0) = 200$ et pour raison $1{,}5$. Alors $u(n)$ vaut :", choix: ["$200 \\times 1{,}5^n$", "$200 + 1{,}5n$", "$1{,}5 \\times 200^n$", "$200 \\times 1{,}5n$"], bonne: 0, explication: "$u(n) = u(0) \\times q^n$." },
    { question: "Augmenter de $6\\,\\%$ par an correspond à une suite géométrique de raison :", choix: ["$1{,}06$", "$0{,}06$", "$6$", "$1{,}6$"], bonne: 0, explication: "$1 + \\dfrac{6}{100}$." },
    { question: "Diminuer de $15\\,\\%$ par an correspond à une raison :", choix: ["$0{,}85$", "$0{,}15$", "$-0{,}15$", "$1{,}15$"], bonne: 0, explication: "$1 - \\dfrac{15}{100}$." },
    { question: "Une suite géométrique à termes positifs de raison $0{,}7$ est :", choix: ["décroissante", "croissante", "constante", "ni croissante ni décroissante"], bonne: 0, explication: "$0 < q < 1$." },
    { question: "Les points d'une suite géométrique de raison $2$ :", choix: ["ne sont pas alignés et s'écartent de plus en plus", "sont alignés", "sont sur une droite horizontale", "descendent"], bonne: 0, explication: "Croissance exponentielle." },
    { question: "$u(2) = 12$ et $u(3) = 18$ pour une suite géométrique. La raison est :", choix: ["$1{,}5$", "$6$", "$0{,}67$", "$2$"], bonne: 0, explication: "$\\dfrac{18}{12}$." },
    { question: "$1\\,000$ € placés à $5\\,\\%$ à intérêts composés valent après $2$ ans :", choix: ["$1\\,102{,}50$ €", "$1\\,100$ €", "$1\\,050$ €", "$1\\,010$ €"], bonne: 0, explication: "$1\\,000 \\times 1{,}05^2$." },
    { question: "Les intérêts composés rapportent, par rapport aux intérêts simples au même taux :", choix: ["plus, à partir de la 2e année", "moins", "autant", "plus seulement la 1re année"], bonne: 0, explication: "Les intérêts produisent des intérêts." },
    { question: "Dans le triangle de Sierpinski, le nombre de triangles colorés à l'étape $4$ est :", choix: ["$81$", "$12$", "$64$", "$27$"], bonne: 0, explication: "$3^4$." },
    { question: "Dans un tableur, B2 contient $u(0)$. Pour une suite géométrique de raison $1{,}2$, on saisit en B3 :", choix: ["$\\texttt{=B2*1,2}$", "$\\texttt{=B2+1,2}$", "$\\texttt{=B2*0,2}$", "$\\texttt{=1,2*A2}$"], bonne: 0, explication: "Terme précédent multiplié par la raison." },
    { question: "$u(n) = 50 \\times 2^n$. Le premier rang $n$ tel que $u(n) > 1\\,000$ est :", choix: ["$5$", "$4$", "$20$", "$6$"], bonne: 0, explication: "$u(4) = 800$ et $u(5) = 1\\,600$." },
    { question: "Une grandeur passe de $400$ à $460$ puis à $529$. Elle évolue :", choix: ["à taux constant de $15\\,\\%$", "de $60$ à chaque fois", "à taux constant de $60\\,\\%$", "de façon linéaire"], bonne: 0, explication: "$\\dfrac{460}{400} = \\dfrac{529}{460} = 1{,}15$." },
    { question: "Selon Malthus, la population croît :", choix: ["de façon géométrique", "de façon arithmétique", "de façon constante", "de façon décroissante"], bonne: 0, explication: "Elle doublerait à intervalles réguliers." },
    { question: "Une croissance de $+10$ par an et une croissance de $+10\\,\\%$ par an, à partir de $100$ :", choix: ["donnent la même valeur la 1re année, puis la seconde l'emporte", "donnent toujours la même valeur", "la première l'emporte toujours", "la seconde est linéaire"], bonne: 0, explication: "$110$ dans les deux cas, puis $120$ contre $121$, etc." },
    { question: "$u(n) = 3 \\times 0{,}5^n$. Alors $u(0)$ vaut :", choix: ["$3$", "$1{,}5$", "$0$", "$0{,}5$"], bonne: 0, explication: "$0{,}5^0 = 1$." },
    { question: "$u(1) = 4$ et raison $3$. Alors $u(5)$ vaut :", choix: ["$324$", "$972$", "$16$", "$60$"], bonne: 0, explication: "$4 \\times 3^4$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Reconnaître une suite géométrique",
      etapes: [
        "Calculer les quotients de termes consécutifs : $\\dfrac{u(1)}{u(0)}$, $\\dfrac{u(2)}{u(1)}$, …",
        "S'ils sont tous égaux à $q$, la suite est géométrique de raison $q$.",
        "Avec une formule $u(n) = k \\times q^n$ : géométrique de raison $q$.",
        "Dans un énoncé : « augmente (ou diminue) de $t\\,\\%$ chaque … » : raison $1 \\pm \\dfrac{t}{100}$."
      ],
      exemple: "$2$ ; $5$ ; $12{,}5$ : quotients $2{,}5$ : raison $2{,}5$."
    },
    {
      titre: "Calculer un terme et un seuil",
      etapes: [
        "Écrire $u(n) = u(0) \\times q^n$ (ou $u(1) \\times q^{n - 1}$).",
        "Calculer à la calculatrice la puissance demandée.",
        "Pour un seuil, faire défiler les termes (calculatrice, tableur) jusqu'à dépasser la valeur.",
        "Donner le premier rang qui convient, en citant $u(n - 1)$ et $u(n)$."
      ],
      exemple: "$u(n) = 100 \\times 1{,}2^n > 300$ : $u(6) \\approx 298{,}6$ et $u(7) \\approx 358{,}3$, donc $n = 7$."
    },
    {
      titre: "Choisir entre linéaire et exponentiel",
      figure: "qg-cours-compare",
      etapes: [
        "Même quantité ajoutée à chaque étape : suite arithmétique.",
        "Même pourcentage (même facteur) à chaque étape : suite géométrique.",
        "Sur un graphique : points alignés (linéaire) ou de plus en plus écartés (exponentiel).",
        "Écrire la formule et la vérifier sur les premiers termes."
      ],
      exemple: "Intérêts simples : $C(n) = C_0 + nI$ ; intérêts composés : $C(n) = C_0 \\times q^n$."
    }
  ],
  erreurs: [
    "Ajouter la raison au lieu de multiplier.",
    "Écrire $q = 0{,}05$ pour une hausse de $5\\,\\%$ au lieu de $q = 1{,}05$.",
    "Calculer $q \\times n$ au lieu de $q^n$.",
    "Écrire $u(n) = u(1) \\times q^n$ quand la suite commence à $u(1)$ : c'est $q^{n - 1}$.",
    "Croire qu'une suite géométrique de raison $0{,}9$ est croissante.",
    "Confondre intérêts simples (on ajoute) et intérêts composés (on multiplie).",
    "Sous-estimer la croissance exponentielle sur une longue durée."
  ]
};
