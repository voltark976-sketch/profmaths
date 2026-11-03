/*
  SUJET OFFICIEL : 3e — Brevet 2026, mathématiques, série générale, Antilles et Guyane (26GENMATAG1)
  Page #sujet-troisieme-dnb-ag-2026 ; PDF du corrigé fabriqué par outils/sujets-pdf.js. Même format que
  data/premiere/sujets/metropole-2026.js : l'énoncé n'est pas recopié (champ officiel du catalogue), chaque question n'a
  qu'un court rappel, avec parfois un indice, et le corrigé rédigé par ProfMaths. Énoncé : PDF publié par le ministère
  (page « Brevet, Bac et CAP : les sujets des examens 2026 »). Le sujet donne les points des parties et des exercices
  (6 points d'automatismes, trois exercices de 4 points, 2 points de rédaction) : leur répartition entre les questions
  est indicative. Le graphique du corrigé de l'exercice 3 est redessiné par ProfMaths (o.graph).
*/
window.SUJETS = window.SUJETS || {};
window.SUJETS["troisieme-dnb-ag-2026"] = {
  entete: "3e · Brevet 2026, Antilles et Guyane (sujet officiel) · Durée : 2 heures",
  consignes: "**Sujet officiel** du brevet 2026 (série générale) des Antilles et de la Guyane, publié par le ministère. À Mayotte, on passe le sujet de la métropole, mais celui-ci suit le même programme et le même format : c'est un très bon entraînement. Son énoncé n'est pas recopié ici : ouvre-le ou imprime-le, fais la partie 1 en $20$ minutes sans calculatrice, puis la partie 2 en $1$ h $40$ avec calculatrice, et compare ta copie avec ce corrigé, question par question.\n\nDans la partie 2, la clarté et la précision de la rédaction comptent pour $2$ points.",
  exercices: [
    {
      numero: "Partie 1", titre: "Automatismes",
      duree: 20, points: 6, calculatrice: false,
      contexte: "Neuf questions sans justification, dont quatre à choix multiple (une seule proposition exacte).",
      questions: [
        { n: "1.", points: 0.5, texte: "Les coordonnées du point $A$ lues dans le repère.", corrige: "On lit l'abscisse sur l'axe horizontal, puis l'ordonnée sur l'axe vertical : $A(-2\\,;2)$." },
        { n: "2.", points: 0.5, texte: "Le symétrique du point $K$ par la symétrie de centre $O$, sur le quadrillage.", corrige: "Le symétrique de $K$ est le point $K'$ tel que $O$ soit le milieu de $[KK']$ : on reporte de l'autre côté de $O$ le déplacement de $K$ vers $O$. C'est le point $M$." },
        { n: "3.", points: 0.5, texte: "Le calcul qui donne l'aire du triangle $ABC$, de hauteur $[BD]$.", corrige: "Aire d'un triangle : base $\\times$ hauteur $\\div 2$. Avec la base $[AC]$ et la hauteur $[BD]$ qui lui correspond : $AC \\times BD \\div 2$. Réponse **B**." },
        { n: "4.", points: 0.5, texte: "La fréquence de « pile » sur $10$ lancers d'une pièce.", corrige: "« pile » apparaît $4$ fois sur $10$ : la fréquence est $\\dfrac{4}{10}$. Réponse **C**." },
        { n: "5.", points: 0.5, texte: "L'expression qui donne la moitié de l'entier $n$.", corrige: "La moitié de $n$ est $n \\div 2 = \\dfrac{n}{2}$. Réponse **D**." },
        { n: "6.", points: 0.5, texte: "La durée qui correspond à un dixième d'heure.", corrige: "$60 \\div 10 = 6$ : un dixième d'heure dure $6$ minutes. Réponse **C**." },
        { n: "7.", points: 1, texte: "La moyenne de la série $10$ ; $10$ ; $12$ ; $16$.", corrige: "$\\dfrac{10 + 10 + 12 + 16}{4} = \\dfrac{48}{4} = 12$." },
        { n: "8.", points: 1, texte: "L'angle $x$ d'un triangle isocèle dont l'angle au sommet principal mesure $120^\\circ$.", corrige: "Les deux angles à la base d'un triangle isocèle sont égaux, et la somme des trois angles vaut $180^\\circ$ : $2x = 180 - 120 = 60$, donc $x = 30^\\circ$." },
        { n: "9.", points: 1, texte: "La durée d'un trajet de $15$ km à vélo, à $20$ km/h de moyenne.", corrige: "Durée $=$ distance $\\div$ vitesse $= 15 \\div 20 = 0{,}75$ h, soit $45$ minutes." }
      ]
    },
    {
      numero: "Partie 2 · exercice 1", titre: "Pythagore, trigonométrie, Thalès et homothétie",
      duree: 35, points: 4, calculatrice: true,
      contexte: "Rappel des données : les droites $(BE)$ et $(TM)$ se coupent en $A$, le triangle $ABM$ est rectangle en $A$, $AT = 2{,}2$ m, $MT = 7{,}7$ m, $AE = 1{,}92$ m et $MB = 7{,}3$ m.",
      questions: [
        { n: "1.", points: 0.5, texte: "Justifier que $AM = 5{,}5$ m.", corrige: "Le point $A$ est sur le segment $[TM]$, donc $AM = MT - AT = 7{,}7 - 2{,}2 = 5{,}5$ m." },
        { n: "2.", points: 1, texte: "Montrer que $AB = 4{,}8$ m.", indice: "Dans le triangle $ABM$, l'hypoténuse est $[MB]$.", corrige: "Dans le triangle $ABM$ rectangle en $A$, d'après le théorème de Pythagore : $MB^2 = AB^2 + AM^2$.\n\n$AB^2 = 7{,}3^2 - 5{,}5^2 = 53{,}29 - 30{,}25 = 23{,}04$\n\ndonc $AB = \\sqrt{23{,}04} = 4{,}8$ m." },
        { n: "3.", points: 1, texte: "La mesure de l'angle $\\widehat{ABM}$, arrondie au degré.", corrige: "Dans le triangle $ABM$ rectangle en $A$, $[AM]$ est le côté opposé à l'angle $\\widehat{ABM}$ et $[AB]$ son côté adjacent :\n\n$\\tan \\widehat{ABM} = \\dfrac{AM}{AB} = \\dfrac{5{,}5}{4{,}8}$\n\ndonc $\\widehat{ABM} \\approx 49^\\circ$ (on peut aussi utiliser $\\cos \\widehat{ABM} = \\dfrac{4{,}8}{7{,}3}$)." },
        { n: "4.", points: 1, texte: "Montrer que les droites $(TE)$ et $(BM)$ sont parallèles.", indice: "Les points $T$, $A$, $M$ et $E$, $A$, $B$ sont alignés : c'est une configuration « papillon ».", corrige: "Les droites $(TM)$ et $(EB)$ se coupent en $A$.\n\n$\\dfrac{AT}{AM} = \\dfrac{2{,}2}{5{,}5} = 0{,}4$\n\n$\\dfrac{AE}{AB} = \\dfrac{1{,}92}{4{,}8} = 0{,}4$\n\nLes rapports sont égaux, et les points $T$, $A$, $M$ et $E$, $A$, $B$ sont dans le même ordre : d'après la réciproque du théorème de Thalès, $(TE) \\parallel (BM)$." },
        { n: "5.", points: 0.5, texte: "Le rapport de l'homothétie de centre $A$ qui transforme le triangle $AET$ en $ABM$, parmi $2{,}5$ ; $-0{,}4$ et $-2{,}5$ (sans justification).", corrige: "$E$ a pour image $B$ : $AB = 4{,}8 = 2{,}5 \\times 1{,}92 = 2{,}5 \\times AE$, et $B$ est de l'autre côté de $A$ par rapport à $E$, donc le rapport est négatif. C'est $-2{,}5$ (proposition 3)." }
      ]
    },
    {
      numero: "Partie 2 · exercice 2", titre: "Deux programmes de calcul",
      duree: 30, points: 4, calculatrice: true,
      contexte: "Rappel : le programme A soustrait $2$ au nombre choisi, multiplie par $5$, puis ajoute le triple du nombre de départ. Le programme B, écrit avec Scratch, multiplie le nombre par $4$, retire $5$, puis multiplie par $2$.",
      questions: [
        { n: "1.", points: 0.5, texte: "Vérifier qu'avec $1$, le programme A donne $-2$.", corrige: "$1 - 2 = -1$, puis $-1 \\times 5 = -5$, puis $-5 + 3 \\times 1 = -2$." },
        { n: "2.a.", points: 1, texte: "Montrer qu'avec $x$, le programme A donne $8x - 10$.", corrige: "$5(x - 2) + 3x = 5x - 10 + 3x = 8x - 10$." },
        { n: "2.b.", points: 0.5, texte: "Le nombre de départ pour lequel le programme A donne $0$.", corrige: "$8x - 10 = 0$ donne $8x = 10$, donc $x = \\dfrac{10}{8} = 1{,}25$." },
        { n: "3.a.", points: 1, texte: "Le résultat du programme B pour le nombre $1$.", corrige: "$4 \\times 1 = 4$, puis $4 - 5 = -1$, puis $2 \\times (-1) = -2$ : le lutin dit $-2$." },
        { n: "3.b.", points: 1, texte: "Montrer que les programmes A et B donnent toujours le même résultat.", corrige: "Avec $x$, le programme B donne $2(4x - 5) = 8x - 10$ : c'est le même résultat que le programme A, quel que soit le nombre de départ." }
      ]
    },
    {
      numero: "Partie 2 · exercice 3", titre: "Les tarifs du centre de loisirs",
      duree: 35, points: 4, calculatrice: true,
      contexte: "Rappel : tarif A, $5{,}50$ € par demi-journée ; tarif B, $15$ € d'abonnement puis $3{,}50$ € par demi-journée ; tarif C, forfait annuel de $64$ €. On note $x$ le nombre de demi-journées.",
      questions: [
        { n: "1.", points: 0.5, texte: "Le prix de $12$ demi-journées au tarif B.", corrige: "$15 + 3{,}5 \\times 12 = 15 + 42 = 57$ €." },
        { n: "2.", points: 0.5, texte: "Associer les fonctions $f : x \\mapsto 15 + 3{,}5x$, $g : x \\mapsto 64$ et $h : x \\mapsto 5{,}5x$ aux tarifs.", corrige: "$f$ correspond au tarif B, $g$ au tarif C et $h$ au tarif A." },
        { n: "3.", points: 0.5, texte: "Associer les droites $(d_1)$, $(d_2)$ et $(d_3)$ du graphique aux fonctions.", corrige: "$(d_2)$ est horizontale : c'est $g$. $(d_3)$ passe par l'origine : c'est $h$. $(d_1)$ coupe l'axe des ordonnées en $15$ : c'est $f$." },
        { n: "4.", points: 0.5, texte: "La droite $(d_1)$ représente-t-elle une situation de proportionnalité ?", corrige: "Non : une situation de proportionnalité est représentée par une droite qui passe par l'origine, et $(d_1)$ n'y passe pas (pour $0$ demi-journée, on paie déjà $15$ €)." },
        {
          n: "5.", points: 1, texte: "Le nombre de demi-journées à partir duquel le tarif B devient plus avantageux que le tarif A, lu sur le graphique.",
          corrige: "Les droites $(d_1)$ et $(d_3)$ se coupent pour $x = 7{,}5$ ; ensuite, $(d_1)$ passe sous $(d_3)$. Le tarif B est donc plus avantageux à partir de $8$ demi-journées. Vérification : pour $8$ demi-journées, le tarif B coûte $43$ € et le tarif A $44$ €.",
          figureCorrige: (o) => o.graph({
            xmin: -0.5, xmax: 11.5, ymin: -4, ymax: 76, ystep: 10, h: 280,
            curves: [
              { f: (x) => 15 + 3.5 * x, a: 0, b: 11, label: "d₁", lx: 2.2, dx: -6, dy: -8 },
              { f: () => 64, a: 0, b: 11, label: "d₂", lx: 1.5, dx: 0, dy: -6 },
              { f: (x) => 5.5 * x, a: 0, b: 11, label: "d₃", lx: 3.5, dx: 8, dy: 10 }
            ],
            points: [{ x: 7.5, y: 41.25, label: "x = 7,5", gauche: true }],
            aria: "Les droites d₁ (tarif B), d₂ (tarif C, horizontale à 64) et d₃ (tarif A, issue de l'origine) ; d₁ et d₃ se coupent pour x = 7,5"
          })
        },
        { n: "6.a.", points: 0.5, texte: "La formule saisie dans la cellule B2 du tableur, puis étirée vers la droite.", corrige: "$\\texttt{=15+3,5*B1}$ : la formule utilise le nombre de demi-journées écrit juste au-dessus, dans la cellule $\\texttt{B1}$ ; en l'étirant vers la droite, $\\texttt{B1}$ devient $\\texttt{C1}$, $\\texttt{D1}$…" },
        { n: "6.b.", points: 0.5, texte: "Le nombre de demi-journées à partir duquel le tarif C devient plus avantageux que le tarif B, d'après le tableau.", corrige: "Le tarif B coûte $64$ € pour $14$ demi-journées, autant que le forfait, puis $67{,}50$ € pour $15$ : le tarif C devient plus avantageux à partir de $15$ demi-journées." }
      ]
    }
  ]
};
