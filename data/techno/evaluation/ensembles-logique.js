/*
  ENTRAÎNEMENT : Première technologique — chapitre 1, Ensembles et logique
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre techno-ensembles-logique.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  // diagramme à deux ensembles, dans le style de celui du cours (ye-cours-venn)
  const venn = (o) => {
    const t = (x, y, v) => `<text class="g-label" x="${x}" y="${y}" text-anchor="middle" style="font-weight:700">${v}</text>`;
    return `<svg class="graph" viewBox="0 0 320 200" role="img" aria-label="${o.aria}">` +
      `<rect x="10" y="10" width="300" height="180" rx="8" style="fill:none;stroke:var(--encre);stroke-width:1.4"/><text class="g-label" x="20" y="30" style="font-weight:700">${o.E}</text>` +
      `<circle cx="125" cy="105" r="62" style="fill:var(--lagon);fill-opacity:0.13;stroke:var(--lagon);stroke-width:1.8"/><circle cx="195" cy="105" r="62" style="fill:var(--ylang);fill-opacity:0.13;stroke:var(--ylang);stroke-width:1.8"/>` +
      `<text class="g-label" x="82" y="52" style="font-weight:700;fill:var(--lagon)">${o.A}</text><text class="g-label" x="228" y="52" style="font-weight:700;fill:var(--ylang)">${o.B}</text>` +
      t(95, 110, o.a) + t(160, 110, o.ab) + t(225, 110, o.b) + t(270, 178, o.hors) + `</svg>`;
  };

  window.EVALUATIONS["techno-ensembles-logique"] = {
    revisions: {
      intro: "Le vocabulaire des ensembles et de la logique en un coup d'œil : appartenance et inclusion, intervalles, intersection et réunion, produit cartésien, implication et conditions. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Appartenir, être inclus",
          texte: "$x \\in A$ : l'élément $x$ appartient à l'ensemble $A$. $B \\subset A$ : tout élément de $B$ est aussi dans $A$. On écrit $2 \\in \\mathbb{N}$, mais $\\{2\\} \\subset \\mathbb{N}$."
        },
        {
          titre: "Intervalles",
          texte:
            "- $[a\\,;b]$ : $a \\leqslant x \\leqslant b$ ; $]a\\,;b[$ : $a < x < b$ ;\n" +
            "- $[a\\,;+\\infty[$ : $x \\geqslant a$ ; $]-\\infty\\,;b[$ : $x < b$ ;\n" +
            "- du côté de l'infini, le crochet est toujours ouvert."
        },
        {
          titre: "Intersection, réunion",
          texte:
            "- $A \\cap B$ : les éléments qui sont dans $A$ **et** dans $B$ ;\n" +
            "- $A \\cup B$ : ceux qui sont dans $A$ **ou** dans $B$, ou dans les deux ;\n" +
            "- $\\overline{A}$ : ceux qui ne sont pas dans $A$.\n\n" +
            "Pour compter $A \\cup B$, on ajoute $\\text{Card}(A)$ et $\\text{Card}(B)$, puis on retire $\\text{Card}(A \\cap B)$, compté deux fois."
        },
        {
          titre: "Produit cartésien",
          texte: "$A \\times B$ est l'ensemble des couples $(x\\,;y)$ avec $x \\in A$ et $y \\in B$. Si $A$ a $p$ éléments et $B$ en a $q$, alors $A \\times B$ en a $p \\times q$."
        },
        {
          titre: "Implication",
          texte: "« Si $P$, alors $Q$ ». Sa **réciproque** est « si $Q$, alors $P$ » ; sa **contraposée**, « si non $Q$, alors non $P$ », est vraie exactement quand l'implication l'est. Un seul **contre-exemple** suffit à montrer qu'une phrase « pour tout » est fausse."
        },
        {
          titre: "Conditions",
          texte: "Quand « $P \\Rightarrow Q$ » est vraie, $P$ est une condition **suffisante** pour avoir $Q$, et $Q$ est une condition **nécessaire** pour avoir $P$."
        }
      ],
      pieges: [
        "Confondre $\\in$ et $\\subset$ : $2 \\in \\mathbb{N}$, mais $\\{2\\} \\subset \\mathbb{N}$.",
        "Tourner le crochet du mauvais côté : $x < 3$ donne $]-\\infty\\,;3[$, borne exclue.",
        "Écrire $[2\\,;+\\infty]$ : du côté de l'infini, le crochet est toujours ouvert.",
        "Croire que « ou » exclut le cas où les deux sont vraies : en maths, « ou » est inclusif.",
        "Confondre la réciproque (on échange) et la contraposée (on échange **et** on nie).",
        "Vouloir prouver une propriété « pour tout » avec quelques exemples."
      ]
    },

    evaluation: {
      intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Les règles d'une boutique en ligne",
          duree: 25, points: 7, calculatrice: false,
          contexte:
            "Une boutique en ligne applique ces règles au montant $m$ d'une commande, en euros ($m > 0$) :\n" +
            "- la livraison est gratuite si $m \\geqslant 35$ ;\n" +
            "- une réduction de $10\\,\\%$ s'applique si $50 \\leqslant m < 100$ ;\n" +
            "- une réduction de $15\\,\\%$ s'applique si $m \\geqslant 100$.\n\n" +
            "On note $L$, $R_1$ et $R_2$ les ensembles des montants concernés par chacune de ces trois règles.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Écris $L$, $R_1$ et $R_2$ sous forme d'intervalles.",
              indice: "Une borne comprise ($\\leqslant$ ou $\\geqslant$) a un crochet tourné vers le nombre ; du côté de $+\\infty$, le crochet est ouvert.",
              corrige: "$L = [35\\,;+\\infty[$, $R_1 = [50\\,;100[$ et $R_2 = [100\\,;+\\infty[$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Détermine $R_1 \\cup R_2$ et $L \\cap R_1$. Traduis chaque résultat par une phrase.",
              indice: "Place les intervalles sur une droite graduée de $0$ à $150$.",
              corrige: "$R_1 \\cup R_2 = [50\\,;+\\infty[$ : une commande a une réduction dès que son montant atteint $50$ €.\n\n$L \\cap R_1 = [50\\,;100[ = R_1$ : toutes les commandes qui ont $10\\,\\%$ de réduction ont aussi la livraison gratuite."
            },
            {
              n: "3.", points: 1.5,
              texte: "Une commande de $100$ € appartient-elle à $R_1$ ? À $R_2$ ? Que vaut $R_1 \\cap R_2$ ?",
              indice: "Regarde le crochet en $100$ dans chaque intervalle.",
              corrige: "$100 \\notin R_1$, car la borne $100$ est exclue de $[50\\,;100[$, mais $100 \\in R_2$ : cette commande a $15\\,\\%$ de réduction.\n\n$R_1 \\cap R_2 = \\varnothing$ : aucune commande n'a les deux réductions à la fois."
            },
            {
              n: "4.", points: 1.5,
              texte: "Un client affirme : « Si j'ai la livraison gratuite, alors j'ai une réduction. » A-t-il raison ? Écris la réciproque de cette implication et dis si elle est vraie.",
              indice: "Cherche un montant de $L$ qui n'a aucune réduction. Pour la réciproque, compare $R_1 \\cup R_2$ et $L$.",
              corrige: "Il a tort : une commande de $40$ € a la livraison gratuite mais aucune réduction. C'est un contre-exemple.\n\nRéciproque : « Si j'ai une réduction, alors j'ai la livraison gratuite. » Elle est vraie, car $R_1 \\cup R_2 = [50\\,;+\\infty[$ est inclus dans $L = [35\\,;+\\infty[$."
            },
            {
              n: "5.", points: 1,
              texte: "Écris la contraposée de cette réciproque. Que dit-elle à un client qui paie la livraison ?",
              indice: "On échange les deux parties, et on les nie.",
              corrige: "« Si je n'ai pas la livraison gratuite, alors je n'ai pas de réduction. » Elle est vraie comme la réciproque : un client qui paie la livraison ($m < 35$) n'a aucune réduction."
            }
          ]
        },
        {
          titre: "L'association sportive",
          duree: 25, points: 7, calculatrice: false,
          contexte: "L'association sportive d'un lycée compte $40$ adhérents : $22$ font du football, $15$ font du basket et $8$ ne font ni l'un ni l'autre. On note $F$ l'ensemble des adhérents qui font du football et $B$ l'ensemble de ceux qui font du basket.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule $\\text{Card}(F \\cup B)$, puis montre que $\\text{Card}(F \\cap B) = 5$.",
              indice: "$F \\cup B$, ce sont tous les adhérents sauf ceux qui ne font ni football ni basket.",
              corrige: "$\\text{Card}(F \\cup B) = 40 - 8 = 32$.\n\nEn ajoutant $\\text{Card}(F)$ et $\\text{Card}(B)$, on compte deux fois ceux qui font les deux sports : $22 + 15 = 37$, et $37 - 32 = 5$. Donc $\\text{Card}(F \\cap B) = 5$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Fais un diagramme avec deux disques $F$ et $B$, et écris l'effectif de chacune des quatre zones.",
              indice: "Commence par la zone commune ($5$), puis « football seulement » : $22 - 5$.",
              corrige: "Football seulement : $22 - 5 = 17$ ; les deux : $5$ ; basket seulement : $15 - 5 = 10$ ; ni l'un ni l'autre : $8$. On vérifie : $17 + 5 + 10 + 8 = 40$.",
              figureCorrige: () => venn({ E: "40 adhérents", A: "F", B: "B", a: 17, ab: 5, b: 10, hors: 8, aria: "Deux disques F et B dans un rectangle : 17 dans F seulement, 5 dans les deux, 10 dans B seulement, 8 en dehors" })
            },
            {
              n: "3.", points: 1.5,
              texte: "Décris par une phrase les ensembles $F \\cap \\overline{B}$ et $\\overline{F \\cup B}$, puis donne leur nombre d'éléments.",
              indice: "$\\overline{B}$ : ceux qui ne font pas de basket.",
              corrige: "$F \\cap \\overline{B}$ : les adhérents qui font du football mais pas de basket ; il y en a $17$.\n\n$\\overline{F \\cup B}$ : ceux qui ne font ni football ni basket ; il y en a $8$."
            },
            {
              n: "4.", points: 1.5,
              texte: "Pour un tournoi, on forme des duos d'un adhérent qui ne fait que du football et d'un adhérent qui ne fait que du basket. Combien de duos différents peut-on former ? Explique avec un produit cartésien.",
              indice: "Un duo est un couple (footballeur seul ; basketteur seul).",
              corrige: "Un duo est un couple d'un élément de $F \\cap \\overline{B}$ ($17$ adhérents) et d'un élément de $B \\cap \\overline{F}$ ($10$ adhérents) : c'est un élément du produit cartésien de ces deux ensembles. Il y a donc $17 \\times 10 = 170$ duos possibles."
            },
            {
              n: "5.", points: 1,
              texte: "Vrai ou faux : « $F \\subset B$ ». Justifie.",
              indice: "Tout footballeur fait-il du basket ?",
              corrige: "**Faux.** $17$ adhérents sont dans $F$ sans être dans $B$ : un seul suffirait comme contre-exemple."
            }
          ]
        },
        {
          titre: "Vrai ou faux ? Justifie",
          duree: 25, points: 6, calculatrice: false,
          contexte: "Les questions sont indépendantes. Chaque réponse doit être justifiée : une preuve si c'est vrai, un contre-exemple si c'est faux.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "« Pour tout réel $x$, $x^2 \\geqslant x$. »",
              indice: "Essaie un nombre entre $0$ et $1$.",
              corrige: "**Faux.** Pour $x = 0{,}5$ : $x^2 = 0{,}25$ et $0{,}25 < 0{,}5$. Ce contre-exemple suffit."
            },
            {
              n: "2.", points: 1.5,
              texte: "« Si $n$ est un entier pair, alors $n^2$ est pair. » Démontre cette implication, puis écris sa contraposée.",
              indice: "Un entier pair s'écrit $n = 2k$, avec $k$ entier.",
              corrige: "**Vrai.** Si $n = 2k$ avec $k$ entier, alors $n^2 = 4k^2 = 2 \\times 2k^2$, et $2k^2$ est un entier : $n^2$ est pair.\n\nContraposée : « Si $n^2$ est impair, alors $n$ est impair. »"
            },
            {
              n: "3.", points: 1.5,
              texte: "La condition « $x > 3$ » est-elle suffisante pour avoir $x^2 > 4$ ? Est-elle nécessaire ?",
              indice: "Suffisante : $x > 3$ entraîne-t-il $x^2 > 4$ ? Nécessaire : peut-on avoir $x^2 > 4$ sans $x > 3$ ?",
              corrige: "**Suffisante** : si $x > 3$, alors $x$ est positif et $x^2 > 3^2 = 9$, donc $x^2 > 4$.\n\n**Pas nécessaire** : pour $x = -3$, on a $x^2 = 9 > 4$, alors que $x > 3$ est faux."
            },
            {
              n: "4.", points: 1.5,
              texte:
                "Qu'affiche ce programme ? Combien de fois le nombre $15$ apparaît-il dans la liste ?\n\n" +
                "```python\nL = []\nfor n in range(1, 16):\n    a = n % 3 == 0\n    b = n % 5 == 0\n    if a or b:\n        L.append(n)\nprint(L)\n```",
              indice: "$\\texttt{n \\% 3 == 0}$ teste si $n$ est un multiple de $3$. Le « ou » est inclusif.",
              corrige: "Il garde les entiers de $1$ à $15$ qui sont multiples de $3$ ou de $5$ : il affiche $\\texttt{[3, 5, 6, 9, 10, 12, 15]}$.\n\n$15$ est multiple de $3$ et de $5$ : le « ou » est vrai, et $15$ est ajouté une seule fois, car la boucle ne passe qu'une fois par $15$."
            }
          ]
        }
      ]
    }
  };
})();
