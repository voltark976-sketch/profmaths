/*
  CHAPITRE : CM2 — Géométrie plane
  ---------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : vocabulaire, notations et codes ; perpendicularité et
  parallélisme ; cercle et disque ; reconnaître et nommer triangle (rectangle, isocèle, équilatéral), quadrilatère,
  carré, rectangle, losange, trapèze, trapèze rectangle, pentagone, hexagone ; propriétés ; constructions ; élaborer un
  programme de construction ; symétrique d'une figure sur quadrillage (ici axes vertical et horizontal ; l'axe diagonal se travaille sur papier).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-geometrie"] = {
  niveau: "CM2",
  numero: 14,
  titre: "Géométrie plane",
  accroche: "Trapèzes, pentagones, hexagones, programmes de construction et symétrie.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Les figures et leurs propriétés",
      video: { titre: "Vidéo de Maître Lucas : le quadrilatère (CM1-CM2)", youtube: "https://youtu.be/x_p75G_LeiU" },
      texte:
        "- **Trapèze** : un quadrilatère qui a **deux côtés parallèles**. **Trapèze rectangle** : il a en plus deux angles droits.\n" +
        "- **Pentagone** : $5$ côtés ; **hexagone** : $6$ côtés.\n" +
        "- **Carré** : $4$ angles droits et $4$ côtés égaux ; c'est un rectangle et un losange.\n" +
        "- **Cercle** de centre O et de rayon $3$ cm : les points à $3$ cm de O. **Disque** : les points à $3$ cm **ou moins** de O.\n\n" +
        "Notations : la droite (AB), le segment [AB], la longueur AB.",
      figure: "m2g-cours-figures",
      exemple: { enonce: "Un quadrilatère a deux côtés parallèles et deux angles droits. Qu'est-ce ?", solution: "Un trapèze rectangle." }
    },
    {
      titre: "Programme de construction et symétrie",
      video: { titre: "Vidéo de Maître Lucas : décrire pour identifier et reproduire une figure", youtube: "https://youtu.be/MIKmhe5AlXM" },
      texte:
        "Un **programme de construction** décrit, étape par étape, comment tracer une figure :\n\n" +
        "« Trace un segment [AB] de $4$ cm. Trace le cercle de centre A de rayon $4$ cm et celui de centre B de rayon $4$ cm. Ils se coupent en C. Trace [AC] et [BC]. » → on obtient un **triangle équilatéral**.\n\n" +
        "**Symétrie sur quadrillage** : le symétrique d'un point est de l'autre côté de l'axe, à la même distance, sur la perpendiculaire à l'axe (même ligne pour un axe vertical, même colonne pour un axe horizontal).",
      exemple: { enonce: "Une case est à $2$ carreaux au-dessus d'un axe horizontal. Où est sa symétrique ?", solution: "À $2$ carreaux sous l'axe, dans la même colonne." }
    }
  ],
  exercices: [
    { type: "m2g-figures", titre: "Reconnaître les figures", etape: "Les figures", nb: 6 },
    { type: "m2g-programme", titre: "Programmes de construction", etape: "Construire", nb: 4 },
    { type: "m2g-symetrie", titre: "Symétrie sur quadrillage", etape: "Symétrie", nb: 6 }
  ],
  qcm: [
    { question: "Un trapèze a :", choix: ["deux côtés parallèles", "quatre angles droits", "cinq côtés", "trois côtés"], bonne: 0, explication: "C'est sa définition." },
    { question: "Un trapèze rectangle a :", choix: ["deux angles droits", "quatre angles droits", "un seul angle droit", "aucun angle droit"], bonne: 0, explication: "Un côté perpendiculaire aux deux côtés parallèles." },
    { question: "Un hexagone a :", choix: ["$6$ côtés", "$5$ côtés", "$8$ côtés", "$7$ côtés"], bonne: 0, explication: "Hexa : six." },
    { question: "Un pentagone a :", choix: ["$5$ côtés", "$6$ côtés", "$4$ côtés", "$3$ côtés"], bonne: 0, explication: "Penta : cinq." },
    { question: "Un carré est :", choix: ["un rectangle et un losange", "un trapèze seulement", "un pentagone", "un triangle"], bonne: 0, explication: "Il a les propriétés des deux." },
    { question: "Le disque de centre O et de rayon $3$ cm contient :", choix: ["les points à $3$ cm ou moins de O", "seulement les points à $3$ cm", "les points à plus de $3$ cm", "seulement le point O"], bonne: 0, explication: "Le cercle est le bord, le disque est la surface." },
    { question: "Le diamètre d'un cercle de rayon $7$ cm mesure :", choix: ["$14$ cm", "$3{,}5$ cm", "$7$ cm", "$21$ cm"], bonne: 0, explication: "Deux rayons." },
    { question: "« Trace [AB] ; cercles de centres A et B de rayon AB ; ils se coupent en C ; trace [AC] et [BC]. » On obtient :", choix: ["un triangle équilatéral", "un carré", "un triangle rectangle", "un trapèze"], bonne: 0, explication: "AB $=$ AC $=$ BC." },
    { question: "« Trace [AB] de $5$ cm ; la perpendiculaire en A ; C sur cette droite à $3$ cm de A ; trace [BC]. » On obtient :", choix: ["un triangle rectangle", "un triangle équilatéral", "un rectangle", "un losange"], bonne: 0, explication: "Angle droit en A." },
    { question: "Deux droites perpendiculaires à une même droite sont :", choix: ["parallèles entre elles", "perpendiculaires entre elles", "sécantes", "confondues toujours"], bonne: 0, explication: "Comme les montants d'une échelle." },
    { question: "Le segment [AB] désigne :", choix: ["la portion de droite entre A et B", "la droite entière passant par A et B", "la longueur AB en cm", "le milieu de A et B"], bonne: 0, explication: "Les crochets : un segment." },
    { question: "Le symétrique d'une case à $2$ carreaux au-dessus d'un axe horizontal est :", choix: ["à $2$ carreaux en dessous, même colonne", "à $2$ carreaux à droite", "sur l'axe", "à $4$ carreaux au-dessus"], bonne: 0, explication: "Même distance, de l'autre côté." },
    { question: "Les diagonales d'un rectangle :", choix: ["ont la même longueur", "sont toujours perpendiculaires", "sont parallèles", "n'existent pas"], bonne: 0, explication: "Propriété du rectangle." },
    { question: "Les diagonales d'un losange :", choix: ["sont perpendiculaires", "sont parallèles", "sont toujours de même longueur", "n'existent pas"], bonne: 0, explication: "Elles se coupent en angle droit." },
    { question: "Pour tracer une perpendiculaire, on utilise :", choix: ["l'équerre", "le compas seul", "la balance", "le rapporteur"], bonne: 0, explication: "L'équerre a un angle droit." },
    { question: "Pour reporter une longueur, on peut utiliser :", choix: ["le compas", "l'équerre seule", "le crayon seul", "la gomme"], bonne: 0, explication: "On écarte le compas de la longueur." },
    { question: "Un triangle isocèle a :", choix: ["au moins deux côtés égaux", "trois angles droits", "quatre côtés", "aucun côté égal"], bonne: 0, explication: "Isocèle : deux côtés égaux." },
    { question: "Combien d'axes de symétrie a un hexagone régulier (tous côtés et angles égaux) ?", choix: ["$6$", "$3$", "$2$", "$1$"], bonne: 0, explication: "$3$ par les sommets opposés, $3$ par les milieux des côtés opposés." }
  ],
  methode: [
    { titre: "Suivre un programme de construction", etapes: ["Lis tout le programme une première fois.", "Exécute les étapes une par une, avec les bons instruments.", "Nomme les points au fur et à mesure.", "Observe la figure obtenue et vérifie ses propriétés."], exemple: "Deux cercles de même rayon centrés en A et B → triangle équilatéral ABC." }
  ],
  erreurs: ["Confondre cercle (la ligne) et disque (la surface).", "Appeler « trapèze » un quadrilatère sans côtés parallèles.", "Pour la symétrie par rapport à un axe horizontal, se déplacer à gauche ou à droite.", "Confondre la droite (AB) et le segment [AB]."]
};
