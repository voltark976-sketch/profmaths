/*
  AUTOMATISMES · GÉOMÉTRIE
  ------------------------
  Rubrique « Géométrie » de la liste des automatismes de Seconde (programme 2026), à entretenir en Première :
  droite graduée, coordonnées, périmètres, aires et volumes, Pythagore, Thalès, trigonométrie du triangle rectangle.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["auto-geometrie"] = {
  niveau: "Automatismes",
  numero: null,
  periode: "Seconde et Première",
  titre: "Géométrie",
  accroche: "Repérer un point, calculer un périmètre, une aire ou un volume, utiliser Pythagore, Thalès et la trigonométrie du triangle rectangle, sans calculatrice.",

  playlist: "https://www.youtube.com/playlist?list=PLVTjofGlms14",
  drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv",
  pdfs: [
    { titre: "Dossier élève de Seconde (parties P7 et P8)", url: "https://drive.google.com/file/d/1vr9e5N38rAOQLWIvUR5suK6l6ciyoLNY/view" }
  ],

  cours: [
    {
      titre: "Sur une droite graduée",
      video: { titre: "Vidéo de ton prof : repérage sur une droite et dans le plan", youtube: "https://youtu.be/KTPki_bOLzU" },
      texte:
        "- Chaque point d'une droite graduée a une **abscisse** : positive à droite de $0$, négative à gauche.\n" +
        "- On cherche d'abord ce que vaut une graduation. Sur la droite ci-contre, il y a $2$ graduations de $0$ à $1$ : une graduation vaut $0{,}5$. Donc $A$ a pour abscisse $-2{,}5$ et $B$ a pour abscisse $1{,}5$.\n" +
        "- Pour deux points d'abscisses $a < b$ : la distance est $b - a$ et le milieu a pour abscisse $\\dfrac{a + b}{2}$.",
      figure: "am-cours-droite-graduee",
      exemple: {
        enonce: "Sur une droite graduée, $C$ a pour abscisse $-5$ et $D$ pour abscisse $3$. Calculer la distance $CD$ et l'abscisse du milieu de $[CD]$.",
        solution: "$CD = 3 - (-5) = 8$. Milieu : $\\dfrac{-5 + 3}{2} = \\dfrac{-2}{2} = -1$."
      }
    },
    {
      titre: "Coordonnées dans un repère",
      video: { titre: "Vidéo de ton prof : repérage sur une droite et dans le plan", youtube: "https://youtu.be/KTPki_bOLzU" },
      texte:
        "- Dans un **repère** du plan, un point a deux coordonnées $(x\\,;y)$ : d'abord l'**abscisse** (axe horizontal), puis l'**ordonnée** (axe vertical).\n" +
        "- Pour placer $A(3\\,;-2)$ : depuis l'origine, on avance de $3$ vers la droite, puis on descend de $2$. Pour $B(-4\\,;1)$ : $4$ vers la gauche, puis $1$ vers le haut (figure).\n" +
        "- Un point de l'axe des abscisses a une ordonnée nulle, un point de l'axe des ordonnées a une abscisse nulle.",
      figure: "am-cours-repere",
      exemple: {
        enonce: "Le point $C$ est à $5$ graduations à gauche de l'axe vertical et à $2$ graduations en dessous de l'axe horizontal. Quelles sont ses coordonnées ?",
        solution: "À gauche : abscisse négative, $x = -5$. En dessous : ordonnée négative, $y = -2$. Donc $C(-5\\,;-2)$."
      }
    },
    {
      titre: "Périmètres et aires",
      video: { titre: "Vidéo de ton prof : périmètres, aires, volumes", youtube: "https://youtu.be/UgnC010qfVI" },
      texte:
        "- **Périmètres** : la somme des côtés d'un polygone ; rectangle $2(L + \\ell)$ ; carré $4c$ ; cercle $2\\pi r = \\pi d$.\n" +
        "- **Aires** : rectangle $L \\times \\ell$ ; carré $c^2$ ; triangle $\\dfrac{\\text{base} \\times \\text{hauteur}}{2}$ ; disque $\\pi r^2$.\n" +
        "- Un périmètre s'exprime en cm (ou m…), une aire en cm² (ou m²…). Sans calculatrice, on garde $\\pi$ dans la valeur exacte : $25\\pi$ cm².",
      figure: "am-cours-disque",
      exemple: {
        enonce: "Le disque ci-contre a un rayon de $5$ cm. Donner la longueur du cercle et l'aire du disque (valeurs exactes).",
        solution: "Longueur : $2\\pi \\times 5 = 10\\pi$ cm. Aire : $\\pi \\times 5^2 = 25\\pi$ cm²."
      }
    },
    {
      titre: "Volumes",
      video: { titre: "Vidéo de ton prof : périmètres, aires, volumes", youtube: "https://youtu.be/UgnC010qfVI" },
      texte:
        "- Pavé droit : $L \\times \\ell \\times h$ ; cube : $c^3$.\n" +
        "- Prisme droit et cylindre : $\\mathcal{B} \\times h$ (aire de la base fois hauteur). Le cylindre ci-contre a pour volume $\\pi \\times 2^2 \\times 5 = 20\\pi$ cm³.\n" +
        "- Pyramide et cône : $\\dfrac{1}{3}\\mathcal{B} \\times h$. Boule : $\\dfrac{4}{3}\\pi r^3$.\n" +
        "- Un volume s'exprime en cm³ (ou m³…) ; $1$ L $= 1$ dm³.",
      figure: "am-cours-cylindre",
      exemple: {
        enonce: "Une pyramide a pour base un carré de côté $6$ cm et pour hauteur $5$ cm. Calculer son volume.",
        solution: "$\\mathcal{B} = 6^2 = 36$ cm², donc $V = \\dfrac{1}{3} \\times 36 \\times 5 = 12 \\times 5 = 60$ cm³."
      }
    },
    {
      titre: "Théorème de Pythagore",
      video: { titre: "Vidéo d'Yvan Monka : calculer une longueur avec Pythagore", youtube: "https://youtu.be/M9sceJ8gzNc" },
      texte:
        "- Si $ABC$ est rectangle en $A$, alors $BC^2 = AB^2 + AC^2$ : $[BC]$, en face de l'angle droit, est l'**hypoténuse** (figure).\n" +
        "- Réciproque : si $BC^2 = AB^2 + AC^2$, le triangle est rectangle en $A$. Par exemple, $5^2 + 12^2 = 25 + 144 = 169 = 13^2$ : un triangle de côtés $5$, $12$ et $13$ est rectangle.\n" +
        "- Sans calculatrice, les valeurs sont choisies pour que les racines tombent juste : $\\sqrt{100} = 10$, $\\sqrt{6{,}25} = 2{,}5$.",
      figure: "am-cours-pythagore",
      exemple: {
        enonce: "$ABC$ est rectangle en $A$, avec $AB = 1{,}5$ cm et $AC = 2$ cm. Calculer $BC$.",
        solution: "$BC^2 = 1{,}5^2 + 2^2 = 2{,}25 + 4 = 6{,}25$, donc $BC = \\sqrt{6{,}25} = 2{,}5$ cm."
      }
    },
    {
      titre: "Théorème de Thalès",
      video: { titre: "Vidéo d'Yvan Monka : appliquer le théorème de Thalès", youtube: "https://youtu.be/GwGQD2BdZ3s" },
      texte:
        "- Si $M \\in [AB]$, $N \\in [AC]$ et $(MN) \\parallel (BC)$, alors $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.\n" +
        "- On écrit toujours le petit triangle $AMN$ en haut des fractions et le grand triangle $ABC$ en bas.\n" +
        "- Le triangle $AMN$ est une réduction de $ABC$ : toutes ses longueurs sont multipliées par le même coefficient $k = \\dfrac{AM}{AB}$.",
      figure: "am-cours-thales",
      exemple: {
        enonce: "Sur la figure, $(MN) \\parallel (BC)$, $AM = 3$, $AB = 9$ et $BC = 12$. Calculer $MN$.",
        solution: "$\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$ donne $\\dfrac{3}{9} = \\dfrac{MN}{12}$, donc $MN = \\dfrac{3 \\times 12}{9} = 4$."
      }
    },
    {
      titre: "Trigonométrie dans le triangle rectangle",
      video: { titre: "Vidéo d'Yvan Monka : calculer une longueur avec cosinus, sinus ou tangente", youtube: "https://youtu.be/BscM5Iti3zI" },
      texte:
        "- Pour un angle aigu d'un triangle rectangle : $\\cos = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$, $\\sin = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$, $\\tan = \\dfrac{\\text{opposé}}{\\text{adjacent}}$ (« CAH SOH TOA »).\n" +
        "- L'hypoténuse est en face de l'angle droit ; le côté adjacent touche l'angle ; le côté opposé est en face de l'angle (figure, pour l'angle en $B$).\n" +
        "- Valeurs utiles sans calculatrice : $\\cos 60^\\circ = \\sin 30^\\circ = 0{,}5$ et $\\tan 45^\\circ = 1$.",
      figure: "am-cours-trigo",
      exemple: {
        enonce: "$ABC$ est rectangle en $A$, $\\widehat{ABC} = 60^\\circ$ et $BC = 14$. Calculer $AB$.",
        solution: "$[AB]$ est adjacent à l'angle et $[BC]$ est l'hypoténuse : $\\cos 60^\\circ = \\dfrac{AB}{BC}$, donc $AB = 14 \\times 0{,}5 = 7$."
      }
    }
  ],

  videos: [
    { titre: "Exercice 19 · Repérage", type: "Repérer", youtube: "https://youtu.be/KTPki_bOLzU" },
    { titre: "Exercice 21 · Périmètres, aires, volumes", type: "Grandeurs", youtube: "https://youtu.be/UgnC010qfVI" },
    { titre: "Exercice 32 · Synthèse : la citerne du faré", type: "Volumes", youtube: "https://youtu.be/_q_XdOJxjik" }
  ],
  videosNote: "Vidéos de ton prof (playlist « Secondes : automatismes ») : les énoncés sont dans le dossier élève ci-dessus.",

  exercices: [
    { type: "am-repere-droite", titre: "Abscisse sur une droite graduée", etape: "Automatismes de Seconde", nb: 5 },
    { type: "am-coordonnees", titre: "Lire ou placer un point dans un repère", etape: "Automatismes de Seconde", nb: 5 },
    { type: "am-perimetre", titre: "Périmètres", etape: "Automatismes de Seconde", nb: 5 },
    { type: "auto-grandeurs", titre: "Aires et volumes", etape: "Automatismes de Seconde", nb: 5 },
    { type: "auto-pythagore", titre: "Pythagore", etape: "Automatismes de Seconde", nb: 5 },
    { type: "am-thales", titre: "Thalès", etape: "Automatismes de Seconde", nb: 5 },
    { type: "am-trigo", titre: "Cosinus, sinus, tangente", etape: "Automatismes de Seconde", nb: 5 },
    { type: "am-flash-ge", titre: "Flash : géométrie mélangée", etape: "Défi", nb: 8 }
  ],

  qcm: [
    { question: "Le point $A(-3\\,;2)$ est situé…", choix: ["à droite de l'axe vertical, au-dessus de l'axe horizontal", "à gauche de l'axe vertical, au-dessus de l'axe horizontal", "à gauche de l'axe vertical, en dessous de l'axe horizontal", "à droite de l'axe vertical, en dessous de l'axe horizontal"], bonne: 1, explication: "$x = -3 < 0$ : à gauche. $y = 2 > 0$ : au-dessus." },
    { question: "Quelles sont les coordonnées du point $C$ ?", figure: "am-qcm-repere", choix: ["$(-3\\,;-1)$", "$(-1\\,;-3)$", "$(3\\,;1)$", "$(-3\\,;1)$"], bonne: 0, explication: "$C$ est à $3$ carreaux à gauche de l'axe vertical ($x = -3$) et à $1$ carreau en dessous de l'axe horizontal ($y = -1$). L'abscisse s'écrit en premier." },
    { question: "Quelle est l'abscisse du point $P$ ?", figure: "am-qcm-graduee", choix: ["$-0{,}6$", "$-0{,}3$", "$-3$", "$0{,}6$"], bonne: 0, explication: "Il y a $5$ graduations de $0$ à $1$ : une graduation vaut $0{,}2$. $P$ est à $3$ graduations à gauche de $0$ : $-3 \\times 0{,}2 = -0{,}6$." },
    { question: "Périmètre d'un rectangle de $7$ cm sur $3$ cm :", choix: ["$21$ cm", "$10$ cm", "$20$ cm", "$42$ cm"], bonne: 2, explication: "$2 \\times (7 + 3) = 20$ cm. $21$ cm² serait l'aire." },
    { question: "Longueur d'un cercle de rayon $4$ cm :", choix: ["$16\\pi$ cm", "$8\\pi$ cm", "$4\\pi$ cm", "$8$ cm"], bonne: 1, explication: "$2\\pi r = 2\\pi \\times 4 = 8\\pi$ cm. $16\\pi$ cm² serait l'aire du disque." },
    { question: "Quel est le volume du pavé droit ci-contre ?", figure: "am-qcm-pave", choix: ["$30$ cm³", "$10$ cm³", "$62$ cm³", "$60$ cm³"], bonne: 0, explication: "$5 \\times 2 \\times 3 = 30$ cm³. ($62$ cm² est l'aire totale des six faces : $2 \\times (10 + 15 + 6)$.)" },
    { question: "D'après la figure, $FG =$", figure: "am-qcm-pythagore", choix: ["$10$", "$14$", "$\\sqrt{28}$", "$100$"], bonne: 0, explication: "$EFG$ est rectangle en $E$ : $FG^2 = 8^2 + 6^2 = 64 + 36 = 100$, donc $FG = 10$. ($14 = 8 + 6$ : on n'additionne pas les longueurs, mais leurs carrés.)" },
    { question: "Un triangle a pour côtés $5$, $6$ et $8$. Est-il rectangle ?", choix: ["Non, car $5^2 + 6^2 = 61$ et $8^2 = 64$", "Oui, car $5 + 6 > 8$", "Oui, car $8^2 = 5^2 + 6^2$", "On ne peut pas le savoir sans mesurer ses angles"], bonne: 0, explication: "On compare le carré du plus grand côté à la somme des carrés des deux autres : $64 \\neq 61$, donc le triangle n'est pas rectangle." },
    { question: "$(MN) \\parallel (BC)$, $AM = 2$, $AB = 6$, $BC = 9$. $MN =$", choix: ["$3$", "$27$", "$4{,}5$", "$5$"], bonne: 0, explication: "$\\dfrac{2}{6} = \\dfrac{MN}{9}$, donc $MN = \\dfrac{2 \\times 9}{6} = 3$." },
    { question: "$ABC$ est rectangle en $A$. $\\sin \\widehat{ABC} =$", choix: ["$\\dfrac{AB}{BC}$", "$\\dfrac{AC}{BC}$", "$\\dfrac{AC}{AB}$", "$\\dfrac{BC}{AC}$"], bonne: 1, explication: "Sinus = opposé sur hypoténuse : $[AC]$ est opposé à $\\widehat{B}$, $[BC]$ est l'hypoténuse." },
    { question: "$\\cos 60^\\circ =$", choix: ["$1$", "$0{,}5$", "$\\sqrt{3}$", "$0$"], bonne: 1, explication: "Valeur à connaître : $\\cos 60^\\circ = 0{,}5$." },
    { question: "$ABC$ est rectangle en $A$, $\\widehat{ABC} = 45^\\circ$, $AB = 7$. $AC =$", choix: ["$7$", "$3{,}5$", "$14$", "$\\sqrt{7}$"], bonne: 0, explication: "$\\tan 45^\\circ = \\dfrac{AC}{AB} = 1$, donc $AC = AB = 7$." },
    { question: "Sur une droite graduée, $A$ a pour abscisse $-6$ et $B$ pour abscisse $2$. Le milieu de $[AB]$ a pour abscisse :", choix: ["$-2$", "$-4$", "$4$", "$2$"], bonne: 0, explication: "$\\dfrac{-6 + 2}{2} = \\dfrac{-4}{2} = -2$. ($4$ est la moitié de la distance $AB = 8$.)" },
    { question: "Le point situé $2$ carreaux à gauche et $5$ carreaux au-dessus de l'origine a pour coordonnées :", choix: ["$(-2\\,;5)$", "$(5\\,;-2)$", "$(2\\,;5)$", "$(-5\\,;2)$"], bonne: 0, explication: "Abscisse d'abord : à gauche, donc $-2$. Ordonnée ensuite : au-dessus, donc $5$." },
    { question: "Aire d'un triangle de base $8$ cm et de hauteur $5$ cm :", choix: ["$20$ cm²", "$40$ cm²", "$13$ cm²", "$26$ cm²"], bonne: 0, explication: "$\\dfrac{8 \\times 5}{2} = 20$ cm². Sans la division par $2$, on aurait l'aire du rectangle." },
    { question: "Aire d'un disque de diamètre $6$ cm :", choix: ["$9\\pi$ cm²", "$36\\pi$ cm²", "$6\\pi$ cm²", "$12\\pi$ cm²"], bonne: 0, explication: "Le rayon vaut $3$ cm : $\\pi \\times 3^2 = 9\\pi$ cm². ($36\\pi$ utilise le diamètre au lieu du rayon, $6\\pi$ est la longueur du cercle.)" },
    { question: "Volume d'un cylindre de rayon $3$ cm et de hauteur $5$ cm :", choix: ["$45\\pi$ cm³", "$15\\pi$ cm³", "$30\\pi$ cm³", "$75\\pi$ cm³"], bonne: 0, explication: "$\\mathcal{B} \\times h = \\pi \\times 3^2 \\times 5 = 45\\pi$ cm³. ($15\\pi$ oublie le carré du rayon, $30\\pi$ est l'aire de la surface latérale $2\\pi r h$, $75\\pi$ échange le rayon et la hauteur.)" },
    { question: "Quel est le volume du cône ci-contre ?", figure: "am-qcm-cone", choix: ["$12\\pi$ cm³", "$36\\pi$ cm³", "$4\\pi$ cm³", "$16\\pi$ cm³"], bonne: 0, explication: "$V = \\dfrac{1}{3} \\times \\pi \\times 3^2 \\times 4 = \\dfrac{36\\pi}{3} = 12\\pi$ cm³. ($36\\pi$ oublie le $\\dfrac{1}{3}$, $16\\pi$ échange le rayon et la hauteur.)" },
    { question: "Volume d'une pyramide de base carrée de côté $3$ cm et de hauteur $4$ cm :", choix: ["$12$ cm³", "$36$ cm³", "$4$ cm³", "$16$ cm³"], bonne: 0, explication: "$\\dfrac{1}{3} \\times \\mathcal{B} \\times h = \\dfrac{1}{3} \\times 9 \\times 4 = 12$ cm³. ($36$ cm³ oublie le $\\dfrac{1}{3}$.)" },
    { question: "$ABC$ est rectangle en $A$, avec $BC = 13$ et $AB = 5$. $AC =$", choix: ["$12$", "$8$", "$\\sqrt{194}$", "$18$"], bonne: 0, explication: "$[BC]$ est l'hypoténuse : $AC^2 = 13^2 - 5^2 = 169 - 25 = 144$, donc $AC = 12$." },
    { question: "Un triangle a pour côtés $9$, $12$ et $15$. Il est :", choix: ["rectangle", "équilatéral", "non rectangle", "isocèle"], bonne: 0, explication: "$9^2 + 12^2 = 81 + 144 = 225 = 15^2$ : d'après la réciproque de Pythagore, il est rectangle." },
    { question: "La diagonale d'un carré de côté $4$ cm mesure :", choix: ["$4\\sqrt{2}$ cm", "$8$ cm", "$16$ cm", "$2\\sqrt{2}$ cm"], bonne: 0, explication: "Pythagore : $d^2 = 4^2 + 4^2 = 32$, donc $d = \\sqrt{32} = \\sqrt{16 \\times 2} = 4\\sqrt{2}$ cm." },
    { question: "Sur la figure, $(MN) \\parallel (BC)$. Combien mesure $AN$ ?", figure: "am-qcm-thales", choix: ["$6$", "$37{,}5$", "$9$", "$11$"], bonne: 0, explication: "$\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$ : $\\dfrac{4}{10} = \\dfrac{AN}{15}$, donc $AN = \\dfrac{4 \\times 15}{10} = 6$. ($37{,}5 = \\dfrac{10 \\times 15}{4}$ : rapport à l'envers.)" },
    { question: "Dans une configuration de Thalès, le triangle $AMN$ est une réduction de $ABC$ de coefficient $\\dfrac{1}{3}$. Si $BC = 12$, alors $MN =$", choix: ["$4$", "$36$", "$9$", "$11$"], bonne: 0, explication: "Toutes les longueurs du petit triangle sont celles du grand multipliées par $\\dfrac{1}{3}$ : $12 \\times \\dfrac{1}{3} = 4$." },
    { question: "$ABC$ est rectangle en $A$. $\\cos \\widehat{ACB} =$", choix: ["$\\dfrac{AC}{BC}$", "$\\dfrac{AB}{BC}$", "$\\dfrac{AB}{AC}$", "$\\dfrac{BC}{AC}$"], bonne: 0, explication: "Cosinus = adjacent sur hypoténuse : pour l'angle en $C$, le côté adjacent est $[AC]$ et l'hypoténuse $[BC]$." },
    { question: "Sur la figure, $ABC$ est rectangle en $A$, $\\widehat{ABC} = 30^\\circ$ et $BC = 10$. $AC =$", figure: "am-qcm-trigo", choix: ["$5$", "$20$", "$10$", "$5\\sqrt{3}$"], bonne: 0, explication: "$[AC]$ est opposé à l'angle $\\widehat{B}$ : $\\sin 30^\\circ = \\dfrac{AC}{BC}$, donc $AC = 10 \\times 0{,}5 = 5$. ($5\\sqrt{3}$, c'est $AB$.)" },
    { question: "$ABC$ est rectangle en $A$ avec $AB = AC = 6$. L'angle $\\widehat{ABC}$ mesure :", choix: ["$45^\\circ$", "$60^\\circ$", "$30^\\circ$", "$90^\\circ$"], bonne: 0, explication: "$\\tan \\widehat{B} = \\dfrac{AC}{AB} = \\dfrac{6}{6} = 1$, donc $\\widehat{B} = 45^\\circ$ (triangle rectangle isocèle)." }
  ],

  methode: [
    {
      titre: "Lire les coordonnées d'un point",
      etapes: [
        "Repère l'origine $O$, là où les deux axes se croisent.",
        "Abscisse : descends ou monte jusqu'à l'axe horizontal et lis le nombre.",
        "Ordonnée : va à gauche ou à droite jusqu'à l'axe vertical et lis le nombre.",
        "Écris $(x\\,;y)$ dans cet ordre : horizontal d'abord, vertical ensuite."
      ],
      figure: "am-meth-coordonnees",
      exemple: "Un point à $2$ carreaux à droite et $3$ carreaux en dessous de $O$ a pour coordonnées $(2\\,;-3)$."
    },
    {
      titre: "Choisir l'outil dans un triangle",
      etapes: [
        "Triangle rectangle, on connaît deux côtés : **Pythagore**.",
        "Triangle rectangle, on connaît un angle et un côté : **trigonométrie** (CAH SOH TOA).",
        "Deux droites parallèles coupent deux sécantes : **Thalès**.",
        "Écris l'égalité avec les lettres, remplace par les valeurs, puis calcule."
      ],
      exemple: "$(MN) \\parallel (BC)$ : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$, petit triangle en haut, grand en bas."
    }
  ],
  erreurs: [
    "Confondre périmètre (en cm) et aire (en cm²) : $2(L + \\ell)$ n'est pas $L \\times \\ell$.",
    "Dans Pythagore, on additionne les **carrés** : $BC \\neq AB + AC$.",
    "L'hypoténuse est en face de l'angle droit, jamais un côté de l'angle droit.",
    "Inverser l'ordre des coordonnées : $(x\\,;y)$, l'abscisse d'abord.",
    "Mélanger le petit et le grand triangle dans les rapports de Thalès.",
    "Oublier le $\\dfrac{1}{3}$ dans le volume d'une pyramide ou d'un cône."
  ]
};
