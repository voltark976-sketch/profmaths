/*
  CHAPITRE : CE2 — Figures et symétrie
  -------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE2 : reconnaître, nommer et décrire carré, rectangle, triangle, triangle
  rectangle, losange ; propriétés des angles et égalités de longueur (carrés, rectangles, losanges) ; codage de l'angle droit
  et des longueurs égales ; reproduire et construire ; axes de symétrie (pliage, calque) ; compléter une figure par symétrie
  sur quadrillage (axe vertical ou horizontal).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce2-figures-symetrie"] = {
  niveau: "CE2",
  numero: 14,
  titre: "Figures et symétrie",
  accroche: "Le losange, les codages, et la symétrie : plier une figure pour que les deux moitiés se superposent.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Carré, rectangle, losange",
      video: { titre: "Vidéo de Maître Lucas : le quadrilatère", youtube: "https://youtu.be/x_p75G_LeiU" },
      texte:
        "- **Carré** : $4$ côtés égaux et $4$ angles droits.\n" +
        "- **Rectangle** : $4$ angles droits, côtés opposés égaux.\n" +
        "- **Losange** : $4$ côtés égaux (ses angles ne sont pas forcément droits).\n\n" +
        "**Codages** : un petit carré = angle droit ; des petits traits identiques = côtés de même longueur.",
      figure: "e2g-cours-formes",
      exemple: { enonce: "Un losange avec un angle droit est…", solution: "un carré !" }
    },
    {
      titre: "La symétrie axiale",
      video: { titre: "Vidéo de Maître Lucas : la symétrie axiale", youtube: "https://youtu.be/Otwnpst8bvA" },
      texte:
        "Une figure a un **axe de symétrie** si, en la pliant le long de cet axe, les deux moitiés se superposent exactement.\n\n" +
        "- Le carré a $4$ axes, le rectangle $2$, le losange $2$.\n" +
        "- Sur un quadrillage, le symétrique d'une case est à la **même distance de l'axe**, de l'autre côté, sur la même ligne.",
      figure: "e2g-cours-symetrie",
      exemple: { enonce: "Une case est à $3$ carreaux à gauche d'un axe vertical. Où est sa symétrique ?", solution: "À $3$ carreaux à droite de l'axe, sur la même ligne." }
    }
  ],
  exercices: [
    { type: "e2g-figures", titre: "Reconnaître et décrire les figures", etape: "Les figures", nb: 6 },
    { type: "e2g-symetrie", titre: "Axes de symétrie et cases symétriques", etape: "La symétrie", nb: 6 },
    { type: "e2l-perimetre", titre: "Périmètre des figures (révision)", etape: "Les figures", nb: 4 }
  ],
  qcm: [
    { question: "Un losange a :", choix: ["$4$ côtés de même longueur", "$4$ angles droits toujours", "$3$ côtés", "deux longueurs différentes"], bonne: 0, explication: "C'est sa propriété." },
    { question: "Un rectangle a combien d'axes de symétrie ?", choix: ["$2$", "$4$", "$1$", "$0$"], bonne: 0, explication: "Un vertical et un horizontal (pas les diagonales)." },
    { question: "Un carré a combien d'axes de symétrie ?", choix: ["$4$", "$2$", "$1$", "$0$"], bonne: 0, explication: "Deux médianes et deux diagonales." },
    { question: "Des petits traits identiques sur deux côtés veulent dire :", choix: ["ces côtés ont la même longueur", "un angle droit", "des côtés parallèles", "le milieu"], bonne: 0, explication: "C'est le codage des longueurs égales." },
    { question: "Pour vérifier un axe de symétrie, on peut :", choix: ["plier la figure", "mesurer l'aire", "peser la figure", "compter les couleurs"], bonne: 0, explication: "Les deux moitiés doivent se superposer." },
    { question: "Le symétrique d'une case à $2$ carreaux d'un axe vertical est :", choix: ["à $2$ carreaux de l'autre côté", "sur l'axe", "à $4$ carreaux du même côté", "au-dessus"], bonne: 0, explication: "Même distance, de l'autre côté." },
    { question: "Quelle lettre a un axe de symétrie vertical ?", choix: ["A", "F", "G", "J"], bonne: 0, explication: "On peut plier A en deux moitiés pareilles." },
    { question: "Un carré est-il un losange ?", choix: ["oui, ses $4$ côtés sont égaux", "non jamais", "seulement s'il est penché", "seulement s'il est petit"], bonne: 0, explication: "Un carré a $4$ côtés égaux." },
    { question: "Combien d'axes de symétrie a un cercle ?", choix: ["une infinité", "$1$", "$2$", "$0$"], bonne: 0, explication: "Toute droite passant par le centre." },
    { question: "Un triangle quelconque (tous côtés différents) a combien d'axes de symétrie ?", choix: ["$0$", "$1$", "$3$", "$2$"], bonne: 0, explication: "Aucun pliage ne marche." },
    { question: "Un losange a combien d'axes de symétrie ?", choix: ["$2$", "$4$", "$0$", "$1$"], bonne: 0, explication: "Ses deux diagonales." },
    { question: "Le petit carré dans un coin veut dire :", choix: ["angle droit", "côtés égaux", "milieu", "axe de symétrie"], bonne: 0, explication: "Codage de l'angle droit." },
    { question: "Un papillon a souvent :", choix: ["un axe de symétrie", "quatre axes", "aucun axe", "trois axes"], bonne: 0, explication: "Ses deux ailes sont symétriques." },
    { question: "Sur la figure symétrique, la case symétrique reste :", choix: ["sur la même ligne (axe vertical)", "sur la même colonne (axe vertical)", "sur l'axe", "n'importe où"], bonne: 0, explication: "Avec un axe vertical, on se déplace seulement de gauche à droite." },
    { question: "Un rectangle a combien d'angles droits ?", choix: ["$4$", "$2$", "$0$", "$1$"], bonne: 0, explication: "Tous ses angles sont droits." },
    { question: "Quelle figure a $4$ côtés égaux mais pas forcément d'angle droit ?", choix: ["le losange", "le rectangle", "le triangle", "le cercle"], bonne: 0, explication: "Le losange." },
    { question: "Un carré plié selon une diagonale :", choix: ["ses deux moitiés se superposent", "ne se superpose pas", "devient un rectangle", "devient un cercle"], bonne: 0, explication: "Les diagonales du carré sont des axes de symétrie." },
    { question: "Les côtés opposés d'un rectangle sont :", choix: ["de même longueur", "tous différents", "perpendiculaires", "courbes"], bonne: 0, explication: "Deux longueurs, deux largeurs." }
  ],
  methode: [
    { titre: "Compléter une figure par symétrie sur quadrillage", etapes: ["Pour chaque case coloriée, compte sa distance à l'axe (en carreaux).", "Compte la même distance de l'autre côté de l'axe, sur la même ligne.", "Colorie la case obtenue, puis vérifie par pliage."], figure: "e2g-cours-symetrie", exemple: "Une case à $3$ carreaux à gauche → $3$ carreaux à droite." }
  ],
  erreurs: ["Reproduire la figure à côté au lieu de la retourner.", "Ne pas compter la distance à partir de l'axe.", "Croire que les diagonales d'un rectangle sont des axes de symétrie.", "Confondre losange et carré."]
};
