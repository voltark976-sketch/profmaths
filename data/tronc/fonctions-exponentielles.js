/*
  CHAPITRE : Première tronc commun — Fonctions exponentielles x ↦ aˣ (variation exponentielle, 2e partie)
  -------------------------------------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme de mathématiques intégré à l'enseignement scientifique de Première générale (BO n° 14 du 2 avril 2026),
  « Phénomènes d'évolution », partie « Variation exponentielle » : fonction x ↦ aˣ (a > 0, x ⩾ 0) comme prolongement des
  suites géométriques ; propriétés algébriques (admises) ; variations ; représentation graphique ; cas de l'exposant 1/n ;
  taux d'évolution moyen sur n évolutions ; ordres de grandeur ; problèmes de seuil. Situations : capital au bout d'une
  fraction d'année, élimination d'une substance, demi-vie et carbone 14, R0 d'un virus.
  video : vidéos d'Yvan Monka. Générateurs : préfixe qe- dans assets/exercices-tronc.js ; figures "qe-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["tronc-fonctions-exponentielles"] = {
  niveau: "Première tronc commun",
  numero: 13,
  titre: "Fonctions exponentielles : de la suite géométrique à la courbe",
  accroche: "Combien vaut un capital au bout de $6$ mois ? Que reste-t-il d'un médicament après $2{,}5$ heures ? En « remplissant les trous » entre les termes d'une suite géométrique, on obtient la fonction $x \\mapsto a^x$.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : fonctions exponentielles (PDF)", url: "https://www.maths-et-tiques.fr/telech/20ExpTT.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Prolonger une suite géométrique",
      figure: "qe-cours-points",
      video: { titre: "Vidéo d'Yvan Monka : calculer une moyenne géométrique de deux nombres", youtube: "https://youtu.be/w_Vj2URV1Qo" },
      texte:
        "La suite géométrique $u(n) = 2^n$ donne les points $(0\\,;1)$, $(1\\,;2)$, $(2\\,;4)$, $(3\\,;8)$… Que mettre **entre** ces points, par exemple pour $x = 0{,}5$ ?\n\n" +
        "On veut garder la règle des puissances : $2^{0{,}5} \\times 2^{0{,}5} = 2^1 = 2$. Donc $2^{0{,}5}$ est le nombre positif dont le carré vaut $2$ : $2^{0{,}5} = \\sqrt{2} \\approx 1{,}414$. C'est la **moyenne géométrique** de $2^0 = 1$ et $2^1 = 2$.\n\n" +
        "En continuant ainsi, on définit $a^x$ pour tout réel $x \\geqslant 0$ (avec $a > 0$) ; la calculatrice le calcule avec la touche puissance. La fonction $x \\mapsto a^x$ est la **fonction exponentielle de base $a$** : sa courbe relie « sans trou » les points de la suite géométrique $a^n$.",
      exemple: {
        enonce: "Calcule $4^{0{,}5}$, puis donne une valeur approchée de $1{,}05^{2{,}5}$.",
        solution: "$4^{0{,}5} = 2$ car $2^2 = 4$. À la calculatrice : $1{,}05^{2{,}5} \\approx 1{,}13$."
      }
    },
    {
      titre: "Règles de calcul",
      video: { titre: "Vidéo d'Yvan Monka : effectuer des calculs de puissances", youtube: "https://youtu.be/cY6xdxT7kLM" },
      texte:
        "Pour $a > 0$, $b > 0$ et des exposants positifs, on admet les mêmes règles que pour les puissances entières :\n\n" +
        "- $a^0 = 1$ et $a^1 = a$ ;\n" +
        "- $a^x \\times a^y = a^{x + y}$ ;\n" +
        "- $\\dfrac{a^x}{a^y} = a^{x - y}$ (pour $x \\geqslant y$) ;\n" +
        "- $\\left(a^x\\right)^y = a^{xy}$ ;\n" +
        "- $a^x \\times b^x = (ab)^x$.\n\n" +
        "**Exposant $\\dfrac{1}{n}$** : $a^{\\frac{1}{n}}$ est le nombre positif dont la puissance $n$-ième vaut $a$, car $\\left(a^{\\frac{1}{n}}\\right)^n = a^1 = a$. Ainsi $8^{\\frac{1}{3}} = 2$, $81^{\\frac{1}{4}} = 3$, et $a^{\\frac{1}{2}} = \\sqrt{a}$.",
      exemple: {
        enonce: "Simplifie $3^{1{,}5} \\times 3^{2{,}5}$, puis calcule $27^{\\frac{2}{3}}$.",
        solution: "$3^{1{,}5 + 2{,}5} = 3^4 = 81$. $27^{\\frac{1}{3}} = 3$, donc $27^{\\frac{2}{3}} = 3^2 = 9$."
      }
    },
    {
      titre: "Variations et courbe",
      figure: "qe-cours-courbes",
      video: { titre: "Vidéo d'Yvan Monka : étudier les variations d'une fonction exponentielle", youtube: "https://youtu.be/YQoR7CFM_1U" },
      texte:
        "Comme les suites géométriques de même raison, la fonction $x \\mapsto a^x$ (avec $a > 0$) est :\n\n" +
        "- **croissante** si $a > 1$ ;\n" +
        "- **décroissante** si $0 < a < 1$ ;\n" +
        "- **constante** (égale à $1$) si $a = 1$.\n\n" +
        "Toutes ces courbes passent par le point $(0\\,;1)$, car $a^0 = 1$, et par $(1\\,;a)$. Les valeurs sont toujours strictement positives.\n\n" +
        "On en déduit des comparaisons sans calculatrice : comme $1{,}2 > 1$, $1{,}2^{2{,}5} < 1{,}2^{3}$ ; comme $0{,}6 < 1$, $0{,}6^{2{,}5} > 0{,}6^{3}$.",
      exemple: {
        enonce: "Une grandeur diminue de $8\\,\\%$ par an : $f(x) = 500 \\times 0{,}92^x$. Sens de variation ?",
        solution: "$0{,}92 < 1$ : $x \\mapsto 0{,}92^x$ est décroissante, et $f$ aussi (on multiplie par $500 > 0$)."
      }
    },
    {
      titre: "Fractions de période : capital, médicament, radioactivité",
      video: { titre: "Vidéo d'Yvan Monka : utiliser une fonction exponentielle pour résoudre un problème", youtube: "https://youtu.be/maK64g-y3gA" },
      texte:
        "La fonction exponentielle donne une valeur **entre** deux étapes de la suite géométrique.\n\n" +
        "- **Capital** placé à $4\\,\\%$ par an (intérêts composés) : au bout de $x$ années, $C(x) = C_0 \\times 1{,}04^x$. Après $6$ mois ($x = 0{,}5$) : $1\\,000 \\times 1{,}04^{0{,}5} \\approx 1\\,019{,}80$ €.\n" +
        "- **Médicament** éliminé à $20\\,\\%$ par heure : il reste $D \\times 0{,}8^t$ après $t$ heures.\n" +
        "- **Radioactivité** : le nombre de noyaux est divisé par $2$ à chaque **demi-vie** $T$. Après $t$ ans, il reste $N_0 \\times 0{,}5^{\\frac{t}{T}}$. Pour le carbone 14 ($T \\approx 5\\,700$ ans), après $2\\,850$ ans (une demi-demi-vie) il reste $0{,}5^{0{,}5} \\approx 71\\,\\%$ des noyaux, et non $75\\,\\%$ : c'est ainsi qu'on **date** des objets anciens.",
      exemple: {
        enonce: "Il reste $200 \\times 0{,}8^t$ mg d'un médicament après $t$ heures. Combien après $1$ h $30$ ?",
        solution: "$t = 1{,}5$ : $200 \\times 0{,}8^{1{,}5} \\approx 143{,}11$ mg."
      }
    },
    {
      titre: "Taux d'évolution moyen",
      video: { titre: "Vidéo d'Yvan Monka : calculer un taux d'évolution moyen", youtube: "https://youtu.be/8ocIhl-SFuQ" },
      texte:
        "Si une grandeur a été multipliée par un coefficient global $C$ en $n$ périodes, le **coefficient moyen** $c$ est celui qui, appliqué $n$ fois, donne le même résultat : $c^n = C$, donc\n\n" +
        "$c = C^{\\frac{1}{n}}$ et le **taux moyen** est $t = (c - 1) \\times 100$.\n\n" +
        "Exemple : un prix augmente de $21\\,\\%$ en $2$ ans. $C = 1{,}21$, $c = 1{,}21^{\\frac{1}{2}} = 1{,}1$ : hausse moyenne de $10\\,\\%$ par an, et non $10{,}5\\,\\%$. On ne divise jamais un taux global par le nombre de périodes.",
      exemple: {
        enonce: "Une population passe de $10\\,000$ à $12\\,000$ habitants en $5$ ans. Taux annuel moyen ?",
        solution: "$C = 1{,}2$ et $c = 1{,}2^{\\frac{1}{5}} \\approx 1{,}0371$ : environ $+3{,}71\\,\\%$ par an."
      }
    },
    {
      titre: "Ordres de grandeur et seuils",
      video: { titre: "Vidéo d'Yvan Monka : utiliser une fonction exponentielle pour résoudre un problème", youtube: "https://youtu.be/maK64g-y3gA" },
      texte:
        "Une croissance exponentielle dépasse vite l'intuition. Un virus de taux de reproduction $R_0 = 3$ (chaque malade en contamine $3$) : à la génération $10$, $3^{10} = 59\\,049$ personnes, soit de l'ordre de $10^4$, à partir d'une seule personne. Une feuille de $0{,}1$ mm pliée $20$ fois atteindrait $0{,}1 \\times 2^{20} \\approx 105$ m !\n\n" +
        "**Seuil** : pour savoir quand $a^x$ dépasse (ou passe sous) une valeur, on fait défiler un **tableau de valeurs** à la calculatrice ou au tableur, ou on lit la courbe. Par exemple, avec $+5\\,\\%$ par an, $1{,}05^{14} \\approx 1{,}98$ et $1{,}05^{15} \\approx 2{,}08$ : un capital double en $15$ ans environ.",
      exemple: {
        enonce: "Un polluant diminue de $10\\,\\%$ par mois. Au bout de combien de mois entiers en reste-t-il moins de la moitié ?",
        solution: "$0{,}9^6 \\approx 0{,}53$ et $0{,}9^7 \\approx 0{,}48$ : au bout de $7$ mois."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "qe-calculer", titre: "Calculer une puissance à la calculatrice", etape: "Définir", nb: 4 },
    { type: "qe-racine", titre: "Exposants 1/n", etape: "Définir", nb: 5 },
    { type: "qe-proprietes", titre: "Règles de calcul", etape: "Calculer", nb: 5 },
    { type: "qe-variations", titre: "Sens de variation, comparer", etape: "Variations", nb: 5 },
    { type: "qe-courbe", titre: "Reconnaître une courbe", etape: "Variations", nb: 4 },
    { type: "qe-modele", titre: "Modéliser une évolution", etape: "Modéliser", nb: 4 },
    { type: "qe-fraction", titre: "Fractions de période", etape: "Modéliser", nb: 5 },
    { type: "qe-taux-moyen", titre: "Taux d'évolution moyen", etape: "Modéliser", nb: 5 },
    { type: "qe-seuil", titre: "Problèmes de seuil", etape: "Modéliser", nb: 4 },
    { type: "qe-ordre-grandeur", titre: "Ordres de grandeur", etape: "Modéliser", nb: 4 },
    { type: "qe-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Pour tout $a > 0$, $a^0$ vaut :", choix: ["$1$", "$0$", "$a$", "on ne peut pas savoir"], bonne: 0, explication: "Toutes les courbes passent par $(0\\,;1)$." },
    { question: "$9^{0{,}5}$ vaut :", choix: ["$3$", "$4{,}5$", "$81$", "$0{,}5$"], bonne: 0, explication: "C'est $\\sqrt{9}$." },
    { question: "$125^{\\frac{1}{3}}$ vaut :", choix: ["$5$", "$41{,}7$", "$25$", "$375$"], bonne: 0, explication: "$5^3 = 125$." },
    { question: "$5^{1{,}2} \\times 5^{0{,}8}$ est égal à :", choix: ["$25$", "$5^{0{,}96}$", "$25^{2}$", "$5$"], bonne: 0, explication: "$5^{1{,}2 + 0{,}8} = 5^2$." },
    { question: "$\\left(2^{1{,}5}\\right)^2$ est égal à :", choix: ["$8$", "$2^{3{,}5}$", "$4^{1{,}5}$ seulement", "$6$"], bonne: 0, explication: "$2^{1{,}5 \\times 2} = 2^3$." },
    { question: "$\\dfrac{7^{3{,}5}}{7^{1{,}5}}$ est égal à :", choix: ["$49$", "$7$", "$7^{5}$", "$1$"], bonne: 0, explication: "$7^{3{,}5 - 1{,}5} = 7^2$." },
    { question: "$2^{x} \\times 5^{x}$ est égal à :", choix: ["$10^x$", "$7^x$", "$10^{2x}$", "$7^{2x}$"], bonne: 0, explication: "$a^x \\times b^x = (ab)^x$." },
    { question: "La fonction $x \\mapsto 1{,}3^x$ est :", choix: ["croissante", "décroissante", "constante", "croissante puis décroissante"], bonne: 0, explication: "$1{,}3 > 1$." },
    { question: "La fonction $x \\mapsto 0{,}75^x$ est :", choix: ["décroissante", "croissante", "constante", "négative"], bonne: 0, explication: "$0 < 0{,}75 < 1$." },
    { question: "Sans calculatrice, on peut affirmer que :", choix: ["$0{,}9^{2{,}1} > 0{,}9^{3}$", "$0{,}9^{2{,}1} < 0{,}9^{3}$", "$0{,}9^{2{,}1} = 0{,}9^{3}$", "on ne peut pas comparer"], bonne: 0, explication: "Base inférieure à $1$ : la fonction est décroissante." },
    { question: "La courbe de $x \\mapsto a^x$ passe toujours par :", choix: ["$(0\\,;1)$", "$(0\\,;0)$", "$(1\\,;1)$", "$(1\\,;0)$"], bonne: 0, explication: "$a^0 = 1$." },
    { question: "$1\\,000$ € placés à $4\\,\\%$ par an (intérêts composés) valent, après $6$ mois, environ :", choix: ["$1\\,019{,}80$ €", "$1\\,020$ €", "$1\\,040$ €", "$1\\,002$ €"], bonne: 0, explication: "$1\\,000 \\times 1{,}04^{0{,}5}$." },
    { question: "Une hausse globale de $44\\,\\%$ en $2$ ans correspond à un taux annuel moyen de :", choix: ["$20\\,\\%$", "$22\\,\\%$", "$44\\,\\%$", "$12\\,\\%$"], bonne: 0, explication: "$1{,}44^{0{,}5} = 1{,}2$." },
    { question: "Le coefficient moyen sur $n$ périodes d'un coefficient global $C$ est :", choix: ["$C^{\\frac{1}{n}}$", "$\\dfrac{C}{n}$", "$C^n$", "$C - n$"], bonne: 0, explication: "Il vérifie $c^n = C$." },
    { question: "Après une demi-vie et demie, il reste une proportion de noyaux égale à :", choix: ["$0{,}5^{1{,}5} \\approx 0{,}35$", "$0{,}25$", "$0{,}75$", "$0{,}5 \\times 1{,}5$"], bonne: 0, explication: "Il reste $0{,}5^{\\frac{t}{T}}$." },
    { question: "Un virus avec $R_0 = 2$ : à la génération $10$, partant d'une personne, environ :", choix: ["$1\\,000$ personnes", "$20$ personnes", "$100$ personnes", "$1\\,000\\,000$ de personnes"], bonne: 0, explication: "$2^{10} = 1\\,024$." },
    { question: "Une grandeur qui augmente de $7\\,\\%$ par an double en environ :", choix: ["$10$ ans", "$14$ ans", "$7$ ans", "$100$ ans"], bonne: 0, explication: "$1{,}07^{10} \\approx 1{,}97$ et $1{,}07^{11} \\approx 2{,}10$." },
    { question: "Une voiture perd $15\\,\\%$ de sa valeur par an. Sa valeur après $x$ années est modélisée par :", choix: ["$V_0 \\times 0{,}85^x$", "$V_0 \\times 0{,}15^x$", "$V_0 - 15x$", "$V_0 \\times 1{,}15^x$"], bonne: 0, explication: "On multiplie par $1 - 0{,}15$ chaque année." },
    { question: "La fonction $x \\mapsto a^x$ prolonge la suite :", choix: ["géométrique $a^n$", "arithmétique $a + n$", "constante égale à $a$", "$n^a$"], bonne: 0, explication: "Elle prend les valeurs $a^n$ aux entiers." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer avec des exposants non entiers",
      etapes: [
        "Même base : additionner (produit) ou soustraire (quotient) les exposants.",
        "Puissance d'une puissance : multiplier les exposants.",
        "Exposant $\\dfrac{1}{n}$ : chercher le nombre positif dont la puissance $n$-ième vaut la base.",
        "Sinon, calculer à la calculatrice avec la touche puissance."
      ],
      exemple: "$16^{0{,}75} = \\left(16^{\\frac{1}{4}}\\right)^3 = 2^3 = 8$."
    },
    {
      titre: "Modéliser une évolution exponentielle",
      figure: "qe-cours-courbes",
      etapes: [
        "Repérer un taux d'évolution constant $t\\,\\%$ par période.",
        "Coefficient $a = 1 + \\dfrac{t}{100}$ (hausse) ou $1 - \\dfrac{t}{100}$ (baisse).",
        "Écrire $f(x) = V_0 \\times a^x$, avec $x$ en périodes (même non entier).",
        "Sens de variation : croissante si $a > 1$, décroissante si $a < 1$."
      ],
      exemple: "Baisse de $20\\,\\%$ par heure à partir de $200$ mg : $f(t) = 200 \\times 0{,}8^t$, décroissante."
    },
    {
      titre: "Calculer un taux d'évolution moyen",
      etapes: [
        "Calculer le coefficient global $C$ (valeur finale divisée par valeur initiale).",
        "Coefficient moyen : $c = C^{\\frac{1}{n}}$ pour $n$ périodes.",
        "Taux moyen : $(c - 1) \\times 100$.",
        "Vérifier : $c^n$ redonne $C$."
      ],
      exemple: "$+30\\,\\%$ en $3$ ans : $c = 1{,}3^{\\frac{1}{3}} \\approx 1{,}0914$, soit environ $+9{,}14\\,\\%$ par an."
    }
  ],
  erreurs: [
    "Confondre $a^x$ et $a \\times x$ : $3^{0{,}5} \\approx 1{,}73$, pas $1{,}5$.",
    "Multiplier les exposants au lieu de les additionner dans $a^x \\times a^y$.",
    "Diviser un taux global par le nombre de périodes pour obtenir le taux moyen.",
    "Croire qu'après une demi-demi-vie il reste $75\\,\\%$ des noyaux.",
    "Juger le sens de variation sur le coefficient devant la puissance au lieu de la base.",
    "Exprimer $x$ en mois alors que le taux est annuel (il faut $x = \\dfrac{\\text{mois}}{12}$).",
    "Sous-estimer une croissance exponentielle sur une longue durée."
  ]
};
