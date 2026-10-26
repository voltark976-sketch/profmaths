/*
  AUTOMATISMES · FONCTIONS ET REPRÉSENTATIONS
  -------------------------------------------
  Seconde 2026 : images et antécédents lus sur un graphique, équation de courbe (appartenance d'un point, coordonnées),
  fonctions linéaires et affines. Première 2026 : résolution graphique, signe et tableau de variations lus sur un graphique,
  tracer une droite, lire l'équation réduite d'une droite, coefficient directeur à partir de deux points.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["auto-fonctions"] = {
  niveau: "Automatismes",
  numero: null,
  periode: "Seconde et Première",
  titre: "Fonctions et représentations",
  accroche: "Lire une courbe, tester un point, reconnaître une fonction affine, tracer une droite et lire son équation.",

  playlist: "https://www.youtube.com/playlist?list=PLVTjofGlms14",
  drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv",
  pdfs: [
    { titre: "Dossier élève de Seconde (partie P6)", url: "https://drive.google.com/file/d/1vr9e5N38rAOQLWIvUR5suK6l6ciyoLNY/view" }
  ],

  cours: [
    {
      titre: "Lire une image, un antécédent",
      video: { titre: "Vidéo de ton prof : lire un graphique, images et antécédents", youtube: "https://youtu.be/SSnZlcRgllg" },
      texte:
        "- **Image** de $a$ : on part de $a$ sur l'axe des abscisses, on va jusqu'à la courbe, puis on lit l'ordonnée. C'est $f(a)$.\n" +
        "- **Antécédents** de $b$ : on trace la droite horizontale $y = b$ et on lit les abscisses des points d'intersection avec la courbe.\n" +
        "- Un nombre a **une seule** image, mais peut avoir zéro, un ou plusieurs antécédents.",
      figure: "courbe-u",
      exemple: {
        enonce: "Avec la courbe de $u$ ci-contre, lire $u(1)$ et les antécédents de $3$.",
        solution: "$u(1) = 4$. Les antécédents de $3$ sont $0$ et $2$."
      }
    },
    {
      titre: "Un point est-il sur la courbe ?",
      video: { titre: "Vidéo de ton prof : exploiter une équation de courbe", youtube: "https://youtu.be/A--qoNu8uno" },
      texte:
        "- Le point $M(x_M\\,;y_M)$ appartient à la courbe de $f$ si et seulement si $f(x_M) = y_M$.\n" +
        "- On calcule l'image de l'**abscisse** et on compare à l'**ordonnée**. Sur la figure, $f(x) = x^2 - 2$ : $f(2) = 2$, donc $A(2\\,;2)$ est sur la courbe ; $f(1) = -1 \\neq 1$, donc $B(1\\,;1)$ n'y est pas.\n" +
        "- Pour trouver le point de la courbe d'abscisse $a$ : ses coordonnées sont $(a\\,;f(a))$.",
      figure: "am-cours-appartenance",
      exemple: {
        enonce: "$f(x) = x^2 - 3x$. Le point $A(-1\\,;4)$ est-il sur la courbe de $f$ ?",
        solution: "$f(-1) = (-1)^2 - 3 \\times (-1) = 1 + 3 = 4$ : oui, $A$ est sur la courbe."
      }
    },
    {
      titre: "Fonctions linéaires et affines",
      video: { titre: "Vidéo de ton prof : reconnaître une fonction affine", youtube: "https://youtu.be/hfiPikWtwoA" },
      texte:
        "- Fonction **affine** : $f(x) = mx + p$. Sa courbe est une **droite**.\n" +
        "- Fonction **linéaire** : $f(x) = mx$ (cas $p = 0$). Sa droite passe par l'origine, et elle traduit une situation de proportionnalité.\n" +
        "- $x^2$, $\\sqrt{x}$ ou $\\dfrac{1}{x}$ dans l'expression : ce n'est pas affine.\n" +
        "- Pour reconnaître : on développe ou on simplifie. $\\dfrac{x + 3}{2} = \\dfrac{1}{2}x + \\dfrac{3}{2}$ est affine.",
      figure: "kayaks",
      exemple: {
        enonce: "Deux loueurs de kayaks de N'Gouja : A fait payer $8t$ euros pour $t$ heures, B fait payer $4t + 12$. Quelle fonction est linéaire ?",
        solution: "$t \\mapsto 8t$ est linéaire (sa droite passe par l'origine). $t \\mapsto 4t + 12$ est affine, mais pas linéaire."
      }
    },
    {
      titre: "Résoudre graphiquement une équation, une inéquation (Première)",
      video: { titre: "Vidéo d'Yvan Monka : résoudre graphiquement une équation et une inéquation", youtube: "https://youtu.be/OCq4-nDmSrI" },
      texte:
        "- Les solutions de $f(x) = k$ sont les abscisses des points de la courbe d'ordonnée $k$ : on trace la droite horizontale $y = k$.\n" +
        "- Les solutions de $f(x) < k$ : les abscisses des points de la courbe situés **en dessous** de la droite $y = k$ ; pour $f(x) > k$, **au-dessus**.\n" +
        "- Sur la figure, $f(x) = x^2 - 2x$ : les solutions de $f(x) = 3$ sont $-1$ et $3$, celles de $f(x) < 3$ forment l'intervalle $]-1\\,;3[$.",
      figure: "am-cours-resolution",
      exemple: {
        enonce: "Avec la courbe ci-contre, résoudre $f(x) \\leqslant 0$.",
        solution: "La courbe est sous l'axe des abscisses entre $0$ et $2$, et elle le coupe en $0$ et en $2$ : $S = [0\\,;2]$."
      }
    },
    {
      titre: "Signe et variations lus sur un graphique (Première)",
      video: { titre: "Vidéo d'Yvan Monka : déterminer graphiquement le signe d'une fonction", youtube: "https://youtu.be/AZvjA44WfPw" },
      texte:
        "- Signe de $f$ : $f(x) > 0$ là où la courbe est **au-dessus** de l'axe des abscisses, $f(x) < 0$ là où elle est en dessous.\n" +
        "- Variations : $f$ est croissante là où la courbe monte (en lisant de gauche à droite), décroissante là où elle descend.\n" +
        "- Tableau de variations : on écrit sur la première ligne les abscisses où la courbe change de sens (et les bornes), puis des flèches avec les ordonnées correspondantes. Les intervalles se lisent sur l'axe des **abscisses**.",
      figure: "parabole-factorisee",
      exemple: {
        enonce: "D'après la courbe ci-contre, sur quel intervalle $f$ est-elle négative ?",
        solution: "La courbe est sous l'axe des abscisses entre $-1$ et $4$ : $f(x) \\leqslant 0$ sur $[-1\\,;4]$."
      }
    },
    {
      titre: "Équation réduite d'une droite (Première)",
      video: { titre: "Vidéo d'Yvan Monka : déterminer graphiquement une fonction affine", youtube: "https://youtu.be/OnnrfqztpTY" },
      texte:
        "- Une droite non verticale a une **équation réduite** $y = mx + p$.\n" +
        "- $p$ est l'**ordonnée à l'origine** : la droite coupe l'axe vertical au point $(0\\,;p)$.\n" +
        "- $m$ est le **coefficient directeur** : quand $x$ augmente de $1$, $y$ varie de $m$. Sur la figure, $y = 2x + 1$ : on part de $(0\\,;1)$, on avance de $1$ et on monte de $2$.\n" +
        "- Avec deux points : $m = \\dfrac{y_B - y_A}{x_B - x_A}$. Puis on trouve $p$ en écrivant que $A$ est sur la droite.",
      figure: "am-cours-droite",
      exemple: {
        enonce: "Déterminer l'équation réduite de la droite passant par $A(1\\,;5)$ et $B(3\\,;1)$.",
        solution: "$m = \\dfrac{1 - 5}{3 - 1} = \\dfrac{-4}{2} = -2$. Puis $5 = -2 \\times 1 + p$, donc $p = 7$.\n\n$(AB) : y = -2x + 7$. Vérification avec $B$ : $-2 \\times 3 + 7 = 1$."
      }
    },
    {
      titre: "Tracer une droite (Première)",
      video: { titre: "Vidéo d'Yvan Monka : représenter une droite dans un repère", youtube: "https://youtu.be/xGNi2cQ6xU8" },
      texte:
        "- Par son équation réduite $y = mx + p$ : on place le point $(0\\,;p)$, puis un deuxième point en avançant de $1$ et en montant de $m$ (ou en calculant $y$ pour une autre valeur de $x$).\n" +
        "- Par un point et son coefficient directeur : sur la figure, $m = \\dfrac{2}{3}$ et la droite passe par $A(-2\\,;-1)$ ; depuis $A$, on avance de $3$ et on monte de $2$ pour arriver en $B(1\\,;1)$, puis on trace $(AB)$.\n" +
        "- Si $m < 0$, on **descend** au lieu de monter.",
      figure: "am-cours-trace",
      exemple: {
        enonce: "Donner deux points de la droite d'équation $y = -2x + 3$ pour la tracer.",
        solution: "Pour $x = 0$, $y = 3$ : le point $(0\\,;3)$. Puis on avance de $1$ et on descend de $2$ : le point $(1\\,;1)$. On trace la droite qui passe par ces deux points."
      }
    }
  ],

  videos: [
    { titre: "Exercice 16 · Images et antécédents", type: "Graphique", youtube: "https://youtu.be/SSnZlcRgllg" },
    { titre: "Exercice 17 · Équation d'une courbe", type: "Courbe", youtube: "https://youtu.be/A--qoNu8uno" },
    { titre: "Exercice 18 · Reconnaître une fonction affine", type: "Affine", youtube: "https://youtu.be/hfiPikWtwoA" }
  ],
  videosNote: "Vidéos de ton prof (playlist « Secondes : automatismes ») : les énoncés sont dans le dossier élève ci-dessus.",

  exercices: [
    { type: "lecture-image", titre: "Lire une image", etape: "Automatismes de Seconde", nb: 4 },
    { type: "lecture-antecedents", titre: "Lire des antécédents", etape: "Automatismes de Seconde", nb: 4 },
    { type: "am-appartenance", titre: "Un point est-il sur la courbe ?", etape: "Automatismes de Seconde", nb: 5 },
    { type: "image-calcul", titre: "Calculer une image", etape: "Automatismes de Seconde", nb: 5 },
    { type: "am-droite-point", titre: "Point d'une droite", etape: "Automatismes de Seconde", nb: 5 },
    { type: "am-reconnaitre", titre: "Linéaire, affine ou non ?", etape: "Automatismes de Seconde", nb: 5 },
    { type: "resolution-graphique", titre: "Résoudre graphiquement", etape: "Automatismes de Première", nb: 4 },
    { type: "am-signe-graph", titre: "Signe et variations sur une courbe", etape: "Automatismes de Première", nb: 5 },
    { type: "am-trace-droite", titre: "Tracer une droite", etape: "Automatismes de Première", nb: 5 },
    { type: "am-lire-droite", titre: "Lire l'équation réduite d'une droite", etape: "Automatismes de Première", nb: 5 },
    { type: "am-coef-dir", titre: "Coefficient directeur et ordonnée à l'origine", etape: "Automatismes de Première", nb: 5 },
    { type: "am-flash-fr", titre: "Flash : fonctions mélangées", etape: "Défi", nb: 10 }
  ],

  qcm: [
    { question: "Pour une fonction $f$, un nombre peut avoir :", choix: ["plusieurs antécédents", "plusieurs images", "toujours exactement un antécédent", "toujours exactement deux antécédents"], bonne: 0, explication: "Une fonction associe une seule image à chaque nombre, mais un nombre peut avoir zéro, un ou plusieurs antécédents." },
    { question: "Avec la courbe de $u$ ci-contre, $u(3) =$", figure: "courbe-u", choix: ["$-1$", "$0$", "$3$", "$4$"], bonne: 1, explication: "On part de $3$ sur l'axe des abscisses : la courbe passe par le point $(3\\,;0)$, donc $u(3) = 0$." },
    { question: "$f(x) = 2x - 5$. Le point $(3\\,;1)$ est-il sur la courbe de $f$ ?", choix: ["Oui, car $f(3) = 1$", "Non, car $f(1) = -3$", "Non, car $f(3) = 6$", "On ne peut pas le savoir sans tracer la courbe"], bonne: 0, explication: "On calcule l'image de l'abscisse : $f(3) = 2 \\times 3 - 5 = 1$, c'est bien l'ordonnée du point." },
    { question: "$g(x) = x^2 + 1$. Le point $(-2\\,;-3)$ est-il sur la courbe de $g$ ?", choix: ["Non, car $g(-2) = 5$", "Oui, car $g(-2) = -3$", "Non, car $g(-3) = 10$", "On ne peut pas le savoir sans tracer la courbe"], bonne: 0, explication: "$g(-2) = (-2)^2 + 1 = 4 + 1 = 5 \\neq -3$. Attention : $-2^2 + 1 = -3$ est faux, car $(-2)^2 = 4$." },
    { question: "Laquelle de ces fonctions est linéaire ?", choix: ["$f(x) = 3x + 1$", "$f(x) = -4x$", "$f(x) = x^2$", "$f(x) = \\dfrac{4}{x}$"], bonne: 1, explication: "Linéaire : $f(x) = mx$, ici $m = -4$." },
    { question: "$f(x) = \\dfrac{2x - 6}{3}$ définit une fonction :", choix: ["affine, mais pas linéaire", "linéaire", "ni affine, ni linéaire", "constante"], bonne: 0, explication: "$f(x) = \\dfrac{2}{3}x - 2$ : de la forme $mx + p$ avec $p = -2 \\neq 0$, donc affine non linéaire." },
    { question: "La parabole ci-contre représente $f(x) = \\dfrac{1}{2}(x + 1)(x - 4)$. La fonction $f$ est positive ou nulle sur :", figure: "parabole-factorisee", choix: ["$[-1\\,;4]$", "$]-\\infty\\,;-1] \\cup [4\\,;+\\infty[$", "$[0\\,;4]$", "$[-1\\,;+\\infty[$"], bonne: 1, explication: "La courbe est au-dessus de l'axe des abscisses à l'extérieur de $[-1\\,;4]$, et le coupe en $-1$ et $4$." },
    { question: "La droite d'équation $y = -2x + 3$ passe par :", choix: ["$(1\\,;1)$", "$(1\\,;5)$", "$(3\\,;0)$", "$(0\\,;-2)$"], bonne: 0, explication: "$-2 \\times 1 + 3 = 1$ : le point $(1\\,;1)$ est sur la droite." },
    { question: "Une droite coupe l'axe vertical en $(0\\,;-1)$ et monte de $3$ quand $x$ augmente de $1$. Son équation est :", choix: ["$y = -x + 3$", "$y = 3x - 1$", "$y = 3x + 1$", "$y = -3x - 1$"], bonne: 1, explication: "$p = -1$ et $m = 3$." },
    { question: "Le coefficient directeur de la droite passant par $A(2\\,;5)$ et $B(4\\,;1)$ est :", choix: ["$2$", "$-2$", "$-\\dfrac{1}{2}$", "$3$"], bonne: 1, explication: "$m = \\dfrac{1 - 5}{4 - 2} = \\dfrac{-4}{2} = -2$." },
    { question: "La droite d'équation $y = 0{,}5x - 4$ coupe l'axe des ordonnées en :", choix: ["$(0\\,;0{,}5)$", "$(0\\,;-4)$", "$(-4\\,;0)$", "$(8\\,;0)$"], bonne: 1, explication: "L'ordonnée à l'origine est $p = -4$. ($(8\\,;0)$ est le point où elle coupe l'axe des abscisses.)" },
    { question: "On sait que $f(2) = 5$. Alors :", choix: ["$5$ est l'image de $2$, et $2$ est un antécédent de $5$", "$2$ est l'image de $5$", "$5$ est un antécédent de $2$", "la courbe de $f$ passe par le point $(5\\,;2)$"], bonne: 0, explication: "$f(2) = 5$ : on part de $2$, on arrive à $5$. La courbe passe par $(2\\,;5)$, abscisse d'abord." },
    { question: "L'image de $-3$ par la fonction $f(x) = x^2 - 1$ est :", choix: ["$8$", "$-10$", "$-7$", "$10$"], bonne: 0, explication: "$f(-3) = (-3)^2 - 1 = 9 - 1 = 8$. Attention aux parenthèses : $-3^2 = -9$, mais $(-3)^2 = 9$." },
    { question: "Les antécédents de $9$ par la fonction $f(x) = x^2$ sont :", choix: ["$-3$ et $3$", "$3$ seulement", "$81$", "$-9$ et $9$"], bonne: 0, explication: "On cherche $x$ tel que $x^2 = 9$ : $x = 3$ ou $x = -3$. ($81$ est l'image de $9$.)" },
    { question: "Le point de la courbe de $f(x) = 3x - 4$ d'abscisse $2$ a pour coordonnées :", choix: ["$(2\\,;2)$", "$(2\\,;6)$", "$(2\\,;10)$", "$(2\\,;-2)$"], bonne: 0, explication: "Ses coordonnées sont $(2\\,;f(2))$, avec $f(2) = 3 \\times 2 - 4 = 2$." },
    { question: "$h(x) = \\dfrac{12}{x}$. Le point $(3\\,;3)$ est-il sur la courbe de $h$ ?", choix: ["Non, car $h(3) = 4$", "Oui, car $h(3) = 3$", "Non, car $h(3) = 36$", "Non, car $h(3) = \\dfrac{1}{4}$"], bonne: 0, explication: "$h(3) = \\dfrac{12}{3} = 4 \\neq 3$ : le point n'est pas sur la courbe." },
    { question: "$f(x) = -x^2 + 4$. Le point $(-1\\,;3)$ est-il sur la courbe de $f$ ?", choix: ["Oui, car $f(-1) = 3$", "Non, car $f(-1) = 5$", "Non, car $f(-1) = -5$", "Non, car $f(3) = -5$"], bonne: 0, explication: "$f(-1) = -(-1)^2 + 4 = -1 + 4 = 3$ : c'est bien l'ordonnée du point. ($f(3)$ ne sert à rien : on calcule l'image de l'abscisse $-1$.)" },
    { question: "Laquelle de ces fonctions est affine ?", choix: ["$f(x) = (x + 1)^2 - x^2$", "$f(x) = x^2 + x$", "$f(x) = \\sqrt{x} + 1$", "$f(x) = \\dfrac{1}{x} + 2$"], bonne: 0, explication: "En développant : $(x + 1)^2 - x^2 = x^2 + 2x + 1 - x^2 = 2x + 1$, de la forme $mx + p$." },
    { question: "Au marché de Mamoudzou, les bananes coûtent $2$ € le kilo. Le prix (en €) de $x$ kg de bananes est donné par une fonction :", choix: ["linéaire : $x \\mapsto 2x$", "affine non linéaire : $x \\mapsto x + 2$", "ni affine, ni linéaire", "constante, égale à $2$"], bonne: 0, explication: "Le prix est proportionnel à la masse : c'est la fonction linéaire $x \\mapsto 2x$, dont la droite passe par l'origine." },
    { question: "Pour résoudre graphiquement $f(x) = 2$, on lit :", choix: ["les abscisses des points de la courbe d'ordonnée $2$", "l'ordonnée du point de la courbe d'abscisse $2$", "l'image de $2$", "l'ordonnée du point où la courbe coupe l'axe vertical"], bonne: 0, explication: "On trace la droite horizontale $y = 2$ et on lit les abscisses des points d'intersection : ce sont les antécédents de $2$." },
    { question: "Les solutions de $f(x) < g(x)$ sont les abscisses des points où :", choix: ["la courbe de $f$ est en dessous de celle de $g$", "la courbe de $f$ est au-dessus de celle de $g$", "les deux courbes se coupent", "la courbe de $f$ est sous l'axe des abscisses"], bonne: 0, explication: "Pour une même abscisse, l'ordonnée sur la courbe de $f$ est plus petite que celle sur la courbe de $g$." },
    { question: "Une fonction est croissante sur un intervalle quand sa courbe :", choix: ["monte quand on la lit de gauche à droite", "est au-dessus de l'axe des abscisses", "descend quand on la lit de gauche à droite", "passe par l'origine"], bonne: 0, explication: "Croissante : quand $x$ augmente, $f(x)$ augmente. Être au-dessus de l'axe, c'est être positive, ce qui est différent." },
    { question: "Pour quelle valeur de $b$ le point $(2\\,;b)$ est-il sur la droite d'équation $y = -3x + 5$ ?", choix: ["$b = -1$", "$b = 11$", "$b = 1$", "$b = -6$"], bonne: 0, explication: "On remplace $x$ par $2$ : $b = -3 \\times 2 + 5 = -6 + 5 = -1$." },
    { question: "Une droite passe par $(0\\,;2)$ et descend de $1$ quand $x$ augmente de $2$. Son équation est :", choix: ["$y = -\\dfrac{1}{2}x + 2$", "$y = -2x + 2$", "$y = 2x - \\dfrac{1}{2}$", "$y = \\dfrac{1}{2}x + 2$"], bonne: 0, explication: "$p = 2$, et $m = \\dfrac{-1}{2} = -\\dfrac{1}{2}$ : variation de $y$ divisée par variation de $x$." },
    { question: "L'équation de la droite passant par $A(0\\,;-1)$ et $B(2\\,;5)$ est :", choix: ["$y = 3x - 1$", "$y = 3x + 5$", "$y = \\dfrac{1}{3}x - 1$", "$y = 2x - 1$"], bonne: 0, explication: "$m = \\dfrac{5 - (-1)}{2 - 0} = 3$, et $A$ est sur l'axe vertical, donc $p = -1$. Vérification : $3 \\times 2 - 1 = 5$." },
    { question: "La fonction $f$ est définie sur $[-3\\,;4]$ par la courbe ci-contre. L'ensemble des solutions de $f(x) > 0$ est :", figure: "am-qcm-signe", choix: ["$]-2\\,;3[$", "$[-3\\,;-2[ \\cup ]3\\,;4]$", "$[-2\\,;3]$", "$]-3\\,;4[$"], bonne: 0, explication: "La courbe est strictement au-dessus de l'axe des abscisses entre $-2$ et $3$. En $-2$ et en $3$, $f(x) = 0$ : ces valeurs sont exclues car l'inégalité est stricte." },
    { question: "Quelle est l'équation réduite de la droite $d_1$ tracée ci-contre ?", figure: "am-qcm-trace", choix: ["$y = x - 2$", "$y = -x + 2$", "$y = x + 2$", "$y = 2x - 2$"], bonne: 0, explication: "$d_1$ coupe l'axe vertical en $(0\\,;-2)$, donc $p = -2$ ; quand $x$ augmente de $1$, $y$ augmente de $1$, donc $m = 1$. ($y = -x + 2$ est l'équation de $d_2$.)" },
    { question: "D'après ce tableau de variations, le minimum de $f$ sur $[-3\\,;5]$ est :", figure: "am-qcm-tabvar", choix: ["$-4$, atteint en $x = 1$", "$1$, atteint en $x = -4$", "$2$, atteint en $x = -3$", "$-3$, atteint en $x = 2$"], bonne: 0, explication: "$f$ décroît de $2$ à $-4$ sur $[-3\\,;1]$, puis croît de $-4$ à $6$ sur $[1\\,;5]$ : le minimum est $-4$ (deuxième ligne), atteint en $x = 1$ (première ligne)." },
    { question: "Pour tracer la droite d'équation $y = -2x + 3$, on place le point $(0\\,;3)$, puis :", choix: ["on avance de $1$ et on descend de $2$", "on avance de $1$ et on monte de $2$", "on avance de $2$ et on descend de $1$", "on avance de $3$ et on descend de $2$"], bonne: 0, explication: "Le coefficient directeur est $m = -2$ : quand $x$ augmente de $1$, $y$ diminue de $2$. On arrive au point $(1\\,;1)$." },
    { question: "La droite qui passe par $A(1\\,;2)$ et dont le coefficient directeur est $3$ passe aussi par :", choix: ["$(2\\,;5)$", "$(2\\,;3)$", "$(4\\,;3)$", "$(1\\,;5)$"], bonne: 0, explication: "Depuis $A$, on avance de $1$ et on monte de $3$ : on arrive en $(1 + 1\\,;2 + 3) = (2\\,;5)$." }
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
      figure: "am-meth-lecture",
      exemple: "« Le maximum de $u$ est $4$, atteint en $x = 1$ » : $4$ se lit sur l'axe vertical, $1$ sur l'axe horizontal."
    },
    {
      titre: "Trouver l'équation d'une droite",
      etapes: [
        "Sur un graphique : lis $p$ sur l'axe vertical, puis $m$ en avançant de $1$ (ou plus) vers la droite.",
        "Avec deux points : $m = \\dfrac{y_B - y_A}{x_B - x_A}$.",
        "Puis remplace les coordonnées d'un point dans $y = mx + p$ pour trouver $p$.",
        "Vérifie avec le second point."
      ],
      figure: "am-meth-droite",
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
