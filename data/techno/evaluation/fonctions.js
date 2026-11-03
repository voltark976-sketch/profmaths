/*
  ENTRAÎNEMENT : Première technologique — chapitre 7, Fonctions : courbes et taux de variation
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre techno-fonctions.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  const h = (t) => -5 * t * t + 20 * t; // hauteur du ballon (exercice 1)
  const H = (t) => 2.2 + 1.8 * Math.cos((Math.PI * (t - 1)) / 6); // hauteur d'eau, modèle fictif (exercice 2)

  window.EVALUATIONS["techno-fonctions"] = {
    revisions: {
      intro: "Les fonctions en un coup d'œil : image et antécédent, taux de variation, sens de variation, résolution graphique, modélisation et balayage. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Image, antécédent",
          texte: "$f(3) = 7$ : $7$ est l'image de $3$, et $3$ est un antécédent de $7$. Un nombre a une seule image, mais il peut avoir plusieurs antécédents, ou aucun."
        },
        {
          titre: "Taux de variation",
          texte: "Entre $a$ et $b$ : $\\dfrac{f(b) - f(a)}{b - a}$, la variation de $y$ divisée par celle de $x$. C'est le coefficient directeur de la sécante, et en contexte une variation moyenne, par exemple une vitesse moyenne."
        },
        {
          titre: "Croissante, décroissante",
          texte: "Croissante : les images sont rangées dans le même ordre que les nombres ; décroissante : dans l'ordre inverse. Sur un intervalle où $f$ est croissante, ses taux de variation sont positifs."
        },
        {
          titre: "Résoudre sur une courbe",
          texte: "$f(x) = k$ : les abscisses des points de la courbe d'ordonnée $k$. $f(x) > k$ : les abscisses des points de la courbe situés au-dessus de la droite d'équation $y = k$."
        },
        {
          titre: "Modéliser",
          texte: "On choisit la variable $x$ (une durée, une longueur, une quantité), on exprime la grandeur étudiée en fonction de $x$, et on précise l'intervalle des valeurs possibles de $x$."
        },
        {
          titre: "Balayage",
          texte: "Pour encadrer une solution de $f(x) = k$, on calcule $f(x)$ de $0{,}1$ en $0{,}1$ jusqu'à dépasser $k$ : la solution est entre les deux dernières valeurs de $x$ essayées."
        }
      ],
      pieges: [
        "Confondre image et antécédent : dans $f(2) = 5$, $5$ est l'image de $2$.",
        "Oublier les parenthèses avec un nombre négatif : pour $x^2$, $f(-3) = (-3)^2 = 9$.",
        "Inverser le taux : les images sont au numérateur, $\\dfrac{f(b) - f(a)}{b - a}$.",
        "Croire que le taux de variation d'une fonction non affine est le même partout.",
        "Lire une inéquation graphique sur l'axe des ordonnées : les solutions sont des abscisses.",
        "Oublier l'unité et le contexte dans la réponse (secondes, mètres, heures…)."
      ]
    },

    evaluation: {
      intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Le lancer d'un ballon",
          duree: 25, points: 7, calculatrice: false,
          contexte: "On lance un ballon vers le haut. Sa hauteur, en mètres, $t$ secondes après le lancer, est $h(t) = -5t^2 + 20t$, pour $t \\in [0\\,;4]$.",
          figure: (o) => o.graph({
            xmin: -0.3, xmax: 4.4, ymin: 0, ymax: 22, xstep: 0.5, xetiq: 1, ystep: 2, yetiq: 4, h: 240, padL: 26,
            xlabel: "t", ylabel: "h(t)",
            curves: [{ f: h, a: 0, b: 4, label: "h", lx: 3.5, dx: 16, dy: -2 }],
            aria: "Courbe de la hauteur du ballon : elle part de 0, monte jusqu'à 20 m en t = 2, puis redescend jusqu'à 0 en t = 4"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule $h(1)$, $h(2)$ et $h(4)$. Interprète $h(4)$.",
              indice: "Calcule le carré d'abord : $h(1) = -5 \\times 1 + 20 \\times 1$.",
              corrige: "$h(1) = -5 + 20 = 15$, $h(2) = -20 + 40 = 20$ et $h(4) = -80 + 80 = 0$ : au bout de $4$ secondes, le ballon retombe au sol."
            },
            {
              n: "2.", points: 1.5,
              texte: "Vérifie que $1$ et $3$ sont des antécédents de $15$ par $h$. Interprète.",
              indice: "Calcule $h(3)$.",
              corrige: "$h(1) = 15$ et $h(3) = -45 + 60 = 15$ : $1$ et $3$ sont des antécédents de $15$. Le ballon est à $15$ m de haut deux fois : en montant, à $1$ s, et en redescendant, à $3$ s."
            },
            {
              n: "3.", points: 1.5,
              texte: "Calcule le taux de variation de $h$ entre $0$ et $1$, puis entre $1$ et $2$. Interprète ces nombres.",
              indice: "$\\dfrac{h(1) - h(0)}{1 - 0}$, en mètres par seconde.",
              corrige: "Entre $0$ et $1$ : $\\dfrac{15 - 0}{1 - 0} = 15$. Entre $1$ et $2$ : $\\dfrac{20 - 15}{2 - 1} = 5$.\n\nCe sont des vitesses moyennes de montée : $15$ m/s pendant la première seconde, puis $5$ m/s pendant la deuxième. Le ballon ralentit en montant."
            },
            {
              n: "4.", points: 1.5,
              texte: "Calcule le taux de variation de $h$ entre $2$ et $4$. Que traduit son signe ? Donne le sens de variation de $h$ sur $[0\\,;2]$ et sur $[2\\,;4]$, d'après la courbe.",
              indice: "Un taux négatif signifie que $h$ a diminué entre les deux instants.",
              corrige: "$\\dfrac{h(4) - h(2)}{4 - 2} = \\dfrac{0 - 20}{2} = -10$ : il est négatif, le ballon descend, en moyenne de $10$ m par seconde.\n\nD'après la courbe, $h$ est croissante sur $[0\\,;2]$ et décroissante sur $[2\\,;4]$ : le ballon monte jusqu'à $20$ m, puis redescend."
            },
            {
              n: "5.", points: 1,
              texte: "Vrai ou faux : « Le taux de variation de $h$ est le même entre $0$ et $1$ qu'entre $1$ et $2$. » Justifie.",
              indice: "Compare les résultats de la question 3.",
              corrige: "**Faux.** Il vaut $15$ dans un cas et $5$ dans l'autre : $h$ n'est pas une fonction affine, son taux de variation change selon l'intervalle."
            }
          ]
        },
        {
          titre: "La marée au port",
          duree: 25, points: 7, calculatrice: false,
          contexte: "À Mayotte, la marée fait beaucoup varier la hauteur d'eau. Un jour donné, la hauteur d'eau dans un port, en mètres, est modélisée par une fonction $H$ de l'heure $t$, pour $t \\in [0\\,;12]$ (de minuit à midi). Sa courbe est tracée ci-dessous (modèle fictif).",
          figure: (o) => o.graph({
            xmin: -0.5, xmax: 12.6, ymin: 0, ymax: 4.6, xstep: 1, ystep: 0.2, yetiq: 1, h: 280, padL: 26,
            xlabel: "t", ylabel: "H(t)",
            hlines: [{ y: 3.1, label: "y = 3,1" }],
            curves: [{ f: H, a: 0, b: 12, label: "H", lx: 9.4, dx: 18, dy: 6 }],
            points: [{ x: 1, y: 4 }, { x: 7, y: 0.4 }],
            aria: "Courbe de la hauteur d'eau : 3,8 m environ à minuit, maximum de 4 m à 1 h, minimum de 0,4 m à 7 h, puis remontée jusqu'à 3,8 m environ à midi ; la droite y = 3,1 est tracée"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Lis la hauteur d'eau à minuit. Quand la marée est-elle haute ? Basse ? Quelles sont alors les hauteurs d'eau ?",
              indice: "Cherche le point le plus haut et le point le plus bas de la courbe.",
              corrige: "À minuit, la hauteur d'eau est d'environ $3{,}8$ m. La marée est haute à $1$ h, avec $4$ m d'eau, et basse à $7$ h, avec $0{,}4$ m."
            },
            {
              n: "2.", points: 1.5,
              texte: "Donne le sens de variation de $H$ sur $[0\\,;12]$. Que se passe-t-il pour la mer à chaque étape ?",
              indice: "Découpe l'intervalle aux heures de marée haute et de marée basse.",
              corrige: "$H$ est croissante sur $[0\\,;1]$ (la mer monte), décroissante sur $[1\\,;7]$ (la mer descend), puis croissante sur $[7\\,;12]$ (elle remonte)."
            },
            {
              n: "3.", points: 1.5,
              texte: "Résous graphiquement $H(t) = 2{,}2$. Interprète.",
              indice: "Trace la droite d'équation $y = 2{,}2$ et lis les abscisses des points d'intersection.",
              corrige: "La droite d'équation $y = 2{,}2$ coupe la courbe en $t = 4$ et $t = 10$ : la hauteur d'eau est de $2{,}2$ m à $4$ h et à $10$ h, une fois en descendant et une fois en remontant."
            },
            {
              n: "4.", points: 1.5,
              texte: "Un bateau ne peut entrer dans le port que si la hauteur d'eau est d'au moins $3{,}1$ m. Pendant quelles périodes peut-il entrer entre minuit et midi ?",
              indice: "Résous graphiquement $H(t) \\geqslant 3{,}1$ : regarde où la courbe est au-dessus de la droite tracée.",
              corrige: "La courbe est au-dessus de la droite d'équation $y = 3{,}1$ pour $t \\in [0\\,;3]$ et pour $t \\in [11\\,;12]$ : le bateau peut entrer de minuit à $3$ h, puis de $11$ h à midi."
            },
            {
              n: "5.", points: 1,
              texte: "Calcule le taux de variation de $H$ entre $1$ et $7$. Interprète.",
              indice: "Utilise les hauteurs de marée haute et de marée basse.",
              corrige: "$\\dfrac{H(7) - H(1)}{7 - 1} = \\dfrac{0{,}4 - 4}{6} = \\dfrac{-3{,}6}{6} = -0{,}6$ : entre $1$ h et $7$ h, la mer descend en moyenne de $0{,}6$ m par heure."
            }
          ]
        },
        {
          titre: "Une boîte de $50$ cm³",
          duree: 25, points: 6, calculatrice: false,
          contexte: "Un fabricant veut une boîte en forme de cube, de volume $50$ cm³. On note $x$ la longueur de l'arête du cube, en cm, et $V(x) = x^3$ son volume.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule $V(3)$ et $V(4)$. Déduis-en un encadrement de l'arête cherchée par deux entiers consécutifs.",
              indice: "$V$ est croissante sur $[0\\,;+\\infty[$ : plus l'arête est longue, plus le volume est grand.",
              corrige: "$V(3) = 27$ et $V(4) = 64$. Comme $27 < 50 < 64$ et que le volume augmente avec l'arête, l'arête cherchée est entre $3$ et $4$ cm."
            },
            {
              n: "2.", points: 1.5,
              texte:
                "On exécute ce programme de balayage ; il affiche $\\texttt{3.7}$. Explique ce qu'il fait et ce que signifie ce résultat.\n\n" +
                "```python\nk = 30\nwhile (k/10)**3 < 50:\n    k = k + 1\nprint(k / 10)\n```",
              indice: "$\\texttt{k / 10}$ prend les valeurs $3$ ; $3{,}1$ ; $3{,}2$… La boucle continue tant que le volume est inférieur à $50$.",
              corrige: "$\\texttt{k / 10}$ prend les valeurs $3$ ; $3{,}1$ ; $3{,}2$… de $0{,}1$ en $0{,}1$, et la boucle s'arrête dès que le volume atteint au moins $50$ cm³. Le résultat $3{,}7$ est donc la première arête, à $0{,}1$ près, qui donne au moins $50$ cm³ : l'arête cherchée est entre $3{,}6$ et $3{,}7$ cm."
            },
            {
              n: "3.", points: 1.5,
              texte: "On donne $3{,}6^3 \\approx 46{,}7$ et $3{,}7^3 \\approx 50{,}7$. Quelle arête choisir, au millimètre près, pour avoir un volume d'au moins $50$ cm³ ?",
              indice: "Une arête de $3{,}6$ cm suffit-elle ?",
              corrige: "Avec $3{,}6$ cm, le volume vaut environ $46{,}7$ cm³ : c'est trop peu. Avec $3{,}7$ cm, il vaut environ $50{,}7$ cm³. Au millimètre près, il faut choisir une arête de $3{,}7$ cm."
            },
            {
              n: "4.", points: 1.5,
              texte: "Calcule le taux de variation de $V$ entre $1$ et $2$, puis entre $3$ et $4$. La fonction $V$ est-elle affine ?",
              indice: "$V(1) = 1$ et $V(2) = 8$.",
              corrige: "Entre $1$ et $2$ : $\\dfrac{8 - 1}{2 - 1} = 7$. Entre $3$ et $4$ : $\\dfrac{64 - 27}{4 - 3} = 37$.\n\nLes taux sont différents : $V$ n'est pas affine. Le volume augmente de plus en plus vite quand l'arête grandit."
            }
          ]
        }
      ]
    }
  };
})();
