/*
  CHAPITRE : Seconde — Ensembles de nombres et intervalles
  ---------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce). Dans les formules, la virgule décimale s'écrit {,} : $0{,}35$.
  figure : "intervalle-exemple", "intervalle-infini", "inter-union" ou "valeur-absolue" (droites graduées).
  Pas encore de vidéo ni de PDF pour ce chapitre : ajouter les liens dans playlist, pdfs et videos le moment venu.
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
    }
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
    "Mettre un crochet fermé du côté de l'infini : $[3\\,;+\\infty]$ n'a pas de sens.",
    "Confondre $\\cap$ (« et », la partie commune) et $\\cup$ (« ou », tout ce qui est colorié).",
    "Donner une distance négative : $|2 - 9| = |-7| = 7$.",
    "Se tromper de centre : pour $|x + 2| \\leqslant 1$, le centre est $-2$, pas $2$."
  ]
};
