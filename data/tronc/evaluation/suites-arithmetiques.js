/*
  ENTRAÎNEMENT : Première tronc commun — chapitre 9, Suites arithmétiques : croissance linéaire
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre tronc-suites-arithmetiques.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Notation u(n) ; contextes différents du cours (motifs en croix) et de Première techno.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  // motifs d'allumettes : n carrés côte à côte (exercice 1)
  const allumettes = () => {
    const c = 28, g = 3; // côté d'un carré ; petit espace pour qu'on distingue chaque allumette
    const trait = (x1, y1, x2, y2) => { const h = y1 === y2; return `<line x1="${h ? x1 + g : x1}" y1="${h ? y1 : y1 + g}" x2="${h ? x2 - g : x2}" y2="${h ? y2 : y2 - g}" style="stroke:var(--ylang);stroke-width:4;stroke-linecap:round"/>`; };
    let s = `<svg class="graph" viewBox="0 0 320 112" role="img" aria-label="Motif 1 : un carré de 4 allumettes. Motif 2 : deux carrés côte à côte, 7 allumettes. Motif 3 : trois carrés côte à côte, 10 allumettes">`;
    let x0 = 14;
    for (let n = 1; n <= 3; n++) {
      const y = 22;
      for (let k = 0; k < n; k++) { const x = x0 + k * c; s += trait(x, y, x + c, y) + trait(x, y + c, x + c, y + c) + trait(x + c, y, x + c, y + c); }
      s += trait(x0, y, x0, y + c) + `<text class="g-label" x="${x0 + (n * c) / 2}" y="${y + c + 26}" text-anchor="middle">motif ${n}</text>`;
      x0 += n * c + 34;
    }
    return s + `</svg>`;
  };

  window.EVALUATIONS["tronc-suites-arithmetiques"] = {
    revisions: {
      intro: "Les suites arithmétiques en un coup d'œil : la raison qu'on ajoute, le terme de rang $n$, le sens de variation, les intérêts simples et les seuils. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Suite arithmétique",
          texte: "$u(n + 1) = u(n) + r$ : on ajoute toujours le même nombre, la **raison** $r$. Les écarts entre deux termes consécutifs sont tous égaux à $r$."
        },
        {
          titre: "Terme de rang $n$",
          texte:
            "- si la suite commence à $u(0)$ : $u(n) = u(0) + n \\times r$ ;\n" +
            "- si elle commence à $u(1)$ : $u(n) = u(1) + (n - 1) \\times r$."
        },
        {
          titre: "Sens de variation",
          texte: "La suite est croissante si $r > 0$, décroissante si $r < 0$, constante si $r = 0$. Les points $(n\\,;u(n))$ sont alignés : c'est une croissance (ou une décroissance) linéaire."
        },
        {
          titre: "Pas proportionnel",
          texte: "$u(n) = 2n + 5$ n'est pas proportionnel à $n$ : $u(10) = 25$ n'est pas le double de $u(5) = 15$, à cause du terme constant."
        },
        {
          titre: "Intérêts simples",
          texte: "Avec des intérêts simples au taux $t\\,\\%$, un capital $C$ rapporte chaque année la même somme $C \\times \\dfrac{t}{100}$ : le capital forme une suite arithmétique."
        },
        {
          titre: "Seuil",
          texte: "Pour trouver le premier rang où $u(n)$ dépasse une valeur, on résout une inéquation, ou on calcule les termes un à un, par exemple avec une boucle $\\texttt{while}$ en Python."
        }
      ],
      pieges: [
        "Multiplier par la raison au lieu de l'ajouter.",
        "Écrire $u(n) = u(1) + nr$ pour une suite qui commence à $u(1)$ : c'est $u(1) + (n - 1)r$.",
        "Croire que le terme est proportionnel au rang, en oubliant le terme constant.",
        "Relier les points du nuage d'une suite.",
        "Confondre intérêts simples (suite arithmétique) et intérêts composés (suite géométrique).",
        "Dans un seuil, donner la valeur $u(n)$ au lieu du rang $n$."
      ]
    },

    evaluation: {
      intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Des motifs d'allumettes",
          duree: 25, points: 7, calculatrice: false,
          contexte: "On construit des motifs avec des allumettes : le motif $n$ est formé de $n$ carrés côte à côte. On note $u(n)$ le nombre d'allumettes du motif $n$, pour $n \\geqslant 1$.",
          figure: allumettes,
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Donne $u(1)$, $u(2)$, $u(3)$ et $u(4)$. Explique pourquoi la suite $(u(n))$ est arithmétique.",
              indice: "Combien d'allumettes faut-il pour ajouter un carré à droite d'un motif ?",
              corrige: "$u(1) = 4$, $u(2) = 7$, $u(3) = 10$ et $u(4) = 13$. Pour passer d'un motif au suivant, on ajoute un carré qui partage un côté avec le dernier : $3$ allumettes. Donc $u(n + 1) = u(n) + 3$ : la suite est arithmétique de raison $3$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Exprime $u(n)$ en fonction de $n$, puis calcule $u(20)$.",
              indice: "La suite commence à $u(1)$ : $u(n) = u(1) + (n - 1) \\times r$.",
              corrige: "$u(n) = 4 + 3(n - 1) = 3n + 1$. Donc $u(20) = 61$ allumettes."
            },
            {
              n: "3.", points: 1.5,
              texte: "Quel motif utilise exactement $100$ allumettes ?",
              indice: "Résous $3n + 1 = 100$.",
              corrige: "$3n + 1 = 100 \\iff 3n = 99 \\iff n = 33$ : c'est le motif $33$."
            },
            {
              n: "4.", points: 1.5,
              texte: "Avec une boîte de $250$ allumettes, quel est le plus grand motif que l'on peut construire ?",
              indice: "Résous $3n + 1 \\leqslant 250$.",
              corrige: "$3n + 1 \\leqslant 250 \\iff 3n \\leqslant 249 \\iff n \\leqslant 83$. Le plus grand motif est le motif $83$, qui utilise exactement $3 \\times 83 + 1 = 250$ allumettes."
            },
            {
              n: "5.", points: 1,
              texte: "Vrai ou faux : « Le motif $10$ utilise deux fois plus d'allumettes que le motif $5$. » Justifie.",
              indice: "Calcule $u(5)$ et $u(10)$.",
              corrige: "**Faux.** $u(5) = 16$ et $u(10) = 31$, qui n'est pas le double de $16$ : le nombre d'allumettes n'est pas proportionnel au numéro du motif, à cause du terme constant $1$."
            }
          ]
        },
        {
          titre: "Un placement à intérêts simples",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Kassim place $2\\,000$ € sur un compte à intérêts simples de $3\\,\\%$ par an : chaque année, le compte rapporte $3\\,\\%$ de la somme placée au départ. On note $u(n)$ la somme sur le compte au bout de $n$ années : $u(0) = 2\\,000$.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Combien le compte rapporte-t-il chaque année ? Calcule $u(1)$ et $u(2)$, puis exprime $u(n)$ en fonction de $n$.",
              indice: "$3\\,\\%$ de $2\\,000$, c'est $0{,}03 \\times 2\\,000$.",
              corrige: "Chaque année, le compte rapporte $0{,}03 \\times 2\\,000 = 60$ €. Donc $u(1) = 2\\,060$, $u(2) = 2\\,120$, et $u(n) = 2\\,000 + 60n$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Quelle est la nature de la suite $(u(n))$ ? Son sens de variation ? Comment sont placés les points $(n\\,;u(n))$ ?",
              indice: "On ajoute toujours la même somme.",
              corrige: "La suite est arithmétique de raison $60$, de premier terme $2\\,000$. Comme $60 > 0$, elle est croissante, et les points $(n\\,;u(n))$ sont alignés."
            },
            {
              n: "3.", points: 1.5,
              texte: "Quelle somme Kassim aura-t-il au bout de $10$ ans ?",
              indice: "Calcule $u(10)$.",
              corrige: "$u(10) = 2\\,000 + 600 = 2\\,600$ €."
            },
            {
              n: "4.", points: 1.5,
              texte: "Au bout de combien d'années la somme dépassera-t-elle $2\\,500$ € ?",
              indice: "Résous $2\\,000 + 60n > 2\\,500$, avec $n$ entier.",
              corrige: "$2\\,000 + 60n > 2\\,500 \\iff 60n > 500 \\iff n > \\dfrac{500}{60} \\approx 8{,}3$. Donc au bout de $9$ ans : $u(8) = 2\\,480$ et $u(9) = 2\\,540$."
            },
            {
              n: "5.", points: 1,
              texte: "Vrai ou faux : « Avec ce placement, la somme sur le compte augmente de $3\\,\\%$ chaque année. » Justifie.",
              indice: "La deuxième année, $60$ € représentent quel pourcentage de $2\\,060$ € ?",
              corrige: "**Faux.** Elle augmente de $60$ € chaque année, soit $3\\,\\%$ de la somme de départ seulement. La deuxième année, $60$ € représentent moins de $3\\,\\%$ de $2\\,060$ € (car $3\\,\\%$ de $2\\,060$ font $61{,}80$ €)."
            }
          ]
        },
        {
          titre: "La citerne en saison sèche",
          duree: 25, points: 6, calculatrice: false,
          contexte: "Pendant la saison sèche, le niveau d'eau d'une citerne de récupération d'eau de pluie baisse de $15$ cm par semaine. Au départ, il est de $180$ cm. On note $c(n)$ le niveau, en cm, au bout de $n$ semaines.",
          figure: (o) => o.graph({
            xmin: -0.5, xmax: 13, ymin: 0, ymax: 195, xstep: 1, ystep: 10, yetiq: 30, h: 260, padL: 30,
            xlabel: "n", ylabel: "c(n)",
            points: Array.from({ length: 13 }, (_, n) => ({ x: n, y: 180 - 15 * n })),
            aria: "Nuage des points (n ; c(n)) pour n de 0 à 12 : ils descendent en ligne droite de 180 à 0"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Donne $c(0)$, $c(1)$ et $c(2)$. Justifie que la suite $(c(n))$ est arithmétique et donne sa raison.",
              indice: "Le niveau baisse de la même hauteur chaque semaine.",
              corrige: "$c(0) = 180$, $c(1) = 165$ et $c(2) = 150$. Chaque semaine, on retire $15$ cm : $c(n + 1) = c(n) - 15$. La suite est arithmétique de raison $-15$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Exprime $c(n)$ en fonction de $n$. Au bout de combien de semaines la citerne est-elle vide ?",
              indice: "Résous $180 - 15n = 0$.",
              corrige: "$c(n) = 180 - 15n$. La citerne est vide quand $180 - 15n = 0$, soit $n = 12$ : au bout de $12$ semaines."
            },
            {
              n: "3.", points: 1.5,
              texte: "La pompe ne fonctionne plus quand le niveau est inférieur à $40$ cm. À partir de quelle semaine cela arrive-t-il ?",
              indice: "Résous $180 - 15n < 40$.",
              corrige: "$180 - 15n < 40 \\iff 15n > 140 \\iff n > \\dfrac{140}{15} \\approx 9{,}3$ : à partir de la semaine $10$, où $c(10) = 30$ (alors que $c(9) = 45$)."
            },
            {
              n: "4.", points: 1.5,
              texte:
                "Qu'affiche ce programme ? Explique la condition de la boucle.\n\n" +
                "```python\nn = 0\nc = 180\nwhile c >= 40:\n    n = n + 1\n    c = c - 15\nprint(n)\n```",
            indice: "La boucle continue tant que la pompe fonctionne.",
              corrige: "La boucle continue tant que $c \\geqslant 40$, c'est-à-dire tant que la pompe fonctionne. Elle s'arrête au premier niveau inférieur à $40$ cm : le programme affiche $\\texttt{10}$, comme à la question 3."
            }
          ]
        }
      ]
    }
  };
})();
