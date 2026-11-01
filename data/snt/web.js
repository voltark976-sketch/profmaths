/*
  CHAPITRE : SNT (Seconde) — Chapitre 3 : Le Web
  --------------------------------------------
  Programme de SNT de 2019 (arrêté du 17-1-2019, BO spécial n° 1 du 22 janvier 2019), thème « Le Web » :
  repères historiques, notions juridiques, hypertexte, HTML et CSS, URL, requête HTTP, modèle client/serveur,
  moteurs de recherche, paramètres de sécurité d'un navigateur.
  Écriture : formules et nombres entre $...$ (antislash doublé), code en ligne entre accents graves `...`, blocs ```html.
  seances : déroulé du chapitre (suite de l'alternance du chapitre 2 : 2 h, 1 h, 2 h, 1 h, 2 h).
  Vidéos : Les Bons Profs, MOOC SNT (Inria), Novelclass, Cookie connecté, Radio-Canada.
  Générateurs : préfixe sw- dans assets/exercices-snt.js ; figures « sw-cours-… ».
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["snt-web"] = {
  niveau: "SNT Seconde",
  numero: 3,
  titre: "Le Web",
  accroche: "Des milliards de pages reliées par des liens. Comment une page est-elle écrite, demandée, envoyée, trouvée par un moteur de recherche ? Et comment naviguer sans se faire piéger ?",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Le cours complet à imprimer", url: "assets/pdf/snt-web-cours.pdf" },
    { titre: "Exercices corrigés à imprimer", url: "assets/pdf/snt-web-exercices.pdf" }
  ],

  /* ---------- 0. DÉROULÉ EN SÉANCES ---------- */
  seancesNote: "Cinq séances, une par semaine, dans la suite de l'alternance du chapitre 2 (Internet) : 2 h, 1 h, 2 h, 1 h, 2 h (8 h en tout). Chaque partie du cours porte le numéro de la séance où on la travaille. Une séance de 2 h est faite de deux parties d'une heure.",
  seances: [
    {
      duree: "2 h", titre: "Le Web : histoire, hypertexte et droit d'auteur",
      objectifs: ["Connaître les étapes du développement du Web.", "Maîtriser les renvois d'un texte à d'autres contenus (hypertexte).", "Connaître quelques notions juridiques : droit d'auteur, licence, droit d'usage, valeur d'un bien."],
      deroule: ["**Partie A (1 h)** · Question de départ : « Internet et le Web, est-ce la même chose ? » Parties 1 à 3 du cours avec les vidéos ; on complète la frise. Activité : à partir d'un article de Wikipédia, suivre trois liens et dessiner le petit graphe des pages visitées.", "Exercices : série « Repères historiques ».", "**Partie B (1 h)** · Partie 4 du cours. Activité : chercher une image pour un exposé avec le filtre « licences » d'un moteur de recherche ou sur Wikimedia Commons, puis écrire correctement le crédit (auteur, licence, lien).", "Exercices : série « Licences et droit d'auteur »."],
      maison: "Série « Licences et droit d'auteur » jusqu'à 3 étoiles."
    },
    {
      duree: "1 h", titre: "Les URL et le protocole HTTP",
      objectifs: ["Décomposer l'URL d'une page.", "Reconnaître une page sécurisée et un lien piégé.", "Décomposer une requête HTTP et identifier les paramètres passés."],
      deroule: ["**15 min** · Partie 5 du cours : on décompose ensemble l'adresse d'une page du site du lycée et celle d'une recherche sur un moteur (on repère `?q=…`).", "**15 min** · Partie 6 : dans le navigateur de l'ordinateur, touche F12 › onglet « Réseau », puis on recharge une page : on lit les requêtes `GET`, les codes `200` ou `404`, les paramètres.", "**30 min** · Exercices : séries « Décomposer une URL », « Pages sécurisées et hameçonnage », « Requêtes HTTP »."],
      maison: "Fiche méthode « Décomposer une URL » et série « Pages sécurisées et hameçonnage »."
    },
    {
      duree: "2 h", titre: "Écrire une page : HTML et CSS",
      objectifs: ["Distinguer le contenu d'une page (HTML) et son style (CSS).", "Étudier et modifier une page HTML simple.", "Construire une page contenant des liens hypertextes."],
      deroule: ["**Partie A (1 h)** · Partie 7 du cours. Travail sur ordinateur, dans un éditeur en ligne (par exemple Capytale, avec l'ENT) ou dans le Bloc-notes : recopier le squelette de la fiche méthode, puis écrire une page de présentation (un titre, deux paragraphes, une liste, une image, un lien). Enregistrer en `.html` et ouvrir dans le navigateur.", "Exercices : séries « Balises HTML » et « Lire une page HTML ».", "**Partie B (1 h)** · Parties 8 et 9 : écrire une feuille de style `style.css`, la relier à la page avec `<link>`, changer couleurs, tailles et alignements ; ajouter un lien vers une deuxième page.", "Exercices : séries « Corriger du HTML » et « Le style CSS »."],
      maison: "Améliorer sa page ; série « Le style CSS »."
    },
    {
      duree: "1 h", titre: "Client-serveur et moteurs de recherche",
      objectifs: ["Inspecter le code d'une page et distinguer ce qui est exécuté par le client et par le serveur.", "Comprendre comment un moteur de recherche indexe et classe les pages.", "Mener une analyse critique des résultats d'un moteur de recherche."],
      deroule: ["**15 min** · Partie 10 : afficher le code source d'une page (Ctrl + U) ; repérer le HTML, le CSS, le JavaScript. Pourquoi ne voit-on jamais le PHP ?", "**20 min** · Parties 11 et 12. Activité débranchée : indexer à la main trois petits textes sur quelques mots, puis répondre à des requêtes ; calculer la popularité des pages d'un petit graphe.", "**10 min** · Même requête dans deux moteurs de recherche différents : les résultats sont-ils les mêmes ? Lesquels sont des publicités ?", "**15 min** · Exercices : séries « Client ou serveur ? », « Index d'un moteur » et « Popularité d'une page »."],
      maison: "Série « Index d'un moteur »."
    },
    {
      duree: "2 h", titre: "Sécurité, confidentialité et bilan",
      objectifs: ["Maîtriser les réglages les plus importants d'un navigateur : cookies, historique, sécurité.", "Sécuriser sa navigation et repérer les pièges (hameçonnage, fichiers douteux).", "Comprendre les enjeux de la publication d'informations."],
      deroule: ["**Partie A (1 h)** · Partie 13 du cours. Activité : dans les paramètres d'un navigateur (sur ordinateur ou sur le téléphone), trouver où l'on bloque les cookies tiers, où l'on efface l'historique, où l'on interdit JavaScript sur un site ; comparer deux navigateurs. Puis : refuser proprement un bandeau de cookies.", "Exercices : série « Vrai ou faux ? ».", "**Partie B (1 h)** · Partie 14 : débat « Tout ce que je publie à 15 ans peut-il me suivre à 30 ans ? » (droit à l'oubli, réputation en ligne, bulles d'informations).", "QCM du chapitre (il change à chaque essai) et bilan : carte mentale « Le Web » (URL, HTTP, HTML/CSS, client-serveur, moteurs, sécurité)."],
      maison: "Refaire le QCM jusqu'à au moins 10/12 et relire les erreurs fréquentes."
    }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Le Web, une application d'Internet",
      seance: 1,
      video: { titre: "Vidéo (MOOC SNT, Inria) : le Web, « site internet » ou « site web » ?", youtube: "https://youtu.be/GqD6AiaRo3U" },
      texte:
        "Le **Web** (la « toile ») est un système qui donne accès à des documents (pages, images, sons, vidéos) **reliés par des liens hypertextes** et accessibles sur Internet. On dit aussi *World Wide Web*, d'où le `www` de beaucoup d'adresses.\n\n" +
        "Le Web repose sur quatre briques :\n\n" +
        "- des pages écrites dans le langage **HTML**, mises en forme par le langage **CSS** ;\n" +
        "- une adresse unique pour chaque page, l'**URL** ;\n" +
        "- un protocole pour les demander et les transporter, **HTTP** (ou sa version sécurisée **HTTPS**) ;\n" +
        "- des programmes : le **navigateur** (Chrome, Firefox, Safari…) chez l'utilisateur, le **serveur Web** chez celui qui publie.\n\n" +
        "Ces formats sont normalisés par un consortium mondial, le **W3C** (World Wide Web Consortium) : c'est pour cela qu'une même page s'affiche sur tous les navigateurs et tous les appareils.\n\n" +
        "On dit souvent « site internet », mais il vaut mieux dire **site Web** : le Web n'est qu'une des applications d'Internet, à côté du courriel, des messageries ou des jeux en ligne."
    },
    {
      titre: "Repères historiques",
      seance: 1,
      figure: "sw-cours-frise",
      video: { titre: "Vidéo (Les Bons Profs) : repère historique, le Web", youtube: "https://youtu.be/l0z2QLV8guk" },
      texte:
        "- **1965** : Ted Nelson invente et programme le concept d'**hypertexte** : un texte où l'on peut cliquer pour aller vers un autre texte.\n" +
        "- **1989** : au **CERN**, près de Genève, **Tim Berners-Lee** propose le Web pour que les chercheurs partagent leurs documents ; il crée HTML, les URL, HTTP, le premier serveur et le premier navigateur. Le premier site est mis en ligne en 1991.\n" +
        "- **1993** : le CERN met le Web dans le **domaine public** (chacun peut l'utiliser gratuitement) ; le navigateur **Mosaic**, avec des images dans les pages, le rend populaire.\n" +
        "- **1994** : création du **W3C**, qui normalise le Web.\n" +
        "- **1995** : des technologies rendent les sites **interactifs** (JavaScript, exécuté dans le navigateur) et **dynamiques** (PHP, exécuté sur le serveur).\n" +
        "- **1998** : Google lance son moteur de recherche.\n" +
        "- **2001** : le **DOM** (Document Object Model) standardise la structure des pages.\n" +
        "- **2010** : des technologies permettent de développer des **applications pour mobiles**.\n\n" +
        "Aujourd'hui, le Web compte plus d'un milliard de sites, dont une petite partie seulement est active."
    },
    {
      titre: "L'hypertexte et le graphe du Web",
      seance: 1,
      figure: "sw-cours-hypertexte",
      video: { titre: "Vidéo (Les Bons Profs) : le fonctionnement du Web", youtube: "https://youtu.be/ZNyflFntnq4" },
      texte:
        "Un **hypertexte** est un texte augmenté de **liens** : un clic renvoie vers un autre texte, une image, un son, une vidéo. Au départ, un hypertexte restait dans la mémoire d'un seul ordinateur. Sur le Web, un lien peut renvoyer vers **n'importe quelle machine** d'Internet, grâce à l'URL de la page visée.\n\n" +
        "Un lien peut viser une autre page du même site, une page d'un autre site, un fichier à télécharger, ou un endroit précis de la même page (une **ancre**).\n\n" +
        "La toile d'araignée construite par les liens se représente par un **graphe** : chaque page est un sommet, chaque lien une flèche d'une page vers une autre. Ce graphe sert aux moteurs de recherche pour mesurer la popularité des pages (partie 12).",
      exemple: {
        enonce: "Sur le graphe, vers quelles pages peut-on aller directement depuis la page A ? Peut-on revenir à A depuis E ?",
        solution: "Depuis A, les flèches mènent à B et à C. Depuis E, on va à C, puis de C à A : oui, en deux clics (E → C → A)."
      }
    },
    {
      titre: "Droit d'auteur, licences et valeur d'un bien",
      seance: 1,
      figure: "sw-cours-licences",
      texte:
        "Sur le Web, tout le monde peut **publier**, mais aussi copier en un clic. Le droit encadre ces usages :\n\n" +
        "- Le **droit d'auteur** protège une œuvre (texte, photo, dessin, musique, vidéo, logiciel) **dès sa création**, sans aucune démarche. Une image trouvée sur le Web n'est donc **pas libre de droits** par défaut : pour la réutiliser, il faut l'accord de son auteur. Exception utile : la **citation** courte, avec le nom de l'auteur et la source.\n" +
        "- Une **licence** est l'autorisation que donne l'auteur, avec ses conditions : c'est un **droit d'usage**. Les licences **Creative Commons** (CC) combinent des conditions : BY (citer l'auteur), NC (pas d'usage commercial), ND (pas de modification), SA (partager les modifications sous la même licence). CC0 veut dire « aucune condition », comme le **domaine public** (en France, une œuvre y entre $70$ ans après la mort de son auteur).\n" +
        "- Les **logiciels libres** (Firefox, LibreOffice, VLC…) ont une licence qui permet de les utiliser, de les étudier, de les modifier et de les partager.\n\n" +
        "**Valeur d'un bien** : un bien numérique se copie presque sans coût, mais il a une valeur. Un service « gratuit » se paie souvent autrement : par la publicité et par les **données personnelles** de ses utilisateurs (« quand c'est gratuit, c'est toi le produit »).",
      exemple: {
        enonce: "Une photo est sous licence CC BY-NC. Peux-tu l'utiliser dans un exposé au lycée ? Sur l'affiche d'un concert payant ?",
        solution: "Exposé : **oui**, en citant l'auteur (BY), car ce n'est pas commercial. Affiche d'un concert payant : **non**, c'est un usage commercial (NC), sauf accord de l'auteur."
      }
    },
    {
      titre: "Les URL et les pages sécurisées",
      seance: 2,
      figure: "sw-cours-url",
      video: { titre: "Vidéo (Novelclass) : les URL, c'est quoi ?", youtube: "https://youtu.be/uEYvKmKHAC8" },
      texte:
        "Chaque ressource du Web a une adresse unique, l'**URL** (Uniform Resource Locator). Elle se décompose ainsi :\n\n" +
        "- le **protocole**, avant `://` : `http` ou `https` ;\n" +
        "- le **nom de domaine** du serveur, jusqu'au premier `/` : le DNS le traduit en adresse IP (chapitre 2) ;\n" +
        "- le **chemin** : les dossiers puis le **fichier** sur le serveur ;\n" +
        "- d'éventuels **paramètres** après `?`, sous la forme `nom=valeur`, séparés par `&` ;\n" +
        "- une éventuelle **ancre** après `#`, qui vise un endroit de la page.\n\n" +
        "**Pages sécurisées.** Avec **HTTPS**, les échanges entre le navigateur et le serveur sont **chiffrés** (illisibles pour qui les intercepte) et le serveur prouve son identité par un **certificat**. Le navigateur affiche alors un **cadenas**. Il faut HTTPS pour tout mot de passe, paiement ou donnée personnelle.\n\n" +
        "Mais HTTPS ne dit pas qu'un site est honnête : un faux site peut aussi avoir un cadenas. Le vrai nom de domaine est **juste avant le premier** `/` : `https://www.ameli.fr.compte-bloque.com/` mène chez `compte-bloque.com`, pas sur le site de l'Assurance maladie.",
      exemple: {
        enonce: "Dans `https://fr.wikipedia.org/wiki/Mayotte#Géographie`, donne le protocole, le nom de domaine, le chemin et l'ancre.",
        solution: "Protocole `https` (sécurisé) ; nom de domaine `fr.wikipedia.org` ; chemin `/wiki/Mayotte` ; ancre `#Géographie` (la page s'ouvre à la partie Géographie). Il n'y a pas de paramètre."
      }
    },
    {
      titre: "Les requêtes HTTP",
      seance: 2,
      figure: "sw-cours-http",
      video: { titre: "Vidéo (Novelclass) : le protocole HTTP", youtube: "https://youtu.be/orXiBAqlQJ8" },
      texte:
        "Quand tu cliques sur un lien, le navigateur envoie une **requête HTTP** au serveur. Elle commence par une ligne comme `GET /recherche.php?q=tortue&page=2 HTTP/1.1`, puis des **en-têtes** :\n\n" +
        "```http\nGET /recherche.php?q=tortue&page=2 HTTP/1.1\nHost: www.lagon-bleu.yt\nUser-Agent: Mozilla/5.0 (Linux; Android 14)\nAccept-Language: fr\n```\n\n" +
        "- la **méthode** : `GET` pour demander une ressource (ses paramètres sont dans l'adresse), `POST` pour envoyer des données, par exemple un formulaire (les paramètres sont alors après les en-têtes, invisibles dans l'adresse) ;\n" +
        "- la **ressource** demandée et les **paramètres** (`q` vaut `tortue`, `page` vaut `2`) ;\n" +
        "- l'en-tête `Host` : le serveur visé ; `User-Agent` : le navigateur et l'appareil ; `Accept-Language` : la langue préférée.\n\n" +
        "Le serveur répond par un **code de statut** puis le contenu : `200` (tout va bien), `301` (la page a déménagé), `403` (accès interdit), `404` (page introuvable), `500` (erreur du serveur). Une page demande souvent plusieurs requêtes : le HTML, puis la feuille de style, les images, les scripts…\n\n" +
        "Dans le navigateur d'un ordinateur, la touche **F12** puis l'onglet « Réseau » montrent toutes les requêtes d'une page.",
      exemple: {
        enonce: "Que révèle la requête ci-dessus sur l'internaute ?",
        solution: "Il cherche « tortue » (deuxième page de résultats), sur un téléphone Android, et préfère le français. Le serveur reçoit aussi son adresse IP. Une requête en dit plus qu'on ne le croit."
      }
    },
    {
      titre: "HTML : le contenu d'une page",
      seance: 3,
      figure: ["sw-cours-rendu", "sw-cours-dom"],
      video: { titre: "Vidéo (Les Bons Profs) : langages des pages Web", youtube: "https://youtu.be/YG8nsnoW61w" },
      texte:
        "Une page Web est un fichier texte écrit en **HTML** (HyperText Markup Language), un langage de **balises**. Une balise s'ouvre avec `<nom>` et se ferme le plus souvent avec `</nom>` ; ce qui est entre les deux est l'**élément**. Les balises s'emboîtent comme des boîtes.\n\n" +
        "```html\n<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <title>Les tortues marines</title>\n  </head>\n  <body>\n    <h1>Tortues du lagon</h1>\n    <p>Pour voir <a href=\"photos.html\">nos photos</a>.</p>\n    <ul>\n      <li>tortue verte</li>\n      <li>tortue luth</li>\n      <li>tortue imbriquée</li>\n    </ul>\n    <img src=\"tortue.jpg\" alt=\"Tortue verte\">\n  </body>\n</html>\n```\n\n" +
        "- `<head>` contient des informations **non affichées** : le titre de l'onglet `<title>`, l'encodage des caractères, le lien vers le style.\n" +
        "- `<body>` contient **ce qui s'affiche** : titres `<h1>` à `<h6>`, paragraphes `<p>`, listes `<ul>` ou `<ol>` et leurs éléments `<li>`, images `<img>`, liens `<a>`.\n" +
        "- Certaines balises ont des **attributs** : `href` donne la destination d'un lien, `src` le fichier d'une image, `alt` le texte qui remplace l'image (lu par les lecteurs d'écran des personnes aveugles).\n\n" +
        "Le navigateur lit ce code et construit un arbre, le **DOM** : c'est lui qu'il affiche, et que JavaScript peut modifier."
    },
    {
      titre: "CSS : la présentation",
      seance: 3,
      figure: "sw-cours-css",
      texte:
        "Le style graphique est décrit à part, dans une **feuille de style** écrite en **CSS** (Cascading Style Sheets). Une règle CSS s'écrit `sélecteur { propriété: valeur; }` :\n\n" +
        "```css\nbody {\n  background-color: lightyellow;\n}\nh1 {\n  color: teal;\n  text-align: center;\n}\na {\n  color: red;\n  font-size: 18px;\n}\n```\n\n" +
        "Le **sélecteur** dit quels éléments sont visés (`h1` : tous les titres de niveau 1). Les **propriétés** les plus courantes : `color` (couleur du texte), `background-color` (couleur de fond), `font-size` (taille), `font-family` (police), `text-align` (alignement), `margin` et `border` (marges et bordures).\n\n" +
        "On relie la feuille de style à la page par une ligne dans `<head>` : `<link rel=\"stylesheet\" href=\"style.css\">`.\n\n" +
        "**Séparer le contenu (HTML) et le style (CSS)** permet de changer l'apparence de tout un site en modifiant un seul fichier, d'adapter la page à l'écran d'un téléphone, et de garder un code lisible.",
      exemple: {
        enonce: "Quelle règle écrit tous les paragraphes en bleu ?",
        solution: "`p { color: blue; }` : le sélecteur `p` vise les paragraphes, la propriété `color` règle la couleur du texte."
      }
    },
    {
      titre: "Construire et publier une page",
      seance: 3,
      texte:
        "Pour fabriquer ta page :\n\n" +
        "- écris le code dans un éditeur de texte (Bloc-notes, un éditeur en ligne comme Capytale…), jamais dans un traitement de texte ;\n" +
        "- enregistre le fichier avec l'extension `.html` (et `style.css` pour le style), dans le même dossier que les images ;\n" +
        "- ouvre-le dans un navigateur : c'est lui qui « dessine » la page. Après chaque modification, enregistre puis recharge (F5).\n\n" +
        "Deux sortes de liens : un lien **absolu** donne l'URL complète (`href=\"https://fr.wikipedia.org/wiki/Mayotte\"`) ; un lien **relatif** vise un fichier du même site (`href=\"page2.html\"`).\n\n" +
        "Pour **mettre en ligne** la page, on copie ses fichiers sur un **serveur Web** (un hébergeur, ou l'espace de publication de l'ENT) : elle reçoit alors une URL que tout le monde peut ouvrir. Avant de publier, on vérifie qu'on a le droit d'utiliser chaque image et chaque texte (partie 4), et on ne met aucune information personnelle (adresse, téléphone, photo d'une autre personne sans son accord).",
      exemple: {
        enonce: "Ta page `index.html` affiche un carré cassé à la place de l'image `plage.jpg`. Que vérifier ?",
        solution: "Que le fichier `plage.jpg` est bien dans le même dossier que la page, que son nom est écrit exactement pareil dans `src` (majuscules, extension `.jpg` ou `.jpeg`), et que l'attribut `src` est entre guillemets."
      }
    },
    {
      titre: "Le modèle client-serveur",
      seance: 4,
      figure: "sw-cours-client-serveur",
      video: { titre: "Vidéo (Cookie connecté) : comprendre le serveur Web en 2 minutes", youtube: "https://youtu.be/msB9AvJ4bTM" },
      texte:
        "Le Web repose sur un dialogue entre **clients** et **serveurs**, toujours à l'initiative du client : le navigateur envoie une requête, le serveur renvoie une réponse.\n\n" +
        "- Une page **statique** est un fichier stocké tel quel sur le serveur : tout le monde reçoit la même.\n" +
        "- Une page **dynamique** est **fabriquée par le serveur** au moment de la requête, par un programme (en PHP, Python…) qui consulte souvent une base de données : résultats d'une recherche, page de ton compte, panier d'un site marchand. Le navigateur ne reçoit que le résultat, du HTML : on ne voit **jamais** le code PHP.\n\n" +
        "Les pages reçues peuvent contenir des programmes **JavaScript**, exécutés **par le client**, sur ton appareil : menus qui s'ouvrent, vérification d'un formulaire, jeux… Ils peuvent accéder à certaines ressources de l'appareil et dialoguer avec les serveurs. Le navigateur peut être réglé pour autoriser ou interdire ces programmes.\n\n" +
        "Pour **inspecter** une page sur ordinateur : Ctrl + U affiche le code reçu (HTML, CSS, JavaScript) ; F12 ouvre les outils de développement, où l'on peut même modifier la page… seulement chez soi, pour l'affichage."
    },
    {
      titre: "Les moteurs de recherche",
      seance: 4,
      figure: ["sw-cours-moteur", "sw-cours-index"],
      video: { titre: "Vidéo (Les Bons Profs) : les moteurs de recherche", youtube: "https://youtu.be/-hJpuSoS2KA" },
      texte:
        "Un moteur de recherche permet de trouver des pages dont on ne connaît pas l'adresse, ou même l'existence. Le **référencement naturel** se fait en trois étapes :\n\n" +
        "- **explorer** : des programmes, les **robots** (*crawlers*), parcourent le Web sans arrêt en suivant les liens, et aspirent les pages ;\n" +
        "- **indexer** : le moteur analyse le contenu des pages et construit un **index inversé**, un annuaire qui associe à chaque mot la liste des pages où il apparaît ;\n" +
        "- **classer** : à chaque requête, il cherche dans l'index les pages qui contiennent les mots demandés et les range par ordre, selon leur **popularité** (principe des liens), leur **pertinence** (place et fréquence des mots), l'ordre des mots de la requête, et beaucoup d'autres critères.\n\n" +
        "Les deux premières étapes ont lieu **avant** ta recherche : c'est pour cela qu'une réponse arrive en une fraction de seconde. Les concepteurs de sites améliorent leur référencement en choisissant bien leurs mots et en les plaçant à des endroits stratégiques (titres, adresse).\n\n" +
        "**Esprit critique** : le premier résultat n'est pas forcément le plus fiable. Certains sites achètent de la publicité pour apparaître dans les **liens sponsorisés**, en haut de la page. Deux moteurs ne donnent pas les mêmes résultats, et un même moteur personnalise souvent les réponses selon l'utilisateur.",
      exemple: {
        enonce: "Avec l'index du tableau, quelles pages répondent à la requête « lagon corail » ?",
        solution: "« lagon » → P1, P2, P3 ; « corail » → P2, P3. Les pages qui contiennent les deux mots : **P2 et P3**."
      }
    },
    {
      titre: "La popularité d'une page",
      seance: 4,
      figure: "sw-cours-hypertexte",
      texte:
        "Idée des fondateurs de Google (algorithme **PageRank**, 1998) : une page vers laquelle beaucoup d'autres pages font un lien est probablement intéressante. Chaque lien est comme un « vote ».\n\n" +
        "Version simple : la **popularité** d'une page est le nombre de liens qui **arrivent** sur elle (ses liens entrants). Sur le graphe, la page C reçoit des liens de A, B, D et E : elle a $4$ liens entrants, c'est la plus populaire.\n\n" +
        "Version plus fine : un vote ne vaut pas toujours autant. Un lien venant d'une page elle-même très populaire compte davantage, et une page qui fait des liens vers beaucoup de pages partage son vote entre elles. On calcule alors la popularité de toutes les pages en même temps, par un algorithme qui s'améliore à chaque tour.\n\n" +
        "Ce principe a ses failles : des sites fabriquent de faux liens pour gagner des places. Les moteurs combinent donc la popularité avec beaucoup d'autres critères, qu'ils gardent secrets."
    },
    {
      titre: "Sécurité et confidentialité",
      seance: 5,
      video: { titre: "Vidéo (Novelclass) : la sécurité des navigateurs, cookies et historique", youtube: "https://youtu.be/DDa7XR9CvEA" },
      texte:
        "En naviguant, on laisse des traces et on prend des risques :\n\n" +
        "- Un **cookie** est un petit fichier qu'un site fait enregistrer par ton navigateur : il garde ta langue, ton panier, ta connexion… Les cookies **tiers**, déposés par d'autres sites que celui que tu visites (régies publicitaires), servent à te **suivre** de site en site pour te montrer des publicités ciblées. En Europe, un site doit demander ton accord (règlement RGPD) : on peut **refuser** les cookies non essentiels.\n" +
        "- Le navigateur garde un **historique** de tes visites, qui peut rester accessible. La **navigation privée** n'enregistre ni historique ni cookies sur l'appareil, mais tu n'es **pas anonyme** : le site, ton opérateur ou le réseau du lycée voient toujours les connexions.\n" +
        "- Des pages peuvent contenir des **programmes malveillants** (espionner tes actions, voler des données). On peut interdire JavaScript sur un site, ne télécharger des fichiers que depuis des sources sûres et garder son navigateur à jour.\n" +
        "- L'**hameçonnage** (*phishing*) utilise de fausses pages qui imitent un vrai site (banque, impôts, réseau social) pour voler un mot de passe. Le texte d'un lien peut cacher une autre adresse : il faut **examiner l'adresse avant de cliquer** (sur téléphone, un appui long la montre).\n\n" +
        "**Réglages essentiels** du navigateur : bloquer les cookies tiers, effacer l'historique et les cookies à la fermeture, refuser les notifications et la localisation par défaut, utiliser un moteur de recherche qui ne garde pas de traces, ne jamais enregistrer de mot de passe sur un ordinateur partagé.",
      exemple: {
        enonce: "Un SMS dit : « Votre colis est bloqué, payez 1,99 € ici : laposte-livraison.info ». Que fais-tu ?",
        solution: "Le nom de domaine n'est pas `laposte.fr` : c'est un **hameçonnage**. On ne clique pas, on supprime le message, et on vérifie son colis en tapant soi-même l'adresse du vrai site. On peut signaler le SMS en le transférant au $33700$."
      }
    },
    {
      titre: "Le Web et la société",
      seance: 5,
      video: { titre: "Vidéo (Novelclass) : le Web, cours de SNT Seconde", youtube: "https://youtu.be/V1xz2h0Ibt4" },
      texte:
        "Dans l'histoire de la communication, le Web est une révolution : il a ouvert à **tous** le droit et la possibilité de **publier**. Il permet des coopérations nouvelles : commerce en ligne, logiciels libres écrits par des milliers d'auteurs, encyclopédies comme Wikipédia mises à jour en permanence. Il devient aussi le moyen universel de communiquer avec les objets connectés.\n\n" +
        "Mais :\n\n" +
        "- ni la **qualité**, ni la **pertinence**, ni la **véracité** des informations ne sont garanties : il faut vérifier les sources (qui écrit ? quand ? d'où vient l'image ?) et comparer avec d'autres sites ;\n" +
        "- le Web **conserve** des informations, parfois personnelles, longtemps et partout : une photo publiée peut être copiée et ressortir des années plus tard. Le **droit à l'oubli** permet de demander à un moteur de recherche de ne plus afficher certains résultats (déréférencement) ;\n" +
        "- l'exploitation des données sert à la **recommandation** commerciale et peut enfermer chacun dans une **bulle informationnelle**, où il ne voit plus que des contenus qui lui ressemblent ;\n" +
        "- certains sites achètent leur visibilité : les **liens promotionnels** des moteurs de recherche sont de la publicité."
    }
  ],

  videos: [
    { type: "Exercices", titre: "Novelclass : la sécurité des navigateurs, cours et exercices corrigés", youtube: "https://youtu.be/pdtrRfKq6ZE" },
    { type: "Reportage", titre: "Radio-Canada, Décrypteurs : les cookies, témoins de navigation qui nous suivent à la trace", youtube: "https://youtu.be/TBU2Tuct3ao" }
  ],
  videosNote: "Pour réviser la sécurité du navigateur, ou revoir les cookies expliqués autrement.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "sw-histoire", titre: "Repères historiques", etape: "Séance 1 · Histoire et droit d'auteur", nb: 5 },
    { type: "sw-licences", titre: "Licences et droit d'auteur", etape: "Séance 1 · Histoire et droit d'auteur", nb: 5 },
    { type: "sw-url", titre: "Décomposer une URL", etape: "Séance 2 · URL et HTTP", nb: 6 },
    { type: "sw-securise", titre: "Pages sécurisées et hameçonnage", etape: "Séance 2 · URL et HTTP", nb: 5 },
    { type: "sw-http", titre: "Requêtes HTTP", etape: "Séance 2 · URL et HTTP", nb: 6 },
    { type: "sw-balises", titre: "Balises HTML", etape: "Séance 3 · HTML et CSS", nb: 6 },
    { type: "sw-html-lire", titre: "Lire une page HTML", etape: "Séance 3 · HTML et CSS", nb: 5 },
    { type: "sw-html-erreur", titre: "Corriger du HTML", etape: "Séance 3 · HTML et CSS", nb: 5 },
    { type: "sw-css", titre: "Le style CSS", etape: "Séance 3 · HTML et CSS", nb: 5 },
    { type: "sw-client-serveur", titre: "Client ou serveur ?", etape: "Séance 4 · Client-serveur et moteurs", nb: 6 },
    { type: "sw-index", titre: "Index d'un moteur", etape: "Séance 4 · Client-serveur et moteurs", nb: 5 },
    { type: "sw-popularite", titre: "Popularité d'une page", etape: "Séance 4 · Client-serveur et moteurs", nb: 5 },
    { type: "sw-vrai-faux", titre: "Vrai ou faux ?", etape: "Séance 5 · Sécurité et bilan", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Le Web est :", choix: ["une application qui utilise Internet", "un autre nom d'Internet", "le réseau des câbles sous-marins", "un logiciel de messagerie"], bonne: 0, explication: "Internet est le réseau ; le Web, ce sont les pages reliées par des liens." },
    { question: "Le Web a été inventé :", choix: ["en 1989 au CERN, par Tim Berners-Lee", "en 1983 aux États-Unis", "en 1965 par Ted Nelson", "en 1998 par Google"], bonne: 0, explication: "Ted Nelson a inventé l'hypertexte (1965) ; Internet date de 1983." },
    { question: "En 1993, le CERN :", choix: ["met le Web dans le domaine public", "invente le Wi-Fi", "crée le premier smartphone", "invente le langage PHP"], bonne: 0, explication: "Chacun peut alors utiliser le Web librement ; le navigateur Mosaic le rend populaire." },
    { question: "Le W3C :", choix: ["normalise les formats du Web (HTML, CSS…)", "attribue les adresses IP", "est un moteur de recherche", "est le premier navigateur"], bonne: 0, explication: "World Wide Web Consortium, créé en 1994." },
    { question: "Un hypertexte est :", choix: ["un texte qui contient des liens vers d'autres contenus", "un texte écrit en très gros", "un texte chiffré", "un texte sans image"], bonne: 0, explication: "Un clic sur un lien renvoie vers une autre ressource." },
    { question: "Une photo trouvée sur le Web, sans aucune indication de licence :", choix: ["est protégée par le droit d'auteur", "est libre de droits", "appartient au moteur de recherche", "appartient à celui qui la télécharge"], bonne: 0, explication: "Le droit d'auteur s'applique dès la création, sans démarche." },
    { question: "Dans une licence Creative Commons, NC signifie :", choix: ["pas d'utilisation commerciale", "pas de citation de l'auteur", "nouvelle copie autorisée", "non chiffré"], bonne: 0, explication: "NC : non commercial." },
    { question: "Avec la licence CC BY-ND, on peut :", choix: ["partager l'œuvre telle quelle en citant l'auteur", "la modifier et la partager", "la partager sans citer l'auteur", "la recadrer pour une affiche"], bonne: 0, explication: "ND : pas de modification ; BY : citer l'auteur." },
    { question: "Dans `https://www.lagon-bleu.yt/articles/tortues.html`, le nom de domaine est :", choix: ["`www.lagon-bleu.yt`", "`https`", "`/articles/tortues.html`", "`tortues.html`"], bonne: 0, explication: "C'est la partie entre `://` et le premier `/`." },
    { question: "Dans `https://exemple.fr/recherche.php?q=chat&page=2`, le paramètre `page` vaut :", choix: ["`2`", "`chat`", "`recherche.php`", "`q`"], bonne: 0, explication: "Les paramètres suivent le `?` : `nom=valeur`, séparés par `&`." },
    { question: "Une page est sécurisée quand son adresse commence par :", choix: ["`https://`", "`http://`", "`www.`", "`ftp://`"], bonne: 0, explication: "HTTPS chiffre les échanges ; le navigateur affiche un cadenas." },
    { question: "Le cadenas de HTTPS garantit que :", choix: ["les échanges sont chiffrés", "le site est honnête", "le site n'a pas de publicité", "les cookies sont refusés"], bonne: 0, explication: "Un site d'hameçonnage peut aussi avoir un cadenas." },
    { question: "Quelle adresse appartient vraiment à `laposte.fr` ?", choix: ["`https://www.laposte.fr/suivi`", "`https://www.laposte.fr.suivi-colis.com/`", "`https://laposte-fr.info/suivi`", "`https://www.la-poste-suivi.fr.co/`"], bonne: 0, explication: "Le vrai nom de domaine est juste avant le premier `/`." },
    { question: "La méthode HTTP `GET` sert à :", choix: ["demander une ressource au serveur", "chiffrer la page", "supprimer une page", "envoyer un courriel"], bonne: 0, explication: "`POST` sert plutôt à envoyer des données (formulaire)." },
    { question: "Le code de réponse `404` signifie :", choix: ["la page demandée n'existe pas", "tout va bien", "le serveur est en panne", "il faut s'identifier"], bonne: 0, explication: "`200` : succès ; `500` : erreur du serveur ; `401` : identification." },
    { question: "Dans une requête HTTP, l'en-tête `User-Agent` indique :", choix: ["le navigateur et l'appareil utilisés", "le nom du serveur", "le mot de passe", "la page précédente"], bonne: 0, explication: "Le serveur sait ainsi quel navigateur et quel système tu utilises." },
    { question: "HTML sert à décrire :", choix: ["le contenu et la structure d'une page", "la présentation de la page", "le chemin des paquets", "l'adresse IP du serveur"], bonne: 0, explication: "La présentation, c'est le rôle du CSS." },
    { question: "La balise qui crée un lien est :", choix: ["`<a>`", "`<link>`", "`<p>`", "`<li>`"], bonne: 0, explication: "`<a href=\"…\">texte</a>` ; `<link>` relie la feuille de style." },
    { question: "Le texte de l'onglet du navigateur est donné par :", choix: ["`<title>`", "`<h1>`", "`<head>`", "`<body>`"], bonne: 0, explication: "`<title>` est dans `<head>`." },
    { question: "L'attribut `alt` d'une image :", choix: ["donne un texte de remplacement (lu par les lecteurs d'écran)", "donne l'adresse du fichier image", "agrandit l'image", "rend l'image cliquable"], bonne: 0, explication: "L'adresse du fichier est dans `src`." },
    { question: "Quel code HTML est correct ?", choix: ["`<p>Un <em>mot</em> important.</p>`", "`<p>Un <em>mot</p> important.</em>`", "`<p>Un <em>mot important.</p>`", "`<p Un <em>mot</em> important.</p>`"], bonne: 0, explication: "Chaque balise est fermée, dans l'ordre inverse de l'ouverture." },
    { question: "CSS sert à :", choix: ["définir le style de présentation d'une page", "écrire le contenu d'une page", "envoyer les requêtes", "indexer les pages"], bonne: 0, explication: "Couleurs, tailles, polices, alignements…" },
    { question: "La règle `h1 { color: red; }` :", choix: ["écrit en rouge le texte des titres `<h1>`", "met un fond rouge à toute la page", "écrit en rouge tous les textes", "crée un titre rouge supplémentaire"], bonne: 0, explication: "Sélecteur `h1`, propriété `color` (couleur du texte)." },
    { question: "La propriété CSS qui change la couleur de fond est :", choix: ["`background-color`", "`color`", "`font-size`", "`text-align`"], bonne: 0, explication: "`color` change la couleur du texte." },
    { question: "Une page dynamique est :", choix: ["fabriquée par le serveur au moment de la requête", "une page avec des animations", "une page qui change de couleur", "une page sans texte"], bonne: 0, explication: "Par un programme (PHP, Python…) souvent relié à une base de données." },
    { question: "Le code JavaScript d'une page est exécuté :", choix: ["par le navigateur, sur l'appareil de l'utilisateur", "par le serveur DNS", "par les routeurs", "par le serveur, avant l'envoi"], bonne: 0, explication: "C'est du code exécuté côté client." },
    { question: "Pourquoi ne voit-on jamais le code PHP d'un site en affichant le code source ?", choix: ["il est exécuté sur le serveur, qui n'envoie que le résultat", "il est chiffré par HTTPS", "le navigateur le cache", "il est écrit en binaire"], bonne: 0, explication: "Le navigateur ne reçoit que le HTML produit." },
    { question: "Un index inversé associe :", choix: ["à chaque mot, la liste des pages qui le contiennent", "à chaque page, son adresse IP", "à chaque site, son propriétaire", "à chaque lien, sa couleur"], bonne: 0, explication: "C'est l'annuaire construit par le moteur de recherche." },
    { question: "Quand tu tapes une requête, le moteur de recherche :", choix: ["consulte son index, construit à l'avance par ses robots", "parcourt tout le Web à ce moment-là", "demande à chaque site s'il contient les mots", "affiche les pages au hasard"], bonne: 0, explication: "Exploration et indexation ont lieu avant la requête." },
    { question: "Selon le principe des liens, une page est populaire quand :", choix: ["beaucoup de pages font un lien vers elle", "elle fait beaucoup de liens vers d'autres pages", "elle est très longue", "elle a beaucoup d'images"], bonne: 0, explication: "On compte les liens entrants (les « votes »)." },
    { question: "Les liens sponsorisés d'un moteur de recherche sont :", choix: ["des publicités payées par des annonceurs", "les pages les plus fiables", "des pages du moteur lui-même", "les pages les plus anciennes"], bonne: 0, explication: "Ils apparaissent souvent en premier, signalés comme « sponsorisé »." },
    { question: "Les cookies tiers servent surtout à :", choix: ["suivre l'internaute de site en site pour la publicité", "accélérer la connexion", "chiffrer les échanges", "bloquer les virus"], bonne: 0, explication: "On peut les bloquer dans les réglages du navigateur." },
    { question: "En navigation privée :", choix: ["l'historique n'est pas enregistré sur l'appareil, mais on n'est pas anonyme", "personne ne peut savoir quels sites on visite", "les sites ne voient pas l'adresse IP", "les virus sont bloqués"], bonne: 0, explication: "Le site visité, l'opérateur ou le réseau voient toujours les connexions." },
    { question: "L'hameçonnage consiste à :", choix: ["imiter un vrai site pour voler des identifiants", "bloquer les cookies", "classer les pages par popularité", "saturer un serveur"], bonne: 0, explication: "On le déjoue en examinant l'adresse avant de cliquer." },
    { question: "Le droit à l'oubli permet de :", choix: ["demander à un moteur de ne plus afficher certains résultats", "effacer une information de tout le Web", "supprimer l'historique des autres", "oublier son mot de passe"], bonne: 0, explication: "C'est un déréférencement ; l'information peut rester sur le site d'origine." },
    { question: "Une bulle informationnelle, c'est :", choix: ["ne plus voir que des contenus proches de ce qu'on aime déjà", "un message publicitaire", "une page Web sans lien", "une panne du Web"], bonne: 0, explication: "Elle vient des recommandations personnalisées." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Décomposer une URL",
      figure: "sw-cours-url",
      etapes: [
        "Le **protocole** est avant `://` (`https` : sécurisé).",
        "Le **nom de domaine** va de `://` jusqu'au premier `/` ; on le lit de droite à gauche (`.fr`, `.yt`…).",
        "Le **chemin** va du premier `/` jusqu'à `?` ou `#` ; son dernier morceau est le **fichier**.",
        "Les **paramètres** suivent `?` (`nom=valeur`, séparés par `&`) ; l'**ancre** suit `#`."
      ],
      exemple: "`https://www.lagon-bleu.yt/sport/agenda.php?jour=lundi` : protocole `https`, domaine `www.lagon-bleu.yt`, chemin `/sport/agenda.php`, paramètre `jour` qui vaut `lundi`."
    },
    {
      titre: "Vérifier un lien avant de cliquer",
      etapes: [
        "Afficher la vraie adresse : survoler le lien à la souris, ou appui long sur téléphone (le texte affiché peut mentir).",
        "Repérer le nom de domaine, juste avant le premier `/`, et le lire de droite à gauche.",
        "Se méfier des sosies : lettre changée (`rn` pour `m`, `0` pour `o`), mot ajouté, fin inhabituelle (`.info`, `.xyz`…).",
        "En cas de doute, ne pas cliquer : taper soi-même l'adresse du site officiel."
      ],
      exemple: "`https://www.impots.gouv.fr.remboursement.com/` mène chez `remboursement.com`, pas sur le site des impôts : c'est un piège."
    },
    {
      titre: "Lire une requête HTTP",
      figure: "sw-cours-http",
      etapes: [
        "Première ligne : la **méthode** (`GET` ou `POST`), la **ressource** demandée, la version de HTTP.",
        "Les **paramètres** d'un `GET` sont après `?` dans la ressource ; ceux d'un `POST`, après les en-têtes.",
        "En-têtes utiles : `Host` (le serveur), `User-Agent` (navigateur et appareil), `Accept-Language` (la langue).",
        "Dans la réponse, lire le **code** : `200` succès, `301` déménagée, `403` interdite, `404` introuvable, `500` erreur du serveur."
      ],
      exemple: "`GET /meteo.php?ville=Sada HTTP/1.1` avec `Host: www.meteo-ylang.yt` : on demande la page `meteo.php` du serveur `www.meteo-ylang.yt`, avec le paramètre `ville` qui vaut `Sada`."
    },
    {
      titre: "Écrire une page HTML simple",
      figure: "sw-cours-dom",
      etapes: [
        "Écrire le squelette : `<!DOCTYPE html>`, puis `<html>` qui contient `<head>` (avec `<meta charset=\"utf-8\">` et `<title>`) et `<body>`.",
        "Dans `<body>`, mettre le contenu : `<h1>` pour le titre, `<p>` pour chaque paragraphe, `<ul>` et `<li>` pour une liste.",
        "Ajouter un lien `<a href=\"adresse\">texte cliquable</a>` et une image `<img src=\"fichier.jpg\" alt=\"description\">`.",
        "Fermer chaque balise dans l'ordre inverse de l'ouverture ; enregistrer en `.html` et ouvrir dans le navigateur."
      ],
      exemple: "`<p>Voir la page <a href=\"https://fr.wikipedia.org/wiki/Mayotte\">Mayotte</a> de Wikipédia.</p>`"
    },
    {
      titre: "Changer le style avec CSS",
      figure: "sw-cours-css",
      etapes: [
        "Créer un fichier `style.css` dans le dossier de la page.",
        "Le relier à la page : dans `<head>`, ajouter `<link rel=\"stylesheet\" href=\"style.css\">`.",
        "Écrire une règle par type d'élément : `sélecteur { propriété: valeur; }`, avec un `;` après chaque déclaration.",
        "Enregistrer, recharger la page, et ajuster les valeurs (`color`, `background-color`, `font-size`, `text-align`…)."
      ],
      exemple: "`h1 { color: teal; text-align: center; }` centre les titres principaux et les écrit en bleu canard."
    },
    {
      titre: "Répondre à une requête avec un index",
      figure: "sw-cours-index",
      etapes: [
        "Pour chaque mot de la requête, lire sa ligne dans l'index inversé : la liste de ses pages.",
        "Garder les pages communes à toutes les listes (elles contiennent tous les mots).",
        "Classer ces pages, par exemple selon leur popularité : le nombre de liens qui arrivent sur chacune.",
        "Garder un esprit critique : popularité ne veut pas dire fiabilité."
      ],
      exemple: "« tortue lagon » : tortue → P1, P3 ; lagon → P1, P2, P3. Pages communes : P1 et P3."
    }
  ],
  erreurs: [
    "Confondre le Web et Internet : le Web n'est qu'une application d'Internet.",
    "Croire qu'une image trouvée sur le Web est libre de droits.",
    "Lire le nom de domaine de gauche à droite : `www.ameli.fr.securite.com` appartient à `securite.com`.",
    "Croire que le cadenas HTTPS garantit qu'un site est honnête : il garantit seulement que les échanges sont chiffrés.",
    "Confondre `<title>` (titre de l'onglet) et `<h1>` (titre affiché dans la page).",
    "Oublier de fermer une balise, ou fermer les balises dans le mauvais ordre.",
    "Confondre `color` (couleur du texte) et `background-color` (couleur du fond).",
    "Mettre le style dans le HTML au lieu d'une feuille CSS séparée.",
    "Croire que le moteur parcourt tout le Web pendant la recherche : il consulte son index.",
    "Croire que la navigation privée rend anonyme.",
    "Accepter tous les cookies par réflexe : on peut refuser ceux qui ne sont pas essentiels."
  ]
};
