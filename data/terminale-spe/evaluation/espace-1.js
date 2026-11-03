/*
  ENTRAÎNEMENT : Terminale spécialité — chapitre 3, Géométrie dans l'espace 1 : vecteurs, droites et plans
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-spe-espace-1.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit du bac.
  Pas de produit scalaire ni d'équation cartésienne de plan (chapitre 8). Coordonnées écrites u(a ; b ; c) comme dans le cours.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-spe-espace-1"] = {
  revisions: {
    intro: "L'espace en un coup d'œil : vecteurs, droites et plans, coplanarité, positions relatives, coordonnées et représentation paramétrique. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Vecteurs de l'espace",
        texte: "Ils se manipulent comme dans le plan : relation de Chasles, somme, produit par un réel. $\\vec{u}$ et $\\vec{v}$ sont colinéaires si l'un est un multiple de l'autre : on vérifie les **trois** coordonnées."
      },
      {
        titre: "Droites et plans",
        texte: "Une droite : un point $A$ et un vecteur directeur $\\vec{u}$. Un plan : un point $A$ et deux vecteurs non colinéaires $\\vec{u}$, $\\vec{v}$ ; alors $M$ est dans le plan si et seulement si $\\overrightarrow{AM} = a\\vec{u} + b\\vec{v}$."
      },
      {
        titre: "Vecteurs coplanaires",
        texte: "Si $\\vec{u}$ et $\\vec{v}$ ne sont pas colinéaires, $\\vec{w}$ est coplanaire avec eux si et seulement s'il existe $a$ et $b$ tels que $\\vec{w} = a\\vec{u} + b\\vec{v}$. Trois vecteurs non coplanaires forment une **base**."
      },
      {
        titre: "Positions de deux droites",
        texte: "Deux droites sont soit coplanaires, et alors **sécantes** ou **parallèles**, soit **non coplanaires** : elles n'ont alors aucun point commun sans être parallèles."
      },
      {
        titre: "Parallélisme",
        texte: "Deux droites sont parallèles si leurs vecteurs directeurs sont colinéaires. Une droite est parallèle à un plan si son vecteur directeur s'écrit avec deux vecteurs qui dirigent le plan. Deux plans sont parallèles s'ils ont les mêmes vecteurs directeurs."
      },
      {
        titre: "Coordonnées",
        texte: "$\\overrightarrow{AB}(x_B - x_A\\,;y_B - y_A\\,;z_B - z_A)$ ; le milieu de $[AB]$ a pour coordonnées les moyennes des coordonnées de $A$ et $B$."
      },
      {
        titre: "Représentation paramétrique",
        texte: "La droite passant par $A(x_A\\,;y_A\\,;z_A)$ et dirigée par $\\vec{u}(a\\,;b\\,;c)$ : $\\begin{cases} x = x_A + at \\\\ y = y_A + bt \\\\ z = z_A + ct \\end{cases}$ avec $t \\in \\mathbb{R}$. Pour une intersection, on prend deux paramètres différents."
      }
    ],
    pieges: [
      "Croire que deux droites sans point commun sont forcément parallèles : elles peuvent être non coplanaires.",
      "Vérifier la colinéarité sur deux coordonnées seulement : il en faut trois.",
      "Utiliser le même paramètre $t$ pour deux droites dont on cherche l'intersection.",
      "Prendre les coordonnées d'un point comme vecteur directeur, ou l'inverse.",
      "Oublier de vérifier la troisième équation d'un système.",
      "Confondre « parallèle à un plan » et « contenue dans un plan »."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit du bac (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Dans un cube",
        duree: 30, points: 7, calculatrice: false,
        contexte: "$ABCDEFGH$ est un cube (figure). Le point $I$ est le milieu de l'arête $[EF]$ et $J$ celui de l'arête $[FG]$. On utilise le repère $(A\\,;\\overrightarrow{AB}, \\overrightarrow{AD}, \\overrightarrow{AE})$.",
        figure: () => {
          const P = { A: [40, 210], B: [160, 210], C: [202, 168], D: [82, 168], E: [40, 90], F: [160, 90], G: [202, 48], H: [82, 48] };
          P.I = [(P.E[0] + P.F[0]) / 2, (P.E[1] + P.F[1]) / 2]; P.J = [(P.F[0] + P.G[0]) / 2, (P.F[1] + P.G[1]) / 2];
          const seg = (a, b, st) => `<line x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}" style="${st}"/>`;
          const plein = "stroke:var(--encre);stroke-width:1.6", cache = "stroke:var(--doux);stroke-width:1.3;stroke-dasharray:5 4";
          let s = `<svg class="graph" viewBox="0 0 250 236" role="img" aria-label="Cube ABCDEFGH en perspective : face avant ABFE, face arrière DCGH ; I milieu de [EF], J milieu de [FG] ; arêtes cachées en pointillés">`;
          s += ["AB", "BC", "CG", "GF", "FE", "EA", "FB", "EH", "HG"].map((k) => seg(k[0], k[1], plein)).join("") + ["AD", "DC", "DH"].map((k) => seg(k[0], k[1], cache)).join("");
          s += seg("A", "C", "stroke:var(--ylang);stroke-width:1.8;stroke-dasharray:5 4") + seg("I", "J", "stroke:var(--lagon);stroke-width:2.4");
          const lab = { A: [-10, 14], B: [10, 14], C: [12, 4], D: [-12, 4], E: [-12, 2], F: [8, 16], G: [10, -6], H: [-8, -8], I: [0, -8], J: [12, 4] };
          Object.entries(lab).forEach(([k, [dx, dy]]) => { s += `<circle class="g-point" cx="${P[k][0]}" cy="${P[k][1]}" r="${k === "I" || k === "J" ? 3.5 : 2.2}"/><text class="g-plabel" x="${P[k][0] + dx}" y="${P[k][1] + dy}" text-anchor="middle">${k}</text>`; });
          return s + `</svg>`;
        },
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Exprime $\\overrightarrow{AI}$ et $\\overrightarrow{AJ}$ en fonction de $\\overrightarrow{AB}$, $\\overrightarrow{AD}$ et $\\overrightarrow{AE}$.",
            indice: "Relation de Chasles : $\\overrightarrow{AI} = \\overrightarrow{AE} + \\overrightarrow{EI}$, avec $\\overrightarrow{EI} = \\dfrac{1}{2}\\overrightarrow{EF}$ et $\\overrightarrow{EF} = \\overrightarrow{AB}$.",
            corrige: "$\\overrightarrow{AI} = \\overrightarrow{AE} + \\dfrac{1}{2}\\overrightarrow{EF} = \\dfrac{1}{2}\\overrightarrow{AB} + \\overrightarrow{AE}$. Puis $\\overrightarrow{AJ} = \\overrightarrow{AB} + \\overrightarrow{BF} + \\overrightarrow{FJ} = \\overrightarrow{AB} + \\dfrac{1}{2}\\overrightarrow{AD} + \\overrightarrow{AE}$, car $\\overrightarrow{BF} = \\overrightarrow{AE}$ et $\\overrightarrow{FJ} = \\dfrac{1}{2}\\overrightarrow{FG} = \\dfrac{1}{2}\\overrightarrow{AD}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Démontre que $\\overrightarrow{IJ} = \\dfrac{1}{2}\\overrightarrow{AC}$. Que peut-on en déduire pour les droites $(IJ)$ et $(AC)$, puis pour les points $A$, $C$, $J$ et $I$ ?",
            indice: "$\\overrightarrow{IJ} = \\overrightarrow{AJ} - \\overrightarrow{AI}$, et $\\overrightarrow{AC} = \\overrightarrow{AB} + \\overrightarrow{AD}$.",
            corrige: "$\\overrightarrow{IJ} = \\overrightarrow{AJ} - \\overrightarrow{AI} = \\dfrac{1}{2}\\overrightarrow{AB} + \\dfrac{1}{2}\\overrightarrow{AD} = \\dfrac{1}{2}\\overrightarrow{AC}$. Les vecteurs sont colinéaires : $(IJ)$ et $(AC)$ sont parallèles. Deux droites parallèles sont coplanaires : $A$, $C$, $J$ et $I$ sont dans un même plan, et $ACJI$ est un trapèze."
          },
          {
            n: "3.", points: 1.5,
            texte: "Donne les coordonnées de $C$, $G$, $I$ et $J$ dans le repère, puis retrouve le résultat de la question 2.",
            indice: "Les coordonnées d'un point $M$ sont celles de $\\overrightarrow{AM}$ dans la base $(\\overrightarrow{AB}, \\overrightarrow{AD}, \\overrightarrow{AE})$.",
            corrige: "$C(1\\,;1\\,;0)$, $G(1\\,;1\\,;1)$, $I\\left(\\dfrac{1}{2}\\,;0\\,;1\\right)$ et $J\\left(1\\,;\\dfrac{1}{2}\\,;1\\right)$. Donc $\\overrightarrow{IJ}\\left(\\dfrac{1}{2}\\,;\\dfrac{1}{2}\\,;0\\right)$ et $\\overrightarrow{AC}(1\\,;1\\,;0)$ : on retrouve $\\overrightarrow{IJ} = \\dfrac{1}{2}\\overrightarrow{AC}$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Les droites $(IJ)$ et $(AG)$ sont-elles sécantes ? parallèles ? Conclus.",
            indice: "Écris une représentation paramétrique de chaque droite, avec deux paramètres différents, puis cherche un point commun.",
            corrige: "$(AG)$ : $x = s$, $y = s$, $z = s$. $(IJ)$ : $x = \\dfrac{1}{2} + \\dfrac{t}{2}$, $y = \\dfrac{t}{2}$, $z = 1$. Un point commun vérifierait $s = 1$ (avec $z$), puis $1 = \\dfrac{1}{2} + \\dfrac{t}{2}$, donc $t = 1$, et alors $y = \\dfrac{1}{2} \\neq s$ : il n'y a pas de point commun. Les vecteurs $\\overrightarrow{IJ}\\left(\\dfrac{1}{2}\\,;\\dfrac{1}{2}\\,;0\\right)$ et $\\overrightarrow{AG}(1\\,;1\\,;1)$ ne sont pas colinéaires : les droites ne sont pas parallèles. Elles sont donc **non coplanaires**."
          },
          {
            n: "5.", points: 1,
            texte: "Quelle est la position de la droite $(IJ)$ par rapport au plan $(ABC)$ ?",
            indice: "$(IJ)$ est parallèle à une droite du plan $(ABC)$. Est-elle contenue dans ce plan ?",
            corrige: "$(IJ)$ est parallèle à $(AC)$, qui est contenue dans le plan $(ABC)$ : $(IJ)$ est parallèle au plan $(ABC)$. Comme $I$ a pour cote $1$ et que les points de $(ABC)$ ont une cote nulle, $(IJ)$ n'est pas contenue dans ce plan : elle lui est strictement parallèle."
          }
        ]
      },
      {
        titre: "Droites dans un repère",
        duree: 25, points: 7, calculatrice: true,
        contexte: "L'espace est muni d'un repère. On considère le point $A(1\\,;-1\\,;2)$, le vecteur $\\vec{u}(2\\,;1\\,;-1)$ et la droite $d_1$ passant par $A$ et dirigée par $\\vec{u}$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Donne une représentation paramétrique de $d_1$.",
            indice: "$M(x\\,;y\\,;z) \\in d_1 \\iff \\overrightarrow{AM} = t\\vec{u}$ pour un réel $t$.",
            corrige: "$d_1 : \\begin{cases} x = 1 + 2t \\\\ y = -1 + t \\\\ z = 2 - t \\end{cases}$ avec $t \\in \\mathbb{R}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Les points $E(7\\,;2\\,;-1)$ et $F(5\\,;1\\,;1)$ sont-ils sur $d_1$ ?",
            indice: "Trouve $t$ avec la première équation, puis vérifie les deux autres.",
            corrige: "Pour $E$ : $7 = 1 + 2t$ donne $t = 3$, puis $y = -1 + 3 = 2$ et $z = 2 - 3 = -1$ : $E$ est sur $d_1$. Pour $F$ : $5 = 1 + 2t$ donne $t = 2$, puis $y = 1$ mais $z = 0 \\neq 1$ : $F$ n'est pas sur $d_1$."
          },
          {
            n: "3.", points: 2,
            texte: "La droite $d_2$ a pour représentation paramétrique $\\begin{cases} x = 2 + s \\\\ y = 2 - 2s \\\\ z = -2 + 3s \\end{cases}$ avec $s \\in \\mathbb{R}$. Démontre que $d_1$ et $d_2$ sont sécantes et donne leur point d'intersection.",
            indice: "Résous le système formé par les deux premières équations, en $t$ et $s$, puis vérifie la troisième.",
            corrige: "On cherche $t$ et $s$ tels que $1 + 2t = 2 + s$, $-1 + t = 2 - 2s$ et $2 - t = -2 + 3s$. La première donne $s = 2t - 1$ ; dans la deuxième : $-1 + t = 4 - 4t$, donc $t = 1$ et $s = 1$. Troisième équation : $2 - 1 = 1$ et $-2 + 3 = 1$, elle est vérifiée. Les droites sont sécantes au point de paramètre $t = 1$ : $(3\\,;0\\,;1)$."
          },
          {
            n: "4.", points: 1.5,
            texte: "La droite $d_3$ passe par $D(0\\,;0\\,;5)$ et est dirigée par $\\vec{w}(-4\\,;-2\\,;2)$. Quelle est la position relative de $d_1$ et $d_3$ ?",
            indice: "Compare $\\vec{w}$ et $\\vec{u}$, puis regarde si $D$ est sur $d_1$.",
            corrige: "$\\vec{w} = -2\\vec{u}$ : les droites sont parallèles. Si $D$ était sur $d_1$, on aurait $0 = 1 + 2t$, soit $t = -\\dfrac{1}{2}$, puis $y = -\\dfrac{3}{2} \\neq 0$ : $D$ n'est pas sur $d_1$. Les droites sont strictement parallèles."
          },
          {
            n: "5.", points: 1,
            texte:
              "Que renvoie $\\texttt{point([1, -1, 2], [2, 1, -1], 3)}$ ? Interprète.\n\n" +
              "```python\ndef point(A, u, t):\n    x = A[0] + t * u[0]\n    y = A[1] + t * u[1]\n    z = A[2] + t * u[2]\n    return [x, y, z]\n```",
            indice: "La fonction calcule le point de paramètre $t$ de la droite passant par $A$ et dirigée par $\\vec{u}$.",
            corrige: "Elle renvoie $\\texttt{[7, 2, -1]}$ : c'est le point de $d_1$ de paramètre $t = 3$, le point $E$ de la question 2."
          }
        ]
      },
      {
        titre: "Coplanarité et base",
        duree: 20, points: 6, calculatrice: true,
        contexte: "L'espace est muni d'un repère. On considère les points $A(1\\,;0\\,;0)$, $B(2\\,;2\\,;0)$, $C(1\\,;1\\,;3)$, $D(3\\,;7\\,;9)$ et $E(1\\,;1\\,;4)$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule les coordonnées de $\\overrightarrow{AB}$, $\\overrightarrow{AC}$ et $\\overrightarrow{AD}$. Justifie que $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ ne sont pas colinéaires.",
            indice: "Si $\\overrightarrow{AC} = k\\overrightarrow{AB}$, regarde ce que donne la première coordonnée.",
            corrige: "$\\overrightarrow{AB}(1\\,;2\\,;0)$, $\\overrightarrow{AC}(0\\,;1\\,;3)$ et $\\overrightarrow{AD}(2\\,;7\\,;9)$. Si $\\overrightarrow{AC} = k\\overrightarrow{AB}$, la première coordonnée donne $0 = k$, mais alors la deuxième donnerait $1 = 0$ : impossible. Les deux vecteurs ne sont pas colinéaires, donc $A$, $B$ et $C$ définissent un plan."
          },
          {
            n: "2.", points: 1.5,
            texte: "Trouve deux réels $a$ et $b$ tels que $\\overrightarrow{AD} = a\\overrightarrow{AB} + b\\overrightarrow{AC}$. Que peut-on en déduire pour le point $D$ ?",
            indice: "Écris l'égalité coordonnée par coordonnée : la première donne $a$, la troisième donne $b$, et la deuxième sert de vérification.",
            corrige: "On veut $a = 2$, $2a + b = 7$ et $3b = 9$. La première et la troisième donnent $a = 2$ et $b = 3$, et la deuxième est vérifiée : $4 + 3 = 7$. Donc $\\overrightarrow{AD} = 2\\overrightarrow{AB} + 3\\overrightarrow{AC}$ : les vecteurs sont coplanaires et $D$ appartient au plan $(ABC)$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Le point $E$ appartient-il au plan $(ABC)$ ?",
            indice: "Cherche $a$ et $b$ tels que $\\overrightarrow{AE} = a\\overrightarrow{AB} + b\\overrightarrow{AC}$, et vérifie la deuxième coordonnée.",
            corrige: "$\\overrightarrow{AE}(0\\,;1\\,;4)$. On voudrait $a = 0$, $2a + b = 1$ et $3b = 4$ : la première et la troisième donnent $a = 0$ et $b = \\dfrac{4}{3}$, mais alors $2a + b = \\dfrac{4}{3} \\neq 1$. Le système n'a pas de solution : $E$ n'est pas dans le plan $(ABC)$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Justifie que $(\\overrightarrow{AB}, \\overrightarrow{AC}, \\overrightarrow{AE})$ est une base de l'espace. Exprime $\\overrightarrow{AF}$ dans cette base, avec $F(2\\,;3\\,;4)$.",
            indice: "Trois vecteurs non coplanaires forment une base. Pour $\\overrightarrow{AF}(1\\,;3\\,;4)$, la première coordonnée donne directement un coefficient.",
            corrige: "D'après la question 3, $\\overrightarrow{AE}$ ne s'écrit pas avec $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ : les trois vecteurs ne sont pas coplanaires, ils forment une base. Avec $\\overrightarrow{AF} = a\\overrightarrow{AB} + b\\overrightarrow{AC} + c\\overrightarrow{AE}$ : $a = 1$, $2 + b + c = 3$ et $3b + 4c = 4$. Donc $b = 1 - c$, puis $3 - 3c + 4c = 4$, soit $c = 1$ et $b = 0$ : $\\overrightarrow{AF} = \\overrightarrow{AB} + \\overrightarrow{AE}$."
          }
        ]
      }
    ]
  }
};
