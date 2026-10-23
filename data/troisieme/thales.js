/*
  CHAPITRE : 3e — Théorème de Thalès
  -----------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027) : connaître et
  utiliser le théorème de Thalès et sa réciproque dans les deux configurations (triangles emboîtés et
  « papillon ») ; démontrer que deux droites ne sont pas parallèles ; agrandissements et réductions (longueurs
  multipliées par k, aires par k²). Vidéos et cours PDF d'Yvan Monka.
  figure : configurations dessinées avec figureThales3() (assets/exercices-troisieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-thales"] = {
  niveau: "3e",
  numero: 11,
  titre: "Théorème de Thalès",
  accroche: "Calculer des longueurs, prouver un parallélisme ou son absence, dans les deux configurations de Thalès.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : théorème de Thalès (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Thales.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : théorème de Thalès (Yvan Monka)", url: "https://youtu.be/puuHhlf0jAQ", type: "video" },
    { titre: "Démontrer que deux droites ne sont pas parallèles (Yvan Monka)", url: "https://youtu.be/ovlhagzONlw", type: "video" },
    { titre: "Résoudre un problème avec le théorème de Thalès (Yvan Monka)", url: "https://youtu.be/hmJQNkpi0gI", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Le théorème de Thalès",
      video: { titre: "Vidéo d'Yvan Monka : appliquer le théorème de Thalès (1)", youtube: "https://youtu.be/GwGQD2BdZ3s" },
      texte:
        "Si les droites $(BM)$ et $(CN)$ sont sécantes en $A$ et si $(MN) \\parallel (BC)$, alors :\n\n" +
        "$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.\n\n" +
        "Cela vaut dans les **deux configurations** : $M$ et $N$ sur les côtés $[AB]$ et $[AC]$ (triangles emboîtés, première figure), ou de l'autre côté de $A$ (configuration « papillon », seconde figure).\n\n" +
        "Dans chaque rapport, on met une longueur du petit triangle $AMN$ au numérateur et la longueur correspondante du grand triangle $ABC$ au dénominateur.",
      figure: "th3-cours-configs",
      exemple: {
        enonce: "$(MN) \\parallel (BC)$, $AM = 3$, $AB = 5$, $BC = 8$. Calcule $MN$.",
        solution: "$\\dfrac{3}{5} = \\dfrac{MN}{8}$, donc $MN = \\dfrac{3 \\times 8}{5} = 4{,}8$."
      }
    },
    {
      titre: "Réciproque et contraposée",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la réciproque du théorème de Thalès", youtube: "https://youtu.be/uaPicwUSQz0" },
      texte:
        "- **Réciproque** : si les points $A, M, B$ et $A, N, C$ sont alignés **dans le même ordre** et si $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$, alors $(MN) \\parallel (BC)$.\n" +
        "- **Contraposée** : si $\\dfrac{AM}{AB} \\neq \\dfrac{AN}{AC}$, alors les droites ne sont **pas** parallèles.\n\n" +
        "Pour comparer deux fractions, on peut comparer les produits en croix.\n\n" +
        "Sur la figure : $\\dfrac{AM}{AB} = \\dfrac{2}{5} = 0{,}4$ et $\\dfrac{AN}{AC} = \\dfrac{3}{7{,}5} = 0{,}4$.",
      figure: "th3-cours-reciproque",
      exemple: {
        enonce: "$AM = 2$, $AB = 5$, $AN = 3$, $AC = 7{,}5$. $(MN)$ et $(BC)$ sont-elles parallèles ?",
        solution: "$2 \\times 7{,}5 = 15$ et $5 \\times 3 = 15$ : oui, d'après la réciproque."
      }
    },
    {
      titre: "Agrandissement et réduction",
      video: { titre: "Vidéo d'Yvan Monka : appliquer le théorème de Thalès (2)", youtube: "https://youtu.be/cq3wBbXYB4A" },
      texte:
        "Dans une configuration de Thalès, le triangle $AMN$ est une réduction (ou un agrandissement) du triangle $ABC$ de rapport $k = \\dfrac{AM}{AB}$.\n\n" +
        "Les **longueurs** sont multipliées par $k$, les **aires** par $k^2$ (et les volumes par $k^3$).\n\n" +
        "Sur la figure, $AM = \\dfrac{1}{3} AB$ : le triangle grisé $AMN$ est une réduction de rapport $\\dfrac{1}{3}$, et il faut $9$ triangles comme lui pour paver $ABC$ : son aire est $\\left(\\dfrac{1}{3}\\right)^2 = \\dfrac{1}{9}$ de celle de $ABC$.",
      figure: "th3-cours-reduction",
      exemple: {
        enonce: "Rapport $k = \\dfrac{1}{3}$ ; aire de $ABC$ : $45$ cm². Aire de $AMN$ ?",
        solution: "$45 \\times \\dfrac{1}{9} = 5$ cm²."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "th3-longueur", titre: "Calculer une longueur", etape: "Théorème", nb: 6 },
    { type: "th3-reciproque", titre: "Parallèles ou non ?", etape: "Réciproque", nb: 6 },
    { type: "th3-rapport", titre: "Réductions et aires", etape: "Réduction", nb: 5 },
    { type: "th3-problemes", titre: "Problèmes concrets", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$(MN) \\parallel (BC)$, $M \\in [AB]$, $N \\in [AC]$. Le théorème de Thalès donne :", choix: ["$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$", "$\\dfrac{AM}{MB} = \\dfrac{AN}{NC} = \\dfrac{MN}{BC}$", "$\\dfrac{AB}{AM} = \\dfrac{AN}{AC}$", "$AM + AB = AN + AC$"], bonne: 0, explication: "Petit triangle sur grand triangle." },
    { question: "$AM = 4$, $AB = 10$, $AC = 15$, $(MN) \\parallel (BC)$. $AN$ vaut :", choix: ["$6$", "$37{,}5$", "$9$", "$5$"], bonne: 0, explication: "$\\dfrac{4 \\times 15}{10}$." },
    { question: "Dans la configuration « papillon », le théorème de Thalès :", choix: ["s'applique aussi", "ne s'applique pas", "ne s'applique qu'aux triangles rectangles", "donne $AM = AN$"], bonne: 0, explication: "Les deux configurations sont valables." },
    { question: "Pour prouver que deux droites sont parallèles, on utilise :", choix: ["la réciproque du théorème de Thalès", "le théorème de Thalès", "le théorème de Pythagore", "la trigonométrie"], bonne: 0, explication: "On part des rapports pour conclure au parallélisme." },
    { question: "Si $\\dfrac{AM}{AB} \\neq \\dfrac{AN}{AC}$, alors $(MN)$ et $(BC)$ :", choix: ["ne sont pas parallèles", "sont parallèles", "sont perpendiculaires", "on ne peut rien dire"], bonne: 0, explication: "C'est la contraposée." },
    { question: "$AM = 3$, $AB = 7$, $AN = 4$, $AC = 9$. Les droites $(MN)$ et $(BC)$ :", choix: ["ne sont pas parallèles", "sont parallèles", "sont confondues", "sont perpendiculaires"], bonne: 0, explication: "$3 \\times 9 = 27 \\neq 28 = 7 \\times 4$." },
    { question: "Un triangle est réduit avec le rapport $\\dfrac{1}{2}$. Son aire est multipliée par :", choix: ["$\\dfrac{1}{4}$", "$\\dfrac{1}{2}$", "$2$", "$4$"], bonne: 0, explication: "$k^2$." },
    { question: "Un agrandissement de rapport $3$ multiplie les longueurs par :", choix: ["$3$", "$9$", "$27$", "$\\dfrac{1}{3}$"], bonne: 0, explication: "Les longueurs sont multipliées par $k$." },
    { question: "Pour la réciproque, il faut aussi vérifier :", choix: ["que les points sont alignés dans le même ordre", "que le triangle est rectangle", "que $AM = AN$", "rien d'autre"], bonne: 0, explication: "Condition de la réciproque." },
    { question: "$\\dfrac{2}{5}$ et $\\dfrac{6}{15}$ sont égales car :", choix: ["$2 \\times 15 = 5 \\times 6$", "$2 + 15 = 5 + 6$", "$2 \\times 5 = 6 \\times 15$", "$15 - 5 = 6 + 2$"], bonne: 0, explication: "Produits en croix." },
    { question: "Une ombre de bâton de $1$ m mesure $2$ m ; un arbre a une ombre de $9$ m. L'arbre mesure :", choix: ["$4{,}5$ m", "$18$ m", "$11$ m", "$7$ m"], bonne: 0, explication: "$\\dfrac{1 \\times 9}{2}$." },
    { question: "Échelle $\\dfrac{1}{50}$ : $8$ cm sur la maquette représentent :", choix: ["$4$ m", "$400$ m", "$0{,}16$ m", "$58$ cm"], bonne: 0, explication: "$8 \\times 50 = 400$ cm." },
    { question: "Sur la figure, $(FG) \\parallel (HK)$. La longueur $FG$ vaut :", figure: "th3-qcm-calc", choix: ["$6$ cm", "$13{,}5$ cm", "$7$ cm", "$2{,}7$ cm"], bonne: 0, explication: "$\\dfrac{EF}{EH} = \\dfrac{FG}{HK}$, donc $FG = \\dfrac{4 \\times 9}{6} = 6$ cm." },
    { question: "Sur la figure, $(RS) \\parallel (TU)$. La longueur $OU$ vaut :", figure: "th3-qcm-papillon", choix: ["$7{,}5$ cm", "$1{,}2$ cm", "$6$ cm", "$10$ cm"], bonne: 0, explication: "Configuration papillon : $\\dfrac{OR}{OT} = \\dfrac{OS}{OU}$, donc $OU = \\dfrac{5 \\times 3}{2} = 7{,}5$ cm." },
    { question: "Avec les longueurs de la figure, les droites $(MN)$ et $(BC)$ :", figure: "th3-qcm-reciproque", choix: ["sont parallèles", "ne sont pas parallèles", "sont perpendiculaires", "on ne peut pas savoir"], bonne: 0, explication: "$6 \\times 12 = 72$ et $9 \\times 8 = 72$ : les rapports sont égaux et les points dans le même ordre, d'après la réciproque du théorème de Thalès elles sont parallèles." },
    { question: "L'ombre du piquet et celle du cocotier se terminent au même point $S$. Le cocotier mesure :", figure: "th3-qcm-ombre", choix: ["$9$ m", "$16$ m", "$11{,}5$ m", "$6$ m"], bonne: 0, explication: "$\\dfrac{h}{1{,}5} = \\dfrac{12}{2}$, donc $h = 1{,}5 \\times 6 = 9$ m." },
    { question: "Sur la figure, le triangle grisé $AMN$ est une réduction de $ABC$ de rapport :", figure: "th3-cours-reduction", choix: ["$\\dfrac{1}{3}$", "$\\dfrac{1}{9}$", "$3$", "$\\dfrac{2}{3}$"], bonne: 0, explication: "$AM$ est le tiers de $AB$ : $k = \\dfrac{1}{3}$." },
    { question: "Sur la figure, l'aire du triangle grisé $AMN$ est quelle fraction de l'aire de $ABC$ ?", figure: "th3-cours-reduction", choix: ["$\\dfrac{1}{9}$", "$\\dfrac{1}{3}$", "$\\dfrac{1}{6}$", "$\\dfrac{2}{9}$"], bonne: 0, explication: "$9$ triangles identiques pavent $ABC$ : c'est $k^2 = \\left(\\dfrac{1}{3}\\right)^2 = \\dfrac{1}{9}$." },
    { question: "Pour mesurer la rivière, on a $(MN) \\parallel (BC)$. Sa largeur $BC$ vaut :", figure: "th3-qcm-riviere", choix: ["$15$ m", "$2{,}4$ m", "$12$ m", "$20$ m"], bonne: 0, explication: "$\\dfrac{AB}{AM} = \\dfrac{BC}{MN}$, donc $BC = \\dfrac{10 \\times 6}{4} = 15$ m." },
    { question: "Dans la configuration papillon de la figure, $\\dfrac{AM}{AB}$ est égal à :", figure: "th3-cours-papillon", choix: ["$\\dfrac{AN}{AC}$", "$\\dfrac{AC}{AN}$", "$\\dfrac{MN}{AB}$", "$\\dfrac{AM}{MN}$"], bonne: 0, explication: "Petit triangle $AMN$ sur grand triangle $ABC$ : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$." },
    { question: "Un agrandissement de rapport $2$ multiplie les aires par :", choix: ["$4$", "$2$", "$8$", "$\\dfrac{1}{2}$"], bonne: 0, explication: "Les aires sont multipliées par $k^2 = 4$." },
    { question: "Une réduction de rapport $0{,}5$ multiplie les volumes par :", choix: ["$0{,}125$", "$0{,}5$", "$0{,}25$", "$1{,}5$"], bonne: 0, explication: "Les volumes sont multipliés par $k^3 = 0{,}5^3 = 0{,}125$." },
    { question: "Pour démontrer que deux droites ne sont pas parallèles, on utilise :", choix: ["la contraposée du théorème de Thalès", "la réciproque du théorème de Thalès", "le théorème de Pythagore", "la formule de l'aire"], bonne: 0, explication: "Si les rapports sont différents, la contraposée permet de conclure." },
    { question: "$M \\in [AB]$, $N \\in [AC]$, $AM = 5$, $AB = 8$, $AN = 6$, $AC = 9{,}6$. Les droites $(MN)$ et $(BC)$ :", choix: ["sont parallèles", "ne sont pas parallèles", "sont sécantes en $A$", "on ne peut pas savoir"], bonne: 0, explication: "$5 \\times 9{,}6 = 48$ et $8 \\times 6 = 48$ : d'après la réciproque du théorème de Thalès, elles sont parallèles." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Rédiger le théorème de Thalès",
      etapes: [
        "Nomme la configuration : « les droites $(BM)$ et $(CN)$ sont sécantes en $A$ et $(MN)$ est parallèle à $(BC)$ ».",
        "Écris l'égalité des trois rapports (petit triangle sur grand triangle).",
        "Garde l'égalité utile et termine par un produit en croix."
      ],
      figure: "th3-cours-emboites",
      exemple: "Sur la figure : $\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$, soit $\\dfrac{3}{5} = \\dfrac{MN}{8}$, donc $MN = \\dfrac{3 \\times 8}{5} = 4{,}8$."
    },
    {
      titre: "Parallèles ou non ?",
      etapes: [
        "Calcule séparément $\\dfrac{AM}{AB}$ et $\\dfrac{AN}{AC}$ (ou les produits en croix).",
        "S'ils sont égaux et les points dans le même ordre : réciproque, les droites sont parallèles.",
        "S'ils sont différents : contraposée, elles ne le sont pas."
      ],
      figure: "th3-qcm-reciproque",
      exemple: "Sur la figure : $\\dfrac{6}{9} = \\dfrac{2}{3}$ et $\\dfrac{8}{12} = \\dfrac{2}{3}$, les points sont dans le même ordre : $(MN) \\parallel (BC)$."
    },
    {
      titre: "Aire ou volume après une réduction",
      etapes: [
        "Calcule le rapport $k$ (longueur réduite $\\div$ longueur d'origine).",
        "Multiplie les longueurs par $k$, les aires par $k^2$, les volumes par $k^3$.",
        "Vérifie : pour une réduction, $k < 1$ et le résultat est plus petit."
      ],
      figure: "th3-cours-reduction",
      exemple: "Rapport $\\dfrac{1}{3}$, aire de $ABC$ : $45$ cm², donc aire de $AMN$ : $45 \\times \\dfrac{1}{9} = 5$ cm²."
    }
  ],
  erreurs: [
    "Utiliser $\\dfrac{AM}{MB}$ au lieu de $\\dfrac{AM}{AB}$.",
    "Mélanger les côtés des deux triangles dans un même rapport.",
    "Utiliser le théorème pour prouver un parallélisme (c'est la réciproque).",
    "Oublier de vérifier l'ordre des points pour la réciproque.",
    "Multiplier une aire par $k$ au lieu de $k^2$."
  ]
};
