/*
  SUJET : Seconde — Devoir commun n° 1 (milieu d'année, chapitres 1 à 9 de la progression)
  Page #sujet-seconde-dc-1 ; PDF de l'énoncé et du corrigé fabriqués par outils/sujets-pdf.js.
  Mêmes exercices que les onglets « Entraînement évaluation » (voir data/premiere/evaluation/second-degre-2.js),
  avec en plus un en-tête et des consignes. Sujet original, données fictives.
*/
window.SUJETS = window.SUJETS || {};
window.SUJETS["seconde-dc-1"] = {
  entete: "Seconde · Devoir commun n° 1 · Durée : 2 heures",
  consignes: "La partie A (automatismes) se fait **sans calculatrice**, en $20$ minutes environ. Pour la partie B, la calculatrice est autorisée. Le sujet est noté sur $20$ points ; la clarté de la rédaction est prise en compte.",
  exercices: [
    {
      numero: "Partie A", titre: "Automatismes",
      duree: 20, points: 5, calculatrice: false,
      contexte: "Pour chaque question, écris seulement le résultat, sans justification.",
      questions: [
        { n: "1.", points: 0.5, texte: "Écris sous forme d'intervalle l'ensemble des réels $x$ tels que $-2 < x \\leqslant 5$.", corrige: "$]-2\\,;5]$." },
        { n: "2.", points: 0.5, texte: "Donne un nombre rationnel qui n'est pas décimal.", corrige: "Par exemple $\\dfrac{1}{3}$ : son écriture décimale $0{,}333…$ ne s'arrête jamais." },
        { n: "3.", points: 0.5, texte: "Décompose $252$ en produit de facteurs premiers.", corrige: "$252 = 2 \\times 126 = 2^2 \\times 63 = 2^2 \\times 3^2 \\times 7$." },
        { n: "4.", points: 0.5, texte: "Écris $\\dfrac{84}{126}$ sous forme irréductible.", corrige: "$\\dfrac{84}{126} = \\dfrac{2 \\times 42}{3 \\times 42} = \\dfrac{2}{3}$." },
        { n: "5.", points: 0.5, texte: "Développe et réduis $(3x - 2)^2$.", corrige: "$9x^2 - 12x + 4$." },
        { n: "6.", points: 0.5, texte: "Factorise $4x^2 - 25$.", corrige: "$(2x)^2 - 5^2 = (2x - 5)(2x + 5)$." },
        { n: "7.", points: 0.5, texte: "Résous l'inéquation $7 - 3x > 1$.", corrige: "$-3x > -6$, donc $x < 2$ (on divise par $-3$ : le sens change)." },
        { n: "8.", points: 0.5, texte: "Par quel nombre multiplie-t-on un prix qui baisse de $6\\,\\%$ ?", corrige: "$1 - 0{,}06 = 0{,}94$." },
        { n: "9.", points: 0.5, texte: "On donne $f(x) = x^2 - 3$. Calcule l'image de $-2$ par $f$.", corrige: "$f(-2) = (-2)^2 - 3 = 4 - 3 = 1$." },
        { n: "10.", points: 0.5, texte: "On donne $\\vec{u}\\begin{pmatrix} 3 \\\\ -1 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} -2 \\\\ 4 \\end{pmatrix}$. Donne les coordonnées de $\\vec{u} + 2\\vec{v}$.", corrige: "$\\begin{pmatrix} 3 - 4 \\\\ -1 + 8 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 7 \\end{pmatrix}$." }
      ]
    },
    {
      numero: "Partie B · exercice 1", titre: "Une fonction du second degré",
      duree: 25, points: 4, calculatrice: true,
      contexte: "La courbe ci-dessous représente la fonction $f$ définie sur $[0\\,;6]$ par $f(x) = -x^2 + 6x - 5$.",
      figure: (o) => o.graph({
        xmin: -0.5, xmax: 6.5, ymin: -5.5, ymax: 4.5, h: 300,
        curves: [{ f: (x) => -x * x + 6 * x - 5, a: 0, b: 6, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: 5.9, dx: -12, dy: 2 }],
        aria: "Courbe de f sur [0 ; 6] : f(0) = −5, f(1) = 0, f(2) = 3, f(3) = 4, f(4) = 3, f(5) = 0, f(6) = −5"
      }),
      questions: [
        { n: "1.", points: 0.5, texte: "Lis graphiquement l'image de $2$ par $f$.", indice: "Pars de $2$ sur l'axe des abscisses et lis l'ordonnée du point de la courbe.", corrige: "$f(2) = 3$." },
        { n: "2.", points: 0.5, texte: "Lis graphiquement les antécédents de $0$ par $f$.", indice: "Cherche les points de la courbe situés sur l'axe des abscisses.", corrige: "Les antécédents de $0$ sont $1$ et $5$." },
        { n: "3.", points: 0.5, texte: "Résous graphiquement l'inéquation $f(x) \\geqslant 3$.", indice: "Cherche les abscisses des points de la courbe situés sur ou au-dessus de la droite d'équation $y = 3$.", corrige: "La courbe est sur ou au-dessus de la droite d'équation $y = 3$ pour $x$ entre $2$ et $4$ : les solutions sont les réels de $[2\\,;4]$." },
        {
          n: "4.", points: 1,
          texte: "Dresse le tableau de variations de $f$ sur $[0\\,;6]$.",
          indice: "Repère où la courbe monte, où elle descend, et les valeurs aux bornes et au sommet.",
          corrige: "$f$ est croissante sur $[0\\,;3]$ et décroissante sur $[3\\,;6]$ :",
          tableauCorrige: { lignes: [["x", "0", "", "3", "", "6"], ["f(x)", "-5", "\\nearrow", "4", "\\searrow", "-5"]] }
        },
        {
          n: "5.", points: 1,
          texte: "Montre que, pour tout réel $x$, $f(x) = 4 - (x - 3)^2$. Déduis-en que $f$ admet un maximum sur $[0\\,;6]$, et donne-le.",
          indice: "Développe $(x - 3)^2$. Ensuite, un carré est toujours positif ou nul.",
          corrige: "$4 - (x - 3)^2 = 4 - (x^2 - 6x + 9) = -x^2 + 6x - 5 = f(x)$.\n\nComme $(x - 3)^2 \\geqslant 0$, on a $f(x) \\leqslant 4$ pour tout $x$, et $f(3) = 4$ : le maximum de $f$ est $4$, atteint en $x = 3$."
        },
        {
          n: "6.", points: 0.5,
          texte: "Résous par le calcul l'équation $f(x) = 3$. Compare avec la question 3.",
          indice: "Avec la question 5 : $f(x) = 3 \\iff (x - 3)^2 = 1$.",
          corrige: "$f(x) = 3 \\iff 4 - (x - 3)^2 = 3 \\iff (x - 3)^2 = 1 \\iff x - 3 = 1$ ou $x - 3 = -1$, donc $x = 4$ ou $x = 2$ : ce sont les bornes de l'intervalle trouvé à la question 3."
        }
      ]
    },
    {
      numero: "Partie B · exercice 2", titre: "Les visiteurs d'un club de plongée",
      duree: 20, points: 3, calculatrice: true,
      contexte: "Un club de plongée du lagon a reçu $12\\,000$ visiteurs en 2023. Leur nombre a augmenté de $15\\,\\%$ en 2024, puis baissé de $20\\,\\%$ en 2025 (données fictives).",
      questions: [
        { n: "1.", points: 0.75, texte: "Calcule le nombre de visiteurs en 2024, puis en 2025.", indice: "Augmenter de $15\\,\\%$, c'est multiplier par $1{,}15$ ; baisser de $20\\,\\%$, par $0{,}8$.", corrige: "En 2024 : $12\\,000 \\times 1{,}15 = 13\\,800$. En 2025 : $13\\,800 \\times 0{,}8 = 11\\,040$ visiteurs." },
        { n: "2.", points: 0.75, texte: "Quel est le taux d'évolution global entre 2023 et 2025 ?", indice: "Multiplie les coefficients multiplicateurs.", corrige: "$1{,}15 \\times 0{,}8 = 0{,}92 = 1 - 0{,}08$ : le nombre de visiteurs a baissé de $8\\,\\%$ (et non de $5\\,\\%$)." },
        { n: "3.", points: 0.75, texte: "Quel taux d'évolution faudrait-il en 2026 pour retrouver $12\\,000$ visiteurs ? Arrondis au dixième de pourcent.", indice: "Le coefficient cherché vaut $\\dfrac{12\\,000}{11\\,040}$.", corrige: "$\\dfrac{12\\,000}{11\\,040} \\approx 1{,}087$ : il faudrait une hausse d'environ $8{,}7\\,\\%$." },
        { n: "4.", points: 0.75, texte: "En 2025, $35\\,\\%$ des visiteurs venaient de l'extérieur de Mayotte. Combien étaient-ils ?", indice: "Calcule $35\\,\\%$ de $11\\,040$.", corrige: "$0{,}35 \\times 11\\,040 = 3\\,864$ visiteurs." }
      ]
    },
    {
      numero: "Partie B · exercice 3", titre: "Vecteurs et quadrilatère",
      duree: 25, points: 4, calculatrice: true,
      contexte: "Dans un repère orthonormé, on considère les points $A(-2\\,;1)$, $B(1\\,;4)$ et $C(3\\,;2)$.",
      figure: (o) => o.graph({ xmin: -3.5, xmax: 4.5, ymin: -2.5, ymax: 5.5, h: 300, aria: "Repère orthonormé vide, gradué de −3 à 4 en abscisse et de −2 à 5 en ordonnée, pour placer les points" }),
      questions: [
        { n: "1.", points: 0.5, texte: "Place les points $A$, $B$ et $C$ dans le repère ci-dessus.", indice: "L'abscisse se lit sur l'axe horizontal, l'ordonnée sur l'axe vertical.", corrige: "Voir la figure ci-dessous, complétée au fil des questions.", figureCorrige: (o) => o.graph({ xmin: -3.5, xmax: 4.5, ymin: -2.5, ymax: 5.5, h: 300, points: [{ x: -2, y: 1, label: "A", gauche: true }, { x: 1, y: 4, label: "B" }, { x: 3, y: 2, label: "C" }, { x: 0, y: -1, label: "D" }, { x: 0.5, y: 1.5, label: "K" }], chemins: [[[-2, 1], [1, 4], [3, 2], [0, -1], [-2, 1]]], aria: "Les points A(−2 ; 1), B(1 ; 4), C(3 ; 2), D(0 ; −1) et le centre K(0,5 ; 1,5) du rectangle ABCD" }) },
        { n: "2.", points: 1, texte: "Calcule les coordonnées du vecteur $\\overrightarrow{AB}$, puis celles du point $D$ tel que $ABCD$ soit un parallélogramme.", indice: "$ABCD$ est un parallélogramme si et seulement si $\\overrightarrow{AB} = \\overrightarrow{DC}$.", corrige: "$\\overrightarrow{AB}\\begin{pmatrix} 1 - (-2) \\\\ 4 - 1 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 3 \\end{pmatrix}$.\n\n$\\overrightarrow{DC} = \\overrightarrow{AB}$ donne $3 - x_D = 3$ et $2 - y_D = 3$, donc $D(0\\,;-1)$." },
        { n: "3.", points: 1, texte: "Calcule les coordonnées du milieu $K$ de $[AC]$, et vérifie que $K$ est aussi le milieu de $[BD]$.", indice: "Milieu : on fait la moyenne des abscisses, puis celle des ordonnées.", corrige: "$K\\left(\\dfrac{-2 + 3}{2}\\,;\\dfrac{1 + 2}{2}\\right) = (0{,}5\\,;1{,}5)$, et le milieu de $[BD]$ est $\\left(\\dfrac{1 + 0}{2}\\,;\\dfrac{4 - 1}{2}\\right) = (0{,}5\\,;1{,}5)$ : c'est bien $K$. Les diagonales ont le même milieu, comme dans tout parallélogramme." },
        { n: "4.", points: 1, texte: "Calcule les longueurs $AB$, $BC$ et $AC$. Démontre que le triangle $ABC$ est rectangle.", indice: "$AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$. Compare ensuite $AB^2 + BC^2$ et $AC^2$.", corrige: "$AB = \\sqrt{3^2 + 3^2} = \\sqrt{18}$, $BC = \\sqrt{2^2 + (-2)^2} = \\sqrt{8}$ et $AC = \\sqrt{5^2 + 1^2} = \\sqrt{26}$.\n\n$AB^2 + BC^2 = 18 + 8 = 26 = AC^2$ : d'après la réciproque du théorème de Pythagore, $ABC$ est rectangle en $B$." },
        { n: "5.", points: 0.5, texte: "Déduis-en la nature du quadrilatère $ABCD$. Est-ce un carré ?", indice: "Un parallélogramme qui a un angle droit est un rectangle.", corrige: "$ABCD$ est un parallélogramme avec un angle droit en $B$ : c'est un rectangle. Ce n'est pas un carré, car $AB = \\sqrt{18} \\neq BC = \\sqrt{8}$." }
      ]
    },
    {
      numero: "Partie B · exercice 4", titre: "Le temps d'écran",
      duree: 30, points: 4, calculatrice: true,
      contexte: "On a relevé le temps passé devant un écran, en minutes, pendant une journée de classe, par $20$ élèves (données fictives). Les valeurs sont rangées dans l'ordre croissant :\n\n$45$ ; $60$ ; $60$ ; $75$ ; $90$ ; $90$ ; $90$ ; $100$ ; $110$ ; $120$ ; $120$ ; $135$ ; $140$ ; $150$ ; $150$ ; $165$ ; $180$ ; $200$ ; $240$ ; $300$.",
      questions: [
        { n: "1.", points: 1, texte: "Calcule le temps moyen passé devant un écran.", indice: "Additionne les $20$ valeurs, puis divise par $20$.", corrige: "La somme des valeurs vaut $2\\,620$, donc la moyenne est $\\dfrac{2\\,620}{20} = 131$ minutes, soit $2$ h $11$ min." },
        { n: "2.", points: 1, texte: "Détermine la médiane, le premier quartile $Q_1$ et le troisième quartile $Q_3$, puis l'écart interquartile.", indice: "Avec $20$ valeurs : la médiane est la moyenne des $10$e et $11$e valeurs, $Q_1$ la $5$e valeur et $Q_3$ la $15$e.", corrige: "Médiane : $\\dfrac{120 + 120}{2} = 120$ min. $Q_1 = 90$ min ($5$e valeur) et $Q_3 = 150$ min ($15$e valeur). Écart interquartile : $150 - 90 = 60$ min." },
        { n: "3.", points: 1, texte: "Quel pourcentage de ces élèves passe au moins $3$ heures par jour devant un écran ? Interprète la valeur de $Q_3$.", indice: "$3$ heures font $180$ minutes : compte les valeurs supérieures ou égales à $180$.", corrige: "$4$ élèves sur $20$ ($180$, $200$, $240$ et $300$ min), soit $20\\,\\%$. Comme $Q_3 = 150$, au moins $75\\,\\%$ des élèves passent au plus $2$ h $30$ min devant un écran." },
        {
          n: "4.", points: 1,
          texte:
            "On considère la fonction Python suivante, où $\\texttt{L}$ est une liste de nombres :\n\n" +
            "```python\ndef etendue(L):\n    mini = L[0]\n    maxi = L[0]\n    for x in L:\n        if x < mini:\n            mini = x\n        if x > maxi:\n            maxi = x\n    return maxi - mini\n```\n\n" +
            "Que contiennent les variables $\\texttt{mini}$ et $\\texttt{maxi}$ à la fin de la boucle ? Que renvoie $\\texttt{etendue(L)}$ pour la liste des $20$ temps de l'énoncé ?",
          indice: "La boucle parcourt toutes les valeurs : $\\texttt{mini}$ ne garde une valeur que si elle est plus petite que toutes celles déjà vues.",
          corrige: "À la fin, $\\texttt{mini}$ contient la plus petite valeur de la liste et $\\texttt{maxi}$ la plus grande. La fonction renvoie l'étendue : $300 - 45 = 255$ minutes."
        }
      ]
    }
  ]
};
