/*
  ENTRAÎNEMENT : Terminale maths complémentaires — chapitre 9, Fonctions convexes
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-convexite.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths complémentaires.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-convexite"] = {
  revisions: {
    intro: "La convexité en un coup d'œil : la dérivée seconde, les courbes « en U » et « en ∩ », la position par rapport aux sécantes et aux tangentes, les points d'inflexion et leur sens dans un contexte. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Dérivée seconde",
        texte: "$f''$ est la dérivée de $f'$. Par exemple, pour $f(x) = x^4 + e^{-x}$ : $f'(x) = 4x^3 - e^{-x}$, puis $f''(x) = 12x^2 + e^{-x}$."
      },
      {
        titre: "Convexe, concave",
        texte: "$f$ est **convexe** sur $I$ si sa courbe est sous ses sécantes : elle est alors au-dessus de ses tangentes (« en U »). $f$ est **concave** si sa courbe est au-dessus de ses sécantes, donc sous ses tangentes (« en ∩ »)."
      },
      {
        titre: "Avec $f'$ ou $f''$",
        texte:
          "- $f$ convexe sur $I$ $\\iff$ $f'$ croissante sur $I$ $\\iff$ $f''(x) \\geqslant 0$ sur $I$ ;\n" +
          "- $f$ concave sur $I$ $\\iff$ $f'$ décroissante sur $I$ $\\iff$ $f''(x) \\leqslant 0$ sur $I$."
      },
      {
        titre: "Point d'inflexion",
        texte: "La courbe y change de convexité, et la tangente y traverse la courbe. Il faut que $f''$ s'annule **en changeant de signe** : pour $f(x) = x^4$, $f''(x) = 12x^2$ s'annule en $0$ sans changer de signe, donc pas de point d'inflexion en $0$."
      },
      {
        titre: "Dans un contexte",
        texte: "Pour un nombre cumulé $N(t)$, $N'(t)$ est le rythme d'augmentation. $N$ convexe : le rythme accélère ; $N$ concave : il ralentit. Au point d'inflexion où $N$ passe de convexe à concave, le rythme $N'$ est maximal."
      }
    ],
    pieges: [
      "Confondre convexe et croissante : $x \\mapsto e^{-x}$ est convexe et décroissante.",
      "Conclure à un point d'inflexion dès que $f''(a) = 0$, sans vérifier le changement de signe.",
      "Utiliser le signe de $f'$ au lieu de celui de $f''$ pour étudier la convexité.",
      "Croire que « non convexe » veut dire « concave » : une fonction peut n'être ni l'une ni l'autre sur un intervalle.",
      "Inverser les positions : convexe, c'est sous les sécantes et au-dessus des tangentes."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Étudier la convexité d'un polynôme",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On considère la fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = x^3 + 3x^2 - 9x - 11$, et sa courbe $\\mathcal{C}$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $f'(x)$ puis $f''(x)$.",
            indice: "Dérive deux fois de suite, terme à terme.",
            corrige: "$f'(x) = 3x^2 + 6x - 9$, puis $f''(x) = 6x + 6$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Étudie la convexité de $f$. Montre que $\\mathcal{C}$ a un point d'inflexion $A$, dont tu donneras les coordonnées.",
            indice: "Étudie le signe de $f''(x) = 6x + 6$.",
            corrige: "$f''(x) \\geqslant 0 \\iff x \\geqslant -1$ : $f$ est concave sur $]-\\infty\\,;-1]$ et convexe sur $[-1\\,;+\\infty[$.\n\n$f''$ s'annule en changeant de signe en $-1$, et $f(-1) = -1 + 3 + 9 - 11 = 0$ : $\\mathcal{C}$ a un point d'inflexion $A(-1\\,;0)$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Détermine une équation de la tangente $T$ à $\\mathcal{C}$ en $A$.",
            indice: "$y = f'(-1)(x + 1) + f(-1)$.",
            corrige: "$f'(-1) = 3 - 6 - 9 = -12$ et $f(-1) = 0$ : $T$ a pour équation $y = -12(x + 1)$, soit $y = -12x - 12$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Démontre que $f(x) - (-12x - 12) = (x + 1)^3$. Déduis-en la position de $\\mathcal{C}$ par rapport à $T$. Est-ce cohérent avec la question 2 ?",
            indice: "Développe $(x + 1)^3 = (x + 1)^2(x + 1)$. Puis $(x + 1)^3$ a le signe de $x + 1$.",
            corrige: "$f(x) + 12x + 12 = x^3 + 3x^2 + 3x + 1$, et $(x + 1)^2(x + 1) = (x^2 + 2x + 1)(x + 1) = x^3 + 3x^2 + 3x + 1$.\n\n$(x + 1)^3 < 0$ pour $x < -1$ : $\\mathcal{C}$ est sous $T$. $(x + 1)^3 > 0$ pour $x > -1$ : $\\mathcal{C}$ est au-dessus de $T$. C'est cohérent : là où $f$ est concave, la courbe est sous ses tangentes, là où elle est convexe, au-dessus. La tangente traverse la courbe au point d'inflexion."
          },
          {
            n: "5.", points: 1.5,
            texte: "Parmi toutes les tangentes à $\\mathcal{C}$, laquelle a le plus petit coefficient directeur ? Justifie avec $f''$.",
            indice: "Le coefficient directeur de la tangente au point d'abscisse $x$ est $f'(x)$. Le signe de $f''$ donne les variations de $f'$.",
            corrige: "$f''(x) \\leqslant 0$ sur $]-\\infty\\,;-1]$ et $f''(x) \\geqslant 0$ sur $[-1\\,;+\\infty[$ : $f'$ est décroissante puis croissante, avec un minimum en $-1$. Le plus petit coefficient directeur est $f'(-1) = -12$ : c'est celui de la tangente $T$ au point d'inflexion."
          }
        ]
      },
      {
        titre: "Une application qui se diffuse",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Une application de révision de maths est lancée dans les lycées de Mayotte. Le nombre de téléchargements, en milliers, $t$ semaines après le lancement est modélisé par $f(t) = \\dfrac{10}{1 + 9e^{-0{,}5t}}$, pour $t \\geqslant 0$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $f(0)$ et la limite de $f(t)$ quand $t$ tend vers $+\\infty$. Interprète.",
            indice: "Quand $t \\to +\\infty$, $-0{,}5t \\to -\\infty$, donc $e^{-0{,}5t} \\to 0$.",
            corrige: "$f(0) = \\dfrac{10}{1 + 9} = 1$ : $1\\,000$ téléchargements au lancement. Quand $t \\to +\\infty$, $e^{-0{,}5t} \\to 0$, donc $f(t) \\to \\dfrac{10}{1} = 10$ : le nombre de téléchargements se rapproche de $10\\,000$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Démontre que $f'(t) = \\dfrac{45e^{-0{,}5t}}{\\left(1 + 9e^{-0{,}5t}\\right)^2}$, puis donne le sens de variation de $f$.",
            indice: "$f = 10 \\times \\dfrac{1}{v}$ avec $v(t) = 1 + 9e^{-0{,}5t}$, et $\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$.",
            corrige: "$v'(t) = 9 \\times (-0{,}5)e^{-0{,}5t} = -4{,}5e^{-0{,}5t}$, donc $f'(t) = -\\dfrac{10v'(t)}{v(t)^2} = \\dfrac{45e^{-0{,}5t}}{\\left(1 + 9e^{-0{,}5t}\\right)^2}$.\n\nUne exponentielle et un carré non nul sont strictement positifs : $f'(t) > 0$, et $f$ est strictement croissante sur $[0\\,;+\\infty[$."
          },
          {
            n: "3.", points: 1.5,
            texte: "On admet que $f''(t) = \\dfrac{22{,}5e^{-0{,}5t}\\left(9e^{-0{,}5t} - 1\\right)}{\\left(1 + 9e^{-0{,}5t}\\right)^3}$. Étudie la convexité de $f$ sur $[0\\,;+\\infty[$.",
            indice: "Les nombres $22{,}5e^{-0{,}5t}$ et $\\left(1 + 9e^{-0{,}5t}\\right)^3$ sont strictement positifs : $f''(t)$ a le signe de $9e^{-0{,}5t} - 1$.",
            corrige: "$f''(t)$ a le signe de $9e^{-0{,}5t} - 1$. Or $9e^{-0{,}5t} - 1 \\geqslant 0 \\iff e^{-0{,}5t} \\geqslant \\dfrac{1}{9} \\iff -0{,}5t \\geqslant -\\ln 9 \\iff t \\leqslant 2\\ln 9$.\n\nDonc $f$ est convexe sur $[0\\,;2\\ln 9]$ et concave sur $[2\\ln 9\\,;+\\infty[$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Montre que la courbe de $f$ a un point d'inflexion $I$, dont tu donneras les coordonnées. Que représente ce point pour les téléchargements ?",
            indice: "$e^{-0{,}5 \\times 2\\ln 9} = e^{-\\ln 9} = \\dfrac{1}{9}$. Pense à $f'(t)$, le nombre de téléchargements par semaine.",
            corrige: "$f''$ s'annule en changeant de signe en $t = 2\\ln 9 \\approx 4{,}39$. Comme $e^{-\\ln 9} = \\dfrac{1}{9}$, $f(2\\ln 9) = \\dfrac{10}{1 + 1} = 5$ : le point d'inflexion est $I(2\\ln 9\\,;5)$.\n\nAvant $I$, le rythme $f'(t)$ augmente ; après $I$, il diminue. Au bout d'environ $4{,}4$ semaines, l'application est téléchargée le plus vite : $f'(2\\ln 9) = \\dfrac{45 \\times \\frac{1}{9}}{2^2} = 1{,}25$, soit $1\\,250$ téléchargements par semaine. C'est aussi le moment où la moitié des $10\\,000$ est atteinte.",
            figureCorrige: (o) => o.graph({
              xmin: -0.8, xmax: 14.6, ymin: 0, ymax: 11, xstep: 2, ystep: 1, h: 240, padL: 24,
              xlabel: "t", ylabel: "f",
              hlines: [{ y: 10, label: "y = 10" }],
              curves: [{ f: (t) => 10 / (1 + 9 * Math.exp(-0.5 * t)), a: 0, b: 14, label: "f", lx: 13, dy: 14 }],
              points: [{ x: 2 * Math.log(9), y: 5, label: "I", gauche: true }],
              aria: "Courbe de f pour t entre 0 et 14 : elle part de 1, monte de plus en plus vite jusqu'au point d'inflexion I d'abscisse environ 4,4 et d'ordonnée 5, puis de moins en moins vite vers la droite y = 10"
            })
          },
          {
            n: "5.", points: 1.5,
            texte: "Au bout de combien de semaines l'application aura-t-elle été téléchargée $9\\,000$ fois ?",
            indice: "Résous $f(t) \\geqslant 9$ en multipliant par $1 + 9e^{-0{,}5t}$, qui est strictement positif.",
            corrige: "Comme $1 + 9e^{-0{,}5t} > 0$ : $f(t) \\geqslant 9 \\iff 10 \\geqslant 9 + 81e^{-0{,}5t} \\iff e^{-0{,}5t} \\leqslant \\dfrac{1}{81} \\iff -0{,}5t \\leqslant -\\ln 81 \\iff t \\geqslant 2\\ln 81$.\n\nComme $2\\ln 81 \\approx 8{,}79$, les $9\\,000$ téléchargements sont atteints au bout d'environ $8{,}8$ semaines, au cours de la $9^\\text{e}$ semaine."
          }
        ]
      },
      {
        titre: "Entre deux feux",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Une voiture électrique démarre à un feu tricolore et s'arrête au feu suivant. La distance parcourue, en mètres, $t$ secondes après le démarrage est $d(t) = -0{,}5t^3 + 4{,}5t^2$, pour $t \\in [0\\,;6]$. Sa vitesse, en m/s, est $d'(t)$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $d(6)$ et $d'(t)$. Vérifie que la voiture est à l'arrêt en $t = 0$ et en $t = 6$.",
            indice: "Factorise $d'(t)$ par $1{,}5t$.",
            corrige: "$d(6) = -108 + 162 = 54$ : les feux sont à $54$ m l'un de l'autre. $d'(t) = -1{,}5t^2 + 9t = 1{,}5t(6 - t)$, donc $d'(0) = 0$ et $d'(6) = 0$ : la vitesse est nulle au départ et à l'arrivée."
          },
          {
            n: "2.", points: 1.5,
            texte: "Étudie la convexité de $d$ sur $[0\\,;6]$ et donne le point d'inflexion de sa courbe.",
            indice: "$d''(t) = -3t + 9$.",
            corrige: "$d''(t) = -3t + 9 \\geqslant 0 \\iff t \\leqslant 3$ : $d$ est convexe sur $[0\\,;3]$ et concave sur $[3\\,;6]$. $d''$ s'annule en changeant de signe en $3$, et $d(3) = -13{,}5 + 40{,}5 = 27$ : le point d'inflexion est $(3\\,;27)$, à mi-chemin."
          },
          {
            n: "3.", points: 1.5,
            texte: "Interprète ce résultat pour la vitesse. La voiture respecte-t-elle la limitation à $50$ km/h ?",
            indice: "$d$ convexe, c'est $d'$ croissante. Et $1$ m/s $= 3{,}6$ km/h.",
            corrige: "Sur $[0\\,;3]$, $d$ est convexe : $d'$ est croissante, la voiture accélère. Sur $[3\\,;6]$, $d'$ est décroissante : elle freine. La vitesse est maximale en $t = 3$ : $d'(3) = 1{,}5 \\times 3 \\times 3 = 13{,}5$ m/s, soit $13{,}5 \\times 3{,}6 = 48{,}6$ km/h. La limitation est respectée, de justesse."
          },
          {
            n: "4.", points: 2,
            texte: "Soit $S$ la sécante qui joint les points de la courbe d'abscisses $0$ et $3$. Donne une équation de $S$, puis démontre que $d(t) - 9t = -0{,}5t(t - 3)(t - 6)$. Déduis-en la position de la courbe par rapport à $S$ sur $[0\\,;3]$. Est-ce cohérent avec la question 2 ?",
            indice: "$S$ passe par $(0\\,;0)$ et $(3\\,;27)$. Pour le signe, regarde chaque facteur sur $[0\\,;3]$.",
            corrige: "$S$ passe par $O(0\\,;0)$ et $B(3\\,;27)$ : son coefficient directeur est $\\dfrac{27}{3} = 9$, et $S$ a pour équation $y = 9t$.\n\n$-0{,}5t(t - 3)(t - 6) = -0{,}5t(t^2 - 9t + 18) = -0{,}5t^3 + 4{,}5t^2 - 9t = d(t) - 9t$.\n\nSur $[0\\,;3]$ : $t \\geqslant 0$, $t - 3 \\leqslant 0$ et $t - 6 < 0$, donc le produit $t(t - 3)(t - 6)$ est positif ou nul, et $d(t) - 9t \\leqslant 0$. La courbe est sous la sécante $S$ : c'est cohérent avec la convexité de $d$ sur $[0\\,;3]$.",
            figureCorrige: (o) => o.graph({
              xmin: -0.4, xmax: 6.6, ymin: 0, ymax: 60, xstep: 1, ystep: 10, h: 240, padL: 24,
              xlabel: "t", ylabel: "d",
              curves: [
                { f: (t) => -0.5 * t ** 3 + 4.5 * t ** 2, a: 0, b: 6, label: "d", lx: 5.2, dy: -8 },
                { f: (t) => 9 * t, a: 0, b: 3, label: "S", lx: 1.5 }
              ],
              points: [{ x: 3, y: 27, label: "B", gauche: true }],
              aria: "Courbe de d pour t entre 0 et 6 et sécante S d'équation y = 9t entre O et B(3 ; 27) : entre 0 et 3, la courbe est sous la sécante"
            })
          }
        ]
      }
    ]
  }
};
