/*
  ENTRAÎNEMENT : Première spécialité — chapitre 9, Dérivation 2 : point de vue global
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-derivation-2.
  Format : voir data/premiere/evaluation/second-degre-2.js. Sans calculatrice (épreuve anticipée).
  Programme 2026 : pas de dérivée de x ↦ g(ax + b) ; le signe de f′ et les variations sont au chapitre 10.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-derivation-2"] = {
  revisions: {
    intro: "La fonction dérivée en un coup d'œil : les dérivées usuelles, les opérations et les fonctions qui ne sont pas dérivables partout. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Fonction dérivée",
        texte: "Si $f$ est dérivable en tout réel $x$ d'un intervalle $I$, la fonction $f' : x \\mapsto f'(x)$ est sa **fonction dérivée**. $f'(a)$ est un nombre, la pente de la tangente au point d'abscisse $a$ ; $f'$ est une fonction."
      },
      {
        titre: "Dérivées usuelles",
        texte:
          "- $k$ constante : $0$ ; $mx + p$ : $m$ ;\n" +
          "- $x^2$ : $2x$ ; $x^3$ : $3x^2$ ; $x^n$ : $nx^{n-1}$ ;\n" +
          "- $\\dfrac{1}{x}$ : $-\\dfrac{1}{x^2}$ sur $]-\\infty\\,;0[$ ou $]0\\,;+\\infty[$ ;\n" +
          "- $\\sqrt{x}$ : $\\dfrac{1}{2\\sqrt{x}}$ sur $]0\\,;+\\infty[$."
      },
      {
        titre: "Somme et multiple",
        texte:
          "$(u + v)' = u' + v'$ et $(ku)' = k\\,u'$ : on dérive un polynôme terme à terme.\n\n" +
          "$(5x^3 - 2x^2 + 7x - 1)' = 15x^2 - 4x + 7$."
      },
      {
        titre: "Produit",
        texte:
          "$(uv)' = u'v + uv'$.\n\n" +
          "Ce n'est pas $u'v'$ : la dérivée d'un produit n'est pas le produit des dérivées."
      },
      {
        titre: "Inverse et quotient",
        texte:
          "Si $v$ ne s'annule pas sur $I$ :\n\n" +
          "- $\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$ ;\n" +
          "- $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$, dans cet ordre au numérateur."
      },
      {
        titre: "Pas dérivable partout",
        texte:
          "- $\\sqrt{x}$ est définie en $0$ mais pas dérivable en $0$ : le taux $\\dfrac{1}{\\sqrt{h}}$ devient aussi grand qu'on veut.\n" +
          "- $|x|$ n'est pas dérivable en $0$ : le taux vaut $1$ pour $h > 0$ et $-1$ pour $h < 0$."
      },
      {
        titre: "Notation de la physique",
        texte: "Pour une position $x(t)$ : vitesse $v(t) = x'(t) = \\dfrac{\\mathrm{d}x}{\\mathrm{d}t}$, accélération $a(t) = v'(t)$. Une vitesse nulle correspond à une tangente horizontale de la courbe de la position."
      },
      {
        titre: "Méthode",
        texte: "Avant de dériver, repère la forme : somme, produit $u \\times v$ ou quotient $\\dfrac{u}{v}$. Écris $u$, $v$, $u'$ et $v'$, applique la formule, puis simplifie le numérateur (on garde souvent $v^2$ sous forme de carré)."
      }
    ],
    pieges: [
      "Écrire $(uv)' = u'v'$ : la dérivée d'un produit n'est pas le produit des dérivées.",
      "Inverser l'ordre dans $u'v - uv'$ : on obtient l'opposé du bon résultat.",
      "Oublier $v'$ : la dérivée de $\\dfrac{1}{3x + 2}$ est $-\\dfrac{3}{(3x + 2)^2}$.",
      "Garder la constante : la dérivée de $5$ est $0$.",
      "Écrire $\\left(\\dfrac{1}{x}\\right)' = \\dfrac{1}{x^2}$ : il manque le signe moins.",
      "Utiliser la dérivée de $\\sqrt{x}$ en $0$ : la racine carrée n'y est pas dérivable."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Dériver, puis tracer une tangente",
        duree: 25, points: 7, calculatrice: false,
        contexte:
          "On considère les fonctions suivantes :\n\n" +
          "- $f(x) = x^3 - 3x^2 + 2$, définie sur $\\mathbb{R}$ ;\n" +
          "- $g(x) = (2x - 1)(x^2 + 1)$, définie sur $\\mathbb{R}$ ;\n" +
          "- $h(x) = \\dfrac{3x - 1}{x + 2}$, définie sur $]-2\\,;+\\infty[$ ;\n" +
          "- $k(x) = 4\\sqrt{x}$, définie sur $[0\\,;+\\infty[$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $f'(x)$.",
            indice: "Dérive terme à terme : $(x^3)' = 3x^2$, $(x^2)' = 2x$, et la dérivée d'une constante est nulle.",
            corrige: "$f'(x) = 3x^2 - 3 \\times 2x + 0 = 3x^2 - 6x$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $g'(x)$ avec la formule du produit, puis vérifie en développant d'abord $g(x)$.",
            indice: "$u(x) = 2x - 1$ et $v(x) = x^2 + 1$, donc $u'(x) = 2$ et $v'(x) = 2x$.",
            corrige:
              "$g'(x) = u'v + uv' = 2(x^2 + 1) + (2x - 1) \\times 2x = 2x^2 + 2 + 4x^2 - 2x = 6x^2 - 2x + 2$.\n\n" +
              "Vérification : $g(x) = 2x^3 + 2x - x^2 - 1 = 2x^3 - x^2 + 2x - 1$, donc $g'(x) = 6x^2 - 2x + 2$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule $h'(x)$ pour $x > -2$.",
            indice: "$u(x) = 3x - 1$ et $v(x) = x + 2$ : $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.",
            corrige: "$u'(x) = 3$ et $v'(x) = 1$, donc $h'(x) = \\dfrac{3(x + 2) - (3x - 1) \\times 1}{(x + 2)^2} = \\dfrac{3x + 6 - 3x + 1}{(x + 2)^2} = \\dfrac{7}{(x + 2)^2}$."
          },
          {
            n: "4.", points: 1,
            texte: "Sur quel intervalle $k$ est-elle dérivable ? Calcule $k'(x)$, puis $k'(4)$.",
            indice: "La racine carrée n'est pas dérivable en $0$. $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$.",
            corrige: "$k$ est dérivable sur $]0\\,;+\\infty[$ (pas en $0$), et $k'(x) = 4 \\times \\dfrac{1}{2\\sqrt{x}} = \\dfrac{2}{\\sqrt{x}}$. Donc $k'(4) = \\dfrac{2}{2} = 1$."
          },
          {
            n: "5.", points: 2,
            texte: "Détermine une équation de la tangente à la courbe de $f$ au point d'abscisse $1$. En quels points la courbe de $f$ a-t-elle une tangente horizontale ?",
            indice: "$y = f'(1)(x - 1) + f(1)$. Une tangente horizontale a une pente nulle : résous $f'(x) = 0$.",
            corrige:
              "$f(1) = 1 - 3 + 2 = 0$ et $f'(1) = 3 - 6 = -3$ : la tangente a pour équation $y = -3(x - 1) + 0$, soit $y = -3x + 3$.\n\n" +
              "$f'(x) = 3x^2 - 6x = 3x(x - 2) = 0 \\iff x = 0$ ou $x = 2$. Les tangentes sont horizontales aux points $(0\\,;2)$ et $(2\\,;-2)$, car $f(0) = 2$ et $f(2) = 8 - 12 + 2 = -2$."
          }
        ]
      },
      {
        titre: "Le vol d'un drone",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Un drone filme le lagon. Pendant les $6$ premières secondes, son altitude, en mètres, est $z(t) = -t^3 + 6t^2$, où $t \\in [0\\,;6]$ est le temps en secondes. Sa vitesse verticale est $v(t) = z'(t) = \\dfrac{\\mathrm{d}z}{\\mathrm{d}t}$, en m/s.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule l'altitude du drone au bout de $2$ s, puis de $4$ s.",
            indice: "Remplace $t$ par $2$, puis par $4$ : $2^3 = 8$ et $4^3 = 64$.",
            corrige: "$z(2) = -8 + 24 = 16$ m et $z(4) = -64 + 96 = 32$ m."
          },
          {
            n: "2.", points: 1.5,
            texte: "Exprime $v(t)$ en fonction de $t$, puis calcule la vitesse au bout de $1$ s.",
            indice: "Dérive terme à terme : $(t^3)' = 3t^2$ et $(t^2)' = 2t$.",
            corrige: "$v(t) = z'(t) = -3t^2 + 12t$, donc $v(1) = -3 + 12 = 9$ m/s : au bout de $1$ s, le drone monte à $9$ m/s."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule $v(4)$ et interprète. Que se passe-t-il au bout de $6$ s ?",
            indice: "Une vitesse nulle correspond à une tangente horizontale. Calcule aussi $z(6)$.",
            corrige:
              "$v(4) = -48 + 48 = 0$ : au bout de $4$ s, le drone cesse de monter. Il est alors à $32$ m, et la tangente à la courbe de $z$ est horizontale.\n\n" +
              "$z(6) = -216 + 216 = 0$ : au bout de $6$ s, le drone est revenu au sol."
          },
          {
            n: "4.", points: 1.5,
            texte: "L'accélération est $a(t) = v'(t)$. Calcule $a(t)$, puis $a(2)$. On admet que la vitesse est la plus grande quand l'accélération est nulle : quelle est la vitesse maximale du drone ?",
            indice: "Dérive $v(t) = -3t^2 + 12t$, puis résous $a(t) = 0$.",
            corrige: "$a(t) = v'(t) = -6t + 12$, donc $a(2) = 0$. La vitesse maximale est atteinte à $t = 2$ s : $v(2) = -12 + 24 = 12$ m/s."
          },
          {
            n: "5.", points: 1.5,
            texte: "Calcule la vitesse moyenne du drone entre $0$ et $4$ s et compare-la avec $v(2)$.",
            indice: "Vitesse moyenne : $\\dfrac{z(4) - z(0)}{4 - 0}$.",
            corrige: "$\\dfrac{z(4) - z(0)}{4 - 0} = \\dfrac{32 - 0}{4} = 8$ m/s. C'est moins que la vitesse instantanée maximale $v(2) = 12$ m/s : le drone accélère puis ralentit."
          }
        ]
      },
      {
        titre: "Vrai ou faux ?",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Pour chaque affirmation, dis si elle est vraie ou fausse, puis justifie. Une réponse sans justification ne rapporte aucun point.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "La fonction racine carrée est dérivable en $0$.",
            indice: "Calcule le taux $\\dfrac{\\sqrt{0 + h} - \\sqrt{0}}{h}$ pour $h > 0$.",
            corrige: "**Faux.** Pour $h > 0$, le taux vaut $\\dfrac{\\sqrt{h}}{h} = \\dfrac{1}{\\sqrt{h}}$. Quand $h$ se rapproche de $0$, il devient aussi grand qu'on veut ($100$ pour $h = 0{,}0001$) : il ne se rapproche d'aucun nombre réel."
          },
          {
            n: "2.", points: 1.5,
            texte: "Pour $f(x) = |x|$, le taux de variation de $f$ entre $0$ et $h$ vaut $1$ pour tout $h \\neq 0$.",
            indice: "Disjonction des cas : $h > 0$, puis $h < 0$.",
            corrige: "**Faux.** Le taux vaut $\\dfrac{|h|}{h}$ : $1$ si $h > 0$, mais $\\dfrac{-h}{h} = -1$ si $h < 0$. Par exemple, pour $h = -1$, il vaut $-1$. C'est pourquoi $|x|$ n'est pas dérivable en $0$."
          },
          {
            n: "3.", points: 1.5,
            texte: "La dérivée de $x \\mapsto (x^2 + 1)(x - 1)$ est $x \\mapsto 2x$.",
            indice: "La dérivée d'un produit n'est pas le produit des dérivées : $(uv)' = u'v + uv'$.",
            corrige: "**Faux.** $2x \\times 1 = 2x$ est le produit des dérivées, qui n'est pas la bonne formule. Avec $(uv)' = u'v + uv'$ : $2x(x - 1) + (x^2 + 1) \\times 1 = 3x^2 - 2x + 1$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Sur $\\left]-\\dfrac{2}{3}\\,;+\\infty\\right[$, la dérivée de $x \\mapsto \\dfrac{1}{3x + 2}$ est $x \\mapsto -\\dfrac{3}{(3x + 2)^2}$.",
            indice: "$\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$ avec $v(x) = 3x + 2$, qui ne s'annule pas sur cet intervalle.",
            corrige: "**Vrai.** $v(x) = 3x + 2$ ne s'annule pas sur l'intervalle et $v'(x) = 3$, donc la dérivée est $-\\dfrac{v'(x)}{v(x)^2} = -\\dfrac{3}{(3x + 2)^2}$."
          }
        ]
      }
    ]
  }
};
