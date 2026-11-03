/*
  SUJET OFFICIEL : Première spécialité — Épreuve anticipée de mathématiques du 12 juin 2026, métropole, La Réunion et Mayotte (26-MATSPEGEME1)
  Page #sujet-premiere-metropole-2026 ; PDF du corrigé fabriqué par outils/sujets-pdf.js. Même format que sujet-zero-1.js :
  l'énoncé n'est pas recopié (champ officiel du catalogue), chaque question n'a qu'un court rappel, avec un indice et
  le corrigé rédigé par ProfMaths. Énoncé : PDF publié par le ministère (page « les sujets des examens 2026 »). Le sujet donne les points des exercices (5, 5 et 4) : leur répartition entre les
  questions est indicative. Partie 1 : QCM de 8 questions (0,75 point chacune), propositions a à d.
*/
window.SUJETS = window.SUJETS || {};
window.SUJETS["premiere-metropole-2026"] = {
  entete: "Première spécialité · Épreuve anticipée de mathématiques du 12 juin 2026 (sujet officiel) · Durée : 2 heures, sans calculatrice",
  consignes: "**Sujet officiel** de la première session de l'épreuve anticipée, passé le 12 juin 2026 en métropole, à La Réunion et à Mayotte. Le ministère l'a publié sur son site. Son énoncé n'est pas recopié ici : ouvre-le ou imprime-le, fais le sujet en $2$ heures sans calculatrice, puis compare ta copie avec ce corrigé, question par question.\n\nDans ce sujet, la partie 1 est un QCM de huit questions. En juin 2027, elle sera faite de questions à réponses courtes, sans propositions : entraîne-toi à trouver chaque réponse avant de regarder les propositions. Le sujet donne les points de chaque exercice ; leur répartition entre les questions est indicative.",
  exercices: [
    {
      numero: "Partie 1", titre: "Automatismes (QCM)",
      duree: 20, points: 6, calculatrice: false,
      contexte: "Huit questions, une seule proposition exacte par question ; une réponse fausse n'enlève pas de point. Le corrigé donne la lettre de la bonne réponse et le calcul qui y mène.",
      questions: [
        { n: "1.", points: 0.75, texte: "La forme développée de $(3x - 2)^2$.", corrige: "$(a - b)^2 = a^2 - 2ab + b^2$ avec $a = 3x$ et $b = 2$ :\n\n$(3x)^2 - 2 \\times 3x \\times 2 + 2^2$\n${} = 9x^2 - 12x + 4$\n\nRéponse **c**. La proposition **a** oublie le double produit." },
        { n: "2.", points: 0.75, texte: "Une équation de la droite $(\\Delta)$ tracée dans le repère $(O, I, J)$.", corrige: "On lit que $(\\Delta)$ passe par les points $(0\\,;2)$ et $(2\\,;0)$. Son coefficient directeur est :\n\n$\\dfrac{0 - 2}{2 - 0} = -1$\n\net son ordonnée à l'origine est $2$ : une équation de $(\\Delta)$ est $y = -x + 2$. Réponse **c**." },
        { n: "3.", points: 0.75, texte: "Le nombre d'élèves de la classe ($75\\,\\%$ étudient le grec, les $9$ autres le latin).", corrige: "Les latinistes sont $100\\,\\% - 75\\,\\% = 25\\,\\%$ de la classe, c'est-à-dire un quart : la classe compte $4 \\times 9 = 36$ élèves. Réponse **d**." },
        { n: "4.", points: 0.75, texte: "Le coefficient multiplicateur d'une hausse de $15\\,\\%$.", corrige: "Augmenter de $15\\,\\%$, c'est multiplier par $1 + 0{,}15 = 1{,}15$. Réponse **b**." },
        { n: "5.", points: 0.75, texte: "La valeur la plus proche de $\\dfrac{150\\,000}{3\\,200}$.", corrige: "On simplifie par $100$ :\n\n$\\dfrac{150\\,000}{3\\,200} = \\dfrac{1\\,500}{32}$\n\nOr $32 \\times 50 = 1\\,600$, proche de $1\\,500$ : le quotient est proche de $50$ (il vaut environ $47$). Réponse **b**." },
        { n: "6.", points: 0.75, texte: "Le nombre d'images par seconde d'une vidéo de $2\\,400$ images qui dure $1$ minute et $40$ secondes.", corrige: "$1$ minute et $40$ secondes font $100$ secondes, donc la vidéo contient $2\\,400 \\div 100 = 24$ images par seconde. Réponse **b**." },
        { n: "7.", points: 0.75, texte: "Le point qui appartient à la courbe de $f(x) = 0{,}5(x - 3)^2 + 10$.", corrige: "On calcule l'image de l'abscisse de chaque point :\n\n- $f(-3) = 0{,}5 \\times 36 + 10 = 28$ : $A$ n'est pas sur $\\mathcal{C}$ ;\n- $f(3) = 0{,}5 \\times 0 + 10 = 10$ : $C(3\\,;10)$ est sur $\\mathcal{C}$, mais pas $B(3\\,;10{,}5)$ ;\n- $f(0) = 0{,}5 \\times 9 + 10 = 14{,}5$ : $D$ n'est pas sur $\\mathcal{C}$.\n\nRéponse **c**." },
        { n: "8.", points: 0.75, texte: "La valeur de $A = \\dfrac{10^{201} \\times 10^{-4}}{(10^2)^{100}}$.", corrige: "$10^{201} \\times 10^{-4} = 10^{197}$ et $(10^2)^{100} = 10^{200}$, donc :\n\n$A = \\dfrac{10^{197}}{10^{200}} = 10^{-3} = 0{,}001$\n\nRéponse **c**." }
      ]
    },
    {
      numero: "Partie 2 · exercice 1", titre: "Location de bicyclettes et assurance",
      duree: 35, points: 5, calculatrice: false,
      contexte: "Rappel des données : $60\\,\\%$ des clients louent une bicyclette traditionnelle (événement $T$), les autres une bicyclette électrique ; parmi les clients de $T$, $25\\,\\%$ prennent une assurance (événement $A$) ; $20\\,\\%$ de l'ensemble des clients prennent une assurance.",
      questions: [
        {
          n: "1.", points: 1, texte: "Compléter les pointillés de l'arbre pondéré.",
          indice: "Les probabilités des branches issues d'un même nœud ont pour somme $1$.",
          corrige: "$P(T) = 0{,}6$, donc $P\\left(\\overline{T}\\right) = 0{,}4$ ; $P_T(A) = 0{,}25$, donc $P_T\\left(\\overline{A}\\right) = 0{,}75$. Les branches issues de $\\overline{T}$ n'ont pas de pointillés : on les trouvera à la question 5.",
          figureCorrige: (o) => o.arbreProba(["T", "~T", "A", "~A"], ["0,6", "0,4", "0,25", "0,75", "?", "?"], "Arbre pondéré : T 0,6 et non T 0,4 ; après T : A 0,25 et non A 0,75 ; après non T : branches encore inconnues")
        },
        { n: "2.", points: 0.5, texte: "La probabilité de l'événement $A$, lue dans l'énoncé.", corrige: "$20\\,\\%$ de l'ensemble des clients ont pris une assurance : $P(A) = 0{,}2$." },
        { n: "3.", points: 1, texte: "Montrer que $P(T \\cap A) = 0{,}15$.", indice: "On multiplie les probabilités le long du chemin $T$, puis $A$.", corrige: "$P(T \\cap A) = P(T) \\times P_T(A) = 0{,}6 \\times 0{,}25 = 0{,}15$." },
        { n: "4.", points: 1, texte: "En déduire que $P\\left(\\overline{T} \\cap A\\right) = 0{,}05$.", indice: "Formule des probabilités totales : $P(A) = P(T \\cap A) + P\\left(\\overline{T} \\cap A\\right)$.", corrige: "$T$ et $\\overline{T}$ forment une partition de l'univers. D'après la formule des probabilités totales :\n\n$P(A) = P(T \\cap A) + P\\left(\\overline{T} \\cap A\\right)$\n\nDonc $P\\left(\\overline{T} \\cap A\\right) = 0{,}2 - 0{,}15 = 0{,}05$." },
        {
          n: "5.", points: 1.5, texte: "La probabilité qu'un client ait pris une assurance sachant qu'il a loué une bicyclette électrique, en fraction irréductible.",
          indice: "Louer une bicyclette électrique, c'est l'événement $\\overline{T}$ : on cherche $P_{\\overline{T}}(A)$.",
          corrige: "Louer une bicyclette électrique, c'est l'événement $\\overline{T}$ :\n\n$P_{\\overline{T}}(A) = \\dfrac{P\\left(\\overline{T} \\cap A\\right)}{P\\left(\\overline{T}\\right)} = \\dfrac{0{,}05}{0{,}4}$\n\n$P_{\\overline{T}}(A) = \\dfrac{5}{40} = \\dfrac{1}{8}$\n\nParmi les clients qui louent une bicyclette électrique, un sur huit prend une assurance. L'arbre complet :",
          figureCorrige: (o) => o.arbreProba(["T", "~T", "A", "~A"], ["0,6", "0,4", "0,25", "0,75", "1/8", "7/8"], "Arbre pondéré complet : T 0,6 et non T 0,4 ; après T : A 0,25 et non A 0,75 ; après non T : A 1/8 et non A 7/8")
        }
      ]
    },
    {
      numero: "Partie 2 · exercice 2", titre: "Vrai ou faux : trinôme, suite et tangente",
      duree: 35, points: 5, calculatrice: false,
      contexte: "Pour chaque affirmation, dire si elle est vraie ou fausse, en justifiant : une réponse sans justification ne rapporte rien. Les trois questions sont indépendantes.",
      questions: [
        { n: "1.", points: 2, texte: "Pour tout réel $u$, l'équation $x^2 + x - u^2 = 0$ a deux solutions réelles distinctes.", indice: "C'est un trinôme en $x$ : calcule son discriminant en fonction de $u$ et étudie son signe.", corrige: "C'est un trinôme en $x$, avec $a = 1$, $b = 1$ et $c = -u^2$ :\n\n$\\Delta = 1^2 - 4 \\times 1 \\times (-u^2) = 1 + 4u^2$\n\nComme $u^2 \\geqslant 0$, $\\Delta \\geqslant 1$, donc $\\Delta > 0$ : l'équation a toujours deux solutions réelles distinctes. L'affirmation est **vraie**." },
        { n: "2.", points: 1.5, texte: "La suite définie par $u_n = 2^{-n}$ est géométrique de raison $\\dfrac{1}{2}$.", indice: "Exprime $u_{n+1}$ en fonction de $u_n$ avec les règles de calcul sur les puissances.", corrige: "Pour tout entier naturel $n$ :\n\n$u_{n+1} = 2^{-(n+1)} = 2^{-n} \\times 2^{-1} = \\dfrac{1}{2}\\,u_n$\n\nLa suite $(u_n)$ est géométrique de raison $\\dfrac{1}{2}$, de premier terme $u_0 = 1$. L'affirmation est **vraie**." },
        { n: "3.", points: 1.5, texte: "Le point $A(3\\,;3)$ est sur la tangente $T$ en $0$ à la courbe de $f(x) = e^x - 1$.", indice: "La tangente au point d'abscisse $0$ a pour équation $y = f'(0)(x - 0) + f(0)$.", corrige: "$f(0) = e^0 - 1 = 0$ et $f'(x) = e^x$, donc $f'(0) = 1$. La tangente $T$ a pour équation $y = 1 \\times (x - 0) + 0$, soit $y = x$.\n\nLe point $A(3\\,;3)$ vérifie cette équation, car $3 = 3$ : il est sur $T$. L'affirmation est **vraie**." }
      ]
    },
    {
      numero: "Partie 2 · exercice 3", titre: "Un produit scalaire et un angle de $\\frac{\\pi}{3}$",
      duree: 30, points: 4, calculatrice: false,
      contexte: "Rappel des données : repère orthonormé ; $P(4\\,;0)$, $K(1\\,;0)$ et, pour un réel $x$, le point $M(x\\,;3)$.",
      questions: [
        { n: "1.", points: 0.5, texte: "Les coordonnées et la norme du vecteur $\\overrightarrow{KP}$.", indice: "Coordonnées : $x_P - x_K$ et $y_P - y_K$ ; norme : $\\sqrt{x^2 + y^2}$.", corrige: "$\\overrightarrow{KP}\\begin{pmatrix} 4 - 1 \\\\ 0 - 0 \\end{pmatrix}$, soit $\\overrightarrow{KP}\\begin{pmatrix} 3 \\\\ 0 \\end{pmatrix}$, et $\\left\\|\\overrightarrow{KP}\\right\\| = \\sqrt{3^2 + 0^2} = 3$." },
        { n: "2.", points: 0.5, texte: "Les coordonnées et la norme du vecteur $\\overrightarrow{KM}$, en fonction de $x$.", corrige: "$\\overrightarrow{KM}\\begin{pmatrix} x - 1 \\\\ 3 \\end{pmatrix}$ et $\\left\\|\\overrightarrow{KM}\\right\\| = \\sqrt{(x - 1)^2 + 9}$." },
        { n: "3.", points: 0.5, texte: "Montrer que $\\overrightarrow{KP} \\cdot \\overrightarrow{KM} = 3x - 3$.", indice: "$\\vec{u} \\cdot \\vec{v} = xx' + yy'$ en repère orthonormé.", corrige: "$\\overrightarrow{KP} \\cdot \\overrightarrow{KM} = 3 \\times (x - 1) + 0 \\times 3$\n${} = 3x - 3$." },
        { n: "4.", points: 1.5, texte: "Si $\\widehat{PKM} = \\dfrac{\\pi}{3}$, alors $x$ est solution de $(E)$ : $\\sqrt{(x - 1)^2 + 9} = 2x - 2$.", indice: "Le produit scalaire s'écrit aussi $KP \\times KM \\times \\cos\\widehat{PKM}$.", corrige: "Le produit scalaire s'écrit aussi :\n\n$\\overrightarrow{KP} \\cdot \\overrightarrow{KM} = KP \\times KM \\times \\cos\\widehat{PKM}$\n\nSi $\\widehat{PKM} = \\dfrac{\\pi}{3}$, alors :\n\n$\\cos\\widehat{PKM} = \\dfrac{1}{2}$\n\net, avec les questions 1 à 3 :\n\n$3x - 3 = 3 \\times \\sqrt{(x - 1)^2 + 9} \\times \\dfrac{1}{2}$\n\nOn multiplie les deux membres par $\\dfrac{2}{3}$ :\n\n$2x - 2 = \\sqrt{(x - 1)^2 + 9}$\n\nLe réel $x$ est donc solution de $(E)$." },
        { n: "5.", points: 1, texte: "Vérifier que $1 + \\sqrt{3}$ est solution de $(E)$.", indice: "Avec $x = 1 + \\sqrt{3}$, on a $x - 1 = \\sqrt{3}$ : calcule les deux membres séparément.", corrige: "Pour $x = 1 + \\sqrt{3}$, on a $x - 1 = \\sqrt{3}$.\n\nÀ gauche : $\\sqrt{(\\sqrt{3})^2 + 9} = \\sqrt{12} = 2\\sqrt{3}$.\n\nÀ droite : $2x - 2 = 2(x - 1) = 2\\sqrt{3}$.\n\nLes deux membres sont égaux : $1 + \\sqrt{3}$ est solution de $(E)$." }
      ]
    }
  ]
};
