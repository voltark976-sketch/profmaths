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
        "Les sommets des angles égaux sont des sommets **homologues** (ils se correspondent).\n\n" +
        "Sur la figure, le troisième angle de $ABC$ vaut $180 - 40 - 75 = 65^\\circ$ : $A$ et $E$ sont homologues ($40^\\circ$), ainsi que $C$ et $D$ ($65^\\circ$), puis $B$ et $F$.",
      figure: "ts3-cours-angles",
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
        "On range les côtés de chaque triangle dans l'ordre croissant et on compare les quotients : côtés $3$, $4$, $5$ et $4{,}5$, $6$, $7{,}5$ donnent $1{,}5$ à chaque fois : semblables, avec $k = 1{,}5$.\n\n" +
        "Sur la figure, on associe le plus petit côté au plus petit, le moyen au moyen, le plus grand au plus grand.",
      figure: "ts3-cours-cotes",
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
        "Deux triangles sont **égaux** (superposables) s'ils ont leurs trois côtés égaux deux à deux, ou un angle égal compris entre deux côtés égaux, ou un côté égal compris entre deux angles égaux.\n\n" +
        "Sur la figure, $DE$ est homologue de $AB$ : $k = \\dfrac{10}{4} = 2{,}5$, donc $EF = 2{,}5 \\times BC$. (Un exemple de triangles égaux est dessiné dans la fiche méthode.)",
      figure: "ts3-cours-homologues",
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
    { question: "Un côté égal compris entre deux angles égaux deux à deux : les triangles sont :", choix: ["égaux", "seulement semblables", "isocèles", "on ne peut pas savoir"], bonne: 0, explication: "C'est un cas d'égalité." },
    { question: "Les triangles $IJK$ et $LMN$ de la figure sont :", figure: "ts3-qcm-angles", choix: ["semblables", "non semblables", "égaux", "on ne peut pas savoir sans les longueurs"], bonne: 0, explication: "Troisième angle de $IJK$ : $180 - 50 - 60 = 70^\\circ$. Les deux triangles ont des angles de $50^\\circ$, $60^\\circ$ et $70^\\circ$." },
    { question: "Sur la figure, le troisième angle du triangle $IJK$ mesure :", figure: "ts3-qcm-angles", choix: ["$70^\\circ$", "$110^\\circ$", "$60^\\circ$", "$80^\\circ$"], bonne: 0, explication: "$180 - 50 - 60 = 70^\\circ$." },
    { question: "Le coefficient d'agrandissement qui transforme $ABC$ en $DEF$ est :", figure: "ts3-qcm-k", choix: ["$1{,}5$", "$\\dfrac{2}{3}$", "$2$", "$3$"], bonne: 0, explication: "$\\dfrac{6}{4} = \\dfrac{10{,}5}{7} = \\dfrac{9}{6} = 1{,}5$." },
    { question: "Sur la figure, le côté homologue de $[AB]$ est :", figure: "ts3-qcm-homol", choix: ["$[EF]$", "$[DE]$", "$[DF]$", "$[ED]$ et $[DF]$"], bonne: 0, explication: "$A$ et $E$ ont le même angle ($30^\\circ$), $B$ et $F$ aussi ($80^\\circ$) : $[AB]$ correspond à $[EF]$." },
    { question: "Les triangles de la figure sont semblables. La longueur $EF$ vaut :", figure: "ts3-qcm-longueur", choix: ["$9$ cm", "$4$ cm", "$8$ cm", "$7{,}5$ cm"], bonne: 0, explication: "$k = \\dfrac{DE}{AB} = \\dfrac{6}{4} = 1{,}5$, donc $EF = 1{,}5 \\times 6 = 9$ cm." },
    { question: "Les triangles $RST$ et $UVW$ de la figure sont :", figure: "ts3-qcm-ccc", choix: ["égaux", "seulement semblables", "ni égaux ni semblables", "on ne peut rien dire"], bonne: 0, explication: "Leurs trois côtés sont deux à deux de même longueur : ils sont égaux." },
    { question: "D'après les angles indiqués, les triangles $RST$ et $UVW$ sont :", figure: "ts3-qcm-aaa", choix: ["semblables, mais pas égaux", "égaux", "ni égaux ni semblables", "rectangles"], bonne: 0, explication: "Mêmes angles mais tailles différentes : ils sont semblables, pas superposables." },
    { question: "Pourquoi les triangles $ABC$ et $DEF$ de la figure sont-ils égaux ?", figure: "ts3-cours-egaux", choix: ["un angle égal est compris entre deux côtés égaux", "ils ont trois angles égaux", "ils ont la même orientation", "ils ont un côté commun"], bonne: 0, explication: "$AB = DE = 5$ cm, $AC = DF = 4$ cm et l'angle compris mesure $50^\\circ$ dans les deux." },
    { question: "Deux triangles sont semblables avec $k = 3$. Le petit a une aire de $5$ cm². L'aire du grand est :", choix: ["$45$ cm²", "$15$ cm²", "$135$ cm²", "$8$ cm²"], bonne: 0, explication: "Les aires sont multipliées par $k^2 = 9$ : $5 \\times 9 = 45$ cm²." },
    { question: "$ABC$ a des angles de $90^\\circ$ et $35^\\circ$ ; $DEF$ a des angles de $90^\\circ$ et $55^\\circ$. Ces triangles sont :", choix: ["semblables", "non semblables", "égaux", "on ne peut pas savoir"], bonne: 0, explication: "Le troisième angle de $ABC$ vaut $55^\\circ$ : mêmes angles." },
    { question: "Les triangles de côtés $5$, $12$, $13$ et $10$, $24$, $26$ sont :", choix: ["semblables, $k = 2$", "égaux", "non semblables", "semblables, $k = 12$"], bonne: 0, explication: "$\\dfrac{10}{5} = \\dfrac{24}{12} = \\dfrac{26}{13} = 2$." },
    { question: "Deux triangles isocèles qui ont tous les deux un angle au sommet de $40^\\circ$ sont :", choix: ["semblables", "égaux", "rectangles", "non semblables"], bonne: 0, explication: "Les angles à la base valent $\\dfrac{180 - 40}{2} = 70^\\circ$ dans les deux triangles." }
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
      figure: "ts3-cours-angles",
      exemple: "Sur la figure : $180 - 40 - 75 = 65^\\circ$, donc les deux triangles ont des angles de $40^\\circ$, $65^\\circ$ et $75^\\circ$ : ils sont semblables."
    },
    {
      titre: "Calculer une longueur",
      etapes: [
        "Identifie deux côtés homologues connus et calcule $k$.",
        "Multiplie le côté connu par $k$ (ou divise, selon le sens).",
        "Vérifie que l'ordre de grandeur est cohérent (agrandissement ou réduction)."
      ],
      figure: "ts3-cours-homologues",
      exemple: "Sur la figure : $k = \\dfrac{DE}{AB} = \\dfrac{10}{4} = 2{,}5$, donc $EF = 2{,}5 \\times 6 = 15$."
    },
    {
      titre: "Reconnaître des triangles égaux",
      etapes: [
        "Repère les mesures égales deux à deux (côtés, angles).",
        "Vérifie l'un des trois cas : trois côtés ; un angle entre deux côtés ; un côté entre deux angles.",
        "Si seuls les angles sont égaux, les triangles sont semblables, mais pas forcément égaux."
      ],
      figure: "ts3-cours-egaux",
      exemple: "Sur la figure : angle de $50^\\circ$ compris entre des côtés de $5$ cm et $4$ cm dans les deux triangles : ils sont égaux."
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
