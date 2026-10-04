/*
  CHAPITRE : Seconde — Généralités sur les fonctions
  ---------------------------------------------------
  Tout le contenu de la page du chapitre est ici. Vous pouvez le modifier librement.

  Petites règles d'écriture :
  - Les formules s'écrivent entre $ ... $ (syntaxe LaTeX / KaTeX).
    Dans ce fichier, chaque antislash est doublé : $\\frac{1}{2}$, $\\mathbb{R}$.
  - **texte** met en gras. Une ligne vide sépare deux paragraphes.
  - Une ligne qui commence par "- " devient une puce.
  - youtube : coller l'adresse de la vidéo (https://youtu.be/... ou https://www.youtube.com/watch?v=...).
    Laisser "" tant que la vidéo n'est pas choisie : un emplacement s'affiche.
  - figure : nom d'un graphique prédéfini ("courbe-u", "kayaks", "enclos").
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-fonctions"] = {
  niveau: "Seconde",
  numero: 2,
  titre: "Généralités sur les fonctions",
  accroche: "Image, antécédent, courbe, résolutions graphiques et par le calcul : les bases pour toute l'année.",

  playlist: "", // lien de la playlist YouTube du chapitre
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
      texte:
        "Une **fonction** $f$ associe à chaque nombre $x$ de son ensemble de définition un **unique** nombre, noté $f(x)$.\n\n" +
        "- $f(x)$ est l'**image** de $x$ par $f$.\n" +
        "- $x$ est un **antécédent** de $f(x)$ par $f$.\n\n" +
        "Un nombre a toujours **une seule image**, mais il peut avoir zéro, un ou plusieurs antécédents.",
      exemple: {
        enonce: "Avec $f(x) = x^2$ : quelle est l'image de $3$ ? Quels sont les antécédents de $9$ ?",
        solution: "$f(3) = 3^2 = 9$, donc l'image de $3$ est $9$.\n\n$3^2 = 9$ et $(-3)^2 = 9$ : les antécédents de $9$ sont $3$ et $-3$."
      }
    },
    {
      titre: "L'ensemble de définition",
      texte:
        "L'**ensemble de définition** $D$ de $f$ regroupe tous les nombres $x$ qui ont une image.\n\n" +
        "- Un quotient n'existe que si son **dénominateur est non nul**.\n" +
        "- Dans un problème concret, une longueur, une durée ou une aire impose souvent $x \\geqslant 0$ ou $x > 0$.",
      exemple: {
        enonce: "Déterminer l'ensemble de définition de $f(x) = \\dfrac{2x-1}{x+2}$.",
        solution: "$x + 2 = 0 \\iff x = -2$. La valeur $-2$ est interdite, toutes les autres ont une image.\n\n$D = \\mathbb{R} \\setminus \\{-2\\} = \\,]-\\infty\\,;-2[\\, \\cup \\,]-2\\,;+\\infty[$"
      }
    },
    {
      titre: "Calculer une image, dresser un tableau de valeurs",
      texte:
        "Pour calculer $f(a)$, on vérifie que $a \\in D$ puis on **remplace $x$ par $a$** dans l'expression.\n\n" +
        "Un **tableau de valeurs** rassemble plusieurs images calculées ainsi.",
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
      texte:
        "La **courbe** $\\mathcal{C}_f$ est l'ensemble des points $M(x\\,;f(x))$ avec $x \\in D$.\n\n" +
        "Un point $M(a\\,;b)$ appartient à $\\mathcal{C}_f$ si et seulement si $a \\in D$ **et** $f(a) = b$.\n\n" +
        "On calcule toujours l'image de l'**abscisse** (la première coordonnée) et on la compare à l'ordonnée.",
      exemple: {
        enonce: "Avec $f(x) = \\dfrac{2x-1}{x+2}$, le point $A(-1\\,;-3)$ appartient-il à $\\mathcal{C}_f$ ?",
        solution: "$-1 \\in D$ et $f(-1) = \\dfrac{2 \\times (-1) - 1}{-1 + 2} = \\dfrac{-3}{1} = -3$.\n\nL'image de l'abscisse est égale à l'ordonnée : $A \\in \\mathcal{C}_f$."
      }
    },
    {
      titre: "Lire une image et des antécédents sur une courbe",
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
      texte:
        "- $f(x) = k$ : abscisses des points de $\\mathcal{C}_f$ situés **sur** la droite $y = k$.\n" +
        "- $f(x) > k$ : abscisses des points de $\\mathcal{C}_f$ situés **strictement au-dessus** de $y = k$.\n" +
        "- $f(x) = g(x)$ : abscisses des points d'**intersection** des deux courbes.\n" +
        "- $f(x) > g(x)$ : abscisses des points où $\\mathcal{C}_f$ est **strictement au-dessus** de $\\mathcal{C}_g$.\n" +
        "- $f(x) < g(x)$ : abscisses des points où $\\mathcal{C}_f$ est **strictement en dessous** de $\\mathcal{C}_g$.\n" +
        "- $f(x) \\geqslant g(x)$ ou $f(x) \\leqslant g(x)$ : pareil, mais on **garde** les abscisses des points d'intersection.\n\n" +
        "Les solutions sont toujours des **valeurs de $x$**, donc des abscisses. Attention aux crochets : inégalité stricte, borne exclue.",
      figure: "kayaks",
      exemple: {
        enonce: "Kayaks dans le lagon : le loueur A fait payer $A(t) = 8t$ et le loueur B $B(t) = 4t + 12$, pour $t \\in [0\\,;6]$ heures. Résoudre $A(t) = B(t)$ puis $A(t) < B(t)$.",
        solution: "Les droites se coupent en $I(3\\,;24)$ : $S = \\{3\\}$. Pour 3 h, les deux loueurs demandent 24 €.\n\nLa droite de A est sous celle de B pour $t$ entre 0 (inclus) et 3 (exclu) : $S = [0\\,;3[$. Pour moins de 3 h, le loueur A est le moins cher."
      }
    },
    {
      titre: "Résoudre $f(x) = g(x)$ ou $f(x) < g(x)$ par le calcul",
      texte:
        "On écrit l'équation $f(x) = g(x)$ et on la résout :\n\n" +
        "- on regroupe les $x$ d'un côté et les nombres de l'autre (équation du premier degré) ;\n" +
        "- ou on passe tout du même côté, $f(x) - g(x) = 0$, puis on factorise (produit nul).\n\n" +
        "Les solutions sont les **abscisses** des points d'intersection des deux courbes. Pour obtenir les points eux-mêmes, on calcule ensuite leurs images.\n\n" +
        "Pour une **inéquation** du premier degré ($f(x) < g(x)$, $f(x) \\geqslant g(x)$…), on fait de même, avec une règle en plus : quand on multiplie ou divise par un nombre **négatif**, le **sens de l'inégalité change**. Les solutions forment un intervalle.",
      exemple: {
        enonce: "Kayaks : retrouver par le calcul le point d'intersection des droites de $A(t) = 8t$ et $B(t) = 4t + 12$, puis résoudre $A(t) < B(t)$. Enfin, résoudre $-2x + 1 \\leqslant x + 7$.",
        solution: "$8t = 4t + 12 \\iff 4t = 12 \\iff t = 3$. Puis $A(3) = 8 \\times 3 = 24$ : le point commun est $I(3\\,;24)$.\n\n$8t < 4t + 12 \\iff 4t < 12 \\iff t < 3$. Avec $t \\in [0\\,;6]$ : $S = [0\\,;3[$, comme sur le graphique.\n\n$-2x + 1 \\leqslant x + 7 \\iff -3x \\leqslant 6 \\iff x \\geqslant -2$ (on divise par $-3$, le sens change). $S = [-2\\,;+\\infty[$."
      }
    }
  ],

  /* Les 4 exercices des PDF, corrigés en vidéo */
  videos: [
    { titre: "Exercice 1 · Location de kayaks dans le lagon", type: "Lecture et calcul", youtube: "" },
    { titre: "Exercice 2 · Tout par le calcul", type: "Bilan", youtube: "" },
    { titre: "Exercice 3 · Tout par le graphique", type: "Bilan", youtube: "" },
    { titre: "Exercice 4 · L'enclos des cabris", type: "Synthèse", youtube: "" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ----------
     Chaque série tire des nombres au hasard : on peut la refaire autant qu'on veut.
     type : nom du générateur (voir assets/exercices.js). nb : nombre de questions. */
  exercices: [
    { type: "lecture-image", titre: "Lire une image sur la courbe", etape: "Résolutions graphiques", nb: 5 },
    { type: "lecture-antecedents", titre: "Lire des antécédents : résoudre f(x) = k", etape: "Résolutions graphiques", nb: 5 },
    { type: "graph-f-egal-g", titre: "Résoudre graphiquement f(x) = g(x)", etape: "Résolutions graphiques", nb: 5 },
    { type: "resolution-graphique", titre: "Résoudre graphiquement f(x) > k, f(x) ≤ k…", etape: "Résolutions graphiques", nb: 5 },
    { type: "graph-f-inf-g", titre: "Résoudre graphiquement f(x) > g(x), f(x) ≤ g(x)…", etape: "Résolutions graphiques", nb: 5 },
    { type: "image-calcul", titre: "Calculer une image", etape: "Par le calcul", nb: 5 },
    { type: "antecedent-affine", titre: "Trouver un antécédent par le calcul", etape: "Par le calcul", nb: 5 },
    { type: "ensemble-definition", titre: "Repérer la valeur interdite", etape: "Par le calcul", nb: 4 },
    { type: "appartenance", titre: "Le point est-il sur la courbe ?", etape: "Par le calcul", nb: 5 },
    { type: "calcul-f-egal-g", titre: "Résoudre f(x) = g(x) par le calcul", etape: "Par le calcul", nb: 5 },
    { type: "calcul-f-inf-g", titre: "Résoudre f(x) > g(x), f(x) ≤ g(x)… par le calcul", etape: "Par le calcul", nb: 5 }
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
      choix: ["Oui, car $f(2) = 5$", "Non, car $f(5) \\neq 2$", "Non, car $f(2) = 4$"],
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
      choix: ["$[-1\\,;3]$", "$]-1\\,;3[$", "$]0\\,;4]$", "$[-2\\,;-1[ \\cup ]3\\,;4]$"],
      bonne: 1,
      explication: "La courbe est strictement au-dessus de l'axe des abscisses entre $-1$ et $3$. Inégalité stricte : les bornes sont exclues."
    },
    {
      question: "Kayaks : $A(t) = 8t$ et $B(t) = 4t + 12$ pour $t \\in [0\\,;6]$. Quelles sont les solutions de $A(t) < B(t)$ ?",
      figure: "kayaks",
      choix: ["$[0\\,;3[$", "$[0\\,;3]$", "$]3\\,;6]$", "$]-\\infty\\,;3[$"],
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
      choix: ["$S = [-2\\,;+\\infty[$", "$S = \\,]-\\infty\\,;-2]$", "$S = \\,]-2\\,;+\\infty[$", "$S = \\,]-\\infty\\,;2]$"],
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
    }
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
      exemple: "$f(x) = 2x + 7$ et $k = 1$ : $2x + 7 = 1 \\iff 2x = -6 \\iff x = -3$."
    },
    {
      titre: "Résoudre $f(x) = g(x)$ par le calcul",
      etapes: [
        "Écrire l'équation $f(x) = g(x)$.",
        "Regrouper les $x$ d'un côté et les nombres de l'autre, ou tout passer d'un côté et factoriser.",
        "Résoudre, puis écrire $S = \\{\\ldots\\}$ : les solutions sont des valeurs de $x$."
      ],
      exemple: "$3x - 4 = x + 2 \\iff 2x = 6 \\iff x = 3$, donc $S = \\{3\\}$."
    },
    {
      titre: "Résoudre $f(x) < g(x)$ (ou $>$, $\\leqslant$, $\\geqslant$) par le calcul",
      etapes: [
        "Écrire l'inéquation, puis regrouper les $x$ d'un côté et les nombres de l'autre.",
        "Diviser par le coefficient de $x$ : s'il est **négatif**, **changer le sens** de l'inégalité.",
        "Écrire les solutions sous forme d'intervalle."
      ],
      exemple: "$-2x + 1 \\leqslant x + 7 \\iff -3x \\leqslant 6 \\iff x \\geqslant -2$, donc $S = [-2\\,;+\\infty[$."
    },
    {
      titre: "Savoir si un point est sur la courbe",
      etapes: [
        "Calculer l'image de l'**abscisse** du point.",
        "Comparer avec l'**ordonnée** : égales, le point est sur la courbe ; différentes, il n'y est pas."
      ],
      exemple: "$f(x) = x^2 + 1$, $B(3\\,;8)$ : $f(3) = 10 \\neq 8$, donc $B \\notin \\mathcal{C}_f$."
    },
    {
      titre: "Lire graphiquement une image ou des antécédents",
      etapes: [
        "Image de $a$ : trait **vertical** depuis $a$ jusqu'à la courbe, puis lecture sur l'axe des ordonnées.",
        "Antécédents de $k$ : droite **horizontale** $y = k$, puis lecture des abscisses de **tous** les points d'intersection."
      ],
      exemple: "Un nombre peut n'avoir aucun antécédent : la droite $y = k$ ne touche alors pas la courbe."
    },
    {
      titre: "Résoudre graphiquement $f(x) = g(x)$",
      etapes: [
        "Repérer les points d'intersection des courbes $\\mathcal{C}_f$ et $\\mathcal{C}_g$.",
        "Lire l'**abscisse** de chacun de ces points.",
        "Écrire l'ensemble des solutions $S = \\{\\ldots\\}$ (ou $S = \\varnothing$ si les courbes ne se coupent pas)."
      ],
      exemple: "Kayaks : les droites se coupent en $I(3\\,;24)$, donc $S = \\{3\\}$ (et non $24$)."
    },
    {
      titre: "Résoudre graphiquement $f(x) > k$ (ou $\\geqslant$, $<$, $\\leqslant$)",
      etapes: [
        "Tracer la droite $y = k$.",
        "Repérer la partie de la courbe au-dessus (pour $>$) ou en dessous (pour $<$) de la droite.",
        "Lire les abscisses correspondantes et écrire un intervalle.",
        "Crochets : borne **exclue** pour $<$ ou $>$, **incluse** pour $\\leqslant$ ou $\\geqslant$. Ne pas sortir de l'ensemble de définition."
      ],
      exemple: "Sur la courbe de $u$ : $u(x) > 0 \\iff x \\in \\,]-1\\,;3[$."
    },
    {
      titre: "Résoudre graphiquement $f(x) > g(x)$ (ou $\\geqslant$, $<$, $\\leqslant$)",
      etapes: [
        "Repérer les points d'intersection de $\\mathcal{C}_f$ et $\\mathcal{C}_g$ et lire leurs abscisses.",
        "Repérer où $\\mathcal{C}_f$ est **au-dessus** de $\\mathcal{C}_g$ (pour $>$) ou **en dessous** (pour $<$).",
        "Lire les abscisses correspondantes et écrire un intervalle (ou une réunion d'intervalles).",
        "Abscisses des points d'intersection : **exclues** pour $<$ ou $>$, **incluses** pour $\\leqslant$ ou $\\geqslant$."
      ],
      exemple: "Kayaks : la droite de A est en dessous de celle de B avant le point $I(3\\,;24)$, donc $A(t) \\leqslant B(t) \\iff t \\in [0\\,;3]$."
    }
  ],
  erreurs: [
    "Confondre **image** et **antécédent** : l'image de $0$ est $f(0)$, les antécédents de $0$ sont les solutions de $f(x) = 0$.",
    "Donner une **ordonnée** comme solution d'une équation : les solutions sont des valeurs de $x$.",
    "Calculer $f(\\text{ordonnée})$ au lieu de $f(\\text{abscisse})$ pour tester un point.",
    "Inclure une borne dans une inéquation stricte, ou oublier les contraintes du problème ($t \\geqslant 0$).",
    "Pour $u(x) \\leqslant -5$, oublier le cas d'égalité et répondre $S = \\varnothing$.",
    "Oublier de **changer le sens** de l'inégalité en divisant par un nombre négatif : $-3x \\leqslant 6 \\iff x \\geqslant -2$.",
    "Pour $f(x) > g(x)$, regarder seulement la courbe de $f$ : il faut **comparer** les deux courbes, point par point."
  ]
};
