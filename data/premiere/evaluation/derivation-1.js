/*
  ENTRAÎNEMENT : Première spécialité — chapitre 7, Dérivation 1 : point de vue local
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-derivation-1.
  Format : voir data/premiere/evaluation/second-degre-2.js. Sans calculatrice (épreuve anticipée).
  Les formules de dérivation (chapitre 9) ne sont pas encore connues : nombres dérivés par le taux de variation ou lus.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-derivation-1"] = {
  revisions: {
    intro: "Le nombre dérivé en un coup d'œil : du taux de variation à la tangente, et ce qu'il veut dire (vitesse, coût marginal). Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Taux de variation",
        texte: "Entre $a$ et $b$ : $\\dfrac{f(b) - f(a)}{b - a}$. C'est la pente de la **sécante** passant par les points de la courbe d'abscisses $a$ et $b$."
      },
      {
        titre: "Nombre dérivé",
        texte:
          "$f'(a)$ est le nombre dont se rapproche $\\dfrac{f(a + h) - f(a)}{h}$ quand $h$ tend vers $0$.\n\n" +
          "On simplifie par $h$ **avant** de faire tendre $h$ vers $0$ : remplacer $h$ par $0$ trop tôt donne $\\dfrac{0}{0}$."
      },
      {
        titre: "Deux exemples à connaître",
        texte:
          "- $f(x) = x^2$ : le taux vaut $2a + h$, donc $f'(a) = 2a$ ;\n" +
          "- $f(x) = \\dfrac{1}{x}$ : le taux vaut $\\dfrac{-1}{a(a + h)}$, donc $f'(a) = -\\dfrac{1}{a^2}$ (pour $a \\neq 0$)."
      },
      {
        titre: "Tangente",
        texte: "La tangente au point $A(a\\,;f(a))$ est la droite qui passe par $A$ et dont le coefficient directeur est $f'(a)$ : la position limite des sécantes."
      },
      {
        titre: "Équation de la tangente",
        texte:
          "$y = f'(a)(x - a) + f(a)$.\n\n" +
          "Avec $f(3) = 9$ et $f'(3) = 6$ : $y = 6(x - 3) + 9$, soit $y = 6x - 9$."
      },
      {
        titre: "Lire un nombre dérivé",
        texte: "On part du point de contact, on avance d'**une unité** vers la droite le long de la tangente et on lit de combien on monte (pente positive) ou on descend (pente négative). Une tangente horizontale a une pente nulle."
      },
      {
        titre: "Approximation linéaire",
        texte:
          "Pour $h$ proche de $0$ : $f(a + h) \\approx f(a) + f'(a)h$.\n\n" +
          "Avec $f(x) = x^2$ : $3{,}01^2 \\approx 9 + 6 \\times 0{,}01 = 9{,}06$."
      },
      {
        titre: "Interpréter",
        texte:
          "- distance $d(t)$ : le taux est une **vitesse moyenne**, $d'(t)$ la **vitesse instantanée** ;\n" +
          "- coût $C(q)$ : $C'(q)$ est le **coût marginal**, environ le coût d'un article de plus."
      }
    ],
    pieges: [
      "Diviser $f(b) - f(a)$ par $b$ au lieu de $b - a$.",
      "Remplacer $h$ par $0$ avant de simplifier : on obtient $\\dfrac{0}{0}$.",
      "Confondre $f(a)$, l'ordonnée du point, et $f'(a)$, la pente de la tangente.",
      "Oublier le double produit : $(a + h)^2 = a^2 + 2ah + h^2$.",
      "Se tromper de signe dans $x - a$ quand $a$ est négatif : $x - (-2) = x + 2$.",
      "Confondre vitesse moyenne (pente d'une sécante) et vitesse instantanée (pente de la tangente)."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "La chute d'une noix de coco",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Une noix de coco se détache d'un cocotier, à $20$ m du sol. On néglige la résistance de l'air : au bout de $t$ secondes, elle est tombée de $d(t) = 5t^2$ mètres.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Au bout de combien de temps la noix de coco touche-t-elle le sol ?",
            indice: "Résous $5t^2 = 20$, avec $t \\geqslant 0$.",
            corrige: "$5t^2 = 20 \\iff t^2 = 4 \\iff t = 2$, car $t \\geqslant 0$. La noix touche le sol au bout de $2$ secondes."
          },
          {
            n: "2.", points: 1,
            texte: "Calcule sa vitesse moyenne pendant la chute.",
            indice: "Vitesse moyenne entre $0$ et $2$ : $\\dfrac{d(2) - d(0)}{2 - 0}$.",
            corrige: "$\\dfrac{d(2) - d(0)}{2 - 0} = \\dfrac{20 - 0}{2} = 10$ : la vitesse moyenne est de $10$ m/s."
          },
          {
            n: "3.", points: 1.5,
            texte: "Pour $h \\neq 0$, montre que le taux de variation de $d$ entre $1$ et $1 + h$ vaut $10 + 5h$. Déduis-en la vitesse instantanée de la noix au bout de $1$ seconde.",
            indice: "$d(1 + h) = 5(1 + h)^2 = 5(1 + 2h + h^2)$. Simplifie par $h$, puis fais tendre $h$ vers $0$.",
            corrige:
              "$d(1 + h) - d(1) = 5(1 + 2h + h^2) - 5 = 10h + 5h^2$, donc le taux vaut $\\dfrac{10h + 5h^2}{h} = 10 + 5h$.\n\n" +
              "Quand $h$ tend vers $0$, $10 + 5h$ se rapproche de $10$ : $d'(1) = 10$. Au bout de $1$ s, la noix tombe à $10$ m/s."
          },
          {
            n: "4.", points: 1.5,
            texte: "De la même façon, calcule $d'(2)$. À quelle vitesse, en km/h, la noix arrive-t-elle au sol ?",
            indice: "Le taux entre $2$ et $2 + h$ se simplifie en $20 + 5h$. Pour passer en km/h, multiplie par $3{,}6$.",
            corrige:
              "$d(2 + h) - d(2) = 5(4 + 4h + h^2) - 20 = 20h + 5h^2$, donc le taux vaut $20 + 5h$, qui se rapproche de $20$ : $d'(2) = 20$.\n\n" +
              "La noix arrive au sol à $20$ m/s, soit $20 \\times 3{,}6 = 72$ km/h : mieux vaut ne pas rester sous un cocotier !"
          },
          {
            n: "5.", points: 1,
            texte:
              "On exécute ce programme. Que vont afficher les quatre pentes, environ ? Que confirme-t-il ?\n\n" +
              "```python\ndef d(t):\n    return 5 * t**2\n\nh = 1\nfor k in range(4):\n    a = d(2 + h) - d(2)\n    print(a / h)\n    h = h / 10\n```",
            indice: "$h$ prend les valeurs $1$, $0{,}1$, $0{,}01$ et $0{,}001$. Chaque pente est le taux $20 + 5h$ de la question 4.",
            corrige: "Les pentes valent $20 + 5h$ : environ $25$, $20{,}5$, $20{,}05$ et $20{,}005$ (à de minuscules erreurs d'arrondi de Python près). Elles se rapprochent de $20$ quand $h$ diminue : cela confirme $d'(2) = 20$."
          },
          {
            n: "6.", points: 1,
            texte: "Vrai ou faux : « la vitesse instantanée au bout de $2$ s est le double de la vitesse moyenne pendant la chute ». Justifie.",
            indice: "Compare les résultats des questions 2 et 4.",
            corrige: "**Vrai.** La vitesse instantanée à $2$ s vaut $20$ m/s et la vitesse moyenne sur la chute $10$ m/s : c'est bien le double. La vitesse moyenne est la pente de la sécante, la vitesse instantanée celle de la tangente."
          }
        ]
      },
      {
        titre: "Des tangentes sur un graphique",
        duree: 25, points: 7, calculatrice: false,
        contexte: "La courbe $\\mathcal{C}_f$ ci-dessous représente une fonction $f$ dérivable sur $\\mathbb{R}$. On a tracé les tangentes à $\\mathcal{C}_f$ aux points $A$, $C$ et $B$, d'abscisses $0$, $1$ et $2$.",
        figure: (o) => o.graph({
          xmin: -1.6, xmax: 4.6, ymin: -2.6, ymax: 2.6, ystep: 0.5, yetiq: 1, h: 300,
          curves: [
            { f: (x) => 0.5 * x * x - x - 1, a: -1.4, b: 3.4, closed: false, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: 3.3, dx: -8, dy: -2 },
            { f: (x) => -x - 1, a: -1.4, b: 1.4, closed: false, couleur: 1 },
            { f: () => -1.5, a: -0.4, b: 2.4, closed: false, couleur: 2 },
            { f: (x) => x - 3, a: 0.6, b: 4.4, closed: false, couleur: 1 }
          ],
          points: [{ x: 0, y: -1, label: "A", gauche: true }, { x: 1, y: -1.5, label: "C" }, { x: 2, y: -1, label: "B" }],
          aria: "Courbe d'une fonction f et ses tangentes en A d'abscisse 0, en C d'abscisse 1 et en B d'abscisse 2"
        }),
        questions: [
          {
            n: "1.", points: 1,
            texte: "Lis $f(0)$, $f(1)$ et $f(2)$.",
            indice: "Ce sont les ordonnées des points $A$, $C$ et $B$.",
            corrige: "$f(0) = -1$, $f(1) = -1{,}5$ et $f(2) = -1$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Lis $f'(0)$, $f'(1)$ et $f'(2)$.",
            indice: "Sur chaque tangente, avance d'une unité vers la droite à partir du point de contact et compte de combien on monte ou on descend.",
            corrige: "Tangente en $A$ : quand on avance de $1$, on descend de $1$, donc $f'(0) = -1$. Tangente en $C$ : horizontale, donc $f'(1) = 0$. Tangente en $B$ : on monte de $1$, donc $f'(2) = 1$."
          },
          {
            n: "3.", points: 1,
            texte: "Détermine une équation de la tangente en $A$.",
            indice: "$y = f'(a)(x - a) + f(a)$ avec $a = 0$.",
            corrige: "$y = f'(0)(x - 0) + f(0) = -x - 1$."
          },
          {
            n: "4.", points: 1,
            texte: "La tangente en $B$ passe-t-elle par le point de coordonnées $(4\\,;1)$ ?",
            indice: "Écris l'équation de la tangente en $B$, puis remplace $x$ par $4$.",
            corrige: "Tangente en $B$ : $y = f'(2)(x - 2) + f(2) = (x - 2) - 1 = x - 3$. Pour $x = 4$ : $y = 4 - 3 = 1$. **Oui**, le point $(4\\,;1)$ est sur cette tangente."
          },
          {
            n: "5.", points: 1.5,
            texte: "Donne une valeur approchée de $f(0{,}1)$ avec l'approximation linéaire en $0$. Sachant qu'en fait $f(x) = 0{,}5x^2 - x - 1$, compare avec la valeur exacte.",
            indice: "$f(0 + h) \\approx f(0) + f'(0)h$ avec $h = 0{,}1$.",
            corrige:
              "$f(0{,}1) \\approx f(0) + f'(0) \\times 0{,}1 = -1 - 0{,}1 = -1{,}1$.\n\n" +
              "Valeur exacte : $f(0{,}1) = 0{,}5 \\times 0{,}01 - 0{,}1 - 1 = -1{,}095$. L'écart n'est que de $0{,}005$ : près de $A$, la courbe et la tangente sont presque confondues."
          },
          {
            n: "6.", points: 1,
            texte: "Calcule le taux de variation de $f$ entre $0$ et $2$. Que remarques-tu sur la sécante $(AB)$ ?",
            indice: "$\\dfrac{f(2) - f(0)}{2 - 0}$ avec les valeurs de la question 1.",
            corrige: "$\\dfrac{f(2) - f(0)}{2 - 0} = \\dfrac{-1 - (-1)}{2} = 0$ : la sécante $(AB)$ est horizontale, parallèle à la tangente en $C$."
          }
        ]
      },
      {
        titre: "Le coût marginal des jus de coco",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Un petit atelier de Mtsamboro prépare des bouteilles de jus de coco. Le coût de fabrication de $q$ bouteilles est $C(q) = 0{,}1q^2 + 4q + 100$ euros.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule le coût de fabrication de $50$ bouteilles.",
            indice: "Remplace $q$ par $50$ : $50^2 = 2\\,500$.",
            corrige: "$C(50) = 0{,}1 \\times 2\\,500 + 4 \\times 50 + 100 = 250 + 200 + 100 = 550$ €."
          },
          {
            n: "2.", points: 1.5,
            texte: "Pour $h \\neq 0$, montre que $\\dfrac{C(50 + h) - C(50)}{h} = 14 + 0{,}1h$.",
            indice: "$(50 + h)^2 = 2\\,500 + 100h + h^2$. Développe $C(50 + h)$, retire $C(50) = 550$, puis divise par $h$.",
            corrige:
              "$0{,}1(50 + h)^2 = 250 + 10h + 0{,}1h^2$ et $4(50 + h) = 200 + 4h$, donc $C(50 + h) = 550 + 14h + 0{,}1h^2$.\n\n" +
              "Donc $C(50 + h) - C(50) = 14h + 0{,}1h^2$ et, en divisant par $h \\neq 0$, le taux vaut $14 + 0{,}1h$."
          },
          {
            n: "3.", points: 1,
            texte: "Déduis-en le coût marginal $C'(50)$.",
            indice: "Que devient $14 + 0{,}1h$ quand $h$ tend vers $0$ ?",
            corrige: "Quand $h$ tend vers $0$, $14 + 0{,}1h$ se rapproche de $14$ : $C'(50) = 14$ €."
          },
          {
            n: "4.", points: 1.5,
            texte: "Calcule le coût exact de la $51$e bouteille, $C(51) - C(50)$, et compare avec le coût marginal.",
            indice: "Avec la question 2 et $h = 1$, le taux vaut directement $C(51) - C(50)$.",
            corrige: "Avec $h = 1$ : $C(51) - C(50) = 14 + 0{,}1 \\times 1 = 14{,}10$ €. Le coût marginal $14$ € en est une très bonne approximation : c'est, environ, le coût d'une bouteille de plus."
          },
          {
            n: "5.", points: 1,
            texte: "Dans le calcul de la question 2, quel est le rôle du nombre $50$ ? et celui de $h$ ?",
            indice: "L'un reste fixé pendant tout le calcul, l'autre prend des valeurs de plus en plus proches de $0$.",
            corrige: "$50$ est un **paramètre** : il est fixé, c'est la production étudiée. $h$ est une **variable** : elle prend des valeurs non nulles de plus en plus proches de $0$."
          }
        ]
      }
    ]
  }
};
