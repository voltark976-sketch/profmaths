/*
  CHAPITRE : SNT (Seconde) — Thème : Les réseaux sociaux (chapitre 1 de la section, à la demande de Voltark)
  -------------------------------------------------------------------------------------------------------
  Programme de SNT de 2019 (arrêté du 17-1-2019, BO spécial n° 1 du 22 janvier 2019), thème « Les réseaux sociaux » :
  identité numérique, e-réputation, identification, authentification ; réseaux sociaux existants ; modèle économique ;
  rayon, diamètre et centre d'un graphe ; notion de petit monde, expérience de Milgram ; cyberviolence (article 222-33-2-2).
  Écriture : formules et nombres entre $...$ (antislash doublé), code en ligne entre accents graves.
  seances : 1 h, 2 h, 1 h, 2 h, 1 h, 2 h (9 h, évaluation comprise) : le chapitre 2 (Internet) reprend ensuite par 1 h.
  Activités interactives : figures « sr-act-… » (graphe à explorer, fil d'actualité, confidentialité, mot de passe), branchées
  par PM_EXO.activer dans assets/exercices-snt.js. PDF (cours, activités sans internet, exercices) : assets/pdf/.
  Générateurs : préfixe sr- ; figures « sr-cours-… ». Prénoms et profils fictifs.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["snt-reseaux-sociaux"] = {
  niveau: "SNT Seconde",
  numero: 1,
  titre: "Les réseaux sociaux",
  accroche: "Qui voit tes photos ? Pourquoi ton fil ne ressemble pas à celui de ton voisin ? Comment une appli gratuite gagne des milliards ? Et pourquoi le monde est-il si petit ? Explore, teste, règle : c'est toi qui joues.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Le cours complet à imprimer", url: "assets/pdf/snt-reseaux-sociaux-cours.pdf" },
    { titre: "Les activités sur papier (sans internet)", url: "assets/pdf/snt-reseaux-sociaux-activites.pdf" },
    { titre: "Exercices corrigés à imprimer", url: "assets/pdf/snt-reseaux-sociaux-exercices.pdf" }
  ],

  /* ---------- 0. DÉROULÉ EN SÉANCES ---------- */
  seancesNote: "Six séances, une par semaine, en alternant 1 h et 2 h (9 h, évaluation comprise). Chaque partie du cours porte le numéro de la séance où on la travaille. Sans connexion, tout se fait avec les PDF ci-dessus : cours, activités sur papier et exercices corrigés.",
  seances: [
    {
      duree: "1 h", titre: "Les réseaux sociaux autour de nous",
      objectifs: ["Définir un réseau social et connaître son histoire.", "Distinguer plusieurs réseaux sociaux selon leurs caractéristiques, avec l'ordre de grandeur de leur nombre d'utilisateurs."],
      deroule: ["**10 min** · Sondage à main levée (ou sur papier, anonyme) : quels réseaux utilises-tu ? Combien de temps par jour ? On fait le graphique de la classe au tableau.", "**20 min** · Parties 1 et 2 du cours, avec la vidéo. Jeu : chaque groupe reçoit le nom d'un réseau et doit le décrire en trois mots sans le nommer ; les autres devinent.", "**15 min** · Ordres de grandeur : $3$ milliards d'utilisateurs, c'est quelle part des $8$ milliards d'humains ?", "**15 min** · Exercices : séries « Réseaux sociaux existants » et « Vrai ou faux ? »."],
      maison: "Regarder son propre temps d'écran (Paramètres du téléphone) et le noter pour la séance suivante."
    },
    {
      duree: "2 h", titre: "Identité numérique, confidentialité et mots de passe",
      objectifs: ["Connaître les notions d'identité numérique, d'e-réputation, d'identification et d'authentification.", "Paramétrer un compte pour protéger ses données personnelles.", "Créer un mot de passe robuste et activer la double authentification."],
      deroule: ["**Partie A (1 h)** · Partie 3 du cours. Activité « Que dit Internet de Nadjma ? » (fiche papier) : à partir des traces d'un profil fictif, retrouver son lycée, ses goûts, son quartier. Puis classer des traces : volontaires, involontaires, laissées par d'autres.", "Activité interactive « Règle le profil de Nadjma » (partie 4) : qu'est-ce qu'un inconnu voit ? Puis chacun ouvre les paramètres de confidentialité d'un réseau qu'il utilise (sans rien publier).", "**Partie B (1 h)** · Partie 5 : testeur de mot de passe (avec des mots de passe **inventés**), calcul du nombre de possibilités, phrase de passe, double authentification.", "Exercices : séries « Identité numérique », « Confidentialité » et « Mots de passe »."],
      maison: "Activer la double authentification sur un de ses comptes (avec un parent si besoin)."
    },
    {
      duree: "1 h", titre: "Gratuit ? Le modèle économique",
      objectifs: ["Identifier les sources de revenus des entreprises de réseaux sociaux.", "Comprendre le lien entre données personnelles, attention et publicité ciblée."],
      deroule: ["**10 min** · Question : « Une appli gratuite qui vaut des centaines de milliards : comment est-ce possible ? »", "**20 min** · Partie 6 du cours et vidéo. Étude de cas « Julie et les publicités ciblées » : d'où viennent les publicités qu'elle voit ? Que sait le réseau sur elle ?", "**15 min** · Calculs : revenu par utilisateur, nombre de publicités vues par jour pour un temps d'écran donné (avec son propre temps d'écran).", "**15 min** · Exercices : série « Modèle économique ». Débat express : « Quand c'est gratuit, c'est toi le produit » : d'accord, pas d'accord ?"],
      maison: "Série « Modèle économique » jusqu'à 3 étoiles."
    },
    {
      duree: "2 h", titre: "Le monde est petit : graphes, rayon, diamètre, centre",
      objectifs: ["Représenter des relations par un graphe.", "Connaître l'expérience de Milgram et la notion de petit monde.", "Déterminer distance, excentricité, rayon, diamètre et centre sur des graphes simples."],
      deroule: ["**Partie A (1 h)** · Activité débranchée « la chaîne de Milgram » : un message doit atteindre une personne d'une autre classe (ou d'un autre lycée) en ne passant que par des personnes qu'on connaît ; on compte les intermédiaires. Parties 7 et 8 du cours avec les vidéos.", "Activité : construire au tableau le graphe d'amitié d'un groupe de la classe (avec des prénoms inventés), repérer les groupes d'amis.", "**Partie B (1 h)** · Partie 9 : l'activité interactive « Explore le graphe de la classe » (ou sa version papier) pour trouver excentricités, rayon, diamètre et centre.", "Exercices : séries « Amis et degrés », « Distance », « Excentricité », « Rayon, diamètre, centre », « Petit monde »."],
      maison: "Fiche méthode « Rayon, diamètre et centre d'un graphe » et série « Rayon, diamètre, centre »."
    },
    {
      duree: "1 h", titre: "Ce que tu vois : algorithmes et bulles de filtre",
      objectifs: ["Décrire comment l'information présentée par les réseaux sociaux dépend du choix préalable de ses amis et de ses réactions.", "Repérer une fausse information et vérifier une source."],
      deroule: ["**15 min** · Activité interactive « Ton fil d'actualité » (partie 10) : chacun choisit ses comptes, aime des publications et observe son fil se refermer.", "**15 min** · Partie 10 du cours : algorithmes de recommandation, bulle de filtre, fausses informations.", "**15 min** · Par deux : comparer les trois premières publications de deux fils (fiche papier) et expliquer les différences.", "**15 min** · Exercices : séries « Bulles de filtre » et « Confidentialité »."],
      maison: "Lire la partie 11 du cours avant la séance suivante."
    },
    {
      duree: "2 h", titre: "Cyberviolence, et évaluation",
      objectifs: ["Connaître les formes de cyberviolence (harcèlement, discrimination, sexting…) et les ressources pour lutter contre elle.", "Connaître les dispositions de l'article 222-33-2-2 du code pénal.", "Montrer ce qu'on a appris (évaluation)."],
      deroule: ["**Partie A (1 h)** · Partie 11 du cours avec la vidéo. Étude de cas par groupes : à partir d'une situation (groupe de classe, photo partagée, faux compte), identifier la forme de cyberviolence, ce que dit la loi, et ce que peuvent faire la victime et les témoins. Mise en commun, puis site nonauharcelement.education.gouv.fr.", "Exercices : série « Cyberviolence et loi », puis QCM du chapitre.", "**Partie B (1 h)** · Évaluation sur feuille (graphe, identité numérique, modèle économique, cyberviolence)."],
      maison: "Avant l'évaluation : QCM du chapitre au moins une fois jusqu'à 10/12, et la fiche méthode."
    }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Qu'est-ce qu'un réseau social ?",
      seance: 1,
      figure: "sr-cours-panorama",
      video: { titre: "Vidéo (Lelivrescolaire) : les réseaux sociaux, SNT Seconde", youtube: "https://youtu.be/iwDh9C4q4og" },
      texte:
        "Un **réseau social** est un service en ligne qui permet de créer un **profil**, de se relier à d'autres personnes (amis, abonnés, contacts) et de **partager** des contenus : messages, photos, vidéos, liens, réactions.\n\n" +
        "Les réseaux sociaux ne se ressemblent pas : certains servent surtout à **discuter** (WhatsApp, Discord), d'autres à **montrer** des photos ou des vidéos (Instagram, TikTok, YouTube), à garder des **messages éphémères** (Snapchat), à **débattre** en public (X), ou à trouver un **travail** (LinkedIn). On les distingue aussi par la **persistance** des données (une story disparaît, un message public reste), les façons d'**approuver** (« j'aime », partage, abonnement) et l'âge de leurs utilisateurs.\n\n" +
        "Ils comptent parmi les services les plus utilisés au monde : les plus grands annoncent **plusieurs milliards** d'utilisateurs chaque mois, pour environ $8$ milliards d'humains. Presque tous appartiennent à quelques grandes entreprises : Meta (Facebook, Instagram, WhatsApp), Alphabet (YouTube), ByteDance (TikTok)…\n\n" +
        "En France, avant **15 ans**, l'inscription demande aussi l'accord d'un parent : c'est l'âge à partir duquel on peut consentir seul à l'utilisation de ses données.",
      exemple: {
        enonce: "Facebook annonce environ $3$ milliards d'utilisateurs par mois. Quelle part de l'humanité cela représente-t-il, à peu près ?",
        solution: "$3 \\div 8 \\approx 0{,}375$ : environ $37\\,\\%$, plus d'un humain sur trois. (Une même personne peut avoir plusieurs comptes, et beaucoup d'humains n'ont pas accès à Internet.)"
      }
    },
    {
      titre: "Repères historiques",
      seance: 1,
      figure: "sr-cours-frise",
      video: { titre: "Vidéo (Les Bons Profs) : repères historiques, réseaux sociaux", youtube: "https://youtu.be/E6p6zIhYPQw" },
      texte:
        "- **1997** : SixDegrees, considéré comme le premier réseau social, permet de créer un profil et une liste d'amis.\n" +
        "- **2003-2004** : LinkedIn, puis **Facebook**, créé par Mark Zuckerberg pour les étudiants de Harvard, ouvert à tous en 2006.\n" +
        "- **2005-2006** : YouTube (vidéos), Twitter (messages courts, devenu X en 2023).\n" +
        "- **2007-2010** : avec les smartphones, les réseaux passent dans la poche : WhatsApp (2009), Instagram (2010).\n" +
        "- **2011** : Snapchat et ses messages éphémères.\n" +
        "- **2016** : TikTok (Douyin en Chine) et ses vidéos courtes choisies par un algorithme.\n\n" +
        "En vingt ans, on est passé de l'ordinateur familial au téléphone toujours allumé : les réseaux sociaux sont devenus un lieu où l'on s'informe, où l'on se montre… et où des entreprises gagnent beaucoup d'argent."
    },
    {
      titre: "Identité numérique et e-réputation",
      seance: 2,
      figure: "sr-cours-traces",
      video: { titre: "Vidéo (ConsoMag) : qu'est-ce que la « e-réputation » ?", youtube: "https://youtu.be/IV9usYFnBSc" },
      texte:
        "Ton **identité numérique**, c'est l'ensemble des **traces** que l'on trouve sur toi en ligne. Il y en a trois sortes :\n\n" +
        "- les traces **volontaires** : ce que tu publies (photos, commentaires, « j'aime », profil) ;\n" +
        "- les traces **involontaires** : ce que les services enregistrent sur toi sans que tu y penses (position, temps passé sur chaque vidéo, recherches, adresse IP, cookies) ;\n" +
        "- les traces **laissées par d'autres** : une photo où un ami t'identifie, une vidéo de la classe, un article.\n\n" +
        "L'**e-réputation**, c'est l'image que ces traces donnent de toi. Elle compte : un futur employeur, une école ou une famille d'accueil peuvent chercher ton nom. Une publication peut être **copiée** (capture d'écran) et rester des années, même si tu l'effaces.\n\n" +
        "Bonnes pratiques : réfléchir avant de publier, utiliser un pseudonyme quand c'est possible, ne jamais publier ce qu'on ne voudrait pas voir affiché au lycée. Le **RGPD** (règlement européen sur les données) te donne un **droit d'accès** (obtenir tes données) et un **droit à l'effacement**, renforcé pour ce qui a été publié quand tu étais mineur. La **CNIL** aide à le faire respecter.",
      exemple: {
        enonce: "Classe ces traces : (a) Tu publies une vidéo de ta danse. (b) L'appli enregistre que tu as regardé $40$ vidéos de chats. (c) Ton cousin t'identifie sur une photo de mariage.",
        solution: "(a) trace volontaire ; (b) trace involontaire ; (c) trace laissée par quelqu'un d'autre."
      }
    },
    {
      titre: "Paramétrer sa confidentialité",
      seance: 2,
      figure: "sr-act-confidentialite",
      texte:
        "Les **paramètres de confidentialité** décident **qui voit quoi**. Pour chaque information, on choisit en général : **public** (tout le monde, même sans compte), **amis** (ou abonnés acceptés), **amis d'amis**, ou **moi seul**.\n\n" +
        "Réglages essentiels :\n\n" +
        "- passer son compte en **privé** et accepter seulement les personnes qu'on connaît ;\n" +
        "- ne **jamais** partager sa position en direct en public, ni son numéro de téléphone ou son adresse ;\n" +
        "- limiter qui peut t'envoyer des messages, et valider les identifications avant qu'elles apparaissent ;\n" +
        "- vérifier les **autorisations des applications tierces** (jeux, quiz) : elles demandent souvent l'accès à ta liste d'amis ou à tes photos sans en avoir besoin.\n\n" +
        "Attention à « amis d'amis » : si tu as $200$ amis qui en ont $200$ chacun, une publication peut toucher des **dizaines de milliers** de personnes. Et le **droit à l'image** s'applique en ligne : on ne publie pas la photo de quelqu'un sans son accord.\n\n" +
        "**Activité** : règle le profil fictif de Nadjma ci-contre, puis compare ce que voit un ami et ce que voit un inconnu."
    },
    {
      titre: "S'identifier, s'authentifier, se protéger",
      seance: 2,
      figure: ["sr-cours-auth", "sr-act-motdepasse"],
      texte:
        "Pour accéder à un compte, il y a deux étapes :\n\n" +
        "- l'**identification** : dire **qui** on est, avec un identifiant (pseudo, adresse électronique, numéro) ;\n" +
        "- l'**authentification** : **prouver** qu'on est bien cette personne, avec quelque chose qu'on **sait** (mot de passe), qu'on **a** (téléphone qui reçoit un code) ou qu'on **est** (empreinte, visage).\n\n" +
        "La **double authentification** combine deux preuves : même si ton mot de passe est volé, le pirate n'a pas le code reçu sur ton téléphone. À activer sur tous tes comptes importants.\n\n" +
        "Un mot de passe **robuste** est **long** : avec $c$ caractères possibles et une longueur $n$, il y a $c^n$ mots de passe. Un code de $4$ chiffres n'a que $10^4 = 10\\,000$ possibilités ; une phrase de passe comme `Mangue-Lagon-42-Baobab!` en a des milliards de milliards. On évite les mots de passe courants (`azerty`, `123456`), son prénom, sa date de naissance, et on n'utilise **jamais le même** sur deux sites. Un gestionnaire de mots de passe peut les retenir pour toi.\n\n" +
        "Se faire passer pour quelqu'un d'autre (faux compte avec son nom et ses photos) est une **usurpation d'identité**, punie d'un an de prison et de $15\\,000$ € d'amende.",
      exemple: {
        enonce: "Un mot de passe de $8$ lettres minuscules : combien de possibilités ?",
        solution: "$26^8 \\approx 2 \\times 10^{11}$, environ $200$ milliards. Un ordinateur qui teste $10$ milliards de mots de passe par seconde les essaie tous en $20$ secondes environ : c'est beaucoup trop faible."
      }
    },
    {
      titre: "Le modèle économique : qui paie ?",
      seance: 3,
      figure: "sr-cours-economie",
      video: { titre: "Vidéo (Info ou Mytho ?) : réseaux sociaux, combien tu vaux ?", youtube: "https://youtu.be/3rWECbkkZ5c" },
      texte:
        "La plupart des réseaux sociaux sont **gratuits** pour leurs utilisateurs, et pourtant leurs entreprises gagnent des dizaines de milliards d'euros par an. D'où vient l'argent ?\n\n" +
        "- De la **publicité ciblée**, surtout. Le réseau observe tes « j'aime », ce que tu regardes longtemps, tes recherches, ta position, tes amis… et en déduit tes centres d'intérêt. Les **annonceurs** paient pour montrer leurs publicités aux personnes susceptibles d'être intéressées : un jeune de $16$ ans passionné de foot à Mayotte, par exemple.\n" +
        "- Des **abonnements** (version sans publicité, badge, fonctions en plus), des **achats dans l'application** (cadeaux virtuels pendant les directs) et des **commissions** sur les ventes.\n\n" +
        "D'où le slogan : « **Quand c'est gratuit, c'est toi le produit** ». Tu paies avec ton **attention** et tes **données**. Plus tu restes longtemps, plus tu vois de publicités : c'est pourquoi tout est fait pour te retenir (défilement infini, vidéos qui s'enchaînent, notifications, séries de jours consécutifs).\n\n" +
        "Les **influenceurs** sont aussi payés par des marques : depuis la loi du 9 juin 2023, ils doivent indiquer clairement une « publicité » ou une « collaboration commerciale ».",
      exemple: {
        enonce: "Un réseau fictif a $2$ milliards d'utilisateurs et gagne $60$ milliards d'euros de publicité par an. Combien rapporte un utilisateur en moyenne ?",
        solution: "$60 \\div 2 = 30$ € par utilisateur et par an. C'est la valeur publicitaire moyenne de ton attention."
      }
    },
    {
      titre: "Un réseau social est un graphe",
      seance: 4,
      figure: "sr-cours-graphe",
      video: { titre: "Vidéo (Les Bons Profs) : les graphes, SNT Seconde", youtube: "https://youtu.be/4ZGOENG8iOA" },
      texte:
        "On représente un réseau social par un **graphe** : chaque personne est un **sommet** (un rond), chaque relation un **lien** (un trait). Sur Facebook ou Snapchat, l'amitié va dans les deux sens : un trait simple. Sur Instagram ou TikTok, on peut suivre quelqu'un sans être suivi : on dessine alors une flèche.\n\n" +
        "Vocabulaire :\n\n" +
        "- le **degré** d'un sommet est son nombre de liens (son nombre d'amis) ;\n" +
        "- deux personnes ont des **amis en commun** quand elles sont reliées aux mêmes sommets : les réseaux s'en servent pour proposer « des personnes que tu pourrais connaître » ;\n" +
        "- les zones où les liens sont **denses** forment des **groupes** ou **communautés** (une classe, une équipe, une famille).\n\n" +
        "Sur le graphe de la classe ci-contre, on voit deux groupes d'amis ; seul Naël les relie.",
      exemple: {
        enonce: "Sur le graphe ci-contre, combien d'amis a Rose ? Combien d'amis en commun ont Anli et Lina ?",
        solution: "Rose est reliée à Naël, Maya, Hugo et Sami : $4$ amis (degré $4$). Anli et Lina ont en commun Tom et Zoé : $2$ amis en commun."
      }
    },
    {
      titre: "Le petit monde et l'expérience de Milgram",
      seance: 4,
      figure: "sr-cours-milgram",
      video: { titre: "Vidéo (MOOC SNT, Inria) : réseaux sociaux, le monde est-il si petit ?", youtube: "https://youtu.be/nn1mIqW9oYQ" },
      texte:
        "En **1967**, le psychologue américain **Stanley Milgram** donne des lettres à des habitants du Nebraska (Omaha). Chaque lettre doit atteindre un inconnu de Boston, à plus de $2\\,000$ km. Règle : on ne peut l'envoyer qu'à une personne que l'on **connaît personnellement** et qui semble plus proche du destinataire.\n\n" +
        "Résultat : les lettres arrivées sont passées par environ **$5$ intermédiaires**, soit $6$ liens. C'est l'origine de l'expression « **six degrés de séparation** ».\n\n" +
        "Pourquoi si peu ? Si chacun connaît $100$ personnes, on en atteint $100^2 = 10\\,000$ en deux étapes, $100^3 = 1$ million en trois, $100^5 = 10$ milliards en cinq : plus que l'humanité. En réalité, les amis de nos amis sont souvent nos amis, il faut donc un peu plus d'étapes, mais très peu.\n\n" +
        "Un réseau où deux personnes quelconques sont reliées par un **chemin court** est un **petit monde**. Les réseaux sociaux l'ont rendu encore plus petit : en **2016**, Facebook a mesuré une distance moyenne d'environ **$3{,}57$** entre deux de ses utilisateurs.",
      exemple: {
        enonce: "Une lettre suit la chaîne Awa → Saïd → Mia → Ilan → Rose. Combien y a-t-il d'intermédiaires ? De liens ?",
        solution: "Intermédiaires (entre l'expéditrice et la destinataire) : Saïd, Mia, Ilan, soit $3$. Liens (flèches) : $4$."
      }
    },
    {
      titre: "Distance, rayon, diamètre et centre",
      seance: 4,
      figure: ["sr-act-graphe", "sr-cours-distances"],
      video: { titre: "Vidéo (Novelclass) : l'expérience de Milgram, SNT Seconde", youtube: "https://youtu.be/Eds3LN1jVz4" },
      texte:
        "Pour mesurer si un réseau est un « petit monde », on définit :\n\n" +
        "- la **distance** entre deux personnes : le plus petit nombre de liens pour aller de l'une à l'autre ;\n" +
        "- l'**excentricité** d'une personne : sa plus grande distance à une autre personne du réseau ;\n" +
        "- le **diamètre** du graphe : la plus grande excentricité, c'est-à-dire la plus grande distance entre deux personnes ;\n" +
        "- le **rayon** du graphe : la plus petite excentricité ;\n" +
        "- le **centre** : la ou les personnes dont l'excentricité est égale au rayon. Ce sont elles qui peuvent toucher tout le monde le plus vite.\n\n" +
        "On a toujours rayon $\\leqslant$ diamètre. Sur le graphe de la classe : depuis Lina, la personne la plus éloignée est à distance $3$ (son excentricité vaut $3$) ; Naël a une excentricité de $2$, la plus petite : il est le **centre**, le rayon vaut $2$ ; Anli et Sami sont à distance $4$, le diamètre vaut $4$.\n\n" +
        "**Activité** : touche chaque élève du graphe interactif pour voir ses distances, puis trouve le rayon, le diamètre et le centre."
    },
    {
      titre: "Ce que tu vois : algorithmes et bulles de filtre",
      seance: 5,
      figure: ["sr-act-fil", "sr-cours-bulle"],
      texte:
        "Ton **fil d'actualité** n'est pas le même que celui de ton voisin. Il est choisi par un **algorithme** de recommandation, à partir de :\n\n" +
        "- tes **amis** et tes **abonnements** : tu vois d'abord ce qu'ils publient et ce qu'ils aiment ;\n" +
        "- tes **réactions** : « j'aime », commentaires, partages, et même le temps passé à regarder une vidéo ;\n" +
        "- ce qui plaît à des personnes qui te ressemblent.\n\n" +
        "Plus tu réagis à un type de contenu, plus tu en vois : ton fil se resserre autour de ce que tu aimes déjà. C'est la **bulle de filtre** : on voit de moins en moins d'avis différents, et on peut croire que tout le monde pense comme nous. L'information que tu reçois dépend donc du **choix préalable de tes amis** et de tes clics.\n\n" +
        "Les contenus qui font réagir (colère, peur, surprise) sont les plus partagés : les **fausses informations** circulent souvent plus vite que les vraies. Avant de partager : qui l'a publié en premier ? Est-ce repris par des médias sérieux ? La photo est-elle ancienne ou truquée (une recherche d'image inversée le dit) ?\n\n" +
        "**Activité** : dans le fil ci-contre, choisis tes comptes et aime quelques publications : observe comment ton fil change."
    },
    {
      titre: "La cyberviolence et la loi",
      seance: 6,
      figure: "sr-cours-ressources",
      video: { titre: "Vidéo (France Inter, les clés du numérique) : cyberharcèlement, la violence n'a rien de virtuel", youtube: "https://youtu.be/O_ys1Up6Y_8" },
      texte:
        "Les réseaux sociaux peuvent être le support de **cyberviolences** : harcèlement par des messages répétés, harcèlement en **meute** (des dizaines de comptes qui attaquent la même personne), moqueries dans un groupe de classe, **usurpation d'identité**, **diffusion de photos intimes** sans accord, **sextorsion** (chantage à la photo), propos **discriminatoires** ou haineux, vidéos d'agression, publication de l'adresse de quelqu'un. Ce n'est jamais « virtuel » : les victimes en souffrent vraiment.\n\n" +
        "**La loi.** L'**article 222-33-2-2 du code pénal** punit le **harcèlement moral** : des propos ou comportements **répétés** qui dégradent les conditions de vie d'une personne et altèrent sa santé. Il s'applique aussi quand **plusieurs personnes** agissent chacune une seule fois (harcèlement en meute). Peines maximales pour un majeur :\n\n" +
        "- $1$ an de prison et $15\\,000$ € d'amende ;\n" +
        "- $2$ ans et $30\\,000$ € avec une **circonstance aggravante** : victime **mineure**, personne vulnérable, faits commis **en ligne** (réseau social, messagerie), incapacité de travail de plus de $8$ jours… ;\n" +
        "- $3$ ans et $45\\,000$ € avec **deux** circonstances (par exemple un mineur harcelé sur un réseau social).\n\n" +
        "Le **harcèlement scolaire** (article 222-33-2-3) est puni jusqu'à $10$ ans de prison s'il conduit la victime au suicide ou à une tentative. Un auteur **mineur** encourt en principe la moitié des peines, mais il peut être poursuivi. **Liker ou partager**, c'est participer.\n\n" +
        "**Que faire ?** Victime ou témoin : garder des **preuves** (captures d'écran), en **parler** à un adulte de confiance, **bloquer** et **signaler** le compte, appeler le **3018** (gratuit, anonyme, 7 jours sur 7, aussi par tchat), signaler les contenus illicites sur **Pharos** (internet-signalement.gouv.fr), porter plainte. Le site nonauharcelement.education.gouv.fr donne des conseils."
    }
  ],

  videos: [
    { type: "Loi", titre: "Ça commence aujourd'hui (France 2) : cyberharcèlement, que risque le harceleur ?", youtube: "https://youtu.be/vBIEvbSQNDo" },
    { type: "Documentaire", titre: "« Tous reliés » (extrait) : le monde est petit !", youtube: "https://youtu.be/28-9w_CXygA" },
    { type: "Cours", titre: "Novelclass : les graphes mathématiques, SNT Seconde", youtube: "https://youtu.be/pmkZGBHWQCs" }
  ],
  videosNote: "Pour aller plus loin, ou revoir une notion autrement.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "sr-reseaux", titre: "Réseaux sociaux existants", etape: "Séance 1 · Les réseaux sociaux autour de nous", nb: 5 },
    { type: "sr-identite", titre: "Identité numérique", etape: "Séance 2 · Identité, confidentialité, mots de passe", nb: 6 },
    { type: "sr-confidentialite", titre: "Confidentialité", etape: "Séance 2 · Identité, confidentialité, mots de passe", nb: 5 },
    { type: "sr-motdepasse", titre: "Mots de passe", etape: "Séance 2 · Identité, confidentialité, mots de passe", nb: 5 },
    { type: "sr-economie", titre: "Modèle économique", etape: "Séance 3 · Le modèle économique", nb: 5 },
    { type: "sr-degre", titre: "Amis et degrés", etape: "Séance 4 · Graphes et petit monde", nb: 5 },
    { type: "sr-distance", titre: "Distance", etape: "Séance 4 · Graphes et petit monde", nb: 5 },
    { type: "sr-excentricite", titre: "Excentricité", etape: "Séance 4 · Graphes et petit monde", nb: 5 },
    { type: "sr-rayon-diametre", titre: "Rayon, diamètre, centre", etape: "Séance 4 · Graphes et petit monde", nb: 5 },
    { type: "sr-milgram", titre: "Petit monde", etape: "Séance 4 · Graphes et petit monde", nb: 5 },
    { type: "sr-bulle", titre: "Bulles de filtre", etape: "Séance 5 · Algorithmes et bulles", nb: 5 },
    { type: "sr-cyber", titre: "Cyberviolence et loi", etape: "Séance 6 · Cyberviolence", nb: 6 },
    { type: "sr-vrai-faux", titre: "Vrai ou faux ?", etape: "Séance 6 · Bilan", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Un réseau social permet surtout de :", choix: ["créer un profil, se relier à d'autres et partager des contenus", "naviguer sur Internet sans connexion", "stocker des fichiers sur une clé USB", "envoyer des paquets aux routeurs"], bonne: 0, explication: "Profil, relations, partage : ce sont les trois ingrédients d'un réseau social." },
    { question: "Quel réseau social est spécialisé dans les messages éphémères ?", choix: ["Snapchat", "LinkedIn", "YouTube", "Pinterest"], bonne: 0, explication: "Les snaps disparaissent après lecture (mais une capture d'écran peut les garder)." },
    { question: "Quel réseau social est d'abord professionnel ?", choix: ["LinkedIn", "TikTok", "Snapchat", "Twitch"], bonne: 0, explication: "CV, offres d'emploi, contacts de travail." },
    { question: "L'ordre de grandeur du nombre d'utilisateurs mensuels des plus grands réseaux sociaux est :", choix: ["quelques milliards", "quelques milliers", "quelques millions", "quelques milliers de milliards"], bonne: 0, explication: "Facebook, YouTube, WhatsApp, Instagram : de $2$ à $3$ milliards, pour $8$ milliards d'humains." },
    { question: "Facebook a été créé en :", choix: ["2004", "1989", "2016", "1997"], bonne: 0, explication: "Par Mark Zuckerberg, à l'université Harvard. 1997 : SixDegrees ; 2016 : TikTok." },
    { question: "Ton identité numérique, c'est :", choix: ["l'ensemble des traces que l'on trouve sur toi en ligne", "ton mot de passe", "ton numéro de carte d'identité", "le modèle de ton téléphone"], bonne: 0, explication: "Traces volontaires, involontaires et laissées par d'autres." },
    { question: "Le réseau enregistre combien de temps tu regardes chaque vidéo. C'est une trace :", choix: ["involontaire", "volontaire", "laissée par un ami", "papier"], bonne: 0, explication: "Elle est enregistrée sans que tu la publies." },
    { question: "L'e-réputation désigne :", choix: ["l'image qu'on donne de soi sur Internet", "la vitesse d'une connexion", "le nombre d'appareils connectés", "une application de messagerie"], bonne: 0, explication: "Ce que les autres pensent de toi d'après ce qu'ils trouvent en ligne." },
    { question: "S'authentifier, c'est :", choix: ["prouver qu'on est bien la personne annoncée", "dire son pseudo", "créer un nouveau compte", "publier une photo de profil"], bonne: 0, explication: "Identifier = dire qui on est ; authentifier = le prouver." },
    { question: "La double authentification demande :", choix: ["le mot de passe et un code reçu sur un autre appareil", "deux mots de passe identiques", "deux comptes différents", "deux navigateurs"], bonne: 0, explication: "Deux preuves de nature différente." },
    { question: "Combien de codes différents à $4$ chiffres existe-t-il ?", choix: ["$10\\,000$", "$40$", "$9\\,999$", "$1\\,000$"], bonne: 0, explication: "$10^4 = 10\\,000$ (de $0000$ à $9999$)." },
    { question: "Lequel de ces mots de passe est le plus robuste ?", choix: ["`Pirogue-Vanille-58-Corail!`", "`azerty`", "`Lina2011`", "`soleil`"], bonne: 0, explication: "Long, plusieurs mots sans lien, chiffres et symboles." },
    { question: "Pour qu'un inconnu voie le moins de choses sur ton profil, il faut :", choix: ["passer son compte en privé", "publier plus souvent", "activer la localisation", "accepter tous les abonnés"], bonne: 0, explication: "Un compte privé filtre les abonnés." },
    { question: "Une publication réglée sur « amis d'amis » est visible par :", choix: ["tes amis et les amis de tes amis", "seulement toi", "seulement tes amis", "tout le monde, même sans compte"], bonne: 0, explication: "Distance $1$ et $2$ dans le graphe : souvent des milliers de personnes." },
    { question: "La principale source de revenus des réseaux sociaux gratuits est :", choix: ["la publicité ciblée", "les dons", "les impôts", "la vente de câbles"], bonne: 0, explication: "Les annonceurs paient pour atteindre les bons utilisateurs." },
    { question: "« Quand c'est gratuit, c'est toi le produit » signifie que :", choix: ["tu paies avec ton attention et tes données", "le réseau te paie", "tu dois acheter quelque chose", "personne ne gagne d'argent"], bonne: 0, explication: "Le réseau vend l'accès à ton attention, ciblée grâce à tes données." },
    { question: "Pourquoi le défilement des vidéos est-il infini ?", choix: ["pour te garder plus longtemps et te montrer plus de publicités", "parce qu'Internet ne s'arrête jamais", "pour économiser la batterie", "c'est obligatoire par la loi"], bonne: 0, explication: "Temps passé = publicités vues = revenus." },
    { question: "Dans un graphe d'amitié, le degré d'une personne est :", choix: ["son nombre d'amis", "sa distance au centre", "son âge", "son nombre de publications"], bonne: 0, explication: "Le nombre de liens qui partent de son sommet." },
    { question: "La distance entre deux personnes d'un graphe est :", choix: ["le plus petit nombre de liens entre elles", "le plus grand nombre de liens entre elles", "leur nombre d'amis communs", "la distance en kilomètres"], bonne: 0, explication: "On compte les traits du plus court chemin." },
    { question: "L'excentricité d'une personne est :", choix: ["sa plus grande distance à une autre personne", "sa plus petite distance à une autre personne", "son nombre d'amis", "le nombre de personnes du graphe"], bonne: 0, explication: "On regarde la personne la plus éloignée d'elle." },
    { question: "Le diamètre d'un graphe est :", choix: ["la plus grande excentricité", "la plus petite excentricité", "le nombre de sommets", "le nombre de liens"], bonne: 0, explication: "C'est aussi la plus grande distance entre deux personnes." },
    { question: "Le rayon d'un graphe est :", choix: ["la plus petite excentricité", "la plus grande excentricité", "la moitié du nombre de sommets", "le degré du centre"], bonne: 0, explication: "Et le centre est formé des sommets d'excentricité égale au rayon." },
    { question: "Le centre d'un graphe est formé :", choix: ["des personnes d'excentricité minimale", "des personnes qui ont le plus d'amis", "de la personne dessinée au milieu", "des personnes d'excentricité maximale"], bonne: 0, explication: "Ce sont elles qui touchent tout le monde en un minimum d'étapes." },
    { question: "Dans un graphe, on a toujours :", choix: ["rayon $\\leqslant$ diamètre", "rayon $>$ diamètre", "rayon $=$ diamètre $\\times 2$", "diamètre $= 1$"], bonne: 0, explication: "Le rayon est la plus petite excentricité, le diamètre la plus grande." },
    { question: "L'expérience de Milgram (1967) a montré que :", choix: ["deux personnes sont souvent reliées par environ six liens", "une lettre ne peut pas traverser les États-Unis", "les réseaux sociaux sont dangereux", "il faut connaître le destinataire"], bonne: 0, explication: "D'où l'expression « six degrés de séparation »." },
    { question: "Si chacun connaît $100$ personnes (toutes différentes), combien en atteint-on en $3$ étapes ?", choix: ["$1\\,000\\,000$", "$300$", "$10\\,000$", "$100\\,000$"], bonne: 0, explication: "$100^3 = 1\\,000\\,000$." },
    { question: "Une bulle de filtre, c'est :", choix: ["ne plus voir que des contenus proches de ce qu'on aime déjà", "un filtre photo", "un antivirus", "un groupe privé"], bonne: 0, explication: "L'algorithme montre surtout ce qui nous plaît déjà." },
    { question: "Le contenu de ton fil d'actualité dépend surtout :", choix: ["de tes amis, de tes abonnements et de tes réactions", "du hasard", "de la marque de ton téléphone", "de l'heure de la journée seulement"], bonne: 0, explication: "C'est le choix préalable de tes amis et tes clics qui orientent l'algorithme." },
    { question: "L'article 222-33-2-2 du code pénal punit :", choix: ["le harcèlement moral, y compris en ligne", "le vol de téléphone", "le téléchargement de musique", "l'usage d'un pseudonyme"], bonne: 0, explication: "Des propos ou comportements répétés qui dégradent les conditions de vie d'une personne." },
    { question: "Harceler un adolescent de $15$ ans sur un réseau social (auteur majeur) est puni au maximum de :", choix: ["$3$ ans de prison et $45\\,000$ € d'amende", "un simple avertissement", "$1$ mois de prison", "$100$ € d'amende"], bonne: 0, explication: "Deux circonstances aggravantes : victime mineure et service en ligne." },
    { question: "Un message humiliant circule dans le groupe de la classe. Le bon réflexe du témoin :", choix: ["ne pas partager, soutenir la victime, prévenir un adulte", "liker pour rester dans le groupe", "transférer à d'autres groupes", "ne rien faire"], bonne: 0, explication: "Partager ou liker, c'est participer." },
    { question: "Le numéro national gratuit et anonyme contre le harcèlement est :", choix: ["le 3018", "le 15", "le 3615", "le 118 218"], bonne: 0, explication: "7 jours sur 7, aussi par tchat et application." },
    { question: "Avant de bloquer un harceleur, il faut :", choix: ["faire des captures d'écran comme preuves", "lui répondre", "supprimer tous les messages", "changer de téléphone"], bonne: 0, explication: "Les preuves servent pour signaler et porter plainte." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Rayon, diamètre et centre d'un graphe",
      figure: "sr-cours-distances",
      etapes: [
        "Pour une personne, écrire sa distance à chaque autre : $1$ pour ses amis, $2$ pour les amis de ses amis, etc. (on peut écrire les nombres à côté des sommets).",
        "Son **excentricité** est la plus grande de ces distances.",
        "Recommencer pour chaque personne et noter toutes les excentricités dans un tableau.",
        "**Rayon** = la plus petite excentricité ; **diamètre** = la plus grande ; **centre** = les personnes dont l'excentricité vaut le rayon."
      ],
      exemple: "Graphe de la classe : excentricités Anli $4$, Zoé $4$, Tom $4$, Lina $3$, Naël $2$, Rose $3$, Maya $4$, Hugo $4$, Sami $4$. Rayon $2$, diamètre $4$, centre : Naël."
    },
    {
      titre: "Régler sa confidentialité",
      figure: "sr-act-confidentialite",
      etapes: [
        "Ouvrir Paramètres › Confidentialité (ou Vie privée) du réseau.",
        "Passer le compte en **privé** ; choisir qui peut t'écrire, te suivre, t'identifier.",
        "Désactiver la **localisation** et retirer téléphone, adresse et date de naissance du profil public.",
        "Vérifier les **applications connectées** et retirer celles qui n'ont pas besoin de tes données ; télécharger ses données pour voir ce que le réseau sait."
      ],
      exemple: "Profil de Nadjma : photo et lycée en « Amis », position en direct et téléphone en « Moi seul » : un inconnu ne voit plus rien d'utile."
    },
    {
      titre: "Créer un mot de passe robuste",
      figure: "sr-act-motdepasse",
      etapes: [
        "Choisir $4$ mots sans lien entre eux (pas son prénom, pas sa date de naissance).",
        "Les séparer par des tirets ou des symboles, ajouter des chiffres et une majuscule.",
        "Ne jamais réutiliser ce mot de passe sur un autre site ; ne le donner à personne.",
        "Activer la **double authentification**."
      ],
      exemple: "`Baobab-Coco-73-Pirogue!` : $23$ caractères, facile à retenir, impossible à deviner. Nombre de possibilités : environ $95^{23}$."
    },
    {
      titre: "Réagir face au cyberharcèlement",
      figure: "sr-cours-ressources",
      etapes: [
        "Ne pas répondre et ne pas relayer : un « j'aime » ou un partage, c'est participer.",
        "Garder des **preuves** : captures d'écran avec la date et le nom du compte.",
        "En **parler** : parents, CPE, professeur, infirmière ; appeler le **3018** (gratuit, anonyme).",
        "**Bloquer** et **signaler** le compte sur le réseau ; signaler sur Pharos si c'est illicite ; porter plainte si besoin."
      ],
      exemple: "Témoin d'un groupe qui se moque d'un élève : je quitte le groupe ou je dis que ce n'est pas drôle, j'envoie un message de soutien à l'élève, et je préviens la CPE."
    },
    {
      titre: "Repérer le modèle économique d'un service gratuit",
      figure: "sr-cours-economie",
      etapes: [
        "Chercher qui paie : publicités ? abonnement ? achats dans l'application ?",
        "Lire quelles données le service collecte (politique de confidentialité, autorisations demandées).",
        "Calculer ce que rapporte un utilisateur : revenus $\\div$ nombre d'utilisateurs.",
        "Se demander ce qui est fait pour te garder longtemps (défilement infini, notifications, séries)."
      ],
      exemple: "$4$ milliards d'euros de revenus pour $200$ millions d'utilisateurs : $4\\,000\\,000\\,000 \\div 200\\,000\\,000 = 20$ € par utilisateur et par an."
    }
  ],
  erreurs: [
    "Croire qu'une story ou un snap disparaît vraiment : une capture d'écran suffit à le garder.",
    "Croire qu'un réseau gratuit ne gagne pas d'argent : il vend ton attention aux annonceurs.",
    "Confondre identification (dire qui on est) et authentification (le prouver).",
    "Croire qu'un mot de passe court avec un symbole est sûr : la longueur compte le plus.",
    "Confondre distance et nombre d'intermédiaires : de A à B par C, la distance est $2$, il y a $1$ intermédiaire.",
    "Confondre rayon (plus petite excentricité) et diamètre (plus grande).",
    "Croire que le centre est forcément la personne qui a le plus d'amis, ou celle dessinée au milieu.",
    "Croire que le fil d'actualité est le même pour tout le monde.",
    "Croire que liker un message humiliant « ce n'est rien » : c'est participer au harcèlement.",
    "Bloquer un harceleur avant d'avoir fait des captures d'écran."
  ]
};
