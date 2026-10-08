/*
  CHAPITRE : Première spécialité — Suites géométriques
  -----------------------------------------------------
  Chapitre 6 de la progression spiralée 2026-2027 (programme de Première 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Vidéos : playlist « 1SPE – Suites numériques » de la chaîne d'abord (#09 à #15), Yvan Monka en complément.
  Les exemples du cours évitent les exercices du dossier élève (scooter, plage, abonnés…), corrigés en vidéo ou en classe.
  Figures : "suite-geo", "prix-evolution", "suite-geo-alterne", "medicament", "lineaire-exponentiel".
  Générateurs : suite- (suite-geometrique, suite-nature, suite-variation, suite-seuil) et su-geo-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-suites-geometriques"] = {
  niveau: "Première spécialité",
  numero: 6,
  titre: "Suites géométriques",
  accroche: "Multiplier toujours par le même nombre : le prix du riz qui augmente, le médicament qui s'élimine heure après heure. Terme général, sommes de puissances, limite et seuil.",

  playlist: "https://www.youtube.com/playlist?list=PLUTXHp2G5xZ4",
  drive: "https://drive.google.com/drive/folders/1Ymru1W2dLIhiEgpawEdchTrVvaK8Q3n6",
  pdfs: [
    {
      titre: "Dossier élève : cours, méthodes et exercices (chapitres 1, 3 et 6)",
      url: "https://drive.google.com/file/d/1ccZ0rwB10ZQr00MtVd9k_bBGR2KYtK44/view"
    }
  ],
  liens: [
    { titre: "Le cours sur les suites arithmétiques et géométriques en vidéo (Yvan Monka)", url: "https://youtu.be/05UHsy9G4M4", type: "video" },
    { titre: "Calculer la somme des termes d'une suite géométrique (Yvan Monka)", url: "https://youtu.be/eSDrE1phUXY", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Définition : multiplier toujours par le même nombre",
      figure: "suite-geo",
      video: { titre: "Vidéo de ton prof : suites géométriques, raison et terme général (cours 4/6)", youtube: "https://youtu.be/Nx56kUnM1oI" },
      texte:
        "$(u_n)$ est **géométrique** de raison $q$ si l'on passe d'un terme au suivant en **multipliant** toujours par $q$ : pour tout $n$, $u_{n+1} = q \\times u_n$.\n\n" +
        "- **Terme général** : $u_n = u_0 \\times q^n$, et plus généralement $u_n = u_p \\times q^{n-p}$.\n" +
        "- Si la suite commence à $u_1$ : $u_n = u_1 \\times q^{n-1}$.\n\n" +
        "Pour reconnaître une suite géométrique (à termes non nuls) : le quotient $\\dfrac{u_{n+1}}{u_n}$ est constant. Pour prouver qu'elle ne l'est **pas**, un contre-exemple suffit : deux quotients consécutifs différents.\n\n" +
        "Attention : $u_0 \\times q^n$ n'est pas $(u_0 \\times q)^n$, seule la raison est à la puissance $n$.",
      exemple: {
        enonce: "Les nombres $2$ ; $6$ ; $18$ ; $54$ peuvent-ils être les premiers termes d'une suite géométrique ? Et $3$ ; $6$ ; $9$ ; $12$ ?",
        solution: "$\\dfrac{6}{2} = \\dfrac{18}{6} = \\dfrac{54}{18} = 3$ : oui, raison $3$, et $u_n = 2 \\times 3^n$.\n\n$\\dfrac{6}{3} = 2$ mais $\\dfrac{9}{6} = 1{,}5$ : non (elle est arithmétique de raison $3$)."
      }
    },
    {
      titre: "Démonstration : le terme général",
      video: { titre: "Vidéo d'Yvan Monka : déterminer l'expression générale d'une suite géométrique", youtube: "https://youtu.be/WTmdtbQpa0c" },
      texte:
        "**Propriété** : si $(u_n)$ est géométrique de raison $q$, alors $u_n = u_0 \\times q^n$ pour tout $n$.\n\n" +
        "**Démonstration**. De proche en proche : $u_1 = q\\,u_0$, $u_2 = q\\,u_1 = q^2 u_0$, $u_3 = q\\,u_2 = q^3 u_0$… À chaque étape, on multiplie par $q$ : après $n$ étapes, on a multiplié $n$ fois par $q$, donc $u_n = q^n u_0$.\n\n" +
        "(En Terminale, le raisonnement par récurrence rendra ce « et ainsi de suite » rigoureux.)\n\n" +
        "Si les termes sont non nuls, on peut aussi multiplier les $n$ égalités $\\dfrac{u_{k+1}}{u_k} = q$ pour $k$ de $0$ à $n - 1$ : les termes intermédiaires se simplifient et il reste $\\dfrac{u_n}{u_0} = q^n$.",
      exemple: {
        enonce: "$(w_n)$ est géométrique de raison positive, avec $w_1 = 6$ et $w_4 = 162$. Trouve $q$, $w_0$, puis $w_n$.",
        solution: "De $w_1$ à $w_4$, on multiplie $3$ fois par $q$ : $q^3 = \\dfrac{162}{6} = 27$, donc $q = 3$.\n\nPuis $w_0 = \\dfrac{w_1}{q} = 2$ et $w_n = 2 \\times 3^n$."
      }
    },
    {
      titre: "Évolutions à taux constant",
      figure: "prix-evolution",
      video: { titre: "Vidéo de ton prof : évolution à taux constant, la valeur d'un scooter (exercice corrigé)", youtube: "https://youtu.be/l5z9ZUXsDFA" },
      texte:
        "Augmenter une quantité de $t\\,\\%$, c'est la multiplier par $1 + \\dfrac{t}{100}$ ; la diminuer de $t\\,\\%$, c'est la multiplier par $1 - \\dfrac{t}{100}$.\n\n" +
        "Une quantité qui évolue de $t\\,\\%$ **à chaque étape** (chaque année, chaque heure…) forme une suite géométrique de raison $q = 1 \\pm \\dfrac{t}{100}$ : c'est une croissance (ou une décroissance) **exponentielle**.\n\n" +
        "- **Évolutions successives** : on **multiplie** les coefficients multiplicateurs, on n'additionne pas les pourcentages.\n" +
        "- Sur le schéma, un prix de $100$ € qui augmente de $4\\,\\%$ par an vaut $100 \\times 1{,}04^n$ € au bout de $n$ ans.",
      exemple: {
        enonce: "Le prix du kilo de riz augmente de $5\\,\\%$ par an pendant $3$ ans. A-t-il augmenté de $15\\,\\%$ ?",
        solution: "Non : le coefficient global est $1{,}05^3 = 1{,}157\\,625$, soit une hausse d'environ $15{,}8\\,\\%$. Chaque hausse s'applique au prix **déjà augmenté**."
      }
    },
    {
      titre: "Sens de variation",
      figure: "suite-geo-alterne",
      video: { titre: "Vidéo d'Yvan Monka : déterminer le sens de variation d'une suite géométrique", youtube: "https://youtu.be/vLshnJqW-64" },
      texte:
        "Pour $u_n = u_0 \\times q^n$ avec $u_0 > 0$ :\n\n" +
        "- si $q > 1$ : $(u_n)$ est strictement **croissante** ;\n" +
        "- si $0 < q < 1$ : strictement **décroissante** ;\n" +
        "- si $q = 1$ : constante.\n\n" +
        "Si $u_0 < 0$, c'est l'inverse. Si $q < 0$, les termes changent de signe à chaque rang (schéma) : la suite n'est **ni croissante ni décroissante**.\n\n" +
        "**Démonstration** : $u_{n+1} - u_n = u_0 q^n \\times q - u_0 q^n = u_0 q^n (q - 1)$. Pour $q > 0$, on a $q^n > 0$ : la différence a le signe de $u_0(q - 1)$.",
      exemple: {
        enonce: "Donne le sens de variation de $u_n = -2 \\times 0{,}5^n$ et de $v_n = 3 \\times 1{,}2^n$.",
        solution: "$u_0(q - 1) = -2 \\times (-0{,}5) = 1 > 0$ : $(u_n)$ est croissante (ses termes $-2$, $-1$, $-0{,}5$… remontent vers $0$).\n\n$v_0(q - 1) = 3 \\times 0{,}2 > 0$ : $(v_n)$ est croissante."
      }
    },
    {
      titre: "Somme $1 + q + \\dots + q^n$",
      video: { titre: "Vidéo de ton prof : sommes de termes consécutifs (cours 5/6)", youtube: "https://youtu.be/vP3Ts0VRPd4" },
      texte:
        "**Propriété** : pour tout réel $q \\neq 1$ et tout entier $n$,\n\n" +
        "$1 + q + q^2 + \\dots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$.\n\n" +
        "**Démonstration**. Soit $S = 1 + q + \\dots + q^n$. Alors $qS = q + q^2 + \\dots + q^{n+1}$. En soustrayant, presque tous les termes s'éliminent : $S - qS = 1 - q^{n+1}$, soit $S(1 - q) = 1 - q^{n+1}$. Comme $q \\neq 1$, on peut diviser par $1 - q$.\n\n" +
        "Pour des termes consécutifs d'une suite géométrique de raison $q \\neq 1$ :\n\n" +
        "$S = \\text{premier terme} \\times \\dfrac{1 - q^{\\text{nombre de termes}}}{1 - q}$.\n\n" +
        "Attention : $1 + q + \\dots + q^n$ compte $n + 1$ termes.",
      exemple: {
        enonce: "Calcule $1 + 3 + 9 + \\dots + 3^5$, puis $3 + 6 + 12 + \\dots + 3 \\times 2^7$.",
        solution: "$6$ termes : $\\dfrac{1 - 3^6}{1 - 3} = \\dfrac{-728}{-2} = 364$.\n\n$8$ termes, premier terme $3$ et raison $2$ : $3 \\times \\dfrac{1 - 2^8}{1 - 2} = 3 \\times 255 = 765$."
      }
    },
    {
      titre: "Modéliser : la dose de médicament",
      figure: "medicament",
      texte:
        "Au dispensaire, on injecte $500$ mg d'un médicament. Chaque heure, le corps en élimine $20\\,\\%$ : il en reste $80\\,\\%$. Avec $u_n$ la quantité (en mg) au bout de $n$ heures :\n\n" +
        "$u_0 = 500$ et $u_{n+1} = 0{,}8\\,u_n$, donc $u_n = 500 \\times 0{,}8^n$.\n\n" +
        "- La suite est géométrique de raison $0{,}8$ : elle est **décroissante**, car $u_0 > 0$ et $0 < 0{,}8 < 1$.\n" +
        "- Ses termes se rapprochent de $0$ sans jamais l'atteindre.\n" +
        "- **Seuil** : avec le tableau de valeurs de la calculatrice, $u_7 \\approx 104{,}9$ et $u_8 \\approx 83{,}9$. Il reste moins de $100$ mg à partir de la 8e heure (schéma).",
      exemple: {
        enonce: "Quelle quantité a été éliminée au bout de $3$ heures ?",
        solution: "$u_3 = 500 \\times 0{,}8^3 = 500 \\times 0{,}512 = 256$ mg restent, donc $500 - 256 = 244$ mg ont été éliminés. Ce n'est pas $3 \\times 20\\,\\% = 60\\,\\%$ de la dose ($300$ mg) : chaque heure, on retire $20\\,\\%$ de ce qui **reste**."
      }
    },
    {
      titre: "Une suite auxiliaire géométrique",
      video: { titre: "Vidéo de ton prof : une suite auxiliaire géométrique, la plage (exercice corrigé)", youtube: "https://youtu.be/9a9eqhi2VxE" },
      texte:
        "Une suite définie par $u_{n+1} = a\\,u_n + b$ n'est en général ni arithmétique ni géométrique. On l'étudie avec une **suite auxiliaire** $v_n = u_n - c$, avec $c$ bien choisi, qui elle est géométrique.\n\n" +
        "Exemple : sous perfusion, un patient reçoit $40$ mg de médicament par heure, et son corps en élimine $20\\,\\%$ par heure : $u_0 = 500$ et $u_{n+1} = 0{,}8\\,u_n + 40$.\n\n" +
        "- On pose $v_n = u_n - 200$. Alors $v_{n+1} = 0{,}8\\,u_n + 40 - 200 = 0{,}8(u_n - 200) = 0{,}8\\,v_n$ : $(v_n)$ est géométrique de raison $0{,}8$, avec $v_0 = 300$.\n" +
        "- Donc $v_n = 300 \\times 0{,}8^n$ et $u_n = 200 + 300 \\times 0{,}8^n$.\n" +
        "- La quantité se stabilise autour de $200$ mg.\n\n" +
        "Le nombre $200$ vérifie $c = 0{,}8c + 40$ : c'est la valeur qui ne bouge plus.",
      exemple: {
        enonce: "Calcule $u_2$ de deux façons.",
        solution: "Par récurrence : $u_1 = 0{,}8 \\times 500 + 40 = 440$, puis $u_2 = 0{,}8 \\times 440 + 40 = 392$.\n\nAvec la formule : $u_2 = 200 + 300 \\times 0{,}8^2 = 200 + 192 = 392$."
      }
    },
    {
      titre: "Limite et seuil",
      video: { titre: "Vidéo de ton prof : limite d'une suite et recherche de seuil (cours 6/6)", youtube: "https://youtu.be/ug71_j3MXlo" },
      texte:
        "Comportement de $q^n$ quand $n$ devient très grand (observé ici, démontré en Terminale) :\n\n" +
        "- si $q > 1$ : $q^n$ devient aussi grand qu'on veut, limite $+\\infty$ ;\n" +
        "- si $q = 1$ : $q^n = 1$ pour tout $n$ ;\n" +
        "- si $-1 < q < 1$ : $q^n$ se rapproche de $0$, limite $0$ ;\n" +
        "- si $q \\leqslant -1$ : pas de limite.\n\n" +
        "**Seuil** : si $(u_n)$ est croissante de limite $+\\infty$, pour tout nombre $A$ il existe un **premier** rang $n$ tel que $u_n > A$, et tous les termes suivants dépassent aussi $A$. On le trouve avec le tableau de valeurs de la calculatrice ou avec un programme. Même idée pour une suite décroissante qui passe sous $A$.",
      exemple: {
        enonce: "$u_n = 300 \\times 1{,}1^n$. Conjecture sa limite, puis trouve le premier rang $n$ tel que $u_n > 600$.",
        solution: "$q = 1{,}1 > 1$ et $300 > 0$ : la limite est $+\\infty$.\n\n$u_7 \\approx 584{,}6$ et $u_8 \\approx 643{,}1$ : le seuil est $n = 8$. La quantité a doublé en $8$ étapes."
      }
    },
    {
      titre: "Python : l'algorithme de seuil",
      texte:
        "Pour trouver le premier rang où la quantité de médicament passe sous $A$ mg, on répète le calcul **tant que** le seuil n'est pas atteint : c'est une boucle $\\texttt{while}$.\n\n" +
        "```python\ndef heures(A):\n    u = 500\n    n = 0\n    while u >= A:\n        u = 0.8 * u\n        n = n + 1\n    return n\n```\n\n" +
        "- La boucle continue tant que $u \\geqslant A$.\n" +
        "- À chaque passage : une heure de plus ($n$ augmente de $1$) et $u$ est multiplié par $0{,}8$.\n" +
        "- Elle s'arrête au **premier** rang où $u < A$ : la fonction renvoie ce rang.\n\n" +
        "On ne connaît pas à l'avance le nombre de passages : c'est pour cela qu'on utilise $\\texttt{while}$ et pas $\\texttt{for}$.",
      exemple: {
        enonce: "Que renvoie $\\texttt{heures(100)}$ ?",
        solution: "La boucle s'arrête dès que $u < 100$ : $u_7 \\approx 104{,}9$ et $u_8 \\approx 83{,}9$. La fonction renvoie $8$."
      }
    },
    {
      titre: "Logique : négation et contre-exemple",
      texte:
        "Une suite $(u_n)$ est **majorée** s'il existe un réel $M$ tel que, pour tout $n$, $u_n \\leqslant M$.\n\n" +
        "Pour écrire la **négation**, on échange « il existe » et « pour tout », puis on nie la fin :\n\n" +
        "« $(u_n)$ n'est pas majorée » : pour tout réel $M$, il existe un entier $n$ tel que $u_n > M$.\n\n" +
        "- $u_n = 2^n$ n'est pas majorée : quel que soit $M$, une puissance de $2$ finit par le dépasser.\n" +
        "- $u_n = 8 \\times 0{,}5^n$ est majorée par $8$ : elle décroît depuis $u_0 = 8$.\n\n" +
        "Pour montrer qu'une affirmation « pour tout » est fausse, **un contre-exemple suffit**. Ainsi, « une suite géométrique de raison $q > 1$ est croissante » est faux : avec $u_0 = -1$ et $q = 2$, on obtient $-1$, $-2$, $-4$…",
      exemple: {
        enonce: "Vrai ou faux : « si $(u_n)$ est géométrique, alors $(u_n + 1)$ l'est aussi » ?",
        solution: "Faux. Contre-exemple : $u_n = 2^n$. Les premiers termes de $(u_n + 1)$ sont $2$, $3$, $5$, et $\\dfrac{3}{2} \\neq \\dfrac{5}{3}$."
      }
    },
    {
      titre: "Linéaire ou exponentielle ?",
      figure: "lineaire-exponentiel",
      video: { titre: "Vidéo de ton prof : linéaire ou exponentiel ? Les abonnés de Lagon propre (problème corrigé)", youtube: "https://youtu.be/eUVrDnmVZek" },
      texte:
        "Deux façons de grandir :\n\n" +
        "- **croissance linéaire** : on **ajoute** la même quantité à chaque étape (suite arithmétique) ;\n" +
        "- **croissance exponentielle** : on **multiplie** par le même nombre $q > 1$ (suite géométrique).\n\n" +
        "Sur le schéma, une association de plongée compte $1\\,000$ adhérents. Scénario A : $80$ adhérents de plus par an, $a_n = 1\\,000 + 80n$. Scénario B : $6\\,\\%$ de plus par an, $b_n = 1\\,000 \\times 1{,}06^n$.\n\n" +
        "A part devant, mais B le dépasse à partir de la 11e année et creuse ensuite l'écart : une croissance exponentielle finit toujours par dépasser une croissance linéaire.",
      exemple: {
        enonce: "Compare $a_{10}$ et $b_{10}$, puis $a_{11}$ et $b_{11}$.",
        solution: "$a_{10} = 1\\,800$ et $b_{10} \\approx 1\\,790{,}8$ : A est encore devant.\n\n$a_{11} = 1\\,880$ et $b_{11} \\approx 1\\,898{,}3$ : B est passé devant."
      }
    }
  ],

  videos: [
    { titre: "Exercice 17 · Évolution à taux constant : la valeur d'un scooter", type: "Taux constant", youtube: "https://youtu.be/l5z9ZUXsDFA" },
    { titre: "Exercice 18 · Une suite auxiliaire géométrique : la plage", type: "Suite auxiliaire", youtube: "https://youtu.be/9a9eqhi2VxE" },
    { titre: "Exercice 20 · Calculer des sommes : Gauss et puissances", type: "Sommes", youtube: "https://youtu.be/HvTkzP61KcI" },
    { titre: "Exercice 29 · Linéaire ou exponentiel ? Les abonnés de Lagon propre", type: "Problème", youtube: "https://youtu.be/eUVrDnmVZek" }
  ],
  videosNote: "Énoncés dans le dossier élève ci-dessus (numéros des exercices du dossier).",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "suite-nature", titre: "Arithmétique ou géométrique ?", etape: "Définition", nb: 5 },
    { type: "su-geo-reconnaitre", titre: "Géométrique ou pas ?", etape: "Définition", nb: 5 },
    { type: "suite-geometrique", titre: "Terme général et raison", etape: "Définition", nb: 5 },
    { type: "su-geo-deux-termes", titre: "Retrouver la raison", etape: "Définition", nb: 4 },
    { type: "su-geo-taux", titre: "Évolutions successives des prix", etape: "Taux constant", nb: 5 },
    { type: "su-geo-medicament", titre: "La dose de médicament", etape: "Taux constant", nb: 4 },
    { type: "suite-variation", titre: "Sens de variation", etape: "Variations et limite", nb: 5 },
    { type: "su-geo-limite", titre: "Conjecturer une limite", etape: "Variations et limite", nb: 5 },
    { type: "su-geo-logique", titre: "Négation et contre-exemple", etape: "Variations et limite", nb: 5 },
    { type: "su-geo-somme", titre: "Sommes de termes géométriques", etape: "Sommes et seuils", nb: 5 },
    { type: "suite-seuil", titre: "Chercher un seuil", etape: "Sommes et seuils", nb: 4 },
    { type: "su-geo-python", titre: "Python : l'algorithme de seuil", etape: "Sommes et seuils", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    {
      question: "La suite $3$ ; $6$ ; $12$ ; $24$ ; … est :",
      choix: ["géométrique de raison $2$", "arithmétique de raison $3$", "géométrique de raison $3$", "ni arithmétique ni géométrique"],
      bonne: 0,
      explication: "On multiplie par $2$ à chaque étape : $\\dfrac{6}{3} = \\dfrac{12}{6} = \\dfrac{24}{12} = 2$."
    },
    {
      question: "$(u_n)$ est géométrique avec $u_0 = 5$ et $q = 2$. Combien vaut $u_4$ ?",
      choix: ["$80$", "$40$", "$13$", "$10\\,000$"],
      bonne: 0,
      explication: "$u_4 = 5 \\times 2^4 = 5 \\times 16 = 80$. Attention : $(5 \\times 2)^4 = 10\\,000$ est faux, seule la raison est à la puissance."
    },
    {
      question: "Une suite géométrique commence à $u_1 = 3$, de raison $2$. Son terme général est :",
      choix: ["$u_n = 3 \\times 2^{n-1}$", "$u_n = 3 \\times 2^n$", "$u_n = 3 + 2(n - 1)$", "$u_n = 6^{n-1}$"],
      bonne: 0,
      explication: "De $u_1$ à $u_n$, on multiplie $n - 1$ fois par $2$."
    },
    {
      question: "La suite $u_n = 4^{n+1}$ est géométrique de raison :",
      choix: ["$4$", "$16$", "$n + 1$", "elle n'est pas géométrique"],
      bonne: 0,
      explication: "$u_{n+1} = 4^{n+2} = 4 \\times 4^{n+1} = 4u_n$. Son premier terme est $u_0 = 4$."
    },
    {
      question: "La suite $u_n = 3^{2n}$ est géométrique de raison :",
      choix: ["$3$", "$9$", "$6$", "$2$"],
      bonne: 1,
      explication: "$3^{2n} = (3^2)^n = 9^n$."
    },
    {
      question: "Un prix baisse de $10\\,\\%$ chaque année. La raison de la suite des prix est :",
      choix: ["$0{,}9$", "$0{,}1$", "$-0{,}1$", "$1{,}1$"],
      bonne: 0,
      explication: "Baisser de $10\\,\\%$, c'est multiplier par $1 - 0{,}1 = 0{,}9$."
    },
    {
      question: "Un prix augmente de $20\\,\\%$, puis baisse de $20\\,\\%$. Au total :",
      choix: ["il baisse de $4\\,\\%$", "il revient au prix de départ", "il augmente de $4\\,\\%$", "il baisse de $20\\,\\%$"],
      bonne: 0,
      explication: "$1{,}2 \\times 0{,}8 = 0{,}96$ : c'est une baisse de $4\\,\\%$. La baisse s'applique au prix déjà augmenté."
    },
    {
      question: "Une quantité augmente de $3\\,\\%$ par an. En $10$ ans, elle augmente d'environ :",
      choix: ["$34\\,\\%$", "$30\\,\\%$", "$3\\,\\%$", "$13\\,\\%$"],
      bonne: 0,
      explication: "$1{,}03^{10} \\approx 1{,}344$ : hausse d'environ $34\\,\\%$, plus que $10 \\times 3\\,\\%$."
    },
    {
      question: "La suite $u_n = 5 \\times 0{,}7^n$ est :",
      choix: ["strictement décroissante", "strictement croissante", "ni croissante ni décroissante", "constante"],
      bonne: 0,
      explication: "$u_0 = 5 > 0$ et $0 < 0{,}7 < 1$ : elle est strictement décroissante."
    },
    {
      question: "La suite $u_n = -2 \\times 3^n$ est :",
      choix: ["strictement décroissante", "strictement croissante", "ni croissante ni décroissante", "constante"],
      bonne: 0,
      explication: "$u_0(q - 1) = -2 \\times 2 < 0$ : elle est décroissante ($-2$, $-6$, $-18$…)."
    },
    {
      question: "La suite $u_n = 4 \\times (-2)^n$ est :",
      choix: ["strictement croissante", "strictement décroissante", "ni croissante ni décroissante", "constante"],
      bonne: 2,
      explication: "La raison est négative : $4$, $-8$, $16$, $-32$… Les termes changent de signe, la suite n'est pas monotone."
    },
    {
      question: "$1 + 2 + 2^2 + \\dots + 2^9$ vaut :",
      choix: ["$1\\,023$", "$511$", "$1\\,024$", "$2\\,047$"],
      bonne: 0,
      explication: "$10$ termes : $\\dfrac{1 - 2^{10}}{1 - 2} = 2^{10} - 1 = 1\\,023$."
    },
    {
      question: "Combien y a-t-il de termes dans $1 + q + q^2 + \\dots + q^n$ ?",
      choix: ["$n + 1$", "$n$", "$n - 1$", "$2n$"],
      bonne: 0,
      explication: "Les exposants vont de $0$ à $n$ : cela fait $n + 1$ termes, d'où le $q^{n+1}$ dans la formule."
    },
    {
      question: "$(u_n)$ est géométrique avec $u_0 = 2$ et $q = 3$. Que vaut $u_0 + u_1 + \\dots + u_4$ ?",
      choix: ["$242$", "$80$", "$162$", "$728$"],
      bonne: 0,
      explication: "$5$ termes : $2 \\times \\dfrac{1 - 3^5}{1 - 3} = 2 \\times 121 = 242$."
    },
    {
      question: "Quelle est la limite de $u_n = 1\\,000 \\times 0{,}3^n$ ?",
      choix: ["$0$", "$+\\infty$", "$1\\,000$", "Pas de limite"],
      bonne: 0,
      explication: "$-1 < 0{,}3 < 1$ : $0{,}3^n$ se rapproche de $0$, donc $u_n$ aussi."
    },
    {
      question: "Quelle est la limite de $u_n = 150 \\times 1{,}02^n$ ?",
      choix: ["$+\\infty$", "$150$", "$0$", "Pas de limite"],
      bonne: 0,
      explication: "$1{,}02 > 1$ : $1{,}02^n$ devient aussi grand qu'on veut, même si la croissance est lente au début."
    },
    {
      question: "La suite $u_n = 5 \\times (-3)^n$ :",
      choix: ["n'a pas de limite", "a pour limite $+\\infty$", "a pour limite $0$", "a pour limite $-\\infty$"],
      bonne: 0,
      explication: "$q = -3 \\leqslant -1$ : les termes changent de signe en s'éloignant de $0$. Pas de limite."
    },
    {
      question: "$u_n = 1\\,000 \\times 0{,}5^n$. Quel est le premier rang $n$ tel que $u_n < 100$ ?",
      choix: ["$4$", "$3$", "$5$", "$10$"],
      bonne: 0,
      explication: "$u_3 = 125$ et $u_4 = 62{,}5$ : le seuil est $n = 4$."
    },
    {
      question: "Dans l'algorithme de seuil, pourquoi utilise-t-on une boucle $\\texttt{while}$ plutôt qu'une boucle $\\texttt{for}$ ?",
      choix: ["On ne connaît pas à l'avance le nombre de passages", "$\\texttt{while}$ calcule plus vite", "$\\texttt{for}$ ne peut pas multiplier", "$\\texttt{for}$ ne marche qu'avec des entiers"],
      bonne: 0,
      explication: "$\\texttt{for}$ répète un nombre de fois fixé à l'avance ; $\\texttt{while}$ répète tant qu'une condition est vraie, ce qui convient pour chercher un seuil inconnu."
    },
    {
      question: "« $(u_n)$ n'est pas majorée » signifie :",
      choix: ["pour tout réel $M$, il existe $n$ tel que $u_n > M$", "il existe un réel $M$ tel que, pour tout $n$, $u_n > M$", "$(u_n)$ est minorée", "$(u_n)$ est croissante"],
      bonne: 0,
      explication: "Négation de « il existe $M$, pour tout $n$, $u_n \\leqslant M$ » : on échange les quantificateurs et on nie la fin."
    },
    {
      question: "Vrai ou faux : « une suite géométrique de raison $q > 1$ est toujours croissante ».",
      choix: ["Vrai", "Faux"],
      bonne: 1,
      explication: "Faux. Contre-exemple : $u_0 = -1$ et $q = 2$ donnent $-1$, $-2$, $-4$… Il faut aussi $u_0 > 0$."
    },
    {
      question: "$u_{n+1} = 0{,}5\\,u_n + 10$ et $v_n = u_n - 20$. Alors $(v_n)$ est :",
      choix: ["géométrique de raison $0{,}5$", "arithmétique de raison $10$", "géométrique de raison $10$", "constante"],
      bonne: 0,
      explication: "$v_{n+1} = 0{,}5\\,u_n + 10 - 20 = 0{,}5(u_n - 20) = 0{,}5\\,v_n$."
    },
    {
      question: "Laquelle de ces situations se modélise par une suite géométrique ?",
      choix: ["Une population qui augmente de $2\\,\\%$ par an", "Un salaire qui augmente de $50$ € par an", "Un réservoir qui perd $3$ L par heure", "Des gradins qui gagnent $4$ places par rang"],
      bonne: 0,
      explication: "Un pourcentage constant revient à multiplier par le même nombre ($1{,}02$). Les trois autres ajoutent ou retirent une quantité fixe : suites arithmétiques."
    }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Démontrer qu'une suite est (ou n'est pas) géométrique",
      etapes: [
        "Exprimer $u_{n+1}$, puis faire apparaître $u_{n+1} = q \\times u_n$ avec $q$ indépendant de $n$.",
        "Si les termes sont non nuls, on peut aussi montrer que $\\dfrac{u_{n+1}}{u_n}$ est constant.",
        "Pour prouver qu'elle ne l'est pas : calculer $u_0$, $u_1$, $u_2$ et constater que $\\dfrac{u_1}{u_0} \\neq \\dfrac{u_2}{u_1}$."
      ],
      exemple: "$u_n = 5 \\times 3^{n+1}$ : $u_{n+1} = 5 \\times 3^{n+2} = 3 \\times (5 \\times 3^{n+1}) = 3u_n$. Géométrique de raison $3$, avec $u_0 = 15$."
    },
    {
      titre: "Trouver le terme général à partir de deux termes",
      etapes: [
        "Écrire $u_n = u_p \\times q^{n-p}$, donc $q^{n-p} = \\dfrac{u_n}{u_p}$.",
        "En déduire $q$ (si l'exposant est pair, il faut savoir si la raison est positive).",
        "Puis $u_0 = \\dfrac{u_p}{q^p}$ et $u_n = u_0 \\times q^n$."
      ],
      exemple: "$u_2 = 12$ et $u_5 = 96$ : $q^3 = 8$, donc $q = 2$, $u_0 = \\dfrac{12}{4} = 3$ et $u_n = 3 \\times 2^n$."
    },
    {
      titre: "Traduire des évolutions en pourcentage",
      etapes: [
        "Hausse de $t\\,\\%$ : coefficient $1 + \\dfrac{t}{100}$ ; baisse de $t\\,\\%$ : coefficient $1 - \\dfrac{t}{100}$.",
        "Évolutions successives : multiplier les coefficients.",
        "Taux global $=$ (coefficient global $- 1$) $\\times 100$."
      ],
      exemple: "$+10\\,\\%$ puis $-10\\,\\%$ : $1{,}1 \\times 0{,}9 = 0{,}99$, soit une baisse de $1\\,\\%$."
    },
    {
      titre: "Étudier le sens de variation",
      etapes: [
        "Écrire $u_n = u_0 \\times q^n$.",
        "Si $q < 0$ : la suite n'est ni croissante ni décroissante.",
        "Si $q > 0$ : regarder le signe de $u_0(q - 1)$. Positif, la suite est croissante ; négatif, décroissante."
      ],
      exemple: "$u_n = -3 \\times 0{,}5^n$ : $u_0(q - 1) = -3 \\times (-0{,}5) > 0$, la suite est croissante."
    },
    {
      titre: "Calculer une somme de termes consécutifs",
      etapes: [
        "Repérer le premier terme et la raison $q \\neq 1$.",
        "Compter les termes : de $u_0$ à $u_n$, il y en a $n + 1$.",
        "Appliquer $S = \\text{premier terme} \\times \\dfrac{1 - q^{\\text{nombre de termes}}}{1 - q}$."
      ],
      exemple: "$2 + 6 + 18 + \\dots + 2 \\times 3^5$ : $6$ termes, $S = 2 \\times \\dfrac{1 - 3^6}{1 - 3} = 728$."
    },
    {
      titre: "Déterminer un seuil",
      etapes: [
        "Vérifier le sens de variation, pour être sûr que le seuil reste franchi ensuite.",
        "Calculer les termes avec le tableau de valeurs de la calculatrice, ou programmer une boucle $\\texttt{while}$.",
        "Conclure avec deux termes consécutifs : l'un avant le seuil, l'autre après."
      ],
      exemple: "$u_n = 300 \\times 1{,}1^n$ : $u_7 \\approx 584{,}6 \\leqslant 600$ et $u_8 \\approx 643{,}1 > 600$, donc $n = 8$."
    },
    {
      titre: "Nier une phrase, réfuter avec un contre-exemple",
      etapes: [
        "Repérer les « pour tout » et les « il existe ».",
        "Pour nier : « pour tout » devient « il existe », « il existe » devient « pour tout », et on nie la conclusion.",
        "Une affirmation « pour tout » est fausse dès qu'on trouve un seul contre-exemple."
      ],
      exemple: "« $(u_n)$ est majorée » : il existe $M$ tel que, pour tout $n$, $u_n \\leqslant M$. Négation : pour tout $M$, il existe $n$ tel que $u_n > M$."
    }
  ],
  erreurs: [
    "Écrire $(u_0 \\times q)^n$ au lieu de $u_0 \\times q^n$ : seule la raison est à la puissance $n$.",
    "Prendre le taux pour la raison : une baisse de $20\\,\\%$ donne $q = 0{,}8$, pas $0{,}2$.",
    "Additionner des pourcentages successifs : $+5\\,\\%$ pendant $3$ ans, ce n'est pas $+15\\,\\%$.",
    "Oublier que la suite commence à $u_1$ : alors $u_n = u_1 \\times q^{n-1}$.",
    "Se tromper dans le nombre de termes : $1 + q + \\dots + q^n$ en compte $n + 1$.",
    "Dire qu'une suite de raison $q > 1$ est croissante sans regarder le signe de $u_0$.",
    "Croire qu'une suite qui tend vers $0$ finit par valoir $0$ : $500 \\times 0{,}8^n$ n'est jamais nul.",
    "Confondre $n$ (le rang, que renvoie la boucle) et $u$ (la valeur du terme) dans l'algorithme de seuil.",
    "Nier « majorée » par « minorée » : la négation est « pour tout $M$, il existe $n$ tel que $u_n > M$ »."
  ]
};
