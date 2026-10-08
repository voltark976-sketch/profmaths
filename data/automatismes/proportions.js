/*
  AUTOMATISMES · PROPORTIONS ET POURCENTAGES (PP01 à PP03)
  --------------------------------------------------------
  PP01 à PP03 : liste des automatismes de Seconde (programme 2026), à entretenir en Première.
  Proportion de proportion : au programme de Seconde, mais pas dans la liste des automatismes.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["auto-proportions"] = {
  niveau: "Automatismes",
  numero: null,
  periode: "Seconde et Première",
  titre: "Proportions et pourcentages",
  accroche: "Calculer une proportion, l'écrire de plusieurs façons, retrouver une partie ou le tout : la base de toute l'information chiffrée.",

  playlist: "",
  drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv",
  pdfs: [
    { titre: "Dossier élève de Seconde (partie P5)", url: "https://drive.google.com/file/d/1vr9e5N38rAOQLWIvUR5suK6l6ciyoLNY/view" }
  ],

  cours: [
    {
      titre: "Calculer une proportion (PP01)",
      texte:
        "- La proportion d'une partie $A$ dans un ensemble $E$ est $p = \\dfrac{n_A}{n_E}$ (effectif de la partie ÷ effectif total).\n" +
        "- C'est toujours un nombre entre $0$ et $1$, qu'on exprime souvent en pourcentage : $p = 0{,}35 = 35\\,\\%$.\n" +
        "- On divise toujours par l'effectif de l'ensemble **de référence** : « parmi les filles » veut dire qu'on divise par le nombre de filles.",
      video: { titre: "Vidéo d'Yvan Monka : passer d'un effectif à une proportion", youtube: "https://youtu.be/r8S46rk9x9k" },
      exemple: {
        enonce: "Dans un lycée de $1\\,250$ élèves, $450$ sont en Seconde. Quelle proportion cela représente-t-il ?",
        solution: "$p = \\dfrac{450}{1\\,250} = 0{,}36 = 36\\,\\%$."
      }
    },
    {
      titre: "Trois écritures d'une proportion (PP02)",
      video: { titre: "Vidéo d'Yvan Monka : le cours sur les pourcentages", youtube: "https://youtu.be/Y_gDKPidUQ0" },
      texte:
        "- Une proportion peut s'écrire sous forme de **fraction**, de **nombre décimal** ou de **pourcentage** : $\\dfrac{3}{20} = 0{,}15 = 15\\,\\%$.\n" +
        "- « $3$ élèves sur $20$ », « $15$ sur $100$ » et « $0{,}15$ » disent la même chose.\n" +
        "- Pour comparer deux proportions, on les écrit de la même façon (par exemple toutes en pourcentage).",
      exemple: {
        enonce: "Dans la classe A, $9$ élèves sur $25$ font du football. Dans la classe B, $11$ sur $30$. Quelle classe a la plus forte proportion ?",
        solution: "$\\dfrac{9}{25} = 0{,}36$ et $\\dfrac{11}{30} \\approx 0{,}367$. La proportion est un peu plus forte dans la classe B."
      }
    },
    {
      titre: "Retrouver une partie ou le tout (PP03)",
      video: { titre: "Vidéo d'Yvan Monka : QCM sur les pourcentages", youtube: "https://youtu.be/J-6tiyxTd3o" },
      texte:
        "- **Partie** : $n_A = p \\times n_E$. Prendre $30\\,\\%$ de $250$, c'est calculer $0{,}3 \\times 250 = 75$.\n" +
        "- **Tout** : $n_E = \\dfrac{n_A}{p}$. Si $75$ personnes représentent $30\\,\\%$ du total, il y en a $\\dfrac{75}{0{,}3} = 250$.\n" +
        "- Calcul mental : $10\\,\\%$ c'est diviser par $10$, $25\\,\\%$ c'est diviser par $4$, $50\\,\\%$ c'est diviser par $2$.",
      exemple: {
        enonce: "$40\\,\\%$ des $350$ élèves de Seconde déjeunent à la cantine. Combien sont-ils ?",
        solution: "$0{,}4 \\times 350 = 140$ élèves."
      }
    },
    {
      titre: "Proportion de proportion",
      texte:
        "- Si $A$ est une partie de $B$, et $B$ une partie de $E$, alors $p_{A/E} = p_{A/B} \\times p_{B/E}$.\n" +
        "- On **multiplie** les proportions, on ne les additionne pas.",
      video: { titre: "Vidéo d'Yvan Monka : calculer un pourcentage de pourcentage", youtube: "https://youtu.be/nPPRsOW2veU" },
      exemple: {
        enonce: "$60\\,\\%$ des élèves d'un lycée sont des filles, et $25\\,\\%$ des filles font du handball. Quel pourcentage des élèves sont des filles qui font du handball ?",
        solution: "$0{,}6 \\times 0{,}25 = 0{,}15$, soit $15\\,\\%$ des élèves."
      }
    }
  ],

  videos: [],

  exercices: [
    { type: "proportion-pourcentage", titre: "PP01 · Calculer une proportion", etape: "Programme de Seconde", nb: 5 },
    { type: "partie-tout", titre: "PP03 · Retrouver la partie ou le tout", etape: "Programme de Seconde", nb: 6 },
    { type: "am-ecritures", titre: "PP02 · Fraction, décimal, pourcentage", etape: "Programme de Seconde", nb: 6 },
    { type: "proportion-de-proportion", titre: "Proportion de proportion", etape: "Pour aller plus loin (hors liste des automatismes)", nb: 4 },
    { type: "am-flash-pp", titre: "Flash : proportions mélangées", etape: "Défi", nb: 8 }
  ],

  qcm: [
    { question: "PP01 · Sur $80$ élèves, $28$ sont externes. La proportion d'externes est :", choix: ["$28\\,\\%$", "$35\\,\\%$", "$52\\,\\%$", "$2{,}8\\,\\%$"], bonne: 1, explication: "$\\dfrac{28}{80} = 0{,}35 = 35\\,\\%$." },
    { question: "PP01 · Une proportion peut-elle valoir $1{,}2$ ?", choix: ["Oui", "Non"], bonne: 1, explication: "Une proportion est entre $0$ et $1$ : la partie ne peut pas être plus grande que le tout." },
    { question: "PP02 · $\\dfrac{3}{25}$ est égal à :", choix: ["$3\\,\\%$", "$12\\,\\%$", "$0{,}325$", "$25\\,\\%$"], bonne: 1, explication: "$\\dfrac{3}{25} = \\dfrac{12}{100} = 12\\,\\%$." },
    { question: "PP02 · $0{,}4$ s'écrit aussi :", choix: ["$\\dfrac{2}{5}$", "$\\dfrac{1}{4}$", "$4\\,\\%$", "$\\dfrac{4}{100}$"], bonne: 0, explication: "$0{,}4 = \\dfrac{4}{10} = \\dfrac{2}{5} = 40\\,\\%$." },
    { question: "PP03 · $15\\,\\%$ de $240$ €, c'est :", choix: ["$16$ €", "$36$ €", "$24$ €", "$225$ €"], bonne: 1, explication: "$0{,}15 \\times 240 = 36$ €." },
    { question: "PP03 · $18$ élèves représentent $45\\,\\%$ d'une classe. Combien d'élèves y a-t-il ?", choix: ["$40$", "$8{,}1$", "$63$", "$81$"], bonne: 0, explication: "$\\dfrac{18}{0{,}45} = 40$ élèves." },
    { question: "PP03 · $25\\,\\%$ de $68$ :", choix: ["$17$", "$25$", "$43$", "$34$"], bonne: 0, explication: "$25\\,\\%$, c'est un quart : $68 \\div 4 = 17$." },
    { question: "$50\\,\\%$ des élèves font du sport, dont $20\\,\\%$ du basket. Quel pourcentage des élèves fait du basket ?", choix: ["$70\\,\\%$", "$10\\,\\%$", "$30\\,\\%$", "$20\\,\\%$"], bonne: 1, explication: "$0{,}5 \\times 0{,}2 = 0{,}1 = 10\\,\\%$ : on multiplie." },
    { question: "Dans le groupe A, $12$ élèves sur $40$ ont la moyenne ; dans le groupe B, $9$ sur $25$. Quel groupe a la plus forte proportion ?", choix: ["Le groupe A", "Le groupe B", "La même"], bonne: 1, explication: "$\\dfrac{12}{40} = 30\\,\\%$ et $\\dfrac{9}{25} = 36\\,\\%$." },
    { question: "PP01 · « Parmi les filles, la proportion de demi-pensionnaires » : on divise par…", choix: ["le nombre total d'élèves", "le nombre de filles", "le nombre de demi-pensionnaires"], bonne: 1, explication: "« Parmi les filles » : l'ensemble de référence, c'est les filles." },
    { question: "PP01 · Sur $60$ élèves, $15$ viennent au lycée en barge. La proportion est :", choix: ["$25\\,\\%$", "$15\\,\\%$", "$4\\,\\%$", "$45\\,\\%$"], bonne: 0, explication: "$\\dfrac{15}{60} = \\dfrac{1}{4} = 0{,}25 = 25\\,\\%$." },
    { question: "PP01 · Dans un lycée de $1\\,500$ élèves, $600$ sont en Seconde. La proportion d'élèves de Seconde est :", choix: ["$0{,}4$", "$0{,}6$", "$2{,}5$", "$0{,}04$"], bonne: 0, explication: "$\\dfrac{600}{1\\,500} = \\dfrac{6}{15} = 0{,}4$. Une proportion est toujours entre $0$ et $1$." },
    { question: "PP01 · « $20\\,\\%$ des internes sont en Seconde. » L'ensemble de référence est :", choix: ["les internes", "les élèves de Seconde", "tous les élèves du lycée", "les internes de Seconde"], bonne: 0, explication: "« $20\\,\\%$ des internes » : on prend $20\\,\\%$ du nombre d'internes, c'est par lui qu'on divise." },
    { question: "PP01 · Vrai ou faux : « les $\\dfrac{3}{4}$ des élèves » et « $75\\,\\%$ des élèves », c'est la même chose.", choix: ["Vrai", "Faux"], bonne: 0, explication: "$\\dfrac{3}{4} = \\dfrac{75}{100} = 75\\,\\%$ : ce sont deux écritures de la même proportion." },
    { question: "PP02 · $\\dfrac{7}{10}$ s'écrit aussi :", choix: ["$70\\,\\%$", "$7\\,\\%$", "$0{,}07$", "$\\dfrac{10}{7}$"], bonne: 0, explication: "$\\dfrac{7}{10} = 0{,}7 = \\dfrac{70}{100} = 70\\,\\%$." },
    { question: "PP02 · $5\\,\\%$ s'écrit en nombre décimal :", choix: ["$0{,}05$", "$0{,}5$", "$5$", "$0{,}005$"], bonne: 0, explication: "$5\\,\\% = \\dfrac{5}{100} = 0{,}05$. ($0{,}5$, c'est $50\\,\\%$.)" },
    { question: "PP02 · $\\dfrac{1}{8}$ s'écrit en pourcentage :", choix: ["$12{,}5\\,\\%$", "$8\\,\\%$", "$18\\,\\%$", "$0{,}125\\,\\%$"], bonne: 0, explication: "$\\dfrac{1}{8} = 0{,}125 = 12{,}5\\,\\%$ (c'est la moitié de $\\dfrac{1}{4} = 25\\,\\%$)." },
    { question: "PP02 · Quelle est la plus grande de ces proportions ?", choix: ["$\\dfrac{2}{5}$", "$35\\,\\%$", "$0{,}38$", "$\\dfrac{3}{10}$"], bonne: 0, explication: "On les écrit toutes en décimal : $\\dfrac{2}{5} = 0{,}4$, $35\\,\\% = 0{,}35$, $0{,}38$ et $\\dfrac{3}{10} = 0{,}3$." },
    { question: "PP03 · $10\\,\\%$ de $450$, c'est :", choix: ["$45$", "$4{,}5$", "$440$", "$460$"], bonne: 0, explication: "$10\\,\\%$, c'est diviser par $10$ : $450 \\div 10 = 45$." },
    { question: "PP03 · $75\\,\\%$ de $80$, c'est :", choix: ["$60$", "$75$", "$20$", "$6$"], bonne: 0, explication: "$75\\,\\% = 50\\,\\% + 25\\,\\%$ : $40 + 20 = 60$. ($20$, c'est $25\\,\\%$.)" },
    { question: "PP03 · $20\\,\\%$ de $35$ €, c'est :", choix: ["$7$ €", "$15$ €", "$28$ €", "$3{,}50$ €"], bonne: 0, explication: "$20\\,\\%$, c'est un cinquième : $35 \\div 5 = 7$ €. ($28$ € est le prix après une remise de $20\\,\\%$.)" },
    { question: "PP03 · $30$ personnes représentent $20\\,\\%$ d'un groupe. Le groupe compte :", choix: ["$150$ personnes", "$6$ personnes", "$600$ personnes", "$36$ personnes"], bonne: 0, explication: "On cherche le tout : $\\dfrac{30}{0{,}2} = 150$. Contrôle : $20\\,\\%$ de $150$, c'est bien $30$." },
    { question: "PP03 · $12$ élèves, soit les $\\dfrac{3}{8}$ de la classe, sont internes. La classe compte :", choix: ["$32$ élèves", "$4{,}5$ élèves", "$36$ élèves", "$24$ élèves"], bonne: 0, explication: "Tout $= \\dfrac{\\text{partie}}{p} = 12 \\div \\dfrac{3}{8} = 12 \\times \\dfrac{8}{3} = 32$. ($4{,}5 = \\dfrac{3}{8} \\times 12$ : on a pris une partie de la partie.)" },
    { question: "$40\\,\\%$ des élèves sont internes et, parmi eux, $50\\,\\%$ sont des filles. Quelle part des élèves sont des filles internes ?", choix: ["$20\\,\\%$", "$90\\,\\%$", "$45\\,\\%$", "$10\\,\\%$"], bonne: 0, explication: "Proportion de proportion : $0{,}4 \\times 0{,}5 = 0{,}2 = 20\\,\\%$. On multiplie, on n'additionne pas." }
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
    "Pourcentage de pourcentage : on **multiplie**, on n'additionne pas.",
    "Une proportion n'est jamais supérieure à $1$ (ou à $100\\,\\%$)."
  ]
};
