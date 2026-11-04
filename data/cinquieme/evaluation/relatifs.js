/*
  ENTRAÎNEMENT : 5e — chapitre 8, Nombres relatifs et repérage
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-relatifs.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e, sans calculatrice.
  Figures dessinées par o.figGeo et o.graph (assets/exercices-base.js). Nombres différents de ceux du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-relatifs"] = {
  revisions: {
    intro: "Les nombres relatifs en un coup d'œil : signe, opposé, distance à zéro, droite graduée, comparaison et repérage dans le plan. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Nombres relatifs",
        texte: "Un nombre relatif est positif ou négatif : $-5$ se lit « moins cinq ». Il sert pour les températures sous zéro, les altitudes sous le niveau de la mer, les dettes…"
      },
      {
        titre: "Opposé et distance à zéro",
        texte: "$-2{,}3$ et $2{,}3$ sont opposés : ils ont la même distance à zéro, $2{,}3$, et des signes contraires."
      },
      {
        titre: "Sur une droite graduée",
        texte: "Les nombres positifs sont à droite de l'origine, les négatifs à gauche. L'abscisse d'un point est le nombre qui lui correspond."
      },
      {
        titre: "Comparer",
        texte: "Un nombre négatif est plus petit qu'un nombre positif. Entre deux négatifs, le plus petit est celui qui a la plus grande distance à zéro : $-8 < -3$."
      },
      {
        titre: "Repère du plan",
        texte: "Un point est repéré par ses coordonnées $(x\\,;y)$ : d'abord l'abscisse, lue sur l'axe horizontal, puis l'ordonnée, lue sur l'axe vertical."
      }
    ],
    pieges: [
      "Croire que $-8 > -3$ parce que $8 > 3$.",
      "Oublier que $0$ est plus grand que tous les nombres strictement négatifs.",
      "Inverser l'abscisse et l'ordonnée d'un point.",
      "Lire une graduation sans regarder le pas (par exemple $0{,}5$ au lieu de $1$).",
      "Confondre l'opposé d'un nombre et son inverse."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Opposés et comparaisons",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Réponds en justifiant si nécessaire.",
        questions: [
          { n: "1.", points: 2, texte: "Donne l'opposé et la distance à zéro de $-7{,}5$, de $2$ et de $-0{,}3$.", corrige: "$-7{,}5$ : opposé $7{,}5$, distance à zéro $7{,}5$. $2$ : opposé $-2$, distance à zéro $2$. $-0{,}3$ : opposé $0{,}3$, distance à zéro $0{,}3$." },
          { n: "2.", points: 2.5, texte: "Range dans l'ordre croissant : $-2{,}5$ ; $1{,}8$ ; $-7$ ; $0$ ; $-2{,}05$ ; $3$.", indice: "Commence par les négatifs : le plus petit est le plus loin de zéro.", corrige: "$-7 < -2{,}5 < -2{,}05 < 0 < 1{,}8 < 3$" },
          { n: "3.", points: 1.5, texte: "Complète par $<$ ou $>$ : $-11 \\ldots -9$ ; $-0{,}5 \\ldots -0{,}7$ ; $-4 \\ldots 2$.", corrige: "$-11 < -9$ ; $-0{,}5 > -0{,}7$ ; $-4 < 2$." },
          { n: "4.", points: 1, texte: "Donne un nombre compris entre $-1{,}4$ et $-1{,}3$.", corrige: "Par exemple $-1{,}35$ (tout nombre strictement entre les deux convient)." }
        ]
      },
      {
        titre: "Lire une droite graduée",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Sur la droite graduée ci-dessous, chaque petite graduation vaut $0{,}5$.",
        figure: (o) => {
          const X = (v) => 160 + 40 * v, pts = { G0: [X(-3.9), 70], G1: [X(3.4), 70] }, segs = [["G0", "G1"]], textes = [];
          for (let k = -7; k <= 6; k++) { const v = k / 2; pts["t" + k] = [X(v), Number.isInteger(v) ? 62 : 65]; pts["u" + k] = [X(v), Number.isInteger(v) ? 78 : 75]; segs.push(["t" + k, "u" + k]); if (Number.isInteger(v)) textes.push([X(v), 98, String(v).replace("-", "−"), "middle"]); }
          [["A", -3.5], ["B", -1], ["C", 0.5], ["D", 2.5]].forEach(([n, v]) => { pts[n] = [X(v), 70]; });
          return o.figGeo({ W: 320, H: 110, pts, segs, textes, sansPoint: Object.keys(pts).filter((n) => n.length > 1), decal: { A: [0, -14], B: [0, -14], C: [0, -14], D: [0, -14] }, aria: "Droite graduée de −3 à 3, graduations de 0,5 ; les points A, B, C et D sont placés" });
        },
        questions: [
          { n: "1.", points: 2, texte: "Lis les abscisses des points $A$, $B$, $C$ et $D$.", corrige: "$A(-3{,}5)$, $B(-1)$, $C(0{,}5)$ et $D(2{,}5)$." },
          { n: "2.", points: 2, texte: "Le point $M$ a pour abscisse l'opposé de celle de $D$. Entre quels points de la figure se trouve-t-il ?", corrige: "$M$ a pour abscisse $-2{,}5$ : il est entre $A$ ($-3{,}5$) et $B$ ($-1$)." },
          { n: "3.", points: 1.5, texte: "Quelle est la distance entre les points $B$ et $D$ ?", indice: "Compte les unités de $-1$ jusqu'à $2{,}5$.", corrige: "De $-1$ à $0$, il y a $1$ unité, puis $2{,}5$ unités de $0$ à $2{,}5$ : la distance vaut $3{,}5$." },
          { n: "4.", points: 1.5, texte: "Quel point est le plus loin de l'origine ?", corrige: "Le point $A$ : sa distance à zéro vaut $3{,}5$, plus que celle de $D$ ($2{,}5$)." }
        ]
      },
      {
        titre: "Se repérer dans le plan",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Voici des points placés dans un repère.",
        figure: (o) => o.graph({
          xmin: -5.5, xmax: 5.5, ymin: -5.5, ymax: 4.5, h: 280,
          points: [{ x: 2, y: 3, label: "A" }, { x: -3, y: 1, label: "B" }, { x: -2, y: -4, label: "C" }, { x: 4, y: -2, label: "D" }, { x: 0, y: -3, label: "E" }],
          aria: "Repère avec les points A(2 ; 3), B(−3 ; 1), C(−2 ; −4), D(4 ; −2) et E(0 ; −3)"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Donne les coordonnées des points $A$, $B$ et $C$.", corrige: "$A(2\\,;3)$, $B(-3\\,;1)$ et $C(-2\\,;-4)$." },
          { n: "2.", points: 1.5, texte: "Donne les coordonnées des points $D$ et $E$.", corrige: "$D(4\\,;-2)$ et $E(0\\,;-3)$." },
          { n: "3.", points: 1.5, texte: "Quel point a une abscisse et une ordonnée toutes les deux négatives ?", corrige: "Le point $C(-2\\,;-4)$." },
          { n: "4.", points: 1, texte: "Quel point est sur l'axe des ordonnées ? Pourquoi ?", corrige: "Le point $E$ : son abscisse vaut $0$." }
        ]
      }
    ]
  }
};
