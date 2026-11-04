/*
  CHAPITRE : 6e — Angles et bissectrice
  --------------------------------------
  Programme de mathématiques du cycle 3 (BO n° 16 du 17 avril 2025), en vigueur en 6e depuis la rentrée 2025 :
  « Angles » : connaître et utiliser les angles et le lexique associé (angle droit, plat, plein, nul, aigu, obtus,
  angles opposés par le sommet, adjacents, supplémentaires) ; mesurer un angle ; construire un angle de mesure donnée.
  « Bissectrice d'un angle saillant » : définition, constructions, problèmes.
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js ; un angle se note $\widehat{ABC}$.
  figure : "an6-angle", "an6-rapporteur" ou "an6-secantes" (assets/exercices-college.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["sixieme-angles"] = {
  niveau: "6e",
  numero: 10,
  titre: "Angles et bissectrice",
  accroche: "Nommer, comparer et mesurer des angles au rapporteur, calculer avec des angles adjacents ou opposés, et partager un angle en deux.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : angles (PDF)", url: "https://www.maths-et-tiques.fr/telech/25Angles.pdf" }
  ],
  liens: [
    { titre: "Tout le cours en vidéo (Yvan Monka)", url: "https://youtu.be/ZZeFXFv55fY", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Qu'est-ce qu'un angle ?",
      video: { titre: "Vidéo d'Yvan Monka : noter un angle", youtube: "https://youtu.be/2VLzp0DzsrM" },
      texte:
        "Un **angle** est formé de deux demi-droites de même origine. Cette origine est le **sommet** de l'angle, et les demi-droites sont ses **côtés**.\n\n" +
        "Sur la figure, le sommet est $B$ et les côtés sont $[BA)$ et $[BC)$. L'angle se note $\\widehat{ABC}$ ou $\\widehat{CBA}$ : **le sommet s'écrit au milieu**.\n\n" +
        "La taille d'un angle ne dépend pas de la longueur des côtés dessinés, mais seulement de son **ouverture**.\n\n" +
        "Le savais-tu ? Le mot « angle » vient du grec « agkon », le coude.",
      figure: "an6-angle",
      exemple: {
        enonce: "Comment s'appelle l'angle dont le sommet est $M$ et dont les côtés passent par $N$ et $P$ ?",
        solution: "Le sommet $M$ est au milieu : $\\widehat{NMP}$ (ou $\\widehat{PMN}$)."
      }
    },
    {
      titre: "La nature d'un angle",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître la nature des angles", youtube: "https://youtu.be/9BKbMshCMZc" },
      texte:
        "On mesure les angles en **degrés** (°).\n\n" +
        "- angle **nul** : $0^\\circ$ ;\n" +
        "- angle **aigu** : entre $0^\\circ$ et $90^\\circ$ ;\n" +
        "- angle **droit** : $90^\\circ$ (côtés perpendiculaires, on le code par un petit carré) ;\n" +
        "- angle **obtus** : entre $90^\\circ$ et $180^\\circ$ ;\n" +
        "- angle **plat** : $180^\\circ$ (côtés dans le prolongement l'un de l'autre) ;\n" +
        "- angle **plein** : $360^\\circ$ (un tour complet).\n\n" +
        "Pour estimer sans rapporteur, on compare à un angle droit (le coin d'une feuille).",
      figure: "an6-cours-natures",
      exemple: {
        enonce: "Donne la nature des angles de $35^\\circ$, $90^\\circ$, $135^\\circ$ et $180^\\circ$.",
        solution: "$35^\\circ$ : aigu ; $90^\\circ$ : droit ; $135^\\circ$ : obtus ; $180^\\circ$ : plat."
      }
    },
    {
      titre: "Mesurer un angle au rapporteur",
      video: { titre: "Vidéo d'Yvan Monka : mesurer un angle", youtube: "https://youtu.be/rSeXbu7eEII" },
      texte:
        "Pour mesurer un angle avec le rapporteur :\n\n" +
        "- on place le **centre** du rapporteur sur le **sommet** de l'angle ;\n" +
        "- on aligne un côté avec le **$0$** d'une graduation ;\n" +
        "- on lit, **sur cette même graduation**, le nombre sous l'autre côté.\n\n" +
        "Le rapporteur a deux graduations qui vont en sens contraires. Pour ne pas se tromper, on regarde d'abord si l'angle est **aigu ou obtus**.\n\n" +
        "Sur la figure, le côté $[OA)$ est sur le $0$ de la graduation extérieure : l'angle $\\widehat{AOB}$ mesure $50^\\circ$, et non $130^\\circ$.",
      figure: "an6-rapporteur",
      exemple: {
        enonce: "Ali lit $130^\\circ$ pour un angle aigu. Quelle erreur a-t-il faite ?",
        solution: "Un angle aigu mesure moins de $90^\\circ$ : Ali a lu la mauvaise graduation. La bonne mesure est $180 - 130 = 50^\\circ$."
      }
    },
    {
      titre: "Construire un angle de mesure donnée",
      video: { titre: "Vidéo d'Yvan Monka : construire un angle", youtube: "https://youtu.be/BHm8ixTi5cc" },
      texte:
        "Pour construire l'angle $\\widehat{xOy}$ de $70^\\circ$ :\n\n" +
        "- on trace un premier côté $[Ox)$ ;\n" +
        "- on place le centre du rapporteur en $O$, et le $0$ d'une graduation sur $[Ox)$ ;\n" +
        "- on fait un petit repère en face de $70$ sur cette graduation ;\n" +
        "- on trace le second côté, de $O$ jusqu'au repère, et on code l'angle.",
      figure: "an6-cours-construire",
      exemple: {
        enonce: "Pour construire un angle de $140^\\circ$, sur quelle graduation lit-on ?",
        solution: "Sur celle dont le $0$ est sur le premier côté tracé. L'angle doit être obtus : on vérifie que le second côté est « au-delà » de l'angle droit."
      }
    },
    {
      titre: "Angles adjacents, supplémentaires, opposés par le sommet",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les angles opposés par le sommet", youtube: "https://youtu.be/gPzK6EcCMPY" },
      texte:
        "- Deux angles **adjacents** ont le même sommet, un côté commun, et sont de part et d'autre de ce côté : leurs mesures s'**additionnent**.\n" +
        "- Deux angles **supplémentaires** ont une somme de **$180^\\circ$**.\n" +
        "- Quand deux droites se coupent, les angles **opposés par le sommet** (n° $1$ et n° $3$ sur la figure) ont **la même mesure**.\n\n" +
        "Sur la figure, les angles n° $1$ et n° $2$ sont adjacents et forment un angle plat : ils sont supplémentaires.",
      figure: "an6-secantes",
      exemple: {
        enonce: "Sur la figure, l'angle n° $1$ mesure $55^\\circ$. Combien mesurent les angles n° $2$, n° $3$ et n° $4$ ?",
        solution: "N° $3$ : opposé par le sommet au n° $1$, donc $55^\\circ$.\n\nN° $2$ : supplémentaire du n° $1$, donc $180 - 55 = 125^\\circ$. N° $4$ : opposé au n° $2$, donc $125^\\circ$."
      }
    },
    {
      titre: "La bissectrice d'un angle",
      video: { titre: "Vidéo d'Yvan Monka : tracer la bissectrice d'un angle", youtube: "https://youtu.be/Zxmms-BBdos" },
      texte:
        "La **bissectrice** d'un angle est la demi-droite, issue du sommet, qui partage cet angle en **deux angles de même mesure**.\n\n" +
        "Si $[Oz)$ est la bissectrice de $\\widehat{xOy}$, alors $\\widehat{xOz} = \\widehat{zOy} = \\widehat{xOy} \\div 2$.\n\n" +
        "Pour la tracer au rapporteur : on mesure l'angle, on calcule la moitié, on place la demi-droite.\n\n" +
        "Sur la figure, les deux angles égaux sont codés par le même petit trait.",
      figure: "an6-cours-bissectrice",
      exemple: {
        enonce: "$[Oz)$ est la bissectrice de $\\widehat{xOy}$, qui mesure $126^\\circ$. Combien mesure $\\widehat{xOz}$ ?",
        solution: "$126 \\div 2 = 63$ : $\\widehat{xOz} = 63^\\circ$."
      }
    }
  ],

  videosNote: "Méthodes et exercices corrigés par Yvan Monka (maths-et-tiques).",
  videos: [
    { titre: "Mesurer un angle (2)", type: "Rapporteur", youtube: "https://youtu.be/nBkYby81HuM" },
    { titre: "Construire un angle (1)", type: "Construction", youtube: "https://youtu.be/rIl-k0MAg60" },
    { titre: "Construire un angle (2)", type: "Construction", youtube: "https://youtu.be/f-rT3FdT3F8" },
    { titre: "Comparer les angles", type: "Comparer", youtube: "https://youtu.be/A4n8yvzSxMA" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "an6-nommer", titre: "Nommer un angle, ses côtés, son sommet", etape: "Nommer et mesurer", nb: 5 },
    { type: "an6-nature", titre: "Aigu, droit, obtus, plat… ?", etape: "Nommer et mesurer", nb: 6 },
    { type: "an6-mesurer", titre: "Lire la mesure sur le rapporteur", etape: "Nommer et mesurer", nb: 6 },
    { type: "an6-vocab", titre: "Adjacents, supplémentaires, opposés par le sommet", etape: "Calculer avec des angles", nb: 5 },
    { type: "an6-calcul", titre: "Calculer la mesure d'un angle", etape: "Calculer avec des angles", nb: 6 },
    { type: "an6-bissectrice", titre: "La bissectrice", etape: "Calculer avec des angles", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "L'angle de sommet $B$ dont les côtés passent par $A$ et $C$ se note :", choix: ["$\\widehat{ABC}$", "$\\widehat{BAC}$", "$\\widehat{ACB}$", "$[BA)$"], bonne: 0, explication: "Le sommet s'écrit au milieu." },
    { question: "Les côtés d'un angle sont :", choix: ["deux demi-droites de même origine", "deux segments quelconques", "deux droites parallèles", "deux points"], bonne: 0, explication: "Leur origine commune est le sommet." },
    { question: "Un angle de $120^\\circ$ est :", choix: ["obtus", "aigu", "droit", "plat"], bonne: 0, explication: "Entre $90^\\circ$ et $180^\\circ$ : obtus." },
    { question: "Un angle de $180^\\circ$ est :", choix: ["plat", "plein", "droit", "nul"], bonne: 0, explication: "Ses côtés sont dans le prolongement l'un de l'autre." },
    { question: "Un angle plein mesure :", choix: ["$360^\\circ$", "$180^\\circ$", "$90^\\circ$", "$100^\\circ$"], bonne: 0, explication: "Un tour complet." },
    { question: "Sur la figure, l'angle $\\widehat{AOB}$ mesure :", figure: "an6-rapporteur", choix: ["$50^\\circ$", "$130^\\circ$", "$40^\\circ$", "$60^\\circ$"], bonne: 0, explication: "$[OA)$ est sur le $0$ de la graduation extérieure : on lit $50$. $130$ se lit sur la mauvaise graduation." },
    { question: "Pour mesurer un angle, on place le centre du rapporteur :", choix: ["sur le sommet de l'angle", "au bout d'un côté", "n'importe où sur un côté", "au milieu de l'angle"], bonne: 0, explication: "Le centre sur le sommet, un côté sur le $0$." },
    { question: "Un élève lit $140^\\circ$ pour un angle aigu. La bonne mesure est sans doute :", choix: ["$40^\\circ$", "$140^\\circ$", "$90^\\circ$", "$14^\\circ$"], bonne: 0, explication: "Un angle aigu mesure moins de $90^\\circ$ : $180 - 140 = 40^\\circ$." },
    { question: "Deux angles adjacents mesurent $35^\\circ$ et $50^\\circ$. L'angle formé par les deux mesure :", choix: ["$85^\\circ$", "$15^\\circ$", "$95^\\circ$", "$180^\\circ$"], bonne: 0, explication: "Les mesures d'angles adjacents s'additionnent." },
    { question: "Deux angles supplémentaires : l'un mesure $65^\\circ$. L'autre mesure :", choix: ["$115^\\circ$", "$25^\\circ$", "$295^\\circ$", "$65^\\circ$"], bonne: 0, explication: "$180 - 65 = 115$." },
    { question: "Sur la figure, l'angle n° $1$ mesure $55^\\circ$. L'angle n° $3$ mesure :", figure: "an6-secantes", choix: ["$55^\\circ$", "$125^\\circ$", "$35^\\circ$", "$180^\\circ$"], bonne: 0, explication: "Les angles n° $1$ et n° $3$ sont opposés par le sommet." },
    { question: "Sur la figure, l'angle n° $1$ mesure $55^\\circ$. L'angle n° $2$ mesure :", figure: "an6-secantes", choix: ["$125^\\circ$", "$55^\\circ$", "$35^\\circ$", "$305^\\circ$"], bonne: 0, explication: "Les angles n° $1$ et n° $2$ forment un angle plat : $180 - 55 = 125$." },
    { question: "Deux angles opposés par le sommet :", choix: ["ont la même mesure", "sont toujours droits", "ont une somme de $90^\\circ$", "sont adjacents"], bonne: 0, explication: "C'est la propriété des angles opposés par le sommet." },
    { question: "$[Oz)$ est la bissectrice de $\\widehat{xOy} = 126^\\circ$. Alors $\\widehat{xOz} = $", choix: ["$63^\\circ$", "$126^\\circ$", "$252^\\circ$", "$54^\\circ$"], bonne: 0, explication: "La bissectrice partage l'angle en deux angles égaux : $126 \\div 2$." },
    { question: "$[Oz)$ est la bissectrice de $\\widehat{xOy}$ et $\\widehat{xOz} = 35^\\circ$. Alors $\\widehat{xOy} = $", choix: ["$70^\\circ$", "$17{,}5^\\circ$", "$35^\\circ$", "$145^\\circ$"], bonne: 0, explication: "L'angle entier est le double : $2 \\times 35 = 70^\\circ$." },
    { question: "Autour d'un point, trois angles font un tour complet. Deux mesurent $100^\\circ$ et $150^\\circ$. Le troisième mesure :", figure: "an6-qcm-tour", choix: ["$110^\\circ$", "$250^\\circ$", "$70^\\circ$", "$10^\\circ$"], bonne: 0, explication: "$360 - 100 - 150 = 110^\\circ$." },
    { question: "Sans rapporteur, l'angle $\\widehat{EFG}$ dessiné est :", figure: "an6-qcm-obtus", choix: ["obtus", "aigu", "droit", "plat"], bonne: 0, explication: "Il est plus ouvert qu'un angle droit, mais moins qu'un angle plat : il est obtus." },
    { question: "Sur la figure, combien mesure l'angle $\\widehat{xOy}$ marqué « ? » ?", figure: "an6-qcm-adj", choix: ["$110^\\circ$", "$30^\\circ$", "$70^\\circ$", "$180^\\circ$"], bonne: 0, explication: "Les angles de $40^\\circ$ et $70^\\circ$ sont adjacents : $40 + 70 = 110^\\circ$." },
    { question: "Sur la figure, $[Ox)$ et $[Oy)$ forment un angle plat. Combien mesure l'angle marqué « ? » ?", figure: "an6-qcm-supp", choix: ["$142^\\circ$", "$52^\\circ$", "$38^\\circ$", "$322^\\circ$"], bonne: 0, explication: "Les deux angles sont supplémentaires : $180 - 38 = 142^\\circ$." },
    { question: "$[Oz)$ est la bissectrice de l'angle $\\widehat{xOy}$ de $84^\\circ$. Combien mesure l'angle marqué « ? » ?", figure: "an6-qcm-biss", choix: ["$42^\\circ$", "$84^\\circ$", "$168^\\circ$", "$96^\\circ$"], bonne: 0, explication: "La bissectrice partage l'angle en deux angles égaux : $84 \\div 2 = 42^\\circ$." },
    { question: "Sur la figure, l'angle $\\widehat{ESF}$ mesure :", figure: "an6-qcm-rapp", choix: ["$130^\\circ$", "$50^\\circ$", "$140^\\circ$", "$120^\\circ$"], bonne: 0, explication: "Le côté $[SE)$ est sur le $0$ de la graduation intérieure : on lit $130$ sur cette graduation. L'angle est bien obtus." },
    { question: "La bissectrice d'un angle plat forme avec chacun de ses côtés un angle de :", choix: ["$90^\\circ$", "$180^\\circ$", "$45^\\circ$", "$360^\\circ$"], bonne: 0, explication: "Un angle plat mesure $180^\\circ$ : $180 \\div 2 = 90^\\circ$. La bissectrice est perpendiculaire aux côtés." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Nommer un angle",
      etapes: [
        "Repère le sommet (le point où partent les deux côtés).",
        "Choisis un point sur chaque côté.",
        "Écris les trois lettres sous un chapeau, le sommet au milieu."
      ],
      figure: "an6-angle",
      exemple: "Sommet $B$, côtés passant par $A$ et $C$ : $\\widehat{ABC}$."
    },
    {
      titre: "Mesurer un angle",
      etapes: [
        "Estime d'abord : aigu ou obtus ?",
        "Centre du rapporteur sur le sommet, un côté sur le $0$.",
        "Lis sur la graduation qui part de ce $0$, puis vérifie avec ton estimation."
      ],
      figure: "an6-rapporteur",
      exemple: "Angle aigu : si on lit $130$, la bonne mesure est $50^\\circ$."
    },
    {
      titre: "Calculer un angle",
      etapes: [
        "Angles adjacents : on additionne. Angle plat : $180^\\circ$. Tour complet : $360^\\circ$.",
        "Angles supplémentaires : $180^\\circ$ moins l'autre.",
        "Angles opposés par le sommet : même mesure."
      ],
      figure: "an6-cours-adjacents",
      exemple: "Deux droites sécantes, un angle de $55^\\circ$ : les autres mesurent $125^\\circ$, $55^\\circ$ et $125^\\circ$."
    },
    {
      titre: "Utiliser une bissectrice",
      etapes: [
        "La bissectrice part du sommet.",
        "Elle partage l'angle en deux angles égaux.",
        "Chaque moitié vaut l'angle $\\div 2$ ; l'angle vaut $2 \\times$ chaque moitié."
      ],
      figure: "an6-cours-bissectrice",
      exemple: "Bissectrice de $\\widehat{xOy} = 80^\\circ$ : $\\widehat{xOz} = 40^\\circ$."
    }
  ],
  erreurs: [
    "Ne pas mettre le sommet au milieu dans la notation de l'angle.",
    "Croire qu'un angle est plus grand parce que ses côtés sont plus longs.",
    "Lire la mauvaise graduation du rapporteur : un angle aigu ne mesure pas $130^\\circ$.",
    "Oublier de placer le centre du rapporteur exactement sur le sommet.",
    "Confondre supplémentaires ($180^\\circ$) et tour complet ($360^\\circ$).",
    "Penser que deux angles opposés par le sommet sont supplémentaires : ils sont égaux."
  ]
};
