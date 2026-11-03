/*
  ENTRAÎNEMENT : Automatismes — Fonctions et représentations
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre auto-fonctions.
  Format : voir data/automatismes/evaluation/calcul-numerique.js (série d'automatismes, puis deux exercices en situation).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["auto-fonctions"] = {
  revisions: {
    intro: "Les fonctions en un coup d'œil : image et antécédent, point d'une courbe, fonctions linéaires et affines, lectures graphiques, équation réduite d'une droite. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Image, antécédent",
        texte: "L'image de $a$ est $f(a)$, lue sur l'axe vertical : elle est unique. Les antécédents de $b$ sont les $x$ tels que $f(x) = b$, lus sur l'axe horizontal : il peut y en avoir plusieurs, ou aucun."
      },
      {
        titre: "Point d'une courbe",
        texte: "$M(x\\,;y)$ est sur la courbe de $f$ si et seulement si $y = f(x)$ : on calcule l'image de l'abscisse et on la compare à l'ordonnée."
      },
      {
        titre: "Linéaire, affine",
        texte: "$f(x) = mx + p$ est affine ; elle est linéaire si $p = 0$. Sa courbe est une droite, croissante si $m > 0$, décroissante si $m < 0$."
      },
      {
        titre: "Lectures graphiques",
        texte:
          "Avec la courbe de $f$ :\n" +
          "- $f(x) = k$ : les abscisses des points de la courbe d'ordonnée $k$ ;\n" +
          "- $f(x) > k$ : les abscisses des points situés au-dessus de la droite $y = k$ ;\n" +
          "- variations : on lit de gauche à droite si la courbe monte ou descend."
      },
      {
        titre: "Équation réduite d'une droite",
        texte: "La droite passant par $A$ et $B$ (avec $x_A \\neq x_B$) a pour coefficient directeur $m = \\dfrac{y_B - y_A}{x_B - x_A}$ ; on trouve ensuite $p$ avec les coordonnées de $A$ : $y_A = mx_A + p$."
      }
    ],
    pieges: [
      "L'image se lit sur l'axe vertical, l'antécédent sur l'axe horizontal.",
      "Pour tester un point, on calcule l'image de son **abscisse**, pas de son ordonnée.",
      "Une fonction affine n'est pas toujours linéaire : il faut $p = 0$.",
      "$m = \\dfrac{y_B - y_A}{x_B - x_A}$ : les $y$ en haut, les $x$ en bas, dans le même ordre.",
      "Les intervalles de variation s'écrivent avec des $x$, pas avec des valeurs de $f(x)$.",
      "Oublier un antécédent : une parallèle à l'axe des abscisses peut couper la courbe plusieurs fois."
    ]
  },

  evaluation: {
    intro: "Une série d'automatismes comme dans la partie 1 de l'épreuve anticipée, puis deux exercices qui les mettent en situation, **sans calculatrice** (environ $55$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Automatismes",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Pour chaque question, écris seulement le résultat, sans justification. Les questions 1 à 4 portent sur la fonction $f$ définie sur $[-2\\,;4]$, représentée ci-dessous.",
        figure: (o) => o.graph({
          xmin: -2.5, xmax: 4.5, ymin: -4.5, ymax: 5.5, h: 300,
          curves: [{ f: (x) => x * x - 2 * x - 3, a: -2, b: 4, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: 3.8, dx: -10, dy: -2 }],
          aria: "Courbe de f sur [−2 ; 4] : f(−2) = 5, f(−1) = 0, f(0) = −3, f(1) = −4, f(2) = −3, f(3) = 0, f(4) = 5"
        }),
        questions: [
          { n: "1.", points: 0.5, texte: "Lis l'image de $0$ par $f$.", corrige: "$f(0) = -3$." },
          { n: "2.", points: 0.5, texte: "Lis les antécédents de $0$ par $f$.", corrige: "$-1$ et $3$." },
          { n: "3.", points: 0.5, texte: "Résous graphiquement $f(x) = -3$.", corrige: "$x = 0$ ou $x = 2$." },
          { n: "4.", points: 0.5, texte: "Sur quel intervalle $f(x)$ est-il strictement négatif ?", corrige: "Sur $]-1\\,;3[$." },
          { n: "5.", points: 0.5, texte: "Le point $A(-2\\,;y)$ est sur la courbe de $g(x) = x^2 - 4x$. Que vaut $y$ ?", corrige: "$y = g(-2) = 4 + 8 = 12$." },
          { n: "6.", points: 0.5, texte: "Calcule l'image de $-3$ par $h(x) = 2x^2 - x$.", corrige: "$2 \\times 9 + 3 = 21$." },
          { n: "7.", points: 0.5, texte: "$f$ est linéaire et $f(4) = 10$. Donne l'expression de $f(x)$.", corrige: "$f(x) = mx$ avec $4m = 10$ : $f(x) = 2{,}5x$." },
          { n: "8.", points: 0.5, texte: "Donne le coefficient directeur de la droite passant par $A(-1\\,;2)$ et $B(3\\,;10)$.", corrige: "$\\dfrac{10 - 2}{3 - (-1)} = \\dfrac{8}{4} = 2$." },
          { n: "9.", points: 0.5, texte: "Donne l'équation réduite de la droite passant par $A(2\\,;1)$ et $B(4\\,;7)$.", corrige: "$m = \\dfrac{6}{2} = 3$, puis $1 = 3 \\times 2 + p$, donc $p = -5$ : $y = 3x - 5$." },
          { n: "10.", points: 0.5, texte: "En quel point la droite d'équation $y = -0{,}5x + 4$ coupe-t-elle l'axe des abscisses ?", corrige: "$-0{,}5x + 4 = 0 \\iff x = 8$ : au point $(8\\,;0)$." },
          { n: "11.", points: 0.5, texte: "Quel est l'antécédent de $7$ par la fonction $x \\mapsto 3x - 5$ ?", corrige: "$3x - 5 = 7 \\iff x = 4$." },
          { n: "12.", points: 0.5, texte: "Donne le signe de $2x - 6$ selon les valeurs de $x$.", corrige: "$2x - 6 < 0$ pour $x < 3$, $2x - 6 = 0$ pour $x = 3$ et $2x - 6 > 0$ pour $x > 3$." }
        ]
      },
      {
        titre: "Deux cuves",
        duree: 20, points: 7, calculatrice: false,
        contexte: "À l'instant $t = 0$, une cuve A contient $500$ L d'eau et se vide à raison de $20$ L par minute, tandis qu'une cuve B contient $100$ L et se remplit à raison de $30$ L par minute. On note $a(t)$ et $b(t)$ les volumes, en litres, au bout de $t$ minutes. Le graphique montre ces volumes pendant les $20$ premières minutes.",
        figure: (o) => o.graph({
          xmin: 0, xmax: 21, ymin: 0, ymax: 750, xstep: 1, ystep: 50, xetiq: 4, yetiq: 100, padL: 28, h: 280,
          curves: [
            { f: (t) => 500 - 20 * t, a: 0, b: 20, closed: false, label: "A", lx: 2, dx: 10, dy: -8 },
            { f: (t) => 100 + 30 * t, a: 0, b: 20, closed: false, label: "B", lx: 18, dx: -6, dy: -10 }
          ],
          aria: "Deux droites : le volume de la cuve A passe de 500 L à 100 L en 20 minutes, celui de la cuve B de 100 L à 700 L ; elles se croisent à 8 minutes"
        }),
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Quel volume d'eau chaque cuve contient-elle au bout de $5$ minutes ?",
            indice: "En $5$ minutes, la cuve A perd $5 \\times 20$ L et la cuve B gagne $5 \\times 30$ L.",
            corrige: "Cuve A : $500 - 5 \\times 20 = 400$ L. Cuve B : $100 + 5 \\times 30 = 250$ L."
          },
          {
            n: "2.", points: 1.5,
            texte: "Exprime $a(t)$ et $b(t)$ en fonction de $t$. Ces fonctions sont-elles affines ? linéaires ?",
            indice: "Volume de départ, plus ou moins le débit multiplié par le temps.",
            corrige: "$a(t) = 500 - 20t$ et $b(t) = 100 + 30t$. Ce sont des fonctions affines, de la forme $mt + p$ ; aucune n'est linéaire, car $p \\neq 0$ dans les deux cas."
          },
          {
            n: "3.", points: 2,
            texte: "Au bout de combien de temps les deux cuves contiennent-elles le même volume ? Quel est ce volume ? Vérifie sur le graphique.",
            indice: "Résous $500 - 20t = 100 + 30t$.",
            corrige: "$500 - 20t = 100 + 30t \\iff 400 = 50t \\iff t = 8$. Au bout de $8$ minutes, chaque cuve contient $500 - 160 = 340$ L : c'est le point où les deux droites se croisent."
          },
          {
            n: "4.", points: 2,
            texte: "À partir de quand la cuve B contient-elle plus d'eau que la cuve A ? Au bout de combien de temps la cuve A sera-t-elle vide ?",
            indice: "Résous $b(t) > a(t)$, puis $a(t) = 0$.",
            corrige: "$100 + 30t > 500 - 20t \\iff 50t > 400 \\iff t > 8$ : après $8$ minutes, la droite B est au-dessus de la droite A.\n\n$500 - 20t = 0 \\iff t = 25$ : la cuve A sera vide au bout de $25$ minutes, en dehors du graphique."
          }
        ]
      },
      {
        titre: "La température d'une journée",
        duree: 20, points: 7, calculatrice: false,
        contexte: "La courbe ci-dessous donne la température $T$, en degrés Celsius, mesurée sous un abri pendant une journée, en fonction de l'heure $h$, pour $h$ allant de $0$ à $24$.",
        figure: (o) => o.graph({
          xmin: 0, xmax: 24.5, ymin: 20, ymax: 30.5, xstep: 1, ystep: 0.5, xetiq: 2, yetiq: 1, padL: 24, h: 300,
          curves: [{ f: (h) => 25 - 4 * Math.cos((Math.PI * (h - 2)) / 12), a: 0, b: 24 }],
          aria: "Courbe de la température : environ 21,5 °C à 0 h, minimum 21 °C à 2 h, 25 °C à 8 h, maximum 29 °C à 14 h, 25 °C à 20 h, environ 21,5 °C à 24 h"
        }),
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Lis la température à $8$ h et à $14$ h.",
            indice: "On part de l'heure sur l'axe horizontal et on lit la température sur l'axe vertical.",
            corrige: "$T(8) = 25$ °C et $T(14) = 29$ °C."
          },
          {
            n: "2.", points: 1.5,
            texte: "À quelles heures la température est-elle de $25$ °C ?",
            indice: "Cherche les antécédents de $25$ : trace la droite horizontale d'ordonnée $25$.",
            corrige: "La droite d'ordonnée $25$ coupe la courbe en deux points : à $8$ h et à $20$ h."
          },
          {
            n: "3.", points: 2,
            texte: "Dresse le tableau de variations de $T$ sur $[0\\,;24]$, avec les températures minimale et maximale.",
            indice: "Repère les heures où la courbe change de sens.",
            corrige: "$T$ est décroissante sur $[0\\,;2]$, croissante sur $[2\\,;14]$, puis décroissante sur $[14\\,;24]$ :",
            tableauCorrige: { lignes: [["h", "0", "", "2", "", "14", "", "24"], ["T(h)", "21{,}5", "\\searrow", "21", "\\nearrow", "29", "\\searrow", "21{,}5"]] },
            corrigeFin: "La température minimale est $21$ °C, à $2$ h ; la maximale est $29$ °C, à $14$ h (les valeurs à $0$ h et $24$ h sont lues environ)."
          },
          {
            n: "4.", points: 2,
            texte: "Résous graphiquement $T(h) \\geqslant 25$. Pendant combien d'heures la température est-elle supérieure ou égale à $25$ °C ?",
            indice: "Cherche les heures où la courbe est au-dessus de la droite d'ordonnée $25$, ou dessus.",
            corrige: "La courbe est au-dessus de la droite d'ordonnée $25$ entre $8$ h et $20$ h : les solutions sont les $h$ de $[8\\,;20]$. La température atteint ou dépasse $25$ °C pendant $20 - 8 = 12$ heures."
          }
        ]
      }
    ]
  }
};
