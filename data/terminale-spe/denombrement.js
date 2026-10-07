/*
  CHAPITRE : Terminale spécialité — Combinatoire et dénombrement
  --------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce). Dans les formules, la virgule décimale s'écrit {,} : $0{,}35$
  et les milliers s'écrivent avec \\, : $30\\,000$.
  Programme officiel de Terminale spécialité (Algèbre et géométrie : combinatoire et dénombrement).
  Aucune vidéo n'est liée pour l'instant : ajouter video: { titre: "...", youtube: "..." } sous une notion.
  Les générateurs d'exercices de ce chapitre commencent par cd- dans assets/exercices.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-spe-denombrement"] = {
  niveau: "Terminale spécialité",
  numero: 1,
  titre: "Combinatoire et dénombrement",
  accroche: "Compter sans tout écrire : se demander si l'ordre compte et si les répétitions sont permises, puis choisir le bon outil.",

  playlist: "",
  drive: "",
  pdfs: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Cardinal et principe additif",
      texte:
        "Le nombre d'éléments d'un ensemble fini $E$ s'appelle son **cardinal**, noté $\\text{Card}(E)$.\n\n" +
        "- **Principe additif** : si $A$ et $B$ sont **disjoints** ($A \\cap B = \\varnothing$), alors $\\text{Card}(A \\cup B) = \\text{Card}(A) + \\text{Card}(B)$. Cela reste vrai pour plusieurs ensembles deux à deux disjoints.\n" +
        "- **Complémentaire** : $\\text{Card}(\\overline{A}) = \\text{Card}(E) - \\text{Card}(A)$. Utile quand « ne pas avoir » est plus simple à compter.\n" +
        "- Si $A$ et $B$ ne sont pas disjoints, on découpe en morceaux disjoints : $\\text{Card}(A \\cup B) = \\text{Card}(A) + \\text{Card}(B) - \\text{Card}(A \\cap B)$.\n\n" +
        "Un diagramme ou un tableau aide à ne compter chaque élément qu'une seule fois.",
      exemple: {
        enonce: "Dans une classe de $34$ élèves, $19$ font du sport en club, $11$ jouent d'un instrument et $6$ font les deux. Combien ne font ni l'un ni l'autre ?",
        solution: "$\\text{Card}(S \\cup M) = 19 + 11 - 6 = 24$ : les $6$ élèves qui font les deux étaient comptés deux fois.\n\nCeux qui ne font ni l'un ni l'autre forment le complémentaire : $34 - 24 = 10$ élèves."
      }
    },
    {
      titre: "Principe multiplicatif et k-uplets",
      texte:
        "Le **produit cartésien** $A \\times B$ est l'ensemble des couples $(a\\,;b)$ avec $a \\in A$ et $b \\in B$ : $\\text{Card}(A \\times B) = \\text{Card}(A) \\times \\text{Card}(B)$.\n\n" +
        "- **Principe multiplicatif** : un choix en plusieurs étapes, avec $n_1$ possibilités puis $n_2$ possibilités, etc., donne $n_1 \\times n_2 \\times \\dots$ résultats. L'arbre le montre : chaque branche se divise de la même façon.\n" +
        "- Un **k-uplet** (ou **k-liste**) d'éléments de $E$ est une liste **ordonnée** de $k$ éléments, **avec répétitions possibles**.\n" +
        "- Si $\\text{Card}(E) = n$, il y a $n^k$ k-uplets : $n$ choix pour chaque position.\n\n" +
        "Exemples : un code, des lancers de dé successifs, des tirages successifs **avec remise**.",
      figure: "arbre-produit",
      exemple: {
        enonce: "Un digicode est formé d'une lettre parmi A, B, C, suivie de $4$ chiffres. Combien de codes différents ?",
        solution: "$3$ choix pour la lettre, puis $10$ choix pour chacun des $4$ chiffres (répétitions permises) : $3 \\times 10^4 = 30\\,000$ codes."
      }
    },
    {
      titre: "Les parties d'un ensemble",
      texte:
        "Une **partie** (ou sous-ensemble) de $E$ est un ensemble d'éléments pris dans $E$ : **sans ordre** et **sans répétition**. L'ensemble vide $\\varnothing$ et $E$ lui-même sont des parties de $E$.\n\n" +
        "**Un ensemble à $n$ éléments a $2^n$ parties.**\n\n" +
        "Pourquoi ? Pour chaque élément, on répond « dedans » ($1$) ou « pas dedans » ($0$). Une partie correspond donc à un $n$-uplet de $\\{0\\,;1\\}$, et il y en a $2^n$.",
      exemple: {
        enonce: "Écris toutes les parties de $E = \\{a\\,;b\\,;c\\}$.",
        solution: "$\\varnothing$ ; $\\{a\\}$ ; $\\{b\\}$ ; $\\{c\\}$ ; $\\{a\\,;b\\}$ ; $\\{a\\,;c\\}$ ; $\\{b\\,;c\\}$ ; $\\{a\\,;b\\,;c\\}$. Il y en a $8 = 2^3$.\n\nPar exemple, $\\{a\\,;c\\}$ correspond au triplet $(1\\,;0\\,;1)$ : $a$ dedans, $b$ non, $c$ dedans."
      }
    },
    {
      titre: "Factorielle, arrangements et permutations",
      texte:
        "Pour un entier $n \\geqslant 1$, **factorielle** $n$ vaut $n! = 1 \\times 2 \\times \\dots \\times n$, et par convention $0! = 1$.\n\n" +
        "- Un **k-uplet d'éléments distincts** (ordre important, **sans répétition**) d'un ensemble à $n$ éléments : il y en a $n \\times (n - 1) \\times \\dots \\times (n - k + 1) = \\dfrac{n!}{(n - k)!}$, pour $k \\leqslant n$.\n" +
        "- Une **permutation** de $E$ est une façon de ranger **tous** ses éléments : il y en a $n!$.\n\n" +
        "Les factorielles grandissent très vite : $5! = 120$, mais $10! = 3\\,628\\,800$.\n\n" +
        "Exemples : un classement, un podium, des tirages successifs **sans remise**, des anagrammes.",
      exemple: {
        enonce: "$8$ coureurs disputent une course. Combien de podiums (or, argent, bronze) possibles ? Combien d'ordres d'arrivée complets ?",
        solution: "Podium : $8$ choix pour l'or, puis $7$ pour l'argent, puis $6$ pour le bronze : $8 \\times 7 \\times 6 = 336$.\n\nOrdre complet : une permutation des $8$ coureurs, soit $8! = 40\\,320$."
      }
    },
    {
      titre: "Combinaisons",
      texte:
        "Une **combinaison** de $k$ éléments de $E$ est une **partie** de $E$ à $k$ éléments : **pas d'ordre**, **pas de répétition**. Leur nombre est le coefficient binomial $\\dbinom{n}{k}$ (« $k$ parmi $n$ »).\n\n" +
        "$\\dbinom{n}{k} = \\dfrac{n!}{k!\\,(n - k)!} = \\dfrac{n \\times (n - 1) \\times \\dots \\times (n - k + 1)}{k!}$\n\n" +
        "- Pourquoi diviser par $k!$ ? Chaque groupe de $k$ éléments peut être rangé de $k!$ façons : les k-uplets distincts comptent chaque groupe $k!$ fois.\n" +
        "- $\\dbinom{n}{0} = 1$, $\\dbinom{n}{1} = n$ et $\\dbinom{n}{2} = \\dfrac{n(n - 1)}{2}$.\n" +
        "- $\\dbinom{n}{k}$ compte aussi les **mots** de $n$ lettres formés de $k$ lettres A et $n - k$ lettres B, ou les **chemins** d'un arbre à $k$ succès (comme pour la loi binomiale).",
      exemple: {
        enonce: "Une classe de $30$ élèves élit $2$ délégués. Combien de choix possibles ? Et si l'on élit un président et un vice-président ?",
        solution: "Deux délégués : l'ordre ne compte pas, $\\dbinom{30}{2} = \\dfrac{30 \\times 29}{2} = 435$.\n\nPrésident puis vice-président : l'ordre compte, $30 \\times 29 = 870$, soit deux fois plus, car chaque paire peut être rangée de $2! = 2$ façons."
      }
    },
    {
      titre: "Propriétés des coefficients binomiaux",
      texte:
        "- **Symétrie** : $\\dbinom{n}{k} = \\dbinom{n}{n - k}$. Choisir les $k$ éléments que l'on prend, c'est choisir les $n - k$ que l'on laisse.\n" +
        "- **Relation de Pascal** : $\\dbinom{n}{k} + \\dbinom{n}{k + 1} = \\dbinom{n + 1}{k + 1}$ pour $0 \\leqslant k \\leqslant n - 1$.\n" +
        "- **Somme d'une ligne** : $\\dbinom{n}{0} + \\dbinom{n}{1} + \\dots + \\dbinom{n}{n} = 2^n$.\n\n" +
        "**Démonstration de Pascal par dénombrement** : dans un ensemble à $n + 1$ éléments, on fixe un élément $a$. Une partie à $k + 1$ éléments contient $a$ (il reste $k$ éléments à choisir parmi $n$) ou ne le contient pas ($k + 1$ éléments parmi $n$). Ces deux cas sont disjoints : on additionne.\n\n" +
        "**Démonstration de la somme** : on compte les $2^n$ parties d'un ensemble à $n$ éléments en les classant selon leur nombre d'éléments $k$, de $0$ à $n$.\n\n" +
        "Le **triangle de Pascal** se construit ligne par ligne avec la relation de Pascal. En Python :\n\n" +
        "```python\ndef pascal(n):\n    ligne = [1]\n    for i in range(n):\n        ligne = [1] + [ligne[k] + ligne[k + 1] for k in range(i)] + [1]\n    return ligne\n```",
      figure: "triangle-pascal",
      exemple: {
        enonce: "La ligne $5$ du triangle est $1\\;5\\;10\\;10\\;5\\;1$. Écris la ligne $6$ et vérifie la somme.",
        solution: "On additionne deux nombres voisins : $1\\;6\\;15\\;20\\;15\\;6\\;1$ (par exemple $10 + 10 = 20$, c'est $\\dbinom{5}{2} + \\dbinom{5}{3} = \\dbinom{6}{3}$).\n\nSomme : $1 + 6 + 15 + 20 + 15 + 6 + 1 = 64 = 2^6$."
      }
    },
    {
      titre: "Choisir le bon outil",
      texte:
        "Avant de calculer, deux questions : **l'ordre compte-t-il ?** **Les répétitions sont-elles possibles ?**\n\n" +
        "- Ordre important, répétitions possibles : **k-uplets**, $n^k$ (codes, tirages successifs avec remise).\n" +
        "- Ordre important, sans répétition : **k-uplets d'éléments distincts**, $\\dfrac{n!}{(n - k)!}$ (classements, tirages successifs sans remise).\n" +
        "- On range **tous** les éléments : **permutations**, $n!$.\n" +
        "- Ordre sans importance, sans répétition : **combinaisons**, $\\dbinom{n}{k}$ (groupes, mains de cartes, tirages simultanés).\n\n" +
        "**En probabilités**, quand toutes les issues sont équiprobables : $P(A) = \\dfrac{\\text{Card}(A)}{\\text{Card}(\\Omega)}$. On compte $A$ et $\\Omega$ avec **le même modèle**.",
      exemple: {
        enonce: "Une urne contient $5$ boules rouges et $3$ vertes. On tire simultanément $3$ boules. Quelle est la probabilité d'obtenir $3$ boules rouges ?",
        solution: "Tirage simultané : on compte des combinaisons. $\\text{Card}(\\Omega) = \\dbinom{8}{3} = 56$ et $\\text{Card}(A) = \\dbinom{5}{3} = 10$.\n\n$P(A) = \\dfrac{10}{56} = \\dfrac{5}{28} \\approx 0{,}179$."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "cd-additif", titre: "Principe additif", etape: "Principes de base", nb: 4 },
    { type: "cd-multiplicatif", titre: "Principe multiplicatif", etape: "Principes de base", nb: 4 },
    { type: "cd-k-uplets", titre: "Compter des k-uplets", etape: "Principes de base", nb: 5 },
    { type: "cd-parties", titre: "Parties d'un ensemble", etape: "Principes de base", nb: 4 },
    { type: "cd-factorielle", titre: "Calculer avec des factorielles", etape: "Listes sans répétition", nb: 5 },
    { type: "cd-permutations", titre: "Permutations", etape: "Listes sans répétition", nb: 4 },
    { type: "cd-arrangements", titre: "k-uplets d'éléments distincts", etape: "Listes sans répétition", nb: 5 },
    { type: "cd-combinaisons", titre: "Combinaisons", etape: "Combinaisons", nb: 5 },
    { type: "cd-pascal", titre: "Propriétés des coefficients binomiaux", etape: "Combinaisons", nb: 5 },
    { type: "cd-chemins", titre: "Mots et chemins", etape: "Combinaisons", nb: 4 },
    { type: "cd-modele", titre: "Quel outil choisir ?", etape: "Défi", nb: 6 },
    { type: "cd-proba", titre: "Probabilités et dénombrement", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    {
      question: "$A$ et $B$ sont deux parties disjointes d'un ensemble, avec $\\text{Card}(A) = 7$ et $\\text{Card}(B) = 5$. Que vaut $\\text{Card}(A \\cup B)$ ?",
      choix: ["$35$", "$12$", "$2$", "On ne peut pas savoir"],
      bonne: 1,
      explication: "Disjoints : on additionne, $7 + 5 = 12$."
    },
    {
      question: "Parmi $40$ élèves, $25$ aiment le rap, $18$ le mgodro et $10$ les deux. Combien n'aiment aucun des deux ?",
      choix: ["$7$", "$3$", "$17$", "$0$"],
      bonne: 0,
      explication: "$25 + 18 - 10 = 33$ aiment au moins l'un des deux, donc $40 - 33 = 7$."
    },
    {
      question: "Un restaurant propose $4$ entrées, $5$ plats et $3$ desserts. Combien de menus entrée-plat-dessert ?",
      choix: ["$12$", "$60$", "$20$", "$4^5$"],
      bonne: 1,
      explication: "Principe multiplicatif : $4 \\times 5 \\times 3 = 60$."
    },
    {
      question: "Si $\\text{Card}(A) = 3$ et $\\text{Card}(B) = 6$, combien d'éléments a $A \\times B$ ?",
      choix: ["$9$", "$18$", "$3^6$", "$6^3$"],
      bonne: 1,
      explication: "$\\text{Card}(A \\times B) = 3 \\times 6 = 18$."
    },
    {
      question: "Combien de codes de $4$ chiffres (de $0$ à $9$, répétitions permises) ?",
      choix: ["$4^{10}$", "$10 \\times 9 \\times 8 \\times 7$", "$10^4$", "$\\dbinom{10}{4}$"],
      bonne: 2,
      explication: "$10$ choix pour chacune des $4$ positions : $10^4 = 10\\,000$."
    },
    {
      question: "On répond au hasard aux $6$ questions d'un QCM ; chacune a $3$ réponses possibles. Combien de grilles de réponses différentes ?",
      choix: ["$6^3$", "$3^6$", "$18$", "$6!$"],
      bonne: 1,
      explication: "Un $6$-uplet de réponses, $3$ choix à chaque question : $3^6 = 729$."
    },
    {
      question: "Combien de parties a un ensemble à $5$ éléments ?",
      choix: ["$10$", "$25$", "$32$", "$120$"],
      bonne: 2,
      explication: "$2^5 = 32$, en comptant $\\varnothing$ et l'ensemble lui-même."
    },
    {
      question: "Que vaut $\\dfrac{9!}{7!}$ ?",
      choix: ["$2$", "$72$", "$\\dfrac{9}{7}$", "$63$"],
      bonne: 1,
      explication: "$\\dfrac{9!}{7!} = 9 \\times 8 = 72$ : tous les facteurs de $1$ à $7$ se simplifient."
    },
    {
      question: "Que vaut $0!$ ?",
      choix: ["$0$", "$1$", "Ce n'est pas défini", "$-1$"],
      bonne: 1,
      explication: "Par convention, $0! = 1$. C'est ce qui rend $\\dbinom{n}{0} = \\dfrac{n!}{0!\\,n!} = 1$ cohérent."
    },
    {
      question: "Combien d'anagrammes (avec ou sans sens) du mot LAGON ?",
      choix: ["$25$", "$5^5$", "$120$", "$60$"],
      bonne: 2,
      explication: "$5$ lettres distinctes à ranger : $5! = 120$."
    },
    {
      question: "Une association de $12$ membres élit un président, un secrétaire et un trésorier (trois personnes différentes). Combien de bureaux possibles ?",
      choix: ["$12^3$", "$\\dbinom{12}{3}$", "$12 \\times 11 \\times 10$", "$3!$"],
      bonne: 2,
      explication: "Les postes sont différents, donc l'ordre compte, et une personne n'a qu'un poste : $12 \\times 11 \\times 10 = 1\\,320$."
    },
    {
      question: "On tire successivement et sans remise $3$ cartes d'un jeu de $32$. Combien de tirages possibles ?",
      choix: ["$32^3$", "$32 \\times 31 \\times 30$", "$\\dbinom{32}{3}$", "$3 \\times 32$"],
      bonne: 1,
      explication: "Tirages successifs : l'ordre compte. Sans remise : pas de répétition. $32 \\times 31 \\times 30 = 29\\,760$."
    },
    {
      question: "Combien de mains de $5$ cartes peut-on former avec un jeu de $32$ cartes ?",
      choix: ["$32^5$", "$\\dfrac{32!}{27!}$", "$\\dbinom{32}{5}$", "$5!$"],
      bonne: 2,
      explication: "Une main est un ensemble de cartes, sans ordre : $\\dbinom{32}{5} = 201\\,376$."
    },
    {
      question: "Que vaut $\\dbinom{20}{2}$ ?",
      choix: ["$40$", "$190$", "$380$", "$400$"],
      bonne: 1,
      explication: "$\\dbinom{20}{2} = \\dfrac{20 \\times 19}{2} = 190$."
    },
    {
      question: "$\\dbinom{15}{11}$ est égal à…",
      choix: ["$\\dbinom{15}{4}$", "$\\dbinom{11}{15}$", "$\\dbinom{15}{12}$", "$15 \\times 11$"],
      bonne: 0,
      explication: "Symétrie : $\\dbinom{15}{11} = \\dbinom{15}{15 - 11} = \\dbinom{15}{4}$."
    },
    {
      question: "$\\dbinom{9}{3} + \\dbinom{9}{4}$ est égal à…",
      choix: ["$\\dbinom{9}{7}$", "$\\dbinom{18}{7}$", "$\\dbinom{10}{4}$", "$\\dbinom{10}{3}$"],
      bonne: 2,
      explication: "Relation de Pascal : $\\dbinom{n}{k} + \\dbinom{n}{k + 1} = \\dbinom{n + 1}{k + 1}$ avec $n = 9$ et $k = 3$."
    },
    {
      question: "Que vaut $\\dbinom{7}{0} + \\dbinom{7}{1} + \\dots + \\dbinom{7}{7}$ ?",
      choix: ["$7$", "$49$", "$128$", "$5\\,040$"],
      bonne: 2,
      explication: "C'est le nombre total de parties d'un ensemble à $7$ éléments : $2^7 = 128$."
    },
    {
      question: "Combien de mots de $8$ lettres formés de $3$ lettres A et $5$ lettres B ?",
      choix: ["$2^8$", "$\\dbinom{8}{3}$", "$8!$", "$3 \\times 5$"],
      bonne: 1,
      explication: "Un mot est fixé par les $3$ positions des A parmi $8$ : $\\dbinom{8}{3} = 56$."
    },
    {
      question: "On tire simultanément $2$ boules dans une urne de $10$ boules. Combien de tirages possibles ?",
      choix: ["$100$", "$90$", "$45$", "$20$"],
      bonne: 2,
      explication: "Tirage simultané : pas d'ordre, $\\dbinom{10}{2} = 45$."
    },
    {
      question: "On tire simultanément $2$ boules dans une urne de $4$ rouges et $6$ noires. Quelle est la probabilité d'avoir $2$ rouges ?",
      choix: ["$\\dfrac{4}{10}$", "$\\dfrac{6}{45}$", "$\\dfrac{16}{100}$", "$\\dfrac{2}{10}$"],
      bonne: 1,
      explication: "$\\dfrac{\\binom{4}{2}}{\\binom{10}{2}} = \\dfrac{6}{45} = \\dfrac{2}{15}$. On compte les issues favorables et toutes les issues avec le même modèle."
    }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Reconnaître la situation",
      etapes: [
        "Décrire un résultat possible par un exemple concret (un code, un groupe, un classement…).",
        "Se demander : **l'ordre compte-t-il ?** Échanger deux éléments donne-t-il un autre résultat ?",
        "Se demander : **les répétitions sont-elles possibles ?** (avec remise, un même chiffre deux fois…)",
        "Choisir : $n^k$ (ordre, répétitions), $\\dfrac{n!}{(n - k)!}$ (ordre, sans répétition), $n!$ (tout ranger), $\\dbinom{n}{k}$ (sans ordre, sans répétition)."
      ],
      exemple: "Choisir $3$ élèves pour représenter la classe : échanger deux élèves donne le même groupe, et un élève ne peut pas être choisi deux fois. C'est $\\dbinom{n}{3}$."
    },
    {
      titre: "Utiliser le principe multiplicatif",
      etapes: [
        "Découper le choix en étapes successives.",
        "Compter le nombre de possibilités à chaque étape, en tenant compte des choix déjà faits.",
        "Multiplier ces nombres (un arbre permet de vérifier sur un petit cas)."
      ],
      exemple: "Une plaque formée de $2$ lettres puis $3$ chiffres : $26 \\times 26 \\times 10 \\times 10 \\times 10 = 676\\,000$."
    },
    {
      titre: "Compter par le complémentaire",
      etapes: [
        "Repérer les expressions « au moins un », « pas tous » : le contraire est souvent plus simple.",
        "Compter tous les cas, puis ceux qui ne conviennent pas.",
        "Soustraire : $\\text{Card}(A) = \\text{Card}(E) - \\text{Card}(\\overline{A})$."
      ],
      exemple: "Codes de $4$ chiffres contenant au moins un $0$ : $10^4 - 9^4 = 10\\,000 - 6\\,561 = 3\\,439$."
    },
    {
      titre: "Calculer un coefficient binomial",
      etapes: [
        "Utiliser $\\dbinom{n}{k} = \\dfrac{n \\times (n - 1) \\times \\dots \\times (n - k + 1)}{k!}$ : $k$ facteurs en haut, $k!$ en bas.",
        "Si $k$ est grand, utiliser d'abord la symétrie $\\dbinom{n}{k} = \\dbinom{n}{n - k}$.",
        "Simplifier avant de multiplier. Pour de grands nombres, la calculatrice (touche nCr ou Combinaison)."
      ],
      exemple: "$\\dbinom{12}{10} = \\dbinom{12}{2} = \\dfrac{12 \\times 11}{2} = 66$."
    },
    {
      titre: "Calculer une probabilité par dénombrement",
      etapes: [
        "Justifier l'équiprobabilité (tirage au hasard, pièce ou dé équilibré…).",
        "Choisir **un** modèle (ordonné ou non) et compter $\\text{Card}(\\Omega)$.",
        "Compter $\\text{Card}(A)$ avec **le même** modèle, souvent par le principe multiplicatif.",
        "Conclure : $P(A) = \\dfrac{\\text{Card}(A)}{\\text{Card}(\\Omega)}$, simplifier la fraction."
      ],
      exemple: "On tire simultanément $2$ boules parmi $4$ rouges et $6$ noires. Une rouge et une noire : $\\dfrac{4 \\times 6}{\\binom{10}{2}} = \\dfrac{24}{45} = \\dfrac{8}{15}$."
    }
  ],
  erreurs: [
    "Additionner au lieu de multiplier quand les choix se font **successivement** (menus, codes).",
    "Compter deux fois les éléments de $A \\cap B$ quand $A$ et $B$ ne sont pas disjoints.",
    "Utiliser $\\dbinom{n}{k}$ alors que l'ordre compte (classement, postes différents, tirages successifs).",
    "Utiliser $\\dfrac{n!}{(n - k)!}$ alors que les répétitions sont permises : c'est alors $n^k$.",
    "Inverser $n^k$ et $k^n$ : la base est le nombre de choix **à chaque position**.",
    "Oublier l'ensemble vide quand on compte les parties ($2^n$ les compte toutes).",
    "Croire que $0! = 0$ : par convention $0! = 1$.",
    "Compter $\\Omega$ sans ordre et l'événement $A$ avec ordre (ou l'inverse) dans un calcul de probabilité."
  ]
};
