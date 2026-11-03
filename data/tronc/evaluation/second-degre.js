/*
  ENTRAÎNEMENT : Première tronc commun — chapitre 11, Fonctions polynômes de degré 2
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre tronc-second-degre.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Pas de discriminant (hors programme) : symétrie, forme factorisée, racine évidente. Polynômes différents de ceux de Première techno.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  const N = (t) => -10 * (t - 8) * (t - 18); // fréquentation de la plage (exercice 1)

  window.EVALUATIONS["tronc-second-degre"] = {
    revisions: {
      intro: "Les polynômes de degré 2 en un coup d'œil : orientation de la parabole, axe et sommet par la symétrie, forme factorisée, racine évidente et signe, sans discriminant. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "La parabole",
          texte: "La courbe de $f(x) = ax^2 + bx + c$ ($a \\neq 0$) est une parabole, tournée vers le haut si $a > 0$ et vers le bas si $a < 0$. Par exemple, celle de $-x^2 + 6x$ est tournée vers le bas."
        },
        {
          titre: "Axe et sommet",
          texte: "L'axe de symétrie passe au milieu de deux points de même ordonnée : si les racines sont $-1$ et $5$, l'axe est la droite d'équation $x = 2$. Le sommet est sur cet axe."
        },
        {
          titre: "Forme factorisée",
          texte: "$f(x) = a(x - x_1)(x - x_2)$ : les racines sont $x_1$ et $x_2$. $f(x)$ a le signe de $a$ à l'extérieur des racines, et le signe contraire entre elles."
        },
        {
          titre: "Racine évidente",
          texte: "$2$ est racine de $x^2 - 5x + 6$, car $4 - 10 + 6 = 0$. On écrit $x^2 - 5x + 6 = (x - 2)(x - k)$ : le terme constant vaut $2k = 6$, donc $k = 3$."
        },
        {
          titre: "Formes $ax^2$ et $ax^2 + c$",
          texte: "La parabole de $ax^2$ a pour sommet l'origine ; celle de $ax^2 + c$ a pour sommet $(0\\,;c)$. Dans les deux cas, l'axe des ordonnées est l'axe de symétrie."
        },
        {
          titre: "Modéliser",
          texte: "Le maximum (ou le minimum) se lit au sommet. On ne garde que les solutions qui ont un sens dans le contexte : pas de durée ni de longueur négative."
        }
      ],
      pieges: [
        "Lire les racines avec le mauvais signe : $(x + 3)$ s'annule en $-3$.",
        "Placer le sommet sur une racine : il est au milieu des racines.",
        "Confondre l'abscisse du sommet et son ordonnée.",
        "Oublier le coefficient $a$ de la forme factorisée.",
        "Dire « positif entre les racines » sans regarder le signe de $a$.",
        "Garder une solution qui n'a pas de sens, comme un temps négatif."
      ]
    },

    evaluation: {
      intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "La fréquentation d'une plage",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Un dimanche, le nombre de personnes présentes sur une plage, $t$ heures après minuit, est modélisé par $N(t) = -10(t - 8)(t - 18)$, pour $t \\in [8\\,;18]$ (modèle fictif).",
          figure: (o) => o.graph({
            xmin: 7, xmax: 19.2, ymin: 0, ymax: 280, xstep: 1, ystep: 20, yetiq: 40, h: 260, padL: 32,
            xlabel: "t", ylabel: "N(t)",
            curves: [{ f: N, a: 8, b: 18, closed: false, label: "N", lx: 16.6, dx: 18, dy: 2 }],
            aria: "Courbe en forme d'arche de la fréquentation : 0 personne à 8 h, maximum de 250 personnes à 13 h, 0 personne à 18 h"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule $N(8)$ et $N(18)$. Interprète.",
              indice: "Un facteur s'annule dans chaque cas.",
              corrige: "$N(8) = -10 \\times 0 \\times (-10) = 0$ et $N(18) = 0$ : la plage est vide à $8$ h et à $18$ h. Ce sont les racines de $N$."
            },
            {
              n: "2.", points: 1.5,
              texte: "À quelle heure la plage est-elle la plus fréquentée ? Combien de personnes y a-t-il alors ?",
              indice: "L'axe de symétrie passe au milieu des racines $8$ et $18$.",
              corrige: "L'axe de symétrie est la droite d'équation $t = 13$, au milieu de $8$ et $18$. Comme $a = -10 < 0$, $N$ y atteint son maximum : $N(13) = -10 \\times 5 \\times (-5) = 250$ personnes, à $13$ h."
            },
            {
              n: "3.", points: 1.5,
              texte: "Développe $N(t)$, puis calcule $N(10)$.",
              indice: "$(t - 8)(t - 18) = t^2 - 26t + 144$.",
              corrige: "$N(t) = -10(t^2 - 26t + 144) = -10t^2 + 260t - 1\\,440$. Et $N(10) = -10 \\times 2 \\times (-8) = 160$ personnes."
            },
            {
              n: "4.", points: 1.5,
              texte: "Montre que $N(t) \\geqslant 160$ équivaut à $t^2 - 26t + 160 \\leqslant 0$. Vérifie que $10$ est une racine de $t^2 - 26t + 160$, puis factorise ce polynôme.",
              indice: "Divise par $-10$ : le sens de l'inégalité change. Pour factoriser, le terme constant vaut $10k = 160$.",
              corrige: "$-10t^2 + 260t - 1\\,440 \\geqslant 160 \\iff -10t^2 + 260t - 1\\,600 \\geqslant 0 \\iff t^2 - 26t + 160 \\leqslant 0$, en divisant par $-10$.\n\n$100 - 260 + 160 = 0$ : $10$ est racine. Avec $10k = 160$, $k = 16$ : $t^2 - 26t + 160 = (t - 10)(t - 16)$."
            },
            {
              n: "5.", points: 1,
              texte: "La commune place un maître-nageur quand il y a au moins $160$ personnes. Pendant quelle période ?",
              indice: "$(t - 10)(t - 16)$ est négatif ou nul entre ses racines.",
              corrige: "$(t - 10)(t - 16) \\leqslant 0 \\iff t \\in [10\\,;16]$ : le maître-nageur est nécessaire de $10$ h à $16$ h."
            }
          ]
        },
        {
          titre: "Une forme factorisée",
          duree: 25, points: 7, calculatrice: false,
          contexte: "On considère la fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = -2x^2 + 4x + 16$.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Démontre que $f(x) = -2(x + 2)(x - 4)$.",
              indice: "Développe $(x + 2)(x - 4)$, puis multiplie par $-2$.",
              corrige: "$(x + 2)(x - 4) = x^2 - 4x + 2x - 8 = x^2 - 2x - 8$, donc $-2(x + 2)(x - 4) = -2x^2 + 4x + 16 = f(x)$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Donne les racines de $f$ et l'orientation de sa parabole.",
              indice: "Utilise la forme factorisée.",
              corrige: "Les racines sont $-2$ et $4$. Comme $a = -2 < 0$, la parabole est tournée vers le bas."
            },
            {
              n: "3.", points: 1.5,
              texte: "Donne l'axe de symétrie, le sommet et le tableau de variations de $f$.",
              indice: "L'axe passe au milieu de $-2$ et $4$.",
              corrige: "L'axe est la droite d'équation $x = 1$, et $f(1) = -2 \\times 3 \\times (-3) = 18$ : le sommet est $(1\\,;18)$. $f$ est croissante sur $]-\\infty\\,;1]$ et décroissante sur $[1\\,;+\\infty[$ ; son maximum est $18$.",
              tableauCorrige: { lignes: [["x", "-\\infty", "", "1", "", "+\\infty"], ["f(x)", "", "\\nearrow", "18", "\\searrow", ""]] }
            },
            {
              n: "4.", points: 1.5,
              texte: "Résous l'équation $f(x) = 16$. Vérifie que les solutions sont symétriques par rapport à l'axe de la parabole.",
              indice: "Avec la forme développée : $-2x^2 + 4x = 0$.",
              corrige: "$f(x) = 16 \\iff -2x^2 + 4x = 0 \\iff -2x(x - 2) = 0 \\iff x = 0$ ou $x = 2$. Le milieu de $0$ et $2$ est $1$ : les solutions sont bien symétriques par rapport à la droite d'équation $x = 1$."
            },
            {
              n: "5.", points: 1,
              texte: "Résous l'inéquation $f(x) > 0$.",
              indice: "Avec $a < 0$, $f(x)$ est positif entre les racines.",
              corrige: "$a = -2 < 0$ : $f(x)$ est strictement positif entre les racines. Donc $f(x) > 0 \\iff x \\in ]-2\\,;4[$."
            }
          ]
        },
        {
          titre: "Un plongeon",
          duree: 25, points: 6, calculatrice: false,
          contexte: "Un plongeur saute d'un rocher. Sa hauteur au-dessus de l'eau, en mètres, $t$ secondes après le saut, est modélisée par $h(t) = -5t^2 + 10t + 15$, pour $t \\geqslant 0$ et tant qu'il n'a pas touché l'eau.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule $h(0)$ et interprète. Vérifie que $h(t) = -5(t + 1)(t - 3)$.",
              indice: "Développe $(t + 1)(t - 3)$, puis multiplie par $-5$.",
              corrige: "$h(0) = 15$ : le plongeur saute d'une hauteur de $15$ m. Et $-5(t + 1)(t - 3) = -5(t^2 - 2t - 3) = -5t^2 + 10t + 15 = h(t)$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Au bout de combien de temps touche-t-il l'eau ?",
              indice: "Résous $h(t) = 0$, et ne garde que les solutions qui ont un sens.",
              corrige: "$h(t) = 0 \\iff t = -1$ ou $t = 3$. Un temps négatif n'a pas de sens ici : le plongeur touche l'eau au bout de $3$ secondes."
            },
            {
              n: "3.", points: 1.5,
              texte: "Quelle hauteur maximale atteint-il ? À quel instant ?",
              indice: "L'axe de symétrie passe au milieu des racines $-1$ et $3$.",
              corrige: "L'axe est la droite d'équation $t = 1$, au milieu de $-1$ et $3$, et $a = -5 < 0$ : le maximum est $h(1) = -5 + 10 + 15 = 20$ m, au bout de $1$ seconde. Le plongeur monte de $5$ m avant de redescendre."
            },
            {
              n: "4.", points: 1.5,
              texte: "Pendant combien de temps est-il plus haut que le rocher, c'est-à-dire à au moins $15$ m ?",
              indice: "Résous $h(t) \\geqslant 15$, soit $-5t^2 + 10t \\geqslant 0$.",
              corrige: "$h(t) \\geqslant 15 \\iff -5t^2 + 10t \\geqslant 0 \\iff -5t(t - 2) \\geqslant 0$. Ce produit, de coefficient $-5 < 0$, est positif ou nul entre ses racines $0$ et $2$ : $t \\in [0\\,;2]$. Le plongeur est au-dessus du rocher pendant $2$ secondes."
            }
          ]
        }
      ]
    }
  };
})();
