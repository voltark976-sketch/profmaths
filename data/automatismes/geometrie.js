/*
  AUTOMATISMES · GÉOMÉTRIE (GE01 à GE05)
  --------------------------------------
  Rubrique « Géométrie » de la liste des automatismes de Seconde (programme 2026),
  à entretenir en Première pour l'épreuve anticipée.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["auto-geometrie"] = {
  niveau: "Automatismes",
  numero: null,
  periode: "Seconde et Première",
  titre: "Géométrie",
  accroche: "Repérer un point, calculer un périmètre, une aire ou un volume, utiliser Pythagore, Thalès et la trigonométrie du triangle rectangle, sans calculatrice.",

  playlist: "",
  drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv",
  pdfs: [
    { titre: "Dossier élève de Seconde (parties P7 et P8)", url: "https://drive.google.com/file/d/1vr9e5N38rAOQLWIvUR5suK6l6ciyoLNY/view" }
  ],

  cours: [
    {
      titre: "Se repérer (GE01)",
      texte:
        "- Sur une **droite graduée**, chaque point a une abscisse : positive à droite de $0$, négative à gauche.\n" +
        "- Dans un **repère** du plan, un point a deux coordonnées $(x\\,;y)$ : d'abord l'**abscisse** (axe horizontal), puis l'**ordonnée** (axe vertical).\n" +
        "- Pour placer $A(3\\,;-2)$ : on avance de $3$ vers la droite, puis on descend de $2$.",
      exemple: {
        enonce: "Le point $B$ est à $4$ graduations à gauche de $0$ et $1$ graduation au-dessus de l'axe horizontal. Quelles sont ses coordonnées ?",
        solution: "À gauche de $0$ : abscisse négative, $x = -4$. Au-dessus : ordonnée positive, $y = 1$. Donc $B(-4\\,;1)$."
      }
    },
    {
      titre: "Périmètres, aires et volumes (GE02)",
      texte:
        "- **Périmètres** : la somme des côtés d'un polygone ; rectangle $2(L + \\ell)$ ; carré $4c$ ; cercle $2\\pi r = \\pi d$.\n" +
        "- **Aires** : rectangle $L \\times \\ell$ ; triangle $\\dfrac{\\text{base} \\times \\text{hauteur}}{2}$ ; disque $\\pi r^2$.\n" +
        "- **Volumes** : pavé droit $L \\times \\ell \\times h$ ; prisme et cylindre $\\mathcal{B} \\times h$ ; pyramide et cône $\\dfrac{1}{3}\\mathcal{B} \\times h$ ; boule $\\dfrac{4}{3}\\pi r^3$.\n" +
        "- Un périmètre est en cm, une aire en cm², un volume en cm³.",
      exemple: {
        enonce: "Un disque a un rayon de $5$ cm. Donner la longueur du cercle et l'aire du disque (valeurs exactes).",
        solution: "Longueur : $2\\pi \\times 5 = 10\\pi$ cm. Aire : $\\pi \\times 5^2 = 25\\pi$ cm²."
      }
    },
    {
      titre: "Pythagore et Thalès (GE03, GE04)",
      video: { titre: "Vidéo d'Yvan Monka : calculer une longueur avec Pythagore", youtube: "https://youtu.be/M9sceJ8gzNc" },
      texte:
        "- **Pythagore** : si $ABC$ est rectangle en $A$, alors $BC^2 = AB^2 + AC^2$ ($[BC]$ est l'hypoténuse). Réciproquement, si l'égalité est vraie, le triangle est rectangle.\n" +
        "- **Thalès** : si $M \\in [AB]$, $N \\in [AC]$ et $(MN) \\parallel (BC)$, alors $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.\n" +
        "- Dans Thalès, on écrit toujours le petit triangle en haut des fractions et le grand en bas.",
      exemple: {
        enonce: "$(MN) \\parallel (BC)$, $AM = 3$, $AB = 9$ et $BC = 12$. Calculer $MN$.",
        solution: "$\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$ donne $\\dfrac{3}{9} = \\dfrac{MN}{12}$, donc $MN = \\dfrac{3 \\times 12}{9} = 4$."
      }
    },
    {
      titre: "Trigonométrie dans le triangle rectangle (GE05)",
      texte:
        "- Dans un triangle rectangle, pour un angle aigu : $\\cos = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$, $\\sin = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$, $\\tan = \\dfrac{\\text{opposé}}{\\text{adjacent}}$ (« CAH SOH TOA »).\n" +
        "- L'hypoténuse est le côté en face de l'angle droit ; le côté adjacent touche l'angle ; le côté opposé est en face.\n" +
        "- Valeurs utiles sans calculatrice : $\\cos 60^\\circ = \\sin 30^\\circ = 0{,}5$ et $\\tan 45^\\circ = 1$.",
      exemple: {
        enonce: "$ABC$ est rectangle en $A$, $\\widehat{ABC} = 60^\\circ$ et $BC = 14$. Calculer $AB$.",
        solution: "$[AB]$ est adjacent à l'angle et $[BC]$ est l'hypoténuse : $\\cos 60^\\circ = \\dfrac{AB}{BC}$, donc $AB = 14 \\times 0{,}5 = 7$."
      }
    }
  ],

  videos: [],

  exercices: [
    { type: "am-repere-droite", titre: "GE01 · Abscisse sur une droite graduée", etape: "Programme de Seconde", nb: 5 },
    { type: "am-coordonnees", titre: "GE01 · Lire les coordonnées d'un point", etape: "Programme de Seconde", nb: 5 },
    { type: "am-perimetre", titre: "GE02 · Périmètres", etape: "Programme de Seconde", nb: 5 },
    { type: "auto-grandeurs", titre: "GE02 · Aires et volumes", etape: "Programme de Seconde", nb: 5 },
    { type: "auto-pythagore", titre: "GE03 · Pythagore", etape: "Programme de Seconde", nb: 5 },
    { type: "am-thales", titre: "GE04 · Thalès", etape: "Programme de Seconde", nb: 5 },
    { type: "am-trigo", titre: "GE05 · Cosinus, sinus, tangente", etape: "Programme de Seconde", nb: 5 },
    { type: "am-flash-ge", titre: "Flash : géométrie mélangée", etape: "Défi", nb: 8 }
  ],

  qcm: [
    { question: "GE01 · Le point $A(-3\\,;2)$ est situé…", choix: ["à droite de l'axe vertical, au-dessus de l'axe horizontal", "à gauche de l'axe vertical, au-dessus de l'axe horizontal", "à gauche de l'axe vertical, en dessous de l'axe horizontal", "à droite de l'axe vertical, en dessous de l'axe horizontal"], bonne: 1, explication: "$x = -3 < 0$ : à gauche. $y = 2 > 0$ : au-dessus." },
    { question: "GE02 · Périmètre d'un rectangle de $7$ cm sur $3$ cm :", choix: ["$21$ cm", "$10$ cm", "$20$ cm", "$42$ cm"], bonne: 2, explication: "$2 \\times (7 + 3) = 20$ cm. $21$ cm² serait l'aire." },
    { question: "GE02 · Longueur d'un cercle de rayon $4$ cm :", choix: ["$16\\pi$ cm", "$8\\pi$ cm", "$4\\pi$ cm", "$8$ cm"], bonne: 1, explication: "$2\\pi r = 2\\pi \\times 4 = 8\\pi$ cm. $16\\pi$ cm² serait l'aire du disque." },
    { question: "GE02 · Volume d'un pavé droit de $2$ cm sur $3$ cm sur $5$ cm :", choix: ["$10$ cm³", "$30$ cm³", "$31$ cm³", "$60$ cm³"], bonne: 1, explication: "$2 \\times 3 \\times 5 = 30$ cm³." },
    { question: "GE03 · $ABC$ rectangle en $A$, $AB = 6$, $AC = 8$. $BC =$", choix: ["$14$", "$10$", "$\\sqrt{28}$", "$100$"], bonne: 1, explication: "$BC^2 = 36 + 64 = 100$, donc $BC = 10$." },
    { question: "GE03 · Un triangle de côtés $5$, $6$ et $8$ est-il rectangle ?", choix: ["Oui", "Non"], bonne: 1, explication: "$8^2 = 64$ et $5^2 + 6^2 = 61$ : pas d'égalité, il n'est pas rectangle." },
    { question: "GE04 · $(MN) \\parallel (BC)$, $AM = 2$, $AB = 6$, $BC = 9$. $MN =$", choix: ["$3$", "$27$", "$4{,}5$", "$5$"], bonne: 0, explication: "$\\dfrac{2}{6} = \\dfrac{MN}{9}$, donc $MN = \\dfrac{2 \\times 9}{6} = 3$." },
    { question: "GE05 · $ABC$ rectangle en $A$. $\\sin \\widehat{ABC} =$", choix: ["$\\dfrac{AB}{BC}$", "$\\dfrac{AC}{BC}$", "$\\dfrac{AC}{AB}$", "$\\dfrac{BC}{AC}$"], bonne: 1, explication: "Sinus = opposé sur hypoténuse : $[AC]$ est opposé à $\\widehat{B}$, $[BC]$ est l'hypoténuse." },
    { question: "GE05 · $\\cos 60^\\circ =$", choix: ["$1$", "$0{,}5$", "$\\sqrt{3}$", "$0$"], bonne: 1, explication: "Valeur à connaître : $\\cos 60^\\circ = 0{,}5$." },
    { question: "GE05 · $ABC$ rectangle en $A$, $\\widehat{ABC} = 45^\\circ$, $AB = 7$. $AC =$", choix: ["$7$", "$3{,}5$", "$14$", "$\\sqrt{7}$"], bonne: 0, explication: "$\\tan 45^\\circ = \\dfrac{AC}{AB} = 1$, donc $AC = AB = 7$." }
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
    "Mélanger le petit et le grand triangle dans les rapports de Thalès."
  ]
};
