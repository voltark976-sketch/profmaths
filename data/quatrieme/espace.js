/*
  CHAPITRE : 4e — Pyramides, cônes et repérage dans l'espace
  -----------------------------------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : reconnaitre et représenter
  pyramides et cônes de révolution (vocabulaire, patrons) ; calculer le volume d'une pyramide et d'un cône ;
  effet d'un agrandissement ou d'une réduction sur les longueurs, les aires et les volumes ; se repérer dans un
  parallélépipède rectangle. Règle du site : une réponse « arrondie au dixième » n'accepte que le bon arrondi.
  Figures : "es4-cours-…", "es4-qcm-…" (perspective cavalière, arêtes cachées en pointillés ; assets/exercices-quatrieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["quatrieme-espace"] = {
  niveau: "4e",
  numero: 6,
  titre: "Pyramides, cônes et repérage dans l'espace",
  accroche: "Décrire une pyramide et un cône, calculer leur volume, prévoir l'effet d'un agrandissement et repérer un point dans un pavé avec trois coordonnées.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : pyramides et cônes (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Espace1.pdf" },
    { titre: "Cours d'Yvan Monka : volumes, agrandissement, repérage (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Espace2.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : pyramide et cône (Yvan Monka)", url: "https://youtu.be/2FH1GM2Nuk4", type: "video" },
    { titre: "Réaliser le patron d'une pyramide (Yvan Monka)", url: "https://youtu.be/GXkxA__A44A", type: "video" },
    { titre: "Calculer le volume d'un cône (Yvan Monka)", url: "https://youtu.be/kMssaNRPXz8", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Pyramides et cônes",
      video: { titre: "Vidéo d'Yvan Monka : le cours sur la pyramide et le cône", youtube: "https://youtu.be/2FH1GM2Nuk4" },
      texte:
        "- Une **pyramide** a une **base** polygonale et des **faces latérales** triangulaires qui se rejoignent au **sommet**. Sa **hauteur** est le segment issu du sommet, perpendiculaire à la base. Une pyramide à base triangulaire est un **tétraèdre**.\n" +
        "- Un **cône de révolution** a une base en **disque** et un sommet ; il est obtenu en faisant tourner un triangle rectangle autour d'un côté de l'angle droit.\n\n" +
        "Une pyramide dont la base a $n$ côtés a $n + 1$ faces, $2n$ arêtes et $n + 1$ sommets. Le patron d'un cône est formé d'un disque et d'un secteur de disque.\n\n" +
        "En perspective cavalière, les arêtes cachées sont dessinées en pointillés ; la hauteur $[SO]$ est perpendiculaire à la base.",
      figure: "es4-cours-pyramide",
      exemple: {
        enonce: "Combien de faces, d'arêtes et de sommets a une pyramide à base hexagonale ?",
        solution: "$7$ faces (la base et $6$ triangles), $12$ arêtes et $7$ sommets."
      }
    },
    {
      titre: "Volumes",
      video: { titre: "Vidéo d'Yvan Monka : calculer le volume d'une pyramide ou d'un cône", youtube: "https://youtu.be/RzIJ5Fq2fiU" },
      texte:
        "$V_{\\text{pyramide}} = \\dfrac{B \\times h}{3}$ et $V_{\\text{cône}} = \\dfrac{\\pi r^2 \\times h}{3}$, où $B$ est l'aire de la base et $h$ la hauteur.\n\n" +
        "Une pyramide (ou un cône) a le **tiers** du volume du prisme (ou du cylindre) de même base et de même hauteur : la pyramide dessinée dans le cube occupe le tiers de son volume.",
      figure: "es4-cours-tiers",
      exemple: {
        enonce: "Calcule le volume d'un cône de rayon $3$ cm et de hauteur $5$ cm, arrondi au dixième.",
        solution: "$V = \\dfrac{\\pi \\times 9 \\times 5}{3} = 15\\pi \\approx 47{,}1$ cm³."
      }
    },
    {
      titre: "Agrandissement et réduction",
      video: { titre: "Vidéo d'Yvan Monka : calculer un volume par agrandissement ou réduction", youtube: "https://youtu.be/YBwMKghrSOE" },
      texte:
        "Dans un agrandissement ($k > 1$) ou une réduction ($0 < k < 1$) de rapport $k$ :\n\n" +
        "- les **longueurs** sont multipliées par $k$ ;\n" +
        "- les **aires** par $k^2$ ;\n" +
        "- les **volumes** par $k^3$.\n\n" +
        "Les angles ne changent pas. Quand on double l'arête d'un cube ($k = 2$), il faut $2^3 = 8$ petits cubes pour le remplir.",
      figure: "es4-cours-agrandir",
      exemple: {
        enonce: "Une maquette au $\\dfrac{1}{2}$ d'une boîte de $64$ cm³ a quel volume ?",
        solution: "$64 \\times \\left(\\dfrac{1}{2}\\right)^3 = 64 \\times \\dfrac{1}{8} = 8$ cm³."
      }
    },
    {
      titre: "Se repérer dans l'espace",
      video: { titre: "Vidéo d'Yvan Monka : se repérer dans l'espace", youtube: "https://youtu.be/PvCndyPcEng" },
      texte:
        "Dans un pavé droit $ABCDEFGH$ (face $ABCD$ en bas, $E$ au-dessus de $A$…), on prend $A$ comme origine : un point est repéré par trois coordonnées **(abscisse ; ordonnée ; altitude)**, mesurées le long de $[AB)$, de $[AD)$ et de $[AE)$.\n\n" +
        "Avec $AB = 4$, $AD = 3$, $AE = 2$ : $B(4 \\, ; \\, 0 \\, ; \\, 0)$, $D(0 \\, ; \\, 3 \\, ; \\, 0)$, $G(4 \\, ; \\, 3 \\, ; \\, 2)$.",
      figure: "es4-cours-pave",
      exemple: {
        enonce: "Dans le même pavé, quelles sont les coordonnées de $F$ et de $H$ ?",
        solution: "$F$ est au-dessus de $B$ : $F(4 \\, ; \\, 0 \\, ; \\, 2)$. $H$ est au-dessus de $D$ : $H(0 \\, ; \\, 3 \\, ; \\, 2)$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "es4-vocab", titre: "Pyramides et cônes", etape: "Les solides", nb: 5 },
    { type: "es4-volume", titre: "Volume d'une pyramide ou d'un cône", etape: "Volumes", nb: 6 },
    { type: "es4-agrandir", titre: "Agrandissement et réduction", etape: "Volumes", nb: 5 },
    { type: "es4-reperage", titre: "Coordonnées dans un pavé", etape: "Repérage", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Une pyramide à base carrée a :", choix: ["$5$ faces", "$4$ faces", "$6$ faces", "$8$ faces"], bonne: 0, explication: "La base et $4$ triangles." },
    { question: "Un tétraèdre est une pyramide à base :", choix: ["triangulaire", "carrée", "pentagonale", "circulaire"], bonne: 0, explication: "Toutes ses faces sont des triangles." },
    { question: "La base d'un cône de révolution est :", choix: ["un disque", "un triangle", "un carré", "une sphère"], bonne: 0, explication: "On fait tourner un triangle rectangle." },
    { question: "La formule du volume d'une pyramide est :", choix: ["$\\dfrac{B \\times h}{3}$", "$B \\times h$", "$\\dfrac{B \\times h}{2}$", "$3 \\times B \\times h$"], bonne: 0, explication: "Le tiers du prisme." },
    { question: "Une pyramide de base $12$ cm² et de hauteur $5$ cm a un volume de :", choix: ["$20$ cm³", "$60$ cm³", "$30$ cm³", "$17$ cm³"], bonne: 0, explication: "$\\dfrac{12 \\times 5}{3}$." },
    { question: "Le volume d'un cône de rayon $3$ et de hauteur $4$ est :", choix: ["$12\\pi$", "$36\\pi$", "$4\\pi$", "$9\\pi$"], bonne: 0, explication: "$\\dfrac{\\pi \\times 9 \\times 4}{3}$." },
    { question: "Un cône et un cylindre de même base et même hauteur : le volume du cône est :", choix: ["le tiers de celui du cylindre", "égal", "la moitié", "le double"], bonne: 0, explication: "Formule avec $\\div 3$." },
    { question: "Si on multiplie les longueurs par $2$, les aires sont multipliées par :", choix: ["$4$", "$2$", "$8$", "$6$"], bonne: 0, explication: "$2^2$." },
    { question: "Si on multiplie les longueurs par $3$, les volumes sont multipliés par :", choix: ["$27$", "$9$", "$3$", "$6$"], bonne: 0, explication: "$3^3$." },
    { question: "Une réduction de rapport $\\dfrac{1}{2}$ divise les volumes par :", choix: ["$8$", "$2$", "$4$", "$6$"], bonne: 0, explication: "$\\left(\\dfrac{1}{2}\\right)^3 = \\dfrac{1}{8}$." },
    { question: "Dans un agrandissement, les angles :", choix: ["ne changent pas", "sont multipliés par $k$", "sont multipliés par $k^2$", "deviennent droits"], bonne: 0, explication: "La forme est conservée." },
    { question: "Dans le pavé du cours ($AB = 4$, $AD = 3$, $AE = 2$), $C$ a pour coordonnées :", choix: ["$(4 \\, ; \\, 3 \\, ; \\, 0)$", "$(4 \\, ; \\, 3 \\, ; \\, 2)$", "$(3 \\, ; \\, 4 \\, ; \\, 0)$", "$(0 \\, ; \\, 3 \\, ; \\, 4)$"], bonne: 0, explication: "$C$ est sur la face du bas." },
    { question: "Un point d'altitude $0$ dans le pavé est :", choix: ["sur la face du bas", "sur la face du haut", "au sommet $G$", "en dehors du pavé"], bonne: 0, explication: "L'altitude mesure la hauteur." },
    { question: "Le patron d'une pyramide à base triangulaire contient :", choix: ["$4$ triangles", "$3$ triangles et un carré", "$4$ carrés", "$3$ rectangles et $2$ triangles"], bonne: 0, explication: "Base triangulaire et $3$ faces." },
    { question: "Combien d'arêtes a ce solide (les pointillés comptent) ?", figure: "es4-qcm-tetra", choix: ["$6$", "$4$", "$5$", "$3$"], bonne: 0, explication: "$3$ arêtes à la base et $3$ qui montent au sommet $S$ : $6$ arêtes." },
    { question: "Ce solide est :", figure: "es4-qcm-hexa", choix: ["une pyramide à base hexagonale", "une pyramide à base pentagonale", "un cône de révolution", "un prisme à base hexagonale"], bonne: 0, explication: "Sa base a $6$ côtés et ses faces latérales sont des triangles qui se rejoignent au sommet." },
    { question: "Sur la figure, la hauteur du cône est :", figure: "es4-cours-cone", choix: ["le segment $[SO]$", "le rayon $r$", "une génératrice", "le diamètre de la base"], bonne: 0, explication: "La hauteur joint le sommet $S$ au centre $O$ de la base ; elle est perpendiculaire à la base." },
    { question: "Une pyramide a pour base un carré de $6$ cm de côté et une hauteur de $5$ cm. Son volume est :", choix: ["$60$ cm³", "$180$ cm³", "$10$ cm³", "$40$ cm³"], bonne: 0, explication: "$B = 36$ cm² et $V = \\dfrac{36 \\times 5}{3} = 60$ cm³." },
    { question: "Le cube et la pyramide ont la même base et la même hauteur. Le cube a un volume de $27$ cm³ ; la pyramide a un volume de :", figure: "es4-cours-tiers", choix: ["$9$ cm³", "$27$ cm³", "$13{,}5$ cm³", "$81$ cm³"], bonne: 0, explication: "La pyramide a le tiers du volume du prisme (ici le cube) de même base et de même hauteur : $27 \\div 3 = 9$." },
    { question: "Sur la figure ($AB = 4$, $AD = 3$, $AE = 2$), les coordonnées de $F$ sont :", figure: "es4-cours-pave", choix: ["$(4 \\, ; \\, 0 \\, ; \\, 2)$", "$(4 \\, ; \\, 3 \\, ; \\, 2)$", "$(0 \\, ; \\, 4 \\, ; \\, 2)$", "$(4 \\, ; \\, 2 \\, ; \\, 0)$"], bonne: 0, explication: "$F$ est au-dessus de $B(4 \\, ; \\, 0 \\, ; \\, 0)$, à l'altitude $2$." },
    { question: "Une maquette est à l'échelle $\\dfrac{1}{100}$. Une surface réelle de $200$ m² y mesure :", choix: ["$200$ cm²", "$2$ m²", "$20$ cm²", "$2$ cm²"], bonne: 0, explication: "Les aires sont multipliées par $\\left(\\dfrac{1}{100}\\right)^2 = \\dfrac{1}{10\\,000}$ : $200$ m² $\\div 10\\,000 = 0{,}02$ m² $= 200$ cm²." },
    { question: "Le volume exact d'un cône de rayon $3$ cm et de hauteur $10$ cm est :", choix: ["$30\\pi$ cm³", "$90\\pi$ cm³", "$10\\pi$ cm³", "$60\\pi$ cm³"], bonne: 0, explication: "$V = \\dfrac{\\pi \\times 3^2 \\times 10}{3} = \\dfrac{90\\pi}{3} = 30\\pi$ cm³." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer un volume",
      etapes: [
        "Calcule l'aire de la base (polygone ou disque).",
        "Multiplie par la hauteur.",
        "Pour une pyramide ou un cône, divise par $3$ (attention : rayon, et non diamètre)."
      ],
      figure: "es4-cours-cone",
      exemple: "Pyramide de base $6 \\times 4$ et de hauteur $5$ : $\\dfrac{24 \\times 5}{3} = 40$."
    },
    {
      titre: "Agrandir ou réduire",
      etapes: [
        "Repère le rapport $k$.",
        "Longueurs $\\times k$ ; aires $\\times k^2$ ; volumes $\\times k^3$.",
        "Vérifie : un agrandissement augmente, une réduction diminue."
      ],
      figure: "es4-cours-agrandir",
      exemple: "$k = 3$ : un volume de $5$ cm³ devient $135$ cm³."
    },
    {
      titre: "Lire des coordonnées dans un pavé",
      etapes: [
        "Pars de l'origine $A$.",
        "Compte le déplacement le long de $[AB)$, puis de $[AD)$, puis vers le haut.",
        "Écris (abscisse ; ordonnée ; altitude)."
      ],
      figure: "es4-cours-pave",
      exemple: "$E$, au-dessus de $A$ : $(0 \\, ; \\, 0 \\, ; \\, AE)$."
    }
  ],
  erreurs: [
    "Oublier de diviser par $3$ pour une pyramide ou un cône.",
    "Utiliser l'arête latérale au lieu de la hauteur.",
    "Multiplier les aires ou les volumes par $k$ au lieu de $k^2$ ou $k^3$.",
    "Écrire les coordonnées dans le mauvais ordre.",
    "Utiliser le diamètre au lieu du rayon pour le cône."
  ]
};
