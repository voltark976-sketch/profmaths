/*
  SUJET : 3e — Sujet type brevet n° 1 (format du brevet depuis la session 2026)
  Page #sujet-troisieme-brevet-1 ; PDF de l'énoncé et du corrigé fabriqués par outils/sujets-pdf.js.
  Format : voir data/seconde/sujets/devoir-commun-1.js. Deux heures : partie 1 d'automatismes (6 points, 20 minutes,
  sans calculatrice, réponses courtes et questions à choix multiple), partie 2 de trois exercices de 4 points avec
  calculatrice, et 2 points pour la clarté et la précision de la rédaction. Sujet original, données fictives.
  Figures dessinées par o.figGeo (assets/exercices-base.js).
*/
window.SUJETS = window.SUJETS || {};
window.SUJETS["troisieme-brevet-1"] = {
  entete: "3e · Sujet type brevet n° 1 · Durée : 2 heures",
  consignes: "**Partie 1** (automatismes, $6$ points, $20$ minutes) : la calculatrice est **interdite**. Écris seulement les réponses, sans justification.\n\n**Partie 2** (raisonnement et résolution de problèmes, $14$ points, $1$ h $40$) : la calculatrice est autorisée. Toutes les réponses doivent être justifiées, sauf indication contraire. La clarté et la précision des raisonnements et de la rédaction comptent pour $2$ points ; une recherche, même non aboutie, est prise en compte.",
  exercices: [
    {
      numero: "Partie 1", titre: "Automatismes",
      duree: 20, points: 6, calculatrice: false,
      contexte: "Pour chaque question, écris seulement la réponse. Pour les questions à choix multiple, une seule proposition est exacte. Les résultats en fraction sont à donner sous forme irréductible.",
      questions: [
        { n: "1.", points: 0.5, texte: "Calcule $\\dfrac{3}{4} - \\dfrac{1}{6}$. Donne le résultat sous forme de fraction irréductible.", corrige: "$\\dfrac{9}{12} - \\dfrac{2}{12} = \\dfrac{7}{12}$." },
        { n: "2.", points: 0.5, texte: "$3 \\times 10^4 + 2 \\times 10^2$ est égal à :\n\n- **A.** $32\\,000$\n- **B.** $30\\,200$\n- **C.** $3\\,200$\n- **D.** $5 \\times 10^6$", corrige: "$30\\,000 + 200 = 30\\,200$. Réponse **B**." },
        { n: "3.", points: 0.5, texte: "Donne l'écriture scientifique de $0{,}000\\,45$.", corrige: "$4{,}5 \\times 10^{-4}$." },
        { n: "4.", points: 0.5, texte: "Un sac coûte $60$ €. Son prix baisse de $15\\,\\%$. Quel est son nouveau prix ?", corrige: "$60 \\times 0{,}85 = 51$ €." },
        { n: "5.", points: 0.5, texte: "La forme développée de $(x - 4)^2$ est :\n\n- **A.** $x^2 - 16$\n- **B.** $x^2 - 8x + 16$\n- **C.** $x^2 + 16$\n- **D.** $x^2 - 4x + 16$", corrige: "$(x - 4)^2 = x^2 - 2 \\times 4 \\times x + 4^2 = x^2 - 8x + 16$. Réponse **B**." },
        { n: "6.", points: 0.5, texte: "Résous l'équation $3x - 7 = 11$.", corrige: "$3x = 18$, donc $x = 6$." },
        { n: "7.", points: 0.5, texte: "Donne tous les diviseurs de $28$.", corrige: "$1$ ; $2$ ; $4$ ; $7$ ; $14$ et $28$." },
        { n: "8.", points: 0.5, texte: "On lance un dé équilibré à six faces. Quelle est la probabilité d'obtenir un multiple de $3$ ? Donne-la sous forme de fraction irréductible.", corrige: "Deux faces sur six conviennent ($3$ et $6$) : $\\dfrac{2}{6} = \\dfrac{1}{3}$." },
        { n: "9.", points: 0.5, texte: "Voici une série de notes : $4$ ; $7$ ; $7$ ; $9$ ; $13$. Donne sa médiane et son étendue.", corrige: "Médiane : $7$ (la troisième des cinq valeurs rangées). Étendue : $13 - 4 = 9$." },
        { n: "10.", points: 0.5, texte: "Dans un triangle rectangle, les côtés de l'angle droit mesurent $8$ cm et $15$ cm. L'hypoténuse mesure :\n\n- **A.** $23$ cm\n- **B.** $17$ cm\n- **C.** $7$ cm\n- **D.** $289$ cm", corrige: "$8^2 + 15^2 = 64 + 225 = 289 = 17^2$. Réponse **B**." },
        { n: "11.", points: 0.5, texte: "Convertis $1{,}25$ h en heures et minutes.", corrige: "$0{,}25$ h $= \\dfrac{60}{4} = 15$ min : $1{,}25$ h $= 1$ h $15$ min." },
        { n: "12.", points: 0.5, texte: "On donne $f(x) = 4 - x^2$. Calcule $f(-3)$.", corrige: "$f(-3) = 4 - (-3)^2 = 4 - 9 = -5$." }
      ]
    },
    {
      numero: "Partie 2 · exercice 1", titre: "La tyrolienne",
      duree: 35, points: 4, calculatrice: true,
      contexte: "Dans un parc de loisirs, une tyrolienne est un câble tendu entre une plateforme $D$, située à $9$ m au-dessus du point $H$ du sol, et un point d'ancrage $A$ sur le sol horizontal, avec $HA = 40$ m. Un poteau vertical $[PQ]$ soutient le câble : $P$ est sur le câble $[DA]$ et $Q$ est sur le sol, à $10$ m de $A$. La figure n'est pas à l'échelle.",
      figure: (o) => o.figGeo({
        W: 320, H: 196,
        pts: { D: [40, 30], H: [40, 170], A: [290, 170], Q: [227.5, 170], P: [227.5, 135] },
        segs: [["D", "H"], ["H", "A"], ["D", "A"], ["P", "Q"]],
        droitAngle: [["D", "H", "A"], ["P", "Q", "A"]],
        cotes: [["D", "H", "9 m", "A"], ["Q", "A", "10 m", "P"]],
        decal: { D: [-6, 4], H: [-6, 14], A: [6, 12], Q: [0, 16], P: [0, -8] },
        aria: "Triangle DHA rectangle en H : la plateforme D est à 9 m au-dessus de H, le câble [DA] descend jusqu'au point A du sol, à 40 m de H ; le poteau [PQ] est vertical, Q à 10 m de A"
      }),
      questions: [
        { n: "1.", points: 1, texte: "Calcule la longueur $DA$ du câble.", corrige: "Dans le triangle $DHA$ rectangle en $H$, d'après le théorème de Pythagore :\n\n$DA^2 = DH^2 + HA^2 = 81 + 1\\,600 = 1\\,681$\n\ndonc $DA = \\sqrt{1\\,681} = 41$ m." },
        { n: "2.", points: 1.5, texte: "Pour des raisons de sécurité, le câble doit faire avec le sol un angle inférieur à $15^\\circ$. Cette tyrolienne respecte-t-elle cette règle ?", indice: "Pour l'angle $\\widehat{DAH}$, $[DH]$ est le côté opposé et $[HA]$ le côté adjacent.", corrige: "Dans le triangle $DHA$ rectangle en $H$ :\n\n$\\tan \\widehat{DAH} = \\dfrac{DH}{HA} = \\dfrac{9}{40} = 0{,}225$\n\ndonc $\\widehat{DAH} \\approx 12{,}7^\\circ$. Comme $12{,}7^\\circ < 15^\\circ$, la règle est respectée." },
        { n: "3.", points: 1.5, texte: "Calcule la hauteur $PQ$ du poteau.", indice: "Les droites $(PQ)$ et $(DH)$ sont toutes deux perpendiculaires au sol.", corrige: "$(PQ)$ et $(DH)$ sont perpendiculaires à la même droite $(HA)$, donc parallèles. Les points $A$, $Q$, $H$ et $A$, $P$, $D$ sont alignés : d'après le théorème de Thalès :\n\n$\\dfrac{AQ}{AH} = \\dfrac{PQ}{DH}$\n\n$\\dfrac{10}{40} = \\dfrac{PQ}{9}$\n\ndonc $PQ = \\dfrac{9 \\times 10}{40} = 2{,}25$ m." }
      ]
    },
    {
      numero: "Partie 2 · exercice 2", titre: "Le jardin partagé",
      duree: 35, points: 4, calculatrice: true,
      contexte: "Un jardin partagé a la forme d'un rectangle de largeur $x$ mètres et de longueur $x + 6$ mètres, avec $x > 0$.",
      questions: [
        { n: "1.", points: 0.5, texte: "Calcule l'aire du jardin lorsque $x = 5$.", corrige: "Le jardin mesure $5$ m sur $11$ m : son aire est $5 \\times 11 = 55$ m²." },
        { n: "2.", points: 1, texte: "Montre que l'aire du jardin, en m², est $A(x) = x^2 + 6x$.", corrige: "Aire $=$ largeur $\\times$ longueur $= x(x + 6) = x^2 + 6x$." },
        { n: "3.", points: 1, texte: "Développe et réduis $(x - 4)(x + 10)$.", corrige: "$(x - 4)(x + 10) = x^2 + 10x - 4x - 40$\n\n${} = x^2 + 6x - 40$" },
        { n: "4.", points: 1, texte: "Déduis-en la largeur du jardin pour que son aire soit égale à $40$ m².", indice: "$A(x) = 40$ équivaut à $x^2 + 6x - 40 = 0$ : utilise la question 3.", corrige: "$A(x) = 40$ équivaut à $x^2 + 6x - 40 = 0$, c'est-à-dire, d'après la question 3, à $(x - 4)(x + 10) = 0$.\n\nUn produit est nul si l'un de ses facteurs est nul : $x = 4$ ou $x = -10$. Comme $x > 0$, la largeur vaut $4$ m (et la longueur $10$ m)." },
        { n: "5.", points: 0.5, texte: "*(Question d'algorithmique)* Que dit le lutin à la fin de ce script ? Que représente ce nombre pour le jardin ?\n\n```scratch\nquand le drapeau est cliqué\nmettre [x] à 0\nmettre [a] à 0\nrépéter jusqu'à (a > 100)\n  ajouter 1 à [x]\n  mettre [a] à (x * (x + 6))\nfin\ndire (x)\n```", corrige: "Pour $x = 1$, $2$, …, $8$, la variable $a$ prend les valeurs $7$ ; $16$ ; $27$ ; $40$ ; $55$ ; $72$ ; $91$ et $112$. La boucle s'arrête dès que $a > 100$ : le lutin dit $8$.\n\nC'est la plus petite largeur entière, en mètres, pour laquelle l'aire du jardin dépasse $100$ m²." }
      ]
    },
    {
      numero: "Partie 2 · exercice 3", titre: "Les tortues de la plage",
      duree: 30, points: 4, calculatrice: true,
      contexte: "Sur une plage de Mayotte, une association a compté les traces de ponte de tortues vertes pendant $10$ nuits (données fictives) :\n\n$3$ ; $5$ ; $2$ ; $6$ ; $4$ ; $8$ ; $5$ ; $3$ ; $7$ ; $7$.",
      questions: [
        { n: "1.", points: 1, texte: "Calcule le nombre moyen de traces par nuit.", corrige: "Total : $3 + 5 + 2 + 6 + 4$ ${} + 8 + 5 + 3 + 7 + 7 = 50$ traces.\n\nMoyenne : $\\dfrac{50}{10} = 5$ traces par nuit." },
        { n: "2.", points: 1, texte: "Détermine la médiane et l'étendue de cette série.", indice: "Range d'abord les valeurs dans l'ordre croissant.", corrige: "Valeurs rangées : $2$ ; $3$ ; $3$ ; $4$ ; $5$ ; $5$ ; $6$ ; $7$ ; $7$ ; $8$.\n\nAvec $10$ valeurs, la médiane est la moyenne des $5$e et $6$e : $\\dfrac{5 + 5}{2} = 5$. Étendue : $8 - 2 = 6$." },
        { n: "3.", points: 1, texte: "On choisit au hasard une de ces $10$ nuits. Quelle est la probabilité qu'on ait compté au moins $6$ traces cette nuit-là ? Donne-la sous forme de fraction irréductible.", corrige: "Quatre nuits conviennent ($6$, $8$, $7$ et $7$ traces) : la probabilité est $\\dfrac{4}{10} = \\dfrac{2}{5}$." },
        { n: "4.", points: 1, texte: "Pendant les $10$ nuits suivantes, on a compté en moyenne $6{,}5$ traces par nuit. Quelle est la moyenne sur les $20$ nuits ?", indice: "Calcule d'abord le nombre total de traces des $20$ nuits.", corrige: "Total : $50 + 10 \\times 6{,}5 = 50 + 65 = 115$ traces, donc la moyenne vaut $\\dfrac{115}{20} = 5{,}75$ traces par nuit.\n\nLes deux périodes comptent le même nombre de nuits : c'est aussi la moyenne de $5$ et $6{,}5$. Avec des périodes de longueurs différentes, il faudrait passer par le total." }
      ]
    }
  ]
};
