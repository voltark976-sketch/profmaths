/*
  ENTRAÎNEMENT : Première spécialité — chapitre 14, Produit scalaire 2
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-produit-scalaire-2.
  Format : voir data/premiere/evaluation/second-degre-2.js. Sans calculatrice (épreuve anticipée) :
  angles remarquables, √3 ≈ 1,73 donné. Équations de cercle : chapitre 15.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-produit-scalaire-2"] = {
  revisions: {
    intro: "Le produit scalaire, suite : développer, la formule d'Al-Kashi, le cercle de diamètre $[AB]$ et la contraposée. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Symétrie et bilinéarité",
        texte:
          "- $\\vec{u} \\cdot \\vec{v} = \\vec{v} \\cdot \\vec{u}$ ;\n" +
          "- $\\vec{u} \\cdot (\\vec{v} + \\vec{w}) = \\vec{u} \\cdot \\vec{v} + \\vec{u} \\cdot \\vec{w}$ ;\n" +
          "- $(k\\vec{u}) \\cdot \\vec{v} = k(\\vec{u} \\cdot \\vec{v})$.\n\n" +
          "On développe comme avec des nombres, et $\\vec{u} \\cdot \\vec{u} = \\|\\vec{u}\\|^2$."
      },
      {
        titre: "Identités remarquables",
        texte:
          "- $\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$ ;\n" +
          "- $\\|\\vec{u} - \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 - 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$ ;\n" +
          "- $(\\vec{u} + \\vec{v}) \\cdot (\\vec{u} - \\vec{v}) = \\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2$."
      },
      {
        titre: "Avec les normes",
        texte: "La première identité donne $\\vec{u} \\cdot \\vec{v} = \\dfrac{1}{2}\\left(\\|\\vec{u} + \\vec{v}\\|^2 - \\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2\\right)$ : trois longueurs suffisent pour calculer un produit scalaire."
      },
      {
        titre: "Formule d'Al-Kashi",
        texte:
          "Dans un triangle $ABC$, avec $a = BC$, $b = AC$ et $c = AB$ :\n\n" +
          "$a^2 = b^2 + c^2 - 2bc \\cos \\widehat{A}$.\n\n" +
          "Si $\\widehat{A} = 90°$, on retrouve Pythagore. $a$ est le côté **opposé** à l'angle $\\widehat{A}$."
      },
      {
        titre: "Calculer un angle",
        texte: "Les trois côtés connus, on isole le cosinus : $\\cos \\widehat{A} = \\dfrac{b^2 + c^2 - a^2}{2bc}$, puis on reconnaît une valeur remarquable (ou on utilise la calculatrice en mode degrés)."
      },
      {
        titre: "Cercle de diamètre $[AB]$",
        texte:
          "Avec $I$ milieu de $[AB]$ : $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = MI^2 - \\dfrac{AB^2}{4}$.\n\n" +
          "Donc $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = 0$ si et seulement si $M$ est sur le cercle de diamètre $[AB]$, de centre $I$ et de rayon $\\dfrac{AB}{2}$."
      },
      {
        titre: "Contraposée",
        texte: "La contraposée de « si P, alors Q » est « si non Q, alors non P » : elle lui est toujours équivalente. La **réciproque** « si Q, alors P » peut être fausse. Exemple : si $BC^2 \\neq AB^2 + AC^2$, alors $ABC$ n'est pas rectangle en $A$."
      }
    ],
    pieges: [
      "Écrire $\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2$ en oubliant $2\\,\\vec{u} \\cdot \\vec{v}$.",
      "Utiliser Pythagore dans un triangle qui n'est pas rectangle : il faut Al-Kashi.",
      "Se tromper de côté : dans Al-Kashi, $a$ est le côté opposé à l'angle $\\widehat{A}$.",
      "Oublier de diviser par $2bc$ en isolant $\\cos \\widehat{A}$.",
      "Confondre la contraposée (« si non Q, alors non P ») avec la réciproque (« si Q, alors P »).",
      "Prendre le rayon égal à $AB$ au lieu de $\\dfrac{AB}{2}$ pour le cercle de diamètre $[AB]$."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "La parcelle triangulaire",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Une parcelle de manioc à Combani a la forme d'un triangle $ABC$ avec $AB = 8$ m, $AC = 5$ m et $\\widehat{BAC} = 60°$. On donne $\\sqrt{3} \\approx 1{,}73$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule la longueur $BC$.",
            indice: "Al-Kashi pour l'angle en $A$ : $BC^2 = b^2 + c^2 - 2bc \\cos \\widehat{A}$, avec $b = AC = 5$, $c = AB = 8$ et $\\cos 60° = \\dfrac{1}{2}$.",
            corrige: "$BC^2 = 64 + 25 - 2 \\times 8 \\times 5 \\times \\dfrac{1}{2} = 89 - 40 = 49$, donc $BC = 7$ m."
          },
          {
            n: "2.", points: 1.5,
            texte: "Montre que $\\cos \\widehat{ABC} = \\dfrac{11}{14}$.",
            indice: "Écris Al-Kashi pour l'angle en $B$ : le côté opposé à $\\widehat{B}$ est $[AC]$, et les deux autres côtés mesurent $BA = 8$ et $BC = 7$. Isole ensuite $\\cos \\widehat{B}$.",
            corrige: "$25 = 64 + 49 - 2 \\times 8 \\times 7 \\times \\cos \\widehat{B}$, donc $112 \\cos \\widehat{B} = 88$ et $\\cos \\widehat{B} = \\dfrac{88}{112} = \\dfrac{11}{14}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Soit $H$ le pied de la hauteur issue de $C$. Calcule $CH$, puis l'aire de la parcelle.",
            indice: "Dans le triangle $ACH$ rectangle en $H$ : $CH = AC \\times \\sin \\widehat{A}$, avec $\\sin 60° = \\dfrac{\\sqrt{3}}{2}$.",
            corrige: "$CH = 5 \\times \\dfrac{\\sqrt{3}}{2} = \\dfrac{5\\sqrt{3}}{2}$ m. L'aire vaut $\\dfrac{AB \\times CH}{2} = \\dfrac{1}{2} \\times 8 \\times \\dfrac{5\\sqrt{3}}{2} = 10\\sqrt{3}$ m², soit environ $17{,}3$ m²."
          },
          {
            n: "4.", points: 1.5,
            texte: "Le triangle $ABC$ est-il rectangle ? Justifie avec la contraposée du théorème de Pythagore.",
            indice: "Si le triangle était rectangle, l'angle droit serait opposé au plus grand côté, $[AB]$.",
            corrige: "Le plus grand côté est $[AB]$ : $AB^2 = 64$ alors que $AC^2 + BC^2 = 25 + 49 = 74$. Comme $AB^2 \\neq AC^2 + BC^2$, par contraposée du théorème de Pythagore, le triangle n'est pas rectangle en $C$ ; et il ne peut l'être ailleurs, l'hypoténuse étant le plus grand côté."
          },
          {
            n: "5.", points: 1,
            texte: "Calcule $\\overrightarrow{AB} \\cdot \\overrightarrow{AC}$.",
            indice: "Définition avec le cosinus.",
            corrige: "$\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = AB \\times AC \\times \\cos 60° = 8 \\times 5 \\times \\dfrac{1}{2} = 20$."
          }
        ]
      },
      {
        titre: "Le cercle de diamètre $[AB]$",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans un repère orthonormé, on considère $A(-1\\,;0)$ et $B(3\\,;2)$. On note $\\mathcal{C}$ le cercle de diamètre $[AB]$ et $I$ le milieu de $[AB]$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Donne les coordonnées de $I$, puis le rayon de $\\mathcal{C}$.",
            indice: "Le rayon vaut $\\dfrac{AB}{2}$, avec $AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$.",
            corrige: "$I(1\\,;1)$. $AB = \\sqrt{16 + 4} = \\sqrt{20} = 2\\sqrt{5}$, donc le rayon vaut $\\sqrt{5}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Le point $M(0\\,;3)$ appartient-il à $\\mathcal{C}$ ? Réponds avec un produit scalaire.",
            indice: "$M$ est sur le cercle de diamètre $[AB]$ si et seulement si $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = 0$.",
            corrige: "$\\overrightarrow{MA}\\begin{pmatrix} -1 \\\\ -3 \\end{pmatrix}$ et $\\overrightarrow{MB}\\begin{pmatrix} 3 \\\\ -1 \\end{pmatrix}$, donc $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = -3 + 3 = 0$ : **oui**, $M \\in \\mathcal{C}$. Vérification : $MI = \\sqrt{1 + 4} = \\sqrt{5}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Montre que, pour tout point $N(x\\,;y)$, $\\overrightarrow{NA} \\cdot \\overrightarrow{NB} = x^2 + y^2 - 2x - 2y - 3$.",
            indice: "$\\overrightarrow{NA}$ a pour coordonnées $(-1 - x\\,;-y)$ et $\\overrightarrow{NB}$ $(3 - x\\,;2 - y)$.",
            corrige: "$\\overrightarrow{NA} \\cdot \\overrightarrow{NB}$ est la somme de $(-1 - x)(3 - x)$ et de $(-y)(2 - y)$. Or $(-1 - x)(3 - x) = x^2 - 2x - 3$ et $(-y)(2 - y) = y^2 - 2y$, d'où $x^2 + y^2 - 2x - 2y - 3$."
          },
          {
            n: "4.", points: 1.5,
            texte: "L'origine $O(0\\,;0)$ est-elle sur $\\mathcal{C}$ ? À l'intérieur ou à l'extérieur du disque ?",
            indice: "Calcule $\\overrightarrow{OA} \\cdot \\overrightarrow{OB}$ avec la question 3, puis utilise $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = MI^2 - \\dfrac{AB^2}{4}$.",
            corrige: "Avec $x = y = 0$ : $\\overrightarrow{OA} \\cdot \\overrightarrow{OB} = -3 \\neq 0$, donc $O \\notin \\mathcal{C}$. De plus $-3 = OI^2 - \\dfrac{20}{4}$, donc $OI^2 = 2 < 5$ : $O$ est à l'intérieur du disque."
          },
          {
            n: "5.", points: 1.5,
            texte: "Trouve les points d'intersection de $\\mathcal{C}$ avec l'axe des abscisses.",
            indice: "Sur l'axe des abscisses, $y = 0$ : résous $x^2 - 2x - 3 = 0$ (une racine est évidente).",
            corrige: "Avec $y = 0$ : $x^2 - 2x - 3 = 0 \\iff (x - 3)(x + 1) = 0 \\iff x = 3$ ou $x = -1$. Les points sont $(3\\,;0)$ et $(-1\\,;0)$, qui est le point $A$ lui-même. Au point $(3\\,;0)$, l'angle sous lequel on voit $[AB]$ est droit."
          }
        ]
      },
      {
        titre: "Identités et logique",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Dans les questions 1 à 3, $\\vec{u}$ et $\\vec{v}$ sont deux vecteurs tels que $\\|\\vec{u}\\| = 3$, $\\|\\vec{v}\\| = 4$ et $\\|\\vec{u} + \\vec{v}\\| = 6$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $\\vec{u} \\cdot \\vec{v}$.",
            indice: "$\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$.",
            corrige: "$36 = 9 + 2\\,\\vec{u} \\cdot \\vec{v} + 16$, donc $2\\,\\vec{u} \\cdot \\vec{v} = 11$ et $\\vec{u} \\cdot \\vec{v} = 5{,}5$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $\\|\\vec{u} - \\vec{v}\\|$.",
            indice: "$\\|\\vec{u} - \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 - 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$.",
            corrige: "$\\|\\vec{u} - \\vec{v}\\|^2 = 9 - 11 + 16 = 14$, donc $\\|\\vec{u} - \\vec{v}\\| = \\sqrt{14}$."
          },
          {
            n: "3.", points: 1,
            texte: "Calcule $(\\vec{u} + \\vec{v}) \\cdot (\\vec{u} - \\vec{v})$.",
            indice: "Troisième identité remarquable.",
            corrige: "$(\\vec{u} + \\vec{v}) \\cdot (\\vec{u} - \\vec{v}) = \\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2 = 9 - 16 = -7$."
          },
          {
            n: "4.", points: 1,
            texte: "Un triangle a des côtés de $5$, $6$ et $8$ cm. Est-il rectangle ? Justifie en citant la contraposée utilisée.",
            indice: "Contraposée de Pythagore : si le carré du plus grand côté n'est pas la somme des carrés des deux autres, le triangle n'est pas rectangle.",
            corrige: "$8^2 = 64$ et $5^2 + 6^2 = 61$. Comme $64 \\neq 61$, par la contraposée du théorème de Pythagore (« si le triangle est rectangle, alors le carré de l'hypoténuse est la somme des carrés des deux autres côtés »), le triangle n'est pas rectangle."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « la contraposée de “si $n$ est pair, alors $n^2$ est pair” est “si $n^2$ est pair, alors $n$ est pair” ». Justifie.",
            indice: "Contraposée : « si non Q, alors non P ». Réciproque : « si Q, alors P ».",
            corrige: "**Faux.** Cette phrase est la **réciproque**. La contraposée est « si $n^2$ est impair, alors $n$ est impair »."
          }
        ]
      }
    ]
  }
};
