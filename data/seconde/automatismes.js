/*
  AUTOMATISMES DE SECONDE (toute l'année)
  ----------------------------------------
  10 fiches courtes, une par partie du dossier élève (P1 à P10), puis des séries « flash ».
  Mêmes règles d'écriture que les autres chapitres (formules entre $...$, antislash doublé, {,} pour la virgule).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-automatismes"] = {
  niveau: "Seconde",
  numero: null,
  periode: "Toute l'année",
  titre: "Automatismes",
  accroche: "Ce qu'il faut savoir faire vite et sans erreur, souvent de tête : 10 fiches flash et des séries d'entraînement.",

  playlist: "",
  drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv",
  pdfs: [
    {
      titre: "Dossier élève : 10 fiches, exercices et test final",
      url: "https://drive.google.com/file/d/1vr9e5N38rAOQLWIvUR5suK6l6ciyoLNY/view"
    }
  ],

  /* ---------- 1. LES 10 FICHES ---------- */
  cours: [
    {
      titre: "Fractions et puissances",
      texte:
        "- Additionner : on réduit au **même dénominateur**. Multiplier : numérateurs entre eux, dénominateurs entre eux.\n" +
        "- Diviser par une fraction, c'est multiplier par son **inverse** : $\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c}$.\n" +
        "- $a^m \\times a^n = a^{m+n}$, $\\dfrac{a^m}{a^n} = a^{m-n}$, $(a^m)^n = a^{mn}$, $a^0 = 1$, $a^{-n} = \\dfrac{1}{a^n}$.\n" +
        "- Écriture scientifique : $a \\times 10^n$ avec $1 \\leqslant a < 10$, par exemple $52\\,300 = 5{,}23 \\times 10^4$.",
      video: { titre: "Vidéo d'Yvan Monka : calculer avec des fractions", youtube: "https://youtu.be/Z86gfJOKgBg" },
      exemple: {
        enonce: "Calculer $\\dfrac{3}{4} - \\dfrac{1}{3}$ et $2^5 \\times 2^{-2}$.",
        solution: "$\\dfrac{9}{12} - \\dfrac{4}{12} = \\dfrac{5}{12}$ et $2^{5 + (-2)} = 2^3 = 8$.\n\nPièges : $(-3)^2 = 9$ mais $-3^2 = -9$ ; $2^3 \\times 2^4 = 2^7$, pas $4^7$."
      }
    },
    {
      titre: "Unités et ordres de grandeur",
      video: { titre: "Vidéo de ton prof : conversions d'unités", youtube: "https://youtu.be/ZmsrIiQvadQ" },
      texte:
        "- Aires : $\\times 100$ d'une unité à la suivante ($1$ m² $= 10\\,000$ cm²). Volumes : $\\times 1\\,000$ ($1$ dm³ $= 1$ L).\n" +
        "- Durées : $0{,}25$ h $= 15$ min, $0{,}1$ h $= 6$ min. Vitesses : $1$ m/s $= 3{,}6$ km/h.\n" +
        "- Ordre de grandeur : on arrondit chaque nombre à une valeur « ronde », puis on calcule de tête : $387 \\times 0{,}52 \\approx 400 \\times 0{,}5 = 200$.\n" +
        "- Avant de conclure, on contrôle : unité, signe, ordre de grandeur, cohérence (une proportion est entre $0$ et $1$).",
      exemple: {
        enonce: "Convertir $72$ km/h en m/s, et $1$ h $30$ min en heures.",
        solution: "$72 \\div 3{,}6 = 20$ m/s.\n\n$1$ h $30$ min $= 1{,}5$ h, et non $1{,}3$ h."
      }
    },
    {
      titre: "Calcul littéral : développer, factoriser",
      texte:
        "- $-(a - b) = -a + b$ : le signe $-$ change le signe de **chaque** terme.\n" +
        "- $(a + b)^2 = a^2 + 2ab + b^2$ et $(a - b)^2 = a^2 - 2ab + b^2$.\n" +
        "- $(a + b)(a - b) = a^2 - b^2$.\n" +
        "- Factoriser : chercher un facteur commun, sinon une identité remarquable. On vérifie en redéveloppant.",
      video: { titre: "Vidéo d'Yvan Monka : factoriser avec une identité remarquable", youtube: "https://youtu.be/T9T4IeYGEe4" },
      exemple: {
        enonce: "Développer $(x - 3)^2$ et factoriser $x^2 - 25$.",
        solution: "$(x - 3)^2 = x^2 - 6x + 9$ (et non $x^2 - 9$).\n\n$x^2 - 25 = (x - 5)(x + 5)$."
      }
    },
    {
      titre: "Équations et inéquations",
      texte:
        "- $ax + b = cx + d$ : on regroupe les $x$ d'un côté, les nombres de l'autre, puis on divise.\n" +
        "- $x^2 = a$ : deux solutions $\\sqrt{a}$ et $-\\sqrt{a}$ si $a > 0$, une seule ($0$) si $a = 0$, aucune si $a < 0$.\n" +
        "- Dans une inéquation, multiplier ou diviser par un nombre **négatif** change le sens : $-2x \\geqslant 6 \\iff x \\leqslant -3$.\n" +
        "- Isoler une variable : $d = vt \\iff t = \\dfrac{d}{v}$.",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation du premier degré", youtube: "https://youtu.be/quzC5C3a9jM" },
      exemple: {
        enonce: "Résoudre $3x - 7 = x + 5$.",
        solution: "$3x - x = 5 + 7 \\iff 2x = 12 \\iff x = 6$. $S = \\{6\\}$"
      }
    },
    {
      titre: "Proportions et évolutions",
      texte:
        "- Proportion : $p = \\dfrac{n_A}{n_E}$ ; partie $n_A = p \\times n_E$ ; tout $n_E = \\dfrac{n_A}{p}$.\n" +
        "- $+t\\,\\%$ : $\\times \\left(1 + \\dfrac{t}{100}\\right)$ ; $-t\\,\\%$ : $\\times \\left(1 - \\dfrac{t}{100}\\right)$.\n" +
        "- Évolutions successives : on multiplie les coefficients. Valeur initiale : on divise par le coefficient.",
      video: { titre: "Vidéo d'Yvan Monka : coefficient multiplicateur", youtube: "https://youtu.be/-5QmcMuzy5I" },
      exemple: {
        enonce: "Un article à $60$ € baisse de $15\\,\\%$. Nouveau prix ?",
        solution: "$60 \\times 0{,}85 = 51$ €."
      }
    },
    {
      titre: "Fonctions et graphiques",
      texte:
        "- $M(x\\,;y) \\in \\mathcal{C}_f \\iff y = f(x)$ : on calcule l'image de l'abscisse et on compare à l'ordonnée.\n" +
        "- Image : unique. Antécédents : zéro, un ou plusieurs.\n" +
        "- $f(x) = ax + b$ est **affine** (droite) ; si $b = 0$, elle est **linéaire** (droite passant par l'origine). $a$ est le coefficient directeur : $a = \\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$.",
      video: { titre: "Vidéo d'Yvan Monka : lire une image ou un antécédent", youtube: "https://youtu.be/VM2iC9P3Qmg" },
      exemple: {
        enonce: "$f(x) = 2x^2 - 1$. Le point $A(-2\\,;7)$ est-il sur la courbe de $f$ ?",
        solution: "$f(-2) = 2 \\times 4 - 1 = 7$ : oui, $A \\in \\mathcal{C}_f$."
      }
    },
    {
      titre: "Repérage, aires et volumes",
      video: { titre: "Vidéo d'Yvan Monka : calculer des volumes (boule, cylindre)", youtube: "https://youtu.be/ZnB0RIPlIsw" },
      texte:
        "- Rectangle $L \\times \\ell$ ; triangle $\\dfrac{\\text{base} \\times \\text{hauteur}}{2}$ ; disque $\\pi r^2$ ; cercle $2\\pi r$.\n" +
        "- Pavé $L \\times \\ell \\times h$ ; prisme et cylindre $\\mathcal{B} \\times h$ ($\\pi r^2 h$) ; pyramide et cône $\\dfrac{1}{3}\\mathcal{B} \\times h$ ; boule $\\dfrac{4}{3}\\pi r^3$.\n" +
        "- Toutes les longueurs dans la même unité ; la valeur exacte ($9\\pi$) avant la valeur approchée ($\\approx 28{,}27$).",
      exemple: {
        enonce: "Volume d'un cylindre de rayon $2$ cm et de hauteur $5$ cm (valeur exacte) ?",
        solution: "$V = \\pi \\times 2^2 \\times 5 = 20\\pi$ cm³ $\\approx 62{,}8$ cm³."
      }
    },
    {
      titre: "Pythagore, Thalès, trigonométrie",
      texte:
        "- Pythagore : si $ABC$ est rectangle en $A$, $BC^2 = AB^2 + AC^2$ (et réciproquement).\n" +
        "- Thalès : si $(MN) \\parallel (BC)$, $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.\n" +
        "- Trigonométrie (CAH SOH TOA) : $\\cos = \\dfrac{\\text{adj}}{\\text{hyp}}$, $\\sin = \\dfrac{\\text{opp}}{\\text{hyp}}$, $\\tan = \\dfrac{\\text{opp}}{\\text{adj}}$. À connaître : $\\cos 60^\\circ = \\sin 30^\\circ = 0{,}5$, $\\tan 45^\\circ = 1$.",
      video: { titre: "Vidéo d'Yvan Monka : calculer une longueur avec Pythagore", youtube: "https://youtu.be/M9sceJ8gzNc" },
      exemple: {
        enonce: "Un triangle rectangle a des côtés de l'angle droit de $5$ et $12$. Longueur de l'hypoténuse ?",
        solution: "$5^2 + 12^2 = 25 + 144 = 169$, donc l'hypoténuse mesure $\\sqrt{169} = 13$."
      }
    },
    {
      titre: "Statistiques",
      texte:
        "- Moyenne : somme des valeurs ÷ nombre de valeurs (avec effectifs : $\\bar{x} = \\dfrac{n_1 x_1 + \\dots + n_p x_p}{N}$).\n" +
        "- Médiane : on **range** les valeurs ; c'est la valeur du milieu (ou la moyenne des deux du milieu si $N$ est pair).\n" +
        "- Quartiles $Q_1$, $Q_3$ : rangs $\\dfrac{N}{4}$ et $\\dfrac{3N}{4}$ arrondis à l'entier supérieur. Étendue = max − min.\n" +
        "- Diagramme circulaire : angle = fréquence $\\times 360^\\circ$.",
      video: { titre: "Vidéo d'Yvan Monka : moyenne, médiane, quartiles", youtube: "https://youtu.be/qKrgLZKGE8o" },
      exemple: {
        enonce: "Médiane de la série $3 ; 8 ; 5 ; 12 ; 9 ; 1$ ?",
        solution: "Rangée : $1 ; 3 ; 5 ; 8 ; 9 ; 12$. Six valeurs : médiane $= \\dfrac{5 + 8}{2} = 6{,}5$."
      }
    },
    {
      titre: "Probabilités",
      video: { titre: "Vidéo d'Yvan Monka : le cours sur les probabilités", youtube: "https://youtu.be/dvx_O37gfyY" },
      texte:
        "- Une probabilité est toujours entre $0$ et $1$ ; la somme des probabilités des issues vaut $1$.\n" +
        "- Événement contraire : $P(\\overline{A}) = 1 - P(A)$.\n" +
        "- Équiprobabilité : $P(A) = \\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre d'issues possibles}}$.\n" +
        "- Deux dés : tableau à double entrée, $36$ issues équiprobables.",
      exemple: {
        enonce: "$P(A) = 0{,}35$. Calculer $P(\\overline{A})$.",
        solution: "$P(\\overline{A}) = 1 - 0{,}35 = 0{,}65$."
      }
    }
  ],

  videos: [],

  /* ---------- 2. SÉRIES FLASH ---------- */
  exercices: [
    { type: "auto-fractions", titre: "P1 · Fractions et puissances", etape: "Nombres et calculs", nb: 6 },
    { type: "auto-conversions", titre: "P2 · Conversions d'unités", etape: "Nombres et calculs", nb: 6 },
    { type: "auto-litteral", titre: "P3 · Développer, factoriser", etape: "Nombres et calculs", nb: 6 },
    { type: "auto-equations", titre: "P4 · Équations", etape: "Nombres et calculs", nb: 5 },
    { type: "auto-pourcentages", titre: "P5 · Proportions et évolutions", etape: "Pourcentages et fonctions", nb: 5 },
    { type: "auto-fonctions", titre: "P6 · Fonctions", etape: "Pourcentages et fonctions", nb: 5 },
    { type: "auto-grandeurs", titre: "P7 · Aires et volumes", etape: "Géométrie", nb: 5 },
    { type: "auto-pythagore", titre: "P8 · Pythagore", etape: "Géométrie", nb: 5 },
    { type: "auto-statistiques", titre: "P9 · Statistiques", etape: "Statistiques et probabilités", nb: 5 },
    { type: "auto-probabilites", titre: "P10 · Probabilités", etape: "Statistiques et probabilités", nb: 5 },
    { type: "auto-melange", titre: "Test flash : 10 questions mélangées", etape: "Défi", nb: 10 }
  ],

  /* ---------- 3. TEST DE POSITIONNEMENT ET TEST FINAL ---------- */
  qcm: [
    { question: "P1 · $\\dfrac{3}{4} - \\dfrac{1}{3} =$", choix: ["$2$", "$\\dfrac{5}{12}$", "$\\dfrac{2}{12}$", "$\\dfrac{1}{2}$"], bonne: 1, explication: "$\\dfrac{9}{12} - \\dfrac{4}{12} = \\dfrac{5}{12}$. On ne soustrait pas numérateurs et dénominateurs séparément." },
    { question: "P1 · $2^5 \\times 2^{-2} =$", choix: ["$2^{-10}$", "$4^3$", "$2^3$", "$2^7$"], bonne: 2, explication: "On additionne les exposants : $5 + (-2) = 3$." },
    { question: "P1 · $0{,}035$ s'écrit en pourcentage :", choix: ["$35\\,\\%$", "$3{,}5\\,\\%$", "$0{,}35\\,\\%$", "$0{,}035\\,\\%$"], bonne: 1, explication: "$0{,}035 \\times 100 = 3{,}5$, donc $3{,}5\\,\\%$." },
    { question: "P2 · Un ordre de grandeur de $2\\,987 \\times 0{,}0198$ est :", choix: ["$0{,}6$", "$6$", "$60$", "$600$"], bonne: 2, explication: "$3\\,000 \\times 0{,}02 = 60$." },
    { question: "P2 · $1{,}2$ h $=$", choix: ["1 h 20 min", "1 h 12 min", "1 h 2 min", "120 min"], bonne: 1, explication: "$0{,}2 \\times 60 = 12$ min." },
    { question: "P2 · $36$ km/h $=$", choix: ["$10$ m/s", "$3{,}6$ m/s", "$100$ m/s", "$129{,}6$ m/s"], bonne: 0, explication: "On divise par $3{,}6$ : $36 \\div 3{,}6 = 10$ m/s." },
    { question: "P3 · $-(3 - x) =$", choix: ["$-3 - x$", "$3 + x$", "$x - 3$", "$-3x$"], bonne: 2, explication: "Le signe $-$ change le signe de chaque terme : $-3 + x = x - 3$." },
    { question: "P3 · $(2x - 1)^2 =$", choix: ["$4x^2 - 1$", "$4x^2 + 1$", "$4x^2 - 4x + 1$", "$2x^2 - 4x + 1$"], bonne: 2, explication: "$(a - b)^2 = a^2 - 2ab + b^2$ avec $a = 2x$ et $b = 1$." },
    { question: "P3 · Une forme factorisée de $9x^2 - 16$ est :", choix: ["$(9x - 4)(9x + 4)$", "$(3x - 4)^2$", "$(3x - 4)(3x + 4)$", "$(3x - 8)(3x + 8)$"], bonne: 2, explication: "$9x^2 - 16 = (3x)^2 - 4^2 = (3x - 4)(3x + 4)$." },
    { question: "P4 · La solution de $5 - 2x = 11$ est :", choix: ["$-3$", "$3$", "$8$", "$-8$"], bonne: 0, explication: "$-2x = 6 \\iff x = -3$." },
    { question: "P4 · Les solutions de $x^2 = 16$ sont :", choix: ["$4$ seulement", "$-4$ et $4$", "$8$", "Il n'y en a pas"], bonne: 1, explication: "$4^2 = 16$ et $(-4)^2 = 16$." },
    { question: "P4 · Si $d = vt$ (avec $v \\neq 0$), alors :", choix: ["$t = \\dfrac{d}{v}$", "$t = \\dfrac{v}{d}$", "$t = d - v$", "$t = dv$"], bonne: 0, explication: "On divise les deux membres par $v$." },
    { question: "P5 · Un article à $60$ € baisse de $15\\,\\%$. Nouveau prix ?", choix: ["$45$ €", "$51$ €", "$69$ €", "$59{,}10$ €"], bonne: 1, explication: "$60 \\times 0{,}85 = 51$ €." },
    { question: "P6 · $f(x) = 2x^2 - 1$. Le point $A(-2\\,;7)$ est-il sur la courbe de $f$ ?", choix: ["Oui, car $f(-2) = 7$", "Non, car $f(-2) = -9$", "Non, car $f(7) \\neq -2$"], bonne: 0, explication: "$f(-2) = 2 \\times (-2)^2 - 1 = 8 - 1 = 7$." },
    { question: "P7 · Volume d'un cylindre de rayon $2$ cm et de hauteur $5$ cm ?", choix: ["$10\\pi$ cm³", "$20\\pi$ cm³", "$40\\pi$ cm³", "$100\\pi$ cm³"], bonne: 1, explication: "$\\pi r^2 h = \\pi \\times 4 \\times 5 = 20\\pi$ cm³." },
    { question: "P8 · Triangle rectangle de côtés de l'angle droit $5$ et $12$. Hypoténuse ?", choix: ["$17$", "$13$", "$\\sqrt{119}$", "$169$"], bonne: 1, explication: "$\\sqrt{25 + 144} = \\sqrt{169} = 13$." },
    { question: "P9 · Médiane de la série $3 ; 8 ; 5 ; 12 ; 9 ; 1$ ?", choix: ["$5$", "$6{,}5$", "$12$", "$6{,}3$"], bonne: 1, explication: "Rangée : $1 ; 3 ; 5 ; 8 ; 9 ; 12$, médiane $= \\dfrac{5 + 8}{2} = 6{,}5$. ($6{,}3$ est à peu près la moyenne.)" },
    { question: "P10 · $P(A) = 0{,}35$. $P(\\overline{A}) =$", choix: ["$0{,}35$", "$0{,}65$", "$1{,}35$", "$-0{,}35$"], bonne: 1, explication: "$1 - 0{,}35 = 0{,}65$." },
    { question: "P1 · $\\dfrac{5}{6} \\div \\dfrac{10}{3} =$", choix: ["$\\dfrac{1}{4}$", "$\\dfrac{25}{9}$", "$4$", "$\\dfrac{1}{2}$"], bonne: 0, explication: "Diviser par $\\dfrac{10}{3}$, c'est multiplier par son inverse : $\\dfrac{5}{6} \\times \\dfrac{3}{10} = \\dfrac{15}{60} = \\dfrac{1}{4}$. $\\dfrac{25}{9}$ est le produit des deux fractions, pas le quotient." },
    { question: "P1 · L'écriture scientifique de $305\\,000$ est :", choix: ["$3{,}05 \\times 10^{5}$", "$305 \\times 10^{3}$", "$3{,}05 \\times 10^{-5}$", "$3{,}5 \\times 10^{5}$"], bonne: 0, explication: "Il faut $1 \\leqslant a < 10$, donc $a = 3{,}05$ : la virgule se décale de $5$ rangs vers la gauche, d'où $10^{5}$. $305 \\times 10^{3}$ est égal, mais ce n'est pas une écriture scientifique car $305 \\geqslant 10$." },
    { question: "P2 · $2{,}5$ m² $=$", choix: ["$25\\,000$ cm²", "$250$ cm²", "$2\\,500$ cm²", "$250\\,000$ cm²"], bonne: 0, explication: "Pour les aires, on multiplie par $100$ d'une unité à la suivante : $1$ m² $= 100$ dm² $= 10\\,000$ cm². Donc $2{,}5$ m² $= 25\\,000$ cm²." },
    { question: "P5 · Dans un lycée de Mamoudzou, $30\\,\\%$ des $1\\,200$ élèves viennent en bus. Combien d'élèves cela fait-il ?", choix: ["$360$", "$400$", "$36$", "$840$"], bonne: 0, explication: "La partie vaut $p \\times n_E = 0{,}3 \\times 1\\,200 = 360$ élèves. $840$, c'est le nombre d'élèves qui ne viennent pas en bus." },
    { question: "P5 · Un prix augmente de $10\\,\\%$, puis baisse de $10\\,\\%$. Au total, il :", choix: ["baisse de $1\\,\\%$", "ne change pas", "augmente de $1\\,\\%$", "baisse de $10\\,\\%$"], bonne: 0, explication: "On multiplie les coefficients : $1{,}1 \\times 0{,}9 = 0{,}99 = 1 - 0{,}01$. C'est une baisse de $1\\,\\%$ : les pourcentages ne s'additionnent pas." },
    { question: "P6 · La fonction $f(x) = -3x$ est :", choix: ["linéaire : sa courbe est une droite qui passe par l'origine", "affine mais pas linéaire", "ni affine ni linéaire", "constante"], bonne: 0, explication: "$f(x) = ax + b$ avec $a = -3$ et $b = 0$ : c'est une fonction linéaire (donc aussi affine). Sa courbe est une droite qui passe par l'origine." },
    { question: "P6 · Une fonction affine $f$ vérifie $f(1) = 5$ et $f(3) = 11$. Son coefficient directeur est :", choix: ["$3$", "$6$", "$\\dfrac{1}{3}$", "$2$"], bonne: 0, explication: "$a = \\dfrac{f(3) - f(1)}{3 - 1} = \\dfrac{11 - 5}{2} = \\dfrac{6}{2} = 3$. On n'oublie pas de diviser par l'écart des $x$." },
    { question: "P7 · Aire d'un triangle de base $8$ cm et de hauteur $5$ cm ?", choix: ["$20$ cm²", "$40$ cm²", "$13$ cm²", "$26$ cm²"], bonne: 0, explication: "$\\dfrac{\\text{base} \\times \\text{hauteur}}{2} = \\dfrac{8 \\times 5}{2} = 20$ cm². $40$ cm² est l'aire du rectangle : on a oublié de diviser par $2$." },
    { question: "P8 · Dans le triangle $ABC$ rectangle en $A$, $\\cos \\widehat{ABC} =$", choix: ["$\\dfrac{AB}{BC}$", "$\\dfrac{AC}{BC}$", "$\\dfrac{AB}{AC}$", "$\\dfrac{BC}{AB}$"], bonne: 0, explication: "Pour l'angle en $B$, le côté adjacent est $[AB]$ et l'hypoténuse est $[BC]$ : $\\cos = \\dfrac{\\text{adj}}{\\text{hyp}} = \\dfrac{AB}{BC}$." },
    { question: "P9 · Dans un groupe, deux élèves ont eu $8$ et un élève a eu $14$. Moyenne des trois notes ?", choix: ["$10$", "$11$", "$30$", "$12$"], bonne: 0, explication: "$\\bar{x} = \\dfrac{2 \\times 8 + 1 \\times 14}{3} = \\dfrac{30}{3} = 10$. $11$ est la moyenne de $8$ et $14$ sans tenir compte des effectifs." },
    { question: "P10 · On lance un dé équilibré à six faces. Probabilité d'obtenir un multiple de $3$ ?", choix: ["$\\dfrac{1}{3}$", "$\\dfrac{1}{2}$", "$\\dfrac{1}{6}$", "$\\dfrac{2}{3}$"], bonne: 0, explication: "Les issues favorables sont $3$ et $6$ : $2$ issues sur $6$ équiprobables, donc $P = \\dfrac{2}{6} = \\dfrac{1}{3}$." },
    { question: "P10 · On lance deux dés équilibrés. Probabilité que la somme fasse $12$ ?", choix: ["$\\dfrac{1}{36}$", "$\\dfrac{1}{12}$", "$\\dfrac{1}{11}$", "$\\dfrac{1}{6}$"], bonne: 0, explication: "Il y a $36$ issues équiprobables (tableau à double entrée) et une seule donne $12$ : $(6\\,;6)$. Les $11$ sommes possibles de $2$ à $12$ ne sont pas équiprobables." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Comment utiliser les automatismes",
      etapes: [
        "Fais le QCM : c'est le test de positionnement du dossier.",
        "Pour chaque erreur, repère la partie indiquée (P1 à P10) et relis sa fiche.",
        "Entraîne-toi avec la série flash de cette partie jusqu'à obtenir 3 étoiles.",
        "Termine par le test flash mélangé, sans calculatrice."
      ],
      exemple: "Un automatisme se travaille souvent et un peu : 5 minutes par jour valent mieux qu'une heure la veille."
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
    },
    {
      titre: "Comparer deux nombres",
      etapes: [
        "Par la différence : $a - b > 0 \\iff a > b$.",
        "Par le quotient, si $a$ et $b$ sont strictement positifs : $\\dfrac{a}{b} > 1 \\iff a > b$."
      ],
      exemple: "$\\dfrac{7}{9} - \\dfrac{4}{5} = \\dfrac{35}{45} - \\dfrac{36}{45} = -\\dfrac{1}{45} < 0$, donc $\\dfrac{7}{9} < \\dfrac{4}{5}$."
    }
  ],
  erreurs: [
    "$\\dfrac{a}{b} + \\dfrac{c}{d} \\neq \\dfrac{a + c}{b + d}$ : on réduit d'abord au même dénominateur.",
    "$(-3)^2 = 9$ mais $-3^2 = -9$.",
    "$(a + b)^2 \\neq a^2 + b^2$ : il manque le double produit $2ab$.",
    "$1$ h $30$ min $= 1{,}5$ h et non $1{,}3$ h ; $1$ m² $= 100$ dm² et non $10$ dm².",
    "$x^2 = 9$ a **deux** solutions : $3$ et $-3$.",
    "Diminuer de $20\\,\\%$, c'est multiplier par $0{,}8$ et non par $0{,}2$.",
    "Pour la médiane, on **range** les valeurs avant de chercher le milieu.",
    "Une probabilité ne peut valoir ni $1{,}2$ ni $-0{,}3$."
  ]
};
