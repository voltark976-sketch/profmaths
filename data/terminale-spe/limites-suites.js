/*
  CHAPITRE : Terminale spécialité — Limites de suites
  ----------------------------------------------------
  Chapitre 4 de la progression de Terminale spécialité (V26, période 2, 2 semaines) :
  définition des limites, limites et opérations, limites et comparaison, suites géométriques, suites monotones.
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Vidéos : celle de la chaîne (rappel de Première) d'abord, puis Yvan Monka (cours 20SuitesTS2).
  Figure : "lsu-limite". Générateurs : lsu- dans assets/exercices.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-spe-limites-suites"] = {
  niveau: "Terminale spécialité",
  numero: 4,
  titre: "Limites de suites",
  accroche: "Où vont les termes d'une suite quand $n$ devient très grand ? Calculer une limite, lever une forme indéterminée, encadrer, et utiliser les suites géométriques et monotones.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Démonstration : limite de qⁿ (Yvan Monka)", url: "https://youtu.be/aSBGk_GEEew", type: "video" },
    { titre: "Démonstration : une suite croissante non majorée tend vers +∞ (Yvan Monka)", url: "https://youtu.be/rttQIYOKCRQ", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Limite finie, limite infinie",
      figure: "lsu-limite",
      video: { titre: "Vidéo de ton prof (rappel de Première) : limite d'une suite et recherche de seuil", youtube: "https://youtu.be/ug71_j3MXlo" },
      texte:
        "- La suite $(u_n)$ **converge vers le réel $\\ell$** si tout intervalle ouvert contenant $\\ell$ contient **tous les termes à partir d'un certain rang**. On note $\\lim\\limits_{n \\to +\\infty} u_n = \\ell$. Cette limite est unique.\n" +
        "- $(u_n)$ **tend vers $+\\infty$** si, pour tout réel $A$, l'intervalle $]A\\,;+\\infty[$ contient tous les termes à partir d'un certain rang : la suite finit par dépasser n'importe quel nombre, et reste au-dessus.\n" +
        "- De même pour $-\\infty$ avec les intervalles $]-\\infty\\,;A[$.\n" +
        "- Une suite qui ne converge pas est dite **divergente** : elle tend vers $\\pm\\infty$, ou n'a pas de limite, comme $(-1)^n$.\n\n" +
        "**Limites de référence** : $n$, $n^2$, $n^3$, $\\sqrt{n}$ tendent vers $+\\infty$ ; $\\dfrac{1}{n}$, $\\dfrac{1}{n^2}$, $\\dfrac{1}{n^3}$, $\\dfrac{1}{\\sqrt{n}}$ tendent vers $0$.",
      exemple: {
        enonce: "On pose $u_n = \\dfrac{1}{n}$ pour $n \\geqslant 1$. À partir de quel rang a-t-on $u_n \\in \\left]-0{,}001\\,;0{,}001\\right[$ ?",
        solution: "$u_n > 0$ toujours, et $\\dfrac{1}{n} < 0{,}001 \\iff n > 1\\,000$.\n\nÀ partir du rang $1\\,001$, tous les termes sont dans l'intervalle. On pourrait faire de même avec n'importe quel intervalle autour de $0$ : $u_n \\to 0$."
      }
    },
    {
      titre: "Limites et opérations",
      video: { titre: "Vidéo d'Yvan Monka : calculer la limite d'une suite à l'aide des formules d'opération", youtube: "https://youtu.be/v7hD6s3thp8" },
      texte:
        "On combine les limites comme les nombres, avec ces règles pour l'infini ($\\ell$ réel) :\n\n" +
        "- **Somme** : $\\ell + (+\\infty) = +\\infty$ ; $+\\infty + (+\\infty) = +\\infty$ ; $-\\infty + (-\\infty) = -\\infty$.\n" +
        "- **Produit** : $\\ell \\times (+\\infty) = \\pm\\infty$ selon le signe de $\\ell \\neq 0$ ; $\\infty \\times \\infty = \\infty$ avec la règle des signes.\n" +
        "- **Quotient** : $\\dfrac{\\ell}{\\pm\\infty} = 0$ ; $\\dfrac{\\pm\\infty}{\\ell} = \\pm\\infty$ (règle des signes) ; $\\dfrac{\\ell}{0}$ (avec $\\ell \\neq 0$) donne $\\pm\\infty$ si l'on connaît le signe du dénominateur.\n\n" +
        "Quatre cas où l'on ne peut pas conclure directement, les **formes indéterminées** : « $+\\infty - \\infty$ », « $0 \\times \\infty$ », « $\\dfrac{\\infty}{\\infty}$ » et « $\\dfrac{0}{0}$ ».",
      exemple: {
        enonce: "Détermine la limite de $u_n = 3n^2 + \\dfrac{5}{n} - 1$ et de $v_n = \\dfrac{-2}{n^2 + 1}$.",
        solution: "$3n^2 \\to +\\infty$ et $\\dfrac{5}{n} - 1 \\to -1$ : par somme, $u_n \\to +\\infty$.\n\n$n^2 + 1 \\to +\\infty$, donc $\\dfrac{-2}{n^2 + 1} \\to 0$ : $v_n \\to 0$."
      }
    },
    {
      titre: "Lever une forme indéterminée",
      video: { titre: "Vidéo d'Yvan Monka : calculer la limite d'une suite avec une forme indéterminée", youtube: "https://youtu.be/RQhdU7-KLMA" },
      texte:
        "Une forme indéterminée ne veut pas dire « pas de limite » : il faut **transformer l'écriture**.\n\n" +
        "- **Polynôme** : on factorise par le terme de plus haut degré. Par exemple, $n^2 - 5n = n^2\\left(1 - \\dfrac{5}{n}\\right) \\to +\\infty$.\n" +
        "- **Quotient** : on factorise le numérateur et le dénominateur par leurs termes dominants, puis on simplifie. Par exemple, $\\dfrac{4n + 1}{2n - 3} = \\dfrac{4 + \\frac{1}{n}}{2 - \\frac{3}{n}} \\to 2$.\n" +
        "- **Racines carrées** : on factorise, ou on multiplie par la **quantité conjuguée** : $\\sqrt{n + 1} - \\sqrt{n} = \\dfrac{1}{\\sqrt{n + 1} + \\sqrt{n}} \\to 0$.\n\n" +
        "Pour un quotient de polynômes : si les degrés sont égaux, la limite est le quotient des coefficients dominants ; si le degré du haut est plus petit, la limite est $0$ ; s'il est plus grand, la limite est infinie.",
      exemple: {
        enonce: "Détermine la limite de $u_n = \\dfrac{3n^2 - n}{1 - 2n^2}$.",
        solution: "Forme « $\\dfrac{\\infty}{\\infty}$ ». On factorise par $n^2$ : $u_n = \\dfrac{n^2\\left(3 - \\frac{1}{n}\\right)}{n^2\\left(\\frac{1}{n^2} - 2\\right)} = \\dfrac{3 - \\frac{1}{n}}{\\frac{1}{n^2} - 2}$.\n\nLe numérateur tend vers $3$, le dénominateur vers $-2$ : $u_n \\to -\\dfrac{3}{2}$."
      }
    },
    {
      titre: "Limites et comparaison",
      video: { titre: "Vidéo d'Yvan Monka : calculer une limite à l'aide du théorème de comparaison", youtube: "https://youtu.be/iQhh46LupN4" },
      texte:
        "- **Comparaison** : si $u_n \\geqslant v_n$ à partir d'un certain rang et $\\lim v_n = +\\infty$, alors $\\lim u_n = +\\infty$ (démonstration au programme). De même, si $u_n \\leqslant w_n$ et $\\lim w_n = -\\infty$, alors $\\lim u_n = -\\infty$.\n" +
        "- **Théorème des gendarmes** (ou d'encadrement) : si $v_n \\leqslant u_n \\leqslant w_n$ à partir d'un certain rang et si $(v_n)$ et $(w_n)$ convergent vers le **même** réel $\\ell$, alors $(u_n)$ converge vers $\\ell$.\n" +
        "- **Passage à la limite** : si $u_n \\leqslant v_n$ et que les deux convergent, alors $\\lim u_n \\leqslant \\lim v_n$ (les inégalités strictes deviennent larges).\n\n" +
        "Ces théorèmes servent quand la suite contient un terme sans limite mais **borné**, comme $(-1)^n$, $\\cos(n)$ ou $\\sin(n)$, compris entre $-1$ et $1$.",
      exemple: {
        enonce: "Détermine la limite de $u_n = \\dfrac{\\sin(n)}{n} + 2$ et de $v_n = n^2 - \\cos(n)$.",
        solution: "$-\\dfrac{1}{n} \\leqslant \\dfrac{\\sin(n)}{n} \\leqslant \\dfrac{1}{n}$, donc $2 - \\dfrac{1}{n} \\leqslant u_n \\leqslant 2 + \\dfrac{1}{n}$ : par les gendarmes, $u_n \\to 2$.\n\n$-\\cos(n) \\geqslant -1$, donc $v_n \\geqslant n^2 - 1$, qui tend vers $+\\infty$ : par comparaison, $v_n \\to +\\infty$."
      }
    },
    {
      titre: "Suites géométriques",
      video: { titre: "Vidéo d'Yvan Monka : calculer la limite d'une suite géométrique", youtube: "https://youtu.be/F-PGmIK5Ypg" },
      texte:
        "**Limite de $q^n$** :\n\n" +
        "- si $q > 1$, $\\lim q^n = +\\infty$ (démonstration au programme, avec l'inégalité de Bernoulli) ;\n" +
        "- si $q = 1$, $q^n = 1$ ;\n" +
        "- si $-1 < q < 1$, $\\lim q^n = 0$ ;\n" +
        "- si $q \\leqslant -1$, $(q^n)$ n'a pas de limite.\n\n" +
        "Pour $u_n = u_0 \\times q^n$, on multiplie par $u_0$ (attention à son signe).\n\n" +
        "**Somme** : si $-1 < q < 1$, $1 + q + \\dots + q^n = \\dfrac{1 - q^{n+1}}{1 - q} \\to \\dfrac{1}{1 - q}$.",
      exemple: {
        enonce: "Détermine les limites de $u_n = 5 - 3 \\times 0{,}8^n$ et de $S_n = 1 + \\dfrac{1}{2} + \\dfrac{1}{4} + \\dots + \\dfrac{1}{2^n}$.",
        solution: "$-1 < 0{,}8 < 1$, donc $0{,}8^n \\to 0$ et $u_n \\to 5$.\n\n$S_n = \\dfrac{1 - \\left(\\frac{1}{2}\\right)^{n+1}}{1 - \\frac{1}{2}} = 2\\left(1 - \\left(\\tfrac{1}{2}\\right)^{n+1}\\right) \\to 2$."
      }
    },
    {
      titre: "Suites monotones",
      video: { titre: "Vidéo d'Yvan Monka : appliquer le théorème de convergence monotone", youtube: "https://youtu.be/gO-MQUlBAfo" },
      texte:
        "**Théorème de convergence monotone** (admis) :\n\n" +
        "- une suite **croissante et majorée** converge ;\n" +
        "- une suite **décroissante et minorée** converge.\n\n" +
        "Le théorème dit que la limite **existe**, sans la donner : si $(u_n)$ est croissante et majorée par $M$, sa limite $\\ell$ vérifie $\\ell \\leqslant M$, mais n'est pas forcément égale à $M$.\n\n" +
        "**Suites non bornées** (démonstration au programme) : une suite croissante non majorée tend vers $+\\infty$ ; une suite décroissante non minorée tend vers $-\\infty$.\n\n" +
        "Être seulement bornée ne suffit pas : $(-1)^n$ est bornée et n'a pas de limite.",
      exemple: {
        enonce: "On a montré (chapitre 1) que la suite $u_0 = 1$, $u_{n+1} = \\sqrt{u_n + 6}$ est croissante et que $0 \\leqslant u_n \\leqslant 3$. Que peut-on en déduire ?",
        solution: "$(u_n)$ est croissante et majorée par $3$ : d'après le théorème de convergence monotone, elle converge vers un réel $\\ell$, avec $\\ell \\leqslant 3$.\n\nLa notion suivante permet de trouver $\\ell$."
      }
    },
    {
      titre: "Trouver la limite d'une suite $u_{n+1} = f(u_n)$",
      video: { titre: "Vidéo d'Yvan Monka : étudier une suite définie par une relation de récurrence à l'aide d'une fonction", youtube: "https://youtu.be/L7bBL4z-r90" },
      texte:
        "Si $(u_n)$ converge vers $\\ell$ et si $f$ est **continue** (notion du chapitre 7 ; c'est le cas des fonctions usuelles sur leur ensemble de définition), alors, en passant à la limite dans $u_{n+1} = f(u_n)$ :\n\n" +
        "$\\ell = f(\\ell)$.\n\n" +
        "La limite est donc une solution de l'équation $f(x) = x$ (un **point fixe** de $f$). S'il y a plusieurs solutions, on choisit grâce aux encadrements connus.\n\n" +
        "Attention : il faut d'abord **savoir** que la suite converge (par exemple avec le théorème de convergence monotone). L'équation $\\ell = f(\\ell)$ ne prouve pas la convergence.",
      exemple: {
        enonce: "Termine l'étude : $u_{n+1} = \\sqrt{u_n + 6}$ converge vers $\\ell$ avec $0 \\leqslant \\ell \\leqslant 3$. Calcule $\\ell$.",
        solution: "En passant à la limite : $\\ell = \\sqrt{\\ell + 6}$, donc $\\ell^2 = \\ell + 6$, soit $\\ell^2 - \\ell - 6 = 0$.\n\nLes solutions sont $3$ et $-2$. Comme $\\ell \\geqslant 0$, $\\ell = 3$."
      }
    },
    {
      titre: "Algorithmique : seuils et limites",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un seuil pour une suite en Python", youtube: "https://youtu.be/vJmpzwhaka8" },
      texte:
        "La définition de la limite se traduit par des programmes de **seuil** :\n\n" +
        "- si $u_n \\to +\\infty$, pour tout $A$, la boucle $\\texttt{while u <= A}$ finit par s'arrêter ;\n" +
        "- si $u_n \\to \\ell$, pour toute précision $e$, la boucle $\\texttt{while abs(u - l) > e}$ finit par s'arrêter.\n\n" +
        "```python\ndef seuil(e):\n    u = 0\n    n = 0\n    while abs(u - 4) > e:\n        u = 0.5 * u + 2\n        n = n + 1\n    return n\n```\n\n" +
        "$\\texttt{abs(u - 4)}$ est la distance entre $u_n$ et la limite $4$. Plus $e$ est petit, plus le rang renvoyé est grand.",
      exemple: {
        enonce: "Que renvoie $\\texttt{seuil(0.1)}$ ?",
        solution: "L'écart à $4$ vaut $4$ au départ et il est divisé par $2$ à chaque étape : $4$, $2$, $1$, $0{,}5$, $0{,}25$, $0{,}125$, $0{,}0625$.\n\nIl passe sous $0{,}1$ au rang $6$ : la fonction renvoie $6$."
      }
    }
  ],

  videos: [
    { titre: "Limite avec une forme indéterminée (2)", type: "Forme indéterminée", youtube: "https://youtu.be/wkMleHBnyqU" },
    { titre: "Limite avec une forme indéterminée (3)", type: "Forme indéterminée", youtube: "https://youtu.be/loytWsU4pdQ" },
    { titre: "Limite à l'aide du théorème d'encadrement", type: "Gendarmes", youtube: "https://youtu.be/OdzYjz_vQbw" },
    { titre: "Limite d'une somme de termes d'une suite géométrique", type: "Géométrique", youtube: "https://youtu.be/6QjMEzEn5X0" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "lsu-reference", titre: "Limites de référence", etape: "Calculer des limites", nb: 5 },
    { type: "lsu-formes", titre: "Opérations et formes indéterminées", etape: "Calculer des limites", nb: 6 },
    { type: "lsu-operations", titre: "Lever une forme indéterminée", etape: "Calculer des limites", nb: 5 },
    { type: "lsu-geometrique", titre: "Suites géométriques", etape: "Calculer des limites", nb: 5 },
    { type: "lsu-comparaison", titre: "Comparaison et gendarmes", etape: "Comparer", nb: 5 },
    { type: "lsu-monotone", titre: "Convergence monotone", etape: "Comparer", nb: 4 },
    { type: "lsu-point-fixe", titre: "Limite d'une suite récurrente", etape: "Comparer", nb: 4 },
    { type: "lsu-seuil", titre: "À partir de quel rang ?", etape: "Algorithmique", nb: 4 },
    { type: "lsu-python", titre: "Seuils en Python", etape: "Algorithmique", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Dire que $(u_n)$ converge vers $5$ signifie :", choix: ["tout intervalle ouvert contenant $5$ contient tous les termes à partir d'un certain rang", "certains termes sont égaux à $5$", "$u_n < 5$ pour tout $n$", "les termes s'approchent de $5$ sans jamais l'atteindre"], bonne: 0, explication: "C'est la définition. Une suite constante égale à $5$ converge aussi vers $5$." },
    { question: "Quelle est la limite de $u_n = 4 - \\dfrac{3}{n^2}$ ?", choix: ["$4$", "$1$", "$+\\infty$", "$-3$"], bonne: 0, explication: "$\\dfrac{3}{n^2} \\to 0$, donc $u_n \\to 4$." },
    { question: "Quelle est la limite de $u_n = -2n^3 + 7$ ?", choix: ["$-\\infty$", "$+\\infty$", "$7$", "$-2$"], bonne: 0, explication: "$n^3 \\to +\\infty$ et on multiplie par $-2 < 0$." },
    { question: "Laquelle de ces formes est indéterminée ?", choix: ["$+\\infty - \\infty$", "$+\\infty + \\infty$", "$\\dfrac{3}{+\\infty}$", "$2 \\times (+\\infty)$"], bonne: 0, explication: "Les autres donnent $+\\infty$, $0$ et $+\\infty$." },
    { question: "$\\lim u_n = 0$ et $\\lim v_n = +\\infty$. Alors $\\lim u_n v_n$ :", choix: ["on ne peut pas conclure sans plus d'informations", "vaut $0$", "vaut $+\\infty$", "vaut $1$"], bonne: 0, explication: "« $0 \\times \\infty$ » est une forme indéterminée : par exemple $\\dfrac{1}{n} \\times n^2 \\to +\\infty$ mais $\\dfrac{1}{n^2} \\times n \\to 0$." },
    { question: "Quelle est la limite de $u_n = n^2 - 10n$ ?", choix: ["$+\\infty$", "$-\\infty$", "$0$", "on ne peut pas savoir"], bonne: 0, explication: "Forme « $+\\infty - \\infty$ » levée par factorisation : $n^2\\left(1 - \\dfrac{10}{n}\\right) \\to +\\infty$." },
    { question: "Quelle est la limite de $u_n = \\dfrac{2n + 5}{3n - 1}$ ?", choix: ["$\\dfrac{2}{3}$", "$-5$", "$+\\infty$", "$1$"], bonne: 0, explication: "Même degré : quotient des coefficients dominants." },
    { question: "Quelle est la limite de $u_n = \\dfrac{n + 1}{n^2 + 4}$ ?", choix: ["$0$", "$1$", "$+\\infty$", "$\\dfrac{1}{4}$"], bonne: 0, explication: "Le degré du dénominateur est plus grand : $u_n = \\dfrac{1}{n} \\times \\dfrac{1 + \\frac{1}{n}}{1 + \\frac{4}{n^2}} \\to 0$." },
    { question: "Quelle est la limite de $u_n = \\sqrt{n + 3} - \\sqrt{n}$ ?", choix: ["$0$", "$3$", "$+\\infty$", "$\\sqrt{3}$"], bonne: 0, explication: "Quantité conjuguée : $u_n = \\dfrac{3}{\\sqrt{n + 3} + \\sqrt{n}} \\to 0$." },
    { question: "Quelle est la limite de $u_n = 1{,}01^n$ ?", choix: ["$+\\infty$", "$1$", "$1{,}01$", "$0$"], bonne: 0, explication: "$q = 1{,}01 > 1$ : même très lentement, $q^n \\to +\\infty$." },
    { question: "Quelle est la limite de $u_n = (-0{,}7)^n$ ?", choix: ["$0$", "pas de limite", "$-\\infty$", "$-0{,}7$"], bonne: 0, explication: "$-1 < -0{,}7 < 1$ : $q^n \\to 0$, en changeant de signe." },
    { question: "La suite $u_n = (-2)^n$ :", choix: ["n'a pas de limite", "tend vers $+\\infty$", "tend vers $-\\infty$", "tend vers $0$"], bonne: 0, explication: "Les termes valent $1$, $-2$, $4$, $-8$… : ils changent de signe en grandissant." },
    { question: "Quelle est la limite de $S_n = 1 + 0{,}5 + 0{,}5^2 + \\dots + 0{,}5^n$ ?", choix: ["$2$", "$1{,}5$", "$+\\infty$", "$1$"], bonne: 0, explication: "$S_n = \\dfrac{1 - 0{,}5^{n+1}}{1 - 0{,}5} \\to \\dfrac{1}{0{,}5} = 2$." },
    { question: "Si $u_n \\geqslant n + \\cos(n)$ pour tout $n$, alors :", choix: ["$u_n \\to +\\infty$", "$u_n \\to 0$", "$u_n$ n'a pas de limite", "on ne peut rien dire"], bonne: 0, explication: "$n + \\cos(n) \\geqslant n - 1 \\to +\\infty$ ; par comparaison, $u_n \\to +\\infty$." },
    { question: "Si $1 - \\dfrac{1}{n} \\leqslant u_n \\leqslant 1 + \\dfrac{2}{n}$, alors :", choix: ["$u_n \\to 1$", "$u_n \\to 0$", "$u_n$ est constante", "on ne peut rien dire"], bonne: 0, explication: "Les deux bornes tendent vers $1$ : théorème des gendarmes." },
    { question: "Quelle est la limite de $u_n = \\dfrac{\\cos(n)}{n}$ ?", choix: ["$0$", "pas de limite", "$1$", "$+\\infty$"], bonne: 0, explication: "$-\\dfrac{1}{n} \\leqslant u_n \\leqslant \\dfrac{1}{n}$ : gendarmes." },
    { question: "Une suite croissante et majorée par $10$ :", choix: ["converge vers une limite inférieure ou égale à $10$", "converge vers $10$", "tend vers $+\\infty$", "peut ne pas avoir de limite"], bonne: 0, explication: "Théorème de convergence monotone ; la limite n'est pas forcément le majorant donné." },
    { question: "Une suite croissante et non majorée :", choix: ["tend vers $+\\infty$", "converge", "n'a pas de limite", "tend vers $0$"], bonne: 0, explication: "Elle dépasse tout réel $A$, et reste au-dessus puisqu'elle croît." },
    { question: "Une suite bornée :", choix: ["n'a pas forcément de limite", "converge toujours", "est toujours monotone", "tend vers $0$"], bonne: 0, explication: "Contre-exemple : $(-1)^n$, bornée entre $-1$ et $1$, sans limite." },
    { question: "On sait que $u_{n+1} = 0{,}5u_n + 3$ converge. Sa limite est :", choix: ["$6$", "$3$", "$1{,}5$", "$0$"], bonne: 0, explication: "$\\ell = 0{,}5\\ell + 3 \\iff 0{,}5\\ell = 3 \\iff \\ell = 6$." },
    { question: "On sait que $u_{n+1} = \\sqrt{2u_n + 8}$ converge vers $\\ell \\geqslant 0$. Alors $\\ell$ vaut :", choix: ["$4$", "$-2$", "$8$", "$2$"], bonne: 0, explication: "$\\ell^2 = 2\\ell + 8$, soit $\\ell^2 - 2\\ell - 8 = 0$ : solutions $4$ et $-2$, on garde $4$." },
    { question: "Si $u_n < 3$ pour tout $n$ et $u_n \\to \\ell$, alors :", choix: ["$\\ell \\leqslant 3$", "$\\ell < 3$", "$\\ell = 3$", "$\\ell \\geqslant 3$"], bonne: 0, explication: "Par passage à la limite, l'inégalité stricte devient large : $3 - \\dfrac{1}{n} < 3$ mais tend vers $3$." },
    { question: "À partir de quel rang a-t-on $\\dfrac{1}{n} < 0{,}001$ ?", choix: ["$1\\,001$", "$1\\,000$", "$100$", "$999$"], bonne: 0, explication: "$\\dfrac{1}{n} < 0{,}001 \\iff n > 1\\,000$." },
    { question: "La boucle $\\texttt{while u <= A}$ d'un programme de seuil s'arrête toujours si :", choix: ["$u_n \\to +\\infty$", "$u_n \\to 0$", "$(u_n)$ est décroissante", "$(u_n)$ est bornée"], bonne: 0, explication: "Si $u_n \\to +\\infty$, les termes finissent par dépasser tout réel $A$." },
    { question: "Quelle est la limite de $u_n = 3 \\times 2^n - 5^n$ ?", choix: ["$-\\infty$", "$+\\infty$", "$0$", "$3$"], bonne: 0, explication: "Forme « $+\\infty - \\infty$ ». $u_n = 5^n\\left(3 \\times 0{,}4^n - 1\\right)$, la parenthèse tend vers $-1$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer une limite",
      etapes: [
        "Chercher la limite de chaque morceau (limites de référence, $q^n$).",
        "Appliquer les règles de somme, produit, quotient.",
        "Si on tombe sur une forme indéterminée, transformer l'écriture : factoriser par le terme dominant, simplifier, ou utiliser la quantité conjuguée.",
        "Conclure en citant la règle utilisée (« par somme », « par quotient »…)."
      ],
      exemple: "$u_n = \\dfrac{n^2 + 1}{2n^2 - n} = \\dfrac{1 + \\frac{1}{n^2}}{2 - \\frac{1}{n}} \\to \\dfrac{1}{2}$."
    },
    {
      titre: "Utiliser un encadrement",
      etapes: [
        "Repérer le terme borné sans limite : $(-1)^n$, $\\cos(n)$, $\\sin(n)$, compris entre $-1$ et $1$.",
        "Partir de cet encadrement et reconstruire $u_n$ (multiplier, ajouter, diviser par un positif).",
        "Si les deux bornes ont la même limite finie : gendarmes.",
        "Si on a seulement une minoration qui tend vers $+\\infty$ (ou une majoration vers $-\\infty$) : comparaison."
      ],
      exemple: "$-1 \\leqslant (-1)^n \\leqslant 1$ donne $\\dfrac{n - 1}{n^2} \\leqslant \\dfrac{n + (-1)^n}{n^2} \\leqslant \\dfrac{n + 1}{n^2}$ : les deux bornes tendent vers $0$."
    },
    {
      titre: "Étudier une suite récurrente $u_{n+1} = f(u_n)$",
      etapes: [
        "Démontrer par récurrence que la suite est bornée (par exemple $0 \\leqslant u_n \\leqslant b$).",
        "Démontrer par récurrence qu'elle est monotone ($u_n \\leqslant u_{n+1}$ ou l'inverse).",
        "Conclure avec le théorème de convergence monotone : elle converge vers $\\ell$.",
        "Résoudre $\\ell = f(\\ell)$ et choisir la solution compatible avec l'encadrement."
      ],
      exemple: "$u_{n+1} = 0{,}5u_n + 2$, $u_0 = 0$ : croissante, majorée par $4$, donc convergente ; $\\ell = 0{,}5\\ell + 2$ donne $\\ell = 4$."
    },
    {
      titre: "Déterminer un seuil",
      etapes: [
        "Écrire l'inégalité cherchée ($u_n > A$ ou $|u_n - \\ell| < e$).",
        "Si on sait la résoudre (puissances, racines, inverses) : résoudre et prendre le premier entier qui convient.",
        "Sinon : tableau de valeurs de la calculatrice, ou programme avec une boucle $\\texttt{while}$.",
        "Vérifier avec le rang précédent que le seuil est bien le premier."
      ],
      exemple: "$2^n > 1\\,000$ : $2^9 = 512$ et $2^{10} = 1\\,024$, le seuil est $n = 10$."
    }
  ],
  erreurs: [
    "Conclure « pas de limite » devant une forme indéterminée : il faut transformer l'écriture.",
    "Croire que $\\dfrac{\\infty}{\\infty} = 1$ ou que $\\infty - \\infty = 0$.",
    "Oublier que $q^n \\to +\\infty$ dès que $q > 1$, même si $q$ est très proche de $1$.",
    "Croire qu'une suite croissante tend forcément vers $+\\infty$ (elle peut converger si elle est majorée).",
    "Croire qu'un majorant d'une suite croissante est sa limite.",
    "Croire qu'une suite bornée converge forcément.",
    "Utiliser $\\ell = f(\\ell)$ sans avoir prouvé que la suite converge.",
    "Garder une inégalité stricte en passant à la limite.",
    "Dans un seuil, oublier de vérifier le rang précédent."
  ]
};
