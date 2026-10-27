/*
  CHAPITRE : Première technologique — Fonctions : courbes et taux de variation
  ----------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme 2026 de première technologique, « Fonctions de la variable réelle » : modes de représentation, notations
  y = f(x) et x ↦ f(x), taux de variation entre deux valeurs, fonctions monotones et signe du taux, modéliser la dépendance
  entre deux grandeurs, résolution graphique de f(x) = k et f(x) < k, taux de variation = pente de la sécante ;
  situation algorithmique : valeur approchée d'une solution par balayage. Le second degré est au chapitre 8.
  video : vidéos de la chaîne (Seconde) et d'Yvan Monka. Générateurs : préfixe yf- dans assets/exercices-techno.js ; figures "yf-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["techno-fonctions"] = {
  niveau: "Première technologique",
  numero: 7,
  titre: "Fonctions : courbes et taux de variation",
  accroche: "Une grandeur qui dépend d'une autre : expression, courbe, image, antécédent, et le **taux de variation** qui mesure la pente entre deux points.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : généralités sur les fonctions (PDF)", url: "https://www.maths-et-tiques.fr/telech/19FctGenTM.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Fonction, image, antécédent, courbe",
      video: { titre: "Vidéo de ton prof : généralités sur les fonctions, cours complet", youtube: "https://youtu.be/FYTU8j_1Nxg" },
      texte:
        "Une **fonction** $f$ associe à chaque nombre $x$ d'un ensemble **un seul** nombre $f(x)$, son **image**. On écrit $f : x \\mapsto f(x)$ ou $y = f(x)$ ; $x$ est la **variable**.\n\n" +
        "- $f(3) = 7$ : l'image de $3$ est $7$ ; $3$ est **un antécédent** de $7$ (un nombre peut avoir plusieurs antécédents, ou aucun).\n" +
        "- La **courbe représentative** $C_f$ est l'ensemble des points $(x\\,;f(x))$ : le point $(3\\,;7)$ est sur $C_f$.\n\n" +
        "Une fonction peut être donnée par une **expression** ($f(x) = 2x^2 - 1$), une **courbe**, un **tableau de valeurs** ou un programme. La lettre de la variable peut changer : $t$ pour un temps, $n$ pour un nombre d'objets…",
      exemple: {
        enonce: "$f(x) = x^2 - 4x$. Calcule $f(-1)$ et trouve les antécédents de $0$.",
        solution: "$f(-1) = 1 + 4 = 5$. Antécédents de $0$ : $x^2 - 4x = x(x - 4) = 0$, soit $x = 0$ ou $x = 4$."
      }
    },
    {
      titre: "Taux de variation",
      figure: "yf-cours-secante",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un taux de variation d'une fonction", youtube: "https://youtu.be/xd0zEwVOmHE" },
      texte:
        "Le **taux de variation** de $f$ entre $a$ et $b$ ($a \\neq b$) est\n\n" +
        "$\\dfrac{f(b) - f(a)}{b - a}$\n\n" +
        "C'est la variation de $y$ divisée par la variation de $x$ : « de combien $f$ change, en moyenne, par unité de $x$ ». Graphiquement, c'est le **coefficient directeur de la sécante** $(AB)$ qui joint les points $A(a\\,;f(a))$ et $B(b\\,;f(b))$.\n\n" +
        "En contexte : si $d(t)$ est une distance en km et $t$ un temps en heures, le taux de variation entre deux instants est une **vitesse moyenne** en km/h. Si $C(q)$ est un coût, le taux entre deux quantités est un coût moyen par unité supplémentaire.",
      exemple: {
        enonce: "$f(x) = x^2$. Taux de variation entre $1$ et $3$ ?",
        solution: "$\\dfrac{f(3) - f(1)}{3 - 1} = \\dfrac{9 - 1}{2} = 4$ : la sécante entre $(1\\,;1)$ et $(3\\,;9)$ a pour pente $4$."
      }
    },
    {
      titre: "Fonctions monotones et signe du taux",
      figure: "yf-cours-croissante",
      video: { titre: "Vidéo d'Yvan Monka : étudier les variations à l'aide du taux de variation", youtube: "https://youtu.be/tqtZeVVJ3YU" },
      texte:
        "$f$ est **croissante** sur un intervalle $I$ si, pour tous $a < b$ de $I$, $f(a) \\leqslant f(b)$ : les images sont dans le même ordre que les nombres. Elle est **décroissante** si $f(a) \\geqslant f(b)$ : ordre inverse. Une fonction croissante ou décroissante sur $I$ est dite **monotone** sur $I$.\n\n" +
        "**Lien avec le taux** : $f$ est croissante sur $I$ si et seulement si tous ses taux de variation entre deux valeurs de $I$ sont positifs (toutes les sécantes montent) ; décroissante si et seulement s'ils sont tous négatifs.\n\n" +
        "Pour une fonction **affine** $f(x) = mx + p$, le taux de variation vaut toujours $m$ : elle est croissante si $m > 0$, décroissante si $m < 0$.\n\n" +
        "Un **tableau de variations** résume tout : flèches qui montent ou descendent, valeurs aux bornes, extremums.",
      exemple: {
        enonce: "$f$ est décroissante sur $[0\\,;10]$. Compare $f(2)$ et $f(7)$.",
        solution: "$2 < 7$ et $f$ décroissante : $f(2) \\geqslant f(7)$."
      }
    },
    {
      titre: "Résoudre graphiquement, lire une courbe en contexte",
      figure: "yf-cours-temperature",
      video: { titre: "Vidéo de ton prof : résoudre graphiquement équations et inéquations", youtube: "https://youtu.be/M1WsNoPcego" },
      texte:
        "Sur une courbe (ici la température en fonction de l'heure) :\n\n" +
        "- $f(t) = 28$ : on trace la droite $y = 28$ et on lit les abscisses des intersections ($10$ h et $18$ h) ;\n" +
        "- $f(t) > 28$ : les abscisses où la courbe est **au-dessus** de la droite : $t \\in ]10\\,;18[$, il fait plus de $28$ °C entre $10$ h et $18$ h ;\n" +
        "- le **maximum** est l'ordonnée du point le plus haut ($32$ °C, atteint à $14$ h).\n\n" +
        "Toujours lire les **unités** sur les axes et répondre dans le contexte (des heures, des degrés…).",
      exemple: {
        enonce: "Sur la figure, pendant combien de temps la température dépasse-t-elle $28$ °C ?",
        solution: "De $10$ h à $18$ h, soit $8$ heures."
      }
    },
    {
      titre: "Modéliser la dépendance entre deux grandeurs",
      video: { titre: "Vidéo de ton prof : modéliser par une fonction, l'enclos", youtube: "https://youtu.be/LeM5BO2az9w" },
      texte:
        "Pour étudier un problème, on choisit une variable $x$ (une longueur, une quantité, un temps), on exprime la grandeur étudiée en fonction de $x$, puis on utilise la fonction obtenue (courbe, tableau, calcul).\n\n" +
        "Exemples : le prix d'une course de taxi $p(x) = 2{,}5x + 4$ ($x$ en km) ; l'aire d'un enclos de largeur $x$ construit contre un mur avec $40$ m de grillage, $A(x) = x(40 - 2x)$ ; une grandeur **inversement proportionnelle** à $x$, comme le temps de trajet $t(v) = \\dfrac{120}{v}$ pour $120$ km à la vitesse $v$.\n\n" +
        "Il faut aussi préciser l'**ensemble de définition** imposé par le contexte : pour l'enclos, $0 < x < 20$.",
      exemple: {
        enonce: "Un carré de côté $x$ est entouré d'une bordure de $1$ m. Exprime l'aire $B(x)$ de la bordure.",
        solution: "Grand carré de côté $x + 2$ : $B(x) = (x + 2)^2 - x^2 = 4x + 4$."
      }
    },
    {
      titre: "Python : une solution par balayage",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les boucles en Python", youtube: "https://youtu.be/i_imOJ9Vw0U" },
      texte:
        "Quand on ne sait pas résoudre $f(x) = k$ exactement, on **balaie** : on calcule $f(x)$ pour des valeurs régulièrement espacées jusqu'à dépasser $k$.\n\n" +
        "```python\ndef f(x):\n    return x ** 2 - 2\n\nx = 1\nwhile f(x) < 0:        # on cherche où x² − 2 devient positif\n    x = x + 0.01\nprint(x)                # 1.42 : la solution √2 est entre 1,41 et 1,42\n```\n\n" +
        "Au tableur, un tableau de valeurs avec un pas de $0{,}1$ puis $0{,}01$ fait la même chose. Le balayage donne un **encadrement** de la solution, de plus en plus précis quand le pas diminue."
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "yf-image", titre: "Calculer une image", etape: "Notations", nb: 5 },
    { type: "yf-antecedent", titre: "Trouver des antécédents", etape: "Notations", nb: 5 },
    { type: "yf-taux", titre: "Calculer un taux de variation", etape: "Taux de variation", nb: 5 },
    { type: "yf-secante", titre: "Taux de variation et sécante", etape: "Taux de variation", nb: 4 },
    { type: "yf-monotonie", titre: "Variations et signe du taux", etape: "Variations", nb: 5 },
    { type: "yf-courbe", titre: "Lire une courbe en contexte", etape: "Graphique", nb: 4 },
    { type: "yf-modeliser", titre: "Modéliser une situation", etape: "Modéliser", nb: 5 },
    { type: "yf-balayage", titre: "Encadrer une solution par balayage", etape: "Python", nb: 4 },
    { type: "yf-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Si $f(x) = 3x^2 - 5$, alors $f(-2)$ vaut :", choix: ["$7$", "$-17$", "$31$", "$-11$"], bonne: 0, explication: "$3 \\times 4 - 5 = 7$." },
    { question: "$f(4) = 9$ signifie que :", choix: ["l'image de $4$ est $9$", "l'image de $9$ est $4$", "$4$ et $9$ sont égaux", "la courbe passe par $(9\\,;4)$"], bonne: 0, explication: "On part de $4$, on arrive à $9$ ; le point $(4\\,;9)$ est sur la courbe." },
    { question: "Si $f(x) = 2x - 6$, l'antécédent de $4$ est :", choix: ["$5$", "$2$", "$-2$", "$14$"], bonne: 0, explication: "$2x - 6 = 4 \\Leftrightarrow x = 5$." },
    { question: "Par la fonction $x \\mapsto x^2$, le nombre $16$ a :", choix: ["deux antécédents, $4$ et $-4$", "un seul antécédent, $4$", "aucun antécédent", "un seul antécédent, $8$"], bonne: 0, explication: "$4^2 = 16$ et $(-4)^2 = 16$." },
    { question: "Le taux de variation de $f$ entre $a$ et $b$ est :", choix: ["$\\dfrac{f(b) - f(a)}{b - a}$", "$\\dfrac{b - a}{f(b) - f(a)}$", "$f(b) - f(a)$", "$\\dfrac{f(b)}{f(a)}$"], bonne: 0, explication: "Variation des images sur variation de la variable." },
    { question: "$f(1) = 2$ et $f(5) = 14$. Le taux de variation entre $1$ et $5$ vaut :", choix: ["$3$", "$12$", "$\\dfrac{1}{3}$", "$4$"], bonne: 0, explication: "$\\dfrac{14 - 2}{5 - 1} = \\dfrac{12}{4} = 3$." },
    { question: "$f(2) = 10$ et $f(6) = 4$. Le taux de variation entre $2$ et $6$ vaut :", choix: ["$-1{,}5$", "$1{,}5$", "$-6$", "$-\\dfrac{2}{3}$"], bonne: 0, explication: "$\\dfrac{4 - 10}{6 - 2} = \\dfrac{-6}{4} = -1{,}5$." },
    { question: "Graphiquement, le taux de variation entre $a$ et $b$ est :", choix: ["la pente de la sécante passant par les points d'abscisses $a$ et $b$", "la hauteur de la courbe en $b$", "l'aire sous la courbe", "la distance entre $a$ et $b$"], bonne: 0, explication: "C'est le coefficient directeur de la droite $(AB)$." },
    { question: "Pour $f(x) = x^2$, le taux de variation entre $2$ et $5$ vaut :", choix: ["$7$", "$21$", "$3$", "$10$"], bonne: 0, explication: "$\\dfrac{25 - 4}{3} = 7$." },
    { question: "Pour une fonction affine $f(x) = -4x + 1$, le taux de variation entre deux valeurs quelconques vaut :", choix: ["$-4$", "$1$", "$-3$", "ça dépend des valeurs"], bonne: 0, explication: "Toujours le coefficient directeur." },
    { question: "Si $f$ est croissante sur $[1\\,;8]$, alors :", choix: ["$f(3) \\leqslant f(6)$", "$f(3) \\geqslant f(6)$", "$f(3) = f(6)$", "$f(3) < 0$"], bonne: 0, explication: "Les images sont rangées comme les nombres." },
    { question: "Si tous les taux de variation de $f$ sur $I$ sont négatifs, alors $f$ est :", choix: ["décroissante sur $I$", "croissante sur $I$", "constante sur $I$", "négative sur $I$"], bonne: 0, explication: "Toutes les sécantes descendent." },
    { question: "Une fonction monotone sur $I$ est une fonction :", choix: ["croissante sur $I$ ou décroissante sur $I$", "constante", "positive", "qui change de sens de variation"], bonne: 0, explication: "Monotone $=$ un seul sens de variation sur l'intervalle." },
    { question: "La température $f(t)$ vérifie $f(t) > 30$ exactement pour $t \\in ]11\\,;16[$. Cela signifie qu'il fait plus de $30$ °C :", choix: ["entre $11$ h et $16$ h", "à $11$ h et à $16$ h seulement", "pendant $30$ minutes", "avant $11$ h et après $16$ h"], bonne: 0, explication: "Les solutions sont les instants où la courbe est au-dessus de $30$." },
    { question: "Le maximum d'une fonction sur un intervalle se lit :", choix: ["sur l'ordonnée du point le plus haut de la courbe", "sur l'abscisse du point le plus haut", "à l'extrémité droite de la courbe", "à l'origine"], bonne: 0, explication: "Le maximum est une valeur de $f$, donc une ordonnée." },
    { question: "Un taxi facture $3$ € puis $2$ € par km. Le prix d'une course de $x$ km est :", choix: ["$f(x) = 2x + 3$", "$f(x) = 3x + 2$", "$f(x) = 5x$", "$f(x) = 6x$"], bonne: 0, explication: "$2$ € multiplié par le nombre de km, plus $3$ € fixes." },
    { question: "Un rectangle a pour côtés $x$ et $x + 3$. Son aire est :", choix: ["$x^2 + 3x$", "$2x + 3$", "$4x + 6$", "$x^2 + 3$"], bonne: 0, explication: "Aire $= x(x + 3) = x^2 + 3x$." },
    { question: "Pour un trajet de $200$ km, le temps en fonction de la vitesse $v$ (km/h) est :", choix: ["$t(v) = \\dfrac{200}{v}$", "$t(v) = 200v$", "$t(v) = \\dfrac{v}{200}$", "$t(v) = 200 - v$"], bonne: 0, explication: "Temps $=$ distance $\\div$ vitesse : grandeurs inversement proportionnelles." },
    { question: "Par balayage avec un pas de $0{,}1$, on trouve $f(1{,}4) < 0$ et $f(1{,}5) > 0$. La solution de $f(x) = 0$ est :", choix: ["entre $1{,}4$ et $1{,}5$", "exactement $1{,}45$", "entre $1{,}5$ et $1{,}6$", "égale à $1{,}4$"], bonne: 0, explication: "$f$ change de signe entre ces deux valeurs." },
    { question: "Dans $\\texttt{while f(x) < 0: x = x + 0.1}$, la boucle s'arrête quand :", choix: ["$f(x) \\geqslant 0$", "$f(x) < 0$", "$x = 0$", "$x > 0{,}1$"], bonne: 0, explication: "La boucle continue tant que $f(x) < 0$." },
    { question: "Si $f(0) = 3$, $f(2) = 7$ et $f(4) = 9$, le taux de variation est :", choix: ["plus grand entre $0$ et $2$ qu'entre $2$ et $4$", "le même sur les deux intervalles", "plus grand entre $2$ et $4$", "nul"], bonne: 0, explication: "$\\dfrac{4}{2} = 2$ puis $\\dfrac{2}{2} = 1$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Image ou antécédent ?",
      etapes: [
        "« Calculer l'image de $a$ » ou « calculer $f(a)$ » : remplacer $x$ par $a$ dans l'expression.",
        "« Trouver les antécédents de $k$ » : résoudre l'équation $f(x) = k$.",
        "Graphiquement : image $=$ ordonnée du point d'abscisse $a$ ; antécédents $=$ abscisses des points d'ordonnée $k$.",
        "Vérifier : un antécédent $x_0$ doit redonner $f(x_0) = k$."
      ],
      exemple: "$f(x) = 3x + 1$ : image de $2$ : $7$ ; antécédent de $10$ : $3x + 1 = 10$, $x = 3$."
    },
    {
      titre: "Calculer et interpréter un taux de variation",
      figure: "yf-cours-secante",
      etapes: [
        "Calculer $f(a)$ et $f(b)$.",
        "Écrire $\\dfrac{f(b) - f(a)}{b - a}$, le même ordre en haut et en bas.",
        "Simplifier ; le signe donne le sens de la variation entre $a$ et $b$.",
        "Interpréter : pente de la sécante, ou variation moyenne par unité (vitesse moyenne, coût par unité…)."
      ],
      exemple: "$d(1) = 60$ km et $d(3) = 180$ km : taux $\\dfrac{120}{2} = 60$ km/h, vitesse moyenne."
    },
    {
      titre: "Lire une courbe en contexte",
      figure: "yf-cours-temperature",
      etapes: [
        "Lire les grandeurs et unités des deux axes.",
        "Pour $f(t) = k$ : tracer $y = k$, lire les abscisses des intersections.",
        "Pour $f(t) > k$ : repérer où la courbe est au-dessus, donner un intervalle de $t$.",
        "Répondre par une phrase avec les unités (« entre $10$ h et $18$ h »)."
      ],
      exemple: "Courbe au-dessus de $28$ °C de $10$ h à $18$ h : $f(t) > 28 \\Leftrightarrow t \\in ]10\\,;18[$."
    },
    {
      titre: "Modéliser une situation",
      etapes: [
        "Choisir la variable $x$ et dire ce qu'elle représente, avec son unité.",
        "Exprimer les autres longueurs ou quantités en fonction de $x$.",
        "Écrire la grandeur cherchée : $f(x) = \\dots$, développer si utile.",
        "Préciser les valeurs possibles de $x$ et tester avec une valeur simple."
      ],
      exemple: "Enclos contre un mur, $40$ m de grillage, largeur $x$ : longueur $40 - 2x$, aire $A(x) = x(40 - 2x)$, $0 < x < 20$."
    }
  ],
  erreurs: [
    "Confondre image et antécédent : dans $f(2) = 5$, $5$ est l'image de $2$ et $2$ un antécédent de $5$.",
    "Oublier les parenthèses en remplaçant $x$ par un négatif : $f(-3)$ avec $x^2$ donne $(-3)^2 = 9$.",
    "Inverser le taux : c'est $\\dfrac{f(b) - f(a)}{b - a}$, les images au numérateur.",
    "Ne pas mettre le même ordre en haut et en bas : $\\dfrac{f(b) - f(a)}{a - b}$ change le signe.",
    "Croire que le taux de variation d'une fonction non affine est le même partout.",
    "Lire une inéquation graphique sur l'axe des ordonnées : les solutions sont des abscisses.",
    "Pour une fonction décroissante, ranger les images dans le même ordre que les nombres.",
    "Oublier l'unité et le contexte dans la réponse (heures, euros, °C)."
  ]
};
