/*
  ENTRAÎNEMENT : Automatismes — Calcul numérique
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre auto-calcul-numerique.
  Format : voir data/premiere/evaluation/second-degre-2.js. Une série d'automatismes comme la partie 1 de l'épreuve anticipée
  (réponses courtes, sans calculatrice), puis deux exercices qui les mettent en situation.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["auto-calcul-numerique"] = {
  revisions: {
    intro: "Les réflexes de calcul numérique en un coup d'œil : comparer, fractions, puissances, écritures d'un nombre, ordre de grandeur et conversions. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Comparer",
        texte: "Par la différence : $a - b > 0 \\iff a > b$. Pour deux fractions à dénominateurs positifs, on compare les produits en croix : $\\dfrac{a}{b} < \\dfrac{c}{d} \\iff ad < bc$."
      },
      {
        titre: "Fractions",
        texte:
          "- additionner : on réduit d'abord au même dénominateur ;\n" +
          "- multiplier : numérateurs entre eux, dénominateurs entre eux ;\n" +
          "- diviser par une fraction, c'est multiplier par son inverse."
      },
      {
        titre: "Puissances",
        texte: "$a^m \\times a^n = a^{m+n}$, $\\dfrac{a^m}{a^n} = a^{m-n}$, $(a^m)^n = a^{mn}$ et $a^{-n} = \\dfrac{1}{a^n}$. Écriture scientifique : $a \\times 10^n$ avec $1 \\leqslant a < 10$, par exemple $0{,}003\\,2 = 3{,}2 \\times 10^{-3}$."
      },
      {
        titre: "Écritures d'un nombre",
        texte: "Un même nombre s'écrit de plusieurs façons : $\\dfrac{2}{5} = 0{,}4 = 40\\,\\%$. Pour passer d'un décimal à un pourcentage, on multiplie par $100$."
      },
      {
        titre: "Ordre de grandeur",
        texte: "On arrondit chaque nombre à une valeur simple, puis on calcule de tête. Avant de valider un résultat, on vérifie son ordre de grandeur, son unité et son signe."
      },
      {
        titre: "Conversions",
        texte: "Longueurs : $\\times 10$ d'une unité à la suivante ; aires : $\\times 100$ ; volumes : $\\times 1\\,000$. $1$ dm³ $= 1$ L, $1$ h $= 60$ min et $1$ m/s $= 3{,}6$ km/h."
      }
    ],
    pieges: [
      "$\\dfrac{a}{b} + \\dfrac{c}{d} \\neq \\dfrac{a + c}{b + d}$ : on réduit d'abord au même dénominateur.",
      "$(-3)^2 = 9$ mais $-3^2 = -9$ : sans parenthèses, le carré ne porte que sur $3$.",
      "$2^3 \\times 2^4 = 2^7$, pas $4^7$ ni $2^{12}$.",
      "$5\\,\\% = 0{,}05$ et non $0{,}5$.",
      "$1$ h $30$ min $= 1{,}5$ h et non $1{,}3$ h.",
      "$2^{-1} = 0{,}5$ : un exposant négatif ne rend pas le nombre négatif."
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
          { n: "1.", points: 0.5, texte: "Range dans l'ordre croissant $\\dfrac{4}{7}$ et $\\dfrac{5}{9}$.", corrige: "$4 \\times 9 = 36$ et $5 \\times 7 = 35$, donc $\\dfrac{5}{9} < \\dfrac{4}{7}$." },
          { n: "2.", points: 0.5, texte: "Calcule $\\dfrac{2}{3} + \\dfrac{5}{6}$.", corrige: "$\\dfrac{4}{6} + \\dfrac{5}{6} = \\dfrac{9}{6} = \\dfrac{3}{2}$." },
          { n: "3.", points: 0.5, texte: "Calcule $\\dfrac{5}{6} \\times \\dfrac{9}{10}$.", corrige: "$\\dfrac{45}{60} = \\dfrac{3}{4}$." },
          { n: "4.", points: 0.5, texte: "Calcule $\\dfrac{3}{4} \\div \\dfrac{9}{8}$.", corrige: "$\\dfrac{3}{4} \\times \\dfrac{8}{9} = \\dfrac{24}{36} = \\dfrac{2}{3}$." },
          { n: "5.", points: 0.5, texte: "Écris $3^4 \\times 3^{-6}$ sous la forme d'une fraction.", corrige: "$3^{4 - 6} = 3^{-2} = \\dfrac{1}{9}$." },
          { n: "6.", points: 0.5, texte: "Écris $\\dfrac{\\left(10^3\\right)^2}{10^{-1}}$ sous la forme $10^n$.", corrige: "$\\dfrac{10^6}{10^{-1}} = 10^{6 - (-1)} = 10^7$." },
          { n: "7.", points: 0.5, texte: "Donne l'écriture scientifique de $45$ millions.", corrige: "$45\\,000\\,000 = 4{,}5 \\times 10^7$." },
          { n: "8.", points: 0.5, texte: "Écris $\\dfrac{9}{25}$ sous forme décimale, puis en pourcentage.", corrige: "$\\dfrac{9}{25} = \\dfrac{36}{100} = 0{,}36 = 36\\,\\%$." },
          { n: "9.", points: 0.5, texte: "Écris $62{,}5\\,\\%$ sous la forme d'une fraction irréductible.", corrige: "$0{,}625 = \\dfrac{625}{1\\,000} = \\dfrac{5}{8}$." },
          { n: "10.", points: 0.5, texte: "Donne un ordre de grandeur de $398 \\times 0{,}051$.", corrige: "$400 \\times 0{,}05 = 20$." },
          { n: "11.", points: 0.5, texte: "Écris $2$ h $45$ min en heures, sous forme décimale.", corrige: "$45$ min $= \\dfrac{3}{4}$ h $= 0{,}75$ h, donc $2{,}75$ h." },
          { n: "12.", points: 0.5, texte: "Convertis $90$ km/h en m/s.", corrige: "$\\dfrac{90\\,000 \\text{ m}}{3\\,600 \\text{ s}} = 25$ m/s (ou $90 \\div 3{,}6 = 25$)." }
        ]
      },
      {
        titre: "La sortie en barque",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Un pêcheur part en barque à moteur. Quand la barque avance à $18$ km/h, le moteur consomme $4{,}5$ L d'essence par heure. Le réservoir plein contient $27$ L.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Quelle distance la barque parcourt-elle en $2$ h $20$ min à $18$ km/h ?",
            indice: "$20$ min $= \\dfrac{1}{3}$ h, donc $2$ h $20$ min $= \\dfrac{7}{3}$ h.",
            corrige: "$2$ h $20$ min $= 2 + \\dfrac{1}{3} = \\dfrac{7}{3}$ h, donc la distance vaut $18 \\times \\dfrac{7}{3} = 6 \\times 7 = 42$ km."
          },
          {
            n: "2.", points: 1.5,
            texte: "Combien de litres d'essence ce trajet consomme-t-il ? Quelle fraction du réservoir plein cela représente-t-il ? Donne une fraction irréductible.",
            indice: "$4{,}5 \\times \\dfrac{7}{3} = 1{,}5 \\times 7$.",
            corrige: "$4{,}5 \\times \\dfrac{7}{3} = 1{,}5 \\times 7 = 10{,}5$ L, soit $\\dfrac{10{,}5}{27} = \\dfrac{21}{54} = \\dfrac{7}{18}$ du réservoir."
          },
          {
            n: "3.", points: 2,
            texte: "Le pêcheur part avec le réservoir plein et veut garder un quart du réservoir en réserve. Jusqu'à quelle distance du port peut-il aller, s'il revient par le même chemin à la même vitesse ?",
            indice: "Il peut utiliser les trois quarts du réservoir, soit $\\dfrac{3}{4} \\times 27$ L. Divise par $4{,}5$ L/h pour obtenir une durée.",
            corrige: "Il peut utiliser $\\dfrac{3}{4} \\times 27 = 20{,}25$ L, soit $\\dfrac{20{,}25}{4{,}5} = 4{,}5$ h de navigation, c'est-à-dire $18 \\times 4{,}5 = 81$ km aller et retour. Il peut donc aller jusqu'à $40{,}5$ km du port."
          },
          {
            n: "4.", points: 2,
            texte: "L'essence coûte $1{,}95$ € le litre. Donne un ordre de grandeur du prix d'un plein de $27$ L, puis calcule ce prix exactement.",
            indice: "$1{,}95 = 2 - 0{,}05$.",
            corrige: "Ordre de grandeur : $2 \\times 27 = 54$ €. Exactement : $27 \\times 1{,}95 = 27 \\times 2 - 27 \\times 0{,}05 = 54 - 1{,}35 = 52{,}65$ €, ce qui est cohérent avec l'estimation."
          }
        ]
      },
      {
        titre: "Une culture de bactéries",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Dans un laboratoire, on étudie une bactérie longue d'environ $2 \\times 10^{-6}$ m. On met $300$ bactéries dans un milieu de culture, où leur nombre double toutes les $20$ minutes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Combien de ces bactéries faudrait-il aligner pour obtenir une longueur de $1$ cm ?",
            indice: "$1$ cm $= 10^{-2}$ m.",
            corrige: "$\\dfrac{10^{-2}}{2 \\times 10^{-6}} = 0{,}5 \\times 10^{4} = 5\\,000$ bactéries, soit $5 \\times 10^3$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Combien y a-t-il de bactéries au bout de $2$ heures ? Donne le résultat en écriture scientifique.",
            indice: "En $2$ heures, le nombre double $6$ fois.",
            corrige: "En $2$ h, il y a $6$ doublements : $300 \\times 2^6 = 300 \\times 64 = 19\\,200 = 1{,}92 \\times 10^4$ bactéries."
          },
          {
            n: "3.", points: 2,
            texte: "Au bout de combien de temps le nombre de bactéries dépasse-t-il un million pour la première fois ?",
            indice: "On cherche le plus petit nombre $n$ de doublements tel que $300 \\times 2^n > 10^6$, c'est-à-dire $2^n > 3\\,333{,}…$",
            corrige: "Il faut $300 \\times 2^n > 1\\,000\\,000$, soit $2^n > 3\\,333{,}…$ Or $2^{11} = 2\\,048$ et $2^{12} = 4\\,096$ : il faut $12$ doublements, soit $12 \\times 20 = 240$ min $= 4$ h."
          },
          {
            n: "4.", points: 2,
            texte: "Avec l'approximation $2^{10} \\approx 10^3$, estime le nombre de bactéries au bout de $8$ heures.",
            indice: "En $8$ h, il y a $24$ doublements, et $2^{24} = 2^4 \\times 2^{10} \\times 2^{10}$.",
            corrige: "En $8$ h, il y a $24$ doublements : $300 \\times 2^{24} = 300 \\times 2^4 \\times \\left(2^{10}\\right)^2 \\approx 300 \\times 16 \\times 10^6 = 4\\,800 \\times 10^6$, soit environ $4{,}8 \\times 10^9$ bactéries.\n\nLa valeur exacte, $300 \\times 16\\,777\\,216 \\approx 5{,}0 \\times 10^9$, a bien le même ordre de grandeur."
          }
        ]
      }
    ]
  }
};
