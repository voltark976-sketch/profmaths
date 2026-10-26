/*
  AUTOMATISMES · CALCUL NUMÉRIQUE
  -------------------------------
  Rubrique « Calcul numérique et algébrique » de la liste des automatismes du programme de Seconde 2026,
  à entretenir en Première pour l'épreuve anticipée (session 2028 : 2 h, sans calculatrice, partie 1 « automatismes »).
  Mêmes règles d'écriture que les autres chapitres (formules entre $...$, antislash doublé, {,} pour la virgule).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["auto-calcul-numerique"] = {
  niveau: "Automatismes",
  numero: null,
  periode: "Seconde et Première",
  titre: "Calcul numérique",
  accroche: "Comparer, calculer avec des fractions et des puissances, changer d'écriture, estimer, contrôler et convertir : les réflexes de calcul à avoir sans calculatrice.",

  playlist: "https://www.youtube.com/playlist?list=PLVTjofGlms14",
  drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv",
  pdfs: [
    { titre: "Dossier élève de Seconde (parties P1 et P2)", url: "https://drive.google.com/file/d/1vr9e5N38rAOQLWIvUR5suK6l6ciyoLNY/view" }
  ],

  cours: [
    {
      titre: "Comparer deux nombres",
      video: { titre: "Vidéo de ton prof : comparer deux nombres", youtube: "https://youtu.be/qt6CzZFcV3s" },
      texte:
        "- **Par la différence** : $a - b > 0 \\iff a > b$, et $a - b < 0 \\iff a < b$.\n" +
        "- **Par le quotient**, si $a$ et $b$ sont strictement positifs : $\\dfrac{a}{b} > 1 \\iff a > b$. Par exemple, $\\dfrac{3^{12}}{9^5} = \\dfrac{3^{12}}{3^{10}} = 9 > 1$, donc $3^{12} > 9^5$.\n" +
        "- Deux fractions : on les met au **même dénominateur**, puis on compare les numérateurs. $\\dfrac{7}{9} = \\dfrac{35}{45}$ et $\\dfrac{4}{5} = \\dfrac{36}{45}$, donc $\\dfrac{7}{9} < \\dfrac{4}{5}$ : sur la droite graduée, $\\dfrac{7}{9}$ est à gauche de $\\dfrac{4}{5}$.\n" +
        "- Deux nombres négatifs : le plus grand est le plus proche de $0$ ($-1{,}45 > -1{,}5$).",
      figure: "am-cours-comparer",
      exemple: {
        enonce: "Comparer $\\dfrac{5}{6}$ et $\\dfrac{7}{8}$, puis $2^{30}$ et $4^{14}$.",
        solution: "$\\dfrac{5}{6} - \\dfrac{7}{8} = \\dfrac{20}{24} - \\dfrac{21}{24} = -\\dfrac{1}{24} < 0$, donc $\\dfrac{5}{6} < \\dfrac{7}{8}$.\n\n$4^{14} = (2^2)^{14} = 2^{28}$, donc $\\dfrac{2^{30}}{4^{14}} = \\dfrac{2^{30}}{2^{28}} = 2^2 = 4 > 1$ : $2^{30} > 4^{14}$."
      }
    },
    {
      titre: "Fractions simples",
      video: { titre: "Vidéo de ton prof : calculer avec des fractions", youtube: "https://youtu.be/Zp_aC-8QbWw" },
      texte:
        "- Additionner ou soustraire : on réduit au **même dénominateur**. La bande ci-contre montre que $\\dfrac{2}{3} + \\dfrac{1}{4} = \\dfrac{8}{12} + \\dfrac{3}{12} = \\dfrac{11}{12}$.\n" +
        "- Multiplier : $\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{a \\times c}{b \\times d}$.\n" +
        "- Diviser, c'est multiplier par l'**inverse** : $\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c}$.\n" +
        "- Prendre les $\\dfrac{3}{4}$ d'une quantité : on la divise par $4$, puis on multiplie par $3$. Les $\\dfrac{3}{4}$ de $60$ font $15 \\times 3 = 45$.\n" +
        "- On simplifie le résultat : $\\dfrac{6}{8} = \\dfrac{3}{4}$.",
      figure: "am-cours-fractions",
      exemple: {
        enonce: "Calculer $\\dfrac{5}{6} - \\dfrac{1}{4}$ et $\\dfrac{3}{5} \\div \\dfrac{9}{10}$.",
        solution: "$\\dfrac{10}{12} - \\dfrac{3}{12} = \\dfrac{7}{12}$.\n\n$\\dfrac{3}{5} \\times \\dfrac{10}{9} = \\dfrac{30}{45} = \\dfrac{2}{3}$."
      }
    },
    {
      titre: "Puissances",
      video: { titre: "Vidéo de ton prof : puissances et écriture scientifique", youtube: "https://youtu.be/DKvTtv77YIw" },
      texte:
        "- $a^m \\times a^n = a^{m+n}$, $\\dfrac{a^m}{a^n} = a^{m-n}$, $(a^m)^n = a^{mn}$.\n" +
        "- $a^0 = 1$ et $a^{-n} = \\dfrac{1}{a^n}$ (pour $a \\neq 0$) : $2^{-3} = \\dfrac{1}{8} = 0{,}125$.\n" +
        "- Écriture scientifique : $a \\times 10^n$ avec $1 \\leqslant a < 10$. Exemples : $52\\,300 = 5{,}23 \\times 10^4$ et $0{,}0007 = 7 \\times 10^{-4}$.\n" +
        "- Attention : $(-3)^2 = 9$ mais $-3^2 = -9$.",
      exemple: {
        enonce: "Écrire $\\dfrac{10^5 \\times 10^{-2}}{10^4}$ sous la forme $10^n$, puis donner l'écriture scientifique de $(3 \\times 10^{4}) \\times (2 \\times 10^{-6})$.",
        solution: "$\\dfrac{10^{5 + (-2)}}{10^4} = \\dfrac{10^3}{10^4} = 10^{3 - 4} = 10^{-1}$.\n\n$(3 \\times 2) \\times 10^{4 + (-6)} = 6 \\times 10^{-2}$."
      }
    },
    {
      titre: "Décimal, fraction, pourcentage",
      video: { titre: "Vidéo d'Yvan Monka : passer de la fraction à l'écriture décimale", youtube: "https://youtu.be/n_x3EAigoB0" },
      texte:
        "- Un même nombre a plusieurs écritures : $\\dfrac{3}{4} = 0{,}75 = 75\\,\\%$.\n" +
        "- Fraction → décimal : on divise le numérateur par le dénominateur.\n" +
        "- Décimal → pourcentage : on multiplie par $100$ ($0{,}07 = 7\\,\\%$).\n" +
        "- Pourcentage → décimal : on divise par $100$ ($12{,}5\\,\\% = 0{,}125$).\n" +
        "- À connaître par cœur : $\\dfrac{1}{2} = 50\\,\\%$, $\\dfrac{1}{4} = 25\\,\\%$, $\\dfrac{3}{4} = 75\\,\\%$, $\\dfrac{1}{5} = 20\\,\\%$, $\\dfrac{1}{10} = 10\\,\\%$.",
      figure: "am-cours-pourcentage",
      exemple: {
        enonce: "Écrire $\\dfrac{3}{8}$ sous forme décimale puis en pourcentage.",
        solution: "$3 \\div 8 = 0{,}375$, soit $37{,}5\\,\\%$."
      }
    },
    {
      titre: "Ordre de grandeur et vraisemblance",
      video: { titre: "Vidéo de ton prof : estimer un ordre de grandeur", youtube: "https://youtu.be/_hvRtHJSt5I" },
      texte:
        "- Ordre de grandeur : on arrondit chaque nombre à une valeur simple, puis on calcule de tête : $387 \\times 0{,}52 \\approx 400 \\times 0{,}5 = 200$.\n" +
        "- Avant de valider un résultat, on se pose quatre questions : l'**ordre de grandeur** est-il bon ? l'**unité** ? le **signe** ? la valeur a-t-elle du **sens** ?\n" +
        "- Une proportion et une probabilité sont entre $0$ et $1$. Une moyenne est entre la plus petite et la plus grande valeur.",
      exemple: {
        enonce: "Un élève trouve que $2\\,987 \\times 0{,}0198 \\approx 591$. Est-ce plausible ?",
        solution: "$3\\,000 \\times 0{,}02 = 60$ : le bon résultat est proche de $60$. L'élève s'est trompé d'un facteur $10$."
      }
    },
    {
      titre: "Conversions d'unités",
      video: { titre: "Vidéo de ton prof : conversions d'unités", youtube: "https://youtu.be/ZmsrIiQvadQ" },
      texte:
        "- Longueurs : $\\times 10$ d'une unité à la suivante (km, hm, dam, m, dm, cm, mm). Aires : $\\times 100$. Volumes : $\\times 1\\,000$.\n" +
        "- Masses : $1$ t $= 1\\,000$ kg, $1$ kg $= 1\\,000$ g. Contenances : $1$ L $= 100$ cL $= 1\\,000$ mL.\n" +
        "- $1$ dm³ $= 1$ L, $1$ m³ $= 1\\,000$ L, $1$ ha $= 10\\,000$ m².\n" +
        "- Durées : $0{,}25$ h $= 15$ min, $0{,}1$ h $= 6$ min, et $1$ h $30$ min $= 1{,}5$ h.\n" +
        "- Vitesses : $1$ m/s $= 3{,}6$ km/h. De km/h vers m/s, on divise par $3{,}6$.",
      figure: "am-cours-conversions",
      exemple: {
        enonce: "Convertir $72$ km/h en m/s, et $2{,}4$ m² en cm².",
        solution: "$72 \\div 3{,}6 = 20$ m/s.\n\n$2{,}4 \\times 10\\,000 = 24\\,000$ cm²."
      }
    }
  ],

  videos: [
    { titre: "Exercice 1 · Calculer avec des fractions", type: "Fractions", youtube: "https://youtu.be/Zp_aC-8QbWw" },
    { titre: "Exercice 2 · Puissances et écriture scientifique", type: "Puissances", youtube: "https://youtu.be/DKvTtv77YIw" },
    { titre: "Exercice 3 · Comparer deux nombres", type: "Comparer", youtube: "https://youtu.be/qt6CzZFcV3s" },
    { titre: "Exercice 4 · Conversions d'unités", type: "Unités", youtube: "https://youtu.be/ZmsrIiQvadQ" },
    { titre: "Exercice 5 · Ordres de grandeur", type: "Estimer", youtube: "https://youtu.be/_hvRtHJSt5I" },
    { titre: "Exercice 6 · Débit et vitesse moyenne", type: "Vraisemblance", youtube: "https://youtu.be/-bw7RzHajyI" }
  ],
  videosNote: "Vidéos de ton prof (playlist « Secondes : automatismes ») : les énoncés sont dans le dossier élève ci-dessus.",

  exercices: [
    { type: "am-comparer", titre: "Comparer deux nombres", etape: "Automatismes de Seconde", nb: 6 },
    { type: "am-fractions", titre: "Calculer avec des fractions", etape: "Automatismes de Seconde", nb: 6 },
    { type: "am-puissances", titre: "Puissances, écriture scientifique", etape: "Automatismes de Seconde", nb: 6 },
    { type: "am-ecritures", titre: "Décimal, fraction, pourcentage", etape: "Automatismes de Seconde", nb: 6 },
    { type: "am-ordre-grandeur", titre: "Ordre de grandeur", etape: "Automatismes de Seconde", nb: 5 },
    { type: "am-coherence", titre: "Ce résultat est-il plausible ?", etape: "Automatismes de Seconde", nb: 5 },
    { type: "auto-conversions", titre: "Conversions d'unités", etape: "Automatismes de Seconde", nb: 6 },
    { type: "am-flash-cn", titre: "Flash : calcul numérique mélangé", etape: "Défi", nb: 10 }
  ],

  qcm: [
    { question: "Quel est le plus grand nombre ?", choix: ["$\\dfrac{2}{3}$", "$0{,}6$", "$\\dfrac{5}{8}$", "$0{,}66$"], bonne: 0, explication: "$\\dfrac{2}{3} \\approx 0{,}667$, $\\dfrac{5}{8} = 0{,}625$ : le plus grand est $\\dfrac{2}{3}$." },
    { question: "On compare $-2{,}3$ et $-2{,}25$ :", choix: ["$-2{,}3 > -2{,}25$", "$-2{,}3 < -2{,}25$", "$-2{,}3 = -2{,}25$", "on ne peut pas comparer deux nombres négatifs"], bonne: 1, explication: "$-2{,}25$ est plus proche de $0$, donc plus grand : $-2{,}3 < -2{,}25$." },
    { question: "$\\dfrac{5}{6} - \\dfrac{1}{3} =$", choix: ["$\\dfrac{4}{3}$", "$\\dfrac{1}{2}$", "$\\dfrac{4}{6}$", "$\\dfrac{1}{6}$"], bonne: 1, explication: "$\\dfrac{5}{6} - \\dfrac{2}{6} = \\dfrac{3}{6} = \\dfrac{1}{2}$." },
    { question: "$\\dfrac{2}{3} \\div \\dfrac{4}{9} =$", choix: ["$\\dfrac{8}{27}$", "$\\dfrac{3}{2}$", "$\\dfrac{2}{3}$", "$\\dfrac{6}{12}$"], bonne: 1, explication: "$\\dfrac{2}{3} \\times \\dfrac{9}{4} = \\dfrac{18}{12} = \\dfrac{3}{2}$." },
    { question: "$\\dfrac{3^5}{3^7} =$", choix: ["$3^{2}$", "$3^{-2}$", "$1^{-2}$", "$3^{12}$"], bonne: 1, explication: "On soustrait les exposants : $5 - 7 = -2$." },
    { question: "L'écriture scientifique de $0{,}00048$ est :", choix: ["$48 \\times 10^{-5}$", "$4{,}8 \\times 10^{-4}$", "$4{,}8 \\times 10^{4}$", "$0{,}48 \\times 10^{-3}$"], bonne: 1, explication: "$1 \\leqslant 4{,}8 < 10$ et la virgule se déplace de $4$ rangs vers la droite." },
    { question: "$\\dfrac{7}{20}$ en pourcentage :", choix: ["$7\\,\\%$", "$35\\,\\%$", "$0{,}35\\,\\%$", "$20\\,\\%$"], bonne: 1, explication: "$\\dfrac{7}{20} = \\dfrac{35}{100} = 35\\,\\%$." },
    { question: "$2{,}5\\,\\%$ en écriture décimale :", choix: ["$0{,}25$", "$0{,}025$", "$2{,}5$", "$25$"], bonne: 1, explication: "$2{,}5 \\div 100 = 0{,}025$." },
    { question: "Un ordre de grandeur de $49{,}8 \\times 0{,}21$ est :", choix: ["$1$", "$10$", "$100$", "$1\\,000$"], bonne: 1, explication: "$50 \\times 0{,}2 = 10$." },
    { question: "Zaïnaba trouve qu'un sac de riz de la boutique pèse $250$ kg. Que penser ?", choix: ["C'est sûrement une erreur : un sac de riz pèse quelques kilogrammes", "C'est plausible", "C'est plausible si le sac est grand", "C'est une erreur : il pèse plutôt $250$ g"], bonne: 0, explication: "Un sac de riz courant pèse quelques kilogrammes ($5$ kg, $25$ kg) : $250$ kg n'est pas vraisemblable, et $250$ g serait bien trop léger." },
    { question: "$3$ h $45$ min $=$", choix: ["$3{,}45$ h", "$3{,}75$ h", "$3{,}4$ h", "$345$ min"], bonne: 1, explication: "$45$ min $= \\dfrac{45}{60}$ h $= 0{,}75$ h." },
    { question: "$1{,}2$ m³ $=$", choix: ["$12$ L", "$120$ L", "$1\\,200$ L", "$12\\,000$ L"], bonne: 2, explication: "$1$ m³ $= 1\\,000$ L, donc $1{,}2$ m³ $= 1\\,200$ L." },
    { question: "Quel est le plus petit nombre ?", choix: ["$-1{,}5$", "$-1{,}45$", "$-1$", "$-\\dfrac{5}{4}$"], bonne: 0, explication: "Pour des nombres négatifs, le plus petit est le plus éloigné de $0$ : $-1{,}5 < -1{,}45 < -1{,}25 < -1$, avec $-\\dfrac{5}{4} = -1{,}25$." },
    { question: "On compare $\\dfrac{5}{7}$ et $\\dfrac{7}{10}$ :", choix: ["$\\dfrac{5}{7} > \\dfrac{7}{10}$", "$\\dfrac{5}{7} < \\dfrac{7}{10}$", "$\\dfrac{5}{7} = \\dfrac{7}{10}$", "on ne peut pas comparer des fractions de dénominateurs différents"], bonne: 0, explication: "Au même dénominateur $70$ : $\\dfrac{5}{7} = \\dfrac{50}{70}$ et $\\dfrac{7}{10} = \\dfrac{49}{70}$. Comme $50 > 49$, $\\dfrac{5}{7} > \\dfrac{7}{10}$." },
    { question: "On sait que $a - b = -0{,}3$. Alors :", choix: ["$a < b$", "$a > b$", "$a = b$", "on ne peut pas comparer $a$ et $b$"], bonne: 0, explication: "La différence $a - b$ est négative, donc $a < b$. C'est la méthode de comparaison par la différence." },
    { question: "$a$ et $b$ sont strictement positifs et $\\dfrac{a}{b} = 0{,}8$. Alors :", choix: ["$a < b$", "$a > b$", "$a = b$", "on ne peut pas comparer $a$ et $b$"], bonne: 0, explication: "Pour des nombres strictement positifs, $\\dfrac{a}{b} < 1 \\iff a < b$ : c'est la comparaison par le quotient." },
    { question: "$\\dfrac{3}{4} \\times \\dfrac{8}{9} =$", choix: ["$\\dfrac{2}{3}$", "$\\dfrac{11}{13}$", "$\\dfrac{27}{32}$", "$\\dfrac{24}{9}$"], bonne: 0, explication: "On multiplie les numérateurs entre eux et les dénominateurs entre eux : $\\dfrac{3 \\times 8}{4 \\times 9} = \\dfrac{24}{36} = \\dfrac{2}{3}$." },
    { question: "$1 - \\dfrac{3}{8} =$", choix: ["$\\dfrac{5}{8}$", "$-\\dfrac{1}{4}$", "$-\\dfrac{2}{7}$", "$\\dfrac{3}{8}$"], bonne: 0, explication: "$1 = \\dfrac{8}{8}$, donc $1 - \\dfrac{3}{8} = \\dfrac{8 - 3}{8} = \\dfrac{5}{8}$." },
    { question: "D'après la bande partagée en douzièmes, $\\dfrac{2}{3} + \\dfrac{1}{4} =$", figure: "am-qcm-fractions", choix: ["$\\dfrac{11}{12}$", "$\\dfrac{3}{7}$", "$\\dfrac{3}{12}$", "$\\dfrac{11}{24}$"], bonne: 0, explication: "$\\dfrac{2}{3} = \\dfrac{8}{12}$ et $\\dfrac{1}{4} = \\dfrac{3}{12}$ : on colorie $8 + 3 = 11$ douzièmes. On n'additionne pas les dénominateurs." },
    { question: "Les $\\dfrac{2}{5}$ des $35$ élèves d'une classe de Dembéni viennent en bus. Combien d'élèves cela fait-il ?", choix: ["$14$", "$7$", "$70$", "$21$"], bonne: 0, explication: "On divise par $5$ (une part : $7$ élèves), puis on multiplie par $2$ : $14$ élèves. $21$, ce sont les élèves qui ne viennent pas en bus." },
    { question: "$(-2)^3 =$", choix: ["$-8$", "$8$", "$-6$", "$6$"], bonne: 0, explication: "$(-2)^3 = (-2) \\times (-2) \\times (-2) = 4 \\times (-2) = -8$ : un nombre négatif à une puissance impaire reste négatif." },
    { question: "$5^0 + 5^{-1} =$", choix: ["$1{,}2$", "$0{,}2$", "$-4$", "$1$"], bonne: 0, explication: "$5^0 = 1$ et $5^{-1} = \\dfrac{1}{5} = 0{,}2$, donc la somme vaut $1{,}2$. Un exposant négatif ne rend pas le nombre négatif." },
    { question: "$3{,}2 \\times 10^5 =$", choix: ["$320\\,000$", "$32\\,000$", "$3\\,200\\,000$", "$16$"], bonne: 0, explication: "Multiplier par $10^5$, c'est décaler la virgule de $5$ rangs vers la droite : $3{,}2 \\times 10^5 = 320\\,000$." },
    { question: "$0{,}6$ s'écrit aussi :", choix: ["$\\dfrac{3}{5}$", "$\\dfrac{1}{6}$", "$6\\,\\%$", "$\\dfrac{6}{100}$"], bonne: 0, explication: "$0{,}6 = \\dfrac{6}{10} = \\dfrac{3}{5}$, c'est aussi $60\\,\\%$. $\\dfrac{6}{100} = 6\\,\\% = 0{,}06$." },
    { question: "$\\dfrac{1}{8}$ en pourcentage :", choix: ["$12{,}5\\,\\%$", "$8\\,\\%$", "$0{,}125\\,\\%$", "$1{,}8\\,\\%$"], bonne: 0, explication: "$\\dfrac{1}{8} = 1 \\div 8 = 0{,}125$, puis on multiplie par $100$ : $12{,}5\\,\\%$. C'est la moitié de $\\dfrac{1}{4} = 25\\,\\%$." },
    { question: "Quelle proportion du quadrillage est coloriée ?", figure: "am-qcm-grille", choix: ["$35\\,\\%$", "$7\\,\\%$", "$20\\,\\%$", "$0{,}35\\,\\%$"], bonne: 0, explication: "$7$ cases coloriées sur $20$ : $\\dfrac{7}{20} = \\dfrac{35}{100} = 35\\,\\%$." },
    { question: "Sur cette droite graduée, quelle est l'abscisse du point $A$ ?", figure: "am-qcm-droite-a", choix: ["$-1{,}75$", "$-1{,}25$", "$-1{,}3$", "$-2{,}5$"], bonne: 0, explication: "Entre $-1$ et $0$, il y a $4$ graduations : une graduation vaut $0{,}25$. $A$ est $3$ graduations à gauche de $-1$ : $-1 - 0{,}75 = -1{,}75$." },
    { question: "Un ordre de grandeur de $\\dfrac{6\\,012}{29{,}7}$ est :", choix: ["$200$", "$2\\,000$", "$20$", "$180\\,000$"], bonne: 0, explication: "$\\dfrac{6\\,000}{30} = 200$. $180\\,000$ correspond à une multiplication au lieu d'une division." },
    { question: "Un élève calcule la moyenne des notes $8$, $12$ et $15$ et trouve $16$. Qu'en penses-tu ?", choix: ["C'est impossible : une moyenne est entre la plus petite et la plus grande valeur", "C'est plausible", "C'est juste, car $8 + 12 + 15 > 16$", "C'est impossible, car une moyenne est toujours un entier"], bonne: 0, explication: "Une moyenne est toujours entre $8$ et $15$ ici. En fait, elle vaut $\\dfrac{35}{3} \\approx 11{,}7$ : ce n'est pas un entier, et ce n'est pas un problème." },
    { question: "Un calcul de proportion donne $1{,}3$. On en déduit que :", choix: ["il y a une erreur : une proportion est entre $0$ et $1$", "la proportion vaut $13\\,\\%$", "la proportion est très grande, mais c'est possible", "la proportion vaut $1{,}3\\,\\%$"], bonne: 0, explication: "Une proportion compare une partie au tout : elle est toujours entre $0$ et $1$. $1{,}3$ signale une erreur, souvent une division à l'envers." },
    { question: "$72$ km/h $=$", choix: ["$20$ m/s", "$259{,}2$ m/s", "$7{,}2$ m/s", "$72\\,000$ m/s"], bonne: 0, explication: "De km/h vers m/s, on divise par $3{,}6$ : $72 \\div 3{,}6 = 20$ m/s. $259{,}2$ vient d'une multiplication par $3{,}6$." },
    { question: "Une parcelle d'ylang-ylang de $3$ ha mesure :", choix: ["$30\\,000$ m²", "$300$ m²", "$3\\,000$ m²", "$300\\,000$ m²"], bonne: 0, explication: "$1$ ha $= 10\\,000$ m², donc $3$ ha $= 30\\,000$ m²." },
    { question: "$0{,}4$ h $=$", choix: ["$24$ min", "$40$ min", "$4$ min", "$2{,}4$ min"], bonne: 0, explication: "$0{,}4 \\times 60 = 24$ min. Une heure compte $60$ minutes, pas $100$ : $0{,}4$ h n'est pas $40$ min." },
    { question: "Un régime de bananes de $18{,}5$ kg pèse :", choix: ["$18\\,500$ g", "$1\\,850$ g", "$185$ g", "$0{,}0185$ g"], bonne: 0, explication: "$1$ kg $= 1\\,000$ g : $18{,}5 \\times 1\\,000 = 18\\,500$ g." },
    { question: "Une bouteille de jus de goyave contient $0{,}75$ L. Cela fait :", choix: ["$75$ cL", "$7{,}5$ cL", "$750$ cL", "$0{,}0075$ cL"], bonne: 0, explication: "$1$ L $= 100$ cL : $0{,}75 \\times 100 = 75$ cL (c'est aussi $750$ mL)." }
  ],

  methode: [
    {
      titre: "Calculer sans calculatrice",
      etapes: [
        "Repère les nombres « ronds » cachés : $0{,}25 = \\dfrac{1}{4}$, $0{,}5 = \\dfrac{1}{2}$, $1{,}5 = \\dfrac{3}{2}$.",
        "Décompose : $25 \\times 12 = 25 \\times 4 \\times 3 = 300$.",
        "Avec des puissances de $10$, déplace la virgule plutôt que de poser l'opération.",
        "Contrôle ton résultat avec un ordre de grandeur."
      ],
      figure: "am-meth-quart",
      exemple: "$0{,}25 \\times 36 = \\dfrac{36}{4} = 9$ : bien plus rapide que de poser la multiplication."
    },
    {
      titre: "Contrôler un résultat",
      etapes: [
        "L'ordre de grandeur est-il cohérent ?",
        "L'unité est-elle la bonne (cm², cm³, m/s…) ?",
        "Le signe est-il possible (une longueur est positive) ?",
        "La valeur a-t-elle du sens (une proportion ou une probabilité est entre $0$ et $1$) ?"
      ],
      exemple: "Une bouteille d'eau de $1{,}5$ m³ ? Impossible : c'est $1{,}5$ L."
    }
  ],
  erreurs: [
    "$\\dfrac{a}{b} + \\dfrac{c}{d} \\neq \\dfrac{a + c}{b + d}$ : on réduit d'abord au même dénominateur.",
    "$(-3)^2 = 9$ mais $-3^2 = -9$ : sans parenthèses, le carré ne porte que sur $3$.",
    "$2^3 \\times 2^4 = 2^7$, pas $4^7$ ni $2^{12}$.",
    "$5\\,\\% = 0{,}05$ et non $0{,}5$.",
    "$1$ h $30$ min $= 1{,}5$ h et non $1{,}3$ h ; $1$ m² $= 100$ dm² et non $10$ dm².",
    "Pour comparer des négatifs : $-5 < -2$, même si $5 > 2$.",
    "$2^{-1} = 0{,}5$ : un exposant négatif ne rend pas le nombre négatif."
  ]
};
