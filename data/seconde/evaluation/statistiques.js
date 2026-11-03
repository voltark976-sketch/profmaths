/*
  ENTRAÎNEMENT : Seconde — chapitre 8, Statistiques 1 : indicateurs
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-statistiques.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle ou devoir commun de Seconde.
  Quartiles : Q1 (Q3) est la plus petite valeur telle qu'au moins 25 % (75 %) des valeurs lui soient inférieures ou égales.
  Données fictives. Les boîtes de l'exercice 2 correspondent à deux vraies séries de 30 notes (voir la vérification).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["seconde-statistiques"] = {
  revisions: {
    intro: "Les indicateurs statistiques en un coup d'œil : moyenne, médiane, quartiles, écart type, et comment comparer deux séries. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Moyenne",
        texte:
          "$\\bar{x} = \\dfrac{x_1 + \\dots + x_n}{n}$ pour $n$ valeurs.\n\n" +
          "$\\bar{x} = \\dfrac{n_1x_1 + n_2x_2 + \\dots}{n_1 + n_2 + \\dots}$ avec des effectifs $n_i$.\n\n" +
          "Pour ajouter ou retirer une valeur, on repasse par la **somme** des valeurs."
      },
      {
        titre: "Linéarité",
        texte: "Si chaque valeur $x$ devient $ax + b$, la moyenne devient $a\\bar{x} + b$. Des prix augmentés de $10\\,\\%$, puis de $1$ € de frais : un prix moyen de $20$ € devient $1{,}1 \\times 20 + 1 = 23$ €."
      },
      {
        titre: "Médiane",
        texte: "On range les valeurs dans l'ordre croissant. La médiane partage la série en deux groupes de même effectif : pour $n$ impair, c'est la valeur du milieu ; pour $n$ pair, la moyenne des deux valeurs du milieu."
      },
      {
        titre: "Quartiles",
        texte: "$Q_1$ est la plus petite valeur telle qu'au moins $25\\,\\%$ des valeurs lui soient inférieures ou égales : rang $\\dfrac{n}{4}$, arrondi à l'entier supérieur. $Q_3$ : même chose avec $75\\,\\%$. Écart interquartile : $Q_3 - Q_1$ ; étendue : max $-$ min."
      },
      {
        titre: "Écart type",
        texte: "$\\sigma$ mesure la dispersion autour de la **moyenne** : c'est la racine carrée de la variance, la moyenne des carrés des écarts à la moyenne. À la calculatrice, en mode statistiques, on lit $\\sigma$ ou $\\sigma_x$."
      },
      {
        titre: "Comparer deux séries",
        texte: "On compare un indicateur de position **et** un indicateur de dispersion : le couple (moyenne ; écart type) ou le couple (médiane ; écart interquartile). La médiane résiste mieux aux valeurs extrêmes."
      },
      {
        titre: "Diagramme en boîte",
        texte: "La boîte va de $Q_1$ à $Q_3$, avec un trait à la médiane ; les moustaches vont du minimum au maximum. Environ la moitié des valeurs sont dans la boîte."
      }
    ],
    pieges: [
      "Chercher la médiane sans ranger les valeurs.",
      "Faire la moyenne de l'ancienne moyenne et de la nouvelle valeur : il faut repasser par la somme.",
      "Confondre écart interquartile ($Q_3 - Q_1$) et étendue (max $-$ min).",
      "Donner la variance au lieu de l'écart type, ou lire $s$ au lieu de $\\sigma$ sur la calculatrice.",
      "Mélanger les couples : la médiane avec l'écart type.",
      "Conclure sur **chaque** valeur à partir d'un indicateur : une moyenne plus haute ne veut pas dire que tous les élèves ont de meilleures notes."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle ou au devoir commun (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le temps de trajet",
        duree: 25, points: 7, calculatrice: true,
        contexte: "On a demandé aux $12$ élèves d'un groupe de Seconde leur temps de trajet entre la maison et le lycée, en minutes (données fictives). Rangés dans l'ordre croissant, les temps sont : $10$ ; $12$ ; $13$ ; $15$ ; $18$ ; $22$ ; $25$ ; $30$ ; $32$ ; $38$ ; $40$ ; $45$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule le temps de trajet moyen.",
            indice: "Additionne les $12$ temps, puis divise par $12$.",
            corrige: "La somme des temps vaut $300$ minutes, donc la moyenne est $\\dfrac{300}{12} = 25$ minutes."
          },
          {
            n: "2.", points: 2,
            texte: "Détermine la médiane, le premier quartile $Q_1$ et le troisième quartile $Q_3$.",
            indice: "$n = 12$ est pair : la médiane est la moyenne des 6e et 7e valeurs. Pour $Q_1$ : $\\dfrac{12}{4} = 3$, prends la 3e valeur ; pour $Q_3$ : $\\dfrac{3 \\times 12}{4} = 9$, la 9e.",
            corrige: "Médiane : $\\dfrac{22 + 25}{2} = 23{,}5$ minutes. $Q_1$ est la 3e valeur, $13$ minutes ; $Q_3$ est la 9e valeur, $32$ minutes."
          },
          {
            n: "3.", points: 1,
            texte: "Calcule l'étendue et l'écart interquartile.",
            indice: "Étendue : maximum moins minimum. Écart interquartile : $Q_3 - Q_1$.",
            corrige: "Étendue : $45 - 10 = 35$ minutes. Écart interquartile : $32 - 13 = 19$ minutes."
          },
          {
            n: "4.", points: 1.5,
            texte: "À l'aide de la calculatrice, donne l'écart type de la série, arrondi au dixième.",
            indice: "Mode statistiques : entre les $12$ valeurs et lis $\\sigma$ (ou $\\sigma_x$), pas $s$.",
            corrige: "La calculatrice donne $\\sigma \\approx 11{,}4$ minutes (la variance vaut environ $130{,}3$)."
          },
          {
            n: "5.", points: 1,
            texte: "Interprète la médiane et le troisième quartile en une phrase chacun.",
            indice: "« Au moins la moitié des élèves… », « au moins $75\\,\\%$ des élèves… ».",
            corrige: "Au moins la moitié des élèves mettent au plus $23{,}5$ minutes pour venir au lycée. Au moins $75\\,\\%$ des élèves, soit au moins $9$ élèves sur $12$, mettent au plus $32$ minutes."
          }
        ]
      },
      {
        titre: "Comparer deux classes",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les diagrammes en boîte ci-dessous résument les notes sur $20$ des deux classes de Seconde A et B à un même devoir ($30$ élèves dans chaque classe). Les deux classes ont la même moyenne, $11$, mais des écarts types de $4{,}2$ pour la classe A et de $2{,}1$ pour la classe B.",
        figure: () => {
          const X = (v) => 20 + v * 14, trait = (x1, y1, x2, y2, e) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--encre);stroke-width:${e}"/>`;
          const boite = (y, m, q1, me, q3, M, c) =>
            trait(X(m), y, X(q1), y, 1.5) + trait(X(q3), y, X(M), y, 1.5) + trait(X(m), y - 6, X(m), y + 6, 1.5) + trait(X(M), y - 6, X(M), y + 6, 1.5) +
            `<rect x="${X(q1)}" y="${y - 12}" width="${X(q3) - X(q1)}" height="24" style="fill:${c};stroke:var(--encre);stroke-width:1.5"/>` + trait(X(me), y - 12, X(me), y + 12, 2.5);
          let s = `<svg class="graph" viewBox="0 0 320 146" role="img" aria-label="Classe A : minimum 3, Q1 8, médiane 12, Q3 14, maximum 19. Classe B : minimum 6, Q1 9,5, médiane 10,5, Q3 12, maximum 16">`;
          for (let v = 0; v <= 20; v++) s += `<line x1="${X(v)}" y1="18" x2="${X(v)}" y2="116" style="stroke:var(--trait);stroke-width:1"/>`;
          s += `<line x1="${X(0)}" y1="118" x2="${X(20)}" y2="118" style="stroke:var(--doux);stroke-width:1.4"/><g class="g-tick">`;
          for (let v = 0; v <= 20; v += 2) s += `<text x="${X(v)}" y="134" text-anchor="middle">${v}</text>`;
          s += `</g>` + boite(42, 3, 8, 12, 14, 19, "var(--lagon-pale)") + boite(88, 6, 9.5, 10.5, 12, 16, "var(--ylang-pale)");
          return s + `<text class="g-label" x="4" y="46">A</text><text class="g-label" x="4" y="92">B</text></svg>`;
        },
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Lis la médiane et les quartiles de chaque classe.",
            indice: "Le trait dans la boîte est la médiane ; les bords de la boîte sont $Q_1$ et $Q_3$.",
            corrige: "Classe A : $Q_1 = 8$, médiane $12$, $Q_3 = 14$. Classe B : $Q_1 = 9{,}5$, médiane $10{,}5$, $Q_3 = 12$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule l'écart interquartile de chaque classe. Laquelle est la plus homogène ?",
            indice: "$Q_3 - Q_1$ : plus il est petit, plus les notes centrales sont regroupées.",
            corrige: "Classe A : $14 - 8 = 6$ points ; classe B : $12 - 9{,}5 = 2{,}5$ points. Les notes de la classe B sont beaucoup plus regroupées : elle est plus homogène."
          },
          {
            n: "3.", points: 1.5,
            texte: "Vrai ou faux ? Justifie. a) « Au moins un quart des élèves de la classe A ont $8$ ou moins. » b) « Dans la classe A, la moitié des élèves ont exactement $12$. »",
            indice: "Rappelle-toi ce que signifient $Q_1$ et la médiane.",
            corrige: "a) **Vrai** : $Q_1 = 8$, donc au moins $25\\,\\%$ des notes sont inférieures ou égales à $8$. b) **Faux** : la médiane $12$ indique seulement qu'au moins la moitié des notes sont inférieures ou égales à $12$, et au moins la moitié supérieures ou égales. Elle ne dit pas combien d'élèves ont exactement $12$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Les deux classes ont la même moyenne. Que t'apprennent les écarts types ?",
            indice: "L'écart type mesure la dispersion autour de la moyenne.",
            corrige: "$\\sigma_A = 4{,}2$ est le double de $\\sigma_B = 2{,}1$ : les notes de la classe A sont bien plus dispersées autour de la moyenne $11$. C'est cohérent avec les écarts interquartiles et les étendues ($16$ points en A, $10$ en B)."
          },
          {
            n: "5.", points: 1,
            texte: "Un élève dit : « la classe A a de meilleurs élèves, puisque sa médiane est plus haute ». Nuance cette phrase.",
            indice: "Regarde aussi les notes les plus basses et la dispersion.",
            corrige: "La médiane de A est plus haute ($12$ contre $10{,}5$), mais A a aussi des notes beaucoup plus basses (minimum $3$, $Q_1 = 8$). Avec la même moyenne, A a à la fois de très bons et de très faibles résultats, B des résultats plus réguliers."
          }
        ]
      },
      {
        titre: "Moyennes en mouvement",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Zaïnaba a eu $12$, $9$, $15$ et $10$ à ses quatre premiers devoirs. Quelle note doit-elle avoir au cinquième pour obtenir $12$ de moyenne ?",
            indice: "Avec $5$ notes et une moyenne de $12$, la somme des notes doit valoir $5 \\times 12$.",
            corrige: "Ses quatre notes font $46$ points. Pour une moyenne de $12$ sur cinq devoirs, il faut $5 \\times 12 = 60$ points : elle doit avoir $60 - 46 = 14$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Dans une entreprise, le salaire moyen est de $1\\,500$ €. Chaque salaire augmente de $2\\,\\%$, puis chaque salarié reçoit une prime de $50$ €. Quel est le nouveau salaire moyen ?",
            indice: "Chaque salaire $x$ devient $1{,}02x + 50$ : utilise la linéarité de la moyenne.",
            corrige: "Chaque salaire $x$ devient $1{,}02x + 50$, donc la moyenne devient $1{,}02 \\times 1\\,500 + 50 = 1\\,580$ €. Inutile de connaître chaque salaire."
          },
          {
            n: "3.", points: 1.5,
            texte: "Une équipe de football a marqué $1$ ; $2$ ; $2$ ; $3$ ; $4$ buts lors de ses cinq premiers matchs. Au sixième match, contre une équipe débutante, elle marque $12$ buts. Calcule la moyenne et la médiane avant puis après ce match. Quel indicateur résume le mieux les matchs habituels de l'équipe ?",
            indice: "Avant : somme $12$ pour $5$ matchs. Après : somme $24$ pour $6$ matchs, et la médiane est la moyenne des 3e et 4e valeurs.",
            corrige: "Avant : moyenne $\\dfrac{12}{5} = 2{,}4$ buts et médiane $2$. Après : moyenne $\\dfrac{24}{6} = 4$ buts et médiane $\\dfrac{2 + 3}{2} = 2{,}5$. Le seul match exceptionnel fait bondir la moyenne, alors que la médiane bouge à peine : la médiane résume mieux les matchs habituels."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Voici une fonction Python. Que renvoie $\\texttt{mystere([12, 9, 15, 10, 8])}$ ? Que calcule cette fonction pour une liste de notes ?\n\n" +
              "```python\ndef mystere(L):\n    c = 0\n    for x in L:\n        if x >= 10:\n            c = c + 1\n    return c / len(L)\n```",
            indice: "Suis la boucle : $\\texttt{c}$ augmente de $1$ pour chaque note supérieure ou égale à $10$. À la fin, on divise par le nombre de notes.",
            corrige: "Trois notes sur cinq sont supérieures ou égales à $10$ ($12$, $15$ et $10$), donc $\\texttt{c}$ vaut $3$ et la fonction renvoie $\\dfrac{3}{5}$, soit $\\texttt{0.6}$. Elle calcule la fréquence des notes supérieures ou égales à $10$ dans la liste."
          }
        ]
      }
    ]
  }
};
