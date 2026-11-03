/*
  ENTRAÎNEMENT : Automatismes — Géométrie
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre auto-geometrie.
  Format : voir data/automatismes/evaluation/calcul-numerique.js (série d'automatismes, puis deux exercices en situation).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  // Pignon ABC (isocèle en A), hauteur [AH], poutre [MN] parallèle à (BC) avec AM = 2 m (AB = 5 m)
  const pignon = () => {
    const A = [160, 30], B = [30, 160], C = [290, 160], H = [160, 160], aux = (p, k, q) => [p[0] + k * (q[0] - p[0]), p[1] + k * (q[1] - p[1])];
    const M = aux(A, 0.4, B), N = aux(A, 0.4, C);
    const seg = (p, q, style) => `<line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${q[0].toFixed(1)}" y2="${q[1].toFixed(1)}" style="${style}"/>`;
    const pt = (p, nom, dx, dy) => `<circle class="g-point" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5"/><text class="g-plabel" x="${(p[0] + dx).toFixed(1)}" y="${(p[1] + dy).toFixed(1)}" text-anchor="middle">${nom}</text>`;
    let s = `<svg class="graph" viewBox="0 0 320 212" role="img" aria-label="Pignon triangulaire ABC isocèle en A : base BC de 8 m, hauteur AH de 3 m, poutre MN parallèle à BC, avec M sur [AB] et N sur [AC]">`;
    s += `<polygon points="${[A, B, C].map((p) => p.join(",")).join(" ")}" style="fill:var(--lagon-pale);stroke:var(--encre);stroke-width:1.6"/>`;
    s += seg(A, H, "stroke:var(--encre);stroke-width:1.2;stroke-dasharray:5 3") + seg(M, N, "stroke:var(--lagon);stroke-width:2.6");
    s += `<path d="M150 160V150H160" style="fill:none;stroke:var(--encre);stroke-width:1.2"/>`;
    s += `<path d="M30 190H290M30 185V195M290 185V195" style="fill:none;stroke:var(--encre);stroke-width:1"/>`;
    s += `<text class="g-label" x="160" y="207" text-anchor="middle">8 m</text><text class="g-label" x="174" y="138">3 m</text>`;
    return s + pt(A, "A", 0, -9) + pt(B, "B", -2, 18) + pt(C, "C", 2, 18) + pt(H, "H", 0, 18) + pt(M, "M", -12, -2) + pt(N, "N", 12, -2) + `</svg>`;
  };

  window.EVALUATIONS["auto-geometrie"] = {
    revisions: {
      intro: "Les réflexes de géométrie en un coup d'œil : droite graduée et repère, périmètres, aires et volumes, Pythagore, Thalès et trigonométrie. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Droite graduée, repère",
          texte: "Sur une droite graduée, la distance entre $a$ et $b$ vaut $|b - a|$ et le milieu a pour abscisse $\\dfrac{a + b}{2}$. Dans un repère, le milieu de $[AB]$ a pour coordonnées $\\left(\\dfrac{x_A + x_B}{2}\\,;\\dfrac{y_A + y_B}{2}\\right)$."
        },
        {
          titre: "Périmètres et aires",
          texte:
            "- rectangle : $P = 2(L + \\ell)$, $\\mathcal{A} = L \\times \\ell$ ;\n" +
            "- triangle : $\\mathcal{A} = \\dfrac{\\text{base} \\times \\text{hauteur}}{2}$ ;\n" +
            "- cercle et disque de rayon $r$ : $P = 2\\pi r$, $\\mathcal{A} = \\pi r^2$."
        },
        {
          titre: "Volumes",
          texte:
            "- pavé : $L \\times \\ell \\times h$ ; cylindre : $\\pi r^2 \\times h$ ;\n" +
            "- pyramide et cône : $\\dfrac{1}{3}\\mathcal{B} \\times h$ ; boule : $\\dfrac{4}{3}\\pi r^3$ ;\n" +
            "- $1$ dm³ $= 1$ L et $1$ m³ $= 1\\,000$ L."
        },
        {
          titre: "Pythagore",
          texte: "Si $ABC$ est rectangle en $A$, alors $BC^2 = AB^2 + AC^2$ : l'hypoténuse $[BC]$ est en face de l'angle droit. Réciproquement, si l'égalité est vraie, le triangle est rectangle en $A$."
        },
        {
          titre: "Thalès",
          texte: "Si $M \\in [AB]$, $N \\in [AC]$ et $(MN) \\parallel (BC)$, alors $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$ : on compare le petit triangle au grand."
        },
        {
          titre: "Trigonométrie",
          texte: "Dans un triangle rectangle : $\\cos = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$, $\\sin = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$, $\\tan = \\dfrac{\\text{opposé}}{\\text{adjacent}}$. À connaître : $\\cos 60^\\circ = \\sin 30^\\circ = \\dfrac{1}{2}$."
        }
      ],
      pieges: [
        "Confondre périmètre (en cm) et aire (en cm²) : $2(L + \\ell)$ n'est pas $L \\times \\ell$.",
        "Dans Pythagore, on additionne les **carrés** : $BC \\neq AB + AC$.",
        "L'hypoténuse est en face de l'angle droit, jamais un côté de l'angle droit.",
        "Inverser l'ordre des coordonnées : $(x\\,;y)$, l'abscisse d'abord.",
        "Mélanger le petit et le grand triangle dans les rapports de Thalès.",
        "Oublier le $\\dfrac{1}{3}$ dans le volume d'une pyramide ou d'un cône."
      ]
    },

    evaluation: {
      intro: "Une série d'automatismes comme dans la partie 1 de l'épreuve anticipée, puis deux exercices qui les mettent en situation, **sans calculatrice** (environ $55$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Automatismes",
          duree: 15, points: 6, calculatrice: false,
          contexte: "Pour chaque question, écris seulement le résultat, sans justification.",
          questions: [
            { n: "1.", points: 0.5, texte: "Sur une droite graduée, $A$ a pour abscisse $-3{,}5$ et $B$ pour abscisse $2{,}5$. Quelle est la distance $AB$ ?", corrige: "$2{,}5 - (-3{,}5) = 6$." },
            { n: "2.", points: 0.5, texte: "Sur une droite graduée, quelle est l'abscisse du milieu du segment d'extrémités $-4$ et $10$ ?", corrige: "$\\dfrac{-4 + 10}{2} = 3$." },
            { n: "3.", points: 0.5, texte: "Donne les coordonnées du milieu de $[EF]$, avec $E(1\\,;4)$ et $F(5\\,;-2)$.", corrige: "$\\left(\\dfrac{1 + 5}{2}\\,;\\dfrac{4 - 2}{2}\\right) = (3\\,;1)$." },
            { n: "4.", points: 0.5, texte: "Quel est le périmètre d'un rectangle de $7$ cm sur $4{,}5$ cm ?", corrige: "$2 \\times (7 + 4{,}5) = 23$ cm." },
            { n: "5.", points: 0.5, texte: "Quelle est l'aire d'un triangle de base $8$ cm et de hauteur $5$ cm ?", corrige: "$\\dfrac{8 \\times 5}{2} = 20$ cm²." },
            { n: "6.", points: 0.5, texte: "Donne la valeur exacte de la longueur d'un cercle de rayon $3{,}5$ cm.", corrige: "$2\\pi \\times 3{,}5 = 7\\pi$ cm." },
            { n: "7.", points: 0.5, texte: "Quel est le volume d'un pavé de $2$ dm sur $3$ dm sur $4$ dm, en litres ?", corrige: "$2 \\times 3 \\times 4 = 24$ dm³, soit $24$ L." },
            { n: "8.", points: 0.5, texte: "Donne la valeur exacte du volume d'une boule de rayon $3$ cm.", corrige: "$\\dfrac{4}{3}\\pi \\times 3^3 = \\dfrac{4}{3}\\pi \\times 27 = 36\\pi$ cm³." },
            { n: "9.", points: 0.5, texte: "Un triangle rectangle a des côtés de l'angle droit de $6$ cm et $8$ cm. Quelle est la longueur de son hypoténuse ?", corrige: "$\\sqrt{36 + 64} = \\sqrt{100} = 10$ cm." },
            { n: "10.", points: 0.5, texte: "Un triangle rectangle a une hypoténuse de $25$ cm et un côté de $7$ cm. Quelle est la longueur du troisième côté ?", corrige: "$\\sqrt{625 - 49} = \\sqrt{576} = 24$ cm." },
            { n: "11.", points: 0.5, texte: "$M \\in [AB]$, $N \\in [AC]$ et $(MN) \\parallel (BC)$, avec $AM = 4$, $AB = 10$ et $AC = 7$. Calcule $AN$.", corrige: "$\\dfrac{AN}{AC} = \\dfrac{AM}{AB} = 0{,}4$, donc $AN = 0{,}4 \\times 7 = 2{,}8$." },
            { n: "12.", points: 0.5, texte: "$ABC$ est rectangle en $A$, avec $\\widehat{ABC} = 30^\\circ$ et $BC = 10$. Calcule $AC$.", corrige: "$[AC]$ est opposé à l'angle $\\widehat{B}$ : $AC = BC \\times \\sin 30^\\circ = 10 \\times \\dfrac{1}{2} = 5$." }
          ]
        },
        {
          titre: "Le pignon d'un abri",
          duree: 20, points: 7, calculatrice: false,
          contexte: "Le pignon d'un abri de jardin a la forme d'un triangle $ABC$ isocèle en $A$, de base $BC = 8$ m et de hauteur $AH = 3$ m, où $H$ est le milieu de $[BC]$. Le charpentier place une poutre $[MN]$ parallèle à $(BC)$, avec $M$ sur $[AB]$ et $N$ sur $[AC]$.",
          figure: () => pignon(),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule la longueur $AB$.",
              indice: "Le triangle $ABH$ est rectangle en $H$, avec $BH = 4$ m.",
              corrige: "Dans le triangle $ABH$ rectangle en $H$, d'après le théorème de Pythagore : $AB^2 = AH^2 + BH^2 = 9 + 16 = 25$, donc $AB = 5$ m."
            },
            {
              n: "2.", points: 1.5,
              texte: "Calcule l'aire du pignon. Un litre de peinture couvre $6$ m² : combien de litres faut-il pour peindre ce pignon ?",
              indice: "Aire d'un triangle : base fois hauteur, divisé par $2$.",
              corrige: "$\\mathcal{A} = \\dfrac{8 \\times 3}{2} = 12$ m², donc il faut $\\dfrac{12}{6} = 2$ L de peinture."
            },
            {
              n: "3.", points: 2,
              texte: "On place $M$ à $2$ m de $A$. Calcule la longueur de la poutre $MN$.",
              indice: "Thalès dans les triangles $AMN$ et $ABC$ : $\\dfrac{MN}{BC} = \\dfrac{AM}{AB}$.",
              corrige: "Comme $(MN) \\parallel (BC)$, d'après le théorème de Thalès : $\\dfrac{MN}{BC} = \\dfrac{AM}{AB} = \\dfrac{2}{5}$, donc $MN = \\dfrac{2}{5} \\times 8 = 3{,}2$ m."
            },
            {
              n: "4.", points: 2,
              texte: "Le charpentier préfère une poutre de $4$ m. À quelle distance de $A$ doit-il placer $M$ ? À quelle hauteur au-dessus de $(BC)$ la poutre se trouve-t-elle alors ?",
              indice: "$\\dfrac{AM}{AB} = \\dfrac{MN}{BC} = \\dfrac{4}{8}$.",
              corrige: "$\\dfrac{AM}{5} = \\dfrac{4}{8} = \\dfrac{1}{2}$, donc $AM = 2{,}5$ m : $M$ est le milieu de $[AB]$.\n\nLa poutre coupe alors $[AH]$ en son milieu (Thalès dans le triangle $ABH$) : elle se trouve à $1{,}5$ m au-dessus de $(BC)$."
            }
          ]
        },
        {
          titre: "La piscine pour enfants",
          duree: 20, points: 7, calculatrice: false,
          contexte: "Une piscine pour enfants a la forme d'un cylindre de $3$ m de diamètre. On la remplit d'eau sur une hauteur de $40$ cm. On prendra $\\pi \\approx 3{,}14$ pour les valeurs approchées.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Donne la valeur exacte du volume d'eau, en m³.",
              indice: "Le rayon vaut $1{,}5$ m et la hauteur $0{,}4$ m.",
              corrige: "$V = \\pi \\times 1{,}5^2 \\times 0{,}4 = \\pi \\times 2{,}25 \\times 0{,}4 = 0{,}9\\pi$ m³."
            },
            {
              n: "2.", points: 1.5,
              texte: "Donne une valeur approchée de ce volume en m³, puis en litres.",
              indice: "$0{,}9 \\times 3{,}14$, puis $1$ m³ $= 1\\,000$ L.",
              corrige: "$0{,}9 \\times 3{,}14 = 2{,}826$ m³, soit environ $2\\,826$ L."
            },
            {
              n: "3.", points: 2.5,
              texte: "Le tuyau d'arrosage débite $15$ L par minute. Combien de temps faut-il pour remplir la piscine ? Donne le résultat en heures et minutes, à la minute près.",
              indice: "$\\dfrac{2\\,826}{15}$ minutes, puis convertis en heures et minutes.",
              corrige: "$\\dfrac{2\\,826}{15} = 188{,}4$ min. Comme $188 = 3 \\times 60 + 8$, il faut environ $3$ h $8$ min."
            },
            {
              n: "4.", points: 1.5,
              texte: "Pour protéger le bord, on pose une bande de mousse tout autour de la piscine. Quelle longueur faut-il, au centimètre près ?",
              indice: "C'est le périmètre d'un cercle de diamètre $3$ m.",
              corrige: "$\\pi \\times 3 \\approx 3{,}14 \\times 3 = 9{,}42$ m de bande."
            }
          ]
        }
      ]
    }
  };
})();
