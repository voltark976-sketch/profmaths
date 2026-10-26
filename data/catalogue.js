/*
  CATALOGUE DU SITE
  -----------------
  La liste des niveaux et des chapitres, dans l'ordre des playlists.
  Pour ajouter un chapitre : copier une ligne { ... } et changer les valeurs.
  - id      : identifiant court, sans espace ni accent (sert dans l'adresse de la page)
  - statut  : "disponible" (page complète) ou "bientot" (affiché grisé)
  - drive   : lien du sous-dossier Drive du chapitre
  - code    : sigle affiché dans la pastille (sinon le numéro du chapitre, ou « A »)
  - fichier : nom de la variable du fichier de contenu (seulement si disponible)
  Les niveaux avec groupe: "ecole" (CP à CM2) sont derrière la carte « École » (page #ecole). Leurs chapitres
  ne sont pas dans index.html : source = fichier du chapitre, chargé à l'ouverture avec les générateurs du niveau
  (champ exercices) ; series = nombre de séries affiché avant le chargement.
  Un niveau avec groupe: "college" (6e, 5e, 4e, 3e) n'a pas sa propre carte sur l'accueil :
  il est rangé derrière la carte « Collège » (page #college). Les autres niveaux sont
  rangés derrière la carte « Lycée » (page #lycee).
*/
window.CATALOGUE = {
  niveaux: [
    {
      id: "cp",
      nom: "CP",
      groupe: "ecole",
      exercices: "assets/exercices-cp.js",
      intro: "Programme du CP en vigueur depuis la rentrée 2025 (cycle 2) : les nombres jusqu'à 100, le calcul, les problèmes, les mesures et la géométrie.",
      chapitres: [
        { id: "cp-nombres", numero: 1, titre: "Les nombres jusqu'à 100", statut: "disponible", source: "data/cp/nombres.js", series: 5, drive: "" },
        { id: "cp-comparer", numero: 2, titre: "Comparer et ranger", statut: "disponible", source: "data/cp/comparer.js", series: 4, drive: "" },
        { id: "cp-rangs-suites", numero: 3, titre: "Les rangs et les suites", statut: "disponible", source: "data/cp/rangs-suites.js", series: 4, drive: "" },
        { id: "cp-additionner-soustraire", numero: 4, titre: "Additionner et soustraire", statut: "disponible", source: "data/cp/additionner-soustraire.js", series: 4, drive: "" },
        { id: "cp-calcul-mental", numero: 5, titre: "Calcul mental", statut: "disponible", source: "data/cp/calcul-mental.js", series: 4, drive: "" },
        { id: "cp-problemes", numero: 6, titre: "Résoudre des problèmes", statut: "disponible", source: "data/cp/problemes.js", series: 3, drive: "" },
        { id: "cp-longueurs-masses", numero: 7, titre: "Longueurs et masses", statut: "disponible", source: "data/cp/longueurs-masses.js", series: 4, drive: "" },
        { id: "cp-monnaie", numero: 8, titre: "La monnaie", statut: "disponible", source: "data/cp/monnaie.js", series: 4, drive: "" },
        { id: "cp-heure", numero: 9, titre: "Lire l'heure", statut: "disponible", source: "data/cp/heure.js", series: 3, drive: "" },
        { id: "cp-solides-figures", numero: 10, titre: "Solides et figures", statut: "bientot", source: "data/cp/solides-figures.js", series: 0, drive: "" },
        { id: "cp-reperage", numero: 11, titre: "Se repérer et se déplacer", statut: "bientot", source: "data/cp/reperage.js", series: 0, drive: "" },
        { id: "cp-donnees", numero: 12, titre: "Tableaux et diagrammes", statut: "bientot", source: "data/cp/donnees.js", series: 0, drive: "" }
      ]
    },
    {
      id: "ce1",
      nom: "CE1",
      groupe: "ecole",
      exercices: "assets/exercices-ce1.js",
      intro: "Programme du CE1 en vigueur depuis la rentrée 2025 (cycle 2) : les nombres jusqu'à 1 000, les fractions, la multiplication, les mesures et la géométrie.",
      chapitres: [
        { id: "ce1-nombres", numero: 1, titre: "Les nombres jusqu'à 1 000", statut: "bientot", source: "data/ce1/nombres.js", series: 0, drive: "" },
        { id: "ce1-comparer", numero: 2, titre: "Comparer, ranger, encadrer", statut: "bientot", source: "data/ce1/comparer.js", series: 0, drive: "" },
        { id: "ce1-pair-impair", numero: 3, titre: "Pair ou impair", statut: "bientot", source: "data/ce1/pair-impair.js", series: 0, drive: "" },
        { id: "ce1-fractions", numero: 4, titre: "Les fractions", statut: "bientot", source: "data/ce1/fractions.js", series: 0, drive: "" },
        { id: "ce1-addition-soustraction", numero: 5, titre: "Addition et soustraction posées", statut: "bientot", source: "data/ce1/addition-soustraction.js", series: 0, drive: "" },
        { id: "ce1-multiplication", numero: 6, titre: "La multiplication", statut: "bientot", source: "data/ce1/multiplication.js", series: 0, drive: "" },
        { id: "ce1-calcul-mental", numero: 7, titre: "Calcul mental", statut: "bientot", source: "data/ce1/calcul-mental.js", series: 0, drive: "" },
        { id: "ce1-problemes", numero: 8, titre: "Résoudre des problèmes", statut: "bientot", source: "data/ce1/problemes.js", series: 0, drive: "" },
        { id: "ce1-longueurs-masses", numero: 9, titre: "Longueurs et masses", statut: "bientot", source: "data/ce1/longueurs-masses.js", series: 0, drive: "" },
        { id: "ce1-monnaie", numero: 10, titre: "La monnaie", statut: "bientot", source: "data/ce1/monnaie.js", series: 0, drive: "" },
        { id: "ce1-heure-durees", numero: 11, titre: "L'heure et les durées", statut: "bientot", source: "data/ce1/heure-durees.js", series: 0, drive: "" },
        { id: "ce1-solides", numero: 12, titre: "Les solides", statut: "bientot", source: "data/ce1/solides.js", series: 0, drive: "" },
        { id: "ce1-figures", numero: 13, titre: "Figures et instruments", statut: "bientot", source: "data/ce1/figures.js", series: 0, drive: "" },
        { id: "ce1-reperage-donnees", numero: 14, titre: "Se repérer, tableaux et diagrammes", statut: "bientot", source: "data/ce1/reperage-donnees.js", series: 0, drive: "" }
      ]
    },
    {
      id: "ce2",
      nom: "CE2",
      groupe: "ecole",
      exercices: "assets/exercices-ce2.js",
      intro: "Programme du CE2 en vigueur depuis la rentrée 2025 (cycle 2) : les nombres jusqu'à 10 000, les fractions, les quatre opérations, les mesures et la géométrie.",
      chapitres: [
        { id: "ce2-nombres", numero: 1, titre: "Les nombres jusqu'à 10 000", statut: "bientot", source: "data/ce2/nombres.js", series: 0, drive: "" },
        { id: "ce2-comparer", numero: 2, titre: "Comparer, ranger, encadrer", statut: "bientot", source: "data/ce2/comparer.js", series: 0, drive: "" },
        { id: "ce2-fractions", numero: 3, titre: "Les fractions", statut: "bientot", source: "data/ce2/fractions.js", series: 0, drive: "" },
        { id: "ce2-addition-soustraction", numero: 4, titre: "Addition et soustraction", statut: "bientot", source: "data/ce2/addition-soustraction.js", series: 0, drive: "" },
        { id: "ce2-multiplication", numero: 5, titre: "La multiplication posée", statut: "bientot", source: "data/ce2/multiplication.js", series: 0, drive: "" },
        { id: "ce2-division", numero: 6, titre: "Découvrir la division", statut: "bientot", source: "data/ce2/division.js", series: 0, drive: "" },
        { id: "ce2-calcul-mental", numero: 7, titre: "Calcul mental", statut: "bientot", source: "data/ce2/calcul-mental.js", series: 0, drive: "" },
        { id: "ce2-problemes", numero: 8, titre: "Résoudre des problèmes", statut: "bientot", source: "data/ce2/problemes.js", series: 0, drive: "" },
        { id: "ce2-longueurs-perimetre", numero: 9, titre: "Longueurs et périmètre", statut: "bientot", source: "data/ce2/longueurs-perimetre.js", series: 0, drive: "" },
        { id: "ce2-masses-contenances", numero: 10, titre: "Masses et contenances", statut: "bientot", source: "data/ce2/masses-contenances.js", series: 0, drive: "" },
        { id: "ce2-monnaie", numero: 11, titre: "La monnaie", statut: "bientot", source: "data/ce2/monnaie.js", series: 0, drive: "" },
        { id: "ce2-heure-durees", numero: 12, titre: "L'heure et les durées", statut: "bientot", source: "data/ce2/heure-durees.js", series: 0, drive: "" },
        { id: "ce2-solides", numero: 13, titre: "Les solides", statut: "bientot", source: "data/ce2/solides.js", series: 0, drive: "" },
        { id: "ce2-figures-symetrie", numero: 14, titre: "Figures et symétrie", statut: "bientot", source: "data/ce2/figures-symetrie.js", series: 0, drive: "" },
        { id: "ce2-donnees", numero: 15, titre: "Tableaux et diagrammes", statut: "bientot", source: "data/ce2/donnees.js", series: 0, drive: "" }
      ]
    },
    {
      id: "cm1",
      nom: "CM1",
      groupe: "ecole",
      exercices: "assets/exercices-cm1.js",
      intro: "Programme du CM1 en vigueur depuis la rentrée 2025 (cycle 3) : les grands nombres, les fractions, les nombres décimaux, l'algèbre, les mesures, la géométrie et les probabilités.",
      chapitres: [
        { id: "cm1-grands-nombres", numero: 1, titre: "Les grands nombres", statut: "bientot", source: "data/cm1/grands-nombres.js", series: 0, drive: "" },
        { id: "cm1-fractions", numero: 2, titre: "Les fractions", statut: "bientot", source: "data/cm1/fractions.js", series: 0, drive: "" },
        { id: "cm1-decimaux", numero: 3, titre: "Les nombres décimaux", statut: "bientot", source: "data/cm1/decimaux.js", series: 0, drive: "" },
        { id: "cm1-calcul-mental", numero: 4, titre: "Calcul mental", statut: "bientot", source: "data/cm1/calcul-mental.js", series: 0, drive: "" },
        { id: "cm1-operations", numero: 5, titre: "Les opérations posées", statut: "bientot", source: "data/cm1/operations.js", series: 0, drive: "" },
        { id: "cm1-division", numero: 6, titre: "La division euclidienne", statut: "bientot", source: "data/cm1/division.js", series: 0, drive: "" },
        { id: "cm1-problemes", numero: 7, titre: "Résoudre des problèmes", statut: "bientot", source: "data/cm1/problemes.js", series: 0, drive: "" },
        { id: "cm1-algebre", numero: 8, titre: "Algèbre", statut: "bientot", source: "data/cm1/algebre.js", series: 0, drive: "" },
        { id: "cm1-proportionnalite", numero: 9, titre: "La proportionnalité", statut: "bientot", source: "data/cm1/proportionnalite.js", series: 0, drive: "" },
        { id: "cm1-mesures", numero: 10, titre: "Longueurs, masses, contenances", statut: "bientot", source: "data/cm1/mesures.js", series: 0, drive: "" },
        { id: "cm1-aires", numero: 11, titre: "Les aires", statut: "bientot", source: "data/cm1/aires.js", series: 0, drive: "" },
        { id: "cm1-angles", numero: 12, titre: "Les angles", statut: "bientot", source: "data/cm1/angles.js", series: 0, drive: "" },
        { id: "cm1-durees", numero: 13, titre: "Le temps et les durées", statut: "bientot", source: "data/cm1/durees.js", series: 0, drive: "" },
        { id: "cm1-geometrie", numero: 14, titre: "Géométrie plane", statut: "bientot", source: "data/cm1/geometrie.js", series: 0, drive: "" },
        { id: "cm1-solides-reperage", numero: 15, titre: "Solides et repérage", statut: "bientot", source: "data/cm1/solides-reperage.js", series: 0, drive: "" },
        { id: "cm1-donnees-probabilites", numero: 16, titre: "Tableaux, diagrammes, probabilités", statut: "bientot", source: "data/cm1/donnees-probabilites.js", series: 0, drive: "" },
        { id: "cm1-informatique", numero: 17, titre: "Pensée informatique", statut: "bientot", source: "data/cm1/informatique.js", series: 0, drive: "" }
      ]
    },
    {
      id: "cm2",
      nom: "CM2",
      groupe: "ecole",
      exercices: "assets/exercices-cm2.js",
      intro: "Programme du CM2 en vigueur depuis la rentrée 2026 (cycle 3) : les grands nombres, les fractions, les nombres décimaux, l'algèbre, les mesures, la géométrie et les probabilités.",
      chapitres: [
        { id: "cm2-grands-nombres", numero: 1, titre: "Les grands nombres", statut: "bientot", source: "data/cm2/grands-nombres.js", series: 0, drive: "" },
        { id: "cm2-fractions", numero: 2, titre: "Les fractions", statut: "bientot", source: "data/cm2/fractions.js", series: 0, drive: "" },
        { id: "cm2-decimaux", numero: 3, titre: "Les nombres décimaux", statut: "bientot", source: "data/cm2/decimaux.js", series: 0, drive: "" },
        { id: "cm2-calcul-mental", numero: 4, titre: "Calcul mental", statut: "bientot", source: "data/cm2/calcul-mental.js", series: 0, drive: "" },
        { id: "cm2-operations", numero: 5, titre: "Les opérations posées", statut: "bientot", source: "data/cm2/operations.js", series: 0, drive: "" },
        { id: "cm2-division", numero: 6, titre: "La division", statut: "bientot", source: "data/cm2/division.js", series: 0, drive: "" },
        { id: "cm2-problemes", numero: 7, titre: "Résoudre des problèmes", statut: "bientot", source: "data/cm2/problemes.js", series: 0, drive: "" },
        { id: "cm2-algebre", numero: 8, titre: "Algèbre", statut: "bientot", source: "data/cm2/algebre.js", series: 0, drive: "" },
        { id: "cm2-proportionnalite", numero: 9, titre: "La proportionnalité", statut: "bientot", source: "data/cm2/proportionnalite.js", series: 0, drive: "" },
        { id: "cm2-mesures", numero: 10, titre: "Mesures et conversions", statut: "bientot", source: "data/cm2/mesures.js", series: 0, drive: "" },
        { id: "cm2-aires", numero: 11, titre: "Les aires", statut: "bientot", source: "data/cm2/aires.js", series: 0, drive: "" },
        { id: "cm2-angles", numero: 12, titre: "Les angles", statut: "bientot", source: "data/cm2/angles.js", series: 0, drive: "" },
        { id: "cm2-durees", numero: 13, titre: "Le temps et les durées", statut: "bientot", source: "data/cm2/durees.js", series: 0, drive: "" },
        { id: "cm2-geometrie", numero: 14, titre: "Géométrie plane", statut: "bientot", source: "data/cm2/geometrie.js", series: 0, drive: "" },
        { id: "cm2-solides-deplacements", numero: 15, titre: "Solides et déplacements", statut: "bientot", source: "data/cm2/solides-deplacements.js", series: 0, drive: "" },
        { id: "cm2-donnees", numero: 16, titre: "Tableaux et graphiques", statut: "bientot", source: "data/cm2/donnees.js", series: 0, drive: "" },
        { id: "cm2-probabilites", numero: 17, titre: "Les probabilités", statut: "bientot", source: "data/cm2/probabilites.js", series: 0, drive: "" },
        { id: "cm2-informatique", numero: 18, titre: "Pensée informatique", statut: "bientot", source: "data/cm2/informatique.js", series: 0, drive: "" }
      ]
    },
    {
      id: "sixieme",
      nom: "6e",
      groupe: "college",
      intro: "Programme de 6e en vigueur depuis la rentrée 2025 (cycle 3) : les 15 chapitres, avec cours, vidéos, exercices corrigés, QCM et fiches méthode.",
      chapitres: [
        {
          id: "sixieme-nombres",
          numero: 1,
          titre: "Nombres entiers et décimaux",
          statut: "disponible",
          drive: ""
        },
        {
          id: "sixieme-operations",
          numero: 2,
          titre: "Addition, soustraction et multiplication des décimaux",
          statut: "disponible",
          drive: ""
        },
        {
          id: "sixieme-division",
          numero: 3,
          titre: "Division euclidienne, division décimale et durées",
          statut: "disponible",
          drive: ""
        },
        {
          id: "sixieme-fractions",
          numero: 4,
          titre: "Fractions",
          statut: "disponible",
          drive: ""
        },
        {
          id: "sixieme-proportionnalite",
          numero: 5,
          titre: "Proportionnalité",
          statut: "disponible",
          drive: ""
        },
        {
          id: "sixieme-pourcentages",
          numero: 6,
          titre: "Pourcentages",
          statut: "disponible",
          drive: ""
        },
        {
          id: "sixieme-algebre",
          numero: 7,
          titre: "Pensée algébrique\u00a0: motifs et schémas en barre",
          statut: "disponible",
          drive: ""
        },
        {
          id: "sixieme-donnees-probabilites",
          numero: 8,
          titre: "Organisation de données et probabilités",
          statut: "disponible",
          drive: ""
        },
        {
          id: "sixieme-distances-cercles",
          numero: 9,
          titre: "Distances, cercles et médiatrice",
          statut: "disponible",
          drive: ""
        },
        {
          id: "sixieme-angles",
          numero: 10,
          titre: "Angles et bissectrice",
          statut: "disponible",
          drive: ""
        },
        {
          id: "sixieme-triangles",
          numero: 11,
          titre: "Triangles",
          statut: "disponible",
          drive: ""
        },
        {
          id: "sixieme-symetrie",
          numero: 12,
          titre: "Symétrie axiale",
          statut: "disponible",
          drive: ""
        },
        {
          id: "sixieme-perimetres-aires",
          numero: 13,
          titre: "Longueurs, périmètres et aires",
          statut: "disponible",
          drive: ""
        },
        {
          id: "sixieme-espace-volumes",
          numero: 14,
          titre: "Solides, vision dans l'espace et volumes",
          statut: "disponible",
          drive: ""
        },
        {
          id: "sixieme-informatique",
          numero: 15,
          titre: "Initiation à la pensée informatique",
          statut: "disponible",
          drive: ""
        }
      ]
    },
    {
      id: "cinquieme",
      nom: "5e",
      groupe: "college",
      intro: "Nouveau programme de 5e, en vigueur à la rentrée 2026 (BO n° 10 du 5 mars 2026). Les 18 chapitres, avec cours, vidéos et PDF d'Yvan Monka, exercices corrigés, QCM et fiches méthode.",
      chapitres: [
        {
          id: "cinquieme-calcul",
          numero: 1,
          titre: "Règles de calcul",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-triangles",
          numero: 2,
          titre: "Triangles",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-fractions",
          numero: 3,
          titre: "Fractions",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-proportionnalite",
          numero: 4,
          titre: "Proportionnalité et pourcentages",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-angles",
          numero: 5,
          titre: "Angles et parallélisme",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-divisibilite",
          numero: 6,
          titre: "Divisibilité",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-symetries",
          numero: 7,
          titre: "Symétries",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-relatifs",
          numero: 8,
          titre: "Nombres relatifs et repérage",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-calculs-relatifs",
          numero: 9,
          titre: "Additionner et soustraire des relatifs",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-graphiques",
          numero: 10,
          titre: "Graphiques et grandeurs en fonction d'une autre",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-calcul-litteral",
          numero: 11,
          titre: "Calcul littéral",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-parallelogrammes",
          numero: 12,
          titre: "Parallélogrammes",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-statistiques",
          numero: 13,
          titre: "Statistiques",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-equations",
          numero: 14,
          titre: "Équations",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-aires",
          numero: 15,
          titre: "Aires",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-probabilites",
          numero: 16,
          titre: "Probabilités",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-solides-volumes",
          numero: 17,
          titre: "Solides et volumes",
          statut: "disponible",
          drive: ""
        },
        {
          id: "cinquieme-informatique",
          numero: 18,
          titre: "Programmation par blocs",
          statut: "disponible",
          drive: ""
        }
      ]
    },
    {
      id: "quatrieme",
      nom: "4e",
      groupe: "college",
      intro: "Programme de 4e en vigueur en 2026-2027 (cycle 4, programme de 2020), en 15 chapitres ; les vidéos et les cours PDF sont ceux d'Yvan Monka.",
      chapitres: [
        {
          id: "quatrieme-divisibilite",
          numero: 1,
          titre: "Divisibilité et nombres premiers",
          statut: "disponible",
          drive: ""
        },
        {
          id: "quatrieme-relatifs",
          numero: 2,
          titre: "Multiplier et diviser des relatifs",
          statut: "disponible",
          drive: ""
        },
        {
          id: "quatrieme-pythagore",
          numero: 3,
          titre: "Théorème de Pythagore",
          statut: "disponible",
          drive: ""
        },
        {
          id: "quatrieme-fractions",
          numero: 4,
          titre: "Calculer avec des fractions",
          statut: "disponible",
          drive: ""
        },
        {
          id: "quatrieme-proportionnalite",
          numero: 5,
          titre: "Proportionnalité",
          statut: "disponible",
          drive: ""
        },
        {
          id: "quatrieme-espace",
          numero: 6,
          titre: "Pyramides, cônes et repérage dans l'espace",
          statut: "disponible",
          drive: ""
        },
        {
          id: "quatrieme-puissances",
          numero: 7,
          titre: "Puissances",
          statut: "disponible",
          drive: ""
        },
        {
          id: "quatrieme-thales",
          numero: 8,
          titre: "Théorème de Thalès",
          statut: "disponible",
          drive: ""
        },
        {
          id: "quatrieme-calcul-litteral",
          numero: 9,
          titre: "Calcul littéral",
          statut: "disponible",
          drive: ""
        },
        {
          id: "quatrieme-probabilites",
          numero: 10,
          titre: "Probabilités",
          statut: "disponible",
          drive: ""
        },
        {
          id: "quatrieme-cosinus",
          numero: 11,
          titre: "Cosinus d'un angle",
          statut: "disponible",
          drive: ""
        },
        {
          id: "quatrieme-translation",
          numero: 12,
          titre: "Translations",
          statut: "disponible",
          drive: ""
        },
        {
          id: "quatrieme-equations",
          numero: 13,
          titre: "Équations",
          statut: "disponible",
          drive: ""
        },
        {
          id: "quatrieme-statistiques",
          numero: 14,
          titre: "Statistiques",
          statut: "disponible",
          drive: ""
        },
        {
          id: "quatrieme-informatique",
          numero: 15,
          titre: "Programmation",
          statut: "disponible",
          drive: ""
        }
      ]
    },
    {
      id: "troisieme",
      nom: "3e",
      groupe: "college",
      intro: "Programme de 3e en vigueur en 2026-2027 (cycle 4, programme de 2020), celui du brevet 2027, en 16 chapitres ; les vidéos et les cours PDF sont ceux d'Yvan Monka.",
      chapitres: [
        {
          id: "troisieme-calcul-numerique",
          numero: 1,
          titre: "Calcul numérique : fractions et puissances",
          statut: "disponible",
          drive: ""
        },
        {
          id: "troisieme-developper",
          numero: 2,
          titre: "Développer",
          statut: "disponible",
          drive: ""
        },
        {
          id: "troisieme-factoriser",
          numero: 3,
          titre: "Factoriser",
          statut: "disponible",
          drive: ""
        },
        {
          id: "troisieme-equations",
          numero: 4,
          titre: "Équations",
          statut: "disponible",
          drive: ""
        },
        {
          id: "troisieme-arithmetique",
          numero: 5,
          titre: "Arithmétique",
          statut: "disponible",
          drive: ""
        },
        {
          id: "troisieme-fonctions",
          numero: 6,
          titre: "Notion de fonction",
          statut: "disponible",
          drive: ""
        },
        {
          id: "troisieme-fonctions-affines",
          numero: 7,
          titre: "Fonctions linéaires et affines",
          statut: "disponible",
          drive: ""
        },
        {
          id: "troisieme-proportionnalite",
          numero: 8,
          titre: "Proportionnalité et pourcentages",
          statut: "disponible",
          drive: ""
        },
        {
          id: "troisieme-probabilites",
          numero: 9,
          titre: "Probabilités",
          statut: "disponible",
          drive: ""
        },
        {
          id: "troisieme-statistiques",
          numero: 10,
          titre: "Statistiques",
          statut: "disponible",
          drive: ""
        },
        {
          id: "troisieme-thales",
          numero: 11,
          titre: "Théorème de Thalès",
          statut: "disponible",
          drive: ""
        },
        {
          id: "troisieme-triangles-semblables",
          numero: 12,
          titre: "Triangles semblables",
          statut: "disponible",
          drive: ""
        },
        {
          id: "troisieme-trigonometrie",
          numero: 13,
          titre: "Trigonométrie",
          statut: "disponible",
          drive: ""
        },
        {
          id: "troisieme-transformations",
          numero: 14,
          titre: "Transformations",
          statut: "disponible",
          drive: ""
        },
        {
          id: "troisieme-espace",
          numero: 15,
          titre: "Géométrie dans l'espace",
          statut: "disponible",
          drive: ""
        },
        {
          id: "troisieme-informatique",
          numero: 16,
          titre: "Programmation",
          statut: "disponible",
          drive: ""
        }
      ]
    },
    {
      id: "seconde",
      nom: "Seconde",
      chapitres: [
        {
          id: "seconde-ensembles",
          numero: 1,
          titre: "Ensembles de nombres et intervalles",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-fonctions",
          numero: 2,
          titre: "Généralités sur les fonctions",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1T6TrIhKIQw81y_UyeuU0X5AljmqZbbvr"
        },
        {
          id: "seconde-information-chiffree",
          numero: 3,
          titre: "Information chiffrée",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/153RvVVumMoWU_bPz6w6RypIZVkocK6Pb"
        },
        {
          id: "seconde-arithmetique",
          numero: 4,
          titre: "Arithmétique",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-calcul-litteral",
          numero: 5,
          titre: "Calcul littéral et équations",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-fonctions-affines",
          numero: 6,
          titre: "Fonctions affines, inégalités et inéquations",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-vecteurs",
          numero: 7,
          titre: "Vecteurs 1 : translation et coordonnées",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-statistiques",
          numero: 8,
          titre: "Statistiques 1 : indicateurs",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-variations",
          numero: 9,
          titre: "Variations et extremums ; fonctions carré et valeur absolue",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-tableaux-croises",
          numero: 10,
          titre: "Tableaux croisés, fréquences conditionnelles, probabilités 1",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-colinearite",
          numero: 11,
          titre: "Vecteurs 2 : colinéarité et déterminant",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-droites",
          numero: 12,
          titre: "Droites du plan",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-fonctions-reference",
          numero: 13,
          titre: "Fonctions de référence : inverse, racine carrée, cube",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-signes",
          numero: 14,
          titre: "Signes d'expressions et équations quotients",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-probabilites-conditionnelles",
          numero: 15,
          titre: "Probabilités conditionnelles et arbres pondérés",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-statistiques-2",
          numero: 16,
          titre: "Statistiques 2 et échantillonnage",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-synthese",
          numero: 17,
          titre: "Problèmes de synthèse",
          statut: "disponible",
          drive: ""
        }
      ]
    },
    {
      id: "automatismes",
      nom: "Automatismes",
      intro: "Les automatismes officiels de l'épreuve anticipée de mathématiques (programmes 2026) : la liste de Seconde, à entretenir en Première, et celle de Première.",
      chapitres: [
        {
          id: "auto-calcul-numerique",
          numero: null,
          code: "CN",
          titre: "Calcul numérique",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        },
        {
          id: "auto-calcul-algebrique",
          numero: null,
          code: "CA",
          titre: "Calcul algébrique",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        },
        {
          id: "auto-proportions",
          numero: null,
          code: "PP",
          titre: "Proportions et pourcentages",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        },
        {
          id: "auto-evolutions",
          numero: null,
          code: "EV",
          titre: "Évolutions et variations",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        },
        {
          id: "auto-fonctions",
          numero: null,
          code: "FR",
          titre: "Fonctions et représentations",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        },
        {
          id: "auto-geometrie",
          numero: null,
          code: "GE",
          titre: "Géométrie",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        },
        {
          id: "auto-statistiques",
          numero: null,
          code: "ST",
          titre: "Statistiques",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        },
        {
          id: "auto-probabilites",
          numero: null,
          code: "PR",
          titre: "Probabilités",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        },
        {
          id: "seconde-automatismes",
          numero: null,
          code: "2de",
          titre: "Dossier de Seconde : test et 10 fiches",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        }
      ]
    },
    {
      id: "premiere",
      nom: "Première spécialité",
      chapitres: [
        {
          id: "premiere-suites",
          numero: 1,
          titre: "Suites numériques : généralités",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1Ymru1W2dLIhiEgpawEdchTrVvaK8Q3n6"
        },
        {
          id: "premiere-second-degre",
          numero: 2,
          titre: "Second degré 1 : forme factorisée",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1Jw7zQe-wQDLffgycdEJuUw56iU26NGsM"
        },
        {
          id: "premiere-suites-arithmetiques",
          numero: 3,
          titre: "Suites arithmétiques",
          statut: "disponible",
          drive: ""
        },
        {
          id: "premiere-probabilites",
          numero: 4,
          titre: "Probabilités conditionnelles et indépendance",
          statut: "disponible",
          drive: ""
        },
        {
          id: "premiere-second-degre-2",
          numero: 5,
          titre: "Second degré 2 : forme canonique et discriminant",
          statut: "disponible",
          drive: ""
        },
        {
          id: "premiere-suites-geometriques",
          numero: 6,
          titre: "Suites géométriques",
          statut: "disponible",
          drive: ""
        },
        {
          id: "premiere-derivation-1",
          numero: 7,
          titre: "Dérivation 1 : point de vue local",
          statut: "disponible",
          drive: ""
        },
        {
          id: "premiere-trigonometrie",
          numero: 8,
          titre: "Trigonométrie",
          statut: "disponible",
          drive: ""
        },
        {
          id: "premiere-derivation-2",
          numero: 9,
          titre: "Dérivation 2 : point de vue global",
          statut: "disponible",
          drive: ""
        },
        {
          id: "premiere-variations",
          numero: 10,
          titre: "Variations et courbes représentatives",
          statut: "disponible",
          drive: ""
        },
        {
          id: "premiere-produit-scalaire-1",
          numero: 11,
          titre: "Produit scalaire 1",
          statut: "disponible",
          drive: ""
        },
        {
          id: "premiere-exponentielle",
          numero: 12,
          titre: "Fonction exponentielle",
          statut: "disponible",
          drive: ""
        },
        {
          id: "premiere-variables-aleatoires",
          numero: 13,
          titre: "Variables aléatoires",
          statut: "disponible",
          drive: ""
        },
        {
          id: "premiere-produit-scalaire-2",
          numero: 14,
          titre: "Produit scalaire 2",
          statut: "disponible",
          drive: ""
        },
        {
          id: "premiere-geometrie-reperee",
          numero: 15,
          titre: "Géométrie repérée",
          statut: "disponible",
          drive: ""
        },
        {
          id: "premiere-echantillons",
          numero: 16,
          titre: "Expérimentations : échantillons",
          statut: "disponible",
          drive: ""
        },
        {
          id: "premiere-epreuve-anticipee",
          numero: 17,
          titre: "Préparation à l'épreuve anticipée",
          statut: "disponible",
          drive: ""
        }
      ]
    },
    {
      id: "terminale-spe",
      nom: "Terminale spécialité",
      intro: "Les 15 chapitres dans l'ordre de la progression de l'année. Dans chaque chapitre : automatismes et algorithmique en Python.",
      chapitres: [
        {
          id: "terminale-spe-suites-recurrence",
          numero: 1,
          titre: "Suites numériques et récurrence",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-spe-derivation-convexite",
          numero: 2,
          titre: "Dérivation et convexité",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-spe-espace-1",
          numero: 3,
          titre: "Géométrie dans l'espace 1 : vecteurs, droites et plans",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-spe-limites-suites",
          numero: 4,
          titre: "Limites de suites",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-spe-loi-binomiale",
          numero: 5,
          titre: "Loi binomiale",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-spe-limites-fonctions",
          numero: 6,
          titre: "Limites de fonctions",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-spe-continuite",
          numero: 7,
          titre: "Continuité",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-spe-espace-2",
          numero: 8,
          titre: "Géométrie dans l'espace 2 : orthogonalité et distances",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-spe-logarithme",
          numero: 9,
          titre: "Fonction logarithme népérien",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-spe-primitives",
          numero: 10,
          titre: "Primitives",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-spe-equations-differentielles",
          numero: 11,
          titre: "Équations différentielles",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-spe-trigonometrie",
          numero: 12,
          titre: "Fonctions trigonométriques",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-spe-integration",
          numero: 13,
          titre: "Calcul intégral",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-spe-denombrement",
          numero: 14,
          titre: "Combinatoire et dénombrement",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-spe-grands-nombres",
          numero: 15,
          titre: "Loi des grands nombres",
          statut: "disponible",
          drive: ""
        }
      ]
    },
    {
      id: "terminale",
      nom: "Terminale maths complémentaires",
      chapitres: [
        {
          id: "terminale-suites",
          numero: 1,
          titre: "Suites et modèles discrets",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-lois-discretes",
          numero: 2,
          titre: "Lois discrètes",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1Ocg_jAIkBcx1ZyeAMo7RfSITirsgvD59"
        },
        {
          id: "terminale-arithmetico-geometriques",
          numero: 3,
          titre: "Suites arithmético-géométriques",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-limites-continuite",
          numero: 4,
          titre: "Limites de fonctions et continuité",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-inference-bayesienne",
          numero: 5,
          titre: "Probabilités conditionnelles et inférence bayésienne",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-deux-variables",
          numero: 6,
          titre: "Statistique à deux variables quantitatives",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-derivation-composees",
          numero: 7,
          titre: "Dérivation : fonctions composées et réciproques",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-logarithme",
          numero: 8,
          titre: "Fonction logarithme népérien",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-convexite",
          numero: 9,
          titre: "Fonctions convexes",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-loi-geometrique",
          numero: 10,
          titre: "Loi géométrique et temps d'attente",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-primitives-ed",
          numero: 11,
          titre: "Primitives et équations différentielles",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-integration",
          numero: 12,
          titre: "Intégration",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-lois-densite",
          numero: 13,
          titre: "Lois à densité",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-repartition-richesses",
          numero: 14,
          titre: "Répartition des richesses et inégalités",
          statut: "disponible",
          drive: ""
        },
        {
          id: "terminale-echantillonnage",
          numero: 15,
          titre: "Échantillonnage et synthèse",
          statut: "disponible",
          drive: ""
        }
      ]
    }
  ]
};
