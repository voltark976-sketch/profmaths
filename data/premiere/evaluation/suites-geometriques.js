/*
  ENTRAÎNEMENT : Première spécialité — chapitre 6, Suites géométriques
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-suites-geometriques.
  Format : voir data/premiere/evaluation/second-degre-2.js. Sans calculatrice (épreuve anticipée) :
  raisons 2 et 0,5, puissances de 2 calculables de tête.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-suites-geometriques"] = {
  revisions: {
    intro: "Les suites géométriques en un coup d'œil : la raison, le terme général, les taux d'évolution, les sommes, la limite et le seuil. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Définition",
        texte: "$(u_n)$ est **géométrique de raison $q$** quand on multiplie toujours par $q$ pour passer d'un terme au suivant : pour tout $n$, $u_{n+1} = q \\times u_n$."
      },
      {
        titre: "Terme général",
        texte:
          "- $u_n = u_0 \\times q^n$ ;\n" +
          "- si la suite commence à $u_1$ : $u_n = u_1 \\times q^{n-1}$ ;\n" +
          "- entre deux rangs : $u_n = u_p \\times q^{n-p}$.\n\n" +
          "Seule la raison est à la puissance $n$ : $u_0 \\times q^n$, pas $(u_0 \\times q)^n$."
      },
      {
        titre: "Évolution à taux constant",
        texte:
          "- hausse de $t\\,\\%$ : on multiplie par $1 + \\dfrac{t}{100}$ ;\n" +
          "- baisse de $t\\,\\%$ : on multiplie par $1 - \\dfrac{t}{100}$.\n\n" +
          "Une baisse de $20\\,\\%$ par heure donne une suite géométrique de raison $q = 0{,}8$."
      },
      {
        titre: "Sens de variation",
        texte:
          "Pour $u_n = u_0 \\times q^n$ avec $u_0 > 0$ :\n\n" +
          "- $q > 1$ : suite croissante ;\n" +
          "- $0 < q < 1$ : suite décroissante ;\n" +
          "- $q < 0$ : les termes changent de signe à chaque rang.\n\n" +
          "Si $u_0 < 0$, les sens de variation s'inversent."
      },
      {
        titre: "Somme des puissances",
        texte:
          "Pour $q \\neq 1$ :\n\n" +
          "$1 + q + q^2 + \\dots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$.\n\n" +
          "Cette somme compte $n + 1$ termes. Par exemple, $1 + 2 + 4 + \\dots + 2^9 = 2^{10} - 1 = 1\\,023$."
      },
      {
        titre: "Limite",
        texte:
          "- $q > 1$ : $q^n$ dépasse n'importe quel nombre, limite $+\\infty$ ;\n" +
          "- $-1 < q < 1$ : $q^n$ se rapproche de $0$ ;\n" +
          "- $q = 1$ : $q^n = 1$ pour tout $n$.\n\n" +
          "Une suite qui tend vers $0$ n'est pas pour autant nulle : $500 \\times 0{,}8^n$ ne vaut jamais $0$."
      },
      {
        titre: "Seuil en Python",
        texte:
          "On répète tant que le seuil n'est pas atteint, puis on renvoie le **rang** :\n\n" +
          "```python\nu = 500\nn = 0\nwhile u >= 100:\n    u = 0.8 * u\n    n = n + 1\n```\n\n" +
          "À la fin, $\\texttt{n}$ est le premier rang où $u_n < 100$."
      },
      {
        titre: "Linéaire ou exponentielle ?",
        texte: "Croissance **linéaire** : on ajoute la même quantité (suite arithmétique). Croissance **exponentielle** : on multiplie par $q > 1$ (suite géométrique). Tôt ou tard, l'exponentielle dépasse toujours la linéaire."
      }
    ],
    pieges: [
      "Écrire $(u_0 \\times q)^n$ au lieu de $u_0 \\times q^n$.",
      "Prendre le taux pour la raison : une baisse de $20\\,\\%$ donne $q = 0{,}8$, pas $0{,}2$.",
      "Additionner des pourcentages successifs : $+5\\,\\%$ pendant $3$ ans, ce n'est pas $+15\\,\\%$.",
      "Oublier qu'une suite qui commence à $u_1$ a pour terme général $u_1 \\times q^{n-1}$.",
      "Se tromper dans le nombre de termes : $1 + q + \\dots + q^n$ en compte $n + 1$.",
      "Confondre, dans l'algorithme de seuil, le rang $n$ (ce qu'on cherche) et la valeur $u$ du terme."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "L'algue envahissante",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Une algue envahissante s'installe dans une baie du lagon. Au début de l'observation, elle couvre $3$ m², et sa surface double chaque semaine. On note $u_n$ la surface couverte, en m², au bout de $n$ semaines : $u_0 = 3$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $u_1$, $u_2$ et $u_3$.",
            indice: "Doubler, c'est multiplier par $2$.",
            corrige: "$u_1 = 2 \\times 3 = 6$, $u_2 = 2 \\times 6 = 12$ et $u_3 = 2 \\times 12 = 24$ (en m²)."
          },
          {
            n: "2.", points: 1,
            texte: "Quelle est la nature de la suite $(u_n)$ ? Exprime $u_n$ en fonction de $n$.",
            indice: "On passe d'un terme au suivant en multipliant toujours par le même nombre.",
            corrige: "Pour tout $n$, $u_{n+1} = 2u_n$ : $(u_n)$ est géométrique de raison $2$ et de premier terme $u_0 = 3$. Donc $u_n = 3 \\times 2^n$."
          },
          {
            n: "3.", points: 1,
            texte: "Quelle surface l'algue couvre-t-elle au bout de $6$ semaines ?",
            indice: "$2^6 = 64$.",
            corrige: "$u_6 = 3 \\times 2^6 = 3 \\times 64 = 192$ : l'algue couvre $192$ m² au bout de $6$ semaines."
          },
          {
            n: "4.", points: 1.5,
            texte: "Au bout de combien de semaines l'algue dépassera-t-elle $1\\,000$ m² ?",
            indice: "La suite est croissante : cherche le premier $n$ tel que $3 \\times 2^n > 1\\,000$ en calculant $u_8$ et $u_9$.",
            corrige:
              "La raison $2$ est supérieure à $1$ et $u_0 > 0$ : la suite est croissante. On calcule $u_8 = 3 \\times 256 = 768$ et $u_9 = 3 \\times 512 = 1\\,536$.\n\n" +
              "$u_8 \\leqslant 1\\,000 < u_9$ : l'algue dépassera $1\\,000$ m² au bout de $9$ semaines."
          },
          {
            n: "5.", points: 1.5,
            texte:
              "Complète ce programme Python pour qu'il affiche le nombre de semaines trouvé à la question 4.\n\n" +
              "```python\nu = 3\nn = 0\nwhile ...:\n    u = ...\n    n = n + 1\nprint(n)\n```",
            indice: "On continue tant que la surface ne dépasse pas $1\\,000$ ; à chaque tour, la surface double.",
            corrige:
              "```python\nu = 3\nn = 0\nwhile u <= 1000:\n    u = 2 * u\n    n = n + 1\nprint(n)\n```\n\n" +
              "La boucle s'arrête dès que $u > 1\\,000$, avec $\\texttt{n}$ égal au rang correspondant : le programme affiche $\\texttt{9}$."
          },
          {
            n: "6.", points: 1,
            texte: "Un autre modèle, linéaire, prévoit $v_n = 3 + 100n$ m² au bout de $n$ semaines. Compare $u_5$ et $v_5$, puis $u_{10}$ et $v_{10}$. Que constate-t-on ?",
            indice: "$2^5 = 32$ et $2^{10} = 1\\,024$.",
            corrige:
              "$u_5 = 3 \\times 32 = 96$ et $v_5 = 503$ : au début, le modèle linéaire donne plus. Mais $u_{10} = 3 \\times 1\\,024 = 3\\,072$ et $v_{10} = 1\\,003$.\n\n" +
              "La croissance exponentielle finit par dépasser largement la croissance linéaire : c'est pourquoi il faut agir vite contre une algue qui double chaque semaine."
          }
        ]
      },
      {
        titre: "La citerne de pluie",
        duree: 25, points: 7, calculatrice: false,
        contexte:
          "Une famille de Chirongui récupère l'eau de pluie dans une citerne qui contient $200$ L au départ. Chaque semaine, elle utilise la moitié de l'eau de la citerne, puis la pluie en ajoute $60$ L. On note $u_n$ le volume d'eau, en litres, au bout de $n$ semaines :\n\n" +
          "$u_0 = 200$ et, pour tout entier naturel $n$, $u_{n+1} = 0{,}5u_n + 60$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $u_1$ et $u_2$. La suite $(u_n)$ est-elle arithmétique ? géométrique ?",
            indice: "Compare les différences $u_1 - u_0$ et $u_2 - u_1$, puis les quotients $\\dfrac{u_1}{u_0}$ et $\\dfrac{u_2}{u_1}$.",
            corrige:
              "$u_1 = 0{,}5 \\times 200 + 60 = 160$ et $u_2 = 0{,}5 \\times 160 + 60 = 140$.\n\n" +
              "$u_1 - u_0 = -40$ et $u_2 - u_1 = -20$ : pas arithmétique. $\\dfrac{u_1}{u_0} = 0{,}8$ et $\\dfrac{u_2}{u_1} = 0{,}875$ : pas géométrique."
          },
          {
            n: "2.", points: 1.5,
            texte: "Pour tout $n$, on pose $v_n = u_n - 120$. Montre que la suite $(v_n)$ est géométrique de raison $0{,}5$ et donne $v_0$.",
            indice: "Écris $v_{n+1} = u_{n+1} - 120$, remplace $u_{n+1}$ par $0{,}5u_n + 60$, puis factorise par $0{,}5$.",
            corrige:
              "$v_{n+1} = u_{n+1} - 120 = 0{,}5u_n + 60 - 120 = 0{,}5u_n - 60 = 0{,}5(u_n - 120) = 0{,}5v_n$.\n\n" +
              "$(v_n)$ est donc géométrique de raison $0{,}5$, de premier terme $v_0 = 200 - 120 = 80$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Exprime $v_n$, puis $u_n$, en fonction de $n$.",
            indice: "$v_n = v_0 \\times q^n$, puis $u_n = v_n + 120$.",
            corrige: "$v_n = 80 \\times 0{,}5^n$, donc $u_n = v_n + 120 = 120 + 80 \\times 0{,}5^n$. Vérification : $u_1 = 120 + 40 = 160$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Étudie le sens de variation de la suite $(u_n)$.",
            indice: "Calcule $u_{n+1} - u_n$ avec la formule de la question 3, ou utilise la raison $0{,}5$ de $(v_n)$.",
            corrige:
              "$u_{n+1} - u_n = 80 \\times 0{,}5^{n+1} - 80 \\times 0{,}5^n = 80 \\times 0{,}5^n \\times (0{,}5 - 1) = -40 \\times 0{,}5^n$.\n\n" +
              "Ce nombre est strictement négatif pour tout $n$ : la suite $(u_n)$ est strictement décroissante. La citerne se vide peu à peu."
          },
          {
            n: "5.", points: 1.5,
            texte: "Conjecture la limite de $(u_n)$ et interprète-la. À partir de quelle semaine la citerne contient-elle moins de $121$ L ?",
            indice: "$0{,}5^n$ se rapproche de $0$. Puis $u_n < 121 \\iff 80 \\times 0{,}5^n < 1$, c'est-à-dire $2^n > 80$.",
            corrige:
              "$0{,}5^n$ se rapproche de $0$ quand $n$ devient grand ($-1 < 0{,}5 < 1$), donc $u_n$ se rapproche de $120$ : le volume se stabilise autour de $120$ L.\n\n" +
              "$u_n < 121 \\iff 80 \\times 0{,}5^n < 1 \\iff 2^n > 80$. Or $2^6 = 64$ et $2^7 = 128$ : la citerne contient moins de $121$ L à partir de la semaine $7$."
          }
        ]
      },
      {
        titre: "La légende de l'échiquier",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Selon une légende, l'inventeur des échecs demanda au roi $1$ grain de riz sur la première case de l'échiquier, $2$ sur la deuxième, $4$ sur la troisième, et ainsi de suite en doublant à chaque case, jusqu'à la $64$e. On note $g_n$ le nombre de grains sur la case $n$, pour $n$ de $1$ à $64$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Exprime $g_n$ en fonction de $n$. Combien de grains y a-t-il sur la case $10$ ?",
            indice: "La suite commence à $g_1 = 1$ et sa raison est $2$ : $g_n = g_1 \\times 2^{n-1}$.",
            corrige: "$(g_n)$ est géométrique de raison $2$ et $g_1 = 1$, donc $g_n = 2^{n-1}$. Sur la case $10$ : $g_{10} = 2^9 = 512$ grains."
          },
          {
            n: "2.", points: 1.5,
            texte: "Combien de grains y a-t-il en tout sur les $10$ premières cases ?",
            indice: "$1 + 2 + 4 + \\dots + 2^9$ : utilise la somme $1 + q + \\dots + q^n$ avec $q = 2$ et $n = 9$.",
            corrige: "$1 + 2 + \\dots + 2^9 = \\dfrac{1 - 2^{10}}{1 - 2} = \\dfrac{1 - 1\\,024}{-1} = 1\\,023$ grains."
          },
          {
            n: "3.", points: 1.5,
            texte: "Montre que, sur les $n$ premières cases, il y a en tout $2^n - 1$ grains.",
            indice: "La somme $1 + 2 + \\dots + 2^{n-1}$ compte $n$ termes : applique la formule avec l'exposant $n - 1$.",
            corrige: "$g_1 + g_2 + \\dots + g_n = 1 + 2 + \\dots + 2^{n-1} = \\dfrac{1 - 2^n}{1 - 2} = \\dfrac{1 - 2^n}{-1} = 2^n - 1$."
          },
          {
            n: "4.", points: 1,
            texte: "Vrai ou faux : « il y a plus de grains sur la case $11$ que sur les $10$ premières cases réunies ». Justifie.",
            indice: "Compare $g_{11}$ avec le résultat de la question 2.",
            corrige: "**Vrai.** $g_{11} = 2^{10} = 1\\,024$, et les $10$ premières cases en contiennent $1\\,023$ : une case de plus que toutes les précédentes réunies, à un grain près."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « la suite $(g_n)$, prolongée à tous les entiers $n \\geqslant 1$, est majorée ». Justifie avec la négation de « majorée ».",
            indice: "« Pas majorée » : pour tout réel $M$, il existe un rang $n$ tel que $g_n > M$.",
            corrige: "**Faux.** La raison $2$ est supérieure à $1$ : $2^{n-1}$ dépasse n'importe quel nombre. Pour tout réel $M$, il existe un rang $n$ tel que $g_n > M$ : la suite n'est pas majorée. Sur l'échiquier, la dernière case contiendrait déjà $2^{63}$ grains, bien plus que tout le riz du monde."
          }
        ]
      }
    ]
  }
};
