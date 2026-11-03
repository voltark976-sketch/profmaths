/*
  SUJET OFFICIEL : Première spécialité — Sujet zéro n° 2 de l'épreuve anticipée de mathématiques (Eduscol)
  Page #sujet-premiere-sz-2 ; PDF du corrigé fabriqué par outils/sujets-pdf.js. Même format que sujet-zero-1.js :
  l'énoncé n'est pas recopié (champ officiel du catalogue), chaque question n'a qu'un court rappel, avec un indice et
  le corrigé rédigé par ProfMaths ; barème de la partie 2 indicatif (le sujet officiel indique « X points »).
  Partie 1 en QCM (format de la session de juin 2026), propositions notées A à D.
  Question A.1.b : l'axe de symétrie n'est plus nommé par le programme de 2026 ; le corrigé le signale.
*/
window.SUJETS = window.SUJETS || {};
window.SUJETS["premiere-sz-2"] = {
  entete: "Première spécialité · Sujet zéro n° 2 de l'épreuve anticipée (sujet officiel) · Durée : 2 heures, sans calculatrice",
  consignes: "**Sujet officiel** publié par Eduscol avant la première session de l'épreuve anticipée. Son énoncé n'est pas recopié ici : ouvre-le ou imprime-le, fais le sujet en $2$ heures sans calculatrice, puis compare ta copie avec ce corrigé, question par question.\n\nDans ce sujet, la partie 1 est un QCM. En juin 2027, elle sera faite de questions à réponses courtes, sans propositions : entraîne-toi à trouver chaque réponse avant de regarder les propositions. Le sujet ne précise pas le barème de la partie 2 : celui du corrigé est indicatif.",
  exercices: [
    {
      numero: "Partie 1", titre: "Automatismes (QCM)",
      duree: 25, points: 6, calculatrice: false,
      contexte: "Douze questions, une seule proposition exacte par question (propositions A à D). Le corrigé donne la lettre de la bonne réponse et le calcul qui y mène.",
      questions: [
        { n: "1.", points: 0.5, texte: "La probabilité de l'événement $B$, d'après l'arbre.", corrige: "D'après l'arbre, $P(A) = 0{,}4$, $P_A(B) = 0{,}3$ et $P_{\\overline{A}}\\left(\\overline{B}\\right) = 0{,}9$, donc $P\\left(\\overline{A}\\right) = 0{,}6$ et $P_{\\overline{A}}(B) = 0{,}1$. Avec la formule des probabilités totales :\n\n$p(B) = 0{,}4 \\times 0{,}3 + 0{,}6 \\times 0{,}1$\n${} = 0{,}12 + 0{,}06 = 0{,}18$\n\nRéponse **A**. La proposition **B** ($0{,}12$) ne compte que le chemin qui passe par $A$." },
        { n: "2.", points: 0.5, texte: "Le prix d'une tablette de $200$ € après une baisse de $30\\,\\%$.", corrige: "Baisser de $30\\,\\%$, c'est multiplier par $1 - 0{,}3 = 0{,}7$ : $200 \\times 0{,}7 = 140$ €. Réponse **A**." },
        { n: "3.", points: 0.5, texte: "Une réduction de $50\\,\\%$ suivie d'une augmentation de $50\\,\\%$.", corrige: "Les coefficients multiplicateurs se multiplient : $0{,}5 \\times 1{,}5 = 0{,}75$, et $0{,}75 = 1 - 0{,}25$ : cela équivaut à une réduction de $25\\,\\%$.\n\nRéponse **B**." },
        { n: "4.", points: 0.5, texte: "La proportion des filles internes parmi tous les élèves du lycée.", corrige: "On prend la moitié du quart :\n\n$\\dfrac{1}{2} \\times \\dfrac{1}{4} = \\dfrac{1}{8} = 0{,}125$\n\nsoit $12{,}5\\,\\%$ des élèves.\n\nRéponse **B**." },
        { n: "5.", points: 0.5, texte: "Une autre écriture de $N = \\dfrac{10^7}{5^2}$.", corrige: "$10^7 = 2^7 \\times 5^7$, donc :\n\n$N = \\dfrac{2^7 \\times 5^7}{5^2} = 2^7 \\times 5^5$\n\n$N = 2^2 \\times 2^5 \\times 5^5 = 4 \\times 10^5$\n\nRéponse **D**. On peut aussi calculer $10\\,000\\,000 \\div 25 = 400\\,000$." },
        { n: "6.", points: 0.5, texte: "Une énergie de $7{,}5 \\times 10^6$ joules convertie en kWh.", corrige: "Un kWh vaut $3{,}6 \\times 10^6$ J, donc l'énergie, en kWh, vaut :\n\n$\\dfrac{7{,}5 \\times 10^6}{3{,}6 \\times 10^6} = \\dfrac{7{,}5}{3{,}6} = \\dfrac{75}{36} = \\dfrac{25}{12}$\n\nC'est un peu plus de $2$, car $2 \\times 12 = 24$ : environ $2{,}08$ kWh. Réponse **B**." },
        { n: "7.", points: 0.5, texte: "Le coefficient directeur de la droite passant par $A(0\\,;-1)$ et $B(2\\,;5)$.", corrige: "$\\dfrac{y_B - y_A}{x_B - x_A} = \\dfrac{5 - (-1)}{2 - 0} = \\dfrac{6}{2} = 3$ : réponse **C**." },
        { n: "8.", points: 0.5, texte: "L'équation qui peut représenter la droite $D$ tracée.", corrige: "La droite $D$ passe par l'origine et elle descend : une équation est de la forme $y = mx$ avec $m < 0$.\n\n- **A** : $y = 2x$, coefficient positif.\n- **B** : $y = -2x - 1$, pas de passage par l'origine.\n- **D** : $y = 2x - 1$, pas de passage par l'origine.\n\nPour **C**, on développe : $x^2 - (x + 1)^2 + 1 = x^2 - x^2 - 2x - 1 + 1 = -2x$. L'équation s'écrit $y = -2x$ : malgré le $x^2$ de son écriture, c'est une droite qui passe par l'origine et descend.\n\nRéponse **C**." },
        { n: "9.", points: 0.5, texte: "L'ensemble $\\mathcal{S}$ des solutions de $x^2 = 10$ sur $\\mathbb{R}$.", corrige: "$x^2 = 10$ équivaut à $x = \\sqrt{10}$ ou $x = -\\sqrt{10}$, donc :\n\n$\\mathcal{S} = \\left\\{-\\sqrt{10}\\,;\\sqrt{10}\\right\\}$\n\nRéponse **C**." },
        {
          n: "10.", points: 0.5, texte: "Le tableau de signes de $f(x) = (3x - 15)(x + 2)$.",
          corrige: "$3x - 15 = 0$ pour $x = 5$ et $x + 2 = 0$ pour $x = -2$. Développé, $f(x) = 3x^2 - 9x - 30$, de coefficient $a = 3 > 0$ : $f(x)$ est positif à l'extérieur des racines $-2$ et $5$, négatif entre elles :",
          tableauCorrige: { lignes: [["x", "-\\infty", "", "-2", "", "5", "", "+\\infty"], ["f(x)", "", "+", "0", "-", "0", "+", ""]] },
          corrigeFin: "C'est le tableau de la proposition **A**."
        },
        { n: "11.", points: 0.5, texte: "La forme développée de $(2x + 0{,}5)^2$.", corrige: "$(a + b)^2 = a^2 + 2ab + b^2$ avec $a = 2x$ et $b = 0{,}5$ :\n\n$(2x)^2 + 2 \\times 2x \\times 0{,}5 + 0{,}5^2$\n${} = 4x^2 + 2x + 0{,}25$\n\nRéponse **C**." },
        { n: "12.", points: 0.5, texte: "La vitesse $v$ exprimée à partir de $a = \\dfrac{v^2}{R}$.", corrige: "$a = \\dfrac{v^2}{R}$ équivaut à $v^2 = aR$. Une vitesse est positive, donc $v = \\sqrt{aR}$ : réponse **B**." }
      ]
    },
    {
      numero: "Partie 2 · exercice 1", titre: "La population d'une ville et une nouvelle école",
      duree: 45, points: 7, calculatrice: false,
      contexte: "Rappel des données : $u_0 = 10\\,000$ et, pour tout entier naturel $n$, $u_{n+1} = 1{,}08\\,u_n - 300$, où $u_n$ est le nombre d'habitants l'année $2020 + n$ ; puis $v_n = u_n - 3\\,750$.",
      questions: [
        { n: "1.", points: 1, texte: "Ce que représente $u_1$, et sa valeur.", indice: "$u_n$ est le nombre d'habitants l'année $2020 + n$ ; applique la relation de récurrence avec $n = 0$.", corrige: "$u_1$ est le nombre d'habitants de la ville en $2021$ :\n\n$u_1 = 1{,}08 \\times 10\\,000 - 300$\n${} = 10\\,800 - 300 = 10\\,500$\n\nLa ville compte $10\\,500$ habitants en $2021$." },
        { n: "2.a", points: 0.5, texte: "La valeur de $v_0$.", corrige: "$v_0 = u_0 - 3\\,750 = 10\\,000 - 3\\,750 = 6\\,250$." },
        { n: "2.b", points: 1.5, texte: "Démontrer que $v_{n+1} = 1{,}08\\,v_n$ pour tout entier naturel $n$.", indice: "Écris $v_{n+1} = u_{n+1} - 3\\,750$, remplace $u_{n+1}$, puis compare avec $1{,}08\\,v_n = 1{,}08(u_n - 3\\,750)$.", corrige: "Pour tout entier naturel $n$ :\n\n$v_{n+1} = u_{n+1} - 3\\,750$\n${} = 1{,}08\\,u_n - 300 - 3\\,750$\n${} = 1{,}08\\,u_n - 4\\,050$\n\nOr $1{,}08 \\times 3\\,750 = 4\\,050$, donc :\n\n$1{,}08\\,v_n = 1{,}08(u_n - 3\\,750)$\n${} = 1{,}08\\,u_n - 4\\,050$\n\nLes deux expressions sont égales : $v_{n+1} = 1{,}08\\,v_n$." },
        { n: "2.c", points: 0.5, texte: "La nature de la suite $(v_n)$.", corrige: "Chaque terme s'obtient en multipliant le précédent par $1{,}08$ : la suite $(v_n)$ est géométrique de raison $1{,}08$ et de premier terme $v_0 = 6\\,250$." },
        { n: "2.d", points: 0.5, texte: "$v_n$ en fonction de $n$.", corrige: "Pour tout entier naturel $n$ :\n\n$v_n = v_0 \\times 1{,}08^n = 6\\,250 \\times 1{,}08^n$." },
        { n: "2.e", points: 1, texte: "En déduire que $u_n = 6\\,250 \\times 1{,}08^n + 3\\,750$.", indice: "$v_n = u_n - 3\\,750$, donc $u_n = v_n + 3\\,750$.", corrige: "Comme $v_n = u_n - 3\\,750$, on a $u_n = v_n + 3\\,750$. Avec 2.d, pour tout entier naturel $n$ :\n\n$u_n = 6\\,250 \\times 1{,}08^n + 3\\,750$." },
        { n: "3.", points: 2, texte: "L'année où doit commencer la construction de l'école (seuil de $19\\,000$ habitants, deux ans de travaux).", indice: "Cherche dans la colonne B la première valeur supérieure ou égale à $19\\,000$, puis l'année qui lui correspond.", corrige: "La suite $(u_n)$ est croissante : $1{,}08^n$ augmente avec $n$, car $1{,}08 > 1$, et $6\\,250 > 0$. Une fois les $19\\,000$ habitants atteints, la population reste donc au-dessus.\n\nLe tableau donne $u_{11} \\approx 18\\,323$, encore en dessous de $19\\,000$, puis $u_{12} \\approx 19\\,489$. La population atteint $19\\,000$ habitants pour $n = 12$, c'est-à-dire en $2020 + 12 = 2032$.\n\nL'école doit ouvrir en $2032$ et sa construction dure deux ans : elle doit commencer en $2030$." }
      ]
    },
    {
      numero: "Partie 2 · exercice 2", titre: "Un trinôme et une fonction avec l'exponentielle",
      duree: 50, points: 7, calculatrice: false,
      contexte: "Rappel des données : $P(x) = 2x^2 + x - 10$ sur $[-5\\,;3]$ ; $f(x) = (4x^2 - 14x + 8)\\,e^{0{,}5x}$ sur $[-5\\,;3]$, de courbe $\\mathcal{C}_f$ ; la tangente $T$ à $\\mathcal{C}_f$ au point $A$ d'abscisse $2$ est horizontale.",
      questions: [
        { partie: "Partie A" },
        { n: "1.a", points: 1, texte: "Les racines de $P$.", indice: "Calcule le discriminant $\\Delta = b^2 - 4ac$.", corrige: "$\\Delta = 1^2 - 4 \\times 2 \\times (-10) = 81$, et $81 = 9^2$.\n\n$\\Delta > 0$, donc $P$ a deux racines :\n\n$x_1 = \\dfrac{-1 - 9}{4} = -\\dfrac{5}{2}$\n\n$x_2 = \\dfrac{-1 + 9}{4} = 2$\n\nLes deux racines, $-2{,}5$ et $2$, sont dans l'intervalle $[-5\\,;3]$." },
        { n: "1.b", points: 0.5, texte: "L'axe de symétrie de la parabole d'équation $y = P(x)$.", indice: "Les deux racines sont symétriques par rapport à cet axe : prends leur moyenne.", corrige: "La parabole est symétrique par rapport à la droite verticale qui passe au milieu de ses deux racines, d'équation :\n\n$x = \\dfrac{-2{,}5 + 2}{2} = -0{,}25$\n\nOn retrouve $-\\dfrac{b}{2a} = -\\dfrac{1}{4}$, l'abscisse où le trinôme atteint son minimum. Le programme de 2026 ne nomme plus l'axe de symétrie, mais le calcul est le même." },
        {
          n: "2.", points: 1, texte: "Le tableau de signes de $P$ sur $[-5\\,;3]$.",
          indice: "Un trinôme est du signe de $a$ à l'extérieur de ses racines.",
          corrige: "$a = 2 > 0$ : $P(x)$ est positif à l'extérieur des racines et négatif entre elles.",
          tableauCorrige: { lignes: [["x", "-5", "", "-2{,}5", "", "2", "", "3"], ["P(x)", "", "+", "0", "-", "0", "+", ""]] }
        },
        { partie: "Partie B" },
        { n: "1.", points: 0.5, texte: "La valeur du nombre dérivé $f'(2)$.", indice: "$f'(2)$ est le coefficient directeur de la tangente au point d'abscisse $2$.", corrige: "La tangente $T$ au point d'abscisse $2$ est horizontale : son coefficient directeur est nul, donc $f'(2) = 0$." },
        { n: "2.", points: 1, texte: "Résoudre graphiquement l'inéquation $f'(x) < 0$.", indice: "$f'(x) < 0$ là où la courbe descend.", corrige: "$f'(x) < 0$ sur les intervalles où $f$ est strictement décroissante. Sur la courbe, $f$ croît jusqu'à son maximum, atteint vers $x = -2{,}5$, décroît jusqu'au point $A$ d'abscisse $2$, puis croît de nouveau.\n\nAvec la précision du graphique, $f'(x) < 0$ pour $x$ dans $]-2{,}5\\,;2[$." },
        { n: "3.", points: 1.5, texte: "Démontrer que $f'(x) = P(x)\\,e^{0{,}5x}$.", indice: "Dérivée d'un produit : $(uv)' = u'v + uv'$, avec $\\left(e^{0{,}5x}\\right)' = 0{,}5\\,e^{0{,}5x}$.", corrige: "On pose $u(x) = 4x^2 - 14x + 8$ et $v(x) = e^{0{,}5x}$ : $u'(x) = 8x - 14$ et $v'(x) = 0{,}5\\,e^{0{,}5x}$. Alors :\n\n$f'(x) = (8x - 14)\\,e^{0{,}5x}$ ${} + (4x^2 - 14x + 8) \\times 0{,}5\\,e^{0{,}5x}$\n${} = (8x - 14 + 2x^2 - 7x + 4)\\,e^{0{,}5x}$\n${} = (2x^2 + x - 10)\\,e^{0{,}5x}$\n${} = P(x)\\,e^{0{,}5x}$." },
        {
          n: "4.", points: 1.5, texte: "Le tableau de variations de $f$ sur $[-5\\,;3]$, sans calculer les images.",
          indice: "$e^{0{,}5x} > 0$ : $f'(x)$ a le signe de $P(x)$, étudié dans la partie A.",
          corrige: "Pour tout réel $x$, $e^{0{,}5x} > 0$, donc $f'(x) = P(x)\\,e^{0{,}5x}$ a le signe de $P(x)$ (partie A, question 2). $f$ est croissante sur $[-5\\,;-2{,}5]$, décroissante sur $[-2{,}5\\,;2]$ et croissante sur $[2\\,;3]$.",
          tableauCorrige: { lignes: [["x", "-5", "", "-2{,}5", "", "2", "", "3"], ["f'(x)", "", "+", "0", "-", "0", "+", ""], ["f(x)", "", "\\nearrow", "", "\\searrow", "", "\\nearrow", ""]] },
          corrigeFin: "C'est bien ce que montrait la courbe : un maximum en $-2{,}5$ et un minimum en $2$, au point $A$."
        }
      ]
    }
  ]
};
