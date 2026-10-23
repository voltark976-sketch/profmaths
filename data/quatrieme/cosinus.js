/*
  CHAPITRE : 4e — Cosinus d'un angle
  -----------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : dans un triangle rectangle,
  connaitre et utiliser le cosinus d'un angle aigu pour calculer une longueur ou un angle (sinus et tangente en
  3e). Règles du site : « arrondi au dixième » ou « au degré » n'accepte que le bon arrondi ; une réponse en
  fraction est annoncée dans la consigne.
  Figures : "cs4-triangle", "cs4-cours-…", "cs4-qcm-…" (assets/exercices-quatrieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["quatrieme-cosinus"] = {
  niveau: "4e",
  numero: 11,
  titre: "Cosinus d'un angle",
  accroche: "Dans un triangle rectangle, le cosinus relie un angle aigu à deux côtés : calculer une longueur ou retrouver un angle avec la calculatrice.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : cosinus (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Cosinus.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : le cosinus (Yvan Monka)", url: "https://youtu.be/hDpEeP9wdUs", type: "video" },
    { titre: "Calculer une longueur à l'aide du cosinus (2) (Yvan Monka)", url: "https://youtu.be/-PcXawgWoFg", type: "video" },
    { titre: "Résoudre un problème à l'aide du cosinus (Yvan Monka)", url: "https://youtu.be/Ny5M8Xlitjk", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Définition",
      video: { titre: "Vidéo d'Yvan Monka : le cours sur le cosinus", youtube: "https://youtu.be/hDpEeP9wdUs" },
      texte:
        "Dans un triangle **rectangle**, pour un angle aigu :\n\n" +
        "- l'**hypoténuse** est le côté opposé à l'angle droit ;\n" +
        "- le **côté adjacent** est le côté de l'angle qui n'est pas l'hypoténuse.\n\n" +
        "$\\cos(\\text{angle}) = \\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$. Le cosinus d'un angle aigu est compris entre $0$ et $1$ ; il ne dépend que de l'angle.",
      figure: "cs4-triangle",
      exemple: {
        enonce: "$ABC$ est rectangle en $A$. Écris $\\cos \\widehat{ABC}$ et $\\cos \\widehat{ACB}$.",
        solution: "$\\cos \\widehat{ABC} = \\dfrac{AB}{BC}$ et $\\cos \\widehat{ACB} = \\dfrac{AC}{BC}$."
      }
    },
    {
      titre: "Calculer une longueur",
      video: { titre: "Vidéo d'Yvan Monka : calculer une longueur à l'aide du cosinus", youtube: "https://youtu.be/8MQ0ecvoSOc" },
      texte:
        "On écrit le cosinus de l'angle connu, on remplace les longueurs connues, puis on fait un produit en croix. La calculatrice doit être en mode **degrés**.\n\n" +
        "- Côté adjacent : $\\text{adjacent} = \\text{hypoténuse} \\times \\cos(\\text{angle})$.\n" +
        "- Hypoténuse : $\\text{hypoténuse} = \\dfrac{\\text{adjacent}}{\\cos(\\text{angle})}$.",
      figure: "cs4-cours-longueur",
      exemple: {
        enonce: "$ABC$ est rectangle en $A$, $BC = 8$ cm et $\\widehat{ABC} = 35^\\circ$. Calcule $AB$ au dixième.",
        solution: "$\\cos 35^\\circ = \\dfrac{AB}{8}$, donc $AB = 8 \\times \\cos 35^\\circ \\approx 6{,}6$ cm."
      }
    },
    {
      titre: "Calculer un angle",
      video: { titre: "Vidéo d'Yvan Monka : calculer un angle à l'aide du cosinus", youtube: "https://youtu.be/EQk7WyojUgY" },
      texte:
        "Si on connaît le côté adjacent et l'hypoténuse, on calcule le cosinus, puis on retrouve l'angle avec la touche $\\cos^{-1}$ (ou Arccos, ou Acs) de la calculatrice.\n\n" +
        "$\\cos \\widehat{B} = \\dfrac{3}{5} = 0{,}6$, donc $\\widehat{B} = \\cos^{-1}(0{,}6) \\approx 53^\\circ$.\n\n" +
        "Le cosinus ne dépend que de l'angle : plus l'angle aigu est grand, plus son cosinus est petit ($\\cos 0^\\circ = 1$, $\\cos 60^\\circ = 0{,}5$).",
      figure: "cs4-cours-angle",
      exemple: {
        enonce: "$ABC$ est rectangle en $A$ avec $AB = 4$ cm et $BC = 7$ cm. Calcule $\\widehat{ABC}$ au degré.",
        solution: "$\\cos \\widehat{ABC} = \\dfrac{4}{7}$, donc $\\widehat{ABC} = \\cos^{-1}\\left(\\dfrac{4}{7}\\right) \\approx 55^\\circ$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "cs4-rapport", titre: "Écrire et calculer un cosinus", etape: "Définition", nb: 5 },
    { type: "cs4-longueur", titre: "Calculer une longueur", etape: "Calculer", nb: 6 },
    { type: "cs4-angle", titre: "Calculer un angle", etape: "Calculer", nb: 6 },
    { type: "cs4-problemes", titre: "Problèmes", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Le cosinus d'un angle aigu d'un triangle rectangle est :", choix: ["$\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$", "$\\dfrac{\\text{opposé}}{\\text{hypoténuse}}$", "$\\dfrac{\\text{hypoténuse}}{\\text{adjacent}}$", "$\\dfrac{\\text{opposé}}{\\text{adjacent}}$"], bonne: 0, explication: "C'est la définition." },
    { question: "$ABC$ rectangle en $A$ : $\\cos \\widehat{ABC} =$ :", choix: ["$\\dfrac{AB}{BC}$", "$\\dfrac{AC}{BC}$", "$\\dfrac{BC}{AB}$", "$\\dfrac{AB}{AC}$"], bonne: 0, explication: "$[AB]$ est adjacent à l'angle en $B$, $[BC]$ est l'hypoténuse." },
    { question: "Le cosinus d'un angle aigu est toujours :", choix: ["entre $0$ et $1$", "plus grand que $1$", "négatif", "égal à l'angle"], bonne: 0, explication: "L'adjacent est plus court que l'hypoténuse." },
    { question: "Avec adjacent $3$ et hypoténuse $5$, le cosinus vaut :", choix: ["$0{,}6$", "$\\dfrac{5}{3}$", "$0{,}8$", "$15$"], bonne: 0, explication: "$3 \\div 5$." },
    { question: "Pour calculer un angle connaissant son cosinus, on utilise :", choix: ["la touche $\\cos^{-1}$", "la touche $\\cos$", "la touche $\\sqrt{\\;}$", "le rapporteur uniquement"], bonne: 0, explication: "$\\cos^{-1}$ donne l'angle." },
    { question: "La calculatrice doit être réglée en :", choix: ["degrés", "radians", "grades", "pourcentages"], bonne: 0, explication: "Les angles du collège sont en degrés." },
    { question: "Hypoténuse $10$ et angle $60^\\circ$ ($\\cos 60^\\circ = 0{,}5$) : le côté adjacent mesure :", choix: ["$5$", "$20$", "$0{,}5$", "$10$"], bonne: 0, explication: "$10 \\times 0{,}5$." },
    { question: "Adjacent $4$ et angle $60^\\circ$ : l'hypoténuse mesure :", choix: ["$8$", "$2$", "$4$", "$6$"], bonne: 0, explication: "$4 \\div 0{,}5$." },
    { question: "$\\cos 0^\\circ$ vaut :", choix: ["$1$", "$0$", "$90$", "$0{,}5$"], bonne: 0, explication: "Le côté adjacent se confond avec l'hypoténuse." },
    { question: "Si $\\cos \\widehat{B} = 0{,}5$, alors $\\widehat{B} =$ :", choix: ["$60^\\circ$", "$30^\\circ$", "$45^\\circ$", "$0{,}5^\\circ$"], bonne: 0, explication: "$\\cos^{-1}(0{,}5) = 60^\\circ$." },
    { question: "Sur la figure, le côté adjacent à l'angle marqué est :", figure: "cs4-triangle", choix: ["le côté horizontal", "le côté vertical", "l'hypoténuse", "aucun"], bonne: 0, explication: "C'est le côté de l'angle autre que l'hypoténuse." },
    { question: "Plus un angle aigu est grand, plus son cosinus est :", choix: ["petit", "grand", "égal à $1$", "négatif"], bonne: 0, explication: "Il passe de $1$ (à $0^\\circ$) à $0$ (à $90^\\circ$)." },
    { question: "Une échelle de $5$ m a son pied à $2{,}5$ m du mur. L'angle avec le sol mesure :", choix: ["$60^\\circ$", "$30^\\circ$", "$45^\\circ$", "$50^\\circ$"], bonne: 0, explication: "$\\cos \\alpha = 0{,}5$." },
    { question: "On peut utiliser le cosinus dans :", choix: ["un triangle rectangle", "n'importe quel triangle", "un carré seulement", "un cercle"], bonne: 0, explication: "La définition demande un angle droit." },
    { question: "Sur la figure, $RST$ est rectangle en $R$ et l'angle marqué est $\\widehat{RTS}$. On a $\\cos \\widehat{RTS} =$ :", figure: "cs4-qcm-p2", choix: ["$\\dfrac{RT}{ST}$", "$\\dfrac{RS}{ST}$", "$\\dfrac{ST}{RT}$", "$\\dfrac{RT}{RS}$"], bonne: 0, explication: "Le côté adjacent à l'angle en $T$ est $[RT]$ (ici vertical) et l'hypoténuse est $[ST]$. Le côté adjacent n'est pas toujours horizontal !" },
    { question: "Sur la figure, $AC = 8$ cm et l'angle marqué mesure $35^\\circ$. Alors $AB$ est égal à :", figure: "cs4-cours-longueur", choix: ["$8 \\times \\cos 35^\\circ$", "$\\dfrac{8}{\\cos 35^\\circ}$", "$\\dfrac{\\cos 35^\\circ}{8}$", "$8 + \\cos 35^\\circ$"], bonne: 0, explication: "$\\cos 35^\\circ = \\dfrac{AB}{8}$, donc $AB = 8 \\times \\cos 35^\\circ \\approx 6{,}6$ cm." },
    { question: "Sur la figure, $AB = 4$ cm et $BC = 7$ cm. L'angle marqué vérifie :", figure: "cs4-cours-angle", choix: ["$\\cos \\widehat{ABC} = \\dfrac{4}{7}$", "$\\cos \\widehat{ABC} = \\dfrac{7}{4}$", "$\\widehat{ABC} = \\dfrac{4}{7}$", "$\\cos \\widehat{ABC} = 4 \\times 7$"], bonne: 0, explication: "Côté adjacent sur hypoténuse : $\\dfrac{4}{7}$. Puis $\\widehat{ABC} = \\cos^{-1}\\left(\\dfrac{4}{7}\\right) \\approx 55^\\circ$." },
    { question: "$\\cos 90^\\circ$ vaut :", choix: ["$0$", "$1$", "$90$", "$-1$"], bonne: 0, explication: "Quand l'angle s'approche de $90^\\circ$, le côté adjacent devient très petit : le cosinus tend vers $0$." },
    { question: "La calculatrice affiche $\\cos 60^\\circ = -0{,}952$. Que se passe-t-il ?", choix: ["Elle est réglée en radians", "Le résultat est juste", "L'angle est obtus", "On a utilisé $\\cos^{-1}$"], bonne: 0, explication: "Le cosinus d'un angle aigu est entre $0$ et $1$ : la calculatrice n'est pas en mode degrés ($\\cos 60^\\circ = 0{,}5$)." },
    { question: "Une rampe de $5$ m de long couvre $4$ m à l'horizontale. Le cosinus de l'angle avec l'horizontale vaut :", choix: ["$0{,}8$", "$1{,}25$", "$0{,}2$", "$20$"], bonne: 0, explication: "$\\cos \\alpha = \\dfrac{4}{5} = 0{,}8$ (adjacent sur hypoténuse)." },
    { question: "Un triangle est rectangle en $A$ avec $\\widehat{ABC} = 30^\\circ$. Alors $\\widehat{ACB}$ mesure :", choix: ["$60^\\circ$", "$30^\\circ$", "$90^\\circ$", "$150^\\circ$"], bonne: 0, explication: "Les deux angles aigus d'un triangle rectangle ont pour somme $90^\\circ$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer une longueur",
      etapes: [
        "Repère l'angle connu, l'hypoténuse et le côté adjacent.",
        "Écris $\\cos(\\text{angle}) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$ et remplace.",
        "Produit en croix, calculatrice en degrés, puis arrondis."
      ],
      figure: "cs4-cours-longueur",
      exemple: "$\\cos 40^\\circ = \\dfrac{AB}{6}$ : $AB = 6 \\cos 40^\\circ \\approx 4{,}6$."
    },
    {
      titre: "Calculer un angle",
      etapes: [
        "Calcule $\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.",
        "Applique $\\cos^{-1}$ à ce quotient.",
        "Arrondis au degré demandé."
      ],
      figure: "cs4-cours-angle",
      exemple: "$\\cos \\widehat{B} = \\dfrac{2}{9}$ : $\\widehat{B} \\approx 77^\\circ$."
    }
  ],
  erreurs: [
    "Utiliser le cosinus dans un triangle qui n'est pas rectangle.",
    "Prendre le côté opposé au lieu du côté adjacent.",
    "Multiplier au lieu de diviser pour trouver l'hypoténuse.",
    "Oublier de régler la calculatrice en degrés.",
    "Utiliser $\\cos$ au lieu de $\\cos^{-1}$ pour trouver un angle."
  ]
};
