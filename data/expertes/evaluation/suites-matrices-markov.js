/*
  ENTRAÎNEMENT : Terminale maths expertes — chapitre 11, Suites de matrices et chaînes de Markov
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre expertes-suites-matrices-markov.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths expertes.
  Chaînes à deux ou trois états (programme). Le modèle d'Ehrenfest est un « problème possible » du programme.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  // graphe probabiliste dans le style du cours (grapheG de assets/exercices-expertes.js) :
  // sommets [nom, x, y] ; arcs [a, b, poids] ou boucles [a, a, poids, angle de la boucle]
  const graphe = (o) => {
    const R = 15, pos = {}, f1 = (v) => +v.toFixed(1);
    o.sommets.forEach(([n, x, y]) => (pos[n] = [x, y]));
    const cles = new Set(o.arcs.map(([a, b]) => a + ">" + b));
    const pointe = (x, y, dx, dy) => { const L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L; return `<path d="M${f1(x)} ${f1(y)}L${f1(x - 9 * ux - 4 * uy)} ${f1(y - 9 * uy + 4 * ux)}L${f1(x - 9 * ux + 4 * uy)} ${f1(y - 9 * uy - 4 * ux)}Z" style="fill:var(--encre)"/>`; };
    const poids = (x, y, w) => `<text x="${f1(x)}" y="${f1(y + 4)}" text-anchor="middle" style="font:700 11px var(--f-texte);fill:var(--lagon);paint-order:stroke;stroke:var(--surface);stroke-width:4px;stroke-linejoin:round">${w}</text>`;
    let traits = "", etiq = "";
    o.arcs.forEach(([a, b, w, t]) => {
      if (a === b) {
        const [x, y] = pos[a], d = (u, r) => [x + r * Math.cos(u), y + r * Math.sin(u)];
        const [p1x, p1y] = d(t - 0.42, R), [p2x, p2y] = d(t + 0.42, R + 1), [c1x, c1y] = d(t - 0.75, 46), [c2x, c2y] = d(t + 0.75, 46), [lx, ly] = d(t, 44);
        traits += `<path d="M${f1(p1x)} ${f1(p1y)}C${f1(c1x)} ${f1(c1y)} ${f1(c2x)} ${f1(c2y)} ${f1(p2x)} ${f1(p2y)}" style="fill:none;stroke:var(--encre);stroke-width:1.5"/>` + pointe(p2x, p2y, p2x - c2x, p2y - c2y);
        etiq += poids(lx, ly, w);
        return;
      }
      const [x1, y1] = pos[a], [x2, y2] = pos[b], L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L;
      const k = cles.has(b + ">" + a) ? 15 : 0, qx = (x1 + x2) / 2 + k * nx, qy = (y1 + y2) / 2 + k * ny;
      const u1 = Math.hypot(qx - x1, qy - y1), u2 = Math.hypot(qx - x2, qy - y2);
      const sx = x1 + (R * (qx - x1)) / u1, sy = y1 + (R * (qy - y1)) / u1, ex = x2 + ((R + 1) * (qx - x2)) / u2, ey = y2 + ((R + 1) * (qy - y2)) / u2;
      traits += `<path d="M${f1(sx)} ${f1(sy)}Q${f1(qx)} ${f1(qy)} ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:var(--encre);stroke-width:1.5"/>` + pointe(ex, ey, ex - qx, ey - qy);
      const mx = 0.25 * x1 + 0.5 * qx + 0.25 * x2, my = 0.25 * y1 + 0.5 * qy + 0.25 * y2, dd = k ? 10 : 11;
      etiq += poids(mx + dd * nx, my + dd * ny, w);
    });
    let s = `<svg class="graph" viewBox="0 0 320 ${o.h || 200}" role="img" aria-label="${o.aria}">` + traits;
    o.sommets.forEach(([n, x, y]) => { s += `<circle cx="${x}" cy="${y}" r="${R}" style="fill:var(--surface);stroke:var(--lagon);stroke-width:2"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" style="font:700 13px var(--f-texte);fill:var(--encre)">${n}</text>`; });
    return s + etiq + `</svg>`;
  };

  window.EVALUATIONS["expertes-suites-matrices-markov"] = {
    revisions: {
      intro: "Suites de matrices et chaînes de Markov en un coup d'œil : $U_{n+1} = AU_n$ et $U_{n+1} = AU_n + C$, matrice de transition, distributions après $n$ étapes et distribution invariante. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Suites de matrices",
          texte: "Si $U_{n+1} = AU_n$ pour tout $n$, alors $U_n = A^nU_0$ (par récurrence). Si de plus $A = PDP^{-1}$ avec $D$ diagonale, alors $A^n = PD^nP^{-1}$, et $D^n$ s'obtient en élevant chaque coefficient diagonal à la puissance $n$."
        },
        {
          titre: "$U_{n+1} = AU_n + C$",
          texte: "On cherche une suite constante $L$ telle que $L = AL + C$. Alors $V_n = U_n - L$ vérifie $V_{n+1} = AV_n$, donc $U_n = A^n(U_0 - L) + L$."
        },
        {
          titre: "Chaîne de Markov",
          texte: "Dans la matrice de transition $P$, le coefficient $(i\\,;j)$ est la probabilité de passer de l'état $i$ à l'état $j$ : chaque **ligne** correspond à un état de départ et a pour somme $1$. Dans le graphe probabiliste, n'oublie pas les boucles."
        },
        {
          titre: "Distributions",
          texte: "La distribution $\\pi_n$ est une matrice **ligne**. On a $\\pi_{n+1} = \\pi_nP$, donc $\\pi_n = \\pi_0P^n$, et le coefficient $(i\\,;j)$ de $P^n$ est la probabilité de passer de $i$ à $j$ en $n$ étapes."
        },
        {
          titre: "Distribution invariante",
          texte: "$\\pi$ est invariante si $\\pi P = \\pi$. Pour deux états, on pose $\\pi = \\begin{pmatrix} x & y \\end{pmatrix}$, on écrit une équation de $\\pi P = \\pi$, et on ajoute $x + y = 1$."
        }
      ],
      pieges: [
        "Mettre les probabilités de départ en colonne : dans $P$, chaque ligne correspond à un état de départ.",
        "Calculer $P\\pi_0$ au lieu de $\\pi_0P$ : la distribution est une matrice ligne.",
        "Élever chaque coefficient de $P$ à la puissance $n$ au lieu de calculer $P^n$.",
        "Oublier la condition $x + y = 1$ pour la distribution invariante.",
        "Écrire $U_n = A^nU_0 + nC$ pour $U_{n+1} = AU_n + C$ : il faut passer par la suite constante $L$.",
        "Oublier une boucle dans le graphe probabiliste : les flèches qui partent d'un sommet ont pour somme $1$."
      ]
    },

    evaluation: {
      intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Les tortues de deux herbiers",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Des tortues vertes se nourrissent dans deux herbiers du lagon, au nord (N) et au sud (S). Dans ce modèle, chaque mois, $30\\,\\%$ des tortues de l'herbier N partent vers l'herbier S et $20\\,\\%$ de celles de S partent vers N ; les autres restent, et aucune tortue n'arrive ni ne quitte le lagon. Au départ, $500$ tortues sont dans N et aucune dans S. On note $u_n$ et $v_n$ les nombres de tortues dans N et dans S au bout de $n$ mois, et $U_n = \\begin{pmatrix} u_n \\\\ v_n \\end{pmatrix}$.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule $u_1$ et $v_1$, puis exprime $u_{n+1}$ et $v_{n+1}$ en fonction de $u_n$ et $v_n$.",
              indice: "Dans N, il reste $70\\,\\%$ des tortues de N et arrivent $20\\,\\%$ de celles de S.",
              corrige: "$u_1 = 0{,}7 \\times 500 = 350$ et $v_1 = 0{,}3 \\times 500 = 150$.\n\nPour tout $n$ : $u_{n+1} = 0{,}7u_n + 0{,}2v_n$ et $v_{n+1} = 0{,}3u_n + 0{,}8v_n$."
            },
            {
              n: "2.", points: 1,
              texte: "Écris la matrice $A$ telle que $U_{n+1} = AU_n$, puis montre que $u_n + v_n = 500$ pour tout $n$.",
              indice: "Additionne les deux égalités de la question 1.",
              corrige: "$A = \\begin{pmatrix} 0{,}7 & 0{,}2 \\\\ 0{,}3 & 0{,}8 \\end{pmatrix}$. En additionnant : $u_{n+1} + v_{n+1} = (0{,}7 + 0{,}3)u_n + (0{,}2 + 0{,}8)v_n = u_n + v_n$. La somme est constante, égale à $u_0 + v_0 = 500$."
            },
            {
              n: "3.", points: 1.5,
              texte: "On pose $P = \\begin{pmatrix} 2 & 1 \\\\ 3 & -1 \\end{pmatrix}$ et $D = \\begin{pmatrix} 1 & 0 \\\\ 0 & 0{,}5 \\end{pmatrix}$. Vérifie que $AP = PD$, puis justifie que $P$ est inversible et que $A = PDP^{-1}$.",
              indice: "Pour l'inverse, calcule $ad - bc$ pour la matrice $P$. Multiplie ensuite $AP = PD$ à droite par $P^{-1}$.",
              corrige: "$AP = \\begin{pmatrix} 1{,}4 + 0{,}6 & 0{,}7 - 0{,}2 \\\\ 0{,}6 + 2{,}4 & 0{,}3 - 0{,}8 \\end{pmatrix} = \\begin{pmatrix} 2 & 0{,}5 \\\\ 3 & -0{,}5 \\end{pmatrix}$, et $PD = \\begin{pmatrix} 2 & 0{,}5 \\\\ 3 & -0{,}5 \\end{pmatrix}$ : $AP = PD$.\n\nPour $P$, $ad - bc = -2 - 3 = -5 \\neq 0$ : $P$ est inversible. En multipliant $AP = PD$ à droite par $P^{-1}$, on obtient $A = PDP^{-1}$."
            },
            {
              n: "4.", points: 1.5,
              texte: "Démontre par récurrence que, pour tout entier naturel $n$, $A^n = PD^nP^{-1}$.",
              indice: "Pour l'hérédité, $A^{n+1} = A^n \\times A$, et $P^{-1}P = I$.",
              corrige: "Initialisation : $PD^0P^{-1} = PP^{-1} = I = A^0$.\n\nHérédité : si $A^n = PD^nP^{-1}$, alors $A^{n+1} = A^nA = PD^nP^{-1}PDP^{-1} = PD^nDP^{-1} = PD^{n+1}P^{-1}$.\n\nConclusion : $A^n = PD^nP^{-1}$ pour tout $n$."
            },
            {
              n: "5.", points: 1.5,
              texte: "On en déduit (admis) que, en notant $q_n = 0{,}5^n$, $A^n = \\dfrac{1}{5}\\begin{pmatrix} 2 + 3q_n & 2 - 2q_n \\\\ 3 - 3q_n & 3 + 2q_n \\end{pmatrix}$. Exprime $u_n$ et $v_n$ en fonction de $n$, puis détermine leurs limites. Interprète.",
              indice: "$U_n = A^nU_0$ avec $U_0 = \\begin{pmatrix} 500 \\\\ 0 \\end{pmatrix}$ : seule la première colonne de $A^n$ compte.",
              corrige: "$U_n = A^nU_0$, donc $u_n = \\dfrac{500}{5}\\left(2 + 3 \\times 0{,}5^n\\right) = 200 + 300 \\times 0{,}5^n$ et $v_n = 100\\left(3 - 3 \\times 0{,}5^n\\right) = 300 - 300 \\times 0{,}5^n$.\n\nComme $0 < 0{,}5 < 1$, $0{,}5^n$ tend vers $0$ : $u_n$ tend vers $200$ et $v_n$ vers $300$. À long terme, environ $40\\,\\%$ des tortues sont dans l'herbier N et $60\\,\\%$ dans l'herbier S."
            }
          ]
        },
        {
          titre: "Taxi ou bus ?",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Chaque jour de classe, Anli va au lycée soit en taxi (T), soit en bus scolaire (B). S'il a pris le taxi un jour, il le reprend le lendemain avec la probabilité $0{,}4$ ; s'il a pris le bus, il reprend le bus le lendemain avec la probabilité $0{,}7$. Le premier jour, numéroté $0$, il prend le bus. On note $\\pi_n = \\begin{pmatrix} t_n & b_n \\end{pmatrix}$ la distribution le jour $n$, les états étant rangés dans l'ordre T, B.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Représente la situation par un graphe probabiliste, puis donne la matrice de transition $P$.",
              indice: "Les flèches qui partent d'un sommet ont pour somme $1$ : n'oublie pas les boucles.",
              corrige: "Du taxi, il passe au bus avec la probabilité $1 - 0{,}4 = 0{,}6$ ; du bus, il passe au taxi avec la probabilité $1 - 0{,}7 = 0{,}3$. Donc $P = \\begin{pmatrix} 0{,}4 & 0{,}6 \\\\ 0{,}3 & 0{,}7 \\end{pmatrix}$, et chaque ligne a pour somme $1$.",
              figureCorrige: () => graphe({ sommets: [["T", 95, 70], ["B", 225, 70]], arcs: [["T", "T", "0,4", Math.PI], ["T", "B", "0,6"], ["B", "T", "0,3"], ["B", "B", "0,7", 0]], h: 140, aria: "Graphe probabiliste à deux sommets T et B : boucle 0,4 sur T, flèche de T vers B 0,6, flèche de B vers T 0,3, boucle 0,7 sur B" })
            },
            {
              n: "2.", points: 1.5,
              texte: "Donne $\\pi_0$, puis calcule $\\pi_1$ et $\\pi_2$. Quelle est la probabilité qu'Anli prenne le taxi le jour $2$ ?",
              indice: "$\\pi_{n+1} = \\pi_nP$ : la distribution est une matrice ligne, à gauche de $P$.",
              corrige: "$\\pi_0 = \\begin{pmatrix} 0 & 1 \\end{pmatrix}$ et $\\pi_1 = \\pi_0P = \\begin{pmatrix} 0{,}3 & 0{,}7 \\end{pmatrix}$.\n\nPuis $t_2 = 0{,}3 \\times 0{,}4 + 0{,}7 \\times 0{,}3 = 0{,}33$ et $b_2 = 0{,}3 \\times 0{,}6 + 0{,}7 \\times 0{,}7 = 0{,}67$ : $\\pi_2 = \\begin{pmatrix} 0{,}33 & 0{,}67 \\end{pmatrix}$. La probabilité qu'il prenne le taxi le jour $2$ est $0{,}33$."
            },
            {
              n: "3.", points: 2,
              texte: "Détermine la distribution invariante de cette chaîne de Markov.",
              indice: "Pose $\\pi = \\begin{pmatrix} x & y \\end{pmatrix}$, écris la première coordonnée de $\\pi P = \\pi$, et utilise $x + y = 1$.",
              corrige: "On cherche $\\pi = \\begin{pmatrix} x & y \\end{pmatrix}$ avec $\\pi P = \\pi$ et $x + y = 1$. La première coordonnée donne $0{,}4x + 0{,}3y = x$, soit $0{,}3y = 0{,}6x$, donc $y = 2x$.\n\nAvec $x + y = 1$ : $3x = 1$, donc $x = \\dfrac{1}{3}$ et $y = \\dfrac{2}{3}$. La distribution invariante est $\\begin{pmatrix} \\dfrac{1}{3} & \\dfrac{2}{3} \\end{pmatrix}$."
            },
            {
              n: "4.", points: 2,
              texte: "Montre que, pour tout $n$, $t_{n+1} = 0{,}1t_n + 0{,}3$. Déduis-en l'expression de $t_n$ en fonction de $n$, puis sa limite.",
              indice: "$t_{n+1} = 0{,}4t_n + 0{,}3b_n$ avec $b_n = 1 - t_n$. Pose ensuite $w_n = t_n - \\dfrac{1}{3}$.",
              corrige: "$\\pi_{n+1} = \\pi_nP$ donne $t_{n+1} = 0{,}4t_n + 0{,}3b_n = 0{,}4t_n + 0{,}3(1 - t_n) = 0{,}1t_n + 0{,}3$.\n\nAvec $w_n = t_n - \\dfrac{1}{3}$ : $w_{n+1} = 0{,}1t_n + 0{,}3 - \\dfrac{1}{3} = 0{,}1\\left(t_n - \\dfrac{1}{3}\\right) = 0{,}1w_n$. La suite $(w_n)$ est géométrique de raison $0{,}1$ et de premier terme $w_0 = -\\dfrac{1}{3}$, donc $t_n = \\dfrac{1}{3} - \\dfrac{1}{3} \\times 0{,}1^n$.\n\nComme $0 < 0{,}1 < 1$, $0{,}1^n$ tend vers $0$ : $t_n$ tend vers $\\dfrac{1}{3}$, la probabilité de la distribution invariante."
            }
          ]
        },
        {
          titre: "Le modèle d'Ehrenfest avec deux molécules",
          duree: 20, points: 6, calculatrice: false,
          contexte: "Deux molécules sont réparties entre deux récipients, à gauche et à droite. À chaque étape, on choisit au hasard l'une des deux molécules, chacune avec la probabilité $0{,}5$, et on la fait changer de récipient. On note $X_n$ le nombre de molécules dans le récipient de gauche après $n$ étapes : il vaut $0$, $1$ ou $2$. Au départ, les deux molécules sont à gauche.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Justifie que, les états étant rangés dans l'ordre $0$, $1$, $2$, la matrice de transition est $P = \\begin{pmatrix} 0 & 1 & 0 \\\\ 0{,}5 & 0 & 0{,}5 \\\\ 0 & 1 & 0 \\end{pmatrix}$.",
              indice: "Avec $0$ molécule à gauche, où est forcément la molécule choisie ?",
              corrige: "Avec $0$ molécule à gauche, la molécule choisie est à droite : elle passe à gauche, et l'état devient $1$ avec la probabilité $1$. Avec $1$ molécule à gauche, on choisit celle de gauche (l'état devient $0$) ou celle de droite (l'état devient $2$), chacune avec la probabilité $0{,}5$. Avec $2$ molécules à gauche, l'état devient $1$ avec la probabilité $1$.",
              figureCorrige: () => graphe({ sommets: [["0", 55, 70], ["1", 160, 70], ["2", 265, 70]], arcs: [["0", "1", "1"], ["1", "0", "0,5"], ["1", "2", "0,5"], ["2", "1", "1"]], h: 140, aria: "Graphe probabiliste à trois sommets 0, 1, 2 : de 0 vers 1 avec 1, de 1 vers 0 et vers 2 avec 0,5 chacun, de 2 vers 1 avec 1" })
            },
            {
              n: "2.", points: 1.5,
              texte: "Avec $\\pi_0 = \\begin{pmatrix} 0 & 0 & 1 \\end{pmatrix}$, calcule $\\pi_1$, $\\pi_2$ et $\\pi_3$.",
              indice: "$\\pi_{n+1} = \\pi_nP$.",
              corrige: "$\\pi_1 = \\pi_0P = \\begin{pmatrix} 0 & 1 & 0 \\end{pmatrix}$, puis $\\pi_2 = \\pi_1P = \\begin{pmatrix} 0{,}5 & 0 & 0{,}5 \\end{pmatrix}$ et $\\pi_3 = \\pi_2P = \\begin{pmatrix} 0 & 1 & 0 \\end{pmatrix}$."
            },
            {
              n: "3.", points: 1.5,
              texte: "Montre que la distribution $\\pi = \\begin{pmatrix} 0{,}25 & 0{,}5 & 0{,}25 \\end{pmatrix}$ est invariante.",
              indice: "Calcule $\\pi P$ coordonnée par coordonnée.",
              corrige: "Première coordonnée de $\\pi P$ : $0{,}5 \\times 0{,}5 = 0{,}25$. Deuxième : $0{,}25 \\times 1 + 0{,}25 \\times 1 = 0{,}5$. Troisième : $0{,}5 \\times 0{,}5 = 0{,}25$. Donc $\\pi P = \\pi$.\n\nOn retrouve la loi binomiale de paramètres $2$ et $0{,}5$ : c'est la répartition obtenue en plaçant chaque molécule au hasard, à gauche ou à droite."
            },
            {
              n: "4.", points: 1.5,
              texte: "La suite des distributions $(\\pi_n)$ converge-t-elle vers $\\pi$ ? Justifie, puis explique ce résultat.",
              indice: "Compare $\\pi_3$ et $\\pi_1$. Que devient la parité de $X_n$ à chaque étape ?",
              corrige: "Non. Comme $\\pi_3 = \\pi_1$, on obtient de proche en proche $\\pi_n = \\begin{pmatrix} 0 & 1 & 0 \\end{pmatrix}$ pour $n$ impair et $\\pi_n = \\begin{pmatrix} 0{,}5 & 0 & 0{,}5 \\end{pmatrix}$ pour $n$ pair non nul : la suite ne converge pas.\n\nEn effet, chaque étape change $X_n$ de $1$ : $X_n$ est pair une étape sur deux. En revanche, la moyenne de deux distributions consécutives est $\\begin{pmatrix} 0{,}25 & 0{,}5 & 0{,}25 \\end{pmatrix}$, la distribution invariante."
            }
          ]
        }
      ]
    }
  };
})();
