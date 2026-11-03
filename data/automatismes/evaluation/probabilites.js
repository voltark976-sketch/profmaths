/*
  ENTRAÎNEMENT : Automatismes — Probabilités
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre auto-probabilites.
  Format : voir data/automatismes/evaluation/calcul-numerique.js (série d'automatismes, puis deux exercices en situation).
  Données fictives. Tableau croisé et arbre pondéré : partie « Première » du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["auto-probabilites"] = {
  revisions: {
    intro: "Les probabilités en un coup d'œil : règles de base, équiprobabilité, tableau croisé, probabilité conditionnelle et arbre pondéré. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Règles de base",
        texte: "Une probabilité est comprise entre $0$ et $1$, et la somme des probabilités de toutes les issues vaut $1$. Pour l'événement contraire : $P\\left(\\overline{A}\\right) = 1 - P(A)$."
      },
      {
        titre: "Équiprobabilité",
        texte: "Si toutes les issues ont la même probabilité : $P(A) = \\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre d'issues possibles}}$. Par exemple, la probabilité d'obtenir un nombre pair avec un dé équilibré vaut $\\dfrac{3}{6} = \\dfrac{1}{2}$."
      },
      {
        titre: "Tableau croisé",
        texte: "On choisit une personne au hasard : $P(A \\cap B)$ se calcule en divisant l'effectif de « $A$ et $B$ » par l'effectif **total**, et $P_A(B)$ en le divisant par l'effectif de $A$."
      },
      {
        titre: "Probabilité conditionnelle",
        texte: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$, donc $P(A \\cap B) = P(A) \\times P_A(B)$. En général, $P_A(B) \\neq P_B(A)$."
      },
      {
        titre: "Arbre pondéré",
        texte:
          "- les branches issues d'un même nœud ont pour somme $1$ ;\n" +
          "- le long d'un chemin, on multiplie les probabilités ;\n" +
          "- pour un événement atteint par plusieurs chemins, on additionne leurs probabilités."
      }
    ],
    pieges: [
      "Une probabilité ne peut valoir ni $1{,}2$ ni $-0{,}3$.",
      "$P\\left(\\overline{A}\\right) = 1 - P(A)$, et non $-P(A)$.",
      "$P_A(B)$ et $P_B(A)$ sont en général différents : regarde bien qui est en indice.",
      "Pour $P(A \\cap B)$ dans un tableau, on divise par l'effectif total ; pour $P_A(B)$, par l'effectif de $A$.",
      "Le long d'un chemin d'arbre, on multiplie ; entre deux chemins, on additionne.",
      "Oublier un chemin de l'arbre en calculant $P(B)$."
    ]
  },

  evaluation: {
    intro: "Une série d'automatismes comme dans la partie 1 de l'épreuve anticipée, puis deux exercices qui les mettent en situation, **sans calculatrice** (environ $55$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Automatismes",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Pour chaque question, écris seulement le résultat, sans justification. Les probabilités demandées en fraction sont à donner sous forme irréductible.",
        questions: [
          { n: "1.", points: 0.5, texte: "$P(A) = 0{,}46$. Que vaut $P\\left(\\overline{A}\\right)$ ?", corrige: "$1 - 0{,}46 = 0{,}54$." },
          { n: "2.", points: 0.5, texte: "Quatre issues ont pour probabilités $0{,}1$, $0{,}25$, $0{,}4$ et $p$. Que vaut $p$ ?", corrige: "$p = 1 - 0{,}75 = 0{,}25$." },
          { n: "3.", points: 0.5, texte: "Une urne contient $4$ boules rouges, $6$ bleues et $2$ vertes. On en tire une au hasard. Donne la probabilité, en fraction, de tirer une boule bleue.", corrige: "$\\dfrac{6}{12} = \\dfrac{1}{2}$." },
          { n: "4.", points: 0.5, texte: "On lance un dé équilibré à six faces. Donne la probabilité, en fraction, d'obtenir un multiple de $3$.", corrige: "Les issues $3$ et $6$ : $\\dfrac{2}{6} = \\dfrac{1}{3}$." },
          { n: "5.", points: 0.5, texte: "On tire une carte au hasard dans un jeu de $32$ cartes ($8$ cartes de chaque couleur). Donne la probabilité, en fraction, de tirer un cœur.", corrige: "$\\dfrac{8}{32} = \\dfrac{1}{4}$." },
          { n: "6.", points: 0.5, texte: "On lance deux pièces équilibrées. Donne la probabilité, en fraction, d'obtenir deux fois pile.", corrige: "Une issue sur quatre (PP, PF, FP, FF) : $\\dfrac{1}{4}$." },
          { n: "7.", points: 0.5, texte: "On choisit une lettre au hasard parmi les $9$ lettres du mot MAMOUDZOU. Donne la probabilité, en fraction, de choisir la lettre O.", corrige: "Il y a deux O : $\\dfrac{2}{9}$." },
          { n: "8.", points: 0.5, texte: "Sur $60$ élèves, $24$ sont internes, dont $15$ filles. On choisit un élève au hasard. Donne en fraction la probabilité qu'il soit une fille interne.", corrige: "$\\dfrac{15}{60} = \\dfrac{1}{4}$." },
          { n: "9.", points: 0.5, texte: "Même situation : on choisit un interne au hasard. Donne en fraction la probabilité que ce soit une fille.", corrige: "$P_I(F) = \\dfrac{15}{24} = \\dfrac{5}{8}$." },
          { n: "10.", points: 0.5, texte: "$P(A) = 0{,}6$ et $P_A(B) = 0{,}3$. Que vaut $P(A \\cap B)$ ?", corrige: "$0{,}6 \\times 0{,}3 = 0{,}18$." },
          { n: "11.", points: 0.5, texte: "$P(A \\cap B) = 0{,}12$ et $P(A) = 0{,}4$. Que vaut $P_A(B)$ ?", corrige: "$\\dfrac{0{,}12}{0{,}4} = 0{,}3$." },
          { n: "12.", points: 0.5, texte: "$P(A) = 0{,}3$, $P_A(B) = 0{,}6$ et $P_{\\overline{A}}(B) = 0{,}2$. Que vaut $P(B)$ ?", corrige: "$0{,}3 \\times 0{,}6 + 0{,}7 \\times 0{,}2 = 0{,}18 + 0{,}14 = 0{,}32$." }
        ]
      },
      {
        titre: "Une enquête sur le streaming",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Une enquête a interrogé $400$ personnes : $J$ désigne l'événement « avoir moins de $25$ ans » et $S$ « être abonné à un service de streaming ». Le tableau est incomplet (données fictives).",
        tableau: { lignes: [["", "S", "\\overline{S}", "\\text{Total}"], ["J", "120", "\\ldots", "160"], ["\\overline{J}", "90", "\\ldots", "\\ldots"], ["\\text{Total}", "\\ldots", "\\ldots", "400"]] },
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Complète le tableau.",
            indice: "Chaque total de ligne est la somme des deux cases de la ligne ; de même pour les colonnes.",
            corrige: "Ligne $J$ : $160 - 120 = 40$. Ligne $\\overline{J}$ : total $400 - 160 = 240$, donc $240 - 90 = 150$. Totaux des colonnes : $120 + 90 = 210$ et $40 + 150 = 190$.",
            tableauCorrige: { lignes: [["", "S", "\\overline{S}", "\\text{Total}"], ["J", "120", "40", "160"], ["\\overline{J}", "90", "150", "240"], ["\\text{Total}", "210", "190", "400"]] }
          },
          {
            n: "2.", points: 1.5,
            texte: "On choisit une personne au hasard parmi les $400$. Calcule $P(S)$ et $P(J \\cap S)$.",
            indice: "Dans les deux cas, on divise par l'effectif total.",
            corrige: "$P(S) = \\dfrac{210}{400} = 0{,}525$ et $P(J \\cap S) = \\dfrac{120}{400} = 0{,}3$."
          },
          {
            n: "3.", points: 2,
            texte: "Calcule $P_J(S)$, puis $P_S(J)$, en fraction irréductible. Traduis chacune par une phrase.",
            indice: "$P_J(S)$ : on se limite aux moins de $25$ ans. $P_S(J)$ : on se limite aux abonnés.",
            corrige: "$P_J(S) = \\dfrac{120}{160} = \\dfrac{3}{4}$ : parmi les moins de $25$ ans, trois sur quatre sont abonnés.\n\n$P_S(J) = \\dfrac{120}{210} = \\dfrac{4}{7}$ : parmi les abonnés, quatre sur sept ont moins de $25$ ans."
          },
          {
            n: "4.", points: 2,
            texte: "Un journal écrit : « La plupart des abonnés ont moins de $25$ ans. » Puis : « La plupart des personnes de $25$ ans ou plus sont abonnées. » Ces deux phrases sont-elles exactes ?",
            indice: "Compare $P_S(J)$ à $\\dfrac{1}{2}$, puis calcule $P_{\\overline{J}}(S)$.",
            corrige: "La première est exacte : $P_S(J) = \\dfrac{4}{7} > \\dfrac{1}{2}$.\n\nLa seconde est fausse : $P_{\\overline{J}}(S) = \\dfrac{90}{240} = \\dfrac{3}{8} < \\dfrac{1}{2}$ ; parmi les $25$ ans ou plus, une minorité est abonnée."
          }
        ]
      },
      {
        titre: "La pluie et le bus en retard",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Un matin de saison des pluies, il pleut avec la probabilité $0{,}4$. S'il pleut, le bus scolaire est en retard avec la probabilité $0{,}5$ ; s'il ne pleut pas, il est en retard avec la probabilité $0{,}1$. On note $P$ l'événement « il pleut » et $R$ l'événement « le bus est en retard » (données fictives).",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Représente la situation par un arbre pondéré.",
            indice: "Premier niveau : $P$ et $\\overline{P}$ ; second niveau : $R$ et $\\overline{R}$. Les branches issues d'un même nœud ont pour somme $1$.",
            corrige: "Premier niveau : $P(P) = 0{,}4$ et $P\\left(\\overline{P}\\right) = 0{,}6$. Second niveau : $P_P(R) = 0{,}5$, $P_P\\left(\\overline{R}\\right) = 0{,}5$, $P_{\\overline{P}}(R) = 0{,}1$ et $P_{\\overline{P}}\\left(\\overline{R}\\right) = 0{,}9$.",
            figureCorrige: (o) => o.arbreProba(["P", "~P", "R", "~R"], ["0,4", "0,6", "0,5", "0,5", "0,1", "0,9"], "Arbre pondéré : P 0,4 et non P 0,6 ; après P : R 0,5 et non R 0,5 ; après non P : R 0,1 et non R 0,9")
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule la probabilité qu'il pleuve et que le bus soit en retard.",
            indice: "On multiplie le long du chemin $P$, puis $R$.",
            corrige: "$P(P \\cap R) = 0{,}4 \\times 0{,}5 = 0{,}2$."
          },
          {
            n: "3.", points: 2,
            texte: "Calcule la probabilité que le bus soit en retard.",
            indice: "Deux chemins mènent à $R$ : additionne leurs probabilités.",
            corrige: "$P(R) = P(P \\cap R) + P\\left(\\overline{P} \\cap R\\right) = 0{,}4 \\times 0{,}5 + 0{,}6 \\times 0{,}1 = 0{,}2 + 0{,}06 = 0{,}26$."
          },
          {
            n: "4.", points: 2,
            texte: "Ce matin, le bus est en retard. Quelle est la probabilité qu'il ait plu ? Donne le résultat sous forme de fraction irréductible, puis une valeur arrondie au centième.",
            indice: "On cherche $P_R(P) = \\dfrac{P(P \\cap R)}{P(R)}$.",
            corrige: "$P_R(P) = \\dfrac{0{,}2}{0{,}26} = \\dfrac{20}{26} = \\dfrac{10}{13} \\approx 0{,}77$. Un retard rend la pluie beaucoup plus probable : on passe de $0{,}4$ à environ $0{,}77$."
          }
        ]
      }
    ]
  }
};
