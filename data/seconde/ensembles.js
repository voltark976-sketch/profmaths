/*
  CHAPITRE : Seconde — Ensembles de nombres et intervalles
  ---------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce). Dans les formules, la virgule décimale s'écrit {,} : $0{,}35$.
  figure : "intervalle-exemple", "intervalle-infini", "inter-union" ou "valeur-absolue" (droites graduées).
  Pas encore de PDF pour ce chapitre : ajouter les liens dans playlist, pdfs et videos le moment venu.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-ensembles"] = {
  niveau: "Seconde",
  numero: 1,
  titre: "Ensembles de nombres et intervalles",
  accroche: "Entiers, décimaux, rationnels et réels, puis intervalles et valeur absolue : le vocabulaire de base pour toute l'année.",

  playlist: "", // lien de la playlist YouTube du chapitre
  drive: "",
  pdfs: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Les ensembles de nombres",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître la nature d'un nombre", youtube: "https://youtu.be/pKxTaiqnyHg" },
      texte:
        "- $\\mathbb{N}$ : les **entiers naturels** $0$, $1$, $2$, $3$…\n" +
        "- $\\mathbb{Z}$ : les **entiers relatifs**, positifs ou négatifs : $-3$, $0$, $12$…\n" +
        "- $\\mathbb{D}$ : les **décimaux**, qui s'écrivent avec un nombre **fini** de chiffres après la virgule : $2{,}5$, $-0{,}125$…\n" +
        "- $\\mathbb{Q}$ : les **rationnels**, quotients de deux entiers $\\dfrac{a}{b}$ avec $b \\neq 0$ : $\\dfrac{1}{3}$, $-\\dfrac{5}{7}$…\n" +
        "- $\\mathbb{R}$ : les **réels**, abscisses de tous les points d'une droite graduée : $\\sqrt{2}$, $\\pi$…\n\n" +
        "Chaque ensemble est **inclus** dans le suivant : $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$.\n\n" +
        "On écrit $-3 \\in \\mathbb{Z}$ (« $-3$ appartient à $\\mathbb{Z}$ ») et $-3 \\notin \\mathbb{N}$.",
      exemple: {
        enonce: "Donner le plus petit ensemble qui contient chacun de ces nombres : $\\dfrac{12}{4}$ ; $-7$ ; $\\dfrac{3}{4}$ ; $\\dfrac{1}{3}$ ; $\\sqrt{2}$.",
        solution: "- $\\dfrac{12}{4} = 3 \\in \\mathbb{N}$ : une fraction peut être un entier !\n- $-7 \\in \\mathbb{Z}$.\n- $\\dfrac{3}{4} = 0{,}75 \\in \\mathbb{D}$.\n- $\\dfrac{1}{3} = 0{,}333\\ldots \\in \\mathbb{Q}$, mais pas dans $\\mathbb{D}$.\n- $\\sqrt{2} \\in \\mathbb{R}$, mais pas dans $\\mathbb{Q}$."
      }
    },
    {
      titre: "Décimal ou pas ?",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que 1/3 n'est pas décimal", youtube: "https://youtu.be/SHRo1ISyIXI" },
      texte:
        "Un nombre **décimal** s'écrit $\\dfrac{a}{10^n}$ avec $a$ entier : $2{,}35 = \\dfrac{235}{100}$.\n\n" +
        "Une fraction **irréductible** est un décimal si et seulement si son dénominateur n'a **que $2$ et $5$** comme facteurs premiers.\n\n" +
        "$\\dfrac{1}{3}$ n'est **pas** décimal : si l'on avait $\\dfrac{1}{3} = \\dfrac{a}{10^n}$, on aurait $3a = 10^n$. Or $10^n$ n'est pas un multiple de $3$ (la somme de ses chiffres vaut $1$). C'est impossible.\n\n" +
        "Attention : $0{,}33$ n'est qu'une **valeur approchée** de $\\dfrac{1}{3}$.",
      exemple: {
        enonce: "$\\dfrac{7}{40}$ et $\\dfrac{5}{12}$ sont-ils des nombres décimaux ?",
        solution: "$40 = 2^3 \\times 5$ : seulement des $2$ et des $5$. $\\dfrac{7}{40} = 0{,}175$ est décimal.\n\n$12 = 2^2 \\times 3$ : il y a un facteur $3$. $\\dfrac{5}{12} = 0{,}41666\\ldots$ n'est pas décimal (c'est un rationnel)."
      }
    },
    {
      titre: "Les nombres irrationnels",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que √2 est irrationnel", youtube: "https://youtu.be/oRcTlNh1Sjc" },
      texte:
        "Un réel qui n'est pas rationnel est dit **irrationnel** : il ne s'écrit pas comme un quotient de deux entiers.\n\n" +
        "- $\\sqrt{2}$ est irrationnel (on le démontre par l'absurde).\n" +
        "- $\\pi$ est irrationnel.\n" +
        "- $\\sqrt{n}$ est irrationnel dès que l'entier $n$ n'est pas un carré parfait : $\\sqrt{3}$, $\\sqrt{5}$, $\\sqrt{7}$…\n\n" +
        "Leur écriture décimale est **illimitée** et **ne se répète pas** : la calculatrice n'en donne qu'une valeur approchée.",
      exemple: {
        enonce: "$\\sqrt{49}$ et $\\sqrt{\\dfrac{4}{9}}$ sont-ils irrationnels ?",
        solution: "Non ! $\\sqrt{49} = 7 \\in \\mathbb{N}$ et $\\sqrt{\\dfrac{4}{9}} = \\dfrac{2}{3} \\in \\mathbb{Q}$.\n\nAvant de conclure, on simplifie toujours la racine carrée."
      }
    },
    {
      titre: "Encadrement décimal et arrondi",
      video: { titre: "Vidéo d'Yvan Monka : donner un encadrement d'un nombre réel", youtube: "https://youtu.be/sJIXJT3fdcU" },
      texte:
        "La calculatrice ne donne qu'une **valeur approchée** d'un réel comme $\\sqrt{2}$ ou $\\pi$. On l'encadre par deux décimaux.\n\n" +
        "- Un **encadrement d'amplitude** $10^{-n}$ de $x$ : $a \\leqslant x < b$, où $a$ et $b$ ont $n$ chiffres après la virgule et $b - a = 10^{-n}$. Pour $x$ positif, on trouve $a$ en coupant l'écriture de $x$ après le $n$-ième chiffre.\n" +
        "- L'**arrondi** de $x$ à $10^{-n}$ près est celle des deux bornes la plus proche de $x$ : on regarde le chiffre suivant. De $0$ à $4$, on garde $a$ ; de $5$ à $9$, on prend $b$.\n\n" +
        "Avec $\\sqrt{2} \\approx 1{,}41421$ : $1{,}41 \\leqslant \\sqrt{2} < 1{,}42$ (amplitude $10^{-2}$) et l'arrondi au centième est $1{,}41$.",
      exemple: {
        enonce: "Donner un encadrement de $\\dfrac{2}{7}$ d'amplitude $10^{-3}$, puis son arrondi au millième.",
        solution: "La calculatrice donne $\\dfrac{2}{7} \\approx 0{,}285714$.\n\nEncadrement : $0{,}285 \\leqslant \\dfrac{2}{7} < 0{,}286$.\n\nLe chiffre après le millième est $7$, entre $5$ et $9$ : l'arrondi au millième est $0{,}286$."
      }
    },
    {
      titre: "Les intervalles",
      video: { titre: "Vidéo d'Yvan Monka : le cours sur les intervalles", youtube: "https://youtu.be/mvJy4LVCmRI" },
      texte:
        "Un **intervalle** est un ensemble de réels « sans trou » entre deux bornes.\n\n" +
        "- $a \\leqslant x \\leqslant b \\iff x \\in [a\\,;b]$\n" +
        "- $a < x < b \\iff x \\in \\,]a\\,;b[$\n" +
        "- $a \\leqslant x < b \\iff x \\in [a\\,;b[$\n" +
        "- $x \\geqslant a \\iff x \\in [a\\,;+\\infty[$ et $x < b \\iff x \\in \\,]-\\infty\\,;b[$\n\n" +
        "**Crochet tourné vers l'intérieur** : la borne est incluse. **Tourné vers l'extérieur** : elle est exclue.\n\n" +
        "Du côté de $+\\infty$ ou de $-\\infty$, le crochet est **toujours ouvert**. Et $\\mathbb{R} = \\,]-\\infty\\,;+\\infty[$.",
      figure: "intervalle-exemple",
      exemple: {
        enonce: "Un plongeur relève une température de l'eau $T$ (en °C) qui vérifie $26 \\leqslant T < 29$. Traduire par un intervalle. Puis lire l'intervalle représenté sur la droite graduée ci-dessus.",
        solution: "$26$ est inclus, $29$ est exclu : $T \\in [26\\,;29[$.\n\nSur la figure, la partie coloriée va de $-2$ (crochet vers l'intérieur, inclus) à $3$ (crochet vers l'extérieur, exclu) : c'est $[-2\\,;3[$."
      }
    },
    {
      titre: "Intersection et réunion",
      video: { titre: "Vidéo d'Yvan Monka : QCM sur les intervalles", youtube: "https://youtu.be/wSRDSD6-mhg" },
      texte:
        "Soit $I$ et $J$ deux intervalles.\n\n" +
        "- $I \\cap J$ (« $I$ **inter** $J$ ») : les réels qui sont **à la fois** dans $I$ et dans $J$. C'est la partie commune.\n" +
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
      video: { titre: "Vidéo d'Yvan Monka : le cours sur la valeur absolue", youtube: "https://youtu.be/5-rUuceEgAE" },
      texte:
        "La **valeur absolue** de $x$, notée $|x|$, est sa distance à $0$ : $|x| = x$ si $x \\geqslant 0$, et $|x| = -x$ si $x < 0$.\n\n" +
        "- $|a - b|$ est la **distance** entre les nombres $a$ et $b$ sur la droite graduée. Elle n'est jamais négative.\n" +
        "- $|x - a| \\leqslant r \\iff a - r \\leqslant x \\leqslant a + r \\iff x \\in [a - r\\,;a + r]$ : l'intervalle de **centre** $a$ et de **rayon** $r$.\n\n" +
        "Attention au signe : $|x + 3| = |x - (-3)|$, le centre est $-3$.",
      figure: "valeur-absolue",
      exemple: {
        enonce: "Calculer $|-5|$ et la distance entre $-2$ et $3$. Puis traduire $|x - 1| \\leqslant 2$ par un intervalle.",
        solution: "$|-5| = 5$ et $|-2 - 3| = |-5| = 5$.\n\n$|x - 1| \\leqslant 2$ : les nombres à une distance au plus $2$ de $1$. $x \\in [1 - 2\\,;1 + 2] = [-1\\,;3]$ (figure ci-dessus)."
      }
    }
  ],

  /* Exercices corrigés en vidéo : à compléter quand les vidéos seront en ligne */
  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ----------
     Chaque série tire des nombres au hasard : on peut la refaire autant qu'on veut.
     type : nom du générateur (voir assets/exercices.js). nb : nombre de questions. */
  exercices: [
    { type: "ens-plus-petit", titre: "Le plus petit ensemble d'un nombre", etape: "Ensembles de nombres", nb: 6 },
    { type: "ens-vrai-faux", titre: "Appartient ou pas ? Vrai ou faux", etape: "Ensembles de nombres", nb: 6 },
    { type: "ens-arrondi", titre: "Encadrer et arrondir à 10⁻ⁿ près", etape: "Ensembles de nombres", nb: 5 },
    { type: "int-inegalite", titre: "Inégalité et intervalle", etape: "Intervalles", nb: 6 },
    { type: "int-droite", titre: "Lire un intervalle sur une droite graduée", etape: "Intervalles", nb: 5 },
    { type: "int-appartient", titre: "Le nombre est-il dans l'intervalle ?", etape: "Intervalles", nb: 6 },
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
      question: "Quelle affirmation est vraie ?",
      choix: ["$\\mathbb{Q} \\subset \\mathbb{Z}$", "$\\mathbb{D} \\subset \\mathbb{Q}$", "$\\mathbb{R} \\subset \\mathbb{Q}$", "$\\mathbb{Z} \\subset \\mathbb{N}$"],
      bonne: 1,
      explication: "Tout décimal s'écrit $\\dfrac{a}{10^n}$, c'est donc un quotient d'entiers : $\\mathbb{D} \\subset \\mathbb{Q}$. Les autres sont fausses : $\\dfrac{1}{3} \\notin \\mathbb{Z}$, $\\sqrt{2} \\notin \\mathbb{Q}$, $-1 \\notin \\mathbb{N}$."
    },
    {
      question: "L'ensemble des réels $x$ tels que $-2 < x \\leqslant 5$ est :",
      choix: ["$]-2\\,;5]$", "$[-2\\,;5[$", "$[-2\\,;5]$", "$]-2\\,;5[$"],
      bonne: 0,
      explication: "$-2$ est exclu (inégalité stricte) : crochet vers l'extérieur. $5$ est inclus : crochet vers l'intérieur."
    },
    {
      question: "$x \\geqslant 3$ équivaut à :",
      choix: ["$x \\in [3\\,;+\\infty[$", "$x \\in \\,]3\\,;+\\infty[$", "$x \\in \\,]-\\infty\\,;3]$", "$x \\in [3\\,;+\\infty]$"],
      bonne: 0,
      explication: "$3$ est inclus, et $x$ peut être aussi grand que l'on veut. Du côté de $+\\infty$, le crochet est toujours ouvert : $[3\\,;+\\infty]$ n'a pas de sens."
    },
    {
      question: "Quel intervalle est représenté ?",
      figure: "intervalle-exemple",
      choix: ["$[-2\\,;3[$", "$]-2\\,;3]$", "$[-2\\,;3]$", "$]-2\\,;3[$"],
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
      question: "Quelle est la distance entre les nombres $-4$ et $2$ ?",
      choix: ["$6$", "$-6$", "$2$", "$-2$"],
      bonne: 0,
      explication: "$|-4 - 2| = |-6| = 6$. Une distance n'est jamais négative. Le résultat $2$ vient de l'erreur $|-4 + 2|$."
    },
    {
      question: "$|x - 1| \\leqslant 2$ équivaut à :",
      figure: "valeur-absolue",
      choix: ["$x \\in [-1\\,;3]$", "$x \\in \\,]-1\\,;3[$", "$x \\in [1\\,;3]$", "$x \\in [-3\\,;1]$"],
      bonne: 0,
      explication: "Ce sont les nombres à une distance au plus $2$ de $1$ : de $1 - 2 = -1$ à $1 + 2 = 3$, bornes incluses car l'inégalité est large."
    },
    { question: "Le nombre $\\dfrac{7}{20}$ est-il décimal ?", choix: ["Oui : $20 = 2^2 \\times 5$, et $\\dfrac{7}{20} = 0{,}35$", "Non : $7$ n'est pas divisible par $20$", "Non : c'est une fraction, donc seulement un rationnel", "Oui, mais seulement parce que $7$ est un nombre premier"], bonne: 0, explication: "La fraction est irréductible et son dénominateur $20 = 2^2 \\times 5$ n'a que $2$ et $5$ comme facteurs premiers : $\\dfrac{7}{20} = \\dfrac{35}{100} = 0{,}35$." },
    { question: "Quel est le plus petit ensemble qui contient $\\dfrac{21}{6}$ ?", choix: ["$\\mathbb{D}$", "$\\mathbb{Q}$", "$\\mathbb{N}$", "$\\mathbb{R}$"], bonne: 0, explication: "$\\dfrac{21}{6} = \\dfrac{7}{2} = 3{,}5$ : un nombre fini de chiffres après la virgule, donc un décimal. Ce n'est pas un entier, donc il n'est ni dans $\\mathbb{N}$ ni dans $\\mathbb{Z}$." },
    { question: "Lequel de ces nombres est un entier naturel ?", choix: ["$\\dfrac{-10}{-5}$", "$-\\dfrac{10}{5}$", "$\\dfrac{5}{10}$", "$\\sqrt{10}$"], bonne: 0, explication: "$\\dfrac{-10}{-5} = 2$ : le quotient de deux nombres négatifs est positif. En revanche $-\\dfrac{10}{5} = -2 \\notin \\mathbb{N}$, $\\dfrac{5}{10} = 0{,}5$ et $\\sqrt{10}$ est irrationnel." },
    { question: "Vrai ou faux : le produit $\\sqrt{2} \\times \\sqrt{8}$ est un nombre irrationnel.", choix: ["Faux", "Vrai"], bonne: 0, explication: "$\\sqrt{2} \\times \\sqrt{8} = \\sqrt{16} = 4$ : c'est un entier naturel. Le produit de deux irrationnels n'est pas forcément irrationnel." },
    { question: "Quelle écriture est correcte ?", choix: ["$\\pi \\notin \\mathbb{Q}$", "$\\pi \\in \\mathbb{D}$", "$\\pi = 3{,}14$", "$\\pi \\notin \\mathbb{R}$"], bonne: 0, explication: "$\\pi$ est irrationnel : c'est un réel qui ne s'écrit pas comme un quotient de deux entiers. $3{,}14$ n'en est qu'une valeur approchée." },
    { question: "Vrai ou faux : tout nombre rationnel est décimal.", choix: ["Faux", "Vrai"], bonne: 0, explication: "C'est l'inverse qui est vrai : tout décimal est rationnel ($\\mathbb{D} \\subset \\mathbb{Q}$). Mais $\\dfrac{1}{3}$ est rationnel sans être décimal." },
    { question: "L'arrondi de $\\sqrt{7} \\approx 2{,}6458$ au dixième est :", choix: ["$2{,}6$", "$2{,}7$", "$2{,}65$", "$3$"], bonne: 0, explication: "On garde $2{,}6$ et on regarde le chiffre suivant : $4$. De $0$ à $4$, on garde $2{,}6$. Attention à ne pas arrondir en plusieurs étapes ($2{,}646$, puis $2{,}65$, puis $2{,}7$)." },
    { question: "Un encadrement de $\\pi \\approx 3{,}14159$ d'amplitude $10^{-1}$ est :", choix: ["$3{,}1 \\leqslant \\pi < 3{,}2$", "$3 \\leqslant \\pi < 4$", "$3{,}14 \\leqslant \\pi < 3{,}15$", "$3{,}1 \\leqslant \\pi < 3{,}3$"], bonne: 0, explication: "Amplitude $10^{-1} = 0{,}1$ : un chiffre après la virgule et des bornes écartées de $0{,}1$. On coupe après le dixième : $3{,}1$, puis $3{,}1 + 0{,}1 = 3{,}2$." },
    { question: "$x < -1$ équivaut à :", choix: ["$x \\in \\,]-\\infty\\,;-1[$", "$x \\in \\,]-\\infty\\,;-1]$", "$x \\in \\,]-1\\,;+\\infty[$", "$x \\in [-\\infty\\,;-1[$"], bonne: 0, explication: "$x$ peut être aussi petit que l'on veut, et $-1$ est exclu (inégalité stricte). Du côté de $-\\infty$, le crochet est toujours ouvert." },
    { question: "Combien d'entiers relatifs appartiennent à l'intervalle $]-2\\,;3]$ ?", choix: ["$5$", "$6$", "$4$", "$3$"], bonne: 0, explication: "Ce sont $-1$, $0$, $1$, $2$ et $3$ : $-2$ est exclu (crochet vers l'extérieur) et $3$ est inclus (crochet vers l'intérieur)." },
    { question: "Avec $I = \\,]-\\infty\\,;1]$ et $J = [-2\\,;4[$, que vaut $I \\cup J$ ?", choix: ["$]-\\infty\\,;4[$", "$[-2\\,;1]$", "$]-\\infty\\,;4]$", "$[-2\\,;4[$"], bonne: 0, explication: "La réunion contient tout ce qui est dans $I$ ou dans $J$ : de $-\\infty$ jusqu'à $4$. La borne $4$ vient de $J$, où elle est exclue. $[-2\\,;1]$, c'est l'intersection." },
    { question: "Avec $I = [0\\,;3[$ et $J = [3\\,;7]$, que vaut $I \\cap J$ ?", choix: ["Aucun réel : l'intersection est vide", "Le seul nombre $3$", "$[0\\,;7]$", "$]0\\,;3[$"], bonne: 0, explication: "$3$ est dans $J$ mais exclu de $I$ (crochet ouvert) : aucun réel n'est à la fois dans $I$ et dans $J$. $[0\\,;7]$, c'est la réunion $I \\cup J$." },
    { question: "$|3 - \\pi|$ est égal à :", choix: ["$\\pi - 3$", "$3 - \\pi$", "$3 + \\pi$", "$-3 - \\pi$"], bonne: 0, explication: "$\\pi \\approx 3{,}14 > 3$, donc $3 - \\pi < 0$. La valeur absolue d'un nombre négatif est son opposé : $|3 - \\pi| = -(3 - \\pi) = \\pi - 3$." },
    { question: "$|x + 3| \\leqslant 1$ équivaut à :", choix: ["$x \\in [-4\\,;-2]$", "$x \\in [2\\,;4]$", "$x \\in [-1\\,;1]$", "$x \\in \\,]-4\\,;-2[$"], bonne: 0, explication: "$|x + 3| = |x - (-3)|$ : c'est la distance de $x$ à $-3$. Elle est au plus $1$ de $-3 - 1 = -4$ à $-3 + 1 = -2$, bornes incluses car l'inégalité est large." },
    { question: "L'intervalle $[2\\,;8]$ est l'ensemble des réels $x$ tels que :", choix: ["$|x - 5| \\leqslant 3$", "$|x - 3| \\leqslant 5$", "$|x + 5| \\leqslant 3$", "$|x - 5| < 3$"], bonne: 0, explication: "Le centre est le milieu $\\dfrac{2 + 8}{2} = 5$ et le rayon vaut $8 - 5 = 3$. Les bornes sont incluses : l'inégalité est large." },
    { question: "La traversée en barge de Mamoudzou à Dzaoudzi dure $t$ minutes, avec $|t - 20| \\leqslant 5$. Cela signifie que :", choix: ["$15 \\leqslant t \\leqslant 25$", "$t \\leqslant 25$", "$-5 \\leqslant t \\leqslant 5$", "$20 \\leqslant t \\leqslant 25$"], bonne: 0, explication: "$t$ est à une distance au plus $5$ de $20$ : de $20 - 5 = 15$ à $20 + 5 = 25$ minutes." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Trouver le plus petit ensemble d'un nombre",
      etapes: [
        "Simplifier le nombre : fraction, racine carrée, signe.",
        "Entier positif : $\\mathbb{N}$. Entier négatif : $\\mathbb{Z}$.",
        "Nombre fini de chiffres après la virgule : $\\mathbb{D}$.",
        "Quotient d'entiers avec une écriture décimale illimitée : $\\mathbb{Q}$.",
        "Sinon ($\\sqrt{2}$, $\\pi$…) : seulement $\\mathbb{R}$."
      ],
      exemple: "$\\dfrac{18}{8} = \\dfrac{9}{4} = 2{,}25 \\in \\mathbb{D}$ ; $\\sqrt{25} = 5 \\in \\mathbb{N}$."
    },
    {
      titre: "Savoir si une fraction est décimale",
      etapes: [
        "Rendre la fraction irréductible.",
        "Décomposer le dénominateur en facteurs premiers.",
        "Seulement des $2$ et des $5$ : décimal. Un autre facteur ($3$, $7$…) : pas décimal."
      ],
      exemple: "$\\dfrac{7}{40}$ : $40 = 2^3 \\times 5$, décimal ($0{,}175$). $\\dfrac{5}{12}$ : $12 = 2^2 \\times 3$, pas décimal."
    },
    {
      titre: "Encadrer et arrondir à $10^{-n}$ près",
      etapes: [
        "Écrire le nombre avec au moins $n + 1$ chiffres après la virgule (calculatrice).",
        "Encadrement d'amplitude $10^{-n}$ : couper après le $n$-ième chiffre pour avoir $a$, puis $b = a + 10^{-n}$.",
        "Arrondi : regarder le chiffre suivant. De $0$ à $4$, l'arrondi est $a$ ; de $5$ à $9$, c'est $b$."
      ],
      exemple: "$\\sqrt{5} \\approx 2{,}2360$ : $2{,}23 \\leqslant \\sqrt{5} < 2{,}24$. Le chiffre suivant est $6$ : l'arrondi au centième est $2{,}24$."
    },
    {
      titre: "Passer d'une inégalité à un intervalle",
      etapes: [
        "Repérer la ou les bornes, de la plus petite à la plus grande.",
        "Borne incluse ($\\leqslant$, $\\geqslant$) : crochet tourné vers l'intérieur. Exclue ($<$, $>$) : vers l'extérieur.",
        "Pas de borne d'un côté : $-\\infty$ ou $+\\infty$, avec un crochet toujours ouvert."
      ],
      exemple: "$-1 < x \\leqslant 4 \\iff x \\in \\,]-1\\,;4]$ ; $x < 2 \\iff x \\in \\,]-\\infty\\,;2[$."
    },
    {
      titre: "Déterminer $I \\cap J$ et $I \\cup J$",
      etapes: [
        "Représenter $I$ et $J$ sur une même droite graduée.",
        "$I \\cap J$ : la partie coloriée **deux fois**. $I \\cup J$ : tout ce qui est colorié **au moins une fois**.",
        "Pour chaque borne du résultat, reprendre le crochet de l'intervalle d'où elle vient."
      ],
      exemple: "$I = [-3\\,;2]$, $J = \\,]0\\,;5]$ : $I \\cap J = \\,]0\\,;2]$ et $I \\cup J = [-3\\,;5]$."
    },
    {
      titre: "Traduire $|x - a| \\leqslant r$",
      etapes: [
        "Écrire l'expression sous la forme $|x - a|$ pour trouver le centre $a$ : $|x + 3| = |x - (-3)|$.",
        "Partir de $a$ et aller de $r$ à gauche et de $r$ à droite.",
        "$\\leqslant$ : bornes incluses. $<$ : bornes exclues."
      ],
      exemple: "$|x + 3| < 1 \\iff -4 < x < -2 \\iff x \\in \\,]-4\\,;-2[$."
    }
  ],
  erreurs: [
    "Croire qu'une fraction n'est jamais un entier : $\\dfrac{12}{4} = 3 \\in \\mathbb{N}$.",
    "Écrire $\\dfrac{1}{3} = 0{,}33$ : ce n'est qu'une valeur approchée.",
    "Conclure trop vite qu'une racine carrée est irrationnelle : $\\sqrt{49} = 7$.",
    "Arrondir en coupant simplement : l'arrondi de $2{,}236$ au centième est $2{,}24$, pas $2{,}23$.",
    "Mettre un crochet fermé du côté de l'infini : $[3\\,;+\\infty]$ n'a pas de sens.",
    "Confondre $\\cap$ (« et », la partie commune) et $\\cup$ (« ou », tout ce qui est colorié).",
    "Donner une distance négative : $|2 - 9| = |-7| = 7$.",
    "Se tromper de centre : pour $|x + 2| \\leqslant 1$, le centre est $-2$, pas $2$."
  ]
};
