/*
  CHAPITRE : SNT (Seconde) — Chapitre 2 : Internet
  ----------------------------------------------
  Programme de SNT de 2019 (arrêté du 17-1-2019, BO spécial n° 1 du 22 janvier 2019), thème « Internet » :
  protocole TCP/IP (paquets, routage), adresses symboliques et serveurs DNS, réseaux pair-à-pair,
  indépendance d'Internet par rapport au réseau physique, ordres de grandeur du trafic.
  Écriture : formules et nombres entre $...$ (antislash doublé), code en ligne entre accents graves `...`.
  seances : déroulé du chapitre (séances de 1 h et de 2 h en alternance) ; seance dans une partie du cours = séance où on la traite.
  Vidéos : Les Bons Profs, MOOC SNT (Inria), Lelivrescolaire, Novelclass (aucune vidéo de SNT sur la chaîne pour l'instant).
  Générateurs : préfixe si- dans assets/exercices-snt.js ; figures « si-cours-… ».
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["snt-internet"] = {
  niveau: "SNT Seconde",
  numero: 2,
  titre: "Internet",
  accroche: "Ton message WhatsApp traverse l'océan en une fraction de seconde. Comment ? Adresses IP, paquets, routeurs, DNS : le chapitre ouvre la boîte noire du réseau mondial.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Le cours complet à imprimer", url: "assets/pdf/snt-internet-cours.pdf" },
    { titre: "Exercices corrigés à imprimer", url: "assets/pdf/snt-internet-exercices.pdf" }
  ],

  /* ---------- 0. DÉROULÉ EN SÉANCES ---------- */
  seancesNote: "Cinq séances, une par semaine, en alternant 1 h et 2 h (7 h en tout). Chaque partie du cours porte le numéro de la séance où on la travaille. Une séance de 2 h est faite de deux parties d'une heure.",
  seances: [
    {
      duree: "1 h", titre: "Internet, c'est quoi ?",
      objectifs: ["Distinguer **Internet** (le réseau) et le **Web** (une application d'Internet).", "Connaître les grandes étapes de l'histoire d'Internet.", "Manipuler les unités : bit, octet, ko, Mo, Go, To."],
      deroule: ["**10 min** · Question de départ : « Quand tu envoies une photo à un ami, par où passe-t-elle ? » Chacun dessine son idée, on compare.", "**15 min** · Parties 1 et 2 du cours, avec la vidéo des repères historiques ; on complète la frise.", "**20 min** · Partie 3 : ordres de grandeur. Combien pèse une photo, un film ? Combien de temps pour envoyer 1 Go ?", "**15 min** · Exercices : séries « Repères historiques » et « Ordres de grandeur »."],
      maison: "Regarder la vidéo de la partie 1 et faire la série « Repères historiques » jusqu'à 3 étoiles."
    },
    {
      duree: "2 h", titre: "Adresses IP et annuaire DNS",
      objectifs: ["Écrire un nombre en binaire et lire un octet.", "Lire une adresse IPv4 : partie réseau, partie machine.", "Retrouver l'adresse IP d'un site à partir de son nom, et inversement."],
      deroule: ["**Partie A (1 h)** · Le binaire et les adresses IP (partie 4) : conversions, puis activité « Quelle est mon adresse ? » : sur le téléphone, Paramètres › Wi-Fi › détails du réseau ; sur l'ordinateur, la commande `ipconfig` (Windows) ou `ip a` (Linux). On relève l'adresse IP, le masque et l'adresse de la passerelle (la box ou le routeur du lycée).", "Exercices : séries « Binaire », « Adresses IP valides » et « Réseau et machine ».", "**Partie B (1 h)** · Le DNS (partie 5) : vidéo, puis activité sur ordinateur : `nslookup www.wikipedia.org` donne l'adresse IP du site ; `nslookup` suivi d'une adresse IP donne le nom. On compare les réponses obtenues pour trois sites.", "Exercices : série « Annuaire DNS ». Bilan : à quoi servirait Internet sans DNS ?"],
      maison: "Fiche méthode « Lire et convertir un octet » et série « Binaire »."
    },
    {
      duree: "1 h", titre: "Paquets, TCP et IP",
      objectifs: ["Expliquer pourquoi un message est découpé en paquets.", "Distinguer le rôle de IP (adresses, acheminement) et celui de TCP (fiabilité).", "Distinguer la fiabilité d'une transmission et l'absence de garantie de délai."],
      deroule: ["**20 min** · Activité débranchée « le jeu des paquets » : une phrase est découpée en morceaux numérotés sur des papiers ; les papiers passent de main en main jusqu'au destinataire, dans le désordre, et l'un d'eux est « perdu ». Le destinataire doit reconstituer le message et redemander ce qui manque : c'est le travail de TCP.", "**20 min** · Parties 6 et 7 du cours, avec les vidéos.", "**20 min** · Exercices : séries « Paquets », « Remettre en ordre » et « Rôle des protocoles »."],
      maison: "Série « Rôle des protocoles » et relire le schéma de l'échange TCP."
    },
    {
      duree: "2 h", titre: "Routage et réseaux physiques",
      objectifs: ["Caractériser le principe du routage et ses limites (pannes, TTL, encombrement).", "Caractériser quelques réseaux physiques : filaires ou non, rapides ou lents, actuels ou obsolètes.", "Calculer un temps de téléchargement à partir d'un débit."],
      deroule: ["**Partie A (1 h)** · Activité débranchée : la classe devient un réseau ; chaque élève-routeur a une table « destination → voisin ». On fait circuler des paquets, puis un routeur tombe en panne : que se passe-t-il ? Parties 8 et 9 du cours. Sur ordinateur, `tracert www.wikipedia.org` (Windows) ou `traceroute` montre les routeurs traversés.", "Exercices : séries « Routage » et « Durée de vie (TTL) ».", "**Partie B (1 h)** · Partie 10 du cours : réseaux physiques et débits ; pourquoi Internet marche aussi bien en 4G qu'en Wi-Fi.", "Exercices : séries « Réseaux physiques » et « Débits et temps »."],
      maison: "Fiche méthode « Trouver un plus court chemin » et série « Routage »."
    },
    {
      duree: "1 h", titre: "Pair-à-pair, neutralité du Net et bilan",
      objectifs: ["Décrire l'intérêt des réseaux pair-à-pair et les usages illicites qu'on peut en faire.", "Comprendre l'enjeu de la neutralité du Net.", "Faire le bilan du chapitre."],
      deroule: ["**15 min** · Parties 11 et 12 du cours.", "**15 min** · Débat argumenté : « Un opérateur devrait-il pouvoir ralentir les vidéos pour accélérer les jeux en ligne ? » Chacun prépare deux arguments.", "**20 min** · QCM du chapitre (il change à chaque essai) et série « Vrai ou faux ».", "**10 min** · Bilan : chacun complète la carte mentale « Internet » (adresses, DNS, paquets, TCP/IP, routage, réseaux)."],
      maison: "Refaire le QCM jusqu'à au moins 10/12 et relire les erreurs fréquentes."
    }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Internet, un réseau de réseaux",
      seance: 1,
      figure: "si-cours-reseau",
      video: { titre: "Vidéo (Lelivrescolaire) : Internet, SNT Seconde", youtube: "https://youtu.be/tYP44fcX6dY" },
      texte:
        "Un **réseau** est un ensemble d'appareils reliés pour échanger des informations. À la maison ou au lycée, le **réseau local** relie les téléphones, ordinateurs et imprimantes à une **box** ou à un routeur, par câble ou par Wi-Fi.\n\n" +
        "**Internet** relie entre eux des millions de réseaux : réseaux locaux, réseaux des opérateurs (Orange, SFR, Free…), réseaux d'universités et d'entreprises. C'est un **réseau de réseaux**, mondial, que personne ne possède en entier. Des **routeurs** font passer les données d'un réseau à l'autre, et des câbles en fibre optique, souvent sous-marins, relient les continents : Mayotte est reliée au reste d'Internet par des câbles sous-marins.\n\n" +
        "Ce qui fait l'unité d'Internet, ce n'est pas un câble mais un ensemble de règles communes, les **protocoles**, d'abord **IP** (Internet Protocol) et **TCP** (Transmission Control Protocol). Tout appareil qui « parle » IP peut être joint par tous les autres : ordinateurs, téléphones, consoles, caméras, montres…\n\n" +
        "**Internet n'est pas le Web.** Le Web (les pages et les liens, chapitre 3) est **une application** qui utilise Internet, comme le courriel, les messageries, les jeux en ligne, la visioconférence ou la vidéo à la demande.",
      exemple: {
        enonce: "Envoyer un message sur une messagerie, regarder une série en streaming, consulter une page Wikipédia : lesquelles de ces activités utilisent Internet ? Lesquelles utilisent le Web ?",
        solution: "Les trois utilisent **Internet** (le réseau). Seule la consultation de Wikipédia dans un navigateur utilise le **Web** ; la messagerie et l'application de streaming utilisent Internet avec leurs propres protocoles."
      }
    },
    {
      titre: "Repères historiques",
      seance: 1,
      figure: "si-cours-frise",
      video: { titre: "Vidéo (Les Bons Profs) : repères historiques d'Internet", youtube: "https://youtu.be/VuiWBSfKLaM" },
      texte:
        "Dès les années 1950, des ordinateurs sont reliés pour échanger des informations, mais chaque constructeur ou opérateur téléphonique a son propre système, incompatible avec les autres.\n\n" +
        "- **1969-1970** : aux États-Unis, **ArpaNet** relie des ordinateurs d'universités et de laboratoires.\n" +
        "- **1971** : en France, le réseau **Cyclades**, de Louis Pouzin, invente l'idée d'envoyer les données en petits paquets indépendants (les datagrammes) ; la même année, le premier courrier électronique avec le signe @ est envoyé.\n" +
        "- **1974** : Vint Cerf et Bob Kahn décrivent les protocoles **TCP/IP**, qui permettent de relier des réseaux différents.\n" +
        "- **1er janvier 1983** : ArpaNet adopte TCP/IP. C'est la **naissance d'Internet**. En 1984, le système de noms de domaine (**DNS**) arrive.\n" +
        "- **1989** : Tim Berners-Lee invente le **Web** au CERN (chapitre 3).\n" +
        "- Ensuite, Internet se répand dans les foyers (modems, ADSL), puis dans les poches avec le Wi-Fi (1997), les smartphones (2007), la 4G (2012 en France) et la 5G (2020).\n\n" +
        "Pendant ce temps, la France avait son propre réseau, le **Minitel** (généralisé à partir de 1982), arrêté en 2012."
    },
    {
      titre: "Ordres de grandeur : bits, octets et trafic",
      seance: 1,
      figure: "si-cours-unites",
      texte:
        "Toute information numérique (texte, image, son, vidéo) est codée avec des **bits** : des $0$ et des $1$. Un groupe de $8$ bits forme un **octet** (en anglais *byte*), assez pour coder une lettre.\n\n" +
        "Pour les grandes quantités, on utilise les préfixes du système international : $1$ kilooctet (ko) $= 1\\,000$ octets, $1$ mégaoctet (Mo) $= 1\\,000$ ko, puis gigaoctet (Go), téraoctet (To), pétaoctet (Po), exaoctet (Eo), zettaoctet (Zo) : on multiplie par $1\\,000$ à chaque cran. (Les informaticiens utilisent aussi $1$ Kio $= 1\\,024$ octets, mais on ne s'en sert pas ici.)\n\n" +
        "Attention : les **débits** des connexions s'annoncent en **bits** par seconde (bit/s, Mbit/s, Gbit/s), alors que les fichiers se mesurent en **octets**. Une connexion à $80$ Mbit/s transmet au mieux $80 \\div 8 = 10$ Mo par seconde.\n\n" +
        "Le trafic d'Internet est gigantesque et augmente chaque année : le programme de SNT citait une prévision de $3{,}3 \\times 10^{21}$ octets ($3{,}3$ Zo) pour l'année 2021, soit plusieurs centaines de gigaoctets par habitant de la planète. La plus grande partie est de la **vidéo**.",
      exemple: {
        enonce: "Combien de photos de $4$ Mo peut-on ranger dans une clé USB de $32$ Go ?",
        solution: "$32$ Go $= 32\\,000$ Mo, et $32\\,000 \\div 4 = 8\\,000$ : on peut ranger $8\\,000$ photos."
      }
    },
    {
      titre: "Le binaire et les adresses IP",
      seance: 2,
      figure: ["si-cours-binaire", "si-cours-ip"],
      video: { titre: "Vidéo (Les Bons Profs) : le codage binaire", youtube: "https://youtu.be/-Abei7BRWgo" },
      texte:
        "En **binaire**, chaque position d'un octet a un **poids** : de gauche à droite $128$, $64$, $32$, $16$, $8$, $4$, $2$, $1$. Pour lire un octet, on additionne les poids des positions où il y a un $1$ : `01011010` vaut $64 + 16 + 8 + 2 = 90$. Un octet va de `00000000` ($0$) à `11111111` ($255$) : $2^8 = 256$ valeurs. Avec $n$ bits, on écrit $2^n$ valeurs.\n\n" +
        "Sur Internet, chaque appareil connecté a une **adresse IP**. En **IPv4**, c'est un nombre de $32$ bits, écrit comme $4$ octets séparés par des points, par exemple `192.168.1.20`. Chaque nombre est donc compris entre $0$ et $255$. Il y a $2^{32}$, soit environ $4{,}3$ milliards d'adresses IPv4 : ce n'est plus assez, d'où **IPv6** (adresses de $128$ bits, écrites en hexadécimal, comme `2001:db8::1`).\n\n" +
        "Les adresses IP sont **hiérarchiques**, comme une adresse postale : le début désigne le **réseau**, la fin la **machine** dans ce réseau. Le **masque de sous-réseau** dit où est la coupure : avec le masque `255.255.255.0`, les trois premiers nombres désignent le réseau et le dernier la machine. Deux appareils sont sur le même réseau local quand leurs parties réseau sont égales.\n\n" +
        "Les adresses qui commencent par `192.168.` ou `10.` sont **privées** : elles servent dans les réseaux locaux. Vue d'Internet, toute la maison n'a souvent qu'une seule adresse **publique**, celle de la box, qui fait le relais pour tous les appareils.",
      exemple: {
        enonce: "Avec le masque `255.255.255.0`, les machines `192.168.1.20` et `192.168.2.20` sont-elles sur le même réseau ?",
        solution: "Non : leurs parties réseau sont `192.168.1` et `192.168.2`, différentes. Pour se parler, elles doivent passer par un routeur."
      }
    },
    {
      titre: "Adresses symboliques et serveurs DNS",
      seance: 2,
      figure: "si-cours-dns",
      video: { titre: "Vidéo (Les Bons Profs) : l'annuaire DNS, l'adresse symbolique", youtube: "https://youtu.be/KBBQThjupB0" },
      texte:
        "Les humains retiennent mal les nombres : on utilise des **adresses symboliques**, les **noms de domaine**, comme `www.wikipedia.org` ou `www.ac-mayotte.fr`. Le **DNS** (Domain Name System) est l'**annuaire** d'Internet : il traduit un nom de domaine en adresse IP (et inversement).\n\n" +
        "Un nom de domaine se lit **de droite à gauche**, du plus général au plus précis : dans `www.ac-mayotte.fr`, `.fr` est le **domaine de premier niveau** (la France ; `.yt` est celui de Mayotte, `.org`, `.com`…), `ac-mayotte` le domaine choisi par son propriétaire, et `www` le nom d'un serveur.\n\n" +
        "Le DNS n'est pas un seul ordinateur : c'est un très grand nombre de **serveurs DNS** répartis dans le monde, organisés en arbre et mis à jour en permanence. Quand tu tapes un nom, ton appareil demande à un **résolveur** (souvent celui de la box ou de l'opérateur). S'il ne connaît pas la réponse, il interroge un **serveur racine**, qui l'envoie vers le serveur du domaine de premier niveau, qui l'envoie vers le serveur du domaine. Les réponses sont gardées un moment en mémoire (en **cache**) pour aller plus vite la fois suivante.\n\n" +
        "Sur un ordinateur, la commande `nslookup www.wikipedia.org` affiche l'adresse IP du site. La commande `ping` suivie d'un nom montre aussi l'adresse IP, et le temps d'aller-retour des paquets.",
      exemple: {
        enonce: "La connexion fonctionne, mais aucun site ne s'ouvre quand on tape son nom ; en tapant directement une adresse IP, la page s'affiche. Que se passe-t-il ?",
        solution: "Le réseau marche, mais le **DNS** ne répond pas : l'appareil ne sait plus traduire les noms en adresses IP. Il faut changer de serveur DNS ou attendre qu'il soit réparé."
      }
    },
    {
      titre: "Les paquets",
      seance: 3,
      figure: "si-cours-paquet",
      video: { titre: "Vidéo (Les Bons Profs) : la transmission de données par paquets", youtube: "https://youtu.be/CXz-RWC0OqI" },
      texte:
        "Sur Internet, un fichier ou un message n'est pas envoyé d'un seul bloc : il est **découpé en paquets** de taille limitée (environ $1\\,500$ octets au plus). Chaque paquet contient :\n\n" +
        "- un **en-tête** avec les informations de transport : adresse IP de l'**émetteur**, adresse IP du **destinataire**, numéro du paquet, durée de vie (TTL)… ;\n" +
        "- un morceau des **données**.\n\n" +
        "Les paquets ont le même format quel que soit leur contenu : texte, image, son ou vidéo. C'est ce qui rend Internet si universel.\n\n" +
        "Pourquoi découper ? Une ligne n'est jamais bloquée longtemps par un seul gros fichier : les paquets de plusieurs échanges se partagent les mêmes câbles, à tour de rôle. Si un paquet est perdu, on ne renvoie que lui, pas tout le fichier. Et les paquets d'un même message peuvent passer par des **chemins différents**, donc arriver dans le désordre.",
      exemple: {
        enonce: "Un fichier de $7\\,200$ octets est envoyé en paquets qui transportent au plus $1\\,500$ octets de données. Combien faut-il de paquets ?",
        solution: "$7\\,200 \\div 1\\,500 = 4{,}8$ : $4$ paquets pleins ne suffisent pas, il en faut un cinquième pour le reste. Il faut $5$ paquets."
      }
    },
    {
      titre: "TCP et IP : deux protocoles, deux rôles",
      seance: 3,
      figure: "si-cours-tcp",
      video: { titre: "Vidéo (Les Bons Profs) : le protocole TCP-IP", youtube: "https://youtu.be/DI3xmtAKZJA" },
      texte:
        "Un **protocole** est un ensemble de règles que deux machines suivent pour communiquer. Internet repose sur deux protocoles complémentaires :\n\n" +
        "- **IP** s'occupe des **adresses** et de l'**acheminement** : il fait avancer chaque paquet vers son destinataire. Mais il ne garantit rien : un paquet peut se perdre ou arriver après un autre parti plus tard.\n" +
        "- **TCP** s'occupe de la **fiabilité**. Au départ, il découpe le message en paquets numérotés. À l'arrivée, il renvoie un **accusé de réception**, remet les paquets **dans l'ordre** et **redemande** ceux qui manquent. Il ralentit aussi les envois quand le réseau est encombré.\n\n" +
        "Grâce à TCP, tout paquet finit par arriver, sauf panne matérielle durable. Mais **ni IP ni TCP ne garantissent le délai** : un paquet redemandé arrive en retard. C'est gênant pour le son et la vidéo en direct ou la visioconférence : on peut perdre une image, mais pas le fil du temps. Ces applications utilisent souvent un autre protocole, plus rapide mais sans renvoi (UDP), et acceptent quelques pertes.\n\n" +
        "D'autres protocoles s'appuient sur TCP/IP : **HTTP** et **HTTPS** pour le Web, **NTP** (Network Time Protocol) qui met à l'heure tous les appareils connectés à quelques millisecondes près, ou ceux du courrier électronique.",
      exemple: {
        enonce: "Pendant un appel vidéo, l'image se fige un instant puis repart. Pourquoi, alors que TCP garantit que les données arrivent ?",
        solution: "TCP garantit que les données **arrivent**, pas **quand** elles arrivent. Des paquets en retard (réseau encombré, renvois) font geler l'image : il n'y a pas de garantie temporelle."
      }
    },
    {
      titre: "Le routage",
      seance: 4,
      figure: ["si-cours-routage", "si-cours-table"],
      video: { titre: "Vidéo (Les Bons Profs) : le routage", youtube: "https://youtu.be/c-lGdqsktOE" },
      texte:
        "Le principal algorithme d'Internet est le **routage** : faire aller chaque paquet de son émetteur à son destinataire. Ce travail est fait par des machines spécialisées, les **routeurs**.\n\n" +
        "Un routeur ne connaît pas tout Internet. Il échange en permanence avec ses **voisins** pour construire sa **table de routage**, une carte locale : pour chaque destination, à quel voisin envoyer le paquet (souvent par le chemin le plus court ou le plus rapide). Chaque paquet traverse ainsi une série de routeurs, **de proche en proche**.\n\n" +
        "Quand un routeur est ajouté au réseau, ou quand un voisin disparaît, les tables s'ajustent automatiquement. Il n'y a besoin d'aucune carte globale : c'est ce qui permet le routage à l'échelle de la planète.\n\n" +
        "La commande `tracert` (Windows) ou `traceroute` (Linux, Mac) affiche la liste des routeurs traversés jusqu'à un site, avec le temps de réponse de chacun : on en compte souvent une dizaine ou plus, et le temps augmente nettement quand les paquets traversent un océan.",
      exemple: {
        enonce: "Sur le schéma, combien de liaisons au minimum un paquet emprunte-t-il pour aller de A à F ?",
        solution: "Par exemple A → B → D → F (ou A → C → E → F) : $3$ liaisons. Il n'existe pas de chemin plus court. C'est ce qu'indique la table de routage de A : pour F, envoyer à B (ou à C)."
      }
    },
    {
      titre: "Les limites du routage",
      seance: 4,
      figure: "si-cours-routage-panne",
      texte:
        "Pendant le routage, un paquet peut ne pas arriver, pour deux raisons :\n\n" +
        "- une **panne** d'une ligne ou d'un routeur : les voisins s'en aperçoivent et font passer les paquets suivants par un autre chemin, s'il en existe un ;\n" +
        "- sa **destruction** volontaire. Chaque paquet contient un nombre maximal de routeurs à traverser, la **durée de vie** ou **TTL** (Time To Live) : chaque routeur retire $1$, et le paquet est détruit quand on arrive à $0$. Ainsi, un paquet égaré ne tourne pas en rond indéfiniment et n'encombre pas le réseau.\n\n" +
        "Un routeur surchargé peut aussi jeter des paquets, comme une file d'attente qui déborde. Dans tous les cas, c'est **TCP** qui s'en aperçoit et redemande les paquets manquants.\n\n" +
        "Ce fonctionnement a une faiblesse : une **attaque par déni de service** (DDoS) envoie un nombre énorme de messages vers un même site, depuis des milliers d'appareils piratés, pour le saturer : il ne peut plus répondre aux vrais visiteurs.",
      exemple: {
        enonce: "Sur le schéma, le routeur D tombe en panne. Combien de liaisons faut-il maintenant au minimum de A à F ?",
        solution: "Le chemin A → C → E → F ne passe pas par D : il faut toujours $3$ liaisons. Avoir plusieurs chemins rend le réseau **robuste**."
      }
    },
    {
      titre: "Internet ne dépend pas du réseau physique",
      seance: 4,
      figure: "si-cours-debits",
      video: { titre: "Vidéo (MOOC SNT, Inria) : Internet, IP un protocole universel ?", youtube: "https://youtu.be/aX3z3JoVEdE" },
      texte:
        "Les protocoles d'Internet sont des **logiciels**, installés dans chaque appareil connecté. Ils peuvent donc fonctionner sur n'importe quel réseau physique : câbles en cuivre (ADSL, Ethernet), **fibre optique**, réseaux mobiles (3G, 4G, 5G), **Wi-Fi**, **Bluetooth**, satellite… Un serveur DNS ou un routeur n'est lui-même qu'un ordinateur connecté.\n\n" +
        "Ces réseaux se distinguent par leur support (**filaire** ou **sans fil**), leur **débit** (quantité de données par seconde) et leur âge : le modem sur ligne téléphonique et le Minitel sont **obsolètes**, l'ADSL est peu à peu remplacé par la fibre.\n\n" +
        "Le **temps de téléchargement** se calcule ainsi : temps $=$ taille $\\div$ débit, avec les deux dans la même unité. Un fichier de $50$ Mo, soit $400$ Mbit, demande $400 \\div 40 = 10$ s avec un débit de $40$ Mbit/s.\n\n" +
        "Des mécanismes complexes assurent la **continuité** de la connexion : un téléphone passe du Wi-Fi à la 4G, ou d'une antenne à l'autre en voiture, sans couper la communication.",
      exemple: {
        enonce: "Combien de temps faut-il pour télécharger une vidéo de $1$ Go avec une fibre à $500$ Mbit/s ? Et en 4G à $40$ Mbit/s ?",
        solution: "$1$ Go $= 1\\,000$ Mo $= 8\\,000$ Mbit. Fibre : $8\\,000 \\div 500 = 16$ s. 4G : $8\\,000 \\div 40 = 200$ s, soit $3$ min $20$ s."
      }
    },
    {
      titre: "Client-serveur et réseaux pair-à-pair",
      seance: 5,
      figure: ["si-cours-client-serveur", "si-cours-p2p"],
      video: { titre: "Vidéo (Les Bons Profs) : les réseaux pair à pair", youtube: "https://youtu.be/kSrhUqRB-1Q" },
      texte:
        "Le plus souvent, Internet fonctionne en **client-serveur** : ton appareil (le **client**) demande, et une machine puissante (le **serveur**) répond. Si des millions de clients demandent la même vidéo au même moment, le serveur doit être énorme.\n\n" +
        "Dans un réseau **pair-à-pair** (*peer-to-peer*, P2P), chaque ordinateur est à la fois **client et serveur** : il reçoit des morceaux d'un fichier depuis plusieurs autres « pairs » et en envoie lui-même. Plus il y a de participants, plus la diffusion est rapide, et il n'y a pas de serveur central qui pourrait tomber en panne.\n\n" +
        "**Usages légaux** : distribution de logiciels libres, mises à jour de jeux ou de systèmes, partage de fichiers personnels, certaines diffusions vidéo. **Usages illicites** : partager des films, musiques ou jeux protégés par le droit d'auteur sans l'autorisation des ayants droit. Ce n'est pas la technique qui est interdite, mais ce qu'on en fait ; en France, l'Arcom peut avertir les abonnés dont la connexion sert à de tels partages.",
      exemple: {
        enonce: "Pourquoi une mise à jour de jeu distribuée en pair-à-pair arrive-t-elle plus vite le jour de sa sortie ?",
        solution: "Chaque joueur qui a déjà reçu des morceaux les renvoie aux autres : plus il y a de joueurs, plus il y a d'« émetteurs ». En client-serveur, au contraire, tout le monde attend le même serveur, qui sature."
      }
    },
    {
      titre: "Internet et la société",
      seance: 5,
      video: { titre: "Vidéo (Novelclass) : Internet, cours de SNT Seconde", youtube: "https://youtu.be/g7jpjmnMM3U" },
      texte:
        "Internet a fait disparaître beaucoup des moyens de communication précédents : le télégramme, le télex, une grande partie du courrier postal, et bientôt le téléphone fixe classique, remplacé par la **voix sur IP** (VoIP).\n\n" +
        "La **neutralité du Net**, présente dès l'origine, veut que les routeurs transmettent les paquets **sans tenir compte de leur contenu** : un paquet de vidéo, de jeu ou de texte, venant d'un petit site ou d'une grande entreprise, est traité de la même façon. En Europe, elle est protégée par la loi depuis 2015. Elle est pourtant régulièrement remise en cause par des acteurs qui voudraient faire payer un accès plus rapide.\n\n" +
        "Internet a aussi ses problèmes : pas de garantie de délai, attaques par déni de service, et un impact environnemental (centres de données, réseaux, et surtout fabrication des appareils). Regarder une vidéo en définition plus faible, garder son téléphone plus longtemps : ce sont des gestes qui comptent."
    }
  ],

  videos: [
    { type: "Exercices", titre: "Novelclass : les protocoles TCP et IP, exercices corrigés", youtube: "https://youtu.be/mIrXTlLuQ60" },
    { type: "Cours", titre: "MOOC SNT (Inria) : Internet, un protocole universel ?", youtube: "https://youtu.be/s18KtOLpCg4" }
  ],
  videosNote: "Pour réviser tout le chapitre, ou revoir une notion expliquée autrement.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "si-histoire", titre: "Repères historiques", etape: "Séance 1 · Internet, c'est quoi ?", nb: 5 },
    { type: "si-unites", titre: "Ordres de grandeur : octets, Mo, Go…", etape: "Séance 1 · Internet, c'est quoi ?", nb: 6 },
    { type: "si-binaire", titre: "Binaire", etape: "Séance 2 · Adresses IP et DNS", nb: 6 },
    { type: "si-ip-valide", titre: "Adresses IP valides", etape: "Séance 2 · Adresses IP et DNS", nb: 5 },
    { type: "si-ip-reseau", titre: "Réseau et machine", etape: "Séance 2 · Adresses IP et DNS", nb: 5 },
    { type: "si-dns", titre: "Annuaire DNS", etape: "Séance 2 · Adresses IP et DNS", nb: 5 },
    { type: "si-paquets", titre: "Paquets", etape: "Séance 3 · Paquets, TCP et IP", nb: 5 },
    { type: "si-reordonner", titre: "Remettre en ordre", etape: "Séance 3 · Paquets, TCP et IP", nb: 5 },
    { type: "si-protocoles", titre: "Rôle des protocoles", etape: "Séance 3 · Paquets, TCP et IP", nb: 6 },
    { type: "si-routage", titre: "Routage", etape: "Séance 4 · Routage et réseaux physiques", nb: 5 },
    { type: "si-ttl", titre: "Durée de vie (TTL)", etape: "Séance 4 · Routage et réseaux physiques", nb: 5 },
    { type: "si-reseaux", titre: "Réseaux physiques", etape: "Séance 4 · Routage et réseaux physiques", nb: 5 },
    { type: "si-debit", titre: "Débits et temps", etape: "Séance 4 · Routage et réseaux physiques", nb: 5 },
    { type: "si-vrai-faux", titre: "Vrai ou faux ?", etape: "Séance 5 · Bilan", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Internet, c'est :", choix: ["un réseau mondial de réseaux", "l'ensemble des pages Web", "un logiciel installé sur l'ordinateur", "un grand ordinateur aux États-Unis"], bonne: 0, explication: "Internet relie des millions de réseaux grâce aux protocoles TCP/IP ; le Web n'est qu'une de ses applications." },
    { question: "Lequel de ces services n'est **pas** le Web ?", choix: ["une messagerie instantanée sur son application", "une page Wikipédia", "un site de recettes ouvert dans le navigateur", "un moteur de recherche dans le navigateur"], bonne: 0, explication: "La messagerie utilise Internet, mais pas forcément le Web (pages reliées par des liens et transportées par HTTP)." },
    { question: "Internet est né en :", choix: ["1983", "1969", "1989", "1995"], bonne: 0, explication: "Le 1er janvier 1983, ArpaNet adopte TCP/IP. 1969 : premiers échanges d'ArpaNet ; 1989 : invention du Web." },
    { question: "Le réseau français Cyclades (1971) a apporté l'idée :", choix: ["d'envoyer les données en paquets indépendants", "des pages Web reliées par des liens", "des noms de domaine", "du Wi-Fi"], bonne: 0, explication: "Louis Pouzin y invente les datagrammes, des paquets acheminés indépendamment, repris par Internet." },
    { question: "Un octet est formé de :", choix: ["$8$ bits", "$10$ bits", "$1\\,000$ bits", "$2$ bits"], bonne: 0, explication: "Un octet = $8$ bits, assez pour $2^8 = 256$ valeurs." },
    { question: "$3$ Go font :", choix: ["$3\\,000$ Mo", "$300$ Mo", "$30$ Mo", "$3\\,000\\,000$ Mo"], bonne: 0, explication: "$1$ Go $= 1\\,000$ Mo." },
    { question: "Une connexion à $80$ Mbit/s transmet au mieux, par seconde :", choix: ["$10$ Mo", "$80$ Mo", "$640$ Mo", "$8$ Mo"], bonne: 0, explication: "$80$ Mbit $\\div 8 = 10$ Mo : $8$ bits font un octet." },
    { question: "L'octet `00010011` vaut en base $10$ :", choix: ["$19$", "$13$", "$11$", "$200$"], bonne: 0, explication: "$16 + 2 + 1 = 19$." },
    { question: "Laquelle de ces adresses IPv4 est correcte ?", choix: ["`172.16.254.3`", "`172.16.256.3`", "`172.16.3`", "`172.16.4.3.1`"], bonne: 0, explication: "4 nombres, chacun entre $0$ et $255$." },
    { question: "Combien existe-t-il d'adresses IPv4 différentes, environ ?", choix: ["$4{,}3$ milliards", "$256$", "$65\\,536$", "une infinité"], bonne: 0, explication: "$32$ bits, donc $2^{32} \\approx 4{,}3$ milliards : pas assez pour tous les appareils, d'où IPv6." },
    { question: "Avec le masque `255.255.255.0`, quelle machine est sur le même réseau que `192.168.1.20` ?", choix: ["`192.168.1.73`", "`192.168.2.20`", "`192.169.1.20`", "`10.168.1.20`"], bonne: 0, explication: "Les trois premiers nombres (partie réseau) doivent être `192.168.1`." },
    { question: "Le DNS sert à :", choix: ["traduire un nom de domaine en adresse IP", "chiffrer les échanges", "découper les messages en paquets", "choisir le chemin des paquets"], bonne: 0, explication: "C'est l'annuaire d'Internet." },
    { question: "Dans `www.ac-mayotte.fr`, le domaine de premier niveau est :", choix: ["`.fr`", "`www`", "`ac-mayotte`", "`mayotte.fr`"], bonne: 0, explication: "Le nom se lit de droite à gauche : `.fr` est le plus général." },
    { question: "Le domaine de premier niveau de Mayotte est :", choix: ["`.yt`", "`.my`", "`.ma`", "`.mt`"], bonne: 0, explication: "`.yt` est le domaine de Mayotte ; `.my` est celui de la Malaisie, `.ma` du Maroc, `.mt` de Malte." },
    { question: "Le service DNS est assuré par :", choix: ["un très grand nombre de serveurs répartis dans le monde", "un seul serveur central", "ta box uniquement", "les routeurs"], bonne: 0, explication: "Le DNS est réparti et organisé en arbre (racine, domaines de premier niveau, domaines)." },
    { question: "Pour obtenir l'adresse IP d'un site sur un ordinateur, on peut taper :", choix: ["`nslookup` suivi du nom du site", "`ipconfig` suivi du nom du site", "`copy` suivi du nom du site", "le nom du site dans un traitement de texte"], bonne: 0, explication: "`nslookup` interroge le DNS ; `ipconfig` affiche l'adresse de son propre appareil." },
    { question: "Un paquet contient :", choix: ["un en-tête (adresses, numéro…) et un morceau des données", "seulement les données", "seulement l'adresse du destinataire", "le fichier entier"], bonne: 0, explication: "L'en-tête permet d'acheminer et de reconstituer, les données sont un morceau du fichier." },
    { question: "Les paquets d'un même message :", choix: ["peuvent arriver dans le désordre", "arrivent toujours dans l'ordre", "passent tous par le même chemin", "ont tous un contenu différent selon le type de fichier"], bonne: 0, explication: "Ils peuvent prendre des chemins différents ; TCP les remet dans l'ordre." },
    { question: "Quel protocole remet les paquets dans l'ordre et redemande ceux qui manquent ?", choix: ["TCP", "IP", "DNS", "HTTP"], bonne: 0, explication: "TCP fiabilise la communication." },
    { question: "Quel protocole s'occupe des adresses et de l'acheminement des paquets ?", choix: ["IP", "TCP", "NTP", "HTTPS"], bonne: 0, explication: "IP : Internet Protocol." },
    { question: "TCP garantit :", choix: ["que les données arrivent complètes, sauf panne matérielle", "que les données arrivent en moins d'une seconde", "que personne ne lit les données", "que les paquets prennent le chemin le plus court"], bonne: 0, explication: "Fiabilité oui, délai non, confidentialité non (c'est le rôle de HTTPS et du chiffrement)." },
    { question: "Pourquoi une visioconférence peut-elle saccader ?", choix: ["Internet ne garantit pas le délai d'arrivée des paquets", "TCP perd volontairement des paquets", "le DNS est trop lent", "la vidéo n'est pas découpée en paquets"], bonne: 0, explication: "Les paquets en retard figent l'image : pas de garantie temporelle." },
    { question: "Le protocole NTP sert à :", choix: ["mettre les appareils à l'heure", "nommer les sites", "chiffrer les pages", "compresser les vidéos"], bonne: 0, explication: "Network Time Protocol." },
    { question: "Un routeur :", choix: ["transmet chaque paquet à un routeur voisin selon sa table", "connaît la carte complète d'Internet", "stocke les pages Web", "traduit les noms en adresses IP"], bonne: 0, explication: "Il ne connaît que son voisinage : routage de proche en proche." },
    { question: "Si un routeur tombe en panne :", choix: ["les paquets suivants passent par un autre chemin, s'il en existe un", "tout Internet s'arrête", "les paquets attendent sa réparation", "les paquets sont envoyés à tous les routeurs"], bonne: 0, explication: "Les voisins mettent à jour leurs tables." },
    { question: "Le TTL d'un paquet :", choix: ["diminue de $1$ à chaque routeur ; à $0$, le paquet est détruit", "donne l'heure d'envoi", "est l'adresse du destinataire", "augmente à chaque routeur"], bonne: 0, explication: "Time To Live : durée de vie, en nombre de routeurs." },
    { question: "Une attaque par déni de service consiste à :", choix: ["saturer un site en lui envoyant énormément de messages", "voler un mot de passe", "changer l'adresse IP d'un site", "couper un câble sous-marin"], bonne: 0, explication: "Le site ne peut plus répondre aux vrais visiteurs." },
    { question: "Lequel de ces réseaux est sans fil ?", choix: ["la 4G", "la fibre optique", "l'ADSL", "le câble Ethernet"], bonne: 0, explication: "La 4G passe par des ondes radio." },
    { question: "Lequel de ces réseaux est obsolète ?", choix: ["le modem sur ligne téléphonique (56 kbit/s)", "la fibre optique", "la 5G", "le Wi-Fi"], bonne: 0, explication: "Il a été remplacé par l'ADSL, puis la fibre et les réseaux mobiles." },
    { question: "Avec un débit de $20$ Mbit/s, un fichier de $10$ Mo se télécharge en :", choix: ["$4$ s", "$2$ s", "$0{,}5$ s", "$200$ s"], bonne: 0, explication: "$10$ Mo $= 80$ Mbit et $80 \\div 20 = 4$ s." },
    { question: "Internet peut fonctionner sur la 4G comme sur la fibre parce que :", choix: ["ses protocoles sont des logiciels indépendants du support physique", "la 4G passe par la fibre", "tous les réseaux ont le même débit", "les routeurs convertissent les ondes en lumière"], bonne: 0, explication: "IP est implanté dans chaque appareil connecté, quel que soit le réseau physique." },
    { question: "Dans un réseau pair-à-pair :", choix: ["chaque ordinateur reçoit et envoie des morceaux de fichiers", "un seul serveur envoie tout", "seuls les routeurs échangent", "les fichiers sont interdits"], bonne: 0, explication: "Chaque pair est à la fois client et serveur." },
    { question: "Le pair-à-pair est illicite quand :", choix: ["on partage des œuvres protégées sans autorisation", "on distribue un logiciel libre", "on télécharge une mise à jour de jeu", "on l'utilise sur la 4G"], bonne: 0, explication: "C'est l'usage qui peut être illégal, pas la technique." },
    { question: "La neutralité du Net signifie que :", choix: ["les paquets sont traités de la même façon, quel que soit leur contenu", "Internet n'appartient à aucun pays", "les sites ne peuvent pas publier d'opinions", "les opérateurs choisissent les sites accessibles"], bonne: 0, explication: "Un opérateur ne doit pas favoriser ou ralentir certains contenus." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Lire et convertir un octet",
      figure: "si-cours-binaire",
      etapes: [
        "Écrire les poids sous les $8$ positions : $128$, $64$, $32$, $16$, $8$, $4$, $2$, $1$.",
        "Binaire → décimal : additionner les poids des positions où il y a un $1$.",
        "Décimal → binaire : retirer le plus grand poids possible, mettre un $1$ dessous, recommencer avec le reste ; mettre des $0$ ailleurs.",
        "Vérifier : un octet est toujours compris entre $0$ et $255$."
      ],
      exemple: "$90 = 64 + 16 + 8 + 2$, donc $90$ s'écrit `01011010` ; et `01011010` vaut bien $64 + 16 + 8 + 2 = 90$."
    },
    {
      titre: "Savoir si deux machines sont sur le même réseau",
      figure: "si-cours-ip",
      etapes: [
        "Lire le masque : les nombres $255$ repèrent la partie réseau, les $0$ la partie machine.",
        "Écrire la partie réseau de chaque adresse.",
        "Si les parties réseau sont égales, les machines sont sur le même réseau local ; sinon, il faut passer par un routeur.",
        "L'adresse du réseau garde la partie réseau et met des $0$ à la place de la partie machine."
      ],
      exemple: "Masque `255.255.255.0` : `10.0.5.12` et `10.0.5.200` ont la même partie réseau `10.0.5` ; le réseau est `10.0.5.0`."
    },
    {
      titre: "Trouver l'adresse IP d'un site (et l'inverse)",
      figure: "si-cours-dns",
      etapes: [
        "Ouvrir l'invite de commandes (Windows) ou le terminal (Linux, Mac).",
        "Taper `nslookup` suivi du nom du site, par exemple `nslookup www.wikipedia.org`.",
        "Lire la ligne « Address » (ou « Adresse ») de la réponse : c'est l'adresse IP.",
        "Pour l'inverse, taper `nslookup` suivi d'une adresse IP : le DNS renvoie le nom associé, s'il existe."
      ],
      exemple: "`ping www.wikipedia.org` affiche aussi l'adresse IP du site, et le temps d'aller-retour des paquets en millisecondes."
    },
    {
      titre: "Calculer un nombre de paquets ou un temps de téléchargement",
      etapes: [
        "Mettre les tailles dans la même unité (octets, ko, Mo…) ; passer des octets aux bits en multipliant par $8$.",
        "Nombre de paquets : taille du message $\\div$ taille des données d'un paquet, arrondi à l'entier **supérieur**.",
        "Temps : quantité de données (en bits) $\\div$ débit (en bits par seconde).",
        "Convertir le résultat si besoin ($60$ s $= 1$ min) et l'arrondir comme demandé."
      ],
      exemple: "$25$ Mo à $10$ Mbit/s : $25 \\times 8 = 200$ Mbit, et $200 \\div 10 = 20$ s."
    },
    {
      titre: "Trouver un plus court chemin entre deux routeurs",
      figure: "si-cours-routage",
      etapes: [
        "Partir du routeur de départ et marquer $1$ sur tous ses voisins.",
        "Marquer $2$ sur les voisins de ces voisins qui ne sont pas encore marqués, puis $3$, etc.",
        "Le numéro du routeur d'arrivée est le nombre minimal de liaisons.",
        "Pour écrire le chemin, remonter depuis l'arrivée en passant chaque fois par un voisin de numéro inférieur de $1$. En cas de panne, effacer le routeur et recommencer."
      ],
      exemple: "De A : B et C reçoivent $1$, D et E reçoivent $2$, F reçoit $3$ : il faut $3$ liaisons, par exemple A → B → D → F."
    }
  ],
  erreurs: [
    "Confondre Internet (le réseau) et le Web (une application d'Internet).",
    "Confondre bits et octets : un débit de $40$ Mbit/s ne télécharge pas $40$ Mo par seconde, mais $5$.",
    "Croire qu'un nombre d'une adresse IPv4 peut dépasser $255$ : chacun tient sur un octet.",
    "Lire un nom de domaine de gauche à droite : le plus général (`.fr`, `.yt`) est à droite.",
    "Croire que le DNS est un seul ordinateur : c'est un très grand nombre de serveurs organisés en arbre.",
    "Attribuer à IP la fiabilité : c'est TCP qui numérote, accuse réception et redemande les paquets perdus.",
    "Croire que TCP garantit la vitesse : il garantit l'arrivée, pas le délai.",
    "Croire qu'un routeur connaît tout le chemin : il ne connaît que le prochain routeur.",
    "Oublier le dernier paquet incomplet : $4{,}2$ paquets, c'est $5$ paquets.",
    "Croire que le pair-à-pair est illégal : ce sont certains usages qui le sont."
  ]
};
