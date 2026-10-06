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
//     steles   : les stèles de pierre (une par lettre T du plan)
//     bonus    : les stèles d'or, aux automatismes (une par lettre A du plan)
//     acrobaties : (facultatif) les stèles d'Hermès (une par lettre H du plan)
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
//     H  stèle d'Hermès : un problème de la liste « acrobaties ». Une fois
//        résolue, Talos fait une figure acrobatique (salto, double salto)
//        jusqu'à la lettre R qui lui correspond, et retour
//     R  réception : l'endroit où Talos se pose après la figure
//        (la 1re H va vers la 1re R, la 2e H vers la 2e R...)
//  Les T, les A, les H, les R et les I sont associées à leurs listes dans
//  l'ordre de lecture : de gauche à droite sur une ligne, puis ligne par
//  ligne, en partant du haut.
//
//  ---- Une stèle : un combat en plusieurs manches ----
//  Chaque stèle de pierre ou d'or est gardée par un monstre, et le combat
//  se joue en plusieurs manches, un exercice par manche :
//     { exercices: [ exercice1, exercice2, exercice3 ] }
//  Avec 3 exercices : la 1re bonne réponse fait attaquer Talos, la 2e lui
//  fait esquiver l'attaque du monstre, la 3e porte le coup final (mettez
//  l'exercice le plus difficile en dernier). Une stèle peut aussi n'avoir
//  qu'un exercice : { titre: ..., enonce: ..., reponse: ... }.
//  Champs facultatifs de la stèle elle-même :
//     monstre  : le monstre qui la garde : "minotaure", "hydre", "cyclope",
//                "meduse", "harpie", "chimere", "sphinx" ou "stymphale"
//                (sinon, voir l'ordre dans rangs.js)
//     boss     : le nom du boss, par exemple "L'Hydre de Lerne" : le monstre
//                devient géant, et chaque question a plus de temps (rangs.js)
//     contexte : un énoncé commun à toutes les questions (problème de
//                contrôle), affiché au-dessus de chaque question
//
//  ---- Un exercice ----
//     titre        : le titre affiché sur le parchemin
//     enonce       : le texte de l'exercice
//     reponse      : la bonne réponse, un nombre (2.5 pour 2,5 ; 1 / 6 pour 1/6)
//     tolerance    : (facultatif) l'écart accepté, utile pour les fractions
//     unite        : (facultatif) l'unité affichée à côté de la réponse
//     indice       : (facultatif) l'aide proposée après une erreur
//     explication  : (facultatif) la correction affichée après la réussite
//     effet        : (facultatif) "passerelle" : la réponse est la longueur,
//                    en cases, de la passerelle P construite depuis le bord gauche
//     temps        : (facultatif) le temps pour répondre, en secondes (sinon,
//                    le temps de la manche, choisi dans rangs.js)
//     figure       : (stèles d'Hermès seulement) "salto" ou "double"
//  Le joueur peut répondre « 8 », « 8,0 », « 8 m », « −4 » ou « 24/3 ».
//
//  Conseils pour les plans :
//   - Talos saute à environ 2 cases de haut et franchit sans problème
//     un trou de 3 cases (pas 6) ; pour un gouffre plus large ou une
//     corniche très haute, utilisez une stèle d'Hermès (H et R) ;
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
    introduction: "Éveille-toi, Talos, automate de bronze. Je suis Athéna. Ce temple garde la mémoire de celles et ceux qui ont inventé les mathématiques. Avant d'y entrer, apprends à te déplacer, à lire les stèles et à combattre leurs gardiens.",
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
        athena: "Le Minotaure garde la stèle de pierre : bats-le en trois manches pour l'allumer et ouvrir la porte. Si tu le veux, grimpe jusqu'à la stèle d'or.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#.....................A....#",
        "#....................###...#",
        "#..................I.......#",
        "#.................###......#",
        "#..........................#",
        "#..............###.........S",
        "#J.G.I.I...T.............I.S",
        "############################"
      ],
        inscriptions: [
          {
            titre: "Les stèles d'or",
            texte: "Là-haut brille une stèle d'or, gardée par les oiseaux du lac Stymphale. Ses trois automatismes sont des calculs rapides, à faire de tête. Elle n'ouvre pas la porte : elle est facultative. Mais chaque sceau d'or fait gagner des parures à Talos et ouvre, à la fin de chaque chapitre, un sanctuaire secret aux problèmes plus difficiles."
          },
          {
            titre: "Les gardiens",
            texte: "Chaque stèle de pierre est gardée par un monstre, qui rôde tout près. Approche-toi et il fonce sur toi : le combat commence ! (Tu peux aussi appuyer sur E devant la stèle.) Le combat se joue en trois manches, une par exercice : à la première, une bonne réponse fait frapper Talos ; à la deuxième, elle lui fait esquiver l'attaque du monstre ; à la troisième, Talos porte le coup final et le monstre est changé en pierre. Alors la stèle s'allume."
          },
          {
            titre: "Le sablier",
            texte: "Chaque manche se joue contre un sablier : 1 min 30, et 2 min pour le coup final. Si tu te trompes ou si le sable s'écoule, le monstre frappe et Talos perd un cœur ; un indice apparaît et tu peux réessayer. Sans cœur, Talos revient au départ de la salle. Tu peux fuir avec Échap, mais le sablier continue de couler ! Une victoire rend un cœur à Talos et rapporte un sceau de pierre. Certaines stèles transforment la salle : une passerelle, par exemple, aura exactement la longueur que tu calcules."
          },
          {
            titre: "Tes sceaux",
            texte: "En haut de l'écran, tu vois tes sceaux, les cœurs de Talos et son rang. Chaque monstre vaincu rapporte de l'expérience (XP), davantage sans aucune erreur ou avec plusieurs bonnes réponses d'affilée : Talos monte en rang et gagne des cœurs. Trois combats sans faute d'affilée appellent la foudre d'Athéna ! Le bouton « Parures » montre les ornements gagnés, le bouton « Son » coupe les bruitages."
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul mental",
                enonce: "Combien font 6 × 9 ?",
                reponse: 54,
                indice: "6 × 9 = 6 × 10 − 6.",
                explication: "6 × 10 = 60, et 60 − 6 = 54."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul mental",
                enonce: "Combien font 48 ÷ 6 ?",
                reponse: 8,
                indice: "Cherchez le nombre qui, multiplié par 6, donne 48.",
                explication: "6 × 8 = 48, donc 48 ÷ 6 = 8."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul mental",
                enonce: "Combien font 7 × 8 ?",
                reponse: 56,
                indice: "7 × 8 = 7 × 10 − 7 × 2.",
                explication: "7 × 10 = 70 et 7 × 2 = 14, donc 7 × 8 = 70 − 14 = 56."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Pourcentage",
                enonce: "Combien font 50 % de 90 ?",
                reponse: 45,
                indice: "50 %, c'est la moitié.",
                explication: "50 % de 90 = 90 ÷ 2 = 45."
              },
              // 2e manche : l'esquive
              {
                titre: "Pourcentage",
                enonce: "Combien font 10 % de 230 ?",
                reponse: 23,
                indice: "10 %, c'est un dixième : on divise par 10.",
                explication: "10 % de 230 = 230 ÷ 10 = 23."
              },
              // 3e manche : le coup final
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

      {
        nom: "Les sandales d'Hermès",
        notion: "Les stèles d'Hermès (figures acrobatiques)",
        fond: "crepuscule",
        athena: "Ce gouffre est bien trop large pour un saut. Résous la stèle d'Hermès : Talos le franchira d'un salto.",
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
        "#..........................#",
        "#..........................S",
        "#J..I.....H.........R.I....S",
        "###########.........########"
      ],
        inscriptions: [
          {
            titre: "Les stèles d'Hermès",
            texte: "Certaines stèles d'argent portent les sandales ailées d'Hermès, le messager des dieux. Aucun monstre ne les garde. Résous leur problème, et Talos exécute une figure acrobatique : un salto par-dessus un gouffre, un double salto jusqu'à une corniche… Elles mènent à des endroits impossibles à atteindre autrement."
          },
          {
            titre: "Dans les deux sens",
            texte: "Te voici posé sur le cercle ailé. Une fois la stèle résolue, appuie sur E ici, ou devant la stèle, pour refaire la figure dans un sens ou dans l'autre. La porte de bronze est juste là."
          }
        ],
        acrobaties: [
          {
            figure: "salto",
            titre: "Le salto d'Hermès",
            enonce: "Hermès réveille ses sandales ailées si tu calcules 15 × 4.",
            reponse: 60,
            indice: "15 × 4 = 10 × 4 + 5 × 4.",
            explication: "10 × 4 = 40 et 5 × 4 = 20, donc 15 × 4 = 60."
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Écriture décimale",
                enonce: "Donnez l'écriture décimale de 7/4.",
                reponse: 1.75,
                indice: "7/4 = 7 ÷ 4. Vous pouvez aussi écrire 7/4 = 1 + 3/4.",
                explication: "7 ÷ 4 = 1,75 : 7/4 est un nombre décimal."
              },
              // 2e manche : l'esquive
              {
                titre: "Nombres entiers",
                enonce: "Parmi les nombres −3 ; 2,5 ; 0 ; 12/4 ; √9 ; −1,2, combien sont des entiers relatifs ?",
                reponse: 4,
                indice: "Simplifiez d'abord : 12/4 = 3 et √9 = 3.",
                explication: "−3, 0, 12/4 = 3 et √9 = 3 sont des entiers relatifs ; 2,5 et −1,2 n'en sont pas. Il y en a 4."
              },
              // 3e manche : le coup final
              {
                titre: "Nombres décimaux",
                enonce: "Parmi les nombres 3/4 ; √2 ; −5 ; 0,125 ; 22/7 ; π, combien sont des nombres décimaux ?",
                reponse: 3,
                indice: "Un nombre décimal s'écrit avec un nombre fini de chiffres après la virgule. Calculez 3/4 et 22/7. Et un entier relatif est aussi un décimal.",
                explication: "3/4 = 0,75, −5 et 0,125 sont décimaux. 22/7 = 3,142857… (période infinie), √2 et π ne le sont pas. Il y en a 3."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Intervalles",
                enonce: "Combien de nombres entiers appartiennent à l'intervalle [1 ; 4] ?",
                reponse: 4,
                indice: "Les deux crochets sont tournés vers l'intérieur : 1 et 4 sont compris.",
                explication: "Les entiers de [1 ; 4] sont 1, 2, 3 et 4 : il y en a 4."
              },
              // 2e manche : l'esquive
              {
                titre: "Intervalles",
                enonce: "Quel est le plus grand nombre entier qui appartient à l'intervalle ]−5 ; 2[ ?",
                reponse: 1,
                indice: "Le crochet [ placé après 2 est tourné vers l'extérieur : 2 est exclu.",
                explication: "2 n'appartient pas à ]−5 ; 2[, donc le plus grand entier de cet intervalle est 1."
              },
              // 3e manche : le coup final
              {
                titre: "Intervalles",
                enonce: "Combien de nombres entiers appartiennent à l'intervalle [−2 ; 3[ ?",
                reponse: 5,
                indice: "Le crochet [ en −2 signifie que −2 est compris ; le crochet [ en 3 (tourné vers l'extérieur) signifie que 3 est exclu.",
                explication: "Les entiers de [−2 ; 3[ sont −2, −1, 0, 1 et 2 : il y en a 5."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Fractions",
                enonce: "Calculez 1/2 + 1/4 (réponse en fraction).",
                reponse: 3 / 4,
                tolerance: 0.0005,
                indice: "1/2 = 2/4.",
                explication: "1/2 + 1/4 = 2/4 + 1/4 = 3/4."
              },
              // 2e manche : l'esquive
              {
                titre: "Fractions",
                enonce: "Calculez 2/3 × 3/5 (réponse en fraction).",
                reponse: 2 / 5,
                tolerance: 0.0005,
                indice: "On multiplie les numérateurs entre eux et les dénominateurs entre eux, puis on simplifie.",
                explication: "2/3 × 3/5 = 6/15 = 2/5."
              },
              // 3e manche : le coup final
              {
                titre: "Fractions",
                enonce: "Calculez 3/4 + 1/6 (réponse en fraction).",
                reponse: 11 / 12,
                tolerance: 0.0005,
                indice: "Mettez les deux fractions au même dénominateur : 12.",
                explication: "3/4 + 1/6 = 9/12 + 2/12 = 11/12."
              }
            ]
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Puissances de 10",
                enonce: "10³ × 10⁴ = 10ⁿ. Quelle est la valeur de n ?",
                reponse: 7,
                indice: "Pour multiplier deux puissances de 10, on ajoute les exposants.",
                explication: "10³ × 10⁴ = 10³⁺⁴ = 10⁷. Donc n = 7."
              },
              // 2e manche : l'esquive
              {
                titre: "Puissances de 10",
                enonce: "10⁸ ÷ 10⁵ = 10ⁿ. Quelle est la valeur de n ?",
                reponse: 3,
                indice: "Pour diviser deux puissances de 10, on soustrait les exposants.",
                explication: "10⁸ ÷ 10⁵ = 10⁸⁻⁵ = 10³. Donc n = 3."
              },
              // 3e manche : le coup final
              {
                titre: "Puissances de 10",
                enonce: "10⁵ × 10⁻² ÷ 10⁻³ = 10ⁿ. Quelle est la valeur de n ? (La passerelle mesurera n cases.)",
                reponse: 6,
                indice: "Multiplier ajoute les exposants, diviser les soustrait : n = 5 + (−2) − (−3).",
                explication: "10⁵ × 10⁻² = 10³, puis 10³ ÷ 10⁻³ = 10³⁻⁽⁻³⁾ = 10⁶. Donc n = 6.",
                effet: "passerelle"
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Écriture scientifique",
                enonce: "L'écriture scientifique de 3 500 est 3,5 × 10ⁿ. Quelle est la valeur de n ?",
                reponse: 3,
                indice: "De combien de rangs faut-il déplacer la virgule pour passer de 3,5 à 3 500 ?",
                explication: "3 500 = 3,5 × 1 000 = 3,5 × 10³. Donc n = 3."
              },
              // 2e manche : l'esquive
              {
                titre: "Écriture décimale",
                enonce: "Quelle est l'écriture décimale de 6 × 10⁻² ?",
                reponse: 0.06,
                tolerance: 1e-9,
                indice: "10⁻² = 1/100 = 0,01.",
                explication: "6 × 10⁻² = 6 × 0,01 = 0,06."
              },
              // 3e manche : le coup final
              {
                titre: "Écriture scientifique",
                enonce: "L'écriture scientifique de 0,00042 est 4,2 × 10ⁿ. Quelle est la valeur de n ?",
                reponse: -4,
                indice: "Comptez de combien de rangs il faut déplacer la virgule pour passer de 0,00042 à 4,2.",
                explication: "0,00042 = 4,2 ÷ 10 000 = 4,2 × 10⁻⁴. Donc n = −4."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Puissances",
                enonce: "Calculez 2⁵.",
                reponse: 32,
                indice: "2⁵ = 2 × 2 × 2 × 2 × 2.",
                explication: "2 × 2 = 4, 4 × 2 = 8, 8 × 2 = 16 et 16 × 2 = 32."
              },
              // 2e manche : l'esquive
              {
                titre: "Carré d'un négatif",
                enonce: "Calculez (−3)².",
                reponse: 9,
                indice: "(−3)² = (−3) × (−3) : le produit de deux nombres négatifs est positif.",
                explication: "(−3) × (−3) = 9."
              },
              // 3e manche : le coup final
              {
                titre: "Puissance d'un négatif",
                enonce: "Calculez (−2)³.",
                reponse: -8,
                indice: "(−2)³ = (−2) × (−2) × (−2). Un nombre impair de facteurs négatifs donne un résultat négatif.",
                explication: "(−2) × (−2) = 4, puis 4 × (−2) = −8."
              }
            ]
          }
        ]
      },

      {
        nom: "Le secret d'Hippase",
        notion: "Racines carrées",
        fond: "crepuscule",
        athena: "La seconde stèle est perchée en haut des marches. Une corniche cachée garde la stèle d'or : seule la stèle d'Hermès y mène.",
        plan: [
        "############################",
        "#..........................#",
        "#.A...R....................#",
        "#######....................#",
        "#..........................#",
        "#..........................#",
        "#......................T...#",
        "#....................####..#",
        "#..........................#",
        "#................###.......#",
        "#..........................#",
        "#.............###..........S",
        "#JG.T...H..................S",
        "##########...###############"
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Racine carrée",
                enonce: "Calculez √81.",
                reponse: 9,
                indice: "Cherchez le nombre positif dont le carré vaut 81.",
                explication: "9² = 81, donc √81 = 9."
              },
              // 2e manche : l'esquive
              {
                titre: "Simplifier une racine",
                enonce: "On peut écrire √18 = a√2, avec a entier. Quelle est la valeur de a ?",
                reponse: 3,
                indice: "Écrivez 18 comme le produit d'un carré parfait et de 2 : 18 = 9 × 2.",
                explication: "√18 = √(9 × 2) = √9 × √2 = 3√2. Donc a = 3."
              },
              // 3e manche : le coup final
              {
                titre: "Simplifier une racine",
                enonce: "On peut écrire √50 = a√2, avec a entier. Quelle est la valeur de a ?",
                reponse: 5,
                indice: "Écrivez 50 comme produit d'un carré parfait et de 2 : 50 = 25 × 2, et √(a × b) = √a × √b.",
                explication: "√50 = √(25 × 2) = √25 × √2 = 5√2. Donc a = 5."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Carré d'une racine",
                enonce: "Calculez (√5)².",
                reponse: 5,
                indice: "Pour un nombre positif a, (√a)² = a.",
                explication: "(√5)² = 5 : c'est la définition de la racine carrée."
              },
              // 2e manche : l'esquive
              {
                titre: "Produit de racines",
                enonce: "Calculez √2 × √8.",
                reponse: 4,
                indice: "Pour des nombres positifs, √a × √b = √(a × b).",
                explication: "√2 × √8 = √(2 × 8) = √16 = 4."
              },
              // 3e manche : le coup final
              {
                titre: "Calculer avec des racines",
                enonce: "Calculez (√3)² + √16.",
                reponse: 7,
                indice: "Pour un nombre positif a, (√a)² = a. Et √16 est le nombre positif dont le carré vaut 16.",
                explication: "(√3)² = 3 et √16 = 4, donc (√3)² + √16 = 3 + 4 = 7."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Racine carrée",
                enonce: "Calculez √49.",
                reponse: 7,
                indice: "Quel nombre positif a pour carré 49 ?",
                explication: "7² = 49, donc √49 = 7."
              },
              // 2e manche : l'esquive
              {
                titre: "Racine d'un quotient",
                enonce: "Calculez √(100 ÷ 4).",
                reponse: 5,
                indice: "Calculez d'abord 100 ÷ 4.",
                explication: "100 ÷ 4 = 25 et √25 = 5 (ou bien √100 ÷ √4 = 10 ÷ 2 = 5)."
              },
              // 3e manche : le coup final
              {
                titre: "Racine d'un produit",
                enonce: "Calculez √(9 × 16).",
                reponse: 12,
                indice: "√(9 × 16) = √9 × √16.",
                explication: "√9 × √16 = 3 × 4 = 12 (et 9 × 16 = 144 = 12²)."
              }
            ]
          }
        ],
        acrobaties: [
          {
            figure: "double",
            titre: "Le double salto",
            enonce: "On peut écrire √(36 + 64) = n. Quelle est la valeur de n ? (C'est la hauteur, en cases, du double salto qui mène à la corniche.)",
            reponse: 10,
            indice: "Calculez d'abord 36 + 64, puis prenez la racine carrée.",
            explication: "36 + 64 = 100 et √100 = 10. Attention : √36 + √64 = 6 + 8 = 14, ce n'est pas la même chose ! En général, √(a + b) n'est pas égal à √a + √b."
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Multiples",
                enonce: "Combien y a-t-il de multiples de 7 compris entre 1 et 50 ?",
                reponse: 7,
                indice: "7 × 7 = 49 et 7 × 8 = 56.",
                explication: "Les multiples de 7 entre 1 et 50 sont 7, 14, 21, 28, 35, 42 et 49 : il y en a 7."
              },
              // 2e manche : l'esquive
              {
                titre: "Décomposition en facteurs premiers",
                enonce: "On sait que 72 = 2³ × 3ᵇ. Quelle est la valeur de b ?",
                reponse: 2,
                indice: "Divisez 72 par 2³ = 8 : il reste une puissance de 3.",
                explication: "72 ÷ 8 = 9 et 9 = 3 × 3 = 3², donc b = 2."
              },
              // 3e manche : le coup final
              {
                titre: "Décomposition en facteurs premiers",
                enonce: "On sait que 120 = 2ᵃ × 3 × 5 (2 à la puissance a). Quelle est la valeur de a ?",
                reponse: 3,
                indice: "Divisez 120 par 3 × 5 = 15 : il reste une puissance de 2. Laquelle ?",
                explication: "120 ÷ 15 = 8 et 8 = 2 × 2 × 2 = 2³, donc a = 3."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Nombre premier",
                enonce: "Quel est le plus petit nombre premier supérieur à 20 ?",
                reponse: 23,
                indice: "21 = 3 × 7 et 22 = 2 × 11 ne sont pas premiers.",
                explication: "21 et 22 ne sont pas premiers ; 23 n'a que deux diviseurs, 1 et 23 : c'est un nombre premier."
              },
              // 2e manche : l'esquive
              {
                titre: "Fraction irréductible",
                enonce: "La fraction 42/56 s'écrit sous forme irréductible a/4. Quelle est la valeur de a ?",
                reponse: 3,
                indice: "Décomposez : 42 = 2 × 3 × 7 et 56 = 2 × 2 × 2 × 7. Simplifiez par 2 × 7 = 14.",
                explication: "42/56 = (14 × 3)/(14 × 4) = 3/4. Donc a = 3."
              },
              // 3e manche : le coup final
              {
                titre: "Nombres premiers",
                enonce: "Combien y a-t-il de nombres premiers inférieurs à 30 ?",
                reponse: 10,
                indice: "Écrivez les nombres de 2 à 29 et barrez les multiples de 2, de 3 et de 5 (sauf 2, 3 et 5 eux-mêmes). C'est le crible d'Ératosthène.",
                explication: "Les nombres premiers inférieurs à 30 sont 2, 3, 5, 7, 11, 13, 17, 19, 23 et 29 : il y en a 10."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Diviseurs",
                enonce: "Combien le nombre 9 a-t-il de diviseurs positifs ?",
                reponse: 3,
                indice: "Cherchez les nombres qui divisent 9 sans reste.",
                explication: "Les diviseurs de 9 sont 1, 3 et 9 : il y en a 3."
              },
              // 2e manche : l'esquive
              {
                titre: "Division euclidienne",
                enonce: "Quel est le reste de la division euclidienne de 47 par 5 ?",
                reponse: 2,
                indice: "47 = 5 × 9 + … ?",
                explication: "5 × 9 = 45 et 47 − 45 = 2 : le reste est 2."
              },
              // 3e manche : le coup final
              {
                titre: "Diviseurs",
                enonce: "Combien le nombre 12 a-t-il de diviseurs positifs ?",
                reponse: 6,
                indice: "Cherchez les couples de nombres dont le produit vaut 12 : 1 × 12, 2 × 6…",
                explication: "Les diviseurs de 12 sont 1, 2, 3, 4, 6 et 12 : il y en a 6."
              }
            ]
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Développer",
                enonce: "En développant, 3(x + 4) = 3x + c. Quelle est la valeur de c ?",
                reponse: 12,
                indice: "Multipliez 3 par chacun des deux termes de la parenthèse.",
                explication: "3(x + 4) = 3 × x + 3 × 4 = 3x + 12. Donc c = 12."
              },
              // 2e manche : l'esquive
              {
                titre: "Identité remarquable",
                enonce: "En développant, (x + 5)² = x² + bx + 25. Quelle est la valeur de b ?",
                reponse: 10,
                indice: "(a + b)² = a² + 2ab + b².",
                explication: "(x + 5)² = x² + 2 × x × 5 + 5² = x² + 10x + 25. Donc b = 10."
              },
              // 3e manche : le coup final
              {
                titre: "Identité remarquable",
                enonce: "En développant, (2x + 3)² = 4x² + bx + 9. Quelle est la valeur de b ?",
                reponse: 12,
                indice: "(a + b)² = a² + 2ab + b², avec ici a = 2x et b = 3.",
                explication: "(2x + 3)² = (2x)² + 2 × 2x × 3 + 3² = 4x² + 12x + 9. Donc b = 12."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Factoriser",
                enonce: "On peut écrire 6x + 9 = 3(2x + a). Quelle est la valeur de a ?",
                reponse: 3,
                indice: "3 est un facteur commun à 6x et à 9.",
                explication: "6x + 9 = 3 × 2x + 3 × 3 = 3(2x + 3). Donc a = 3."
              },
              // 2e manche : l'esquive
              {
                titre: "Factoriser",
                enonce: "On peut écrire x² + 7x = x(x + a). Quelle est la valeur de a ?",
                reponse: 7,
                indice: "x est un facteur commun aux deux termes : x² = x × x.",
                explication: "x² + 7x = x × x + x × 7 = x(x + 7). Donc a = 7."
              },
              // 3e manche : le coup final
              {
                titre: "Factoriser",
                enonce: "On peut écrire x² − 25 = (x − 5)(x + a). Quelle est la valeur de a ?",
                reponse: 5,
                indice: "Reconnaissez a² − b² = (a − b)(a + b).",
                explication: "x² − 25 = x² − 5² = (x − 5)(x + 5). Donc a = 5."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Développer",
                enonce: "En développant, 5(2x − 1) = 10x + c. Quelle est la valeur de c ?",
                reponse: -5,
                indice: "Multipliez 5 par chacun des termes : 5 × 2x et 5 × (−1).",
                explication: "5(2x − 1) = 10x + 5 × (−1) = 10x − 5. Donc c = −5."
              },
              // 2e manche : l'esquive
              {
                titre: "Réduire",
                enonce: "On réduit 3x + 2 + 4x − 7 sous la forme ax + b. Quelle est la valeur de a ?",
                reponse: 7,
                indice: "Regroupez les termes en x : 3x + 4x.",
                explication: "3x + 4x = 7x et 2 − 7 = −5 : on obtient 7x − 5. Donc a = 7."
              },
              // 3e manche : le coup final
              {
                titre: "Développer",
                enonce: "En développant, −2(x − 4) = −2x + c. Quelle est la valeur de c ?",
                reponse: 8,
                indice: "Multipliez −2 par chacun des deux termes : −2 × x et −2 × (−4).",
                explication: "−2(x − 4) = −2x + (−2) × (−4) = −2x + 8. Donc c = 8."
              }
            ]
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Équation",
                enonce: "Résolvez l'équation 3x = 21.",
                reponse: 7,
                indice: "Divisez les deux membres par 3.",
                explication: "x = 21 ÷ 3 = 7. On vérifie : 3 × 7 = 21."
              },
              // 2e manche : l'esquive
              {
                titre: "Équation",
                enonce: "Résolvez l'équation 4x − 3 = 13.",
                reponse: 4,
                indice: "Ajoutez 3 aux deux membres, puis divisez par 4.",
                explication: "4x = 16, donc x = 16 ÷ 4 = 4."
              },
              // 3e manche : le coup final
              {
                titre: "Équation du premier degré",
                enonce: "Résolvez l'équation 5x − 4 = 2x + 14. La passerelle mesurera x cases.",
                reponse: 6,
                indice: "Regroupez les termes en x d'un côté et les nombres de l'autre : 5x − 2x = 14 + 4.",
                explication: "5x − 2x = 14 + 4, donc 3x = 18, donc x = 18 ÷ 3 = 6.",
                effet: "passerelle"
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Équation produit nul",
                enonce: "L'équation (x − 4)(x + 1) = 0 a deux solutions. Quelle est la plus grande ?",
                reponse: 4,
                indice: "Un produit est nul si et seulement si l'un de ses facteurs est nul.",
                explication: "x − 4 = 0 donne x = 4 ; x + 1 = 0 donne x = −1. La plus grande solution est 4."
              },
              // 2e manche : l'esquive
              {
                titre: "Équation",
                enonce: "Résolvez l'équation 3(x − 2) = x + 4.",
                reponse: 5,
                indice: "Développez d'abord le membre de gauche, puis regroupez les termes en x.",
                explication: "3x − 6 = x + 4, donc 3x − x = 4 + 6, soit 2x = 10 et x = 5."
              },
              // 3e manche : le coup final
              {
                titre: "Équation produit nul",
                enonce: "L'équation (x − 3)(2x + 8) = 0 a deux solutions. Quelle est leur somme ?",
                reponse: -1,
                indice: "Un produit est nul si et seulement si l'un de ses facteurs est nul : x − 3 = 0 ou 2x + 8 = 0.",
                explication: "x − 3 = 0 donne x = 3 ; 2x + 8 = 0 donne x = −4. La somme vaut 3 + (−4) = −1."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Équation simple",
                enonce: "Résolvez x + 8 = 3.",
                reponse: -5,
                indice: "Soustrayez 8 aux deux membres.",
                explication: "x = 3 − 8 = −5."
              },
              // 2e manche : l'esquive
              {
                titre: "Équation simple",
                enonce: "Résolvez x/4 = 6.",
                reponse: 24,
                indice: "Multipliez les deux membres par 4.",
                explication: "x = 6 × 4 = 24."
              },
              // 3e manche : le coup final
              {
                titre: "Équation simple",
                enonce: "Résolvez 2x = 7 (réponse en nombre décimal).",
                reponse: 3.5,
                indice: "Divisez les deux membres par 2.",
                explication: "x = 7 ÷ 2 = 3,5."
              }
            ]
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Inéquation",
                enonce: "L'inéquation x + 7 < 10 équivaut à x < a. Quelle est la valeur de a ?",
                reponse: 3,
                indice: "Soustrayez 7 aux deux membres : le sens de l'inégalité ne change pas.",
                explication: "x + 7 < 10 ⇔ x < 3. Donc a = 3."
              },
              // 2e manche : l'esquive
              {
                titre: "Inéquation",
                enonce: "L'inéquation 2x − 1 ≥ 9 équivaut à x ≥ a. Quelle est la valeur de a ?",
                reponse: 5,
                indice: "Ajoutez 1, puis divisez par 2 : comme 2 est positif, le sens ne change pas.",
                explication: "2x − 1 ≥ 9 ⇔ 2x ≥ 10 ⇔ x ≥ 5. Donc a = 5."
              },
              // 3e manche : le coup final
              {
                titre: "Inéquation",
                enonce: "L'inéquation −3x + 6 > 0 équivaut à x < a. Quelle est la valeur de a ?",
                reponse: 2,
                indice: "−3x > −6, puis divisez par −3. Attention : diviser par un nombre négatif change le sens de l'inégalité.",
                explication: "−3x + 6 > 0 ⇔ −3x > −6 ⇔ x < 2 (on divise par −3 et on change le sens). Donc a = 2."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Encadrement",
                enonce: "Combien de nombres entiers x vérifient −2 ≤ x < 2 ?",
                reponse: 4,
                indice: "−2 est compris (≤), mais 2 est exclu (<).",
                explication: "Les entiers −2, −1, 0 et 1 conviennent : il y en a 4."
              },
              // 2e manche : l'esquive
              {
                titre: "Plus grand entier",
                enonce: "Quel est le plus grand entier n tel que 3n + 1 < 20 ?",
                reponse: 6,
                indice: "Résolvez d'abord 3n + 1 < 20 : vous trouvez n < un nombre non entier.",
                explication: "3n + 1 < 20 ⇔ 3n < 19 ⇔ n < 19/3 ≈ 6,33. Le plus grand entier qui convient est 6."
              },
              // 3e manche : le coup final
              {
                titre: "Plus petit entier",
                enonce: "Quel est le plus petit entier n tel que 5n − 3 > 20 ?",
                reponse: 5,
                indice: "Résolvez d'abord 5n − 3 > 20 : vous trouvez n > un nombre décimal.",
                explication: "5n − 3 > 20 ⇔ 5n > 23 ⇔ n > 4,6. Le plus petit entier qui convient est 5."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Valeur absolue",
                enonce: "Calculez |−12|.",
                reponse: 12,
                indice: "La valeur absolue d'un nombre est sa distance à zéro.",
                explication: "|−12| = 12."
              },
              // 2e manche : l'esquive
              {
                titre: "Distance entre deux nombres",
                enonce: "Quelle est la distance entre −3 et 5 sur la droite graduée, c'est-à-dire |5 − (−3)| ?",
                reponse: 8,
                indice: "|5 − (−3)| = |5 + 3|.",
                explication: "|5 − (−3)| = |8| = 8."
              },
              // 3e manche : le coup final
              {
                titre: "Valeur absolue",
                enonce: "Calculez |−7| + |3|.",
                reponse: 10,
                indice: "La valeur absolue d'un nombre est sa distance à zéro : elle est toujours positive.",
                explication: "|−7| = 7 et |3| = 3, donc |−7| + |3| = 10."
              }
            ]
          }
        ]
      },

      {
        nom: "Le tournoi de Fibonacci",
        notion: "Boss du chapitre : calcul littéral, équations, inéquations",
        fond: "mer",
        athena: "L'Hydre de Lerne garde la sortie de la galerie. Pour la vaincre, résous son problème en cinq questions : tu as trois minutes par question.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..A.......................#",
        "#.###......................#",
        "#..........................#",
        "#....###...................#",
        "#..........................#",
        "#........###...............#",
        "#..........................#",
        "#.....###..................S",
        "#J.G................T......S",
        "############################"
      ],
        guides: [
          {
            nom: "Leonardo Fibonacci (vers 1170 – vers 1250)",
            portrait: "renaissance",
            texte: "Fils d'un marchand de Pise, j'ai appris à Béjaïa, en Algérie, à calculer avec les chiffres indiens et arabes. Mon « Liber abaci », en 1202, les a fait connaître en Europe. En 1225, devant l'empereur Frédéric II, j'ai relevé un à un les défis de ses savants lors d'un tournoi de problèmes. À ton tour d'affronter le tien !"
          }
        ],
        steles: [
          {
            boss: "L'Hydre de Lerne",
            monstre: "hydre",
            contexte: "Pour tout nombre réel x, on pose A(x) = (2x − 3)² − 16.",
            exercices: [
              // 1re question : l'attaque
              {
                titre: "Question 1 : une image",
                enonce: "Calculez A(0).",
                reponse: -7,
                indice: "Remplacez x par 0 : A(0) = (2 × 0 − 3)² − 16.",
                explication: "A(0) = (−3)² − 16 = 9 − 16 = −7."
              },
              // 2e question : l'esquive
              {
                titre: "Question 2 : développer",
                enonce: "Développez A(x) : vous obtenez A(x) = 4x² + bx + c. Quelle est la valeur de b ?",
                reponse: -12,
                indice: "(a − b)² = a² − 2ab + b², avec a = 2x et b = 3.",
                explication: "(2x − 3)² = 4x² − 12x + 9, donc A(x) = 4x² − 12x + 9 − 16 = 4x² − 12x − 7 : b = −12."
              },
              // 3e question : l'attaque
              {
                titre: "Question 3 : factoriser",
                enonce: "En remarquant que 16 = 4², factorisez A(x) : vous obtenez A(x) = (2x − 7)(2x + k). Quelle est la valeur de k ?",
                reponse: 1,
                indice: "Utilisez a² − b² = (a − b)(a + b), avec a = 2x − 3 et b = 4.",
                explication: "A(x) = (2x − 3)² − 4² = (2x − 3 − 4)(2x − 3 + 4) = (2x − 7)(2x + 1) : k = 1."
              },
              // 4e question : l'esquive
              {
                titre: "Question 4 : une équation",
                enonce: "L'équation A(x) = 0 a deux solutions. Quelle est la plus grande ? (Réponse en écriture décimale.)",
                reponse: 3.5,
                indice: "Avec la forme factorisée : un produit est nul si et seulement si l'un de ses facteurs est nul.",
                explication: "(2x − 7)(2x + 1) = 0 ⇔ 2x − 7 = 0 ou 2x + 1 = 0 ⇔ x = 3,5 ou x = −0,5. La plus grande solution est 3,5."
              },
              // 5e question : le coup final
              {
                titre: "Question 5 : une inéquation",
                enonce: "Combien de nombres entiers x vérifient A(x) < 0 ?",
                reponse: 4,
                indice: "A(x) = (2x − 7)(2x + 1) est négatif quand ses deux facteurs sont de signes contraires : faites un tableau de signes.",
                explication: "Le tableau de signes montre que A(x) < 0 pour −0,5 < x < 3,5. Les entiers de cet intervalle sont 0, 1, 2 et 3 : il y en a 4."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Puissances",
                enonce: "Calculez 2³ × 2².",
                reponse: 32,
                indice: "Ajoutez les exposants : 2³ × 2² = 2⁵.",
                explication: "2³ × 2² = 2⁵ = 32."
              },
              // 2e manche : l'esquive
              {
                titre: "Carré d'un négatif",
                enonce: "Calculez (−3)².",
                reponse: 9,
                indice: "(−3)² = (−3) × (−3).",
                explication: "(−3) × (−3) = 9 : le carré d'un nombre est toujours positif."
              },
              // 3e manche : le coup final
              {
                titre: "Pourcentage",
                enonce: "Combien font 15 % de 80 ?",
                reponse: 12,
                indice: "10 % de 80 = 8, et 5 % en est la moitié.",
                explication: "10 % de 80 = 8 et 5 % de 80 = 4, donc 15 % de 80 = 12."
              }
            ]
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Racines carrées",
                enonce: "On peut écrire √48 = a√3, avec a entier. Quelle est la valeur de a ?",
                reponse: 4,
                indice: "48 = 16 × 3.",
                explication: "√48 = √16 × √3 = 4√3. Donc a = 4."
              },
              // 2e manche : l'esquive
              {
                titre: "Racines et identité",
                enonce: "Calculez (√7 − 2)(√7 + 2).",
                reponse: 3,
                indice: "Reconnaissez (a − b)(a + b) = a² − b².",
                explication: "(√7 − 2)(√7 + 2) = (√7)² − 2² = 7 − 4 = 3."
              },
              // 3e manche : le coup final
              {
                titre: "Racines carrées",
                enonce: "On peut écrire √12 + √27 sous la forme a√3, avec a entier. Quelle est la valeur de a ?",
                reponse: 5,
                indice: "12 = 4 × 3 et 27 = 9 × 3, donc √12 = √4 × √3 = 2√3.",
                explication: "√12 = 2√3 et √27 = 3√3, donc √12 + √27 = 5√3 : a = 5."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Puissances",
                enonce: "Calculez 2³ × 2⁴ ÷ 2⁵.",
                reponse: 4,
                indice: "2ᵐ × 2ⁿ = 2ᵐ⁺ⁿ et 2ᵐ ÷ 2ⁿ = 2ᵐ⁻ⁿ.",
                explication: "2³ × 2⁴ ÷ 2⁵ = 2³⁺⁴⁻⁵ = 2² = 4."
              },
              // 2e manche : l'esquive
              {
                titre: "Puissances de 3",
                enonce: "Quel est le plus petit entier n tel que 3ⁿ > 100 ?",
                reponse: 5,
                indice: "Calculez les puissances de 3 les unes après les autres : 3, 9, 27…",
                explication: "3⁴ = 81 est plus petit que 100 et 3⁵ = 243 est plus grand : n = 5."
              },
              // 3e manche : le coup final
              {
                titre: "Puissances de 2",
                enonce: "Quel est le plus petit entier n tel que 2ⁿ > 1 000 ? La passerelle aura n cases.",
                reponse: 10,
                effet: "passerelle",
                indice: "Calculez les puissances de 2 les unes après les autres : 2, 4, 8, 16, 32…",
                explication: "2⁹ = 512 est plus petit que 1 000 et 2¹⁰ = 1 024 est plus grand : n = 10."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Le carré",
                enonce: "Un carré a une aire de 64 cm². Quel est son périmètre ?",
                reponse: 32,
                unite: "cm",
                indice: "Le côté du carré mesure √64 cm.",
                explication: "Le côté mesure √64 = 8 cm, donc le périmètre vaut 4 × 8 = 32 cm."
              },
              // 2e manche : l'esquive
              {
                titre: "Somme et différence",
                enonce: "Deux nombres ont pour somme 20 et pour différence 6. Quel est le plus grand ?",
                reponse: 13,
                indice: "Si a + b = 20 et a − b = 6, additionnez les deux égalités.",
                explication: "2a = 26, donc a = 13 (et b = 7)."
              },
              // 3e manche : le coup final
              {
                titre: "Le rectangle",
                enonce: "Un rectangle a un périmètre de 30 cm et une aire de 56 cm². Quelle est sa longueur (son plus grand côté) ?",
                reponse: 8,
                unite: "cm",
                indice: "Si L et l sont les côtés : L + l = 15 et L × l = 56. Cherchez deux nombres dont la somme est 15 et le produit 56.",
                explication: "8 + 7 = 15 et 8 × 7 = 56 : les côtés mesurent 8 cm et 7 cm, la longueur est 8 cm."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Produit de décimaux",
                enonce: "Calculez 0,3 × 0,2.",
                reponse: 0.06,
                tolerance: 1e-9,
                indice: "3 × 2 = 6 ; il faut deux chiffres après la virgule en tout.",
                explication: "0,3 × 0,2 = 0,06."
              },
              // 2e manche : l'esquive
              {
                titre: "Quotient de décimaux",
                enonce: "Calculez 1,2 ÷ 0,4.",
                reponse: 3,
                indice: "Multipliez les deux nombres par 10 : 12 ÷ 4.",
                explication: "1,2 ÷ 0,4 = 12 ÷ 4 = 3."
              },
              // 3e manche : le coup final
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Milieu d'un segment",
                enonce: "A(2 ; 0) et B(8 ; 0). Quelle est l'abscisse du milieu de [AB] ?",
                reponse: 5,
                indice: "L'abscisse du milieu est la moyenne des abscisses : (xA + xB) ÷ 2.",
                explication: "(2 + 8) ÷ 2 = 10 ÷ 2 = 5."
              },
              // 2e manche : l'esquive
              {
                titre: "Milieu d'un segment",
                enonce: "A(3 ; −2) et B(−1 ; 8). Quelle est l'ordonnée du milieu de [AB] ?",
                reponse: 3,
                indice: "L'ordonnée du milieu est la moyenne des ordonnées : (yA + yB) ÷ 2.",
                explication: "(−2 + 8) ÷ 2 = 6 ÷ 2 = 3."
              },
              // 3e manche : le coup final
              {
                titre: "Milieu d'un segment",
                enonce: "Dans un repère, A(−1 ; 3) et B(5 ; −1). Quelle est l'abscisse du milieu I du segment [AB] ?",
                reponse: 2,
                indice: "L'abscisse du milieu est la moyenne des abscisses : (xA + xB) ÷ 2.",
                explication: "xI = (−1 + 5) ÷ 2 = 4 ÷ 2 = 2. De même yI = (3 + (−1)) ÷ 2 = 1, donc I(2 ; 1)."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Coordonnées d'un vecteur",
                enonce: "A(1 ; 2) et B(4 ; 7). Quelle est l'abscisse du vecteur AB ?",
                reponse: 3,
                indice: "L'abscisse du vecteur AB est xB − xA.",
                explication: "xB − xA = 4 − 1 = 3. Le vecteur AB a pour coordonnées (3 ; 5)."
              },
              // 2e manche : l'esquive
              {
                titre: "Translation",
                enonce: "Le point A(2 ; 1) a pour image le point B par la translation de vecteur u(3 ; −4). Quelle est l'ordonnée de B ?",
                reponse: -3,
                indice: "On ajoute les coordonnées du vecteur à celles du point A.",
                explication: "B(2 + 3 ; 1 + (−4)) = B(5 ; −3). L'ordonnée de B est −3."
              },
              // 3e manche : le coup final
              {
                titre: "Coordonnées d'un vecteur",
                enonce: "Avec les mêmes points A(−1 ; 3) et B(5 ; −1), quelle est l'ordonnée du vecteur AB ?",
                reponse: -4,
                indice: "Le vecteur AB a pour coordonnées (xB − xA ; yB − yA). Attention à l'ordre : B moins A.",
                explication: "yB − yA = −1 − 3 = −4. Le vecteur AB a pour coordonnées (6 ; −4)."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Distance sur une horizontale",
                enonce: "A(−3 ; 2) et B(4 ; 2). Quelle est la distance AB ?",
                reponse: 7,
                indice: "Les deux points ont la même ordonnée : ils sont sur une même droite horizontale.",
                explication: "AB = 4 − (−3) = 7."
              },
              // 2e manche : l'esquive
              {
                titre: "Symétrique",
                enonce: "Quelle est l'abscisse du symétrique du point A(5 ; −2) par rapport à l'origine du repère ?",
                reponse: -5,
                indice: "Le symétrique par rapport à l'origine a des coordonnées opposées.",
                explication: "Le symétrique de A(5 ; −2) est le point (−5 ; 2)."
              },
              // 3e manche : le coup final
              {
                titre: "Distance sur une verticale",
                enonce: "A(2 ; 5) et B(2 ; −1). Quelle est la distance AB ?",
                reponse: 6,
                indice: "Les deux points ont la même abscisse : ils sont sur une même droite verticale.",
                explication: "AB = 5 − (−1) = 6."
              }
            ]
          }
        ]
      },

      {
        nom: "La relation de Chasles",
        notion: "Somme de vecteurs",
        fond: "temple",
        athena: "Deux précipices, deux stèles. Le second gouffre est bien trop large : la stèle d'Hermès te fera passer d'un salto.",
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
        "#..........................#",
        "#..........................S",
        "#J.G.T......T..H.......R.A.S",
        "########...#####.......#####"
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Somme de deux vecteurs",
                enonce: "u(1 ; 4) et v(2 ; −1). Quelle est l'ordonnée du vecteur u + v ?",
                reponse: 3,
                indice: "On additionne les ordonnées entre elles.",
                explication: "u + v a pour coordonnées (1 + 2 ; 4 + (−1)) = (3 ; 3)."
              },
              // 2e manche : l'esquive
              {
                titre: "Différence de deux vecteurs",
                enonce: "u(5 ; 2) et v(1 ; 3). Quelle est l'abscisse du vecteur u − v ?",
                reponse: 4,
                indice: "On soustrait les coordonnées une à une.",
                explication: "u − v a pour coordonnées (5 − 1 ; 2 − 3) = (4 ; −1)."
              },
              // 3e manche : le coup final
              {
                titre: "Somme de deux vecteurs",
                enonce: "On donne les vecteurs u(2 ; −1) et v(3 ; 4). Quelle est l'abscisse du vecteur u + v ?",
                reponse: 5,
                indice: "Pour additionner deux vecteurs, on additionne leurs abscisses entre elles et leurs ordonnées entre elles.",
                explication: "u + v a pour coordonnées (2 + 3 ; −1 + 4) = (5 ; 3)."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Relation de Chasles",
                enonce: "Le vecteur AB a pour coordonnées (2 ; 1) et le vecteur BC (4 ; 2). Quelle est l'abscisse du vecteur AC ?",
                reponse: 6,
                indice: "D'après la relation de Chasles, AC = AB + BC.",
                explication: "AC = AB + BC a pour coordonnées (2 + 4 ; 1 + 2) = (6 ; 3)."
              },
              // 2e manche : l'esquive
              {
                titre: "Vecteur opposé",
                enonce: "Le vecteur AB a pour coordonnées (3 ; −7). Quelle est l'ordonnée du vecteur BA ?",
                reponse: 7,
                indice: "Le vecteur BA est l'opposé du vecteur AB.",
                explication: "BA = −AB a pour coordonnées (−3 ; 7)."
              },
              // 3e manche : le coup final
              {
                titre: "Relation de Chasles",
                enonce: "Le vecteur AB a pour coordonnées (1 ; 3) et le vecteur BC (4 ; −5). Quelle est l'ordonnée du vecteur AC ?",
                reponse: -2,
                indice: "D'après la relation de Chasles, AC = AB + BC.",
                explication: "AC = AB + BC a pour coordonnées (1 + 4 ; 3 + (−5)) = (5 ; −2)."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Produit par un réel",
                enonce: "u(4 ; 1). Quelle est l'abscisse du vecteur 2u ?",
                reponse: 8,
                indice: "Multipliez chaque coordonnée par 2.",
                explication: "2u a pour coordonnées (2 × 4 ; 2 × 1) = (8 ; 2)."
              },
              // 2e manche : l'esquive
              {
                titre: "Moitié d'un vecteur",
                enonce: "u(6 ; −2). Quelle est l'ordonnée du vecteur ½u (la moitié de u) ?",
                reponse: -1,
                indice: "Multipliez chaque coordonnée par ½, c'est-à-dire divisez-la par 2.",
                explication: "½u a pour coordonnées (3 ; −1)."
              },
              // 3e manche : le coup final
              {
                titre: "Produit par un réel",
                enonce: "u(2 ; −1). Quelle est l'ordonnée du vecteur 3u ?",
                reponse: -3,
                indice: "Multipliez chaque coordonnée par 3.",
                explication: "3u a pour coordonnées (3 × 2 ; 3 × (−1)) = (6 ; −3)."
              }
            ]
          }
        ],
        acrobaties: [
          {
            figure: "salto",
            titre: "Le vecteur du salto",
            enonce: "Talos s'élance du point A(15 ; 0) et doit se poser au point B(23 ; 0), de l'autre côté du gouffre. Quelle est l'abscisse du vecteur AB, c'est-à-dire la longueur du salto en cases ?",
            reponse: 8,
            indice: "L'abscisse du vecteur AB est xB − xA.",
            explication: "xB − xA = 23 − 15 = 8 : le vecteur AB a pour coordonnées (8 ; 0). Talos franchit 8 cases d'un seul bond."
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Somme de carrés",
                enonce: "Calculez 3² + 4².",
                reponse: 25,
                indice: "3² = 3 × 3 et 4² = 4 × 4.",
                explication: "3² + 4² = 9 + 16 = 25."
              },
              // 2e manche : l'esquive
              {
                titre: "Racine d'une somme",
                enonce: "Calculez √(6² + 8²).",
                reponse: 10,
                indice: "Calculez d'abord ce qu'il y a sous la racine : 6² + 8².",
                explication: "6² + 8² = 36 + 64 = 100 et √100 = 10."
              },
              // 3e manche : le coup final
              {
                titre: "Distance entre deux points",
                enonce: "Dans un repère orthonormé, A(1 ; 1) et B(4 ; 5). Calculez la distance AB.",
                reponse: 5,
                indice: "AB = √((xB − xA)² + (yB − yA)²).",
                explication: "AB = √(3² + 4²) = √(9 + 16) = √25 = 5."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Distance entre deux points",
                enonce: "Dans un repère orthonormé, A(0 ; 0) et B(5 ; 12). Calculez la distance AB.",
                reponse: 13,
                indice: "AB = √((xB − xA)² + (yB − yA)²).",
                explication: "AB = √(5² + 12²) = √(25 + 144) = √169 = 13."
              },
              // 2e manche : l'esquive
              {
                titre: "Distance entre deux points",
                enonce: "Dans un repère orthonormé, A(−2 ; 3) et B(4 ; −5). Calculez la distance AB.",
                reponse: 10,
                indice: "Attention aux signes : xB − xA = 4 − (−2) = 6 et yB − yA = −5 − 3 = −8.",
                explication: "AB = √(6² + (−8)²) = √(36 + 64) = √100 = 10."
              },
              // 3e manche : le coup final
              {
                titre: "Triangle isocèle",
                enonce: "Dans un repère orthonormé, A(−2 ; 0), B(4 ; 0) et C(1 ; 4). Calculez AC² (le carré de la distance AC).",
                reponse: 25,
                indice: "AC² = (xC − xA)² + (yC − yA)².",
                explication: "AC² = (1 − (−2))² + (4 − 0)² = 9 + 16 = 25. On trouve aussi BC² = 9 + 16 = 25 : le triangle est isocèle en C."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Aire d'un rectangle",
                enonce: "Quelle est l'aire d'un rectangle de longueur 6 et de largeur 1,5 ?",
                reponse: 9,
                indice: "L'aire d'un rectangle est longueur × largeur.",
                explication: "6 × 1,5 = 9."
              },
              // 2e manche : l'esquive
              {
                titre: "Périmètre d'un rectangle",
                enonce: "Quel est le périmètre d'un rectangle de longueur 7 et de largeur 3 ?",
                reponse: 20,
                indice: "Le périmètre est 2 × (longueur + largeur).",
                explication: "2 × (7 + 3) = 2 × 10 = 20."
              },
              // 3e manche : le coup final
              {
                titre: "Périmètre",
                enonce: "Quel est le périmètre d'un carré de côté 2,5 ?",
                reponse: 10,
                indice: "Un carré a quatre côtés égaux.",
                explication: "4 × 2,5 = 10."
              }
            ]
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Déterminant",
                enonce: "Calculez le déterminant des vecteurs u(1 ; 2) et v(3 ; 5), c'est-à-dire x × y' − y × x'.",
                reponse: -1,
                indice: "det(u, v) = 1 × 5 − 2 × 3.",
                explication: "det(u, v) = 5 − 6 = −1."
              },
              // 2e manche : l'esquive
              {
                titre: "Déterminant",
                enonce: "Calculez le déterminant des vecteurs u(3 ; −2) et v(1 ; 4).",
                reponse: 14,
                indice: "det(u, v) = 3 × 4 − (−2) × 1 : attention au signe.",
                explication: "det(u, v) = 12 − (−2) = 12 + 2 = 14."
              },
              // 3e manche : le coup final
              {
                titre: "Déterminant",
                enonce: "Calculez le déterminant des vecteurs u(2 ; 3) et v(4 ; −1), c'est-à-dire x × y' − y × x'.",
                reponse: -14,
                indice: "det(u, v) = 2 × (−1) − 3 × 4.",
                explication: "det(u, v) = 2 × (−1) − 3 × 4 = −2 − 12 = −14. Il n'est pas nul : u et v ne sont pas colinéaires."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Vecteurs colinéaires",
                enonce: "Le vecteur v(8 ; 4) est égal à k fois le vecteur u(2 ; 1). Quelle est la valeur de k ?",
                reponse: 4,
                indice: "Comparez les abscisses : 8 = k × 2.",
                explication: "8 = 4 × 2 et 4 = 4 × 1 : v = 4u, donc k = 4."
              },
              // 2e manche : l'esquive
              {
                titre: "Vecteurs colinéaires",
                enonce: "Les vecteurs u(3 ; −1) et v(k ; 2) sont colinéaires. Quelle est la valeur de k ?",
                reponse: -6,
                indice: "Leur déterminant doit être nul : 3 × 2 − (−1) × k = 0.",
                explication: "6 + k = 0, donc k = −6. On vérifie : v = −2u."
              },
              // 3e manche : le coup final
              {
                titre: "Vecteurs colinéaires",
                enonce: "Les vecteurs u(2 ; 3) et v(6 ; k) sont colinéaires. Quelle est la valeur de k ?",
                reponse: 9,
                indice: "Ils sont colinéaires si et seulement si leur déterminant est nul : 2 × k − 3 × 6 = 0.",
                explication: "2k − 18 = 0, donc k = 9. On vérifie : v = 3u."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Vecteur opposé",
                enonce: "u(−3 ; 5). Quelle est l'ordonnée du vecteur −u ?",
                reponse: -5,
                indice: "Le vecteur opposé a des coordonnées opposées.",
                explication: "−u a pour coordonnées (3 ; −5)."
              },
              // 2e manche : l'esquive
              {
                titre: "Vecteur nul",
                enonce: "u(4 ; −2) et v(a ; 2). Pour quelle valeur de a a-t-on u + v = 0 (le vecteur nul) ?",
                reponse: -4,
                indice: "u + v = 0 signifie que v est l'opposé de u.",
                explication: "4 + a = 0, donc a = −4 (et −2 + 2 = 0)."
              },
              // 3e manche : le coup final
              {
                titre: "Vecteur opposé",
                enonce: "u(1 ; 2). Quelle est l'abscisse du vecteur −u ?",
                reponse: -1,
                indice: "Le vecteur opposé a des coordonnées opposées.",
                explication: "−u a pour coordonnées (−1 ; −2)."
              }
            ]
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Coefficient directeur",
                enonce: "Quel est le coefficient directeur de la droite d'équation y = 4x − 7 ?",
                reponse: 4,
                indice: "Dans y = mx + p, le coefficient directeur est m.",
                explication: "y = 4x − 7 : m = 4."
              },
              // 2e manche : l'esquive
              {
                titre: "Coefficient directeur",
                enonce: "La droite (d) passe par A(0 ; 5) et B(2 ; 1). Quel est son coefficient directeur ?",
                reponse: -2,
                indice: "m = (yB − yA) ÷ (xB − xA).",
                explication: "m = (1 − 5) ÷ (2 − 0) = −4 ÷ 2 = −2."
              },
              // 3e manche : le coup final
              {
                titre: "Coefficient directeur",
                enonce: "La droite (d) passe par A(1 ; 2) et B(3 ; 8). Quel est son coefficient directeur m ?",
                reponse: 3,
                indice: "m = (yB − yA) ÷ (xB − xA).",
                explication: "m = (8 − 2) ÷ (3 − 1) = 6 ÷ 2 = 3."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Ordonnée à l'origine",
                enonce: "Quelle est l'ordonnée à l'origine de la droite d'équation y = −x + 6 ?",
                reponse: 6,
                indice: "Dans y = mx + p, l'ordonnée à l'origine est p : c'est la valeur de y pour x = 0.",
                explication: "Pour x = 0, y = 6 : p = 6."
              },
              // 2e manche : l'esquive
              {
                titre: "Point sur une droite",
                enonce: "Le point M(2 ; k) appartient à la droite d'équation y = 5x − 3. Quelle est la valeur de k ?",
                reponse: 7,
                indice: "Remplacez x par 2 dans l'équation.",
                explication: "k = 5 × 2 − 3 = 7."
              },
              // 3e manche : le coup final
              {
                titre: "Ordonnée à l'origine",
                enonce: "La même droite (d) a pour équation y = 3x + p. Quelle est la valeur de p ?",
                reponse: -1,
                indice: "Le point A(1 ; 2) est sur la droite : remplacez x par 1 et y par 2.",
                explication: "2 = 3 × 1 + p, donc p = −1. La droite a pour équation y = 3x − 1."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Point d'une droite",
                enonce: "Sur la droite d'équation y = 3x + 1, quelle est l'ordonnée du point d'abscisse 4 ?",
                reponse: 13,
                indice: "Remplacez x par 4.",
                explication: "y = 3 × 4 + 1 = 13."
              },
              // 2e manche : l'esquive
              {
                titre: "Point d'une droite",
                enonce: "Sur la droite d'équation y = 2x − 4, quelle est l'abscisse du point d'ordonnée 0 ?",
                reponse: 2,
                indice: "Résolvez 2x − 4 = 0.",
                explication: "2x = 4, donc x = 2."
              },
              // 3e manche : le coup final
              {
                titre: "Point d'une droite",
                enonce: "Sur la droite d'équation y = −2x + 5, quelle est l'ordonnée du point d'abscisse 3 ?",
                reponse: -1,
                indice: "Remplacez x par 3.",
                explication: "y = −2 × 3 + 5 = −1."
              }
            ]
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Équation à deux inconnues",
                enonce: "Le couple (2 ; y) est solution de l'équation 3x + y = 11. Quelle est la valeur de y ?",
                reponse: 5,
                indice: "Remplacez x par 2.",
                explication: "3 × 2 + y = 11, donc y = 11 − 6 = 5."
              },
              // 2e manche : l'esquive
              {
                titre: "Système par substitution",
                enonce: "On considère le système : x + y = 9 et y = 2x. Quelle est la valeur de x ?",
                reponse: 3,
                indice: "Remplacez y par 2x dans la première équation.",
                explication: "x + 2x = 9, donc 3x = 9 et x = 3 (puis y = 6)."
              },
              // 3e manche : le coup final
              {
                titre: "Système (1)",
                enonce: "On considère le système : x + y = 10 et x − y = 4. Quelle est la valeur de x ? (La passerelle mesurera x cases.)",
                reponse: 7,
                indice: "Additionnez les deux équations membre à membre : les y disparaissent.",
                explication: "(x + y) + (x − y) = 10 + 4, donc 2x = 14 et x = 7.",
                effet: "passerelle"
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Système",
                enonce: "On considère le système : x − y = 1 et x + y = 7. Quelle est la valeur de x ?",
                reponse: 4,
                indice: "Additionnez les deux équations membre à membre.",
                explication: "2x = 8, donc x = 4 (puis y = 3)."
              },
              // 2e manche : l'esquive
              {
                titre: "Système",
                enonce: "On considère le système : 2x + y = 8 et x − y = 1. Quelle est la valeur de y ?",
                reponse: 2,
                indice: "Additionnez les deux équations pour trouver x, puis remplacez x dans l'une d'elles.",
                explication: "3x = 9, donc x = 3, puis 3 − y = 1, donc y = 2."
              },
              // 3e manche : le coup final
              {
                titre: "Système (2)",
                enonce: "Avec le même système (x + y = 10 et x − y = 4), quelle est la valeur de y ?",
                reponse: 3,
                indice: "Vous connaissez x : remplacez-le dans x + y = 10.",
                explication: "7 + y = 10, donc y = 3. On vérifie : 7 − 3 = 4."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Équation",
                enonce: "Résolvez 5x − 2 = 13.",
                reponse: 3,
                indice: "Ajoutez 2, puis divisez par 5.",
                explication: "5x = 15, donc x = 3."
              },
              // 2e manche : l'esquive
              {
                titre: "Équation",
                enonce: "Résolvez 7 − x = 10.",
                reponse: -3,
                indice: "Isolez x : −x = 10 − 7.",
                explication: "−x = 3, donc x = −3."
              },
              // 3e manche : le coup final
              {
                titre: "Équation",
                enonce: "Résolvez 2x + 3 = 11.",
                reponse: 4,
                indice: "Soustrayez 3, puis divisez par 2.",
                explication: "2x = 8, donc x = 4."
              }
            ]
          }
        ]
      },

      {
        nom: "La mesure d'Ératosthène",
        notion: "Boss du chapitre : vecteurs, milieu, équation de droite",
        fond: "bibliotheque",
        athena: "Polyphème le Cyclope garde la sortie de la galerie. Monte sur l'estrade et affronte-le : cinq questions, trois minutes chacune.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#.....A....................#",
        "#....###...................#",
        "#..........................#",
        "#.##.......................S",
        "#..................T.......S",
        "#....##...##################",
        "#J.G......##################",
        "############################"
      ],
        guides: [
          {
            nom: "Ératosthène de Cyrène (vers 276 – 194 av. J.-C.)",
            portrait: "grec",
            texte: "J'étais le directeur de la grande bibliothèque d'Alexandrie. Le même jour, à midi, le Soleil éclairait le fond d'un puits à Syène, mais un bâton faisait une ombre à Alexandrie. En mesurant cette ombre et la distance entre les deux villes, j'ai calculé le tour de la Terre : près de 40 000 km, une mesure remarquablement juste."
          }
        ],
        steles: [
          {
            boss: "Polyphème le Cyclope",
            monstre: "cyclope",
            contexte: "Dans un repère orthonormé, on donne les points A(−1 ; 2), B(3 ; 4) et C(5 ; −2).",
            exercices: [
              // 1re question : l'attaque
              {
                titre: "Question 1 : un milieu",
                enonce: "Calculez l'abscisse du point I, milieu du segment [AC].",
                reponse: 2,
                indice: "L'abscisse du milieu est la moyenne des abscisses : (xA + xC) ÷ 2.",
                explication: "xI = (−1 + 5) ÷ 2 = 4 ÷ 2 = 2. (Et yI = (2 + (−2)) ÷ 2 = 0 : I(2 ; 0).)"
              },
              // 2e question : l'esquive
              {
                titre: "Question 2 : un vecteur",
                enonce: "Le vecteur AB a pour coordonnées (4 ; 2). Quelle est l'ordonnée du vecteur BC ?",
                reponse: -6,
                indice: "Les coordonnées du vecteur BC sont (xC − xB ; yC − yB).",
                explication: "BC a pour coordonnées (5 − 3 ; −2 − 4) = (2 ; −6). Son ordonnée est −6."
              },
              // 3e question : l'attaque
              {
                titre: "Question 3 : un coefficient directeur",
                enonce: "La droite (AB) a une équation de la forme y = mx + p. Quelle est la valeur de m ? (Réponse en écriture décimale.)",
                reponse: 0.5,
                indice: "m = (yB − yA) ÷ (xB − xA).",
                explication: "m = (4 − 2) ÷ (3 − (−1)) = 2 ÷ 4 = 0,5."
              },
              // 4e question : l'esquive
              {
                titre: "Question 4 : l'ordonnée à l'origine",
                enonce: "Quelle est la valeur de p, l'ordonnée à l'origine de la droite (AB) ? (Réponse en écriture décimale.)",
                reponse: 2.5,
                indice: "La droite passe par A(−1 ; 2) : remplacez x par −1 et y par 2 dans y = 0,5x + p.",
                explication: "2 = 0,5 × (−1) + p, donc 2 = −0,5 + p et p = 2,5. La droite (AB) a pour équation y = 0,5x + 2,5."
              },
              // 5e question : le coup final
              {
                titre: "Question 5 : un parallélogramme",
                enonce: "Le point D est tel que ABCD est un parallélogramme. Quelle est l'ordonnée de D ?",
                reponse: -4,
                indice: "ABCD est un parallélogramme quand les vecteurs AB et DC sont égaux, ou quand [AC] et [BD] ont le même milieu.",
                explication: "Le milieu de [BD] doit être I(2 ; 0) : xD = 2 × 2 − 3 = 1 et yD = 2 × 0 − 4 = −4. Donc D(1 ; −4)."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Milieu",
                enonce: "A(2 ; 6) et B(4 ; 0). Quelle est l'abscisse du milieu de [AB] ?",
                reponse: 3,
                indice: "(2 + 4) ÷ 2.",
                explication: "(2 + 4) ÷ 2 = 3."
              },
              // 2e manche : l'esquive
              {
                titre: "Vecteur",
                enonce: "A(1 ; 1) et B(4 ; 5). Quelle est l'ordonnée du vecteur AB ?",
                reponse: 4,
                indice: "yB − yA.",
                explication: "5 − 1 = 4."
              },
              // 3e manche : le coup final
              {
                titre: "Coefficient directeur",
                enonce: "Quel est le coefficient directeur de la droite d'équation y = −2x + 7 ?",
                reponse: -2,
                indice: "Dans y = mx + p, le coefficient directeur est m.",
                explication: "y = −2x + 7 : le coefficient directeur est −2."
              }
            ]
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Coefficient directeur",
                enonce: "La droite (AB) passe par A(0 ; 1) et B(2 ; 5). Quel est son coefficient directeur ?",
                reponse: 2,
                indice: "m = (yB − yA) ÷ (xB − xA).",
                explication: "m = (5 − 1) ÷ (2 − 0) = 4 ÷ 2 = 2."
              },
              // 2e manche : l'esquive
              {
                titre: "Point d'une droite",
                enonce: "Sur la droite d'équation y = 2x + 1, quelle est l'abscisse du point d'ordonnée 15 ?",
                reponse: 7,
                indice: "Résolvez 2x + 1 = 15.",
                explication: "2x = 14, donc x = 7."
              },
              // 3e manche : le coup final
              {
                titre: "Points alignés",
                enonce: "Dans un repère, A(0 ; 1) et B(2 ; 5). Le point M(4 ; y) est sur la droite (AB). Quelle est la valeur de y ? La passerelle aura y cases.",
                reponse: 9,
                effet: "passerelle",
                indice: "Calculez d'abord le coefficient directeur de (AB) : (5 − 1) ÷ (2 − 0).",
                explication: "Le coefficient directeur vaut 4 ÷ 2 = 2 et la droite passe par A(0 ; 1) : y = 2x + 1. Pour x = 4, y = 9."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Droites parallèles",
                enonce: "Les droites d'équations y = 3x + 2 et y = mx − 5 sont parallèles. Quelle est la valeur de m ?",
                reponse: 3,
                indice: "Deux droites sont parallèles quand elles ont le même coefficient directeur.",
                explication: "Les coefficients directeurs sont égaux : m = 3."
              },
              // 2e manche : l'esquive
              {
                titre: "Point d'intersection",
                enonce: "Les droites d'équations y = x + 5 et y = −2x + 2 se coupent en un point. Quelle est son ordonnée ?",
                reponse: 4,
                indice: "Trouvez d'abord l'abscisse : x + 5 = −2x + 2.",
                explication: "3x = −3, donc x = −1, puis y = −1 + 5 = 4."
              },
              // 3e manche : le coup final
              {
                titre: "Droites sécantes",
                enonce: "Les droites d'équations y = 2x − 1 et y = −x + 8 se coupent en un point. Quelle est l'abscisse de ce point ?",
                reponse: 3,
                indice: "Au point d'intersection, les deux ordonnées sont égales : 2x − 1 = −x + 8.",
                explication: "2x − 1 = −x + 8 ⇔ 3x = 9 ⇔ x = 3 (et alors y = 5)."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Milieu",
                enonce: "A(1 ; 2) et C(6 ; 7). Quelle est l'abscisse du milieu du segment [AC] ?",
                reponse: 3.5,
                indice: "L'abscisse du milieu est (xA + xC) ÷ 2.",
                explication: "(1 + 6) ÷ 2 = 7 ÷ 2 = 3,5."
              },
              // 2e manche : l'esquive
              {
                titre: "Égalité de vecteurs",
                enonce: "E(2 ; 3), F(6 ; 5) et G(9 ; 1). Quelle est l'ordonnée du point H tel que EFGH soit un parallélogramme ?",
                reponse: -1,
                indice: "EFGH est un parallélogramme quand les vecteurs EF et HG sont égaux.",
                explication: "EF a pour coordonnées (4 ; 2). HG = EF donne H(9 − 4 ; 1 − 2) = H(5 ; −1)."
              },
              // 3e manche : le coup final
              {
                titre: "Parallélogramme",
                enonce: "A(1 ; 2), B(5 ; 3) et C(6 ; 7). Quelle est l'abscisse du point D tel que ABCD soit un parallélogramme ?",
                reponse: 2,
                indice: "ABCD est un parallélogramme quand les diagonales [AC] et [BD] ont le même milieu (ou quand les vecteurs AB et DC sont égaux).",
                explication: "Le milieu de [AC] est (3,5 ; 4,5) : c'est aussi le milieu de [BD], donc D(2 ; 6). L'abscisse de D est 2."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Coefficient directeur",
                enonce: "Quel est le coefficient directeur de la droite d'équation y = 7x ?",
                reponse: 7,
                indice: "y = 7x s'écrit y = 7x + 0.",
                explication: "m = 7 (et la droite passe par l'origine)."
              },
              // 2e manche : l'esquive
              {
                titre: "Ordonnée à l'origine",
                enonce: "Quelle est l'ordonnée à l'origine de la droite d'équation y = 2(x − 3) ?",
                reponse: -6,
                indice: "Développez : y = 2x − 6.",
                explication: "y = 2x − 6 : l'ordonnée à l'origine est −6."
              },
              // 3e manche : le coup final
              {
                titre: "Coefficient directeur",
                enonce: "Quel est le coefficient directeur de la droite d'équation y = 5 − 3x ?",
                reponse: -3,
                indice: "Écrivez l'équation sous la forme y = mx + p.",
                explication: "y = −3x + 5 : le coefficient directeur est −3."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  {
    niveau: "Seconde",
    titre: "Fonctions (début)",
    introduction: "Cette galerie des fonctions n'a encore que deux salles, dont l'antre de son gardien. D'autres viendront.",
    salles: [
      {
        nom: "Les graphiques d'Oresme",
        notion: "Fonctions affines : image et antécédent",
        fond: "temple",
        athena: "Ici, le chemin va de droite à gauche. La stèle d'or est sur une corniche, tout en haut : demande à Hermès.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#...................R...A..#",
        "#...................######.#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........T...............#",
        "#.........###..............#",
        "#..........................#",
        "S.............###..........#",
        "S.................H..T..G.J#",
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Image",
                enonce: "Soit f la fonction définie par f(x) = 3x + 2. Calculez f(4).",
                reponse: 14,
                indice: "Remplacez x par 4.",
                explication: "f(4) = 3 × 4 + 2 = 14."
              },
              // 2e manche : l'esquive
              {
                titre: "Image",
                enonce: "Soit g la fonction définie par g(x) = x² − 1. Calculez g(−2).",
                reponse: 3,
                indice: "(−2)² = 4.",
                explication: "g(−2) = (−2)² − 1 = 4 − 1 = 3."
              },
              // 3e manche : le coup final
              {
                titre: "Image par une fonction affine",
                enonce: "Soit f la fonction définie par f(x) = −2x + 7. Calculez l'image de −3, c'est-à-dire f(−3).",
                reponse: 13,
                indice: "Remplacez x par (−3) : f(−3) = −2 × (−3) + 7. Attention au signe du produit.",
                explication: "f(−3) = −2 × (−3) + 7 = 6 + 7 = 13."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Antécédent",
                enonce: "Soit f la fonction définie par f(x) = 2x. Quel est l'antécédent de 10 par f ?",
                reponse: 5,
                indice: "Cherchez x tel que 2x = 10.",
                explication: "2x = 10, donc x = 5."
              },
              // 2e manche : l'esquive
              {
                titre: "Antécédent",
                enonce: "Soit f la fonction définie par f(x) = 4x − 3. Quel est l'antécédent de 13 par f ?",
                reponse: 4,
                indice: "Résolvez l'équation 4x − 3 = 13.",
                explication: "4x = 16, donc x = 4. On vérifie : f(4) = 16 − 3 = 13."
              },
              // 3e manche : le coup final
              {
                titre: "Antécédent par une fonction affine",
                enonce: "Avec la même fonction f(x) = −2x + 7, quel est l'antécédent de 1, c'est-à-dire le nombre x tel que f(x) = 1 ?",
                reponse: 3,
                indice: "Résolvez l'équation −2x + 7 = 1.",
                explication: "−2x + 7 = 1, donc −2x = −6, donc x = 3. On vérifie : f(3) = −6 + 7 = 1."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Fonction carré",
                enonce: "Soit g(x) = x². Calculez g(3).",
                reponse: 9,
                indice: "g(3) = 3 × 3.",
                explication: "g(3) = 3² = 9."
              },
              // 2e manche : l'esquive
              {
                titre: "Fonction inverse",
                enonce: "Soit h(x) = 1/x. Calculez h(0,5).",
                reponse: 2,
                indice: "Combien de fois 0,5 dans 1 ?",
                explication: "h(0,5) = 1 ÷ 0,5 = 2."
              },
              // 3e manche : le coup final
              {
                titre: "Fonction carré",
                enonce: "Soit g(x) = x². Calculez g(−4).",
                reponse: 16,
                indice: "(−4)² = (−4) × (−4).",
                explication: "g(−4) = (−4)² = 16."
              }
            ]
          }
        ],
        acrobaties: [
          {
            figure: "double",
            titre: "La parabole du double salto",
            enonce: "La courbe du double salto ressemble à celle de la fonction f définie par f(x) = −x² + 6x. Calculez f(3), la hauteur atteinte en x = 3.",
            reponse: 9,
            indice: "Remplacez x par 3 : f(3) = −3² + 6 × 3. Attention : −3² = −9.",
            explication: "f(3) = −9 + 18 = 9. La courbe d'une telle fonction est une parabole : Oresme aurait aimé la dessiner !"
          }
        ]
      },

      {
        nom: "Le défi d'Euler",
        notion: "Boss du chapitre : image, antécédent, maximum",
        fond: "nuit",
        athena: "La Chimère crache le feu des fonctions. Cinq questions te séparent de la sortie, à gauche : trois minutes par question.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#.......................A..#",
        "#......................###.#",
        "#..........................#",
        "#...................###....#",
        "#..........................#",
        "#................###.......#",
        "#..........................#",
        "S...................###....#",
        "S.......T...............G.J#",
        "############################"
      ],
        guides: [
          {
            nom: "Leonhard Euler (1707 – 1783)",
            portrait: "perruque",
            texte: "Né à Bâle, en Suisse, j'ai travaillé à Saint-Pétersbourg et à Berlin. C'est moi qui ai imposé la notation f(x) pour une fonction, et les lettres π, e et i. Devenu aveugle, j'ai continué à calculer de tête et à dicter mes travaux : j'ai laissé plus de 800 livres et articles."
          }
        ],
        steles: [
          {
            boss: "La Chimère de Lycie",
            monstre: "chimere",
            contexte: "On considère la fonction f définie sur ℝ par f(x) = −x² + 4x + 5.",
            exercices: [
              // 1re question : l'attaque
              {
                titre: "Question 1 : une image",
                enonce: "Calculez f(−2).",
                reponse: -7,
                indice: "Remplacez x par (−2) : f(−2) = −(−2)² + 4 × (−2) + 5. Attention : −(−2)² = −4.",
                explication: "f(−2) = −4 − 8 + 5 = −7."
              },
              // 2e question : l'esquive
              {
                titre: "Question 2 : un antécédent",
                enonce: "Le nombre 5 a deux antécédents par f. L'un d'eux est 0. Quel est l'autre ?",
                reponse: 4,
                indice: "Résolvez f(x) = 5, c'est-à-dire −x² + 4x = 0, puis factorisez par x.",
                explication: "−x² + 4x + 5 = 5 ⇔ −x² + 4x = 0 ⇔ x(4 − x) = 0 ⇔ x = 0 ou x = 4. L'autre antécédent est 4."
              },
              // 3e question : l'attaque
              {
                titre: "Question 3 : une équation",
                enonce: "Développez (5 − x)(x + 1) : vous retrouvez f(x). Résolvez alors f(x) = 0 : quelle est la plus petite solution ?",
                reponse: -1,
                indice: "(5 − x)(x + 1) = 5x + 5 − x² − x. Ensuite, un produit est nul si l'un de ses facteurs est nul.",
                explication: "(5 − x)(x + 1) = −x² + 4x + 5 = f(x). f(x) = 0 ⇔ 5 − x = 0 ou x + 1 = 0 ⇔ x = 5 ou x = −1. La plus petite solution est −1."
              },
              // 4e question : l'esquive
              {
                titre: "Question 4 : un maximum",
                enonce: "On admet que f(x) = 9 − (x − 2)² pour tout réel x. Quel est le maximum de f sur ℝ ?",
                reponse: 9,
                indice: "Un carré est toujours positif ou nul : (x − 2)² ≥ 0.",
                explication: "(x − 2)² ≥ 0, donc f(x) = 9 − (x − 2)² ≤ 9, et f(2) = 9 : le maximum de f est 9, atteint en x = 2."
              },
              // 5e question : le coup final
              {
                titre: "Question 5 : le signe",
                enonce: "Combien de nombres entiers x vérifient f(x) > 0 ?",
                reponse: 5,
                indice: "Utilisez la forme f(x) = (5 − x)(x + 1) et un tableau de signes.",
                explication: "Le tableau de signes montre que f(x) > 0 pour −1 < x < 5. Les entiers 0, 1, 2, 3 et 4 conviennent : il y en a 5."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Fonction affine",
                enonce: "f(x) = 3x − 1. Calculez f(2).",
                reponse: 5,
                indice: "Remplacez x par 2.",
                explication: "f(2) = 3 × 2 − 1 = 5."
              },
              // 2e manche : l'esquive
              {
                titre: "Fonction carré",
                enonce: "g(x) = x². Calculez g(−5).",
                reponse: 25,
                indice: "(−5)² = (−5) × (−5).",
                explication: "g(−5) = 25."
              },
              // 3e manche : le coup final
              {
                titre: "Fonction inverse",
                enonce: "h(x) = 1/x. Calculez h(4) (réponse en écriture décimale).",
                reponse: 0.25,
                indice: "1/4 = 1 ÷ 4.",
                explication: "h(4) = 1/4 = 0,25."
              }
            ]
          }
        ]
      }
    ]
  },

  // =================================================================
  {
    niveau: "Seconde",
    titre: "Statistiques et probabilités (début)",
    introduction: "La galerie du hasard n'a encore que deux salles, dont l'antre de sa gardienne. Le hasard, lui aussi, obéit à des lois.",
    salles: [
      {
        nom: "Le pari du chevalier",
        notion: "Probabilités",
        fond: "crepuscule",
        athena: "Une stèle, un gouffre et une stèle d'or sur la plus haute marche. Hermès, dieu de la chance, t'aidera à traverser.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#............A.............#",
        "#...........###............#",
        "#..........................#",
        "#........###...............S",
        "#J.G.T........H........R...S",
        "###############........#####"
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
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Un dé",
                enonce: "On lance un dé équilibré à six faces. Quelle est la probabilité d'obtenir un nombre pair ? (Réponse en fraction ou en décimal.)",
                reponse: 1 / 2,
                tolerance: 0.0005,
                indice: "Les faces paires sont 2, 4 et 6.",
                explication: "3 issues favorables sur 6 : la probabilité vaut 3/6 = 1/2 = 0,5."
              },
              // 2e manche : l'esquive
              {
                titre: "Une urne",
                enonce: "Une urne contient 3 boules rouges et 5 boules bleues, indiscernables au toucher. On tire une boule au hasard. Quelle est la probabilité qu'elle soit rouge ? (Réponse en fraction.)",
                reponse: 3 / 8,
                tolerance: 0.0005,
                indice: "Il y a 8 boules en tout, et chacune a la même chance d'être tirée.",
                explication: "3 boules rouges sur 8 : la probabilité vaut 3/8."
              },
              // 3e manche : le coup final
              {
                titre: "Deux dés",
                enonce: "On lance deux dés équilibrés à six faces et on additionne les résultats. Quelle est la probabilité d'obtenir une somme égale à 7 ? (Réponse en fraction, par exemple 2/9.)",
                reponse: 1 / 6,
                tolerance: 0.0005,
                indice: "Il y a 6 × 6 = 36 couples possibles, tous équiprobables. Comptez les couples dont la somme vaut 7 : (1 ; 6), (2 ; 5)…",
                explication: "Les couples (1 ; 6), (2 ; 5), (3 ; 4), (4 ; 3), (5 ; 2) et (6 ; 1) donnent 7 : 6 issues sur 36, soit 6/36 = 1/6."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Moyenne",
                enonce: "Calculez la moyenne des nombres 5, 9 et 10.",
                reponse: 8,
                indice: "Additionnez les nombres, puis divisez par leur nombre.",
                explication: "(5 + 9 + 10) ÷ 3 = 24 ÷ 3 = 8."
              },
              // 2e manche : l'esquive
              {
                titre: "Médiane",
                enonce: "Quelle est la médiane de la série 3 ; 9 ; 4 ; 12 ; 7 ?",
                reponse: 7,
                indice: "Rangez d'abord les valeurs dans l'ordre croissant.",
                explication: "3 ; 4 ; 7 ; 9 ; 12 : la valeur du milieu est 7."
              },
              // 3e manche : le coup final
              {
                titre: "Moyenne",
                enonce: "Calculez la moyenne des notes 8, 12 et 13.",
                reponse: 11,
                indice: "Additionnez les notes, puis divisez par leur nombre.",
                explication: "(8 + 12 + 13) ÷ 3 = 33 ÷ 3 = 11."
              }
            ]
          }
        ],
        acrobaties: [
          {
            figure: "salto",
            titre: "Le saut d'Hermès",
            enonce: "Hermès, le dieu de la chance, lance deux fois de suite une pièce équilibrée. Quelle est la probabilité d'obtenir deux fois « pile » ? (Réponse en fraction, par exemple 1/3.)",
            reponse: 1 / 4,
            tolerance: 0.0005,
            indice: "Les quatre issues PP, PF, FP et FF ont la même probabilité. Combien donnent deux fois pile ?",
            explication: "Une seule issue sur quatre (PP) donne deux fois pile : la probabilité vaut 1/4."
          }
        ]
      },

      {
        nom: "Les roses de Nightingale",
        notion: "Boss du chapitre : probabilités, effectifs, fréquences",
        fond: "jardin",
        athena: "Méduse la Gorgone garde la sortie. Ne la regarde pas dans les yeux : calcule ! Cinq questions, trois minutes chacune.",
        plan: [
        "############################",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#..........................#",
        "#........................A.#",
        "#.......................####",
        "#..........................#",
        "#......##.............##...S",
        "#J.G...##........T.........S",
        "############################"
      ],
        guides: [
          {
            nom: "Florence Nightingale (1820 – 1910)",
            portrait: "femme19",
            texte: "Infirmière pendant la guerre de Crimée, j'ai compté les soldats morts dans les hôpitaux : la plupart mouraient de maladies que l'on pouvait éviter, et non de leurs blessures. Mes diagrammes en forme de rose ont convaincu le gouvernement anglais d'améliorer l'hygiène. Les statistiques peuvent sauver des vies !"
          }
        ],
        steles: [
          {
            boss: "Méduse la Gorgone",
            monstre: "meduse",
            contexte: "Dans un lycée, on a interrogé 200 élèves de Seconde : 120 pratiquent un sport, 50 jouent d'un instrument de musique, et 30 font les deux. On choisit un de ces élèves au hasard.",
            exercices: [
              // 1re question : l'attaque
              {
                titre: "Question 1 : une probabilité",
                enonce: "Quelle est la probabilité que l'élève choisi pratique un sport ? (Réponse en écriture décimale.)",
                reponse: 0.6,
                indice: "Probabilité = nombre d'issues favorables ÷ nombre total d'issues.",
                explication: "120 ÷ 200 = 0,6."
              },
              // 2e question : l'esquive
              {
                titre: "Question 2 : un effectif",
                enonce: "Combien d'élèves pratiquent un sport sans jouer d'un instrument ?",
                reponse: 90,
                indice: "Parmi les 120 sportifs, 30 jouent aussi d'un instrument.",
                explication: "120 − 30 = 90 élèves."
              },
              // 3e question : l'attaque
              {
                titre: "Question 3 : la réunion",
                enonce: "Quelle est la probabilité que l'élève pratique un sport ou joue d'un instrument ? (Réponse en écriture décimale.)",
                reponse: 0.7,
                indice: "P(S ∪ M) = P(S) + P(M) − P(S ∩ M) : les 30 élèves qui font les deux ne doivent être comptés qu'une fois.",
                explication: "P(S ∪ M) = 120/200 + 50/200 − 30/200 = 140/200 = 0,7."
              },
              // 4e question : l'esquive
              {
                titre: "Question 4 : le contraire",
                enonce: "Combien d'élèves ne pratiquent ni sport ni instrument ?",
                reponse: 60,
                indice: "Les élèves qui font au moins l'un des deux sont 120 + 50 − 30.",
                explication: "120 + 50 − 30 = 140 élèves font au moins l'un des deux, donc 200 − 140 = 60 ne font ni l'un ni l'autre."
              },
              // 5e question : le coup final
              {
                titre: "Question 5 : une fréquence",
                enonce: "Parmi les élèves qui jouent d'un instrument, quel pourcentage pratique aussi un sport ?",
                reponse: 60,
                unite: "%",
                indice: "On ne regarde que les 50 musiciens : combien d'entre eux sont sportifs ?",
                explication: "30 musiciens sur 50 sont sportifs : 30 ÷ 50 = 0,6, soit 60 %."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Moyenne",
                enonce: "Calculez la moyenne de 4, 6 et 11.",
                reponse: 7,
                indice: "Additionnez, puis divisez par 3.",
                explication: "(4 + 6 + 11) ÷ 3 = 21 ÷ 3 = 7."
              },
              // 2e manche : l'esquive
              {
                titre: "Un dé",
                enonce: "On lance un dé équilibré à six faces. Quelle est la probabilité d'obtenir 6 ? (Réponse en fraction.)",
                reponse: 1 / 6,
                tolerance: 0.0005,
                indice: "Une issue favorable sur six issues équiprobables.",
                explication: "La probabilité vaut 1/6."
              },
              // 3e manche : le coup final
              {
                titre: "Pourcentage",
                enonce: "Combien font 30 % de 50 ?",
                reponse: 15,
                indice: "10 % de 50 = 5.",
                explication: "30 % de 50 = 3 × 5 = 15."
              }
            ]
          }
        ]
      }
    ]
  }

];
