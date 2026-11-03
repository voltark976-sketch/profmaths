/*
  SUJET OFFICIEL : Première spécialité — Sujet zéro n° 1 de l'épreuve anticipée de mathématiques (Eduscol)
  Page #sujet-premiere-sz-1 ; PDF du corrigé fabriqué par outils/sujets-pdf.js.
  L'énoncé n'est pas recopié : la page renvoie au PDF officiel (champ officiel du catalogue). Chaque question n'a ici
  qu'un court rappel, avec un indice et le corrigé rédigé par ProfMaths. Le sujet officiel ne donne pas le barème
  de la partie 2 (« X points ») : celui-ci est indicatif. Partie 1 en QCM (format de la session de juin 2026).
  Sur téléphone, un calcul avec des fractions est seul sur sa ligne (paragraphe à part) : deux lignes de fractions
  qui se suivent dans un même paragraphe se touchent.
*/
window.SUJETS = window.SUJETS || {};
window.SUJETS["premiere-sz-1"] = {
  entete: "Première spécialité · Sujet zéro n° 1 de l'épreuve anticipée (sujet officiel) · Durée : 2 heures, sans calculatrice",
  consignes: "**Sujet officiel** publié par Eduscol avant la première session de l'épreuve anticipée. Son énoncé n'est pas recopié ici : ouvre-le ou imprime-le, fais le sujet en $2$ heures sans calculatrice, puis compare ta copie avec ce corrigé, question par question.\n\nDans ce sujet, la partie 1 est un QCM. En juin 2027, elle sera faite de questions à réponses courtes, sans propositions : entraîne-toi à trouver chaque réponse avant de regarder les propositions. Le sujet ne précise pas le barème de la partie 2 : celui du corrigé est indicatif.",
  exercices: [
    {
      numero: "Partie 1", titre: "Automatismes (QCM)",
      duree: 25, points: 6, calculatrice: false,
      contexte: "Douze questions, une seule proposition exacte par question. Le corrigé donne la lettre de la bonne réponse et le calcul qui y mène.",
      questions: [
        { n: "1.", points: 0.5, texte: "L'inverse du double de $5$.", corrige: "Le double de $5$ est $10$, et l'inverse de $10$ est $\\dfrac{1}{10}$ : réponse **b**." },
        { n: "2.", points: 0.5, texte: "La valeur de $F = a + \\dfrac{b}{cd}$ pour les valeurs données de $a$, $b$, $c$ et $d$.", corrige: "$cd = 4 \\times \\left(-\\dfrac{1}{4}\\right) = -1$\n\n$\\dfrac{b}{cd} = \\dfrac{3}{-1} = -3$\n\n$F = \\dfrac{1}{2} - 3 = -\\dfrac{5}{2}$ : réponse **a**." },
        { n: "3.", points: 0.5, texte: "Un prix multiplié par $0{,}975$.", corrige: "$0{,}975 = 1 - 0{,}025$ : multiplier par $0{,}975$, c'est baisser de $2{,}5\\,\\%$. Réponse **a**." },
        { n: "4.", points: 0.5, texte: "Une hausse de $10\\,\\%$ puis une baisse de $10\\,\\%$ : comparer $P_1$ et $P$.", corrige: "$P_1 = P \\times 1{,}1 \\times 0{,}9 = 0{,}99\\,P$. Un prix est positif, donc $P_1 < P$ : le prix a baissé de $1\\,\\%$. Réponse **c**.\n\nUne hausse et une baisse de même taux ne se compensent pas." },
        { n: "5.", points: 0.5, texte: "La probabilité $x$ de la face numéro $4$.", corrige: "La somme des probabilités vaut $1$, donc :\n\n$x = 1 - 0{,}5 - 0{,}2 - \\dfrac{1}{6}$\n\n$x = 0{,}3 - \\dfrac{1}{6} = \\dfrac{9}{30} - \\dfrac{5}{30}$\n\n$x = \\dfrac{4}{30} = \\dfrac{2}{15}$ : réponse **a**." },
        { n: "6.", points: 0.5, texte: "Exprimer $u$ quand $\\dfrac{1}{x} + \\dfrac{1}{y} = \\dfrac{1}{u}$.", corrige: "On réduit au même dénominateur :\n\n$\\dfrac{1}{x} + \\dfrac{1}{y} = \\dfrac{x + y}{xy}$\n\nDonc $\\dfrac{1}{u} = \\dfrac{x + y}{xy}$ et, en prenant les inverses :\n\n$u = \\dfrac{xy}{x + y}$ : réponse **a**.\n\nIci $x + y$ n'est pas nul, car $\\dfrac{1}{u}$ ne l'est pas." },
        { n: "7.", points: 0.5, texte: "Résoudre $x^2 \\geqslant 10$ sur $\\mathbb{R}$.", corrige: "L'équation $x^2 = 10$ a deux solutions, $-\\sqrt{10}$ et $\\sqrt{10}$. La parabole est au-dessus de la droite d'équation $y = 10$ à l'extérieur de ces deux nombres : $x \\leqslant -\\sqrt{10}$ ou $x \\geqslant \\sqrt{10}$. Réponse **b**.\n\nLa proposition **c** oublie les nombres négatifs : par exemple, $-4$ est solution, car $(-4)^2 = 16$." },
        { n: "8.", points: 0.5, texte: "Une équation de la droite $\\mathcal{D}$ tracée.", corrige: "On lit que $\\mathcal{D}$ passe par les points $(0\\,;2)$ et $(3\\,;0)$. Son coefficient directeur est donc :\n\n$m = \\dfrac{0 - 2}{3 - 0} = -\\dfrac{2}{3}$\n\nUne équation de $\\mathcal{D}$ est $y = -\\dfrac{2}{3}x + 2$. En divisant par $2$ :\n\n$\\dfrac{y}{2} = -\\dfrac{x}{3} + 1$\n\nsoit $\\dfrac{x}{3} + \\dfrac{y}{2} - 1 = 0$ : réponse **d**.\n\nVérification avec les deux points lus : pour $(0\\,;2)$, on trouve $0 + 1 - 1 = 0$, et pour $(3\\,;0)$, $1 + 0 - 1 = 0$." },
        { n: "9.", points: 0.5, texte: "Parmi $f_1$, $f_2$ et $f_3$, les fonctions affines.", corrige: "$f_1(x) = x^2 - (1 - 2x + x^2) = 2x - 1$ : $f_1$ est affine.\n\n$f_2(x) = \\dfrac{1}{2}x - \\left(1 + \\dfrac{1}{\\sqrt{2}}\\right)$ est de la forme $mx + p$ : $f_2$ est affine.\n\n$f_3(x) = \\dfrac{5}{0{,}7} - \\dfrac{2}{3 \\times 0{,}7}x$\n\nsoit $f_3(x) = \\dfrac{50}{7} - \\dfrac{20}{21}x$ : $f_3$ est affine aussi.\n\nRéponse **b** : les trois fonctions sont affines. Un $\\sqrt{2}$ ou une division par $0{,}7$ ne changent rien : seule compte la forme $mx + p$, une fois l'expression développée." },
        { n: "10.", points: 0.5, texte: "La fonction représentée par la parabole $\\mathcal{P}$.", corrige: "La parabole est tournée vers le bas : le coefficient de $x^2$ est négatif, ce qui écarte **a**. Elle coupe l'axe des abscisses, alors que $-x^2 - 10$ est toujours négatif : **b** est écartée. Son sommet est sur l'axe des ordonnées, au-dessus de l'origine, alors que $-x^2 + 10x$ vaut $0$ en $0$ : **d** est écartée. Réponse **c** : $x \\mapsto -x^2 + 10$, de sommet $(0\\,;10)$." },
        {
          n: "11.", points: 0.5, texte: "Les points dont l'abscisse vérifie $x \\times f(x) > 0$.",
          corrige: "$x \\times f(x) > 0$ quand $x$ et $f(x)$ ont le même signe. On lit sur la figure le signe de l'abscisse et celui de l'ordonnée de chaque point :",
          tableauCorrige: { lignes: [["\\text{point}", "A", "B", "R", "S"], ["x", "-", "-", "+", "+"], ["f(x)", "-", "+", "+", "-"], ["x \\times f(x)", "+", "-", "+", "-"]] },
          corrigeFin: "Seules les abscisses $x_A$ et $x_R$ conviennent : réponse **b**."
        },
        { n: "12.", points: 0.5, texte: "Le coefficient $x$ de la note $16$ pour que la moyenne $m$ soit $15$.", corrige: "$m = \\dfrac{10 \\times 1 + 8 \\times 2 + 16x}{1 + 2 + x}$\n\nsoit $m = \\dfrac{26 + 16x}{3 + x}$.\n\nAlors $m = 15$ équivaut à $26 + 16x = 15(3 + x)$, soit $26 + 16x = 45 + 15x$, donc $x = 19$. Réponse **d**.\n\nVérification : pour $x = 19$, $26 + 16 \\times 19 = 330$, $3 + 19 = 22$ et $330 \\div 22 = 15$." }
      ]
    },
    {
      numero: "Partie 2 · exercice 1", titre: "Un carré, un projeté orthogonal et un cercle",
      duree: 45, points: 7, calculatrice: false,
      contexte: "Rappel des données : repère orthonormé, carré $OABC$ de côté $4$ avec $A(4\\,;0)$, $B(4\\,;4)$ et $C(0\\,;4)$ ; point $I(4\\,;3)$ ; $H$ projeté orthogonal de $C$ sur la droite $(OI)$ ; cercle $\\mathcal{E}$ de centre $D(2\\,;2)$ et de rayon $0{,}5$.",
      questions: [
        { n: "1.a", points: 0.5, texte: "Coordonnées des vecteurs $\\overrightarrow{OI}$ et $\\overrightarrow{OC}$.", indice: "Coordonnées d'un vecteur : celles de l'extrémité moins celles de l'origine, ici $O(0\\,;0)$.", corrige: "$\\overrightarrow{OI}\\begin{pmatrix} 4 \\\\ 3 \\end{pmatrix}$ et $\\overrightarrow{OC}\\begin{pmatrix} 0 \\\\ 4 \\end{pmatrix}$." },
        { n: "1.b", points: 0.5, texte: "Le produit scalaire $\\overrightarrow{OI} \\cdot \\overrightarrow{OC}$.", indice: "$\\vec{u} \\cdot \\vec{v} = xx' + yy'$ dans un repère orthonormé.", corrige: "$\\overrightarrow{OI} \\cdot \\overrightarrow{OC} = 4 \\times 0 + 3 \\times 4 = 12$." },
        { n: "2.a", points: 1, texte: "$\\overrightarrow{OI} \\cdot \\overrightarrow{OC}$ en fonction des longueurs $OH$ et $OI$.", indice: "Le produit scalaire ne change pas quand on remplace $\\overrightarrow{OC}$ par son projeté orthogonal $\\overrightarrow{OH}$ sur la droite $(OI)$.", corrige: "$H$ est le projeté orthogonal de $C$ sur $(OI)$, donc :\n\n$\\overrightarrow{OI} \\cdot \\overrightarrow{OC} = \\overrightarrow{OI} \\cdot \\overrightarrow{OH}$\n\nLes vecteurs $\\overrightarrow{OI}$ et $\\overrightarrow{OH}$ sont colinéaires, et de même sens puisque ce produit scalaire est positif ($12 > 0$). Donc :\n\n$\\overrightarrow{OI} \\cdot \\overrightarrow{OC} = OI \\times OH$." },
        { n: "2.b", points: 0.5, texte: "La longueur $OI$.", indice: "$OI = \\sqrt{x^2 + y^2}$ avec les coordonnées de $\\overrightarrow{OI}$.", corrige: "$OI = \\sqrt{4^2 + 3^2} = \\sqrt{25} = 5$." },
        { n: "2.c", points: 1, texte: "Montrer que $OH = 2{,}4$.", indice: "Égale les deux expressions du produit scalaire trouvées en 1.b et en 2.a.", corrige: "D'après 1.b et 2.a, $OI \\times OH = 12$, soit $5 \\times OH = 12$.\n\nDonc $OH = \\dfrac{12}{5} = 2{,}4$." },
        { n: "3.a", points: 1.5, texte: "Une équation cartésienne de la droite $(CH)$.", indice: "$(CH)$ est perpendiculaire à $(OI)$ : $\\overrightarrow{OI}$ est un vecteur normal de $(CH)$.", corrige: "$(CH)$ est la droite perpendiculaire à $(OI)$ qui passe par $C$ : $\\overrightarrow{OI}\\begin{pmatrix} 4 \\\\ 3 \\end{pmatrix}$ en est un vecteur normal. Un point $N(x\\,;y)$ est donc sur $(CH)$ si et seulement si :\n\n$\\overrightarrow{CN} \\cdot \\overrightarrow{OI} = 0$\n\nAvec $\\overrightarrow{CN}\\begin{pmatrix} x \\\\ y - 4 \\end{pmatrix}$, cela s'écrit $4x + 3(y - 4) = 0$.\n\nUne équation de $(CH)$ est donc $4x + 3y - 12 = 0$." },
        { n: "3.b", points: 1, texte: "Justifier l'équation du cercle $\\mathcal{E}$.", indice: "Un point $N(x\\,;y)$ est sur $\\mathcal{E}$ si et seulement si $DN^2 = 0{,}5^2$.", corrige: "$N(x\\,;y)$ est sur $\\mathcal{E}$ si et seulement si $DN = 0{,}5$, soit $DN^2 = 0{,}25$ :\n\n$(x - 2)^2 + (y - 2)^2 = 0{,}25$\n\nEn développant :\n\n$x^2 - 4x + 4 + y^2 - 4y + 4 = 0{,}25$\n\nc'est-à-dire :\n\n$x^2 + y^2 - 4x - 4y + 7{,}75 = 0$." },
        { n: "3.c", points: 1, texte: "Le point $M(1{,}5\\,;2)$ et l'intersection de $\\mathcal{E}$ et de $(CH)$.", indice: "$M$ est dans l'intersection s'il vérifie les deux équations.", corrige: "On remplace $x$ par $1{,}5$ et $y$ par $2$ dans les deux équations.\n\nCercle : $1{,}5^2 + 2^2 = 6{,}25$ et $4 \\times 1{,}5 + 4 \\times 2 = 14$, donc le premier membre vaut $6{,}25 - 14 + 7{,}75 = 0$ : $M \\in \\mathcal{E}$.\n\nDroite : $4 \\times 1{,}5 + 3 \\times 2 - 12 = 0$ : $M \\in (CH)$.\n\nLe point $M$ appartient bien à l'intersection du cercle $\\mathcal{E}$ et de la droite $(CH)$. On pouvait aussi voir que $M$ et $D$ ont la même ordonnée : $DM = 2 - 1{,}5 = 0{,}5$, le rayon du cercle." }
      ]
    },
    {
      numero: "Partie 2 · exercice 2", titre: "Une parabole, une suite et une fonction",
      duree: 50, points: 7, calculatrice: false,
      contexte: "Rappel des données : $g(x) = x^2 - 5x + 4$ pour tout réel $x$, de courbe $\\mathcal{P}$ ; $f(x) = x - 5 + \\dfrac{4}{x}$ sur $[0{,}5\\,;8]$, de courbe $\\mathcal{C}$.",
      questions: [
        {
          n: "1.a", points: 1, texte: "Le signe de $g$ sur $\\mathbb{R}$.",
          indice: "Cherche les racines du trinôme (discriminant, ou racine évidente $1$), puis utilise le signe de $a$.",
          corrige: "$\\Delta = (-5)^2 - 4 \\times 1 \\times 4 = 9$ : $\\Delta > 0$, donc $g$ a deux racines :\n\n$x_1 = \\dfrac{5 - 3}{2} = 1$ et $x_2 = \\dfrac{5 + 3}{2} = 4$\n\net $g(x) = (x - 1)(x - 4)$. Un trinôme est du signe de $a$ à l'extérieur de ses racines, et ici $a = 1 > 0$ :",
          tableauCorrige: { lignes: [["x", "-\\infty", "", "1", "", "4", "", "+\\infty"], ["g(x)", "", "+", "0", "-", "0", "+", ""]] },
          corrigeFin: "$g(x) > 0$ sur $]-\\infty\\,;1[$ et sur $]4\\,;+\\infty[$, $g(x) < 0$ sur $]1\\,;4[$, et $g(1) = g(4) = 0$."
        },
        { n: "1.b", points: 1, texte: "Montrer que le coefficient directeur $a_n$ de la droite $(A_nA_{n+1})$ vaut $2n - 4$.", indice: "$A_n(n\\,;g(n))$ et $A_{n+1}(n + 1\\,;g(n + 1))$ : le coefficient directeur est $\\dfrac{y_B - y_A}{x_B - x_A}$.", corrige: "$a_n = \\dfrac{g(n + 1) - g(n)}{(n + 1) - n}$, soit $a_n = g(n + 1) - g(n)$.\n\nOn développe $g(n + 1)$ :\n\n$g(n + 1) = (n + 1)^2 - 5(n + 1) + 4$\n${} = n^2 + 2n + 1 - 5n - 5 + 4$\n${} = n^2 - 3n$\n\nDonc :\n\n$a_n = n^2 - 3n - (n^2 - 5n + 4)$\n${} = 2n - 4$." },
        { n: "1.c", points: 0.5, texte: "La nature de la suite $(a_n)$.", indice: "Calcule $a_{n+1} - a_n$.", corrige: "Pour tout entier naturel $n$ :\n\n$a_{n+1} - a_n = 2(n + 1) - 4 - (2n - 4) = 2$\n\nLa suite $(a_n)$ est donc arithmétique de raison $2$, de premier terme $a_0 = -4$." },
        { n: "2.a", points: 0.5, texte: "Vérifier que $f(x) = \\dfrac{g(x)}{x}$ sur $[0{,}5\\,;8]$.", indice: "Divise chaque terme de $g(x)$ par $x$, qui n'est pas nul sur $[0{,}5\\,;8]$.", corrige: "Pour $x$ dans $[0{,}5\\,;8]$, $x$ n'est pas nul et on divise chaque terme par $x$ :\n\n$\\dfrac{g(x)}{x} = \\dfrac{x^2}{x} - \\dfrac{5x}{x} + \\dfrac{4}{x}$\n\n$\\dfrac{g(x)}{x} = x - 5 + \\dfrac{4}{x} = f(x)$." },
        { n: "2.b", points: 1, texte: "La position de $\\mathcal{C}$ par rapport à l'axe des abscisses.", indice: "Sur $[0{,}5\\,;8]$, $x > 0$ : $f(x)$ a le même signe que $g(x)$.", corrige: "Sur $[0{,}5\\,;8]$, $x > 0$, donc $f(x) = \\dfrac{g(x)}{x}$ a le signe de $g(x)$.\n\nD'après 1.a, $\\mathcal{C}$ est au-dessus de l'axe des abscisses sur $[0{,}5\\,;1[$ et sur $]4\\,;8]$, en dessous sur $]1\\,;4[$, et elle coupe l'axe aux points d'abscisses $1$ et $4$." },
        { n: "2.c", points: 1, texte: "Montrer que $f'(x) = \\dfrac{(x - 2)(x + 2)}{x^2}$.", indice: "La dérivée de $x \\mapsto \\dfrac{1}{x}$ est $x \\mapsto -\\dfrac{1}{x^2}$.", corrige: "$f'(x) = 1 + 4 \\times \\left(-\\dfrac{1}{x^2}\\right)$\n\n$f'(x) = 1 - \\dfrac{4}{x^2} = \\dfrac{x^2 - 4}{x^2}$\n\n$f'(x) = \\dfrac{(x - 2)(x + 2)}{x^2}$\n\ncar $x^2 - 4 = (x - 2)(x + 2)$ (identité remarquable)." },
        {
          n: "2.d", points: 1, texte: "Le tableau de variations de $f$ sur $[0{,}5\\,;8]$.",
          indice: "Sur $[0{,}5\\,;8]$, $x^2 > 0$ et $x + 2 > 0$ : $f'(x)$ a le signe de $x - 2$.",
          corrige: "Sur $[0{,}5\\,;8]$, $x^2 > 0$ et $x + 2 > 0$, donc $f'(x)$ a le signe de $x - 2$ : $f'(x) < 0$ sur $[0{,}5\\,;2[$, $f'(2) = 0$ et $f'(x) > 0$ sur $]2\\,;8]$. $f$ est décroissante sur $[0{,}5\\,;2]$ et croissante sur $[2\\,;8]$.\n\n$f(0{,}5) = 0{,}5 - 5 + 8 = 3{,}5$, $f(2) = 2 - 5 + 2 = -1$ et $f(8) = 8 - 5 + 0{,}5 = 3{,}5$.",
          tableauCorrige: { lignes: [["x", "0{,}5", "", "2", "", "8"], ["f'(x)", "", "-", "0", "+", ""], ["f(x)", "3{,}5", "\\searrow", "-1", "\\nearrow", "3{,}5"]] }
        },
        {
          n: "2.e", points: 1, texte: "L'allure de la courbe $\\mathcal{C}$, avec les résultats de 2.b et 2.d.",
          indice: "Place d'abord les points des bornes et du minimum, puis les deux points où la courbe coupe l'axe des abscisses.",
          corrige: "La courbe part du point $(0{,}5\\,;3{,}5)$, descend jusqu'à son point le plus bas $(2\\,;-1)$, puis remonte jusqu'à $(8\\,;3{,}5)$. Elle coupe l'axe des abscisses aux points d'abscisses $1$ et $4$ : elle est au-dessus de l'axe avant $1$ et après $4$, en dessous entre les deux.",
          figureCorrige: (o) => o.graph({
            xmin: -0.5, xmax: 8.5, ymin: -1.5, ymax: 4.5, h: 250,
            curves: [{ f: (x) => x - 5 + 4 / x, a: 0.5, b: 8, label: "C", lx: 7.2, dx: -6, dy: -10 }],
            points: [{ x: 0.5, y: 3.5 }, { x: 2, y: -1 }, { x: 8, y: 3.5 }, { x: 1, y: 0 }, { x: 4, y: 0 }],
            chemins: [[[2, 0], [2, -1]], [[0, -1], [2, -1]]],
            aria: "Allure de la courbe C de f sur [0,5 ; 8] : elle part de (0,5 ; 3,5), coupe l'axe des abscisses en 1, descend jusqu'au minimum (2 ; −1), remonte, recoupe l'axe en 4 et finit en (8 ; 3,5)"
          })
        }
      ]
    }
  ]
};
