/*
  ENTRAÎNEMENT : 5e — chapitre 1, Règles de calcul
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-calcul.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e, sans calculatrice.
  Calculs différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-calcul"] = {
  revisions: {
    intro: "Les règles de calcul en un coup d'œil : les priorités, les parenthèses, le trait de fraction, la nature d'une expression et la distributivité. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Sans parenthèses",
        texte: "On effectue d'abord les multiplications et les divisions, de gauche à droite, puis les additions et les soustractions : $18 - 3 \\times 4 = 18 - 12 = 6$."
      },
      {
        titre: "Avec des parenthèses",
        texte: "On commence par les calculs entre parenthèses, les plus intérieures d'abord, puis les crochets : $2 \\times [15 - (3 + 4)] = 2 \\times 8 = 16$."
      },
      {
        titre: "Le trait de fraction",
        texte: "Il regroupe comme des parenthèses : on calcule le numérateur et le dénominateur avant de diviser.\n\n$\\dfrac{9 + 6}{8 - 3} = \\dfrac{15}{5} = 3$"
      },
      {
        titre: "Nature d'une expression",
        texte: "C'est la dernière opération effectuée : une somme (de termes), une différence, un produit (de facteurs) ou un quotient."
      },
      {
        titre: "La distributivité",
        texte: "$k \\times (a + b) = k \\times a + k \\times b$ et $k \\times (a - b) = k \\times a - k \\times b$. Par exemple, $13 \\times 101 = 1\\,300 + 13 = 1\\,313$."
      }
    ],
    pieges: [
      "Calculer de gauche à droite sans respecter les priorités : $5 + 3 \\times 2 = 11$, et non $16$.",
      "Oublier que le trait de fraction regroupe tout le numérateur et tout le dénominateur.",
      "Confondre « le double de la somme » et « la somme du double ».",
      "Ne distribuer qu'à un seul terme : $4 \\times (10 + 3) = 40 + 12$.",
      "Enchaîner des divisions de droite à gauche : $24 \\div 6 \\div 2 = 4 \\div 2 = 2$, et non $24 \\div 3 = 8$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Des calculs",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Calcule en écrivant les étapes.",
        questions: [
          { n: "1.", points: 2, texte: "$A = 45 - 5 \\times 7 + 3$ et $B = 64 \\div 8 \\times 2$.", corrige: "$A = 45 - 35 + 3 = 13$.\n\n$B = 8 \\times 2 = 16$ (on calcule de gauche à droite)." },
          { n: "2.", points: 2, texte: "$C = 3 \\times (14 - 2 \\times 5)$ et $D = 100 - [4 + 6 \\times (9 - 7)]$.", corrige: "$C = 3 \\times (14 - 10) = 3 \\times 4 = 12$.\n\n$D = 100 - [4 + 6 \\times 2] = 100 - 16 = 84$." },
          { n: "3.", points: 1.5, texte: "$E = \\dfrac{8 \\times 5 + 2}{10 - 4}$", corrige: "$E = \\dfrac{40 + 2}{6} = \\dfrac{42}{6} = 7$" },
          { n: "4.", points: 1.5, texte: "Place des parenthèses pour que $5 + 3 \\times 6 - 2$ soit égal à $46$.", indice: "Essaie de faire la somme $5 + 3$ en premier.", corrige: "$(5 + 3) \\times 6 - 2 = 8 \\times 6 - 2 = 48 - 2 = 46$." }
        ]
      },
      {
        titre: "Écrire et traduire",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Traduis, calcule ou justifie.",
        questions: [
          { n: "1.", points: 2, texte: "Écris une expression, puis calcule-la : « le produit de $6$ par la différence entre $11$ et $4$ » ; « la différence entre $50$ et le triple de $8$ ».", corrige: "$6 \\times (11 - 4) = 6 \\times 7 = 42$.\n\n$50 - 3 \\times 8 = 50 - 24 = 26$." },
          { n: "2.", points: 2, texte: "Écris une phrase qui traduit l'expression $(9 + 6) \\div 3$, puis calcule-la.", corrige: "« Le quotient de la somme de $9$ et de $6$ par $3$ » : $(9 + 6) \\div 3 = 15 \\div 3 = 5$." },
          { n: "3.", points: 1.5, texte: "Vrai ou faux : $2 \\times 5 + 3 = 2 \\times (5 + 3)$ ? Justifie.", corrige: "Faux : $2 \\times 5 + 3 = 10 + 3 = 13$, alors que $2 \\times (5 + 3) = 2 \\times 8 = 16$." },
          { n: "4.", points: 1.5, texte: "Écris une seule expression qui donne le prix de $3$ cahiers à $2{,}50$ € et de $2$ stylos à $1{,}20$ €, puis calcule ce prix.", corrige: "$3 \\times 2{,}50 + 2 \\times 1{,}20 = 7{,}50 + 2{,}40 = 9{,}90$ €." }
        ]
      },
      {
        titre: "Calcul mental et distributivité",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Calcule astucieusement, en écrivant l'étape qui utilise la distributivité.",
        questions: [
          { n: "1.", points: 1.5, texte: "$15 \\times 102$", corrige: "$15 \\times (100 + 2) = 1\\,500 + 30 = 1\\,530$." },
          { n: "2.", points: 1.5, texte: "$23 \\times 98$", corrige: "$23 \\times (100 - 2) = 2\\,300 - 46 = 2\\,254$." },
          { n: "3.", points: 1.5, texte: "$3{,}7 \\times 26 + 3{,}7 \\times 74$", corrige: "$3{,}7 \\times (26 + 74) = 3{,}7 \\times 100 = 370$." },
          { n: "4.", points: 1.5, texte: "Un rectangle de $8$ cm de large est formé de deux rectangles de $12$ cm et de $5$ cm de long, placés bout à bout. Écris son aire de deux façons et calcule-la.", corrige: "$8 \\times (12 + 5) = 8 \\times 12 + 8 \\times 5$\n\n${} = 96 + 40 = 136$ cm²" }
        ]
      }
    ]
  }
};
