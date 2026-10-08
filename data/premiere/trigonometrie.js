/*
  CHAPITRE : Première spécialité — Trigonométrie
  -----------------------------------------------
  Chapitre 8 de la progression spiralée 2026-2027 (programme de Première 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas encore de vidéo de la chaîne ni de PDF pour ce chapitre : les vidéos sont celles d'Yvan Monka.
  Figures : "cercle-trigo", "enroulement", "cercle-reperes", "cos-sin", "pedalier", "valeurs-remarquables", "angles-associes".
  Générateurs : tr-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-trigonometrie"] = {
  niveau: "Première spécialité",
  numero: 8,
  titre: "Trigonométrie",
  accroche: "Enrouler la droite des réels autour du cercle : radians, cosinus et sinus, valeurs remarquables, la pédale du vélo et π à la manière d'Archimède.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur la trigonométrie en vidéo (Yvan Monka)", url: "https://youtu.be/wJjb3CSS3cg", type: "video" },
    { titre: "Démonstration : sin(π/4) = √2/2 (Yvan Monka)", url: "https://youtu.be/b2-EQupZUp8", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Cercle trigonométrique et radian",
      figure: "cercle-trigo",
      video: { titre: "Vidéo d'Yvan Monka : passer du radian au degré et réciproquement", youtube: "https://youtu.be/-fu9bSBKM00" },
      texte:
        "Le **cercle trigonométrique** est le cercle de centre $O$ et de rayon $1$, orienté dans le **sens direct** : le sens inverse des aiguilles d'une montre.\n\n" +
        "- Sur un cercle de rayon $r$, un angle au centre de $\\alpha$ **radians** intercepte un arc de longueur $L = r \\times \\alpha$.\n" +
        "- Sur le cercle trigonométrique ($r = 1$), la mesure en radians d'un angle **est** la longueur de l'arc : $1$ radian intercepte un arc de longueur $1$ (schéma).\n" +
        "- Le cercle entier mesure $2\\pi$ : donc $2\\pi$ rad $= 360°$, soit $\\pi$ rad $= 180°$.\n\n" +
        "Conversions : on multiplie par $\\dfrac{180}{\\pi}$ pour passer en degrés, par $\\dfrac{\\pi}{180}$ pour passer en radians.",
      exemple: {
        enonce: "Convertis $\\dfrac{\\pi}{3}$ rad en degrés, puis $135°$ en radians.",
        solution: "$\\dfrac{180}{3} = 60°$.\n\n$135 \\times \\dfrac{\\pi}{180} = \\dfrac{3\\pi}{4}$ rad."
      }
    },
    {
      titre: "Enrouler la droite des réels",
      figure: "enroulement",
      video: { titre: "Vidéo d'Yvan Monka : placer un point sur le cercle trigonométrique", youtube: "https://youtu.be/7VAFJXLB9u0" },
      texte:
        "On place une droite graduée tangente au cercle en $I$, avec son origine en $I$, puis on l'**enroule** autour du cercle (schéma).\n\n" +
        "- Chaque réel $x$ vient se poser sur un point $M(x)$ du cercle : c'est le **point image** de $x$.\n" +
        "- Les réels positifs s'enroulent dans le sens direct, les réels négatifs dans l'autre sens.\n" +
        "- Un tour complet mesure $2\\pi$ : les réels $x$, $x + 2\\pi$, $x - 2\\pi$, $x + 4\\pi$… ont **le même point image**.\n\n" +
        "Ainsi $M(0) = I$, $M\\left(\\dfrac{\\pi}{2}\\right) = J$, et $M(\\pi)$ est le point diamétralement opposé à $I$.",
      exemple: {
        enonce: "Les réels $\\dfrac{\\pi}{3}$ et $\\dfrac{7\\pi}{3}$ ont-ils le même point image ? Et $\\dfrac{\\pi}{3}$ et $\\dfrac{4\\pi}{3}$ ?",
        solution: "$\\dfrac{7\\pi}{3} = \\dfrac{\\pi}{3} + 2\\pi$ : même point, avec un tour de plus.\n\n$\\dfrac{4\\pi}{3} = \\dfrac{\\pi}{3} + \\pi$ : un demi-tour de plus, ce sont deux points diamétralement opposés."
      }
    },
    {
      titre: "Placer un point sur le cercle",
      figure: "cercle-reperes",
      video: { titre: "Vidéo d'Yvan Monka : lire une valeur sur le cercle trigonométrique", youtube: "https://youtu.be/NGZKQf9eLyg" },
      texte:
        "On repère les points à partir du demi-cercle supérieur, qui mesure $\\pi$ :\n\n" +
        "- $\\dfrac{\\pi}{2}$ : un quart de tour ; $\\dfrac{\\pi}{4}$ : la moitié d'un quart de tour ;\n" +
        "- $\\dfrac{\\pi}{3}$ : un tiers du demi-cercle ; $\\dfrac{\\pi}{6}$ : un sixième du demi-cercle.\n\n" +
        "Pour un réel comme $\\dfrac{5\\pi}{6}$, on compte $5$ sixièmes de demi-tour. Pour un réel trop grand ou négatif, on ajoute ou on retire des tours de $2\\pi$ : $\\dfrac{13\\pi}{6} = \\dfrac{\\pi}{6} + 2\\pi$ a le même point image que $\\dfrac{\\pi}{6}$.",
      exemple: {
        enonce: "Où placer les points images de $\\dfrac{2\\pi}{3}$, $-\\dfrac{3\\pi}{4}$ et $\\dfrac{17\\pi}{6}$ ?",
        solution: "$\\dfrac{2\\pi}{3}$ : aux deux tiers du demi-cercle supérieur.\n\n$-\\dfrac{3\\pi}{4}$ : trois quarts de demi-tour dans le sens indirect, en bas à gauche.\n\n$\\dfrac{17\\pi}{6} = \\dfrac{5\\pi}{6} + 2\\pi$ : même point que $\\dfrac{5\\pi}{6}$."
      }
    },
    {
      titre: "Cosinus et sinus d'un réel",
      figure: "cos-sin",
      video: { titre: "Vidéo d'Yvan Monka : apprendre à lire sur le cercle trigonométrique", youtube: "https://youtu.be/ECNX9hnhG9U" },
      texte:
        "Soit $x$ un réel et $M$ son point image sur le cercle trigonométrique.\n\n" +
        "- Le **cosinus** de $x$, noté $\\cos x$, est l'**abscisse** de $M$.\n" +
        "- Le **sinus** de $x$, noté $\\sin x$, est l'**ordonnée** de $M$.\n\n" +
        "Propriétés, pour **tout** réel $x$ :\n\n" +
        "- $-1 \\leqslant \\cos x \\leqslant 1$ et $-1 \\leqslant \\sin x \\leqslant 1$, car le rayon vaut $1$ ;\n" +
        "- $\\cos^2 x + \\sin^2 x = 1$, par le théorème de Pythagore dans le triangle formé par $O$, $M$ et son projeté sur l'axe des abscisses ;\n" +
        "- $\\cos(x + 2\\pi) = \\cos x$ et $\\sin(x + 2\\pi) = \\sin x$, car c'est le même point image.",
      exemple: {
        enonce: "Lis sur le cercle $\\cos 0$, $\\sin 0$, $\\cos \\dfrac{\\pi}{2}$, $\\sin \\dfrac{\\pi}{2}$, $\\cos \\pi$ et $\\sin \\pi$.",
        solution: "$M(0) = I(1\\,;0)$ : $\\cos 0 = 1$ et $\\sin 0 = 0$.\n\n$M\\left(\\dfrac{\\pi}{2}\\right) = J(0\\,;1)$ : $\\cos \\dfrac{\\pi}{2} = 0$ et $\\sin \\dfrac{\\pi}{2} = 1$.\n\n$M(\\pi)$ a pour coordonnées $(-1\\,;0)$ : $\\cos \\pi = -1$ et $\\sin \\pi = 0$."
      }
    },
    {
      titre: "Lien avec le triangle rectangle",
      figure: "pedalier",
      texte:
        "Pour $0 < x < \\dfrac{\\pi}{2}$, le point $M(x)$, son projeté $H$ sur l'axe des abscisses et $O$ forment un triangle rectangle en $H$, d'hypoténuse $OM = 1$. On retrouve les formules du collège :\n\n" +
        "$\\cos x = \\dfrac{OH}{OM} = OH$ et $\\sin x = \\dfrac{HM}{OM} = HM$.\n\n" +
        "Dans un triangle rectangle d'hypoténuse $r$ : côté adjacent $= r\\cos x$ et côté opposé $= r\\sin x$.\n\n" +
        "Sur le schéma, une manivelle de pédalier de $17$ cm fait un angle de $\\dfrac{\\pi}{3}$ avec l'horizontale : la pédale est à $17\\sin\\dfrac{\\pi}{3} = 17 \\times \\dfrac{\\sqrt{3}}{2} \\approx 14{,}7$ cm au-dessus de l'axe.",
      exemple: {
        enonce: "À quelle distance horizontale de l'axe se trouve alors la pédale ?",
        solution: "$17\\cos\\dfrac{\\pi}{3} = 17 \\times \\dfrac{1}{2} = 8{,}5$ cm."
      }
    },
    {
      titre: "Valeurs remarquables",
      figure: "valeurs-remarquables",
      video: { titre: "Vidéo d'Yvan Monka : lire en radians les valeurs de cos et sin", youtube: "https://youtu.be/m6tuif8ZpFY" },
      texte:
        "À connaître (schéma) :\n\n" +
        "- $\\cos 0 = 1$ et $\\sin 0 = 0$ ;\n" +
        "- $\\cos \\dfrac{\\pi}{6} = \\dfrac{\\sqrt{3}}{2}$ et $\\sin \\dfrac{\\pi}{6} = \\dfrac{1}{2}$ ;\n" +
        "- $\\cos \\dfrac{\\pi}{4} = \\sin \\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$ ;\n" +
        "- $\\cos \\dfrac{\\pi}{3} = \\dfrac{1}{2}$ et $\\sin \\dfrac{\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$ ;\n" +
        "- $\\cos \\dfrac{\\pi}{2} = 0$ et $\\sin \\dfrac{\\pi}{2} = 1$.\n\n" +
        "Astuce : les sinus de $0$, $\\dfrac{\\pi}{6}$, $\\dfrac{\\pi}{4}$, $\\dfrac{\\pi}{3}$, $\\dfrac{\\pi}{2}$ valent $\\dfrac{\\sqrt{0}}{2}$, $\\dfrac{\\sqrt{1}}{2}$, $\\dfrac{\\sqrt{2}}{2}$, $\\dfrac{\\sqrt{3}}{2}$, $\\dfrac{\\sqrt{4}}{2}$ ; les cosinus suivent l'ordre inverse.",
      exemple: {
        enonce: "Vérifie que $\\cos^2 \\dfrac{\\pi}{6} + \\sin^2 \\dfrac{\\pi}{6} = 1$.",
        solution: "$\\left(\\dfrac{\\sqrt{3}}{2}\\right)^2 + \\left(\\dfrac{1}{2}\\right)^2 = \\dfrac{3}{4} + \\dfrac{1}{4} = 1$."
      }
    },
    {
      titre: "Démonstrations : $\\dfrac{\\pi}{4}$ et $\\dfrac{\\pi}{3}$",
      video: { titre: "Vidéo d'Yvan Monka : démonstration de cos(π/3) et sin(π/3)", youtube: "https://youtu.be/4R1i5Vj72Ls" },
      texte:
        "**Pour $\\dfrac{\\pi}{4}$.** Le point $M\\left(\\dfrac{\\pi}{4}\\right)$ est sur la bissectrice du premier quart de cercle : ses deux coordonnées sont égales, $\\cos\\dfrac{\\pi}{4} = \\sin\\dfrac{\\pi}{4} = c$ avec $c > 0$. Comme $\\cos^2 + \\sin^2 = 1$ : $2c^2 = 1$, donc $c = \\dfrac{1}{\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}$.\n\n" +
        "**Pour $\\dfrac{\\pi}{3}$.** Avec $M = M\\left(\\dfrac{\\pi}{3}\\right)$, le triangle $OIM$ est isocèle en $O$ ($OI = OM = 1$) et a un angle de $60°$ : il est **équilatéral**. Le projeté $H$ de $M$ sur $(OI)$ est donc le milieu de $[OI]$, et $\\cos\\dfrac{\\pi}{3} = OH = \\dfrac{1}{2}$.\n\n" +
        "Puis $\\sin^2\\dfrac{\\pi}{3} = 1 - \\dfrac{1}{4} = \\dfrac{3}{4}$ avec $\\sin\\dfrac{\\pi}{3} > 0$, donc $\\sin\\dfrac{\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$.",
      exemple: {
        enonce: "Déduis-en $\\cos\\dfrac{\\pi}{6}$ et $\\sin\\dfrac{\\pi}{6}$.",
        solution: "Les points $M\\left(\\dfrac{\\pi}{6}\\right)$ et $M\\left(\\dfrac{\\pi}{3}\\right)$ sont symétriques par rapport à la bissectrice : on échange les coordonnées. $\\cos\\dfrac{\\pi}{6} = \\dfrac{\\sqrt{3}}{2}$ et $\\sin\\dfrac{\\pi}{6} = \\dfrac{1}{2}$."
      }
    },
    {
      titre: "Angles associés",
      figure: "angles-associes",
      texte:
        "Par symétrie sur le cercle (schéma), on lit les cosinus et sinus d'autres réels à partir des valeurs remarquables :\n\n" +
        "- $-x$ : symétrique par rapport à l'axe des abscisses, $\\cos(-x) = \\cos x$ et $\\sin(-x) = -\\sin x$ ;\n" +
        "- $\\pi - x$ : symétrique par rapport à l'axe des ordonnées, $\\cos(\\pi - x) = -\\cos x$ et $\\sin(\\pi - x) = \\sin x$ ;\n" +
        "- $\\pi + x$ : symétrique par rapport à $O$, $\\cos(\\pi + x) = -\\cos x$ et $\\sin(\\pi + x) = -\\sin x$.\n\n" +
        "En pratique : on repère l'angle aigu associé, puis le signe d'après le quart de cercle où se trouve le point.",
      exemple: {
        enonce: "Calcule $\\cos\\dfrac{2\\pi}{3}$, $\\sin\\dfrac{2\\pi}{3}$ et $\\sin\\left(-\\dfrac{\\pi}{3}\\right)$.",
        solution: "$\\dfrac{2\\pi}{3} = \\pi - \\dfrac{\\pi}{3}$ : $\\cos\\dfrac{2\\pi}{3} = -\\dfrac{1}{2}$ et $\\sin\\dfrac{2\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$.\n\n$\\sin\\left(-\\dfrac{\\pi}{3}\\right) = -\\dfrac{\\sqrt{3}}{2}$."
      }
    },
    {
      titre: "Python : π par la méthode d'Archimède",
      texte:
        "Archimède (IIIe siècle avant notre ère) approchait $\\pi$ avec des polygones réguliers inscrits dans un cercle. Dans le cercle de rayon $1$, le demi-périmètre du polygone se rapproche de $\\pi$ quand on double le nombre de côtés.\n\n" +
        "```python\nfrom math import sqrt\n\ndef archimede(etapes):\n    n = 6    # hexagone inscrit dans le cercle de rayon 1\n    c = 1    # longueur d'un côté\n    for i in range(etapes):\n        c = sqrt(2 - sqrt(4 - c**2))\n        n = 2 * n\n    return n * c / 2\n```\n\n" +
        "- archimede(0) renvoie $3$ : le demi-périmètre de l'hexagone ;\n" +
        "- archimede(4) renvoie environ $3{,}1410$, avec $96$ côtés comme Archimède ;\n" +
        "- archimede(8) renvoie environ $3{,}14159$.\n\n" +
        "La ligne de la boucle calcule, avec le théorème de Pythagore, le côté du polygone à $2n$ côtés à partir de celui à $n$ côtés.",
      exemple: {
        enonce: "Combien de côtés a le polygone après $3$ étapes ? Quelle valeur approchée de $\\pi$ obtient-on ?",
        solution: "$6 \\times 2^3 = 48$ côtés, et archimede(3) renvoie environ $3{,}1394$."
      }
    },
    {
      titre: "Logique : « pour tout » et « il existe »",
      texte:
        "- « **Pour tout** réel $x$, $\\cos^2 x + \\sin^2 x = 1$ » : la propriété est vraie pour chaque réel, sans exception. Pour montrer qu'un « pour tout » est faux, **un contre-exemple** suffit : « pour tout $x$, $\\sin x \\geqslant 0$ » est faux car $\\sin\\left(-\\dfrac{\\pi}{2}\\right) = -1$.\n" +
        "- « **Il existe** un réel $x$ tel que $\\cos x = \\sin x$ » : **un exemple** suffit, $x = \\dfrac{\\pi}{4}$. Pour montrer qu'un « il existe » est faux, il faut prouver qu'**aucun** réel ne convient : « il existe $x$ tel que $\\cos x = 2$ » est faux car $\\cos x \\leqslant 1$ pour tout $x$.",
      exemple: {
        enonce: "Vrai ou faux : « pour tout réel $x$, $\\cos x + \\sin x = 1$ » ?",
        solution: "Faux. Contre-exemple : $x = \\dfrac{\\pi}{4}$ donne $\\dfrac{\\sqrt{2}}{2} + \\dfrac{\\sqrt{2}}{2} = \\sqrt{2} \\neq 1$. C'est vrai pour $x = 0$, mais un exemple ne suffit pas pour un « pour tout »."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "tr-conversion", titre: "Degrés et radians", etape: "Le cercle", nb: 5 },
    { type: "tr-arc", titre: "Longueur d'arc", etape: "Le cercle", nb: 4 },
    { type: "tr-placer", titre: "Placer un point sur le cercle", etape: "Le cercle", nb: 5 },
    { type: "tr-valeurs", titre: "Cosinus et sinus remarquables", etape: "Cosinus et sinus", nb: 6 },
    { type: "tr-pythagore", titre: "Avec cos² + sin² = 1", etape: "Cosinus et sinus", nb: 4 },
    { type: "tr-triangle", titre: "La pédale du vélo", etape: "Cosinus et sinus", nb: 4 },
    { type: "tr-logique", titre: "Pour tout, il existe", etape: "Raisonner", nb: 5 },
    { type: "tr-python", titre: "Python : π selon Archimède", etape: "Raisonner", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$\\pi$ radians correspondent à :", choix: ["$180°$", "$360°$", "$90°$", "$3{,}14°$"], bonne: 0, explication: "Le demi-cercle mesure $\\pi$ : $\\pi$ rad $= 180°$." },
    { question: "$\\dfrac{\\pi}{6}$ rad, c'est :", choix: ["$30°$", "$60°$", "$45°$", "$15°$"], bonne: 0, explication: "$\\dfrac{180}{6} = 30°$." },
    { question: "$270°$, c'est :", choix: ["$\\dfrac{3\\pi}{2}$ rad", "$\\dfrac{2\\pi}{3}$ rad", "$\\dfrac{3\\pi}{4}$ rad", "$\\dfrac{4\\pi}{3}$ rad"], bonne: 0, explication: "$270 \\times \\dfrac{\\pi}{180} = \\dfrac{3\\pi}{2}$." },
    { question: "Sur un cercle de rayon $5$ cm, un angle de $2$ rad intercepte un arc de longueur :", choix: ["$10$ cm", "$2{,}5$ cm", "$7$ cm", "$10\\pi$ cm"], bonne: 0, explication: "$L = r \\times \\alpha = 5 \\times 2 = 10$ cm." },
    { question: "Les réels $\\dfrac{\\pi}{4}$ et $\\dfrac{9\\pi}{4}$ :", choix: ["ont le même point image", "ont des points images diamétralement opposés", "ont des points symétriques par rapport à l'axe des abscisses", "ont des points images sans lien"], bonne: 0, explication: "$\\dfrac{9\\pi}{4} = \\dfrac{\\pi}{4} + 2\\pi$ : un tour de plus." },
    { question: "Le point image du réel $\\pi$ est :", choix: ["le point de coordonnées $(-1\\,;0)$", "le point $J$", "le point $I$", "le point de coordonnées $(0\\,;-1)$"], bonne: 0, explication: "Un demi-tour depuis $I$ mène au point diamétralement opposé." },
    { question: "$\\cos x$ est :", choix: ["l'abscisse du point image de $x$", "l'ordonnée du point image de $x$", "la longueur de l'arc", "la mesure de l'angle en degrés"], bonne: 0, explication: "Cosinus : abscisse ; sinus : ordonnée." },
    { question: "$\\cos\\dfrac{\\pi}{3}$ vaut :", choix: ["$\\dfrac{1}{2}$", "$\\dfrac{\\sqrt{3}}{2}$", "$\\dfrac{\\sqrt{2}}{2}$", "$\\dfrac{\\pi}{3}$"], bonne: 0, explication: "Valeur remarquable : $\\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$." },
    { question: "$\\sin\\dfrac{\\pi}{4}$ vaut :", choix: ["$\\dfrac{\\sqrt{2}}{2}$", "$\\dfrac{1}{2}$", "$1$", "$\\dfrac{\\sqrt{3}}{2}$"], bonne: 0, explication: "Pour $\\dfrac{\\pi}{4}$, cosinus et sinus sont égaux à $\\dfrac{\\sqrt{2}}{2}$." },
    { question: "$\\sin\\dfrac{5\\pi}{6}$ vaut :", choix: ["$\\dfrac{1}{2}$", "$-\\dfrac{1}{2}$", "$\\dfrac{\\sqrt{3}}{2}$", "$-\\dfrac{\\sqrt{3}}{2}$"], bonne: 0, explication: "$\\dfrac{5\\pi}{6} = \\pi - \\dfrac{\\pi}{6}$ : même sinus que $\\dfrac{\\pi}{6}$, soit $\\dfrac{1}{2}$." },
    { question: "$\\cos\\dfrac{3\\pi}{4}$ vaut :", choix: ["$-\\dfrac{\\sqrt{2}}{2}$", "$\\dfrac{\\sqrt{2}}{2}$", "$-\\dfrac{1}{2}$", "$0$"], bonne: 0, explication: "Le point est à gauche de l'axe des ordonnées : cosinus négatif, et l'angle aigu associé est $\\dfrac{\\pi}{4}$." },
    { question: "Pour tout réel $x$, $\\cos(-x)$ est égal à :", choix: ["$\\cos x$", "$-\\cos x$", "$\\sin x$", "$-\\sin x$"], bonne: 0, explication: "Les points de $x$ et $-x$ sont symétriques par rapport à l'axe des abscisses : même abscisse." },
    { question: "Si $\\cos x = 0{,}6$ et $\\sin x > 0$, alors $\\sin x$ vaut :", choix: ["$0{,}8$", "$0{,}4$", "$-0{,}8$", "$0{,}64$"], bonne: 0, explication: "$\\sin^2 x = 1 - 0{,}36 = 0{,}64$ et $\\sin x > 0$, donc $\\sin x = 0{,}8$." },
    { question: "Pour tout réel $x$ :", choix: ["$\\cos^2 x + \\sin^2 x = 1$", "$\\cos x + \\sin x = 1$", "$\\cos x = \\sin x$", "$\\cos^2 x = 1 + \\sin^2 x$"], bonne: 0, explication: "C'est le théorème de Pythagore sur le cercle de rayon $1$." },
    { question: "« Il existe un réel $x$ tel que $\\sin x = 1{,}5$ » est :", choix: ["faux, car $\\sin x \\leqslant 1$ pour tout $x$", "vrai, pour $x = \\dfrac{3\\pi}{2}$", "vrai, pour $x = 1{,}5$", "impossible à décider"], bonne: 0, explication: "Le sinus est une ordonnée d'un point du cercle de rayon $1$ : il ne dépasse jamais $1$." },
    { question: "Pour montrer que « pour tout réel $x$, $\\cos x \\geqslant 0$ » est faux, il suffit de :", choix: ["donner un réel $x$ avec $\\cos x < 0$, par exemple $x = \\pi$", "vérifier que $\\cos 0 = 1$", "tracer le cercle", "calculer $\\cos^2 x + \\sin^2 x$"], bonne: 0, explication: "Un seul contre-exemple suffit : $\\cos \\pi = -1 < 0$." },
    { question: "Une manivelle de $20$ cm fait un angle de $\\dfrac{\\pi}{6}$ avec l'horizontale. La pédale est à une hauteur de :", choix: ["$10$ cm", "$17{,}3$ cm", "$20$ cm", "$3{,}3$ cm"], bonne: 0, explication: "$20 \\times \\sin\\dfrac{\\pi}{6} = 20 \\times \\dfrac{1}{2} = 10$ cm." },
    { question: "Dans la méthode d'Archimède, quand on double le nombre de côtés du polygone inscrit, son demi-périmètre :", choix: ["se rapproche de $\\pi$", "dépasse $\\pi$", "reste égal à $3$", "double aussi"], bonne: 0, explication: "Le polygone colle de plus en plus au cercle, dont le demi-périmètre vaut $\\pi$ ; il reste en dessous car il est inscrit." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Convertir degrés et radians",
      etapes: ["Retenir $\\pi$ rad $= 180°$.", "Des radians vers les degrés : remplacer $\\pi$ par $180$.", "Des degrés vers les radians : multiplier par $\\dfrac{\\pi}{180}$ et simplifier."],
      exemple: "$\\dfrac{5\\pi}{4} = \\dfrac{5 \\times 180}{4} = 225°$ et $120° = \\dfrac{120\\pi}{180} = \\dfrac{2\\pi}{3}$."
    },
    {
      titre: "Placer un point sur le cercle",
      etapes: ["Si besoin, ajouter ou retirer des multiples de $2\\pi$ pour se ramener entre $-\\pi$ et $\\pi$.", "Repérer le dénominateur : sixièmes, quarts ou tiers de demi-tour, ou quarts de tour.", "Compter dans le sens direct si le réel est positif, dans le sens indirect s'il est négatif."],
      exemple: "$\\dfrac{19\\pi}{6} = \\dfrac{7\\pi}{6} + 2\\pi$ : $7$ sixièmes de demi-tour, juste après $\\pi$."
    },
    {
      titre: "Lire un cosinus ou un sinus remarquable",
      etapes: ["Placer le point image.", "Repérer l'angle aigu associé ($\\dfrac{\\pi}{6}$, $\\dfrac{\\pi}{4}$ ou $\\dfrac{\\pi}{3}$) et ses valeurs.", "Donner le signe : le cosinus est positif à droite de l'axe des ordonnées, le sinus est positif au-dessus de l'axe des abscisses."],
      exemple: "$\\dfrac{7\\pi}{6}$ : angle associé $\\dfrac{\\pi}{6}$, point en bas à gauche, donc $\\cos\\dfrac{7\\pi}{6} = -\\dfrac{\\sqrt{3}}{2}$ et $\\sin\\dfrac{7\\pi}{6} = -\\dfrac{1}{2}$."
    },
    {
      titre: "Utiliser $\\cos^2 x + \\sin^2 x = 1$",
      etapes: ["Écrire $\\sin^2 x = 1 - \\cos^2 x$ (ou l'inverse).", "Prendre la racine carrée : deux valeurs opposées sont possibles.", "Choisir le signe grâce à l'intervalle où se trouve $x$."],
      exemple: "$\\cos x = -\\dfrac{4}{5}$ et $x \\in [0\\,;\\pi]$ : $\\sin^2 x = \\dfrac{9}{25}$ et $\\sin x \\geqslant 0$, donc $\\sin x = \\dfrac{3}{5}$."
    },
    {
      titre: "Calculer une longueur d'arc ou une distance",
      etapes: ["Arc : $L = r \\times \\alpha$, avec $\\alpha$ en radians.", "Triangle rectangle d'hypoténuse $r$ : côté adjacent $r\\cos x$, côté opposé $r\\sin x$.", "Vérifier l'unité et l'ordre de grandeur."],
      exemple: "Roue de rayon $33$ cm, un tour : $2\\pi \\times 33 \\approx 207$ cm."
    },
    {
      titre: "Pour tout, il existe",
      etapes: ["« Pour tout » faux : un contre-exemple suffit.", "« Il existe » vrai : un exemple suffit.", "« Pour tout » vrai ou « il existe » faux : il faut une démonstration valable pour tous les réels."],
      exemple: "« Il existe $x$ tel que $\\sin x = 1$ » est vrai : $x = \\dfrac{\\pi}{2}$ convient."
    }
  ],
  erreurs: [
    "Confondre cosinus (abscisse) et sinus (ordonnée).",
    "Oublier le signe : $\\cos\\dfrac{2\\pi}{3}$ est négatif, car le point est à gauche de l'axe des ordonnées.",
    "Calculer $\\cos\\dfrac{\\pi}{3}$ à la calculatrice en mode degrés : vérifie le mode radian.",
    "Écrire $\\cos x + \\sin x = 1$ au lieu de $\\cos^2 x + \\sin^2 x = 1$.",
    "Tourner dans le mauvais sens : le sens direct est le sens inverse des aiguilles d'une montre.",
    "Utiliser des degrés dans $L = r \\times \\alpha$ : l'angle doit être en radians.",
    "Croire que deux réels différents ont toujours des points images différents : $x$ et $x + 2\\pi$ ont le même point."
  ]
};
