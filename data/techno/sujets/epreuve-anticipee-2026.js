/*
  SUJET OFFICIEL : Première technologique — Épreuve anticipée de mathématiques, toutes séries, 12 juin 2026,
  métropole, La Réunion et Mayotte (26-MATHTEME1)
  Page #sujet-techno-2026 ; PDF du corrigé fabriqué par outils/sujets-pdf.js. Même format que
  data/premiere/sujets/metropole-2026.js : l'énoncé n'est pas recopié (PDF publié par le ministère), chaque question n'a
  qu'un court rappel, avec un indice et le corrigé rédigé par ProfMaths. Le sujet donne les points des exercices (5, 5 et 4) :
  leur répartition entre les questions est indicative. Partie 1 : QCM de 12 questions (0,5 point chacune), propositions A à D.
*/
window.SUJETS = window.SUJETS || {};
window.SUJETS["techno-2026"] = {
  entete: "Première technologique · Épreuve anticipée de mathématiques du 12 juin 2026 (sujet officiel) · Durée : 2 heures, sans calculatrice",
  consignes: "**Sujet officiel** de la première session de l'épreuve anticipée de la voie technologique, toutes séries, passé le 12 juin 2026 en métropole, à La Réunion et à Mayotte. Le ministère l'a publié sur son site. Son énoncé n'est pas recopié ici : ouvre-le ou imprime-le, fais le sujet en $2$ heures sans calculatrice, puis compare ta copie avec ce corrigé, question par question.\n\nDans ce sujet, la partie 1 est un QCM de douze questions. En juin 2027, elle sera faite de questions à réponses courtes, sans propositions : entraîne-toi à trouver chaque réponse avant de regarder les propositions. Le sujet donne les points de chaque exercice ; leur répartition entre les questions est indicative.",
  exercices: [
    {
      numero: "Partie 1", titre: "Automatismes (QCM)",
      duree: 25, points: 6, calculatrice: false,
      contexte: "Douze questions, une seule proposition exacte par question (propositions A à D) ; une réponse fausse n'enlève pas de point. Le corrigé donne la lettre de la bonne réponse et le calcul qui y mène.",
      questions: [
        { n: "1.", points: 0.5, texte: "Le nombre d'externes : $20\\,\\%$ de $500$ élèves.", corrige: "$0{,}2 \\times 500 = 100$ externes : réponse **C**." },
        { n: "2.", points: 0.5, texte: "Le coefficient multiplicateur d'une hausse de $5\\,\\%$.", corrige: "Augmenter de $5\\,\\%$, c'est multiplier par $1 + 0{,}05 = 1{,}05$ : réponse **B**." },
        { n: "3.", points: 0.5, texte: "La valeur de $4 \\times \\dfrac{2}{3}$.", corrige: "$4 \\times \\dfrac{2}{3} = \\dfrac{4 \\times 2}{3} = \\dfrac{8}{3}$ : réponse **A**." },
        { n: "4.", points: 0.5, texte: "L'équation qui a deux solutions réelles.", corrige: "$2x = -1$ et $\\dfrac{x}{2} = 4$ ont chacune une seule solution, et $x^2 = -1$ n'en a aucune, car un carré est positif. $x^2 = 4$ a deux solutions, $-2$ et $2$ : réponse **C**." },
        { n: "5.", points: 0.5, texte: "Une équation de la droite tracée.", corrige: "On lit que la droite passe par $(0\\,;3)$ et $(1\\,;1)$ : son ordonnée à l'origine est $3$ et son coefficient directeur est $\\dfrac{1 - 3}{1 - 0} = -2$. Une équation est $y = -2x + 3$ : réponse **D**." },
        { n: "6.", points: 0.5, texte: "L'image de $-2$ par $f(x) = x(3x - 6)$.", corrige: "$f(-2) = -2 \\times (3 \\times (-2) - 6) = -2 \\times (-12) = 24$ : réponse **C**." },
        { n: "7.", points: 0.5, texte: "Les antécédents de $0$ par $f(x) = x(3x - 6)$.", corrige: "Un produit est nul si et seulement si l'un de ses facteurs est nul : $x = 0$ ou $3x - 6 = 0$, soit $x = 2$. Le nombre $0$ a deux antécédents, $0$ et $2$ : réponse **A**." },
        { n: "8.", points: 0.5, texte: "Le tableau de signes de la fonction du second degré représentée.", corrige: "La parabole coupe l'axe des abscisses en $2$ et en $6$ ; elle est au-dessus de l'axe à l'extérieur de ces deux nombres et en dessous entre eux. $f(x)$ est donc positif sur $]-\\infty\\,;2[$ et sur $]6\\,;+\\infty[$, négatif sur $]2\\,;6[$ : réponse **D**." },
        { n: "9.", points: 0.5, texte: "La distance totale de $20$ tours d'une piste de $4\\,500$ m.", corrige: "$20 \\times 4\\,500 = 90\\,000$ m, soit $90$ km : réponse **C**." },
        { n: "10.", points: 0.5, texte: "La moyenne de $10$ (coefficient $2$) et $16$ (coefficient $1$).", corrige: "$\\dfrac{10 \\times 2 + 16 \\times 1}{2 + 1} = \\dfrac{36}{3} = 12$ : réponse **B**." },
        { n: "11.", points: 0.5, texte: "La probabilité qu'un client ayant acheté un aspirateur sans fil l'ait pris avec sac.", corrige: "On choisit parmi les $90$ clients qui ont acheté un aspirateur sans fil ; $20$ d'entre eux l'ont pris avec sac. La probabilité est $\\dfrac{20}{90}$ : réponse **B**." },
        { n: "12.", points: 0.5, texte: "Le pourcentage des ventes représenté par les cabriolets, lu sur le diagramme.", corrige: "Les berlines occupent la moitié du disque ($50\\,\\%$) et les monospaces un quart ($25\\,\\%$) : il reste $25\\,\\%$ pour les cabriolets et les tout-terrain. Seules les propositions $12\\,\\%$ et $18\\,\\%$ sont possibles. Le secteur des cabriolets est nettement plus grand que celui des tout-terrain : avec $12\\,\\%$, les tout-terrain feraient $13\\,\\%$, plus que les cabriolets. Les cabriolets représentent donc $18\\,\\%$ des ventes (et les tout-terrain $7\\,\\%$) : réponse **C**." }
      ]
    },
    {
      numero: "Partie 2 · exercice 1", titre: "Lectures graphiques et fonction du second degré",
      duree: 35, points: 5, calculatrice: false,
      contexte: "Rappel des données : courbe $\\mathcal{C}_f$ d'une fonction $f$ sur $[-3\\,;4]$ ; la droite $(d)$ est tangente à $\\mathcal{C}_f$ au point $A$ et passe par $C$ ; la tangente au point $B$ est horizontale. On admet ensuite que $f(x) = -x^2 + 2x + 3$.",
      questions: [
        { n: "1.", points: 0.5, texte: "Lire $f(-2)$ et $f(1)$.", corrige: "Le point $A(-2\\,;-5)$ est sur la courbe : $f(-2) = -5$. Le point $B(1\\,;4)$ aussi : $f(1) = 4$." },
        { n: "2.", points: 1, texte: "Lire $f'(-2)$ et $f'(1)$.", indice: "Le nombre dérivé est le coefficient directeur de la tangente au point considéré.", corrige: "$f'(-2)$ est le coefficient directeur de la tangente $(d)$, qui passe par $A(-2\\,;-5)$ et $C(-1\\,;1)$ :\n\n$f'(-2) = \\dfrac{1 - (-5)}{-1 - (-2)} = \\dfrac{6}{1} = 6$\n\nLa tangente au point $B$ est horizontale : $f'(1) = 0$." },
        { n: "3.", points: 0.5, texte: "Résoudre graphiquement $f(x) = 0$.", corrige: "La courbe coupe l'axe des abscisses aux points d'abscisses $-1$ et $3$ : les solutions sont $-1$ et $3$." },
        {
          n: "4.", points: 0.5, texte: "Le tableau de variations de $f$.",
          corrige: "La courbe monte de $x = -3$ jusqu'au point $B$, puis descend jusqu'à $x = 4$. On lit $f(-3) = -12$, $f(1) = 4$ et $f(4) = -5$.",
          tableauCorrige: { lignes: [["x", "-3", "", "1", "", "4"], ["f(x)", "-12", "\\nearrow", "4", "\\searrow", "-5"]] }
        },
        { n: "5.", points: 0.5, texte: "Retrouver par le calcul les résultats de la question 1.", corrige: "$f(-2) = -(-2)^2 + 2 \\times (-2) + 3 = -4 - 4 + 3 = -5$ et $f(1) = -1 + 2 + 3 = 4$." },
        { n: "6.a", points: 0.75, texte: "Déterminer $f'(x)$, puis retrouver les résultats de la question 2.", indice: "$(x^2)' = 2x$, $(x)' = 1$ et la dérivée d'une constante est nulle.", corrige: "$f'(x) = -2x + 2$. Alors $f'(-2) = 4 + 2 = 6$ et $f'(1) = -2 + 2 = 0$ : ce sont les valeurs lues." },
        { n: "6.b", points: 0.5, texte: "Vérifier que $f(x) = (x + 1)(-x + 3)$, puis retrouver les résultats de la question 3.", corrige: "$(x + 1)(-x + 3) = -x^2 + 3x - x + 3 = -x^2 + 2x + 3 = f(x)$.\n\n$f(x) = 0 \\iff x + 1 = 0$ ou $-x + 3 = 0 \\iff x = -1$ ou $x = 3$ : ce sont les solutions lues." },
        {
          n: "6.c", points: 0.75, texte: "Le tableau de signes de $f'(x)$ sur $[-3\\,;4]$, et les variations de $f$.",
          indice: "$-2x + 2 > 0 \\iff x < 1$.",
          corrige: "$-2x + 2 > 0 \\iff -2x > -2 \\iff x < 1$ : $f'(x)$ est positif sur $[-3\\,;1[$, nul en $1$, négatif sur $]1\\,;4]$. Donc $f$ est croissante sur $[-3\\,;1]$ et décroissante sur $[1\\,;4]$, comme sur le graphique.",
          tableauCorrige: { lignes: [["x", "-3", "", "1", "", "4"], ["f'(x)", "", "+", "0", "-", ""], ["f(x)", "-12", "\\nearrow", "4", "\\searrow", "-5"]] }
        }
      ]
    },
    {
      numero: "Partie 2 · exercice 2", titre: "Deux abonnements à une salle de sport",
      duree: 35, points: 5, calculatrice: false,
      contexte: "Rappel des données : abonnement n° 1 à $250$ € en 2026, puis $+30$ € par an ($a_n$ en $2026 + n$, $a_0 = 250$) ; abonnement n° 2 à $200$ € en 2026, puis $+10\\,\\%$ par an ($b_n$ en $2026 + n$, $b_0 = 200$) ; $c_n = a_n - b_n$, et une feuille de calcul donne $a_n$, $b_n$ et $c_n$ pour $n$ de $0$ à $14$ (colonnes B, C et D).",
      questions: [
        { partie: "Partie A : abonnement n° 1" },
        { n: "1.a", points: 0.5, texte: "Le montant de l'abonnement pour 2027.", corrige: "$a_1 = 250 + 30 = 280$ : l'abonnement coûte $280$ € en 2027." },
        { n: "1.b", points: 0.5, texte: "Calculer $a_2$ et l'interpréter.", corrige: "$a_2 = 280 + 30 = 310$ : en 2028, l'abonnement n° 1 coûte $310$ €." },
        { n: "2.", points: 0.5, texte: "$a_{n+1}$ en fonction de $a_n$.", corrige: "Chaque année, le prix augmente de $30$ € : $a_{n+1} = a_n + 30$ pour tout entier naturel $n$." },
        { n: "3.", points: 0.5, texte: "La nature de la suite $(a_n)$ et sa raison.", corrige: "On ajoute $30$ à chaque terme pour obtenir le suivant : $(a_n)$ est arithmétique de raison $30$." },
        { partie: "Partie B : abonnement n° 2" },
        { n: "1.", points: 0.5, texte: "Justifier que l'abonnement coûte $220$ € en 2027.", corrige: "Augmenter de $10\\,\\%$, c'est multiplier par $1{,}1$ : $b_1 = 200 \\times 1{,}1 = 220$ €." },
        { n: "2.", points: 0.5, texte: "$b_{n+1}$ en fonction de $b_n$.", corrige: "Chaque année, le prix est multiplié par $1{,}1$ : $b_{n+1} = 1{,}1\\,b_n$ pour tout entier naturel $n$." },
        { n: "3.", points: 0.5, texte: "La nature de la suite $(b_n)$ et sa raison.", corrige: "On multiplie chaque terme par $1{,}1$ pour obtenir le suivant : $(b_n)$ est géométrique de raison $1{,}1$." },
        { partie: "Partie C : comparaison des offres" },
        { n: "1.", points: 0.75, texte: "La formule à écrire dans la cellule D2, puis à étirer vers le bas.", corrige: "$c_n = a_n - b_n$, et la ligne 2 contient $a_0$ en B2 et $b_0$ en C2 : on écrit $\\texttt{=B2-C2}$ dans la cellule D2." },
        { n: "2.", points: 0.75, texte: "L'année à partir de laquelle l'abonnement n° 2 coûte plus cher que le n° 1.", indice: "L'abonnement n° 2 est plus cher quand $c_n = a_n - b_n$ devient négatif.", corrige: "L'abonnement n° 2 est plus cher que le n° 1 quand $c_n < 0$. D'après la feuille de calcul, $c_{11} \\approx 9{,}38$, encore positif, et $c_{12} \\approx -17{,}69$, puis $c_n$ reste négatif. L'abonnement n° 2 devient plus élevé à partir de $2026 + 12 = 2038$." }
      ]
    },
    {
      numero: "Partie 2 · exercice 3", titre: "Vrai ou faux : l'équipement informatique d'un collège",
      duree: 25, points: 4, calculatrice: false,
      contexte: "Pour chaque affirmation, répondre par vrai ou faux en justifiant. Rappel des données : sur $400$ élèves, $50$ ont un équipement individuel et une adresse mail, $210$ un équipement sans adresse mail, $40$ une adresse mail sans équipement et $100$ ni l'un ni l'autre ; en tout, $260$ ont un équipement et $90$ une adresse mail.",
      questions: [
        { n: "1.", points: 1, texte: "Affirmation 1 : $50\\,\\%$ des élèves ont une adresse mail et un équipement individuel.", corrige: "$50$ élèves sur $400$ ont les deux : $\\dfrac{50}{400} = 0{,}125$, soit $12{,}5\\,\\%$. L'affirmation 1 est **fausse** : c'est $50$ élèves, pas $50\\,\\%$." },
        { n: "2.", points: 1, texte: "Affirmation 2 : au moins $50\\,\\%$ des élèves n'ont pas d'adresse mail.", corrige: "$310$ élèves sur $400$ n'ont pas d'adresse mail : $\\dfrac{310}{400} = 0{,}775$, soit $77{,}5\\,\\%$, au moins $50\\,\\%$. L'affirmation 2 est **vraie**." },
        { n: "3.", points: 1, texte: "Affirmation 3 : la probabilité qu'un élève n'ait ni adresse mail ni équipement est $25\\,\\%$.", corrige: "$100$ élèves sur $400$ n'ont ni l'un ni l'autre : $\\dfrac{100}{400} = 0{,}25$, soit $25\\,\\%$. L'affirmation 3 est **vraie**." },
        { n: "4.", points: 1, texte: "Affirmation 4 : au moins $\\dfrac{1}{5}$ des élèves équipés ont aussi une adresse mail.", indice: "On ne regarde que les $260$ élèves qui ont un équipement individuel.", corrige: "Parmi les $260$ élèves équipés, $50$ ont une adresse mail. Or $\\dfrac{1}{5}$ de $260$ font $52$, et $50 < 52$ : la proportion $\\dfrac{50}{260} \\approx 0{,}19$ est inférieure à $\\dfrac{1}{5} = 0{,}2$. L'affirmation 4 est **fausse**." }
      ]
    }
  ]
};
