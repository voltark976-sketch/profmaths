/*
  CHAPITRE : Terminale maths expertes — Nombres complexes : point de vue algébrique
  ---------------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce). Virgule décimale : $0{,}35$.
  Programme officiel de maths expertes (BO spécial n° 8 du 25 juillet 2019), « Nombres complexes : point de vue algébrique ».
  Les équations du second degré dans C sont au chapitre 4 (Équations polynomiales), comme dans le programme.
  video : vidéos d'Yvan Monka (pas encore de vidéos de maths expertes sur la chaîne).
  Générateurs : préfixe xa- dans assets/exercices-expertes.js ; figures "xa-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["expertes-complexes-algebrique"] = {
  niveau: "Terminale maths expertes",
  numero: 1,
  titre: "Nombres complexes : point de vue algébrique",
  accroche: "Un nombre $i$ tel que $i^2 = -1$ : calculer avec $a + ib$, conjuguer, diviser et résoudre des équations dans $\\mathbb{C}$.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : nombres complexes, partie 1 (PDF)", url: "https://www.maths-et-tiques.fr/telech/20NC1.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "L'ensemble ℂ des nombres complexes",
      figure: "xa-cours-ensembles",
      video: { titre: "Vidéo d'Yvan Monka : le cours sur les nombres complexes", youtube: "https://youtu.be/ABo2m52oEYw" },
      texte:
        "Dans $\\mathbb{R}$, l'équation $x^2 = -1$ n'a pas de solution. On admet qu'il existe un ensemble de nombres, noté $\\mathbb{C}$, qui :\n\n" +
        "- contient $\\mathbb{R}$ et un nombre $i$ tel que $i^2 = -1$ ;\n" +
        "- a une addition et une multiplication qui suivent **les mêmes règles de calcul** que dans $\\mathbb{R}$.\n\n" +
        "Tout nombre complexe $z$ s'écrit **de façon unique** $z = a + ib$, avec $a$ et $b$ **réels** : c'est sa **forme algébrique**.\n\n" +
        "- $a$ est la **partie réelle** : $\\text{Re}(z) = a$.\n" +
        "- $b$ est la **partie imaginaire** : $\\text{Im}(z) = b$. C'est un **réel** : on n'écrit pas le $i$.\n" +
        "- Si $b = 0$, $z$ est **réel**. Si $a = 0$, $z$ est **imaginaire pur**.\n\n" +
        "Unicité : deux complexes sont égaux si et seulement s'ils ont la même partie réelle **et** la même partie imaginaire.",
      exemple: {
        enonce: "Donne la partie réelle et la partie imaginaire de $z = 4 - 7i$ et de $w = 3i$.",
        solution: "$\\text{Re}(z) = 4$ et $\\text{Im}(z) = -7$ (et non $-7i$).\n\n$\\text{Re}(w) = 0$ et $\\text{Im}(w) = 3$ : $w$ est un imaginaire pur."
      }
    },
    {
      titre: "Calculer dans ℂ",
      figure: "xa-cours-puissances-i",
      video: { titre: "Vidéo d'Yvan Monka : écrire un nombre complexe sous forme algébrique (1)", youtube: "https://youtu.be/-aaSfL2fhTY" },
      texte:
        "On calcule comme avec des expressions littérales, en remplaçant $i^2$ par $-1$ dès qu'il apparaît.\n\n" +
        "- **Somme** : $(a + ib) + (a' + ib') = (a + a') + i(b + b')$.\n" +
        "- **Produit** : $(a + ib)(a' + ib') = aa' + iab' + iba' + i^2bb' = (aa' - bb') + i(ab' + ba')$.\n" +
        "- Les identités remarquables restent vraies : $(a + ib)^2 = a^2 - b^2 + 2abi$.\n\n" +
        "**Puissances de $i$** : $i^1 = i$, $i^2 = -1$, $i^3 = -i$, $i^4 = 1$, puis cela recommence. Pour $i^n$, on cherche le reste $r$ de la division de $n$ par $4$ : $i^n = i^r$.",
      exemple: {
        enonce: "Écris sous forme algébrique $(2 + 3i)(1 - 4i)$ et $i^{2027}$.",
        solution: "$(2 + 3i)(1 - 4i) = 2 - 8i + 3i - 12i^2 = 2 - 5i + 12 = 14 - 5i$.\n\n$2027 = 4 \\times 506 + 3$, donc $i^{2027} = i^3 = -i$."
      }
    },
    {
      titre: "Le conjugué d'un nombre complexe",
      video: { titre: "Vidéo d'Yvan Monka : déterminer le conjugué d'un nombre complexe", youtube: "https://youtu.be/WhKHo9YwafE" },
      texte:
        "Le **conjugué** de $z = a + ib$ est $\\overline{z} = a - ib$ : même partie réelle, partie imaginaire opposée.\n\n" +
        "- $z + \\overline{z} = 2a = 2\\,\\text{Re}(z)$ et $z - \\overline{z} = 2ib = 2i\\,\\text{Im}(z)$.\n" +
        "- $z$ est réel $\\iff \\overline{z} = z$ ; $z$ est imaginaire pur $\\iff \\overline{z} = -z$.\n" +
        "- $z\\overline{z} = (a + ib)(a - ib) = a^2 + b^2$ : un **réel positif**.\n" +
        "- $\\overline{\\overline{z}} = z$, $\\overline{z + z'} = \\overline{z} + \\overline{z'}$, $\\overline{zz'} = \\overline{z}\\,\\overline{z'}$, $\\overline{z^n} = \\overline{z}^{\\,n}$ et, si $z \\neq 0$, $\\overline{\\left(\\dfrac{1}{z}\\right)} = \\dfrac{1}{\\overline{z}}$.\n\n" +
        "**Démonstration (conjugué d'un produit).** Avec $z = a + ib$ et $z' = a' + ib'$ : $zz' = (aa' - bb') + i(ab' + ba')$, donc $\\overline{zz'} = (aa' - bb') - i(ab' + ba')$. Et $\\overline{z}\\,\\overline{z'} = (a - ib)(a' - ib') = (aa' - bb') - i(ab' + ba')$ : c'est le même nombre.\n\n" +
        "**Puissances.** Par récurrence : si $\\overline{z^n} = \\overline{z}^{\\,n}$, alors $\\overline{z^{n+1}} = \\overline{z^n \\times z} = \\overline{z^n} \\times \\overline{z} = \\overline{z}^{\\,n+1}$.",
      exemple: {
        enonce: "Avec $z = 3 - 2i$, calcule $\\overline{z}$, $z + \\overline{z}$ et $z\\overline{z}$.",
        solution: "$\\overline{z} = 3 + 2i$, $z + \\overline{z} = 6$ et $z\\overline{z} = 3^2 + (-2)^2 = 13$."
      }
    },
    {
      titre: "Inverse et quotient",
      video: { titre: "Vidéo d'Yvan Monka : écrire un nombre complexe sous forme algébrique (2)", youtube: "https://youtu.be/1KQIUqzVGqQ" },
      texte:
        "Tout complexe $z = a + ib$ **non nul** a un inverse. Pour l'écrire sous forme algébrique, on multiplie en haut et en bas par le **conjugué** du dénominateur :\n\n" +
        "$\\dfrac{1}{a + ib} = \\dfrac{a - ib}{(a + ib)(a - ib)} = \\dfrac{a - ib}{a^2 + b^2}$\n\n" +
        "Le dénominateur devient le réel $a^2 + b^2$, non nul puisque $z \\neq 0$.\n\n" +
        "Pour un **quotient** $\\dfrac{z}{z'}$, on fait de même avec le conjugué de $z'$.\n\n" +
        "**Inverse d'un conjugué.** $\\overline{z} \\times \\overline{\\left(\\dfrac{1}{z}\\right)} = \\overline{z \\times \\dfrac{1}{z}} = \\overline{1} = 1$, donc $\\overline{\\left(\\dfrac{1}{z}\\right)} = \\dfrac{1}{\\overline{z}}$.",
      exemple: {
        enonce: "Écris sous forme algébrique $\\dfrac{5 + i}{1 - i}$.",
        solution: "$\\dfrac{5 + i}{1 - i} = \\dfrac{(5 + i)(1 + i)}{(1 - i)(1 + i)} = \\dfrac{5 + 5i + i + i^2}{1 + 1} = \\dfrac{4 + 6i}{2} = 2 + 3i$."
      }
    },
    {
      titre: "Résoudre une équation dans ℂ",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation dans ℂ avec un nombre conjugué", youtube: "https://youtu.be/qu7zGL5y4vI" },
      texte:
        "**Équation $az = b$** (avec $a \\neq 0$) : on divise par $a$, $z = \\dfrac{b}{a}$, puis on écrit ce quotient sous forme algébrique.\n\n" +
        "**Équation avec $z$ et $\\overline{z}$** : on pose $z = x + iy$ avec $x$ et $y$ **réels**, donc $\\overline{z} = x - iy$. On regroupe partie réelle et partie imaginaire de chaque membre, puis on **identifie** : on obtient un système de deux équations d'inconnues réelles $x$ et $y$.\n\n" +
        "On termine en vérifiant la solution dans l'équation de départ.",
      exemple: {
        enonce: "Résous dans $\\mathbb{C}$ l'équation $2z + \\overline{z} = 6 - 4i$.",
        solution: "Avec $z = x + iy$ : $2(x + iy) + (x - iy) = 3x + iy$.\n\nOn identifie : $3x = 6$ et $y = -4$, donc $x = 2$ et la solution est $z = 2 - 4i$.\n\nVérification : $2(2 - 4i) + (2 + 4i) = 6 - 4i$."
      }
    },
    {
      titre: "La formule du binôme dans ℂ",
      figure: "xa-pascal",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la formule du binôme", youtube: "https://youtu.be/UsYH9PvppPo" },
      texte:
        "Pour tous complexes $a$ et $b$ et tout entier naturel $n$ :\n\n" +
        "$(a + b)^n = \\displaystyle\\sum_{k=0}^{n} \\binom{n}{k} a^k b^{n-k}$\n\n" +
        "Les coefficients $\\dbinom{n}{k}$ se lisent dans le triangle de Pascal : ligne $1$ ; $3$ ; $3$ ; $1$ pour $n = 3$, ligne $1$ ; $4$ ; $6$ ; $4$ ; $1$ pour $n = 4$.\n\n" +
        "**Démonstration par récurrence.** Pour $n = 0$, les deux membres valent $1$. Si la formule est vraie au rang $n$, on écrit $(a + b)^{n+1} = (a + b)(a + b)^n$, on développe et on regroupe les termes en $a^k b^{n+1-k}$ grâce à la relation de Pascal $\\dbinom{n}{k-1} + \\dbinom{n}{k} = \\dbinom{n+1}{k}$.\n\n" +
        "Avec $b = i$, les puissances de $i$ alternent : les termes deviennent tour à tour réels et imaginaires.",
      exemple: {
        enonce: "Développe $(1 + i)^4$ avec la formule du binôme.",
        solution: "$(1 + i)^4 = 1 + 4i + 6i^2 + 4i^3 + i^4 = 1 + 4i - 6 - 4i + 1 = -4$."
      }
    },
    {
      titre: "Un peu d'histoire",
      texte:
        "Au XVIe siècle, les Italiens **Tartaglia** et **Cardan** trouvent des formules pour résoudre les équations de degré $3$. Pour certaines équations qui ont pourtant des solutions réelles, la formule fait apparaître des « racines carrées de nombres négatifs ».\n\n" +
        "**Bombelli** ose calculer avec ces quantités « impossibles » en suivant les règles habituelles, et retrouve les bonnes solutions réelles. La notation $i$ est due à **Euler** (1777), et le nom « nombre complexe » à **Gauss**.\n\n" +
        "Aujourd'hui, les nombres complexes servent en électricité, en traitement du signal (son, images) et en physique quantique."
    }
  ],

  videos: [
    { type: "Bac", titre: "Exercice du bac corrigé par Yvan Monka (nombres complexes)", youtube: "https://youtu.be/SeyMF4uikOI" }
  ],
  videosNote: "Exercice corrigé en vidéo par Yvan Monka : il utilise aussi les chapitres suivants sur les nombres complexes.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "xa-forme", titre: "Partie réelle, partie imaginaire", etape: "Forme algébrique", nb: 5 },
    { type: "xa-produit", titre: "Produits et carrés", etape: "Forme algébrique", nb: 5 },
    { type: "xa-puissances-i", titre: "Puissances de i", etape: "Forme algébrique", nb: 5 },
    { type: "xa-conjugue", titre: "Le conjugué", etape: "Conjugué et quotient", nb: 5 },
    { type: "xa-quotient", titre: "Inverse et quotient", etape: "Conjugué et quotient", nb: 5 },
    { type: "xa-equation", titre: "Résoudre une équation", etape: "Équations et binôme", nb: 5 },
    { type: "xa-binome", titre: "Formule du binôme", etape: "Équations et binôme", nb: 5 },
    { type: "xa-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Quelle est la partie imaginaire de $z = 5 - 3i$ ?", choix: ["$-3$", "$-3i$", "$3$", "$5$"], bonne: 0, explication: "La partie imaginaire est le **réel** $b$ dans $z = a + ib$ : ici $-3$, sans le $i$." },
    { question: "Que vaut $i^2$ ?", choix: ["$-1$", "$1$", "$i$", "$-i$"], bonne: 0, explication: "C'est la définition du nombre $i$ : $i^2 = -1$." },
    { question: "Quelle est la forme algébrique de $(3 + i)(2 - i)$ ?", choix: ["$7 - i$", "$5 - i$", "$6 - i$", "$7 + i$"], bonne: 0, explication: "$(3 + i)(2 - i) = 6 - 3i + 2i - i^2 = 6 - i + 1 = 7 - i$. Le choix $5 - i$ oublie que $-i^2 = +1$." },
    { question: "Que vaut $i^{2025}$ ?", choix: ["$i$", "$1$", "$-1$", "$-i$"], bonne: 0, explication: "$2025 = 4 \\times 506 + 1$, donc $i^{2025} = i^1 = i$." },
    { question: "Quel est le conjugué de $z = -4 + 7i$ ?", choix: ["$-4 - 7i$", "$4 - 7i$", "$4 + 7i$", "$7 - 4i$"], bonne: 0, explication: "On garde la partie réelle et on change le signe de la partie imaginaire : $\\overline{z} = -4 - 7i$." },
    { question: "Pour $z = 2 + 5i$, que vaut $z\\overline{z}$ ?", choix: ["$29$", "$-21$", "$49$", "$4 + 25i$"], bonne: 0, explication: "$z\\overline{z} = a^2 + b^2 = 4 + 25 = 29$. Le choix $-21$ vient de $a^2 - b^2$." },
    { question: "Quelle est la forme algébrique de $\\dfrac{1}{1 + i}$ ?", choix: ["$\\dfrac{1}{2} - \\dfrac{1}{2}i$", "$1 - i$", "$\\dfrac{1}{2} + \\dfrac{1}{2}i$", "$-\\dfrac{1}{2}i$"], bonne: 0, explication: "$\\dfrac{1}{1 + i} = \\dfrac{1 - i}{(1 + i)(1 - i)} = \\dfrac{1 - i}{2}$." },
    { question: "Quelle est la forme algébrique de $\\dfrac{3 + 4i}{i}$ ?", choix: ["$4 - 3i$", "$-4 + 3i$", "$3 + 4i$", "$4 + 3i$"], bonne: 0, explication: "On multiplie en haut et en bas par $-i$ (ou on utilise $\\dfrac{1}{i} = -i$) : $(3 + 4i)(-i) = -3i - 4i^2 = 4 - 3i$." },
    { question: "La solution de l'équation $iz = 2 - i$ est :", choix: ["$-1 - 2i$", "$1 + 2i$", "$2 - i$", "$-2 + i$"], bonne: 0, explication: "$z = \\dfrac{2 - i}{i} = (2 - i)(-i) = -2i + i^2 = -1 - 2i$. Vérification : $i(-1 - 2i) = -i + 2 = 2 - i$." },
    { question: "La solution de l'équation $z + 2\\overline{z} = 9 + i$ est :", choix: ["$3 - i$", "$3 + i$", "$9 + i$", "$1 + 3i$"], bonne: 0, explication: "Avec $z = x + iy$ : $z + 2\\overline{z} = 3x - iy$. On identifie : $3x = 9$ et $-y = 1$, donc $z = 3 - i$." },
    { question: "Un nombre complexe $z$ vérifie $\\overline{z} = -z$. Alors :", choix: ["$z$ est imaginaire pur", "$z$ est réel", "$z = 0$", "$z$ est un réel négatif"], bonne: 0, explication: "$z + \\overline{z} = 2\\,\\text{Re}(z) = 0$ : la partie réelle est nulle, $z$ est imaginaire pur ($0$ compris)." },
    { question: "Quelle est la forme algébrique de $(1 - i)^2$ ?", choix: ["$-2i$", "$2i$", "$0$", "$2 - 2i$"], bonne: 0, explication: "$(1 - i)^2 = 1 - 2i + i^2 = -2i$." },
    { question: "Quel est le coefficient de $z^2$ dans le développement de $(z + 2)^5$ ?", choix: ["$80$", "$10$", "$40$", "$32$"], bonne: 0, explication: "Le terme en $z^2$ est $\\dbinom{5}{2}z^2 \\times 2^3 = 10 \\times 8z^2 = 80z^2$." },
    { question: "Que vaut $(1 + i)^4$ ?", choix: ["$-4$", "$4$", "$4i$", "$-4i$"], bonne: 0, explication: "$(1 + i)^2 = 2i$, donc $(1 + i)^4 = (2i)^2 = 4i^2 = -4$." },
    { question: "Laquelle de ces égalités est vraie pour tous complexes $z$ et $z'$ ?", choix: ["$\\overline{zz'} = \\overline{z}\\,\\overline{z'}$", "$\\overline{z + z'} = \\overline{z} - \\overline{z'}$", "$\\text{Im}(zz') = \\text{Im}(z)\\,\\text{Im}(z')$", "$z\\overline{z} = z^2$"], bonne: 0, explication: "Le conjugué d'un produit est le produit des conjugués. Contre-exemple pour le troisième : $\\text{Im}(i \\times i) = 0$, alors que $\\text{Im}(i) \\times \\text{Im}(i) = 1$." },
    { question: "Pour quelle valeur du réel $x$ le nombre $z = (x - 3) + (x + 2)i$ est-il imaginaire pur ?", choix: ["$3$", "$-2$", "$0$", "$-3$"], bonne: 0, explication: "$z$ est imaginaire pur quand sa partie réelle est nulle : $x - 3 = 0$, soit $x = 3$ (et alors $z = 5i$)." },
    { question: "Pour quelle valeur du réel $x$ le nombre $z = (x - 3) + (x + 2)i$ est-il réel ?", choix: ["$-2$", "$3$", "$2$", "$0$"], bonne: 0, explication: "$z$ est réel quand sa partie imaginaire est nulle : $x + 2 = 0$, soit $x = -2$ (et alors $z = -5$)." },
    { question: "On pose $z = 2 - i$. Que vaut $z^2$ ?", choix: ["$3 - 4i$", "$5 - 4i$", "$4 - i$", "$3 + 4i$"], bonne: 0, explication: "$(2 - i)^2 = 4 - 4i + i^2 = 3 - 4i$. Le choix $5 - 4i$ remplace $i^2$ par $+1$." },
    { question: "Quelle est la partie réelle de $\\dfrac{2 + i}{1 - 2i}$ ?", choix: ["$0$", "$1$", "$\\dfrac{4}{5}$", "$-\\dfrac{3}{5}$"], bonne: 0, explication: "$\\dfrac{(2 + i)(1 + 2i)}{1 + 4} = \\dfrac{2 + 4i + i + 2i^2}{5} = \\dfrac{5i}{5} = i$ : la partie réelle est $0$." },
    { question: "Que vaut $i + i^2 + i^3 + i^4$ ?", choix: ["$0$", "$1$", "$-1$", "$4i$"], bonne: 0, explication: "$i - 1 - i + 1 = 0$ : quatre puissances consécutives de $i$ ont toujours une somme nulle." },
    { question: "Si $z = a + ib$ ($a$ et $b$ réels), alors $z - \\overline{z}$ vaut :", choix: ["$2ib$", "$2a$", "$0$", "$2b$"], bonne: 0, explication: "$(a + ib) - (a - ib) = 2ib = 2i\\,\\text{Im}(z)$ : un imaginaire pur." },
    { question: "Dans la formule du binôme, le développement de $(a + b)^6$ a combien de termes ?", choix: ["$7$", "$6$", "$12$", "$64$"], bonne: 0, explication: "Un terme pour chaque $k$ de $0$ à $6$, soit $7$ termes. La somme des coefficients vaut $2^6 = 64$." },
    { question: "Quel est le conjugué de $\\dfrac{1}{3 - 2i}$ ?", choix: ["$\\dfrac{1}{3 + 2i}$", "$\\dfrac{1}{-3 + 2i}$", "$3 + 2i$", "$\\dfrac{1}{3 - 2i}$"], bonne: 0, explication: "Le conjugué d'un inverse est l'inverse du conjugué : $\\overline{\\left(\\dfrac{1}{z}\\right)} = \\dfrac{1}{\\overline{z}}$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Écrire un nombre sous forme algébrique",
      figure: "xa-cours-puissances-i",
      etapes: [
        "Développer comme une expression littérale (distributivité, identités remarquables).",
        "Remplacer $i^2$ par $-1$ (et $i^3$ par $-i$, $i^4$ par $1$).",
        "Regrouper les termes sans $i$ (partie réelle) et les termes en $i$ (partie imaginaire)."
      ],
      exemple: "$(1 + 2i)^2 = 1 + 4i + 4i^2 = 1 + 4i - 4 = -3 + 4i$."
    },
    {
      titre: "Écrire un quotient sous forme algébrique",
      etapes: [
        "Repérer le dénominateur $c + id$ et écrire son conjugué $c - id$.",
        "Multiplier le numérateur **et** le dénominateur par $c - id$.",
        "Le dénominateur devient le réel $c^2 + d^2$ ; développer le numérateur.",
        "Diviser la partie réelle et la partie imaginaire par $c^2 + d^2$, simplifier."
      ],
      exemple: "$\\dfrac{2}{1 + i} = \\dfrac{2(1 - i)}{(1 + i)(1 - i)} = \\dfrac{2 - 2i}{2} = 1 - i$."
    },
    {
      titre: "Résoudre une équation avec $z$ et $\\overline{z}$",
      etapes: [
        "Poser $z = x + iy$, avec $x$ et $y$ réels, et $\\overline{z} = x - iy$.",
        "Écrire chaque membre sous la forme (partie réelle) $+ i$ (partie imaginaire).",
        "Identifier les parties réelles et les parties imaginaires : système d'inconnues $x$ et $y$.",
        "Résoudre, conclure $z = x + iy$ et vérifier."
      ],
      exemple: "$z - 3\\overline{z} = 4 + 8i$ : $-2x + 4iy = 4 + 8i$, donc $x = -2$, $y = 2$ et $z = -2 + 2i$."
    },
    {
      titre: "Calculer une grande puissance de $i$",
      etapes: [
        "Diviser l'exposant $n$ par $4$ : $n = 4q + r$ avec $0 \\leqslant r \\leqslant 3$.",
        "Comme $i^4 = 1$, $i^n = (i^4)^q \\times i^r = i^r$.",
        "Conclure avec $i^0 = 1$, $i^1 = i$, $i^2 = -1$, $i^3 = -i$."
      ],
      exemple: "$i^{103}$ : $103 = 4 \\times 25 + 3$, donc $i^{103} = i^3 = -i$."
    },
    {
      titre: "Développer avec la formule du binôme",
      figure: "xa-pascal",
      etapes: [
        "Lire les coefficients de la ligne $n$ du triangle de Pascal.",
        "Écrire $\\displaystyle\\sum \\binom{n}{k} a^k b^{n-k}$ : les puissances de $a$ montent, celles de $b$ descendent.",
        "Calculer chaque puissance (avec $i^2 = -1$ si $i$ apparaît), puis regrouper."
      ],
      exemple: "$(2 + i)^3 = 8 + 3 \\times 4i + 3 \\times 2i^2 + i^3 = 8 + 12i - 6 - i = 2 + 11i$."
    }
  ],
  erreurs: [
    "Écrire $\\text{Im}(3 - 4i) = -4i$ : la partie imaginaire est un réel, $-4$.",
    "Oublier que $i^2 = -1$ en développant : $(1 + i)^2 \\neq 1 + i^2$ et $(1 + i)^2 = 2i$.",
    "Diviser partie par partie : $\\dfrac{a + ib}{c + id}$ n'est pas $\\dfrac{a}{c} + i\\dfrac{b}{d}$. On multiplie par le conjugué du dénominateur.",
    "Écrire $(c + id)(c - id) = c^2 - d^2$ : c'est $c^2 + d^2$, car $-(id)^2 = +d^2$.",
    "Changer le signe de la partie réelle en conjuguant : $\\overline{-2 + 3i} = -2 - 3i$, pas $2 - 3i$.",
    "Dans une équation avec $\\overline{z}$, ne pas poser $z = x + iy$ : on ne peut pas « isoler » $z$ directement.",
    "Utiliser l'ordre $\\leqslant$ dans $\\mathbb{C}$ : on ne compare pas deux nombres complexes non réels."
  ]
};
