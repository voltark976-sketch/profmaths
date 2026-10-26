/*
  CHAPITRE : Première spécialité — Dérivation 2 : point de vue global
  --------------------------------------------------------------------
  Chapitre 9 de la progression spiralée 2026-2027 (programme de Première 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas encore de vidéo de la chaîne ni de PDF pour ce chapitre : les vidéos sont celles d'Yvan Monka.
  Programme 2026 : la dérivée de x ↦ g(ax + b) n'est plus au programme de Première (paragraphe « pour aller plus loin » seulement).
  Figures : "fonction-derivee", "racine-tangente", "d2-cours-…", "d2-qcm-…". Générateurs : d2-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-derivation-2"] = {
  niveau: "Première spécialité",
  numero: 9,
  titre: "Dérivation 2 : point de vue global",
  accroche: "De la tangente en un point à la fonction dérivée : formules usuelles, produit, quotient, la noix de coco qui tombe, la recette d'une coopérative et les fonctions qui refusent d'être dérivables.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : dérivation, chapitre 2 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19DeriP2M.pdf" }
  ],
  liens: [
    { titre: "Le cours sur la dérivation en vidéo (Yvan Monka)", url: "https://youtu.be/uMSNllPBFhQ", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Fonction dérivée",
      figure: "fonction-derivee",
      video: { titre: "Vidéo d'Yvan Monka : démonstration de la dérivée de la fonction carré", youtube: "https://youtu.be/-nRmE8yFSSg" },
      texte:
        "Une fonction $f$ est **dérivable sur un intervalle** $I$ si elle est dérivable en tout réel $x$ de $I$. La fonction qui à $x$ associe le nombre dérivé $f'(x)$ est la **fonction dérivée** de $f$, notée $f'$.\n\n" +
        "**Démonstration** pour $f(x) = x^2$ : pour $h \\neq 0$, $\\dfrac{(x + h)^2 - x^2}{h} = \\dfrac{2xh + h^2}{h} = 2x + h$, qui tend vers $2x$ quand $h$ tend vers $0$. Donc $f'(x) = 2x$ pour tout réel $x$.\n\n" +
        "Sur le schéma, la pente de la tangente en $-1$ vaut $-2$ et celle en $1$ vaut $2$ : ce sont les ordonnées des points de la droite $y = 2x$, courbe de $f'$.",
      exemple: {
        enonce: "Quelle est la pente de la tangente à la parabole $y = x^2$ au point d'abscisse $3$ ? Et au point d'abscisse $-2{,}5$ ?",
        solution: "$f'(3) = 2 \\times 3 = 6$ et $f'(-2{,}5) = -5$."
      }
    },
    {
      titre: "Démonstration : la fonction inverse",
      figure: "d2-cours-inverse",
      video: { titre: "Vidéo d'Yvan Monka : démonstration de la dérivée de la fonction inverse", youtube: "https://youtu.be/rQ1XfMN5pdk" },
      texte:
        "Pour $f(x) = \\dfrac{1}{x}$ et $x \\neq 0$, avec $h \\neq 0$ et $x + h \\neq 0$ :\n\n" +
        "$f(x + h) - f(x) = \\dfrac{1}{x + h} - \\dfrac{1}{x} = \\dfrac{-h}{x(x + h)}$,\n\n" +
        "donc le taux vaut $-\\dfrac{1}{x(x + h)}$, qui tend vers $-\\dfrac{1}{x^2}$.\n\n" +
        "La fonction inverse est dérivable sur $]-\\infty\\,;0[$ et sur $]0\\,;+\\infty[$, avec $f'(x) = -\\dfrac{1}{x^2}$. Ce nombre est toujours strictement négatif : toutes les tangentes « descendent ».",
      exemple: {
        enonce: "Donne l'équation de la tangente $T$ à l'hyperbole $y = \\dfrac{1}{x}$ au point $A$ d'abscisse $1$.",
        solution: "$f(1) = 1$ et $f'(1) = -1$ : $y = -(x - 1) + 1 = -x + 2$."
      }
    },
    {
      titre: "Dérivées des fonctions usuelles",
      video: { titre: "Vidéo d'Yvan Monka : dériver les fonctions usuelles", youtube: "https://youtu.be/9Mann4wOGJA" },
      texte:
        "- $f(x) = k$ (constante) : $f'(x) = 0$ ;\n" +
        "- $f(x) = mx + p$ : $f'(x) = m$ ;\n" +
        "- $f(x) = x^2$ : $f'(x) = 2x$ ; $f(x) = x^3$ : $f'(x) = 3x^2$ ;\n" +
        "- $f(x) = x^n$, avec $n$ entier relatif non nul : $f'(x) = nx^{n-1}$ (pour $x \\neq 0$ si $n < 0$) ;\n" +
        "- $f(x) = \\dfrac{1}{x}$ : $f'(x) = -\\dfrac{1}{x^2}$, sur $]-\\infty\\,;0[$ et sur $]0\\,;+\\infty[$ ;\n" +
        "- $f(x) = \\sqrt{x}$ : $f'(x) = \\dfrac{1}{2\\sqrt{x}}$, sur $]0\\,;+\\infty[$ seulement.\n\n" +
        "Avec un exposant négatif : $\\dfrac{1}{x^3} = x^{-3}$ a pour dérivée $-3x^{-4} = -\\dfrac{3}{x^4}$. Le cas $n = -1$ redonne la dérivée de $\\dfrac{1}{x}$.",
      exemple: {
        enonce: "Dérive $f(x) = x^5$, $g(x) = -7$ et $k(x) = \\dfrac{1}{x^2}$, puis calcule $h'(9)$ pour $h(x) = \\sqrt{x}$.",
        solution: "$f'(x) = 5x^4$, $g'(x) = 0$ et $k'(x) = -2x^{-3} = -\\dfrac{2}{x^3}$.\n\n$h'(9) = \\dfrac{1}{2\\sqrt{9}} = \\dfrac{1}{6}$."
      }
    },
    {
      titre: "Racine carrée : pas dérivable en $0$",
      figure: "racine-tangente",
      video: { titre: "Vidéo d'Yvan Monka : la racine carrée n'est pas dérivable en 0 (démonstration)", youtube: "https://youtu.be/N5wnOoLDrjo" },
      texte:
        "**Démonstration** : la racine carrée est définie en $0$, mais elle n'y est pas dérivable. Pour $h > 0$ :\n\n" +
        "$\\dfrac{\\sqrt{0 + h} - \\sqrt{0}}{h} = \\dfrac{\\sqrt{h}}{h} = \\dfrac{1}{\\sqrt{h}}$.\n\n" +
        "Quand $h$ se rapproche de $0$, $\\dfrac{1}{\\sqrt{h}}$ devient aussi grand qu'on veut : il n'y a pas de limite finie.\n\n" +
        "Sur le schéma, les sécantes passant par l'origine ont des pentes $1$, $2$, $5$… de plus en plus grandes : la courbe a une **tangente verticale** en $0$.",
      exemple: {
        enonce: "Calcule ce taux pour $h = 0{,}01$, puis pour $h = 0{,}0001$.",
        solution: "$\\dfrac{1}{\\sqrt{0{,}01}} = 10$ et $\\dfrac{1}{\\sqrt{0{,}0001}} = 100$."
      }
    },
    {
      titre: "Valeur absolue : une disjonction des cas",
      figure: "d2-cours-valeur-absolue",
      video: { titre: "Vidéo d'Yvan Monka : la valeur absolue n'est pas dérivable en 0", youtube: "https://youtu.be/ZKtxnTaIvvs" },
      texte:
        "La **valeur absolue** se définit par disjonction des cas : $|x| = x$ si $x \\geqslant 0$, et $|x| = -x$ si $x < 0$.\n\n" +
        "En $0$, le taux vaut $\\dfrac{|h|}{h}$ :\n\n" +
        "- si $h > 0$ : $\\dfrac{h}{h} = 1$ ;\n" +
        "- si $h < 0$ : $\\dfrac{-h}{h} = -1$.\n\n" +
        "Le taux ne se rapproche pas d'un nombre unique : la valeur absolue **n'est pas dérivable en $0$**, sa courbe a une pointe. Pourtant elle se trace sans lever le crayon : c'est un **contre-exemple** à l'idée « une courbe sans coupure est toujours dérivable ».",
      exemple: {
        enonce: "Écris $|x - 3|$ sans valeur absolue, selon les valeurs de $x$.",
        solution: "Si $x \\geqslant 3$ : $|x - 3| = x - 3$. Si $x < 3$ : $|x - 3| = 3 - x$."
      }
    },
    {
      titre: "Somme et produit par un réel",
      video: { titre: "Vidéo d'Yvan Monka : dériver une fonction (1)", youtube: "https://youtu.be/ehHoLK98Ht0" },
      texte:
        "Si $u$ et $v$ sont dérivables sur $I$ et si $k$ est un réel :\n\n" +
        "- $(u + v)' = u' + v'$ ;\n" +
        "- $(ku)' = k\\,u'$.\n\n" +
        "On dérive donc un polynôme **terme à terme** : $(5x^3 - 2x^2 + 7x - 1)' = 15x^2 - 4x + 7$.",
      exemple: {
        enonce: "Dérive $f(x) = 3x^2 + \\dfrac{4}{x}$ sur $]0\\,;+\\infty[$.",
        solution: "$f'(x) = 6x + 4 \\times \\left(-\\dfrac{1}{x^2}\\right) = 6x - \\dfrac{4}{x^2}$."
      }
    },
    {
      titre: "Démonstration : dérivée d'un produit",
      video: { titre: "Vidéo d'Yvan Monka : démonstration de (uv)' = u'v + uv'", youtube: "https://youtu.be/PI4A8TLGnxE" },
      texte:
        "**Propriété** : $(uv)' = u'v + uv'$.\n\n" +
        "**Démonstration**. Pour $h \\neq 0$, on ajoute et on retranche $u(x)\\,v(x + h)$ au numérateur du taux :\n\n" +
        "$\\dfrac{u(x + h)v(x + h) - u(x)v(x)}{h}$\n\n" +
        "$= \\dfrac{u(x + h) - u(x)}{h} \\times v(x + h)$\n\n" +
        "$+\\; u(x) \\times \\dfrac{v(x + h) - v(x)}{h}$.\n\n" +
        "Quand $h$ tend vers $0$, le premier quotient tend vers $u'(x)$, $v(x + h)$ tend vers $v(x)$ et le dernier quotient tend vers $v'(x)$.\n\n" +
        "Attention : la dérivée d'un produit n'est **pas** le produit des dérivées.",
      exemple: {
        enonce: "Dérive $f(x) = (2x^2 - 1)(x + 3)$.",
        solution: "$u = 2x^2 - 1$, $u' = 4x$ ; $v = x + 3$, $v' = 1$.\n\n$f'(x) = 4x(x + 3) + (2x^2 - 1) \\times 1 = 6x^2 + 12x - 1$."
      }
    },
    {
      titre: "Inverse et quotient",
      video: { titre: "Vidéo d'Yvan Monka : dériver une fonction (2)", youtube: "https://youtu.be/1fOGueiO_zk" },
      texte:
        "Si $v$ ne s'annule pas sur $I$ :\n\n" +
        "- $\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$ ;\n" +
        "- $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.\n\n" +
        "L'ordre compte dans le numérateur : d'abord $u'v$, puis $- uv'$. On garde en général le dénominateur $v^2$ sous forme factorisée.\n\n" +
        "Exemple : $\\dfrac{1}{5 - x}$ a pour dérivée $-\\dfrac{-1}{(5 - x)^2} = \\dfrac{1}{(5 - x)^2}$.",
      exemple: {
        enonce: "Dérive $f(x) = \\dfrac{2x + 1}{x - 3}$ sur $]3\\,;+\\infty[$.",
        solution: "$u = 2x + 1$, $u' = 2$ ; $v = x - 3$, $v' = 1$.\n\n$f'(x) = \\dfrac{2(x - 3) - (2x + 1)}{(x - 3)^2} = \\dfrac{-7}{(x - 3)^2}$."
      }
    },
    {
      titre: "Pour aller plus loin (hors programme) : dériver $x \\mapsto g(ax + b)$",
      texte:
        "Cette formule n'est **pas au programme** de Première : on peut toujours s'en passer avec les formules précédentes. Pour ta culture, si $g$ est dérivable, $x \\mapsto g(ax + b)$ a pour dérivée $x \\mapsto a \\times g'(ax + b)$.\n\n" +
        "Avec le programme de Première, on fait autrement :\n\n" +
        "- $(3x - 1)^2 = 9x^2 - 6x + 1$ a pour dérivée $18x - 6 = 6(3x - 1)$ : on développe ;\n" +
        "- $\\dfrac{1}{2x + 1}$ a pour dérivée $-\\dfrac{2}{(2x + 1)^2}$ : c'est la formule de l'inverse $\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$.",
      exemple: {
        enonce: "Dérive $f(x) = (2x + 5)^2$ sans formule nouvelle.",
        solution: "$f(x) = 4x^2 + 20x + 25$, donc $f'(x) = 8x + 20 = 4(2x + 5)$. On peut aussi voir $f$ comme le produit $(2x + 5)(2x + 5)$."
      }
    },
    {
      titre: "La notation de la physique-chimie",
      figure: "d2-cours-chute",
      texte:
        "En physique-chimie, la dérivée se note souvent avec des « d » : si $x(t)$ est la position d'un objet à l'instant $t$, sa vitesse est\n\n" +
        "$v(t) = x'(t) = \\dfrac{\\mathrm{d}x}{\\mathrm{d}t}$.\n\n" +
        "De même, l'accélération est la dérivée de la vitesse : $a(t) = v'(t) = \\dfrac{\\mathrm{d}v}{\\mathrm{d}t}$, et le débit d'un robinet est la dérivée du volume d'eau.\n\n" +
        "Exemple : une noix de coco tombe d'un cocotier. La distance parcourue est $d(t) = 4{,}9t^2$ (en m, $t$ en s). Sa vitesse est $v(t) = 9{,}8t$ : c'est la pente de la tangente sur le schéma. Son accélération vaut $9{,}8\\ \\text{m/s}^2$ : c'est l'accélération de la pesanteur.\n\n" +
        "En économie, on parle de **coût marginal** ou de **recette marginale** : si $R(x)$ est la recette pour $x$ kg vendus, $R'(x)$ est à peu près ce que rapporte un kg de plus.",
      exemple: {
        enonce: "À quelle vitesse la noix de coco arrive-t-elle au sol après $1{,}2$ s de chute ?",
        solution: "$v(1{,}2) = 9{,}8 \\times 1{,}2 = 11{,}76$ m/s, soit environ $42$ km/h."
      }
    },
    {
      titre: "Python : le taux quand $h$ tend vers $0$",
      texte:
        "On peut passer une fonction en paramètre d'une autre fonction Python, et ranger les résultats dans une **liste** :\n\n" +
        "```python\nfrom math import sqrt\n\ndef taux(f, a, h):\n    return (f(a + h) - f(a)) / h\n\nprint([taux(sqrt, 4, 10**(-k)) for k in range(1, 6)])\nprint([taux(sqrt, 0, 10**(-k)) for k in range(1, 6)])\n```\n\n" +
        "- En $4$, les valeurs se rapprochent de $0{,}25 = \\dfrac{1}{2\\sqrt{4}}$ : c'est le nombre dérivé.\n" +
        "- En $0$, elles valent environ $3{,}16$ ; $10$ ; $31{,}6$ ; $100$ ; $316$ : elles grandissent sans fin, la racine carrée n'est pas dérivable en $0$.\n\n" +
        "Avec un **pas fixé** $h$, on peut aussi écrire la liste des coefficients directeurs des sécantes :\n\n" +
        "```python\ndef carre(x):\n    return x * x\n\nh = 0.5\npentes = []\nfor x in [0, 1, 2, 3]:\n    pentes.append((carre(x + h) - carre(x)) / h)\nprint(pentes)\n```\n\n" +
        "Le programme affiche $\\texttt{[0.5, 2.5, 4.5, 6.5]}$ : ce sont les nombres $2x + h$, des valeurs approchées de $f'(x) = 2x$.",
      exemple: {
        enonce: "Comment étudier de la même façon le nombre dérivé de la fonction carré en $3$ ?",
        solution: "On affiche $\\texttt{taux(carre, 3, h)}$ pour $h = 0{,}1$ ; $0{,}01$ ; … Les valeurs $6{,}1$ ; $6{,}01$ ; … se rapprochent de $6$."
      }
    }
  ],

  videos: [
    { titre: "Dériver une fonction (3)", type: "Calcul", youtube: "https://youtu.be/OMsZNNIIdrw" },
    { titre: "Dériver une fonction (4)", type: "Calcul", youtube: "https://youtu.be/jOuC7aq3YkM" },
    { titre: "Dériver une fonction (5)", type: "Calcul", youtube: "https://youtu.be/-MfEczGz_6Y" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "d2-usuelles", titre: "Dérivées usuelles", etape: "Formules", nb: 6 },
    { type: "d2-polynome", titre: "Dériver un polynôme", etape: "Formules", nb: 5 },
    { type: "d2-produit", titre: "Dériver un produit", etape: "Opérations", nb: 5 },
    { type: "d2-quotient", titre: "Inverse et quotient", etape: "Opérations", nb: 5 },
    { type: "d2-logique", titre: "Dérivable ou pas ?", etape: "Raisonner", nb: 5 },
    { type: "d2-physique", titre: "Vitesse, accélération, débit", etape: "Raisonner", nb: 5 },
    { type: "d2-python", titre: "Python : taux et pentes des sécantes", etape: "Raisonner", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "La dérivée de $x^4$ est :", choix: ["$4x^3$", "$4x^4$", "$3x^4$", "$x^3$"], bonne: 0, explication: "$(x^n)' = nx^{n-1}$ avec $n = 4$." },
    { question: "La dérivée de $\\sqrt{x}$ est :", choix: ["$\\dfrac{1}{2\\sqrt{x}}$", "$2\\sqrt{x}$", "$\\dfrac{1}{\\sqrt{x}}$", "$\\sqrt{x}$"], bonne: 0, explication: "Formule à connaître, valable pour $x > 0$." },
    { question: "Sur quel ensemble la fonction racine carrée est-elle dérivable ?", choix: ["$]0\\,;+\\infty[$", "$[0\\,;+\\infty[$", "$\\mathbb{R}$", "$]-\\infty\\,;0[$"], bonne: 0, explication: "Elle est définie en $0$, mais pas dérivable en $0$ (tangente verticale)." },
    { question: "La dérivée de $\\dfrac{1}{x}$ est :", choix: ["$-\\dfrac{1}{x^2}$", "$\\dfrac{1}{x^2}$", "$-\\dfrac{1}{x}$", "$\\dfrac{1}{2x}$"], bonne: 0, explication: "Démontré dans le cours : le taux $-\\dfrac{1}{x(x + h)}$ tend vers $-\\dfrac{1}{x^2}$." },
    { question: "$f(x) = 2x^3 - 5x + 7$. Alors $f'(x) =$", choix: ["$6x^2 - 5$", "$6x^2 - 5x$", "$2x^2 - 5$", "$6x^2 - 5 + 7$"], bonne: 0, explication: "On dérive terme à terme ; la constante $7$ a pour dérivée $0$." },
    { question: "$(uv)'$ est égal à :", choix: ["$u'v + uv'$", "$u'v'$", "$u'v - uv'$", "$\\dfrac{u'}{v'}$"], bonne: 0, explication: "Formule du produit, démontrée dans le cours." },
    { question: "$f(x) = x\\sqrt{x}$ sur $]0\\,;+\\infty[$. Alors $f'(x) =$", choix: ["$\\sqrt{x} + \\dfrac{x}{2\\sqrt{x}}$", "$\\dfrac{1}{2\\sqrt{x}}$", "$1 \\times \\dfrac{1}{2\\sqrt{x}}$", "$\\sqrt{x}$"], bonne: 0, explication: "$u = x$, $v = \\sqrt{x}$ : $u'v + uv' = \\sqrt{x} + \\dfrac{x}{2\\sqrt{x}} = \\dfrac{3\\sqrt{x}}{2}$." },
    { question: "$\\left(\\dfrac{u}{v}\\right)'$ est égal à :", choix: ["$\\dfrac{u'v - uv'}{v^2}$", "$\\dfrac{uv' - u'v}{v^2}$", "$\\dfrac{u'}{v'}$", "$\\dfrac{u'v + uv'}{v^2}$"], bonne: 0, explication: "L'ordre compte : $u'v$ d'abord." },
    { question: "$f(x) = \\dfrac{1}{x^2 + 1}$. Alors $f'(x) =$", choix: ["$-\\dfrac{2x}{(x^2 + 1)^2}$", "$\\dfrac{1}{2x}$", "$-\\dfrac{1}{(x^2 + 1)^2}$", "$\\dfrac{2x}{(x^2 + 1)^2}$"], bonne: 0, explication: "$\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$ avec $v' = 2x$." },
    { question: "La dérivée de $(4x - 1)^2$ est :", choix: ["$8(4x - 1)$", "$2(4x - 1)$", "$4(4x - 1)$", "$16x$"], bonne: 0, explication: "On développe : $(4x - 1)^2 = 16x^2 - 8x + 1$, de dérivée $32x - 8 = 8(4x - 1)$. On peut aussi dériver le produit $(4x - 1)(4x - 1)$ : $4(4x - 1) + (4x - 1) \\times 4$." },
    { question: "La dérivée de $\\dfrac{1}{x^3}$ est :", choix: ["$-\\dfrac{3}{x^4}$", "$\\dfrac{1}{3x^2}$", "$-\\dfrac{3}{x^2}$", "$\\dfrac{3}{x^4}$"], bonne: 0, explication: "$\\dfrac{1}{x^3} = x^{-3}$ et $(x^n)' = nx^{n-1}$ pour tout entier relatif $n$ : $-3x^{-4} = -\\dfrac{3}{x^4}$." },
    { question: "La valeur absolue est-elle dérivable en $0$ ?", figure: "d2-qcm-va", choix: ["Non : le taux vaut $1$ à droite et $-1$ à gauche", "Oui, avec $f'(0) = 0$", "Oui, avec $f'(0) = 1$", "Non, car $|0|$ n'est pas défini"], bonne: 0, explication: "Disjonction des cas : $\\dfrac{|h|}{h}$ vaut $1$ si $h > 0$ et $-1$ si $h < 0$. Sur la figure, la courbe a une pointe en $0$." },
    { question: "Pourquoi la racine carrée n'est-elle pas dérivable en $0$ ?", choix: ["Le taux $\\dfrac{1}{\\sqrt{h}}$ devient aussi grand qu'on veut", "Elle n'est pas définie en $0$", "Sa courbe a une pointe en $0$", "Parce que $\\sqrt{0} = 0$"], bonne: 0, explication: "Le taux n'a pas de limite finie : les sécantes deviennent de plus en plus raides et la tangente est verticale." },
    { question: "Laquelle de ces affirmations est un contre-exemple à « une fonction dont la courbe n'a pas de coupure est dérivable partout » ?", choix: ["La valeur absolue : sa courbe n'a pas de coupure, mais elle n'est pas dérivable en $0$", "La fonction carré : elle est dérivable partout", "La fonction inverse : sa courbe a une coupure en $0$", "La fonction cube : sa dérivée s'annule en $0$"], bonne: 0, explication: "Un contre-exemple doit vérifier l'hypothèse (pas de coupure) sans vérifier la conclusion (dérivable partout) : c'est le cas de la valeur absolue en $0$." },
    { question: "$x(t) = 3t^2 + 2t$ est une position. Que vaut $\\dfrac{\\mathrm{d}x}{\\mathrm{d}t}$ à $t = 1$ ?", figure: "d2-qcm-position", choix: ["$8$", "$5$", "$6$", "$3$"], bonne: 0, explication: "$x'(t) = 6t + 2$, donc $x'(1) = 8$ : c'est la pente de la tangente au point d'abscisse $1$. $5 = x(1)$ est la position." },
    { question: "Une noix de coco tombe : $d(t) = 4{,}9t^2$. Sa vitesse à $t = 2$ s est :", figure: "d2-cours-chute", choix: ["$19{,}6$ m/s", "$9{,}8$ m/s", "$19{,}6$ m", "$4{,}9$ m/s"], bonne: 0, explication: "$v(t) = 9{,}8t$, donc $v(2) = 19{,}6$ m/s. Sur la figure, la pente $9{,}8$ est la vitesse à $t = 1$ s seulement." },
    { question: "$f$ et $g$ ont la même fonction dérivée. Alors :", figure: "d2-qcm-meme-derivee", choix: ["$f$ et $g$ ne sont pas forcément égales", "$f = g$", "$f = -g$", "$f$ et $g$ sont constantes"], bonne: 0, explication: "Contre-exemple : $x^2$ et $x^2 + 2$ ont la même dérivée $2x$ (leurs tangentes sont parallèles en chaque abscisse), mais les courbes sont décalées de $2$." },
    { question: "Pour $h$ de plus en plus petit, $\\texttt{taux(sqrt, 9, h)}$ se rapproche de :", choix: ["$\\dfrac{1}{6}$", "$3$", "$6$", "$0$"], bonne: 0, explication: "Du nombre dérivé $\\dfrac{1}{2\\sqrt{9}} = \\dfrac{1}{6}$." },
    { question: "$f(x) = 5x - 3x^2 + 8$. Alors $f'(x) =$", choix: ["$5 - 6x$", "$5 - 6x + 8$", "$5 - 3x$", "$-6x + 13$"], bonne: 0, explication: "On dérive terme à terme : $(5x)' = 5$, $(-3x^2)' = -3 \\times 2x = -6x$ et la constante $8$ a pour dérivée $0$." },
    { question: "$f(x) = \\dfrac{3}{x}$ sur $]0\\,;+\\infty[$. Alors $f'(x) =$", choix: ["$-\\dfrac{3}{x^2}$", "$\\dfrac{3}{x^2}$", "$-\\dfrac{1}{3x^2}$", "$0$"], bonne: 0, explication: "$f = 3 \\times \\dfrac{1}{x}$ et $(ku)' = ku'$ : $f'(x) = 3 \\times \\left(-\\dfrac{1}{x^2}\\right) = -\\dfrac{3}{x^2}$." },
    { question: "$f(x) = (2x + 1)(x - 3)$. Alors $f'(x) =$", choix: ["$4x - 5$", "$2$", "$4x - 6$", "$2x - 5$"], bonne: 0, explication: "$(uv)' = u'v + uv' = 2(x - 3) + (2x + 1) \\times 1 = 4x - 5$. Le produit des dérivées $2 \\times 1 = 2$ est faux." },
    { question: "$f(x) = \\dfrac{2x - 1}{x + 3}$ pour $x \\neq -3$. Alors $f'(x) =$", choix: ["$\\dfrac{7}{(x + 3)^2}$", "$\\dfrac{-7}{(x + 3)^2}$", "$2$", "$\\dfrac{5}{(x + 3)^2}$"], bonne: 0, explication: "$\\dfrac{u'v - uv'}{v^2} = \\dfrac{2(x + 3) - (2x - 1) \\times 1}{(x + 3)^2} = \\dfrac{2x + 6 - 2x + 1}{(x + 3)^2} = \\dfrac{7}{(x + 3)^2}$." },
    { question: "La dérivée de $f(x) = \\dfrac{1}{3x + 2}$ est :", choix: ["$-\\dfrac{3}{(3x + 2)^2}$", "$-\\dfrac{1}{(3x + 2)^2}$", "$\\dfrac{3}{(3x + 2)^2}$", "$\\dfrac{1}{3}$"], bonne: 0, explication: "Formule de l'inverse avec $v(x) = 3x + 2$ et $v'(x) = 3$ : $f'(x) = -\\dfrac{v'}{v^2} = -\\dfrac{3}{(3x + 2)^2}$. Il ne faut pas oublier $v' = 3$." },
    { question: "Une coopérative vend $x$ kg de vanille au prix de $300 - 2x$ euros le kg. La recette est $R(x) = x(300 - 2x)$. Que vaut la recette marginale $R'(50)$ ?", choix: ["$100$ €", "$200$ €", "$-2$ €", "$10\\,000$ €"], bonne: 0, explication: "Produit $u = x$, $v = 300 - 2x$ : $R'(x) = (300 - 2x) + x \\times (-2) = 300 - 4x$, donc $R'(50) = 100$ € : un kg de plus rapporte environ $100$ €. $200$ € est le prix du kg et $10\\,000$ € la recette." },
    { question: "Une fonction $f$ a pour dérivée $f'(x) = 2x$. Laquelle de ces fonctions peut être $f$ ?", choix: ["$x^2 + 5$", "$2x^2$", "$x^2 + 2x$", "$2$"], bonne: 0, explication: "$(x^2 + 5)' = 2x + 0 = 2x$. En revanche $(2x^2)' = 4x$ et $(x^2 + 2x)' = 2x + 2$." },
    { question: "$f(x) = x^3$. Le coefficient directeur de la tangente au point $A$ d'abscisse $-1$ est :", figure: "d2-qcm-cube", choix: ["$3$", "$-3$", "$-1$", "$1$"], bonne: 0, explication: "$f'(x) = 3x^2$, donc $f'(-1) = 3 \\times (-1)^2 = 3$ : la courbe monte en $A$. $-1 = f(-1)$ est l'ordonnée du point, pas la pente." },
    { question: "La vitesse d'un objet est $v(t) = 5t^2 - t$ (en m/s). Son accélération $\\dfrac{\\mathrm{d}v}{\\mathrm{d}t}$ à $t = 2$ s vaut (en $\\text{m/s}^2$) :", choix: ["$19$", "$18$", "$20$", "$9$"], bonne: 0, explication: "$a(t) = v'(t) = 10t - 1$, donc $a(2) = 19\\ \\text{m/s}^2$. $18$ est la vitesse $v(2)$, pas l'accélération." },
    { question: "Avec la fonction $\\texttt{taux}$ du cours, combien vaut $\\texttt{taux(sqrt, 0, 0.01)}$ ?", choix: ["$10$", "$0{,}1$", "$0$", "$100$"], bonne: 0, explication: "$\\dfrac{\\sqrt{0{,}01} - \\sqrt{0}}{0{,}01} = \\dfrac{0{,}1}{0{,}01} = 10$. Ce taux $\\dfrac{1}{\\sqrt{h}}$ grandit sans fin quand $h$ diminue." },
    { question: "Quelle phrase est la réciproque de « si $f$ est dérivable en $a$, alors $f$ est définie en $a$ » ? Est-elle vraie ?", choix: ["« Si $f$ est définie en $a$, alors elle est dérivable en $a$ » : fausse (la racine carrée en $0$)", "« Si $f$ est définie en $a$, alors elle est dérivable en $a$ » : vraie", "« Si $f$ n'est pas définie en $a$, alors elle n'est pas dérivable en $a$ » : vraie", "« Si $f$ n'est pas dérivable en $a$, alors elle n'est pas définie en $a$ » : fausse"], bonne: 0, explication: "La réciproque échange l'hypothèse et la conclusion. Elle est fausse : la racine carrée est définie en $0$ mais pas dérivable en $0$ (de même la valeur absolue)." },
    { question: "Le programme du cours affiche la liste des pentes $\\dfrac{\\texttt{carre(x + h)} - \\texttt{carre(x)}}{h}$ pour $h = 0{,}5$ et $x$ dans $\\texttt{[0, 1, 2, 3]}$. Quel est le troisième nombre affiché ?", choix: ["$4{,}5$", "$4$", "$6{,}25$", "$2{,}5$"], bonne: 0, explication: "Le troisième $x$ est $2$ : $\\dfrac{2{,}5^2 - 2^2}{0{,}5} = \\dfrac{2{,}25}{0{,}5} = 4{,}5$, valeur approchée de $f'(2) = 4$." },
    { question: "$f(x) = 4x^3 - \\dfrac{2}{x}$ sur $]0\\,;+\\infty[$. Alors $f'(x) =$", choix: ["$12x^2 + \\dfrac{2}{x^2}$", "$12x^2 - \\dfrac{2}{x^2}$", "$12x^2 + \\dfrac{2}{x}$", "$4x^2 + \\dfrac{2}{x^2}$"], bonne: 0, explication: "$(4x^3)' = 12x^2$ et $\\left(-\\dfrac{2}{x}\\right)' = -2 \\times \\left(-\\dfrac{1}{x^2}\\right) = \\dfrac{2}{x^2}$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Dériver avec les formules usuelles",
      etapes: ["Reconnaître la forme : constante, $x^n$ (même avec $n$ négatif), $\\dfrac{1}{x}$, $\\sqrt{x}$.", "Garder les coefficients : $(ku)' = ku'$.", "Dériver une somme terme à terme."],
      figure: "fonction-derivee",
      exemple: "$f(x) = 4x^3 - \\dfrac{2}{x}$ : $f'(x) = 12x^2 + \\dfrac{2}{x^2}$."
    },
    {
      titre: "Dériver un produit",
      etapes: ["Repérer $u$ et $v$, puis calculer $u'$ et $v'$.", "Appliquer $(uv)' = u'v + uv'$.", "Développer et réduire si on veut ensuite étudier le signe."],
      exemple: "$(x^2 + 1)(3x - 2)$ : $2x(3x - 2) + 3(x^2 + 1) = 9x^2 - 4x + 3$."
    },
    {
      titre: "Dériver un inverse ou un quotient",
      etapes: ["Vérifier que le dénominateur ne s'annule pas sur l'intervalle.", "Pour $\\dfrac{1}{v}$ : $-\\dfrac{v'}{v^2}$ ; pour $\\dfrac{u}{v}$ : calculer $u'v - uv'$, dans cet ordre.", "Écrire $f'(x) = \\dfrac{u'v - uv'}{v^2}$ en gardant $v^2$ factorisé."],
      exemple: "$\\dfrac{x}{x + 1}$ : $\\dfrac{1 \\times (x + 1) - x \\times 1}{(x + 1)^2} = \\dfrac{1}{(x + 1)^2}$. Et $\\dfrac{1}{2x - 1}$ : $-\\dfrac{2}{(2x - 1)^2}$."
    },
    {
      titre: "Interpréter une dérivée en contexte",
      etapes: ["Repérer ce que l'on dérive : une position, une vitesse, un volume, une recette…", "Dériver par rapport au temps (ou à la quantité) : vitesse, accélération, débit, recette marginale.", "Donner l'unité : m/s pour une vitesse, L/min pour un débit, € par kg pour une recette marginale."],
      figure: "d2-cours-chute",
      exemple: "$d(t) = 4{,}9t^2$ (en m) : $v(t) = d'(t) = 9{,}8t$, donc à $t = 1$ s la vitesse est $9{,}8$ m/s, pente de la tangente."
    },
    {
      titre: "Étudier la dérivabilité en un point",
      etapes: ["Écrire le taux $\\dfrac{f(a + h) - f(a)}{h}$.", "Le simplifier, en distinguant si besoin $h > 0$ et $h < 0$.", "Conclure : $f$ est dérivable en $a$ si le taux se rapproche d'un seul nombre réel."],
      figure: "d2-cours-valeur-absolue",
      exemple: "$|x|$ en $0$ : le taux vaut $1$ si $h > 0$ et $-1$ si $h < 0$, donc $|x|$ n'est pas dérivable en $0$."
    }
  ],
  erreurs: [
    "Écrire $(uv)' = u'v'$ : la dérivée d'un produit n'est pas le produit des dérivées.",
    "Inverser l'ordre dans $u'v - uv'$ : on obtient l'opposé du bon résultat.",
    "Oublier $v'$ dans $\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$ : la dérivée de $\\dfrac{1}{3x + 2}$ est $-\\dfrac{3}{(3x + 2)^2}$, pas $-\\dfrac{1}{(3x + 2)^2}$.",
    "Garder la constante : la dérivée de $5$ est $0$.",
    "Utiliser la dérivée de $\\sqrt{x}$ en $0$ : la racine carrée n'est pas dérivable en $0$.",
    "Écrire $\\left(\\dfrac{1}{x}\\right)' = \\dfrac{1}{x^2}$ : il manque le signe moins.",
    "Confondre $f'(a)$, qui est un nombre, et $f'$, qui est une fonction ; confondre la position $x(t)$ et la vitesse $x'(t)$."
  ]
};
