/*
  ENTRAÎNEMENT : Première technologique — chapitre 12, Probabilités conditionnelles et indépendance
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre techno-probabilites-conditionnelles.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["techno-probabilites-conditionnelles"] = {
  revisions: {
    intro: "Les probabilités conditionnelles en un coup d'œil : tableau croisé, formule $P_A(B)$, arbre pondéré, probabilités totales et indépendance. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Sachant que…",
        texte: "$P_A(B)$ est la probabilité de $B$ quand on sait que $A$ est réalisé : on se restreint aux individus de $A$. Avec un tableau croisé, $P_A(B) = \\dfrac{\\text{effectif de } A \\cap B}{\\text{effectif de } A}$."
      },
      {
        titre: "La formule",
        texte: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$, donc $P(A \\cap B) = P(A) \\times P_A(B)$. Attention : $P_A(B)$ et $P_B(A)$ sont en général différents."
      },
      {
        titre: "Arbre pondéré",
        texte:
          "- au premier niveau, $P(A)$ et $P(\\overline{A})$ ; au second, des probabilités conditionnelles ;\n" +
          "- les branches issues d'un même nœud ont une somme égale à $1$ ;\n" +
          "- la probabilité d'un chemin est le **produit** des probabilités de ses branches."
      },
      {
        titre: "Probabilités totales",
        texte: "On additionne les chemins qui mènent à $B$ : $P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$."
      },
      {
        titre: "Indépendance",
        texte: "$B$ est indépendant de $A$ si $P_A(B) = P(B)$ : savoir que $A$ est réalisé ne change rien pour $B$. Cela revient à $P(A \\cap B) = P(A) \\times P(B)$."
      }
    ],
    pieges: [
      "Confondre $P_A(B)$ et $P_B(A)$ : l'événement qu'on sait réalisé se met en indice.",
      "Diviser par l'effectif total pour une probabilité conditionnelle.",
      "Additionner le long d'un chemin au lieu de multiplier.",
      "Oublier un chemin dans la formule des probabilités totales.",
      "Écrire $P(A \\cap B) = P(A) \\times P(B)$ sans savoir que les événements sont indépendants.",
      "Confondre indépendants et incompatibles."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Venir au lycée",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans un lycée de $500$ élèves de série technologique, on a relevé la série de chaque élève et son moyen de transport (données fictives). On choisit un élève au hasard. On note $S$ l'événement « l'élève est en STMG » et $B$ l'événement « l'élève vient en bus ».",
        tableau: { lignes: [["", "\\text{Bus}", "\\text{Autre}", "\\text{Total}"], ["\\text{STMG}", "180", "120", "300"], ["\\text{STI2D}", "100", "100", "200"], ["\\text{Total}", "280", "220", "500"]] },
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $P(S)$, $P(B)$ et $P(S \\cap B)$.",
            indice: "Divise chaque effectif par $500$.",
            corrige: "$P(S) = \\dfrac{300}{500} = 0{,}6$, $P(B) = \\dfrac{280}{500} = 0{,}56$ et $P(S \\cap B) = \\dfrac{180}{500} = 0{,}36$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $P_S(B)$, puis $P_B(S)$ sous forme de fraction irréductible. Traduis chaque résultat par une phrase.",
            indice: "Pour $P_S(B)$, on se restreint aux $300$ élèves de STMG ; pour $P_B(S)$, aux $280$ élèves qui viennent en bus.",
            corrige: "$P_S(B) = \\dfrac{180}{300} = 0{,}6$ : $60\\,\\%$ des élèves de STMG viennent en bus.\n\n$P_B(S) = \\dfrac{180}{280} = \\dfrac{9}{14}$ : parmi les élèves qui viennent en bus, $9$ sur $14$ sont en STMG."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule $P_{\\overline{S}}(B)$ et compare-la à $P_S(B)$.",
            indice: "$\\overline{S}$ : l'élève est en STI2D.",
            corrige: "$P_{\\overline{S}}(B) = \\dfrac{100}{200} = 0{,}5$ : la moitié des élèves de STI2D viennent en bus, contre $60\\,\\%$ des élèves de STMG."
          },
          {
            n: "4.", points: 1.5,
            texte: "Les événements $S$ et $B$ sont-ils indépendants ? Justifie de deux façons.",
            indice: "Compare $P_S(B)$ et $P(B)$, puis $P(S) \\times P(B)$ et $P(S \\cap B)$.",
            corrige: "$P_S(B) = 0{,}6$, alors que $P(B) = 0{,}56$ : savoir que l'élève est en STMG change la probabilité qu'il vienne en bus.\n\nDe même, $P(S) \\times P(B) = 0{,}6 \\times 0{,}56 = 0{,}336$, différent de $P(S \\cap B) = 0{,}36$. Les événements ne sont pas indépendants."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « $P_S(B) = P_B(S)$ ». Justifie.",
            indice: "Compare les deux résultats de la question 2.",
            corrige: "**Faux.** $P_S(B) = 0{,}6$, alors que $P_B(S) = \\dfrac{9}{14}$, qui n'est pas égal à $0{,}6$ (car $0{,}6 \\times 14 = 8{,}4$, et non $9$) : on ne divise pas par le même effectif."
          }
        ]
      },
      {
        titre: "Des téléphones reconditionnés",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Un magasin vend des téléphones : $70\\,\\%$ sont reconditionnés et les autres sont neufs. La première année, $5\\,\\%$ des téléphones reconditionnés et $2\\,\\%$ des téléphones neufs tombent en panne. On choisit au hasard un téléphone vendu. On note $R$ l'événement « il est reconditionné » et $D$ l'événement « il tombe en panne la première année ».",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Représente la situation par un arbre pondéré.",
            indice: "Au premier niveau : $R$ et $\\overline{R}$. Au second : $D$ et $\\overline{D}$ après chacun.",
            corrige: "$P(R) = 0{,}7$ et $P(\\overline{R}) = 0{,}3$ ; $P_R(D) = 0{,}05$, $P_R(\\overline{D}) = 0{,}95$ ; $P_{\\overline{R}}(D) = 0{,}02$ et $P_{\\overline{R}}(\\overline{D}) = 0{,}98$.",
            figureCorrige: (o) => o.arbreProba(["R", "~R", "D", "~D"], ["0,7", "0,3", "0,05", "0,95", "0,02", "0,98"], "Arbre pondéré : R 0,7 et non R 0,3 ; après R : D 0,05 et non D 0,95 ; après non R : D 0,02 et non D 0,98")
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $P(R \\cap D)$ et interprète ce nombre.",
            indice: "Multiplie les probabilités le long du chemin $R$ puis $D$.",
            corrige: "$P(R \\cap D) = 0{,}7 \\times 0{,}05 = 0{,}035$ : $3{,}5\\,\\%$ des téléphones vendus sont reconditionnés et tombent en panne la première année."
          },
          {
            n: "3.", points: 1.5,
            texte: "Démontre que $P(D) = 0{,}041$.",
            indice: "Deux chemins mènent à $D$ : formule des probabilités totales.",
            corrige: "$P(\\overline{R} \\cap D) = 0{,}3 \\times 0{,}02 = 0{,}006$. Donc $P(D) = P(R \\cap D) + P(\\overline{R} \\cap D) = 0{,}035 + 0{,}006 = 0{,}041$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Un téléphone vendu est tombé en panne. Calcule la probabilité qu'il soit reconditionné, sous forme de fraction. Est-elle supérieure à $0{,}8$ ?",
            indice: "$P_D(R) = \\dfrac{P(R \\cap D)}{P(D)}$.",
            corrige: "$P_D(R) = \\dfrac{0{,}035}{0{,}041} = \\dfrac{35}{41}$. Comme $0{,}8 \\times 41 = 32{,}8 < 35$, cette probabilité est supérieure à $0{,}8$ : plus de $80\\,\\%$ des téléphones en panne sont reconditionnés."
          },
          {
            n: "5.", points: 1,
            texte: "Le vendeur affirme : « Un téléphone reconditionné a $2{,}5$ fois plus de risques de tomber en panne qu'un neuf. » Vrai ou faux ? Justifie.",
            indice: "Compare $P_R(D)$ et $P_{\\overline{R}}(D)$.",
            corrige: "**Vrai.** $P_R(D) = 0{,}05$ et $P_{\\overline{R}}(D) = 0{,}02$, et $0{,}05 = 2{,}5 \\times 0{,}02$."
          }
        ]
      },
      {
        titre: "Un dé et l'indépendance",
        duree: 25, points: 6, calculatrice: false,
        contexte: "On lance un dé équilibré à six faces. On note $A$ l'événement « le résultat est pair », $B$ l'événement « le résultat est un multiple de $3$ » et $C$ l'événement « le résultat est au moins égal à $4$ ».",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $P(A)$, $P(B)$ et $P(A \\cap B)$. Les événements $A$ et $B$ sont-ils indépendants ?",
            indice: "$A = \\{2\\,;4\\,;6\\}$ et $B = \\{3\\,;6\\}$.",
            corrige: "$P(A) = \\dfrac{3}{6} = \\dfrac{1}{2}$, $P(B) = \\dfrac{2}{6} = \\dfrac{1}{3}$ et $A \\cap B = \\{6\\}$, donc $P(A \\cap B) = \\dfrac{1}{6}$.\n\nComme $P(A) \\times P(B) = \\dfrac{1}{2} \\times \\dfrac{1}{3} = \\dfrac{1}{6} = P(A \\cap B)$, $A$ et $B$ sont indépendants."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $P_C(A)$ sous forme de fraction. Les événements $A$ et $C$ sont-ils indépendants ? Interprète.",
            indice: "$C = \\{4\\,;5\\,;6\\}$ : parmi ces trois résultats, combien sont pairs ?",
            corrige: "Parmi $4$, $5$ et $6$, deux résultats sont pairs : $P_C(A) = \\dfrac{2}{3}$. Comme $\\dfrac{2}{3} \\neq \\dfrac{1}{2} = P(A)$, $A$ et $C$ ne sont pas indépendants : savoir que le résultat vaut au moins $4$ rend « pair » plus probable."
          },
          {
            n: "3.", points: 1.5,
            texte: "On note $D$ l'événement « obtenir $1$ ». Les événements $A$ et $D$ sont-ils incompatibles ? Sont-ils indépendants ?",
            indice: "Incompatibles : $A \\cap D = \\varnothing$. Indépendants : compare $P_D(A)$ et $P(A)$.",
            corrige: "$1$ n'est pas pair : $A \\cap D = \\varnothing$, les événements sont incompatibles. Mais ils ne sont pas indépendants : $P_D(A) = 0$, alors que $P(A) = \\dfrac{1}{2}$. Si on sait que $D$ est réalisé, $A$ devient impossible."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Que calcule ce programme ? Quelle valeur affiche-t-il environ ?\n\n" +
              "```python\nfrom random import randint\n\nnC = 0\nnAC = 0\nfor k in range(6000):\n    d = randint(1, 6)\n    if d >= 4:\n        nC = nC + 1\n        if d % 2 == 0:\n            nAC = nAC + 1\nprint(nAC / nC)\n```",
            indice: "$\\texttt{nC}$ compte les lancers où $C$ est réalisé ; $\\texttt{nAC}$ ceux où $A$ et $C$ le sont.",
            corrige: "Le programme simule $6\\,000$ lancers. $\\texttt{nC}$ compte les résultats au moins égaux à $4$, et $\\texttt{nAC}$ ceux qui sont de plus pairs. Il affiche la fréquence de « pair » parmi les résultats au moins égaux à $4$ : une estimation de $P_C(A)$, proche de $\\dfrac{2}{3} \\approx 0{,}67$."
          }
        ]
      }
    ]
  }
};
