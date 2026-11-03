/*
  ENTRAÎNEMENT : Seconde — chapitre 15, Probabilités conditionnelles et arbres pondérés
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-probabilites-conditionnelles.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle ou devoir commun de Seconde.
  Comme dans le cours : pas de formule des probabilités totales ; on inverse un conditionnement
  avec un tableau d'effectifs d'une population fictive. Données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["seconde-probabilites-conditionnelles"] = {
  revisions: {
    intro: "Les probabilités conditionnelles en un coup d'œil : la formule, l'arbre pondéré, le vocabulaire des tests et le tableau qui inverse un conditionnement. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Probabilité conditionnelle",
        texte: "Si $P(A) \\neq 0$ : $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$, la probabilité de $B$ sachant que $A$ est réalisé. On se restreint aux issues de $A$."
      },
      {
        titre: "Probabilité d'un « et »",
        texte: "De la formule, on tire $P(A \\cap B) = P(A) \\times P_A(B)$ : dans un arbre, on **multiplie** les probabilités le long du chemin."
      },
      {
        titre: "Arbre pondéré",
        texte: "Au premier niveau : $P(A)$ et $P(\\overline{A})$. Au second niveau : des probabilités **conditionnelles**, comme $P_A(B)$. Les branches qui partent d'un même nœud ont une somme égale à $1$."
      },
      {
        titre: "Tests de dépistage",
        texte: "Avec $M$ : « malade » et $T$ : « test positif » : la sensibilité est $P_M(T)$, la spécificité $P_{\\overline{M}}(\\overline{T})$. Un faux positif est une personne saine dont le test est positif."
      },
      {
        titre: "Inverser avec un tableau",
        texte: "Pour passer de $P_M(T)$ à $P_T(M)$, on imagine $10\\,000$ personnes et on remplit un tableau croisé avec l'arbre. Puis $P_T(M)$ est le nombre de malades positifs divisé par le total des positifs."
      },
      {
        titre: "$P_A(B)$ n'est pas $P_B(A)$",
        texte: "« Presque tous les malades ont un test positif » ne veut pas dire « presque tous les positifs sont malades » : c'est la différence entre une implication et sa réciproque."
      },
      {
        titre: "Simuler en Python",
        texte: "$\\texttt{random() < p}$ est vrai avec la probabilité $p$. Pour deux épreuves, on tire la première, puis la seconde avec un $\\texttt{if}$… $\\texttt{else}$ selon le résultat."
      }
    ],
    pieges: [
      "Confondre $P_M(T)$ et $P_T(M)$.",
      "Additionner au lieu de multiplier le long d'un chemin.",
      "Mettre $P(B)$ au lieu de $P_A(B)$ sur une branche du second niveau.",
      "Oublier les faux positifs dans le total des tests positifs.",
      "Diviser par $P(B)$ au lieu de $P(A)$ dans $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle ou au devoir commun (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le bus et les retards",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Dans un lycée, $60\\,\\%$ des élèves viennent en bus scolaire. Parmi eux, $25\\,\\%$ arrivent en retard au moins une fois par semaine ; parmi les autres élèves, c'est $10\\,\\%$ (données fictives). On choisit un élève au hasard. On note $B$ : « il vient en bus » et $R$ : « il arrive en retard au moins une fois par semaine ».",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Traduis les données par des probabilités, puis construis un arbre pondéré.",
            indice: "Au premier niveau : $P(B)$ et $P(\\overline{B})$. Au second niveau : $P_B(R)$, $P_B(\\overline{R})$, puis $P_{\\overline{B}}(R)$ et $P_{\\overline{B}}(\\overline{R})$.",
            corrige: "$P(B) = 0{,}6$, $P_B(R) = 0{,}25$ et $P_{\\overline{B}}(R) = 0{,}1$. On complète avec les contraires : $P(\\overline{B}) = 0{,}4$, $P_B(\\overline{R}) = 0{,}75$ et $P_{\\overline{B}}(\\overline{R}) = 0{,}9$.",
            figureCorrige: (o) => o.arbreProba(["B", "~B", "R", "~R"], ["0,6", "0,4", "0,25", "0,75", "0,1", "0,9"], "Arbre pondéré : B 0,6 et non B 0,4 ; après B : R 0,25 et non R 0,75 ; après non B : R 0,1 et non R 0,9")
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $P(B \\cap R)$ et $P(\\overline{B} \\cap R)$. Traduis chacune par une phrase.",
            indice: "On multiplie les probabilités le long du chemin.",
            corrige: "$P(B \\cap R) = 0{,}6 \\times 0{,}25 = 0{,}15$ : $15\\,\\%$ des élèves viennent en bus **et** arrivent en retard. $P(\\overline{B} \\cap R) = 0{,}4 \\times 0{,}1 = 0{,}04$ : $4\\,\\%$ des élèves ne viennent pas en bus et arrivent en retard."
          },
          {
            n: "3.", points: 1,
            texte: "Que signifient $P_B(\\overline{R}) = 0{,}75$ et $P(B \\cap \\overline{R}) = 0{,}45$ ?",
            indice: "« Sachant » restreint la population ; « et » parle de toute la population.",
            corrige: "$P_B(\\overline{R}) = 0{,}75$ : parmi les élèves qui viennent en bus, $75\\,\\%$ n'arrivent jamais en retard. $P(B \\cap \\overline{R}) = 0{,}45$ : $45\\,\\%$ de **tous** les élèves viennent en bus et n'arrivent jamais en retard."
          },
          {
            n: "4.", points: 2,
            texte: "On imagine un lycée de $1\\,000$ élèves. Complète le tableau d'effectifs, puis calcule la probabilité qu'un élève en retard vienne en bus.",
            tableau: { lignes: [["", "R", "\\overline{R}", "\\text{Total}"], ["B", "\\ldots", "\\ldots", "\\ldots"], ["\\overline{B}", "\\ldots", "\\ldots", "\\ldots"], ["\\text{Total}", "\\ldots", "\\ldots", "1\\,000"]] },
            indice: "$1\\,000 \\times 0{,}6 = 600$ élèves viennent en bus, dont $25\\,\\%$ en retard. On cherche $P_R(B)$ : on se place dans la colonne $R$.",
            corrige: "Bus : $600$ élèves, dont $150$ en retard et $450$ jamais. Autres : $400$, dont $40$ en retard et $360$ jamais. En tout, $190$ élèves arrivent en retard. Donc $P_R(B) = \\dfrac{150}{190} = \\dfrac{15}{19} \\approx 0{,}79$.",
            tableauCorrige: { lignes: [["", "R", "\\overline{R}", "\\text{Total}"], ["B", "150", "450", "600"], ["\\overline{B}", "40", "360", "400"], ["\\text{Total}", "190", "810", "1\\,000"]] }
          },
          {
            n: "5.", points: 1,
            texte: "Un article affirme : « $25\\,\\%$ des élèves en retard viennent en bus. » Corrige cette phrase.",
            indice: "$25\\,\\%$, c'est $P_B(R)$ ou $P_R(B)$ ?",
            corrige: "C'est faux : $25\\,\\%$ est $P_B(R)$, la part des élèves en retard **parmi ceux qui viennent en bus**. Parmi les élèves en retard, environ $79\\,\\%$ viennent en bus ($P_R(B)$). Il faudrait écrire : « $25\\,\\%$ des élèves qui viennent en bus arrivent en retard »."
          }
        ]
      },
      {
        titre: "Le filtre anti-spam",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Une messagerie reçoit des courriels dont $30\\,\\%$ sont des spams. Son filtre classe en « spam » $95\\,\\%$ des spams, mais aussi, par erreur, $2\\,\\%$ des courriels normaux (données fictives). On choisit un courriel au hasard. On note $S$ : « c'est un spam » et $F$ : « le filtre le classe en spam ».",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Construis un arbre pondéré. Le filtre est un test : donne sa sensibilité $P_S(F)$ et sa spécificité $P_{\\overline{S}}(\\overline{F})$.",
            indice: "Au premier niveau, $S$ et $\\overline{S}$. Les $2\\,\\%$ de courriels normaux classés en spam sont des faux positifs.",
            corrige: "$P(S) = 0{,}3$, $P_S(F) = 0{,}95$ et $P_{\\overline{S}}(F) = 0{,}02$. La sensibilité vaut $0{,}95$ et la spécificité $P_{\\overline{S}}(\\overline{F}) = 1 - 0{,}02 = 0{,}98$.",
            figureCorrige: (o) => o.arbreProba(["S", "~S", "F", "~F"], ["0,3", "0,7", "0,95", "0,05", "0,02", "0,98"], "Arbre pondéré : S 0,3 et non S 0,7 ; après S : F 0,95 et non F 0,05 ; après non S : F 0,02 et non F 0,98")
          },
          {
            n: "2.", points: 1.5,
            texte: "On imagine $10\\,000$ courriels. Complète le tableau d'effectifs.",
            tableau: { lignes: [["", "F", "\\overline{F}", "\\text{Total}"], ["S", "\\ldots", "\\ldots", "\\ldots"], ["\\overline{S}", "\\ldots", "\\ldots", "\\ldots"], ["\\text{Total}", "\\ldots", "\\ldots", "10\\,000"]] },
            indice: "$10\\,000 \\times 0{,}3 = 3\\,000$ spams, dont $95\\,\\%$ sont classés en spam. Puis les $7\\,000$ courriels normaux, dont $2\\,\\%$ sont classés en spam.",
            corrige: "Spams : $3\\,000$, dont $2\\,850$ classés et $150$ non classés. Courriels normaux : $7\\,000$, dont $140$ classés par erreur et $6\\,860$ non classés.",
            tableauCorrige: { lignes: [["", "F", "\\overline{F}", "\\text{Total}"], ["S", "2\\,850", "150", "3\\,000"], ["\\overline{S}", "140", "6\\,860", "7\\,000"], ["\\text{Total}", "2\\,990", "7\\,010", "10\\,000"]] }
          },
          {
            n: "3.", points: 1.5,
            texte: "Un courriel est classé en spam. Quelle est la probabilité que ce soit vraiment un spam ? Donne une valeur arrondie au millième.",
            indice: "On cherche $P_F(S)$ : place-toi dans la colonne $F$.",
            corrige: "$P_F(S) = \\dfrac{2\\,850}{2\\,990} \\approx 0{,}953$. Un courriel classé en spam est un vrai spam dans environ $95\\,\\%$ des cas."
          },
          {
            n: "4.", points: 1.5,
            texte: "Un courriel n'est pas classé en spam. Quelle est la probabilité que ce soit quand même un spam ? Donne une valeur arrondie au millième.",
            indice: "On cherche $P_{\\overline{F}}(S)$ : place-toi dans la colonne $\\overline{F}$.",
            corrige: "$P_{\\overline{F}}(S) = \\dfrac{150}{7\\,010} \\approx 0{,}021$ : environ $2\\,\\%$ des courriels qui arrivent dans la boîte de réception sont des spams."
          },
          {
            n: "5.", points: 1,
            texte: "Faut-il ne jamais regarder le dossier des spams ? Réponds avec le tableau.",
            indice: "Combien de courriels normaux finissent dans les spams, sur $10\\,000$ ?",
            corrige: "Sur $10\\,000$ courriels, $140$ courriels normaux sont classés en spam : ce sont des faux positifs, environ $\\dfrac{140}{2\\,990} \\approx 5\\,\\%$ du dossier des spams. Il vaut mieux y jeter un œil de temps en temps."
          }
        ]
      },
      {
        titre: "Pile ou face, puis une urne",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Zaïna lance une pièce équilibrée. Si elle obtient pile, elle tire une boule dans l'urne A, qui contient $3$ boules rouges et $1$ verte ; sinon, elle tire dans l'urne B, qui contient $1$ boule rouge et $3$ vertes. On note $A$ : « elle tire dans l'urne A » et $R$ : « la boule est rouge ».",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Construis un arbre pondéré de l'expérience.",
            indice: "$P(A) = 0{,}5$. Dans l'urne A, $3$ boules rouges sur $4$.",
            corrige: "$P(A) = P(\\overline{A}) = 0{,}5$ ; $P_A(R) = \\dfrac{3}{4} = 0{,}75$ et $P_{\\overline{A}}(R) = \\dfrac{1}{4} = 0{,}25$.",
            figureCorrige: (o) => o.arbreProba(["A", "~A", "R", "~R"], ["0,5", "0,5", "0,75", "0,25", "0,25", "0,75"], "Arbre pondéré : A 0,5 et non A 0,5 ; après A : R 0,75 et non R 0,25 ; après non A : R 0,25 et non R 0,75")
          },
          {
            n: "2.", points: 1,
            texte: "Calcule $P(A \\cap R)$ et $P(\\overline{A} \\cap R)$.",
            indice: "On multiplie le long de chaque chemin qui finit par $R$.",
            corrige: "$P(A \\cap R) = 0{,}5 \\times 0{,}75 = 0{,}375$ et $P(\\overline{A} \\cap R) = 0{,}5 \\times 0{,}25 = 0{,}125$."
          },
          {
            n: "3.", points: 1.5,
            texte: "La boule tirée est rouge. Quelle est la probabilité qu'elle vienne de l'urne A ? Aide-toi d'un tableau pour $1\\,000$ parties.",
            indice: "Sur $1\\,000$ parties : $500$ tirages dans l'urne A, dont $75\\,\\%$ de boules rouges ; $500$ dans l'urne B, dont $25\\,\\%$ de rouges.",
            corrige: "Sur $1\\,000$ parties : $375$ boules rouges viennent de l'urne A et $125$ de l'urne B, soit $500$ boules rouges en tout. Donc $P_R(A) = \\dfrac{375}{500} = 0{,}75$."
          },
          {
            n: "4.", points: 1,
            texte:
              "Voici une simulation d'une partie ($\\texttt{p}$ : pile, $\\texttt{r}$ : boule rouge). Quelle proportion de parties renvoie $\\texttt{(True, True)}$ sur un grand nombre de simulations ?\n\n" +
              "```python\nfrom random import random\n\ndef partie():\n    p = random() < 0.5\n    if p:\n        r = random() < 0.75\n    else:\n        r = random() < 0.25\n    return p, r\n```",
            indice: "$\\texttt{(True, True)}$ veut dire « pile, puis boule rouge », c'est-à-dire $A \\cap R$.",
            corrige: "$\\texttt{(True, True)}$ correspond à l'événement $A \\cap R$ : sur un grand nombre de parties, on attend une proportion proche de $P(A \\cap R) = 0{,}375$."
          },
          {
            n: "5.", points: 1,
            texte: "Écris quelques lignes qui simulent $10\\,000$ parties et affichent la fréquence des boules rouges. Vers quelle valeur doit-elle être proche ?",
            indice: "Utilise une boucle $\\texttt{for}$, un compteur, et récupère $\\texttt{p, r = partie()}$ à chaque tour.",
            corrige:
              "```python\nn = 0\nfor k in range(10000):\n    p, r = partie()\n    if r:\n        n = n + 1\nprint(n / 10000)\n```\n\n" +
              "La fréquence doit être proche de la proportion de boules rouges trouvée à la question 3 : $\\dfrac{500}{1\\,000} = 0{,}5$."
          }
        ]
      }
    ]
  }
};
