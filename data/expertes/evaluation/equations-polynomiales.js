/*
  ENTRAÎNEMENT : Terminale maths expertes — chapitre 4, Équations polynomiales
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre expertes-equations-polynomiales.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths expertes.
  Équations du second degré à coefficients réels seulement (programme) ; degré 3 par factorisation.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["expertes-equations-polynomiales"] = {
  revisions: {
    intro: "Les équations polynomiales en un coup d'œil : second degré dans $\\mathbb{C}$, factorisation par $z - a$, degré $3$, racines conjuguées, somme et produit des racines. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Second degré dans $\\mathbb{C}$",
        texte:
          "Pour $az^2 + bz + c = 0$ avec $a$, $b$, $c$ réels, $a \\neq 0$ et $\\Delta = b^2 - 4ac$ :\n" +
          "- si $\\Delta > 0$, deux solutions réelles $\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ ;\n" +
          "- si $\\Delta = 0$, une solution réelle $-\\dfrac{b}{2a}$ ;\n" +
          "- si $\\Delta < 0$, deux solutions complexes conjuguées $\\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a}$. Par exemple, $z^2 + 9 = 0$ a pour solutions $3i$ et $-3i$."
      },
      {
        titre: "Factoriser par $z - a$",
        texte: "Si $P(a) = 0$, alors $P(z) = (z - a)Q(z)$, avec $Q$ de degré $n - 1$. Par exemple, $z^n - a^n = (z - a)Q(z)$ avec $Q(z) = z^{n-1} + az^{n-2} + \\dots + a^{n-1}$."
      },
      {
        titre: "Nombre de racines",
        texte: "Un polynôme de degré $n$ a **au plus** $n$ racines. Deux polynômes égaux pour tout $z$ ont les mêmes coefficients : c'est ce qui permet d'identifier."
      },
      {
        titre: "Degré 3",
        texte: "On trouve une racine $a$ (on essaie $0$, $\\pm 1$, $\\pm 2$, $\\pm i$…), on écrit $P(z) = (z - a)(z^2 + bz + c)$ en identifiant les coefficients, puis on résout l'équation du second degré, sans oublier la racine $a$."
      },
      {
        titre: "Racines conjuguées",
        texte: "Si $P$ est à coefficients **réels** et si $P(z_0) = 0$, alors $P\\left(\\overline{z_0}\\right) = \\overline{P(z_0)} = 0$ : le conjugué d'une racine est encore une racine."
      },
      {
        titre: "Somme et produit",
        texte: "Les solutions de $az^2 + bz + c = 0$ vérifient $z_1 + z_2 = -\\dfrac{b}{a}$ et $z_1z_2 = \\dfrac{c}{a}$. Deux nombres de somme $S$ et de produit $P$ sont les solutions de $z^2 - Sz + P = 0$."
      }
    ],
    pieges: [
      "Dire qu'une équation du second degré « n'a pas de solution » quand $\\Delta < 0$ : dans $\\mathbb{C}$, elle en a deux.",
      "Écrire $\\sqrt{\\Delta}$ quand $\\Delta < 0$ : la racine carrée est réservée aux réels positifs, on écrit $i\\sqrt{-\\Delta}$.",
      "Oublier la racine carrée : si $\\Delta = -16$, on utilise $4i$, pas $16i$.",
      "Factoriser par $z + a$ alors que $a$ est la racine : c'est $z - a$.",
      "Se tromper de signes dans $z^3 - a^3 = (z - a)(z^2 + az + a^2)$.",
      "Oublier la racine déjà connue dans les solutions d'une équation de degré $3$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Résoudre dans $\\mathbb{C}$",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes. Résous chaque équation dans $\\mathbb{C}$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "$z^2 + 4z + 20 = 0$.",
            indice: "Calcule $\\Delta$ : s'il est négatif, les solutions sont $\\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a}$.",
            corrige: "$\\Delta = 16 - 80 = -64 < 0$ et $\\sqrt{64} = 8$. Les solutions sont $z = \\dfrac{-4 - 8i}{2} = -2 - 4i$ et $z = -2 + 4i$."
          },
          {
            n: "2.", points: 1.5,
            texte: "$2z^2 - 2z + 1 = 0$.",
            indice: "Attention : ici $a = 2$, donc le dénominateur est $2a = 4$.",
            corrige: "$\\Delta = 4 - 8 = -4 < 0$. Les solutions sont $z = \\dfrac{2 - 2i}{4} = \\dfrac{1}{2} - \\dfrac{1}{2}i$ et $z = \\dfrac{1}{2} + \\dfrac{1}{2}i$."
          },
          {
            n: "3.", points: 2,
            texte: "$z^4 + 4z^2 - 5 = 0$.",
            indice: "Pose $Z = z^2$ : résous d'abord $Z^2 + 4Z - 5 = 0$.",
            corrige: "Avec $Z = z^2$ : $Z^2 + 4Z - 5 = 0$, $\\Delta = 16 + 20 = 36$, donc $Z = \\dfrac{-4 - 6}{2} = -5$ ou $Z = \\dfrac{-4 + 6}{2} = 1$.\n\n$z^2 = 1 \\iff z = 1$ ou $z = -1$ ; $z^2 = -5 \\iff z = i\\sqrt{5}$ ou $z = -i\\sqrt{5}$.\n\nL'équation a quatre solutions : $-1$, $1$, $-i\\sqrt{5}$ et $i\\sqrt{5}$."
          },
          {
            n: "4.", points: 2,
            texte: "$z + \\dfrac{25}{z} = 6$, avec $z \\neq 0$.",
            indice: "Multiplie les deux membres par $z$, puis passe tout dans le membre de gauche.",
            corrige: "Pour $z \\neq 0$, l'équation équivaut à $z^2 + 25 = 6z$, soit $z^2 - 6z + 25 = 0$. $\\Delta = 36 - 100 = -64$, donc $z = \\dfrac{6 - 8i}{2} = 3 - 4i$ ou $z = 3 + 4i$, deux nombres non nuls : ce sont les solutions.\n\nRemarque : ces deux nombres ont pour module $5$, et pour $|z| = 5$, $\\dfrac{25}{z} = \\overline{z}$."
          }
        ]
      },
      {
        titre: "Une équation de degré 3 et un carré",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On considère le polynôme $P(z) = z^3 - 8z^2 + 24z - 32$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Vérifie que $4$ est une racine de $P$.",
            indice: "Calcule $P(4)$.",
            corrige: "$P(4) = 64 - 128 + 96 - 32 = 0$ : $4$ est une racine de $P$."
          },
          {
            n: "2.", points: 2,
            texte: "Détermine les réels $b$ et $c$ tels que, pour tout $z$, $P(z) = (z - 4)(z^2 + bz + c)$.",
            indice: "Développe $(z - 4)(z^2 + bz + c)$, puis identifie les coefficients avec ceux de $P$.",
            corrige: "$(z - 4)(z^2 + bz + c) = z^3 + (b - 4)z^2$ ${} + (c - 4b)z - 4c$.\n\nEn identifiant : $b - 4 = -8$, $c - 4b = 24$ et $-4c = -32$. Donc $b = -4$ et $c = 8$ (on vérifie : $c - 4b = 8 + 16 = 24$). Ainsi $P(z) = (z - 4)(z^2 - 4z + 8)$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Résous l'équation $P(z) = 0$ dans $\\mathbb{C}$.",
            indice: "Un produit est nul si et seulement si l'un de ses facteurs est nul.",
            corrige: "$P(z) = 0 \\iff z = 4$ ou $z^2 - 4z + 8 = 0$. Pour la seconde équation, $\\Delta = 16 - 32 = -16$, donc $z = \\dfrac{4 - 4i}{2} = 2 - 2i$ ou $z = 2 + 2i$.\n\nLes solutions sont $4$, $2 - 2i$ et $2 + 2i$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Dans le plan complexe, on note $A$, $B$ et $C$ les points d'affixes $4$, $2 + 2i$ et $2 - 2i$. Montre que $OBAC$ est un carré.",
            indice: "Calcule les longueurs des quatre côtés, puis compare les diagonales $[OA]$ et $[BC]$.",
            corrige: "$OB = |2 + 2i| = 2\\sqrt{2}$, $BA = |4 - (2 + 2i)| = |2 - 2i| = 2\\sqrt{2}$, $AC = |2 - 2i - 4| = |-2 - 2i| = 2\\sqrt{2}$ et $OC = |2 - 2i| = 2\\sqrt{2}$ : $OBAC$ est un losange.\n\nSes diagonales ont la même longueur : $OA = 4$ et $BC = |-4i| = 4$. Un losange dont les diagonales ont la même longueur est un carré.",
            figureCorrige: (o) => o.graph({
              xmin: -0.8, xmax: 4.8, ymin: -2.8, ymax: 2.8,
              curves: [
                { f: (x) => x, a: 0, b: 2, closed: false, couleur: 0 },
                { f: (x) => 4 - x, a: 2, b: 4, closed: false, couleur: 0 },
                { f: (x) => x - 4, a: 2, b: 4, closed: false, couleur: 0 },
                { f: (x) => -x, a: 0, b: 2, closed: false, couleur: 0 }
              ],
              chemins: [[[2, 2], [2, -2]]],
              points: [{ x: 2, y: 2 }, { x: 4, y: 0 }, { x: 2, y: -2 }],
              marques: [{ x: 2, y: 2.3, texte: "B" }, { x: 4.35, y: 0.3, texte: "A" }, { x: 2, y: -2.55, texte: "C" }],
              aria: "Le carré OBAC, avec B(2 ; 2), A(4 ; 0) et C(2 ; −2), et sa diagonale [BC] en pointillés"
            })
          },
          {
            n: "5.", points: 1,
            texte: "Déduis-en les solutions de l'équation $(z + 1)^3 - 8(z + 1)^2$ ${} + 24(z + 1) - 32 = 0$.",
            indice: "Cette équation s'écrit $P(z + 1) = 0$.",
            corrige: "Elle s'écrit $P(z + 1) = 0$, donc $z + 1$ vaut $4$, $2 - 2i$ ou $2 + 2i$. Les solutions sont $3$, $1 - 2i$ et $1 + 2i$."
          }
        ]
      },
      {
        titre: "Somme et produit des racines",
        duree: 20, points: 6, calculatrice: false,
        contexte: "On rappelle que si $z_1$ et $z_2$ sont les solutions de $az^2 + bz + c = 0$, alors $z_1 + z_2 = -\\dfrac{b}{a}$ et $z_1z_2 = \\dfrac{c}{a}$. Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine deux nombres complexes dont la somme vaut $2$ et le produit vaut $10$.",
            indice: "Deux nombres de somme $S$ et de produit $P$ sont les solutions de $z^2 - Sz + P = 0$.",
            corrige: "Ce sont les solutions de $z^2 - 2z + 10 = 0$ : $\\Delta = 4 - 40 = -36$, donc $1 - 3i$ et $1 + 3i$.\n\nVérification : $(1 - 3i) + (1 + 3i) = 2$ et $(1 - 3i)(1 + 3i) = 1 + 9 = 10$."
          },
          {
            n: "2.", points: 1.5,
            texte: "On note $z_1$ et $z_2$ les solutions de $z^2 - 3z + 5 = 0$. Sans les calculer, détermine $z_1 + z_2$ et $z_1z_2$, puis $z_1^2 + z_2^2$ et $\\dfrac{1}{z_1} + \\dfrac{1}{z_2}$.",
            indice: "$z_1^2 + z_2^2 = (z_1 + z_2)^2 - 2z_1z_2$ et $\\dfrac{1}{z_1} + \\dfrac{1}{z_2} = \\dfrac{z_1 + z_2}{z_1z_2}$.",
            corrige: "$z_1 + z_2 = 3$ et $z_1z_2 = 5$. Donc $z_1^2 + z_2^2 = 3^2 - 2 \\times 5 = -1$ et $\\dfrac{1}{z_1} + \\dfrac{1}{z_2} = \\dfrac{3}{5}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "On sait que $2 - 5i$ est solution de $z^2 + bz + c = 0$, où $b$ et $c$ sont des réels. Détermine l'autre solution, puis $b$ et $c$.",
            indice: "Les coefficients sont réels : le conjugué d'une solution est aussi solution.",
            corrige: "Les coefficients étant réels, l'autre solution est $2 + 5i$. Alors $-b = (2 - 5i) + (2 + 5i) = 4$ et $c = (2 - 5i)(2 + 5i) = 4 + 25 = 29$ : $b = -4$ et $c = 29$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Soit $m$ un réel et $(E_m)$ l'équation $z^2 - 2mz + 4 = 0$. Pour quelles valeurs de $m$ l'équation $(E_m)$ a-t-elle deux solutions non réelles ? Montre qu'alors leurs images sont sur un cercle de centre $O$ dont tu donneras le rayon.",
            indice: "Étudie le signe de $\\Delta = 4m^2 - 16$. Deux solutions conjuguées $z$ et $\\overline{z}$ ont pour produit $z\\overline{z} = |z|^2$.",
            corrige: "$\\Delta = 4m^2 - 16 < 0 \\iff m^2 < 4 \\iff -2 < m < 2$.\n\nLes deux solutions sont alors conjuguées, donc leur produit vaut $z\\overline{z} = |z|^2$. Or ce produit vaut $\\dfrac{c}{a} = 4$ : $|z| = 2$. Les images sont sur le cercle de centre $O$ et de rayon $2$."
          }
        ]
      }
    ]
  }
};
