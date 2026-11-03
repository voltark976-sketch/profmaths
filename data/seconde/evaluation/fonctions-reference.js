/*
  ENTRAÎNEMENT : Seconde — chapitre 13, Fonctions de référence : inverse, racine carrée, cube
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-fonctions-reference.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle ou devoir commun de Seconde.
  L'exercice 3 prolonge la démonstration du cours (racine de 2 irrationnelle) à la racine de 3.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["seconde-fonctions-reference"] = {
  revisions: {
    intro: "Les fonctions de référence en un coup d'œil : inverse, racine carrée, cube, résoudre avec le sens de variation, ranger $x$, $x^2$ et $x^3$, raisonner par l'absurde. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Fonction inverse",
        texte: "$x \\mapsto \\dfrac{1}{x}$ est définie sur $\\mathbb{R}^*$ ; sa courbe est une hyperbole. Elle est décroissante sur $]-\\infty\\,;0[$ **et** sur $]0\\,;+\\infty[$, séparément. $\\dfrac{1}{x}$ n'est jamais nul et a le signe de $x$."
      },
      {
        titre: "Démontrer un sens de variation",
        texte: "On prend $a < b$ dans l'intervalle et on étudie le signe de $f(b) - f(a)$. Pour l'inverse, avec $0 < a < b$ : $\\dfrac{1}{b} - \\dfrac{1}{a} = \\dfrac{a - b}{ab} < 0$."
      },
      {
        titre: "Racine carrée",
        texte: "$x \\mapsto \\sqrt{x}$ est définie sur $[0\\,;+\\infty[$, positive et croissante. $\\sqrt{x} = k$ a pour solution $k^2$ si $k \\geqslant 0$, et aucune si $k < 0$."
      },
      {
        titre: "Cube",
        texte: "$x \\mapsto x^3$ est définie sur $\\mathbb{R}$ et croissante ; sa courbe est symétrique par rapport à l'origine. $x^3 = k$ a toujours une seule solution : $x^3 = 8 \\iff x = 2$."
      },
      {
        titre: "Résoudre avec le sens de variation",
        texte: "Sur un intervalle où la fonction est **croissante**, une inégalité garde son sens ; où elle est **décroissante**, elle change de sens. Graphiquement, on compare la courbe à la droite $y = k$."
      },
      {
        titre: "$x$, $x^2$ et $x^3$",
        texte: "Pour $0 \\leqslant x \\leqslant 1$ : $x^3 \\leqslant x^2 \\leqslant x$. Pour $x \\geqslant 1$ : $x \\leqslant x^2 \\leqslant x^3$. On le démontre avec le signe de $x^2 - x = x(x - 1)$."
      },
      {
        titre: "Raisonner par l'absurde",
        texte: "On suppose le contraire de ce qu'on veut montrer, et on aboutit à une contradiction. Exemple du cours : si $\\sqrt{2} = \\dfrac{p}{q}$ irréductible, alors $p$ et $q$ seraient pairs tous les deux."
      }
    ],
    pieges: [
      "Dire que la fonction inverse est décroissante sur $\\mathbb{R}^*$ entier : $-1 < 1$ et pourtant $\\dfrac{1}{-1} < \\dfrac{1}{1}$.",
      "Écrire $\\dfrac{1}{0} = 0$ : $0$ n'a pas d'image par la fonction inverse.",
      "Oublier que $\\sqrt{x}$ n'existe que pour $x \\geqslant 0$ : $\\sqrt{x} < 2$ donne $[0\\,;4[$, pas $]-\\infty\\,;4[$.",
      "Croire que $x^3$ est toujours plus grand que $x$ : $0{,}5^3 = 0{,}125 < 0{,}5$.",
      "Démontrer « par l'absurde » en vérifiant seulement des exemples."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle ou au devoir commun (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Comparer, résoudre, encadrer",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes. Justifie chaque réponse avec le sens de variation d'une fonction de référence.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Compare sans calculatrice : a) $\\dfrac{1}{3{,}7}$ et $\\dfrac{1}{3{,}07}$ ; b) $(-2{,}1)^3$ et $(-2{,}01)^3$ ; c) $\\sqrt{0{,}49}$ et $\\sqrt{0{,}5}$.",
            indice: "a) inverse, décroissante sur $]0\\,;+\\infty[$ ; b) cube, croissante sur $\\mathbb{R}$ ; c) racine carrée, croissante sur $[0\\,;+\\infty[$.",
            corrige: "a) $0 < 3{,}07 < 3{,}7$ et la fonction inverse est décroissante sur $]0\\,;+\\infty[$ : $\\dfrac{1}{3{,}07} > \\dfrac{1}{3{,}7}$. b) $-2{,}1 < -2{,}01$ et la fonction cube est croissante : $(-2{,}1)^3 < (-2{,}01)^3$. c) $0{,}49 < 0{,}5$ et la racine carrée est croissante : $\\sqrt{0{,}49} < \\sqrt{0{,}5}$, avec $\\sqrt{0{,}49} = 0{,}7$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Résous : a) $x^3 = 64$ ; b) $\\sqrt{x} = 5$ ; c) $\\dfrac{1}{x} = -0{,}25$.",
            indice: "a) quel nombre a pour cube $64$ ? b) $\\sqrt{x} = k$ avec $k \\geqslant 0$ donne $x = k^2$. c) $\\dfrac{1}{x} = k$ donne $x = \\dfrac{1}{k}$ si $k \\neq 0$.",
            corrige: "a) $4^3 = 64$, et la fonction cube prend une seule fois chaque valeur : $x = 4$. b) $5 \\geqslant 0$, donc $x = 5^2 = 25$. c) $x = \\dfrac{1}{-0{,}25} = -4$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Résous : a) $\\sqrt{x} \\leqslant 4$ ; b) $x^3 > -8$ ; c) $\\dfrac{1}{x} < 2$ sur $]0\\,;+\\infty[$.",
            indice: "Écris le second membre comme une image : $4 = \\sqrt{16}$, $-8 = (-2)^3$, $2 = \\dfrac{1}{0{,}5}$. Puis utilise le sens de variation, sans oublier où la fonction est définie.",
            corrige: "a) $\\sqrt{x} \\leqslant \\sqrt{16}$ avec la racine carrée croissante sur $[0\\,;+\\infty[$ : $0 \\leqslant x \\leqslant 16$, soit $S = [0\\,;16]$. b) $x^3 > (-2)^3$ avec la fonction cube croissante : $x > -2$, soit $S = \\,]-2\\,;+\\infty[$. c) $\\dfrac{1}{x} < \\dfrac{1}{0{,}5}$ avec l'inverse décroissante sur $]0\\,;+\\infty[$ : le sens change, $x > 0{,}5$, soit $S = \\,]0{,}5\\,;+\\infty[$."
          },
          {
            n: "4.", points: 1.5,
            texte: "a) On sait que $2 \\leqslant x \\leqslant 5$. Encadre $\\dfrac{1}{x}$. b) On sait que $0{,}25 \\leqslant x \\leqslant 9$. Encadre $\\sqrt{x}$.",
            indice: "a) La fonction inverse est décroissante sur $]0\\,;+\\infty[$ : l'ordre s'inverse. b) La racine carrée est croissante.",
            corrige: "a) L'inverse est décroissante sur $]0\\,;+\\infty[$ : $\\dfrac{1}{5} \\leqslant \\dfrac{1}{x} \\leqslant \\dfrac{1}{2}$, soit $0{,}2 \\leqslant \\dfrac{1}{x} \\leqslant 0{,}5$. b) La racine carrée est croissante : $\\sqrt{0{,}25} \\leqslant \\sqrt{x} \\leqslant \\sqrt{9}$, soit $0{,}5 \\leqslant \\sqrt{x} \\leqslant 3$."
          },
          {
            n: "5.", points: 1,
            texte: "Range sans calculatrice les nombres $1{,}2$ ; $1{,}2^2$ et $1{,}2^3$.",
            indice: "$1{,}2 \\geqslant 1$ : utilise la propriété du cours sur $x$, $x^2$ et $x^3$.",
            corrige: "Comme $1{,}2 \\geqslant 1$ : $1{,}2 \\leqslant 1{,}2^2 \\leqslant 1{,}2^3$ (en effet $1{,}2^2 = 1{,}44$ et $1{,}2^3 = 1{,}728$)."
          }
        ]
      },
      {
        titre: "Remplir la citerne",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Une famille remplit une citerne de $1\\,200$ litres avec une pompe de débit $d$, en litres par minute. La durée de remplissage, en minutes, est $t(d) = \\dfrac{1\\,200}{d}$ pour $d > 0$. La courbe de $t$ est tracée ci-dessous pour un débit de $10$ à $100$ L/min.",
        figure: (o) => o.graph({
          xmin: 0, xmax: 105, ymin: 0, ymax: 130, xstep: 10, ystep: 10, xetiq: 20, yetiq: 20, h: 300, padL: 30,
          curves: [{ f: (d) => 1200 / d, a: 10, b: 100, closed: false }],
          xlabel: "d (L/min)", ylabel: "t (min)",
          aria: "Courbe de la durée t = 1 200 / d pour d de 10 à 100 : elle descend de 120 à 12 minutes"
        }),
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $t(20)$, $t(40)$ et $t(60)$. Que devient la durée quand le débit double ?",
            indice: "Remplace $d$ par chaque valeur dans $\\dfrac{1\\,200}{d}$.",
            corrige: "$t(20) = 60$, $t(40) = 30$ et $t(60) = 20$ minutes. Quand le débit double (de $20$ à $40$), la durée est divisée par $2$."
          },
          {
            n: "2.", points: 2,
            texte: "Démontre que la fonction $t$ est décroissante sur $]0\\,;+\\infty[$. Interprète ce résultat.",
            indice: "Prends $0 < a < b$ et étudie le signe de $t(b) - t(a) = \\dfrac{1\\,200}{b} - \\dfrac{1\\,200}{a}$, en réduisant au même dénominateur, comme pour la fonction inverse.",
            corrige: "Soit $0 < a < b$. $t(b) - t(a) = \\dfrac{1\\,200}{b} - \\dfrac{1\\,200}{a} = \\dfrac{1\\,200(a - b)}{ab}$. Or $a - b < 0$ et $ab > 0$, donc $t(b) - t(a) < 0$, soit $t(b) < t(a)$ : $t$ est décroissante sur $]0\\,;+\\infty[$. Plus le débit est grand, plus le remplissage est court."
          },
          {
            n: "3.", points: 1.5,
            texte: "Pour quels débits la citerne est-elle remplie en moins de $25$ minutes ?",
            indice: "Résous $\\dfrac{1\\,200}{d} < 25$ pour $d > 0$ : cherche d'abord le débit qui donne exactement $25$ minutes.",
            corrige: "$t(d) = 25 \\iff d = \\dfrac{1\\,200}{25} = 48$. Comme $t$ est décroissante, $t(d) < 25 = t(48) \\iff d > 48$. Il faut un débit de plus de $48$ L/min."
          },
          {
            n: "4.", points: 1.5,
            texte: "La pompe de la famille a un débit compris entre $30$ et $50$ L/min. Encadre la durée de remplissage.",
            indice: "$t$ est décroissante : le plus petit débit donne la plus longue durée.",
            corrige: "$t$ est décroissante, donc pour $30 \\leqslant d \\leqslant 50$ : $t(50) \\leqslant t(d) \\leqslant t(30)$, soit $24 \\leqslant t(d) \\leqslant 40$. Le remplissage dure entre $24$ et $40$ minutes."
          },
          {
            n: "5.", points: 1,
            texte: "Lis sur la courbe le débit qui remplit la citerne en $15$ minutes, puis vérifie par le calcul.",
            indice: "Place $15$ sur l'axe vertical, rejoins la courbe, puis lis l'abscisse.",
            corrige: "La courbe passe à la hauteur $15$ pour un débit d'environ $80$ L/min. Vérification : $t(80) = \\dfrac{1\\,200}{80} = 15$ minutes."
          }
        ]
      },
      {
        titre: "La racine de 3",
        duree: 20, points: 6, calculatrice: true,
        contexte: "On veut encadrer $\\sqrt{10}$, puis démontrer, comme dans le cours pour $\\sqrt{2}$, que $\\sqrt{3}$ est irrationnel.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte:
              "Voici la fonction du cours. Que renvoie $\\texttt{encadrement(10, 1)}$ ? Et $\\texttt{encadrement(10, 0.5)}$ ? Qu'en déduis-tu pour $\\sqrt{10}$ ?\n\n" +
              "```python\ndef encadrement(k, pas):\n    x = 1\n    while x * x < k:\n        x = x + pas\n    return x - pas, x\n```",
            indice: "Suis la boucle : $x$ avance de $\\texttt{pas}$ tant que $x^2 < 10$. Avec un pas de $1$ : $x$ vaut $1$, puis $2$, puis $3$, puis $4$…",
            corrige: "Avec un pas de $1$ : $1^2$, $2^2$ et $3^2$ sont inférieurs à $10$, mais $4^2 = 16$ ne l'est pas, donc la fonction renvoie $\\texttt{(3, 4)}$. Avec un pas de $0{,}5$ : $3^2 = 9 < 10$ mais $3{,}5^2 = 12{,}25 \\geqslant 10$, donc elle renvoie $\\texttt{(3.0, 3.5)}$. Ainsi $3 \\leqslant \\sqrt{10} < 3{,}5$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Soit $p$ un entier qui n'est pas un multiple de $3$ : il s'écrit $p = 3k + 1$ ou $p = 3k + 2$, avec $k$ entier. Démontre que $p^2$ n'est pas un multiple de $3$.",
            indice: "Développe $p^2$ dans chaque cas et écris le résultat sous la forme $3 \\times (\\ldots) + 1$.",
            corrige: "Si $p = 3k + 1$ : $p^2 = 9k^2 + 6k + 1 = 3(3k^2 + 2k) + 1$. Si $p = 3k + 2$ : $p^2 = 9k^2 + 12k + 4 = 3(3k^2 + 4k + 1) + 1$. Dans les deux cas, le reste de la division de $p^2$ par $3$ vaut $1$ : $p^2$ n'est pas un multiple de $3$. Autrement dit, si $p^2$ est un multiple de $3$, alors $p$ en est un."
          },
          {
            n: "3.", points: 2,
            texte: "Démontre par l'absurde que $\\sqrt{3}$ est irrationnel.",
            indice: "Suppose $\\sqrt{3} = \\dfrac{p}{q}$ avec une fraction irréductible. Montre que $p^2 = 3q^2$, puis que $p$ et $q$ sont tous deux des multiples de $3$, grâce à la question 2.",
            corrige: "Supposons $\\sqrt{3} = \\dfrac{p}{q}$, avec $p$ et $q$ entiers positifs et la fraction irréductible. Alors $3 = \\dfrac{p^2}{q^2}$, donc $p^2 = 3q^2$ : $p^2$ est un multiple de $3$, donc $p$ aussi (question 2). On écrit $p = 3m$ : $9m^2 = 3q^2$, donc $q^2 = 3m^2$, et $q$ est aussi un multiple de $3$. Alors $\\dfrac{p}{q}$ se simplifie par $3$ : c'est une contradiction. Donc $\\sqrt{3}$ est irrationnel."
          },
          {
            n: "4.", points: 1,
            texte: "Une élève affirme : « la calculatrice affiche $1{,}732$ pour $\\sqrt{3}$, donc $\\sqrt{3}$ est un nombre décimal. » Que lui réponds-tu ?",
            indice: "Calcule $1{,}732^2$. Que dit la question 3 ?",
            corrige: "$1{,}732$ n'est qu'une valeur approchée : $1{,}732^2 = 2{,}999\\,824 \\neq 3$. D'après la question 3, $\\sqrt{3}$ n'est même pas rationnel, donc il n'est pas décimal : son écriture décimale ne s'arrête jamais."
          }
        ]
      }
    ]
  }
};
