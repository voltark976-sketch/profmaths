/*
  ENTRAÎNEMENT : Terminale maths complémentaires — chapitre 8, Fonction logarithme népérien
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-logarithme.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths complémentaires.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-logarithme"] = {
  revisions: {
    intro: "Le logarithme népérien en un coup d'œil : sa définition, ses propriétés algébriques, les équations et inéquations, les seuils des suites géométriques et l'étude de $\\ln u$. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Définition",
        texte: "Pour $y > 0$, $\\ln y$ est l'unique solution de l'équation $e^x = y$. Ainsi $e^{\\ln y} = y$ pour $y > 0$, et $\\ln\\left(e^x\\right) = x$ pour tout réel $x$. En particulier $\\ln 1 = 0$ et $\\ln e = 1$."
      },
      {
        titre: "Propriétés algébriques",
        texte:
          "Pour $a > 0$, $b > 0$ et $n$ entier :\n" +
          "- $\\ln(ab) = \\ln a + \\ln b$ ;\n" +
          "- $\\ln\\left(\\dfrac{a}{b}\\right) = \\ln a - \\ln b$ ;\n" +
          "- $\\ln\\left(\\dfrac{1}{a}\\right) = -\\ln a$ ;\n" +
          "- $\\ln\\left(a^n\\right) = n\\ln a$ ;\n" +
          "- $\\ln\\sqrt{a} = \\dfrac{1}{2}\\ln a$.\n\n" +
          "Par exemple $\\ln 50 - \\ln 2 = \\ln 25 = 2\\ln 5$."
      },
      {
        titre: "Équations et inéquations",
        texte:
          "On cherche d'abord où ce qui est dans le $\\ln$ est strictement positif. Puis, comme $\\ln$ est strictement croissante :\n" +
          "- $\\ln a = \\ln b \\iff a = b$ ;\n" +
          "- $\\ln a < \\ln b \\iff a < b$ ;\n" +
          "- $\\ln x = c \\iff x = e^c$ ;\n" +
          "- pour $k > 0$, $e^x = k \\iff x = \\ln k$."
      },
      {
        titre: "Seuil d'une suite géométrique",
        texte: "$q^n > A \\iff n\\ln q > \\ln A$. Si $q > 1$, alors $\\ln q > 0$ et $n > \\dfrac{\\ln A}{\\ln q}$. Si $0 < q < 1$, alors $\\ln q < 0$ : en divisant par $\\ln q$, le sens de l'inégalité change."
      },
      {
        titre: "Étudier $\\ln$ et $\\ln u$",
        texte: "$(\\ln x)' = \\dfrac{1}{x}$ sur $]0\\,;+\\infty[$ : $\\ln$ est strictement croissante, avec $\\lim\\limits_{x \\to 0,\\ x > 0} \\ln x = -\\infty$ et $\\lim\\limits_{x \\to +\\infty} \\ln x = +\\infty$. Si $u > 0$, $(\\ln u)' = \\dfrac{u'}{u}$ : $\\ln u$ a les mêmes variations que $u$."
      }
    ],
    pieges: [
      "Écrire $\\ln(a + b) = \\ln a + \\ln b$ : c'est le produit qui devient une somme, $\\ln(ab) = \\ln a + \\ln b$.",
      "Écrire $\\ln\\left(\\dfrac{a}{b}\\right) = \\dfrac{\\ln a}{\\ln b}$ au lieu de $\\ln a - \\ln b$.",
      "Résoudre sans vérifier que ce qui est dans le logarithme est strictement positif.",
      "Oublier de changer le sens de l'inégalité en divisant par $\\ln q < 0$.",
      "Croire que $\\ln x$ a une limite finie en $+\\infty$ parce qu'il croît lentement."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Calculer et résoudre avec $\\ln$",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Écris $A = \\ln 12 + \\ln 6 - \\ln 9$ sous la forme $k\\ln 2$, puis calcule $B = \\ln\\left(e^4\\right) - 2\\ln\\sqrt{e}$ et $C = e^{2\\ln 3}$.",
            indice: "$\\ln a + \\ln b - \\ln c = \\ln\\left(\\dfrac{ab}{c}\\right)$. Puis $\\ln\\sqrt{e} = \\dfrac{1}{2}\\ln e$ et $2\\ln 3 = \\ln 9$.",
            corrige: "$A = \\ln\\left(\\dfrac{12 \\times 6}{9}\\right) = \\ln 8 = \\ln\\left(2^3\\right) = 3\\ln 2$.\n\n$B = 4 - 2 \\times \\dfrac{1}{2} = 3$.\n\n$C = e^{\\ln 9} = 9$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Résous l'équation $\\ln(x + 3) = \\ln(2x - 1)$, puis l'équation $e^{2x - 1} = 5$.",
            indice: "Pour la première, il faut $x + 3 > 0$ et $2x - 1 > 0$. Pour la seconde, $e^X = 5 \\iff X = \\ln 5$.",
            corrige: "Il faut $x + 3 > 0$ et $2x - 1 > 0$, soit $x > \\dfrac{1}{2}$. Alors $\\ln(x + 3) = \\ln(2x - 1) \\iff x + 3 = 2x - 1 \\iff x = 4$, et $4 > \\dfrac{1}{2}$ : $S = \\{4\\}$.\n\n$e^{2x - 1} = 5 \\iff 2x - 1 = \\ln 5 \\iff x = \\dfrac{1 + \\ln 5}{2}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Résous l'inéquation $\\ln(5 - 2x) < 0$.",
            indice: "Il faut d'abord $5 - 2x > 0$. Puis écris $0 = \\ln 1$.",
            corrige: "Il faut $5 - 2x > 0$, soit $x < \\dfrac{5}{2}$. Comme $\\ln$ est strictement croissante, $\\ln(5 - 2x) < \\ln 1 \\iff 5 - 2x < 1 \\iff x > 2$. Donc $S = \\left]2\\,;\\dfrac{5}{2}\\right[$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Résous l'équation $(\\ln x)^2 - \\ln x - 2 = 0$ sur $]0\\,;+\\infty[$, en posant $X = \\ln x$.",
            indice: "Résous d'abord $X^2 - X - 2 = 0$ avec le discriminant, puis $\\ln x = X$.",
            corrige: "$X^2 - X - 2 = 0$ : $\\Delta = 1 + 8 = 9$, d'où $X = \\dfrac{1 - 3}{2} = -1$ ou $X = \\dfrac{1 + 3}{2} = 2$.\n\nPuis $\\ln x = -1 \\iff x = e^{-1}$ et $\\ln x = 2 \\iff x = e^2$. Donc $S = \\left\\{e^{-1}\\,;e^2\\right\\}$."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « $\\dfrac{\\ln 8}{\\ln 2} = \\ln 4$ ». Justifie sans calculatrice.",
            indice: "Écris $\\ln 8$ en fonction de $\\ln 2$. Puis compare $4$ et $e^3$.",
            corrige: "**Faux.** $\\ln 8 = 3\\ln 2$, donc $\\dfrac{\\ln 8}{\\ln 2} = 3$. Or $e > 2$, donc $e^3 > 8 > 4$ et $\\ln 4 < \\ln\\left(e^3\\right) = 3$. Le quotient $\\dfrac{\\ln a}{\\ln b}$ n'est pas $\\ln\\left(\\dfrac{a}{b}\\right)$."
          }
        ]
      },
      {
        titre: "Deux chaînes de vidéos",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Une chaîne de vidéos de maths A compte $2\\,000$ abonnés, et ce nombre augmente de $12\\,\\%$ chaque mois. Une chaîne B en compte $5\\,000$, et ce nombre augmente de $5\\,\\%$ chaque mois. On note $a_n$ et $b_n$ les nombres d'abonnés de A et de B au bout de $n$ mois : $a_0 = 2\\,000$ et $b_0 = 5\\,000$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Exprime $a_n$ et $b_n$ en fonction de $n$.",
            indice: "Augmenter de $12\\,\\%$, c'est multiplier par $1{,}12$.",
            corrige: "$(a_n)$ est géométrique de raison $1{,}12$ et $(b_n)$ de raison $1{,}05$ : $a_n = 2\\,000 \\times 1{,}12^n$ et $b_n = 5\\,000 \\times 1{,}05^n$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Démontre que $a_n > b_n \\iff \\left(\\dfrac{16}{15}\\right)^n > 2{,}5$.",
            indice: "Divise les deux membres par $2\\,000 \\times 1{,}05^n$, qui est strictement positif, puis simplifie $\\dfrac{1{,}12}{1{,}05}$.",
            corrige: "Le nombre $2\\,000 \\times 1{,}05^n$ est strictement positif. En divisant par ce nombre : $a_n > b_n \\iff \\dfrac{1{,}12^n}{1{,}05^n} > \\dfrac{5\\,000}{2\\,000} \\iff \\left(\\dfrac{1{,}12}{1{,}05}\\right)^n > 2{,}5$.\n\nEt $\\dfrac{1{,}12}{1{,}05} = \\dfrac{112}{105} = \\dfrac{16}{15}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Résous cette inéquation avec la fonction $\\ln$. Au bout de combien de mois la chaîne A a-t-elle plus d'abonnés que la chaîne B ?",
            indice: "$\\ln$ est strictement croissante et $\\ln\\left(q^n\\right) = n\\ln q$. Quel est le signe de $\\ln\\left(\\dfrac{16}{15}\\right)$ ?",
            corrige: "$\\left(\\dfrac{16}{15}\\right)^n > 2{,}5 \\iff n\\ln\\left(\\dfrac{16}{15}\\right) > \\ln 2{,}5 \\iff n > \\dfrac{\\ln 2{,}5}{\\ln\\left(\\frac{16}{15}\\right)}$, car $\\dfrac{16}{15} > 1$, donc $\\ln\\left(\\dfrac{16}{15}\\right) > 0$.\n\nOr $\\dfrac{\\ln 2{,}5}{\\ln\\left(\\frac{16}{15}\\right)} \\approx 14{,}2$ : la chaîne A dépasse la chaîne B au bout de $15$ mois."
          },
          {
            n: "4.", points: 1,
            texte:
              "Qu'affiche ce programme ? À quoi sert-il ?\n\n" +
              "```python\na = 2000\nb = 5000\nn = 0\nwhile a <= b:\n    a = a * 1.12\n    b = b * 1.05\n    n = n + 1\nprint(n, round(a), round(b))\n```",
            indice: "La boucle s'arrête dès que $\\texttt{a} > \\texttt{b}$. Que représente alors $\\texttt{n}$ ?",
            corrige: "La boucle calcule les termes mois après mois tant que $a_n \\leqslant b_n$ : elle s'arrête au premier $n$ tel que $a_n > b_n$. Le programme affiche $\\texttt{15 10947 10395}$, ce qui confirme la question 3 : au bout de $15$ mois, A a $10\\,947$ abonnés et B en a $10\\,395$."
          },
          {
            n: "5.", points: 2,
            texte: "Un peu plus tard, la chaîne B arrête de publier. Elle compte alors $12\\,000$ abonnés et en perd $4\\,\\%$ chaque mois. Au bout de combien de mois en aura-t-elle moins de $6\\,000$ ? Ce résultat dépend-il du nombre d'abonnés au départ ?",
            indice: "Résous $12\\,000 \\times 0{,}96^n < 6\\,000$, soit $0{,}96^n < 0{,}5$. Attention : $\\ln 0{,}96 < 0$.",
            corrige: "$12\\,000 \\times 0{,}96^n < 6\\,000 \\iff 0{,}96^n < 0{,}5 \\iff n\\ln 0{,}96 < \\ln 0{,}5 \\iff n > \\dfrac{\\ln 0{,}5}{\\ln 0{,}96}$, car $\\ln 0{,}96 < 0$ : en divisant, le sens de l'inégalité change.\n\nOr $\\dfrac{\\ln 0{,}5}{\\ln 0{,}96} \\approx 16{,}98$ : au bout de $17$ mois, la chaîne aura moins de $6\\,000$ abonnés, c'est-à-dire moins de la moitié. Ce résultat ne dépend pas du nombre de départ : après la division, il reste $0{,}96^n < 0{,}5$, quel que soit ce nombre."
          }
        ]
      },
      {
        titre: "La croissance d'un manguier",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Un manguier greffé est planté dans un jardin de Mayotte. On modélise sa hauteur, en mètres, $t$ années après la plantation par $h(t) = 1 + 2\\ln(t + 1)$, pour $t \\geqslant 0$.",
        figure: (o) => o.graph({
          xmin: -1.5, xmax: 31, ymin: 0, ymax: 9, xstep: 5, ystep: 1, h: 240,
          xlabel: "t", ylabel: "h",
          curves: [{ f: (t) => 1 + 2 * Math.log(t + 1), a: 0, b: 30, label: "h", lx: 27, dy: -10 }],
          aria: "Courbe de la hauteur h du manguier pour t entre 0 et 30 : elle part de 1 et monte de moins en moins vite, jusqu'à environ 7,9 en t = 30"
        }),
        questions: [
          {
            n: "1.", points: 1,
            texte: "Quelle est la hauteur du manguier à la plantation ? Et au bout de $10$ ans, au centimètre près ?",
            indice: "Calcule $h(0)$ et $h(10)$, avec $\\ln 1 = 0$.",
            corrige: "$h(0) = 1 + 2\\ln 1 = 1$ : le manguier mesure $1$ m à la plantation. $h(10) = 1 + 2\\ln 11 \\approx 5{,}80$ : il mesure environ $5{,}80$ m au bout de $10$ ans."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $h'(t)$ et déduis-en le sens de variation de $h$. Calcule $h'(0)$ et $h'(19)$ : que constates-tu ?",
            indice: "$(\\ln u)' = \\dfrac{u'}{u}$ avec $u(t) = t + 1$.",
            corrige: "$h'(t) = 2 \\times \\dfrac{1}{t + 1} = \\dfrac{2}{t + 1} > 0$ pour $t \\geqslant 0$ : $h$ est strictement croissante.\n\n$h'(0) = 2$ et $h'(19) = 0{,}1$ : la vitesse de croissance passe de $2$ m par an à la plantation à $0{,}1$ m par an au bout de $19$ ans. Le manguier grandit toujours, mais de plus en plus lentement."
          },
          {
            n: "3.", points: 1,
            texte: "Détermine la limite de $h(t)$ quand $t$ tend vers $+\\infty$. Le modèle est-il réaliste sur une très longue durée ?",
            indice: "Quand $t \\to +\\infty$, $t + 1 \\to +\\infty$, et $\\lim\\limits_{X \\to +\\infty} \\ln X = +\\infty$.",
            corrige: "$t + 1 \\to +\\infty$ et $\\ln X \\to +\\infty$ quand $X \\to +\\infty$, donc $h(t) \\to +\\infty$. Le modèle n'est pas réaliste à très long terme : un arbre ne grandit pas sans limite, même lentement. Il ne vaut que sur une durée limitée."
          },
          {
            n: "4.", points: 1.5,
            texte: "Lis sur le graphique au bout de combien d'années le manguier atteint $7$ m, puis détermine-le par le calcul.",
            indice: "Résous $h(t) \\geqslant 7$, soit $\\ln(t + 1) \\geqslant 3$, avec $3 = \\ln\\left(e^3\\right)$.",
            corrige: "Graphiquement, environ $19$ ans. Par le calcul : $h(t) \\geqslant 7 \\iff 2\\ln(t + 1) \\geqslant 6 \\iff \\ln(t + 1) \\geqslant 3 \\iff t + 1 \\geqslant e^3 \\iff t \\geqslant e^3 - 1$.\n\nComme $e^3 - 1 \\approx 19{,}1$, le manguier atteint $7$ m au bout d'environ $19{,}1$ ans, au cours de sa $20^\\text{e}$ année."
          },
          {
            n: "5.", points: 1,
            texte: "Montre que, chaque fois que la hauteur augmente de $2$ m, le nombre $t + 1$ est multiplié par $e$. Combien de temps faut-il pour passer de $5$ m à $7$ m ?",
            indice: "Si la hauteur passe de $h(t)$ à $h(s) = h(t) + 2$, écris $1 = \\ln e$ et $\\ln a + \\ln b = \\ln(ab)$.",
            corrige: "$h(s) = h(t) + 2 \\iff 2\\ln(s + 1) = 2\\ln(t + 1) + 2 \\iff \\ln(s + 1) = \\ln(t + 1) + \\ln e \\iff \\ln(s + 1) = \\ln\\left(e(t + 1)\\right) \\iff s + 1 = e(t + 1)$.\n\nLa hauteur vaut $5$ m pour $t + 1 = e^2$ et $7$ m pour $t + 1 = e^3$ : il faut $e^3 - e^2 \\approx 12{,}7$ ans pour gagner ces $2$ m, contre $e^2 - e \\approx 4{,}7$ ans pour passer de $3$ m à $5$ m."
          }
        ]
      }
    ]
  }
};
