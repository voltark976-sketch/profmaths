/*
  CHAPITRE : Première tronc commun — Fonctions affines (variation linéaire)
  -------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme de mathématiques intégré à l'enseignement scientifique de Première générale (BO n° 14 du 2 avril 2026),
  « Phénomènes d'évolution », partie « Variation linéaire » : fonctions affines (remobilisation de la Seconde, travail
  succinct) : représentation graphique, sens de variation, lien entre taux d'accroissement et coefficient directeur ;
  reconnaître et modéliser une croissance linéaire continue ; problème de seuil ; parallèle avec les suites arithmétiques.
  Situations : degrés Celsius et Fahrenheit, offre et demande (point d'équilibre), barème d'impôt affine par morceaux
  (taux marginal, taux moyen ; barème simplifié et fictif), niveau des océans.
  video : vidéos de la chaîne et d'Yvan Monka. Générateurs : préfixe qd- dans assets/exercices-tronc.js ; figures "qd-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["tronc-fonctions-affines"] = {
  niveau: "Première tronc commun",
  numero: 10,
  titre: "Fonctions affines : modéliser une variation linéaire",
  accroche: "Températures en Fahrenheit, prix d'équilibre d'un marché, impôt par tranches : quand une grandeur varie toujours au même rythme, une fonction affine $f(x) = mx + p$ la décrit.",

  playlist: "",
  drive: "",
  pdfs: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Fonction affine : rappels",
      video: { titre: "Vidéo de ton prof : fonction affine, définition, droite et taux d'accroissement (cours)", youtube: "https://youtu.be/WKrmfnGNrgE" },
      texte:
        "Une **fonction affine** est définie sur $\\mathbb{R}$ par $f(x) = mx + p$, où $m$ et $p$ sont deux nombres fixés.\n\n" +
        "- Sa représentation graphique est une **droite** d'équation $y = mx + p$.\n" +
        "- $p = f(0)$ est l'**ordonnée à l'origine** : la valeur de départ.\n" +
        "- $m$ est le **coefficient directeur** : la variation de $f(x)$ quand $x$ augmente de $1$.\n\n" +
        "Cas particuliers : si $p = 0$, $f(x) = mx$ est **linéaire** (situation de proportionnalité, la droite passe par l'origine) ; si $m = 0$, $f$ est **constante** (droite horizontale).",
      exemple: {
        enonce: "Un taxi facture $4$ € de prise en charge et $1{,}5$ € par km. Exprime le prix $f(x)$ d'une course de $x$ km et calcule $f(12)$.",
        solution: "$f(x) = 1{,}5x + 4$ ; $f(12) = 18 + 4 = 22$ €."
      }
    },
    {
      titre: "Taux d'accroissement et coefficient directeur",
      video: { titre: "Vidéo d'Yvan Monka : équation de droite connaissant deux points", youtube: "https://youtu.be/tfagLy6QRuw" },
      texte:
        "Pour une fonction affine, le **taux d'accroissement** entre deux nombres $a$ et $b$ ($a \\neq b$) est toujours le même, et il est égal au coefficient directeur :\n\n" +
        "$\\dfrac{f(b) - f(a)}{b - a} = m$.\n\n" +
        "C'est ce qui caractérise une **croissance linéaire** : la grandeur augmente (ou diminue) **de la même quantité** pour chaque unité de $x$. On trouve donc $m$ à partir de deux valeurs connues, puis $p$ avec l'une d'elles.\n\n" +
        "Exemple : $f(2) = 7$ et $f(5) = 16$ donnent $m = \\dfrac{16 - 7}{5 - 2} = 3$, puis $7 = 3 \\times 2 + p$, donc $p = 1$ : $f(x) = 3x + 1$.",
      exemple: {
        enonce: "L'eau gèle à $0$ °C, soit $32$ °F, et bout à $100$ °C, soit $212$ °F. Exprime la température $F$ en °F en fonction de $C$ en °C.",
        solution: "$m = \\dfrac{212 - 32}{100 - 0} = 1{,}8$ et $p = 32$ : $F = 1{,}8C + 32$. Ainsi $30$ °C donnent $86$ °F."
      }
    },
    {
      titre: "Sens de variation",
      figure: "qd-cours-equilibre",
      video: { titre: "Vidéo de ton prof : variations et signe d'une fonction affine (cours)", youtube: "https://youtu.be/M6V8r6jItOU" },
      texte:
        "Le sens de variation d'une fonction affine ne dépend que du **signe de $m$** :\n\n" +
        "- $m > 0$ : $f$ est **croissante** sur $\\mathbb{R}$ (la droite monte) ;\n" +
        "- $m < 0$ : $f$ est **décroissante** (la droite descend) ;\n" +
        "- $m = 0$ : $f$ est **constante**.\n\n" +
        "**Lien avec les suites arithmétiques** : la suite $u(n) = mn + p$ prend les valeurs de $f$ aux entiers ; elle a la même « pente » (sa raison est $m$) et le même sens de variation. La suite modélise une évolution par étapes, la fonction une évolution **continue**.\n\n" +
        "**Offre et demande** : sur un marché, l'offre $O(x)$ augmente avec le prix $x$ (droite croissante) et la demande $D(x)$ diminue (droite décroissante). Le **prix d'équilibre** est celui où $O(x) = D(x)$ : l'abscisse du point d'intersection des deux droites.",
      exemple: {
        enonce: "Offre $O(x) = 20x$, demande $D(x) = 300 - 10x$. Prix d'équilibre ?",
        solution: "$20x = 300 - 10x$ donne $30x = 300$, soit $x = 10$ € ; quantité échangée $O(10) = 200$."
      }
    },
    {
      titre: "Modéliser et résoudre un problème de seuil",
      video: { titre: "Vidéo d'Yvan Monka : déterminer graphiquement une fonction affine", youtube: "https://youtu.be/OnnrfqztpTY" },
      texte:
        "Pour modéliser une situation de **croissance linéaire continue** :\n\n" +
        "1. identifier la valeur de départ ($p$) et la variation par unité ($m$) ;\n" +
        "2. écrire $f(x) = mx + p$ et préciser l'unité de $x$ ;\n" +
        "3. vérifier avec une valeur connue.\n\n" +
        "Exemple : le niveau moyen des océans monte d'environ $4$ mm par an. Si on prend $30$ mm (par rapport à un repère) en $2000$, le modèle est $f(x) = 4x + 30$, avec $x$ le nombre d'années après $2000$.\n\n" +
        "**Seuil** : quand le niveau dépassera-t-il $150$ mm ? $4x + 30 > 150$ donne $x > 30$ : après $2030$. Un modèle linéaire n'est valable que tant que le rythme reste le même : il faut toujours le critiquer.",
      exemple: {
        enonce: "Une citerne de $1\\,200$ L perd $40$ L par jour. Au bout de combien de jours restera-t-il moins de $300$ L ?",
        solution: "$f(x) = 1\\,200 - 40x < 300$ donne $40x > 900$, soit $x > 22{,}5$ : à partir du 23e jour."
      }
    },
    {
      titre: "Fonction affine par morceaux : l'impôt par tranches",
      figure: "qd-cours-impot",
      video: { titre: "Vidéo de ton prof : reconnaître une fonction affine", youtube: "https://youtu.be/hfiPikWtwoA" },
      texte:
        "L'impôt sur le revenu est calculé **par tranches** : chaque tranche du revenu est taxée à son propre taux. L'impôt est alors une fonction **affine par morceaux** du revenu : une droite différente sur chaque tranche, de pente égale au taux de la tranche.\n\n" +
        "Exemple (barème simplifié et fictif) : $0\\,\\%$ jusqu'à $10\\,000$ €, $10\\,\\%$ entre $10\\,000$ € et $25\\,000$ €, $30\\,\\%$ au-dessus. Pour un revenu de $35\\,000$ € : $15\\,000 \\times 0{,}1 + 10\\,000 \\times 0{,}3 = 1\\,500 + 3\\,000 = 4\\,500$ €.\n\n" +
        "- Le **taux marginal** est le taux de la tranche la plus haute atteinte : ici $30\\,\\%$. Il s'applique au dernier euro gagné, **pas** à tout le revenu.\n" +
        "- Le **taux moyen** est $\\dfrac{\\text{impôt}}{\\text{revenu}}$ : ici $\\dfrac{4\\,500}{35\\,000} \\approx 12{,}9\\,\\%$, bien moins que $30\\,\\%$.",
      exemple: {
        enonce: "Avec ce barème, quel est l'impôt pour un revenu de $18\\,000$ € ? Son taux moyen ?",
        solution: "$(18\\,000 - 10\\,000) \\times 0{,}1 = 800$ € ; taux moyen $\\dfrac{800}{18\\,000} \\approx 4{,}4\\,\\%$ (taux marginal $10\\,\\%$)."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "qd-image", titre: "Image et antécédent", etape: "Rappels", nb: 4 },
    { type: "qd-taux", titre: "Taux d'accroissement, expression", etape: "Rappels", nb: 5 },
    { type: "qd-sens", titre: "Sens de variation", etape: "Rappels", nb: 4 },
    { type: "qd-graphique", titre: "Lire une droite en contexte", etape: "Modéliser", nb: 5 },
    { type: "qd-modeliser", titre: "Modéliser, problème de seuil", etape: "Modéliser", nb: 5 },
    { type: "qd-celsius", titre: "Degrés Celsius et Fahrenheit", etape: "Situations", nb: 4 },
    { type: "qd-equilibre", titre: "Offre, demande, prix d'équilibre", etape: "Situations", nb: 4 },
    { type: "qd-impot", titre: "Impôt par tranches", etape: "Situations", nb: 5 },
    { type: "qd-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Laquelle de ces fonctions est affine ?", choix: ["$f(x) = 3 - 2x$", "$f(x) = x^2 + 1$", "$f(x) = \\dfrac{1}{x}$", "$f(x) = 2^x$"], bonne: 0, explication: "De la forme $mx + p$ avec $m = -2$ et $p = 3$." },
    { question: "Pour $f(x) = -4x + 7$, $f(2)$ vaut :", choix: ["$-1$", "$15$", "$1$", "$-8$"], bonne: 0, explication: "$-8 + 7$." },
    { question: "La fonction $f(x) = 5 - 0{,}5x$ est :", choix: ["décroissante", "croissante", "constante", "croissante puis décroissante"], bonne: 0, explication: "$m = -0{,}5 < 0$." },
    { question: "$f$ est affine avec $f(1) = 4$ et $f(3) = 10$. Son coefficient directeur est :", choix: ["$3$", "$6$", "$2$", "$\\dfrac{1}{3}$"], bonne: 0, explication: "$\\dfrac{10 - 4}{3 - 1}$." },
    { question: "Avec les données précédentes, $f(0)$ vaut :", choix: ["$1$", "$4$", "$3$", "$-2$"], bonne: 0, explication: "$4 = 3 \\times 1 + p$, donc $p = 1$." },
    { question: "Pour une fonction affine, le taux d'accroissement entre deux valeurs :", choix: ["est toujours égal au coefficient directeur", "dépend des deux valeurs choisies", "est toujours égal à l'ordonnée à l'origine", "est toujours positif"], bonne: 0, explication: "Croissance linéaire : rythme constant." },
    { question: "Une fonction linéaire $f(x) = mx$ a pour représentation une droite :", choix: ["passant par l'origine", "horizontale", "verticale", "ne coupant pas l'axe des ordonnées"], bonne: 0, explication: "$f(0) = 0$." },
    { question: "$F = 1{,}8C + 32$. Pour $C = 25$, $F$ vaut :", choix: ["$77$", "$57$", "$45$", "$102{,}6$"], bonne: 0, explication: "$45 + 32$." },
    { question: "$F = 1{,}8C + 32$. Pour $F = 50$, $C$ vaut :", choix: ["$10$", "$122$", "$45{,}8$", "$9$"], bonne: 0, explication: "$1{,}8C = 18$." },
    { question: "Offre $O(x) = 15x$ et demande $D(x) = 200 - 5x$. Le prix d'équilibre est :", choix: ["$10$", "$20$", "$150$", "$13{,}3$"], bonne: 0, explication: "$15x = 200 - 5x$ donne $20x = 200$." },
    { question: "Au prix d'équilibre :", choix: ["l'offre est égale à la demande", "l'offre est nulle", "la demande est maximale", "le prix est nul"], bonne: 0, explication: "C'est l'intersection des deux droites." },
    { question: "Avec un taux marginal de $30\\,\\%$, l'impôt représente :", choix: ["moins de $30\\,\\%$ du revenu en général", "exactement $30\\,\\%$ du revenu", "plus de $30\\,\\%$ du revenu", "$30\\,\\%$ de la dernière tranche seulement, rien d'autre"], bonne: 0, explication: "Les tranches basses sont moins taxées : le taux moyen est plus petit." },
    { question: "Barème : $0\\,\\%$ jusqu'à $10\\,000$ €, $10\\,\\%$ au-dessus. L'impôt pour $16\\,000$ € est :", choix: ["$600$ €", "$1\\,600$ €", "$1\\,000$ €", "$0$ €"], bonne: 0, explication: "$(16\\,000 - 10\\,000) \\times 0{,}1$." },
    { question: "Un impôt de $1\\,200$ € pour un revenu de $24\\,000$ € correspond à un taux moyen de :", choix: ["$5\\,\\%$", "$20\\,\\%$", "$12\\,\\%$", "$2{,}4\\,\\%$"], bonne: 0, explication: "$\\dfrac{1\\,200}{24\\,000} = 0{,}05$." },
    { question: "La suite $u(n) = 3n + 2$ et la fonction $f(x) = 3x + 2$ :", choix: ["prennent les mêmes valeurs aux entiers", "n'ont aucun rapport", "ont des sens de variation opposés", "sont toutes les deux constantes"], bonne: 0, explication: "$u(n) = f(n)$." },
    { question: "Un niveau monte de $3$ mm par an à partir de $20$ mm. Le modèle est :", choix: ["$f(x) = 3x + 20$", "$f(x) = 20x + 3$", "$f(x) = 20 \\times 3^x$", "$f(x) = 23x$"], bonne: 0, explication: "Départ $20$, variation $3$ par an." },
    { question: "$f(x) = 2x + 10$. Le plus petit entier $x$ tel que $f(x) > 25$ est :", choix: ["$8$", "$7$", "$7{,}5$", "$25$"], bonne: 0, explication: "$2x > 15$, $x > 7{,}5$." },
    { question: "La droite qui représente $f(x) = 4$ est :", choix: ["horizontale", "verticale", "croissante", "passant par l'origine"], bonne: 0, explication: "Fonction constante." },
    { question: "Une droite passe par $(0\\,;5)$ et $(2\\,;9)$. La fonction affine associée est :", choix: ["$f(x) = 2x + 5$", "$f(x) = 4x + 5$", "$f(x) = 5x + 2$", "$f(x) = 2x + 9$"], bonne: 0, explication: "$p = 5$ et $m = \\dfrac{4}{2} = 2$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Trouver l'expression d'une fonction affine",
      etapes: [
        "Avec deux valeurs $f(a)$ et $f(b)$ : $m = \\dfrac{f(b) - f(a)}{b - a}$.",
        "Puis $p$ : écrire $f(a) = ma + p$ et résoudre.",
        "Avec un graphique : $p$ sur l'axe des ordonnées, $m$ = variation verticale pour une unité horizontale.",
        "Vérifier avec la seconde valeur."
      ],
      exemple: "$f(2) = 7$, $f(5) = 16$ : $m = 3$, $p = 1$, $f(x) = 3x + 1$ ; vérification $f(5) = 16$."
    },
    {
      titre: "Modéliser une croissance linéaire",
      etapes: [
        "Repérer une variation constante par unité (par km, par an, par jour…).",
        "Écrire $f(x) = mx + p$ : $p$ la valeur de départ, $m$ la variation par unité (négative pour une baisse).",
        "Pour un seuil : résoudre $mx + p > S$ (ou $<$), en changeant le sens si on divise par un négatif.",
        "Conclure avec un entier si la question l'exige, et critiquer la validité du modèle."
      ],
      exemple: "Citerne : $f(x) = 1\\,200 - 40x < 300$ donne $x > 22{,}5$ : à partir du 23e jour."
    },
    {
      titre: "Calculer un impôt par tranches",
      figure: "qd-cours-impot",
      etapes: [
        "Découper le revenu selon les seuils du barème.",
        "Appliquer à chaque morceau le taux de sa tranche.",
        "Additionner : c'est l'impôt.",
        "Taux marginal : taux de la tranche la plus haute atteinte ; taux moyen : impôt divisé par revenu."
      ],
      exemple: "$35\\,000$ € : $1\\,500 + 3\\,000 = 4\\,500$ € ; taux marginal $30\\,\\%$, taux moyen $\\approx 12{,}9\\,\\%$."
    }
  ],
  erreurs: [
    "Prendre le terme constant pour le coefficient directeur quand l'expression est écrite « à l'envers » ($f(x) = 4 - 3x$ : $m = -3$).",
    "Croire qu'une fonction est croissante parce que $p > 0$.",
    "Mettre les $x$ au numérateur du taux d'accroissement.",
    "Appliquer le taux marginal à tout le revenu.",
    "Pour passer des °F aux °C, appliquer la formule au lieu de résoudre l'équation.",
    "Oublier de changer le sens d'une inégalité en divisant par un nombre négatif.",
    "Utiliser un modèle linéaire loin des données sans esprit critique."
  ]
};
