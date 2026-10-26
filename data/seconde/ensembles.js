/*
  CHAPITRE : Seconde — Ensembles de nombres et intervalles
  ---------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce). Dans les formules, la virgule décimale s'écrit {,} : $0{,}35$.
  Figures (assets/exercices.js) : "ens-cours-…", "ens-qcm-…", "ens-meth-…", "intervalle-exemple", "intervalle-infini",
  "inter-union", "valeur-absolue" (droites graduées et ensembles emboîtés).
  Vidéos : la playlist « Secondes : nombres réels et intervalles » de la chaîne d'abord, Yvan Monka en complément (démonstrations).
  PDF : cours d'Yvan Monka, à remplacer dans pdfs par le PDF du Drive quand il existera.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-ensembles"] = {
  niveau: "Seconde",
  numero: 1,
  titre: "Ensembles de nombres et intervalles",
  accroche: "Entiers, décimaux, rationnels et réels, droite graduée, arrondis, puis intervalles et valeur absolue : le vocabulaire de base pour toute l'année.",

  playlist: "https://www.youtube.com/playlist?list=PLF-TiSGzlo20", // playlist « Secondes : nombres réels et intervalles »
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : nombres réels, chapitre 1 (ensembles de nombres) (PDF)", url: "https://www.maths-et-tiques.fr/telech/19NombresReels1M.pdf" },
    { titre: "Cours d'Yvan Monka : nombres réels, chapitre 2 (intervalles, valeur absolue) (PDF)", url: "https://www.maths-et-tiques.fr/telech/19NombresReels2M.pdf" }
  ],
  liens: [
    { titre: "Reconnaître la nature d'un nombre en vidéo (Yvan Monka)", url: "https://youtu.be/pKxTaiqnyHg", type: "video" },
    { titre: "Le cours sur les intervalles en vidéo (Yvan Monka)", url: "https://youtu.be/mvJy4LVCmRI", type: "video" },
    { titre: "Le cours sur la valeur absolue en vidéo (Yvan Monka)", url: "https://youtu.be/5-rUuceEgAE", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Les ensembles de nombres",
      video: { titre: "Vidéo de ton prof : ensembles de nombres et intervalles (cours 1/2)", youtube: "https://youtu.be/_O22jCGJLds" },
      texte:
        "- $\\mathbb{N}$ : les **entiers naturels** $0$, $1$, $2$, $3$…\n" +
        "- $\\mathbb{Z}$ : les **entiers relatifs**, positifs ou négatifs : $-3$, $0$, $12$…\n" +
        "- $\\mathbb{D}$ : les **décimaux**, qui s'écrivent avec un nombre **fini** de chiffres après la virgule : $2{,}5$, $-0{,}125$…\n" +
        "- $\\mathbb{Q}$ : les **rationnels**, quotients de deux entiers $\\dfrac{a}{b}$ avec $b \\neq 0$ : $\\dfrac{1}{3}$, $-\\dfrac{5}{7}$…\n" +
        "- $\\mathbb{R}$ : les **réels**, abscisses de tous les points d'une droite graduée : $\\sqrt{2}$, $\\pi$…\n\n" +
        "Chaque ensemble est **inclus** dans le suivant : $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ (schéma).\n\n" +
        "On écrit $-3 \\in \\mathbb{Z}$ (« $-3$ appartient à $\\mathbb{Z}$ ») et $-3 \\notin \\mathbb{N}$.",
      figure: "ens-cours-ensembles",
      exemple: {
        enonce: "Donner le plus petit ensemble qui contient chacun de ces nombres : $\\dfrac{12}{4}$ ; $-7$ ; $\\dfrac{3}{4}$ ; $\\dfrac{1}{3}$ ; $\\sqrt{2}$.",
        solution: "- $\\dfrac{12}{4} = 3 \\in \\mathbb{N}$ : une fraction peut être un entier !\n- $-7 \\in \\mathbb{Z}$.\n- $\\dfrac{3}{4} = 0{,}75 \\in \\mathbb{D}$.\n- $\\dfrac{1}{3} = 0{,}333\\ldots \\in \\mathbb{Q}$, mais pas dans $\\mathbb{D}$.\n- $\\sqrt{2} \\in \\mathbb{R}$, mais pas dans $\\mathbb{Q}$."
      }
    },
    {
      titre: "Décimal ou pas ?",
      video: { titre: "Vidéo d'Yvan Monka : démontrer qu'un tiers n'est pas un nombre décimal", youtube: "https://youtu.be/SHRo1ISyIXI" },
      texte:
        "Un nombre **décimal** s'écrit $\\dfrac{a}{10^n}$ avec $a$ entier : $2{,}35 = \\dfrac{235}{100}$.\n\n" +
        "Une fraction **irréductible** est décimale lorsque son dénominateur ne s'écrit qu'avec des facteurs $2$ et $5$ ($2$, $4$, $5$, $8$, $20$, $25$, $40$…) : on peut alors obtenir un dénominateur $10$, $100$, $1\\,000$… Par exemple $\\dfrac{7}{40} = \\dfrac{7 \\times 25}{40 \\times 25} = \\dfrac{175}{1\\,000} = 0{,}175$. Sinon, elle n'est pas décimale (propriété admise).\n\n" +
        "**Démonstration** : $\\dfrac{1}{3}$ n'est **pas** décimal. Si l'on avait $\\dfrac{1}{3} = \\dfrac{a}{10^n}$, on aurait $3a = 10^n$. Or $10^n$ n'est pas un multiple de $3$ (la somme de ses chiffres vaut $1$). C'est impossible.\n\n" +
        "Attention : $0{,}33$ n'est qu'une **valeur approchée** de $\\dfrac{1}{3} = 0{,}333\\ldots$ Pour aller plus loin : l'écriture décimale d'un rationnel non décimal est illimitée et **périodique** ($\\dfrac{5}{12} = 0{,}41666\\ldots$, $\\dfrac{2}{7} = 0{,}285714\\,285714\\ldots$).",
      exemple: {
        enonce: "$\\dfrac{7}{40}$ et $\\dfrac{5}{12}$ sont-ils des nombres décimaux ?",
        solution: "$40 = 2 \\times 2 \\times 2 \\times 5$ : seulement des $2$ et des $5$. $\\dfrac{7}{40} = 0{,}175$ est décimal.\n\n$12 = 2 \\times 2 \\times 3$ : il y a un facteur $3$. $\\dfrac{5}{12} = 0{,}41666\\ldots$ n'est pas décimal (c'est un rationnel)."
      }
    },
    {
      titre: "Les nombres irrationnels",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que racine carrée de 2 est irrationnel", youtube: "https://youtu.be/oRcTlNh1Sjc" },
      texte:
        "Un réel qui n'est pas rationnel est dit **irrationnel** : il ne s'écrit pas comme un quotient de deux entiers. La géométrie en fournit : la diagonale d'un carré de côté $1$ mesure $\\sqrt{2}$, le périmètre d'un cercle de diamètre $1$ mesure $\\pi$ (schéma).\n\n" +
        "- $\\sqrt{2}$ et $\\pi$ sont irrationnels.\n" +
        "- $\\sqrt{n}$ est irrationnel dès que l'entier $n$ n'est pas un carré parfait : $\\sqrt{3}$, $\\sqrt{5}$, $\\sqrt{7}$…\n\n" +
        "**Démonstration** (par l'absurde) : supposons $\\sqrt{2} = \\dfrac{p}{q}$, avec $\\dfrac{p}{q}$ irréductible. Alors $p^2 = 2q^2$ : $p^2$ est pair, donc $p$ est pair (le carré d'un nombre impair est impair). On écrit $p = 2k$ : $4k^2 = 2q^2$, donc $q^2 = 2k^2$ et $q$ est pair lui aussi. La fraction $\\dfrac{p}{q}$ se simplifie par $2$ : c'est **absurde**. Donc $\\sqrt{2}$ est irrationnel.\n\n" +
        "Leur écriture décimale est **illimitée** et **non périodique** : la calculatrice n'en donne qu'une valeur approchée.",
      figure: "ens-cours-irrationnels",
      exemple: {
        enonce: "$\\sqrt{49}$ et $\\sqrt{\\dfrac{4}{9}}$ sont-ils irrationnels ?",
        solution: "Non ! $\\sqrt{49} = 7 \\in \\mathbb{N}$ et $\\sqrt{\\dfrac{4}{9}} = \\dfrac{2}{3} \\in \\mathbb{Q}$.\n\nAvant de conclure, on simplifie toujours la racine carrée."
      }
    },
    {
      titre: "Repérer un nombre sur une droite graduée",
      video: { titre: "Vidéo de ton prof : repérage sur une droite et dans le plan", youtube: "https://youtu.be/KTPki_bOLzU" },
      texte:
        "Sur une droite graduée, chaque point est repéré par un réel : son **abscisse**. À droite de $0$, les abscisses sont positives ; à gauche, elles sont négatives.\n\n" +
        "Pour **lire** une abscisse :\n" +
        "- compter en combien de parts égales une unité est partagée : si elle l'est en $4$, une graduation vaut $\\dfrac{1}{4} = 0{,}25$ ;\n" +
        "- partir de l'entier juste à gauche du point et ajouter le nombre de graduations.\n\n" +
        "Pour **placer** un nombre comme $\\dfrac{7}{3}$, on l'écrit $2 + \\dfrac{1}{3}$ : on part de $2$ et on avance d'un tiers d'unité. Pour $\\sqrt{7}$, on l'encadre : $2^2 = 4 < 7 < 9 = 3^2$, donc $2 < \\sqrt{7} < 3$.",
      figure: "ens-cours-abscisse",
      exemple: {
        enonce: "Lire les abscisses des points $A$ et $B$ sur la droite graduée ci-dessus.",
        solution: "Chaque unité est partagée en $4$ : une graduation vaut $\\dfrac{1}{4}$.\n\n- $A$ est à $1$ graduation à droite de $1$ : $1 + \\dfrac{1}{4} = \\dfrac{5}{4} = 1{,}25$.\n- $B$ est à $2$ graduations à droite de $-1$ : $-1 + \\dfrac{2}{4} = -\\dfrac{1}{2} = -0{,}5$."
      }
    },
    {
      titre: "Encadrement décimal, arrondi, chiffres significatifs",
      video: { titre: "Vidéo de ton prof : valeur absolue, encadrements et chiffres significatifs (cours 2/2)", youtube: "https://youtu.be/mR17fQObJNo" },
      texte:
        "La calculatrice ne donne qu'une **valeur approchée** d'un réel comme $\\sqrt{2}$ ou $\\pi$. On l'encadre par deux décimaux (schéma : on « zoome » sur la droite graduée).\n\n" +
        "- Un **encadrement d'amplitude** $10^{-n}$ de $x$ : $a \\leqslant x < b$, où $a$ et $b$ ont $n$ chiffres après la virgule et $b - a = 10^{-n}$. Pour $x$ positif, on trouve $a$ en coupant l'écriture de $x$ après le $n$-ième chiffre.\n" +
        "- L'**arrondi** de $x$ à $10^{-n}$ près est celle des deux bornes la plus proche de $x$ : on regarde le chiffre suivant. De $0$ à $4$, on garde $a$ ; de $5$ à $9$, on prend $b$.\n\n" +
        "Avec $\\sqrt{2} \\approx 1{,}41421$ : $1{,}41 \\leqslant \\sqrt{2} < 1{,}42$ (amplitude $10^{-2}$) et l'arrondi au centième est $1{,}41$.\n\n" +
        "**Chiffres significatifs** : on les compte à partir du **premier chiffre non nul** ; les zéros du début ne comptent pas. $0{,}0457$ a $3$ chiffres significatifs. Dans un problème, on arrondit un résultat avec un nombre de chiffres significatifs adapté aux données : $d \\approx 2{,}71828$ km donne $2{,}72$ km avec $3$ chiffres significatifs.\n\n" +
        "En Python, on peut aussi encadrer $\\sqrt{2}$ par balayage (chapitre 13).",
      figure: "ens-cours-encadrement",
      exemple: {
        enonce: "Donner un encadrement de $\\dfrac{2}{7}$ d'amplitude $10^{-3}$, puis son arrondi au millième. Puis arrondir $0{,}004\\,862$ g avec $2$ chiffres significatifs.",
        solution: "La calculatrice donne $\\dfrac{2}{7} \\approx 0{,}285714$.\n\nEncadrement : $0{,}285 \\leqslant \\dfrac{2}{7} < 0{,}286$.\n\nLe chiffre après le millième est $7$, entre $5$ et $9$ : l'arrondi au millième est $0{,}286$.\n\nPour $0{,}004\\,862$, les chiffres significatifs commencent au $4$ : on garde $4$ et $8$, le suivant est $6$. Avec $2$ chiffres significatifs : $0{,}0049$ g."
      }
    },
    {
      titre: "Les intervalles",
      video: { titre: "Vidéo de ton prof : inégalités et intervalles (exercice corrigé)", youtube: "https://youtu.be/u-z2yEgnBmI" },
      texte:
        "Un **intervalle** est un ensemble de réels « sans trou » entre deux bornes.\n\n" +
        "- $a \\leqslant x \\leqslant b \\iff x \\in [a\\,;b]$\n" +
        "- $a < x < b \\iff x \\in \\,]a\\,;b[$\n" +
        "- $a \\leqslant x < b \\iff x \\in [a\\,;b[$\n" +
        "- $x \\geqslant a \\iff x \\in [a\\,;+\\infty[$\n" +
        "- $x < b \\iff x \\in \\mathopen{]}-\\infty\\,;b[$\n\n" +
        "**Crochet tourné vers l'intérieur** : la borne est incluse. **Tourné vers l'extérieur** : elle est exclue.\n\n" +
        "Du côté de $+\\infty$ ou de $-\\infty$, le crochet est **toujours ouvert**. Et $\\mathbb{R} = \\mathopen{]}-\\infty\\,;+\\infty[$.",
      figure: ["intervalle-exemple", "intervalle-infini"],
      exemple: {
        enonce: "Un plongeur relève une température de l'eau $T$ (en °C) qui vérifie $26 \\leqslant T < 29$. Traduire par un intervalle. Puis lire les intervalles représentés sur les droites graduées ci-dessus.",
        solution: "$26$ est inclus, $29$ est exclu : $T \\in [26\\,;29[$.\n\nSur la première figure, la partie coloriée va de $-2$ (crochet vers l'intérieur, inclus) à $3$ (crochet vers l'extérieur, exclu) : c'est $[-2\\,;3[$. Sur la seconde, elle va jusqu'au bout à gauche et s'arrête en $1$, inclus : c'est $\\mathopen{]}-\\infty\\,;1]$."
      }
    },
    {
      titre: "Intersection et réunion",
      video: { titre: "Vidéo de ton prof : intersection et réunion, les horaires du dispensaire", youtube: "https://youtu.be/Ov8R007Q9Eg" },
      texte:
        "Soit $I$ et $J$ deux intervalles.\n\n" +
        "- $I \\cap J$ (« $I$ **inter** $J$ ») : les réels qui sont **à la fois** dans $I$ et dans $J$. C'est la partie commune. Elle peut être vide : on écrit $I \\cap J = \\varnothing$.\n" +
        "- $I \\cup J$ (« $I$ **union** $J$ ») : les réels qui sont dans $I$ **ou** dans $J$ (au moins l'un des deux).\n\n" +
        "On représente les deux intervalles sur une même droite graduée, puis on vérifie chaque borne : de quel intervalle vient-elle, et y est-elle incluse ?",
      figure: "inter-union",
      exemple: {
        enonce: "Avec $I = [-3\\,;2]$ et $J = \\,]0\\,;5]$ (figure ci-dessus), déterminer $I \\cap J$ et $I \\cup J$.",
        solution: "Partie commune : de $0$ (exclu, crochet de $J$) à $2$ (inclus, crochet de $I$). $I \\cap J = \\,]0\\,;2]$.\n\nTout ce qui est colorié : de $-3$ (inclus) à $5$ (inclus). $I \\cup J = [-3\\,;5]$."
      }
    },
    {
      titre: "Valeur absolue et distance",
      video: { titre: "Vidéo de ton prof : valeur absolue et distance (exercice corrigé)", youtube: "https://youtu.be/3c9x3VNu_EQ" },
      texte:
        "La **valeur absolue** de $x$, notée $|x|$, est sa distance à $0$ : $|x| = x$ si $x \\geqslant 0$, et $|x| = -x$ si $x < 0$.\n\n" +
        "- $|a - b|$ est la **distance** entre les nombres $a$ et $b$ sur la droite graduée. Elle n'est jamais négative.\n" +
        "- $|x - a| \\leqslant r \\iff a - r \\leqslant x \\leqslant a + r \\iff x \\in [a - r\\,;a + r]$ : l'intervalle de **centre** $a$ et de **rayon** $r$.\n\n" +
        "Attention au signe : $|x + 3| = |x - (-3)|$, le centre est $-3$.",
      figure: ["ens-cours-distance", "valeur-absolue"],
      exemple: {
        enonce: "Calculer $\\lvert -5 \\rvert$ et la distance entre $-2$ et $3$. Puis traduire $|x - 1| \\leqslant 2$ par un intervalle.",
        solution: "$\\lvert -5 \\rvert = 5$ et $\\lvert -2 - 3 \\rvert = \\lvert -5 \\rvert = 5$ (première figure).\n\n$|x - 1| \\leqslant 2$ : les nombres à une distance au plus $2$ de $1$. $x \\in [1 - 2\\,;1 + 2] = [-1\\,;3]$ (seconde figure)."
      }
    }
  ],

  /* Exercices corrigés en vidéo (playlist « Secondes : nombres réels et intervalles ») */
  videos: [
    { titre: "#02 Classer des nombres dans les ensembles", type: "Ensembles", youtube: "https://youtu.be/i2g1xYlPFlw" },
    { titre: "#07 Distances et intervalles, la route nationale", type: "Distance", youtube: "https://youtu.be/Yb8G5mM91kk" },
    { titre: "#08 Chiffres significatifs, la parcelle de Sada", type: "Arrondis", youtube: "https://youtu.be/LF48GNKzqCg" },
    { titre: "#09 Deux capteurs, une température (1/2)", type: "Bilan", youtube: "https://youtu.be/OheAUeb8tUo" },
    { titre: "#10 Deux capteurs, une température (2/2)", type: "Bilan", youtube: "https://youtu.be/XXId57rKhuI" }
  ],
  videosNote: "Vidéos de ton prof : playlist « Secondes : nombres réels et intervalles ». L'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ----------
     Chaque série tire des nombres au hasard : on peut la refaire autant qu'on veut.
     type : nom du générateur (voir assets/exercices.js). nb : nombre de questions. */
  exercices: [
    { type: "ens-plus-petit", titre: "Le plus petit ensemble d'un nombre", etape: "Ensembles de nombres", nb: 6 },
    { type: "ens-vrai-faux", titre: "Appartient ou pas ?", etape: "Ensembles de nombres", nb: 6 },
    { type: "ens-abscisse", titre: "Lire et placer un réel sur une droite graduée", etape: "Ensembles de nombres", nb: 5 },
    { type: "ens-arrondi", titre: "Encadrer, arrondir, chiffres significatifs", etape: "Ensembles de nombres", nb: 6 },
    { type: "int-inegalite", titre: "Inégalité et intervalle", etape: "Intervalles", nb: 6 },
    { type: "int-droite", titre: "Lire un intervalle sur une droite graduée", etape: "Intervalles", nb: 5 },
    { type: "int-appartient", titre: "Quels nombres sont dans l'intervalle ?", etape: "Intervalles", nb: 6 },
    { type: "int-inter-union", titre: "Intersection et réunion", etape: "Intervalles", nb: 5 },
    { type: "abs-distance", titre: "Valeur absolue et distance", etape: "Valeur absolue", nb: 5 },
    { type: "abs-intervalle", titre: "Traduire |x − a| ≤ r par un intervalle", etape: "Valeur absolue", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ----------
     bonne : numéro de la bonne réponse en partant de 0 (0 = la première). */
  qcm: [
    {
      question: "Quel est le plus petit ensemble qui contient $-\\dfrac{12}{4}$ ?",
      choix: ["$\\mathbb{N}$", "$\\mathbb{Z}$", "$\\mathbb{D}$", "$\\mathbb{Q}$"],
      bonne: 1,
      explication: "$-\\dfrac{12}{4} = -3$ : c'est un entier négatif, donc il est dans $\\mathbb{Z}$ mais pas dans $\\mathbb{N}$."
    },
    {
      question: "Le nombre $\\dfrac{1}{3}$ est-il décimal ?",
      choix: ["Oui, car $\\dfrac{1}{3} = 0{,}33$", "Non, son écriture décimale ne s'arrête jamais", "Oui, car c'est une fraction", "Non, car ce n'est pas un nombre réel"],
      bonne: 1,
      explication: "$\\dfrac{1}{3} = 0{,}333\\ldots$ : les $3$ continuent à l'infini. $0{,}33$ n'est qu'une valeur approchée. $\\dfrac{1}{3}$ est rationnel, et bien sûr réel."
    },
    {
      question: "Lequel de ces nombres est irrationnel ?",
      choix: ["$\\sqrt{16}$", "$\\sqrt{7}$", "$\\dfrac{2}{3}$", "$0{,}125$"],
      bonne: 1,
      explication: "$7$ n'est pas un carré parfait, donc $\\sqrt{7}$ est irrationnel. $\\sqrt{16} = 4$, $\\dfrac{2}{3}$ est rationnel et $0{,}125$ est décimal."
    },
    {
      question: "L'arrondi de $\\pi \\approx 3{,}14159$ au millième est :",
      choix: ["$3{,}141$", "$3{,}142$", "$3{,}14$", "$3{,}1416$"],
      bonne: 1,
      explication: "On garde $3{,}141$, puis on regarde le chiffre suivant : $5$. De $5$ à $9$, on ajoute $1$ au dernier chiffre gardé : $3{,}142$. $3{,}141$ est la troncature."
    },
    {
      question: "Un encadrement de $\\sqrt{3} \\approx 1{,}732$ d'amplitude $10^{-2}$ est :",
      choix: ["$1{,}73 \\leqslant \\sqrt{3} < 1{,}74$", "$1{,}7 \\leqslant \\sqrt{3} < 1{,}8$", "$1{,}72 \\leqslant \\sqrt{3} < 1{,}73$", "$1{,}73 \\leqslant \\sqrt{3} < 1{,}75$"],
      bonne: 0,
      explication: "Amplitude $10^{-2} = 0{,}01$ : deux chiffres après la virgule et des bornes écartées de $0{,}01$. On coupe $1{,}732$ après le centième : $1{,}73$, puis $1{,}73 + 0{,}01 = 1{,}74$."
    },
    {
      question: "D'après le schéma des ensembles emboîtés, quelle affirmation est vraie ?",
      figure: "ens-cours-ensembles",
      choix: ["Tout entier relatif est un rationnel", "Tout rationnel est un entier relatif", "Tout réel est un décimal", "Tout décimal est un entier"],
      bonne: 0,
      explication: "$\\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q}$ : la zone de $\\mathbb{Z}$ est à l'intérieur de celle de $\\mathbb{Q}$. Les autres sont fausses : $\\dfrac{1}{3}$ est rationnel sans être entier, $\\sqrt{2}$ est réel sans être décimal, $0{,}5$ est décimal sans être entier."
    },
    {
      question: "L'ensemble des réels $x$ tels que $-2 < x \\leqslant 5$ est :",
      choix: ["$\\mathopen{]}-2\\,;5]$", "$[-2\\,;5[$", "$[-2\\,;5]$", "$\\mathopen{]}-2\\,;5[$"],
      bonne: 0,
      explication: "$-2$ est exclu (inégalité stricte) : crochet vers l'extérieur. $5$ est inclus : crochet vers l'intérieur."
    },
    {
      question: "$x \\geqslant 3$ équivaut à :",
      choix: ["$x \\in [3\\,;+\\infty[$", "$x \\in \\,]3\\,;+\\infty[$", "$x \\in \\mathopen{]}-\\infty\\,;3]$", "$x \\in [3\\,;+\\infty]$"],
      bonne: 0,
      explication: "$3$ est inclus, et $x$ peut être aussi grand que l'on veut. Du côté de $+\\infty$, le crochet est toujours ouvert : $[3\\,;+\\infty]$ n'a pas de sens."
    },
    {
      question: "Quel intervalle est représenté ?",
      figure: "intervalle-exemple",
      choix: ["$[-2\\,;3[$", "$\\mathopen{]}-2\\,;3]$", "$[-2\\,;3]$", "$\\mathopen{]}-2\\,;3[$"],
      bonne: 0,
      explication: "En $-2$, le crochet est tourné vers la partie coloriée : $-2$ est inclus. En $3$, il est tourné vers l'extérieur : $3$ est exclu."
    },
    {
      question: "Avec $I = [-3\\,;2]$ et $J = \\,]0\\,;5]$, que vaut $I \\cap J$ ?",
      figure: "inter-union",
      choix: ["$]0\\,;2]$", "$[0\\,;2]$", "$[-3\\,;5]$", "$]0\\,;5]$"],
      bonne: 0,
      explication: "La partie commune va de $0$ à $2$. $0$ vient de $J$, où il est exclu ; $2$ vient de $I$, où il est inclus. $[-3\\,;5]$, c'est la réunion $I \\cup J$."
    },
    {
      question: "Sur la droite graduée, $A$ a pour abscisse $-4$ et $B$ pour abscisse $2$. Quelle est la distance $AB$ ?",
      figure: "ens-qcm-distance",
      choix: ["$6$", "$-6$", "$2$", "$-2$"],
      bonne: 0,
      explication: "$AB = \\lvert -4 - 2 \\rvert = \\lvert -6 \\rvert = 6$ : on compte aussi $6$ unités sur la figure. Une distance n'est jamais négative. Le résultat $2$ vient de l'erreur $\\lvert -4 + 2 \\rvert$."
    },
    {
      question: "$|x - 1| \\leqslant 2$ équivaut à :",
      figure: "valeur-absolue",
      choix: ["$x \\in [-1\\,;3]$", "$x \\in \\mathopen{]}-1\\,;3[$", "$x \\in [1\\,;3]$", "$x \\in [-3\\,;1]$"],
      bonne: 0,
      explication: "Ce sont les nombres à une distance au plus $2$ de $1$ : de $1 - 2 = -1$ à $1 + 2 = 3$, bornes incluses car l'inégalité est large."
    },
    { question: "Le nombre $\\dfrac{7}{20}$ est-il décimal ?", choix: ["Oui : $20 = 2 \\times 2 \\times 5$, et $\\dfrac{7}{20} = 0{,}35$", "Non : $7$ n'est pas divisible par $20$", "Non : c'est une fraction, donc seulement un rationnel", "Oui, mais seulement parce que $7$ est impair"], bonne: 0, explication: "La fraction est irréductible et son dénominateur $20 = 2 \\times 2 \\times 5$ ne s'écrit qu'avec des $2$ et des $5$ : $\\dfrac{7}{20} = \\dfrac{35}{100} = 0{,}35$." },
    { question: "Quel est le plus petit ensemble qui contient $\\dfrac{21}{6}$ ?", choix: ["$\\mathbb{D}$", "$\\mathbb{Q}$", "$\\mathbb{N}$", "$\\mathbb{R}$"], bonne: 0, explication: "$\\dfrac{21}{6} = \\dfrac{7}{2} = 3{,}5$ : un nombre fini de chiffres après la virgule, donc un décimal. Ce n'est pas un entier, donc il n'est ni dans $\\mathbb{N}$ ni dans $\\mathbb{Z}$." },
    { question: "Lequel de ces nombres est un entier naturel ?", choix: ["$\\dfrac{-10}{-5}$", "$-\\dfrac{10}{5}$", "$\\dfrac{5}{10}$", "$\\sqrt{10}$"], bonne: 0, explication: "$\\dfrac{-10}{-5} = 2$ : le quotient de deux nombres négatifs est positif. En revanche $-\\dfrac{10}{5} = -2 \\notin \\mathbb{N}$, $\\dfrac{5}{10} = 0{,}5$ et $\\sqrt{10}$ est irrationnel." },
    { question: "Le produit $\\sqrt{2} \\times \\sqrt{8}$ est :", choix: ["un entier naturel", "un nombre irrationnel", "un décimal qui n'est pas entier", "un rationnel qui n'est pas décimal"], bonne: 0, explication: "$\\sqrt{2} \\times \\sqrt{8} = \\sqrt{16} = 4$ : c'est un entier naturel. Le produit de deux irrationnels n'est pas forcément irrationnel." },
    { question: "Quelle écriture est correcte ?", choix: ["$\\pi \\notin \\mathbb{Q}$", "$\\pi \\in \\mathbb{D}$", "$\\pi = 3{,}14$", "$\\pi \\notin \\mathbb{R}$"], bonne: 0, explication: "$\\pi$ est irrationnel : c'est un réel qui ne s'écrit pas comme un quotient de deux entiers. $3{,}14$ n'en est qu'une valeur approchée." },
    { question: "Quelle affirmation est vraie ?", choix: ["Tout décimal est rationnel", "Tout rationnel est décimal", "Tout réel est rationnel", "Tout rationnel est un entier"], bonne: 0, explication: "Tout décimal s'écrit $\\dfrac{a}{10^n}$ : c'est un quotient d'entiers, donc $\\mathbb{D} \\subset \\mathbb{Q}$. L'inverse est faux : $\\dfrac{1}{3}$ est rationnel sans être décimal, $\\sqrt{2}$ est réel sans être rationnel." },
    { question: "L'arrondi de $\\sqrt{7} \\approx 2{,}6458$ au dixième est :", choix: ["$2{,}6$", "$2{,}7$", "$2{,}65$", "$3$"], bonne: 0, explication: "On garde $2{,}6$ et on regarde le chiffre suivant : $4$. De $0$ à $4$, on garde $2{,}6$. Attention à ne pas arrondir en plusieurs étapes ($2{,}646$, puis $2{,}65$, puis $2{,}7$)." },
    { question: "Un encadrement de $\\pi \\approx 3{,}14159$ d'amplitude $10^{-1}$ est :", choix: ["$3{,}1 \\leqslant \\pi < 3{,}2$", "$3 \\leqslant \\pi < 4$", "$3{,}14 \\leqslant \\pi < 3{,}15$", "$3{,}1 \\leqslant \\pi < 3{,}3$"], bonne: 0, explication: "Amplitude $10^{-1} = 0{,}1$ : un chiffre après la virgule et des bornes écartées de $0{,}1$. On coupe après le dixième : $3{,}1$, puis $3{,}1 + 0{,}1 = 3{,}2$." },
    { question: "Combien de chiffres significatifs le nombre $0{,}0450$ a-t-il ?", choix: ["$3$", "$5$", "$4$", "$2$"], bonne: 0, explication: "On compte à partir du premier chiffre non nul, le $4$ : les chiffres significatifs sont $4$, $5$ et $0$. Les zéros du début ne comptent pas, mais le zéro de la fin compte : il indique la précision." },
    { question: "La calculatrice donne une longueur $L \\approx 12{,}5664$ m. Arrondie avec $3$ chiffres significatifs, elle vaut :", choix: ["$12{,}6$ m", "$12{,}5$ m", "$12{,}57$ m", "$13$ m"], bonne: 0, explication: "On garde $1$, $2$, $5$ et on regarde le chiffre suivant : $6$. On arrondit au-dessus : $12{,}6$ m. $12{,}57$ a $4$ chiffres significatifs, $13$ n'en a que $2$." },
    { question: "Sur cette droite graduée, quelle est l'abscisse du point $A$ ?", figure: "ens-qcm-abscisse", choix: ["$\\dfrac{5}{3}$", "$1{,}2$", "$1{,}5$", "$\\dfrac{5}{6}$"], bonne: 0, explication: "Chaque unité est partagée en $3$ : une graduation vaut $\\dfrac{1}{3}$. $A$ est à $2$ graduations à droite de $1$ : $1 + \\dfrac{2}{3} = \\dfrac{5}{3}$. $1{,}2$ revient à croire qu'une graduation vaut $0{,}1$." },
    { question: "Entre quels entiers consécutifs se trouve $\\sqrt{30}$ ?", choix: ["$5$ et $6$", "$15$ et $16$", "$4$ et $5$", "$29$ et $31$"], bonne: 0, explication: "$5^2 = 25 < 30 < 36 = 6^2$, donc $5 < \\sqrt{30} < 6$. $15$, c'est la moitié de $30$, pas sa racine carrée." },
    { question: "Dans la démonstration de l'irrationalité de $\\sqrt{2}$, on suppose $\\sqrt{2} = \\dfrac{p}{q}$ irréductible et on obtient $p^2 = 2q^2$. Qu'en déduit-on d'abord ?", choix: ["$p$ est pair", "$p$ est impair", "$q$ est impair", "$p = 2q$"], bonne: 0, explication: "$p^2 = 2q^2$ est pair. Si $p$ était impair, $p^2$ serait impair : donc $p$ est pair. On montre ensuite que $q$ est pair aussi, ce qui contredit l'irréductibilité." },
    { question: "$x < -1$ équivaut à :", choix: ["$x \\in \\mathopen{]}-\\infty\\,;-1[$", "$x \\in \\mathopen{]}-\\infty\\,;-1]$", "$x \\in \\mathopen{]}-1\\,;+\\infty[$", "$x \\in [-\\infty\\,;-1[$"], bonne: 0, explication: "$x$ peut être aussi petit que l'on veut, et $-1$ est exclu (inégalité stricte). Du côté de $-\\infty$, le crochet est toujours ouvert." },
    { question: "Combien d'entiers relatifs appartiennent à l'intervalle $\\mathopen{]}-2\\,;3]$ ?", choix: ["$5$", "$6$", "$4$", "$3$"], bonne: 0, explication: "Ce sont $-1$, $0$, $1$, $2$ et $3$ : $-2$ est exclu (crochet vers l'extérieur) et $3$ est inclus (crochet vers l'intérieur)." },
    { question: "Avec $I = \\mathopen{]}-\\infty\\,;1]$ et $J = [-2\\,;4[$, que vaut $I \\cup J$ ?", choix: ["$\\mathopen{]}-\\infty\\,;4[$", "$[-2\\,;1]$", "$\\mathopen{]}-\\infty\\,;4]$", "$[-2\\,;4[$"], bonne: 0, explication: "La réunion contient tout ce qui est dans $I$ ou dans $J$ : de $-\\infty$ jusqu'à $4$. La borne $4$ vient de $J$, où elle est exclue. $[-2\\,;1]$, c'est l'intersection." },
    { question: "Avec $I = [0\\,;3[$ et $J = [3\\,;7]$, que vaut $I \\cap J$ ?", choix: ["$\\varnothing$ : aucun réel n'est dans les deux", "Le seul nombre $3$", "$[0\\,;7]$", "$]0\\,;3[$"], bonne: 0, explication: "$3$ est dans $J$ mais exclu de $I$ (crochet ouvert) : aucun réel n'est à la fois dans $I$ et dans $J$. $[0\\,;7]$, c'est la réunion $I \\cup J$." },
    { question: "$|3 - \\pi|$ est égal à :", choix: ["$\\pi - 3$", "$3 - \\pi$", "$3 + \\pi$", "$-3 - \\pi$"], bonne: 0, explication: "$\\pi \\approx 3{,}14 > 3$, donc $3 - \\pi < 0$. La valeur absolue d'un nombre négatif est son opposé : $|3 - \\pi| = -(3 - \\pi) = \\pi - 3$." },
    { question: "$|x + 3| \\leqslant 1$ équivaut à :", choix: ["$x \\in [-4\\,;-2]$", "$x \\in [2\\,;4]$", "$x \\in [-1\\,;1]$", "$x \\in \\mathopen{]}-4\\,;-2[$"], bonne: 0, explication: "$|x + 3| = |x - (-3)|$ : c'est la distance de $x$ à $-3$. Elle est au plus $1$ de $-3 - 1 = -4$ à $-3 + 1 = -2$, bornes incluses car l'inégalité est large." },
    { question: "L'intervalle représenté est l'ensemble des réels $x$ tels que :", figure: "ens-qcm-centre", choix: ["$|x - 5| \\leqslant 3$", "$|x - 3| \\leqslant 5$", "$|x + 5| \\leqslant 3$", "$|x - 5| < 3$"], bonne: 0, explication: "C'est $[2\\,;8]$. Le centre est le milieu $\\dfrac{2 + 8}{2} = 5$ et le rayon vaut $8 - 5 = 3$. Les bornes sont incluses : l'inégalité est large." },
    { question: "La traversée en barge de Mamoudzou à Dzaoudzi dure $t$ minutes, avec $|t - 20| \\leqslant 5$. Cela signifie que :", choix: ["$15 \\leqslant t \\leqslant 25$", "$t \\leqslant 25$", "$-5 \\leqslant t \\leqslant 5$", "$20 \\leqslant t \\leqslant 25$"], bonne: 0, explication: "$t$ est à une distance au plus $5$ de $20$ : de $20 - 5 = 15$ à $20 + 5 = 25$ minutes." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Trouver le plus petit ensemble d'un nombre",
      etapes: [
        "Simplifier le nombre : fraction, racine carrée, signe, calcul.",
        "Entier positif : $\\mathbb{N}$. Entier négatif : $\\mathbb{Z}$.",
        "Nombre fini de chiffres après la virgule : $\\mathbb{D}$.",
        "Quotient d'entiers avec une écriture décimale illimitée : $\\mathbb{Q}$.",
        "Sinon ($\\sqrt{2}$, $\\pi$…) : seulement $\\mathbb{R}$."
      ],
      exemple: "$\\dfrac{18}{8} = \\dfrac{9}{4} = 2{,}25 \\in \\mathbb{D}$ ; $\\sqrt{25} = 5 \\in \\mathbb{N}$.",
      figure: "ens-cours-ensembles"
    },
    {
      titre: "Savoir si une fraction est décimale",
      etapes: [
        "Rendre la fraction irréductible.",
        "Diviser le dénominateur par $2$ et par $5$ autant de fois que possible.",
        "S'il reste $1$ : la fraction est décimale. S'il reste un autre facteur ($3$, $7$, $9$…) : elle ne l'est pas."
      ],
      exemple: "$\\dfrac{7}{40}$ : $40 = 2 \\times 2 \\times 2 \\times 5$, décimal ($0{,}175$). $\\dfrac{5}{12}$ : $12 = 2 \\times 2 \\times 3$, il reste $3$, pas décimal."
    },
    {
      titre: "Lire l'abscisse d'un point sur une droite graduée",
      etapes: [
        "Compter en combien de parts égales une unité est partagée : $n$ parts, une graduation vaut $\\dfrac{1}{n}$.",
        "Repérer l'entier juste à gauche du point.",
        "Ajouter le nombre de graduations : abscisse $= m + \\dfrac{k}{n}$."
      ],
      exemple: "Unité partagée en $3$, point à $2$ graduations à droite de $1$ : $1 + \\dfrac{2}{3} = \\dfrac{5}{3}$.",
      figure: "ens-qcm-abscisse"
    },
    {
      titre: "Encadrer et arrondir à $10^{-n}$ près",
      etapes: [
        "Écrire le nombre avec au moins $n + 1$ chiffres après la virgule (calculatrice).",
        "Encadrement d'amplitude $10^{-n}$ : couper après le $n$-ième chiffre pour avoir $a$, puis $b = a + 10^{-n}$.",
        "Arrondi : regarder le chiffre suivant. De $0$ à $4$, l'arrondi est $a$ ; de $5$ à $9$, c'est $b$ (la borne la plus proche)."
      ],
      exemple: "$\\sqrt{5} \\approx 2{,}2360$ : $2{,}23 \\leqslant \\sqrt{5} < 2{,}24$. Le chiffre suivant est $6$ : $\\sqrt{5}$ est plus près de $2{,}24$, l'arrondi au centième est $2{,}24$.",
      figure: "ens-meth-arrondi"
    },
    {
      titre: "Arrondir avec $n$ chiffres significatifs",
      etapes: [
        "Repérer le premier chiffre non nul : c'est le premier chiffre significatif.",
        "Garder $n$ chiffres à partir de lui.",
        "Regarder le chiffre suivant : de $0$ à $4$, on garde ; de $5$ à $9$, on ajoute $1$ au dernier chiffre gardé."
      ],
      exemple: "$0{,}004\\,862$ avec $2$ chiffres significatifs : on garde $4$ et $8$, le suivant est $6$, donc $0{,}0049$."
    },
    {
      titre: "Passer d'une inégalité à un intervalle",
      etapes: [
        "Repérer la ou les bornes, de la plus petite à la plus grande.",
        "Borne incluse ($\\leqslant$, $\\geqslant$) : crochet tourné vers l'intérieur. Exclue ($<$, $>$) : vers l'extérieur.",
        "Pas de borne d'un côté : $-\\infty$ ou $+\\infty$, avec un crochet toujours ouvert."
      ],
      exemple: "$-1 < x \\leqslant 4 \\iff x \\in \\mathopen{]}-1\\,;4]$ ; $x < 2 \\iff x \\in \\mathopen{]}-\\infty\\,;2[$.",
      figure: "ens-meth-inegalite"
    },
    {
      titre: "Déterminer $I \\cap J$ et $I \\cup J$",
      etapes: [
        "Représenter $I$ et $J$ sur une même droite graduée.",
        "$I \\cap J$ : la partie coloriée **deux fois**. $I \\cup J$ : tout ce qui est colorié **au moins une fois**.",
        "Pour chaque borne du résultat, reprendre le crochet de l'intervalle d'où elle vient."
      ],
      exemple: "$I = [-3\\,;2]$, $J = \\,]0\\,;5]$ : $I \\cap J = \\,]0\\,;2]$ et $I \\cup J = [-3\\,;5]$.",
      figure: "inter-union"
    },
    {
      titre: "Traduire $|x - a| \\leqslant r$",
      etapes: [
        "Écrire l'expression sous la forme $|x - a|$ pour trouver le centre $a$ : $|x + 3| = |x - (-3)|$.",
        "Partir de $a$ et aller de $r$ à gauche et de $r$ à droite.",
        "$\\leqslant$ : bornes incluses. $<$ : bornes exclues."
      ],
      exemple: "$|x + 3| < 1 \\iff -4 < x < -2 \\iff x \\in \\mathopen{]}-4\\,;-2[$.",
      figure: "ens-meth-centre"
    }
  ],
  erreurs: [
    "Croire qu'une fraction n'est jamais un entier : $\\dfrac{12}{4} = 3 \\in \\mathbb{N}$.",
    "Écrire $\\dfrac{1}{3} = 0{,}33$ : ce n'est qu'une valeur approchée.",
    "Conclure trop vite qu'une racine carrée est irrationnelle : $\\sqrt{49} = 7$.",
    "Croire qu'une graduation vaut toujours $1$ ou $0{,}1$ : si l'unité est partagée en $4$, une graduation vaut $0{,}25$.",
    "Arrondir en coupant simplement : l'arrondi de $2{,}236$ au centième est $2{,}24$, pas $2{,}23$.",
    "Compter les zéros du début comme chiffres significatifs : $0{,}0457$ n'en a que $3$.",
    "Mettre un crochet fermé du côté de l'infini : $[3\\,;+\\infty]$ n'a pas de sens.",
    "Confondre $\\cap$ (« et », la partie commune) et $\\cup$ (« ou », tout ce qui est colorié).",
    "Donner une distance négative : $|2 - 9| = \\lvert -7 \\rvert = 7$.",
    "Se tromper de centre : pour $|x + 2| \\leqslant 1$, le centre est $-2$, pas $2$."
  ]
};
