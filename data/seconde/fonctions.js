/*
  CHAPITRE : Seconde — Généralités sur les fonctions
  ---------------------------------------------------
  Tout le contenu de la page du chapitre est ici. Vous pouvez le modifier librement.

  Petites règles d'écriture :
  - Les formules s'écrivent entre $ ... $ (syntaxe LaTeX / KaTeX).
    Dans ce fichier, chaque antislash est doublé : $\\frac{1}{2}$, $\\mathbb{R}$.
  - **texte** met en gras. Une ligne vide sépare deux paragraphes.
  - Une ligne qui commence par "- " devient une puce.
  - Un programme Python s'écrit entre une ligne ```python et une ligne ``` (sans ligne vide dedans),
    voir le cours « Programmes Python » de data/premiere/suites.js.
  - youtube : coller l'adresse de la vidéo (https://youtu.be/... ou https://www.youtube.com/watch?v=...).
    Laisser "" tant que la vidéo n'est pas choisie : un emplacement s'affiche.
  - figure : nom d'un graphique prédéfini ("courbe-u", "kayaks", "enclos", "courbe-paire", "courbe-impaire",
    et les figures "fonc-…" du chapitre définies dans assets/exercices.js).
  - La parité (paire, impaire) est au programme de Première : elle reste ici en « Pour aller plus loin », sans exercice ni QCM.
  - Playlist de la chaîne pour ce chapitre : « Secondes : généralités sur les fonctions » (champ playlist).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-fonctions"] = {
  niveau: "Seconde",
  numero: 2,
  titre: "Généralités sur les fonctions",
  accroche: "Image, antécédent, courbe, résolutions graphiques et par le calcul : les bases pour toute l'année.",

  playlist: "https://www.youtube.com/playlist?list=PLHcTJpr4DU-0", // playlist « Secondes : généralités sur les fonctions »
  drive: "https://drive.google.com/drive/folders/1T6TrIhKIQw81y_UyeuU0X5AljmqZbbvr",
  pdfs: [
    {
      titre: "Énoncés des 4 exercices corrigés en vidéo",
      url: "https://drive.google.com/file/d/1xRdm_tko4sVHdQ0rayK6EQJUgUSICLy8/view"
    },
    {
      titre: "Corrigés détaillés des 4 exercices",
      url: "https://drive.google.com/file/d/1KQ6ZTKnfRP-xjosq7ndi5lGsQcGsdMG_/view"
    }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Qu'est-ce qu'une fonction ?",
      video: { titre: "Vidéo de ton prof : généralités sur les fonctions, cours complet", youtube: "https://youtu.be/FYTU8j_1Nxg" },
      texte:
        "Une **fonction** $f$ associe à chaque nombre $x$ de son ensemble de définition un **unique** nombre, noté $f(x)$.\n\n" +
        "- $f(x)$ est l'**image** de $x$ par $f$.\n" +
        "- $x$ est un **antécédent** de $f(x)$ par $f$.\n\n" +
        "Un nombre a toujours **une seule image**, mais il peut avoir zéro, un ou plusieurs antécédents.",
      figure: "fonc-cours-sagittal",
      exemple: {
        enonce: "Avec $f(x) = x^2$ : quelle est l'image de $3$ ? Quels sont les antécédents de $9$ ?",
        solution: "$f(3) = 3^2 = 9$, donc l'image de $3$ est $9$.\n\n$3^2 = 9$ et $(-3)^2 = 9$ : les antécédents de $9$ sont $3$ et $-3$."
      }
    },
    {
      titre: "L'ensemble de définition",
      video: { titre: "Vidéo de ton prof : valeur interdite, image et antécédent", youtube: "https://youtu.be/kDgEr5qJj0Q" },
      texte:
        "L'**ensemble de définition** $D$ de $f$ regroupe tous les nombres $x$ qui ont une image.\n\n" +
        "- Un quotient n'existe que si son **dénominateur est non nul**.\n" +
        "- Dans un problème concret, on cherche le **domaine d'étude** : les valeurs de $x$ qui ont un sens. Une longueur, une durée ou une aire impose souvent $x \\geqslant 0$ ou $x > 0$ ; un volume restant ne peut pas être négatif.\n\n" +
        "Sur la courbe, une valeur interdite se voit : aucun point n'a cette abscisse.",
      figure: "fonc-cours-interdite",
      exemple: {
        enonce: "Déterminer l'ensemble de définition de $f(x) = \\dfrac{2x-1}{x+2}$.",
        solution: "$x + 2 = 0 \\iff x = -2$. La valeur $-2$ est interdite, toutes les autres ont une image.\n\n$D = \\mathbb{R} \\setminus \\{-2\\} = \\mathopen{]}-\\infty\\,;-2[\\, \\cup \\mathopen{]}-2\\,;+\\infty[$"
      }
    },
    {
      titre: "Calculer une image, dresser un tableau de valeurs",
      video: { titre: "Vidéo d'Yvan Monka : déterminer une image ou un antécédent", youtube: "https://youtu.be/vl0nOQT_czU" },
      texte:
        "Pour calculer $f(a)$, on vérifie que $a \\in D$ puis on **remplace $x$ par $a$** dans l'expression.\n\n" +
        "Un **tableau de valeurs** rassemble plusieurs images calculées ainsi. Chaque colonne donne un point $(x\\,;f(x))$ de la courbe : on peut placer ces points pour tracer la courbe.",
      figure: "fonc-cours-tableau",
      exemple: {
        enonce: "L'enclos des cabris : avec 20 m de grillage, un enclos rectangulaire de largeur $x$ a pour aire $A(x) = x(10 - x)$. Calculer $A(3)$ et compléter le tableau.",
        solution: "$A(3) = 3 \\times (10 - 3) = 3 \\times 7 = 21$ m².",
        tableau: {
          nom: "A(x)",
          x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          y: [9, 16, 21, 24, 25, 24, 21, 16, 9]
        }
      }
    },
    {
      titre: "La courbe représentative",
      video: { titre: "Vidéo de ton prof : généralités sur les fonctions, cours complet", youtube: "https://youtu.be/FYTU8j_1Nxg" },
      texte:
        "La **courbe** $\\mathcal{C}_f$ est l'ensemble des points $M(x\\,;f(x))$ avec $x \\in D$.\n\n" +
        "Un point $M(a\\,;b)$ appartient à $\\mathcal{C}_f$ si et seulement si $a \\in D$ **et** $f(a) = b$.\n\n" +
        "On calcule toujours l'image de l'**abscisse** (la première coordonnée) et on la compare à l'ordonnée. Si l'ordonnée est plus grande, le point est **au-dessus** de la courbe ; plus petite, il est **en dessous**.\n\n" +
        "Pour **calculer une coordonnée** : le point de $\\mathcal{C}_f$ d'abscisse $a$ a pour ordonnée $f(a)$ ; ceux d'ordonnée $k$ ont pour abscisses les solutions de $f(x) = k$.",
      figure: "fonc-cours-appartient",
      exemple: {
        enonce: "Avec $f(x) = \\dfrac{2x-1}{x+2}$, les points $A(-1\\,;-3)$ et $B(1\\,;1)$ appartiennent-ils à $\\mathcal{C}_f$ ?",
        solution: "$-1 \\in D$ et $f(-1) = \\dfrac{2 \\times (-1) - 1}{-1 + 2} = \\dfrac{-3}{1} = -3$. L'image de l'abscisse est égale à l'ordonnée : $A \\in \\mathcal{C}_f$.\n\n$f(1) = \\dfrac{2 - 1}{1 + 2} = \\dfrac{1}{3}$ et $\\dfrac{1}{3} \\neq 1$ : $B \\notin \\mathcal{C}_f$. Comme $1 > \\dfrac{1}{3}$, $B$ est au-dessus de la courbe."
      }
    },
    {
      titre: "Lire une image et des antécédents sur une courbe",
      video: { titre: "Vidéo d'Yvan Monka : lire une image ou un antécédent", youtube: "https://youtu.be/VM2iC9P3Qmg" },
      texte:
        "- **Image de $a$** : on part de $a$ sur l'axe des abscisses, on monte (ou on descend) jusqu'à la courbe, puis on lit l'ordonnée.\n" +
        "- **Antécédents de $k$** : on trace la droite horizontale $y = k$ et on lit les abscisses de tous les points d'intersection avec la courbe.",
      figure: "courbe-u",
      exemple: {
        enonce: "Sur la courbe de $u$ ci-dessus : lire l'image de $0$ et les antécédents de $0$.",
        solution: "La courbe passe par $(0\\,;3)$ : $u(0) = 3$.\n\nElle coupe l'axe des abscisses en $(-1\\,;0)$ et $(3\\,;0)$ : les antécédents de $0$ sont $-1$ et $3$."
      }
    },
    {
      titre: "Résoudre graphiquement une équation ou une inéquation",
      video: { titre: "Vidéo de ton prof : résoudre graphiquement équations et inéquations", youtube: "https://youtu.be/M1WsNoPcego" },
      texte:
        "- $f(x) = k$ : abscisses des points de $\\mathcal{C}_f$ situés **sur** la droite $y = k$.\n" +
        "- $f(x) > k$ : abscisses des points de $\\mathcal{C}_f$ situés **strictement au-dessus** de $y = k$.\n" +
        "- $f(x) = g(x)$ : abscisses des points d'**intersection** des deux courbes.\n" +
        "- $f(x) > g(x)$ : abscisses des points où $\\mathcal{C}_f$ est **strictement au-dessus** de $\\mathcal{C}_g$.\n" +
        "- $f(x) < g(x)$ : abscisses des points où $\\mathcal{C}_f$ est **strictement en dessous** de $\\mathcal{C}_g$.\n" +
        "- $f(x) \\geqslant g(x)$ ou $f(x) \\leqslant g(x)$ : pareil, mais on **garde** les abscisses des points d'intersection.\n\n" +
        "Les solutions sont toujours des **valeurs de $x$**, donc des abscisses. Attention aux crochets : inégalité stricte, borne exclue.\n\n" +
        "La calculatrice ou un logiciel (GeoGebra) tracent les courbes à ta place ; la lecture graphique donne souvent des valeurs **approchées**, le calcul donne les valeurs **exactes**.",
      figure: "kayaks",
      exemple: {
        enonce: "Kayaks dans le lagon : le loueur A fait payer $A(t) = 8t$ et le loueur B $B(t) = 4t + 12$, pour $t \\in [0\\,;6]$ heures. Résoudre $A(t) = B(t)$ puis $A(t) < B(t)$.",
        solution: "Les droites se coupent en $I(3\\,;24)$ : $S = \\{3\\}$. Pour 3 h, les deux loueurs demandent 24 €.\n\nLa droite de A est sous celle de B pour $t$ entre 0 (inclus) et 3 (exclu) : $S = [0\\,;3[$. Pour moins de 3 h, le loueur A est le moins cher."
      }
    },
    {
      titre: "Résoudre $f(x) = g(x)$ ou $f(x) < g(x)$ par le calcul",
      video: { titre: "Vidéo d'Yvan Monka : le cours sur les inéquations", youtube: "https://youtu.be/kbTWwWQ9tYo" },
      texte:
        "On écrit l'équation $f(x) = g(x)$ et on la résout :\n\n" +
        "- on regroupe les $x$ d'un côté et les nombres de l'autre (équation du premier degré) ;\n" +
        "- ou on passe tout du même côté, $f(x) - g(x) = 0$, puis on factorise (produit nul).\n\n" +
        "Les solutions sont les **abscisses** des points d'intersection des deux courbes. Pour obtenir les points eux-mêmes, on calcule ensuite leurs images.\n\n" +
        "Pour une **inéquation** du premier degré ($f(x) < g(x)$, $f(x) \\geqslant g(x)$…), on fait de même, avec une règle en plus : quand on multiplie ou divise par un nombre **négatif**, le **sens de l'inégalité change**. Les solutions forment un intervalle.",
      figure: "fonc-cours-inequation",
      exemple: {
        enonce: "Kayaks : retrouver par le calcul le point d'intersection des droites de $A(t) = 8t$ et $B(t) = 4t + 12$, puis résoudre $A(t) < B(t)$. Enfin, résoudre $-2x + 1 \\leqslant x + 7$.",
        solution: "$8t = 4t + 12 \\iff 4t = 12 \\iff t = 3$. Puis $A(3) = 8 \\times 3 = 24$ : le point commun est $I(3\\,;24)$.\n\n$8t < 4t + 12 \\iff 4t < 12 \\iff t < 3$. Avec $t \\in [0\\,;6]$ : $S = [0\\,;3[$, comme sur le graphique.\n\n$-2x + 1 \\leqslant x + 7 \\iff -3x \\leqslant 6 \\iff x \\geqslant -2$ (on divise par $-3$, le sens change). $S = [-2\\,;+\\infty[$."
      }
    },
    {
      titre: "Modéliser une situation par une fonction",
      video: { titre: "Vidéo de ton prof : modéliser par une fonction, l'enclos", youtube: "https://youtu.be/LeM5BO2az9w" },
      texte:
        "Pour **modéliser** une situation, on choisit la **variable** (souvent $x$, ou $t$ pour un temps), on exprime la grandeur étudiée en fonction de cette variable, puis on précise son **domaine d'étude**.\n\n" +
        "- Une **image** répond à « combien vaut la grandeur pour cette valeur ? » : on calcule $f(a)$.\n" +
        "- Un **antécédent** répond à « pour quelle valeur obtient-on ce résultat ? » : on résout $f(x) = k$.\n" +
        "- Le graphique permet de vérifier un calcul, ou d'estimer une solution quand le calcul est difficile.",
      figure: "fonc-cours-citerne",
      exemple: {
        enonce: "La citerne d'une maison de Koungou contient $600$ L d'eau et on en utilise $40$ L par jour. Exprimer le volume restant $V(t)$ après $t$ jours, donner le domaine d'étude, calculer $V(5)$, puis trouver au bout de combien de jours la citerne est vide.",
        solution: "$V(t) = 600 - 40t$. Il faut $t \\geqslant 0$ et $V(t) \\geqslant 0$, c'est-à-dire $t \\leqslant 15$ : le domaine d'étude est $[0\\,;15]$.\n\n$V(5) = 600 - 40 \\times 5 = 400$ : après $5$ jours, il reste $400$ L.\n\n$600 - 40t = 0 \\iff 40t = 600 \\iff t = 15$ : la citerne est vide au bout de $15$ jours ($15$ est l'antécédent de $0$)."
      }
    },
    {
      titre: "Pour aller plus loin (hors programme) : fonctions paires et impaires",
      video: { titre: "Vidéo d'Yvan Monka : fonction paire, fonction impaire (cours de Première)", youtube: "https://youtu.be/DUbAkwCX8O8" },
      texte:
        "Cette notion n'est pas au programme de Seconde : tu l'étudieras en Première.\n\n" +
        "- $f$ est **paire** si deux nombres opposés ont la **même image** : $f(-x) = f(x)$. Sa courbe est **symétrique par rapport à l'axe des ordonnées** (exemples : $x \\mapsto x^2$, $x \\mapsto |x|$).\n" +
        "- $f$ est **impaire** si deux nombres opposés ont des **images opposées** : $f(-x) = -f(x)$. Sa courbe est **symétrique par rapport à l'origine** (exemples : $x \\mapsto x^3$, $x \\mapsto \\dfrac{1}{x}$).\n\n" +
        "Dans les deux cas, l'ensemble de définition doit être symétrique par rapport à $0$.",
      figure: ["courbe-paire", "courbe-impaire"],
      exemple: {
        enonce: "Avec $f(x) = 0{,}5x^2 - 2$ et $g(x) = 0{,}25x^3 - x$ (figures ci-dessus), comparer $f(-2)$ et $f(2)$, puis $g(-1)$ et $g(1)$.",
        solution: "$f(-2) = 0{,}5 \\times 4 - 2 = 0$ et $f(2) = 0$ : même image. Plus généralement, $f(-x) = 0{,}5(-x)^2 - 2 = f(x)$ pour tout réel $x$ : $f$ est paire.\n\n$g(-1) = -0{,}25 + 1 = 0{,}75$ et $g(1) = 0{,}25 - 1 = -0{,}75$ : images opposées. Plus généralement, $g(-x) = -g(x)$ pour tout réel $x$ : $g$ est impaire. Un seul exemple ne suffit pas à le prouver."
      }
    }
  ],

  /* Les 4 exercices des PDF, corrigés en vidéo */
  videos: [
    { titre: "Exercice 1 · Location de kayaks dans le lagon", type: "Lecture et calcul", youtube: "https://youtu.be/p03kXQ2bVXU" },
    { titre: "Exercice 2 · Tout par le calcul", type: "Bilan", youtube: "https://youtu.be/kDgEr5qJj0Q" },
    { titre: "Exercice 3 · Tout par le graphique", type: "Bilan", youtube: "https://youtu.be/M1WsNoPcego" },
    { titre: "Exercice 4 · L'enclos des cabris", type: "Synthèse", youtube: "https://youtu.be/LeM5BO2az9w" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ----------
     Chaque série tire des nombres au hasard : on peut la refaire autant qu'on veut.
     type : nom du générateur (voir assets/exercices.js). nb : nombre de questions. */
  exercices: [
    { type: "lecture-image", titre: "Lire une image sur la courbe", etape: "Résolutions graphiques", nb: 5 },
    { type: "lecture-antecedents", titre: "Lire des antécédents : résoudre $f(x) = k$", etape: "Résolutions graphiques", nb: 5 },
    { type: "graph-f-egal-g", titre: "Résoudre graphiquement $f(x) = g(x)$", etape: "Résolutions graphiques", nb: 5 },
    { type: "resolution-graphique", titre: "Résoudre graphiquement $f(x) > k$, $f(x) \\leqslant k$…", etape: "Résolutions graphiques", nb: 5 },
    { type: "graph-f-inf-g", titre: "Résoudre graphiquement $f(x) > g(x)$, $f(x) \\leqslant g(x)$…", etape: "Résolutions graphiques", nb: 5 },
    { type: "image-calcul", titre: "Calculer une image", etape: "Par le calcul", nb: 5 },
    { type: "antecedent-affine", titre: "Trouver un antécédent par le calcul", etape: "Par le calcul", nb: 5 },
    { type: "ensemble-definition", titre: "Valeur interdite, ensemble de définition, domaine d'étude", etape: "Par le calcul", nb: 5 },
    { type: "appartenance", titre: "Le point est-il sur la courbe ? Calculer une coordonnée", etape: "Par le calcul", nb: 5 },
    { type: "calcul-f-egal-g", titre: "Résoudre $f(x) = g(x)$ par le calcul", etape: "Par le calcul", nb: 5 },
    { type: "calcul-f-inf-g", titre: "Résoudre $f(x) > g(x)$, $f(x) \\leqslant g(x)$… par le calcul", etape: "Par le calcul", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ----------
     bonne : numéro de la bonne réponse en partant de 0 (0 = la première). */
  qcm: [
    {
      question: "Soit $f(x) = 3x - 5$. Quelle est l'image de $2$ par $f$ ?",
      choix: ["$1$", "$-1$", "$\\dfrac{7}{3}$", "$6$"],
      bonne: 0,
      explication: "$f(2) = 3 \\times 2 - 5 = 6 - 5 = 1$. La réponse $\\frac{7}{3}$ est l'antécédent de $2$, pas son image."
    },
    {
      question: "D'après la courbe de $u$, quelle est l'image de $0$ ?",
      figure: "courbe-u",
      choix: ["$3$", "$-1$ et $3$", "$0$", "$4$"],
      bonne: 0,
      explication: "La courbe passe par le point $(0\\,;3)$, donc $u(0) = 3$. « $-1$ et $3$ » sont les antécédents de $0$."
    },
    {
      question: "D'après la courbe de $u$, quels sont les antécédents de $0$ ?",
      figure: "courbe-u",
      choix: ["$3$ seulement", "$-1$ et $3$", "Aucun", "$1$"],
      bonne: 1,
      explication: "On cherche les points de la courbe d'ordonnée $0$ : $(-1\\,;0)$ et $(3\\,;0)$."
    },
    {
      question: "Quel est l'ensemble de définition de $g(x) = \\dfrac{1}{x - 4}$ ?",
      choix: ["$\\mathbb{R}$", "$\\mathbb{R} \\setminus \\{-4\\}$", "$\\mathbb{R} \\setminus \\{4\\}$", "$]4\\,;+\\infty[$"],
      bonne: 2,
      explication: "Le dénominateur s'annule pour $x - 4 = 0$, c'est-à-dire $x = 4$. Seule cette valeur est interdite."
    },
    {
      question: "Soit $f(x) = x^2 + 1$. Le point $A(2\\,;5)$ appartient-il à la courbe de $f$ ?",
      choix: ["Oui, car $f(2) = 5$", "Non, car $f(5) \\neq 2$", "Non, car $f(2) = 4$", "On ne peut pas le savoir sans tracer la courbe"],
      bonne: 0,
      explication: "On calcule l'image de l'abscisse : $f(2) = 2^2 + 1 = 5$, qui est bien l'ordonnée de $A$."
    },
    {
      question: "D'après la courbe de $u$, quelles sont les solutions de $u(x) = 3$ ?",
      figure: "courbe-u",
      choix: ["$S = \\{3\\}$", "$S = \\{0\\,;2\\}$", "$S = \\{1\\}$", "$S = \\{-1\\,;3\\}$"],
      bonne: 1,
      explication: "La droite $y = 3$ coupe la courbe en $(0\\,;3)$ et $(2\\,;3)$. Les solutions sont les abscisses $0$ et $2$."
    },
    {
      question: "D'après la courbe de $u$, quelles sont les solutions de $u(x) > 0$ ?",
      figure: "courbe-u",
      choix: ["$[-1\\,;3]$", "$\\mathopen{]}-1\\,;3[$", "$]0\\,;4]$", "$[-2\\,;-1[ \\cup ]3\\,;4]$"],
      bonne: 1,
      explication: "La courbe est strictement au-dessus de l'axe des abscisses entre $-1$ et $3$. Inégalité stricte : les bornes sont exclues."
    },
    {
      question: "Kayaks : $A(t) = 8t$ et $B(t) = 4t + 12$ pour $t \\in [0\\,;6]$. Quelles sont les solutions de $A(t) < B(t)$ ?",
      figure: "kayaks",
      choix: ["$[0\\,;3[$", "$[0\\,;3]$", "$]3\\,;6]$", "$\\mathopen{]}-\\infty\\,;3[$"],
      bonne: 0,
      explication: "$8t < 4t + 12 \\iff 4t < 12 \\iff t < 3$. Avec $t \\geqslant 0$ : $S = [0\\,;3[$. On n'oublie pas la contrainte $t \\in [0\\,;6]$."
    },
    {
      question: "Soit $f(x) = 3x - 4$ et $g(x) = x + 2$. Quelles sont les solutions de $f(x) = g(x)$ ?",
      choix: ["$S = \\{3\\}$", "$S = \\{5\\}$", "$S = \\{-3\\}$", "$S = \\{6\\}$"],
      bonne: 0,
      explication: "$3x - 4 = x + 2 \\iff 2x = 6 \\iff x = 3$. Le nombre $5 = f(3) = g(3)$ est l'ordonnée du point commun, pas une solution."
    },
    {
      question: "Quelles sont les solutions de l'inéquation $-2x + 1 \\leqslant x + 7$ ?",
      choix: ["$S = [-2\\,;+\\infty[$", "$S = \\mathopen{]}-\\infty\\,;-2]$", "$S = \\mathopen{]}-2\\,;+\\infty[$", "$S = \\mathopen{]}-\\infty\\,;2]$"],
      bonne: 0,
      explication: "$-2x + 1 \\leqslant x + 7 \\iff -3x \\leqslant 6 \\iff x \\geqslant -2$. On divise par $-3$, un nombre négatif : le sens de l'inégalité change."
    },
    {
      question: "Avec $A(x) = x(10 - x)$, quelle est l'image de $3$ ?",
      choix: ["$27$", "$21$", "$7$", "$30$"],
      bonne: 1,
      explication: "$A(3) = 3 \\times (10 - 3) = 3 \\times 7 = 21$. Les parenthèses se calculent en premier ($27$ vient de $3 \\times 10 - 3$)."
    },
    {
      question: "Dans ce tableau de valeurs, quels sont les antécédents de $1$ ?",
      tableau: { nom: "f(x)", x: [-1, 0, 1, 2], y: [4, 1, 0, 1] },
      choix: ["$0$", "$0$ et $2$", "$1$", "$4$"],
      bonne: 1,
      explication: "On cherche $1$ dans la ligne des images : il apparaît sous $x = 0$ et sous $x = 2$. L'image de $1$, elle, vaut $0$."
    },
    { question: "Soit $f(x) = x^2 + 2x$. Que vaut $f(-3)$ ?", choix: ["$3$", "$-15$", "$15$", "$-3$"], bonne: 0, explication: "$f(-3) = (-3)^2 + 2 \\times (-3) = 9 - 6 = 3$. Le nombre négatif se met entre parenthèses : $(-3)^2 = 9$, pas $-9$." },
    { question: "Soit $f(x) = 5 - 2x$. Quel est l'antécédent de $11$ par $f$ ?", choix: ["$-3$", "$3$", "$-17$", "$-8$"], bonne: 0, explication: "On résout $5 - 2x = 11 \\iff -2x = 6 \\iff x = -3$. Le nombre $-17 = f(11)$ est l'image de $11$, pas son antécédent." },
    { question: "Une seule de ces affirmations est vraie. Laquelle ?", choix: ["Par une fonction, chaque nombre de l'ensemble de définition a une seule image", "Par une fonction, un nombre peut avoir deux images différentes", "Par une fonction, chaque nombre a exactement un antécédent", "Par une fonction, tout nombre réel a au moins un antécédent"], bonne: 0, explication: "Une fonction associe à chaque $x$ une **unique** image $f(x)$. Ce sont les antécédents qui peuvent être plusieurs, ou aucun : par la fonction carré, $9$ a deux antécédents et $-1$ n'en a aucun." },
    { question: "La phrase « $f(4) = 7$ » signifie que :", choix: ["$7$ est l'image de $4$ par $f$", "$4$ est l'image de $7$ par $f$", "$7$ est un antécédent de $4$ par $f$", "la courbe de $f$ passe par le point $(7\\,;4)$"], bonne: 0, explication: "On part de $4$ et on obtient $7$ : $7$ est l'image de $4$, et $4$ est un antécédent de $7$. Le point $(4\\,;7)$ est sur la courbe, pas $(7\\,;4)$." },
    { question: "Par la fonction carré $x \\mapsto x^2$, combien le nombre $9$ a-t-il d'antécédents ?", choix: ["Deux : $-3$ et $3$", "Un seul : $3$", "Un seul : $81$", "Aucun"], bonne: 0, explication: "On résout $x^2 = 9$ : $x = 3$ ou $x = -3$, car $(-3)^2 = 9$ aussi. $81$ est l'image de $9$, pas un antécédent." },
    { question: "Quel est l'ensemble de définition de $h(x) = \\dfrac{3}{(x - 1)(x + 5)}$ ?", choix: ["$\\mathbb{R} \\setminus \\{-5\\,;1\\}$", "$\\mathbb{R} \\setminus \\{-1\\,;5\\}$", "$\\mathbb{R} \\setminus \\{1\\}$", "$\\mathbb{R}$"], bonne: 0, explication: "Le dénominateur est nul si $x - 1 = 0$ ou $x + 5 = 0$, c'est-à-dire si $x = 1$ ou $x = -5$. Ces deux valeurs sont interdites." },
    { question: "Un enclos rectangulaire de bananiers a un périmètre de $20$ m. Si un côté mesure $x$ m, l'aire vaut $A(x) = x(10 - x)$. Quel ensemble de définition est adapté au problème ?", choix: ["$]0\\,;10[$", "$\\mathbb{R}$", "$[0\\,;20]$", "$]0\\,;+\\infty[$"], bonne: 0, explication: "Les deux côtés $x$ et $10 - x$ sont des longueurs strictement positives : $x > 0$ et $x < 10$." },
    { question: "Soit $f(x) = \\dfrac{6}{x}$, dont voici la courbe. Lequel de ces points appartient à la courbe de $f$ ?", figure: "fonc-qcm-hyperbole", choix: ["$(-2\\,;-3)$", "$(3\\,;18)$", "$(2\\,;-3)$", "$(6\\,;0)$"], bonne: 0, explication: "On calcule l'image de l'abscisse : $f(-2) = \\dfrac{6}{-2} = -3$, c'est bien l'ordonnée. En revanche $f(3) = 2$, $f(2) = 3$ et $f(6) = 1$." },
    { question: "Le point $M(a\\,;b)$ appartient à la courbe de $f$. Que peut-on en déduire ?", choix: ["$f(a) = b$", "$f(b) = a$", "$a = b$", "$f(a) = 0$"], bonne: 0, explication: "La courbe est formée des points $(x\\,;f(x))$ : l'ordonnée est l'image de l'abscisse, donc $b = f(a)$." },
    { question: "Sur un graphique, la droite $y = 2$ coupe la courbe de $f$ en trois points, d'abscisses $-3$, $0$ et $4$. Les solutions de $f(x) = 2$ sont :", choix: ["$S = \\{-3\\,;0\\,;4\\}$", "$S = \\{2\\}$", "$S = \\{-3\\,;4\\}$", "$S = \\{0\\}$"], bonne: 0, explication: "Les solutions sont les abscisses des points de la courbe situés sur la droite $y = 2$ : il y en a trois. Le nombre $2$ est une ordonnée, pas une solution." },
    { question: "Les courbes de $f$ et $g$ se coupent aux points d'abscisses $-1$ et $2$. Entre $-1$ et $2$, la courbe de $f$ est au-dessus de celle de $g$ ; ailleurs, elle est en dessous. Les solutions de $f(x) \\leqslant g(x)$ sont :", choix: ["$\\mathopen{]}-\\infty\\,;-1] \\cup [2\\,;+\\infty[$", "$[-1\\,;2]$", "$\\mathopen{]}-\\infty\\,;-1[ \\cup \\,]2\\,;+\\infty[$", "$\\mathopen{]}-1\\,;2[$"], bonne: 0, explication: "On garde les abscisses où $\\mathcal{C}_f$ est en dessous de $\\mathcal{C}_g$, plus les points d'intersection, car l'inégalité est large." },
    { question: "Soit $f(x) = x^2$ et $g(x) = 3x$. Les solutions de $f(x) = g(x)$ sont :", choix: ["$S = \\{0\\,;3\\}$", "$S = \\{3\\}$", "$S = \\{0\\,;9\\}$", "$S = \\{-3\\,;3\\}$"], bonne: 0, explication: "$x^2 = 3x \\iff x^2 - 3x = 0 \\iff x(x - 3) = 0$, donc $x = 0$ ou $x = 3$. Diviser les deux membres par $x$ ferait perdre la solution $0$." },
    { question: "Les solutions de l'inéquation $4 - 3x > 10$ sont :", choix: ["$\\mathopen{]}-\\infty\\,;-2[$", "$\\mathopen{]}-2\\,;+\\infty[$", "$\\mathopen{]}-\\infty\\,;-2]$", "$]2\\,;+\\infty[$"], bonne: 0, explication: "$4 - 3x > 10 \\iff -3x > 6 \\iff x < -2$. On divise par $-3$, un nombre négatif : le sens de l'inégalité change. Inégalité stricte : $-2$ est exclu." },
    { question: "La location d'un kayak à Sada coûte $f(x) = 3x + 5$ euros pour $x$ heures. On a payé $17$ euros. Combien d'heures a duré la location ?", choix: ["$4$ heures", "$56$ heures", "$5$ heures", "$12$ heures"], bonne: 0, explication: "On cherche l'antécédent de $17$ : $3x + 5 = 17 \\iff 3x = 12 \\iff x = 4$. Le nombre $56 = f(17)$ est l'image de $17$ : il ne répond pas à la question." },
    { question: "D'après le graphique, quelles sont les solutions de l'équation $f(x) = g(x)$ ?", figure: "fonc-qcm-courbes", choix: ["$S = \\{0\\,;3\\}$", "$S = \\{-1\\,;2\\}$", "$S = [0\\,;3]$", "$S = \\{3\\}$"], bonne: 0, explication: "Les courbes se coupent en $(0\\,;-1)$ et $(3\\,;2)$. Les solutions sont les **abscisses** de ces points : $0$ et $3$. Les nombres $-1$ et $2$ sont leurs ordonnées." },
    { question: "$f$ et $g$ sont définies sur $[-1\\,;4]$. D'après le graphique, quelles sont les solutions de $f(x) \\leqslant g(x)$ ?", figure: "fonc-qcm-courbes", choix: ["$[0\\,;3]$", "$]0\\,;3[$", "$[-1\\,;0] \\cup [3\\,;4]$", "$[-1\\,;2]$"], bonne: 0, explication: "La parabole $\\mathcal{C}_f$ est sous la droite $\\mathcal{C}_g$ entre les abscisses $0$ et $3$. L'inégalité est large : on garde $0$ et $3$, abscisses des points d'intersection." },
    { question: "D'après la courbe de $f$, quels sont les antécédents de $0$ ?", figure: "fonc-qcm-cubique", choix: ["$-1$, $1$ et $3$", "$3$ seulement", "$-1$ et $1$ seulement", "$0$"], bonne: 0, explication: "La courbe coupe l'axe des abscisses (la droite $y = 0$) en trois points, d'abscisses $-1$, $1$ et $3$. Le nombre $3$ seul est l'image de $0$ : $f(0) = 3$." },
    { question: "La fonction $f$ dont voici la courbe est définie sur $[-1{,}5\\,;3{,}5]$. Combien de solutions l'équation $f(x) = 4$ a-t-elle ?", figure: "fonc-qcm-cubique", choix: ["Une seule", "Deux", "Trois", "Aucune"], bonne: 0, explication: "La droite horizontale $y = 4$ passe au-dessus de la « bosse » (qui monte à environ $3{,}1$) : elle ne coupe la courbe qu'une fois, sur la dernière partie montante." },
    { question: "La fonction $f$ dont voici la courbe est définie sur $[-1{,}5\\,;3{,}5]$. Quelles sont les solutions de $f(x) \\geqslant 0$ ?", figure: "fonc-qcm-cubique", choix: ["$[-1\\,;1] \\cup [3\\,;3{,}5]$", "$[-1{,}5\\,;-1] \\cup [1\\,;3]$", "$\\mathopen{]}-1\\,;1[ \\cup \\,]3\\,;3{,}5]$", "$[-1\\,;3]$"], bonne: 0, explication: "La courbe est au-dessus de l'axe des abscisses (ou dessus) de $-1$ à $1$, puis de $3$ à $3{,}5$. Inégalité large : $-1$, $1$ et $3$ sont inclus." },
    { question: "Voici la courbe de $f(x) = \\dfrac{2x - 1}{x + 2}$. Pourquoi n'a-t-elle aucun point d'abscisse $-2$ ?", figure: "fonc-cours-interdite", choix: ["Car $-2$ annule le dénominateur : $f(-2)$ n'existe pas", "Car $f(-2) = 0$", "Car $-2$ est un nombre négatif", "Car le numérateur vaut $0$ pour $x = -2$"], bonne: 0, explication: "Pour $x = -2$, le dénominateur $x + 2$ vaut $0$ : on ne peut pas diviser par $0$. La valeur $-2$ est interdite, $D = \\mathbb{R} \\setminus \\{-2\\}$." },
    { question: "Un taxi de Mamoudzou fait payer $f(x) = 1{,}5x + 3$ euros pour une course de $x$ km. Combien coûte une course de $10$ km ?", choix: ["$18$ €", "$15$ €", "$19{,}5$ €", "$4{,}5$ €"], bonne: 0, explication: "$f(10) = 1{,}5 \\times 10 + 3 = 15 + 3 = 18$. Le produit se calcule avant l'addition : $1{,}5 \\times (10 + 3) = 19{,}5$ ne convient pas. Et il ne faut pas oublier les $3$ € de prise en charge ($15$ € ne suffit pas)." },
    { question: "La citerne d'une maison de Koungou contient $V(t) = 900 - 30t$ litres d'eau après $t$ jours. Au bout de combien de jours est-elle vide ?", choix: ["$30$ jours", "$870$ jours", "$27\\,000$ jours", "$3$ jours"], bonne: 0, explication: "On cherche l'antécédent de $0$ : $900 - 30t = 0 \\iff 30t = 900 \\iff t = 30$. Le domaine d'étude est donc $[0\\,;30]$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer l'image d'un nombre",
      etapes: [
        "Vérifier que le nombre appartient à l'ensemble de définition.",
        "Remplacer $x$ par ce nombre, **entre parenthèses** s'il est négatif.",
        "Respecter les priorités : puissances, puis produits, puis sommes."
      ],
      exemple: "$f(x) = x^2 - 3x$ : $f(-2) = (-2)^2 - 3 \\times (-2) = 4 + 6 = 10$."
    },
    {
      titre: "Trouver les antécédents de $k$ par le calcul",
      etapes: [
        "Écrire l'équation $f(x) = k$.",
        "La résoudre.",
        "Garder seulement les solutions qui sont dans l'ensemble de définition."
      ],
      exemple: "$f(x) = 2x + 7$ et $k = 1$ : $2x + 7 = 1 \\iff 2x = -6 \\iff x = -3$.",
      figure: "fonc-meth-antecedent"
    },
    {
      titre: "Trouver l'ensemble de définition ou le domaine d'étude",
      etapes: [
        "Repérer les quotients : leur **dénominateur** ne doit pas valoir $0$. Résoudre « dénominateur $= 0$ » donne les valeurs interdites.",
        "Dans un problème, ajouter les contraintes de la situation : une longueur est positive, une durée aussi, un volume restant ne peut pas être négatif.",
        "Écrire l'ensemble obtenu : $\\mathbb{R}$ privé des valeurs interdites, ou un intervalle."
      ],
      exemple: "$f(x) = \\dfrac{2x - 1}{x + 2}$ : $x + 2 = 0 \\iff x = -2$, donc $D = \\mathbb{R} \\setminus \\{-2\\}$. Enclos de $20$ m de périmètre, de largeur $x$ et de longueur $10 - x$ : $x \\in \\,]0\\,;10[$.",
      figure: "fonc-cours-interdite"
    },
    {
      titre: "Résoudre $f(x) = g(x)$ par le calcul",
      etapes: [
        "Écrire l'équation $f(x) = g(x)$.",
        "Regrouper les $x$ d'un côté et les nombres de l'autre, ou tout passer d'un côté et factoriser.",
        "Résoudre, puis écrire $S = \\{\\ldots\\}$ : les solutions sont des valeurs de $x$."
      ],
      exemple: "$3x - 4 = x + 2 \\iff 2x = 6 \\iff x = 3$, donc $S = \\{3\\}$. Les droites se coupent au point $(3\\,;5)$.",
      figure: "fonc-meth-egal"
    },
    {
      titre: "Résoudre $f(x) < g(x)$ (ou $>$, $\\leqslant$, $\\geqslant$) par le calcul",
      etapes: [
        "Écrire l'inéquation, puis regrouper les $x$ d'un côté et les nombres de l'autre.",
        "Diviser par le coefficient de $x$ : s'il est **négatif**, **changer le sens** de l'inégalité.",
        "Écrire les solutions sous forme d'intervalle."
      ],
      exemple: "$-2x + 1 \\leqslant x + 7 \\iff -3x \\leqslant 6 \\iff x \\geqslant -2$, donc $S = [-2\\,;+\\infty[$.",
      figure: "fonc-cours-inequation"
    },
    {
      titre: "Savoir si un point est sur la courbe",
      etapes: [
        "Calculer l'image de l'**abscisse** du point.",
        "Comparer avec l'**ordonnée** : égales, le point est sur la courbe ; différentes, il n'y est pas."
      ],
      exemple: "$f(x) = x^2 + 1$, $B(3\\,;8)$ : $f(3) = 10 \\neq 8$, donc $B \\notin \\mathcal{C}_f$ ($B$ est en dessous de la courbe).",
      figure: "fonc-meth-point"
    },
    {
      titre: "Lire graphiquement une image ou des antécédents",
      etapes: [
        "Image de $a$ : trait **vertical** depuis $a$ jusqu'à la courbe, puis lecture sur l'axe des ordonnées.",
        "Antécédents de $k$ : droite **horizontale** $y = k$, puis lecture des abscisses de **tous** les points d'intersection."
      ],
      exemple: "Sur la courbe de $u$ : $u(1) = 4$ et les antécédents de $3$ sont $0$ et $2$. Un nombre peut n'avoir aucun antécédent : la droite $y = k$ ne touche alors pas la courbe.",
      figure: "fonc-meth-lire"
    },
    {
      titre: "Résoudre graphiquement $f(x) = g(x)$",
      etapes: [
        "Repérer les points d'intersection des courbes $\\mathcal{C}_f$ et $\\mathcal{C}_g$.",
        "Lire l'**abscisse** de chacun de ces points.",
        "Écrire l'ensemble des solutions $S = \\{\\ldots\\}$ (ou $S = \\varnothing$ si les courbes ne se coupent pas)."
      ],
      exemple: "Kayaks : les droites se coupent en $I(3\\,;24)$, donc $S = \\{3\\}$ (et non $24$).",
      figure: "kayaks"
    },
    {
      titre: "Résoudre graphiquement $f(x) > k$ (ou $\\geqslant$, $<$, $\\leqslant$)",
      etapes: [
        "Tracer la droite $y = k$.",
        "Repérer la partie de la courbe au-dessus (pour $>$) ou en dessous (pour $<$) de la droite.",
        "Lire les abscisses correspondantes et écrire un intervalle.",
        "Crochets : borne **exclue** pour $<$ ou $>$, **incluse** pour $\\leqslant$ ou $\\geqslant$. Ne pas sortir de l'ensemble de définition."
      ],
      exemple: "Sur la courbe de $u$ : $u(x) > 0 \\iff x \\in \\mathopen{]}-1\\,;3[$.",
      figure: "fonc-meth-superieur"
    },
    {
      titre: "Résoudre graphiquement $f(x) > g(x)$ (ou $\\geqslant$, $<$, $\\leqslant$)",
      etapes: [
        "Repérer les points d'intersection de $\\mathcal{C}_f$ et $\\mathcal{C}_g$ et lire leurs abscisses.",
        "Repérer où $\\mathcal{C}_f$ est **au-dessus** de $\\mathcal{C}_g$ (pour $>$) ou **en dessous** (pour $<$).",
        "Lire les abscisses correspondantes et écrire un intervalle (ou une réunion d'intervalles).",
        "Abscisses des points d'intersection : **exclues** pour $<$ ou $>$, **incluses** pour $\\leqslant$ ou $\\geqslant$."
      ],
      exemple: "Courbes de $f$ et $g$ ci-dessous, sur $[-1\\,;4]$ : la parabole est strictement au-dessus de la droite avant l'abscisse $0$ et après l'abscisse $3$, donc $f(x) > g(x) \\iff x \\in [-1\\,;0[ \\cup \\,]3\\,;4]$.",
      figure: "fonc-qcm-courbes"
    }
  ],
  erreurs: [
    "Confondre **image** et **antécédent** : l'image de $0$ est $f(0)$, les antécédents de $0$ sont les solutions de $f(x) = 0$.",
    "Donner une **ordonnée** comme solution d'une équation : les solutions sont des valeurs de $x$.",
    "Calculer $f(\\text{ordonnée})$ au lieu de $f(\\text{abscisse})$ pour tester un point.",
    "Inclure une borne dans une inéquation stricte, ou oublier les contraintes du problème ($t \\geqslant 0$).",
    "Pour $u(x) \\leqslant -5$, oublier le cas d'égalité et répondre $S = \\varnothing$.",
    "Oublier de **changer le sens** de l'inégalité en divisant par un nombre négatif : $-3x \\leqslant 6 \\iff x \\geqslant -2$.",
    "Pour $f(x) > g(x)$, regarder seulement la courbe de $f$ : il faut **comparer** les deux courbes, point par point.",
    "Écrire $(-3)^2 = -9$ en calculant une image : un carré n'est jamais négatif, $(-3)^2 = 9$. En revanche $-3^2 = -9$.",
    "Oublier le **domaine d'étude** dans un problème : une longueur, une durée, un volume restant ne peuvent pas être négatifs."
  ]
};
