/*
  ENTRAÎNEMENT : 6e — chapitre 4, Fractions
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre sixieme-fractions.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 6e, sans calculatrice.
  Figure dessinée par o.figGeo (assets/exercices-base.js). Fractions différentes de celles du cours, de la méthode, du QCM
  et de l'entraînement de 5e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["sixieme-fractions"] = {
  revisions: {
    intro: "Les fractions en un coup d'œil : partage, quotient, fractions égales, comparaison, addition et fraction d'une quantité. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Une fraction pour partager",
        texte: "$\\dfrac{3}{5}$ : on partage l'unité en $5$ parts égales (le dénominateur) et on en prend $3$ (le numérateur)."
      },
      {
        titre: "Une fraction est un quotient",
        texte: "$\\dfrac{a}{b}$ est le nombre qui, multiplié par $b$, donne $a$ : $\\dfrac{7}{4} = 7 \\div 4 = 1{,}75$."
      },
      {
        titre: "Fractions égales",
        texte: "On ne change pas une fraction en multipliant, ou en divisant, son numérateur et son dénominateur par un même nombre : $\\dfrac{2}{3} = \\dfrac{8}{12}$."
      },
      {
        titre: "Comparer",
        texte: "Avec le même dénominateur, on compare les numérateurs. Une fraction est plus grande que $1$ quand son numérateur dépasse son dénominateur."
      },
      {
        titre: "Additionner",
        texte: "Avec le même dénominateur, on additionne les numérateurs : $\\dfrac{2}{7} + \\dfrac{3}{7} = \\dfrac{5}{7}$. Sinon, on écrit d'abord les fractions avec le même dénominateur."
      },
      {
        titre: "Fraction d'une quantité",
        texte: "Les $\\dfrac{2}{3}$ de $18$ : $18 \\div 3 = 6$, puis $6 \\times 2 = 12$."
      }
    ],
    pieges: [
      "Additionner les dénominateurs.",
      "Croire que les parts n'ont pas besoin d'être égales pour lire une fraction.",
      "Inverser le numérateur et le dénominateur.",
      "Ne multiplier que le numérateur pour obtenir une fraction égale.",
      "Oublier de partir du tout, qui vaut $1$, pour trouver ce qui reste."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question. Les fractions sont à donner sous forme simplifiée.",
    exercices: [
      {
        titre: "Lire et écrire des fractions",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Réponds en écrivant les fractions.",
        questions: [
          {
            n: "1.", points: 1.5, texte: "Quelle fraction du rectangle est coloriée ?",
            figure: (o) => {
              const formes = [], pts = {}, segs = [];
              [0, 1, 2, 6, 7].forEach((k) => { const x = 40 + 40 * (k % 6), y = 20 + 40 * Math.floor(k / 6); formes.push({ p: [[x, y], [x + 40, y], [x + 40, y + 40], [x, y + 40]], image: true }); });
              for (let i = 0; i <= 6; i++) { pts["v" + i] = [40 + 40 * i, 20]; pts["w" + i] = [40 + 40 * i, 100]; segs.push(["v" + i, "w" + i]); }
              for (let j = 0; j <= 2; j++) { pts["h" + j] = [40, 20 + 40 * j]; pts["k" + j] = [280, 20 + 40 * j]; segs.push(["h" + j, "k" + j]); }
              return o.figGeo({ W: 320, H: 110, pts, segs, formes, sansPoint: Object.keys(pts), aria: "Rectangle partagé en 12 carrés égaux, dont 5 sont coloriés" });
            },
            corrige: "Le rectangle est partagé en $12$ parts égales, dont $5$ sont coloriées : $\\dfrac{5}{12}$."
          },
          { n: "2.", points: 2, texte: "Donne l'écriture décimale de $\\dfrac{9}{4}$ et de $\\dfrac{3}{5}$.", corrige: "$\\dfrac{9}{4} = 9 \\div 4 = 2{,}25$ et $\\dfrac{3}{5} = 3 \\div 5 = 0{,}6$." },
          { n: "3.", points: 2, texte: "Complète : $\\dfrac{4}{9} = \\dfrac{\\ldots}{36}$ et $\\dfrac{30}{18} = \\dfrac{5}{\\ldots}$.", corrige: "$\\dfrac{4 \\times 4}{9 \\times 4} = \\dfrac{16}{36}$\n\n$\\dfrac{30 \\div 6}{18 \\div 6} = \\dfrac{5}{3}$" },
          { n: "4.", points: 1.5, texte: "Entre quels nombres entiers consécutifs se trouve $\\dfrac{13}{4}$ ?", corrige: "$\\dfrac{12}{4} = 3$ et $\\dfrac{16}{4} = 4$ : $3 < \\dfrac{13}{4} < 4$." }
        ]
      },
      {
        titre: "Comparer et calculer",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Les résultats sont à donner sous forme simplifiée.",
        questions: [
          { n: "1.", points: 2, texte: "Compare $\\dfrac{5}{8}$ et $\\dfrac{3}{4}$.", indice: "Écris $\\dfrac{3}{4}$ avec le dénominateur $8$.", corrige: "$\\dfrac{3}{4} = \\dfrac{6}{8}$, et $\\dfrac{5}{8} < \\dfrac{6}{8}$ : donc $\\dfrac{5}{8} < \\dfrac{3}{4}$." },
          { n: "2.", points: 2.5, texte: "Calcule $\\dfrac{2}{9} + \\dfrac{5}{9}$ et $\\dfrac{7}{12} - \\dfrac{1}{4}$.", corrige: "$\\dfrac{2}{9} + \\dfrac{5}{9} = \\dfrac{7}{9}$\n\n$\\dfrac{7}{12} - \\dfrac{3}{12} = \\dfrac{4}{12} = \\dfrac{1}{3}$" },
          { n: "3.", points: 2.5, texte: "Calcule $4 \\times \\dfrac{3}{10}$ et donne le résultat sous forme décimale.", corrige: "$4 \\times \\dfrac{3}{10} = \\dfrac{12}{10} = 1{,}2$." }
        ]
      },
      {
        titre: "La tablette de chocolat",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Une tablette de chocolat compte $24$ carreaux. Ali en mange $\\dfrac{1}{6}$ et Mia en mange $\\dfrac{3}{8}$.",
        questions: [
          { n: "1.", points: 2, texte: "Combien de carreaux chacun mange-t-il ?", corrige: "Ali : $24 \\div 6 = 4$ carreaux. Mia : $24 \\div 8 \\times 3 = 9$ carreaux." },
          { n: "2.", points: 2, texte: "Combien de carreaux reste-t-il ?", corrige: "$24 - 4 - 9 = 11$ carreaux." },
          { n: "3.", points: 2, texte: "Quelle fraction de la tablette reste-t-il ?", corrige: "$11$ carreaux sur $24$ : $\\dfrac{11}{24}$ de la tablette." }
        ]
      }
    ]
  }
};
