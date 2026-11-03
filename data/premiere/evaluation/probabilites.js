/*
  ENTRAÎNEMENT : Première spécialité — chapitre 4, Probabilités conditionnelles et indépendance
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-probabilites.
  Format : voir data/premiere/evaluation/second-degre-2.js. Sans calculatrice (épreuve anticipée).
  Arbres dessinés par o.arbreProba (assets/exercices-base.js) : « ~A » pour A barre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-probabilites"] = {
  revisions: {
    intro: "Les probabilités conditionnelles en un coup d'œil : l'arbre pondéré, les probabilités totales et l'indépendance. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Probabilité conditionnelle",
        texte:
          "Pour $P(A) \\neq 0$, la probabilité de $B$ sachant $A$ est :\n\n" +
          "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$, donc $P(A \\cap B) = P(A) \\times P_A(B)$."
      },
      {
        titre: "Arbre pondéré",
        texte:
          "- Les branches issues d'un même nœud ont une somme égale à $1$.\n" +
          "- La probabilité d'un chemin est le **produit** de ses branches.\n" +
          "- La probabilité d'un événement est la **somme** des chemins qui y mènent.",
        figure: (o) => o.arbreProba(["A", "~A", "B", "~B"], ["0,3", "0,7", "0,6", "0,4", "0,1", "0,9"], "Arbre pondéré : A 0,3 et non A 0,7 ; après A : B 0,6 et non B 0,4 ; après non A : B 0,1 et non B 0,9")
      },
      {
        titre: "Probabilités totales",
        texte:
          "Si $A$ et $\\overline{A}$ partagent l'univers :\n\n" +
          "$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.\n\n" +
          "Avec l'arbre ci-dessus : $P(B) = 0{,}3 \\times 0{,}6 + 0{,}7 \\times 0{,}1 = 0{,}25$. Avec trois cas $A_1$, $A_2$, $A_3$, on additionne trois chemins."
      },
      {
        titre: "Inverser le conditionnement",
        texte: "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$ : le numérateur se lit sur l'arbre, le dénominateur vient des probabilités totales. Avec l'arbre ci-dessus : $P_B(A) = \\dfrac{0{,}18}{0{,}25} = 0{,}72$."
      },
      {
        titre: "Indépendance",
        texte: "$A$ et $B$ sont **indépendants** quand $P(A \\cap B) = P(A) \\times P(B)$. Si $P(A) \\neq 0$, cela revient à $P_A(B) = P(B)$ : savoir que $A$ est réalisé ne change rien pour $B$."
      },
      {
        titre: "Indépendants ou incompatibles ?",
        texte: "**Incompatibles** : $A \\cap B = \\varnothing$, ils ne peuvent pas se produire ensemble. **Indépendants** : l'un n'influence pas l'autre. Deux événements incompatibles de probabilités non nulles ne sont jamais indépendants."
      },
      {
        titre: "Épreuves indépendantes",
        texte:
          "Pour deux épreuves indépendantes (tirages **avec** remise…), la probabilité d'une issue est le produit des probabilités.\n\n" +
          "« Au moins un succès » : $1 - P(\\text{aucun succès})$."
      },
      {
        titre: "Python : simuler",
        texte: "$\\texttt{random() < p}$ est vrai avec la probabilité $p$, et deux appels de $\\texttt{random()}$ sont indépendants. La fréquence observée sur beaucoup d'essais se rapproche de la probabilité."
      }
    ],
    pieges: [
      "Confondre $P_A(B)$ (on sait que $A$ est réalisé) et $P_B(A)$.",
      "Additionner les branches du second niveau au lieu de multiplier le long d'un chemin.",
      "Oublier un chemin dans la formule des probabilités totales.",
      "Confondre événements indépendants et événements incompatibles.",
      "Multiplier les probabilités pour des tirages sans remise comme s'ils étaient indépendants.",
      "Calculer « au moins un » en additionnant : on passe par l'événement contraire « aucun »."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le bus scolaire de Sada",
        duree: 25, points: 7, calculatrice: false,
        contexte:
          "On choisit au hasard un matin d'école. On note $P$ l'événement « il pleut » et $R$ l'événement « le bus scolaire est en retard ».\n\n" +
          "Il pleut $3$ matins sur $10$. Quand il pleut, le bus est en retard dans $60\\,\\%$ des cas ; quand il ne pleut pas, dans $10\\,\\%$ des cas.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Représente la situation par un arbre pondéré.",
            indice: "Premier niveau : $P$ et $\\overline{P}$. Second niveau : $R$ et $\\overline{R}$. Les branches issues d'un même nœud ont une somme égale à $1$.",
            corrige: "$P(P) = 0{,}3$, donc $P(\\overline{P}) = 0{,}7$ ; $P_P(R) = 0{,}6$, donc $P_P(\\overline{R}) = 0{,}4$ ; $P_{\\overline{P}}(R) = 0{,}1$, donc $P_{\\overline{P}}(\\overline{R}) = 0{,}9$.",
            figureCorrige: (o) => o.arbreProba(["P", "~P", "R", "~R"], ["0,3", "0,7", "0,6", "0,4", "0,1", "0,9"], "Arbre pondéré : P 0,3 et non P 0,7 ; après P : R 0,6 et non R 0,4 ; après non P : R 0,1 et non R 0,9")
          },
          {
            n: "2.", points: 1,
            texte: "Calcule la probabilité qu'il pleuve et que le bus soit en retard.",
            indice: "C'est la probabilité d'un chemin : on multiplie ses branches.",
            corrige: "$P(P \\cap R) = P(P) \\times P_P(R) = 0{,}3 \\times 0{,}6 = 0{,}18$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Montre que la probabilité que le bus soit en retard est $0{,}25$.",
            indice: "Deux chemins mènent à $R$ : utilise la formule des probabilités totales.",
            corrige: "$P$ et $\\overline{P}$ partagent l'univers, donc $P(R) = P(P \\cap R) + P(\\overline{P} \\cap R) = 0{,}18 + 0{,}7 \\times 0{,}1 = 0{,}18 + 0{,}07 = 0{,}25$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Ce matin, le bus est en retard. Quelle est la probabilité qu'il pleuve ?",
            indice: "On cherche $P_R(P)$, et non $P_P(R)$ : $P_R(P) = \\dfrac{P(P \\cap R)}{P(R)}$.",
            corrige: "$P_R(P) = \\dfrac{P(P \\cap R)}{P(R)} = \\dfrac{0{,}18}{0{,}25} = \\dfrac{18}{25} = 0{,}72$. Quand le bus est en retard, il pleut dans $72\\,\\%$ des cas."
          },
          {
            n: "5.", points: 1.5,
            texte: "Les événements $P$ et $R$ sont-ils indépendants ? Justifie.",
            indice: "Compare $P(P \\cap R)$ et $P(P) \\times P(R)$, ou bien $P_P(R)$ et $P(R)$.",
            corrige: "$P(P) \\times P(R) = 0{,}3 \\times 0{,}25 = 0{,}075$, alors que $P(P \\cap R) = 0{,}18$. Ces deux nombres sont différents : $P$ et $R$ ne sont pas indépendants. La pluie augmente bien le risque de retard : $P_P(R) = 0{,}6$ contre $P(R) = 0{,}25$."
          }
        ]
      },
      {
        titre: "Les ananas de trois coopératives",
        duree: 25, points: 7, calculatrice: false,
        contexte:
          "Un grossiste de Mamoudzou achète ses ananas à trois coopératives : $50\\,\\%$ viennent de Bandrélé ($B$), $30\\,\\%$ de Combani ($C$) et $20\\,\\%$ de Dembéni ($D$). Certains ananas arrivent trop mûrs (événement $T$) : c'est le cas de $4\\,\\%$ des ananas de Bandrélé, $10\\,\\%$ de ceux de Combani et $5\\,\\%$ de ceux de Dembéni.\n\n" +
          "On choisit un ananas au hasard dans le stock.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Représente la situation par un arbre pondéré.",
            indice: "Le premier niveau a trois branches, $B$, $C$ et $D$ : elles forment une partition de l'univers.",
            corrige: "Premier niveau : $P(B) = 0{,}5$, $P(C) = 0{,}3$ et $P(D) = 0{,}2$. Second niveau : $P_B(T) = 0{,}04$, $P_C(T) = 0{,}1$ et $P_D(T) = 0{,}05$, et les branches $\\overline{T}$ complètent à $1$.",
            figureCorrige: (o) => o.arbreProba(["B", "C", "D", "T", "~T"], ["0,5", "0,3", "0,2", "0,04", "0,96", "0,1", "0,9", "0,05", "0,95"], "Arbre pondéré : B 0,5, C 0,3, D 0,2 ; T 0,04 après B, 0,1 après C, 0,05 après D")
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule la probabilité que l'ananas soit trop mûr.",
            indice: "Trois chemins mènent à $T$ : additionne leurs probabilités.",
            corrige:
              "Trois chemins mènent à $T$ : $0{,}5 \\times 0{,}04 = 0{,}02$, puis $0{,}3 \\times 0{,}1 = 0{,}03$ et $0{,}2 \\times 0{,}05 = 0{,}01$.\n\n" +
              "$B$, $C$ et $D$ forment une partition de l'univers, donc $P(T) = 0{,}02 + 0{,}03 + 0{,}01 = 0{,}06$. Il y a $6\\,\\%$ d'ananas trop mûrs dans le stock."
          },
          {
            n: "3.", points: 1.5,
            texte: "L'ananas choisi est trop mûr. Quelle est la probabilité qu'il vienne de Combani ?",
            indice: "On cherche $P_T(C) = \\dfrac{P(C \\cap T)}{P(T)}$.",
            corrige: "$P_T(C) = \\dfrac{P(C \\cap T)}{P(T)} = \\dfrac{0{,}03}{0{,}06} = 0{,}5$."
          },
          {
            n: "4.", points: 1,
            texte: "Combani ne fournit que $30\\,\\%$ des ananas, mais la moitié des ananas trop mûrs. Comment l'expliquer ?",
            indice: "Compare les proportions d'ananas trop mûrs des trois coopératives.",
            corrige: "Combani a la plus forte proportion d'ananas trop mûrs : $10\\,\\%$, contre $4\\,\\%$ et $5\\,\\%$. Elle fournit donc beaucoup plus d'ananas trop mûrs que sa part du stock ne le laisserait croire : $0{,}03$ sur $0{,}06$, soit la moitié."
          },
          {
            n: "5.", points: 1.5,
            texte: "On prend deux ananas au hasard. Le stock est assez grand pour considérer ces deux choix comme indépendants. Quelle est la probabilité qu'au moins un des deux soit trop mûr ?",
            indice: "Passe par l'événement contraire : « aucun des deux n'est trop mûr ».",
            corrige: "La probabilité qu'un ananas ne soit pas trop mûr est $1 - 0{,}06 = 0{,}94$. Les choix étant indépendants, aucun des deux n'est trop mûr avec la probabilité $0{,}94^2 = 0{,}8836$. Donc la probabilité qu'au moins un soit trop mûr est $1 - 0{,}8836 = 0{,}1164$."
          }
        ]
      },
      {
        titre: "Le jeu de la kermesse",
        duree: 20, points: 6, calculatrice: false,
        contexte:
          "À la kermesse du lycée, un joueur lance une fléchette, puis tire une boule dans une urne. La fléchette touche le centre avec la probabilité $0{,}3$ (événement $F$). L'urne contient $5$ boules, dont $2$ rouges : le joueur tire une boule rouge avec la probabilité $0{,}4$ (événement $R$). Le joueur gagne s'il réussit les deux épreuves.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Pourquoi peut-on considérer les deux épreuves comme indépendantes ? Calcule la probabilité de gagner.",
            indice: "Le lancer de la fléchette influence-t-il le tirage de la boule ? Pour deux épreuves indépendantes, on multiplie.",
            corrige: "Le résultat de la fléchette ne change pas la composition de l'urne : les deux épreuves sont indépendantes. Donc $P(F \\cap R) = P(F) \\times P(R) = 0{,}3 \\times 0{,}4 = 0{,}12$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule la probabilité que le joueur réussisse exactement une des deux épreuves.",
            indice: "Deux cas : la fléchette réussit et la boule n'est pas rouge, ou l'inverse.",
            corrige: "$P(F \\cap \\overline{R}) + P(\\overline{F} \\cap R) = 0{,}3 \\times 0{,}6 + 0{,}7 \\times 0{,}4 = 0{,}18 + 0{,}28 = 0{,}46$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Un élève affirme : « les événements $F$ et $R$ sont incompatibles ». A-t-il raison ?",
            indice: "Deux événements incompatibles ne peuvent pas se produire en même temps.",
            corrige: "**Non.** $F$ et $R$ peuvent se produire ensemble, avec la probabilité $0{,}12 \\neq 0$ : ils ne sont pas incompatibles. Ils sont indépendants, ce qui est tout autre chose."
          },
          {
            n: "4.", points: 2,
            texte:
              "On simule $10\\,000$ parties avec ce programme Python. Que représente le nombre affiché ? Autour de quelle valeur sera-t-il ?\n\n" +
              "```python\nfrom random import random\n\ndef partie():\n    f = random() < 0.3\n    r = random() < 0.4\n    return f and r\n\nn = 0\nfor i in range(10000):\n    if partie():\n        n = n + 1\nprint(n / 10000)\n```",
            indice: "$\\texttt{partie()}$ renvoie $\\texttt{True}$ quand les deux épreuves sont réussies. Que compte $\\texttt{n}$ ?",
            corrige: "$\\texttt{partie()}$ simule une partie et renvoie $\\texttt{True}$ quand le joueur gagne. $\\texttt{n}$ compte les parties gagnées, donc le programme affiche la **fréquence** des parties gagnées sur $10\\,000$. Sur beaucoup de parties, elle se rapproche de la probabilité de gagner : elle sera proche de $0{,}12$."
          }
        ]
      }
    ]
  }
};
