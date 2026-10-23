/*
  CHAPITRE : 5e — Parallélogrammes
  ---------------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026, partie
  « Parallélogrammes » : définir le parallélogramme ; le construire ; connaitre les propriétés caractéristiques des
  côtés opposés et des diagonales ; les utiliser pour construire ou pour donner la nature d'un quadrilatère ;
  définir les parallélogrammes particuliers (rectangle, losange, carré) et connaitre leurs propriétés
  caractéristiques. L'aire du parallélogramme est traitée au chapitre « Aires » (progression d'Yvan Monka).
  figure : "pg5-diagonales" ou "pg5-losange" (assets/exercices-cinquieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-parallelogrammes"] = {
  niveau: "5e",
  numero: 12,
  titre: "Parallélogrammes",
  accroche: "Côtés opposés parallèles, diagonales qui se coupent en leur milieu : reconnaître, construire et démontrer qu'un quadrilatère est un parallélogramme, un rectangle, un losange ou un carré.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : parallélogrammes (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Para.pdf" },
    { titre: "Cours d'Yvan Monka : parallélogrammes particuliers (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Para-part.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : parallélogrammes (Yvan Monka)", url: "https://youtu.be/BSCmpuN83us", type: "video" },
    { titre: "Comprendre la notion de réciproque (Yvan Monka)", url: "https://youtu.be/qyufGYkzie8", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Définition et propriétés",
      video: { titre: "Vidéo d'Yvan Monka : construire un parallélogramme avec ses diagonales", youtube: "https://youtu.be/UHreCqzqgpo" },
      texte:
        "**Définition** : un **parallélogramme** est un quadrilatère dont les côtés opposés sont **parallèles** deux à deux.\n\n" +
        "Si $ABCD$ est un parallélogramme, alors :\n\n" +
        "- ses côtés opposés ont la **même longueur** : $AB = CD$ et $AD = BC$ ;\n" +
        "- ses diagonales se coupent en leur **milieu** $O$ (c'est son centre de symétrie) ;\n" +
        "- ses angles opposés sont égaux, et deux angles consécutifs sont supplémentaires.",
      figure: "pg5-diagonales",
      exemple: {
        enonce: "$ABCD$ est un parallélogramme de centre $O$ avec $AB = 6$ cm, $BD = 9$ cm et $\\widehat{DAB} = 65^\\circ$. Que vaut $CD$, $OB$, $\\widehat{BCD}$ ?",
        solution: "$CD = AB = 6$ cm ; $OB = 9 \\div 2 = 4{,}5$ cm ; $\\widehat{BCD} = \\widehat{DAB} = 65^\\circ$ (angles opposés)."
      }
    },
    {
      titre: "Démontrer qu'un quadrilatère est un parallélogramme",
      video: { titre: "Vidéo d'Yvan Monka : démontrer qu'un quadrilatère est un parallélogramme", youtube: "https://youtu.be/sHMTwpf-__w" },
      texte:
        "Les propriétés précédentes sont **caractéristiques** : leurs réciproques sont vraies. Un quadrilatère (non croisé) est un parallélogramme si :\n\n" +
        "- ses diagonales ont le **même milieu** ;\n" +
        "- ou ses côtés opposés ont la **même longueur** deux à deux ;\n" +
        "- ou ses côtés opposés sont **parallèles** deux à deux (c'est la définition).\n\n" +
        "Pour construire le point $D$ tel que $ABCD$ soit un parallélogramme, on peut utiliser n'importe laquelle de ces propriétés : sur quadrillage, on va de $C$ à $D$ comme de $B$ à $A$.",
      exemple: {
        enonce: "Les segments $[EG]$ et $[FH]$ ont le même milieu $I$. Que peut-on dire du quadrilatère $EFGH$ ?",
        solution: "Ses diagonales $[EG]$ et $[FH]$ ont le même milieu : $EFGH$ est un parallélogramme."
      }
    },
    {
      titre: "Rectangle, losange, carré",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître un carré, un rectangle, un losange", youtube: "https://youtu.be/UXtlMZUUa7c" },
      texte:
        "- Un **rectangle** est un parallélogramme qui a un angle droit. Ses diagonales ont la **même longueur**.\n" +
        "- Un **losange** est un parallélogramme qui a deux côtés consécutifs de même longueur. Ses diagonales sont **perpendiculaires**.\n" +
        "- Un **carré** est à la fois un rectangle et un losange : ses diagonales ont la même longueur et sont perpendiculaires.\n\n" +
        "Réciproquement : un parallélogramme dont les diagonales ont la même longueur est un rectangle ; un parallélogramme dont les diagonales sont perpendiculaires est un losange.",
      figure: "pg5-losange",
      exemple: {
        enonce: "Sur la figure, les diagonales de $ABCD$ ont le même milieu et sont perpendiculaires. Quelle est sa nature ?",
        solution: "Diagonales de même milieu : c'est un parallélogramme. Diagonales perpendiculaires en plus : c'est un losange."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "pg5-proprietes", titre: "Utiliser les propriétés", etape: "Propriétés", nb: 6 },
    { type: "pg5-construire", titre: "Placer le quatrième sommet", etape: "Construire", nb: 5 },
    { type: "pg5-nature", titre: "Nature d'un quadrilatère", etape: "Parallélogrammes particuliers", nb: 6 },
    { type: "pg5-demontrer", titre: "Choisir la bonne propriété", etape: "Démontrer", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Un parallélogramme est un quadrilatère dont :", choix: ["les côtés opposés sont parallèles", "les quatre côtés sont égaux", "les diagonales sont perpendiculaires", "les quatre angles sont droits"], bonne: 0, explication: "C'est la définition." },
    { question: "$ABCD$ est un parallélogramme et $BC = 5$ cm. Alors :", choix: ["$AD = 5$ cm", "$AB = 5$ cm", "$CD = 5$ cm", "$AC = 5$ cm"], bonne: 0, explication: "$[BC]$ et $[AD]$ sont des côtés opposés." },
    { question: "Les diagonales d'un parallélogramme :", choix: ["se coupent en leur milieu", "sont toujours perpendiculaires", "ont toujours la même longueur", "ne se coupent pas"], bonne: 0, explication: "Propriété des diagonales." },
    { question: "$ABCD$ est un parallélogramme et $\\widehat{A} = 70^\\circ$. Alors $\\widehat{B}$ mesure :", choix: ["$110^\\circ$", "$70^\\circ$", "$90^\\circ$", "$140^\\circ$"], bonne: 0, explication: "Deux angles consécutifs sont supplémentaires." },
    { question: "Un quadrilatère dont les diagonales ont le même milieu est :", choix: ["un parallélogramme", "un rectangle", "un losange", "un trapèze"], bonne: 0, explication: "Propriété caractéristique." },
    { question: "Un parallélogramme dont les diagonales ont la même longueur est :", choix: ["un rectangle", "un losange", "un trapèze", "un cerf-volant"], bonne: 0, explication: "Propriété caractéristique du rectangle." },
    { question: "Un parallélogramme dont les diagonales sont perpendiculaires est :", choix: ["un losange", "un rectangle", "un trapèze", "toujours un carré"], bonne: 0, explication: "Propriété caractéristique du losange." },
    { question: "Un parallélogramme qui a un angle droit est :", choix: ["un rectangle", "un losange", "un carré", "un trapèze"], bonne: 0, explication: "Définition du rectangle." },
    { question: "Un losange qui a un angle droit est :", choix: ["un carré", "un rectangle non carré", "un trapèze", "un parallélogramme quelconque"], bonne: 0, explication: "Il est à la fois losange et rectangle." },
    { question: "Sur la figure, $ABCD$ est :", figure: "pg5-losange", choix: ["un losange", "un rectangle", "un carré", "un trapèze"], bonne: 0, explication: "Diagonales de même milieu et perpendiculaires." },
    { question: "Le centre de symétrie d'un parallélogramme est :", choix: ["le point d'intersection de ses diagonales", "un sommet", "le milieu d'un côté", "il n'en a pas"], bonne: 0, explication: "Les diagonales se coupent en leur milieu." },
    { question: "Les côtés d'un parallélogramme mesurent $7$ cm et $4$ cm. Son périmètre est :", choix: ["$22$ cm", "$11$ cm", "$28$ cm", "$14$ cm"], bonne: 0, explication: "$2 \\times (7 + 4)$." },
    { question: "Un carré :", choix: ["est à la fois un rectangle et un losange", "n'est pas un parallélogramme", "a des diagonales de longueurs différentes", "n'a pas d'angle droit"], bonne: 0, explication: "Il a toutes les propriétés." },
    { question: "La phrase « Si un quadrilatère est un parallélogramme, alors ses diagonales ont le même milieu » a pour réciproque :", choix: ["Si les diagonales d'un quadrilatère ont le même milieu, alors c'est un parallélogramme.", "Si un quadrilatère n'est pas un parallélogramme, alors ses diagonales n'ont pas le même milieu.", "Un parallélogramme a des diagonales.", "Si les diagonales sont égales, alors c'est un rectangle."], bonne: 0, explication: "On échange la condition et la conclusion." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Utiliser un parallélogramme",
      etapes: [
        "Côtés opposés : même longueur.",
        "Diagonales : même milieu (on divise une diagonale par $2$).",
        "Angles opposés égaux ; angles consécutifs supplémentaires."
      ],
      exemple: "$AC = 12$ cm donc $AO = 6$ cm."
    },
    {
      titre: "Démontrer qu'un quadrilatère est un parallélogramme",
      etapes: [
        "Écris ce que tu sais (codage, énoncé).",
        "Choisis la propriété : diagonales de même milieu, côtés opposés de même longueur ou parallèles.",
        "Rédige : « Si … alors … ». Conclus."
      ],
      exemple: "Les diagonales ont le même milieu, donc c'est un parallélogramme."
    },
    {
      titre: "Trouver la nature d'un parallélogramme",
      etapes: [
        "Diagonales de même longueur ou angle droit : rectangle.",
        "Diagonales perpendiculaires ou deux côtés consécutifs égaux : losange.",
        "Les deux : carré."
      ],
      exemple: "Parallélogramme à diagonales perpendiculaires et égales : carré."
    }
  ],
  erreurs: [
    "Se fier au dessin au lieu des codages.",
    "Croire que les diagonales d'un parallélogramme ont toujours la même longueur.",
    "Confondre une propriété et sa réciproque.",
    "Placer le quatrième sommet sans respecter l'ordre des lettres $ABCD$.",
    "Oublier qu'un carré est aussi un rectangle et un losange."
  ]
};
