/*
  ENTRAÎNEMENT : Automatismes — Proportions et pourcentages
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre auto-proportions.
  Format : voir data/automatismes/evaluation/calcul-numerique.js (série d'automatismes, puis deux exercices en situation).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["auto-proportions"] = {
  revisions: {
    intro: "Les proportions en un coup d'œil : calculer une proportion, l'écrire de trois façons, retrouver la partie ou le tout, comparer. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Proportion",
        texte: "La proportion d'une partie $A$ dans un ensemble $E$ est $p = \\dfrac{n_A}{n_E}$ : un nombre entre $0$ et $1$. Par exemple, $6$ élèves sur $24$ : $p = \\dfrac{6}{24} = \\dfrac{1}{4}$."
      },
      {
        titre: "Trois écritures",
        texte: "Une proportion s'écrit en fraction, en décimal ou en pourcentage : $\\dfrac{3}{5} = 0{,}6 = 60\\,\\%$. Pour comparer deux proportions, on les écrit de la même façon."
      },
      {
        titre: "Retrouver la partie",
        texte: "$n_A = p \\times n_E$ : $20\\,\\%$ de $45$, c'est $0{,}2 \\times 45 = 9$. De tête : $10\\,\\%$, c'est diviser par $10$."
      },
      {
        titre: "Retrouver le tout",
        texte: "$n_E = \\dfrac{n_A}{p}$ : si $9$ élèves représentent $25\\,\\%$ d'un groupe, le groupe compte $\\dfrac{9}{0{,}25} = 36$ élèves."
      },
      {
        titre: "Proportion de proportion",
        texte: "Pour aller plus loin : si $40\\,\\%$ des élèves sont internes et si $25\\,\\%$ des internes viennent de Petite-Terre, alors $0{,}4 \\times 0{,}25 = 0{,}1$, soit $10\\,\\%$ des élèves."
      }
    ],
    pieges: [
      "Se tromper d'ensemble de référence : lis bien « parmi… ».",
      "$5\\,\\% = 0{,}05$ et non $0{,}5$.",
      "Pour retrouver le tout, on **divise** la partie par la proportion.",
      "Une proportion n'est jamais supérieure à $1$, ou à $100\\,\\%$.",
      "Comparer des proportions écrites de façons différentes : écris-les toutes en pourcentage.",
      "Faire la moyenne de deux pourcentages qui ne portent pas sur des effectifs égaux."
    ]
  },

  evaluation: {
    intro: "Une série d'automatismes comme dans la partie 1 de l'épreuve anticipée, puis deux exercices qui les mettent en situation, **sans calculatrice** (environ $55$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Automatismes",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Pour chaque question, écris seulement le résultat, sans justification.",
        questions: [
          { n: "1.", points: 0.5, texte: "Dans un groupe de $28$ élèves, $21$ ont un téléphone portable. Quelle est cette proportion, en écriture décimale ?", corrige: "$\\dfrac{21}{28} = \\dfrac{3}{4} = 0{,}75$." },
          { n: "2.", points: 0.5, texte: "Écris en pourcentage la proportion « $27$ sur $45$ ».", corrige: "$\\dfrac{27}{45} = \\dfrac{3}{5} = 60\\,\\%$." },
          { n: "3.", points: 0.5, texte: "Écris $\\dfrac{3}{20}$ en pourcentage.", corrige: "$\\dfrac{3}{20} = \\dfrac{15}{100} = 15\\,\\%$." },
          { n: "4.", points: 0.5, texte: "Écris $0{,}8\\,\\%$ en écriture décimale.", corrige: "$\\dfrac{0{,}8}{100} = 0{,}008$." },
          { n: "5.", points: 0.5, texte: "Calcule $30\\,\\%$ de $160$.", corrige: "$0{,}3 \\times 160 = 48$." },
          { n: "6.", points: 0.5, texte: "Calcule $15\\,\\%$ de $60$.", corrige: "$10\\,\\%$ de $60$ font $6$ et $5\\,\\%$ font $3$ : $9$." },
          { n: "7.", points: 0.5, texte: "$12$ élèves représentent $20\\,\\%$ d'un groupe. Combien d'élèves compte ce groupe ?", corrige: "$\\dfrac{12}{0{,}2} = 60$ élèves." },
          { n: "8.", points: 0.5, texte: "$14$ représente $28\\,\\%$ d'un nombre. Quel est ce nombre ?", corrige: "$\\dfrac{14}{0{,}28} = \\dfrac{1\\,400}{28} = 50$." },
          { n: "9.", points: 0.5, texte: "Range dans l'ordre croissant $\\dfrac{7}{25}$ et $30\\,\\%$.", corrige: "$\\dfrac{7}{25} = 28\\,\\%$, donc $\\dfrac{7}{25} < 30\\,\\%$." },
          { n: "10.", points: 0.5, texte: "Dans un club de $50$ membres, $40\\,\\%$ sont des garçons. Combien y a-t-il de filles ?", corrige: "$60\\,\\%$ de $50$, soit $30$ filles." },
          { n: "11.", points: 0.5, texte: "Combien d'élèves représente un tiers d'une classe de $27$ élèves ?", corrige: "$\\dfrac{27}{3} = 9$ élèves." },
          { n: "12.", points: 0.5, texte: "Les $\\dfrac{3}{8}$ des $800$ élèves d'un lycée sont demi-pensionnaires. Combien sont-ils ?", corrige: "$\\dfrac{800}{8} \\times 3 = 300$ élèves." }
        ]
      },
      {
        titre: "L'élection au conseil de la vie lycéenne",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Dans un lycée, $1\\,250$ élèves sont inscrits pour élire leurs représentants au conseil de la vie lycéenne (CVL). $60\\,\\%$ des inscrits ont voté.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Combien d'élèves ont voté ?",
            indice: "Calcule $60\\,\\%$ de $1\\,250$.",
            corrige: "$0{,}6 \\times 1\\,250 = 750$ élèves ont voté."
          },
          {
            n: "2.", points: 1.5,
            texte: "La liste A a obtenu $330$ voix. Quelle proportion des votants cela représente-t-il, en pourcentage ?",
            indice: "La proportion se calcule parmi les votants : $\\dfrac{330}{750}$.",
            corrige: "$\\dfrac{330}{750} = \\dfrac{44}{100} = 44\\,\\%$ des votants."
          },
          {
            n: "3.", points: 2,
            texte: "Quel pourcentage des **inscrits** a voté pour la liste A ? Peut-on dire que plus d'un quart des inscrits ont voté pour elle ?",
            indice: "Calcule $\\dfrac{330}{1\\,250}$, ou bien $0{,}6 \\times 0{,}44$.",
            corrige: "$\\dfrac{330}{1\\,250} = 0{,}264$ (c'est aussi $0{,}6 \\times 0{,}44$), soit $26{,}4\\,\\%$ des inscrits. Comme $26{,}4\\,\\% > 25\\,\\%$, oui : plus d'un quart des inscrits ont voté pour la liste A."
          },
          {
            n: "4.", points: 2,
            texte: "L'année précédente, la liste gagnante avait obtenu $391$ voix, soit $46\\,\\%$ des votants. Combien d'élèves avaient voté cette année-là ?",
            indice: "On connaît la partie et la proportion : on divise.",
            corrige: "$\\dfrac{391}{0{,}46} = \\dfrac{39\\,100}{46} = 850$ élèves avaient voté. Vérification : $0{,}46 \\times 850 = 391$."
          }
        ]
      },
      {
        titre: "Un cocktail de jus de fruits",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Pour une fête, on mélange $2$ L d'un jus A qui contient $20\\,\\%$ de jus de mangue et $3$ L d'un jus B qui en contient $10\\,\\%$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Quelle quantité de jus de mangue y a-t-il dans les $2$ L de jus A ? dans les $3$ L de jus B ?",
            indice: "$20\\,\\%$ de $2$ L, puis $10\\,\\%$ de $3$ L.",
            corrige: "Dans A : $0{,}2 \\times 2 = 0{,}4$ L. Dans B : $0{,}1 \\times 3 = 0{,}3$ L."
          },
          {
            n: "2.", points: 1.5,
            texte: "Quelle est la proportion de jus de mangue dans le mélange, en pourcentage ?",
            indice: "Le mélange contient $5$ L en tout.",
            corrige: "$\\dfrac{0{,}4 + 0{,}3}{5} = \\dfrac{0{,}7}{5} = 0{,}14$, soit $14\\,\\%$ de jus de mangue."
          },
          {
            n: "3.", points: 2,
            texte: "Un élève affirme : « la proportion dans le mélange est la moyenne des deux proportions, $15\\,\\%$ ». A-t-il raison ? Dans quel cas aurait-il raison ?",
            indice: "Compare avec la question 2. Que se passerait-il avec autant de jus A que de jus B ?",
            corrige: "Non : on trouve $14\\,\\%$, car il y a plus de jus B, le moins riche en mangue. Il aurait raison si l'on mélangeait des quantités égales des deux jus : par exemple, avec $2$ L de chaque, $\\dfrac{0{,}4 + 0{,}2}{4} = 15\\,\\%$."
          },
          {
            n: "4.", points: 2,
            texte: "Quelle quantité de jus de mangue pur faut-il ajouter au mélange pour que la proportion de mangue atteigne $20\\,\\%$ ? Donne la réponse en centilitres.",
            indice: "Avec $v$ litres ajoutés, résous $\\dfrac{0{,}7 + v}{5 + v} = 0{,}2$.",
            corrige: "Avec $v$ litres ajoutés : $\\dfrac{0{,}7 + v}{5 + v} = 0{,}2 \\iff 0{,}7 + v = 1 + 0{,}2v \\iff 0{,}8v = 0{,}3 \\iff v = 0{,}375$ L.\n\nIl faut ajouter $37{,}5$ cL de jus de mangue pur. Vérification : $\\dfrac{1{,}075}{5{,}375} = 0{,}2$."
          }
        ]
      }
    ]
  }
};
