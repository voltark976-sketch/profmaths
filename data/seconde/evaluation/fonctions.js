/*
  ENTRAÎNEMENT : Seconde — chapitre 2, Généralités sur les fonctions
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-fonctions.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle ou devoir commun de Seconde.
  Les variations et extremums sont au chapitre 9 : pas de tableau de variations ici.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["seconde-fonctions"] = {
  revisions: {
    intro: "Les fonctions en un coup d'œil : image, antécédent, ensemble de définition, courbe et résolutions graphiques ou par le calcul. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Image et antécédent",
        texte: "Une fonction $f$ associe à chaque $x$ de son ensemble de définition **une seule** image $f(x)$. Un nombre $k$ peut avoir zéro, un ou plusieurs antécédents : les solutions de $f(x) = k$."
      },
      {
        titre: "Ensemble de définition",
        texte: "Ce sont les $x$ qui ont une image. Un quotient n'existe que si son dénominateur n'est pas nul : $\\dfrac{2x - 1}{x + 2}$ est défini pour $x \\neq -2$. Dans un problème, on précise le **domaine d'étude** (une durée, une longueur sont positives)."
      },
      {
        titre: "Calculer une image",
        texte: "On remplace $x$ par le nombre, avec des parenthèses : pour $f(x) = x^2 - 3x$, $f(-2) = (-2)^2 - 3 \\times (-2) = 4 + 6 = 10$."
      },
      {
        titre: "Point sur la courbe",
        texte: "$M(a\\,;b)$ est sur la courbe de $f$ si et seulement si $a$ est dans l'ensemble de définition **et** $f(a) = b$ : on calcule l'image de l'abscisse et on la compare à l'ordonnée."
      },
      {
        titre: "Lire sur une courbe",
        texte:
          "- image de $a$ : on part de $a$ sur l'axe des abscisses, on rejoint la courbe, on lit l'ordonnée ;\n" +
          "- antécédents de $k$ : on trace la droite $y = k$ et on lit les abscisses de **tous** les points communs."
      },
      {
        titre: "Résoudre graphiquement",
        texte:
          "- $f(x) = k$ : abscisses des points de la courbe sur la droite $y = k$ ;\n" +
          "- $f(x) > k$ : abscisses des points strictement au-dessus ;\n" +
          "- $f(x) = g(x)$ ou $f(x) < g(x)$ : on compare les deux courbes."
      },
      {
        titre: "Résoudre par le calcul",
        texte: "Pour $f(x) = g(x)$ : on regroupe les $x$ d'un côté, ou on passe tout d'un côté et on factorise. Pour une inéquation, on change le sens quand on multiplie ou divise par un nombre **négatif** : $-3x \\leqslant 6 \\iff x \\geqslant -2$."
      }
    ],
    pieges: [
      "Confondre image et antécédent : l'image de $0$ est $f(0)$, les antécédents de $0$ sont les solutions de $f(x) = 0$.",
      "Donner une ordonnée comme solution d'une équation : les solutions sont des valeurs de $x$.",
      "Calculer l'image de l'ordonnée au lieu de celle de l'abscisse pour tester un point.",
      "Oublier de changer le sens de l'inégalité en divisant par un nombre négatif.",
      "Écrire $(-3)^2 = -9$ : un carré n'est jamais négatif, $(-3)^2 = 9$.",
      "Oublier le domaine d'étude dans un problème : une durée ne peut pas être négative."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle ou au devoir commun (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Lire une courbe",
        duree: 25, points: 7, calculatrice: true,
        contexte: "La courbe $\\mathcal{C}_f$ ci-dessous représente une fonction $f$ définie sur $[-1{,}5\\,;3{,}5]$.",
        figure: (o) => o.graph({
          xmin: -1.9, xmax: 3.9, ymin: -3.2, ymax: 3.2, xstep: 0.5, xetiq: 1, ystep: 0.5, yetiq: 1, h: 320,
          curves: [{ f: (x) => (x ** 3 - 3 * x * x - x + 3) / 2, a: -1.5, b: 3.5, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: 3.3, dx: -10, dy: -2 }],
          aria: "Courbe d'une fonction f sur l'intervalle de -1,5 à 3,5, qui coupe trois fois l'axe des abscisses"
        }),
        questions: [
          {
            n: "1.", points: 1,
            texte: "Lis $f(0)$ et $f(2)$.",
            indice: "Pars de l'abscisse sur l'axe horizontal, rejoins la courbe, lis l'ordonnée. Le quadrillage est de $0{,}5$ en $0{,}5$.",
            corrige: "$f(0) = 1{,}5$ et $f(2) = -1{,}5$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Lis les antécédents de $0$ par $f$.",
            indice: "Ce sont les abscisses des points où la courbe coupe l'axe des abscisses : il y en a plusieurs.",
            corrige: "La courbe coupe l'axe des abscisses en $x = -1$, $x = 1$ et $x = 3$ : les antécédents de $0$ sont $-1$, $1$ et $3$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Résous graphiquement l'inéquation $f(x) > 0$.",
            indice: "Cherche les abscisses des points de la courbe strictement au-dessus de l'axe des abscisses, sans oublier les bornes de l'ensemble de définition.",
            corrige: "La courbe est strictement au-dessus de l'axe des abscisses entre $-1$ et $1$, puis entre $3$ et $3{,}5$ : $S = \\,]-1\\,;1[ \\cup \\,]3\\,;3{,}5]$. Les racines sont exclues (inégalité stricte), mais $3{,}5$ est inclus car $f(3{,}5) > 0$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Combien l'équation $f(x) = 2$ a-t-elle de solutions sur $[-1{,}5\\,;3{,}5]$ ? Donne-en une valeur approchée.",
            indice: "Trace la droite $y = 2$ et compte ses points communs avec la courbe.",
            corrige: "Entre $-1$ et $1$, la courbe ne monte qu'à environ $1{,}5$ : elle n'atteint pas $2$. La droite $y = 2$ ne coupe la courbe qu'une fois, vers $x \\approx 3{,}4$ : l'équation a **une seule** solution, environ $3{,}4$."
          },
          {
            n: "5.", points: 1.5,
            texte: "On admet que $f(x) = \\dfrac{x^3 - 3x^2 - x + 3}{2}$. Les points $A(2\\,;-1{,}5)$ et $B(0{,}5\\,;1)$ sont-ils sur $\\mathcal{C}_f$ ?",
            indice: "Calcule l'image de l'abscisse de chaque point et compare-la à son ordonnée.",
            corrige: "$f(2) = \\dfrac{8 - 12 - 2 + 3}{2} = -1{,}5$ : $A$ est sur la courbe. $f(0{,}5) = \\dfrac{0{,}125 - 0{,}75 - 0{,}5 + 3}{2} = 0{,}9375 \\neq 1$ : $B$ n'est pas sur la courbe (il est juste au-dessus)."
          }
        ]
      },
      {
        titre: "Deux loueurs de scooters",
        duree: 25, points: 7, calculatrice: true,
        contexte: "À Mamoudzou, le loueur A fait payer $f(x) = 12x + 20$ euros pour $x$ jours de location, et le loueur B $g(x) = 18x$ euros, avec $x$ entier entre $1$ et $30$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $f(3)$ et $g(3)$. Quel loueur est le moins cher pour $3$ jours ?",
            indice: "Remplace $x$ par $3$ dans chaque formule.",
            corrige: "$f(3) = 36 + 20 = 56$ € et $g(3) = 54$ € : pour $3$ jours, le loueur B est le moins cher."
          },
          {
            n: "2.", points: 1.5,
            texte: "Avec le loueur A, une location a coûté $92$ €. Combien de jours a-t-elle duré ?",
            indice: "Cherche l'antécédent de $92$ par $f$ : résous $12x + 20 = 92$.",
            corrige: "$12x + 20 = 92 \\iff 12x = 72 \\iff x = 6$ : la location a duré $6$ jours."
          },
          {
            n: "3.", points: 1.5,
            texte: "Résous l'équation $f(x) = g(x)$ et interprète le résultat.",
            indice: "Regroupe les $x$ d'un côté : $12x + 20 = 18x$.",
            corrige: "$12x + 20 = 18x \\iff 20 = 6x \\iff x = \\dfrac{10}{3} \\approx 3{,}33$. Ce n'est pas un nombre entier de jours : les deux tarifs ne sont jamais exactement égaux, ils se croisent entre $3$ et $4$ jours."
          },
          {
            n: "4.", points: 2,
            texte: "Résous l'inéquation $f(x) < g(x)$. À partir de combien de jours le loueur A est-il le moins cher ?",
            indice: "$12x + 20 < 18x \\iff 20 < 6x$ : divise par $6$, qui est positif.",
            corrige: "$12x + 20 < 18x \\iff 20 < 6x \\iff x > \\dfrac{10}{3}$. Comme $x$ est entier et $\\dfrac{10}{3} \\approx 3{,}33$, le loueur A est le moins cher à partir de $4$ jours de location."
          },
          {
            n: "5.", points: 1,
            texte: "Pourquoi le domaine d'étude n'est-il pas $\\mathbb{R}$ tout entier ?",
            indice: "Que représente $x$ ?",
            corrige: "$x$ est un nombre de jours : c'est un entier, ici entre $1$ et $30$. Calculer $f(-2)$ ou $f(2{,}7)$ n'aurait pas de sens dans ce problème."
          }
        ]
      },
      {
        titre: "Une fonction quotient",
        duree: 20, points: 6, calculatrice: false,
        contexte: "On considère la fonction $h$ définie par $h(x) = \\dfrac{3x - 2}{x - 4}$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine l'ensemble de définition de $h$.",
            indice: "Le dénominateur ne doit pas être nul.",
            corrige: "$x - 4 = 0 \\iff x = 4$ : $4$ est une valeur interdite. L'ensemble de définition est $\\mathbb{R} \\setminus \\{4\\}$, c'est-à-dire $]-\\infty\\,;4[ \\cup \\,]4\\,;+\\infty[$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $h(0)$ et $h(6)$.",
            indice: "Remplace $x$ par $0$, puis par $6$.",
            corrige: "$h(0) = \\dfrac{-2}{-4} = \\dfrac{1}{2}$ et $h(6) = \\dfrac{18 - 2}{6 - 4} = \\dfrac{16}{2} = 8$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Détermine le ou les antécédents de $2$ par $h$.",
            indice: "Pour $x \\neq 4$, $h(x) = 2 \\iff 3x - 2 = 2(x - 4)$.",
            corrige: "Pour $x \\neq 4$ : $h(x) = 2 \\iff 3x - 2 = 2(x - 4) \\iff 3x - 2 = 2x - 8 \\iff x = -6$. Et $-6 \\neq 4$ : l'antécédent de $2$ est $-6$. Vérification : $h(-6) = \\dfrac{-20}{-10} = 2$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Le point $C(2\\,;-2)$ appartient-il à la courbe de $h$ ?",
            indice: "Calcule $h(2)$.",
            corrige: "$2$ est dans l'ensemble de définition et $h(2) = \\dfrac{6 - 2}{2 - 4} = \\dfrac{4}{-2} = -2$ : **oui**, $C$ est sur la courbe."
          }
        ]
      }
    ]
  }
};
