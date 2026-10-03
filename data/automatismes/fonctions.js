/*
  AUTOMATISMES · FONCTIONS ET REPRÉSENTATIONS (FR01 à FR08)
  ---------------------------------------------------------
  FR01 à FR03 : programme de Seconde. FR04 à FR08 : ajouts de Première.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["auto-fonctions"] = {
  niveau: "Automatismes",
  numero: null,
  periode: "Seconde et Première",
  titre: "Fonctions et représentations",
  accroche: "Lire une courbe, tester un point, reconnaître une fonction affine et manipuler l'équation d'une droite.",

  playlist: "",
  drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv",
  pdfs: [
    { titre: "Dossier élève de Seconde (partie P6)", url: "https://drive.google.com/file/d/1vr9e5N38rAOQLWIvUR5suK6l6ciyoLNY/view" }
  ],

  cours: [
    {
      titre: "Lire une image, un antécédent (FR01)",
      texte:
        "- **Image** de $a$ : on part de $a$ sur l'axe des abscisses, on va jusqu'à la courbe, puis on lit l'ordonnée. C'est $f(a)$.\n" +
        "- **Antécédents** de $b$ : on trace la droite horizontale $y = b$ et on lit les abscisses des points d'intersection avec la courbe.\n" +
        "- Un nombre a **une seule** image, mais peut avoir zéro, un ou plusieurs antécédents.",
      video: { titre: "Vidéo d'Yvan Monka : lire une image ou un antécédent", youtube: "https://youtu.be/VM2iC9P3Qmg" },
      figure: "courbe-u",
      exemple: {
        enonce: "Avec la courbe de $u$ ci-contre, lire $u(1)$ et les antécédents de $3$.",
        solution: "$u(1) = 4$. Les antécédents de $3$ sont $0$ et $2$."
      }
    },
    {
      titre: "Un point est-il sur la courbe ? (FR02)",
      texte:
        "- Le point $M(x_M\\,;y_M)$ appartient à la courbe de $f$ si et seulement si $f(x_M) = y_M$.\n" +
        "- On calcule l'image de l'**abscisse** et on compare à l'**ordonnée**.\n" +
        "- Pour trouver le point de la courbe d'abscisse $a$ : ses coordonnées sont $(a\\,;f(a))$.",
      exemple: {
        enonce: "$f(x) = x^2 - 3x$. Le point $A(-1\\,;4)$ est-il sur la courbe de $f$ ?",
        solution: "$f(-1) = (-1)^2 - 3 \\times (-1) = 1 + 3 = 4$ : oui, $A$ est sur la courbe."
      }
    },
    {
      titre: "Fonctions linéaires et affines (FR03)",
      texte:
        "- Fonction **affine** : $f(x) = mx + p$. Sa courbe est une **droite**.\n" +
        "- Fonction **linéaire** : $f(x) = mx$ (cas $p = 0$). Sa droite passe par l'origine, et elle traduit une situation de proportionnalité.\n" +
        "- $x^2$, $\\sqrt{x}$ ou $\\dfrac{1}{x}$ dans l'expression : ce n'est pas affine.\n" +
        "- Pour reconnaître : on développe ou on simplifie. $\\dfrac{x + 3}{2} = \\dfrac{1}{2}x + \\dfrac{3}{2}$ est affine.",
      figure: "kayaks",
      exemple: {
        enonce: "Deux loueurs de kayaks : A fait payer $8t$ euros pour $t$ heures, B fait payer $4t + 12$. Quelle fonction est linéaire ?",
        solution: "$t \\mapsto 8t$ est linéaire (sa droite passe par l'origine). $t \\mapsto 4t + 12$ est affine, mais pas linéaire."
      }
    },
    {
      titre: "Résoudre graphiquement, lire signe et variations (FR04, FR05, Première)",
      texte:
        "- Les solutions de $f(x) = k$ sont les abscisses des points de la courbe d'ordonnée $k$.\n" +
        "- Les solutions de $f(x) > k$ : les abscisses des points de la courbe situés **au-dessus** de la droite $y = k$.\n" +
        "- Signe de $f$ : $f(x) > 0$ là où la courbe est au-dessus de l'axe des abscisses.\n" +
        "- Variations : $f$ est croissante là où la courbe monte (en lisant de gauche à droite). Les intervalles se lisent sur l'axe des **abscisses**.",
      figure: "parabole-factorisee",
      exemple: {
        enonce: "D'après la courbe ci-contre, sur quel intervalle $f$ est-elle négative ?",
        solution: "La courbe est sous l'axe des abscisses entre $-1$ et $4$ : $f(x) \\leqslant 0$ sur $[-1\\,;4]$."
      }
    },
    {
      titre: "Équations de droites (FR06 à FR08, Première)",
      texte:
        "- Une droite non verticale a une **équation réduite** $y = mx + p$.\n" +
        "- $p$ est l'**ordonnée à l'origine** : la droite coupe l'axe vertical au point $(0\\,;p)$.\n" +
        "- $m$ est le **coefficient directeur** : quand $x$ augmente de $1$, $y$ varie de $m$.\n" +
        "- Avec deux points : $m = \\dfrac{y_B - y_A}{x_B - x_A}$. Puis on trouve $p$ en écrivant que $A$ est sur la droite.\n" +
        "- Pour tracer : on place le point $(0\\,;p)$, puis on avance de $1$ et on monte de $m$.",
      exemple: {
        enonce: "Déterminer l'équation de la droite passant par $A(1\\,;3)$ et $B(3\\,;7)$.",
        solution: "$m = \\dfrac{7 - 3}{3 - 1} = 2$. Puis $3 = 2 \\times 1 + p$, donc $p = 1$.\n\n$(AB) : y = 2x + 1$"
      }
    }
  ],

  videos: [],

  exercices: [
    { type: "lecture-image", titre: "FR01 · Lire une image", etape: "Programme de Seconde", nb: 4 },
    { type: "lecture-antecedents", titre: "FR01 · Lire des antécédents", etape: "Programme de Seconde", nb: 4 },
    { type: "appartenance", titre: "FR02 · Un point est-il sur la courbe ?", etape: "Programme de Seconde", nb: 5 },
    { type: "image-calcul", titre: "FR02 · Calculer une image", etape: "Programme de Seconde", nb: 5 },
    { type: "am-reconnaitre", titre: "FR03 · Linéaire, affine ou non ?", etape: "Programme de Seconde", nb: 5 },
    { type: "resolution-graphique", titre: "FR04 · Résoudre graphiquement", etape: "Ajouts de Première", nb: 4 },
    { type: "am-signe-graph", titre: "FR05 · Variations et extremum sur une courbe", etape: "Ajouts de Première", nb: 5 },
    { type: "am-droite-point", titre: "FR06 · Point d'une droite", etape: "Ajouts de Première", nb: 5 },
    { type: "am-lire-droite", titre: "FR07 · Lire l'équation d'une droite", etape: "Ajouts de Première", nb: 5 },
    { type: "am-coef-dir", titre: "FR08 · Coefficient directeur et ordonnée à l'origine", etape: "Ajouts de Première", nb: 5 },
    { type: "am-flash-fr", titre: "Flash : fonctions mélangées", etape: "Défi", nb: 10 }
  ],

  qcm: [
    { question: "FR01 · Un nombre peut avoir :", choix: ["plusieurs images", "plusieurs antécédents", "ni image ni antécédent, toujours"], bonne: 1, explication: "Une fonction associe une seule image à chaque nombre, mais un nombre peut avoir plusieurs antécédents." },
    { question: "FR01 · Avec la courbe de $u$ (onglet Cours), $u(3) =$", figure: "courbe-u", choix: ["$-1$", "$0$", "$3$", "$4$"], bonne: 1, explication: "La courbe passe par le point $(3\\,;0)$." },
    { question: "FR02 · $f(x) = 2x - 5$. Le point $(3\\,;1)$ est-il sur la courbe ?", choix: ["Oui", "Non"], bonne: 0, explication: "$f(3) = 6 - 5 = 1$ : c'est bien l'ordonnée." },
    { question: "FR02 · $g(x) = x^2 + 1$. Le point $(-2\\,;-3)$ est-il sur la courbe ?", choix: ["Oui", "Non"], bonne: 1, explication: "$g(-2) = 4 + 1 = 5 \\neq -3$." },
    { question: "FR03 · Laquelle de ces fonctions est linéaire ?", choix: ["$f(x) = 3x + 1$", "$f(x) = -4x$", "$f(x) = x^2$", "$f(x) = \\dfrac{4}{x}$"], bonne: 1, explication: "Linéaire : $f(x) = mx$, ici $m = -4$." },
    { question: "FR03 · $f(x) = \\dfrac{2x - 6}{3}$ est :", choix: ["affine", "linéaire", "ni l'une ni l'autre"], bonne: 0, explication: "$f(x) = \\dfrac{2}{3}x - 2$ : affine, non linéaire." },
    { question: "FR05 · Avec la parabole de l'onglet Cours ($f(x) = \\frac{1}{2}(x + 1)(x - 4)$), $f$ est positive sur :", figure: "parabole-factorisee", choix: ["$[-1\\,;4]$", "$]-\\infty\\,;-1] \\cup [4\\,;+\\infty[$", "$[0\\,;4]$"], bonne: 1, explication: "La courbe est au-dessus de l'axe des abscisses à l'extérieur de $[-1\\,;4]$." },
    { question: "FR06 · La droite $y = -2x + 3$ passe par :", choix: ["$(1\\,;1)$", "$(1\\,;5)$", "$(3\\,;0)$", "$(0\\,;-2)$"], bonne: 0, explication: "$-2 \\times 1 + 3 = 1$." },
    { question: "FR07 · Une droite coupe l'axe vertical en $(0\\,;-1)$ et monte de $3$ quand $x$ augmente de $1$. Son équation :", choix: ["$y = -x + 3$", "$y = 3x - 1$", "$y = 3x + 1$", "$y = -3x - 1$"], bonne: 1, explication: "$p = -1$ et $m = 3$." },
    { question: "FR08 · Coefficient directeur de la droite passant par $A(2\\,;5)$ et $B(4\\,;1)$ :", choix: ["$2$", "$-2$", "$-\\dfrac{1}{2}$", "$3$"], bonne: 1, explication: "$m = \\dfrac{1 - 5}{4 - 2} = \\dfrac{-4}{2} = -2$." },
    { question: "FR08 · La droite $y = 0{,}5x - 4$ coupe l'axe des ordonnées en :", choix: ["$(0\\,;0{,}5)$", "$(0\\,;-4)$", "$(-4\\,;0)$", "$(8\\,;0)$"], bonne: 1, explication: "L'ordonnée à l'origine est $p = -4$." }
  ],

  methode: [
    {
      titre: "Lire graphiquement sans se tromper d'axe",
      etapes: [
        "Les $x$ (abscisses, antécédents, intervalles de variation) se lisent sur l'axe **horizontal**.",
        "Les $f(x)$ (ordonnées, images, maximum, minimum) se lisent sur l'axe **vertical**.",
        "Image : on part de l'axe horizontal. Antécédent : on part de l'axe vertical.",
        "Utilise le quadrillage et vérifie l'unité de chaque axe."
      ],
      exemple: "« Le maximum de $f$ est $4$, atteint en $x = 1$ » : $4$ se lit sur l'axe vertical, $1$ sur l'axe horizontal."
    },
    {
      titre: "Trouver l'équation d'une droite",
      etapes: [
        "Sur un graphique : lis $p$ sur l'axe vertical, puis $m$ en avançant de $1$ (ou plus) vers la droite.",
        "Avec deux points : $m = \\dfrac{y_B - y_A}{x_B - x_A}$.",
        "Puis remplace les coordonnées d'un point dans $y = mx + p$ pour trouver $p$.",
        "Vérifie avec le second point."
      ],
      exemple: "$A(0\\,;2)$ et $B(2\\,;-2)$ : $m = \\dfrac{-4}{2} = -2$ et $p = 2$, donc $y = -2x + 2$. Vérification : $-2 \\times 2 + 2 = -2$."
    }
  ],
  erreurs: [
    "L'image se lit sur l'axe vertical, l'antécédent sur l'axe horizontal.",
    "Pour tester un point, on calcule l'image de son **abscisse**, pas de son ordonnée.",
    "Une fonction affine n'est pas toujours linéaire : il faut $p = 0$.",
    "$m = \\dfrac{y_B - y_A}{x_B - x_A}$ : les $y$ en haut, les $x$ en bas, dans le même ordre.",
    "Les intervalles de variation s'écrivent avec des $x$, pas avec des valeurs de $f(x)$."
  ]
};
