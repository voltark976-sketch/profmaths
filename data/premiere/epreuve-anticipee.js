/*
  CHAPITRE : Première spécialité — Préparation à l'épreuve anticipée
  -------------------------------------------------------------------
  Chapitre 17 de la progression spiralée 2026-2027 (programme de Première 2026), 2 semaines en fin d'année.
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Format de l'épreuve (site du ministère) : 2 h sans calculatrice, partie 1 automatismes (6 points), partie 2 deux ou trois
  exercices indépendants (14 points). La maîtrise de la langue (2 points sur 20) vient du tableau 3 de la progression.
  Liens : sujets zéro officiels de spécialité (Eduscol) et liste officielle des automatismes.
  Figures : "ea-temps", "ea-raisonnements", "ea-poissons", "ea-tabvar-paniers", "ea-expo", "ea-barge", "ea-bouees".
  Générateurs : ea- (dont des séries qui mélangent les générateurs des chapitres 1 à 15) et am-flash-tout (automatismes de Seconde).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-epreuve-anticipee"] = {
  niveau: "Première spécialité",
  numero: 17,
  titre: "Préparation à l'épreuve anticipée",
  accroche: "Deux heures sans calculatrice : automatismes en réponses courtes, exercices de synthèse rédigés, types de raisonnement, et cinq sujets types recontextualisés à Mayotte.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Sujet zéro n° 1 de l'épreuve, spécialité maths (Eduscol)", url: "https://eduscol.education.fr/document/65500/download" },
    { titre: "Sujet zéro n° 2 de l'épreuve, spécialité maths (Eduscol)", url: "https://eduscol.education.fr/document/65502/download" },
    { titre: "Liste officielle des automatismes évaluables (ministère)", url: "https://www.education.gouv.fr/sites/default/files/2025-06/annexe-automatismes-valuables-lors-de-l-preuve-anticip-e-de-math-matiques-pour-l-ann-e-scolaire-2025-2026-au-titre-de-la-session-2027-des-baccalaur-ats-g-n-ral-et-technologique-440631.pdf" }
  ],
  liens: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "L'épreuve anticipée en bref",
      figure: "ea-temps",
      texte:
        "En juin, tous les élèves de Première passent l'**épreuve anticipée de mathématiques**. En spécialité, elle porte sur le programme de Première de spécialité, avec les automatismes de Seconde.\n\n" +
        "- **Durée** : $2$ heures, **sans calculatrice** (interdite pendant toute l'épreuve).\n" +
        "- **Note** : sur $20$, coefficient $2$. Elle apparaît dans ton dossier Parcoursup.\n" +
        "- **Partie 1 ($6$ points)** : automatismes, des calculs et des questions à choix multiples, à réponse courte.\n" +
        "- **Partie 2 ($14$ points)** : deux ou trois exercices indépendants, à rédiger.\n\n" +
        "La rédaction compte : la maîtrise de la langue vaut $2$ points sur $20$. Justifie, conclus par une phrase, soigne l'orthographe.\n\n" +
        "Les deux sujets zéro officiels sont en lien en haut de la page : fais-les en conditions réelles, en $2$ heures et sans calculatrice.",
      exemple: {
        enonce: "Après la partie 1, il te reste $1$ h $35$ pour trois exercices. Comment t'organiser ?",
        solution: "Lis les trois énoncés ($5$ minutes), commence par celui que tu maîtrises le mieux, compte environ $25$ minutes par exercice et garde $10$ minutes pour relire.\n\nSi une question te bloque, admets son résultat et passe à la suivante : les questions d'après rapportent encore des points."
      }
    },
    {
      titre: "Partie 1 : les automatismes",
      video: { titre: "Vidéo de ton prof : un automatisme expliqué pas à pas (comparer deux nombres)", youtube: "https://youtu.be/qt6CzZFcV3s" },
      texte:
        "Les automatismes évalués couvrent six domaines (liste officielle en lien en haut de la page) :\n\n" +
        "- calcul numérique et algébrique : fractions, puissances, développer, factoriser, équations ;\n" +
        "- proportions et pourcentages ;\n" +
        "- évolutions et variations : taux, coefficient multiplicateur, évolutions successives et réciproques ;\n" +
        "- fonctions et représentations : image, signe, tableau de variations, équation de droite ;\n" +
        "- statistiques : moyenne, médiane, quartiles, boîtes à moustaches ;\n" +
        "- probabilités : tableau, arbre, $P(A \\cap B)$ et $P_A(B)$.\n\n" +
        "S'y ajoutent les réflexes de Première : dérivées usuelles, discriminant, termes de suites, cosinus et sinus remarquables, produit scalaire en coordonnées, règles de calcul sur l'exponentielle.\n\n" +
        "Trois réflexes sans calculatrice :\n\n" +
        "- **l'ordre de grandeur** : estime le résultat avant de calculer ;\n" +
        "- **la cohérence** : une probabilité est entre $0$ et $1$, une longueur est positive ;\n" +
        "- **la bonne écriture** : passe de $0{,}25$ à $\\dfrac{1}{4}$ ou à $25\\,\\%$ selon ce qui simplifie le calcul.\n\n" +
        "Le niveau « Automatismes » du site reprend chaque domaine avec ses fiches flash.",
      exemple: {
        enonce: "Sans calculatrice : $0{,}3 \\times 0{,}2$ ; une hausse de $10\\,\\%$ suivie d'une baisse de $10\\,\\%$ ; $f'(2)$ pour $f(x) = x^3$.",
        solution: "$0{,}3 \\times 0{,}2 = 0{,}06$.\n\nCoefficient global : $1{,}1 \\times 0{,}9 = 0{,}99$, soit une **baisse** de $1\\,\\%$ (et non une évolution nulle).\n\n$f'(x) = 3x^2$, donc $f'(2) = 12$."
      }
    },
    {
      titre: "Partie 2 : rédiger une solution",
      texte:
        "Chaque réponse suit le même plan :\n\n" +
        "- **annoncer** ce que tu utilises : une propriété, une formule, la question précédente ;\n" +
        "- **calculer** en écrivant les étapes utiles ;\n" +
        "- **conclure** par une phrase qui répond à la question, avec les mots de l'énoncé et les unités.\n\n" +
        "Les verbes de l'énoncé disent ce qui est attendu :\n\n" +
        "- « **montrer que** », « **justifier** » : le résultat est donné, il faut prouver qu'il est vrai ;\n" +
        "- « **en déduire** » : utilise le résultat de la question précédente ;\n" +
        "- « **déterminer** », « **calculer** » : trouve le résultat et justifie-le ;\n" +
        "- « **conjecturer** » : propose un résultat à partir d'observations, sans preuve.\n\n" +
        "Pour la langue : des phrases complètes, « donc » pour une conséquence, « car » pour une cause, et le symbole $\\iff$ seulement entre deux affirmations équivalentes. Si tu bloques, écris « on admet que… » et continue.",
      exemple: {
        enonce: "Rédige : montrer que la fonction $f$ définie par $f(x) = x^3 + x$ est strictement croissante sur $\\mathbb{R}$.",
        solution: "$f$ est dérivable sur $\\mathbb{R}$ et $f'(x) = 3x^2 + 1$.\n\nPour tout réel $x$, $x^2 \\geqslant 0$, donc $3x^2 + 1 \\geqslant 1 > 0$.\n\nLa dérivée est strictement positive sur $\\mathbb{R}$, donc $f$ est strictement croissante sur $\\mathbb{R}$."
      }
    },
    {
      titre: "Bilan des types de raisonnement",
      figure: "ea-raisonnements",
      texte:
        "- **Raisonnement direct** : on enchaîne propriétés et calculs ($f'(x) = 3x^2 + 1 > 0$, donc $f$ est croissante).\n" +
        "- **Contre-exemple** : pour montrer qu'une phrase « pour tout… » est fausse, un seul cas suffit. « Pour tout $x$, $x^2 \\geqslant x$ » est faux car $\\left(\\dfrac{1}{2}\\right)^2 = \\dfrac{1}{4} < \\dfrac{1}{2}$.\n" +
        "- **Contraposée** : « si P, alors Q » équivaut à « si non Q, alors non P ».\n" +
        "- **Par l'absurde** : on suppose le contraire et on aboutit à une contradiction (l'exponentielle ne s'annule jamais, $\\sqrt{2}$ n'est pas une fraction).\n" +
        "- **Disjonction des cas** : on traite tous les cas séparément ($n$ pair ou impair, $x \\geqslant 0$ ou $x < 0$).\n\n" +
        "Vocabulaire à maîtriser :\n\n" +
        "- « $A$ est **suffisante** pour $B$ » : $A \\Rightarrow B$ ; « $A$ est **nécessaire** pour $B$ » : $B \\Rightarrow A$ ; les deux à la fois : $A \\iff B$ ;\n" +
        "- la **réciproque** de « si P, alors Q » est « si Q, alors P » : elle peut être fausse ;\n" +
        "- la **négation** de « pour tout $x$, … » est « il existe $x$ tel que … soit faux ».",
      exemple: {
        enonce: "Écris la négation de « pour tout réel $x$, $f(x) > 0$ ».",
        solution: "« Il existe un réel $x$ tel que $f(x) \\leqslant 0$. »\n\n« Pour tout » devient « il existe », et l'inégalité stricte $>$ devient $\\leqslant$."
      }
    },
    {
      titre: "Sujet type 1 : la ferme aquacole du lagon (suites)",
      figure: "ea-poissons",
      texte:
        "Un grand classique : une suite définie par récurrence, une suite auxiliaire géométrique, puis un seuil en Python.\n\n" +
        "Points clés : prouver $v_{n+1} = qv_n$ **pour tout** $n$, revenir de $v_n$ à $u_n$, et conclure dans le contexte. Sur la figure, les termes croissent et se rapprochent de $1\\,200$.",
      exemple: {
        enonce:
          "Une ferme aquacole du lagon compte $400$ poissons au mois $0$. Chaque mois, elle vend la moitié de ses poissons, puis ajoute $600$ alevins. On a $u_0 = 400$ et $u_{n+1} = 0{,}5u_n + 600$.\n\n" +
          "1) Calcule $u_1$ et $u_2$.\n" +
          "2) On pose $v_n = u_n - 1\\,200$. Montre que $(v_n)$ est géométrique.\n" +
          "3) Exprime $v_n$, puis $u_n$, en fonction de $n$.\n" +
          "4) Étudie le sens de variation de $(u_n)$.\n" +
          "5) Que renvoie la fonction ci-dessous ? Interprète.\n\n" +
          "```python\ndef seuil():\n    n = 0\n    u = 400\n    while u <= 1150:\n        u = 0.5 * u + 600\n        n = n + 1\n    return n\n```",
        solution:
          "1) $u_1 = 0{,}5 \\times 400 + 600 = 800$ et $u_2 = 0{,}5 \\times 800 + 600 = 1\\,000$.\n\n" +
          "2) Pour tout $n$, $v_{n+1} = u_{n+1} - 1\\,200 = 0{,}5u_n - 600 = 0{,}5(u_n - 1\\,200) = 0{,}5v_n$. Donc $(v_n)$ est géométrique de raison $0{,}5$ et de premier terme $v_0 = 400 - 1\\,200 = -800$.\n\n" +
          "3) $v_n = -800 \\times 0{,}5^n$, donc $u_n = v_n + 1\\,200 = 1\\,200 - 800 \\times 0{,}5^n$.\n\n" +
          "4) $u_{n+1} - u_n = 800 \\times 0{,}5^n - 800 \\times 0{,}5^{n+1} = 400 \\times 0{,}5^n > 0$ : la suite $(u_n)$ est croissante, le nombre de poissons augmente chaque mois.\n\n" +
          "5) $u_4 = 1\\,200 - \\dfrac{800}{16} = 1\\,150$ (pas strictement plus) et $u_5 = 1\\,200 - 25 = 1\\,175$. La fonction renvoie $5$ : c'est au mois $5$ que la ferme dépasse $1\\,150$ poissons."
      }
    },
    {
      titre: "Sujet type 2 : les paniers tressés de Chiconi (second degré, dérivation)",
      figure: "ea-tabvar-paniers",
      texte:
        "Un exercice qui mêle forme factorisée, signe d'un trinôme, dérivée et tangente. Le tableau de variations de la figure est celui qu'on attend à la question 3.\n\n" +
        "Points clés : relier le signe du trinôme à sa forme factorisée, justifier le maximum par le **changement de signe** de la dérivée, et donner la réponse avec les unités (paniers, euros).",
      exemple: {
        enonce:
          "Un artisan de Chiconi tresse des paniers. Pour $x$ paniers vendus par semaine ($0 \\leqslant x \\leqslant 40$), son bénéfice en euros est $B(x) = -2x^2 + 80x - 600$.\n\n" +
          "1) Vérifie que $B(x) = -2(x - 10)(x - 30)$.\n" +
          "2) Pour combien de paniers l'artisan fait-il un bénéfice positif ?\n" +
          "3) Calcule $B'(x)$ et dresse le tableau de variations de $B$.\n" +
          "4) Quel est le bénéfice maximal ?\n" +
          "5) Donne une équation de la tangente à la courbe de $B$ au point d'abscisse $15$.",
        solution:
          "1) $-2(x - 10)(x - 30) = -2(x^2 - 40x + 300) = -2x^2 + 80x - 600 = B(x)$.\n\n" +
          "2) $B$ a pour racines $10$ et $30$ et $a = -2 < 0$ : $B(x) > 0$ entre les racines, pour $x \\in ]10\\,;30[$. L'artisan gagne de l'argent s'il vend entre $11$ et $29$ paniers.\n\n" +
          "3) $B'(x) = -4x + 80$, positif pour $x < 20$, nul en $20$, négatif pour $x > 20$ : $B$ est croissante sur $[0\\,;20]$ et décroissante sur $[20\\,;40]$.\n\n" +
          "4) $B'$ change de signe en $20$ : le maximum est $B(20) = -800 + 1\\,600 - 600 = 200$. Le bénéfice maximal est de $200$ € pour $20$ paniers.\n\n" +
          "5) $B(15) = -450 + 1\\,200 - 600 = 150$ et $B'(15) = 20$. La tangente a pour équation $y = 20(x - 15) + 150$, soit $y = 20x - 150$."
      }
    },
    {
      titre: "Sujet type 3 : une fonction avec l'exponentielle",
      figure: "ea-expo",
      texte:
        "Étude complète d'une fonction : dérivée d'un produit, signe, variations, extremum, tangente et équation. La figure montre la courbe $\\mathcal{C}_f$ de $f(x) = (x - 1)e^x$ et sa tangente $T$ au point d'abscisse $1$.\n\n" +
        "Points clés : $e^x > 0$ pour tout $x$, donc le signe de $f'(x)$ se lit sur le facteur restant ; et $e^x$ ne s'annule jamais.",
      exemple: {
        enonce:
          "$f$ est définie sur $\\mathbb{R}$ par $f(x) = (x - 1)e^x$.\n\n" +
          "1) Montre que $f'(x) = xe^x$.\n" +
          "2) Étudie le signe de $f'(x)$, puis les variations de $f$.\n" +
          "3) Quel est le minimum de $f$ ?\n" +
          "4) Donne une équation de la tangente $T$ au point d'abscisse $1$.\n" +
          "5) Résous $f(x) = 0$.",
        solution:
          "1) $f = uv$ avec $u(x) = x - 1$ et $v(x) = e^x$ : $f'(x) = 1 \\times e^x + (x - 1)e^x = xe^x$.\n\n" +
          "2) $e^x > 0$, donc $f'(x)$ a le signe de $x$ : négatif sur $]-\\infty\\,;0[$, positif sur $]0\\,;+\\infty[$. $f$ est décroissante sur $]-\\infty\\,;0]$ et croissante sur $[0\\,;+\\infty[$.\n\n" +
          "3) $f'$ change de signe en $0$ : le minimum de $f$ est $f(0) = (0 - 1)e^0 = -1$.\n\n" +
          "4) $f(1) = 0$ et $f'(1) = e$, donc $T : y = e(x - 1)$.\n\n" +
          "5) $e^x \\neq 0$, donc $f(x) = 0 \\iff x - 1 = 0 \\iff x = 1$. L'ensemble des solutions est $\\{1\\}$."
      }
    },
    {
      titre: "Sujet type 4 : la barge de Petite-Terre (probabilités)",
      figure: "ea-barge",
      texte:
        "Arbre pondéré, probabilités totales, probabilité « inversée » et indépendance : le cœur du chapitre 4, avec un passage à deux jours.\n\n" +
        "Points clés : nommer les événements, citer la **formule des probabilités totales**, et passer par l'événement contraire pour « au moins une fois ».",
      exemple: {
        enonce:
          "Inaya habite en Petite-Terre et prend la barge pour aller au lycée. La barge est en retard dans $20\\,\\%$ des cas. Si la barge est en retard, Inaya arrive en retard au lycée avec la probabilité $0{,}7$ ; sinon, avec la probabilité $0{,}1$. On note $B$ « la barge est en retard » et $R$ « Inaya arrive en retard ».\n\n" +
          "1) Calcule $P(B \\cap R)$, puis montre que $P(R) = 0{,}22$.\n" +
          "2) Inaya est arrivée en retard. Quelle est la probabilité que la barge ait été en retard ?\n" +
          "3) $B$ et $R$ sont-ils indépendants ?\n" +
          "4) Les jours sont supposés indépendants. Quelle est la probabilité qu'Inaya arrive en retard au moins une fois sur deux jours ?",
        solution:
          "1) $P(B \\cap R) = 0{,}2 \\times 0{,}7 = 0{,}14$. D'après la formule des probabilités totales, $P(R) = P(B \\cap R) + P(\\overline{B} \\cap R) = 0{,}14 + 0{,}8 \\times 0{,}1 = 0{,}22$.\n\n" +
          "2) $P_R(B) = \\dfrac{P(B \\cap R)}{P(R)} = \\dfrac{0{,}14}{0{,}22} = \\dfrac{7}{11}$. Sachant qu'Inaya est en retard, la probabilité que la barge ait été en retard est $\\dfrac{7}{11}$, environ $0{,}64$.\n\n" +
          "3) $P(B) \\times P(R) = 0{,}2 \\times 0{,}22 = 0{,}044 \\neq 0{,}14 = P(B \\cap R)$ : $B$ et $R$ ne sont pas indépendants. Le retard de la barge influe sur celui d'Inaya.\n\n" +
          "4) L'événement contraire est « à l'heure les deux jours », de probabilité $0{,}78^2 = 0{,}6084$. La probabilité d'au moins un retard est $1 - 0{,}6084 = 0{,}3916$."
      }
    },
    {
      titre: "Sujet type 5 : la zone de baignade du lagon (produit scalaire, repère)",
      figure: "ea-bouees",
      texte:
        "Produit scalaire en coordonnées, triangle rectangle, cercle et équation de cercle : la géométrie des chapitres 11, 14 et 15 réunie.\n\n" +
        "Points clés : un produit scalaire nul prouve l'orthogonalité ; si $\\overrightarrow{MA} \\cdot \\overrightarrow{MC} = 0$, alors $M$ est sur le cercle de diamètre $[AC]$.",
      exemple: {
        enonce:
          "Dans un repère orthonormé (unité : $100$ m), trois bouées sont placées en $A(-2\\,;1)$, $B(2\\,;3)$ et $C(3\\,;1)$.\n\n" +
          "1) Calcule $\\overrightarrow{BA} \\cdot \\overrightarrow{BC}$. Que peut-on en déduire ?\n" +
          "2) Calcule les longueurs $BA$ et $BC$, puis l'aire du triangle $ABC$.\n" +
          "3) Justifie que $A$, $B$ et $C$ sont sur le cercle de diamètre $[AC]$, puis donne une équation de ce cercle.\n" +
          "4) Une quatrième bouée $D(0{,}5\\,;3{,}5)$ est-elle sur ce cercle ?",
        solution:
          "1) $\\overrightarrow{BA}(-4\\,;-2)$ et $\\overrightarrow{BC}(1\\,;-2)$, donc $\\overrightarrow{BA} \\cdot \\overrightarrow{BC} = -4 \\times 1 + (-2) \\times (-2) = 0$. Les vecteurs sont orthogonaux : le triangle $ABC$ est rectangle en $B$.\n\n" +
          "2) $BA = \\sqrt{16 + 4} = 2\\sqrt{5}$ et $BC = \\sqrt{1 + 4} = \\sqrt{5}$. Aire : $\\dfrac{BA \\times BC}{2} = \\dfrac{2\\sqrt{5} \\times \\sqrt{5}}{2} = 5$ unités d'aire, soit $50\\,000$ m² (une unité d'aire vaut $100 \\times 100$ m²).\n\n" +
          "3) $\\overrightarrow{BA} \\cdot \\overrightarrow{BC} = 0$, donc $B$ est sur le cercle de diamètre $[AC]$ (comme $A$ et $C$). Son centre est le milieu $\\Omega(0{,}5\\,;1)$ de $[AC]$ et son rayon $\\dfrac{AC}{2} = \\dfrac{5}{2}$. Équation : $(x - 0{,}5)^2 + (y - 1)^2 = 6{,}25$.\n\n" +
          "4) $(0{,}5 - 0{,}5)^2 + (3{,}5 - 1)^2 = 0 + 6{,}25 = 6{,}25$ : oui, la bouée $D$ est sur le cercle."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "am-flash-tout", titre: "Automatismes de Seconde, tous les thèmes", etape: "Partie 1 : automatismes", nb: 10 },
    { type: "ea-flash-1re", titre: "Automatismes de Première", etape: "Partie 1 : automatismes", nb: 10 },
    { type: "ea-partie1", titre: "Partie 1 blanche : 12 questions sans calculatrice", etape: "Partie 1 : automatismes", nb: 12 },
    { type: "ea-suites", titre: "Suites", etape: "Partie 2 : exercices par thème", nb: 5 },
    { type: "ea-second-degre", titre: "Second degré", etape: "Partie 2 : exercices par thème", nb: 5 },
    { type: "ea-derivation", titre: "Dérivation et variations", etape: "Partie 2 : exercices par thème", nb: 5 },
    { type: "ea-exponentielle", titre: "Fonction exponentielle", etape: "Partie 2 : exercices par thème", nb: 4 },
    { type: "ea-probabilites", titre: "Probabilités et variables aléatoires", etape: "Partie 2 : exercices par thème", nb: 5 },
    { type: "ea-geometrie", titre: "Trigonométrie, produit scalaire, repère", etape: "Partie 2 : exercices par thème", nb: 5 },
    { type: "ea-redaction", titre: "Choisir la bonne rédaction", etape: "Rédiger et raisonner", nb: 5 },
    { type: "ea-raisonnement", titre: "Reconnaître un raisonnement", etape: "Rédiger et raisonner", nb: 5 },
    { type: "ea-cncs", titre: "Condition nécessaire, condition suffisante", etape: "Rédiger et raisonner", nb: 5 },
    { type: "ea-vrai-faux", titre: "Vrai ou faux ?", etape: "Rédiger et raisonner", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "L'épreuve anticipée de mathématiques dure :", choix: ["$2$ heures", "$1$ heure", "$3$ heures", "$4$ heures"], bonne: 0, explication: "Deux heures pour les deux parties." },
    { question: "Pendant l'épreuve, la calculatrice est :", choix: ["interdite", "autorisée en partie 2", "autorisée partout", "autorisée en partie 1"], bonne: 0, explication: "Elle est interdite pendant toute l'épreuve." },
    { question: "$\\dfrac{3}{4} - \\dfrac{1}{6} =$", choix: ["$\\dfrac{7}{12}$", "$\\dfrac{1}{2}$", "$\\dfrac{2}{10}$", "$\\dfrac{5}{12}$"], bonne: 0, explication: "$\\dfrac{9}{12} - \\dfrac{2}{12} = \\dfrac{7}{12}$." },
    { question: "Une hausse de $20\\,\\%$ suivie d'une baisse de $20\\,\\%$ correspond à :", choix: ["une baisse de $4\\,\\%$", "aucune évolution", "une hausse de $4\\,\\%$", "une baisse de $40\\,\\%$"], bonne: 0, explication: "$1{,}2 \\times 0{,}8 = 0{,}96$." },
    { question: "$2^{10} \\times 2^{-3} =$", choix: ["$2^{7}$", "$2^{-30}$", "$4^{7}$", "$2^{13}$"], bonne: 0, explication: "On additionne les exposants : $10 + (-3) = 7$." },
    { question: "La solution de $3x - 7 = 8$ est :", choix: ["$5$", "$\\dfrac{1}{3}$", "$15$", "$-5$"], bonne: 0, explication: "$3x = 15$, donc $x = 5$." },
    { question: "La moyenne de la série $2$ ; $4$ ; $9$ est :", choix: ["$5$", "$4$", "$15$", "$4{,}5$"], bonne: 0, explication: "$\\dfrac{2 + 4 + 9}{3} = \\dfrac{15}{3} = 5$." },
    { question: "Si $f(x) = x^3 - 2x$, alors $f'(1) =$", choix: ["$1$", "$-1$", "$3$", "$0$"], bonne: 0, explication: "$f'(x) = 3x^2 - 2$, donc $f'(1) = 1$." },
    { question: "Le discriminant de $x^2 - 4x + 4$ vaut :", choix: ["$0$", "$32$", "$8$", "$-16$"], bonne: 0, explication: "$16 - 16 = 0$ : une seule racine, $2$." },
    { question: "$(u_n)$ est arithmétique, $u_0 = 5$, de raison $-2$. $u_{10} =$", choix: ["$-15$", "$-25$", "$-13$", "$15$"], bonne: 0, explication: "$5 + 10 \\times (-2) = -15$." },
    { question: "$\\dfrac{e^{5}}{e^{2}} =$", choix: ["$e^{3}$", "$e^{2{,}5}$", "$e^{7}$", "$3$"], bonne: 0, explication: "On soustrait les exposants." },
    { question: "$\\cos\\left(\\dfrac{\\pi}{3}\\right) =$", choix: ["$\\dfrac{1}{2}$", "$\\dfrac{\\sqrt{3}}{2}$", "$\\dfrac{\\sqrt{2}}{2}$", "$1$"], bonne: 0, explication: "Valeur remarquable à connaître." },
    { question: "$\\vec{u}(2\\,;-1)$ et $\\vec{v}(3\\,;6)$. $\\vec{u} \\cdot \\vec{v} =$", choix: ["$0$", "$12$", "$-6$", "$15$"], bonne: 0, explication: "$2 \\times 3 + (-1) \\times 6 = 0$ : les vecteurs sont orthogonaux." },
    { question: "$P(A) = 0{,}5$ et $P_A(B) = 0{,}4$. $P(A \\cap B) =$", choix: ["$0{,}2$", "$0{,}9$", "$0{,}8$", "$0{,}1$"], bonne: 0, explication: "$0{,}5 \\times 0{,}4 = 0{,}2$." },
    { question: "Pour montrer qu'une affirmation « pour tout $x$… » est fausse, il suffit :", choix: ["d'un contre-exemple", "de trois exemples où elle est vraie", "d'une figure", "de recopier l'énoncé"], bonne: 0, explication: "Un seul cas où elle est fausse suffit." },
    { question: "La contraposée de « si P, alors Q » est :", choix: ["si non Q, alors non P", "si Q, alors P", "si non P, alors non Q", "P et non Q"], bonne: 0, explication: "« Si Q, alors P » est la réciproque, qui peut être fausse." },
    { question: "La négation de « pour tout réel $x$, $x^2 > 0$ » est :", choix: ["il existe un réel $x$ tel que $x^2 \\leqslant 0$", "pour tout réel $x$, $x^2 \\leqslant 0$", "il existe un réel $x$ tel que $x^2 > 0$", "pour tout réel $x$, $x^2 < 0$"], bonne: 0, explication: "Ici la négation est vraie : $x = 0$ convient." },
    { question: "Dans une question « En déduire… », on doit :", choix: ["utiliser le résultat de la question précédente", "tout recommencer depuis le début", "donner une conjecture sans preuve", "faire une figure"], bonne: 0, explication: "« En déduire » renvoie à ce qui vient d'être établi." },
    { question: "Le prix d'un article passe de $40$ € à $50$ €. Le taux d'évolution est :", choix: ["$+25\\,\\%$", "$+10\\,\\%$", "$+20\\,\\%$", "$+50\\,\\%$"], bonne: 0, explication: "$\\dfrac{50 - 40}{40} = \\dfrac{10}{40} = 0{,}25 = 25\\,\\%$. On divise par la valeur de départ : $\\dfrac{10}{50} = 20\\,\\%$ est faux." },
    { question: "Après une baisse de $20\\,\\%$, un prix vaut $64$ €. Le prix initial était :", choix: ["$80$ €", "$76{,}80$ €", "$51{,}20$ €", "$84$ €"], bonne: 0, explication: "Le coefficient de la baisse est $0{,}8$ : prix initial $\\times 0{,}8 = 64$, donc prix initial $= \\dfrac{64}{0{,}8} = 80$ €. Une hausse de $20\\,\\%$ ne compense pas une baisse de $20\\,\\%$." },
    { question: "L'équation $2x^2 - 3x + 5 = 0$ :", choix: ["n'a aucune solution réelle, car $\\Delta = -31$", "a deux solutions, car $\\Delta = 49$", "a une seule solution, car $\\Delta = 0$", "a deux solutions, car $\\Delta = 31$"], bonne: 0, explication: "$\\Delta = b^2 - 4ac = (-3)^2 - 4 \\times 2 \\times 5 = 9 - 40 = -31 < 0$ : pas de solution réelle." },
    { question: "$(u_n)$ est géométrique de premier terme $u_0 = 3$ et de raison $2$. $u_4 =$", choix: ["$48$", "$24$", "$11$", "$96$"], bonne: 0, explication: "$u_n = u_0 \\times q^n$, donc $u_4 = 3 \\times 2^4 = 3 \\times 16 = 48$. $11 = 3 + 4 \\times 2$ correspond à une suite arithmétique." },
    { question: "$P(A) = 0{,}3$, $P_A(B) = 0{,}5$ et $P_{\\overline{A}}(B) = 0{,}2$. Alors $P(B) =$", choix: ["$0{,}29$", "$0{,}7$", "$0{,}35$", "$0{,}15$"], bonne: 0, explication: "Probabilités totales : $P(B) = 0{,}3 \\times 0{,}5 + 0{,}7 \\times 0{,}2 = 0{,}15 + 0{,}14 = 0{,}29$. On n'additionne pas directement les probabilités conditionnelles." },
    { question: "$f(x) = x^2$. La tangente à sa courbe au point d'abscisse $3$ a pour équation :", choix: ["$y = 6x - 9$", "$y = 6x + 9$", "$y = 2x + 3$", "$y = 6x - 3$"], bonne: 0, explication: "$f'(x) = 2x$, donc $f'(3) = 6$ et $f(3) = 9$ : $y = 6(x - 3) + 9 = 6x - 9$." },
    { question: "La dérivée de $f(x) = (x - 1)e^{x}$ est :", choix: ["$xe^{x}$", "$e^{x}$", "$(x - 1)e^{x}$", "$(x - 2)e^{x}$"], bonne: 0, explication: "Formule du produit : $1 \\times e^{x} + (x - 1)e^{x} = (1 + x - 1)e^{x} = xe^{x}$." },
    { question: "La médiane de la série $3$ ; $5$ ; $5$ ; $8$ ; $10$ ; $12$ ; $13$ ; $15$ est :", choix: ["$9$", "$8$", "$10$", "$8{,}875$"], bonne: 0, explication: "Il y a $8$ valeurs rangées : la médiane est la moyenne des $4^\\text{e}$ et $5^\\text{e}$ valeurs, $\\dfrac{8 + 10}{2} = 9$. $8{,}875$ est la moyenne de la série." },
    { question: "Un élève trouve $P(A \\cap B) = 0{,}6$ alors que $P(A) = 0{,}4$. Qu'en penses-tu ?", choix: ["C'est impossible : $P(A \\cap B) \\leqslant P(A)$", "C'est possible si $B$ est très probable", "C'est possible, car $0{,}6 < 1$", "C'est impossible, car $0{,}6 + 0{,}4 = 1$"], bonne: 0, explication: "$A \\cap B$ est inclus dans $A$ : sa probabilité ne peut pas dépasser $P(A)$. C'est le réflexe de cohérence." },
    { question: "« Être un multiple de $4$ » est, pour « être pair », une condition :", choix: ["suffisante, mais pas nécessaire", "nécessaire, mais pas suffisante", "nécessaire et suffisante", "ni nécessaire ni suffisante"], bonne: 0, explication: "Un multiple de $4$ est toujours pair : la condition est suffisante. Mais $6$ est pair sans être un multiple de $4$ : elle n'est pas nécessaire." },
    { question: "La négation de « il existe un réel $x$ tel que $e^{x} \\leqslant 0$ » est :", choix: ["« pour tout réel $x$, $e^{x} > 0$ »", "« il existe un réel $x$ tel que $e^{x} > 0$ »", "« pour tout réel $x$, $e^{x} \\leqslant 0$ »", "« il existe un réel $x$ tel que $e^{x} \\geqslant 0$ »"], bonne: 0, explication: "La négation d'un « il existe » est un « pour tout », et la négation de $e^{x} \\leqslant 0$ est $e^{x} > 0$. Ici, c'est la négation qui est vraie." },
    { question: "Dans un énoncé, « conjecturer » signifie :", choix: ["proposer un résultat à partir d'observations, sans le démontrer", "démontrer un résultat donné", "utiliser le résultat de la question précédente", "calculer une valeur exacte"], bonne: 0, explication: "Une conjecture s'appuie sur des observations (figure, tableau de valeurs, programme). Elle doit ensuite être démontrée pour devenir un résultat." },
    { question: "Pour démontrer que l'exponentielle ne s'annule jamais, on utilise un raisonnement :", choix: ["par l'absurde", "par contre-exemple", "par disjonction des cas", "par simple conjecture"], bonne: 0, explication: "On suppose qu'il existe $a$ tel que $e^{a} = 0$ : alors $e^{a} \\times e^{-a} = 0$, alors que ce produit vaut $1$. C'est une contradiction." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Gérer ses deux heures",
      etapes: ["Partie 1 d'abord, environ $25$ minutes : réponds vite, sans t'attarder.", "Lis tous les exercices de la partie 2 et commence par celui que tu maîtrises le mieux.", "Garde $10$ minutes pour relire : phrases de conclusion, unités, questions oubliées."],
      exemple: "Une question te bloque ? Écris « on admet que… » et passe à la suivante."
    },
    {
      titre: "Répondre à un automatisme sans calculatrice",
      etapes: ["Choisir l'écriture la plus pratique : fraction, décimal ou pourcentage.", "Estimer l'ordre de grandeur du résultat.", "Vérifier la cohérence : une probabilité entre $0$ et $1$, un prix positif…"],
      exemple: "$25\\,\\%$ de $48$ : $\\dfrac{48}{4} = 12$."
    },
    {
      titre: "Rédiger une réponse de partie 2",
      etapes: ["Annoncer la propriété ou la formule utilisée.", "Écrire le calcul avec les étapes utiles.", "Conclure par une phrase qui répond à la question, avec les mots de l'énoncé."],
      exemple: "$f'(x) = 3x^2 + 1 > 0$ pour tout réel $x$, donc $f$ est strictement croissante sur $\\mathbb{R}$."
    },
    {
      titre: "Choisir un raisonnement",
      etapes: ["Une phrase « pour tout » à contredire : un contre-exemple.", "Une implication difficile en direct : la contraposée, ou l'absurde.", "Un résultat qui dépend des valeurs : une disjonction des cas."],
      exemple: "« Si $n^2$ est pair, alors $n$ est pair » : par contraposée, si $n = 2k + 1$, alors $n^2 = 4k^2 + 4k + 1$ est impair."
    }
  ],
  erreurs: [
    "Passer trop de temps sur la partie 1 : environ $25$ minutes suffisent.",
    "Laisser une réponse sans phrase de conclusion : la rédaction est notée.",
    "Vérifier une propriété « pour tout $n$ » sur deux ou trois termes seulement.",
    "Conclure à un extremum dès que $f'(a) = 0$, sans vérifier que $f'$ change de signe.",
    "Confondre $P(A \\cap B)$ et $P_A(B)$.",
    "Confondre la contraposée (« si non Q, alors non P ») et la réciproque (« si Q, alors P »).",
    "Abandonner un exercice à la première question bloquante, alors que les questions suivantes sont souvent faisables."
  ]
};
