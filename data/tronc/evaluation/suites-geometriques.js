/*
  ENTRAÎNEMENT : Première tronc commun — chapitre 12, Suites géométriques : croissance exponentielle
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre tronc-suites-geometriques.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Données fictives. Le tapis de Sierpinski complète le triangle de Sierpinski du cours.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  // tapis de Sierpinski aux étapes 0, 1 et 2 (exercice 2)
  const tapis = () => {
    const carres = [];
    const pose = (x, y, c, k) => {
      if (k === 0) { carres.push(`<rect x="${+x.toFixed(2)}" y="${+y.toFixed(2)}" width="${+c.toFixed(2)}" height="${+c.toFixed(2)}" style="fill:var(--lagon);stroke:var(--lagon-pale);stroke-width:${k === 0 && c > 40 ? 0 : 0.8}"/>`); return; }
      const d = c / 3;
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (!(i === 1 && j === 1)) pose(x + i * d, y + j * d, d, k - 1);
    };
    const S = 81, y = 12;
    [0, 1, 2].forEach((k, n) => pose(14 + n * 104, y, S, k));
    const nom = (n) => `<text class="g-label" x="${14 + n * 104 + S / 2}" y="${y + S + 20}" text-anchor="middle">étape ${n}</text>`;
    return `<svg class="graph" viewBox="0 0 320 124" role="img" aria-label="Tapis de Sierpinski : à l'étape 0, un carré plein ; à l'étape 1, le carré est découpé en 9 et celui du centre est retiré, il reste 8 carrés ; à l'étape 2, on recommence dans chacun des 8 carrés, il en reste 64">` +
      carres.join("") + nom(0) + nom(1) + nom(2) + `</svg>`;
  };

  window.EVALUATIONS["tronc-suites-geometriques"] = {
    revisions: {
      intro: "Les suites géométriques en un coup d'œil : la raison qu'on multiplie, le terme de rang $n$, le sens de variation, les intérêts composés et la croissance exponentielle face à la croissance linéaire. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Suite géométrique",
          texte: "$u(n + 1) = q \\times u(n)$ : on multiplie toujours par le même nombre, la **raison** $q$. Une hausse de $4\\,\\%$ correspond à $q = 1{,}04$, une baisse de $25\\,\\%$ à $q = 0{,}75$."
        },
        {
          titre: "Terme de rang $n$",
          texte:
            "- si la suite commence à $u(0)$ : $u(n) = u(0) \\times q^n$ ;\n" +
            "- si elle commence à $u(1)$ : $u(n) = u(1) \\times q^{n - 1}$."
        },
        {
          titre: "Sens de variation",
          texte: "Avec des termes positifs : la suite est croissante si $q > 1$, décroissante si $0 < q < 1$. Si $0 < q < 1$, les termes se rapprochent de $0$."
        },
        {
          titre: "Intérêts composés",
          texte: "Avec des intérêts composés au taux $t\\,\\%$, les intérêts s'ajoutent au capital et rapportent à leur tour : chaque année, le capital est multiplié par $1 + \\dfrac{t}{100}$."
        },
        {
          titre: "Linéaire ou exponentiel",
          texte: "Une suite arithmétique gagne toujours la même quantité ; une suite géométrique de raison $q > 1$ gagne de plus en plus. À long terme, la croissance exponentielle finit par dépasser n'importe quelle croissance linéaire."
        }
      ],
      pieges: [
        "Ajouter la raison au lieu de multiplier.",
        "Écrire $q = 0{,}05$ pour une hausse de $5\\,\\%$ au lieu de $q = 1{,}05$.",
        "Calculer $q \\times n$ au lieu de $q^n$.",
        "Écrire $u(1) \\times q^n$ quand la suite commence à $u(1)$ : c'est $q^{n - 1}$.",
        "Croire qu'une suite géométrique de raison $0{,}9$ est croissante.",
        "Confondre intérêts simples (on ajoute) et intérêts composés (on multiplie)."
      ]
    },

    evaluation: {
      intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Les données sont fictives. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Intérêts simples ou composés ?",
          duree: 25, points: 7, calculatrice: false,
          contexte: "On place $2\\,000$ € à $10\\,\\%$ par an (placement fictif, très risqué). Avec le placement A, à intérêts simples, on gagne chaque année $10\\,\\%$ de la somme de départ. Avec le placement B, à intérêts composés, le capital est multiplié par $1{,}1$ chaque année. On note $a(n)$ et $b(n)$ les capitaux au bout de $n$ années.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Quelle est la nature de chaque suite ? Exprime $a(n)$ et $b(n)$ en fonction de $n$.",
              indice: "A : on ajoute $200$ € par an. B : on multiplie par $1{,}1$.",
              corrige: "$(a(n))$ est arithmétique de raison $200$ : $a(n) = 2\\,000 + 200n$. $(b(n))$ est géométrique de raison $1{,}1$ : $b(n) = 2\\,000 \\times 1{,}1^n$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Calcule $a(1)$, $a(2)$, $a(3)$, puis $b(1)$, $b(2)$, $b(3)$.",
              indice: "Pour $b$, multiplie chaque fois le résultat précédent par $1{,}1$ (ajoute son dixième).",
              corrige: "$a(1) = 2\\,200$, $a(2) = 2\\,400$, $a(3) = 2\\,600$. Et $b(1) = 2\\,200$, $b(2) = 2\\,420$, $b(3) = 2\\,662$."
            },
            {
              n: "3.", points: 1.5,
              texte: "Montre que $b(n + 1) - b(n) = 0{,}1 \\times b(n)$. Pourquoi le placement B rapporte-t-il un peu plus chaque année ?",
              indice: "$b(n + 1) = 1{,}1 \\times b(n)$.",
              corrige: "$b(n + 1) - b(n) = 1{,}1\\,b(n) - b(n) = 0{,}1\\,b(n)$ : chaque année, B rapporte $10\\,\\%$ du capital **actuel**, qui augmente. Les intérêts déjà gagnés rapportent à leur tour : $200$ €, puis $220$ €, puis $242$ €…"
            },
            {
              n: "4.", points: 1.5,
              texte: "À partir de quelle année l'écart entre les deux capitaux dépasse-t-il $100$ € ?",
              indice: "Calcule $b(4)$ et $a(4)$, puis compare les écarts.",
              corrige: "Les écarts valent $0$, $20$ € puis $62$ € les trois premières années. Puis $b(4) = 2\\,662 \\times 1{,}1 = 2\\,928{,}20$ € et $a(4) = 2\\,800$ € : l'écart vaut $128{,}20$ €. Il dépasse $100$ € à partir de la $4^\\text{e}$ année."
            },
            {
              n: "5.", points: 1,
              texte: "On admet que $1{,}1^7 \\approx 1{,}95$ et $1{,}1^8 \\approx 2{,}14$. Au bout de combien d'années chaque capital a-t-il doublé ?",
              indice: "Doubler, c'est atteindre $4\\,000$ €.",
              corrige: "A : $2\\,000 + 200n = 4\\,000 \\iff n = 10$, au bout de $10$ ans. B : le capital a doublé quand $1{,}1^n \\geqslant 2$ : pas encore au bout de $7$ ans ($1{,}95$), mais au bout de $8$ ans ($2{,}14$)."
            }
          ]
        },
        {
          titre: "Le tapis de Sierpinski",
          duree: 25, points: 7, calculatrice: false,
          contexte: "On part d'un carré plein de $1$ m de côté (étape $0$). À chaque étape, on découpe chaque carré plein en $9$ carrés égaux et on retire celui du centre. On note $N(n)$ le nombre de carrés pleins à l'étape $n$, $c(n)$ la longueur de leur côté, en m, et $A(n)$ l'aire totale restante, en m².",
          figure: tapis,
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Donne $N(0)$, $N(1)$ et $N(2)$. Quelle est la nature de la suite $(N(n))$ ? Exprime $N(n)$ en fonction de $n$.",
              indice: "Chaque carré plein est remplacé par $8$ carrés plus petits.",
              corrige: "$N(0) = 1$, $N(1) = 8$ et $N(2) = 64$. Chaque carré plein donne $8$ carrés : $N(n + 1) = 8N(n)$. La suite est géométrique de raison $8$, et $N(n) = 8^n$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Exprime $c(n)$ en fonction de $n$, puis calcule $c(2)$.",
              indice: "À chaque étape, le côté est divisé par $3$.",
              corrige: "Le côté est multiplié par $\\dfrac{1}{3}$ à chaque étape : $c(n) = \\left(\\dfrac{1}{3}\\right)^n$, et $c(2) = \\dfrac{1}{9}$ m, environ $11$ cm."
            },
            {
              n: "3.", points: 1.5,
              texte: "Montre que $A(n) = \\left(\\dfrac{8}{9}\\right)^n$. Quel est le sens de variation de la suite $(A(n))$ ?",
              indice: "$A(n) = N(n) \\times c(n)^2$.",
              corrige: "$A(n) = 8^n \\times \\left(\\dfrac{1}{3}\\right)^{2n} = 8^n \\times \\left(\\dfrac{1}{9}\\right)^n = \\left(\\dfrac{8}{9}\\right)^n$. C'est une suite géométrique de raison $\\dfrac{8}{9}$, comprise entre $0$ et $1$ : elle est décroissante."
            },
            {
              n: "4.", points: 1.5,
              texte: "On admet que $\\left(\\dfrac{8}{9}\\right)^{20} \\approx 0{,}095$. Que peut-on dire de l'aire restante au bout de $20$ étapes ? Et si l'on continue indéfiniment ?",
              indice: "Une suite géométrique de raison entre $0$ et $1$ se rapproche de $0$.",
              corrige: "Au bout de $20$ étapes, il reste moins de $10\\,\\%$ du carré, alors qu'il y a $8^{20}$ carrés pleins, minuscules. En continuant, l'aire restante se rapproche de $0$."
            },
            {
              n: "5.", points: 1,
              texte: "Vrai ou faux : « À chaque étape, l'aire diminue de la même quantité. » Justifie.",
              indice: "Calcule $A(0) - A(1)$ et $A(1) - A(2)$.",
              corrige: "**Faux.** $A(0) - A(1) = \\dfrac{1}{9}$, mais $A(1) - A(2) = \\dfrac{8}{9} - \\dfrac{64}{81} = \\dfrac{8}{81}$ : à chaque étape, on retire le neuvième de ce qui reste, une quantité de plus en plus petite."
            }
          ]
        },
        {
          titre: "Le modèle de Malthus",
          duree: 25, points: 6, calculatrice: false,
          contexte: "Une île (fictive) compte $10\\,000$ habitants, et sa population augmente de $10\\,\\%$ par an. Sa production agricole permet de nourrir $12\\,000$ personnes la première année, et elle permet d'en nourrir $1\\,000$ de plus chaque année. On note $p(n)$ la population et $r(n)$ le nombre de personnes que l'île peut nourrir au bout de $n$ années.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Quelle est la nature de chacune des deux suites ? Donne leur raison.",
              indice: "Pour l'une, on multiplie ; pour l'autre, on ajoute.",
              corrige: "$(p(n))$ est géométrique de raison $1{,}1$, de premier terme $10\\,000$. $(r(n))$ est arithmétique de raison $1\\,000$, de premier terme $12\\,000$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Calcule $p(1)$, $p(2)$, $p(3)$ et $r(3)$. L'île peut-elle encore nourrir tous ses habitants au bout de $3$ ans ?",
              indice: "$p(1) = 11\\,000$, puis ajoute chaque fois le dixième.",
              corrige: "$p(1) = 11\\,000$, $p(2) = 12\\,100$, $p(3) = 13\\,310$, et $r(3) = 15\\,000$. Oui : $13\\,310 < 15\\,000$."
            },
            {
              n: "3.", points: 1.5,
              texte:
                "Qu'affiche ce programme ? Interprète le résultat.\n\n" +
                "```python\nn = 0\np = 10000\nr = 12000\nwhile p <= r:\n    n = n + 1\n    p = p * 1.1\n    r = r + 1000\nprint(n)\n```",
              indice: "On admet que $p(6) \\approx 17\\,716$ et $p(7) \\approx 19\\,487$. Compare avec $r(6)$ et $r(7)$.",
              corrige: "La boucle s'arrête au premier $n$ tel que $p(n) > r(n)$. Or $p(6) \\approx 17\\,716 \\leqslant 18\\,000 = r(6)$, mais $p(7) \\approx 19\\,487 > 19\\,000 = r(7)$ : le programme affiche $\\texttt{7}$. Dès la $7^\\text{e}$ année, la production ne suffit plus à nourrir tout le monde."
            },
            {
              n: "4.", points: 1.5,
              texte: "Explique pourquoi, dans ce modèle, la population finit forcément par dépasser ce que l'île peut nourrir.",
              indice: "Compare les gains de chaque année : $p(n + 1) - p(n)$ et $r(n + 1) - r(n)$.",
              corrige: "Chaque année, $r$ augmente toujours de $1\\,000$, alors que $p$ augmente de $10\\,\\%$ de la population, soit $1\\,000$, puis $1\\,100$, puis $1\\,210$… de plus en plus. L'écart de départ se réduit chaque année, et une croissance exponentielle finit toujours par dépasser une croissance linéaire."
            }
          ]
        }
      ]
    }
  };
})();
