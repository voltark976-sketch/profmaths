/*
  ENTRAÎNEMENT : Seconde — chapitre 4, Arithmétique
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-arithmetique.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle ou devoir commun de Seconde.
  Programme 2026 : pas de nombres premiers ; les mots PGCD et PPCM ne sont pas employés.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["seconde-arithmetique"] = {
  revisions: {
    intro: "L'arithmétique en un coup d'œil : multiples, diviseurs, parité, démonstrations et fractions irréductibles. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Multiple et diviseur",
        texte: "$a$ est un **multiple** de $b$ (et $b$ un **diviseur** de $a$) s'il existe un entier $k$ tel que $a = k \\times b$. $56 = 7 \\times 8$ : $56$ est un multiple de $8$, et $8$ un diviseur de $56$."
      },
      {
        titre: "Critères de divisibilité",
        texte:
          "- par $2$ : chiffre des unités pair ; par $5$ : $0$ ou $5$ ; par $10$ : $0$ ;\n" +
          "- par $3$ (ou $9$) : la **somme des chiffres** est divisible par $3$ (ou $9$) ; $3\\,471$ : $3 + 4 + 7 + 1 = 15$, divisible par $3$."
      },
      {
        titre: "Somme de multiples",
        texte: "La somme de deux multiples de $a$ est un multiple de $a$ : si $b = ak_1$ et $c = ak_2$, alors $b + c = a(k_1 + k_2)$ avec $k_1 + k_2$ entier."
      },
      {
        titre: "Pair, impair",
        texte:
          "Pair : $2k$ ; impair : $2k + 1$, avec $k$ entier.\n\n" +
          "- pair $+$ pair et impair $+$ impair : pair ;\n" +
          "- pair $+$ impair : impair ;\n" +
          "- le carré d'un impair est impair : $(2k + 1)^2 = 2(2k^2 + 2k) + 1$."
      },
      {
        titre: "Démontrer",
        texte: "Des exemples ne prouvent rien : on nomme l'entier ($n$, $k$…), on écrit le nombre sous la forme $b \\times (\\text{un entier})$ et on justifie que ce facteur est bien un entier. Un seul contre-exemple suffit pour réfuter."
      },
      {
        titre: "Fraction irréductible",
        texte: "On divise numérateur et dénominateur par un diviseur commun jusqu'à ce qu'il n'en reste plus d'autre que $1$ : $\\dfrac{60}{126} = \\dfrac{30}{63} = \\dfrac{10}{21}$."
      },
      {
        titre: "Python",
        texte: "$\\texttt{a \\% b}$ est le reste de la division de $a$ par $b$, $\\texttt{a // b}$ le quotient. $a$ est un multiple de $b$ quand $\\texttt{a \\% b == 0}$ vaut $\\texttt{True}$."
      }
    ],
    pieges: [
      "Confondre multiple et diviseur : $8$ est un diviseur de $56$, $56$ un multiple de $8$.",
      "Croire qu'un exemple suffit pour démontrer une propriété sur tous les entiers.",
      "Oublier de justifier que $k$ est un entier dans $a = k \\times b$.",
      "Croire qu'un nombre qui se termine par $3$ est divisible par $3$ : on regarde la somme des chiffres.",
      "Écrire $(2k + 1)^2 = 4k^2 + 1$ : il manque le double produit $4k$.",
      "S'arrêter trop tôt : $\\dfrac{21}{28}$ n'est pas irréductible, on divise encore par $7$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle ou au devoir commun (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Barges et colis",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Deux barges quittent ensemble le quai de Mamoudzou à $6$ h. La première y repart toutes les $30$ minutes, la seconde toutes les $40$ minutes.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Écris les multiples de $30$ et les multiples de $40$ inférieurs ou égaux à $240$.",
            indice: "Multiplie $30$, puis $40$, par $1$, $2$, $3$…",
            corrige: "Multiples de $30$ : $30$, $60$, $90$, $120$, $150$, $180$, $210$, $240$. Multiples de $40$ : $40$, $80$, $120$, $160$, $200$, $240$."
          },
          {
            n: "2.", points: 1.5,
            texte: "À quelle heure les deux barges repartent-elles de nouveau ensemble ?",
            indice: "Cherche le plus petit nombre non nul qui est à la fois un multiple de $30$ et de $40$.",
            corrige: "Le plus petit multiple commun non nul de $30$ et $40$ est $120$ : les barges repartent ensemble $120$ minutes plus tard, soit à $8$ h."
          },
          {
            n: "3.", points: 1.5,
            texte: "Combien de fois partent-elles ensemble entre $6$ h et $18$ h, les deux horaires compris ?",
            indice: "Elles partent ensemble toutes les $2$ heures.",
            corrige: "Elles partent ensemble à $6$ h, $8$ h, $10$ h, $12$ h, $14$ h, $16$ h et $18$ h : $7$ fois ($720$ minutes, soit $6$ intervalles de $120$ minutes, plus le départ de $6$ h)."
          },
          {
            n: "4.", points: 1.5,
            texte: "Un commerçant veut répartir $84$ cahiers et $60$ stylos en colis identiques, sans qu'il en reste. Combien de colis au plus peut-il faire ? Que contient chaque colis ?",
            indice: "Le nombre de colis doit diviser $84$ et $60$ : liste les diviseurs de chacun.",
            corrige:
              "Diviseurs de $84$ : $1$, $2$, $3$, $4$, $6$, $7$, $12$, $14$, $21$, $28$, $42$, $84$. Diviseurs de $60$ : $1$, $2$, $3$, $4$, $5$, $6$, $10$, $12$, $15$, $20$, $30$, $60$.\n\n" +
              "Le plus grand diviseur commun est $12$ : $12$ colis, chacun avec $7$ cahiers et $5$ stylos."
          },
          {
            n: "5.", points: 1.5,
            texte: "Rends la fraction $\\dfrac{60}{84}$ irréductible.",
            indice: "Divise le numérateur et le dénominateur par leur plus grand diviseur commun, trouvé à la question 4.",
            corrige: "$\\dfrac{60}{84} = \\dfrac{60 \\div 12}{84 \\div 12} = \\dfrac{5}{7}$, et $5$ et $7$ n'ont pas d'autre diviseur commun que $1$."
          }
        ]
      },
      {
        titre: "Des démonstrations",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans tout l'exercice, $n$, $k$ et $k'$ désignent des entiers.",
        questions: [
          {
            n: "1.", points: 2,
            texte: "Démontre que la somme de deux nombres impairs est paire.",
            indice: "Écris les deux nombres $2k + 1$ et $2k' + 1$, avec deux entiers qui peuvent être différents.",
            corrige: "Deux impairs s'écrivent $2k + 1$ et $2k' + 1$. Leur somme vaut $2k + 2k' + 2 = 2(k + k' + 1)$, et $k + k' + 1$ est un entier : la somme est paire."
          },
          {
            n: "2.", points: 2,
            texte: "Démontre que le carré d'un nombre pair est un multiple de $4$.",
            indice: "Un nombre pair s'écrit $2k$.",
            corrige: "Un nombre pair s'écrit $2k$, et $(2k)^2 = 4k^2$, avec $k^2$ entier : c'est un multiple de $4$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Démontre que, pour tout entier $n$, $(n + 1)^2 - (n - 1)^2$ est un multiple de $4$.",
            indice: "Développe les deux carrés avec les identités remarquables.",
            corrige: "$(n + 1)^2 - (n - 1)^2 = (n^2 + 2n + 1) - (n^2 - 2n + 1) = 4n$, et $n$ est un entier : c'est un multiple de $4$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Vrai ou faux : « la somme de deux multiples de $4$ est toujours un multiple de $8$ ». Justifie.",
            indice: "Essaie avec deux petits multiples de $4$.",
            corrige: "**Faux.** $4$ et $8$ sont des multiples de $4$, mais $4 + 8 = 12$ n'est pas un multiple de $8$. Un contre-exemple suffit. (La somme est toujours un multiple de $4$, en revanche.)"
          }
        ]
      },
      {
        titre: "Diviseurs et Python",
        duree: 20, points: 6, calculatrice: false,
        contexte: "On s'intéresse aux diviseurs du nombre $36$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Écris la liste de tous les diviseurs positifs de $36$.",
            indice: "Cherche les produits $a \\times b = 36$ : $1 \\times 36$, $2 \\times 18$…",
            corrige: "$36 = 1 \\times 36 = 2 \\times 18 = 3 \\times 12 = 4 \\times 9 = 6 \\times 6$ : les diviseurs sont $1$, $2$, $3$, $4$, $6$, $9$, $12$, $18$ et $36$, soit $9$ diviseurs ($6$ n'est compté qu'une fois)."
          },
          {
            n: "2.", points: 1.5,
            texte:
              "Complète cette fonction pour qu'elle renvoie la liste des diviseurs de $n$.\n\n" +
              "```python\ndef diviseurs(n):\n    L = []\n    for d in range(1, n + 1):\n        if ...:\n            L.append(d)\n    return L\n```",
            indice: "$d$ divise $n$ quand le reste de la division de $n$ par $d$ est nul.",
            corrige: "La condition est $\\texttt{n \\% d == 0}$. $\\texttt{diviseurs(36)}$ renvoie alors $\\texttt{[1, 2, 3, 4, 6, 9, 12, 18, 36]}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Que valent $\\texttt{36 \\% 5}$ et $\\texttt{36 // 5}$ ? Écris l'égalité de la division correspondante.",
            indice: "$\\texttt{//}$ donne le quotient et $\\texttt{\\%}$ le reste.",
            corrige: "$36 = 5 \\times 7 + 1$ : $\\texttt{36 // 5}$ vaut $7$ (le quotient) et $\\texttt{36 \\% 5}$ vaut $1$ (le reste). Comme le reste n'est pas nul, $36$ n'est pas un multiple de $5$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Vrai ou faux : « un nombre qui se termine par $3$ est divisible par $3$ ». Justifie.",
            indice: "Le critère de divisibilité par $3$ porte sur la somme des chiffres.",
            corrige: "**Faux.** $13$ se termine par $3$ mais n'est pas divisible par $3$ : $13 = 3 \\times 4 + 1$. Pour la divisibilité par $3$, on regarde la somme des chiffres."
          }
        ]
      }
    ]
  }
};
