/*
  ENTRAÎNEMENT : Seconde — chapitre 6, Fonctions affines, inégalités et inéquations
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-fonctions-affines.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle ou devoir commun de Seconde.
  Tarifs du cinéma fictifs.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["seconde-fonctions-affines"] = {
  revisions: {
    intro: "Les fonctions affines en un coup d'œil : le coefficient et l'ordonnée à l'origine, les variations, le signe, les inégalités et les inéquations. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Fonction affine",
        texte: "$f(x) = mx + p$ : sa courbe est une droite. $p = f(0)$ est l'ordonnée à l'origine, $m$ le coefficient directeur (taux d'accroissement) : $m = \\dfrac{f(b) - f(a)}{b - a}$ pour $a \\neq b$."
      },
      {
        titre: "Retrouver $f(x)$",
        texte: "Avec deux images : on calcule $m$ par le taux d'accroissement, puis $p$ avec une des images. Si $f(1) = 5$ et $f(4) = -1$ : $m = \\dfrac{-1 - 5}{4 - 1} = -2$, puis $p = 5 - (-2) = 7$."
      },
      {
        titre: "Sens de variation",
        texte: "$m > 0$ : $f$ croissante ; $m < 0$ : décroissante ; $m = 0$ : constante. Seul le coefficient de $x$ compte : $5 - 3x$ est décroissante."
      },
      {
        titre: "Signe",
        texte: "Si $m \\neq 0$, $mx + p$ s'annule en $-\\dfrac{p}{m}$. Si $m > 0$ : négatif puis positif ; si $m < 0$ : positif puis négatif."
      },
      {
        titre: "Inégalités",
        texte:
          "- on peut ajouter un même nombre aux deux membres ;\n" +
          "- on peut multiplier par un nombre **positif** sans changer le sens ;\n" +
          "- multiplier ou diviser par un nombre **négatif** change le sens.\n\n" +
          "On ne soustrait jamais deux inégalités membre à membre."
      },
      {
        titre: "Inéquation",
        texte: "On la résout comme une équation, en pensant au changement de sens : $-3x < 6 \\iff x > -2$. Les solutions forment un intervalle, ici $]-2\\,;+\\infty[$."
      },
      {
        titre: "Comparer deux tarifs",
        texte: "Un tarif « partie fixe + prix par unité » est affine. On résout $f(x) = g(x)$ pour trouver le point de bascule, puis $f(x) < g(x)$ pour savoir quand $f$ est moins cher."
      },
      {
        titre: "Négation",
        texte: "Le contraire de $x < 3$ est $x \\geqslant 3$. Le contraire de « $A$ et $B$ » est « non $A$ ou non $B$ » : le contraire de $2 \\leqslant x < 5$ est $x < 2$ ou $x \\geqslant 5$."
      }
    ],
    pieges: [
      "Croire que $5 - 3x$ est croissante parce que $5$ est positif : seul le coefficient de $x$ compte.",
      "Inverser le calcul du taux : $m = \\dfrac{f(b) - f(a)}{b - a}$.",
      "Oublier de changer le sens de l'inégalité en divisant par un nombre négatif.",
      "Écrire que le contraire de $x < 3$ est $x > 3$ : il manque le cas $x = 3$.",
      "Mettre un crochet fermé du côté de l'infini.",
      "Oublier la partie fixe d'un tarif."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle ou au devoir commun (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Retrouver une fonction affine",
        duree: 25, points: 7, calculatrice: true,
        contexte: "$f$ est une fonction affine telle que $f(2) = 1$ et $f(5) = 10$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine l'expression de $f(x)$.",
            indice: "$m = \\dfrac{f(5) - f(2)}{5 - 2}$, puis $p$ avec $f(2) = 2m + p = 1$.",
            corrige: "$m = \\dfrac{10 - 1}{5 - 2} = 3$. Puis $f(2) = 3 \\times 2 + p = 1$, donc $p = -5$ : $f(x) = 3x - 5$. Vérification : $f(5) = 15 - 5 = 10$."
          },
          {
            n: "2.", points: 1,
            texte: "Donne le sens de variation de $f$. Justifie.",
            indice: "Regarde le signe de $m$.",
            corrige: "$m = 3 > 0$ : $f$ est croissante sur $\\mathbb{R}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Dresse le tableau de signes de $f(x)$.",
            indice: "$3x - 5 = 0 \\iff x = \\dfrac{5}{3}$, et $m > 0$.",
            corrige: "$f(x) = 0 \\iff x = \\dfrac{5}{3}$. Comme $m = 3 > 0$, $f(x)$ est négatif avant $\\dfrac{5}{3}$ et positif après.",
            tableauCorrige: { lignes: [["x", "-\\infty", "", "\\dfrac{5}{3}", "", "+\\infty"], ["f(x)", "", "-", "0", "+", ""]] }
          },
          {
            n: "4.", points: 1.5,
            texte: "Résous l'inéquation $f(x) \\geqslant 7$.",
            indice: "$3x - 5 \\geqslant 7$ : isole $x$.",
            corrige: "$3x - 5 \\geqslant 7 \\iff 3x \\geqslant 12 \\iff x \\geqslant 4$ (on divise par $3 > 0$, le sens ne change pas). $S = [4\\,;+\\infty[$."
          },
          {
            n: "5.", points: 1.5,
            texte: "Sans calculer les images, compare $f(\\sqrt{3})$ et $f(1{,}7)$.",
            indice: "Compare d'abord $\\sqrt{3}$ et $1{,}7$, puis utilise le sens de variation de $f$.",
            corrige: "$\\sqrt{3} \\approx 1{,}732 > 1{,}7$ (en effet $1{,}7^2 = 2{,}89 < 3$). Comme $f$ est croissante, elle conserve l'ordre : $f(\\sqrt{3}) > f(1{,}7)$."
          }
        ]
      },
      {
        titre: "Trois formules de cinéma",
        duree: 25, points: 7, calculatrice: true,
        contexte:
          "Un cinéma de Mamoudzou propose trois formules par mois (tarifs fictifs) :\n\n" +
          "- formule A : $8$ € la séance ;\n" +
          "- formule B : un abonnement de $20$ €, puis $4$ € la séance ;\n" +
          "- formule C : $45$ € pour des séances illimitées.\n\n" +
          "On note $x$ le nombre de séances dans le mois, et $A(x)$, $B(x)$ et $C(x)$ le prix payé avec chaque formule.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Exprime $A(x)$, $B(x)$ et $C(x)$ en fonction de $x$.",
            indice: "Partie fixe plus prix par séance multiplié par $x$.",
            corrige: "$A(x) = 8x$, $B(x) = 4x + 20$ et $C(x) = 45$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Résous $A(x) < B(x)$. Pour combien de séances la formule A est-elle moins chère que la B ?",
            indice: "$8x < 4x + 20$ : regroupe les $x$.",
            corrige: "$8x < 4x + 20 \\iff 4x < 20 \\iff x < 5$. La formule A est moins chère que la B jusqu'à $4$ séances ; pour $5$ séances, elles coûtent toutes deux $40$ €."
          },
          {
            n: "3.", points: 1.5,
            texte: "Résous $B(x) < C(x)$. Jusqu'à combien de séances la formule B est-elle moins chère que la C ?",
            indice: "$4x + 20 < 45$.",
            corrige: "$4x + 20 < 45 \\iff 4x < 25 \\iff x < 6{,}25$. Comme $x$ est entier, la formule B est moins chère que la C jusqu'à $6$ séances."
          },
          {
            n: "4.", points: 2,
            texte: "Conseille un spectateur selon le nombre de séances qu'il prévoit dans le mois.",
            indice: "Combine les questions 2 et 3, et compare aussi $A$ et $C$ : $8x < 45 \\iff x < 5{,}625$.",
            corrige:
              "- de $0$ à $4$ séances : formule A (par exemple $32$ € pour $4$ séances) ;\n" +
              "- $5$ séances : A ou B, $40$ € dans les deux cas ;\n" +
              "- $6$ séances : formule B ($44$ €, contre $48$ € et $45$ €) ;\n" +
              "- $7$ séances ou plus : formule C ($45$ €, contre $56$ € et $48$ € pour $7$ séances)."
          },
          {
            n: "5.", points: 1,
            texte:
              "Que fait ce programme ? Combien de lignes affiche-t-il ?\n\n" +
              "```python\nfor x in range(0, 9):\n    a = 8 * x\n    b = 4 * x + 20\n    print(x, a, b, 45)\n```",
            indice: "$\\texttt{range(0, 9)}$ donne les entiers de $0$ à $8$. Que représentent $\\texttt{a}$ et $\\texttt{b}$ ?",
            corrige: "Pour $x$ allant de $0$ à $8$, il affiche le nombre de séances et les prix des trois formules ($\\texttt{a}$ pour A, $\\texttt{b}$ pour B, $45$ pour C) : $9$ lignes, un tableau de valeurs qui permet de vérifier la question 4."
          }
        ]
      },
      {
        titre: "Inégalités et logique",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "On sait que $2 \\leqslant x \\leqslant 5$. Donne un encadrement de $-3x + 1$.",
            indice: "Multiplie par $-3$ (le sens change), puis ajoute $1$.",
            corrige: "En multipliant par $-3 < 0$, le sens change : $-15 \\leqslant -3x \\leqslant -6$. En ajoutant $1$ : $-14 \\leqslant -3x + 1 \\leqslant -5$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Résous l'inéquation $3 - 2x < x + 9$.",
            indice: "Regroupe les $x$ d'un côté ; attention au signe du coefficient au moment de diviser.",
            corrige: "$3 - 2x < x + 9 \\iff -3x < 6 \\iff x > -2$ (on divise par $-3 < 0$, le sens change). $S = \\,]-2\\,;+\\infty[$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Un club accepte les jeunes tels que $x \\geqslant 12$ et $x < 18$, où $x$ est l'âge. Écris la condition contraire, et l'ensemble des âges refusés.",
            indice: "Le contraire de « $A$ et $B$ » est « non $A$ ou non $B$ ».",
            corrige: "Le contraire de « $x \\geqslant 12$ et $x < 18$ » est « $x < 12$ ou $x \\geqslant 18$ ». Les âges refusés forment $[0\\,;12[ \\cup [18\\,;+\\infty[$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Vrai ou faux : « si $a < b$, alors $-2a < -2b$ ». Justifie.",
            indice: "Essaie avec $a = 1$ et $b = 2$.",
            corrige: "**Faux.** Pour $a = 1$ et $b = 2$ : $-2a = -2$ et $-2b = -4$, et $-2 > -4$. Multiplier par $-2 < 0$ change le sens : si $a < b$, alors $-2a > -2b$."
          }
        ]
      }
    ]
  }
};
