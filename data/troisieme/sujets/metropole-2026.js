/*
  SUJET OFFICIEL : 3e — Brevet du 30 juin 2026, mathématiques, série générale, métropole, La Réunion et Mayotte
  Page #sujet-troisieme-dnb-metropole-2026 ; PDF du corrigé fabriqué par outils/sujets-pdf.js. Même format que
  data/troisieme/sujets/antilles-guyane-2026.js : l'énoncé n'est pas recopié (champ officiel du catalogue), chaque
  question n'a qu'un court rappel, avec parfois un indice, et le corrigé rédigé par ProfMaths. Ce sujet ne figure pas
  sur la page « Brevet, Bac et CAP : les sujets des examens 2026 » du ministère (lue le 3 novembre 2026) : l'énoncé
  renvoie à la version recomposée par l'APMEP. Le sujet donne les points des parties et des exercices (6 points
  d'automatismes ; exercices de 3, 4, 3 et 2 points ; 2 points de rédaction) : leur répartition entre les questions est
  indicative. Le graphique du corrigé de l'exercice 3 est redessiné par ProfMaths (o.graph).
*/
window.SUJETS = window.SUJETS || {};
window.SUJETS["troisieme-dnb-metropole-2026"] = {
  entete: "3e · Brevet du 30 juin 2026, métropole (sujet officiel) · Durée : 2 heures",
  consignes: "**Sujet officiel** passé le 30 juin 2026 en métropole, à La Réunion et à Mayotte : c'est le sujet des élèves de Mayotte. Son énoncé n'est pas recopié ici : ouvre-le ou imprime-le, fais la partie 1 en $20$ minutes sans calculatrice, puis la partie 2 en $1$ h $40$ avec calculatrice, et compare ta copie avec ce corrigé, question par question.\n\nL'énoncé s'ouvre dans la version recomposée par l'APMEP (association des professeurs de mathématiques), car ce sujet ne figure pas sur la page des sujets 2026 du ministère. Dans la partie 2, la clarté et la précision de la rédaction comptent pour $2$ points.",
  exercices: [
    {
      numero: "Partie 1", titre: "Automatismes",
      duree: 20, points: 6, calculatrice: false,
      contexte: "Neuf questions sans justification ; pour les questions à choix multiple, une seule proposition est exacte, et une réponse fausse n'enlève pas de point.",
      questions: [
        { n: "1.", points: 0.5, texte: "Écrire $0{,}75$ sous la forme d'une fraction.", corrige: "$0{,}75 = \\dfrac{75}{100} = \\dfrac{3}{4}$." },
        { n: "2.", points: 0.5, texte: "La somme $-4{,}7 + 3{,}5$.", corrige: "Les deux nombres sont de signes contraires : on soustrait les distances à zéro, $4{,}7 - 3{,}5 = 1{,}2$, et on garde le signe du plus éloigné de zéro : $-1{,}2$." },
        { n: "3.", points: 0.5, texte: "La valeur de $a$ dans un tableau de proportionnalité où $6$ correspond à $12$ et $18$ à $a$.", corrige: "On passe de la première ligne à la seconde en multipliant par $2$ : $a = 18 \\times 2 = 36$." },
        { n: "4.", points: 0.5, texte: "La probabilité de tirer une boule bleue dans un sac de $10$ rouges, $4$ bleues et $6$ vertes.", corrige: "Il y a $20$ boules, dont $4$ bleues : $\\dfrac{4}{20}$. Réponse **B**." },
        { n: "5.", points: 0.5, texte: "La solution de l'équation $10x + 16 = -64$.", corrige: "$10x = -64 - 16 = -80$, donc $x = -8$. Réponse **C**." },
        { n: "6.", points: 0.5, texte: "La notation scientifique de $0{,}004\\,58$.", corrige: "$0{,}004\\,58 = 4{,}58 \\times 10^{-3}$ : le premier facteur est compris entre $1$ et $10$. Réponse **C**." },
        { n: "7.", points: 1, texte: "Le nombre d'élèves, sur $24$, qui ont choisi la réponse B (diagramme circulaire).", corrige: "Le secteur de la réponse B est un angle droit, soit un quart du disque : $24 \\div 4 = 6$ élèves." },
        { n: "8.", points: 1, texte: "Le périmètre d'un rectangle de $10$ mm sur $5$ mm.", corrige: "$2 \\times (10 + 5) = 30$ mm. Un périmètre est une longueur, il s'exprime en mm et non en mm². Réponse **A**." },
        { n: "9.", points: 1, texte: "Le cosinus de l'angle $\\widehat{EDF}$ dans le triangle $DEF$ rectangle en $E$ ($DE = 6$ cm, $EF = 8$ cm, $DF = 10$ cm).", corrige: "Pour l'angle $\\widehat{EDF}$, le côté adjacent est $[DE]$ et l'hypoténuse $[DF]$ : $\\cos \\widehat{EDF} = \\dfrac{6}{10} = \\dfrac{3}{5}$. Réponse **B**." }
      ]
    },
    {
      numero: "Partie 2 · exercice 1", titre: "Les médailles des Jeux paralympiques",
      duree: 25, points: 3, calculatrice: true,
      contexte: "Rappel : le tableau donne, pour $9$ pays, le nombre de médailles d'or, d'argent et de bronze obtenues aux Jeux paralympiques de Paris 2024, et leur total.",
      questions: [
        { n: "1.", points: 0.5, texte: "Le nombre de médailles d'or des Pays-Bas.", corrige: "On lit dans le tableau : $27$ médailles d'or." },
        { n: "2.", points: 0.5, texte: "Le nombre de médailles d'or de l'Australie.", corrige: "$63 - 17 - 28 = 18$ médailles d'or." },
        { n: "3.", points: 0.5, texte: "Montrer que plus de $20\\,\\%$ des médailles de la Grande-Bretagne sont en bronze.", corrige: "$\\dfrac{31}{124} = 0{,}25 = 25\\,\\%$, et $25\\,\\% > 20\\,\\%$ : l'affirmation est vraie." },
        { n: "4.a.", points: 0.5, texte: "La médiane de la série des totaux des $9$ pays, en détaillant la démarche.", indice: "Range les $9$ totaux dans l'ordre croissant.", corrige: "Totaux rangés : $56$ ; $63$ ; $71$ ; $75$ ; $82$ ; $89$ ; $105$ ; $124$ ; $220$.\n\nAvec $9$ valeurs, la médiane est la $5$e : $82$ médailles." },
        { n: "4.b.", points: 0.5, texte: "Interpréter ce résultat.", corrige: "Parmi ces $9$ pays, la moitié au moins a obtenu $82$ médailles ou moins, et la moitié au moins $82$ médailles ou plus." },
        { n: "5.", points: 0.5, texte: "Le pourcentage d'augmentation des médailles d'argent du Brésil, passées de $20$ à $26$.", corrige: "$\\dfrac{26 - 20}{20} = \\dfrac{6}{20} = 0{,}3$ : une augmentation de $30\\,\\%$." }
      ]
    },
    {
      numero: "Partie 2 · exercice 2", titre: "Le papillon et les triangles semblables",
      duree: 30, points: 4, calculatrice: true,
      contexte: "Rappel des données : les droites $(BD)$ et $(CE)$ se coupent en $A$, $(BC) \\parallel (DE)$, $AB = 6{,}4$ cm, $AC = 4{,}8$ cm, $AD = 4{,}8$ cm et $BC = 8$ cm.",
      questions: [
        { n: "1.", points: 1, texte: "Montrer que le triangle $ABC$ est rectangle en $A$.", corrige: "Le plus long côté est $[BC]$ : $BC^2 = 8^2 = 64$, et $AB^2 + AC^2 = 6{,}4^2 + 4{,}8^2 = 40{,}96 + 23{,}04 = 64$.\n\nComme $BC^2 = AB^2 + AC^2$, le triangle $ABC$ est rectangle en $A$, d'après la réciproque du théorème de Pythagore." },
        { n: "2.", points: 1, texte: "Montrer que $DE = 6$ cm et $AE = 3{,}6$ cm.", indice: "C'est une configuration « papillon » de Thalès.", corrige: "Les droites $(BD)$ et $(CE)$ se coupent en $A$ et $(BC) \\parallel (DE)$. D'après le théorème de Thalès :\n\n$\\dfrac{AD}{AB} = \\dfrac{AE}{AC} = \\dfrac{DE}{BC}$\n\nOr $\\dfrac{AD}{AB} = \\dfrac{4{,}8}{6{,}4} = 0{,}75$. Donc $DE = 0{,}75 \\times 8 = 6$ cm et $AE = 0{,}75 \\times 4{,}8 = 3{,}6$ cm." },
        { n: "3.", points: 0.5, texte: "Montrer que les angles $\\widehat{ABC}$ et $\\widehat{ADE}$ sont égaux, en détaillant la démarche.", corrige: "Les droites $(BC)$ et $(DE)$ sont parallèles et coupées par la sécante $(BD)$ : les angles $\\widehat{ABC}$ et $\\widehat{ADE}$ sont alternes-internes, donc égaux.\n\nAutre méthode, dans les triangles rectangles en $A$ :\n\n$\\tan \\widehat{ABC} = \\dfrac{AC}{AB} = \\dfrac{4{,}8}{6{,}4} = 0{,}75$\n\n$\\tan \\widehat{ADE} = \\dfrac{AE}{AD} = \\dfrac{3{,}6}{4{,}8} = 0{,}75$" },
        { n: "4.", points: 0.5, texte: "Montrer que les triangles $ABC$ et $ADE$ sont semblables.", corrige: "Les angles $\\widehat{BAC}$ et $\\widehat{DAE}$ sont opposés par le sommet, donc égaux (ils mesurent $90^\\circ$), et $\\widehat{ABC} = \\widehat{ADE}$. Les deux triangles ont deux angles égaux deux à deux : ils sont semblables." },
        { n: "5.", points: 1, texte: "L'aire du quadrilatère $BCDE$.", indice: "Les diagonales $[BD]$ et $[CE]$ sont perpendiculaires en $A$ : découpe le quadrilatère en quatre triangles rectangles.", corrige: "Le quadrilatère est formé de quatre triangles rectangles en $A$ :\n\n- $ABC$ : $\\dfrac{6{,}4 \\times 4{,}8}{2} = 15{,}36$ cm² ;\n- $ACD$ : $\\dfrac{4{,}8 \\times 4{,}8}{2} = 11{,}52$ cm² ;\n- $ADE$ : $\\dfrac{4{,}8 \\times 3{,}6}{2} = 8{,}64$ cm² ;\n- $AEB$ : $\\dfrac{6{,}4 \\times 3{,}6}{2} = 11{,}52$ cm².\n\nAire de $BCDE$ : $15{,}36 + 11{,}52 + 8{,}64 + 11{,}52 = 47{,}04$ cm². On peut aussi calculer $\\dfrac{BD \\times CE}{2} = \\dfrac{11{,}2 \\times 8{,}4}{2}$." }
      ]
    },
    {
      numero: "Partie 2 · exercice 3", titre: "Le volume d'une boule",
      duree: 25, points: 3, calculatrice: true,
      contexte: "Rappel : la partie A s'appuie sur la courbe du volume d'une boule, en cm³, en fonction de son rayon, en cm ; la partie B concerne des boules de plastique de $2{,}5$ cm de rayon, faites avec une imprimante 3D. Les deux parties sont indépendantes.",
      questions: [
        { partie: "Partie A" },
        {
          n: "1.", points: 0.5, texte: "L'image de $3{,}6$ par cette fonction, lue sur le graphique.",
          corrige: "On part de $3{,}6$ sur l'axe des abscisses et on lit l'ordonnée du point de la courbe : environ $195$ cm³ (une lecture entre $190$ et $200$ convient ; le calcul donne $195{,}4$).",
          figureCorrige: (o) => o.graph({
            xmin: -0.3, xmax: 8.3, ymin: -30, ymax: 830, ystep: 100, h: 280,
            curves: [{ f: (r) => (4 / 3) * Math.PI * r * r * r, a: 0, b: 5.8, closed: false }],
            hlines: [{ y: 195.4 }, { y: 660 }],
            points: [{ x: 3.6, y: 195.4, label: "(3,6 ; 195)", gauche: true }, { x: 5.4, y: 660, label: "(5,4 ; 660)", gauche: true }],
            aria: "Courbe du volume d'une boule en fonction de son rayon ; elle passe environ par (3,6 ; 195) et (5,4 ; 660)"
          })
        },
        { n: "2.", points: 0.5, texte: "Le rayon d'une boule de $660$ cm³, lu sur le graphique.", corrige: "On part de $660$ sur l'axe des ordonnées jusqu'à la courbe, puis on lit l'abscisse : le rayon vaut environ $5{,}4$ cm." },
        { partie: "Partie B" },
        { n: "1.", points: 0.5, texte: "Montrer que le volume d'une boule de rayon $2{,}5$ cm, arrondi à l'unité, est $65$ cm³.", corrige: "$V = \\dfrac{4}{3} \\times \\pi \\times 2{,}5^3 \\approx 65{,}45$, soit $65$ cm³ arrondi à l'unité." },
        { n: "2.", points: 1, texte: "Le nombre maximal de boules que l'on peut fabriquer avec une bobine de $1\\,000$ cm³ de plastique.", corrige: "$1\\,000 \\div 65{,}45 \\approx 15{,}3$ : on peut fabriquer au maximum $15$ boules (la seizième ne serait pas complète)." },
        { n: "3.", points: 0.5, texte: "La masse d'une boule, sachant que la masse volumique du plastique est $0{,}9$ g/cm³.", corrige: "Masse $=$ volume $\\times$ masse volumique : $65 \\times 0{,}9 = 58{,}5$ g (environ $58{,}9$ g avec la valeur non arrondie du volume)." }
      ]
    },
    {
      numero: "Partie 2 · exercice 4", titre: "Les sachets de bonbons",
      duree: 20, points: 2, calculatrice: true,
      contexte: "Rappel : on répartit $112$ bonbons à la fraise et $140$ au caramel en sachets identiques, en les utilisant tous.",
      questions: [
        { n: "1.", points: 0.5, texte: "Peut-on constituer $16$ sachets ?", corrige: "$112 \\div 16 = 7$, mais $140 \\div 16 = 8{,}75$ n'est pas un nombre entier : on ne peut pas faire $16$ sachets identiques." },
        { n: "2.", points: 0.5, texte: "La décomposition de $140$ en produit de facteurs premiers.", corrige: "$140 = 2 \\times 70 = 2 \\times 2 \\times 35 = 2^2 \\times 5 \\times 7$." },
        { n: "3.", points: 1, texte: "Le nombre maximal de sachets, et la composition de chacun.", indice: "Le nombre de sachets doit diviser $112$ et $140$.", corrige: "$112 = 2^4 \\times 7$ et $140 = 2^2 \\times 5 \\times 7$ : le plus grand diviseur commun est $2^2 \\times 7 = 28$. On peut faire au maximum $28$ sachets, chacun avec $112 \\div 28 = 4$ bonbons à la fraise et $140 \\div 28 = 5$ au caramel." }
      ]
    }
  ]
};
