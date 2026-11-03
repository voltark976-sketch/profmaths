/*
  ENTRAÎNEMENT : Première tronc commun — chapitre 3, Automatismes : fonctions, graphiques et droites
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre tronc-graphiques.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  const T = (t) => 22 + 8 * Math.sin((Math.PI * (t - 9)) / 12); // température de la serre (modèle fictif)
  const g = (x) => 0.5 * x * (x - 3) * (x - 3); // fonction lue en exercice 3
  const sub = (a, b) => `${a}<tspan class="sub" dy="3">${b}</tspan>`;

  window.EVALUATIONS["tronc-graphiques"] = {
    revisions: {
      intro: "Lire des courbes et des droites en un coup d'œil : image et antécédents, résolution graphique, signe et variations, équation réduite et coefficient directeur. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Image, antécédents",
          texte: "Image de $a$ : on part de $a$ sur l'axe des abscisses et on lit l'**ordonnée** du point de la courbe. Antécédents de $b$ : on part de $b$ sur l'axe des ordonnées et on lit les **abscisses** des points de la courbe."
        },
        {
          titre: "Résoudre graphiquement",
          texte: "$f(x) = k$ : les abscisses des points de la courbe d'ordonnée $k$. $f(x) \\geqslant k$ : les abscisses des points situés sur la droite d'équation $y = k$ ou au-dessus."
        },
        {
          titre: "Signe",
          texte: "$f(x) > 0$ là où la courbe est au-dessus de l'axe des abscisses, $f(x) < 0$ là où elle est en dessous, et $f(x) = 0$ là où elle le coupe ou le touche."
        },
        {
          titre: "Variations",
          texte: "$f$ est croissante là où la courbe monte, de gauche à droite, et décroissante là où elle descend. Les intervalles se lisent sur l'axe des abscisses."
        },
        {
          titre: "Équation réduite",
          texte: "Pour $y = mx + p$ : $p$ est l'ordonnée du point d'abscisse $0$, et $m$ indique de combien $y$ varie quand $x$ augmente de $1$ (une droite qui descend a $m < 0$)."
        },
        {
          titre: "Pente par deux points",
          texte: "$m = \\dfrac{y_B - y_A}{x_B - x_A}$, puis on obtient $p$ en écrivant que $A$ est sur la droite : $y_A = m x_A + p$."
        }
      ],
      pieges: [
        "Lire une image sur l'axe des abscisses ou un antécédent sur l'axe des ordonnées.",
        "Inverser « au-dessus » et « en dessous » pour $f(x) < k$.",
        "Oublier les bornes (crochets fermés) pour $\\leqslant$ et $\\geqslant$.",
        "Écrire les intervalles de variation avec des ordonnées.",
        "Confondre le signe (position par rapport à l'axe) et les variations (la courbe monte ou descend).",
        "Mélanger l'ordre des points dans $\\dfrac{y_B - y_A}{x_B - x_A}$."
      ]
    },

    evaluation: {
      intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "La température d'une serre",
          duree: 25, points: 7, calculatrice: false,
          contexte: "La température dans une serre, en °C, au cours d'une journée est modélisée par une fonction $T$ de l'heure $t$, pour $t \\in [0\\,;24]$. Sa courbe est tracée ci-dessous (modèle fictif).",
          figure: (o) => o.graph({
            xmin: -1, xmax: 25.5, ymin: 12, ymax: 32, xstep: 1, xetiq: 3, ystep: 1, yetiq: 2, h: 280, padL: 26,
            xlabel: "t", ylabel: "T(t)",
            curves: [{ f: T, a: 0, b: 24, label: "T", lx: 19.2, dx: 18, dy: -2 }],
            points: [{ x: 3, y: 14 }, { x: 15, y: 30 }],
            aria: "Courbe de la température : environ 16 °C à minuit, minimum de 14 °C à 3 h, maximum de 30 °C à 15 h, puis environ 16 °C à minuit le soir ; 22 °C à 9 h et à 21 h"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Lis la température à minuit. Quelles sont la température la plus basse et la plus haute de la journée ? À quelles heures ?",
              indice: "Cherche le point le plus bas et le point le plus haut de la courbe.",
              corrige: "À minuit ($t = 0$), il fait environ $16$ °C. La température la plus basse est $14$ °C, à $3$ h ; la plus haute est $30$ °C, à $15$ h."
            },
            {
              n: "2.", points: 1.5,
              texte: "Donne les variations de $T$ sur $[0\\,;24]$.",
              indice: "Découpe la journée aux heures du minimum et du maximum.",
              corrige: "$T$ est décroissante sur $[0\\,;3]$, croissante sur $[3\\,;15]$, puis décroissante sur $[15\\,;24]$."
            },
            {
              n: "3.", points: 1.5,
              texte: "Résous graphiquement $T(t) = 22$. Interprète.",
              indice: "Trace la droite d'équation $y = 22$ et lis les abscisses des points d'intersection.",
              corrige: "La droite d'équation $y = 22$ coupe la courbe en $t = 9$ et $t = 21$ : il fait $22$ °C à $9$ h, quand la serre se réchauffe, et à $21$ h, quand elle se refroidit."
            },
            {
              n: "4.", points: 1.5,
              texte: "Au-dessus de $26$ °C, il faut ouvrir les aérations. Pendant quelle période de la journée ?",
              indice: "Résous $T(t) \\geqslant 26$ : regarde où la courbe est au-dessus de la droite d'équation $y = 26$.",
              corrige: "La courbe est sur la droite d'équation $y = 26$ ou au-dessus pour $t \\in [11\\,;19]$ : il faut aérer de $11$ h à $19$ h."
            },
            {
              n: "5.", points: 1,
              texte: "En dessous de $18$ °C, il faut chauffer. Pendant quelles périodes ?",
              indice: "Résous $T(t) \\leqslant 18$ : il y a deux périodes.",
              corrige: "La courbe est sur la droite d'équation $y = 18$ ou en dessous pour $t \\in [0\\,;7]$ et pour $t \\in [23\\,;24]$ : il faut chauffer de minuit à $7$ h, puis de $23$ h à minuit."
            }
          ]
        },
        {
          titre: "Deux réservoirs",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Le réservoir $A$ contient $500$ L d'eau et se vide à débit constant. Le réservoir $B$ contient $100$ L et se remplit à débit constant. Les volumes d'eau, en litres, en fonction du temps $x$, en heures, sont représentés par les droites $d_A$ et $d_B$.",
          figure: (o) => o.graph({
            xmin: -0.5, xmax: 13.4, ymin: 0, ymax: 560, xstep: 1, ystep: 20, yetiq: 100, h: 300, padL: 32,
            xlabel: "x", ylabel: "litres",
            curves: [
              { f: (x) => -40 * x + 500, a: 0, b: 12.5, closed: false, label: sub("d", "A"), lx: 10, dx: 12, dy: -6 },
              { f: (x) => 60 * x + 100, a: 0, b: 7.5, closed: false, label: sub("d", "B"), lx: 7.3, dx: 16, dy: 10 }
            ],
            points: [{ x: 0, y: 500 }, { x: 5, y: 300 }, { x: 0, y: 100 }, { x: 2, y: 220 }],
            aria: "Droite dA qui part de 500 L à x = 0 et passe par (5 ; 300) ; droite dB qui part de 100 L et passe par (2 ; 220) ; elles se croisent à x = 4"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "La droite $d_A$ passe par les points $(0\\,;500)$ et $(5\\,;300)$. Détermine son équation réduite et interprète son coefficient directeur.",
              indice: "$m = \\dfrac{300 - 500}{5 - 0}$.",
              corrige: "$m = \\dfrac{300 - 500}{5} = -40$ et $p = 500$ : $d_A$ a pour équation $y = -40x + 500$. Le réservoir $A$ perd $40$ L par heure."
            },
            {
              n: "2.", points: 1.5,
              texte: "La droite $d_B$ passe par les points $(0\\,;100)$ et $(2\\,;220)$. Détermine son équation réduite.",
              indice: "Même méthode : coefficient directeur, puis ordonnée à l'origine.",
              corrige: "$m = \\dfrac{220 - 100}{2 - 0} = 60$ et $p = 100$ : $d_B$ a pour équation $y = 60x + 100$. Le réservoir $B$ gagne $60$ L par heure."
            },
            {
              n: "3.", points: 1.5,
              texte: "Au bout de combien de temps les deux réservoirs contiennent-ils le même volume d'eau ? Lequel ?",
              indice: "Résous $-40x + 500 = 60x + 100$.",
              corrige: "$-40x + 500 = 60x + 100 \\iff 400 = 100x \\iff x = 4$. Au bout de $4$ h, chaque réservoir contient $-160 + 500 = 340$ L."
            },
            {
              n: "4.", points: 1.5,
              texte: "Au bout de combien de temps le réservoir $A$ est-il vide ? À partir de quand le réservoir $B$ contient-il plus de $400$ L ?",
              indice: "Résous $-40x + 500 = 0$, puis $60x + 100 > 400$.",
              corrige: "$-40x + 500 = 0 \\iff x = \\dfrac{500}{40} = 12{,}5$ : $A$ est vide au bout de $12$ h $30$ min.\n\n$60x + 100 > 400 \\iff 60x > 300 \\iff x > 5$ : $B$ dépasse $400$ L après $5$ h."
            },
            {
              n: "5.", points: 1,
              texte: "Vrai ou faux : « Le coefficient directeur de $d_A$ est positif, car la droite passe par des points d'ordonnées positives. » Justifie.",
              indice: "Le signe du coefficient directeur dit si la droite monte ou descend.",
              corrige: "**Faux.** $d_A$ descend : son coefficient directeur, $-40$, est négatif. Le signe des ordonnées des points ne donne pas le sens de la droite."
            }
          ]
        },
        {
          titre: "Signe ou variations ?",
          duree: 25, points: 6, calculatrice: false,
          contexte: "On a tracé ci-dessous la courbe d'une fonction $f$ définie sur $[-1\\,;4]$.",
          figure: (o) => o.graph({
            xmin: -1.5, xmax: 4.6, ymin: -8.6, ymax: 3.4, xstep: 0.5, xetiq: 1, ystep: 1, yetiq: 2, h: 320,
            curves: [{ f: g, a: -1, b: 4, label: sub("C", "f"), lx: 3.8, dx: 20, dy: 6 }],
            points: [{ x: 1, y: 2, label: "(1 ; 2)", gauche: true }, { x: 3, y: 0, label: "3" }, { x: 4, y: 2, label: "(4 ; 2)", gauche: true }, { x: -1, y: -8, label: "(−1 ; −8)" }],
            aria: "Courbe de f sur [−1 ; 4] : elle part de (−1 ; −8), monte jusqu'à (1 ; 2) en coupant l'axe des abscisses en 0, redescend jusqu'à toucher l'axe en (3 ; 0), puis remonte jusqu'à (4 ; 2)"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Lis $f(0)$, $f(1)$ et $f(4)$, puis donne les antécédents de $2$ par $f$.",
              indice: "Les antécédents de $2$ sont les abscisses des points de la courbe d'ordonnée $2$.",
              corrige: "$f(0) = 0$, $f(1) = 2$ et $f(4) = 2$. La courbe atteint l'ordonnée $2$ en deux points : les antécédents de $2$ sont $1$ et $4$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Dresse le tableau de signes de $f(x)$ sur $[-1\\,;4]$.",
              indice: "Où la courbe est-elle sous l'axe des abscisses ? Où le touche-t-elle ?",
              corrige: "La courbe est sous l'axe des abscisses avant $0$, au-dessus ensuite, sauf en $3$ où elle touche l'axe :",
              tableauCorrige: { lignes: [["x", "-1", "", "0", "", "3", "", "4"], ["f(x)", "", "-", "0", "+", "0", "+", ""]] }
            },
            {
              n: "3.", points: 1.5,
              texte: "Dresse le tableau de variations de $f$ sur $[-1\\,;4]$.",
              indice: "La courbe monte, puis descend, puis remonte.",
              corrige: "$f$ est croissante sur $[-1\\,;1]$, décroissante sur $[1\\,;3]$, puis croissante sur $[3\\,;4]$ :",
              tableauCorrige: { lignes: [["x", "-1", "", "1", "", "3", "", "4"], ["f(x)", "-8", "\\nearrow", "2", "\\searrow", "0", "\\nearrow", "2"]] }
            },
            {
              n: "4.", points: 1.5,
              texte: "Vrai ou faux ? Justifie. a) « $f$ est positive sur $[1\\,;3]$, donc elle est croissante sur $[1\\,;3]$. » b) « Le maximum de $f$ sur $[-1\\,;4]$ est $2$. »",
              indice: "Le signe dit où est la courbe par rapport à l'axe, les variations disent si elle monte ou descend.",
              corrige: "a) **Faux.** Sur $[1\\,;3]$, $f(x) \\geqslant 0$, mais la courbe descend : $f$ y est décroissante. Positive ne veut pas dire croissante.\n\nb) **Vrai.** Le point le plus haut de la courbe a pour ordonnée $2$ ; ce maximum est atteint deux fois, en $x = 1$ et en $x = 4$."
            }
          ]
        }
      ]
    }
  };
})();
