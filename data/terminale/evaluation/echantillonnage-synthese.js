/*
  ENTRAÎNEMENT : Terminale maths complémentaires — chapitre 15, Échantillonnage et synthèse
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-echantillonnage.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths complémentaires.
  L'exercice 3 est une synthèse : échantillonnage (ch. 15), loi géométrique (ch. 10), puissances et probabilités (ch. 2).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-echantillonnage"] = {
  revisions: {
    intro: "L'échantillonnage en un coup d'œil : moyennes d'échantillons et écart type $\\dfrac{\\sigma}{\\sqrt{n}}$, repères $95\\,\\%$ et $99{,}7\\,\\%$, sondages et fourchette, biais. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Moyennes d'échantillons",
        texte: "Si $X$ a pour espérance $\\mu$ et pour écart type $\\sigma$, la moyenne $M_n$ d'un échantillon de taille $n$ a pour espérance $\\mu$ et pour écart type $\\dfrac{\\sigma}{\\sqrt{n}}$ : les moyennes fluctuent moins que les valeurs."
      },
      {
        titre: "Repères $95\\,\\%$ et $99{,}7\\,\\%$",
        texte:
          "Pour $n$ assez grand, l'écart $|M_n - \\mu|$ est :\n" +
          "- au plus $2\\dfrac{\\sigma}{\\sqrt{n}}$ pour environ $95\\,\\%$ des échantillons ;\n" +
          "- au plus $3\\dfrac{\\sigma}{\\sqrt{n}}$ pour environ $99{,}7\\,\\%$ d'entre eux."
      },
      {
        titre: "Fourchette d'un sondage",
        texte: "Avec la fréquence $f$ observée sur $n$ personnes tirées au hasard ($n \\geqslant 25$ et $0{,}2 \\leqslant f \\leqslant 0{,}8$), la fourchette au niveau de confiance $95\\,\\%$ est $\\left[f - \\dfrac{1}{\\sqrt{n}}\\,;f + \\dfrac{1}{\\sqrt{n}}\\right]$."
      },
      {
        titre: "Taille de l'échantillon",
        texte: "La fourchette a pour amplitude $\\dfrac{2}{\\sqrt{n}}$ : pour la diviser par $2$, il faut interroger $4$ fois plus de personnes."
      },
      {
        titre: "Biais",
        texte: "Si l'échantillon n'est pas tiré au hasard dans toute la population (biais de sélection), ou si la question oriente la réponse (biais de réponse), le résultat est faussé, même avec beaucoup de réponses."
      }
    ],
    pieges: [
      "Diviser par $n$ au lieu de $\\sqrt{n}$.",
      "Croire que doubler l'échantillon divise l'imprécision par $2$.",
      "Penser que la fourchette contient toujours la vraie proportion.",
      "Croire qu'un grand échantillon corrige un biais.",
      "Confondre l'écart type $\\sigma$ d'une valeur et l'écart type $\\dfrac{\\sigma}{\\sqrt{n}}$ d'une moyenne."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout) ; le dernier fait la synthèse de plusieurs chapitres. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Des plateaux d'œufs",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Dans un élevage de poules pondeuses, la masse d'un œuf, en grammes, est une variable aléatoire d'espérance $\\mu = 60$ et d'écart type $\\sigma = 5$. On prélève au hasard des plateaux de $n = 25$ œufs, et on note $M$ la masse moyenne des œufs d'un plateau.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $\\dfrac{\\sigma}{\\sqrt{n}}$. Que représente ce nombre ?",
            indice: "$\\sqrt{25} = 5$.",
            corrige: "$\\dfrac{\\sigma}{\\sqrt{n}} = \\dfrac{5}{5} = 1$ : c'est l'écart type de la masse moyenne $M$ d'un plateau. Les moyennes des plateaux fluctuent beaucoup moins que la masse d'un seul œuf, d'écart type $5$ g."
          },
          {
            n: "2.", points: 1.5,
            texte: "Dans quel intervalle se trouve la masse moyenne d'environ $95\\,\\%$ des plateaux ? Et d'environ $99{,}7\\,\\%$ des plateaux ?",
            indice: "Utilise $\\mu \\pm 2\\dfrac{\\sigma}{\\sqrt{n}}$, puis $\\mu \\pm 3\\dfrac{\\sigma}{\\sqrt{n}}$.",
            corrige: "Environ $95\\,\\%$ des plateaux ont une masse moyenne dans $[60 - 2\\,;60 + 2] = [58\\,;62]$, et environ $99{,}7\\,\\%$ dans $[57\\,;63]$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Un contrôleur trouve un plateau dont la masse moyenne est $56{,}8$ g. Que peut-il en penser ?",
            indice: "$56{,}8$ est-il dans l'intervalle à $99{,}7\\,\\%$ ?",
            corrige: "$56{,}8 < 57$ : cette moyenne est hors de l'intervalle qui contient environ $99{,}7\\,\\%$ des moyennes. Un tel écart n'arrive qu'environ $3$ fois sur $1\\,000$ par le seul hasard : le contrôleur peut soupçonner un changement (nourriture des poules, œufs d'un autre élevage…) et faire d'autres vérifications."
          },
          {
            n: "4.", points: 1.5,
            texte: "Combien d'œufs faudrait-il par échantillon pour qu'environ $95\\,\\%$ des moyennes soient à au plus $0{,}5$ g de $60$ g ?",
            indice: "Résous $2 \\times \\dfrac{5}{\\sqrt{n}} \\leqslant 0{,}5$.",
            corrige: "$2 \\times \\dfrac{5}{\\sqrt{n}} \\leqslant 0{,}5 \\iff \\dfrac{10}{\\sqrt{n}} \\leqslant 0{,}5 \\iff \\sqrt{n} \\geqslant 20 \\iff n \\geqslant 400$ : il faudrait au moins $400$ œufs par échantillon."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « Avec des plateaux de $100$ œufs au lieu de $25$, l'écart type des moyennes est divisé par $4$. » Justifie.",
            indice: "Calcule $\\dfrac{\\sigma}{\\sqrt{100}}$.",
            corrige: "**Faux.** $\\dfrac{5}{\\sqrt{100}} = 0{,}5$ : l'écart type passe de $1$ à $0{,}5$, il est divisé par $\\sqrt{4} = 2$ seulement."
          }
        ]
      },
      {
        titre: "Un sondage au lycée",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Le lycée veut connaître la proportion $p$ de ses élèves qui révisent avec des vidéos de maths en ligne. On interroge $400$ élèves tirés au hasard : $232$ répondent oui.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule la fréquence $f$ observée, puis la fourchette au niveau de confiance $95\\,\\%$. Rédige la conclusion.",
            indice: "La fourchette est $\\left[f - \\dfrac{1}{\\sqrt{n}}\\,;f + \\dfrac{1}{\\sqrt{n}}\\right]$, utilisable car $n \\geqslant 25$ et $0{,}2 \\leqslant f \\leqslant 0{,}8$.",
            corrige: "$f = \\dfrac{232}{400} = 0{,}58$ et $\\dfrac{1}{\\sqrt{400}} = 0{,}05$, donc la fourchette est $[0{,}53\\,;0{,}63]$.\n\nAu niveau de confiance $95\\,\\%$, entre $53\\,\\%$ et $63\\,\\%$ des élèves du lycée révisent avec des vidéos de maths en ligne."
          },
          {
            n: "2.", points: 1.5,
            texte: "Un club affirme que « plus de la moitié des élèves » révisent ainsi. Le sondage va-t-il dans ce sens ?",
            indice: "Compare la fourchette et $0{,}5$.",
            corrige: "Toute la fourchette $[0{,}53\\,;0{,}63]$ est au-dessus de $0{,}5$ : au niveau de confiance $95\\,\\%$, le sondage va dans le sens du club. Ce n'est pas une certitude : dans environ $5\\,\\%$ des sondages, la fourchette ne contient pas la vraie proportion."
          },
          {
            n: "3.", points: 1.5,
            texte: "Combien d'élèves faudrait-il interroger pour obtenir une fourchette d'amplitude $0{,}04$ ? Est-ce réaliste dans un lycée de $1\\,800$ élèves ?",
            indice: "L'amplitude de la fourchette est $\\dfrac{2}{\\sqrt{n}}$.",
            corrige: "$\\dfrac{2}{\\sqrt{n}} \\leqslant 0{,}04 \\iff \\sqrt{n} \\geqslant 50 \\iff n \\geqslant 2\\,500$. C'est plus que les $1\\,800$ élèves du lycée : il vaudrait mieux interroger tout le monde, et ce ne serait plus un sondage."
          },
          {
            n: "4.", points: 1.5,
            texte: "Un autre sondage a été fait en publiant la question sous une vidéo d'une chaîne de maths : $900$ élèves ont répondu, dont $91\\,\\%$ ont dit oui. Pourquoi ce résultat n'est-il pas fiable, malgré le grand nombre de réponses ?",
            indice: "Qui voit cette question, et donc qui y répond ?",
            corrige: "Les élèves qui répondent sont justement ceux qui regardent des vidéos de maths : l'échantillon n'est pas tiré au hasard parmi tous les élèves. C'est un **biais de sélection**, qui surestime la proportion. Un grand nombre de réponses ne corrige pas un biais."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « La vraie proportion $p$ est forcément dans la fourchette $[0{,}53\\,;0{,}63]$. » Justifie.",
            indice: "Que veut dire « niveau de confiance $95\\,\\%$ » ?",
            corrige: "**Faux.** Le niveau de confiance $95\\,\\%$ signifie que, pour environ $95\\,\\%$ des échantillons possibles, la fourchette obtenue contient $p$. Notre échantillon peut faire partie des $5\\,\\%$ restants."
          }
        ]
      },
      {
        titre: "Synthèse : le contrôle d'une usine",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Une usine remplit des bouteilles d'eau. Quand la machine est bien réglée, le volume d'une bouteille, en mL, a pour espérance $\\mu = 1\\,500$ et pour écart type $\\sigma = 6$. Chaque heure, on prélève au hasard $n = 36$ bouteilles et on calcule leur volume moyen $M$. Si $M$ sort de l'intervalle $\\left[\\mu - 3\\dfrac{\\sigma}{\\sqrt{n}}\\,;\\mu + 3\\dfrac{\\sigma}{\\sqrt{n}}\\right]$, on arrête la machine pour la régler.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule cet intervalle. Une heure, on trouve $M = 1\\,496{,}2$ mL : que fait-on ?",
            indice: "$\\sqrt{36} = 6$.",
            corrige: "$\\dfrac{\\sigma}{\\sqrt{n}} = \\dfrac{6}{6} = 1$, donc l'intervalle est $[1\\,497\\,;1\\,503]$. Comme $1\\,496{,}2 < 1\\,497$, on arrête la machine pour la régler."
          },
          {
            n: "2.", points: 1.5,
            texte: "Même bien réglée, la machine donne une moyenne hors de l'intervalle dans environ $0{,}3\\,\\%$ des contrôles : c'est une fausse alerte. On admet que les contrôles sont indépendants, avec la probabilité $0{,}003$ de fausse alerte. Sur une journée de $10$ contrôles, quelle est la probabilité d'avoir au moins une fausse alerte ?",
            indice: "L'événement contraire est « aucune fausse alerte en $10$ contrôles ».",
            corrige: "La probabilité de n'avoir aucune fausse alerte en $10$ contrôles indépendants est $0{,}997^{10}$. Celle d'en avoir au moins une est donc $1 - 0{,}997^{10} \\approx 0{,}030$, soit environ $3\\,\\%$ des journées."
          },
          {
            n: "3.", points: 1.5,
            texte: "On note $T$ le rang du premier contrôle qui donne une fausse alerte. Quelle est la loi de $T$ ? Combien de contrôles a-t-on en moyenne jusqu'à la première fausse alerte ? Combien de journées de $10$ contrôles cela fait-il ?",
            indice: "On répète une épreuve de Bernoulli de paramètre $0{,}003$ jusqu'au premier succès.",
            corrige: "Les contrôles sont des épreuves de Bernoulli indépendantes, de « succès » la fausse alerte : $T$ suit la loi géométrique de paramètre $0{,}003$. En moyenne, $E(T) = \\dfrac{1}{0{,}003} \\approx 333$ contrôles, soit environ $33$ journées."
          },
          {
            n: "4.", points: 1.5,
            texte: "Avec l'intervalle $\\left[\\mu - 2\\dfrac{\\sigma}{\\sqrt{n}}\\,;\\mu + 2\\dfrac{\\sigma}{\\sqrt{n}}\\right]$, une machine bien réglée donne une fausse alerte dans environ $5\\,\\%$ des contrôles. Calcule alors la probabilité d'au moins une fausse alerte par journée. Pourquoi l'usine préfère-t-elle l'intervalle à $3\\dfrac{\\sigma}{\\sqrt{n}}$ ?",
            indice: "Même calcul qu'à la question 2, avec $0{,}95$ au lieu de $0{,}997$.",
            corrige: "$1 - 0{,}95^{10} \\approx 0{,}401$ : environ $40\\,\\%$ des journées auraient au moins une fausse alerte, avec des arrêts inutiles de la machine. L'intervalle à $3\\dfrac{\\sigma}{\\sqrt{n}}$ en provoque bien moins (environ $3\\,\\%$ des journées), tout en repérant les gros dérèglements."
          }
        ]
      }
    ]
  }
};
