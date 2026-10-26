/*
  CHAPITRE : CM1 — Géométrie plane
  ---------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : triangles (rectangle, isocèle, équilatéral), quadrilatères
  (carré, rectangle, losange), cercle (centre, rayon, diamètre) ; vocabulaire et propriétés (côtés égaux, angles droits,
  côtés parallèles) ; droites perpendiculaires et parallèles ; symétrie axiale : axes de symétrie, compléter une figure
  par symétrie sur quadrillage.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-geometrie"] = {
  niveau: "CM1",
  numero: 14,
  titre: "Géométrie plane",
  accroche: "Triangles, quadrilatères, cercles et symétrie : décrire et reconnaître les figures.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Triangles, quadrilatères, cercle",
      video: { titre: "Vidéo de Maître Lucas : les triangles (CM1-CM2)", youtube: "https://youtu.be/wHmGxm3G5ag" },
      texte:
        "- Triangle **isocèle** : $2$ côtés de même longueur ; **équilatéral** : $3$ côtés de même longueur ; **rectangle** : un angle droit.\n" +
        "- **Rectangle** : $4$ angles droits, côtés opposés parallèles et de même longueur.\n" +
        "- **Losange** : $4$ côtés de même longueur. **Carré** : $4$ angles droits et $4$ côtés égaux ; c'est à la fois un rectangle et un losange.\n" +
        "- **Cercle** de centre O et de rayon $3$ cm : tous les points à $3$ cm de O. Le **diamètre** mesure $2$ rayons ($6$ cm).",
      exemple: { enonce: "Pour tracer un cercle de diamètre $8$ cm, de combien écarte-t-on le compas ?", solution: "Du rayon : $8 \\div 2 = 4$ cm." }
    },
    {
      titre: "La symétrie axiale",
      video: { titre: "Vidéo de Maître Lucas : tracer une figure par symétrie axiale", youtube: "https://youtu.be/ZzOoIZWYxog" },
      texte:
        "Deux figures sont **symétriques** par rapport à une droite (l'**axe**) si elles se superposent quand on plie le long de cet axe.\n\n" +
        "Sur un quadrillage, le symétrique d'une case est :\n\n" +
        "- de l'**autre côté** de l'axe,\n" +
        "- à la **même distance** de l'axe,\n" +
        "- sur la même ligne (pour un axe vertical).\n\n" +
        "Une figure peut avoir un ou plusieurs **axes de symétrie** : le carré en a $4$, le rectangle $2$, le losange $2$, le cercle une infinité.",
      exemple: { enonce: "Une case est à $3$ carreaux à gauche d'un axe vertical. Où est sa symétrique ?", solution: "À $3$ carreaux à droite de l'axe, sur la même ligne." }
    }
  ],
  exercices: [
    { type: "m1g-figures", titre: "Reconnaître et décrire les figures", etape: "Les figures", nb: 6 },
    { type: "m1g-relations", titre: "Perpendiculaires et parallèles", etape: "Les figures", nb: 4 },
    { type: "m1g-symetrie", titre: "La symétrie sur quadrillage", etape: "La symétrie", nb: 6 }
  ],
  qcm: [
    { question: "Un triangle isocèle a :", choix: ["deux côtés de même longueur", "trois angles droits", "quatre côtés", "aucun côté égal"], bonne: 0, explication: "Isocèle : deux côtés égaux." },
    { question: "Un triangle équilatéral a :", choix: ["trois côtés de même longueur", "un angle droit obligatoirement", "deux côtés seulement", "quatre côtés"], bonne: 0, explication: "Tous ses côtés sont égaux." },
    { question: "Un triangle rectangle a :", choix: ["un angle droit", "deux angles droits", "quatre angles", "trois côtés égaux"], bonne: 0, explication: "C'est sa définition." },
    { question: "Un carré est :", choix: ["à la fois un rectangle et un losange", "seulement un rectangle", "un triangle", "un cercle"], bonne: 0, explication: "$4$ angles droits et $4$ côtés égaux." },
    { question: "Un losange a :", choix: ["quatre côtés de même longueur", "quatre angles droits toujours", "trois côtés", "un seul axe de symétrie"], bonne: 0, explication: "C'est sa propriété." },
    { question: "Le rayon d'un cercle de diamètre $10$ cm est :", choix: ["$5$ cm", "$10$ cm", "$20$ cm", "$15$ cm"], bonne: 0, explication: "Le diamètre fait deux rayons." },
    { question: "Tous les points d'un cercle sont :", choix: ["à la même distance du centre", "alignés", "à l'intérieur du cercle", "sur un diamètre"], bonne: 0, explication: "À une distance égale au rayon." },
    { question: "Pour tracer un cercle, on utilise :", choix: ["le compas", "l'équerre seule", "le rapporteur", "la balance"], bonne: 0, explication: "Le compas." },
    { question: "Dans un rectangle, les côtés opposés sont :", choix: ["parallèles et de même longueur", "perpendiculaires", "de longueurs différentes", "courbes"], bonne: 0, explication: "Deux longueurs, deux largeurs." },
    { question: "Combien d'axes de symétrie a un carré ?", choix: ["$4$", "$2$", "$1$", "$0$"], bonne: 0, explication: "Deux médianes et deux diagonales." },
    { question: "Combien d'axes de symétrie a un rectangle (pas carré) ?", choix: ["$2$", "$4$", "$1$", "$0$"], bonne: 0, explication: "Ses diagonales ne sont pas des axes." },
    { question: "Combien d'axes de symétrie a un triangle équilatéral ?", choix: ["$3$", "$1$", "$0$", "$2$"], bonne: 0, explication: "Un par sommet." },
    { question: "Un triangle isocèle (non équilatéral) a combien d'axes de symétrie ?", choix: ["$1$", "$3$", "$0$", "$2$"], bonne: 0, explication: "L'axe passe par le sommet principal." },
    { question: "Le symétrique d'une case à $2$ carreaux à gauche d'un axe vertical est :", choix: ["à $2$ carreaux à droite, même ligne", "à $4$ carreaux à droite", "sur l'axe", "à $2$ carreaux au-dessus"], bonne: 0, explication: "Même distance, de l'autre côté." },
    { question: "Pour vérifier qu'une figure est symétrique, on peut :", choix: ["la plier le long de l'axe", "mesurer son aire", "compter ses couleurs", "la peser"], bonne: 0, explication: "Les deux moitiés se superposent." },
    { question: "Deux droites parallèles :", choix: ["ne se coupent jamais", "se coupent en angle droit", "se coupent toujours", "forment un triangle"], bonne: 0, explication: "Même prolongées." },
    { question: "Quelle lettre a un axe de symétrie vertical ?", choix: ["M", "F", "G", "R"], bonne: 0, explication: "On peut plier M en deux moitiés pareilles." },
    { question: "Un quadrilatère qui a $4$ angles droits est :", choix: ["un rectangle", "un losange quelconque", "un triangle", "un cercle"], bonne: 0, explication: "C'est la définition du rectangle (le carré en est un)." }
  ],
  methode: [
    { titre: "Compléter une figure par symétrie sur quadrillage", etapes: ["Pour chaque point ou case, compte sa distance à l'axe en carreaux.", "Reporte la même distance de l'autre côté de l'axe, sur la même ligne.", "Relie les points obtenus dans le même ordre.", "Vérifie en imaginant le pliage."], exemple: "Une case à $3$ carreaux à gauche → $3$ carreaux à droite." },
    { titre: "Reconnaître un quadrilatère", etapes: ["Vérifie les angles droits avec l'équerre.", "Compare les longueurs des côtés avec la règle ou le compas.", "Conclus : $4$ angles droits → rectangle ; $4$ côtés égaux → losange ; les deux → carré."], exemple: "$4$ côtés de $5$ cm sans angle droit : un losange." }
  ],
  erreurs: ["Écarter le compas du diamètre au lieu du rayon.", "Croire que les diagonales d'un rectangle sont des axes de symétrie.", "Reproduire la figure à côté de l'axe au lieu de la retourner.", "Penser qu'un carré n'est pas un rectangle."]
};
