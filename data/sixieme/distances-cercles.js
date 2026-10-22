/*
  CHAPITRE : 6e — Distances, cercles et médiatrice
  -------------------------------------------------
  Programme de mathématiques du cycle 3 (BO n° 16 du 17 avril 2025), en vigueur en 6e depuis la rentrée 2025 :
  « Étude de configurations planes » : distances (définition de la distance entre deux points, du milieu d'un segment) ;
  cercles et disques (centre, rayon, diamètre, corde ; cercle et disque comme ensembles de points ; problèmes de distance
  à un point) ; médiatrice d'un segment (définition, propriété caractéristique, problèmes). Lexique, notations et codage.
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js ; segment $[AB]$, droite $(AB)$,
  demi-droite $[AB)$, longueur $AB$.
  figure : "c6-cercle" ou "c6-mediatrice" (assets/exercices-college.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["sixieme-distances-cercles"] = {
  niveau: "6e",
  numero: 9,
  titre: "Distances, cercles et médiatrice",
  accroche: "Segments, milieux, cercles et disques, puis la médiatrice : la droite de tous les points à égale distance de deux points.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : distances, cercles, médiatrice (PDF)", url: "https://www.maths-et-tiques.fr/telech/25Long.pdf" }
  ],
  liens: [
    { titre: "Tout le cours en vidéo (Yvan Monka)", url: "https://youtu.be/WPrr9ov_Hfw", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Segment, droite, demi-droite : les notations",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les notations en géométrie", youtube: "https://youtu.be/tNSF1F3AMHo" },
      texte:
        "- $[AB]$ : le **segment** d'extrémités $A$ et $B$ (il s'arrête aux deux points).\n" +
        "- $(AB)$ : la **droite** qui passe par $A$ et $B$ (elle continue des deux côtés).\n" +
        "- $[AB)$ : la **demi-droite** d'origine $A$ qui passe par $B$.\n" +
        "- $AB$ (sans crochets) : la **longueur** du segment $[AB]$, c'est-à-dire la **distance** entre $A$ et $B$. On écrit $AB = 4$ cm, et jamais « $[AB] = 4$ cm ».\n\n" +
        "Le symbole $\\in$ se lit « appartient à » : si $C$ est entre $A$ et $B$, on écrit $C \\in [AB]$. Le symbole $\\notin$ se lit « n'appartient pas à ».",
      exemple: {
        enonce: "$A$, $C$ et $B$ sont alignés dans cet ordre. Complète par $\\in$ ou $\\notin$ : $C \\ldots [AB]$ ; $A \\ldots [CB]$ ; $A \\ldots (CB)$.",
        solution: "$C \\in [AB]$ ; $A \\notin [CB]$ (le segment s'arrête en $C$) ; $A \\in (CB)$ (la droite continue)."
      }
    },
    {
      titre: "Milieu d'un segment et codage",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les symboles ∈ et ∉", youtube: "https://youtu.be/s-KelQ875a8" },
      texte:
        "Le **milieu** d'un segment $[AB]$ est le point $I$ qui est **sur le segment** et à **égale distance** de $A$ et de $B$ : $I \\in [AB]$ et $AI = IB$.\n\n" +
        "Donc $AI = IB = AB \\div 2$.\n\n" +
        "Sur une figure, on **code** les longueurs égales par le même petit signe (un trait, deux traits…) et les angles droits par un petit carré.",
      exemple: {
        enonce: "$I$ est le milieu de $[AB]$ et $AB = 7{,}4$ cm. Combien mesure $AI$ ? Un point $M$ vérifie $MA = MB$ : est-il forcément le milieu de $[AB]$ ?",
        solution: "$AI = 7{,}4 \\div 2 = 3{,}7$ cm.\n\nNon : $M$ peut être hors du segment (par exemple au-dessus). Pour être le milieu, il faut aussi $M \\in [AB]$."
      }
    },
    {
      titre: "Le cercle et le disque",
      video: { titre: "Vidéo d'Yvan Monka : connaître le vocabulaire du cercle", youtube: "https://youtu.be/aWJmz1oM_O0" },
      texte:
        "Le **cercle** de centre $O$ et de rayon $3$ cm est formé de **tous les points situés à $3$ cm de $O$**.\n\n" +
        "Le **disque** de centre $O$ et de rayon $3$ cm est formé de tous les points situés **à $3$ cm de $O$ ou moins** : le cercle et tout son intérieur.\n\n" +
        "Sur la figure :\n\n" +
        "- $[OA]$ est un **rayon** (du centre à un point du cercle) ;\n" +
        "- $[BC]$ est un **diamètre** (une corde qui passe par le centre) ; il mesure **deux rayons** ;\n" +
        "- $[DE]$ est une **corde** (elle relie deux points du cercle).",
      figure: "c6-cercle",
      exemple: {
        enonce: "Un cercle a pour diamètre $9{,}6$ cm. Quel est son rayon ? $A$ et $B$ sont deux points de ce cercle de centre $O$ : combien mesurent $OA$ et $OB$ ?",
        solution: "Rayon : $9{,}6 \\div 2 = 4{,}8$ cm.\n\n$[OA]$ et $[OB]$ sont deux rayons : $OA = OB = 4{,}8$ cm."
      }
    },
    {
      titre: "Problèmes de distance à un point",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître un point sur un cercle ou sur un disque", youtube: "https://youtu.be/DrPK1xHEJsU" },
      texte:
        "Pour savoir où est un point $M$ par rapport au cercle de centre $O$ et de rayon $r$, on compare la distance $OM$ au rayon :\n\n" +
        "- $OM = r$ : $M$ est **sur le cercle** ;\n" +
        "- $OM < r$ : $M$ est **à l'intérieur du disque** ;\n" +
        "- $OM > r$ : $M$ est **à l'extérieur du disque**.\n\n" +
        "Une chèvre attachée à un piquet par une corde de $5$ m peut brouter tout le disque de centre le piquet et de rayon $5$ m.",
      exemple: {
        enonce: "Une antenne relais couvre tous les points situés à $6$ km ou moins. Une maison est à $5{,}8$ km de l'antenne, une autre à $6{,}2$ km. Sont-elles couvertes ?",
        solution: "$5{,}8 < 6$ : la première maison est dans le disque, elle est couverte.\n\n$6{,}2 > 6$ : la seconde est hors du disque, elle n'est pas couverte."
      }
    },
    {
      titre: "La médiatrice d'un segment",
      video: { titre: "Vidéo d'Yvan Monka : construire une médiatrice avec l'équerre", youtube: "https://youtu.be/aKy4obIcRCI" },
      texte:
        "La **médiatrice** d'un segment est la droite **perpendiculaire** à ce segment qui passe par son **milieu**.\n\n" +
        "**Propriété :** un point est sur la médiatrice de $[AB]$ **si et seulement si** il est à égale distance de $A$ et de $B$.\n\n" +
        "- Si $M$ est sur la médiatrice, alors $MA = MB$.\n" +
        "- Si $MA = MB$, alors $M$ est sur la médiatrice.\n\n" +
        "Le savais-tu ? Le mot « médiatrice » a été inventé en 1923 à partir de « médiane » et « bissectrice » : « media », le milieu, et « sectrice », qui coupe.",
      figure: "c6-mediatrice",
      exemple: {
        enonce: "Sur la figure, $M$ est sur la médiatrice de $[AB]$ et $MA = 5{,}2$ cm. Combien mesure $MB$ ? Un point $P$ vérifie $PA = 3$ cm et $PB = 4$ cm : est-il sur la médiatrice ?",
        solution: "$M$ est sur la médiatrice, donc $MB = MA = 5{,}2$ cm.\n\n$PA \\neq PB$ : $P$ n'est pas sur la médiatrice."
      }
    },
    {
      titre: "Construire une médiatrice au compas",
      video: { titre: "Vidéo d'Yvan Monka : construire une médiatrice avec le compas", youtube: "https://youtu.be/9CCbE3eMSqM" },
      texte:
        "Pour tracer la médiatrice de $[AB]$ avec le compas et la règle :\n\n" +
        "- on trace deux arcs de cercle **de même rayon**, de centres $A$ et $B$ ; ils se coupent en $E$ ;\n" +
        "- de l'autre côté du segment, on recommence : les arcs se coupent en $F$ ;\n" +
        "- la médiatrice est la droite $(EF)$.\n\n" +
        "Pourquoi ça marche ? $E$ est à la même distance de $A$ et de $B$ (le rayon choisi), donc $E$ est sur la médiatrice ; de même pour $F$. Deux points suffisent pour tracer une droite.",
      exemple: {
        enonce: "Pourquoi faut-il garder le même écartement de compas pour les deux arcs ?",
        solution: "Avec le même rayon, le point d'intersection est à la même distance de $A$ et de $B$ : il est donc sur la médiatrice. Avec deux rayons différents, il ne le serait pas."
      }
    }
  ],

  videosNote: "Exercices corrigés en vidéo par Yvan Monka (maths-et-tiques).",
  videos: [
    { titre: "Construire une médiatrice", type: "Construction", youtube: "https://youtu.be/XpILo_WMXbg" },
    { titre: "Construire un cercle point par point", type: "Cercle", youtube: "https://youtu.be/tXX1vNK__gM" },
    { titre: "Triangle équilatéral et carré à la règle et au compas", type: "Défi", youtube: "https://youtu.be/331h9qRj_pY" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "c6-notations", titre: "Notations : segment, droite, demi-droite, ∈", etape: "Segments et milieux", nb: 5 },
    { type: "c6-milieu", titre: "Le milieu d'un segment", etape: "Segments et milieux", nb: 5 },
    { type: "c6-vocab", titre: "Centre, rayon, diamètre, corde", etape: "Cercles et disques", nb: 6 },
    { type: "c6-mesures", titre: "Rayon et diamètre", etape: "Cercles et disques", nb: 6 },
    { type: "c6-position", titre: "Sur le cercle, dans le disque, à l'extérieur ?", etape: "Cercles et disques", nb: 5 },
    { type: "c6-mediatrice", titre: "La médiatrice et sa propriété", etape: "Médiatrice et problèmes", nb: 6 },
    { type: "c6-probleme", titre: "Problèmes de distances", etape: "Médiatrice et problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "La droite qui passe par $A$ et $B$ se note :", choix: ["$(AB)$", "$[AB]$", "$[AB)$", "$AB$"], bonne: 0, explication: "Les parenthèses indiquent que la droite continue des deux côtés." },
    { question: "La longueur du segment $[AB]$ se note :", choix: ["$AB$", "$[AB]$", "$(AB)$", "$[AB)$"], bonne: 0, explication: "Une longueur est un nombre : on écrit $AB = 4$ cm." },
    { question: "$A$, $C$, $B$ sont alignés dans cet ordre. Quelle écriture est juste ?", choix: ["$C \\in [AB]$", "$A \\in [CB]$", "$C \\notin (AB)$", "$B \\notin [AC)$"], bonne: 0, explication: "$C$ est entre $A$ et $B$, donc sur le segment $[AB]$." },
    { question: "$I$ est le milieu de $[AB]$ et $AB = 7{,}4$ cm. Alors $AI = $", choix: ["$3{,}7$ cm", "$14{,}8$ cm", "$7{,}4$ cm", "$3{,}2$ cm"], bonne: 0, explication: "$7{,}4 \\div 2 = 3{,}7$." },
    { question: "Si $MA = MB$, le point $M$ est :", choix: ["sur la médiatrice de $[AB]$", "forcément le milieu de $[AB]$", "forcément sur la droite $(AB)$", "sur le cercle de diamètre $[AB]$"], bonne: 0, explication: "C'est la propriété de la médiatrice. $M$ n'est le milieu que s'il est aussi sur $[AB]$." },
    { question: "Sur la figure, le segment $[BC]$ est :", figure: "c6-cercle", choix: ["un diamètre", "un rayon", "une corde qui ne passe pas par le centre", "le centre"], bonne: 0, explication: "$[BC]$ relie deux points du cercle en passant par le centre $O$." },
    { question: "Sur la figure, le segment $[DE]$ est :", figure: "c6-cercle", choix: ["une corde", "un rayon", "un diamètre", "une demi-droite"], bonne: 0, explication: "$[DE]$ relie deux points du cercle sans passer par le centre." },
    { question: "Un cercle a pour rayon $4{,}5$ cm. Son diamètre mesure :", choix: ["$9$ cm", "$2{,}25$ cm", "$4{,}5$ cm", "$8{,}10$ cm"], bonne: 0, explication: "Diamètre $= 2 \\times$ rayon $= 9$ cm." },
    { question: "Le cercle de centre $O$ et de rayon $3$ cm est formé :", choix: ["des points situés à $3$ cm de $O$", "des points situés à $3$ cm de $O$ ou moins", "des points situés à plus de $3$ cm de $O$", "du seul point $O$"], bonne: 0, explication: "Le cercle, c'est seulement le « bord ». Avec « ou moins », c'est le disque." },
    { question: "Cercle de centre $O$, rayon $5$ cm. Si $OM = 4{,}9$ cm, le point $M$ est :", choix: ["à l'intérieur du disque", "sur le cercle", "à l'extérieur du disque", "au centre"], bonne: 0, explication: "$4{,}9 < 5$ : $M$ est plus près de $O$ que le cercle." },
    { question: "Cercle de centre $O$, rayon $5$ cm. Si $OM = 5$ cm, le point $M$ est :", choix: ["sur le cercle", "à l'intérieur du disque, pas sur le cercle", "à l'extérieur du disque", "le centre"], bonne: 0, explication: "$OM$ est égal au rayon." },
    { question: "Une chèvre est attachée par une corde de $4$ m. Elle peut brouter :", choix: ["un disque de rayon $4$ m", "un cercle de rayon $4$ m seulement", "un disque de rayon $8$ m", "un carré de côté $4$ m"], bonne: 0, explication: "Elle atteint tous les points à $4$ m ou moins du piquet : c'est un disque." },
    { question: "La médiatrice de $[AB]$ est :", choix: ["la droite perpendiculaire à $[AB]$ passant par son milieu", "la droite $(AB)$", "une droite perpendiculaire à $[AB]$ passant par $A$", "le milieu de $[AB]$"], bonne: 0, explication: "Médiatrice : « media » (le milieu) et « sectrice » (qui coupe), à angle droit." },
    { question: "$M$ est sur la médiatrice de $[AB]$ et $MA = 5{,}2$ cm. Alors $MB = $", figure: "c6-mediatrice", choix: ["$5{,}2$ cm", "$10{,}4$ cm", "$2{,}6$ cm", "on ne peut pas savoir"], bonne: 0, explication: "Tout point de la médiatrice est à égale distance de $A$ et de $B$." },
    { question: "Pour placer une école à égale distance de deux villages, on la met :", choix: ["sur la médiatrice du segment qui relie les villages", "seulement au milieu de la route", "dans le premier village", "n'importe où entre les deux"], bonne: 0, explication: "Les points à égale distance de deux points forment la médiatrice." },
    { question: "Pour construire la médiatrice au compas, on trace des arcs de centres $A$ et $B$ :", choix: ["de même rayon", "de rayons différents", "de rayon $AB$ obligatoirement", "sans écarter le compas"], bonne: 0, explication: "Avec le même rayon, les points d'intersection sont à égale distance de $A$ et de $B$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Utiliser les notations",
      etapes: [
        "Segment $[AB]$, droite $(AB)$, demi-droite $[AB)$ : ce sont des objets.",
        "$AB$ : c'est un nombre, la longueur (la distance de $A$ à $B$).",
        "$\\in$ : « appartient à » ; $\\notin$ : « n'appartient pas à »."
      ],
      exemple: "On écrit $AB = 4$ cm et $C \\in [AB]$."
    },
    {
      titre: "Situer un point par rapport à un cercle",
      etapes: [
        "Repère le centre $O$ et le rayon $r$.",
        "Compare la distance $OM$ au rayon.",
        "$=$ : sur le cercle ; $<$ : dans le disque ; $>$ : à l'extérieur."
      ],
      exemple: "Rayon $5$ cm, $OM = 6$ cm : $M$ est à l'extérieur du disque."
    },
    {
      titre: "Utiliser la médiatrice",
      etapes: [
        "Un point est sur la médiatrice de $[AB]$ quand il est à égale distance de $A$ et de $B$.",
        "Si on sait qu'il est sur la médiatrice, on en déduit $MA = MB$.",
        "Si on sait que $MA = MB$, on en déduit qu'il est sur la médiatrice."
      ],
      exemple: "$M$ sur la médiatrice et $MA = 5{,}2$ cm, donc $MB = 5{,}2$ cm."
    },
    {
      titre: "Construire une médiatrice",
      etapes: [
        "À l'équerre : place le milieu $I$, puis trace la perpendiculaire à $[AB]$ en $I$.",
        "Au compas : deux arcs de même rayon centrés en $A$ et en $B$, de chaque côté du segment.",
        "Trace la droite qui passe par les deux points d'intersection, et code la figure."
      ],
      exemple: "Les arcs se coupent en $E$ et $F$ : la médiatrice est $(EF)$."
    }
  ],
  erreurs: [
    "Écrire $[AB] = 4$ cm : on écrit $AB = 4$ cm.",
    "Confondre segment $[AB]$ et droite $(AB)$ : la droite ne s'arrête pas.",
    "Croire que $MA = MB$ suffit pour que $M$ soit le milieu : il faut aussi $M \\in [AB]$.",
    "Confondre le rayon et le diamètre : le diamètre mesure deux rayons.",
    "Confondre cercle et disque : le cercle n'est que le bord.",
    "Tracer une perpendiculaire qui ne passe pas par le milieu : ce n'est pas la médiatrice.",
    "Changer l'écartement du compas entre les deux arcs."
  ]
};
