/*
  AUTOMATISMES · PROPORTIONS ET POURCENTAGES
  ------------------------------------------
  Liste « Proportions et pourcentages » du programme de Seconde 2026, à entretenir en Première :
  calculer, appliquer, exprimer une proportion sous différentes formes ; retrouver une partie ou le tout.
  Proportion de proportion : au programme de Seconde (information chiffrée), mais pas dans la liste des automatismes.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["auto-proportions"] = {
  niveau: "Automatismes",
  numero: null,
  periode: "Seconde et Première",
  titre: "Proportions et pourcentages",
  accroche: "Calculer une proportion, l'écrire de plusieurs façons, retrouver une partie ou le tout : la base de toute l'information chiffrée.",

  playlist: "https://www.youtube.com/playlist?list=PLVTjofGlms14",
  drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv",
  pdfs: [
    { titre: "Dossier élève de Seconde (partie P5)", url: "https://drive.google.com/file/d/1vr9e5N38rAOQLWIvUR5suK6l6ciyoLNY/view" }
  ],

  cours: [
    {
      titre: "Calculer une proportion",
      video: { titre: "Vidéo d'Yvan Monka : la relation entre effectif et proportion", youtube: "https://youtu.be/r8S46rk9x9k" },
      texte:
        "- La proportion d'une partie $A$ dans un ensemble $E$ est $p = \\dfrac{n_A}{n_E}$ : l'effectif de la partie divisé par l'effectif total.\n" +
        "- C'est toujours un nombre entre $0$ et $1$, qu'on exprime souvent en pourcentage. Dans le schéma ci-contre, $450$ élèves de Seconde sur les $1\\,250$ élèves d'un lycée : $p = \\dfrac{450}{1\\,250} = 0{,}36 = 36\\,\\%$.\n" +
        "- On divise toujours par l'effectif de l'ensemble **de référence** : « parmi les filles » veut dire qu'on divise par le nombre de filles.",
      figure: "am-cours-proportion",
      exemple: {
        enonce: "Dans une classe de $32$ élèves de Mamoudzou, $8$ viennent au lycée en taxi. Quelle proportion des élèves cela représente-t-il ?",
        solution: "$p = \\dfrac{8}{32} = \\dfrac{1}{4} = 0{,}25 = 25\\,\\%$."
      }
    },
    {
      titre: "Trois écritures d'une proportion",
      video: { titre: "Vidéo d'Yvan Monka : le cours sur les pourcentages", youtube: "https://youtu.be/Y_gDKPidUQ0" },
      texte:
        "- Une proportion peut s'écrire sous forme de **fraction**, de **nombre décimal** ou de **pourcentage**. Sur le quadrillage ci-contre, $3$ cases sur $20$ sont coloriées : $\\dfrac{3}{20} = \\dfrac{15}{100} = 0{,}15 = 15\\,\\%$.\n" +
        "- « $3$ élèves sur $20$ », « $15$ sur $100$ » et « $0{,}15$ » disent la même chose.\n" +
        "- Pour comparer deux proportions, on les écrit de la même façon (par exemple toutes en pourcentage).",
      figure: "am-cours-ecritures",
      exemple: {
        enonce: "Dans la classe A, $9$ élèves sur $25$ font du football. Dans la classe B, $7$ sur $20$. Quelle classe a la plus forte proportion de footballeurs ?",
        solution: "$\\dfrac{9}{25} = \\dfrac{36}{100} = 36\\,\\%$ et $\\dfrac{7}{20} = \\dfrac{35}{100} = 35\\,\\%$. La proportion est un peu plus forte dans la classe A."
      }
    },
    {
      titre: "Retrouver une partie ou le tout",
      video: { titre: "Vidéo de ton prof : calculer avec des proportions et des évolutions", youtube: "https://youtu.be/WwLJCEUa2t4" },
      texte:
        "- **Partie** : $n_A = p \\times n_E$. Prendre $30\\,\\%$ de $250$, c'est calculer $0{,}3 \\times 250 = 75$.\n" +
        "- **Tout** : $n_E = \\dfrac{n_A}{p}$. Si $75$ personnes représentent $30\\,\\%$ du total, il y en a $\\dfrac{75}{0{,}3} = 250$.\n" +
        "- Calcul mental : $10\\,\\%$ c'est diviser par $10$, $25\\,\\%$ c'est diviser par $4$, $50\\,\\%$ c'est diviser par $2$, $20\\,\\%$ c'est diviser par $5$.\n" +
        "- Contrôle : la partie est plus petite que le tout.",
      figure: "am-cours-partie",
      exemple: {
        enonce: "$40\\,\\%$ des $350$ élèves de Seconde déjeunent à la cantine (schéma ci-contre). Combien sont-ils ?",
        solution: "$0{,}4 \\times 350 = 140$ élèves. De tête : $10\\,\\%$ de $350$, c'est $35$, donc $40\\,\\%$, c'est $4 \\times 35 = 140$."
      }
    },
    {
      titre: "Pour aller plus loin (hors liste des automatismes) : proportion de proportion",
      video: { titre: "Vidéo d'Yvan Monka : calculer des pourcentages de pourcentage", youtube: "https://youtu.be/nPPRsOW2veU" },
      texte:
        "- Cette notion est au programme de Seconde (information chiffrée), mais elle ne fait pas partie de la liste des automatismes.\n" +
        "- Si $A$ est une partie de $B$, et $B$ une partie de $E$, alors $p_{A/E} = p_{A/B} \\times p_{B/E}$ : on **multiplie** les proportions, on ne les additionne pas.",
      exemple: {
        enonce: "$60\\,\\%$ des élèves d'un lycée sont des filles, et $25\\,\\%$ des filles font du handball. Quel pourcentage des élèves sont des filles qui font du handball ?",
        solution: "$0{,}6 \\times 0{,}25 = 0{,}15$, soit $15\\,\\%$ des élèves."
      }
    }
  ],

  videos: [
    { titre: "Exercice 13 · Pourcentages et coefficients multiplicateurs", type: "Pourcentages", youtube: "https://youtu.be/DWf_35WEQuI" },
    { titre: "Exercice 14 · Proportions et évolutions", type: "Proportions", youtube: "https://youtu.be/WwLJCEUa2t4" }
  ],
  videosNote: "Vidéos de ton prof (playlist « Secondes : automatismes ») : les énoncés sont dans le dossier élève ci-dessus.",

  exercices: [
    { type: "am-proportion", titre: "Calculer une proportion", etape: "Automatismes de Seconde", nb: 6 },
    { type: "am-ecritures", titre: "Fraction, décimal, pourcentage", etape: "Automatismes de Seconde", nb: 6 },
    { type: "am-partie-tout", titre: "Retrouver la partie ou le tout", etape: "Automatismes de Seconde", nb: 6 },
    { type: "am-flash-pp", titre: "Flash : proportions mélangées", etape: "Défi", nb: 8 }
  ],

  qcm: [
    { question: "Sur $80$ élèves, $28$ sont externes. La proportion d'externes est :", choix: ["$28\\,\\%$", "$35\\,\\%$", "$52\\,\\%$", "$2{,}8\\,\\%$"], bonne: 1, explication: "$\\dfrac{28}{80} = \\dfrac{7}{20} = 0{,}35 = 35\\,\\%$." },
    { question: "Parmi ces nombres, lequel ne peut pas être une proportion ?", choix: ["$1{,}2$", "$0{,}98$", "$\\dfrac{3}{7}$", "$5\\,\\%$"], bonne: 0, explication: "Une proportion est entre $0$ et $1$ (entre $0\\,\\%$ et $100\\,\\%$) : la partie ne peut pas être plus grande que le tout. $1{,}2 = 120\\,\\%$ est impossible." },
    { question: "$\\dfrac{3}{25}$ est égal à :", choix: ["$3\\,\\%$", "$12\\,\\%$", "$0{,}325$", "$25\\,\\%$"], bonne: 1, explication: "$\\dfrac{3}{25} = \\dfrac{12}{100} = 12\\,\\%$ : on multiplie le numérateur et le dénominateur par $4$." },
    { question: "$0{,}4$ s'écrit aussi :", choix: ["$\\dfrac{2}{5}$", "$\\dfrac{1}{4}$", "$4\\,\\%$", "$\\dfrac{4}{100}$"], bonne: 0, explication: "$0{,}4 = \\dfrac{4}{10} = \\dfrac{2}{5} = 40\\,\\%$." },
    { question: "$15\\,\\%$ de $240$ €, c'est :", choix: ["$16$ €", "$36$ €", "$24$ €", "$225$ €"], bonne: 1, explication: "$10\\,\\%$ de $240$ font $24$, $5\\,\\%$ font $12$ : $24 + 12 = 36$ €." },
    { question: "$18$ élèves représentent $45\\,\\%$ d'une classe. Combien d'élèves y a-t-il ?", choix: ["$40$", "$8{,}1$", "$63$", "$81$"], bonne: 0, explication: "Tout $= \\dfrac{18}{0{,}45} = 40$ élèves. Contrôle : $45\\,\\%$ de $40$, c'est $0{,}45 \\times 40 = 18$." },
    { question: "$25\\,\\%$ de $68$ :", choix: ["$17$", "$25$", "$43$", "$34$"], bonne: 0, explication: "$25\\,\\%$, c'est un quart : $68 \\div 4 = 17$." },
    { question: "Dans le groupe A, $12$ élèves sur $40$ ont la moyenne ; dans le groupe B, $9$ sur $25$. Quel groupe a la plus forte proportion d'élèves ayant la moyenne ?", choix: ["Le groupe B", "Le groupe A", "Les deux groupes ont la même proportion", "On ne peut pas comparer : les effectifs sont différents"], bonne: 0, explication: "$\\dfrac{12}{40} = 30\\,\\%$ et $\\dfrac{9}{25} = 36\\,\\%$. Les proportions servent justement à comparer des groupes d'effectifs différents." },
    { question: "« Parmi les filles, la proportion de demi-pensionnaires » : on divise…", choix: ["par le nombre de filles", "par le nombre total d'élèves", "par le nombre de demi-pensionnaires", "par le nombre de filles demi-pensionnaires"], bonne: 0, explication: "« Parmi les filles » : l'ensemble de référence, c'est les filles. On calcule $\\dfrac{\\text{filles demi-pensionnaires}}{\\text{filles}}$." },
    { question: "Sur $60$ élèves, $15$ viennent au lycée en barge. La proportion est :", choix: ["$25\\,\\%$", "$15\\,\\%$", "$4\\,\\%$", "$45\\,\\%$"], bonne: 0, explication: "$\\dfrac{15}{60} = \\dfrac{1}{4} = 0{,}25 = 25\\,\\%$." },
    { question: "Dans un lycée de $1\\,500$ élèves, $600$ sont en Seconde. La proportion d'élèves de Seconde est :", choix: ["$0{,}4$", "$0{,}6$", "$2{,}5$", "$0{,}04$"], bonne: 0, explication: "$\\dfrac{600}{1\\,500} = \\dfrac{6}{15} = \\dfrac{2}{5} = 0{,}4$. Une proportion est toujours entre $0$ et $1$." },
    { question: "« $20\\,\\%$ des internes sont en Seconde. » L'ensemble de référence est :", choix: ["les internes", "les élèves de Seconde", "tous les élèves du lycée", "les internes de Seconde"], bonne: 0, explication: "« $20\\,\\%$ des internes » : on prend $20\\,\\%$ du nombre d'internes, c'est par lui qu'on divise." },
    { question: "« Les $\\dfrac{3}{4}$ des élèves » désigne autant d'élèves que :", choix: ["$75\\,\\%$ des élèves", "$34\\,\\%$ des élèves", "$43\\,\\%$ des élèves", "$3{,}4\\,\\%$ des élèves"], bonne: 0, explication: "$\\dfrac{3}{4} = \\dfrac{75}{100} = 75\\,\\%$ : ce sont deux écritures de la même proportion." },
    { question: "$\\dfrac{7}{10}$ s'écrit aussi :", choix: ["$70\\,\\%$", "$7\\,\\%$", "$0{,}07$", "$\\dfrac{10}{7}$"], bonne: 0, explication: "$\\dfrac{7}{10} = 0{,}7 = \\dfrac{70}{100} = 70\\,\\%$." },
    { question: "$5\\,\\%$ s'écrit en nombre décimal :", choix: ["$0{,}05$", "$0{,}5$", "$5$", "$0{,}005$"], bonne: 0, explication: "$5\\,\\% = \\dfrac{5}{100} = 0{,}05$. ($0{,}5$, c'est $50\\,\\%$.)" },
    { question: "$\\dfrac{1}{8}$ s'écrit en pourcentage :", choix: ["$12{,}5\\,\\%$", "$8\\,\\%$", "$18\\,\\%$", "$0{,}125\\,\\%$"], bonne: 0, explication: "$\\dfrac{1}{8} = 0{,}125 = 12{,}5\\,\\%$ (c'est la moitié de $\\dfrac{1}{4} = 25\\,\\%$)." },
    { question: "Quelle est la plus grande de ces proportions ?", choix: ["$\\dfrac{2}{5}$", "$35\\,\\%$", "$0{,}38$", "$\\dfrac{3}{10}$"], bonne: 0, explication: "On les écrit toutes en décimal : $\\dfrac{2}{5} = 0{,}4$, $35\\,\\% = 0{,}35$, $0{,}38$ et $\\dfrac{3}{10} = 0{,}3$." },
    { question: "$10\\,\\%$ de $450$, c'est :", choix: ["$45$", "$4{,}5$", "$440$", "$460$"], bonne: 0, explication: "$10\\,\\%$, c'est diviser par $10$ : $450 \\div 10 = 45$." },
    { question: "$75\\,\\%$ de $80$, c'est :", choix: ["$60$", "$75$", "$20$", "$6$"], bonne: 0, explication: "$75\\,\\% = 50\\,\\% + 25\\,\\%$ : $40 + 20 = 60$. ($20$, c'est $25\\,\\%$.)" },
    { question: "$20\\,\\%$ de $35$ €, c'est :", choix: ["$7$ €", "$15$ €", "$28$ €", "$3{,}50$ €"], bonne: 0, explication: "$20\\,\\%$, c'est un cinquième : $35 \\div 5 = 7$ €. ($28$ €, c'est ce qu'il reste après avoir retiré ces $20\\,\\%$.)" },
    { question: "$30$ personnes représentent $20\\,\\%$ d'un groupe. Le groupe compte :", choix: ["$150$ personnes", "$6$ personnes", "$600$ personnes", "$36$ personnes"], bonne: 0, explication: "On cherche le tout : $\\dfrac{30}{0{,}2} = 150$. Contrôle : $20\\,\\%$ de $150$, c'est bien $30$." },
    { question: "$12$ élèves, soit les $\\dfrac{3}{8}$ de la classe, sont internes. La classe compte :", choix: ["$32$ élèves", "$4{,}5$ élèves", "$36$ élèves", "$24$ élèves"], bonne: 0, explication: "Tout $= \\dfrac{\\text{partie}}{p} = 12 \\div \\dfrac{3}{8} = 12 \\times \\dfrac{8}{3} = 32$. ($4{,}5 = \\dfrac{3}{8} \\times 12$ : on a pris une partie de la partie.)" },
    { question: "Quelle proportion du quadrillage ci-contre est coloriée ?", figure: "am-qcm-quadrillage", choix: ["$36\\,\\%$", "$18\\,\\%$", "$32\\,\\%$", "$50\\,\\%$"], bonne: 0, explication: "$18$ cases coloriées sur $50$ : $\\dfrac{18}{50} = \\dfrac{36}{100} = 36\\,\\%$. ($18\\,\\%$ serait juste sur $100$ cases.)" },
    { question: "D'après le schéma, combien y a-t-il d'élèves en tout ?", figure: "am-qcm-tout", choix: ["$60$", "$40$", "$375$", "$3{,}75$"], bonne: 0, explication: "$15$ élèves représentent $25\\,\\%$, c'est-à-dire un quart du total : $15 \\times 4 = 60$ élèves." },
    { question: "La barre représente $45$ kg de manioc partagés en $5$ parts égales. Quelle masse représentent les parts coloriées ?", figure: "am-qcm-parts", choix: ["$18$ kg", "$9$ kg", "$22{,}5$ kg", "$27$ kg"], bonne: 0, explication: "Une part : $45 \\div 5 = 9$ kg. Deux parts : $\\dfrac{2}{5} \\times 45 = 18$ kg. ($27$ kg, c'est la partie non coloriée.)" },
    { question: "À la coopérative de Combani, $24$ des $60$ adhérents produisent de la vanille. Cela représente :", choix: ["$40\\,\\%$ des adhérents", "$24\\,\\%$ des adhérents", "$36\\,\\%$ des adhérents", "$2{,}5\\,\\%$ des adhérents"], bonne: 0, explication: "$\\dfrac{24}{60} = \\dfrac{2}{5} = 0{,}4 = 40\\,\\%$. ($2{,}5$, c'est $\\dfrac{60}{24}$ : le quotient à l'envers.)" }
  ],

  methode: [
    {
      titre: "Partie, tout ou proportion ?",
      etapes: [
        "Repère l'ensemble de référence (le « tout ») et la partie.",
        "Proportion inconnue : $p = \\dfrac{\\text{partie}}{\\text{tout}}$.",
        "Partie inconnue : partie $= p \\times$ tout.",
        "Tout inconnu : tout $= \\dfrac{\\text{partie}}{p}$.",
        "Contrôle : la partie est plus petite que le tout, la proportion entre $0$ et $1$."
      ],
      figure: "am-meth-tout",
      exemple: "$12$ élèves, soit $30\\,\\%$ de la classe : le tout est inconnu, $\\dfrac{12}{0{,}3} = 40$ élèves."
    },
    {
      titre: "Calculer un pourcentage de tête",
      etapes: [
        "$10\\,\\%$ : diviser par $10$. $1\\,\\%$ : diviser par $100$.",
        "$50\\,\\%$ : moitié. $25\\,\\%$ : quart. $20\\,\\%$ : cinquième.",
        "Décomposer : $15\\,\\% = 10\\,\\% + 5\\,\\%$, $75\\,\\% = 50\\,\\% + 25\\,\\%$."
      ],
      exemple: "$15\\,\\%$ de $60$ : $10\\,\\%$ font $6$, $5\\,\\%$ font $3$, total $9$."
    }
  ],
  erreurs: [
    "Une proportion se calcule par rapport au bon ensemble de référence : lis bien « parmi… ».",
    "$5\\,\\% = 0{,}05$ et non $0{,}5$.",
    "Pour retrouver le tout, on **divise** la partie par la proportion.",
    "Une proportion n'est jamais supérieure à $1$ (ou à $100\\,\\%$).",
    "Pour comparer deux proportions, écris-les de la même façon (en pourcentage par exemple)."
  ]
};
