/*
  ENTRAÎNEMENT : Première technologique — chapitre 5, Suites numériques
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre techno-suites.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Notation u(n) du programme de première technologique.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["techno-suites"] = {
  revisions: {
    intro: "Les suites en un coup d'œil : formule explicite et récurrence, nuage de points, sens de variation, modélisation et seuil en Python. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Une suite",
        texte: "Une suite $(u(n))$ associe à chaque entier naturel $n$ un nombre $u(n)$, le **terme de rang $n$**. On note aussi $u_n$."
      },
      {
        titre: "Explicite ou récurrence",
        texte:
          "- formule explicite, comme $u(n) = 3n^2 + 1$ : on remplace $n$ par sa valeur ;\n" +
          "- récurrence, comme $u(0) = 5$ et $u(n + 1) = 2u(n) - 3$ : chaque terme se calcule à partir du précédent."
      },
      {
        titre: "Nuage de points",
        texte: "On représente une suite par les points de coordonnées $(n\\,;u(n))$, sans les relier : la suite n'existe que pour les entiers."
      },
      {
        titre: "Sens de variation",
        texte: "$(u(n))$ est croissante si $u(n + 1) \\geqslant u(n)$ pour tout $n$, décroissante si $u(n + 1) \\leqslant u(n)$. On étudie le signe de $u(n + 1) - u(n)$."
      },
      {
        titre: "Modéliser",
        texte: "Ajouter la même quantité $r$ à chaque étape : $u(n + 1) = u(n) + r$. Multiplier par le même nombre $q$ : $u(n + 1) = q \\times u(n)$. Baisser de $10\\,\\%$, c'est multiplier par $0{,}9$."
      },
      {
        titre: "Python : un seuil",
        texte: "Pour trouver le premier rang où $u$ dépasse $100$, la boucle $\\texttt{while u <= 100:}$ continue tant que le seuil n'est pas dépassé : la condition est celle qui fait **continuer**."
      }
    ],
    pieges: [
      "Confondre $u(n + 1)$, le terme suivant, et $u(n) + 1$, le terme augmenté de $1$.",
      "Dans une récurrence, remplacer $u(n)$ par $n$ au lieu du terme précédent.",
      "Se tromper dans le nombre d'étapes : de $u(0)$ à $u(5)$, il y en a $5$.",
      "Relier les points du nuage d'une suite.",
      "Conclure sur le sens de variation avec deux ou trois termes seulement.",
      "Dans un seuil, confondre le rang $n$ et la valeur $u(n)$."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Une suite définie par une formule",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On considère la suite $(u(n))$ définie pour tout entier naturel $n$ par $u(n) = n^2 + 2n$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $u(0)$, $u(1)$ et $u(5)$.",
            indice: "Remplace $n$ par la valeur voulue, en calculant le carré d'abord.",
            corrige: "$u(0) = 0$, $u(1) = 1 + 2 = 3$ et $u(5) = 25 + 10 = 35$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Exprime $u(n + 1)$ en fonction de $n$, puis développe et réduis.",
            indice: "Remplace $n$ par $n + 1$, avec des parenthèses : $(n + 1)^2 + 2(n + 1)$.",
            corrige: "$u(n + 1) = (n + 1)^2 + 2(n + 1) = n^2 + 2n + 1 + 2n + 2 = n^2 + 4n + 3$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule $u(n + 1) - u(n)$, puis déduis-en le sens de variation de la suite.",
            indice: "Soustrais $n^2 + 2n$ à $n^2 + 4n + 3$.",
            corrige: "$u(n + 1) - u(n) = n^2 + 4n + 3 - (n^2 + 2n) = 2n + 3$. Pour tout entier naturel $n$, $2n + 3 > 0$ : la suite $(u(n))$ est croissante."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Qu'affiche ce programme ? Que représente ce nombre ?\n\n" +
              "```python\nn = 0\nu = 0\nwhile u <= 100:\n    n = n + 1\n    u = n**2 + 2*n\nprint(n)\n```",
            indice: "La boucle s'arrête dès que $u > 100$. Calcule $u(9)$ et $u(10)$.",
            corrige: "$u(9) = 81 + 18 = 99$, qui ne dépasse pas $100$, et $u(10) = 100 + 20 = 120$. La boucle s'arrête pour $n = 10$ : le programme affiche $\\texttt{10}$, le premier rang où $u(n)$ dépasse $100$."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « Pour tout entier naturel $n$, $u(n + 1) = u(n) + 1$. » Justifie.",
            indice: "Compare $u(1)$ et $u(0) + 1$.",
            corrige: "**Faux.** $u(1) = 3$, alors que $u(0) + 1 = 1$. $u(n + 1)$ est le terme suivant, pas le terme augmenté de $1$."
          }
        ]
      },
      {
        titre: "Les algues de l'étang",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Au début de la saison, un étang contient $100$ kg d'algues. Chaque semaine, les poissons en mangent la moitié, puis $40$ kg d'algues repoussent (modèle fictif). On note $u(n)$ la masse d'algues, en kg, au bout de $n$ semaines : $u(0) = 100$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $u(1)$, $u(2)$ et $u(3)$.",
            indice: "La moitié de $100$, puis on ajoute $40$.",
            corrige: "$u(1) = 50 + 40 = 90$, $u(2) = 45 + 40 = 85$ et $u(3) = 42{,}5 + 40 = 82{,}5$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Justifie que, pour tout entier naturel $n$, $u(n + 1) = 0{,}5\\,u(n) + 40$.",
            indice: "Garder la moitié, c'est multiplier par $0{,}5$.",
            corrige: "Après une semaine, il reste la moitié des $u(n)$ kg, soit $0{,}5\\,u(n)$, puis $40$ kg s'ajoutent : $u(n + 1) = 0{,}5\\,u(n) + 40$."
          },
          {
            n: "3.", points: 1.5,
            texte:
              "Que renvoie $\\texttt{terme(4)}$ ? Que calcule cette fonction ?\n\n" +
              "```python\ndef terme(n):\n    u = 100\n    for k in range(n):\n        u = 0.5 * u + 40\n    return u\n```",
            indice: "La boucle applique $n$ fois la relation de récurrence en partant de $100$.",
            corrige: "La boucle applique $4$ fois la relation : $90$, puis $85$, puis $82{,}5$, puis $0{,}5 \\times 82{,}5 + 40 = 81{,}25$. $\\texttt{terme(4)}$ renvoie $\\texttt{81.25}$ : la fonction calcule $u(n)$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Voici le nuage de points de la suite. Décris son allure. Quelle semble être la masse d'algues au bout de quelques mois ?",
            figure: (o) => o.graph({
              xmin: -0.5, xmax: 10.6, ymin: 70, ymax: 104, xstep: 1, ystep: 5, h: 230, padL: 30,
              xlabel: "n", ylabel: "u(n)",
              points: Array.from({ length: 11 }, (_, n) => ({ x: n, y: 80 + 20 / 2 ** n, label: n === 0 ? "100" : undefined, gauche: true })),
              aria: "Nuage des points (n ; u(n)) pour n de 0 à 10, avec un axe des ordonnées qui commence à 70 : 100, 90, 85, 82,5… les points descendent de moins en moins"
            }),
            indice: "Les points descendent-ils toujours ? Vers quelle valeur se rapprochent-ils ?",
            corrige: "Les points descendent de moins en moins : la suite semble décroissante, et ses termes se rapprochent de $80$. Au bout de quelques mois, il resterait environ $80$ kg d'algues."
          },
          {
            n: "5.", points: 1,
            texte: "Vérifie que si l'étang contient $80$ kg d'algues une semaine, il en contient encore $80$ kg la semaine suivante.",
            indice: "Calcule $0{,}5 \\times 80 + 40$.",
            corrige: "$0{,}5 \\times 80 + 40 = 40 + 40 = 80$ : la masse ne change plus. Les poissons mangent exactement ce qui repousse."
          }
        ]
      },
      {
        titre: "Deux plantes",
        duree: 25, points: 6, calculatrice: false,
        contexte: "Au départ, une plante $A$ mesure $10$ cm et grandit de $3$ cm par semaine. Une plante $B$ mesure $2$ cm et double de hauteur chaque semaine, pendant les premières semaines. On note $a(n)$ et $b(n)$ leurs hauteurs, en cm, au bout de $n$ semaines.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Exprime $a(n + 1)$ en fonction de $a(n)$ et $b(n + 1)$ en fonction de $b(n)$, puis donne une formule explicite de $a(n)$.",
            indice: "$A$ gagne $3$ cm chaque semaine ; $B$ est multipliée par $2$.",
            corrige: "$a(n + 1) = a(n) + 3$ et $b(n + 1) = 2\\,b(n)$, avec $a(0) = 10$ et $b(0) = 2$. Au bout de $n$ semaines, $A$ a gagné $3n$ cm : $a(n) = 10 + 3n$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Complète un tableau des hauteurs des deux plantes pour $n$ allant de $0$ à $5$.",
            indice: "Ajoute $3$ à chaque fois pour $A$, double à chaque fois pour $B$.",
            corrige: "On ajoute $3$ pour $A$ et on double pour $B$ :",
            tableauCorrige: { lignes: [["n", "0", "1", "2", "3", "4", "5"], ["a(n)", "10", "13", "16", "19", "22", "25"], ["b(n)", "2", "4", "8", "16", "32", "64"]] }
          },
          {
            n: "3.", points: 1.5,
            texte: "Au bout de combien de semaines la plante $B$ devient-elle plus haute que la plante $A$ ?",
            indice: "Cherche dans le tableau le premier $n$ tel que $b(n) > a(n)$.",
            corrige: "$b(3) = 16 < 19 = a(3)$, mais $b(4) = 32 > 22 = a(4)$ : la plante $B$ devient plus haute au bout de $4$ semaines."
          },
          {
            n: "4.", points: 1.5,
            texte: "Les points $(n\\,;a(n))$ sont alignés, mais pas les points $(n\\,;b(n))$. Explique pourquoi avec les écarts entre deux termes consécutifs.",
            indice: "Calcule $a(n + 1) - a(n)$, puis les écarts $b(1) - b(0)$, $b(2) - b(1)$…",
            corrige: "$a(n + 1) - a(n) = 3$ : à chaque pas de $1$ en abscisse, on monte toujours de $3$, donc les points sont alignés (croissance linéaire).\n\nPour $B$, les écarts valent $2$, $4$, $8$, $16$… : ils doublent, les points montent de plus en plus vite (croissance exponentielle)."
          }
        ]
      }
    ]
  }
};
