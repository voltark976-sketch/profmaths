// =====================================================================
//  LES CHAPITRES ET LES SALLES DU JEU
// =====================================================================
//  C'est le seul fichier à modifier pour créer vos propres salles
//  et vos propres exercices.
//
//  ---- Les chapitres ----
//  Chaque chapitre correspond à une partie du programme. Il contient :
//     niveau        : "CM1 – 6e" ou "5e – 3e"
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
  //  PROLOGUE : L'éveil de Talos
  // =================================================================
  {
    prologue: true,
    titre: "L'éveil de Talos",
    introduction: "Éveille-toi, Talos, automate de bronze. Je suis Athéna. Ce temple garde la mémoire de celles et ceux qui ont inventé les mathématiques. Avant d'y entrer, apprends à te déplacer, à lire les stèles et à combattre leurs gardiens.",
    conclusion: "Tu es prêt ! Chaque galerie du temple correspond à une partie du programme : d'abord le CM1, le CM2 et la 6e, puis la 5e, la 4e et la 3e. On commence par la galerie des nombres entiers.",
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
            texte: "Bienvenue, Talos ! Avance avec les flèches ← → (ou Q et D). Saute avec Espace, ↑ ou Z. Approche-toi des inscriptions pour les lire."
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
        athena: "Le Minotaure garde la stèle de pierre : bats-le en trois manches pour allumer la stèle et ouvrir la porte. Si tu veux, grimpe jusqu'à la stèle d'or.",
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
            texte: "Là-haut brille une stèle d'or, gardée par les oiseaux du lac Stymphale. Ses trois questions sont des calculs rapides, à faire de tête. Elle n'ouvre pas la porte : elle est facultative. Mais chaque sceau d'or fait gagner des parures à Talos et ouvre, à la fin de chaque galerie, un sanctuaire secret aux problèmes plus difficiles."
          },
          {
            titre: "Les gardiens",
            texte: "Chaque stèle de pierre est gardée par un monstre, qui rôde tout près. Approche-toi et il fonce sur toi : le combat commence ! (Tu peux aussi appuyer sur E devant la stèle.) Le combat se joue en trois manches, une question par manche : à la première, une bonne réponse fait frapper Talos ; à la deuxième, elle lui fait esquiver le monstre ; à la troisième, Talos porte le coup final et le monstre est changé en pierre. Alors la stèle s'allume."
          },
          {
            titre: "Le sablier",
            texte: "Chaque manche se joue contre un sablier : 2 min 30, et 3 min pour le coup final. Prends ton temps, et utilise un brouillon si tu veux ! Si tu te trompes ou si le sable s'écoule, le monstre frappe et Talos perd un cœur ; un indice apparaît et tu peux réessayer. Sans cœur, Talos revient au départ de la salle. Une victoire rend un cœur à Talos et rapporte un sceau de pierre. Certaines stèles transforment la salle : une passerelle, par exemple, aura exactement la longueur que tu calcules."
          },
          {
            titre: "Tes sceaux",
            texte: "En haut de l'écran, tu vois tes sceaux, les cœurs de Talos et son rang. Chaque monstre vaincu rapporte de l'expérience (XP), et encore plus sans aucune erreur : Talos monte en rang et gagne des cœurs. Trois combats sans faute d'affilée appellent la foudre d'Athéna ! Le bouton « Parures » montre les ornements gagnés, le bouton « Son » coupe les bruitages."
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
                titre: "Tables de multiplication",
                enonce: "Combien font 5 × 6 ?",
                reponse: 30,
                indice: "Compte de 5 en 5, six fois : 5, 10, 15…",
                explication: "5 × 6 = 30."
              },
              // 2e manche : l'esquive
              {
                titre: "Tables de multiplication",
                enonce: "Combien font 20 ÷ 4 ?",
                reponse: 5,
                indice: "Cherche le nombre qui, multiplié par 4, donne 20.",
                explication: "4 × 5 = 20, donc 20 ÷ 4 = 5."
              },
              // 3e manche : le coup final
              {
                titre: "Tables de multiplication",
                enonce: "Combien font 7 × 8 ?",
                reponse: 56,
                indice: "7 × 8, c'est 7 × 10 moins 7 × 2.",
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
                titre: "Double",
                enonce: "Quel est le double de 15 ?",
                reponse: 30,
                indice: "Le double, c'est 15 + 15.",
                explication: "15 + 15 = 30."
              },
              // 2e manche : l'esquive
              {
                titre: "Moitié",
                enonce: "Quelle est la moitié de 40 ?",
                reponse: 20,
                indice: "La moitié, c'est partager en 2 parts égales.",
                explication: "20 + 20 = 40, donc la moitié de 40 est 20."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul mental",
                enonce: "Combien font 100 − 25 ?",
                reponse: 75,
                indice: "Pense aux pièces : 100 centimes, c'est 1 €. Que reste-t-il si on enlève 25 centimes ?",
                explication: "100 − 25 = 75."
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
            texte: "Certaines stèles d'argent portent les sandales ailées d'Hermès, le messager des dieux. Aucun monstre ne les garde. Résous leur problème, et Talos fait une figure acrobatique : un salto par-dessus un gouffre, un double salto jusqu'à une corniche… Elles mènent à des endroits impossibles à atteindre autrement."
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
            enonce: "Hermès réveille ses sandales ailées si tu calcules 12 × 5.",
            reponse: 60,
            indice: "12 × 5 = 10 × 5 + 2 × 5.",
            explication: "10 × 5 = 50 et 2 × 5 = 10, donc 12 × 5 = 60."
          }
        ]
      }
    ]
  },

  // =================================================================
  //  CHAPITRE : Nombres entiers et calcul
  // =================================================================
  {
    niveau: "CM1 – 6e",
    titre: "Nombres entiers et calcul",
    introduction: "Voici la galerie des nombres entiers. Ici, tu vas lire et écrire de grands nombres, calculer de tête ou en posant les opérations, et découvrir les multiples et les diviseurs.",
    conclusion: "Les nombres entiers n'ont plus de secret pour toi. La galerie des fractions et des nombres décimaux t'attend.",
    salles: [

      {
        nom: "Le zéro de Brahmagupta",
        notion: "Numération : écrire, comparer et arrondir les grands nombres",
        fond: "jardin",
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
            nom: "Brahmagupta (598 – vers 668)",
            portrait: "turban",
            texte: "Astronome en Inde, j'ai écrit en 628 un livre où le zéro est traité comme un vrai nombre, avec ses règles de calcul : 5 + 0 = 5, 5 × 0 = 0… Avec le zéro, dix chiffres suffisent pour écrire tous les nombres, même les plus grands."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Valeur d'un chiffre",
                enonce: "Dans le nombre 4 527, quel est le chiffre des centaines ?",
                reponse: 5,
                indice: "Lis de droite à gauche : unités, dizaines, centaines, milliers.",
                explication: "4 527 : 7 unités, 2 dizaines, 5 centaines et 4 milliers. Le chiffre des centaines est 5."
              },
              // 2e manche : l'esquive
              {
                titre: "Écrire un nombre",
                enonce: "Écris en chiffres : trois-mille-quarante.",
                reponse: 3040,
                indice: "Trois-mille, c'est 3 000. Ajoute quarante. Attention : il n'y a aucune centaine !",
                explication: "3 000 + 40 = 3 040. Le 0 montre qu'il n'y a aucune centaine."
              },
              // 3e manche : le coup final
              {
                titre: "Nombre de centaines",
                enonce: "Combien y a-t-il de centaines en tout dans 25 300 ?",
                reponse: 253,
                indice: "Attention, on ne demande pas le chiffre des centaines ! Combien de paquets de 100 peut-on faire avec 25 300 ?",
                explication: "25 300 = 253 × 100 : il y a 253 centaines en tout (le chiffre des centaines, lui, est 3)."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Comparer",
                enonce: "Quel est le plus grand de ces nombres : 9 870 ; 10 200 ; 9 999 ; 10 020 ? Écris-le.",
                reponse: 10200,
                indice: "Compare d'abord le nombre de chiffres, puis les chiffres un par un, en partant de la gauche.",
                explication: "10 200 et 10 020 ont 5 chiffres, les autres 4. Puis on compare les centaines : 2 > 0. Le plus grand est 10 200."
              },
              // 2e manche : l'esquive
              {
                titre: "Le nombre suivant",
                enonce: "Quel nombre vient juste après 39 999 ?",
                reponse: 40000,
                indice: "Ajoute 1 : toutes les « retenues » s'enchaînent.",
                explication: "39 999 + 1 = 40 000."
              },
              // 3e manche : le coup final
              {
                titre: "Arrondir",
                enonce: "Arrondis 46 732 au millier près.",
                reponse: 47000,
                indice: "46 732 est entre 46 000 et 47 000. Duquel est-il le plus proche ? Regarde le chiffre des centaines.",
                explication: "Le chiffre des centaines est 7, qui est au moins 5 : 46 732 est plus proche de 47 000 que de 46 000."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul mental",
                enonce: "Combien font 38 + 7 ?",
                reponse: 45,
                indice: "38 + 2 = 40, puis il reste 5 à ajouter.",
                explication: "38 + 2 = 40 et 40 + 5 = 45."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul mental",
                enonce: "Combien font 100 − 36 ?",
                reponse: 64,
                indice: "Quel nombre faut-il ajouter à 36 pour arriver à 100 ?",
                explication: "36 + 4 = 40 et 40 + 60 = 100 : 4 + 60 = 64."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul mental",
                enonce: "Combien font 199 + 56 ?",
                reponse: 255,
                indice: "199, c'est 200 − 1.",
                explication: "200 + 56 = 256, puis on enlève 1 : 255."
              }
            ]
          }
        ]
      },

      {
        nom: "Les chiffres de Fibonacci",
        notion: "Les quatre opérations : calcul posé et calcul mental",
        fond: "mer",
        athena: "Une stèle t'attend en bas, une autre en haut des marches. Pour atteindre la corniche de la stèle d'or, il te faudra la stèle d'Hermès.",
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
            nom: "Leonardo Fibonacci (vers 1170 – vers 1250)",
            portrait: "renaissance",
            texte: "Fils d'un marchand de Pise, en Italie, j'ai appris à Béjaïa, en Algérie, à calculer avec les chiffres indiens et arabes : 0, 1, 2, 3… En 1202, mon livre « Liber abaci » les a fait connaître en Europe. Avec eux, poser une addition ou une multiplication devient bien plus facile qu'avec les chiffres romains !"
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Addition",
                enonce: "Calcule 2 348 + 1 575.",
                reponse: 3923,
                indice: "Pose l'addition en colonnes et n'oublie pas les retenues.",
                explication: "8 + 5 = 13 (je pose 3, je retiens 1) ; 4 + 7 + 1 = 12 (je pose 2, je retiens 1) ; 3 + 5 + 1 = 9 ; 2 + 1 = 3. Le résultat est 3 923."
              },
              // 2e manche : l'esquive
              {
                titre: "Soustraction",
                enonce: "Calcule 5 000 − 1 264.",
                reponse: 3736,
                indice: "Tu peux compter de 1 264 jusqu'à 5 000 : d'abord jusqu'à 1 300, puis jusqu'à 5 000.",
                explication: "1 264 + 36 = 1 300, puis 1 300 + 3 700 = 5 000. L'écart est 36 + 3 700 = 3 736."
              },
              // 3e manche : le coup final
              {
                titre: "Problème",
                enonce: "Un marchand de Pise a 1 250 pièces d'or. Il en dépense 385, puis il en gagne 640. Combien de pièces a-t-il maintenant ?",
                reponse: 1505,
                indice: "Fais les calculs dans l'ordre : d'abord 1 250 − 385, puis ajoute 640.",
                explication: "1 250 − 385 = 865, puis 865 + 640 = 1 505 pièces."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Multiplication",
                enonce: "Calcule 47 × 6.",
                reponse: 282,
                indice: "47 × 6, c'est 40 × 6 plus 7 × 6.",
                explication: "40 × 6 = 240 et 7 × 6 = 42, donc 47 × 6 = 240 + 42 = 282."
              },
              // 2e manche : l'esquive
              {
                titre: "Multiplication",
                enonce: "Calcule 125 × 24.",
                reponse: 3000,
                indice: "125 × 4 = 500, et 24 = 4 × 6.",
                explication: "125 × 24 = 125 × 4 × 6 = 500 × 6 = 3 000."
              },
              // 3e manche : le coup final
              {
                titre: "Division",
                enonce: "Fibonacci range 156 œufs dans des boîtes de 12. Combien de boîtes remplit-il ?",
                reponse: 13,
                indice: "Combien de fois 12 entre-t-il dans 156 ? 12 × 10 = 120 : il reste encore 36.",
                explication: "12 × 10 = 120 et 12 × 3 = 36 : 12 × 13 = 156. Il remplit 13 boîtes."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Tables",
                enonce: "Combien font 8 × 7 ?",
                reponse: 56,
                indice: "8 × 7 = 7 × 8.",
                explication: "8 × 7 = 56."
              },
              // 2e manche : l'esquive
              {
                titre: "Tables",
                enonce: "Combien font 9 × 6 ?",
                reponse: 54,
                indice: "9 × 6 = 10 × 6 − 6.",
                explication: "60 − 6 = 54."
              },
              // 3e manche : le coup final
              {
                titre: "Tables",
                enonce: "Combien font 63 ÷ 7 ?",
                reponse: 9,
                indice: "Quel nombre, multiplié par 7, donne 63 ?",
                explication: "7 × 9 = 63, donc 63 ÷ 7 = 9."
              }
            ]
          }
        ],
        acrobaties: [
          {
            figure: "double",
            titre: "Le double salto",
            enonce: "Les sandales d'Hermès s'éveillent si tu calcules 25 × 16.",
            reponse: 400,
            indice: "25 × 4 = 100, et 16 = 4 × 4.",
            explication: "25 × 16 = 25 × 4 × 4 = 100 × 4 = 400."
          }
        ]
      },

      {
        nom: "Les nombres premiers d'Euclide",
        notion: "Division euclidienne, multiples et diviseurs (6e)",
        fond: "bibliotheque",
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
            nom: "Euclide d'Alexandrie (vers 300 av. J.-C.)",
            portrait: "grec",
            texte: "À Alexandrie, en Égypte, j'ai rassemblé les mathématiques de mon temps dans un grand livre, les « Éléments ». J'y ai montré qu'il existe une infinité de nombres premiers : ces nombres qu'on ne peut diviser que par 1 et par eux-mêmes, comme 2, 3, 5, 7, 11…"
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Division euclidienne",
                enonce: "Dans la division de 47 par 5, quel est le quotient ?",
                reponse: 9,
                indice: "Cherche le plus grand nombre de fois que 5 « entre » dans 47 : 5 × 9 = ?",
                explication: "5 × 9 = 45 et 5 × 10 = 50 est trop grand. Le quotient est 9 (47 = 5 × 9 + 2)."
              },
              // 2e manche : l'esquive
              {
                titre: "Le reste",
                enonce: "Dans la division de 47 par 5, quel est le reste ?",
                reponse: 2,
                indice: "5 × 9 = 45. Que reste-t-il pour aller jusqu'à 47 ?",
                explication: "47 = 5 × 9 + 2 : le reste est 2 (il est bien plus petit que 5)."
              },
              // 3e manche : le coup final
              {
                titre: "Division euclidienne",
                enonce: "Talos range 50 dalles par paquets de 11. Combien de dalles reste-t-il hors des paquets ? (La passerelle mesurera ce nombre de cases.)",
                reponse: 6,
                indice: "Combien de paquets complets de 11 peut-on faire avec 50 dalles ? 11 × 4 = 44.",
                explication: "50 = 11 × 4 + 6 : il fait 4 paquets et il reste 6 dalles.",
                effet: "passerelle"
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Multiples",
                enonce: "Quel est le plus petit multiple de 7 qui soit plus grand que 50 ?",
                reponse: 56,
                indice: "Récite la table de 7 : … 42, 49, …",
                explication: "7 × 7 = 49 est plus petit que 50, et 7 × 8 = 56 est plus grand. La réponse est 56."
              },
              // 2e manche : l'esquive
              {
                titre: "Divisibilité par 3",
                enonce: "Parmi les nombres 15, 24, 31, 42 et 57, combien sont divisibles par 3 ?",
                reponse: 4,
                indice: "Un nombre est divisible par 3 quand la somme de ses chiffres est dans la table de 3.",
                explication: "15 (1 + 5 = 6), 24 (6), 42 (6) et 57 (12) sont divisibles par 3 ; 31 (4) ne l'est pas. Il y en a 4."
              },
              // 3e manche : le coup final
              {
                titre: "Diviseurs",
                enonce: "Combien le nombre 18 a-t-il de diviseurs ?",
                reponse: 6,
                indice: "Cherche les paires de nombres dont le produit fait 18 : 1 × 18, 2 × 9…",
                explication: "1 × 18, 2 × 9 et 3 × 6 : les diviseurs de 18 sont 1, 2, 3, 6, 9 et 18. Il y en a 6."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Double",
                enonce: "Quel est le double de 45 ?",
                reponse: 90,
                indice: "Double de 40, plus double de 5.",
                explication: "80 + 10 = 90."
              },
              // 2e manche : l'esquive
              {
                titre: "Moitié",
                enonce: "Quelle est la moitié de 86 ?",
                reponse: 43,
                indice: "Moitié de 80, plus moitié de 6.",
                explication: "40 + 3 = 43."
              },
              // 3e manche : le coup final
              {
                titre: "Tables",
                enonce: "Combien font 11 × 12 ?",
                reponse: 132,
                indice: "11 × 12 = 10 × 12 + 12.",
                explication: "120 + 12 = 132."
              }
            ]
          }
        ]
      },

      {
        nom: "Le défi du jeune Gauss",
        notion: "Boss de la galerie : un problème sur les nombres entiers",
        fond: "temple",
        athena: "L'Hydre de Lerne garde la sortie de la galerie. Pour la vaincre, résous son problème en cinq questions : tu as quatre minutes par question.",
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
            nom: "Carl Friedrich Gauss (1777 – 1855)",
            portrait: "xixe",
            texte: "On raconte qu'à l'école, mon maître demanda à la classe d'additionner tous les nombres de 1 à 100, pour avoir la paix. J'ai trouvé 5 050 en quelques instants : 1 + 100, 2 + 99, 3 + 98… font toujours 101, et il y a 50 paires ! Plus tard, on m'a appelé « le prince des mathématiciens »."
          }
        ],
        steles: [
          {
            boss: "L'Hydre de Lerne",
            monstre: "hydre",
            contexte: "Une école part au musée avec 4 classes de 27 élèves. Chaque élève paie 6 € pour l'entrée. Un car peut transporter 50 personnes au maximum.",
            exercices: [
              // 1re question : l'attaque
              {
                titre: "Question 1 : les élèves",
                enonce: "Combien d'élèves participent à la sortie ?",
                reponse: 108,
                indice: "Il y a 4 classes de 27 élèves : calcule 4 × 27.",
                explication: "4 × 27 = 108 élèves."
              },
              // 2e question : l'esquive
              {
                titre: "Question 2 : l'argent",
                enonce: "Combien d'euros les élèves paient-ils en tout ?",
                reponse: 648,
                unite: "€",
                indice: "Chacun des 108 élèves paie 6 € : calcule 108 × 6.",
                explication: "108 × 6 = 100 × 6 + 8 × 6 = 600 + 48 = 648 €."
              },
              // 3e question : l'attaque
              {
                titre: "Question 3 : les cars",
                enonce: "12 adultes accompagnent les élèves. Combien de cars faut-il réserver, au minimum ?",
                reponse: 3,
                indice: "Compte d'abord tout le monde : 108 élèves + 12 adultes. Puis vérifie combien de cars de 50 places il faut.",
                explication: "108 + 12 = 120 personnes. 2 cars, c'est 100 places : pas assez. Il faut 3 cars (150 places)."
              },
              // 4e question : l'esquive
              {
                titre: "Question 4 : les groupes",
                enonce: "Au musée, les élèves visitent par groupes de 9. Combien de groupes y a-t-il ?",
                reponse: 12,
                indice: "Calcule 108 ÷ 9 : combien de fois 9 entre-t-il dans 108 ?",
                explication: "9 × 12 = 108 : il y a 12 groupes."
              },
              // 5e question : le coup final
              {
                titre: "Question 5 : le budget",
                enonce: "Chaque car coûte 285 €. La mairie donne 1 000 € pour payer les cars. Combien d'euros reste-t-il après avoir payé les 3 cars ?",
                reponse: 145,
                unite: "€",
                indice: "Calcule d'abord le prix des 3 cars : 3 × 285.",
                explication: "3 × 285 = 855 €, et 1 000 − 855 = 145 €."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul mental",
                enonce: "Combien font 50 × 4 ?",
                reponse: 200,
                indice: "5 × 4 = 20.",
                explication: "50 × 4 = 200."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul mental",
                enonce: "Combien font 300 ÷ 10 ?",
                reponse: 30,
                indice: "Diviser par 10, c'est enlever un zéro à la fin.",
                explication: "300 ÷ 10 = 30."
              },
              // 3e manche : le coup final
              {
                titre: "La paire de Gauss",
                enonce: "Combien font 99 + 101 ?",
                reponse: 200,
                indice: "99 = 100 − 1 et 101 = 100 + 1.",
                explication: "100 − 1 + 100 + 1 = 200."
              }
            ]
          }
        ]
      }
    ],
    // Le sanctuaire secret du chapitre : il s'ouvre avec assez de sceaux d'or.
    sanctuaire: {
      sceauxOr: 3,
      salle: {
        nom: "Le sanctuaire des nombres",
        notion: "Problèmes sur les nombres entiers",
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
            texte: "À mon époque, les écoles de sciences étaient fermées aux filles. J'ai appris seule, la nuit, à la bougie, et j'ai écrit au grand Gauss en signant d'un nom d'homme, « Monsieur Le Blanc ». Certains nombres premiers portent aujourd'hui mon nom."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Le nombre mystère",
                enonce: "Je pense à un nombre. Je le multiplie par 4, puis j'ajoute 7 : j'obtiens 51. Quel est mon nombre ?",
                reponse: 11,
                indice: "Remonte le calcul à l'envers : enlève 7, puis divise par 4.",
                explication: "51 − 7 = 44 et 44 ÷ 4 = 11. Vérification : 11 × 4 + 7 = 51."
              },
              // 2e manche : l'esquive
              {
                titre: "Partage",
                enonce: "Talos a 3 fois plus de sceaux que Pâris. À eux deux, ils ont 48 sceaux. Combien Pâris en a-t-il ?",
                reponse: 12,
                indice: "Si Pâris a 1 part, Talos en a 3 : cela fait 4 parts en tout.",
                explication: "48 ÷ 4 = 12 : Pâris a 12 sceaux et Talos 36 (12 + 36 = 48)."
              },
              // 3e manche : le coup final
              {
                titre: "Multiples",
                enonce: "Combien de nombres entre 1 et 100 sont à la fois multiples de 2 et multiples de 5 ? (La passerelle mesurera ce nombre de cases.)",
                reponse: 10,
                indice: "Un nombre multiple de 2 et de 5 est un multiple de 10.",
                explication: "Ce sont les multiples de 10 : 10, 20, …, 100. Il y en a 10.",
                effet: "passerelle"
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul astucieux",
                enonce: "Calcule 4 × 37 × 25.",
                reponse: 3700,
                indice: "Change l'ordre : 4 × 25 = 100.",
                explication: "4 × 25 = 100, et 100 × 37 = 3 700."
              },
              // 2e manche : l'esquive
              {
                titre: "La méthode de Gauss",
                enonce: "Calcule 1 + 2 + 3 + … + 20.",
                reponse: 210,
                indice: "Fais des paires comme Gauss : 1 + 20, 2 + 19, 3 + 18… Combien vaut chaque paire, et combien y a-t-il de paires ?",
                explication: "Chaque paire vaut 21 et il y a 10 paires : 10 × 21 = 210."
              },
              // 3e manche : le coup final
              {
                titre: "Les marches",
                enonce: "Les marches d'un temple sont numérotées de 1 à 60. Talos ne pose le pied que sur les marches dont le numéro est un multiple de 4. Sur combien de marches pose-t-il le pied ?",
                reponse: 15,
                indice: "Les multiples de 4 jusqu'à 60 : 4, 8, 12, … 60. Combien de fois 4 entre-t-il dans 60 ?",
                explication: "60 ÷ 4 = 15 : ce sont les marches 4 × 1, 4 × 2, …, 4 × 15."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Compter",
                enonce: "Combien existe-t-il de nombres entiers à deux chiffres ?",
                reponse: 90,
                indice: "Le plus petit est 10, le plus grand est 99.",
                explication: "De 10 à 99 : il y en a 99 − 10 + 1 = 90."
              },
              // 2e manche : l'esquive
              {
                titre: "Numéroter un livre",
                enonce: "Pour numéroter les pages d'un livre de la page 1 à la page 20, combien de chiffres faut-il écrire ?",
                reponse: 31,
                indice: "Les pages 1 à 9 ont un chiffre ; les pages 10 à 20 en ont deux.",
                explication: "9 pages à 1 chiffre (9 chiffres) et 11 pages à 2 chiffres (22 chiffres) : 9 + 22 = 31."
              },
              // 3e manche : le coup final
              {
                titre: "Le reste commun",
                enonce: "Quel est le plus petit nombre plus grand que 1 qui, divisé par 3, par 4 ou par 5, donne toujours un reste de 1 ?",
                reponse: 61,
                indice: "Enlève 1 à ce nombre : on obtient un multiple de 3, de 4 et de 5 à la fois.",
                explication: "Le plus petit multiple commun de 3, 4 et 5 est 60. Le nombre cherché est 60 + 1 = 61."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul mental",
                enonce: "Combien font 125 × 8 ?",
                reponse: 1000,
                indice: "125 × 2 = 250, puis on double encore deux fois.",
                explication: "125 × 8 = 1 000."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul mental",
                enonce: "Combien font 999 + 999 ?",
                reponse: 1998,
                indice: "999 = 1 000 − 1.",
                explication: "1 000 + 1 000 − 2 = 1 998."
              },
              // 3e manche : le coup final
              {
                titre: "Tables",
                enonce: "Combien font 72 ÷ 8 ?",
                reponse: 9,
                indice: "8 × 9 = ?",
                explication: "8 × 9 = 72, donc 72 ÷ 8 = 9."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  //  CHAPITRE : Fractions et nombres décimaux
  // =================================================================
  {
    niveau: "CM1 – 6e",
    titre: "Fractions et nombres décimaux",
    introduction: "Voici la galerie des parts et des virgules. Ici, on découpe les nombres en morceaux : les fractions, puis les nombres décimaux.",
    conclusion: "Tu sais partager et calculer avec la virgule. La galerie des mesures t'attend.",
    salles: [

      {
        nom: "Le papyrus d'Ahmès",
        notion: "Fractions simples : partages, fraction d'une quantité",
        fond: "crepuscule",
        athena: "Une stèle t'attend ici, l'autre au sommet des marches de pierre.",
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
            nom: "Ahmès (vers 1650 av. J.-C.)",
            portrait: "grec",
            texte: "Je suis un scribe égyptien. J'ai recopié sur un long rouleau de papyrus, qu'on appelle aujourd'hui le « papyrus Rhind », des dizaines de problèmes : partager des pains entre des ouvriers, calculer des fractions… Nous, les Égyptiens, écrivions presque toutes nos fractions avec un seul morceau, comme 1/2, 1/3 ou 1/4."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Fraction",
                enonce: "Une galette est coupée en 8 parts égales. Talos en mange 3. Quelle fraction de la galette a-t-il mangée ? (Écris une fraction, par exemple 1/2.)",
                reponse: 3 / 8,
                tolerance: 0.0005,
                indice: "La galette entière, ce sont 8 parts : 8 est en bas. Talos en a pris 3 : 3 est en haut.",
                explication: "Il a mangé 3 parts sur 8 : 3/8 de la galette."
              },
              // 2e manche : l'esquive
              {
                titre: "Fraction d'une quantité",
                enonce: "Combien font 1/4 de 20 pains ?",
                reponse: 5,
                indice: "Prendre 1/4, c'est partager en 4 parts égales.",
                explication: "20 ÷ 4 = 5 pains."
              },
              // 3e manche : le coup final
              {
                titre: "Fraction d'une quantité",
                enonce: "Combien font 3/5 de 40 pains ?",
                reponse: 24,
                indice: "Calcule d'abord 1/5 de 40, puis prends-en 3 fois plus.",
                explication: "1/5 de 40 = 40 ÷ 5 = 8, donc 3/5 de 40 = 3 × 8 = 24 pains."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Fractions égales",
                enonce: "Complète : 1/2 = …/10. Quel est le nombre manquant ?",
                reponse: 5,
                indice: "Pour passer de 2 à 10 en bas, on multiplie par 5. Fais pareil en haut.",
                explication: "1/2 = (1 × 5)/(2 × 5) = 5/10."
              },
              // 2e manche : l'esquive
              {
                titre: "Comparer",
                enonce: "Quelle est la plus grande de ces fractions : 3/4 ; 2/3 ; 5/8 ? Écris-la.",
                reponse: 3 / 4,
                tolerance: 0.0005,
                indice: "Compare chaque fraction à 1 : combien manque-t-il pour arriver à 1 ? Celle à qui il manque le moins est la plus grande.",
                explication: "Il manque 1/4 à 3/4, 1/3 à 2/3 et 3/8 à 5/8. C'est 1/4 le plus petit manque : 3/4 est la plus grande (0,75)."
              },
              // 3e manche : le coup final
              {
                titre: "Somme de fractions",
                enonce: "Talos boit 2/9 d'une amphore le matin et 4/9 le soir. Quelle fraction de l'amphore a-t-il bue ? (Écris une fraction.)",
                reponse: 6 / 9,
                tolerance: 0.0005,
                indice: "Les deux fractions ont le même dénominateur (9) : on ajoute les numérateurs.",
                explication: "2/9 + 4/9 = 6/9 (qu'on peut aussi écrire 2/3)."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Moitié",
                enonce: "Quelle est la moitié de 18 ?",
                reponse: 9,
                indice: "9 + 9 = ?",
                explication: "9 + 9 = 18 : la moitié de 18 est 9."
              },
              // 2e manche : l'esquive
              {
                titre: "Quart",
                enonce: "Combien vaut le quart de 100 ?",
                reponse: 25,
                indice: "Le quart, c'est la moitié de la moitié.",
                explication: "100 ÷ 2 = 50 et 50 ÷ 2 = 25."
              },
              // 3e manche : le coup final
              {
                titre: "Tiers",
                enonce: "Combien vaut le tiers de 30 ?",
                reponse: 10,
                indice: "Le tiers, c'est partager en 3.",
                explication: "30 ÷ 3 = 10."
              }
            ]
          }
        ]
      },

      {
        nom: "La dîme de Stevin",
        notion: "Nombres décimaux : écrire, comparer, repérer sur une droite graduée",
        fond: "temple",
        athena: "Allume la dalle d'or sur l'estrade et bats les deux gardiens pour ouvrir la porte. Attention au précipice !",
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
            nom: "Simon Stevin (1548 – 1620)",
            portrait: "renaissance",
            texte: "Ingénieur à Bruges, en Flandre, j'ai publié en 1585 « La Disme », un petit livre qui apprend à tous à calculer avec les nombres décimaux. Grâce à lui, on a pris l'habitude d'écrire 0,5 plutôt que 1/2. Je rêvais même que les mesures et les monnaies se comptent de dix en dix !"
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Fraction décimale",
                enonce: "Écris 7/10 sous forme d'un nombre décimal.",
                reponse: 0.7,
                indice: "7/10, c'est 7 dixièmes : le 7 se place juste après la virgule.",
                explication: "7/10 = 0,7."
              },
              // 2e manche : l'esquive
              {
                titre: "Fraction décimale",
                enonce: "Écris 245/100 sous forme d'un nombre décimal.",
                reponse: 2.45,
                indice: "245/100, c'est 245 centièmes : 2 unités et 45 centièmes.",
                explication: "245/100 = 200/100 + 45/100 = 2 + 0,45 = 2,45."
              },
              // 3e manche : le coup final
              {
                titre: "Valeur d'un chiffre",
                enonce: "Dans le nombre 36,825, quel est le chiffre des centièmes ?",
                reponse: 2,
                indice: "Après la virgule : dixièmes, centièmes, millièmes.",
                explication: "36,825 : 8 dixièmes, 2 centièmes et 5 millièmes. Le chiffre des centièmes est 2."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Comparer",
                enonce: "Quel est le plus grand nombre : 3,7 ou 3,65 ? Écris-le.",
                reponse: 3.7,
                indice: "Écris-les avec autant de chiffres après la virgule : 3,70 et 3,65.",
                explication: "3,70 > 3,65 : le plus grand est 3,7, même s'il a moins de chiffres !"
              },
              // 2e manche : l'esquive
              {
                titre: "Encadrer",
                enonce: "Quel est le nombre entier juste en dessous de 12,8 ?",
                reponse: 12,
                indice: "12,8 est entre deux nombres entiers qui se suivent.",
                explication: "12 < 12,8 < 13 : le nombre entier juste en dessous est 12."
              },
              // 3e manche : le coup final
              {
                titre: "Droite graduée",
                enonce: "Sur une droite graduée, l'espace entre 2 et 3 est partagé en 10 parts égales. Talos est placé 4 parts après le 2. Quel nombre repère sa place ?",
                reponse: 2.4,
                indice: "Chaque petite part vaut un dixième, c'est-à-dire 0,1.",
                explication: "4 parts de 0,1, cela fait 0,4. Talos est sur le nombre 2 + 0,4 = 2,4."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul mental",
                enonce: "Combien font 0,5 + 0,5 ?",
                reponse: 1,
                indice: "Deux moitiés font…",
                explication: "0,5 + 0,5 = 1."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul mental",
                enonce: "Combien font 1,2 + 0,8 ?",
                reponse: 2,
                indice: "2 dixièmes + 8 dixièmes = 10 dixièmes.",
                explication: "1,2 + 0,8 = 2."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul mental",
                enonce: "Combien font 10 − 0,5 ?",
                reponse: 9.5,
                indice: "Enlève une moitié à 10.",
                explication: "10 − 0,5 = 9,5."
              }
            ]
          }
        ]
      },

      {
        nom: "Les bâtons de Neper",
        notion: "Calculer avec les décimaux, multiplier et diviser par 10, 100, 1 000",
        fond: "brumes",
        athena: "Deux gardiens, puis un gouffre immense : seule la stèle d'Hermès te le fera franchir, d'un salto.",
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
            nom: "John Napier, dit Neper (1550 – 1617)",
            portrait: "renaissance",
            texte: "Seigneur écossais, j'ai inventé des petites réglettes gravées de nombres, les « bâtons de Neper », pour faire les multiplications sans se tromper. Dans mon livre, j'ai aussi utilisé la virgule (chez moi, un point) pour écrire les nombres décimaux, ce qui a aidé à la faire connaître."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Multiplier par 10",
                enonce: "Calcule 3,7 × 10.",
                reponse: 37,
                indice: "Multiplier par 10 : chaque chiffre prend une valeur 10 fois plus grande (la virgule se décale d'un rang vers la droite).",
                explication: "3,7 × 10 = 37 : les 7 dixièmes deviennent 7 unités."
              },
              // 2e manche : l'esquive
              {
                titre: "Multiplier par 100",
                enonce: "Calcule 0,45 × 100.",
                reponse: 45,
                indice: "Multiplier par 100 : chaque chiffre prend une valeur 100 fois plus grande.",
                explication: "0,45 × 100 = 45 : les 45 centièmes deviennent 45 unités."
              },
              // 3e manche : le coup final
              {
                titre: "Diviser par 1 000",
                enonce: "Calcule 2 500 ÷ 1 000.",
                reponse: 2.5,
                indice: "Diviser par 1 000 : chaque chiffre prend une valeur 1 000 fois plus petite.",
                explication: "2 500 ÷ 1 000 = 2,5 : les 2 milliers deviennent 2 unités et les 5 centaines, 5 dixièmes."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Addition",
                enonce: "Calcule 12,5 + 3,75.",
                reponse: 16.25,
                indice: "Pose l'addition en alignant les virgules : 12,50 + 3,75.",
                explication: "12,50 + 3,75 = 16,25."
              },
              // 2e manche : l'esquive
              {
                titre: "Soustraction",
                enonce: "Calcule 20 − 7,4.",
                reponse: 12.6,
                indice: "Écris 20 comme 20,0 et pose la soustraction, ou compte de 7,4 jusqu'à 20.",
                explication: "7,4 + 0,6 = 8 et 8 + 12 = 20 : 20 − 7,4 = 12,6."
              },
              // 3e manche : le coup final
              {
                titre: "Problème",
                enonce: "Un bâton de Neper mesure 7,5 cm. Talos en aligne 4 bout à bout. Quelle longueur obtient-il ?",
                reponse: 30,
                unite: "cm",
                indice: "Calcule 4 × 7,5 : c'est 4 × 7 plus 4 × 0,5.",
                explication: "4 × 7 = 28 et 4 × 0,5 = 2 : 4 × 7,5 = 30 cm."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul mental",
                enonce: "Combien font 0,25 × 4 ?",
                reponse: 1,
                indice: "Quatre quarts font…",
                explication: "0,25 × 4 = 1."
              },
              // 2e manche : l'esquive
              {
                titre: "Moitié",
                enonce: "Quelle est la moitié de 5 ?",
                reponse: 2.5,
                indice: "2 + 2 = 4, et il reste 1 à partager.",
                explication: "5 ÷ 2 = 2,5."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul mental",
                enonce: "Combien font 3 × 0,1 ?",
                reponse: 0.3,
                indice: "Trois dixièmes.",
                explication: "3 × 0,1 = 0,3."
              }
            ]
          }
        ],
        acrobaties: [
          {
            figure: "salto",
            titre: "Le salto d'Hermès",
            enonce: "Hermès réveille ses sandales ailées si tu calcules 4,2 × 3.",
            reponse: 12.6,
            indice: "4,2 × 3, c'est 4 × 3 plus 0,2 × 3.",
            explication: "4 × 3 = 12 et 0,2 × 3 = 0,6 : 4,2 × 3 = 12,6."
          }
        ]
      },

      {
        nom: "Le marché de Samarcande",
        notion: "Boss de la galerie : un problème avec des décimaux et des fractions",
        fond: "orient",
        athena: "Polyphème le Cyclope garde la sortie de la galerie. Résous son problème en cinq questions : tu as quatre minutes par question.",
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
            nom: "Al-Kashi (vers 1380 – 1429)",
            portrait: "turban",
            texte: "Astronome à Samarcande, j'ai écrit « La clé de l'arithmétique », où j'explique comment calculer avec les fractions décimales. J'ai aussi calculé le nombre π avec 16 chiffres justes après la virgule : un record qui a tenu plus de 150 ans !"
          }
        ],
        steles: [
          {
            boss: "Polyphème le Cyclope",
            monstre: "cyclope",
            contexte: "Au marché de Samarcande, les dattes coûtent 4,50 € le kilo et les figues 8 € le kilo. Talos achète 2 kg de dattes et 1,5 kg de figues.",
            exercices: [
              // 1re question : l'attaque
              {
                titre: "Question 1 : les dattes",
                enonce: "Combien Talos paie-t-il pour les dattes ?",
                reponse: 9,
                unite: "€",
                indice: "2 kg à 4,50 € le kilo : calcule 2 × 4,50.",
                explication: "2 × 4,50 = 9 €."
              },
              // 2e question : l'esquive
              {
                titre: "Question 2 : les figues",
                enonce: "Combien Talos paie-t-il pour les figues ?",
                reponse: 12,
                unite: "€",
                indice: "1,5 kg, c'est 1 kg et un demi-kilo.",
                explication: "1 kg coûte 8 € et un demi-kilo 4 € : 8 + 4 = 12 €."
              },
              // 3e question : l'attaque
              {
                titre: "Question 3 : le total",
                enonce: "Combien Talos paie-t-il en tout ?",
                reponse: 21,
                unite: "€",
                indice: "Ajoute le prix des dattes et celui des figues.",
                explication: "9 + 12 = 21 €."
              },
              // 4e question : l'esquive
              {
                titre: "Question 4 : la monnaie",
                enonce: "Talos paie avec un billet de 50 €. Combien le marchand lui rend-il ?",
                reponse: 29,
                unite: "€",
                indice: "Calcule 50 − 21.",
                explication: "50 − 21 = 29 €."
              },
              // 5e question : le coup final
              {
                titre: "Question 5 : le cadeau",
                enonce: "Talos donne les 3/4 de ses dattes à Athéna. Combien de kilos de dattes lui donne-t-il ?",
                reponse: 1.5,
                unite: "kg",
                indice: "Il a 2 kg de dattes. Calcule d'abord 1/4 de 2 kg.",
                explication: "1/4 de 2 kg = 2 ÷ 4 = 0,5 kg, donc 3/4 de 2 kg = 3 × 0,5 = 1,5 kg."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul mental",
                enonce: "Combien font 0,1 + 0,2 ?",
                reponse: 0.3,
                indice: "1 dixième + 2 dixièmes.",
                explication: "0,1 + 0,2 = 0,3."
              },
              // 2e manche : l'esquive
              {
                titre: "Fraction",
                enonce: "Combien vaut la moitié de 30 ?",
                reponse: 15,
                indice: "30 ÷ 2.",
                explication: "15 + 15 = 30."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul mental",
                enonce: "Combien font 2,5 × 2 ?",
                reponse: 5,
                indice: "Le double de 2,5.",
                explication: "2,5 + 2,5 = 5."
              }
            ]
          }
        ]
      }
    ],
    // Le sanctuaire secret du chapitre : il s'ouvre avec assez de sceaux d'or.
    sanctuaire: {
      sceauxOr: 3,
      salle: {
        nom: "Le sanctuaire des parts",
        notion: "Problèmes : fractions et décimaux",
        fond: "sanctuaire",
        athena: "Le sanctuaire des parts récompense ta patience. Gravis les marches : chaque stèle t'attend un peu plus haut, et la plus haute construira la passerelle.",
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
            nom: "Ada Lovelace (1815 – 1852)",
            portrait: "femme19",
            texte: "Fille du poète anglais Byron, j'ai été passionnée de calcul dès l'enfance. En 1843, j'ai écrit pour la « machine analytique » de mon ami Charles Babbage ce qu'on considère souvent comme le premier programme informatique de l'histoire."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Partage",
                enonce: "Un ruban de 3,6 m est coupé en 4 morceaux égaux. Combien mesure chaque morceau ?",
                reponse: 0.9,
                unite: "m",
                indice: "3,6 m, c'est 36 dixièmes de mètre. Partage-les en 4.",
                explication: "36 dixièmes ÷ 4 = 9 dixièmes : chaque morceau mesure 0,9 m."
              },
              // 2e manche : l'esquive
              {
                titre: "Le nombre caché",
                enonce: "Les 2/3 d'un nombre valent 14. Quel est ce nombre ?",
                reponse: 21,
                indice: "Si 2 tiers valent 14, combien vaut 1 tiers ?",
                explication: "1/3 du nombre vaut 14 ÷ 2 = 7, donc le nombre vaut 3 × 7 = 21."
              },
              // 3e manche : le coup final
              {
                titre: "Le parchemin",
                enonce: "Un parchemin a 27 lignes. Talos en a déjà lu les 2/3. Combien de lignes lui reste-t-il à lire ? (La passerelle mesurera ce nombre de cases.)",
                reponse: 9,
                indice: "S'il a lu les 2/3, il lui reste 1/3 du parchemin.",
                explication: "Il reste 1/3 de 27 lignes : 27 ÷ 3 = 9 lignes.",
                effet: "passerelle"
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Fraction et décimal",
                enonce: "Écris 3/4 sous forme d'un nombre décimal.",
                reponse: 0.75,
                indice: "3/4, c'est 3 fois 1/4, et 1/4 = 0,25.",
                explication: "3 × 0,25 = 0,75."
              },
              // 2e manche : l'esquive
              {
                titre: "Au milieu",
                enonce: "Quel nombre est exactement au milieu de 2,4 et 2,5 ?",
                reponse: 2.45,
                indice: "Écris 2,4 = 2,40 et 2,5 = 2,50 : quel nombre est au milieu de 40 et 50 ?",
                explication: "Entre 2,40 et 2,50, le milieu est 2,45."
              },
              // 3e manche : le coup final
              {
                titre: "Compter",
                enonce: "Combien y a-t-il de nombres qui s'écrivent 3,… avec un seul chiffre après la virgule, ce chiffre n'étant pas 0 ?",
                reponse: 9,
                indice: "Écris-les : 3,1 ; 3,2 ; …",
                explication: "3,1 ; 3,2 ; 3,3 ; 3,4 ; 3,5 ; 3,6 ; 3,7 ; 3,8 ; 3,9 : il y en a 9."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Ranger",
                enonce: "Range 0,8 ; 0,75 et 0,09 du plus petit au plus grand. Quel nombre est au milieu ?",
                reponse: 0.75,
                indice: "Écris-les avec deux chiffres après la virgule : 0,80 ; 0,75 ; 0,09.",
                explication: "0,09 < 0,75 < 0,80 : le nombre du milieu est 0,75."
              },
              // 2e manche : l'esquive
              {
                titre: "Multiplier",
                enonce: "Calcule 0,2 × 0,3.",
                reponse: 0.06,
                indice: "Calcule 2 × 3, puis compte les chiffres après la virgule dans les deux nombres.",
                explication: "2 × 3 = 6, et il y a deux chiffres après la virgule en tout : 0,2 × 0,3 = 0,06."
              },
              // 3e manche : le coup final
              {
                titre: "Les verres",
                enonce: "Une bouteille contient 1,5 L de jus. On remplit des verres de 0,25 L. Combien de verres remplit-on ?",
                reponse: 6,
                indice: "Avec 1 L, on remplit 4 verres de 0,25 L. Et avec un demi-litre ?",
                explication: "1 L remplit 4 verres et 0,5 L en remplit 2 : 4 + 2 = 6 verres."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul mental",
                enonce: "Combien font 0,5 × 8 ?",
                reponse: 4,
                indice: "La moitié de 8.",
                explication: "0,5 × 8 = 4."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul mental",
                enonce: "Combien font 1 − 0,25 ?",
                reponse: 0.75,
                indice: "Un entier moins un quart.",
                explication: "1 − 0,25 = 0,75."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul mental",
                enonce: "Combien font 10 × 0,7 ?",
                reponse: 7,
                indice: "7 dixièmes, dix fois.",
                explication: "10 × 0,7 = 7."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  //  CHAPITRE : Grandeurs et mesures
  // =================================================================
  {
    niveau: "CM1 – 6e",
    titre: "Grandeurs et mesures",
    introduction: "Voici la galerie des mesures. Longueurs, masses, durées, aires, volumes : ici, on mesure le monde, comme l'ont fait les savants d'Alexandrie.",
    conclusion: "Tu sais mesurer le monde. La galerie des figures t'attend.",
    salles: [

      {
        nom: "La Terre d'Ératosthène",
        notion: "Longueurs, masses et contenances : les conversions",
        fond: "bibliotheque",
        athena: "Grimpe jusqu'à la stèle perchée, allume la dalle d'or, puis affronte le gardien d'en bas.",
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
            nom: "Ératosthène de Cyrène (vers 276 – 194 av. J.-C.)",
            portrait: "grec",
            texte: "J'étais le bibliothécaire d'Alexandrie. En comparant l'ombre d'un bâton à Alexandrie et à Syène, le même jour à midi, j'ai calculé le tour de la Terre : environ 250 000 stades, soit à peu près 40 000 km si l'on estime bien la longueur du stade. Une mesure étonnante, il y a plus de 2 000 ans !"
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Convertir",
                enonce: "Combien de centimètres y a-t-il dans 3 m ?",
                reponse: 300,
                unite: "cm",
                indice: "1 m = 100 cm.",
                explication: "3 × 100 = 300 cm."
              },
              // 2e manche : l'esquive
              {
                titre: "Convertir",
                enonce: "Convertis 2,5 km en mètres.",
                reponse: 2500,
                unite: "m",
                indice: "1 km = 1 000 m.",
                explication: "2,5 × 1 000 = 2 500 m."
              },
              // 3e manche : le coup final
              {
                titre: "Les pas de Talos",
                enonce: "Talos fait des pas de 75 cm. Combien de mètres parcourt-il en 100 pas ?",
                reponse: 75,
                unite: "m",
                indice: "Calcule la distance en centimètres, puis convertis en mètres (1 m = 100 cm).",
                explication: "100 × 75 cm = 7 500 cm = 75 m."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Masses",
                enonce: "Combien de grammes y a-t-il dans 4 kg ?",
                reponse: 4000,
                unite: "g",
                indice: "1 kg = 1 000 g.",
                explication: "4 × 1 000 = 4 000 g."
              },
              // 2e manche : l'esquive
              {
                titre: "Contenances",
                enonce: "Combien de centilitres y a-t-il dans 1,5 L ?",
                reponse: 150,
                unite: "cL",
                indice: "1 L = 100 cL.",
                explication: "1,5 × 100 = 150 cL."
              },
              // 3e manche : le coup final
              {
                titre: "L'amphore",
                enonce: "Une amphore contient 12 L d'huile. On la verse dans des fioles de 25 cL. Combien de fioles remplit-on ?",
                reponse: 48,
                indice: "Combien de fioles de 25 cL faut-il pour 1 L, c'est-à-dire 100 cL ?",
                explication: "1 L = 100 cL remplit 4 fioles. 12 L remplissent 12 × 4 = 48 fioles."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Conversion",
                enonce: "1 m = combien de cm ?",
                reponse: 100,
                unite: "cm",
                indice: "« Centi » veut dire « centième ».",
                explication: "1 m = 100 cm."
              },
              // 2e manche : l'esquive
              {
                titre: "Conversion",
                enonce: "1 kg = combien de g ?",
                reponse: 1000,
                unite: "g",
                indice: "« Kilo » veut dire « mille ».",
                explication: "1 kg = 1 000 g."
              },
              // 3e manche : le coup final
              {
                titre: "Conversion",
                enonce: "1 km = combien de m ?",
                reponse: 1000,
                unite: "m",
                indice: "« Kilo » veut dire « mille ».",
                explication: "1 km = 1 000 m."
              }
            ]
          }
        ]
      },

      {
        nom: "Les horloges de Ctésibios",
        notion: "Durées et horaires",
        fond: "temple",
        athena: "Une stèle t'attend en bas, l'autre en haut, après une série de sauts.",
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
            nom: "Ctésibios d'Alexandrie (IIIe siècle av. J.-C.)",
            portrait: "grec",
            texte: "On raconte que j'étais fils de barbier, et je suis devenu un grand inventeur. J'ai perfectionné la clepsydre, une horloge à eau : l'eau coule goutte à goutte et fait monter un flotteur, qui indique l'heure. Pendant des siècles, ce fut l'une des horloges les plus précises du monde."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Durées",
                enonce: "Combien de minutes y a-t-il dans 2 h ?",
                reponse: 120,
                unite: "min",
                indice: "1 h = 60 min.",
                explication: "2 × 60 = 120 min."
              },
              // 2e manche : l'esquive
              {
                titre: "Durées",
                enonce: "Un trajet dure 1 h 45 min. Combien de minutes cela fait-il ?",
                reponse: 105,
                unite: "min",
                indice: "1 h = 60 min. Ajoute les 45 min.",
                explication: "60 + 45 = 105 min."
              },
              // 3e manche : le coup final
              {
                titre: "Durées",
                enonce: "Combien de secondes y a-t-il dans un quart d'heure ?",
                reponse: 900,
                unite: "s",
                indice: "Un quart d'heure = 15 min, et 1 min = 60 s.",
                explication: "15 × 60 = 900 s."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Horaires",
                enonce: "Un spectacle commence à 14 h 30 et finit à 16 h 10. Combien de minutes dure-t-il ?",
                reponse: 100,
                unite: "min",
                indice: "Compte par étapes : de 14 h 30 à 15 h, puis de 15 h à 16 h, puis de 16 h à 16 h 10.",
                explication: "30 min + 60 min + 10 min = 100 min (soit 1 h 40 min)."
              },
              // 2e manche : l'esquive
              {
                titre: "Horaires",
                enonce: "Talos retourne une clepsydre à 10 h 35. Elle se vide en 40 min. Elle est vide à 11 h et combien de minutes ?",
                reponse: 15,
                unite: "min",
                indice: "De 10 h 35 à 11 h, il y a 25 min. Combien de minutes reste-t-il à attendre ?",
                explication: "25 min pour arriver à 11 h, puis 40 − 25 = 15 min : elle est vide à 11 h 15."
              },
              // 3e manche : le coup final
              {
                titre: "La clepsydre",
                enonce: "Une clepsydre laisse couler 3 L d'eau en 1 h, toujours au même rythme. Combien de minutes faut-il pour qu'il s'écoule 2 L ?",
                reponse: 40,
                unite: "min",
                indice: "1 h = 60 min pour 3 L. Combien de minutes pour 1 L ?",
                explication: "1 L s'écoule en 60 ÷ 3 = 20 min, donc 2 L en 2 × 20 = 40 min."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Durées",
                enonce: "1 min = combien de secondes ?",
                reponse: 60,
                unite: "s",
                indice: "Pense à la trotteuse d'une montre.",
                explication: "1 min = 60 s."
              },
              // 2e manche : l'esquive
              {
                titre: "Durées",
                enonce: "Une demi-heure = combien de minutes ?",
                reponse: 30,
                unite: "min",
                indice: "La moitié de 60 min.",
                explication: "60 ÷ 2 = 30 min."
              },
              // 3e manche : le coup final
              {
                titre: "Durées",
                enonce: "1 jour = combien d'heures ?",
                reponse: 24,
                unite: "h",
                indice: "Le jour et la nuit, ensemble.",
                explication: "1 jour = 24 h."
              }
            ]
          }
        ]
      },

      {
        nom: "Les champs de Héron",
        notion: "Périmètres et aires",
        fond: "jardin",
        athena: "Le gouffre est trop large pour sauter. La passerelle aura exactement la longueur que tu calculeras.",
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
            nom: "Héron d'Alexandrie (Ier siècle)",
            portrait: "grec",
            texte: "Ingénieur à Alexandrie, j'ai écrit les « Métriques », un livre pour mesurer les champs, les murs et les réservoirs. J'y donne même une façon de calculer l'aire d'un triangle à partir de ses trois côtés. Et j'ai fabriqué l'une des premières machines à vapeur : l'éolipyle !"
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Périmètre",
                enonce: "Quel est le périmètre d'un carré de 5 m de côté ?",
                reponse: 20,
                unite: "m",
                indice: "Le périmètre, c'est la longueur du tour : un carré a 4 côtés égaux.",
                explication: "4 × 5 = 20 m."
              },
              // 2e manche : l'esquive
              {
                titre: "Périmètre",
                enonce: "Quel est le périmètre d'un rectangle de 8 m de long et 3 m de large ?",
                reponse: 22,
                unite: "m",
                indice: "Fais le tour : 8 + 3 + 8 + 3.",
                explication: "8 + 3 + 8 + 3 = 22 m."
              },
              // 3e manche : le coup final
              {
                titre: "Périmètre",
                enonce: "Un rectangle a un périmètre de 20 m. Un de ses côtés mesure 4 m. Combien mesure l'autre côté ? (La passerelle mesurera ce nombre de cases.)",
                reponse: 6,
                unite: "m",
                indice: "La moitié du tour, c'est une longueur plus une largeur.",
                explication: "La moitié du périmètre est 20 ÷ 2 = 10 m, et 10 − 4 = 6 m.",
                effet: "passerelle"
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Aire",
                enonce: "Quelle est l'aire d'un rectangle de 6 m sur 4 m ?",
                reponse: 24,
                unite: "m²",
                indice: "Aire du rectangle = longueur × largeur.",
                explication: "6 × 4 = 24 m²."
              },
              // 2e manche : l'esquive
              {
                titre: "Aire",
                enonce: "Quelle est l'aire d'un carré de 9 cm de côté ?",
                reponse: 81,
                unite: "cm²",
                indice: "Aire du carré = côté × côté.",
                explication: "9 × 9 = 81 cm²."
              },
              // 3e manche : le coup final
              {
                titre: "Aire",
                enonce: "Un champ rectangulaire de 12 m sur 5 m est coupé en deux par une diagonale. Quelle est l'aire d'un des deux triangles ?",
                reponse: 30,
                unite: "m²",
                indice: "La diagonale coupe le rectangle en deux triangles identiques.",
                explication: "Aire du rectangle : 12 × 5 = 60 m². Chaque triangle en a la moitié : 30 m²."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Tables",
                enonce: "Combien font 7 × 7 ?",
                reponse: 49,
                indice: "7 × 7, c'est 7 × 5 + 7 × 2.",
                explication: "35 + 14 = 49."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul mental",
                enonce: "Combien font 2 × (5 + 3) ?",
                reponse: 16,
                indice: "Calcule d'abord ce qui est entre parenthèses.",
                explication: "5 + 3 = 8 et 2 × 8 = 16."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul mental",
                enonce: "Combien font 12 × 5 ?",
                reponse: 60,
                indice: "12 × 10, puis la moitié.",
                explication: "120 ÷ 2 = 60."
              }
            ]
          }
        ]
      },

      {
        nom: "Le bain d'Archimède",
        notion: "Boss de la galerie : aires, volumes, contenances et durées",
        fond: "mer",
        athena: "La Chimère de Lycie garde la sortie de la galerie. Résous son problème en cinq questions : tu as quatre minutes par question.",
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
            nom: "Archimède de Syracuse (vers 287 – 212 av. J.-C.)",
            portrait: "grec",
            texte: "On raconte qu'en entrant dans mon bain, j'ai vu l'eau monter… et que j'ai couru dans les rues de Syracuse en criant « Eurêka ! » (« J'ai trouvé ! »). J'avais compris comment mesurer le volume d'un objet : on le plonge dans l'eau et on regarde de combien elle monte."
          }
        ],
        steles: [
          {
            boss: "La Chimère de Lycie",
            monstre: "chimere",
            contexte: "Archimède remplit un bassin en forme de pavé droit : 3 m de long, 2 m de large et 1 m de profondeur. Un robinet verse 50 L d'eau par minute. (Rappel : 1 m³ = 1 000 L.)",
            exercices: [
              // 1re question : l'attaque
              {
                titre: "Question 1 : le fond",
                enonce: "Quelle est l'aire du fond du bassin ?",
                reponse: 6,
                unite: "m²",
                indice: "Le fond est un rectangle de 3 m sur 2 m.",
                explication: "3 × 2 = 6 m²."
              },
              // 2e question : l'esquive
              {
                titre: "Question 2 : le bord",
                enonce: "Talos fait le tour du bassin en marchant sur le bord. Quelle distance parcourt-il ?",
                reponse: 10,
                unite: "m",
                indice: "C'est le périmètre du rectangle de 3 m sur 2 m.",
                explication: "3 + 2 + 3 + 2 = 10 m."
              },
              // 3e question : l'attaque
              {
                titre: "Question 3 : le volume",
                enonce: "Quel est le volume du bassin ?",
                reponse: 6,
                unite: "m³",
                indice: "Volume du pavé droit = longueur × largeur × hauteur.",
                explication: "3 × 2 × 1 = 6 m³."
              },
              // 4e question : l'esquive
              {
                titre: "Question 4 : les litres",
                enonce: "Combien de litres d'eau faut-il pour remplir le bassin ?",
                reponse: 6000,
                unite: "L",
                indice: "1 m³ = 1 000 L.",
                explication: "6 × 1 000 = 6 000 L."
              },
              // 5e question : le coup final
              {
                titre: "Question 5 : le temps",
                enonce: "Combien d'heures faut-il au robinet pour remplir le bassin ?",
                reponse: 2,
                unite: "h",
                indice: "Combien de minutes faut-il pour verser 6 000 L, à 50 L par minute ? Puis convertis en heures.",
                explication: "6 000 ÷ 50 = 120 min, et 120 min = 2 h."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul mental",
                enonce: "Combien font 50 × 6 ?",
                reponse: 300,
                indice: "5 × 6 = 30.",
                explication: "50 × 6 = 300."
              },
              // 2e manche : l'esquive
              {
                titre: "Durées",
                enonce: "Combien de minutes y a-t-il dans 3 h ?",
                reponse: 180,
                unite: "min",
                indice: "1 h = 60 min.",
                explication: "3 × 60 = 180 min."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul mental",
                enonce: "Combien font 3 × 2 × 1 ?",
                reponse: 6,
                indice: "Multiplie dans l'ordre.",
                explication: "3 × 2 = 6 et 6 × 1 = 6."
              }
            ]
          }
        ]
      }
    ],
    // Le sanctuaire secret du chapitre : il s'ouvre avec assez de sceaux d'or.
    sanctuaire: {
      sceauxOr: 3,
      salle: {
        nom: "Le sanctuaire des mesures",
        notion: "Problèmes : longueurs, aires, durées et volumes",
        fond: "sanctuaire",
        athena: "Le sanctuaire des mesures récompense ta patience. La passerelle aura la longueur de ta réponse.",
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
            nom: "Al-Biruni (973 – vers 1050)",
            portrait: "turban",
            texte: "Savant d'Asie centrale, j'ai mesuré la Terre d'une façon nouvelle : du haut d'une montagne, en Inde, j'ai visé l'horizon et mesuré un tout petit angle. Le rayon de la Terre que j'ai trouvé est très proche de la vraie valeur, environ 6 400 km."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Le jardin carré",
                enonce: "Un jardin carré a un périmètre de 36 m. Combien mesure son côté ?",
                reponse: 9,
                unite: "m",
                indice: "Un carré a 4 côtés égaux.",
                explication: "36 ÷ 4 = 9 m."
              },
              // 2e manche : l'esquive
              {
                titre: "Le rectangle",
                enonce: "Un rectangle a une aire de 48 m² et une largeur de 6 m. Quelle est sa longueur ?",
                reponse: 8,
                unite: "m",
                indice: "Longueur × 6 = 48.",
                explication: "48 ÷ 6 = 8 m."
              },
              // 3e manche : le coup final
              {
                titre: "Le carré mystère",
                enonce: "Un carré a une aire de 49 m². Combien mesure son côté ? (La passerelle mesurera ce nombre de cases.)",
                reponse: 7,
                unite: "m",
                indice: "Quel nombre multiplié par lui-même donne 49 ?",
                explication: "7 × 7 = 49 : le côté mesure 7 m.",
                effet: "passerelle"
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Le carrelage",
                enonce: "Combien de carreaux carrés de 10 cm de côté faut-il pour couvrir un sol carré de 1 m de côté ?",
                reponse: 100,
                indice: "1 m = 100 cm : combien de carreaux tiennent sur une rangée ? Et combien de rangées ?",
                explication: "10 carreaux par rangée et 10 rangées : 10 × 10 = 100 carreaux."
              },
              // 2e manche : l'esquive
              {
                titre: "Le train",
                enonce: "Un train part à 13 h 47 et arrive à 15 h 12. Combien de minutes dure le trajet ?",
                reponse: 85,
                unite: "min",
                indice: "Compte de 13 h 47 à 14 h, puis de 14 h à 15 h, puis de 15 h à 15 h 12.",
                explication: "13 min + 60 min + 12 min = 85 min (soit 1 h 25 min)."
              },
              // 3e manche : le coup final
              {
                titre: "L'aquarium",
                enonce: "Un aquarium en forme de pavé droit mesure 50 cm de long, 30 cm de large et 40 cm de haut. Combien de litres d'eau contient-il quand il est plein ? (1 L = 1 000 cm³.)",
                reponse: 60,
                unite: "L",
                indice: "Calcule le volume en cm³, puis divise par 1 000.",
                explication: "50 × 30 × 40 = 60 000 cm³, et 60 000 ÷ 1 000 = 60 L."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Durées",
                enonce: "2 h 30 min = combien de minutes ?",
                reponse: 150,
                unite: "min",
                indice: "2 h = 120 min.",
                explication: "120 + 30 = 150 min."
              },
              // 2e manche : l'esquive
              {
                titre: "Conversion",
                enonce: "Combien de mètres dans 3,2 km ?",
                reponse: 3200,
                unite: "m",
                indice: "1 km = 1 000 m.",
                explication: "3,2 × 1 000 = 3 200 m."
              },
              // 3e manche : le coup final
              {
                titre: "Conversion",
                enonce: "1 L = combien de cL ?",
                reponse: 100,
                unite: "cL",
                indice: "« Centi » veut dire « centième ».",
                explication: "1 L = 100 cL."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  //  CHAPITRE : Espace et géométrie
  // =================================================================
  {
    niveau: "CM1 – 6e",
    titre: "Espace et géométrie",
    introduction: "Voici la galerie des figures. Cercles, polygones, angles, symétries et solides : la géométrie, c'est l'art de bien regarder les formes.",
    conclusion: "Bravo, Talos ! Tu as parcouru toutes les galeries du CM1, du CM2 et de la 6e. Place maintenant aux galeries de la 5e, de la 4e et de la 3e !",
    salles: [

      {
        nom: "Le cercle d'Hypatie",
        notion: "Figures planes : cercle, polygones, triangles",
        fond: "bibliotheque",
        athena: "Une stèle près de toi, l'autre tout en haut des marches. La stèle d'or brille sur la petite corniche de gauche.",
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
            nom: "Hypatie d'Alexandrie (vers 370 – 415)",
            portrait: "chignon",
            texte: "J'enseignais les mathématiques et l'astronomie à Alexandrie, et l'on venait de loin pour m'écouter. J'ai étudié les courbes qu'on obtient en coupant un cône : le cercle, l'ellipse, la parabole… Je suis l'une des premières femmes mathématiciennes dont l'histoire a gardé le nom."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Le cercle",
                enonce: "Un cercle a un rayon de 6 cm. Quel est son diamètre ?",
                reponse: 12,
                unite: "cm",
                indice: "Le diamètre traverse tout le cercle en passant par le centre : c'est deux rayons.",
                explication: "2 × 6 = 12 cm."
              },
              // 2e manche : l'esquive
              {
                titre: "Le cercle",
                enonce: "Un cercle a un diamètre de 15 cm. Quel est son rayon ?",
                reponse: 7.5,
                unite: "cm",
                indice: "Le rayon, c'est la moitié du diamètre.",
                explication: "15 ÷ 2 = 7,5 cm."
              },
              // 3e manche : le coup final
              {
                titre: "Deux cercles",
                enonce: "Deux cercles ont le même centre. Leurs rayons mesurent 3 cm et 8 cm. Quel est l'écart entre les deux cercles ?",
                reponse: 5,
                unite: "cm",
                indice: "Dessine-les : l'écart est la différence des deux rayons.",
                explication: "8 − 3 = 5 cm."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Polygones",
                enonce: "Combien de côtés a un hexagone ?",
                reponse: 6,
                indice: "Pense aux alvéoles des abeilles.",
                explication: "Un hexagone a 6 côtés (« hexa » veut dire six en grec)."
              },
              // 2e manche : l'esquive
              {
                titre: "Le losange",
                enonce: "Un losange a un côté de 7 cm. Quel est son périmètre ?",
                reponse: 28,
                unite: "cm",
                indice: "Les 4 côtés d'un losange ont la même longueur.",
                explication: "4 × 7 = 28 cm."
              },
              // 3e manche : le coup final
              {
                titre: "Le triangle isocèle",
                enonce: "Un triangle isocèle a deux côtés de 9 cm et un périmètre de 25 cm. Combien mesure son troisième côté ?",
                reponse: 7,
                unite: "cm",
                indice: "Ajoute les deux côtés égaux, puis cherche ce qui manque pour arriver à 25.",
                explication: "9 + 9 = 18 et 25 − 18 = 7 cm."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Polygones",
                enonce: "Combien de sommets a un pentagone ?",
                reponse: 5,
                indice: "« Penta » veut dire cinq.",
                explication: "Un pentagone a 5 sommets et 5 côtés."
              },
              // 2e manche : l'esquive
              {
                titre: "Rectangle",
                enonce: "Combien d'angles droits a un rectangle ?",
                reponse: 4,
                indice: "Regarde ses 4 coins.",
                explication: "Un rectangle a 4 angles droits."
              },
              // 3e manche : le coup final
              {
                titre: "Polygones",
                enonce: "Combien de côtés a un octogone ?",
                reponse: 8,
                indice: "Pense à la pieuvre (octopus) et à ses bras.",
                explication: "Un octogone a 8 côtés."
              }
            ]
          }
        ]
      },

      {
        nom: "Les étoiles d'Hipparque",
        notion: "Angles : mesurer, comparer, compléter",
        fond: "nuit",
        athena: "Deux gardiens et une stèle d'or perchée. Ensuite, saute par-dessus le précipice pour atteindre la porte.",
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
            nom: "Hipparque (IIe siècle av. J.-C.)",
            portrait: "grec",
            texte: "Astronome grec, j'ai observé le ciel depuis l'île de Rhodes et dressé un catalogue de plusieurs centaines d'étoiles. Pour repérer leur place, je mesurais des angles : comme les Babyloniens avant moi, je partageais le tour complet en 360 degrés."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Angles",
                enonce: "Combien de degrés mesure un angle droit ?",
                reponse: 90,
                unite: "°",
                indice: "C'est l'angle d'un coin de carré, un quart de tour.",
                explication: "Un angle droit mesure 90°."
              },
              // 2e manche : l'esquive
              {
                titre: "Angles",
                enonce: "Combien de degrés mesure un angle plat ?",
                reponse: 180,
                unite: "°",
                indice: "Un angle plat, c'est deux angles droits côte à côte, un demi-tour.",
                explication: "2 × 90 = 180°."
              },
              // 3e manche : le coup final
              {
                titre: "Angles",
                enonce: "Combien de degrés mesure la moitié d'un angle droit ?",
                reponse: 45,
                unite: "°",
                indice: "Un angle droit mesure 90°.",
                explication: "90 ÷ 2 = 45°."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Le tour complet",
                enonce: "Un tour complet mesure 360°. Combien de degrés mesure un tiers de tour ?",
                reponse: 120,
                unite: "°",
                indice: "Partage 360 en 3.",
                explication: "360 ÷ 3 = 120°."
              },
              // 2e manche : l'esquive
              {
                titre: "L'horloge",
                enonce: "Quel angle font les deux aiguilles d'une horloge à 2 h pile ?",
                reponse: 60,
                unite: "°",
                indice: "Le cadran a 12 graduations d'heures pour 360° : combien de degrés entre deux heures ?",
                explication: "360 ÷ 12 = 30° par heure. De 12 à 2, il y a 2 heures : 2 × 30 = 60°."
              },
              // 3e manche : le coup final
              {
                titre: "Compléter",
                enonce: "Un angle droit est partagé en deux angles. L'un mesure 35°. Combien mesure l'autre ?",
                reponse: 55,
                unite: "°",
                indice: "Les deux angles ensemble font 90°.",
                explication: "90 − 35 = 55°."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul mental",
                enonce: "Combien font 90 + 90 ?",
                reponse: 180,
                indice: "9 + 9 = 18.",
                explication: "90 + 90 = 180."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul mental",
                enonce: "Combien font 360 ÷ 4 ?",
                reponse: 90,
                indice: "La moitié de la moitié de 360.",
                explication: "360 ÷ 2 = 180 et 180 ÷ 2 = 90."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul mental",
                enonce: "Combien font 180 − 45 ?",
                reponse: 135,
                indice: "180 − 40 = 140, puis enlève 5.",
                explication: "140 − 5 = 135."
              }
            ]
          }
        ]
      },

      {
        nom: "Le miroir d'Emmy Noether",
        notion: "Symétrie axiale",
        fond: "jardin",
        athena: "Allume la dalle d'or tout en haut des plateformes et bats les deux gardiens.",
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
            nom: "Emmy Noether (1882 – 1935)",
            portrait: "moderne",
            texte: "Mathématicienne allemande, on m'a longtemps empêchée d'enseigner à l'université parce que j'étais une femme. J'ai découvert un lien profond entre les symétries et les lois de la physique. Albert Einstein lui-même a salué mon génie."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Axes de symétrie",
                enonce: "Combien d'axes de symétrie a un rectangle qui n'est pas un carré ?",
                reponse: 2,
                indice: "Plie le rectangle dans ta tête : de quelles façons les deux moitiés se superposent-elles ?",
                explication: "On peut le plier en deux dans la longueur ou dans la largeur : 2 axes. Les diagonales ne sont pas des axes !"
              },
              // 2e manche : l'esquive
              {
                titre: "Axes de symétrie",
                enonce: "Combien d'axes de symétrie a un carré ?",
                reponse: 4,
                indice: "Comme le rectangle, plus ses diagonales.",
                explication: "2 axes qui passent par les milieux des côtés, et 2 diagonales : 4 axes."
              },
              // 3e manche : le coup final
              {
                titre: "Axes de symétrie",
                enonce: "Combien d'axes de symétrie a un triangle équilatéral ?",
                reponse: 3,
                indice: "Chaque axe passe par un sommet et le milieu du côté opposé.",
                explication: "Un axe par sommet : 3 axes."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Les lettres",
                enonce: "Parmi les lettres A, B, F, H et K, combien ont un axe de symétrie vertical (une moitié gauche et une moitié droite identiques) ?",
                reponse: 2,
                indice: "Imagine un miroir debout au milieu de chaque lettre.",
                explication: "A et H ont un axe vertical. B en a un horizontal, F et K n'en ont pas de vertical. La réponse est 2."
              },
              // 2e manche : l'esquive
              {
                titre: "Le symétrique",
                enonce: "Un segment mesure 6 cm. Combien mesure son symétrique par rapport à une droite ?",
                reponse: 6,
                unite: "cm",
                indice: "Un miroir ne change pas les longueurs.",
                explication: "La symétrie conserve les longueurs : le symétrique mesure aussi 6 cm."
              },
              // 3e manche : le coup final
              {
                titre: "Le symétrique",
                enonce: "Le point A est à 4 cm de l'axe (d). A' est son symétrique par rapport à (d). Quelle est la distance AA' ?",
                reponse: 8,
                unite: "cm",
                indice: "A' est de l'autre côté de l'axe, à la même distance que A.",
                explication: "4 cm d'un côté, 4 cm de l'autre : AA' = 8 cm."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Double",
                enonce: "Quel est le double de 35 ?",
                reponse: 70,
                indice: "Double de 30, plus double de 5.",
                explication: "60 + 10 = 70."
              },
              // 2e manche : l'esquive
              {
                titre: "Moitié",
                enonce: "Quelle est la moitié de 150 ?",
                reponse: 75,
                indice: "Moitié de 100, plus moitié de 50.",
                explication: "50 + 25 = 75."
              },
              // 3e manche : le coup final
              {
                titre: "Tables",
                enonce: "Combien font 4 × 9 ?",
                reponse: 36,
                indice: "4 × 10 − 4.",
                explication: "40 − 4 = 36."
              }
            ]
          }
        ]
      },

      {
        nom: "Les solides de Platon",
        notion: "Boss de la galerie : le cube, son patron, son aire et son volume",
        fond: "temple",
        athena: "Méduse la Gorgone garde la sortie de la galerie. Ne croise pas son regard, et résous son problème en cinq questions : tu as quatre minutes par question.",
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
            nom: "Platon (vers 428 – 348 av. J.-C.)",
            portrait: "grec",
            texte: "Philosophe d'Athènes, j'aurais fait graver à l'entrée de mon école, l'Académie : « Que nul n'entre ici s'il n'est géomètre. » J'ai décrit cinq solides parfaits, dont toutes les faces sont des polygones réguliers identiques : le cube en fait partie. On les appelle les solides de Platon."
          }
        ],
        steles: [
          {
            boss: "Méduse la Gorgone",
            monstre: "meduse",
            contexte: "Platon pose sur la table un cube de 4 cm d'arête.",
            exercices: [
              // 1re question : l'attaque
              {
                titre: "Question 1 : les faces",
                enonce: "Combien de faces a un cube ?",
                reponse: 6,
                indice: "Pense à un dé à jouer : de 1 à …",
                explication: "Un cube a 6 faces carrées, comme un dé."
              },
              // 2e question : l'esquive
              {
                titre: "Question 2 : les arêtes",
                enonce: "Combien d'arêtes a un cube ?",
                reponse: 12,
                indice: "Compte les arêtes du dessus, du dessous, puis celles qui les relient.",
                explication: "4 arêtes en haut, 4 en bas et 4 verticales : 12 arêtes."
              },
              // 3e question : l'attaque
              {
                titre: "Question 3 : une face",
                enonce: "Quelle est l'aire d'une face de ce cube ?",
                reponse: 16,
                unite: "cm²",
                indice: "Une face est un carré de 4 cm de côté.",
                explication: "4 × 4 = 16 cm²."
              },
              // 4e question : l'esquive
              {
                titre: "Question 4 : le patron",
                enonce: "Talos découpe le patron du cube dans du carton (sans languettes). Quelle est l'aire du patron ?",
                reponse: 96,
                unite: "cm²",
                indice: "Le patron est formé de toutes les faces du cube, posées à plat.",
                explication: "6 faces de 16 cm² : 6 × 16 = 96 cm²."
              },
              // 5e question : le coup final
              {
                titre: "Question 5 : le volume",
                enonce: "Quel est le volume du cube ?",
                reponse: 64,
                unite: "cm³",
                indice: "Volume du cube = arête × arête × arête.",
                explication: "4 × 4 × 4 = 64 cm³."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Solides",
                enonce: "Combien de sommets a un cube ?",
                reponse: 8,
                indice: "4 en haut, et en bas ?",
                explication: "4 + 4 = 8 sommets."
              },
              // 2e manche : l'esquive
              {
                titre: "Solides",
                enonce: "Combien de faces a une pyramide à base carrée ?",
                reponse: 5,
                indice: "La base, plus les triangles autour.",
                explication: "1 base carrée + 4 faces triangulaires = 5 faces."
              },
              // 3e manche : le coup final
              {
                titre: "Tables",
                enonce: "Combien font 6 × 9 ?",
                reponse: 54,
                indice: "6 × 10 − 6.",
                explication: "60 − 6 = 54."
              }
            ]
          }
        ]
      }
    ],
    // Le sanctuaire secret du chapitre : il s'ouvre avec assez de sceaux d'or.
    sanctuaire: {
      sceauxOr: 3,
      salle: {
        nom: "Le sanctuaire des figures",
        notion: "Problèmes de géométrie",
        fond: "sanctuaire",
        athena: "Le sanctuaire des figures récompense ta patience. La stèle d'or brille sur la haute corniche : seule la stèle d'Hermès t'y portera.",
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
            nom: "Maryam Mirzakhani (1977 – 2017)",
            portrait: "moderne",
            texte: "Née à Téhéran, en Iran, je voulais d'abord devenir écrivaine. Puis je suis tombée amoureuse des mathématiques. En 2014, je suis devenue la première femme à recevoir la médaille Fields, la plus haute récompense des mathématiques, pour mes travaux sur les surfaces courbes."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Le rectangle",
                enonce: "Un rectangle a un périmètre de 30 cm. Sa longueur est le double de sa largeur. Combien mesure sa largeur ?",
                reponse: 5,
                unite: "cm",
                indice: "La moitié du périmètre (15 cm) est faite d'une longueur et d'une largeur, c'est-à-dire de 3 largeurs.",
                explication: "Longueur + largeur = 15 cm, et longueur = 2 largeurs : 3 largeurs = 15 cm, donc largeur = 5 cm."
              },
              // 2e manche : l'esquive
              {
                titre: "Le pavage",
                enonce: "Combien de carrés de 2 cm de côté faut-il pour paver un rectangle de 8 cm sur 6 cm ?",
                reponse: 12,
                indice: "Combien de carrés tiennent dans la longueur ? Et dans la largeur ?",
                explication: "8 ÷ 2 = 4 carrés dans la longueur et 6 ÷ 2 = 3 dans la largeur : 4 × 3 = 12 carrés."
              },
              // 3e manche : le coup final
              {
                titre: "L'horloge",
                enonce: "Quel est le plus petit angle formé par les aiguilles d'une horloge à 5 h pile ?",
                reponse: 150,
                unite: "°",
                indice: "Entre deux heures, il y a 360 ÷ 12 = 30°.",
                explication: "De 12 à 5, il y a 5 heures : 5 × 30 = 150°."
              }
            ]
          },
          {
            contexte: "On assemble 27 petits cubes de 1 cm d'arête pour former un grand cube de 3 cm d'arête. Puis on peint en rouge toutes les faces du grand cube.",
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Une face",
                enonce: "Combien de petits cubes forment une face du grand cube ?",
                reponse: 9,
                indice: "Une face est un carré de 3 petits cubes sur 3.",
                explication: "3 × 3 = 9 petits cubes."
              },
              // 2e manche : l'esquive
              {
                titre: "Les coins",
                enonce: "Combien de petits cubes ont exactement 3 faces rouges ?",
                reponse: 8,
                indice: "Ce sont les petits cubes placés aux coins du grand cube.",
                explication: "Les petits cubes des coins ont 3 faces peintes, et un cube a 8 sommets : 8 petits cubes."
              },
              // 3e manche : le coup final
              {
                titre: "Le cœur",
                enonce: "Combien de petits cubes n'ont aucune face rouge ?",
                reponse: 1,
                indice: "Ce sont ceux qui ne touchent pas l'extérieur : ils sont tout au centre.",
                explication: "Seul le petit cube du centre est caché : 1 petit cube."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul mental",
                enonce: "Combien font 360 ÷ 2 ?",
                reponse: 180,
                indice: "La moitié de 360.",
                explication: "360 ÷ 2 = 180."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul mental",
                enonce: "Combien font 3 × 3 × 3 ?",
                reponse: 27,
                indice: "3 × 3 = 9.",
                explication: "9 × 3 = 27."
              },
              // 3e manche : le coup final
              {
                titre: "Solides",
                enonce: "Combien d'arêtes a une pyramide à base carrée ?",
                reponse: 8,
                indice: "4 arêtes pour la base, et combien montent vers le sommet ?",
                explication: "4 + 4 = 8 arêtes."
              }
            ]
          }
        ],
        acrobaties: [
          {
            figure: "double",
            titre: "Le double salto",
            enonce: "Les sandales d'Hermès s'éveillent si tu trouves combien d'axes de symétrie a un hexagone régulier.",
            reponse: 6,
            indice: "Dessine un hexagone régulier : des axes passent par deux sommets opposés, d'autres par les milieux de deux côtés opposés.",
            explication: "3 axes passent par deux sommets opposés et 3 par les milieux de deux côtés opposés : 6 axes."
          }
        ]
      }
    }
  },

  // =================================================================
  //  CHAPITRE : Nombres relatifs et calcul littéral
  // =================================================================
  {
    niveau: "5e – 3e",
    titre: "Nombres relatifs et calcul littéral",
    introduction: "Bienvenue au collège, Talos ! Voici la galerie des nombres relatifs et des lettres. Ici, les nombres descendent sous zéro, et les lettres remplacent les nombres qu'on ne connaît pas encore.",
    conclusion: "Les nombres relatifs et les lettres t'obéissent. La galerie de la proportionnalité t'attend.",
    salles: [

      {
        nom: "Les baguettes de Liu Hui",
        notion: "Nombres relatifs : comparer, additionner, soustraire, multiplier",
        fond: "brumes",
        athena: "Deux stèles gardent la porte : l'une près de toi, l'autre au-delà du précipice.",
        plan: [
          "############################",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#.A........................#",
          "####.......................#",
          "#..........................#",
          "#...###....................#",
          "#.........T................#",
          "#........####..............#",
          "S..........................#",
          "S............##......T..G.J#",
          "###############...##########"
        ],
        guides: [
          {
            nom: "Liu Hui (IIIe siècle)",
            portrait: "lettre",
            texte: "En Chine, on calculait avec des baguettes posées sur une table : rouges pour les nombres positifs, noires pour les négatifs. En 263, j'ai commenté le grand livre « Les Neuf Chapitres sur l'art du calcul », où l'on trouve déjà des règles pour calculer avec ces nombres négatifs."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Températures",
                enonce: "Le matin, il fait −4 °C. L'après-midi, la température a monté de 9 °C. Quelle température fait-il l'après-midi ?",
                reponse: 5,
                unite: "°C",
                indice: "Sur un thermomètre, pars de −4 et monte de 9 graduations.",
                explication: "−4 + 9 = 5 : il fait 5 °C."
              },
              // 2e manche : l'esquive
              {
                titre: "Multiplication",
                enonce: "Calcule (−6) × (−7).",
                reponse: 42,
                indice: "Le produit de deux nombres négatifs est positif.",
                explication: "6 × 7 = 42, et (−) × (−) donne (+) : (−6) × (−7) = 42."
              },
              // 3e manche : le coup final
              {
                titre: "Priorités",
                enonce: "Calcule (−2) × 5 − (−3) × 4.",
                reponse: 2,
                indice: "Les multiplications d'abord : (−2) × 5, puis (−3) × 4. Ensuite la soustraction.",
                explication: "(−2) × 5 = −10 et (−3) × 4 = −12. Puis −10 − (−12) = −10 + 12 = 2."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Comparer",
                enonce: "Quel est le plus grand nombre : −7 ou −3 ? Écris-le.",
                reponse: -3,
                indice: "Sur une droite graduée, le plus grand est le plus à droite.",
                explication: "−3 est plus proche de 0 que −7 : −3 > −7."
              },
              // 2e manche : l'esquive
              {
                titre: "Addition",
                enonce: "Calcule (−8) + 5.",
                reponse: -3,
                indice: "Tu as une dette de 8 et tu gagnes 5. Que reste-t-il ?",
                explication: "Les signes sont différents : on calcule 8 − 5 = 3, et on garde le signe du nombre le plus éloigné de zéro (−8). Le résultat est −3."
              },
              // 3e manche : le coup final
              {
                titre: "Soustraction",
                enonce: "Calcule 4 − (−6).",
                reponse: 10,
                indice: "Soustraire un nombre, c'est ajouter son opposé.",
                explication: "4 − (−6) = 4 + 6 = 10."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Relatifs",
                enonce: "Calcule −5 + 5.",
                reponse: 0,
                indice: "Deux nombres opposés.",
                explication: "La somme de deux nombres opposés est 0."
              },
              // 2e manche : l'esquive
              {
                titre: "Relatifs",
                enonce: "Calcule (−3) × 4.",
                reponse: -12,
                indice: "Un négatif fois un positif donne un négatif.",
                explication: "(−3) × 4 = −12."
              },
              // 3e manche : le coup final
              {
                titre: "Relatifs",
                enonce: "Calcule (−10) ÷ 2.",
                reponse: -5,
                indice: "Mêmes règles de signes que la multiplication.",
                explication: "(−10) ÷ 2 = −5."
              }
            ]
          }
        ]
      },

      {
        nom: "Les lettres de Viète",
        notion: "Calcul littéral : remplacer, réduire, développer",
        fond: "temple",
        athena: "Allume la dalle d'or sur l'estrade et bats les deux gardiens pour ouvrir la porte. Attention au précipice !",
        plan: [
          "############################",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#A.........................#",
          "###........................#",
          "#..............D...........#",
          "S..###........####.........#",
          "S......T............T...G.J#",
          "##########...###############"
        ],
        guides: [
          {
            nom: "François Viète (1540 – 1603)",
            portrait: "renaissance",
            texte: "Conseiller des rois de France, j'ai eu l'idée, vers 1591, de désigner par des lettres les nombres connus comme les nombres inconnus. Grâce à cela, on peut écrire une règle une seule fois, pour tous les nombres. J'ai aussi déchiffré les messages secrets de l'armée espagnole !"
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Réduire",
                enonce: "Réduis 4x + 3x − 2x. Tu obtiens …x. Quel est le nombre devant x ?",
                reponse: 5,
                indice: "Compte les x : 4 x, plus 3 x, moins 2 x.",
                explication: "4 + 3 − 2 = 5 : 4x + 3x − 2x = 5x."
              },
              // 2e manche : l'esquive
              {
                titre: "Développer",
                enonce: "Développe 3(2x + 5). Tu obtiens 6x + … Quel est le nombre manquant ?",
                reponse: 15,
                indice: "Multiplie 3 par chaque terme de la parenthèse.",
                explication: "3 × 2x = 6x et 3 × 5 = 15 : 3(2x + 5) = 6x + 15."
              },
              // 3e manche : le coup final
              {
                titre: "Double distributivité (4e)",
                enonce: "Développe (x + 3)(x + 4). Tu obtiens x² + bx + 12. Quelle est la valeur de b ?",
                reponse: 7,
                indice: "Chaque terme de la 1re parenthèse multiplie chaque terme de la 2de : x × x, x × 4, 3 × x, 3 × 4.",
                explication: "(x + 3)(x + 4) = x² + 4x + 3x + 12 = x² + 7x + 12 : b = 7."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Remplacer",
                enonce: "Calcule 3x + 2 pour x = 5.",
                reponse: 17,
                indice: "Remplace x par 5 : 3 × 5 + 2.",
                explication: "3 × 5 + 2 = 15 + 2 = 17."
              },
              // 2e manche : l'esquive
              {
                titre: "Remplacer",
                enonce: "Calcule 2a² pour a = 3.",
                reponse: 18,
                indice: "a² = a × a. On calcule le carré avant de multiplier par 2.",
                explication: "3² = 9, puis 2 × 9 = 18."
              },
              // 3e manche : le coup final
              {
                titre: "Remplacer",
                enonce: "Calcule 5 − 2y pour y = −4.",
                reponse: 13,
                indice: "Remplace y par (−4), avec des parenthèses : 5 − 2 × (−4).",
                explication: "2 × (−4) = −8, puis 5 − (−8) = 5 + 8 = 13."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul littéral",
                enonce: "Calcule 2x pour x = 7.",
                reponse: 14,
                indice: "2x = 2 × x.",
                explication: "2 × 7 = 14."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul littéral",
                enonce: "x + x + x = …x. Quel est le nombre devant x ?",
                reponse: 3,
                indice: "Compte les x.",
                explication: "x + x + x = 3x."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul littéral",
                enonce: "Calcule x² pour x = 6.",
                reponse: 36,
                indice: "x² = x × x.",
                explication: "6 × 6 = 36."
              }
            ]
          }
        ]
      },

      {
        nom: "L'al-jabr d'Al-Khwarizmi",
        notion: "Équations : résoudre, mettre en équation, équation produit (3e)",
        fond: "orient",
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
          "#..A.......................#",
          "#.###......................#",
          "#..........................#",
          "S.....###..................#",
          "S.........T..........T..G.J#",
          "#############PPPPPP#########"
        ],
        guides: [
          {
            nom: "Muhammad al-Khwarizmi (vers 780 – vers 850)",
            portrait: "turban",
            texte: "Savant de la Maison de la sagesse, à Bagdad, j'ai écrit un livre pour résoudre les équations. Son titre contient le mot « al-jabr », qui a donné notre mot « algèbre ». Et mon nom, un peu déformé, a donné le mot « algorithme » !"
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Résoudre",
                enonce: "Résous l'équation 3x + 5 = −10.",
                reponse: -5,
                indice: "Enlève 5 des deux côtés, puis divise par 3.",
                explication: "3x = −10 − 5 = −15, donc x = −15 ÷ 3 = −5."
              },
              // 2e manche : l'esquive
              {
                titre: "Mettre en équation",
                enonce: "Un nombre augmenté de 14 est égal au triple de ce nombre. Quel est ce nombre ?",
                reponse: 7,
                indice: "Appelle x ce nombre : x + 14 = 3x.",
                explication: "x + 14 = 3x donne 14 = 2x, donc x = 7. Vérification : 7 + 14 = 21 = 3 × 7."
              },
              // 3e manche : le coup final
              {
                titre: "Équation produit (3e)",
                enonce: "L'équation (x − 5)(2x + 6) = 0 a deux solutions. Quelle est la plus petite ?",
                reponse: -3,
                indice: "Un produit est nul si l'un de ses facteurs est nul : x − 5 = 0 ou 2x + 6 = 0.",
                explication: "x − 5 = 0 donne x = 5 ; 2x + 6 = 0 donne x = −3. La plus petite solution est −3."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Résoudre",
                enonce: "Résous l'équation x + 9 = 20.",
                reponse: 11,
                indice: "Quel nombre faut-il ajouter à 9 pour obtenir 20 ?",
                explication: "x = 20 − 9 = 11."
              },
              // 2e manche : l'esquive
              {
                titre: "Résoudre",
                enonce: "Résous l'équation 4x = 28.",
                reponse: 7,
                indice: "Divise les deux côtés par 4.",
                explication: "x = 28 ÷ 4 = 7."
              },
              // 3e manche : le coup final
              {
                titre: "Résoudre",
                enonce: "Résous l'équation 5x − 4 = 2x + 14. (La passerelle mesurera x cases.)",
                reponse: 6,
                indice: "Regroupe les x d'un côté et les nombres de l'autre : 5x − 2x = 14 + 4.",
                explication: "3x = 18, donc x = 6. Vérification : 5 × 6 − 4 = 26 et 2 × 6 + 14 = 26.",
                effet: "passerelle"
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
                enonce: "Si x + 4 = 10, combien vaut x ?",
                reponse: 6,
                indice: "10 − 4.",
                explication: "x = 6."
              },
              // 2e manche : l'esquive
              {
                titre: "Équation",
                enonce: "Si 3x = 21, combien vaut x ?",
                reponse: 7,
                indice: "21 ÷ 3.",
                explication: "x = 7."
              },
              // 3e manche : le coup final
              {
                titre: "Équation",
                enonce: "Si x − 8 = 2, combien vaut x ?",
                reponse: 10,
                indice: "2 + 8.",
                explication: "x = 10."
              }
            ]
          }
        ]
      },

      {
        nom: "L'épitaphe de Diophante",
        notion: "Boss de la galerie : une équation avec des fractions",
        fond: "bibliotheque",
        athena: "Le Minotaure garde la sortie de la galerie. Pour le vaincre, résous l'énigme de Diophante en cinq questions : tu as quatre minutes par question.",
        plan: [
          "############################",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#....................A.....#",
          "#...................###....#",
          "#..........................#",
          "S.......................##.#",
          "S.......T..................#",
          "##################...##....#",
          "##################......G.J#",
          "############################"
        ],
        guides: [
          {
            nom: "Diophante d'Alexandrie (IIIe siècle)",
            portrait: "grec",
            texte: "Dans mes « Arithmétiques », j'ai été l'un des premiers à utiliser un symbole pour l'inconnue. On raconte que sur ma tombe, on a gravé une énigme : en la résolvant, on trouve l'âge auquel je suis mort ! Le Minotaure la garde."
          }
        ],
        steles: [
          {
            boss: "Le Minotaure de Crète",
            monstre: "minotaure",
            contexte: "L'énigme de la tombe : « Son enfance dura 1/6 de sa vie, sa jeunesse 1/12, puis il passa encore 1/7 de sa vie avant de se marier. Cinq ans plus tard naquit son fils, qui vécut la moitié de la vie de son père. Diophante mourut 4 ans après son fils. »",
            exercices: [
              // 1re question : l'attaque
              {
                titre: "Question 1 : un essai",
                enonce: "Si Diophante avait vécu 60 ans, combien d'années aurait duré son enfance ?",
                reponse: 10,
                indice: "Son enfance dure 1/6 de sa vie.",
                explication: "1/6 de 60 = 60 ÷ 6 = 10 ans."
              },
              // 2e question : l'esquive
              {
                titre: "Question 2 : deux fractions",
                enonce: "Calcule 1/6 + 1/12. (Écris une fraction.)",
                reponse: 1 / 4,
                tolerance: 0.0005,
                indice: "Mets les deux fractions sur 12 : 1/6 = 2/12.",
                explication: "2/12 + 1/12 = 3/12 = 1/4."
              },
              // 3e question : l'attaque
              {
                titre: "Question 3 : toutes les fractions",
                enonce: "Calcule 1/6 + 1/12 + 1/7 + 1/2. (Écris une fraction ; mets tout sur 84.)",
                reponse: 75 / 84,
                tolerance: 0.0005,
                indice: "84 = 6 × 14 = 12 × 7 = 7 × 12 = 2 × 42 : 1/6 = 14/84, 1/12 = 7/84, 1/7 = 12/84 et 1/2 = 42/84.",
                explication: "14/84 + 7/84 + 12/84 + 42/84 = 75/84 (qu'on peut aussi écrire 25/28)."
              },
              // 4e question : l'esquive
              {
                titre: "Question 4 : les années comptées",
                enonce: "Dans l'énigme, combien d'années sont données directement par un nombre (et non par une fraction de sa vie) ?",
                reponse: 9,
                indice: "Relis l'énigme : « cinq ans plus tard… », « … 4 ans après son fils ».",
                explication: "5 + 4 = 9 années."
              },
              // 5e question : le coup final
              {
                titre: "Question 5 : l'âge de Diophante",
                enonce: "Les fractions font 75/84 de sa vie, donc les 9 années restantes en font 9/84. À quel âge Diophante est-il mort ?",
                reponse: 84,
                indice: "Si 9/84 de sa vie valent 9 ans, combien vaut 1/84 de sa vie ?",
                explication: "1/84 de sa vie vaut 1 an, donc sa vie entière dure 84 ans. Vérification : 14 + 7 + 12 + 5 + 42 + 4 = 84."
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
                enonce: "Calcule 1/2 + 1/4. (Écris une fraction.)",
                reponse: 3 / 4,
                tolerance: 0.0005,
                indice: "1/2 = 2/4.",
                explication: "2/4 + 1/4 = 3/4."
              },
              // 2e manche : l'esquive
              {
                titre: "Relatifs",
                enonce: "Calcule (−3)².",
                reponse: 9,
                indice: "(−3)² = (−3) × (−3).",
                explication: "(−3) × (−3) = 9."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul mental",
                enonce: "Calcule 84 ÷ 7.",
                reponse: 12,
                indice: "7 × 12 = ?",
                explication: "7 × 12 = 84, donc 84 ÷ 7 = 12."
              }
            ]
          }
        ]
      }
    ],
    // Le sanctuaire secret du chapitre : il s'ouvre avec assez de sceaux d'or.
    sanctuaire: {
      sceauxOr: 3,
      salle: {
        nom: "Le sanctuaire des lettres",
        notion: "Problèmes : programmes de calcul, puissances, fractions",
        fond: "sanctuaire",
        athena: "Le sanctuaire des lettres ne s'ouvre qu'aux esprits patients. La stèle la plus proche construira la passerelle.",
        plan: [
          "############################",
          "#..........................#",
          "#..........................#",
          "#.....A....................#",
          "#....###...................#",
          "#.T........................#",
          "#.##.......................#",
          "#..........................#",
          "S....##....................#",
          "S.......T.............T.G.J#",
          "##########PPPPPPPPPP########",
          "##########..........########",
          "##########..........########",
          "##########..........########"
        ],
        guides: [
          {
            nom: "Émilie du Châtelet (1706 – 1749)",
            portrait: "femme19",
            texte: "Au XVIIIe siècle, j'ai traduit en français le grand livre de Newton et je l'ai expliqué avec l'algèbre. Ma traduction est encore lue aujourd'hui. Avec Voltaire, j'avais installé un laboratoire de physique dans mon château de Cirey."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Fractions (4e)",
                enonce: "Calcule 2/3 × 9/4. (Écris une fraction.)",
                reponse: 3 / 2,
                tolerance: 0.0005,
                indice: "Multiplie les numérateurs entre eux et les dénominateurs entre eux, puis simplifie.",
                explication: "2/3 × 9/4 = 18/12 = 3/2."
              },
              // 2e manche : l'esquive
              {
                titre: "Fractions",
                enonce: "Calcule 5/6 − 1/3. (Écris une fraction.)",
                reponse: 1 / 2,
                tolerance: 0.0005,
                indice: "1/3 = 2/6.",
                explication: "5/6 − 2/6 = 3/6 = 1/2."
              },
              // 3e manche : le coup final
              {
                titre: "Nombres premiers (3e)",
                enonce: "On décompose 360 en facteurs premiers : 360 = 2ᵃ × 3ᵇ × 5. Combien vaut a + b ?",
                reponse: 5,
                indice: "Divise 360 par 2 autant de fois que possible, puis par 3.",
                explication: "360 = 2 × 2 × 2 × 3 × 3 × 5 = 2³ × 3² × 5 : a = 3 et b = 2, donc a + b = 5."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Puissances (4e)",
                enonce: "Calcule 2⁵.",
                reponse: 32,
                indice: "2⁵ = 2 × 2 × 2 × 2 × 2.",
                explication: "2 × 2 × 2 × 2 × 2 = 32."
              },
              // 2e manche : l'esquive
              {
                titre: "Puissances de 10 (4e)",
                enonce: "10³ × 10⁴ = 10ⁿ. Quelle est la valeur de n ?",
                reponse: 7,
                indice: "Écris les zéros : 1 000 × 10 000.",
                explication: "1 000 × 10 000 = 10 000 000 = 10⁷ : on ajoute les exposants, 3 + 4 = 7."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul astucieux (3e)",
                enonce: "Calcule 101² − 99² sans calculatrice.",
                reponse: 400,
                indice: "Utilise a² − b² = (a − b)(a + b).",
                explication: "101² − 99² = (101 − 99)(101 + 99) = 2 × 200 = 400."
              }
            ]
          },
          {
            contexte: "Le programme de calcul d'Émilie : choisis un nombre, multiplie-le par 3, ajoute 4, puis enlève le nombre de départ.",
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Programme de calcul",
                enonce: "Avec 5 comme nombre de départ, quel résultat obtiens-tu ?",
                reponse: 14,
                indice: "5 × 3 = 15, puis ajoute 4, puis enlève 5.",
                explication: "5 × 3 = 15 ; 15 + 4 = 19 ; 19 − 5 = 14."
              },
              // 2e manche : l'esquive
              {
                titre: "Programme de calcul",
                enonce: "Avec x comme nombre de départ, le résultat s'écrit ax + 4. Quelle est la valeur de a ?",
                reponse: 2,
                indice: "Écris les étapes avec x : 3x, puis 3x + 4, puis 3x + 4 − x.",
                explication: "3x + 4 − x = 2x + 4 : a = 2."
              },
              // 3e manche : le coup final
              {
                titre: "Programme de calcul",
                enonce: "Quel nombre de départ donne 24 ? (La passerelle mesurera ce nombre de cases.)",
                reponse: 10,
                indice: "Résous l'équation 2x + 4 = 24.",
                explication: "2x = 20, donc x = 10. Vérification : 10 × 3 + 4 − 10 = 24.",
                effet: "passerelle"
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Relatifs",
                enonce: "Calcule (−1) × (−1) × (−1).",
                reponse: -1,
                indice: "Compte les signes moins : 3, un nombre impair.",
                explication: "(−1) × (−1) = 1, puis 1 × (−1) = −1."
              },
              // 2e manche : l'esquive
              {
                titre: "Carrés",
                enonce: "Calcule 3² + 4².",
                reponse: 25,
                indice: "9 + 16.",
                explication: "3² + 4² = 9 + 16 = 25."
              },
              // 3e manche : le coup final
              {
                titre: "Relatifs",
                enonce: "Calcule 0,5 × (−8).",
                reponse: -4,
                indice: "La moitié de 8, avec le signe moins.",
                explication: "0,5 × (−8) = −4."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  //  CHAPITRE : Proportionnalité et pourcentages
  // =================================================================
  {
    niveau: "5e – 3e",
    titre: "Proportionnalité et pourcentages",
    introduction: "Voici la galerie des proportions. Recettes, prix, cartes et vitesses : partout où deux grandeurs avancent au même rythme, la proportionnalité est là.",
    conclusion: "Tu sais reconnaître et utiliser la proportionnalité. La galerie des triangles, de Pythagore et de Thalès t'attend.",
    salles: [

      {
        nom: "Les proportions d'Eudoxe",
        notion: "Proportionnalité : tableaux, quatrième proportionnelle, ratios",
        fond: "jardin",
        athena: "Une stèle t'attend ici, l'autre au sommet des marches de pierre.",
        plan: [
          "############################",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#......A...................#",
          "#......##..................#",
          "#..........T...............#",
          "#..........##..............#",
          "#..........................#",
          "#.............##...........#",
          "#..........................#",
          "S................##........#",
          "S....................T...GJ#",
          "############################"
        ],
        guides: [
          {
            nom: "Eudoxe de Cnide (vers 408 – 355 av. J.-C.)",
            portrait: "grec",
            texte: "Élève de Platon, j'ai inventé une façon rigoureuse de comparer des grandeurs entre elles : la théorie des proportions. Euclide l'a reprise dans ses « Éléments ». J'ai aussi imaginé un modèle de l'Univers fait de sphères qui tournent les unes dans les autres."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Coefficient",
                enonce: "Dans un tableau de proportionnalité, 4 devient 10. Par quel nombre multiplie-t-on ?",
                reponse: 2.5,
                indice: "Calcule 10 ÷ 4.",
                explication: "10 ÷ 4 = 2,5 : le coefficient de proportionnalité est 2,5."
              },
              // 2e manche : l'esquive
              {
                titre: "Ratio (5e)",
                enonce: "Ana et Ben se partagent 35 billes dans le ratio 2 : 5 (2 parts pour Ana, 5 parts pour Ben). Combien de billes Ben reçoit-il ?",
                reponse: 25,
                indice: "Il y a 2 + 5 = 7 parts en tout. Combien de billes dans une part ?",
                explication: "35 ÷ 7 = 5 billes par part. Ben a 5 parts : 5 × 5 = 25 billes."
              },
              // 3e manche : le coup final
              {
                titre: "Le taxi",
                enonce: "Un taxi coûte 3 € de prise en charge, plus 2 € par kilomètre. Une course a coûté 27 €. Combien de kilomètres a-t-elle fait ?",
                reponse: 12,
                unite: "km",
                indice: "Enlève d'abord la prise en charge : 27 − 3. (Attention, ce prix n'est pas proportionnel à la distance !)",
                explication: "27 − 3 = 24 € pour les kilomètres, et 24 ÷ 2 = 12 km."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Recette",
                enonce: "Pour 4 personnes, il faut 200 g de farine. Combien en faut-il pour 12 personnes ?",
                reponse: 600,
                unite: "g",
                indice: "12 personnes, c'est 3 fois plus que 4 personnes.",
                explication: "200 × 3 = 600 g."
              },
              // 2e manche : l'esquive
              {
                titre: "Prix",
                enonce: "3 cahiers coûtent 4,50 €. Combien coûtent 7 cahiers ?",
                reponse: 10.5,
                unite: "€",
                indice: "Calcule d'abord le prix d'un cahier.",
                explication: "4,50 ÷ 3 = 1,50 € le cahier, et 7 × 1,50 = 10,50 €."
              },
              // 3e manche : le coup final
              {
                titre: "Quatrième proportionnelle (4e)",
                enonce: "Dans un tableau de proportionnalité, 6 correspond à 15. À quoi correspond 10 ?",
                reponse: 25,
                indice: "Utilise le produit en croix : 10 × 15 ÷ 6.",
                explication: "10 × 15 ÷ 6 = 150 ÷ 6 = 25."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Recette",
                enonce: "3 œufs font 6 crêpes. Combien d'œufs faut-il pour 18 crêpes ?",
                reponse: 9,
                indice: "18 crêpes, c'est 3 fois 6.",
                explication: "3 × 3 = 9 œufs."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul mental",
                enonce: "Calcule 4 × 2,5.",
                reponse: 10,
                indice: "2,5 + 2,5 = 5.",
                explication: "4 × 2,5 = 10."
              },
              // 3e manche : le coup final
              {
                titre: "Moitié",
                enonce: "Quelle est la moitié de 3,6 ?",
                reponse: 1.8,
                indice: "Moitié de 3, plus moitié de 0,6.",
                explication: "1,5 + 0,3 = 1,8."
              }
            ]
          }
        ]
      },

      {
        nom: "Les comptes de Pacioli",
        notion: "Pourcentages : appliquer, calculer, augmenter, diminuer",
        fond: "mer",
        athena: "Une stèle t'attend en bas, une autre en haut des marches. Pour atteindre la corniche de la stèle d'or, il te faudra la stèle d'Hermès.",
        plan: [
          "############################",
          "#..........................#",
          "#....................R...A.#",
          "#....................#######",
          "#..........................#",
          "#..........................#",
          "#...T......................#",
          "#..####....................#",
          "#..........................#",
          "#.......###................#",
          "#..........................#",
          "S..........###.............#",
          "S..................H...T.GJ#",
          "###############...##########"
        ],
        guides: [
          {
            nom: "Luca Pacioli (vers 1445 – 1517)",
            portrait: "renaissance",
            texte: "Moine et professeur en Italie, ami de Léonard de Vinci, j'ai publié en 1494 un grand livre de mathématiques pour les marchands. J'y explique la comptabilité « en partie double », encore utilisée par les entreprises du monde entier."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Réduction",
                enonce: "Un jeu à 60 € est soldé à −25 %. Quel est son prix soldé ?",
                reponse: 45,
                unite: "€",
                indice: "25 %, c'est un quart. Calcule la réduction, puis enlève-la.",
                explication: "25 % de 60 = 15 €, et 60 − 15 = 45 €."
              },
              // 2e manche : l'esquive
              {
                titre: "Coefficient (3e)",
                enonce: "Augmenter un prix de 8 %, c'est le multiplier par quel nombre ?",
                reponse: 1.08,
                indice: "Le nouveau prix vaut 100 % + 8 % de l'ancien.",
                explication: "100 % + 8 % = 108 % = 1,08."
              },
              // 3e manche : le coup final
              {
                titre: "Prix de départ (3e)",
                enonce: "Après une baisse de 20 %, un vélo coûte 240 €. Quel était son prix avant la baisse ?",
                reponse: 300,
                unite: "€",
                indice: "Baisser de 20 %, c'est multiplier par 0,8. Fais l'opération inverse.",
                explication: "Prix de départ × 0,8 = 240, donc prix de départ = 240 ÷ 0,8 = 300 €. Vérification : 20 % de 300 = 60, et 300 − 60 = 240."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Pourcentage",
                enonce: "Combien font 20 % de 150 € ?",
                reponse: 30,
                unite: "€",
                indice: "10 % de 150, c'est 15.",
                explication: "20 % de 150 = 2 × 15 = 30 €."
              },
              // 2e manche : l'esquive
              {
                titre: "Pourcentage",
                enonce: "Dans une classe de 25 élèves, 8 font du théâtre. Quel pourcentage de la classe cela représente-t-il ?",
                reponse: 32,
                unite: "%",
                indice: "Pour passer de 25 à 100, on multiplie par 4.",
                explication: "8/25 = 32/100 = 32 %."
              },
              // 3e manche : le coup final
              {
                titre: "Augmentation",
                enonce: "Un manteau coûte 80 €. Son prix augmente de 15 %. Quel est son nouveau prix ?",
                reponse: 92,
                unite: "€",
                indice: "Calcule 15 % de 80 (10 % + 5 %), puis ajoute-le.",
                explication: "10 % de 80 = 8 et 5 % = 4, donc 15 % = 12 €. Nouveau prix : 80 + 12 = 92 €."
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
                enonce: "Combien font 10 % de 70 ?",
                reponse: 7,
                indice: "Divise par 10.",
                explication: "70 ÷ 10 = 7."
              },
              // 2e manche : l'esquive
              {
                titre: "Pourcentage",
                enonce: "Combien font 50 % de 46 ?",
                reponse: 23,
                indice: "La moitié.",
                explication: "46 ÷ 2 = 23."
              },
              // 3e manche : le coup final
              {
                titre: "Pourcentage",
                enonce: "Combien font 25 % de 80 ?",
                reponse: 20,
                indice: "Le quart.",
                explication: "80 ÷ 4 = 20."
              }
            ]
          }
        ],
        acrobaties: [
          {
            figure: "double",
            titre: "Le double salto",
            enonce: "Les sandales d'Hermès s'éveillent si tu calcules 10 % de 10 % de 5 000.",
            reponse: 50,
            indice: "Calcule d'abord 10 % de 5 000, puis 10 % du résultat.",
            explication: "10 % de 5 000 = 500, et 10 % de 500 = 50."
          }
        ]
      },

      {
        nom: "Les cartes de Mercator",
        notion: "Échelles et vitesses",
        fond: "crepuscule",
        athena: "Grimpe jusqu'à la stèle perchée, allume la dalle d'or, puis affronte le gardien d'en bas.",
        plan: [
          "############################",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#............D........T....#",
          "#..........#####.....###...#",
          "#.A........................#",
          "####.............###.......#",
          "#..........................#",
          "S...##...............##....#",
          "S.......T................GJ#",
          "############################"
        ],
        guides: [
          {
            nom: "Gerardus Mercator (1512 – 1594)",
            portrait: "renaissance",
            texte: "Cartographe flamand, j'ai dessiné en 1569 une carte du monde d'un genre nouveau : sur elle, un marin qui garde toujours le même cap suit une ligne droite. Les marins l'ont adoptée, et beaucoup de cartes l'utilisent encore aujourd'hui."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Vitesse",
                enonce: "Un cheval parcourt 30 km en 2 h, à vitesse constante. Quelle est sa vitesse ?",
                reponse: 15,
                unite: "km/h",
                indice: "Vitesse = distance ÷ durée.",
                explication: "30 ÷ 2 = 15 km/h."
              },
              // 2e manche : l'esquive
              {
                titre: "Distance",
                enonce: "Un navire avance à 20 km/h. Quelle distance parcourt-il en 2 h 30 min ?",
                reponse: 50,
                unite: "km",
                indice: "2 h 30 min = 2,5 h. Distance = vitesse × durée.",
                explication: "20 × 2,5 = 50 km."
              },
              // 3e manche : le coup final
              {
                titre: "Durée",
                enonce: "Un cycliste roule à 24 km/h. Combien de minutes met-il pour parcourir 6 km ?",
                reponse: 15,
                unite: "min",
                indice: "6 km, c'est quelle fraction de 24 km ? Prends la même fraction d'une heure.",
                explication: "6 km = 1/4 de 24 km, donc il met 1/4 d'heure = 15 min."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Échelle",
                enonce: "Sur une carte à l'échelle 1/100 000, deux villes sont à 5 cm l'une de l'autre. Quelle est la distance réelle, en km ?",
                reponse: 5,
                unite: "km",
                indice: "1 cm sur la carte = 100 000 cm en vrai = 1 km.",
                explication: "5 × 100 000 = 500 000 cm = 5 km."
              },
              // 2e manche : l'esquive
              {
                titre: "Échelle",
                enonce: "Sur un plan à l'échelle 1/50, une table mesure 4 cm. Combien mesure-t-elle en vrai, en m ?",
                reponse: 2,
                unite: "m",
                indice: "En vrai, tout est 50 fois plus grand.",
                explication: "4 × 50 = 200 cm = 2 m."
              },
              // 3e manche : le coup final
              {
                titre: "Échelle",
                enonce: "Une maquette de bateau mesure 30 cm ; le vrai bateau mesure 45 m. L'échelle s'écrit 1/n. Quelle est la valeur de n ?",
                reponse: 150,
                indice: "Mets les deux longueurs dans la même unité : 45 m = 4 500 cm.",
                explication: "4 500 ÷ 30 = 150 : l'échelle est 1/150."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Durées",
                enonce: "1 h 30 min, c'est combien d'heures (en écriture décimale) ?",
                reponse: 1.5,
                unite: "h",
                indice: "30 min = une demi-heure.",
                explication: "1 h 30 min = 1,5 h."
              },
              // 2e manche : l'esquive
              {
                titre: "Conversion",
                enonce: "1 km, c'est combien de cm ?",
                reponse: 100000,
                unite: "cm",
                indice: "1 km = 1 000 m et 1 m = 100 cm.",
                explication: "1 000 × 100 = 100 000 cm."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul mental",
                enonce: "Calcule 60 ÷ 4.",
                reponse: 15,
                indice: "La moitié de la moitié.",
                explication: "60 ÷ 4 = 15."
              }
            ]
          }
        ]
      },

      {
        nom: "Le voyage de Galilée",
        notion: "Boss de la galerie : vitesse, pourcentage et échelle",
        fond: "nuit",
        athena: "Célaeno la Harpie garde la sortie de la galerie. Résous son problème en cinq questions : tu as quatre minutes par question.",
        plan: [
          "############################",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#.A........................#",
          "####.......................#",
          "#..........................#",
          "S...##.............##......#",
          "S.........T........##...G.J#",
          "############################"
        ],
        guides: [
          {
            nom: "Galilée (1564 – 1642)",
            portrait: "renaissance",
            texte: "Astronome italien, j'ai tourné l'une des premières lunettes vers le ciel : j'ai vu les montagnes de la Lune et quatre satellites de Jupiter. J'ai aussi étudié le mouvement des objets qui roulent et qui tombent, et j'ai écrit que le livre de la nature est écrit en langue mathématique."
          }
        ],
        steles: [
          {
            boss: "Célaeno la Harpie",
            monstre: "harpie",
            contexte: "Galilée voyage de Pise à Florence, soit 84 km, en calèche, à la vitesse constante de 12 km/h. Le billet coûte normalement 40 €, mais il a droit à une réduction de 15 %.",
            exercices: [
              // 1re question : l'attaque
              {
                titre: "Question 1 : la durée",
                enonce: "Combien d'heures dure le voyage ?",
                reponse: 7,
                unite: "h",
                indice: "Durée = distance ÷ vitesse.",
                explication: "84 ÷ 12 = 7 h."
              },
              // 2e question : l'esquive
              {
                titre: "Question 2 : en route",
                enonce: "Quelle distance Galilée a-t-il parcourue au bout de 2 h 30 min ?",
                reponse: 30,
                unite: "km",
                indice: "2 h 30 min = 2,5 h.",
                explication: "12 × 2,5 = 30 km."
              },
              // 3e question : l'attaque
              {
                titre: "Question 3 : la réduction",
                enonce: "Combien d'euros la réduction lui fait-elle économiser ?",
                reponse: 6,
                unite: "€",
                indice: "Calcule 15 % de 40 € : 10 % plus 5 %.",
                explication: "10 % de 40 = 4 et 5 % de 40 = 2 : la réduction est de 6 €."
              },
              // 4e question : l'esquive
              {
                titre: "Question 4 : le billet",
                enonce: "Combien Galilée paie-t-il son billet ?",
                reponse: 34,
                unite: "€",
                indice: "Enlève la réduction au prix normal.",
                explication: "40 − 6 = 34 €. (On peut aussi calculer 40 × 0,85.)"
              },
              // 5e question : le coup final
              {
                titre: "Question 5 : la carte",
                enonce: "Sur sa carte, le trajet mesure 8,4 cm. L'échelle s'écrit 1/n. Quelle est la valeur de n ?",
                reponse: 1000000,
                indice: "Convertis 84 km en cm : 1 km = 100 000 cm.",
                explication: "84 km = 8 400 000 cm, et 8 400 000 ÷ 8,4 = 1 000 000. L'échelle est 1/1 000 000."
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
                enonce: "Combien font 15 % de 40 ?",
                reponse: 6,
                indice: "10 % de 40, plus 5 % de 40.",
                explication: "4 + 2 = 6."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul mental",
                enonce: "Calcule 84 ÷ 12.",
                reponse: 7,
                indice: "12 × 7 = ?",
                explication: "12 × 7 = 84."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul mental",
                enonce: "Calcule 12 × 2,5.",
                reponse: 30,
                indice: "12 × 2 + 12 × 0,5.",
                explication: "24 + 6 = 30."
              }
            ]
          }
        ]
      }
    ],
    // Le sanctuaire secret du chapitre : il s'ouvre avec assez de sceaux d'or.
    sanctuaire: {
      sceauxOr: 3,
      salle: {
        nom: "Le sanctuaire des proportions",
        notion: "Problèmes : pourcentages successifs, vitesses, échelles",
        fond: "sanctuaire",
        athena: "Le sanctuaire des proportions récompense ta patience. La stèle la plus proche construira la passerelle.",
        plan: [
          "############################",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#....A.....................#",
          "S...###....................#",
          "S........T............T.G.J#",
          "#############PPPPPPP########",
          "#############.......########",
          "#############.......########",
          "#############.......########"
        ],
        guides: [
          {
            nom: "Maria Gaetana Agnesi (1718 – 1799)",
            portrait: "femme19",
            texte: "Née à Milan, je parlais, dit-on, sept langues à onze ans. J'ai écrit l'un des premiers grands livres pour apprendre l'analyse, les mathématiques des courbes. Une courbe porte encore mon nom : la « courbe d'Agnesi »."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Vitesse",
                enonce: "Convertis 36 km/h en m/s.",
                reponse: 10,
                unite: "m/s",
                indice: "36 km = 36 000 m et 1 h = 3 600 s.",
                explication: "36 000 ÷ 3 600 = 10 m/s."
              },
              // 2e manche : l'esquive
              {
                titre: "Baisse puis hausse",
                enonce: "Un objet coûte 100 €. Son prix baisse de 50 %, puis augmente de 50 %. Combien coûte-t-il à la fin ?",
                reponse: 75,
                unite: "€",
                indice: "Calcule étape par étape : 50 % de 100, puis 50 % du nouveau prix.",
                explication: "Après la baisse : 50 €. Après la hausse : 50 + 25 = 75 €. On ne revient pas à 100 € !"
              },
              // 3e manche : le coup final
              {
                titre: "Le lac",
                enonce: "Sur une carte à l'échelle 1/25 000, un lac rectangulaire mesure 4 cm sur 2 cm. Quelle est son aire réelle, en hectares ? (1 ha = 10 000 m²)",
                reponse: 50,
                unite: "ha",
                indice: "1 cm sur la carte = 25 000 cm = 250 m en vrai.",
                explication: "4 cm → 1 000 m et 2 cm → 500 m. Aire : 1 000 × 500 = 500 000 m² = 50 ha."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Deux hausses",
                enonce: "Un prix augmente de 10 %, puis encore de 10 %. De combien de pour cent a-t-il augmenté en tout ?",
                reponse: 21,
                unite: "%",
                indice: "Augmenter de 10 %, c'est multiplier par 1,1. Fais-le deux fois.",
                explication: "1,1 × 1,1 = 1,21 : le prix a augmenté de 21 % (et pas de 20 %)."
              },
              // 2e manche : l'esquive
              {
                titre: "Le sirop",
                enonce: "On dilue 1 volume de sirop pour 7 volumes d'eau. Combien de cL de sirop faut-il pour faire 2 L de boisson ?",
                reponse: 25,
                unite: "cL",
                indice: "Il y a 1 + 7 = 8 volumes en tout, et 2 L = 200 cL.",
                explication: "200 ÷ 8 = 25 cL de sirop (et 175 cL d'eau)."
              },
              // 3e manche : le coup final
              {
                titre: "Le robinet",
                enonce: "Un robinet remplit une cuve de 420 L en 1 h. Combien de minutes faut-il pour verser 49 L ? (La passerelle mesurera ce nombre de cases.)",
                reponse: 7,
                unite: "min",
                indice: "Combien de litres coulent en 1 minute ?",
                explication: "420 ÷ 60 = 7 L par minute, et 49 ÷ 7 = 7 min.",
                effet: "passerelle"
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
                enonce: "Combien font 20 % de 35 ?",
                reponse: 7,
                indice: "10 % de 35 = 3,5.",
                explication: "2 × 3,5 = 7."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul",
                enonce: "Calcule 1,1 × 1,1.",
                reponse: 1.21,
                indice: "1,1 × 1 + 1,1 × 0,1.",
                explication: "1,1 + 0,11 = 1,21."
              },
              // 3e manche : le coup final
              {
                titre: "Durées",
                enonce: "0,5 h, c'est combien de minutes ?",
                reponse: 30,
                unite: "min",
                indice: "Une demi-heure.",
                explication: "0,5 × 60 = 30 min."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  //  CHAPITRE : Triangles : Pythagore, Thalès et trigonométrie
  // =================================================================
  {
    niveau: "5e – 3e",
    titre: "Triangles : Pythagore, Thalès et trigonométrie",
    introduction: "Voici la galerie des triangles. Ici, trois grands théorèmes permettent de calculer des longueurs et des angles qu'on ne peut pas mesurer directement. La calculatrice est permise !",
    conclusion: "Tu sais calculer dans les triangles. La galerie des fonctions t'attend.",
    salles: [

      {
        nom: "Les angles du jeune Pascal",
        notion: "Triangles : somme des angles, triangles particuliers, inégalité triangulaire (5e)",
        fond: "temple",
        athena: "Une stèle t'attend en bas, l'autre en haut, après une série de sauts.",
        plan: [
          "############################",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#....A........T............#",
          "#...###......###...........#",
          "#..........................#",
          "#........###...............#",
          "#..........................#",
          "#............###...........#",
          "#..........................#",
          "S................###.......#",
          "S....................T..G.J#",
          "############################"
        ],
        guides: [
          {
            nom: "Blaise Pascal (1623 – 1662)",
            portrait: "perruque",
            texte: "D'après ma sœur Gilberte, enfant, alors que mon père m'interdisait les mathématiques, j'ai redécouvert seul, en traçant des « barres » et des « ronds », que la somme des angles d'un triangle vaut deux angles droits. À 19 ans, j'ai inventé une machine à calculer : la Pascaline."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Triangle équilatéral",
                enonce: "Combien mesure chaque angle d'un triangle équilatéral ?",
                reponse: 60,
                unite: "°",
                indice: "Ses trois angles sont égaux, et leur somme vaut 180°.",
                explication: "180 ÷ 3 = 60°."
              },
              // 2e manche : l'esquive
              {
                titre: "Construire un triangle",
                enonce: "Un triangle a deux côtés de 5 cm et 8 cm. Son troisième côté mesure un nombre entier de centimètres. Quelle est sa plus grande longueur possible ?",
                reponse: 12,
                unite: "cm",
                indice: "Le plus grand côté doit être plus petit que la somme des deux autres.",
                explication: "Le troisième côté doit être plus petit que 5 + 8 = 13 cm. Le plus grand entier possible est 12 cm."
              },
              // 3e manche : le coup final
              {
                titre: "Quadrilatère",
                enonce: "Un quadrilatère se coupe en deux triangles, donc la somme de ses angles vaut 360°. Trois de ses angles mesurent 90°, 110° et 75°. Combien mesure le quatrième ?",
                reponse: 85,
                unite: "°",
                indice: "Ajoute les trois angles, puis cherche ce qui manque pour arriver à 360°.",
                explication: "90 + 110 + 75 = 275, et 360 − 275 = 85°."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Somme des angles",
                enonce: "Un triangle a deux angles de 50° et 70°. Combien mesure le troisième ?",
                reponse: 60,
                unite: "°",
                indice: "La somme des angles d'un triangle vaut 180°.",
                explication: "180 − 50 − 70 = 60°."
              },
              // 2e manche : l'esquive
              {
                titre: "Triangle rectangle",
                enonce: "Dans un triangle rectangle, un angle aigu mesure 34°. Combien mesure l'autre angle aigu ?",
                reponse: 56,
                unite: "°",
                indice: "L'angle droit prend déjà 90° : il reste 90° pour les deux autres.",
                explication: "90 − 34 = 56°."
              },
              // 3e manche : le coup final
              {
                titre: "Triangle isocèle",
                enonce: "Dans un triangle isocèle, l'angle au sommet principal mesure 40°. Combien mesure chacun des deux angles à la base ?",
                reponse: 70,
                unite: "°",
                indice: "Les deux angles à la base sont égaux, et il reste 180 − 40 degrés à partager.",
                explication: "180 − 40 = 140, et 140 ÷ 2 = 70°."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Angles",
                enonce: "Calcule 180 − 90.",
                reponse: 90,
                indice: "Un demi-tour moins un quart de tour.",
                explication: "180 − 90 = 90."
              },
              // 2e manche : l'esquive
              {
                titre: "Angles",
                enonce: "Calcule 180 − 2 × 50.",
                reponse: 80,
                indice: "La multiplication d'abord.",
                explication: "2 × 50 = 100, et 180 − 100 = 80."
              },
              // 3e manche : le coup final
              {
                titre: "Angles",
                enonce: "Calcule 3 × 60.",
                reponse: 180,
                indice: "3 × 6 = 18.",
                explication: "3 × 60 = 180."
              }
            ]
          }
        ]
      },

      {
        nom: "Le triangle de Pythagore",
        notion: "Théorème de Pythagore et sa réciproque (4e)",
        fond: "mer",
        athena: "Deux gardiens, puis un gouffre immense : seule la stèle d'Hermès te le fera franchir, d'un salto.",
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
          "S..........................#",
          "S.A.R.......H..T......T.G.J#",
          "#####.......#####...########"
        ],
        guides: [
          {
            nom: "Pythagore de Samos (VIe siècle av. J.-C.)",
            portrait: "grec",
            texte: "J'ai fondé une école en Italie du Sud, où l'on pensait que « tout est nombre ». Le théorème qui porte mon nom était connu bien avant moi, à Babylone. Mais on raconte que mon école fut l'une des premières à le démontrer."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Un côté de l'angle droit",
                enonce: "DEF est rectangle en D, avec EF = 17 cm et DE = 15 cm. Combien mesure DF ?",
                reponse: 8,
                unite: "cm",
                indice: "L'hypoténuse est EF : DF² = EF² − DE².",
                explication: "DF² = 17² − 15² = 289 − 225 = 64, donc DF = 8 cm."
              },
              // 2e manche : l'esquive
              {
                titre: "Réciproque",
                enonce: "Parmi ces triangles (longueurs des côtés), combien sont rectangles ? (3 ; 4 ; 5), (5 ; 6 ; 8), (8 ; 15 ; 17), (6 ; 7 ; 9)",
                reponse: 2,
                indice: "Pour chacun, compare le carré du plus grand côté à la somme des carrés des deux autres.",
                explication: "9 + 16 = 25 : oui. 25 + 36 = 61 ≠ 64 : non. 64 + 225 = 289 : oui. 36 + 49 = 85 ≠ 81 : non. Il y en a 2."
              },
              // 3e manche : le coup final
              {
                titre: "L'échelle",
                enonce: "Une échelle de 5 m est posée contre un mur vertical. Son pied est à 1,4 m du mur. À quelle hauteur touche-t-elle le mur ?",
                reponse: 4.8,
                unite: "m",
                indice: "L'échelle est l'hypoténuse : hauteur² = 5² − 1,4².",
                explication: "hauteur² = 25 − 1,96 = 23,04, donc hauteur = √23,04 = 4,8 m."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Carrés",
                enonce: "Calcule 6² + 8².",
                reponse: 100,
                indice: "6² = 36 et 8² = 64.",
                explication: "36 + 64 = 100."
              },
              // 2e manche : l'esquive
              {
                titre: "Hypoténuse",
                enonce: "ABC est rectangle en A, avec AB = 6 cm et AC = 8 cm. Combien mesure BC ?",
                reponse: 10,
                unite: "cm",
                indice: "BC est l'hypoténuse : BC² = AB² + AC².",
                explication: "BC² = 36 + 64 = 100, donc BC = √100 = 10 cm."
              },
              // 3e manche : le coup final
              {
                titre: "Hypoténuse",
                enonce: "Un triangle rectangle a des côtés de l'angle droit de 5 cm et 12 cm. Combien mesure l'hypoténuse ?",
                reponse: 13,
                unite: "cm",
                indice: "Hypoténuse² = 5² + 12².",
                explication: "25 + 144 = 169, et √169 = 13 cm."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Carrés",
                enonce: "Calcule 5².",
                reponse: 25,
                indice: "5 × 5.",
                explication: "5² = 25."
              },
              // 2e manche : l'esquive
              {
                titre: "Racines",
                enonce: "Combien vaut √49 ?",
                reponse: 7,
                indice: "Quel nombre positif, multiplié par lui-même, donne 49 ?",
                explication: "7 × 7 = 49."
              },
              // 3e manche : le coup final
              {
                titre: "Racines",
                enonce: "Combien vaut √144 ?",
                reponse: 12,
                indice: "Quel nombre positif, multiplié par lui-même, donne 144 ?",
                explication: "12 × 12 = 144."
              }
            ]
          }
        ],
        acrobaties: [
          {
            figure: "salto",
            titre: "Le salto d'Hermès",
            enonce: "Hermès réveille ses sandales si tu trouves la longueur de la diagonale d'un rectangle de 9 m sur 12 m.",
            reponse: 15,
            unite: "m",
            indice: "La diagonale est l'hypoténuse d'un triangle rectangle de côtés 9 et 12.",
            explication: "81 + 144 = 225, et √225 = 15 m."
          }
        ]
      },

      {
        nom: "L'ombre de Thalès",
        notion: "Agrandissements et théorème de Thalès (3e)",
        fond: "crepuscule",
        athena: "Le gouffre est trop large pour sauter. La passerelle aura exactement la longueur que tu calculeras.",
        plan: [
          "############################",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#....A.....................#",
          "S...###....................#",
          "S........T...........T..G.J#",
          "#############PPPPPP#########",
          "#############......#########",
          "#############......#########",
          "#############......#########",
          "#############......#########"
        ],
        guides: [
          {
            nom: "Thalès de Milet (vers 625 – 547 av. J.-C.)",
            portrait: "grec",
            texte: "On raconte qu'en Égypte, j'ai mesuré la hauteur de la grande pyramide sans y grimper : j'ai attendu le moment où l'ombre de mon bâton était aussi longue que le bâton lui-même. À cet instant, l'ombre de la pyramide était aussi longue que la pyramide était haute !"
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Thalès",
                enonce: "M est sur [AB] et N sur [AC], avec (MN) parallèle à (BC). AM = 4, AB = 10 et AN = 6. Combien mesure AC ?",
                reponse: 15,
                indice: "Thalès : AM/AB = AN/AC.",
                explication: "4/10 = 6/AC, donc AC = 6 × 10 ÷ 4 = 15."
              },
              // 2e manche : l'esquive
              {
                titre: "L'ombre",
                enonce: "Un bâton de 2 m a une ombre de 3 m. Au même moment, un arbre a une ombre de 15 m. Quelle est la hauteur de l'arbre ?",
                reponse: 10,
                unite: "m",
                indice: "L'ombre de l'arbre est 5 fois plus longue que celle du bâton.",
                explication: "15 ÷ 3 = 5, donc l'arbre mesure 2 × 5 = 10 m."
              },
              // 3e manche : le coup final
              {
                titre: "La pyramide",
                enonce: "Le bâton de Thalès mesure 1 m et son ombre 1,5 m. Au même moment, l'ombre de la pyramide, mesurée depuis son centre, est de 219 m. Quelle est la hauteur de la pyramide ?",
                reponse: 146,
                unite: "m",
                indice: "Les hauteurs sont proportionnelles aux ombres : hauteur = ombre ÷ 1,5.",
                explication: "219 ÷ 1,5 = 146 m : c'est à peu près la hauteur d'origine de la pyramide de Khéops !"
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Agrandissement",
                enonce: "On agrandit un triangle de côtés 3 cm, 4 cm et 5 cm avec un coefficient 2. Quel est le périmètre du nouveau triangle ?",
                reponse: 24,
                unite: "cm",
                indice: "Toutes les longueurs sont multipliées par 2.",
                explication: "6 + 8 + 10 = 24 cm."
              },
              // 2e manche : l'esquive
              {
                titre: "Réduction",
                enonce: "On réduit un carré de 10 cm de côté avec un coefficient 0,5. Quelle est l'aire du nouveau carré ?",
                reponse: 25,
                unite: "cm²",
                indice: "Le nouveau côté mesure 10 × 0,5 cm.",
                explication: "Le côté devient 5 cm, et l'aire 5 × 5 = 25 cm² (4 fois plus petite)."
              },
              // 3e manche : le coup final
              {
                titre: "Thalès",
                enonce: "M est sur [AB] et N sur [AC], avec (MN) parallèle à (BC). AM = 3, AB = 9 et BC = 18. Combien mesure MN ? (La passerelle mesurera MN cases.)",
                reponse: 6,
                indice: "Thalès : AM/AB = MN/BC.",
                explication: "3/9 = MN/18, donc MN = 18 × 3 ÷ 9 = 6.",
                effet: "passerelle"
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul",
                enonce: "Calcule 18 × 3 ÷ 9.",
                reponse: 6,
                indice: "18 ÷ 9 = 2.",
                explication: "2 × 3 = 6."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul",
                enonce: "Calcule 15 ÷ 1,5.",
                reponse: 10,
                indice: "Combien de fois 1,5 dans 15 ?",
                explication: "1,5 × 10 = 15."
              },
              // 3e manche : le coup final
              {
                titre: "Agrandissement",
                enonce: "Par quel coefficient passe-t-on d'une longueur de 4 cm à 12 cm ?",
                reponse: 3,
                indice: "12 ÷ 4.",
                explication: "Le coefficient est 3."
              }
            ]
          }
        ]
      },

      {
        nom: "Les cordes d'Al-Battani",
        notion: "Boss de la galerie : Pythagore et trigonométrie (3e)",
        fond: "nuit",
        athena: "Le Sphinx de Thèbes garde la sortie de la galerie. Résous son énigme en cinq questions : tu as quatre minutes par question, et la calculatrice est permise.",
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
            nom: "Al-Battani (vers 858 – 929)",
            portrait: "turban",
            texte: "Astronome à Raqqa, en Syrie, j'ai observé le ciel pendant plus de quarante ans. Pour mes calculs, j'ai utilisé le sinus et d'autres rapports entre les côtés d'un triangle : les ancêtres de ta trigonométrie. Copernic me cite dans son grand livre."
          }
        ],
        steles: [
          {
            boss: "Le Sphinx de Thèbes",
            monstre: "sphinx",
            contexte: "Al-Battani tend une corde [AC] du sommet A d'une tour verticale [AB] jusqu'au point C du sol. La tour mesure AB = 12 m, et BC = 9 m. Le triangle ABC est rectangle en B.",
            exercices: [
              // 1re question : l'attaque
              {
                titre: "Question 1 : la corde",
                enonce: "Combien mesure la corde AC ?",
                reponse: 15,
                unite: "m",
                indice: "Le triangle est rectangle en B : AC² = AB² + BC².",
                explication: "AC² = 144 + 81 = 225, donc AC = 15 m."
              },
              // 2e question : l'esquive
              {
                titre: "Question 2 : le cosinus",
                enonce: "Calcule cos(ACB) = BC/AC, en écriture décimale.",
                reponse: 0.6,
                indice: "BC = 9 et AC = 15.",
                explication: "9 ÷ 15 = 0,6."
              },
              // 3e question : l'attaque
              {
                titre: "Question 3 : la tangente",
                enonce: "Calcule tan(ACB) = AB/BC, arrondi au centième.",
                reponse: 1.33,
                tolerance: 0.006,
                indice: "AB = 12 et BC = 9.",
                explication: "12 ÷ 9 = 1,333…, soit 1,33 au centième près."
              },
              // 4e question : l'esquive
              {
                titre: "Question 4 : l'angle",
                enonce: "Avec la calculatrice, donne la mesure de l'angle ACB, arrondie au degré.",
                reponse: 53,
                tolerance: 0.6,
                unite: "°",
                indice: "cos(ACB) = 0,6 : utilise la touche « Arccos » (ou cos⁻¹) de la calculatrice.",
                explication: "Arccos(0,6) ≈ 53,1°, soit 53° au degré près."
              },
              // 5e question : le coup final
              {
                titre: "Question 5 : une deuxième corde",
                enonce: "Une deuxième corde part du sommet A et touche le sol en D, sur la demi-droite [BC), avec l'angle ADB = 45°. Combien mesure BD ?",
                reponse: 12,
                unite: "m",
                indice: "tan(45°) = 1 = AB/BD.",
                explication: "AB/BD = tan(45°) = 1, donc BD = AB = 12 m."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Racines",
                enonce: "Combien vaut √225 ?",
                reponse: 15,
                indice: "15 × 15 = ?",
                explication: "15 × 15 = 225."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul",
                enonce: "Calcule 9 ÷ 15 (écriture décimale).",
                reponse: 0.6,
                indice: "9/15 = 3/5.",
                explication: "3 ÷ 5 = 0,6."
              },
              // 3e manche : le coup final
              {
                titre: "Trigonométrie",
                enonce: "Combien vaut cos(60°) ?",
                reponse: 0.5,
                indice: "C'est une valeur à connaître, ou à vérifier à la calculatrice.",
                explication: "cos(60°) = 0,5."
              }
            ]
          }
        ]
      }
    ],
    // Le sanctuaire secret du chapitre : il s'ouvre avec assez de sceaux d'or.
    sanctuaire: {
      sceauxOr: 3,
      salle: {
        nom: "Le sanctuaire des triangles",
        notion: "Problèmes : Pythagore dans l'espace, trigonométrie, Thalès",
        fond: "sanctuaire",
        athena: "Le sanctuaire des triangles récompense ta patience. Gravis les marches : chaque stèle t'attend un peu plus haut, et la plus haute construira la passerelle.",
        plan: [
          "############################",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "S..........................#",
          "S...............T..........#",
          "#######PPPPPPPPP##.........#",
          "#######.........##T.....A..#",
          "#######.........####...###.#",
          "#######.........####T......#",
          "#######.........######.....#",
          "#######.........######..G.J#",
          "#######.........############"
        ],
        guides: [
          {
            nom: "Nasir al-Din al-Tusi (1201 – 1274)",
            portrait: "turban",
            texte: "Savant persan, j'ai dirigé le grand observatoire de Maragha. Dans mon « Traité du quadrilatère », j'ai fait de la trigonométrie une branche des mathématiques à part entière, et non plus un simple outil des astronomes."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Pythagore",
                enonce: "Un rectangle mesure 8 cm sur 15 cm. Combien mesure sa diagonale ?",
                reponse: 17,
                unite: "cm",
                indice: "La diagonale est l'hypoténuse d'un triangle rectangle de côtés 8 et 15.",
                explication: "64 + 225 = 289, et √289 = 17 cm."
              },
              // 2e manche : l'esquive
              {
                titre: "Trigonométrie",
                enonce: "Dans un triangle rectangle, l'hypoténuse mesure 10 cm et un angle aigu mesure 30°. Combien mesure le côté opposé à cet angle ? (sin 30° = 0,5)",
                reponse: 5,
                unite: "cm",
                indice: "sin(angle) = côté opposé ÷ hypoténuse.",
                explication: "côté opposé = 10 × sin 30° = 10 × 0,5 = 5 cm."
              },
              // 3e manche : le coup final
              {
                titre: "Thalès",
                enonce: "M est sur [AB] et N sur [AC], avec (MN) parallèle à (BC). AM = 6, AB = 10 et AC = 15. Combien mesure AN ? (La passerelle mesurera AN cases.)",
                reponse: 9,
                indice: "Thalès : AM/AB = AN/AC.",
                explication: "6/10 = AN/15, donc AN = 15 × 6 ÷ 10 = 9.",
                effet: "passerelle"
              }
            ]
          },
          {
            contexte: "Une boîte en forme de pavé droit mesure 3 cm de long, 4 cm de large et 12 cm de haut.",
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "La boîte",
                enonce: "Quelle est la longueur de la diagonale du fond de la boîte (rectangle de 3 cm sur 4 cm) ?",
                reponse: 5,
                unite: "cm",
                indice: "Pythagore dans le rectangle du fond.",
                explication: "9 + 16 = 25, et √25 = 5 cm."
              },
              // 2e manche : l'esquive
              {
                titre: "La boîte",
                enonce: "Quelle est la longueur de la grande diagonale de la boîte, qui va d'un coin du fond au coin opposé du dessus ?",
                reponse: 13,
                unite: "cm",
                indice: "Elle forme un triangle rectangle avec la diagonale du fond (5 cm) et la hauteur (12 cm).",
                explication: "25 + 144 = 169, et √169 = 13 cm."
              },
              // 3e manche : le coup final
              {
                titre: "Triangle rectangle",
                enonce: "Un triangle rectangle a des côtés de l'angle droit de 7 cm et 24 cm. Combien mesure son hypoténuse ?",
                reponse: 25,
                unite: "cm",
                indice: "Hypoténuse² = 7² + 24².",
                explication: "49 + 576 = 625, et √625 = 25 cm."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Angles",
                enonce: "Dans un triangle ABC, l'angle A mesure le double de l'angle B, et l'angle C mesure 60°. Combien mesure l'angle B ?",
                reponse: 40,
                unite: "°",
                indice: "A + B = 180 − 60 = 120°, et A = 2B : donc 3B = 120°.",
                explication: "3B = 120°, donc B = 40° (et A = 80°)."
              },
              // 2e manche : l'esquive
              {
                titre: "Le toboggan",
                enonce: "Un toboggan de 5 m de long fait un angle de 30° avec le sol. À quelle hauteur se trouve son sommet ? (sin 30° = 0,5)",
                reponse: 2.5,
                unite: "m",
                indice: "La hauteur est le côté opposé à l'angle de 30°, le toboggan est l'hypoténuse.",
                explication: "hauteur = 5 × sin 30° = 5 × 0,5 = 2,5 m."
              },
              // 3e manche : le coup final
              {
                titre: "Agrandir un cube",
                enonce: "On agrandit un cube avec un coefficient 3. Par combien son volume est-il multiplié ?",
                reponse: 27,
                indice: "Le volume dépend de trois longueurs, toutes multipliées par 3.",
                explication: "3 × 3 × 3 = 27 : le volume est multiplié par 27."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Racines",
                enonce: "Combien vaut √81 ?",
                reponse: 9,
                indice: "9 × 9 = ?",
                explication: "9 × 9 = 81."
              },
              // 2e manche : l'esquive
              {
                titre: "Trigonométrie",
                enonce: "Combien vaut sin(30°) ?",
                reponse: 0.5,
                indice: "Une valeur à connaître.",
                explication: "sin(30°) = 0,5."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul",
                enonce: "Calcule 6 × 15 ÷ 10.",
                reponse: 9,
                indice: "6 × 15 = 90.",
                explication: "90 ÷ 10 = 9."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  //  CHAPITRE : Fonctions
  // =================================================================
  {
    niveau: "5e – 3e",
    titre: "Fonctions",
    introduction: "Voici la galerie des fonctions. Une fonction, c'est comme une machine : on y fait entrer un nombre, et il en sort un autre. Ici, tu apprendras à la faire marcher dans les deux sens.",
    conclusion: "Les fonctions n'ont plus de secret pour toi. La dernière galerie, celle des statistiques et du hasard, t'attend.",
    salles: [

      {
        nom: "Les graphiques d'Oresme",
        notion: "Notion de fonction : image, antécédent, tableau de valeurs",
        fond: "temple",
        athena: "Une stèle près de toi, l'autre tout en haut des marches. La stèle d'or brille sur la petite corniche.",
        plan: [
          "############################",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#....T.....................#",
          "#...###....................#",
          "#..........................#",
          "#.......###................#",
          "#...................A......#",
          "#...........###....###.....#",
          "#..........................#",
          "S...............###........#",
          "S.....................T.G.J#",
          "############################"
        ],
        guides: [
          {
            nom: "Nicole Oresme (vers 1320 – 1382)",
            portrait: "eveque",
            texte: "Évêque de Lisieux et savant, j'ai eu l'idée de représenter par un dessin une grandeur qui varie : des traits verticaux plus ou moins longs montrent comment une vitesse change au cours du temps. C'est l'ancêtre des courbes de fonctions !"
          }
        ],
        steles: [
          {
            contexte: "Un tableau de valeurs de la fonction h :  x = −2 → h(x) = 5 ;  x = 0 → h(x) = 1 ;  x = 1 → h(x) = −1 ;  x = 3 → h(x) = 5 ;  x = 4 → h(x) = 9.",
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Image",
                enonce: "Quelle est l'image de 0 par h ?",
                reponse: 1,
                indice: "Cherche 0 dans la ligne des x, et lis la valeur en dessous.",
                explication: "h(0) = 1 : l'image de 0 est 1."
              },
              // 2e manche : l'esquive
              {
                titre: "Antécédents",
                enonce: "Combien de nombres du tableau ont pour image 5 ?",
                reponse: 2,
                indice: "Cherche 5 dans la ligne des h(x).",
                explication: "h(−2) = 5 et h(3) = 5 : 5 a deux antécédents dans le tableau, −2 et 3."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul",
                enonce: "Calcule h(4) − h(1).",
                reponse: 10,
                indice: "h(4) = 9 et h(1) = −1.",
                explication: "9 − (−1) = 9 + 1 = 10."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Image",
                enonce: "f(x) = 3x − 1. Quelle est l'image de 4 par f ?",
                reponse: 11,
                indice: "Remplace x par 4 : f(4) = 3 × 4 − 1.",
                explication: "f(4) = 12 − 1 = 11."
              },
              // 2e manche : l'esquive
              {
                titre: "Image",
                enonce: "g(x) = x² + 5. Calcule g(−3).",
                reponse: 14,
                indice: "(−3)² = (−3) × (−3).",
                explication: "g(−3) = 9 + 5 = 14."
              },
              // 3e manche : le coup final
              {
                titre: "Antécédent",
                enonce: "f(x) = 3x − 1. Quel nombre a pour image 20 par f ?",
                reponse: 7,
                indice: "Résous l'équation 3x − 1 = 20.",
                explication: "3x = 21, donc x = 7. Vérification : f(7) = 21 − 1 = 20."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Image",
                enonce: "f(x) = 2x. Calcule f(5).",
                reponse: 10,
                indice: "2 × 5.",
                explication: "f(5) = 10."
              },
              // 2e manche : l'esquive
              {
                titre: "Image",
                enonce: "f(x) = x + 7. Calcule f(−7).",
                reponse: 0,
                indice: "−7 + 7.",
                explication: "f(−7) = 0."
              },
              // 3e manche : le coup final
              {
                titre: "Image",
                enonce: "f(x) = x². Calcule f(9).",
                reponse: 81,
                indice: "9 × 9.",
                explication: "f(9) = 81."
              }
            ]
          }
        ]
      },

      {
        nom: "Les droites de Descartes",
        notion: "Fonctions linéaires et proportionnalité (3e)",
        fond: "bibliotheque",
        athena: "Deux gardiens et une stèle d'or perchée. Ensuite, saute par-dessus le précipice pour atteindre la porte.",
        plan: [
          "############################",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#.............A............#",
          "#............###...........#",
          "#.................T........#",
          "#................###.......#",
          "#..........................#",
          "S...................##.....#",
          "S.....................T.G.J#",
          "#########...################"
        ],
        guides: [
          {
            nom: "René Descartes (1596 – 1650)",
            portrait: "perruque",
            texte: "Philosophe et mathématicien, j'ai eu l'idée de repérer chaque point par deux nombres, ses coordonnées. Alors une courbe devient une équation, et une équation devient une courbe ! Le repère dans lequel tu traces tes droites est souvent appelé « cartésien », d'après mon nom."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Proportionnalité",
                enonce: "Le prix de l'essence est proportionnel au volume : 30 L coûtent 54 €. Le prix s'écrit p(x) = ax. Quelle est la valeur de a ?",
                reponse: 1.8,
                indice: "a est le prix d'un litre : 54 ÷ 30.",
                explication: "a = 54 ÷ 30 = 1,8 : le litre coûte 1,80 €."
              },
              // 2e manche : l'esquive
              {
                titre: "Pourcentage",
                enonce: "Diminuer un prix de 20 %, c'est appliquer la fonction linéaire f(x) = ax. Quelle est la valeur de a ?",
                reponse: 0.8,
                indice: "Après la baisse, il reste 100 % − 20 % du prix.",
                explication: "100 % − 20 % = 80 % = 0,8 : f(x) = 0,8x."
              },
              // 3e manche : le coup final
              {
                titre: "Lecture",
                enonce: "La droite qui représente une fonction linéaire f passe par le point (5 ; 2). Quelle est l'image de 20 par f ?",
                reponse: 8,
                indice: "f(5) = 2. Et 20, c'est 4 fois 5.",
                explication: "a = 2 ÷ 5 = 0,4, donc f(20) = 0,4 × 20 = 8."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Fonction linéaire",
                enonce: "f(x) = 4x. Calcule f(2,5).",
                reponse: 10,
                indice: "4 × 2,5.",
                explication: "f(2,5) = 4 × 2,5 = 10."
              },
              // 2e manche : l'esquive
              {
                titre: "Coefficient",
                enonce: "f est une fonction linéaire et f(3) = 12. Quel est son coefficient a (f(x) = ax) ?",
                reponse: 4,
                indice: "a × 3 = 12.",
                explication: "a = 12 ÷ 3 = 4 : f(x) = 4x."
              },
              // 3e manche : le coup final
              {
                titre: "Antécédent",
                enonce: "f(x) = −2x. Quel est l'antécédent de 14 ?",
                reponse: -7,
                indice: "Résous −2x = 14.",
                explication: "x = 14 ÷ (−2) = −7."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Linéaire",
                enonce: "f(x) = 5x. Calcule f(−2).",
                reponse: -10,
                indice: "5 × (−2).",
                explication: "f(−2) = −10."
              },
              // 2e manche : l'esquive
              {
                titre: "Linéaire",
                enonce: "f(x) = 0,5x. Calcule f(14).",
                reponse: 7,
                indice: "La moitié de 14.",
                explication: "f(14) = 7."
              },
              // 3e manche : le coup final
              {
                titre: "Linéaire",
                enonce: "f(x) = 3x. Quel est l'antécédent de 18 ?",
                reponse: 6,
                indice: "3 × ? = 18.",
                explication: "18 ÷ 3 = 6."
              }
            ]
          }
        ]
      },

      {
        nom: "La notation d'Euler",
        notion: "Fonctions affines (3e)",
        fond: "jardin",
        athena: "Allume la dalle d'or tout en haut des plateformes et bats les deux gardiens.",
        plan: [
          "############################",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#............D.............#",
          "#...........###............#",
          "#.A........................#",
          "####....###................#",
          "#..........................#",
          "S....##.....###............#",
          "S....T...............T..G.J#",
          "################...#########"
        ],
        guides: [
          {
            nom: "Leonhard Euler (1707 – 1783)",
            portrait: "perruque",
            texte: "Né à Bâle, en Suisse, j'ai écrit plus de 800 articles et livres de mathématiques, même après être devenu presque aveugle. C'est moi qui ai répandu l'écriture f(x) pour une fonction, et aussi la lettre π."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Ordonnée à l'origine",
                enonce: "f(x) = 5x − 8. Combien vaut f(0) ?",
                reponse: -8,
                indice: "Remplace x par 0.",
                explication: "f(0) = 5 × 0 − 8 = −8 : c'est l'ordonnée à l'origine."
              },
              // 2e manche : l'esquive
              {
                titre: "Coefficient directeur",
                enonce: "f est affine, avec f(0) = 1 et f(2) = 7. Quel est son coefficient directeur a ?",
                reponse: 3,
                indice: "Quand x augmente de 2, f(x) augmente de 7 − 1.",
                explication: "a = (7 − 1) ÷ (2 − 0) = 6 ÷ 2 = 3 : f(x) = 3x + 1."
              },
              // 3e manche : le coup final
              {
                titre: "Deux points",
                enonce: "f est affine, avec f(1) = 4 et f(5) = 16. Calcule f(10).",
                reponse: 31,
                indice: "Trouve d'abord a = (16 − 4) ÷ (5 − 1), puis b.",
                explication: "a = 12 ÷ 4 = 3, et f(1) = 3 + b = 4 donne b = 1. Donc f(10) = 30 + 1 = 31."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Image",
                enonce: "f(x) = 2x + 3. Calcule f(5).",
                reponse: 13,
                indice: "2 × 5 + 3.",
                explication: "f(5) = 10 + 3 = 13."
              },
              // 2e manche : l'esquive
              {
                titre: "Image",
                enonce: "f(x) = −3x + 7. Calcule f(4).",
                reponse: -5,
                indice: "−3 × 4 + 7.",
                explication: "f(4) = −12 + 7 = −5."
              },
              // 3e manche : le coup final
              {
                titre: "Antécédent",
                enonce: "f(x) = 2x + 3. Quel nombre a pour image 0 ? (écriture décimale)",
                reponse: -1.5,
                indice: "Résous 2x + 3 = 0.",
                explication: "2x = −3, donc x = −1,5."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Affine",
                enonce: "f(x) = x + 1. Calcule f(9).",
                reponse: 10,
                indice: "9 + 1.",
                explication: "f(9) = 10."
              },
              // 2e manche : l'esquive
              {
                titre: "Affine",
                enonce: "f(x) = 2x − 1. Calcule f(0).",
                reponse: -1,
                indice: "2 × 0 − 1.",
                explication: "f(0) = −1."
              },
              // 3e manche : le coup final
              {
                titre: "Affine",
                enonce: "f(x) = 10 − x. Calcule f(3).",
                reponse: 7,
                indice: "10 − 3.",
                explication: "f(3) = 7."
              }
            ]
          }
        ]
      },

      {
        nom: "Les tarifs de Leibniz",
        notion: "Boss de la galerie : comparer deux tarifs (fonctions linéaire et affine)",
        fond: "temple",
        athena: "L'Hydre de Lerne garde la sortie de la galerie. Résous son problème en cinq questions : tu as quatre minutes par question.",
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
            nom: "Gottfried Wilhelm Leibniz (1646 – 1716)",
            portrait: "perruque",
            texte: "Philosophe et savant allemand, j'ai été l'un des premiers à employer le mot « fonction » en mathématiques. J'ai aussi construit une machine à calculer qui savait multiplier, et étudié le calcul en binaire, avec seulement des 0 et des 1, comme tes ordinateurs."
          }
        ],
        steles: [
          {
            boss: "L'Hydre de Lerne",
            monstre: "hydre",
            contexte: "Pour entrer au musée de Leibniz, il y a deux tarifs. Tarif A : 8 € par visite. Tarif B : un abonnement de 30 € pour l'année, puis 5 € par visite. On note x le nombre de visites dans l'année ; avec le tarif A, on paie A(x) = 8x.",
            exercices: [
              // 1re question : l'attaque
              {
                titre: "Question 1 : le tarif A",
                enonce: "Combien paie-t-on pour 6 visites avec le tarif A ?",
                reponse: 48,
                unite: "€",
                indice: "A(6) = 8 × 6.",
                explication: "8 × 6 = 48 €."
              },
              // 2e question : l'esquive
              {
                titre: "Question 2 : le tarif B",
                enonce: "Le prix avec le tarif B s'écrit B(x) = 5x + b. Quelle est la valeur de b ?",
                reponse: 30,
                indice: "b, c'est ce qu'on paie même avec 0 visite.",
                explication: "L'abonnement coûte 30 € : B(x) = 5x + 30, donc b = 30."
              },
              // 3e question : l'attaque
              {
                titre: "Question 3 : comparer",
                enonce: "Combien paie-t-on pour 6 visites avec le tarif B ?",
                reponse: 60,
                unite: "€",
                indice: "B(6) = 5 × 6 + 30.",
                explication: "30 + 30 = 60 €. Pour 6 visites, le tarif A est plus avantageux."
              },
              // 4e question : l'esquive
              {
                titre: "Question 4 : l'égalité",
                enonce: "Pour combien de visites les deux tarifs coûtent-ils le même prix ?",
                reponse: 10,
                indice: "Résous l'équation 8x = 5x + 30.",
                explication: "3x = 30, donc x = 10 visites (80 € avec chaque tarif)."
              },
              // 5e question : le coup final
              {
                titre: "Question 5 : le budget",
                enonce: "Avec 100 € et le tarif B, combien de visites peut-on faire au maximum ?",
                reponse: 14,
                indice: "Enlève l'abonnement, puis divise par le prix d'une visite.",
                explication: "100 − 30 = 70 €, et 70 ÷ 5 = 14 visites."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul",
                enonce: "Calcule 8 × 10.",
                reponse: 80,
                indice: "8 × 1, puis × 10.",
                explication: "8 × 10 = 80."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul",
                enonce: "Calcule 5 × 10 + 30.",
                reponse: 80,
                indice: "La multiplication d'abord.",
                explication: "50 + 30 = 80."
              },
              // 3e manche : le coup final
              {
                titre: "Linéaire",
                enonce: "f(x) = 8x. Quel est l'antécédent de 56 ?",
                reponse: 7,
                indice: "8 × ? = 56.",
                explication: "56 ÷ 8 = 7."
              }
            ]
          }
        ]
      }
    ],
    // Le sanctuaire secret du chapitre : il s'ouvre avec assez de sceaux d'or.
    sanctuaire: {
      sceauxOr: 3,
      salle: {
        nom: "Le sanctuaire des fonctions",
        notion: "Problèmes : fonctions, équations, inéquations",
        fond: "sanctuaire",
        athena: "Le sanctuaire des fonctions récompense ta patience. La stèle d'or brille sur la haute corniche : seule la stèle d'Hermès t'y portera.",
        plan: [
          "############################",
          "#..........................#",
          "#..........................#",
          "#..A...R...................#",
          "#.######...................#",
          "#..........................#",
          "#..........................#",
          "#..........................#",
          "#...............T..........#",
          "#..............###.........#",
          "#..........................#",
          "#..........###.............S",
          "#J.G..T..H.................S",
          "############################"
        ],
        guides: [
          {
            nom: "Katherine Johnson (1918 – 2020)",
            portrait: "moderne",
            texte: "Mathématicienne à la NASA, j'ai calculé à la main les trajectoires des premiers vols spatiaux américains. En 1962, l'astronaute John Glenn a demandé que je vérifie moi-même les calculs de l'ordinateur avant de décoller !"
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Fonction carré",
                enonce: "g(x) = x². Combien de nombres ont pour image 49 par g ?",
                reponse: 2,
                indice: "Quel nombre, multiplié par lui-même, donne 49 ? N'oublie pas les négatifs !",
                explication: "7² = 49 et (−7)² = 49 : il y a 2 antécédents."
              },
              // 2e manche : l'esquive
              {
                titre: "Égalité",
                enonce: "f(x) = 3x − 2 et g(x) = x + 6. Pour quelle valeur de x a-t-on f(x) = g(x) ?",
                reponse: 4,
                indice: "Résous 3x − 2 = x + 6.",
                explication: "2x = 8, donc x = 4 (et f(4) = g(4) = 10)."
              },
              // 3e manche : le coup final
              {
                titre: "Inéquation",
                enonce: "Quel est le plus petit nombre entier x tel que 3x − 2 > x + 6 ?",
                reponse: 5,
                indice: "Résous l'inéquation comme une équation : 2x > 8.",
                explication: "2x > 8 donne x > 4. Le plus petit entier strictement plus grand que 4 est 5."
              }
            ]
          },
          {
            contexte: "On considère la fonction f(x) = (x + 2)² − x².",
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Image",
                enonce: "Calcule f(3).",
                reponse: 16,
                indice: "(3 + 2)² − 3².",
                explication: "f(3) = 5² − 3² = 25 − 9 = 16."
              },
              // 2e manche : l'esquive
              {
                titre: "Développer",
                enonce: "En développant, f(x) devient une fonction affine ax + b. Quelle est la valeur de a ?",
                reponse: 4,
                indice: "(x + 2)² = x² + 4x + 4.",
                explication: "f(x) = x² + 4x + 4 − x² = 4x + 4 : a = 4."
              },
              // 3e manche : le coup final
              {
                titre: "Antécédent",
                enonce: "Quel nombre a pour image 0 par f ?",
                reponse: -1,
                indice: "f(x) = 4x + 4. Résous 4x + 4 = 0.",
                explication: "4x = −4, donc x = −1."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Image",
                enonce: "f(x) = x². Calcule f(−4).",
                reponse: 16,
                indice: "(−4) × (−4).",
                explication: "f(−4) = 16."
              },
              // 2e manche : l'esquive
              {
                titre: "Image",
                enonce: "f(x) = 4x + 4. Calcule f(−1).",
                reponse: 0,
                indice: "4 × (−1) + 4.",
                explication: "f(−1) = 0."
              },
              // 3e manche : le coup final
              {
                titre: "Image",
                enonce: "f(x) = −x. Calcule f(−8).",
                reponse: 8,
                indice: "L'opposé de −8.",
                explication: "f(−8) = 8."
              }
            ]
          }
        ],
        acrobaties: [
          {
            figure: "double",
            titre: "Le double salto",
            enonce: "Les sandales d'Hermès s'éveillent si tu trouves f(4), sachant que f est affine, avec f(0) = −3 et f(1) = 1.",
            reponse: 13,
            indice: "f(x) = ax + b : b = f(0), et a = f(1) − f(0).",
            explication: "b = −3 et a = 1 − (−3) = 4 : f(x) = 4x − 3, donc f(4) = 16 − 3 = 13."
          }
        ]
      }
    }
  },

  // =================================================================
  //  CHAPITRE : Statistiques et probabilités
  // =================================================================
  {
    niveau: "5e – 3e",
    titre: "Statistiques et probabilités",
    introduction: "Voici la dernière galerie, celle des données et du hasard. Moyennes, médianes, dés et pièces : ici, on apprend à décrire ce qui varie et à prévoir ce qui est incertain.",
    conclusion: "Bravo, Talos ! Tu as traversé toutes les galeries de l'école et du collège. Te voilà prêt pour le lycée !",
    salles: [

      {
        nom: "L'homme moyen de Quetelet",
        notion: "Statistiques : moyenne, médiane, étendue",
        fond: "jardin",
        athena: "Une stèle t'attend ici, l'autre au sommet des marches de pierre.",
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
            nom: "Adolphe Quetelet (1796 – 1874)",
            portrait: "xixe",
            texte: "Astronome belge, j'ai eu l'idée d'appliquer les statistiques aux êtres humains : taille, poids, naissances… J'ai imaginé l'« homme moyen », et un indice que les médecins utilisent encore pour comparer le poids et la taille : l'indice de masse corporelle."
          }
        ],
        steles: [
          {
            contexte: "Les notes de Talos ce trimestre : 9 ; 8 ; 16 ; 11 ; 16.",
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Moyenne",
                enonce: "Quelle est la moyenne de ces notes ?",
                reponse: 12,
                indice: "Additionne toutes les notes, puis divise par le nombre de notes.",
                explication: "9 + 8 + 16 + 11 + 16 = 60, et 60 ÷ 5 = 12."
              },
              // 2e manche : l'esquive
              {
                titre: "Étendue",
                enonce: "Quelle est l'étendue de ces notes ?",
                reponse: 8,
                indice: "Étendue = plus grande valeur − plus petite valeur.",
                explication: "16 − 8 = 8."
              },
              // 3e manche : le coup final
              {
                titre: "Médiane",
                enonce: "Quelle est la médiane de ces notes ?",
                reponse: 11,
                indice: "Range les notes dans l'ordre : la médiane est celle du milieu.",
                explication: "8 ; 9 ; 11 ; 16 ; 16 : la note du milieu (la 3e sur 5) est 11."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Médiane",
                enonce: "Quelle est la médiane de la série 3 ; 5 ; 8 ; 10 ?",
                reponse: 6.5,
                indice: "Il y a 4 valeurs : la médiane est au milieu des deux valeurs centrales.",
                explication: "Les valeurs centrales sont 5 et 8 : (5 + 8) ÷ 2 = 6,5."
              },
              // 2e manche : l'esquive
              {
                titre: "Note manquante",
                enonce: "Talos a eu 11 et 14 à deux contrôles. Quelle note doit-il avoir au troisième pour avoir 13 de moyenne ?",
                reponse: 14,
                indice: "Pour 13 de moyenne sur 3 notes, il faut un total de 3 × 13.",
                explication: "3 × 13 = 39, et 39 − 11 − 14 = 14."
              },
              // 3e manche : le coup final
              {
                titre: "Moyenne pondérée",
                enonce: "Un élève a 10 avec un coefficient 1, et 13 avec un coefficient 2. Quelle est sa moyenne ?",
                reponse: 12,
                indice: "La note de coefficient 2 compte deux fois : (10 + 13 + 13) ÷ 3.",
                explication: "(10 × 1 + 13 × 2) ÷ (1 + 2) = 36 ÷ 3 = 12."
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
                enonce: "Quelle est la moyenne de 10 et 14 ?",
                reponse: 12,
                indice: "(10 + 14) ÷ 2.",
                explication: "24 ÷ 2 = 12."
              },
              // 2e manche : l'esquive
              {
                titre: "Moyenne",
                enonce: "Quelle est la moyenne de 5, 6 et 7 ?",
                reponse: 6,
                indice: "(5 + 6 + 7) ÷ 3.",
                explication: "18 ÷ 3 = 6."
              },
              // 3e manche : le coup final
              {
                titre: "Étendue",
                enonce: "Quelle est l'étendue de la série 3 ; 9 ; 20 ?",
                reponse: 17,
                indice: "20 − 3.",
                explication: "Étendue = 17."
              }
            ]
          }
        ]
      },

      {
        nom: "Les dés de Cardan",
        notion: "Probabilités : expériences aléatoires simples (5e – 4e)",
        fond: "crepuscule",
        athena: "Bats le gardien de la stèle, puis la stèle d'Hermès te fera franchir le gouffre d'un salto. La stèle d'or est perchée sur les marches.",
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
            nom: "Jérôme Cardan (1501 – 1576)",
            portrait: "renaissance",
            texte: "Médecin italien et joueur passionné, j'ai écrit le « Livre des jeux de hasard », l'un des premiers textes à calculer des chances avec des dés. On y compte déjà les cas favorables parmi tous les cas possibles."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Le dé",
                enonce: "On lance un dé équilibré à 6 faces. Quelle est la probabilité d'obtenir un 4 ? (Écris une fraction.)",
                reponse: 1 / 6,
                tolerance: 0.0005,
                indice: "Il y a 6 faces possibles, et une seule porte le 4.",
                explication: "1 cas favorable sur 6 cas possibles : 1/6."
              },
              // 2e manche : l'esquive
              {
                titre: "Le dé",
                enonce: "Quelle est la probabilité d'obtenir un nombre pair ? (fraction ou nombre décimal)",
                reponse: 0.5,
                indice: "Les nombres pairs du dé : 2, 4 et 6.",
                explication: "3 cas favorables sur 6 : 3/6 = 1/2 = 0,5."
              },
              // 3e manche : le coup final
              {
                titre: "L'urne",
                enonce: "Une urne contient 3 boules rouges, 5 vertes et 2 bleues. On tire une boule au hasard. Quelle est la probabilité qu'elle ne soit pas bleue ? (fraction ou nombre décimal)",
                reponse: 0.8,
                indice: "Combien de boules ne sont pas bleues ? Combien de boules en tout ?",
                explication: "3 + 5 = 8 boules ne sont pas bleues, sur 10 : 8/10 = 0,8."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul",
                enonce: "Calcule 1 − 0,3.",
                reponse: 0.7,
                indice: "Il manque combien à 0,3 pour faire 1 ?",
                explication: "1 − 0,3 = 0,7."
              },
              // 2e manche : l'esquive
              {
                titre: "Fraction",
                enonce: "Écris 1/4 en nombre décimal.",
                reponse: 0.25,
                indice: "Un quart d'euro.",
                explication: "1/4 = 0,25."
              },
              // 3e manche : le coup final
              {
                titre: "Le dé",
                enonce: "Combien de faces a un dé classique ?",
                reponse: 6,
                indice: "Pense au 6.",
                explication: "6 faces."
              }
            ]
          }
        ],
        acrobaties: [
          {
            figure: "salto",
            titre: "Le salto d'Hermès",
            enonce: "Hermès réveille ses sandales si tu donnes la probabilité d'obtenir « pile » avec une pièce équilibrée. (nombre décimal)",
            reponse: 0.5,
            indice: "Il y a deux faces, pile et face.",
            explication: "1 cas sur 2 : 1/2 = 0,5."
          }
        ]
      },

      {
        nom: "Le problème des partis",
        notion: "Probabilités : événement contraire, fréquences, deux épreuves (3e)",
        fond: "nuit",
        athena: "Allume la dalle d'or sur l'estrade et bats les deux gardiens pour ouvrir la porte. Attention au précipice !",
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
            nom: "Pierre de Fermat (1601 – 1665)",
            portrait: "perruque",
            texte: "Magistrat à Toulouse, je faisais des mathématiques pour le plaisir. En 1654, Blaise Pascal et moi avons échangé des lettres pour résoudre le « problème des partis » : comment partager équitablement l'argent d'un jeu interrompu ? Ces lettres sont souvent vues comme la naissance du calcul des probabilités."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Événement contraire",
                enonce: "La probabilité qu'il pleuve demain est 0,35. Quelle est la probabilité qu'il ne pleuve pas ?",
                reponse: 0.65,
                indice: "Un événement et son contraire ont des probabilités dont la somme vaut 1.",
                explication: "1 − 0,35 = 0,65."
              },
              // 2e manche : l'esquive
              {
                titre: "Fréquence",
                enonce: "Sur 200 lancers d'une punaise, elle tombe 80 fois sur la pointe. Quelle est la fréquence de « sur la pointe » ? (nombre décimal)",
                reponse: 0.4,
                indice: "Fréquence = nombre de fois ÷ nombre total de lancers.",
                explication: "80 ÷ 200 = 0,4."
              },
              // 3e manche : le coup final
              {
                titre: "Somme des probabilités",
                enonce: "Une roue a trois couleurs. P(rouge) = 0,25 et P(bleu) = 0,4. Quelle est la probabilité de tomber sur le vert ?",
                reponse: 0.35,
                indice: "La somme des probabilités des trois couleurs vaut 1.",
                explication: "1 − 0,25 − 0,4 = 0,35."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Deux pièces",
                enonce: "On lance deux pièces. Combien d'issues possibles y a-t-il ?",
                reponse: 4,
                indice: "Écris-les : pile-pile, pile-face…",
                explication: "PP, PF, FP et FF : 4 issues."
              },
              // 2e manche : l'esquive
              {
                titre: "Deux pièces",
                enonce: "Quelle est la probabilité d'obtenir deux fois pile ? (nombre décimal)",
                reponse: 0.25,
                indice: "Une seule issue sur les 4 donne PP.",
                explication: "1/4 = 0,25."
              },
              // 3e manche : le coup final
              {
                titre: "Deux dés",
                enonce: "On lance deux dés et on additionne les résultats. Quelle est la probabilité d'obtenir 12 ? (Écris une fraction.)",
                reponse: 1 / 36,
                tolerance: 0.0005,
                indice: "Il y a 6 × 6 = 36 issues, et une seule donne 12.",
                explication: "Seul 6 + 6 donne 12 : 1/36."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul",
                enonce: "Calcule 1 − 0,25.",
                reponse: 0.75,
                indice: "Un entier moins un quart.",
                explication: "1 − 0,25 = 0,75."
              },
              // 2e manche : l'esquive
              {
                titre: "Calcul",
                enonce: "Calcule 0,5 × 0,5.",
                reponse: 0.25,
                indice: "La moitié de la moitié.",
                explication: "0,5 × 0,5 = 0,25."
              },
              // 3e manche : le coup final
              {
                titre: "Fraction",
                enonce: "Combien font 1/36 de 72 ?",
                reponse: 2,
                indice: "72 ÷ 36.",
                explication: "72 ÷ 36 = 2."
              }
            ]
          }
        ]
      },

      {
        nom: "Les roses de Florence Nightingale",
        notion: "Boss de la galerie : une série statistique et une probabilité",
        fond: "temple",
        athena: "La Chimère de Lycie garde la sortie de la dernière galerie. Résous son problème en cinq questions : tu as quatre minutes par question.",
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
            nom: "Florence Nightingale (1820 – 1910)",
            portrait: "femme19",
            texte: "Infirmière anglaise, j'ai soigné les soldats pendant la guerre de Crimée. Avec des statistiques et des diagrammes en forme de rose, j'ai montré que la plupart mouraient de maladies évitables, et j'ai convaincu le gouvernement d'améliorer l'hygiène des hôpitaux."
          }
        ],
        steles: [
          {
            boss: "La Chimère de Lycie",
            monstre: "chimere",
            contexte: "Dans un hôpital, on a compté chaque jour, pendant 8 jours, le nombre de malades guéris : 5 ; 12 ; 4 ; 3 ; 9 ; 4 ; 13 ; 6.",
            exercices: [
              // 1re question : l'attaque
              {
                titre: "Question 1 : le total",
                enonce: "Combien de malades ont été guéris en tout pendant ces 8 jours ?",
                reponse: 56,
                indice: "Additionne les 8 nombres.",
                explication: "5 + 12 + 4 + 3 + 9 + 4 + 13 + 6 = 56."
              },
              // 2e question : l'esquive
              {
                titre: "Question 2 : la moyenne",
                enonce: "Combien de malades ont été guéris en moyenne par jour ?",
                reponse: 7,
                indice: "Divise le total par le nombre de jours.",
                explication: "56 ÷ 8 = 7."
              },
              // 3e question : l'attaque
              {
                titre: "Question 3 : la médiane",
                enonce: "Quelle est la médiane de cette série ?",
                reponse: 5.5,
                indice: "Range les 8 valeurs dans l'ordre : la médiane est au milieu de la 4e et de la 5e.",
                explication: "3 ; 4 ; 4 ; 5 ; 6 ; 9 ; 12 ; 13 : (5 + 6) ÷ 2 = 5,5."
              },
              // 4e question : l'esquive
              {
                titre: "Question 4 : l'étendue",
                enonce: "Quelle est l'étendue de cette série ?",
                reponse: 10,
                indice: "Plus grande valeur − plus petite valeur.",
                explication: "13 − 3 = 10."
              },
              // 5e question : le coup final
              {
                titre: "Question 5 : une probabilité",
                enonce: "On choisit un de ces 8 jours au hasard. Quelle est la probabilité que plus de 7 malades aient été guéris ce jour-là ? (nombre décimal)",
                reponse: 0.375,
                indice: "Compte les jours avec plus de 7 guérisons.",
                explication: "12, 9 et 13 : 3 jours sur 8, et 3/8 = 0,375."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Calcul",
                enonce: "Calcule 56 ÷ 8.",
                reponse: 7,
                indice: "8 × 7 = ?",
                explication: "8 × 7 = 56."
              },
              // 2e manche : l'esquive
              {
                titre: "Fraction",
                enonce: "Écris 3/8 en nombre décimal.",
                reponse: 0.375,
                indice: "1/8 = 0,125.",
                explication: "3 × 0,125 = 0,375."
              },
              // 3e manche : le coup final
              {
                titre: "Moyenne",
                enonce: "Calcule (5 + 6) ÷ 2.",
                reponse: 5.5,
                indice: "11 ÷ 2.",
                explication: "5,5."
              }
            ]
          }
        ]
      }
    ],
    // Le sanctuaire secret du chapitre : il s'ouvre avec assez de sceaux d'or.
    sanctuaire: {
      sceauxOr: 3,
      salle: {
        nom: "Le sanctuaire du hasard",
        notion: "Problèmes : moyennes, deux dés, tirages sans remise",
        fond: "sanctuaire",
        athena: "Le sanctuaire du hasard ne s'ouvre qu'aux esprits patients. La passerelle aura la longueur de ta réponse.",
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
            nom: "Pierre-Simon de Laplace (1749 – 1827)",
            portrait: "perruque",
            texte: "Savant français, j'ai publié en 1812 un grand traité sur les probabilités. J'ai écrit que la théorie des probabilités n'est, au fond, que le bon sens réduit au calcul. J'ai aussi étudié le mouvement des planètes autour du Soleil."
          }
        ],
        steles: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Deux dés",
                enonce: "On lance deux dés et on additionne. Sur les 36 issues, combien donnent une somme de 7 ?",
                reponse: 6,
                indice: "Écris les paires : 1 + 6, 2 + 5, …, sans oublier que l'ordre des dés compte.",
                explication: "(1 ; 6), (2 ; 5), (3 ; 4), (4 ; 3), (5 ; 2), (6 ; 1) : 6 issues."
              },
              // 2e manche : l'esquive
              {
                titre: "Deux dés",
                enonce: "Quelle est la probabilité d'obtenir une somme de 7 ? (Écris une fraction.)",
                reponse: 1 / 6,
                tolerance: 0.0005,
                indice: "6 issues favorables sur 36.",
                explication: "6/36 = 1/6 : 7 est la somme la plus probable."
              },
              // 3e manche : le coup final
              {
                titre: "L'urne",
                enonce: "Une urne contient des boules rouges et 30 boules bleues. La probabilité de tirer une rouge est 0,25. Combien y a-t-il de boules rouges ? (La passerelle mesurera ce nombre de cases.)",
                reponse: 10,
                indice: "Si les rouges sont 1/4 des boules, les bleues sont les 3/4.",
                explication: "30 bleues = 3/4 des boules, donc il y a 40 boules en tout, et 40 − 30 = 10 rouges.",
                effet: "passerelle"
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Moyenne",
                enonce: "La moyenne de 4 nombres est 10. On ajoute le nombre 20. Quelle est la nouvelle moyenne ?",
                reponse: 12,
                indice: "La somme des 4 nombres est 4 × 10.",
                explication: "40 + 20 = 60, et 60 ÷ 5 = 12."
              },
              // 2e manche : l'esquive
              {
                titre: "Médiane",
                enonce: "Une série de 11 nombres est rangée dans l'ordre. À quel rang se trouve la médiane ?",
                reponse: 6,
                indice: "Il doit y avoir autant de nombres avant qu'après.",
                explication: "5 nombres avant, 5 après : la médiane est la 6e valeur."
              },
              // 3e manche : le coup final
              {
                titre: "Moyenne de la classe",
                enonce: "Dans une classe, les 12 filles ont 14 de moyenne et les 8 garçons 11,5. Quelle est la moyenne de la classe ?",
                reponse: 13,
                indice: "Calcule le total des points des filles, puis celui des garçons.",
                explication: "12 × 14 = 168 et 8 × 11,5 = 92. (168 + 92) ÷ 20 = 260 ÷ 20 = 13."
              }
            ]
          },
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Au moins un pile",
                enonce: "On lance deux fois une pièce. Quelle est la probabilité d'obtenir au moins un pile ? (nombre décimal)",
                reponse: 0.75,
                indice: "Le contraire de « au moins un pile », c'est « deux fois face ».",
                explication: "P(FF) = 1/4, donc P(au moins un pile) = 1 − 1/4 = 3/4 = 0,75."
              },
              // 2e manche : l'esquive
              {
                titre: "Sans remise",
                enonce: "Un sac contient 2 boules rouges et 1 verte. On tire deux boules l'une après l'autre, sans remettre la première. Quelle est la probabilité de tirer les 2 rouges ? (Écris une fraction.)",
                reponse: 1 / 3,
                tolerance: 0.0005,
                indice: "Au premier tirage, 2 rouges sur 3 boules. Au second, il reste 1 rouge sur 2 boules.",
                explication: "2/3 × 1/2 = 2/6 = 1/3."
              },
              // 3e manche : le coup final
              {
                titre: "Le pari",
                enonce: "Un jeu : on lance un dé. Avec un 6, on gagne 10 € ; sinon, on perd 1 €. Sur 600 parties, si chaque face sort exactement aussi souvent que les autres, quel est le gain total en euros ?",
                reponse: 500,
                unite: "€",
                indice: "Sur 600 lancers, combien de 6 ? Combien d'autres résultats ?",
                explication: "100 fois le 6 : +1 000 €. 500 fois autre chose : −500 €. Gain total : 1 000 − 500 = 500 €."
              }
            ]
          }
        ],
        bonus: [
          {
            exercices: [
              // 1re manche : l'attaque
              {
                titre: "Fraction",
                enonce: "Combien font 1/6 de 600 ?",
                reponse: 100,
                indice: "600 ÷ 6.",
                explication: "600 ÷ 6 = 100."
              },
              // 2e manche : l'esquive
              {
                titre: "Probabilité",
                enonce: "Calcule 1 − 1/4 (nombre décimal).",
                reponse: 0.75,
                indice: "1/4 = 0,25.",
                explication: "1 − 0,25 = 0,75."
              },
              // 3e manche : le coup final
              {
                titre: "Calcul",
                enonce: "Calcule 260 ÷ 20.",
                reponse: 13,
                indice: "26 ÷ 2.",
                explication: "260 ÷ 20 = 13."
              }
            ]
          }
        ]
      }
    }
  }
];
