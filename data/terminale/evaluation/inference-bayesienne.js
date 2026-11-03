/*
  ENTRAÎNEMENT : Terminale maths complémentaires — chapitre 5, Probabilités conditionnelles et inférence bayésienne
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-inference-bayesienne.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths complémentaires.
  Contextes différents du dépistage de la dengue du cours. Données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-inference-bayesienne"] = {
  revisions: {
    intro: "L'inférence bayésienne en un coup d'œil : probabilités totales, formule de Bayes, a priori et a posteriori, sensibilité, spécificité et valeurs prédictives. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Probabilités totales",
        texte: "$P(B) = P(A)P_A(B) + P(\\overline{A})P_{\\overline{A}}(B)$ : on additionne les chemins de l'arbre qui mènent à $B$. Avec plus de deux branches au premier niveau, on additionne tous les chemins."
      },
      {
        titre: "Formule de Bayes",
        texte: "Pour remonter l'arbre : $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{P(A)P_A(B)}{P(B)}$, où $P(B)$ vient des probabilités totales."
      },
      {
        titre: "A priori, a posteriori",
        texte: "$P(A)$ est la probabilité **a priori**, avant l'observation ; $P_B(A)$ est la probabilité **a posteriori**, après avoir appris que $B$ est réalisé. Une deuxième observation part de la probabilité a posteriori comme nouvel a priori."
      },
      {
        titre: "Vocabulaire des tests",
        texte: "Sensibilité $P_M(T)$ ; spécificité $P_{\\overline{M}}(\\overline{T})$ ; valeur prédictive positive $P_T(M)$ ; valeur prédictive négative $P_{\\overline{T}}(\\overline{M})$."
      },
      {
        titre: "Rôle de la prévalence",
        texte: "Avec une sensibilité $s$ et une spécificité $e$ : $P_T(M) = \\dfrac{sp}{sp + (1 - e)(1 - p)}$. Pour une maladie rare, même un bon test donne beaucoup de faux positifs."
      },
      {
        titre: "$P_A(B)$ et $P_B(A)$",
        texte: "Ce sont en général deux nombres différents, comme une implication et sa réciproque. On repère la population de référence : celle qui suit « parmi » ou « sachant »."
      }
    ],
    pieges: [
      "Confondre $P_M(T)$, la sensibilité, et $P_T(M)$, la valeur prédictive positive.",
      "Croire qu'un test très sensible rend un résultat positif presque sûr, même pour une maladie rare.",
      "Diviser par $P(A)$ au lieu de $P(B)$ dans la formule de Bayes.",
      "Oublier une branche dans la formule des probabilités totales.",
      "Confondre spécificité et valeur prédictive négative."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "La machine qui trie les mangues",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Une coopérative trie ses mangues avec une machine optique. $8\\,\\%$ des mangues sont abîmées. La machine rejette $95\\,\\%$ des mangues abîmées, mais aussi $4\\,\\%$ des mangues saines (données fictives). On choisit une mangue au hasard ; on note $A$ : « elle est abîmée » et $R$ : « la machine la rejette ». Les résultats seront arrondis au millième.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Construis un arbre pondéré, puis calcule $P(A \\cap R)$ et $P(\\overline{A} \\cap R)$.",
            indice: "On multiplie les probabilités le long de chaque chemin.",
            corrige: "$P(A \\cap R) = 0{,}08 \\times 0{,}95 = 0{,}076$ et $P(\\overline{A} \\cap R) = 0{,}92 \\times 0{,}04 = 0{,}0368$.",
            figureCorrige: (o) => o.arbreProba(["A", "~A", "R", "~R"], ["0,08", "0,92", "0,95", "0,05", "0,04", "0,96"], "Arbre pondéré : A 0,08 et non A 0,92 ; après A : R 0,95 et non R 0,05 ; après non A : R 0,04 et non R 0,96")
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule la probabilité qu'une mangue soit rejetée.",
            indice: "Formule des probabilités totales.",
            corrige: "$P(R) = P(A \\cap R) + P(\\overline{A} \\cap R) = 0{,}076 + 0{,}0368 = 0{,}1128$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Une mangue est rejetée. Quelle est la probabilité qu'elle soit vraiment abîmée ? Interprète.",
            indice: "Formule de Bayes : $P_R(A) = \\dfrac{P(A \\cap R)}{P(R)}$.",
            corrige: "$P_R(A) = \\dfrac{0{,}076}{0{,}1128} \\approx 0{,}674$. Environ une mangue rejetée sur trois est en fait saine : la coopérative jette de bons fruits."
          },
          {
            n: "4.", points: 1.5,
            texte: "Une mangue est acceptée par la machine. Quelle est la probabilité qu'elle soit saine ?",
            indice: "On cherche $P_{\\overline{R}}(\\overline{A})$, avec $P(\\overline{R}) = 1 - P(R)$.",
            corrige: "$P(\\overline{A} \\cap \\overline{R}) = 0{,}92 \\times 0{,}96 = 0{,}8832$ et $P(\\overline{R}) = 1 - 0{,}1128 = 0{,}8872$. Donc $P_{\\overline{R}}(\\overline{A}) = \\dfrac{0{,}8832}{0{,}8872} \\approx 0{,}995$ : les mangues acceptées sont presque toutes saines."
          },
          {
            n: "5.", points: 1,
            texte: "Les mangues rejetées repassent dans la machine, qui fonctionne de façon indépendante. Une mangue est rejetée deux fois : quelle est la probabilité qu'elle soit abîmée ?",
            indice: "Nouvel a priori : la probabilité de la question 3.",
            corrige: "Avec l'a priori $P_R(A) \\approx 0{,}674$ : $\\dfrac{0{,}674 \\times 0{,}95}{0{,}674 \\times 0{,}95 + 0{,}326 \\times 0{,}04} \\approx 0{,}980$. Après deux rejets, la mangue est très probablement abîmée."
          }
        ]
      },
      {
        titre: "La valeur prédictive selon la proportion",
        duree: 25, points: 7, calculatrice: true,
        contexte: "On reprend la machine de l'exercice 1 (sensibilité $0{,}95$, spécificité $0{,}96$), mais la proportion $p$ de mangues abîmées varie selon les récoltes, avec $0 < p < 1$. On note $f(p)$ la probabilité qu'une mangue rejetée soit abîmée.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Démontre que $f(p) = \\dfrac{0{,}95p}{0{,}91p + 0{,}04}$.",
            indice: "$f(p) = \\dfrac{0{,}95p}{0{,}95p + 0{,}04(1 - p)}$.",
            corrige: "$P(A \\cap R) = 0{,}95p$ et $P(R) = 0{,}95p + 0{,}04(1 - p) = 0{,}91p + 0{,}04$. Donc $f(p) = \\dfrac{0{,}95p}{0{,}91p + 0{,}04}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $f(0{,}08)$ et $f(0{,}3)$, arrondis au millième. Commente.",
            indice: "Pour $p = 0{,}08$, on doit retrouver le résultat de l'exercice 1.",
            corrige: "$f(0{,}08) = \\dfrac{0{,}076}{0{,}1128} \\approx 0{,}674$ et $f(0{,}3) = \\dfrac{0{,}285}{0{,}313} \\approx 0{,}911$. Plus les mangues abîmées sont nombreuses, plus un rejet est fiable."
          },
          {
            n: "3.", points: 1.5,
            texte: "Démontre que $f'(p) = \\dfrac{0{,}038}{(0{,}91p + 0{,}04)^2}$ et déduis-en le sens de variation de $f$.",
            indice: "Dérivée d'un quotient $\\dfrac{u}{v}$ avec $u = 0{,}95p$ et $v = 0{,}91p + 0{,}04$.",
            corrige: "$u'v = 0{,}95(0{,}91p + 0{,}04)$ et $uv' = 0{,}95p \\times 0{,}91$, donc $u'v - uv' = 0{,}95 \\times 0{,}04 = 0{,}038$. Ainsi $f'(p) = \\dfrac{0{,}038}{(0{,}91p + 0{,}04)^2} > 0$ : $f$ est croissante."
          },
          {
            n: "4.", points: 1.5,
            texte: "Pour quelles proportions $p$ une mangue rejetée est-elle abîmée avec une probabilité d'au moins $0{,}9$ ?",
            indice: "Résous $0{,}95p \\geqslant 0{,}9(0{,}91p + 0{,}04)$, car $0{,}91p + 0{,}04 > 0$.",
            corrige: "$0{,}95p \\geqslant 0{,}819p + 0{,}036 \\iff 0{,}131p \\geqslant 0{,}036 \\iff p \\geqslant \\dfrac{0{,}036}{0{,}131} \\approx 0{,}275$. Il faut qu'au moins $27{,}5\\,\\%$ environ des mangues soient abîmées."
          },
          {
            n: "5.", points: 1,
            texte:
              "Que renvoie $\\texttt{vpp(0.5, 0.95, 0.96)}$ ? ($\\texttt{v}$ : vrais positifs, $\\texttt{f}$ : faux positifs.)\n\n" +
              "```python\ndef vpp(p, s, e):\n    v = p * s\n    f = (1 - p) * (1 - e)\n    return v / (v + f)\n```",
            indice: "C'est la formule de $f(p)$, avec une sensibilité $s$ et une spécificité $e$.",
            corrige: "$\\dfrac{0{,}5 \\times 0{,}95}{0{,}5 \\times 0{,}95 + 0{,}5 \\times 0{,}04} = \\dfrac{0{,}475}{0{,}495} \\approx 0{,}960$ : la fonction renvoie environ $\\texttt{0.96}$, c'est $f(0{,}5)$."
          }
        ]
      },
      {
        titre: "Trois usines",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Un magasin reçoit des ordinateurs de trois usines : $50\\,\\%$ de l'usine $U_1$, $30\\,\\%$ de $U_2$ et $20\\,\\%$ de $U_3$. Ils ont un défaut avec la probabilité $0{,}02$ pour $U_1$, $0{,}03$ pour $U_2$ et $0{,}05$ pour $U_3$ (données fictives). On choisit un ordinateur au hasard ; $D$ : « il a un défaut ».",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Construis un arbre pondéré et calcule $P(D)$.",
            indice: "Trois branches au premier niveau, puis deux branches depuis chaque usine.",
            corrige: "Les trois chemins qui mènent à $D$ donnent $0{,}5 \\times 0{,}02 = 0{,}01$, $0{,}3 \\times 0{,}03 = 0{,}009$ et $0{,}2 \\times 0{,}05 = 0{,}01$. Donc $P(D) = 0{,}01 + 0{,}009 + 0{,}01 = 0{,}029$.",
            figureCorrige: (o) => o.arbreProba(["U₁", "U₂", "U₃", "D", "~D"], ["0,5", "0,3", "0,2", "0,02", "0,98", "0,03", "0,97", "0,05", "0,95"], "Arbre pondéré : U1 0,5, U2 0,3, U3 0,2 ; défaut D avec 0,02 après U1, 0,03 après U2, 0,05 après U3")
          },
          {
            n: "2.", points: 1.5,
            texte: "Un ordinateur a un défaut. Quelle est la probabilité qu'il vienne de l'usine $U_3$ ? Arrondis au millième.",
            indice: "$P_D(U_3) = \\dfrac{P(U_3 \\cap D)}{P(D)}$.",
            corrige: "$P_D(U_3) = \\dfrac{0{,}01}{0{,}029} \\approx 0{,}345$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule aussi $P_D(U_1)$ et $P_D(U_2)$. Que remarques-tu ?",
            indice: "Les trois probabilités a posteriori ont une somme égale à $1$.",
            corrige: "$P_D(U_1) = \\dfrac{0{,}01}{0{,}029} \\approx 0{,}345$ et $P_D(U_2) = \\dfrac{0{,}009}{0{,}029} \\approx 0{,}310$ ; la somme fait bien $1$. L'usine $U_3$ ne fournit que $20\\,\\%$ des ordinateurs mais autant de défauts que $U_1$, qui en fournit $50\\,\\%$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Un vendeur affirme : « $5\\,\\%$ des ordinateurs défectueux viennent de l'usine $U_3$ ». Corrige son erreur.",
            indice: "$5\\,\\%$, c'est $P_{U_3}(D)$ ou $P_D(U_3)$ ?",
            corrige: "$5\\,\\%$ est $P_{U_3}(D)$ : parmi les ordinateurs de $U_3$, $5\\,\\%$ ont un défaut. La part des ordinateurs défectueux qui viennent de $U_3$ est $P_D(U_3) \\approx 34{,}5\\,\\%$. Le vendeur a confondu $P_{U_3}(D)$ et $P_D(U_3)$."
          }
        ]
      }
    ]
  }
};
