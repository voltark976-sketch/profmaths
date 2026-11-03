/*
  ENTRAÎNEMENT : Seconde — chapitre 17, Problèmes de synthèse
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-synthese.
  Format : voir data/premiere/evaluation/second-degre-2.js. Trois problèmes qui mélangent les chapitres de l'année,
  comme au devoir commun. Logique : pas de symboles ∀ et ∃ (hors programme), comme dans le cours.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["seconde-synthese"] = {
  revisions: {
    intro: "Le bilan de l'année en un coup d'œil : choisir un outil, optimiser, démontrer en géométrie repérée, nier une proposition, réciproque et contraposée, types de raisonnement. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Choisir un outil",
        texte: "Le **graphique** donne vite une valeur approchée ; le **calcul** (équation, inéquation, signe) donne la valeur exacte ; un **programme** permet de balayer ou de simuler. On précise toujours les valeurs possibles de l'inconnue."
      },
      {
        titre: "Optimiser",
        texte: "On exprime la quantité en fonction de $x$, avec son intervalle, puis on cherche le maximum : tableau de valeurs, courbe, symétrie d'une parabole, ou une forme comme $a - b(x - c)^2$ avec $b > 0$, qui ne dépasse jamais $a$."
      },
      {
        titre: "Géométrie repérée",
        texte: "Longueurs : $AB^2 = (x_B - x_A)^2 + (y_B - y_A)^2$, puis la réciproque de Pythagore. Parallélogramme : $\\overrightarrow{AB} = \\overrightarrow{DC}$ ou diagonales de même milieu. Alignement : déterminant nul."
      },
      {
        titre: "Négation",
        texte: "Le contraire de « $P$ et $Q$ » est « non $P$ ou non $Q$ », celui de « $P$ ou $Q$ » est « non $P$ et non $Q$ ». Le contraire de $x > 3$ est $x \\leqslant 3$. Le contraire de « tous… » est « il en existe un qui ne… pas »."
      },
      {
        titre: "Implication",
        texte: "« Si $P$, alors $Q$ » se contredit par un contre-exemple : un cas où $P$ est vraie et $Q$ fausse. Sa réciproque est « si $Q$, alors $P$ » ; sa contraposée « si non $Q$, alors non $P$ » a toujours la même vérité qu'elle."
      },
      {
        titre: "Types de raisonnement",
        texte: "Démonstration directe, contre-exemple pour une affirmation « pour tout », disjonction des cas (pair ou impair, positif ou négatif), raisonnement par l'absurde."
      },
      {
        titre: "Rédiger",
        texte: "Une réponse est une phrase, avec l'unité. Une figure ou quelques exemples ne démontrent rien : ils aident seulement à conjecturer."
      }
    ],
    pieges: [
      "Oublier de préciser les valeurs possibles de l'inconnue.",
      "Conclure à partir d'une figure ou de quelques exemples : il faut démontrer.",
      "Confondre réciproque et contraposée.",
      "Nier « $P$ et $Q$ » en gardant « et » : la négation est « non $P$ ou non $Q$ ».",
      "Prendre $x < 3$ pour le contraire de $x > 3$ : c'est $x \\leqslant 3$.",
      "Répondre sans phrase ni unité."
    ]
  },

  evaluation: {
    intro: "Trois problèmes de synthèse comme au devoir commun (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "La zone plantée",
        duree: 25, points: 7, calculatrice: true,
        contexte: "$ABCD$ est un rectangle avec $AB = 8$ m et $AD = 6$ m. Pour un réel $x$, on place $M$ sur $[AB]$ et $N$ sur $[AD]$ tels que $AM = AN = x$. On plante des fleurs dans le quadrilatère $NMCD$, coloré sur la figure ; on note $f(x)$ son aire, en m².",
        figure: () => {
          const A = [40, 200], B = [280, 200], C = [280, 20], D = [40, 20], M = [115, 200], N = [40, 125];
          const pts = (L) => L.map((p) => p.join(",")).join(" ");
          let s = `<svg class="graph" viewBox="0 0 320 222" role="img" aria-label="Rectangle ABCD de 8 m sur 6 m ; M sur [AB] et N sur [AD] avec AM = AN = x ; le quadrilatère NMCD est coloré, les triangles AMN et MBC ne le sont pas">`;
          s += `<polygon points="${pts([N, M, C, D])}" style="fill:var(--lagon-pale);stroke:var(--lagon);stroke-width:1.6"/>`;
          s += `<polygon points="${pts([A, B, C, D])}" style="fill:none;stroke:var(--encre);stroke-width:1.8"/>`;
          const lab = (p, t, dx, dy, it) => `<text class="g-label" x="${p[0] + dx}" y="${p[1] + dy}" text-anchor="middle"${it ? ' style="font-style:italic;font-size:13px"' : ""}>${t}</text>`;
          s += lab(A, "A", -10, 14) + lab(B, "B", 10, 14) + lab(C, "C", 10, -4) + lab(D, "D", -10, -4) + lab(M, "M", 0, 16) + lab(N, "N", -12, 4);
          s += lab([(A[0] + M[0]) / 2, A[1]], "x", 0, 16, true) + lab([A[0], (A[1] + N[1]) / 2], "x", -12, 4, true);
          s += `<text class="g-label" x="200" y="216" text-anchor="middle" style="font-weight:400">8 m</text><text class="g-label" x="300" y="114" text-anchor="middle" style="font-weight:400">6 m</text>`;
          return s + `</svg>`;
        },
        questions: [
          {
            n: "1.", points: 1,
            texte: "Explique pourquoi $x$ est compris entre $0$ et $6$.",
            indice: "$N$ est sur le côté $[AD]$, et $M$ sur le côté $[AB]$.",
            corrige: "$N$ est sur $[AD]$, qui mesure $6$ m, donc $0 \\leqslant x \\leqslant 6$. La condition $x \\leqslant 8$, qui vient de $M$ sur $[AB]$, est alors vérifiée aussi. Donc $x \\in [0\\,;6]$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Montre que $f(x) = -0{,}5x^2 + 3x + 24$.",
            indice: "Retire de l'aire du rectangle celles des triangles rectangles $AMN$ et $MBC$.",
            corrige: "L'aire du rectangle est $8 \\times 6 = 48$. Le triangle $AMN$, rectangle en $A$, a pour aire $\\dfrac{x^2}{2}$ ; le triangle $MBC$, rectangle en $B$, a pour aire $\\dfrac{(8 - x) \\times 6}{2} = 24 - 3x$. Donc $f(x) = 48 - 0{,}5x^2 - 24 + 3x = -0{,}5x^2 + 3x + 24$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule $f(0)$, $f(2)$ et $f(6)$. Que représente $f(0)$ sur la figure ?",
            indice: "Pour $x = 0$, où sont les points $M$ et $N$ ?",
            corrige: "$f(0) = 24$, $f(2) = -2 + 6 + 24 = 28$ et $f(6) = -18 + 18 + 24 = 24$ m². Pour $x = 0$, $M$ et $N$ sont en $A$ : la zone plantée est le triangle $ACD$, la moitié du rectangle."
          },
          {
            n: "4.", points: 1.5,
            texte: "Vérifie que $f(x) = 28{,}5 - 0{,}5(x - 3)^2$. Déduis-en l'aire maximale de la zone plantée et la valeur de $x$ qui la donne.",
            indice: "Développe $(x - 3)^2$. Puis : un carré est toujours positif.",
            corrige: "$28{,}5 - 0{,}5(x^2 - 6x + 9) = 28{,}5 - 0{,}5x^2 + 3x - 4{,}5 = -0{,}5x^2 + 3x + 24 = f(x)$. Comme $(x - 3)^2 \\geqslant 0$, on a $f(x) \\leqslant 28{,}5$, avec égalité pour $x = 3$. L'aire maximale est $28{,}5$ m², pour $AM = AN = 3$ m."
          },
          {
            n: "5.", points: 1.5,
            texte: "Pour quelles valeurs de $x$ l'aire plantée est-elle d'au moins $26$ m² ? Donne les valeurs exactes, puis arrondies au centième.",
            indice: "Avec la forme de la question 4 : $f(x) \\geqslant 26 \\iff (x - 3)^2 \\leqslant 5$. Pense à $X^2 \\leqslant k \\iff -\\sqrt{k} \\leqslant X \\leqslant \\sqrt{k}$.",
            corrige: "$f(x) \\geqslant 26 \\iff 0{,}5(x - 3)^2 \\leqslant 2{,}5 \\iff (x - 3)^2 \\leqslant 5 \\iff -\\sqrt{5} \\leqslant x - 3 \\leqslant \\sqrt{5}$. Donc $3 - \\sqrt{5} \\leqslant x \\leqslant 3 + \\sqrt{5}$, et ces valeurs sont bien dans $[0\\,;6]$. Soit $x \\in [3 - \\sqrt{5}\\,;3 + \\sqrt{5}]$, environ $[0{,}76\\,;5{,}24]$."
          }
        ]
      },
      {
        titre: "Un quadrilatère dans un repère",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans un repère orthonormé, on considère les points $A(-1\\,;3)$, $B(3\\,;5)$ et $C(5\\,;1)$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule les longueurs $AB$, $BC$ et $AC$.",
            indice: "$AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$. Simplifie les racines carrées.",
            corrige: "$AB = \\sqrt{4^2 + 2^2} = \\sqrt{20} = 2\\sqrt{5}$, $BC = \\sqrt{2^2 + (-4)^2} = \\sqrt{20} = 2\\sqrt{5}$ et $AC = \\sqrt{6^2 + (-2)^2} = \\sqrt{40} = 2\\sqrt{10}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Quelle est la nature du triangle $ABC$ ? Justifie.",
            indice: "Compare $AB^2 + BC^2$ et $AC^2$, et regarde aussi $AB$ et $BC$.",
            corrige: "$AB^2 + BC^2 = 20 + 20 = 40 = AC^2$ : d'après la réciproque du théorème de Pythagore, $ABC$ est rectangle en $B$. Comme de plus $AB = BC$, il est **isocèle rectangle** en $B$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule les coordonnées du point $D$ tel que $ABCD$ soit un parallélogramme. Vérifie avec les milieux des diagonales.",
            indice: "$ABCD$ est un parallélogramme si et seulement si $\\overrightarrow{AD} = \\overrightarrow{BC}$.",
            corrige: "$\\overrightarrow{BC}\\begin{pmatrix} 2 \\\\ -4 \\end{pmatrix}$, donc $x_D + 1 = 2$ et $y_D - 3 = -4$ : $D(1\\,;-1)$. Le milieu de $[AC]$ est $(2\\,;2)$ et celui de $[BD]$ est $\\left(\\dfrac{3 + 1}{2}\\,;\\dfrac{5 - 1}{2}\\right) = (2\\,;2)$ : les diagonales ont le même milieu."
          },
          {
            n: "4.", points: 1,
            texte: "Quelle est la nature exacte du quadrilatère $ABCD$ ?",
            indice: "Un parallélogramme qui a un angle droit et deux côtés consécutifs de même longueur…",
            corrige: "$ABCD$ est un parallélogramme avec un angle droit en $B$ (question 2) : c'est un rectangle. Ses côtés consécutifs $[AB]$ et $[BC]$ ont la même longueur : c'est aussi un losange. C'est donc un **carré**."
          },
          {
            n: "5.", points: 1.5,
            texte: "Détermine l'équation réduite de la droite $(AC)$. Le point $E(8\\,;0)$ est-il aligné avec $A$ et $C$ ?",
            indice: "Pente : $\\dfrac{y_C - y_A}{x_C - x_A}$. Puis remplace les coordonnées de $E$ dans l'équation.",
            corrige: "La pente vaut $\\dfrac{1 - 3}{5 - (-1)} = -\\dfrac{1}{3}$, et $3 = -\\dfrac{1}{3} \\times (-1) + p$ donne $p = \\dfrac{8}{3}$ : $(AC) : y = -\\dfrac{1}{3}x + \\dfrac{8}{3}$. Pour $E$ : $-\\dfrac{8}{3} + \\dfrac{8}{3} = 0$, donc $E$ est sur $(AC)$ : $A$, $C$ et $E$ sont alignés."
          }
        ]
      },
      {
        titre: "Logique et raisonnements",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Écris la négation de chaque proposition : a) « Tous les élèves de la classe ont un téléphone. » b) « $x \\geqslant 2$ et $x < 7$. » c) « Il existe un nombre entier pair qui est premier. »",
            indice: "Le contraire de « tous » est « il existe un… qui ne… pas » ; celui de « et » est « ou » ; celui de « il existe » est « aucun ».",
            corrige: "a) « Il existe un élève de la classe qui n'a pas de téléphone. » b) « $x < 2$ ou $x \\geqslant 7$. » c) « Aucun nombre entier pair n'est premier. » Cette négation est fausse, car $2$ est pair et premier : la proposition c) est donc vraie."
          },
          {
            n: "2.", points: 1.5,
            texte: "On considère l'implication : « si un quadrilatère est un carré, alors ses diagonales ont la même longueur ». Est-elle vraie ? Écris sa réciproque et sa contraposée, et dis si elles sont vraies.",
            indice: "Pour la réciproque, pense à un rectangle qui n'est pas un carré.",
            corrige: "L'implication est vraie : un carré est un rectangle, et les diagonales d'un rectangle ont la même longueur. Réciproque : « si un quadrilatère a des diagonales de même longueur, alors c'est un carré » : **fausse**, un rectangle de $4$ cm sur $2$ cm est un contre-exemple. Contraposée : « si les diagonales d'un quadrilatère n'ont pas la même longueur, alors ce n'est pas un carré » : **vraie**, comme l'implication."
          },
          {
            n: "3.", points: 1.5,
            texte: "Vrai ou faux ? Justifie. a) « Pour tout réel $x$, $x^2 \\geqslant x$. » b) « Il existe un réel $x$ tel que $x^2 < x$. »",
            indice: "Essaie un nombre entre $0$ et $1$.",
            corrige: "a) **Faux** : pour $x = 0{,}5$, $x^2 = 0{,}25 < 0{,}5$. Un seul contre-exemple suffit. b) **Vrai** : $x = 0{,}5$ convient, d'après le calcul précédent. Ces deux propositions sont la négation l'une de l'autre."
          },
          {
            n: "4.", points: 1.5,
            texte: "Démontre que pour tout entier $n$, le nombre $n^2 + n$ est pair. Quel type de raisonnement as-tu utilisé ?",
            indice: "Sépare deux cas : $n = 2k$ ou $n = 2k + 1$, avec $k$ entier.",
            corrige: "Si $n = 2k$ : $n^2 + n = 4k^2 + 2k = 2(2k^2 + k)$, qui est pair. Si $n = 2k + 1$ : $n^2 + n = 4k^2 + 4k + 1 + 2k + 1 = 4k^2 + 6k + 2 = 2(2k^2 + 3k + 1)$, qui est pair. Dans tous les cas, $n^2 + n$ est pair : c'est une **disjonction des cas**."
          }
        ]
      }
    ]
  }
};
