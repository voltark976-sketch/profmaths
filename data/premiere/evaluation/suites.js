/*
  ENTRAÎNEMENT : Première spécialité — chapitre 1, Suites numériques : généralités
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-suites.
  Format : voir data/premiere/evaluation/second-degre-2.js. Sans calculatrice (épreuve anticipée).
  Suites arithmétiques et géométriques : chapitres 3 et 6 (non utilisées ici) ; récurrence démontrée en Terminale.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-suites"] = {
  revisions: {
    intro: "Les suites en un coup d'œil : les deux façons de les définir, le sens de variation et l'idée de limite. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Une suite",
        texte: "Une suite $(u_n)$ associe à chaque entier naturel $n$ un nombre $u_n$, le **terme de rang $n$**. C'est une fonction définie sur $\\mathbb{N}$ : on note aussi $u(n)$."
      },
      {
        titre: "Formule explicite",
        texte:
          "$u_n = f(n)$ : on calcule n'importe quel terme directement.\n\n" +
          "Avec $u_n = 3n^2 - 1$ : $u_{10} = 3 \\times 100 - 1 = 299$."
      },
      {
        titre: "Relation de récurrence",
        texte:
          "On donne le premier terme et le passage d'un terme au suivant : $u_{n+1} = f(u_n)$. On calcule **de proche en proche**.\n\n" +
          "Avec $u_0 = 5$ et $u_{n+1} = 2u_n - 3$ : $u_1 = 7$, puis $u_2 = 11$, puis $u_3 = 19$."
      },
      {
        titre: "Ne pas confondre",
        texte:
          "- $u_{n+1}$, le terme suivant, et $u_n + 1$, le terme plus un ;\n" +
          "- $u_{2n}$, le terme de rang $2n$, et $2u_n$, le double du terme."
      },
      {
        titre: "Sens de variation",
        texte:
          "On étudie le **signe de $u_{n+1} - u_n$** :\n\n" +
          "- positif pour tout $n$ : suite croissante ;\n" +
          "- négatif pour tout $n$ : suite décroissante.\n\n" +
          "Si $u_n = f(n)$ avec $f$ monotone sur $[0\\,;+\\infty[$, la suite varie comme $f$."
      },
      {
        titre: "Pas croissante, ce n'est pas décroissante",
        texte:
          "« Croissante » veut dire « pour **tout** $n$, $u_{n+1} \\geqslant u_n$ ». Pour montrer qu'elle ne l'est pas, un seul rang suffit : $u_{n+1} < u_n$.\n\n" +
          "La suite $(-1)^n$ ($1$, $-1$, $1$…) n'est ni croissante ni décroissante."
      },
      {
        titre: "Idée de limite",
        texte:
          "Quand $n$ devient très grand, les termes peuvent :\n\n" +
          "- se rapprocher d'un nombre $\\ell$ : limite finie ;\n" +
          "- dépasser n'importe quel nombre : limite $+\\infty$ ;\n" +
          "- ne pas se stabiliser : pas de limite.\n\n" +
          "En Première, on **conjecture** la limite (tableau de valeurs, nuage de points)."
      },
      {
        titre: "Python : listes",
        texte:
          "$\\texttt{L[0]}$ est le premier élément, $\\texttt{L[-1]}$ le dernier, $\\texttt{len(L)}$ leur nombre. $\\texttt{range(5)}$ donne $0$, $1$, $2$, $3$, $4$ : il s'arrête avant $5$.\n\n" +
          "$\\texttt{[3*n + 1 for n in range(5)]}$ est la liste $\\texttt{[1, 4, 7, 10, 13]}$."
      }
    ],
    pieges: [
      "Confondre $u_{n+1}$ (le terme suivant) et $u_n + 1$.",
      "Sauter des étapes avec une relation de récurrence : il faut $u_1$ pour calculer $u_2$.",
      "Relier les points du nuage d'une suite comme une courbe de fonction.",
      "Conclure qu'une suite est croissante en comparant seulement deux termes.",
      "Croire que « pas croissante » veut dire « décroissante ».",
      "Oublier que $\\texttt{range(n)}$ s'arrête à $n - 1$ et que $\\texttt{L[0]}$ est le premier élément."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Les grilles d'allumettes",
        duree: 25, points: 7, calculatrice: false,
        contexte:
          "Pour la fête de l'école, Nayma construit des grilles carrées avec des allumettes : à l'étape $n$, la grille a $n$ carrés de côté (figure). On note $u_n$ le nombre d'allumettes utilisées à l'étape $n$, pour $n \\geqslant 1$.",
        figure: () => {
          const c = 20, t = 2.6;
          let s = `<svg class="graph" viewBox="0 0 320 132" role="img" aria-label="Grilles d'allumettes : étape 1, un carré ; étape 2, deux carrés sur deux ; étape 3, trois carrés sur trois"><g style="stroke:var(--ylang);stroke-width:3.4;stroke-linecap:round">`;
          const grilles = [[1, 30], [2, 102], [3, 196]];
          grilles.forEach(([n, x0]) => {
            const y0 = 104 - n * c;
            for (let i = 0; i <= n; i++) for (let j = 0; j < n; j++) {
              s += `<line x1="${x0 + j * c + t}" y1="${y0 + i * c}" x2="${x0 + (j + 1) * c - t}" y2="${y0 + i * c}"/>`;
              s += `<line x1="${x0 + i * c}" y1="${y0 + j * c + t}" x2="${x0 + i * c}" y2="${y0 + (j + 1) * c - t}"/>`;
            }
          });
          s += `</g>`;
          grilles.forEach(([n, x0]) => { s += `<text class="g-label" x="${x0 + (n * c) / 2}" y="124" text-anchor="middle">Étape ${n}</text>`; });
          return s + `</svg>`;
        },
        questions: [
          {
            n: "1.", points: 1,
            texte: "Compte les allumettes des trois premières étapes : donne $u_1$, $u_2$ et $u_3$.",
            indice: "Compte les allumettes horizontales, rangée par rangée, puis les verticales, colonne par colonne.",
            corrige:
              "Étape 1 : $4$ allumettes. Étape 2 : $3$ rangées de $2$ allumettes horizontales et $3$ colonnes de $2$ verticales, soit $12$. Étape 3 : $4 \\times 3 + 4 \\times 3 = 24$.\n\n" +
              "Donc $u_1 = 4$, $u_2 = 12$ et $u_3 = 24$."
          },
          {
            n: "2.", points: 1,
            texte: "On admet que, pour tout $n \\geqslant 1$, $u_n = 2n(n + 1)$. Vérifie cette formule pour $n = 1$, $2$ et $3$, puis calcule le nombre d'allumettes de l'étape $10$.",
            indice: "À l'étape $n$, il y a $n + 1$ rangées de $n$ allumettes horizontales, et autant de verticales.",
            corrige:
              "$2 \\times 1 \\times 2 = 4$, $2 \\times 2 \\times 3 = 12$ et $2 \\times 3 \\times 4 = 24$ : la formule donne bien $u_1$, $u_2$ et $u_3$. (Elle vient du comptage : $n + 1$ rangées de $n$ allumettes horizontales, autant de verticales.)\n\n" +
              "$u_{10} = 2 \\times 10 \\times 11 = 220$ allumettes."
          },
          {
            n: "3.", points: 1.5,
            texte: "Montre que, pour tout $n \\geqslant 1$, $u_{n+1} - u_n = 4(n + 1)$. Déduis-en le sens de variation de la suite $(u_n)$.",
            indice: "Écris $u_{n+1} = 2(n + 1)(n + 2)$ et mets $2(n + 1)$ en facteur dans la différence.",
            corrige:
              "$u_{n+1} - u_n = 2(n + 1)(n + 2) - 2n(n + 1) = 2(n + 1)\\left[(n + 2) - n\\right] = 2(n + 1) \\times 2 = 4(n + 1)$.\n\n" +
              "Pour tout $n \\geqslant 1$, $4(n + 1) > 0$, donc $u_{n+1} > u_n$ : la suite $(u_n)$ est croissante. On ajoute $4(n + 1)$ allumettes à chaque étape : $8$ pour passer de l'étape 1 à l'étape 2, $12$ ensuite, etc."
          },
          {
            n: "4.", points: 1.5,
            texte: "Nayma a une boîte de $500$ allumettes. Quelle est la plus grande grille complète qu'elle peut construire ? Combien d'allumettes lui reste-t-il ?",
            indice: "Cherche le plus grand entier $n$ tel que $2n(n + 1) \\leqslant 500$, c'est-à-dire $n(n + 1) \\leqslant 250$. Essaie $n = 15$ et $n = 16$.",
            corrige:
              "On cherche le plus grand $n$ tel que $2n(n + 1) \\leqslant 500$, soit $n(n + 1) \\leqslant 250$. La suite est croissante, donc il suffit de trouver où elle dépasse :\n\n" +
              "$15 \\times 16 = 240 \\leqslant 250$ mais $16 \\times 17 = 272 > 250$.\n\n" +
              "La plus grande grille est celle de l'étape $15$ (15 carrés sur 15) : elle utilise $u_{15} = 480$ allumettes, il en reste $20$."
          },
          {
            n: "5.", points: 2,
            texte:
              "On veut trouver avec Python la première étape qui demande plus de $500$ allumettes. Complète le programme et donne ce qu'il affiche.\n\n" +
              "```python\nn = 1\nu = 4\nwhile ...:\n    n = n + 1\n    u = ...\nprint(n)\n```",
            indice: "La boucle doit continuer tant que $u$ ne dépasse pas $500$ ; à chaque tour, $u$ prend la valeur de $u_n$ pour le nouveau $n$.",
            corrige:
              "```python\nn = 1\nu = 4\nwhile u <= 500:\n    n = n + 1\n    u = 2 * n * (n + 1)\nprint(n)\n```\n\n" +
              "La boucle s'arrête au premier $n$ tel que $u_n > 500$ : $u_{15} = 480$ et $u_{16} = 2 \\times 16 \\times 17 = 544$. Le programme affiche $\\texttt{16}$, ce qui confirme la question 4."
          }
        ]
      },
      {
        titre: "Les nids de tortues de N'Gouja",
        duree: 25, points: 7, calculatrice: false,
        contexte:
          "Sur la plage de N'Gouja, une association protège les tortues vertes. Elle modélise le nombre de nids comptés l'année $2026 + n$ par le terme $u_n$ d'une suite définie par :\n\n" +
          "$u_0 = 20$ et, pour tout entier naturel $n$, $u_{n+1} = 0{,}5u_n + 30$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $u_1$, $u_2$ et $u_3$. Combien de nids le modèle prévoit-il en $2029$ ?",
            indice: "Calcule de proche en proche : $u_1 = 0{,}5 \\times 20 + 30$. L'année $2029$ correspond à $n = 3$.",
            corrige:
              "$u_1 = 0{,}5 \\times 20 + 30 = 40$, $u_2 = 0{,}5 \\times 40 + 30 = 50$ et $u_3 = 0{,}5 \\times 50 + 30 = 55$.\n\n" +
              "L'année $2029 = 2026 + 3$ correspond à $u_3$ : le modèle prévoit $55$ nids."
          },
          {
            n: "2.", points: 1,
            texte: "Calcule $u_1 - u_0$, $u_2 - u_1$ et $u_3 - u_2$. Quelle conjecture peut-on faire sur le sens de variation de la suite ?",
            indice: "Regarde le signe de ces différences, et comment elles évoluent.",
            corrige:
              "$u_1 - u_0 = 20$, $u_2 - u_1 = 10$ et $u_3 - u_2 = 5$. Les différences sont positives (et divisées par $2$ à chaque fois) : on conjecture que la suite $(u_n)$ est croissante."
          },
          {
            n: "3.", points: 1.5,
            texte: "Montre que, pour tout entier naturel $n$, $u_{n+1} - u_n = 0{,}5(60 - u_n)$. On admet que $u_n < 60$ pour tout $n$ (on le démontrera en Terminale) : déduis-en le sens de variation de $(u_n)$.",
            indice: "Remplace $u_{n+1}$ par $0{,}5u_n + 30$ dans la différence, puis factorise par $0{,}5$.",
            corrige:
              "$u_{n+1} - u_n = 0{,}5u_n + 30 - u_n = 30 - 0{,}5u_n = 0{,}5(60 - u_n)$.\n\n" +
              "Comme $u_n < 60$, on a $60 - u_n > 0$, donc $u_{n+1} - u_n > 0$ pour tout $n$ : la suite $(u_n)$ est croissante."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "On écrit ce programme Python :\n\n" +
              "```python\nu = 20\nL = [u]\nfor k in range(5):\n    u = 0.5 * u + 30\n    L.append(u)\nprint(L)\n```\n\n" +
              "Combien de nombres la liste $\\texttt{L}$ contient-elle à la fin ? Que vaut $\\texttt{L[-1]}$ ?",
            indice: "La liste commence avec $u_0$, et la boucle fait $5$ tours : chaque tour ajoute le terme suivant.",
            corrige:
              "La liste contient $u_0$ puis les $5$ termes ajoutés par la boucle : $6$ nombres, $u_0$ à $u_5$.\n\n" +
              "$u_4 = 0{,}5 \\times 55 + 30 = 57{,}5$ et $u_5 = 0{,}5 \\times 57{,}5 + 30 = 58{,}75$. Le programme affiche $\\texttt{[20, 40.0, 50.0, 55.0, 57.5, 58.75]}$ et $\\texttt{L[-1]}$ vaut $58{,}75$."
          },
          {
            n: "5.", points: 2,
            texte: "Conjecture la limite de la suite $(u_n)$. Que peut-on en dire pour la plage de N'Gouja ? Le nombre de nids peut-il dépasser $60$ d'après ce modèle ?",
            indice: "Regarde les écarts $60 - u_n$ : $40$, $20$, $10$, $5$… Que deviennent-ils ?",
            corrige:
              "Les écarts à $60$ sont $40$, $20$, $10$, $5$, $2{,}5$, $1{,}25$ : ils sont divisés par $2$ chaque année et se rapprochent de $0$. On conjecture que la suite $(u_n)$ a pour limite $60$.\n\n" +
              "D'après le modèle, le nombre de nids augmente chaque année et se stabilise autour de $60$, sans jamais dépasser $60$ puisque $u_n < 60$ pour tout $n$.",
            figureCorrige: (o) => o.graph({
              xmin: -0.6, xmax: 7.6, ymin: -4, ymax: 70, ystep: 10, h: 260,
              xlabel: "n", ylabel: "uₙ",
              hlines: [{ y: 60, label: "y = 60" }],
              points: [0, 1, 2, 3, 4, 5, 6, 7].map((n) => ({ x: n, y: 60 - 40 / 2 ** n })),
              aria: "Nuage de points des termes u0 à u7 : ils montent vers la droite d'équation y = 60 sans l'atteindre"
            })
          }
        ]
      },
      {
        titre: "Vrai ou faux ?",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Pour chaque affirmation, dis si elle est vraie ou fausse, puis justifie. Une réponse sans justification ne rapporte aucun point.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "La suite définie pour tout entier naturel $n$ par $u_n = n^2 - 6n$ est croissante.",
            indice: "Calcule les premiers termes, ou étudie le signe de $u_{n+1} - u_n = 2n - 5$.",
            corrige:
              "**Faux.** $u_0 = 0$ et $u_1 = 1 - 6 = -5$ : $u_1 < u_0$, la suite n'est pas croissante. Un seul contre-exemple suffit.\n\n" +
              "(En détail : $u_{n+1} - u_n = 2n - 5$, négatif pour $n \\leqslant 2$ et positif ensuite : la suite décroît jusqu'au rang $3$ puis croît.)"
          },
          {
            n: "2.", points: 1.5,
            texte: "Si $u_0 = 1$ et, pour tout entier naturel $n$, $u_{n+1} = u_n + n^2$, alors la suite $(u_n)$ est croissante.",
            indice: "Que vaut $u_{n+1} - u_n$ ? Quel est son signe ?",
            corrige: "**Vrai.** Pour tout $n$, $u_{n+1} - u_n = n^2 \\geqslant 0$, donc $u_{n+1} \\geqslant u_n$ : la suite est croissante. (Elle n'est pas strictement croissante au départ : $u_1 = u_0 = 1$.)"
          },
          {
            n: "3.", points: 1.5,
            texte: "La suite définie pour tout entier naturel $n$ par $u_n = 3 + (-1)^n$ a pour limite $3$.",
            indice: "Écris les premiers termes : que vaut $(-1)^n$ selon que $n$ est pair ou impair ?",
            corrige: "**Faux.** Les termes valent $4$ pour $n$ pair et $2$ pour $n$ impair : $4$, $2$, $4$, $2$… Ils ne se rapprochent d'aucun nombre, la suite n'a pas de limite (et jamais un terme ne vaut $3$)."
          },
          {
            n: "4.", points: 1.5,
            texte: "Le programme Python $\\texttt{L = [n**2 for n in range(4)]}$ fabrique la liste $\\texttt{[1, 4, 9, 16]}$.",
            indice: "Quelles valeurs $\\texttt{range(4)}$ donne-t-il à $n$ ?",
            corrige: "**Faux.** $\\texttt{range(4)}$ donne $n = 0$, $1$, $2$, $3$ : la liste est $\\texttt{[0, 1, 4, 9]}$. Pour obtenir $\\texttt{[1, 4, 9, 16]}$, il faudrait $\\texttt{range(1, 5)}$."
          }
        ]
      }
    ]
  }
};
