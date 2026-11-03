/*
  ENTRAÎNEMENT : Terminale spécialité — chapitre 8, Géométrie dans l'espace 2 : orthogonalité et distances
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-spe-espace-2.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit du bac.
  Repères orthonormés. Distance d'un point à un plan par le projeté orthogonal, comme dans le cours.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-spe-espace-2"] = {
  revisions: {
    intro: "L'orthogonalité dans l'espace en un coup d'œil : produit scalaire, vecteur normal, équation cartésienne d'un plan, intersection, projeté orthogonal et distances. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Produit scalaire",
        texte: "Dans un repère orthonormé, $\\vec{u}(x\\,;y\\,;z) \\cdot \\vec{v}(x'\\,;y'\\,;z') = xx' + yy' + zz'$ et $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2 + z^2}$. Deux vecteurs sont orthogonaux si et seulement si leur produit scalaire est nul."
      },
      {
        titre: "Vecteur normal",
        texte: "$\\vec{n}$ est normal au plan s'il est orthogonal à deux vecteurs **non colinéaires** du plan. Pour le trouver : $\\vec{n} \\cdot \\overrightarrow{AB} = 0$ et $\\vec{n} \\cdot \\overrightarrow{AC} = 0$, puis on fixe une coordonnée."
      },
      {
        titre: "Équation cartésienne",
        texte: "Un plan de vecteur normal $\\vec{n}(a\\,;b\\,;c)$ a une équation $ax + by + cz + d = 0$ ; on trouve $d$ avec un point du plan. Inversement, on lit $\\vec{n}(a\\,;b\\,;c)$ dans l'équation, sans le terme $d$."
      },
      {
        titre: "Positions relatives",
        texte: "Deux plans sont parallèles si leurs vecteurs normaux sont colinéaires, perpendiculaires s'ils sont orthogonaux. Une droite de vecteur directeur $\\vec{u}$ est orthogonale au plan si $\\vec{u}$ est colinéaire à $\\vec{n}$, parallèle au plan si $\\vec{u} \\cdot \\vec{n} = 0$."
      },
      {
        titre: "Droite et plan",
        texte: "Pour l'intersection, on remplace $x$, $y$ et $z$ de la représentation paramétrique dans l'équation du plan : on obtient une équation en $t$, puis le point."
      },
      {
        titre: "Projeté et distance",
        texte: "Le projeté orthogonal $H$ de $M$ sur le plan est l'intersection du plan avec la droite passant par $M$ et dirigée par $\\vec{n}$. C'est le point du plan le plus proche de $M$, et la distance de $M$ au plan vaut $MH$."
      }
    ],
    pieges: [
      "Utiliser $xx' + yy' + zz'$ dans un repère qui n'est pas orthonormé.",
      "Oublier la troisième coordonnée dans un produit scalaire ou une norme.",
      "Croire qu'une droite orthogonale à une seule droite d'un plan est orthogonale au plan.",
      "Mettre le terme constant $d$ dans le vecteur normal.",
      "Confondre vecteur normal, orthogonal au plan, et vecteur directeur, dans le plan.",
      "Oublier la racine carrée dans un calcul de distance."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit du bac (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Un tétraèdre",
        duree: 30, points: 7, calculatrice: false,
        contexte: "Dans un repère orthonormé d'origine $O$, on considère les points $A(1\\,;0\\,;0)$, $B(0\\,;2\\,;0)$ et $C(0\\,;0\\,;3)$, et le vecteur $\\vec{n}(6\\,;3\\,;2)$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Démontre que $\\vec{n}$ est un vecteur normal au plan $(ABC)$.",
            indice: "Calcule $\\vec{n} \\cdot \\overrightarrow{AB}$ et $\\vec{n} \\cdot \\overrightarrow{AC}$, et vérifie que $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ ne sont pas colinéaires.",
            corrige: "$\\overrightarrow{AB}(-1\\,;2\\,;0)$ et $\\overrightarrow{AC}(-1\\,;0\\,;3)$ ne sont pas colinéaires : si $\\overrightarrow{AC} = k\\overrightarrow{AB}$, la première coordonnée donnerait $k = 1$, et la deuxième $0 = 2$. Puis $\\vec{n} \\cdot \\overrightarrow{AB} = -6 + 6 + 0 = 0$ et $\\vec{n} \\cdot \\overrightarrow{AC} = -6 + 0 + 6 = 0$ : $\\vec{n}$ est orthogonal à deux vecteurs non colinéaires du plan, il lui est normal."
          },
          {
            n: "2.", points: 1,
            texte: "Déduis-en une équation cartésienne du plan $(ABC)$.",
            indice: "L'équation est de la forme $6x + 3y + 2z + d = 0$ ; utilise le point $A$.",
            corrige: "Le plan a une équation $6x + 3y + 2z + d = 0$. Avec $A(1\\,;0\\,;0)$ : $6 + d = 0$, donc $d = -6$ et $(ABC) : 6x + 3y + 2z - 6 = 0$. Vérification avec $B$ : $6 - 6 = 0$, et avec $C$ : $6 - 6 = 0$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Soit $\\Delta$ la droite passant par $O$ et orthogonale au plan $(ABC)$. Donne une représentation paramétrique de $\\Delta$, puis les coordonnées du point $H$, intersection de $\\Delta$ et de $(ABC)$.",
            indice: "$\\Delta$ est dirigée par $\\vec{n}$. Remplace $x = 6t$, $y = 3t$, $z = 2t$ dans l'équation du plan.",
            corrige: "$\\Delta : x = 6t$, $y = 3t$, $z = 2t$, avec $t \\in \\mathbb{R}$. Dans l'équation : $36t + 9t + 4t - 6 = 0$, soit $49t = 6$ et $t = \\dfrac{6}{49}$. Donc $H\\left(\\dfrac{36}{49}\\,;\\dfrac{18}{49}\\,;\\dfrac{12}{49}\\right)$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Calcule la distance du point $O$ au plan $(ABC)$.",
            indice: "C'est $OH$, car $H$ est le projeté orthogonal de $O$ sur le plan. Ou bien $OH = t \\times \\|\\vec{n}\\|$.",
            corrige: "$\\|\\vec{n}\\| = \\sqrt{36 + 9 + 4} = 7$ et $\\overrightarrow{OH} = \\dfrac{6}{49}\\vec{n}$, donc $OH = \\dfrac{6}{49} \\times 7 = \\dfrac{6}{7}$. La distance de $O$ au plan $(ABC)$ vaut $\\dfrac{6}{7}$."
          },
          {
            n: "5.", points: 1.5,
            texte: "Calcule le volume du tétraèdre $OABC$ en prenant pour base le triangle $OAB$. Déduis-en l'aire du triangle $ABC$.",
            indice: "$V = \\dfrac{1}{3} \\times \\text{aire de la base} \\times \\text{hauteur}$. Avec la base $ABC$, la hauteur est $OH$.",
            corrige: "Le triangle $OAB$ est rectangle en $O$, d'aire $\\dfrac{1 \\times 2}{2} = 1$, et la hauteur issue de $C$ est $OC = 3$ : $V = \\dfrac{1}{3} \\times 1 \\times 3 = 1$. Avec la base $ABC$ et la hauteur $OH$ : $1 = \\dfrac{1}{3} \\times \\mathcal{A} \\times \\dfrac{6}{7}$, donc $\\mathcal{A} = \\dfrac{7}{2}$."
          }
        ]
      },
      {
        titre: "Une diagonale du cube",
        duree: 25, points: 7, calculatrice: false,
        contexte: "$ABCDEFGH$ est un cube d'arête $1$ : $ABCD$ est la face du bas et $E$, $F$, $G$, $H$ sont au-dessus de $A$, $B$, $C$, $D$. On utilise le repère orthonormé $(A\\,;\\overrightarrow{AB}, \\overrightarrow{AD}, \\overrightarrow{AE})$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Donne les coordonnées de $B$, $D$, $G$, $E$ et $C$. Calcule $\\overrightarrow{EC} \\cdot \\overrightarrow{BD}$ et $\\overrightarrow{EC} \\cdot \\overrightarrow{BG}$.",
            indice: "$G$ est au-dessus de $C(1\\,;1\\,;0)$. Puis $\\overrightarrow{EC}(1\\,;1\\,;-1)$.",
            corrige: "$B(1\\,;0\\,;0)$, $D(0\\,;1\\,;0)$, $G(1\\,;1\\,;1)$, $E(0\\,;0\\,;1)$ et $C(1\\,;1\\,;0)$. Avec $\\overrightarrow{EC}(1\\,;1\\,;-1)$, $\\overrightarrow{BD}(-1\\,;1\\,;0)$ et $\\overrightarrow{BG}(0\\,;1\\,;1)$ : $\\overrightarrow{EC} \\cdot \\overrightarrow{BD} = -1 + 1 + 0 = 0$ et $\\overrightarrow{EC} \\cdot \\overrightarrow{BG} = 0 + 1 - 1 = 0$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Déduis-en que la droite $(EC)$ est orthogonale au plan $(BDG)$, puis donne une équation cartésienne de ce plan.",
            indice: "$\\overrightarrow{BD}$ et $\\overrightarrow{BG}$ ne sont pas colinéaires. Le plan a une équation $x + y - z + d = 0$.",
            corrige: "$\\overrightarrow{EC}$ est orthogonal à deux vecteurs non colinéaires du plan $(BDG)$ : c'est un vecteur normal, et $(EC)$ est orthogonale au plan. Une équation est $x + y - z + d = 0$ ; avec $B$ : $1 + d = 0$, donc $(BDG) : x + y - z - 1 = 0$. On vérifie que $D$ et $G$ conviennent."
          },
          {
            n: "3.", points: 1.5,
            texte: "La droite $(EC)$ coupe le plan $(BDG)$ en $K$. Calcule les coordonnées de $K$.",
            indice: "$(EC)$ : $x = t$, $y = t$, $z = 1 - t$. Remplace dans l'équation du plan.",
            corrige: "$t + t - (1 - t) - 1 = 0$, soit $3t - 2 = 0$ et $t = \\dfrac{2}{3}$. Donc $K\\left(\\dfrac{2}{3}\\,;\\dfrac{2}{3}\\,;\\dfrac{1}{3}\\right)$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Le centre de gravité du triangle $BDG$ est le point dont les coordonnées sont les moyennes de celles de $B$, $D$ et $G$. Montre que c'est le point $K$.",
            indice: "Fais la moyenne des abscisses, puis des ordonnées, puis des cotes.",
            corrige: "Les moyennes valent $\\dfrac{1 + 0 + 1}{3} = \\dfrac{2}{3}$, $\\dfrac{0 + 1 + 1}{3} = \\dfrac{2}{3}$ et $\\dfrac{0 + 0 + 1}{3} = \\dfrac{1}{3}$ : c'est bien $K$. La diagonale $(EC)$ traverse le triangle $BDG$ en son centre de gravité, à angle droit."
          },
          {
            n: "5.", points: 1,
            texte: "Calcule la distance du point $E$ au plan $(BDG)$.",
            indice: "$K$ est le projeté orthogonal de $E$ sur le plan : la distance vaut $EK$.",
            corrige: "$\\overrightarrow{EK} = \\dfrac{2}{3}\\overrightarrow{EC}$ et $EC = \\sqrt{1 + 1 + 1} = \\sqrt{3}$, donc $EK = \\dfrac{2\\sqrt{3}}{3}$. C'est la distance de $E$ au plan $(BDG)$."
          }
        ]
      },
      {
        titre: "Plans, droites et programme",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Dans un repère orthonormé, on considère les plans $\\mathcal{P} : 2x - y + 2z - 3 = 0$ et $\\mathcal{Q} : x + y - z + 1 = 0$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Les plans $\\mathcal{P}$ et $\\mathcal{Q}$ sont-ils parallèles ? perpendiculaires ?",
            indice: "Lis un vecteur normal dans chaque équation, puis compare-les.",
            corrige: "$\\vec{n}_1(2\\,;-1\\,;2)$ et $\\vec{n}_2(1\\,;1\\,;-1)$ ne sont pas colinéaires : les plans ne sont pas parallèles, ils sont sécants. Et $\\vec{n}_1 \\cdot \\vec{n}_2 = 2 - 1 - 2 = -1 \\neq 0$ : ils ne sont pas perpendiculaires."
          },
          {
            n: "2.", points: 1.5,
            texte: "La droite $d$ a pour représentation paramétrique $x = 3 + t$, $y = 1 + 2t$, $z = -1$ ($t \\in \\mathbb{R}$). Quelle est sa position par rapport au plan $\\mathcal{P}$ ?",
            indice: "Compare son vecteur directeur à $\\vec{n}_1$, puis regarde si un point de $d$ est dans $\\mathcal{P}$.",
            corrige: "$d$ est dirigée par $\\vec{u}(1\\,;2\\,;0)$ et $\\vec{u} \\cdot \\vec{n}_1 = 2 - 2 + 0 = 0$ : $d$ est parallèle à $\\mathcal{P}$. Le point $(3\\,;1\\,;-1)$ de $d$ vérifie $6 - 1 - 2 - 3 = 0$ : il est dans $\\mathcal{P}$. La droite $d$ est donc **contenue** dans le plan $\\mathcal{P}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "La droite $d'$ a pour représentation paramétrique $x = t$, $y = 1 - t$, $z = 2t$ ($t \\in \\mathbb{R}$). Détermine son point d'intersection avec $\\mathcal{P}$.",
            indice: "Remplace dans $2x - y + 2z - 3 = 0$ et résous en $t$.",
            corrige: "$2t - (1 - t) + 4t - 3 = 0$, soit $7t - 4 = 0$ et $t = \\dfrac{4}{7}$. Le point d'intersection est $\\left(\\dfrac{4}{7}\\,;\\dfrac{3}{7}\\,;\\dfrac{8}{7}\\right)$."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Que renvoient $\\texttt{scal([2, -1, 2], [1, 1, -1])}$ et $\\texttt{norme([2, -1, 2])}$ ? Retrouve-t-on un résultat de la question 1 ?\n\n" +
              "```python\nfrom math import sqrt\n\ndef scal(u, v):\n    s = 0\n    for i in range(3):\n        s = s + u[i] * v[i]\n    return s\n\ndef norme(u):\n    return sqrt(scal(u, u))\n```",
            indice: "$\\texttt{scal}$ calcule le produit scalaire dans un repère orthonormé, et $\\texttt{norme}$ la norme.",
            corrige: "$\\texttt{scal}$ renvoie $2 - 1 - 2 = \\texttt{-1}$ : c'est $\\vec{n}_1 \\cdot \\vec{n}_2$, qui n'est pas nul, donc les plans ne sont pas perpendiculaires. $\\texttt{norme}$ renvoie $\\sqrt{4 + 1 + 4} = \\texttt{3.0}$."
          }
        ]
      }
    ]
  }
};
