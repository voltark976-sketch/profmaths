/*
  ENTRAÎNEMENT : Seconde — chapitre 11, Vecteurs 2 : colinéarité et déterminant
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-colinearite.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle ou devoir commun de Seconde.
  Déterminant dans une base orthonormée : det(u, v) = xy' - yx', comme dans le cours.
*/
(() => {
  // Triangle ABC de l'exercice 2 : M et N aux deux tiers de [AB] et [AC], P milieu de [BC], Q (question 4)
  const triangle = (avecQ) => {
    const A = [30, 160], B = [300, 160], C = [120, 20], aux = (p, k, q) => [p[0] + k * (q[0] - p[0]), p[1] + k * (q[1] - p[1])];
    const M = aux(A, 2 / 3, B), N = aux(A, 2 / 3, C), P = aux(B, 1 / 2, C), Q = aux(M, 1 / 2, N);
    const seg = (p, q, style) => `<line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${q[0].toFixed(1)}" y2="${q[1].toFixed(1)}" style="${style}"/>`;
    const pt = (p, nom, dx, dy) => `<circle class="g-point" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5"/><text class="g-plabel" x="${(p[0] + dx).toFixed(1)}" y="${(p[1] + dy).toFixed(1)}" text-anchor="middle">${nom}</text>`;
    let s = `<svg class="graph" viewBox="0 0 320 182" role="img" aria-label="Triangle ABC ; M sur [AB] aux deux tiers depuis A, N sur [AC] aux deux tiers depuis A, P milieu de [BC]${avecQ ? " ; Q milieu de [MN], sur la médiane [AP]" : ""}">`;
    s += `<polygon points="${[A, B, C].map((p) => p.join(",")).join(" ")}" style="fill:var(--lagon-pale);stroke:var(--encre);stroke-width:1.6"/>`;
    s += seg(M, N, "stroke:var(--lagon);stroke-width:2.2");
    if (avecQ) s += seg(A, P, "stroke:var(--ylang);stroke-width:2;stroke-dasharray:6 4");
    s += pt(A, "A", -10, 14) + pt(B, "B", 10, 14) + pt(C, "C", 0, -8) + pt(M, "M", 0, 16) + pt(N, "N", -12, -2) + pt(P, "P", 12, -4);
    if (avecQ) s += pt(Q, "Q", 4, -9);
    return s + `</svg>`;
  };

  window.EVALUATIONS = window.EVALUATIONS || {};
  window.EVALUATIONS["seconde-colinearite"] = {
    revisions: {
      intro: "La colinéarité en un coup d'œil : produit par un réel, vecteurs colinéaires, déterminant, alignement, parallélisme et décomposition. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Produit par un réel",
          texte: "$k\\vec{u}$ a la même direction que $\\vec{u}$, le même sens si $k > 0$, le sens contraire si $k < 0$, et une norme multipliée par $|k|$. En coordonnées, on multiplie chaque coordonnée par $k$."
        },
        {
          titre: "Vecteurs colinéaires",
          texte: "$\\vec{u}$ et $\\vec{v}$ sont colinéaires s'il existe un réel $k$ tel que $\\vec{v} = k\\vec{u}$ (ou $\\vec{u} = k\\vec{v}$) : ils ont la même direction. Le vecteur nul est colinéaire à tous les vecteurs."
        },
        {
          titre: "Déterminant",
          texte: "Pour $\\vec{u}\\begin{pmatrix} x \\\\ y \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} x' \\\\ y' \\end{pmatrix}$ : $\\det(\\vec{u}, \\vec{v}) = xy' - yx'$. Les vecteurs sont colinéaires si et seulement si $\\det(\\vec{u}, \\vec{v}) = 0$."
        },
        {
          titre: "Alignement",
          texte: "$A$, $B$ et $C$ sont alignés si et seulement si $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ sont colinéaires : deux vecteurs qui ont un **point commun**."
        },
        {
          titre: "Parallélisme",
          texte: "$(AB) \\parallel (CD)$ si et seulement si $\\overrightarrow{AB}$ et $\\overrightarrow{CD}$ sont colinéaires. Deux droites parallèles sont confondues dès qu'elles ont un point commun."
        },
        {
          titre: "Décomposer un vecteur",
          texte: "Si $\\vec{u}$ et $\\vec{v}$ ne sont pas colinéaires, tout $\\vec{w}$ s'écrit d'une seule façon $\\vec{w} = a\\vec{u} + b\\vec{v}$. On trouve $a$ et $b$ sur un quadrillage, ou en écrivant l'égalité coordonnée par coordonnée."
        },
        {
          titre: "Démontrer sans coordonnées",
          texte: "Avec la relation de Chasles, on exprime les vecteurs en fonction de deux vecteurs de base, comme $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$. Si on obtient $\\overrightarrow{MN} = k\\overrightarrow{BC}$, alors $(MN) \\parallel (BC)$."
        }
      ],
      pieges: [
        "Inverser l'ordre dans le déterminant : c'est $xy' - yx'$.",
        "Écrire une somme : $xy' + yx'$ n'est pas le déterminant.",
        "Conclure « colinéaires » parce qu'une seule coordonnée est proportionnelle.",
        "Pour un alignement, prendre $\\overrightarrow{AB}$ et $\\overrightarrow{CD}$ : il faut un point commun, par exemple $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$.",
        "Croire que deux droites de vecteurs colinéaires sont confondues : elles sont parallèles, et confondues seulement si elles ont un point commun."
      ]
    },

    evaluation: {
      intro: "Trois exercices comme en contrôle ou au devoir commun (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Alignement et parallélisme",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Dans un repère orthonormé, on considère les points $A(-2\\,;-1)$, $B(1\\,;1)$, $C(7\\,;5)$, $D(0\\,;4)$ et $E(6\\,;8)$.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule les coordonnées de $\\overrightarrow{AB}$ et de $\\overrightarrow{AC}$. Les points $A$, $B$ et $C$ sont-ils alignés ?",
              indice: "Calcule le déterminant $\\det(\\overrightarrow{AB}, \\overrightarrow{AC}) = xy' - yx'$.",
              corrige: "$\\overrightarrow{AB}\\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}$ et $\\overrightarrow{AC}\\begin{pmatrix} 9 \\\\ 6 \\end{pmatrix}$. $\\det(\\overrightarrow{AB}, \\overrightarrow{AC}) = 3 \\times 6 - 2 \\times 9 = 0$ : les vecteurs sont colinéaires (en fait $\\overrightarrow{AC} = 3\\overrightarrow{AB}$), donc $A$, $B$ et $C$ sont alignés."
            },
            {
              n: "2.", points: 1.5,
              texte: "Montre que les droites $(AB)$ et $(DE)$ sont parallèles. Sont-elles confondues ?",
              indice: "Calcule $\\det(\\overrightarrow{AB}, \\overrightarrow{DE})$. Pour savoir si les droites sont confondues, regarde si $D$ est sur $(AB)$.",
              corrige: "$\\overrightarrow{DE}\\begin{pmatrix} 6 \\\\ 4 \\end{pmatrix}$ et $\\det(\\overrightarrow{AB}, \\overrightarrow{DE}) = 3 \\times 4 - 2 \\times 6 = 0$, donc $(AB) \\parallel (DE)$. Avec $\\overrightarrow{AD}\\begin{pmatrix} 2 \\\\ 5 \\end{pmatrix}$ : $\\det(\\overrightarrow{AB}, \\overrightarrow{AD}) = 3 \\times 5 - 2 \\times 2 = 11 \\neq 0$, donc $D$ n'est pas sur $(AB)$. Les droites sont parallèles et distinctes."
            },
            {
              n: "3.", points: 1,
              texte: "Quelle est la nature du quadrilatère $ABED$ ? Justifie.",
              indice: "$(AB) \\parallel (DE)$. Les vecteurs $\\overrightarrow{AB}$ et $\\overrightarrow{DE}$ sont-ils égaux ?",
              corrige: "Les côtés $[AB]$ et $[DE]$ sont parallèles, mais $\\overrightarrow{DE} = 2\\overrightarrow{AB}$, donc $\\overrightarrow{DE} \\neq \\overrightarrow{AB}$ : $ABED$ n'est pas un parallélogramme. C'est un trapèze de bases $[AB]$ et $[DE]$.",
              figureCorrige: (o) => o.graph({
                xmin: -3, xmax: 8, ymin: -2, ymax: 9, h: 300,
                curves: [
                  { f: (x) => (2 * x + 1) / 3, a: -2, b: 1, couleur: 0, closed: false },
                  { f: (x) => (7 * x - 2) / 5, a: 1, b: 6, couleur: 0, closed: false },
                  { f: (x) => (2 * x + 12) / 3, a: 0, b: 6, couleur: 0, closed: false },
                  { f: (x) => (5 * x + 8) / 2, a: -2, b: 0, couleur: 0, closed: false },
                  { f: (x) => (2 * x + 1) / 3, a: 1, b: 7, couleur: 1, closed: false }
                ],
                points: [{ x: -2, y: -1, label: "A", gauche: true }, { x: 1, y: 1, label: "B" }, { x: 7, y: 5, label: "C" }, { x: 0, y: 4, label: "D", gauche: true }, { x: 6, y: 8, label: "E" }],
                aria: "Trapèze ABED : A(−2 ; −1), B(1 ; 1), E(6 ; 8), D(0 ; 4) ; la droite (AB) prolongée passe par C(7 ; 5)"
              })
            },
            {
              n: "4.", points: 1.5,
              texte: "Le point $M(4\\,;m)$ est sur la droite $(AB)$. Détermine $m$.",
              indice: "$A$, $B$ et $M$ sont alignés : écris que $\\det(\\overrightarrow{AB}, \\overrightarrow{AM}) = 0$.",
              corrige: "$\\overrightarrow{AM}\\begin{pmatrix} 6 \\\\ m + 1 \\end{pmatrix}$, donc $\\det(\\overrightarrow{AB}, \\overrightarrow{AM}) = 3(m + 1) - 2 \\times 6 = 3m - 9$. Il est nul pour $m = 3$ : $M(4\\,;3)$."
            },
            {
              n: "5.", points: 1.5,
              texte: "Trouve deux réels $a$ et $b$ tels que $\\overrightarrow{AE} = a\\overrightarrow{AB} + b\\overrightarrow{AD}$.",
              indice: "Passe par le point $D$ avec la relation de Chasles : $\\overrightarrow{AE} = \\overrightarrow{AD} + \\overrightarrow{DE}$, et pense à la question 3.",
              corrige: "Avec la relation de Chasles : $\\overrightarrow{AE} = \\overrightarrow{AD} + \\overrightarrow{DE} = \\overrightarrow{AD} + 2\\overrightarrow{AB}$, donc $a = 2$ et $b = 1$. Vérification avec les coordonnées : $2\\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} 2 \\\\ 5 \\end{pmatrix} = \\begin{pmatrix} 8 \\\\ 9 \\end{pmatrix}$, ce sont bien les coordonnées de $\\overrightarrow{AE}$. Comme $\\overrightarrow{AB}$ et $\\overrightarrow{AD}$ ne sont pas colinéaires, cette écriture est la seule possible."
            }
          ]
        },
        {
          titre: "Une démonstration dans un triangle",
          duree: 25, points: 7, calculatrice: false,
          contexte: "$ABC$ est un triangle. Les points $M$ et $N$ sont définis par $\\overrightarrow{AM} = \\dfrac{2}{3}\\overrightarrow{AB}$ et $\\overrightarrow{AN} = \\dfrac{2}{3}\\overrightarrow{AC}$. Le point $P$ est le milieu de $[BC]$.",
          questions: [
            {
              n: "1.", points: 1,
              texte: "Fais une figure et places-y les points $M$, $N$ et $P$.",
              indice: "$M$ est sur $[AB]$, aux deux tiers en partant de $A$ ; de même pour $N$ sur $[AC]$.",
              corrige: "$M$ est sur $[AB]$ avec $AM = \\dfrac{2}{3}AB$, $N$ est sur $[AC]$ avec $AN = \\dfrac{2}{3}AC$, et $P$ est au milieu de $[BC]$.",
              figureCorrige: () => triangle(false)
            },
            {
              n: "2.", points: 1.5,
              texte: "Exprime $\\overrightarrow{MN}$ en fonction de $\\overrightarrow{BC}$. Que peut-on en déduire pour les droites $(MN)$ et $(BC)$ ?",
              indice: "Relation de Chasles : $\\overrightarrow{MN} = \\overrightarrow{MA} + \\overrightarrow{AN}$, puis $\\overrightarrow{BC} = \\overrightarrow{BA} + \\overrightarrow{AC}$.",
              corrige: "$\\overrightarrow{MN} = \\overrightarrow{MA} + \\overrightarrow{AN} = -\\dfrac{2}{3}\\overrightarrow{AB} + \\dfrac{2}{3}\\overrightarrow{AC} = \\dfrac{2}{3}(\\overrightarrow{BA} + \\overrightarrow{AC}) = \\dfrac{2}{3}\\overrightarrow{BC}$. Les vecteurs $\\overrightarrow{MN}$ et $\\overrightarrow{BC}$ sont colinéaires, donc $(MN) \\parallel (BC)$."
            },
            {
              n: "3.", points: 1.5,
              texte: "Démontre que $\\overrightarrow{AP} = \\dfrac{1}{2}\\overrightarrow{AB} + \\dfrac{1}{2}\\overrightarrow{AC}$.",
              indice: "$\\overrightarrow{AP} = \\overrightarrow{AB} + \\overrightarrow{BP}$, avec $\\overrightarrow{BP} = \\dfrac{1}{2}\\overrightarrow{BC}$ car $P$ est le milieu de $[BC]$.",
              corrige: "$\\overrightarrow{AP} = \\overrightarrow{AB} + \\overrightarrow{BP} = \\overrightarrow{AB} + \\dfrac{1}{2}\\overrightarrow{BC}$.\n\nOr $\\overrightarrow{BC} = \\overrightarrow{BA} + \\overrightarrow{AC} = -\\overrightarrow{AB} + \\overrightarrow{AC}$, donc $\\overrightarrow{AP} = \\overrightarrow{AB} - \\dfrac{1}{2}\\overrightarrow{AB} + \\dfrac{1}{2}\\overrightarrow{AC} = \\dfrac{1}{2}\\overrightarrow{AB} + \\dfrac{1}{2}\\overrightarrow{AC}$."
            },
            {
              n: "4.", points: 1.5,
              texte: "On définit le point $Q$ par $\\overrightarrow{AQ} = \\dfrac{1}{3}\\overrightarrow{AB} + \\dfrac{1}{3}\\overrightarrow{AC}$. Démontre que les points $A$, $Q$ et $P$ sont alignés.",
              indice: "Compare $\\overrightarrow{AQ}$ avec l'expression de $\\overrightarrow{AP}$ trouvée à la question 3.",
              corrige: "$\\overrightarrow{AQ} = \\dfrac{2}{3}\\left(\\dfrac{1}{2}\\overrightarrow{AB} + \\dfrac{1}{2}\\overrightarrow{AC}\\right) = \\dfrac{2}{3}\\overrightarrow{AP}$. Les vecteurs $\\overrightarrow{AQ}$ et $\\overrightarrow{AP}$ sont colinéaires et ont le point $A$ en commun : $A$, $Q$ et $P$ sont alignés. Le point $Q$ est sur la médiane issue de $A$."
            },
            {
              n: "5.", points: 1.5,
              texte: "Démontre que $Q$ est le milieu de $[MN]$.",
              indice: "Exprime $\\overrightarrow{MQ}$ et $\\overrightarrow{QN}$ en fonction de $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ avec la relation de Chasles, puis compare-les.",
              corrige:
                "$\\overrightarrow{MQ} = \\overrightarrow{MA} + \\overrightarrow{AQ}$ avec $\\overrightarrow{MA} = -\\dfrac{2}{3}\\overrightarrow{AB}$, donc $\\overrightarrow{MQ} = -\\dfrac{1}{3}\\overrightarrow{AB} + \\dfrac{1}{3}\\overrightarrow{AC}$.\n\n" +
                "De même, $\\overrightarrow{QN} = \\overrightarrow{QA} + \\overrightarrow{AN}$ avec $\\overrightarrow{AN} = \\dfrac{2}{3}\\overrightarrow{AC}$, donc $\\overrightarrow{QN} = -\\dfrac{1}{3}\\overrightarrow{AB} + \\dfrac{1}{3}\\overrightarrow{AC}$.\n\n" +
                "Ainsi $\\overrightarrow{MQ} = \\overrightarrow{QN}$ : $Q$ est le milieu de $[MN]$.",
              figureCorrige: () => triangle(true)
            }
          ]
        },
        {
          titre: "Deux bateaux sur le lagon",
          duree: 20, points: 6, calculatrice: true,
          contexte: "Sur une carte du lagon, dans un repère orthonormé (unité : le kilomètre), le bateau 1 part du point $R(0\\,;0)$ et avance en ligne droite dans la direction du vecteur $\\vec{u}\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$. Le bateau 2 part du point $S(6\\,;8)$ et avance en ligne droite dans la direction du vecteur $\\vec{v}\\begin{pmatrix} -2 \\\\ -4 \\end{pmatrix}$. Un îlot se trouve en $I(3\\,;6)$.",
          figure: (o) => o.graph({
            xmin: -1, xmax: 8, ymin: -1, ymax: 9.5, h: 300,
            points: [{ x: 0, y: 0, label: "R", gauche: true }, { x: 6, y: 8, label: "S" }, { x: 3, y: 6, label: "I", gauche: true }],
            fleches: [{ x1: 0, y1: 0, x2: 1, y2: 2, label: "u" }, { x1: 6, y1: 8, x2: 4, y2: 4, label: "v", c: 1 }],
            aria: "Carte : le bateau 1 part de R(0 ; 0) dans la direction de u(1 ; 2), le bateau 2 part de S(6 ; 8) dans la direction de v(−2 ; −4), l'îlot I est en (3 ; 6)"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Montre que les trajectoires des deux bateaux sont parallèles.",
              indice: "Calcule $\\det(\\vec{u}, \\vec{v})$.",
              corrige: "$\\det(\\vec{u}, \\vec{v}) = 1 \\times (-4) - 2 \\times (-2) = -4 + 4 = 0$ : $\\vec{u}$ et $\\vec{v}$ sont colinéaires (en fait $\\vec{v} = -2\\vec{u}$). Les trajectoires sont parallèles ; les bateaux vont en sens contraires."
            },
            {
              n: "2.", points: 1.5,
              texte: "Les deux bateaux risquent-ils de se heurter ?",
              indice: "Les trajectoires sont parallèles : sont-elles confondues ? Regarde si $S$ est sur la trajectoire du bateau 1.",
              corrige: "$\\overrightarrow{RS}\\begin{pmatrix} 6 \\\\ 8 \\end{pmatrix}$ et $\\det(\\vec{u}, \\overrightarrow{RS}) = 1 \\times 8 - 2 \\times 6 = -4 \\neq 0$ : $S$ n'est pas sur la trajectoire du bateau 1. Les deux trajectoires sont parallèles et distinctes : les bateaux ne peuvent pas se heurter."
            },
            {
              n: "3.", points: 1.5,
              texte: "Le bateau 1 passe-t-il par l'îlot $I$ ? Et le bateau 2 ?",
              indice: "Teste la colinéarité de $\\overrightarrow{RI}$ avec $\\vec{u}$, puis celle de $\\overrightarrow{SI}$ avec $\\vec{v}$.",
              corrige: "$\\overrightarrow{RI}\\begin{pmatrix} 3 \\\\ 6 \\end{pmatrix} = 3\\vec{u}$ : le bateau 1 passe par l'îlot. $\\overrightarrow{SI}\\begin{pmatrix} -3 \\\\ -2 \\end{pmatrix}$ et $\\det(\\vec{v}, \\overrightarrow{SI}) = (-2) \\times (-2) - (-4) \\times (-3) = 4 - 12 = -8 \\neq 0$ : le bateau 2 n'y passe pas."
            },
            {
              n: "4.", points: 1.5,
              texte:
                "Qu'affiche ce programme ? À quelle question répond chaque ligne affichée ?\n\n" +
                "```python\ndef det(x, y, x2, y2):\n    return x * y2 - y * x2\n\nprint(det(1, 2, -2, -4))\nprint(det(1, 2, 6, 8))\nprint(det(1, 2, 3, 6))\n```",
              indice: "La fonction calcule le déterminant de deux vecteurs donnés par leurs coordonnées. Repère quels vecteurs sont utilisés à chaque ligne.",
              corrige: "Il affiche $\\texttt{0}$, puis $\\texttt{-4}$, puis $\\texttt{0}$. La première ligne est $\\det(\\vec{u}, \\vec{v})$ (question 1 : trajectoires parallèles), la deuxième $\\det(\\vec{u}, \\overrightarrow{RS})$ (question 2 : $S$ n'est pas sur la trajectoire du bateau 1), la troisième $\\det(\\vec{u}, \\overrightarrow{RI})$ (question 3 : le bateau 1 passe par l'îlot)."
            }
          ]
        }
      ]
    }
  };
})();
