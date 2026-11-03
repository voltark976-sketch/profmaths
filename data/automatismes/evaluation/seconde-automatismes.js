/*
  ENTRAÎNEMENT : Automatismes de Seconde (toute l'année)
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-automatismes (cours : data/seconde/automatismes.js).
  Format : voir data/automatismes/evaluation/calcul-numerique.js : une série mélangée qui reprend les parties P1 à P10,
  puis deux exercices qui croisent plusieurs automatismes. Données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["seconde-automatismes"] = {
  revisions: {
    intro: "Les automatismes de Seconde en un coup d'œil : fractions et puissances, unités, calcul littéral, équations, pourcentages, fonctions, géométrie, statistiques et probabilités. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Fractions et puissances",
        texte: "On réduit au même dénominateur pour additionner ; diviser par une fraction, c'est multiplier par son inverse. $a^m \\times a^n = a^{m+n}$ et $a^{-n} = \\dfrac{1}{a^n}$."
      },
      {
        titre: "Unités",
        texte: "Aires : $\\times 100$ d'une unité à la suivante ; volumes : $\\times 1\\,000$, avec $1$ dm³ $= 1$ L. Durées : $0{,}1$ h $= 6$ min et $0{,}25$ h $= 15$ min."
      },
      {
        titre: "Calcul littéral",
        texte: "$(a + b)^2 = a^2 + 2ab + b^2$, $(a - b)^2 = a^2 - 2ab + b^2$ et $(a + b)(a - b) = a^2 - b^2$. Pour factoriser, on cherche un facteur commun, sinon une identité."
      },
      {
        titre: "Équations et pourcentages",
        texte: "On regroupe les $x$ d'un côté et les nombres de l'autre. Augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$ ; baisser de $t\\,\\%$, par $1 - \\dfrac{t}{100}$."
      },
      {
        titre: "Fonctions",
        texte: "$M(x\\,;y)$ est sur la courbe de $f$ si $y = f(x)$. Une fonction affine $f(x) = mx + p$ a pour courbe une droite de coefficient directeur $m$."
      },
      {
        titre: "Géométrie",
        texte: "Pythagore : dans un triangle rectangle, le carré de l'hypoténuse est la somme des carrés des deux autres côtés. Trigonométrie : $\\cos = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$."
      },
      {
        titre: "Statistiques et probabilités",
        texte: "Médiane : on range les valeurs, puis on prend celle du milieu (ou la moyenne des deux du milieu). En situation d'équiprobabilité : $P(A) = \\dfrac{\\text{issues favorables}}{\\text{issues possibles}}$."
      }
    ],
    pieges: [
      "$\\dfrac{a}{b} + \\dfrac{c}{d} \\neq \\dfrac{a + c}{b + d}$ : on réduit d'abord au même dénominateur.",
      "$(a + b)^2 \\neq a^2 + b^2$ : il manque le double produit $2ab$.",
      "$1$ h $30$ min $= 1{,}5$ h et non $1{,}3$ h ; $1$ m² $= 100$ dm² et non $10$ dm².",
      "$x^2 = 9$ a **deux** solutions : $3$ et $-3$.",
      "Diminuer de $20\\,\\%$, c'est multiplier par $0{,}8$ et non par $0{,}2$.",
      "Pour la médiane, on **range** les valeurs avant de chercher le milieu."
    ]
  },

  evaluation: {
    intro: "Une série d'automatismes qui reprend toutes les parties de l'année, puis deux exercices qui en croisent plusieurs, **sans calculatrice** (environ $55$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Automatismes",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Pour chaque question, écris seulement le résultat, sans justification. Les résultats en fraction sont à donner sous forme irréductible.",
        questions: [
          { n: "1.", points: 0.5, texte: "Calcule $\\dfrac{5}{8} - \\dfrac{1}{6}$ (résultat en fraction).", corrige: "$\\dfrac{15}{24} - \\dfrac{4}{24} = \\dfrac{11}{24}$." },
          { n: "2.", points: 0.5, texte: "Écris $\\dfrac{10^{-3} \\times 10^5}{10^4}$ sous forme décimale.", corrige: "$10^{-3 + 5 - 4} = 10^{-2} = 0{,}01$." },
          { n: "3.", points: 0.5, texte: "Écris $1{,}2$ h en heures et minutes.", corrige: "$0{,}2$ h $= 0{,}2 \\times 60 = 12$ min : $1$ h $12$ min." },
          { n: "4.", points: 0.5, texte: "Développe $(2x + 5)^2$.", corrige: "$4x^2 + 20x + 25$." },
          { n: "5.", points: 0.5, texte: "Factorise $16x^2 - 49$.", corrige: "$(4x)^2 - 7^2 = (4x - 7)(4x + 7)$." },
          { n: "6.", points: 0.5, texte: "Résous $4(x - 2) = x + 7$.", corrige: "$4x - 8 = x + 7$, donc $3x = 15$ et $x = 5$." },
          { n: "7.", points: 0.5, texte: "Un vélo à $250$ € baisse de $12\\,\\%$. Quel est son nouveau prix ?", corrige: "$250 \\times 0{,}88 = 220$ €." },
          { n: "8.", points: 0.5, texte: "Calcule l'image de $-1$ par la fonction $f(x) = -x^2 + 4x$.", corrige: "$f(-1) = -1 - 4 = -5$." },
          { n: "9.", points: 0.5, texte: "Quel est le volume d'un cube d'arête $5$ cm ?", corrige: "$5^3 = 125$ cm³." },
          { n: "10.", points: 0.5, texte: "$ABC$ est rectangle en $A$, avec $AB = 6$ et $BC = 12$. Quelle est la mesure de l'angle $\\widehat{ABC}$ ?", corrige: "$\\cos \\widehat{ABC} = \\dfrac{AB}{BC} = \\dfrac{6}{12} = \\dfrac{1}{2}$, donc $\\widehat{ABC} = 60^\\circ$." },
          { n: "11.", points: 0.5, texte: "Donne la médiane de la série $14$ ; $3$ ; $9$ ; $11$ ; $6$ ; $20$.", corrige: "Rangée : $3$ ; $6$ ; $9$ ; $11$ ; $14$ ; $20$. La médiane vaut $\\dfrac{9 + 11}{2} = 10$." },
          { n: "12.", points: 0.5, texte: "Une urne contient $3$ boules rouges et $7$ boules noires. On en tire une au hasard. Quelle est la probabilité de tirer une boule rouge ?", corrige: "$\\dfrac{3}{10} = 0{,}3$." }
        ]
      },
      {
        titre: "Le jardin partagé",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Une association aménage un jardin partagé rectangulaire de $12$ m sur $9$ m.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule l'aire et le périmètre du jardin. Le grillage coûte $4{,}50$ € le mètre : combien coûte la clôture du jardin ?",
            indice: "Périmètre : $2(L + \\ell)$. Pour le prix, $4{,}50 = 4 + 0{,}5$.",
            corrige: "Aire : $12 \\times 9 = 108$ m². Périmètre : $2 \\times (12 + 9) = 42$ m. Clôture : $42 \\times 4{,}50 = 168 + 21 = 189$ €."
          },
          {
            n: "2.", points: 1.5,
            texte: "$40\\,\\%$ de la surface est réservée aux légumes. Quelle aire cela représente-t-il ?",
            indice: "$10\\,\\%$ de $108$, c'est $10{,}8$.",
            corrige: "$0{,}4 \\times 108 = 43{,}2$ m²."
          },
          {
            n: "3.", points: 2,
            texte: "Chaque mètre carré de légumes demande $5$ L d'eau par jour. Le réservoir de l'association contient $1{,}5$ m³. Pendant combien de jours entiers peut-on arroser les légumes sans le remplir à nouveau ?",
            indice: "Convertis $1{,}5$ m³ en litres, puis calcule la consommation d'une journée.",
            corrige: "Consommation : $43{,}2 \\times 5 = 216$ L par jour. Le réservoir contient $1\\,500$ L, et $\\dfrac{1\\,500}{216} \\approx 6{,}9$ : on peut arroser pendant $6$ jours entiers ($6 \\times 216 = 1\\,296$ L, alors que $7$ jours demanderaient $1\\,512$ L)."
          },
          {
            n: "4.", points: 2,
            texte: "On trace une allée en ligne droite d'un coin du jardin au coin opposé. Quelle est sa longueur ? On plante un piquet tous les $1{,}5$ m le long de cette allée, aux deux extrémités comprises : combien en faut-il ?",
            indice: "L'allée est l'hypoténuse d'un triangle rectangle de côtés $12$ m et $9$ m. Pour les piquets, compte les intervalles.",
            corrige: "D'après le théorème de Pythagore, la longueur $d$ vérifie $d^2 = 12^2 + 9^2 = 144 + 81 = 225$, donc $d = 15$ m.\n\n$\\dfrac{15}{1{,}5} = 10$ intervalles, donc $10 + 1 = 11$ piquets."
          }
        ]
      },
      {
        titre: "La facture d'électricité",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Chaque mois, un foyer paie un abonnement de $15$ € et $0{,}20$ € par kilowattheure (kWh) consommé. On note $f(x)$ le montant de la facture, en euros, pour une consommation de $x$ kWh.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Exprime $f(x)$ en fonction de $x$, puis calcule la facture pour une consommation de $250$ kWh.",
            indice: "Abonnement, plus le prix de chaque kWh multiplié par la consommation.",
            corrige: "$f(x) = 0{,}2x + 15$ (une fonction affine), et $f(250) = 50 + 15 = 65$ €."
          },
          {
            n: "2.", points: 1.5,
            texte: "Un mois, la facture s'élève à $95$ €. Quelle a été la consommation ?",
            indice: "Résous $0{,}2x + 15 = 95$.",
            corrige: "$0{,}2x + 15 = 95 \\iff 0{,}2x = 80 \\iff x = 400$ kWh."
          },
          {
            n: "3.", points: 2,
            texte: "Le prix du kWh augmente de $10\\,\\%$, l'abonnement ne change pas. Quelle est la nouvelle facture pour $250$ kWh ? De quel pourcentage la facture a-t-elle augmenté ? Pourquoi n'est-ce pas $10\\,\\%$ ?",
            indice: "Nouveau prix : $0{,}20 \\times 1{,}1 = 0{,}22$ €. Taux d'évolution : $\\dfrac{\\text{nouvelle} - \\text{ancienne}}{\\text{ancienne}}$.",
            corrige: "Nouvelle facture : $15 + 0{,}22 \\times 250 = 15 + 55 = 70$ €. Taux d'évolution : $\\dfrac{70 - 65}{65} = \\dfrac{5}{65} = \\dfrac{1}{13} \\approx 7{,}7\\,\\%$.\n\nSeule la partie « consommation » ($50$ €) augmente de $10\\,\\%$ ; l'abonnement de $15$ € ne change pas, donc la facture augmente moins."
          },
          {
            n: "4.", points: 2,
            texte: "Avec le nouveau prix, jusqu'à quelle consommation entière la facture reste-t-elle strictement inférieure à $60$ € ?",
            indice: "Résous l'inéquation $0{,}22x + 15 < 60$.",
            corrige: "$0{,}22x + 15 < 60 \\iff 0{,}22x < 45 \\iff x < \\dfrac{45}{0{,}22} \\approx 204{,}5$. La facture reste sous $60$ € jusqu'à $204$ kWh : $0{,}22 \\times 204 + 15 = 59{,}88$ €, alors que $205$ kWh coûtent $60{,}10$ €."
          }
        ]
      }
    ]
  }
};
