/*
  CHAPITRE : 3e — Triangles semblables
  -------------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027) : reconnaître des
  triangles semblables (angles deux à deux égaux, ou longueurs des côtés proportionnelles) ; calculer des
  longueurs dans des triangles semblables ; triangles égaux ; effet d'un agrandissement ou d'une réduction sur
  les angles et les aires. Vidéos et cours PDF d'Yvan Monka.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-triangles-semblables"] = {
  niveau: "3e",
  numero: 12,
  titre: "Triangles semblables",
  accroche: "Mêmes angles, côtés proportionnels : reconnaître des triangles semblables et calculer des longueurs.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : triangles semblables (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Tr_sembl.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : triangles semblables (Yvan Monka)", url: "https://youtu.be/38DTCmRRvUs", type: "video" },
    { titre: "Utiliser des triangles semblables (Yvan Monka)", url: "https://youtu.be/F3SuRBTkaGM", type: "video" },
    { titre: "Utiliser des triangles égaux (Yvan Monka)", url: "https://youtu.be/rLNa5Iu_X3E", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Reconnaître par les angles",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que des triangles sont semblables (angles)", youtube: "https://youtu.be/TAeQhd1r3QI" },
      texte:
        "Deux triangles sont **semblables** si leurs angles sont deux à deux de même mesure.\n\n" +
        "Comme la somme des angles d'un triangle vaut $180^\\circ$, il suffit que **deux** angles soient égaux deux à deux.\n\n" +
        "Les sommets des angles égaux sont des sommets **homologues** (ils se correspondent).",
      exemple: {
        enonce: "$ABC$ a des angles de $40^\\circ$ et $75^\\circ$ ; $DEF$ a des angles de $65^\\circ$ et $40^\\circ$. Semblables ?",
        solution: "Le troisième angle de $ABC$ vaut $65^\\circ$ : mêmes angles, ils sont semblables."
      }
    },
    {
      titre: "Côtés proportionnels",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que des triangles sont semblables (côtés)", youtube: "https://youtu.be/LoYKBLIrCdY" },
      texte:
        "Deux triangles sont semblables si et seulement si les longueurs de leurs côtés sont **proportionnelles**.\n\n" +
        "On range les côtés de chaque triangle dans l'ordre croissant et on compare les quotients : côtés $3$, $4$, $5$ et $4{,}5$, $6$, $7{,}5$ donnent $1{,}5$ à chaque fois : semblables, avec $k = 1{,}5$.",
      exemple: {
        enonce: "Côtés $2$, $3$, $4$ et $5$, $7{,}5$, $10$ : semblables ?",
        solution: "$\\dfrac{5}{2} = \\dfrac{7{,}5}{3} = \\dfrac{10}{4} = 2{,}5$ : oui."
      }
    },
    {
      titre: "Calculer et triangles égaux",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître et utiliser des triangles semblables", youtube: "https://youtu.be/h0tnW4JqQjQ" },
      texte:
        "Si deux triangles sont semblables avec le coefficient $k$, chaque côté du second vaut $k$ fois le côté **homologue** du premier ; les angles sont les mêmes ; les aires sont multipliées par $k^2$.\n\n" +
        "Deux triangles sont **égaux** (superposables) s'ils ont leurs trois côtés égaux deux à deux, ou un angle égal compris entre deux côtés égaux, ou un côté égal compris entre deux angles égaux.",
      exemple: {
        enonce: "$ABC$ et $DEF$ semblables, $AB = 4$, $DE = 10$, $BC = 6$. Calcule $EF$.",
        solution: "$k = \\dfrac{10}{4} = 2{,}5$ ; $EF = 2{,}5 \\times 6 = 15$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "ts3-angles", titre: "Semblables par les angles", etape: "Reconnaître", nb: 6 },
    { type: "ts3-cotes", titre: "Côtés proportionnels", etape: "Reconnaître", nb: 5 },
    { type: "ts3-longueur", titre: "Calculer une longueur", etape: "Calculer", nb: 6 },
    { type: "ts3-egaux", titre: "Triangles égaux et aires", etape: "Calculer", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Deux triangles sont semblables si :", choix: ["leurs angles sont deux à deux égaux", "ils ont la même aire", "ils ont un côté commun", "ils ont le même périmètre"], bonne: 0, explication: "Définition." },
    { question: "Pour prouver que deux triangles sont semblables, il suffit de montrer que :", choix: ["deux angles sont égaux deux à deux", "un angle est égal", "un côté est égal", "les aires sont égales"], bonne: 0, explication: "Le troisième angle suit ($180^\\circ$)." },
    { question: "Triangles de côtés $4$, $6$, $8$ et $6$, $9$, $12$ :", choix: ["semblables, $k = 1{,}5$", "semblables, $k = 2$", "non semblables", "égaux"], bonne: 0, explication: "$\\dfrac{6}{4} = \\dfrac{9}{6} = \\dfrac{12}{8} = 1{,}5$." },
    { question: "Triangles de côtés $3$, $4$, $5$ et $6$, $8$, $9$ :", choix: ["non semblables", "semblables, $k = 2$", "égaux", "semblables, $k = 3$"], bonne: 0, explication: "$\\dfrac{9}{5} \\neq 2$." },
    { question: "Un agrandissement de rapport $2$ multiplie les angles par :", choix: ["$1$ (ils ne changent pas)", "$2$", "$4$", "$\\dfrac{1}{2}$"], bonne: 0, explication: "Les angles sont conservés." },
    { question: "Une réduction de rapport $\\dfrac{1}{3}$ multiplie les aires par :", choix: ["$\\dfrac{1}{9}$", "$\\dfrac{1}{3}$", "$3$", "$9$"], bonne: 0, explication: "$k^2$." },
    { question: "$ABC$ et $DEF$ semblables, $AB = 5$ et $DE = 15$. Le coefficient de $ABC$ vers $DEF$ est :", choix: ["$3$", "$\\dfrac{1}{3}$", "$10$", "$75$"], bonne: 0, explication: "$\\dfrac{15}{5}$." },
    { question: "Deux triangles égaux sont :", choix: ["semblables avec $k = 1$", "jamais semblables", "forcément rectangles", "forcément isocèles"], bonne: 0, explication: "Mêmes côtés, mêmes angles." },
    { question: "Deux triangles avec les mêmes trois angles sont :", choix: ["semblables", "égaux", "de même aire", "de même périmètre"], bonne: 0, explication: "Pas forcément de même taille." },
    { question: "Deux triangles équilatéraux sont toujours :", choix: ["semblables", "égaux", "de même aire", "rectangles"], bonne: 0, explication: "Tous leurs angles valent $60^\\circ$." },
    { question: "Dans une configuration de Thalès, les triangles $AMN$ et $ABC$ sont :", choix: ["semblables", "égaux", "sans rapport", "rectangles"], bonne: 0, explication: "Réduction de rapport $\\dfrac{AM}{AB}$." },
    { question: "Un côté égal compris entre deux angles égaux deux à deux : les triangles sont :", choix: ["égaux", "seulement semblables", "isocèles", "on ne peut pas savoir"], bonne: 0, explication: "C'est un cas d'égalité." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Montrer que deux triangles sont semblables",
      etapes: [
        "Par les angles : trouve deux angles égaux deux à deux (calcule le troisième si besoin).",
        "Par les côtés : range les côtés et vérifie que les quotients sont égaux.",
        "Repère les sommets homologues (ceux des angles égaux)."
      ],
      exemple: "$30^\\circ$, $70^\\circ$ et $80^\\circ$, $30^\\circ$ : mêmes angles, semblables."
    },
    {
      titre: "Calculer une longueur",
      etapes: [
        "Identifie deux côtés homologues connus et calcule $k$.",
        "Multiplie le côté connu par $k$ (ou divise, selon le sens).",
        "Vérifie que l'ordre de grandeur est cohérent (agrandissement ou réduction)."
      ],
      exemple: "$k = \\dfrac{9}{6} = 1{,}5$ ; côté homologue de $4$ : $6$."
    }
  ],
  erreurs: [
    "Associer des côtés qui ne sont pas homologues.",
    "Croire qu'un seul angle commun suffit.",
    "Comparer les côtés sans les ranger dans l'ordre.",
    "Penser que les angles sont multipliés par $k$.",
    "Multiplier une aire par $k$ au lieu de $k^2$."
  ]
};
