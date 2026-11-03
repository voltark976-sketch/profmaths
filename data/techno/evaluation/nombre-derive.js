/*
  ENTRAÎNEMENT : Première technologique — chapitre 9, Nombre dérivé et tangente
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre techno-nombre-derive.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Point de vue local seulement (taux de variation entre a et a + h, limite intuitive) : la fonction dérivée est au chapitre 10.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  const f = (x) => -0.5 * x * x + 2 * x + 1; // fonction de l'exercice 2 (ses tangentes en 0, 2 et 4 ont pour pentes 2, 0 et −2)

  window.EVALUATIONS["techno-nombre-derive"] = {
    revisions: {
      intro: "Le nombre dérivé en un coup d'œil : des sécantes à la tangente, le nombre dérivé comme limite d'un taux, l'équation de la tangente et la vitesse instantanée. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Sécante et taux",
          texte: "Le taux de variation $\\dfrac{f(a + h) - f(a)}{h}$ est le coefficient directeur de la sécante qui passe par les points de la courbe d'abscisses $a$ et $a + h$."
        },
        {
          titre: "Nombre dérivé",
          texte: "$f'(a)$ est la valeur vers laquelle tend ce taux quand $h$ tend vers $0$. Pour $f(x) = 3x^2$ en $a = 1$ : le taux vaut $6 + 3h$, qui tend vers $6$, donc $f'(1) = 6$."
        },
        {
          titre: "Tangente",
          texte: "La tangente en $A(a\\,;f(a))$ est la droite qui passe par $A$ et dont le coefficient directeur est $f'(a)$ : c'est la position limite des sécantes."
        },
        {
          titre: "Équation de la tangente",
          texte: "$y = f'(a)(x - a) + f(a)$. Près de $a$, la courbe et sa tangente sont très proches : la tangente permet d'estimer $f(x)$."
        },
        {
          titre: "Lire $f'(a)$",
          texte: "Sur la tangente, on avance de $1$ en abscisse et on lit de combien on monte (pente positive) ou on descend (pente négative). Une tangente horizontale a une pente nulle."
        },
        {
          titre: "En contexte",
          texte: "Si $d(t)$ est une distance, le taux entre deux instants est une vitesse moyenne, et $d'(t)$ est la vitesse instantanée. Pour un coût $C(q)$, $C'(q)$ est le coût marginal."
        }
      ],
      pieges: [
        "Confondre $f(a)$, l'ordonnée du point, et $f'(a)$, la pente de la tangente.",
        "Diviser par $a$ au lieu de $h$ dans le taux de variation.",
        "Prendre le taux pour $h = 1$ pour le nombre dérivé : il faut faire tendre $h$ vers $0$.",
        "Écrire $y = f'(a)x + f(a)$ : il manque le $(x - a)$, sauf si $a = 0$.",
        "Confondre vitesse moyenne (taux sur un intervalle) et vitesse instantanée (nombre dérivé).",
        "Se tromper de signe en lisant une pente : une droite qui descend a un coefficient directeur négatif."
      ]
    },

    evaluation: {
      intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Un nombre dérivé par le calcul",
          duree: 25, points: 7, calculatrice: false,
          contexte: "On considère la fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = x^2 - 3x$, et le point $A$ de sa courbe d'abscisse $2$.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule $f(2)$. Pour $h \\neq 0$, montre que $f(2 + h) = h^2 + h - 2$.",
              indice: "$(2 + h)^2 = 4 + 4h + h^2$, puis retire $3(2 + h)$.",
              corrige: "$f(2) = 4 - 6 = -2$. Et $f(2 + h) = (2 + h)^2 - 3(2 + h) = 4 + 4h + h^2 - 6 - 3h = h^2 + h - 2$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Montre que le taux de variation de $f$ entre $2$ et $2 + h$ vaut $h + 1$. Calcule-le pour $h = 1$, $h = 0{,}1$ et $h = 0{,}01$.",
              indice: "$\\dfrac{f(2 + h) - f(2)}{h}$, puis factorise le numérateur par $h$.",
              corrige: "$\\dfrac{f(2 + h) - f(2)}{h} = \\dfrac{h^2 + h - 2 + 2}{h} = \\dfrac{h(h + 1)}{h} = h + 1$.\n\nPour $h = 1$ : $2$ ; pour $h = 0{,}1$ : $1{,}1$ ; pour $h = 0{,}01$ : $1{,}01$."
            },
            {
              n: "3.", points: 1.5,
              texte: "Déduis-en le nombre dérivé $f'(2)$. Que représente-t-il pour la courbe ?",
              indice: "Vers quoi tend $h + 1$ quand $h$ tend vers $0$ ?",
              corrige: "Quand $h$ tend vers $0$, $h + 1$ tend vers $1$ : $f'(2) = 1$. C'est le coefficient directeur de la tangente à la courbe au point $A$."
            },
            {
              n: "4.", points: 1.5,
              texte: "Détermine l'équation réduite de la tangente à la courbe en $A$.",
              indice: "$y = f'(2)(x - 2) + f(2)$.",
              corrige: "$y = 1 \\times (x - 2) + (-2)$, soit $y = x - 4$."
            },
            {
              n: "5.", points: 1,
              texte: "Utilise la tangente pour estimer $f(2{,}1)$, puis compare avec la valeur exacte.",
              indice: "Remplace $x$ par $2{,}1$ dans l'équation de la tangente.",
              corrige: "Avec la tangente : $2{,}1 - 4 = -1{,}9$. Valeur exacte : $f(2{,}1) = 4{,}41 - 6{,}3 = -1{,}89$. L'estimation est très proche, car $2{,}1$ est près de $2$."
            }
          ]
        },
        {
          titre: "Lire des tangentes",
          duree: 25, points: 7, calculatrice: false,
          contexte: "On a tracé la courbe d'une fonction $f$ et ses tangentes aux points $A$, $B$ et $C$ d'abscisses $0$, $2$ et $4$.",
          figure: (o) => o.graph({
            xmin: -0.6, xmax: 5.6, ymin: -1.4, ymax: 4.4, xstep: 0.5, xetiq: 1, ystep: 0.5, yetiq: 1, h: 300,
            curves: [
              { f, a: -0.4, b: 4.95, closed: false, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: 4.6, dx: 22, dy: 6 },
              { f: (x) => 2 * x + 1, a: -0.4, b: 1.2, closed: false, couleur: 1 },
              { f: () => 3, a: 1, b: 3, closed: false, couleur: 1 },
              { f: (x) => -2 * x + 9, a: 3.3, b: 4.7, closed: false, couleur: 1 }
            ],
            points: [{ x: 0, y: 1, label: "A", gauche: true }, { x: 2, y: 3, label: "B" }, { x: 4, y: 1, label: "C" }],
            aria: "Courbe de f qui monte de A(0 ; 1) jusqu'à B(2 ; 3), puis redescend vers C(4 ; 1) ; la tangente en A monte de 2 quand on avance de 1, la tangente en B est horizontale, la tangente en C descend de 2 quand on avance de 1"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Lis $f(0)$, $f(2)$ et $f(4)$.",
              indice: "Ce sont les ordonnées des points $A$, $B$ et $C$.",
              corrige: "$f(0) = 1$, $f(2) = 3$ et $f(4) = 1$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Lis $f'(0)$, $f'(2)$ et $f'(4)$. Explique ta méthode.",
              indice: "Sur chaque tangente, avance de $1$ en abscisse : de combien monte-t-on ou descend-on ?",
              corrige: "Sur la tangente en $A$, on monte de $2$ quand on avance de $1$ : $f'(0) = 2$. La tangente en $B$ est horizontale : $f'(2) = 0$. Sur la tangente en $C$, on descend de $2$ quand on avance de $1$ : $f'(4) = -2$."
            },
            {
              n: "3.", points: 1.5,
              texte: "Détermine l'équation réduite de la tangente en $C$.",
              indice: "$y = f'(4)(x - 4) + f(4)$.",
              corrige: "$y = -2(x - 4) + 1 = -2x + 8 + 1$, soit $y = -2x + 9$."
            },
            {
              n: "4.", points: 1.5,
              texte: "D'après la courbe, sur quel intervalle $f$ est-elle croissante ? Quel est le signe des nombres dérivés $f'(a)$ pour $a$ dans cet intervalle ?",
              indice: "Compare avec la tangente en $A$, qui monte.",
              corrige: "$f$ est croissante sur $[0\\,;2]$ : en chaque point de la courbe entre $A$ et $B$, la tangente monte, et $f'(a) \\geqslant 0$ (il est nul en $B$, où la tangente est horizontale). Après $B$, la courbe descend et les nombres dérivés sont négatifs."
            },
            {
              n: "5.", points: 1,
              texte: "Vrai ou faux : « $f'(4) = 1$, car le point $C$ a pour ordonnée $1$. » Justifie.",
              indice: "L'ordonnée de $C$, est-ce $f(4)$ ou $f'(4)$ ?",
              corrige: "**Faux.** L'ordonnée de $C$ est $f(4) = 1$. Le nombre dérivé $f'(4)$ est la pente de la tangente en $C$ : il vaut $-2$."
            }
          ]
        },
        {
          titre: "La chute d'une noix de coco",
          duree: 25, points: 6, calculatrice: false,
          contexte: "Une noix de coco tombe d'un cocotier de $20$ m de haut. La distance qu'elle a parcourue, en mètres, $t$ secondes après le début de sa chute, est $d(t) = 5t^2$.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Au bout de combien de temps la noix touche-t-elle le sol ? Quelle est sa vitesse moyenne pendant la chute ?",
              indice: "Résous $5t^2 = 20$ avec $t \\geqslant 0$. Vitesse moyenne : distance divisée par durée.",
              corrige: "$5t^2 = 20 \\iff t^2 = 4 \\iff t = 2$, car $t \\geqslant 0$ : la noix touche le sol au bout de $2$ s. Sa vitesse moyenne est $\\dfrac{20}{2} = 10$ m/s."
            },
            {
              n: "2.", points: 1.5,
              texte: "Pour un instant $a$ et $h \\neq 0$, montre que le taux de variation de $d$ entre $a$ et $a + h$ vaut $10a + 5h$.",
              indice: "$(a + h)^2 = a^2 + 2ah + h^2$.",
              corrige: "$d(a + h) - d(a) = 5(a^2 + 2ah + h^2) - 5a^2 = 10ah + 5h^2 = h(10a + 5h)$. En divisant par $h$, le taux vaut $10a + 5h$."
            },
            {
              n: "3.", points: 1.5,
              texte: "Déduis-en la vitesse instantanée $d'(a)$. Calcule la vitesse au bout de $1$ s, puis au moment où la noix touche le sol, en m/s et en km/h.",
              indice: "Quand $h$ tend vers $0$, $10a + 5h$ tend vers $10a$. Et $1$ m/s $= 3{,}6$ km/h.",
              corrige: "$d'(a) = 10a$. Au bout de $1$ s : $10$ m/s. Au sol, à $t = 2$ : $20$ m/s, soit $20 \\times 3{,}6 = 72$ km/h. Mieux vaut ne pas être dessous !"
            },
            {
              n: "4.", points: 1.5,
              texte:
                "Qu'affiche environ ce programme ? Vers quel nombre les résultats se rapprochent-ils ?\n\n" +
                "```python\ndef d(t):\n    return 5 * t**2\n\ndef taux(a, h):\n    return (d(a+h)-d(a)) / h\n\nfor h in [1, 0.1, 0.01]:\n    print(taux(1, h))\n```",
              indice: "Avec la question 2, le taux entre $1$ et $1 + h$ vaut $10 + 5h$.",
              corrige: "Il affiche le taux entre $1$ et $1 + h$, soit $10 + 5h$ : $15$, puis environ $10{,}5$, puis environ $10{,}05$ (l'ordinateur peut écrire de petites erreurs d'arrondi). Les résultats se rapprochent de $d'(1) = 10$."
            }
          ]
        }
      ]
    }
  };
})();
