/*
  ENTRAÎNEMENT : Seconde — chapitre 16, Statistiques 2 et échantillonnage
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-statistiques-2.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle ou devoir commun de Seconde.
  Programme 2026 : fluctuation et loi des grands nombres observées par simulation, sans intervalle de fluctuation
  ni prise de décision. Les fréquences de l'exercice 2 viennent de vraies simulations (voir la vérification).
  Données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["seconde-statistiques-2"] = {
  revisions: {
    intro: "Les classes et l'échantillonnage en un coup d'œil : histogramme, moyenne avec les centres, fréquences cumulées et médiane, simulation, fluctuation et loi des grands nombres. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Classes et histogramme",
        texte: "On regroupe les valeurs en classes $[a\\,;b[$ de même amplitude $b - a$. Dans l'histogramme, chaque classe est un rectangle ; avec des classes de même amplitude, la **hauteur** donne l'effectif."
      },
      {
        titre: "Moyenne avec les centres",
        texte: "On remplace chaque valeur par le centre de sa classe, $\\dfrac{a + b}{2}$, puis on fait la moyenne pondérée par les effectifs. Le résultat est une **estimation** de la moyenne."
      },
      {
        titre: "Fréquences cumulées",
        texte: "L'effectif cumulé croissant d'une classe compte les valeurs inférieures à sa borne de droite. Le polygone des fréquences cumulées relie les points (borne de droite ; fréquence cumulée)."
      },
      {
        titre: "Médiane d'une série en classes",
        texte: "La classe médiane est la première dont la fréquence cumulée atteint $50\\,\\%$. En supposant les valeurs réparties régulièrement dans la classe, on estime la médiane par proportionnalité, ou sur le polygone."
      },
      {
        titre: "Simuler",
        texte: "$\\texttt{random()}$ donne un nombre au hasard dans $[0\\,;1[$ et $\\texttt{randint(1, 6)}$ un lancer de dé. En répétant une expérience, on obtient une série dont on calcule les fréquences."
      },
      {
        titre: "Fluctuation d'échantillonnage",
        texte: "Deux échantillons de même taille donnent des fréquences différentes. Plus l'échantillon est **petit**, plus les fréquences varient : on ne conclut rien sur $10$ ou $20$ essais."
      },
      {
        titre: "Loi des grands nombres",
        texte: "Quand on répète une expérience un très grand nombre de fois, la fréquence d'une issue se rapproche de sa probabilité. Le hasard n'a pas de mémoire : chaque essai repart de zéro."
      }
    ],
    pieges: [
      "Prendre une borne de classe au lieu du centre pour la moyenne.",
      "Oublier de diviser par l'effectif total.",
      "Confondre la classe médiane et la classe de plus grand effectif.",
      "Croire qu'après plusieurs « pile », « face » est plus probable : le hasard n'a pas de mémoire.",
      "Conclure qu'une pièce est truquée à partir de $10$ lancers.",
      "Lire l'effectif sur la largeur d'un rectangle au lieu de sa hauteur."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle ou au devoir commun (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le temps passé sur le téléphone",
        duree: 25, points: 7, calculatrice: true,
        contexte: "On a demandé à $50$ élèves combien de temps, en heures, ils passent chaque jour sur leur téléphone (données fictives). L'histogramme donne les effectifs des classes $[0\\,;1[$, $[1\\,;2[$, $[2\\,;3[$, $[3\\,;4[$ et $[4\\,;5[$.",
        figure: (o) => o.graph({
          xmin: -0.3, xmax: 5.6, ymin: 0, ymax: 18, xstep: 1, ystep: 2, h: 260, padL: 24,
          rects: [{ a: 0, b: 1, h: 4 }, { a: 1, b: 2, h: 9 }, { a: 2, b: 3, h: 16 }, { a: 3, b: 4, h: 13 }, { a: 4, b: 5, h: 8 }],
          xlabel: "durée (h)", ylabel: "effectif",
          aria: "Histogramme : 4 élèves de 0 à 1 h, 9 de 1 à 2 h, 16 de 2 à 3 h, 13 de 3 à 4 h, 8 de 4 à 5 h"
        }),
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Lis l'effectif de chaque classe. Quelle proportion des élèves passe au moins $3$ heures par jour sur son téléphone ?",
            indice: "L'effectif se lit sur la **hauteur** de chaque rectangle. « Au moins $3$ heures » : les classes $[3\\,;4[$ et $[4\\,;5[$.",
            corrige: "Les effectifs sont $4$, $9$, $16$, $13$ et $8$ (total $50$). Au moins $3$ heures : $13 + 8 = 21$ élèves, soit $\\dfrac{21}{50} = 0{,}42 = 42\\,\\%$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Estime la durée moyenne avec les centres des classes. Donne le résultat en heures, puis en heures et minutes.",
            indice: "Les centres sont $0{,}5$ ; $1{,}5$ ; $2{,}5$ ; $3{,}5$ et $4{,}5$. Multiplie chaque centre par l'effectif, additionne, puis divise par $50$.",
            corrige: "Les produits centre fois effectif valent $4 \\times 0{,}5 = 2$ ; $9 \\times 1{,}5 = 13{,}5$ ; $16 \\times 2{,}5 = 40$ ; $13 \\times 3{,}5 = 45{,}5$ et $8 \\times 4{,}5 = 36$, soit $137$ en tout. La moyenne est environ $\\dfrac{137}{50} = 2{,}74$ h, soit $2$ h $44$ min environ ($0{,}74 \\times 60 \\approx 44$)."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule les effectifs cumulés croissants, puis les fréquences cumulées croissantes.",
            indice: "On ajoute les effectifs classe après classe ; puis on divise par $50$.",
            corrige: "Effectifs cumulés : $4$, $13$, $29$, $42$, $50$. Fréquences cumulées : $8\\,\\%$, $26\\,\\%$, $58\\,\\%$, $84\\,\\%$, $100\\,\\%$.",
            tableauCorrige: { lignes: [["\\text{Classe}", "\\text{Eff. cumulé}", "\\text{Fréq. cumulée}"], ["[0\\,;1[", "4", "8\\,\\%"], ["[1\\,;2[", "13", "26\\,\\%"], ["[2\\,;3[", "29", "58\\,\\%"], ["[3\\,;4[", "42", "84\\,\\%"], ["[4\\,;5[", "50", "100\\,\\%"]] }
          },
          {
            n: "4.", points: 1.5,
            texte: "Quelle est la classe médiane ? Estime la médiane, en supposant les durées réparties régulièrement dans cette classe.",
            indice: "C'est la première classe où la fréquence cumulée atteint $50\\,\\%$. Dans cette classe, on passe de $26\\,\\%$ à $58\\,\\%$ : combien manque-t-il pour atteindre $50\\,\\%$ ?",
            corrige: "La fréquence cumulée atteint $50\\,\\%$ dans $[2\\,;3[$ : c'est la classe médiane. Il manque $50 - 26 = 24$ points sur les $58 - 26 = 32$ de la classe, donc $Me \\approx 2 + \\dfrac{24}{32} \\times 1 = 2{,}75$ h."
          },
          {
            n: "5.", points: 1,
            texte: "Un élève dit : « la durée moyenne est $2{,}5$ h, le centre de la classe qui a le plus grand effectif ». Explique son erreur.",
            indice: "La moyenne tient-elle compte de toutes les classes ?",
            corrige: "La classe la plus fréquente ne donne pas la moyenne : il faut tenir compte de toutes les classes, chacune avec son effectif. Ici, beaucoup d'élèves sont au-dessus de $3$ h, ce qui tire la moyenne vers le haut : environ $2{,}74$ h."
          }
        ]
      },
      {
        titre: "Les graines qui germent",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Un producteur affirme que chacune de ses graines de brèdes germe avec une probabilité de $0{,}8$. On simule des sachets de $n$ graines avec la fonction ci-dessous, qui renvoie une fréquence de germination.\n\n" +
          "```python\nfrom random import random\n\ndef echantillon(n):\n    c = 0\n    for k in range(n):\n        if random() < 0.8:\n            c = c + 1\n    return c / n\n```\n\n" +
          "Voici les fréquences obtenues pour cinq sachets de $20$ graines, puis cinq sachets de $500$ graines.",
        tableau: { lignes: [["\\text{Sachet}", "1", "2", "3", "4", "5"], ["n = 20", "0{,}9", "0{,}8", "0{,}7", "0{,}7", "0{,}6"], ["n = 500", "0{,}792", "0{,}804", "0{,}822", "0{,}79", "0{,}798"]] },
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Que compte la variable $\\texttt{c}$ ? Que renvoie $\\texttt{echantillon(20)}$ ?",
            indice: "$\\texttt{random() < 0.8}$ est vrai avec la probabilité $0{,}8$ : il simule une graine qui germe.",
            corrige: "La boucle simule $n$ graines ; $\\texttt{c}$ compte celles qui germent. $\\texttt{echantillon(20)}$ renvoie la fréquence de germination d'un sachet de $20$ graines simulé : un résultat au hasard, différent à chaque exécution."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule l'étendue des cinq fréquences pour $n = 20$, puis pour $n = 500$. Que remarques-tu ?",
            indice: "Étendue : la plus grande valeur moins la plus petite.",
            corrige: "Pour $n = 20$ : $0{,}9 - 0{,}6 = 0{,}3$. Pour $n = 500$ : $0{,}822 - 0{,}79 = 0{,}032$. Les fréquences fluctuent beaucoup moins avec des sachets plus grands : c'est la fluctuation d'échantillonnage, plus forte pour les petits échantillons."
          },
          {
            n: "3.", points: 1.5,
            texte: "D'après la loi des grands nombres, vers quelle valeur les fréquences devraient-elles se rapprocher quand $n$ devient très grand ? Combien de graines devraient germer environ sur $100\\,000$ ?",
            indice: "La fréquence se rapproche de la probabilité.",
            corrige: "Les fréquences se rapprochent de la probabilité $0{,}8$. Sur $100\\,000$ graines, environ $0{,}8 \\times 100\\,000 = 80\\,000$ devraient germer."
          },
          {
            n: "4.", points: 1.5,
            texte: "Ali sème $20$ graines du producteur : $13$ germent. Il en conclut que le producteur ment. A-t-il raison ?",
            indice: "Calcule la fréquence observée et compare-la aux simulations de sachets de $20$ graines.",
            corrige: "La fréquence observée est $\\dfrac{13}{20} = 0{,}65$. Les simulations de sachets de $20$ graines avec une probabilité de $0{,}8$ donnent des fréquences de $0{,}6$ à $0{,}9$ : $0{,}65$ n'a rien d'étonnant. Avec si peu de graines, la fluctuation est trop forte pour conclure."
          },
          {
            n: "5.", points: 1,
            texte: "Pourquoi deux élèves qui exécutent $\\texttt{echantillon(500)}$ n'obtiennent-ils pas le même résultat ?",
            indice: "Que fait $\\texttt{random()}$ à chaque appel ?",
            corrige: "$\\texttt{random()}$ donne un nouveau nombre au hasard à chaque appel : chaque exécution simule un autre sachet. Les résultats diffèrent un peu (fluctuation), mais restent proches de $0{,}8$ pour $500$ graines."
          }
        ]
      },
      {
        titre: "Deux dés et le hasard",
        duree: 20, points: 6, calculatrice: true,
        contexte: "On lance deux dés équilibrés à six faces et on regarde la somme des deux résultats.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Avec une pièce équilibrée, Nassim a obtenu « pile » quatre fois de suite. Il pense que « face » est maintenant plus probable au cinquième lancer. A-t-il raison ?",
            indice: "La pièce se souvient-elle des lancers précédents ?",
            corrige: "Non : les lancers sont indépendants, le hasard n'a pas de mémoire. Au cinquième lancer, « pile » et « face » ont toujours chacun la probabilité $\\dfrac{1}{2}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Avec un tableau des $36$ issues équiprobables des deux dés, calcule la probabilité que la somme vaille $7$.",
            indice: "Une ligne par résultat du premier dé, une colonne par résultat du second : compte les cases où la somme vaut $7$.",
            corrige: "Les issues de somme $7$ sont $(1\\,;6)$, $(2\\,;5)$, $(3\\,;4)$, $(4\\,;3)$, $(5\\,;2)$ et $(6\\,;1)$ : $6$ issues sur $36$. La probabilité vaut $\\dfrac{6}{36} = \\dfrac{1}{6} \\approx 0{,}167$."
          },
          {
            n: "3.", points: 1.5,
            texte:
              "Que calcule la fonction $\\texttt{sept}$ ?\n\n" +
              "```python\nfrom random import randint\n\ndef sept(n):\n    c = 0\n    for i in range(n):\n        a = randint(1, 6)\n        b = randint(1, 6)\n        if a + b == 7:\n            c = c + 1\n    return c / n\n```",
            indice: "$\\texttt{a}$ et $\\texttt{b}$ simulent les deux dés. Que compte $\\texttt{c}$ ?",
            corrige: "Elle simule $n$ lancers des deux dés, compte ceux dont la somme vaut $7$ et renvoie leur fréquence."
          },
          {
            n: "4.", points: 1.5,
            texte: "De quelle valeur $\\texttt{sept(100000)}$ sera-t-il proche ? Et que peut-on dire de $\\texttt{sept(10)}$ ?",
            indice: "Loi des grands nombres pour la première ; fluctuation d'échantillonnage pour la seconde.",
            corrige: "Pour $100\\,000$ lancers, la fréquence sera très proche de la probabilité $\\dfrac{1}{6} \\approx 0{,}167$ (loi des grands nombres). Pour $10$ lancers, elle peut valoir $0$, $0{,}1$, $0{,}3$… : elle varie beaucoup d'une exécution à l'autre."
          }
        ]
      }
    ]
  }
};
