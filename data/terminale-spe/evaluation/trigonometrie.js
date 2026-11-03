/*
  ENTRAÎNEMENT : Terminale spécialité — chapitre 12, Fonctions trigonométriques
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-spe-trigonometrie.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit du bac.
  Pas de formules d'addition (hors programme) : les dérivées se factorisent sans elles. Modèle de la grande roue fictif.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-spe-trigonometrie"] = {
  revisions: {
    intro: "Les fonctions trigonométriques en un coup d'œil : valeurs remarquables, parité, période, dérivées, équations et inéquations sur le cercle, phénomènes périodiques. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Valeurs remarquables",
        texte: "$\\cos 0 = 1$, $\\cos\\dfrac{\\pi}{6} = \\dfrac{\\sqrt{3}}{2}$, $\\cos\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$, $\\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$, $\\cos\\dfrac{\\pi}{2} = 0$ ; les sinus s'obtiennent dans l'ordre inverse. Les autres se lisent sur le cercle par symétrie."
      },
      {
        titre: "Parité et période",
        texte: "$\\cos$ est paire et $\\sin$ est impaire ; toutes deux sont $2\\pi$-périodiques. La fonction $x \\mapsto \\cos(\\omega x)$ a pour période $\\dfrac{2\\pi}{\\omega}$."
      },
      {
        titre: "Dérivées",
        texte: "$(\\sin x)' = \\cos x$ et $(\\cos x)' = -\\sin x$. Pour une fonction affine à l'intérieur : $(\\sin(ax + b))' = a\\cos(ax + b)$ et $(\\cos(ax + b))' = -a\\sin(ax + b)$."
      },
      {
        titre: "Équations",
        texte: "$\\cos x = a$ : droite verticale d'abscisse $a$ ; $\\sin x = a$ : droite horizontale d'ordonnée $a$. Si $-1 < a < 1$, deux points du cercle : $\\cos x = \\cos\\alpha$ donne $\\pm\\alpha$, $\\sin x = \\sin\\alpha$ donne $\\alpha$ et $\\pi - \\alpha$, dans l'intervalle demandé."
      },
      {
        titre: "Inéquations",
        texte: "On résout l'équation associée, on place les solutions sur le cercle, on colorie l'arc qui convient (à droite pour $\\cos x > a$, au-dessus pour $\\sin x > a$), puis on lit l'intervalle en tournant dans le sens direct."
      },
      {
        titre: "Limite à connaître",
        texte: "$\\lim\\limits_{x \\to 0} \\dfrac{\\sin x}{x} = 1$ : c'est le nombre dérivé de $\\sin$ en $0$, soit $\\cos 0$."
      },
      {
        titre: "Phénomènes périodiques",
        texte: "$t \\mapsto a\\cos(\\omega t) + b$, avec $a > 0$, oscille entre $b - a$ et $b + a$, avec la période $\\dfrac{2\\pi}{\\omega}$ : marées, températures, grandes roues…"
      }
    ],
    pieges: [
      "Oublier le signe moins dans $(\\cos x)' = -\\sin x$.",
      "Oublier le facteur $a$ dans la dérivée de $\\sin(ax + b)$ ou de $\\cos(ax + b)$.",
      "Donner une seule solution à $\\cos x = a$ alors qu'il y en a deux en général.",
      "Prendre $-\\alpha$ comme seconde solution de $\\sin x = \\sin\\alpha$ : c'est $\\pi - \\alpha$.",
      "Laisser une solution hors de l'intervalle demandé.",
      "Calculer en degrés au lieu de radians."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit du bac (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Une étude de fonction",
        duree: 30, points: 7, calculatrice: true,
        contexte: "On considère la fonction $f$ définie sur $[0\\,;2\\pi]$ par $f(x) = x + 2\\cos x$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $f'(x)$.",
            indice: "$(\\cos x)' = -\\sin x$.",
            corrige: "$f'(x) = 1 - 2\\sin x$."
          },
          {
            n: "2.", points: 2,
            texte: "Résous dans $[0\\,;2\\pi]$ l'équation $f'(x) = 0$, puis l'inéquation $f'(x) > 0$.",
            indice: "$f'(x) = 0 \\iff \\sin x = \\dfrac{1}{2}$ : place les deux solutions sur le cercle, puis regarde où le point est sous la droite $y = \\dfrac{1}{2}$.",
            corrige: "$f'(x) = 0 \\iff \\sin x = \\dfrac{1}{2} \\iff x = \\dfrac{\\pi}{6}$ ou $x = \\dfrac{5\\pi}{6}$ dans $[0\\,;2\\pi]$. Puis $f'(x) > 0 \\iff \\sin x < \\dfrac{1}{2}$ : sur le cercle, ce sont les points sous la droite horizontale d'ordonnée $\\dfrac{1}{2}$, soit $x \\in \\left[0\\,;\\dfrac{\\pi}{6}\\right[ \\cup \\left]\\dfrac{5\\pi}{6}\\,;2\\pi\\right]$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Dresse le tableau de variations de $f$ sur $[0\\,;2\\pi]$, avec les valeurs exactes.",
            indice: "$f\\left(\\dfrac{\\pi}{6}\\right) = \\dfrac{\\pi}{6} + 2 \\times \\dfrac{\\sqrt{3}}{2}$.",
            corrige: "$f$ est croissante sur $\\left[0\\,;\\dfrac{\\pi}{6}\\right]$, décroissante sur $\\left[\\dfrac{\\pi}{6}\\,;\\dfrac{5\\pi}{6}\\right]$, croissante sur $\\left[\\dfrac{5\\pi}{6}\\,;2\\pi\\right]$. Avec $f(0) = 2$, $f\\left(\\dfrac{\\pi}{6}\\right) = \\dfrac{\\pi}{6} + \\sqrt{3} \\approx 2{,}26$, $f\\left(\\dfrac{5\\pi}{6}\\right) = \\dfrac{5\\pi}{6} - \\sqrt{3} \\approx 0{,}89$ et $f(2\\pi) = 2\\pi + 2 \\approx 8{,}28$.",
            tableauCorrige: { lignes: [["x", "0", "", "\\frac{\\pi}{6}", "", "\\frac{5\\pi}{6}", "", "2\\pi"], ["f'(x)", "", "+", "0", "-", "0", "+", ""], ["f(x)", "2", "\\nearrow", "2{,}26", "\\searrow", "0{,}89", "\\nearrow", "8{,}28"]] },
            corrigeFin: "Dans le tableau, les valeurs sont arrondies au centième ; les valeurs exactes sont données au-dessus."
          },
          {
            n: "4.", points: 1.5,
            texte: "Démontre que la courbe de $f$ est au-dessus de la droite $\\Delta : y = x - 2$. En quel point la touche-t-elle ?",
            indice: "Étudie le signe de $f(x) - (x - 2)$, avec $\\cos x \\geqslant -1$.",
            corrige: "$f(x) - (x - 2) = 2\\cos x + 2 = 2(\\cos x + 1) \\geqslant 0$, car $\\cos x \\geqslant -1$ : la courbe est au-dessus de $\\Delta$. L'égalité a lieu quand $\\cos x = -1$, soit $x = \\pi$ : la courbe touche $\\Delta$ au point $(\\pi\\,;\\pi - 2)$."
          },
          {
            n: "5.", points: 1,
            texte: "On prolonge $f$ à $\\mathbb{R}$ par la même formule. Détermine la limite de $f$ en $+\\infty$.",
            indice: "Utilise la question 4 et un théorème de comparaison.",
            corrige: "Pour tout réel $x$, $f(x) \\geqslant x - 2$, et $x - 2 \\to +\\infty$ : par comparaison, $f(x) \\to +\\infty$."
          }
        ]
      },
      {
        titre: "Sur le cercle",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes. Donne les valeurs exactes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $\\cos\\dfrac{3\\pi}{4}$, $\\sin\\dfrac{7\\pi}{6}$ et $\\cos\\left(-\\dfrac{\\pi}{3}\\right)$.",
            indice: "Place chaque point sur le cercle et utilise les symétries.",
            corrige: "$\\cos\\dfrac{3\\pi}{4} = -\\dfrac{\\sqrt{2}}{2}$ ; $\\sin\\dfrac{7\\pi}{6} = -\\dfrac{1}{2}$ ; $\\cos\\left(-\\dfrac{\\pi}{3}\\right) = \\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$, car $\\cos$ est paire."
          },
          {
            n: "2.", points: 1.5,
            texte: "Résous dans $]-\\pi\\,;\\pi]$ l'équation $2\\cos x + \\sqrt{3} = 0$.",
            indice: "$\\cos x = -\\dfrac{\\sqrt{3}}{2} = \\cos\\dfrac{5\\pi}{6}$.",
            corrige: "$2\\cos x + \\sqrt{3} = 0 \\iff \\cos x = -\\dfrac{\\sqrt{3}}{2}$. Dans $]-\\pi\\,;\\pi]$ : $x = \\dfrac{5\\pi}{6}$ ou $x = -\\dfrac{5\\pi}{6}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Résous dans $[0\\,;2\\pi[$ l'équation $\\sin x = -\\dfrac{\\sqrt{2}}{2}$.",
            indice: "Les deux points du cercle d'ordonnée $-\\dfrac{\\sqrt{2}}{2}$ sont sous l'axe des abscisses.",
            corrige: "Dans $[0\\,;2\\pi[$ : $x = \\dfrac{5\\pi}{4}$ ou $x = \\dfrac{7\\pi}{4}$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Résous dans $[-\\pi\\,;\\pi]$ l'inéquation $\\sin x \\geqslant \\dfrac{1}{2}$.",
            indice: "Équation associée : $\\sin x = \\dfrac{1}{2}$. Puis colorie l'arc au-dessus de la droite $y = \\dfrac{1}{2}$.",
            corrige: "$\\sin x = \\dfrac{1}{2}$ pour $x = \\dfrac{\\pi}{6}$ et $x = \\dfrac{5\\pi}{6}$. Les points du cercle au-dessus de la droite $y = \\dfrac{1}{2}$ correspondent à $S = \\left[\\dfrac{\\pi}{6}\\,;\\dfrac{5\\pi}{6}\\right]$."
          },
          {
            n: "5.", points: 1,
            texte: "Étudie la parité de $g(x) = x\\cos x$, puis donne la période de $h(x) = \\sin\\left(\\dfrac{\\pi x}{2}\\right)$.",
            indice: "Compare $g(-x)$ et $g(x)$. La période de $\\sin(\\omega x)$ est $\\dfrac{2\\pi}{\\omega}$.",
            corrige: "$g(-x) = -x\\cos(-x) = -x\\cos x = -g(x)$ : $g$ est impaire. La période de $h$ est $\\dfrac{2\\pi}{\\pi/2} = 4$."
          }
        ]
      },
      {
        titre: "La grande roue",
        duree: 20, points: 6, calculatrice: true,
        contexte: "La hauteur, en mètres, d'une nacelle de grande roue, $t$ minutes après le départ, est $h(t) = 20 - 18\\cos\\left(\\dfrac{\\pi t}{5}\\right)$ (modèle fictif).",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Quelle est la durée d'un tour ? Quelles sont les hauteurs minimale et maximale de la nacelle ?",
            indice: "Période de $\\cos(\\omega t)$ : $\\dfrac{2\\pi}{\\omega}$. Et $-1 \\leqslant \\cos \\leqslant 1$.",
            corrige: "La période vaut $\\dfrac{2\\pi}{\\pi/5} = 10$ : un tour dure $10$ minutes. Comme $-1 \\leqslant \\cos\\left(\\dfrac{\\pi t}{5}\\right) \\leqslant 1$, la hauteur va de $20 - 18 = 2$ m (au départ) à $20 + 18 = 38$ m (pour $t = 5$)."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $h'(t)$ et étudie les variations de $h$ sur $[0\\,;10]$.",
            indice: "$(\\cos(at))' = -a\\sin(at)$.",
            corrige: "$h'(t) = -18 \\times \\left(-\\dfrac{\\pi}{5}\\right)\\sin\\left(\\dfrac{\\pi t}{5}\\right) = \\dfrac{18\\pi}{5}\\sin\\left(\\dfrac{\\pi t}{5}\\right)$. Pour $t \\in [0\\,;5]$, $\\dfrac{\\pi t}{5} \\in [0\\,;\\pi]$ et le sinus est positif : $h$ croît. Pour $t \\in [5\\,;10]$, il est négatif : $h$ décroît."
          },
          {
            n: "3.", points: 1.5,
            texte: "Pendant un tour, combien de temps la nacelle est-elle à plus de $29$ m de haut ?",
            indice: "$h(t) > 29 \\iff \\cos\\left(\\dfrac{\\pi t}{5}\\right) < -\\dfrac{1}{2}$. Pose $X = \\dfrac{\\pi t}{5}$, avec $X \\in [0\\,;2\\pi]$.",
            corrige: "$h(t) > 29 \\iff \\cos X < -\\dfrac{1}{2}$ avec $X = \\dfrac{\\pi t}{5} \\in [0\\,;2\\pi]$, soit $X \\in \\left]\\dfrac{2\\pi}{3}\\,;\\dfrac{4\\pi}{3}\\right[$. Donc $t \\in \\left]\\dfrac{10}{3}\\,;\\dfrac{20}{3}\\right[$ : la nacelle reste $\\dfrac{10}{3}$ min au-dessus de $29$ m, soit $3$ min $20$ s par tour."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Qu'affiche ce programme ? Est-ce cohérent avec la question 3 ?\n\n" +
              "```python\nfrom math import cos, pi\n\ndef h(t):\n    c = cos(pi * t / 5)\n    return 20 - 18 * c\n\nt = 0\nwhile h(t) < 29:\n    t = t + 0.5\nprint(t)\n```",
            indice: "Le programme avance de demi-minute en demi-minute. Calcule $h(3)$ et $h(3{,}5)$.",
            corrige: "$h(3) \\approx 25{,}6$ et $h(3{,}5) \\approx 30{,}6$ : le programme affiche $\\texttt{3.5}$. C'est cohérent : la nacelle dépasse $29$ m à $t = \\dfrac{10}{3} \\approx 3{,}33$ min, entre $3$ et $3{,}5$."
          }
        ]
      }
    ]
  }
};
