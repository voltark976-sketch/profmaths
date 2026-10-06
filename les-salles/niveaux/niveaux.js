// =====================================================================
//  LES CHAPITRES ET LES SALLES DU JEU
// =====================================================================
//  C'est le seul fichier à modifier pour créer vos propres salles
//  et vos propres exercices.
//
//  ---- Les chapitres ----
//  Chaque chapitre correspond à une partie du programme. Il contient :
//     niveau        : "Seconde" (plus tard "Première", "Terminale")
//     titre         : le nom de la partie du programme
//     introduction  : ce que dit Athéna en entrant dans le chapitre
//     conclusion    : (facultatif) ce qu'elle dit à la fin du chapitre
//     salles        : la liste des salles, jouées dans l'ordre
//     sanctuaire    : (facultatif) une salle secrète aux problèmes plus
//                     difficiles, proposée à la fin du chapitre :
//                       sanctuaire: { sceauxOr: 5, salle: { ... } }
//                     elle s'ouvre quand le joueur a gagné au moins
//                     « sceauxOr » sceaux d'or dans les salles du chapitre
//     prologue      : (facultatif) true pour le chapitre d'introduction
//                     (le tutoriel) : il n'est pas numéroté
//
//  ---- Une salle ----
//     nom      : le nom de la salle (il doit être différent pour chaque salle)
//     notion   : (facultatif) la notion travaillée, pour vous repérer
//     fond     : le décor de la salle, au choix :
//                "temple"       intérieur éclairé à la torche
//                "jardin"       ruines à ciel ouvert, avec verdure
//                "crepuscule"   ruines au soleil couchant
//                "nuit"         observatoire sous les étoiles
//                "bibliotheque" bibliothèque d'Alexandrie
//                "orient"       maison de la sagesse de Bagdad
//                "mer"          port antique au bord de la mer
//                "brumes"       montagnes de Chine dans la brume
//                "sanctuaire"   grotte secrète aux cristaux
//     athena   : la phrase d'Athéna affichée en haut de l'écran
//     plan     : le dessin de la salle (voir ci-dessous)
//     guides   : les mathématiciens (un par lettre G du plan) :
//                nom, texte, et portrait (la coiffure du buste) :
//                "grec", "casque", "turban", "chignon", "renaissance",
//                "perruque", "xixe", "lettre", "eveque", "moderne", "femme19"
//     steles   : les exercices (un par lettre T du plan)
//     bonus    : les automatismes (un par lettre A du plan)
//     inscriptions : (facultatif) les textes d'Athéna gravés dans la salle
//                (un par lettre I du plan) : titre (facultatif), texte
//
//  ---- Le plan ----
//  Un dessin de la salle VUE DE CÔTÉ, une ligne de texte par rangée
//  de cases (le haut du texte = le haut de la salle) :
//     #  mur ou sol (on marche dessus, on ne le traverse pas)
//     .  vide (de l'air)
//     J  Talos (point de départ, exactement un par salle)
//     D  dalle : elle s'allume quand on passe dessus
//     S  sortie : une porte, fermée tant que toutes les dalles ne sont
//        pas allumées et que toutes les stèles T ne sont pas résolues
//     T  stèle de pierre : un exercice de la liste « steles »
//     A  stèle d'or : un automatisme de la liste « bonus ».
//        Elle ne garde pas la porte : elle rapporte un sceau d'or.
//     G  buste d'un mathématicien : il raconte son histoire
//     I  inscription : un texte de la liste « inscriptions », qui
//        s'affiche quand Talos passe devant
//     P  passerelle : invisible au départ, elle apparaît quand on résout
//        la stèle dont l'effet est « passerelle »
//  Les T, les A et les I sont associées à leurs listes dans l'ordre de
//  lecture : de gauche à droite sur une ligne, puis ligne par ligne,
//  en partant du haut.
//
//  ---- Un exercice (stèle ou automatisme) ----
//     titre        : le titre affiché sur le parchemin
//     enonce       : le texte de l'exercice
//     reponse      : la bonne réponse, un nombre (2.5 pour 2,5 ; 1 / 6 pour 1/6)
//     tolerance    : (facultatif) l'écart accepté, utile pour les fractions
//     unite        : (facultatif) l'unité affichée à côté de la réponse
//     indice       : (facultatif) l'aide proposée après une erreur
//     explication  : (facultatif) la correction affichée après la réussite
//     effet        : (facultatif) "passerelle" : la réponse est la longueur,
//                    en cases, de la passerelle P construite depuis le bord gauche
//  Le joueur peut répondre « 8 », « 8,0 », « 8 m », « −4 » ou « 24/3 ».
//
//  Conseils pour les plans :
//   - Talos saute à environ 2 cases de haut et franchit sans problème
//     un trou de 3 cases (pas 6) ;
//   - un trou dans la dernière ligne est un précipice : on y tombe et
//     on revient au départ de la salle (sans perdre les stèles résolues) ;
//   - toutes les lignes devraient avoir la même longueur ;
//   - n'oubliez pas les guillemets "..." et les virgules.
// =====================================================================
var CHAPITRES = [

  // =================================================================
  //  PROLOGUE : le tutoriel (se déplacer, lire les stèles)
  // =================================================================
  {
    prologue: true,
    titre: "L'éveil de Talos",
    introduction: "Éveille-toi, Talos, automate de bronze. Je suis Athéna. Ce temple garde la mémoire de celles et ceux qui ont inventé les mathématiques. Avant d'y entrer, apprends à te déplacer et à lire les stèles.",
    conclusion: "Tu es prêt. Les galeries du temple suivent le programme de Seconde : chacune est une partie du programme. La première est celle des nombres et du calcul.",
    salles: [

      {
        nom: "L'éveil",
        fond: "jardin",
        athena: "Avance vers la droite et lis les inscriptions sur ton chemin.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#...........D..............#",
        "#.........####.............#",
        "#..........................S",
        "#JI....##I.....I.........I.S",
        "################...#########"
      ],
        inscriptions: [
          {
            titre: "Se déplacer",
            texte: "Bienvenue, Talos. Avance avec les flèches ← → (ou Q et D). Saute avec Espace, ↑ ou Z. Approche-toi des inscriptions pour les lire."
          },
          {
            titre: "Les dalles d'or",
            texte: "Les dalles d'or s'allument quand Talos marche dessus. Quand toutes les dalles sont allumées, la porte s'ouvre. Celle-ci est sur l'estrade : monte par la marche."
          },
          {
            titre: "Le précipice",
            texte: "Attention au précipice ! Si Talos tombe, il revient au point de départ, sans rien perdre : les dalles allumées et les stèles résolues restent acquises."
          },
          {
            titre: "La porte de bronze",
            texte: "Voici la porte de bronze. Elle s'ouvre seulement quand la salle est résolue. Franchis-la pour passer à la salle suivante. La touche R recommence la salle si tu es coincé."
          }
        ]
      },

      {
        nom: "La première stèle",
        fond: "temple",
        athena: "Résous la stèle de pierre pour ouvrir la porte. Si tu le veux, grimpe jusqu'à la stèle d'or.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#.....................A....#",
        "#....................###...#",
        "#.................I........#",
        "#................###.......#",
        "#..........................#",
        "#............###...........S",
        "#J.I..T.I.G..............I.S",
        "############################"
      ],
        inscriptions: [
          {
            titre: "Les stèles d'or",
            texte: "Là-haut brille une stèle d'or : un automatisme, un calcul rapide à faire de tête. Elle n'ouvre pas la porte, elle est facultative. Mais chaque sceau d'or fait gagner des parures à Talos et ouvre, à la fin de chaque chapitre, un sanctuaire secret aux problèmes plus difficiles."
          },
          {
            titre: "Les stèles de pierre",
            texte: "Voici une stèle de pierre. Approche-toi et appuie sur E : elle porte un exercice du programme. Tant que ses stèles ne sont pas résolues, la porte de la salle reste fermée."
          },
          {
            titre: "Le droit à l'erreur",
            texte: "Si tu te trompes, rien n'est perdu : un indice apparaît et tu peux réessayer. Quand c'est juste, la correction s'affiche et tu gagnes un sceau de pierre. Certaines stèles transforment la salle : une passerelle, par exemple, aura exactement la longueur que tu calcules."
          },
          {
            titre: "Tes sceaux",
            texte: "En haut de l'écran, tu vois tes sceaux de pierre et tes sceaux d'or. Le bouton « Parures » montre les ornements gagnés. La liste déroulante permet de rejouer une salle déjà franchie."
          }
        ],
        guides: [
          {
            nom: "Athéna",
            portrait: "casque",
            texte: "Je suis Athéna, déesse de la sagesse. J'ai bâti ce temple pour garder la mémoire des mathématiciens. Chaque salle te racontera l'histoire de l'un d'eux, et chaque stèle que tu résoudras te rapprochera du cœur du temple."
          }
        ],
        steles: [
          {
            titre: "Calcul mental",
            enonce: "Combien font 7 × 8 ?",
            reponse: 56,
            indice: "7 × 8 = 7 × 10 − 7 × 2.",
            explication: "7 × 10 = 70 et 7 × 2 = 14, donc 7 × 8 = 70 − 14 = 56."
          }
        ],
        bonus: [
          {
            titre: "Pourcentage",
            enonce: "Combien font 25 % de 60 ?",
            reponse: 15,
            indice: "25 %, c'est un quart.",
            explication: "25 % de 60 = 60 ÷ 4 = 15."
          }
        ]
      }
    ]
  },

  // =================================================================
  {
    niveau: "Seconde",
    titre: "Nombres et calculs",
    introduction: "Voici la galerie des nombres et du calcul. Chaque salle garde le souvenir d'un mathématicien qui a fait avancer la façon de compter et de calculer.",
    conclusion: "Les nombres n'ont plus de secret pour toi. La galerie de la géométrie t'attend.",
    salles: [

      {
        nom: "La dîme de Stevin",
        notion: "Ensembles de nombres, intervalles",
        fond: "temple",
        athena: "Deux stèles gardent la porte : l'une près de toi, l'autre au-delà du précipice.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#........................A.#",
        "#.......................####",
        "#..........................#",
        "#....................###...#",
        "#................T.........#",
        "#..............####........#",
        "#..........................S",
        "#J.G..T......##............S",
        "##########...###############"
      ],
        guides: [
          {
            nom: "Simon Stevin (1548 – 1620)",
            portrait: "renaissance",
            texte: "Ingénieur à Bruges et en Hollande, j'ai publié en 1585 « La Disme », un petit livre qui apprend à tous à calculer avec les nombres décimaux. Grâce à lui, on a pris l'habitude d'écrire 0,125 plutôt que 1/8."
          }
        ],
        steles: [
          {
            titre: "Nombres décimaux",
            enonce: "Parmi les nombres 3/4 ; √2 ; −5 ; 0,125 ; 22/7 ; π, combien sont des nombres décimaux ?",
            reponse: 3,
            indice: "Un nombre décimal s'écrit avec un nombre fini de chiffres après la virgule. Calculez 3/4 et 22/7. Et un entier relatif est aussi un décimal.",
            explication: "3/4 = 0,75, −5 et 0,125 sont décimaux. 22/7 = 3,142857… (période infinie), √2 et π ne le sont pas. Il y en a 3."
          },
          {
            titre: "Intervalles",
            enonce: "Combien de nombres entiers appartiennent à l'intervalle [−2 ; 3[ ?",
            reponse: 5,
            indice: "Le crochet [ en −2 signifie que −2 est compris ; le crochet [ en 3 (tourné vers l'extérieur) signifie que 3 est exclu.",
            explication: "Les entiers de [−2 ; 3[ sont −2, −1, 0, 1 et 2 : il y en a 5."
          }
        ],
        bonus: [
          {
            titre: "Fractions",
            enonce: "Calculez 3/4 + 1/6 (réponse en fraction).",
            reponse: 11 / 12,
            tolerance: 0.0005,
            indice: "Mettez les deux fractions au même dénominateur : 12.",
            explication: "3/4 + 1/6 = 9/12 + 2/12 = 11/12."
          }
        ]
      },

      {
        nom: "Les grains de sable d'Archimède",
        notion: "Puissances, écriture scientifique",
        fond: "mer",
        athena: "Le gouffre est trop large pour sauter. La passerelle aura exactement la longueur que tu calculeras.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#.......................A..#",
        "#......................###.#",
        "#..........................#",
        "#..................###.....S",
        "#J.G..T..........T.........S",
        "#########PPPPPP#############"
      ],
        guides: [
          {
            nom: "Archimède de Syracuse (vers 287 – 212 av. J.-C.)",
            portrait: "grec",
            texte: "Dans « L'Arénaire », j'ai voulu compter les grains de sable qu'il faudrait pour remplir l'Univers. Les nombres de mon époque n'y suffisaient pas : j'ai inventé une façon d'écrire des nombres immenses, par paliers, comme vos puissances de 10."
          }
        ],
        steles: [
          {
            titre: "Puissances de 10",
            enonce: "10⁵ × 10⁻² ÷ 10⁻³ = 10ⁿ. Quelle est la valeur de n ? (La passerelle mesurera n cases.)",
            reponse: 6,
            indice: "Multiplier ajoute les exposants, diviser les soustrait : n = 5 + (−2) − (−3).",
            explication: "10⁵ × 10⁻² = 10³, puis 10³ ÷ 10⁻³ = 10³⁻⁽⁻³⁾ = 10⁶. Donc n = 6.",
            effet: "passerelle"
          },
          {
            titre: "Écriture scientifique",
            enonce: "L'écriture scientifique de 0,00042 est 4,2 × 10ⁿ. Quelle est la valeur de n ?",
            reponse: -4,
            indice: "Comptez de combien de rangs il faut déplacer la virgule pour passer de 0,00042 à 4,2.",
            explication: "0,00042 = 4,2 ÷ 10 000 = 4,2 × 10⁻⁴. Donc n = −4."
          }
        ],
        bonus: [
          {
            titre: "Puissance d'un négatif",
            enonce: "Calculez (−2)³.",
            reponse: -8,
            indice: "(−2)³ = (−2) × (−2) × (−2). Un nombre impair de facteurs négatifs donne un résultat négatif.",
            explication: "(−2) × (−2) = 4, puis 4 × (−2) = −8."
          }
        ]
      },

      {
        nom: "Le secret d'Hippase",
        notion: "Racines carrées",
        fond: "crepuscule",
        athena: "La seconde stèle est perchée en haut des marches. Plus haut encore, une stèle d'or.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#................A.........#",
        "#...............###........#",
        "#......................T...#",
        "#....................####..#",
        "#..........................#",
        "#................###.......#",
        "#..........................#",
        "#............###...........S",
        "#JG..T.....................S",
        "########...#################"
      ],
        guides: [
          {
            nom: "Hippase de Métaponte (Ve siècle av. J.-C.)",
            portrait: "grec",
            texte: "Mon école pensait que tout nombre était un rapport de deux entiers. On raconte que j'ai découvert que la diagonale d'un carré de côté 1, que vous notez √2, n'en est pas un, et que j'aurais été puni pour avoir révélé ce secret."
          }
        ],
        steles: [
          {
            titre: "Simplifier une racine",
            enonce: "On peut écrire √50 = a√2, avec a entier. Quelle est la valeur de a ?",
            reponse: 5,
            indice: "Écrivez 50 comme produit d'un carré parfait et de 2 : 50 = 25 × 2, et √(a × b) = √a × √b.",
            explication: "√50 = √(25 × 2) = √25 × √2 = 5√2. Donc a = 5."
          },
          {
            titre: "Calculer avec des racines",
            enonce: "Calculez (√3)² + √16.",
            reponse: 7,
            indice: "Pour un nombre positif a, (√a)² = a. Et √16 est le nombre positif dont le carré vaut 16.",
            explication: "(√3)² = 3 et √16 = 4, donc (√3)² + √16 = 3 + 4 = 7."
          }
        ],
        bonus: [
          {
            titre: "Racine d'un produit",
            enonce: "Calculez √(9 × 16).",
            reponse: 12,
            indice: "√(9 × 16) = √9 × √16.",
            explication: "√9 × √16 = 3 × 4 = 12 (et 9 × 16 = 144 = 12²)."
          }
        ]
      },

      {
        nom: "Les nombres premiers d'Euclide",
        notion: "Multiples, diviseurs, nombres premiers",
        fond: "bibliotheque",
        athena: "Grimpe de bloc en bloc jusqu'à la seconde stèle.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#...................A......#",
        "#..................##......#",
        "#...............T..........#",
        "#..............##..........#",
        "#..........................#",
        "#...........##.............#",
        "#..........................#",
        "#........##................S",
        "#JG...T....................S",
        "############################"
      ],
        guides: [
          {
            nom: "Euclide d'Alexandrie (IIIe siècle av. J.-C.)",
            portrait: "grec",
            texte: "Dans mes « Éléments », j'ai rassemblé les mathématiques de mon temps. J'y démontre qu'il existe une infinité de nombres premiers, ces nombres qui ont exactement deux diviseurs : 1 et eux-mêmes. Et tout entier se décompose en un produit de nombres premiers."
          }
        ],
        steles: [
          {
            titre: "Décomposition en facteurs premiers",
            enonce: "On sait que 120 = 2ᵃ × 3 × 5 (2 à la puissance a). Quelle est la valeur de a ?",
            reponse: 3,
            indice: "Divisez 120 par 3 × 5 = 15 : il reste une puissance de 2. Laquelle ?",
            explication: "120 ÷ 15 = 8 et 8 = 2 × 2 × 2 = 2³, donc a = 3."
          },
          {
            titre: "Nombres premiers",
            enonce: "Combien y a-t-il de nombres premiers inférieurs à 30 ?",
            reponse: 10,
            indice: "Écrivez les nombres de 2 à 29 et barrez les multiples de 2, de 3 et de 5 (sauf 2, 3 et 5 eux-mêmes). C'est le crible d'Ératosthène.",
            explication: "Les nombres premiers inférieurs à 30 sont 2, 3, 5, 7, 11, 13, 17, 19, 23 et 29 : il y en a 10."
          }
        ],
        bonus: [
          {
            titre: "Diviseurs",
            enonce: "Combien le nombre 12 a-t-il de diviseurs positifs ?",
            reponse: 6,
            indice: "Cherchez les couples de nombres dont le produit vaut 12 : 1 × 12, 2 × 6…",
            explication: "Les diviseurs de 12 sont 1, 2, 3, 4, 6 et 12 : il y en a 6."
          }
        ]
      },

      {
        nom: "Les lettres de Viète",
        notion: "Calcul littéral : développer, factoriser",
        fond: "jardin",
        athena: "Une dalle, deux stèles, et un précipice entre les deux.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#.........................A#",
        "#........................###",
        "#...........D..............#",
        "#.........####........###..S",
        "#J.G...T............T......S",
        "###############...##########"
      ],
        guides: [
          {
            nom: "François Viète (1540 – 1603)",
            portrait: "renaissance",
            texte: "Avocat et conseiller des rois de France, j'ai eu l'idée, en 1591, d'utiliser des lettres non seulement pour l'inconnue, mais aussi pour les nombres donnés. C'est la naissance du calcul littéral : une seule formule résout d'un coup une infinité de problèmes."
          }
        ],
        steles: [
          {
            titre: "Identité remarquable",
            enonce: "En développant, (2x + 3)² = 4x² + bx + 9. Quelle est la valeur de b ?",
            reponse: 12,
            indice: "(a + b)² = a² + 2ab + b², avec ici a = 2x et b = 3.",
            explication: "(2x + 3)² = (2x)² + 2 × 2x × 3 + 3² = 4x² + 12x + 9. Donc b = 12."
          },
          {
            titre: "Factoriser",
            enonce: "On peut écrire x² − 25 = (x − 5)(x + a). Quelle est la valeur de a ?",
            reponse: 5,
            indice: "Reconnaissez a² − b² = (a − b)(a + b).",
            explication: "x² − 25 = x² − 5² = (x − 5)(x + 5). Donc a = 5."
          }
        ],
        bonus: [
          {
            titre: "Développer",
            enonce: "En développant, −2(x − 4) = −2x + c. Quelle est la valeur de c ?",
            reponse: 8,
            indice: "Multipliez −2 par chacun des deux termes : −2 × x et −2 × (−4).",
            explication: "−2(x − 4) = −2x + (−2) × (−4) = −2x + 8. Donc c = 8."
          }
        ]
      },

      {
        nom: "Le pont d'al-jabr",
        notion: "Équations",
        fond: "orient",
        athena: "Encore un gouffre. Résous l'équation et la passerelle aura la bonne longueur.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#.....................A....#",
        "#....................###...S",
        "#J.G..T...........T........S",
        "#########PPPPPP#############",
        "#########......#############",
        "#########......#############",
        "#########......#############",
        "#########......#############"
      ],
        guides: [
          {
            nom: "Al-Khwarizmi (vers 780 – vers 850)",
            portrait: "turban",
            texte: "J'ai travaillé à Bagdad, à la Maison de la sagesse. Mon livre « al-jabr » explique comment résoudre les équations en déplaçant et en regroupant les termes : il a donné son nom à l'algèbre. Et mon propre nom, déformé, est devenu le mot « algorithme »."
          }
        ],
        steles: [
          {
            titre: "Équation du premier degré",
            enonce: "Résolvez l'équation 5x − 4 = 2x + 14. La passerelle mesurera x cases.",
            reponse: 6,
            indice: "Regroupez les termes en x d'un côté et les nombres de l'autre : 5x − 2x = 14 + 4.",
            explication: "5x − 2x = 14 + 4, donc 3x = 18, donc x = 18 ÷ 3 = 6.",
            effet: "passerelle"
          },
          {
            titre: "Équation produit nul",
            enonce: "L'équation (x − 3)(2x + 8) = 0 a deux solutions. Quelle est leur somme ?",
            reponse: -1,
            indice: "Un produit est nul si et seulement si l'un de ses facteurs est nul : x − 3 = 0 ou 2x + 8 = 0.",
            explication: "x − 3 = 0 donne x = 3 ; 2x + 8 = 0 donne x = −4. La somme vaut 3 + (−4) = −1."
          }
        ],
        bonus: [
          {
            titre: "Équation simple",
            enonce: "Résolvez 2x = 7 (réponse en nombre décimal).",
            reponse: 3.5,
            indice: "Divisez les deux membres par 2.",
            explication: "x = 7 ÷ 2 = 3,5."
          }
        ]
      },

      {
        nom: "Les signes de Harriot",
        notion: "Inéquations, valeur absolue",
        fond: "nuit",
        athena: "Dernière salle de la galerie des nombres. La seconde stèle est tout en haut.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#............T........A....#",
        "#...........###......###...#",
        "#..........................#",
        "#...............###........#",
        "#..........................#",
        "#...........###............#",
        "#..........................#",
        "#.......###................S",
        "#J.G..T....................S",
        "############################"
      ],
        guides: [
          {
            nom: "Thomas Harriot (1560 – 1621)",
            portrait: "renaissance",
            texte: "Astronome et mathématicien anglais, j'ai été l'un des premiers à observer la Lune à la lunette. Dans mon traité d'algèbre, publié en 1631 après ma mort, apparaissent les symboles < et > que vous utilisez pour écrire les inégalités."
          }
        ],
        steles: [
          {
            titre: "Inéquation",
            enonce: "L'inéquation −3x + 6 > 0 équivaut à x < a. Quelle est la valeur de a ?",
            reponse: 2,
            indice: "−3x > −6, puis divisez par −3. Attention : diviser par un nombre négatif change le sens de l'inégalité.",
            explication: "−3x + 6 > 0 ⇔ −3x > −6 ⇔ x < 2 (on divise par −3 et on change le sens). Donc a = 2."
          },
          {
            titre: "Plus petit entier",
            enonce: "Quel est le plus petit entier n tel que 5n − 3 > 20 ?",
            reponse: 5,
            indice: "Résolvez d'abord 5n − 3 > 20 : vous trouvez n > un nombre décimal.",
            explication: "5n − 3 > 20 ⇔ 5n > 23 ⇔ n > 4,6. Le plus petit entier qui convient est 5."
          }
        ],
        bonus: [
          {
            titre: "Valeur absolue",
            enonce: "Calculez |−7| + |3|.",
            reponse: 10,
            indice: "La valeur absolue d'un nombre est sa distance à zéro : elle est toujours positive.",
            explication: "|−7| = 7 et |3| = 3, donc |−7| + |3| = 10."
          }
        ]
      }
    ],
    // Le sanctuaire secret du chapitre : il s'ouvre avec assez de sceaux d'or.
    sanctuaire: {
      sceauxOr: 5,
      salle: {
        nom: "Le sanctuaire des nombres",
        notion: "Problèmes : racines carrées, puissances, équations",
        fond: "sanctuaire",
        athena: "Le sanctuaire des nombres ne s'ouvre qu'aux esprits patients. La passerelle aura la longueur de ta réponse.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#....................A.....#",
        "#...................###....#",
        "#........................T.#",
        "#.......................##.#",
        "#..........................#",
        "#....................##....S",
        "#J.G.T.............T.......S",
        "########PPPPPPPPPP##########",
        "########..........##########",
        "########..........##########",
        "########..........##########"
      ],
        guides: [
          {
            nom: "Sophie Germain (1776 – 1831)",
            portrait: "femme19",
            texte: "Les écoles m'étaient fermées parce que j'étais une femme. J'ai étudié seule, la nuit, à la bougie, et j'ai écrit au grand Gauss sous un nom d'homme, « Monsieur Le Blanc ». Mes travaux sur les nombres premiers portent encore mon nom : les « nombres premiers de Sophie Germain »."
          }
        ],
        steles: [
          {
            titre: "Racines carrées",
            enonce: "On peut écrire √12 + √27 sous la forme a√3, avec a entier. Quelle est la valeur de a ?",
            reponse: 5,
            indice: "12 = 4 × 3 et 27 = 9 × 3, donc √12 = √4 × √3 = 2√3.",
            explication: "√12 = 2√3 et √27 = 3√3, donc √12 + √27 = 5√3 : a = 5."
          },
          {
            titre: "Puissances de 2",
            enonce: "Quel est le plus petit entier n tel que 2ⁿ > 1 000 ? La passerelle aura n cases.",
            reponse: 10,
            effet: "passerelle",
            indice: "Calculez les puissances de 2 les unes après les autres : 2, 4, 8, 16, 32…",
            explication: "2⁹ = 512 est plus petit que 1 000 et 2¹⁰ = 1 024 est plus grand : n = 10."
          },
          {
            titre: "Le rectangle",
            enonce: "Un rectangle a un périmètre de 30 cm et une aire de 56 cm². Quelle est sa longueur (son plus grand côté) ?",
            reponse: 8,
            unite: "cm",
            indice: "Si L et l sont les côtés : L + l = 15 et L × l = 56. Cherchez deux nombres dont la somme est 15 et le produit 56.",
            explication: "8 + 7 = 15 et 8 × 7 = 56 : les côtés mesurent 8 cm et 7 cm, la longueur est 8 cm."
          }
        ],
        bonus: [
          {
            titre: "Produit de décimaux",
            enonce: "Calculez 0,5 × 0,04.",
            reponse: 0.02,
            tolerance: 1e-9,
            indice: "Multiplier par 0,5, c'est prendre la moitié.",
            explication: "La moitié de 0,04 est 0,02."
          }
        ]
      }
    }
  },

  // =================================================================
  {
    niveau: "Seconde",
    titre: "Géométrie : vecteurs, repérage et droites",
    introduction: "Voici la galerie de la géométrie. Ici, les points deviennent des nombres et les déplacements des vecteurs.",
    conclusion: "Tu sais te repérer dans le plan. La suite du temple est encore en construction.",
    salles: [

      {
        nom: "Le repère de Descartes",
        notion: "Coordonnées, milieu, vecteurs",
        fond: "jardin",
        athena: "Une dalle et deux stèles. Pour atteindre la plus haute, saute de plateforme en plateforme.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#....T........D............#",
        "#...###.....#####..........#",
        "#........................A.#",
        "#.......###.............####",
        "#..........................#",
        "#....##...............##...S",
        "#JG................T.......S",
        "############################"
      ],
        guides: [
          {
            nom: "René Descartes (1596 – 1650)",
            portrait: "perruque",
            texte: "Dans « La Géométrie », en 1637, j'ai montré qu'on peut repérer un point par des nombres, ses coordonnées, et ainsi transformer un problème de géométrie en calcul. On raconte que l'idée m'est venue en regardant une mouche se déplacer au plafond."
          }
        ],
        steles: [
          {
            titre: "Milieu d'un segment",
            enonce: "Dans un repère, A(−1 ; 3) et B(5 ; −1). Quelle est l'abscisse du milieu I du segment [AB] ?",
            reponse: 2,
            indice: "L'abscisse du milieu est la moyenne des abscisses : (xA + xB) ÷ 2.",
            explication: "xI = (−1 + 5) ÷ 2 = 4 ÷ 2 = 2. De même yI = (3 + (−1)) ÷ 2 = 1, donc I(2 ; 1)."
          },
          {
            titre: "Coordonnées d'un vecteur",
            enonce: "Avec les mêmes points A(−1 ; 3) et B(5 ; −1), quelle est l'ordonnée du vecteur AB ?",
            reponse: -4,
            indice: "Le vecteur AB a pour coordonnées (xB − xA ; yB − yA). Attention à l'ordre : B moins A.",
            explication: "yB − yA = −1 − 3 = −4. Le vecteur AB a pour coordonnées (6 ; −4)."
          }
        ],
        bonus: [
          {
            titre: "Distance sur une verticale",
            enonce: "A(2 ; 5) et B(2 ; −1). Quelle est la distance AB ?",
            reponse: 6,
            indice: "Les deux points ont la même abscisse : ils sont sur une même droite verticale.",
            explication: "AB = 5 − (−1) = 6."
          }
        ]
      },

      {
        nom: "La relation de Chasles",
        notion: "Somme de vecteurs",
        fond: "temple",
        athena: "Trois précipices, deux stèles. Saute sans crainte : le vide est moins large qu'il n'en a l'air.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#.................A........#",
        "#................###.......S",
        "#J.G.T......T..............S",
        "########...###...####...####"
      ],
        guides: [
          {
            nom: "Michel Chasles (1793 – 1880)",
            portrait: "xixe",
            texte: "Polytechnicien, professeur à la Sorbonne, j'ai consacré ma vie à la géométrie et à son histoire. La relation qui porte mon nom dit qu'aller de A à B puis de B à C revient à aller directement de A à C : AB + BC = AC."
          }
        ],
        steles: [
          {
            titre: "Somme de deux vecteurs",
            enonce: "On donne les vecteurs u(2 ; −1) et v(3 ; 4). Quelle est l'abscisse du vecteur u + v ?",
            reponse: 5,
            indice: "Pour additionner deux vecteurs, on additionne leurs abscisses entre elles et leurs ordonnées entre elles.",
            explication: "u + v a pour coordonnées (2 + 3 ; −1 + 4) = (5 ; 3)."
          },
          {
            titre: "Relation de Chasles",
            enonce: "Le vecteur AB a pour coordonnées (1 ; 3) et le vecteur BC (4 ; −5). Quelle est l'ordonnée du vecteur AC ?",
            reponse: -2,
            indice: "D'après la relation de Chasles, AC = AB + BC.",
            explication: "AC = AB + BC a pour coordonnées (1 + 4 ; 3 + (−5)) = (5 ; −2)."
          }
        ],
        bonus: [
          {
            titre: "Produit par un réel",
            enonce: "u(2 ; −1). Quelle est l'ordonnée du vecteur 3u ?",
            reponse: -3,
            indice: "Multipliez chaque coordonnée par 3.",
            explication: "3u a pour coordonnées (3 × 2 ; 3 × (−1)) = (6 ; −3)."
          }
        ]
      },

      {
        nom: "L'école d'Hypatie",
        notion: "Distance dans un repère orthonormé",
        fond: "bibliotheque",
        athena: "La seconde stèle est au sommet. La stèle d'or se cache sur un balcon, à gauche.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#.....................T....#",
        "#....................###...#",
        "#..........................#",
        "#................###.......#",
        "#......A...................#",
        "#.....###....###...........#",
        "#..........................#",
        "#........###...............S",
        "#J.G.T.....................S",
        "############################"
      ],
        guides: [
          {
            nom: "Hypatie d'Alexandrie (vers 360 – 415)",
            portrait: "chignon",
            texte: "J'ai enseigné les mathématiques, l'astronomie et la philosophie à Alexandrie, où des élèves venaient de tout le monde méditerranéen. J'ai commenté les livres de Diophante et d'Apollonius sur les nombres et les courbes. Je suis l'une des premières mathématiciennes dont l'histoire a gardé le nom."
          }
        ],
        steles: [
          {
            titre: "Distance entre deux points",
            enonce: "Dans un repère orthonormé, A(1 ; 1) et B(4 ; 5). Calculez la distance AB.",
            reponse: 5,
            indice: "AB = √((xB − xA)² + (yB − yA)²).",
            explication: "AB = √(3² + 4²) = √(9 + 16) = √25 = 5."
          },
          {
            titre: "Triangle isocèle",
            enonce: "Dans un repère orthonormé, A(−2 ; 0), B(4 ; 0) et C(1 ; 4). Calculez AC² (le carré de la distance AC).",
            reponse: 25,
            indice: "AC² = (xC − xA)² + (yC − yA)².",
            explication: "AC² = (1 − (−2))² + (4 − 0)² = 9 + 16 = 25. On trouve aussi BC² = 9 + 16 = 25 : le triangle est isocèle en C."
          }
        ],
        bonus: [
          {
            titre: "Périmètre",
            enonce: "Quel est le périmètre d'un carré de côté 2,5 ?",
            reponse: 10,
            indice: "Un carré a quatre côtés égaux.",
            explication: "4 × 2,5 = 10."
          }
        ]
      },

      {
        nom: "Le déterminant de Cramer",
        notion: "Colinéarité de deux vecteurs",
        fond: "crepuscule",
        athena: "Une dalle tout en haut ouvre la porte avec les deux stèles.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#.............D............#",
        "#............###...........#",
        "#........................A.#",
        "#................###....####",
        "#..........................#",
        "#............###.....##....S",
        "#J.G..T...............T....S",
        "#########...################"
      ],
        guides: [
          {
            nom: "Gabriel Cramer (1704 – 1752)",
            portrait: "perruque",
            texte: "Professeur à Genève, j'ai publié en 1750 une méthode pour résoudre les systèmes d'équations à l'aide de certains calculs croisés, qu'on appelle aujourd'hui des déterminants. Le déterminant de deux vecteurs dit s'ils sont colinéaires : il est nul exactement dans ce cas."
          }
        ],
        steles: [
          {
            titre: "Déterminant",
            enonce: "Calculez le déterminant des vecteurs u(2 ; 3) et v(4 ; −1), c'est-à-dire x × y' − y × x'.",
            reponse: -14,
            indice: "det(u, v) = 2 × (−1) − 3 × 4.",
            explication: "det(u, v) = 2 × (−1) − 3 × 4 = −2 − 12 = −14. Il n'est pas nul : u et v ne sont pas colinéaires."
          },
          {
            titre: "Vecteurs colinéaires",
            enonce: "Les vecteurs u(2 ; 3) et v(6 ; k) sont colinéaires. Quelle est la valeur de k ?",
            reponse: 9,
            indice: "Ils sont colinéaires si et seulement si leur déterminant est nul : 2 × k − 3 × 6 = 0.",
            explication: "2k − 18 = 0, donc k = 9. On vérifie : v = 3u."
          }
        ],
        bonus: [
          {
            titre: "Vecteur opposé",
            enonce: "u(1 ; 2). Quelle est l'abscisse du vecteur −u ?",
            reponse: -1,
            indice: "Le vecteur opposé a des coordonnées opposées.",
            explication: "−u a pour coordonnées (−1 ; −2)."
          }
        ]
      },

      {
        nom: "Les droites de Fermat",
        notion: "Équations de droites",
        fond: "nuit",
        athena: "Deux stèles sur la même droite… de pierre.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#............A.............#",
        "#...........###............#",
        "#........T.................#",
        "#.......###................#",
        "#..........................#",
        "#.....##...................S",
        "#J.G.T.....................S",
        "################...#########"
      ],
        guides: [
          {
            nom: "Pierre de Fermat (1607 – 1665)",
            portrait: "perruque",
            texte: "Magistrat à Toulouse, je faisais des mathématiques pour le plaisir. Vers 1636, en même temps que Descartes mais sans le connaître, j'ai montré qu'une équation du premier degré entre x et y représente une droite."
          }
        ],
        steles: [
          {
            titre: "Coefficient directeur",
            enonce: "La droite (d) passe par A(1 ; 2) et B(3 ; 8). Quel est son coefficient directeur m ?",
            reponse: 3,
            indice: "m = (yB − yA) ÷ (xB − xA).",
            explication: "m = (8 − 2) ÷ (3 − 1) = 6 ÷ 2 = 3."
          },
          {
            titre: "Ordonnée à l'origine",
            enonce: "La même droite (d) a pour équation y = 3x + p. Quelle est la valeur de p ?",
            reponse: -1,
            indice: "Le point A(1 ; 2) est sur la droite : remplacez x par 1 et y par 2.",
            explication: "2 = 3 × 1 + p, donc p = −1. La droite a pour équation y = 3x − 1."
          }
        ],
        bonus: [
          {
            titre: "Point d'une droite",
            enonce: "Sur la droite d'équation y = −2x + 5, quelle est l'ordonnée du point d'abscisse 3 ?",
            reponse: -1,
            indice: "Remplacez x par 3.",
            explication: "y = −2 × 3 + 5 = −1."
          }
        ]
      },

      {
        nom: "Les neuf chapitres",
        notion: "Systèmes de deux équations",
        fond: "brumes",
        athena: "Dernier gouffre de la galerie. Résous le système : x donne la longueur de la passerelle.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#.....................A....#",
        "#....................###...S",
        "#J.G.T............T........S",
        "########PPPPPPP#############",
        "########.......#############",
        "########.......#############",
        "########.......#############"
      ],
        guides: [
          {
            nom: "Liu Hui (IIIe siècle)",
            portrait: "lettre",
            texte: "En Chine, en 263, j'ai commenté « Les Neuf Chapitres sur l'art mathématique ». Le huitième chapitre résout des systèmes de plusieurs équations en combinant les lignes d'un tableau de nombres, une méthode que l'Europe ne redécouvrira que bien plus tard."
          }
        ],
        steles: [
          {
            titre: "Système (1)",
            enonce: "On considère le système : x + y = 10 et x − y = 4. Quelle est la valeur de x ? (La passerelle mesurera x cases.)",
            reponse: 7,
            indice: "Additionnez les deux équations membre à membre : les y disparaissent.",
            explication: "(x + y) + (x − y) = 10 + 4, donc 2x = 14 et x = 7.",
            effet: "passerelle"
          },
          {
            titre: "Système (2)",
            enonce: "Avec le même système (x + y = 10 et x − y = 4), quelle est la valeur de y ?",
            reponse: 3,
            indice: "Vous connaissez x : remplacez-le dans x + y = 10.",
            explication: "7 + y = 10, donc y = 3. On vérifie : 7 − 3 = 4."
          }
        ],
        bonus: [
          {
            titre: "Équation",
            enonce: "Résolvez 2x + 3 = 11.",
            reponse: 4,
            indice: "Soustrayez 3, puis divisez par 2.",
            explication: "2x = 8, donc x = 4."
          }
        ]
      }
    ],
    // Le sanctuaire secret du chapitre : il s'ouvre avec assez de sceaux d'or.
    sanctuaire: {
      sceauxOr: 4,
      salle: {
        nom: "Le sanctuaire des figures",
        notion: "Problèmes : droites, systèmes, vecteurs",
        fond: "sanctuaire",
        athena: "Le sanctuaire des figures récompense ta patience. Gravis les marches : chaque stèle t'attend un peu plus haut.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................S",
        "#..........T...............S",
        "#.........##PPPPPPPPP#######",
        "#..A.....T##.........#######",
        "#.###...####.........#######",
        "#......T####.........#######",
        "#.....######.........#######",
        "#J.G..######.........#######",
        "############.........#######"
      ],
        guides: [
          {
            nom: "Maryam Mirzakhani (1977 – 2017)",
            portrait: "moderne",
            texte: "Née à Téhéran, j'ai d'abord rêvé d'être écrivain. J'ai étudié la géométrie des surfaces courbes, et en 2014 je suis devenue la première femme à recevoir la médaille Fields, la plus haute récompense en mathématiques."
          }
        ],
        steles: [
          {
            titre: "Points alignés",
            enonce: "Dans un repère, A(0 ; 1) et B(2 ; 5). Le point M(4 ; y) est sur la droite (AB). Quelle est la valeur de y ? La passerelle aura y cases.",
            reponse: 9,
            effet: "passerelle",
            indice: "Calculez d'abord le coefficient directeur de (AB) : (5 − 1) ÷ (2 − 0).",
            explication: "Le coefficient directeur vaut 4 ÷ 2 = 2 et la droite passe par A(0 ; 1) : y = 2x + 1. Pour x = 4, y = 9."
          },
          {
            titre: "Droites sécantes",
            enonce: "Les droites d'équations y = 2x − 1 et y = −x + 8 se coupent en un point. Quelle est l'abscisse de ce point ?",
            reponse: 3,
            indice: "Au point d'intersection, les deux ordonnées sont égales : 2x − 1 = −x + 8.",
            explication: "2x − 1 = −x + 8 ⇔ 3x = 9 ⇔ x = 3 (et alors y = 5)."
          },
          {
            titre: "Parallélogramme",
            enonce: "A(1 ; 2), B(5 ; 3) et C(6 ; 7). Quelle est l'abscisse du point D tel que ABCD soit un parallélogramme ?",
            reponse: 2,
            indice: "ABCD est un parallélogramme quand les diagonales [AC] et [BD] ont le même milieu (ou quand les vecteurs AB et DC sont égaux).",
            explication: "Le milieu de [AC] est (3,5 ; 4,5) : c'est aussi le milieu de [BD], donc D(2 ; 6). L'abscisse de D est 2."
          }
        ],
        bonus: [
          {
            titre: "Coefficient directeur",
            enonce: "Quel est le coefficient directeur de la droite d'équation y = 5 − 3x ?",
            reponse: -3,
            indice: "Écrivez l'équation sous la forme y = mx + p.",
            explication: "y = −3x + 5 : le coefficient directeur est −3."
          }
        ]
      }
    }
  },

  // =================================================================
  {
    niveau: "Seconde",
    titre: "Fonctions (début)",
    introduction: "Cette galerie des fonctions n'en est qu'à sa première salle. D'autres viendront.",
    salles: [
      {
        nom: "Les graphiques d'Oresme",
        notion: "Fonctions affines : image et antécédent",
        fond: "temple",
        athena: "Ici, le chemin va de droite à gauche.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#.......A..................#",
        "#......###.................#",
        "#............T.............#",
        "#...........###............#",
        "#..........................#",
        "S...............###........#",
        "S....................T..G.J#",
        "############################"
      ],
        guides: [
          {
            nom: "Nicole Oresme (vers 1320 – 1382)",
            portrait: "eveque",
            texte: "J'étais évêque de Lisieux, en Normandie. J'ai eu l'idée de représenter une grandeur qui varie par un dessin : une longueur horizontale pour le temps, une hauteur pour la vitesse. C'est l'un des ancêtres des courbes de fonctions que vous tracez aujourd'hui."
          }
        ],
        steles: [
          {
            titre: "Image par une fonction affine",
            enonce: "Soit f la fonction définie par f(x) = −2x + 7. Calculez l'image de −3, c'est-à-dire f(−3).",
            reponse: 13,
            indice: "Remplacez x par (−3) : f(−3) = −2 × (−3) + 7. Attention au signe du produit.",
            explication: "f(−3) = −2 × (−3) + 7 = 6 + 7 = 13."
          },
          {
            titre: "Antécédent par une fonction affine",
            enonce: "Avec la même fonction f(x) = −2x + 7, quel est l'antécédent de 1, c'est-à-dire le nombre x tel que f(x) = 1 ?",
            reponse: 3,
            indice: "Résolvez l'équation −2x + 7 = 1.",
            explication: "−2x + 7 = 1, donc −2x = −6, donc x = 3. On vérifie : f(3) = −6 + 7 = 1."
          }
        ],
        bonus: [
          {
            titre: "Fonction carré",
            enonce: "Soit g(x) = x². Calculez g(−4).",
            reponse: 16,
            indice: "(−4)² = (−4) × (−4).",
            explication: "g(−4) = (−4)² = 16."
          }
        ]
      }
    ]
  },

  // =================================================================
  {
    niveau: "Seconde",
    titre: "Statistiques et probabilités (début)",
    introduction: "La galerie du hasard n'a encore qu'une salle. Le hasard, lui aussi, obéit à des lois.",
    salles: [
      {
        nom: "Le pari du chevalier",
        notion: "Probabilités",
        fond: "crepuscule",
        athena: "Une stèle, et une stèle d'or sur la plus haute marche.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..............A...........#",
        "#.............###..........#",
        "#..........................#",
        "#.........###..............S",
        "#J.G...T...................S",
        "############################"
      ],
        guides: [
          {
            nom: "Blaise Pascal (1623 – 1662)",
            portrait: "perruque",
            texte: "En 1654, le chevalier de Méré, grand joueur, se demandait comment partager équitablement les mises d'une partie de dés interrompue. Pierre de Fermat et moi en avons discuté par lettres : cette correspondance marque la naissance du calcul des probabilités."
          }
        ],
        steles: [
          {
            titre: "Deux dés",
            enonce: "On lance deux dés équilibrés à six faces et on additionne les résultats. Quelle est la probabilité d'obtenir une somme égale à 7 ? (Réponse en fraction, par exemple 2/9.)",
            reponse: 1 / 6,
            tolerance: 0.0005,
            indice: "Il y a 6 × 6 = 36 couples possibles, tous équiprobables. Comptez les couples dont la somme vaut 7 : (1 ; 6), (2 ; 5)…",
            explication: "Les couples (1 ; 6), (2 ; 5), (3 ; 4), (4 ; 3), (5 ; 2) et (6 ; 1) donnent 7 : 6 issues sur 36, soit 6/36 = 1/6."
          }
        ],
        bonus: [
          {
            titre: "Moyenne",
            enonce: "Calculez la moyenne des notes 8, 12 et 13.",
            reponse: 11,
            indice: "Additionnez les notes, puis divisez par leur nombre.",
            explication: "(8 + 12 + 13) ÷ 3 = 33 ÷ 3 = 11."
          }
        ]
      }
    ]
  }

];
