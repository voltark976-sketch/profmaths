/*
  ENTRAÎNEMENT : Terminale maths expertes — chapitre 1, Nombres complexes : point de vue algébrique
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre expertes-complexes-algebrique.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths expertes.
  Les équations du second degré dans ℂ sont au chapitre 4 et les suites de complexes au chapitre 2 : elles n'apparaissent pas ici.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["expertes-complexes-algebrique"] = {
  revisions: {
    intro: "Les nombres complexes sous forme algébrique en un coup d'œil : parties réelle et imaginaire, calculs avec $i^2 = -1$, conjugué, quotient, puissances de $i$ et formule du binôme. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Forme algébrique",
        texte: "$z = a + ib$, avec $a = \\text{Re}(z)$ et $b = \\text{Im}(z)$ réels, et $i^2 = -1$. $z$ est réel si $b = 0$, imaginaire pur si $a = 0$. Deux nombres complexes sont égaux si et seulement si ils ont la même partie réelle et la même partie imaginaire."
      },
      {
        titre: "Calculer",
        texte: "Les règles de calcul de $\\mathbb{R}$ restent valables, avec $i^2 = -1$ : $(1 + i)(2 - 3i) = 2 - 3i + 2i - 3i^2 = 5 - i$."
      },
      {
        titre: "Conjugué",
        texte:
          "Pour $z = a + ib$, $\\overline{z} = a - ib$, et :\n" +
          "- $z + \\overline{z} = 2a$ et $z - \\overline{z} = 2ib$ ;\n" +
          "- $z\\overline{z} = a^2 + b^2$, un réel positif ;\n" +
          "- $\\overline{zw} = \\overline{z}\\,\\overline{w}$ et $\\overline{z^n} = \\overline{z}^{\\,n}$."
      },
      {
        titre: "Quotient",
        texte: "On multiplie le numérateur et le dénominateur par le conjugué du dénominateur : $\\dfrac{1}{1 + 2i} = \\dfrac{1 - 2i}{(1 + 2i)(1 - 2i)} = \\dfrac{1 - 2i}{5}$."
      },
      {
        titre: "Puissances de $i$",
        texte: "$i^2 = -1$, $i^3 = -i$ et $i^4 = 1$ : $i^n$ ne dépend que du reste de $n$ dans la division par $4$."
      },
      {
        titre: "Formule du binôme",
        texte: "$(a + b)^n = \\displaystyle\\sum_{k=0}^{n} \\binom{n}{k} a^{n-k}b^k$, aussi pour $a$ et $b$ complexes : pour $n = 3$, les coefficients sont $1$, $3$, $3$, $1$, lus dans le triangle de Pascal."
      }
    ],
    pieges: [
      "Écrire $\\text{Im}(3 - 4i) = -4i$ : la partie imaginaire est un réel, $-4$.",
      "Oublier $i^2 = -1$ en développant : $(1 + i)^2 = 2i$, et non $1 + i^2$.",
      "Diviser partie par partie : $\\dfrac{a + ib}{c + id}$ n'est pas $\\dfrac{a}{c} + i\\dfrac{b}{d}$.",
      "Écrire $(c + id)(c - id) = c^2 - d^2$ : c'est $c^2 + d^2$.",
      "Changer le signe de la partie réelle en conjuguant : seul le signe de la partie imaginaire change.",
      "Identifier les parties réelles et imaginaires avant d'avoir regroupé tous les termes."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Calculer dans $\\mathbb{C}$",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Écris sous forme algébrique $z_1 = (3 - i)(2 + 5i)$ et $z_2 = (1 - 3i)^2$.",
            indice: "Développe, puis remplace $i^2$ par $-1$.",
            corrige: "$z_1 = 6 + 15i - 2i - 5i^2 = 6 + 13i + 5 = 11 + 13i$.\n\n$z_2 = 1 - 6i + 9i^2 = 1 - 6i - 9 = -8 - 6i$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Écris sous forme algébrique $z_3 = \\dfrac{4 + 3i}{2 - i}$.",
            indice: "Multiplie le numérateur et le dénominateur par $2 + i$.",
            corrige: "$z_3 = \\dfrac{(4 + 3i)(2 + i)}{(2 - i)(2 + i)} = \\dfrac{8 + 4i + 6i + 3i^2}{4 + 1} = \\dfrac{5 + 10i}{5} = 1 + 2i$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule $i^{2030}$, puis la somme $S = 1 + i + i^2 + \\dots + i^{2030}$.",
            indice: "Divise $2030$ par $4$. Pour $S$, regroupe les termes par paquets de quatre puissances consécutives.",
            corrige: "$2030 = 4 \\times 507 + 2$, donc $i^{2030} = \\left(i^4\\right)^{507} \\times i^2 = -1$.\n\nQuatre puissances consécutives ont une somme nulle : $i^k(1 + i + i^2 + i^3) = i^k(1 + i - 1 - i) = 0$. Les $2028$ termes de $1$ à $i^{2027}$ forment $507$ paquets nuls, donc $S = i^{2028} + i^{2029} + i^{2030} = 1 + i - 1 = i$."
          },
          {
            n: "4.", points: 2.5,
            texte:
              "Pour chaque affirmation, dis si elle est vraie ou fausse, puis justifie.\n" +
              "- (a) Pour tout nombre complexe $z$, $z^2$ est un réel positif.\n" +
              "- (b) Pour tout nombre complexe $z$, $z\\overline{z}$ est un réel positif.\n" +
              "- (c) Pour tous nombres complexes $z$ et $w$, $\\text{Re}(zw) = \\text{Re}(z) \\times \\text{Re}(w)$.",
            indice: "Pour montrer qu'une affirmation « pour tout » est fausse, un seul contre-exemple suffit : essaie $z = i$.",
            corrige:
              "- (a) **Faux** : pour $z = i$, $z^2 = -1 < 0$.\n" +
              "- (b) **Vrai** : avec $z = a + ib$, $z\\overline{z} = a^2 + b^2 \\geqslant 0$.\n" +
              "- (c) **Faux** : pour $z = w = i$, $\\text{Re}(zw) = \\text{Re}(-1) = -1$, alors que $\\text{Re}(z) \\times \\text{Re}(w) = 0 \\times 0 = 0$."
          }
        ]
      },
      {
        titre: "Résoudre des équations",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes. On cherche les solutions dans $\\mathbb{C}$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Résous l'équation $(1 + i)z = 3 - i$.",
            indice: "$z = \\dfrac{3 - i}{1 + i}$ : multiplie par le conjugué du dénominateur.",
            corrige: "$z = \\dfrac{3 - i}{1 + i} = \\dfrac{(3 - i)(1 - i)}{2} = \\dfrac{3 - 3i - i + i^2}{2} = \\dfrac{2 - 4i}{2} = 1 - 2i$."
          },
          {
            n: "2.", points: 2,
            texte: "Résous l'équation $3z - 2\\overline{z} = 2 + 10i$.",
            indice: "Pose $z = a + ib$ et identifie les parties réelles et imaginaires.",
            corrige: "Avec $z = a + ib$ : $3z - 2\\overline{z} = 3a + 3ib - 2a + 2ib = a + 5ib$. Donc $a + 5ib = 2 + 10i \\iff a = 2$ et $5b = 10$, soit $b = 2$. La solution est $z = 2 + 2i$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Détermine les nombres complexes $z$ tels que $\\text{Re}(z) = 3$ et $z\\overline{z} = 25$.",
            indice: "$z\\overline{z} = a^2 + b^2$.",
            corrige: "Avec $z = 3 + ib$ : $z\\overline{z} = 9 + b^2 = 25 \\iff b^2 = 16 \\iff b = 4$ ou $b = -4$. Les solutions sont $3 + 4i$ et $3 - 4i$."
          },
          {
            n: "4.", points: 2,
            texte: "Pour $z = x + iy$, avec $x$ et $y$ réels, on pose $Z = z^2 + 4\\overline{z}$. Exprime la partie réelle et la partie imaginaire de $Z$ en fonction de $x$ et $y$, puis détermine les nombres complexes $z$ pour lesquels $Z$ est un réel.",
            indice: "$z^2 = x^2 - y^2 + 2ixy$. $Z$ est réel quand sa partie imaginaire est nulle : factorise-la.",
            corrige: "$Z = x^2 - y^2 + 2ixy + 4x - 4iy$, donc $\\text{Re}(Z) = x^2 - y^2 + 4x$ et $\\text{Im}(Z) = 2xy - 4y = 2y(x - 2)$.\n\n$Z$ est réel $\\iff 2y(x - 2) = 0 \\iff y = 0$ ou $x = 2$ : $z$ est un réel, ou $z$ a pour partie réelle $2$. Par exemple, pour $z = 2 + i$ : $Z = 3 + 4i + 8 - 4i = 11$."
          }
        ]
      },
      {
        titre: "Binôme et sommes de coefficients",
        duree: 20, points: 6, calculatrice: false,
        contexte: "On rappelle que, pour tous nombres complexes $a$ et $b$ et tout entier naturel $n$, $(a + b)^n = \\displaystyle\\sum_{k=0}^{n} \\binom{n}{k}a^{n-k}b^k$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $(1 + i)^2$, puis déduis-en $(1 + i)^4$ et $(1 + i)^8$.",
            indice: "$(1 + i)^4 = \\left((1 + i)^2\\right)^2$.",
            corrige: "$(1 + i)^2 = 1 + 2i + i^2 = 2i$, puis $(1 + i)^4 = (2i)^2 = -4$ et $(1 + i)^8 = (-4)^2 = 16$."
          },
          {
            n: "2.", points: 1.5,
            texte: "D'après la formule du binôme, $(1 + i)^8 = \\displaystyle\\sum_{k=0}^{8} \\binom{8}{k}i^k$. Donne $i^k$ pour $k$ allant de $0$ à $8$, puis écris la partie réelle et la partie imaginaire de cette somme.",
            indice: "Les termes avec $k$ pair sont réels, ceux avec $k$ impair sont imaginaires purs.",
            corrige: "$i^0 = 1$, $i^1 = i$, $i^2 = -1$, $i^3 = -i$, $i^4 = 1$, puis les mêmes valeurs reviennent : $i^5 = i$, $i^6 = -1$, $i^7 = -i$, $i^8 = 1$.\n\nPartie réelle : $\\binom{8}{0} - \\binom{8}{2} + \\binom{8}{4} - \\binom{8}{6} + \\binom{8}{8}$.\n\nPartie imaginaire : $\\binom{8}{1} - \\binom{8}{3} + \\binom{8}{5} - \\binom{8}{7}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Déduis-en, sans calculer de coefficient binomial, la valeur de $A = \\binom{8}{0} - \\binom{8}{2} + \\binom{8}{4} - \\binom{8}{6} + \\binom{8}{8}$ et celle de $B = \\binom{8}{1} - \\binom{8}{3} + \\binom{8}{5} - \\binom{8}{7}$. Vérifie avec la ligne $8$ du triangle de Pascal : $1$, $8$, $28$, $56$, $70$, $56$, $28$, $8$, $1$.",
            indice: "D'après la question 1, $(1 + i)^8 = 16$ : identifie les parties réelles et imaginaires.",
            corrige: "$A + iB = (1 + i)^8 = 16$, donc $A = 16$ et $B = 0$.\n\nVérification : $A = 1 - 28 + 70 - 28 + 1 = 16$ et $B = 8 - 56 + 56 - 8 = 0$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Avec la même méthode, calcule $C = \\binom{10}{1} - \\binom{10}{3} + \\binom{10}{5} - \\binom{10}{7} + \\binom{10}{9}$.",
            indice: "$(1 + i)^{10} = \\left((1 + i)^2\\right)^5$ : cherche sa partie imaginaire.",
            corrige: "$(1 + i)^{10} = (2i)^5 = 32i^5 = 32i$. Avec le binôme, la partie imaginaire de $(1 + i)^{10}$ est $C$ (les termes avec $k$ impair, de signes alternés). Donc $C = 32$.\n\nVérification : $10 - 120 + 252 - 120 + 10 = 32$."
          }
        ]
      }
    ]
  }
};
