/*
  SUJET : Terminale maths complémentaires — Sujet type évaluation n° 1 (sujet original, données fictives ;
  option notée en contrôle continu, sans épreuve écrite au bac)
  Page #sujet-terminale-compl-1 ; PDF de l'énoncé et du corrigé fabriqués par outils/sujets-pdf.js.
  Même format que data/seconde/sujets/devoir-commun-1.js. Deux heures, calculatrice autorisée, trois exercices :
  suite arithmético-géométrique et logarithme ; loi binomiale et loi géométrique ; courbe de Lorenz, convexité et
  indice de Gini. Contextes et nombres différents de ceux du cours et des onglets Évaluation du niveau.
*/
window.SUJETS = window.SUJETS || {};
window.SUJETS["terminale-compl-1"] = {
  entete: "Terminale maths complémentaires · Sujet type évaluation n° 1 · Durée : 2 heures",
  consignes: "La calculatrice est **autorisée**. Les trois exercices sont indépendants. La qualité de la rédaction, la clarté et la précision des raisonnements sont prises en compte.",
  exercices: [
    {
      numero: "Exercice 1", titre: "La mangrove de la baie",
      duree: 35, points: 6, calculatrice: true,
      contexte: "Une association replante la mangrove d'une baie de Mayotte. En 2026, la mangrove couvre $50$ hectares. Chaque année, $10\\,\\%$ de sa surface disparaît (érosion, coupes), puis l'association replante $12$ hectares (données fictives). On note $m_n$ la surface, en hectares, de la mangrove en $2026 + n$ : ainsi $m_0 = 50$ et, pour tout entier naturel $n$, $m_{n+1} = 0{,}9\\,m_n + 12$.",
      questions: [
        { n: "1.", points: 0.5, texte: "Calcule $m_1$ et $m_2$.", corrige: "$m_1 = 0{,}9 \\times 50 + 12 = 57$ et $m_2 = 0{,}9 \\times 57 + 12 = 63{,}3$." },
        { n: "2.", points: 1.5, texte: "On pose $v_n = m_n - 120$ pour tout entier naturel $n$. Montre que la suite $(v_n)$ est géométrique ; précise sa raison et son premier terme.", indice: "Écris $v_{n+1} = m_{n+1} - 120$, remplace $m_{n+1}$, puis factorise par $0{,}9$.", corrige: "Pour tout entier naturel $n$ :\n\n$v_{n+1} = m_{n+1} - 120 = 0{,}9\\,m_n + 12 - 120$\n${} = 0{,}9\\,m_n - 108 = 0{,}9\\,(m_n - 120)$\n${} = 0{,}9\\,v_n$\n\nLa suite $(v_n)$ est géométrique de raison $0{,}9$, de premier terme $v_0 = 50 - 120 = -70$." },
        { n: "3.", points: 1, texte: "Exprime $v_n$, puis $m_n$, en fonction de $n$.", corrige: "$v_n = v_0 \\times 0{,}9^n = -70 \\times 0{,}9^n$, donc $m_n = v_n + 120 = 120 - 70 \\times 0{,}9^n$." },
        { n: "4.", points: 1, texte: "Détermine la limite de la suite $(m_n)$ et interprète-la.", indice: "Si $0 < q < 1$, alors $q^n$ tend vers $0$.", corrige: "Comme $0 < 0{,}9 < 1$, la suite $\\left(0{,}9^n\\right)$ tend vers $0$, donc $m_n$ tend vers $120$.\n\nSelon ce modèle, la surface de la mangrove se rapproche de $120$ hectares au fil des années, sans les dépasser (car $70 \\times 0{,}9^n > 0$)." },
        { n: "5.", points: 1.5, texte: "L'association vise $100$ hectares. Détermine par le calcul l'année à partir de laquelle cet objectif est atteint.", indice: "Résous $120 - 70 \\times 0{,}9^n \\geqslant 100$, puis utilise le logarithme népérien ; attention, $\\ln 0{,}9 < 0$.", corrige: "$120 - 70 \\times 0{,}9^n \\geqslant 100 \\iff 70 \\times 0{,}9^n \\leqslant 20 \\iff 0{,}9^n \\leqslant \\dfrac{2}{7}$\n\nLa fonction $\\ln$ est croissante, donc $n\\ln 0{,}9 \\leqslant \\ln\\dfrac{2}{7}$. Comme $\\ln 0{,}9 < 0$, en divisant le sens change :\n\n$n \\geqslant \\dfrac{\\ln(2/7)}{\\ln 0{,}9} \\approx 11{,}9$\n\nLe plus petit entier qui convient est $n = 12$ : l'objectif est atteint à partir de $2026 + 12 = 2038$. Vérification : $m_{11} \\approx 98{,}0$ et $m_{12} \\approx 100{,}2$." },
        {
          n: "6.", points: 0.5,
          texte:
            "On considère la fonction Python suivante :\n\n" +
            "```python\ndef annee(s):\n    n = 0\n    m = 50\n    while m < s:\n        m = ...\n        n = n + 1\n    return 2026 + n\n```\n\n" +
            "Que faut-il écrire à la place des points de suspension ? Que renvoie alors $\\texttt{annee(100)}$ ?",
          indice: "La boucle calcule les termes successifs de la suite tant que la surface reste inférieure au seuil $\\texttt{s}$.",
          corrige: "On écrit $\\texttt{m = 0.9*m + 12}$ : la variable $\\texttt{m}$ prend les valeurs successives $m_1$, $m_2$, et ainsi de suite. D'après la question 5, $\\texttt{annee(100)}$ renvoie $2038$."
        }
      ]
    },
    {
      numero: "Exercice 2", titre: "Les sorties de pêche",
      duree: 40, points: 7, calculatrice: true,
      contexte: "Un pêcheur sort en mer chaque matin. On admet qu'à chaque sortie, il pêche au moins un thon avec la probabilité $0{,}3$, indépendamment des autres sorties (données fictives). Les résultats sont à arrondir à $10^{-3}$.",
      questions: [
        { partie: "Partie A : dix sorties" },
        { n: "1.", points: 1, texte: "On note $X$ le nombre de sorties avec au moins un thon, parmi $10$ sorties. Justifie que $X$ suit une loi binomiale et donne ses paramètres.", indice: "Repère l'épreuve de Bernoulli répétée, son succès, sa probabilité, et le nombre de répétitions.", corrige: "Chaque sortie est une épreuve de Bernoulli, de succès « au moins un thon », de probabilité $p = 0{,}3$. Les $10$ sorties sont identiques et indépendantes, et $X$ compte les succès : $X$ suit la loi binomiale $\\mathcal{B}(10\\,;0{,}3)$." },
        { n: "2.", points: 1, texte: "Calcule $P(X = 3)$.", indice: "$P(X = k) = \\binom{n}{k}p^k(1 - p)^{n - k}$.", corrige: "$P(X = 3) = \\binom{10}{3} \\times 0{,}3^3 \\times 0{,}7^7$\n${} = 120 \\times 0{,}027 \\times 0{,}7^7 \\approx 0{,}267$" },
        { n: "3.", points: 1, texte: "Calcule la probabilité que le pêcheur ramène au moins un thon pendant ces $10$ sorties, et interprète.", indice: "Passe par l'événement contraire : $X = 0$.", corrige: "$P(X \\geqslant 1) = 1 - P(X = 0) = 1 - 0{,}7^{10} \\approx 0{,}972$.\n\nIl est presque certain de pêcher au moins un thon en $10$ sorties : environ $97$ chances sur $100$." },
        { n: "4.", points: 1, texte: "Calcule l'espérance de $X$ et interprète-la.", corrige: "$E(X) = np = 10 \\times 0{,}3 = 3$. Sur un grand nombre de séries de $10$ sorties, le pêcheur ramène en moyenne au moins un thon lors de $3$ sorties sur $10$." },
        { partie: "Partie B : en attendant le premier thon" },
        { n: "1.", points: 1, texte: "On note $T$ le rang de la première sortie où le pêcheur pêche au moins un thon. Quelle loi suit $T$ ? Calcule $P(T = 4)$.", indice: "$T$ est le rang du premier succès dans une suite d'épreuves de Bernoulli indépendantes de paramètre $0{,}3$.", corrige: "$T$ est le rang du premier succès dans une répétition d'épreuves de Bernoulli indépendantes de paramètre $0{,}3$ : $T$ suit la loi géométrique de paramètre $0{,}3$.\n\n$P(T = 4) = 0{,}7^3 \\times 0{,}3 \\approx 0{,}103$ : trois sorties sans thon, puis une avec." },
        { n: "2.", points: 1, texte: "Calcule $P(T > 5)$ et interprète ce résultat.", indice: "$T > 5$ signifie que les $5$ premières sorties sont sans thon.", corrige: "$P(T > 5) = 0{,}7^5 \\approx 0{,}168$. La probabilité que le pêcheur ne pêche aucun thon lors de ses $5$ premières sorties est d'environ $0{,}168$." },
        { n: "3.", points: 1, texte: "Calcule l'espérance de $T$ et interprète-la.", corrige: "$E(T) = \\dfrac{1}{0{,}3} = \\dfrac{10}{3} \\approx 3{,}3$. En moyenne, le premier thon arrive à la troisième ou à la quatrième sortie, environ $3{,}3$ sorties." }
      ]
    },
    {
      numero: "Exercice 3", titre: "Une courbe de Lorenz",
      duree: 45, points: 7, calculatrice: true,
      contexte: "Dans un pays imaginaire, la répartition des revenus est modélisée par la fonction $L$ définie sur $[0\\,;1]$ par $L(x) = 0{,}3x + 0{,}7x^3$ : les $100x\\,\\%$ des ménages les plus modestes perçoivent $100\\,L(x)\\,\\%$ du revenu total. Sa courbe de Lorenz et la droite d'égalité parfaite, d'équation $y = x$, sont tracées ci-dessous.",
      figure: (o) => o.graph({
        xmin: -0.08, xmax: 1.08, ymin: -0.08, ymax: 1.08, xstep: 0.2, ystep: 0.2, h: 300,
        curves: [{ f: (x) => x, a: 0, b: 1, label: "y = x", lx: 0.62, dx: -8, dy: -10 }, { f: (x) => 0.3 * x + 0.7 * x ** 3, a: 0, b: 1, label: "L", lx: 0.8, dx: 14, dy: 6 }],
        aria: "Courbe de Lorenz de L(x) = 0,3x + 0,7x³ sur [0 ; 1], sous la droite d'égalité y = x, les deux allant de (0 ; 0) à (1 ; 1)"
      }),
      questions: [
        { n: "1.", points: 1, texte: "Calcule $L(0)$, $L(1)$ et $L(0{,}5)$. Interprète $L(0{,}5)$.", corrige: "$L(0) = 0$, $L(1) = 0{,}3 + 0{,}7 = 1$ et $L(0{,}5) = 0{,}15 + 0{,}7 \\times 0{,}125 = 0{,}2375$.\n\nLa moitié la plus modeste des ménages perçoit environ $23{,}75\\,\\%$ du revenu total." },
        { n: "2.", points: 1.5, texte: "Étudie les variations de $L$ sur $[0\\,;1]$, puis sa convexité.", indice: "Calcule $L'(x)$, puis $L''(x)$, et étudie leurs signes sur $[0\\,;1]$.", corrige: "$L'(x) = 0{,}3 + 2{,}1x^2 > 0$ : $L$ est strictement croissante sur $[0\\,;1]$.\n\n$L''(x) = 4{,}2x \\geqslant 0$ sur $[0\\,;1]$ : $L$ est convexe sur $[0\\,;1]$, comme toute courbe de Lorenz." },
        { n: "3.", points: 1, texte: "Montre que $L(x) \\leqslant x$ pour tout $x$ de $[0\\,;1]$. Interprète.", indice: "Factorise $x - L(x)$.", corrige: "$x - L(x) = 0{,}7x - 0{,}7x^3 = 0{,}7x(1 - x^2)$, soit $x - L(x) = 0{,}7x(1 - x)(1 + x)$.\n\nSur $[0\\,;1]$, les trois facteurs $x$, $1 - x$ et $1 + x$ sont positifs ou nuls : $L(x) \\leqslant x$. La courbe de Lorenz est sous la droite d'égalité : les ménages les plus modestes perçoivent moins que leur part de la population." },
        { n: "4.", points: 2, texte: "Calcule l'indice de Gini $G = 2\\displaystyle\\int_0^1 \\left(x - L(x)\\right)\\mathrm{d}x$.", indice: "Une primitive de $0{,}7x - 0{,}7x^3$ est $0{,}7\\left(\\dfrac{x^2}{2} - \\dfrac{x^4}{4}\\right)$.", corrige: "$\\displaystyle\\int_0^1 \\left(0{,}7x - 0{,}7x^3\\right)\\mathrm{d}x = 0{,}7\\left[\\dfrac{x^2}{2} - \\dfrac{x^4}{4}\\right]_0^1$\n${} = 0{,}7 \\times \\left(\\dfrac{1}{2} - \\dfrac{1}{4}\\right) = 0{,}175$\n\nDonc $G = 2 \\times 0{,}175 = 0{,}35$. L'indice est compris entre $0$ (égalité parfaite) et $1$ : cette répartition est assez inégalitaire, sans être extrême." },
        { n: "5.", points: 1.5, texte: "Quelle part du revenu total perçoivent les $10\\,\\%$ des ménages les plus aisés ?", indice: "Les $90\\,\\%$ les plus modestes perçoivent $L(0{,}9)$ ; les $10\\,\\%$ les plus aisés perçoivent le reste.", corrige: "Les $90\\,\\%$ des ménages les plus modestes perçoivent $L(0{,}9) = 0{,}27 + 0{,}7 \\times 0{,}729 = 0{,}7803$ du revenu total.\n\nLes $10\\,\\%$ les plus aisés perçoivent donc $1 - 0{,}7803 = 0{,}2197$, soit environ $22\\,\\%$ du revenu total : plus du double de leur part de la population." }
      ]
    }
  ]
};
