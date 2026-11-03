/*
  SUJET : Première spécialité — Sujet type épreuve anticipée n° 1 (format de la session 2028)
  Page #sujet-premiere-ea-1 ; PDF de l'énoncé et du corrigé fabriqués par outils/sujets-pdf.js.
  Format : voir data/seconde/sujets/devoir-commun-1.js. Deux heures, sans calculatrice : partie 1 d'automatismes
  (6 points, réponses courtes), partie 2 de trois exercices rédigés (14 points). Sujet original, données fictives.
*/
window.SUJETS = window.SUJETS || {};
window.SUJETS["premiere-ea-1"] = {
  entete: "Première spécialité · Sujet type épreuve anticipée n° 1 · Durée : 2 heures",
  consignes: "La calculatrice est **interdite** pendant toute l'épreuve. La partie 1 se traite en $25$ minutes environ ; les trois exercices de la partie 2 sont indépendants. La qualité de la rédaction et la maîtrise de la langue sont prises en compte.",
  exercices: [
    {
      numero: "Partie 1", titre: "Automatismes",
      duree: 25, points: 6, calculatrice: false,
      contexte: "Pour chaque question, écris seulement le résultat, sans justification. Les résultats en fraction sont à donner sous forme irréductible.",
      questions: [
        { n: "1.", points: 0.5, texte: "Calcule $\\dfrac{2}{3} \\times \\dfrac{9}{4} - 1$.", corrige: "$\\dfrac{18}{12} - 1 = \\dfrac{3}{2} - 1 = \\dfrac{1}{2}$." },
        { n: "2.", points: 0.5, texte: "Écris $\\dfrac{2^5 \\times 2^{-3}}{2^4}$ sous la forme $2^n$.", corrige: "$2^{5 - 3 - 4} = 2^{-2}$." },
        { n: "3.", points: 0.5, texte: "Un loyer passe de $500$ € à $535$ €. Quel est le taux d'évolution ?", corrige: "$\\dfrac{535 - 500}{500} = \\dfrac{35}{500} = 0{,}07$ : une hausse de $7\\,\\%$." },
        { n: "4.", points: 0.5, texte: "Développe et réduis $(x - 4)(2x + 1)$.", corrige: "$2x^2 + x - 8x - 4 = 2x^2 - 7x - 4$." },
        { n: "5.", points: 0.5, texte: "Calcule le discriminant du trinôme $3x^2 - 4x + 2$.", corrige: "$\\Delta = (-4)^2 - 4 \\times 3 \\times 2 = 16 - 24 = -8$." },
        { n: "6.", points: 0.5, texte: "Résous l'équation $(2x - 1)(x + 4) = 0$.", corrige: "$x = \\dfrac{1}{2}$ ou $x = -4$." },
        { n: "7.", points: 0.5, texte: "Donne la dérivée de la fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = 4x^3 - 2x + 7$.", corrige: "$f'(x) = 12x^2 - 2$." },
        { n: "8.", points: 0.5, texte: "Donne la valeur exacte de $\\cos\\dfrac{\\pi}{3} + \\sin\\dfrac{\\pi}{6}$.", corrige: "$\\dfrac{1}{2} + \\dfrac{1}{2} = 1$." },
        { n: "9.", points: 0.5, texte: "$(u_n)$ est géométrique, de premier terme $u_0 = 3$ et de raison $2$. Que vaut $u_5$ ?", corrige: "$u_5 = 3 \\times 2^5 = 96$." },
        { n: "10.", points: 0.5, texte: "Dans un repère orthonormé, $\\vec{u}\\begin{pmatrix} 2 \\\\ -3 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} 4 \\\\ 1 \\end{pmatrix}$. Calcule $\\vec{u} \\cdot \\vec{v}$.", corrige: "$2 \\times 4 + (-3) \\times 1 = 5$." },
        { n: "11.", points: 0.5, texte: "Simplifie $\\dfrac{e^{3x} \\times e^{-x}}{e^{x}}$.", corrige: "$e^{3x - x - x} = e^{x}$." },
        { n: "12.", points: 0.5, texte: "$P(A) = 0{,}4$ et $P_A(B) = 0{,}25$. Que vaut $P(A \\cap B)$ ?", corrige: "$0{,}4 \\times 0{,}25 = 0{,}1$." }
      ]
    },
    {
      numero: "Partie 2 · exercice 1", titre: "Reboiser les padzas",
      duree: 30, points: 4.5, calculatrice: false,
      contexte: "Pour lutter contre l'érosion des padzas, ces sols nus des collines, une association a planté $800$ arbres en 2026. Ses subventions baissent : chaque année, elle plante deux fois moins d'arbres que l'année précédente. On note $v_n$ le nombre d'arbres plantés l'année $2026 + n$, avec $v_0 = 800$. L'association compte $12$ bénévoles en 2026 et en accueille $3$ de plus chaque année : on note $b_n$ leur nombre l'année $2026 + n$ (données fictives).",
      questions: [
        { n: "1.", points: 1, texte: "Calcule $v_1$ et $v_2$. Quelle est la nature de la suite $(v_n)$ ? Exprime $v_n$ en fonction de $n$.", indice: "Deux fois moins chaque année : on multiplie par $0{,}5$.", corrige: "$v_1 = 400$ et $v_2 = 200$. Pour tout $n$, $v_{n+1} = 0{,}5\\,v_n$ : $(v_n)$ est géométrique de raison $0{,}5$ et de premier terme $v_0 = 800$, donc $v_n = 800 \\times 0{,}5^n$." },
        { n: "2.", points: 1.5, texte: "Montre que le nombre total d'arbres plantés de 2026 à l'année $2026 + n$ est $S_n = 1\\,600\\left(1 - 0{,}5^{n+1}\\right)$. L'association plantera-t-elle un jour plus de $1\\,600$ arbres au total ?", indice: "Somme des termes d'une suite géométrique : $1 + q + \\dots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$ pour $q \\neq 1$.", corrige: "$S_n = v_0 + v_1 + \\dots + v_n = 800\\left(1 + 0{,}5 + \\dots + 0{,}5^n\\right) = 800 \\times \\dfrac{1 - 0{,}5^{n+1}}{1 - 0{,}5} = 1\\,600\\left(1 - 0{,}5^{n+1}\\right)$.\n\nComme $0{,}5^{n+1} > 0$, on a $S_n < 1\\,600$ pour tout $n$ : avec ce modèle, l'association ne dépassera jamais $1\\,600$ arbres plantés au total." },
        { n: "3.", points: 1, texte: "Quelle est la nature de la suite $(b_n)$ ? Exprime $b_n$ en fonction de $n$, puis détermine la première année où l'association comptera au moins $40$ bénévoles.", indice: "On ajoute $3$ chaque année. Résous $12 + 3n \\geqslant 40$ avec $n$ entier.", corrige: "$(b_n)$ est arithmétique de raison $3$ et de premier terme $12$ : $b_n = 12 + 3n$. Puis $12 + 3n \\geqslant 40 \\iff n \\geqslant \\dfrac{28}{3}$, et $\\dfrac{28}{3} \\approx 9{,}3$ : il faut $n = 10$, c'est-à-dire l'année 2036 ($b_{10} = 42$, alors que $b_9 = 39$)." },
        {
          n: "4.", points: 1,
          texte:
            "On considère la fonction Python suivante :\n\n" +
            "```python\ndef annee(seuil):\n    n = 0\n    v = 800\n    while v >= seuil:\n        n = n + 1\n        v = v / 2\n    return 2026 + n\n```\n\n" +
            "Quelle valeur renvoie l'appel $\\texttt{annee(10)}$, et que représente-t-elle ?",
          indice: "Écris les valeurs successives de $\\texttt{v}$ : $800$, $400$, $200$… jusqu'à ce que la boucle s'arrête.",
          corrige: "$\\texttt{v}$ prend les valeurs $800$, $400$, $200$, $100$, $50$, $25$, $12{,}5$, puis $6{,}25$ : la boucle s'arrête quand $\\texttt{n}$ vaut $7$, et la fonction renvoie $2033$. C'est la première année où l'association plantera moins de $10$ arbres."
        }
      ]
    },
    {
      numero: "Partie 2 · exercice 2", titre: "Une fonction et sa tangente",
      duree: 30, points: 4.5, calculatrice: false,
      contexte: "On considère la fonction $f$ définie sur $[-2\\,;3]$ par $f(x) = 2x^3 - 3x^2 - 12x + 4$, et on note $\\mathcal{C}_f$ sa courbe dans un repère.",
      questions: [
        { n: "1.", points: 0.5, texte: "Calcule $f'(x)$.", indice: "$(x^3)' = 3x^2$ et $(x^2)' = 2x$.", corrige: "$f'(x) = 6x^2 - 6x - 12$." },
        { n: "2.", points: 1, texte: "Vérifie que $f'(x) = 6(x + 1)(x - 2)$, puis étudie le signe de $f'(x)$ sur $[-2\\,;3]$.", indice: "Développe $6(x + 1)(x - 2)$. Un trinôme est du signe de $a$ à l'extérieur de ses racines.", corrige: "$6(x + 1)(x - 2) = 6(x^2 - x - 2) = 6x^2 - 6x - 12 = f'(x)$.\n\n$f'(x)$ est un trinôme de racines $-1$ et $2$, avec $a = 6 > 0$ : $f'(x) > 0$ sur $[-2\\,;-1[$ et sur $]2\\,;3]$, et $f'(x) < 0$ sur $]-1\\,;2[$." },
        {
          n: "3.", points: 1,
          texte: "Dresse le tableau de variations de $f$ sur $[-2\\,;3]$, avec les valeurs de $f$ aux bornes et aux extremums.",
          indice: "Calcule $f(-2)$, $f(-1)$, $f(2)$ et $f(3)$.",
          corrige: "$f(-2) = -16 - 12 + 24 + 4 = 0$, $f(-1) = -2 - 3 + 12 + 4 = 11$, $f(2) = 16 - 12 - 24 + 4 = -16$ et $f(3) = 54 - 27 - 36 + 4 = -5$.",
          tableauCorrige: { lignes: [["x", "-2", "", "-1", "", "2", "", "3"], ["f(x)", "0", "\\nearrow", "11", "\\searrow", "-16", "\\nearrow", "-5"]] }
        },
        { n: "4.", points: 1, texte: "Détermine une équation de la tangente $T$ à $\\mathcal{C}_f$ au point d'abscisse $0$.", indice: "$T$ a pour équation $y = f'(0)(x - 0) + f(0)$.", corrige: "$f(0) = 4$ et $f'(0) = -12$, donc $T$ a pour équation $y = -12x + 4$." },
        { n: "5.", points: 1, texte: "Montre que, pour tout $x$, $f(x) - (-12x + 4) = x^2(2x - 3)$. Déduis-en la position de $\\mathcal{C}_f$ par rapport à $T$.", indice: "Étudie le signe du produit $x^2(2x - 3)$ : $x^2 \\geqslant 0$.", corrige: "$f(x) - (-12x + 4) = 2x^3 - 3x^2 = x^2(2x - 3)$.\n\nComme $x^2 \\geqslant 0$, ce produit est du signe de $2x - 3$ (et nul en $0$) : $\\mathcal{C}_f$ est au-dessous de $T$ sur $\\left[-2\\,;\\dfrac{3}{2}\\right]$, au-dessus sur $\\left]\\dfrac{3}{2}\\,;3\\right]$, et elle touche $T$ au point d'abscisse $0$ et la coupe au point d'abscisse $\\dfrac{3}{2}$." }
      ]
    },
    {
      numero: "Partie 2 · exercice 3", titre: "Les larves de moustiques dans les citernes",
      duree: 35, points: 5, calculatrice: false,
      contexte: "Dans une commune, $20\\,\\%$ des citernes d'eau de pluie contiennent des larves de moustiques. Un agent contrôle une citerne au hasard. Si elle contient des larves, il les repère avec la probabilité $0{,}9$ ; si elle n'en contient pas, il en signale par erreur avec la probabilité $0{,}1$. On note $L$ l'événement « la citerne contient des larves » et $D$ l'événement « l'agent signale des larves » (données fictives).",
      questions: [
        { n: "1.", points: 1, texte: "Représente la situation par un arbre pondéré.", indice: "Premier niveau : $L$ et $\\overline{L}$ ; second niveau : $D$ et $\\overline{D}$.", corrige: "$P(L) = 0{,}2$, $P_L(D) = 0{,}9$ et $P_{\\overline{L}}(D) = 0{,}1$ ; les autres branches s'en déduisent, car les branches issues d'un même nœud ont pour somme $1$.", figureCorrige: (o) => o.arbreProba(["L", "~L", "D", "~D"], ["0,2", "0,8", "0,9", "0,1", "0,1", "0,9"], "Arbre pondéré : L 0,2 et non L 0,8 ; après L : D 0,9 et non D 0,1 ; après non L : D 0,1 et non D 0,9") },
        { n: "2.", points: 0.5, texte: "Calcule $P(L \\cap D)$.", indice: "On multiplie le long du chemin $L$, puis $D$.", corrige: "$P(L \\cap D) = 0{,}2 \\times 0{,}9 = 0{,}18$." },
        { n: "3.", points: 1, texte: "Montre que $P(D) = 0{,}26$.", indice: "Deux chemins mènent à $D$ : formule des probabilités totales.", corrige: "D'après la formule des probabilités totales : $P(D) = P(L \\cap D) + P\\left(\\overline{L} \\cap D\\right) = 0{,}18 + 0{,}8 \\times 0{,}1 = 0{,}18 + 0{,}08 = 0{,}26$." },
        { n: "4.", points: 1, texte: "L'agent signale des larves. Quelle est la probabilité que la citerne en contienne vraiment ? Donne le résultat sous forme de fraction irréductible.", indice: "On cherche $P_D(L) = \\dfrac{P(L \\cap D)}{P(D)}$.", corrige: "$P_D(L) = \\dfrac{0{,}18}{0{,}26} = \\dfrac{18}{26} = \\dfrac{9}{13}$. Près d'un signalement sur trois est donc une fausse alerte : $1 - \\dfrac{9}{13} = \\dfrac{4}{13} \\approx 0{,}31$." },
        { n: "5.", points: 1.5, texte: "Chaque citerne signalée est traitée, pour un coût de $15$ €. Une citerne qui contient des larves mais n'est pas signalée coûte plus tard $40$ € à la commune. Sinon, le coût est nul. On note $X$ le coût, en euros, pour une citerne contrôlée. Donne la loi de $X$, puis son espérance. Combien la commune doit-elle prévoir pour $500$ citernes ?", indice: "$X$ vaut $15$ si $D$ est réalisé, $40$ si $L \\cap \\overline{D}$ est réalisé, et $0$ sinon.", corrige: "$P(X = 15) = P(D) = 0{,}26$, $P(X = 40) = P\\left(L \\cap \\overline{D}\\right) = 0{,}2 \\times 0{,}1 = 0{,}02$ et $P(X = 0) = 1 - 0{,}26 - 0{,}02 = 0{,}72$.",
          tableauCorrige: { lignes: [["x_i", "0", "15", "40"], ["P(X = x_i)", "0{,}72", "0{,}26", "0{,}02"]] },
          corrigeFin: "$E(X) = 0 \\times 0{,}72 + 15 \\times 0{,}26$ ${} + 40 \\times 0{,}02 = 3{,}9 + 0{,}8 = 4{,}7$ €. Pour $500$ citernes, la commune doit prévoir en moyenne $500 \\times 4{,}7 = 2\\,350$ €." }
      ]
    }
  ]
};
