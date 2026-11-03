/*
  SUJET : Seconde — Devoir commun n° 2 (fin d'année, chapitres 10 à 16 de la progression, avec les automatismes de l'année)
  Page #sujet-seconde-dc-2 ; PDF de l'énoncé et du corrigé fabriqués par outils/sujets-pdf.js.
  Même format que devoir-commun-1.js. Sujet original, données fictives. Programme 2026 : pas de formule des
  probabilités totales (tableau de 1 000 gousses), pas de système d'équations (intersection par les équations réduites),
  pas d'intervalle de fluctuation.
*/
window.SUJETS = window.SUJETS || {};
window.SUJETS["seconde-dc-2"] = {
  entete: "Seconde · Devoir commun n° 2 · Durée : 2 heures",
  consignes: "La partie A (automatismes) se fait **sans calculatrice**, en $20$ minutes environ. Pour la partie B, la calculatrice est autorisée. Le sujet est noté sur $20$ points ; la clarté de la rédaction est prise en compte.",
  exercices: [
    {
      numero: "Partie A", titre: "Automatismes",
      duree: 20, points: 5, calculatrice: false,
      contexte: "Pour chaque question, écris seulement le résultat, sans justification. Donne les fractions sous forme irréductible.",
      questions: [
        { n: "1.", points: 0.5, texte: "Calcule $\\dfrac{3}{4} - \\dfrac{5}{6}$ et donne le résultat sous forme de fraction irréductible.", corrige: "$\\dfrac{9}{12} - \\dfrac{10}{12} = -\\dfrac{1}{12}$." },
        { n: "2.", points: 0.5, texte: "Une commune passe de $2\\,500$ à $2\\,000$ habitants. Quel est le taux d'évolution ?", corrige: "$\\dfrac{2\\,000 - 2\\,500}{2\\,500} = \\dfrac{-500}{2\\,500} = -0{,}2$ : une baisse de $20\\,\\%$." },
        { n: "3.", points: 0.5, texte: "Résous l'équation $x^2 = 49$.", corrige: "$x = -7$ ou $x = 7$." },
        { n: "4.", points: 0.5, texte: "Développe et réduis $(2x + 3)(x - 4)$.", corrige: "$2x^2 - 8x + 3x - 12 = 2x^2 - 5x - 12$." },
        { n: "5.", points: 0.5, texte: "Donne l'équation réduite de la droite de coefficient directeur $3$ qui passe par $A(0\\,;-2)$.", corrige: "$y = 3x - 2$." },
        { n: "6.", points: 0.5, texte: "Pour quel réel $k$ les vecteurs $\\vec{u}\\begin{pmatrix} 6 \\\\ -4 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} k \\\\ 6 \\end{pmatrix}$ sont-ils colinéaires ?", corrige: "$\\det(\\vec{u}, \\vec{v}) = 6 \\times 6 - (-4) \\times k = 36 + 4k$, nul pour $k = -9$." },
        { n: "7.", points: 0.5, texte: "Résous sur $]0\\,;+\\infty[$ l'inéquation $\\dfrac{1}{x} < \\dfrac{1}{2}$.", corrige: "La fonction inverse est décroissante sur $]0\\,;+\\infty[$ : $\\dfrac{1}{x} < \\dfrac{1}{2} \\iff x > 2$. Solutions : $]2\\,;+\\infty[$." },
        { n: "8.", points: 0.5, texte: "Donne le signe de $-2x + 6$ selon les valeurs du réel $x$.", corrige: "$-2x + 6 > 0 \\iff x < 3$ : positif pour $x < 3$, nul en $3$, négatif pour $x > 3$." },
        { n: "9.", points: 0.5, texte: "Dans un lycée, $40\\,\\%$ des élèves sont internes et, parmi eux, $30\\,\\%$ sont en Seconde. Quelle proportion des élèves du lycée sont des internes de Seconde ?", corrige: "$0{,}4 \\times 0{,}3 = 0{,}12$, soit $12\\,\\%$." },
        { n: "10.", points: 0.5, texte: "La moyenne de $5$ notes vaut $12$. Quelle est la somme de ces $5$ notes ?", corrige: "$5 \\times 12 = 60$." }
      ]
    },
    {
      numero: "Partie B · exercice 1", titre: "Une piste cyclable dans le quartier",
      duree: 25, points: 4, calculatrice: true,
      contexte: "Sur le plan d'un quartier, dans un repère orthonormé dont l'unité est $100$ m, on place l'arrêt de bus $A(-2\\,;1)$, le collège $B(6\\,;5)$, le marché $C(0\\,;-3)$ et la poste $D(1\\,;0)$. Une piste cyclable rectiligne relie l'arrêt de bus au collège (données fictives).",
      figure: (o) => o.graph({
        xmin: -3.5, xmax: 7.5, ymin: -4.5, ymax: 6.5, h: 320,
        points: [{ x: -2, y: 1, label: "A", gauche: true }, { x: 6, y: 5, label: "B" }, { x: 0, y: -3, label: "C" }, { x: 1, y: 0, label: "D" }],
        chemins: [[[-2, 1], [6, 5]]],
        aria: "Plan du quartier : l'arrêt de bus A(−2 ; 1), le collège B(6 ; 5) reliés par la piste cyclable, le marché C(0 ; −3) et la poste D(1 ; 0)"
      }),
      questions: [
        { n: "1.", points: 0.5, texte: "Calcule les coordonnées du vecteur $\\overrightarrow{AB}$.", indice: "Coordonnées d'un vecteur : celles de l'extrémité moins celles de l'origine.", corrige: "$\\overrightarrow{AB}\\begin{pmatrix} 6 - (-2) \\\\ 5 - 1 \\end{pmatrix} = \\begin{pmatrix} 8 \\\\ 4 \\end{pmatrix}$." },
        { n: "2.", points: 1, texte: "Détermine l'équation réduite de la droite $(AB)$.", indice: "Le coefficient directeur vaut $\\dfrac{y_B - y_A}{x_B - x_A}$ ; on trouve ensuite l'ordonnée à l'origine avec le point $A$.", corrige: "Le coefficient directeur est $m = \\dfrac{4}{8} = 0{,}5$, donc $(AB) : y = 0{,}5x + p$. Le point $A$ est sur la droite : $1 = 0{,}5 \\times (-2) + p$, donc $p = 2$.\n\nL'équation réduite de $(AB)$ est $y = 0{,}5x + 2$. Vérification avec $B$ : $0{,}5 \\times 6 + 2 = 5$." },
        { n: "3.", points: 0.5, texte: "Le stade est au point $S(2\\,;3)$. Montre qu'il est sur la piste cyclable.", indice: "Remplace $x$ par $2$ dans l'équation de $(AB)$, ou calcule le déterminant de $\\overrightarrow{AS}$ et $\\overrightarrow{AB}$.", corrige: "$0{,}5 \\times 2 + 2 = 3$ : les coordonnées de $S$ vérifient l'équation de $(AB)$, donc $S$ est sur la droite $(AB)$. De plus, $S$ est entre $A$ et $B$ (son abscisse $2$ est entre $-2$ et $6$) : il est bien sur la piste.\n\nAutre méthode : $\\overrightarrow{AS}\\begin{pmatrix} 4 \\\\ 2 \\end{pmatrix}$ et $\\det\\left(\\overrightarrow{AS}, \\overrightarrow{AB}\\right) = 4 \\times 4 - 2 \\times 8 = 0$ : les points $A$, $S$ et $B$ sont alignés." },
        { n: "4.", points: 1, texte: "Une seconde piste, parallèle à la première, doit passer par le marché $C$. Donne son équation réduite.", indice: "Deux droites parallèles ont le même coefficient directeur.", corrige: "La seconde piste a le même coefficient directeur $0{,}5$ et passe par $C(0\\,;-3)$, dont l'abscisse est nulle : son ordonnée à l'origine est $-3$. Son équation réduite est $y = 0{,}5x - 3$." },
        { n: "5.", points: 1, texte: "Détermine l'équation réduite de la route $(CD)$, puis montre qu'elle croise la piste $(AB)$ au stade $S$.", indice: "Pour l'intersection, cherche l'abscisse $x$ pour laquelle les deux équations réduites donnent la même ordonnée.", corrige: "Coefficient directeur de $(CD)$ : $\\dfrac{0 - (-3)}{1 - 0} = 3$, et $C(0\\,;-3)$ donne l'ordonnée à l'origine : $(CD) : y = 3x - 3$.\n\nLes deux droites se coupent quand $3x - 3 = 0{,}5x + 2$, soit $2{,}5x = 5$ et $x = 2$. Alors $y = 3 \\times 2 - 3 = 3$ : le point d'intersection est $(2\\,;3)$, c'est le stade $S$." }
      ]
    },
    {
      numero: "Partie B · exercice 2", titre: "Une sortie pour voir les baleines",
      duree: 25, points: 4, calculatrice: true,
      contexte: "Une association organise une sortie en mer pour observer les baleines. La location du bateau coûte $600$ € et chaque participant paie en plus $15$ € pour le repas. Avec $x$ participants ($x \\geqslant 1$), le prix à payer par personne, en euros, est $p(x) = 15 + \\dfrac{600}{x}$ (données fictives).",
      questions: [
        { n: "1.", points: 0.5, texte: "Calcule le prix par personne avec $20$ participants, puis avec $40$ participants.", corrige: "$p(20) = 15 + \\dfrac{600}{20} = 15 + 30 = 45$ € et $p(40) = 15 + \\dfrac{600}{40} = 15 + 15 = 30$ €." },
        { n: "2.", points: 1, texte: "En utilisant le sens de variation de la fonction inverse, montre que $p$ est décroissante sur $[1\\,;+\\infty[$.", indice: "Pars de $1 \\leqslant a < b$ : que dire de $\\dfrac{1}{a}$ et $\\dfrac{1}{b}$ ? Multiplie par $600$, puis ajoute $15$.", corrige: "Soit $a$ et $b$ deux réels avec $1 \\leqslant a < b$. La fonction inverse est décroissante sur $]0\\,;+\\infty[$, donc $\\dfrac{1}{a} > \\dfrac{1}{b}$.\n\nEn multipliant par $600$, qui est positif, l'ordre ne change pas : $\\dfrac{600}{a} > \\dfrac{600}{b}$. En ajoutant $15$ : $p(a) > p(b)$.\n\nAinsi $a < b$ entraîne $p(a) > p(b)$ : $p$ est décroissante sur $[1\\,;+\\infty[$. Plus il y a de participants, moins chacun paie." },
        { n: "3.", points: 1, texte: "Montre que, pour tout $x \\geqslant 1$, $p(x) - 35 = \\dfrac{600 - 20x}{x}$.", indice: "Mets $15 - 35 + \\dfrac{600}{x}$ au même dénominateur $x$.", corrige: "$p(x) - 35 = \\dfrac{600}{x} - 20 = \\dfrac{600}{x} - \\dfrac{20x}{x}$\n\nsoit $p(x) - 35 = \\dfrac{600 - 20x}{x}$." },
        {
          n: "4.", points: 1.5, texte: "Étudie le signe de $\\dfrac{600 - 20x}{x}$ sur $[1\\,;+\\infty[$ à l'aide d'un tableau de signes. Combien faut-il de participants, au minimum, pour que le prix par personne ne dépasse pas $35$ € ?",
          indice: "$600 - 20x$ s'annule en $x = 30$ ; sur $[1\\,;+\\infty[$, le dénominateur $x$ est positif.",
          corrige: "$600 - 20x > 0 \\iff 20x < 600 \\iff x < 30$, et $x > 0$ sur $[1\\,;+\\infty[$ :",
          tableauCorrige: { lignes: [["x", "1", "", "30", "", "+\\infty"], ["600 - 20x", "", "+", "0", "-", ""], ["x", "", "+", "", "+", ""], ["p(x) - 35", "", "+", "0", "-", ""]] },
          corrigeFin: "$p(x) \\leqslant 35 \\iff p(x) - 35 \\leqslant 0 \\iff x \\geqslant 30$. Il faut au moins $30$ participants pour que le prix par personne ne dépasse pas $35$ €. Vérification : $p(30) = 15 + 20 = 35$."
        }
      ]
    },
    {
      numero: "Partie B · exercice 3", titre: "Les gousses de vanille de la coopérative",
      duree: 25, points: 4, calculatrice: true,
      contexte: "Une coopérative achète ses gousses de vanille à des producteurs du nord et du sud de l'île : $60\\,\\%$ des gousses viennent du nord. Parmi les gousses du nord, $90\\,\\%$ sont de première qualité ; parmi celles du sud, $75\\,\\%$ (données fictives). On choisit une gousse au hasard. On note $N$ l'événement « la gousse vient du nord » et $Q$ l'événement « la gousse est de première qualité ».",
      questions: [
        {
          n: "1.", points: 1, texte: "Représente la situation par un arbre pondéré.",
          indice: "Premier niveau : $N$ et $\\overline{N}$ ; second niveau : $Q$ et $\\overline{Q}$. Les branches issues d'un même nœud ont pour somme $1$.",
          corrige: "$P(N) = 0{,}6$ et $P\\left(\\overline{N}\\right) = 0{,}4$ ; $P_N(Q) = 0{,}9$, $P_N\\left(\\overline{Q}\\right) = 0{,}1$ ; $P_{\\overline{N}}(Q) = 0{,}75$ et $P_{\\overline{N}}\\left(\\overline{Q}\\right) = 0{,}25$.",
          figureCorrige: (o) => o.arbreProba(["N", "~N", "Q", "~Q"], ["0,6", "0,4", "0,9", "0,1", "0,75", "0,25"], "Arbre pondéré : N 0,6 et non N 0,4 ; après N : Q 0,9 et non Q 0,1 ; après non N : Q 0,75 et non Q 0,25")
        },
        { n: "2.", points: 0.5, texte: "Calcule la probabilité que la gousse vienne du nord et soit de première qualité.", indice: "On multiplie les probabilités le long du chemin $N$, puis $Q$.", corrige: "$P(N \\cap Q) = 0{,}6 \\times 0{,}9 = 0{,}54$." },
        {
          n: "3.", points: 1, texte: "Complète un tableau d'effectifs pour un lot de $1\\,000$ gousses (provenance et qualité).",
          indice: "Sur $1\\,000$ gousses, $600$ viennent du nord ; $90\\,\\%$ de ces $600$ sont de première qualité.",
          corrige: "Nord : $600$ gousses, dont $0{,}9 \\times 600 = 540$ de première qualité. Sud : $400$ gousses, dont $0{,}75 \\times 400 = 300$ de première qualité.",
          tableauCorrige: { lignes: [["", "Q", "\\overline{Q}", "\\text{Total}"], ["N", "540", "60", "600"], ["\\overline{N}", "300", "100", "400"], ["\\text{Total}", "840", "160", "1\\,000"]] }
        },
        { n: "4.", points: 0.5, texte: "Déduis-en la probabilité que la gousse soit de première qualité.", corrige: "Sur $1\\,000$ gousses, $840$ sont de première qualité : $P(Q) = \\dfrac{840}{1\\,000} = 0{,}84$." },
        { n: "5.", points: 1, texte: "La gousse choisie est de première qualité. Quelle est la probabilité qu'elle vienne du nord ? Donne le résultat sous forme de fraction irréductible.", indice: "On ne regarde que les $840$ gousses de première qualité.", corrige: "Parmi les $840$ gousses de première qualité, $540$ viennent du nord :\n\n$P_Q(N) = \\dfrac{540}{840} = \\dfrac{9}{14}$\n\nC'est environ $0{,}64$ : à ne pas confondre avec $P_N(Q) = 0{,}9$." }
      ]
    },
    {
      numero: "Partie B · exercice 4", titre: "Le cross du lycée",
      duree: 25, points: 3, calculatrice: true,
      contexte: "Au cross du lycée, on a relevé les temps de course, en minutes, de $50$ élèves, regroupés en classes (données fictives).",
      tableau: { lignes: [["\\text{Temps (min)}", "\\text{Effectif}"], ["[10\\,;12[", "6"], ["[12\\,;14[", "14"], ["[14\\,;16[", "18"], ["[16\\,;18[", "8"], ["[18\\,;20[", "4"]] },
      questions: [
        { n: "1.", points: 1, texte: "Estime le temps moyen des $50$ élèves, en utilisant le centre de chaque classe.", indice: "Le centre de la classe $[10\\,;12[$ est $11$. Multiplie chaque centre par l'effectif, additionne, puis divise par $50$.", corrige: "Les centres des classes sont $11$, $13$, $15$, $17$ et $19$ :\n\n$11 \\times 6 + 13 \\times 14 + 15 \\times 18$ ${} + 17 \\times 8 + 19 \\times 4 = 730$\n\nLe temps moyen est estimé à $\\dfrac{730}{50} = 14{,}6$ minutes, soit $14$ min $36$ s." },
        { n: "2.", points: 1, texte: "Calcule les effectifs cumulés croissants, puis donne la classe qui contient la médiane.", indice: "La médiane partage l'effectif total en deux : cherche la classe où l'effectif cumulé dépasse $25$.", corrige: "Effectifs cumulés croissants : $6$ ; $20$ ; $38$ ; $46$ ; $50$. Les $20$ premiers élèves ont couru en moins de $14$ minutes et les $38$ premiers en moins de $16$ minutes.\n\nLa médiane (entre le $25$e et le $26$e temps) est donc dans la classe $[14\\,;16[$." },
        {
          n: "3.", points: 1,
          texte:
            "On considère la fonction Python suivante, où $\\texttt{c}$ est la liste des centres et $\\texttt{e}$ celle des effectifs :\n\n" +
            "```python\ndef moyenne(c, e):\n    s = 0\n    n = 0\n    for i in range(len(c)):\n        s = s + c[i] * e[i]\n        n = n + e[i]\n    return s / n\n```\n\n" +
            "Que contiennent $\\texttt{s}$ et $\\texttt{n}$ à la fin de la boucle pour les données du cross ? Que renvoie alors la fonction ?",
          indice: "À chaque tour de boucle, on ajoute à $\\texttt{s}$ le produit d'un centre par son effectif, et à $\\texttt{n}$ cet effectif.",
          corrige: "À la fin de la boucle, $\\texttt{s}$ contient la somme des produits centre × effectif, soit $730$, et $\\texttt{n}$ l'effectif total, soit $50$. La fonction renvoie $730 \\div 50 = 14{,}6$ : la moyenne estimée de la question 1."
        }
      ]
    }
  ]
};
