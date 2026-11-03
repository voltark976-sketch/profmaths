/*
  ENTRAÎNEMENT : Première spécialité — chapitre 3, Suites arithmétiques
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-suites-arithmetiques.
  Format : voir data/premiere/evaluation/second-degre-2.js. Sans calculatrice (épreuve anticipée).
  Les sommes se calculent avec 1 + 2 + … + n = n(n + 1)/2, comme dans le cours (pas d'autre formule).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-suites-arithmetiques"] = {
  revisions: {
    intro: "Les suites arithmétiques en un coup d'œil : la raison, le terme général, le sens de variation et les sommes. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Définition",
        texte: "$(u_n)$ est **arithmétique de raison $r$** quand on ajoute toujours $r$ pour passer d'un terme au suivant : pour tout $n$, $u_{n+1} = u_n + r$."
      },
      {
        titre: "Terme général",
        texte:
          "- $u_n = u_0 + nr$ ;\n" +
          "- si la suite commence à $u_1$ : $u_n = u_1 + (n - 1)r$ ;\n" +
          "- entre deux rangs : $u_n = u_p + (n - p)r$."
      },
      {
        titre: "Reconnaître une suite arithmétique",
        texte:
          "On calcule $u_{n+1} - u_n$ : si cette différence est une constante $r$, qui ne dépend pas de $n$, la suite est arithmétique de raison $r$.\n\n" +
          "Pour montrer qu'elle ne l'est pas : deux différences qui ne sont pas égales suffisent."
      },
      {
        titre: "Sens de variation",
        texte:
          "Les points $(n\\,;u_n)$ sont alignés : $u_n = u_0 + nr$ est une fonction affine de $n$.\n\n" +
          "- $r > 0$ : suite croissante ;\n" +
          "- $r < 0$ : suite décroissante ;\n" +
          "- $r = 0$ : suite constante."
      },
      {
        titre: "Somme des entiers",
        texte:
          "$1 + 2 + \\dots + n = \\dfrac{n(n + 1)}{2}$.\n\n" +
          "Par exemple, $1 + 2 + \\dots + 100 = \\dfrac{100 \\times 101}{2} = 5\\,050$."
      },
      {
        titre: "Somme de termes consécutifs",
        texte:
          "On sépare la partie constante et la partie qui augmente :\n\n" +
          "$40 + 46 + \\dots + 94 = 10 \\times 40 + 6 \\times (0 + 1 + \\dots + 9)$\n\n" +
          "soit $400 + 6 \\times 45 = 670$. Attention au nombre de termes : de $u_0$ à $u_9$, il y en a $10$."
      },
      {
        titre: "Python : une somme",
        texte:
          "Une variable $\\texttt{s}$ s'accumule à chaque tour de boucle :\n\n" +
          "```python\nu = 40\ns = 0\nfor i in range(10):\n    s = s + u\n    u = u + 6\n```\n\n" +
          "À la fin, $\\texttt{s}$ vaut $670$."
      }
    ],
    pieges: [
      "Écrire $u_n = u_1 + nr$ pour une suite qui commence à $u_1$ : c'est $u_1 + (n - 1)r$.",
      "Conclure qu'une suite est arithmétique en vérifiant seulement deux différences.",
      "Se tromper dans le nombre de termes d'une somme : de $u_0$ à $u_n$, il y en a $n + 1$.",
      "Confondre la raison $r$ (ce qu'on ajoute) et le premier terme.",
      "Écrire $\\dfrac{n^2}{2}$ au lieu de $\\dfrac{n(n + 1)}{2}$ pour $1 + 2 + \\dots + n$."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "La tribune du stade",
        duree: 25, points: 7, calculatrice: false,
        contexte: "La tribune d'un stade de Mayotte compte $20$ rangées. La première rangée, en bas, a $30$ places, et chaque rangée a $4$ places de plus que celle du dessous. On note $u_n$ le nombre de places de la rangée $n$, pour $n$ de $1$ à $20$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $u_2$ et $u_3$. Quelle est la nature de la suite $(u_n)$ ?",
            indice: "Chaque rangée a $4$ places de plus que la précédente : que fait-on pour passer de $u_n$ à $u_{n+1}$ ?",
            corrige: "$u_2 = 30 + 4 = 34$ et $u_3 = 34 + 4 = 38$. Pour tout $n$, $u_{n+1} = u_n + 4$ : la suite $(u_n)$ est arithmétique de raison $4$ et de premier terme $u_1 = 30$."
          },
          {
            n: "2.", points: 1,
            texte: "Exprime $u_n$ en fonction de $n$.",
            indice: "La suite commence à $u_1$ : $u_n = u_1 + (n - 1)r$.",
            corrige: "$u_n = u_1 + (n - 1) \\times 4 = 30 + 4n - 4 = 4n + 26$."
          },
          {
            n: "3.", points: 1,
            texte: "Combien de places la dernière rangée compte-t-elle ?",
            indice: "La dernière rangée est la rangée $20$.",
            corrige: "$u_{20} = 4 \\times 20 + 26 = 106$ : la dernière rangée compte $106$ places."
          },
          {
            n: "4.", points: 1,
            texte: "Quelle rangée compte exactement $70$ places ?",
            indice: "Résous l'équation $4n + 26 = 70$.",
            corrige: "$4n + 26 = 70 \\iff 4n = 44 \\iff n = 11$ : c'est la rangée $11$."
          },
          {
            n: "5.", points: 2,
            texte: "Calcule le nombre total de places de la tribune.",
            indice: "Chaque rangée compte $4n + 26$ places : regroupe les $4n$ d'un côté et les $26$ de l'autre, puis utilise $1 + 2 + \\dots + n = \\dfrac{n(n + 1)}{2}$.",
            corrige:
              "Chaque rangée compte $4n + 26$ places. La somme des $4n$ vaut $4 \\times (1 + 2 + \\dots + 20)$, et celle des $26$ vaut $20 \\times 26 = 520$.\n\n" +
              "Or $1 + 2 + \\dots + 20 = \\dfrac{20 \\times 21}{2} = 210$, donc le total vaut $4 \\times 210 + 520 = 840 + 520 = 1\\,360$ places."
          },
          {
            n: "6.", points: 1,
            texte:
              "Complète la fonction Python pour qu'elle renvoie le nombre de places des $n$ premières rangées. Que renvoie $\\texttt{places(20)}$ ?\n\n" +
              "```python\ndef places(n):\n    u = 30\n    s = 0\n    for i in range(n):\n        s = ...\n        u = ...\n    return s\n```",
            indice: "À chaque tour, on ajoute la rangée $u$ au total $s$, puis on passe à la rangée suivante.",
            corrige:
              "```python\ndef places(n):\n    u = 30\n    s = 0\n    for i in range(n):\n        s = s + u\n        u = u + 4\n    return s\n```\n\n" +
              "La boucle ajoute $u_1$, $u_2$, …, $u_n$ : $\\texttt{places(20)}$ renvoie $\\texttt{1360}$, comme à la question 5."
          }
        ]
      },
      {
        titre: "Deux offres d'emploi",
        duree: 25, points: 7, calculatrice: false,
        contexte:
          "Kamal hésite entre deux offres d'emploi à Mamoudzou.\n\n" +
          "- Offre A : $1\\,500$ € le premier mois, puis $30$ € de plus chaque mois.\n" +
          "- Offre B : $1\\,650$ € le premier mois, puis $20$ € de plus chaque mois.\n\n" +
          "On note $a_n$ et $b_n$ les salaires du mois $n$ avec chaque offre, pour $n \\geqslant 1$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $a_2$, $a_3$, $b_2$ et $b_3$.",
            indice: "On ajoute $30$ € chaque mois avec l'offre A, $20$ € avec l'offre B.",
            corrige: "$a_2 = 1\\,530$, $a_3 = 1\\,560$, $b_2 = 1\\,670$ et $b_3 = 1\\,690$ (en euros)."
          },
          {
            n: "2.", points: 1,
            texte: "Justifie que les suites $(a_n)$ et $(b_n)$ sont arithmétiques, puis exprime $a_n$ et $b_n$ en fonction de $n$.",
            indice: "Les deux suites commencent au rang $1$ : $u_n = u_1 + (n - 1)r$.",
            corrige: "Chaque mois, on ajoute la même somme : $(a_n)$ est arithmétique de raison $30$ et $(b_n)$ de raison $20$. Donc $a_n = 1\\,500 + 30(n - 1)$ et $b_n = 1\\,650 + 20(n - 1)$."
          },
          {
            n: "3.", points: 1.5,
            texte: "À partir de quel mois le salaire de l'offre A dépasse-t-il celui de l'offre B ?",
            indice: "Résous $a_n > b_n$, c'est-à-dire $1\\,500 + 30(n - 1) > 1\\,650 + 20(n - 1)$.",
            corrige:
              "$a_n > b_n \\iff 30(n - 1) - 20(n - 1) > 1\\,650 - 1\\,500 \\iff 10(n - 1) > 150 \\iff n - 1 > 15 \\iff n > 16$.\n\n" +
              "Au mois $16$, les salaires sont égaux ($1\\,950$ €) ; à partir du mois $17$, l'offre A paie plus ($1\\,980$ € contre $1\\,970$ €)."
          },
          {
            n: "4.", points: 2,
            texte: "Kamal compte rester deux ans, soit $24$ mois. Quelle offre lui rapporte le plus au total ?",
            indice: "Avec l'offre A, le total vaut $24 \\times 1\\,500$ plus $30 \\times (0 + 1 + \\dots + 23)$, et $0 + 1 + \\dots + 23 = \\dfrac{23 \\times 24}{2}$.",
            corrige:
              "$0 + 1 + \\dots + 23 = \\dfrac{23 \\times 24}{2} = 276$.\n\n" +
              "Offre A : $24 \\times 1\\,500 + 30 \\times 276 = 36\\,000 + 8\\,280 = 44\\,280$ €.\n\n" +
              "Offre B : $24 \\times 1\\,650 + 20 \\times 276 = 39\\,600 + 5\\,520 = 45\\,120$ €.\n\n" +
              "Sur deux ans, l'offre B rapporte $840$ € de plus, même si l'offre A paie mieux à partir du mois $17$."
          },
          {
            n: "5.", points: 1.5,
            texte: "Et s'il reste trois ans, soit $36$ mois ? Que peut-on conseiller à Kamal ?",
            indice: "Même méthode avec $0 + 1 + \\dots + 35 = \\dfrac{35 \\times 36}{2}$.",
            corrige:
              "$0 + 1 + \\dots + 35 = \\dfrac{35 \\times 36}{2} = 630$.\n\n" +
              "Offre A : $36 \\times 1\\,500 + 30 \\times 630 = 54\\,000 + 18\\,900 = 72\\,900$ €. Offre B : $36 \\times 1\\,650 + 20 \\times 630 = 59\\,400 + 12\\,600 = 72\\,000$ €.\n\n" +
              "Sur trois ans, l'offre A rapporte $900$ € de plus. Le meilleur choix dépend donc de la durée : B pour deux ans, A pour trois ans."
          }
        ]
      },
      {
        titre: "La somme des nombres impairs",
        duree: 20, points: 6, calculatrice: false,
        contexte: "On s'intéresse aux sommes $1 + 3 + 5 + \\dots$ des premiers nombres impairs. La figure range ces nombres de carreaux en équerres.",
        figure: () => {
          const c = 22, x0 = 105, y0 = 8, coul = ["var(--lagon-pale)", "var(--ylang-pale)"];
          let s = `<svg class="graph" viewBox="0 0 320 132" role="img" aria-label="Un carré de 5 carreaux sur 5 découpé en équerres de 1, 3, 5, 7 et 9 carreaux">`;
          for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
            const k = Math.max(i, j);
            s += `<rect x="${x0 + j * c}" y="${y0 + i * c}" width="${c}" height="${c}" style="fill:${coul[k % 2]};stroke:var(--doux);stroke-width:1"/>`;
          }
          [1, 3, 5, 7, 9].forEach((v, k) => { s += `<text class="g-label" x="${x0 + k * c + c / 2}" y="${y0 + k * c + c / 2 + 4}" text-anchor="middle">${v}</text>`; });
          return s + `</svg>`;
        },
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $1 + 3 + 5 + 7$ et $1 + 3 + 5 + 7 + 9$. Que remarques-tu ? Explique avec la figure.",
            indice: "Compare les résultats avec $4^2$ et $5^2$.",
            corrige: "$1 + 3 + 5 + 7 = 16 = 4^2$ et $1 + 3 + 5 + 7 + 9 = 25 = 5^2$. Sur la figure, chaque équerre ajoute le nombre impair suivant et agrandit le carré d'un carreau de côté : on conjecture que la somme des $n$ premiers impairs vaut $n^2$."
          },
          {
            n: "2.", points: 1,
            texte: "Pour $k \\geqslant 1$, on pose $u_k = 2k - 1$. Montre que $(u_k)$ est une suite arithmétique et donne sa raison.",
            indice: "Calcule $u_{k+1} - u_k$.",
            corrige: "$u_{k+1} - u_k = 2(k + 1) - 1 - (2k - 1) = 2$ : la suite est arithmétique de raison $2$, de premier terme $u_1 = 1$. Ce sont les nombres impairs $1$, $3$, $5$…"
          },
          {
            n: "3.", points: 2,
            texte: "Démontre que, pour tout $n \\geqslant 1$, $1 + 3 + 5 + \\dots + (2n - 1) = n^2$.",
            indice: "Écris chaque impair sous la forme $2k - 1$, sépare les $2k$ et les $-1$, puis utilise $1 + 2 + \\dots + n = \\dfrac{n(n + 1)}{2}$.",
            corrige:
              "Chaque terme s'écrit $2k - 1$, pour $k$ allant de $1$ à $n$. En séparant les $2k$ et les $-1$ :\n\n" +
              "$1 + 3 + \\dots + (2n - 1) = 2(1 + 2 + \\dots + n) - n$\n\n" +
              "$= 2 \\times \\dfrac{n(n + 1)}{2} - n = n(n + 1) - n = n^2$."
          },
          {
            n: "4.", points: 1,
            texte: "Calcule $1 + 3 + 5 + \\dots + 99$.",
            indice: "Trouve $n$ tel que $2n - 1 = 99$.",
            corrige: "$2n - 1 = 99 \\iff n = 50$ : c'est la somme des $50$ premiers impairs, qui vaut $50^2 = 2\\,500$."
          },
          {
            n: "5.", points: 1,
            texte:
              "Qu'affiche ce programme Python ?\n\n" +
              "```python\ns = 0\nfor k in range(1, 51):\n    s = s + 2 * k - 1\nprint(s)\n```",
            indice: "$\\texttt{range(1, 51)}$ donne $k = 1$, $2$, …, $50$.",
            corrige: "La boucle ajoute $u_1$, …, $u_{50}$, les $50$ premiers impairs : le programme affiche $\\texttt{2500}$, comme à la question 4."
          }
        ]
      }
    ]
  }
};
