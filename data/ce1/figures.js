/*
  CHAPITRE : CE1 — Figures et instruments
  ----------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE1, « La géométrie plane » :
  - vocabulaire : carré, rectangle, triangle, triangle rectangle, côté, sommet, angle, disque, cercle, centre ; point, droite,
    segment, milieu ; angle droit, aigu, obtus ;
  - reconnaître, nommer, décrire (côtés, égalités de longueur, angles droits) ; propriétés du carré et du rectangle ;
  - règle, équerre (angle droit), compas ; codage de l'angle droit.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce1-figures"] = {
  niveau: "CE1",
  numero: 13,
  titre: "Figures et instruments",
  accroche: "Carré, rectangle, triangle rectangle, cercle : les reconnaître avec la règle, l'équerre et le compas.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Les figures à connaître",
      video: { titre: "Vidéo de Maître Lucas : figures géométriques", youtube: "https://youtu.be/HkcLxx_E7XE" },
      texte:
        "- Le **carré** : $4$ côtés de même longueur et $4$ angles droits.\n" +
        "- Le **rectangle** : $4$ angles droits, côtés opposés de même longueur.\n" +
        "- Le **triangle** : $3$ côtés. Le **triangle rectangle** a un angle droit.\n" +
        "- Le **cercle** : une ligne ronde dont tous les points sont à la même distance du **centre**. L'intérieur est le **disque**.",
      figure: "e1g-cours-figures",
      exemple: {
        enonce: "Une figure a $4$ angles droits et deux côtés longs, deux côtés courts. Qu'est-ce que c'est ?",
        solution: "Un rectangle."
      }
    },
    {
      titre: "L'angle droit et l'équerre",
      video: { titre: "Vidéo de Maître Lucas : les angles droits", youtube: "https://youtu.be/4aWw-pXc8vE" },
      texte:
        "On vérifie un **angle droit** avec l'**équerre** : le coin de l'équerre doit coller exactement aux deux côtés.\n\n" +
        "On le code avec un petit carré.\n\n" +
        "- Un angle plus petit qu'un angle droit est **aigu**.\n" +
        "- Un angle plus grand qu'un angle droit est **obtus**.",
      figure: "e1g-cours-droit",
      exemple: {
        enonce: "Combien d'angles droits a un carré ?",
        solution: "$4$ angles droits."
      }
    },
    {
      titre: "Tracer un cercle avec le compas",
      video: { titre: "Vidéo de Maître Lucas : tracer un cercle, utiliser un compas", youtube: "https://youtu.be/HOO8FhFBH9Q" },
      texte:
        "1. On écarte le compas.\n" +
        "2. On plante la pointe sur le **centre**.\n" +
        "3. On tourne sans changer l'écartement.\n\n" +
        "Le milieu d'un segment est le point qui le partage en deux parties de même longueur.",
      exemple: {
        enonce: "Le compas est écarté de $3$ cm. À quelle distance du centre sont tous les points du cercle ?",
        solution: "À $3$ cm."
      }
    }
  ],

  exercices: [
    { type: "e1g-figures", titre: "Reconnaître et décrire les figures", etape: "Les figures", nb: 6 },
    { type: "e1g-angles", titre: "Droit, aigu ou obtus ?", etape: "Les angles", nb: 6 },
    { type: "e1g-mesures", titre: "Milieu, compas, côtés égaux", etape: "Les instruments", nb: 5 }
  ],

  qcm: [
    { question: "Quelle figure est un triangle rectangle ?", figure: "e1g-qcm-formes", choix: ["A", "B", "C", "Aucune"], bonne: 0, explication: "La figure A a un angle droit (petit carré)." },
    { question: "Cet angle est :", figure: "e1g-qcm-aigu", choix: ["aigu", "droit", "obtus", "plat"], bonne: 0, explication: "Il est plus petit qu'un angle droit." },
    { question: "Pour vérifier un angle droit, on utilise :", choix: ["l'équerre", "le compas", "la balance", "le mètre ruban"], bonne: 0, explication: "Le coin de l'équerre est un angle droit." },
    { question: "Pour tracer un cercle, on utilise :", choix: ["le compas", "l'équerre", "la règle seule", "la gomme"], bonne: 0, explication: "On tourne autour du centre." },
    { question: "Un carré a :", choix: ["$4$ côtés égaux et $4$ angles droits", "$3$ côtés", "$4$ côtés tous différents", "$2$ angles droits"], bonne: 0, explication: "C'est sa définition." },
    { question: "Un rectangle a combien d'angles droits ?", choix: ["$4$", "$2$", "$1$", "$0$"], bonne: 0, explication: "Ses quatre angles sont droits." },
    { question: "Dans un rectangle, les côtés opposés :", choix: ["ont la même longueur", "sont tous différents", "se croisent", "sont ronds"], bonne: 0, explication: "Deux longueurs, deux largeurs." },
    { question: "Un triangle rectangle a :", choix: ["un angle droit", "trois angles droits", "quatre côtés", "aucun angle"], bonne: 0, explication: "Un seul angle droit." },
    { question: "Le petit carré dans un coin veut dire :", choix: ["angle droit", "angle aigu", "côtés égaux", "centre"], bonne: 0, explication: "C'est le codage de l'angle droit." },
    { question: "Un angle plus grand qu'un angle droit est :", choix: ["obtus", "aigu", "droit", "nul"], bonne: 0, explication: "Obtus : plus ouvert." },
    { question: "Le point au milieu d'un cercle s'appelle :", choix: ["le centre", "le sommet", "le milieu du côté", "l'angle"], bonne: 0, explication: "Tous les points du cercle sont à la même distance du centre." },
    { question: "Le milieu d'un segment de $8$ cm est à :", choix: ["$4$ cm de chaque bout", "$8$ cm", "$2$ cm", "$16$ cm"], bonne: 0, explication: "Deux parties égales : $4$ cm." },
    { question: "Une figure a $3$ côtés. C'est :", choix: ["un triangle", "un carré", "un rectangle", "un cercle"], bonne: 0, explication: "Tri : trois." },
    { question: "Le cercle et le disque :", choix: ["le cercle est la ligne, le disque est l'intérieur", "c'est pareil", "le disque est carré", "le cercle a des côtés"], bonne: 0, explication: "Le cercle est la ligne ronde." },
    { question: "Un carré est-il aussi un rectangle ?", choix: ["oui, il a $4$ angles droits", "non, jamais", "seulement s'il est grand", "seulement s'il est rouge"], bonne: 0, explication: "Un carré a $4$ angles droits : c'est un rectangle particulier." },
    { question: "Un rectangle mesure $7$ cm de long. Le côté opposé à la longueur mesure :", choix: ["$7$ cm", "$14$ cm", "$3{,}5$ cm", "on ne peut pas savoir"], bonne: 0, explication: "Les côtés opposés d'un rectangle ont la même longueur." },
    { question: "Un angle droit ressemble :", choix: ["au coin d'une feuille", "à une ligne droite", "à un cercle", "à une pointe très fine"], bonne: 0, explication: "Le coin d'une feuille est un angle droit." },
    { question: "Combien de sommets a un triangle ?", choix: ["$3$", "$4$", "$2$", "$6$"], bonne: 0, explication: "Autant de sommets que de côtés." }
  ],

  methode: [
    {
      titre: "Reconnaître un carré ou un rectangle",
      etapes: [
        "Compte les côtés : il en faut $4$.",
        "Vérifie les $4$ angles avec l'équerre : ils doivent être droits.",
        "Mesure les côtés : tous égaux → carré ; égaux deux à deux → rectangle."
      ],
      figure: "e1g-cours-figures",
      exemple: "$4$ angles droits, côtés de $5$ cm, $3$ cm, $5$ cm, $3$ cm : un rectangle."
    }
  ],
  erreurs: [
    "Dire qu'une figure est un carré « parce qu'elle a l'air carrée » sans vérifier.",
    "Confondre cercle (la ligne) et disque (la surface).",
    "Mal placer l'équerre : le coin doit être sur le sommet de l'angle.",
    "Changer l'écartement du compas en traçant."
  ]
};
