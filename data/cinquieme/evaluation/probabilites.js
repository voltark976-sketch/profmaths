/*
  ENTRAÎNEMENT : 5e — chapitre 16, Probabilités
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-probabilites.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e, sans calculatrice.
  Expériences différentes de celles du cours, de la méthode, du QCM et des entraînements de 4e et de 3e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-probabilites"] = {
  revisions: {
    intro: "Les probabilités en un coup d'œil : expérience aléatoire, issues, évènements, calcul d'une probabilité et fréquences. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Expérience aléatoire",
        texte: "On connaît tous les résultats possibles, les issues, mais on ne peut pas savoir à l'avance lequel sortira : lancer un dé, tirer une boule dans un sac…"
      },
      {
        titre: "Évènement",
        texte: "Un évènement est réalisé par certaines issues. « Obtenir un nombre pair » avec un dé est réalisé par $2$, $4$ et $6$. Un évènement impossible a pour probabilité $0$, un évènement certain $1$."
      },
      {
        titre: "Calculer une probabilité",
        texte: "Quand toutes les issues ont la même chance : probabilité $= \\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre total d'issues}}$."
      },
      {
        titre: "Plusieurs écritures",
        texte: "Une probabilité est un nombre entre $0$ et $1$, qu'on peut écrire en fraction, en décimal ou en pourcentage : $\\dfrac{1}{4} = 0{,}25 = 25\\,\\%$."
      },
      {
        titre: "Fréquence et probabilité",
        texte: "Sur un grand nombre d'essais, la fréquence d'un résultat se rapproche de sa probabilité ; sur peu d'essais, elle peut en être loin."
      }
    ],
    pieges: [
      "Oublier des issues, ou en compter deux fois.",
      "Donner une probabilité plus grande que $1$.",
      "Croire qu'un résultat qui n'est pas sorti depuis longtemps a plus de chances de sortir.",
      "Conclure qu'une pièce est truquée après seulement quelques lancers.",
      "Croire que toutes les issues sont toujours équiprobables."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question. Les probabilités sont à donner sous forme de fraction simplifiée.",
    exercices: [
      {
        titre: "Le dé à huit faces",
        duree: 15, points: 7, calculatrice: false,
        contexte: "On lance un dé équilibré à huit faces, numérotées de $1$ à $8$. Les probabilités sont à donner sous forme de fraction simplifiée.",
        questions: [
          { n: "1.", points: 1.5, texte: "Quelles sont les issues de cette expérience ? Combien y en a-t-il ?", corrige: "Les issues sont $1$, $2$, $3$, $4$, $5$, $6$, $7$ et $8$ : il y en a $8$." },
          { n: "2.", points: 2, texte: "Quelle est la probabilité d'obtenir $7$ ?", corrige: "Une issue favorable sur $8$ : $\\dfrac{1}{8}$." },
          { n: "3.", points: 2, texte: "Quelle est la probabilité d'obtenir un nombre pair ?", corrige: "Issues favorables : $2$, $4$, $6$ et $8$, soit $4$ sur $8$ : $\\dfrac{4}{8} = \\dfrac{1}{2}$." },
          { n: "4.", points: 1.5, texte: "Quelle est la probabilité d'obtenir un multiple de $3$ ?", corrige: "Issues favorables : $3$ et $6$ : $\\dfrac{2}{8} = \\dfrac{1}{4}$." }
        ]
      },
      {
        titre: "Les cartons de lettres",
        duree: 15, points: 7, calculatrice: false,
        contexte: "On écrit chaque lettre du mot MAMOUDZOU sur un carton. On mélange les cartons et on en tire un au hasard. Les probabilités sont à donner sous forme de fraction simplifiée.",
        questions: [
          { n: "1.", points: 1.5, texte: "Combien y a-t-il de cartons ?", corrige: "Le mot MAMOUDZOU a $9$ lettres : il y a $9$ cartons." },
          { n: "2.", points: 2, texte: "Quelle est la probabilité de tirer la lettre M ?", corrige: "Il y a $2$ cartons M sur $9$ : $\\dfrac{2}{9}$." },
          { n: "3.", points: 2, texte: "Quelle est la probabilité de tirer une voyelle ?", indice: "Les voyelles du mot sont A, O, U, O et U.", corrige: "$5$ voyelles sur $9$ cartons : $\\dfrac{5}{9}$." },
          { n: "4.", points: 1.5, texte: "Quelle est la probabilité de tirer une consonne ?", corrige: "Toutes les autres lettres sont des consonnes : $1 - \\dfrac{5}{9} = \\dfrac{4}{9}$ (les cartons M, M, D et Z)." }
        ]
      },
      {
        titre: "Pile ou face ?",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Kenza lance $40$ fois une pièce de monnaie et obtient $23$ fois « pile ».",
        questions: [
          { n: "1.", points: 1.5, texte: "Quelle est la fréquence de « pile » ? Écris-la en nombre décimal.", corrige: "$\\dfrac{23}{40} = 0{,}575$." },
          { n: "2.", points: 1.5, texte: "Quelle est la probabilité d'obtenir « pile » avec une pièce équilibrée ?", corrige: "$\\dfrac{1}{2} = 0{,}5$ : une issue favorable sur deux." },
          { n: "3.", points: 1.5, texte: "Kenza pense que sa pièce est truquée. A-t-elle raison ?", corrige: "On ne peut pas l'affirmer : $40$ lancers, c'est peu, et la fréquence peut s'éloigner un peu de la probabilité. Il faudrait beaucoup plus de lancers pour conclure." },
          { n: "4.", points: 1.5, texte: "Si la pièce est équilibrée, combien de « pile » peut-on s'attendre à obtenir environ, sur $1\\,000$ lancers ?", corrige: "Environ la moitié : à peu près $500$ « pile »." }
        ]
      }
    ]
  }
};
